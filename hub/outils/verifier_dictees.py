# SPDX-License-Identifier: AGPL-3.0-or-later
"""Macro placenta 0.2.1 : les dictées (clips audio hors ligne) s'ingèrent sans
que leur son entre en base — ni dans donnees_json, ni dans valeurs_plates.
L'archive garde le document reçu, base64 compris.

    python3 outils/verifier_dictees.py
"""
import base64
import json
import sys
import tempfile
from pathlib import Path

APP = Path(__file__).resolve().parent.parent / "app"
sys.path.insert(0, str(APP))
import ingest  # noqa: E402

SON = base64.b64encode(b"\x1aE\xdf\xa3" + bytes(4000)).decode()   # en-tête EBML (webm) + silence
DOC = {
    "schema_version": "0.2.1", "module": "macro_placenta", "module_version": "1.2.0",
    "dossier": "26P0123", "operateur": "RM", "exported_at": "2026-01-01T10:00:00.000Z",
    "sections": [{"id": "basale", "titre": "Plaque basale",
                  "champs": {"etat_basale": ["Fibrine"], "remarques_basale": None}}],
    "tranches": [], "lesions": [], "cliches_libres": [], "photos": [],
    "dictees": [{"id": "26P0123|remarques_basale|2026-01-01T09:58:00.000Z", "champ": "remarques_basale",
                 "section": "basale", "addedAt": "2026-01-01T09:58:00.000Z",
                 "type": "audio/webm;codecs=opus", "duree_s": 4.2, "bytes": 4004, "data_base64": SON}],
}

with tempfile.TemporaryDirectory() as t:
    racine = Path(t)
    ingest.arborescence(racine)
    cx, _ = ingest.ouvrir(racine / "hub.sqlite")
    ingest.migrer(cx, APP / "migrations", bavard=False)
    etat, msg, sid = ingest.ingerer(cx, racine, json.dumps(DOC).encode(), "26P0123_macro_placenta.json")
    cx.commit()
    r = cx.execute("SELECT donnees_json, archive FROM saisies WHERE id=?", (sid,)).fetchone()
    en_base = json.loads(r["donnees_json"])
    plates = cx.execute("SELECT chemin, valeur_txt FROM valeurs_plates WHERE saisie_id=?", (sid,)).fetchall()
    archive = (racine / r["archive"]).read_text(encoding="utf-8")
    ancien = dict(DOC, schema_version="0.2.0", module_version="1.1.1", exported_at="2026-01-01T11:00:00.000Z")
    del ancien["dictees"]
    etat_ancien = ingest.ingerer(cx, racine, json.dumps(ancien).encode(), "26P0123_macro_placenta.json")[0]

CAS = [
    ("0.2.1 ingéré", etat == "info"),
    ("métadonnées gardées en base", en_base["dictees"][0]["champ"] == "remarques_basale"
                                    and en_base["dictees"][0]["duree_s"] == 4.2),
    ("son absent de donnees_json", "data_base64" not in r["donnees_json"] and SON not in r["donnees_json"]),
    ("son absent de valeurs_plates", all(SON != p["valeur_txt"] for p in plates)
                                     and not any("data_base64" in p["chemin"] for p in plates)),
    ("dictée cherchable à plat", any(p["chemin"] == "dictees.0.champ" for p in plates)),
    ("son gardé dans l'archive", SON in archive),
    ("0.2.0 toujours ingéré", etat_ancien == "info"),
]
for titre, bon in CAS:
    print(("ok   " if bon else "FAUX ") + titre)
echecs = sum(not b for _, b in CAS)
print(f"{len(CAS) - echecs}/{len(CAS)}")
sys.exit(1 if echecs else 0)
