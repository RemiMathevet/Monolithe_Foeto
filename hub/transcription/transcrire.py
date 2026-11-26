# SPDX-License-Identifier: AGPL-3.0-or-later
"""Module de transcription du hub — facultatif, avec son propre Python.

Le hub l'appelle s'il le trouve à côté d'app/ (hub/transcription/), en lot :
    python transcrire.py < clips.json > textes.jsonl
Entrée  : {"clips": [{"id": "...", "data_base64": "..."}]}
Sortie  : une ligne JSON par clip, {"id": "...", "texte": "...", "modele": "..."}
          (texte vide si rien n'est entendu ; {"id", "erreur"} si le son est illisible).

Whisper large-v3-turbo (faster-whisper, CTranslate2, int8, CPU), en français, sans amorce.
Le modèle est lu dans modele/ s'il y est (poste sans réseau), sinon téléchargé une fois.
Tout reste sur le poste : aucun son ni texte ne sort.
"""
import base64
import io
import json
import os
import sys
from pathlib import Path

ICI = Path(__file__).resolve().parent


def main():
    from faster_whisper import WhisperModel, decode_audio
    clips = json.load(sys.stdin)["clips"]
    modele = ICI / "modele"
    nom = str(modele) if (modele / "model.bin").exists() else "large-v3-turbo"
    print(f"transcription : {len(clips)} clip(s), modèle {nom}", file=sys.stderr, flush=True)
    whisper = WhisperModel(nom, device="cpu", compute_type="int8", cpu_threads=os.cpu_count() or 4)
    for i, c in enumerate(clips, 1):
        try:
            pcm = decode_audio(io.BytesIO(base64.b64decode(c["data_base64"])))
            segs, _ = whisper.transcribe(pcm, language="fr", beam_size=1, vad_filter=True)
            texte = " ".join(s.text.strip() for s in segs).strip()
            sortie = {"id": c["id"], "texte": texte, "modele": "whisper-large-v3-turbo"}
        except Exception as e:                       # un son illisible n'arrête pas le lot
            sortie = {"id": c["id"], "erreur": f"{type(e).__name__}: {e}"}
        print(json.dumps(sortie, ensure_ascii=False), flush=True)
        print(f"  {i}/{len(clips)}", file=sys.stderr, flush=True)


if __name__ == "__main__":
    main()
