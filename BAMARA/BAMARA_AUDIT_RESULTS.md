# Audit BaMaRa — MiniHub (Hub Light) vs SDM-MR v2.17

Audit réalisé le 2026-06-10.

---

## 1. Résumé chiffré

```
Tables existantes Hub          : 8
Colonnes existantes Hub        : 54
Tables nouveau schéma bam_*    : 14
Tables nouveau schéma hub_*    : 3
Tables conservées (locales)    : 5  (biometries, descriptions, templates, generated_docs, settings)
─────────────────────────────────────
Total tables nouveau schéma    : 22
Total colonnes nouveau schéma  : ~220
─────────────────────────────────────
Colonnes mappées directement   : 4   (terme_sa, masse, numero_dossier, hpo_code)
Colonnes nécessitant transfo   : 10  (nom_mere, prenom_mere, sexe, dates×3, medecin_referent, VT, PC, statut)
Colonnes nouvelles (absentes)  : ~200 (tout le modèle BaMaRa)
Colonnes obsolètes à ignorer   : 0   (tout est conservé dans hub_case ou tables locales)
Valeurs FIXED (constantes)     : 8   (sourceId, site, consent, context, atHospital, foetopathDone)
Valeurs AUTO (retour API)      : 4   (bamara_id, idmr, medicalFileId, medicareId)
```

---

## 2. Schéma actuel complet du Hub

### Table `cases` (18 colonnes)

| Colonne | Type | Nullable | Usage |
|---|---|---|---|
| id | INTEGER PK | non | Auto-increment |
| numero_dossier | TEXT UNIQUE | non | Ex: FP-2026-001 |
| nom_mere | TEXT | oui | Nom de naissance mère |
| prenom_mere | TEXT | oui | Prénom mère |
| ddn_mere | TEXT | oui | Date de naissance mère (YYYY-MM-DD) |
| sexe | TEXT | oui | Valeurs libres (Masculin, Féminin, Indéterminé) |
| terme_sa | INTEGER | oui | Terme en SA |
| terme_jours | INTEGER | oui | Jours supplémentaires |
| type_prelevement | TEXT | oui | Type de prélèvement |
| indication_examen | TEXT | oui | Indication de l'examen |
| contexte_clinique | TEXT | oui | Contexte clinique libre |
| service_demandeur | TEXT | oui | Service demandeur |
| medecin_referent | TEXT | oui | Nom médecin (texte libre, non structuré) |
| date_reception | TEXT | oui | Date réception (YYYY-MM-DD) |
| date_examen | TEXT | oui | Date examen (YYYY-MM-DD) |
| statut | TEXT | non | 'en_cours', 'termine', 'archive' |
| created_at | TEXT | non | Timestamp |
| updated_at | TEXT | non | Timestamp |

### Table `biometries` (6 colonnes)

| Colonne | Type | Usage |
|---|---|---|
| id | INTEGER PK | |
| case_id | INTEGER FK→cases | |
| type | TEXT | 'macro', 'organes' |
| data_json | TEXT (JSON) | Ex: `{"masse": 560, "VT": 310, "PC": 213}` |
| computed_json | TEXT (JSON) | Z-scores calculés |
| updated_at | TEXT | |

**Champs dans data_json (type=macro)** : masse (g), VT (mm), VC (mm), PC (mm), pied (mm)
**Champs dans data_json (type=organes)** : coeur, poumon_d, poumon_g, foie, rate, etc. (g)

### Table `descriptions` (5 colonnes)

Descriptions textuelles par système d'organes (SNC, cœur, respiratoire...).
Stockées en JSON — données locales, non envoyées à BaMaRa.

### Table `hpo_terms` (6 colonnes)

| Colonne | Type | Usage |
|---|---|---|
| id | INTEGER PK | |
| case_id | INTEGER FK→cases | |
| hpo_code | TEXT | Ex: HP:0001631 |
| hpo_label | TEXT | Ex: Ascite |
| source | TEXT | 'rule', 'manual', 'ai' |
| validated | INTEGER | 0/1 |

### Table `bamara_status` (4 colonnes)

Suivi basique de l'état d'export : 'non_declare' / 'declare'.

### Tables `templates`, `generated_docs`, `settings`

Tables de support pour la génération de CR. Conservées telles quelles.

---

## 3. Mapping ancien → nouveau (champ par champ)

### 3.1 Champs mappés avec transformation

