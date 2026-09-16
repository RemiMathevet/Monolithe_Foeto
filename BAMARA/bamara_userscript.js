// ==UserScript==
// @name         MiniHub → BaMaRa Auto-Fill
// @namespace    minihub.bamara
// @version      1.0
// @description  Pré-remplit les formulaires BaMaRa depuis les données MiniHub
// @match        https://bamara.bndmr.fr/*
// @grant        GM_xmlhttpRequest
// @grant        GM_addStyle
// @grant        GM_getValue
// @grant        GM_setValue
// @connect      localhost
// @connect      127.0.0.1
// ==/UserScript==

(function() {
'use strict';

var MINIHUB_BASE = 'http://localhost:5050';
var _data = null;
var _caseId = null;
var _panel = null;

// ── Field mappings: BaMaRa selector → path in MiniHub JSON ──
// Each entry: { selector, path, transform? }
// selector = CSS selector OR label text to find the nearest input
// path = dot-notation into the bamara.json response
// transform = optional function to convert value

var FIELD_MAP = {
  identity: [
    { label: 'Nom de naissance',         path: 'identity.mother_name' },
    { label: 'Prénom',                   path: 'identity.mother_given_name' },
    { label: "Nom d'usage",             path: 'identity.mother_used_name' },
    { label: 'Sexe',                     path: 'identity.gender', type: 'select' },
    { label: 'Date de début de grossesse', path: '_computed.pregnancy_date' },
    { label: 'Grossesse multiple',       path: 'identity.is_multiple_pregnancy', type: 'boolean' },
    { label: 'Consentement',             path: 'identity.has_given_consent', type: 'boolean' },
    { label: 'Opposition',               path: 'identity.opposition', type: 'boolean' },
    { label: 'Pays',                     path: 'identity.residence_country_code' },
    { label: 'Consanguinité',            path: 'identity.inbreeding', type: 'select' },
  ],
  medicare: [
    { label: "Date d'inclusion",         path: '_computed.inclusion_date' },
    { label: 'Site',                     path: 'medicare.site_code' },
    { label: 'Médecin',                  path: 'medicare.care_provider_name' },
    { label: 'RPPS',                     path: 'medicare.care_provider_rpps' },
    { label: 'Labellisation',            path: 'medicare.is_label', type: 'boolean' },
  ],
  encounter: [
    { label: 'Date',                     path: '_computed.encounter_date' },
    { label: 'Contexte',                 path: 'encounter.context', type: 'select' },
    { label: 'Précision',               path: 'encounter.context_precision' },
    { label: 'Objectif',                 path: 'encounter.objectives', type: 'select' },
  ],
  condition: [
    { label: 'Statut',                   path: 'condition.diagnostic_status', type: 'select' },
    { label: 'Diagnostic prénatal',     path: 'condition.early_diagnosis_status', type: 'select' },
    { label: 'Orpha',                    path: 'condition.description_code' },
    { label: 'Hérédité',               path: 'condition.heredity', type: 'select' },
  ],
  pregnancy_end: [
    { label: 'Naissance vivante',        path: 'pregnancy_end.birth', type: 'boolean' },
    { label: "Type d'interruption",     path: 'pregnancy_end.termination_type', type: 'select' },
    { label: 'Moment',                   path: 'pregnancy_end.stp_type', type: 'select' },
    { label: 'Date de décès',           path: '_computed.death_date' },
    { label: 'Terme',                    path: 'pregnancy_end.term_week' },
    { label: 'Fœtopathologie',         path: 'pregnancy_end.is_foetopathology_done', type: 'boolean' },
  ],
};

// ── Helpers ──

function resolvePath(obj, path) {
  if (!obj || !path) return undefined;
  var parts = path.split('.');
  var val = obj;
  for (var i = 0; i < parts.length; i++) {
    if (val == null) return undefined;
    val = val[parts[i]];
  }
  return val;
}

function computeDerivedFields(data) {
  data._computed = {};
  var id = data.identity || {};
  if (id.pregnancy_date_year) {
    data._computed.pregnancy_date = formatDate(
      id.pregnancy_date_year, id.pregnancy_date_month, id.pregnancy_date_day
    );
  }
  var med = data.medicare || {};
  if (med.inclusion_date_year) {
    data._computed.inclusion_date = formatDate(
      med.inclusion_date_year, med.inclusion_date_month, med.inclusion_date_day
    );
  }
  var enc = data.encounter || {};
  if (enc.encounter_date_year) {
    data._computed.encounter_date = formatDate(
      enc.encounter_date_year, enc.encounter_date_month, enc.encounter_date_day
    );
  }
  var pe = data.pregnancy_end || {};
  if (pe.death_date_year) {
    data._computed.death_date = formatDate(
      pe.death_date_year, pe.death_date_month, pe.death_date_day
    );
  }
}

function formatDate(y, m, d) {
  if (!y) return null;
  return pad(d || 1) + '/' + pad(m || 1) + '/' + y;
}

function pad(n) { return n < 10 ? '0' + n : '' + n; }

function findFieldByLabel(labelText) {
  var labels = document.querySelectorAll('label, .label, .field-label, span[class*="label"]');
  for (var i = 0; i < labels.length; i++) {
    var txt = labels[i].textContent.trim().toLowerCase();
    if (txt.indexOf(labelText.toLowerCase()) >= 0) {
      var forId = labels[i].getAttribute('for');
      if (forId) {
        var el = document.getElementById(forId);
        if (el) return el;
      }
      var parent = labels[i].closest('.field, .form-group, .form-field, .row, div');
      if (parent) {
        var input = parent.querySelector('input, select, textarea');
        if (input) return input;
      }
      var next = labels[i].nextElementSibling;
      if (next && (next.tagName === 'INPUT' || next.tagName === 'SELECT' || next.tagName === 'TEXTAREA')) {
        return next;
      }
    }
  }
  return null;
}

function setFieldValue(el, value, type) {
  if (value == null || value === undefined) return false;
  var strVal = String(value);

  if (el.tagName === 'SELECT' || type === 'select') {
    var options = el.querySelectorAll('option');
    var matched = false;
    for (var i = 0; i < options.length; i++) {
      if (options[i].value === strVal ||
          options[i].textContent.trim().toLowerCase() === strVal.toLowerCase()) {
        el.value = options[i].value;
        matched = true;
        break;
      }
    }
    if (!matched) return false;
  } else if (type === 'boolean') {
    if (el.type === 'checkbox') {
      el.checked = !!value && value !== 'false' && value !== '0';
    } else {
      el.value = value ? 'true' : 'false';
    }
  } else {
    el.value = strVal;
  }

  el.dispatchEvent(new Event('input', { bubbles: true }));
  el.dispatchEvent(new Event('change', { bubbles: true }));
  el.style.outline = '2px solid #d97706';
  setTimeout(function() { el.style.outline = ''; }, 3000);
  return true;
}

// ── Data fetch ──

function fetchCaseData(query, callback) {
  var isNumericId = /^\d+$/.test(query);
  var url = isNumericId
    ? MINIHUB_BASE + '/cas/' + query + '/bamara.json'
    : MINIHUB_BASE + '/api/bamara/lookup?q=' + encodeURIComponent(query);

  GM_xmlhttpRequest({
    method: 'GET',
    url: url,
    onload: function(resp) {
      if (resp.status === 200) {
        try {
          var data = JSON.parse(resp.responseText);
          computeDerivedFields(data);
          callback(null, data);
        } catch(e) {
          callback('Erreur JSON: ' + e.message);
        }
      } else {
        var msg = 'Erreur HTTP ' + resp.status;
        try { msg = JSON.parse(resp.responseText).error || msg; } catch(e) {}
        callback(msg);
      }
    },
    onerror: function() {
      callback('MiniHub inaccessible (localhost:5050)');
    }
  });
}

// ── Auto-fill logic ──

function autoFillSection(sectionKey) {
  if (!_data) return { filled: 0, missed: 0, details: [] };
  var fields = FIELD_MAP[sectionKey] || [];
  var filled = 0, missed = 0, details = [];

  for (var i = 0; i < fields.length; i++) {
    var f = fields[i];
    var value = resolvePath(_data, f.path);
    if (value == null || value === '') {
      details.push({ label: f.label, status: 'empty' });
      continue;
    }
    var el = null;
    if (f.selector) {
      el = document.querySelector(f.selector);
    }
    if (!el && f.label) {
      el = findFieldByLabel(f.label);
    }
    if (el) {
      var ok = setFieldValue(el, value, f.type);
      if (ok) {
        filled++;
        details.push({ label: f.label, status: 'ok', value: value });
      } else {
        missed++;
        details.push({ label: f.label, status: 'no-match', value: value });
      }
    } else {
      missed++;
      details.push({ label: f.label, status: 'not-found', value: value });
    }
  }
  return { filled: filled, missed: missed, details: details };
}

function autoFillAll() {
  if (!_data) return;
  var total = { filled: 0, missed: 0 };
  var sections = Object.keys(FIELD_MAP);
  for (var i = 0; i < sections.length; i++) {
    var r = autoFillSection(sections[i]);
    total.filled += r.filled;
    total.missed += r.missed;
  }
  updateStatus(total.filled + ' champs remplis, ' + total.missed + ' non trouves');
}

function autoFillHPO() {
  if (!_data || !_data.hpo_terms || _data.hpo_terms.length === 0) {
    updateStatus('Aucun terme HPO');
    return;
  }
  var codes = _data.hpo_terms.map(function(t) { return t.code; });
  var searchInputs = document.querySelectorAll(
    'input[placeholder*="HPO"], input[placeholder*="hpo"], input[placeholder*="phénotype"], input[type="search"]'
  );
  if (searchInputs.length > 0) {
    var msg = codes.length + ' termes HPO a saisir:\n';
    for (var i = 0; i < _data.hpo_terms.length; i++) {
      msg += '  ' + _data.hpo_terms[i].code + ' — ' + _data.hpo_terms[i].label + '\n';
    }
    updateStatus(msg);
  } else {
    var list = codes.join(', ');
    navigator.clipboard.writeText(list).then(function() {
      updateStatus(codes.length + ' codes HPO copies: ' + list);
    });
  }
}

// ── UI Panel ──

function createPanel() {
  var div = document.createElement('div');
  div.id = 'minihub-panel';
  div.innerHTML = [
    '<div class="mh-header">',
    '  <strong>MiniHub</strong>',
    '  <button id="mh-toggle" title="Reduire">—</button>',
    '</div>',
    '<div class="mh-body">',
    '  <div class="mh-row">',
    '    <input id="mh-case-id" type="text" placeholder="FP-2026-001" value="' + (_caseId || '') + '">',
    '    <button id="mh-load">Charger</button>',
    '  </div>',
    '  <div id="mh-status" class="mh-status">Entrez le numero de dossier (ex: FP-2026-001)</div>',
    '  <div class="mh-actions" style="display:none" id="mh-actions">',
    '    <button id="mh-fill-all" class="mh-btn-fill">Remplir tout</button>',
    '    <div class="mh-section-btns">',
    '      <button data-section="identity">Identite</button>',
    '      <button data-section="medicare">PeC</button>',
    '      <button data-section="encounter">Activite</button>',
    '      <button data-section="condition">Diagnostic</button>',
    '      <button data-section="pregnancy_end">Fin grossesse</button>',
    '      <button id="mh-hpo">HPO</button>',
    '    </div>',
    '  </div>',
    '  <div id="mh-case-info" class="mh-info"></div>',
    '</div>',
  ].join('\n');

  document.body.appendChild(div);
  _panel = div;

  document.getElementById('mh-load').addEventListener('click', loadCase);
  document.getElementById('mh-case-id').addEventListener('keydown', function(e) {
    if (e.key === 'Enter') loadCase();
  });
  document.getElementById('mh-fill-all').addEventListener('click', autoFillAll);
  document.getElementById('mh-hpo').addEventListener('click', autoFillHPO);
  document.getElementById('mh-toggle').addEventListener('click', togglePanel);

  var sectionBtns = div.querySelectorAll('[data-section]');
  for (var i = 0; i < sectionBtns.length; i++) {
    sectionBtns[i].addEventListener('click', function() {
      var r = autoFillSection(this.getAttribute('data-section'));
      updateStatus(r.filled + '/' + (r.filled + r.missed) + ' champs remplis');
    });
  }

  var savedId = GM_getValue('minihub_case_id', '');
  if (savedId) {
    document.getElementById('mh-case-id').value = savedId;
  }
}

function togglePanel() {
  var body = _panel.querySelector('.mh-body');
  var btn = document.getElementById('mh-toggle');
  if (body.style.display === 'none') {
    body.style.display = '';
    btn.textContent = '—';
  } else {
    body.style.display = 'none';
    btn.textContent = '+';
  }
}

function loadCase() {
  var id = document.getElementById('mh-case-id').value;
  if (!id) { updateStatus('Entrez un numero de dossier'); return; }
  _caseId = id;
  GM_setValue('minihub_case_id', id);
  updateStatus('Chargement du cas ' + id + '...');

  fetchCaseData(id, function(err, data) {
    if (err) {
      updateStatus('Erreur: ' + err);
      return;
    }
    _data = data;
    var hub = data.hub_case || {};
    var ident = data.identity || {};
    document.getElementById('mh-actions').style.display = '';
    document.getElementById('mh-case-info').innerHTML =
      '<strong>' + (hub.hub_case_number || 'Cas ' + id) + '</strong><br>' +
      (ident.mother_name || '') + ' ' + (ident.mother_given_name || '') + '<br>' +
      (hub.type_prelevement || '') + ' — ' + (hub.indication_examen || '') + '<br>' +
      (data.hpo_terms ? data.hpo_terms.length : 0) + ' termes HPO';
    updateStatus('Cas charge. Cliquez sur une section pour remplir.');
  });
}

function updateStatus(msg) {
  var el = document.getElementById('mh-status');
  if (el) el.textContent = msg;
}

// ── Styles ──

GM_addStyle([
  '#minihub-panel {',
  '  position: fixed; top: 10px; right: 10px; z-index: 99999;',
  '  width: 280px; background: #fff; border: 2px solid #d97706;',
  '  border-radius: 10px; box-shadow: 0 4px 20px rgba(0,0,0,0.15);',
  '  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;',
  '  font-size: 13px; color: #1a1a2e;',
  '}',
  '.mh-header {',
  '  display: flex; justify-content: space-between; align-items: center;',
  '  padding: 8px 12px; background: #d97706; color: #fff;',
  '  border-radius: 8px 8px 0 0; cursor: move;',
  '}',
  '.mh-header strong { font-size: 14px; }',
  '#mh-toggle {',
  '  background: none; border: none; color: #fff; font-size: 16px;',
  '  cursor: pointer; padding: 0 4px; font-weight: bold;',
  '}',
  '.mh-body { padding: 10px 12px; }',
  '.mh-row { display: flex; gap: 6px; margin-bottom: 8px; }',
  '#mh-case-id {',
  '  flex: 1; padding: 5px 8px; border: 1px solid #ddd; border-radius: 6px;',
  '  font-size: 13px;',
  '}',
  '#mh-load {',
  '  padding: 5px 12px; background: #d97706; color: #fff; border: none;',
  '  border-radius: 6px; cursor: pointer; font-weight: 600; font-size: 12px;',
  '}',
  '#mh-load:hover { background: #b45309; }',
  '.mh-status {',
  '  font-size: 11px; color: #666; padding: 4px 0; white-space: pre-wrap;',
  '  max-height: 80px; overflow-y: auto;',
  '}',
  '.mh-actions { margin-top: 8px; }',
  '.mh-btn-fill {',
  '  width: 100%; padding: 7px; background: #16a34a; color: #fff; border: none;',
  '  border-radius: 6px; cursor: pointer; font-weight: 600; font-size: 13px;',
  '  margin-bottom: 6px;',
  '}',
  '.mh-btn-fill:hover { background: #15803d; }',
  '.mh-section-btns { display: flex; flex-wrap: wrap; gap: 4px; }',
  '.mh-section-btns button {',
  '  padding: 3px 8px; font-size: 11px; border: 1px solid #d97706;',
  '  background: #fff; color: #d97706; border-radius: 4px; cursor: pointer;',
  '  font-weight: 500;',
  '}',
  '.mh-section-btns button:hover { background: #fef3c7; }',
  '.mh-info {',
  '  margin-top: 8px; padding: 6px 8px; background: #f9fafb;',
  '  border-radius: 6px; font-size: 11px; line-height: 1.4;',
  '}',
].join('\n'));

// ── Make panel draggable ──

function makeDraggable(panel) {
  var header = panel.querySelector('.mh-header');
  var isDragging = false, startX, startY, startLeft, startTop;
  header.addEventListener('mousedown', function(e) {
    isDragging = true;
    startX = e.clientX;
    startY = e.clientY;
    var rect = panel.getBoundingClientRect();
    startLeft = rect.left;
    startTop = rect.top;
    e.preventDefault();
  });
  document.addEventListener('mousemove', function(e) {
    if (!isDragging) return;
    panel.style.left = (startLeft + e.clientX - startX) + 'px';
    panel.style.top = (startTop + e.clientY - startY) + 'px';
    panel.style.right = 'auto';
  });
  document.addEventListener('mouseup', function() { isDragging = false; });
}

// ── Init ──

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', function() {
    createPanel();
    makeDraggable(_panel);
  });
} else {
  createPanel();
  makeDraggable(_panel);
}

})();
