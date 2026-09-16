#!/usr/bin/env python3
# SPDX-License-Identifier: CC-BY-NC-SA-4.0 | Hub Light | Monolithe_Foeto
"""Refait pack_telephone/ — les modules de salle, ceux qu'on ouvre sur le
téléphone ou la tablette d'autopsie — et pack_telephone.zip à côté.

    python3 pack_telephone.py

Ce sont des COPIES des fichiers de Macro/ et Radio/ : la source reste là-bas,
le pack se refait après chaque diffusion d'un module. Le hook pre-commit
refuse un commit où une copie ne correspond plus à sa source.
"""
import hashlib
import shutil
import zipfile
from pathlib import Path

ICI = Path(__file__).resolve().parent
PACK = ICI / "pack_telephone"

# Ordre de l'examen. administratif (bureau) et micro/ (microscope) n'y sont pas.
MODULES = [
    "Macro/examen_clinique.html",
    "Macro/biometrie_clinique.html",
    "Radio/radio.html",
    "Macro/autopsie.html",
    "Macro/neuropath.html",
    "Macro/macro_placenta.html",
]

LISEZMOI = """# Pack téléphone — modules de salle

Copier ce dossier sur le téléphone ou la tablette (clé USB, câble, partage),
ouvrir chaque .html par double-clic. Aucune installation, aucun réseau.

Dans l'ordre de l'examen :

{liste}

Chaque module enregistre sur l'appareil et exporte un `<dossier>_<module>.json`
qu'on recopie ensuite dans `hub/arrivee/` de l'ordinateur — ou qu'on glisse sur
la page du hub. Le numéro de dossier est libre. Ajouter `?selftest=1` à
l'adresse d'un module pour vérifier qu'il est intact (bandeau vert).

Copies des fichiers de Macro/ et Radio/ du dépôt Monolithe_Foeto ; en cas de
doute, la source fait foi. Empreintes SHA-256 dans `EMPREINTES.txt`.
"""


def sha(p: Path) -> str:
    return hashlib.sha256(p.read_bytes()).hexdigest()


def main():
    if PACK.exists():
        shutil.rmtree(PACK)
    PACK.mkdir()
    lignes, empreintes = [], []
    for rel in MODULES:
        src = ICI / rel
        texte = src.read_text(encoding="utf-8")
        version = texte.split('var VERSION = "', 1)[1].split('"', 1)[0]
        titre = texte.split("<title>", 1)[1].split("</title>", 1)[0].strip()
        shutil.copy2(src, PACK / src.name)
        lignes.append(f"- `{src.name}` — {titre} (v{version})")
        empreintes.append(f"{sha(src)}  {src.name}")
    (PACK / "LISEZMOI.md").write_text(LISEZMOI.format(liste="\n".join(lignes)), encoding="utf-8")
    (PACK / "EMPREINTES.txt").write_text("\n".join(empreintes) + "\n", encoding="utf-8")
    with zipfile.ZipFile(ICI / "pack_telephone.zip", "w", zipfile.ZIP_DEFLATED, compresslevel=9) as z:
        for f in sorted(PACK.iterdir()):
            z.write(f, f"pack_telephone/{f.name}")
    print(f"pack_telephone/ — {len(MODULES)} modules, zip {(ICI / 'pack_telephone.zip').stat().st_size // 1024} Ko")


if __name__ == "__main__":
    main()
