/* Grille de lecture — foie et voies biliaires.
   Fond : ~/Bureau/fiches_lecture/fiche_foie.md (§1 à §9).
   Forme : gen_grille.py, calquée sur grille_poumon.html.
   Les divergences entre sources sont PORTÉES dans les champs, jamais arbitrées. */

var ORGANE  = "foie";
var TITRE   = "foie et voies biliaires";
var SOURCE  = "fiche_foie.md";
var MODULE  = "grille_foie";
var VERSION = "1.1.0";
var PAIR    = false;

var TITRE_CR    = "FOIE";
var STADE_TITRE = "Érythropoïèse sinusoïdale (horloge décroissante)";

var KCL_TXT = "Fœticide par KCl déclaré — la perte de basophilie induite par le geste ne se distingue " +
              "pas de celle de la rétention. Aucune borne n'est recevable.";

/* Le foie ne date pas le fœtus : il date sa rétention. */
var RETARD_NOTE = "Aucune des trois horloges hépatiques ne borne mieux que ± 4 SA. Ne pas rendre un " +
                  "terme sur le foie quand le poumon ou le rein sont disponibles.";
var AVANCE_NOTE = "Une érythropoïèse plus éteinte qu'attendue peut n'être que la perte des noyaux " +
                  "hématopoïétiques par macération, pas une donnée du fœtus. " +
                  "Le foie ne date pas le fœtus : il date sa rétention.";

var TECH_NOTE = "Les quatre dernières lignes sont hors de la lame : c'est en lisant la lame qu'on " +
                "découvre qu'il aurait fallu prélever, et il est alors trop tard. Réticuline, orcéine " +
                "et rouge Sirius sont absentes du corpus du service, mais aucune source ouverte ne les " +
                "recommande pour le foie fœtal : l'absence peut être un alignement correct, pas un manque.";

/* ── 01 · Prélèvement ─────────────────────────────────────────────────────── */
var PRELEV = [
  { k:"epaisseur", l:"Toute l'épaisseur du parenchyme, du hile à la périphérie", grave:true,
    manque:"le gradient de maturation biliaire est hile→périphérie ; un prélèvement périphérique seul " +
           "fait conclure à tort à une paucité [keeling, ch. 23]" },
  { k:"pasSousCapsulaire", l:"Prélèvement non parallèle à la capsule", grave:true,
    manque:"un prélèvement superficiel ne ramène que du sous-capsulaire, sans espace porte évaluable — " +
           "le CR du service l'observe lui-même : « 3 fragments de parenchyme hépatique sous-capsulaire »" },
  { k:"dixEP", l:"Au moins 10 espaces portes évaluables", grave:true,
    manque:"seuil explicite du comptage canal/espace porte [keeling, ch. 23] — sans lui, ni la paucité " +
           "ni son absence ne se concluent" },
  { k:"deuxLobes", l:"Les deux lobes échantillonnés",
    manque:"les malformations de plaque ductale peuvent être segmentaires [soffoet, ch. 7]" },
  { k:"hile", l:"Région hilaire présente sur la coupe",
    manque:"au hile le remodelage est achevé bien avant le terme : c'est la topographie qui sépare " +
           "l'immaturité de la paucité vraie" },
  { k:"vbeh", l:"Voies biliaires extra-hépatiques et vésicule en bloc",
    manque:"l'oblitération est extra-hépatique ; le foie seul ne tranche pas l'atrésie [keeling, ch. 23]" },
  { k:"congele", l:"Fragment de foie congelé",
    manque:"la paraffine dissout les lipides et ferme le diagnostic métabolique — « Fresh/frozen liver " +
           "and muscle assays » [keeling, ch. 11]" },
  { k:"peauCulture", l:"Biopsie de peau en milieu de culture",
    manque:"« trying to establish fibroblast growth from the decedent is a priority » [keeling, ch. 11]" },
  { k:"autresViscere", l:"Cœur, thyroïde, pancréas, glandes salivaires disponibles pour Perls",
    manque:"le critère qui fait le diagnostic de GALD n'est pas dans le foie" }
];

/* ── 02 · Rétention — le foie porte DEUX paliers, séparés par ~72 h ───────── */
var MODIF = "horloge accélérée par l'anasarque et par un intervalle délivrance-autopsie > 24 h, " +
            "ralentie par un terme < 25 SA — « Development of these features accelerated by fetal " +
            "hydrops and delivery-autopsy interval of > 24 h, and decelerated by fetal gestational " +
            "age < 25/40 » [keeling, ch. 15, Table 15.6]";

