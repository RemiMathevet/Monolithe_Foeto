#!/usr/bin/env python3
# SPDX-License-Identifier: CC-BY-NC-SA-4.0 | Hub Light | Monolithe_Foeto
"""
Compte rendu : contexte, rendu Jinja, enregistrement.

Le compte rendu se fabrique à partir des saisies courantes d'un dossier. Il
n'invente rien : ce qui n'a pas été rempli n'apparaît pas, et ce qui est
anormal ressort. Le brouillon produit est fait pour être relu et corrigé, pas
pour être signé tel quel — c'est écrit dedans.

Deux principes tiennent les gabarits.

Le premier : **on parcourt la trame, on ne nomme pas les champs.** Un gabarit
qui énumérerait quatre-vingt-dix identifiants pourrirait à la première
diffusion de module. Les gabarits d'ici demandent « les champs remplis de
l'étape thorax » et le module fournit les libellés. Un champ ajouté apparaît
donc dans le compte rendu sans qu'on y touche, avec le libellé qu'a vu la
personne qui l'a rempli.

Le second : **le z affiché est celui du serveur.** Le module calcule le sien en
salle, ce qui permet de remesurer à temps, et il reste en base comme témoin.
Mais celui qui part au compte rendu vient de `biometrie.py`, parce qu'une table
de référence se corrige et qu'un z gelé dans un JSON ne se corrige pas. Quand
les deux divergent, le contexte porte la divergence et le gabarit la signale :
mieux vaut une note en bas de page qu'un choix silencieux.
"""

import datetime as dt
import json
import re
from pathlib import Path

import biometrie

ICI = Path(__file__).resolve().parent
GABARITS = ICI / "gabarits"

try:
    from jinja2 import FileSystemLoader
    from jinja2.sandbox import SandboxedEnvironment
    JINJA = True
except ImportError:
    JINJA = False


# ══════════════════════════════════════════════════════════════════════════════
# Petites mises en forme, partagées avec les gabarits
# ══════════════════════════════════════════════════════════════════════════════

def fr(v, vide="—"):
    """Une valeur telle qu'on l'écrit dans un compte rendu."""
    if v is None or v == "":
        return vide
    if isinstance(v, bool):
        return "oui" if v else "non"
    if v == "true":
        return "oui"
    if v == "false":
        return "non"
    if v == "UNK":
        return "inconnu"
    if isinstance(v, list):
        return ", ".join(fr(x) for x in v) if v else vide
    if isinstance(v, dict):
        d = date_variable(v)
        return d if d else json.dumps(v, ensure_ascii=False)
    return str(v)


def date_variable(v):
    """Les dates de l'administratif portent leur précision. On la respecte.

    Une date connue au mois près s'écrit « 03/2026 » : la transformer en
    « 01/03/2026 » serait inventer un jour.
    """
    if v == "err":
        return "date illisible"
    if not isinstance(v, dict) or v.get("annee") is None:
        return None
    a, m, j = v["annee"], v.get("mois"), v.get("jour")
    if j is not None:
        return f"{j:02d}/{m:02d}/{a}"
    if m is not None:
        return f"{m:02d}/{a}"
    return str(a)


def dtc(s):
    """Un horodatage ISO en date lisible."""
    if not s:
        return "—"
    m = re.match(r"^(\d{4})-(\d{2})-(\d{2})", str(s))
    return f"{m.group(3)}/{m.group(2)}/{m.group(1)}" if m else str(s)[:10]


def phrase(v):
    """Un fragment libre transformé en phrase : une seule ponctuation finale.

    Les champs de texte des modules sont saisis tantôt avec un point, tantôt
    sans ; le gabarit en ajoute un. Sans ceci on écrit « … de controle.. ».
    """
    t = str(v or "").strip()
    return t.rstrip(" .;,") if t else t


def zt(v, signe=True):
    if v is None:
        return "—"
    return f"{v:+.2f} DS" if signe else f"{v:.2f}"


def rempli(c):
    """Un champ de trame porte-t-il quelque chose ?"""
    if c.get("type") == "chips":
        return bool(c.get("valeurs"))
    if c.get("type") == "masse2":
        return c.get("total") is not None
    if c.get("type") == "masse":
        return c.get("grammes") is not None
    v = c.get("valeur")
    return v is not None and v != ""


