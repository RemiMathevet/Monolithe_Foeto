#!/usr/bin/env python3
# SPDX-License-Identifier: CC-BY-NC-SA-4.0 | Hub Light | Monolithe_Foeto
"""
Reprise des JSON des modules de saisie dans la base de travail.

    python app/ingest.py              ingère tout ce qui est dans arrivee/   (ou hub/ingest.bat)
    python app/ingest.py --init       crée seulement la base et l'arborescence
    python app/ingest.py --dry-run    montre ce qui serait fait, n'écrit rien
    python app/ingest.py --rejouer    vide la base et rejoue toute l'archive
    python app/ingest.py --base D:\\hub  travaille sur une autre racine

    Le code est dans hub/app/, les données à la racine du hub (un cran
    au-dessus) : c'est cette racine que --base désigne par défaut.

Arborescence, créée au besoin, à la racine du hub par défaut :

    hub/
      arrivee/          les JSON déposés à la main depuis le téléphone
      archive/<dossier>/  les JSON ingérés, jamais modifiés — la source de vérité
      rejets/           ce qui n'est pas passé, avec un .txt qui dit pourquoi
      photos/<dossier>/<module>/  les JPEG reconstitués depuis le base64
      hub.sqlite        la base de travail, reconstructible depuis archive/
      index.json        l'index lu par dossiers.html
      app/              le code, et migrations/ — les scripts de schéma, appliqués dans l'ordre

Rien d'autre que la bibliothèque standard n'est nécessaire. Si Pillow est
installé il sert à vérifier que chaque JPEG décodé s'ouvre vraiment et à
fabriquer une vignette ; sinon on se contente des octets d'en-tête et le
tableau affiche les clichés en pleine taille.
"""

import argparse
import base64
import binascii
import datetime as dt
import hashlib
import json
import os
import re
import shutil
import sqlite3
import sys
import traceback
import zipfile
from pathlib import Path

try:
    from PIL import Image
    PILLOW = True
except Exception:
    PILLOW = False

ICI = Path(__file__).resolve().parent        # hub/app — le code et ses migrations
RACINE_DEFAUT = ICI.parent                    # hub/     — la base et les dossiers de travail
# Libre, comme dans les modules ; on refuse seulement ce qui ne peut pas
# devenir un nom de répertoire sûr sous archive/ et photos/ (séparateurs,
# « .. », espaces, 64 caractères au plus).
DOSSIER_RE = re.compile(r"^[A-Za-z0-9][A-Za-z0-9._-]{0,63}$")
# Clé d'un cliché : elle devient un nom de fichier sous photos/, donc rien
# d'autre que des caractères sûrs — ni « / », ni « .. », ni espace.
CLE_PHOTO_RE = re.compile(r"^[A-Za-z0-9_-]{1,64}$")
VIGNETTE = 320  # côté long de la vignette, en pixels


# ══════════════════════════════════════════════════════════════════════════════
# Petits utilitaires
# ══════════════════════════════════════════════════════════════════════════════

class Refus(Exception):
    """JSON inexploitable : on le met de côté avec son motif, on continue."""


def sha256(donnees: bytes) -> str:
    return hashlib.sha256(donnees).hexdigest()


def horodatage() -> str:
    return dt.datetime.now().strftime("%Y%m%d-%H%M%S")


def num(v):
    """Un nombre, ou None. '' et 'err' ne sont pas des nombres."""
    if v is None or isinstance(v, bool) or v == "":
        return None
    try:
        return float(v)
    except (TypeError, ValueError):
        return None


def entier(v):
    n = num(v)
    return None if n is None else int(n)


def bool01(v):
    """Le JSON mélange booléens vrais et chaînes 'true'/'false' selon les champs."""
    if v is None or v == "" or v == "UNK":
        return None
    if isinstance(v, bool):
        return 1 if v else 0
    if isinstance(v, str):
        if v.lower() in ("true", "oui", "1"):
            return 1
        if v.lower() in ("false", "non", "0"):
            return 0
    return None


def libelle(v):
    """Une puce : chaîne en 0.1.0, {label, hpo_id} depuis 0.2.0 — on rend (label, hpo_id)."""
    if isinstance(v, dict):
        return txt(v.get("label")), txt(v.get("hpo_id"))
    return txt(v), None


def txt(v):
    if v is None:
        return None
    if isinstance(v, (dict, list)):
        return json.dumps(v, ensure_ascii=False)
    v = str(v).strip()
    return v or None


def date_precise(v):
    """Les dates du module administratif sont des objets à précision variable.

    {annee, mois, jour, precision} → ('2026-03-14', 'jour'). Une date connue
    au mois près ne devient pas un 1er du mois : on tronque le texte ISO et on
    garde la précision à côté. 'err' (saisie illisible) ressort en (None, 'err').
    """
    if v is None or v == "":
        return None, None
    if v == "err":
        return None, "err"
    if isinstance(v, str):
        return v, "jour" if len(v) == 10 else None
    if not isinstance(v, dict):
        return None, None
    a, m, j = v.get("annee"), v.get("mois"), v.get("jour")
    p = v.get("precision")
    if a is None:
        return None, p
    if m is None:
        return f"{a:04d}", p
    if j is None:
        return f"{a:04d}-{m:02d}", p
    return f"{a:04d}-{m:02d}-{j:02d}", p


def bam(v, cle):
    return v.get(cle) if isinstance(v, dict) else None


# ══════════════════════════════════════════════════════════════════════════════
# Clichés : du base64 au JPEG sur disque
# ══════════════════════════════════════════════════════════════════════════════

MAGIE = {
    b"\xff\xd8\xff": ("image/jpeg", ".jpg"),
    b"\x89PNG": ("image/png", ".png"),
    b"RIFF": ("image/webp", ".webp"),
}


def reconnait(octets: bytes):
    for magie, (mime, ext) in MAGIE.items():
        if octets.startswith(magie):
            return mime, ext
    return None, None


def ecrire_cliche(octets: bytes, cible: Path, faire_vignette: bool):
    """Écrit l'image et, si Pillow est là, vérifie qu'elle s'ouvre + vignette."""
    cible.parent.mkdir(parents=True, exist_ok=True)
    cible.write_bytes(octets)
    if not PILLOW:
        return None
    try:
        with Image.open(cible) as im:
            im.verify()
    except Exception as e:
        cible.unlink(missing_ok=True)
        raise Refus(f"cliché illisible après décodage ({e})")
    if not faire_vignette:
        return None
    vig = cible.parent / "vignettes" / cible.name
    vig.parent.mkdir(parents=True, exist_ok=True)
    try:
        with Image.open(cible) as im:
            im = im.convert("RGB")
            im.thumbnail((VIGNETTE, VIGNETTE))
            im.save(vig, "JPEG", quality=72)
        return vig
    except Exception:
        return None


# ══════════════════════════════════════════════════════════════════════════════
# Adaptateurs : un par couple (module, schema_version)
#
# Chaque adaptateur reçoit (cx, saisie_id, dossier, data) et remplit les tables
# de son module. Ajouter une version de schéma = ajouter une entrée ici et la
# migration SQL qui va avec ; les anciens JSON restent lisibles par l'ancien
# adaptateur, ce qui est tout l'intérêt de garder l'archive.
# ══════════════════════════════════════════════════════════════════════════════

def ins(cx, table, **champs):
    cols = ", ".join(champs)
    trous = ", ".join("?" * len(champs))
    cur = cx.execute(f"INSERT INTO {table} ({cols}) VALUES ({trous})", tuple(champs.values()))
    return cur.lastrowid


# ── administratif 0.3.0 ──────────────────────────────────────────────────────

