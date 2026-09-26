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
    """Un écart-type à la française : une décimale, virgule, vrai signe moins."""
    if v is None:
        return "—"
    t = f"{v:+.1f}" if signe and round(v, 1) != 0 else f"{abs(v) if round(v, 1) == 0 else v:.1f}"
    return t.replace(".", ",").replace("-", "\u2212") + (" DS" if signe else "")


def ds3(r):
    """« GC +0,3 DS ; MA −0,1 DS » — les sources qui couvrent le terme, nommées."""
    return " ; ".join(f"{src} {zt(r.get('z_' + src.lower()))}" for src in ("GC", "MA", "MB")
                      if r.get("z_" + src.lower()) is not None)


def rempli(c):
    """Un champ de trame porte-t-il quelque chose ?"""
    if c.get("type") == "chips":
        return bool(c.get("valeurs"))
    if c.get("type") == "axe":
        # micro.html : trois états. « Non regardé » n'est pas un constat et ne
        # s'écrit donc pas — un axe muet reste muet dans le compte rendu.
        return bool(c.get("etat") or c.get("termes") or c.get("autre") or c.get("note"))
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
    if t == "axe":
        # Le libellé des deux pôles (« fin » / « épaissi »…) vit dans la grille
        # et n'est pas exporté : on écrit l'état, puis ce qui a été coché.
        bouts = []
        if c.get("etat") == "anormal":
            bouts.append("ANORMAL")
        elif c.get("etat") == "normal":
            bouts.append("vu normal")
        termes = list(c.get("termes") or [])
        if c.get("autre"):
            termes.append(str(c["autre"]))
        if termes:
            bouts.append(", ".join(termes))
        if c.get("note"):
            bouts.append(phrase(c["note"]))
        return " — ".join(bouts) or "—"
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


def _placenta(d):
    """La macro placentaire, ramenée à ses champs posés.

    Ce module-ci range ses champs par identifiant, sans libellé
    (`sections[].champs = {id: valeur}`) : le gabarit placentaire les nomme
    donc lui-même, comme un compte rendu se rédige. C'est l'exception assumée
    à la règle « on parcourt la trame » — elle vaut pour les quatre-vingt-dix
    champs de l'autopsie, pas pour une trame de vingt-cinq champs stable qui
    doit sortir en phrases.
    """
    if not d:
        return {"present": False, "champs": {}, "tranches": [], "lesions": []}
    ch, titres = {}, {}
    for sec in d.get("sections") or []:
        titres[sec.get("id")] = sec.get("titre")
        for k, v in (sec.get("champs") or {}).items():
            if v is not None and v != "" and v != []:
                ch[k] = v
    mf, mp = ch.get("masse_foetale"), ch.get("masse")
    nb = (int, float)
    # Le rapport se donne, il ne s'interprète pas : son percentile dépend du
    # terme et du référentiel retenu, que le module ne connaît pas.
    rfp = round(mf / mp, 2) if isinstance(mf, nb) and isinstance(mp, nb) and mp else None
    return {"present": True, "champs": ch, "titres": titres,
            "tranches": d.get("tranches") or [],
            "lesions": [l for l in (d.get("lesions") or [])
                        if l.get("cassette") or l.get("description") or l.get("lesion")],
            "rapport_fp": rfp}


def _micro(d):
    """micro.html : des sections d'organes, chacune portant ses libellés."""
    sections = []
    for sec in d.get("sections") or []:
        champs = [c for c in (sec.get("champs") or []) if rempli(c)]
        sections.append({"n": sec.get("n"), "rang": sec.get("rang"),
                         "organe": sec.get("organe"),
                         "titre": sec.get("titre") or sec.get("organe"),
                         "champs": champs,
                         "anormaux": [c for c in champs if c.get("etat") == "anormal"],
                         "total": len(sec.get("champs") or []),
                         "faits": len(champs)})
    return {"present": bool(sections), "sections": sections,
            "terme_sa": d.get("terme_sa"),
            "anormaux": [(s["titre"], c) for s in sections for c in s["anormaux"]]}


def _bloc(texte, titre):
    """Un bloc du compte rendu composé par une grille : ses lignes indentées."""
    m = re.search(r"^" + re.escape(titre) + r"$\n((?:  .+\n?)+)", texte or "", re.M)
    return m.group(1) if m else ""


