#!/usr/bin/env python3
# SPDX-License-Identifier: CC-BY-NC-SA-4.0 | Hub Light | Monolithe_Foeto
"""
Vérifie les tables de référence embarquées dans les modules de saisie.

    python outils/verifier_tables.py
    python outils/verifier_tables.py --corriger

Chaque module de salle embarque sa propre copie des tables — il faut bien,
puisqu'il doit calculer ses écarts-types hors réseau. Mais une copie dérive.
Ce script compare ce que chaque module embarque aux tables du calculateur
unifié du dépôt — ou, à défaut, à `references/*.json` — et dit exactement où
ça diverge.

Six jeux sont couverts, dans les deux sens :

    Maroun 2017          organes (MA_ORG)      biométrie (MA)
    Guihard-Costa 2002   organes (GC_ORG)      mensurations (GC)
    Muller-Brochut 2018  organes (MB_ORG)      biométrie (MB)

Avec `--corriger`, il écrit dans `outils/corrections/` le bloc JavaScript
corrigé, dans la forme exacte du module, prêt à coller. Il ne modifie aucun
module : remplacer une table dans un document diffusé demande d'incrémenter
son `module_version`, et cette décision-là n'est pas celle d'un script.

Ce que ce script ne peut pas faire : dire laquelle des deux versions est la
bonne — sauf sur un point, la continuité des séries (voir `continuite`). Pour
le reste, la confrontation à l'article publié reste un travail humain.
"""

import argparse
import json
import re
import sys
from collections import Counter
from pathlib import Path

ICI = Path(__file__).resolve().parent
HUB = ICI.parent
DEPOT = HUB.parent

SEUIL_GROS_ECART = 0.15      # au-delà, ce n'est plus un arrondi


# ══════════════════════════════════════════════════════════════════════════════
# Lecture des tables embarquées
# ══════════════════════════════════════════════════════════════════════════════

def bloc_accolades(texte: str, depart: int) -> str:
    """Le littéral qui commence à `depart`, accolades équilibrées.

    Une expression régulière ne suffit pas : ces tables imbriquent des objets
    et contiennent des accolades dans des chaînes de clés.
    """
    prof, k = 0, depart
    while k < len(texte):
        if texte[k] == "{":
            prof += 1
        elif texte[k] == "}":
            prof -= 1
            if prof == 0:
                return texte[depart:k + 1]
        k += 1
    raise ValueError("littéral non refermé")


PAIRE = re.compile(r"([A-Za-z_0-9]+)\s*:\s*\{\s*m\s*:\s*([\d.]+|null)\s*,"
                   r"\s*sd?\s*:\s*([\d.]+|null)\s*\}")


def _n(v):
    return None if v in ("null", None) else float(v)


def _paires(bloc):
    return {a: (_n(x), _n(y)) for a, x, y in PAIRE.findall(bloc)}


def lire_liste(texte: str, ancre: str):
    """Une table écrite en liste : `[ {s:12, organe:{m,sd}}, … ]`.

    C'est la forme des tables Maroun dans les modules, où le terme est une
    clé comme une autre à l'intérieur de l'objet.
    """
    i = texte.find(ancre)
    if i < 0:
        return {}
    bloc = texte[i:i + texte[i:].index("\n];")]
    out = {}
    for m in re.finditer(r"\{s:(\d+),", bloc):
        out[int(m.group(1))] = _paires(bloc_accolades(bloc, m.start()))
    return out


def lire_dict(texte: str, ancre: str, classes: bool = False):
    """Une table écrite en objet : `{ 12:{…}, 13:{…} }` ou `{ "13-14":{…} }`."""
    i = texte.find(ancre)
    if i < 0:
        return {}
    bloc = texte[i:i + texte[i:].index("\n};")]
    motif = r'"(\d+-\d+)"\s*:\s*\{' if classes else r'\n\s*(\d+)\s*:\s*\{'
    out = {}
    for m in re.finditer(motif, bloc):
        cle = m.group(1) if classes else int(m.group(1))
        out[cle] = _paires(bloc_accolades(bloc, m.end() - 1))
    return out


