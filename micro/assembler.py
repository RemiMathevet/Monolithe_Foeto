#!/usr/bin/env python3
# SPDX-License-Identifier: CC-BY-NC-SA-4.0 | Hub Light | Monolithe_Foeto
"""
Assemble les dix-huit grilles de lecture en un seul document.

Les grilles partagent exactement la même enveloppe JSON, mais rien d'autre :
mêmes noms de fonctions (`collecter`, `composer`), mêmes identifiants de champs
(`dossier`, `operateur`, `sa`), mêmes noms de sections. Les coller bout à bout
ferait entrer en collision tout ce qui porte le même nom — c'est-à-dire à peu
près tout.

D'où le parti pris : ce fichier n'est pas une fusion, c'est un étui. Chaque
grille y reste un document entier, monté dans son propre cadre quand on la
demande, avec son code intact, son stockage local et son `collecter()`. Trois
conséquences qui valent d'être dites :

  · aucune grille n'est modifiée — une grille rediffusée se reprend en
    relançant ce script, il n'y a pas de version fusionnée qui dériverait ;
  · rien n'est chargé tant qu'on n'a pas cliqué sur l'organe, donc dix-huit
    grilles ne coûtent pas dix-huit grilles à l'ouverture ;
  · l'export reste un JSON par organe, dans l'enveloppe que les grilles
    produisent déjà — le hub n'a pas à connaître l'existence de cet étui.

Pas de regroupement par appareil : la colonne de navigation rend le classement
inutile, et un organe se cherche par son nom. L'ordre est alphabétique.

    python assembler.py
    python assembler.py --organes coeur poumon --sortie essai.html

Le fichier produit est autonome : double-clic, aucun réseau.
"""

import argparse
import re
import unicodedata
from pathlib import Path

ICI = Path(__file__).resolve().parent
VERSION = "1.0.0"

# Les organes sont rangés alphabétiquement dans chaque appareil : c'est le seul
# ordre qui ne raconte rien et ne se discute pas. Le regroupement, lui, suit
# l'appareil — c'est le plan du compte rendu.
# Nom court pour la navigation : le titre complet d'une grille tient rarement
# dans une colonne (« coeur, pericarde et arteres coronaires »). Il reste
# affiché en entier au-dessus de la grille et en infobulle.
NOMS = {
    "cerveau_moelle": "Cerveau et moelle", "coeur": "Cœur", "digestif": "Tube digestif",
    "foie": "Foie", "gonades": "Gonades", "muscle": "Muscle", "oeil": "Œil",
    "oreille": "Oreille", "pancreas": "Pancréas", "peau": "Peau", "placenta": "Placenta",
    "poumon": "Poumon",
    "rate": "Rate", "rein": "Rein", "surrenales": "Surrénales", "thymus": "Thymus",
    "thyroide": "Thyroïde", "vessie": "Vessie",
}

# Tous les organes du dossier micro/. Une grille ajoutée est prise en compte
# sans rien changer ici, à condition de lui donner un nom court ci-dessus.
ORGANES = sorted(NOMS)


def _rang(s):
    """Ordre alphabétique français : « Œil » avant « Oreille », « Cœur » à C.

    Le tri brut d'Unicode place les ligatures et les lettres accentuées après
    l'alphabet, ce qui donne un ordre que personne ne cherche.
    """
    s = s.lower().replace("œ", "oe").replace("æ", "ae")
    return "".join(c for c in unicodedata.normalize("NFD", s)
                   if unicodedata.category(c) != "Mn")


def nom_base(html, module):
    """Le nom exact de la base locale de la grille, lu dans son code.

    Seize grilles l'écrivent « "foeto-" + MODULE » ; celle du poumon, écrite la
    première, le pose en clair — et avec un tiret là où les autres ont un
    souligné. Le déduire du nom de module serait donc faux pour elle, et une
    grille remplie deviendrait invisible sans que rien ne le signale. On lit
    plutôt ce que le fichier déclare.
    """
    # La forme concaténée d'abord : sinon la première chaîne entre guillemets
    # de « "foeto-" + MODULE » serait prise pour le nom complet.
    if re.search(r'var DB_NAME\s*=\s*"foeto-"\s*\+\s*MODULE', html):
        return "foeto-" + module
    m = re.search(r'var DB_NAME\s*=\s*"([^"]+)"\s*[,;]', html)
    return m.group(1) if m else "foeto-" + module


