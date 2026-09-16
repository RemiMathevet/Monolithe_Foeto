#!/usr/bin/env python3
# SPDX-License-Identifier: CC-BY-NC-SA-4.0 | Hub Light | Monolithe_Foeto
"""
Fabrique des dossiers fictifs complets en pilotant les modules HTML eux-memes.

generer.py produit une fixture mecanique : tous les champs remplis avec la
meme valeur de controle, pour eprouver l'ingestion et le schema. Ce script-ci
produit autre chose — des cas qui se tiennent cliniquement, contrastes entre
eux, avec des trous comme en ont les vrais dossiers, pour eprouver ce que la
fixture mecanique ne touche pas : les z-scores aux deux bouts de la table, le
compte rendu sur des profils differents, les filtres de la page dossiers.

Deux principes :

  . Les valeurs de masse et de mensuration ne sont pas ecrites en dur. Le
    profil declare un ecart-type vise ; le script demande au module lui-meme
    la moyenne et l'ecart-type de la table au terme du cas, et pose la valeur
    qui tombe la. Un cas reste donc juste apres correction d'une table.

  . Tout passe par les fonctions du module — ecrire(), poserEtat(),
    poserChips(), puis son propre collecter() ou paquet(). Rien n'est fabrique
    a la main : ce qui sort est exactement ce que sortirait la saisie.

    pip install playwright pillow
    playwright install chromium
    python generer_cas.py [--sortie DOSSIER] [--cas 25P9991 …]

Numeros fictifs uniquement, declares dans .githooks/pre-commit.
"""

import argparse
import json
import pathlib
import sys

from playwright.sync_api import sync_playwright

ICI = pathlib.Path(__file__).resolve().parent
DEPOT = ICI.parent.parent
JPG = ICI / "_cliche_de_controle.jpg"

CHEMINS = {
    "administratif":      "admin/administratif.html",
    "examen_clinique":    "Macro/examen_clinique.html",
    "biometrie_clinique": "Macro/biometrie_clinique.html",
    "autopsie":           "Macro/autopsie.html",
    "neuropath":          "Macro/neuropath.html",
    "radio":              "Radio/radio.html",
}
EXPORT = {
    "administratif":      "async () => collecter()",
    "examen_clinique":    "async () => await paquet()",
    "biometrie_clinique": "async () => collecter()",
    "autopsie":           "async () => await paquet()",
    "neuropath":          "async () => await paquet()",
    "radio":              "async () => collecter()",
}


# ══════════════════════════════════════════════════════════════════════════════
#  Les cinq cas
# ══════════════════════════════════════════════════════════════════════════════
#  `z` donne l'ecart-type vise, pas la valeur : le module fournit la moyenne et
#  l'ecart-type de sa propre table au terme du cas. Un organe absent de `z`
#  n'est pas pese — un dossier reel a des trous, et le hub doit les afficher
#  comme tels.

