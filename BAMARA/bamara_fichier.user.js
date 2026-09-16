// ==UserScript==
// @name         Hub Light → BaMaRa, par fichier
// @namespace    monolithe_foeto.bamara
// @version      2.0
// @description  Pré-remplit les formulaires BaMaRa depuis des <dossier>_bamara.json exportés par le hub — un dossier après l'autre, chaque page validée par l'opérateur
// @match        https://bamara.bndmr.fr/*
// @grant        GM_addStyle
// @grant        GM_getValue
// @grant        GM_setValue
// @license      CC-BY-NC-SA-4.0
// ==/UserScript==

/* SPDX-License-Identifier: CC-BY-NC-SA-4.0 | Hub Light | Monolithe_Foeto

   Ce script ne connaît pas le hub. Il n'a ni @connect ni GM_xmlhttpRequest :
   les documents lui arrivent par un fichier que l'opérateur glisse dans son
   panneau (ou un dossier entier, choisi d'un clic). La file de dossiers est
   gardée dans le stockage du script, donc elle survit aux changements de page
   de BaMaRa — et c'est l'opérateur qui navigue : le script remplit la page où
   il se trouve quand on le lui demande, jamais avant, jamais ailleurs.

   Transposé de bamara_userscript.js (MiniHub, canal HTTP) : même table de
   correspondance libellé → chemin dans le document, même remplissage. */

