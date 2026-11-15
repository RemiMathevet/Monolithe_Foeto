/* Grille de lecture — placenta : MEMBRANES LIBRES (rouleau). VERSION 1.0.0.
   Une des quatre grilles qui remplacent placenta.js (1.0.1) : cordon, membranes,
   parenchyme, marges (Rémi, 14/11). La v1 reste publiée tant que les quatre n'ont pas
   été validées à l'usage. Singleton seulement : les gémellaires viendront plus tard.
   Ce qui change par rapport à placenta.js, sans rien retrancher :
   · patron ordre de lecture (rein 3.5.0, poumon 2.1.0) : mode présence, cadres lus du
     faible au fort grossissement (mag, savoir de pratique [expérience], à valider à
     l'usage), contexte hors lame avant la lame, variantes dans le cadre qu'elles miment,
     négatifs déduits, blocs lus ;
   · les 20 signes de la section Membranes de la v1 sont ici, clés inchangées ; le foyer de
     polynucléaires au site de rupture (section Marge de la v1) y entre, car le site de
     rupture est au centre du rouleau, loin du bord placentaire ;
   · le gabarit de CR (placenta_cr_fusionné.html) apporte cinq constats sans signe en v1 :
     polynucléaires de la caduque seule (son stade 1), macrophages méconiaux très nombreux
     (MFM+), plasmocytes nombreux (déciduite marquée), effusions de sang frais du chorion ;
     ses phrases vont en cr / crNon ;
   · les négatifs méconium, durée du travail, site de rupture et nombre de rouleaux se
     déduisent ; le négatif chorionicité (si grossesse multiple) devient une technique tant
     que la grille reste au singleton ;
   · aucun terme FOETO n'est tagué verbatim pour le placenta : pas de branchement fv.
   Fond : ~/Bureau/fiches_lecture/diffusion/fiche_placenta.md (§1 à §9).
   Les divergences entre sources sont PORTÉES dans les champs, jamais arbitrées. */

/* 1.1.0 (2026-11-14) — lot FOETO, propositions relues par Kimi K3.1 Pro et vérifiées par script
   (verbatim mot pour mot dans la fiche) : 2 fenêtre(s) de terme — le « Non » en bloc ne répond plus
   un signe daté hors de sa fenêtre (seul : un par un) ; 0 code(s) FOETO existant(s) branché(s)
   (variantes, rétention, stades, mesures, associations) ; 17 code(s) créé(s) depuis le verbatim de la
   fiche. Les propositions jugées faibles ou fausses attendent le tri de Rémi. */
var ORGANE  = "placenta_membranes";
var TITRE   = "placenta — membranes libres";
var SOURCE  = "fiche_placenta.md";
var MODULE  = "grille_placenta_membranes";
var VERSION = "1.1.0";
var SCHEMA  = "0.3.0";   /* 0.3.0 : signes present/absent, négatifs déduits */
var ETATS   = "presence";
var PAIR    = false;
var BLOCS   = true;
var LECTURE = true;      /* cadres (CADRES), grossissement (mag), variantes dans leur cadre */

var TITRE_CR    = "PLACENTA — MEMBRANES";
var STADE_TITRE = "";

/* Sans rétention ici (section masquée) : la datation se lit sur la grille parenchyme. */
var KCL_TXT = "Fœticide par KCl déclaré — la mort est datée par le geste.";
var RETARD_NOTE = "";
var AVANCE_NOTE = "";
var TECH_NOTE = "Les pointillés sont des propositions déduites des clics, jamais des prescriptions.";

/* ── 01 · Prélèvement ─────────────────────────────────────────────────────── */
var PRELEV = [
  { k:"rouleau", g:"Qualifie la lecture", l:"Rouleau de membranes, du point de rupture au bord placentaire", grave:true,
    manque:"sans rouleau complet, ni chorionicité, ni athérose pariétale, ni stade de chorioamniotite : « from the " +
           "rupture edge to the placental margin » [amsterdam]" }
];

