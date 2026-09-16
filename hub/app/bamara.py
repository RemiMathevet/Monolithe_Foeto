#!/usr/bin/env python3
# SPDX-License-Identifier: CC-BY-NC-SA-4.0 | Hub Light | Monolithe_Foeto
"""
Préparation des dossiers pour BaMaRa.

Ce fichier ne parle pas à BaMaRa. Il ne connaît ni son API, ni ses jetons, ni
son calendrier : il prépare, et c'est tout. Deux choses, donc :

  · dire, dossier par dossier, ce qui manque pour qu'un envoi soit possible —
    c'est le travail utile, parce qu'un champ absent se voit ici en une
    seconde et se rattrape dans le module, alors qu'il coûte un aller-retour
    s'il est découvert au moment de l'envoi ;

  · produire, pour un dossier prêt, le document dans la forme du modèle SDM —
    les blocs bam_identity, bam_medicare, bam_encounter, bam_pregnancy_end,
    bam_antenatal, bam_condition et les descriptions cliniques.

Le modèle suivi est celui de `bamara_schema.sql` de MiniHub, lui-même tiré du
SDM-MR v2.17. Les constantes de site vivent dans `bamara.json`, à côté de la
base : elles sont propres à l'établissement et n'ont rien à faire dans le
dépôt.

Ce qui n'est encore collecté nulle part est signalé comme tel plutôt que
deviné. Un dossier qui part avec un statut diagnostique inventé est pire
qu'un dossier qui ne part pas.
"""

import json
from pathlib import Path

ICI = Path(__file__).resolve().parent

# Les constantes de l'établissement. Sans elles, aucun envoi n'est possible :
# BaMaRa refuse un document qui ne dit pas d'où il vient.
CONFIG_DEFAUT = {
    "site_code": "",
    "site_label": "",
    "site_id": None,
    "hospital_code": "",
    "location_finess": "",
    "source_id": "AUTONOMOUS",
    "context": "A",
    "context_precision": "Examen fœto-placentaire",
    "objectives": "",
    "residence_country_code": "FR",
}


def config(racine: Path = None):
    f = (racine or ICI.parent) / "bamara.json"     # à la racine du hub, avec les données
    o = dict(CONFIG_DEFAUT)
    if f.is_file():
        try:
            o.update(json.loads(f.read_text(encoding="utf-8")))
        except (OSError, json.JSONDecodeError):
            pass
    return o


def ecrire_config(o: dict, racine: Path = None):
    f = (racine or ICI.parent) / "bamara.json"
    garde = {k: o.get(k, v) for k, v in CONFIG_DEFAUT.items()}
    f.write_text(json.dumps(garde, ensure_ascii=False, indent=2) + "\n",
                 encoding="utf-8")
    return garde


# ══════════════════════════════════════════════════════════════════════════════
#  Ce que BaMaRa demande
# ══════════════════════════════════════════════════════════════════════════════
#  `source` dit où le hub va chercher la valeur, en clair, pour que la ligne
#  d'un tableau de manques dise aussi où aller la saisir. `bloquant` distingue
#  ce qui empêche l'envoi de ce qui l'appauvrit seulement.

REQUIS = [
    # (clé, bloc, libellé, source lisible, bloquant)
    ("gender",            "identity",      "Sexe",
     "administratif · issue", True),
    ("pregnancy_date_year", "identity",      "Début de grossesse (DDG)",
     "administratif · grossesse en cours", True),
    ("mother_name",       "identity",      "Nom de naissance de la mère",
     "administratif · identité", True),
    ("mother_given_name", "identity",      "Prénom de la mère",
     "administratif · identité", True),
    ("inclusion_date_year", "medicare",      "Date de réception",
     "administratif · circuit", True),
    ("site_code",         "medicare",      "Code du site",
     "réglages BaMaRa de ce hub", True),
    ("encounter_date_year", "encounter",     "Date de l'examen",
     "administratif · circuit", True),
    ("birth",             "pregnancy_end", "Issue de grossesse",
     "administratif · issue", True),
    ("term_week",         "pregnancy_end", "Terme en SA",
     "administratif · issue", True),
    ("death_date_year",   "pregnancy_end", "Date du décès",
     "administratif · circuit", True),
    ("diagnostic_status", "condition",     "Statut diagnostique",
     "collecté nulle part — à saisir", True),
    ("ins",               "identity",      "INS",
     "administratif · identité", False),
    ("ipp",               "identity",      "IPP mère",
     "administratif · identité", False),
    ("care_provider_rpps", "medicare",     "RPPS du médecin",
     "administratif · circuit", False),
    ("inbreeding",        "identity",      "Consanguinité",
     "administratif · antécédents", False),
    ("weight",            "antenatal",     "Masse fœtale",
     "biométrie clinique · balance", False),
    ("height",            "antenatal",     "Taille (vertex-talon)",
     "biométrie clinique · ruban", False),
    ("head_circumference", "antenatal",    "Périmètre crânien",
     "biométrie clinique · ruban", False),
    ("description_code",  "condition",     "Code Orphanet du diagnostic",
     "collecté nulle part — à saisir", False),
    ("hpo_terms",         "condition",  "Descriptions cliniques (HPO)",
     "radiologie · termes HPO", False),
]


