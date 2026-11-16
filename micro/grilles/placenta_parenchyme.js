/* Grille de lecture — placenta : PARENCHYME (blocs pleine épaisseur, plaque choriale → plaque basale). VERSION 1.0.0.
   Une des quatre grilles qui remplacent placenta.js (1.0.1) : cordon, membranes,
   parenchyme, marges (Rémi, 14/11). La v1 reste publiée tant que les quatre n'ont pas
   été validées à l'usage. Singleton seulement : les gémellaires viendront plus tard.
   Ce qui change par rapport à placenta.js, sans rien retrancher :
   · patron ordre de lecture (rein 3.5.0, poumon 2.1.0) : mode présence, cadres lus du
     faible au fort grossissement (mag, savoir de pratique [expérience], à valider à
     l'usage), contexte hors lame avant la rétention, variantes dans le cadre qu'elles
     miment, négatifs déduits, blocs lus ;
   · les sections Parenchyme sous cordon et Parenchyme systémique de la v1 sont fondues :
     un bloc pleine épaisseur se lit de haut en bas — plaque choriale, vaisseaux fœtaux,
     parenchyme villeux, plaque basale. Clés inchangées. Le patron vasculaire magistral,
     lu sur la face fœtale, passe au contexte hors lame ;
   · la rétention (quatre seaux de Genest II, tous les critères de la v1, cordon compris),
     la maturation (Vogel) et les deux comptes (nœuds, capillaires) restent ici ;
   · le gabarit de CR (placenta_cr_fusionné.html) apporte sept constats sans signe en v1 :
     trois stades d'infiltrat de la plaque choriale, NIDF, calcifications augmentées,
     kystes d'inclusion trophoblastiques, aspect d'abruptus et plasmocytes de la plaque
     basale ; ses phrases vont en cr / crNon ;
   · les négatifs se déduisent : d'un signe (gestes) ou d'une donnée consignée. Délai de
     fixation, site des nœuds et table de poids deviennent des critères de prélèvement ;
     la réserve compté en bordure de lésion, que la v1 attachait à une option
     inexistante, se lit sur le site des nœuds ;
   · aucun terme FOETO n'est tagué verbatim pour le placenta : pas de branchement fv.
   Fond : ~/Bureau/fiches_lecture/diffusion/fiche_placenta.md (§1 à §9) et
          fiche_retention.md §5 (les quatre seaux de Genest II).
   Le placenta n'a pas UN référentiel : Amsterdam pour les lésions, Vogel pour la maturation,
   Genest pour la rétention, et les seuils francophones à côté. Les divergences sont PORTÉES
   dans les champs, jamais arbitrées ; l'observation s'entre avant son barème. */

/* 1.1.0 (2026-11-14) — lot FOETO, propositions relues par Kimi K3.1 Pro et vérifiées par script
   (verbatim mot pour mot dans la fiche) : 3 fenêtre(s) de terme — le « Non » en bloc ne répond plus
   un signe daté hors de sa fenêtre (seul : un par un) ; 0 code(s) FOETO existant(s) branché(s)
   (variantes, rétention, stades, mesures, associations) ; 51 code(s) créé(s) depuis le verbatim de la
   fiche. Les propositions jugées faibles ou fausses attendent le tri de Rémi. */
/* 1.1.1 (2026-11-15) — tri des propositions du lot jugées faibles ou fausses par Kimi, relues sur la
   fiche et vérifiées par script : 2 fenêtre(s) de terme, 2 code(s) créé(s), 9 branché(s) sur un
   code existant ; 2 proposition(s) rejetée(s) (le signe garde son comportement). */
/* (même version) — reprise sur consignes de Rémi : un signe descriptif porte un terme descriptif,
   la gradation ou le diagnostic se déduisent et leur code passe sur l'association ; un code NOR décrit
   le normal (codes mal typés renumérotés) ; pancréas absent et réduit séparés. */
/* 1.1.2 (2026-11-16) — confrontation aux termes FOETO tagués verbatim que la grille ne portait pas :
   codes posés sur des signes et variantes existants, variantes et signes nouveaux, codes
   interprétatifs sur les associations ; codes NOR qui décrivent une lésion renumérotés. Les
   synonymes et codes secondaires attendent la passe de fusion FOETO. */
var ORGANE  = "placenta_parenchyme";
var TITRE   = "placenta — parenchyme";
var SOURCE  = "fiche_placenta.md";
var MODULE  = "grille_placenta_parenchyme";
var VERSION = "1.1.2";
var SCHEMA  = "0.3.0";   /* 0.3.0 : signes present/absent, négatifs déduits */
var ETATS   = "presence";
var PAIR    = false;
var BLOCS   = true;
var LECTURE = true;      /* cadres (CADRES), grossissement (mag), variantes dans leur cadre */

var TITRE_CR    = "PLACENTA — PARENCHYME";
var STADE_TITRE = "Type villositaire dominant (Vogel, Table 1.2 — GW lues en SA)";

var KCL_TXT = "Fœticide par KCl déclaré — la mort est datée par le geste. Les quatre seaux de Genest " +
              "ne servent plus à dater, seulement à vérifier que la lame est compatible avec l'intervalle déclaré.";

/* Le retard de maturation d'Amsterdam repose sur les membranes vasculo-syncytiales — qui
   diminuent avec le délai avant fixation [benirschke, ch. 6]. */
var RETARD_NOTE = "Un défaut de membranes vasculo-syncytiales mesure en partie la logistique : le collapsus " +
                  "capillaire après la délivrance les réduit. Sans délai délivrance→fixation énoncé, le retard " +
                  "de maturation se décrit, il ne se conclut pas.";

/* L'avance est la lésion la plus portée — et présente chez un tiers des témoins normaux. */
var AVANCE_NOTE = "« Maturation accélérée » : 32,4 % d'une série de 1 022 grossesses eutrophiques à terme sans " +
                  "facteur de risque [vogel, ch. 8, Table 8.2]. Sur un fœtus retenu, la rétention fabrique " +
                  "le trépied entier (nœuds ↑, villosités avasculaires, cytotrophoblaste continu) [keeling, ch. 4].";

var TECH_NOTE = "Les pointillés sont des propositions déduites des clics, jamais des prescriptions. " +
                "Un placenta se lit en multi-référentiels : chaque seuil cité porte sa source et son unité.";

/* ── 01 · Prélèvement — le minimum consensuel d'Amsterdam, plus les gestes francophones ── */
var Q = "Qualifie la lecture", M = "Critères de coupe — iront à la grille macro fixée";
var PRELEV = [
  { k:"blocs3",     g:Q, l:"Trois blocs pleine épaisseur dans les deux tiers centraux", grave:true,
    manque:"3 blocs = 62 % des villites, 6–7 blocs = 85 % [amsterdam] ; en dessous de trois, tout négatif " +
           "multifocal perd son sens" },
  { k:"insertion",  g:Q, l:"Un bloc adjacent au site d'insertion du cordon", grave:true,
    manque:"c'est le bloc qui documente l'ectasie vasculaire fœtale et les réponses inflammatoires fœtale et " +
           "maternelle [amsterdam]" },
  { k:"transmural", g:Q, l:"Épaisseur > cassette : tiers supérieur + tiers inférieur, ou cinquième bloc",
    manque:"la DVH se lit sur les deux tiers inférieurs comparés au tiers sous-chorial : sans la pleine " +
           "épaisseur, le critère est amputé" },
  { k:"normales",   g:Q, l:"Zones normales prélevées, pas seulement les lésions",
    manque:"« it is not desirable to take only abnormal areas » [benirschke, ch. 1] — un bloc dépensé sur un " +
           "infarctus typique est retiré au dépistage des lésions multifocales" },
  { k:"basalTang",  g:Q, l:"Bloc tangentiel de la face maternelle, parallèle à la basale",
    manque:"« en-face blocks of the basal plate often yield more decidual spiral arteries » [keeling, ch. 4] — " +
           "geste [soffoet, ch. 15] hors Amsterdam, qui sert l'athérose" },
  { k:"delaiFixation", g:Q, l:"Délai délivrance → fixation et mode de fixation consignés",
    manque:"le collapsus capillaire après la délivrance réduit les membranes vasculo-syncytiales [benirschke, ch. 6] : " +
           "sans délai énoncé, le retard de maturation se décrit, il ne se conclut pas" },
  { k:"siteNoeuds", g:Q, l:"Nœuds comptés sur des coupes centrales sans lésion macroscopique, hors bordure de lésion",
    manque:"« areas adjacent to infarcts should not be relied on » [amsterdam] — kappa au plus mauvais sur les presque normaux" },
  { k:"poids",      g:M, l:"Poids net qualifié frais / fixé, sans cordon ni membranes",
    manque:"fixation : +3 à 6 % [amsterdam] ; poids net = cordon coupé à ≈ 5 cm, membranes parées [vogel, ch. 2]" },
  { k:"tablePoids", g:M, l:"Table de poids et échelle du terme nommées",
    manque:"un percentile sans sa table ne dit rien : Amsterdam demande des tables locales, vogel est la seule percentilée" },
  { k:"caryo",      g:M, l:"Caryotype prélevé sur la plaque choriale, à frais, avant le reste",
    manque:"« le chorion (plaque choriale) est l'élément qui se développera le mieux en culture après mort " +
           "fœtale » [soffoet, ch. 15]" },
  { k:"congele",    g:M, l:"Fragment congelé",
    manque:"« Un fragment de placenta peut être congelé pour d'éventuelles études ultérieures » [soffoet, ch. 15]" }
];

/* ── 02 · Rétention — les quatre seaux de Genest II, pas une heure ─────────── */
var MODIF = "témoin de réfrigération [Genest II] : aucun des quinze critères n'apparaît sur un placenta de " +
            "nouveau-né vivant réfrigéré 14 jours — un délai de fixation n'explique pas ces signes";

