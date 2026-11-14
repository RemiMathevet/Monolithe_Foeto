/* Grille de lecture — cœur, péricarde et artères coronaires. VERSION 2 (2.0.0).
   Migration de coeur.js (1.0.1, normal / anormal) sur le patron rein v3.5 /
   poumon v2.1 : gen_grille.py en mode présence, termes FOETO fondus dans les
   signes et branchés (termes tagués « verbatim »), blocs lus en §02, ordre de
   lecture (LECTURE). La v1 reste publiée à côté tant que la v2 n'a pas été
   validée à l'usage.
   Ce que la v2 change par rapport à la v1, sans rien retrancher :
   · un signe est un CONSTAT, présent / absent / non regardé (plus normal /
     anormal). Les 82 signes de la v1 sont tous là, sous leur clé ;
   · les 63 constats de fiche_coeur.md tagués dans FOETO ont chacun leur signe :
     40 branchent un signe v1 (libellé et code venus de la base, le libellé v1
     reste dans le fragment), 23 entrent comme signes nouveaux ; 4 variantes
     normales FOETO branchent aussi un signe v1 de repérage (jonction, coupe
     oblique, trabéculations fines / grossières). Les 38 autres signes v1 sont
     des constats de la fiche sans terme : fiche:"[source]" ;
   · deux termes FOETO génériques (désorganisation des myocytes, réaction
     péricardique) sont des signes qui n'entrent dans aucune association : ce
     sont le siège du disarray et le type de réaction qui ouvrent l'association ;
   · 15 associations portent le terme maladie FOETO (affiché, non exporté) ;
   · paragraphes = cadres du cœur (CADRES), lus du repérage de la coupe au bloc de
     conduction ; chaque signe porte son grossissement (mag) — savoir de pratique
     [expérience], à valider à l'usage ; les variantes normales vivent dans le
     cadre qu'elles miment et ne passent au CR qu'en parenthèse ;
   · un seul cadre hors lame (dissection, clinique) : anti-SSA/Ro, défect du
     péricarde, et deux signes créés pour porter les négatifs v1 de septation et
     de situs ;
   · les 18 négatifs se DÉDUISENT : 9 d'un signe, 9 d'un calcul. Quatre signes
     sont créés pour porter un négatif v1 qui n'en avait pas (défect septal,
     situs, asymétrie ventriculaire, prolifération lymphatique). Ce que la v1
     disait en texte, la v2 le calcule : le négatif d'inflammation est refusé si
     les lymphocytes sont non reconnaissables (rétention) ; celui du tissu nodal
     est refusé dès 48 h de rétention ou nœud introuvable ;
   · « Non » en bloc : les signes techniques (mag:"technique") et de polarité
     normale (bloc:false : trabéculations fines, grossières, disarray de
     jonction, cytoarchitecture conservée) se répondent un par un ;
   · mitoses : la variante reste ; le terme FOETO Mitoses myocytaires nombreuses
     entre comme signe, hors de toute association — critère inutilisable in
     utero (fiche § 9.9) ;
   · les guillemets « » sont réservés aux livres ; les phrases du corpus du
     service passent entre “ ”. Texte accentué ;
   · prélèvement groupé : ce qui qualifie la lecture / les décisions d'autopsie,
     non rattrapables sur lame ;
   · corrections : l'alerte des bandes de rétention (un booléen, affiché true
     au CR) devient une phrase ; la variante des îlots myocardiques auriculaires
     est relibellée en dispersion du faisceau de His, ce que dit sa citation ;
     la note de retard ne prête plus au corpus deux formules qui sont de la fiche ;
   · ajouts depuis la fiche § 4 (liste courte des variantes) : sept variantes
     absentes de la v1 (Anitschkow, lymphocytes résidents, infiltrat épicardique
     du sillon AV, hématopoïèse épicardique, mastocytes / mégacaryocytes, kystes
     sanguins valvulaires, hétérotopie péricardique) ; à l'ischémie, l'infiltrat
     neutrophile et la divergence 6–8 h / 12 h.
   Fond : ~/Bureau/fiches_lecture/fiche_coeur.md (§1 à §9).
   Les divergences entre sources sont PORTÉES dans les champs, jamais arbitrées. */

var ORGANE  = "coeur";
var TITRE   = "cœur, péricarde et artères coronaires";
var SOURCE  = "fiche_coeur.md";
var MODULE  = "grille_coeur";
var VERSION = "2.0.0";
var SCHEMA  = "0.3.0";   /* 0.3.0 : signes present/absent, négatifs déduits */
var ETATS   = "presence";
var FOETO_DANS_SIGNES = true;
var PAIR    = false;
var BLOCS   = true;
var LECTURE = true;      /* cadres (CADRES), grossissement (mag), variantes dans leur cadre */
var GROUPES_SANS_ETENDUE = ["Repérage de la coupe et des cavités"];

var TITRE_CR    = "CŒUR";
var STADE_TITRE = "Repères datés isolés — le cœur n'a pas d'échelle de maturation";

var KCL_TXT =
  "Fœticide au KCl déclaré : le point de ponction épicardique est une lésion locale ATTENDUE, " +
  "pas un signe. « If there has been feticide by injection of potassium chloride into the heart, " +
  "the fatal puncture site in the epicardium is frequently visible at post-mortem. » " +
  "Le livre ajoute que les altérations induites peuvent « mimic maceration changes » : " +
  "l'horloge de rétention est donc suspendue, aucune borne ne se lit sur ce cœur. " +
  "Réserve inverse à garder : « KCl injection may not be applied directly into the heart » — " +
  "un KCl déclaré ne garantit pas que le myocarde ait été traversé, l'absence de point de ponction " +
  "ne dément pas le geste.";

var RETARD_NOTE =
  " — RÉSERVE DE FOND : le cœur n'a pas d'échelle de maturation. Le retard cardiaque ne se " +
  "fabrique pas à partir d'un repère daté isolé. Aucun CR du corpus n'écrit de stade de maturation " +
  "cardiaque, et la fiche (§ 9) ne sait pas distinguer l'absence d'échelle d'une échelle que le " +
  "service ne pratique pas. La seule forme utile d'un écart est l'ASYMÉTRIE entre les deux " +
  "ventricules d'un même cœur, lue au bloc quatre cavités — pas un décalage en SA.";

var AVANCE_NOTE =
  " — RÉSERVE DE FOND : idem, pas d'échelle. Ne pas écrire d'avance de maturation cardiaque. " +
  "Ce qui se lit sur ce cœur, c'est l'ASYMÉTRIE des deux parois ventriculaires entre elles, " +
  "sur une même coupe, jamais un âge histologique.";

var TECH_NOTE =
  "Les pointillés sont des propositions déduites des clics, jamais des prescriptions. " +
  "Aucune technique ne rattrape un bloc absent. « Devant toute pathologie cardiaque, un caryotype " +
  "est réalisé même en cas de macération ainsi qu'un prélèvement de tissus en congélation. » — " +
  "cette décision se prend à l'autopsie, elle ne se rattrape pas sur lame.";

/* ── 02 · Prélèvement ─────────────────────────────────────────────────────── */
var PRELEV = [
  { k:"fixation", g:"Qualifie la lecture", l:"Cœur fixé au formol avant coupe", grave:true,
    manque:"coupe à frais d'un petit cœur : les repères se perdent. « For smaller hearts, particularly when macerated or malformed, formalin fixation of the heart is essential » — sans fixation préalable, ne rien conclure d'une géométrie de cavité ni d'une épaisseur de paroi" },
  { k:"provenance", g:"Qualifie la lecture", l:"Provenance du matériel identifiée (lame de cœur entier ou bloc tissulaire orienté)",
    manque:"provenance non déclarée : une épaisseur de paroi mesurée sur un bloc non orienté ne se rapporte à aucune cavité, aucun rapport ventriculaire ne se calcule" },
  { k:"blocA", g:"Qualifie la lecture", l:"Bloc A — paroi ventriculaire gauche + septum interventriculaire", grave:true,
    manque:"sans paroi VG et septum sur la même coupe, ni l'endocarde du VG ni le disarray septal ne se lisent, et aucun rapport d'épaisseur ne se calcule" },
  { k:"blocB", g:"Qualifie la lecture", l:"Bloc B — paroi ventriculaire droite" },
  { k:"blocC", g:"Qualifie la lecture", l:"Bloc C — oreillettes et sillon auriculo-ventriculaire" },
  { k:"jonctionVCS", g:"Qualifie la lecture", l:"Jonction veine cave supérieure / oreillette droite laissée en place", grave:true,
    manque:"zone du nœud sinusal entamée : « cutting this area risks loss of landmarks should it become necessary to examine the node ». Le tissu nodal devient inlocalisable — écrire non explorable, pas normal" },
  { k:"arteresNodales", g:"Qualifie la lecture", l:"Artères nodales repérées sur la coupe" },
  { k:"quatreCavites", g:"Qualifie la lecture", l:"Coupe quatre cavités disponible",
    manque:"sans coupe quatre cavités, l'équilibre des cavités droite et gauche ne se juge pas ; l'asymétrie ventriculaire n'est pas évaluable" },
  { k:"transillumination", g:"Décisions d'autopsie — non rattrapables sur lame", l:"Septum transilluminé avant prélèvement",
    manque:"une CIV musculaire punctiforme se voit à la transillumination et se manque sur lame — sans ce geste, ne pas écrire septum intègre" },
  { k:"rapports", g:"Décisions d'autopsie — non rattrapables sur lame", l:"Rapports vasculaires examinés avant ouverture" },
  { k:"poids", g:"Décisions d'autopsie — non rattrapables sur lame", l:"Poids du cœur noté",
    manque:"« As a very minimum, the heart weight should be recorded » — non rattrapable après coupe" },
  { k:"congele", g:"Décisions d'autopsie — non rattrapables sur lame", l:"Fragment de myocarde congelé", grave:true,
    manque:"sans congelé, les enzymes oxydatives et les colorations lipidiques sur coupe à congélation sont perdues : « Staining of frozen sections of myocardium may show reduction in oxidative enzymes or increase in cytoplasmic lipid. » Une surcharge métabolique peut rester indémontrable" },
  { k:"caryotype", g:"Décisions d'autopsie — non rattrapables sur lame", l:"Caryotype et tissus en congélation prévus",
    manque:"« Devant toute pathologie cardiaque, un caryotype est réalisé même en cas de macération ainsi qu'un prélèvement de tissus en congélation. » — geste d'autopsie, non rattrapable" },
  { k:"glutaraldehyde", g:"Décisions d'autopsie — non rattrapables sur lame", l:"Fragment fixé au glutaraldéhyde pour microscopie électronique",
    manque:"sans glutaraldéhyde, ni les anomalies mitochondriales ni les inclusions myéliniques ne se documentent" }
];

/* ── 03 · Rétention ───────────────────────────────────────────────────────── */
/* Les deux lignes myocardiques de la Table 37.1 [ernst, ch. 37] font les bornes ;
   les bandes de service restent, avec leur divergence portée. Les non datables se
   signalent à part : ils se voient, ils ne datent pas. */
var BANDE_SERVICE = "bande de service, divergence portée et non tranchée — la source tient qu'aucun organe fœtal ne date bien entre 2 et 4 semaines";

var RETENTION = [
  { k:"basoInterneVG", l:"Perte de basophilie nucléaire limitée à la moitié interne du VG",
    b:"24 h et plus", d:"24 h", h:24, q:"bon",
    note:"DIVERGENCE PORTÉE, non tranchée : le CR du corpus décrit à 24 h une “discrète perte de basophilie nucléaire des cardiomyocytes de la moitié interne du VG, persistance dans la moitié externe” ; le référentiel FOETO place la même perte de basophilie myocardique dans une fenêtre 4—12 h. Les deux bornes ne se recouvrent pas. Écrire les deux, ne pas choisir." },
  { k:"basoDeuxMoities", l:"Perte de basophilie nucléaire étendue aux deux moitiés de la paroi VG",
    b:"48 h et plus", d:"48 h", h:48, q:"bon",
    note:"Au-delà de la paroi, ne rien conclure sur le tissu nodal : le nœud n'a pas de chronologie de lyse propre dans le corpus." },
  { k:"bandeService2a4", l:"Cœur encore lisible mais aucun repère de datation fin (2 à 4 semaines)",
    b:"2 à 4 semaines", d:"2—4 sem.", h:336, q:"moyen",
    note:"Borne de service, pas un critère positif. « There is no fetal organ that provides a good estimate of the timing of fetal death between 2 and 4 weeks » ; la fiche redit « il n'existe aucun organe fœtal donnant une bonne estimation entre 2 et 4 semaines ». La borne est déclarée large parce que le corpus n'en propose pas de plus étroite.",
    alerte:BANDE_SERVICE },
  { k:"bandeService4a8", l:"Rétention prolongée présumée au-delà de 4 semaines",
    b:"plus de 4 semaines", d:"> 4 sem.", h:672, q:"moyen",
    note:"Même réserve : aucune borne fine au-delà de 2 semaines dans le corpus. Ne pas convertir cette bande en une durée chiffrée.",
    alerte:BANDE_SERVICE },
  { k:"nodalIllisible", l:"Tissu nodal non identifiable sur la coupe",
    b:"aucune borne", d:"—", h:0, q:"mauvais",
    note:"Un nœud introuvable ne date rien : c'est un défaut de repérage ou de lyse, pas un chronomètre." },
  { k:"lymphoEfface", l:"Lymphocytes myocardiques non reconnaissables",
    b:"aucune borne", d:"—", h:0, q:"mauvais",
    note:"« In macerated myocardial tissues, lymphocytes can be nearly impossible to recognize » — écrire indéterminable, jamais absence d'inflammation." },
  { k:"necrosePanPM", l:"Nécrose pan-myocardique diffuse sans territoire",
    b:"aucune borne", d:"—", h:0, q:"mauvais",
    note:"Le CR du corpus l'écrit “discrète nécrose pan myocardique post-mortem” : c'est un artefact de rétention, il ne fournit aucune borne." },
  { k:"inflamPolymorphePM", l:"Inflammation polymorphe diffuse sans nécrose myocytaire",
    b:"aucune borne", d:"—", h:0, q:"mauvais",
    note:"Le corpus l'écrit “discrète inflammation polymorphe post mortem diffuse” et “inflammation de signification inconnue, mineure, probablement artéfactuelle”. Ne pas la lire comme une myocardite ni comme un délai." },
  { k:"liquidePericarde", l:"Liquide séro-sanglant abondant dans le sac péricardique",
    b:"aucune borne", d:"—", h:0, q:"mauvais",
    note:"« in macerated fetuses, it may contain abundant serosanguineous fluid » : conséquence de la macération, pas un épanchement pathologique et pas une horloge." },
  { k:"cytoarchitectureTient", l:"Cytoarchitecture conservée malgré une macération franche",
    b:"aucune borne", d:"—", h:0, q:"mauvais",
    note:"« Despite the obvious maceration, the morphology … is still visible. » et « l'examen du cœur, contrairement à celui du cerveau est presque toujours interprétable ». Cette robustesse permet de LIRE le cœur, elle ne permet pas de le DATER : ne pas transformer une cytoarchitecture tenue en délai court." }
];