/* Rétention, stades, mesure : sans objet sur les membranes (sections masquées). */
var RETENTION = [];
var STADES    = [];
var MESURE    = null;

/* ── Variantes — chacune dans le cadre dont elle mime un signe ─────────────── */
var VARIANTES = [
  { k:"metaplasie", g:"Amnios et chorion", l:"Métaplasie malpighienne de l'amnios (jusqu'à 60 % des placentas à terme, près du cordon)" },
  { k:"kystes", g:"Amnios et chorion", l:"Kystes amniotiques" },
  { k:"vacuolLaeve", g:"Amnios et chorion", l:"Trophoblaste extravilleux vacuolisé du chorion lisse (lipides, pinocytose)" },
  { k:"muscleParietal", g:"Caduque — vaisseaux et inflammation chronique",
    l:"Muscle lisse dans les vaisseaux de la caduque pariétale (non remodelés)" },
  { k:"lymphoDecid", g:"Caduque — vaisseaux et inflammation chronique",
    l:"Lymphocytes et cellules NK épars dans la caduque (le plasmocyte, lui, n'est pas normal)" }
];

/* ── Cadres, dans l'ordre de lecture du rouleau ──────────────────────────────
   Faible : les feuillets (amnios, chorion) ; moyen : la réponse maternelle ; puis la
   caduque et ses vaisseaux ; fort : les macrophages méconiaux. */
var CADRES = [
  { g:"Contexte hors lame — macroscopie, dossier obstétrical", hors:true },
  { g:"Amnios et chorion", sur:"Membranes",
    crNon:"L'amnios et le chorion sont d'aspect normal." },
  { g:"Inflammation aiguë — réponse maternelle", sur:"Membranes",
    crNon:"Les membranes sont libres d'infiltrat inflammatoire polynucléaire." },
  { g:"Caduque — vaisseaux et inflammation chronique", sur:"Membranes",
    crNon:"La caduque et ses vaisseaux sont sans particularité." },
  { g:"Méconium", sur:"Membranes",
    crNon:"Absence de macrophage chargé de méconium dans les membranes." }
];

/* ── Signes — des constats, jamais un nom de maladie ──────────────────────── */
var H = "Contexte hors lame — macroscopie, dossier obstétrical";
var INF = "Inflammation aiguë — réponse maternelle", CAD = "Caduque — vaisseaux et inflammation chronique";