def adapt_administratif(cx, sid, dossier, d):
    ident = d.get("identite", {}) or {}
    circ = d.get("circuit", {}) or {}
    issue = d.get("issue", {}) or {}
    mat = d.get("atcd_mat", {}) or {}
    obs = d.get("atcd_obs", {}) or {}
    gro = d.get("grossesse", {}) or {}
    pre = d.get("prenatal", {}) or {}
    fdr = mat.get("fdr", {}) or {}
    b = issue.get("bamara") or {}

    ddn, ddn_p = date_precise(ident.get("ddn_mere"))
    dd, dd_p = date_precise(circ.get("date_deces"))
    dr, dr_p = date_precise(circ.get("date_reception"))
    de, de_p = date_precise(circ.get("date_examen"))
    ddg, ddg_p = date_precise(gro.get("ddg"))

    ins(cx, "admin_dossier",
        saisie_id=sid, dossier=dossier,
        nom_mere=txt(ident.get("nom_mere")), nom_naiss=txt(ident.get("nom_naiss")),
        prenom_mere=txt(ident.get("prenom_mere")), ddn_mere=ddn, ddn_mere_precision=ddn_p,
        prenom_foetus=txt(ident.get("prenom_foetus")), ipp=txt(ident.get("ipp")),
        ipp_fetus=txt(ident.get("ipp_fetus")), ins=txt(ident.get("ins")),
        id_ext=txt(ident.get("id_ext")), opposition=bool01(ident.get("opposition")),
        date_deces=dd, date_deces_precision=dd_p,
        date_reception=dr, date_reception_precision=dr_p,
        date_examen=de, date_examen_precision=de_p,
        medecin=txt(circ.get("medecin")), medecin_rpps=txt(circ.get("medecin_rpps")),
        service=txt(circ.get("service")), ville_maternite=txt(circ.get("ville_maternite")),
        type_issue=txt(issue.get("type_issue")), terme_sa=entier(issue.get("terme_sa")),
        terme_j=entier(issue.get("terme_j")), sexe=txt(issue.get("sexe")),
        voie=txt(issue.get("voie")), multiple=bool01(issue.get("multiple")),
        indication=txt(issue.get("indication")),
        bamara_birth=bool01(bam(b, "birth")),
        bamara_termination_type=txt(bam(b, "termination_type")),
        bamara_stp_type=txt(bam(b, "stp_type")),
        profession_mere=txt(mat.get("profession_mere")),
        groupe_sanguin=txt(mat.get("groupe_sanguin")), rhesus=txt(mat.get("rhesus")),
        consanguinite=txt(mat.get("consanguinite")),
        fdr_hta=bool01(fdr.get("hta")), fdr_diabete=bool01(fdr.get("diabete")),
        fdr_tabac=bool01(fdr.get("tabac")), fdr_alcool=bool01(fdr.get("alcool")),
        atcd_medicaux=txt(mat.get("atcd_medicaux")), traitements=txt(mat.get("traitements")),
        gestite=entier(obs.get("gestite")), parite=entier(obs.get("parite")),
        mode_conception=txt(gro.get("mode_conception")), amp_type=txt(gro.get("amp_type")),
        ddg=ddg, ddg_precision=ddg_p, lieu_suivi=txt(gro.get("lieu_suivi")),
        risque_t21=txt(gro.get("risque_t21")), bhcg=num(gro.get("bhcg")),
        pappa=num(gro.get("pappa")), lcc=num(gro.get("lcc")), cn=num(gro.get("cn")),
        histoire_clinique=txt(gro.get("histoire_clinique")),
        contexte_clinique=txt(gro.get("contexte_clinique")),
        echo_t1=txt(pre.get("echo_t1")), echo_t1_details=txt(pre.get("echo_t1_details")),
        echo_t2=txt(pre.get("echo_t2")), echo_t2_details=txt(pre.get("echo_t2_details")),
        echo_t3=txt(pre.get("echo_t3")), echo_t3_details=txt(pre.get("echo_t3_details")),
        autres_examens=txt(pre.get("autres_examens")))

    for r, g in enumerate(obs.get("grossesses") or [], 1):
        db_, db_p = date_precise(g.get("date_debut"))
        df, df_p = date_precise(g.get("date_fin"))
        gid = ins(cx, "admin_grossesses",
                  saisie_id=sid, dossier=dossier, rang=r,
                  date_debut=db_, date_debut_precision=db_p,
                  date_fin=df, date_fin_precision=df_p,
                  amp=txt(g.get("amp")), voie=txt(g.get("voie")),
                  nb_fetus=entier(g.get("nb_fetus")),
                  multiple=bool01(g.get("is_multiple_pregnancy")))
        for f in g.get("foetus") or []:
            fb = f.get("bamara") or {}
            fd, fd_p = date_precise(f.get("date_deces"))
            ins(cx, "admin_grossesse_foetus",
                grossesse_id=gid, rang=entier(f.get("multiple_preg_order")) or 1,
                prenom=txt(f.get("prenom")), sexe=txt(f.get("sexe")),
                issue=txt(f.get("issue")), terme=entier(f.get("terme")),
                date_deces=fd, date_deces_precision=fd_p,
                foetopath=txt(f.get("foetopath")), percentile=num(f.get("percentile")),
                remarques=txt(f.get("remarques")),
                bamara_birth=bool01(bam(fb, "birth")),
                bamara_termination_type=txt(bam(fb, "termination_type")),
                bamara_stp_type=txt(bam(fb, "stp_type")))

    for r, c in enumerate(gro.get("chronologie") or [], 1):
        dc, dc_p = date_precise(c.get("date"))
        sa = c.get("sa") or {}
        ins(cx, "admin_chronologie",
            saisie_id=sid, dossier=dossier, rang=r, date=dc, date_precision=dc_p,
            type=txt(c.get("type")), texte=txt(c.get("texte")),
            sa_total_j=entier(sa.get("total_j")), sa=entier(sa.get("sa")),
            sa_j=entier(sa.get("j")))

    for m in d.get("coherence") or []:
        ins(cx, "admin_coherence", saisie_id=sid, dossier=dossier, message=txt(m))

    # Le module administratif renseigne la fiche de synthèse du dossier.
    cx.execute("""UPDATE dossiers SET terme_sa=?, terme_jours=?, sexe=?, type_issue=?,
                         date_reception=?, date_examen=?, indication=?
                   WHERE numero=?""",
               (entier(issue.get("terme_sa")), entier(issue.get("terme_j")),
                txt(issue.get("sexe")), txt(issue.get("type_issue")),
                dr, de, txt(issue.get("indication")), dossier))


# ── examen_clinique 0.1.0 ────────────────────────────────────────────────────

def adapt_examen_clinique(cx, sid, dossier, d):
    n_faits = n_anormaux = 0
    rang = 0
    for e in d.get("etages") or []:
        for it in e.get("items") or []:
            rang += 1
            etat = it.get("etat")
            if etat:
                n_faits += 1
            if etat == "anormal":
                n_anormaux += 1
            iid = ins(cx, "examen_clinique_items",
                      saisie_id=sid, dossier=dossier,
                      etage_id=e.get("id"), etage_titre=txt(e.get("titre")), rang=rang,
                      item_id=it.get("id"), item_label=txt(it.get("label")),
                      etat=etat, precisions=txt(it.get("precisions")))
            for a in it.get("anomalies") or []:
                lab, hpo = libelle(a)
                ins(cx, "examen_clinique_anomalies", item_id=iid, valeur=lab, hpo_id=hpo)
    for c in d.get("cliches_libres") or []:
        ins(cx, "examen_clinique_cliches_libres",
            saisie_id=sid, dossier=dossier, cle=c.get("key"), label=txt(c.get("label")),
            etage=txt(c.get("etage")), item=txt(c.get("item")))
    ins(cx, "examen_clinique", saisie_id=sid, dossier=dossier,
        trame_attendue=entier(d.get("trame_attendue")),
        items_renseignes=n_faits, items_anormaux=n_anormaux)


# ── biometrie_clinique 0.1.0 ─────────────────────────────────────────────────

def adapt_biometrie_clinique(cx, sid, dossier, d):
    t = d.get("terme") or {}
    ins(cx, "biometrie_clinique", saisie_id=sid, dossier=dossier,
        terme_sa=entier(t.get("sa")), terme_jours=entier(t.get("jours")),
        sexe=txt(d.get("sexe")))
    for cle, v in (d.get("mesures") or {}).items():
        ins(cx, "biometrie_clinique_mesures",
            saisie_id=sid, dossier=dossier, cle=cle, valeur=num(v))


# ── radio 0.1.0 ──────────────────────────────────────────────────────────────