/* ── 04 · Maturation ──────────────────────────────────────────────────────── */
/* Le cœur n'a pas d'échelle de maturation. Ce tableau ne classe pas : il liste
   les rares repères DATÉS de la fiche § 3, chacun dans sa fenêtre, sans continuum. */
var STADES = [
  { k:"septation", l:"Septation ventriculaire en cours d'achèvement", max:9.5,
    note:"repère embryonnaire ; au-delà, la septation est acquise et ne date plus rien" },
  { k:"valvesAnneau", l:"Valves AV et anneau fibreux complets, en cours de maturation", max:16,
    note:"« By approximately 12 weeks of development, the AV and outflow tract valve structures are complete, but they continue to undergo maturation » et « By approximately 12 weeks of gestation, the fibrous annulus is mostly complete » — un repère acquis, pas une graduation" },
  { k:"vacuolisationMax", l:"Vacuolisation glycogénique myocytaire physiologique, encore marquée", max:30,
    note:"la clarté cytoplasmique du myocyte fœtal est NORMALE à ce terme ; elle ne se cote pas et ne se compte pas" },
  { k:"coussinetsCanal", l:"Coussinets intimaux du canal artériel du troisième trimestre", max:37,
    note:"« small areas of intimal thickening with some disruption of the underlying internal elastic lamina are present even in late fetal life » — normal, ne pas lire une lésion" },
  { k:"cytoplasmeEosinophile", l:"Cytoplasme myocytaire plus abondant et plus éosinophile", max:99,
    note:"« As the fetus approaches term, the clearing of the fetal myocyte cytoplasm is generally less prominent. » — tendance de fin de grossesse, pas un stade" }
];

/* ── 04 bis · Mesures pariétales et endocardiques ─────────────────────────── */
var MESURE = {
  titre:"Mesures pariétales et endocardiques — aucune normale fœtale publiée",
  defLabel:"cavité où la mesure est prise",
  optLabel:"coloration de l'endocarde",
  defs:[
    { k:"vg", l:"Ventricule gauche" },
    { k:"vd", l:"Ventricule droit" },
    { k:"og", l:"Oreillette gauche" },
    { k:"od", l:"Oreillette droite" },
    { k:"indeterminee", l:"Cavité non identifiable sur la coupe" }
  ],
  opts:[
    { k:"hes", l:"HES seul" },
    { k:"orceine", l:"Orcéine" },
    { k:"tvma", l:"Trichrome vert lumière / TVMA" },
    { k:"duo", l:"Orcéine + trichrome" },
    { k:"aucune", l:"Aucune coloration spéciale" }
  ],
  champs:[
    { id:"vg",    label:"Paroi VG (micromètres)", min:0, max:20000, step:10 },
    { id:"vd",    label:"Paroi VD (micromètres)", min:0, max:20000, step:10 },
    { id:"endo",  label:"Endocarde, épaisseur maximale (micromètres)", min:0, max:5000, step:10 },
    { id:"ratio", label:"Rapport trabéculé / compact", min:0, max:20, step:0.1 }
  ]
};

function verdictMesure(){
  var v   = E.mesure.v || {};
  var def = E.mesure.def, opt = E.mesure.opt;
  var vg = v.vg, vd = v.vd, endo = v.endo, ratio = v.ratio;
  var rien = !vg && !vd && !endo && !ratio;
  if (rien) return { cls:"", txt:"Aucune mesure saisie — les mesures pariétales sont facultatives ; rien ne se déduit d'un champ vide." };

  var T = [], pire = "ok";
  function bad(){ pire = "bad"; }
  function warn(){ if (pire !== "bad") pire = "warn"; }

  if ((vg && !vd) || (vd && !vg)){
    bad();
    T.push("Une seule paroi ventriculaire mesurée : la valeur isolée ne dit rien, c'est le rapport qui se lit, il se saisit en PAIRE. Le corpus ne donne qu'un couple, “assymétrie de taille des parois ventriculaires (de l'ordre de 720 µm pour le VG et 370 µm pour le VD)”, et jamais une normale de paroi isolée.");
  }
  if (vg && vd){
    T.push("rapport VG/VD = " + (vg / vd).toFixed(2) + " — à rapporter au couple d'exemple du corpus (720 µm / 370 µm), qui est un CAS et non une norme.");
    T.push("Normale par terme non établie : aucune table de paroi ventriculaire fœtale n'est citée dans la fiche. Ne jamais écrire hypoplasie ni hypertrophie sur ces chiffres seuls.");
    T.push("Prémisse à garder avant de lire un déséquilibre : « The fetal heart shows right-sided dominance with up to two-thirds of cardiac output going through the right ventricle » — la dominance droite est la règle fœtale.");
    warn();
  }
  if (endo){
    T.push("Épaisseur endocardique : normale fœtale non établie. Le corpus n'offre que des repères de cas — “très important épaississement fibro-élastique de l'endocarde mesuré jusqu'à 1 mm (orcéine et TVMA positives)” et, ailleurs, « up to several millimetres thick ». La fiche (§ 9) signale que ces deux ordres de grandeur coexistent sans être réconciliés.");
    warn();
    if (def === "og"){
      bad();
      T.push("Mesure prise dans l'oreillette GAUCHE : « The endocardium of the left atrium is thicker than that of the right atrium » et « the endocardium occupies nearly one-third of the thickness of the atrial wall ». « This should not be mistaken for a pathological change. » Aucune fibro-élastose ne se conclut ici.");
    }
    if (!def){
      warn();
      T.push("Cavité non déclarée — est-on dans l'oreillette gauche ? L'épaisseur y est normalement majorée, la mesure change de sens selon la cavité.");
    }
    if (!opt){
      warn();
      T.push("Coloration de l'endocarde non déclarée.");
    } else if (opt === "hes"){
      warn();
      T.push("HES seul : l'HES ne distingue pas fibrose et fibro-élastose. Orcéine et trichrome sont ce que le corpus utilise pour trancher.");
    }
  }
  if (ratio){
    T.push("Rapport trabéculé / compact : aucun seuil fœtal dans le corpus — ni Keeling ni Ashworth n'en donnent. La valeur se consigne, elle ne classe pas.");
    T.push("Et la prémisse morphogénétique interdit la lecture naïve : « Ventricular myocardial compaction is, thus, not a process by which trabeculated myocardium becomes compact » ; « The compacted layer forms by addition of cells to the outer aspect of the myocardium rather than fusion (compaction) of the trabeculae. »");
    warn();
  }
  if (!E.prelev.blocA){
    warn();
    T.push("Réserve de provenance : bloc A (paroi VG + septum) non déclaré — l'orientation de la mesure n'est pas garantie.");
  }
  return { cls:pire, txt:T.join(" ") };
}

/* ── 05 · Variantes normales — chacune dans le cadre dont elle mime un signe ── */
var VARIANTES = [
  { k:"vacuolisationPhysio", g:"Vacuoles et surcharge", l:"Clarté vacuolaire du cytoplasme myocytaire",
    note:"normale au fœtus ; « If more extensive vacuolar change is seen, however, it is likely to represent pathologic change » — c'est l'étendue, non la présence, qui interroge" },
  { k:"graisseMyocyte", g:"Vacuoles et surcharge", l:"Graisse dans le cardiomyocyte",
    note:"« fat is a normal constituent of the cardiomyocyte » ; « This should not be confused with a disorder of fatty acid oxidation. »" },
  { k:"mitoses", g:"Myocytes — architecture et taille", l:"Mitoses myocytaires",
    note:"le myocarde fœtal se divise ; le corpus ne cite « numerous mitotic figures in myocytes » que dans un contexte déjà constitué. Des mitoses éparses ne se cochent pas comme signe" },
  { k:"endocardeCellulaire", g:"Endocarde et valves", l:"Endocarde riche en cellules",
    note:"« The younger the tissue, the more likely it is to be cellular. » — fonction du terme, pas une lésion" },
  { k:"endocardeOG", g:"Endocarde et valves", l:"Endocarde auriculaire gauche épaissi",
    note:"physiologique ; « This should not be mistaken for a pathological change. »" },
  { k:"stromaMyxoide", g:"Endocarde et valves", l:"Stroma valvulaire myxoïde diffus",
    note:"« Fetal valve stroma is frequently focally myxoid in character » ; seul le caractère NODULAIRE fait sortir de la variante" },
  { k:"kystesSanguins", g:"Endocarde et valves", l:"Kystes sanguins du bord libre des valves AV, versant atrial",
    note:"« a very frequent finding », jusqu'à 3 mm, « of no significance » — ni végétation ni kyste tumoral" },
  { k:"trabeculesGrossieresVD", g:"Paroi, compaction et piliers", l:"Trabéculations grossières du ventricule droit",
    note:"« Les parois ventriculaires comportent des trabéculations grossières, caractéristiques d'un ventricule de type droit »" },
  { k:"trabeculesFinesVG", g:"Paroi, compaction et piliers", l:"Trabéculations très fines du ventricule gauche",
    note:"« Le VG se caractérise par l'extrême finesse des trabéculations » ; « Si l'examen des valves AV est douteux, la comparaison des trabéculations tranchera. »" },
  { k:"coussinetsIntimaux", g:"Vaisseaux — coronaires, artères, lymphatiques", l:"Épaississements intimaux focaux des artères",
    note:"« small areas of intimal thickening with some disruption of the underlying internal elastic lamina are present even in late fetal life »" },
  { k:"dysplasieMineurePiliers", g:"Vaisseaux — coronaires, artères, lymphatiques", l:"Traits dysplasiques mineurs des artères intramurales des piliers",
    note:"« Even in the normal heart, the intramural arteries located in the papillary muscles of the atrioventricular valves may show minor dysplastic features. »" },
  { k:"disarrayJonctionPhysio", g:"Myocytes — architecture et taille", l:"Disarray à la jonction paroi libre / septum",
    note:"« Myofibre disarray occurs in the normal heart at the junction of the free wall of the ventricles with the interventricular septum »" },
  { k:"ilotsMyocardeAuriculaire", g:"Tissu de conduction", l:"Faisceau de His fragmenté en arcs et îlots (dispersion, archipels)",
    note:"« These should not be taken as evidence of aberrant conduction pathways. » — libellé v1 : îlots myocardiques dispersés dans le tissu fibreux auriculaire, relibellé d'après sa citation" },
  { k:"remodelageNodal", g:"Tissu de conduction", l:"Remodelage du tissu nodal sans dégénérescence",
    note:"acceptable « without any evidence of active degeneration, necrosis, phagocytosis, inflammation, or replacement fibrosis » ; dès que l'un de ces éléments paraît, sortir de la variante" },
  { k:"liquidePericardiqueMinime", g:"Péricarde et épicarde", l:"Petite quantité de liquide péricardique",
    note:"« A small amount of fluid is a feature of the normal pericardial sac »" },
  { k:"heterotopiePericarde", g:"Masses et nodules", l:"Tissu thymique ou thyroïdien hétérotopique dans le péricarde",
    note:"hétérotopie normale [ernst, ch. 1] — ni métastase ni tératome" },
  { k:"anitschkow", g:"Inflammation", l:"Noyaux d'Anitschkow (en chenille, en hibou sur coupe transversale)",
    note:"« described to occur commonly in fetal and neonatal hearts » ; signification inconnue — ni inclusion virale ni cellule inflammatoire" },
  { k:"lymphocytesResidents", g:"Inflammation", l:"Lymphocytes myocardiques épars (densité normale, pics à 24 et 39 SA)",
    note:"densité bimodale, comptes comparables VD / VG / SIV [ernst, ch. 1] — un infiltrat lymphocytaire n'est pas en soi anormal" },
  { k:"infiltratEpicardiqueAV", g:"Inflammation", l:"Infiltrat lymphocytaire épicardique focal au sillon AV (aneuploïdie)",
    note:"« A focal ventricular epicardial lymphocytic infiltrate that extends into the superficial myocardium, particularly at the AV groove » — décrit avec la trisomie 21 et la triploïdie : ne fait pas une myocardite" },
  { k:"hematopoieseEpicardique", g:"Inflammation", l:"Îlots d'hématopoïèse épicardique autour des coronaires et des gros troncs",
    note:"13 % des mort-nés [ernst, ch. 1] — ni infiltrat inflammatoire ni tumeur" },
  { k:"mastocytesMegacaryocytes", g:"Inflammation", l:"Mastocytes interstitiels, noyaux de mégacaryocytes intracapillaires",
    note:"composants normaux du myocarde [ashworth, ch. 1]" }
];

