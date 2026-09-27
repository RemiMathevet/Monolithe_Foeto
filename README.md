# Hub Light — modules de saisie fœtopathologique

Des formulaires HTML autonomes : un fichier, aucune installation, aucun compte,
aucune connexion. On le télécharge, on l'ouvre par double-clic, on saisit.
La saisie et les clichés restent sur l'appareil ; l'export produit un JSON
que l'on récupère à la main.

Pensés pour des postes de salle d'autopsie hors réseau, où installer quoi que
ce soit n'est ni possible ni souhaitable.

## Modules

| Fichier | Contenu |
|---|---|
| `admin/administratif.html` | Identité, circuit du prélèvement, antécédents, grossesses précédentes, examens prénataux |
| `Macro/examen_clinique.html` | Morphologie externe étage par étage, clichés de trame et anomalies |
| `Macro/biometrie_clinique.html` | Mesures au ruban et au pied à coulisse, z-scores contre les références |
| `Radio/radio.html` | Lecture du squelette, mesures des os longs, z-scores de Chitty |
| `Macro/autopsie.html` | Le déroulé complet de l'autopsie, masses d'organes et z-scores |
| `Macro/neuropath.html` | Examen de l'encéphale fixé, biométries cérébrales et z-scores |
| `micro/micro.html` | Lecture des blocs, une section par lame : maturation, cytoarchitecture, lésions, rétention |
| `Macro/macro_placenta.html` | Macroscopie placentaire sur pièce fraîche : cordon, membranes, tranches, clichés |
| `micro/grille_<organe>.html` | Grilles de lecture microscopique, une par organe (17) : prélèvement, rétention, maturation, signes, termes FOETO, compte rendu |

**Pack téléphone : [`pack_telephone/`](pack_telephone/) ou
[`pack_telephone.zip`](pack_telephone.zip)** — les six modules de salle
(examen clinique, biométrie, radio, autopsie, neuropath, macro placenta) à
copier tels quels sur le téléphone ou la tablette. Copies de `Macro/` et
`Radio/`, refaites par `pack_telephone.py` ; le hook refuse une copie qui
dévie de sa source.

**Manuel d'utilisation avec captures d'écran : [docs/MANUEL.md](docs/MANUEL.md).**

## Le hub — reprise des JSON en base

`hub/` reprend les JSON exportés par les modules sur l'ordinateur : archive
horodatée, base SQLite (`hub/hub.sqlite`), clichés reconstitués en JPEG,
page de gestion des cas, comptes rendus Jinja et préparation du document
BaMaRa. **`serveur.bat` à la racine** lance le serveur local
(<http://127.0.0.1:5005>) et ouvre la page après quelques secondes ;
`hub/app/ingest.py` fait la reprise seule, en bibliothèque standard.
L'onglet **Biblio** du hub reprend le paquet `data_hub_vN.zip` publié par
[data.pazuzu.uk](https://data.pazuzu.uk/browse/scripts) — akinator sur la
matrice des livres, familles de syndromes fœtaux, fiches de lecture micro —
et le sert hors ligne. Tout est décrit dans [hub/README.md](hub/README.md).

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

Les grilles `micro/grille_<organe>.html` sont produites par `micro/gen_grille.py`
à partir des fragments `micro/grilles/<organe>.js` ; seule `grille_poumon.html`
est écrite à la main. `micro/assembler.py` les monte en un seul étui
`microscopie.html` (non versionné, se refait en une commande).

## Numéro de dossier

Champ libre : les lettres passent en majuscules, les espaces sont retirés,
aucun format n'est imposé (`26P0123`, `25P9999`, `A2026-17` sont tous
acceptés). Seul le vide bloque l'enregistrement et l'export. Le numéro donne
son nom au fichier exporté : `<dossier>_<module>.json`. Le hub applique la
même liberté, avec la seule règle qu'impose un nom de répertoire : lettres,
chiffres, `. _ -`, 64 caractères au plus.

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

## Destination et statut réglementaire

**Ce logiciel n'est pas un dispositif médical** au sens du règlement (UE)
2017/745 : il ne porte pas de marquage CE et ne pose aucun diagnostic. C'est
un outil de saisie et de documentation de l'examen fœtopathologique ; le
compte rendu qu'il produit est un brouillon, et toute conclusion appartient au
praticien qui le relit et le signe.

Les **écarts-types** calculés contre les références publiées et les **pistes
syndromiques** proposées par l'akinator sont fournis **à des fins de recherche
uniquement (Research Use Only)**. L'interface le rappelle là où ils
s'affichent.

Cet avis est une condition additionnelle de la licence du code (AGPL-3.0,
article 7(b)) : quiconque redistribue ou modifie ce logiciel doit le conserver
— voir [`NOTICE`](NOTICE).

## Licence

Deux licences, selon la nature du fichier ; chaque fichier porte sa ligne SPDX,
y compris les modules HTML, faits pour circuler seuls sur une clé USB.

- **Code** — modules HTML, scripts, serveur, gabarits de compte rendu :
  [GNU AGPL v3 ou ultérieure](LICENSE) (`AGPL-3.0-or-later`). Libre d'usage,
  de modification et de redistribution, usage commercial compris ; toute
  version modifiée, y compris servie à d'autres par le réseau (le hub, une
  démonstration), doit publier son code source sous la même licence.
- **Contenu** — documentation `.md`, captures, textes :
  [CC BY 4.0](LICENSE-CONTENT) (`CC-BY-4.0`), attribution demandée.
- **Données tierces** — HPO, Orphanet, valeurs de référence publiées : elles
  gardent leur licence et se citent à leur source (détail dans `NOTICE`). Le
  paquet data_hub de la Biblio n'est pas dans ce dépôt.

Les versions publiées avant ce changement restent disponibles sous
CC BY-NC-SA 4.0, licence sous laquelle elles ont été diffusées.