| Ancien | Type | → Nouveau | Transformation |
|---|---|---|---|
| `cases.nom_mere` | TEXT | `bam_identity.mother_name` | `UPPER(TRIM())` |
| `cases.prenom_mere` | TEXT | `bam_identity.mother_given_name` | `TRIM()` |
| `cases.sexe` | TEXT libre | `bam_identity.gender` | Map: Masculin→M, Féminin→F, *→UNK |
| `cases.terme_sa` | INTEGER | `bam_pregnancy_end.term_week` | Direct |
| `cases.date_reception` | TEXT date | `bam_medicare.inclusion_date_*` | Décomposer Y/M/D |
| `cases.date_examen` | TEXT date | `bam_encounter.encounter_date_*` | Décomposer Y/M/D |
| `cases.medecin_referent` | TEXT libre | `bam_medicare.care_provider_name` | Copie (non structuré) |
| `cases.statut` | TEXT | `hub_case.status` | en_cours→DRAFT, termine→READY, archive→CONFIRMED |
| `biometries.data_json→masse` | JSON float | `bam_antenatal.weight` | Direct (grammes) |
| `biometries.data_json→VT` | JSON float | `bam_antenatal.height` | mm → cm (/10) |
| `biometries.data_json→PC` | JSON float | `bam_antenatal.head_circumference` | mm → cm (/10) |
| `hpo_terms.*` | rows | `bam_clinical_description.*` | code→code, label→label, ref='HPO' |
| `bamara_status.statut` | TEXT | `hub_bamara_export.export_status` | non_declare→PENDING, declare→SUCCESS |

### 3.2 Champs conservés en local (pas dans BaMaRa)

| Ancien | → Nouveau | Raison |
|---|---|---|
| `cases.numero_dossier` | `hub_case.hub_case_number` | Numéro local Hub |
| `cases.ddn_mere` | `hub_case.ddn_mere` | DDN mère ≠ DDG, pas dans foetusAdmData |
| `cases.terme_jours` | Non migré | BaMaRa ne prend que les SA entières |
| `cases.type_prelevement` | `hub_case.type_prelevement` | Donnée locale foetopathologie |
| `cases.indication_examen` | `hub_case.indication_examen` | Donnée locale |
| `cases.contexte_clinique` | `hub_case.contexte_clinique` | Donnée locale |
| `cases.service_demandeur` | `hub_case.service_demandeur` | Donnée locale |
| `biometries` (complet) | `biometries` (FK renommée) | Données biométriques détaillées locales |
| `descriptions` (complet) | `descriptions` (FK renommée) | Descriptions organes locales |
| `templates`, `generated_docs` | Conservés tels quels | Génération de CR |
| `settings` | Conservée | Config locale |

### 3.3 Champs absents (à remplir dans les PWA)

