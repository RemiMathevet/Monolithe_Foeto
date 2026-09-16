#!/usr/bin/env python3
# SPDX-License-Identifier: CC-BY-NC-SA-4.0 | Hub Light | Monolithe_Foeto
"""
Écarts-types des masses d'organes et des biométries, calculés ici.

Le module de saisie calcule déjà ses z en salle — c'est ce qui permet de
remesurer avant que le corps reparte, et cela n'a pas vocation à disparaître.
Mais le z qui fait foi est celui d'ici, pour une raison simple : une table de
référence se corrige, et un z gelé dans un JSON de 2026 ne bénéficiera jamais
de la correction. Le z du module reste en base, horodaté : il dit ce qui était
affiché à la saisie, et un écart entre les deux est un signal à regarder.

Les tables ne sont pas dans ce fichier. Elles vivent dans `references/*.json`
et sont absentes du dépôt : ce sont des transcriptions d'articles publiés, et
leur diffusion se décide ailleurs que dans un module de calcul. Sans elles, ce
module se contente de reprendre le z du module de saisie et le dit — le hub
n'est jamais bloqué faute de références, il est seulement moins bon.

Voir `references/LISEZMOI.md` pour le format attendu, et
`references/importer_luminarium.py` pour les extraire d'une copie de
FoetoPath Luminarium.
"""

import json
import math
from pathlib import Path

# ── Ce que la trame d'autopsie appelle une masse, et l'organe correspondant
#    dans les tables. Un champ absent d'ici n'est simplement pas pesé contre
#    une référence ; il reste affiché avec sa valeur.
ORGANES = {
    "thymus_masse":     "thymus",
    "coeur_masse":      "coeur",
    "poumons_masse":    "poumons",
    "foie_masse":       "foie",
    "pancreas_masse":   "pancreas",
    "rate_masse":       "rate",
    "surrenales_masse": "surrenales",
    "reins_masse":      "reins",
    "cerveau_masse":    "cerveau",
}

# Maroun nomme les organes en anglais, et stratifie certains d'entre eux par
# grade de macération : la clé porte alors le grade (`liver 0 1`, `liver 2`).
# Le cœur et le cerveau n'ont pas de variante — la macération ne les fait pas
# varier de la même façon. Le pancréas n'est pas dans la table.
MAROUN_NOMS = {
    "thymus":     "thymus",
    "coeur":      "heart",
    "poumons":    "lungs",
    "foie":       "liver",
    "rate":       "spleen",
    "reins":      "kidneys",
    "surrenales": "adrenals",
    "cerveau":    "brain",
}

SEUIL_ALERTE = 2.0        # au-delà, on le signale


# ══════════════════════════════════════════════════════════════════════════════
# Chargement des références
# ══════════════════════════════════════════════════════════════════════════════

class References:
    """Les tables disponibles, ou l'absence de tables.

    `dispo` est faux quand rien n'a été trouvé : tout le reste du hub continue
    de fonctionner, les z affichés viennent alors des modules et sont marqués
    comme tels.
    """

    def __init__(self, racine: Path = None):
        self.organes = {}        # {"13-14": {"coeur": {"moy":.., "sd":..}}}
        self.biometries = {}     # {"13-14": {"masse": {"moy":.., "sd":..}}}
        self.maroun = {}         # {"24": {"Mean": {...}, "SD": {...}}}
        self.sources = {}
        self.erreurs = []
        if racine:
            self.charger(racine)

    @property
    def dispo(self):
        return bool(self.organes or self.biometries or self.maroun)

    def charger(self, racine: Path):
        d = Path(racine) / "references"
        if not d.is_dir():
            return
        for nom, attribut in (("guihard_costa", None), ("maroun", "maroun")):
            f = d / f"{nom}.json"
            if not f.is_file():
                continue
            try:
                o = json.loads(f.read_text(encoding="utf-8"))
            except (OSError, json.JSONDecodeError) as e:
                self.erreurs.append(f"{f.name} illisible : {e}")
                continue
            self.sources[nom] = o.get("source") or nom
            if attribut == "maroun":
                self.maroun = {str(k): v for k, v in (o.get("par_sa") or {}).items()}
            else:
                self.organes = o.get("organes") or {}
                self.biometries = o.get("biometries") or {}


# ══════════════════════════════════════════════════════════════════════════════
# Calcul
# ══════════════════════════════════════════════════════════════════════════════

def z(valeur, moy, sd):
    """L'écart-type, ou None quand la référence ne permet pas de conclure."""
    if valeur is None or moy is None or sd in (None, 0):
        return None
    try:
        return round((float(valeur) - float(moy)) / float(sd), 2)
    except (TypeError, ValueError):
        return None


