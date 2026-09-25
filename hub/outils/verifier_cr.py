#!/usr/bin/env python3
# SPDX-License-Identifier: CC-BY-NC-SA-4.0 | Hub Light | Monolithe_Foeto
"""Éprouve les gabarits de compte rendu sur un dossier complet, en base.

    python3 hub/outils/verifier_cr.py

Un gabarit ne se relit pas : une balise mal fermée, une clé de contexte mal
tapée — `plaenta.champs` — ne se voient qu'au rendu, et Jinja rend une clé
inconnue par du vide sans rien dire. On monte donc une base jetable, on y
ingère les exemples du dépôt plus une saisie de chaque partie manquante
(placenta, micro multi-organes, grilles), on rend TOUS les gabarits présents
et on vérifie que chaque partie est bien arrivée dans le texte.

ponytail: les trois derniers documents sont écrits ici plutôt que produits par
les modules — hub/exemples/generer.py le ferait mieux, mais il demande
playwright. Si une forme de module change, c'est ici qu'il faut la reporter.
"""
import datetime as dt
import json
import sys
import tempfile
from pathlib import Path

ICI = Path(__file__).resolve().parent
APP = ICI.parent / "app"
EXEMPLES = ICI.parent / "exemples"
sys.path.insert(0, str(APP))

import biometrie                 # noqa: E402
import cr as compte_rendu        # noqa: E402
import ingest                    # noqa: E402

DOSSIER = "26P0123"              # numéro fictif, déclaré dans .githooks/pre-commit
MAINTENANT = dt.datetime.now().isoformat(timespec="seconds")

CR_REIN = """Rein — grille de lecture
26P0123 · 32 SA · contrôle · rein droit

PRÉLÈVEMENT
  deux fragments, corticale et médullaire.

SIGNES
  glomérules · zone néphrogène amincie — ANORMAL
  Normaux : tubes proximaux · interstitium.
  Non explorés : vaisseaux.

TERMES FOETO
  Hypoplasie rénale [FOETO:0042]

— La micro décrit ; la conclusion nomme.
"""

CR_PLACENTA = """Placenta — grille de lecture
26P0123 · 32 SA · contrôle

SIGNES
  villosités · maturation accélérée — ANORMAL
  Normaux : chambre intervilleuse.

TERMES FOETO
  Villite chronique [FOETO:0117]
"""

SAISIES = [
    {"schema_version": "0.2.0", "module": "macro_placenta", "module_version": "1.1.1",
     "dossier": DOSSIER, "operateur": "contrôle", "exported_at": MAINTENANT,
     "trame_attendue": 3,
     "sections": [
         {"id": "general", "titre": "Terme & contexte fœtal",
          "champs": {"indication": "MFIU", "indication_detail": "découverte fortuite",
                     "terme_sa": 32, "terme_jours": 2, "terme_source": "Écho T1",
                     "masse_foetale": 1500, "sexe": "F"}},
         {"id": "galette", "titre": "Galette — biométrie et forme",
          "champs": {"grand_axe": 17, "petit_axe": 14, "epaisseur": 2.5,
                     "forme": "Ovale", "completude": ["Complète"]}},
         {"id": "choriale", "titre": "Plaque choriale",
          "champs": {"etat_choriale": ["Opaque"], "remarques_choriale": "quelques kystes."}},
         {"id": "basale", "titre": "Plaque basale",
          "champs": {"etat_basale": ["Infarctus visible(s)"], "remarques_basale": ""}},
         {"id": "cordon", "titre": "Cordon ombilical",
          "champs": {"cordon_insertion": "Marginale", "cordon_longueur": 48,
                     "cordon_spiralisation": "Hyper",
                     "cordon_particularites": ["Circulaire"]}},
         {"id": "membranes", "titre": "Membranes",
          "champs": {"membranes_insertion": "Circumvallée", "membranes_marginee_pct": 40,
                     "membranes_aspect": "Opaques"}},
         {"id": "paree", "titre": "Placenta paré", "champs": {"masse": 300}},
         {"id": "tranches", "titre": "Tranches de section & lésions",
          "champs": {"remarques_tranches": "trois foyers pâles"}}],
     "tranches": [{"groupe": 1, "photos": ["tr_g1_1"]}],
     "lesions": [{"lesion": 1, "photo_key": "lesion_1", "cassette": "K3",
                  "description": "infarctus ancien"}],
     "cliches_libres": []},

    {"schema_version": "0.2.0", "module": "micro", "module_version": "1.0.0",
     "dossier": DOSSIER, "operateur": "contrôle", "exported_at": MAINTENANT,
     "terme_sa": 32, "terme_jours": 2, "trame_attendue": 0,
     "sections": [
         {"n": 1, "rang": 1, "organe": "poumon", "titre": "Poumon",
          "champs": [
              {"id": "stade", "label": "Stade de développement", "type": "axe",
               "etat": "anormal", "termes": ["retard de maturation"],
               "autre": None, "note": "sur les deux lobes."},
              {"id": "vx", "label": "Vaisseaux", "type": "axe", "etat": "normal",
               "termes": [], "autre": None, "note": None},
              {"id": "oubli", "label": "Axe non regardé", "type": "axe", "etat": None,
               "termes": [], "autre": None, "note": None},
              {"id": "k", "label": "Cassettes", "type": "num", "valeur": 3, "unite": None}]}],
     "cliches_libres": []},

    {"schema_version": "0.2.0", "module": "grille_rein", "module_version": "1.0.0",
     "dossier": DOSSIER, "operateur": "contrôle", "exported_at": MAINTENANT,
     "organe": "rein", "source": "fiche_rein.md", "terme_sa": 32,
     "grille": {"cote": "droit", "signes": {"zone_nephrogene": "anormal"},
                "foeto": {"FOETO:0042": 1}, "libre": ""},
     "compte_rendu": CR_REIN},

    {"schema_version": "0.2.0", "module": "grille_placenta", "module_version": "1.0.0",
     "dossier": DOSSIER, "operateur": "contrôle", "exported_at": MAINTENANT,
     "organe": "placenta", "source": "fiche_placenta.md", "terme_sa": 32,
     "grille": {"signes": {"maturation": "anormal"}, "foeto": {"FOETO:0117": 1},
                "libre": ""},
     "compte_rendu": CR_PLACENTA},
]