var RETENTION = [
  { k:"karyoIntravasc", l:"Caryorrhexis intravasculaire villositaire", b:"≥ 6 h",
    d:"sens. 0,935 · spéc. 1,000 · kappa 0,896", h:6, q:"bon",
    note:"le premier seau ; 0 cas sur 15 en dessous de 6 h, 29 sur 31 au-delà [Genest II]. C'est aussi ce " +
         "qu'Amsterdam appelle VSK : sur un mort-né, ne pas la compter comme malperfusion fœtale", alerte:MODIF },
  { k:"lumMultifocal",  l:"Anomalies luminales des vaisseaux souches, multifocales (10–25 %)", b:"≥ 48 h",
    d:"sens. 0,944 · spéc. 1,000", h:48, q:"bon",
    note:"septation fibroblastique, oblitération — les mêmes images que l'oblitération de vaisseau souche de la " +
         "FVM : au-delà de 48 h, « global changes of FVM must be interpreted with caution » [khong2019, ch. 25]",
    alerte:MODIF },
  { k:"lumEtendu",      l:"Anomalies luminales des vaisseaux souches, étendues (> 25 %)", b:"≥ 14 j",
    d:"sens. 0,777 · spéc. 0,976 · kappa 0,539", h:336, q:"moyen",
    note:"reproductibilité discutable entre deux lecteurs [Genest II]", alerte:MODIF },
  { k:"fibroseEtendue", l:"Fibrose étendue des villosités terminales (> 25 % avasculaires, hyalinisées)", b:"≥ 14 j",
    d:"sens. 1,000 · spéc. 0,928 · VPP 0,750", h:336, q:"moyen",
    note:"le troisième seau ; sensible, moins spécifique — c'est aussi le stade terminal de la FVM et de la " +
         "villite avec oblitération", alerte:MODIF },
  { k:"microcalcif",    l:"Microcalcification stromale poussiéreuse", b:"≥ 24 h",
    d:"sens. 0,478", h:24, q:"mauvais",
    note:"mauvais prédicteur : une sensibilité de 0,478 ne date rien seule [Genest II]" },
  { k:"whartonNecrose", l:"Nécrose de la gelée de Wharton", b:"≥ 48 h", d:"sens. 0,733 · spéc. 0,843", h:48, q:"mauvais",
    note:"mauvais prédicteur ; et la perte de turgescence biaise longueur ET diamètre du cordon [keeling, ch. 4] — " +
         "se lit sur la lame de cordon" },
  { k:"mbTropho",       l:"Épaississement / minéralisation de la membrane basale trophoblastique", b:"≥ 48 h",
    d:"sens. 0,333", h:48, q:"mauvais",
    note:"artefact de macération [keeling, ch. 15] souvent porté comme lésion ; sensibilité 0,333" },
  { k:"cordonVascNecrose", l:"Nécrose vasculaire du cordon", b:"≥ 7 j", d:"sens. 0,600 · spéc. 1,000", h:168, q:"moyen",
    note:"spécifique, peu sensible ; ne pas la confondre avec la myonécrose au méconium, périphérique et " +
         "adjacente à la gelée [benirschke, ch. 16] — se lit sur la lame de cordon" },
  { k:"mediaPycnotique", l:"Noyaux pycnotiques et plissés de la média ombilicale", b:"—", d:"non datable seule", h:0, q:"mauvais",
    note:"« mimicking neutrophils » [ernst, ch. 36] — mime une funisite, ne date rien ; se lit sur la lame de cordon" }
];

/* ── 03 · Maturation — la seule table datée du corpus, [vogel, ch. 1] Table 1.2 ── */
/* Type dominant par champ moyen grossissement. Les bornes sont reconstruites depuis la table :
   ce sont des repères, pas des seuils. Nomenclature à quatre types (vogel) — benirschke et
   ernst en comptent cinq, les colonnes ne se superposent pas terme à terme. */
var STADES = [
  { k:"immatDom",   l:"Intermédiaires immatures (centrales) dominantes > 50 %, souches ≈ 20 %, pas de terminales", max:22 },
  { k:"matureDeb",  l:"Intermédiaires matures ≈ 50 %, immatures > 30 %, terminales < 10 %", max:26 },
  { k:"matureDom",  l:"Intermédiaires matures > 50 %, immatures < 20 %, terminales ≈ 20 %", max:30 },
  { k:"termMontee", l:"Intermédiaires matures ≥ 40 %, terminales 30–40 %, MVS 10–15 %", max:38,
    note:"[ernst, ch. 36] place le croisement terminales / intermédiaires matures à 32 SA ; [vogel] entre 36 et " +
         "40 — quatre semaines d'écart, non arbitré" },
  { k:"termDom",    l:"Terminales dominantes (< 60 %), intermédiaires matures > 30 %, MVS ≈ 40 %", max:99,
    note:"les unités circulatoires fœto-maternelles n'existent pas avant 32 SA : leur absence avant n'est pas " +
         "une lésion [vogel, ch. 2]" }
];

/* ── 03 bis · Les deux comptes — nœuds syncytiaux et capillaires ─────────────
   Le compte est une observation ; le barème est l'interprétation qui vient après. */
var MESURE = {
  titre:"Nœuds syncytiaux et capillaires par villosité terminale",
  defLabel:"barème des nœuds déclaré",
  optLabel:"coloration du compte capillaire",
  defs:[{ k:"amsterdam",  l:"Amsterdam : > 33 % des villosités, hors péri-infarctus" },
        { k:"khong",      l:"khong2019 : > 30 %, deux tiers inférieurs des sections centrales" },
        { k:"benirschke", l:"benirschke : > 20 % avant 34 SA, > 30 % de 100 villosités au terme" }],
  opts:[{ k:"hes",  l:"HES" },
        { k:"cd34", l:"CD34" }],
  champs:[{ id:"noeuds",      label:"Villosités portant un nœud (%)", min:0, max:100, step:1 },
          { id:"capillaires", label:"Capillaires par villosité terminale (max compté)", min:0, max:40, step:1 }]
};

function seuilNoeuds(bareme, sa){
  if (bareme === "amsterdam")  return { s:33, l:"> 33 % [amsterdam]" };
  if (bareme === "khong")      return { s:30, l:"> 30 % des deux tiers inférieurs [khong2019, ch. 17]" };
  if (sa != null && sa < 34)   return { s:20, l:"> 20 % avant 34 SA [benirschke, ch. 19]" };
  return { s:30, l:"> 30 % de 100 villosités [benirschke, ch. 19]" };
}

function verdictMesure(){
  var n = E.mesure.v.noeuds, cap = E.mesure.v.capillaires, sa = num("sa");
  var t = [], cls = "", res = [];
  if (n == null && cap == null) return { cls:"", txt:"Nœuds et capillaires non comptés — les deux comptes restent ouverts." };

  if (n != null){
    var B = ["amsterdam", "khong", "benirschke"].map(function(b){ var s = seuilNoeuds(b, sa); return { k:b, s:s.s, l:s.l }; });
    var hauts = B.filter(function(b){ return n > b.s; }), bas = B.filter(function(b){ return n <= b.s; });
    var tn = "Nœuds : " + n + " % des villosités (normal mesuré au terme : 28 % [khong2019, ch. 17]).";
    if (!E.mesure.def){
      tn += " Barème non déclaré — le compte est consigné, l'interprétation reste ouverte : ";
      if (!hauts.length) tn += "sous les trois seuils.";
      else if (!bas.length){ tn += "au-dessus des trois seuils."; cls = "warn"; }
      else { tn += "augmenté selon " + hauts.map(function(b){ return b.l; }).join(" et ") + ", pas selon " +
                   bas.map(function(b){ return b.l; }).join(" ni ") + " — les barèmes ne s'accordent pas ici, déclarer lequel on retient."; cls = "warn"; }
    } else {
      var ref = par(B, E.mesure.def);
      tn += " Barème retenu : " + ref.l + " — " + (n > ref.s ? "nœuds AUGMENTÉS." : "nœuds non augmentés.");
      if (n > ref.s) cls = "warn";
      if (hauts.length && bas.length) tn += " Les trois barèmes divergent sur ce compte.";
    }
    tn += " Kappa 0,25 à 0,60 selon l'entraînement, le plus mauvais sur les placentas presque normaux [khong2019, ch. 17].";
    t.push(tn);
    /* v1 : la réserve « bordure » dépendait d'une option jamais proposée ; elle se lit sur le site déclaré. */
    if (!E.prelev.siteNoeuds) res.push("site des coupes des nœuds non déclaré — « areas adjacent to infarcts should not be relied on » [amsterdam]");
    if (RETENTION.some(function(r){ return E.retention[r.k] === "present"; }))
      res.push("rétention présente : elle fabrique les nœuds augmentés [keeling, ch. 4] — décrire, ne pas conclure");
    if (!E.prelev.blocs3) res.push("trois blocs centraux non confirmés — le dénominateur des nœuds est la section centrale sans lésion macroscopique");
  }

  if (cap != null){
    var tc = "Capillaires : " + cap + " par villosité terminale.";
    if (E.mesure.opt === "hes")
      tc += cap > 10 ? " En HES, > 10 = chorangiose selon Altshuler [benirschke, ch. 30] — mais 8–15 est la normale au CD34 : compte à confirmer en CD34 avant de nommer."
                     : " En HES, ≤ 10 : sous le seuil d'Altshuler (6 à 8 au terme [lherminecoulomb]).";
    else if (E.mesure.opt === "cd34")
      tc += cap > 15 ? " Au CD34, > 15 dépasse la fourchette normale non chorangiosique (8–15) [benirschke, ch. 30]."
                     : " Au CD34, dans la fourchette normale 8–15 [benirschke, ch. 30] — une chorangiose HES peut disparaître ici, et la source le dit.";
    else { tc += " Coloration non déclarée — le compte est consigné ; le seuil HES (> 10) tombe à l'intérieur de la normale CD34 (8–15) : la coloration décide, pas le chiffre."; if (!cls) cls = "warn"; }
    if (cap > 10 && E.mesure.opt === "hes" && !cls) cls = "warn";
    t.push(tc);
  }
  if (res.length){ if (cls !== "bad") cls = "warn"; t.push("Réserves : " + res.join(" ; ") + "."); }
  return { cls:cls || "ok", txt:t.join(" ") };
}

/* ── Cadres, dans l'ordre de lecture d'un bloc pleine épaisseur ───────────────
   De haut en bas : plaque choriale, vaisseaux fœtaux (de la plaque aux souches et aux
   villosités), puis le parenchyme — d'abord ce qui se voit au faible grossissement
   (infarctus, fibrine, dysplasie mésenchymateuse, nodules capillaires), ensuite au moyen
   (villite, maturation), au fort (œdème, érythroblastes, surcharge) — et la plaque basale
   pour finir le balayage. crNon = phrase du CR quand le cadre est répondu Non. */
var H  = "Contexte hors lame — macroscopie, dossier";
var PC = "Plaque choriale — toit et inflammation";
var VF = "Vaisseaux fœtaux — malperfusion fœtale";
var MM = "Malperfusion maternelle — infarctus et villosités distales";
var FI = "Fibrine et calcifications de la chambre intervilleuse";
var PM = "Dysplasie mésenchymateuse et trophoblaste";
var CA = "Capillaires villositaires — chorangiose, chorangiome";
var IN = "Inflammation villositaire et intervilleuse";
var MA = "Maturation villositaire";
var OE = "Œdème, érythroblastes et surcharge";
var PB = "Plaque basale";

var CADRES = [
  { g:H, hors:true },
  { g:PC, sur:"Plaque choriale",
    crNon:"La plaque choriale et le toit de la chambre intervilleuse sont sans particularité." },
  { g:VF, sur:"Parenchyme villeux",
    crNon:"Les vaisseaux allanto-choriaux et souches sont sans particularité, sans villosité avasculaire." },
  { g:MM, sur:"Parenchyme villeux",
    crNon:"Pas d'infarctus ; les villosités distales sont de morphologie normale." },
  { g:FI, sur:"Parenchyme villeux",
    crNon:"La fibrine périvillositaire et les calcifications ne sont pas augmentées." },
  { g:PM, sur:"Parenchyme villeux",
    crNon:"Pas de villosité souche kystique ni de prolifération trophoblastique." },
  { g:CA, sur:"Parenchyme villeux",
    crNon:"Pas de villosité hypervascularisée ni de nodule capillaire." },
  { g:IN, sur:"Parenchyme villeux",
    crNon:"Pas de villite ; l'espace intervilleux est libre d'inflammation." },
  { g:MA, sur:"Parenchyme villeux",
    crNon:"Les villosités sont de maturation conforme au terme." },
  { g:OE, sur:"Parenchyme villeux",
    crNon:"Pas d'œdème villositaire, d'excès d'érythroblastes ni de vacuole de surcharge." },
  { g:PB, sur:"Plaque basale",
    crNon:"La plaque basale est sans particularité." }
];

