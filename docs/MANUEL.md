# Hub Light — manuel d'utilisation

Tous les cas montrés ici sont fictifs (`26P0123`, opérateur `AB`).

## 1. Ouvrir un module

Télécharger le fichier `.html` voulu, l'ouvrir par double-clic. Aucun serveur,
aucun réseau, aucun compte. Le module fonctionne dans Chrome, Edge, Firefox et
Safari récents ; sur tablette aussi.

Tout ce qui est saisi reste dans le navigateur de l'appareil (IndexedDB) ;
rien n'est transmis. Le résultat sort sous forme d'un fichier JSON à récupérer
à la main (clé USB, dossier partagé, messagerie du service).

## 2. Déverrouiller la saisie

À l'ouverture, seule la section **01 Dossier** est active. Le reste est grisé.

![Module verrouillé](captures/01_verrou.png)

Deux champs déverrouillent le module :

- **Numéro de dossier** — texte libre, les lettres tapées passent
  automatiquement en majuscules et les espaces sont retirés (`25p9999` devient
  `25P9999`). Aucun format n'est imposé. Il donne son nom au fichier exporté :
  `26P0123_examen_clinique.json`.
- **Opérateur / Lecteur** — initiales, consignées dans l'export.

Dès que les deux sont renseignés, les sections suivantes s'allument et
l'enregistrement local démarre.

![Module déverrouillé](captures/02_deverrouille.png)

Les grilles de lecture microscopique demandent en plus le **terme en SA** :
c'est contre lui que la maturation est jugée.

## 3. Saisir

La règle est la même partout : **tout se clique**, seuls le dossier, les
comptes et les textes libres se tapent.

### Boutons-clics

Un bouton se coche d'un clic, se décoche d'un second. Un bouton vert plein est
coché. Sur les lignes « Présent / Absent », un seul des deux peut être actif.

Le compteur en haut à droite de chaque section (`3/9`) dit combien de choix
ont été faits sur le total : une section à `0/n` n'est pas « normale », elle
est **non regardée**.

![Boutons et verdicts](captures/04_verdicts.png)

### Verdicts

Sous chaque section des grilles, un encadré se recalcule à chaque clic :
recevabilité du prélèvement, borne inférieure de rétention, stade de
maturation attendu contre observé. Vert = cohérent, ambre = réserve,
rouge = incompatible. Il **affiche**, il ne se choisit pas.

### Signes et vocabulaire FOETO

Dans l'autopsie, l'examen clinique, la microscopie et les grilles, les signes
proposés viennent du vocabulaire FOETO. Un point discret après un libellé
signale un terme de la base. Le bouton « tous les signes attestés (n) » déroule
la liste complète ; le champ de recherche à 3 lettres la filtre.

![Autopsie — thorax](captures/08_autopsie.png)

### Clichés

Chaque cadre gris est un cliché à réaliser. Un clic ouvre l'appareil photo
(tablette) ou un sélecteur de fichier. Le cliché est conservé **en pleine
résolution** dans le stockage local et embarqué tel quel dans l'export ; la
vignette n'est qu'un affichage. Le bouton « + cliché + descriptif » ajoute un
cliché hors trame.

### Microscopie

`micro.html` s'ouvre sur une section vide qui propose les organes. On désigne
celui de la lame en main, la section prend son nom et pose ses axes ; « +
ajouter une section » ouvre la lame suivante. Un même organe peut revenir
autant de fois qu'il a de blocs, une section restée vide se retire.

![Microscopie](captures/07_micro.png)

## 4. Compte rendu

Les grilles de lecture composent un compte rendu texte à partir des clics.
Il se relit dans la section **Compte rendu**, un bouton le copie dans le
presse-papiers. La zone « Remarque libre » reçoit ce que la grille ne prévoit
pas ; elle part avec l'export.

![Compte rendu et sortie](captures/05_sortie.png)

## 5. Exporter, relire, effacer

- **Exporter le JSON** — écrit `<dossier>_<module>.json` dans le dossier de
  téléchargement. Actif seulement quand dossier et opérateur sont saisis.
- **Relire un JSON** — recharge un export précédent dans le module, pour
  compléter ou corriger. Le dossier et l'opérateur sont repris du fichier.
- **Vider / Effacer le stockage** — supprime tout ce que ce module a enregistré
  dans le navigateur de l'appareil. À faire une fois l'export récupéré.

Le JSON porte deux numéros : `module_version` (le formulaire) et
`schema_version` (la forme du fichier, celle que lit le script d'import).

## 6. Vérifier un module

Ajouter `?selftest=1` à l'adresse du fichier : un bandeau vert `OK : n/n`
s'affiche en haut de page. Rouge, ne pas s'en servir et le signaler.

![Banc d'essai](captures/06_selftest.png)

La section **Diagnostic** en bas de page dit comment le fichier est ouvert,
si IndexedDB fonctionne et si le stockage est persistant. « Non accordé »
signifie que le navigateur peut effacer les données locales s'il manque de
place : exporter sans attendre.

## 7. Le hub — reprendre les JSON sur l'ordinateur

Double-clic sur `serveur.bat` à la racine du dépôt : le serveur local démarre
et la page de gestion s'ouvre quelques secondes plus tard sur
<http://127.0.0.1:5005>. Les JSON récupérés du téléphone se déposent dans
`hub/arrivee/` (ou se glissent sur la page), l'onglet **Ingestion** les
reprend d'un clic : archive horodatée, base SQLite, clichés en JPEG.

![Hub — dossiers](captures/09_hub_dossiers.png)

Chaque dossier montre ses modules reçus et manquants ; « Saisir / Rouvrir »
ouvre le module déjà positionné sur le numéro, avec un bouton *enregistrer au
hub*. Le numéro de dossier y est aussi libre que dans les modules.

![Hub — fiche d'un dossier](captures/10_hub_fiche.png)

**Biblio.** Télécharger `data_hub_vN.zip` sur
[data.pazuzu.uk/browse/scripts](https://data.pazuzu.uk/browse/scripts) et le
glisser dans l'onglet **Biblio** : les fiches de lecture microscopique, les
familles de syndromes fœtaux et l'akinator (matrice des livres + termes
FOETO) sont alors consultables hors ligne. Un nouveau paquet remplace le
précédent.

![Biblio — fiche](captures/11_biblio_fiche.png)

![Biblio — akinator](captures/13_biblio_akinator.png)

Le détail (ingestion en ligne de commande, comptes rendus, BaMaRa,
sauvegarde) est dans [hub/README.md](../hub/README.md).

## 8. Ce qu'il ne faut pas faire

- Ne pas renommer le fichier `.html` : le nom du module entre dans le nom de
  l'export.
- Ne pas ouvrir deux fois le même module dans deux onglets sur le même
  dossier : les deux écriraient dans le même stockage.
- Ne pas compter sur le stockage local comme archive : l'export JSON est la
  seule copie qui survit à un nettoyage du navigateur.
