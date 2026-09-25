#!/usr/bin/env python3
# SPDX-License-Identifier: CC-BY-NC-SA-4.0 | Hub Light | Monolithe_Foeto
"""
Serveur local du hub — gestion des cas et ingestion pilotée.

    python app/serveur.py             http://127.0.0.1:5005   (ou hub/serveur.bat)
    python app/serveur.py --port 5010
    python app/serveur.py --base D:\\hub

Le code vit dans hub/app/, les données (hub.sqlite, arrivee/, archive/,
photos/, rejets/, index.json, bamara.json, references/) à la racine du hub,
un cran au-dessus : c'est elle que --base désigne.

Il n'écoute que sur la boucle locale. Aucun compte, aucune session : la
protection est celle du poste et de la session Windows, comme pour le fichier
de base lui-même. Ne pas le lier à 0.0.0.0 sans avoir d'abord ajouté une
authentification — les dossiers y sont en clair.

Ce qu'il fait :

  · sert la page de gestion des cas, alimentée par la base plutôt que par un
    index déposé à la main ;
  · reçoit les JSON déposés sur la page, les range dans arrivee/, lance leur
    reprise sur un clic, montre le journal et les rejets ;
  · sert les modules HTML du dépôt en leur greffant, à la volée, un bouton
    « enregistrer au hub » et un bouton « relire » — les fichiers sur le
    disque ne sont pas touchés et restent utilisables par double-clic ;
  · reçoit les saisies faites sur le poste et les range comme celles qui
    viennent du téléphone : même archivage, mêmes adaptateurs, mêmes tables.
    Seule la modalité d'entrée diffère, et elle est notée.

Dépendances : Flask (et Jinja2 qui vient avec). `ingest.py` reste, lui, en
bibliothèque standard seule et continue de fonctionner sans serveur.
"""

import argparse
import datetime as dt
import io
import json
import re
import shutil
import sqlite3
import sys
import traceback
import zipfile
from pathlib import Path

try:
    from flask import Flask, Response, jsonify, request, send_file, send_from_directory
except ImportError:
    sys.exit("Flask est absent.  pip install flask\n"
             "L'ingestion en ligne de commande (ingest.py) fonctionne sans lui.")

import bamara as prep_bamara
import biometrie
import cr as compte_rendu
import ingest
from ingest import (ADAPTATEURS, MODULES_FACULTATIFS, MODULES_MICRO,
                    ORDRE_MODULES, Refus, slot, arborescence, construire_index,
                    ecrire_index, ingerer, ingerer_fichier, ingerer_paquet, journal,
                    migrer, ouvrir, rejeter, reindexer)

ICI = Path(__file__).resolve().parent      # hub/app — le code, la page, web/, gabarits/, migrations/
HUB = ICI.parent                            # hub/     — la base et les dossiers de travail
DEPOT = HUB.parent                          # contient admin/, Macro/, Radio/, micro/

# Les modules du dépôt, par emplacement. Le slug est le nom de fichier sans
# extension et correspond au champ `module` de l'enveloppe JSON — c'est ce qui
# permet d'ouvrir le bon module depuis la fiche d'un dossier.
DOSSIERS_MODULES = ["admin", "Macro", "Radio", "micro"]

SLUG_OK = re.compile(r"^[a-z0-9_]+$")
# Ce qu'un module produit : « 26P0123_autopsie.json ». On refuse le reste
# plutôt que d'assainir un nom douteux — arrivee/ n'est pas une corbeille.
NOM_JSON_OK = re.compile(r"^[A-Za-z0-9][A-Za-z0-9._-]{0,120}\.json$")
DOSSIER_OK = ingest.DOSSIER_RE     # même règle que l'ingestion


# ══════════════════════════════════════════════════════════════════════════════
# Découverte des modules
# ══════════════════════════════════════════════════════════════════════════════

_CACHE_MODULES = {}


def _lire_module(f: Path, groupe: str):
    """Ce qu'un module dit de lui-même : son nom, ses deux versions, son titre.

    On lit le fichier entier — les déclarations sont après une longue feuille
    de style, un en-tête tronqué les manquerait — mais on garde le résultat
    tant que le fichier n'a pas bougé : la page de gestion appelle ceci à
    chaque rafraîchissement, et relire 400 Ko de HTML pour six lignes serait
    du gaspillage.
    """
    st = f.stat()
    cle = (str(f), st.st_mtime_ns, st.st_size)
    if cle in _CACHE_MODULES:
        return _CACHE_MODULES[cle]
    texte = f.read_text(encoding="utf-8", errors="replace")

    def cherche(nom):
        m = re.search(r'^var\s+' + nom + r'\s*=\s*"([^"]+)"', texte, re.M)
        return m.group(1) if m else None

    titre = re.search(r"<title>(.*?)</title>", texte, re.S)
    module = cherche("MODULE") or f.stem
    schema = cherche("SCHEMA")
    fiche = {
        "slug": f.stem,
        "chemin": str(f),
        "groupe": groupe,
        "titre": titre.group(1).strip() if titre else f.stem,
        "module": module,
        "module_version": cherche("VERSION"),
        "schema_version": schema,
        # Un module que la base ne sait pas ranger reste ouvrable et
        # exportable ; c'est l'enregistrement au hub qui le refusera, avec
        # le motif. Mieux vaut le montrer grisé que le cacher.
        "ingerable": (module, schema) in ADAPTATEURS,
        "octets": st.st_size,
    }
    if len(_CACHE_MODULES) > 128:      # une diffusion par module et par jour suffit à le remplir
        _CACHE_MODULES.clear()
    _CACHE_MODULES[cle] = fiche
    return fiche


