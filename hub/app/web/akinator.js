// SPDX-License-Identifier: CC-BY-SA-4.0 | transposé de foetodata_hub/templates/akinator.html
// Moteur bayésien de l'akinator, hors ligne : lit /biblio/akinator.json (paquet data_hub).
// Même code que data.pazuzu.uk/browse/akinator, moins le choix de matrice côté serveur.
// Attend dans la page : #akStatus #akLoading #akMain #signsCard #suggestionsCard #obsCard
// #resetBtn #rankingCard #ctxToggle #hierToggle.
// ═══════════════════════════════════════════════════════════════════
// Bayesian engine — vectorized Float64Array, active-sign pruning
// ═══════════════════════════════════════════════════════════════════
const Engine = (function() {
    const DEFAULT_PEN = 0.01;
    const LOG_DEF = Math.log(DEFAULT_PEN);
    const LOG_1_DEF = Math.log(1 - DEFAULT_PEN);
    const MASS_THRESHOLD = 0.95;
    const MAX_HIER_DIST = 3;
    const DIST_DECAY = [1.0, 0.75, 0.50, 0.30];

    let _hpo = {};
    let _meta = [];
    let _nDis = 0;
    let _hpoList = [];
    let _hpoIdx = {};
    let _logPen = null;
    let _log1Pen = null;
    let _logPrior = null;
    let _disHpo = [];

    // HPO hierarchy
    let _parents = {};
    let _children = {};
    let _bfsCache = {};

    function _getReachable(hpoId) {
        if (_bfsCache[hpoId]) return _bfsCache[hpoId];
        const reachable = new Map();
        reachable.set(hpoId, 0);

        // Phase 1: BFS UP — collect ancestors
        const ancestors = [[hpoId, 0]];
        let upFront = [hpoId];
        const upVisited = new Set([hpoId]);
        for (let d = 1; d <= MAX_HIER_DIST; d++) {
            const next = [];
            for (const node of upFront) {
                for (const p of (_parents[node] || [])) {
                    if (!upVisited.has(p)) {
                        upVisited.add(p);
                        next.push(p);
                        ancestors.push([p, d]);
                        if (!reachable.has(p) || reachable.get(p) > d) reachable.set(p, d);
                    }
                }
            }
            upFront = next;
            if (!next.length) break;
        }

        // Phase 2: from each ancestor, BFS DOWN into subtree
        for (const [ancId, upDist] of ancestors) {
            const maxDown = MAX_HIER_DIST - upDist;
            if (maxDown <= 0) continue;
            let downFront = [ancId];
            const downVisited = new Set([ancId]);
            for (let dd = 1; dd <= maxDown; dd++) {
                const next = [];
                for (const node of downFront) {
                    for (const c of (_children[node] || [])) {
                        if (!downVisited.has(c)) {
                            downVisited.add(c);
                            next.push(c);
                            const totalDist = upDist + dd;
                            if (!reachable.has(c) || reachable.get(c) > totalDist) reachable.set(c, totalDist);
                        }
                    }
                }
                downFront = next;
                if (!next.length) break;
            }
        }

        _bfsCache[hpoId] = reachable;
        return reachable;
    }

    function _effectivePen(userHpo, syndromePhenotypes) {
        const direct = syndromePhenotypes[userHpo];
        if (direct !== undefined) return { pen: direct, type: 'direct', dist: 0 };

        const reachable = _getReachable(userHpo);
        let bestPen = 0, bestType = 'none', bestDist = 99;
        for (const synHpo in syndromePhenotypes) {
            const dist = reachable.get(synHpo);
            if (dist !== undefined && dist > 0) {
                const eff = syndromePhenotypes[synHpo] * DIST_DECAY[dist];
                if (eff > bestPen) {
                    bestPen = eff;
                    bestDist = dist;
                    bestType = 'hier';
                }
            }
        }
        return { pen: bestPen > DEFAULT_PEN ? bestPen : DEFAULT_PEN, type: bestType, dist: bestDist };
    }

    function load(data) {
        _hpo = data.hpo_terms || {};
        _parents = data.hpo_parents || {};
        _bfsCache = {};

        _children = {};
        for (const child in _parents) {
            for (const p of _parents[child]) {
                if (!_children[p]) _children[p] = [];
                _children[p].push(child);
            }
        }

        const diseases = data.diseases || [];
        _nDis = diseases.length;

        const allHpo = new Set();
        diseases.forEach(d => (d.phenotypes || []).forEach(p => allHpo.add(p.hpo_id)));
        _hpoList = Array.from(allHpo);
        _hpoIdx = {};
        _hpoList.forEach((h, i) => _hpoIdx[h] = i);
        const nH = _hpoList.length;

        _logPen = new Float64Array(_nDis * nH);
        _log1Pen = new Float64Array(_nDis * nH);
        _logPrior = new Float64Array(_nDis);
        _meta = [];
        _disHpo = [];

        let totalPrev = 0;
        diseases.forEach(d => totalPrev += (d.prevalence || 0.001));

        for (let di = 0; di < _nDis; di++) {
            const d = diseases[di];
            const ph = {};
            const hpoSet = [];
            (d.phenotypes || []).forEach(p => {
                ph[p.hpo_id] = p.penetrance;
                if (_hpoIdx[p.hpo_id] !== undefined) hpoSet.push(_hpoIdx[p.hpo_id]);
            });
            _meta.push({ id: d.disease_id, name: d.disease_name, name_en: d.name_en,
                         omim: d.omim, category: d.category, phenotypes: ph });
            _disHpo.push(hpoSet);
            _logPrior[di] = Math.log((d.prevalence || 0.001) / totalPrev);

            const base = di * nH;
            for (let hi = 0; hi < nH; hi++) {
                _logPen[base + hi] = LOG_DEF;
                _log1Pen[base + hi] = LOG_1_DEF;
            }
            for (const p of (d.phenotypes || [])) {
                const hi = _hpoIdx[p.hpo_id];
                if (hi !== undefined) {
                    const pen = Math.max(p.penetrance, 1e-6);
                    _logPen[base + hi] = Math.log(pen);
                    _log1Pen[base + hi] = Math.log(1 - Math.min(pen, 1 - 1e-6));
                }
            }
        }
        return { n_diseases: _nDis, n_hpo: nH };
    }

    function _postVec(presentIdx, absentIdx) {
        const ll = new Float64Array(_nDis);
        const nH = _hpoList.length;
        for (let di = 0; di < _nDis; di++) ll[di] = _logPrior[di];
        for (const hi of presentIdx) {
            for (let di = 0; di < _nDis; di++) ll[di] += _logPen[di * nH + hi];
        }
        for (const hi of absentIdx) {
            for (let di = 0; di < _nDis; di++) ll[di] += _log1Pen[di * nH + hi];
        }
        let mx = -Infinity;
        for (let di = 0; di < _nDis; di++) if (ll[di] > mx) mx = ll[di];
        let sm = 0;
        for (let di = 0; di < _nDis; di++) { ll[di] = Math.exp(ll[di] - mx); sm += ll[di]; }
        for (let di = 0; di < _nDis; di++) ll[di] /= sm;
        return ll;
    }

    function _postVecHier(presentHpos, absentHpos) {
        const ll = new Float64Array(_nDis);
        const nH = _hpoList.length;
        for (let di = 0; di < _nDis; di++) ll[di] = _logPrior[di];

        for (const h of presentHpos) {
            for (let di = 0; di < _nDis; di++) {
                const { pen } = _effectivePen(h, _meta[di].phenotypes);
                ll[di] += Math.log(Math.max(pen, 1e-6));
            }
        }
        // Absent signs: direct match only (hierarchy creates false negatives)
        for (const h of absentHpos) {
            const hi = _hpoIdx[h];
            if (hi !== undefined) {
                for (let di = 0; di < _nDis; di++) ll[di] += _log1Pen[di * nH + hi];
            } else {
                for (let di = 0; di < _nDis; di++) {
                    const directPen = _meta[di].phenotypes[h];
                    const pen = directPen !== undefined ? directPen : DEFAULT_PEN;
                    ll[di] += Math.log(1 - Math.min(pen, 1 - 1e-6));
                }
            }
        }

        let mx = -Infinity;
        for (let di = 0; di < _nDis; di++) if (ll[di] > mx) mx = ll[di];
        let sm = 0;
        for (let di = 0; di < _nDis; di++) { ll[di] = Math.exp(ll[di] - mx); sm += ll[di]; }
        for (let di = 0; di < _nDis; di++) ll[di] /= sm;
        return ll;
    }

    function _toIdx(hpoIds) {
        return hpoIds.map(h => _hpoIdx[h]).filter(i => i !== undefined);
    }

    function posteriors(present, absent, useHier) {
        const probs = useHier ? _postVecHier(present, absent) : _postVec(
            _toIdx(present), _toIdx(absent)
        );

        const results = [];
        for (let di = 0; di < _nDis; di++) {
            const matchInfo = {};
            for (const h of present.concat(absent)) {
                const r = _effectivePen(h, _meta[di].phenotypes);
                if (r.type !== 'none' || r.pen > DEFAULT_PEN) {
                    matchInfo[h] = { type: r.type, pen: r.pen, dist: r.dist };
                }
            }
            results.push({
                id: _meta[di].id, name: _meta[di].name, name_en: _meta[di].name_en,
                omim: _meta[di].omim, category: _meta[di].category,
                probability: probs[di], phenotypes: _meta[di].phenotypes, matchInfo,
            });
        }
        results.sort((a,b) => b.probability - a.probability);
        return results;
    }

    function _entropyVec(probs) {
        let h = 0;
        for (let i = 0; i < probs.length; i++) {
            const p = probs[i];
            if (p > 1e-15) h -= p * Math.log2(p);
        }
        return h;
    }

    function entropy(probs) { return _entropyVec(Float64Array.from(probs)); }

    function suggest(present, absent, topN) {
        topN = topN || 6;
        const pIdx = present.map(h => _hpoIdx[h]).filter(i => i !== undefined);
        const aIdx = absent.map(h => _hpoIdx[h]).filter(i => i !== undefined);
        const probs = _postVec(pIdx, aIdx);
        const curH = _entropyVec(probs);
        const already = new Set([...pIdx, ...aIdx]);
        const nH = _hpoList.length;

        const indexed = [];
        for (let di = 0; di < _nDis; di++) indexed.push({ di, p: probs[di] });
        indexed.sort((a,b) => b.p - a.p);
        const activeCols = new Set();
        let cumul = 0;
        for (const item of indexed) {
            cumul += item.p;
            for (const hi of _disHpo[item.di]) {
                if (!already.has(hi)) activeCols.add(hi);
            }
            if (cumul >= MASS_THRESHOLD) break;
        }

        const scored = [];
        const llYes = new Float64Array(_nDis);
        const llNo = new Float64Array(_nDis);

        for (const hi of activeCols) {
            let pYes = 0;
            for (let di = 0; di < _nDis; di++) {
                const lp = _logPen[di * nH + hi];
                const l1p = _log1Pen[di * nH + hi];
                const pen = Math.exp(lp);
                pYes += probs[di] * pen;
                llYes[di] = probs[di] * pen;
                llNo[di] = probs[di] * Math.exp(l1p);
            }
            const pNo = 1 - pYes;

            let smY = 0, smN = 0;
            for (let di = 0; di < _nDis; di++) { smY += llYes[di]; smN += llNo[di]; }
            let hY = 0, hN = 0;
            if (smY > 1e-15) {
                for (let di = 0; di < _nDis; di++) {
                    const p = llYes[di] / smY;
                    if (p > 1e-15) hY -= p * Math.log2(p);
                }
            }
            if (smN > 1e-15) {
                for (let di = 0; di < _nDis; di++) {
                    const p = llNo[di] / smN;
                    if (p > 1e-15) hN -= p * Math.log2(p);
                }
            }

            const ig = curH - (pYes * hY + pNo * hN);
            if (ig > 0.001) scored.push({ hpo: _hpoList[hi], infoGain: ig, pYes });
        }
        scored.sort((a,b) => b.infoGain - a.infoGain);
        return scored.slice(0, topN);
    }

    function searchHPO(query, excludeSet, ctxFilter, catFilter) {
        if (!query || query.length < 2) return [];
        const q = query.toLowerCase();
        return Object.entries(_hpo)
            .filter(([id, t]) => {
                if (excludeSet && excludeSet.has(id)) return false;
                if (ctxFilter && t.context !== ctxFilter && t.context !== 'both') return false;
                if (catFilter && t.category !== catFilter) return false;
                const n = (t.name_fr || t.name || '').toLowerCase();
                return n.includes(q) || id.toLowerCase().includes(q);
            })
            .slice(0, 12)
            .map(([id, t]) => ({ id, name: t.name_fr || t.name || id, context: t.context || 'both', category: t.category, type: t.type || 'hpo' }));
    }

    function hpoName(id) { const t = _hpo[id]; return t ? (t.name_fr || t.name || id) : id; }
    function isFoeto(id) { return id && id.startsWith('FOETO:'); }
    function count() { return { diseases: _meta.length, hpo: Object.keys(_hpo).length }; }

    return { load, posteriors, entropy, suggest, searchHPO, hpoName, count };
})();