def lire_ma_org(texte: str):
    """MA_ORG d'un module. Conservé : d'autres outils l'appellent par ce nom."""
    return lire_liste(texte, "var MA_ORG")


def lire_gc_org(texte: str):
    """GC_ORG d'un module ou GC_O du calculateur."""
    for nom in ("var GC_ORG", "const GC_O"):
        if nom in texte:
            return lire_dict(texte, nom, classes=True)
    return {}


# ── Les références, côté serveur ──────────────────────────────────────────────
# Les modules nomment quelques organes autrement ; on aligne ici plutôt que de
# toucher aux fichiers, parce que ce sont les modules qui circulent.
NOMS_MAROUN = {
    "liver_01": "liver 0 1", "liver_2": "liver 2", "liver_3": "liver 3",
    "lungs_01": "lungs 0 1", "lungs_23": "lungs 2 3",
    "thymus_01": "thymus 0 1", "thymus_2": "thymus 2", "thymus_3": "thymus 3",
    "spleen_01": "spleen 0 1", "spleen_23": "spleen 2 3",
    "kidneys_01": "kidneys 0 1", "kidneys_23": "kidneys 2 3",
    "adrenals_01": "adrenals 0 1", "adrenals_23": "adrenals 2 3",
    "heart": "heart", "brain": "brain",
}
# Le module de biométrie abrège : B pour le corps, F pour le fémur, etc.
NOMS_MAROUN_BIO = {"B": "Body", "F": "FL", "C": "CR", "H": "CH", "D": "HDC"}
NOMS_GC = {"spleen": "rate"}


def lire_calculateur(f: Path):
    """Les tables du calculateur unifié, qui vit dans le dépôt.

    C'est la référence naturelle : elle est versionnée avec les modules, sous
    la même licence, et c'est le document que l'on tient à jour. Les fichiers
    de `references/` ne servent que si le calculateur est absent.

    Renvoie (maroun, guihard_costa_organes) pour les appelants historiques ;
    le dictionnaire complet passe par `toutes_references`.
    """
    t = toutes_references(f)
    return t.get("MAROUN", {}), t.get("GC_O", {})


def toutes_references(f: Path):
    """Les six tables du calculateur, indexées par leur nom de référence."""
    if not f.is_file():
        return {}
    texte = f.read_text(encoding="utf-8", errors="replace")
    moy = lire_valeurs_simples(texte, "const MAR_M")
    sd = lire_valeurs_simples(texte, "const MAR_S")
    maroun = {sa: {c: (moy[sa].get(c), sd.get(sa, {}).get(c))
                   for c in set(moy[sa]) | set(sd.get(sa, {}))} for sa in moy}
    return {
        "MAROUN": maroun,
        "GC_O": lire_dict(texte, "const GC_O", classes=True),
        "GC_M": lire_dict(texte, "const GC_M", classes=True),
        "MB_O": lire_dict(texte, "const MB_O"),
        "MB_B": lire_dict(texte, "const MB_B"),
    }


def lire_valeurs_simples(texte: str, ancre: str):
    """`{ 12:{cle:valeur, "autre cle":valeur} }` — moyennes et sd séparées."""
    i = texte.find(ancre)
    if i < 0:
        return {}
    seg = texte[i:i + texte[i:].index("\n};")]
    out = {}
    for m in re.finditer(r"\n(\d+):\{", seg):
        e = bloc_accolades(seg, m.end() - 1)
        out[int(m.group(1))] = {
            (x.group(1) or x.group(2)): _n(x.group(3))
            for x in re.finditer(
                r'(?:"([^"]+)"|([A-Za-z_0-9]+))\s*:\s*([\d.]+|null)', e)}
    return out


