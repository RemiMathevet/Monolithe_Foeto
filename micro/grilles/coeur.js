// Fragment de donnees — coeur. Assemble par gen_grille.py en grille_coeur.html.
// Fond : fiche_coeur.md, sections 1 a 7 ; les divergences de la section 9 sont
// PORTEES dans les notes et les stop, jamais tranchees ici.

var ORGANE  = "coeur";
var TITRE   = "coeur, pericarde et arteres coronaires";
var SOURCE  = "fiche_coeur.md";
var MODULE  = "grille_coeur";
var VERSION = "1.0.1";
var PAIR    = false;

var TITRE_CR    = "COEUR";
var STADE_TITRE = "Reperes dates isoles — le coeur n'a pas d'echelle de maturation";

var KCL_TXT =
  "Foeticide au KCl declare : le point de ponction epicardique est une lesion locale ATTENDUE, " +
  "pas un signe. « If there has been feticide by injection of potassium chloride into the heart, " +
  "the fatal puncture site in the epicardium is frequently visible at post-mortem. » " +
  "Le livre ajoute que les alterations induites peuvent « mimic maceration changes » : " +
  "l'horloge de retention est donc suspendue, aucune borne ne se lit sur ce coeur. " +
  "Reserve inverse a garder : « KCl injection may not be applied directly into the heart » — " +
  "un KCl declare ne garantit pas que le myocarde ait ete traverse, l'absence de point de ponction " +
  "ne dement pas le geste.";

var RETARD_NOTE =
  " — RESERVE DE FOND : le coeur n'a pas d'echelle de maturation. Le retard cardiaque ne se " +
  "fabrique pas a partir d'un repere date isole. La fiche est explicite en section 9 : interroge " +
  "sur une echelle de maturation cardiaque, le corpus repond « il n'y en a pas » et, sur la " +
  "datation histologique du myocarde, « on ne la pratique pas ». Aucun CR du corpus n'ecrit de " +
  "stade de maturation cardiaque. La seule forme utile d'un ecart est l'ASYMETRIE entre les deux " +
  "ventricules d'un meme coeur, lue au bloc quatre cavites — pas un decalage en SA.";

var AVANCE_NOTE =
  " — RESERVE DE FOND : idem, pas d'echelle. Ne pas ecrire d'avance de maturation cardiaque. " +
  "Ce qui se lit sur ce coeur, c'est l'ASYMETRIE des deux parois ventriculaires entre elles, " +
  "sur une meme coupe, jamais un age histologique.";

var TECH_NOTE =
  "Aucune technique ne rattrape un bloc absent. « Devant toute pathologie cardiaque, un caryotype " +
  "est réalisé même en cas de macération ainsi qu'un prélèvement de tissus en congélation. » — " +
  "cette décision se prend à l'autopsie, elle ne se rattrape pas sur lame.";

var PRELEV = [
  { k:"fixation", l:"Coeur fixe au formol avant coupe", grave:true,
    manque:"Coupe a frais d'un petit coeur : les reperes se perdent. « For smaller hearts, particularly when macerated or malformed, formalin fixation of the heart is essential » — sans fixation prealable, ne rien conclure d'une geometrie de cavite ni d'une epaisseur de paroi." },
  { k:"blocA", l:"Bloc A — paroi ventriculaire gauche + septum interventriculaire", grave:true,
    manque:"Sans paroi VG et septum sur la meme coupe, ni l'endocarde du VG ni le disarray septal ne se lisent, et aucun rapport d'epaisseur ne se calcule." },
  { k:"blocB", l:"Bloc B — paroi ventriculaire droite" },
  { k:"blocC", l:"Bloc C — oreillettes et sillon auriculo-ventriculaire" },
  { k:"transillumination", l:"Septum transillumine avant prelevement",
    manque:"Une CIV musculaire punctiforme se voit a la transillumination et se manque sur lame. Sans ce geste, ne pas ecrire septum integre." },
  { k:"jonctionVCS", l:"Jonction veine cave superieure / oreillette droite laissee en place", grave:true,
    manque:"Zone du noeud sinusal entamee : « cutting this area risks loss of landmarks should it become necessary to examine the node ». Le tissu nodal devient inlocalisable — ecrire non explorable, pas normal." },
  { k:"arteresNodales", l:"Arteres nodales reperees sur la coupe" },
  { k:"quatreCavites", l:"Coupe quatre cavites disponible",
    manque:"Sans coupe quatre cavites, l'equilibre des cavites droite et gauche ne se juge pas ; l'asymetrie ventriculaire n'est pas evaluable." },
  { k:"rapports", l:"Rapports vasculaires examines avant ouverture" },
  { k:"congele", l:"Fragment de myocarde congele", grave:true,
    manque:"Sans congele, les enzymes oxydatives et les colorations lipidiques sur coupe a congelation sont perdues : « Staining of frozen sections of myocardium may show reduction in oxidative enzymes or increase in cytoplasmic lipid. » Une surcharge metabolique peut rester indemontrable." },
  { k:"caryotype", l:"Caryotype et tissus en congelation prevus",
    manque:"« Devant toute pathologie cardiaque, un caryotype est réalisé même en cas de macération ainsi qu'un prélèvement de tissus en congélation. » — geste d'autopsie, non rattrapable." },
  { k:"glutaraldehyde", l:"Fragment fixe au glutaraldehyde pour microscopie electronique",
    manque:"Sans glutaraldehyde, ni les anomalies mitochondriales ni les inclusions myeliniques ne se documentent." },
  { k:"poids", l:"Poids du coeur note",
    manque:"« As a very minimum, the heart weight should be recorded » — non rattrapable apres coupe." },
  { k:"provenance", l:"Provenance du materiel identifiee (lame de coeur entier ou bloc tissulaire oriente)",
    manque:"Provenance non declaree : une epaisseur de paroi mesuree sur un bloc non oriente ne se rapporte a aucune cavite. Aucun rapport ventriculaire ne se calcule." }
];

var RETENTION = [
  { k:"basoInterneVG", l:"Perte de basophilie nucleaire limitee a la moitie interne du VG",
    b:"24 h et plus", d:"24 h", h:24, q:"bon",
    note:"DIVERGENCE PORTEE, non tranchee : le CR du corpus decrit a 24 h une « discrète perte de basophilie nucléaire des cardiomyocytes de la moitié interne du VG, persistance dans la moitié externe » ; le referentiel FOETO place la meme perte de basophilie myocardique dans une fenetre 4—12 h. Les deux bornes ne se recouvrent pas. Ecrire les deux, ne pas choisir." },
  { k:"basoDeuxMoities", l:"Perte de basophilie nucleaire etendue aux deux moities de la paroi VG",
    b:"48 h et plus", d:"48 h", h:48, q:"bon",
    note:"Au-dela de la paroi, ne rien conclure sur le tissu nodal : le noeud n'a pas de chronologie de lyse propre dans le corpus." },
  { k:"bandeService2a4", l:"Coeur encore lisible mais aucun repere de datation fin (2 a 4 semaines)",
    b:"2 a 4 semaines", d:"2—4 sem.", h:336, q:"moyen",
    note:"Borne de service, pas un critere positif. « There is no fetal organ that provides a good estimate of the timing of fetal death between 2 and 4 weeks » ; la fiche redit « il n'existe aucun organe fœtal donnant une bonne estimation entre 2 et 4 semaines ». La borne est declaree large parce que le corpus n'en propose pas de plus etroite.",
    alerte:true },
  { k:"bandeService4a8", l:"Retention prolongee presumee au-dela de 4 semaines",
    b:"plus de 4 semaines", d:"> 4 sem.", h:672, q:"moyen",
    note:"Meme reserve : aucune borne fine au-dela de 2 semaines dans le corpus. Ne pas convertir cette bande en une duree chiffree.",
    alerte:true },
  { k:"nodalIllisible", l:"Tissu nodal non identifiable sur la coupe",
    b:"aucune borne", d:"—", h:0, q:"mauvais",
    note:"Un noeud introuvable ne date rien : c'est un defaut de reperage ou de lyse, pas un chronometre." },
  { k:"lymphoEfface", l:"Lymphocytes myocardiques non reconnaissables",
    b:"aucune borne", d:"—", h:0, q:"mauvais",
    note:"« In macerated myocardial tissues, lymphocytes can be nearly impossible to recognize » — ecrire indeterminable, jamais absence d'inflammation." },
  { k:"necrosePanPM", l:"Necrose pan-myocardique diffuse sans territoire",
    b:"aucune borne", d:"—", h:0, q:"mauvais",
    note:"Le CR du corpus l'ecrit « discrète nécrose pan myocardique post-mortem » : c'est un artefact de retention, il ne fournit aucune borne." },
  { k:"inflamPolymorphePM", l:"Inflammation polymorphe diffuse sans necrose myocytaire",
    b:"aucune borne", d:"—", h:0, q:"mauvais",
    note:"Le corpus l'ecrit « discrète inflammation polymorphe post mortem diffuse » et « inflammation de signification inconnue, mineure, probablement artéfactuelle ». Ne pas la lire comme une myocardite ni comme un delai." },
  { k:"liquidePericarde", l:"Liquide serosanglant abondant dans le sac pericardique",
    b:"aucune borne", d:"—", h:0, q:"mauvais",
    note:"« in macerated fetuses, it may contain abundant serosanguineous fluid » : consequence de la maceration, pas un epanchement pathologique et pas une horloge." },
  { k:"cytoarchitectureTient", l:"Cytoarchitecture conservee malgre une maceration franche",
    b:"aucune borne", d:"—", h:0, q:"mauvais",
    note:"« Despite the obvious maceration, the morphology … is still visible. » et « l'examen du cœur, contrairement à celui du cerveau est presque toujours interprétable ». Cette robustesse permet de LIRE le coeur, elle ne permet pas de le DATER : ne pas transformer une cytoarchitecture tenue en delai court." }
];