// ═══════════════════════════════════════════════════════════════════
// State & UI
// ═══════════════════════════════════════════════════════════════════
const state = {
    phase: 'input',
    signs: [
        { hpo: null, polarity: 'present', query: '' },
        { hpo: null, polarity: 'present', query: '' },
        { hpo: null, polarity: 'present', query: '' },
    ],
    additional: [],
    contextFilter: '',
    categoryFilter: '',
    useHierarchy: true,
    usePubmed: false,
    useLivres: false,
    useFoeto: true,
};

function esc(s) { const d = document.createElement('div'); d.textContent = s; return d.innerHTML; }

function setContext(ctx) {
    state.contextFilter = ctx;
    document.querySelectorAll('#ctxToggle button').forEach(b => {
        b.classList.toggle('active', b.dataset.ctx === ctx);
    });
}

function setCategory(cat) {
    state.categoryFilter = cat;
}

async function loadEngine() {
    const status = document.getElementById('akStatus');
    status.textContent = 'Chargement...';
    status.style.color = 'var(--ak-warning)';

    /* Hors ligne : une seule matrice, celle du paquet (livres + FOETO). Le
       contexte prénatal/postnatal filtre la recherche de signes côté page. */

    try {
        const res = await fetch(window.AKINATOR_URL || '/biblio/akinator.json');
        const data = await res.json();
        const info = Engine.load(data);
        const foetoCnt = data._meta ? (data._meta.n_foeto || 0) : 0;
        status.textContent = info.n_diseases + ' syndromes · ' + (info.n_hpo - foetoCnt) + ' HPO' + (foetoCnt ? ' · ' + foetoCnt + ' FOETO' : '');
        status.style.color = 'var(--ak-success)';
        document.getElementById('akLoading').style.display = 'none';
        document.getElementById('akMain').style.display = '';
        resetAll();
    } catch(e) {
        status.textContent = 'Erreur: ' + e.message;
        status.style.color = 'var(--ak-danger)';
    }
}