/* ── 06 · Cadres — dans l'ordre où on lit la lame ─────────────────────────── */
var CADRES = [
  { g:"Contexte hors lame — dissection, clinique", hors:true },
  { g:"Repérage de la coupe et des cavités", sur:"Orientation — avant toute lecture" },
  { g:"Paroi, compaction et piliers", sur:"Architecture — faible grossissement" },
  { g:"Endocarde et valves", sur:"Architecture — faible grossissement" },
  { g:"Péricarde et épicarde", sur:"Architecture — faible grossissement" },
  { g:"Vaisseaux — coronaires, artères, lymphatiques", sur:"Architecture — faible grossissement" },
  { g:"Masses et nodules", sur:"Architecture — faible grossissement" },
  { g:"Fibrose et calcification", sur:"Myocarde — du faible au fort grossissement" },
  { g:"Nécrose et souffrance ischémique", sur:"Myocarde — du faible au fort grossissement" },
  { g:"Myocytes — architecture et taille", sur:"Myocarde — du faible au fort grossissement" },
  { g:"Vacuoles et surcharge", sur:"Myocarde — du faible au fort grossissement" },
  { g:"Inflammation", sur:"Myocarde — du faible au fort grossissement" },
  { g:"Tissu de conduction", sur:"Tissu de conduction — nœuds sinusal et AV, faisceau de His" }
];

/* ── 06 · Signes ──────────────────────────────────────────────────────────────
   On coche ce qu'on voit, un signe à la fois. Aucun nom de maladie ici : les
   noms se lisent dans DIAGS, par association des signes présents. Un signe
   branché (fv) prend son libellé et son HPO dans FOETO ; le libellé v1 reste
   écrit à côté. bloc:false = polarité normale, hors du « Non » en bloc. */
