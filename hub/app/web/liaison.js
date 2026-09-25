/* SPDX-License-Identifier: CC-BY-NC-SA-4.0 | Hub Light | Monolithe_Foeto
   ═══════════════════════════════════════════════════════════════════════════
   Liaison au hub — injectée par le serveur, jamais présente dans le fichier.

   Les modules restent ce qu'ils sont : des documents autonomes qu'on ouvre par
   double-clic sur un poste hors réseau. Le serveur ne les modifie pas sur le
   disque ; il insère ce script au moment de servir la page. Un module servi
   par le hub gagne deux gestes — enregistrer, relire — et perd rien : le
   bouton d'export JSON d'origine reste là, et le même fichier ouvert sans le
   hub se comporte exactement comme avant.

   Aucune dépendance : on n'utilise du module que ce que tous exposent —
   MODULE, collecter(), et selon les cas paquet(), relire(), appliquer().
   ═══════════════════════════════════════════════════════════════════════════ */
(function () {
  "use strict";
  if (location.protocol !== "http:" && location.protocol !== "https:") return;

  var API = "";                                  /* même origine que la page */
  var el = function (i) { return document.getElementById(i); };
  var params = new URLSearchParams(location.search);

  /* ── Thème ───────────────────────────────────────────────────────────────
     Le module servi prend le thème choisi dans la page des dossiers : même
     navigateur, même origine, donc même réglage. La feuille ne redéfinit que
     les variables que tous les modules déclarent, plus les quelques règles où
     une couleur est écrite en dur — voir web/themes.css. Le même fichier
     ouvert par double-clic ne reçoit rien de tout ceci. */
  var THEMES = ["sombre", "w98", "cli"];
  var lien = document.createElement("link");
  lien.rel = "stylesheet";
  lien.href = API + "/themes.css";
  document.head.appendChild(lien);

  function theme() {
    try { return localStorage.getItem("hub_theme") || "clair"; }
    catch (e) { return "clair"; }
  }
  function poserTheme() {
    var t = theme();
    THEMES.forEach(function (x) { document.body.classList.remove("theme-" + x); });
    if (THEMES.indexOf(t) >= 0) document.body.classList.add("theme-" + t);
  }
  poserTheme();
  /* Changer de thème dans l'onglet des dossiers change celui des modules déjà
     ouverts : l'événement `storage` ne se déclenche que dans les AUTRES
     onglets, ce qui est exactement ce qu'on veut ici. */
  window.addEventListener("storage", function (e) {
    if (!e.key || e.key === "hub_theme") poserTheme();
  });

  /* ── Barre de liaison ───────────────────────────────────────────────────── */
  var css = document.createElement("style");
  css.textContent =
    ".hub-bar{position:fixed;left:0;right:0;bottom:0;z-index:60;display:flex;" +
    "gap:10px;align-items:center;padding:9px 14px;background:#161D1C;color:#fff;" +
    "font:14px ui-sans-serif,system-ui,'Segoe UI',Roboto,Helvetica,Arial,sans-serif}" +
    ".hub-bar .sp{flex:1}" +
    ".hub-bar b{font-family:ui-monospace,Menlo,Consolas,monospace;font-weight:600;letter-spacing:.04em}" +
    ".hub-bar button{padding:7px 13px;font:inherit;font-size:13px;color:#161D1C;background:#fff;" +
    "border:1px solid #fff;border-radius:3px;cursor:pointer}" +
    ".hub-bar button.g{background:transparent;color:#fff;border-color:#5A6462}" +
    ".hub-bar button:disabled{opacity:.45;cursor:default}" +
    ".hub-bar .msg{font-size:13px;color:#CBD2D0;max-width:46%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}" +
    ".hub-bar a{color:#fff}" +
    "body{padding-bottom:52px}";
  document.head.appendChild(css);

  var bar = document.createElement("div");
  bar.className = "hub-bar";
  bar.innerHTML =
    '<span>Hub — <b id="hubMod"></b></span>' +
    '<span class="msg" id="hubMsg">non enregistré</span>' +
    '<span class="sp"></span>' +
    '<button class="g" id="hubRelire" type="button">Relire depuis le hub</button>' +
    '<button id="hubSave" type="button">Enregistrer au hub</button>' +
    '<a class="g" id="hubRetour" href="/" style="padding:7px 13px;border:1px solid #5A6462;' +
    'border-radius:3px;text-decoration:none;font-size:13px">Dossiers</a>';
  document.body.appendChild(bar);
  el("hubMod").textContent = (window.MODULE || "?");

  function dire(t, chaud) {
    var m = el("hubMsg");
    m.textContent = t;
    m.style.color = chaud ? "#F0A090" : "#CBD2D0";
  }

  /* ── Pré-remplissage depuis l'URL ────────────────────────────────────────
     Le hub ouvre un module avec ?dossier=26P0123 ; on remplit et on déclenche
     les mêmes événements qu'une frappe, pour que le module déverrouille sa
     saisie par son propre chemin plutôt que par une porte dérobée. */
  function poser(id, val) {
    var f = el(id);
    if (!f || !val) return;
    f.value = val;
    f.dispatchEvent(new Event("input", { bubbles: true }));
    f.dispatchEvent(new Event("change", { bubbles: true }));
  }
  poser("dossier", params.get("dossier"));
  poser("operateur", params.get("operateur"));

  /* ── Terme repris du dossier ─────────────────────────────────────────────
     Ouvert depuis le hub pour un dossier, le module reçoit le terme que le
     hub connaît : la fiche administrative d'abord, sinon la première saisie
     courante qui en porte un. Il n'est posé que dans un champ encore vide,
     une fois que le module a eu le temps de restituer sa propre mémoire —
     ce qui a été saisi à la main reste, et s'il diverge la barre le dit sans
     rien écraser. Les champs s'appellent terme_sa / terme_j (radio,
     biométrie) ou sa / saj (autopsie, neuropath, grilles, étui). */
  function termeDuHub(d) {
    var sa = d.terme_sa, j = d.terme_jours;
    if (sa == null) (d.saisies || []).some(function (s) {
      var x = s.donnees || {};
      var t = x.terme && typeof x.terme === "object" ? x.terme : null;
      if (t && t.sa != null) { sa = t.sa; j = t.jours != null ? t.jours : t.j; return true; }
      if (x.terme_sa != null) { sa = x.terme_sa; j = x.terme_jours; return true; }
      return false;
    });
    return sa == null ? null : { sa: sa, j: j == null ? null : j };
  }
  function champsTerme() {
    var sa = el("terme_sa") || el("sa"), j = el("terme_j") || el("saj");
    return sa ? { sa: sa, j: j } : null;
  }
  function reprendreTerme(n) {
    var c = champsTerme();
    if (!c) return;
    fetch(API + "/api/dossiers/" + encodeURIComponent(n)).then(function (r) {
      return r.ok ? r.json() : null;
    }).then(function (d) {
      var t = d && termeDuHub(d);
      if (!t) return;
      setTimeout(function () {
        var actuel = c.sa.value.trim();
        if (!actuel) {
          poser(c.sa.id, String(t.sa));
          if (c.j && t.j != null && !c.j.value.trim()) poser(c.j.id, String(t.j));
          dire("terme " + t.sa + " SA" + (t.j ? " + " + t.j + " j" : "") +
               " repris du dossier — corrigeable à la main");
        } else if (parseInt(actuel, 10) !== parseInt(t.sa, 10)) {
          dire("terme saisi " + actuel + " SA ; le dossier dit " + t.sa + " SA", true);
        }
      }, 800);
    }).catch(function () {});
  }
  if (params.get("dossier")) reprendreTerme(params.get("dossier"));

  function numero() {
    var f = el("dossier");
    return f ? f.value.trim() : "";
  }

  /* Les modules n'arment leur dossier qu'une fois le numéro ET l'opérateur
     saisis — c'est leur garde-fou, et il a raison : une constatation sans
     auteur ne vaut pas grand-chose. On le dit avant d'envoyer, plutôt que de
     laisser partir une enveloppe sans numéro que le hub refuserait ensuite
     avec un message obscur. */
  function pret() {
    if (!numero()) return "saisir d'abord le numéro de dossier";
    var op = el("operateur");
    if (op && !op.value.trim()) return "le module attend aussi les initiales de l'opérateur";
    if (typeof window.dossier !== "undefined" && !window.dossier)
      return "le module n'a pas validé le dossier — vérifier le numéro et l'opérateur";
    return null;
  }

  /* ── Enregistrer ─────────────────────────────────────────────────────────
     On appelle le module par sa propre porte de sortie : paquet() s'il sait
     encoder ses clichés, collecter() sinon. Ce qui part au hub est donc, à
     l'octet près, ce que le bouton « Exporter » aurait écrit dans un fichier. */
  el("hubSave").onclick = async function () {
    var manque = pret();
    if (manque) { dire(manque, true); (el("operateur") || el("dossier")).focus(); return; }
    var n = numero();
    this.disabled = true;
    dire("préparation…");
    try {
      var doc = window.paquet ? await window.paquet() : window.collecter();
      /* Garde-fou : ce qui part devient la saisie courante. Un formulaire
         rouvert vide qui remplacerait une saisie remplie masquerait tout sur
         la fiche — on demande avant. */
      var hub = await docHub(n, false);
      if (hub) {
        var perte = [];
        var ph = (hub.photos || []).length, pd = (doc.photos || []).length;
        if (pd < ph) perte.push(ph + " cliché(s) au hub, " + pd + " ici");
        var rh = remplis(hub, 0), rd = remplis(doc, 0);
        if (rd < rh) perte.push(rh + " valeurs au hub, " + rd + " ici");
        if (perte.length && !confirm("La saisie du hub est plus complète que celle-ci (" +
            perte.join(" ; ") + ").\n\nEnregistrer quand même ? L'ancienne reste dans " +
            "l'historique du dossier.")) { dire("envoi annulé"); this.disabled = false; return; }
      }
      dire("envoi…");
      var r = await fetch(API + "/api/saisie", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(doc)
      });
      var o = await r.json();
      if (!r.ok) throw new Error(o.erreur || ("HTTP " + r.status));
      dire(o.message);
      el("hubRetour").href = "/?dossier=" + encodeURIComponent(n);
      /* Prévenir la page des dossiers, si elle est ouverte dans un autre
         onglet : elle écoute « storage » sur cette clé et se recharge. */
      try { localStorage.setItem("hub_maj", String(Date.now())); } catch (e) {}
    } catch (e) {
      dire("échec : " + e.message, true);
    }
    this.disabled = false;
  };

  /* ── Relire ──────────────────────────────────────────────────────────────
     Le hub renvoie le document archivé, clichés compris, pour que relire()
     puisse remonter les blobs en base locale comme le ferait un import de
     fichier. Les modules sans clichés n'ont qu'appliquer(). */
  /* Le document courant du hub pour ce module, ou null s'il n'y en a pas.
     Sans clichés : donnees_json, quelques Ko. Avec : le fichier d'archive. */
  async function docHub(n, cliches) {
    var r = await fetch(API + "/api/saisie/" + encodeURIComponent(n) + "/" +
                        encodeURIComponent(window.MODULE) + (cliches ? "?cliches=1" : ""));
    if (r.status === 404) return null;
    var o = await r.json();
    if (!r.ok) throw new Error(o.erreur || ("HTTP " + r.status));
    return o;
  }
  async function appliquerHub(o) {
    if (window.relire) await window.relire(o);
    else {
      if (window.vider) window.vider();
      poser("dossier", o.dossier);
      poser("operateur", o.operateur);
      window.appliquer(o);
      if (window.majTousZ) window.majTousZ();
    }
  }
  /* Nombre de valeurs renseignées dans un document, enveloppe et clichés
     exclus. Les constantes d'un module (titres d'étapes, trame attendue…)
     sont des deux côtés d'une comparaison : elles s'annulent. */
  var ENV = { schema_version: 1, module: 1, module_version: 1, dossier: 1,
              operateur: 1, exported_at: 1, photos: 1 };
  function remplis(v, prof) {
    if (v == null || v === "" || v === false) return 0;
    if (Array.isArray(v)) return v.reduce(function (s, x) { return s + remplis(x, prof + 1); }, 0);
    if (typeof v === "object") return Object.keys(v).reduce(function (s, k) {
      return s + (prof === 0 && ENV[k] ? 0 : remplis(v[k], prof + 1));
    }, 0);
    return 1;
  }

  el("hubRelire").onclick = async function () {
    var manque = pret();
    if (manque) { dire(manque, true); (el("operateur") || el("dossier")).focus(); return; }
    var n = numero();
    if (!confirm("Remplacer la saisie en cours par celle du hub ?")) return;
    this.disabled = true;
    dire("lecture…");
    try {
      var o = await docHub(n, true);
      if (!o) { dire("aucune saisie de ce module pour " + n, true); this.disabled = false; return; }
      await appliquerHub(o);
      dire("saisie du " + n + " restituée");
    } catch (e) {
      dire("échec : " + e.message, true);
    }
    this.disabled = false;
  };

  /* ── Rouvert depuis le hub ───────────────────────────────────────────────
     Le module ne restitue que la mémoire de CE navigateur : une saisie faite
     sur le téléphone ou un autre poste le laisse vide. Si le hub en sait plus
     que ce qui vient d'être restitué, on reprend la version du hub, clichés
     compris — sinon « Enregistrer » remplacerait la saisie par un formulaire
     vide. Une saisie locale au moins aussi remplie n'est jamais écrasée. */
  async function reprendreDuHub(n) {
    try {
      var hub = await docHub(n, false);
      if (!hub || !window.collecter || pret()) return;
      if (remplis(hub, 0) <= remplis(window.collecter(), 0)) return;
      dire("reprise de la saisie du hub…");
      await appliquerHub(await docHub(n, true));
      dire("saisie du " + n + " reprise du hub — corriger puis enregistrer");
    } catch (e) {
      dire("reprise du hub impossible : " + e.message, true);
    }
  }
  if (params.get("dossier")) setTimeout(function () { reprendreDuHub(params.get("dossier")); }, 600);

  dire(params.get("dossier") ? "dossier " + params.get("dossier") + " — non enregistré"
                             : "non enregistré");
})();