CAS = [

    # ── Terme precoce : la zone de table qu'on vient de corriger ────────────
    {
        "dossier": "25P9991",
        "titre": "IMG 13 SA — hygroma colli, trisomie 21",
        "operateur": "RM",
        "administratif": {
            "type_issue": "IMG", "terme_sa": 13, "terme_j": 2, "sexe": "UNK",
            "voie": "ASPIRATION", "multiple": "false",
            "indication": "Hygroma colli au premier trimestre, caryotype fœtal "
                          "en faveur d'une trisomie 21. Interruption médicale "
                          "de grossesse demandée par le couple.",
            "date_deces": "12/02/2026", "date_reception": "13/02/2026",
            "date_examen": "16/02/2026",
            "service": "Gynécologie-obstétrique", "ville_maternite": "Besançon",
            "mode_conception": "SPONTANEE", "ddg": "12/11/2025",
            "risque_t21": "1/12", "cn": 6.4, "lcc": 62.0,
            "echo_t1": "ANOMALIE",
            "echo_t1_details": "Clarté nucale à 6,4 mm, hygroma colli cloisonné.",
            "autres_examens": "Caryotype sur villosités choriales : 47,XX,+21.",
            "gestite": 2, "parite": 1,
        },
        "biometrie_clinique": {
            "terme_sa": 13, "terme_j": 2, "sexe": "UNK",
            "z": {"masse": -0.4, "vc": -0.3, "vt": -0.2, "pc": 0.1, "pied": -0.5},
        },
        "autopsie": {
            "sa": 13, "saj": 2, "maroun": 0,
            "z": {"cerveau_masse": -0.2, "coeur_masse": 0.3, "foie_masse": -0.1},
            "champs": {
                "situs": ["Solitus"],
                "anasarque": "oui",
                "diaphragme": ["Normal"],
                "art_omb": ["Deux"],
                "gros_vx": ["Concordants"],
            },
            "cliches": 1,
        },
        "examen_clinique": {
            "items": {
                "aspect_general": ("anormal", ["Hydropique"],
                                   "Œdème diffus, prédominant à la nuque."),
                "teguments": ("anormal", ["Œdème"], None),
                "crane": ("normal", [], None),
                "yeux": ("anormal", ["Fentes obliques en haut"], None),
                "nez": ("anormal", ["Racine large"], None),
            },
            "cliches": 2,
        },
        "radio": None,
        "neuropath": None,
    },

    # ── Anomalie du tube neural, terme moyen, non macere ────────────────────
    {
        "dossier": "25P9992",
        "titre": "IMG 22 SA — myéloméningocèle lombo-sacrée",
        "operateur": "RM",
        "administratif": {
            "type_issue": "IMG", "terme_sa": 22, "terme_j": 4, "sexe": "F",
            "voie": "VB", "multiple": "false",
            "indication": "Myéloméningocèle lombo-sacrée et malformation de "
                          "Chiari II dépistées à l'échographie du deuxième "
                          "trimestre.",
            "date_deces": "03/03/2026", "date_reception": "03/03/2026",
            "date_examen": "05/03/2026",
            "service": "Diagnostic prénatal", "ville_maternite": "Besançon",
            "mode_conception": "SPONTANEE", "ddg": "01/10/2025",
            "echo_t1": "NORMALE",
            "echo_t2": "ANOMALIE",
            "echo_t2_details": "Défect rachidien lombo-sacré avec sac "
                               "méningé, ventriculomégalie bilatérale à 14 mm, "
                               "signe du citron et signe de la banane.",
            "autres_examens": "ACPA sur liquide amniotique : sans anomalie.",
            "fdr": [], "gestite": 1, "parite": 0,
        },
        "biometrie_clinique": {
            "terme_sa": 22, "terme_j": 4, "sexe": "F",
            "z": {"masse": -0.3, "vt": 0.1, "vc": 0.0, "pc": -0.4,
                  "pied": 0.2},
            # Au-dela de 20 SA, seul Muller-Brochut couvrait le BIP : posé en clair.
            "brut": {"bip": 52.0, "fo": 68.0, "pt": 165.0, "pa": 155.0},
        },
        "autopsie": {
            "sa": 22, "saj": 4, "maroun": 0,
            "z": {"cerveau_masse": -1.1, "coeur_masse": 0.1, "foie_masse": -0.2,
                  "thymus_masse": -0.3, "rate_masse": 0.0,
                  "poumons_masse": -0.2, "reins_masse": 0.2,
                  "surrenales_masse": -0.1},
            "champs": {
                "situs": ["Solitus"], "anasarque": "non",
                "diaphragme": ["Normal"], "art_omb": ["Deux"],
                "veine_omb": ["Perméable"], "vessie": ["Distendue"],
                "gros_vx": ["Concordants"], "pointe": ["À gauche"],
            },
            "cliches": 2,
        },
        "examen_clinique": {
            "items": {
                "aspect_general": ("normal", [], None),
                "proportions": ("normal", [], None),
                "teguments": ("normal", [], None),
                "crane": ("normal", [], None),
                "fontanelles": ("anormal", ["Fontanelle large"], None),
            },
            "cliches": 2,
        },
        "neuropath": {
            "sa": 22, "saj": 4,
            # Chiari II : fosse postérieure trop petite, hernie des amygdales,
            # ventriculomégalie en amont. L'encéphale reste dans la norme basse.
            "z": {"masse_enc": -0.9, "masse_cerv": -1.7,
                  "DOFD": -0.5, "DOFG": -0.5, "DT": -0.4, "DTC": -2.1},
            "champs": {
                "preleve": "oui",
                "fixation": ["Formol tamponné 10 %"],
                "duree_fixation": 21,
                "etat_reception": ["Intact"],
                "fosse_post": ["Hernie des amygdales cérébelleuses"],
                "prelevement_detail": "Fosse postérieure de petit volume, "
                                      "amygdales cérébelleuses engagées dans "
                                      "le trou occipital.",
                "symetrie": ["Symétrique"],
                "consistance": ["Ferme"],
                "meninges": ["Normales"],
                "gyration": ["Retard de gyration"],
                "willis": ["Normal"],
                "mamillaires": ["Normaux"],
                "colliculi": ["Fusion"],
                "cervelet_aspect": ["Hypoplasie vermienne"],
                "ventricules": ["Dilatation bilatérale"],
                "aqueduc": ["Normal"],
                "cc": ["Normal"],
                "macro_detail": "Aspect compatible avec une malformation de "
                                "Chiari de type II.",
            },
            "cliches": 2,
        },
        "radio": None,
    },

    # ── Anasarque : masse haute, longueurs normales ─────────────────────────
    {
        "dossier": "25P9993",
        "titre": "MFIU 25 SA — anasarque fœto-placentaire",
        "operateur": "RM",
        "administratif": {
            "type_issue": "MFIU", "terme_sa": 25, "terme_j": 0, "sexe": "M",
            "voie": "VB", "multiple": "false",
            "indication": "Mort fœtale in utero découverte devant une "
                          "diminution des mouvements actifs, dans un contexte "
                          "d'anasarque connue depuis 23 SA.",
            "date_deces": "18/01/2026", "date_reception": "19/01/2026",
            "date_examen": "20/01/2026",
            "service": "Maternité", "ville_maternite": "Besançon",
            "mode_conception": "SPONTANEE", "ddg": "28/07/2025",
            "groupe_sanguin": "O", "rhesus": "NEG",
            "echo_t2": "ANOMALIE",
            "echo_t2_details": "Anasarque : épanchement péricardique, ascite, "
                               "œdème sous-cutané. Doppler cérébral en faveur "
                               "d'une anémie fœtale.",
            "autres_examens": "Recherche d'agglutinines irrégulières positive.",
            "gestite": 3, "parite": 2,
        },
        "biometrie_clinique": {
            "terme_sa": 25, "terme_j": 0, "sexe": "M",
            "z": {"masse": 2.4, "vt": 0.2, "vc": 0.1, "pc": 0.3,
                  "pied": 0.0},
            # Périmètre abdominal très au-dessus : c'est l'ascite qu'on mesure.
            "brut": {"pa": 252.0, "pt": 205.0, "bip": 63.0},
        },
        "autopsie": {
            "sa": 25, "saj": 0, "maroun": 1,
            "z": {"cerveau_masse": 0.2, "coeur_masse": 1.9, "foie_masse": 2.6,
                  "rate_masse": 2.9, "thymus_masse": -1.4,
                  "poumons_masse": 0.4, "reins_masse": 1.1,
                  "surrenales_masse": 0.3},
            "champs": {
                "situs": ["Solitus"], "anasarque": "oui",
                "ep_pleural_d": 9, "ep_pleural_g": 8,
                "ep_peritoine": 34, "ep_pericarde": 4,
                "diaphragme": ["Normal"], "art_omb": ["Deux"],
                "veine_omb": ["Perméable"],
                "thymus_aspect": ["Involution de stress"],
                "gros_vx": ["Concordants"], "pointe": ["À gauche"],
            },
            "cliches": 2,
        },
        "examen_clinique": {
            "items": {
                "aspect_general": ("anormal", ["Hydropique", "Macéré"],
                                   "Macération de grade 1 : décollement "
                                   "épidermique limité au dos."),
                "teguments": ("anormal", ["Œdème", "Pâleur"], None),
                "symetrie": ("normal", [], None),
                "proportions": ("normal", [], None),
            },
            "cliches": 2,
        },
        "radio": None,
        "neuropath": None,
    },

    # ── RCIU severe et macere : le cas qui eprouve la stratification Maroun ──
    {
        "dossier": "25P9994",
        "titre": "MFIU 34 SA — RCIU sévère, macération grade 3",
        "operateur": "RM",
        "administratif": {
            "type_issue": "MFIU", "terme_sa": 34, "terme_j": 1, "sexe": "M",
            "voie": "VB", "multiple": "false",
            "indication": "Mort fœtale in utero sur retard de croissance "
                          "intra-utérin sévère avec anomalies du Doppler "
                          "ombilical, dans un contexte de prééclampsie.",
            "date_deces": "05/12/2025", "date_reception": "07/12/2025",
            "date_examen": "08/12/2025",
            "service": "Maternité", "ville_maternite": "Dole",
            "mode_conception": "SPONTANEE", "ddg": "10/04/2025",
            "fdr": ["hta", "tabac"],
            "atcd_medicaux": "Hypertension artérielle gravidique au cours de "
                             "la grossesse précédente.",
            "echo_t3": "ANOMALIE",
            "echo_t3_details": "Estimation de poids fœtal sous le 3e "
                               "percentile, diastole ombilicale nulle.",
            "gestite": 2, "parite": 1,
        },
        "biometrie_clinique": {
            "terme_sa": 34, "terme_j": 1, "sexe": "M",
            "z": {"masse": -2.9, "vt": -1.8, "vc": -1.7, "pc": -1.1,
                  "pied": -1.4},
            # Abdomen effondré, crâne relativement épargné : RCIU asymétrique.
            "brut": {"pa": 243.0, "pt": 258.0, "bip": 82.0},
        },
        "autopsie": {
            "sa": 34, "saj": 1, "maroun": 3,
            "z": {"cerveau_masse": -0.7, "coeur_masse": -1.3,
                  "foie_masse": -2.8, "thymus_masse": -2.4,
                  "rate_masse": -1.9, "poumons_masse": -1.6,
                  "reins_masse": -1.2, "surrenales_masse": -1.5},
            "champs": {
                "situs": ["Solitus"], "anasarque": "non",
                "diaphragme": ["Normal"], "art_omb": ["Deux"],
                "veine_omb": ["Perméable"],
                "thymus_aspect": ["Hypoplasique", "Involution de stress"],
                "gros_vx": ["Concordants"], "pointe": ["À gauche"],
            },
            "cliches": 2,
        },
        "examen_clinique": {
            "items": {
                "aspect_general": ("anormal", ["Macéré", "Émacié"],
                                   "Macération de grade 3 : décollement "
                                   "épidermique étendu, momification des "
                                   "extrémités."),
                "proportions": ("anormal", ["Macrocéphalie relative"],
                                "Épargne céphalique relative."),
                "teguments": ("anormal", ["Desquamation", "Congestion"], None),
                "symetrie": ("normal", [], None),
            },
            "cliches": 2,
        },
        "radio": None,
        "neuropath": None,
    },

    # ── Terme complet, cardiopathie, mort neonatale : le haut de table ──────
    {
        "dossier": "25P9995",
        "titre": "Mort néonatale 39 SA — transposition des gros vaisseaux",
        "operateur": "RM",
        "administratif": {
            "type_issue": "MNN", "terme_sa": 39, "terme_j": 3, "sexe": "F",
            "voie": "CESARIENNE", "multiple": "false",
            "indication": "Décès à H36 de vie d'une transposition des gros "
                          "vaisseaux non dépistée en anténatal, découverte "
                          "devant une cyanose réfractaire.",
            "date_deces": "22/04/2026", "date_reception": "22/04/2026",
            "date_examen": "24/04/2026",
            "service": "Réanimation néonatale", "ville_maternite": "Besançon",
            "mode_conception": "AMP", "amp_type": "ICSI",
            "ddg": "20/07/2025",
            "echo_t1": "NORMALE", "echo_t2": "NORMALE", "echo_t3": "NORMALE",
            "histoire_clinique": "Naissance par césarienne pour anomalie du "
                                 "rythme cardiaque fœtal. Apgar 8/9/10. "
                                 "Cyanose apparue à H4, non corrigée par "
                                 "l'oxygène.",
            "gestite": 1, "parite": 0,
        },
        "biometrie_clinique": {
            "terme_sa": 39, "terme_j": 3, "sexe": "F",
            "z": {"masse": 0.4, "vt": 0.3, "vc": 0.2, "pc": 0.5,
                  "pied": 0.1},
            "brut": {"pt": 331.0, "pa": 318.0, "bip": 93.0, "main": 61.0},
        },
        "autopsie": {
            "sa": 39, "saj": 3, "maroun": 0,
            "z": {"cerveau_masse": 0.3, "coeur_masse": 2.2, "foie_masse": 0.4,
                  "thymus_masse": -0.2, "rate_masse": 0.1,
                  "poumons_masse": 0.6, "reins_masse": 0.2,
                  "surrenales_masse": 0.0},
            "champs": {
                "situs": ["Solitus"], "anasarque": "non",
                "diaphragme": ["Normal"], "art_omb": ["Deux"],
                "veine_omb": ["Cathétérisée"],
                "gros_vx": ["Transposition"], "pointe": ["À gauche"],
                "tsa": ["Normaux"],
                "thymus_aspect": ["Involution de stress"],
            },
            "cliches": 2,
        },
        "examen_clinique": {
            "items": {
                "aspect_general": ("normal", [], None),
                "teguments": ("anormal", ["Cyanose"], None),
                "symetrie": ("normal", [], None),
                "proportions": ("normal", [], None),
                "crane": ("normal", [], None),
            },
            "cliches": 2,
        },
        "radio": None,
        "neuropath": None,
    },
]