var SIGNES = [
  /* — Contexte hors lame — */
  { k:"travailProlonge", fv:"FOETO:PP.PLA-MAL-055", g:H, l:"Travail de plus de 12 h", meta:"11 % d'infection amniotique si < 6 h, 75 % si > 12 h",
    cr:"Le travail a duré plus de 12 heures" },
  { k:"rpmProlongee", fv:"FOETO:PP.PLA-MAL-056", g:H, l:"Rupture des membranes depuis plus d'une semaine",
    meta:"l'inflammation n'est plus présente, la fibrose reste [vogel, ch. 9]",
    cr:"Les membranes étaient rompues depuis plus d'une semaine" },
  { k:"meconiumMacro", g:H, l:"Membranes teintées ou liquide méconial (macroscopie)",
    meta:"sur un placenta immature, la teinte verte tient plus souvent à l'hématoïdine ou à l'hémosidérine [benirschke, ch. 1]",
    cr:"Les membranes sont imprégnées de méconium en macroscopie" },

  /* — Amnios et chorion — */
  { k:"brides", g:"Amnios et chorion", mag:"faible", l:"Brides ou feuillets amniotiques ; chorion nodosum",
    cr:"On note des brides ou des feuillets amniotiques, ou un chorion nodosum" },
  { k:"collageneDense", fv:"FOETO:PP.PLA-INF-046", g:"Amnios et chorion", mag:"faible", l:"Dépôt collagène dense sans inflammation",
    meta:"RPM > 1 semaine : l'inflammation est partie, la fibrose reste",
    cr:"Le chorion est le siège d'un dépôt collagène dense, sans inflammation" },
  { k:"pseudokyste", g:"Amnios et chorion", mag:"faible", l:"Pseudokyste du chorion lisse, îlots de fibrinoïde à cellules X",
    meta:"preuve insuffisante pour la MVM [amsterdam]",
    cr:"On note un pseudokyste du chorion lisse, avec des îlots de fibrinoïde à cellules X" },
  { k:"hemorragieMembranes", g:"Amnios et chorion", mag:"faible",
    l:"Effusions de sang frais disséquant le chorion cellulaire du chorion fibreux",
    cr:"Le chorion cellulaire est souvent disséqué du chorion fibreux par de multiples effusions de sang frais." },
  { k:"amniosNodosum", seul:true, g:"Amnios et chorion", mag:"moyen",
    l:"Amnios nodosum : nodules de vernix PAS et bleu alcian positifs, non kératinisés",
    cr:"On note un amnios nodosum : nodules de vernix non kératinisés" },
  { k:"amniosDegenere", g:"Amnios et chorion", mag:"moyen",
    l:"Amnios vacuolisé, hérissé, nécrosé (méconium prolongé, laparoschisis)", meta:"mime une surcharge",
    cr:"L'amnios est vacuolisé, hérissé, par places nécrosé" },

  /* — Inflammation aiguë — réponse maternelle — */
  { k:"microabces", fv:"FOETO:PP.PLA-INF-047", g:INF, mag:"faible", l:"Polynucléaires confluents ou microabcès sous-choriaux", meta:"MIR grade 2",
    cr:"On note des polynucléaires confluents, en microabcès sous-choriaux" },
  { k:"ruptureFoyer", fv:"FOETO:PP.PLA-INF-048", g:INF, mag:"faible", l:"Foyer intense de polynucléaires au site de rupture",
    meta:"ne signe pas une infection ascendante",
    cr:"On note un foyer intense de polynucléaires au site de rupture" },
  { k:"pnnDecidue", g:INF, mag:"moyen", l:"Polynucléaires dans la caduque, sans extension au chorion ni nécrose de l'amnios",
    meta:"stade 1 du gabarit de CR ; le stade 1 d'Amsterdam (sous-chorionite, chorionite) et celui de Blanc " +
         "(intervillite sous-choriale) commencent ailleurs",
    cr:"Les membranes présentent un infiltrat inflammatoire principalement polynucléaire neutrophile non altéré de la décidue sans extension au chorion ni nécrose de l'amnios (chorioamniotite stade 1)." },
  { k:"sousChorionite", fv:"FOETO:PP.PLA-INF-049", g:INF, mag:"moyen", l:"Polynucléaires maternels dans le fibrinoïde sous-chorial / chorionite",
    meta:"MIR stade 1 Amsterdam = stade 1–2 de Blanc",
    cr:"On note des polynucléaires maternels dans le fibrinoïde sous-chorial ou le chorion (chorionite)" },
  { k:"chorioamniotite", fv:"FOETO:PP.PLA-INF-050", g:INF, mag:"moyen", l:"Polynucléaires dans le chorion fibreux et/ou l'amnios",
    meta:"MIR stade 2 Amsterdam = stade 3 de Blanc ; stade 2 du gabarit de CR",
    cr:"Les membranes présentent un infiltrat inflammatoire principalement polynucléaire neutrophile non altéré de la décidue avec de multiples extensions au chorion sans nécrose de l'amnios (chorioamniotite stade 2)." },
  { k:"necrosante", fv:"FOETO:PP.PLA-INF-051", g:INF, mag:"moyen",
    l:"Chorioamniotite nécrosante : caryorrhexis des polynucléaires, nécrose amniocytaire, membrane basale hyperéosinophile",
    meta:"MIR stade 3 — n'existe pas chez Blanc ; stade 3 du gabarit de CR",
    cr:"Les membranes présentent un infiltrat inflammatoire principalement polynucléaire neutrophile non altéré de la décidue et du chorion avec de multiples plages de nécrose de l'amnios (chorioamniotite stade 3)." },
  { k:"migrationAmnios", fv:"FOETO:PP.PLA-INF-052", g:INF, mag:"fort", l:"Polynucléaires en migration vers l'amnios (sens de la chimiotaxie)",
    meta:"un foyer au site de rupture n'est pas une ascension",
    cr:"Les polynucléaires migrent vers l'amnios" },

  /* — Caduque — vaisseaux et inflammation chronique — */
  { k:"thromboseDeciduale", fv:"FOETO:PP.PLA-VAS-063", g:CAD, mag:"faible", l:"Thrombose récente d'une artère déciduale", meta:"item francophone de l'athérose",
    cr:"On note une thrombose récente d'une artère déciduale" },
  { k:"necroseDeciduale", fv:"FOETO:PP.PLA-VAS-064", g:CAD, mag:"faible", l:"Nécrose déciduale membraneuse", meta:"preuve insuffisante pour la MVM [amsterdam]",
    cr:"La décidue capsulaire présente de multiples plages de nécrose basale." },
  { k:"atherose", fv:"FOETO:PP.PLA-VAS-065", g:CAD, mag:"moyen", l:"Athérose aiguë déciduale : nécrose fibrinoïde, macrophages spumeux, vaisseau dilaté",
    cr:"On note une athérose aiguë des vaisseaux déciduaux : nécrose fibrinoïde, macrophages spumeux" },
  { k:"muscularisation", fv:"FOETO:PP.PLA-VAS-066", seul:true, g:CAD, mag:"moyen", l:"Muscularisation persistante des artérioles spiralées (défaut de remodelage)",
    meta:"en caduque pariétale le muscle lisse est normal (§ 4.2) : c'est son épaisseur relative qui devient lésionnelle",
    cr:"Les artérioles spiralées gardent une musculature (défaut de remodelage)" },
  { k:"hypertrophieMurale", g:CAD, mag:"moyen",
    l:"Hypertrophie murale des vaisseaux déciduaux, paroi > 1/3 de la circonférence",
    meta:"formulation dimensionnellement fautive, partagée par deux sources",
    cr:"Les vaisseaux déciduaux ont une paroi épaissie (hypertrophie murale)" },
  { k:"lymphocytesT", fv:"FOETO:PP.PLA-INF-053", g:CAD, mag:"moyen", l:"Infiltrat lymphocytaire T péri-artériel décidual",
    cr:"On note un infiltrat lymphocytaire péri-artériel dans la caduque" },
  { k:"deciduitePlasmo", fv:"FOETO:PP.PLA-MAL-057", g:CAD, mag:"fort", l:"Plasmocytes dans la caduque (déciduite plasmocytaire)",
    cr:"On note la présence de quelques plasmocytes au sein de la décidue basale (déciduite chronique)." },
  { k:"deciduitePlasmoNombreux", g:CAD, mag:"fort", l:"Plasmocytes nombreux dans la caduque",
    cr:"On note la présence de nombreux plasmocytes au sein de la décidue basale (déciduite chronique marquée)." },
  { k:"hemosiderine", fv:"FOETO:PP.PLA-MET-033", g:CAD, mag:"technique", l:"Hémosidérine dans les membranes (bleu de Prusse positif)",
    cr:"La décidue capsulaire présente de multiples sidérophages." },

  /* — Méconium — */
  { k:"meconiumAmnios", fv:"FOETO:PP.PLA-MAL-058", g:"Méconium", mag:"fort", l:"Macrophages méconiaux dans l'amnios",
    cr:"On note des macrophages chargés de méconium dans l'amnios" },
  { k:"meconiumChorion", g:"Méconium", mag:"fort", l:"Macrophages méconiaux dans le chorion et la caduque capsulaire",
    cr:"Les membranes présentent quelques macrophages chargés de méconium épars au chorion (MFM)." },
  { k:"meconiumNombreux", g:"Méconium", mag:"fort", l:"Macrophages méconiaux très nombreux dans le chorion",
    cr:"Les membranes présentent de très nombreux macrophages chargés de méconium épars au chorion (MFM+)." }
];

