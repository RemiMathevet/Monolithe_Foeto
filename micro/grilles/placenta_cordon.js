/* Grille de lecture — placenta : CORDON OMBILICAL. VERSION 1.0.0.
   Une des quatre grilles qui remplacent placenta.js (1.0.1) : cordon, membranes,
   parenchyme, marges (Rémi, 14/11). La v1 reste publiée tant que les quatre n'ont pas
   été validées à l'usage. Singleton seulement : les gémellaires viendront plus tard.
   Ce qui change par rapport à placenta.js, sans rien retrancher :
   · patron ordre de lecture (rein 3.5.0, poumon 2.1.0) : mode présence (présent /
     absent / non regardé), cadres lus du faible au fort grossissement (mag, savoir de
     pratique [expérience], à valider à l'usage), contexte hors lame avant la lame,
     variantes dans le cadre qu'elles miment, négatifs déduits des signes, blocs lus ;
   · les 14 signes de la section Cordon de la v1 sont ici, clés inchangées. L'artérite
     ombilicale une ou deux artères se dédouble (une artère / deux artères) pour porter
     les phrases RIF 2 et RIF 3 du gabarit de CR ; l'insertion vélamenteuse et
     l'hypertorsion, lues en macroscopie, passent au contexte hors lame ;
   · les trois critères de rétention du cordon (nécrose de la gelée, nécrose vasculaire,
     média pycnotique) restent dans la rétention de la grille parenchyme, où se lisent les
     quatre seaux de Genest II ; ici ce sont des variantes, dans le cadre qu'elles miment ;
   · les négatifs trois vaisseaux, clamp et gestes se déduisent de signes ;
   · CR prérédigé : cr (signe présent) et crNon (cadre répondu Non), repris de
     placenta_cr_fusionné.html quand il a une phrase, sinon collés au libellé ;
   · aucun terme FOETO n'est tagué verbatim pour le placenta : pas de branchement fv.
   Les associations sont la part du cordon dans celles de la v1 ; la vasculite de la plaque
   choriale (réponse fœtale stade 1) se lit sur la grille parenchyme.
   Fond : ~/Bureau/fiches_lecture/diffusion/fiche_placenta.md (§1 à §9).
   Les divergences entre sources sont PORTÉES dans les champs, jamais arbitrées. */

var ORGANE  = "placenta_cordon";
var TITRE   = "placenta — cordon ombilical";
var SOURCE  = "fiche_placenta.md";
var MODULE  = "grille_placenta_cordon";
var VERSION = "1.0.0";
var SCHEMA  = "0.3.0";   /* 0.3.0 : signes present/absent, négatifs déduits */
var ETATS   = "presence";
var PAIR    = false;
var BLOCS   = true;
var LECTURE = true;      /* cadres (CADRES), grossissement (mag), variantes dans leur cadre */

var TITRE_CR    = "PLACENTA — CORDON";
var STADE_TITRE = "";

/* Sans rétention ici (section masquée) : la datation se lit sur la grille parenchyme. */
var KCL_TXT = "Fœticide par KCl déclaré — la mort est datée par le geste.";
var RETARD_NOTE = "";
var AVANCE_NOTE = "";
var TECH_NOTE = "Les pointillés sont des propositions déduites des clics, jamais des prescriptions.";

/* ── 01 · Prélèvement ─────────────────────────────────────────────────────── */
var PRELEV = [
  { k:"cordon2", g:"Qualifie la lecture", l:"Deux sections de cordon : pôle fœtal et ≈ 5 cm de l'insertion, hors clamp", grave:true,
    manque:"une coupe trop près de l'insertion fabrique une fausse artère unique : 92 % des cordons ont une " +
           "anastomose de Hyrtl [benirschke, ch. 11] ; éviter clamp et ponction [ernst, ch. 36]" }
];

/* Rétention, stades, mesure : sans objet sur le cordon (sections masquées). */
var RETENTION = [];
var STADES    = [];
var MESURE    = null;