def modules_disponibles(depot: Path = None):
    """Les HTML de saisie du dépôt, indexés par slug.

    On lit le dépôt plutôt que de tenir une liste en dur : un module ajouté
    apparaît sans qu'on touche au serveur, et les versions affichées viennent
    du fichier lui-même, pas d'une copie qui dériverait.
    """
    out = {}
    depot = depot or DEPOT
    for rep in DOSSIERS_MODULES:
        d = depot / rep
        if not d.is_dir():
            continue
        for f in sorted(d.glob("*.html")):
            if SLUG_OK.match(f.stem):
                out[f.stem] = _lire_module(f, rep)
    return out



# ══════════════════════════════════════════════════════════════════════════════
# Application
# ══════════════════════════════════════════════════════════════════════════════

# Noms d'hôte sous lesquels le serveur accepte d'être appelé. Le serveur
# n'écoute que sur la boucle locale et n'a pas d'authentification : sa seule
# protection est que rien d'extérieur ne l'atteint. Or une page web hostile
# ouverte dans le même navigateur peut contourner cela par « DNS rebinding »
# (son nom de domaine est refait pointer vers 127.0.0.1 une fois la page
# chargée) et lire /api/index comme si elle était la page du hub. Elle
# arrive alors avec son propre nom dans l'en-tête Host — c'est là qu'on la
# reconnaît et qu'on la refuse.
HOTES_LOCAUX = {"127.0.0.1", "localhost", "::1", "[::1]"}


def _nom_hote(host):
    """« 127.0.0.1:5005 » → « 127.0.0.1 », « [::1]:5005 » → « [::1] »."""
    h = (host or "").strip().lower()
    if h.startswith("["):
        return h.split("]", 1)[0] + "]"
    return h.rsplit(":", 1)[0] if ":" in h else h