/* ── Variantes — chacune dans le cadre dont elle mime un signe ─────────────── */
var VARIANTES = [
  { k:"vitellin",       g:PC, l:"Reliquat du sac vitellin (plaque blanche sous-amniotique)" },
  { k:"coussinMyxoide", fv:"FOETO:PP.PLA-NOR-053", g:VF, l:"Coussin myxoïde intimal d'un vaisseau chorial, sans fibrine ni calcification" },
  { k:"fibrinoides",    fv:"FOETO:PP.PLA-NOR-168", g:FI, l:"Fibrinoïde de Langhans (sous-chorial), de Rohr et de Nitabuch" },
  { k:"fibrineMarge",   fv:"FOETO:PP.PLA-NOR-066", g:FI, l:"Fibrine périvillositaire < 10 %, autour des souches, en sous-chorial et au bord" },
  { k:"calcifBasales",  fv:"FOETO:PP.PLA-NOR-025", g:FI, l:"Calcifications du tiers basal, physiologiques à terme" },
  { k:"kystes",         g:PM, l:"Kystes amniotiques et kystes des septa" },
  { k:"cellulesX",      fv:"FOETO:PP.PLA-NOR-181", g:PM, l:"Îlots de trophoblaste extravilleux (cellules X) dans la chambre intervilleuse" },
  { k:"congestion",     fv:"FOETO:PP.PLA-VAS-002", g:CA, l:"Congestion villositaire (vaisseaux distendus, non multipliés — diabète maternel)" },
  { k:"trophoNitabuch", fv:"FOETO:PP.PLA-NOR-179", g:PB, l:"Trophoblaste extravilleux au-delà de Nitabuch" },
  { k:"remodelageT2",   fv:"FOETO:PP.AUP-NOR-000", g:PB, l:"Artérioles partiellement remodelées au deuxième trimestre" },
  { k:"lymphoDecid",    fv:"FOETO:PP.DBA-NOR-000", g:PB, l:"Lymphocytes et cellules NK épars dans la caduque (le plasmocyte, lui, n'est pas normal)" },
  { k:"bourgeonsSyncytiaux", fv:"FOETO:PP.PLA-NOR-021", g:MM, l:"Bourgeons syncytiaux, première étape d'une villosité nouvelle : ne se comptent pas comme nœuds" },
  { k:"pontsSyncytiaux", fv:"FOETO:PP.PLA-NOR-144", g:MM, l:"Ponts syncytiaux entre villosités voisines, artefacts de coupe tangentielle dans 80 % des cas" },
  { k:"fauxNoeuds", fv:"FOETO:PP.PAR-RET-004", g:MM, l:"Faux nœuds syncytiaux de coupe tangentielle (chromatine euchromatique), sans valeur de maturation" },
  { k:"capillairesFocaux", g:CA, l:"Capillaires focalement augmentés au contact d'une villite ou d'un foyer de FVM : ne comptent pas pour la chorangiose" },
  { k:"viImmatures", fv:"FOETO:PP.PLA-NOR-192", g:MA, l:"Villosités intermédiaires immatures (cytotrophoblaste sur plus de la moitié de la circonférence, stroma réticulaire) en proportion conforme au terme" },
  { k:"capillairesCollabes", fv:"FOETO:PP.PAR-RET-003", g:MA, l:"Capillaires villositaires collabés après la délivrance : MVS réduites sans valeur de maturation (délai de fixation)" },
  { k:"stromaReticulaire", fv:"FOETO:PP.PLA-NOR-170", g:OE, l:"Stroma réticulaire à canaux liquidiens et cellules de Hofbauer des villosités intermédiaires immatures" }
];