# ══════════════════════════════════════════════════════════════════════════════
#  Pilotage
# ══════════════════════════════════════════════════════════════════════════════

# Le module donne la moyenne et l'ecart-type ; on pose la valeur qui tombe a
# l'ecart-type vise. Guihard-Costa d'abord — c'est la table la plus large —
# puis Muller-Brochut, puis Maroun avec la stratification par maceration.
JS_MASSES = r"""
(cible) => {
  const sa = Math.round(parseFloat(document.getElementById("sa").value));
  const g  = parseInt(document.getElementById("maroun").value, 10) || 0;
  const rendu = [];
  ETAPES.forEach(e => e.champs.forEach(c => {
    if (c.t !== "masse" && c.t !== "masse2") return;
    if (!(c.id in cible)) return;
    const z = cible[c.id];
    let t, m = null, sd = null, src = null;
    if (c.gc && (t = getGCOrg(sa)) && t[c.gc]) { m = t[c.gc].m; sd = t[c.gc].sd; src = "GC"; }
    if (m === null && c.mb && (t = getMBOrg(sa)) && t[c.mb]) { m = t[c.mb].m; sd = t[c.mb].sd; src = "MB"; }
    if (m === null && c.ma && (t = getMAOrg(sa))) {
      const k = c.mg === 1 ? c.ma + "_" + getMarounGrade(g)
              : c.mg === 2 ? c.ma + "_" + getMarounGrade23(g) : c.ma;
      if (t[k] && t[k].m != null) { m = t[k].m; sd = t[k].sd; src = "MA"; }
    }
    if (m === null || sd == null) { rendu.push([c.id, null, "hors table"]); return; }
    let v = m + z * sd;
    if (v <= 0) v = m * 0.2;
    v = v >= 10 ? Math.round(v * 10) / 10 : Math.round(v * 100) / 100;
    if (c.t === "masse2") ecrire(c, { d: Math.round(v * 52) / 100, g: Math.round(v * 48) / 100 });
    else                  ecrire(c, v);
    rendu.push([c.id, v, src]);
  }));
  if (typeof majTousZ === "function") majTousZ();
  if (typeof enregistrer === "function") enregistrer();
  return rendu;
}
"""