def adapt_radio(cx, sid, dossier, d):
    t = d.get("terme") or {}
    sq = d.get("squelette") or {}
    cotes = sq.get("cotes") or {}
    vert = sq.get("vertebres") or {}
    os_ = sq.get("aspect_os") or {}
    bio = d.get("biometries") or {}
    sc = d.get("scores_staturaux") or {}
    ins(cx, "radio", saisie_id=sid, dossier=dossier,
        terme_sa=entier(t.get("sa")), terme_jours=entier(t.get("jours")),
        aspect_general=txt(sq.get("aspect_general")),
        cotes_droite=entier(cotes.get("droite")), cotes_gauche=entier(cotes.get("gauche")),
        thorax_forme=txt(sq.get("thorax_forme")),
        vertebres_remarques=txt(vert.get("remarques")),
        os_remarques=txt(os_.get("remarques")),
        bip_osseux_mm=num(bio.get("bip_osseux_mm")), pc_radio_mm=num(bio.get("pc_radio_mm")),
        hadlock_sa=num(sc.get("hadlock_sa")), adalian_sa=num(sc.get("adalian_sa")),
        remarques=txt(d.get("remarques")))
    for groupe, liste in (("vertebres", vert.get("aspects")), ("os", os_.get("aspects"))):
        for v in liste or []:
            ins(cx, "radio_chips", saisie_id=sid, dossier=dossier, groupe=groupe, valeur=txt(v))
    for nom, o in (bio.get("os_longs") or {}).items():
        o = o or {}
        ins(cx, "radio_os_longs", saisie_id=sid, dossier=dossier, os=nom,
            droite=num(o.get("droite")), gauche=num(o.get("gauche")),
            moyenne=num(o.get("moyenne")), zscore_chitty=num(o.get("zscore_chitty")))
    for m in d.get("maturation_osseuse") or []:
        ins(cx, "radio_maturation", saisie_id=sid, dossier=dossier,
            sa=entier(m.get("sa")), label=txt(m.get("label")), statut=txt(m.get("status")))
    for h in d.get("hpo") or []:
        ins(cx, "radio_hpo", saisie_id=sid, dossier=dossier,
            code=txt(h.get("code")), term_fr=txt(h.get("term_fr")), source=txt(h.get("source")))


# ── autopsie 0.1.0 et neuropath 0.1.0 : même forme d'étapes/champs ───────────

def _champ_commun(c):
    """Les parties communes aux deux trames à champs typés."""
    t = c.get("type")
    v = c.get("valeur")
    return dict(
        champ_id=c.get("id"), champ_label=txt(c.get("label")), type=t,
        valeur_txt=txt(v) if t in ("txt", "text", "sel") else None,
        valeur_num=num(v) if t in ("num", "mes", "calc") else None,
        valeur_bool=bool01(v) if t == "bool" else None,
        unite=txt(c.get("unite")),
    )


def adapt_autopsie(cx, sid, dossier, d):
    ins(cx, "autopsie", saisie_id=sid, dossier=dossier,
        ouverture_at=txt(d.get("ouverture_at")),
        terme_sa=entier(d.get("terme_sa")), terme_jours=entier(d.get("terme_jours")),
        maceration_maroun=entier(d.get("maceration_maroun")),
        trame_attendue=entier(d.get("trame_attendue")),
        champs_renseignes=0)
    rang = faits = 0
    for e in d.get("etapes") or []:
        for c in e.get("champs") or []:
            rang += 1
            base = _champ_commun(c)
            z = c.get("zscores") or {}
            if c.get("type") == "masse2":
                base.update(droite=num(c.get("droite")), gauche=num(c.get("gauche")),
                            total=num(c.get("total")))
            elif c.get("type") == "masse":
                base.update(total=num(c.get("grammes")))
            base.update(z_gc=num(z.get("gc")), z_ma=num(z.get("ma")), z_mb=num(z.get("mb")))
            cid = ins(cx, "autopsie_champs", saisie_id=sid, dossier=dossier,
                      etape_id=e.get("id"), etape_titre=txt(e.get("titre")), rang=rang, **base)
            puces = c.get("valeurs") or []
            for v in puces:
                lab, hpo = libelle(v)
                ins(cx, "autopsie_chips", champ_id=cid, valeur=lab, hpo_id=hpo)
            if puces or base["valeur_txt"] is not None or base["valeur_num"] is not None \
               or base["valeur_bool"] is not None or base.get("total") is not None:
                faits += 1
    for c in d.get("cliches_libres") or []:
        ins(cx, "autopsie_cliches_libres", saisie_id=sid, dossier=dossier,
            cle=c.get("key"), label=txt(c.get("label")), etape=txt(c.get("etape")))
    cx.execute("UPDATE autopsie SET champs_renseignes=? WHERE saisie_id=?", (faits, sid))


def adapt_neuropath(cx, sid, dossier, d):
    ins(cx, "neuropath", saisie_id=sid, dossier=dossier,
        terme_sa=entier(d.get("terme_sa")), terme_jours=entier(d.get("terme_jours")),
        trame_attendue=entier(d.get("trame_attendue")), champs_renseignes=0)
    rang = faits = 0
    for e in d.get("etapes") or []:
        for c in e.get("champs") or []:
            rang += 1
            base = _champ_commun(c)
            z = c.get("zscore") or {}
            base.update(z=num(z.get("z")), z_reference=txt(z.get("reference")),
                        z_source=txt(z.get("source")),
                        attendu_m=num(z.get("attendu_m")), attendu_sd=num(z.get("attendu_sd")))
            cid = ins(cx, "neuropath_champs", saisie_id=sid, dossier=dossier,
                      etape_id=e.get("id"), etape_titre=txt(e.get("titre")), rang=rang, **base)
            puces = c.get("valeurs") or []
            for v in puces:
                lab, hpo = libelle(v)
                ins(cx, "neuropath_chips", champ_id=cid, valeur=lab, hpo_id=hpo)
            if puces or base["valeur_txt"] is not None or base["valeur_num"] is not None \
               or base["valeur_bool"] is not None:
                faits += 1
    for c in d.get("cliches_libres") or []:
        ins(cx, "neuropath_cliches_libres", saisie_id=sid, dossier=dossier,
            cle=c.get("key"), label=txt(c.get("label")), etape=txt(c.get("etape")))
    cx.execute("UPDATE neuropath SET champs_renseignes=? WHERE saisie_id=?", (faits, sid))


def adapt_microscopie(cx, sid, dossier, d):
    """Les dix-sept grilles de lecture, par un seul adaptateur.

    Elles partagent l'enveloppe mais rien du contenu : chaque organe a ses
    sections, son vocabulaire, ses règles. Écrire dix-sept jeux de colonnes
    serait à refaire à chaque grille rediffusée, et faux le lendemain. On range
    donc à plat ce qui a été posé, chaque feuille sous son chemin en clair —
    « prelev.lobes », « lesions.hypoplasie.2 » — ce qui suffit à chercher un
    signe à travers les dossiers sans rien présumer de la forme des grilles.
    Restituer, ce n'est pas le rôle de cet index : `saisies.donnees_json` fait
    foi, et la grille se relit avec son propre code.
    """
    organe = txt(d.get("organe")) or (d.get("module") or "").replace("grille_", "")
    grille = d.get("grille") or {}

    feuilles = []

    def descendre(v, chemin):
        if v is None or v is False or v == "" or v == [] or v == {}:
            return
        if isinstance(v, dict):
            for k in v:
                descendre(v[k], chemin + [str(k)])
        elif isinstance(v, list):
            for i, x in enumerate(v):
                descendre(x, chemin + [str(i)])
        else:
            feuilles.append((".".join(chemin), v))

    descendre(grille, [])

    ins(cx, "microscopie", saisie_id=sid, dossier=dossier, organe=organe,
        source=txt(d.get("source")), terme_sa=entier(d.get("terme_sa")),
        compte_rendu=txt(d.get("compte_rendu")), valeurs_posees=len(feuilles))
    for chemin, v in feuilles:
        ins(cx, "microscopie_valeurs", saisie_id=sid, dossier=dossier, organe=organe,
            chemin=chemin,
            valeur_txt=v if isinstance(v, str) else None,
            valeur_num=v if isinstance(v, (int, float)) and not isinstance(v, bool) else None,
            valeur_bool=1 if v is True else None)


ENVELOPPE = {"schema_version", "module", "module_version", "dossier", "operateur",
             "exported_at", "photos", "_avertissement_nom"}