def valeur_champ(c):
    """Ce qu'on écrit pour un champ, unité comprise."""
    t = c.get("type")
    if t == "chips":
        return ", ".join(c.get("valeurs") or [])
    if t == "masse2":
        d, g, tot = c.get("droite"), c.get("gauche"), c.get("total")
        if d is not None and g is not None:
            return f"{fr(tot)} g (D {fr(d)} / G {fr(g)})"
        return f"{fr(tot)} g"
    if t == "masse":
        return f"{fr(c.get('grammes'))} g"
    v = fr(c.get("valeur"))
    u = c.get("unite")
    return f"{v} {u}" if u and c.get("valeur") is not None else v


# ══════════════════════════════════════════════════════════════════════════════
# Le contexte
# ══════════════════════════════════════════════════════════════════════════════

def saisies_courantes(cx, numero):
    out = {}
    for r in cx.execute("""SELECT module, module_version, schema_version, operateur,
                                  exported_at, ingere_at, provenance, donnees_json
                             FROM saisies WHERE dossier=? AND courant=1""", (numero,)):
        d = dict(r)
        try:
            d["donnees"] = json.loads(d.pop("donnees_json") or "{}")
        except json.JSONDecodeError:
            d.pop("donnees_json", None)
            d["donnees"] = {}
        out[d["module"]] = d
    return out


def _trame(d):
    """Les étapes d'une trame, réduites à ce qui est rempli, ordre conservé."""
    etapes = []
    for e in d.get("etapes") or []:
        champs = [c for c in (e.get("champs") or []) if rempli(c)]
        etapes.append({"id": e.get("id"), "titre": e.get("titre"),
                       "champs": champs,
                       "total": len(e.get("champs") or []),
                       "faits": len(champs)})
    return etapes