JS_CHAMPS = r"""
(cible) => {
  let n = 0;
  const inconnus = [], vus = new Set();
  ETAPES.forEach(e => e.champs.forEach(c => {
    if (!(c.id in cible)) return;
    vus.add(c.id);
    // Une valeur de puce absente du vocabulaire du module serait posee sans
    // bruit et le champ resterait vide : on la signale plutot que de la perdre.
    if (c.t === "chips") {
      (cible[c.id] || []).forEach(v => {
        if ((c.v || []).indexOf(v) < 0) inconnus.push(c.id + " : " + v);
      });
    }
    ecrire(c, cible[c.id]);
    n++;
  }));
  Object.keys(cible).forEach(k => { if (!vus.has(k)) inconnus.push("champ absent : " + k); });
  if (typeof enregistrer === "function") enregistrer();
  return [n, inconnus];
}
"""

JS_MESURES = r"""
(cible) => {
  const sa = Math.round(parseFloat(document.getElementById("terme_sa").value));
  const rendu = [];
  TOUTES.forEach(m => {
    if (!(m.k in cible)) return;
    const z = cible[m.k];
    let mu = null, sd = null, fac = 1, src = null, t;
    if (m.gc && (t = gcKey(sa)) && GC[t][m.gc]) { mu = GC[t][m.gc].m; sd = GC[t][m.gc].sd; src = "GC"; }
    if (mu === null && m.mb && (t = mbRow(sa)) && t[m.mb]) { mu = t[m.mb].m; sd = t[m.mb].sd; fac = m.mbd || 1; src = "MB"; }
    if (mu === null && m.ma && (t = maRow(sa)) && t[m.ma]) { mu = t[m.ma].m; sd = t[m.ma].sd; fac = m.mad || 1; src = "MA"; }
    if (mu === null || sd == null) { rendu.push([m.k, null, "hors table"]); return; }
    let v = (mu + z * sd) * fac;
    if (v <= 0) v = mu * fac * 0.2;
    v = v >= 100 ? Math.round(v) : Math.round(v * 10) / 10;
    const el = document.getElementById("v_" + m.k);
    el.value = String(v);
    el.dispatchEvent(new Event("input", { bubbles: true }));
    el.dispatchEvent(new Event("change", { bubbles: true }));
    rendu.push([m.k, v, src]);
  });
  return rendu;
}
"""