def references(racine: Path):
    d = racine / "references"
    ma, gc = {}, {}
    f = d / "maroun.json"
    if f.is_file():
        o = json.loads(f.read_text(encoding="utf-8"))
        for sa, t in (o.get("par_sa") or {}).items():
            ma[int(sa)] = {c: (t.get("Mean", {}).get(c), t.get("SD", {}).get(c))
                           for c in set(t.get("Mean", {})) | set(t.get("SD", {}))}
    f = d / "guihard_costa.json"
    if f.is_file():
        o = json.loads(f.read_text(encoding="utf-8"))
        for cl, t in (o.get("organes") or {}).items():
            gc[cl] = {org: (v.get("moy"), v.get("sd")) for org, v in t.items()}
    return {"MAROUN": ma, "GC_O": gc}


# ══════════════════════════════════════════════════════════════════════════════
# Les six jeux : quelle table du module face à quelle table de référence
# ══════════════════════════════════════════════════════════════════════════════
# `lire` prend le texte du module et rend {ligne: {clé: (moyenne, sd)}}.
# `ref` nomme la table du calculateur ; `noms` traduit les clés du module vers
# les siennes. `serie` dit si la continuité a un sens : elle en a pour une
# masse ou une longueur, qui croissent avec le terme, pas pour une classe de
# deux semaines déjà lissée.

JEUX = [
    dict(nom="Maroun — organes (MA_ORG)", ancre="var MA_ORG",
         lire=lambda t: lire_liste(t, "var MA_ORG"),
         ref="MAROUN", noms=NOMS_MAROUN, serie=True, corrigeable=True),
    dict(nom="Maroun — biométrie (MA)", ancre="var MA =",
         lire=lambda t: lire_liste(t, "var MA ="),
         ref="MAROUN", noms=NOMS_MAROUN_BIO, serie=True),
    dict(nom="Guihard-Costa — organes (GC_ORG)", ancre="var GC_ORG",
         lire=lambda t: lire_dict(t, "var GC_ORG", classes=True),
         ref="GC_O", noms=NOMS_GC, serie=False, lisse=True),
    dict(nom="Guihard-Costa — mensurations (GC)", ancre="var GC =",
         lire=lambda t: lire_dict(t, "var GC =", classes=True),
         ref="GC_M", noms={}, serie=False, lisse=True),
    dict(nom="Muller-Brochut — organes (MB_ORG)", ancre="var MB_ORG",
         lire=lambda t: lire_dict(t, "var MB_ORG"),
         ref="MB_O", noms={}, serie=True),
    dict(nom="Muller-Brochut — biométrie (MB)", ancre="var MB =",
         lire=lambda t: lire_dict(t, "var MB ="),
         ref="MB_B", noms={}, serie=True),
]


# ══════════════════════════════════════════════════════════════════════════════
# Comparaison
# ══════════════════════════════════════════════════════════════════════════════

def comparer(embarquee, reference, noms):
    """Renvoie (comparés, écarts) ; un écart = (ligne, clé, quoi, module, ref)."""
    compares, ecarts = 0, []
    for ligne in sorted(set(embarquee) & set(reference), key=str):
        for cle, (m1, s1) in embarquee[ligne].items():
            ref = reference[ligne].get(noms.get(cle, cle))
            if ref is None:
                continue
            for i, quoi in ((0, "moyenne"), (1, "écart-type")):
                a, b = (m1, s1)[i], ref[i]
                if a is None or b is None:
                    continue
                compares += 1
                if abs(a - b) > 1e-9:
                    ecarts.append((ligne, noms.get(cle, cle), quoi, a, b))
    return compares, ecarts


def decalage(embarquee, reference, noms, ligne):
    """Cherche un décalage de colonnes sur une ligne discordante.

    Le motif est classique et invisible à l'œil : le tableau publié a des
    cases vides — les surrénales aux termes précoces, par exemple — et la
    transcription les saute au lieu de les garder. Tout ce qui suit remonte
    d'un cran, et chaque organe hérite des valeurs de son voisin. Les nombres
    restent tous plausibles, ce qui est précisément le danger.

    On le reconnaît en cherchant, pour chaque clé discordante, si sa valeur
    existe ailleurs dans la même ligne de référence, et à quelle distance.
    """
    ordre = [noms.get(k, k) for k in embarquee[ligne]]
    ref = reference.get(ligne, {})
    trouves = []
    for i, (cle, v) in enumerate(embarquee[ligne].items()):
        r = noms.get(cle, cle)
        if v[0] is None or ref.get(r) == v:
            continue
        for j, autre in enumerate(ordre):
            if autre != r and ref.get(autre) == v:
                trouves.append(j - i)
                break
    if len(trouves) < 3:
        return None
    dominant = Counter(trouves).most_common(1)[0]
    if dominant[1] < len(trouves) * 0.6:
        return None
    return dominant[0], dominant[1]


