/* Grille de lecture — cerveau et moelle épinière.
   Fond : ~/Bureau/fiches_lecture/fiche_cerveau_moelle.md (§1 à §9).
   Forme : gen_grille.py, calquée sur grille_poumon.html.
   Les divergences entre sources sont PORTÉES dans les champs, jamais arbitrées.

   La neuropathologie détaillée a son propre module (neuropath.html) : cette grille
   ne porte que ce que la fiche porte, et rien d'autre.

   Deux limites de la fiche traversent tout le fichier et ne se contournent pas :
   1) l'examen de l'encéphale part dans un compte rendu séparé et différé, donc TOUT
      chiffre de corpus est un plancher, jamais une mesure ;
   2) l'unité d'âge des livres anglophones n'est pas garantie — le même livre se
      contredit sur sa propre unité — donc une incertitude de ±2 semaines pèse sur
      toute la datation, et le SENS de cet écart est inconnu. */

var ORGANE  = "cerveau_moelle";
var TITRE   = "cerveau et moelle";
var SOURCE  = "fiche_cerveau_moelle.md";
var MODULE  = "grille_cerveau_moelle";
var VERSION = "1.0.1";

/* Le cerveau n'est pas un organe pair au sens du prélèvement. Ce qui compte ici
   n'est pas un côté mais un NIVEAU — niveaux médullaires prélevés, vermis contre
   hémisphère cérébelleux — et le niveau se déclare au § 04, où il conditionne ce
   que la lame peut conclure. */
var PAIR = false;

var TITRE_CR    = "CERVEAU ET MOELLE";
var STADE_TITRE = "Structures transitoires et repères de forme — ce qui date la lame quand la cytologie ne date plus";

var KCL_TXT = "Fœticide par KCl déclaré. La fiche ne décrit aucun effet cérébral du geste — mais " +
              "l'heure du décès est alors CONNUE : la datation par le neurone cortical ne sert plus " +
              "à estimer un délai. Aucune borne n'est à lire ici. Et le cerveau n'a de toute façon " +
              "aucun rang dans la séquence de macération des deux livres.";

var RETARD_NOTE = "Sur cet organe, un écart d'une ou deux semaines entre l'âge histologique et l'âge " +
                  "déclaré n'est pas anormal : il est dans l'épaisseur de la littérature. Le seuil " +
                  "d'alerte n'est pas la semaine, c'est le STADE. Avant de conclure à un retard, " +
                  "vérifier trois choses : l'unité de la source du repère utilisé (±2 semaines de " +
                  "sens inconnu, § 9-1), la qualité de la fixation (un cerveau insuffisamment fixé " +
                  "se déforme à la coupe), et la gyration au § 04 — c'est le seul repère qui survive " +
                  "à la macération. Un retard HARMONIEUX et un retard DYSHARMONIEUX ne se lisent pas " +
                  "pareil.";

var AVANCE_NOTE = "La fiche ne donne aucun sens à une avance de maturation cérébrale. Une avance " +
                  "apparente est d'abord un problème d'UNITÉ : les repères d'ernst et de perineuro " +
                  "sont écrits en semaines dont l'origine n'est pas définie, et deux semaines à cette " +
                  "période, c'est un stade entier (§ 9-1). Vérifier le terme déclaré et le repère " +
                  "utilisé avant d'écrire quoi que ce soit.";

var TECH_NOTE = "Les pointillés sont des propositions déduites des clics, jamais des prescriptions. " +
                "Trois d'entre elles ne se rattrapent pas après le formol : la congélation pour le " +
                "glycogène, la recherche du pigment d'ictère nucléaire, et l'orientation transversale " +
                "du bloc médullaire. Elles se décident à l'autopsie, pas à la lecture. Et la boîte à " +
                "outils de la myéline reste barrée tant que la divergence LFB / IHC n'est pas tranchée : " +
                "prescrire une coloration que le service ne fait pas (0 CR sur 176), c'est ouvrir un " +
                "champ qui restera vide.";

/* ── 01 · Prélèvement ─────────────────────────────────────────────────────── */
/* Contrairement aux quatorze autres organes, le service n'est pas ici en défaut
   de protocole : il en a un, et c'est le plus structuré de la série. Ce qui suit
   ajoute au gabarit du service ce que les livres exigent et qu'il n'écrit pas. */
var PRELEV = [
  { k:"basilaire", l:"Fixation en suspension par l'artère basilaire, formol zinc, 2 à 4 semaines", grave:true,
    manque:"« Fixation du cerveau en suspension par l'artère basilaire (afin d'éviter les " +
           "déformations artéfactielles) dans un mélange formol zinc » [soffoet, ch. 11] — " +
           "un cerveau insuffisamment fixé se déforme à la coupe et les déformations miment des " +
           "anomalies de forme" },
  { k:"duremere", l:"Sur fœtus macéré : encéphale retiré DANS sa dure-mère, formol 20 %",
    manque:"« Removal of the brain in its dura and adequate fixation in 20% formalin may greatly " +
           "increase the yield of examination of the brain in advanced maceration » [keeling, ch. 15] — " +
           "prescription distincte de la précédente, elle ne la contredit pas : l'une vise le cerveau " +
           "frais, l'autre le cerveau macéré. Écrire les deux" },
  { k:"encephalePreleve", l:"Encéphale prélevé, même liquéfié", grave:true,
    manque:"deux CR renoncent — « Aucun prélèvement d'encéphale n'a pu être réalisé » et « Examen " +
           "neuropathologique impossible en raison des altérations post-mortem » [corpus CR] — " +
           "deux renoncements que les livres ne soutiennent PAS : un cerveau liquéfié n'est pas un " +
           "cerveau perdu (§ 02)" },
  { k:"etages", l:"Les deux étages échantillonnés : sous-tentoriel et sus-tentoriel",
    manque:"le gabarit du service porte neuf items constants d'un CR à l'autre (noyaux gris centraux 25, " +
           "protubérance 24, cervelet 23, bulbe 23, cortex 22, olives 22, corps calleux 22, commissures 21, " +
           "noyau dentelé 17) — la cohérence de ces neuf nombres est la preuve d'une liste appliquée" },
  { k:"hippocampe", l:"Hippocampe sur la coupe", grave:true,
    manque:"0 CR sur 176 nomme l'hippocampe ou la corne d'Ammon [corpus CR] — c'est le siège du " +
           "subiculum, donc de la nécrose pontosubiculaire, « observed in 40% of brains from " +
           "stillbirths » [keeling, ch. 15] : le gabarit examine la protubérance sans jamais examiner " +
           "l'autre moitié de la lésion" },
  { k:"matriceGerm", l:"Matrice germinative périventriculaire sur la coupe", grave:true,
    manque:"0 CR sur 176 la nomme [corpus CR] — c'est à la fois le repère de datation le plus robuste " +
           "de la lame et le siège de l'hémorragie du prématuré" },
  { k:"thalamus", l:"Coupe thalamique",
    manque:"la chromatolyse thalamique est « a useful diagnostic pointer when the spinal cord is " +
           "unavailable for examination » [devneuro, ch. 39] — et la coupe thalamique fait déjà partie " +
           "du prélèvement sus-tentoriel standard" },
  { k:"moelleNiveaux", l:"Moelle prélevée sur trois niveaux : cervical, distal, lombaire", grave:true,
    manque:"soffoet ch. 22 conditionne le diagnostic des formes neurogènes d'akinésie à une étude " +
           "« sur les niveaux : cervical, distal et lombaire » — la moelle n'est prélevée par niveaux " +
           "que dans 1 CR sur 176 [corpus CR]" },
  { k:"moelleOrientee", l:"Moelle orientée, coupes TRANSVERSALES, sac dural inclus", grave:true,
    manque:"le critère de Pang (type I ou II) repose sur le nombre de sacs duraux en coupe " +
           "transversale : une moelle prélevée en fragments non orientés perd le critère, " +
           "définitivement" },
  { k:"hypophyse", l:"Adénohypophyse prélevée",
    manque:"soffoet ch. 11 la prescrit « en cas d'écart de croissance fœtale, d'hypoplasie surrénale » " +
           "et dans les malformations cérébrales, anencéphalies et neuro-dégénération comprises" },
  { k:"yeux", l:"Yeux prélevés dans les syndromes polymalformatifs impliquant le cerveau",
    manque:"soffoet ch. 11 cite nommément la lissencéphalie de type II" },
  { k:"congele", l:"Fragment congelé", grave:true,
    manque:"geste irrattrapable — le glycogène EXIGE du congelé : sans lui, la glycogénose n'est plus " +
           "démontrable en tant que telle" },
  { k:"pigmentIct", l:"Recherche du pigment d'ictère nucléaire décidée AVANT fixation", grave:true,
    manque:"geste irrattrapable — le pigment de l'ictère nucléaire est détruit par la fixation " +
           "formolée : quand la question se pose sur la lame, il est déjà trop tard" },
  { k:"renvoiNeuro", l:"Renvoi au compte rendu de neuropathologie tracé",
    manque:"7 CR sur 8 renvoient l'examen à plus tard — « Examen neuropathologique transmis " +
           "ultérieurement si anormal » [corpus CR] : le rendre explicite transforme un silence en " +
           "donnée" }
];

/* ── 02 · Rétention ───────────────────────────────────────────────────────────
   Ce § inverse le postulat des quatorze autres fiches. Sur le cerveau, la
   destruction macroscopique est maximale ET la lisibilité histologique persiste :
   « the nuclear detail can persist even in extremely macerated brain tissue »
   [ernst, ch. 37]. La datation MACROSCOPIQUE résiste donc mieux que la datation
   cytologique, ce qui est l'exact contraire du gabarit habituel. */

var HORS_SEQUENCE = "le cerveau est absent de la Table 15.6 de keeling comme de la Table 37.1 " +
                    "d'ernst : il n'a AUCUN rang dans la séquence de macération — ne pas lui en " +
                    "inventer un";

var BASE_INVENTEE = "borne horaire portée par un terme de la base et introuvable dans les six " +
                    "livres : elle est inventée, ou vient d'une source hors corpus qu'il faut " +
                    "nommer (§ 9-17). Pire, elle est orientée à l'ENVERS de la source — si le " +
                    "détail nucléaire du neurone persiste dans un cerveau extremely macerated, " +
                    "une caryolyse neuronale diffuse à 48 h ne peut pas être la règle";