/* ── Signes — des constats, jamais un nom de maladie ──────────────────────── */
var SIGNES = [
  /* — Contexte hors lame — */
  { k:"magistral", fv:"FOETO:PP.PLA-VAS-067", g:H, l:"Patron vasculaire magistral de la plaque choriale (gros vaisseaux non dichotomiques)",
    cr:"Les vaisseaux de la plaque choriale suivent un patron magistral (gros vaisseaux non dichotomiques)" },
  { k:"gesteInstrumental", g:H,
    l:"Geste instrumental ou obstétrical (aspiration, extraction manuelle difficile, césarienne, ponction de sang fœtal, amniocentèse, transfusion in utero)",
    cr:"Notion de geste instrumental ou obstétrical (aspiration, extraction, césarienne, ponction ou transfusion)" },

  /* — Plaque choriale — toit et inflammation — */
  { k:"amniosDecolle", g:PC, mag:"faible", l:"Amnios décollé de la plaque choriale", meta:"traction sur le cordon au 3e stade — artefact",
    cr:"On note un décollement partiel de l'amnios" },
  { k:"langhansExces", fv:"FOETO:PP.PLA-INF-064", g:PC, mag:"faible", l:"Fibrinoïde sous-chorial de Langhans épais, chorioamnion épaissi",
    meta:"faux négatif géométrique : l'inflammation « will not be seen » [khong2019, ch. 13]",
    cr:"Le fibrinoïde sous-chorial de Langhans est épais, le chorioamnion épaissi" },
  { k:"pchoSousChorionite", fv:"FOETO:PP.PLA-INF-054", g:PC, mag:"moyen",
    l:"Polynucléaires dans le toit de la chambre intervilleuse (fibrinoïde sous-chorial), sans extension au chorion",
    meta:"intervillite sous-choriale = stade 1 de Blanc ; sous-chorionite = stade 1 d'Amsterdam",
    cr:"Le toit de la chambre intervilleuse présente un infiltrat inflammatoire à contingent principalement polynucléaire neutrophile souvent englué de fibrine, sans extension au chorion (stade 1)." },
  { k:"pchoChorionite", fv:"FOETO:PP.PCH-INF-002", g:PC, mag:"moyen", l:"Polynucléaires étendus au chorion de la plaque choriale",
    meta:"chorionite = stade 2 de Blanc, stade 1 d'Amsterdam (stade 2 dès le chorion fibreux ou l'amnios)",
    cr:"Le toit de la chambre intervilleuse présente un infiltrat inflammatoire à contingent principalement polynucléaire neutrophile souvent englué de fibrine, avec de multiples extensions au chorion (stade 2)." },
  { k:"pchoNecrose", fv:"FOETO:PP.PLA-INF-051", g:PC, mag:"moyen", l:"Polynucléaires étendus au chorion avec nécrose",
    meta:"nécrose = stade 3 d'Amsterdam ; elle n'existe pas dans l'échelle de Blanc",
    cr:"Le toit de la chambre intervilleuse présente un infiltrat inflammatoire à contingent principalement polynucléaire neutrophile souvent englué de fibrine, avec de multiples extensions au chorion et de la nécrose (stade 3)." },
  { k:"vasculiteChoriale", fv:"FOETO:PP.PLA-VAS-068", g:PC, mag:"moyen", l:"Vasculite des vaisseaux de la plaque choriale",
    meta:"FIR stade 1 ; deux vaisseaux = un seul coupé tangentiellement ? La funisite se lit sur la grille cordon",
    cr:"On note un infiltrat inflammatoire à polynucléaires neutrophiles au sein de la média de quelques gros vaisseaux allanto-choriaux." },
  { k:"infiltratChorialBasal", fv:"FOETO:PP.PLA-INF-055", g:PC, mag:"moyen", l:"Infiltrat granulocytaire maternel bien limité de la plaque choriale basale",
    meta:"≈ 66 % des MFIU macérées — pas une chorioamniotite [vogel, ch. 14]",
    cr:"On note un infiltrat granulocytaire maternel bien limité de la plaque choriale basale" },
  { k:"hematomeSousChorial", fv:"FOETO:PP.PLA-VAS-016", g:PC, mag:"faible", l:"Hématome sous-chorial : sang lamellé et fibrine entre plaque choriale et chambre intervilleuse",
    meta:"thrombohématome kystique en différentiel ; la môle de Breus en est l'aspect macroscopique massif",
    cr:"On note un hématome sous-chorial, fait de sang lamellé et de fibrine sous la plaque choriale" },
  { k:"histiocytesChorion", fv:"FOETO:PP.PLA-INF-015", g:PC, mag:"moyen", l:"Histiocytes en bande à la base du chorion de la plaque choriale",
    meta:"hyperplasie histiocytaire chorionique : signification inconnue [khong2019, ch. 13]",
    cr:"On note une bande d'histiocytes à la base du chorion de la plaque choriale" },
  { k:"chorialDenude", fv:"FOETO:PP.PLA-MET-031", g:PC, mag:"moyen", l:"Surface choriale dénudée d'amnios, infiltrée de macrophages volumineux",
    meta:"amnios absent de longue date (rupture, brides) ; sans réaction cellulaire, c'est l'amnios décollé par traction",
    cr:"La surface choriale est dénudée d'amnios et infiltrée de macrophages volumineux" },

  /* — Vaisseaux fœtaux — malperfusion fœtale — */
  { k:"ectasie", fv:"FOETO:PP.PLA-VAS-082", g:VF, mag:"faible", l:"Ectasie d'un vaisseau chorial ou souche ≥ 4 fois le diamètre des vaisseaux voisins",
    meta:"seul seuil chiffré, absent d'Amsterdam",
    cr:"On note une ectasie d'un vaisseau chorial ou souche (au moins 4 fois le diamètre des vaisseaux voisins)" },
  { k:"thrombusChorial", fv:"FOETO:PP.PAR-VAS-020", g:VF, mag:"faible",
    l:"Thrombus d'un vaisseau chorial : récent (fibrine adhérente), en organisation (néo-intima), organisé, ancien (calcifié)",
    meta:"le seul signe de FVM qui ne se fabrique pas après la mort",
    cr:"On note un thrombus d'un vaisseau chorial" },
  { k:"thrombusSouche", fv:"FOETO:PP.PLA-VAS-046", g:VF, mag:"faible", l:"Thrombus mural ou occlusif d'un vaisseau souche",
    cr:"On note un thrombus mural ou occlusif d'un vaisseau souche" },
  { k:"foyersLarges", fv:"FOETO:PP.PLA-VAS-083", g:VF, mag:"faible",
    l:"Foyers larges d'avascularité, cumul ≥ 45 villosités sur 3 sections ou > 15 par section",
    meta:"haut grade Amsterdam ; khong2019 abandonne le dénominateur",
    cr:"On note de larges foyers de villosités avasculaires (cumul d'au moins 45 villosités sur 3 sections)" },
  { k:"hemorragieIntravill", fv:"FOETO:PP.PLA-VAS-069", g:VF, mag:"faible", l:"Hémorragie intravillositaire",
    meta:"aussi produite par aspiration, extraction manuelle, césarienne",
    cr:"On note une hémorragie intravillositaire" },
  { k:"fibrineIntramurale", fv:"FOETO:PP.PLA-MET-034", g:VF, mag:"moyen", l:"Dépôt de fibrine intramural sous-endothélial (non occlusif par définition)",
    meta:"isolé (1–2) : signification incertaine",
    cr:"On note un dépôt de fibrine intramural sous-endothélial, non occlusif" },
  { k:"coussinFibrine", fv:"FOETO:PP.PLA-VAS-070", g:VF, mag:"moyen", l:"Coussin myxoïde intimal AVEC fibrine ou calcification",
    cr:"On note un coussin myxoïde intimal avec fibrine ou calcification" },
  { k:"obliterationSouche", fv:"FOETO:PP.PLA-VAS-028", g:VF, mag:"moyen", l:"Oblitération de vaisseau souche : septation fibroblastique, sclérose de collapsus",
    cr:"On note une oblitération de vaisseau souche (septation fibroblastique, sclérose de collapsus)" },
  { k:"avascTrophoVivant", fv:"FOETO:PP.PLA-VAS-071", g:VF, mag:"moyen", l:"Villosités avasculaires à trophoblaste VIVANT (lésion « inside out »)",
    meta:"le critère positif de FVM — le sépare de l'infarctus",
    cr:"On note des villosités avasculaires à trophoblaste vivant" },
  { k:"foyersPetits", fv:"FOETO:PP.PLA-VAS-072", g:VF, mag:"moyen", l:"Petits foyers de villosités avasculaires (< 5 villosités par foyer)",
    meta:"patron global — pas le grade",
    cr:"On note la présence de multiples foyers de villosités complètement sclérosées (VTF)." },
  { k:"vsk", fv:"FOETO:PP.PLA-VAS-073", g:VF, mag:"fort", l:"Caryorrhexis stromale-vasculaire villositaire (VSK)", meta:"post-mortem dès 6 h : le premier seau de Genest",
    cr:"De multiples villosités non systématisées présentent une caryorrhexie vaso-stromale." },

  /* — Malperfusion maternelle — infarctus et villosités distales — */
  { k:"infarctus", fv:"FOETO:PP.PLA-VAS-074", g:MM, mag:"faible",
    l:"Infarctus : collapsus de la chambre intervilleuse ET perte de basophilie du trophoblaste, jusqu'aux « ghost villi »",
    meta:"ne s'organise jamais ; tout infarctus compte avant terme, > 5 % non périphérique à terme",
    cr:"On note un infarctus villositaire : chambre intervilleuse collabée, trophoblaste sans basophilie" },
  { k:"dvh", fv:"FOETO:PP.PLA-MAL-060", g:MM, mag:"faible", l:"Hypoplasie villositaire distale : terminales rares, fines, allongées, deux tiers inférieurs",
    meta:"≥ 30 % d'une lame pleine épaisseur ; focal/diffus = nombre de lames",
    cr:"On note de multiples plages d'hypoplasie villositaire distale (HVD)." },
  { k:"matAcceleree", terme:[null, 32], fv:"FOETO:PP.PLA-MAL-061", g:MM, mag:"faible",
    l:"Villosités d'aspect terme pour le terme, nœuds ↑, fibrine intervilleuse, alternant avec des plages de paucité",
    meta:"32,4 % des témoins normaux [vogel]",
    cr:"On note de multiples plages d'hypoplasie villositaire distale avec importante accélération de la maturation villositaire (AMV)." },
  { k:"agglutination", fv:"FOETO:PP.PLA-MAL-062", g:MM, mag:"moyen", l:"Villosités agglutinées par la fibrine (2 à 20), touchant d'autres villosités",
    meta:"« villi should not ever be directly touching »",
    cr:"On note des villosités agglutinées par la fibrine" },
  { k:"noeudsAugmentes", fv:"FOETO:PP.PAR-NOR-001", g:MM, mag:"moyen", l:"Nœuds syncytiaux augmentés (≥ 5 noyaux, bombant), hors bordure de lésion",
    meta:"voir le compte de la maturation",
    cr:"On note de multiples plages d'hypoplasie villositaire distale avec augmentation diffuse du nombre d'amas nucléaires syncytiotrophoblastiques (ANSCT)." },
  { k:"minéralisationMB", g:MM, mag:"fort", l:"Minéralisation de la membrane basale trophoblastique",
    meta:"artefact de macération — mime l'épaississement de la membrane basale du trépied",
    cr:"La membrane basale trophoblastique est minéralisée (artefact de macération)" },

  /* — Fibrine et calcifications de la chambre intervilleuse — */
  { k:"fibrineEIVconserve", fv:"FOETO:PP.PLA-MAL-064", g:FI, mag:"faible",
    l:"Fibrinoïde périvillositaire comblant l'espace, chambre intervilleuse CONSERVÉE, villosités épargnées dans la lésion",
    meta:"conservé = fibrine ; collabé = infarctus",
    cr:"La fibrine périvillositaire est diffusément augmentée sans toutefois nécroser de villosités." },
  { k:"fibrineTransmurale", fv:"FOETO:PP.PLA-VAS-084", g:FI, mag:"faible", l:"Fibrinoïde transmural, de la plaque choriale à la basale, > 50 % d'une lame",
    cr:"Le fibrinoïde périvillositaire est transmural, de la plaque choriale à la basale, sur plus de la moitié d'une lame" },
  { k:"fibrine2550", fv:"FOETO:PP.PLA-VAS-085", g:FI, mag:"faible", l:"Fibrinoïde sur 25–50 % d'une lame", meta:"« increased » (khong2019) ou « borderline » (recurrent)",
    cr:"Le fibrinoïde périvillositaire occupe 25 à 50 % d'une lame" },
  { k:"fibrineBasale3mm", fv:"FOETO:PP.PLA-VAS-086", g:FI, mag:"faible", l:"Fibrinoïde basal encastrant les villosités sur ≥ 3 mm le long du plancher",
    meta:"le seul chiffre partagé par toutes les sources",
    cr:"Le fibrinoïde basal encastre les villosités sur au moins 3 mm le long du plancher" },
  { k:"nidf", fv:"FOETO:PP.PLA-VAS-080", g:FI, mag:"faible", l:"Travées de nécrose ischémique avec dépôts de fibrine (NIDF)",
    meta:"taxonomie francophone, sans table de correspondance avec Amsterdam ; seuil > 30 % [soffoet, ch. 15]",
    cr:"On note la présence de multiples travées NIDF (nécrose ischémique avec dépôts de fibrine)." },
  { k:"calcifAugmentees", g:FI, mag:"faible", l:"Calcifications augmentées, diffuses",
    meta:"physiologiques à terme dans le tiers basal",
    cr:"On note une augmentation diffuse du nombre de calcifications." },
  { k:"calcifPoussiere", g:FI, mag:"moyen", l:"Microcalcifications stromales poussiéreuses diffuses",
    meta:"rétention (mauvais prédicteur), pas une lésion",
    cr:"On note des microcalcifications stromales poussiéreuses diffuses" },
  { k:"thrombusIntervilleux", fv:"FOETO:PP.PLA-VAS-059", g:FI, mag:"faible", l:"Thrombus intervilleux : caillot lamellé de sang et de fibrine refoulant les villosités",
    meta:"il refoule le tissu villositaire, l'infarctus le tue [benirschke, ch. 1]",
    cr:"On note un thrombus intervilleux, caillot lamellé refoulant les villosités" },
  { k:"amasTrophoFibrine", fv:"FOETO:PP.PLA-DYS-030", g:FI, mag:"moyen", l:"Amas de trophoblaste intermédiaire dans la fibrine périvillositaire, au bord d'un infarctus ou d'un hématome",
    meta:"Ki-67 quasi nul malgré l'aspect proliférant : pas un choriocarcinome [horii2018, ch. 30]",
    cr:"On note des amas de trophoblaste intermédiaire dans la fibrine périvillositaire" },

  /* — Dysplasie mésenchymateuse et trophoblaste — */
  { k:"souchesKystiques", fv:"FOETO:PP.PLA-MAL-065", g:PM, mag:"faible", l:"Villosités souches dilatées, kystiques, œdémateuses, mêlées de villosités normales",
    cr:"On note des villosités souches dilatées, kystiques, œdémateuses, mêlées de villosités normales" },
  { k:"vaisseauxTortueux", fv:"FOETO:PP.PLA-VAS-075", g:PM, mag:"faible",
    l:"Vaisseaux souches à paroi épaisse, tortueux, anévrismaux, manchons de mésenchyme lâche",
    cr:"Les vaisseaux souches sont à paroi épaisse, tortueux, anévrismaux, cernés de mésenchyme lâche" },
  { k:"citernes", fv:"FOETO:PP.PLA-MAL-066", g:PM, mag:"moyen", l:"Citernes centrales de matériel myxoïde (acide hyaluronique, bleu alcian)",
    meta:"moins nombreuses que dans la môle",
    cr:"On note des citernes centrales de matériel myxoïde" },
  { k:"trophoNormalPMD", fv:"FOETO:PP.PLA-NOR-230", g:PM, mag:"moyen", bloc:false,
    l:"Trophoblaste normal, contours lisses, sans pseudo-inclusion, sur des souches kystiques",
    meta:"le critère négatif qui écarte la môle",
    cr:"Le trophoblaste des souches kystiques est normal, à contours lisses, sans pseudo-inclusion" },
  { k:"proliferationTropho", fv:"FOETO:PP.PLA-MAL-067", g:PM, mag:"moyen", l:"Prolifération trophoblastique circonférentielle ou atypique",
    meta:"→ fiche fille 5.14 ; Ki-67 décide",
    cr:"On note une prolifération trophoblastique circonférentielle ou atypique" },
  { k:"kystesInclusionTropho", fv:"FOETO:PP.PLA-DYS-031", g:PM, mag:"moyen",
    l:"Kystes d'inclusion trophoblastiques du stroma villositaire, sans citerne ni prolifération trophoblastique",
    cr:"On note la présence de kystes d'inclusion trophoblastiques au sein du stroma de quelques villosités sans citerne ni prolifération trophoblastique anormale (KIT)." },
  { k:"p57StromaNeg", fv:"FOETO:PP.PLA-DYS-028", g:PM, mag:"technique", l:"p57KIP2 négatif dans le stroma d'au moins un sous-ensemble de villosités (IHC)",
    meta:"hétérogène = attendu (mosaïque) ; avec un trophoblaste positif, la discordance signe la PMD",
    cr:"Le p57KIP2 est négatif dans le stroma d'une partie des villosités" },
  { k:"p57TrophoConserve", fv:"FOETO:PP.PLA-DYS-032", g:PM, mag:"technique", l:"p57KIP2 conservé dans le cytotrophoblaste villositaire (IHC)",
    meta:"sépare la PMD de la môle complète, dont le trophoblaste est négatif",
    cr:"Le p57KIP2 est conservé dans le cytotrophoblaste villositaire" },
  { k:"actineStromaNeg", fv:"FOETO:PP.PLA-DYS-027", g:PM, mag:"technique", l:"Stroma des souches anormales négatif pour l'actine musculaire lisse, vimentine et desmine positives (IHC)",
    meta:"stroma resté fibroblastique : le seul argument du mot dysplasie [khong2019, ch. 16]",
    cr:"Le stroma des villosités souches anormales est négatif pour l'actine musculaire lisse, positif pour la vimentine et la desmine" },

  /* — Capillaires villositaires — */
  { k:"chorangiome", fv:"FOETO:PP.PAR-DYS-002", g:CA, mag:"faible", l:"Nodule capillaire expansif d'une souche sous-choriale, péricytes présents",
    cr:"On note un nodule capillaire expansif d'une villosité souche sous-choriale" },
  { k:"villositesRondes", fv:"FOETO:PP.PLA-VAS-076", g:CA, mag:"faible",
    l:"Villosités terminales grandes, rondes, à vascularisation proéminente au faible grossissement",
    meta:"congestion ou chorangiose : compter, ne pas juger la surface",
    cr:"Les villosités terminales sont grandes, rondes, à vascularisation proéminente" },
  { k:"capillairesSup10", fv:"FOETO:PP.PLA-VAS-087", g:CA, mag:"moyen",
    l:"Villosités terminales à > 10 capillaires, 10 villosités, 10 champs, hors zones ischémiques",
    meta:"quatre lectures d'Altshuler ; coloration à nommer",
    cr:"On note la présence de multiples foyers de villosités, principalement distales, hypervascularisées (chorangiose)." },
  { k:"pericytes", fv:"FOETO:PP.PLA-VAS-077", g:CA, mag:"fort",
    l:"Capillaires à couche de péricytes et membrane basale discontinue, villosités intermédiaires et souches",
    meta:"chorangiomatose — la chorangiose a une paroi normale",
    cr:"Les capillaires des villosités intermédiaires et souches ont une couche de péricytes et une membrane basale discontinue" },
  { k:"paroiCapillaireNormale", fv:"FOETO:PP.PLA-NOR-115", g:CA, mag:"fort", bloc:false, l:"Capillaires villositaires à membrane basale continue et bien individualisée, sans couche de péricytes",
    meta:"paroi normale : le seul critère non numérique qui sépare la chorangiose de la chorangiomatose",
    cr:"Les capillaires villositaires ont une membrane basale continue, sans couche de péricytes" },
  { k:"reticulineTreillis", fv:"FOETO:PP.PLA-VAS-090", g:CA, mag:"technique", l:"Réseau de fibres de réticuline en treillis lâche autour des capillaires proliférants (réticuline)",
    meta:"chorangiome et chorangiomatose [benirschke, ch. 30]",
    cr:"La réticuline dessine un réseau en treillis lâche autour des capillaires proliférants" },
  { k:"trophoChorangiome", fv:"FOETO:PP.PLA-TUM-006", g:CA, mag:"moyen", l:"Trophoblaste de surface multicouche, ± atypies et nécrose, bordant un chorangiome",
    meta:"conclusion recommandée : chorangioma, with associated trophoblastic proliferation — pas un choriocarcinome",
    cr:"Le chorangiome est bordé d'un trophoblaste de surface multicouche" },

  /* — Inflammation villositaire et intervilleuse — */
  { k:"villite", fv:"FOETO:PP.PLA-INF-056", g:IN, mag:"moyen", l:"Villite chronique lymphohistiocytaire, foyers < 10 villosités contiguës",
    cr:"On note la présence de multiples foyers de moins de 10 villosités dont le stroma et l'espace intervilleux adjacent présente un infiltrat inflammatoire lympho-histiocytaire (VUE bas grade)." },
  { k:"villiteLarge", fv:"FOETO:PP.PLA-INF-057", g:IN, mag:"moyen", l:"Villite chronique, ≥ 1 foyer > 10 villosités contiguës, sur > 1 coupe",
    meta:"haut grade Amsterdam ; diffus > 30 % (Amsterdam) ou > 5 % (quatre autres sources)",
    cr:"On note la présence de multiples foyers de plus de 10 villosités dont le stroma et l'espace intervilleux adjacent présente un infiltrat inflammatoire lympho-histiocytaire (VUE haut grade)." },
  { k:"villiteObliteration", fv:"FOETO:PP.PLA-INF-058", g:IN, mag:"moyen", l:"Villite avec destruction d'un vaisseau souche musculaire",
    meta:"« villitis with stem vessel obliteration »",
    cr:"La villite détruit un vaisseau souche musculaire" },
  { k:"avascAvecVillite", fv:"FOETO:PP.PLA-INF-059", g:IN, mag:"moyen", l:"Villosités avasculaires dans un placenta avec villite",
    meta:"se rapporte avec la villite, pas comme FVM",
    cr:"On note des villosités avasculaires associées à la villite" },
  { k:"intervilliteChronique", g:IN, mag:"moyen", l:"Histiocytes mononucléés dans la chambre intervilleuse (intervillite chronique)",
    cr:"L'espace intervilleux présente une inflammation, principalement histiocytaire en de multiples foyers diffus (CHI - intervillite histiocytaire chronique)." },
  { k:"pnIntervilleux", fv:"FOETO:PP.PLA-INF-060", g:IN, mag:"moyen", l:"Polynucléaires dans la chambre intervilleuse", meta:"« intervillositis » déconseillé pour ce signe",
    cr:"On note des polynucléaires dans la chambre intervilleuse" },
  { k:"perivillite", fv:"FOETO:PP.PLA-INF-061", g:IN, mag:"moyen", l:"Périvillite", meta:"12,5 % des prééclampsies ; « not evident in fetal infections »",
    cr:"On note une périvillite" },
  { k:"villitePlasmo", fv:"FOETO:PP.PLA-INF-062", g:IN, mag:"fort", l:"Villite à prédominance plasmocytaire", meta:"CMV à chercher avant de nommer une VUE",
    cr:"La villite est à prédominance plasmocytaire" },
  { k:"inclusionsVirales", g:IN, mag:"fort", l:"Inclusions virales à cytomégalovirus (en œil de hibou)",
    cr:"On note des inclusions virales à cytomégalovirus (en œil de hibou)" },
  { k:"inclusionsParvo", fv:"FOETO:PP.PLA-INF-045", g:IN, mag:"fort", l:"Inclusions intranucléaires amphophiles des normoblastes (parvovirus B19)",
    meta:"IHC parvovirus utile sur tissu autolysé",
    cr:"On note des inclusions intranucléaires amphophiles des normoblastes (parvovirus B19)" },
  { k:"cellulesAtypiquesEIV", fv:"FOETO:PP.PLA-TUM-003", g:IN, mag:"moyen", l:"Cellules atypiques non inflammatoires dans la chambre intervilleuse (blastes ou cellules tumorales maternelles)",
    meta:"leucémie ou tumeur maternelle : mime une intervillite [khong2019, ch. 31]",
    cr:"On note des cellules atypiques non inflammatoires dans la chambre intervilleuse" },

  /* — Maturation villositaire — */
  { k:"populationMonotone", fv:"FOETO:PP.PLA-VAS-078", seul:true, g:MA, mag:"moyen", l:"Population villositaire monotone (≥ 10 villosités) à capillaires centraux",
    cr:"On note une population villositaire monotone (au moins 10 villosités) à capillaires centraux" },
  { k:"mvsReduites", fv:"FOETO:PP.PLA-VAS-079", seul:true, g:MA, mag:"fort", l:"Membranes vasculo-syncytiales réduites pour le terme",
    meta:"≈ 40 % au terme ; diminuent avec le délai avant fixation",
    cr:"Les membranes vasculo-syncytiales sont réduites pour le terme" },
  { k:"cytotrophoContinu", fv:"FOETO:PP.PLA-MAL-068", seul:true, g:MA, mag:"fort", l:"Cytotrophoblaste en couche continue au-delà du terme attendu",
    cr:"Le cytotrophoblaste forme une couche continue au-delà du terme attendu" },
  { k:"intermediairesExces", fv:"FOETO:PP.PLA-MAL-084", seul:true, g:MA, mag:"moyen", l:"Villosités intermédiaires en excès pour le terme, au détriment des terminales",
    meta:"recoupe la table des stades (stade lu inférieur au terme) ; proportionnel à la gravité de l'érythroblastose [benirschke, ch. 23]",
    cr:"Les villosités intermédiaires sont en excès pour le terme, au détriment des terminales" },

  /* — Œdème, érythroblastes et surcharge — */
  { k:"oedemeDiffus", fv:"FOETO:PP.PLA-MAL-069", g:OE, mag:"faible", l:"Œdème villositaire diffus, circonférentiel, stroma pâle, trophoblaste conservé",
    meta:"patron hydrops — immun ou non",
    cr:"On note un œdème villositaire diffus, circonférentiel, à stroma pâle" },
  { k:"oedemeFocal", fv:"FOETO:PP.PLA-MAL-070", g:OE, mag:"faible", l:"Œdème villositaire focal, irrégulier, non circonférentiel, entre villosités normales",
    meta:"chercher la FVM (débris caryorrhectiques)",
    cr:"On note un œdème villositaire focal, irrégulier, entre des villosités normales" },
  { k:"hofbauer", fv:"FOETO:PP.PLA-MAL-071", g:OE, mag:"moyen", l:"Cellules de Hofbauer et canaux stromaux proéminents",
    cr:"Les cellules de Hofbauer et les canaux stromaux sont proéminents" },
  { k:"erythroblastes", fv:"FOETO:PP.PLA-MAL-072", g:OE, mag:"fort", l:"Au moins un érythroblaste dans la plupart des champs au fort grossissement",
    meta:"seuil 10 / 10 champs [ernst, ch. 36]",
    cr:"On note au moins un érythroblaste dans la plupart des champs au fort grossissement" },
  { k:"nrbcIntervilleux", fv:"FOETO:PP.PLA-MAL-073", g:OE, mag:"fort", l:"Hématies nucléées nombreuses dans la chambre intervilleuse (côté maternel)",
    meta:"hémorragie fœto-maternelle ; HbF",
    cr:"On note de nombreuses hématies nucléées dans la chambre intervilleuse" },
  { k:"vacuolesIntracell", fv:"FOETO:PP.PLA-MET-035", g:OE, mag:"fort",
    l:"Vacuoles intracellulaires vides du trophoblaste, des cellules de Hofbauer, de l'endothélium",
    meta:"intra = surcharge ; inter = œdème",
    cr:"On note des vacuoles intracellulaires vides du trophoblaste, des cellules de Hofbauer et de l'endothélium" },
  { k:"granuleuxEosino", fv:"FOETO:PP.PLA-MAL-074", g:OE, mag:"fort", l:"Matériel granuleux éosinophile intracellulaire",
    cr:"On note un matériel granuleux éosinophile intracellulaire" },
  { k:"hematopoieseStromale", fv:"FOETO:PP.PLA-MAL-083", g:OE, mag:"fort", l:"Foyers d'hématopoïèse dans le stroma villositaire, hors des lumières vasculaires",
    meta:"CD34 / CD31 pour situer le vaisseau ; marqueur de durée, absent après une hémorragie fœto-maternelle aiguë",
    cr:"On note des foyers d'hématopoïèse dans le stroma villositaire, hors des lumières vasculaires" },
  { k:"capillairesVides", fv:"FOETO:PP.PLA-VAS-032", g:OE, mag:"moyen", l:"Capillaires villositaires vides ou quasi dépourvus d'hématies fœtales",
    meta:"anémie fœtale (hémorragie fœto-maternelle, aplasie) ; le prélèvement vide aussi les capillaires",
    cr:"Les capillaires villositaires sont vides ou presque dépourvus d'hématies fœtales" },
  { k:"histiocytesFibrillaires", fv:"FOETO:PP.PLA-MET-015", g:OE, mag:"fort", l:"Histiocytes stromaux mono- et multinucléés à cytoplasme ample, fibrillaire, non vacuolaire",
    meta:"cellules de Gaucher (CD68, PAS-D, LFB) : une surcharge sans vacuole",
    cr:"Le stroma villositaire contient des histiocytes mono- et multinucléés à cytoplasme ample, fibrillaire, non vacuolaire" },
  { k:"blastesVasculaires", fv:"FOETO:PP.PLA-TUM-028", g:OE, mag:"fort", l:"Blastes, mégacaryocytes immatures et précurseurs médullaires nombreux dans les vaisseaux fœtaux villositaires",
    meta:"myéloprolifération transitoire de la trisomie 21 ; le marquage précise la lignée",
    cr:"Les vaisseaux fœtaux villositaires contiennent de nombreux blastes, mégacaryocytes immatures et précurseurs médullaires" },

  /* — Plaque basale — */
  { k:"hrp", fv:"FOETO:PP.PLA-VAS-088", g:PB, mag:"faible",
    l:"Hématome rétroplacentaire adhérent : sang et fibrine (frais) ; polynucléaires, macrophages, sidérophages (chronique)",
    meta:"l'adhérence, pas la taille",
    cr:"On note un hématome rétroplacentaire adhérent" },
  { k:"abruptus", fv:"FOETO:PP.PLA-VAS-081", g:PB, mag:"faible", l:"Plaque basale disséquée par de petites effusions de sang frais",
    meta:"aspect d'abruptus du gabarit de CR ; un caillot non adhérent peut se détacher à la délivrance [vogel, ch. 7]",
    cr:"La plaque basale est déchirée par de multiples petites effusions de sang frais (aspect d'abruptus)." },
  { k:"atheroseBasale", seul:true, fv:"FOETO:PP.PLA-MAL-075", g:PB, mag:"moyen",
    l:"Athérose ou muscularisation persistante des artères spiralées de la plaque basale", meta:"identique à la pariétale",
    cr:"On note une nécrose fibrinoïde de la média de quelques artères utéro-placentaires (artériose décidue)." },
  { k:"implantationSuperficielle", g:PB, mag:"moyen",
    l:"Cellules géantes ↑ et trophoblaste extravilleux immature au site d'implantation",
    meta:"implantation trop superficielle [lherminecoulomb]",
    cr:"Les cellules géantes sont augmentées et le trophoblaste extravilleux est immature au site d'implantation" },
  { k:"deciduiteBasale", g:PB, mag:"fort", l:"Plasmocytes dans la plaque basale",
    meta:"le lymphocyte est normal, le plasmocyte ne l'est pas [ernst, ch. 36]",
    cr:"La plaque basale présente de multiples plasmocytes épars (déciduite chronique)." }
];

