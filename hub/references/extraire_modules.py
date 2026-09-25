#!/usr/bin/env python3
# SPDX-License-Identifier: CC-BY-NC-SA-4.0 | Hub Light | Monolithe_Foeto
"""
Recopie les tables de référence des modules de saisie dans references/*.json.

    python hub/references/extraire_modules.py

Les modules portent leurs tables (Guihard-Costa 2002, Maroun 2017,
Muller-Brochut 2018) : c'est ce qui leur permet de calculer les écarts-types
hors ligne, en salle. Le hub les relit ici plutôt que d'en tenir une seconde
copie : une table n'est corrigée qu'à un endroit, le module, et on relance ce
script. Le hub recalcule alors les z de TOUS les dossiers avec la table
corrigée, et signale ceux qui s'écartent de ce qu'affichait le module à la
saisie.

Écrit :
  autopsie.json            masses d'organes  — GC_ORG, MA_ORG, MB_ORG + champs
  biometrie_clinique.json  biométrie externe — GC, MA, MB + mesures
"""

import json
import re
import sys
from pathlib import Path

ICI = Path(__file__).resolve().parent
DEPOT = ICI.parent.parent
MACRO = DEPOT / "Macro"

SOURCES = {"GC": "Guihard-Costa AM et al., 2002",
           "MA": "Maroun LL, Graem N, 2017",
           "MB": "Muller-Brochut AC et al., 2018"}


def litteral(html: str, nom: str):
    """Le littéral JS de `var <nom> = …;`, converti en objet Python.

    On ne lit que des tables : clés nues, nombres, chaînes entre guillemets
    doubles. Tout autre forme fait échouer json.loads — c'est voulu, une table
    qui change de forme doit arrêter le script, pas passer à moitié.
    """
    m = re.search(r"\bvar\s+" + nom + r"\s*=\s*([\[{])", html)
    if not m:
        sys.exit(f"{nom} introuvable")
    i, prof, dans_chaine = m.start(1), 0, False
    for j in range(i, len(html)):
        c = html[j]
        if dans_chaine:
            dans_chaine = c != '"' or html[j - 1] == "\\"
        elif c == '"':
            dans_chaine = True
        elif c in "[{":
            prof += 1
        elif c in "]}":
            prof -= 1
            if prof == 0:
                break
    js = html[i:j + 1]
    js = re.sub(r"/\*.*?\*/", "", js, flags=re.S)
    # Les clés nues hors chaînes : on découpe sur les chaînes pour ne pas
    # toucher à leur contenu.
    morceaux = re.split(r'("(?:[^"\\]|\\.)*")', js)
    for k in range(0, len(morceaux), 2):
        s = morceaux[k]
        s = re.sub(r"([{,]\s*)([A-Za-z_][A-Za-z0-9_]*|\d+)\s*:", r'\1"\2":', s)
        s = re.sub(r"([:\[,]\s*)(-?)\.(\d)", r"\1\g<2>0.\3", s)
        s = re.sub(r",(\s*[}\]])", r"\1", s)
        morceaux[k] = s
    return json.loads("".join(morceaux))


def version(html: str):
    m = re.search(r'\bvar\s+VERSION\s*=\s*"([^"]+)"', html)
    return m.group(1) if m else None


def champs_masse(html: str):
    """Les champs masse/masse2 de la trame d'autopsie et leurs clés de table."""
    out = {}
    for obj in re.findall(r'\{t:"masse2?",[^{}]*\}', html):
        d = json.loads(re.sub(r"([{,]\s*)([A-Za-z_]\w*)\s*:", r'\1"\2":', obj))
        out[d["id"]] = {k: d[k] for k in ("gc", "ma", "mb", "mg") if k in d}
    return out


def main():
    aut = (MACRO / "autopsie.html").read_text(encoding="utf-8")
    bio = (MACRO / "biometrie_clinique.html").read_text(encoding="utf-8")

    a = {"module": "autopsie", "module_version": version(aut), "sources": SOURCES,
         "GC": litteral(aut, "GC_ORG"), "MA": litteral(aut, "MA_ORG"),
         "MB": litteral(aut, "MB_ORG"), "champs": champs_masse(aut)}
    trame = litteral(bio, "TRAME")
    b = {"module": "biometrie_clinique", "module_version": version(bio), "sources": SOURCES,
         "GC": litteral(bio, "GC"), "MA": litteral(bio, "MA"), "MB": litteral(bio, "MB"),
         "mesures": {m["k"]: {k: m[k] for k in ("gc", "ma", "mad", "mb", "mbd") if k in m}
                     for g in trame for m in g["mesures"]}}

    for nom, o in (("autopsie", a), ("biometrie_clinique", b)):
        (ICI / f"{nom}.json").write_text(json.dumps(o, ensure_ascii=False, indent=1) + "\n",
                                         encoding="utf-8")
        print(f"{nom}.json — module v{o['module_version']} : GC {len(o['GC'])} classes, "
              f"MA {len(o['MA'])} termes, MB {len(o['MB'])} termes, "
              f"{len(o.get('champs') or o.get('mesures'))} champs")


if __name__ == "__main__":
    main()