/* ── Variantes — chacune dans le cadre dont elle mime un signe ───────────────
   Les changements post-mortem du cordon sont rangés ici comme au poumon (artefacts de
   macération) : vus, écartés, en parenthèse au CR ; ils datent sur la grille parenchyme. */
var VARIANTES = [
  { k:"fauxNoeud", g:"Vaisseaux ombilicaux", l:"Faux nœud du cordon (gelée ou dilatation vasculaire asymétrique)" },
  { k:"vitellin", g:"Vaisseaux ombilicaux", l:"Reliquats du canal vitellin et de l'ouraque" },
  { k:"whartonNecrose", g:"Gelée de Wharton", l:"Nécrose de la gelée de Wharton (rétention ≥ 48 h, mauvais prédicteur)" },
  { k:"mediaPycnotique", g:"Inflammation — réponse fœtale",
    l:"Noyaux pycnotiques et plissés de la média ombilicale (mort fœtale, « mimicking neutrophils »)" },
  { k:"cordonVascNecrose", g:"Méconium", l:"Nécrose vasculaire du cordon (rétention ≥ 7 j)" }
];

/* ── Cadres, dans l'ordre de lecture d'une coupe de cordon ───────────────────
   Faible : nombre et état des vaisseaux, puis la gelée ; moyen : la réponse fœtale ;
   fort : les macrophages méconiaux. crNon = phrase du CR quand le cadre est répondu Non. */
var CADRES = [
  { g:"Contexte hors lame — macroscopie, dossier", hors:true },
  { g:"Vaisseaux ombilicaux", sur:"Cordon",
    crNon:"Le cordon présente 3 vaisseaux sur chacune de ses coupes, sans thrombose ni ectasie." },
  { g:"Gelée de Wharton", sur:"Cordon",
    crNon:"La gelée de Wharton est d'épaisseur et d'aspect normaux, sans hématome." },
  { g:"Inflammation — réponse fœtale", sur:"Cordon",
    crNon:"Absence de processus inflammatoire funiculaire (RIF 0)." },
  { g:"Méconium", sur:"Cordon",
    crNon:"Absence de macrophage chargé de méconium et de nécrose pariétale au cordon." }
];

/* ── Signes — des constats, jamais un nom de maladie ──────────────────────── */
var H = "Contexte hors lame — macroscopie, dossier";