// Le coeur n'a pas d'echelle de maturation. Ce tableau ne classe pas : il liste
// les rares reperes DATES de la section 3, chacun dans sa fenetre, sans continuum.
var STADES = [
  { k:"septation", l:"Septation ventriculaire en cours d'achevement", max:9.5,
    note:"repere embryonnaire ; au-dela, la septation est acquise et ne date plus rien" },
  { k:"valvesAnneau", l:"Valves AV et anneau fibreux complets, en cours de maturation", max:16,
    note:"« By approximately 12 weeks of development, the AV and outflow tract valve structures are complete, but they continue to undergo maturation » et « By approximately 12 weeks of gestation, the fibrous annulus is mostly complete » — un repere acquis, pas une graduation" },
  { k:"vacuolisationMax", l:"Vacuolisation glycogenique myocytaire physiologique, encore marquee", max:30,
    note:"la clarte cytoplasmique du myocyte foetal est NORMALE a ce terme ; elle ne se cote pas et ne se compte pas" },
  { k:"coussinetsCanal", l:"Coussinets intimaux du canal arteriel du troisieme trimestre", max:37,
    note:"« small areas of intimal thickening with some disruption of the underlying internal elastic lamina are present even in late fetal life » — normal, ne pas lire une lesion" },
  { k:"cytoplasmeEosinophile", l:"Cytoplasme myocytaire plus abondant et plus eosinophile", max:99,
    note:"« As the fetus approaches term, the clearing of the fetal myocyte cytoplasm is generally less prominent. » — tendance de fin de grossesse, pas un stade" }
];

var MESURE = {
  titre:"Mesures parietales et endocardiques — aucune normale foetale publiee",
  defLabel:"cavite ou la mesure est prise",
  optLabel:"coloration de l'endocarde",
  defs:[
    { k:"vg", l:"Ventricule gauche" },
    { k:"vd", l:"Ventricule droit" },
    { k:"og", l:"Oreillette gauche" },
    { k:"od", l:"Oreillette droite" },
    { k:"indeterminee", l:"Cavite non identifiable sur la coupe" }
  ],
  opts:[
    { k:"hes", l:"HES seul" },
    { k:"orceine", l:"Orceine" },
    { k:"tvma", l:"Trichrome vert lumiere / TVMA" },
    { k:"duo", l:"Orceine + trichrome" },
    { k:"aucune", l:"Aucune coloration speciale" }
  ],
  champs:[
    { id:"vg",    label:"Paroi VG (micrometres)", min:0, max:20000, step:10 },
    { id:"vd",    label:"Paroi VD (micrometres)", min:0, max:20000, step:10 },
    { id:"endo",  label:"Endocarde, epaisseur maximale (micrometres)", min:0, max:5000, step:10 },
    { id:"ratio", label:"Rapport trabecule / compact", min:0, max:20, step:0.1 }
  ]
};

function verdictMesure(){
  var v   = E.mesure.v || {};
  var def = E.mesure.def, opt = E.mesure.opt;
  var vg = v.vg, vd = v.vd, endo = v.endo, ratio = v.ratio;
  var rien = !vg && !vd && !endo && !ratio;
  if (rien) return { cls:"", txt:"Aucune mesure saisie — les mesures parietales sont facultatives ; rien ne se deduit d'un champ vide." };

  var T = [], pire = "ok";
  function bad(){ pire = "bad"; }
  function warn(){ if (pire !== "bad") pire = "warn"; }

  if ((vg && !vd) || (vd && !vg)){
    bad();
    T.push("Une seule paroi ventriculaire mesuree : la valeur isolee ne dit rien, c'est le rapport qui se lit, il se saisit en PAIRE. Le corpus ne donne qu'un couple, « assymétrie de taille des parois ventriculaires (de l'ordre de 720 µm pour le VG et 370 µm pour le VD) », et jamais une normale de paroi isolee.");
  }
  if (vg && vd){
    T.push("rapport VG/VD = " + (vg / vd).toFixed(2) + " — a rapporter au couple d'exemple du corpus (720 µm / 370 µm), qui est un CAS et non une norme.");
    T.push("Normale par terme non etablie : aucune table de paroi ventriculaire foetale n'est citee dans la fiche. Ne jamais ecrire hypoplasie ni hypertrophie sur ces chiffres seuls.");
    T.push("Premisse a garder avant de lire un desequilibre : « The fetal heart shows right-sided dominance with up to two-thirds of cardiac output going through the right ventricle » — la dominance droite est la regle foetale.");
    warn();
  }
  if (endo){
    T.push("Epaisseur endocardique : normale foetale non etablie. Le corpus n'offre que des repres de cas — « très important épaississement fibro-élastique de l'endocarde mesuré jusqu'à 1 mm (orcéine et TVMA positives) » et, ailleurs, « up to several millimetres thick ». La section 9 signale que ces deux ordres de grandeur coexistent sans etre reconcilies.");
    warn();
    if (def === "og"){
      bad();
      T.push("Mesure prise dans l'oreillette GAUCHE : « The endocardium of the left atrium is thicker than that of the right atrium » et « the endocardium occupies nearly one-third of the thickness of the atrial wall ». « This should not be mistaken for a pathological change. » Aucune fibro-elastose ne se conclut ici.");
    }
    if (!def){
      warn();
      T.push("Cavite non declaree — est-on dans l'oreillette gauche ? L'epaisseur y est normalement majoree, la mesure change de sens selon la cavite.");
    }
    if (!opt){
      warn();
      T.push("Coloration de l'endocarde non declaree.");
    } else if (opt === "hes"){
      warn();
      T.push("HES seul : l'HES ne distingue pas fibrose et fibro-elastose. Orceine et trichrome sont ce que le corpus utilise pour trancher.");
    }
  }
  if (ratio){
    T.push("Rapport trabecule / compact : aucun seuil foetal dans le corpus — ni Keeling ni Ashworth n'en donnent. La valeur se consigne, elle ne classe pas.");
    T.push("Et la premisse morphogenetique interdit la lecture naive : « Ventricular myocardial compaction is, thus, not a process by which trabeculated myocardium becomes compact » ; « The compacted layer forms by addition of cells to the outer aspect of the myocardium rather than fusion (compaction) of the trabeculae. »");
    warn();
  }
  if (!E.prelev.blocA){
    warn();
    T.push("Reserve de provenance : bloc A (paroi VG + septum) non declare — l'orientation de la mesure n'est pas garantie.");
  }
  return { cls:pire, txt:T.join(" ") };
}

