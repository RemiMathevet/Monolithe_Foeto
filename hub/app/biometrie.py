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

Les tables ne sont pas dans ce fichier : `references/extraire_modules.py` les
recopie des modules de saisie (autopsie, biométrie clinique) dans
`references/*.json`, versionnés. Une table se corrige donc dans le module, on
relance l'extraction, et le hub recalcule tous les dossiers avec elle. Sans
ces fichiers, le hub reprend le z des modules et le dit.
"""

import json
from pathlib import Path

SEUIL_ALERTE = 2.0        # au-delà, on le signale
ICI = Path(__file__).resolve().parent
REFERENCES_DEPOT = ICI.parent / "references"   # hub/references, versionné


# ══════════════════════════════════════════════════════════════════════════════
# Chargement des références
# ══════════════════════════════════════════════════════════════════════════════

class References:
    """Les tables recopiées des modules par references/extraire_modules.py.

    On cherche d'abord <racine>/references (la base de travail), puis
    hub/references du dépôt. `dispo` est faux quand rien n'a été trouvé : le
    reste du hub continue, les z affichés viennent alors des modules.
    """

    def __init__(self, racine: Path = None):
        self.autopsie = {}             # {GC, MA, MB, champs}
        self.biometrie_clinique = {}   # {GC, MA, MB, mesures}
        self.sources = {}
        self.erreurs = []
        self.dossier = None
        for d in ([Path(racine) / "references"] if racine else []) + [REFERENCES_DEPOT]:
            if (d / "autopsie.json").is_file() or (d / "biometrie_clinique.json").is_file():
                self.charger(d)
                break

    @property
    def dispo(self):
        return bool(self.autopsie or self.biometrie_clinique)

    def charger(self, d: Path):
        self.dossier = d
        for nom in ("autopsie", "biometrie_clinique"):
            f = d / f"{nom}.json"
            if not f.is_file():
                continue
            try:
                o = json.loads(f.read_text(encoding="utf-8"))
            except (OSError, json.JSONDecodeError) as e:
                self.erreurs.append(f"{f.name} illisible : {e}")
                continue
            setattr(self, nom, o)
            for cle, src in (o.get("sources") or {}).items():
                self.sources[cle] = src


# ══════════════════════════════════════════════════════════════════════════════
# Calcul — la règle des modules (zs() de l'autopsie, ecarts() de la biométrie)
# ══════════════════════════════════════════════════════════════════════════════

def z(valeur, moy, sd):
    """L'écart-type, ou None quand la référence ne permet pas de conclure."""
    if valeur is None or moy is None or sd in (None, 0):
        return None
    try:
        return round((float(valeur) - float(moy)) / float(sd), 2)
    except (TypeError, ValueError):
        return None


def interpreter(v):
    if v is None:
        return None
    if abs(v) <= 1:
        return "dans la norme"
    return "au-dessus" if v > 0 else "au-dessous"


def cle_gc(table, sa):
    """La classe Guihard-Costa (« 23-24 ») qui contient le terme."""
    for k in table or {}:
        bas, haut = (int(x) for x in k.split("-"))
        if bas <= sa <= haut:
            return k
    return None


def rang_ma(table, sa):
    for r in table or []:
        if r.get("s") == sa:
            return r
    return None


def rang_mb(table, sa):
    return (table or {}).get(str(sa)) if 12 <= sa <= 20 else None


def grade_ma(mg, maceration):
    """Suffixe Maroun selon le grade de macération (mg=1 : 01/2/3 ; mg=2 : 01/23)."""
    g = maceration or 0
    if mg == 1:
        return "01" if g <= 1 else "2" if g == 2 else "3"
    if mg == 2:
        return "01" if g <= 1 else "23"
    return None


def _ref(t, cle):
    r = (t or {}).get(cle) if cle else None
    return r if r and r.get("m") is not None else None


def _z3(tables, sa, cles, valeur, maceration=None):
    """{GC, MA, MB} → (z, attendu) pour une valeur, comme le module."""
    gc, ma, mb = tables.get("GC"), tables.get("MA"), tables.get("MB")
    k = cle_gc(gc, sa)
    lignes = {"GC": (gc.get(k) if k else None, cles.get("gc"), 1),
              "MA": (rang_ma(ma, sa), cles.get("ma"), cles.get("mad") or 1),
              "MB": (rang_mb(mb, sa), cles.get("mb"), cles.get("mbd") or 1)}
    if cles.get("mg") and cles.get("ma"):
        lignes["MA"] = (lignes["MA"][0], cles["ma"] + "_" + grade_ma(cles["mg"], maceration), 1)
    out = {}
    for src, (t, cle, div) in lignes.items():
        r = _ref(t, cle)
        if r:
            out[src] = (z(valeur / div, r["m"], r["sd"]), {"moy": r["m"], "sd": r["sd"], "cle": cle})
    return k, out


def _ligne(nom, classe, res):
    r = {"organe": nom, "classe": classe}
    for src in ("GC", "MA", "MB"):
        zz, att = res.get(src, (None, None))
        r["z_" + src.lower()] = zz
        r["attendu_" + src.lower()] = att
    r["alerte"] = any(v is not None and abs(v) >= SEUIL_ALERTE
                      for v in (r["z_gc"], r["z_ma"], r["z_mb"]))
    return r


def calculer(refs: References, sa, maceration, masses, biometries=None):
    """Les z d'un dossier, calculés ici avec les tables des modules.

    `masses` : {champ_id: grammes} pris de la trame d'autopsie.
    `biometries` : {cle: valeur} pris de la biométrie clinique (clés « bio_<cle> »).

    Renvoie {champ: {z_gc, z_ma, z_mb, attendu_*, classe, alerte}}. Un champ
    sans référence au terme ressort avec des z à None : il n'y a pas de table
    à tous les termes, ce n'est pas une erreur.
    """
    out = {}
    if sa is None:
        return out
    sa = int(round(float(sa)))
    a, b = refs.autopsie, refs.biometrie_clinique
    for champ, grammes in (masses or {}).items():
        cles = (a.get("champs") or {}).get(champ)
        if cles is None or grammes is None:
            continue
        k, res = _z3(a, sa, cles, float(grammes), maceration)
        out[champ] = _ligne(champ, k, res)
    for cle, valeur in (biometries or {}).items():
        cles = (b.get("mesures") or {}).get(cle)
        if not cles or valeur is None:
            continue
        k, res = _z3(b, sa, cles, float(valeur))
        if res:
            out["bio_" + cle] = _ligne(cle, k, res)
    return out


def comparer(calcule, du_module, tolerance=0.15):
    """Les divergences entre le z d'ici et celui affiché à la saisie.

    `du_module` : {champ: {gc|GC: z, ma|MA: z, mb|MB: z}} — l'autopsie écrit
    ses sources en minuscules, la biométrie en majuscules. Un écart franc
    signale une table corrigée, un terme rectifié après coup, ou une erreur.
    """
    ecarts = []
    for champ, r in (calcule or {}).items():
        m = (du_module or {}).get(champ) or {}
        for src in ("gc", "ma", "mb"):
            a, b = r.get("z_" + src), m.get(src, m.get(src.upper()))
            if a is None or b is None:
                continue
            if abs(a - b) > tolerance:
                ecarts.append({"champ": champ, "reference": src,
                               "serveur": a, "module": b,
                               "ecart": round(abs(a - b), 2)})
    return ecarts