var SIGNES = [
  /* — Contexte hors lame — */
  { k:"vaisseauxMembraneux", g:H, l:"Insertion vélamenteuse ou vaisseaux membraneux (insertion marginale comprise)",
    meta:"vasa praevia = rapport à l'orifice interne, non diagnosticable sur la pièce",
    cr:"Le cordon ombilical est d'insertion vélamenteuse ou marginale, avec des vaisseaux membraneux" },
  { k:"hypertorsion", g:H, l:"Hypertorsion avec indentations périphériques du cordon", meta:"le patron, pas l'index",
    cr:"Le cordon est hyperspiralé, avec des indentations périphériques" },
  { k:"clampMarque", g:H, l:"Marque de clamp ou de ponction sur le segment de cordon prélevé",
    cr:"Le segment de cordon examiné porte une marque de clamp ou de ponction" },
  { k:"gesteInstrumental", g:H,
    l:"Geste instrumental ou prélèvement fœtal (ponction de sang fœtal, amniocentèse, transfusion in utero, extraction)",
    cr:"Notion de geste instrumental (ponction, amniocentèse, transfusion ou extraction)" },

  /* — Vaisseaux ombilicaux — */
  { k:"aou", g:"Vaisseaux ombilicaux", mag:"faible",
    l:"Artère ombilicale unique sur coupe à circonférence complète, ≥ 5 cm de l'insertion",
    meta:"Hyrtl dans 92 % des cordons",
    cr:"Le cordon ne compte que deux vaisseaux sur chacune de ses coupes (artère ombilicale unique)." },
  { k:"variceOmb", g:"Vaisseaux ombilicaux", mag:"faible", l:"Varice ou ectasie d'un vaisseau ombilical",
    cr:"On note une varice (ectasie) d'un vaisseau ombilical" },
  { k:"thromboseOmb", g:"Vaisseaux ombilicaux", mag:"faible", l:"Thrombose d'un vaisseau ombilical",
    cr:"On note une thrombose d'un vaisseau ombilical" },

  /* — Gelée de Wharton — */
  { k:"striction", g:"Gelée de Wharton", mag:"faible", l:"Striction : gelée absente ou subtotale, cordon extrêmement spiralé",
    cr:"On note une striction : gelée de Wharton absente ou subtotale sur un segment extrêmement spiralé" },
  { k:"cordonGrele", g:"Gelée de Wharton", mag:"faible",
    l:"Gelée de Wharton condensée en liseré, ± microcalcifications diffuses (cordon grêle)",
    meta:"diamètre < 8 mm ; biaisé par la rétention",
    cr:"La gelée de Wharton est condensée en liseré (cordon grêle)" },
  { k:"oedemeCordon", g:"Gelée de Wharton", mag:"faible", l:"Œdème de la gelée, cordon épais", meta:"diabète maternel, hydrops",
    cr:"La gelée de Wharton est œdémateuse (cordon épais)" },
  { k:"hematomeCordon", g:"Gelée de Wharton", mag:"moyen",
    l:"Hématome funiculaire avec organisation, lignes de Zahn ou polynucléaires",
    meta:"sans les trois : artefact [ernst, ch. 36]",
    cr:"On note un hématome funiculaire avec organisation, lignes de Zahn ou polynucléaires" },

  /* — Inflammation — réponse fœtale — */
  { k:"phlebiteOmb", g:"Inflammation — réponse fœtale", mag:"moyen",
    l:"Phlébite ombilicale (polynucléaires dans la paroi veineuse)", meta:"FIR stade 1 ; RIF 1 du gabarit de CR",
    cr:"On note la présence d'une inflammation polynucléaire neutrophile de la média de la veine ombilicale (RIF 1)." },
  { k:"arteriteOmb", g:"Inflammation — réponse fœtale", mag:"moyen",
    l:"Artérite ombilicale, une artère", meta:"FIR stade 2 ; RIF 2 du gabarit de CR",
    cr:"On note la présence d'une inflammation polynucléaire neutrophile de la média de la veine ombilicale et d'une artère ombilicale (RIF 2)." },
  { k:"arteriteDeux", g:"Inflammation — réponse fœtale", mag:"moyen",
    l:"Artérite ombilicale, deux artères (trois vaisseaux atteints)",
    meta:"FIR stade 2 chez Amsterdam (veine et une ou plusieurs artères) ; le gabarit de CR l'écrit RIF 3, " +
         "qu'Amsterdam réserve à la funisite nécrosante",
    cr:"On note la présence d'une inflammation polynucléaire neutrophile de la média des 3 vaisseaux (RIF 3)." },
  { k:"funisiteNecro", g:"Inflammation — réponse fœtale", mag:"moyen",
    l:"Funisite nécrosante, extension à la gelée de Wharton",
    meta:"FIR stade 3 Amsterdam ; dans les stades 1–2 chez Van Hoeven",
    cr:"On note une funisite nécrosante, étendue à la gelée de Wharton" },

  /* — Méconium — */
  { k:"meconiumWharton", g:"Méconium", mag:"fort", l:"Macrophages méconiaux dans la gelée de Wharton",
    meta:"plus tardif que les membranes ; « many hours »",
    cr:"La gelée de Wharton contient des macrophages chargés de méconium" },
  { k:"myonecrose", g:"Méconium", mag:"fort", l:"Nécrose de la paroi vasculaire, périphérique, adjacente à la gelée",
    meta:"méconium, < 1 % des placentas méconiaux",
    cr:"On note une nécrose des myocytes de la média de l'un des vaisseaux (MAVM)." }
];

