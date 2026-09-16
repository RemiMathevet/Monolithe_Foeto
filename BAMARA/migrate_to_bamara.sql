-- ============================================================================
-- migrate_to_bamara.sql
-- Exécuté sur la nouvelle DB (minihub_new.db) avec l'ancienne attachée en 'old'
-- Usage : sqlite3 minihub_new.db < migrate_to_bamara.sql
-- ============================================================================

ATTACH DATABASE 'minihub_backup_20260610.db' AS old;

-- ═══════════════════════════════════════════════════════════════
-- 1. cases → bam_identity
-- ═══════════════════════════════════════════════════════════════

INSERT INTO bam_identity (
    id,
    gender,
    is_fetus,
    mother_name,
    mother_given_name,
    has_given_consent,
    residence_country_code,
    created_at,
    updated_at
)
SELECT
    c.id,
    CASE
        WHEN UPPER(c.sexe) IN ('M', 'MASCULIN', 'GARCON') THEN 'M'
        WHEN UPPER(c.sexe) IN ('F', 'FEMININ', 'FÉMININ', 'FILLE') THEN 'F'
        ELSE 'UNK'
    END,
    1,
    UPPER(TRIM(c.nom_mere)),
    TRIM(c.prenom_mere),
    1,
    'FR',
    c.created_at,
    c.updated_at
FROM old.cases c;

-- ═══════════════════════════════════════════════════════════════
-- 2. cases → hub_case
-- ═══════════════════════════════════════════════════════════════

INSERT INTO hub_case (
    identity_id,
    hub_case_number,
    case_type,
    status,
    type_prelevement,
    indication_examen,
    contexte_clinique,
    service_demandeur,
    ddn_mere,
    created_at,
    updated_at
)
SELECT
    c.id,
    c.numero_dossier,
    CASE
        WHEN UPPER(COALESCE(c.indication_examen, '')) LIKE '%IMG%' THEN 'IMG'
        WHEN UPPER(COALESCE(c.indication_examen, '')) LIKE '%MFIU%' THEN 'MFIU'
        WHEN UPPER(COALESCE(c.indication_examen, '')) LIKE '%MORT%' THEN 'MFIU'
        ELSE 'AUTRE'
    END,
    CASE c.statut
        WHEN 'en_cours' THEN 'DRAFT'
        WHEN 'termine' THEN 'READY'
        WHEN 'archive' THEN 'CONFIRMED'
        ELSE 'DRAFT'
    END,
    c.type_prelevement,
    c.indication_examen,
    c.contexte_clinique,
    c.service_demandeur,
    c.ddn_mere,
    c.created_at,
    c.updated_at
FROM old.cases c;

-- ═══════════════════════════════════════════════════════════════
-- 3. cases → bam_medicare (pour ceux qui ont une date_reception)
-- ═══════════════════════════════════════════════════════════════

INSERT INTO bam_medicare (
    identity_id,
    inclusion_date_year,
    inclusion_date_month,
    inclusion_date_day,
    care_provider_name,
    site_code,
    site_label,
    site_id,
    is_label,
    source_id
)
SELECT
    c.id,
    CAST(strftime('%Y', c.date_reception) AS INTEGER),
    CAST(strftime('%m', c.date_reception) AS INTEGER),
    CAST(strftime('%d', c.date_reception) AS INTEGER),
    c.medecin_referent,
    'S0034',
    'ADEST [CST] PIARD',
    33,
    1,
    'AUTONOMOUS'
FROM old.cases c
WHERE c.date_reception IS NOT NULL AND c.date_reception != '';

-- ═══════════════════════════════════════════════════════════════
-- 4. cases → bam_encounter (pour ceux qui ont une date_examen ET une medicare)
-- ═══════════════════════════════════════════════════════════════

INSERT INTO bam_encounter (
    medicare_id,
    encounter_date_year,
    encounter_date_month,
    encounter_date_day,
    context,
    context_precision,
    objectives,
    location_at_hospital,
    source_id
)
SELECT
    m.id,
    CAST(strftime('%Y', c.date_examen) AS INTEGER),
    CAST(strftime('%m', c.date_examen) AS INTEGER),
    CAST(strftime('%d', c.date_examen) AS INTEGER),
    'A',
    'Examen foeto-placentaire',
    'DIA',
    1,
    'AUTONOMOUS'
FROM old.cases c
JOIN bam_medicare m ON m.identity_id = c.id
WHERE c.date_examen IS NOT NULL AND c.date_examen != '';