var RETENTION = [
  { k:"basoIsoles", l:"Perte de basophilie de quelques hépatocytes isolés", b:"≥ 24 h",
    d:"« Individual cells in liver »", h:24, q:"bon", alerte:MODIF,
    note:"la base porte une entrée concurrente à 4—12 h, sans source et sans description ; les livres " +
         "et la pratique du service donnent tous ≥ 24 h — trois valeurs, une seule sourcée. " +
         "Le palier 4–24 h appartient au REIN, pas au foie" },
  { k:"basoPartielle", l:"Perte de basophilie hépatocytaire partielle", b:"≈ 24–48 h",
    d:"pratique du service", h:36, q:"bon",
    note:"gradation partielle/complète propre au service, que la base ne porte pas" },
  { k:"basoTous", l:"Perte de basophilie de TOUS les hépatocytes", b:"≥ 96 h",
    d:"« All cells in the liver »", h:96, q:"bon", alerte:MODIF,
    note:"le rattachement de la ligne orpheline « Maximal ≥ 96 h » d'ernst au foie s'appuie sur " +
         "l'alignement des deux tables ; elles n'ont pas le même nombre de lignes (9 contre 10) — " +
         "l'alignement est CONCORDANT sur trois sources, pas démontré ligne à ligne" },
  { k:"basoComplete", l:"Perte complète, persistance dans le tube digestif", b:"96 h – 1 semaine",
    d:"pratique du service", h:120, q:"bon",
    note:"le foie n'est jamais lu seul : il s'encadre d'un organe plus rapide (tubes rénaux) et d'un " +
         "plus lent (tube digestif, surrénale). La règle d'arbitrage quand les deux divergent n'est " +
         "écrite nulle part" },
  { k:"epithBiliaire", l:"Épithélium biliaire effacé", b:"—", d:"le premier perdu", h:0, q:"moyen",
    note:"« Biliary epithelium is lost quickly with maceration, so assessment of bile duct development " +
         "could be hindered » [ernst, ch. 37] — une paucité biliaire ne se conclut pas sur foie macéré" },
  { k:"noyauxHemato", l:"Noyaux hématopoïétiques perdus", b:"—", d:"perdus avec ceux des hépatocytes",
    h:0, q:"moyen",
    note:"une hématopoïèse « effondrée » sur macéré est un artefact, pas une anémie ni une aplasie" },
  { k:"archTrichrome", l:"Architecture conservée au trichrome", b:"—", d:"indicateur de lisibilité",
    h:0, q:"mauvais",
    note:"« Trichrome can be helpful to determine if the structure of the liver is normal or abnormal » " +
         "[ernst, ch. 37] — l'architecture tombe en dernier et reste rattrapable" },
  { k:"calcifDystro", l:"Calcifications dystrophiques", b:"—", d:"non datable", h:0, q:"mauvais",
    note:"« Dystrophic calcification may develop in autolysed liver tissue » [keeling, ch. 15] — " +
         "ne pas y lire une infection, une tumeur ou une thrombose" },
  { k:"debrisGranulaires", l:"Débris granulaires", b:"—", d:"non datable", h:0, q:"mauvais",
    note:"« Degeneration of soft tissues results in granular debris which may be mistaken for " +
         "bacterial colonisation » [keeling, ch. 15]" }
];

/* ── 03 · Maturation — l'érythropoïèse sinusoïdale décroît de 24 à 36 SA ──── */
var STADES = [
  { k:"erythroMax", l:"Érythropoïèse sinusoïdale maximale", max:24,
    note:"maximale au 2ᵉ trimestre [ernst, ch. 5] ; la myélopoïèse portale est parallèlement active " +
         "de 20 à 32 SA — un excès à 24 SA et à 38 SA ne sont pas la même donnée" },
  { k:"erythroDecroit", l:"Érythropoïèse en décroissance", max:36,
    note:"l'hémosidérose périportale croît en miroir : elle est la conséquence de l'extinction de " +
         "l'érythropoïèse, pas une surcharge" },
  { k:"erythroResiduelle", l:"Îlots résiduels d'érythropoïèse", max:99,
    note:"le remodelage de la plaque ductale n'est PAS achevé au terme en périphérie — l'anneau " +
         "ductal périphérique persistant reste normal" }
];

/* ── 03 bis · Comptage canal biliaire / espace porte ──────────────────────── */
/* La seule mesure chiffrée solide de la fiche. Le compte s'entre nu ; déclarer
   la topographie et la technique est l'interprétation, elle vient après. */
var MESURE = {
  titre:"Comptage canal biliaire / espace porte",
  defLabel:"topographie du comptage",
  optLabel:"technique du comptage",
  defs:[{ k:"hile",       l:"Hile inclus" },
        { k:"peripherie", l:"Périphérie seule" }],
  opts:[{ k:"hes", l:"HES seul" },
        { k:"ck",  l:"CK7 / CK19" }],
  champs:[{ id:"ep",    label:"Espaces portes évaluables", min:0, max:100, step:1 },
          { id:"ratio", label:"Ratio canal / espace porte", min:0, max:3, step:0.1 }]
};