RE_ANORMAL = re.compile(r"^ {2}(.+?) — ANORMAL$", re.M)
RE_FOETO = re.compile(r"^ {2}(.+?) \[([^\[\]]+)\]$", re.M)


def _grille(module, d):
    """Une grille d'organe. Son texte fait foi, on n'en refabrique pas un autre.

    Les libellés des signes vivent dans le HTML de la grille et ne sortent pas
    dans le JSON : le seul endroit où ils existent, c'est le compte rendu que
    la grille compose elle-même. On le reprend tel quel, et on en relit deux
    blocs pour la conclusion.

    ponytail: extraction par motif sur SIGNES et TERMES FOETO. Si composer()
    change de forme, ces deux listes tombent à vide — le texte intégral, lui,
    reste juste ; une grille qui exporterait ses libellés ferait tomber ceci.
    """
    cr = d.get("compte_rendu") or ""
    g = d.get("grille") or {}
    return {"module": module,
            "organe": d.get("organe") or module.replace("grille_", ""),
            "source": d.get("source"),
            "terme_sa": d.get("terme_sa"),
            "cote": g.get("cote"),
            "stade": g.get("stade"),
            "compte_rendu": cr.strip(),
            "anormaux": RE_ANORMAL.findall(_bloc(cr, "SIGNES")),
            "foeto": [{"label": a, "id": b}
                      for a, b in RE_FOETO.findall(_bloc(cr, "TERMES FOETO"))],
            "libre": (g.get("libre") or "").strip()}


def phrases_cr(racine):
    """Le cr_phrases.json du dernier paquet data_hub repris, ou {}.

    Relu à chaque compte rendu : un paquet se remplace sans redémarrer.
    """
    f = Path(racine) / "biblio" / "cr_phrases.json" if racine else None
    try:
        return json.loads(f.read_text(encoding="utf-8")) if f and f.is_file() else {}
    except (OSError, json.JSONDecodeError):
        return {}