def adapt_plat(cx, sid, dossier, d):
    """Un module sans table dédiée (micro.html multi-organes, macro placenta) :
    le payload hors enveloppe est rangé à plat sous son chemin, comme les
    grilles. Assez pour chercher ; `saisies.donnees_json` restitue."""
    feuilles = []

    def descendre(v, chemin):
        if v is None or v is False or v == "" or v == [] or v == {}:
            return
        if isinstance(v, dict):
            for k in v:
                descendre(v[k], chemin + [str(k)])
        elif isinstance(v, list):
            for i, x in enumerate(v):
                descendre(x, chemin + [str(i)])
        else:
            feuilles.append((".".join(chemin), v))

    for k in d:
        if k not in ENVELOPPE:
            descendre(d[k], [k])
    for chemin, v in feuilles:
        ins(cx, "valeurs_plates", saisie_id=sid, dossier=dossier, module=d["module"],
            chemin=chemin,
            valeur_txt=v if isinstance(v, str) else None,
            valeur_num=v if isinstance(v, (int, float)) and not isinstance(v, bool) else None,
            valeur_bool=1 if v is True else None)


# Les grilles de microscopie, telles que leurs fichiers se nomment. Elles
# comptent pour un seul module attendu — voir SLOT ci-dessous.
MODULES_MICRO = [
    "grille_cerveau_moelle", "grille_coeur", "grille_digestif", "grille_foie",
    "grille_gonades", "grille_muscle", "grille_oeil", "grille_oreille",
    "grille_pancreas", "grille_peau", "grille_placenta", "grille_poumon", "grille_rate",
    "grille_rein", "grille_surrenales", "grille_thymus", "grille_thyroide",
    "grille_vessie",
]


# Le registre. Clé : (module, schema_version). C'est lui qui décide ce que la
# base sait lire — il est recopié dans modules_supportes à chaque migration.
ADAPTATEURS = {
    ("administratif",      "0.3.0"): (1, adapt_administratif),
    ("examen_clinique",    "0.1.0"): (1, adapt_examen_clinique),
    ("biometrie_clinique", "0.1.0"): (1, adapt_biometrie_clinique),
    ("radio",              "0.1.0"): (1, adapt_radio),
    ("autopsie",           "0.1.0"): (1, adapt_autopsie),
    ("neuropath",          "0.1.0"): (1, adapt_neuropath),
    # 0004 — schémas courants du dépôt : puces codées HPO (examen, autopsie),
    # position du corps sur les clichés (examen 0.2.1), section FOETO des
    # grilles, micro.html multi-organes et macro placenta à plat.
    ("examen_clinique",    "0.2.0"): (4, adapt_examen_clinique),
    ("examen_clinique",    "0.2.1"): (4, adapt_examen_clinique),
    ("autopsie",           "0.2.0"): (4, adapt_autopsie),
    ("micro",              "0.2.0"): (4, adapt_plat),
    ("macro_placenta",     "0.2.0"): (4, adapt_plat),
}
ADAPTATEURS.update({(m, "0.1.0"): (1, adapt_microscopie) for m in MODULES_MICRO})
ADAPTATEURS.update({(m, "0.2.0"): (4, adapt_microscopie) for m in MODULES_MICRO})

# L'ordre du compte rendu, et celui des onglets de la fiche. La microscopie s'y
# tient entre l'autopsie et la neuropathologie — c'est là qu'elle se fait.
ORDRE_MODULES = ["administratif", "examen_clinique", "biometrie_clinique",
                 "radio", "autopsie", "macro_placenta", "microscopie", "neuropath"]

# Une saisie porte le nom de son module ; la fiche la range dans un créneau.
# Les dix-sept grilles partagent le créneau « microscopie » : un dossier peut
# en avoir zéro, une ou dix-sept, ça reste une seule ligne attendue.
SLOT = {m: "microscopie" for m in MODULES_MICRO}
SLOT["micro"] = "microscopie"


def slot(module):
    """Le créneau d'un module dans la fiche — lui-même, sauf les grilles."""
    return SLOT.get(module, module)


# Un dossier sans microscopie n'est pas incomplet : c'est le cas courant. Le
# créneau existe pour ranger et pour ouvrir les grilles, pas pour réclamer.
MODULES_FACULTATIFS = {"microscopie", "macro_placenta"}


# ══════════════════════════════════════════════════════════════════════════════
# Migrations
# ══════════════════════════════════════════════════════════════════════════════

MODES_JOURNAL = [
    ("wal",      ["PRAGMA journal_mode = WAL"]),
    ("exclusif", ["PRAGMA locking_mode = EXCLUSIVE", "PRAGMA journal_mode = TRUNCATE"]),
    ("memoire",  ["PRAGMA locking_mode = EXCLUSIVE", "PRAGMA journal_mode = MEMORY"]),
]

AVIS_MODE = {
    "exclusif": "mode exclusif — ce disque n'accepte pas les verrous habituels "
                "(lecteur réseau ou dossier synchronisé ?)",
    "memoire":  "journal en mémoire — ce disque n'accepte ni les verrous ni la "
                "troncature de journal. Une coupure en pleine écriture peut abîmer "
                "hub.sqlite ; elle se reconstruit alors par --rejouer, l'archive "
                "restant intacte. Un disque local reste préférable.",
}

# Le témoin ne se contente pas d'une écriture : il enchaîne plusieurs
# instructions et deux transactions, parce que certains partages laissent
# passer la première écriture et refusent la troncature du journal ensuite.
SONDE_SQL = """
CREATE TABLE a (x INTEGER PRIMARY KEY, y TEXT);
CREATE TABLE b (x INTEGER REFERENCES a(x));
CREATE INDEX ib ON b(x);
INSERT INTO a (y) VALUES ('sonde');
INSERT INTO b (x) VALUES (1);
CREATE VIEW v AS SELECT * FROM a;
"""


def _effacer_sonde(sonde: Path):
    for suffixe in ("", "-journal", "-wal", "-shm"):
        try:
            Path(str(sonde) + suffixe).unlink(missing_ok=True)
        except OSError:
            pass


def mode_journal(dossier: Path):
    """Trouve un mode de journal que ce disque accepte, sur un fichier témoin.

    WAL est le bon choix sur un disque local. Mais un lecteur réseau, un
    dossier synchronisé ou un partage monté n'offre pas le verrouillage par
    plages d'octets dont WAL a besoin, et SQLite refuse alors d'écrire avec un
    « disk I/O error » dès la première table — un message qui n'aide personne.
    On retombe sur un verrou exclusif et un journal tronqué, qui s'en passent.
    Contrepartie assumée : un seul écrivain à la fois, ce qui est déjà le cas
    ici puisque le script tourne seul, à la demande.

    L'essai se fait sur un fichier témoin et jamais sur hub.sqlite : une
    tentative ratée laisse derrière elle un journal orphelin, et il n'y a
    aucune raison que ce soit la vraie base qui en hérite.
    """
    # Nom fixe et non horodaté : sur les disques qui refusent aussi la
    # suppression, le témoin survit à l'exécution, et il vaut mieux qu'il soit
    # réutilisé plutôt que de s'accumuler un fichier par lancement.
    sonde = dossier / ".sonde_sqlite"
    for nom, pragmas in MODES_JOURNAL:
        _effacer_sonde(sonde)
        cx = None
        try:
            cx = sqlite3.connect(sonde)
            for p in pragmas:
                cx.execute(p)
            cx.executescript(SONDE_SQL)
            cx.commit()
            cx.execute("UPDATE a SET y = 'sonde 2' WHERE x = 1")
            cx.commit()
            cx.execute("DELETE FROM b")
            cx.commit()
            cx.close()
            _effacer_sonde(sonde)
            return nom, pragmas
        except sqlite3.Error:
            if cx is not None:
                try:
                    cx.close()
                except sqlite3.Error:
                    pass
    _effacer_sonde(sonde)
    raise SystemExit(
        f"impossible d'écrire une base SQLite dans {dossier}.\n"
        "Ce disque refuse les verrous dont SQLite a besoin — c'est le cas des\n"
        "lecteurs réseau et de certains dossiers synchronisés. Poser le hub sur\n"
        "un disque local, ou le lancer avec --base vers un disque local.")