/* ── Associations — affichées, jamais cochées ─────────────────────────────── */
var DIAGS = [
  { k:"mvm", l:"Malperfusion vasculaire maternelle (MVM)", min:2,
    signes:["infarctus","hrp","dvh","matAcceleree","agglutination","noeudsAugmentes","atheroseBasale","implantationSuperficielle"],
    stop:" — Amsterdam définit la MVM par une LISTE, pas par une phrase, et chaque seuil hérite du 62 % des trois " +
         "blocs. Îlots de cellules X, pseudokystes et nécrose déciduale membraneuse : « insufficient evidence » " +
         "[amsterdam]. L'infarctus périphérique à terme et les zones péri-infarctus ne comptent pas. Sur un fœtus " +
         "retenu, le trépied de la maturation accélérée est fabriqué par la rétention : le décrire, ne pas le conclure " +
         "sans l'intervalle. Les vaisseaux de la caduque pariétale (athérose, muscularisation, hypertrophie murale) se " +
         "lisent sur la grille membranes, le cordon grêle sur la grille cordon, l'infarctus périphérique sur la grille marges." },

  { k:"fvm", fv:["FOETO:PP.PLA-DYS-023","FOETO:PP.PAR-VAS-025","FOETO:PP.VAC-VAS-002"], l:"Malperfusion vasculaire fœtale (FVM)", cle:"avascTrophoVivant", min:2,
    signes:["avascTrophoVivant","vsk","obliterationSouche","thrombusSouche","thrombusChorial","ectasie",
            "fibrineIntramurale","foyersPetits","foyersLarges","coussinFibrine","oedemeFocal"],
    stop:" — le trophoblaste VIVANT sur villosité avasculaire est le critère positif, avant tout comptage. Haut " +
         "grade = 45 villosités cumulées sur TROIS sections [amsterdam] ; khong2019 garde le 45 et abandonne le " +
         "dénominateur ; le bas grade n'est jamais défini par Amsterdam et « <5 villi per focus » qualifie le " +
         "patron global, pas le grade. Après la mort, tout se fabrique sauf le thrombus ; > 48 h, prudence. Avec " +
         "villite : « chronic villitis with associated avascular villi »." },

  { k:"mir", fv:"FOETO:PP.PLA-INF-007", l:"Réponse inflammatoire maternelle — plaque choriale", min:1,
    signes:["pchoSousChorionite","pchoChorionite","pchoNecrose"],
    stop:" — un stade sans le nom de l'école est ininterprétable : le gabarit de CR écrit stade 1 pour l'intervillite " +
         "sous-choriale (Blanc 1, Amsterdam 1) et stade 2 pour la chorionite (Blanc 2, Amsterdam 1) ; le stade 3 de " +
         "Blanc est le stade 2 d'Amsterdam, et la nécrose n'existe pas chez Blanc. Sur macéré, l'infiltrat chorial " +
         "basal maternel est présent dans 66 % des cas. Un fibrinoïde sous-chorial épais cache l'inflammation " +
         "(faux négatif géométrique). Les membranes se lisent sur la grille membranes, la funisite sur la grille cordon." },

  { k:"vue", fv:"FOETO:PP.PAR-INF-007", l:"Villite chronique d'étiologie indéterminée (VUE)", cle:"villite", min:1,
    signes:["villite","villiteLarge","villiteObliteration","avascAvecVillite","intervilliteChronique"],
    stop:" — six définitions du grade : « diffus » = 30 % chez Amsterdam, 5 % chez quatre autres sources ; vogel " +
         "exige un cluster de 5–10 villosités. Trois blocs = 62 % des villites : une villite absente sur quatre " +
         "blocs est le régime normal de la méthode. Plasmocytes prédominants → CMV avant de nommer une VUE. " +
         "Récidive 10 à 37 % : résultat critique à notifier [recurrent]. Le grade histologique ne prédit pas la " +
         "sévérité du RCIU." },

  { k:"villiteInfectieuse", l:"Villite infectieuse", cle:"villitePlasmo", min:1,
    signes:["villitePlasmo","inclusionsVirales","villite","inclusionsParvo"],
    stop:" — la VUE est une définition PAR EXCLUSION : elle exclut ce qui a une cause. Les inclusions de CMV " +
         "survivent à la macération ; les tréponèmes sont rares dans le placenta du fœtus macéré et abondants " +
         "dans le foie : un Warthin-Starry placentaire négatif ne dit rien." },

  { k:"mpfd", fv:"FOETO:PP.PAR-CLA-002", l:"Fibrine périvillositaire massive / infarctus du plancher (MPFD, MFI)", cle:"fibrineEIVconserve", min:2,
    signes:["fibrineEIVconserve","fibrineTransmurale","fibrine2550","fibrineBasale3mm","nidf"],
    stop:" — cinq systèmes de seuils, aucun chez Amsterdam : 25–50 % / > 50 % d'UNE LAME (khong2019), 25 % de la " +
         "MASSE macroscopique comme plancher (recurrent), > 50 % d'un CHAMP MPF (vogel), 25 % de la lame " +
         "(benirschke), 30 % de la masse (soffoet). Nommer le référentiel et l'unité. Les 3 mm basaux sont le seul " +
         "accord. 20 % des témoins sans facteur de risque ont des Gitterinfarcts ; la rétention prolongée fabrique " +
         "l'excès de fibrine. « Maternal floor infarction » n'est pas un infarctus. La NIDF francophone n'a pas de " +
         "table de correspondance avec ces cadres." },

  { k:"dvm", fv:["FOETO:PP.PAR-MAL-008","FOETO:PP.PLA-MAL-082"], l:"Retard de maturation villositaire (DVM)", cle:"populationMonotone", min:2,
    signes:["populationMonotone","mvsReduites","cytotrophoContinu"],
    stop:" — après 36 SA, rarement avant 34 ; ≥ 10 villosités monotones, ≥ 30 % d'une lame pleine épaisseur ; " +
         "« the thresholds for significance of this lesion are unclear at present » [amsterdam]. Les MVS diminuent " +
         "avec le délai avant fixation. Diabète et obésité maternels : les DEUX sens de maturation sont décrits " +
         "[keeling, ch. 4]. Le cadre de vogel (7 entités, % d'un champ MPF) n'est pas convertible." },

  { k:"chorangiose", fv:["FOETO:PP.PAR-VAS-008","FOETO:PP.PLA-VAS-058"], l:"Chorangiose villositaire", cle:"capillairesSup10", min:1,
    signes:["capillairesSup10","villositesRondes","paroiCapillaireNormale"],
    stop:" — quatre lectures divergentes d'un seul article (Altshuler 1984) : les « trois » et les « dix » sont " +
         "échangés entre benirschke et keeling. Le seuil HES (> 10) tombe DANS la normale CD34 (8–15) : ne jamais " +
         "la porter sans la coloration. Congestion = vaisseaux distendus, chorangiose = vaisseaux multipliés ; " +
         "vidange et injection fabriquent l'image dans les deux sens. Deux voies causales, dont une non hypoxique " +
         "(hyperinsulinisme, IGF-2)." },

  { k:"chorangiomatose", fv:["FOETO:PP.PAR-DYS-001","FOETO:PP.PLA-TUM-026"], l:"Chorangiomatose / chorangiome", cle:"pericytes", min:1,
    signes:["pericytes","chorangiome","villositesRondes","reticulineTreillis","trophoChorangiome"],
    stop:" — la chorangiose est le seul membre de la famille à paroi capillaire normale : péricytes et membrane " +
         "basale discontinue font la chorangiomatose, le nodule fait le chorangiome. Texte et Table 24.1 de " +
         "khong2019 se contredisent sur « branching ». Un chorangiome bordé de trophoblaste nécrosant n'est pas un " +
         "choriocarcinome : « chorangioma, with associated trophoblastic proliferation »." },

  { k:"pmd", fv:"FOETO:PP.PAR-DYS-003", l:"Dysplasie mésenchymateuse placentaire (PMD)", cle:"trophoNormalPMD", min:3,
    signes:["souchesKystiques","vaisseauxTortueux","citernes","trophoNormalPMD","magistral","thrombusChorial","p57StromaNeg","p57TrophoConserve","actineStromaNeg"],
    stop:" — le second membre de la définition est NÉGATIF : absence de prolifération trophoblastique, souches " +
         "proximales (la môle atteint les villosités distales). C'est un stade, pas un grade : < 20 SA les signes " +
         "sont discrets, les kystes migrent vers la plaque choriale. p57 avec témoin interne — un p57 négatif sans " +
         "témoin est une manipulation ratée. nRBC dans la chambre intervilleuse = hémorragie fœto-maternelle, HbF. " +
         "L'hypertorsion du cordon se lit sur la grille cordon." },

  { k:"hydrops", fv:["FOETO:PP.PLA-MAL-052","FOETO:PP.PLA-MAL-051"], l:"Œdème villositaire diffus — anasarque", cle:"oedemeDiffus", min:2,
    signes:["oedemeDiffus","hofbauer","erythroblastes","hematopoieseStromale"],
    stop:" — « with the exception of certain infections or large chorangiomas, it is impossible to diagnose with " +
         "certainty the cause of hydrops from pathologic examination of the placenta alone » [benirschke, ch. 23] ; " +
         "la maladie hémolytique ne se diagnostique pas sur le placenta isolé. Circonférentiel et régulier = " +
         "hydrops ; irrégulier et non circonférentiel = chercher la FVM. Trois gradations de l'œdème dans un même " +
         "chapitre. L'œdème de la gelée de Wharton se lit sur la grille cordon." },

  { k:"surcharge", fv:["FOETO:PP.PAR-MET-002","FOETO:PP.PLA-MET-001","FOETO:PP.PLA-MET-030"], l:"Maladie de surcharge", cle:"vacuolesIntracell", min:1,
    signes:["vacuolesIntracell","granuleuxEosino","hofbauer","oedemeDiffus","histiocytesFibrillaires"],
    stop:" — la vacuole VIDE est la règle (produit soluble) ; certaines surcharges donnent un matériel granuleux " +
         "sans vacuole ; la quantité dépend du terme. « Fetal death or edema does not give rise to vacuolation » " +
         "[benirschke, ch. 24] : ne pas imputer à la macération. Trois vacuolisations ne sont pas des surcharges : " +
         "trophoblaste extravilleux du chorion lisse, amnios du laparoschisis, amnios sous méconium. Résine et " +
         "coupes semi-fines montrent ce que la paraffine cache." },

  { k:"abruptio", l:"Décollement placentaire (abruptio)", fv:"FOETO:PP.PAR-VAS-030", min:1,
    signes:["abruptus","hrp"],
    stop:" — se déduit des constats de la plaque basale ; retentissement chiffré [vogel, ch. 7] : « Premature " +
         "abruption affecting 20 % or more of placental tissue will causes intrauterine hypoxia ». Faux négatifs " +
         "nommés : intervalle court jusqu'à l'accouchement, décollement partiel ou marginal sans atteinte de la " +
         "plaque basale [vogel, ch. 7]." },

  { k:"chi", l:"Intervillite chronique histiocytaire (CHI)", fv:"FOETO:PP.PAR-INF-002", min:1, cle:"intervilliteChronique",
    signes:["intervilliteChronique","villite"],
    stop:" — étendue à grader : focale < 10 %, modérée 10–50 %, massive > 50 % [khong2019, ch. 30] ; « focale » " +
         "chez [vogel, ch. 9] contre « massive » comme nom historique [recurrent]. Des polynucléaires dans la " +
         "chambre intervilleuse ne sont pas une intervillite chronique [khong2019, ch. 30]. Villite associée : 25–35 % " +
         "[recurrent] contre 30–47 % [khong2019, ch. 30]." },

  { k:"fvmSegmentaire", l:"Malperfusion vasculaire fœtale, patron segmentaire", fv:"FOETO:PP.PAR-VAS-016", cle:"avascTrophoVivant", min:2,
    signes:["thrombusChorial","thrombusSouche","obliterationSouche","avascTrophoVivant","foyersLarges"],
    stop:" — patron d'Amsterdam : occlusion thrombotique d'un vaisseau chorial ou souche, ou oblitération de souche, " +
         "avec villosités avasculaires en aval [amsterdam]. Le grade (bas ou haut) est un axe distinct, porté par le " +
         "compte des foyers." },

  { k:"fvmGlobale", l:"Malperfusion vasculaire fœtale, patron global", fv:"FOETO:PP.PLA-VAS-027", min:2,
    signes:["ectasie","fibrineIntramurale","foyersPetits","vsk"],
    stop:" — patron d'Amsterdam : obstruction partielle du flux ombilical — ectasie veineuse, fibrine intramurale des " +
         "gros vaisseaux, petits foyers de villosités avasculaires (moins de 5 par foyer) [amsterdam]. La VSK est aussi " +
         "le premier seau de la rétention : sur un mort-né, elle ne compte pas." }

];