var SIGNES = [
  /* — Contexte hors lame — dissection, clinique — */
  { k:"antiRo", fv:"FOETO:PF.COE-MAL-153", g:"Contexte hors lame — dissection, clinique",
    meta:"anticorps traversant le placenta à partir de 18 SA ; risque de BAV congénital 3 % [ashworth, ch. 12] contre ≈ 2 % [keeling, ch. 20] — divergence portée" },
  { k:"defectPericarde", fv:"FOETO:PF.COE-MAL-042", g:"Contexte hors lame — dissection, clinique",
    meta:"plus souvent à gauche ; 30–50 % ont des anomalies associées [ashworth, ch. 11]" },
  { k:"defectSeptal", fiche:"[soffoet, ch. 5]", g:"Contexte hors lame — dissection, clinique", l:"Défect du septum interventriculaire",
    meta:"porte le négatif v1 de septation. « Si l'examen du cœur n'a décelé aucun défect, on ne peut plus désormais parler de cœur normal sans pratiquer une coupe complémentaire » ; une CIV musculaire punctiforme se voit à la transillumination et se manque sur lame" },
  { k:"situsAnormal", fiche:"[ashworth, ch. 3]", g:"Contexte hors lame — dissection, clinique", l:"Situs autre que solitus",
    meta:"porte le négatif v1 de situs. Il se lit sur les auricules et les rapports veineux, que le bloc détruit : « in the atria it is possible to develop isomerism – it is impossible for this to occur in the ventricles »" },
  /* — Repérage de la coupe et des cavités — */
  { k:"trabeculesGrossieres", bloc:false, fv:"FOETO:PF.COE-NOR-112", g:"Repérage de la coupe et des cavités", mag:"faible", l:"Trabéculations grossières sur la coupe" },
  { k:"trabeculesFines", bloc:false, fv:"FOETO:PF.COE-NOR-111", g:"Repérage de la coupe et des cavités", mag:"faible", l:"Trabéculations très fines sur la coupe" },
  { k:"caviteNonIdentifiable", fiche:"[soffoet, ch. 5]", g:"Repérage de la coupe et des cavités", mag:"faible", l:"Cavité d'origine non identifiable sur la coupe" },
  { k:"coupeOG", fiche:"[ashworth, ch. 1]", g:"Repérage de la coupe et des cavités", mag:"faible", l:"Coupe passant par l'oreillette gauche",
    meta:"signe de LOCALISATION, coché dès que la mesure ou l'épaississement porte sur l'OG" },
  { k:"cavitesEffondrees", fiche:"[keeling, ch. 20]", g:"Repérage de la coupe et des cavités", mag:"faible", l:"Cavités effondrées ou déformées par la fixation" },
  { k:"hemorragieIntraVentriculaire", fiche:"[corpus CR]", g:"Repérage de la coupe et des cavités", mag:"faible", l:"Hémorragie intra-ventriculaire" },
  { k:"coupeOblique", fv:"FOETO:PF.COE-NOR-100", g:"Repérage de la coupe et des cavités", mag:"moyen", l:"Coupe oblique ou tangentielle du myocarde",
    meta:"« oblique or tangential sectioning » ; les fibres sont « organised as geodesic curves around toroid nested layers », une coupe hors axe fabrique un faux disarray" },
  /* — Paroi, compaction et piliers — */
  { k:"trabeculesEpais", fv:"FOETO:PF.COE-RET-030", g:"Paroi, compaction et piliers", mag:"faible", l:"Couche trabéculée épaisse au regard de la couche compacte" },
  { k:"compacteMince", fiche:"[keeling, ch. 20]", g:"Paroi, compaction et piliers", mag:"faible", l:"Couche compacte amincie" },
  { k:"cavitePresqueEpicarde", fiche:"[keeling, ch. 20]", g:"Paroi, compaction et piliers", mag:"faible", l:"Cavité ventriculaire s'étendant presque jusqu'à l'épicarde",
    meta:"« The left ventricular cavity extends almost to the epicardial surface among a myriad of thin muscular trabeculations »" },
  { k:"recessusEndocardes", fv:"FOETO:PF.COE-MAL-167", g:"Paroi, compaction et piliers", mag:"faible", l:"Récessus intertrabéculaires profonds, tapissés d'endocarde" },
  { k:"piliersMalDeveloppes", fv:"FOETO:PF.COE-MAL-164", g:"Paroi, compaction et piliers", mag:"faible", l:"Piliers mal individualisés ou mal développés" },
  { k:"piliersAmincis", fv:"FOETO:PF.COE-MAL-163", g:"Paroi, compaction et piliers", mag:"faible", l:"Piliers amincis, cavité d'aspect dilaté" },
  { k:"paroiVDParcheminee", fv:"FOETO:PF.COE-MAL-162", g:"Paroi, compaction et piliers", mag:"faible" },
  { k:"desequilibre", fiche:"[corpus CR]", g:"Paroi, compaction et piliers", mag:"faible", l:"Asymétrie des parois ventriculaires (déséquilibre droite / gauche)",
    meta:"porte le négatif v1 d'équilibre. Écrire asymétrie, jamais hypoplasie ni hypertrophie sur un rapport mesuré à la lame : la dominance droite est la règle fœtale" },
  /* — Endocarde et valves — */
  { k:"endoLamellaire", fv:"FOETO:PF.COE-CLA-012", g:"Endocarde et valves", mag:"faible", l:"Endocarde épaissi, fibro-élastique lamellaire dense",
    meta:"« dense laminar fibroelastic tissue that usually does not show increased vascularity or inflammatory cell infiltration »" },
  { k:"endoVG", fiche:"[ashworth, ch. 7]", g:"Endocarde et valves", mag:"faible", l:"Épaississement endocardique portant sur le ventricule gauche",
    meta:"« The right ventricle usually does not show significant endocardial fibrosis. »" },
  { k:"endoPiliers", fiche:"[ashworth, ch. 7]", g:"Endocarde et valves", mag:"faible", l:"Épaississement endocardique s'étendant aux piliers et cordages" },
  { k:"endoBiventriculaire", fiche:"[keeling, ch. 20]", g:"Endocarde et valves", mag:"faible", l:"Épaississement endocardique des deux ventricules",
    meta:"répartition inhabituelle : le VD n'est pas le siège attendu, vérifier l'orientation du bloc" },
  { k:"endoFocalPeriLesionnel", fiche:"[keeling, ch. 20]", g:"Endocarde et valves", mag:"faible", l:"Épaississement endocardique focal au contact d'une lésion myocardique" },
  { k:"valveEpaissie", fiche:"[ashworth, ch. 1]", g:"Endocarde et valves", mag:"faible", l:"Valve globalement épaissie" },
  { k:"endoSansVascul", fiche:"[ashworth, ch. 7]", g:"Endocarde et valves", mag:"moyen", l:"Épaississement endocardique sans néovascularisation ni infiltrat",
    meta:"le corollaire du critère précédent : la pauvreté cellulaire fait partie de la description" },
  { k:"endoCellulaire", fiche:"[ashworth, ch. 1]", g:"Endocarde et valves", mag:"moyen", l:"Endocarde épaissi et riche en cellules",
    meta:"« The younger the tissue, the more likely it is to be cellular. » — à confronter au terme avant d'en faire une lésion" },
  { k:"myxoideNodulaire", fv:"FOETO:PF.COE-DYS-022", g:"Endocarde et valves", mag:"moyen", l:"Structures myxoïdes NODULAIRES dans le stroma valvulaire",
    meta:"« Fetal valve stroma is frequently focally myxoid in character, but nodular myxoid structures are considered a sign of valvular dysplasia. » ; la valve normale « may be rather myxoid, but should not be nodular »" },
  { k:"macrophagesAlcian", fv:"FOETO:PF.COE-MAL-158", g:"Endocarde et valves", mag:"technique" },
  /* — Péricarde et épicarde — */
  { k:"reactionPericardique", fv:"FOETO:PF.COE-MAL-166", g:"Péricarde et épicarde", mag:"faible",
    meta:"terme générique, hors association : « these consist of haemorrhage, exudation of fluid, fibrin or inflammatory cells, or fibrous proliferation. » — répondre laquelle ci-dessous" },
  { k:"hemorragiePericarde", fv:"FOETO:PF.COE-MAL-077", g:"Péricarde et épicarde", mag:"faible", l:"Hémorragie dans le sac péricardique" },
  { k:"pericardeFibrose", fiche:"[ashworth, ch. 11]", g:"Péricarde et épicarde", mag:"faible", l:"Fibrose du péricarde" },
  { k:"kysteMesothelial", fv:"FOETO:PF.COE-MAL-088", g:"Péricarde et épicarde", mag:"faible",
    meta:"angles cardio-phréniques, revêtu de mésothélium — incident, sans traitement [ashworth, ch. 11]" },
  { k:"pointPonction", fiche:"[ashworth, ch. 12]", g:"Péricarde et épicarde", mag:"faible", l:"Effraction épicardique focale d'allure traumatique" },
  { k:"pericarditeFibrine", fiche:"[ashworth, ch. 11]", g:"Péricarde et épicarde", mag:"moyen", l:"Dépôt de fibrine à la surface du péricarde" },
  { k:"amasEosinoPericarde", fiche:"[ashworth, ch. 11]", g:"Péricarde et épicarde", mag:"moyen", l:"Infiltrat inflammatoire du péricarde",
    meta:"« The pericardium has a very restricted repertoire of reactions to injury » — l'aspect ne désigne pas la cause" },
  /* — Vaisseaux — coronaires, artères, lymphatiques — */
  { k:"thromboseCoronaire", fiche:"[corpus CR]", g:"Vaisseaux — coronaires, artères, lymphatiques", mag:"faible", l:"Thrombose d'une artère coronaire" },
  { k:"coronairesDilatees", fv:"FOETO:PF.COE-MAL-155", g:"Vaisseaux — coronaires, artères, lymphatiques", mag:"faible", l:"Artères coronaires dilatées" },
  { k:"thromboseCatheter", fv:"FOETO:PF.COE-VAS-011", g:"Vaisseaux — coronaires, artères, lymphatiques", mag:"faible",
    meta:"iatrogène, sur cathéter ombilical ou canulation — situation postnatale [keeling, ch. 20]" },
  { k:"calcificationElastique", fv:"FOETO:PF.COE-MAL-154", g:"Vaisseaux — coronaires, artères, lymphatiques", mag:"moyen", l:"Calcium déposé dans et entre les lames élastiques artérielles",
    meta:"« deposition of calcium in and between the elastic laminae »" },
  { k:"proliferationIntimale", fv:"FOETO:PF.COE-MAL-165", g:"Vaisseaux — coronaires, artères, lymphatiques", mag:"moyen", l:"Prolifération fibreuse intimale marquée",
    meta:"« There is associated fibrous intimal proliferation which may be quite striking. »" },
  { k:"paroiDesorganisee", fv:"FOETO:PF.COE-VAS-010", g:"Vaisseaux — coronaires, artères, lymphatiques", mag:"moyen", l:"Paroi artérielle désorganisée, irrégulièrement amincie et épaissie",
    meta:"« disorganisation of the elements of the vascular wall with irregular thinning and thickening of the wall and encroachment on the lumen »" },
  { k:"proliferationLymphatique", fiche:"[corpus CR]", g:"Vaisseaux — coronaires, artères, lymphatiques", mag:"moyen", l:"Prolifération lymphatique",
    meta:"porte le négatif v1 de prolifération lymphatique ; sans marquage endothélial lymphatique, constat morphologique seulement" },
  /* — Masses et nodules — */
  { k:"noduleCirconscrit", fv:"FOETO:PF.COE-TUM-033", g:"Masses et nodules", mag:"faible", l:"Nodule bien circonscrit dans le myocarde",
    meta:"« well circumscribed within the myocardium »" },
  { k:"nodulesMultiples", fv:"FOETO:PF.COE-MAL-168", g:"Masses et nodules", mag:"faible", l:"Nodules multiples" },
  { k:"noduleUnique", fiche:"[keeling, ch. 20]", g:"Masses et nodules", mag:"faible", l:"Nodule unique" },
  { k:"siegeSIV", fiche:"[keeling, ch. 20]", g:"Masses et nodules", mag:"faible", l:"Masse siégeant dans le septum interventriculaire" },
  { k:"masseIntrapericardique", fiche:"[keeling, ch. 20]", g:"Masses et nodules", mag:"faible", l:"Masse intrapéricardique refoulant le cœur" },
  { k:"calcificationTumorale", fiche:"[keeling, ch. 20]", g:"Masses et nodules", mag:"moyen", l:"Calcification au sein de la masse",
    meta:"« Calcification is common. »" },
  { k:"collageneFusiforme", fv:"FOETO:PF.COE-VAS-008", g:"Masses et nodules", mag:"moyen", l:"Prolifération de cellules fusiformes uniformes dans un collagène abondant",
    meta:"« abundant collagen that contains uniform spindle cells »" },
  { k:"elementsTeratomateux", fiche:"[keeling, ch. 20]", g:"Masses et nodules", mag:"moyen", l:"Tissus de plusieurs feuillets embryonnaires dans la masse" },
  { k:"elementsImmatures", fv:"FOETO:PF.COE-TUM-031", g:"Masses et nodules", mag:"moyen",
    meta:"éléments tératomateux habituels, y compris immatures, ± éléments vitellins [keeling, ch. 20]" },
  { k:"cellulesAraignee", fv:"FOETO:PF.COE-TUM-003", g:"Masses et nodules", mag:"fort", l:"Grandes cellules claires à expansions cytoplasmiques radiaires",
    meta:"« composed of large cells with clear cytoplasm » ; « The nucleus is connected by strands of cytoplasm to the cell membrane, giving rise to so-called spider cells. »" },
  { k:"cellulesHistiocytoides", fv:"FOETO:PF.COE-DYS-018", g:"Masses et nodules", mag:"fort", l:"Myocytes arrondis à cytoplasme finement vacuolaire, d'allure histiocytaire",
    meta:"« rounded myocytes with finely vacuolated cytoplasm that resemble histiocytes »" },
  /* — Fibrose et calcification — */
  { k:"foyersFibroseDissemines", fv:"FOETO:PF.COE-MET-038", g:"Fibrose et calcification", mag:"faible", l:"Multiples petits foyers de fibrose dispersés dans les ventricules",
    meta:"« multiple small foci of fibrosis scattered throughout the ventricles »" },
  { k:"fibroseMesoparietale", fv:"FOETO:PF.COE-MET-016", g:"Fibrose et calcification", mag:"faible",
    meta:"fibrose médio-myocardique, segments postéro-latéraux du VG [ashworth, ch. 10]" },
  { k:"fibrosePiliersMitraux", fv:"FOETO:PF.COE-MAL-157", g:"Fibrose et calcification", mag:"faible",
    meta:"décrite avec le myocarde dilaté [ashworth, ch. 7]" },
  { k:"pointePiliers", fv:"FOETO:PF.COE-CLA-002", g:"Fibrose et calcification", mag:"faible", l:"Fibrose ou calcification de la pointe des piliers" },
  { k:"rupturePilier", fv:"FOETO:PF.COE-CLA-009", g:"Fibrose et calcification", mag:"faible",
    meta:"rapportée dans l'atteinte liée au lupus maternel [keeling, ch. 20]" },
  { k:"cicatriceLisere", fv:"FOETO:PF.COE-CLA-013", g:"Fibrose et calcification", mag:"faible" },
  { k:"fibroseInterstitielle", fv:"FOETO:PF.COE-DYS-009", g:"Fibrose et calcification", mag:"moyen", l:"Fibrose interstitielle myocardique" },
  { k:"calcificationMyocardique", fv:"FOETO:PF.COE-MET-008", g:"Fibrose et calcification", mag:"moyen", l:"Calcification dystrophique dans le myocarde",
    meta:"« necrosis of myocardium with dystrophic calcification » ; « Infant myocardium in particular has a propensity to calcify and may do so within a day of the insult, sometimes massively. »" },
  { k:"necroseCalcifiee", fv:"FOETO:PF.COE-CLA-007", g:"Fibrose et calcification", mag:"moyen",
    meta:"perte de myocytes avec calcification dystrophique, au tissu de conduction et à la jonction AV [ashworth, ch. 12]" },
  { k:"calcificationPilier", fiche:"[corpus CR]", g:"Fibrose et calcification", mag:"moyen", l:"Calcification ponctiforme focale d'un pilier mitral",
    meta:"le CR du corpus l'écrit avec son doute : “présence d'une calcification ponctiforme focale d'un pilier mitral (artéfact ?)”" },
  /* — Nécrose et souffrance ischémique — */
  { k:"necroseSousEndocardique", fv:"FOETO:PF.COE-DYS-019", g:"Nécrose et souffrance ischémique", mag:"faible", l:"Nécrose de topographie sous-endocardique" },
  { k:"necroseRegionale", fiche:"[ashworth, ch. 6]", g:"Nécrose et souffrance ischémique", mag:"faible", l:"Nécrose myocardique limitée à un territoire" },
  { k:"necrosePanDiffuse", fiche:"[corpus CR]", g:"Nécrose et souffrance ischémique", mag:"faible", l:"Nécrose myocardique diffuse, sans systématisation",
    meta:"“discrète nécrose pan myocardique post-mortem” — à lire comme un artefact avant toute autre chose" },
  { k:"cytoarchitecturePreservee", bloc:false, fiche:"[ashworth, ch. 12]", g:"Nécrose et souffrance ischémique", mag:"faible", l:"Cytoarchitecture d'ensemble conservée malgré l'altération",
    meta:"« Despite the obvious maceration, the morphology … is still visible. » ; coché pour PONDÉRER une nécrose diffuse, jamais pour affirmer un délai" },
  { k:"myocytesHypereosinophiles", fv:"FOETO:PF.COE-INF-001", g:"Nécrose et souffrance ischémique", mag:"moyen", l:"Myocytes hyperéosinophiles",
    meta:"« The first tissue change that is evident by light microscopy is that the myocytes become hypereosinophilic. »" },
  { k:"oedemeIntercellulaire", fv:"FOETO:PF.COE-VAS-007", g:"Nécrose et souffrance ischémique", mag:"moyen", l:"Œdème intercellulaire du myocarde" },
  { k:"dilatationCapillaire", fv:"FOETO:PF.COE-VAS-001", g:"Nécrose et souffrance ischémique", mag:"moyen", l:"Dilatation des capillaires myocardiques" },
  { k:"bandesContraction", fv:"FOETO:PF.COE-NOR-004", g:"Nécrose et souffrance ischémique", mag:"fort", l:"Bandes de contraction dans les myocytes",
    meta:"le corpus dit à la fois « Contraction bands are frequently present. » et « Contraction band necrosis is uncommon. » — divergence portée, ne pas trancher" },
  { k:"marquageC9", fv:"FOETO:PF.COE-MAL-159", g:"Nécrose et souffrance ischémique", mag:"technique",
    meta:"« may be used in macerated stillbirths » — la seule technique du corpus validée sur mort-né macéré" },
  /* — Myocytes — architecture et taille — */
  { k:"disarray", fv:"FOETO:PF.COE-DYS-008", g:"Myocytes — architecture et taille", mag:"moyen",
    meta:"constat générique, hors association : répondre ensuite le SIÈGE — c'est lui qui fait le sens (jonction normale ; septum, paroi latérale, oreillette anormaux)" },
  { k:"disarraySIV", fiche:"[ashworth, ch. 7]", g:"Myocytes — architecture et taille", mag:"moyen", l:"Désorganisation des myofibres dans le septum interventriculaire",
    meta:"« disarray should not be seen in the normal heart in the interventricular septum or lateral ventricular walls »" },
  { k:"disarrayLateral", fiche:"[ashworth, ch. 7]", g:"Myocytes — architecture et taille", mag:"moyen", l:"Désorganisation des myofibres dans une paroi ventriculaire latérale" },
  { k:"disarrayAuriculaire", fiche:"[keeling, ch. 20]", g:"Myocytes — architecture et taille", mag:"moyen", l:"Désorganisation des myofibres dans le myocarde auriculaire" },
  { k:"disarrayJonction", bloc:false, fv:"FOETO:PF.COE-NOR-095", g:"Myocytes — architecture et taille", mag:"moyen", l:"Désorganisation limitée à la jonction paroi libre / septum",
    meta:"NORMAL : « Myofibre disarray occurs in the normal heart at the junction of the free wall of the ventricles with the interventricular septum ». Coché pour écarter, jamais pour retenir" },
  { k:"hypertrophieMyocytaire", fv:"FOETO:PF.COE-DYS-013", g:"Myocytes — architecture et taille", mag:"moyen", l:"Myocytes élargis à noyau volumineux, aspect étalé",
    meta:"« disorganised hypertrophied myocytes that have a splayed appearance »" },
  { k:"myocytesEtires", fv:"FOETO:PF.COE-DYS-017", g:"Myocytes — architecture et taille", mag:"moyen", l:"Myocytes étirés, amincis" },
  { k:"noyauxHyperchromatiques", fv:"FOETO:PF.COE-MAL-161", g:"Myocytes — architecture et taille", mag:"fort", l:"Noyaux myocytaires volumineux, hyperchromatiques et irréguliers",
    meta:"« myocytes with enlarged, hyperchromatic and irregular nuclei » ; le CR du corpus écrit “certains cardiomyocytes possèdent un noyau hyperchromatique et trop volumineux”" },
  { k:"mitosesNombreuses", fv:"FOETO:PF.COE-MAL-160", g:"Myocytes — architecture et taille", mag:"fort",
    meta:"hors association : le critère « numerous mitotic figures in myocytes » d'une forme infantile de myocarde dilaté est inutilisable in utero, les mitoses étant normales jusqu'à la naissance (fiche § 9.9)" },
  /* — Vacuoles et surcharge — */
  { k:"vacuolisationEtendue", fv:"FOETO:PF.COE-MET-040", g:"Vacuoles et surcharge", mag:"moyen", l:"Vacuolisation myocytaire d'étendue anormale",
    meta:"« If more extensive vacuolar change is seen, however, it is likely to represent pathologic change »" },
  { k:"vacuolesSousEndocardiques", fv:"FOETO:PF.COE-CLA-010", g:"Vacuoles et surcharge", mag:"moyen", l:"Vacuolisation prédominant en sous-endocardique",
    meta:"siège sous-endocardique : « particularly in the subendocardial location » ; « Care should be taken to exclude … ischemia, cardiomyopathy, myocarditis, or a storage disorder. »" },
  { k:"granulesEosinophiles", fv:"FOETO:PF.COE-DYS-003", g:"Vacuoles et surcharge", mag:"fort", l:"Granulations éosinophiles cytoplasmiques anormales" },
  { k:"lipideMyocardite", fv:"FOETO:PF.COE-INF-012", g:"Vacuoles et surcharge", mag:"fort",
    meta:"« This should not be confused with a disorder of fatty acid oxidation. »" },
  { k:"pasResistantDiastase", fv:"FOETO:PF.COE-MET-018", g:"Vacuoles et surcharge", mag:"technique", l:"Matériel PAS positif partiellement résistant à la diastase",
    meta:"« inclusions are PAS-positive and are partly resistant to diastase digestion »" },
  { k:"oilRedPositif", fv:"FOETO:PF.COE-MET-004", g:"Vacuoles et surcharge", mag:"technique", l:"Surcharge lipidique démontrée sur coupe à congélation",
    meta:"« dramatically demonstrated if frozen sections of myocardium are stained with fat stains such as oil-red-O »" },
  { k:"enzymesReduites", fv:"FOETO:PF.COE-MAL-156", g:"Vacuoles et surcharge", mag:"technique",
    meta:"« Staining of frozen sections of myocardium may show reduction in oxidative enzymes or increase in cytoplasmic lipid. » — exige le fragment congelé" },
  { k:"mitochondriesAnormales", fv:"FOETO:PF.COE-MET-039", g:"Vacuoles et surcharge", mag:"technique", l:"Mitochondries anormales en microscopie électronique" },
  { k:"mitochondriesGeantes", fv:"FOETO:PF.COE-MET-021", g:"Vacuoles et surcharge", mag:"technique",
    meta:"visibles « at light and ultrastructural level » [ashworth, ch. 12]" },
  { k:"inclusionsMyeliniques", fv:"FOETO:PF.COE-MET-019", g:"Vacuoles et surcharge", mag:"technique", l:"Inclusions lamellaires ou myéliniques en microscopie électronique" },
  /* — Inflammation — */
  { k:"infiltratMyocardique", fv:"FOETO:PF.COE-INF-011", g:"Inflammation", mag:"moyen", l:"Infiltrat inflammatoire interstitiel du myocarde" },
  { k:"neutrophilesPrecoces", fv:"FOETO:PF.COE-INF-004", g:"Inflammation", mag:"moyen", l:"Polynucléaires neutrophiles au sein de l'infiltrat",
    meta:"« Neutrophils may be prominent, particularly in the early stages. » ; dans l'ischémie, « infiltration by neutrophil polymorphs, usually by 12–24 hours »" },
  { k:"microAbces", fv:"FOETO:PF.COE-INF-013", g:"Inflammation", mag:"moyen", l:"Micro-abcès ou foyers à polynucléaires groupés" },
  { k:"inflammationPolymorpheDiffuse", fiche:"[corpus CR]", g:"Inflammation", mag:"moyen", l:"Inflammation polymorphe diffuse, sans foyer ni nécrose",
    meta:"“discrète inflammation polymorphe post mortem diffuse” — artefact de rétention attendu" },
  { k:"necroseMyocytaireFocale", fv:"FOETO:PF.COE-RET-017", g:"Inflammation", mag:"fort", l:"Nécrose ou dégénérescence des myocytes au contact de l'infiltrat",
    meta:"au contact de l'infiltrat : « Myocyte necrosis or damage must also be present for the diagnosis. »" },
  { k:"toxoplasme", fv:"FOETO:PF.COE-INF-014", g:"Inflammation", mag:"fort",
    meta:"nécrose, cicatrice, calcification, pseudokystes possibles dans le myocarde et le placenta [keeling, ch. 20]" },
  { k:"phenotypeT", fiche:"[ashworth, ch. 8]", g:"Inflammation", mag:"technique", l:"Infiltrat à prédominance lymphocytaire T documentée",
    meta:"seuil cité : « a value of > 14 leukocytes per mm² with > 7 T-cells per mm² » — établi sur biopsie endomyocardique, jamais validé sur cœur fœtal (fiche § 9.10)" },
  { k:"agentViral", fiche:"[ashworth, ch. 12]", g:"Inflammation", mag:"technique", l:"Agent viral mis en évidence dans le myocarde" },
  { k:"parvovirus", fv:"FOETO:PF.COE-INF-010", g:"Inflammation", mag:"technique",
    meta:"« Parvovirus may be demonstrated in myocyte nuclei by in situ hybridisation or immunohistochemistry »" },
  /* — Tissu de conduction — */
  { k:"nodalIntrouvable", fiche:"[ernst, ch. 1]", g:"Tissu de conduction", mag:"faible", l:"Tissu nodal non retrouvé sur les coupes disponibles" },
  { k:"septumMembraneuxLarge", fv:"FOETO:PF.COE-MAL-169", g:"Tissu de conduction", mag:"faible",
    meta:"« In Down's syndrome, the membranous septum is abnormally large. » — seul constat de ce contexte lisible sur le bloc de conduction" },
  { k:"infiltratSillonAV", fiche:"[keeling, ch. 20]", g:"Tissu de conduction", mag:"moyen", l:"Infiltrat centré sur le sillon auriculo-ventriculaire",
    meta:"« not just of the conduction tissue, but also of much of the atrioventricular junction and the surrounding myocardium »" },
  { k:"fibroseNodale", fv:"FOETO:PF.COE-VAS-009", g:"Tissu de conduction", mag:"moyen", l:"Fibrose du tissu nodal ou de la jonction auriculo-ventriculaire" },
  { k:"calcificationNodale", fiche:"[ashworth, ch. 12]", g:"Tissu de conduction", mag:"moyen", l:"Calcification au sein du tissu de conduction" },
  { k:"infiltratPauvre", fiche:"[ashworth, ch. 12]", g:"Tissu de conduction", mag:"moyen", l:"Lésion de conduction avec très peu de cellules inflammatoires",
    meta:"« it is striking how frequently there is minimal inflammatory cell infiltration » et « remarkably little inflammatory cell infiltration »" },
  { k:"perteMyocytesNodaux", fiche:"[ashworth, ch. 12]", g:"Tissu de conduction", mag:"fort", l:"Perte des myocytes du tissu nodal" },
  { k:"depotsCalciques", fv:"FOETO:PF.COE-MET-037", g:"Tissu de conduction", mag:"technique",
    meta:"« There is deposition of calcium (black) beneath the aortic valve, and focally beneath the endocardium of the right ventricle (von Kossa stain). »" }
];

