# SPDX-License-Identifier: AGPL-3.0-or-later
"""Contexte « noms Lumi » pour les gabarits de compte rendu.

Les gabarits Jinja écrits pour Luminarium (FoetoPath_Luminarium_V2/Foeto/
templates/cr/) lisent des variables nommées par Lumi : `case`, `numero`,
`terme_sa`, `terme_j`, `morpho`, `calc_bio`, `ouverture`, `maceration`… Le
Monolithe s'en est inspiré pour l'examen clinique, la biométrie et l'autopsie :
on lui donne donc les MÊMES noms, remplis depuis ses propres saisies, pour qu'un
gabarit de Lumi tourne ici sans retouche. Rien n'est lu dans la base de Lumi :
Hub_HTML reste autonome, seuls les noms et les aides sont repris.

Là où les deux hubs utilisent le même nom avec deux formes (atcd_mat, atcd_obs,
grossesse, radio), on sert un sur-ensemble : les clés du Monolithe restent, celles
de Lumi s'ajoutent. Ce qui n'existe pas dans Lumi garde son nom Monolithe.

Les aides ci-dessous (_ds_text … _split_fixe) sont recopiées telles quelles de
Lumi (cr_templates.py) ; ne pas les « améliorer » ici, sinon un même gabarit
rendrait deux textes différents selon le hub.
"""


# ── Aides recopiées de Lumi (cr_templates.py) ─────────────────────────────────

def _ds_text(calc_dict, key):
    """Formatte un résultat DS : 'valeur unité (±X.XX DS)'"""
    if not calc_dict or key not in calc_dict:
        return "#"
    m = calc_dict[key]
    return f"{m['valeur']:.1f} {m.get('unite', 'g')} ({m['ds']:+.2f} DS)"


def _morpho_text(morpho, key):
    """Extrait le texte d'un item morpho : normal ou description."""
    item = morpho.get(key, {})
    if not isinstance(item, dict):
        return str(item) if item else "pas de particularité"
    if item.get("status") == "normal":
        return "pas de particularité"
    parts = []
    if item.get("details"):
        parts.extend(item["details"] if isinstance(item["details"], list) else [item["details"]])
    if item.get("text"):
        parts.append(item["text"])
    return ", ".join(parts) if parts else "anomalie non précisée"


def _age_mere(ddn_mere, date_accouchement):
    """Calcule l'âge de la mère à l'accouchement en années."""
    if not ddn_mere or not date_accouchement:
        return ""
    from datetime import date
    def _parse(s):
        for fmt in ("%Y-%m-%d", "%d/%m/%Y"):
            try:
                return date.fromisoformat(s) if fmt == "%Y-%m-%d" else date(int(s[6:]), int(s[3:5]), int(s[:2]))
            except Exception:
                continue
        return None
    d1 = _parse(str(ddn_mere))
    d2 = _parse(str(date_accouchement))
    if not d1 or not d2:
        return ""
    age = d2.year - d1.year - ((d2.month, d2.day) < (d1.month, d1.day))
    return f"{age} ans"


_ISSUE_LABELS = {
    "NAISSANCE_VIVANTE": "Naissance vivante",
    "IMG": "IMG", "FCS": "FCS", "MFIU": "MFIU",
    "MPN": "Mort per-natale", "MNN": "Mort néonatale",
    "GEU": "GEU", "ISG": "ISG",
}

_BIO_LABELS = {
    "masse": "Masse corporelle", "VT": "Vertex-talon", "VC": "Vertex-coccyx",
    "PC": "Périmètre crânien", "pied": "Pied",
}
_ORGAN_LABELS = {
    "coeur": "Cœur", "thymus": "Thymus",
    "poumons": "Poumons (D+G)", "poumon_d": "Poumon D", "poumon_g": "Poumon G",
    "foie": "Foie", "rate": "Rate", "pancreas": "Pancréas",
    "surrenales": "Surrénales (D+G)", "surrenale_d": "Surrénale D", "surrenale_g": "Surrénale G",
    "reins": "Reins (D+G)", "rein_d": "Rein D", "rein_g": "Rein G",
    "cerveau": "Cerveau",
}


def _bio_row(label, m):
    v = f"{m['valeur']:.1f} {m.get('unite', 'g')}"
    moy = f"{m['moyenne']:.1f}" if m.get("moyenne") is not None else ""
    ds = f"{m['ds']:+.2f}" if m.get("ds") is not None else ""
    return f"<tr><td>{label}</td><td>{v}</td><td>{moy}</td><td>{ds}</td></tr>\n"


_BIO_TABLE_STYLE = "border-collapse:collapse;font-size:12px;margin:6px 0"
_BIO_HDR = "<tr><th>Mesure</th><th>Valeur</th><th>Moyenne</th><th>DS</th></tr>"


def _table_bio_ext(calc_bio):
    """Biométries examen externe (masse, VT, VC, PC, pied) — Guihard-Costa."""
    if not calc_bio:
        return ""
    rows = ""
    for key in ("masse", "VT", "VC", "PC", "pied"):
        if key in calc_bio and isinstance(calc_bio[key], dict):
            rows += _bio_row(_BIO_LABELS.get(key, key), calc_bio[key])
    if not rows:
        return ""
    return f"<table border='1' cellpadding='4' cellspacing='0' style='{_BIO_TABLE_STYLE}'>\n{_BIO_HDR}\n{rows}</table>"


def _table_bio_int(calc_org):
    """Masses d'organes examen interne — Guihard-Costa."""
    if not calc_org:
        return ""
    rows = ""
    for key in ("cerveau", "coeur", "thymus", "poumons", "poumon_d", "poumon_g",
                 "foie", "rate", "pancreas", "surrenales", "surrenale_d", "surrenale_g",
                 "reins", "rein_d", "rein_g"):
        if key in calc_org and isinstance(calc_org[key], dict):
            rows += _bio_row(_ORGAN_LABELS.get(key, key), calc_org[key])
    if not rows:
        return ""
    return f"<table border='1' cellpadding='4' cellspacing='0' style='{_BIO_TABLE_STYLE}'>\n{_BIO_HDR}\n{rows}</table>"


def _table_biometries(calc_bio, calc_org):
    """Tableau combiné biométries + organes (rétrocompatibilité)."""
    parts = []
    ext = _table_bio_ext(calc_bio)
    if ext:
        parts.append(ext)
    interne = _table_bio_int(calc_org)
    if interne:
        parts.append(interne)
    return "\n".join(parts)


