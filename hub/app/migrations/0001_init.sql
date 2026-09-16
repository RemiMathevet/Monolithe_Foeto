-- SPDX-License-Identifier: CC-BY-NC-SA-4.0 | Hub Light | Monolithe_Foeto
-- ════════════════════════════════════════════════════════════════════════════
-- 0001 — base de travail du hub fœtopathologie
--
-- Ce fichier crée une base VIDE. Il ne contient aucune donnée.
--
-- Principe : les JSON exportés par les modules sont la source de vérité et
-- sont archivés tels quels après ingestion. Cette base est une vue de travail,
-- reconstructible à tout moment en rejouant l'archive. Rien ici ne doit être
-- saisi à la main : une correction se fait dans le module, se ré-exporte, et
-- se ré-ingère.
--
-- Une table (ou un petit groupe de tables) par module. Les listes — puces,
-- anomalies, os longs, HPO — sont sorties dans une table fille : une puce
-- n'est pas une colonne, et le nombre de puces change à chaque diffusion de
-- formulaire. Les champs, eux, suivent le module : ajouter un champ à un
-- formulaire demande une migration, c'est le prix du SQL requêtable.
-- ════════════════════════════════════════════════════════════════════════════

-- Le mode de journal n'est pas fixé ici : ingest.py le choisit à l'ouverture,
-- parce qu'il dépend du disque et non du schéma (voir ouvrir()).
PRAGMA foreign_keys = ON;

-- ── Versionnement de la base ────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS schema_migrations (
    version     INTEGER PRIMARY KEY,
    nom         TEXT    NOT NULL,
    applique_at TEXT    NOT NULL DEFAULT (datetime('now'))
);

-- Versions de schéma de JSON que cette base sait lire, module par module.
-- L'ingestion refuse un JSON dont le couple (module, schema_version) n'est
-- pas ici : mieux vaut un rejet lisible qu'une ligne à moitié remplie.
CREATE TABLE modules_supportes (
    module          TEXT NOT NULL,
    schema_version  TEXT NOT NULL,
    migration       INTEGER NOT NULL REFERENCES schema_migrations(version),
    PRIMARY KEY (module, schema_version)
);

-- ════════════════════════════════════════════════════════════════════════════
-- 1. DOSSIER — l'entité centrale
-- ════════════════════════════════════════════════════════════════════════════