# Bases déjà éprouvées dans ce processus : chemin résolu → (nom du mode, pragmas).
# La sonde de disque et l'essai d'écriture répondent à une question qui ne
# change pas tant que le processus vit ; le serveur, qui ouvre une connexion
# par requête, n'a aucune raison de recréer trois fichiers témoins à chacune.
_EPROUVEES = {}


def ouvrir(base: Path):
    clef = str(base.resolve())
    deja = _EPROUVEES.get(clef)
    nom, pragmas = deja if deja else mode_journal(base.parent)
    cx = sqlite3.connect(base)
    cx.row_factory = sqlite3.Row
    cx.execute("PRAGMA foreign_keys = ON")
    for p in pragmas:
        cx.execute(p)
    if deja:
        return cx, nom
    try:
        cx.execute("CREATE TABLE IF NOT EXISTS _essai_ecriture (x)")
        cx.execute("DROP TABLE _essai_ecriture")
        cx.commit()
    except sqlite3.Error as e:
        raise SystemExit(
            f"{base} existe mais refuse l'écriture ({e}).\n"
            "Une exécution précédente a pu la laisser avec un journal orphelin :\n"
            f"déplacer {base.name} et ses fichiers -journal / -wal / -shm, puis\n"
            "relancer avec --rejouer pour la reconstruire depuis archive/.")
    _EPROUVEES[clef] = (nom, pragmas)
    return cx, nom


def migrer(cx, dossier_migrations: Path, bavard=True):
    cx.execute("""CREATE TABLE IF NOT EXISTS schema_migrations (
                      version INTEGER PRIMARY KEY, nom TEXT NOT NULL,
                      applique_at TEXT NOT NULL DEFAULT (datetime('now')))""")
    faites = {r[0] for r in cx.execute("SELECT version FROM schema_migrations")}
    scripts = sorted(dossier_migrations.glob("[0-9][0-9][0-9][0-9]_*.sql"))
    if not scripts:
        raise SystemExit(f"aucune migration trouvée dans {dossier_migrations}")
    appliquees = []
    for s in scripts:
        v = int(s.name[:4])
        if v in faites:
            continue
        # Le script et sa ligne de version partent dans la même transaction :
        # un plantage au milieu laisse la base telle qu'avant, jamais à
        # moitié migrée avec une version non enregistrée (ce qui ferait
        # échouer la reprise sur un « table already exists »).
        # executescript() valide d'abord ce qui est en cours, puis exécute
        # tel quel — d'où le BEGIN/COMMIT posés à la main autour du script.
        # Un PRAGMA foreign_keys à l'intérieur est ignoré sans bruit ;
        # ouvrir() le pose de toute façon à chaque connexion.
        script = s.read_text(encoding="utf-8")
        try:
            cx.executescript(
                "BEGIN;\n" + script + "\n"
                "INSERT INTO schema_migrations (version, nom) "
                f"VALUES ({v}, '{s.name.replace(chr(39), chr(39) * 2)}');\n"
                "COMMIT;")
        except sqlite3.Error as e:
            if cx.in_transaction:
                cx.execute("ROLLBACK")
            raise SystemExit(f"migration {s.name} refusée par SQLite, base laissée "
                             f"telle qu'avant : {e}")
        appliquees.append(s.name)
        if bavard:
            print(f"  migration {s.name} appliquée")
    # Le registre Python fait foi : on le recopie dans la base pour qu'un
    # lecteur SQL sache, sans lire le script, ce que cette base sait ingérer.
    cx.execute("DELETE FROM modules_supportes")
    cx.executemany("INSERT INTO modules_supportes (module, schema_version, migration) VALUES (?,?,?)",
                   [(m, sv, mig) for (m, sv), (mig, _) in ADAPTATEURS.items()])
    cx.commit()
    return appliquees


# ══════════════════════════════════════════════════════════════════════════════
# Ingestion d'un fichier
# ══════════════════════════════════════════════════════════════════════════════

CHAMPS_ENVELOPPE = ("schema_version", "module", "module_version", "dossier")


def lire_enveloppe(brut: bytes, nom: str):
    try:
        d = json.loads(brut.decode("utf-8-sig"))
    except UnicodeDecodeError:
        raise Refus("le fichier n'est pas de l'UTF-8")
    except json.JSONDecodeError as e:
        raise Refus(f"JSON illisible ligne {e.lineno} colonne {e.colno} : {e.msg}")
    if not isinstance(d, dict):
        raise Refus("le JSON ne contient pas un objet")
    manque = [c for c in CHAMPS_ENVELOPPE if not d.get(c)]
    if manque:
        raise Refus("enveloppe incomplète, il manque : " + ", ".join(manque))
    if not DOSSIER_RE.match(str(d["dossier"])):
        raise Refus(f"numéro de dossier « {d['dossier']} » inutilisable comme nom de dossier "
                    "(lettres, chiffres, . _ - ; 64 caractères au plus)")
    cle = (d["module"], d["schema_version"])
    if cle not in ADAPTATEURS:
        connus = sorted(sv for m, sv in ADAPTATEURS if m == d["module"])
        raise Refus(
            f"module « {d['module']} » en schéma {d['schema_version']} inconnu de cette base"
            + (f" (schémas connus pour ce module : {', '.join(connus)})" if connus
               else " — aucun adaptateur pour ce module")
            + " ; il faut une migration avant d'ingérer ce fichier")
    # Le nom du fichier est indicatif, mais un désaccord signale une copie ratée.
    attendu = f"{d['dossier']}_{d['module']}.json"
    nom = re.sub(r"^\d{8}-\d{6}_", "", nom)   # préfixe posé par l'archivage
    if nom != attendu:
        d["_avertissement_nom"] = f"fichier nommé {nom}, attendu {attendu}"
    return d


def sans_base64(d: dict) -> dict:
    """Le JSON tel qu'il entre en base : même document, clichés dépilés.

    On garde `photos` avec ses libellés et ses dimensions — c'est ce qui
    permet de savoir quel cliché manque — mais pas les octets, qui vivent
    sur le disque et seraient illisibles en base de toute façon.
    """
    out = {k: v for k, v in d.items() if not k.startswith("_avertissement")}
    if out.get("photos"):
        out["photos"] = [{k: v for k, v in p.items() if k != "data_base64"}
                         for p in out["photos"]]
    return out


def ingerer(cx, racine: Path, brut: bytes, nom: str, provenance="telephone", dry=False,
            archive_rel=None):
    """Ingère un document JSON déjà en mémoire. Renvoie (etat, message, saisie_id).

    Point d'entrée unique : la ligne de commande lui passe le contenu d'un
    fichier d'arrivee/, le serveur lui passe le corps d'une requête. Les deux
    suivent exactement le même chemin — mêmes gardes, même archivage, mêmes
    adaptateurs — pour qu'une saisie tapée sur le poste et une saisie recopiée
    du téléphone soient rangées de la même façon.
    """
    empreinte = sha256(brut)
    d = lire_enveloppe(brut, nom)
    dossier, module = d["dossier"], d["module"]

    deja = cx.execute("SELECT id, archive FROM saisies WHERE sha256=?", (empreinte,)).fetchone()
    if deja:
        return "doublon", f"déjà ingéré à l'identique ({deja['archive']})", deja["id"]

    if dry:
        n = len(d.get("photos") or [])
        return "info", (f"{module} v{d['module_version']} → {dossier}"
                        + (f", {n} cliché(s)" if n else "")), None

    # La modalité d'entrée est dans le chemin d'archive, pas seulement en base :
    # une arborescence doit se relire sans la base qui va avec.
    rel_archive = archive_rel or \
        f"archive/{dossier}/{provenance}/{horodatage()}_{dossier}_{module}_{empreinte[:8]}.json"
    # L'empreinte dans le nom : deux versions reprises dans la même seconde
    # (enregistrer deux fois de suite depuis un module) ne s'écrasent pas.
    cx.execute("INSERT OR IGNORE INTO dossiers (numero) VALUES (?)", (dossier,))
    cx.execute("UPDATE saisies SET courant=0 WHERE dossier=? AND module=?", (dossier, module))
    sid = ins(cx, "saisies",
              dossier=dossier, module=module,
              schema_version=d["schema_version"], module_version=d["module_version"],
              operateur=txt(d.get("operateur")), exported_at=txt(d.get("exported_at")),
              fichier=nom, archive=rel_archive, sha256=empreinte,
              octets=len(brut), courant=1, provenance=provenance,
              donnees_json=json.dumps(sans_base64(d), ensure_ascii=False))

    indexer(cx, sid, dossier, module, d["schema_version"], d)

    n_photos = ecrire_photos(cx, racine, sid, dossier, module, d)
    majuscule_statut(cx, dossier)

    # L'archive garde le document reçu, octet pour octet, base64 compris.
    if archive_rel is None:
        (racine / rel_archive).parent.mkdir(parents=True, exist_ok=True)
        (racine / rel_archive).write_bytes(brut)

    msg = f"{module} v{d['module_version']} → {dossier}" + (f", {n_photos} cliché(s)" if n_photos else "")
    if d.get("_avertissement_nom"):
        msg += f" [{d['_avertissement_nom']}]"
    return "info", msg, sid