(function () {
  'use strict';

  // ── Libellé BaMaRa → chemin dans le document du hub (bamara.py::preparer) ──
  var FIELD_MAP = {
    identity: [
      { label: 'Nom de naissance',           path: 'identity.mother_name' },
      { label: 'Prénom',                     path: 'identity.mother_given_name' },
      { label: "Nom d'usage",                path: 'identity.mother_used_name' },
      { label: 'Sexe',                       path: 'identity.gender', type: 'select' },
      { label: 'Date de début de grossesse', path: '_computed.pregnancy_date' },
      { label: 'Grossesse multiple',         path: 'identity.is_multiple_pregnancy', type: 'boolean' },
      { label: 'Consentement',               path: 'identity.has_given_consent', type: 'boolean' },
      { label: 'Opposition',                 path: 'identity.opposition', type: 'boolean' },
      { label: 'Pays',                       path: 'identity.residence_country_code' },
      { label: 'Consanguinité',              path: 'identity.inbreeding', type: 'select' },
      { label: 'INS',                        path: 'identity.ins' },
      { label: 'IPP',                        path: 'identity.ipp' },
    ],
    medicare: [
      { label: "Date d'inclusion",           path: '_computed.inclusion_date' },
      { label: 'Site',                       path: 'medicare.site_code' },
      { label: 'Médecin',                    path: 'medicare.care_provider_name' },
      { label: 'RPPS',                       path: 'medicare.care_provider_rpps' },
      { label: 'Labellisation',              path: 'medicare.is_label', type: 'boolean' },
    ],
    encounter: [
      { label: 'Date',                       path: '_computed.encounter_date' },
      { label: 'Contexte',                   path: 'encounter.context', type: 'select' },
      { label: 'Précision',                  path: 'encounter.context_precision' },
      { label: 'Objectif',                   path: 'encounter.objectives', type: 'select' },
    ],
    condition: [
      { label: 'Statut',                     path: 'condition.diagnostic_status', type: 'select' },
      { label: 'Diagnostic prénatal',        path: 'condition.early_diagnosis_status', type: 'select' },
      { label: 'Orpha',                      path: 'condition.description_code' },
      { label: 'Hérédité',                   path: 'condition.heredity', type: 'select' },
    ],
    pregnancy_end: [
      { label: 'Naissance vivante',          path: 'pregnancy_end.birth', type: 'boolean' },
      { label: "Type d'interruption",        path: 'pregnancy_end.termination_type', type: 'select' },
      { label: 'Moment',                     path: 'pregnancy_end.stp_type', type: 'select' },
      { label: 'Date de décès',              path: '_computed.death_date' },
      { label: 'Terme',                      path: 'pregnancy_end.term_week' },
      { label: 'Fœtopathologie',             path: 'pregnancy_end.is_foetopathology_done', type: 'boolean' },
    ],
  };
  var SECTIONS = [['identity', 'Identité'], ['medicare', 'PeC'], ['encounter', 'Activité'],
                  ['condition', 'Diagnostic'], ['pregnancy_end', 'Fin de grossesse']];

  // ── La file : gardée par Tampermonkey, donc d'une page BaMaRa à l'autre ──
  var CLE = 'hublight_file';
  var file = GM_getValue(CLE, null) || { docs: [], i: 0 };

  function sauver() { GM_setValue(CLE, file); }
  function courant() { return file.docs[file.i] || null; }

  // ── Lecture des fichiers déposés ──
  function nomDossier(doc, nomFichier) {
    return (doc.hub_case && doc.hub_case.hub_case_number) ||
           (nomFichier || '').replace(/_bamara\.json$/i, '') || '?';
  }
  function ajouterFichiers(liste) {
    var fichiers = Array.prototype.filter.call(liste, function (f) { return /\.json$/i.test(f.name); });
    if (!fichiers.length) { statut('Aucun .json parmi ce qui a été déposé.'); return; }
    var lus = 0, refus = [];
    fichiers.forEach(function (f) {
      var r = new FileReader();
      r.onload = function () {
        try {
          var doc = JSON.parse(r.result);
          if (!doc.identity || !doc.pregnancy_end) throw new Error("pas un document BaMaRa du hub");
          calculerDates(doc);
          var n = nomDossier(doc, f.name);
          var deja = file.docs.findIndex(function (d) { return d.n === n; });
          var entree = { n: n, fichier: f.name, doc: doc, fait: false };
          if (deja >= 0) file.docs[deja] = entree; else file.docs.push(entree);
        } catch (e) { refus.push(f.name + ' — ' + e.message); }
        if (++lus === fichiers.length) {
          file.docs.sort(function (a, b) { return a.n < b.n ? -1 : a.n > b.n ? 1 : 0; });
          if (!courant()) file.i = 0;
          sauver(); rendre();
          statut(file.docs.length + ' dossier(s) dans la file.' +
                 (refus.length ? '\nÉcartés : ' + refus.join(' ; ') : ''));
        }
      };
      r.readAsText(f);
    });
  }

  // ── Dates BaMaRa : year/month/day → JJ/MM/AAAA ──
  function pad(n) { return n < 10 ? '0' + n : '' + n; }
  function dateDe(o, prefixe) {
    var y = o && o[prefixe + '_year'];
    if (!y) return null;
    return pad(o[prefixe + '_day'] || 1) + '/' + pad(o[prefixe + '_month'] || 1) + '/' + y;
  }
  function calculerDates(doc) {
    doc._computed = {
      pregnancy_date: dateDe(doc.identity, 'pregnancy_date'),
      inclusion_date: dateDe(doc.medicare, 'inclusion_date'),
      encounter_date: dateDe(doc.encounter, 'encounter_date'),
      death_date: dateDe(doc.pregnancy_end, 'death_date'),
    };
  }

  // ── Remplissage de la page où l'on est ──
  function valeur(obj, chemin) {
    return chemin.split('.').reduce(function (v, k) { return v == null ? undefined : v[k]; }, obj);
  }
  function champParLibelle(texte) {
    /* Libellé exact d'abord, puis qui commence par, puis qui contient : « Date »
       ne doit pas attraper « Date de début de grossesse » quand la page a les
       deux. Le texte du libellé est comparé sans son astérisque ni ses deux-points. */
    var labels = document.querySelectorAll('label, .label, .field-label, span[class*="label"]');
    var voulu = texte.toLowerCase();
    var propre = function (l) { return l.textContent.replace(/[*:]/g, '').trim().toLowerCase(); };
    var essais = [function (t) { return t === voulu; }];
    if (voulu.length > 5) {              // « Date », « Site », « Terme » : à l'exact seulement
      essais.push(function (t) { return t.indexOf(voulu) === 0; });
      essais.push(function (t) { return t.indexOf(voulu) >= 0; });
    }
    for (var e = 0; e < essais.length; e++) {
      for (var i = 0; i < labels.length; i++) {
        if (!essais[e](propre(labels[i]))) continue;
        var forId = labels[i].getAttribute('for');
        if (forId && document.getElementById(forId)) return document.getElementById(forId);
        var parent = labels[i].closest('.field, .form-group, .form-field, .row, div');
        var input = parent && parent.querySelector('input, select, textarea');
        if (input) return input;
        var next = labels[i].nextElementSibling;
        if (next && /^(INPUT|SELECT|TEXTAREA)$/.test(next.tagName)) return next;
      }
    }
    return null;
  }
  function poser(el, v, type) {
    if (v == null || v === '') return false;
    var s = String(v);
    if (el.tagName === 'SELECT' || type === 'select') {
      var ok = false;
      Array.prototype.forEach.call(el.querySelectorAll('option'), function (o) {
        if (!ok && (o.value === s || o.textContent.trim().toLowerCase() === s.toLowerCase())) { el.value = o.value; ok = true; }
      });
      if (!ok) return false;
    } else if (type === 'boolean') {
      if (el.type === 'checkbox') el.checked = !!v && v !== 'false' && v !== '0';
      else el.value = v ? 'true' : 'false';
    } else el.value = s;
    el.dispatchEvent(new Event('input', { bubbles: true }));
    el.dispatchEvent(new Event('change', { bubbles: true }));
    el.style.outline = '2px solid #d97706';
    setTimeout(function () { el.style.outline = ''; }, 3000);
    return true;
  }
  function remplir(sections) {
    var c = courant();
    if (!c) { statut('File vide.'); return; }
    var poses = 0, absents = [], sans = [];
    sections.forEach(function (sec) {
      FIELD_MAP[sec].forEach(function (f) {
        var v = valeur(c.doc, f.path);
        if (v == null || v === '') { sans.push(f.label); return; }
        var el = champParLibelle(f.label);
        if (!el) { absents.push(f.label); return; }
        if (poser(el, v, f.type)) poses++; else absents.push(f.label + ' (valeur « ' + v + ' » sans option)');
      });
    });
    statut(poses + ' champ(s) posé(s) sur cette page.' +
           (absents.length ? '\nPas sur cette page : ' + absents.join(', ') : '') +
           (sans.length ? '\nVides dans le document : ' + sans.join(', ') : ''));
  }
  function hpo() {
    var c = courant();
    var termes = (c && c.doc.hpo_terms) || [];
    if (!termes.length) { statut('Aucun terme HPO dans ce document.'); return; }
    var codes = termes.map(function (t) { return t.code; }).join(', ');
    navigator.clipboard.writeText(codes).then(function () {
      statut(termes.length + ' code(s) HPO copié(s) : ' + codes + '\n' +
             termes.map(function (t) { return t.code + ' — ' + t.label; }).join('\n'));
    });
  }

  // ── Le panneau ──
  var panneau;
  function rendre() {
    var c = courant(), n = file.docs.length;
    var id = c ? c.doc.identity : {};
    var pe = c ? c.doc.pregnancy_end : {};
    panneau.querySelector('.hl-corps').innerHTML = !n
      ? '<div class="hl-drop" id="hl-drop">Glisser ici les <b>&lt;dossier&gt;_bamara.json</b> du lot,<br>ou choisir le dossier décompressé.</div>' +
        '<div class="hl-row"><button id="hl-dossier">Choisir un dossier…</button><button id="hl-fichiers">Des fichiers…</button></div>'
      : '<div class="hl-cas">' +
          '<div class="hl-pos">' + (file.i + 1) + ' / ' + n + (c.fait ? ' · fait' : '') + '</div>' +
          '<strong>' + esc(c.n) + '</strong><br>' +
          esc(id.mother_name || '') + ' ' + esc(id.mother_given_name || '') +
          (pe.term_week ? ' · ' + pe.term_week + ' SA' : '') +
          (c.doc.hub_case && c.doc.hub_case.type_issue ? ' · ' + esc(c.doc.hub_case.type_issue) : '') +
          ((c.doc._manques || []).length ? '<div class="hl-manques">À taper soi-même : ' +
            c.doc._manques.map(function (m) { return (m.bloquant ? '<b>' : '') + esc(m.libelle) + (m.bloquant ? '</b>' : ''); }).join(', ') + '</div>' : '') +
        '</div>' +
        '<button id="hl-remplir" class="hl-plein">Remplir cette page</button>' +
        '<div class="hl-sections">' + SECTIONS.map(function (s) {
          return '<button data-sec="' + s[0] + '">' + s[1] + '</button>'; }).join('') +
          '<button id="hl-hpo">HPO</button></div>' +
        '<div class="hl-row hl-nav">' +
          '<button id="hl-prec"' + (file.i ? '' : ' disabled') + '>◀</button>' +
          '<button id="hl-fait" class="hl-suivant">Fait, dossier suivant ▶</button>' +
        '</div>' +
        '<div class="hl-row"><button id="hl-fichiers" class="hl-mini">Ajouter…</button>' +
        '<button id="hl-vider" class="hl-mini">Vider la file</button></div>';
    var corps = panneau.querySelector('.hl-corps');
    var pick = panneau.querySelector('#hl-pick'), pickDir = panneau.querySelector('#hl-pickdir');
    var b;
    if ((b = corps.querySelector('#hl-fichiers'))) b.onclick = function () { pick.click(); };
    if ((b = corps.querySelector('#hl-dossier'))) b.onclick = function () { pickDir.click(); };
    var zd = corps.querySelector('#hl-drop');
    if (zd) {
      ['dragenter', 'dragover'].forEach(function (ev) { zd.addEventListener(ev, function (e) { e.preventDefault(); zd.classList.add('on'); }); });
      ['dragleave', 'drop'].forEach(function (ev) { zd.addEventListener(ev, function (e) { e.preventDefault(); zd.classList.remove('on'); }); });
      zd.addEventListener('drop', function (e) { ajouterFichiers(e.dataTransfer.files); });
    }
    if ((b = corps.querySelector('#hl-remplir'))) b.onclick = function () { remplir(Object.keys(FIELD_MAP)); };
    Array.prototype.forEach.call(corps.querySelectorAll('[data-sec]'), function (x) {
      x.onclick = function () { remplir([x.dataset.sec]); };
    });
    if ((b = corps.querySelector('#hl-hpo'))) b.onclick = hpo;
    if ((b = corps.querySelector('#hl-prec'))) b.onclick = function () { file.i--; sauver(); rendre(); statut(''); };
    if ((b = corps.querySelector('#hl-fait'))) b.onclick = function () {
      file.docs[file.i].fait = true;
      if (file.i + 1 < n) { file.i++; sauver(); rendre(); statut('Dossier suivant. Ouvrir un nouveau patient dans BaMaRa, puis « Remplir ».'); }
      else { sauver(); rendre(); statut('Dernier dossier du lot marqué fait. « Vider la file » quand tout est déposé.'); }
    };
    if ((b = corps.querySelector('#hl-vider'))) b.onclick = function () {
      if (!confirm('Vider la file (' + n + ' dossier(s)) ?')) return;
      file = { docs: [], i: 0 }; sauver(); rendre(); statut('');
    };
  }
  function esc(s) { var d = document.createElement('div'); d.textContent = s == null ? '' : s; return d.innerHTML; }
  function statut(m) { panneau.querySelector('.hl-statut').textContent = m; }

  function creerPanneau() {
    panneau = document.createElement('div');
    panneau.id = 'hublight-panel';
    panneau.innerHTML =
      '<div class="hl-tete"><strong>Hub Light → BaMaRa</strong><button id="hl-toggle" title="Réduire">—</button></div>' +
      '<div class="hl-body"><div class="hl-corps"></div><div class="hl-statut"></div></div>' +
      '<input type="file" id="hl-pick" accept=".json" multiple hidden>' +
      '<input type="file" id="hl-pickdir" webkitdirectory hidden>';
    document.body.appendChild(panneau);
    panneau.querySelector('#hl-pick').addEventListener('change', function () { ajouterFichiers(this.files); this.value = ''; });
    panneau.querySelector('#hl-pickdir').addEventListener('change', function () { ajouterFichiers(this.files); this.value = ''; });
    panneau.querySelector('#hl-toggle').onclick = function () {
      var b = panneau.querySelector('.hl-body'); b.hidden = !b.hidden; this.textContent = b.hidden ? '+' : '—';
    };
    // déplaçable par sa tête
    var tete = panneau.querySelector('.hl-tete'), dx, dy, drag = false;
    tete.addEventListener('mousedown', function (e) { drag = true; var r = panneau.getBoundingClientRect(); dx = e.clientX - r.left; dy = e.clientY - r.top; e.preventDefault(); });
    document.addEventListener('mousemove', function (e) { if (!drag) return; panneau.style.left = (e.clientX - dx) + 'px'; panneau.style.top = (e.clientY - dy) + 'px'; panneau.style.right = 'auto'; });
    document.addEventListener('mouseup', function () { drag = false; });
    rendre();
  }

  GM_addStyle(
    '#hublight-panel{position:fixed;top:10px;right:10px;z-index:99999;width:300px;background:#fff;border:2px solid #0E6B62;border-radius:8px;box-shadow:0 4px 20px rgba(0,0,0,.15);font-family:system-ui,-apple-system,"Segoe UI",sans-serif;font-size:13px;color:#161D1C}' +
    '.hl-tete{display:flex;justify-content:space-between;align-items:center;padding:8px 12px;background:#0E6B62;color:#fff;border-radius:6px 6px 0 0;cursor:move}' +
    '#hl-toggle{background:none;border:0;color:#fff;font-size:16px;cursor:pointer;font-weight:bold}' +
    '.hl-body{padding:10px 12px}' +
    '.hl-drop{border:1px dashed #CBD2D0;border-radius:4px;padding:18px 10px;text-align:center;color:#5A6462;margin-bottom:8px}' +
    '.hl-drop.on{border-color:#0E6B62;background:#E2EFEC;color:#0E6B62}' +
    '.hl-row{display:flex;gap:6px;margin-top:6px}.hl-row button{flex:1}' +
    '#hublight-panel button{padding:6px 8px;border:1px solid #0E6B62;background:#fff;color:#0E6B62;border-radius:4px;cursor:pointer;font-size:12px;font-family:inherit}' +
    '#hublight-panel button:hover{background:#E2EFEC}#hublight-panel button[disabled]{opacity:.4;cursor:default}' +
    '.hl-plein{width:100%;background:#0E6B62!important;color:#fff!important;font-weight:600;margin:8px 0 6px;font-size:13px!important}' +
    '.hl-suivant{background:#0E6B62!important;color:#fff!important;font-weight:600}' +
    '.hl-sections{display:flex;flex-wrap:wrap;gap:4px}.hl-sections button{padding:3px 8px;font-size:11px}' +
    '.hl-mini{font-size:11px!important;padding:3px 8px!important;border-color:#CBD2D0!important;color:#5A6462!important}' +
    '.hl-cas{background:#F4F6F5;border-radius:4px;padding:8px 10px;line-height:1.45}' +
    '.hl-manques{margin-top:6px;font-size:11px;color:#8A6A18;border-top:1px dashed #CBD2D0;padding-top:5px}' +
    '.hl-pos{font-family:ui-monospace,Menlo,monospace;font-size:11px;letter-spacing:.08em;color:#0E6B62;text-transform:uppercase}' +
    '.hl-statut{font-size:11px;color:#5A6462;padding-top:6px;white-space:pre-wrap;max-height:120px;overflow-y:auto}'
  );

  if (document.body) creerPanneau(); else document.addEventListener('DOMContentLoaded', creerPanneau);
})();
