# Valeurs de référence relevées dans les articles

Ces JSON sont la vérité contre laquelle `batterie.py` confronte les tables des
modules. Ils ont été relevés **aux coordonnées des mots** des PDF
(`pdftotext -bbox`), puis recoupés sur la page rendue en image.

## Pourquoi pas le rendu texte

`pdftotext -layout` réordonne les colonnes sans prévenir. Les trois articles
piègent chacun à leur façon :

- **Maroun** — les tableaux 2 et 3 sont **tournés à 90°** : les âges courent en
  x, les strates de macération en y. Et le papier laisse des cases **vides**
  (thymus grades 2 et 3 avant 14 SA, rate 2-3 à 12 SA). Un parseur qui lit les
  nombres de gauche à droite comble ces trous en décalant tout l'aval.
- **Muller-Brochut** — tableau 4 également tourné à 90°. Les colonnes
  Right/Left Lung et Right/Left Kidney sont vides à 12 SA.
- **Guihard-Costa** — tableau 4, « Crown–heel » et « Crown–rump » sont deux
  sections successives que le rendu texte entremêle. Lu ainsi, la taille chute
  de 492 mm à 356 mm entre 37-38 et 39-40 SA. Le tableau 2 met les organes
  pairs en double bloc gauche/droite, huit nombres par ligne au lieu de quatre,
  et le thymus porte un tiret en 5ᵉ percentile.

## Fichiers

| Fichier | Article | Table | Contenu |
|---|---|---|---|
| `maroun.json` | Maroun & Graem, *Pediatr Dev Pathol* 2005 | 2 et 3 | organes 12-43 SA par grade de macération |
| `muller_brochut.json` | Muller-Brochut et al., *Pediatr Dev Pathol* 2018 | 4 | 14 colonnes, 12-20 SA |
| `guihard_costa_organes.json` | Guihard-Costa et al., *Pediatr Dev Pathol* 2002 | 2 | organes par intervalle de 2 SA |
| `guihard_costa_paires.json` | idem | 2 | organes pairs, gauche et droite séparés, avec percentiles |
| `guihard_costa_biometrie.json` | idem | 2 et 4 | masse, VT, VC, PC, pied, avec percentiles |

Les PDF eux-mêmes ne sont pas dans le dépôt (droits d'auteur). Ils sont dans
`Refs.zip`, dossier `Refs/articles/`.

## Conventions de recombinaison

Guihard-Costa publie poumons, reins et surrénales **côte par côte**. Les
modules les entrent en `masse2`, qui additionne droite et gauche avant de
noter. La table doit donc décrire la **paire** :

    moyenne    = G + D
    écart-type = σG + σD

et non la moyenne quadratique √((σG² + σD²)/2), qui décrit **un** organe.
Mélanger les deux double le z. Voir le commentaire au-dessus de `GC_ORG` dans
`autopsie.html`.

Une case vide dans un article est une donnée : elle vaut `null`, jamais `0`.
Un `0` avec un écart-type réel produit un z parfaitement défini et faux.