def titre_de(html):
    m = re.search(r"<title>(.*?)</title>", html, re.S)
    t = m.group(1).strip() if m else ""
    return re.sub(r"^Grille de lecture\s*—\s*", "", t)


def version_de(html):
    m = re.search(r'var VERSION = "([^"]+)"', html)
    return m.group(1) if m else "?"


ETUI = r"""<!DOCTYPE html>
<!-- SPDX-License-Identifier: CC-BY-NC-SA-4.0 | Hub Light | Monolithe_Foeto -->
<!-- Produit par micro/assembler.py — ne pas modifier à la main : toute retouche
     serait perdue à la prochaine rediffusion d'une grille. Les grilles vivent
     dans micro/grille_*.html, et c'est là qu'on les corrige. -->
<html lang="fr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>Microscopie — grilles de lecture</title>
<style>
:root{
  --paper:#EDEFEE; --card:#FFFFFF; --ink:#161D1C; --ink-soft:#5A6462; --rule:#CBD2D0;
  --drape:#0E6B62; --drape-soft:#E2EFEC; --alert:#9C3A28; --amber:#8A6A18;
  --mono:ui-monospace,"SF Mono",Menlo,Consolas,"Liberation Mono",monospace;
  --sans:ui-sans-serif,system-ui,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;
}
*{box-sizing:border-box}
html,body{margin:0;padding:0;height:100%}
body{background:var(--paper);color:var(--ink);font-family:var(--sans);
     font-size:16px;line-height:1.45;display:flex;flex-direction:column}
header{border-bottom:2px solid var(--ink);padding:12px 14px 11px;background:var(--card)}
.eyebrow{font-family:var(--mono);font-size:11px;letter-spacing:.14em;
         text-transform:uppercase;color:var(--drape);margin:0 0 4px}
h1{font-size:20px;line-height:1.2;margin:0;font-weight:650}
h1 .ver{font-family:var(--mono);font-size:11px;font-weight:400;color:var(--ink-soft)}
.sub{font-size:13px;color:var(--ink-soft);margin:6px 0 0}
.row{display:flex;flex-wrap:wrap;gap:10px;align-items:flex-end;margin-top:10px}
.field{flex:0 1 200px;min-width:0}
label{display:block;font-size:12px;color:var(--ink-soft);margin:0 0 4px}
input{width:100%;padding:7px 9px;font-size:14.5px;font-family:inherit;color:var(--ink);
      background:#fff;border:1px solid var(--rule);border-radius:3px}
input:focus{outline:2px solid var(--drape);outline-offset:-1px}
.mono{font-family:var(--mono)}
.hint{font-size:11.5px;color:var(--ink-soft);margin-top:3px}
.btn{padding:7px 12px;font-size:14px;font-family:inherit;color:#fff;background:var(--drape);
     border:1px solid var(--drape);border-radius:3px;cursor:pointer}
.btn.ghost{background:#fff;color:var(--ink);border-color:var(--rule)}
.btn.mini{padding:4px 9px;font-size:12px}
.btn:disabled{opacity:.45;cursor:default}

.appli{flex:1;display:grid;grid-template-columns:236px minmax(0,1fr);min-height:0}
nav{border-right:1px solid var(--rule);background:var(--card);overflow-y:auto;padding:8px 0}
nav .t{font-family:var(--mono);font-size:10px;letter-spacing:.1em;text-transform:uppercase;
       color:var(--ink-soft);padding:6px 14px}
nav button{display:block;width:100%;text-align:left;padding:10px 14px;border:none;
           background:none;font:inherit;font-size:14.5px;cursor:pointer;color:var(--ink);
           border-left:3px solid transparent}
nav button:hover{background:var(--drape-soft)}
nav button.on{border-left-color:var(--drape);background:var(--drape-soft);font-weight:600}
nav button .e{display:block;font-size:11.5px;color:var(--ink-soft);font-weight:400;
              margin-top:2px}
nav button .pt{float:right;width:7px;height:7px;border-radius:50%;background:var(--rule);
               margin-top:6px}
nav button .pt.on{background:var(--drape)}
nav button .ch{display:inline-block;width:11px;color:var(--ink-soft);
               transition:transform .12s}
nav button.ouvert .ch{transform:rotate(90deg)}
.sous[hidden]{display:none}
.sous:not(:empty){padding:2px 0 8px;border-left:3px solid var(--drape-soft);margin-left:0}
.sous button{padding:5px 14px 5px 26px;font-size:12.5px;color:var(--ink-soft);
             border-left:none;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.sous button:hover{color:var(--ink);background:var(--drape-soft)}
main{position:relative;min-width:0;display:flex;flex-direction:column}
.barre{display:flex;gap:8px;align-items:center;padding:8px 12px;background:var(--card);
       border-bottom:1px solid var(--rule);flex-wrap:wrap}
.barre .nom{font-weight:600}
.barre .droite{margin-left:auto;display:flex;gap:6px}
iframe{flex:1;width:100%;border:none;background:var(--paper)}
.vide{margin:auto;color:var(--ink-soft);font-size:14.5px;padding:40px;text-align:center;
      max-width:520px}
.flash{position:fixed;left:50%;bottom:18px;transform:translateX(-50%);background:var(--ink);
       color:#fff;padding:9px 15px;border-radius:3px;font-size:14px;opacity:0;
       transition:opacity .2s;pointer-events:none;max-width:90vw;z-index:80}
.flash.on{opacity:1}
@media (max-width:820px){ .appli{grid-template-columns:1fr} nav{max-height:190px} }
</style>
</head>
<body>

<header>
  <p class="eyebrow">Fœtopathologie · lecture microscopique</p>
  <h1>Microscopie — grilles de lecture <span class="ver" id="ver"></span></h1>
  <p class="sub">Les dix-huit grilles, chacune entière et inchangée. Une seule se charge
     à la fois. Document autonome : rien n'est transmis.</p>
  <div class="row">
    <div class="field">
      <label for="dossier">Numéro de dossier</label>
      <input type="text" id="dossier" class="mono" placeholder="26P0123" autocomplete="off" spellcheck="false">
    </div>
    <div class="field">
      <label for="operateur">Lecteur</label>
      <input type="text" id="operateur" placeholder="Initiales" autocomplete="off">
    </div>
    <div class="field">
      <label for="sa">Terme (SA)</label>
      <input type="number" id="sa" min="8" max="45" step="1" inputmode="numeric" placeholder="—">
    </div>
    <div class="field" style="flex:0 0 auto">
      <label>&nbsp;</label>
      <button class="btn ghost" id="btnTout" type="button">Exporter tout ce qui est rempli</button>
    </div>
    <div class="field" style="flex:0 0 auto" id="champHub" hidden>
      <label>&nbsp;</label>
      <button class="btn" id="btnHub" type="button">Tout enregistrer au hub</button>
    </div>
    <div class="field" style="flex:1 1 240px">
      <p class="hint" style="margin:0">Saisis une fois ici, repris dans chaque grille ouverte.
         Chaque grille garde sa propre mémoire dans ce navigateur.</p>
    </div>
  </div>
</header>

<div class="appli">
  <nav id="nav"><p class="t">Organes</p></nav>
  <main>
    <div class="barre" id="barre" hidden>
      <span class="nom" id="nomOrgane"></span>
      <span class="hint" id="verOrgane" style="margin:0"></span>
      <span class="droite">
        <button class="btn mini ghost" id="btnRecharger" type="button">Recharger la grille</button>
        <button class="btn mini" id="btnExport" type="button">Exporter cet organe</button>
      </span>
    </div>
    <div class="vide" id="vide">Choisir un organe à gauche.<br><br>
      <span class="hint">Rien n'est chargé tant qu'on n'a pas cliqué : dix-huit grilles
      ne coûtent pas dix-huit grilles à l'ouverture.</span></div>
    <iframe id="cadre" hidden title="grille de lecture"></iframe>
  </main>
</div>

<div class="flash" id="flash" role="status" aria-live="polite"></div>

<script>
/* Identité de l'étui, déclarée avant toute source embarquée : sans elle, le
   hub lirait le « var MODULE » de la première grille incluse et prendrait cet
   assemblage pour une grille d'organe. */
var MODULE = "__SLUG__";
var SCHEMA = "0.1.0";
var VERSION = "__VERSION__";
var ETUI_VERSION = VERSION;
var ORGANES = __ORGANES__;

function $(i){ return document.getElementById(i); }
function esc(s){ return String(s == null ? "" : s).replace(/[&<>"]/g, function(c){
  return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]; }); }
function flash(m){
  var f = $("flash"); f.textContent = m; f.classList.add("on");
  clearTimeout(flash._t); flash._t = setTimeout(function(){ f.classList.remove("on"); }, 2600);
}
$("ver").textContent = "étui v" + ETUI_VERSION;

var COURANT = null;

/* La source d'une grille est stockée telle quelle dans un bloc que le
   navigateur n'exécute pas. Seule la séquence de fermeture de script y a été
   neutralisée à l'assemblage : on la rétablit ici. */
function source(cle){
  return $("src_" + cle).textContent.replace(/<\\\/script/g, "</script");
}

function batirNav(){
  var n = $("nav");
  ORGANES.forEach(function(o){
    var b = document.createElement("button");
    b.type = "button"; b.dataset.cle = o.cle;
    b.title = o.nom;
    b.innerHTML = '<span class="pt" id="pt_' + o.cle + '"></span>' +
                  '<span class="ch">›</span> ' + esc(o.court) +
                  '<span class="e">v' + esc(o.version) + "</span>";
    b.onclick = function(){ ouvrir(o.cle); };
    n.appendChild(b);
    var s = document.createElement("div");
    s.className = "sous"; s.id = "sous_" + o.cle;
    n.appendChild(s);
  });
}

/* Sous-navigation : les sections de la grille ouverte. Une grille d'organe
   fait dix à quinze sections ; sans ce raccourci on la parcourt à la molette,
   et on perd de vue où l'on en est. Les titres sont lus dans la grille, jamais
   recopiés ici — une section ajoutée apparaît sans qu'on touche à l'étui. */
function batirSousNav(cle, d){
  var s = $("sous_" + cle);
  if (!s) return;
  var vue = d.defaultView;
  var secs = Array.prototype.filter.call(d.querySelectorAll(".wrap > section"),
    function(x){
      /* On saute ce que l'étui a masqué — le bloc d'identité fait double emploi
         avec l'en-tête, il n'a pas à figurer dans une table des matières. */
      return x.querySelector("h2") && vue.getComputedStyle(x).display !== "none";
    });
  s.innerHTML = secs.map(function(x, i){
    var h = x.querySelector("h2").cloneNode(true);
    var n = h.querySelector(".n"); if (n) n.remove();
    var ta = h.querySelector(".tally"); if (ta) ta.remove();
    if (!x.id) x.id = "sec_auto_" + i;
    return '<button type="button" data-sec="' + esc(x.id) + '">' +
           esc(h.textContent.trim()) + "</button>";
  }).join("");
  s.onclick = function(e){
    var b = e.target.closest("button[data-sec]");
    if (!b) return;
    var cible = d.getElementById(b.dataset.sec);
    if (cible) cible.scrollIntoView({behavior:"smooth", block:"start"});
  };
}
function viderSousNav(){
  Array.prototype.forEach.call(document.querySelectorAll(".sous"), function(s){
    s.innerHTML = ""; s.hidden = false;
  });
}
function basculer(cle){
  var s = $("sous_" + cle);
  if (!s || !s.innerHTML) return;
  s.hidden = !s.hidden;
  marquer();
}
/* L'organe monte est en gras ; il est « ouvert » — chevron tourne — quand ses
   sections sont depliees. Les deux etats sont distincts : on peut travailler
   dans une grille en ayant replie sa table des matieres. */
function marquer(){
  Array.prototype.forEach.call($("nav").querySelectorAll("button[data-cle]"), function(b){
    var actif = b.dataset.cle === COURANT;
    var s = $("sous_" + b.dataset.cle);
    b.classList.toggle("on", actif);
    b.classList.toggle("ouvert", actif && !!s && !s.hidden && s.innerHTML !== "");
    if (actif) b.scrollIntoView({block:"nearest"});
  });
}

/* Cliquer l'organe deja ouvert plie ou deplie ses sections : on ne recharge
   pas la grille pour ca — elle est montee, elle le reste, et la saisie en
   cours avec elle. Recharger reste un geste explicite, son bouton est en haut
   du cadre. */
function ouvrir(cle){
  var o = ORGANES.filter(function(x){ return x.cle === cle; })[0];
  if (!o) return;
  if (cle === COURANT){ basculer(cle); return; }
  COURANT = cle;
  $("vide").hidden = true;
  $("barre").hidden = false;
  $("nomOrgane").textContent = o.nom;
  $("verOrgane").textContent = "grille v" + o.version + " · " + o.fichier;
  viderSousNav();
  marquer();
  var f = $("cadre");
  f.hidden = false;
  f.srcdoc = source(cle);
}

/* Ce que l'étui fait au chargement d'une grille : masquer l'en-tête et le bloc
   d'identité — ils font double emploi avec les siens — et y reporter le
   dossier, le lecteur et le terme. Rien d'autre. Le reste de la grille est son
   affaire, et le rester est ce qui permet de la rediffuser sans toucher ici. */
$("cadre").addEventListener("load", function(){
  var d = this.contentDocument;
  if (!d || !COURANT) return;
  var st = d.createElement("style");
  st.textContent = ".wrap > header, .wrap > section:first-of-type { display:none }" +
                   ".wrap { padding-top:10px }";
  d.head.appendChild(st);
  themerCadre(d);
  reporter(d);
  batirSousNav(COURANT, d);
  marquer();
  suivreModule();
  majPoint(COURANT);
});

/* Le thème du hub. Servi, l'étui le reçoit de liaison.js (feuille /themes.css
   et classe body.theme-*) ; la grille dans le cadre, elle, est un srcdoc que
   la greffe du serveur n'atteint pas. On lui reporte donc les deux, et on suit
   la classe du body de l'étui pour qu'un changement de thème dans l'onglet
   des dossiers se propage jusqu'à l'organe ouvert. Hors serveur il n'y a pas
   de thème, ni ici ni dans le cadre : rien à faire. */
function themeCourant(){
  var m = /\btheme-[a-z0-9]+\b/.exec(document.body.className);
  return m ? m[0] : "";
}
function themerCadre(d){
  if (!SERVI || !d || !d.body) return;
  if (!d.getElementById("themesHub")){
    var l = d.createElement("link");
    l.id = "themesHub"; l.rel = "stylesheet"; l.href = "/themes.css";
    d.head.appendChild(l);
  }
  d.body.className = d.body.className.replace(/\btheme-[a-z0-9]+\b/g, "").trim();
  var t = themeCourant();
  if (t) d.body.classList.add(t);
}
new MutationObserver(function(){
  var f = $("cadre");
  if (f && !f.hidden) themerCadre(f.contentDocument);
}).observe(document.body, {attributes:true, attributeFilter:["class"]});

function reporter(d){
  [["dossier", $("dossier").value.trim()],
   ["operateur", $("operateur").value.trim()],
   ["sa", $("sa").value.trim()]].forEach(function(p){
    var el = d.getElementById(p[0]);
    if (!el || !p[1]) return;
    el.value = p[1];
    el.dispatchEvent(new d.defaultView.Event("input", {bubbles:true}));
    el.dispatchEvent(new d.defaultView.Event("change", {bubbles:true}));
  });
}
/* L'en-tete est retenu a la frappe, dans ce navigateur. Les grilles font deja
   de meme chacune de leur cote (elles enregistrent 350 ms apres la derniere
   touche) ; sans ca, l'etui serait le seul endroit ou l'on retape tout apres
   un rechargement. */
/* Ouvert depuis le hub pour un dossier précis (?dossier=…), on ne restitue
   ni le dernier numéro ni le dernier terme retenus ici : ils viennent
   peut-être d'un autre dossier, et la barre de liaison va poser les bons.
   Les initiales du lecteur, elles, restent les siennes. */
var DOSSIER_URL = new URLSearchParams(location.search).get("dossier");
["dossier","operateur","sa"].forEach(function(i){
  try {
    var v = localStorage.getItem("micro_" + i);
    if (v && !(DOSSIER_URL && i !== "operateur")) $(i).value = v;
  } catch (e) {}
  $(i).addEventListener("input", function(){
    try { localStorage.setItem("micro_" + i, this.value.trim()); } catch (e) {}
    var d = $("cadre").contentDocument;
    if (d && !$("cadre").hidden) reporter(d);
    if (i === "dossier") relireBases();
  });
});

/* Une grille est « renseignée » si son état porte au moins une valeur posée.
   On ne peut pas se fier au texte qu'elle compose : la plupart des grilles en
   produisent un dès que le numéro de dossier est saisi, ne serait-ce que leur
   en-tête. On compte donc les feuilles non vides de `grille`, sans rien savoir
   de sa forme — elle diffère d'un organe à l'autre et c'est très bien ainsi. */
function feuilles(v){
  if (v === null || v === undefined || v === false || v === "") return 0;
  if (Array.isArray(v)) return v.reduce(function(n, x){ return n + feuilles(x); }, 0);
  if (typeof v === "object") return Object.keys(v).reduce(
    function(n, k){ return n + feuilles(v[k]); }, 0);
  return 1;
}
function paquetDe(cle){
  var f = $("cadre");
  if (COURANT !== cle || f.hidden) return null;
  var w = f.contentWindow;
  try { return w && typeof w.collecter === "function" ? w.collecter() : null; }
  catch (e) { return null; }
}
/* La grille ouverte fait foi sur elle-meme — elle a peut-etre une frappe plus
   recente que ce qu'elle a eu le temps d'enregistrer. Pour les autres, c'est
   leur base qui repond. */
function rempliDe(o){
  if (o.cle === COURANT){
    var p = paquetDe(o.cle);
    if (p) return feuilles(p.grille) > 0;
  }
  var v = BASES[o.base];
  return !!(v && feuilles(v.grille) > 0);
}
function majPoints(){
  ORGANES.forEach(function(o){
    var pt = $("pt_" + o.cle);
    if (pt) pt.classList.toggle("on", rempliDe(o));
  });
  var n = ORGANES.filter(rempliDe).length;
  $("btnTout").disabled = !n;
  $("btnTout").textContent = n ? "Exporter les " + n + " grille(s) remplie(s)"
                               : "Rien de rempli pour ce dossier";
}
function majPoint(cle){ majPoints(); }
setInterval(majPoints, 4000);

/* ── Ce que les grilles ont deja enregistre ───────────────────────────────
   Chaque grille garde son dernier `collecter()` complet dans sa propre base
   locale, sous le numero de dossier. L'etui peut donc savoir ce qui est
   rempli — et l'exporter — sans monter les dix-huit grilles : il lit leurs
   bases. C'est la meme origine, ce sont les memes donnees, et c'est beaucoup
   plus rapide que d'ouvrir chaque document pour lui poser la question. */
var BASES = {};   /* module -> enveloppe enregistree pour le dossier courant */

function basesExistantes(){
  if (!indexedDB.databases) return Promise.resolve(null);   /* Firefox */
  return indexedDB.databases().then(function(l){
    return l.map(function(x){ return x.name; });
  }).catch(function(){ return null; });
}

function lireBase(nom, dossier, connues){
  if (connues && connues.indexOf(nom) < 0) return Promise.resolve(null);
  return new Promise(function(res){
    var r;
    try { r = indexedDB.open(nom); } catch (e) { return res(null); }
    r.onerror = function(){ res(null); };
    r.onsuccess = function(){
      var db = r.result;
      if (!db.objectStoreNames.contains("saisies")){
        db.close();
        /* On vient de la creer en l'ouvrant : ne pas laisser de base vide. */
        if (!connues) try { indexedDB.deleteDatabase(nom); } catch (e) {}
        return res(null);
      }
      var q;
      try { q = db.transaction("saisies", "readonly").objectStore("saisies").get(dossier); }
      catch (e) { db.close(); return res(null); }
      q.onsuccess = function(){ db.close(); res(q.result || null); };
      q.onerror   = function(){ db.close(); res(null); };
    };
  });
}

function relireBases(){
  var dossier = $("dossier").value.trim();
  BASES = {};
  if (!dossier) { majPoints(); return Promise.resolve(BASES); }
  return basesExistantes().then(function(connues){
    return Promise.all(ORGANES.map(function(o){
      return lireBase(o.base, dossier, connues).then(function(v){
        if (v) BASES[o.base] = v;
      });
    }));
  }).then(function(){ majPoints(); return BASES; });
}

function telecharger(nom, texte){
  var b = new Blob([texte], {type:"application/json"});
  var a = document.createElement("a");
  a.href = URL.createObjectURL(b); a.download = nom;
  document.body.appendChild(a); a.click();
  setTimeout(function(){ URL.revokeObjectURL(a.href); a.remove(); }, 1000);
}

$("btnExport").onclick = function(){
  var p = paquetDe(COURANT);
  if (!p) { flash("Grille non chargée."); return; }
  if (!p.dossier) { flash("Saisir d'abord le numéro de dossier."); return; }
  telecharger(p.dossier + "_" + p.module + ".json", JSON.stringify(p, null, 1));
  flash(p.module + " exporté.");
};
$("btnRecharger").onclick = function(){ if (COURANT) ouvrir(COURANT); };

/* « Tout exporter » ne se limite pas à la grille ouverte : il relit les bases
   des dix-sept et sort un fichier par grille remplie, y compris celles qui ont
   été saisies un autre jour et jamais rouvertes. Le navigateur demande une
   fois l'autorisation d'enregistrer plusieurs fichiers d'affilée. */
$("btnTout").onclick = function(){
  var dossier = $("dossier").value.trim();
  if (!dossier) { flash("Saisir d'abord le numéro de dossier."); return; }
  var bouton = this;
  bouton.disabled = true;
  relireBases().then(function(){
    var sortir = [];
    ORGANES.forEach(function(o){
      /* La grille ouverte est prise en direct : sa dernière frappe n'est
         peut-être pas encore descendue en base. */
      var p = (o.cle === COURANT) ? paquetDe(o.cle) : null;
      if (!p) p = BASES[o.base] || null;
      if (p && feuilles(p.grille) > 0) sortir.push(p);
    });
    if (!sortir.length) { flash("Rien de rempli pour ce dossier."); return; }
    sortir.forEach(function(p, i){
      setTimeout(function(){
        telecharger((p.dossier || dossier) + "_" + p.module + ".json",
                    JSON.stringify(p, null, 1));
      }, i * 350);
    });
    flash(sortir.length + " grille(s) exportée(s) : "
          + sortir.map(function(p){ return p.module.replace("grille_", ""); }).join(", ") + ".");
  }).then(function(){ majPoints(); });
};

/* ── Liaison au hub ───────────────────────────────────────────────────────
   Quand le hub sert cette page, il y greffe sa barre. Celle-ci interroge
   `MODULE`, `collecter()` et `relire()` — c'est le contrat de tous les
   modules. L'étui n'est pas un module : il en montre dix-sept. On fait donc
   pointer ces trois-là sur la grille ouverte, pour que « enregistrer » et
   « relire » agissent sur l'organe qu'on a sous les yeux, et pas sur une
   abstraction. Hors serveur, rien de tout ceci ne s'exécute. */
var SERVI = location.protocol === "http:" || location.protocol === "https:";

function fenetreCadre(){
  var f = $("cadre");
  return (!f || f.hidden) ? null : f.contentWindow;
}
window.collecter = function(){
  var w = fenetreCadre();
  if (!w || typeof w.collecter !== "function")
    throw new Error("aucune grille ouverte — choisir un organe à gauche");
  return w.collecter();
};
window.relire = function(o){
  var w = fenetreCadre();
  if (!w) throw new Error("aucune grille ouverte");
  if (typeof w.relire === "function") return w.relire(o);
  if (typeof w.vider === "function") w.vider();
  if (typeof w.appliquer === "function") w.appliquer(o);
};

/* La barre du hub lit MODULE au moment où on clique : il doit désigner la
   grille ouverte, sans quoi « relire » irait chercher une saisie « microscopie »
   qui n'existe pas — les saisies portent le nom de leur grille. */
function suivreModule(){
  var o = ORGANES.filter(function(x){ return x.cle === COURANT; })[0];
  window.MODULE = o ? o.module : "microscopie";
  var b = document.getElementById("hubMod");
  if (b) b.textContent = window.MODULE;
}

if (SERVI){
  $("champHub").hidden = false;
  $("btnHub").onclick = function(){
    var dossier = $("dossier").value.trim();
    var op = $("operateur").value.trim();
    if (!dossier) { flash("Saisir d'abord le numéro de dossier."); return; }
    if (!op) { flash("Les grilles n'acceptent pas une saisie sans lecteur."); return; }
    var bouton = this;
    bouton.disabled = true;
    relireBases().then(function(){
      var envois = [];
      ORGANES.forEach(function(o){
        var p = (o.cle === COURANT) ? paquetDe(o.cle) : null;
        if (!p) p = BASES[o.base] || null;
        if (p && feuilles(p.grille) > 0) envois.push(p);
      });
      if (!envois.length) { flash("Rien de rempli pour ce dossier."); return; }
      var faits = 0, ratés = [];
      return envois.reduce(function(chaine, p){
        return chaine.then(function(){
          return fetch("/api/saisie", {
            method: "POST", headers: {"Content-Type": "application/json"},
            body: JSON.stringify(p)
          }).then(function(r){ return r.json().then(function(o){
            if (!r.ok) throw new Error(o.erreur || ("HTTP " + r.status));
            faits++;
          }); }).catch(function(e){ ratés.push(p.module + " : " + e.message); });
        });
      }, Promise.resolve()).then(function(){
        flash(faits + " grille(s) enregistrée(s) au hub"
              + (ratés.length ? " — " + ratés.length + " refus : " + ratés[0] : "."));
      });
    }).then(function(){ bouton.disabled = false; });
  };
}

batirNav();
relireBases();
</script>

__SOURCES__
</body>
</html>
"""