var VARIANTES = [
  { k:"vacuolisationPhysio", l:"Clarte vacuolaire du cytoplasme myocytaire",
    note:"normale au foetus ; « If more extensive vacuolar change is seen, however, it is likely to represent pathologic change » — c'est l'etendue, non la presence, qui interroge" },
  { k:"graisseMyocyte", l:"Graisse dans le cardiomyocyte",
    note:"« fat is a normal constituent of the cardiomyocyte » ; « This should not be confused with a disorder of fatty acid oxidation. »" },
  { k:"mitoses", l:"Mitoses myocytaires",
    note:"le myocarde foetal se divise ; le corpus ne cite « numerous mitotic figures in myocytes » que dans un contexte deja constitue. Une mitose ne se coche pas comme signe" },
  { k:"endocardeCellulaire", l:"Endocarde riche en cellules",
    note:"« The younger the tissue, the more likely it is to be cellular. » — fonction du terme, pas une lesion" },
  { k:"endocardeOG", l:"Endocarde auriculaire gauche epaissi",
    note:"physiologique ; « This should not be mistaken for a pathological change. »" },
  { k:"stromaMyxoide", l:"Stroma valvulaire myxoide diffus",
    note:"« Fetal valve stroma is frequently focally myxoid in character » ; seul le caractere NODULAIRE fait sortir de la variante" },
  { k:"trabeculesGrossieresVD", l:"Trabeculations grossieres du ventricule droit",
    note:"« Les parois ventriculaires comportent des trabéculations grossières, caractéristiques d'un ventricule de type droit »" },
  { k:"trabeculesFinesVG", l:"Trabeculations tres fines du ventricule gauche",
    note:"« Le VG se caractérise par l'extrême finesse des trabéculations » ; « Si l'examen des valves AV est douteux, la comparaison des trabéculations tranchera. »" },
  { k:"coussinetsIntimaux", l:"Epaississements intimaux focaux des arteres",
    note:"« small areas of intimal thickening with some disruption of the underlying internal elastic lamina are present even in late fetal life »" },
  { k:"dysplasieMineurePiliers", l:"Traits dysplasiques mineurs des arteres intramurales des piliers",
    note:"« Even in the normal heart, the intramural arteries located in the papillary muscles of the atrioventricular valves may show minor dysplastic features. »" },
  { k:"disarrayJonctionPhysio", l:"Disarray a la jonction paroi libre / septum",
    note:"« Myofibre disarray occurs in the normal heart at the junction of the free wall of the ventricles with the interventricular septum »" },
  { k:"ilotsMyocardeAuriculaire", l:"Ilots myocardiques disperses dans le tissu fibreux auriculaire",
    note:"« These should not be taken as evidence of aberrant conduction pathways. »" },
  { k:"remodelageNodal", l:"Remodelage du tissu nodal sans degenerescence",
    note:"acceptable « without any evidence of active degeneration, necrosis, phagocytosis, inflammation, or replacement fibrosis » ; des que l'un de ces elements parait, sortir de la variante" },
  { k:"liquidePericardiqueMinime", l:"Petite quantite de liquide pericardique",
    note:"« A small amount of fluid is a feature of the normal pericardial sac »" }
];