def _table_atcd_obs(atcd_obs):
    """Rend la liste des ATCD obstétricaux en tableau HTML."""
    if not atcd_obs:
        return ""
    hdr = "<tr><th>Date</th><th>Issue</th><th>Terme</th><th>Voie</th><th>Sexe</th><th>Percentile</th><th>Remarques</th></tr>"
    rows = ""
    for g in atcd_obs:
        if not isinstance(g, dict):
            continue
        issue = _ISSUE_LABELS.get(g.get("issue", ""), g.get("issue", ""))
        sexe = {"M": "M", "F": "F", "I": "Ind."}.get(g.get("sexe", ""), g.get("sexe", ""))
        perc = g.get("percentile_audipog", "")
        terme = g.get("terme_accouchement", "")
        if terme:
            terme = f"{terme} SA"
        rows += (f"<tr><td>{g.get('date', '')}</td><td>{issue}</td>"
                 f"<td>{terme}</td><td>{g.get('voie_accouchement', '')}</td>"
                 f"<td>{sexe}</td><td>{perc}</td>"
                 f"<td>{g.get('remarques', '')}</td></tr>\n")
    return f"<table border='1' cellpadding='4' cellspacing='0' style='border-collapse:collapse;font-size:12px'>\n{hdr}\n{rows}</table>"


def _table_os_longs(os_longs):
    """Tableau HTML des os longs avec z-scores Chitty."""
    if not os_longs:
        return ""
    hdr = "<tr><th>Os</th><th>D (mm)</th><th>G (mm)</th><th>Moyenne</th><th>Z-score</th></tr>"
    rows = ""
    for name, bone in os_longs.items():
        if not isinstance(bone, dict):
            continue
        d = bone.get("droite", "—")
        g = bone.get("gauche", "—")
        moy = bone.get("moyenne")
        z = bone.get("zscore_chitty")
        moy_s = f"{moy}" if moy is not None else "—"
        z_s = f"{z:+.2f}" if z is not None else "—"
        rows += f"<tr><td>{name}</td><td>{d}</td><td>{g}</td><td>{moy_s}</td><td>{z_s}</td></tr>\n"
    if not rows:
        return ""
    return f"<table border='1' cellpadding='4' cellspacing='0' style='{_BIO_TABLE_STYLE}'>\n{hdr}\n{rows}</table>"


def _table_maturation(maturation):
    """Tableau HTML des points de maturation osseuse."""
    if not maturation:
        return ""
    hdr = "<tr><th>SA</th><th>Point</th><th>Statut</th></tr>"
    rows = ""
    for m in maturation:
        if not isinstance(m, dict):
            continue
        status = m.get("status", "?")
        icon = "+" if status == "present" else "-"
        rows += f"<tr><td>{m.get('sa', '?')}</td><td>{m.get('label', '?')}</td><td>{icon} {status}</td></tr>\n"
    if not rows:
        return ""
    return f"<table border='1' cellpadding='4' cellspacing='0' style='{_BIO_TABLE_STYLE}'>\n{hdr}\n{rows}</table>"


# ══════════════════════════════════════════════════════════════════════════
# Genest — critères de rétention in utero
# ══════════════════════════════════════════════════════════════════════════

_GENEST_ITEMS = [
    (0, "Toute desquamation", "≥ 3h"),
    (1, "Desquamation ≥ 1 cm", "≥ 6h"),
    (2, "Décoloration cordon (brun/rouge)", "≥ 6h"),
    (3, "Desquamation face, dos ou abdomen", "≥ 12h"),
    (4, "Desquamation ≥ 5% surface", "≥ 18h"),
    (5, "Desquamation ≥ 2 zones / 11", "≥ 18h"),
    (6, "Coloration cutanée brune/ocre", "≥ 24h"),
    (7, "Desquamation modérée ou sévère", "≥ 24h"),
    (8, "Compression crânienne", "≥ 36h"),
    (9, "Desquamation > 10% surface", "≥ 48h"),
    (10, "Desquamation > 75% surface", "≥ 72h"),
    (11, "Bouche largement ouverte", "≥ 1 sem."),
    (12, "Momification", "≥ 2 sem."),
    (13, "Coloration cutanée ocre", "≥ 4 sem."),
]
_GENEST_BY_ID = {g[0]: g for g in _GENEST_ITEMS}
_TIME_ORDER = ["≥ 3h", "≥ 6h", "≥ 12h", "≥ 18h", "≥ 24h",
               "≥ 36h", "≥ 48h", "≥ 72h", "≥ 1 sem.", "≥ 2 sem.", "≥ 4 sem."]


def _table_genest(maceration):
    """Tableau HTML des critères Genest cochés + estimation rétention."""
    indices = maceration.get("genest", [])
    if not indices:
        return ""
    hdr = "<tr><th>Critère</th><th>Délai minimum</th></tr>"
    rows = ""
    max_time_idx = -1
    for idx in sorted(indices):
        g = _GENEST_BY_ID.get(idx)
        if not g:
            continue
        rows += f"<tr><td>{g[1]}</td><td>{g[2]}</td></tr>\n"
        ti = _TIME_ORDER.index(g[2]) if g[2] in _TIME_ORDER else -1
        if ti > max_time_idx:
            max_time_idx = ti
    if not rows:
        return ""
    estimation = _TIME_ORDER[max_time_idx] if max_time_idx >= 0 else "?"
    return (f"<table border='1' cellpadding='4' cellspacing='0' style='{_BIO_TABLE_STYLE}'>\n"
            f"{hdr}\n{rows}</table>\n"
            f"<div><b>Estimation de rétention : {estimation}</b></div>")


def _genest_retention(maceration):
    """Retourne l'estimation max de rétention sous forme de texte."""
    indices = maceration.get("genest", [])
    if not indices:
        return ""
    max_time_idx = -1
    for idx in indices:
        g = _GENEST_BY_ID.get(idx)
        if g and g[2] in _TIME_ORDER:
            ti = _TIME_ORDER.index(g[2])
            if ti > max_time_idx:
                max_time_idx = ti
    return _TIME_ORDER[max_time_idx] if max_time_idx >= 0 else ""


# ══════════════════════════════════════════════════════════════════════════
# Helpers normal / anormal — retournent {normales: [...], anomalies: [...]}
# ══════════════════════════════════════════════════════════════════════════

_NORMAL_WORDS = {"normal", "normaux", "normale", "normales", "ras", "rdp",
                 "sans particularité", "pas de particularité", "",
                 # vocabulaire d'autopsie : valeurs attendues, pas des anomalies
                 "solitus", "intègre", "intègres", "integre", "integres",
                 "perméable", "permeable", "présent", "present", "présents",
                 "en place", "absent", "libre", "libres", "habituel"}