var RETENTION = [
  { k:"neuroneCortical", l:"Lyse générale, seule subsiste la basophilie nucléaire des neurones corticaux",
    b:"≥ 8 semaines", d:"pratique du service, borne NON sourcée", h:1344, q:"moyen",
    note:"la LOGIQUE de cette datation est corroborée par les deux livres — le neurone cortical est " +
         "le dernier noyau basophile debout, et c'est le seul cas de toute la série où une pratique " +
         "du service est soutenue par le corpus de référence. Mais la borne « au moins 8 semaines de " +
         "rétention » [corpus CR] n'est retrouvée dans AUCUN livre (§ 9-16) : ernst ch. 37 dit au " +
         "contraire « There is no fetal organ that provides a good estimate of the timing of fetal " +
         "death between 2 and 4 weeks » et ne va pas au-delà. Écrire le critère, pas le chiffre, " +
         "ou écrire le chiffre en le donnant pour ce qu'il est",
    alerte:HORS_SEQUENCE },

  { k:"ret0", l:"Rétention 0 — neurones corticaux préservés", b:"nulle",
    d:"terme CER-RET-044, bien construit", h:0, q:"bon",
    note:"l'un des deux seuls termes de rétention de la base que la fiche valide, avec la compression " +
         "crânienne de Genest" },

  { k:"genest", l:"Compression crânienne (Genest)", b:"—", d:"aucun délai retrouvé", h:0, q:"mauvais",
    note:"terme CER-RET-018, bien construit : il porte le nom de l'étude dont ernst ch. 37 tire la " +
         "Table 37.1 — mais le cerveau ne figure pas dans cette table, et la fiche ne porte aucun " +
         "délai attaché à ce signe" },

  { k:"vacuolisation", l:"Vacuolisation neuronale autolytique débutante", b:"—",
    d:"la base dit > 24 h, non retrouvé", h:0, q:"mauvais",
    note:"CER-RET-046 — " + BASE_INVENTEE },

  { k:"caryolyse", l:"Caryolyse neuronale diffuse", b:"—",
    d:"la base dit > 48 h, non retrouvé", h:0, q:"mauvais",
    note:"CER-RET-011 — " + BASE_INVENTEE },

  { k:"liquefaction", l:"Cerveau extrêmement mou, liquéfié", b:"—",
    d:"n'interdit pas la lecture", h:0, q:"mauvais",
    note:"un cerveau liquéfié n'est pas un cerveau perdu : « even brains that are almost completely " +
         "liquefied may demonstrate interpretable histology » [keeling, ch. 15]. Le réflexe de ne pas " +
         "prélever un encéphale macéré n'est fondé sur aucune des deux sources" },

  { k:"gyrationConservee", l:"Pattern gyral conservé malgré la macération avancée", b:"—",
    d:"date la lame, pas le délai", h:0, q:"mauvais",
    note:"« Gyral pattern is retained even in advanced maceration and may be of particular use in " +
         "estimating gestational age » [keeling, ch. 15] — ce n'est pas une borne de rétention, c'est " +
         "l'inverse : sur un fœtus macéré, c'est la GYRATION qui date, pas la cytologie (§ 04)" },

  { k:"massesRacines", l:"Tissu cérébral autolysé poussé dans la moelle, le long des racines ou hors des trous de conjugaison",
    b:"—", d:"artefact de geste, ne date rien", h:0, q:"mauvais",
    note:"c'est l'accouchement par voie basse qui presse le cerveau liquéfié — « Such masses of " +
         "autolysed brain tissue should not be mistaken for a neurogenic neoplasm or encephalocele » " +
         "[keeling, ch. 15] et « This finding should not be confused with a neuroblastic tumor in the " +
         "retroperitoneum » [ernst, ch. 37]. Parade nommée : GFAP ou CD56" },

  { k:"tissuViscere", l:"Tissu cérébral dans la vascularisation du foie ou d'un autre viscère",
    b:"—", d:"artefact de geste, ne date rien", h:0, q:"mauvais",
    note:"le piège n'est pas confiné à la lame de cerveau : ernst ch. 37 signale du tissu cérébral " +
         "dans la vascularisation du foie et des autres organes — il peut surgir sur n'importe quelle " +
         "lame viscérale d'un fœtus macéré" }
];

/* ── 03 · Maturation ──────────────────────────────────────────────────────────
   Échelle RECONSTRUITE en une suite continue à partir des structures transitoires
   (§ 3.4) et des deux repères de forme (§ 3.5). Ce sont des repères, pas des
   seuils, et ils portent l'incertitude d'unité du § 3.0 : perineuro déclare
   « Gestational age is therefore postfertilization age plus two weeks » dans son
   corps de texte, mais les légendes de ses propres tables disent « age in weeks
   refers to postconceptional (gestational) weeks (38 weeks being term) » — le même
   livre se contredit sur sa propre unité. ernst ch. 29 écrit weeks gestation sans
   jamais le définir. Les Tableaux I et II de soffoet ch. 11, qui auraient donné
   l'agenda francophone nativement en SA, sont absents de l'extraction (§ 9-10). */
var STADES = [
  { k:"souPlaqueJeune", l:"Sous-plaque en place, plaque corticale homogène en HE, olive bulbaire à contour lisse",
    max:18,
    note:"sous-plaque présente de 14-17 à environ 35 ; plaque corticale homogène sur HE avant 20 SA ; " +
         "contour de l'olive bulbaire inférieure lisse à 17-18. Côté moelle : neurogenèse médullaire " +
         "terminée à 14, motoneurones organisés en agrégats caractéristiques à 17" },

  { k:"cajalDentele", l:"Neurones de Cajal-Retzius bien visibles en HE, noyau dentelé encore lisse",
    max:22,
    note:"grands neurones sous-piaux de la zone marginale, Reeline-positifs, bien visibles en HE à 21 ; " +
         "contour du noyau dentelé lisse et mal délimité AVANT 22. Deux faux positifs de ce rang : les " +
         "irrégularités du sillon central à 21, que perineuro attribue explicitement à la formation " +
         "précoce du sillon, et le status verrucosus simplex avec les papilles de Retzius, normaux " +
         "avant 24 SA" },

  { k:"dentelCrenele", l:"Crénelation du noyau dentelé distincte, population pyramidale profonde discernable",
    max:26,
    note:"crénelation du noyau dentelé distincte À PARTIR DE 22 — c'est le meilleur repère de la fiche " +
         "parce que son seuil est net et unique, qu'il se lit sur HE à faible grossissement et qu'il " +
         "porte sur une FORME, donc survit à la macération. DIVERGENCE NON tranchée sur le repère " +
         "cortical, et c'est celui que le service utilise le plus : ernst ch. 29 place la population " +
         "pyramidale profonde à 20-22 [non convertible], soffoet ch. 11 écrit « qu'à partir de 24 SA » " +
         "— deux à quatre semaines d'écart (§ 9-5)" },

  { k:"matriceInvolution", l:"Matrice germinative encore présente, éminence ganglionnaire épendymisée, grands pyramidaux en couche 5",
    max:30,
    note:"mitoses proéminentes de la zone germinative jusque vers 28 ; sur l'éminence ganglionnaire la " +
         "zone ventriculaire est remplacée par l'épendyme dès environ 27 ; grands neurones pyramidaux " +
         "identifiables en couche 5 vers 28. PIÈGE : perineuro donne DEUX fenêtres pour un seul " +
         "phénomène — épaisseur maximale « from 20–30 weeks » et pic de prolifération Ki67 « from 20 " +
         "to 26 weeks followed by a steep decline ». Épaisseur et prolifération ne culminent pas " +
         "ensemble : une matrice encore épaisse à 29 n'est PAS une matrice encore proliférante. " +
         "Conséquence directe du § 9-7 : on ne sait pas dire à partir de quel âge son absence est " +
         "anormale" },

  { k:"sixCouches", l:"Six couches néocorticales évidentes, matrice à niveau bas, couche granulaire sous-piale disparue",
    max:34,
    note:"six couches néocorticales évidentes à partir de 30 ; matrice germinative à niveau bas à " +
         "30-32 ; couche granulaire sous-piale présente jusque vers 30 — mais cette date n'est portée " +
         "que par un seul terme de base, sans source livre retrouvée (§ 9-26). DIVERGENCE NON tranchée " +
         "sur la lamina dissecans cérébelleuse : ernst ch. 29 écrit « persists until 32 weeks " +
         "gestation » [non convertible], perineuro donne 28 dans le VERMIS et 30 dans les HÉMISPHÈRES " +
         "(§ 9-6). Conséquence de lecture : une lamina dissecans présente sur une coupe hémisphérique " +
         "et absente sur le vermis n'est pas une contradiction, c'est la séquence normale" },

  { k:"laminationComplete", l:"Lamination corticale complète, sous-plaque dissipée, couche granuleuse externe résiduelle",
    max:99,
    note:"lamination complète 34-39 ; dissipation de la sous-plaque vers 35, concomitante de la " +
         "gyrification secondaire. Au cerveau il n'y a PAS d'état au terme stable : le terme n'est pas " +
         "un point d'arrivée mais un point de passage, et même à terme les neurones hippocampiques " +
         "restent petits et immatures, la morphologie adulte n'étant pas atteinte avant l'adolescence. " +
         "Persistent NORMALEMENT au terme : la glie radiaire du raphé dorsal — « Radial glia persist " +
         "until term and can readily be appreciated in the dorsal raphe » [ernst, ch. 29] — et une " +
         "couche granuleuse externe cérébelleuse résiduelle" }
];

/* ── 03 bis · Niveau médullaire, gyration, couche granuleuse externe ───────────
   Les trois seules mesures que la fiche autorise. Le § 10.8 en interdit
   nommément six autres : poids cérébral (deux sources incompatibles, ×8 contre
   ×10, et le poids ne se mesure pas sur une lame), épaisseur corticale en mm
   (aucune valeur dans les six livres), densité neuronale (idem), seuil de
   microcéphalie en DS (n'existe pas dans le corpus), bornes horaires de rétention
   (les deux qui existent sont non sourcées), fraction infratentorielle en %
   (ordre de grandeur, pas critère). Elles ne sont donc pas ici. */
