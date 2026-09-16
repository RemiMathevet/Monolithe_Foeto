<!-- SPDX-License-Identifier: CC-BY-NC-SA-4.0 -->
# Hub — reprise des saisies et gestion des cas

Les modules HTML produisent des JSON sur le téléphone ou la tablette de salle.
Ce dossier les reprend sur l'ordinateur : il les archive, les range dans une
base SQLite requêtable, reconstitue les clichés en JPEG sur le disque, et sert
la gestion des cas.

Deux façons de s'en servir, avec les mêmes fichiers :

- **En ligne de commande.** `ingest.py` reprend ce qui est dans `arrivee/`,
  `dossiers.html` s'ouvre par double-clic et lit l'`index.json` produit.
  Bibliothèque standard seule, rien à installer.
- **Avec le serveur local.** `serveur.py` sert la même page, alimentée par la
  base cette fois, avec le pilotage : reprendre les saisies d'un clic, ouvrir
  un module sur un dossier, lui faire écrire directement au hub, clore un cas.
  Demande Flask.

Version 1, à l'essai. Aucune donnée réelle ici : le seul numéro présent est le
`26P0123` fictif du dépôt.

---

## Ce qui fait foi

**La source, c'est la modalité par laquelle la donnée est entrée.** Un examen
saisi au téléphone en salle d'autopsie entre par un JSON exporté puis recopié :
ce fichier fait foi, et il est archivé tel quel, jamais retouché, avec son
empreinte SHA-256 en base. Un dossier administratif tapé sur l'ordinateur entre
directement en base par le serveur : c'est la ligne en base qui fait foi, et le
fichier d'archive n'en est qu'un instantané. La colonne `saisies.provenance`
dit laquelle des deux, et l'arborescence d'archive le redit dans son chemin
(`archive/<dossier>/telephone/…` ou `.../poste/…`) — une arborescence doit se
relire sans la base qui va avec.

**Le JSON du module fait foi en base.** `saisies.donnees_json` porte le document
tel qu'il est arrivé, clichés dépilés. Les tables par module en sont dérivées :
c'est un **index**, refabricable par `ingest.py --reindex` sans lire l'archive.
On corrige un adaptateur, on réindexe, rien d'autre ne bouge.

**Trois niveaux de reconstruction**, du plus léger au plus lourd :

| Commande | Reconstruit | Quand |
|---|---|---|
| `--reindex` | les tables par module, depuis les JSON en base | après avoir corrigé un adaptateur ou ajouté une colonne |
| `--rejouer` | toute la base, depuis `archive/` | la base est perdue ou douteuse |
| — | rien de plus | l'archive est le dernier filet |

**Rien ne se corrige en base.** Une erreur de saisie se corrige dans le module,
qui la ré-enregistre. La nouvelle saisie devient courante, l'ancienne reste avec
`courant = 0` : on garde la trace de ce qui avait été écrit et quand. Les seules
choses qui se décident dans la page de gestion sont le statut, les remarques et
la clôture — des décisions, pas des constatations.

---

## Arborescence