// Table PLATE. Aucun nom d'entite ici : les entites se DEDUISENT dans Associations lues.
var SIGNES = [
  // — endocarde
  { k:"endoLamellaire", l:"Endocarde epaissi, fibro-elastique lamellaire dense",
    meta:"« dense laminar fibroelastic tissue that usually does not show increased vascularity or inflammatory cell infiltration »" },
  { k:"endoSansVascul", l:"Epaississement endocardique sans neovascularisation ni infiltrat",
    meta:"le corollaire du critere precedent : la pauvrete cellulaire fait partie de la description" },
  { k:"endoVG", l:"Epaississement endocardique portant sur le ventricule gauche",
    meta:"« The right ventricle usually does not show significant endocardial fibrosis. »" },
  { k:"endoPiliers", l:"Epaississement endocardique s'etendant aux piliers et cordages" },
  { k:"endoBiventriculaire", l:"Epaississement endocardique des deux ventricules",
    meta:"repartition inhabituelle : le VD n'est pas le siege attendu, verifier l'orientation du bloc" },
  { k:"endoFocalPeriLesionnel", l:"Epaississement endocardique focal au contact d'une lesion myocardique" },
  { k:"endoCellulaire", l:"Endocarde epaissi et riche en cellules",
    meta:"« The younger the tissue, the more likely it is to be cellular. » — a confronter au terme avant d'en faire une lesion" },
  { k:"coupeOG", l:"Coupe passant par l'oreillette gauche",
    meta:"signe de LOCALISATION, coche des que la mesure ou l'epaississement porte sur l'OG" },
  // — compaction
  { k:"trabeculesEpais", l:"Couche trabeculee epaisse au regard de la couche compacte" },
  { k:"compacteMince", l:"Couche compacte amincie" },
  { k:"recessusEndocardes", l:"Recessus intertrabeculaires profonds, tapisses d'endocarde" },
  { k:"cavitePresqueEpicarde", l:"Cavite ventriculaire s'etendant presque jusqu'a l'epicarde",
    meta:"« The left ventricular cavity extends almost to the epicardial surface among a myriad of thin muscular trabeculations »" },
  { k:"piliersMalDeveloppes", l:"Piliers mal individualises ou mal developpes" },
  // — desorganisation myocytaire
  { k:"disarraySIV", l:"Desorganisation des myofibres dans le septum interventriculaire",
    meta:"« disarray should not be seen in the normal heart in the interventricular septum or lateral ventricular walls »" },
  { k:"disarrayLateral", l:"Desorganisation des myofibres dans une paroi ventriculaire laterale" },
  { k:"disarrayJonction", l:"Desorganisation limitee a la jonction paroi libre / septum",
    meta:"NORMAL : « Myofibre disarray occurs in the normal heart at the junction of the free wall of the ventricles with the interventricular septum ». Coche pour ecarter, jamais pour retenir" },
  { k:"disarrayAuriculaire", l:"Desorganisation des myofibres dans le myocarde auriculaire" },
  { k:"hypertrophieMyocytaire", l:"Myocytes elargis a noyau volumineux, aspect etale",
    meta:"« disorganised hypertrophied myocytes that have a splayed appearance »" },
  { k:"fibroseInterstitielle", l:"Fibrose interstitielle myocardique" },
  { k:"coupeOblique", l:"Coupe oblique ou tangentielle du myocarde",
    meta:"« oblique or tangential sectioning » ; les fibres sont « organised as geodesic curves around toroid nested layers », une coupe hors axe fabrique un faux disarray" },
  // — myocarde dilate
  { k:"myocytesEtires", l:"Myocytes etires, amincis" },
  { k:"noyauxHyperchromatiques", l:"Noyaux myocytaires volumineux, hyperchromatiques et irreguliers",
    meta:"« myocytes with enlarged, hyperchromatic and irregular nuclei » ; le CR du corpus ecrit « certains cardiomyocytes possèdent un noyau hyperchromatique et trop volumineux »" },
  { k:"piliersAmincis", l:"Piliers amincis, cavite d'aspect dilate" },
  { k:"foyersFibroseDissemines", l:"Multiples petits foyers de fibrose disperses dans les ventricules",
    meta:"« multiple small foci of fibrosis scattered throughout the ventricles »" },
  // — inflammation
  { k:"infiltratMyocardique", l:"Infiltrat inflammatoire interstitiel du myocarde" },
  { k:"necroseMyocytaireFocale", l:"Necrose ou degenerescence des myocytes au contact de l'infiltrat",
    meta:"« Myocyte necrosis or damage must also be present for the diagnosis. »" },
  { k:"neutrophilesPrecoces", l:"Polynucleaires neutrophiles au sein de l'infiltrat",
    meta:"« Neutrophils may be prominent, particularly in the early stages. »" },
  { k:"phenotypeT", l:"Infiltrat a predominance lymphocytaire T documentee",
    meta:"seuil cite : « a value of > 14 leukocytes per mm² with > 7 T-cells per mm² »" },
  { k:"agentViral", l:"Agent viral mis en evidence dans le myocarde" },
  { k:"microAbces", l:"Micro-abces ou foyers a polynucleaires groupes" },
  { k:"infiltratSillonAV", l:"Infiltrat centre sur le sillon auriculo-ventriculaire",
    meta:"« not just of the conduction tissue, but also of much of the atrioventricular junction and the surrounding myocardium »" },
  { k:"inflammationPolymorpheDiffuse", l:"Inflammation polymorphe diffuse, sans foyer ni necrose",
    meta:"« discrète inflammation polymorphe post mortem diffuse » — artefact de retention attendu" },
  // — souffrance ischemique
  { k:"myocytesHypereosinophiles", l:"Myocytes hypereosinophiles",
    meta:"« The first tissue change that is evident by light microscopy is that the myocytes become hypereosinophilic. »" },
  { k:"bandesContraction", l:"Bandes de contraction dans les myocytes",
    meta:"le corpus dit a la fois « Contraction bands are frequently present. » et « Contraction band necrosis is uncommon. » — divergence portee, ne pas trancher" },
  { k:"oedemeIntercellulaire", l:"Oedeme intercellulaire du myocarde" },
  { k:"dilatationCapillaire", l:"Dilatation des capillaires myocardiques" },
  { k:"calcificationMyocardique", l:"Calcification dystrophique dans le myocarde",
    meta:"« necrosis of myocardium with dystrophic calcification »" },
  { k:"necroseSousEndocardique", l:"Necrose de topographie sous-endocardique" },
  { k:"necroseRegionale", l:"Necrose myocardique limitee a un territoire" },
  { k:"necrosePanDiffuse", l:"Necrose myocardique diffuse, sans systematisation",
    meta:"« discrète nécrose pan myocardique post-mortem » — a lire comme un artefact avant toute autre chose" },
  { k:"cytoarchitecturePreservee", l:"Cytoarchitecture d'ensemble conservee malgre l'alteration",
    meta:"« Despite the obvious maceration, the morphology … is still visible. » ; coche pour PONDERER une necrose diffuse, jamais pour affirmer un delai" },
  // — voies de conduction
  { k:"fibroseNodale", l:"Fibrose du tissu nodal ou de la jonction auriculo-ventriculaire" },
  { k:"calcificationNodale", l:"Calcification au sein du tissu de conduction" },
  { k:"perteMyocytesNodaux", l:"Perte des myocytes du tissu nodal" },
  { k:"pointePiliers", l:"Fibrose ou calcification de la pointe des piliers" },
  { k:"infiltratPauvre", l:"Lesion de conduction avec tres peu de cellules inflammatoires",
    meta:"« it is striking how frequently there is minimal inflammatory cell infiltration » et « remarkably little inflammatory cell infiltration »" },
  { k:"nodalIntrouvable", l:"Tissu nodal non retrouve sur les coupes disponibles" },
  // — surcharge
  { k:"vacuolisationEtendue", l:"Vacuolisation myocytaire d'etendue anormale",
    meta:"« If more extensive vacuolar change is seen, however, it is likely to represent pathologic change »" },
  { k:"vacuolesSousEndocardiques", l:"Vacuolisation predominant en sous-endocardique" },
  { k:"pasResistantDiastase", l:"Materiel PAS positif partiellement resistant a la diastase",
    meta:"« inclusions are PAS-positive and are partly resistant to diastase digestion »" },
  { k:"oilRedPositif", l:"Surcharge lipidique demontree sur coupe a congelation",
    meta:"« dramatically demonstrated if frozen sections of myocardium are stained with fat stains such as oil-red-O »" },
  { k:"granulesEosinophiles", l:"Granulations eosinophiles cytoplasmiques anormales" },
  { k:"mitochondriesAnormales", l:"Mitochondries anormales en microscopie electronique" },
  { k:"inclusionsMyeliniques", l:"Inclusions lamellaires ou myeliniques en microscopie electronique" },
  { k:"cellulesHistiocytoides", l:"Myocytes arrondis a cytoplasme finement vacuolaire, d'allure histiocytaire",
    meta:"« rounded myocytes with finely vacuolated cytoplasm that resemble histiocytes »" },
  // — masses
  { k:"noduleCirconscrit", l:"Nodule bien circonscrit dans le myocarde",
    meta:"« well circumscribed within the myocardium »" },
  { k:"cellulesAraignee", l:"Grandes cellules claires a expansions cytoplasmiques radiaires",
    meta:"« composed of large cells with clear cytoplasm » ; « The nucleus is connected by strands of cytoplasm to the cell membrane, giving rise to so-called spider cells. »" },
  { k:"nodulesMultiples", l:"Nodules multiples" },
  { k:"noduleUnique", l:"Nodule unique" },
  { k:"collageneFusiforme", l:"Proliferation de cellules fusiformes uniformes dans un collagene abondant",
    meta:"« abundant collagen that contains uniform spindle cells »" },
  { k:"siegeSIV", l:"Masse siegeant dans le septum interventriculaire" },
  { k:"calcificationTumorale", l:"Calcification au sein de la masse",
    meta:"« Calcification is common. »" },
  { k:"masseIntrapericardique", l:"Masse intrapericardique refoulant le coeur" },
  { k:"elementsTeratomateux", l:"Tissus de plusieurs feuillets embryonnaires dans la masse" },
  // — valves
  { k:"myxoideNodulaire", l:"Structures myxoides NODULAIRES dans le stroma valvulaire",
    meta:"« Fetal valve stroma is frequently focally myxoid in character, but nodular myxoid structures are considered a sign of valvular dysplasia. » ; la valve normale « may be rather myxoid, but should not be nodular »" },
  { k:"valveEpaissie", l:"Valve globalement epaissie" },
  // — pericarde
  { k:"pericarditeFibrine", l:"Depot de fibrine a la surface du pericarde" },
  { k:"pericardeFibrose", l:"Fibrose du pericarde" },
  { k:"hemorragiePericarde", l:"Hemorragie dans le sac pericardique" },
  { k:"amasEosinoPericarde", l:"Infiltrat inflammatoire du pericarde",
    meta:"« The pericardium has a very restricted repertoire of reactions to injury » — l'aspect ne designe pas la cause" },
  // — vaisseaux
  { k:"calcificationElastique", l:"Calcium depose dans et entre les lames elastiques arterielles",
    meta:"« deposition of calcium in and between the elastic laminae »" },
  { k:"proliferationIntimale", l:"Proliferation fibreuse intimale marquee",
    meta:"« There is associated fibrous intimal proliferation which may be quite striking. »" },
  { k:"paroiDesorganisee", l:"Paroi arterielle desorganisee, irregulierement amincie et epaissie",
    meta:"« disorganisation of the elements of the vascular wall with irregular thinning and thickening of the wall and encroachment on the lumen »" },
  { k:"thromboseCoronaire", l:"Thrombose d'une artere coronaire" },
  { k:"coronairesDilatees", l:"Arteres coronaires dilatees" },
  // — geste et prelevement
  { k:"pointPonction", l:"Effraction epicardique focale d'allure traumatique" },
  { k:"calcificationPilier", l:"Calcification ponctiforme focale d'un pilier mitral",
    meta:"le CR du corpus l'ecrit avec son doute : « présence d'une calcification ponctiforme focale d'un pilier mitral (artéfact ?) »" },
  { k:"caviteNonIdentifiable", l:"Cavite d'origine non identifiable sur la coupe" },
  { k:"trabeculesGrossieres", l:"Trabeculations grossieres sur la coupe" },
  { k:"trabeculesFines", l:"Trabeculations tres fines sur la coupe" },
  { k:"cavitesEffondrees", l:"Cavites effondrees ou deformees par la fixation" },
  { k:"hemorragieIntraVentriculaire", l:"Hemorragie intra-ventriculaire" }
];