def rendre_courante(cx, sid):
    """Remet une saisie remplacée en tête de son module. Renvoie (dossier, module).

    Rien n'est effacé : la saisie qui était courante passe à l'historique,
    comme lors d'une reprise. On réindexe celle qu'on remonte, pour que ce
    qu'elle écrit sur la fiche du dossier (terme, sexe… pour l'administratif)
    redevienne le sien.
    """
    r = cx.execute("SELECT dossier, module, schema_version, donnees_json, courant "
                   "FROM saisies WHERE id=?", (sid,)).fetchone()
    if not r:
        raise Refus("saisie inconnue")
    if not r["courant"]:
        cx.execute("UPDATE saisies SET courant=0 WHERE dossier=? AND module=?",
                   (r["dossier"], r["module"]))
        cx.execute("UPDATE saisies SET courant=1 WHERE id=?", (sid,))
        d = json.loads(r["donnees_json"] or "{}")
        if d and (r["module"], r["schema_version"]) in ADAPTATEURS:
            indexer(cx, sid, r["dossier"], r["module"], r["schema_version"], d)
        majuscule_statut(cx, r["dossier"])
    return r["dossier"], r["module"]


def ingerer_fichier(cx, racine: Path, chemin: Path, dry=False):
    """Ingère un JSON d'arrivee/ et retire le fichier une fois archivé."""
    etat, msg, sid = ingerer(cx, racine, chemin.read_bytes(), chemin.name,
                             provenance="telephone", dry=dry)
    if not dry and etat == "info":
        chemin.unlink(missing_ok=True)
    return etat, msg


def majuscule_statut(cx, dossier):
    """« en cours » dès qu'un module est arrivé, « complet » quand ils y sont tous.

    Le passage à « clos » n'est jamais automatique : c'est une décision.
    """
    recus = {slot(r["module"]) for r in cx.execute(
        "SELECT module FROM saisies WHERE dossier=? AND courant=1", (dossier,))}
    attendus = [m for m in ORDRE_MODULES if m not in MODULES_FACULTATIFS]
    complet = all(m in recus for m in attendus)
    cx.execute("UPDATE dossiers SET statut=? WHERE numero=? AND statut <> 'clos'",
               ("complet" if complet else "en_cours", dossier))


# ══════════════════════════════════════════════════════════════════════════════
# Index : les tables par module se refabriquent depuis saisies.donnees_json
# ══════════════════════════════════════════════════════════════════════════════

# Chaque module a ses tables ; les vider dans cet ordre suffit, le reste part
# en cascade par les clés étrangères.
TABLES_INDEX = {
    "administratif":      ["admin_dossier", "admin_grossesses", "admin_chronologie",
                           "admin_coherence"],
    "examen_clinique":    ["examen_clinique", "examen_clinique_items",
                           "examen_clinique_cliches_libres"],
    "biometrie_clinique": ["biometrie_clinique", "biometrie_clinique_mesures"],
    "radio":              ["radio", "radio_chips", "radio_os_longs",
                           "radio_maturation", "radio_hpo"],
    "autopsie":           ["autopsie", "autopsie_champs", "autopsie_cliches_libres"],
    "neuropath":          ["neuropath", "neuropath_champs", "neuropath_cliches_libres"],
}
TABLES_INDEX.update({m: ["microscopie", "microscopie_valeurs"] for m in MODULES_MICRO})
TABLES_INDEX.update({"micro": ["valeurs_plates"], "macro_placenta": ["valeurs_plates"]})


def desindexer(cx, sid, module):
    for t in TABLES_INDEX.get(module, []):
        cx.execute(f"DELETE FROM {t} WHERE saisie_id = ?", (sid,))


def indexer(cx, sid, dossier, module, schema_version, d):
    """Range une saisie dans les tables de son module, après les avoir vidées.

    Idempotent : on peut le rejouer sur une saisie déjà indexée.
    """
    desindexer(cx, sid, module)
    ADAPTATEURS[(module, schema_version)][1](cx, sid, dossier, d)


def saisies_sans_document(cx):
    """Les saisies d'avant la migration 0002, dont le JSON n'est pas en base.

    Elles restent parfaitement lisibles — leurs tables sont remplies et leur
    archive est là — mais `--reindex` ne peut rien pour elles, faute de
    document à relire. Un seul `--rejouer` les rattrape.
    """
    try:
        return cx.execute("SELECT COUNT(*) c FROM saisies "
                          "WHERE donnees_json IS NULL OR donnees_json = '{}'").fetchone()["c"]
    except sqlite3.Error:
        return 0


def reindexer(cx, bavard=True):
    """Refabrique tout l'index depuis les JSON stockés en base.

    Ne touche ni à l'archive, ni aux clichés, ni au registre des saisies :
    seules les tables par module sont vidées et réécrites. C'est ce qu'on
    lance après avoir corrigé un adaptateur, ou après une migration qui
    ajoute une colonne à un module.
    """
    lignes = cx.execute("""SELECT id, dossier, module, schema_version, donnees_json
                             FROM saisies ORDER BY id""").fetchall()
    faites = sans_adaptateur = sans_document = 0
    for r in lignes:
        try:
            d = json.loads(r["donnees_json"] or "{}")
        except json.JSONDecodeError:
            d = {}
        if not d:
            # Saisie d'avant la migration 0002 : son index reste tel qu'il est,
            # on n'a pas de quoi le refabriquer. On ne le vide surtout pas.
            sans_document += 1
            continue
        if (r["module"], r["schema_version"]) not in ADAPTATEURS:
            sans_adaptateur += 1
            if bavard:
                print(f"  ignorée : saisie {r['id']} — {r['module']} "
                      f"schéma {r['schema_version']} sans adaptateur")
            continue
        indexer(cx, r["id"], r["dossier"], r["module"], r["schema_version"], d)
        faites += 1
    for numero in {r["dossier"] for r in lignes}:
        majuscule_statut(cx, numero)
    cx.execute("UPDATE index_etat SET reindexe_at = datetime('now'), saisies = ? WHERE id = 1",
               (faites,))
    cx.commit()
    return faites, sans_adaptateur, sans_document


def ecrire_photos(cx, racine: Path, sid, dossier, module, d):
    photos = d.get("photos") or []
    n = 0
    for p in photos:
        b64 = p.get("data_base64")
        cle = p.get("key") or f"cliche_{n+1}"
        if not b64:
            continue
        if not isinstance(cle, str) or not CLE_PHOTO_RE.match(cle):
            # La clé sert de nom de fichier : une clé du genre « ../../x »
            # écrirait hors de photos/. On refuse plutôt que de nettoyer,
            # pour que le JSON fautif soit visible dans rejets/.
            raise Refus(f"clé de cliché « {str(cle)[:40]} » invalide : "
                        "lettres, chiffres, « _ » et « - » seulement (64 max)")
        try:
            octets = base64.b64decode(b64, validate=True)
        except (binascii.Error, ValueError) as e:
            raise Refus(f"base64 du cliché « {cle} » invalide : {e}")
        mime, ext = reconnait(octets)
        if not mime:
            raise Refus(f"cliché « {cle} » : les octets décodés ne sont pas une image")
        attendu = p.get("bytes")
        if attendu and int(attendu) != len(octets):
            raise Refus(f"cliché « {cle} » : {len(octets)} octets décodés, {attendu} annoncés")
        rel = f"photos/{dossier}/{module}/{cle}{ext}"
        empreinte = sha256(octets)
        vieux = racine / rel
        if vieux.exists() and sha256(vieux.read_bytes()) != empreinte:
            # Même clé, autre image : c'est une nouvelle version du cliché. On
            # la range à côté pour que la version remplacée garde le sien.
            rel = f"photos/{dossier}/{module}/{cle}_{empreinte[:8]}{ext}"
        ecrire_cliche(octets, racine / rel, faire_vignette=True)
        ins(cx, "photos", saisie_id=sid, dossier=dossier, module=module, cle=cle,
            label=txt(p.get("label")),
            etape=txt(p.get("etape") or p.get("etage")), item=txt(p.get("item")),
            libre=1 if p.get("libre") else 0,
            nom=txt(p.get("name")), mime=mime, octets=len(octets),
            largeur=entier(p.get("w")), hauteur=entier(p.get("h")),
            largeur_src=entier(p.get("ow")), hauteur_src=entier(p.get("oh")),
            added_at=txt(p.get("addedAt")), chemin=rel, sha256=empreinte)
        n += 1
    return n