var NIVEAUX = [
  { k:"aucun",      l:"Aucun niveau médullaire prélevé" },
  { k:"unSeul",     l:"Un seul niveau prélevé" },
  { k:"deux",       l:"Deux niveaux prélevés" },
  { k:"trois",      l:"Les trois niveaux : cervical, distal, lombaire" },
  { k:"fragmentee", l:"Moelle prélevée en fragments, sans orientation transversale" }
];

/* devneuro ch. 4 est le seul chapitre de ce livre à parler de gyration et il n'en
   donne AUCUN calendrier : il donne la lecture qui compte, et elle est
   catégorielle. Elle ne demande aucune conversion d'unité, et c'est le seul
   critère de datation qui survive à la macération. */
var GYRATION = [
  { k:"conforme",      l:"Gyration conforme à l'âge déclaré" },
  { k:"harmonieuse",   l:"Retard HARMONIEUX — gyration moins développée, mais ordonnée" },
  { k:"dysharmonieuse",l:"Retard DYSHARMONIEUX" },
  { k:"nonEvaluable",  l:"Non évaluable" }
];

var MESURE = {
  titre:"Niveaux médullaires prélevés, gyration, couche granuleuse externe cérébelleuse",
  defLabel:"niveaux médullaires — sans eux, « cornes antérieures normales » ne veut rien dire",
  optLabel:"gyration — le seul repère qui survive à la macération",
  defs:NIVEAUX, opts:GYRATION,
  champs:[{ id:"egl", label:"Couche granuleuse externe cérébelleuse (nombre de cellules)",
            min:0, max:20, step:1 }]
};

function verdictMesure(){
  var niv = E.mesure.def, gyr = E.mesure.opt, n = E.mesure.v.egl, sa = num("sa");

  /* Le piège le plus important de la fiche : l'astrocytose réactionnelle
     n'apparaît que vers 20-23 semaines, et un tissu nécrotique peut être résorbé
     sans laisser de trace gliale. Avant 20 SA, « pas de gliose » n'est pas faux :
     il est VIDE. 17 CR sur 176 l'écrivent, dont au moins deux sur des fœtus de
     11,8 et 17,4 SA. */
  var glioseVide = sa != null && sa < 20 &&
    (E.negatifs.gliose === "absent" || E.signes.glioseReactionnelle === "normal" ||
     E.signes.caviteSansGliose === "anormal");

  if (!niv && !gyr && n == null && !glioseVide)
    return { cls:"", txt:"Ni niveau médullaire, ni gyration, ni compte de la couche granuleuse " +
                         "externe — l'axe propre à l'organe n'est pas ouvert." };

  var t = [], cls = "ok", res = [];

  /* 1 · Le niveau médullaire, qui décide de ce que la moelle peut conclure. */
  if (!niv)
    res.push("niveau médullaire NON déclaré — sans lui, « cornes antérieures normales » ne veut rien dire");
  else if (niv === "aucun"){
    cls = "bad";
    t.push("AUCUN NIVEAU MÉDULLAIRE PRÉLEVÉ : « cornes antérieures normales » ne veut rien dire, et " +
           "le diagnostic des formes neurogènes d'akinésie n'est pas ouvert. La moelle n'est " +
           "réellement décrite que dans 2 CR sur 176 — cette situation est la règle, pas l'exception. " +
           "Le repli existe et il est bon marché : la chromatolyse thalamique est « a useful " +
           "diagnostic pointer when the spinal cord is unavailable for examination » [devneuro, ch. 39].");
  }
  else if (niv === "fragmentee"){
    cls = "bad";
    t.push("Moelle prélevée en FRAGMENTS non orientés : le critère de Pang est perdu, définitivement. " +
           "Le critère est le SAC DURAL en coupe transversale — deux hémi-moelles dans un seul sac " +
           "dural = type II, deux sacs = type I — et il ne se rattrape pas.");
  }
  else if (niv === "trois"){
    t.push("Les trois niveaux exigés par soffoet ch. 22 sont sur la table : cervical, distal, " +
           "lombaire. C'est le geste que le service connaît — un CR l'applique exactement — il est " +
           "simplement rare.");
  }
  else {
    cls = "warn";
    t.push((niv === "unSeul" ? "Un seul niveau médullaire" : "Deux niveaux médullaires") +
           " : ne permet pas de conclure à une ATTEINTE DIFFUSE des cornes antérieures. soffoet ch. 22 " +
           "exige les niveaux cervical, distal et lombaire.");
  }
  if (niv && niv !== "trois" && !E.prelev.thalamus)
    res.push("coupe thalamique non confirmée — c'est le repli quand la moelle manque, et elle fait " +
             "déjà partie du prélèvement sus-tentoriel standard");

  /* 2 · La gyration, catégorielle, et qui date quand la cytologie ne date plus. */
  if (!gyr)
    res.push("gyration NON déclarée — c'est le seul repère de datation qui survive à la macération");
  else if (gyr === "dysharmonieuse"){
    if (cls === "ok") cls = "warn";
    t.push("Retard DYSHARMONIEUX — oriente vers un trouble de la formation corticale.");
  }
  else if (gyr === "harmonieuse"){
    if (cls === "ok") cls = "warn";
    t.push("Retard HARMONIEUX — oriente vers une petite taille constitutionnelle ou une souffrance " +
           "globale.");
  }
  else if (gyr === "conforme") t.push("Gyration conforme à l'âge déclaré.");
  else t.push("Gyration non évaluable — le dire, ne pas laisser vide.");

  if (gyr && gyr !== "nonEvaluable")
    t.push("Cadre général en SA : sillons primaires entre 16 et 28 SA, secondaires jusqu'à 40 SA, " +
           "tertiaires au-delà. Mais les repères individuels DIVERGENT et ce n'est pas un biais " +
           "constant, donc pas une affaire d'unité : sillon temporal supérieur à 26 pour ernst " +
           "(« reliably present bilaterally ») contre 28 pour perineuro, gyrus temporal inférieur à " +
           "36 pour ernst contre 34 pour perineuro (§ 9-4). Un écart d'une ou deux semaines entre " +
           "l'âge gyral et l'âge déclaré n'est pas anormal : le seuil d'alerte n'est pas la semaine, " +
           "c'est le stade.");

  /* 3 · La seule épaisseur chiffrée de toute la fiche, et elle est en CELLULES. */
  if (n != null){
    if (sa == null){
      if (cls === "ok") cls = "warn";
      t.push("Couche granuleuse externe comptée à " + n + " cellules — sans terme, aucune attente " +
             "n'est calculable.");
    } else if (sa < 20 || sa > 30){
      if (cls === "ok") cls = "warn";
      t.push("Couche granuleuse externe comptée à " + n + " cellules à " + sa + " SA — HORS DE LA " +
             "FENÊTRE 20–30 SA, où seule la fourchette de 6 à 9 cellules est publiée. Au-delà de 30 " +
             "elle involue progressivement jusque vers 9 mois de vie postnatale, et la fiche ne donne " +
             "aucune valeur attendue : le compte se consigne, il ne s'interprète pas.");
    } else {
      t.push("Couche granuleuse externe comptée à " + n + " cellules à " + sa + " SA — épaisseur " +
             "maximale publiée de 6 à 9 cellules entre 20 et 30. C'est la seule épaisseur chiffrée en " +
             "nombre de cellules de toute la fiche, et elle est directement mesurable à l'objectif.");
      if (n < 6){ cls = "bad"; t.push("Compte SOUS la fourchette."); }
      else if (n > 9){ if (cls === "ok") cls = "warn"; t.push("Compte AU-DESSUS de la fourchette."); }
      else t.push("Compte conforme.");
    }
  }

  /* 4 · La date de naissance de la gliose — le constat le plus actionnable. */
  if (glioseVide){
    cls = "bad";
    t.push("GLIOSE À " + sa + " SA : l'astrocytose réactionnelle n'apparaît que vers 20-23 semaines " +
           "[devneuro, ch. 19], et un tissu nécrotique peut être résorbé sans laisser de trace gliale. " +
           "Le négatif n'est pas faux, il est VIDE — et une cavité sans gliose sur un fœtus jeune " +
           "reste compatible avec une lésion acquise. Formuler : « pas de gliose ; non interprétable " +
           "à cet âge ». Le discriminant hypoplasie/atrophie n'est pas utilisable ici non plus.");
  }

  if (!E.prelev.matriceGerm)
    res.push("matrice germinative non confirmée sur la coupe — c'est le repère de datation le plus " +
             "robuste de la lame, et 0 CR sur 176 la nomme");
  if (!E.prelev.basilaire)
    res.push("fixation non confirmée — un cerveau insuffisamment fixé se déforme à la coupe et mime " +
             "des anomalies de forme");

  if (res.length){ if (cls === "ok") cls = "warn"; t.push("Réserves : " + res.join(" ; ") + "."); }
  return { cls:cls, txt:t.join(" ") };
}

/* ── 05 · Variantes normales ──────────────────────────────────────────────────
   Le § 8.3 de la fiche est presque entièrement fait de faux positifs de
   maturation : des structures NORMALES à leur âge, qui miment une lésion. La
   première d'entre elles est le faux positif le mieux quantifié de toute la
   série des quinze fiches. */
var VARIANTES = [
  { k:"heterotopieCerebelleuse",
    l:"Hétérotopie cérébelleuse non proéminente, isolée, sans contexte syndromique" },
  { k:"grandsNeuronesInterstitiels",
    l:"Grands neurones interstitiels de la substance blanche — résidus probables de la sous-plaque" },
  { k:"glieMyelinisation",
    l:"Glie de myélinisation — cellules rondes, éosinophiles, noyau excentrique, cytoplasme sans processus" },
  { k:"glieRadiaire",
    l:"Glie radiaire du raphé dorsal — persiste NORMALEMENT jusqu'au terme" },
  { k:"eglResiduelle",
    l:"Couche granuleuse externe cérébelleuse résiduelle au terme" },
  { k:"statusVerrucosus",
    l:"Status verrucosus simplex, papilles de Retzius — avant 24 SA" },
  { k:"sillonCentralIrregulier",
    l:"Irrégularités du sillon central à 21 — formation précoce du sillon" },
  { k:"neuronesImmaturesCA1",
    l:"Neurones hippocampiques petits et immatures au terme, secteur CA1" },
  { k:"neuropilePauvre",
    l:"Neuropile pauvre au début du 2ᵉ trimestre — fins processus peu colorants" },
  { k:"laminaVermisAbsente",
    l:"Lamina dissecans absente au vermis, présente à l'hémisphère" },
  { k:"cajalRetzius",
    l:"Neurones de Cajal-Retzius sous-piaux bien visibles en HE" },
  { k:"eminenceEpendymisee",
    l:"Éminence ganglionnaire à zone ventriculaire remplacée par l'épendyme (dès ~27)" }
];