# Le module de neuropathologie porte ses propres referentiels et sait deja
# rendre moyenne et ecart-type pour une mesure : on lui demande.
JS_MES_NEURO = r"""
(cible) => {
  const sa = parseFloat(document.getElementById("sa").value);
  const rendu = [];
  ETAPES.forEach(e => e.champs.forEach(c => {
    if (c.t !== "mes" || !(c.id in cible)) return;
    const r = c.ref ? refDe(c.ref, sa) : null;
    if (!r) { rendu.push([c.id, null, "hors table"]); return; }
    let v = r.m + cible[c.id] * r.sd;
    if (v <= 0) v = r.m * 0.2;
    v = v >= 10 ? Math.round(v * 10) / 10 : Math.round(v * 100) / 100;
    ecrire(c, v);
    rendu.push([c.id, v, c.ref]);
  }));
  if (typeof majTousZ === "function") majTousZ();
  if (typeof enregistrer === "function") enregistrer();
  return rendu;
}
"""

# Une mesure sans referentiel au terme du cas — le BIP au-dela de 20 SA, par
# exemple, que seul Muller-Brochut couvre — se pose en clair. C'est le seul
# endroit ou une valeur est ecrite a la main, et c'est assume.
JS_BRUT = r"""
(cible) => {
  let n = 0;
  Object.keys(cible).forEach(k => {
    const el = document.getElementById("v_" + k);
    if (!el) return;
    el.value = String(cible[k]);
    el.dispatchEvent(new Event("input", { bubbles: true }));
    el.dispatchEvent(new Event("change", { bubbles: true }));
    n++;
  });
  return n;
}
"""

