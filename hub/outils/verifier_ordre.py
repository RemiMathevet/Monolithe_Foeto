# SPDX-License-Identifier: AGPL-3.0-or-later
"""Deux exports d'un même module : le plus récent reste courant, quel que soit
l'ordre d'arrivée et quel que soit le nom du fichier (« x.json », « x (1).json »).

    python3 outils/verifier_ordre.py
"""
import json
import sys
import tempfile
from pathlib import Path

APP = Path(__file__).resolve().parent.parent / "app"
sys.path.insert(0, str(APP))
import ingest  # noqa: E402

MODELE = json.loads((APP.parent / "exemples/26P0123_administratif.json").read_text(encoding="utf-8"))
ANCIEN, RECENT = "2026-01-01T08:00:00.000Z", "2026-01-01T10:00:00.000Z"


def export(date, sa):
    d = json.loads(json.dumps(MODELE))
    d["exported_at"] = date
    d["issue"]["terme_sa"] = sa
    return json.dumps(d).encode()


def essai(suite):
    """suite : [(nom, exported_at, terme, provenance)] → (terme courant, terme de la fiche, saisies)."""
    with tempfile.TemporaryDirectory() as t:
        racine = Path(t)
        ingest.arborescence(racine)
        cx, _ = ingest.ouvrir(racine / "hub.sqlite")
        ingest.migrer(cx, APP / "migrations", bavard=False)
        for nom, date, sa, prov in suite:
            ingest.ingerer(cx, racine, export(date, sa), nom, provenance=prov)
        ingest.reindexer(cx, bavard=False)
        courant = cx.execute("SELECT donnees_json FROM saisies WHERE courant=1").fetchall()
        assert len(courant) == 1, "une seule saisie courante par module"
        fiche = cx.execute("SELECT terme_sa FROM dossiers").fetchone()["terme_sa"]
        n = cx.execute("SELECT COUNT(*) c FROM saisies").fetchone()["c"]
        cx.close()
        return json.loads(courant[0]["donnees_json"])["issue"]["terme_sa"], fiche, n


NOM, BIS = "26P0123_administratif.json", "26P0123_administratif (1).json"
CAS = [
    ("le récent arrive en second", [(NOM, ANCIEN, 20, "telephone"), (BIS, RECENT, 22, "telephone")], 22),
    ("l'ancien arrive en second", [(NOM, RECENT, 22, "telephone"), (BIS, ANCIEN, 20, "telephone")], 22),
    ("export téléphone plus ancien que le poste", [(NOM, RECENT, 22, "poste"), (NOM, ANCIEN, 20, "telephone")], 22),
    # Le poste fait toujours foi à l'enregistrement : une horloge en retard ne doit pas l'écarter.
    ("poste à l'horloge en retard", [(NOM, RECENT, 22, "telephone"), (NOM, ANCIEN, 20, "poste")], 20),
]
echecs = 0
for titre, suite, attendu in CAS:
    sa, fiche, n = essai(suite)
    bon = (sa, fiche, n) == (attendu, attendu, 2)
    echecs += not bon
    print(("ok   " if bon else "FAUX ") + f"{titre} : courant {sa} SA, fiche {fiche} SA, {n} saisies (attendu {attendu})")
print(f"{len(CAS) - echecs}/{len(CAS)}")
sys.exit(1 if echecs else 0)
