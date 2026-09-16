# Hub Light — modules de saisie fœtopathologique

Des formulaires HTML autonomes : un fichier, aucune installation, aucun compte,
aucune connexion. On le télécharge, on l'ouvre par double-clic, on saisit.
La saisie et les clichés restent sur l'appareil ; l'export produit un JSON
que l'on récupère à la main.

Pensés pour des postes de salle d'autopsie hors réseau, où installer quoi que
ce soit n'est ni possible ni souhaitable.

**Téléchargement des dernières versions : <https://hublight.pazuzu.uk>**

## Modules

| Fichier | Contenu |
|---|---|
| `administratif.html` | Identité, circuit du prélèvement, antécédents, grossesses précédentes, examens prénataux |
| `examen_clinique.html` | Morphologie externe étage par étage, clichés de trame et anomalies |
| `biometrie_clinique.html` | Mesures au ruban et au pied à coulisse, z-scores contre les références |
| `radio.html` | Lecture du squelette, mesures des os longs, z-scores de Chitty |
| `autopsie.html` | Le déroulé complet de l'autopsie, masses d'organes et z-scores |
| `neuropath.html` | Examen de l'encéphale fixé, biométries cérébrales et z-scores |
| `micro.html` | Lecture des blocs, une section par lame : maturation, cytoarchitecture, lésions, rétention |
| `macro_placenta.html` | Macroscopie placentaire sur pièce fraîche : cordon, membranes, tranches, clichés |
| `grille_<organe>.html` | Grilles de lecture microscopique, une par organe (17) : prélèvement, rétention, maturation, signes, termes FOETO, compte rendu |

**Manuel d'utilisation avec captures d'écran : [docs/MANUEL.md](docs/MANUEL.md).**

`micro.html` s'ouvre sur une seule section vide qui propose les quatorze
organes. On désigne celui de la lame en main : la section prend son nom et
pose ses axes, on remplit dessous, puis on ajoute une section pour la lame
suivante. Les lames passent dans l'ordre où elles arrivent, jamais dans celui
d'un document à dérouler ; un même organe peut revenir autant de fois qu'il a
de blocs, et une section restée vide se retire.

Le vocabulaire — 2 911 termes recopiés de la base FOETO — ne se montre pas
tant qu'on ne le demande pas. Chaque axe est d'abord une bascule — normal,
anormal — et ne se déroule que sur l'anormal. Là, les termes restent masqués
jusqu'à ce qu'on cherche trois lettres ou qu'on demande la liste entière ;
chacun porte en infobulle la description du livre de référence. Chaque axe
déroulé offre en plus un champ « autre » pour le terme absent, et une zone de
texte pour quantifier et localiser. Aucun calcul n'y est fait : la rétention
s'enregistre comme ce qui est vu, l'intervalle mort-délivrance se déduit au
traitement des données.

Les grilles `grille_<organe>.html` sont produites par `gen_grille.py` à partir
des fragments `grilles/<organe>.js` ; seule `grille_poumon.html` est écrite à
la main. Le script de reprise des JSON dans la base est en cours.

## Numéro de dossier

Champ libre : les lettres passent en majuscules, les espaces sont retirés,
aucun format n'est imposé (`26P0123`, `25P9999`, `A2026-17` sont tous
acceptés). Seul le vide bloque l'enregistrement et l'export. Le numéro donne
son nom au fichier exporté : `<dossier>_<module>.json`.

## Les deux numéros de version

Chaque module en porte deux, visibles dans son en-tête et recopiés dans chaque
JSON exporté. Ils ne disent pas la même chose.

- **`module_version`** — la version du document. Elle change à chaque diffusion :
  un champ ajouté, un libellé corrigé, une anomalie de plus dans une liste.
  Si deux personnes n'ont pas le même numéro, elles n'ont pas le même formulaire.
- **`schema_version`** — la forme du JSON. Elle ne change que si la structure du
  fichier exporté change, car c'est elle que lit le script d'import. Un JSON
  produit par une ancienne version du document reste lisible tant que son
  schéma est le même.

## Banc d'essai

Chaque module embarque le sien. Ouvrir le fichier en ajoutant `?selftest=1` à
son adresse : un bandeau vert `OK : n/n` s'affiche en haut de la page. Rouge,
ne pas s'en servir et le signaler.

## Si vous rediffusez ces fichiers

Servez-les en `application/octet-stream`, jamais en `text/html`.

Un proxy ou un CDN peut réécrire ce qu'il sert. Cloudflare, par exemple, injecte
dans toute réponse `text/html` un lien piège anti-bot, invisible et unique à
chaque requête. Le fichier téléchargé n'est alors plus celui qui a été publié :
son empreinte ne correspond plus, et un document censé fonctionner hors réseau
se retrouve à embarquer une URL distante. En `octet-stream`, rien n'est touché.

Après mise en ligne, comparez l'empreinte du fichier téléchargé à celle du
fichier d'origine. Si elles diffèrent, quelque chose sur le trajet a modifié
le document.

## Aucune donnée réelle ici

Le dépôt ne contient que des numéros de dossier fictifs (`26P0123`, `25P9999`,
`25P1234`). Le hook `.githooks/pre-commit` refuse tout commit introduisant un
numéro de la forme `NNPNNNN` qui ne soit pas l'un d'eux (le garde-fou
ne dit rien du format accepté par les modules, qui est libre). Après clone :

```
git config core.hooksPath .githooks
```

## Licence

`SPDX-License-Identifier: CC-BY-NC-SA-4.0`

[CC BY-NC-SA 4.0](LICENSE) — réutilisation et modification libres, attribution
demandée, partage à l'identique, **usage commercial exclu**. Une seule licence
pour tout le dépôt : les formulaires, les scripts, le vocabulaire et les
gabarits de compte rendu. Chaque fichier porte la ligne SPDX, y compris les
modules HTML — ils sont faits pour circuler seuls, détachés de ce dépôt, et
doivent rester lisibles quant à leur licence une fois arrivés sur une clé USB.

GitHub affichera « Other » plutôt qu'un badge : son détecteur ne connaît aucune
licence non commerciale (il porte CC0, CC-BY et CC-BY-SA, tous trois autorisant
l'usage commercial). Le badge est donc inatteignable tant que la clause NC est
là — c'est un effet du choix de licence, pas un défaut du fichier `LICENSE`.

Deux limites à connaître, la clause NC étant un choix délibéré : une licence
Creative Commons n'accorde **pas de licence de brevet** et n'a pas de notion de
« code source » comme en ont les licences logicielles ; et le partage à
l'identique s'applique aussi aux dérivés des scripts. Si un usage logiciel plus
strict devient nécessaire, PolyForm Noncommercial 1.0.0 dit la même chose en
termes faits pour du code.