/* ── 06 · Signes ──────────────────────────────────────────────────────────────
   On coche des SIGNES, jamais des diagnostics. Sur cet organe la frontière est
   d'autant plus nette que le diagnostic malformatif est très majoritairement
   MACROSCOPIQUE : l'histologie sert à trancher entre deux macroscopies qui se
   ressemblent, ce qui est l'inverse du rein ou du poumon. Une partie des signes
   ci-dessous ne se lisent donc pas sur la lame — ils sont marqués comme tels.
   Rien de coché ne veut pas dire absent : ça veut dire non regardé. */
var SIGNES = [
  /* Fermeture du tube neural — ce que les deux CR décrivent sans le mot */
  { k:"placodeNeurale", l:"Moelle ouverte vers l'arrière, épendyme en quasi-continuité avec la peau",
    meta:"c'est la placode neurale de devneuro, et le service l'écrit déjà — « Au niveau du défect, la " +
         "moelle est ouverte vers l'arrière et l'épendyme en quasi-continuité avec la peau » [corpus CR]" },
  { k:"fermetureSousLesion", l:"Fermeture de la moelle sous le niveau lésionnel, malformative et hémorragique",
    meta:"second verbatim du même CR, et il décrit un étage SOUS la lésion — donc plusieurs niveaux" },
  { k:"areaCerebrovasculosa", l:"Area cerebrovasculosa — tissu neuroglial désorganisé et vasculaire",
    meta:"l'anencéphalie n'est pas un défaut de fermeture mais une dégénérescence secondaire d'un tube " +
         "ouvert : on trouve un tissu désorganisé, pas un cerveau formé puis amputé" },

  /* Ligne médiane — les trois seuls apports de la coupe */
  { k:"corpsCalleuxAbsent", l:"Corps calleux absent", meta:"diagnostic MACROSCOPIQUE — la coupe n'ajoute que trois points" },
  { k:"faisceauxProbst", l:"Faisceaux de Probst — faisceaux longitudinaux para-ventriculaires" },
  { k:"dysplasieCortexAdjacent", l:"Dysplasie du cortex adjacent à la malformation médiane" },

  /* Migration — le seul endroit où l'histologie tranche vraiment */
  { k:"espaceSousArachnoidienOblitere", l:"Oblitération de l'espace sous-arachnoïdien" },
  { k:"vaguesAmasNeuronaux", l:"Désorganisation complète de la lamination en vagues et amas neuronaux" },
  { k:"heterotopiesNodulairesProfondes", l:"Hétérotopies nodulaires profondes" },
  { k:"surmigrationPie", l:"Surmigration de nids neurogliaux À TRAVERS la pie-mère",
    meta:"le franchissement de la pie-mère est le critère lisible des lissencéphalies cobblestone" },
  { k:"corticalHyperconvolute", l:"Cortex macroscopiquement hyperconvoluté" },
  { k:"laminationNormaleSousGyri", l:"Histologie et lamination NORMALES sous les circonvolutions surnuméraires" },
  { k:"laminationDesorganisee", l:"Lamination corticale désorganisée" },
  { k:"neuronesGlieGrandsAtypiques", l:"Grande taille et atypie des neurones et de la glie" },
  { k:"heterotopieSubstanceBlanche", l:"Amas neuronaux dans la substance blanche",
    meta:"les grands neurones interstitiels, résidus de sous-plaque, miment cet aspect (§ 05)" },

  /* Fosse postérieure */
  { k:"heterotopieCerebelleuseProeminente", l:"Hétérotopie cérébelleuse PROÉMINENTE",
    meta:"le négatif utile porte sur le caractère proéminent, jamais sur la présence" },
  { k:"vermisAplasieFusion", l:"Aplasie du vermis avec fusion apparente des hémisphères cérébelleux",
    meta:"diagnostic de coupe FRONTALE" },
  { k:"dysplasieCerebelleuseExtensive", l:"Dysplasie cérébelleuse extensive" },
  { k:"purkinjeInterrompue", l:"Monocouche de Purkinje interrompue ou irrégulière" },
  { k:"rosettesEpendymaires", l:"Rosettes épendymaires dans l'aqueduc, les 3ᵉ et 4ᵉ ventricules" },
  { k:"aqueducStenose", l:"Aqueduc de Sylvius rétréci ou non perméable" },
  { k:"herniationCervelet", l:"Herniation du cervelet, et parfois du tronc, hors de la fosse postérieure",
    meta:"lecture MACROSCOPIQUE — point commun des quatre types de Chiari" },

  /* Surcharge — la famille, jamais la maladie */
  { k:"neuroneBallonise", l:"Distension (ballonisation) des corps cellulaires neuronaux et de leurs prolongements" },
  { k:"cellulesGaucher", l:"Cellules de Gaucher dispersées dans tout le cerveau" },
  { k:"perteNeuronaleNGC", l:"Perte neuronale des noyaux gris centraux, du tronc et des noyaux dentelés" },
  { k:"neuronophagie", l:"Neuronophagie" },
  { k:"necroseLaminaire", l:"Nécrose laminaire corticale" },
  { k:"pasdPositif", l:"Matériel de surcharge PASD-positif",
    meta:"le PAS est déjà pratiqué dans 84 CR sur 176 — la moitié de la parade est en place, le fer " +
         "colloïdal n'apparaît dans aucun CR" },

  /* Motoneurone — le diagnostic se fait à la moelle, pas au muscle */
  { k:"perteCornesAnterieures", l:"Perte des motoneurones des cornes antérieures" },
  { k:"chromatolyseMotoneurones", l:"Chromatolyse des motoneurones médullaires" },
  { k:"ballonisationMotoneurone", l:"Ballonisation des motoneurones" },
  { k:"activationMicrogliale", l:"Activation microgliale" },
  { k:"gangliRachidiensChromatolyse", l:"Chromatolyse des cellules sensitives des ganglions rachidiens dorsaux" },
  { k:"chromatolyseThalamique", l:"Chromatolyse thalamique",
    meta:"le repli quand la moelle manque, et la moelle n'est réellement décrite que dans 2 CR sur 176" },

  /* Moelle — dysraphismes fermés, critère de coupe transversale */
  { k:"deuxHemiMoellesUnSac", l:"Deux hémi-moelles dans un SEUL sac dural" },
  { k:"deuxSacsDuraux", l:"Deux sacs duraux distincts" },
  { k:"hydromyelie", l:"Dilatation du canal médullaire (hydromyélie)" },
  { k:"coneHaut", l:"Cône médullaire se terminant au-dessus du rachis lombaire moyen après 27 SA",
    meta:"seul repère médullaire daté de tout le corpus, et il est non confirmé" },

  /* Lésions acquises — et leur horloge */
  { k:"glioseReactionnelle", l:"Astrocytose réactionnelle (gliose)",
    meta:"n'apparaît que vers 20-23 semaines : avant, son absence ne prouve rien" },
  { k:"caviteSansGliose", l:"Cavité ou perte de substance SANS gliose" },
  { k:"rarefactionNeuronale", l:"Raréfaction neuronale" },
  { k:"hemorragieMatrice", l:"Hémorragie de la matrice germinative ou intraventriculaire",
    meta:"1 seul CR sur 176 en mentionne une — et c'est le type de lésion qui part dans le rapport différé" },
  { k:"leucomalacie", l:"Leucomalacie périventriculaire ou cavitation de la substance blanche" },
  { k:"structurePetiteBienConstruite", l:"Structure petite mais bien construite, sans gliose ni perte neuronale" },
  { k:"cerveauPetit", l:"Encéphale petit pour l'âge déclaré",
    meta:"constat MACROSCOPIQUE — aucun seuil de microcéphalie en DS n'existe dans les six livres" },

  /* Myéline — le critère existe, la technique qui le lit n'est pas documentée */
  { k:"retardMyelinisation", l:"Réduction d'intensité de la substance blanche attendue pour l'âge" },
  { k:"macrophagesMyeline", l:"Macrophages chargés de myéline" },

  /* Maturation anormale, par structure transitoire */
  { k:"matricePersistante", l:"Matrice germinative persistante au-delà de l'âge attendu" },
  { k:"granSousPialePersistante", l:"Couche granulaire sous-piale persistante après 30" },
  { k:"sousPlaquePersistante", l:"Sous-plaque persistante après 35" },
  { k:"laminaDissecansPersistante", l:"Lamina dissecans persistante aux DEUX étages, vermis compris" },
  { k:"dentelNonCrenele", l:"Noyau dentelé à contour lisse et mal délimité après 22" },
  { k:"oliveNonCrenelee", l:"Olive bulbaire inférieure à contour lisse au 3ᵉ trimestre" },

  /* Ce qui vient d'ailleurs que de la lame */
  { k:"neuropathDiffere", l:"Examen neuropathologique renvoyé à un compte rendu séparé",
    meta:"hors lame — 7 CR sur 8 le font, et c'est la limite qui fait de tout chiffre de corpus un plancher" }
];

/* ── Associations lues ────────────────────────────────────────────────────────
   Elles s'affichent, elles ne se cochent jamais. Sur cet organe, plusieurs
   d'entre elles partagent délibérément leurs signes : la macération, la
   variante normale et la lésion donnent souvent la MÊME image, et le module
   doit les faire apparaître ensemble plutôt que d'en choisir une. */