def composer_placenta(d, phrases, ref):
    """La microscopie placentaire section par section, à la manière de LumiV3.

    Une section porte les phrases des termes FOETO posés qui y sont rangés.
    Sans terme, elle reçoit son texte normal seulement si le groupe de la
    grille qui l'atteste a été exploré (au moins un signe « normal ») et n'a
    rien d'anormal ; sinon elle ne s'écrit pas — on n'affirme pas ce qui n'a
    pas été regardé. Renvoie None sans paquet ou sans références.
    """
    if not phrases or not ref:
        return None
    g = d.get("grille") or {}
    termes = phrases.get("termes") or {}
    poses = list((g.get("foeto") or {}).keys())
    etat = {}
    for k, v in (g.get("signes") or {}).items():
        sg = (ref.get("signes") or {}).get(k)
        if sg and v in ("normal", "anormal"):
            e = etat.setdefault(sg["groupe"], {"normal": 0, "anormal": []})
            if v == "normal":
                e["normal"] += 1
            else:
                e["anormal"].append(sg["label"])
    sections, ranges = [], set()
    for sec in phrases.get("sections") or []:
        if sec.get("domaine") != "placenta":
            continue
        ici = [i for i in poses if (termes.get(i) or {}).get("section") == sec["id"]]
        ranges.update(ici)
        gr = (ref.get("sections_cr") or {}).get(sec["id"])
        e = etat.get(gr) or {"normal": 0, "anormal": []}
        if ici:
            texte, statut = " ".join((termes[i].get("phrase") or termes[i].get("label") or i).rstrip(".") + "."
                                     for i in ici), "lesion"
        elif gr and e["normal"] and not e["anormal"]:
            texte, statut = sec.get("texte_normal"), "normal"
        else:
            texte, statut = None, ("anomalie_sans_terme" if e["anormal"] else "non_atteste")
        sections.append({"id": sec["id"], "label": sec["label"], "statut": statut, "texte": texte})
    groupes = (ref.get("groupes") or {})
    return {"sections": sections,
            "hors_section": [(termes.get(i) or {}).get("label") or i for i in poses if i not in ranges],
            "anormaux_sans_terme": {groupes.get(k, k): v["anormal"] for k, v in etat.items() if v["anormal"]}}


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
    plac = (s.get("macro_placenta") or {}).get("donnees", {})
    mic = (s.get("micro") or {}).get("donnees", {})
    # Les grilles arrivent une par organe ; l'ordre alphabétique vaut le hasard
    # d'ingestion, et la grille du placenta se lit avec la macro placentaire.
    grilles = [_grille(m, v["donnees"]) for m, v in sorted(s.items())
               if m.startswith("grille_")]
    phrases = phrases_cr(refs.racine)
    for gr in grilles:
        if gr["module"] == "grille_placenta":
            gr["composition"] = composer_placenta(s["grille_placenta"]["donnees"], phrases,
                                                  refs.grille_placenta)

    # Le terme : celui de l'administratif fait autorité, les modules le
    # redonnent et peuvent diverger — on le dit plutôt que de choisir seul.
    issue = admin.get("issue") or {}
    sa = issue.get("terme_sa") if issue.get("terme_sa") is not None else d.get("terme_sa")
    j = issue.get("terme_j") if issue.get("terme_j") is not None else d.get("terme_jours")
    termes_vus = {}
    for nom, doc in (("autopsie", aut), ("neuropath", neu), ("micro", mic)):
        if doc.get("terme_sa") is not None:
            termes_vus[nom] = doc["terme_sa"]
    for sec in plac.get("sections") or []:
        t_pl = (sec.get("champs") or {}).get("terme_sa")
        if t_pl is not None:
            termes_vus["macro_placenta"] = t_pl
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
                    "z_gc": r.get("z_gc"), "z_ma": r.get("z_ma"), "z_mb": r.get("z_mb"),
                    "attendu_gc": r.get("attendu_gc"), "attendu_ma": r.get("attendu_ma"),
                    "alerte": r.get("alerte", False),
                    "z_module": z_module.get(c["id"]) or {},
                })

    # Biométrie externe : libellé, valeur, unité, DS. L'unité et le libellé
    # viennent du document (biométrie ≥ 1.3.1 / 1.3.0), sinon des références ;
    # le DS d'ici quand les tables sont là, sinon celui du module.
    ref_mes = refs.biometrie_clinique.get("mesures") or {}
    lignes_bio = []
    for cle, v in mesures.items():
        r = z.get("bio_" + cle)
        if not r:
            em = (bio.get("ecarts") or {}).get(cle) or {}
            r = {"z_" + k.lower(): em.get(k) for k in ("GC", "MA", "MB")}
        lignes_bio.append({
            "cle": cle, "label": (bio.get("libelles") or {}).get(cle) or (ref_mes.get(cle) or {}).get("libelle") or cle, "valeur": v,
            "unite": (bio.get("unites") or {}).get(cle) or (ref_mes.get(cle) or {}).get("unite") or "",
            "z_gc": r.get("z_gc"), "z_ma": r.get("z_ma"), "z_mb": r.get("z_mb"),
            "alerte": any(x is not None and abs(x) >= biometrie.SEUIL_ALERTE
                          for x in (r.get("z_gc"), r.get("z_ma"), r.get("z_mb"))),
        })

    # Examen clinique : en 0.1.0 les anomalies sont des libellés, en 0.2.0 des
    # {label, hpo_id}. Les gabarits reçoivent des libellés, le code HPO voyage
    # à côté pour les propositions.
    anormaux = []
    for e in clin.get("etages") or []:
        for i in e.get("items") or []:
            if i.get("etat") == "anormal":
                codes = [x if isinstance(x, dict) else {"label": x, "hpo_id": None}
                         for x in i.get("anomalies") or []]
                anormaux.append({"etage": e.get("titre"), "id": i.get("id") or i.get("label"),
                                 "label": i.get("label"),
                                 "anomalies": [x.get("label") for x in codes],
                                 "codes": codes,
                                 "precisions": i.get("precisions")})

    photos = [dict(r) for r in cx.execute(
        """SELECT p.module, p.cle, p.label, p.etape, p.chemin
             FROM photos p JOIN saisies s ON s.id = p.saisie_id AND s.courant = 1
            WHERE p.dossier=? ORDER BY p.module, p.cle""", (numero,))]

    ctx = {
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
        "biometrie": {"mesures": mesures, "lignes": lignes_bio, "sexe": bio.get("sexe")},
        "radio": rad,
        "autopsie": {"etapes": _trame(aut), "masses": lignes_masses,
                     "maceration": aut.get("maceration_maroun"),
                     "ouverture_at": aut.get("ouverture_at")},
        "placenta": _placenta(plac),
        "micro": _micro(mic),
        "grilles": grilles,
        "grille_placenta": next((g for g in grilles
                                 if g["module"] == "grille_placenta"), None),
        "grilles_foetales": [g for g in grilles if g["module"] != "grille_placenta"],
        "neuropath": {"etapes": _trame(neu)},
        "z": z,
        "z_divergences": divergences,
        "z_cause_terme": cause_terme,
        "z_terme_module": terme_module,
        "references": {"dispo": refs.dispo, "sources": refs.sources,
                       "erreurs": refs.erreurs},
        "cliches": photos,
    }
    # Sans validation (aperçu, appel direct), tout ce qui est proposé est retenu.
    ctx["propositions"] = propositions(ctx)
    ctx["retenues"], ctx["ecartees"] = ctx["propositions"], []
    return ctx