/* ── Négatifs obligatoires — chacun conditionne la lecture d'une lésion ──────
   Déduits d'un signe (répondu absent) ou d'une donnée consignée (auto). */
var NEGATIFS = [
  { k:"geste", signe:"gesteInstrumental",
    l:"Gestes instrumentaux et prélèvements fœtaux exclus (ponction, amniocentèse, transfusion, extraction)",
    p:"ils produisent hémorragie intravillositaire et hématomes",
    ko:"gestes NON exclus — hématome du cordon et hémorragie intravillositaire ne se disent pas spontanés" },
  { k:"delaiFixation", l:"Délai délivrance → fixation et mode de fixation consignés", p:"la MVS mesure en partie la logistique",
    ko:"délai avant fixation NON consigné — les membranes vasculo-syncytiales et le retard de maturation ne sont pas interprétables",
    auto:function(){ return E.prelev.delaiFixation ? true
      : E.signes.mvsReduites === POS || E.signes.populationMonotone === POS ? false : null; } },
  { k:"retention", l:"État de macération et durée de rétention consignés", p:"> 48 h, la FVM se fabrique partout",
    ko:"intervalle de rétention NON consigné — villosités avasculaires, nœuds et cytotrophoblaste continu se décrivent sans se conclure",
    auto:function(){ return E.kcl || retNiveau() ? true
      : ["avascTrophoVivant","noeudsAugmentes","cytotrophoContinu"].some(function(k){ return E.signes[k] === POS; }) ? false : null; } },
  { k:"thrombus", l:"Présence ou absence de thrombus énoncée", p:"« true thrombi do not form in the fetal vasculature after death »",
    ko:"thrombus NON recherché — le seul signe de FVM qui ne se fabrique pas après la mort manque",
    auto:function(){ var c = E.signes.thrombusChorial, s = E.signes.thrombusSouche;
      return c === POS || s === POS || (c && s) ? true : E.signes.avascTrophoVivant === POS ? false : null; } },
  { k:"infiltratVillo", l:"Infiltrat villositaire cherché devant des villosités avasculaires", p:"villite avec oblitération ≡ FVM sans ce critère",
    ko:"infiltrat villositaire NON cherché — FVM et villite avec oblitération sont « histologically indistinguishable »",
    auto:function(){ return E.signes.villite ? true
      : ["avascTrophoVivant","foyersPetits","foyersLarges"].some(function(k){ return E.signes[k] === POS; }) ? false : null; } },
  { k:"nbBlocs", l:"Nombre de blocs examinés écrit (blocs lus)", p:"3 blocs = 62 % des villites, 6 blocs = 85–95 %",
    ko:"nombre de blocs NON écrit — aucun négatif multifocal n'est qualifié",
    auto:function(){ return E.blocs.length ? true : E.signes.villite === NEG ? false : null; } },
  { k:"siteNoeuds", l:"Site des coupes ayant servi aux nœuds déclaré (central, sans lésion macroscopique)",
    p:"kappa au plus mauvais sur les presque normaux",
    ko:"site des nœuds NON déclaré — un compte en bordure de lésion est irrecevable",
    auto:function(){ return E.prelev.siteNoeuds ? true
      : E.mesure.v.noeuds != null || E.signes.noeudsAugmentes === POS ? false : null; } },
  { k:"tablePoids", l:"Table de poids et échelle du terme nommées", p:"Amsterdam demande des tables locales ; vogel est la seule percentilée",
    ko:"table de poids NON nommée — un percentile sans sa table ne dit rien ; +3 à 6 % après fixation",
    auto:function(){ return E.prelev.tablePoids ? true : E.prelev.poids ? false : null; } },
  { k:"coloration", l:"Coloration du compte capillaire nommée", p:"> 10 en HES est dans la normale CD34",
    ko:"coloration NON nommée — la chorangiose ne se porte pas",
    auto:function(){ return E.mesure.v.capillaires == null ? null : E.mesure.opt ? true : false; } }
];

