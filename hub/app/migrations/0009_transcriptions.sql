-- SPDX-License-Identifier: AGPL-3.0-or-later
-- 0009 — transcriptions des dictées (macro placenta 0.2.1 et suivants), faites par le
-- module facultatif hub/transcription/ quand il est posé à côté d'app/. Donnée dérivée :
-- le son reste dans l'archive. Clé = id du clip dans l'export (dossier|champ|date), stable :
-- `--rejouer` ne vide pas cette table, une transcription faite n'est jamais refaite.
-- titre = titre de l'onglet (section) du module où le clip a été enregistré.
CREATE TABLE IF NOT EXISTS transcriptions (
    clip_id       TEXT PRIMARY KEY,
    dossier       TEXT NOT NULL,
    module        TEXT NOT NULL,
    champ         TEXT,
    section       TEXT,
    titre         TEXT,
    rang          INTEGER,          -- rang de la section dans le module : l'ordre de l'onglet
    enregistre_le TEXT,
    texte         TEXT NOT NULL,
    modele        TEXT,
    transcrit_le  TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS transcriptions_dossier ON transcriptions(dossier);
