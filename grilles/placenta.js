/* Grille de lecture — placenta, membranes et cordon (micro).
   Fond : ~/Bureau/fiches_lecture/diffusion/fiche_placenta.md (§1 à §9) et
          fiche_retention.md §5 (les quatre seaux de Genest II).
   Forme : gen_grille.py, calquée sur grille_rein.html.
   Cinq grandes sections de signes (Rémi, 14/09) : cordon · membranes · parenchyme sous
   cordon (bloc adjacent à l'insertion, plaque choriale) · marge (rouleau et parenchyme
   marginal) · parenchyme systémique (les trois blocs pleine épaisseur des deux tiers centraux).
   Le placenta n'a pas UN référentiel : Amsterdam pour les lésions, Vogel pour la maturation,
   Genest pour la rétention, et les seuils francophones à côté. Les divergences sont PORTÉES
   dans les champs, jamais arbitrées ; l'observation s'entre avant son barème. */

var ORGANE  = "placenta";
var TITRE   = "placenta, membranes et cordon";
var SOURCE  = "fiche_placenta.md";
var MODULE  = "grille_placenta";
var VERSION = "1.0.0";
var PAIR    = false;

var TITRE_CR    = "PLACENTA";
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
var PRELEV = [
  { k:"rouleau",    l:"Rouleau de membranes, du point de rupture au bord placentaire", grave:true,
    manque:"sans rouleau complet, ni chorionicité, ni athérose pariétale, ni stade de chorioamniotite : « from the " +
           "rupture edge to the placental margin » [amsterdam]" },
  { k:"cordon2",    l:"Deux sections de cordon : pôle fœtal et ≈ 5 cm de l'insertion, hors clamp", grave:true,
    manque:"une coupe trop près de l'insertion fabrique une fausse artère unique : 92 % des cordons ont une " +
           "anastomose de Hyrtl [benirschke, ch. 11] ; éviter clamp et ponction [ernst, ch. 36]" },
  { k:"blocs3",     l:"Trois blocs pleine épaisseur dans les deux tiers centraux", grave:true,
    manque:"3 blocs = 62 % des villites, 6–7 blocs = 85 % [amsterdam] ; en dessous de trois, tout négatif " +
           "multifocal perd son sens" },
  { k:"insertion",  l:"Un bloc adjacent au site d'insertion du cordon", grave:true,
    manque:"c'est le bloc qui documente l'ectasie vasculaire fœtale et les réponses inflammatoires fœtale et " +
           "maternelle [amsterdam]" },
  { k:"marge",      l:"Parenchyme marginal inclus dans le rouleau",
    manque:"la marge porte l'hémorragie marginale, l'hémosidérine et l'infarctus périphérique — sans elle, pas de " +
           "circumvallé histologique" },
  { k:"basalTang",  l:"Bloc tangentiel de la face maternelle, parallèle à la basale",
    manque:"« en-face blocks of the basal plate often yield more decidual spiral arteries » [keeling, ch. 4] — " +
           "geste [soffoet, ch. 15] hors Amsterdam, qui sert l'athérose" },
  { k:"normales",   l:"Zones normales prélevées, pas seulement les lésions",
    manque:"« it is not desirable to take only abnormal areas » [benirschke, ch. 1] — un bloc dépensé sur un " +
           "infarctus typique est retiré au dépistage des lésions multifocales" },
  { k:"transmural", l:"Épaisseur > cassette : tiers supérieur + tiers inférieur, ou cinquième bloc",
    manque:"la DVH se lit sur les deux tiers inférieurs comparés au tiers sous-chorial : sans la pleine " +
           "épaisseur, le critère est amputé" },
  { k:"poids",      l:"Poids net qualifié frais / fixé, sans cordon ni membranes",
    manque:"fixation : +3 à 6 % [amsterdam] ; poids net = cordon coupé à ≈ 5 cm, membranes parées [vogel, ch. 2]" },
  { k:"caryo",      l:"Caryotype prélevé sur la plaque choriale, à frais, avant le reste",
    manque:"« le chorion (plaque choriale) est l'élément qui se développera le mieux en culture après mort " +
           "fœtale » [soffoet, ch. 15]" },
  { k:"congele",    l:"Fragment congelé",
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
  { k:"microcalcif",    l:"Microcalcification stromale « poussiéreuse »", b:"≥ 24 h",
    d:"sens. 0,478", h:24, q:"mauvais",
    note:"mauvais prédicteur : une sensibilité de 0,478 ne date rien seule [Genest II]" },
  { k:"whartonNecrose", l:"Nécrose de la gelée de Wharton", b:"≥ 48 h", d:"sens. 0,733 · spéc. 0,843", h:48, q:"mauvais",
    note:"mauvais prédicteur ; et la perte de turgescence biaise longueur ET diamètre du cordon [keeling, ch. 4]" },
  { k:"mbTropho",       l:"Épaississement / minéralisation de la membrane basale trophoblastique", b:"≥ 48 h",
    d:"sens. 0,333", h:48, q:"mauvais",
    note:"artefact de macération [keeling, ch. 15] souvent porté comme lésion ; sensibilité 0,333" },
  { k:"cordonVascNecrose", l:"Nécrose vasculaire du cordon", b:"≥ 7 j", d:"sens. 0,600 · spéc. 1,000", h:168, q:"moyen",
    note:"spécifique, peu sensible ; ne pas la confondre avec la myonécrose au méconium, périphérique et " +
         "adjacente à la gelée [benirschke, ch. 16]" },
  { k:"mediaPycnotique", l:"Noyaux pycnotiques et plissés de la média ombilicale", b:"—", d:"non datable seule", h:0, q:"mauvais",
    note:"« mimicking neutrophils » [ernst, ch. 36] — mime une funisite, ne date rien" }
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
    if (E.mesure.opt === "bordure") res.push("nœuds comptés en bordure de lésion — « areas adjacent to infarcts should not be relied on » [amsterdam]");
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

/* ── 05 · Variantes normales — ce qu'il faut savoir NE PAS appeler pathologique ── */
var VARIANTES = [
  { k:"metaplasie",   l:"Métaplasie malpighienne de l'amnios (jusqu'à 60 % des placentas à terme, près du cordon)" },
  { k:"calcifBasales", l:"Calcifications du tiers basal, physiologiques à terme" },
  { k:"fibrinoides",  l:"Fibrinoïde de Langhans (sous-chorial), de Rohr et de Nitabuch" },
  { k:"fibrineMarge", l:"Fibrine périvillositaire < 10 %, autour des souches, en sous-chorial et au bord" },
  { k:"trophoNitabuch", l:"Trophoblaste extravilleux au-delà de Nitabuch" },
  { k:"muscleParietal", l:"Muscle lisse dans les vaisseaux de la caduque pariétale (non remodelés)" },
  { k:"coussinMyxoide", l:"Coussin myxoïde intimal d'un vaisseau chorial, sans fibrine ni calcification" },
  { k:"vitellin",     l:"Reliquat du sac vitellin (plaque blanche sous-amniotique) ; reliquats du canal vitellin et de l'ouraque" },
  { k:"cellulesX",    l:"Îlots de trophoblaste extravilleux (cellules X) dans la chambre intervilleuse" },
  { k:"kystes",       l:"Kystes amniotiques et kystes des septa" },
  { k:"fauxNoeud",    l:"Faux nœud du cordon (gelée ou dilatation vasculaire asymétrique)" },
  { k:"remodelageT2", l:"Artérioles partiellement remodelées au deuxième trimestre" },
  { k:"lymphoDecid",  l:"Lymphocytes et cellules NK épars dans la caduque (le plasmocyte, lui, n'est pas normal)" },
  { k:"vacuolLaeve",  l:"Trophoblaste extravilleux vacuolisé du chorion lisse (lipides, pinocytose)" },
  { k:"circummargine", l:"Insertion circummarginée (sans signification selon Fox et Sen ; keeling sépare le circumvallé total)" },
  { k:"congestion",   l:"Congestion villositaire (vaisseaux distendus, non multipliés — diabète maternel)" }
];

/* ── 06 · Signes — cinq grandes sections, un signe à la fois, aucun nom de maladie ── */
var G1 = "Cordon", G2 = "Membranes", G3 = "Parenchyme sous cordon — plaque choriale et bloc d'insertion",
    G4 = "Marge — rouleau et parenchyme marginal", G5 = "Parenchyme systémique — trois blocs pleine épaisseur";

var SIGNES = [
  /* Cordon */
  { g:G1, k:"aou",             l:"Artère ombilicale unique sur coupe à circonférence complète, ≥ 5 cm de l'insertion",
    meta:"Hyrtl dans 92 % des cordons" },
  { g:G1, k:"phlebiteOmb",     l:"Phlébite ombilicale (polynucléaires dans la paroi veineuse)", meta:"FIR stade 1" },
  { g:G1, k:"arteriteOmb",     l:"Artérite ombilicale, une ou deux artères", meta:"FIR stade 2" },
  { g:G1, k:"funisiteNecro",   l:"Funisite nécrosante, extension à la gelée de Wharton", meta:"FIR stade 3 Amsterdam ; dans les stades 1–2 chez Van Hoeven" },
  { g:G1, k:"thromboseOmb",    l:"Thrombose d'un vaisseau ombilical" },
  { g:G1, k:"myonecrose",      l:"Nécrose de la paroi vasculaire, périphérique, adjacente à la gelée", meta:"méconium, < 1 % des placentas méconiaux" },
  { g:G1, k:"hematomeCordon",  l:"Hématome funiculaire avec organisation, lignes de Zahn ou polynucléaires",
    meta:"sans les trois : artefact [ernst, ch. 36]" },
  { g:G1, k:"striction",       l:"Striction : gelée absente ou subtotale, cordon extrêmement spiralé" },
  { g:G1, k:"cordonGrele",     l:"Gelée de Wharton condensée en liseré, ± microcalcifications diffuses (cordon grêle)",
    meta:"diamètre < 8 mm ; biaisé par la rétention" },
  { g:G1, k:"oedemeCordon",    l:"Œdème de la gelée, cordon épais", meta:"diabète maternel, hydrops" },
  { g:G1, k:"meconiumWharton", l:"Macrophages méconiaux dans la gelée de Wharton", meta:"plus tardif que les membranes ; « many hours »" },
  { g:G1, k:"vaisseauxMembraneux", l:"Insertion vélamenteuse ou vaisseaux membraneux (insertion marginale comprise)",
    meta:"vasa praevia = rapport à l'orifice interne, non diagnosticable sur la pièce" },
  { g:G1, k:"variceOmb",       l:"Varice ou ectasie d'un vaisseau ombilical" },
  { g:G1, k:"hypertorsion",    l:"Hypertorsion avec indentations périphériques du cordon", meta:"le patron, pas l'index" },

  /* Membranes */
  { g:G2, k:"sousChorionite",  l:"Polynucléaires maternels dans le fibrinoïde sous-chorial / chorionite", meta:"MIR stade 1 Amsterdam = stade 1–2 de Blanc" },
  { g:G2, k:"chorioamniotite", l:"Polynucléaires dans le chorion fibreux et/ou l'amnios", meta:"MIR stade 2 Amsterdam = stade 3 de Blanc" },
  { g:G2, k:"necrosante",      l:"Chorioamniotite nécrosante : caryorrhexis des polynucléaires, nécrose amniocytaire, membrane basale hyperéosinophile",
    meta:"MIR stade 3 — n'existe pas chez Blanc" },
  { g:G2, k:"microabces",      l:"Polynucléaires confluents ou microabcès sous-choriaux", meta:"MIR grade 2" },
  { g:G2, k:"migrationAmnios", l:"Polynucléaires en migration vers l'amnios (sens de la chimiotaxie)",
    meta:"un foyer au site de rupture n'est pas une ascension" },
  { g:G2, k:"meconiumAmnios",  l:"Macrophages méconiaux dans l'amnios" },
  { g:G2, k:"meconiumChorion", l:"Macrophages méconiaux dans le chorion et la caduque capsulaire" },
  { g:G2, k:"amniosDegenere",  l:"Amnios vacuolisé, hérissé, nécrosé (méconium prolongé, laparoschisis)",
    meta:"mime une surcharge" },
  { g:G2, k:"amniosNodosum",   l:"Amnios nodosum : nodules de vernix PAS et bleu alcian positifs, non kératinisés" },
  { g:G2, k:"atherose",        l:"Athérose aiguë déciduale : nécrose fibrinoïde, macrophages spumeux, vaisseau dilaté" },
  { g:G2, k:"muscularisation", l:"Muscularisation persistante des artérioles spiralées (défaut de remodelage)" },
  { g:G2, k:"hypertrophieMurale", l:"Hypertrophie murale des vaisseaux déciduaux, paroi > 1/3 de la circonférence",
    meta:"formulation dimensionnellement fautive, partagée par deux sources" },
  { g:G2, k:"thromboseDeciduale", l:"Thrombose récente d'une artère déciduale", meta:"item francophone de l'athérose" },
  { g:G2, k:"lymphocytesT",    l:"Infiltrat lymphocytaire T péri-artériel décidual" },
  { g:G2, k:"deciduitePlasmo", l:"Plasmocytes dans la caduque (déciduite plasmocytaire)" },
  { g:G2, k:"necroseDeciduale", l:"Nécrose déciduale membraneuse", meta:"preuve insuffisante pour la MVM [amsterdam]" },
  { g:G2, k:"hemosiderine",    l:"Hémosidérine dans les membranes (bleu de Prusse positif)" },
  { g:G2, k:"collageneDense",  l:"Dépôt collagène dense sans inflammation", meta:"RPM > 1 semaine : l'inflammation est partie, la fibrose reste" },
  { g:G2, k:"brides",          l:"Brides ou feuillets amniotiques ; chorion nodosum" },
  { g:G2, k:"pseudokyste",     l:"Pseudokyste du chorion lisse, îlots de fibrinoïde à cellules X", meta:"preuve insuffisante pour la MVM [amsterdam]" },

  /* Parenchyme sous cordon */
  { g:G3, k:"vasculiteChoriale", l:"Vasculite des vaisseaux de la plaque choriale", meta:"FIR stade 1 ; deux vaisseaux = un seul coupé tangentiellement ?" },
  { g:G3, k:"ectasie",         l:"Ectasie d'un vaisseau chorial ou souche ≥ 4 fois le diamètre des vaisseaux voisins",
    meta:"seul seuil chiffré, absent d'Amsterdam" },
  { g:G3, k:"thrombusChorial", l:"Thrombus d'un vaisseau chorial : récent (fibrine adhérente), en organisation (néo-intima), organisé, ancien (calcifié)",
    meta:"le seul signe de FVM qui ne se fabrique pas après la mort" },
  { g:G3, k:"fibrineIntramurale", l:"Dépôt de fibrine intramural sous-endothélial (non occlusif par définition)",
    meta:"isolé (1–2) : signification incertaine" },
  { g:G3, k:"coussinFibrine",  l:"Coussin myxoïde intimal AVEC fibrine ou calcification" },
  { g:G3, k:"souchesKystiques", l:"Villosités souches dilatées, kystiques, œdémateuses, mêlées de villosités normales" },
  { g:G3, k:"vaisseauxTortueux", l:"Vaisseaux souches à paroi épaisse, tortueux, anévrismaux, manchons de mésenchyme lâche" },
  { g:G3, k:"citernes",        l:"Citernes centrales de matériel myxoïde (acide hyaluronique, bleu alcian)", meta:"moins nombreuses que dans la môle" },
  { g:G3, k:"trophoNormalPMD", l:"Trophoblaste normal, contours lisses, sans pseudo-inclusion, sur des souches kystiques",
    meta:"le critère négatif qui écarte la môle" },
  { g:G3, k:"magistral",       l:"Patron vasculaire magistral de la plaque choriale (gros vaisseaux non dichotomiques)" },
  { g:G3, k:"chorangiome",     l:"Nodule capillaire expansif d'une souche sous-choriale, péricytes présents" },
  { g:G3, k:"langhansExces",   l:"Fibrinoïde sous-chorial de Langhans épais, chorioamnion épaissi",
    meta:"faux négatif géométrique : l'inflammation « will not be seen » [khong2019, ch. 13]" },
  { g:G3, k:"infiltratChorialBasal", l:"Infiltrat granulocytaire maternel bien limité de la plaque choriale basale",
    meta:"≈ 66 % des MFIU macérées — pas une chorioamniotite [vogel, ch. 14]" },
  { g:G3, k:"amniosDecolle",   l:"Amnios décollé de la plaque choriale", meta:"traction sur le cordon au 3e stade — artefact" },

  /* Marge */
  { g:G4, k:"infarctusPeriph", l:"Infarctus périphérique (marginal)", meta:"à terme, hors du seuil des 5 % non périphériques" },
  { g:G4, k:"hemorragieMarginale", l:"Hémorragie marginale ancienne, hématome marginal" },
  { g:G4, k:"hemosiderineMarge", l:"Hémosidérine et fibrine au bord, membranes à insertion enroulée (circumvallé histologique)" },
  { g:G4, k:"villositesAtrophiques", l:"Villosités marginales atrophiques, fibrine périvillositaire de bord",
    meta:"la zone prélevée décide du chiffre" },
  { g:G4, k:"dvhSousChorial",  l:"Paucité villositaire focale sous-choriale ou péri-lésionnelle", meta:"ne qualifie pas pour la DVH" },
  { g:G4, k:"ruptureFoyer",    l:"Foyer intense de polynucléaires au site de rupture", meta:"ne signe pas une infection ascendante" },
  { g:G4, k:"caduqueCapsulaire", l:"Caduque capsulaire nécrosée / hémorragique au bord" },

  /* Parenchyme systémique */
  { g:G5, k:"infarctus",       l:"Infarctus : collapsus de la chambre intervilleuse ET perte de basophilie du trophoblaste, jusqu'aux « ghost villi »",
    meta:"ne s'organise jamais ; tout infarctus compte avant terme, > 5 % non périphérique à terme" },
  { g:G5, k:"hrp",             l:"Hématome rétroplacentaire adhérent : sang et fibrine (frais) ; polynucléaires, macrophages, sidérophages (chronique)",
    meta:"l'adhérence, pas la taille" },
  { g:G5, k:"dvh",             l:"Hypoplasie villositaire distale : terminales rares, fines, allongées, deux tiers inférieurs",
    meta:"≥ 30 % d'une lame pleine épaisseur ; focal/diffus = nombre de lames" },
  { g:G5, k:"matAcceleree",    l:"Villosités d'aspect terme pour le terme, nœuds ↑, fibrine intervilleuse, alternant avec des plages de paucité",
    meta:"32,4 % des témoins normaux [vogel]" },
  { g:G5, k:"agglutination",   l:"Villosités agglutinées par la fibrine (2 à 20), touchant d'autres villosités", meta:"« villi should not ever be directly touching »" },
  { g:G5, k:"noeudsAugmentes", l:"Nœuds syncytiaux augmentés (≥ 5 noyaux, bombant), hors bordure de lésion", meta:"voir le compte du § 03 bis" },
  { g:G5, k:"avascTrophoVivant", l:"Villosités avasculaires à trophoblaste VIVANT (lésion « inside out »)",
    meta:"le critère positif de FVM — le sépare de l'infarctus" },
  { g:G5, k:"vsk",             l:"Caryorrhexis stromale-vasculaire villositaire (VSK)", meta:"post-mortem dès 6 h : le premier seau de Genest" },
  { g:G5, k:"obliterationSouche", l:"Oblitération de vaisseau souche : septation fibroblastique, sclérose de collapsus" },
  { g:G5, k:"thrombusSouche",  l:"Thrombus mural ou occlusif d'un vaisseau souche" },
  { g:G5, k:"foyersPetits",    l:"Petits foyers de villosités avasculaires (< 5 villosités par foyer)", meta:"patron global — pas le grade" },
  { g:G5, k:"foyersLarges",    l:"Foyers larges d'avascularité, cumul ≥ 45 villosités sur 3 sections ou > 15 par section",
    meta:"haut grade Amsterdam ; khong2019 abandonne le dénominateur" },
  { g:G5, k:"hemorragieIntravill", l:"Hémorragie intravillositaire", meta:"aussi produite par aspiration, extraction manuelle, césarienne" },
  { g:G5, k:"villite",         l:"Villite chronique lymphohistiocytaire, foyers < 10 villosités contiguës" },
  { g:G5, k:"villiteLarge",    l:"Villite chronique, ≥ 1 foyer > 10 villosités contiguës, sur > 1 coupe", meta:"haut grade Amsterdam ; diffus > 30 % (Amsterdam) ou > 5 % (quatre autres sources)" },
  { g:G5, k:"villitePlasmo",   l:"Villite à prédominance plasmocytaire", meta:"CMV à chercher avant de nommer une VUE" },
  { g:G5, k:"villiteObliteration", l:"Villite avec destruction d'un vaisseau souche musculaire", meta:"« villitis with stem vessel obliteration »" },
  { g:G5, k:"avascAvecVillite", l:"Villosités avasculaires dans un placenta avec villite", meta:"se rapporte avec la villite, pas comme FVM" },
  { g:G5, k:"intervilliteChronique", l:"Histiocytes mononucléés dans la chambre intervilleuse (intervillite chronique)" },
  { g:G5, k:"pnIntervilleux",  l:"Polynucléaires dans la chambre intervilleuse", meta:"« intervillositis » déconseillé pour ce signe" },
  { g:G5, k:"perivillite",     l:"Périvillite", meta:"12,5 % des prééclampsies ; « not evident in fetal infections »" },
  { g:G5, k:"inclusionsVirales", l:"Inclusions virales (CMV en œil de hibou), parvovirus" },
  { g:G5, k:"fibrineEIVconserve", l:"Fibrinoïde périvillositaire comblant l'espace, chambre intervilleuse CONSERVÉE, villosités épargnées dans la lésion",
    meta:"conservé = fibrine ; collabé = infarctus" },
  { g:G5, k:"fibrineTransmurale", l:"Fibrinoïde transmural, de la plaque choriale à la basale, > 50 % d'une lame" },
  { g:G5, k:"fibrine2550",     l:"Fibrinoïde sur 25–50 % d'une lame", meta:"« increased » (khong2019) ou « borderline » (recurrent)" },
  { g:G5, k:"fibrineBasale3mm", l:"Fibrinoïde basal encastrant les villosités sur ≥ 3 mm le long du plancher", meta:"le seul chiffre partagé par toutes les sources" },
  { g:G5, k:"populationMonotone", l:"Population villositaire monotone (≥ 10 villosités) à capillaires centraux" },
  { g:G5, k:"mvsReduites",     l:"Membranes vasculo-syncytiales réduites pour le terme", meta:"≈ 40 % au terme ; diminuent avec le délai avant fixation" },
  { g:G5, k:"cytotrophoContinu", l:"Cytotrophoblaste en couche continue au-delà du terme attendu" },
  { g:G5, k:"capillairesSup10", l:"Villosités terminales à > 10 capillaires, 10 villosités, 10 champs, hors zones ischémiques",
    meta:"quatre lectures d'Altshuler ; coloration à nommer" },
  { g:G5, k:"villositesRondes", l:"Villosités terminales grandes, rondes, à vascularisation proéminente au faible grossissement",
    meta:"congestion ou chorangiose : compter, ne pas juger la surface" },
  { g:G5, k:"pericytes",       l:"Capillaires à couche de péricytes et membrane basale discontinue, villosités intermédiaires et souches",
    meta:"chorangiomatose — la chorangiose a une paroi normale" },
  { g:G5, k:"oedemeDiffus",    l:"Œdème villositaire diffus, circonférentiel, stroma pâle, trophoblaste conservé", meta:"patron hydrops — immun ou non" },
  { g:G5, k:"oedemeFocal",     l:"Œdème villositaire focal, irrégulier, non circonférentiel, entre villosités normales", meta:"chercher la FVM (débris caryorrhectiques)" },
  { g:G5, k:"hofbauer",        l:"Cellules de Hofbauer et canaux stromaux proéminents" },
  { g:G5, k:"erythroblastes",  l:"Au moins un érythroblaste dans la plupart des champs au fort grossissement", meta:"seuil 10 / 10 champs [ernst, ch. 36]" },
  { g:G5, k:"nrbcIntervilleux", l:"Hématies nucléées nombreuses dans la chambre intervilleuse (côté maternel)", meta:"hémorragie fœto-maternelle ; HbF" },
  { g:G5, k:"vacuolesIntracell", l:"Vacuoles intracellulaires vides du trophoblaste, des cellules de Hofbauer, de l'endothélium", meta:"intra = surcharge ; inter = œdème" },
  { g:G5, k:"granuleuxEosino", l:"Matériel granuleux éosinophile intracellulaire" },
  { g:G5, k:"minéralisationMB", l:"Minéralisation de la membrane basale trophoblastique", meta:"artefact de macération" },
  { g:G5, k:"implantationSuperficielle", l:"Cellules géantes ↑ et trophoblaste extravilleux immature au site d'implantation", meta:"implantation trop superficielle [lherminecoulomb]" },
  { g:G5, k:"atheroseBasale",  l:"Athérose ou muscularisation persistante des artères spiralées de la plaque basale", meta:"identique à la pariétale" },
  { g:G5, k:"proliferationTropho", l:"Prolifération trophoblastique circonférentielle ou atypique", meta:"→ fiche fille 5.14 ; Ki-67 décide" },
  { g:G5, k:"calcifPoussiere", l:"Microcalcifications stromales poussiéreuses diffuses", meta:"rétention (mauvais prédicteur), pas une lésion" }
];

/* ── 06 bis · Associations — affichées, jamais cochées ──────────────────────── */
var DIAGS = [
  { k:"mvm", l:"Malperfusion vasculaire maternelle (MVM)", min:2,
    signes:["infarctus","hrp","dvh","matAcceleree","agglutination","noeudsAugmentes","atherose","muscularisation",
            "hypertrophieMurale","atheroseBasale","implantationSuperficielle","cordonGrele","infarctusPeriph"],
    stop:" — Amsterdam définit la MVM par une LISTE, pas par une phrase, et chaque seuil hérite du 62 % des trois " +
         "blocs. Îlots de cellules X, pseudokystes et nécrose déciduale membraneuse : « insufficient evidence » " +
         "[amsterdam]. L'infarctus périphérique à terme et les zones péri-infarctus ne comptent pas. Sur un fœtus " +
         "retenu, le trépied de la maturation accélérée est fabriqué par la rétention : le décrire, ne pas le conclure " +
         "sans l'intervalle." },

  { k:"fvm", l:"Malperfusion vasculaire fœtale (FVM)", cle:"avascTrophoVivant", min:2,
    signes:["avascTrophoVivant","vsk","obliterationSouche","thrombusSouche","thrombusChorial","ectasie",
            "fibrineIntramurale","foyersPetits","foyersLarges","coussinFibrine","oedemeFocal"],
    stop:" — le trophoblaste VIVANT sur villosité avasculaire est le critère positif, avant tout comptage. Haut " +
         "grade = 45 villosités cumulées sur TROIS sections [amsterdam] ; khong2019 garde le 45 et abandonne le " +
         "dénominateur ; le bas grade n'est jamais défini par Amsterdam et « < 5 villosités par foyer » qualifie le " +
         "patron global, pas le grade. Après la mort, tout se fabrique sauf le thrombus ; > 48 h, prudence. Avec " +
         "villite : « chronic villitis with associated avascular villi »." },

  { k:"mir", l:"Réponse inflammatoire maternelle (chorioamniotite aiguë)", min:1,
    signes:["sousChorionite","chorioamniotite","necrosante","microabces","migrationAmnios"],
    stop:" — un stade sans le nom de l'école est ininterprétable : le stade 3 de Blanc est le stade 2 d'Amsterdam, " +
         "la nécrose n'existe pas chez Blanc, et vogel compte des régions et des granulocytes par champ. Travail " +
         "> 12 h : 75 % d'infection amniotique — un confondeur, pas un facteur de risque. Le foyer du site de " +
         "rupture ne signe pas l'ascension ; le méconium inhibe les polynucléaires, et sa causalité est divergente. " +
         "Sur macéré, l'infiltrat chorial basal maternel est présent dans 66 % des cas." },

  { k:"fir", l:"Réponse inflammatoire fœtale (vasculite choriale, funisite)", min:1,
    signes:["vasculiteChoriale","phlebiteOmb","arteriteOmb","funisiteNecro"],
    stop:" — Amsterdam : phlébite → artérite → funisite nécrosante ; Van Hoeven met la gelée de Wharton DANS les " +
         "stades 1–2 : les deux échelles se croisent. Absente si la mort a précédé la chorioamniotite ; la média " +
         "pycnotique du fœtus mort mime les polynucléaires. Deux vaisseaux atteints : envisager un seul, coupé " +
         "tangentiellement." },

  { k:"vue", l:"Villite chronique d'étiologie indéterminée (VUE)", cle:"villite", min:1,
    signes:["villite","villiteLarge","villiteObliteration","avascAvecVillite","intervilliteChronique"],
    stop:" — six définitions du grade : « diffus » = 30 % chez Amsterdam, 5 % chez quatre autres sources ; vogel " +
         "exige un cluster de 5–10 villosités. Trois blocs = 62 % des villites : une villite absente sur quatre " +
         "blocs est le régime normal de la méthode. Plasmocytes prédominants → CMV avant de nommer une VUE. " +
         "Récidive 10 à 37 % : résultat critique à notifier [recurrent]. Le grade histologique ne prédit pas la " +
         "sévérité du RCIU." },

  { k:"villiteInfectieuse", l:"Villite infectieuse", cle:"villitePlasmo", min:1,
    signes:["villitePlasmo","inclusionsVirales","villite"],
    stop:" — la VUE est une définition PAR EXCLUSION : elle exclut ce qui a une cause. Les inclusions de CMV " +
         "survivent à la macération ; les tréponèmes sont rares dans le placenta du fœtus macéré et abondants " +
         "dans le foie : un Warthin-Starry placentaire négatif ne dit rien." },

  { k:"mpfd", l:"Fibrine périvillositaire massive / infarctus du plancher (MPFD, MFI)", cle:"fibrineEIVconserve", min:2,
    signes:["fibrineEIVconserve","fibrineTransmurale","fibrine2550","fibrineBasale3mm"],
    stop:" — cinq systèmes de seuils, aucun chez Amsterdam : 25–50 % / > 50 % d'UNE LAME (khong2019), 25 % de la " +
         "MASSE macroscopique comme plancher (recurrent), > 50 % d'un CHAMP MPF (vogel), 25 % de la lame " +
         "(benirschke), 30 % de la masse (soffoet). Nommer le référentiel et l'unité. Les 3 mm basaux sont le seul " +
         "accord. 20 % des témoins sans facteur de risque ont des Gitterinfarcts ; la rétention prolongée fabrique " +
         "l'excès de fibrine. « Maternal floor infarction » n'est pas un infarctus." },

  { k:"dvm", l:"Retard de maturation villositaire (DVM)", cle:"populationMonotone", min:2,
    signes:["populationMonotone","mvsReduites","cytotrophoContinu"],
    stop:" — après 36 SA, rarement avant 34 ; ≥ 10 villosités monotones, ≥ 30 % d'une lame pleine épaisseur ; " +
         "« the thresholds for significance of this lesion are unclear at present » [amsterdam]. Les MVS diminuent " +
         "avec le délai avant fixation. Diabète et obésité maternels : les DEUX sens de maturation sont décrits " +
         "[keeling, ch. 4]. Le cadre de vogel (7 entités, % d'un champ MPF) n'est pas convertible." },

  { k:"chorangiose", l:"Chorangiose villositaire", cle:"capillairesSup10", min:1,
    signes:["capillairesSup10","villositesRondes"],
    stop:" — quatre lectures divergentes d'un seul article (Altshuler 1984) : les « trois » et les « dix » sont " +
         "échangés entre benirschke et keeling. Le seuil HES (> 10) tombe DANS la normale CD34 (8–15) : ne jamais " +
         "la porter sans la coloration. Congestion = vaisseaux distendus, chorangiose = vaisseaux multipliés ; " +
         "vidange et injection fabriquent l'image dans les deux sens. Deux voies causales, dont une non hypoxique " +
         "(hyperinsulinisme, IGF-2)." },

  { k:"chorangiomatose", l:"Chorangiomatose / chorangiome", cle:"pericytes", min:1,
    signes:["pericytes","chorangiome","villositesRondes"],
    stop:" — la chorangiose est le seul membre de la famille à paroi capillaire normale : péricytes et membrane " +
         "basale discontinue font la chorangiomatose, le nodule fait le chorangiome. Texte et Table 24.1 de " +
         "khong2019 se contredisent sur « branching ». Un chorangiome bordé de trophoblaste nécrosant n'est pas un " +
         "choriocarcinome : « chorangioma, with associated trophoblastic proliferation »." },

  { k:"pmd", l:"Dysplasie mésenchymateuse placentaire (PMD)", cle:"trophoNormalPMD", min:3,
    signes:["souchesKystiques","vaisseauxTortueux","citernes","trophoNormalPMD","magistral","thrombusChorial","hypertorsion"],
    stop:" — le second membre de la définition est NÉGATIF : absence de prolifération trophoblastique, souches " +
         "proximales (la môle atteint les villosités distales). C'est un stade, pas un grade : < 20 SA les signes " +
         "sont discrets, les kystes migrent vers la plaque choriale. p57 avec témoin interne — un p57 négatif sans " +
         "témoin est une manipulation ratée. nRBC dans la chambre intervilleuse = hémorragie fœto-maternelle, HbF." },

  { k:"hydrops", l:"Œdème villositaire diffus — anasarque", cle:"oedemeDiffus", min:2,
    signes:["oedemeDiffus","hofbauer","erythroblastes","oedemeCordon"],
    stop:" — « with the exception of certain infections or large chorangiomas, it is impossible to diagnose with " +
         "certainty the cause of hydrops from pathologic examination of the placenta alone » [benirschke, ch. 23] ; " +
         "la maladie hémolytique ne se diagnostique pas sur le placenta isolé. Circonférentiel et régulier = " +
         "hydrops ; irrégulier et non circonférentiel = chercher la FVM. Trois gradations de l'œdème dans un même " +
         "chapitre." },

  { k:"surcharge", l:"Maladie de surcharge", cle:"vacuolesIntracell", min:1,
    signes:["vacuolesIntracell","granuleuxEosino","hofbauer","oedemeDiffus"],
    stop:" — la vacuole VIDE est la règle (produit soluble) ; certaines surcharges donnent un matériel granuleux " +
         "sans vacuole ; la quantité dépend du terme. « Fetal death or edema does not give rise to vacuolation » " +
         "[benirschke, ch. 24] : ne pas imputer à la macération. Trois vacuolisations ne sont pas des surcharges : " +
         "trophoblaste extravilleux du chorion lisse, amnios du laparoschisis, amnios sous méconium. Résine et " +
         "coupes semi-fines montrent ce que la paraffine cache." },

  { k:"meconium", l:"Exposition prolongée au méconium", min:2,
    signes:["meconiumAmnios","meconiumChorion","meconiumWharton","amniosDegenere","myonecrose"],
    stop:" — 1–3 h contre 24–48 h : la profondeur de pénétration ORDONNE, elle ne date pas. Le fer positif tranche " +
         "l'hémosidérine ; un bleu de Prusse négatif n'affirme pas le méconium (la bile se colore mal). Le fœtus " +
         "très immature ne défèque pas — avec les deux modèles opposés du corpus. Myonécrose : < 1 % des placentas " +
         "méconiaux, « many hours »." },

  { k:"oligoamnios", l:"Amnios nodosum — oligoamnios prolongé", cle:"amniosNodosum", min:1,
    signes:["amniosNodosum","collageneDense"],
    stop:" — le nodule est du vernix (PAS, bleu alcian) ; il n'existe pas tôt : oligoamnios à 16 SA et amnios " +
         "normal, absent à 600 g / 27 semaines. Ne pas confondre avec la métaplasie malpighienne (kératinisation " +
         "focale, placenta mature, près du cordon). Rare sur le cordon ; le jumeau monoamniotique est protégé." },

  { k:"cordonComplication", l:"Complication funiculaire", min:2,
    signes:["striction","hypertorsion","thromboseOmb","hematomeCordon","cordonGrele","vaisseauxMembraneux","variceOmb","aou"],
    stop:" — 80 % des thromboses ombilicales ont une autre complication du cordon. L'index de spiralisation : le " +
         "seuil de pathologie d'un auteur (0,3/cm) est dix fois plus bas que la normale d'un autre (2–2,5/cm), " +
         "19 % de discordance artère/veine, 69 % de variation le long du cordon. L'artère unique exige la " +
         "circonférence complète et une coupe loin de l'insertion. Un hématome sans organisation, lignes de Zahn " +
         "ni polynucléaires est un artefact ; chercher ponction, amniocentèse, transfusion. Vasa praevia ne se " +
         "lit pas sur la pièce." },

  { k:"arteriopathie", l:"Artériopathie déciduale — athérose, défaut de remodelage", cle:"atherose", min:1,
    signes:["atherose","muscularisation","hypertrophieMurale","thromboseDeciduale","lymphocytesT","atheroseBasale"],
    stop:" — le seuil mural « diamètre > 1/3 de la circonférence » est dimensionnellement fautif, et deux sources " +
         "indépendantes le partagent ; trois formulations dans un même chapitre. Sur 53 placentas, quatre athéroses " +
         "n'ont été vues qu'après revue des QUATRE rouleaux. Identique en caduque pariétale, basale ou lit " +
         "placentaire. Le muscle lisse pariétal est normal : c'est l'épaisseur relative qui devient lésionnelle." }
];

/* ── 07 · Négatifs obligatoires — chacun conditionne la lecture d'une lésion ── */
var NEGATIFS = [
  { k:"delaiFixation", l:"Délai délivrance → fixation et mode de fixation consignés", p:"la MVS mesure en partie la logistique",
    ko:"délai avant fixation NON consigné — les membranes vasculo-syncytiales et le retard de maturation ne sont pas interprétables" },
  { k:"retention", l:"État de macération et durée de rétention consignés", p:"> 48 h, la FVM se fabrique partout",
    ko:"intervalle de rétention NON consigné — villosités avasculaires, nœuds et cytotrophoblaste continu se décrivent sans se conclure" },
  { k:"thrombus", l:"Présence ou absence de thrombus énoncée", p:"« true thrombi do not form in the fetal vasculature after death »",
    ko:"thrombus NON recherché — le seul signe de FVM qui ne se fabrique pas après la mort manque" },
  { k:"infiltratVillo", l:"Infiltrat villositaire cherché devant des villosités avasculaires", p:"villite avec oblitération ≡ FVM sans ce critère",
    ko:"infiltrat villositaire NON cherché — FVM et villite avec oblitération sont « histologically indistinguishable »" },
  { k:"nbBlocs", l:"Nombre de blocs et de rouleaux examinés écrit", p:"3 blocs = 62 % des villites ; l'athérose dépend du nombre de rouleaux",
    ko:"nombre de blocs et de rouleaux NON écrit — aucun négatif multifocal n'est qualifié" },
  { k:"siteNoeuds", l:"Site des coupes ayant servi aux nœuds déclaré (central, sans lésion macroscopique)", p:"kappa au plus mauvais sur les presque normaux",
    ko:"site des nœuds NON déclaré — un compte en bordure de lésion est irrecevable" },
  { k:"tablePoids", l:"Table de poids et échelle du terme nommées", p:"Amsterdam demande des tables locales ; vogel est la seule percentilée",
    ko:"table de poids NON nommée — un percentile sans sa table ne dit rien ; +3 à 6 % après fixation" },
  { k:"troisVaisseaux", l:"Trois vaisseaux du cordon confirmés sur coupe à circonférence complète", p:"Hyrtl fabrique une fausse artère unique près de l'insertion",
    ko:"nombre de vaisseaux NON confirmé sur coupe complète — artère unique ni retenue ni écartée" },
  { k:"clamp", l:"Segment de cordon sans marque de clamp ni de ponction", p:"[ernst, ch. 36]",
    ko:"cordon prélevé sur clamp ou ponction — hématome et hémorragie périvasculaire non interprétables" },
  { k:"geste", l:"Gestes instrumentaux et prélèvements fœtaux exclus (ponction, amniocentèse, transfusion, extraction)", p:"ils produisent hémorragie intravillositaire et hématomes",
    ko:"gestes NON exclus — hématome du cordon et hémorragie intravillositaire ne se disent pas spontanés" },
  { k:"travail", l:"Durée du travail connue", p:"11 % d'infection amniotique si < 6 h, 75 % si > 12 h",
    ko:"durée du travail INCONNUE — le taux de chorioamniotite est confondu" },
  { k:"meconium", l:"Présence ou absence de méconium énoncée", p:"il inhibe les polynucléaires",
    ko:"méconium NON énoncé — l'infiltrat et son absence sont biaisés" },
  { k:"siteRupture", l:"Site de rupture des membranes situé par rapport au rouleau", p:"un foyer intense au site de rupture ne signe pas l'ascension",
    ko:"site de rupture NON situé — le foyer du rouleau n'est pas interprétable" },
  { k:"coloration", l:"Coloration du compte capillaire nommée", p:"> 10 en HES est dans la normale CD34",
    ko:"coloration NON nommée — la chorangiose ne se porte pas" },
  { k:"chorionicite", l:"Chorionicité et méthode (rouleau, coupe en T, clivabilité) — si multiple", p:"le nombre de feuillets est la donnée divergente",
    ko:"chorionicité NON établie par une méthode nommée" }
];

/* ── 08 · Techniques ──────────────────────────────────────────────────────── */
var TECHNIQUES = [
  { k:"cd34",      l:"CD31 / CD34", q:"espaces vasculaires ; compte capillaire au CD34 (8–15 normal) ; vaisseaux primitifs de la PMD" },
  { k:"msa",       l:"Actine muscle-spécifique (MSA)", q:"couche continue de péricytes — chorangiomatose contre chorangiose" },
  { k:"reticuline", l:"Réticuline", q:"réseau en treillis du chorangiome" },
  { k:"p57",       l:"p57KIP2 avec témoin interne", q:"génome maternel — PMD, môle ; caduque et trophoblaste extravilleux positifs dans tous les cas" },
  { k:"hbf",       l:"Hémoglobine F", q:"hématies nucléées dans la chambre intervilleuse — hémorragie fœto-maternelle" },
  { k:"pasAlcian", l:"PAS et bleu alcian", q:"nodules de vernix de l'amnios nodosum ; citernes hyaluroniques de la PMD" },
  { k:"perls",     l:"Bleu de Prusse (Perls)", q:"hémosidérine contre méconium — le fer positif tranche, le négatif n'affirme rien" },
  { k:"gram",      l:"Gram tissulaire, frottis de plaque choriale", q:"infection bactérienne — à adresser en microbiologie" },
  { k:"warthin",   l:"Warthin-Starry — sur le FOIE", q:"tréponèmes rares dans le placenta macéré, abondants dans le foie" },
  { k:"ihcViral",  l:"IHC CMV / parvovirus", q:"utile sur tissu autolysé" },
  { k:"surcharge", l:"PAS-diastase, Luxol, CD68, phosphatase acide", q:"typage d'une surcharge (sialidose, Gaucher)" },
  { k:"resine",    l:"Résine époxy, coupes semi-fines, ME", q:"vacuoles invisibles en paraffine ; > 30 diagnostics sur 100 CVS" },
  { k:"series",    l:"Coupes sériées", q:"nœuds syncytiaux : la majorité sont des artefacts de coupe" },
  { k:"rouleaux",  l:"Rouleaux de membranes supplémentaires", q:"athérose vue dans 4 cas sur 53 seulement après les 4 rouleaux" },
  { k:"blocs6",    l:"Blocs parenchymateux supplémentaires (6–7)", q:"villite : 62 % à 3 blocs, 85–95 % à 6" },
  { k:"tricrome",  l:"Trichrome", q:"architecture sous macération — non sourcé pour le placenta dans ce corpus" },
  { k:"adn",       l:"Caryotype (plaque choriale) / envoi du congelé", q:"PMD (mosaïque), môle, surcharge" }
];

/* ── Propositions de techniques — déduites des clics, jamais imposées ─────── */
function suggerer(){
  var s = {};
  function anormal(k){ return E.signes[k] === "anormal"; }
  function ret(k){ return E.retention[k] === "present"; }

  if (anormal("capillairesSup10") || anormal("villositesRondes")) s.cd34 = 1;
  if (anormal("pericytes") || anormal("chorangiome")){ s.msa = 1; s.reticuline = 1; s.cd34 = 1; }
  if (anormal("souchesKystiques") || anormal("citernes") || anormal("trophoNormalPMD") || anormal("proliferationTropho")){ s.p57 = 1; s.adn = 1; }
  if (anormal("citernes") || anormal("amniosNodosum")) s.pasAlcian = 1;
  if (anormal("nrbcIntervilleux")) s.hbf = 1;
  if (anormal("hemosiderine") || anormal("hemosiderineMarge") || anormal("meconiumChorion") || anormal("meconiumAmnios")) s.perls = 1;
  if (anormal("chorioamniotite") || anormal("necrosante") || anormal("microabces") || anormal("funisiteNecro") || anormal("arteriteOmb")) s.gram = 1;
  if (anormal("villitePlasmo") || anormal("inclusionsVirales")){ s.ihcViral = 1; s.warthin = 1; }
  if (anormal("vacuolesIntracell") || anormal("granuleuxEosino")){ s.surcharge = 1; s.resine = 1; s.adn = 1; }
  if (anormal("noeudsAugmentes") || anormal("matAcceleree")) s.series = 1;
  if (anormal("atherose") || anormal("muscularisation") || anormal("hypertrophieMurale")) s.rouleaux = 1;
  if (anormal("villite") || anormal("villiteLarge")) s.blocs6 = 1;
  if (anormal("oedemeDiffus") || anormal("hofbauer")){ s.surcharge = 1; s.ihcViral = 1; }

  if (E.mesure.v.capillaires != null && E.mesure.opt !== "cd34" && E.mesure.v.capillaires > 10) s.cd34 = 1;
  if (ret("fibroseEtendue") || ret("lumEtendu")) s.tricrome = 1;
  if (E.negatifs.coloration === "present") s.cd34 = 1;
  if (E.negatifs.nbBlocs === "present") s.blocs6 = 1;
  if (E.negatifs.infiltratVillo === "present") s.blocs6 = 1;
  return s;
}

/* ── Contrôles propres au placenta ────────────────────────────────────────── */
async function testsOrgane(chk, clic, set, crTient, pause){
  /* Cinq grandes sections, dans l'ordre demandé */
  var groupes = SIGNES.map(function(x){ return x.g; }).filter(function(g, i, a){ return a.indexOf(g) === i; });
  chk("cinq sections de signes",   groupes.length === 5 && groupes[0] === G1 && groupes[1] === G2 &&
                                   groupes[2] === G3 && groupes[3] === G4 && groupes[4] === G5);
  chk("sous-titres rendus",        $("signes").querySelectorAll(".sousTitre").length === 5);
  chk("chaque signe a sa section", SIGNES.every(function(x){ return !!x.g; }));

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
  clic("mdef", "amsterdam");
  chk("Amsterdam retenu : non augmentés", crTient("nœuds non augmentés"));
  clic("mdef", "khong");
  chk("khong retenu : augmentés",  crTient("nœuds AUGMENTÉS"));
  set("sa", "30"); clic("mdef", "benirschke");
  chk("benirschke avant 34 SA : seuil 20 %", crTient("> 20 % avant 34 SA"));
  set("sa", "38"); clic("mdef", "benirschke");
  set("m_noeuds", "");

  set("m_capillaires", "12");
  chk("capillaires sans coloration : consigné", crTient("la coloration décide, pas le chiffre"));
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
  chk("chorioamniotite : écoles",  par(DIAGS, "mir").stop.indexOf("Blanc") >= 0 && par(DIAGS, "mir").stop.indexOf("vogel") >= 0);
  chk("surcharge : macération ne vacuolise pas", par(DIAGS, "surcharge").stop.indexOf("does not give rise to vacuolation") >= 0);
  chk("méconium : ordonne, ne date pas", par(DIAGS, "meconium").stop.indexOf("ORDONNE") >= 0);

  /* Le nom se déduit des signes — il ne se coche pas */
  chk("aucun bouton ne porte un diagnostic",
      DIAGS.every(function(d){ return !document.querySelector('[data-act="les"][data-k="' + d.k + '"]'); }));

  function pose(k, v){ if (E.signes[k] !== v) clic("les", k, v); }
  function ote(k){ if (E.signes[k]) clic("les", k, E.signes[k]); }
  function tenue(k){ return associations().some(function(a){ return a.d.k === k && a.tenu; }); }

  /* FVM : sans le trophoblaste vivant, le compte ne tient pas */
  pose("vsk", "anormal"); pose("obliterationSouche", "anormal");
  chk("FVM sans pivot ne tient pas", !tenue("fvm") && crTient("signe pivot non coché"));
  pose("avascTrophoVivant", "anormal");
  chk("FVM avec le trophoblaste vivant", tenue("fvm"));
  ote("vsk"); ote("obliterationSouche"); ote("avascTrophoVivant");

  /* Rétention présente : les nœuds se décrivent, ne se concluent pas */
  clic("ret", "karyoIntravasc", "present");
  set("m_noeuds", "40");
  chk("rétention → réserve sur les nœuds", crTient("elle fabrique les nœuds augmentés"));
  set("m_noeuds", "");
  clic("ret", "karyoIntravasc", "present");

  /* Signes → techniques */
  pose("pericytes", "anormal");
  chk("péricytes → MSA et réticuline", suggerer().msa === 1 && suggerer().reticuline === 1);
  ote("pericytes");
  pose("trophoNormalPMD", "anormal");
  chk("PMD → p57", suggerer().p57 === 1);
  ote("trophoNormalPMD");
  pose("villitePlasmo", "anormal");
  chk("plasmocytes → IHC virale", suggerer().ihcViral === 1);
  ote("villitePlasmo");

  /* Le CR porte la section du signe */
  pose("aou", "anormal");
  chk("CR : section devant le signe", crTient(G1 + " · " + par(SIGNES, "aou").l + " — ANORMAL"));
  ote("aou");
}
