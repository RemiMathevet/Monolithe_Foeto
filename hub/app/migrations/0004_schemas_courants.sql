-- SPDX-License-Identifier: CC-BY-NC-SA-4.0 | Hub Light | Monolithe_Foeto
-- ════════════════════════════════════════════════════════════════════════════
-- 0004 — les schémas courants des modules du dépôt.
--
-- Depuis 0.2.0, l'examen clinique et l'autopsie codent leurs puces en HPO :
-- une anomalie n'est plus une chaîne mais {label, hpo_id}. On garde le
-- libellé dans `valeur` et l'identifiant à côté. Les grilles passent en
-- 0.2.0 (section « Termes FOETO ») sans changer de forme pour l'index.
--
-- Deux modules n'ont pas de table dédiée : micro.html (lecture multi-organes,
-- une section par lame) et macro_placenta. Ils entrent à plat dans
-- `valeurs_plates`, feuille par feuille sous son chemin — le même parti que
-- les grilles, pour chercher et non pour restituer.
-- ════════════════════════════════════════════════════════════════════════════

ALTER TABLE examen_clinique_anomalies ADD COLUMN hpo_id TEXT;
ALTER TABLE autopsie_chips            ADD COLUMN hpo_id TEXT;
ALTER TABLE neuropath_chips           ADD COLUMN hpo_id TEXT;

CREATE TABLE IF NOT EXISTS valeurs_plates (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    saisie_id   INTEGER NOT NULL REFERENCES saisies(id) ON DELETE CASCADE,
    dossier     TEXT NOT NULL,
    module      TEXT NOT NULL,
    chemin      TEXT NOT NULL,
    valeur_txt  TEXT,
    valeur_num  REAL,
    valeur_bool INTEGER
);
CREATE INDEX IF NOT EXISTS i_plates_saisie  ON valeurs_plates(saisie_id);
CREATE INDEX IF NOT EXISTS i_plates_chemin  ON valeurs_plates(chemin);
CREATE INDEX IF NOT EXISTS i_plates_dossier ON valeurs_plates(dossier, module);