def propositions(ctx):
    """Tout l'anormal du dossier, un constat par ligne, à valider avant le CR.

    Rien n'est interprété : on reprend ce que les modules ont coché anormal et
    les mesures à 2 DS ou plus. L'identifiant est stable d'un brouillon à
    l'autre — un constat écarté le reste, un constat apparu depuis arrive coché.
    """
    out = []

    def p(id_, groupe, libelle, detail=None, code=None):
        out.append({"id": id_, "groupe": groupe, "libelle": libelle,
                    "detail": detail or None, "code": code})

    for a in ctx["clinique"]["anormaux"]:
        if a["codes"]:
            for x in a["codes"]:
                p(f"clin:{a['id']}:{x.get('hpo_id') or x.get('label')}", "Examen externe",
                  x.get("label"), " — ".join(filter(None, [a["label"], a["precisions"]])),
                  x.get("hpo_id"))
        else:
            p(f"clin:{a['id']}", "Examen externe", a["label"], a["precisions"])
    for l in ctx["biometrie"]["lignes"]:
        if l["alerte"]:
            p(f"bio:{l['cle']}", "Biométrie externe", l["label"],
              f"{fr(l['valeur'])} {l['unite']} ({ds3(l)})")
    for m in ctx["autopsie"]["masses"]:
        if m["alerte"]:
            p(f"masse:{m['id']}", "Masses d'organes", m["label"], f"{m['detail']} ({ds3(m)})")
    for e in ctx["autopsie"]["etapes"]:
        for c in e["champs"]:
            for h in c.get("hpo") or [] if c.get("type") == "chips" else []:
                p(f"aut:{c.get('id')}:{h.get('hpo_id')}", "Examen interne", h.get("label"),
                  f"{e['titre']} — {c.get('label')}", h.get("hpo_id"))
    rad = ctx["radio"]
    for h in rad.get("hpo") or []:
        p(f"radio:{h.get('code')}", "Imagerie", h.get("term_fr") or h.get("code"),
          None, h.get("code"))
    for nom, o in ((rad.get("biometries") or {}).get("os_longs") or {}).items():
        z = (o or {}).get("zscore_chitty")
        if z is not None and abs(z) >= biometrie.SEUIL_ALERTE:
            p(f"os:{nom}", "Imagerie", nom, f"{fr(o.get('moyenne'))} mm ({zt(z)}, Chitty)")
    for titre, c in ctx["micro"]["anormaux"]:
        p(f"micro:{titre}:{c.get('id')}", "Microscopie", f"{titre} — {c.get('label')}",
          ", ".join(list(c.get("termes") or []) + ([c["autre"]] if c.get("autre") else [])))
    for g in ctx["grilles"]:
        for a in g["anormaux"]:
            p(f"grille:{g['module']}:{a}", "Grilles de lecture", f"{g['organe'].capitalize()} — {a}")
        for f in g["foeto"]:
            p(f"foeto:{g['module']}:{f['id']}", "Grilles de lecture", f["label"],
              f"terme posé à la grille {g['organe']}", f["id"])
    for e in ctx["neuropath"]["etapes"]:
        for c in e["champs"]:
            z = (c.get("zscore") or {}).get("z")
            if z is not None and abs(z) >= biometrie.SEUIL_ALERTE:
                p(f"neuro:{c.get('id')}", "Neuropathologie", c.get("label"),
                  f"{valeur_champ(c)} ({zt(z)} contre {c['zscore'].get('reference')})")
    return out