-- ═══════════════════════════════════════════════════════════════
-- 5. cases → bam_condition (un diagnostic ONG par cas)
-- ═══════════════════════════════════════════════════════════════

INSERT INTO bam_condition (
    identity_id,
    diagnostic_status,
    early_diagnosis_status,
    site_diag_code,
    site_diag_label,
    site_diag_id,
    source_id
)
SELECT
    c.id,
    'ONG',
    'PRN',
    'S0034',
    'ADEST [CST] PIARD',
    33,
    'AUTONOMOUS'
FROM old.cases c;

-- ═══════════════════════════════════════════════════════════════
-- 6. hpo_terms → bam_clinical_description
-- ═══════════════════════════════════════════════════════════════

INSERT INTO bam_clinical_description (
    condition_id,
    code,
    label,
    ref
)
SELECT
    cond.id,
    h.hpo_code,
    COALESCE(h.hpo_label, h.hpo_code),
    'HPO'
FROM old.hpo_terms h
JOIN bam_condition cond ON cond.identity_id = h.case_id;

-- ═══════════════════════════════════════════════════════════════
-- 7. cases → bam_pregnancy_end (fin de grossesse)
-- ═══════════════════════════════════════════════════════════════

INSERT INTO bam_pregnancy_end (
    identity_id,
    birth,
    termination_type,
    term_week,
    is_foetopathology_done
)
SELECT
    c.id,
    0,
    CASE
        WHEN UPPER(COALESCE(c.indication_examen, '')) LIKE '%IMG%' THEN 'IMG'
        WHEN UPPER(COALESCE(c.indication_examen, '')) LIKE '%MFIU%' THEN 'ISG'
        WHEN UPPER(COALESCE(c.indication_examen, '')) LIKE '%MORT%' THEN 'ISG'
        ELSE NULL
    END,
    c.terme_sa,
    1
FROM old.cases c;

-- ═══════════════════════════════════════════════════════════════
-- 8. biometries (macro) → bam_antenatal
-- ═══════════════════════════════════════════════════════════════

INSERT INTO bam_antenatal (
    identity_id,
    term,
    weight,
    height,
    head_circumference
)
SELECT
    b.case_id,
    c.terme_sa,
    CAST(json_extract(b.data_json, '$.masse') AS INTEGER),
    ROUND(CAST(json_extract(b.data_json, '$.VT') AS REAL) / 10.0, 1),
    ROUND(CAST(json_extract(b.data_json, '$.PC') AS REAL) / 10.0, 1)
FROM old.biometries b
JOIN old.cases c ON c.id = b.case_id
WHERE b.type = 'macro';

-- ═══════════════════════════════════════════════════════════════
-- 9. biometries → biometries (conservation données locales)
-- ═══════════════════════════════════════════════════════════════

INSERT INTO biometries (identity_id, type, data_json, computed_json, updated_at)
SELECT case_id, type, data_json, computed_json, updated_at
FROM old.biometries;

-- ═══════════════════════════════════════════════════════════════
-- 10. descriptions → descriptions
-- ═══════════════════════════════════════════════════════════════

INSERT INTO descriptions (identity_id, systeme, data_json, updated_at)
SELECT case_id, systeme, data_json, updated_at
FROM old.descriptions;

-- ═══════════════════════════════════════════════════════════════
-- 11. bamara_status → hub_bamara_export
-- ═══════════════════════════════════════════════════════════════

INSERT INTO hub_bamara_export (
    identity_id,
    export_status,
    last_success_at
)
SELECT
    bs.case_id,
    CASE bs.statut
        WHEN 'non_declare' THEN 'PENDING'
        WHEN 'declare' THEN 'SUCCESS'
        WHEN 'erreur' THEN 'ERROR'
        ELSE 'PENDING'
    END,
    bs.declared_at
FROM old.bamara_status bs;

-- ═══════════════════════════════════════════════════════════════
-- 12. templates → templates
-- ═══════════════════════════════════════════════════════════════

INSERT INTO templates (name, type, content_jinja2, is_default, created_at, updated_at)
SELECT name, type, content_jinja2, is_default, created_at, updated_at
FROM old.templates;

-- ═══════════════════════════════════════════════════════════════
-- 13. settings → settings
-- ═══════════════════════════════════════════════════════════════

INSERT INTO settings (key, value)
SELECT key, value FROM old.settings;

-- ═══════════════════════════════════════════════════════════════
-- Vérification
-- ═══════════════════════════════════════════════════════════════

DETACH DATABASE old;