/* ── Techniques ───────────────────────────────────────────────────────────── */
var TECHNIQUES = [
  { k:"cd34",      l:"CD31 / CD34", q:"espaces vasculaires ; compte capillaire au CD34 (8–15 normal) ; vaisseaux primitifs de la PMD" },
  { k:"msa",       l:"Actine muscle-spécifique (MSA)", q:"couche continue de péricytes — chorangiomatose contre chorangiose" },
  { k:"reticuline", l:"Réticuline", q:"réseau en treillis du chorangiome" },
  { k:"p57",       l:"p57KIP2 avec témoin interne", q:"génome maternel — PMD, môle ; caduque et trophoblaste extravilleux positifs dans tous les cas" },
  { k:"hbf",       l:"Hémoglobine F", q:"hématies nucléées dans la chambre intervilleuse — hémorragie fœto-maternelle" },
  { k:"pasAlcian", l:"PAS et bleu alcian", q:"citernes hyaluroniques de la PMD" },
  { k:"gram",      l:"Gram tissulaire, frottis de plaque choriale", q:"infection bactérienne — à adresser en microbiologie" },
  { k:"warthin",   l:"Warthin-Starry — sur le FOIE", q:"tréponèmes rares dans le placenta macéré, abondants dans le foie" },
  { k:"ihcViral",  l:"IHC CMV / parvovirus", q:"utile sur tissu autolysé" },
  { k:"surcharge", l:"PAS-diastase, Luxol, CD68, phosphatase acide", q:"typage d'une surcharge (sialidose, Gaucher)" },
  { k:"resine",    l:"Résine époxy, coupes semi-fines, ME", q:"vacuoles invisibles en paraffine ; > 30 diagnostics sur 100 CVS" },
  { k:"series",    l:"Coupes sériées", q:"nœuds syncytiaux : la majorité sont des artefacts de coupe" },
  { k:"blocs6",    l:"Blocs parenchymateux supplémentaires (6–7)", q:"villite : 62 % à 3 blocs, 85–95 % à 6" },
  { k:"tricrome",  l:"Trichrome", q:"architecture sous macération — non sourcé pour le placenta dans ce corpus" },
  { k:"adn",       l:"Caryotype (plaque choriale) / envoi du congelé", q:"PMD (mosaïque), môle, surcharge" }
];

/* ── Propositions de techniques — déduites des clics, jamais imposées ─────── */
function suggerer(){
  var s = {};
  function vu(){ for (var i = 0; i < arguments.length; i++) if (E.signes[arguments[i]] === POS) return true; return false; }
  function ret(k){ return E.retention[k] === "present"; }
  function ko(k){ return etatNegatif(par(NEGATIFS, k)) === "ko"; }

  if (vu("capillairesSup10", "villositesRondes")) s.cd34 = 1;
  if (vu("pericytes", "chorangiome")){ s.msa = 1; s.reticuline = 1; s.cd34 = 1; }
  if (vu("souchesKystiques", "citernes", "trophoNormalPMD", "proliferationTropho")){ s.p57 = 1; s.adn = 1; }
  if (vu("citernes")) s.pasAlcian = 1;
  if (vu("nrbcIntervilleux")) s.hbf = 1;
  if (vu("pchoChorionite", "pchoNecrose", "vasculiteChoriale")) s.gram = 1;
  if (vu("villitePlasmo", "inclusionsVirales", "inclusionsParvo")){ s.ihcViral = 1; s.warthin = 1; }
  if (vu("vacuolesIntracell", "granuleuxEosino")){ s.surcharge = 1; s.resine = 1; s.adn = 1; }
  if (vu("noeudsAugmentes", "matAcceleree")) s.series = 1;
  if (vu("villite", "villiteLarge")) s.blocs6 = 1;
  if (vu("oedemeDiffus", "hofbauer")){ s.surcharge = 1; s.ihcViral = 1; }

  if (E.mesure.v.capillaires != null && E.mesure.opt !== "cd34" && E.mesure.v.capillaires > 10) s.cd34 = 1;
  if (ret("fibroseEtendue") || ret("lumEtendu")) s.tricrome = 1;
  if (ko("coloration")) s.cd34 = 1;
  if (ko("nbBlocs") || ko("infiltratVillo")) s.blocs6 = 1;
  return s;
}