/* ── 06 bis · Associations — affichées, jamais cochées ────────────────────────
   Le nom se déduit des signes. « cle » est le signe pivot : sans lui le compte
   peut être atteint sans que l'association tienne. fv = terme maladie FOETO,
   affiché, jamais exporté d'office. */
var DIAGS = [
  { k:"fee", l:"Fibro-élastose endocardique", fv:"FOETO:PF.COE-MAL-062", cle:"endoLamellaire", min:2,
    signes:["endoLamellaire","endoSansVascul","endoVG","endoPiliers","endoCellulaire"],
    stop:" — l'épaisseur n'a pas de normale fœtale établie : le corpus donne “jusqu'à 1 mm” d'un côté et « up to several millimetres thick » de l'autre, sans les réconcilier. Un endocarde riche en cellules peut n'être que jeune (« The younger the tissue, the more likely it is to be cellular. »). Surtout, la FEE est un phénotype, pas une cause : si la mitrale est atrésique, « if the mitral valve is atretic, there is no endocardial fibroelastosis » — et le corpus décrit alors “un épaississement endocardique sans réelle fibro-élastose” dont « a very similar picture is seen ». Sans orcéine ni trichrome, ne pas trancher entre fibrose et fibro-élastose." },

  { k:"feeOG", l:"Épaississement endocardique de l'oreillette gauche — piège physiologique", cle:"coupeOG", min:1,
    signes:["coupeOG","endoLamellaire","endoCellulaire","endoSansVascul"],
    stop:" — dans l'oreillette gauche l'endocarde est NORMALEMENT plus épais : « The endocardium of the left atrium is thicker than that of the right atrium » et « the endocardium occupies nearly one-third of the thickness of the atrial wall ». « This should not be mistaken for a pathological change. » Ne pas écrire de fibro-élastose sur une coupe d'OG sans un autre argument." },

  { k:"nonCompaction", l:"Non-compaction du myocarde ventriculaire", fv:"FOETO:PF.COE-MAL-099", cle:"trabeculesEpais", min:2,
    signes:["trabeculesEpais","compacteMince","recessusEndocardes","cavitePresqueEpicarde","piliersMalDeveloppes"],
    stop:" — « Non-compaction of the ventricular myocardium is a phenotypic expression and not a discrete disease » et « there is no evidence of persistence of the embryonic phenotype ». La morphogenèse interdit le raisonnement naïf : « Ventricular myocardial compaction is, thus, not a process by which trabeculated myocardium becomes compact », « The compacted layer forms by addition of cells to the outer aspect of the myocardium rather than fusion (compaction) of the trabeculae. » Aucun rapport trabéculé / compact fœtal seuillé n'existe dans le corpus. Noter aussi qu'« There is often prominent endocardial fibroelastosis » : la FEE associée ne dément pas, elle accompagne." },

  { k:"disarrayPatho", l:"Désorganisation myocytaire de siège anormal", min:2,
    signes:["disarraySIV","disarrayLateral","hypertrophieMyocytaire","fibroseInterstitielle","disarrayAuriculaire"],
    stop:" — le siège fait tout : « disarray should not be seen in the normal heart in the interventricular septum or lateral ventricular walls », mais la jonction paroi libre / septum est normalement désorganisée. Le constat générique de désorganisation n'entre pas ici : c'est le siège répondu qui ouvre l'association. Et le disarray n'est pas spécifique d'une cause : « Other cases with identical hypertrophic phenotype, for example those caused by maternal diabetes or a mitochondrial disease, do not show significant disarray. » Le corpus oriente vers le prélèvement plutôt que vers l'étiquette : « where possible genetic material should be obtained at autopsy to permit gene screening »." },

  { k:"fauxDisarray", l:"Désorganisation d'origine technique ou physiologique", min:1,
    signes:["disarrayJonction","coupeOblique","caviteNonIdentifiable","cavitesEffondrees"],
    stop:" — à écarter AVANT toute lecture pathologique. Les fibres sont « organised as geodesic curves around toroid nested layers » et « The left is more regular while the right is distorted by the pulmonary infundibulum. » : une « oblique or tangential sectioning » fabrique un désordre qui n'existe pas." },

  { k:"cmd", l:"Aspect de myocarde dilaté", fv:"FOETO:PF.COE-MAL-173", cle:"noyauxHyperchromatiques", min:2,
    signes:["noyauxHyperchromatiques","myocytesEtires","piliersAmincis","foyersFibroseDissemines","fibrosePiliersMitraux"],
    stop:" — « Fetal myocarditis can be indistinguishable from dilated cardiomyopathy » ; les « multiple small foci of fibrosis scattered throughout the ventricles » et les « numerous mitotic figures in myocytes » se voient dans les deux, et les mitoses sont normales jusqu'à la naissance : elles ne comptent pas ici. Chercher la nécrose myocytaire au contact d'un infiltrat avant de retenir une cardiomyopathie." },

  { k:"myocardite", l:"Myocardite", fv:"FOETO:PF.COE-INF-016", cle:"necroseMyocytaireFocale", min:2,
    signes:["necroseMyocytaireFocale","infiltratMyocardique","neutrophilesPrecoces","phenotypeT","agentViral","parvovirus","microAbces","toxoplasme","lipideMyocardite"],
    stop:" — la définition exige la nécrose : « Myocarditis is defined as an inflammatory infiltrate of the myocardium with necrosis and/or degeneration of adjacent myocytes not typical of the ischemic injury associated with coronary artery disease. » et « Myocyte necrosis or damage must also be present for the diagnosis. » Le seuil quantitatif cité est « a value of > 14 leukocytes per mm² with > 7 T-cells per mm² », il suppose un phénotypage. Enfin « The histological features do not permit distinction between the various causes of myocarditis. » : ne pas nommer l'agent sur la morphologie." },

  { k:"infiltratSansNecrose", l:"Infiltrat myocardique sans nécrose — non concluant", min:1,
    signes:["infiltratMyocardique","inflammationPolymorpheDiffuse","phenotypeT"],
    stop:" — sans nécrose myocytaire adjacente, la définition n'est pas remplie. Le corpus décrit une “discrète inflammation polymorphe post mortem diffuse” et une “inflammation de signification inconnue, mineure, probablement artéfactuelle”. Et si le tissu est macéré : « In macerated myocardial tissues, lymphocytes can be nearly impossible to recognize » — l'infiltrat n'est alors ni présent ni absent, il est illisible." },

  { k:"lupus", l:"Atteinte du tissu de conduction", fv:"FOETO:PF.COE-MAL-179", min:2,
    signes:["fibroseNodale","calcificationNodale","perteMyocytesNodaux","pointePiliers","infiltratPauvre","infiltratSillonAV","necroseCalcifiee","rupturePilier","depotsCalciques","antiRo"],
    stop:" — l'infiltrat manque souvent : « it is striking how frequently there is minimal inflammatory cell infiltration » et « remarkably little inflammatory cell infiltration ». Son absence ne dément rien. L'atteinte déborde le nœud : « not just of the conduction tissue, but also of much of the atrioventricular junction and the surrounding myocardium ». La lésion décrite est une « necrosis of myocardium with dystrophic calcification ». Si le nœud n'a pas été retrouvé, écrire non explorable ; et rappeler qu'un remodelage nodal reste acceptable « without any evidence of active degeneration, necrosis, phagocytosis, inflammation, or replacement fibrosis ». Sérologie maternelle anti-SSA/Ro – SSB/La à confronter." },

  { k:"ischemie", l:"Souffrance ischémique myocardique", fv:"FOETO:PF.COE-MAL-181", cle:"myocytesHypereosinophiles", min:2,
    signes:["myocytesHypereosinophiles","bandesContraction","oedemeIntercellulaire","dilatationCapillaire","neutrophilesPrecoces","necroseSousEndocardique","necroseRegionale","calcificationMyocardique","cicatriceLisere","marquageC9"],
    stop:" — la fenêtre temporelle bride la lecture : « it takes up to 12 h following the ischemic insult for histological changes to appear » [keeling, ch. 20], contre 6–8 h pour le premier changement visible [ashworth, ch. 6] — divergence portée ; l'infiltrat neutrophile n'arrive qu'avec une « infiltration by neutrophil polymorphs, usually by 12–24 hours ». Une ischémie récente ne laisse donc rien voir. Sur les bandes de contraction le corpus se contredit — « Contraction bands are frequently present. » contre « Contraction band necrosis is uncommon. » — divergence portée, non tranchée. La vulnérabilité de fond : « The heart is the organ with the highest oxygen consumption for its weight in the body »." },

  { k:"necrosePM", l:"Nécrose myocardique d'allure post-mortem", cle:"necrosePanDiffuse", min:1,
    signes:["necrosePanDiffuse","inflammationPolymorpheDiffuse","cytoarchitecturePreservee"],
    stop:" — à écarter avant toute ischémie : le corpus écrit “discrète nécrose pan myocardique post-mortem”. Ce qui sépare l'ischémie de l'artefact, c'est le TERRITOIRE, pas l'intensité. Sur un fœtus macéré, l'immunohistochimie C9 peut trancher : « Immunohistochemistry for the C9 complement component may demonstrate myocyte damage at an earlier stage of its development than coagulative necrosis and may be used in macerated stillbirths. »" },

  { k:"surcharge", l:"Surcharge myocytaire", cle:"vacuolisationEtendue", min:2,
    signes:["vacuolisationEtendue","vacuolesSousEndocardiques","pasResistantDiastase","oilRedPositif","granulesEosinophiles","mitochondriesAnormales","mitochondriesGeantes","inclusionsMyeliniques","enzymesReduites","fibroseMesoparietale","macrophagesAlcian"],
    stop:" — NE JAMAIS ÉCRIRE absence de vacuolisation myocytaire : la vacuolisation est physiologique chez le fœtus, seule son étendue interroge — « If more extensive vacuolar change is seen, however, it is likely to represent pathologic change ». De même « fat is a normal constituent of the cardiomyocyte » et « This should not be confused with a disorder of fatty acid oxidation. » ; une vacuolisation vue en contexte inflammatoire « is a frequent finding in myocarditis and should not be taken as evidence of an underlying metabolic abnormality. » Le corpus exige d'écarter le reste : « Care should be taken to exclude … ischemia, cardiomyopathy, myocarditis, or a storage disorder. » Piège de coloration enfin : “les vacuoles ne prennent pas la coloration PAS ni PAS + amylase” sur un matériel déjà fixé, et le corpus réclame un “PAS sur cœur normal” comme témoin." },

  { k:"pompe", l:"Surcharge glycogénique de type II", fv:"FOETO:PF.COE-MET-044", min:2,
    signes:["vacuolisationEtendue","pasResistantDiastase","vacuolesSousEndocardiques"],
    stop:" — le critère cité est « vacuolar change in the myocytes with accumulation of glycogen » avec des inclusions dont « inclusions are PAS-positive and are partly resistant to diastase digestion ». Deux garde-fous négatifs : « Myocyte disarray and myocardial fibrosis are not found. » et « myocyte disarray is not prominent ». Un disarray franc doit faire reconsidérer." },

  { k:"histiocytoide", l:"Cardiomyopathie histiocytoïde", fv:"FOETO:PF.COE-MAL-172", cle:"cellulesHistiocytoides", min:1,
    signes:["cellulesHistiocytoides","nodulesMultiples","mitochondriesAnormales"],
    stop:" — « rounded myocytes with finely vacuolated cytoplasm that resemble histiocytes ». Le piège est la confusion avec une tumeur : « Histiocytoid cardiomyopathy may cause confusion because of its multiple nodules, although the histology is quite distinct. » La microscopie électronique est ce qui sépare." },

  { k:"rhabdomyome", l:"Rhabdomyome", fv:"FOETO:PF.COE-RET-022", cle:"cellulesAraignee", min:2,
    signes:["cellulesAraignee","noduleCirconscrit","nodulesMultiples","noduleUnique"],
    stop:" — « well circumscribed within the myocardium », « composed of large cells with clear cytoplasm », « The nucleus is connected by strands of cytoplasm to the cell membrane, giving rise to so-called spider cells. » Le nombre change la portée : « If multiple, it is much more likely to be associated with tuberous sclerosis. » Un nodule UNIQUE n'autorise pas à évoquer une sclérose tubéreuse." },

  { k:"fibrome", l:"Fibrome cardiaque", fv:"FOETO:PF.COE-TUM-010", min:2,
    signes:["collageneFusiforme","noduleUnique","siegeSIV","calcificationTumorale"],
    stop:" — « abundant collagen that contains uniform spindle cells » et « Calcification is common. » Ne pas se rassurer sur l'histologie : « despite their benign histology, they may have significant morbidity and even mortality »." },

  { k:"teratome", l:"Tératome intrapéricardique", fv:"FOETO:PF.COE-TUM-029", min:1,
    signes:["masseIntrapericardique","elementsTeratomateux","elementsImmatures"],
    stop:" — une masse intrapéricardique n'est pas une masse myocardique ; ne pas conclure sans plusieurs feuillets identifiés." },

  { k:"dysplasieValvulaire", l:"Dysplasie valvulaire", fv:"FOETO:PF.COE-MAL-177", cle:"myxoideNodulaire", min:1,
    signes:["myxoideNodulaire","valveEpaissie"],
    stop:" — seul le caractère NODULAIRE fait sortir de la normale : « Fetal valve stroma is frequently focally myxoid in character, but nodular myxoid structures are considered a sign of valvular dysplasia. » ; une valve normale « may be rather myxoid, but should not be nodular ». C'est l'un des rares apports réels de l'histologie ici : « Histology is useful in confirming abnormality in some cases, e.g. dysplasia of a valve »." },

  { k:"pericardite", l:"Atteinte péricardique", fv:"FOETO:PF.COE-INF-017", min:2,
    signes:["pericarditeFibrine","pericardeFibrose","amasEosinoPericarde","hemorragiePericarde"],
    stop:" — « The pericardium has a very restricted repertoire of reactions to injury » : l'aspect ne désigne pas la cause. Et l'atteinte péricardique peut tromper sur l'essentiel — « and may overshadow the myocardial involvement ». Un liquide abondant chez un macéré n'est pas un épanchement : « in macerated fetuses, it may contain abundant serosanguineous fluid » ; « A small amount of fluid is a feature of the normal pericardial sac »." },

  { k:"calcificationArterielle", l:"Calcification artérielle", fv:"FOETO:PF.COE-MET-006", min:2,
    signes:["calcificationElastique","proliferationIntimale","coronairesDilatees"],
    stop:" — « deposition of calcium in and between the elastic laminae » avec « There is associated fibrous intimal proliferation which may be quite striking. » Ne pas confondre avec les épaississements intimaux normaux de fin de grossesse : « small areas of intimal thickening with some disruption of the underlying internal elastic lamina are present even in late fetal life »." },

  { k:"dysplasieFibromusculaire", l:"Dysplasie fibromusculaire artérielle", fv:"FOETO:PF.COE-MAL-036", cle:"paroiDesorganisee", min:1,
    signes:["paroiDesorganisee","proliferationIntimale","thromboseCoronaire"],
    stop:" — « disorganisation of the elements of the vascular wall with irregular thinning and thickening of the wall and encroachment on the lumen », mais « It is likely that fibromuscular dysplasia is not a single entity but rather a phenotype indicating a limited range of responses of the arterial wall to injury. » Et le faux positif est prévu : « Even in the normal heart, the intramural arteries located in the papillary muscles of the atrioventricular valves may show minor dysplastic features. » — le corpus écrit ailleurs « may show minor dysplastic features » pour la même situation." },

  { k:"gesteKcl", l:"Lésion en rapport avec le geste de fœticide", cle:"pointPonction", min:1,
    signes:["pointPonction","calcificationPilier","hemorragieIntraVentriculaire"],
    stop:" — « If there has been feticide by injection of potassium chloride into the heart, the fatal puncture site in the epicardium is frequently visible at post-mortem. » Les altérations peuvent « mimic maceration changes » : ne pas les lire comme un délai. Réciproquement « KCl injection may not be applied directly into the heart » — l'absence de point de ponction ne dément pas le geste. La calcification d'un pilier reste douteuse dans le corpus lui-même : “présence d'une calcification ponctiforme focale d'un pilier mitral (artéfact ?)”." },

  { k:"identificationCavite", l:"Identification de la cavité par les trabéculations", min:1,
    signes:["trabeculesGrossieres","trabeculesFines","caviteNonIdentifiable"],
    stop:" — outil d'orientation, pas un diagnostic. « Les parois ventriculaires comportent des trabéculations grossières, caractéristiques d'un ventricule de type droit » ; « Le VG se caractérise par l'extrême finesse des trabéculations » ; « Si l'examen des valves AV est douteux, la comparaison des trabéculations tranchera. »" },

  { k:"blocInexploitable", l:"Bloc non concluant", min:2,
    signes:["caviteNonIdentifiable","cavitesEffondrees","coupeOblique","nodalIntrouvable"],
    stop:" — rien de coché ne veut pas dire absent : ça veut dire non regardé. Un bloc mal orienté ou effondré ne produit pas de négatif ; écrire non explorable et redemander une coupe." }
];