def _is_normal(val):
    """Vrai si la valeur décrit un état attendu. Une liste ne l'est que si
    TOUS ses éléments le sont (['normaux'] est normal, ['kystiques'] non)."""
    if not val:
        return True
    if isinstance(val, (list, tuple, set)):
        return all(_is_normal(v) for v in val)
    if isinstance(val, dict):
        return all(_is_normal(v) for v in val.values())
    return str(val).strip().lower() in _NORMAL_WORDS


def _split_morpho(morpho):
    normales, anomalies = [], []
    for key, item in morpho.items():
        label = key.replace("_", " ").capitalize()
        if not isinstance(item, dict):
            continue
        if item.get("status") == "normal":
            normales.append(label)
        elif item.get("status") == "anormal":
            parts = []
            if item.get("details"):
                parts.extend(item["details"] if isinstance(item["details"], list) else [item["details"]])
            if item.get("text"):
                parts.append(item["text"])
            anomalies.append(f"{label} : {', '.join(parts)}" if parts else label)
    return {"normales": normales, "anomalies": anomalies}


def _split_radio(radio):
    normales, anomalies = [], []
    if not radio:
        return {"normales": normales, "anomalies": anomalies}

    vert = radio.get("vertebres", {})
    if isinstance(vert, dict):
        aspects = vert.get("aspects", [])
        if _is_normal(aspects):
            normales.append("Rachis")
        else:
            anomalies.append(f"Rachis : {', '.join(aspects)}")

    os = radio.get("aspect_os", {})
    if isinstance(os, dict):
        aspects = os.get("aspects", [])
        if _is_normal(aspects):
            normales.append("Aspect des os")
        else:
            anomalies.append(f"Aspect des os : {', '.join(aspects)}")

    cotes = radio.get("cotes", {})
    if isinstance(cotes, dict) and (cotes.get("droite") or cotes.get("gauche")):
        if cotes.get("droite") and cotes.get("gauche") and cotes["droite"] != cotes["gauche"]:
            anomalies.append(f"Côtes asymétriques (D:{cotes['droite']}, G:{cotes['gauche']})")
        else:
            normales.append(f"Côtes ({cotes.get('droite') or cotes.get('gauche')} paires)")

    if radio.get("thorax_forme"):
        v = radio["thorax_forme"]
        if _is_normal(v):
            normales.append("Thorax forme normale")
        else:
            anomalies.append(f"Thorax : {v}")

    os_longs = radio.get("biometries", {}).get("os_longs", {})
    for name, bone in os_longs.items():
        if not isinstance(bone, dict):
            continue
        z = bone.get("zscore_chitty")
        if z is not None and abs(z) > 2:
            anomalies.append(f"{name} (Z={z:+.2f})")
        elif z is not None:
            normales.append(f"{name} (Z={z:+.2f})")

    mat = radio.get("maturation_osseuse", [])
    for m in mat:
        if not isinstance(m, dict):
            continue
        if m.get("status") == "absent":
            anomalies.append(f"Maturation absente : {m.get('label', '?')} ({m.get('sa')} SA)")
        else:
            normales.append(f"{m.get('label', '?')} ({m.get('sa')} SA)")

    return {"normales": normales, "anomalies": anomalies}


_AUTOPSIE_CHECKS = [
    ("ouverture", "situs", "Situs"),
    ("ouverture", "diaphragme", "Diaphragme"),
    ("ouverture", "ogi", "OGI"),
    ("voies_aeriennes", "detail", "Voies aériennes"),
    ("thorax", "tvi", "TVI"),
    ("thorax", "pericarde", "Péricarde"),
    ("poumons", "morpho", "Poumons morphologie"),
    ("poumons", "docimasie", "Docimasie"),
    ("digestif", "meconium", "Méconium"),
    ("digestif", "anus", "Anus"),
    ("retroperitoine", "voies_urin", "Voies urinaires"),
    ("retroperitoine", "vessie", "Vessie"),
    ("retroperitoine", "gonades_pos", "Gonades"),
    ("neuro", "gyration", "Gyration"),
    ("neuro", "moelle", "Moelle"),
]


# Valeurs attendues, champ par champ : « crosse gauche » ou « FO perméable »
# décrivent l'anatomie normale et ne doivent pas remonter en anomalie.
_COEUR_ATTENDU = {
    "crosse": {"gauche", "à gauche", "crosse gauche"},
    "foramen_ovale": {"fo perméable", "perméable", "fo ouvert", "ouvert"},
    "quatre_cav": {"équilibrées", "equilibrees", "4 cavités équilibrées"},
    "gros_vx": {"croisés", "croises", "normalement croisés"},
}


def _split_autopsie(ctx):
    normales, anomalies = [], []

    for section, field, label in _AUTOPSIE_CHECKS:
        data = ctx.get(section, {})
        val = data.get(field) if isinstance(data, dict) else None
        if val is None:
            continue
        if _is_normal(val):
            normales.append(label)
        else:
            if isinstance(val, (list, tuple)):
                val = ", ".join(str(v) for v in val)   # sinon repr Python dans le CR
            anomalies.append(f"{label} : {val}")

    # Nested dicts with "etat" or "aspect"
    tsa = ctx.get("thorax", {}).get("tsa", {})
    if isinstance(tsa, dict) and tsa.get("etat"):
        if _is_normal(tsa["etat"]):
            normales.append("TSA")
        else:
            anomalies.append(f"TSA : {tsa['etat']}" + (f" — {tsa['detail']}" if tsa.get("detail") else ""))

    for org_key, org_label in [("thymus", "Thymus"), ("foie", "Foie"),
                                ("rate", "Rate"), ("pancreas", "Pancréas")]:
        section = "thorax" if org_key == "thymus" else "digestif"
        organ = ctx.get(section, {}).get(org_key, {})
        if isinstance(organ, dict) and organ.get("aspect"):
            if _is_normal(organ["aspect"]):
                normales.append(org_label)
            else:
                anomalies.append(f"{org_label} : {organ['aspect']}")

    reins = ctx.get("retroperitoine", {}).get("reins", {})
    if isinstance(reins, dict) and reins.get("aspects"):
        val = reins["aspects"] if isinstance(reins["aspects"], str) else ", ".join(reins["aspects"])
        if _is_normal(val):
            normales.append("Reins")
        else:
            anomalies.append(f"Reins : {val}")

    surr = ctx.get("retroperitoine", {}).get("surrenales", {})
    if isinstance(surr, dict) and surr.get("aspects"):
        val = surr["aspects"] if isinstance(surr["aspects"], str) else ", ".join(surr["aspects"])
        if _is_normal(val):
            normales.append("Surrénales")
        else:
            anomalies.append(f"Surrénales : {val}")

    coeur = ctx.get("coeur", {})
    if isinstance(coeur, dict):
        coeur_normal = True
        coeur_details = []
        for ck, cl in [("quatre_cav", "4 cavités"), ("foramen_ovale", "Foramen ovale"),
                        ("gros_vx", "Gros vaisseaux"), ("crosse", "Crosse")]:
            v = coeur.get(ck)
            if v and str(v).strip().lower() in _COEUR_ATTENDU.get(ck, ()):
                continue          # valeur attendue du champ, pas une anomalie
            if v and not _is_normal(v):
                coeur_normal = False
                coeur_details.append(f"{cl}: {v}")
        if coeur.get("vg_ej", {}).get("civ_diam"):
            coeur_normal = False
            _civ = str(coeur["vg_ej"]["civ_diam"]).strip()
            coeur_details.append("CIV " + (_civ if _civ.lower().endswith("mm")
                                           else _civ + " mm"))
        if coeur_normal and any(coeur.get(k) for k in ("quatre_cav", "foramen_ovale", "gros_vx")):
            normales.append("Cœur")
        elif coeur_details:
            anomalies.append(f"Cœur : {', '.join(coeur_details)}")

    neuro = ctx.get("neuro", {})
    if isinstance(neuro, dict) and neuro.get("detail"):
        anomalies.append(f"Neuro : {neuro['detail']}")

    return {"normales": normales, "anomalies": anomalies}