function verdictMesure(){
  var ep = E.mesure.v.ep, r = E.mesure.v.ratio, sa = num("sa");
  if (ep == null && r == null) return { cls:"",
    txt:"Comptage non fait — sans nombre d'espaces portes évaluables, toute mention de paucité ou " +
        "d'absence de paucité est ininterprétable. C'est le négatif que le service n'écrit jamais." };

  var t = "", cls = "ok", res = [];
  if (ep != null){
    t += ep + " espace(s) porte(s) évaluable(s).";
    if (ep < 10){ cls = "bad";
      t += " Le seuil de 10 exigé par [keeling, ch. 23] n'est pas atteint : ni la paucité ni son " +
           "absence ne se concluent."; }
  } else { cls = "warn"; res.push("nombre d'espaces portes évaluables non compté"); }

  if (r != null){
    t += " Ratio canal/espace porte = " + r + ".";
    if (r < 0.4){ if (cls !== "bad") cls = "bad";
      t += " Sous le seuil de paucité (0,4)."; }
    else if (r < 0.9){ if (cls === "ok") cls = "warn";
      t += " Entre le seuil de paucité (0,4) et la borne basse du normal (0,9) — zone que les sources " +
           "ne qualifient pas."; }
    else if (r <= 1.8){ t += " Dans l'intervalle normal (0,9–1,8)."; }
    else { if (cls === "ok") cls = "warn"; t += " Au-dessus de l'intervalle normal (0,9–1,8)."; }
    /* La borne est néonatale et la fiche ne sait pas ce qu'elle vaut à 22 SA. */
    t += " Réserve de barème : l'intervalle 0,9–1,8 et le seuil de 0,4 sont NÉONATALS ; aucune valeur " +
         "normale du ratio par âge gestationnel n'existe dans les sources ouvertes.";
    if (sa != null && sa < 30)
      res.push("barème néonatal appliqué à un fœtus de " + sa + " SA — la fiche ne sait pas ce qu'est " +
               "un ratio normal à ce terme, qui est pourtant le terme médian du service");
  }

  if (!E.mesure.def) res.push("topographie du comptage non déclarée — hile et périphérie ne se comptent pas ensemble");
  else if (E.mesure.def === "peripherie")
    res.push("comptage en périphérie seule : faux positif documenté — « as the most peripheral portal " +
             "tracts are the last to undergo ductal plate remodeling an apparent paucity may be seen in " +
             "biopsies from premature neonates or even close to term » [keeling, ch. 23]");
  if (!E.mesure.opt) res.push("technique du comptage non déclarée");
  else if (E.mesure.opt === "hes")
    res.push("HES seul : un canal effacé en HES peut rester marqué en CK7/CK19");
  if (E.retention.epithBiliaire === "present")
    res.push("épithélium biliaire effacé par la macération — le comptage n'est pas recevable");
  if (!E.prelev.dixEP) res.push("les 10 espaces portes ne sont pas confirmés au prélèvement");

  if (res.length){ if (cls === "ok") cls = "warn"; t += " Réserves : " + res.join(" ; ") + "."; }
  return { cls:cls, txt:t };
}

/* ── 05 · Variantes normales ──────────────────────────────────────────────── */
var VARIANTES = [
  { k:"travees",     l:"Travées hépatocytaires épaisses, pluristratifiées" },
  { k:"glycogene",   l:"Glycogénisation hépatocytaire, cytoplasme clair" },
  { k:"bessis",      l:"Îlots de Bessis, érythropoïèse sinusoïdale" },
  { k:"myelo",       l:"Myélopoïèse portale dans et autour des espaces portes" },
  { k:"hemosiderose",l:"Hémosidérose périportale croissant avec le terme" },
  { k:"plaqueDuct",  l:"Plaque ductale périphérique encore présente au terme" },
  { k:"cuivre",      l:"Protéine associée au cuivre périportale néonatale physiologique" },
  { k:"bileFine",    l:"Immaturité physiologique de la sécrétion biliaire" },
  { k:"epFetal",     l:"Espace porte fœtal lâche et mésenchymateux" }
];

/* ── 06 · Signes ──────────────────────────────────────────────────────────────
   On coche ce qu'on voit, un signe à la fois. Aucun nom de maladie ici : les
   noms se lisent en dessous, dans DIAGS, par association des signes cochés.
   Les exigences de consignation (compter ≥ 10 EP, nommer la lignée, préciser la
   zonation) ne sont pas des signes : elles vivent dans les négatifs et dans les
   avertissements des associations. */