// Aucun de ces libelles n'est cochable. Ils se DEDUISENT des signes ci-dessus.
var DIAGS = [
  { k:"fee", l:"Fibro-elastose endocardique", cle:"endoLamellaire", min:2,
    signes:["endoLamellaire","endoSansVascul","endoVG","endoPiliers","endoCellulaire"],
    stop:" — l'epaisseur n'a pas de normale foetale etablie : le corpus donne « jusqu'à 1 mm » d'un cote et « up to several millimetres thick » de l'autre, sans les reconcilier. Un endocarde riche en cellules peut n'etre que jeune (« The younger the tissue, the more likely it is to be cellular. »). Surtout, la FEE est un phenotype, pas une cause : si la mitrale est atresique, « if the mitral valve is atretic, there is no endocardial fibroelastosis » — et le corpus decrit alors « un épaississement endocardique sans réelle fibro-élastose » dont « a very similar picture is seen ». Sans orceine ni trichrome, ne pas trancher entre fibrose et fibro-elastose." },
  { k:"feeOG", l:"Epaississement endocardique de l'oreillette gauche — piege physiologique", cle:"coupeOG", min:1,
    signes:["coupeOG","endoLamellaire","endoCellulaire","endoSansVascul"],
    stop:" — dans l'oreillette gauche l'endocarde est NORMALEMENT plus epais : « The endocardium of the left atrium is thicker than that of the right atrium » et « the endocardium occupies nearly one-third of the thickness of the atrial wall ». « This should not be mistaken for a pathological change. » Ne pas ecrire de fibro-elastose sur une coupe d'OG sans un autre argument." },
  { k:"nonCompaction", l:"Non-compaction du myocarde ventriculaire", cle:"trabeculesEpais", min:2,
    signes:["trabeculesEpais","compacteMince","recessusEndocardes","cavitePresqueEpicarde","piliersMalDeveloppes"],
    stop:" — « Non-compaction of the ventricular myocardium is a phenotypic expression and not a discrete disease » et « there is no evidence of persistence of the embryonic phenotype ». La morphogenese interdit le raisonnement naif : « Ventricular myocardial compaction is, thus, not a process by which trabeculated myocardium becomes compact », « The compacted layer forms by addition of cells to the outer aspect of the myocardium rather than fusion (compaction) of the trabeculae. » Aucun rapport trabecule/compact foetal seuille n'existe dans le corpus. Noter aussi qu'« There is often prominent endocardial fibroelastosis » : la FEE associee ne dement pas, elle accompagne." },
  { k:"disarrayPatho", l:"Desorganisation myocytaire de siege anormal", min:2,
    signes:["disarraySIV","disarrayLateral","hypertrophieMyocytaire","fibroseInterstitielle","disarrayAuriculaire"],
    stop:" — le siege fait tout : « disarray should not be seen in the normal heart in the interventricular septum or lateral ventricular walls », mais la jonction paroi libre / septum est normalement desorganisee. Et le disarray n'est pas specifique d'une cause : « Other cases with identical hypertrophic phenotype, for example those caused by maternal diabetes or a mitochondrial disease, do not show significant disarray. » Le corpus oriente vers le prelevement plutot que vers l'etiquette : « where possible genetic material should be obtained at autopsy to permit gene screening »." },
  { k:"fauxDisarray", l:"Desorganisation d'origine technique ou physiologique", min:1,
    signes:["disarrayJonction","coupeOblique","caviteNonIdentifiable","cavitesEffondrees"],
    stop:" — a ecarter AVANT toute lecture pathologique. Les fibres sont « organised as geodesic curves around toroid nested layers » et « The left is more regular while the right is distorted by the pulmonary infundibulum. » : une « oblique or tangential sectioning » fabrique un desordre qui n'existe pas." },
  { k:"cmd", l:"Aspect de myocarde dilate", cle:"noyauxHyperchromatiques", min:2,
    signes:["noyauxHyperchromatiques","myocytesEtires","piliersAmincis","foyersFibroseDissemines"],
    stop:" — « Fetal myocarditis can be indistinguishable from dilated cardiomyopathy » ; les « multiple small foci of fibrosis scattered throughout the ventricles » et les « numerous mitotic figures in myocytes » se voient dans les deux. Chercher la necrose myocytaire au contact d'un infiltrat avant de retenir une cardiomyopathie." },
  { k:"myocardite", l:"Myocardite", cle:"necroseMyocytaireFocale", min:2,
    signes:["necroseMyocytaireFocale","infiltratMyocardique","neutrophilesPrecoces","phenotypeT","agentViral","microAbces"],
    stop:" — la definition exige la necrose : « Myocarditis is defined as an inflammatory infiltrate of the myocardium with necrosis and/or degeneration of adjacent myocytes not typical of the ischemic injury associated with coronary artery disease. » et « Myocyte necrosis or damage must also be present for the diagnosis. » Le seuil quantitatif cite est « a value of > 14 leukocytes per mm² with > 7 T-cells per mm² », il suppose un phenotypage. Enfin « The histological features do not permit distinction between the various causes of myocarditis. » : ne pas nommer l'agent sur la morphologie." },
  { k:"infiltratSansNecrose", l:"Infiltrat myocardique sans necrose — non concluant", min:1,
    signes:["infiltratMyocardique","inflammationPolymorpheDiffuse","phenotypeT"],
    stop:" — sans necrose myocytaire adjacente, la definition n'est pas remplie. Le corpus decrit une « discrète inflammation polymorphe post mortem diffuse » et une « inflammation de signification inconnue, mineure, probablement artéfactuelle ». Et si le tissu est macere : « In macerated myocardial tissues, lymphocytes can be nearly impossible to recognize » — l'infiltrat n'est alors ni present ni absent, il est illisible." },
  { k:"lupus", l:"Atteinte du tissu de conduction", min:2,
    signes:["fibroseNodale","calcificationNodale","perteMyocytesNodaux","pointePiliers","infiltratPauvre","infiltratSillonAV"],
    stop:" — l'infiltrat manque souvent : « it is striking how frequently there is minimal inflammatory cell infiltration » et « remarkably little inflammatory cell infiltration ». Son absence ne dement rien. L'atteinte deborde le noeud : « not just of the conduction tissue, but also of much of the atrioventricular junction and the surrounding myocardium ». La lesion decrite est une « necrosis of myocardium with dystrophic calcification ». Si le noeud n'a pas ete retrouve, ecrire non explorable ; et rappeler qu'un remodelage nodal reste acceptable « without any evidence of active degeneration, necrosis, phagocytosis, inflammation, or replacement fibrosis »." },
  { k:"ischemie", l:"Souffrance ischemique myocardique", cle:"myocytesHypereosinophiles", min:2,
    signes:["myocytesHypereosinophiles","bandesContraction","oedemeIntercellulaire","dilatationCapillaire","necroseSousEndocardique","necroseRegionale","calcificationMyocardique"],
    stop:" — la fenetre temporelle bride la lecture : « it takes up to 12 h following the ischemic insult for histological changes to appear » et l'infiltrat neutrophile n'arrive qu'avec une « infiltration by neutrophil polymorphs, usually by 12–24 hours ». Une ischemie recente ne laisse donc rien voir. Sur les bandes de contraction le corpus se contredit — « Contraction bands are frequently present. » contre « Contraction band necrosis is uncommon. » — divergence portee, non tranchee. La vulnerabilite de fond : « The heart is the organ with the highest oxygen consumption for its weight in the body »." },
  { k:"necrosePM", l:"Necrose myocardique d'allure post-mortem", cle:"necrosePanDiffuse", min:1,
    signes:["necrosePanDiffuse","inflammationPolymorpheDiffuse","cytoarchitecturePreservee"],
    stop:" — a ecarter avant toute ischemie : le corpus ecrit « discrète nécrose pan myocardique post-mortem ». Ce qui separe l'ischemie de l'artefact, c'est le TERRITOIRE, pas l'intensite. Sur un foetus macere, l'immunohistochimie C9 peut trancher : « Immunohistochemistry for the C9 complement component may demonstrate myocyte damage at an earlier stage of its development than coagulative necrosis and may be used in macerated stillbirths. »" },
  { k:"surcharge", l:"Surcharge myocytaire", cle:"vacuolisationEtendue", min:2,
    signes:["vacuolisationEtendue","vacuolesSousEndocardiques","pasResistantDiastase","oilRedPositif","granulesEosinophiles","mitochondriesAnormales","inclusionsMyeliniques"],
    stop:" — NE JAMAIS ECRIRE absence de vacuolisation myocytaire : la vacuolisation est physiologique chez le foetus, seule son etendue interroge — « If more extensive vacuolar change is seen, however, it is likely to represent pathologic change ». De meme « fat is a normal constituent of the cardiomyocyte » et « This should not be confused with a disorder of fatty acid oxidation. » ; une vacuolisation vue en contexte inflammatoire « is a frequent finding in myocarditis and should not be taken as evidence of an underlying metabolic abnormality. » Le corpus exige d'ecarter le reste : « Care should be taken to exclude … ischemia, cardiomyopathy, myocarditis, or a storage disorder. » Piege de coloration enfin : « les vacuoles ne prennent pas la coloration PAS ni PAS + amylase » sur un materiel deja fixe, et le corpus reclame un « PAS sur cœur normal » comme temoin." },
  { k:"pompe", l:"Surcharge glycogenique de type II", min:2,
    signes:["vacuolisationEtendue","pasResistantDiastase","vacuolesSousEndocardiques"],
    stop:" — le critere cite est « vacuolar change in the myocytes with accumulation of glycogen » avec des inclusions dont « inclusions are PAS-positive and are partly resistant to diastase digestion ». Deux garde-fous negatifs : « Myocyte disarray and myocardial fibrosis are not found. » et « myocyte disarray is not prominent ». Un disarray franc doit faire reconsiderer." },
  { k:"histiocytoide", l:"Cardiomyopathie histiocytoide", cle:"cellulesHistiocytoides", min:1,
    signes:["cellulesHistiocytoides","nodulesMultiples","mitochondriesAnormales"],
    stop:" — « rounded myocytes with finely vacuolated cytoplasm that resemble histiocytes ». Le piege est la confusion avec une tumeur : « Histiocytoid cardiomyopathy may cause confusion because of its multiple nodules, although the histology is quite distinct. » La microscopie electronique est ce qui separe." },
  { k:"rhabdomyome", l:"Rhabdomyome", cle:"cellulesAraignee", min:2,
    signes:["cellulesAraignee","noduleCirconscrit","nodulesMultiples","noduleUnique"],
    stop:" — « well circumscribed within the myocardium », « composed of large cells with clear cytoplasm », « The nucleus is connected by strands of cytoplasm to the cell membrane, giving rise to so-called spider cells. » Le nombre change la portee : « If multiple, it is much more likely to be associated with tuberous sclerosis. » Un nodule UNIQUE n'autorise pas a evoquer une sclerose tubereuse." },
  { k:"fibrome", l:"Fibrome cardiaque", min:2,
    signes:["collageneFusiforme","noduleUnique","siegeSIV","calcificationTumorale"],
    stop:" — « abundant collagen that contains uniform spindle cells » et « Calcification is common. » Ne pas se rassurer sur l'histologie : « despite their benign histology, they may have significant morbidity and even mortality »." },
  { k:"teratome", l:"Teratome intrapericardique", min:1,
    signes:["masseIntrapericardique","elementsTeratomateux"],
    stop:" — une masse intrapericardique n'est pas une masse myocardique ; ne pas conclure sans plusieurs feuillets identifies." },
  { k:"dysplasieValvulaire", l:"Dysplasie valvulaire", cle:"myxoideNodulaire", min:1,
    signes:["myxoideNodulaire","valveEpaissie"],
    stop:" — seul le caractere NODULAIRE fait sortir de la normale : « Fetal valve stroma is frequently focally myxoid in character, but nodular myxoid structures are considered a sign of valvular dysplasia. » ; une valve normale « may be rather myxoid, but should not be nodular ». C'est l'un des rares apports reels de l'histologie ici : « Histology is useful in confirming abnormality in some cases, e.g. dysplasia of a valve »." },
  { k:"pericardite", l:"Atteinte pericardique", min:2,
    signes:["pericarditeFibrine","pericardeFibrose","amasEosinoPericarde","hemorragiePericarde"],
    stop:" — « The pericardium has a very restricted repertoire of reactions to injury » : l'aspect ne designe pas la cause. Et l'atteinte pericardique peut tromper sur l'essentiel — « and may overshadow the myocardial involvement ». Un liquide abondant chez un macere n'est pas un epanchement : « in macerated fetuses, it may contain abundant serosanguineous fluid » ; « A small amount of fluid is a feature of the normal pericardial sac »." },
  { k:"calcificationArterielle", l:"Calcification arterielle", min:2,
    signes:["calcificationElastique","proliferationIntimale","coronairesDilatees"],
    stop:" — « deposition of calcium in and between the elastic laminae » avec « There is associated fibrous intimal proliferation which may be quite striking. » Ne pas confondre avec les epaississements intimaux normaux de fin de grossesse : « small areas of intimal thickening with some disruption of the underlying internal elastic lamina are present even in late fetal life »." },
  { k:"dysplasieFibromusculaire", l:"Dysplasie fibromusculaire arterielle", cle:"paroiDesorganisee", min:1,
    signes:["paroiDesorganisee","proliferationIntimale","thromboseCoronaire"],
    stop:" — « disorganisation of the elements of the vascular wall with irregular thinning and thickening of the wall and encroachment on the lumen », mais « It is likely that fibromuscular dysplasia is not a single entity but rather a phenotype indicating a limited range of responses of the arterial wall to injury. » Et le faux positif est prevu : « Even in the normal heart, the intramural arteries located in the papillary muscles of the atrioventricular valves may show minor dysplastic features. » — le corpus ecrit ailleurs « may show minor dysplastic features » pour la meme situation." },
  { k:"gesteKcl", l:"Lesion en rapport avec le geste de foeticide", cle:"pointPonction", min:1,
    signes:["pointPonction","calcificationPilier","hemorragieIntraVentriculaire"],
    stop:" — « If there has been feticide by injection of potassium chloride into the heart, the fatal puncture site in the epicardium is frequently visible at post-mortem. » Les alterations peuvent « mimic maceration changes » : ne pas les lire comme un delai. Reciproquement « KCl injection may not be applied directly into the heart » — l'absence de point de ponction ne dement pas le geste. La calcification d'un pilier reste douteuse dans le corpus lui-meme : « présence d'une calcification ponctiforme focale d'un pilier mitral (artéfact ?) »." },
  { k:"identificationCavite", l:"Identification de la cavite par les trabeculations", min:1,
    signes:["trabeculesGrossieres","trabeculesFines","caviteNonIdentifiable"],
    stop:" — outil d'orientation, pas un diagnostic. « Les parois ventriculaires comportent des trabéculations grossières, caractéristiques d'un ventricule de type droit » ; « Le VG se caractérise par l'extrême finesse des trabéculations » ; « Si l'examen des valves AV est douteux, la comparaison des trabéculations tranchera. »" },
  { k:"blocInexploitable", l:"Bloc non concluant", min:2,
    signes:["caviteNonIdentifiable","cavitesEffondrees","coupeOblique","nodalIntrouvable"],
    stop:" — rien de coche ne veut pas dire absent : ca veut dire non regarde. Un bloc mal oriente ou effondre ne produit pas de negatif ; ecrire non explorable et redemander une coupe." }
];