def continuite(table, tolerance=0.6):
    """Cherche les ruptures de série : une masse d'organe ne rétrécit pas.

    Entre 12 et 43 SA, la masse moyenne d'un organe croît de façon monotone.
    Une série qui s'effondre d'un terme au suivant ne décrit pas un fœtus :
    elle décrit une table mal recopiée. C'est le seul critère de ce fichier
    qui désigne un coupable sans avoir besoin d'une seconde copie — et c'est
    lui qui tranche quand deux transcriptions se contredisent.

    On ne signale qu'une chute franche (au-delà de `tolerance`), pour ne pas
    bruiter sur les arrondis des tout premiers termes.
    """
    ruptures = []
    cles = {c for l in table.values() for c in l}
    for cle in sorted(cles):
        serie = [(sa, table[sa][cle][0]) for sa in sorted(table)
                 if cle in table[sa] and table[sa][cle][0] is not None]
        for (sa1, v1), (sa2, v2) in zip(serie, serie[1:]):
            if v1 and v2 < v1 * tolerance:
                ruptures.append((cle, sa1, v1, sa2, v2))
    return ruptures


def dispersion(a, b, noms, facteur=1.6):
    """Compare les coefficients de variation de deux copies, organe par organe.

    Quand deux transcriptions donnent la même moyenne et des écarts-types dans
    un rapport constant, l'une des deux a converti ce qu'elle ne devait pas —
    un écart-type pris pour un intervalle, un organe pair compté pour un seul.
    Le sd/moyenne des organes sur lesquels les deux copies s'accordent donne la
    fourchette attendue ; celui qui en sort désigne la copie fautive.

    Renvoie [(clé, cv_module, cv_référence, cv_médian des clés concordantes)].
    """
    cv = {"module": {}, "ref": {}}
    for ligne in set(a) & set(b):
        for cle, (m1, s1) in a[ligne].items():
            r = b[ligne].get(noms.get(cle, cle))
            if not r or not m1 or s1 is None or not r[0] or r[1] is None:
                continue
            cv["module"].setdefault(cle, []).append(s1 / m1)
            cv["ref"].setdefault(cle, []).append(r[1] / r[0])
    moy = lambda v: sum(v) / len(v)
    accord = [moy(cv["module"][c]) for c in cv["module"]
              if abs(moy(cv["module"][c]) - moy(cv["ref"][c])) < 1e-9]
    if len(accord) < 3:
        return []
    attendu = sorted(accord)[len(accord) // 2]
    out = []
    for cle in sorted(cv["module"]):
        x, y = moy(cv["module"][cle]), moy(cv["ref"][cle])
        if abs(x - y) < 1e-9:
            continue
        out.append((cle, x, y, attendu))
    return out


def _ordonne(table):
    """Les lignes dans l'ordre des termes, que la clé soit 12 ou "13-14"."""
    return sorted(table, key=lambda c: int(str(c).split("-")[0]))


def _quantum(valeurs):
    """Le pas d'arrondi de la série : 0.1 si la table est à une décimale."""
    n = 0
    for v in valeurs:
        s = repr(float(v))
        if "." in s and not s.endswith(".0"):
            n = max(n, len(s.split(".")[1]))
    return 10.0 ** -n


def regularite(table, seuil=4.0, mini=7):
    """Cherche la valeur isolée dans une série lissée.

    Guihard-Costa ne publie pas des mesures brutes : ce sont des courbes
    ajustées, tabulées classe par classe. Leurs différences premières varient
    donc doucement — une mensuration gagne un peu moins à chaque classe,
    jamais par à-coups. Une seule valeur mal recopiée casse cette régularité
    et se voit sur la différence seconde, même quand la série reste croissante
    et que le test de continuité ne dit rien.

    C'est le test qui attrape la faute de frappe : 432,2 pour 423,2, deux
    chiffres échangés, une valeur parfaitement plausible à l'œil.

    Une erreur isolée d'amplitude e laisse une signature reconnaissable sur
    trois différences secondes : +e, −2e, +e. On note donc chaque point par la
    différence seconde qui l'a au centre, et on ne retient que les maxima
    locaux, sinon un seul faux nombre en dénonce trois.

    Ne s'applique qu'aux tables lissées : une table empirique stratifiée n'a
    aucune raison d'être régulière, et le test n'y dirait rien de vrai.

    En bout de série, la différence seconde ne peut plus centrer le dernier
    point : le test désigne alors sa voisine. On le dit plutôt que de trancher.

    Renvoie [(clé, ligne, valeur, ampleur, ligne voisine ambiguë ou None)].
    """
    suspects = []
    lignes = _ordonne(table)
    cles = {c for l in table.values() for c in l}
    for cle in sorted(cles):
        for i, quoi in ((0, "moyenne"), (1, "écart-type")):
            pts = [(l, table[l][cle][i]) for l in lignes
                   if cle in table[l] and table[l][cle][i] is not None]
            if len(pts) < mini:
                continue
            v = [x[1] for x in pts]
            d2 = [v[k + 2] - 2 * v[k + 1] + v[k] for k in range(len(v) - 2)]
            amp = sorted(abs(x) for x in d2)
            med = amp[len(amp) // 2]
            plancher = 4 * _quantum(v)      # le bruit d'arrondi de la table
            note = [0.0] + [abs(x) for x in d2] + [0.0]
            for j in range(1, len(v) - 1):
                x = note[j]
                if x <= seuil * med or x <= plancher:
                    continue
                if x < note[j - 1] or x < note[j + 1]:
                    continue                # ce n'est pas lui, c'est son voisin
                bord = None
                if j == 1:
                    bord = pts[0][0]
                elif j == len(v) - 2:
                    bord = pts[-1][0]
                suspects.append((f"{cle} ({quoi})", pts[j][0], v[j],
                                 x / med if med else float("inf"), bord))
    return suspects

def lignes_dupliquees(t):
    """Deux lignes strictement identiques trahissent un copier-coller."""
    vues, doubles = {}, []
    for ligne in sorted(t, key=str):
        cle = json.dumps({str(k): v for k, v in t[ligne].items()}, sort_keys=True)
        if cle in vues:
            doubles.append((vues[cle], ligne))
        else:
            vues[cle] = ligne
    return doubles


def rapport(nom, compares, ecarts, doubles=(), decalages=(), ruptures=(),
            cv=(), isolees=()):
    print(f"\n  {nom}")
    if not compares:
        print("    aucune valeur comparable — la référence manque-t-elle ?")
        return 0
    if not ecarts:
        print(f"    {compares} valeurs comparées — concordance parfaite")
    else:
        pc = 100 * len(ecarts) / compares
        print(f"    {compares} valeurs comparées — {len(ecarts)} discordantes ({pc:.0f} %)")
        par_ligne = Counter(str(e[0]) for e in ecarts)
        print("    par ligne : " + " ".join(f"{k}:{v}" for k, v in sorted(par_ligne.items())))
        gros = [e for e in ecarts if e[4] and abs(e[3] - e[4]) / abs(e[4]) > SEUIL_GROS_ECART]
        if gros:
            print(f"    écarts supérieurs à {SEUIL_GROS_ECART:.0%} ({len(gros)}) :")
            for ligne, cle, quoi, a, b in sorted(
                    gros, key=lambda e: -abs(e[3] - e[4]) / abs(e[4]))[:10]:
                print(f"      {str(ligne):>6}  {cle:14s} {quoi:10s} "
                      f"module {a:<8} référence {b}")
    for cle, sa1, v1, sa2, v2 in ruptures:
        print(f"    ⚠ série « {cle} » : {v1} à {sa1} SA puis {v2} à {sa2} SA — "
              f"une masse d'organe ne décroît pas avec le terme")
    for quoi, ligne, val, ampleur, bord in isolees:
        suite = (f" — ou sa voisine de {bord}, qu'aucune différence seconde "
                 f"n'encadre en bout de série" if bord else "")
        print(f"    ⚠ « {quoi} » : {val} à {ligne} casse la régularité de la "
              f"série ({ampleur:.0f}× l'irrégularité médiane) — dans une table "
              f"lissée, une valeur isolée est une faute de recopie{suite}")
    for cle, x, y, attendu in cv:
        loin = "module" if abs(x - attendu) > abs(y - attendu) else "référence"
        print(f"    ⚠ « {cle} » : écart-type/moyenne {x:.2f} au module, {y:.2f} "
              f"à la référence, {attendu:.2f} sur les clés concordantes — "
              f"c'est {loin} qui s'écarte de la dispersion attendue")
    for ligne, (pas, combien) in decalages:
        # Ce test voit le décalage mais pas son sens : il ne sait pas laquelle
        # des deux copies a sauté une case. C'est la continuité des séries, plus
        # haut, qui le dit — une masse d'organe ne décroît pas avec le terme.
        print(f"    ⚠ ligne {ligne} : les deux copies sont décalées de {abs(pas)} "
              f"rang(s) l'une par rapport à l'autre, sur {combien} organes — une "
              f"case vide de la table publiée a été sautée d'un côté. Laquelle : "
              f"voir les ruptures de série ci-dessus.")
    for a, b in doubles:
        print(f"    ⚠ lignes {a} et {b} strictement identiques — copier-coller ?")
    return len(ecarts)


# ══════════════════════════════════════════════════════════════════════════════
# Correction
# ══════════════════════════════════════════════════════════════════════════════

def bloc_ma_org(embarquee, reference):
    """Réécrit MA_ORG dans la forme du module, avec les valeurs de référence.

    On garde les clés et l'ordre du module — c'est son code qui les lit — et
    on ne remplace que les nombres. Les clés que la référence ignore sont
    laissées telles quelles et signalées en commentaire.
    """
    lignes, inconnues = [], set()
    for sa in sorted(embarquee):
        ref = reference.get(sa, {})
        morceaux = [f"s:{sa}"]
        for cle, (m1, s1) in embarquee[sa].items():
            r = ref.get(NOMS_MAROUN.get(cle, cle))
            if r is None:
                inconnues.add(cle)
                m2, s2 = m1, s1
            else:
                m2 = r[0] if r[0] is not None else m1
                s2 = r[1] if r[1] is not None else s1

            def f(v):
                if v is None:
                    return "null"
                return str(int(v)) if float(v).is_integer() and abs(v) >= 1 else str(v)
            morceaux.append(f"{cle}:{{m:{f(m2)},sd:{f(s2)}}}")
        lignes.append("  {" + ",".join(morceaux) + "}")
    tete = ("/* MA_ORG — régénéré par\n"
            "   outils/verifier_tables.py. Remplace le bloc du même nom dans\n"
            "   le module, puis incrémenter son module_version. */\n")
    if inconnues:
        tete += "/* clés absentes de la référence, laissées inchangées : " + \
                ", ".join(sorted(inconnues)) + " */\n"
    return tete + "var MA_ORG = [\n" + ",\n".join(lignes) + "\n];\n"


# ══════════════════════════════════════════════════════════════════════════════

def main():
    ap = argparse.ArgumentParser(description="Audit des tables embarquées dans les modules.")
    ap.add_argument("--base", type=Path, default=HUB, help="racine du hub")
    ap.add_argument("--depot", type=Path, default=DEPOT, help="dépôt des modules")
    ap.add_argument("--corriger", action="store_true",
                    help="écrire les blocs corrigés dans outils/corrections/")
    ap.add_argument("--references", action="store_true",
                    help="forcer references/*.json plutôt que le calculateur du dépôt")
    args = ap.parse_args()

    calc = args.base.resolve() / "calculateur-unifie.html"
    ref = {} if args.references else toutes_references(calc)
    origine = "calculateur-unifie.html"
    if not ref:
        ref = references(args.base.resolve())
        origine = "references/*.json"
    ref = {k: v for k, v in ref.items() if v}
    if not ref:
        sys.exit("Aucune référence : ni hub/calculateur-unifie.html, ni references/*.json.\n"
                 "Sans elles, il n'y a rien à quoi comparer — voir references/LISEZMOI.md.")
    print(f"référence  : {origine} — " +
          ", ".join(f"{k} ({len(v)} ligne{'s' if len(v) > 1 else ''})"
                    for k, v in sorted(ref.items())))
    # La référence n'est pas au-dessus de tout soupçon : elle est une
    # transcription comme une autre. On la passe au même crible de continuité,
    # et on le dit avant tout le reste — sinon on impute au module des erreurs
    # qui sont dans la table à laquelle on le compare.
    lisses = {j["ref"] for j in JEUX if j.get("lisse")}
    for nom_ref in sorted(lisses & set(ref)):
        for quoi, ligne, val, ampleur, bord in regularite(ref[nom_ref]):
            suite = (f" — ou celle de {bord}, en bout de série" if bord else "")
            print(f"  ⚠ LA RÉFÉRENCE elle-même ({nom_ref}) : « {quoi} » vaut "
                  f"{val} à {ligne}, ce qui casse la régularité de la série "
                  f"({ampleur:.0f}×){suite}. Une faute de recopie côté référence.")
    for jeu in JEUX:
        if not jeu["serie"]:
            continue
        for cle, sa1, v1, sa2, v2 in continuite(ref.get(jeu["ref"], {})):
            print(f"  ⚠ LA RÉFÉRENCE elle-même ({jeu['ref']}) : série « {cle} », "
                  f"{v1} à {sa1} SA puis {v2} à {sa2} SA. Les écarts signalés plus "
                  f"bas sur cette série sont à lire à l'envers.")

    total = 0
    for html in sorted((args.depot.resolve()).rglob("*.html")):
        if "hub" in html.parts and html.name != "calculateur-unifie.html":
            continue
        texte = html.read_text(encoding="utf-8", errors="replace")
        jeux = [j for j in JEUX if j["ancre"] in texte and ref.get(j["ref"])]
        if not jeux:
            continue
        print(f"\n{'═' * 74}\n{html.relative_to(args.depot.resolve())}")
        for jeu in jeux:
            t = jeu["lire"](texte)
            if not t:
                continue
            r = ref[jeu["ref"]]
            compares, ecarts = comparer(t, r, jeu["noms"])
            dec = []
            for ligne in sorted({e[0] for e in ecarts}, key=str):
                d = decalage(t, r, jeu["noms"], ligne)
                if d:
                    dec.append((ligne, d))
            total += rapport(jeu["nom"], compares, ecarts,
                             lignes_dupliquees(t), dec,
                             continuite(t) if jeu["serie"] else (),
                             dispersion(t, r, jeu["noms"]) if ecarts else (),
                             regularite(t) if jeu.get("lisse") else ())
            if args.corriger and jeu.get("corrigeable"):
                d = ICI / "corrections"
                d.mkdir(exist_ok=True)
                cible = d / (html.stem + "_MA_ORG.js")
                cible.write_text(bloc_ma_org(t, r), encoding="utf-8")
                print(f"    → bloc corrigé écrit dans outils/corrections/{cible.name}")

    print(f"\n{'═' * 74}")
    print("Aucune divergence." if not total else
          f"{total} valeur(s) divergente(s) au total. Ce script ne dit pas qui a raison :\n"
          "il dit que deux copies de la même table ne coïncident pas, et où.")
    return 1 if total else 0


if __name__ == "__main__":
    sys.exit(main())