var SIGNES = [
  /* Plaque ductale et canaux */
  { k:"profilDuctal",   l:"Profil ductal circonférentiel persistant en couronne autour de l'espace porte" },
  { k:"canauxAnastomoses", l:"Canaux dilatés et anastomosés" },
  { k:"atteinteHilaire", l:"Atteinte des espaces portes HILAIRES",
    meta:"le critère qui sépare l'immaturité périphérique de la lésion" },
  { k:"ratioBas",       l:"Ratio canal / espace porte < 0,4 sur ≥ 10 espaces portes" },
  { k:"ckConfirme",     l:"Raréfaction confirmée en CK7 / CK19" },

  /* Voies biliaires extra-hépatiques */
  { k:"obliterationVBEH", l:"Oblitération fibreuse du canal extra-hépatique" },
  { k:"lumiereResiduelle", l:"Lumière résiduelle réduite, calibre mesuré" },
  { k:"epithResiduel",  l:"Épithélium résiduel altéré ou absent" },
  { k:"situs",          l:"Contexte syndromique (situs, polysplénie)" },

  /* Cholestase */
  { k:"bouchonsCanalic", l:"Bouchons biliaires canaliculaires" },
  { k:"bouchonsDuctul", l:"Bouchons biliaires ductulaires" },
  { k:"cholestaseHepato", l:"Cholestase hépatocytaire" },
  { k:"pseudoglandulaire", l:"Forme pseudoglandulaire / rosettoïde" },

  /* Fer */
  { k:"perlsHepatoDuctul", l:"Dépôts Perls+ massifs dans les hépatocytes ET les cellules ductulaires" },
  { k:"predominanceParench", l:"Prédominance parenchymateuse nette sur les dépôts macrophagiques" },
  { k:"epargneSRE",     l:"Épargne du système réticulo-endothélial" },
  { k:"ferExtraHep",    l:"Dépôts de fer extra-hépatiques parenchymateux (cœur, thyroïde, pancréas, salivaires)",
    meta:"le critère du GALD n'est pas dans le foie" },

  /* Hématopoïèse */
  { k:"erythroAugmentee", l:"Érythropoïèse sinusoïdale augmentée (CD71)" },
  { k:"myeloAugmentee", l:"Myélopoïèse portale augmentée (MPO)" },
  { k:"erythroDiminuee", l:"Érythropoïèse diminuée" },

  /* Nécrose */
  { k:"foyersBordureNette", l:"Foyers focaux à bordure nette",
    meta:"le contraste local, pas l'état de la cellule" },
  { k:"reactionCellulaire", l:"Réaction cellulaire en regard des foyers" },
  { k:"necrosePeriveineuse", l:"Nécrose périveineuse hémorragique" },
  { k:"emportePiece",   l:"Distribution aléatoire à emporte-pièce" },

  /* Infection */
  { k:"oeilDeHibou",    l:"Inclusions intranucléaires en œil-de-hibou",
    meta:"survit à la macération" },
  { k:"inclusionsCytopl", l:"Inclusions cytoplasmiques" },
  { k:"cytomegaliqueBiliaire", l:"Cellules cytomégaliques dans les canaux biliaires" },
  { k:"inflamPortale",  l:"Inflammation portale, endothéliite, hémophagocytose sinusoïdale" },
  { k:"geantocellulaire", l:"Transformation géantocellulaire",
    meta:"réponse stéréotypée du foie fœtal, pas une signature" },

  /* Surcharge */
  { k:"ballooning",     l:"Ballooning hépatocytaire" },
  { k:"verreDepoli",    l:"Inclusions en verre dépoli / corps polyglucosaniques" },
  { k:"globulesDPAS",   l:"Inclusions DPAS+ en globules" },
  { k:"amylopectine",   l:"Matériel amylopectine-like" },
  { k:"microvesiculationDPAS", l:"Microvésiculation DPAS+" },
  { k:"macrophagesDPAS", l:"Macrophages DPAS+" },

  /* Stéatose */
  { k:"steatosePeriportale", l:"Stéatose périportale" },
  { k:"steatoseMicro",  l:"Stéatose microvésiculaire" },
  { k:"steatoseMassive", l:"Stéatose dominante ou massive" },
  { k:"steatosePanlobulaire", l:"Stéatose panlobulaire" },

  /* Fibrose */
  { k:"fibrosePortale", l:"Fibrose portale au trichrome" },
  { k:"proliferationDuctulaire", l:"Prolifération ductulaire" },
  { k:"pontsPortoPortaux", l:"Ponts fibreux porto-portaux" },
  { k:"fibroseDissequante", l:"Fibrose lobulaire disséquante",
    meta:"critère d'exclusion du GALD" },
  { k:"fibrosePeriDuctale", l:"Fibrose péri-ductale en manchon" },
  { k:"fibrosePericell", l:"Fibrose péricellulaire ou périsinusoïdale" },
  { k:"fibrosePeriveineuse", l:"Fibrose périveineuse" },
  { k:"cirrhose",       l:"Nodules de régénération, cirrhose" },

  /* Vaisseaux */
  { k:"shuntAbernethy", l:"Shunt porto-systémique congénital (Abernethy)" },
  { k:"cavernome",      l:"Cavernome portal" },
  { k:"ductusVenosus",  l:"Agénésie du ductus venosus" },
  { k:"agenesieVeines", l:"Agénésie des veines portes ou hépatiques, trajet anormal de la VCI" },
  { k:"thrombiFibrineux", l:"Thrombi fibrineux intravasculaires" },
  { k:"hematomeSC",     l:"Hématome sous-capsulaire" },

  /* Hétérotopies et rares */
  { k:"pancreasEctopique", l:"Tissu pancréatique ectopique périductal" },
  { k:"cartilagePeriductal", l:"Cartilage hyalin périductal" },
  { k:"kysteForegut",   l:"Kyste cilié d'origine foregut, kyste cholédoque" },
  { k:"ectasieCaroli",  l:"Ectasie ductale de type Caroli" },
  { k:"granulomes",     l:"Granulomes caséeux" },
  { k:"megacaryocytes", l:"Mégacaryocytes en excès" }
];

/* ── 06 bis · Associations — affichées, jamais cochées ────────────────────────
   Le nom se déduit des signes. « cle » est le signe pivot : sans lui le compte
   peut être atteint sans que l'association tienne. */