var NEGATIFS = [
  { k:"lyse", l:"Absence de perte de basophilie nucléaire des différents viscères",
    p:"« Absence de perte de basophilie nucléaire des différents viscères » ; le CR alternatif du corpus ecrit « absence de rétention, la basophilie nucléaire est présente dans tous les tissus »",
    ko:"Perte de basophilie constatee — ne pas ecrire ce negatif, renseigner le bloc retention." },
  { k:"cytoarchitecture", l:"Cytoarchitecture normale",
    p:"« Cytoarchitecture normale » ; « Leur morphologie est normale, notamment celle des cardiomyocytes »",
    ko:"Cytoarchitecture alteree ou illisible — ecrire non interpretable, pas normale." },
  { k:"septation", l:"Septation complete, absence de communication interventriculaire",
    p:"« Sur lame, le cœur possède un septum intègre » ; « Sur lames, le cœur présente 4 cavités normales, absence de CIV » ; « la septation est complète »",
    ko:"Septum non transillumine : une CIV musculaire punctiforme se manque sur lame. « Si l'examen du cœur n'a décelé aucun défect, on ne peut plus désormais parler de cœur normal sans pratiquer une coupe complémentaire »" },
  { k:"situs", l:"Coeur en situs solitus",
    p:"« Le cœur est en situs solitus »",
    ko:"Situs non determinable sur ce materiel. Rappel : « in the atria it is possible to develop isomerism – it is impossible for this to occur in the ventricles »" },
  { k:"equilibre", l:"Bon equilibre des cavites droite et gauche",
    p:"« bon équilibre des cavités droite et gauche » ; le CR l'ecrit aussi « équilibre ventriculaire »",
    ko:"Sans coupe quatre cavites, l'equilibre ne se juge pas. Et la reference est asymetrique : « The fetal heart shows right-sided dominance with up to two-thirds of cardiac output going through the right ventricle »" },
  { k:"hypertrophie", l:"Absence d'hypertrophie",
    p:"« Absence d'hypertrophie »",
    ko:"Aucune normale de paroi ventriculaire foetale par terme n'est disponible dans le corpus ; ne pas ecrire ce negatif sur une mesure isolee." },
  { k:"compaction", l:"Compaction ventriculaire normale",
    p:"« compaction ventriculaire normale » ; le CR ecrit aussi « bonne compaction »",
    ko:"Aucun seuil trabecule/compact foetal n'existe dans le corpus : ce negatif ne se soutient que d'une impression d'ensemble, le dire." },
  { k:"endocarde", l:"Endocarde normal",
    p:"« endocarde normal » ; « Cytoarchitecture normale, équilibre ventriculaire, bonne compaction, endocarde normal »",
    ko:"Sans orceine ni trichrome, l'HES ne distingue pas fibrose et fibro-elastose : ecrire non evalue." },
  { k:"fibrose", l:"Absence de fibro-elastose endocardique et de fibrose",
    p:"« absence de fibroélastose endocardique » ; « absence de fibrose »",
    ko:"Meme reserve de coloration ; et sur l'oreillette gauche l'endocarde est normalement epais, la lecture y change de sens." },
  { k:"inflammation", l:"Absence d'inflammation",
    p:"« absence d'inflammation »",
    ko:"« In macerated myocardial tissues, lymphocytes can be nearly impossible to recognize » — ecrire indeterminable, jamais absence d'inflammation." },
  { k:"necroseMyocytaire", l:"Absence de necrose myocytaire significative",
    p:"le corpus n'ecrit ce negatif qu'apres avoir ecarte la « discrète nécrose pan myocardique post-mortem »",
    ko:"Une necrose est vue : preciser d'abord si elle est territoriale ou diffuse avant toute lecture." },
  { k:"coronaires", l:"Coronaires sans particularite, absence de thrombose",
    p:"« Les coronaires sont sans particularité » ; « Absence de thrombose coronaire »",
    ko:"Coronaires non individualisees sur les coupes disponibles — non explorees." },
  { k:"hemorragieIV", l:"Absence d'hemorragie intra-ventriculaire",
    p:"« il n'y a pas d'hémorragie intra-ventriculaire »",
    ko:"Cavites effondrees ou lavees : l'absence n'est pas demontrable." },
  { k:"surcharge", l:"Absence de surcharge des autres visceres",
    p:"« absence de surcharge d'autres viscères (cœur…) » ; « PAS et trichrome vert de Gomori sur muscle et cœur sans particularité »",
    ko:"Ne jamais formuler ce negatif comme une absence de vacuolisation myocytaire : la vacuolisation est physiologique. Et « les vacuoles ne prennent pas la coloration PAS ni PAS + amylase » sur certains materiels — sans « PAS sur cœur normal » comme temoin, la negativite n'est pas interpretable." },
  { k:"viral", l:"Absence d'agent viral demontre",
    p:"le corpus ne le documente qu'apres technique : « Parvovirus may be demonstrated in myocyte nuclei by in situ hybridisation or immunohistochemistry »",
    ko:"Aucune technique virale realisee — ecrire non recherche, pas absent." },
  { k:"lymphatique", l:"Absence de proliferation lymphatique",
    p:"« sur muscle, tube digestif, cœur, absence de prolifération lymphatique »",
    ko:"Sans marquage endothelial lymphatique, ce negatif est morphologique seulement." },
  { k:"valves", l:"Stroma valvulaire myxoide non nodulaire",
    p:"« stroma valvulaire myxoïde non nodulaire » ; le caractere focalement myxoide est normal, seul le nodule sort de la norme",
    ko:"Valves non vues en coupe : non explorees." },
  { k:"conduction", l:"Tissu nodal sans lesion evolutive",
    p:"formulation acceptable seulement au sens du corpus : « without any evidence of active degeneration, necrosis, phagocytosis, inflammation, or replacement fibrosis »",
    ko:"Noeud non retrouve, ou jonction VCS / OD entamee au prelevement : « cutting this area risks loss of landmarks should it become necessary to examine the node ». Ecrire non explorable." }
];

