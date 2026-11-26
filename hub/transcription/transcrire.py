# SPDX-License-Identifier: AGPL-3.0-or-later
"""Module de transcription du hub — facultatif, avec son propre Python.

Le hub l'appelle s'il le trouve à côté d'app/ (hub/transcription/), en lot :
    python transcrire.py < clips.json > textes.jsonl
Entrée  : {"clips": [{"id": "...", "data_base64": "..."}]}
Sortie  : une ligne JSON par clip, {"id", "texte", "modele"} (+ "whisper", "omni" si Omni a écouté) ;
          texte vide si rien n'est entendu, {"id", "erreur"} si le son est illisible.

Whisper large-v3-turbo (faster-whisper, CTranslate2, int8, CPU), en français, sans amorce. Le
modèle est lu dans modele/ s'il y est (poste sans réseau), sinon téléchargé une fois.

Paquet Omni facultatif (omni/ : llama-server + Qwen3-Omni 30B-A3B, voir LISEZMOI) : s'il est posé
et que le poste a la mémoire libre qu'il demande (~22 Go), chaque clip est écouté une seconde fois
par Omni, et les passages où les deux écoutes divergent deviennent ⟨whisper / omni⟩, à trancher
à la relecture. Sinon, Whisper seul, sans rien demander. Tout reste sur le poste.
    python transcrire.py --omni      dit si Omni servirait sur ce poste, et pourquoi
"""
import base64
import difflib
import io
import json
import os
import re
import socket
import subprocess
import sys
import time
import urllib.request
import wave
from pathlib import Path

ICI = Path(__file__).resolve().parent
OMNI = Path(os.environ.get("MONOLITHE_OMNI") or ICI / "omni")
CONSIGNE = ("Transcris exactement ce qui est dit dans cet enregistrement, en français. Vocabulaire "
            "médical (fœtopathologie, placenta). Réponds uniquement par la transcription.")


# ── Omni : seconde écoute facultative ────────────────────────────────────────
def memoire_libre():
    """Octets de mémoire vive disponibles, ou None si on ne sait pas les lire."""
    try:
        if os.name == "nt":
            import ctypes

            class Etat(ctypes.Structure):
                _fields_ = [("dwLength", ctypes.c_ulong), ("dwMemoryLoad", ctypes.c_ulong)] + \
                           [(n, ctypes.c_ulonglong) for n in ("total", "dispo", "tpf", "apf", "tv", "av", "aev")]
            e = Etat(); e.dwLength = ctypes.sizeof(Etat)
            ctypes.windll.kernel32.GlobalMemoryStatusEx(ctypes.byref(e))
            return e.dispo
        with open("/proc/meminfo") as f:
            for ligne in f:
                if ligne.startswith("MemAvailable:"):
                    return int(ligne.split()[1]) * 1024
    except Exception:
        pass
    return None


def omni_possible():
    """((llama-server, modèle, mmproj), None) si Omni peut servir sur ce poste, sinon (None, raison)."""
    exe = next((p for p in (OMNI / "llama-server.exe", OMNI / "llama-server") if p.is_file()), None)
    ggufs = sorted((OMNI / "modele").glob("*.gguf")) if (OMNI / "modele").is_dir() else []
    mmproj = [g for g in ggufs if "mmproj" in g.name.lower()]
    modele = [g for g in ggufs if "mmproj" not in g.name.lower()]
    if not exe:
        return None, "paquet Omni absent (omni/llama-server)"
    if not (modele and mmproj):
        return None, "modèle Omni absent (omni/modele/) : lancer installer_omni.py"
    besoin = (modele[0].stat().st_size + mmproj[0].stat().st_size) * 1.1 + 2e9
    libre = memoire_libre()
    if libre is not None and libre < besoin:
        return None, f"mémoire insuffisante ({libre / 1e9:.0f} Go libres, {besoin / 1e9:.0f} Go requis)"
    return (exe, modele[0], mmproj[0]), None


