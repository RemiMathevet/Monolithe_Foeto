-- SPDX-License-Identifier: CC-BY-NC-SA-4.0 | Hub Light | Monolithe_Foeto
-- ════════════════════════════════════════════════════════════════════════════
-- 0006 — la rétention, sortie de « Aspect général » (examen clinique 0.3.0).
--
-- Une ligne par saisie : la lecture de Genest III (borne basse de l'intervalle
-- mort–naissance, règle des deux signes) et le grade de Maroun 0-3 qui choisit
-- la strate des tables de masses. Le grade retenu fait foi pour les z-scores
-- Maroun ; celui de l'autopsie n'est plus qu'un repli. Les constats bruts (et
-- les zones desquamées, préfixe « zone: ») restent à côté pour les fiches micro.
-- ════════════════════════════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS examen_clinique_retention (
    saisie_id       INTEGER PRIMARY KEY REFERENCES saisies(id) ON DELETE CASCADE,
    dossier         TEXT NOT NULL,
    maroun          INTEGER,          -- grade retenu 0-3
    maroun_propose  INTEGER,          -- grade déduit des constats
    maroun_force    INTEGER,          -- 1 si l'opérateur a choisi un autre grade
    genest_borne    TEXT,             -- « ≥ 18 h », NULL si < 2 signes
    genest_borne_h  INTEGER,
    genest_isole    INTEGER,          -- 1 : un seul signe, ne date rien
    genest_signes   TEXT              -- ids des critères de Genest III, séparés par des virgules
);
CREATE INDEX IF NOT EXISTS i_retention_dossier ON examen_clinique_retention(dossier);

CREATE TABLE IF NOT EXISTS examen_clinique_retention_constats (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    saisie_id   INTEGER NOT NULL REFERENCES saisies(id) ON DELETE CASCADE,
    dossier     TEXT NOT NULL,
    constat     TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS i_retention_constats ON examen_clinique_retention_constats(saisie_id);
