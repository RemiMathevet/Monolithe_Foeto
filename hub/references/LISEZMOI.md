<!-- SPDX-License-Identifier: CC-BY-NC-SA-4.0 -->
# Références biométriques

Ce dossier est **vide dans le dépôt**, et c'est délibéré.

Les tables de Guihard-Costa et de Maroun sont des transcriptions d'articles
publiés. Leur diffusion ne se décide pas dans un module de calcul, et ce dépôt
est public sous CC BY-NC-SA. Tant que rien n'est ici, le hub fonctionne : les
écarts-types affichés sont ceux calculés par les modules de saisie, et ils sont
signalés comme tels. On perd la correction rétroactive — une table qu'on
rectifie ne profite pas aux dossiers déjà saisis — mais rien d'autre.

## Ce qu'il faut y mettre

### `guihard_costa.json`

```json
{
  "source": "Guihard-Costa AM et al., 2002",
  "organes": {
    "13-14": {"coeur": {"moy": 0.24, "sd": 0.13}, "poumons": {"moy": 1.26, "sd": 0.25}},
    "15-16": {"...": {}}
  },
  "biometries": {
    "13-14": {"masse": {"moy": 0.0, "sd": 0.0}}
  }
}
```

Les classes sont bi-hebdomadaires à partir de 13 SA (`13-14`, `15-16`, …). Les
noms d'organes attendus sont ceux de `biometrie.ORGANES` : `thymus`, `coeur`,
`poumons`, `foie`, `pancreas`, `rate`, `surrenales`, `reins`, `cerveau`. Un
organe absent n'est pas une erreur : il ressort sans z.

### `maroun.json`

```json
{
  "source": "Maroun LL, Graem N, 2017",
  "par_sa": {
    "24": {"Mean": {"heart": 1.2, "liver 0 1": 40.0}, "SD": {"heart": 0.3}}
  }
}
```

Maroun stratifie certains organes par grade de macération : les clés portent le
grade (`liver 0 1`, `liver 2`, `liver 3`). Le calcul cherche la clé qui couvre
le grade observé, puis la clé nue. Les noms sont ceux de l'article, en anglais —
`biometrie._maroun_cle` fait le lien avec les noms français des organes, à
compléter si votre transcription utilise d'autres intitulés.

## Les extraire d'une copie de Luminarium

`importer_luminarium.py` lit le `reference_data.py` d'une copie de FoetoPath
Luminarium et écrit les deux fichiers ci-dessus :

```
python references/importer_luminarium.py --source C:\chemin\vers\Luminarium\Foeto
```

**Attention à la licence.** Luminarium est sous « FoetoPath — Custom Research
License », ce dépôt sous CC BY-NC-SA 4.0. Verser des tables de l'un dans l'autre
est une décision d'auteur, pas une opération technique. Le script écrit dans
`references/`, que `.gitignore` exclut : rien ne part au dépôt public tant que
vous ne l'y mettez pas vous-même.

## Ce que le hub en fait

`biometrie.calculer()` produit le z qui fait foi — affiché, et repris dans le
compte rendu. Le z calculé par le module de saisie reste en base, horodaté :
il dit ce qui était sous les yeux de l'opérateur au moment où il a décidé de
remesurer ou non. `biometrie.comparer()` signale les divergences entre les
deux, qui trahissent une table corrigée, un terme rectifié après coup, ou une
erreur — dans les trois cas il vaut mieux le voir.