JS_ITEMS = r"""
(cible) => {
  let n = 0;
  Object.keys(cible).forEach(id => {
    const [etat, anomalies, precisions] = cible[id];
    if (!document.getElementById("it_" + id)) return;
    poserEtat(id, etat === "anormal" ? "a" : "n");
    if (etat === "anormal") {
      poserChips(id, anomalies || []);
      const tx = document.getElementById("tx_" + id);
      if (tx && precisions) {
        tx.value = precisions;
        tx.dispatchEvent(new Event("input", { bubbles: true }));
      }
    }
    n++;
  });
  if (typeof majTallies === "function") majTallies();
  if (typeof enregistrer === "function") enregistrer();
  return n;
}
"""

JS_ADMIN = r"""
(cible) => {
  const ev = (el, t) => el.dispatchEvent(new Event(t, { bubbles: true }));
  let n = 0, absents = [];
  Object.keys(cible).forEach(k => {
    const v = cible[k];
    if (Array.isArray(v)) {                       // cases a cocher
      v.forEach(opt => {
        const el = document.getElementById("f_" + k + "_" + opt);
        if (el) { el.checked = true; ev(el, "change"); n++; }
      });
      return;
    }
    const el = document.getElementById("f_" + k);
    if (!el) { absents.push(k); return; }
    el.value = String(v);
    ev(el, "input"); ev(el, "change");
    n++;
  });
  return [n, absents];
}
"""