**Critiques (bloquants pour l'envoi BaMaRa) :**

| Nouveau champ | Table | Pourquoi absent |
|---|---|---|
| `pregnancy_date_*` (DDG) | `bam_identity` | **DDG jamais collectée** — la plus grosse lacune |
| `diagnostic_status` | `bam_condition` | Statut diagnostic vs statut workflow |
| `termination_type` (IMG/ISG) | `bam_pregnancy_end` | Type d'interruption non collecté |
| `stp_type` (INUTERO/PERPARTUM) | `bam_pregnancy_end` | Type mort fœtale non collecté |
| `death_date_*` | `bam_pregnancy_end` | Date décès fœtus non collectée |
| `naissance_vivante` (birth) | `bam_pregnancy_end` | Issue grossesse non collectée |

**Enrichissements importants :**

| Nouveau champ | Table | Impact |
|---|---|---|
| `description_code` (Orpha) | `bam_condition` | Code Orphanet = requis si diagnostic confirmé |
| `heredity` | `bam_condition` | SPO/AD/AR/XLR/INC |
| `ins` / `ipp` | `bam_identity` | Identifiants nationaux |
| `residence_commune_code` | `bam_identity` | Code INSEE commune |
| `care_provider_rpps` | `bam_medicare` | RPPS du médecin |
| `mutation` | `bam_condition` | Événements génétiques |
| `inbreeding` | `bam_identity` | Consanguinité |

---

## 4. Valeurs fixes (constantes par site)

| Champ | Valeur | Source |
|---|---|---|
| `source_id` | `"AUTONOMOUS"` | Toutes les tables bam_* |
| `site_code` | `"S0034"` | hub_site_config |
| `site_label` | `"ADEST [CST] PIARD"` | hub_site_config |
| `site_id` (BaMaRa) | `33` | hub_site_config |
| `hospital_code` | `"H059"` | hub_site_config |
| `has_given_consent` | `true` | bam_identity |
| `is_fetus` | `true` | bam_identity (tous les cas foetopathologiques) |
| `context` | `"A"` | bam_encounter (Autre) |
| `context_precision` | `"Examen foeto-placentaire"` | bam_encounter |
| `location_at_hospital` | `true` | bam_encounter |
| `is_foetopathology_done` | `true` | bam_pregnancy_end |
| `early_diagnosis_status` | `"PRN"` | bam_condition (prénatal) |
| `residence_country_code` | `"FR"` | bam_identity (défaut) |

---

## 5. Transformations de types

### 5.1 Dates Python → BaMaRa

```
Ancien : "2026-03-15" (TEXT ISO 8601)
Nouveau : pregnancy_date_year=2026, pregnancy_date_month=3, pregnancy_date_day=15, pregnancy_date_mask=0

Fonction Python :
def to_bamara_date(iso_str):
    d = datetime.strptime(iso_str, "%Y-%m-%d")
    return {"mask": 0, "year": d.year, "month": d.month, "day": d.day}

En SQL (pour migration) :
CAST(strftime('%Y', date_col) AS INTEGER)  → year
CAST(strftime('%m', date_col) AS INTEGER)  → month
CAST(strftime('%d', date_col) AS INTEGER)  → day
```

### 5.2 Sexe

```
Ancien : "Masculin" / "Féminin" / "Indéterminé" / texte libre
Nouveau : "M" / "F" / "UNK"

CASE UPPER(sexe)
    WHEN 'MASCULIN' THEN 'M'  WHEN 'M' THEN 'M'  WHEN 'GARCON' THEN 'M'
    WHEN 'FEMININ'  THEN 'F'  WHEN 'F' THEN 'F'  WHEN 'FILLE'  THEN 'F'
    ELSE 'UNK'
END
```

### 5.3 Biométries mm → cm

```
Ancien : VT=310 (mm), PC=213 (mm)
Nouveau : height=31.0 (cm), head_circumference=21.3 (cm)

Transformation : ROUND(valeur_mm / 10.0, 1)
```

### 5.4 HPO → clinicalDescriptions

```
Ancien : hpo_terms(case_id, hpo_code="HP:0001631", hpo_label="Ascite")
Nouveau : bam_clinical_description(condition_id, code="0001631", label="Ascite", ref="HPO")

Note : le préfixe "HP:" doit être conservé ou retiré selon la spec API.
Vérifier si BaMaRa attend "HP:0001631" ou "0001631".
```

---

## 6. Recommandations

### 6.1 Priorité 1 — Bloquant pour l'envoi (à implémenter dans les PWA)

1. **Date de début de grossesse (DDG)** — Champ critique, actuellement absent.
   Sans DDG, impossible de créer l'identité fœtale dans BaMaRa.

2. **Issue de grossesse** — birth / termination_type / stp_type.
   Actuellement on ne sait pas si c'est une IMG ou MFIU de manière structurée.

3. **Date de décès fœtal** — Obligatoire si pas de naissance vivante.

4. **Statut diagnostic** — ONG/CON/INF. Le `statut` actuel est le workflow, pas le diag.

### 6.2 Priorité 2 — Enrichissement haute valeur

5. **Code Orphanet** — Obligatoire pour confirmer un diagnostic (CON).
   Un autocomplete Orphanet dans les PWA serait très utile.

6. **RPPS médecin** — Structurer `medecin_referent` en nom/prénom/RPPS.

7. **Adresse résidence** — Code commune INSEE pour la complétude.
   Un autocomplete commune (base INSEE/BAN) simplifierait la saisie.

8. **INS / IPP** — Identifiants nationaux, importants pour le matching BaMaRa.

### 6.3 Priorité 3 — Nice to have (enrichissement v2)

9. Hérédité, consanguinité, AMP
10. Gènes HGNC, techniques biologiques
11. Recherche (consentement, échantillons)
12. Scores CIF
13. Historique des grossesses

### 6.4 Priorité 4 — Futur (SDM-MR v2.17, pas encore actif côté API)

14. Propositus (IPP + INS, nouveau v2)
15. Moment diagnostic génétique (onset_genetic)
16. IPP fœtus DPI (ipp_fetus)

---

## 7. Architecture du nouveau schéma

```
bam_identity (central)
├── bam_medicare (1:N)
│   └── bam_encounter (1:N)
├── bam_condition (1:N, max 6)
│   ├── bam_clinical_description (1:N)
│   ├── bam_gene (1:N)
│   └── bam_biologic_method (1:N)
├── bam_pregnancy_end (1:1, fœtus uniquement)
├── bam_antenatal (1:1)
├── bam_research (1:N)
├── bam_propositus (1:1)
├── bam_icf (1:N)
├── bam_pregnancy_history (1:N)
│   └── bam_fetus (1:N)
│
├── hub_case (1:1, workflow local)
├── hub_bamara_export (1:1, suivi envoi)
│
├── biometries (1:N, données foetopathologiques locales)
├── descriptions (1:N, descriptions organes locales)
└── generated_docs (1:N, CR générés locaux)

hub_site_config (standalone, config site)
templates (standalone, modèles CR)
settings (standalone, config locale)
```
