/* Grille de lecture — placenta : MARGES (bord placentaire et parenchyme marginal). VERSION 1.0.0.
   Une des quatre grilles qui remplacent placenta.js (1.0.1) : cordon, membranes,
   parenchyme, marges (Rémi, 14/11). La v1 reste publiée tant que les quatre n'ont pas
   été validées à l'usage. Singleton seulement : les gémellaires viendront plus tard.
   Ce qui change par rapport à placenta.js, sans rien retrancher :
   · patron ordre de lecture (rein 3.5.0, poumon 2.1.0) : mode présence, cadres lus du
     faible au fort grossissement (mag, savoir de pratique [expérience], à valider à
     l'usage), variantes dans le cadre qu'elles miment, négatifs déduits, blocs lus ;
   · six des sept signes de la section Marge de la v1 sont ici, clés inchangées ; le foyer
     de polynucléaires au site de rupture part à la grille membranes (centre du rouleau) ;
   · la v1 ne rangeait ces signes dans aucune association : la grille en propose une
     (hémorragie marginale chronique), avec ce que la fiche dit du mot circumvallé, et un
     négatif lié à l'hémosidérine du bord — tous deux à valider ;
   · le gabarit de CR (placenta_cr_fusionné.html) n'a pas de rubrique marge : les phrases
     sont collées aux libellés ;
   · aucun terme FOETO n'est tagué verbatim pour le placenta : pas de branchement fv.
   Fond : ~/Bureau/fiches_lecture/diffusion/fiche_placenta.md (§1 à §9).
   Les divergences entre sources sont PORTÉES dans les champs, jamais arbitrées. */

/* 1.1.0 (2026-11-14) — lot FOETO, propositions relues par Kimi K3.1 Pro et vérifiées par script
   (verbatim mot pour mot dans la fiche) : 0 fenêtre(s) de terme — le « Non » en bloc ne répond plus
   un signe daté hors de sa fenêtre (seul : un par un) ; 0 code(s) FOETO existant(s) branché(s)
   (variantes, rétention, stades, mesures, associations) ; 0 code(s) créé(s) depuis le verbatim de la
   fiche. Les propositions jugées faibles ou fausses attendent le tri de Rémi. */
var ORGANE  = "placenta_marges";
var TITRE   = "placenta — marges";
var SOURCE  = "fiche_placenta.md";
var MODULE  = "grille_placenta_marges";
var VERSION = "1.1.0";
var SCHEMA  = "0.3.0";   /* 0.3.0 : signes present/absent, négatifs déduits */
var ETATS   = "presence";
var PAIR    = false;
var BLOCS   = true;
var LECTURE = true;      /* cadres (CADRES), grossissement (mag), variantes dans leur cadre */

var TITRE_CR    = "PLACENTA — MARGES";
var STADE_TITRE = "";

/* Sans rétention ici (section masquée) : la datation se lit sur la grille parenchyme. */
var KCL_TXT = "Fœticide par KCl déclaré — la mort est datée par le geste.";
var RETARD_NOTE = "";
var AVANCE_NOTE = "";
var TECH_NOTE = "Les pointillés sont des propositions déduites des clics, jamais des prescriptions.";

/* ── 01 · Prélèvement ─────────────────────────────────────────────────────── */
var PRELEV = [
  { k:"marge", g:"Qualifie la lecture", l:"Parenchyme marginal inclus dans le rouleau",
    manque:"la marge porte l'hémorragie marginale, l'hémosidérine et l'infarctus périphérique — sans elle, pas de " +
           "circumvallé histologique" }
];

/* Rétention, stades, mesure : sans objet sur la marge (sections masquées). */
var RETENTION = [];
var STADES    = [];
var MESURE    = null;

/* ── Variantes — chacune dans le cadre dont elle mime un signe ─────────────── */
var VARIANTES = [
  { k:"circummargine", g:"Bord et insertion des membranes",
    l:"Insertion circummarginée (sans signification selon Fox et Sen ; keeling sépare le circumvallé total)" },
  { k:"fibrineMarge", g:"Parenchyme marginal",
    l:"Fibrine périvillositaire < 10 %, autour des souches, en sous-chorial et au bord" }
];

/* ── Cadres, dans l'ordre de lecture du bord ─────────────────────────────────
   Faible : l'insertion des membranes et le sang du bord ; puis le parenchyme marginal. */
var CADRES = [
  { g:"Bord et insertion des membranes", sur:"Marge",
    crNon:"Le bord placentaire et l'insertion des membranes sont sans particularité." },
  { g:"Parenchyme marginal", sur:"Marge",
    crNon:"Le parenchyme marginal est sans particularité." }
];

/* ── Signes — des constats, jamais un nom de maladie ──────────────────────── */
var SIGNES = [
  /* — Bord et insertion des membranes — */
  { k:"hemorragieMarginale", g:"Bord et insertion des membranes", mag:"faible",
    l:"Hémorragie marginale ancienne, hématome marginal",
    cr:"On note une hémorragie marginale ancienne (hématome marginal)" },
  { k:"caduqueCapsulaire", g:"Bord et insertion des membranes", mag:"faible",
    l:"Caduque capsulaire nécrosée / hémorragique au bord",
    cr:"La caduque capsulaire du bord est nécrosée ou hémorragique" },
  { k:"hemosiderineMarge", g:"Bord et insertion des membranes", mag:"moyen",
    l:"Hémosidérine et fibrine au bord, membranes à insertion enroulée (circumvallé histologique)",
    cr:"Le bord porte de l'hémosidérine et de la fibrine, les membranes s'y insèrent enroulées" },

  /* — Parenchyme marginal — */
  { k:"infarctusPeriph", g:"Parenchyme marginal", mag:"faible", l:"Infarctus périphérique (marginal)",
    meta:"à terme, hors du seuil des 5 % non périphériques — la malperfusion maternelle se lit sur la grille parenchyme",
    cr:"On note un infarctus périphérique (marginal)" },
  { k:"villositesAtrophiques", g:"Parenchyme marginal", mag:"faible",
    l:"Villosités marginales atrophiques, fibrine périvillositaire de bord", meta:"la zone prélevée décide du chiffre",
    cr:"Les villosités marginales sont atrophiques, cernées de fibrine périvillositaire de bord" },
  { k:"dvhSousChorial", g:"Parenchyme marginal", mag:"moyen",
    l:"Paucité villositaire focale sous-choriale ou péri-lésionnelle", meta:"ne qualifie pas pour la DVH",
    cr:"On note une paucité villositaire focale, sous-choriale ou péri-lésionnelle" }
];