def assembler(organes, sortie: Path):
    sources, meta = [], []
    for cle in organes:
        f = ICI / ("grille_" + cle + ".html")
        if not f.is_file():
            print(f"   !! absente : {f.name}")
            continue
        html = f.read_text(encoding="utf-8")
        # Le bloc n'est pas exécuté par le navigateur, mais la séquence de
        # fermeture de script y mettrait fin quand même : on la neutralise.
        sources.append('<script type="text/plain" id="src_' + cle + '">'
                       + html.replace("</script", r"<\/script")
                       + "</script>")
        mod = re.search(r'var MODULE\s*=\s*"([^"]+)"', html)
        module = mod.group(1) if mod else ("grille_" + cle)
        meta.append({"cle": cle, "court": NOMS.get(cle, cle), "nom": titre_de(html),
                     "module": module, "base": nom_base(html, module),
                     "version": version_de(html), "fichier": f.name})
    if not meta:
        return None
    meta.sort(key=lambda m: _rang(m["court"]))
    page = (ETUI
            .replace("__SLUG__", sortie.stem)
            .replace("__VERSION__", VERSION)
            .replace("__SOURCES__", "\n".join(sources))
            .replace("__ORGANES__", repr(meta).replace("'", '"')))
    sortie.write_text(page, encoding="utf-8", newline="\n")
    return sortie, meta


def main():
    ap = argparse.ArgumentParser(description=__doc__.splitlines()[1])
    ap.add_argument("--organes", nargs="*", default=ORGANES,
                    help="n'inclure que ces organes (par défaut : tous)")
    ap.add_argument("--sortie", type=Path, default=ICI / "microscopie.html",
                    help="fichier produit")
    args = ap.parse_args()
    r = assembler(args.organes, args.sortie.resolve())
    if not r:
        raise SystemExit("aucune grille trouvée")
    cible, meta = r
    print(f"{cible.name}  —  {cible.stat().st_size/1024:.0f} Ko, "
          f"{len(meta)} grille(s)")
    for m in meta:
        print(f"   {m['court']:20s} v{m['version']:8s} {m['fichier']}")


if __name__ == "__main__":
    main()
