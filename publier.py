"""Fabrique public/ — les modules et une page d'index lue dans les modules eux-memes.

    python3 publier.py            # regenere public/
    python3 -m http.server 5075 --directory public --bind 127.0.0.1

La page n'est jamais ecrite a la main : versions, tailles et empreintes sont
relues dans les fichiers, donc elle ne peut pas mentir sur ce qui est publie.
"""

import hashlib
import re
import shutil
from datetime import datetime
from pathlib import Path

ICI = Path(__file__).parent
PUBLIC = ICI / "public"

# Ordre d'apparition = ordre de l'examen.
MODULES = [
    ("examen_clinique.html", "Examen clinique externe",
     "Morphologie externe etage par etage, cliches de trame et anomalies."),
    ("biometrie_clinique.html", "Biometrie clinique",
     "Mesures au ruban et au pied a coulisse, z-scores contre les references."),
    ("radio.html", "Radiographies",
     "Lecture du squelette, mesures des os longs, z-scores de Chitty."),
    ("autopsie.html", "Autopsie — examen interne",
     "Le deroule complet de l'autopsie, masses d'organes et z-scores."),
]

CONST = {k: re.compile(r'var %s\s*=\s*"([^"]+)"' % k) for k in ("MODULE", "SCHEMA", "VERSION")}


def lire(nom):
    src = (ICI / nom).read_text(encoding="utf-8")
    fiche = {k: r.search(src).group(1) for k, r in CONST.items()}
    brut = (ICI / nom).read_bytes()
    fiche["octets"] = len(brut)
    fiche["ko"] = "%d Ko" % round(len(brut) / 1024)
    fiche["sha"] = hashlib.sha256(brut).hexdigest()[:8]
    fiche["date"] = datetime.fromtimestamp((ICI / nom).stat().st_mtime).strftime("%d/%m/%Y")
    fiche["essais"] = len(re.findall(r'\bchk\(', src))
    return fiche