SEXE_BIOM = {"UNK": "I"}


def cliches(page, combien):
    """Ajoute des cliches sur les premiers emplacements de la trame."""
    if not combien:
        return 0
    cles = page.evaluate(
        "n => { try { const L = (typeof ETAPES !== 'undefined' ? ETAPES : ETAGES);"
        " const o = []; L.forEach(e => (e.photos || []).forEach(p => o.push(p.k)));"
        " return o.slice(0, n); } catch (e) { return []; } }", combien)
    for k in cles:
        page.evaluate("k => { slotCible = k; }", k)
        page.set_input_files("#pick", str(JPG))
        page.wait_for_timeout(1100)
    return len(cles)


def armer(page, dossier, operateur):
    page.fill("#dossier", dossier)
    page.dispatch_event("#dossier", "input")
    page.fill("#operateur", operateur)
    page.dispatch_event("#operateur", "input")
    page.wait_for_timeout(400)


def produire(nav, cas, module, sortie):
    profil = cas.get(module)
    if profil is None:
        return None
    src = DEPOT / CHEMINS[module]
    if not src.exists():
        print(f"   !! module introuvable : {src}")
        return None

    page = nav.new_page()
    erreurs = []
    page.on("pageerror", lambda e: erreurs.append(str(e)))
    try:
        page.goto(src.as_uri())
        page.wait_for_timeout(300)
        armer(page, cas["dossier"], cas["operateur"])
        detail = ""

        if module == "administratif":
            n, absents = page.evaluate(JS_ADMIN, profil)
            detail = f"{n} champs"
            if absents:
                detail += f"  INCONNUS={absents}"

        elif module == "biometrie_clinique":
            for k in ("terme_sa", "terme_j"):
                page.fill("#" + k, str(profil[k]))
                page.dispatch_event("#" + k, "input")
            # Les deux modules ne nomment pas le sexe indetermine pareil :
            # « UNK » dans l'administratif, « I » dans la biometrie. A signaler,
            # pas a corriger ici — un module diffuse ne se retouche pas en
            # passant.
            page.select_option("#sexe", SEXE_BIOM.get(profil["sexe"], profil["sexe"]))
            page.wait_for_timeout(300)
            pose = page.evaluate(JS_MESURES, profil.get("z") or {})
            n_brut = page.evaluate(JS_BRUT, profil.get("brut") or {})
            hors = [p[0] for p in pose if p[1] is None]
            detail = f"{len(pose) - len(hors) + n_brut} mesures"
            if hors:
                detail += f"  SANS RÉFÉRENTIEL={hors}"

        elif module in ("autopsie", "neuropath"):
            if "sa" in profil:
                for cle, champ in (("sa", "#sa"), ("saj", "#saj")):
                    page.fill(champ, str(profil[cle]))
                    page.dispatch_event(champ, "input")
                if page.query_selector("#maroun"):
                    page.select_option("#maroun", str(profil.get("maroun", 0)))
                page.wait_for_timeout(300)
            inconnus = []
            if profil.get("champs"):
                _, inconnus = page.evaluate(JS_CHAMPS, profil["champs"])
            js = JS_MASSES if module == "autopsie" else JS_MES_NEURO
            pose = page.evaluate(js, profil.get("z") or {}) if profil.get("z") else []
            hors = [p[0] for p in pose if p[1] is None]
            detail = f"{len(profil.get('champs') or {})} champs, {len(pose) - len(hors)} mesurées"
            if inconnus:
                detail += f"  INCONNUS={inconnus}"
            if hors:
                detail += f"  SANS RÉFÉRENTIEL={hors}"

        elif module == "examen_clinique":
            n = page.evaluate(JS_ITEMS, profil.get("items") or {})
            detail = f"{n} items"

        elif module == "radio":
            detail = "terme seul"

        n_ph = cliches(page, profil.get("cliches", 0))
        page.wait_for_timeout(300)
        paquet = page.evaluate(EXPORT[module])
    except Exception as e:
        print(f"   !! {module} : {e}")
        page.close()
        return None
    page.close()

    nom = f"{paquet['dossier']}_{paquet['module']}.json"
    chemin = sortie / nom
    chemin.write_text(json.dumps(paquet, ensure_ascii=False, indent=1),
                      encoding="utf-8")
    ko = chemin.stat().st_size / 1024
    print(f"   {nom:34s} {ko:8.1f} Ko  {detail}, {n_ph} cliché(s)"
          + (f"   ERREURS={erreurs[:1]}" if erreurs else ""))
    return chemin