/* ── Associations — affichées, jamais cochées ─────────────────────────────── */
var DIAGS = [
  { k:"mir", l:"Réponse inflammatoire maternelle (chorioamniotite aiguë)", min:1,
    signes:["sousChorionite","chorioamniotite","necrosante","microabces","migrationAmnios"],
    stop:" — un stade sans le nom de l'école est ininterprétable : le stade 3 de Blanc est le stade 2 d'Amsterdam, " +
         "la nécrose n'existe pas chez Blanc, et vogel compte des régions et des granulocytes par champ. Le gabarit " +
         "de CR numérote ses stades sans école, et son stade 1 (caduque seule) n'est ni celui d'Amsterdam ni celui " +
         "de Blanc. Travail > 12 h : 75 % d'infection amniotique — un confondeur, pas un facteur de risque. Le foyer " +
         "du site de rupture ne signe pas l'ascension ; le méconium inhibe les polynucléaires, et sa causalité est " +
         "divergente. Sur macéré, l'infiltrat chorial basal maternel est présent dans 66 % des cas. La plaque " +
         "choriale se lit sur la grille parenchyme, la réponse fœtale sur les grilles cordon et parenchyme." },

  { k:"meconium", l:"Exposition prolongée au méconium (membranes)", min:2,
    signes:["meconiumAmnios","meconiumChorion","meconiumNombreux","amniosDegenere"],
    stop:" — 1–3 h contre 24–48 h : la profondeur de pénétration ORDONNE, elle ne date pas. Le fer positif tranche " +
         "l'hémosidérine ; un bleu de Prusse négatif n'affirme pas le méconium (la bile se colore mal). Le fœtus " +
         "très immature ne défèque pas — avec les deux modèles opposés du corpus. Myonécrose : < 1 % des placentas " +
         "méconiaux, « many hours » — elle se lit sur la grille cordon." },

  { k:"oligoamnios", l:"Amnios nodosum — oligoamnios prolongé", cle:"amniosNodosum", min:1,
    signes:["amniosNodosum","collageneDense"],
    stop:" — le nodule est du vernix (PAS, bleu alcian) ; il n'existe pas tôt : oligoamnios à 16 SA et amnios " +
         "normal, absent à 600 g / 27 semaines. Ne pas confondre avec la métaplasie malpighienne (kératinisation " +
         "focale, placenta mature, près du cordon). Rare sur le cordon ; le jumeau monoamniotique est protégé." },

  { k:"arteriopathie", l:"Artériopathie déciduale — athérose, défaut de remodelage", cle:"atherose", min:1,
    signes:["atherose","muscularisation","hypertrophieMurale","thromboseDeciduale","lymphocytesT"],
    stop:" — le seuil mural diamètre > 1/3 de la circonférence est dimensionnellement fautif, et deux sources " +
         "indépendantes le partagent ; trois formulations dans un même chapitre. Sur 53 placentas, quatre athéroses " +
         "n'ont été vues qu'après revue des QUATRE rouleaux. Identique en caduque pariétale, basale ou lit " +
         "placentaire — la plaque basale se lit sur la grille parenchyme. Le muscle lisse pariétal est normal : " +
         "c'est l'épaisseur relative qui devient lésionnelle." }
];