# ══════════════════════════════════════════════════════════════════════════════
#  Transformations
# ══════════════════════════════════════════════════════════════════════════════

def date_bamara(prefixe, iso, precision=None):
    """« 2026-03-15 » → {<prefixe>_year, _month, _day, _mask}.

    Les composantes sont posées à plat, sous le nom du champ, parce que c'est
    ainsi que le schéma les nomme et que les deux consommateurs les lisent :
    `id.pregnancy_date_year` dans la feuille d'export, `identity.pregnancy_date_year`
    dans le script de pré-remplissage. Une date rendue en objet imbriqué ne
    casse rien visiblement — elle laisse simplement tous ces champs vides.

    Le masque de BaMaRa n'est documenté que pour une date complète, où il vaut
    zéro. Pour une date partielle, on rend les composantes connues et on laisse
    le masque à None : mieux vaut un champ vide qu'un code inventé, que
    personne ne saurait relire.
    """
    o = {prefixe + "_year": None, prefixe + "_month": None,
         prefixe + "_day": None, prefixe + "_mask": None}
    if not iso:
        return o
    p = str(iso).split("-")
    if p[0]:
        o[prefixe + "_year"] = int(p[0])
    if len(p) > 1 and p[1]:
        o[prefixe + "_month"] = int(p[1])
    if len(p) > 2 and p[2]:
        o[prefixe + "_day"] = int(p[2])
    if o[prefixe + "_day"] is not None and o[prefixe + "_month"] is not None \
       and precision in (None, "jour"):
        o[prefixe + "_mask"] = 0
    return o


def sexe_bamara(v):
    v = (v or "").strip().upper()
    if v in ("M", "MASCULIN", "GARCON"):
        return "M"
    if v in ("F", "FEMININ", "FILLE"):
        return "F"
    return "UNK"


def booleen(v):
    return None if v is None else bool(v)


def _decede(a):
    """« deceased » pour BaMaRa : une date de décès le dit, sinon l'issue.

    Ne pas le déduire de `birth` : une mort néonatale est bien née vivante
    (birth = true) et bien décédée. Une naissance vivante sans date de décès
    est le seul cas « non décédé » ; une issue inconnue laisse la case vide
    plutôt que de deviner.
    """
    if a.get("date_deces"):
        return True
    issue = a.get("type_issue")
    if issue in ("IMG", "ISG", "MFIU", "MPN", "MNN"):
        return True
    if issue == "NAISSANCE_VIVANTE":
        return False
    return None


def _oui_non_inconnu(v):
    """Consanguinité : BaMaRa veut « true », « false » ou « UNK », en texte."""
    if v in (None, "", "UNK"):
        return "UNK"
    return "true" if v in (1, "1", True, "true", "oui") else "false"


# ══════════════════════════════════════════════════════════════════════════════
#  Préparation d'un dossier
# ══════════════════════════════════════════════════════════════════════════════

# Les issues que le module sait traduire pour BaMaRa. Les autres — IVG, fausse
# couche, grossesse extra-utérine — ne sont pas des situations que le registre
# des maladies rares attend : un dossier qui en relève n'est pas « incomplet »,
# il est hors périmètre, et le dire évite de le poursuivre indéfiniment.
ISSUES_DECLARABLES = {"IMG", "ISG", "MFIU", "MPN", "MNN", "NAISSANCE_VIVANTE"}


def _admin(cx, numero):
    return cx.execute("""SELECT a.* FROM admin_dossier a
                         JOIN saisies s ON s.id = a.saisie_id AND s.courant = 1
                         WHERE a.dossier = ?""", (numero,)).fetchone()


def _mesures(cx, numero):
    return {r["cle"]: r["valeur"] for r in cx.execute(
        """SELECT m.cle, m.valeur FROM biometrie_clinique_mesures m
           JOIN saisies s ON s.id = m.saisie_id AND s.courant = 1
           WHERE m.dossier = ?""", (numero,))}