function renderSigns() {
    const card = document.getElementById('signsCard');
    const isInput = state.phase === 'input';
    let html = '<div class="ak-section">' + (isInput ? 'Signes cardinaux (min. 2)' : state.signs.filter(s => s.hpo).length + ' signes initiaux') + '</div>';

    state.signs.forEach((sign, idx) => {
        const polCls = sign.polarity === 'present' ? 'present' : 'absent';
        const polChar = sign.polarity === 'present' ? '+' : '−';
        html += '<div class="sign-row" id="signRow' + idx + '">';
        html += '<div class="pol-btn ' + polCls + '" onclick="togglePol(' + idx + ')" ' + (!isInput ? 'style="pointer-events:none;opacity:0.6"' : '') + '>' + polChar + '</div>';
        html += '<input type="text" class="ak-input sign-input" value="' + esc(sign.query) + '" placeholder="Signe ' + (idx+1) + '..." ' + (!isInput ? 'disabled' : '') + ' onfocus="state.activeSearch='+idx+'" oninput="searchHPO('+idx+',this.value)" id="input'+idx+'">';
        if (isInput && state.signs.length > 2) html += '<button class="ak-btn" onclick="removeSign('+idx+')" style="padding:4px 8px">&times;</button>';
        html += '</div>';
    });

    if (isInput) {
        html += '<div style="display:flex;gap:8px;margin-top:10px">';
        if (state.signs.length < 8) html += '<button class="ak-btn" onclick="addSign()" style="border-style:dashed">+ Ajouter un signe</button>';
        const filled = state.signs.filter(s => s.hpo).length;
        html += '<button class="ak-btn ak-btn-primary" style="flex:1" onclick="startRefine()" ' + (filled < 2 ? 'disabled' : '') + '>Lancer l\'analyse (' + filled + ' signes)</button>';
        html += '</div>';
    }
    card.innerHTML = html;
}