/* ── Associations — affichées, jamais cochées ─────────────────────────────── */
var DIAGS = [
  { k:"hemorragieChronique", l:"Hémorragie marginale chronique — circumvallé histologique", cle:"hemosiderineMarge", min:1,
    signes:["hemorragieMarginale","hemosiderineMarge","caduqueCapsulaire"],
    stop:" — le mot circumvallé n'est pas employé uniformément, d'où une incidence rapportée de 1 à 7 % " +
         "[benirschke, ch. 15]. keeling sépare le circumvallé total, associé au petit poids de naissance, du " +
         "circummarginé ; Fox et Sen : « circummarginates have no clinical importance » ; lherminecoulomb met les " +
         "deux au même rang — divergence portée. « many circumvallates masquerade clinically as abruptios » : sur la " +
         "marge seule, hémorragie marginale et hématome rétroplacentaire ne se départagent pas. Le circumvallé se " +
         "nomme sur la macroscopie ; la micro décrit l'hémosidérine et la fibrine du bord." }
];

/* ── Négatifs obligatoires — déduits des signes ───────────────────────────── */
var NEGATIFS = [
  { k:"circumvalle", signe:"hemosiderineMarge", l:"Absence d'hémosidérine et de fibrine au bord (pas de circumvallé histologique)",
    p:"le bord porte l'hémorragie marginale chronique ; sans parenchyme marginal sur le rouleau, rien ne s'énonce",
    ko:"hémosidérine et fibrine au bord — circumvallé histologique, à confronter à la macroscopie" }
];

/* ── Techniques ───────────────────────────────────────────────────────────── */
var TECHNIQUES = [
  { k:"perls", l:"Bleu de Prusse (Perls)", q:"hémosidérine contre méconium — le fer positif tranche, le négatif n'affirme rien" }
];

/* ── Propositions de techniques — déduites des clics, jamais imposées ─────── */
function suggerer(){
  var s = {};
  if (E.signes.hemosiderineMarge === POS) s.perls = 1;
  return s;
}

/* ── Contrôles propres à la marge ─────────────────────────────────────────── */
async function testsOrgane(chk, clic, set, crTient, pause){
  function pose(k, v){ if (E.signes[k] !== v) clic("les", k, v); }
  function ote(k){ if (E.signes[k]) clic("les", k, E.signes[k]); }
  function tenue(k){ return associations().some(function(a){ return a.d.k === k && a.tenu; }); }

  /* Rien ne se perd : les signes Marge de la v1 (le site de rupture est passé aux membranes) */
  chk("v1 : les signes de la marge", ["infarctusPeriph","hemorragieMarginale","hemosiderineMarge","villositesAtrophiques",
      "dvhSousChorial","caduqueCapsulaire"].every(function(k){ return !!par(SIGNES, k); }) && !par(SIGNES, "ruptureFoyer"));
  chk("sans rétention ni maturation : sections masquées", $("secRetention").hidden && $("secMaturation").hidden);

  /* L'hémorragie seule ne fait pas le circumvallé histologique : l'hémosidérine est le pivot */
  par(DIAGS, "hemorragieChronique").signes.forEach(ote);
  pose("hemorragieMarginale", POS);
  chk("hémorragie seule : pas d'association tenue", !tenue("hemorragieChronique"));
  pose("hemosiderineMarge", POS);
  chk("hémosidérine du bord : association tenue, Perls proposé, négatif en défaut",
      tenue("hemorragieChronique") && suggerer().perls === 1 && etatNegatif(par(NEGATIFS, "circumvalle")) === "ko");
  ote("hemorragieMarginale"); ote("hemosiderineMarge");

  /* Cadre répondu Non : sa phrase, et le négatif énoncé */
  var iB = groupes().indexOf("Bord et insertion des membranes");
  clic("grp", iB, "non");
  chk("bord Non : phrase rédigée et négatif énoncé",
      crTient("Le bord placentaire et l'insertion des membranes sont sans particularité.") &&
      etatNegatif(par(NEGATIFS, "circumvalle")) === "ok");
  clic("grp", iB, "non");

  /* Divergences portées, jamais arbitrées */
  chk("circumvallé : keeling contre lherminecoulomb", par(DIAGS, "hemorragieChronique").stop.indexOf("keeling") >= 0 &&
      par(DIAGS, "hemorragieChronique").stop.indexOf("lherminecoulomb") >= 0);

  chk("aucun bouton ne porte un diagnostic",
      DIAGS.every(function(d){ return !document.querySelector('[data-act="les"][data-k="' + d.k + '"]'); }));
  chk("FOETO : aucun signe branché", FOETOV === null && SIGNES.every(function(x){ return !x.fv && !x.foeto; }));
}