var DIAGS = [
  { k:"mpd", l:"Malformation de la plaque ductale / fibrose hépatique congénitale",
    cle:"atteinteHilaire", min:2,
    signes:["profilDuctal","canauxAnastomoses","fibrosePortale","atteinteHilaire"],
    stop:" — le remodelage physiologique non achevé en périphérie donne le même anneau : sans atteinte " +
         "hilaire, ce n'est pas une donnée. Aucune gradation validée n'existe (0 ligne hépatique dans " +
         "foeto_grades) : ne pas grader. Et pas de syndrome (Meckel, ARPKD, Joubert, Ivemark) sur le " +
         "foie seul — la MPD est un motif partagé, pas un diagnostic." },

  { k:"paucite", l:"Paucité des canaux biliaires interlobulaires", cle:"ratioBas", min:2,
    signes:["ratioBas","ckConfirme","atteinteHilaire"],
    stop:" — ni Alagille ni atrésie ne se concluent sur le compte intra-hépatique. Trois faux positifs " +
         "documentés : prématurité ou proche du terme, prélèvement sous-capsulaire, et macération, " +
         "l'épithélium biliaire tombant le premier. Le ratio EST la mesure : il n'y a pas de grade au-dessus." },

  { k:"avbeh", l:"Atrésie des voies biliaires extra-hépatiques", cle:"obliterationVBEH", min:2,
    signes:["obliterationVBEH","lumiereResiduelle","epithResiduel","situs"],
    stop:" — essentiellement pas de diagnostic en anténatal : « L'atrésie des voies biliaires " +
         "extra-hépatiques (AVBEH) est très rarement découverte en période fœtale » et " +
         "« il s'agit d'une lésion acquise car on ne connaît pas de cas familiaux » [soffoet, ch. 7]. " +
         "Sur un fœtus, prolifération ductulaire + cholestase N'AUTORISENT PAS ce diagnostic." },

  { k:"cholestase", l:"Cholestase", min:1,
    signes:["bouchonsCanalic","bouchonsDuctul","cholestaseHepato","pseudoglandulaire"],
    stop:" — trois différentiels avant de nommer : l'immaturité physiologique de la sécrétion biliaire, " +
         "le pigment formolique (biréfringent, Perls négatif — le CR du service pose lui-même la " +
         "question « pigment formolique ? sels biliaires ? »), et l'hémosidérine. La cholestase est un " +
         "syndrome commun : « Specific features of IEM are not often seen in biopsy reports » " +
         "[keeling, ch. 11]. Elle oriente le bilan, elle ne nomme pas la maladie. Compter les " +
         "compartiments atteints, ne pas grader." },

  { k:"gald", l:"Surcharge en fer / hémochromatose néonatale (GALD)", cle:"ferExtraHep", min:3,
    signes:["perlsHepatoDuctul","predominanceParench","epargneSRE","ferExtraHep"],
    stop:" — jamais d'hémochromatose néonatale sur le foie seul : « pattern évocateur d'hémochromatose " +
         "néonatale (GALD) mais non diagnostique en l'absence de preuve de dépôts extra-hépatiques " +
         "parenchymateux ». Ce qui tranche entre physiologique et pathologique est le COMPARTIMENT et " +
         "la distribution, pas l'intensité : périportal et macrophagique = physiologique. Le Perls des " +
         "foyers d'hématopoïèse est normal — « Le Perls est positif au niveau des zones d'hématopoïèse ». " +
         "Une fibrose disséquante EXCLUT le GALD." },

  { k:"emh", l:"Hématopoïèse extra-médullaire déplacée — physiologique ou réactive", min:1,
    signes:["erythroAugmentee","myeloAugmentee","erythroDiminuee"],
    stop:" — ne jamais écrire « hématopoïèse extra-médullaire augmentée » sans dire QUELLE lignée. " +
         "L'érythropoïèse monte dans « chronic fetal hypoxia or anemia and in infants of diabetic " +
         "mothers » et descend en prééclampsie ; la myélopoïèse monte sur infection et « may help " +
         "confirm a diagnosis of chorioamnionitis when the placenta is unavailable » [ernst, ch. 5]. " +
         "Aucune échelle de quantification n'existe dans aucune source : le seuil de « myélopoïèse " +
         "portale disproportionnée » est une compétence de lecteur, pas une donnée de livre. Le corpus n'a que " +
         "quatre modalités implicites, jamais définies." },

  { k:"necrose", l:"Nécrose hépatique", cle:"foyersBordureNette", min:2,
    signes:["foyersBordureNette","reactionCellulaire","necrosePeriveineuse","emportePiece"],
    stop:" — « There is a predictable pattern of loss of nuclear basophilia in the internal organs " +
         "which should not be mistaken for necrosis » [keeling, ch. 15] : sur foie macéré tout " +
         "ressemble à une nécrose de coagulation. Ce qui distingue la nécrose, c'est le CONTRASTE " +
         "LOCAL — bordure et réaction — pas la cellule ; l'autolyse est homogène sur toute la lame. " +
         "Jamais de nécrose sur un foie dont TOUS les hépatocytes ont perdu leur basophilie : l'un " +
         "explique l'autre. Le corpus du service porte 0 nécrose hépatique sur 63. La zonation et la " +
         "fraction du parenchyme se consignent, elles ne se déduisent pas." },

  { k:"cmv", l:"Infection à CMV et autres infections", cle:"oeilDeHibou", min:2,
    signes:["oeilDeHibou","inclusionsCytopl","cytomegaliqueBiliaire","inflamPortale","geantocellulaire"],
    stop:" — une transformation géantocellulaire n'est PAS une signature virale : c'est la réponse " +
         "stéréotypée du foie fœtal et néonatal à toute agression. Les hépatocytes oncocytaires et les " +
         "noyaux hypertrophiés de l'hématopoïèse simulent une cytomégalie. Les inclusions survivent à " +
         "la macération et « immunohistochemistry could be performed should there be diagnostic " +
         "uncertainty » [keeling, ch. 15]." },

  { k:"surcharge", l:"Surcharge métabolique", min:2,
    signes:["ballooning","verreDepoli","globulesDPAS","amylopectine","microvesiculationDPAS","macrophagesDPAS"],
    stop:" — aucun nom de maladie sur la morphologie seule : s'arrêter à « surcharge de type X, " +
         "compartiment Y ». La paraffine perd les lipides, « Oil-red-O staining may be useful to " +
         "document microvesicular steatosis » exige du congelé, et « Alcian blue stains failed to " +
         "convincingly demonstrate MPS in any of the liver sections » [pubmed] — un alcian bleu négatif " +
         "n'exclut rien. Préciser le compartiment (hépatocyte vs Kupffer) et la texture de la vacuole." },

  { k:"steatose", l:"Stéatose", min:1,
    signes:["steatosePeriportale","steatoseMicro","steatoseMassive","steatosePanlobulaire"],
    stop:" — « Steatosis in general should arouse suspicion of a metabolic disorder » [keeling, ch. 23], " +
         "et le côté artefact est VIDE : aucune source ouverte ne documente une stéatose induite par la " +
         "technique, le jeûne ou l'agonie. Toute stéatose est donc à lire comme potentiellement " +
         "significative — inconfortable, mais sourcé. Le différentiel est la glycogénisation fœtale : " +
         "le PAS avec et sans diastase tranche, le glycogène est PAS+ digestible. Chez un mort-né de " +
         "mère diabétique, « Hepatic steatosis is significantly more severe in stillborns of diabetic " +
         "mothers than in controls »." },

  { k:"fibrose", l:"Fibrose", min:1,
    signes:["fibrosePortale","proliferationDuctulaire","pontsPortoPortaux","fibroseDissequante",
            "fibrosePeriDuctale","fibrosePericell","fibrosePeriveineuse","cirrhose"],
    stop:" — l'espace porte fœtal est NORMALEMENT lâche et mésenchymateux : « fibreux » en HES seul " +
         "n'est pas une donnée, il faut le trichrome. La fibrose disséquante est le critère d'exclusion " +
         "du GALD, que le service énonce déjà comme négatif : « sans fibrose disséquante ». Le " +
         "compartiment oriente, pas la quantité." },

  { k:"vasculaire", l:"Anomalies vasculaires", min:1,
    signes:["shuntAbernethy","cavernome","ductusVenosus","agenesieVeines","thrombiFibrineux","hematomeSC"],
    stop:" — le foie est un ACTEUR de l'anasarque, pas seulement une victime : « Immature liver " +
         "produces low amounts of albumin, resulting in low protein levels » [keeling, ch. 13]. " +
         "Trois des causes vasculaires d'hydrops listées par le livre n'ont aucun terme dans " +
         "foeto_terms : ne pas conclure à leur absence parce que le champ manque." },

  { k:"rares", l:"Hétérotopies et lésions rares", min:1,
    signes:["pancreasEctopique","cartilagePeriductal","kysteForegut","ectasieCaroli",
            "granulomes","megacaryocytes"],
    stop:" — aucune de ces entités n'appelle de mesure ni de gradation. Un foie autolysé faisant hernie " +
         "par la paroi n'est pas une hétérotopie : « the softness of the autolysed liver may result in " +
         "protrusion of the autolysed liver mass through the anterior abdominal wall, mimicking " +
         "omphalocele » [keeling, ch. 15]." }
];

