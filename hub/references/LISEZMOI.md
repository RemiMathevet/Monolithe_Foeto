<!-- SPDX-License-Identifier: CC-BY-NC-SA-4.0 -->
# Références biométriques

Les tables avec lesquelles le hub recalcule les écarts-types (DS), recopiées
des modules de saisie :

| fichier | module source | tables |
|---|---|---|
| `autopsie.json` | `Macro/autopsie.html` | masses d'organes — Guihard-Costa 2002 (GC), Maroun 2017 (MA, par grade de macération), Muller-Brochut 2018 (MB, 12-20 SA) |
| `biometrie_clinique.json` | `Macro/biometrie_clinique.html` | masse fœtale, pied, VT, VC, PC, BIP, FO, main, PT, PA — mêmes trois sources |

Chaque fichier porte aussi la correspondance champ → clé de table (`champs`,
`mesures`), les diviseurs d'unité (`mad`, `mbd` : saisie en mm, table en cm)
et la version du module dont il est tiré.

## Une seule copie des tables : celle du module

Une table se corrige **dans le module**, puis :

```
python hub/references/extraire_modules.py
```

Le hub recalcule alors tous les dossiers avec la table corrigée. Le DS affiché
à la saisie reste en base ; `biometrie.comparer()` signale les dossiers où les
deux s'écartent — une table corrigée, un terme rectifié après coup, ou une
erreur.

Le calcul (`hub/app/biometrie.py`) suit la règle des modules à l'identique :
classes bi-hebdomadaires GC, SA entière pour MA et MB, suffixe Maroun selon le
grade de macération, organes pairs notés sur la somme droite + gauche.

## Ordre de recherche

`<base>/references/` d'abord (la racine passée à `--base`), puis ce dossier.