# (gabarit, ce qui doit s'y trouver, ce qui ne doit pas y être)
ATTENDU = {
    "complet": (["PLACENTA — EXAMEN MACROSCOPIQUE",
                 "Galette ovale de 17 × 14 cm",
                 "Rapport fœto-placentaire 5.0",
                 "insertion marginale, 48 cm",
                 "cassette K3",
                 "MICROSCOPIE",
                 "Stade de développement : ANORMAL — retard de maturation",
                 "GRILLES DE LECTURE",
                 "zone néphrogène amincie — ANORMAL",
                 "Grille rein — glomérules · zone néphrogène amincie",
                 "Hypoplasie rénale [FOETO:0042]"],
                ["Axe non regardé"]),
    "placenta": (["COMPTE RENDU D'EXAMEN PLACENTAIRE",
                  "Galette ovale de 17 × 14 cm, épaisse de 2.5 cm, masse parée 300 g",
                  "Insertion circumvallée sur 40 % de la circonférence",
                  "villosités · maturation accélérée — ANORMAL",
                  "Villite chronique [FOETO:0117]",
                  "Amsterdam n'est pas le",
                  "Termes discordants entre modules :", "macro_placenta 32 SA",
                  "Lésion n° 1 — cassette K3"],
                 ["Grille placentaire non parvenue"]),
    "synthese": (["Grille rein (droit) — glomérules · zone néphrogène amincie",
                  "Microscopie — Poumon : Stade de développement",
                  "Grilles de lecture : placenta, rein"],
                 []),
}