var DIAGS = [
  { k:"lissencephalieII", l:"Lissencéphalie de type II — les trois critères de coupe",
    cle:"espaceSousArachnoidienOblitere", min:2,
    signes:["espaceSousArachnoidienOblitere","vaguesAmasNeuronaux","heterotopiesNodulairesProfondes",
            "surmigrationPie"],
    stop:" — les trois critères viennent EN CREUX, du diagnostic différentiel de la polymicrogyrie : " +
         "« obliteration of the subarachnoid space, complete disorganization of the laminar pattern " +
         "into neuronal waves and clusters, and deeply placed nodular heterotopias » [devneuro, ch. 8]. " +
         "Le type I est un groupe génétique, 13 gènes causaux dont LIS1 sur 17p : la lame ne le porte " +
         "pas. Et NE PAS chercher une inversion corticale au motif du modèle murin — « Le cortex " +
         "inversé est un phénotype de souris » et le phénotype humain publié des mutations RELN est " +
         "une lissencéphalie avec hypoplasie cérébelleuse." },

  { k:"polygyrieHydrocephalie", l:"Polygyrie d'hydrocéphalie — PAS une polymicrogyrie",
    cle:"laminationNormaleSousGyri", min:2,
    signes:["laminationNormaleSousGyri","corticalHyperconvolute","aqueducStenose","rosettesEpendymaires"],
    stop:" — piège de macroscopie que SEULE la coupe résout : « Polymicrogyria must be distinguished " +
         "from polygyria, a macroscopically hyperconvoluted cortex most often associated with " +
         "hydrocephalus in early life in which cortical histology and layering is normal » " +
         "[devneuro, ch. 8]. Un cortex hyperconvoluté à lamination normale est une conséquence " +
         "MÉCANIQUE, pas un trouble de migration." },

  { k:"dysplasieCorticaleFocale", l:"Dysplasie corticale focale",
    cle:"neuronesGlieGrandsAtypiques", min:2,
    signes:["neuronesGlieGrandsAtypiques","laminationDesorganisee","dysplasieCortexAdjacent"],
    stop:" — troisième différentiel donné par devneuro ch. 8, sur « the large size and atypia of " +
         "neurons and glia ». La fiche n'en donne ni gradation ni topographie : ne rien ajouter." },

  { k:"heterotopieCerebelleuseLue", l:"Hétérotopie cérébelleuse — le faux positif le mieux quantifié de la série",
    cle:"heterotopieCerebelleuseProeminente", min:2,
    signes:["heterotopieCerebelleuseProeminente","dysplasieCerebelleuseExtensive","vermisAplasieFusion",
            "purkinjeInterrompue"],
    stop:" — « Une hétérotopie cérébelleuse est présente chez plus d'un nourrisson normal sur deux. » " +
         "Ce n'est donc PAS un signe. Elle ne devient significative que proéminente ET associée — " +
         "trisomies 13 et 18, syndromes cérébelleux constitués. La signaler seule, « sans contexte, " +
         "produit un faux diagnostic une fois sur deux »." },

  { k:"rhombencephalosynapsis", l:"Rhombencéphalosynapsis",
    cle:"vermisAplasieFusion", min:2,
    signes:["vermisAplasieFusion","dysplasieCerebelleuseExtensive","purkinjeInterrompue"],
    stop:" — « a syndrome of vermian aplasia with apparent fusion of the cerebellar hemispheres » " +
         "[devneuro, ch. 15]. Diagnostic de coupe FRONTALE. Le même chapitre relie les dysplasies " +
         "cérébelleuses au syndrome de Zellweger et signale l'association rare dysplasie " +
         "septo-optique / hypoplasie cérébelleuse — associations, pas critères de lame." },

  { k:"stenoseAqueduc", l:"Sténose de l'aqueduc — un substrat histologique nommé",
    cle:"rosettesEpendymaires", min:2,
    signes:["rosettesEpendymaires","aqueducStenose","herniationCervelet"],
    stop:" — c'est l'apport le plus directement actionnable du § 5.5 : « la sténose de l'aqueduc a un " +
         "substrat histologique nommé », les rosettes épendymaires de l'hydrocéphalie autosomique " +
         "récessive non syndromique de type 2 (MPDZ), l'autre cause génétique étant CCDC88C. Le " +
         "gabarit du service porte déjà « Mésencéphale : aqueduc de taille conforme » : l'item " +
         "existe, il lui manque le critère microscopique." },

  { k:"chiari", l:"Malformation de Chiari — lecture macroscopique",
    cle:"herniationCervelet", min:2,
    signes:["herniationCervelet","placodeNeurale","aqueducStenose"],
    stop:" — point commun des quatre types : « herniation of the cerebellum, and, in some cases, " +
         "parts of the brainstem outside the posterior fossa » [devneuro, ch. 12], classés en " +
         "association avec l'hydrocéphalie. La fréquence de l'hydrocéphalie dans le Chiari II DIVERGE " +
         "entre les sources du corpus et la fiche ne la chiffre pas, faute d'avoir pu vérifier le " +
         "verbatim des deux côtés (§ 9). Ne pas en écrire une." },

  { k:"tubeNeuralOuvert", l:"Défaut de fermeture du tube neural — nomenclature à respecter",
    cle:"placodeNeurale", min:2,
    signes:["placodeNeurale","fermetureSousLesion","areaCerebrovasculosa"],
    stop:" — deux points de méthode : l'anencéphalie n'est PAS un défaut de fermeture mais une " +
         "dégénérescence secondaire d'un tube ouvert, d'où l'area cerebrovasculosa sur la lame ; et " +
         "l'exencéphalie ne se voit QUE chez l'embryon et le fœtus précoce — la porter au 2ᵉ " +
         "trimestre est un contresens de stade. Les deux seuls CR qui décrivent réellement la moelle " +
         "sont des myéloméningocèles, et ils écrivent la placode sans le mot : « C'est exactement la " +
         "placode neurale de devneuro, décrite sans le mot. »" },

  { k:"agenesieCalleuse", l:"Agénésie du corps calleux — ce que la coupe ajoute",
    cle:"corpsCalleuxAbsent", min:2,
    signes:["corpsCalleuxAbsent","faisceauxProbst","dysplasieCortexAdjacent","glioseReactionnelle"],
    stop:" — diagnostic MACROSCOPIQUE. La coupe n'ajoute que trois points : les faisceaux de Probst, " +
         "la distinction agénésie / destruction secondaire qui repose sur la gliose, et la dysplasie " +
         "du cortex adjacent. ATTENTION : le deuxième point est inutilisable avant 20-23 semaines, " +
         "puisque la gliose n'existe pas encore (§ 04)." },

  { k:"surchargeNonTypable", l:"Surcharge neuronale — la famille, JAMAIS la maladie",
    cle:"neuroneBallonise", min:1,
    signes:["neuroneBallonise","pasdPositif","perteNeuronaleNGC"],
    stop:" — un seul signe suffit à poser la famille, et aucun nombre de signes ne suffit à nommer la " +
         "maladie : « Le neurone ballonisé pose la famille, jamais la maladie. » Le corpus est " +
         "explicite — la seule présence de neurones élargis n'est diagnostique d'aucune maladie " +
         "sous-jacente, Tay-Sachs, Niemann-Pick et NCL comprises [keeling, ch. 29]. Le libellé " +
         "recevable est : surcharge neuronale, maladie non typable sur la lame." },

  { k:"gaucher", l:"Maladie de Gaucher — la seule exception documentée du corpus",
    cle:"cellulesGaucher", min:2,
    signes:["cellulesGaucher","neuronophagie","perteNeuronaleNGC","necroseLaminaire"],
    stop:" — seule surcharge du corpus à avoir une cellule caractéristique nommée dans le cerveau " +
         "[devneuro, ch. 29] : perte neuronale prédominant aux noyaux gris centraux, au tronc et aux " +
         "noyaux dentelés, atteinte corticale maximale au cortex calcarin et à l'hippocampe, " +
         "neuronophagie fréquente, nécrose laminaire possible dans les formes sévères. Dans la forme " +
         "périnatale léthale, le CD68 marque la composante microgliale — et le CD68 est DÉJÀ pratiqué " +
         "par le service, dans 25 CR sur 176." },

  { k:"motoneuroneMedullaire", l:"Atteinte du motoneurone — le diagnostic se fait ICI, pas au muscle",
    cle:"perteCornesAnterieures", min:2,
    signes:["perteCornesAnterieures","glioseReactionnelle","chromatolyseMotoneurones",
            "ballonisationMotoneurone","activationMicrogliale","neuronophagie"],
    stop:" — apport de cette fiche aux quatorze précédentes : la fiche muscle laissait la divergence " +
         "keeling / soffoet ouverte à 1 contre 1 ; devneuro ch. 39, source indépendante, la déplace à " +
         "2 contre 1 en écrivant que chez le nouveau-né l'atrophie groupée peut manquer et n'apparaît " +
         "qu'à partir de six semaines de vie — c'est-à-dire jamais chez le fœtus. Conséquence : " +
         "« le diagnostic se fait à la moelle, pas au muscle », et le muscle sert de confirmation. La " +
         "divergence n'est pas tranchée en autorité, elle est déplacée. Sans niveaux médullaires " +
         "(§ 04), rien de tout cela n'est conclusif." },

  { k:"repliThalamique", l:"Repli thalamique — quand la moelle manque",
    cle:"chromatolyseThalamique", min:2,
    signes:["chromatolyseThalamique","gangliRachidiensChromatolyse","chromatolyseMotoneurones"],
    stop:" — la phrase la plus utile de tout le § 5 pour la pratique : la chromatolyse thalamique est " +
         "« a useful diagnostic pointer when the spinal cord is unavailable for examination » " +
         "[devneuro, ch. 39]. La moelle n'étant réellement décrite que dans 2 CR sur 176, cette " +
         "situation est la RÈGLE. Le geste est bon marché : la coupe thalamique fait déjà partie du " +
         "prélèvement sus-tentoriel standard." },

  { k:"splitCordII", l:"Split cord malformation de type II (un seul sac dural)",
    cle:"deuxHemiMoellesUnSac", min:2,
    signes:["deuxHemiMoellesUnSac","hydromyelie","fermetureSousLesion"],
    stop:" — « As the hemi-cords exist within a single dural sac, this defect is referred to as split " +
         "cord malformation type II, according to the classification of Pang et al. » [devneuro, " +
         "ch. 2]. Le critère est le SAC DURAL, pas la moelle, et il est de coupe TRANSVERSALE : perdu " +
         "définitivement sur un prélèvement fragmenté. perineuro ch. 38 distingue en outre le clivage " +
         "de la vraie duplication — « Histology shows the malformation is mainly splitting with only " +
         "partial duplication of the spinal cord at the lower lumbar level ». Vocabulaire NON " +
         "réconcilié entre les deux registres : diastématomyélie, diplomyélie, split cord " +
         "malformation coexistent dans la base." },

  { k:"splitCordI", l:"Split cord malformation de type I (deux sacs duraux)",
    cle:"deuxSacsDuraux", min:2,
    signes:["deuxSacsDuraux","hydromyelie","fermetureSousLesion"],
    stop:" — deux sacs duraux distincts = type I. Même réserve de coupe transversale, et même " +
         "flottement de vocabulaire que ci-dessus." },

  { k:"lesionAcquise", l:"Lésion acquise — et sa chronologie",
    cle:"caviteSansGliose", min:2,
    signes:["caviteSansGliose","rarefactionNeuronale","glioseReactionnelle","leucomalacie"],
    stop:" — l'astrocytose réactionnelle n'apparaît que vers 20-23 semaines et un tissu nécrotique " +
         "peut être résorbé sans laisser de trace gliale [devneuro, ch. 19]. Trois conséquences : " +
         "avant ~20-23 semaines l'absence de gliose ne prouve rien ; le discriminant hypoplasie / " +
         "atrophie n'est pas utilisable au 2ᵉ trimestre précoce ; une cavité sans gliose sur un fœtus " +
         "jeune reste compatible avec une lésion acquise et n'autorise PAS à conclure au malformatif. " +
         "Or « On ne note pas d'apoptose ou de gliose » apparaît dans 17 CR sur 176, dont deux sur " +
         "des fœtus de 11,8 et 17,4 SA." },

  { k:"hemorragieMatriceGerm", l:"Hémorragie de la matrice germinative — lésion bornée dans le temps",
    cle:"hemorragieMatrice", min:2,
    signes:["hemorragieMatrice","matricePersistante","leucomalacie","caviteSansGliose"],
    stop:" — la fragilité de la matrice a un substrat : ses vaisseaux ont une paroi fine, sans " +
         "adventice significative, et la tunique musculeuse lisse des artères cérébrales profondes " +
         "n'est pas constituée avant 30 SA. « La fenêtre de vulnérabilité hémorragique coïncide donc " +
         "avec la fenêtre d'existence de la matrice » : ce n'est pas un accident de tout âge. 1 seul " +
         "CR sur 176 en mentionne une — avec la réserve du § 0, c'est précisément le type de lésion " +
         "qui part dans le rapport neuropathologique différé." },

  { k:"hypoplasieOuAtrophie", l:"Petite structure — hypoplasie ou atrophie ?",
    cle:"structurePetiteBienConstruite", min:2,
    signes:["structurePetiteBienConstruite","cerveauPetit","glioseReactionnelle","rarefactionNeuronale"],
    stop:" — ce que la lame apporte de décisif et de souvent négligé : une structure petite mais bien " +
         "construite, sans gliose, n'a jamais atteint sa taille ; une structure petite avec gliose et " +
         "raréfaction neuronale a été détruite. Le corpus de livres ne donne AUCUN seuil chiffré de " +
         "microcéphalie — aucune définition en déviations standard dans les six livres — donc ne pas " +
         "en fabriquer un. Et le discriminant lui-même a une date de naissance (§ 04)." },

  { k:"retardMyelinisationInfectieux", l:"Retard de myélinisation d'origine infectieuse",
    cle:"retardMyelinisation", min:2,
    signes:["retardMyelinisation","macrophagesMyeline","glioseReactionnelle"],
    stop:" — le seul apport spécifique de la lame de cerveau au groupe TORCH (rubéole, HIV) : une " +
         "réduction d'intensité de la substance blanche attendue pour l'âge, « sans démyélinisation " +
         "active » donc « sans macrophages chargés de myéline ». Le critère différentiel est NÉGATIF, " +
         "ce qui le rend robuste — mais il suppose une coloration de myéline qui n'apparaît dans " +
         "aucun CR : « Le critère existe, la technique qui le lit n'est pas documentée dans ce " +
         "corpus. » Et la divergence LFB / IHC n'est pas tranchée (§ 08)." },

  { k:"retardMaturationStructures", l:"Retard de maturation lu sur les structures transitoires",
    cle:"matricePersistante", min:2,
    signes:["matricePersistante","granSousPialePersistante","sousPlaquePersistante",
            "laminaDissecansPersistante","dentelNonCrenele","oliveNonCrenelee"],
    stop:" — chacun de ces items porte sa propre incertitude d'unité (±2 semaines de sens inconnu) et " +
         "deux d'entre eux portent une divergence non tranchée : la lamina dissecans (32 pour ernst, " +
         "28 au vermis et 30 aux hémisphères pour perineuro) et la couche granulaire sous-piale " +
         "(30 porté par un seul terme de base, sans source livre retrouvée). Une lamina dissecans " +
         "présente à l'hémisphère et absente au vermis n'est PAS une contradiction. Et l'on ne sait " +
         "pas dire à partir de quel âge l'absence de matrice germinative devient anormale (§ 9-7) : " +
         "seule sa PERSISTANCE se coche ici." }
];