/* ── 07 · Négatifs obligatoires ───────────────────────────────────────────── */
var NEGATIFS = [
  { k:"nbEP", l:"Nombre d'espaces portes évaluables énoncé", p:"jamais écrit dans le corpus",
    ko:"nombre d'espaces portes NON énoncé — toute mention de paucité devient ininterprétable" },
  { k:"hileInclus", l:"Hile inclus ou non, précisé", p:"c'est la topographie qui sépare immaturité et paucité",
    ko:"topographie du comptage NON précisée" },
  { k:"macerationSignes", l:"Absence de signe de macération", p:"c'est ce qui autorise à lire la paucité et l'hématopoïèse",
    ko:"signes de macération PRÉSENTS — paucité biliaire et compte hématopoïétique non rendus" },
  { k:"fer", l:"Absence de surcharge en fer, Perls fait", p:"déjà pratiqué, 3 occurrences",
    ko:"surcharge en fer PRÉSENTE — étendre le Perls hors du foie avant de conclure" },
  { k:"ferExtra", l:"Perls négatif sur les autres viscères",
    p:"« absence de surcharge d'autres viscères (cœur, thyroïde et parathyroïdes, glandes paratrachéales, pancréas Perls négatifs) »",
    ko:"Perls extra-hépatique POSITIF ou non fait — le GALD ne se conclut pas sans lui" },
  { k:"bile", l:"Absence de surcharge en bile", p:"déjà pratiqué",
    ko:"surcharge en bile PRÉSENTE" },
  { k:"inflam", l:"Absence d'élément inflammatoire portal", p:"déjà pratiqué",
    ko:"inflammation portale PRÉSENTE — distinguer de la myélopoïèse portale physiologique" },
  { k:"inclusions", l:"Absence d'inclusion nucléaire", p:"déjà pratiqué",
    ko:"inclusions nucléaires PRÉSENTES" },
  { k:"fibroseDiss", l:"Absence de fibrose disséquante", p:"critère d'exclusion du GALD",
    ko:"fibrose disséquante PRÉSENTE" },
  { k:"vbehVues", l:"Voies biliaires extra-hépatiques examinées", p:"sans elles l'atrésie est indécidable",
    ko:"voies biliaires extra-hépatiques NON examinées" }
];

/* ── 08 · Techniques — une question par ligne ─────────────────────────────── */
var TECHNIQUES = [
  { k:"ck",       l:"CK7 / CK19", q:"y a-t-il assez de canaux biliaires ? — inutile sur foie macéré" },
  { k:"trichrome",l:"Trichrome", q:"l'architecture est-elle normale ? — reste valide sur foie macéré" },
  { k:"perls",    l:"Perls, foie", q:"ce pigment est-il du fer ?" },
  { k:"perlsExtra",l:"Perls, cœur / thyroïde / pancréas / salivaires", q:"le fer est-il extra-hépatique ? — le critère du GALD" },
  { k:"pasDiast", l:"PAS ± digestion diastasique", q:"ce cytoplasme clair est-il du glycogène ?" },
  { k:"dpas",     l:"DPAS", q:"y a-t-il des globules d'α1-antitrypsine ?" },
  { k:"oilred",   l:"Oil-red-O", q:"y a-t-il une stéatose ? — exige du congelé" },
  { k:"ferColl",  l:"Fer colloïdal, FFPE et coupe congelée", q:"y a-t-il des mucopolysaccharides ? — l'alcian bleu ne suffit pas" },
  { k:"mpo",      l:"MPO", q:"la lignée myéloïde est-elle augmentée ?" },
  { k:"cd71",     l:"CD71", q:"la lignée érythroïde est-elle augmentée ?" },
  { k:"ihcCmv",   l:"IHC anti-CMV", q:"est-ce un CMV ? — reste faisable sur macéré" },
  { k:"congeleAssay",l:"Dosages sur foie et muscle congelés", q:"cytopathie mitochondriale — rien en histologie" },
  { k:"fibroblastes",l:"Fibroblastes en culture, enzymes leucocytaires, ME", q:"surcharge lysosomale — rien en histologie" }
];