def contexte(cx, numero, refs: biometrie.References, modules_attendus):
    s = saisies_courantes(cx, numero)
    dossier = cx.execute("SELECT * FROM vue_dossiers WHERE numero=?", (numero,)).fetchone()
    if not dossier:
        raise ValueError(f"dossier {numero} inconnu")
    d = dict(dossier)

    admin = (s.get("administratif") or {}).get("donnees", {})
    clin = (s.get("examen_clinique") or {}).get("donnees", {})
    bio = (s.get("biometrie_clinique") or {}).get("donnees", {})
    rad = (s.get("radio") or {}).get("donnees", {})
    aut = (s.get("autopsie") or {}).get("donnees", {})
    neu = (s.get("neuropath") or {}).get("donnees", {})

    # Le terme : celui de l'administratif fait autorité, les modules le
    # redonnent et peuvent diverger — on le dit plutôt que de choisir seul.
    issue = admin.get("issue") or {}
    sa = issue.get("terme_sa") if issue.get("terme_sa") is not None else d.get("terme_sa")
    j = issue.get("terme_j") if issue.get("terme_j") is not None else d.get("terme_jours")
    termes_vus = {}
    for nom, doc in (("autopsie", aut), ("neuropath", neu)):
        if doc.get("terme_sa") is not None:
            termes_vus[nom] = doc["terme_sa"]
    for nom, doc in (("biometrie_clinique", bio), ("radio", rad)):
        t = doc.get("terme") or {}
        if t.get("sa") is not None:
            termes_vus[nom] = t["sa"]
    discordance_terme = sorted({v for v in termes_vus.values()} | ({sa} if sa is not None else set()))

    # Masses et z. Le module a mis les siens dans le JSON ; on les garde pour
    # comparaison et on calcule les nôtres.
    masses, z_module = {}, {}
    for e in aut.get("etapes") or []:
        for c in e.get("champs") or []:
            if c.get("type") == "masse" and c.get("grammes") is not None:
                masses[c["id"]] = c["grammes"]
                z_module[c["id"]] = c.get("zscores") or {}
            elif c.get("type") == "masse2" and c.get("total") is not None:
                masses[c["id"]] = c["total"]
                z_module[c["id"]] = c.get("zscores") or {}
    mesures = {k: v for k, v in (bio.get("mesures") or {}).items() if v is not None}
    z = biometrie.calculer(refs, sa, aut.get("maceration_maroun"), masses, mesures)
    divergences = biometrie.comparer(z, z_module)
    # Quand le terme d'ici n'est pas celui qu'avait le module, tous les z
    # diffèrent et la liste ne dit plus rien. On nomme la cause une fois.
    terme_module = aut.get("terme_sa")
    cause_terme = (terme_module is not None and sa is not None and terme_module != sa)

    # Les masses en une liste prête à écrire, libellé du module compris.
    lignes_masses = []
    for e in aut.get("etapes") or []:
        for c in e.get("champs") or []:
            if c.get("id") in masses:
                r = z.get(c["id"], {})
                lignes_masses.append({
                    "id": c["id"], "label": c.get("label"), "valeur": masses[c["id"]],
                    "detail": valeur_champ(c),
                    "z_gc": r.get("z_gc"), "z_ma": r.get("z_ma"),
                    "attendu_gc": r.get("attendu_gc"), "attendu_ma": r.get("attendu_ma"),
                    "alerte": r.get("alerte", False),
                    "z_module": z_module.get(c["id"]) or {},
                })

    anormaux = []
    for e in clin.get("etages") or []:
        for i in e.get("items") or []:
            if i.get("etat") == "anormal":
                anormaux.append({"etage": e.get("titre"), "label": i.get("label"),
                                 "anomalies": i.get("anomalies") or [],
                                 "precisions": i.get("precisions")})

    photos = [dict(r) for r in cx.execute(
        """SELECT p.module, p.cle, p.label, p.etape, p.chemin
             FROM photos p JOIN saisies s ON s.id = p.saisie_id AND s.courant = 1
            WHERE p.dossier=? ORDER BY p.module, p.cle""", (numero,))]

    return {
        "dossier": numero,
        "genere_at": dt.datetime.now().isoformat(timespec="seconds"),
        "statut": d.get("statut"),
        "remarques": d.get("remarques"),
        "modules": {k: {x: v[x] for x in ("module_version", "schema_version", "operateur",
                                          "exported_at", "ingere_at", "provenance")}
                    for k, v in s.items()},
        "manquants": [m for m in modules_attendus if m not in s],
        "terme": {"sa": sa, "j": j,
                  "texte": (f"{sa} SA" + (f" + {j} j" if j else "")) if sa is not None else "—",
                  "vu_par": termes_vus,
                  "discordant": len(discordance_terme) > 1},
        "admin": admin,
        "identite": admin.get("identite") or {},
        "circuit": admin.get("circuit") or {},
        "issue": issue,
        "atcd_mat": admin.get("atcd_mat") or {},
        "atcd_obs": admin.get("atcd_obs") or {},
        "grossesse": admin.get("grossesse") or {},
        "prenatal": admin.get("prenatal") or {},
        "coherence": admin.get("coherence") or [],
        "clinique": {"etages": clin.get("etages") or [], "anormaux": anormaux,
                     "faits": sum(1 for e in clin.get("etages") or []
                                  for i in e.get("items") or [] if i.get("etat")),
                     "total": sum(len(e.get("items") or []) for e in clin.get("etages") or [])},
        "biometrie": {"mesures": mesures, "sexe": bio.get("sexe")},
        "radio": rad,
        "autopsie": {"etapes": _trame(aut), "masses": lignes_masses,
                     "maceration": aut.get("maceration_maroun"),
                     "ouverture_at": aut.get("ouverture_at")},
        "neuropath": {"etapes": _trame(neu)},
        "z": z,
        "z_divergences": divergences,
        "z_cause_terme": cause_terme,
        "z_terme_module": terme_module,
        "references": {"dispo": refs.dispo, "sources": refs.sources,
                       "erreurs": refs.erreurs},
        "cliches": photos,
    }


# ══════════════════════════════════════════════════════════════════════════════
# Rendu
# ══════════════════════════════════════════════════════════════════════════════

