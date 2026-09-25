# Pack téléphone — modules de salle

Copier ce dossier sur le téléphone ou la tablette (clé USB, câble, partage),
ouvrir chaque .html par double-clic. Aucune installation, aucun réseau.

Dans l'ordre de l'examen :

- `examen_clinique.html` — Examen clinique externe (v2.1.14)
- `biometrie_clinique.html` — Biométrie clinique (v1.3.0)
- `radio.html` — Imagerie radiologique (v1.0.1)
- `autopsie.html` — Autopsie — examen interne (v2.0.13)
- `neuropath.html` — Neuropathologie — examen de l'encéphale fixé (v1.1.1)
- `macro_placenta.html` — Macro placentaire — pièce fraîche (v1.1.1)

Chaque module enregistre sur l'appareil et exporte un `<dossier>_<module>.json`
qu'on recopie ensuite dans `hub/arrivee/` de l'ordinateur — ou qu'on glisse sur
la page du hub. Le numéro de dossier est libre. Ajouter `?selftest=1` à
l'adresse d'un module pour vérifier qu'il est intact (bandeau vert).

Copies des fichiers de Macro/ et Radio/ du dépôt Monolithe_Foeto ; en cas de
doute, la source fait foi. Empreintes SHA-256 dans `EMPREINTES.txt`.