PAGE = """<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Hub Light — modules de saisie fœtopathologique</title>
<style>
:root{{--paper:#EDEFEE;--card:#FFF;--ink:#161D1C;--ink-soft:#5A6462;--rule:#CBD2D0;
      --drape:#0E6B62;--drape-soft:#E2EFEC;--amber:#8A6A18;
      --mono:ui-monospace,"SF Mono",Menlo,Consolas,monospace;
      --sans:ui-sans-serif,system-ui,"Segoe UI",Roboto,Helvetica,Arial,sans-serif}}
*{{box-sizing:border-box}} html,body{{margin:0;padding:0}}
body{{background:var(--paper);color:var(--ink);font-family:var(--sans);font-size:16px;line-height:1.5}}
.wrap{{max-width:920px;margin:0 auto;padding:16px 14px 60px}}
header{{border-bottom:2px solid var(--ink);padding-bottom:12px;margin-bottom:18px}}
.eyebrow{{font-family:var(--mono);font-size:11px;letter-spacing:.14em;text-transform:uppercase;
         color:var(--drape);margin:0 0 4px}}
h1{{font-size:22px;margin:0;font-weight:650;letter-spacing:-.01em}}
.sub{{font-size:14px;color:var(--ink-soft);margin:8px 0 0}}
section{{background:var(--card);border:1px solid var(--rule);border-radius:3px;padding:16px;margin-bottom:14px}}
h2{{font-family:var(--mono);font-size:11px;letter-spacing:.14em;text-transform:uppercase;
   color:var(--ink-soft);margin:0 0 12px;font-weight:600}}
h2 .n{{color:var(--drape);margin-right:8px}}
.mod{{border-top:1px solid var(--rule);padding:14px 0;display:flex;gap:14px;flex-wrap:wrap;align-items:flex-start}}
.mod:first-of-type{{border-top:0;padding-top:0}}
.mod .txt{{flex:1 1 340px;min-width:0}}
.mod .nom{{font-size:17px;font-weight:600;margin:0 0 3px}}
.mod .desc{{font-size:14px;color:var(--ink-soft);margin:0 0 7px}}
.tags{{display:flex;flex-wrap:wrap;gap:5px}}
.tag{{font-family:var(--mono);font-size:10px;letter-spacing:.06em;padding:2px 6px;
     border:1px solid var(--rule);border-radius:2px;color:var(--ink-soft);background:var(--paper)}}
.tag.v{{border-color:var(--drape);color:var(--drape);font-weight:600}}
.dl{{display:inline-block;font-family:var(--sans);font-size:15px;font-weight:550;text-decoration:none;
    background:var(--drape);color:#fff;border:1px solid var(--drape);border-radius:2px;
    padding:11px 15px;min-height:44px;white-space:nowrap}}
.dl:hover{{background:#0B564F}}
.dl small{{display:block;font-family:var(--mono);font-size:10px;font-weight:400;opacity:.8;letter-spacing:.06em}}
p{{margin:0 0 10px}} p:last-child{{margin-bottom:0}}
code{{font-family:var(--mono);font-size:13px;background:var(--paper);border:1px solid var(--rule);
     border-radius:2px;padding:1px 5px}}
dl{{margin:0}} dt{{font-family:var(--mono);font-size:12px;letter-spacing:.06em;color:var(--drape);
                 font-weight:600;margin-top:12px}} dt:first-child{{margin-top:0}}
dd{{margin:3px 0 0;font-size:15px}}
.avert{{border-left:2px solid var(--amber);background:#FBF6E7;padding:10px 12px;font-size:14px}}
footer{{font-family:var(--mono);font-size:11px;color:var(--ink-soft);text-align:center;margin-top:26px}}
</style>
</head>
<body>
<div class="wrap">

<header>
  <p class="eyebrow">Fœtopathologie · postes hors réseau</p>
  <h1>Hub Light — modules de saisie</h1>
  <p class="sub">Des documents HTML autonomes, à télécharger puis à ouvrir par double-clic.
  Aucune installation, aucun compte, aucune connexion. Les saisies et les clichés restent
  sur l'appareil ; l'export produit un fichier JSON que l'on récupère à la main.</p>
</header>

<section>
  <h2><span class="n">01</span>Modules</h2>
{modules}
</section>

<section>
  <h2><span class="n">02</span>Comment s'en servir</h2>
  <p>Télécharger le fichier, puis l'ouvrir par un double-clic. Le navigateur suffit —
  Chrome ou Firefox, à jour. Rien n'est envoyé nulle part.</p>
  <p>Saisir le numéro de dossier et les initiales de l'opérateur : le reste du document
  se déverrouille. La saisie s'enregistre toute seule dans le navigateur, au fil de la frappe.
  Fermer l'onglet ne perd rien ; rouvrir le même fichier et retaper le même numéro de dossier
  restitue tout.</p>
  <p>En fin d'examen, <b>Exporter le JSON</b> écrit un fichier
  <code>&lt;dossier&gt;_&lt;module&gt;.json</code> dans les téléchargements. C'est lui qui
  remonte dans la base. Le bouton <b>Relire un JSON</b> refait le chemin inverse, clichés compris.</p>
  <p class="avert"><b>Le stockage du navigateur n'est pas une sauvegarde.</b> Vider les données
  de navigation, passer en navigation privée ou changer de poste efface tout. Exporter le JSON
  à la fin de chaque examen, sans exception.</p>
</section>

<section>
  <h2><span class="n">03</span>Les deux numéros de version</h2>
  <p>Chaque module en porte deux, visibles dans son en-tête et recopiés dans chaque JSON exporté.
  Ils ne disent pas la même chose.</p>
  <dl>
    <dt>module_version — la version du document</dt>
    <dd>Elle change à chaque diffusion : un champ ajouté, un libellé corrigé, une anomalie
    de plus dans une liste. C'est celle qui est affichée ci-dessus, en vert. Si deux personnes
    n'ont pas le même numéro, elles n'ont pas le même formulaire.</dd>
    <dt>schema_version — la forme du JSON</dt>
    <dd>Elle ne change que si la structure du fichier exporté change, car c'est elle que lit
    le script d'import. Un JSON produit par une ancienne version du document reste lisible
    tant que son schéma est le même.</dd>
  </dl>
  <p>L'empreinte de huit caractères permet de vérifier qu'on a bien le fichier publié ici :
  <code>sha256sum &lt;fichier&gt;</code> et comparer les huit premiers caractères.</p>
  <p>Chaque module embarque son propre banc d'essai. Ouvrir le fichier en ajoutant
  <code>?selftest=1</code> à la fin de son adresse : un bandeau vert
  <code>OK : n/n</code> s'affiche en haut de la page. Rouge, ne pas s'en servir et le signaler.</p>
</section>

<section>
  <h2><span class="n">04</span>Ce qui n'est pas encore là</h2>
  <p>Macroscopie de l'organe fixé, description des coupes, lecture microscopique :
  ces trois modules restent à définir. Le script de reprise des JSON dans la base
  est en cours.</p>
</section>

<footer>Page fabriquée le {jour} depuis les fichiers publiés · P620</footer>

</div>
</body>
</html>
"""

BLOC = """  <div class="mod">
    <div class="txt">
      <p class="nom">{titre}</p>
      <p class="desc">{desc}</p>
      <div class="tags">
        <span class="tag v">v{VERSION}</span>
        <span class="tag">schéma {SCHEMA}</span>
        <span class="tag">module {MODULE}</span>
        <span class="tag">{ko}</span>
        <span class="tag">{essais} contrôles</span>
        <span class="tag">sha {sha}</span>
        <span class="tag">{date}</span>
      </div>
    </div>
    <a class="dl" href="{nom}" download>Télécharger<small>{nom}</small></a>
  </div>
"""


def main():
    PUBLIC.mkdir(exist_ok=True)
    blocs = []
    for nom, titre, desc in MODULES:
        f = lire(nom)
        shutil.copy2(ICI / nom, PUBLIC / nom)
        blocs.append(BLOC.format(nom=nom, titre=titre, desc=desc, **f))
        print("%-26s v%-7s schéma %-7s %7s  sha %s" % (nom, f["VERSION"], f["SCHEMA"], f["ko"], f["sha"]))
    (PUBLIC / "index.html").write_text(
        PAGE.format(modules="".join(blocs), jour=datetime.now().strftime("%d/%m/%Y à %H:%M")),
        encoding="utf-8")
    print("→", PUBLIC / "index.html")


if __name__ == "__main__":
    main()