def classe_gc(sa):
    """Guihard-Costa stratifie par classes de deux semaines, à partir de 13 SA."""
    if sa is None or sa < 13:
        return None
    bas = sa if sa % 2 else sa - 1
    return f"{bas}-{bas + 1}"


def interpreter(v):
    if v is None:
        return None
    if abs(v) <= 1:
        return "dans la norme"
    return "au-dessus" if v > 0 else "au-dessous"


def _maroun_cle(organe, maceration):
    """Les clés Maroun à essayer pour un organe, du plus précis au plus large.

    On cherche d'abord celle qui couvre exactement le grade de macération
    observé, puis les regroupements, puis la clé nue pour les organes que la
    table ne stratifie pas.
    """
    nom = MAROUN_NOMS.get(organe, organe)
    g = maceration if maceration is not None else 0
    if g <= 1:
        variantes = [f"{nom} 0 1", f"{nom} 0 1 2 3"]
    elif g == 2:
        variantes = [f"{nom} 2", f"{nom} 2 3"]
    else:
        variantes = [f"{nom} 3", f"{nom} 2 3"]
    return variantes + [nom]


def calculer(refs: References, sa, maceration, masses, biometries=None):
    """Les z d'un dossier, calculés ici.

    `masses` : {champ_id: grammes} pris de la trame d'autopsie.
    `biometries` : {cle: valeur} pris de la biométrie clinique.

    Renvoie {champ_id: {z_gc, z_ma, attendu_gc, attendu_ma, classe, alerte}}.
    Un champ sans référence utilisable ressort avec des z à None : c'est une
    information, pas une erreur — il n'y a pas de table à tous les termes.
    """
    out = {}
    cl = classe_gc(sa)
    tgc = refs.organes.get(cl, {}) if cl else {}
    tma = refs.maroun.get(str(sa), {}) if sa is not None else {}
    moy_ma, sd_ma = (tma.get("Mean") or {}), (tma.get("SD") or {})

    for champ, grammes in (masses or {}).items():
        organe = ORGANES.get(champ)
        if organe is None:
            continue
        r = {"organe": organe, "classe": cl, "z_gc": None, "z_ma": None,
             "attendu_gc": None, "attendu_ma": None}
        ref = tgc.get(organe)
        if ref:
            r["z_gc"] = z(grammes, ref.get("moy"), ref.get("sd"))
            r["attendu_gc"] = {"moy": ref.get("moy"), "sd": ref.get("sd")}
        for cle in _maroun_cle(organe, maceration):
            if cle in moy_ma and moy_ma[cle] is not None:
                r["z_ma"] = z(grammes, moy_ma[cle], sd_ma.get(cle))
                r["attendu_ma"] = {"moy": moy_ma[cle], "sd": sd_ma.get(cle),
                                   "cle": cle}
                break
        fort = [v for v in (r["z_gc"], r["z_ma"]) if v is not None and abs(v) >= SEUIL_ALERTE]
        r["alerte"] = bool(fort)
        out[champ] = r

    tbio = refs.biometries.get(cl, {}) if cl else {}
    for cle, valeur in (biometries or {}).items():
        ref = tbio.get(cle)
        if not ref:
            continue
        v = z(valeur, ref.get("moy"), ref.get("sd"))
        out["bio_" + cle] = {"organe": cle, "classe": cl, "z_gc": v, "z_ma": None,
                             "attendu_gc": {"moy": ref.get("moy"), "sd": ref.get("sd")},
                             "attendu_ma": None,
                             "alerte": v is not None and abs(v) >= SEUIL_ALERTE}
    return out


def comparer(calcule, du_module, tolerance=0.15):
    """Les divergences entre le z d'ici et celui affiché à la saisie.

    Un écart franc signale soit une table qui a changé, soit un terme corrigé
    après coup, soit une erreur. Dans les trois cas il faut le savoir plutôt
    que de choisir silencieusement.
    """
    ecarts = []
    for champ, r in (calcule or {}).items():
        m = (du_module or {}).get(champ) or {}
        for cle_ici, cle_la in (("z_gc", "gc"), ("z_ma", "ma")):
            a, b = r.get(cle_ici), m.get(cle_la)
            if a is None or b is None:
                continue
            if abs(a - b) > tolerance:
                ecarts.append({"champ": champ, "reference": cle_la,
                               "serveur": a, "module": b,
                               "ecart": round(abs(a - b), 2)})
    return ecarts