/* ── Propositions de techniques — déduites des clics, jamais imposées ─────── */
function suggerer(){
  var s = {};
  function anormal(k){ return E.signes[k] === "anormal"; }
  function ret(k){ return E.retention[k] === "present"; }

  function un(){ for (var i = 0; i < arguments.length; i++) if (anormal(arguments[i])) return true;
                 return false; }

  /* Les propositions suivent les SIGNES : une technique se demande sur ce qu'on
     a vu, pas sur le nom qu'on lui donnerait. */
  if (un("profilDuctal","canauxAnastomoses","atteinteHilaire")){ s.trichrome = 1; s.ck = 1; }
  if (un("ratioBas","ckConfirme")) s.ck = 1;
  if (un("obliterationVBEH","lumiereResiduelle","epithResiduel")){ s.ck = 1; s.trichrome = 1; }
  if (un("bouchonsCanalic","bouchonsDuctul","cholestaseHepato","pseudoglandulaire")) s.perls = 1;
  if (un("perlsHepatoDuctul","predominanceParench","epargneSRE","ferExtraHep")){
    s.perls = 1; s.perlsExtra = 1; s.trichrome = 1; }
  if (un("erythroAugmentee","myeloAugmentee","erythroDiminuee")){ s.mpo = 1; s.cd71 = 1; }
  if (un("foyersBordureNette","reactionCellulaire","necrosePeriveineuse","emportePiece")) s.trichrome = 1;
  if (un("oeilDeHibou","inclusionsCytopl","cytomegaliqueBiliaire","geantocellulaire","inflamPortale")) s.ihcCmv = 1;
  if (un("ballooning","verreDepoli","globulesDPAS","amylopectine","microvesiculationDPAS","macrophagesDPAS")){
    s.dpas = 1; s.pasDiast = 1; s.oilred = 1; s.ferColl = 1; s.fibroblastes = 1; }
  if (un("steatosePeriportale","steatoseMicro","steatoseMassive","steatosePanlobulaire")){
    s.oilred = 1; s.pasDiast = 1; s.congeleAssay = 1; }
  if (un("fibrosePortale","proliferationDuctulaire","pontsPortoPortaux","fibroseDissequante",
         "fibrosePeriDuctale","fibrosePericell","fibrosePeriveineuse","cirrhose")) s.trichrome = 1;
  if (un("shuntAbernethy","cavernome","ductusVenosus","agenesieVeines","thrombiFibrineux","hematomeSC"))
    s.trichrome = 1;

  /* Sur macéré le trichrome est la seule technique qui tienne encore. */
  if (RETENTION.some(function(r){ return E.retention[r.k] === "present" && r.q === "bon"; })) s.trichrome = 1;
  if (ret("epithBiliaire")) s.ck = 1;
  if (ret("noyauxHemato")){ s.mpo = 1; s.cd71 = 1; }

  if (E.mesure.opt === "hes" && E.mesure.v.ratio != null) s.ck = 1;
  if (E.negatifs.ferExtra === "present") s.perlsExtra = 1;
  if (E.negatifs.inclusions === "present") s.ihcCmv = 1;
  if (E.negatifs.fibroseDiss === "present") s.trichrome = 1;
  /* La décision de congeler se prend à la table : dès qu'une surcharge est suspectée. */
  if (E.prelev.congele && (s.oilred || s.dpas)) s.congeleAssay = 1;
  return s;
}

