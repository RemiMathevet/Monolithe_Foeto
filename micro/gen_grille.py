# SPDX-License-Identifier: CC-BY-NC-SA-4.0
"""Fabrique grille_<organe>.html a partir de grilles/<organe>.js.

    python3 gen_grille.py rein          # ecrit grille_rein.html
    python3 gen_grille.py               # tous les fragments de grilles/
    node verif.js grille_rein.html      # banc d'essai headless

La mecanique (verrou, chips, verdicts, IndexedDB, export, banc d'essai) est
ecrite UNE fois ici ; le fragment d'organe ne porte que ses tableaux et les
deux ou trois verdicts qui lui sont propres. Les modules doivent rester des
fichiers autonomes ouvrables par double-clic hors reseau : pas de module ES,
pas de fetch, donc pas de fichier commun a cote — d'ou la generation.

grille_poumon.html est anterieur et reste ecrit a la main : il porte un calcul
de rapport de poids que rien d'autre ne demande. Ne pas le regenerer.

Section 07 « Termes FOETO » : les termes de foeto_terms que le triage contre
la fiche de l'organe a retenus comme LESION, groupes par sous-section de
fiche, un terme coche exporte son id ; recherche a 3 lettres sur les
libelles fr/en des termes LESION et HORS_FICHE de la meme fiche. Lu dans la
base au moment de la generation (bloc_foeto) ; base absente = bloc vide.
"""

import json
import re
import sqlite3
import sys
from pathlib import Path

ICI = Path(__file__).parent
FRAGMENTS = ICI / "grilles"
DB = Path("/home/mathevet/Bureau/foeto_base/syndromes_foetaux.db")


def bloc_foeto(organe):
    """var FOETO = {sections:[{t, termes:[{id,l}]}], formes:{id:[...]}} pour l'organe"""
    vide = "var FOETO = " + json.dumps({"sections": [], "formes": {}}) + ";"
    if not DB.exists():
        return vide
    c = sqlite3.connect("file:%s?mode=ro" % DB, uri=True)
    # le placenta est trie contre « diffusion/fiche_placenta.md#1 », #2, #3 (fiche par tranches) :
    # on apparie sur le nom de fichier, pas sur le chemin
    fiche = "%%fiche_%s.md%%" % organe
    rows = c.execute("""select id, label_fr, label_en, triage_verdict, triage_section from foeto_terms
                        where triage_fiche like ? and triage_verdict in ('LESION','HORS_FICHE')
                        order by triage_section, label_fr""", (fiche,)).fetchall()
    sections, formes = {}, {}
    for i, fr, en, v, sec in rows:
        formes[i] = [x for x in (fr, en) if x] + (["(hors fiche)"] if v == "HORS_FICHE" else [])
        if v == "LESION":
            sections.setdefault(sec or "Autres", []).append({"id": i, "l": fr or en})
    out = {"sections": [{"t": t, "termes": ts} for t, ts in sections.items()], "formes": formes}
    return "var FOETO = " + json.dumps(out, ensure_ascii=False, separators=(",", ":")) + ";"