function searchHPO(idx, query) {
    state.signs[idx].query = query;
    state.signs[idx].hpo = null;
    const old = document.getElementById('drop'+idx);
    if (old) old.remove();
    if (query.length < 2) return;

    const exclude = new Set(state.signs.filter(s => s.hpo).map(s => s.hpo).concat(state.additional.map(o => o.hpo)));
    const results = Engine.searchHPO(query, exclude, state.contextFilter, state.categoryFilter);
    if (!results.length) return;

    const row = document.getElementById('signRow'+idx);
    let dd = '<div class="ak-dropdown" id="drop'+idx+'">';
    results.forEach(r => {
        const ctxBadge = r.type === 'foeto' ? '<span class="ctx-badge foeto">FOETO</span>'
            : r.context === 'prenatal' ? '<span class="ctx-badge pre">pre</span>'
            : r.context === 'postnatal' ? '<span class="ctx-badge post">post</span>' : '';
        dd += '<div class="ak-dropdown-item" onclick="selectHPO('+idx+',\''+r.id+'\',\''+esc(r.name).replace(/'/g, "\\'")+'\')">';
        dd += '<div>'+esc(r.name)+ctxBadge+'</div><div class="hpo-id">'+r.id+'</div></div>';
    });
    dd += '</div>';
    row.insertAdjacentHTML('beforeend', dd);

    setTimeout(() => {
        document.addEventListener('click', function _cl(e) {
            const d = document.getElementById('drop'+idx);
            if (d && !d.contains(e.target) && e.target.id !== 'input'+idx) { d.remove(); document.removeEventListener('click', _cl); }
        });
    }, 50);
}

function selectHPO(idx, hpoId, name) {
    state.signs[idx].hpo = hpoId;
    state.signs[idx].query = name;
    const d = document.getElementById('drop'+idx);
    if (d) d.remove();
    renderSigns();
    updateRanking();
}

function togglePol(idx) {
    if (state.phase !== 'input') return;
    state.signs[idx].polarity = state.signs[idx].polarity === 'present' ? 'absent' : 'present';
    renderSigns();
    updateRanking();
}

function addSign() {
    if (state.signs.length < 8) {
        state.signs.push({ hpo: null, polarity: 'present', query: '' });
        renderSigns();
    }
}

function removeSign(idx) {
    if (state.signs.length > 2) {
        state.signs.splice(idx, 1);
        renderSigns();
        updateRanking();
    }
}

function startRefine() {
    if (state.signs.filter(s => s.hpo).length < 2) return;
    state.phase = 'refine';
    renderSigns();
    updateRanking();
    document.getElementById('resetBtn').style.display = '';
}

function updateRanking() {
    const present = state.signs.filter(s => s.hpo && s.polarity === 'present').map(s => s.hpo)
        .concat(state.additional.filter(o => o.polarity === 'present').map(o => o.hpo));
    const absent = state.signs.filter(s => s.hpo && s.polarity === 'absent').map(s => s.hpo)
        .concat(state.additional.filter(o => o.polarity === 'absent').map(o => o.hpo));

    if (present.length + absent.length === 0) return;

    const ranking = Engine.posteriors(present, absent, state.useHierarchy);
    const totalQ = present.length + absent.length;

    const card = document.getElementById('rankingCard');
    let html = '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px">';
    html += '<div class="ak-section" style="margin:0">Hypotheses diagnostiques</div>';
    html += '<span style="font-size:10px;font-family:var(--ak-mono);color:var(--ak-accent);padding:2px 8px;border-radius:10px;background:var(--ak-accent-bg)">'+totalQ+' obs.</span>';
    html += '</div>';

    if (ranking.length && ranking[0].probability > 0.01) {
        const top = ranking[0];
        html += '<div class="rank-top">';
        html += '<div style="display:flex;justify-content:space-between;align-items:baseline">';
        html += '<div><a href="/browse/syndromes/'+top.id+'" style="font-size:15px;font-weight:600;color:var(--ak-warning);text-decoration:none" target="_blank">'+esc(top.name)+'</a></div>';
        html += '<div style="font-size:18px;font-weight:700;font-family:var(--ak-mono);color:var(--ak-warning)">'+(top.probability*100).toFixed(1)+'%</div>';
        html += '</div>';
        html += '<div style="font-size:10px;font-family:var(--ak-mono);color:var(--ak-text3);margin-top:2px">'+top.id;
        if (top.omim) html += ' · OMIM:'+top.omim;
        if (top.category) html += ' · '+top.category;
        html += '</div>';
        html += '<div style="margin-top:8px;display:flex;flex-wrap:wrap;gap:3px">';
        present.forEach(h => {
            const mi = top.matchInfo[h];
            if (!mi) return;
            const label = mi.type === 'hier' ? '~' : '';
            html += '<span class="obs-tag pos" title="'+(mi.type==='hier'?'match hierarchique':'match direct')+'">'+label+Engine.hpoName(h)+' ('+(mi.pen*100).toFixed(0)+'%)</span>';
        });
        absent.forEach(h => {
            const mi = top.matchInfo[h];
            if (!mi || mi.pen < 0.3) return;
            const label = mi.type === 'hier' ? '~' : '';
            html += '<span class="obs-tag neg" title="'+(mi.type==='hier'?'match hierarchique':'match direct')+'">&not;'+label+Engine.hpoName(h)+' (pen '+(mi.pen*100).toFixed(0)+'%)</span>';
        });
        html += '</div></div>';
    }

    ranking.slice(1, 15).forEach((d, i) => {
        const pct = d.probability * 100;
        if (pct < 0.1) return;
        const barW = ranking[0].probability > 0 ? Math.min(pct / ranking[0].probability * 100, 100) : 0;
        html += '<div class="rank-item">';
        html += '<div class="rank-num">'+(i+2)+'</div>';
        html += '<div style="flex:1;min-width:0"><div style="font-size:12px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis"><a href="/browse/syndromes/'+d.id+'" style="color:var(--ak-text);text-decoration:none" target="_blank">'+esc(d.name)+'</a></div>';
        html += '<div class="rank-bar"><div class="rank-fill" style="width:'+barW+'%;background:'+(pct>10?'var(--ak-accent)':'var(--ak-text3)')+'"></div></div></div>';
        html += '<div style="font-size:12px;font-family:var(--ak-mono);color:'+(pct>10?'var(--ak-accent)':'var(--ak-text3)')+';font-weight:'+(pct>10?'600':'400')+';min-width:46px;text-align:right">'+(pct>=1?pct.toFixed(1):pct.toFixed(2))+'%</div>';
        html += '</div>';
    });

    const h = Engine.entropy(ranking.map(r => r.probability));
    html += '<div style="margin-top:14px;padding:8px 10px;border-radius:6px;background:var(--ak-bg);border:1px solid var(--ak-border);font-size:10px;font-family:var(--ak-mono);color:var(--ak-text3);display:flex;justify-content:space-between">';
    html += '<span>Entropie residuelle</span><span style="color:var(--ak-accent)">'+h.toFixed(2)+' bits</span></div>';

    card.innerHTML = html;

    if (state.phase === 'refine') {
        const suggestions = Engine.suggest(present, absent, 6);
        renderSuggestions(suggestions);
        renderObsHistory();
    }
}

function renderSuggestions(suggestions) {
    const card = document.getElementById('suggestionsCard');
    if (!suggestions.length) { card.style.display = 'none'; return; }
    card.style.display = '';

    let html = '<div class="ak-section" style="color:var(--ak-warning)">Questions discriminantes</div>';
    html += '<div style="font-size:10px;color:var(--ak-text3);margin-bottom:8px">Classees par gain d\'information (Shannon)</div>';

    suggestions.forEach((s, i) => {
        if (state.additional.some(o => o.hpo === s.hpo)) return;
        const name = Engine.hpoName(s.hpo);
        html += '<div class="suggest'+(i===0?' top':'')+'">';
        html += '<div style="flex:1"><div class="suggest-name">'+esc(name)+'</div>';
        html += '<div class="suggest-meta">IG='+s.infoGain.toFixed(3)+' bit &middot; P(oui)='+(s.pYes*100).toFixed(0)+'%</div></div>';
        html += '<button class="suggest-btn yes" onclick="answer(\''+s.hpo+'\',\'present\')">Oui</button>';
        html += '<button class="suggest-btn no" onclick="answer(\''+s.hpo+'\',\'absent\')">Non</button>';
        html += '</div>';
    });

    card.innerHTML = html;
}

function answer(hpo, polarity) {
    state.additional.push({ hpo, polarity });
    updateRanking();
}

function renderObsHistory() {
    const card = document.getElementById('obsCard');
    if (!state.additional.length) { card.style.display = 'none'; return; }
    card.style.display = '';

    let html = '<div class="ak-section">Observations ajoutees ('+state.additional.length+')</div>';
    state.additional.forEach((obs, i) => {
        const polChar = obs.polarity === 'present' ? '+' : '−';
        const polCol = obs.polarity === 'present' ? 'var(--ak-success)' : 'var(--ak-danger)';
        html += '<div style="display:flex;gap:6px;align-items:center;padding:3px 0;font-size:12px">';
        html += '<span style="color:'+polCol+';font-weight:700;width:14px">'+polChar+'</span>';
        html += '<span style="flex:1">'+esc(Engine.hpoName(obs.hpo))+'</span>';
        html += '<button class="ak-btn" onclick="removeObs('+i+')" style="padding:2px 6px;font-size:10px">&times;</button>';
        html += '</div>';
    });
    card.innerHTML = html;
}

function removeObs(idx) {
    state.additional.splice(idx, 1);
    updateRanking();
}

function resetAll() {
    state.phase = 'input';
    state.signs = [
        { hpo: null, polarity: 'present', query: '' },
        { hpo: null, polarity: 'present', query: '' },
        { hpo: null, polarity: 'present', query: '' },
    ];
    state.additional = [];
    document.getElementById('resetBtn').style.display = 'none';
    document.getElementById('suggestionsCard').style.display = 'none';
    document.getElementById('obsCard').style.display = 'none';
    document.getElementById('rankingCard').innerHTML = '<div class="ak-section">Hypotheses diagnostiques</div><div style="text-align:center;padding:40px 20px;color:var(--ak-text3);font-size:13px">Entrez au moins 2 signes pour demarrer l\'analyse</div>';
    renderSigns();
}

// Boot
/* La page Biblio appelle loadEngine() quand l'onglet Akinator s'ouvre. */
window.akinatorCharger = loadEngine;
