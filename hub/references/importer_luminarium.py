#!/usr/bin/env python3
# SPDX-License-Identifier: CC-BY-NC-SA-4.0 | Hub Light | Monolithe_Foeto
"""
Extrait les tables de référence d'une copie de FoetoPath Luminarium.

    python references/importer_luminarium.py --source /chemin/vers/Luminarium/Foeto

Lit `reference_data.py` et écrit `references/guihard_costa.json` et
`references/maroun.json`, au format attendu par `biometrie.py`.

LICENCE — à lire avant de lancer. Luminarium est sous « FoetoPath — Custom
Research License », ce dépôt sous CC BY-NC-SA 4.0. Faire passer des tables de
l'un à l'autre est une décision d'auteur. Ce script se contente d'écrire dans
`references/`, que `.gitignore` exclut : rien ne part au dépôt public tant que
vous ne l'y mettez pas vous-même.

Le fichier source n'est pas importé comme un module — on ne veut pas exécuter
le reste de Luminarium pour trois dictionnaires. Il est lu, et seules les
affectations de constantes sont évaluées, dans un espace de noms vide.
"""

import argparse
import ast
import json
import sys
from pathlib import Path

ICI = Path(__file__).resolve().parent

# Les noms d'organes de Luminarium, et ceux qu'attend biometrie.ORGANES.
# Une correspondance vide veut dire « même nom des deux côtés ».
RENOMMER = {}


def lire_constantes(fichier: Path, noms):
    """Évalue les affectations de constantes d'un fichier Python, et rien d'autre.

    On analyse l'arbre syntaxique et on n'évalue que les littéraux : pas
    d'import, pas d'appel, pas d'effet de bord. Un fichier de tables reste un
    fichier de données, même quand il porte l'extension .py.
    """
    arbre = ast.parse(fichier.read_text(encoding="utf-8"), filename=str(fichier))
    out = {}
    for noeud in arbre.body:
        if not isinstance(noeud, ast.Assign):
            continue
        for cible in noeud.targets:
            if isinstance(cible, ast.Name) and cible.id in noms:
                try:
                    out[cible.id] = ast.literal_eval(noeud.value)
                except ValueError:
                    print(f"  ! {cible.id} n'est pas un littéral — dérivé d'un autre ? ignoré")
    return out


def main():
    ap = argparse.ArgumentParser(description=__doc__.split("\n")[1])
    ap.add_argument("--source", type=Path, required=True,
                    help="dossier Foeto/ d'une copie de Luminarium")
    ap.add_argument("--sortie", type=Path, default=ICI)
    args = ap.parse_args()

    src = args.source.resolve()
    fichier = src / "reference_data.py" if src.is_dir() else src
    if not fichier.is_file():
        sys.exit(f"introuvable : {fichier}")

    print(f"lecture : {fichier}")
    c = lire_constantes(fichier, {"GC_ORGANES", "GC_MACRO", "MAROUN"})

    organes = c.get("GC_ORGANES") or {}
    biometries = c.get("GC_MACRO") or {}
    maroun = c.get("MAROUN") or {}
    if not (organes or maroun):
        sys.exit("aucune table reconnue — le fichier a-t-il changé de forme ?")

    args.sortie.mkdir(parents=True, exist_ok=True)

    gc = {
        "source": "Guihard-Costa AM et al., 2002",
        "importe_de": str(fichier),
        "organes": {cl: {RENOMMER.get(o, o): v for o, v in t.items()}
                    for cl, t in organes.items()},
        "biometries": biometries,
    }
    (args.sortie / "guihard_costa.json").write_text(
        json.dumps(gc, ensure_ascii=False, indent=1), encoding="utf-8")
    print(f"  guihard_costa.json — {len(organes)} classe(s) d'organes, "
          f"{len(biometries)} de biométries")

    ma = {
        "source": "Maroun LL, Graem N, 2017",
        "importe_de": str(fichier),
        "par_sa": {str(k): v for k, v in maroun.items()},
    }
    (args.sortie / "maroun.json").write_text(
        json.dumps(ma, ensure_ascii=False, indent=1), encoding="utf-8")
    print(f"  maroun.json — {len(maroun)} terme(s)")

    print("\nÉcrit dans " + str(args.sortie) +
          ".\nCes fichiers sont exclus du dépôt par .gitignore : les y verser est "
          "une décision\nd'auteur, les deux dépôts n'ayant pas la même licence.")


if __name__ == "__main__":
    main()