SHELL = r"""<!DOCTYPE html>
<!-- SPDX-License-Identifier: CC-BY-NC-SA-4.0 | Hub Light | https://github.com/RemiMathevet/Monolithe_Foeto -->
<html lang="fr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>Grille de lecture — {{TITRE}}</title>
<style>
:root{
  --paper:#EDEFEE; --card:#FFFFFF;
  --ink:#161D1C; --ink-soft:#5A6462; --rule:#CBD2D0;
  --drape:#0E6B62; --drape-soft:#E2EFEC; --alert:#9C3A28; --alert-soft:#F7EAE7;
  --amber:#8A6A18; --amber-soft:#F6F0DE;
  --mono:ui-monospace,"SF Mono",Menlo,Consolas,"Liberation Mono",monospace;
  --sans:ui-sans-serif,system-ui,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;
}
*{box-sizing:border-box}
html,body{margin:0;padding:0}
body{background:var(--paper);color:var(--ink);font-family:var(--sans);
     font-size:16px;line-height:1.45;-webkit-text-size-adjust:100%}
.wrap{max-width:920px;margin:0 auto;padding:16px 14px 80px}

header{border-bottom:2px solid var(--ink);padding-bottom:12px;margin-bottom:18px}
.eyebrow{font-family:var(--mono);font-size:11px;letter-spacing:.14em;
         text-transform:uppercase;color:var(--drape);margin:0 0 4px}
h1{font-size:21px;line-height:1.2;margin:0;font-weight:650;letter-spacing:-.01em}
.sub{font-size:13px;color:var(--ink-soft);margin:6px 0 0}
.ver{font-family:var(--mono);font-size:11px;font-weight:400;color:var(--ink-soft);letter-spacing:.06em}

section{background:var(--card);border:1px solid var(--rule);border-radius:3px;
        padding:14px;margin-bottom:14px}
h2{font-family:var(--mono);font-size:11px;letter-spacing:.14em;text-transform:uppercase;
   color:var(--ink-soft);margin:0 0 12px;font-weight:600;
   display:flex;align-items:baseline;gap:8px}
h2 .n{color:var(--drape)}
h2 .tally{margin-left:auto;color:var(--ink-soft);letter-spacing:.06em}
section.off{opacity:.42}
section.off button,section.off input,section.off select{pointer-events:none}

.row{display:flex;flex-wrap:wrap;gap:10px}
.field{flex:1 1 170px;min-width:0}
label{display:block;font-family:var(--mono);font-size:10px;letter-spacing:.1em;
      text-transform:uppercase;color:var(--ink-soft);margin-bottom:4px}
input[type=text],input[type=number],textarea{width:100%;font-family:var(--sans);font-size:16px;
  color:var(--ink);background:var(--paper);border:1px solid var(--rule);
  border-radius:2px;padding:9px 10px}
input:focus,textarea:focus{outline:2px solid var(--drape);outline-offset:-1px;background:var(--card)}
input[type=number]{font-family:var(--mono);letter-spacing:.03em}
textarea{resize:vertical;min-height:60px;font-size:15px}
.mono{font-family:var(--mono);font-size:15px;letter-spacing:.04em;text-transform:uppercase}
.hint{font-family:var(--mono);font-size:11px;color:var(--ink-soft);margin-top:5px}
.hint.bad{color:var(--alert)} .hint.good{color:var(--drape)} .hint.warn{color:var(--amber)}

/* ── Boutons-clics : toute la saisie sémantique passe par là ── */
.chips{display:flex;flex-wrap:wrap;gap:6px}
.chip{appearance:none;font-family:var(--sans);font-size:14px;line-height:1.25;
  border:1px solid var(--rule);background:var(--paper);color:var(--ink);
  border-radius:2px;padding:8px 11px;cursor:pointer;min-height:38px;text-align:left}
.chip:hover{background:var(--drape-soft)}
.chip:focus-visible{outline:3px solid var(--drape);outline-offset:2px}
.chip.on{background:var(--drape);border-color:var(--drape);color:#fff;font-weight:600}
.chip.no{background:var(--alert-soft);border-color:var(--alert);color:var(--alert);font-weight:600}
.chip.sugg{border-color:var(--amber);border-style:dashed}
.chip[data-act=foeto]::after{content:"";display:inline-block;width:6px;height:6px;border-radius:50%;margin-left:6px;background:var(--drape);opacity:.55}
.chip.on[data-act=foeto]::after{background:#fff}
.plus{font-size:13px;color:var(--drape);background:none;border:0;padding:4px 0;cursor:pointer;text-decoration:underline dotted}
.rech{position:relative;margin-top:8px}
.rech input{font:inherit;font-size:14px;padding:6px 10px;border:1px solid #bbb;border-radius:8px;width:min(100%,24rem)}
.sugg{position:absolute;z-index:5;background:#fff;border:1px solid #bbb;border-radius:8px;max-height:12rem;overflow:auto;width:min(100%,24rem);display:none}
.sugg.on{display:block}
.sugg div{padding:5px 10px;cursor:pointer;font-size:14px}
.sugg div:hover{background:var(--drape-soft)}
.sugg small{color:#777}
.chip .k{font-family:var(--mono);font-size:10px;letter-spacing:.07em;opacity:.75;
         display:block;text-transform:uppercase}

.item{border-top:1px solid var(--rule);padding:10px 0}
.item:first-child{border-top:0}
.item .head{display:flex;flex-wrap:wrap;gap:8px;align-items:center}
.item .lbl{flex:1 1 240px;min-width:0;font-size:15px}
.item .meta{font-family:var(--mono);font-size:10px;letter-spacing:.06em;color:var(--ink-soft);
            display:block;margin-top:2px}
.item .meta.bon{color:var(--drape)} .item .meta.mauvais{color:var(--alert)}
.item .meta.moyen{color:var(--amber)}
.unfold{margin:9px 0 0 0;padding:9px 0 0;border-top:1px dashed var(--rule)}
.unfold[hidden]{display:none}
.stop{font-size:13px;line-height:1.35;color:var(--alert);background:var(--alert-soft);
      border-left:2px solid var(--alert);padding:6px 9px;margin-top:8px}
.stop b{font-family:var(--mono);font-size:10px;letter-spacing:.07em;text-transform:uppercase}

.verdict{font-size:14px;line-height:1.4;border-left:3px solid var(--rule);
         padding:7px 10px;margin-top:11px;background:var(--paper)}
.verdict.ok{border-color:var(--drape);background:var(--drape-soft)}
.verdict.warn{border-color:var(--amber);background:var(--amber-soft)}
.verdict.bad{border-color:var(--alert);background:var(--alert-soft)}
.verdict b{font-family:var(--mono);font-size:11px;letter-spacing:.07em;text-transform:uppercase;
           display:block;color:var(--ink-soft)}

.sousTitre{font-family:var(--mono);font-size:10px;letter-spacing:.12em;text-transform:uppercase;
  color:var(--ink-soft);border-bottom:1px solid var(--rule);padding-bottom:5px;margin:16px 0 9px}
.sousTitre:first-child{margin-top:0}

.btn{appearance:none;font-family:var(--sans);font-size:15px;font-weight:550;
  border:1px solid var(--ink);background:var(--card);color:var(--ink);
  border-radius:2px;padding:11px 15px;cursor:pointer;min-height:44px}
.btn:hover{background:var(--drape-soft)}
.btn:focus-visible{outline:3px solid var(--drape);outline-offset:2px}
.btn.primary{background:var(--drape);border-color:var(--drape);color:#fff}
.btn.primary:hover{background:#0B564F}
.btn.danger{border-color:var(--alert);color:var(--alert)}
.btn.danger:hover{background:var(--alert-soft)}
.btn[disabled]{opacity:.4;cursor:not-allowed}
.btns{display:flex;flex-wrap:wrap;gap:8px}
input[type=file]{display:none}

pre.cr{font-family:var(--mono);font-size:12.5px;line-height:1.55;white-space:pre-wrap;
  background:var(--paper);border:1px solid var(--rule);border-radius:2px;
  padding:12px;margin:0 0 10px;max-height:44vh;overflow:auto}

table{width:100%;border-collapse:collapse;font-family:var(--mono);font-size:12px}
td{padding:6px 4px;border-bottom:1px solid var(--rule);vertical-align:top}
td:first-child{color:var(--ink-soft);white-space:nowrap;padding-right:12px}
.ok{color:var(--drape);font-weight:600} .ko{color:var(--alert);font-weight:600}
.warn{color:var(--amber);font-weight:600}

.note{font-size:13px;color:var(--ink-soft);border-left:2px solid var(--rule);
      padding-left:10px;margin:12px 0 0}
.flash{position:fixed;left:50%;bottom:16px;transform:translateX(-50%);background:var(--ink);
  color:var(--paper);font-family:var(--mono);font-size:12px;padding:10px 14px;border-radius:2px;
  max-width:90vw;opacity:0;pointer-events:none;transition:opacity .2s;z-index:50}
.flash.on{opacity:1}
@media (prefers-reduced-motion:reduce){*{transition:none!important}}
</style>
</head>
<body>
<div class="wrap">

<header>
  <p class="eyebrow">Fœtopathologie · lecture microscopique</p>
  <h1>Grille de lecture — {{TITRE}} <span class="ver" id="ver"></span></h1>
  <p class="sub">Sortie de <code>{{SOURCE}}</code>. Tout se clique ; seuls le dossier, le terme et les comptes se tapent. Document autonome : rien n'est transmis.</p>
</header>

<!-- 01 — Dossier -->
<section>
  <h2><span class="n">01</span>Dossier</h2>
  <div class="row">
    <div class="field">
      <label for="dossier">Numéro de dossier</label>
      <input type="text" id="dossier" class="mono" placeholder="26P0123" autocomplete="off" spellcheck="false">
      <div class="hint" id="dossierHint">Libre, mis en majuscules. Conditionne l'enregistrement.</div>
    </div>
    <div class="field">
      <label for="operateur">Lecteur</label>
      <input type="text" id="operateur" placeholder="Initiales" autocomplete="off">
      <div class="hint" id="operateurHint">Requis pour déverrouiller la grille.</div>
    </div>
    <div class="field">
      <label for="sa">Terme (SA)</label>
      <input type="number" id="sa" min="8" max="45" step="1" inputmode="numeric" placeholder="—">
      <div class="hint" id="saHint">SA = semaines de gestation + 2. Commande le stade attendu.</div>
    </div>
  </div>
</section>

<!-- 02 — Prélèvement -->
<section id="secPrelevement" class="off">
  <h2><span class="n">02</span>Prélèvement<span class="tally" id="tPrelevement">—</span></h2>
  <div id="coteBloc" hidden>
    <div class="sousTitre">Côté prélevé</div>
    <div class="chips" id="cote" style="margin-bottom:11px"></div>
  </div>
  <div class="chips" id="prelevement"></div>
  <div class="verdict" id="vPrelevement"><b>Recevabilité</b>—</div>
</section>

<!-- 03 — Rétention -->
<section id="secRetention" class="off">
  <h2><span class="n">03</span>Rétention<span class="tally" id="tRetention">—</span></h2>
  <div id="retention"></div>
  <div class="chips" id="kcl" style="margin-top:11px"></div>
  <div class="verdict" id="vRetention"><b>Borne inférieure</b>—</div>
</section>

<!-- 04 — Maturation -->
<section id="secMaturation" class="off">
  <h2><span class="n">04</span>Maturation<span class="tally" id="tMaturation">—</span></h2>
  <div class="sousTitre" id="stTitre">Stade observé</div>
  <div class="chips" id="stades"></div>
  <div id="mesure"></div>
  <div class="verdict" id="vMaturation"><b>Lecture</b>—</div>
  <div class="verdict" id="vMesure" hidden><b>Mesure</b>—</div>
</section>

<!-- 05 — Variantes normales -->
<section id="secVariantes" class="off">
  <h2><span class="n">05</span>Variantes normales<span class="tally" id="tVariantes">—</span></h2>
  <p class="note" style="margin-top:0">Cliquer ce qui est vu et écarté comme normal. Rien de coché ne veut pas dire absent : ça veut dire non regardé.</p>
  <div class="chips" id="variantes" style="margin-top:10px"></div>
</section>

<!-- 06 — Signes -->
<section id="secSignes" class="off">
  <h2><span class="n">06</span>Signes<span class="tally" id="tSignes">—</span></h2>
  <p class="note" style="margin-top:0">On coche des signes, pas des diagnostics. Les associations en dessous se déduisent de ce qui est coché : elles s'affichent, elles ne se choisissent pas.</p>
  <div id="signes" style="margin-top:10px"></div>
  <div class="sousTitre" style="margin-top:16px">Associations lues</div>
  <div id="diags"></div>
</section>

<!-- 07 — Termes FOETO attestés par la fiche -->
<section id="secFoeto" class="off">
  <h2><span class="n">07</span>Termes FOETO<span class="tally" id="tFoeto">—</span></h2>
  <p class="note" style="margin-top:0">Les termes du vocabulaire FOETO que la fiche de l'organe retient comme lésions, par sous-section. Un terme coché est présent ; rien de coché ne veut pas dire absent.</p>
  <div id="foeto"></div>
  <button type="button" class="plus" id="foetoPlus" hidden>▸ tous les termes attestés</button>
  <div class="chips" id="foetoTous" hidden style="margin-top:6px"></div>
  <div class="rech" id="foetoRech" hidden><input type="text" id="rqFoeto" placeholder="rechercher un terme (3 lettres)…" autocomplete="off"><div class="sugg" id="sgFoeto"></div></div>
</section>

<!-- 08 — Négatifs obligatoires -->
<section id="secNegatifs" class="off">
  <h2><span class="n">08</span>Négatifs obligatoires<span class="tally" id="tNegatifs">—</span></h2>
  <div class="btns" style="margin-bottom:11px">
    <button class="btn" id="btnNegAll">Tous vérifiés</button>
  </div>
  <div id="negatifs"></div>
</section>

<!-- 08 — Techniques -->
<section id="secTechniques" class="off">
  <h2><span class="n">09</span>Techniques<span class="tally" id="tTechniques">—</span></h2>
  <p class="note" style="margin-top:0" id="techNote"></p>
  <div class="chips" id="techniques" style="margin-top:10px"></div>
</section>

<!-- 09 — Compte rendu -->
<section id="secCR" class="off">
  <h2><span class="n">10</span>Compte rendu<span class="tally" id="tCR">—</span></h2>
  <pre class="cr" id="cr">—</pre>
  <div class="row">
    <div class="field" style="flex:1 1 100%">
      <label for="libre">Remarque libre</label>
      <textarea id="libre" placeholder="Ce que la grille ne prévoit pas."></textarea>
    </div>
  </div>
  <div class="btns" style="margin-top:10px">
    <button class="btn" id="btnCopie">Copier le compte rendu</button>
  </div>
</section>

<!-- 10 — Sortie -->
<section id="secSortie" class="off">
  <h2><span class="n">11</span>Sortie</h2>
  <div class="btns">
    <button class="btn primary" id="btnExport" disabled>Exporter le JSON</button>
    <button class="btn" id="btnImport">Relire un JSON</button>
    <button class="btn danger" id="btnWipe">Vider le stockage</button>
  </div>
  <p class="note" id="outHint">Saisir le numéro de dossier pour activer l'export.</p>
</section>

<!-- 11 — Diagnostic -->
<section>
  <h2><span class="n">12</span>Diagnostic</h2>
  <table id="diag"><tbody></tbody></table>
</section>

</div>

<input type="file" id="jsonPick" accept="application/json,.json">
<div class="flash" id="flash" role="status" aria-live="polite"></div>

<script>
"use strict";
/* ═══════════════════════════════════════════════════════════════════════════
   Document autonome. Aucune bibliothèque, aucun module ES, aucune police
   distante, aucun fetch : doit fonctionner par double-clic hors réseau.

   Ce module est la SORTIE de {{SOURCE}}, jamais l'inverse. Les bornes, les
   spécificités et les « ce qu'il ne faut pas conclure » sont recopiés de la
   fiche ; ils ne se corrigent pas ici mais dans la fiche.

   La grille ne conclut pas : elle contraint la description et rend ses
   réserves visibles. Un critère non cliqué n'est pas un négatif — c'est un
   non-regardé, et le compte rendu le dit.

   Fichier ENGENDRÉ par gen_grille.py depuis grilles/{{ORGANE}}.js.
   Corriger le fragment, pas ce fichier.
   ═══════════════════════════════════════════════════════════════════════════ */

var SCHEMA = "0.2.0";   /* 0.2.0 : grille.foeto = termes FOETO cochés */

/* ╔═══════════════════════════════════════════════════════════════════════╗
   ║  FRAGMENT D'ORGANE — grilles/{{ORGANE}}.js                            ║
   ╚═══════════════════════════════════════════════════════════════════════╝ */
{{ORGANE_JS}}

/* ── Termes FOETO — engendré depuis foeto_terms (triage contre la fiche) ──── */
{{FOETO_JS}}
/* ╔═══════════════════════════════════════════════════════════════════════╗
   ║  MÉCANIQUE COMMUNE — gen_grille.py                                    ║
   ╚═══════════════════════════════════════════════════════════════════════╝ */

var DB_NAME = "foeto-" + MODULE, DB_VER = 1, db = null;

/* Organe pair : le côté fait partie de la donnée, pas du commentaire. Un rein
   lu sans son côté n'est pas rattachable à l'imagerie ni à l'autre rein. */
var COTES = [{ k:"droit", l:"Droit — 1/2" }, { k:"gauche", l:"Gauche — 1/2" },
             { k:"deux", l:"Les deux — 2/2" }];

/* ── Utilitaires ──────────────────────────────────────────────────────────── */
function $(id){ return document.getElementById(id); }
function esc(s){
  return String(s).replace(/[&<>"]/g, function(c){
    return { "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;" }[c];
  });
}
function flash(m){
  var f = $("flash"); f.textContent = m; f.classList.add("on");
  clearTimeout(flash._t); flash._t = setTimeout(function(){ f.classList.remove("on"); }, 2600);
}
function normDossier(v){ return v.toUpperCase().replace(/\s+/g, ""); }
function dossierOk(v){ return v.trim().length > 0; } // ponytail: plus de format imposé, seul le uppercase (normDossier) reste
function num(id){ var e = $(id); if (!e) return null; var v = parseFloat(e.value); return isFinite(v) ? v : null; }
function par(liste, k){ return liste.filter(function(x){ return x.k === k; })[0] || null; }
function champs(){ return MESURE ? MESURE.champs : []; }

/* ── État ─────────────────────────────────────────────────────────────────── */
var dossier = "", E = null;
function neuf(){
  var e = { cote:null, prelev:{}, retention:{}, kcl:false, stade:null, variantes:{}, signes:{},
            negatifs:{}, techniques:{}, foeto:{}, mesure:{ def:null, opt:null, v:{} }, libre:"" };
  champs().forEach(function(c){ e.mesure.v[c.id] = null; });
  return e;
}

/* Le stade attendu au terme saisi. Bornes reconstruites depuis la prose des
   sources : ce sont des repères, pas des seuils. */
function stadeAttendu(sa){
  if (sa == null || !isFinite(sa)) return null;
  for (var i = 0; i < STADES.length; i++) if (sa < STADES[i].max) return STADES[i];
  return STADES[STADES.length - 1];
}
function bornesTxt(s){
  var i = STADES.indexOf(s), min = i ? STADES[i-1].max : 0;
  return s.max === 99 ? "≳ " + min + " SA" : min + "–" + s.max + " SA";
}

/* ── Construction du DOM — une seule fois, le clic ne fait que repeindre ──── */
function chip(act, k, l, sous){
  return '<button type="button" class="chip" data-act="' + act + '" data-k="' + esc(k) + '">' +
         (sous ? '<span class="k">' + esc(sous) + '</span>' : '') + esc(l) + '</button>';
}
function batir(){
  if (PAIR){
    $("coteBloc").hidden = false;
    $("cote").innerHTML = COTES.map(function(c){ return chip("cote", c.k, c.l); }).join("");
  }
  $("prelevement").innerHTML = PRELEV.map(function(p){ return chip("prelev", p.k, p.l); }).join("");

  $("retention").innerHTML = RETENTION.map(function(r){
    return '<div class="item"><div class="head"><div class="lbl">' + esc(r.l) +
      '<span class="meta ' + r.q + '">' + esc(r.b) + " · " + esc(r.d) +
      " · prédicteur " + r.q + '</span></div>' +
      '<button type="button" class="chip" data-act="ret" data-k="' + r.k + '" data-v="present">Présent</button>' +
      '<button type="button" class="chip" data-act="ret" data-k="' + r.k + '" data-v="absent">Absent</button>' +
      '</div></div>';
  }).join("");
  $("kcl").innerHTML = chip("kcl", "kcl", "Fœticide par KCl", "geste à déclarer avant toute datation");

  $("stTitre").textContent = STADE_TITRE;
  $("stades").innerHTML = STADES.map(function(s){ return chip("stade", s.k, s.l); }).join("");

  if (MESURE){
    var h = '<div class="sousTitre">' + esc(MESURE.titre) + '</div>';
    h += '<div class="chips" id="mesDefs">' +
         MESURE.defs.map(function(d){ return chip("mdef", d.k, d.l, MESURE.defLabel); }).join("") + '</div>';
    if (MESURE.opts && MESURE.opts.length)
      h += '<div class="chips" id="mesOpts" style="margin-top:6px">' +
           MESURE.opts.map(function(o){ return chip("mopt", o.k, o.l, MESURE.optLabel); }).join("") + '</div>';
    h += '<div class="row" style="margin-top:9px">' + MESURE.champs.map(function(c){
      return '<div class="field"><label for="m_' + c.id + '">' + esc(c.label) + '</label>' +
             '<input type="number" id="m_' + c.id + '" min="' + c.min + '" max="' + c.max +
             '" step="' + c.step + '" inputmode="decimal" placeholder="—"></div>';
    }).join("") + '</div>';
    $("mesure").innerHTML = h;
    $("vMesure").hidden = false;
    $("vMesure").querySelector("b").textContent = MESURE.titre;
  }

  $("variantes").innerHTML = VARIANTES.map(function(v){ return chip("var", v.k, v.l); }).join("");

  /* Un signe peut porter un groupe g (placenta : cordon, membranes, parenchyme sous
     cordon, marge, systémique) : un sous-titre s'ouvre quand le groupe change. */
  var gPrec = null;
  $("signes").innerHTML = SIGNES.map(function(x){
    var h = "";
    if (x.g && x.g !== gPrec){ h = '<div class="sousTitre">' + esc(x.g) + '</div>'; gPrec = x.g; }
    return h + '<div class="item"><div class="head"><div class="lbl">' + esc(x.l) +
      (x.meta ? '<span class="meta">' + esc(x.meta) + '</span>' : "") +
      '</div>' +
      '<button type="button" class="chip" data-act="les" data-k="' + x.k + '" data-v="normal">Normal</button>' +
      '<button type="button" class="chip" data-act="les" data-k="' + x.k + '" data-v="anormal">Anormal</button>' +
      '</div></div>';
  }).join("");

  $("foeto").innerHTML = FOETO.sections.map(function(s){
    return '<div class="sousTitre">' + esc(s.t) + '</div><div class="chips">' +
           s.termes.map(function(t){ return chip("foeto", t.id, t.l); }).join("") + '</div>';
  }).join("") || '<p class="note">Aucun terme FOETO rattaché à cette fiche.</p>';
  if (FOETO.sections.length){
    $("foetoPlus").hidden = false; $("foetoRech").hidden = false;
    $("foetoPlus").textContent = "▸ tous les termes attestés (" + nbFoeto() + ")";
  }

  $("negatifs").innerHTML = NEGATIFS.map(function(n){
    return '<div class="item"><div class="head"><div class="lbl">' + esc(n.l) +
      '<span class="meta">' + esc(n.p) + '</span></div>' +
      '<button type="button" class="chip" data-act="neg" data-k="' + n.k + '" data-v="absent">Vérifié</button>' +
      '<button type="button" class="chip" data-act="neg" data-k="' + n.k + '" data-v="present">EN DÉFAUT</button>' +
      '</div></div>';
  }).join("");

  $("techNote").textContent = TECH_NOTE;
  $("techniques").innerHTML = TECHNIQUES.map(function(t){ return chip("tech", t.k, t.l, t.q); }).join("");
}

function nbFoeto(){ return FOETO.sections.reduce(function(a, s){ return a + s.termes.length; }, 0); }
function foetoLabel(id){
  var l = null;
  FOETO.sections.forEach(function(s){ s.termes.forEach(function(t){ if (t.id === id) l = t.l; }); });
  return l || (FOETO.formes[id] || [id])[0];
}
/* ajoute (ou coche) un terme FOETO — depuis la liste ou la recherche */
function foetoAjouter(id){
  if (!document.querySelector('#foeto [data-act="foeto"][data-k="' + id + '"]')){
    var box = $("foeto").querySelector(".chips");
    if (!box){ $("foeto").innerHTML = '<div class="chips"></div>'; box = $("foeto").querySelector(".chips"); }
    box.insertAdjacentHTML("beforeend", chip("foeto", id, foetoLabel(id)));
  }
  E.foeto[id] = true;
  peindre(); enregistrer();
}
function rechercherFoeto(q){
  var sg = $("sgFoeto");
  q = q.trim().toLowerCase();
  if (q.length < 3){ sg.classList.remove("on"); return; }
  var hits = [];
  Object.keys(FOETO.formes).some(function(id){
    var f = FOETO.formes[id].filter(function(x){ return x.toLowerCase().indexOf(q) >= 0; })[0];
    if (f) hits.push({ id:id, l:foetoLabel(id), f:f, hf:FOETO.formes[id].indexOf("(hors fiche)") >= 0 });
    return hits.length >= 10;
  });
  sg.innerHTML = hits.length ? hits.map(function(x){
    return '<div data-pick="' + esc(x.id) + '">' + esc(x.l) +
           (x.f !== x.l ? ' <small>— ' + esc(x.f) + '</small>' : '') + (x.hf ? ' <small>(hors fiche)</small>' : '') + '</div>';
  }).join("") : '<div><small>aucun terme</small></div>';
  sg.classList.add("on");
}

/* ── Associations ─────────────────────────────────────────────────────────────
   Un diagnostic ne se coche pas : il se lit dans l'association des signes. Les
   faisceaux incomplets sont affichés aussi — 2 signes sur 4 se dit, et dire
   combien manquent est le seul moyen de distinguer « non trouvé » de « non
   regardé ». */
function seuil(d){ return d.min || d.signes.length; }
function associations(){
  return DIAGS.map(function(d){
    var pris  = d.signes.filter(function(k){ return E.signes[k] === "anormal"; });
    var muets = d.signes.filter(function(k){ return !E.signes[k]; });
    /* Un signe pivot ne se remplace pas par le nombre : sans lui, le compte peut
       être atteint sans que l'association tienne. */
    var pivot = !d.cle || E.signes[d.cle] === "anormal";
    return { d:d, pris:pris, muets:muets, pivot:pivot,
             tenu: pivot && pris.length >= seuil(d) };
  }).filter(function(a){ return a.pris.length; })
    .sort(function(a, b){ return (b.tenu - a.tenu) || (b.pris.length - a.pris.length); });
}
function nomSigne(k){ var s = par(SIGNES, k); return s ? s.l : k; }

/* ── Verdicts communs ─────────────────────────────────────────────────────── */
function verdictPrelevement(){
  var n = Object.keys(E.prelev).length, res = [], grave = false;
  PRELEV.forEach(function(p){
    if (p.manque && !E.prelev[p.k]){ res.push(p.manque); if (p.grave) grave = true; }
  });
  if (PAIR && !E.cote) res.push("côté non déclaré — organe pair");
  return { n:n, res:res,
    cls: res.length ? (grave ? "bad" : "warn") : (n === PRELEV.length ? "ok" : ""),
    txt: n === 0 ? "—"
       : (n + "/" + PRELEV.length + " item(s) confirmé(s)" +
          (PAIR && E.cote ? ", " + par(COTES, E.cote).l.toLowerCase().split(" —")[0] : "") + ".") +
         (res.length ? " Réserves : " + res.join(" ; ") + "." : " Prélèvement complet.") };
}
function verdictRetention(){
  if (E.kcl) return { cls:"bad", borne:null, txt:KCL_TXT };
  var pres = RETENTION.filter(function(r){ return E.retention[r.k] === "present"; });
  if (!pres.length) return { cls:"", borne:null,
    txt: Object.keys(E.retention).length ? "Aucun critère de rétention positif." : "—" };
  var notes = [];
  pres.forEach(function(r){ if (r.note) notes.push(r.note); });
  var bons = pres.filter(function(r){ return r.q !== "mauvais"; });
  if (!bons.length) return { cls:"warn", borne:null,
    txt:"Seuls des prédicteurs MAUVAIS sont positifs — aucune borne recevable. " + notes.join(" ; ") + "." };
  var top = bons.reduce(function(a, b){ return b.h > a.h ? b : a; });
  if (top.alerte) notes.push(top.alerte);
  return { cls:"ok", borne:top,
    txt:"Rétention " + top.b + " — critère : " + top.l.toLowerCase() + " (" + top.d + ")." +
        (notes.length ? " Réserves : " + notes.join(" ; ") + "." : "") };
}
function verdictMaturation(){
  var sa = num("sa"), att = stadeAttendu(sa), obs = E.stade ? par(STADES, E.stade) : null;
  if (!obs) return { cls:"", att:att, txt: att
    ? "Stade attendu à " + sa + " SA : " + att.l.toLowerCase() + ". Confirmer ou choisir."
    : "Saisir le terme pour afficher le stade attendu." };
  if (!att) return { cls:"warn", att:null,
    txt:"Stade " + obs.l.toLowerCase() + " — sans terme, aucune discordance n'est calculable." };
  var io = STADES.indexOf(obs), ia = STADES.indexOf(att), t, cls;
  if (io === ia){ cls = "ok"; t = "Maturation conforme au terme : " + obs.l.toLowerCase() + " à " + sa + " SA."; }
  else if (io < ia){ cls = "warn";
    t = "Retard de maturation : " + obs.l.toLowerCase() + " observé, " + att.l.toLowerCase() +
        " attendu à " + sa + " SA (terme histologique estimé " + bornesTxt(obs) + ")." +
        (RETARD_NOTE ? " " + RETARD_NOTE : ""); }
  else { cls = "warn";
    t = "Avance de maturation : " + obs.l.toLowerCase() + " observé, " + att.l.toLowerCase() +
        " attendu à " + sa + " SA (terme histologique estimé " + bornesTxt(obs) + ")." +
        (AVANCE_NOTE ? " " + AVANCE_NOTE : ""); }
  if (obs.note) t += " (" + obs.note + ")";
  return { cls:cls, att:att, txt:t };
}

/* ── Peinture ─────────────────────────────────────────────────────────────── */
function classe(act, v){
  if (act === "neg") return v === "present" ? "no" : "on";
  if (act === "les") return v === "anormal" ? "no" : "on";
  return "on";
}
function poser(id, v){
  var e = $(id), t = e.querySelector("b").textContent;
  e.className = "verdict" + (v.cls ? " " + v.cls : "");
  e.innerHTML = "<b>" + esc(t) + "</b>" + esc(v.txt);
}
function tally(id, n, sur){ $(id).textContent = n ? n + "/" + sur : "—"; }

function peindreDiags(){
  var A = associations();
  if (!A.length){
    $("diags").innerHTML = '<p class="note" style="margin:0">Aucun signe anormal coché : rien à associer.</p>';
    return;
  }
  $("diags").innerHTML = A.map(function(a){
    return '<div class="item"><div class="head"><div class="lbl">' + esc(a.d.l) +
      '<span class="meta">' + a.pris.length + "/" + a.d.signes.length + " signe(s), seuil " + seuil(a.d) +
      (a.muets.length ? " · " + a.muets.length + " non regardé(s)" : "") + '</span></div>' +
      '<span class="chip ' + (a.tenu ? "on" : "") + '" style="cursor:default">' +
      (a.tenu ? "association tenue" : "faisceau incomplet") + '</span></div>' +
      '<div class="unfold">' +
      '<div class="note" style="margin:0">' +
      (a.pivot ? "" : "Signe pivot non coché : " + esc(nomSigne(a.d.cle)) + ".<br>") +
      esc(a.pris.map(nomSigne).join(" · ")) +
      (a.muets.length ? "<br>Non regardés : " + esc(a.muets.map(nomSigne).join(" · ")) + "." : "") +
      '</div>' +
      '<div class="stop"><b>Ce qu\'il ne faut pas conclure</b>' + esc(a.d.stop) + '</div></div></div>';
  }).join("");
}

function peindre(){
  if (PAIR) document.querySelectorAll("#cote .chip").forEach(function(b){
    b.className = "chip" + (E.cote === b.dataset.k ? " on" : "");
  });
  document.querySelectorAll("#prelevement .chip").forEach(function(b){
    b.className = "chip" + (E.prelev[b.dataset.k] ? " on" : "");
  });
  document.querySelectorAll("#retention .chip").forEach(function(b){
    b.className = "chip" + (E.retention[b.dataset.k] === b.dataset.v ? " on" : "");
  });
  $("kcl").firstChild.className = "chip" + (E.kcl ? " no" : "");
  document.querySelectorAll("#stades .chip").forEach(function(b){
    var att = stadeAttendu(num("sa"));
    b.className = "chip" + (E.stade === b.dataset.k ? " on"
                          : (att && att.k === b.dataset.k ? " sugg" : ""));
  });
  if (MESURE){
    document.querySelectorAll("#mesDefs .chip").forEach(function(b){
      b.className = "chip" + (E.mesure.def === b.dataset.k ? " on" : "");
    });
    if ($("mesOpts")) document.querySelectorAll("#mesOpts .chip").forEach(function(b){
      b.className = "chip" + (E.mesure.opt === b.dataset.k ? " on" : "");
    });
  }
  document.querySelectorAll("#variantes .chip").forEach(function(b){
    b.className = "chip" + (E.variantes[b.dataset.k] ? " on" : "");
  });
  document.querySelectorAll("#signes .chip").forEach(function(b){
    b.className = "chip" + (E.signes[b.dataset.k] === b.dataset.v
                            ? " " + classe("les", b.dataset.v) : "");
  });
  peindreDiags();
  document.querySelectorAll('[data-act="foeto"]').forEach(function(b){
    b.className = "chip" + (E.foeto[b.dataset.k] ? " on" : "");
  });
  document.querySelectorAll("#negatifs .chip").forEach(function(b){
    b.className = "chip" + (E.negatifs[b.dataset.k] === b.dataset.v
                            ? " " + classe("neg", b.dataset.v) : "");
  });
  var sug = suggerer();
  document.querySelectorAll("#techniques .chip").forEach(function(b){
    b.className = "chip" + (E.techniques[b.dataset.k] ? " on" : (sug[b.dataset.k] ? " sugg" : ""));
  });

  tally("tPrelevement", Object.keys(E.prelev).length, PRELEV.length);
  tally("tRetention",   Object.keys(E.retention).length, RETENTION.length);
  tally("tMaturation",  (E.stade ? 1 : 0) + (MESURE && E.mesure.def ? 1 : 0), MESURE ? 2 : 1);
  tally("tVariantes",   Object.keys(E.variantes).length, VARIANTES.length);
  tally("tSignes",     Object.keys(E.signes).length, SIGNES.length);
  tally("tFoeto",       Object.keys(E.foeto).length, nbFoeto());
  tally("tNegatifs",    Object.keys(E.negatifs).length, NEGATIFS.length);
  tally("tTechniques",  Object.keys(E.techniques).length, TECHNIQUES.length);

  poser("vPrelevement", verdictPrelevement());
  poser("vRetention",   verdictRetention());
  poser("vMaturation",  verdictMaturation());
  if (MESURE) poser("vMesure", verdictMesure());

  var cr = composer();
  $("cr").textContent = cr;
  $("tCR").textContent = cr.split("\n").length + " lignes";
}

/* ── Compte rendu — la sortie du module, écrite par les clics ─────────────── */
function composer(){
  var sa = num("sa"), L = [];
  L.push(TITRE_CR + " — grille de lecture");
  L.push((dossier || "dossier —") + " · " + (sa != null ? sa + " SA" : "terme —") +
         " · " + ($("operateur").value.trim() || "lecteur —") +
         (PAIR ? " · " + (E.cote ? par(COTES, E.cote).l : "côté non déclaré") : ""));
  L.push("");

  L.push("PRÉLÈVEMENT");
  L.push("  " + verdictPrelevement().txt);

  L.push("");
  L.push("RÉTENTION");
  L.push("  " + verdictRetention().txt);

  L.push("");
  L.push("MATURATION");
  L.push("  " + verdictMaturation().txt);
  if (MESURE) L.push("  " + verdictMesure().txt);

  var vus = VARIANTES.filter(function(v){ return E.variantes[v.k]; });
  if (vus.length){
    L.push("");
    L.push("VARIANTES NORMALES VUES ET ÉCARTÉES");
    L.push("  " + vus.map(function(v){ return v.l.toLowerCase(); }).join(" · "));
  }

  var anormales = SIGNES.filter(function(x){ return E.signes[x.k] === "anormal"; });
  var normales  = SIGNES.filter(function(x){ return E.signes[x.k] === "normal"; });
  L.push("");
  L.push("SIGNES");
  if (!anormales.length && !normales.length) L.push("  aucun axe exploré.");
  anormales.forEach(function(x){ L.push("  " + (x.g ? x.g + " · " : "") + x.l + " — ANORMAL"); });
  if (normales.length)
    L.push("  Normaux : " + normales.map(function(x){ return x.l.toLowerCase(); }).join(" · ") + ".");
  var muets = SIGNES.filter(function(x){ return !E.signes[x.k]; });
  if (muets.length)
    L.push("  Non explorés : " + muets.map(function(x){ return x.l.toLowerCase(); }).join(" · ") + ".");

  var fo = Object.keys(E.foeto);
  if (fo.length){
    L.push("");
    L.push("TERMES FOETO");
    fo.forEach(function(id){ L.push("  " + foetoLabel(id) + " [" + id + "]"); });
  }

  var A = associations();
  L.push("");
  L.push("ASSOCIATIONS LUES");
  if (!A.length) L.push("  aucune : les signes cochés ne dessinent aucune association.");
  A.forEach(function(a){
    L.push("  " + a.d.l + " — " + (a.tenu ? "association tenue" : "faisceau incomplet") +
           " (" + a.pris.length + "/" + a.d.signes.length + ", seuil " + seuil(a.d) + ")");
    L.push("      · " + a.pris.map(nomSigne).join(" · "));
    if (!a.pivot) L.push("      · signe pivot non coché : " + nomSigne(a.d.cle));
    if (a.muets.length) L.push("      · non regardés : " + a.muets.map(nomSigne).join(" · "));
    L.push("      · ne pas conclure : " + a.d.stop);
  });

  L.push("");
  L.push("NÉGATIFS OBLIGATOIRES");
  NEGATIFS.forEach(function(n){
    var v = E.negatifs[n.k];
    L.push("  " + (v === "absent" ? "· " + n.l
                 : v === "present" ? "! " + n.ko
                 : "? " + n.l + " — non vérifié"));
  });

  var t = TECHNIQUES.filter(function(x){ return E.techniques[x.k]; });
  if (t.length){
    L.push("");
    L.push("TECHNIQUES DEMANDÉES");
    t.forEach(function(x){ L.push("  · " + x.l + " — " + x.q); });
  }

  if (E.libre.trim()){
    L.push("");
    L.push("REMARQUE");
    E.libre.trim().split("\n").forEach(function(x){ L.push("  " + x); });
  }

  L.push("");
  L.push("— La micro décrit ; la conclusion nomme. Grille v" + VERSION + " issue de " + SOURCE + ".");
  return L.join("\n");
}

/* ── Clics ────────────────────────────────────────────────────────────────── */
document.addEventListener("click", function(ev){
  var b = ev.target.closest ? ev.target.closest("button[data-act]") : null;
  if (!b || b.closest("section.off")) return;
  var k = b.dataset.k, v = b.dataset.v, a = b.dataset.act;
  if (a === "cote"){ E.cote = E.cote === k ? null : k; }
  else if (a === "prelev"){ if (E.prelev[k]) delete E.prelev[k]; else E.prelev[k] = true; }
  else if (a === "ret"){ if (E.retention[k] === v) delete E.retention[k]; else E.retention[k] = v; }
  else if (a === "kcl"){ E.kcl = !E.kcl; }
  else if (a === "stade"){ E.stade = E.stade === k ? null : k; }
  else if (a === "mdef"){ E.mesure.def = E.mesure.def === k ? null : k; }
  else if (a === "mopt"){ E.mesure.opt = E.mesure.opt === k ? null : k; }
  else if (a === "var"){ if (E.variantes[k]) delete E.variantes[k]; else E.variantes[k] = true; }
  else if (a === "les"){ if (E.signes[k] === v) delete E.signes[k]; else E.signes[k] = v; }
  else if (a === "neg"){ if (E.negatifs[k] === v) delete E.negatifs[k]; else E.negatifs[k] = v; }
  else if (a === "tech"){ if (E.techniques[k]) delete E.techniques[k]; else E.techniques[k] = true; }
  else if (a === "foeto"){ if (E.foeto[k]) delete E.foeto[k]; else E.foeto[k] = true; }
  else return;
  peindre(); enregistrer();
});
document.addEventListener("click", function(ev){
  var t = ev.target.closest ? ev.target.closest("[data-pick]") : null;
  if (t){ foetoAjouter(t.dataset.pick); $("rqFoeto").value = ""; $("sgFoeto").classList.remove("on"); }
});
$("foetoPlus").onclick = function(){
  var box = $("foetoTous");
  if (!box.children.length) box.innerHTML = FOETO.sections.map(function(s){
    return s.termes.map(function(t){ return chip("foeto", t.id, t.l); }).join("");
  }).join("");
  box.hidden = !box.hidden; peindre();
};
$("rqFoeto").addEventListener("input", function(){ rechercherFoeto(this.value); });
$("btnNegAll").onclick = function(){
  NEGATIFS.forEach(function(n){ if (!E.negatifs[n.k]) E.negatifs[n.k] = "absent"; });
  peindre(); enregistrer();
};
$("btnCopie").onclick = function(){
  var t = composer();
  if (navigator.clipboard && navigator.clipboard.writeText)
    navigator.clipboard.writeText(t).then(function(){ flash("Compte rendu copié."); },
                                          function(){ flash("Copie refusée par le navigateur."); });
  else flash("Presse-papiers indisponible en file://.");
};
document.addEventListener("input", function(e){
  var id = e.target.id;
  if (id.indexOf("m_") === 0) E.mesure.v[id.slice(2)] = num(id);
  else if (id === "libre") E.libre = e.target.value;
  else if (id === "sa") majSa();
  else return;
  peindre(); enregistrer();
});
function majSa(){
  var sa = num("sa"), att = stadeAttendu(sa), h = $("saHint");
  h.className = "hint" + (att ? " good" : "");
  h.textContent = att ? "Stade attendu : " + att.l.toLowerCase() + " (" + bornesTxt(att) + ")."
                      : "SA = semaines de gestation + 2. Commande le stade attendu.";
}

/* ── IndexedDB ────────────────────────────────────────────────────────────────
   localStorage est erratique en file:// et cloisonné par fichier sur certains
   navigateurs : la saisie va en IndexedDB, y compris les champs texte.       */
function openDB(){
  return new Promise(function(res, rej){
    var r;
    try { r = indexedDB.open(DB_NAME, DB_VER); }
    catch(e){ rej(e); return; }
    r.onupgradeneeded = function(e){
      var d = e.target.result;
      if (!d.objectStoreNames.contains("saisies")) d.createObjectStore("saisies", {keyPath:"dossier"});
    };
    r.onsuccess = function(){ res(r.result); };
    r.onerror   = function(){ rej(r.error || new Error("accès refusé")); };
  });
}
function tx(mode, fn){
  return new Promise(function(res, rej){
    if (!db){ rej(new Error("base indisponible")); return; }
    var t = db.transaction("saisies", mode), out = fn(t.objectStore("saisies"));
    /* Tester la présence de `result`, pas sa valeur : un get() qui ne trouve rien
       a bien un `result` (undefined) — comparé à undefined, la requête elle-même
       était rendue, et un dossier jamais saisi s'annonçait comme restitué. */
    t.oncomplete = function(){ res(out && "result" in out ? out.result : out); };
    t.onerror    = function(){ rej(t.error); };
    t.onabort    = function(){ rej(t.error || new Error("transaction interrompue")); };
  });
}
function putSaisie(r){ return tx("readwrite", function(s){ return s.put(r); }); }
function getSaisie(d){ return tx("readonly",  function(s){ return s.get(d); }); }

/* ── Verrou ───────────────────────────────────────────────────────────────── */
function verrouiller(ouvert){
  ["secPrelevement","secRetention","secMaturation","secVariantes","secSignes","secFoeto",
   "secNegatifs","secTechniques","secCR","secSortie"].forEach(function(id){
    $(id).classList.toggle("off", !ouvert);
  });
}

/* ── Collecte / restitution ───────────────────────────────────────────────── */
function collecter(){
  return {
    schema_version: SCHEMA,
    module: MODULE,
    module_version: VERSION,
    organe: ORGANE,
    source: SOURCE,
    dossier: dossier,
    operateur: $("operateur").value.trim() || null,
    exported_at: new Date().toISOString(),
    terme_sa: num("sa"),
    grille: JSON.parse(JSON.stringify(E)),
    compte_rendu: composer()
  };
}
function appliquer(o){
  var g = o.grille || {};
  E = neuf();
  ["prelev","retention","variantes","signes","negatifs","techniques","foeto"].forEach(function(c){
    if (g[c]) E[c] = g[c];
  });
  Object.keys(E.foeto).forEach(function(id){
    if (!document.querySelector('#foeto [data-act="foeto"][data-k="' + id + '"]')) foetoAjouter(id);
  });
  E.kcl = !!g.kcl; E.stade = g.stade || null; E.cote = g.cote || null;
  if (g.mesure){
    E.mesure.def = g.mesure.def || null;
    E.mesure.opt = g.mesure.opt || null;
    champs().forEach(function(c){
      E.mesure.v[c.id] = (g.mesure.v && g.mesure.v[c.id] != null) ? g.mesure.v[c.id] : null;
    });
  }
  E.libre = g.libre || "";
  $("sa").value = o.terme_sa != null ? o.terme_sa : "";
  champs().forEach(function(c){ $("m_" + c.id).value = E.mesure.v[c.id] != null ? E.mesure.v[c.id] : ""; });
  $("libre").value = E.libre;
  majSa(); peindre();
}
function vider(){
  E = neuf();
  ["sa","libre"].forEach(function(id){ $(id).value = ""; });
  champs().forEach(function(c){ $("m_" + c.id).value = ""; });
  majSa(); peindre();
}

/* ── Enregistrement continu ───────────────────────────────────────────────── */
var attente = null;
function enregistrer(){
  if (!dossier || !db) return;
  clearTimeout(attente);
  attente = setTimeout(function(){
    putSaisie(collecter()).catch(function(e){ flash("Enregistrement refusé : " + e.message); });
  }, 350);
}

/* ── Saisie du dossier ────────────────────────────────────────────────────── */
$("dossier").addEventListener("input", function(){
  var p = this.selectionStart;
  this.value = normDossier(this.value);
  try { this.setSelectionRange(p, p); } catch(e){}
  majDossier();
});
$("operateur").addEventListener("input", function(){ majDossier(); enregistrer(); });

async function majDossier(){
  var v = $("dossier").value, ok1 = dossierOk(v), op = $("operateur").value.trim() !== "";
  var ok = ok1 && op, h = $("dossierHint");
  h.className = "hint" + (v && !ok1 ? " bad" : ok1 ? " good" : "");
  h.textContent = !v ? "Libre, mis en majuscules. Conditionne l'enregistrement."
                : ok1 ? "Fichier de sortie : " + v + "_" + MODULE + ".json"
                      : "Numéro incomplet — enregistrement et export bloqués";
  var oh = $("operateurHint");
  oh.className = "hint" + (op ? " good" : "");
  oh.textContent = op ? "Consigné dans l'export." : "Requis pour déverrouiller la grille.";

  verrouiller(ok);
  $("btnExport").disabled = !ok;
  $("outHint").textContent = ok
    ? "L'export produira " + v + "_" + MODULE + ".json."
    : ok1 ? "Saisir le lecteur pour activer l'export."
          : "Saisir le numéro de dossier pour activer l'export.";

  if (ok && v !== dossier){
    dossier = v;
    vider();
    var rec = await getSaisie(dossier).catch(function(){ return null; });
    if (rec){ appliquer(rec); flash("Grille du " + dossier + " restituée."); }
  } else if (!ok && dossier){
    dossier = ""; vider();
  }
  peindre();
}

/* ── Export / relecture / purge ───────────────────────────────────────────── */
function telecharger(blob, nom){
  var a = document.createElement("a");
  a.href = URL.createObjectURL(blob); a.download = nom;
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(function(){ URL.revokeObjectURL(a.href); }, 5000);
}
$("btnExport").onclick = function(){
  if (!dossierOk(dossier)) return;
  var out = collecter();
  telecharger(new Blob([JSON.stringify(out, null, 1)], {type:"application/json"}),
              dossier + "_" + MODULE + ".json");
  var n = NEGATIFS.filter(function(x){ return E.negatifs[x.k]; }).length;
  flash("Grille exportée." + (n < NEGATIFS.length ? " ⚠ " + (NEGATIFS.length - n) + " négatif(s) non vérifié(s)." : ""));
};
function relire(o){
  if (o.module && o.module !== MODULE) throw new Error("module « " + o.module + " », attendu « " + MODULE + " »");
  if (!o.grille) throw new Error("aucune clé « grille »");
  if (o.dossier) $("dossier").value = normDossier(o.dossier);
  if (o.operateur) $("operateur").value = o.operateur;
  return majDossier().then(function(){
    if (!dossier) throw new Error("numéro de dossier absent ou lecteur manquant");
    appliquer(o); enregistrer();
    return true;
  });
}
$("btnImport").onclick = function(){ $("jsonPick").click(); };
$("jsonPick").addEventListener("change", function(){
  var f = this.files[0]; this.value = "";
  if (!f) return;
  var fr = new FileReader();
  fr.onload = function(){
    Promise.resolve().then(function(){ return relire(JSON.parse(String(fr.result))); })
      .then(function(){ flash("Grille relue."); })
      .catch(function(e){ flash("Relecture impossible : " + e.message); });
  };
  fr.readAsText(f);
});
$("btnWipe").onclick = async function(){
  var seul = dossier
    ? confirm("Effacer la grille du dossier " + dossier + " ?\n\n" +
              "OK : ce dossier seulement.\nAnnuler : choisir ensuite un effacement total.")
    : false;
  if (seul){
    await tx("readwrite", function(s){ return s.delete(dossier); });
    vider(); flash("Dossier " + dossier + " vidé.");
    return;
  }
  if (!confirm("Effacer TOUTES les grilles de TOUS les dossiers sur cet appareil ?\n" +
               "Vérifier que les exports JSON ont bien été récupérés.")) return;
  await tx("readwrite", function(s){ return s.clear(); });
  vider(); flash("Stockage vidé.");
};

/* ── Diagnostic ───────────────────────────────────────────────────────────── */
function ligne(k, v, c){
  var tr = document.createElement("tr");
  tr.innerHTML = '<td>' + k + '</td><td class="' + (c||"") + '">' + esc(v) + '</td>';
  $("diag").querySelector("tbody").appendChild(tr);
}
async function diagnostic(){
  var pr = location.protocol;
  ligne("Ouverture", pr + (pr === "file:" ? " — double-clic" : " — servi"), pr === "file:" ? "warn" : "ok");
  ligne("IndexedDB", db ? "opérationnel" : "INDISPONIBLE", db ? "ok" : "ko");
  var p = false;
  if (navigator.storage && navigator.storage.persist){
    try { p = await navigator.storage.persisted(); if (!p) p = await navigator.storage.persist(); } catch(e){}
  }
  ligne("Stockage persistant", p ? "accordé" : "non accordé", p ? "ok" : "warn");
  ligne("Axes de la grille", PRELEV.length + " prélèvement · " + RETENTION.length + " rétention · " +
                             STADES.length + " stades · " + SIGNES.length + " signes · " +
                             DIAGS.length + " associations · " +
                             NEGATIFS.length + " négatifs · " + TECHNIQUES.length + " techniques");
  ligne("Source", SOURCE + " — la fiche est la source, ce module en est la sortie");
  ligne("Version du document", "v" + VERSION + " — schéma " + SCHEMA);
  ligne("Navigateur", navigator.userAgent.slice(0, 80));
}

/* ── Démarrage ────────────────────────────────────────────────────────────── */
(async function(){
  $("ver").textContent = "v" + VERSION;
  E = neuf();
  batir(); majSa(); peindre();
  try { db = await openDB(); }
  catch(e){
    var h = $("dossierHint");
    h.className = "hint bad";
    h.textContent = "IndexedDB refusé (" + e.message +
                    ") — aucune saisie ne sera conservée. Servir le fichier localement.";
    await diagnostic();
    return;
  }
  await majDossier();
  await diagnostic();
  if (location.search.indexOf("selftest") >= 0) autotest();
})();

/* ── Auto-contrôle — ouvrir le fichier avec ?selftest=1 ───────────────────── */
async function autotest(){
  var ok = [], ko = [];
  function chk(n, c){ (c ? ok : ko).push(n); }
  function set(id, v){ var e = $(id); e.value = v; e.dispatchEvent(new Event("input", {bubbles:true})); }
  function clic(act, k, v){
    var s = '[data-act="' + act + '"][data-k="' + k + '"]' + (v ? '[data-v="' + v + '"]' : "");
    var b = document.querySelector(s);
    if (!b){ ko.push("bouton introuvable : " + s); return null; }
    b.click(); return b;
  }
  function crTient(t){ return $("cr").textContent.indexOf(t) >= 0; }
  var pause = function(){ return new Promise(function(r){ setTimeout(r, 30); }); };

  /* Intégrité des tableaux — pure, sans DOM */
  ["PRELEV","RETENTION","STADES","VARIANTES","SIGNES","DIAGS","NEGATIFS","TECHNIQUES"].forEach(function(nom){
    var t = { PRELEV:PRELEV, RETENTION:RETENTION, STADES:STADES, VARIANTES:VARIANTES,
              SIGNES:SIGNES, DIAGS:DIAGS, NEGATIFS:NEGATIFS, TECHNIQUES:TECHNIQUES }[nom];
    chk("clés uniques dans " + nom, new Set(t.map(function(x){ return x.k; })).size === t.length);
  });
  chk("stades ordonnés",      STADES.every(function(s, i){ return !i || s.max > STADES[i-1].max; }));
  chk("dernier stade ouvert", STADES[STADES.length-1].max === 99);
  chk("sans terme, pas de stade", stadeAttendu(null) === null);
  chk("chaque association a son « ne pas conclure »",
      DIAGS.every(function(d){ return d.stop && d.signes.length >= 2; }));
  chk("chaque association ne cite que des signes déclarés",
      DIAGS.every(function(d){ return d.signes.every(function(k){ return !!par(SIGNES, k); }); }));
  chk("le signe pivot fait partie de l'association",
      DIAGS.every(function(d){ return !d.cle || d.signes.indexOf(d.cle) >= 0; }));
  chk("seuil d'association atteignable",
      DIAGS.every(function(d){ return seuil(d) >= 1 && seuil(d) <= d.signes.length; }));
  chk("chaque négatif a son défaut", NEGATIFS.every(function(n){ return n.ko && n.p; }));
  chk("une borne de rétention au moins est bonne",
      RETENTION.some(function(r){ return r.q === "bon"; }));

  /* Verrou */
  chk("verrouillé au départ",  $("secSignes").classList.contains("off"));
  clic("prelev", PRELEV[0].k);
  chk("clic ignoré sous verrou", !E.prelev[PRELEV[0].k]);
  set("dossier", "26p0123");
  chk("lecteur manquant",      $("secSignes").classList.contains("off"));
  set("operateur", "RM");
  await pause();
  chk("déverrouillé",         !$("secSignes").classList.contains("off"));
  chk("dossier normalisé",     $("dossier").value === "26P0123");
  chk("export activé",        !$("btnExport").disabled);

  /* Chips */
  clic("prelev", PRELEV[0].k);
  chk("chip prélèvement posée", E.prelev[PRELEV[0].k] === true &&
      document.querySelector('[data-act="prelev"][data-k="' + PRELEV[0].k + '"]').className.indexOf("on") >= 0);
  clic("prelev", PRELEV[0].k);
  chk("chip retirée au 2e clic", !E.prelev[PRELEV[0].k]);

  /* Rétention — le fœticide prime sur toute borne */
  var bon = RETENTION.filter(function(r){ return r.q === "bon"; })[0];
  clic("ret", bon.k, "present");
  chk("borne posée",           $("vRetention").textContent.indexOf("Rétention " + bon.b) >= 0);
  clic("kcl", "kcl");
  chk("KCl invalide la datation", $("vRetention").className.indexOf("bad") >= 0);
  clic("kcl", "kcl");
  chk("KCl levé, borne revenue", $("vRetention").textContent.indexOf("Rétention " + bon.b) >= 0);
  clic("ret", bon.k, "present");

  /* Côté — organe pair */
  if (PAIR){
    chk("bloc côté visible",   !$("coteBloc").hidden);
    chk("côté manquant en réserve",
        verdictPrelevement().res.indexOf("côté non déclaré — organe pair") >= 0);
    clic("cote", "droit");
    chk("côté posé",            E.cote === "droit" && crTient("Droit — 1/2"));
    clic("cote", "droit");
    chk("2e clic retire le côté", E.cote === null);
    clic("cote", "deux");
  } else {
    chk("pas de bloc côté sur organe impair", $("coteBloc").hidden);
  }

  /* Signes et associations */
  var d0 = DIAGS[0], l0 = par(SIGNES, d0.signes[0]);
  chk("rien à associer au départ", $("diags").textContent.indexOf("Aucun signe anormal") >= 0);
  clic("les", l0.k, "anormal");
  chk("signe posé anormal",    E.signes[l0.k] === "anormal");
  chk("association esquissée",  $("diags").textContent.indexOf(d0.l) >= 0);
  clic("les", l0.k, "anormal");
  chk("2e clic remet à non exploré", !E.signes[l0.k]);
  clic("les", l0.k, "normal");
  chk("normal ne nourrit pas l'association", associations().length === 0);
  clic("les", l0.k, "normal");

  /* L'association complète se tient, et elle seule */
  d0.signes.forEach(function(k){ clic("les", k, "anormal"); });
  var a0 = associations().filter(function(a){ return a.d.k === d0.k; })[0];
  chk("association tenue",     a0 && a0.tenu);
  chk("CR : association écrite", crTient(d0.l + " — association tenue"));
  chk("CR : ne pas conclure",  crTient("ne pas conclure : " + d0.stop));
  d0.signes.slice(1).forEach(function(k){ clic("les", k, "anormal"); });
  chk("retirer les signes défait l'association",
      (associations().filter(function(a){ return a.d.k === d0.k; })[0] || {}).pris.length === 1);

  /* Négatifs */
  $("btnNegAll").click();
  chk("tous les négatifs posés", Object.keys(E.negatifs).length === NEGATIFS.length);
  clic("neg", NEGATIFS[0].k, "present");
  chk("négatif retourné en rouge", E.negatifs[NEGATIFS[0].k] === "present" &&
      document.querySelector('[data-act="neg"][data-k="' + NEGATIFS[0].k + '"][data-v="present"]').className.indexOf("no") >= 0);
  chk("CR : défaut écrit",     crTient("! " + NEGATIFS[0].ko));
  clic("neg", NEGATIFS[0].k, "absent");

  /* Compte rendu */
  clic("tech", TECHNIQUES[0].k);
  set("libre", "Bloc non parvenu.");
  chk("CR : en-tête dossier",  crTient("26P0123") && crTient("RM"));
  chk("CR : signe anormal",    crTient(l0.l + " — ANORMAL"));
  chk("CR : non explorés dits", crTient("Non explorés :"));
  chk("CR : technique demandée", crTient(TECHNIQUES[0].l));
  chk("CR : remarque libre",   crTient("Bloc non parvenu."));
  chk("CR : la micro ne nomme pas", crTient("La micro décrit ; la conclusion nomme."));

  /* Contrôles propres à l'organe */
  await testsOrgane(chk, clic, set, crTient, pause);

  /* Termes FOETO — seulement si la fiche en rattache */
  if (FOETO.sections.length){
    var f0 = FOETO.sections[0].termes[0].id;
    chk("FOETO : sections rendues", $("foeto").querySelectorAll(".sousTitre").length === FOETO.sections.length);
    clic("foeto", f0);
    chk("FOETO : terme coché",      E.foeto[f0] === true && $("tFoeto").textContent.indexOf("1/") === 0);
    chk("FOETO : CR le porte",      crTient("[" + f0 + "]"));
    chk("FOETO : exporté",          collecter().grille.foeto[f0] === true);
    set("rqFoeto", foetoLabel(f0).slice(0, 4));
    chk("FOETO : recherche",        $("sgFoeto").querySelectorAll("[data-pick]").length >= 1);
    $("sgFoeto").querySelector("[data-pick]").click();
    chk("FOETO : recherche vidée",  $("rqFoeto").value === "" && !$("sgFoeto").classList.contains("on"));
    chk("FOETO : id lisible",       /^FOETO:/.test(f0));
    clic("foeto", f0);
    Object.keys(E.foeto).forEach(function(id){ delete E.foeto[id]; }); peindre();
  }

  /* Enveloppe, persistance, relecture — l'organe a pu reposer ses propres signes */
  if (E.signes[l0.k] !== "anormal"){
    if (E.signes[l0.k]) clic("les", l0.k, E.signes[l0.k]);
    clic("les", l0.k, "anormal");
  }
  var snap = collecter();
  chk("enveloppe conforme",    snap.schema_version === SCHEMA && snap.module === MODULE &&
                               snap.module_version === VERSION && snap.dossier === "26P0123" &&
                               snap.organe === ORGANE && !!snap.exported_at);
  chk("version en entête",     $("ver").textContent === "v" + VERSION);
  chk("CR dans le JSON",       snap.compte_rendu.indexOf(TITRE_CR + " — grille de lecture") === 0);

  await putSaisie(snap);
  vider();
  chk("vider efface la grille", Object.keys(E.signes).length === 0);
  var relu = await getSaisie("26P0123");
  appliquer(relu);
  chk("IndexedDB restitue",    E.signes[l0.k] === "anormal" &&
                               $("sa").value === String(snap.terme_sa));

  await tx("readwrite", function(s){ return s.delete("26P0123"); });
  vider(); $("dossier").value = ""; $("operateur").value = ""; dossier = ""; await majDossier();
  chk("banc remis à zéro",     Object.keys(E.signes).length === 0 && $("secSignes").classList.contains("off"));
  await relire(snap);
  chk("relecture d'un JSON",   E.signes[l0.k] === "anormal" && dossier === "26P0123");
  var refus = false;
  try { await relire({module:"autopsie", grille:{}}); } catch(e){ refus = /module/.test(e.message); }
  chk("JSON d'un autre module refusé", refus);

  await tx("readwrite", function(s){ return s.delete("26P0123"); });
  vider(); $("dossier").value = ""; $("operateur").value = ""; dossier = ""; await majDossier();

  document.body.insertAdjacentHTML("afterbegin",
    '<pre style="background:' + (ko.length ? "#9C3A28" : "#0E6B62") + ';color:#fff;padding:14px;' +
    'margin:0;font:12px/1.5 ui-monospace,monospace;white-space:pre-wrap">' +
    (ko.length ? "ÉCHEC (" + ko.length + ") :\n  " + ko.join("\n  ") + "\n\n" : "") +
    "OK : " + ok.length + "/" + (ok.length + ko.length) + "</pre>");
}
</script>
</body>
</html>
"""