var TECHNIQUES = [
  { k:"orceine",     l:"Orceine",                                q:"Les lames elastiques de l'endocarde et des arteres sont-elles individualisees ?" },
  { k:"tvma",        l:"Trichrome vert lumiere / TVMA",          q:"La composante collagene est-elle distinguee de la composante elastique ?" },
  { k:"masson",      l:"Trichrome de Masson",                    q:"La fibrose de remplacement du tissu nodal est-elle visible ?" },
  { k:"sma",         l:"Actine musculaire lisse",                q:"Les myocytes nodaux residuels sont-ils reperables ?" },
  { k:"c9",          l:"Immunohistochimie C9 du complement",     q:"Y a-t-il une souffrance myocytaire plus precoce que la necrose de coagulation ? (utilisable sur macere)" },
  { k:"vonKossa",    l:"Von Kossa",                              q:"Les depots calciques sont-ils confirmes, et ou siegent-ils ?" },
  { k:"pas",         l:"PAS et PAS + diastase",                  q:"Le materiel intracytoplasmique est-il PAS positif et resistant a la diastase ? Un temoin de coeur normal est-il passe ?" },
  { k:"oilRedO",     l:"Oil red O sur coupe a congelation",      q:"Une surcharge lipidique est-elle visible au-dela du contenu graisseux normal du cardiomyocyte ?" },
  { k:"enzymes",     l:"Enzymes oxydatives sur coupe congelee",  q:"Les enzymes oxydatives sont-elles diminuees ?" },
  { k:"met",         l:"Microscopie electronique",               q:"Les mitochondries et les inclusions sont-elles anormales ?" },
  { k:"gomori",      l:"Trichrome vert de Gomori",               q:"Y a-t-il des fibres rouges deguenillees sur le muscle associe ?" },
  { k:"phenotypage", l:"Phenotypage lymphocytaire",              q:"L'infiltrat depasse-t-il le seuil de T par mm² retenu pour la myocardite ?" },
  { k:"viral",       l:"Hybridation in situ ou immunohistochimie virale", q:"Un genome viral est-il present dans les noyaux myocytaires ?" },
  { k:"cd34",        l:"Marquage endothelial",                   q:"La densite et la nature des vaisseaux sont-elles precisees ?" },
  { k:"perls",       l:"Perls",                                  q:"Une surcharge en fer est-elle presente ?" },
  { k:"caryotype",   l:"Caryotype",                              q:"Le caryotype a-t-il ete demande, y compris en cas de maceration ?" },
  { k:"genetique",   l:"Materiel congele pour etude genetique",  q:"Du materiel a-t-il ete conserve pour un criblage genique ?" }
];

function suggerer(){
  var S = E.signes, N = E.negatifs, P = E.prelev, M = E.mesure, o = {};
  function a(k){ return S[k] === "anormal"; }
  function mettre(){ for (var i = 0; i < arguments.length; i++) o[arguments[i]] = 1; }

  if (a("endoLamellaire") || a("endoSansVascul") || a("endoVG") || a("endoPiliers") ||
      a("endoBiventriculaire") || a("endoFocalPeriLesionnel") || a("endoCellulaire")) mettre("orceine","tvma");
  if (a("trabeculesEpais") || a("compacteMince") || a("cavitePresqueEpicarde")) mettre("orceine","tvma");

  if (a("fibroseNodale") || a("perteMyocytesNodaux") || a("nodalIntrouvable") ||
      a("infiltratSillonAV") || a("pointePiliers")) mettre("masson","sma");
  if (a("calcificationNodale") || a("calcificationPilier") || a("calcificationMyocardique") ||
      a("calcificationElastique") || a("calcificationTumorale")) mettre("vonKossa");

  if (a("myocytesHypereosinophiles") || a("bandesContraction") || a("necroseSousEndocardique") ||
      a("necroseRegionale") || a("necrosePanDiffuse")) mettre("c9");

  if (a("vacuolisationEtendue") || a("vacuolesSousEndocardiques") || a("granulesEosinophiles")) mettre("pas","oilRedO","met");
  if (a("pasResistantDiastase")) mettre("pas","met");
  if (a("mitochondriesAnormales") || a("inclusionsMyeliniques")) mettre("met","enzymes","gomori");
  if (a("cellulesHistiocytoides")) mettre("met");

  if (a("infiltratMyocardique") || a("neutrophilesPrecoces") || a("microAbces") ||
      a("inflammationPolymorpheDiffuse")) mettre("phenotypage");
  if ((a("necroseMyocytaireFocale") && a("infiltratMyocardique")) || a("agentViral")) mettre("viral");

  if (a("disarraySIV") || a("disarrayLateral") || a("disarrayAuriculaire") || a("hypertrophieMyocytaire")) mettre("genetique","caryotype");
  if (a("noduleCirconscrit") || a("nodulesMultiples") || a("cellulesAraignee") ||
      a("collageneFusiforme") || a("elementsTeratomateux")) mettre("caryotype");

  if (a("proliferationIntimale") || a("paroiDesorganisee") || a("thromboseCoronaire") ||
      a("coronairesDilatees")) mettre("orceine");
  if (a("myocytesEtires") || a("foyersFibroseDissemines")) mettre("masson","cd34");

  if (N.surcharge === "present") mettre("perls","pas");
  if (N.viral === "present") mettre("viral");
  if (N.conduction === "present") mettre("masson");

  if (P.congele && Object.keys(S).some(function(k){ return S[k] === "anormal"; })) mettre("genetique");
  if (M.opt === "hes" && M.v && M.v.endo) mettre("orceine","tvma");
  return o;
}

