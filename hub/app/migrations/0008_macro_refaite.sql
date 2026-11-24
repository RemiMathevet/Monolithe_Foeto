-- SPDX-License-Identifier: AGPL-3.0-or-later
-- 0008 — macroscopie refaite sur pièce fixée : se signale à la lecture du cas,
-- comme les remarques (décision de lecture, pas une constatation de module).
-- NULL = non signalé, 'fixee' = refaite après fixation.
ALTER TABLE dossiers ADD COLUMN macro_refaite TEXT;

DROP VIEW vue_dossiers;
CREATE VIEW vue_dossiers AS
SELECT
    d.numero,
    d.statut,
    d.terme_sa,
    d.terme_j,
    d.sexe,
    d.type_issue,
    d.date_reception,
    d.date_examen,
    d.indication,
    d.remarques,
    d.macro_refaite,
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