/* ── Contrôles propres au foie ────────────────────────────────────────────── */
async function testsOrgane(chk, clic, set, crTient, pause){
  /* Les deux paliers, et les ~72 h qui les séparent */
  chk("deux paliers hépatiques",  par(RETENTION, "basoIsoles").h === 24 &&
      par(RETENTION, "basoTous").h === 96);
  chk("écart de 72 h entre paliers",
      par(RETENTION, "basoTous").h - par(RETENTION, "basoIsoles").h === 72);
  chk("contradiction 4—12 h portée", par(RETENTION, "basoIsoles").note.indexOf("4—12 h") >= 0 &&
      par(RETENTION, "basoIsoles").note.indexOf("une seule sourcée") >= 0);
  chk("palier 4–24 h rendu au rein", par(RETENTION, "basoIsoles").note.indexOf("appartient au REIN") >= 0);
  chk("alignement ernst/keeling non démontré",
      par(RETENTION, "basoTous").note.indexOf("CONCORDANT") >= 0 &&
      par(RETENTION, "basoTous").note.indexOf("9 contre 10") >= 0);
  chk("règle d'arbitrage non écrite", par(RETENTION, "basoComplete").note.indexOf("n'est écrite nulle part") >= 0);

  /* Le comptage — observation d'abord */
  set("sa", "22");
  chk("sans comptage, la paucité est ininterprétable", crTient("est ininterprétable"));

  set("m_ep", "6");
  chk("moins de 10 EP bloque la conclusion", $("vMesure").className.indexOf("bad") >= 0 &&
      crTient("ni la paucité ni son absence ne se concluent"));
  set("m_ep", "14");
  chk("14 EP acceptés",            crTient("14 espace(s) porte(s) évaluable(s)"));

  set("m_ratio", "0.3");
  chk("ratio sous le seuil de paucité", crTient("Sous le seuil de paucité (0,4)"));
  chk("barème néonatal signalé",   crTient("sont NÉONATALS"));
  chk("barème néonatal sur fœtus de 22 SA", crTient("barème néonatal appliqué à un fœtus de 22 SA"));

  set("m_ratio", "0.6");
  chk("zone grise 0,4–0,9 nommée", crTient("zone que les sources ne qualifient pas"));
  set("m_ratio", "1.2");
  chk("ratio normal",              crTient("Dans l'intervalle normal (0,9–1,8)"));

  clic("mdef", "peripherie");
  chk("périphérie seule = faux positif documenté",
      crTient("apparent paucity may be seen in biopsies from premature neonates"));
  clic("mdef", "peripherie");
  clic("mopt", "hes");
  chk("HES seul propose la CK7",   suggerer().ck === 1 && crTient("peut rester marqué en CK7/CK19"));
  clic("mopt", "hes");

  /* La macération invalide le comptage */
  clic("ret", "epithBiliaire", "present");
  chk("épithélium biliaire perdu invalide le comptage", crTient("le comptage n'est pas recevable"));
  chk("paucité non conclue sur macéré",
      par(RETENTION, "epithBiliaire").note.indexOf("ne se conclut pas sur foie macéré") >= 0);
  clic("ret", "epithBiliaire", "present");

  /* Les stop qui portent le sens */
  chk("nécrose : le contraste local, pas la cellule",
      par(DIAGS, "necrose").stop.indexOf("CONTRASTE LOCAL") >= 0);
  chk("EMH : jamais sans nommer la lignée",
      par(DIAGS, "emh").stop.indexOf("QUELLE lignée") >= 0);
  chk("EMH : aucune échelle n'existe",
      par(DIAGS, "emh").stop.indexOf("Aucune échelle de quantification n'existe") >= 0);
  chk("GALD : jamais sur le foie seul",
      par(DIAGS, "gald").stop.indexOf("jamais d'hémochromatose néonatale sur le foie seul") >= 0);
  chk("AVBEH : pas de diagnostic anténatal",
      par(DIAGS, "avbeh").stop.indexOf("N'AUTORISENT PAS") >= 0);
  chk("MPD : ne pas grader",       par(DIAGS, "mpd").stop.indexOf("ne pas grader") >= 0);
  chk("stéatose : côté artefact vide",
      par(DIAGS, "steatose").stop.indexOf("côté artefact est VIDE") >= 0);
  chk("fibrose : trichrome obligatoire",
      par(DIAGS, "fibrose").stop.indexOf("n'est pas une donnée") >= 0);
  chk("géantocellulaire n'est pas viral",
      par(DIAGS, "cmv").stop.indexOf("n'est PAS une signature virale") >= 0);

  /* Le négatif que le service n'écrit jamais */
  chk("nombre d'EP en tête des négatifs", NEGATIFS[0].k === "nbEP");

  /* Le banc commun laisse des signes posés : on part d'un état voulu, pas supposé. */
  function pose(k, v){ if (E.signes[k] !== v) clic("les", k, v); }
  function ote(k){ if (E.signes[k]) clic("les", k, E.signes[k]); }
  function tenue(k){ return associations().some(function(a){ return a.d.k === k && a.tenu; }); }

  /* Le nom se déduit des signes — il ne se coche pas */
  chk("aucun bouton ne porte un diagnostic",
      DIAGS.every(function(d){ return !document.querySelector('[data-act="les"][data-k="' + d.k + '"]'); }));

  /* Le GALD ne se conclut pas sans le fer extra-hépatique */
  pose("perlsHepatoDuctul", "anormal");
  pose("predominanceParench", "anormal");
  pose("epargneSRE", "anormal");
  chk("GALD ne tient pas sans dépôt extra-hépatique", !tenue("gald") &&
      crTient("signe pivot non coché : Dépôts de fer extra-hépatiques"));
  chk("le fer propose le Perls extra-hépatique", suggerer().perlsExtra === 1);
  pose("ferExtraHep", "anormal");
  chk("GALD tient avec le dépôt extra-hépatique", tenue("gald"));
  ote("perlsHepatoDuctul"); ote("predominanceParench"); ote("epargneSRE"); ote("ferExtraHep");

  /* La MPD se joue sur le hile : la couronne périphérique seule ne suffit pas */
  pose("profilDuctal", "anormal");
  pose("canauxAnastomoses", "anormal");
  chk("MPD ne tient pas sans le hile", !tenue("mpd"));
  pose("atteinteHilaire", "anormal");
  chk("MPD tient avec le hile", tenue("mpd"));
  ote("profilDuctal"); ote("canauxAnastomoses"); ote("atteinteHilaire");

  /* Une lignée nommée suffit à porter l'hématopoïèse déplacée */
  pose("myeloAugmentee", "anormal");
  chk("EMH tient sur une lignée nommée", tenue("emh"));
  chk("EMH propose MPO et CD71",   suggerer().mpo === 1 && suggerer().cd71 === 1);
  ote("myeloAugmentee");
}
