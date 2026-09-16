-- SPDX-License-Identifier: CC-BY-NC-SA-4.0 | Hub Light | Monolithe_Foeto
-- ════════════════════════════════════════════════════════════════════════════
-- 0002 — le JSON de module entre en base, les tables par module deviennent
--        un index reconstructible, et le dossier gagne ce qui relève de la
--        décision humaine.
--
-- Ce qui change, et pourquoi.
--
-- 1. `saisies.donnees_json` porte désormais le JSON du module, clichés
--    dépilés. C'est lui qui fait foi côté base : les tables par module en
--    sont dérivées et se refabriquent par `ingest.py --reindex` sans lire
--    l'archive. La base redevient ainsi autonome — utile le jour où elle
--    est servie par un backend, où l'archive n'est plus le seul chemin.
--
-- 2. `saisies.provenance` dit par quelle modalité la saisie est entrée :
--    « telephone » pour un JSON exporté en salle et recopié à la main,
--    « poste » pour une saisie faite sur l'ordinateur et écrite directement.
--    La source de vérité, c'est la modalité d'entrée : pour un JSON venu du
--    téléphone c'est le fichier archivé ; pour une saisie du poste, c'est la
--    ligne en base, dont l'archive n'est qu'un instantané.
--
-- 3. Le dossier gagne un opérateur assigné et une date de clôture. Statut,
--    remarques et clôture sont les seuls champs que personne ne saisit dans
--    un module : ce sont des décisions, pas des constatations.
-- ════════════════════════════════════════════════════════════════════════════

ALTER TABLE saisies ADD COLUMN donnees_json TEXT NOT NULL DEFAULT '{}';
ALTER TABLE saisies ADD COLUMN provenance   TEXT NOT NULL DEFAULT 'telephone'
                    CHECK (provenance IN ('telephone', 'poste'));

ALTER TABLE dossiers ADD COLUMN assigne_a TEXT;
ALTER TABLE dossiers ADD COLUMN clos_at   TEXT;

-- Quand l'index a été refabriqué pour la dernière fois, et depuis quelle
-- version du script. Une divergence entre ceci et schema_migrations est le
-- signe qu'un --reindex s'impose.
CREATE TABLE index_etat (
    id          INTEGER PRIMARY KEY CHECK (id = 1),
    reindexe_at TEXT,
    saisies     INTEGER NOT NULL DEFAULT 0
);
INSERT INTO index_etat (id, reindexe_at, saisies) VALUES (1, NULL, 0);

-- Les comptes rendus produits par le serveur. Un CR n'est pas une donnée de
-- saisie : c'est un rendu daté, qu'on garde pour pouvoir montrer ce qui a été
-- écrit, même si le gabarit a changé depuis.
CREATE TABLE comptes_rendus (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    dossier     TEXT NOT NULL REFERENCES dossiers(numero) ON DELETE CASCADE,
    gabarit     TEXT NOT NULL,
    gabarit_version TEXT,
    texte       TEXT NOT NULL,
    genere_at   TEXT NOT NULL DEFAULT (datetime('now')),
    operateur   TEXT
);
CREATE INDEX idx_cr_dossier ON comptes_rendus(dossier, genere_at);

DROP VIEW vue_dossiers;
CREATE VIEW vue_dossiers AS
SELECT
    d.numero,
    d.statut,
    d.terme_sa,
    d.terme_jours,
    d.sexe,
    d.type_issue,
    d.date_reception,
    d.date_examen,
    d.indication,
    d.remarques,
    d.assigne_a,
    d.clos_at,
    (SELECT COUNT(*)  FROM saisies s WHERE s.dossier = d.numero AND s.courant = 1) AS modules,
    (SELECT group_concat(s.module, ', ')
       FROM (SELECT module FROM saisies WHERE dossier = d.numero AND courant = 1
             ORDER BY module) s)                                                  AS modules_recus,
    (SELECT COUNT(*)  FROM photos p
       JOIN saisies s ON s.id = p.saisie_id AND s.courant = 1
      WHERE p.dossier = d.numero)                                                 AS cliches,
    (SELECT MAX(ingere_at) FROM saisies s WHERE s.dossier = d.numero)             AS derniere_ingestion,
    (SELECT COUNT(*) FROM comptes_rendus c WHERE c.dossier = d.numero)            AS comptes_rendus
FROM dossiers d;