/* ── Négatifs obligatoires — déduits des signes ou des données consignées ──── */
var NEGATIFS = [
  { k:"travail", signe:"travailProlonge", l:"Durée du travail connue, 12 h ou moins",
    p:"11 % d'infection amniotique si < 6 h, 75 % si > 12 h",
    ko:"travail de plus de 12 h — le taux de chorioamniotite est confondu" },
  { k:"meconium", l:"Présence ou absence de méconium énoncée", p:"il inhibe les polynucléaires",
    ko:"méconium NON énoncé — l'infiltrat et son absence sont biaisés",
    auto:function(){ return E.signes.meconiumAmnios || E.signes.meconiumChorion ? true : null; } },
  { k:"siteRupture", l:"Site de rupture des membranes situé par rapport au rouleau",
    p:"un foyer intense au site de rupture ne signe pas l'ascension",
    ko:"site de rupture NON situé — le foyer du rouleau n'est pas interprétable",
    auto:function(){ return E.prelev.rouleau ? true : E.signes.ruptureFoyer === POS ? false : null; } },
  { k:"nbRouleaux", l:"Nombre de rouleaux de membranes examinés écrit (blocs lus)",
    p:"l'athérose dépend du nombre de rouleaux",
    ko:"nombre de rouleaux NON écrit — une athérose absente n'est pas qualifiée",
    auto:function(){ return E.blocs.length ? true : E.signes.atherose === NEG ? false : null; } }
];