# ══════════════════════════════════════════════════════════════════════════════
# Index pour le tableau de gestion
# ══════════════════════════════════════════════════════════════════════════════

def construire_index(cx):
    """L'index complet : un objet par dossier, prêt à être affiché.

    Sert deux lecteurs — le fichier index.json que la page lit en mode
    hors ligne, et la réponse du serveur quand il y en a un. Un seul endroit
    décide de ce qu'on montre.
    """
    dossiers = []
    for d in cx.execute("SELECT * FROM vue_dossiers ORDER BY numero DESC"):
        num_ = d["numero"]
        # Le document de chaque module voyage avec l'index : c'est lui que la
        # page affiche dans ses onglets, et le vouloir hors ligne aussi bien
        # que servi interdit de le laisser derrière. Sans les clichés, une
        # saisie pèse quelques kilo-octets.
        saisies = []
        for r in cx.execute(
            """SELECT id, module, module_version, schema_version, operateur, exported_at,
                      ingere_at, archive, octets, provenance, donnees_json
                 FROM saisies WHERE dossier=? AND courant=1 ORDER BY module""", (num_,)):
            s = dict(r)
            # Le créneau plutôt que le module : la page range les dix-sept
            # grilles sous « microscopie » sans avoir à connaître leur liste.
            s["slot"] = slot(s["module"])
            try:
                s["donnees"] = json.loads(s.pop("donnees_json") or "{}")
            except json.JSONDecodeError:
                s.pop("donnees_json", None)
                s["donnees"] = {}
            saisies.append(s)
        photos = [dict(r) for r in cx.execute(
            """SELECT p.module, p.cle, p.label, p.etape, p.libre, p.chemin,
                      p.largeur, p.hauteur, p.octets
                 FROM photos p JOIN saisies s ON s.id = p.saisie_id AND s.courant = 1
                WHERE p.dossier=? ORDER BY p.module, p.cle""", (num_,))]
        anomalies = [dict(r) for r in cx.execute(
            "SELECT etage_titre, item_label, anomalies, precisions FROM vue_anomalies_cliniques WHERE dossier=?",
            (num_,))]
        alertes = [r["message"] for r in cx.execute(
            """SELECT c.message FROM admin_coherence c
                 JOIN saisies s ON s.id = c.saisie_id AND s.courant = 1
                WHERE c.dossier=?""", (num_,))]
        masses = [dict(r) for r in cx.execute(
            "SELECT mesure, libelle, valeur, z_gc, z_ma, z_mb FROM vue_masses WHERE dossier=? AND valeur IS NOT NULL",
            (num_,))]
        # Les saisies remplacées et le journal du dossier : l'onglet Historique.
        historique = [dict(r) for r in cx.execute(
            """SELECT s.id, s.module, s.module_version, s.operateur, s.provenance,
                      s.exported_at, s.ingere_at, s.archive,
                      (SELECT COUNT(*) FROM photos p WHERE p.saisie_id = s.id) AS cliches
                 FROM saisies s WHERE s.dossier=? AND s.courant=0
                ORDER BY s.ingere_at DESC, s.id DESC""", (num_,))]
        journal_ = [dict(r) for r in cx.execute(
            """SELECT at, niveau, module, message FROM journal WHERE dossier=?
                ORDER BY id DESC LIMIT 100""", (num_,))]
        dossiers.append({**dict(d), "saisies": saisies, "photos": photos,
                         "anomalies": anomalies, "alertes": alertes, "masses": masses,
                         "historique": historique, "journal": journal_})

    return {
        "genere_at": dt.datetime.now().isoformat(timespec="seconds"),
        "modules_attendus": ORDRE_MODULES,
        "modules_facultatifs": sorted(MODULES_FACULTATIFS),
        "pillow": PILLOW,
        "dossiers": dossiers,
        "journal": [dict(r) for r in cx.execute(
            "SELECT at, niveau, fichier, dossier, module, message FROM journal ORDER BY id DESC LIMIT 200")],
    }


def ecrire_index(cx, racine: Path):
    index = construire_index(cx)
    index["base"] = racine.name
    (racine / "index.json").write_text(json.dumps(index, ensure_ascii=False, indent=1),
                                       encoding="utf-8")
    return len(index["dossiers"])


# ══════════════════════════════════════════════════════════════════════════════
# Boucle principale
# ══════════════════════════════════════════════════════════════════════════════

def arborescence(racine: Path):
    for d in ("arrivee", "archive", "rejets", "photos"):
        (racine / d).mkdir(parents=True, exist_ok=True)


def journal(cx, niveau, message, fichier=None, dossier=None, module=None):
    cx.execute("INSERT INTO journal (niveau, fichier, dossier, module, message) VALUES (?,?,?,?,?)",
               (niveau, fichier, dossier, module, message))


def rejeter(racine: Path, chemin: Path, motif: str, trace: str = ""):
    cible = racine / "rejets" / f"{horodatage()}_{chemin.name}"
    shutil.move(str(chemin), cible)
    cible.with_suffix(cible.suffix + ".txt").write_text(
        f"{chemin.name}\nrefusé le {dt.datetime.now().isoformat(timespec='seconds')}\n\n"
        f"{motif}\n" + (f"\n---\n{trace}" if trace else ""), encoding="utf-8")
    return cible


# ══════════════════════════════════════════════════════════════════════════════
# Le paquet biblio — data_hub_vN.zip publié par data.pazuzu.uk
# ══════════════════════════════════════════════════════════════════════════════

CHEMIN_PAQUET_OK = re.compile(r"^[A-Za-z0-9_][A-Za-z0-9._-]*(/[A-Za-z0-9_][A-Za-z0-9._-]*)*$")


def ingerer_paquet(cx, racine: Path, chemin: Path):
    """Reprend un paquet biblio dans biblio/ : manifest vérifié, empreintes
    vérifiées, l'archive garde le zip tel quel. Un paquet remplace le
    précédent en entier — c'est un état, pas une saisie.

    Même discipline que les JSON : ce qui ne passe pas part en rejets/ avec
    son motif, et rien n'est écrit dans biblio/ tant que tout n'est pas lu.
    """
    brut = chemin.read_bytes()
    empreinte = sha256(brut)
    try:
        z = zipfile.ZipFile(chemin)
    except zipfile.BadZipFile:
        raise Refus("ce n'est pas un zip")
    with z:
        if "manifest.json" not in z.namelist():
            raise Refus("pas de manifest.json — ce n'est pas un paquet data_hub")
        try:
            man = json.loads(z.read("manifest.json").decode("utf-8"))
        except (UnicodeDecodeError, json.JSONDecodeError) as e:
            raise Refus(f"manifest.json illisible : {e}")
        if man.get("paquet") != "data_hub" or not isinstance(man.get("fichiers"), dict):
            raise Refus("manifest.json n'est pas celui d'un paquet data_hub")
        deja = cx.execute("SELECT 1 FROM journal WHERE message LIKE ? LIMIT 1",
                          (f"%[{empreinte[:16]}]%",)).fetchone()
        if deja:
            return "doublon", f"paquet déjà repris à l'identique (v{man.get('version')})"
        contenu = {}
        for nom, att in man["fichiers"].items():
            if not CHEMIN_PAQUET_OK.match(nom) or ".." in nom.split("/"):
                raise Refus(f"chemin inacceptable dans le manifest : {nom}")
            if nom not in z.namelist():
                raise Refus(f"{nom} annoncé par le manifest, absent du zip")
            b = z.read(nom)
            if sha256(b) != att.get("sha256"):
                raise Refus(f"{nom} : empreinte différente de celle du manifest — paquet altéré")
            contenu[nom] = b
    # Tout est lu et vérifié : on écrit.
    biblio = racine / "biblio"
    if biblio.exists():
        shutil.rmtree(biblio)
    for nom, b in contenu.items():
        cible = biblio / nom
        cible.parent.mkdir(parents=True, exist_ok=True)
        cible.write_bytes(b)
    (biblio / "manifest.json").write_text(json.dumps(man, ensure_ascii=False, indent=1), encoding="utf-8")
    rel = f"archive/_biblio/{horodatage()}_{chemin.name}"
    (racine / rel).parent.mkdir(parents=True, exist_ok=True)
    (racine / rel).write_bytes(brut)
    msg = (f"paquet data_hub v{man.get('version')} du {man.get('date')} — {len(contenu)} fichier(s), "
           f"{man.get('sources', {}).get('fiches', '?')} fiches, {man.get('sources', {}).get('familles', '?')} familles "
           f"[{empreinte[:16]}]")
    journal(cx, "info", msg, chemin.name)
    return "info", msg