/* ── 07 · Négatifs à énoncer ──────────────────────────────────────────────────
   Le gabarit du service en fournit déjà l'ossature, étage par étage, et il est
   bon : la fiche le reprend tel quel plutôt que d'en inventer un autre. Les
   quatre derniers sont d'un autre genre — ce sont des négatifs qu'il ne faut
   PAS écrire tels quels, et ils sont ici pour qu'on ne les écrive pas. */
var NEGATIFS = [
  { k:"cortex", l:"Cortex cérébral : lamination conforme, pas d'hétérotopie, pas de dysplasie focale",
    p:"le service écrit déjà « Cortex cérébral : lamination conforme » — 22 CR sur 176 portent l'item cortex",
    ko:"lamination, hétérotopie ou dysplasie focale ANORMALE — décrire, et vérifier d'abord la fixation" },
  { k:"ngc", l:"Noyaux gris centraux : conformes",
    p:"item le plus constant du gabarit du service, 25 CR sur 176",
    ko:"noyaux gris centraux ANORMAUX" },
  { k:"commissures", l:"Commissures blanches présentes : corps calleux, capsule interne, commissure antérieure",
    p:"21 CR sur 176 portent l'item commissures, 22 le corps calleux",
    ko:"une commissure MANQUE — agénésie ou destruction secondaire, et c'est la gliose qui sépare les deux" },
  { k:"substanceBlanche",
    l:"Substance blanche sous-corticale : pas de leucomalacie, pas de cavitation, pas de macrophages chargés de myéline",
    p:"le troisième terme est le critère différentiel du retard de myélinisation infectieux, et il est négatif",
    ko:"leucomalacie, cavitation ou macrophages chargés de myéline PRÉSENTS" },
  { k:"aqueduc", l:"Mésencéphale : aqueduc perméable, pas de rosette épendymaire",
    p:"« Mésencéphale : aqueduc de taille conforme » existe déjà — il lui manque le critère microscopique",
    ko:"aqueduc non perméable ou rosettes épendymaires PRÉSENTES — substrat nommé de la sténose de l'aqueduc" },
  { k:"tronc", l:"Tronc : noyaux pontiques, pyramides, olives inférieures crénelées présentes",
    p:"protubérance 24 CR, bulbe 23 CR, olives 22 CR sur 176 — la liste est appliquée",
    ko:"un repère du tronc MANQUE ou l'olive n'est pas crénelée — la crénelation est un repère daté" },
  { k:"cervelet", l:"Cervelet : monocouche de Purkinje continue, pas d'hétérotopie PROÉMINENTE",
    p:"cervelet 23 CR, noyau dentelé 17 CR sur 176",
    ko:"Purkinje interrompue ou hétérotopie proéminente — la présence d'une hétérotopie non proéminente, elle, est normale" },
  { k:"moelle", l:"Moelle : cornes antérieures avec motoneurones en agrégats, sac dural unique, cône en regard du rachis lombaire moyen",
    p:"la moelle n'est réellement décrite que dans 2 CR sur 176, et les deux sont des myéloméningocèles",
    ko:"cornes antérieures, sac dural ou niveau du cône ANORMAUX — le sac dural est un critère de coupe transversale" },

  /* Négatifs de MATURATION — la spécificité de cet organe : ils sont datables,
     donc ils ne valent qu'accompagnés de l'âge. */
  { k:"matriceAge", l:"Matrice germinative involuée ou persistante, AVEC L'ÂGE EN REGARD",
    p:"0 CR sur 176 nomme la matrice germinative, alors que c'est le repère de datation le plus robuste",
    ko:"état de la matrice noté SANS l'âge en regard — et l'on ne sait pas dire à partir de quel âge son absence est anormale" },
  { k:"laminaDeuxEtages", l:"Lamina dissecans notée au vermis ET à l'hémisphère SÉPARÉMENT",
    p:"la disparition n'est pas synchrone entre les deux étages",
    ko:"un seul étage noté — présente à l'hémisphère et absente au vermis est la SÉQUENCE NORMALE, pas une contradiction" },
  { k:"granSousPiale", l:"Couche granulaire sous-piale : présente ou disparue",
    p:"date portée par un seul terme de base, sans source livre retrouvée (§ 9-26)",
    ko:"couche granulaire sous-piale non notée, ou persistante après 30" },
  { k:"sousPlaque", l:"Sous-plaque : présente ou dissipée",
    p:"présente de 14-17 à environ 35, sa dissipation est concomitante de la gyrification secondaire",
    ko:"sous-plaque non notée, ou persistante — ses cellules résiduelles miment une hétérotopie de substance blanche" },

  /* Les quatre à NE PAS écrire tels quels. */
  { k:"gliose", l:"Gliose : négatif énoncé AVEC l'âge, ou pas énoncé",
    p:"« On ne note pas d'apoptose ou de gliose » apparaît dans 17 CR sur 176, dont deux sur des fœtus de 11,8 et 17,4 SA",
    ko:"négatif de gliose posé — avant 20 SA il est VIDE : formuler « pas de gliose ; non interprétable à cet âge »" },
  { k:"heterotopieCereb", l:"Hétérotopie cérébelleuse : négatif portant sur le caractère PROÉMINENT",
    p:"sa présence est normale chez plus d'un nourrisson sur deux",
    ko:"« Pas d'hétérotopie cérébelleuse » écrit comme critère de normalité — ce n'est pas un critère" },
  { k:"myeline", l:"Myélinisation : affirmée seulement si une coloration de myéline a été faite",
    p:"LFB, Luxol, Loyez, MBP, PLP sortent à ZÉRO CR sur 176",
    ko:"« Myélinisation conforme » sans coloration de myéline — l'affirmation n'est pas soutenue par le geste" },
  { k:"glieRadiaire", l:"Glie radiaire : jamais utilisée comme argument de maturité",
    p:"elle persiste normalement jusqu'au terme, dans le raphé dorsal",
    ko:"« Pas de glie radiaire » invoqué comme argument — son absence n'est jamais un argument de maturité" },

  { k:"renvoiNeuropath", l:"Renvoi au compte rendu de neuropathologie : oui ou non, écrit",
    p:"7 CR sur 8 renvoient l'examen à plus tard, ce qui fait de tout chiffre de corpus un plancher",
    ko:"renvoi non tracé — le rendre explicite transforme un silence en donnée" }
];

