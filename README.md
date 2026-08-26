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
| `examen_clinique.html` | Morphologie externe étage par étage, clichés de trame et anomalies |
| `biometrie_clinique.html` | Mesures au ruban et au pied à coulisse, z-scores contre les références |
| `radio.html` | Lecture du squelette, mesures des os longs, z-scores de Chitty |
| `autopsie.html` | Le déroulé complet de l'autopsie, masses d'organes et z-scores |

Restent à définir : macroscopie de l'organe fixé, description des coupes,
lecture microscopique, module de neuropathologie. Le script de reprise des
JSON dans la base est en cours.

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

Hors navigateur, sur les quatre modules d'un coup :

```
for f in *.html; do node verif.js "$f"; done
```

## Publier

```
python3 publier.py                 # regénère public/ et sa page d'index
python3 serveur.py                 # sert public/ sur 127.0.0.1:5075
```

`publier.py` ne recopie pas une page écrite à la main : versions, tailles et
empreintes sont relues dans les fichiers eux-mêmes, donc l'index ne peut pas
mentir sur ce qui est publié.

`serveur.py` sert les modules en `application/octet-stream` et non en
`text/html`. Cloudflare injecte un lien piège anti-bot dans toute réponse
`text/html`, unique à chaque requête : le fichier reçu ne serait plus celui
publié, son empreinte ne correspondrait plus, et un document censé fonctionner
hors réseau embarquerait une URL distante.

## Aucune donnée réelle ici

Le dépôt ne contient que des numéros de dossier fictifs (`26P0123`, `25P9999`,
`25P1234`). Le hook `.githooks/pre-commit` refuse tout commit introduisant un
numéro au format `NNPNNNN` qui ne soit pas l'un d'eux. Après clone :

```
git config core.hooksPath .githooks
```

## Licence

[CC BY-NC-SA 4.0](LICENSE) — réutilisation et modification libres, attribution
demandée, partage à l'identique, **usage commercial exclu**.