/* ── 07 · Négatifs obligatoires — déduits des signes ou calculés ──────────── */
/* Négatif calculé sur plusieurs signes : énoncé si tous sont répondus absents,
   en défaut dès que l'un est présent, ouvert sinon — jamais supposé. */
function tousAbsents(ks){
  var v = ks.map(function(k){ return E.signes[k]; });
  return v.indexOf(POS) >= 0 ? false : v.every(function(x){ return x === NEG; }) ? true : null;
}

var NEGATIFS = [
  { k:"lyse", l:"Absence de perte de basophilie nucléaire des différents viscères",
    p:"“Absence de perte de basophilie nucléaire des différents viscères” ; le CR alternatif du corpus écrit “absence de rétention, la basophilie nucléaire est présente dans tous les tissus” — déduit de la rétention répondue absente",
    ko:"perte de basophilie constatée — ne pas écrire ce négatif, la rétention est renseignée plus haut",
    auto:function(){ var r = retNiveau(); return r === "absente" ? true : r ? false : null; } },
  { k:"cytoarchitecture", l:"Cytoarchitecture normale",
    p:"“Cytoarchitecture normale” ; “Leur morphologie est normale, notamment celle des cardiomyocytes” — déduit des signes de désorganisation, d'hypertrophie et d'étirement myocytaires",
    ko:"désorganisation, hypertrophie ou étirement myocytaire PRÉSENT — cytoarchitecture altérée ou illisible : écrire non interprétable, pas normale",
    auto:function(){ return tousAbsents(["disarray","disarraySIV","disarrayLateral","disarrayAuriculaire","hypertrophieMyocytaire","myocytesEtires"]); } },
  { k:"septation", signe:"defectSeptal", l:"Septation complète, absence de communication interventriculaire",
    p:"“Sur lame, le cœur possède un septum intègre” ; “Sur lames, le cœur présente 4 cavités normales, absence de CIV” ; “la septation est complète” — sans transillumination du septum, une CIV musculaire punctiforme se manque sur lame",
    ko:"défect du septum interventriculaire PRÉSENT — « Si l'examen du cœur n'a décelé aucun défect, on ne peut plus désormais parler de cœur normal sans pratiquer une coupe complémentaire »" },
  { k:"situs", signe:"situsAnormal", l:"Cœur en situs solitus",
    p:"“Le cœur est en situs solitus” — non déterminable sur une lame isolée : il se lit à la dissection",
    ko:"situs autre que solitus — rappel : « in the atria it is possible to develop isomerism – it is impossible for this to occur in the ventricles »" },
  { k:"equilibre", signe:"desequilibre", l:"Bon équilibre des cavités droite et gauche",
    p:"“bon équilibre des cavités droite et gauche” ; le CR l'écrit aussi “équilibre ventriculaire” — sans coupe quatre cavités, l'équilibre ne se juge pas",
    ko:"asymétrie des parois ventriculaires PRÉSENTE — l'écrire asymétrie, jamais hypoplasie ni hypertrophie ; la référence est asymétrique : « The fetal heart shows right-sided dominance with up to two-thirds of cardiac output going through the right ventricle »" },
  { k:"hypertrophie", signe:"hypertrophieMyocytaire", l:"Absence d'hypertrophie",
    p:"“Absence d'hypertrophie” — aucune normale de paroi ventriculaire fœtale par terme n'est disponible : ce négatif se tient sur les myocytes, pas sur une mesure isolée",
    ko:"hypertrophie myocytaire PRÉSENTE — aucune normale de paroi ventriculaire fœtale par terme n'est disponible dans le corpus : ne pas la conclure d'une mesure isolée" },
  { k:"compaction", signe:"trabeculesEpais", l:"Compaction ventriculaire normale",
    p:"“compaction ventriculaire normale” ; le CR écrit aussi “bonne compaction”",
    ko:"couche trabéculée disproportionnée PRÉSENTE — aucun seuil trabéculé / compact fœtal n'existe dans le corpus : le constat ne se soutient que d'une impression d'ensemble, le dire" },
  { k:"endocarde", l:"Endocarde normal",
    p:"“endocarde normal” ; “Cytoarchitecture normale, équilibre ventriculaire, bonne compaction, endocarde normal” — sans orcéine ni trichrome, l'HES ne distingue pas fibrose et fibro-élastose",
    ko:"épaississement endocardique PRÉSENT — sans orcéine ni trichrome, l'HES ne distingue pas fibrose et fibro-élastose : écrire non évalué",
    auto:function(){ return tousAbsents(["endoLamellaire","endoVG","endoPiliers","endoBiventriculaire","endoFocalPeriLesionnel","endoCellulaire"]); } },
  { k:"fibrose", l:"Absence de fibro-élastose endocardique et de fibrose",
    p:"“absence de fibroélastose endocardique” ; “absence de fibrose”",
    ko:"fibro-élastose ou fibrose PRÉSENTE — même réserve de coloration ; et sur l'oreillette gauche l'endocarde est normalement épais, la lecture y change de sens",
    auto:function(){ return tousAbsents(["endoLamellaire","fibroseInterstitielle","foyersFibroseDissemines","fibroseMesoparietale","cicatriceLisere"]); } },
  { k:"inflammation", l:"Absence d'inflammation",
    p:"“absence d'inflammation” — refusé sur cœur macéré : « In macerated myocardial tissues, lymphocytes can be nearly impossible to recognize »",
    ko:"inflammation PRÉSENTE ou illisible (lymphocytes non reconnaissables en rétention) — écrire indéterminable, jamais absence d'inflammation",
    auto:function(){
      if (E.retention.lymphoEfface === "present") return false;
      var v = E.signes.infiltratMyocardique;
      return v === NEG ? true : v === POS ? false : null; } },
  { k:"necroseMyocytaire", signe:"necroseMyocytaireFocale", l:"Absence de nécrose myocytaire significative",
    p:"le corpus n'écrit ce négatif qu'après avoir écarté la “discrète nécrose pan myocardique post-mortem” ; la nécrose est la moitié du critère de myocardite, elle se nie séparément de l'infiltrat",
    ko:"nécrose myocytaire PRÉSENTE — préciser d'abord si elle est territoriale ou diffuse avant toute lecture" },
  { k:"coronaires", l:"Coronaires sans particularité, absence de thrombose",
    p:"“Les coronaires sont sans particularité” ; “Absence de thrombose coronaire” — coronaires absentes des coupes : écrire non explorées",
    ko:"lésion coronaire PRÉSENTE — thrombose, dilatation, calcification, prolifération intimale ou paroi désorganisée",
    auto:function(){ return tousAbsents(["thromboseCoronaire","coronairesDilatees","calcificationElastique","proliferationIntimale","paroiDesorganisee"]); } },
  { k:"hemorragieIV", signe:"hemorragieIntraVentriculaire", l:"Absence d'hémorragie intra-ventriculaire",
    p:"“il n'y a pas d'hémorragie intra-ventriculaire” — cavités effondrées ou lavées : l'absence n'est pas démontrable",
    ko:"hémorragie intra-ventriculaire PRÉSENTE" },
  { k:"surcharge", l:"Absence de surcharge des autres viscères",
    p:"“absence de surcharge d'autres viscères (cœur…)” ; “PAS et trichrome vert de Gomori sur muscle et cœur sans particularité” — sans “PAS sur cœur normal” comme témoin, la négativité n'est pas interprétable",
    ko:"surcharge myocytaire PRÉSENTE — et ne jamais formuler ce négatif comme une absence de vacuolisation myocytaire : la vacuolisation est physiologique ; “les vacuoles ne prennent pas la coloration PAS ni PAS + amylase” sur certains matériels",
    auto:function(){ return tousAbsents(["vacuolisationEtendue","pasResistantDiastase"]); } },
  { k:"viral", l:"Absence d'agent viral démontré",
    p:"le corpus ne le documente qu'après technique : « Parvovirus may be demonstrated in myocyte nuclei by in situ hybridisation or immunohistochemistry » — sans technique virale, écrire non recherché, pas absent",
    ko:"agent viral DÉMONTRÉ dans le myocarde",
    auto:function(){ return tousAbsents(["agentViral","parvovirus"]); } },
  { k:"lymphatique", signe:"proliferationLymphatique", l:"Absence de prolifération lymphatique",
    p:"“sur muscle, tube digestif, cœur, absence de prolifération lymphatique” — sans marquage endothélial lymphatique, ce négatif est morphologique seulement",
    ko:"prolifération lymphatique PRÉSENTE" },
  { k:"valves", signe:"myxoideNodulaire", l:"Stroma valvulaire myxoïde non nodulaire",
    p:"le caractère focalement myxoïde est normal, seul le nodule sort de la norme — valves non vues en coupe : non explorées",
    ko:"structures myxoïdes NODULAIRES PRÉSENTES — « nodular myxoid structures are considered a sign of valvular dysplasia »" },
  { k:"conduction", l:"Tissu nodal sans lésion évolutive",
    p:"formulation acceptable seulement au sens de la source : « without any evidence of active degeneration, necrosis, phagocytosis, inflammation, or replacement fibrosis » — refusée dès 48 h de rétention ou si le nœud n'a pas été retrouvé",
    ko:"tissu nodal lésé, non retrouvé, ou illisible (rétention ≥ 48 h) — « cutting this area risks loss of landmarks should it become necessary to examine the node » : écrire non explorable",
    auto:function(){
      var r = par(RETENTION, retNiveau());
      if ((r && r.h >= 48) || E.signes.nodalIntrouvable === POS) return false;
      return tousAbsents(["fibroseNodale","calcificationNodale","perteMyocytesNodaux","infiltratSillonAV"]); } }
];

