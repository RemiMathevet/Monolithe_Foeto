-- SPDX-License-Identifier: CC-BY-NC-SA-4.0 | Hub Light | Monolithe_Foeto
-- ════════════════════════════════════════════════════════════════════════════
-- 0003 — la microscopie entre en base.
--
-- Dix-sept grilles de lecture, une par organe. Elles partagent exactement la
-- même enveloppe — schema_version, module, organe, source, dossier, operateur,
-- exported_at, terme_sa, grille, compte_rendu — et rien d'autre : le contenu
-- de `grille` est propre à chaque organe, avec ses sections, son vocabulaire
-- et ses règles. Aucune table ne peut donc les décrire toutes en colonnes.
--
-- D'où deux tables seulement :
--
--   `microscopie`          une ligne par organe lu, avec ce que toutes les
--                          grilles ont en commun, et le texte que la grille a
--                          elle-même composé ;
--   `microscopie_valeurs`  un index à plat des valeurs posées, chaque feuille
--                          de `grille` rangée sous son chemin en clair
--                          (« prelev.lobes », « lesions.hypoplasie.2 »).
--
-- L'index est là pour chercher — « quels dossiers ont une hypoplasie
-- pulmonaire » — pas pour restituer : c'est `saisies.donnees_json` qui fait
-- foi, comme pour tous les autres modules, et cet index s'en refabrique par
-- `ingest.py --reindex`.
--
-- Côté fiche, les dix-sept grilles comptent pour un seul module attendu,
-- « microscopie », placé entre l'autopsie et la neuropathologie. Un dossier
-- sans microscopie n'est pas un dossier incomplet : c'est le cas courant.
-- ════════════════════════════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS microscopie (
    saisie_id       INTEGER PRIMARY KEY REFERENCES saisies(id) ON DELETE CASCADE,
    dossier         TEXT NOT NULL REFERENCES dossiers(numero) ON DELETE CASCADE,
    organe          TEXT NOT NULL,
    source          TEXT,
    terme_sa        INTEGER,
    compte_rendu    TEXT,
    valeurs_posees  INTEGER NOT NULL DEFAULT 0
);
CREATE INDEX IF NOT EXISTS i_micro_dossier ON microscopie(dossier, organe);

CREATE TABLE IF NOT EXISTS microscopie_valeurs (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    saisie_id   INTEGER NOT NULL REFERENCES saisies(id) ON DELETE CASCADE,
    dossier     TEXT NOT NULL,
    organe      TEXT NOT NULL,
    chemin      TEXT NOT NULL,
    valeur_txt  TEXT,
    valeur_num  REAL,
    valeur_bool INTEGER
);
CREATE INDEX IF NOT EXISTS i_micro_val_saisie ON microscopie_valeurs(saisie_id);
CREATE INDEX IF NOT EXISTS i_micro_val_chemin ON microscopie_valeurs(chemin);
CREATE INDEX IF NOT EXISTS i_micro_val_dossier ON microscopie_valeurs(dossier, organe);

-- Ce qui a été lu au microscope, dossier par dossier et organe par organe.
DROP VIEW IF EXISTS vue_microscopie;
CREATE VIEW vue_microscopie AS
SELECT
    m.dossier,
    m.organe,
    s.module,
    s.module_version,
    s.operateur,
    s.provenance,
    s.exported_at,
    s.ingere_at,
    m.terme_sa,
    m.valeurs_posees,
    m.compte_rendu
FROM microscopie m
JOIN saisies s ON s.id = m.saisie_id AND s.courant = 1
ORDER BY m.dossier, m.organe;