async function testsOrgane(chk, clic, set, crTient, pause){
  function pose(k, v){ if (E.signes[k] !== v) clic("les", k, v); }
  function ote(k){ if (E.signes[k]) clic("les", k, E.signes[k]); }
  function propre(){ SIGNES.forEach(function(s){ ote(s.k); }); }
  function tenue(k){ return associations().some(function(a){ return a.d.k === k && a.tenu; }); }
  function lue(k){ return associations().some(function(a){ return a.d.k === k; }); }
  function vidRet(){ RETENTION.forEach(function(r){ if (E.retention[r.k]) clic("ret", r.k); }); }
  function vidMes(){ MESURE.champs.forEach(function(c){ set("m_" + c.id, ""); }); }

  /* — le banc n'est pas propre en entrant : le shell a laisse DIAGS[0].signes[0] anormal */
  propre();

  /* 1. organe impair */

  /* 2. retention : la borne haute recevable gagne */
  vidRet();
  clic("ret", "basoInterneVG");
  chk("24 h : borne lue", $("vRetention").textContent.indexOf("Rétention 24 h et plus") >= 0);
  chk("24 h : divergence FOETO portee", $("vRetention").textContent.indexOf("4—12 h") >= 0);
  clic("ret", "basoDeuxMoities");
  chk("48 h prime sur 24 h", $("vRetention").textContent.indexOf("Rétention 48 h et plus") >= 0);
  vidRet();
  clic("ret", "bandeService2a4");
  chk("bande 2 a 4 semaines : divergence citee",
      $("vRetention").textContent.indexOf("aucun organe fœtal donnant une bonne estimation") >= 0);
  vidRet();
  clic("ret", "necrosePanPM");
  clic("ret", "lymphoEfface");
  chk("predicteurs mauvais seuls : aucune borne",
      $("vRetention").textContent.indexOf("aucune borne recevable") >= 0);
  vidRet();
  clic("ret", "cytoarchitectureTient");
  vidRet();
  clic("kcl", "kcl");
  chk("KCl : point de ponction attendu, pas un signe",
      $("vRetention").textContent.indexOf("ATTENDUE") >= 0);
  clic("kcl", "kcl");

  /* 3. pas d'echelle de maturation cardiaque */
  chk("titre de stade : pas d'echelle", /n'a pas d'echelle de maturation/.test(STADE_TITRE));
  chk("le retard renvoie a l'asymetrie, pas au terme", /ASYMETRIE/.test(RETARD_NOTE));
  chk("aucun CR du corpus n'ecrit de stade cardiaque",
      /Aucun CR du corpus n'ecrit de stade de maturation cardiaque/.test(RETARD_NOTE));
  set("sa", "24");
  clic("stade", "septation");
  chk("repere date discordant : la reserve de fond s'affiche",
      $("vMaturation").textContent.indexOf("pas d'echelle de maturation") >= 0);

  /* 4. mesures parietales */
  vidMes();
  set("m_vg", "720");
  chk("paroi isolee refusee", verdictMesure().cls === "bad");
  set("m_vd", "370");
  chk("rapport calcule", verdictMesure().txt.indexOf("rapport VG/VD = 1.95") >= 0);
  chk("aucune normale de paroi par terme",
      verdictMesure().txt.indexOf("Normale par terme non etablie") >= 0);
  chk("jamais hypoplasie ni hypertrophie sur ces chiffres",
      verdictMesure().txt.indexOf("hypoplasie ni hypertrophie") >= 0);
  chk("dominance droite rappelee",
      verdictMesure().txt.indexOf("two-thirds of cardiac output") >= 0);
  vidMes();
  set("m_endo", "1000");
  clic("mopt", "hes");
  chk("HES seul : reserve de coloration",
      verdictMesure().txt.indexOf("ne distingue pas fibrose et fibro-elastose") >= 0);
  clic("mopt", "hes");
  clic("mopt", "duo");
  chk("orceine + trichrome leve la reserve de coloration",
      verdictMesure().txt.indexOf("ne distingue pas fibrose et fibro-elastose") < 0);
  clic("mdef", "og");
  chk("endocarde mesure dans l'OG : piege physiologique", verdictMesure().cls === "bad");
  chk("OG : ne pas prendre pour une lesion",
      verdictMesure().txt.indexOf("should not be mistaken for a pathological change") >= 0);
  clic("mdef", "og");
  clic("mdef", "vg");
  set("m_ratio", "3");
  chk("aucun seuil trabecule/compact foetal",
      verdictMesure().txt.indexOf("aucun seuil foetal") >= 0);
  chk("la compaction n'est pas une fusion des trabecules",
      verdictMesure().txt.indexOf("rather than fusion") >= 0);
  vidMes();
  clic("mdef", "vg");
  clic("mopt", "duo");

  /* 5. endocarde : fibro-elastose et son piege auriculaire */
  propre();
  pose("endoLamellaire", "anormal");
  pose("endoVG", "anormal");
  chk("fibro-elastose tenue sur deux signes", tenue("fee"));
  chk("orceine et trichrome suggeres", !!suggerer().orceine && !!suggerer().tvma);
  pose("coupeOG", "anormal");
  chk("la coupe d'OG s'affiche a cote de la fibro-elastose", lue("feeOG"));
  ote("coupeOG");

  /* 6. disarray : le siege fait tout */
  propre();
  pose("disarrayJonction", "anormal");
  pose("coupeOblique", "anormal");
  chk("disarray de jonction : jamais une desorganisation anormale", !tenue("disarrayPatho"));
  chk("disarray de jonction : lu comme technique ou physiologique", tenue("fauxDisarray"));
  pose("disarraySIV", "anormal");
  pose("hypertrophieMyocytaire", "anormal");
  chk("septum + hypertrophie : desorganisation de siege anormal", tenue("disarrayPatho"));

  /* 7. myocardite : le pivot est la necrose, pas l'infiltrat */
  propre();
  pose("infiltratMyocardique", "anormal");
  pose("neutrophilesPrecoces", "anormal");
  chk("infiltrat seul : myocardite non tenue", !tenue("myocardite"));
  chk("infiltrat seul : lu comme non concluant", tenue("infiltratSansNecrose"));
  pose("necroseMyocytaireFocale", "anormal");
  chk("necrose myocytaire : myocardite tenue", tenue("myocardite"));
  chk("CR : la necrose est exigee par la definition",
      crTient("must also be present for the diagnosis"));

  /* 8. conduction */
  propre();
  pose("fibroseNodale", "anormal");
  pose("calcificationNodale", "anormal");
  pose("infiltratPauvre", "anormal");
  chk("atteinte du tissu de conduction lue", tenue("lupus"));
  chk("l'infiltrat pauvre ne dement pas",
      crTient("minimal inflammatory cell infiltration"));

  /* 9. ischemie contre artefact post-mortem */
  propre();
  pose("necrosePanDiffuse", "anormal");
  pose("cytoarchitecturePreservee", "anormal");
  chk("necrose diffuse lue d'abord comme post-mortem", tenue("necrosePM"));
  chk("C9 utilisable sur macere", crTient("may be used in macerated stillbirths"));
  chk("C9 suggere", !!suggerer().c9);
  propre();
  pose("myocytesHypereosinophiles", "anormal");
  pose("necroseRegionale", "anormal");
  chk("necrose territoriale : souffrance ischemique", tenue("ischemie"));

  /* 10. surcharge : la vacuolisation est physiologique */
  propre();
  pose("vacuolisationEtendue", "anormal");
  pose("pasResistantDiastase", "anormal");
  chk("surcharge lue", tenue("surcharge"));
  chk("jamais absence de vacuolisation myocytaire",
      crTient("NE JAMAIS ECRIRE absence de vacuolisation myocytaire"));
  chk("PAS et Oil red O suggeres", !!suggerer().pas && !!suggerer().oilRedO);

  /* 11. masses */
  propre();
  pose("cellulesAraignee", "anormal");
  pose("noduleUnique", "anormal");
  chk("un nodule unique n'evoque pas la sclerose tubereuse",
      crTient("If multiple, it is much more likely to be associated with tuberous sclerosis"));

  /* 12. valves */
  propre();
  pose("valveEpaissie", "anormal");
  chk("valve epaissie seule : dysplasie non tenue", !tenue("dysplasieValvulaire"));
  pose("myxoideNodulaire", "anormal");
  chk("seul le myxoide NODULAIRE fait la dysplasie", tenue("dysplasieValvulaire"));

  /* 13. bloc non concluant */
  propre();
  pose("caviteNonIdentifiable", "anormal");
  pose("cavitesEffondrees", "anormal");
  chk("la phrase du non regarde est ecrite",
      crTient("rien de coche ne veut pas dire absent : ca veut dire non regarde"));

  /* 14. anti-invention */
  chk("aucun grade cardiaque invente",
      SIGNES.concat(DIAGS).every(function(x){ return !/grade|stade/i.test(x.l); }));
  chk("les mitoses restent une variante", !par(SIGNES, "mitoses") && !!par(VARIANTES, "mitoses"));
  chk("aucun bouton ne porte un diagnostic",
      DIAGS.every(function(d){ return !document.querySelector('[data-act="les"][data-k="' + d.k + '"]'); }));
  chk("aucune page citee",
      !/\bp\.\s?\d|\bpage\s\d/i.test(JSON.stringify([PRELEV, RETENTION, STADES, SIGNES, DIAGS, NEGATIFS, TECHNIQUES])));

  propre();
  vidRet();
  set("sa", "30");
}
