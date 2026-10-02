-- SPDX-License-Identifier: AGPL-3.0-or-later
-- 0007 — date de naissance des nés vivants (administratif 2.2.0) : avec la
-- date du décès, elle donne l'âge au décès des statistiques périnatales
-- (J0–J4, J5–J28). Nom repris de Luminarium (hub_foeto_details.date_naissance).
ALTER TABLE admin_dossier ADD COLUMN date_naissance TEXT;
ALTER TABLE admin_dossier ADD COLUMN date_naissance_precision TEXT;