_FDR_KEYS = [
    ("fdr_hta", "HTA"),
    ("fdr_diabete", "Diabète"),
    ("fdr_tabac", "Tabac"),
    ("fdr_alcool", "Alcool"),
    ("fdr_consanguinite", "Consanguinité"),
]


def _split_fdr(atcd_mat):
    positifs, negatifs = [], []
    for key, label in _FDR_KEYS:
        val = atcd_mat.get(key)
        if not val or str(val).lower() in ("non", "false", "0", ""):
            negatifs.append(label)
        else:
            positifs.append(f"{label} : {val}" if val not in (True, "true", "oui", "Oui") else label)
    return {"positifs": positifs, "negatifs": negatifs}


_PRENATAL_NORMAL = {"normal", "normaux", "normale", "normales", "ras", "sans particularité", "",
                    "46,xx", "46,xy", "46 xx", "46 xy"}
_ECHO_KEYS = [("echo_t1", "Écho T1"), ("echo_t2", "Écho T2"), ("echo_t3", "Écho T3")]
_GENET_KEYS = [("caryotype", "Caryotype"), ("acpa", "ACPA"), ("ngs", "NGS/Exome"),
               ("recherche_aneuploidie", "DPNI")]


def _split_prenatal(exam_pren):
    normaux, anormaux = [], []
    for key, label in _ECHO_KEYS:
        status = exam_pren.get(f"{key}_status", "")
        details = exam_pren.get(f"{key}_details", "")
        if not status:
            continue
        if str(status).strip().lower() in _PRENATAL_NORMAL:
            normaux.append(label)
        else:
            anormaux.append(f"{label} : {status}" + (f" — {details}" if details else ""))

    for key, label in _GENET_KEYS:
        val = exam_pren.get(key, "")
        if not val:
            continue
        if str(val).strip().lower() in _PRENATAL_NORMAL | {"non fait", "non réalisé"}:
            normaux.append(label)
        else:
            anormaux.append(f"{label} : {val}")

    if exam_pren.get("anomalies_suspectees"):
        anormaux.append(f"Suspectées : {exam_pren['anomalies_suspectees']}")
    if exam_pren.get("anomalies_confirmees"):
        anormaux.append(f"Confirmées : {exam_pren['anomalies_confirmees']}")

    return {"normaux": normaux, "anormaux": anormaux}


def _split_fixe(macro_fixe):
    normales, anomalies = [], []
    organes = macro_fixe.get("organes", {})
    for org_id, org in organes.items():
        if not isinstance(org, dict):
            continue
        label = org_id.replace("_", " ").capitalize()
        if org.get("lesion_desc"):
            anomalies.append(f"{label} : {org['lesion_desc']}")
        else:
            normales.append(label)
    return {"normales": normales, "anomalies": anomalies}


# ── Placenta : recopié de Lumi (placenta_cr_templates.py) ─────────────────────
# Référentiels Redline (masse placentaire, ratio fœto-placentaire)

DONNEES_PLACENTA = {
    18: {"moyenne": 107, "sd": 23, "P10": 52, "P50": 89, "P90": 181, "source": "Extrapol"},
    19: {"moyenne": 113, "sd": 25, "P10": 56, "P50": 94, "P90": 196, "source": "Extrapol"},
    20: {"moyenne": 130, "sd": 26, "P10": 82, "P50": 110, "P90": 214, "source": "Extrapol"},
    21: {"moyenne": 150, "sd": 25, "P10": 95, "P50": 130, "P90": 230, "source": "Extrapol"},
    22: {"moyenne": 189, "sd": 89, "P10": 107, "P50": 166, "P90": 285, "source": "Redline"},
    23: {"moyenne": 190, "sd": 41, "P10": 127, "P50": 188, "P90": 262, "source": "Redline"},
    24: {"moyenne": 190, "sd": 42, "P10": 128, "P50": 192, "P90": 252, "source": "Redline"},
    25: {"moyenne": 197, "sd": 70, "P10": 128, "P50": 184, "P90": 299, "source": "Redline"},
    26: {"moyenne": 226, "sd": 100, "P10": 138, "P50": 200, "P90": 281, "source": "Redline"},
    27: {"moyenne": 240, "sd": 77, "P10": 130, "P50": 242, "P90": 332, "source": "Redline"},
    28: {"moyenne": 223, "sd": 66, "P10": 140, "P50": 214, "P90": 321, "source": "Redline"},
    29: {"moyenne": 269, "sd": 96, "P10": 161, "P50": 252, "P90": 352, "source": "Redline"},
    30: {"moyenne": 324, "sd": 88, "P10": 208, "P50": 316, "P90": 433, "source": "Redline"},
    31: {"moyenne": 314, "sd": 105, "P10": 175, "P50": 313, "P90": 417, "source": "Redline"},
    32: {"moyenne": 325, "sd": 77, "P10": 241, "P50": 318, "P90": 436, "source": "Redline"},
    33: {"moyenne": 351, "sd": 83, "P10": 252, "P50": 352, "P90": 446, "source": "Redline"},
    34: {"moyenne": 381, "sd": 84, "P10": 283, "P50": 382, "P90": 479, "source": "Redline"},
    35: {"moyenne": 411, "sd": 99, "P10": 291, "P50": 401, "P90": 544, "source": "Redline"},
    36: {"moyenne": 447, "sd": 110, "P10": 320, "P50": 440, "P90": 580, "source": "Redline"},
    37: {"moyenne": 467, "sd": 107, "P10": 349, "P50": 452, "P90": 607, "source": "Redline"},
    38: {"moyenne": 493, "sd": 103, "P10": 365, "P50": 484, "P90": 629, "source": "Redline"},
    39: {"moyenne": 500, "sd": 103, "P10": 379, "P50": 490, "P90": 635, "source": "Redline"},
    40: {"moyenne": 510, "sd": 100, "P10": 390, "P50": 501, "P90": 643, "source": "Redline"},
    41: {"moyenne": 524, "sd": 100, "P10": 403, "P50": 515, "P90": 655, "source": "Redline"},
    42: {"moyenne": 532, "sd": 99, "P10": 412, "P50": 525, "P90": 658, "source": "Redline"},
}

