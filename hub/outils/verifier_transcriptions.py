# SPDX-License-Identifier: AGPL-3.0-or-later
"""Module de transcription facultatif (hub/transcription/) : sans lui, seul le JSON
s'ingère ; posé après coup, il rattrape les dictées en attente, une fois chacune,
rangées par onglet d'enregistrement. Un faux module tient lieu de Whisper.

    python3 outils/verifier_transcriptions.py
    VRAI_MODULE=1 python3 outils/verifier_transcriptions.py   # transcrire.py pour de vrai
        (MONOLITHE_TRANSCRIPTION_PYTHON = un Python qui a faster-whisper, DICTEE_CLIP = un son)
"""
import base64
import json
import os
import sys
import tempfile
from pathlib import Path

APP = Path(__file__).resolve().parent.parent / "app"
sys.path.insert(0, str(APP))
import ingest  # noqa: E402

FAUX = '''import json, sys
for c in json.load(sys.stdin)["clips"]:
    print(json.dumps({"id": c["id"], "texte": "texte de " + c["id"].split("|")[1], "modele": "faux"}))
'''
vrai = os.environ.get("VRAI_MODULE") == "1"
son = Path(os.environ["DICTEE_CLIP"]).read_bytes() if vrai else b"\x1aE\xdf\xa3" + bytes(4000)
SON = base64.b64encode(son).decode()


def clip(champ, section, quand):
    return {"id": f"26P0123|{champ}|{quand}", "champ": champ, "section": section, "addedAt": quand,
            "type": "audio/webm;codecs=opus", "duree_s": 3.0, "bytes": len(son), "data_base64": SON}


DOC = {
    "schema_version": "0.2.1", "module": "macro_placenta", "module_version": "1.2.1",
    "dossier": "26P0123", "operateur": "RM", "exported_at": "2026-01-01T10:00:00.000Z",
    "sections": [{"id": "cordon", "titre": "Cordon", "champs": {"remarques_cordon": None}},
                 {"id": "tranches", "titre": "Tranches de section", "champs": {"remarques_tranches": None}}],
    "tranches": [], "lesions": [{"lesion": 1, "photo_key": "lesion_1", "description": None}],
    "cliches_libres": [], "photos": [],
    "dictees": [clip("lesion_1", "tranches", "2026-01-01T09:50:00.000Z"),
                clip("remarques_cordon", "cordon", "2026-01-01T09:55:00.000Z")],
}

with tempfile.TemporaryDirectory() as t:
    racine, module = Path(t) / "hub", Path(t) / "transcription"
    ingest.arborescence(racine)
    cx, _ = ingest.ouvrir(racine / "hub.sqlite")
    ingest.migrer(cx, APP / "migrations", bavard=False)
    os.environ["MONOLITHE_TRANSCRIPTION"] = str(module)      # pas encore posé
    sans = ingest.module_transcription()
    etat = ingest.ingerer(cx, racine, json.dumps(DOC).encode(), "26P0123_macro_placenta.json")[0]
    cx.commit()
    n_sans = ingest.transcrire_en_attente(cx, racine)

    module.mkdir()                                            # le module est posé
    if vrai:
        (module / "transcrire.py").write_text(
            (APP.parent / "transcription" / "transcrire.py").read_text(encoding="utf-8"), encoding="utf-8")
    else:
        (module / "transcrire.py").write_text(FAUX, encoding="utf-8")
        os.environ["MONOLITHE_TRANSCRIPTION_PYTHON"] = sys.executable
    n_avec = ingest.transcrire_en_attente(cx, racine)
    n_encore = ingest.transcrire_en_attente(cx, racine)       # rien de neuf : rien à refaire
    index = ingest.construire_index(cx)
    tr = index["dossiers"][0]["transcriptions"]
    ingest.rejouer(cx, racine)                                # la base se refait, les textes restent
    n_rejoue = ingest.transcrire_en_attente(cx, racine)
    garde = cx.execute("SELECT COUNT(*) FROM transcriptions").fetchone()[0]

if vrai:
    for x in tr:
        print("  ", x["titre"], "|", x["champ"], "|", x["texte"])
CAS = [
    ("sans module : JSON ingéré", sans is None and etat == "info" and n_sans == 0),
    ("module posé : les dictées en attente transcrites", n_avec == 2),
    ("une fois chacune", n_encore == 0),
    ("rangées par onglet d'enregistrement", [x["titre"] for x in tr] == ["Cordon", "Tranches de section"]),
    ("texte et champ gardés", vrai and all(x["texte"] for x in tr)
                              or tr[0]["texte"] == "texte de remarques_cordon" and tr[1]["champ"] == "lesion_1"),
    ("--rejouer garde les transcriptions", n_rejoue == 0 and garde == 2),
]
for titre, bon in CAS:
    print(("ok   " if bon else "FAUX ") + titre)
echecs = sum(not b for _, b in CAS)
print(f"{len(CAS) - echecs}/{len(CAS)}")
sys.exit(1 if echecs else 0)