```
hub/
  app/                tout ce qu'il faut pour faire tourner le hub — c'est ce
                      dossier que l'on partage ; les données restent au-dessus
    serveur.bat       double-clic : lance le serveur et ouvre la page
    ingest.bat        double-clic : reprend ce qui attend dans ../arrivee/
    python/           (facultatif, hors dépôt) un python portable ; sinon celui du PATH
    ingest.py         la reprise des JSON — bibliothèque standard seule
    serveur.py        le serveur local — gestion des cas et pilotage (Flask)
    dossiers.html     la page de gestion : autonome hors ligne, pilotée si servie
    web/liaison.js    greffé aux modules quand le serveur les sert
    web/themes.css    les thèmes, servis aux modules
    biometrie.py      les écarts-types, calculés ici
    cr.py             le compte rendu : contexte, rendu Jinja, enregistrement
    bamara.py         la préparation du document BaMaRa
    gabarits/         les gabarits de compte rendu
    migrations/       les scripts de schéma, appliqués dans l'ordre

  outils/             verifier_tables.py — audit des tables embarquées
  references/         les tables de référence — vide dans le dépôt, voir son LISEZMOI
  exemples/           six JSON de démonstration (dossier 26P0123), generer_cas.py
  calculateur-unifie.html  la référence biométrique du dépôt
  bamara.json         les constantes de site — propres au poste, hors dépôt

  arrivee/            ← on y copie les JSON récupérés du téléphone
  archive/26P0123/    les JSON ingérés, horodatés, jamais retouchés
  rejets/             ce qui n'est pas passé, avec un .txt qui dit pourquoi
  photos/26P0123/<module>/          les JPEG reconstitués
  photos/26P0123/<module>/vignettes/ les vignettes, si Pillow est installé
  hub.sqlite          la base de travail
  index.json          l'index lu par dossiers.html, réécrit à chaque passage
```

---

## Premier essai

Les six JSON d'exemple sont déjà dans `arrivee/`. Il suffit de lancer :

```
app\ingest.bat
```

ou, si le python portable est ailleurs, `python app/ingest.py` (depuis `hub/`).

Puis ouvrir `app/dossiers.html` par double-clic et y déposer `index.json`.