RATIO_FP = {
    21: {"moy": 2.64, "sd": 0.8}, 22: {"moy": 2.97, "sd": 0.8}, 23: {"moy": 3.3, "sd": 0.7},
    24: {"moy": 3.4, "sd": 1.0}, 25: {"moy": 4.0, "sd": 1.4}, 26: {"moy": 4.1, "sd": 1.2},
    27: {"moy": 4.5, "sd": 1.1}, 28: {"moy": 4.8, "sd": 1.0}, 29: {"moy": 5.2, "sd": 1.4},
    30: {"moy": 5.2, "sd": 1.1}, 31: {"moy": 5.5, "sd": 1.1}, 32: {"moy": 5.9, "sd": 1.2},
    33: {"moy": 6.0, "sd": 1.1}, 34: {"moy": 6.2, "sd": 1.0}, 35: {"moy": 6.4, "sd": 1.2},
    36: {"moy": 6.6, "sd": 1.1}, 37: {"moy": 6.8, "sd": 1.1}, 38: {"moy": 6.9, "sd": 1.1},
    39: {"moy": 7.1, "sd": 1.1}, 40: {"moy": 7.2, "sd": 1.1}, 41: {"moy": 7.2, "sd": 1.1},
    42: {"moy": 7.1, "sd": 1.1},
}


def compute_zscore(terme, masse, masse_foetale=None):
    """Calcule le Z-score de la masse placentaire."""
    result = {
        "masse_ds": None, "percentile": None, "trophicite": None,
        "ref": None, "extrapolated": False,
        "ratio_fp": None, "ratio_ds": None,
    }
    if not terme or not masse:
        return result
    ref = DONNEES_PLACENTA.get(int(terme))
    if not ref:
        return result
    result["ref"] = ref
    ds = (masse - ref["moyenne"]) / ref["sd"]
    result["masse_ds"] = round(ds, 2)
    result["extrapolated"] = ref["source"] == "Extrapol"

    if masse <= ref["P10"]:
        result["percentile"] = "< P10"
    elif masse <= ref["P50"]:
        result["percentile"] = "P10-P50"
    elif masse <= ref["P90"]:
        result["percentile"] = "P50-P90"
    else:
        result["percentile"] = "> P90"

    result["trophicite"] = "Hypotrophe" if ds < -1.67 else "Eutrophe"

    if masse_foetale and masse > 0:
        ratio = masse_foetale / masse
        result["ratio_fp"] = round(ratio, 2)
        rr = RATIO_FP.get(int(terme))
        if rr and rr.get("sd"):
            result["ratio_ds"] = round((ratio - rr["moy"]) / rr["sd"], 2)

    return result


def _list_or_empty(val):
    """Retourne une liste à partir d'une valeur qui peut être str JSON, list, ou None."""
    if isinstance(val, list):
        return val
    if isinstance(val, str):
        try:
            import json
            return json.loads(val)
        except (json.JSONDecodeError, ValueError):
            return [val] if val else []
    return []


def _dict_or_empty(val):
    """Retourne un dict à partir d'une valeur qui peut être str JSON, dict, ou None."""
    if isinstance(val, dict):
        return val
    if isinstance(val, str):
        try:
            import json
            return json.loads(val)
        except (json.JSONDecodeError, ValueError):
            return {}
    return {}


def _format_etats(etats):
    """Formate une liste d'états en texte."""
    items = _list_or_empty(etats)
    if not items:
        return "non évaluée"
    if items == ["Normale"] or items == ["Normal"]:
        return "sans particularité"
    return ", ".join(items).lower()


def aides_placenta(context: dict) -> dict:
    def _completude(val):
        items = _list_or_empty(val)
        return ", ".join(items).lower() if items else "non évaluée"

    def _plaque(val):
        d = _dict_or_empty(val)
        etats = _format_etats(d.get("etats", []))
        remarques = d.get("remarques", "")
        result = f"Aspect : {etats}."
        if remarques:
            result += f"\nNote : {remarques}."
        return result

    def _plaque_short(val):
        d = _dict_or_empty(val)
        return _format_etats(d.get("etats", []))

    return {
        "_completude": _completude,
        "_plaque": _plaque,
        "_plaque_short": _plaque_short,
    }


# ── Correspondance Monolithe → noms Lumi ──────────────────────────────────────

class ListeObs(list):
    """atcd_obs : liste des grossesses pour Lumi, et gestite / parite /
    grossesses en attributs pour les gabarits du Monolithe."""
    def __init__(self, obs):
        obs = obs or {}
        super().__init__(_grossesse_lumi(g) for g in obs.get("grossesses") or [])
        self.gestite = obs.get("gestite")
        self.parite = obs.get("parite")
        self.grossesses = obs.get("grossesses") or []


def _date(v):
    """Date du Monolithe ({annee, mois, jour, precision}) au format de Lumi."""
    if not isinstance(v, dict):
        return v or ""
    a, m, j = v.get("annee"), v.get("mois"), v.get("jour")
    if a and m and j:
        return f"{j:02d}/{m:02d}/{a}"
    if a and m:
        return f"{m:02d}/{a}"
    return str(a) if a else ""


def _grossesse_lumi(g):
    f = (g.get("foetus") or [{}])[0]
    return {"date": _date(g.get("date_fin")), "issue": f.get("issue") or "",
            "terme_accouchement": f.get("terme") or "", "voie_accouchement": g.get("voie") or "",
            "sexe": f.get("sexe") or "", "percentile_audipog": f.get("percentile") or "",
            "remarques": f.get("remarques") or ""}