def environnement():
    if not JINJA:
        raise RuntimeError("Jinja2 est absent — il vient avec Flask : pip install flask")
    # Bac à sable et non Environment : la page Comptes rendus laisse écrire
    # un gabarit à la main, et un Environment ordinaire laisse un gabarit
    # remonter jusqu'à `os` par les attributs internes des objets Python
    # (`{{ cycler.__init__.__globals__.os }}`). Le bac à sable interdit ces
    # accès ; les filtres et globals déclarés ci-dessous restent disponibles.
    env = SandboxedEnvironment(loader=FileSystemLoader(str(GABARITS)),
                               trim_blocks=True, lstrip_blocks=True,
                               keep_trailing_newline=True, autoescape=False)
    env.filters.update(fr=fr, dtc=dtc, zt=zt, valeur=valeur_champ, phrase=phrase)
    env.globals.update(rempli=rempli, date_variable=date_variable)
    return env


NOM_GABARIT_OK = re.compile(r"^[a-z0-9][a-z0-9_-]{0,40}$")


def chemin_gabarit(nom):
    """Le fichier d'un gabarit, en refusant tout ce qui sortirait du dossier."""
    if not NOM_GABARIT_OK.match(nom or ""):
        raise ValueError("nom de gabarit invalide : minuscules, chiffres, - et _")
    f = (GABARITS / (nom + ".jinja2")).resolve()
    if f.parent != GABARITS.resolve():
        raise ValueError("nom de gabarit invalide")
    return f


def source(nom):
    """Le texte d'un gabarit, tel qu'il est sur le disque."""
    f = chemin_gabarit(nom)
    if not f.is_file():
        raise ValueError(f"gabarit « {nom} » inconnu")
    return f.read_text(encoding="utf-8")


def apercu(cx, numero, texte, refs, modules_attendus):
    """Rend un gabarit qui n'est pas encore sur le disque.

    Écrire un gabarit sans le voir tourner sur un vrai dossier, c'est écrire à
    l'aveugle : une balise mal fermée ou un champ absent ne se voient qu'au
    rendu. On rend donc la source telle qu'elle est dans l'éditeur, sans rien
    enregistrer — ni le gabarit, ni le compte rendu produit.
    """
    ctx = contexte(cx, numero, refs, modules_attendus)
    rendu = environnement().from_string(texte).render(**ctx)
    return re.sub(r"\n{3,}", "\n\n", rendu).strip() + "\n"


def enregistrer_gabarit(nom, texte):
    """Écrit un gabarit, en gardant la version précédente à côté.

    Le dépôt n'est pas forcément sous git sur le poste : un `.bak` est le seul
    filet entre une modification et la version d'avant.
    """
    f = chemin_gabarit(nom)
    if not texte.strip():
        raise ValueError("gabarit vide")
    if f.is_file():
        f.with_suffix(".jinja2.bak").write_text(f.read_text(encoding="utf-8"),
                                                encoding="utf-8")
    f.write_text(texte, encoding="utf-8")
    return f


def gabarits_disponibles():
    out = {}
    if not GABARITS.is_dir():
        return out
    for f in sorted(GABARITS.glob("*.jinja2")):
        tete = f.read_text(encoding="utf-8")[:600]
        titre = re.search(r"\{#\s*titre:\s*(.+?)\s*#\}", tete)
        ver = re.search(r"\{#\s*version:\s*(.+?)\s*#\}", tete)
        out[f.stem] = {"id": f.stem,
                       "titre": titre.group(1) if titre else f.stem,
                       "version": ver.group(1) if ver else "1.0.0"}
    return out


def rendre(cx, numero, gabarit, refs, modules_attendus, operateur=None):
    """Produit le compte rendu et l'enregistre. Renvoie (id, texte)."""
    dispo = gabarits_disponibles()
    if gabarit not in dispo:
        raise ValueError(f"gabarit « {gabarit} » inconnu "
                         f"(disponibles : {', '.join(dispo) or 'aucun'})")
    ctx = contexte(cx, numero, refs, modules_attendus)
    texte = environnement().get_template(gabarit + ".jinja2").render(**ctx)
    texte = re.sub(r"\n{3,}", "\n\n", texte).strip() + "\n"
    cur = cx.execute("""INSERT INTO comptes_rendus
                          (dossier, gabarit, gabarit_version, texte, operateur)
                        VALUES (?,?,?,?,?)""",
                     (numero, gabarit, dispo[gabarit]["version"], texte, operateur))
    cx.commit()
    return cur.lastrowid, texte