-- Un dossier existe dès qu'un JSON le nomme, même sans module administratif.
-- Les colonnes de synthèse sont recopiées depuis administratif quand il
-- arrive ; elles ne sont qu'un confort de tri et de recherche, la vérité
-- reste dans admin_dossier.
CREATE TABLE dossiers (
    numero          TEXT PRIMARY KEY,                        -- NNPNNNN
    statut          TEXT NOT NULL DEFAULT 'ouvert'
                    CHECK (statut IN ('ouvert','en_cours','complet','clos')),
    terme_sa        INTEGER,
    terme_jours     INTEGER,
    sexe            TEXT,
    type_issue      TEXT,
    date_reception  TEXT,                                     -- AAAA-MM-JJ
    date_examen     TEXT,
    indication      TEXT,
    remarques       TEXT,
    cree_at         TEXT NOT NULL DEFAULT (datetime('now')),
    maj_at          TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TRIGGER trg_dossiers_maj
AFTER UPDATE ON dossiers FOR EACH ROW
BEGIN
    UPDATE dossiers SET maj_at = datetime('now') WHERE numero = OLD.numero;
END;

-- ════════════════════════════════════════════════════════════════════════════
-- 2. SAISIES — le registre d'ingestion
-- ════════════════════════════════════════════════════════════════════════════

-- Une ligne par JSON ingéré. On garde l'historique : un même module ré-exporté
-- crée une nouvelle saisie, et l'ancienne passe à courant = 0. Rien n'est
-- écrasé, on ne perd pas la trace d'une saisie corrigée.
CREATE TABLE saisies (
    id              INTEGER PRIMARY KEY AUTOINCREMENT,
    dossier         TEXT NOT NULL REFERENCES dossiers(numero) ON DELETE CASCADE,
    module          TEXT NOT NULL,
    schema_version  TEXT NOT NULL,
    module_version  TEXT NOT NULL,
    operateur       TEXT,
    exported_at     TEXT,
    fichier         TEXT NOT NULL,                            -- nom du JSON reçu
    archive         TEXT NOT NULL,                            -- chemin relatif dans archive/
    sha256          TEXT NOT NULL UNIQUE,                     -- empreinte du JSON reçu
    octets          INTEGER NOT NULL,
    ingere_at       TEXT NOT NULL DEFAULT (datetime('now')),
    courant         INTEGER NOT NULL DEFAULT 1 CHECK (courant IN (0,1))
);
CREATE INDEX idx_saisies_dossier ON saisies(dossier, module, courant);
CREATE INDEX idx_saisies_module  ON saisies(module, module_version);

-- Journal d'ingestion : ce qui est passé, ce qui a été refusé et pourquoi.
CREATE TABLE journal (
    id        INTEGER PRIMARY KEY AUTOINCREMENT,
    at        TEXT NOT NULL DEFAULT (datetime('now')),
    niveau    TEXT NOT NULL CHECK (niveau IN ('info','doublon','rejet','erreur')),
    fichier   TEXT,
    dossier   TEXT,
    module    TEXT,
    message   TEXT NOT NULL
);
CREATE INDEX idx_journal_at ON journal(at);

-- ════════════════════════════════════════════════════════════════════════════
-- 3. CLICHÉS — commun à tous les modules
-- ════════════════════════════════════════════════════════════════════════════

-- Le base64 n'entre jamais en base. Le JPEG est reconstitué sur disque sous
-- photos/<dossier>/<module>/<key>.jpg et seul le chemin relatif est stocké :
-- l'arborescence peut être déplacée d'un poste à l'autre sans rien réécrire.
CREATE TABLE photos (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    saisie_id   INTEGER NOT NULL REFERENCES saisies(id) ON DELETE CASCADE,
    dossier     TEXT NOT NULL REFERENCES dossiers(numero) ON DELETE CASCADE,
    module      TEXT NOT NULL,
    cle         TEXT NOT NULL,                                -- key du slot de trame
    label       TEXT,
    etape       TEXT,                                         -- etape (autopsie/neuropath) ou etage (clinique)
    item        TEXT,                                         -- examen clinique seulement
    libre       INTEGER NOT NULL DEFAULT 0 CHECK (libre IN (0,1)),
    nom         TEXT,
    mime        TEXT,
    octets      INTEGER,
    largeur     INTEGER,
    hauteur     INTEGER,
    largeur_src INTEGER,
    hauteur_src INTEGER,
    added_at    TEXT,
    chemin      TEXT NOT NULL,                                -- relatif à la racine du hub
    sha256      TEXT,
    UNIQUE (saisie_id, cle)
);
CREATE INDEX idx_photos_dossier ON photos(dossier, module);

-- ════════════════════════════════════════════════════════════════════════════
-- 4. MODULE administratif — schema 0.3.0
-- ════════════════════════════════════════════════════════════════════════════

-- Les dates du module sont des objets à précision variable
-- ({annee, mois, jour, precision}) : une date connue au mois près ne doit pas
-- devenir un 1er du mois silencieux. On garde donc le texte ISO tronqué
-- (2026, 2026-03, 2026-03-14) ET la précision à côté.
CREATE TABLE admin_dossier (
    saisie_id           INTEGER PRIMARY KEY REFERENCES saisies(id) ON DELETE CASCADE,
    dossier             TEXT NOT NULL REFERENCES dossiers(numero) ON DELETE CASCADE,
    -- identité
    nom_mere            TEXT,
    nom_naiss           TEXT,
    prenom_mere         TEXT,
    ddn_mere            TEXT,
    ddn_mere_precision  TEXT,
    prenom_foetus       TEXT,
    ipp                 TEXT,
    ipp_fetus           TEXT,
    ins                 TEXT,
    id_ext              TEXT,
    opposition          INTEGER,
    -- circuit
    date_deces              TEXT,
    date_deces_precision    TEXT,
    date_reception          TEXT,
    date_reception_precision TEXT,
    date_examen             TEXT,
    date_examen_precision   TEXT,
    medecin             TEXT,
    medecin_rpps        TEXT,
    service             TEXT,
    ville_maternite     TEXT,
    -- issue de la grossesse actuelle
    type_issue          TEXT,
    terme_sa            INTEGER,
    terme_j             INTEGER,
    sexe                TEXT,
    voie                TEXT,
    multiple            INTEGER,
    indication          TEXT,
    bamara_birth        INTEGER,
    bamara_termination_type TEXT,
    bamara_stp_type     TEXT,
    -- antécédents maternels
    profession_mere     TEXT,
    groupe_sanguin      TEXT,
    rhesus              TEXT,
    consanguinite       TEXT,                                 -- true / false / UNK : trois états
    fdr_hta             INTEGER,
    fdr_diabete         INTEGER,
    fdr_tabac           INTEGER,
    fdr_alcool          INTEGER,
    atcd_medicaux       TEXT,
    traitements         TEXT,
    -- grossesses précédentes (entête ; le détail est en table fille)
    gestite             INTEGER,
    parite              INTEGER,
    -- grossesse en cours
    mode_conception     TEXT,
    amp_type            TEXT,
    ddg                 TEXT,
    ddg_precision       TEXT,
    lieu_suivi          TEXT,
    risque_t21          TEXT,
    bhcg                REAL,
    pappa               REAL,
    lcc                 REAL,
    cn                  REAL,
    histoire_clinique   TEXT,
    contexte_clinique   TEXT,
    -- examens prénataux
    echo_t1             TEXT,
    echo_t1_details     TEXT,
    echo_t2             TEXT,
    echo_t2_details     TEXT,
    echo_t3             TEXT,
    echo_t3_details     TEXT,
    autres_examens      TEXT
);

CREATE TABLE admin_grossesses (
    id                  INTEGER PRIMARY KEY AUTOINCREMENT,
    saisie_id           INTEGER NOT NULL REFERENCES saisies(id) ON DELETE CASCADE,
    dossier             TEXT NOT NULL,
    rang                INTEGER NOT NULL,
    date_debut          TEXT,
    date_debut_precision TEXT,
    date_fin            TEXT,
    date_fin_precision  TEXT,
    amp                 TEXT,
    voie                TEXT,
    nb_fetus            INTEGER,
    multiple            INTEGER
);

CREATE TABLE admin_grossesse_foetus (
    id                  INTEGER PRIMARY KEY AUTOINCREMENT,
    grossesse_id        INTEGER NOT NULL REFERENCES admin_grossesses(id) ON DELETE CASCADE,
    rang                INTEGER NOT NULL,                     -- multiple_preg_order
    prenom              TEXT,
    sexe                TEXT,
    issue               TEXT,
    terme               INTEGER,
    date_deces          TEXT,
    date_deces_precision TEXT,
    foetopath           TEXT,
    percentile          REAL,
    remarques           TEXT,
    bamara_birth        INTEGER,
    bamara_termination_type TEXT,
    bamara_stp_type     TEXT
);

CREATE TABLE admin_chronologie (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    saisie_id   INTEGER NOT NULL REFERENCES saisies(id) ON DELETE CASCADE,
    dossier     TEXT NOT NULL,
    rang        INTEGER NOT NULL,
    date        TEXT,
    date_precision TEXT,
    type        TEXT,
    texte       TEXT,
    sa_total_j  INTEGER,
    sa          INTEGER,
    sa_j        INTEGER
);

-- Les alertes de cohérence calculées par le module à l'export. On les garde :
-- elles disent l'état de la saisie au moment où elle a été faite.
CREATE TABLE admin_coherence (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    saisie_id   INTEGER NOT NULL REFERENCES saisies(id) ON DELETE CASCADE,
    dossier     TEXT NOT NULL,
    message     TEXT NOT NULL
);

-- ════════════════════════════════════════════════════════════════════════════
-- 5. MODULE examen_clinique — schema 0.1.0
-- ════════════════════════════════════════════════════════════════════════════

CREATE TABLE examen_clinique (
    saisie_id       INTEGER PRIMARY KEY REFERENCES saisies(id) ON DELETE CASCADE,
    dossier         TEXT NOT NULL REFERENCES dossiers(numero) ON DELETE CASCADE,
    trame_attendue  INTEGER,
    items_renseignes INTEGER,
    items_anormaux   INTEGER
);

CREATE TABLE examen_clinique_items (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    saisie_id   INTEGER NOT NULL REFERENCES saisies(id) ON DELETE CASCADE,
    dossier     TEXT NOT NULL,
    etage_id    TEXT NOT NULL,
    etage_titre TEXT,
    rang        INTEGER NOT NULL,
    item_id     TEXT NOT NULL,
    item_label  TEXT,
    etat        TEXT CHECK (etat IN ('normal','anormal') OR etat IS NULL),
    precisions  TEXT,
    UNIQUE (saisie_id, item_id)
);
CREATE INDEX idx_ec_items ON examen_clinique_items(dossier, item_id, etat);

CREATE TABLE examen_clinique_anomalies (
    id      INTEGER PRIMARY KEY AUTOINCREMENT,
    item_id INTEGER NOT NULL REFERENCES examen_clinique_items(id) ON DELETE CASCADE,
    valeur  TEXT NOT NULL
);

CREATE TABLE examen_clinique_cliches_libres (
    id        INTEGER PRIMARY KEY AUTOINCREMENT,
    saisie_id INTEGER NOT NULL REFERENCES saisies(id) ON DELETE CASCADE,
    dossier   TEXT NOT NULL,
    cle       TEXT NOT NULL,
    label     TEXT,
    etage     TEXT,
    item      TEXT
);

-- ════════════════════════════════════════════════════════════════════════════
-- 6. MODULE biometrie_clinique — schema 0.1.0
-- ════════════════════════════════════════════════════════════════════════════

CREATE TABLE biometrie_clinique (
    saisie_id   INTEGER PRIMARY KEY REFERENCES saisies(id) ON DELETE CASCADE,
    dossier     TEXT NOT NULL REFERENCES dossiers(numero) ON DELETE CASCADE,
    terme_sa    INTEGER,
    terme_jours INTEGER,
    sexe        TEXT
);

-- mesures est un dictionnaire clé → valeur dans le JSON, et la liste des clés
-- bouge d'une version à l'autre : une ligne par mesure, pas une colonne.
CREATE TABLE biometrie_clinique_mesures (
    id        INTEGER PRIMARY KEY AUTOINCREMENT,
    saisie_id INTEGER NOT NULL REFERENCES saisies(id) ON DELETE CASCADE,
    dossier   TEXT NOT NULL,
    cle       TEXT NOT NULL,
    valeur    REAL,
    UNIQUE (saisie_id, cle)
);
CREATE INDEX idx_bio_mesures ON biometrie_clinique_mesures(dossier, cle);

-- ════════════════════════════════════════════════════════════════════════════
-- 7. MODULE radio — schema 0.1.0
-- ════════════════════════════════════════════════════════════════════════════

CREATE TABLE radio (
    saisie_id           INTEGER PRIMARY KEY REFERENCES saisies(id) ON DELETE CASCADE,
    dossier             TEXT NOT NULL REFERENCES dossiers(numero) ON DELETE CASCADE,
    terme_sa            INTEGER,
    terme_jours         INTEGER,
    aspect_general      TEXT,
    cotes_droite        INTEGER,
    cotes_gauche        INTEGER,
    thorax_forme        TEXT,
    vertebres_remarques TEXT,
    os_remarques        TEXT,
    bip_osseux_mm       REAL,
    pc_radio_mm         REAL,
    hadlock_sa          REAL,
    adalian_sa          REAL,
    remarques           TEXT
);

CREATE TABLE radio_chips (
    id        INTEGER PRIMARY KEY AUTOINCREMENT,
    saisie_id INTEGER NOT NULL REFERENCES saisies(id) ON DELETE CASCADE,
    dossier   TEXT NOT NULL,
    groupe    TEXT NOT NULL,                                  -- vertebres | os
    valeur    TEXT NOT NULL
);

CREATE TABLE radio_os_longs (
    id            INTEGER PRIMARY KEY AUTOINCREMENT,
    saisie_id     INTEGER NOT NULL REFERENCES saisies(id) ON DELETE CASCADE,
    dossier       TEXT NOT NULL,
    os            TEXT NOT NULL,
    droite        REAL,
    gauche        REAL,
    moyenne       REAL,
    zscore_chitty REAL,
    UNIQUE (saisie_id, os)
);
CREATE INDEX idx_radio_os ON radio_os_longs(dossier, os);

CREATE TABLE radio_maturation (
    id        INTEGER PRIMARY KEY AUTOINCREMENT,
    saisie_id INTEGER NOT NULL REFERENCES saisies(id) ON DELETE CASCADE,
    dossier   TEXT NOT NULL,
    sa        INTEGER,
    label     TEXT,
    statut    TEXT
);

CREATE TABLE radio_hpo (
    id        INTEGER PRIMARY KEY AUTOINCREMENT,
    saisie_id INTEGER NOT NULL REFERENCES saisies(id) ON DELETE CASCADE,
    dossier   TEXT NOT NULL,
    code      TEXT NOT NULL,
    term_fr   TEXT,
    source    TEXT
);
CREATE INDEX idx_radio_hpo ON radio_hpo(dossier, code);

-- ════════════════════════════════════════════════════════════════════════════
-- 8. MODULE autopsie — schema 0.1.0
-- ════════════════════════════════════════════════════════════════════════════

CREATE TABLE autopsie (
    saisie_id         INTEGER PRIMARY KEY REFERENCES saisies(id) ON DELETE CASCADE,
    dossier           TEXT NOT NULL REFERENCES dossiers(numero) ON DELETE CASCADE,
    ouverture_at      TEXT,                                   -- horodatage du cliché d'ouverture
    terme_sa          INTEGER,
    terme_jours       INTEGER,
    maceration_maroun INTEGER,
    trame_attendue    INTEGER,
    champs_renseignes INTEGER
);

-- La trame d'autopsie compte une trentaine de champs de six types différents
-- et s'allonge à chaque diffusion. Une ligne par champ, typée par 'type' :
-- ajouter un champ au formulaire n'impose alors aucune migration.
CREATE TABLE autopsie_champs (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    saisie_id   INTEGER NOT NULL REFERENCES saisies(id) ON DELETE CASCADE,
    dossier     TEXT NOT NULL,
    etape_id    TEXT NOT NULL,
    etape_titre TEXT,
    rang        INTEGER NOT NULL,
    champ_id    TEXT NOT NULL,
    champ_label TEXT,
    type        TEXT NOT NULL,                                -- chips|num|bool|txt|masse|masse2
    valeur_txt  TEXT,
    valeur_num  REAL,
    valeur_bool INTEGER,
    unite       TEXT,
    droite      REAL,                                         -- masse2
    gauche      REAL,
    total       REAL,
    z_gc        REAL,                                         -- Guihard-Costa
    z_ma        REAL,                                         -- Maroun A
    z_mb        REAL,                                         -- Maroun B
    UNIQUE (saisie_id, champ_id)
);
CREATE INDEX idx_autopsie_champs ON autopsie_champs(dossier, champ_id);

CREATE TABLE autopsie_chips (
    id       INTEGER PRIMARY KEY AUTOINCREMENT,
    champ_id INTEGER NOT NULL REFERENCES autopsie_champs(id) ON DELETE CASCADE,
    valeur   TEXT NOT NULL
);

CREATE TABLE autopsie_cliches_libres (
    id        INTEGER PRIMARY KEY AUTOINCREMENT,
    saisie_id INTEGER NOT NULL REFERENCES saisies(id) ON DELETE CASCADE,
    dossier   TEXT NOT NULL,
    cle       TEXT NOT NULL,
    label     TEXT,
    etape     TEXT
);

-- ════════════════════════════════════════════════════════════════════════════
-- 9. MODULE neuropath — schema 0.1.0
-- ════════════════════════════════════════════════════════════════════════════

CREATE TABLE neuropath (
    saisie_id         INTEGER PRIMARY KEY REFERENCES saisies(id) ON DELETE CASCADE,
    dossier           TEXT NOT NULL REFERENCES dossiers(numero) ON DELETE CASCADE,
    terme_sa          INTEGER,
    terme_jours       INTEGER,
    trame_attendue    INTEGER,
    champs_renseignes INTEGER
);

-- Même forme que autopsie_champs, mais le z de neuropath porte sa référence
-- et sa source : un z sans son référentiel n'est pas relisible dix ans après.
CREATE TABLE neuropath_champs (
    id           INTEGER PRIMARY KEY AUTOINCREMENT,
    saisie_id    INTEGER NOT NULL REFERENCES saisies(id) ON DELETE CASCADE,
    dossier      TEXT NOT NULL,
    etape_id     TEXT NOT NULL,
    etape_titre  TEXT,
    rang         INTEGER NOT NULL,
    champ_id     TEXT NOT NULL,
    champ_label  TEXT,
    type         TEXT NOT NULL,                               -- chips|num|bool|txt|mes|calc
    valeur_txt   TEXT,
    valeur_num   REAL,
    valeur_bool  INTEGER,
    unite        TEXT,
    z            REAL,
    z_reference  TEXT,
    z_source     TEXT,
    attendu_m    REAL,
    attendu_sd   REAL,
    UNIQUE (saisie_id, champ_id)
);
CREATE INDEX idx_neuropath_champs ON neuropath_champs(dossier, champ_id);

CREATE TABLE neuropath_chips (
    id       INTEGER PRIMARY KEY AUTOINCREMENT,
    champ_id INTEGER NOT NULL REFERENCES neuropath_champs(id) ON DELETE CASCADE,
    valeur   TEXT NOT NULL
);

CREATE TABLE neuropath_cliches_libres (
    id        INTEGER PRIMARY KEY AUTOINCREMENT,
    saisie_id INTEGER NOT NULL REFERENCES saisies(id) ON DELETE CASCADE,
    dossier   TEXT NOT NULL,
    cle       TEXT NOT NULL,
    label     TEXT,
    etape     TEXT
);

-- ════════════════════════════════════════════════════════════════════════════
-- 10. VUES
-- ════════════════════════════════════════════════════════════════════════════

CREATE VIEW vue_saisies_courantes AS
SELECT * FROM saisies WHERE courant = 1;

-- Une ligne par dossier : ce qui est arrivé, ce qui manque.
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
    (SELECT COUNT(*)  FROM saisies s WHERE s.dossier = d.numero AND s.courant = 1) AS modules,
    (SELECT group_concat(s.module, ', ')
       FROM (SELECT module FROM saisies WHERE dossier = d.numero AND courant = 1
             ORDER BY module) s)                                                  AS modules_recus,
    (SELECT COUNT(*)  FROM photos p
       JOIN saisies s ON s.id = p.saisie_id AND s.courant = 1
      WHERE p.dossier = d.numero)                                                 AS cliches,
    (SELECT MAX(ingere_at) FROM saisies s WHERE s.dossier = d.numero)             AS derniere_ingestion
FROM dossiers d;

-- Les items anormaux du dernier examen clinique de chaque dossier.
CREATE VIEW vue_anomalies_cliniques AS
SELECT
    i.dossier, i.etage_titre, i.item_label, i.precisions,
    (SELECT group_concat(a.valeur, ' · ')
       FROM examen_clinique_anomalies a WHERE a.item_id = i.id) AS anomalies
FROM examen_clinique_items i
JOIN saisies s ON s.id = i.saisie_id AND s.courant = 1
WHERE i.etat = 'anormal';

-- Toutes les mesures pesées, tous modules confondus, avec leur z le plus fort.
CREATE VIEW vue_masses AS
SELECT c.dossier, champ_id AS mesure, champ_label AS libelle,
       COALESCE(total, valeur_num) AS valeur, 'g' AS unite,
       z_gc, z_ma, z_mb
FROM autopsie_champs c
JOIN saisies s ON s.id = c.saisie_id AND s.courant = 1
WHERE c.type IN ('masse','masse2');