CONST = {k: re.compile(r'var %s\s*=\s*"([^"]+)"' % k) for k in ("ORGANE", "TITRE", "SOURCE")}


def fabriquer(organe):
    frag = (FRAGMENTS / (organe + ".js")).read_text(encoding="utf-8")
    vals = {}
    for k, r in CONST.items():
        m = r.search(frag)
        if not m:
            raise SystemExit("grilles/%s.js : « var %s » manquant" % (organe, k))
        vals[k] = m.group(1)
    if vals["ORGANE"] != organe:
        raise SystemExit("grilles/%s.js declare ORGANE=%s" % (organe, vals["ORGANE"]))

    page = SHELL
    for k, v in vals.items():
        page = page.replace("{{%s}}" % k, v)
    page = page.replace("{{ORGANE_JS}}", frag.rstrip())
    page = page.replace("{{FOETO_JS}}", bloc_foeto(organe))

    reste = re.findall(r"\{\{(\w+)\}\}", page)
    if reste:
        raise SystemExit("marqueurs non substitues : %s" % ", ".join(sorted(set(reste))))

    cible = ICI / ("grille_%s.html" % organe)
    cible.write_text(page, encoding="utf-8")
    print("%s — %d octets, %d essais" %
          (cible.name, len(page.encode()), len(re.findall(r"\bchk\(", page))))


if __name__ == "__main__":
    noms = sys.argv[1:] or sorted(p.stem for p in FRAGMENTS.glob("*.js"))
    if not noms:
        raise SystemExit(__doc__)
    for n in noms:
        fabriquer(n)