def _valeur(c):
    """Valeur d'un champ d'autopsie telle que Lumi la stockait : texte pour les puces."""
    t = c.get("type")
    if t == "chips":
        return ", ".join(c.get("valeurs") or []) or None
    if t in ("masse", "masse2"):
        return c.get("grammes") if t == "masse" else c.get("total")
    return c.get("valeur")


# Chaînes « cr.* » de Lumi (locales/fr.json), recopiées : t('cr.conclusion') → « Conclusion »
import json as _json
from pathlib import Path as _Path
_FR = _json.loads((_Path(__file__).with_name("cr_lumi_fr.json")).read_text(encoding="utf-8"))


def t(key, lang=None, **kw):
    """Traduction à la manière de Lumi : la clé elle-même si elle est inconnue."""
    v = _FR
    for p in key.split("."):
        v = v.get(p) if isinstance(v, dict) else None
    return v.format(**kw) if isinstance(v, str) and kw else (v if isinstance(v, str) else key)


def _champs(doc):
    """{étape: {champ: dict brut du champ}} d'un module à étapes (autopsie, neuropath)."""
    return {e.get("id"): {c["id"]: c for c in e.get("champs") or [] if c.get("id")}
            for e in doc.get("etapes") or []}


def _neuropath(neu):
    """Les np_* du gabarit neuropath de Lumi, depuis le module neuropath du Monolithe."""
    ch = _champs(neu)
    v = lambda s, k: _valeur((ch.get(s) or {}).get(k) or {})
    liste = lambda s, k: ((ch.get(s) or {}).get(k) or {}).get("valeurs") or []
    tranche = lambda s: ([{"numero": 1, "constatations": liste(s, s[0] + "h" + s[-1]), "detail": v(s, s[0] + "h" + s[-1] + "_detail")}]
                         if liste(s, s[0] + "h" + s[-1]) or v(s, s[0] + "h" + s[-1] + "_detail") else [])
    oeil = lambda c: {"dt": v("oculaire", f"oeil_{c}_dt"), "dap": v("oculaire", f"oeil_{c}_dap"), "dc": v("oculaire", f"oeil_{c}_dc")}
    return {
        "np_sa": neu.get("terme_sa") or "",
        "np_descriptions": {k: {"status": v("macro", k), "detail": v("macro", k + "_detail"), "signes": []}
                            for k in ("meninges", "gyration", "willis", "mamillaires", "colliculi") if (ch.get("macro") or {}).get(k)},
        "np_bio": {k: v("biometrie", m) for k, m in (("masse_encephale", "masse_enc"), ("masse_cervelet", "masse_cerv"),
                   ("DOFD", "DOFD"), ("DOFG", "DOFG"), ("DT", "DT"), ("DTC", "DTC"), ("HautVermis", "HautVermis"))}
                  | {"CC": v("corps_calleux", "CC")},
        "np_zscores": {},
        "np_oculaire": {"oeil1": oeil("d"), "oeil2": oeil("g")},
        "np_cerv": {"ratio_ce": v("biometrie", "ratio_ce")},
        "np_aqueduc": {"status": liste("cervelet", "aqueduc"), "detail": v("cervelet", "aqueduc_detail")},
        "np_cc": {"status": liste("corps_calleux", "cc"), "longueur": v("corps_calleux", "CC"), "detail": v("corps_calleux", "cc_detail")},
        "np_thd": tranche("tranches_hd"), "np_thg": tranche("tranches_hg"),
        "np_hpo": [],
    }


# Genest : palier de l'examen clinique → indice de la liste de Lumi (_GENEST_ITEMS)
GENEST_LUMI = {"6h": [1], "12h": [3], "18h": [4], "24h": [6], "2sem": [12]}

# Biométries externes : clé Monolithe → clé Lumi (calc_bio, bio)
BIO_LUMI = {"masse": "masse", "vt": "VT", "vc": "VC", "pc": "PC", "pied": "pied"}


def _autopsie(aut):
    """Sections de macro_autopsie (Lumi) depuis les étapes du module autopsie."""
    sec = {}
    for e in aut.get("etapes") or []:
        sec[e.get("id")] = {c["id"]: _valeur(c) for c in e.get("champs") or [] if c.get("id")}
    g = lambda s, k: (sec.get(s) or {}).get(k)
    ouv, place = dict(sec.get("ouverture") or {}), sec.get("en_place") or {}
    ouv.update(ogi=place.get("ogi"), ogi_detail=place.get("ogi_detail"),
               epanchements={k: ouv.get("ep_" + k) for k in ("pleural_d", "pleural_g", "peritoine", "pericarde")})
    thorax = dict(sec.get("thorax") or {})
    thorax.update(tsa={"etat": g("coeur", "tsa")},
                  thymus={"aspect": g("thorax", "thymus_aspect"), "masse": g("thorax", "thymus_masse")})
    poumons = dict(sec.get("poumons") or {})
    poumons["morpho"] = ", ".join(x for x in (g("poumons", "poumon_d_aspect"), g("poumons", "poumon_g_aspect")) if x) or None
    dig = dict(sec.get("digestif") or {})
    dig.update(foie={"aspect": dig.get("foie_aspect")}, rate={"aspect": dig.get("rate_aspect")},
               pancreas={"aspect": dig.get("pancreas_aspect")},
               estomac={"contenu": dig.get("estomac")}, tube_dig={"detail": dig.get("tube_dig")})
    retro = dict(sec.get("retroperitoine") or {})
    retro.update(reins={"aspects": retro.get("reins_aspect")},
                 surrenales={"aspects": retro.get("surrenales_aspect")}, vessie=place.get("vessie"))
    neuro = dict(sec.get("neuro") or {})
    neuro["detail"] = neuro.get("neuro_detail")
    prel = dict(sec.get("prelevements") or {})
    prel["speciaux_det"] = prel.get("prelev_detail")
    return {"ouverture": ouv, "voies_aeriennes": {"detail": g("thorax", "voies_aer")},
            "thorax": thorax, "coeur": sec.get("coeur") or {}, "poumons": poumons,
            "digestif": dig, "retroperitoine": retro, "neuro": neuro, "prelevements": prel,
            "commentaire_autopsie": g("restitution", "commentaire") or ""}