def rejouer(cx, racine: Path):
    """Vide la base et la reconstruit depuis l'archive, la plus ancienne d'abord.

    Le remède de dernier recours : la base entière peut disparaître, l'archive
    la redonne. `--reindex` suffit pour un simple changement d'adaptateur ;
    ceci sert quand c'est le registre lui-même qui est perdu ou douteux.

    Les fichiers d'archive ne bougent pas : chaque saisie est réingérée à sa
    place, avec la modalité d'entrée que dit son chemin.
    """
    for t in ("comptes_rendus", "photos", "saisies", "dossiers", "journal"):
        cx.execute(f"DELETE FROM {t}")   # les tables filles suivent en cascade
    cx.commit()
    fichiers = sorted((racine / "archive").rglob("*.json"))
    n_ok = n_ko = 0
    for f in fichiers:
        rel = f.relative_to(racine).as_posix()
        prov = "poste" if "/poste/" in "/" + rel else "telephone"
        try:
            etat, msg, _ = ingerer(cx, racine, f.read_bytes(), f.name,
                                   provenance=prov, archive_rel=rel)
            cx.commit()
            n_ok += 1
            print(f"  rejoué  {rel} — {msg}")
        except Refus as e:
            cx.rollback()
            n_ko += 1
            print(f"  REFUS   {rel} — {e}")
    return n_ok, n_ko


def main():
    ap = argparse.ArgumentParser(description="Reprise des JSON des modules dans la base de travail.")
    ap.add_argument("--base", type=Path, default=RACINE_DEFAUT,
                    help="racine du hub (par défaut : le dossier de ce script)")
    ap.add_argument("--init", action="store_true", help="créer la base et l'arborescence, puis sortir")
    ap.add_argument("--dry-run", action="store_true", help="lister sans rien écrire")
    ap.add_argument("--rejouer", action="store_true", help="vider la base et rejouer toute l'archive")
    ap.add_argument("--reindex", action="store_true",
                    help="refabriquer les tables par module depuis les JSON en base")
    ap.add_argument("--index-seul", action="store_true", help="régénérer index.json sans ingérer")
    args = ap.parse_args()

    racine = args.base.resolve()
    racine.mkdir(parents=True, exist_ok=True)
    arborescence(racine)
    migrations = racine / "migrations"
    if not migrations.is_dir():
        migrations = ICI / "migrations"

    print(f"hub      : {racine}")
    print(f"Pillow   : {'oui' if PILLOW else 'non — vignettes désactivées'}")

    cx, mode = ouvrir(racine / "hub.sqlite")
    if mode in AVIS_MODE:
        print("journal  : " + AVIS_MODE[mode])
    migrer(cx, migrations)

    vieilles = saisies_sans_document(cx)
    if vieilles:
        print(f"note     : {vieilles} saisie(s) d'avant la migration 0002 n'ont pas leur JSON\n"
              "           en base — `python app/ingest.py --rejouer` les rattrape depuis l'archive.")

    if args.init:
        ecrire_index(cx, racine)
        print("base prête.")
        return 0

    if args.reindex:
        faites, sans_ad, sans_doc = reindexer(cx)
        ecrire_index(cx, racine)
        print(f"index refabriqué : {faites} saisie(s)"
              + (f", {sans_ad} sans adaptateur" if sans_ad else "")
              + (f", {sans_doc} laissée(s) en l'état (JSON pas en base)" if sans_doc else "")
              + ".")
        return 1 if sans_ad else 0

    if args.index_seul:
        n = ecrire_index(cx, racine)
        print(f"index.json régénéré — {n} dossier(s).")
        return 0

    if args.rejouer:
        n_ok, n_ko = rejouer(cx, racine)
        ecrire_index(cx, racine)
        print(f"\nrejoué : {n_ok} saisie(s), {n_ko} refus.")
        return 1 if n_ko else 0

    for zp in sorted((racine / "arrivee").glob("*.zip")):
        try:
            etat, msg = ingerer_paquet(cx, racine, zp)
            cx.commit()
            zp.unlink()
            print(f"  {'=' if etat == 'doublon' else '+'} {zp.name} — {msg}")
        except Refus as e:
            cx.rollback()
            cible = rejeter(racine, zp, str(e))
            journal(cx, "rejet", str(e), zp.name); cx.commit()
            print(f"  ! {zp.name} — {e}\n      → {cible.relative_to(racine)}")

    fichiers = sorted((racine / "arrivee").glob("*.json"))
    if not fichiers:
        print("arrivee/ est vide — rien à faire.")
        ecrire_index(cx, racine)
        return 0

    # L'administratif d'abord : il crée la fiche de synthèse que les autres
    # modules ne font qu'enrichir.
    def priorite(p):
        for i, m in enumerate(ORDRE_MODULES):
            if p.stem.endswith("_" + m):
                return i
        for m in MODULES_MICRO:
            if p.stem.endswith("_" + m):
                return ORDRE_MODULES.index("microscopie")
        return len(ORDRE_MODULES)
    fichiers.sort(key=priorite)

    n_ok = n_dbl = n_ko = 0
    print(f"\n{len(fichiers)} fichier(s) dans arrivee/" + (" — simulation" if args.dry_run else ""))
    for f in fichiers:
        try:
            etat, msg = ingerer_fichier(cx, racine, f, dry=args.dry_run)
            if args.dry_run:
                print(f"  · {f.name} — {msg}")
                continue
            cx.commit()
            if etat == "doublon":
                n_dbl += 1
                journal(cx, "doublon", msg, f.name)
                f.unlink()
                print(f"  = {f.name} — {msg}, fichier retiré d'arrivee/")
            else:
                n_ok += 1
                journal(cx, "info", msg, f.name)
                print(f"  + {f.name} — {msg}")
            cx.commit()
        except Refus as e:
            cx.rollback()
            n_ko += 1
            cible = rejeter(racine, f, str(e))
            journal(cx, "rejet", str(e), f.name)
            cx.commit()
            print(f"  ! {f.name} — {e}\n      → rejets/{cible.name}")
        except Exception as e:                                  # anomalie du script
            cx.rollback()
            n_ko += 1
            tr = traceback.format_exc()
            cible = rejeter(racine, f, f"erreur inattendue : {e}", tr)
            journal(cx, "erreur", f"{type(e).__name__}: {e}", f.name)
            cx.commit()
            print(f"  !! {f.name} — erreur inattendue : {e}\n      → rejets/{cible.name}")

    if not args.dry_run:
        n = ecrire_index(cx, racine)
        print(f"\n{n_ok} ingérée(s), {n_dbl} doublon(s), {n_ko} rejet(s) — "
              f"index.json à jour, {n} dossier(s) en base.")
    cx.close()
    return 1 if n_ko else 0


if __name__ == "__main__":
    sys.exit(main())