def _maceration(cx, numero):
    r = cx.execute("""SELECT a.maceration_maroun m FROM autopsie a
                      JOIN saisies s ON s.id = a.saisie_id AND s.courant = 1
                      WHERE a.dossier = ?""", (numero,)).fetchone()
    return r["m"] if r else None


def _hpo(cx, numero):
    return [{"code": r["code"], "label": r["term_fr"], "ref": "HPO"}
            for r in cx.execute(
                """SELECT h.code, h.term_fr FROM radio_hpo h
                   JOIN saisies s ON s.id = h.saisie_id AND s.courant = 1
                   WHERE h.dossier = ?""", (numero,))]


def preparer(cx, numero, cfg=None):
    """Le document BaMaRa d'un dossier, et la liste de ce qui lui manque."""
    cfg = cfg or config()
    a = _admin(cx, numero)
    if a is None:
        return None, [{"cle": "administratif", "libelle": "Module administratif",
                       "source": "aucune saisie administrative pour ce dossier",
                       "bloquant": True}]
    a = dict(a)
    mes = _mesures(cx, numero)
    hpo = _hpo(cx, numero)

    mm_cm = lambda v: round(v / 10.0, 1) if v is not None else None
    mac = _maceration(cx, numero)

    # Les blocs portent le nom que leur donnent les deux consommateurs du
    # dépôt — `bam.identity`, `identity.mother_name` — et non celui des tables
    # SQL. C'est le même modèle, nommé du côté de qui le lit.
    identity = {
        "opposition": booleen(a.get("opposition")),
        "ins": a.get("ins"),
        "ipp": a.get("ipp"),
        "ipp_fetus": a.get("ipp_fetus"),
        "gender": sexe_bamara(a.get("sexe")),
        "is_fetus": True,
        "has_given_consent": True,
        "mother_name": (a.get("nom_naiss") or "").upper().strip() or None,
        "mother_used_name": a.get("nom_mere"),
        "mother_given_name": a.get("prenom_mere"),
        "is_multiple_pregnancy": booleen(a.get("multiple")),
        "inbreeding": _oui_non_inconnu(a.get("consanguinite")),
        "deceased": _decede(a),
        "residence_city": a.get("ville_maternite"),
        "residence_country_code": cfg.get("residence_country_code") or "FR",
        "medecin_traitant_rpps": a.get("medecin_rpps"),
        "medecin_traitant_name": a.get("medecin"),
    }
    identity.update(date_bamara("pregnancy_date", a.get("ddg"), a.get("ddg_precision")))
    identity.update(date_bamara("death_date", a.get("date_deces"),
                                a.get("date_deces_precision")))

    medicare = {
        "care_provider_rpps": a.get("medecin_rpps"),
        "care_provider_name": a.get("medecin"),
        "care_provider_given_name": None,
        "sent_by": a.get("service"),
        "site_code": cfg.get("site_code") or None,
        "site_label": cfg.get("site_label") or None,
        "site_id": cfg.get("site_id"),
        "is_label": True,
        "source_id": cfg.get("source_id") or "AUTONOMOUS",
    }
    medicare.update(date_bamara("inclusion_date", a.get("date_reception"),
                                a.get("date_reception_precision")))

    encounter = {
        "context": cfg.get("context") or "A",
        "context_precision": cfg.get("context_precision"),
        "objectives": cfg.get("objectives") or None,
        "location_at_hospital": True,
        "location_finess": cfg.get("location_finess") or None,
        "source_id": cfg.get("source_id") or "AUTONOMOUS",
    }
    encounter.update(date_bamara("encounter_date", a.get("date_examen"),
                                 a.get("date_examen_precision")))

    pregnancy_end = {
        "birth": booleen(a.get("bamara_birth")),
        "termination_type": a.get("bamara_termination_type"),
        "stp_type": a.get("bamara_stp_type"),
        "term_week": a.get("terme_sa"),
        "is_foetopathology_done": True,
    }
    pregnancy_end.update(date_bamara("death_date", a.get("date_deces"),
                                     a.get("date_deces_precision")))

    doc = {
        "identity": identity,
        "medicare": medicare,
        "encounter": encounter,
        "pregnancy_end": pregnancy_end,
        "antenatal": {
            "amp": (a.get("mode_conception") == "AMP") if a.get("mode_conception") else None,
            "term": a.get("terme_sa"),
            "weight": int(mes["masse"]) if mes.get("masse") is not None else None,
            "height": mm_cm(mes.get("vt")),
            "head_circumference": mm_cm(mes.get("pc")),
        },
        "condition": {
            "diagnostic_status": None,          # jamais collecté — voir REQUIS
            "early_diagnosis_status": "PRN",
            "description_code": None,
            "description_label": None,
            "site_diag_code": None,
            "site_diag_label": None,
            "is_complex_non_rare": False,
            "complex_code": None,
            "complex_label": None,
            "heredity": None,
            "comment": a.get("indication"),
            "source_id": cfg.get("source_id") or "AUTONOMOUS",
        },
        # Les termes HPO sont à la racine et non dans `condition` : c'est là que
        # la feuille d'export les compte, et le dépôt les envoie séparément.
        "hpo_terms": hpo,
        # Ce que BaMaRa ne demande pas mais que la feuille imprime pour le
        # fœtopathologiste qui saisit : de quoi se relire sans rouvrir le hub.
        "foeto_details": {
            "grade_maceration": mac,
            "mode_expulsion": a.get("voie"),
            "indication_img": (a.get("indication")
                               if (a.get("type_issue") or "") in ("IMG", "ISG") else None),
            "date_decision_cpdpn": None,        # collecté nulle part
            "modalite": None,                   # collecté nulle part
        },
        "hub_case": {
            "hub_case_number": numero,
            "ddn_mere": a.get("ddn_mere"),
            "type_prelevement": None,           # collecté nulle part
            "indication_examen": a.get("indication"),
            "contexte_clinique": a.get("contexte_clinique"),
            "service_demandeur": a.get("service"),
            "ville_maternite": a.get("ville_maternite"),
            "terme_jours": a.get("terme_j"),
        },
    }

    # Un champ « présent » est un champ que BaMaRa accepterait tel quel. Une
    # date sans année, un site vide, une liste vide : ce n'est pas présent.
    BLOCS = ("identity", "medicare", "encounter", "pregnancy_end",
             "antenatal", "condition")

    def valeur(cle):
        for bloc in BLOCS:
            if cle in doc[bloc]:
                return doc[bloc][cle]
        return doc.get(cle)

    declarable = (a.get("type_issue") or "") in ISSUES_DECLARABLES
    doc["hub_case"]["declarable"] = declarable
    doc["hub_case"]["type_issue"] = a.get("type_issue")

    manques = []
    for cle, bloc, libelle, source, bloquant in REQUIS:
        v = valeur(cle)
        vide = v is None or v == "" or v == []
        if cle == "gender":
            # « UNK » est une réponse pour BaMaRa, pas une absence : à 13 SA
            # le sexe est souvent indéterminable, et le dire est correct.
            vide = not (a.get("sexe") or "").strip()
        if cle == "inbreeding":
            vide = v == "UNK"     # accepté par BaMaRa, mais n'apprend rien
        if cle == "birth":
            vide = doc["pregnancy_end"]["birth"] is None
        if cle == "death_date_year" and a.get("type_issue") == "NAISSANCE_VIVANTE":
            vide = False          # né vivant, non décédé : pas de date de décès attendue
            # (une mort néonatale a aussi birth = true, mais sa date de décès
            #  reste requise — d'où le test sur l'issue et non sur birth)
        if vide:
            manques.append({"cle": cle, "bloc": bloc, "libelle": libelle,
                            "source": source, "bloquant": bloquant})
    return doc, manques


def audit(cx, cfg=None):
    """Un état d'avancement par dossier, du plus proche du départ au plus loin."""
    cfg = cfg or config()
    out = []
    for r in cx.execute("SELECT numero, statut FROM dossiers ORDER BY numero"):
        doc, manques = preparer(cx, r["numero"], cfg)
        bloquants = [m for m in manques if m["bloquant"]]
        declarable = bool(doc and doc["hub_case"].get("declarable"))
        out.append({"dossier": r["numero"], "statut": r["statut"],
                    "declarable": declarable,
                    "type_issue": doc["hub_case"].get("type_issue") if doc else None,
                    "pret": declarable and not bloquants,
                    "bloquants": [] if not declarable else bloquants,
                    "incomplets": [] if not declarable else
                                  [m for m in manques if not m["bloquant"]]})
    # D'abord ceux qu'on peut envoyer, puis les plus proches de l'être, et en
    # dernier ceux qui ne concernent pas le registre.
    out.sort(key=lambda x: (not x["declarable"], len(x["bloquants"]), x["dossier"]))
    return out