/* ── Contrôles propres au parenchyme ──────────────────────────────────────── */
async function testsOrgane(chk, clic, set, crTient, pause){
  function pose(k, v){ if (E.signes[k] !== v) clic("les", k, v); }
  function ote(k){ if (E.signes[k]) clic("les", k, E.signes[k]); }
  function tenue(k){ return associations().some(function(a){ return a.d.k === k && a.tenu; }); }
  function retPose(k){ var sel = $("retNiveau"); sel.value = k; sel.dispatchEvent(new Event("change", {bubbles:true})); }
  function negatif(k){ return etatNegatif(par(NEGATIFS, k)); }

  /* Rien ne se perd : les signes Parenchyme sous cordon et Parenchyme systémique de la v1 */
  chk("v1 : les signes du parenchyme", ["vasculiteChoriale","ectasie","thrombusChorial","fibrineIntramurale","coussinFibrine",
      "souchesKystiques","vaisseauxTortueux","citernes","trophoNormalPMD","magistral","chorangiome","langhansExces",
      "infiltratChorialBasal","amniosDecolle","infarctus","hrp","dvh","matAcceleree","agglutination","noeudsAugmentes",
      "avascTrophoVivant","vsk","obliterationSouche","thrombusSouche","foyersPetits","foyersLarges","hemorragieIntravill",
      "villite","villiteLarge","villitePlasmo","villiteObliteration","avascAvecVillite","intervilliteChronique",
      "pnIntervilleux","perivillite","inclusionsVirales","fibrineEIVconserve","fibrineTransmurale","fibrine2550",
      "fibrineBasale3mm","populationMonotone","mvsReduites","cytotrophoContinu","capillairesSup10","villositesRondes",
      "pericytes","oedemeDiffus","oedemeFocal","hofbauer","erythroblastes","nrbcIntervilleux","vacuolesIntracell",
      "granuleuxEosino","minéralisationMB","implantationSuperficielle","atheroseBasale","proliferationTropho",
      "calcifPoussiere"].every(function(k){ return !!par(SIGNES, k); }));
  chk("v1 : les neuf critères de rétention", RETENTION.length === 9);

  /* Maturation : Vogel, et la divergence ernst portée */
  chk("Vogel : 20 SA → immatures dominantes", stadeAttendu(20).k === "immatDom");
  chk("Vogel : 28 SA → matures dominantes",   stadeAttendu(28).k === "matureDom");
  chk("Vogel : 40 SA → terminales",           stadeAttendu(40).k === "termDom");
  chk("croisement ernst / vogel porté",       par(STADES, "termMontee").note.indexOf("32 SA") >= 0);

  /* Rétention : les quatre seaux, avec leurs performances */
  chk("premier seau ≥ 6 h",        par(RETENTION, "karyoIntravasc").h === 6 && par(RETENTION, "karyoIntravasc").q === "bon");
  chk("mauvais prédicteurs nommés", par(RETENTION, "microcalcif").q === "mauvais" && par(RETENTION, "mbTropho").q === "mauvais");
  chk("témoin de réfrigération",   par(RETENTION, "karyoIntravasc").alerte.indexOf("réfrigéré") >= 0);

  /* Les comptes s'entrent sans barème */
  set("sa", "38");
  set("m_noeuds", "31");
  chk("nœuds acceptés sans barème",   crTient("le compte est consigné, l'interprétation reste ouverte"));
  chk("31 % : augmenté selon khong et benirschke, pas Amsterdam",
      crTient("augmenté selon > 30 % des deux tiers inférieurs") && crTient("pas selon > 33 % [amsterdam]"));
  /* site non déclaré : réserve au CR et négatif en défaut (la v1 attachait la réserve à une option absente) */
  if (E.prelev.siteNoeuds) clic("prelev", "siteNoeuds");
  chk("nœuds sans site déclaré : réserve et négatif en défaut",
      crTient("site des coupes des nœuds non déclaré") && negatif("siteNoeuds") === "ko");
  clic("prelev", "siteNoeuds");
  chk("site déclaré : négatif énoncé, réserve levée", negatif("siteNoeuds") === "ok" && !crTient("site des coupes des nœuds non déclaré"));
  clic("prelev", "siteNoeuds");
  clic("mdef", "amsterdam");
  chk("Amsterdam retenu : non augmentés", crTient("nœuds non augmentés"));
  clic("mdef", "khong");
  chk("khong retenu : augmentés",  crTient("nœuds AUGMENTÉS"));
  set("sa", "30"); clic("mdef", "benirschke");
  chk("benirschke avant 34 SA : seuil 20 %", crTient("> 20 % avant 34 SA"));
  set("sa", "38"); clic("mdef", "benirschke");
  set("m_noeuds", "");

  set("m_capillaires", "12");
  chk("capillaires sans coloration : consigné, négatif en défaut",
      crTient("la coloration décide, pas le chiffre") && negatif("coloration") === "ko" && suggerer().cd34 === 1);
  clic("mopt", "hes");
  chk("12 en HES : chorangiose d'Altshuler, à confirmer en CD34", crTient("> 10 = chorangiose selon Altshuler") && suggerer().cd34 === 1);
  clic("mopt", "cd34");
  chk("12 au CD34 : normal",       crTient("dans la fourchette normale 8–15"));
  clic("mopt", "cd34");
  set("m_capillaires", "");

  /* Doctrine portée dans les stops */
  chk("MVM : liste, pas phrase",   par(DIAGS, "mvm").stop.indexOf("LISTE") >= 0);
  chk("FVM : trois sections",      par(DIAGS, "fvm").stop.indexOf("TROIS sections") >= 0 && par(DIAGS, "fvm").stop.indexOf("bas grade") >= 0);
  chk("villite : 30 % vs 5 %",     par(DIAGS, "vue").stop.indexOf("30 %") >= 0 && par(DIAGS, "vue").stop.indexOf("5 %") >= 0);
  chk("MPFD : cinq systèmes",      par(DIAGS, "mpfd").stop.indexOf("cinq systèmes") >= 0);
  chk("chorangiose : coloration",  par(DIAGS, "chorangiose").stop.indexOf("CD34") >= 0);
  chk("hydrops : verrou Benirschke", par(DIAGS, "hydrops").stop.indexOf("impossible to diagnose") >= 0);
  chk("PMD : critère négatif",     par(DIAGS, "pmd").stop.indexOf("NÉGATIF") >= 0);
  chk("plaque choriale : écoles",  par(DIAGS, "mir").stop.indexOf("Blanc") >= 0 && par(DIAGS, "mir").stop.indexOf("Amsterdam") >= 0);
  chk("surcharge : macération ne vacuolise pas", par(DIAGS, "surcharge").stop.indexOf("does not give rise to vacuolation") >= 0);

  chk("aucun bouton ne porte un diagnostic",
      DIAGS.every(function(d){ return !document.querySelector('[data-act="les"][data-k="' + d.k + '"]'); }));

  /* FVM : sans le trophoblaste vivant, le compte ne tient pas */
  ["avascTrophoVivant","foyersPetits","foyersLarges","thrombusChorial","thrombusSouche","villite"].forEach(ote);
  pose("vsk", POS); pose("obliterationSouche", POS);
  chk("FVM sans pivot ne tient pas", !tenue("fvm") && crTient("signe pivot non coché"));
  pose("avascTrophoVivant", POS);
  chk("FVM avec le trophoblaste vivant", tenue("fvm"));
  /* devant des villosités avasculaires : thrombus et infiltrat villositaire à énoncer, rétention à consigner */
  chk("villosités avasculaires : thrombus à énoncer", negatif("thrombus") === "ko");
  chk("villosités avasculaires : villite à chercher, blocs proposés", negatif("infiltratVillo") === "ko" && suggerer().blocs6 === 1);
  chk("villosités avasculaires : rétention à consigner", negatif("retention") === "ko");
  pose("thrombusChorial", NEG); pose("thrombusSouche", NEG); pose("villite", NEG);
  chk("thrombus et villite répondus absents : négatifs énoncés", negatif("thrombus") === "ok" && negatif("infiltratVillo") === "ok");
  retPose("karyoIntravasc");
  chk("rétention consignée : négatif énoncé", negatif("retention") === "ok");
  /* Rétention présente : les nœuds se décrivent, ne se concluent pas */
  set("m_noeuds", "40");
  chk("rétention → réserve sur les nœuds", crTient("elle fabrique les nœuds augmentés"));
  set("m_noeuds", "");
  retPose("");
  ["vsk","obliterationSouche","avascTrophoVivant","thrombusChorial","thrombusSouche","villite"].forEach(ote);

  /* Signes → techniques */
  pose("pericytes", POS);
  chk("péricytes → MSA et réticuline", suggerer().msa === 1 && suggerer().reticuline === 1);
  ote("pericytes");
  pose("trophoNormalPMD", POS);
  chk("PMD → p57", suggerer().p57 === 1);
  ote("trophoNormalPMD");
  chk("trophoblaste normal : polarité normale, hors du Non en bloc", par(SIGNES, "trophoNormalPMD").bloc === false);
  pose("villitePlasmo", POS);
  chk("plasmocytes → IHC virale", suggerer().ihcViral === 1);
  ote("villitePlasmo");

  /* CR prérédigé : phrases du gabarit */
  pose("dvh", POS);
  chk("HVD : phrase du gabarit", crTient("plages d'hypoplasie villositaire distale (HVD)."));
  ote("dvh");
  var iB = groupes().indexOf(PB);
  signesDe(PB).forEach(function(x){ ote(x.k); });
  clic("grp", iB, "non");
  chk("plaque basale Non : phrase du gabarit", crTient("La plaque basale est sans particularité."));
  clic("grp", iB, "non");

  /* Délai de fixation : MVS réduites sans délai consigné */
  if (E.prelev.delaiFixation) clic("prelev", "delaiFixation");
  pose("mvsReduites", POS);
  chk("MVS réduites sans délai de fixation : négatif en défaut", negatif("delaiFixation") === "ko");
  ote("mvsReduites");

  /* 1.1.0 : codes créés depuis le verbatim de la fiche (lot FOETO) — les signes branchés exportent leur code */
  chk("FOETO 1.1.2 : 72 signe(s) codé(s) depuis le verbatim (après la confrontation)", SIGNES.filter(function(x){ return /^FOETO:PP\.PLA-/.test(x.foeto || ""); }).length === 72);
}