/* ── Associations — affichées, jamais cochées ─────────────────────────────── */
var DIAGS = [
  { k:"fir", l:"Réponse inflammatoire fœtale (funisite)", min:1,
    signes:["phlebiteOmb","arteriteOmb","arteriteDeux","funisiteNecro"],
    stop:" — Amsterdam : phlébite → artérite → funisite nécrosante ; Van Hoeven met la gelée de Wharton DANS les " +
         "stades 1–2 : les deux échelles se croisent. Le gabarit de CR numérote RIF 1 à 3 par nombre de vaisseaux " +
         "atteints, alors qu'Amsterdam met la veine et une ou plusieurs artères au stade 2 et réserve le stade 3 à la " +
         "funisite nécrosante : nommer l'échelle. Absente si la mort a précédé la chorioamniotite ; la média " +
         "pycnotique du fœtus mort mime les polynucléaires. La vasculite des vaisseaux de la plaque choriale se lit " +
         "sur la grille parenchyme." },

  { k:"cordonComplication", l:"Complication funiculaire", min:2,
    signes:["striction","hypertorsion","thromboseOmb","hematomeCordon","cordonGrele","vaisseauxMembraneux","variceOmb","aou"],
    stop:" — 80 % des thromboses ombilicales ont une autre complication du cordon. L'index de spiralisation : le " +
         "seuil de pathologie d'un auteur (0,3/cm) est dix fois plus bas que la normale d'un autre (2–2,5/cm), " +
         "19 % de discordance artère/veine, 69 % de variation le long du cordon. L'artère unique exige la " +
         "circonférence complète et une coupe loin de l'insertion. Un hématome sans organisation, lignes de Zahn " +
         "ni polynucléaires est un artefact ; chercher ponction, amniocentèse, transfusion. Vasa praevia ne se " +
         "lit pas sur la pièce." },

  { k:"meconium", l:"Exposition prolongée au méconium (cordon)", min:1,
    signes:["meconiumWharton","myonecrose"],
    stop:" — 1–3 h contre 24–48 h : la profondeur de pénétration ORDONNE, elle ne date pas. Le fer positif tranche " +
         "l'hémosidérine ; un bleu de Prusse négatif n'affirme pas le méconium (la bile se colore mal). Le fœtus " +
         "très immature ne défèque pas — avec les deux modèles opposés du corpus. Myonécrose : < 1 % des placentas " +
         "méconiaux, « many hours ». Le méconium de la gelée est plus tardif que celui des membranes, qui se lit " +
         "sur la grille membranes. La nécrose vasculaire post-mortem du cordon ne se confond pas avec la myonécrose " +
         "au méconium, périphérique et adjacente à la gelée [benirschke, ch. 16]." }
];

/* ── Négatifs obligatoires — déduits des signes ───────────────────────────── */
var NEGATIFS = [
  { k:"troisVaisseaux", signe:"aou", l:"Trois vaisseaux du cordon confirmés sur coupe à circonférence complète",
    p:"Hyrtl fabrique une fausse artère unique près de l'insertion",
    ko:"artère ombilicale unique PRÉSENTE — retenue sur coupe à circonférence complète, ≥ 5 cm de l'insertion" },
  { k:"clamp", signe:"clampMarque", l:"Segment de cordon sans marque de clamp ni de ponction", p:"[ernst, ch. 36]",
    ko:"cordon prélevé sur clamp ou ponction — hématome et hémorragie périvasculaire non interprétables" },
  { k:"geste", signe:"gesteInstrumental",
    l:"Gestes instrumentaux et prélèvements fœtaux exclus (ponction, amniocentèse, transfusion, extraction)",
    p:"ils produisent hémorragie intravillositaire et hématomes",
    ko:"gestes NON exclus — hématome du cordon et hémorragie intravillositaire ne se disent pas spontanés" }
];

/* ── Techniques ───────────────────────────────────────────────────────────── */
var TECHNIQUES = [
  { k:"gram", l:"Gram tissulaire, frottis de plaque choriale", q:"infection bactérienne — à adresser en microbiologie" }
];

/* ── Propositions de techniques — déduites des clics, jamais imposées ─────── */
function suggerer(){
  var s = {};
  function vu(){ for (var i = 0; i < arguments.length; i++) if (E.signes[arguments[i]] === POS) return true; return false; }
  if (vu("funisiteNecro", "arteriteOmb", "arteriteDeux")) s.gram = 1;
  return s;
}