def creer_app(racine: Path, depot: Path = None, hotes=None):
    depot = (depot or DEPOT).resolve()
    hotes_admis = set(HOTES_LOCAUX) | {h.lower() for h in (hotes or ())}
    # --host 0.0.0.0 : on ne sait pas sous quel nom les clients arriveront,
    # et l'auteur a déjà été prévenu qu'il sort du périmètre protégé.
    tout_hote = bool(hotes_admis & {"0.0.0.0", "::"})
    # Les tables de référence sont lues une fois : elles ne changent pas en
    # cours de session, et les relire à chaque z serait du gaspillage.
    refs = biometrie.References(racine)
    app = Flask(__name__, static_folder=None)
    app.config["MAX_CONTENT_LENGTH"] = 64 * 1024 * 1024   # un module avec ses clichés
    app.json.sort_keys = False
    app.config["RACINE"] = racine

    def base():
        """Une connexion par requête. Le serveur est mono-poste et sans
        concurrence réelle ; on ouvre et on ferme, c'est suffisant et ça
        évite de garder un verrou exclusif entre deux clics."""
        cx, _ = ouvrir(racine / "hub.sqlite")
        return cx

    def erreur(msg, code=400):
        return jsonify({"erreur": msg}), code

    @app.before_request
    def verifier_hote():
        if not tout_hote and _nom_hote(request.host) not in hotes_admis:
            return erreur("hôte refusé : le hub ne répond qu'à 127.0.0.1 ou localhost", 403)

    # ── Page de gestion ────────────────────────────────────────────────────
    @app.get("/")
    def page_dossiers():
        return send_file(ICI / "dossiers.html")

    @app.get("/liaison.js")
    def liaison():
        return send_file(ICI / "web" / "liaison.js", mimetype="application/javascript")

    @app.get("/themes.css")
    def themes():
        """Les thèmes des modules servis. Voir web/themes.css."""
        return send_file(ICI / "web" / "themes.css", mimetype="text/css")

    @app.get("/akinator.js")
    def akinator_js():
        """Le moteur bayésien de la page Biblio — transposé de data.pazuzu.uk."""
        return send_file(ICI / "web" / "akinator.js", mimetype="application/javascript")

    @app.get("/akinator.css")
    def akinator_css():
        return send_file(ICI / "web" / "akinator.css", mimetype="text/css")

    @app.get("/bamara_fichier.user.js")
    def bamara_userscript():
        """Le script de pré-remplissage, servi pour l'installer dans Tampermonkey.
        Il vit dans BAMARA/ à la racine du dépôt et ne connaît pas le hub."""
        return send_file(DEPOT / "BAMARA" / "bamara_fichier.user.js",
                         mimetype="application/javascript")

    # ── Biblio : le paquet data_hub ────────────────────────────────────────
    @app.get("/api/biblio")
    def api_biblio():
        """Le manifest du paquet en place, ou rien : la page sait quoi montrer."""
        m = racine / "biblio" / "manifest.json"
        if not m.is_file():
            return jsonify({"present": False})
        man = json.loads(m.read_text(encoding="utf-8"))
        man["present"] = True
        man["fiches"] = sorted(n for n in man.get("fichiers", {}) if n.startswith("fiches/"))
        return jsonify(man)

    @app.post("/api/biblio")
    def api_biblio_deposer():
        """Reçoit un data_hub_vN.zip et le reprend tout de suite : un paquet
        n'est pas une saisie à relire, c'est un état qu'on remplace."""
        f = request.files.get("paquet")
        if not f:
            return erreur("aucun fichier reçu")
        nom = Path(f.filename or "").name
        if not re.match(r"^[A-Za-z0-9][A-Za-z0-9._-]{0,120}\.zip$", nom):
            return erreur("nom inattendu — un data_hub_vN.zip")
        arrivee = racine / "arrivee"
        arrivee.mkdir(parents=True, exist_ok=True)
        cible = arrivee / nom
        f.save(cible)
        cx = base()
        try:
            try:
                etat, msg = ingerer_paquet(cx, racine, cible)
                cx.commit()
                cible.unlink(missing_ok=True)
                return jsonify({"etat": etat, "message": msg})
            except Refus as e:
                cx.rollback()
                rejet = rejeter(racine, cible, str(e))
                journal(cx, "rejet", str(e), nom)
                cx.commit()
                return erreur(f"{e} → {rejet.relative_to(racine)}", 422)
        finally:
            cx.close()

    @app.get("/biblio/<path:chemin>")
    def biblio_fichier(chemin):
        """Les fichiers du paquet, tels quels. send_from_directory refuse
        tout chemin qui sortirait de biblio/."""
        return send_from_directory(racine / "biblio", chemin)

    # ── Index et dossiers ──────────────────────────────────────────────────
    @app.get("/api/index")
    def api_index():
        cx = base()
        try:
            index = construire_index(cx)
        finally:
            cx.close()
        index["base"] = racine.name
        index["servi"] = True
        index["modules"] = modules_disponibles(depot)
        return jsonify(index)

    @app.get("/api/dossiers/<numero>")
    def api_dossier(numero):
        if not DOSSIER_OK.match(numero):
            return erreur("numéro de dossier inutilisable (lettres, chiffres, . _ -)")
        cx = base()
        try:
            d = cx.execute("SELECT * FROM vue_dossiers WHERE numero=?", (numero,)).fetchone()
            if not d:
                return erreur("dossier inconnu", 404)
            saisies = []
            for s in cx.execute("""SELECT * FROM saisies WHERE dossier=? AND courant=1
                                    ORDER BY module""", (numero,)):
                r = dict(s)
                r["donnees"] = json.loads(r.pop("donnees_json") or "{}")
                saisies.append(r)
            historique = [dict(r) for r in cx.execute(
                """SELECT id, module, module_version, provenance, ingere_at, archive
                     FROM saisies WHERE dossier=? AND courant=0 ORDER BY ingere_at DESC""",
                (numero,))]
            return jsonify({**dict(d), "saisies": saisies, "historique": historique})
        finally:
            cx.close()

    @app.put("/api/dossiers/<numero>")
    def api_maj_dossier(numero):
        """Statut, remarques, opérateur assigné — les seuls champs qui ne
        viennent pas d'un module. Une constatation ne se corrige pas ici."""
        if not DOSSIER_OK.match(numero):
            return erreur("numéro de dossier inutilisable (lettres, chiffres, . _ -)")
        corps = request.get_json(silent=True) or {}
        champs, valeurs = [], []
        if "statut" in corps:
            if corps["statut"] not in ("ouvert", "en_cours", "complet", "clos"):
                return erreur("statut inconnu")
            champs.append("statut = ?")
            valeurs.append(corps["statut"])
            champs.append("clos_at = ?")
            valeurs.append(ingest.dt.datetime.now().isoformat(timespec="seconds")
                           if corps["statut"] == "clos" else None)
        for c in ("remarques", "assigne_a"):
            if c in corps:
                champs.append(f"{c} = ?")
                valeurs.append((corps[c] or "").strip() or None)
        if not champs:
            return erreur("rien à modifier")
        cx = base()
        try:
            cur = cx.execute(f"UPDATE dossiers SET {', '.join(champs)} WHERE numero = ?",
                             valeurs + [numero])
            if not cur.rowcount:
                return erreur("dossier inconnu", 404)
            journal(cx, "info", "dossier modifié : " + ", ".join(corps), dossier=numero)
            cx.commit()
            ecrire_index(cx, racine)
            d = cx.execute("SELECT * FROM vue_dossiers WHERE numero=?", (numero,)).fetchone()
            return jsonify(dict(d))
        finally:
            cx.close()

    # ── Saisies ────────────────────────────────────────────────────────────
    @app.get("/api/saisie/<numero>/<module>")
    def api_saisie(numero, module):
        """Le document d'un module, pour le relire dans le module lui-même.

        Avec ?cliches=1 on sert le fichier d'archive : c'est le seul endroit
        où les clichés sont encore en base64, et c'est ce qu'attend relire()
        pour remonter les images dans le stockage local du module.
        """
        if not DOSSIER_OK.match(numero):
            return erreur("numéro de dossier inutilisable (lettres, chiffres, . _ -)")
        cx = base()
        try:
            s = cx.execute("""SELECT archive, donnees_json FROM saisies
                               WHERE dossier=? AND module=? AND courant=1""",
                           (numero, module)).fetchone()
            if not s:
                return erreur("aucune saisie courante pour ce module", 404)
            if request.args.get("cliches") == "1":
                f = racine / s["archive"]
                if f.exists():
                    return Response(f.read_bytes(), mimetype="application/json")
            return Response(s["donnees_json"], mimetype="application/json")
        finally:
            cx.close()

    @app.post("/api/saisie/<int:sid>/courante")
    def api_rendre_courante(sid):
        """Remonte une saisie de l'historique — l'actuelle y descend."""
        cx = base()
        try:
            dossier, module = ingest.rendre_courante(cx, sid)
            journal(cx, "info", f"saisie {sid} rendue courante", dossier=dossier, module=module)
            cx.commit()
            ecrire_index(cx, racine)
            return jsonify({"dossier": dossier, "module": module})
        except Refus as e:
            cx.rollback()
            return erreur(str(e), 404)
        finally:
            cx.close()

    @app.post("/api/saisie")
    def api_poser_saisie():
        """Reçoit l'enveloppe d'un module servi par le hub.

        Le corps est exactement ce que le bouton « Exporter » aurait écrit
        dans un fichier ; il suit le même chemin qu'un JSON recopié du
        téléphone, à la modalité d'entrée près.
        """
        brut = request.get_data()
        if not brut:
            return erreur("corps vide")
        cx = base()
        try:
            try:
                enveloppe = json.loads(brut.decode("utf-8-sig"))
                nom = f"{enveloppe.get('dossier')}_{enveloppe.get('module')}.json"
            except (ValueError, AttributeError):
                nom = "saisie.json"
            etat, msg, sid = ingerer(cx, racine, brut, nom, provenance="poste")
            cx.commit()
            journal(cx, "doublon" if etat == "doublon" else "info", msg,
                    fichier=nom, dossier=enveloppe.get("dossier") if isinstance(enveloppe, dict) else None,
                    module=enveloppe.get("module") if isinstance(enveloppe, dict) else None)
            cx.commit()
            ecrire_index(cx, racine)
            return jsonify({"etat": etat, "message": msg, "saisie_id": sid})
        except Refus as e:
            cx.rollback()
            journal(cx, "rejet", str(e), fichier="POST /api/saisie")
            cx.commit()
            return erreur(str(e), 422)
        finally:
            cx.close()

    # ── Ingestion pilotée ──────────────────────────────────────────────────
    @app.post("/api/deposer")
    def api_deposer():
        """Reçoit des JSON depuis la page et les pose dans arrivee/.

        La copie manuelle depuis le téléphone reste possible et reste la voie
        de référence — ceci ne fait que l'épargner quand on a déjà les fichiers
        sous la main. On écrit dans arrivee/ plutôt que d'ingérer directement :
        ainsi le dépôt et la reprise restent deux gestes distincts, la reprise
        emprunte exactement le même chemin que d'habitude, et un fichier
        refusé finit dans rejets/ comme les autres.
        """
        recus = request.files.getlist("fichiers")
        if not recus:
            return erreur("aucun fichier reçu")
        arrivee = racine / "arrivee"
        arrivee.mkdir(parents=True, exist_ok=True)
        poses, ignores = [], []
        for f in recus:
            nom = Path(f.filename or "").name          # jamais de chemin
            if not NOM_JSON_OK.match(nom):
                ignores.append({"fichier": f.filename or "(sans nom)",
                                "raison": "nom inattendu — un .json exporté par un module"})
                continue
            cible = arrivee / nom
            n = 2
            while cible.exists():                      # ne jamais écraser un dépôt en attente
                cible = arrivee / f"{Path(nom).stem}-{n}.json"
                n += 1
            f.save(cible)
            if cible.stat().st_size == 0:
                cible.unlink(missing_ok=True)
                ignores.append({"fichier": nom, "raison": "fichier vide"})
                continue
            poses.append(cible.name)
        cx = base()
        try:
            for nom in poses:
                journal(cx, "info", "déposé depuis la page", nom)
            for x in ignores:
                journal(cx, "rejet", x["raison"], x["fichier"])
            cx.commit()
        finally:
            cx.close()
        return jsonify({"deposes": poses, "ignores": ignores,
                        "arrivee": len(list(arrivee.glob("*.json")))})

    @app.post("/api/ingerer")
    def api_ingerer():
        """Reprend tout ce qui attend dans arrivee/, comme le ferait le .bat."""
        cx = base()
        lignes, n_ok, n_dbl, n_ko = [], 0, 0, 0
        try:
            fichiers = sorted((racine / "arrivee").glob("*.json"),
                              key=lambda p: (_priorite(p), p.name))
            for f in fichiers:
                try:
                    etat, msg = ingerer_fichier(cx, racine, f)
                    cx.commit()
                    if etat == "doublon":
                        n_dbl += 1
                        f.unlink(missing_ok=True)
                    else:
                        n_ok += 1
                    journal(cx, "doublon" if etat == "doublon" else "info", msg, f.name)
                    cx.commit()
                    lignes.append({"fichier": f.name, "etat": etat, "message": msg})
                except Refus as e:
                    cx.rollback()
                    n_ko += 1
                    cible = rejeter(racine, f, str(e))
                    journal(cx, "rejet", str(e), f.name)
                    cx.commit()
                    lignes.append({"fichier": f.name, "etat": "rejet",
                                   "message": str(e), "rejet": cible.name})
                except Exception as e:                          # anomalie du script
                    # Même traitement que la ligne de commande : le fichier
                    # part dans rejets/ avec la trace, la boucle continue et
                    # l'index est réécrit. Avant, l'exception remontait en
                    # 500, le fichier restait dans arrivee/ et l'index
                    # n'était plus réécrit — la page affichait alors des
                    # dossiers en retard sur la base.
                    cx.rollback()
                    n_ko += 1
                    cible = rejeter(racine, f, f"erreur inattendue : {e}",
                                    traceback.format_exc())
                    journal(cx, "erreur", f"{type(e).__name__}: {e}", f.name)
                    cx.commit()
                    lignes.append({"fichier": f.name, "etat": "erreur",
                                   "message": f"erreur inattendue : {e}",
                                   "rejet": cible.name})
            ecrire_index(cx, racine)
            return jsonify({"ingerees": n_ok, "doublons": n_dbl, "rejets": n_ko,
                            "lignes": lignes})
        finally:
            cx.close()

    @app.post("/api/reindexer")
    def api_reindexer():
        cx = base()
        try:
            faites, sans_ad, sans_doc = reindexer(cx, bavard=False)
            ecrire_index(cx, racine)
            return jsonify({"saisies": faites, "sans_adaptateur": sans_ad,
                            "sans_document": sans_doc})
        finally:
            cx.close()

    # ── Journal et rejets ──────────────────────────────────────────────────
    @app.get("/api/journal")
    def api_journal():
        cx = base()
        try:
            lignes = [dict(r) for r in cx.execute(
                """SELECT at, niveau, fichier, dossier, module, message
                     FROM journal ORDER BY id DESC LIMIT 300""")]
        finally:
            cx.close()
        rejets = []
        for f in sorted((racine / "rejets").glob("*.json"), reverse=True):
            motif = f.with_suffix(f.suffix + ".txt")
            rejets.append({
                "fichier": f.name,
                "octets": f.stat().st_size,
                "motif": motif.read_text(encoding="utf-8", errors="replace").strip()
                         if motif.exists() else "",
            })
        return jsonify({"journal": lignes, "rejets": rejets,
                        "arrivee": sorted(p.name for p in (racine / "arrivee").glob("*.json"))})

    @app.post("/api/rejets/<nom>/reprendre")
    def api_reprendre_rejet(nom):
        """Remet un fichier rejeté dans arrivee/ pour une nouvelle tentative.

        Utile après une migration : un JSON refusé pour cause de schéma
        inconnu redevient ingérable sans qu'on aille le déplacer à la main.
        """
        src = (racine / "rejets" / nom).resolve()
        if src.parent != (racine / "rejets").resolve() or not src.is_file():
            return erreur("fichier de rejet introuvable", 404)
        cible = racine / "arrivee" / re.sub(r"^\d{8}-\d{6}_", "", src.name)
        src.replace(cible)
        motif = Path(str(src) + ".txt")
        if motif.exists():
            motif.unlink()
        return jsonify({"repris": cible.name})

    # ── Modules servis ─────────────────────────────────────────────────────
    @app.get("/api/modules")
    def api_modules():
        return jsonify(modules_disponibles(depot))

    @app.get("/modules/<slug>")
    def page_module(slug):
        """Sert un module du dépôt en y greffant la liaison au hub.

        Le fichier sur le disque n'est jamais modifié : on lit, on insère le
        script juste avant </body>, on envoie. Le même fichier ouvert par
        double-clic reste le document autonome qu'il a toujours été.
        """
        mods = modules_disponibles(depot)
        if slug not in mods:
            return erreur("module inconnu", 404)
        html = Path(mods[slug]["chemin"]).read_text(encoding="utf-8")
        greffe = '<script src="/liaison.js"></script>\n</body>'
        # La DERNIÈRE balise fermante, pas la première : un module peut porter
        # d'autres documents dans son corps — l'étui de microscopie embarque
        # dix-sept grilles entières, chacune avec la sienne. Greffer sur la
        # première déposerait le script dans un bloc que le navigateur ne lit
        # pas, et la liaison ne s'exécuterait jamais, sans la moindre erreur.
        if "</body>" in html:
            avant, apres = html.rsplit("</body>", 1)
            html = avant + greffe + apres
        else:
            html += greffe
        return Response(html, mimetype="text/html; charset=utf-8")

    # ── Comptes rendus ─────────────────────────────────────────────────────
    @app.get("/api/gabarits")
    def api_gabarits():
        return jsonify({"gabarits": compte_rendu.gabarits_disponibles(),
                        "jinja": compte_rendu.JINJA,
                        "references": {"dispo": refs.dispo, "sources": refs.sources,
                                       "erreurs": refs.erreurs}})

    # ── Gabarits de compte rendu : lire, essayer, enregistrer ──────────────
    @app.get("/api/gabarits/<nom>/source")
    def api_gabarit_source(nom):
        try:
            return jsonify({"nom": nom, "source": compte_rendu.source(nom)})
        except ValueError as e:
            return erreur(str(e), 404)

    @app.post("/api/gabarits/<nom>/apercu")
    def api_gabarit_apercu(nom):
        """Rend la source de l'éditeur sur un dossier, sans rien enregistrer."""
        d = request.get_json(silent=True) or {}
        numero = (d.get("dossier") or "").strip()
        if not DOSSIER_OK.match(numero):
            return erreur("numéro de dossier inutilisable (lettres, chiffres, . _ -)")
        texte = d.get("source")
        if not isinstance(texte, str) or not texte.strip():
            return erreur("source vide")
        cx = base()
        try:
            return jsonify({"texte": compte_rendu.apercu(cx, numero, texte, refs,
                                                         ORDRE_MODULES)})
        except Exception as e:
            # Une erreur de gabarit est une information pour celui qui l'écrit,
            # pas une panne du serveur : on la rend telle quelle.
            return erreur(f"{type(e).__name__} : {e}", 422)
        finally:
            cx.close()

    @app.put("/api/gabarits/<nom>")
    def api_gabarit_ecrire(nom):
        d = request.get_json(silent=True) or {}
        try:
            f = compte_rendu.enregistrer_gabarit(nom, d.get("source") or "")
        except ValueError as e:
            return erreur(str(e))
        cx = base()
        try:
            journal(cx, "info", f"gabarit « {nom} » enregistré")
            cx.commit()
        finally:
            cx.close()
        return jsonify({"nom": nom, "fichier": f.name,
                        "gabarits": compte_rendu.gabarits_disponibles()})

    # ── Statistiques ───────────────────────────────────────────────────────
    @app.get("/api/stats")
    def api_stats():
        """Ce que la base sait dire d'elle-même. Aucun calcul métier ici :
        des comptages, et les regroupements qu'un fœtopathologiste lit."""
        cx = base()
        try:
            def compte(sql, *a):
                return [dict(r) for r in cx.execute(sql, a)]
            tranches = compte("""
                SELECT CASE
                         WHEN terme_sa IS NULL      THEN 'terme non saisi'
                         WHEN terme_sa < 14         THEN 'moins de 14 SA'
                         WHEN terme_sa < 22         THEN '14 à 21 SA'
                         WHEN terme_sa < 28         THEN '22 à 27 SA'
                         WHEN terme_sa < 34         THEN '28 à 33 SA'
                         ELSE '34 SA et plus' END AS cle,
                       COUNT(*) AS n
                FROM dossiers GROUP BY cle ORDER BY MIN(COALESCE(terme_sa, 99))""")
            delais = compte("""
                SELECT julianday(date_examen) - julianday(date_reception) AS j
                FROM dossiers
                WHERE date_examen IS NOT NULL AND date_reception IS NOT NULL""")
            jours = sorted(int(x["j"]) for x in delais if x["j"] is not None)
            return jsonify({
                "dossiers": cx.execute("SELECT COUNT(*) FROM dossiers").fetchone()[0],
                "saisies": cx.execute(
                    "SELECT COUNT(*) FROM saisies WHERE courant=1").fetchone()[0],
                "cliches": cx.execute("SELECT COUNT(*) FROM photos").fetchone()[0],
                "octets_cliches": cx.execute(
                    "SELECT COALESCE(SUM(octets),0) FROM photos").fetchone()[0],
                "statut": compte("SELECT statut AS cle, COUNT(*) n FROM dossiers"
                                 " GROUP BY statut ORDER BY n DESC"),
                "issue": compte("SELECT COALESCE(type_issue,'non saisi') AS cle,"
                                " COUNT(*) n FROM dossiers GROUP BY cle ORDER BY n DESC"),
                "sexe": compte("SELECT COALESCE(sexe,'non saisi') AS cle, COUNT(*) n"
                               " FROM dossiers GROUP BY cle ORDER BY n DESC"),
                "terme": tranches,
                "maceration": compte("""
                    SELECT 'grade ' || COALESCE(a.maceration_maroun, '?') AS cle,
                           COUNT(*) n
                    FROM autopsie a JOIN saisies s ON s.id = a.saisie_id AND s.courant=1
                    GROUP BY cle ORDER BY cle"""),
                "provenance": compte("SELECT provenance AS cle, COUNT(*) n FROM saisies"
                                     " WHERE courant=1 GROUP BY cle ORDER BY n DESC"),
                "modules": compte("""
                    SELECT module AS cle, COUNT(DISTINCT dossier) n
                    FROM saisies WHERE courant=1 GROUP BY module"""),
                "mois": compte("""
                    SELECT substr(date_examen,1,7) AS cle, COUNT(*) n
                    FROM dossiers WHERE date_examen IS NOT NULL
                    GROUP BY cle ORDER BY cle"""),
                "delai": ({"n": len(jours), "median": jours[len(jours)//2],
                           "min": jours[0], "max": jours[-1]} if jours else None),
                "attendus": ORDRE_MODULES,
                "facultatifs": sorted(MODULES_FACULTATIFS),
            })
        finally:
            cx.close()

    # ── Contrôle qualité ───────────────────────────────────────────────────
    @app.get("/api/qualite")
    def api_qualite():
        """Ce qui mérite un second regard. Rien n'est corrigé ici : la page
        montre où aller, la correction se fait dans le module concerné."""
        cx = base()
        try:
            manque = []
            for r in cx.execute("SELECT numero, statut FROM dossiers ORDER BY numero"):
                vus = {x[0] for x in cx.execute(
                    "SELECT module FROM saisies WHERE dossier=? AND courant=1",
                    (r["numero"],))}
                vus = {slot(m) for m in vus}
                absents = [m for m in ORDRE_MODULES
                           if m not in vus and m not in MODULES_FACULTATIFS]
                if absents:
                    manque.append({"dossier": r["numero"], "statut": r["statut"],
                                   "modules": absents})
            termes = []
            for r in cx.execute("SELECT DISTINCT dossier FROM saisies WHERE courant=1"):
                d = r["dossier"]
                vus = {}
                for t_, col in (("autopsie", "terme_sa"), ("neuropath", "terme_sa"),
                                ("biometrie_clinique", "terme_sa"), ("radio", "terme_sa")):
                    x = cx.execute(f"""SELECT {col} v FROM {t_} t
                                       JOIN saisies s ON s.id=t.saisie_id AND s.courant=1
                                       WHERE t.dossier=?""", (d,)).fetchone()
                    if x and x["v"] is not None:
                        vus[t_] = x["v"]
                a = cx.execute("SELECT terme_sa v FROM dossiers WHERE numero=?",
                               (d,)).fetchone()
                if a and a["v"] is not None:
                    vus["administratif"] = a["v"]
                if len(set(vus.values())) > 1:
                    termes.append({"dossier": d, "vu_par": vus})
            extremes = [dict(r) for r in cx.execute("""
                SELECT c.dossier, c.champ_label AS organe, c.total AS valeur,
                       c.z_gc, c.z_ma, c.z_mb
                FROM autopsie_champs c
                JOIN saisies s ON s.id = c.saisie_id AND s.courant = 1
                WHERE MAX(ABS(COALESCE(c.z_gc,0)), ABS(COALESCE(c.z_ma,0)),
                          ABS(COALESCE(c.z_mb,0))) > 4
                ORDER BY c.dossier, c.champ_label""")]
            vieux = [dict(r) for r in cx.execute("""
                SELECT numero, statut, date_examen,
                       CAST(julianday('now') - julianday(date_examen) AS INTEGER) jours
                FROM dossiers
                WHERE statut <> 'clos' AND date_examen IS NOT NULL
                  AND julianday('now') - julianday(date_examen) > 60
                ORDER BY jours DESC""")]
            return jsonify({"modules_manquants": manque, "termes_discordants": termes,
                            "z_extremes": extremes, "dossiers_anciens": vieux,
                            "saisies_sans_document": ingest.saisies_sans_document(cx)})
        finally:
            cx.close()

    # ── BaMaRa : préparer, pas envoyer ─────────────────────────────────────
    @app.get("/api/bamara")
    def api_bamara():
        cx = base()
        try:
            return jsonify({"reglages": prep_bamara.config(racine),
                            "requis": [{"cle": c, "bloc": b, "libelle": l,
                                        "source": s, "bloquant": q}
                                       for c, b, l, s, q in prep_bamara.REQUIS],
                            "dossiers": prep_bamara.audit(cx,
                                                          prep_bamara.config(racine))})
        finally:
            cx.close()

    @app.put("/api/bamara/reglages")
    def api_bamara_reglages():
        d = request.get_json(silent=True) or {}
        return jsonify({"reglages": prep_bamara.ecrire_config(d, racine)})

    @app.get("/api/bamara/<numero>")
    def api_bamara_dossier(numero):
        if not DOSSIER_OK.match(numero):
            return erreur("numéro de dossier inutilisable (lettres, chiffres, . _ -)")
        cx = base()
        try:
            doc, manques = prep_bamara.preparer(cx, numero, prep_bamara.config(racine))
            if doc is None:
                return erreur("aucune saisie administrative pour ce dossier", 404)
            return jsonify({"dossier": numero, "document": doc, "manques": manques})
        finally:
            cx.close()

    # Aucune adresse pour un script extérieur : le document BaMaRa quitte le
    # hub par un fichier (bouton « document », ou le lot ci-dessous) que
    # l'opérateur glisse lui-même dans la page BaMaRa. Pas de canal vivant
    # entre une page externe et les dossiers en clair.
    @app.get("/api/bamara/lot.zip")
    def api_bamara_lot():
        """Tous les dossiers déclarables, un <dossier>_bamara.json chacun, dans
        un zip à décompresser dans un dossier : c'est ce dossier que le script
        de pré-remplissage parcourt, dossier après dossier. Chaque document
        emporte ses manques (`_manques`) : ce que le script ne posera pas et
        que l'opérateur tape lui-même — le statut diagnostique, en tête, n'est
        collecté nulle part, donc aucun dossier n'est jamais « prêt » au sens
        strict. Un dossier ouvert reste exclu : il n'est pas fini."""
        cx = base()
        try:
            cfg = prep_bamara.config(racine)
            retenus = [d["dossier"] for d in prep_bamara.audit(cx, cfg)
                       if d.get("declarable") and d.get("statut") != "ouvert"]
            buf = io.BytesIO()
            with zipfile.ZipFile(buf, "w", zipfile.ZIP_DEFLATED) as z:
                for n in retenus:
                    doc, manques = prep_bamara.preparer(cx, n, cfg)
                    doc["_manques"] = manques
                    z.writestr(f"{n}_bamara.json", json.dumps(doc, ensure_ascii=False, indent=1))
        finally:
            cx.close()
        if not retenus:
            return erreur("aucun dossier déclarable hors statut « ouvert »", 404)
        buf.seek(0)
        return send_file(buf, mimetype="application/zip", as_attachment=True,
                         download_name=f"bamara_lot_{dt.date.today().isoformat()}.zip")

    # ── Sauvegarde ─────────────────────────────────────────────────────────
    def _poids(chemin: Path):
        """Ce qu'il y aurait à sauvegarder, et ce que ça pèse."""
        out = {"racine": str(chemin), "detail": [], "octets": 0}
        base_ = chemin / "hub.sqlite"
        if base_.is_file():
            n = base_.stat().st_size
            out["detail"].append({"quoi": "hub.sqlite", "fichiers": 1, "octets": n})
            out["octets"] += n
        for nom in ("archive", "photos"):
            d = chemin / nom
            if not d.is_dir():
                continue
            fs = [f for f in d.rglob("*") if f.is_file()]
            n = sum(f.stat().st_size for f in fs)
            out["detail"].append({"quoi": nom + "/", "fichiers": len(fs), "octets": n})
            out["octets"] += n
        return out

    @app.get("/api/sauvegarde")
    def api_sauvegarde_etat():
        return jsonify(_poids(racine))

    @app.post("/api/sauvegarde")
    def api_sauvegarde():
        """Copie la base, l'archive, les clichés et l'index vers un dossier.

        La base est copiée par l'API de sauvegarde de SQLite et non par un
        `copy` : un fichier recopié pendant qu'une écriture est en cours ne
        vaut rien, et c'est justement le jour où on en a besoin qu'on s'en
        aperçoit.
        """
        d = request.get_json(silent=True) or {}
        dest = (d.get("destination") or "").strip()
        if not dest:
            return erreur("destination manquante")
        cible = Path(dest).expanduser()
        if not cible.is_absolute():
            return erreur("donner un chemin absolu")
        if not cible.is_dir():
            return erreur(f"{cible} n'existe pas ou n'est pas un dossier")
        try:
            cible.resolve().relative_to(racine.resolve())
            return erreur("sauvegarder dans le hub lui-même ne protège de rien")
        except ValueError:
            pass
        horo = dt.datetime.now().strftime("%Y%m%d-%H%M")
        sortie = cible / f"hub-{horo}"
        if sortie.exists():
            return erreur(f"{sortie.name} existe déjà")
        sortie.mkdir(parents=True)
        faits, octets = [], 0
        cx = base()
        try:
            copie = sqlite3.connect(str(sortie / "hub.sqlite"))
            with copie:
                cx.backup(copie)
            copie.close()
            n = (sortie / "hub.sqlite").stat().st_size
            faits.append({"quoi": "hub.sqlite", "fichiers": 1, "octets": n})
            octets += n
        finally:
            cx.close()
        for nom in ("archive", "photos"):
            src = racine / nom
            if not src.is_dir():
                continue
            shutil.copytree(src, sortie / nom, dirs_exist_ok=True)
            fs = [f for f in (sortie / nom).rglob("*") if f.is_file()]
            n = sum(f.stat().st_size for f in fs)
            faits.append({"quoi": nom + "/", "fichiers": len(fs), "octets": n})
            octets += n
        for nom in ("index.json",):
            if (racine / nom).is_file():
                shutil.copy2(racine / nom, sortie / nom)
                faits.append({"quoi": nom, "fichiers": 1,
                              "octets": (sortie / nom).stat().st_size})
        cx = base()
        try:
            journal(cx, "info", f"sauvegarde vers {sortie}")
            cx.commit()
        finally:
            cx.close()
        return jsonify({"destination": str(sortie), "detail": faits, "octets": octets})

    @app.get("/api/dossiers/<numero>/cr")
    def api_cr_liste(numero):
        if not DOSSIER_OK.match(numero):
            return erreur("numéro de dossier inutilisable (lettres, chiffres, . _ -)")
        cx = base()
        try:
            return jsonify([dict(r) for r in cx.execute(
                """SELECT id, gabarit, gabarit_version, genere_at, operateur,
                          length(texte) AS octets
                     FROM comptes_rendus WHERE dossier=? ORDER BY id DESC""", (numero,))])
        finally:
            cx.close()

    @app.post("/api/dossiers/<numero>/cr")
    def api_cr_generer(numero):
        """Produit un brouillon et l'enregistre.

        Un compte rendu n'est pas une donnée de saisie : c'est un rendu daté.
        On le garde pour pouvoir montrer ce qui a été écrit, même après un
        changement de gabarit ou de table de référence.
        """
        if not DOSSIER_OK.match(numero):
            return erreur("numéro de dossier inutilisable (lettres, chiffres, . _ -)")
        if not compte_rendu.JINJA:
            return erreur("Jinja2 est absent — il vient avec Flask : pip install flask", 501)
        corps = request.get_json(silent=True) or {}
        gabarit = corps.get("gabarit") or "complet"
        cx = base()
        try:
            i, texte = compte_rendu.rendre(cx, numero, gabarit, refs, ORDRE_MODULES,
                                           operateur=(corps.get("operateur") or "").strip() or None)
            journal(cx, "info", f"compte rendu « {gabarit} » produit", dossier=numero)
            cx.commit()
            ecrire_index(cx, racine)
            return jsonify({"id": i, "gabarit": gabarit, "texte": texte})
        except ValueError as e:
            return erreur(str(e), 404)
        except Exception as e:                      # une erreur de gabarit est lisible
            return erreur(f"rendu impossible : {type(e).__name__} — {e}", 500)
        finally:
            cx.close()

    @app.get("/api/cr/<int:cr_id>")
    def api_cr_lire(cr_id):
        cx = base()
        try:
            r = cx.execute("SELECT * FROM comptes_rendus WHERE id=?", (cr_id,)).fetchone()
            if not r:
                return erreur("compte rendu inconnu", 404)
            return jsonify(dict(r))
        finally:
            cx.close()

    # ── Clichés ────────────────────────────────────────────────────────────
    @app.get("/photos/<path:rel>")
    def photo(rel):
        cible = (racine / "photos" / rel).resolve()
        if not str(cible).startswith(str((racine / "photos").resolve())):
            return erreur("chemin refusé", 403)
        if not cible.is_file():
            return erreur("cliché introuvable", 404)
        return send_from_directory(cible.parent, cible.name)

    @app.get("/api/etat")
    def api_etat():
        cx = base()
        try:
            n = cx.execute("SELECT COUNT(*) c FROM dossiers").fetchone()["c"]
            idx = cx.execute("SELECT * FROM index_etat WHERE id=1").fetchone()
        finally:
            cx.close()
        return jsonify({
            "racine": str(racine),
            "dossiers": n,
            "pillow": ingest.PILLOW,
            "arrivee": len(list((racine / "arrivee").glob("*.json"))),
            "rejets": len(list((racine / "rejets").glob("*.json"))),
            "modules_attendus": ORDRE_MODULES,
            "index": dict(idx) if idx else None,
            "references": {"dispo": refs.dispo, "sources": refs.sources},
            "jinja": compte_rendu.JINJA,
        })

    return app


def _priorite(p: Path):
    """L'ordre de reprise : l'administratif d'abord, il crée la fiche.

    Les grilles de microscopie prennent la place de leur créneau — sinon elles
    passeraient en dernier, après la neuropathologie, ce qui ne change rien au
    résultat mais brouille la lecture du journal.
    """
    for i, m in enumerate(ORDRE_MODULES):
        if p.stem.endswith("_" + m):
            return i
    for m in MODULES_MICRO:
        if p.stem.endswith("_" + m):
            return ORDRE_MODULES.index("microscopie")
    return len(ORDRE_MODULES)


def main():
    ap = argparse.ArgumentParser(description="Serveur local du hub fœtopathologie.")
    ap.add_argument("--base", type=Path, default=HUB, help="racine du hub (données)")
    ap.add_argument("--depot", type=Path, default=DEPOT,
                    help="dépôt des modules HTML (défaut : le dossier parent du hub)")
    ap.add_argument("--port", type=int, default=5005)
    ap.add_argument("--host", default="127.0.0.1",
                    help="ne changer qu'en connaissance de cause : il n'y a pas d'authentification")
    ap.add_argument("--debug", action="store_true")
    args = ap.parse_args()

    racine = args.base.resolve()
    depot = args.depot.resolve()
    racine.mkdir(parents=True, exist_ok=True)
    arborescence(racine)

    cx, mode = ouvrir(racine / "hub.sqlite")
    if mode in ingest.AVIS_MODE:
        print("journal  : " + ingest.AVIS_MODE[mode])
    migrer(cx, racine / "migrations" if (racine / "migrations").is_dir() else ICI / "migrations")

    vieilles = ingest.saisies_sans_document(cx)
    if vieilles:
        print(f"note     : {vieilles} saisie(s) d'avant la migration 0002 n'ont pas leur JSON\n"
              "           en base — `python app/ingest.py --rejouer` les rattrape depuis l'archive.")
    ecrire_index(cx, racine)
    cx.close()

    refs = biometrie.References(racine)
    mods = modules_disponibles(depot)
    print(f"hub      : {racine}")
    print("z-scores : " + ("calculés ici — " + ", ".join(refs.sources.values())
                           if refs.dispo else
                           "références absentes, ceux des modules sont repris tels quels "
                           "(voir references/LISEZMOI.md)"))
    print(f"Pillow   : {'oui' if ingest.PILLOW else 'non — vignettes désactivées'}")
    print(f"modules  : {len(mods)} servis" +
          (f" ({sum(1 for m in mods.values() if m['ingerable'])} ingérables)" if mods else ""))
    if args.host != "127.0.0.1":
        print("ATTENTION: écoute hors boucle locale, sans authentification.")
    print(f"\n  http://{args.host}:{args.port}\n")

    creer_app(racine, depot, hotes=[args.host]).run(
        host=args.host, port=args.port, debug=args.debug, threaded=False)


if __name__ == "__main__":
    main()