class Omni:
    """llama-server lancé pour le lot, sur un port libre de la boucle locale, arrêté à la fin.
    MONOLITHE_OMNI_URL : un serveur déjà lancé (poste de développement), rien n'est démarré."""

    def __init__(self, exe=None, modele=None, mmproj=None):
        self.p = None
        self.url = os.environ.get("MONOLITHE_OMNI_URL")
        if self.url:
            return
        with socket.socket() as s:
            s.bind(("127.0.0.1", 0)); port = s.getsockname()[1]
        self.url = f"http://127.0.0.1:{port}"
        self.p = subprocess.Popen([str(exe), "-m", str(modele), "--mmproj", str(mmproj), "-ngl", "0",
                                   "--no-mmproj-offload", "-t", str(os.cpu_count() or 4), "-c", "8192",
                                   "--host", "127.0.0.1", "--port", str(port), "--parallel", "1", "--jinja"],
                                  stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        fin = time.monotonic() + 600            # 18 Go à lire sur le disque
        while time.monotonic() < fin:
            if self.p.poll() is not None:
                raise RuntimeError(f"llama-server arrêté au démarrage (code {self.p.returncode})")
            try:
                if urllib.request.urlopen(f"{self.url}/health", timeout=2).status == 200:
                    return
            except Exception:
                pass
            time.sleep(1)
        raise RuntimeError("llama-server pas prêt après 10 min")

    def transcrire(self, pcm):
        buf = io.BytesIO()
        with wave.open(buf, "wb") as w:
            w.setnchannels(1); w.setsampwidth(2); w.setframerate(16000)
            w.writeframes((pcm * 32767).astype("int16").tobytes())
        corps = {"messages": [{"role": "user", "content": [
                    {"type": "input_audio", "input_audio": {"data": base64.b64encode(buf.getvalue()).decode(),
                                                            "format": "wav"}},
                    {"type": "text", "text": CONSIGNE}]}],
                 "temperature": 0, "max_tokens": 1024}
        req = urllib.request.Request(f"{self.url}/v1/chat/completions", json.dumps(corps).encode(),
                                     {"Content-Type": "application/json"})
        r = json.load(urllib.request.urlopen(req, timeout=600))
        return r["choices"][0]["message"]["content"].strip().strip("«»\"").strip() or None

    def fermer(self):
        if self.p and self.p.poll() is None:
            self.p.terminate()
            try:
                self.p.wait(10)
            except subprocess.TimeoutExpired:
                self.p.kill()


def fusion(w, o):
    """Texte Whisper ; les passages où Omni entend autre chose deviennent ⟨whisper / omni⟩.
    Casse et ponctuation ignorées ; un seul mot commun entre deux divergences : un seul bloc."""
    if not o:
        return w
    wt, ot = w.split(), o.split()
    cle = lambda t: re.sub(r"[^\w'-]", "", t.lower())
    ops = []
    for op in difflib.SequenceMatcher(None, [cle(t) for t in wt], [cle(t) for t in ot],
                                      autojunk=False).get_opcodes():
        if ops and op[0] != "equal" and len(ops) >= 2 and ops[-1][0] == "equal" \
                and ops[-1][2] - ops[-1][1] == 1 and ops[-2][0] != "equal":
            ops.pop(); prev = ops.pop()
            op = ("replace", prev[1], op[2], prev[3], op[4])
        ops.append(op)
    out = []
    for op, i1, i2, j1, j2 in ops:
        out += wt[i1:i2] if op == "equal" else \
            [f"⟨{' '.join(wt[i1:i2]) or '∅'} / {' '.join(ot[j1:j2]) or '∅'}⟩"]
    return " ".join(out)


def main():
    if "--omni" in sys.argv:
        paquet, raison = omni_possible()
        print("Omni servira sur ce poste." if paquet else f"Whisper seul : {raison}.")
        return
    from faster_whisper import WhisperModel, decode_audio
    clips = json.load(sys.stdin)["clips"]
    modele = ICI / "modele"
    nom = str(modele) if (modele / "model.bin").exists() else "large-v3-turbo"
    paquet, raison = (None, "") if os.environ.get("MONOLITHE_OMNI_URL") else omni_possible()
    omni = None
    if paquet or os.environ.get("MONOLITHE_OMNI_URL"):
        try:
            omni = Omni(*(paquet or ()))
        except Exception as e:
            raison = f"Omni n'a pas démarré ({e})"
    print(f"transcription : {len(clips)} clip(s), Whisper {nom}" +
          (", seconde écoute Omni" if omni else f", Whisper seul : {raison}"), file=sys.stderr, flush=True)
    whisper = WhisperModel(nom, device="cpu", compute_type="int8", cpu_threads=os.cpu_count() or 4)
    try:
        for i, c in enumerate(clips, 1):
            try:
                pcm = decode_audio(io.BytesIO(base64.b64decode(c["data_base64"])))
                segs, _ = whisper.transcribe(pcm, language="fr", beam_size=1, vad_filter=True)
                w = " ".join(s.text.strip() for s in segs).strip()
                sortie = {"id": c["id"], "texte": w, "modele": "whisper-large-v3-turbo"}
                if omni and w:
                    try:
                        o = omni.transcrire(pcm)
                        sortie.update(texte=fusion(w, o), whisper=w, omni=o,
                                      modele="whisper-large-v3-turbo+qwen3-omni-30b-a3b")
                    except Exception as e:          # Omni tombe : ce clip reste en Whisper seul
                        print(f"  Omni : {e}", file=sys.stderr, flush=True)
            except Exception as e:                  # un son illisible n'arrête pas le lot
                sortie = {"id": c["id"], "erreur": f"{type(e).__name__}: {e}"}
            print(json.dumps(sortie, ensure_ascii=False), flush=True)
            print(f"  {i}/{len(clips)}", file=sys.stderr, flush=True)
    finally:
        if omni:
            omni.fermer()


if __name__ == "__main__":
    main()