def _placenta_lumi(ctx, plac):
    """Les variables des gabarits placenta de Lumi, depuis macro_placenta et la
    composition de la grille placenta du Monolithe."""
    ch = {k: v for sec in plac.get("sections") or [] for k, v in (sec.get("champs") or {}).items()}
    sa = ch.get("terme_sa") or ctx["terme"]["sa"]
    comp = (ctx.get("grille_placenta") or {}).get("composition") or {}
    gp = ctx.get("grille_placenta") or {}
    return {
        "terme_sa": sa, "terme_j": ch.get("terme_jours") or ctx["terme"]["j"] or 0,
        "sexe": ctx["issue"].get("sexe") or ch.get("sexe") or "",
        "statut": ctx.get("statut") or "en_cours",
        "terme_source": ch.get("terme_source"),
        "masse_foetale_g": ch.get("masse_foetale"),
        "indication_terme": ch.get("indication_detail") or ch.get("indication"),
        "grand_axe_cm": ch.get("grand_axe"), "petit_axe_cm": ch.get("petit_axe"),
        "epaisseur_cm": ch.get("epaisseur"), "masse_paree_g": ch.get("masse"),
        "forme": ch.get("forme"), "completude": ch.get("completude") or [],
        "plaque_choriale": {"etats": ch.get("etat_choriale") or [], "remarques": ch.get("remarques_choriale") or ""},
        "plaque_basale": {"etats": ch.get("etat_basale") or [], "remarques": ch.get("remarques_basale") or ""},
        "cordon": {"insertion": ch.get("cordon_insertion"), "longueur_cm": ch.get("cordon_longueur"),
                   "spiralisation": ch.get("cordon_spiralisation"),
                   "particularites": ch.get("cordon_particularites") or [],
                   # booléens de Lumi, tirés des particularités cochées du Monolithe
                   "palmure_amniotique": "Palmure amniotique" in (ch.get("cordon_particularites") or []),
                   "striction": "Striction" in (ch.get("cordon_particularites") or []),
                   "vaisseaux": None,          # compté à la micro (grille placenta), pas à la macro
                   "remarques": ch.get("remarques_cordon") or ""},
        "membranes": {"insertion": ch.get("membranes_insertion"), "marginee_pct": ch.get("membranes_marginee_pct"),
                      "aspect": ch.get("membranes_aspect"), "remarques": ch.get("remarques_membranes") or ""},
        "tranches": {"tranche_groups": plac.get("tranches") or [], "lesions": plac.get("lesions") or []},
        "nb_tranches_groups": len(plac.get("tranches") or []),
        "lesions": ctx["placenta"].get("lesions") or [],
        "tranches_commentaire": (ch.get("remarques_tranches") or "").strip(),
        "photos_tranches": [], "micro_lecture": {},
        "zscore": compute_zscore(sa, ch.get("masse"), ch.get("masse_foetale")),
        # la composition par section de la grille placenta = le composite de Lumi
        "composite_micro_text": "\n".join(x["texte"] for x in comp.get("sections") or [] if x.get("texte")),
        "composite_conclusion_items": [f["label"] for f in gp.get("foeto") or []],
        # micro_text (grille de lecture de Lumi) : la grille du Monolithe compose son
        # propre texte, qui passe déjà par composite_micro_text ; pas de doublon brut.
        "micro_text": "",
    }