/* ── 08 · Techniques ──────────────────────────────────────────────────────────
   Trois blocs dans la fiche : ce qui est prescrit ET pratiqué, ce qui est
   prescrit et ABSENT du corpus de CR, et ce qui se décide à l'autopsie. Le
   deuxième bloc contient l'écart de rendement le moins cher de la fiche. */
var TECHNIQUES = [
  { k:"fixationZinc", l:"Fixation formol zinc, en suspension par l'artère basilaire, 2 à 4 semaines",
    q:"la prescription de fixation la plus détaillée de tout le corpus, et elle est spécifique de cet organe" },
  { k:"he", l:"HE",
    q:"porte l'essentiel du § 03 et du § 06 : crénelations, structures transitoires, lamination" },
  { k:"pas", l:"PAS / PASD",
    q:"matériel de surcharge — 84 CR sur 176, la moitié de la parade est déjà en place" },
  { k:"ferColloidal", l:"Fer colloïdal",
    q:"complément du PAS pour les mucopolysaccharides et la glycogénose de type IV — 0 CR" },
  { k:"cd68", l:"CD68 / CD163",
    q:"composante microgliale, forme périnatale léthale de Gaucher — 25 CR sur 176, déjà au catalogue" },
  { k:"gfap", l:"GFAP",
    q:"parade explicite au faux positif de tissu cérébral déplacé — 2 CR sur 176 : écart de rendement le moins cher de la fiche" },
  { k:"cd56", l:"CD56",
    q:"seconde parade nommée par ernst au même faux positif" },
  { k:"lfb", l:"LFB ou Loyez — DIVERGENCE NON tranchée, ne pas commander à l'aveugle",
    q:"soffoet ch. 11 prescrit « Sa visualisation se fait par les techniques de Luxol fast blue ou de Loyez » ; ernst ch. 29 dit que « standard histochemical stains for myelin are not very useful for detecting the small amounts of immature myelin in the fetal central nervous system, and immunohistochemistry is preferred ». « Un livre prescrit le LFB, l'autre dit que le LFB ne marche pas sur le fœtus. » 0 CR sur 176 pour l'une comme pour l'autre" },
  { k:"ihcMyeline", l:"IHC MBP / PLP — l'autre branche de la même divergence",
    q:"c'est la question la plus actionnable de la fiche, et elle se tranche AVANT toute commande — 0 CR sur 176" },
  { k:"neurofilament", l:"Neurofilament", q:"0 CR sur 176" },
  { k:"s100", l:"S100", q:"0 CR sur 176" },
  { k:"argentique", l:"Bielschowsky / Bodian", q:"0 CR sur 176" },
  { k:"cresyl", l:"Crésyl violet", q:"0 CR sur 176" },
  { k:"congelation", l:"Congélation d'un fragment — se décide À L'AUTOPSIE",
    q:"le glycogène EXIGE du congelé : sans lui, la glycogénose n'est plus démontrable en tant que telle" },
  { k:"pigmentIctere", l:"Recherche du pigment d'ictère nucléaire — se décide AVANT fixation",
    q:"le pigment est détruit par la fixation formolée : quand la question se pose sur la lame, il est déjà trop tard" }
];

function suggerer(){
  var s = {};
  function anormal(k){ return E.signes[k] === "anormal"; }
  function ret(k){ return E.retention[k] === "present"; }
  var sa = num("sa");

  /* Le faux positif du tissu cérébral déplacé a DEUX parades nommées, et elles
     sont au catalogue du service : c'est le meilleur rapport de la fiche. */
  if (ret("massesRacines") || ret("tissuViscere")){ s.gfap = 1; s.cd56 = 1; }
  if (ret("liquefaction") && !E.prelev.duremere) s.fixationZinc = 1;

  if (anormal("neuroneBallonise") || anormal("pasdPositif")){ s.pas = 1; s.ferColloidal = 1; }
  if (anormal("cellulesGaucher") || anormal("neuronophagie")){ s.cd68 = 1; s.pas = 1; }
  if (anormal("perteNeuronaleNGC") || anormal("necroseLaminaire")) s.cd68 = 1;
  if (anormal("glioseReactionnelle") || anormal("caviteSansGliose") ||
      anormal("leucomalacie") || anormal("rarefactionNeuronale")) s.gfap = 1;
  if (anormal("heterotopieSubstanceBlanche") || anormal("heterotopiesNodulairesProfondes") ||
      anormal("surmigrationPie")) s.neurofilament = 1;
  if (anormal("perteCornesAnterieures") || anormal("chromatolyseMotoneurones") ||
      anormal("ballonisationMotoneurone")){ s.cresyl = 1; s.argentique = 1; }
  if (anormal("activationMicrogliale")) s.cd68 = 1;
  if (anormal("purkinjeInterrompue") || anormal("dysplasieCerebelleuseExtensive")) s.s100 = 1;
  if (anormal("hemorragieMatrice")) s.gfap = 1;

  /* La boîte à outils de la myéline reste BARRÉE : la proposer serait prescrire
     une coloration que le service ne fait pas, et ouvrir un champ vide. */
  if (anormal("retardMyelinisation") || anormal("macrophagesMyeline")){ s.lfb = 1; s.ihcMyeline = 1; }
  if (E.negatifs.myeline === "present"){ s.lfb = 1; s.ihcMyeline = 1; }

  /* Les deux gestes irrattrapables : ils ne se suggèrent utilement qu'AVANT. */
  if ((anormal("neuroneBallonise") || anormal("pasdPositif")) && !E.prelev.congele) s.congelation = 1;
  if (sa != null && sa >= 34 && !E.prelev.pigmentIct) s.pigmentIctere = 1;
  if (!E.prelev.basilaire) s.fixationZinc = 1;
  s.he = 1;
  return s;
}