# ══════════════════════════════════════════════════════════════════════════════
# Rendu
# ══════════════════════════════════════════════════════════════════════════════

def format_de(texte):
    """« html » si l'en-tête du gabarit porte {# format: html #}, sinon « texte »."""
    m = re.search(r"\{#\s*format:\s*(\w+)\s*#\}", (texte or "")[:600])
    return "html" if m and m.group(1) == "html" else "texte"


def environnement(html=False):
    if not JINJA:
        raise RuntimeError("Jinja2 est absent — il vient avec Flask : pip install flask")
    # Bac à sable et non Environment : la page Comptes rendus laisse écrire
    # un gabarit à la main, et un Environment ordinaire laisse un gabarit
    # remonter jusqu'à `os` par les attributs internes des objets Python
    # (`{{ cycler.__init__.__globals__.os }}`). Le bac à sable interdit ces
    # accès ; les filtres et globals déclarés ci-dessous restent disponibles.
    env = SandboxedEnvironment(loader=FileSystemLoader(str(GABARITS)),
                               trim_blocks=True, lstrip_blocks=True,
                               keep_trailing_newline=True, autoescape=html)
    env.filters.update(fr=fr, dtc=dtc, zt=zt, ds3=ds3, valeur=valeur_champ, phrase=phrase)
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
    fmt = format_de(texte)
    rendu = environnement(fmt == "html").from_string(texte).render(**ctx)
    return re.sub(r"\n{3,}", "\n\n", rendu).strip() + "\n", fmt


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
                       "version": ver.group(1) if ver else "1.0.0",
                       "format": format_de(tete)}
    return out


def ecartees_precedentes(cx, numero):
    """Les propositions écartées au dernier brouillon du dossier : le choix se
    garde d'un brouillon à l'autre."""
    r = cx.execute("""SELECT ecartees FROM comptes_rendus
                       WHERE dossier=? AND ecartees IS NOT NULL
                       ORDER BY id DESC LIMIT 1""", (numero,)).fetchone()
    return json.loads(r[0]) if r else []


def rendre(cx, numero, gabarit, refs, modules_attendus, operateur=None, ecartees=None):
    """Produit le compte rendu et l'enregistre. Renvoie (id, texte, format).

    `ecartees` : identifiants des propositions refusées à la validation ; None
    reprend le choix du dernier brouillon.
    """
    dispo = gabarits_disponibles()
    if gabarit not in dispo:
        raise ValueError(f"gabarit « {gabarit} » inconnu "
                         f"(disponibles : {', '.join(dispo) or 'aucun'})")
    ctx = contexte(cx, numero, refs, modules_attendus)
    if ecartees is None:
        ecartees = ecartees_precedentes(cx, numero)
    ecartees = set(ecartees)
    ctx["retenues"] = [p for p in ctx["propositions"] if p["id"] not in ecartees]
    ctx["ecartees"] = [p for p in ctx["propositions"] if p["id"] in ecartees]
    fmt = dispo[gabarit]["format"]
    texte = environnement(fmt == "html").get_template(gabarit + ".jinja2").render(**ctx)
    texte = re.sub(r"\n{3,}", "\n\n", texte).strip() + "\n"
    cur = cx.execute("""INSERT INTO comptes_rendus
                          (dossier, gabarit, gabarit_version, texte, operateur, format, ecartees)
                        VALUES (?,?,?,?,?,?,?)""",
                     (numero, gabarit, dispo[gabarit]["version"], texte, operateur, fmt,
                      json.dumps(sorted(ecartees), ensure_ascii=False)))
    cx.commit()
    return cur.lastrowid, texte, fmt