/* ── 08 · Techniques ──────────────────────────────────────────────────────── */
var TECHNIQUES = [
  { k:"orceine",     l:"Orcéine",                                q:"Les lames élastiques de l'endocarde et des artères sont-elles individualisées ?" },
  { k:"tvma",        l:"Trichrome vert lumière / TVMA",          q:"La composante collagène est-elle distinguée de la composante élastique ?" },
  { k:"masson",      l:"Trichrome de Masson",                    q:"La fibrose de remplacement du tissu nodal est-elle visible ?" },
  { k:"sma",         l:"Actine musculaire lisse",                q:"Les myocytes nodaux résiduels sont-ils repérables ?" },
  { k:"c9",          l:"Immunohistochimie C9 du complément",     q:"Y a-t-il une souffrance myocytaire plus précoce que la nécrose de coagulation ? (utilisable sur macéré)" },
  { k:"vonKossa",    l:"Von Kossa",                              q:"Les dépôts calciques sont-ils confirmés, et où siègent-ils ?" },
  { k:"pas",         l:"PAS et PAS + diastase",                  q:"Le matériel intracytoplasmique est-il PAS positif et résistant à la diastase ? Un témoin de cœur normal est-il passé ?" },
  { k:"oilRedO",     l:"Oil red O sur coupe à congélation",      q:"Une surcharge lipidique est-elle visible au-delà du contenu graisseux normal du cardiomyocyte ?" },
  { k:"enzymes",     l:"Enzymes oxydatives sur coupe congelée",  q:"Les enzymes oxydatives sont-elles diminuées ?" },
  { k:"met",         l:"Microscopie électronique",               q:"Les mitochondries et les inclusions sont-elles anormales ?" },
  { k:"gomori",      l:"Trichrome vert de Gomori",               q:"Y a-t-il des fibres rouges déguenillées sur le muscle associé ?" },
  { k:"phenotypage", l:"Phénotypage lymphocytaire",              q:"L'infiltrat dépasse-t-il le seuil de T par mm² retenu pour la myocardite ?" },
  { k:"viral",       l:"Hybridation in situ ou immunohistochimie virale", q:"Un génome viral est-il présent dans les noyaux myocytaires ?" },
  { k:"cd34",        l:"Marquage endothélial",                   q:"La densité et la nature des vaisseaux sont-elles précisées ?" },
  { k:"perls",       l:"Perls",                                  q:"Une surcharge en fer est-elle présente ?" },
  { k:"caryotype",   l:"Caryotype",                              q:"Le caryotype a-t-il été demandé, y compris en cas de macération ?" },
  { k:"genetique",   l:"Matériel congelé pour étude génétique",  q:"Du matériel a-t-il été conservé pour un criblage génique ?" }
];

/* ── Propositions de techniques — déduites des clics, jamais imposées ─────── */
function suggerer(){
  var o = {};
  function vu(){ for (var i = 0; i < arguments.length; i++) if (E.signes[arguments[i]] === POS) return true; return false; }
  function mettre(){ for (var i = 0; i < arguments.length; i++) o[arguments[i]] = 1; }
  function nko(k){ return etatNegatif(par(NEGATIFS, k)) === "ko"; }

  if (vu("endoLamellaire","endoSansVascul","endoVG","endoPiliers","endoBiventriculaire","endoFocalPeriLesionnel","endoCellulaire")) mettre("orceine","tvma");
  if (vu("trabeculesEpais","compacteMince","cavitePresqueEpicarde")) mettre("orceine","tvma");

  if (vu("fibroseNodale","perteMyocytesNodaux","nodalIntrouvable","infiltratSillonAV","pointePiliers")) mettre("masson","sma");
  if (vu("calcificationNodale","calcificationPilier","calcificationMyocardique","calcificationElastique",
         "calcificationTumorale","necroseCalcifiee","depotsCalciques")) mettre("vonKossa");

  if (vu("myocytesHypereosinophiles","bandesContraction","necroseSousEndocardique","necroseRegionale","necrosePanDiffuse")) mettre("c9");

  if (vu("vacuolisationEtendue","vacuolesSousEndocardiques","granulesEosinophiles")) mettre("pas","oilRedO","met");
  if (vu("pasResistantDiastase")) mettre("pas","met");
  if (vu("mitochondriesAnormales","mitochondriesGeantes","inclusionsMyeliniques","enzymesReduites")) mettre("met","enzymes","gomori");
  if (vu("cellulesHistiocytoides")) mettre("met");
  if (vu("fibroseMesoparietale")) mettre("masson");

  if (vu("infiltratMyocardique","neutrophilesPrecoces","microAbces","inflammationPolymorpheDiffuse")) mettre("phenotypage");
  if ((vu("necroseMyocytaireFocale") && vu("infiltratMyocardique")) || vu("agentViral")) mettre("viral");

  if (vu("disarraySIV","disarrayLateral","disarrayAuriculaire","hypertrophieMyocytaire")) mettre("genetique","caryotype");
  if (vu("noduleCirconscrit","nodulesMultiples","cellulesAraignee","collageneFusiforme","elementsTeratomateux")) mettre("caryotype");

  if (vu("proliferationIntimale","paroiDesorganisee","thromboseCoronaire","coronairesDilatees")) mettre("orceine");
  if (vu("myocytesEtires","foyersFibroseDissemines")) mettre("masson","cd34");
  if (vu("proliferationLymphatique")) mettre("cd34");

  if (nko("surcharge")) mettre("perls","pas");
  if (nko("viral")) mettre("viral");
  if (nko("conduction")) mettre("masson");

  if (E.prelev.congele && SIGNES.some(function(x){ return E.signes[x.k] === POS; })) mettre("genetique");
  if (E.mesure.opt === "hes" && E.mesure.v && E.mesure.v.endo) mettre("orceine","tvma");
  return o;
}