/* ── Contrôles propres au cordon ──────────────────────────────────────────── */
async function testsOrgane(chk, clic, set, crTient, pause){
  function pose(k, v){ if (E.signes[k] !== v) clic("les", k, v); }
  function ote(k){ if (E.signes[k]) clic("les", k, E.signes[k]); }
  function tenue(k){ return associations().some(function(a){ return a.d.k === k && a.tenu; }); }

  /* Rien ne se perd : les 14 signes Cordon de la v1, clés inchangées */
  chk("v1 : les 14 signes du cordon", ["aou","phlebiteOmb","arteriteOmb","funisiteNecro","thromboseOmb","myonecrose",
      "hematomeCordon","striction","cordonGrele","oedemeCordon","meconiumWharton","vaisseauxMembraneux","variceOmb",
      "hypertorsion"].every(function(k){ return !!par(SIGNES, k); }));
  chk("sans rétention ni maturation : sections masquées", $("secRetention").hidden && $("secMaturation").hidden);

  /* Réponse fœtale : la phlébite seule la tient ; RIF 1 du gabarit au CR */
  pose("phlebiteOmb", POS);
  chk("phlébite : réponse fœtale tenue", tenue("fir"));
  chk("phlébite : phrase RIF 1 rédigée", crTient("de la média de la veine ombilicale (RIF 1)."));
  ote("phlebiteOmb");
  pose("arteriteDeux", POS);
  chk("trois vaisseaux : phrase RIF 3 et Gram proposé", crTient("des 3 vaisseaux (RIF 3).") && suggerer().gram === 1);
  ote("arteriteDeux");

  /* Cadre répondu Non : la phrase normale du gabarit */
  var iI = groupes().indexOf("Inflammation — réponse fœtale");
  signesDe("Inflammation — réponse fœtale").forEach(function(x){ ote(x.k); });
  clic("grp", iI, "non");
  chk("inflammation Non : RIF 0 rédigé", crTient("Absence de processus inflammatoire funiculaire (RIF 0)."));
  clic("grp", iI, "non");

  /* Artère unique : négatif déduit, phrase du gabarit */
  pose("aou", NEG);
  chk("trois vaisseaux énoncés", etatNegatif(par(NEGATIFS, "troisVaisseaux")) === "ok");
  pose("aou", POS);
  chk("artère unique : négatif en défaut et phrase", etatNegatif(par(NEGATIFS, "troisVaisseaux")) === "ko" &&
      crTient("(artère ombilicale unique)."));
  ote("aou");

  /* Complication funiculaire : deux signes */
  pose("striction", POS);
  chk("complication : un signe ne suffit pas", !tenue("cordonComplication"));
  pose("thromboseOmb", POS);
  chk("complication : deux signes la tiennent", tenue("cordonComplication"));
  ote("striction"); ote("thromboseOmb");

  /* Divergences portées, jamais arbitrées */
  chk("RIF 3 du gabarit ≠ stade 3 d'Amsterdam", par(DIAGS, "fir").stop.indexOf("réserve le stade 3") >= 0 &&
      par(SIGNES, "arteriteDeux").meta.indexOf("RIF 3") >= 0);
  chk("Van Hoeven porté", par(DIAGS, "fir").stop.indexOf("Van Hoeven") >= 0);
  chk("méconium : ordonne, ne date pas", par(DIAGS, "meconium").stop.indexOf("ORDONNE") >= 0);
  chk("média pycnotique : variante sous la réponse fœtale", par(VARIANTES, "mediaPycnotique").g === "Inflammation — réponse fœtale");

  /* Le nom se déduit des signes — il ne se coche pas */
  chk("aucun bouton ne porte un diagnostic",
      DIAGS.every(function(d){ return !document.querySelector('[data-act="les"][data-k="' + d.k + '"]'); }));
  /* FOETO : aucun terme tagué verbatim pour le placenta — rien de branché */
  chk("FOETO : aucun signe branché", FOETOV === null && SIGNES.every(function(x){ return !x.fv && !x.foeto; }));
}