def main():
    ap = argparse.ArgumentParser(description=__doc__.splitlines()[1])
    ap.add_argument("--sortie", type=pathlib.Path, default=ICI / "cas",
                    help="dossier de sortie (defaut : exemples/cas/)")
    ap.add_argument("--cas", nargs="*", help="ne produire que ces numeros")
    args = ap.parse_args()
    args.sortie.mkdir(parents=True, exist_ok=True)

    if not JPG.exists():
        from PIL import Image
        im = Image.new("RGB", (1400, 1000), (140, 120, 118))
        for x in range(0, 1400, 40):
            for y in range(0, 1000, 40):
                if (x // 40 + y // 40) % 2 == 0:
                    im.paste((190, 176, 170), (x, y, x + 40, y + 40))
        im.save(JPG, "JPEG", quality=88)

    choisis = [c for c in CAS if not args.cas or c["dossier"] in args.cas]
    if not choisis:
        sys.exit("aucun cas ne correspond")

    with sync_playwright() as p:
        nav = p.chromium.launch()
        for cas in choisis:
            print(f"\n{cas['dossier']} — {cas['titre']}")
            for module in ("administratif", "examen_clinique",
                           "biometrie_clinique", "radio", "autopsie",
                           "neuropath"):
                produire(nav, cas, module, args.sortie)
        nav.close()
    print(f"\nÉcrit dans {args.sortie}")


if __name__ == "__main__":
    main()