Les six modules du dossier `26P0123` apparaissent, avec leurs six clichés.
Pour recommencer : `copy exemples\*.json arrivee\` puis relancer.

## Le serveur local

```
app\serveur.bat
```

ou `serveur.bat` à la racine du dépôt (il appelle celui-ci), ou
`python app/serveur.py` (depuis `hub/`), puis <http://127.0.0.1:5005>. Le
navigateur s'ouvre après 4 s, le temps que le serveur écoute ; second argument
du `.bat` pour changer ce délai (`serveur.bat 5005 8`).

Pour partager le hub, on donne le dossier `app/` complet. Il embarque dans
`app/python/` un Python 3.12 pour Windows 64 bits (build
*python-build-standalone*, licence PSF, `LICENSE.txt` inclus) où Flask et
Pillow sont déjà installés : le poste qui le reçoit n'a rien à installer et
n'a pas besoin de réseau, `serveur.bat` suffit. Les roues (`.whl`) de Flask,
Pillow et leurs dépendances sont gardées dans `app/python/wheels/` ; si un
jour il fallait les réinstaller sur un poste sans réseau :

```
app\python\python.exe -m pip install --no-index --find-links app\python\wheels flask pillow
```

`serveur.bat` fait cet essai tout seul s'il ne trouve pas Flask, et ne tente
le réseau qu'en dernier. `app/python/` est hors dépôt (`.gitignore`) : il pèse
une centaine de Mo et se refait avec les deux commandes ci-dessus. Les données
se créent à côté d'`app/`, dans le dossier parent. Il n'écoute que sur la
boucle locale et n'a **aucun compte** : la protection est celle du poste et de
la session Windows, comme pour le fichier de base lui-même. Ne pas le lier à
`0.0.0.0` avant d'avoir ajouté une authentification.

Ce qu'il ajoute à la page de gestion :

- **Reprendre les saisies** — l'ingestion d'`arrivee/` sur un clic, avec le
  compte rendu ligne par ligne ; plus besoin de lancer le `.bat`.
- **Journal et rejets** — ce qui est passé, ce qui a été refusé et pourquoi, et
  un bouton pour remettre un rejet dans `arrivee/` après une migration.
- **Saisir / Rouvrir** sur chaque module d'un dossier — le module s'ouvre déjà
  positionné sur le numéro, avec deux boutons de plus en bas de page :
  *enregistrer au hub* et *relire depuis le hub*.
- **Statut, remarques, clôture.**

Il n'y a pas de comptes, seulement un champ **« vos initiales »** en haut de la
page, gardé sur ce poste et recopié dans chaque saisie. Les modules refusent
d'ailleurs d'armer un dossier sans opérateur — une constatation sans auteur ne
vaut pas grand-chose — et la page le rappelle tant que le champ est vide.

### Les modules ne sont pas modifiés

Le serveur lit le fichier du dépôt, insère un `<script>` juste avant `</body>`
et envoie. **Rien n'est écrit sur le disque.** Le même `administratif.html`
ouvert par double-clic reste le document autonome qu'il a toujours été, avec
son export JSON et son banc d'essai ; servi par le hub, il gagne la liaison.
Un module ajouté au dépôt apparaît sans qu'on touche au serveur — les versions
affichées sont lues dans le fichier, pas recopiées quelque part.

Ce que fait *enregistrer au hub* : il appelle la propre sortie du module —
`paquet()` s'il encode des clichés, `collecter()` sinon — et poste le résultat.
Ce qui part au hub est donc, à l'octet près, ce que le bouton « Exporter »
aurait écrit dans un fichier. Même enveloppe, mêmes gardes de version, mêmes
adaptateurs, même archivage. Seule la provenance change.

*Relire depuis le hub* rappelle le document archivé, clichés compris, et le
rend au module par son propre `relire()` — la même porte qu'un import de
fichier.

### Dépendance

Flask (qui amène Jinja2). `serveur.bat` propose de l'installer s'il manque.
`ingest.py` reste en bibliothèque standard seule et continue de fonctionner
sans serveur : le mode hors ligne n'est jamais perdu.

---

## Le compte rendu

Onglet « Compte rendu » d'un dossier : on choisit un gabarit, on produit un
brouillon. Il est enregistré avec sa date, son gabarit et sa version — on peut
donc montrer plus tard ce qui avait été écrit, même après un changement de
gabarit ou de table.

Deux gabarits pour l'instant : **complet** (la trame entière, section par
section) et **synthèse** (une page : ce qui est fait, ce qui manque, ce qui
sort de la norme). Ce sont des brouillons, et c'est écrit dedans : rien n'y est
validé par un humain.

**Les gabarits ne nomment pas les champs.** Ils demandent « les champs remplis
de l'étape thorax » et le module fournit les libellés, qu'il embarque déjà dans
son JSON. Un gabarit qui énumérerait quatre-vingt-dix identifiants pourrirait à
la première diffusion de module ; celui-ci suit la trame. Un champ ajouté
apparaît donc dans le compte rendu sans qu'on y touche, avec le libellé qu'a vu
la personne qui l'a rempli. Corollaire : ce qui n'est pas rempli ne s'écrit
pas — un compte rendu qui aligne des « non renseigné » se relit mal.

### Vérifier les tables des modules

Chaque module de salle embarque sa propre copie des référentiels — il le faut
bien, puisqu'il calcule hors réseau. Mais une copie dérive, en silence.

```
python outils/verifier_tables.py            # audite
python outils/verifier_tables.py --corriger # écrit le bloc corrigé, ne touche à rien
```

Il compare ce que chaque module embarque aux tables de
`hub/calculateur-unifie.html` — la référence du dépôt, sous la même licence —
ou, à défaut, à `references/*.json`. Il signale aussi les lignes strictement
identiques, qui trahissent un copier-coller.

`--corriger` régénère le bloc JavaScript dans la forme exacte du module, prêt
à coller, dans `outils/corrections/` (exclu du dépôt). Il ne modifie aucun
module : remplacer une table dans un document diffusé impose d'incrémenter son
`module_version`, et ce n'est pas à un script d'en décider. Il ne dit pas non
plus laquelle des deux versions est la bonne — seulement qu'elles diffèrent,
et où.

Premier usage, septembre 2026 : la table Maroun de `Macro/autopsie.html`
divergeait de 232 valeurs sur 1014, et sa ligne 12 SA était un duplicata de la
13 SA. Corrigée en 1.0.3.

### Les écarts-types

**Le z qui fait foi est calculé ici**, par `biometrie.py`, à partir des mesures
brutes et des tables de `references/`. Le module de saisie calcule le sien en
salle — c'est ce qui permet de remesurer avant que le corps reparte, et cela
n'a pas vocation à disparaître — mais une table de référence se corrige, et un
z gelé dans un JSON ne se corrige pas.

Le z du module reste en base, horodaté : il dit ce qui était affiché à la
saisie. Quand les deux divergent, le compte rendu le signale au lieu de choisir
en silence, et distingue les deux causes :

- **les termes diffèrent** — l'administratif fait autorité, le module d'autopsie
  avait un autre terme, tous les z bougent. C'est attendu, et c'est le terme
  qu'il faut trancher ;
- **à terme identique, les z diffèrent** — alors ce sont les tables qui ne
  concordent pas entre le module et ce poste, et la transcription est à vérifier
  contre l'article.

`references/` est **vide dans le dépôt** : ce sont des transcriptions
d'articles publiés et ce dépôt est public. Sans elles le hub fonctionne, les z
affichés sont ceux des modules et le sont dit. `references/LISEZMOI.md` donne
le format, et `references/importer_luminarium.py` les extrait d'une copie de
FoetoPath Luminarium — les deux dépôts n'ayant pas la même licence, les y
verser reste une décision d'auteur.

---

## Usage courant

| Commande | Effet |
|---|---|
| `python app/ingest.py` | ingère tout ce qui est dans `arrivee/` |
| `python app/ingest.py --dry-run` | dit ce qu'il ferait, n'écrit rien |
| `python app/ingest.py --init` | crée la base et l'arborescence, puis sort |
| `python app/ingest.py --index-seul` | réécrit `index.json` sans rien ingérer |
| `python app/ingest.py --reindex` | refabrique les tables par module depuis les JSON en base |
| `python app/ingest.py --rejouer` | vide la base et la reconstruit depuis `archive/` |
| `python app/serveur.py --port 5010` | serveur local sur un autre port |
| `python app/serveur.py --depot D:\Monolithe` | dépôt des modules HTML ailleurs que dans le dossier parent |
| `python app/ingest.py --base D:\hub` | travaille sur une autre racine |

Le script sort avec un code non nul s'il y a eu au moins un rejet.

**Dépendances.** Bibliothèque standard seule. Si Pillow est importable, il sert
à vérifier que chaque JPEG décodé s'ouvre vraiment et à fabriquer une vignette
de 320 px ; sinon on se contente des octets d'en-tête et le tableau affiche les
clichés en pleine taille. Le script dit lequel des deux cas s'applique au
démarrage.

**Où poser le hub.** Sur un disque local. SQLite a besoin de verrous que les
lecteurs réseau et certains dossiers synchronisés n'offrent pas ; le script s'en
accommode — il essaie WAL, puis un verrou exclusif avec journal tronqué, puis un
journal en mémoire, et dit lequel il a retenu — mais le dernier mode n'est pas
sûr en cas de coupure. La base se reconstruit alors par `--rejouer`, l'archive
n'étant jamais en jeu. Si aucun des trois ne passe, le script le dit et s'arrête
plutôt que d'écrire à moitié.

---

## Ce que fait l'ingestion, dans l'ordre

1. **Lecture de l'enveloppe.** `schema_version`, `module`, `module_version`,
   `dossier` doivent être présents ; le numéro est libre (lettres, chiffres,
   `. _ -`, 64 caractères au plus — il devient un nom de répertoire).
2. **Garde de version.** Le couple `(module, schema_version)` doit avoir un
   adaptateur. Sinon le fichier part en `rejets/` avec le motif : *« module
   radio en schéma 9.9.9 inconnu de cette base, il faut une migration »*. Un
   JSON à moitié rangé serait pire qu'un rejet lisible.
3. **Doublon.** Si le SHA-256 est déjà en base, on ne réingère pas ; le fichier
   est simplement retiré d'`arrivee/`. Recopier deux fois la même clé USB ne
   duplique rien.
4. **Transaction.** Création du dossier s'il n'existe pas, bascule de l'ancienne
   saisie du module en `courant = 0`, insertion de la nouvelle, remplissage des
   tables du module, décodage des clichés.
5. **Clichés.** Le base64 est décodé, les octets d'en-tête doivent dire JPEG,
   PNG ou WebP, et la taille doit correspondre au champ `bytes` annoncé par le
   module. Le fichier va dans `photos/<dossier>/<module>/<key>.jpg`, et seul le
   **chemin relatif** entre en base : l'arborescence se déplace d'un poste à
   l'autre sans rien réécrire. Le base64 n'entre jamais en base.
6. **Archivage.** Le JSON est déplacé dans `archive/<dossier>/`, préfixé de
   l'horodatage. Il ne reste rien dans `arrivee/`.
7. **Index.** `index.json` est réécrit pour `dossiers.html`.

Tout échec fait un `ROLLBACK` : soit une saisie est entièrement rangée, soit
elle n'est pas rangée du tout, et le fichier part en `rejets/`.

---

## Le schéma

Une table — ou un petit groupe de tables — par module, comme convenu.

| Table | Contenu |
|---|---|
| `dossiers` | un dossier par numéro, plus quelques colonnes de synthèse recopiées de l'administratif pour trier et chercher, et ce qui relève de la décision : statut, remarques, clôture |
| `saisies` | le registre **et le document** : une ligne par JSON ingéré, avec `donnees_json` (le JSON, clichés dépilés), l'empreinte, le chemin d'archive, la provenance et `courant` |
| `photos` | les clichés de tous les modules, chemins relatifs |
| `journal` | ce qui est passé, ce qui a été refusé et pourquoi |
| `comptes_rendus` | les CR produits, datés, avec le gabarit qui les a écrits |
| `admin_dossier`, `admin_grossesses`, `admin_grossesse_foetus`, `admin_chronologie`, `admin_coherence` | module administratif |
| `examen_clinique`, `..._items`, `..._anomalies`, `..._cliches_libres` | examen clinique externe |
| `biometrie_clinique`, `..._mesures` | biométrie clinique |
| `radio`, `radio_chips`, `radio_os_longs`, `radio_maturation`, `radio_hpo` | imagerie |
| `autopsie`, `autopsie_champs`, `autopsie_chips`, `autopsie_cliches_libres` | autopsie |
| `neuropath`, `neuropath_champs`, `neuropath_chips`, `neuropath_cliches_libres` | neuropathologie |

Deux choix méritent d'être dits, parce qu'ils ne se devinent pas :

**Les listes sortent en table fille.** Une puce, une anomalie, un os long, un
code HPO ne sont pas des colonnes : leur nombre change à chaque diffusion de
formulaire. `radio_chips`, `examen_clinique_anomalies`, `autopsie_chips` les
portent, une ligne par valeur.

**Les trames à champs typés sont en lignes, pas en colonnes.** `autopsie_champs`
et `neuropath_champs` ont une ligne par champ (`champ_id`, `type`, puis
`valeur_txt` / `valeur_num` / `valeur_bool` / `total` / les z selon le type).
La trame d'autopsie compte déjà 74 champs de six types et s'allonge à chaque
version : une colonne par champ voudrait dire une migration à chaque libellé
ajouté. Les modules à trame fixe — administratif, radio, biométrie — sont en
colonnes, eux, parce qu'on les requête tout le temps.

**Les dates de l'administratif gardent leur précision.** Le module exporte
`{annee, mois, jour, precision}` : une date connue au mois près ne doit pas
devenir un 1er du mois silencieux. La base garde le texte ISO tronqué
(`2026`, `2026-03`, `2026-03-14`) **et** la précision dans une colonne à côté.
Une date illisible ressort à `NULL` avec la précision `err`.

**Les z-scores gardent leur référentiel.** `neuropath_champs` porte
`z_reference`, `z_source`, `attendu_m`, `attendu_sd` : un z sans son
référentiel n'est pas relisible dix ans après.

### Vues

`vue_dossiers` (une ligne par cas, modules reçus et clichés comptés),
`vue_saisies_courantes`, `vue_anomalies_cliniques`, `vue_masses`.

---

## Faire évoluer un module

Un module diffusé avec un champ de plus change son `module_version` mais pas son
`schema_version` : rien à faire, l'ingestion range le nouveau champ dans la même
table de lignes, ou l'ignore s'il s'agit d'une trame en colonnes.

Un module dont la **forme** du JSON change incrémente son `schema_version`.
Alors :

1. écrire `migrations/000N_<ce_qui_change>.sql` — jamais retoucher une migration
   déjà appliquée quelque part ;
2. écrire l'adaptateur Python correspondant et l'inscrire dans `ADAPTATEURS`
   sous le nouveau couple `(module, schema_version)` ;
3. **garder l'ancien adaptateur**. Les JSON déjà archivés sont dans l'ancien
   schéma, et `--rejouer` doit continuer à les relire. C'est tout l'intérêt de
   garder l'archive.

`ADAPTATEURS` fait foi et est recopié dans la table `modules_supportes` à chaque
migration : un lecteur SQL sait ce que la base sait ingérer sans lire le script.

Versions couvertes aujourd'hui : administratif 0.3.0, examen_clinique 0.1.0,
biometrie_clinique 0.1.0, radio 0.1.0, autopsie 0.1.0, neuropath 0.1.0.
Les grilles microscopiques et le placenta ne sont pas encore ingérés.

---

## Le tableau `dossiers.html`

Autonome comme les modules : un fichier, aucune bibliothèque, aucune police
distante, aucun `fetch`. Il ne lit pas la base directement — cela demanderait
sql.js, donc un fichier distant — il lit `index.json`, qu'on y dépose ou qu'on
choisit par le sélecteur.

Il donne la liste filtrable des cas (recherche plein texte, statut, module
manquant), l'export CSV de ce qui est affiché, et pour chaque dossier : les
modules reçus avec leurs deux numéros de version, les clichés en vignettes,
les items cliniques anormaux, les masses d'organes avec leurs z, et les alertes
de cohérence calculées par le module administratif à l'export.

Les clichés s'affichent si la page est ouverte **à la racine du hub**, à côté de
`photos/`. Ailleurs, les cases restent vides et le reste fonctionne.

Banc d'essai : ouvrir `dossiers.html?selftest=1`, bandeau vert `OK : 16/16`.

### Statut d'un dossier

`ouvert` à la création, `en_cours` dès qu'un module est arrivé, `complet` quand
les six y sont. Le passage à `clos` reste une décision humaine — le script n'y
touche pas.

---

## Ce que la V1 ne fait pas

- Aucune conclusion rédigée : le gabarit complet liste les éléments à reprendre
  et laisse la conclusion à écrire. C'est délibéré.
- Aucune gestion des grilles microscopiques ni du placenta : les modules
  existent, l'adaptateur reste à écrire.
- Aucune purge ni durée de conservation.
- Aucun contrôle d'accès : la base est un fichier sur un disque, la protection
  est celle du poste et de la session.
- Aucun envoi vers BaMaRa. La traduction est faite à la saisie par le module
  administratif et rangée telle quelle (`bamara_birth`, `bamara_termination_type`,
  `bamara_stp_type`) ; rien ne sort d'ici.

---

## Licence

`SPDX-License-Identifier: CC-BY-NC-SA-4.0` — même licence que le reste du dépôt.