def contexte_lumi(ctx, clin, aut, neu, plac=None):
    """Les variables de Lumi, depuis le contexte du Monolithe (ctx) et les JSON
    bruts de l'examen clinique (clin), de l'autopsie (aut) et de la neuropath (neu)."""
    ident, circ, issue = ctx["identite"], ctx["circuit"], ctx["issue"]
    atcd_mat, gro, pren = ctx["atcd_mat"], ctx["grossesse"], ctx["prenatal"]
    ret = clin.get("retention") or {}
    sa, j = ctx["terme"]["sa"], ctx["terme"]["j"]

    case = {"numero_dossier": ctx["dossier"], "nom_mere": ident.get("nom_mere") or "",
            "prenom_mere": ident.get("prenom_mere") or "", "ddn_mere": _date(ident.get("ddn_mere")),
            "nom_naissance_mere": ident.get("nom_naiss") or "", "prenom_foetus": ident.get("prenom_foetus") or "",
            "ipp": ident.get("ipp"), "ipp_fetus": ident.get("ipp_fetus"), "ins": ident.get("ins"),
            "case_id_externe": ident.get("id_ext"), "sexe": issue.get("sexe") or "",
            "type_issue": issue.get("type_issue") or "", "date_deces": _date(circ.get("date_deces")),
            "date_examen": _date(circ.get("date_examen")), "date_reception": _date(circ.get("date_reception")),
            "indication_examen": issue.get("indication") or "", "medecin_referent": circ.get("medecin") or "",
            "service_demandeur": circ.get("service") or "", "ville_maternite": circ.get("ville_maternite") or "",
            "consanguinite": atcd_mat.get("consanguinite"), "grossesse_multiple": issue.get("multiple"),
            "contexte_clinique": gro.get("contexte_clinique") or "", "notes": ctx.get("remarques") or "",
            "terme_issue": ctx["terme"]["texte"], "numero_placenta": None}

    # morpho : un item de l'examen clinique = une entrée MORPHO de Lumi
    morpho = {}
    for e in clin.get("etages") or []:
        for i in e.get("items") or []:
            if i.get("etat"):
                morpho[i["id"]] = {"status": i["etat"],
                                   "details": [a if isinstance(a, str) else a.get("label") for a in i.get("anomalies") or []],
                                   "text": i.get("precisions") or ""}

    # calculs : z de Guihard-Costa, comme calc_bio / calc_org de Lumi
    calc_bio, bio = {}, {}
    for l in ctx["biometrie"]["lignes"]:
        bio[l["cle"]] = l["valeur"]                  # bip, dici, pa… : même clé des deux côtés
        k = BIO_LUMI.get(l["cle"])
        if not k:
            continue
        bio[k] = l["valeur"]
        if l.get("z_gc") is not None:
            att = (ctx["z"].get(l["cle"]) or {}).get("attendu_gc") or {}
            calc_bio[k] = {"label": l["label"], "valeur": l["valeur"], "unite": l.get("unite") or "", "ds": l["z_gc"],
                           "moyenne": att.get("moy")}
    calc_org = {m["id"].removesuffix("_masse"): {"label": m["label"], "valeur": m["valeur"], "unite": "g", "ds": m["z_gc"],
                                                 "moyenne": (m.get("attendu_gc") or {}).get("moy")}
                for m in ctx["autopsie"]["masses"] if m.get("z_gc") is not None}
    alertes = [f"{l['label']} : {l['z_gc']:+.1f} DS" for l in ctx["biometrie"]["lignes"] + ctx["autopsie"]["masses"]
               if l.get("alerte") and l.get("z_gc") is not None]
    lbwr = {"label": "LBWR (De Paepe)", "valeur": None, "alerte": None}
    poumons_g = next((m["valeur"] for m in ctx["autopsie"]["masses"] if m["id"] == "poumons_masse"), None)
    if poumons_g and bio.get("masse") and sa:
        v = round(poumons_g / bio["masse"], 4)
        seuil = 0.012 if sa < 28 else 0.015
        lbwr = {"label": "LBWR (De Paepe)", "valeur": v,
                "alerte": f"Hypoplasie pulmonaire (LBWR {v:.4f} < {seuil})" if v < seuil else None}
    ds_m = (calc_bio.get("masse") or {}).get("ds")
    trophicite = ("non évaluable" if ds_m is None else "hypotrophe" if ds_m < -2
                  else "macrosome" if ds_m > 2 else "eutrophe")

    autopsie = _autopsie(aut)

    # sur-ensembles : noms partagés, formes des deux hubs
    atcd_mat_l = dict(atcd_mat)
    fdr = atcd_mat.get("fdr") or {}
    atcd_mat_l.update({"fdr_" + k: v for k, v in fdr.items()},
                      fdr_consanguinite=atcd_mat.get("consanguinite"),
                      gestite=ctx["atcd_obs"].get("gestite"), parite=ctx["atcd_obs"].get("parite"))
    exam_pren = dict(pren)
    exam_pren.update({f"echo_t{n}_status": pren.get(f"echo_t{n}") for n in (1, 2, 3)})
    rad = dict(ctx["radio"] or {})
    sq = rad.get("squelette") or {}
    for k in ("aspect_general", "cotes", "thorax_forme", "vertebres", "aspect_os"):
        rad.setdefault(k, sq.get(k))
    rad.setdefault("hpo_codes", [dict(h, term=h.get("term_fr")) for h in rad.get("hpo") or []])

    all_anomalies = [f"{k.replace('_', ' ').capitalize()} : {', '.join(v['details'] + ([v['text']] if v['text'] else [])) or 'anomalie non précisée'}"
                     for k, v in morpho.items() if v["status"] == "anormal"] + alertes

    out = {
        "case": case, "numero": ctx["dossier"],
        "nom_mere": case["nom_mere"], "prenom_mere": case["prenom_mere"], "ddn_mere": case["ddn_mere"],
        "sexe": case["sexe"], "type_issue": case["type_issue"], "terme_sa": sa, "terme_j": j or 0,
        "date_deces": case["date_deces"], "date_examen": case["date_examen"],
        "date_autopsie_exif": (ctx["autopsie"].get("ouverture_at") or "")[:16].replace("T", " "),
        "indication": case["indication_examen"], "medecin": case["medecin_referent"],
        "service": case["service_demandeur"],
        "atcd_mat": atcd_mat_l, "atcd_obs": ListeObs(ctx["atcd_obs"]), "exam_prenataux": exam_pren,
        "etat": "",
        # grade de l'examen clinique, sinon celui de l'autopsie (ctx autopsie.maceration)
        "maceration": {"maroun_score": ctx["autopsie"]["maceration"], "genest": GENEST_LUMI.get(ret.get("genest"), [])},
        "bio": bio, "morpho": morpho, "commentaire_frais": "", "anomalies_frais": [],
        "calc_bio": calc_bio, "calc_org": calc_org, "calc_ind": {}, "calc_ratios": {"_lbwr": lbwr},
        "alertes": alertes, "lbwr": lbwr, "trophicite": trophicite, "all_anomalies": all_anomalies,
        "macro_fixe": {}, "photos_frais": [], "photos_autopsie": [],
        "radio": rad, "rad_terme_sa": (rad.get("terme") or {}).get("sa"),
        "rad_terme_jours": (rad.get("terme") or {}).get("jours") or 0,
        "rad_aspect_general": rad.get("aspect_general") or "", "rad_cotes": rad.get("cotes") or {},
        "rad_thorax_forme": rad.get("thorax_forme") or "", "rad_vertebres": rad.get("vertebres") or {},
        "rad_aspect_os": rad.get("aspect_os") or {}, "rad_biometries": rad.get("biometries") or {},
        "rad_os_longs": (rad.get("biometries") or {}).get("os_longs") or {},
        "rad_scores": rad.get("scores_staturaux") or {}, "rad_maturation": rad.get("maturation_osseuse") or [],
        "rad_remarques": rad.get("remarques") or "", "rad_hpo_codes": rad["hpo_codes"],
        "histo": {}, "histo_organes": [], "histo_lesions": [],
        # ajoutés par Lumi depuis son viewer de lames : pas d'équivalent ici
        "labellisation_table": [], "composite_micro_text": "", "composite_conclusion_items": [],
        "labellisation_micro_text": "", "viewer_micro_text": "", "viewer_conclusion_items": [],
        "viewer_annotations": {}, "micro_text": "",
    }
    out.update(autopsie)
    anus = morpho.get("anus")
    out["digestif"]["anus"] = None if not anus else ("perméable" if anus["status"] == "normal"
                                                      else ", ".join(anus["details"]) or "anormal")
    out.update(_neuropath(neu))
    if plac:
        out.update(_placenta_lumi(ctx, plac))
        out.update(photos_frais=[])
    out["t"] = t
    out.update(aides(out))
    out.update(aides_placenta(out))
    return out


def aides(context):
    """Les aides Jinja de Lumi (cr_helpers), liées au contexte."""
    return {
        "_ds": lambda key: _ds_text(context.get("calc_bio", {}), key),
        "_morpho": lambda key: _morpho_text(context.get("morpho", {}), key),
        "_table_atcd_obs": lambda: _table_atcd_obs(context.get("atcd_obs", [])),
        "table_biometries_externes": lambda: _table_bio_ext(context.get("calc_bio", {})),
        "table_biometries_internes": lambda: _table_bio_int(context.get("calc_org", {})),
        "_table_biometries": lambda: _table_biometries(context.get("calc_bio", {}), context.get("calc_org", {})),
        "table_os_longs": lambda: _table_os_longs(context.get("rad_os_longs", {})),
        "table_maturation": lambda: _table_maturation(context.get("rad_maturation", [])),
        "split_morpho": lambda: _split_morpho(context.get("morpho", {})),
        "split_radio": lambda: _split_radio(context.get("radio", {})),
        "split_autopsie": lambda: _split_autopsie(context),
        "split_fdr": lambda: _split_fdr(context.get("atcd_mat", {})),
        "split_prenatal": lambda: _split_prenatal(context.get("exam_prenataux", {})),
        "split_fixe": lambda: _split_fixe(context.get("macro_fixe", {})),
        "table_genest": lambda: _table_genest(context.get("maceration", {})),
        "genest_retention": lambda: _genest_retention(context.get("maceration", {})),
        "age_mere": _age_mere(context.get("ddn_mere"), context.get("date_deces") or context.get("date_examen")),
    }