/* ── Techniques ───────────────────────────────────────────────────────────── */
var TECHNIQUES = [
  { k:"gram",      l:"Gram tissulaire, frottis de plaque choriale", q:"infection bactérienne — à adresser en microbiologie" },
  { k:"perls",     l:"Bleu de Prusse (Perls)", q:"hémosidérine contre méconium — le fer positif tranche, le négatif n'affirme rien" },
  { k:"pasAlcian", l:"PAS et bleu alcian", q:"nodules de vernix de l'amnios nodosum" },
  { k:"rouleaux",  l:"Rouleaux de membranes supplémentaires", q:"athérose vue dans 4 cas sur 53 seulement après les 4 rouleaux" },
  { k:"chorionicite", l:"Rouleau ou coupe en T de la cloison, test de clivabilité — grossesse multiple",
    q:"chorionicité et méthode qui l'a établie : le nombre de feuillets est la donnée divergente" }
];

/* ── Propositions de techniques — déduites des clics, jamais imposées ─────── */
function suggerer(){
  var s = {};
  function vu(){ for (var i = 0; i < arguments.length; i++) if (E.signes[arguments[i]] === POS) return true; return false; }
  if (vu("hemosiderine", "meconiumChorion", "meconiumAmnios", "meconiumNombreux")) s.perls = 1;
  if (vu("chorioamniotite", "necrosante", "microabces")) s.gram = 1;
  if (vu("amniosNodosum")) s.pasAlcian = 1;
  if (vu("atherose", "muscularisation", "hypertrophieMurale")) s.rouleaux = 1;
  if (etatNegatif(par(NEGATIFS, "nbRouleaux")) === "ko") s.rouleaux = 1;
  return s;
}