def main():
    ok = rate = 0

    def t(nom, cond, detail=""):
        nonlocal ok, rate
        if cond:
            ok += 1
            print(f"  ok   {nom}")
        else:
            rate += 1
            print(f"  RATÉ {nom}   {detail}")

    racine = Path(tempfile.mkdtemp(prefix="verif-cr-"))
    ingest.arborescence(racine)
    cx, _ = ingest.ouvrir(racine / "hub.sqlite")
    ingest.migrer(cx, APP / "migrations", bavard=False)

    print("Ingestion")
    for f in sorted(EXEMPLES.glob(f"{DOSSIER}_*.json")):
        etat, msg, _ = ingest.ingerer(cx, racine, f.read_bytes(), f.name, provenance="poste")
        t(f.name, etat == "info", msg)
    for d in SAISIES:
        nom = f"{d['dossier']}_{d['module']}.json"
        etat, msg, _ = ingest.ingerer(cx, racine, json.dumps(d).encode("utf-8"), nom,
                                      provenance="poste")
        t(nom, etat == "info", msg)

    print("Contexte")
    refs = biometrie.References(racine)
    ctx = compte_rendu.contexte(cx, DOSSIER, refs, ingest.ORDRE_MODULES)
    t("placenta présent", ctx["placenta"]["present"])
    t("rapport fœto-placentaire", ctx["placenta"]["rapport_fp"] == 5.0,
      str(ctx["placenta"]["rapport_fp"]))
    t("micro présente", ctx["micro"]["present"])
    t("un seul axe anormal en micro", len(ctx["micro"]["anormaux"]) == 1,
      str(ctx["micro"]["anormaux"]))
    t("deux grilles", len(ctx["grilles"]) == 2)
    t("grille du placenta isolée",
      ctx["grille_placenta"] and ctx["grille_placenta"]["organe"] == "placenta")
    t("grilles fœtales sans le placenta", [g["organe"] for g in ctx["grilles_foetales"]] == ["rein"])
    rein = next(g for g in ctx["grilles"] if g["organe"] == "rein")
    t("signe anormal relu", rein["anormaux"] == ["glomérules · zone néphrogène amincie"],
      str(rein["anormaux"]))
    t("terme FOETO relu", rein["foeto"] == [{"label": "Hypoplasie rénale", "id": "FOETO:0042"}],
      str(rein["foeto"]))
    t("les normaux ne passent pas pour des anomalies",
      "tubes proximaux" not in " ".join(rein["anormaux"]))

    print("Composition placentaire (phrases du paquet data_hub)")
    # Un cr_phrases.json minimal : deux sections, un terme. Les signes de la
    # grille viennent de references/grille_placenta.json (tiré du module).
    sig = refs.grille_placenta.get("signes") or {}
    cordon = [k for k, v in sig.items() if v["groupe"] == "G1"]
    phrases = {"sections": [
        {"id": "cr_cordon", "domaine": "placenta", "label": "Cordon", "texte_normal": "Cordon normal."},
        {"id": "cr_membranes", "domaine": "placenta", "label": "Membranes", "texte_normal": "Membranes normales."}],
        "termes": {"FOETO:X": {"label": "Méconium", "section": "cr_membranes", "phrase": "Méconium dans l'amnion."}}}
    comp = compte_rendu.composer_placenta(
        {"grille": {"signes": {cordon[0]: "normal"}, "foeto": {"FOETO:X": 1}}}, phrases, refs.grille_placenta)
    t("références de la grille placentaire chargées", len(sig) > 50, str(len(sig)))
    t("section explorée normale → texte normal",
      comp and comp["sections"][0]["texte"] == "Cordon normal.", str(comp and comp["sections"][0]))
    t("terme posé → sa phrase", comp and comp["sections"][1]["texte"] == "Méconium dans l'amnion.")
    comp = compte_rendu.composer_placenta(
        {"grille": {"signes": {cordon[0]: "normal", cordon[1]: "anormal"}, "foeto": {}}}, phrases,
        refs.grille_placenta)
    t("anomalie sans terme → pas de texte normal",
      comp["sections"][0]["texte"] is None and comp["sections"][1]["statut"] == "non_atteste")
    t("sans paquet → pas de composition",
      compte_rendu.composer_placenta({"grille": {}}, {}, refs.grille_placenta) is None)

    print("Rendu")
    dispo = compte_rendu.gabarits_disponibles()
    for nom in sorted(dispo):
        try:
            _, texte = compte_rendu.rendre(cx, DOSSIER, nom, refs, ingest.ORDRE_MODULES,
                                           operateur="contrôle")
        except Exception as e:                      # noqa: BLE001
            t(f"{nom} — rendu", False, f"{type(e).__name__} : {e}")
            continue
        t(f"{nom} — rendu", True)
        doit, doit_pas = ATTENDU.get(nom, ([], []))
        for frag in doit:
            t(f"{nom} — « {frag[:48]} »", frag in texte)
        for frag in doit_pas:
            t(f"{nom} — sans « {frag[:48]} »", frag not in texte)
    for nom in ATTENDU:
        t(f"gabarit {nom} présent", nom in dispo)

    cx.close()
    print(f"\n{ok} vérification(s) passée(s), {rate} en échec — base jetable : {racine}")
    return 1 if rate else 0


if __name__ == "__main__":
    raise SystemExit(main())
