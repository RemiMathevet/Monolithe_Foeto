// SPDX-License-Identifier: CC-BY-NC-SA-4.0 | Hub Light | Monolithe_Foeto
// Comparateur de syndromes — vue « Comparer » de l'onglet Biblio.
// Lit le paquet data_hub servi sous /biblio/ : akinator.json (maladies × signes
// avec pénétrance, hiérarchie HPO), familles.json (familles, parenté par paire),
// genes.json (v2). Aucun calcul serveur : ensembles, parcours d'arbre, SVG.
// Attend dans la page un conteneur #comparer.
(function () {
  'use strict';
  var COULEURS = ['#0E6B62', '#9C3A28', '#8A6A18', '#3B5BA5'];
  var PROF = 3;                       // parenté HPO : jusqu'à 3 niveaux (cousins)
  var MAX = 4;
  var D = null;                       // données chargées une fois
  var DENDRO_IDS = [];                // ids du dernier dendrogramme, pour retrouver une branche cliquée

  function esc(s) { var d = document.createElement('div'); d.textContent = s == null ? '' : s; return d.innerHTML; }
  function pct(p) { return Math.round(p * 100) + ' %'; }
  function norm(s) { return String(s || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, ''); }

  // ── Chargement ─────────────────────────────────────────────────────────
  function charger() {
    if (D) return Promise.resolve(D);
    return Promise.all([
      fetch('/biblio/akinator.json').then(function (r) { return r.json(); }),
      fetch('/biblio/familles.json').then(function (r) { return r.json(); }),
      fetch('/biblio/genes.json').then(function (r) { return r.ok ? r.json() : null; })
    ]).then(function (x) {
      var ak = x[0], fam = x[1], gn = x[2];
      var dis = {};
      ak.diseases.forEach(function (d) {
        var m = {};
        d.phenotypes.forEach(function (p) { m[p.hpo_id] = p.penetrance; });
        dis[d.disease_id] = { id: d.disease_id, nom: d.disease_name, en: d.name_en, cat: d.category, signes: m };
      });
      var enfants = {};
      Object.keys(ak.hpo_parents).forEach(function (h) {
        ak.hpo_parents[h].forEach(function (p) { (enfants[p] = enfants[p] || []).push(h); });
      });
      // ORPHA → entité de famille (pour la parenté par paire et l'appartenance)
      var entite = {}, familleDe = {}, parente = {};
      fam.familles.forEach(function (f) {
        f.membres.forEach(function (m) {
          if (m.orpha) { var o = String(m.orpha).indexOf('ORPHA:') === 0 ? m.orpha : 'ORPHA:' + m.orpha;
            entite[o] = m.id; (familleDe[o] = familleDe[o] || []).push(f); }
        });
        (f.parente || []).forEach(function (p) { parente[p.a + '|' + p.b] = p; parente[p.b + '|' + p.a] = p; });
      });
      D = { termes: ak.hpo_terms, parents: ak.hpo_parents, enfants: enfants, dis: dis,
            familles: fam.familles, entite: entite, familleDe: familleDe, parente: parente,
            genes: gn, meta: ak._meta };
      return D;
    });
  }
  function nomSigne(h) { var t = D.termes[h]; return t ? (t.name_fr || t.name) : h; }
  function catSigne(h) { var t = D.termes[h]; return t ? (t.type === 'foeto' ? 'FOETO · ' + (t.category || '') : (t.category || '—')) : '—'; }

  // ── Parenté HPO ──────────────────────────────────────────────────────────
  var _voisins = {};
  function voisins(h) {               // ancêtres et descendants jusqu'à PROF, avec la distance
    if (_voisins[h]) return _voisins[h];
    var out = {}, front = [h]; out[h] = 0;
    for (var d = 1; d <= PROF; d++) {
      var next = [];
      front.forEach(function (n) {
        (D.parents[n] || []).concat(D.enfants[n] || []).forEach(function (v) {
          if (out[v] === undefined) { out[v] = d; next.push(v); }
        });
      });
      front = next;
    }
    return (_voisins[h] = out);
  }

  // ── Sélection ────────────────────────────────────────────────────────────
  var sel = [];                       // ids de maladies, dans l'ordre
  function ajouter(id) { if (D.dis[id] && sel.indexOf(id) < 0 && sel.length < MAX) { sel.push(id); rendre(); } }
  function retirer(id) { sel = sel.filter(function (x) { return x !== id; }); rendre(); }

  function chercher(q) {
    q = norm(q.trim());
    if (q.length < 2) return [];
    var out = [], gn = D.genes && D.genes.par_gene;
    if (gn) Object.keys(gn).forEach(function (g) {
      if (norm(g).indexOf(q) === 0) gn[g].forEach(function (id) {
        if (D.dis[id]) out.push({ id: id, via: g });
      });
    });
    Object.keys(D.dis).forEach(function (id) {
      var d = D.dis[id];
      if (norm(id).indexOf(q) >= 0 || norm(d.nom).indexOf(q) >= 0 || norm(d.en).indexOf(q) >= 0) out.push({ id: id });
    });
    var vus = {};
    return out.filter(function (x) { if (vus[x.id]) return false; vus[x.id] = 1; return true; }).slice(0, 12);
  }

  // ── Les ensembles ────────────────────────────────────────────────────────
  function analyser() {
    var n = sel.length, tous = {};
    sel.forEach(function (id, i) { Object.keys(D.dis[id].signes).forEach(function (h) { (tous[h] = tous[h] || []).push(i); }); });
    var lignes = [];
    Object.keys(tous).forEach(function (h) {
      var chez = tous[h], statut, cousins = [];
      if (chez.length === n) statut = 'commun';
      else if (chez.length > 1) statut = 'partage';
      else {
        // propre à un seul : un autre a-t-il un parent proche de ce signe ?
        var v = voisins(h);
        sel.forEach(function (id, i) {
          if (chez.indexOf(i) >= 0) return;
          var meilleur = null;
          Object.keys(D.dis[id].signes).forEach(function (k) {
            if (v[k] !== undefined && v[k] > 0 && (!meilleur || v[k] < meilleur.d)) meilleur = { i: i, h: k, d: v[k] };
          });
          if (meilleur) cousins.push(meilleur);
        });
        statut = cousins.length ? 'cousin' : 'propre';
      }
      lignes.push({ h: h, chez: chez, statut: statut, cousins: cousins,
                    pen: sel.map(function (id) { return D.dis[id].signes[h]; }) });
    });
    lignes.sort(function (a, b) {
      var o = { commun: 0, partage: 1, cousin: 2, propre: 3 };
      return (o[a.statut] - o[b.statut]) || catSigne(a.h).localeCompare(catSigne(b.h)) || nomSigne(a.h).localeCompare(nomSigne(b.h));
    });
    return lignes;
  }

  // ── Boules (2 ou 3 maladies) ─────────────────────────────────────────────
  function boules(lignes) {
    var n = sel.length;
    if (n < 2) return '';
    var compte = {};
    lignes.forEach(function (l) { var k = l.chez.join(','); compte[k] = (compte[k] || 0) + 1; });
    var tailles = sel.map(function (id) { return Object.keys(D.dis[id].signes).length; });
    if (n === 4) {
      return '<div class="cmp-bloc"><h4>Recouvrements</h4><table><tbody>' +
        Object.keys(compte).sort(function (a, b) { return b.split(',').length - a.split(',').length || compte[b] - compte[a]; })
        .map(function (k) { return '<tr><td>' + k.split(',').map(function (i) { return '<span class="cmp-pt" style="background:' + COULEURS[i] + '"></span>'; }).join('') +
              ' ' + esc(k.split(',').map(function (i) { return D.dis[sel[i]].nom; }).join(' ∩ ')) + '</td><td class="num">' + compte[k] + '</td></tr>'; }).join('') +
        '</tbody></table></div>';
    }
    var W = 460, H = n === 2 ? 250 : 330;
    var r = tailles.map(function (t) { return 45 + 50 * Math.sqrt(t / Math.max.apply(null, tailles)); });
    var c = n === 2 ? [[170, 120], [290, 120]] : [[160, 130], [300, 130], [230, 220]];
    var svg = '<svg viewBox="0 0 ' + W + ' ' + H + '" class="cmp-venn">';
    sel.forEach(function (id, i) {
      svg += '<circle cx="' + c[i][0] + '" cy="' + c[i][1] + '" r="' + r[i] + '" fill="' + COULEURS[i] + '" fill-opacity=".22" stroke="' + COULEURS[i] + '" stroke-width="1.5"/>';
    });
    var pos = n === 2
      ? { '0': [120, 120], '1': [340, 120], '0,1': [230, 120] }
      : { '0': [110, 110], '1': [350, 110], '2': [230, 265], '0,1': [230, 105], '0,2': [160, 190], '1,2': [300, 190], '0,1,2': [230, 165] };
    Object.keys(pos).forEach(function (k) {
      var v = compte[k] || 0;
      svg += '<text x="' + pos[k][0] + '" y="' + pos[k][1] + '" text-anchor="middle" class="cmp-n' + (v ? '' : ' vide') + '">' + v + '</text>';
    });
    sel.forEach(function (id, i) {
      // la légende sous (ou sur) chaque boule, à sa verticale, pour ne pas se chevaucher
      var haut = n === 3 && i < 2, y = haut ? c[i][1] - r[i] - 8 : c[i][1] + r[i] + 16;
      var x = n === 2 ? (i ? W - 8 : 8) : (i === 0 ? 8 : i === 1 ? W - 8 : W / 2), anc = n === 2 ? (i ? 'end' : 'start') : (i === 0 ? 'start' : i === 1 ? 'end' : 'middle');
      svg += '<text x="' + x + '" y="' + y + '" text-anchor="' + anc + '" fill="' + COULEURS[i] + '" class="cmp-lg">' + esc(D.dis[id].nom.slice(0, 40)) + '</text>';
    });
    return '<div class="cmp-bloc"><h4>Recouvrement des signes</h4>' + svg + '</svg>' +
      '<p class="note">Un signe compte pour un syndrome s\'il est attesté chez lui par les livres ; « propre à A » veut dire absent chez B <i>dans ces livres</i>, pas absent chez B.</p></div>';
  }

  // ── Tableau ──────────────────────────────────────────────────────────────
  function tableau(lignes) {
    var titres = { commun: 'Communs à tous', partage: 'Partagés par certains', cousin: 'Cousins (un proche dans l\'arbre HPO)', propre: 'Propres à un seul' };
    var html = '<div class="cmp-bloc"><h4>Signes</h4><div class="scroll"><table class="cmp-tab"><thead><tr><th>signe</th><th>catégorie</th>' +
      sel.map(function (id, i) { return '<th style="color:' + COULEURS[i] + '">' + esc(D.dis[id].nom.slice(0, 28)) + '</th>'; }).join('') + '</tr></thead><tbody>';
    var courant = null;
    lignes.forEach(function (l) {
      if (l.statut !== courant) { courant = l.statut; html += '<tr class="cmp-sep"><td colspan="' + (2 + sel.length) + '">' + titres[courant] + '</td></tr>'; }
      html += '<tr><td>' + esc(nomSigne(l.h)) + ' <span class="mono cmp-id">' + esc(l.h) + '</span></td><td class="cmp-cat">' + esc(catSigne(l.h)) + '</td>' +
        sel.map(function (id, i) {
          if (l.pen[i] != null) return '<td class="num" style="color:' + COULEURS[i] + ';font-weight:600">' + pct(l.pen[i]) + '</td>';
          var c = l.cousins.filter(function (x) { return x.i === i; })[0];
          return c ? '<td class="cmp-cous" title="' + esc(nomSigne(c.h)) + ' (' + c.d + ' niveau' + (c.d > 1 ? 'x' : '') + ')">≈ ' + esc(nomSigne(c.h).slice(0, 26)) + '</td>' : '<td class="cmp-vide">·</td>';
        }).join('') + '</tr>';
    });
    return html + '</tbody></table></div></div>';
  }

  // ── Gènes, familles, parenté ─────────────────────────────────────────────
  function genes() {
    if (!D.genes) return '<div class="cmp-bloc"><h4>Gènes</h4><p class="note">Le paquet en place (v1) n\'a pas genes.json — reprendre data_hub_v2.</p></div>';
    var par = D.genes.par_syndrome, tous = {};
    sel.forEach(function (id, i) { (par[id] || []).forEach(function (g) { (tous[g.gene] = tous[g.gene] || {})[i] = g.role; }); });
    var noms = Object.keys(tous).sort(function (a, b) { return Object.keys(tous[b]).length - Object.keys(tous[a]).length || a.localeCompare(b); });
    if (!noms.length) return '<div class="cmp-bloc"><h4>Gènes</h4><p class="note">Aucun gène connu pour ces syndromes.</p></div>';
    return '<div class="cmp-bloc"><h4>Gènes</h4><table class="cmp-tab"><thead><tr><th>gène</th>' +
      sel.map(function (id, i) { return '<th style="color:' + COULEURS[i] + '">' + esc(D.dis[id].nom.slice(0, 28)) + '</th>'; }).join('') + '</tr></thead><tbody>' +
      noms.map(function (g) { return '<tr><td class="mono">' + esc(g) + '</td>' + sel.map(function (id, i) {
        return tous[g][i] ? '<td style="color:' + COULEURS[i] + '">' + esc(tous[g][i]) + '</td>' : '<td class="cmp-vide">·</td>'; }).join('') + '</tr>'; }).join('') +
      '</tbody></table></div>';
  }
  function familles() {
    var html = '<div class="cmp-bloc"><h4>Familles et parenté (livres)</h4>';
    html += sel.map(function (id, i) {
      var fs = D.familleDe[id] || [];
      return '<div><span class="cmp-pt" style="background:' + COULEURS[i] + '"></span> ' + esc(D.dis[id].nom) + ' — ' +
        (fs.length ? fs.map(function (f) { return '<button class="btn ghost mini" data-fam="' + esc(f.id) + '">' + esc(f.nom || f.id) + '</button>'; }).join(' ') : '<i>hors familles</i>') + '</div>';
    }).join('');
    var paires = [];
    for (var a = 0; a < sel.length; a++) for (var b = a + 1; b < sel.length; b++) {
      var ea = D.entite[sel[a]], eb = D.entite[sel[b]], p = ea && eb && D.parente[ea + '|' + eb];
      if (p) paires.push({ a: a, b: b, p: p });
    }
    if (paires.length) html += '<table class="cmp-tab" style="margin-top:8px"><thead><tr><th>paire</th><th>score</th><th>partagés</th><th>discriminants</th></tr></thead><tbody>' +
      paires.map(function (x) { var p = x.p, ea = D.entite[sel[x.a]];
        var da = p.a === ea ? p.disc_a : p.disc_b, db = p.a === ea ? p.disc_b : p.disc_a;
        return '<tr><td><span class="cmp-pt" style="background:' + COULEURS[x.a] + '"></span><span class="cmp-pt" style="background:' + COULEURS[x.b] + '"></span></td><td class="num">' + p.score + '</td><td>' + esc(p.partages || '') +
          '</td><td><span style="color:' + COULEURS[x.a] + '">' + esc(da || '—') + '</span><br><span style="color:' + COULEURS[x.b] + '">' + esc(db || '—') + '</span></td></tr>'; }).join('') + '</tbody></table>';
    return html + '</div>';
  }

  // ── Arbre HPO : les signes des sélectionnés posés sur leurs ancêtres ─────
  function arbre(lignes) {
    var racines = {}, noeuds = {};
    function noeud(h) { return noeuds[h] || (noeuds[h] = { h: h, enfants: {}, chez: {} }); }
    lignes.forEach(function (l) {
      if (l.h.indexOf('HP:') !== 0) return;
      // chaîne d'ancêtres : premier parent à chaque niveau, 4 niveaux au plus
      var chaine = [l.h], cur = l.h;
      for (var k = 0; k < 4; k++) { var p = (D.parents[cur] || [])[0]; if (!p) break; chaine.unshift(p); cur = p; }
      var parent = null;
      chaine.forEach(function (h) {
        var nd = noeud(h);
        if (parent) parent.enfants[h] = nd; else racines[h] = nd;
        parent = nd;
      });
      l.chez.forEach(function (i) { noeud(l.h).chez[i] = 1; });
    });
    function propager(nd) { Object.keys(nd.enfants).forEach(function (k) { propager(nd.enfants[k]); Object.keys(nd.enfants[k].chez).forEach(function (i) { nd.chez[i] = 1; }); }); }
    Object.keys(racines).forEach(function (k) { propager(racines[k]); });
    function rendreNoeud(nd, prof) {
      var pts = sel.map(function (id, i) { return '<span class="cmp-pt' + (nd.chez[i] ? '' : ' off') + '" style="background:' + COULEURS[i] + '"></span>'; }).join('');
      var ks = Object.keys(nd.enfants);
      var tete = pts + ' ' + esc(nomSigne(nd.h)) + ' <span class="mono cmp-id">' + esc(nd.h) + '</span>';
      if (!ks.length) return '<div class="cmp-feuille">' + tete + '</div>';
      return '<details' + (prof < 2 ? ' open' : '') + '><summary>' + tete + ' <span class="cmp-id">(' + ks.length + ')</span></summary><div class="cmp-branche">' +
        ks.sort(function (a, b) { return nomSigne(a).localeCompare(nomSigne(b)); }).map(function (k) { return rendreNoeud(nd.enfants[k], prof + 1); }).join('') + '</div></details>';
    }
    var rs = Object.keys(racines);
    if (!rs.length) return '';
    return '<div class="cmp-bloc"><h4>Position dans l\'arbre HPO</h4><p class="note">Chaque signe sous ses ancêtres (premier parent, 4 niveaux) ; les points disent quels syndromes ont un signe dans la branche.</p>' +
      rs.sort(function (a, b) { return nomSigne(a).localeCompare(nomSigne(b)); }).map(function (k) { return rendreNoeud(racines[k], 0); }).join('') + '</div>';
  }

  // ── Dendrogramme : sélection + membres de leurs familles, Jaccard élargi ─
  function ensembleElargi(id) {
    var s = {};
    Object.keys(D.dis[id].signes).forEach(function (h) { s[h] = 1; (D.parents[h] || []).forEach(function (p) { s[p] = 1; }); });
    return s;
  }
  function jaccard(a, b) {
    var inter = 0, union = 0;
    Object.keys(a).forEach(function (k) { union++; if (b[k]) inter++; });
    Object.keys(b).forEach(function (k) { if (!a[k]) union++; });
    return union ? inter / union : 0;
  }
  function dendro() {
    var ids = sel.slice(), vus = {};
    sel.forEach(function (id) { vus[id] = 1; });
    sel.forEach(function (id) {
      (D.familleDe[id] || []).forEach(function (f) {
        f.membres.forEach(function (m) {
          var o = m.orpha ? (String(m.orpha).indexOf('ORPHA:') === 0 ? m.orpha : 'ORPHA:' + m.orpha) : null;
          if (o && D.dis[o] && !vus[o] && ids.length < 30) { vus[o] = 1; ids.push(o); }
        });
      });
    });
    if (ids.length < 2) return '';
    DENDRO_IDS = ids;
    var ens = ids.map(ensembleElargi);
    // liaison moyenne, sur la distance 1 − Jaccard
    var amas = ids.map(function (id, i) { return { feuilles: [i], h: 0 }; });
    var dist = {};
    function dk(i, j) { return i < j ? i + '|' + j : j + '|' + i; }
    for (var i = 0; i < ids.length; i++) for (var j = i + 1; j < ids.length; j++) dist[dk(i, j)] = 1 - jaccard(ens[i], ens[j]);
    function dAmas(a, b) { var s = 0, n = 0; a.feuilles.forEach(function (i) { b.feuilles.forEach(function (j) { s += dist[dk(i, j)]; n++; }); }); return s / n; }
    while (amas.length > 1) {
      var best = null;
      for (var a = 0; a < amas.length; a++) for (var b = a + 1; b < amas.length; b++) {
        var d = dAmas(amas[a], amas[b]); if (!best || d < best.d) best = { a: a, b: b, d: d };
      }
      var fus = { g: amas[best.a], d: amas[best.b], h: best.d, feuilles: amas[best.a].feuilles.concat(amas[best.b].feuilles) };
      amas = amas.filter(function (x, k) { return k !== best.a && k !== best.b; }); amas.push(fus);
    }
    // disposition : feuilles en ordre de parcours, x = 1 − hauteur
    var ordre = [], L = 210, W = 720, ligne = 18;
    (function parcourir(n) { if (n.g) { parcourir(n.g); parcourir(n.d); } else ordre.push(n.feuilles[0]); })(amas[0]);
    var yDe = {}; ordre.forEach(function (i, k) { yDe[i] = 14 + k * ligne; });
    var H = 24 + ordre.length * ligne, svg = '';
    function X(h) { return L + (W - L - 10) * (1 - h); }
    function tracer(n) {
      if (!n.g) return { x: X(0), y: yDe[n.feuilles[0]] };
      var g = tracer(n.g), d = tracer(n.d), x = X(n.h), y = (g.y + d.y) / 2;
      svg += '<path d="M' + g.x + ' ' + g.y + ' H' + x + ' V' + d.y + ' H' + d.x + '" fill="none" stroke="#5A6462" stroke-width="1"/>';
      svg += '<circle cx="' + x + '" cy="' + y + '" r="3.5" class="cmp-noeud" data-feuilles="' + n.feuilles.join(',') + '"><title>' + n.feuilles.length + ' syndromes · similarité ' + Math.round((1 - n.h) * 100) + ' %</title></circle>';
      return { x: x, y: y };
    }
    tracer(amas[0]);
    var feuilles = ordre.map(function (i) {
      var k = sel.indexOf(ids[i]);
      return '<text x="' + (L - 6) + '" y="' + (yDe[i] + 4) + '" text-anchor="end" class="cmp-feuille-t' + (k >= 0 ? ' on' : '') + '" data-id="' + esc(ids[i]) + '"' +
        (k >= 0 ? ' fill="' + COULEURS[k] + '"' : '') + '>' + esc(D.dis[ids[i]].nom.slice(0, 36)) + '</text>';
    }).join('');
    var graduations = [0, 0.25, 0.5, 0.75, 1].map(function (s) { return '<text x="' + X(1 - s) + '" y="' + (H - 4) + '" text-anchor="middle" class="cmp-id">' + Math.round(s * 100) + ' %</text>'; }).join('');
    return '<div class="cmp-bloc"><h4>Dendrogramme — la sélection et les membres de ses familles</h4>' +
      '<p class="note">Similarité de Jaccard sur les signes et leurs parents directs, liaison moyenne. Cliquer un nom l\'ajoute ou le retire ; cliquer un nœud sélectionne sa branche (4 au plus).</p>' +
      '<svg viewBox="0 0 ' + W + ' ' + H + '" class="cmp-dendro" style="height:' + H + 'px">' + svg + feuilles + graduations + '</svg></div>';
  }

  // ── Rendu ────────────────────────────────────────────────────────────────
  var conteneur;
  function rendre() {
    var lignes = sel.length ? analyser() : [];
    conteneur.querySelector('.cmp-sel').innerHTML = sel.map(function (id, i) {
      return '<span class="pilule on" style="background:' + COULEURS[i] + ';border-color:' + COULEURS[i] + '">' + esc(D.dis[id].nom) + ' <b data-ret="' + esc(id) + '" title="retirer">×</b></span>';
    }).join('') + (sel.length ? ' <button class="btn ghost mini" id="cmp-vider">vider</button>' : '');
    var corps = conteneur.querySelector('.cmp-corps');
    if (!sel.length) { corps.innerHTML = '<p class="note">Choisir de deux à quatre syndromes — par nom, ORPHA ou gène — ou une famille pour partir de ses membres.</p>'; return; }
    corps.innerHTML = boules(lignes) + tableau(lignes) + genes() + familles() + arbre(lignes) + dendro();
  }

  function monter(el) {
    conteneur = el;
    el.innerHTML = '<div class="cmp-tete"><div class="cmp-rech"><input type="text" id="cmp-q" placeholder="syndrome, ORPHA ou gène…" autocomplete="off"><div class="cmp-liste" id="cmp-liste" hidden></div></div>' +
      '<select id="cmp-fam"><option value="">— partir d\'une famille —</option>' +
      D.familles.map(function (f) { return '<option value="' + esc(f.id) + '">' + esc(f.nom || f.id) + ' (' + f.n_membres + ')</option>'; }).join('') + '</select></div>' +
      '<div class="cmp-sel"></div><div class="cmp-corps"></div>';
    var q = el.querySelector('#cmp-q'), liste = el.querySelector('#cmp-liste');
    q.addEventListener('input', function () {
      var r = chercher(q.value);
      liste.hidden = !r.length;
      liste.innerHTML = r.map(function (x) { return '<div data-id="' + esc(x.id) + '">' + esc(D.dis[x.id].nom) + ' <span class="cmp-id">' + esc(x.id) + (x.via ? ' · ' + esc(x.via) : '') + '</span></div>'; }).join('');
    });
    liste.addEventListener('click', function (e) { var d = e.target.closest('[data-id]'); if (d) { ajouter(d.dataset.id); q.value = ''; liste.hidden = true; } });
    el.querySelector('#cmp-fam').addEventListener('change', function () {
      var f = D.familles.filter(function (x) { return x.id === this.value; }, this)[0]; this.value = '';
      if (!f) return;
      sel = [];
      f.membres.forEach(function (m) {
        var o = m.orpha ? (String(m.orpha).indexOf('ORPHA:') === 0 ? m.orpha : 'ORPHA:' + m.orpha) : null;
        if (o && D.dis[o] && sel.length < MAX) sel.push(o);
      });
      rendre();
    });
    el.addEventListener('click', function (e) {
      var t;
      if ((t = e.target.closest('[data-ret]'))) return retirer(t.dataset.ret);
      if (e.target.id === 'cmp-vider') { sel = []; return rendre(); }
      if ((t = e.target.closest('[data-fam]'))) { el.querySelector('#cmp-fam').value = t.dataset.fam; el.querySelector('#cmp-fam').dispatchEvent(new Event('change')); return; }
      if ((t = e.target.closest('.cmp-feuille-t'))) { var id = t.dataset.id; return sel.indexOf(id) >= 0 ? retirer(id) : ajouter(id); }
      if ((t = e.target.closest('.cmp-noeud'))) {
        sel = t.dataset.feuilles.split(',').map(Number).slice(0, MAX).map(function (i) { return DENDRO_IDS[i]; }).filter(Boolean);
        return rendre();
      }
    });
    rendre();
  }
  window.comparerMonter = function (el) {
    el.innerHTML = '<p class="note">Chargement du paquet…</p>';
    return charger().then(function () { monter(el); }).catch(function (e) { el.innerHTML = '<p class="note">Comparateur indisponible : ' + esc(e.message) + '</p>'; });
  };
})();
