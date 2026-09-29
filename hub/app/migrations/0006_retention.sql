-- SPDX-License-Identifier: CC-BY-NC-SA-4.0 | Hub Light | Monolithe_Foeto
-- ════════════════════════════════════════════════════════════════════════════
-- 0006 — la rétention, sortie de « Aspect général » (examen clinique 0.3.0).
--
-- Deux listes à l'examen clinique. Le grade de Maroun 0-3 FAIT FOI pour la
-- macération (BaMaRa, strate des tables de masses de Maroun) ; celui de
-- l'autopsie n'est qu'informatif pour ses DS. Genest : palier de la table des
-- signes externes, borne basse de l'intervalle mort–naissance, en heures.
-- ════════════════════════════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS examen_clinique_retention (
    saisie_id  INTEGER PRIMARY KEY REFERENCES saisies(id) ON DELETE CASCADE,
    dossier    TEXT NOT NULL,
    maroun     INTEGER,        -- 0-3
    genest     TEXT,           -- aucun | 6h | 12h | 18h | 24h | 2sem
    genest_h   INTEGER         -- borne basse en heures (2 semaines = 336)
);
CREATE INDEX IF NOT EXISTS i_retention_dossier ON examen_clinique_retention(dossier);