/* ── Contrôles propres au cœur ────────────────────────────────────────────── */
async function testsOrgane(chk, clic, set, crTient, pause){
  function pose(k, v){ if (E.signes[k] !== v) clic("les", k, v); }
  function ote(k){ if (E.signes[k]) clic("les", k, E.signes[k]); }
  function propre(){ SIGNES.forEach(function(s){ ote(s.k); }); }
  function tenue(k){ return associations().some(function(a){ return a.d.k === k && a.tenu; }); }
  function lue(k){ return associations().some(function(a){ return a.d.k === k; }); }
  function niveau(k){ var s = $("retNiveau"); s.value = k; s.dispatchEvent(new Event("change", {bubbles:true})); }
  function vidRet(){ niveau(""); RETENTION.forEach(function(r){ if (E.retention[r.k]) clic("ret", r.k, E.retention[r.k]); }); }
  function vidMes(){ MESURE.champs.forEach(function(c){ set("m_" + c.id, ""); }); }
  function neg(k){ return etatNegatif(par(NEGATIFS, k)); }
  function vR(){ return $("vRetention").textContent; }

  /* le banc commun laisse des signes posés : on part d'un état voulu, pas supposé */
  propre(); vidRet();

  /* 1. rétention : la borne haute recevable gagne, les divergences sont écrites */
  niveau("basoInterneVG");
  chk("24 h : borne lue", vR().indexOf("Rétention 24 h et plus") >= 0);
  chk("24 h : divergence FOETO portée", vR().indexOf("4—12 h") >= 0);
  niveau("basoDeuxMoities");
  chk("48 h prime sur 24 h", vR().indexOf("Rétention 48 h et plus") >= 0);
  niveau("bandeService2a4");
  chk("bande 2 à 4 semaines : divergence citée", vR().indexOf("aucun organe fœtal donnant une bonne estimation") >= 0);
  chk("bande de service : une réserve écrite, plus un booléen", vR().indexOf("bande de service") >= 0 && vR().indexOf("true") < 0);
  niveau("absente");
  chk("rétention absente → négatif de lyse énoncé", neg("lyse") === "ok");
  niveau("basoInterneVG");
  chk("perte de basophilie → négatif de lyse en défaut", neg("lyse") === "ko");
  vidRet();
  clic("ret", "necrosePanPM", "present");
  clic("ret", "lymphoEfface", "present");
  chk("prédicteurs mauvais seuls : aucune borne", vR().indexOf("aucune borne recevable") >= 0);
  vidRet();
  clic("kcl", "kcl");
  chk("KCl : point de ponction attendu, pas un signe", vR().indexOf("ATTENDUE") >= 0);
  clic("kcl", "kcl");

  /* 2. pas d'échelle de maturation cardiaque */
  chk("titre de stade : pas d'échelle", /n'a pas d'échelle de maturation/.test(STADE_TITRE));
  chk("le retard renvoie à l'asymétrie, pas au terme", /ASYMÉTRIE/.test(RETARD_NOTE));
  chk("aucun CR du corpus n'écrit de stade cardiaque", /Aucun CR du corpus n'écrit de stade de maturation cardiaque/.test(RETARD_NOTE));
  set("sa", "24");
  clic("stade", "septation");
  chk("repère daté discordant : la réserve de fond s'affiche", $("vMaturation").textContent.indexOf("pas d'échelle de maturation") >= 0);
  clic("stade", "septation");

  /* 3. mesures pariétales */
  vidMes();
  set("m_vg", "720");
  chk("paroi isolée refusée", verdictMesure().cls === "bad");
  set("m_vd", "370");
  chk("rapport calculé", verdictMesure().txt.indexOf("rapport VG/VD = 1.95") >= 0);
  chk("aucune normale de paroi par terme", verdictMesure().txt.indexOf("Normale par terme non établie") >= 0);
  chk("jamais hypoplasie ni hypertrophie sur ces chiffres", verdictMesure().txt.indexOf("hypoplasie ni hypertrophie") >= 0);
  chk("dominance droite rappelée", verdictMesure().txt.indexOf("two-thirds of cardiac output") >= 0);
  vidMes();
  set("m_endo", "1000");
  clic("mopt", "hes");
  chk("HES seul : réserve de coloration", verdictMesure().txt.indexOf("ne distingue pas fibrose et fibro-élastose") >= 0);
  clic("mopt", "hes");
  clic("mopt", "duo");
  chk("orcéine + trichrome lève la réserve de coloration", verdictMesure().txt.indexOf("ne distingue pas fibrose et fibro-élastose") < 0);
  clic("mdef", "og");
  chk("endocarde mesuré dans l'OG : piège physiologique", verdictMesure().cls === "bad");
  chk("OG : ne pas prendre pour une lésion", verdictMesure().txt.indexOf("should not be mistaken for a pathological change") >= 0);
  clic("mdef", "og");
  clic("mdef", "vg");
  set("m_ratio", "3");
  chk("aucun seuil trabéculé / compact fœtal", verdictMesure().txt.indexOf("aucun seuil fœtal") >= 0);
  chk("la compaction n'est pas une fusion des trabécules", verdictMesure().txt.indexOf("rather than fusion") >= 0);
  vidMes();
  clic("mdef", "vg");
  clic("mopt", "duo");

  /* 4. endocarde : fibro-élastose, son piège auriculaire, ses négatifs */
  propre();
  pose("endoLamellaire", POS);
  pose("endoVG", POS);
  chk("fibro-élastose tenue sur deux signes", tenue("fee"));
  chk("orcéine et trichrome suggérés", !!suggerer().orceine && !!suggerer().tvma);
  chk("endocarde épaissi : négatifs d'endocarde et de fibrose en défaut", neg("endocarde") === "ko" && neg("fibrose") === "ko");
  pose("coupeOG", POS);
  chk("la coupe d'OG s'affiche à côté de la fibro-élastose", lue("feeOG"));
  ote("coupeOG");

  /* 5. disarray : le siège fait tout */
  propre();
  pose("disarrayJonction", POS);
  pose("coupeOblique", POS);
  chk("disarray de jonction : jamais une désorganisation anormale", !tenue("disarrayPatho"));
  chk("disarray de jonction : lu comme technique ou physiologique", tenue("fauxDisarray"));
  pose("disarray", POS);
  chk("disarray générique sans siège : pas d'association de siège anormal", !lue("disarrayPatho"));
  pose("disarraySIV", POS);
  pose("hypertrophieMyocytaire", POS);
  chk("septum + hypertrophie : désorganisation de siège anormal", tenue("disarrayPatho"));
  chk("cytoarchitecture : négatif en défaut", neg("cytoarchitecture") === "ko" && neg("hypertrophie") === "ko");

  /* 6. myocardite : le pivot est la nécrose, pas l'infiltrat */
  propre();
  pose("infiltratMyocardique", POS);
  pose("neutrophilesPrecoces", POS);
  chk("infiltrat seul : myocardite non tenue", !tenue("myocardite"));
  chk("infiltrat seul : lu comme non concluant", tenue("infiltratSansNecrose"));
  pose("necroseMyocytaireFocale", POS);
  chk("nécrose myocytaire : myocardite tenue", tenue("myocardite"));
  chk("CR : la nécrose est exigée par la définition", crTient("must also be present for the diagnosis"));
  chk("myocardite : négatif de nécrose en défaut", neg("necroseMyocytaire") === "ko");

  /* 7. inflammation sur cœur macéré : l'absence ne s'écrit pas */
  propre();
  pose("infiltratMyocardique", NEG);
  chk("infiltrat absent : absence d'inflammation énoncée", neg("inflammation") === "ok");
  clic("ret", "lymphoEfface", "present");
  chk("lymphocytes non reconnaissables : absence d'inflammation refusée", neg("inflammation") === "ko" && crTient("écrire indéterminable"));
  clic("ret", "lymphoEfface", "present");

  /* 8. conduction : infiltrat pauvre, et le négatif refusé en rétention */
  propre();
  pose("fibroseNodale", POS);
  pose("calcificationNodale", POS);
  pose("infiltratPauvre", POS);
  chk("atteinte du tissu de conduction lue", tenue("lupus"));
  chk("l'infiltrat pauvre ne dément pas", crTient("minimal inflammatory cell infiltration"));
  chk("tissu de conduction : von Kossa suggéré", !!suggerer().vonKossa);
  propre();
  ["fibroseNodale","calcificationNodale","perteMyocytesNodaux","infiltratSillonAV"].forEach(function(k){ pose(k, NEG); });
  chk("tissu nodal sans lésion : négatif énoncé", neg("conduction") === "ok");
  niveau("basoDeuxMoities");
  chk("dès 48 h de rétention : tissu nodal non concluant", neg("conduction") === "ko");
  vidRet();
  pose("nodalIntrouvable", POS);
  chk("nœud introuvable : non explorable", neg("conduction") === "ko" && !!suggerer().masson);
  ote("nodalIntrouvable");

  /* 9. ischémie contre artefact post-mortem */
  propre();
  pose("necrosePanDiffuse", POS);
  pose("cytoarchitecturePreservee", POS);
  chk("nécrose diffuse lue d'abord comme post-mortem", tenue("necrosePM"));
  chk("C9 utilisable sur macéré", crTient("may be used in macerated stillbirths"));
  chk("C9 suggéré", !!suggerer().c9);
  propre();
  pose("myocytesHypereosinophiles", POS);
  pose("necroseRegionale", POS);
  chk("nécrose territoriale : souffrance ischémique", tenue("ischemie"));
  ote("myocytesHypereosinophiles");
  pose("neutrophilesPrecoces", POS);
  chk("ischémie : sans hyperéosinophilie, le pivot manque", !tenue("ischemie") && lue("ischemie"));

  /* 10. surcharge : la vacuolisation est physiologique */
  propre();
  pose("vacuolisationEtendue", POS);
  pose("pasResistantDiastase", POS);
  chk("surcharge lue", tenue("surcharge"));
  chk("jamais absence de vacuolisation myocytaire", crTient("NE JAMAIS ÉCRIRE absence de vacuolisation myocytaire"));
  chk("PAS et Oil red O suggérés", !!suggerer().pas && !!suggerer().oilRedO);
  chk("surcharge : négatif en défaut, Perls proposé", neg("surcharge") === "ko" && !!suggerer().perls);

  /* 11. masses : le pivot du rhabdomyome, et le nodule unique */
  propre();
  pose("noduleCirconscrit", POS);
  pose("nodulesMultiples", POS);
  chk("nodules sans cellules en araignée : rhabdomyome non tenu", !tenue("rhabdomyome"));
  pose("cellulesAraignee", POS);
  chk("cellules en araignée : rhabdomyome tenu", tenue("rhabdomyome"));
  propre();
  pose("cellulesAraignee", POS);
  pose("noduleUnique", POS);
  chk("un nodule unique n'évoque pas la sclérose tubéreuse", crTient("If multiple, it is much more likely to be associated with tuberous sclerosis"));

  /* 12. valves */
  propre();
  pose("valveEpaissie", POS);
  chk("valve épaissie seule : dysplasie non tenue", !tenue("dysplasieValvulaire"));
  pose("myxoideNodulaire", POS);
  chk("seul le myxoïde NODULAIRE fait la dysplasie", tenue("dysplasieValvulaire"));
  ote("myxoideNodulaire");
  pose("myxoideNodulaire", NEG);
  chk("stroma non nodulaire : négatif valvulaire énoncé", neg("valves") === "ok");

  /* 13. bloc non concluant */
  propre();
  pose("caviteNonIdentifiable", POS);
  pose("cavitesEffondrees", POS);
  chk("la phrase du non regardé est écrite", crTient("rien de coché ne veut pas dire absent : ça veut dire non regardé"));

  /* 14. anti-invention et termes génériques */
  propre();
  chk("aucun grade cardiaque inventé", SIGNES.concat(DIAGS).every(function(x){ return !/grade|stade/i.test(x.l); }));
  chk("les mitoses restent une variante", !par(SIGNES, "mitoses") && !!par(VARIANTES, "mitoses"));
  chk("mitoses nombreuses : signe hors de toute association",
      !!par(SIGNES, "mitosesNombreuses") && DIAGS.every(function(d){ return d.signes.indexOf("mitosesNombreuses") < 0; }));
  chk("termes génériques hors association", DIAGS.every(function(d){
      return d.signes.indexOf("disarray") < 0 && d.signes.indexOf("reactionPericardique") < 0; }));
  chk("polarité normale hors du « Non » en bloc", ["trabeculesGrossieres","trabeculesFines","disarrayJonction","cytoarchitecturePreservee"]
      .every(function(k){ return par(SIGNES, k).bloc === false; }));
  chk("aucun bouton ne porte un diagnostic",
      DIAGS.every(function(d){ return !document.querySelector('[data-act="les"][data-k="' + d.k + '"]'); }));
  chk("aucune page citée",
      !/\bp\.\s?\d|\bpage\s\d/i.test(JSON.stringify([PRELEV, RETENTION, STADES, SIGNES, DIAGS, NEGATIFS, TECHNIQUES])));

  /* 15. divergences portées, jamais arbitrées */
  chk("rétention 24 h : divergence portée", par(RETENTION, "basoInterneVG").note.indexOf("DIVERGENCE PORTÉE") >= 0);
  chk("bandes de contraction : les deux textes", par(DIAGS, "ischemie").stop.indexOf("Contraction bands are frequently present.") >= 0 &&
      par(DIAGS, "ischemie").stop.indexOf("Contraction band necrosis is uncommon.") >= 0);
  chk("ischémie : 6–8 h contre 12 h", par(DIAGS, "ischemie").stop.indexOf("6–8 h") >= 0 && par(DIAGS, "ischemie").stop.indexOf("up to 12 h") >= 0);
  chk("FEE : deux ordres de grandeur non réconciliés", par(DIAGS, "fee").stop.indexOf("jusqu'à 1 mm") >= 0 &&
      par(DIAGS, "fee").stop.indexOf("up to several millimetres thick") >= 0);
  chk("BAV congénital : 3 % contre ≈ 2 %", par(SIGNES, "antiRo").meta.indexOf("3 %") >= 0 && par(SIGNES, "antiRo").meta.indexOf("≈ 2 %") >= 0);
  chk("Padova : seuil non validé sur cœur fœtal", par(SIGNES, "phenotypeT").meta.indexOf("jamais validé sur cœur fœtal") >= 0);

  /* 16. branchement FOETO */
  chk("v2 : libellé venu de FOETO", par(SIGNES, "endoLamellaire").l === "Épaississement fibro-élastique lamellaire dense de l'endocarde");
  chk("v2 : code FOETO du terme verbatim", codesDe(par(SIGNES, "cellulesAraignee"))[0] === "FOETO:PF.COE-TUM-003");
  chk("v2 : HPO arbitré venu de la base", par(SIGNES, "fibroseInterstitielle").hpo === "HP:0001685");
  chk("v2 : terme maladie sur l'association", par(DIAGS, "myocardite").foeto[0] === "FOETO:PF.COE-INF-016");
  chk("v2 : constat de fiche sans terme non marqué hors fiche", !par(SIGNES, "disarraySIV").horsFiche && !!par(SIGNES, "disarraySIV").fiche);
  chk("v2 : aucun signe hors fiche", SIGNES.every(function(x){ return !x.horsFiche; }));
  chk("v2 : blocs lus en §02, organe impair", BLOCS_LUS && !$("blocsBloc").hidden && $("coteBloc").hidden);
  set("rqFoeto", "araign");
  var pick = $("sgFoeto").querySelector('[data-pick="FOETO:PF.COE-TUM-003"]');
  if (pick) pick.click();
  chk("v2 : un terme porté par un signe pose le signe", !!pick && E.signes.cellulesAraignee === POS && !E.foeto["FOETO:PF.COE-TUM-003"]);

  /* état propre pour la suite du banc commun */
  propre(); vidRet(); vidMes();
  set("sa", "30");
}