/* ── Banc propre à l'organe ───────────────────────────────────────────────── */
async function testsOrgane(chk, clic, set, crTient, pause){
  /* Le banc commun laisse des signes posés et tous les négatifs à « absent » :
     on part d'un état voulu, pas d'un état supposé. */
  function pose(k, v){ if (E.signes[k] !== v) clic("les", k, v); }
  function ote(k){ if (E.signes[k]) clic("les", k, E.signes[k]); }
  function propre(){ SIGNES.forEach(function(x){ ote(x.k); }); }
  function tenue(k){ return associations().some(function(a){ return a.d.k === k && a.tenu; }); }
  function lue(k){ return associations().some(function(a){ return a.d.k === k; }); }
  function niveau(k){ if (E.mesure.def !== k) clic("mdef", k); }
  function gyre(k){ if (E.mesure.opt !== k) clic("mopt", k); }
  function neg(k, v){ if (E.negatifs[k] !== v) clic("neg", k, v); }

  chk("aucune latéralité sur cet organe", PAIR === false);
  propre();

  /* ── Le § 2 est inversé : la macération ne ferme pas la lame ────────────── */
  clic("ret", "liquefaction", "present");
  chk("un cerveau liquéfié n'est pas un cerveau perdu",
      crTient("may demonstrate interpretable histology"));
  chk("aucune borne recevable sur un prédicteur mauvais seul",
      crTient("Seuls des prédicteurs MAUVAIS sont positifs"));
  clic("ret", "liquefaction", "present");

  clic("ret", "neuroneCortical", "present");
  chk("le service date par le neurone cortical", crTient("Rétention ≥ 8 semaines"));
  chk("le cerveau n'a aucun rang dans les deux tables", crTient("AUCUN rang dans la séquence de macération"));
  chk("la borne de 8 semaines est donnée pour non sourcée",
      par(RETENTION, "neuroneCortical").note.indexOf("n'est retrouvée dans AUCUN livre") >= 0);
  chk("ernst ne va pas au-delà de 2 à 4 semaines",
      par(RETENTION, "neuroneCortical").note.indexOf("between 2 and 4 weeks") >= 0);
  clic("ret", "neuroneCortical", "present");

  clic("ret", "caryolyse", "present");
  chk("la caryolyse n'est pas un chronomètre", crTient("orientée à l'ENVERS de la source"));
  clic("ret", "caryolyse", "present");

  chk("la gyration conservée n'est pas une borne de rétention",
      par(RETENTION, "gyrationConservee").note.indexOf("c'est la GYRATION qui date, pas la cytologie") >= 0);

  /* Le faux positif du tissu déplacé a deux parades, et elles sont au catalogue. */
  clic("ret", "massesRacines", "present");
  chk("le tissu déplacé mime un neuroblastome", crTient("should not be mistaken for a neurogenic neoplasm"));
  chk("GFAP proposé", suggerer().gfap === 1);
  chk("CD56 proposé", suggerer().cd56 === 1);
  clic("ret", "massesRacines", "present");
  chk("le piège n'est pas confiné à la lame de cerveau",
      par(RETENTION, "tissuViscere").note.indexOf("vascularisation du foie") >= 0);

  /* ── La date de naissance de la gliose ──────────────────────────────────── */
  set("sa", "17");
  chk("avant 20 SA le négatif de gliose est vide", crTient("Le négatif n'est pas faux, il est VIDE"));
  chk("la formulation de repli est donnée", crTient("non interprétable à cet âge"));
  chk("le discriminant hypoplasie/atrophie tombe avec elle",
      crTient("Le discriminant hypoplasie/atrophie n'est pas utilisable ici non plus"));
  set("sa", "30");
  chk("au-delà de 20 SA la réserve tombe", !crTient("Le négatif n'est pas faux, il est VIDE"));

  /* ── Niveaux médullaires : ce qui décide de ce que la moelle peut conclure ─ */
  niveau("aucun");
  chk("sans niveau, cornes antérieures normales ne veut rien dire",
      crTient("AUCUN NIVEAU MÉDULLAIRE PRÉLEVÉ"));
  chk("le repli thalamique est rappelé", crTient("when the spinal cord is unavailable for examination"));
  niveau("aucun"); niveau("fragmentee");
  chk("moelle fragmentée : le critère de Pang est perdu", crTient("le critère de Pang est perdu, définitivement"));
  chk("le critère est le sac dural, pas la moelle", crTient("Le critère est le SAC DURAL"));
  niveau("fragmentee"); niveau("unSeul");
  chk("un seul niveau ne conclut pas à une atteinte diffuse", crTient("ATTEINTE DIFFUSE"));
  niveau("unSeul"); niveau("trois");
  chk("trois niveaux : le geste est connu du service", crTient("cervical, distal, lombaire"));

  /* ── Gyration : le seul repère qui survive à la macération ───────────────── */
  gyre("dysharmonieuse");
  chk("le retard dysharmonieux oriente vers la formation corticale", crTient("DYSHARMONIEUX"));
  gyre("dysharmonieuse"); gyre("harmonieuse");
  chk("le retard harmonieux ne dit pas la même chose", crTient("petite taille constitutionnelle"));
  chk("les repères gyraux divergent sans biais constant", crTient("ce n'est pas un biais"));
  chk("le seuil d'alerte est le stade, pas la semaine", crTient("le seuil d'alerte n'est pas la semaine"));

  /* ── La seule épaisseur chiffrée de la fiche, et elle est en CELLULES ────── */
  set("m_egl", "7");
  chk("compte conforme entre 20 et 30 SA", crTient("Compte conforme"));
  set("sa", "36");
  chk("hors fenêtre, le compte ne s'interprète pas", crTient("HORS DE LA FENÊTRE 20–30 SA"));
  set("sa", "26");
  set("m_egl", "3");
  chk("compte sous la fourchette", crTient("Compte SOUS la fourchette"));
  set("m_egl", "");
  chk("aucun autre chiffre proposé", MESURE.champs.length === 1);
  chk("aucun poids cérébral dans la grille",
      JSON.stringify(MESURE).toLowerCase().indexOf("poids") < 0);
  chk("aucune épaisseur corticale en mm",
      MESURE.champs.every(function(c){ return c.label.indexOf(" mm") < 0; }));

  /* ── Le faux positif le mieux quantifié de la série ──────────────────────── */
  propre();
  pose("heterotopieCerebelleuseProeminente", "anormal");
  chk("une hétérotopie cérébelleuse seule ne tient pas",
      !tenue("heterotopieCerebelleuseLue") && lue("heterotopieCerebelleuseLue"));
  chk("plus d'un nourrisson normal sur deux en porte",
      crTient("présente chez plus d'un nourrisson normal sur deux"));
  pose("vermisAplasieFusion", "anormal"); pose("purkinjeInterrompue", "anormal");
  chk("proéminente ET associée, elle se lit", tenue("heterotopieCerebelleuseLue"));
  chk("le rhombencéphalosynapsis se lit en même temps", tenue("rhombencephalosynapsis"));
  chk("et il est de coupe frontale", par(SIGNES, "vermisAplasieFusion").meta.indexOf("FRONTALE") >= 0);

  /* ── Migration : le seul endroit où l'histologie tranche ─────────────────── */
  propre();
  pose("corticalHyperconvolute", "anormal"); pose("laminationNormaleSousGyri", "anormal");
  chk("un cortex hyperconvoluté à lamination normale est une polygyrie",
      tenue("polygyrieHydrocephalie"));
  chk("ce n'est pas une lissencéphalie de type II", !tenue("lissencephalieII"));
  propre();
  pose("espaceSousArachnoidienOblitere", "anormal"); pose("vaguesAmasNeuronaux", "anormal");
  chk("les trois critères de coupe tiennent le type II", tenue("lissencephalieII"));
  chk("le cortex inversé reste un phénotype de souris",
      par(DIAGS, "lissencephalieII").stop.indexOf("phénotype de souris") >= 0);

  /* ── Surcharge : la famille, jamais la maladie ───────────────────────────── */
  propre();
  pose("neuroneBallonise", "anormal");
  chk("un seul signe suffit à poser la FAMILLE", tenue("surchargeNonTypable"));
  chk("et il ne nomme aucune maladie", crTient("maladie non typable sur la lame"));
  chk("aucune maladie de surcharge n'est nommée par une association",
      !tenue("gaucher"));
  chk("le PAS est proposé", suggerer().pas === 1);
  chk("le congelé est proposé tant qu'il n'est pas coché", suggerer().congelation === 1);
  pose("cellulesGaucher", "anormal"); pose("neuronophagie", "anormal");
  chk("la seule exception documentée se lit", tenue("gaucher"));
  chk("le CD68 est déjà au catalogue du service", suggerer().cd68 === 1);

  /* ── Motoneurone : le diagnostic se fait à la moelle, pas au muscle ──────── */
  propre();
  pose("perteCornesAnterieures", "anormal"); pose("chromatolyseMotoneurones", "anormal");
  chk("l'atteinte du motoneurone se lit sur la moelle", tenue("motoneuroneMedullaire"));
  chk("la divergence de la fiche muscle est déplacée, pas tranchée",
      crTient("le diagnostic se fait à la moelle, pas au muscle"));
  propre();
  pose("chromatolyseThalamique", "anormal"); pose("gangliRachidiensChromatolyse", "anormal");
  chk("le repli thalamique tient sans la moelle", tenue("repliThalamique"));
  chk("la coupe thalamique est déjà dans le prélèvement standard",
      par(DIAGS, "repliThalamique").stop.indexOf("prélèvement sus-tentoriel standard") >= 0);

  /* ── Moelle fendue : deux types, un seul critère ─────────────────────────── */
  propre();
  pose("deuxHemiMoellesUnSac", "anormal"); pose("hydromyelie", "anormal");
  chk("un seul sac dural : type II", tenue("splitCordII"));
  chk("et pas le type I", !tenue("splitCordI"));
  chk("le vocabulaire n'est pas réconcilié",
      par(DIAGS, "splitCordII").stop.indexOf("Vocabulaire NON") >= 0);

  /* ── Lésion acquise et sa chronologie ────────────────────────────────────── */
  propre();
  set("sa", "17");
  pose("caviteSansGliose", "anormal"); pose("rarefactionNeuronale", "anormal");
  chk("une cavité sans gliose reste compatible avec l'acquis", tenue("lesionAcquise"));
  chk("17 CR sur 176 écrivent le négatif vide",
      par(DIAGS, "lesionAcquise").stop.indexOf("17 CR sur 176") >= 0);
  neg("gliose", "present");
  chk("le négatif de gliose posé sort en défaut", crTient("avant 20 SA il est VIDE"));
  neg("gliose", "absent");
  set("sa", "30");

  /* ── Hémorragie de la matrice : une lésion bornée dans le temps ──────────── */
  propre();
  pose("hemorragieMatrice", "anormal"); pose("matricePersistante", "anormal");
  chk("l'hémorragie de matrice se lit avec sa fenêtre", tenue("hemorragieMatriceGerm"));
  chk("la fenêtre hémorragique est celle de la matrice",
      crTient("La fenêtre de vulnérabilité hémorragique coïncide"));

  /* ── Myéline : le critère existe, la technique n'est pas documentée ──────── */
  propre();
  pose("retardMyelinisation", "anormal"); pose("macrophagesMyeline", "anormal");
  chk("le retard de myélinisation se lit", tenue("retardMyelinisationInfectieux"));
  chk("le critère différentiel est négatif", crTient("sans macrophages chargés de myéline"));
  chk("la divergence LFB / IHC est portée dans les deux sens",
      suggerer().lfb === 1 && suggerer().ihcMyeline === 1 &&
      par(TECHNIQUES, "lfb").l.indexOf("DIVERGENCE NON tranchée") >= 0);

  /* ── Divergences portées, jamais arbitrées ───────────────────────────────── */
  chk("divergence corticale 20-22 contre 24 portée",
      par(STADES, "dentelCrenele").note.indexOf("DIVERGENCE NON") >= 0);
  chk("divergence de la lamina dissecans portée",
      par(STADES, "sixCouches").note.indexOf("DIVERGENCE NON") >= 0);
  chk("les deux fenêtres de la matrice ne sont pas confondues",
      par(STADES, "matriceInvolution").note.indexOf("Épaisseur et prolifération ne culminent pas") >= 0);
  chk("l'incertitude d'unité pèse sur toute avance", AVANCE_NOTE.indexOf("problème d'UNITÉ") >= 0);

  /* ── Ce que la fiche ne donne pas n'est pas comblé ───────────────────────── */
  chk("aucun seuil de microcéphalie chiffré",
      SIGNES.concat(DIAGS).every(function(x){
        return !/[-−]\s*\d+([,.]\d+)?\s*(DS|SD)\b/.test(JSON.stringify(x)); }));
  chk("aucune densité neuronale chiffrée",
      JSON.stringify(SIGNES).indexOf("neurones/mm") < 0);
  chk("aucun grade cérébral inventé",
      SIGNES.concat(DIAGS).every(function(x){ return !/grade/i.test(x.l); }));
  chk("aucune borne horaire ajoutée aux deux existantes",
      RETENTION.filter(function(r){ return r.h > 0; }).length === 1);
  chk("la neuropathologie détaillée reste à son module",
      par(SIGNES, "neuropathDiffere").meta.indexOf("plancher") >= 0);

  propre();
  niveau("trois"); gyre("conforme");
  set("sa", "30");
}