/* ── Contrôles propres aux membranes ──────────────────────────────────────── */
async function testsOrgane(chk, clic, set, crTient, pause){
  function pose(k, v){ if (E.signes[k] !== v) clic("les", k, v); }
  function ote(k){ if (E.signes[k]) clic("les", k, E.signes[k]); }
  function tenue(k){ return associations().some(function(a){ return a.d.k === k && a.tenu; }); }

  /* Rien ne se perd : les 20 signes Membranes de la v1 et le foyer du site de rupture */
  chk("v1 : les signes des membranes", ["sousChorionite","chorioamniotite","necrosante","microabces","migrationAmnios",
      "meconiumAmnios","meconiumChorion","amniosDegenere","amniosNodosum","atherose","muscularisation",
      "hypertrophieMurale","thromboseDeciduale","lymphocytesT","deciduitePlasmo","necroseDeciduale","hemosiderine",
      "collageneDense","brides","pseudokyste","ruptureFoyer"].every(function(k){ return !!par(SIGNES, k); }));
  chk("sans rétention ni maturation : sections masquées", $("secRetention").hidden && $("secMaturation").hidden);

  /* Réponse maternelle : stade 2 du gabarit au CR, Gram proposé */
  pose("chorioamniotite", POS);
  chk("chorioamniotite : réponse maternelle tenue", tenue("mir") && suggerer().gram === 1);
  chk("chorioamniotite : phrase du stade 2 rédigée", crTient("sans nécrose de l'amnios (chorioamniotite stade 2)."));
  ote("chorioamniotite");
  /* La caduque seule ne tient pas la réponse maternelle (on part d'un état voulu) */
  par(DIAGS, "mir").signes.forEach(ote);
  pose("pnnDecidue", POS);
  chk("caduque seule : pas de réponse maternelle", !tenue("mir"));
  ote("pnnDecidue");

  /* Site de rupture : sans rouleau orienté, le foyer n'est pas interprétable */
  if (E.prelev.rouleau) clic("prelev", "rouleau");
  pose("ruptureFoyer", POS);
  chk("foyer du site de rupture sans rouleau : négatif en défaut", etatNegatif(par(NEGATIFS, "siteRupture")) === "ko");
  clic("prelev", "rouleau");
  chk("rouleau orienté : négatif énoncé", etatNegatif(par(NEGATIFS, "siteRupture")) === "ok");
  clic("prelev", "rouleau");
  ote("ruptureFoyer");

  /* Durée du travail : signe hors lame, négatif déduit */
  pose("travailProlonge", NEG);
  chk("travail ≤ 12 h : négatif énoncé", etatNegatif(par(NEGATIFS, "travail")) === "ok");
  pose("travailProlonge", POS);
  chk("travail > 12 h : confondeur nommé", crTient("! travail de plus de 12 h"));
  ote("travailProlonge");

  /* Athérose : le pivot ; sans blocs lus, une athérose absente n'est pas qualifiée */
  pose("muscularisation", POS);
  chk("artériopathie sans athérose ne tient pas", !tenue("arteriopathie") && suggerer().rouleaux === 1);
  pose("atherose", POS);
  chk("artériopathie tenue sur l'athérose", tenue("arteriopathie"));
  ote("muscularisation");
  var blocs = $("blocs").value;
  set("blocs", "");
  pose("atherose", NEG);
  chk("athérose absente sans rouleaux comptés : négatif en défaut", etatNegatif(par(NEGATIFS, "nbRouleaux")) === "ko");
  ote("atherose");
  set("blocs", blocs);

  /* Méconium : présence ou absence énoncée ; phrase MFM du gabarit */
  pose("meconiumChorion", POS);
  chk("méconium énoncé et phrase MFM", etatNegatif(par(NEGATIFS, "meconium")) === "ok" &&
      crTient("épars au chorion (MFM)."));
  ote("meconiumChorion");

  /* Divergences portées, jamais arbitrées */
  chk("chorioamniotite : écoles", par(DIAGS, "mir").stop.indexOf("Blanc") >= 0 && par(DIAGS, "mir").stop.indexOf("vogel") >= 0);
  chk("méconium : ordonne, ne date pas", par(DIAGS, "meconium").stop.indexOf("ORDONNE") >= 0);
  chk("hypertrophie murale : seuil fautif porté", par(DIAGS, "arteriopathie").stop.indexOf("dimensionnellement fautif") >= 0);

  chk("aucun bouton ne porte un diagnostic",
      DIAGS.every(function(d){ return !document.querySelector('[data-act="les"][data-k="' + d.k + '"]'); }));
  /* 1.1.0 : codes créés depuis le verbatim de la fiche (lot FOETO) — les signes branchés exportent leur code */
  chk("FOETO 1.1 : 17 signe(s) codé(s) depuis le verbatim", SIGNES.filter(function(x){ return /^FOETO:PP\.PLA-/.test(x.foeto || ""); }).length === 17);
}
