/* Grille de lecture — cerveau et moelle épinière. VERSION 2 (2.0.0).
   Migration de cerveau_moelle.js (1.0.1, normal / anormal, négatifs cochés) sur
   le patron rein 3.5 / poumon 2.1 : mode présence, termes FOETO fondus dans les
   signes et branchés (termes tagués “verbatim”), blocs lus en §02, ordre de
   lecture (LECTURE). La v1 reste publiée à côté tant que la v2 n'a pas été
   validée à l'usage.
   Fond : ~/Bureau/fiches_lecture/fiche_cerveau_moelle.md (§1 à §9).
   Les divergences entre sources sont PORTÉES dans les champs, jamais arbitrées.

   La neuropathologie détaillée a son propre module (neuropath.html) : cette grille
   ne porte que ce que la fiche porte, et rien d'autre. Rien n'en est importé.

   Ce que la v2 change, sans rien retrancher de la v1 :
   · un signe est un CONSTAT, présent / absent / non regardé ; les 54 signes de la
     v1 sont là (deux fondus en un, un renommé : voir plus bas), 65 en tout.
     Les 32 constats de la fiche tagués dans FOETO ont chacun leur
     signe : 24 étaient déjà dans la v1, 8 entrent (amas de la zone
     sous-ventriculaire externe, hétérotopie striée, cortex inversé, gyration
     moins développée, gyration simplifiée, clivage médullaire, noyaux moteurs
     bulbaires, colonne de Clarke). Un signe branché prend son libellé dans FOETO ;
     quand le libellé v1 était plus précis, sa précision passe dans meta. La
     gyration moins développée ne se clique pas : elle se déduit de la gyration
     déclarée en Maturation (retard harmonieux ou dysharmonieux) ;
   · la ballonisation et la chromatolyse des motoneurones, deux lignes en v1,
     n'en font plus qu'une : FOETO les porte en un seul terme (CLA-199) ;
   · les nouveaux signes rejoignent les associations que la fiche leur donne :
     hétérotopie striée et amas de la zone sous-ventriculaire externe à la
     lissencéphalie de type II (surmigration cobblestone, devneuro ch. 4), noyaux
     moteurs bulbaires et colonne de Clarke à l'atteinte du motoneurone (devneuro
     ch. 39), clivage médullaire aux deux split cord. 16 associations sur 20
     affichent le terme FOETO de leur maladie (fv), jamais exporté ;
   · les signes sont rangés en CADRES, dans l'ordre de lecture, chacun avec son
     grossissement (mag, savoir de pratique [expérience], à valider à l'usage) ;
     ce qui ne se lit pas sur la lame (macro, clinique, renvoi au CR de
     neuropathologie) sort dans “Contexte hors lame”, avant la rétention ;
   · les 17 négatifs de la v1 ne se cochent plus : ils se DÉDUISENT des signes
     répondus (ou d'une donnée consignée : terme, technique, prélèvement). Pour que
     deux négatifs d'étage ne disent pas plus que ce qui a été répondu, deux signes
     entrent : capsule interne ou commissure antérieure absente, noyaux pontiques
     ou pyramides absents. Pour que la lamina dissecans soit notée par étage, deux
     observations entrent (vermis, hémisphère), hors du “Non” en bloc ;
   · les variantes normales vivent dans le cadre qu'elles miment et ne passent au
     CR qu'en parenthèse ;
   · le prélèvement sépare ce qui qualifie la lecture des gestes de l'autopsie
     (destinés à la grille macro fixée) ;
   · coneHaut devient coneNiveau : la v1 écrivait “au-dessus” du rachis
     lombaire moyen après 27 SA, ce qui inverse le repère d'ernst ch. 29 (la moelle
     ne descend plus que jusqu'au rachis lombaire moyen à 27 semaines) et convertit
     en SA une semaine qu'ernst ne définit pas ; le libellé suit le verbatim :
     plus bas que le rachis lombaire moyen, au-delà de 27 semaines [non convertible] ;
   · corrigés contre verbatim (2.0.0, relecture) : l'association du retard de
     myélinisation infectieux lit l'ABSENCE de macrophages chargés de myéline
     (signe reformulé) ; pivot de la sténose de l'aqueduc sur l'aqueduc rétréci ;
     repli thalamique tenu sur la chromatolyse thalamique seule ; couche granuleuse
     externe sous 6 cellules consignée sans alerte (6 à 9 est un maximum) ; négatif
     du tronc borné : olives crénelées au 3ᵉ trimestre ;
   · les guillemets français ne portent plus que des citations de livre ; les
     phrases du corpus de CR et de la fiche elle-même passent entre “ ”.
   Rien d'autre n'est retranché : rétention, stades, mesure (niveaux médullaires,
   gyration, couche granuleuse externe), techniques et associations sont repris.

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
var VERSION = "2.0.0";
var SCHEMA  = "0.3.0";   /* 0.3.0 : signes present/absent, négatifs déduits */
var ETATS   = "presence";
var FOETO_DANS_SIGNES = true;
var BLOCS   = true;
var LECTURE = true;   /* cadres (CADRES), grossissement (mag), variantes dans leur cadre */

/* Le cerveau n'est pas un organe pair au sens du prélèvement. Ce qui compte ici
   n'est pas un côté mais un NIVEAU — niveaux médullaires prélevés, vermis contre
   hémisphère cérébelleux — et le niveau se déclare en Maturation, où il
   conditionne ce que la lame peut conclure. */
var PAIR = false;

/* Une étendue (focale, multifocale, diffuse) n'a pas de sens pour une structure
   transitoire ni pour une malformation du tube neural. */
var GROUPES_SANS_ETENDUE = ["Structures transitoires — maturation", "Tube neural et moelle — fermeture, clivage"];

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
                  "se déforme à la coupe), et la gyration en Maturation — c'est le seul repère qui " +
                  "survive à la macération. Un retard HARMONIEUX et un retard DYSHARMONIEUX ne se " +
                  "lisent pas pareil.";

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

/* ── 02 · Prélèvement ─────────────────────────────────────────────────────── */
/* Contrairement aux quatorze autres organes, le service n'est pas ici en défaut
   de protocole : il en a un, et c'est le plus structuré de la série. Ce qui suit
   ajoute au gabarit du service ce que les livres exigent et qu'il n'écrit pas.
   v2 : ce qui qualifie la lecture d'abord, les gestes de l'autopsie ensuite. */
var PRELEV = [
  { k:"encephalePreleve", g:"Qualifie la lecture", l:"Encéphale prélevé, même liquéfié", grave:true,
    manque:"deux CR renoncent — “Aucun prélèvement d'encéphale n'a pu être réalisé” et “Examen " +
           "neuropathologique impossible en raison des altérations post-mortem” [corpus CR] — " +
           "deux renoncements que les livres ne soutiennent PAS : un cerveau liquéfié n'est pas un " +
           "cerveau perdu (§ 2)" },
  { k:"etages", g:"Qualifie la lecture", l:"Les deux étages échantillonnés : sous-tentoriel et sus-tentoriel",
    manque:"le gabarit du service porte neuf items constants d'un CR à l'autre (noyaux gris centraux 25, " +
           "protubérance 24, cervelet 23, bulbe 23, cortex 22, olives 22, corps calleux 22, commissures 21, " +
           "noyau dentelé 17) — la cohérence de ces neuf nombres est la preuve d'une liste appliquée" },
  { k:"hippocampe", g:"Qualifie la lecture", l:"Hippocampe sur la coupe", grave:true,
    manque:"0 CR sur 176 nomme l'hippocampe ou la corne d'Ammon [corpus CR] — c'est le siège du " +
           "subiculum, donc de la nécrose pontosubiculaire, « observed in 40% of brains from " +
           "stillbirths » [keeling, ch. 15] : le gabarit examine la protubérance sans jamais examiner " +
           "l'autre moitié de la lésion" },
  { k:"matriceGerm", g:"Qualifie la lecture", l:"Matrice germinative périventriculaire sur la coupe", grave:true,
    manque:"0 CR sur 176 la nomme [corpus CR] — c'est à la fois le repère de datation le plus robuste " +
           "de la lame et le siège de l'hémorragie du prématuré" },
  { k:"thalamus", g:"Qualifie la lecture", l:"Coupe thalamique",
    manque:"la chromatolyse thalamique est « a useful diagnostic pointer when the spinal cord is " +
           "unavailable for examination » [devneuro, ch. 39] — et la coupe thalamique fait déjà partie " +
           "du prélèvement sus-tentoriel standard" },
  { k:"moelleNiveaux", g:"Qualifie la lecture", l:"Moelle prélevée sur trois niveaux : cervical, distal, lombaire", grave:true,
    manque:"soffoet ch. 22 conditionne le diagnostic des formes neurogènes d'akinésie à une étude " +
           "« sur les niveaux : cervical, distal et lombaire » — la moelle n'est prélevée par niveaux " +
           "que dans 1 CR sur 176 [corpus CR]" },
  { k:"moelleOrientee", g:"Qualifie la lecture", l:"Moelle orientée, coupes TRANSVERSALES, sac dural inclus", grave:true,
    manque:"le critère de Pang (type I ou II) repose sur le nombre de sacs duraux en coupe " +
           "transversale : une moelle prélevée en fragments non orientés perd le critère, " +
           "définitivement" },
  { k:"renvoiNeuro", g:"Qualifie la lecture", l:"Renvoi au compte rendu de neuropathologie tracé",
    manque:"7 CR sur 8 renvoient l'examen à plus tard — “Examen neuropathologique transmis " +
           "ultérieurement si anormal” [corpus CR] : le rendre explicite transforme un silence en " +
           "donnée" },
  { k:"basilaire", g:"Gestes de l'autopsie — iront à la grille macro fixée",
    l:"Fixation en suspension par l'artère basilaire, formol zinc, 2 à 4 semaines", grave:true,
    manque:"« Fixation du cerveau en suspension par l'artère basilaire (afin d'éviter les " +
           "déformations artéfactielles) dans un mélange formol zinc » [soffoet, ch. 11] — " +
           "un cerveau insuffisamment fixé se déforme à la coupe et les déformations miment des " +
           "anomalies de forme" },
  { k:"duremere", g:"Gestes de l'autopsie — iront à la grille macro fixée",
    l:"Sur fœtus macéré : encéphale retiré DANS sa dure-mère, formol 20 %",
    manque:"« Removal of the brain in its dura and adequate fixation in 20% formalin may greatly " +
           "increase the yield of examination of the brain in advanced maceration » [keeling, ch. 15] — " +
           "prescription distincte de la précédente, elle ne la contredit pas : l'une vise le cerveau " +
           "frais, l'autre le cerveau macéré. Écrire les deux" },
  { k:"hypophyse", g:"Gestes de l'autopsie — iront à la grille macro fixée", l:"Adénohypophyse prélevée",
    manque:"soffoet ch. 11 la prescrit « en cas d'écart de croissance fœtale, d'hypoplasie surrénale » " +
           "et dans les malformations cérébrales, anencéphalies et neuro-dégénération comprises" },
  { k:"yeux", g:"Gestes de l'autopsie — iront à la grille macro fixée",
    l:"Yeux prélevés dans les syndromes polymalformatifs impliquant le cerveau",
    manque:"soffoet ch. 11 cite nommément la lissencéphalie de type II" },
  { k:"congele", g:"Gestes de l'autopsie — iront à la grille macro fixée", l:"Fragment congelé", grave:true,
    manque:"geste irrattrapable — le glycogène EXIGE du congelé : sans lui, la glycogénose n'est plus " +
           "démontrable en tant que telle" },
  { k:"pigmentIct", g:"Gestes de l'autopsie — iront à la grille macro fixée",
    l:"Recherche du pigment d'ictère nucléaire décidée AVANT fixation", grave:true,
    manque:"geste irrattrapable — le pigment de l'ictère nucléaire est détruit par la fixation " +
           "formolée : quand la question se pose sur la lame, il est déjà trop tard" }
];

/* ── 03 · Rétention ───────────────────────────────────────────────────────────
   Ce § inverse le postulat des quatorze autres fiches. Sur le cerveau, la
   destruction macroscopique est maximale ET la lisibilité histologique persiste :
   « the nuclear detail can persist even in extremely macerated brain tissue »
   [ernst, ch. 37]. La datation MACROSCOPIQUE résiste donc mieux que la datation
   cytologique, ce qui est l'exact contraire du gabarit habituel.
   En présence, les deux critères datables (rétention 0, neurone cortical) sont
   dans la liste déroulante ; les non datables se signalent à part. */

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
         "du service est soutenue par le corpus de référence. Mais la borne “au moins 8 semaines de " +
         "rétention” [corpus CR] n'est retrouvée dans AUCUN livre (§ 9-16) : ernst ch. 37 dit au " +
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
         "l'inverse : sur un fœtus macéré, c'est la GYRATION qui date, pas la cytologie (Maturation)" },

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

/* ── 04 · Maturation ──────────────────────────────────────────────────────────
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

/* ── 04 bis · Niveau médullaire, gyration, couche granuleuse externe ───────────
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
  defLabel:"niveaux médullaires — sans eux, “cornes antérieures normales” ne veut rien dire",
  optLabel:"gyration — le seul repère qui survive à la macération",
  defs:NIVEAUX, opts:GYRATION,
  champs:[{ id:"egl", label:"Couche granuleuse externe cérébelleuse (nombre de cellules)",
            min:0, max:20, step:1 }]
};

function verdictMesure(){
  var niv = E.mesure.def, gyr = E.mesure.opt, n = E.mesure.v.egl, sa = num("sa");

  /* Le piège le plus important de la fiche : l'astrocytose réactionnelle
     n'apparaît que vers 20-23 semaines, et un tissu nécrotique peut être résorbé
     sans laisser de trace gliale. Avant 20 SA, “pas de gliose” n'est pas faux :
     il est VIDE. 17 CR sur 176 l'écrivent, dont au moins deux sur des fœtus de
     11,8 et 17,4 SA. En présence : la gliose répondue absente, ou une cavité sans
     gliose répondue présente. */
  var glioseVide = sa != null && sa < 20 &&
    (E.signes.glioseReactionnelle === NEG || E.signes.caviteSansGliose === POS);

  if (!niv && !gyr && n == null && !glioseVide)
    return { cls:"", txt:"Ni niveau médullaire, ni gyration, ni compte de la couche granuleuse " +
                         "externe — l'axe propre à l'organe n'est pas ouvert." };

  var t = [], cls = "ok", res = [];

  /* 1 · Le niveau médullaire, qui décide de ce que la moelle peut conclure. */
  if (!niv)
    res.push("niveau médullaire NON déclaré — sans lui, “cornes antérieures normales” ne veut rien dire");
  else if (niv === "aucun"){
    cls = "bad";
    t.push("AUCUN NIVEAU MÉDULLAIRE PRÉLEVÉ : “cornes antérieures normales” ne veut rien dire, et " +
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
      /* 6 à 9 est l'épaisseur MAXIMALE atteinte entre 20 et 30 (§ 3.4), pas un plancher :
         sous 6, le compte se consigne sans alerte. */
      if (n < 6) t.push("Compte sous 6 cellules — la source donne 6 à 9 comme épaisseur MAXIMALE atteinte " +
                        "entre 20 et 30, pas comme plancher : le compte se consigne, il ne s'interprète pas.");
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
           "reste compatible avec une lésion acquise. Formuler : “pas de gliose ; non interprétable " +
           "à cet âge”. Le discriminant hypoplasie/atrophie n'est pas utilisable ici non plus.");
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

/* ── Variantes normales — chacune dans le cadre dont elle MIME un signe ──────
   Le § 8.3 de la fiche est presque entièrement fait de faux positifs de
   maturation : des structures NORMALES à leur âge, qui miment une lésion. La
   première d'entre elles est le faux positif le mieux quantifié de toute la
   série des quinze fiches. */
var VARIANTES = [
  { k:"heterotopieCerebelleuse", g:"Fosse postérieure — cervelet, aqueduc, tronc",
    l:"Hétérotopie cérébelleuse non proéminente, isolée, sans contexte syndromique" },
  { k:"grandsNeuronesInterstitiels", g:"Cortex — migration, lamination, ligne médiane",
    l:"Grands neurones interstitiels de la substance blanche — résidus probables de la sous-plaque" },
  { k:"statusVerrucosus", g:"Cortex — migration, lamination, ligne médiane",
    l:"Status verrucosus simplex, papilles de Retzius — avant 24 SA" },
  { k:"sillonCentralIrregulier", g:"Cortex — migration, lamination, ligne médiane",
    l:"Irrégularités du sillon central à 21 — formation précoce du sillon" },
  { k:"cajalRetzius", g:"Cortex — migration, lamination, ligne médiane",
    l:"Neurones de Cajal-Retzius sous-piaux bien visibles en HE" },
  { k:"glieRadiaire", g:"Structures transitoires — maturation",
    l:"Glie radiaire du raphé dorsal — persiste NORMALEMENT jusqu'au terme" },
  { k:"eglResiduelle", g:"Structures transitoires — maturation",
    l:"Couche granuleuse externe cérébelleuse résiduelle au terme" },
  { k:"neuronesImmaturesCA1", g:"Structures transitoires — maturation",
    l:"Neurones hippocampiques petits et immatures au terme, secteur CA1" },
  { k:"laminaVermisAbsente", g:"Structures transitoires — maturation",
    l:"Lamina dissecans absente au vermis, présente à l'hémisphère" },
  { k:"eminenceEpendymisee", g:"Structures transitoires — maturation",
    l:"Éminence ganglionnaire à zone ventriculaire remplacée par l'épendyme (dès ~27)" },
  { k:"glieMyelinisation", g:"Destruction, hémorragie, substance blanche",
    l:"Glie de myélinisation — cellules rondes, éosinophiles, noyau excentrique, cytoplasme sans processus" },
  { k:"neuropilePauvre", g:"Destruction, hémorragie, substance blanche",
    l:"Neuropile pauvre au début du 2ᵉ trimestre — fins processus peu colorants" }
];

/* ── Cadres — dans l'ordre où on lit les lames ────────────────────────────────
   Le hors-lame d'abord (il pèse sur ce qu'on cherche). Puis les malformations,
   lues au faible grossissement, du haut vers le bas (cortex, fosse postérieure,
   moelle) ; les structures transitoires, faible aussi ; les lésions acquises ;
   enfin les neurones, lus au moyen et au fort grossissement. */
var CADRES = [
  { g:"Contexte hors lame — macro, autre organe, clinique", hors:true },
  { g:"Cortex — migration, lamination, ligne médiane", sur:"Malformations" },
  { g:"Fosse postérieure — cervelet, aqueduc, tronc", sur:"Malformations" },
  { g:"Tube neural et moelle — fermeture, clivage", sur:"Malformations" },
  { g:"Structures transitoires — maturation", sur:"Maturation" },
  { g:"Destruction, hémorragie, substance blanche", sur:"Lésions acquises" },
  { g:"Neurones — surcharge", sur:"Neurones" },
  { g:"Motoneurone et chromatolyse", sur:"Neurones" }
];

/* ── Signes ───────────────────────────────────────────────────────────────────
   On coche des SIGNES, jamais des diagnostics. Sur cet organe la frontière est
   d'autant plus nette que le diagnostic malformatif est très majoritairement
   MACROSCOPIQUE : l'histologie sert à trancher entre deux macroscopies qui se
   ressemblent, ce qui est l'inverse du rein ou du poumon. Ce qui ne se lit pas
   sur la lame est dans le cadre hors lame.
   Un signe est un constat : présent, absent, ou non regardé (rien cliqué).
   Un signe branché (fv) prend son libellé et son HPO dans FOETO.
   bloc:false = polarité normale ou donnée oui / non : le “Non” en bloc ne le
   répond pas, il se répond seul. */
var SIGNES = [
  /* — Contexte hors lame — macro, autre organe, clinique — */
  { k:"corpsCalleuxAbsent", fiche:"[§ 5.2]", g:"Contexte hors lame — macro, autre organe, clinique", l:"Corps calleux absent",
    meta:"diagnostic MACROSCOPIQUE — la coupe n'ajoute que trois points : faisceaux de Probst, cortex adjacent, gliose" },
  { k:"commissureManquante", fiche:"[§ 4, § 6]", g:"Contexte hors lame — macro, autre organe, clinique",
    l:"Capsule interne ou commissure antérieure absente",
    meta:"v2 : pour que le négatif des commissures blanches ne dise pas plus que ce qui a été répondu" },
  { k:"corticalHyperconvolute", fiche:"[devneuro, ch. 8]", g:"Contexte hors lame — macro, autre organe, clinique",
    l:"Cortex macroscopiquement hyperconvoluté",
    meta:"seule la coupe tranche : lamination normale dessous = polygyrie, pas polymicrogyrie" },
  { k:"gyrationRetard", auto:function(){ var o = E.mesure.opt; return o === "harmonieuse" || o === "dysharmonieuse" ? true : o === "conforme" ? false : null; }, fv:"FOETO:PF.CER-MAL-289", g:"Contexte hors lame — macro, autre organe, clinique",
    meta:"déduit de la gyration déclarée en Maturation (retard harmonieux ou dysharmonieux) — le seul repère de datation qui survive à la macération" },
  { k:"gyriSimplifies", fv:"FOETO:PF.CER-MAL-127", g:"Contexte hors lame — macro, autre organe, clinique",
    meta:"formes extrêmes (NDE1) chiffrées en imagerie, pas en autopsie ; aucun seuil de microcéphalie dans les six livres" },
  { k:"cerveauPetit", fiche:"[§ 5.3]", g:"Contexte hors lame — macro, autre organe, clinique", l:"Encéphale petit pour l'âge déclaré",
    meta:"constat MACROSCOPIQUE — aucun seuil de microcéphalie en DS n'existe dans les six livres" },
  { k:"herniationCervelet", fv:"FOETO:PF.CER-MAL-290", g:"Contexte hors lame — macro, autre organe, clinique",
    meta:"lecture MACROSCOPIQUE — point commun des quatre types de Chiari" },
  { k:"coneNiveau", fiche:"[ernst, ch. 29]", g:"Contexte hors lame — macro, autre organe, clinique",
    l:"Moelle descendant plus bas que le rachis lombaire moyen au-delà de 27 semaines [non convertible]",
    meta:"repère d'ernst : à 27 semaines gestation, la moelle « extends only to the mid lumbar spine » — " +
         "semaines d'ernst, non convertibles en SA (§ 3.0). Seul repère médullaire daté de tout le corpus, " +
         "unique et non confirmé ; aucune norme chiffrée du niveau du cône (§ 3.7). v1 : “se terminant au-dessus " +
         "du rachis lombaire moyen après 27 SA”, sens inverse du repère" },
  { k:"neuropathDiffere", bloc:false, fiche:"[corpus CR]", g:"Contexte hors lame — macro, autre organe, clinique",
    l:"Examen neuropathologique renvoyé à un compte rendu séparé",
    meta:"hors lame — 7 CR sur 8 le font, et c'est la limite qui fait de tout chiffre de corpus un plancher ; oui ou non, à répondre seul" },

  /* — Cortex — migration, lamination, ligne médiane : le seul endroit où l'histologie tranche vraiment — */
  { k:"espaceSousArachnoidienOblitere", fv:"FOETO:PF.CER-MAL-223", g:"Cortex — migration, lamination, ligne médiane", mag:"faible" },
  { k:"vaguesAmasNeuronaux", fv:"FOETO:PF.CER-MAL-287", g:"Cortex — migration, lamination, ligne médiane", mag:"faible" },
  { k:"heterotopiesNodulairesProfondes", fv:"FOETO:PF.CER-MAL-292", g:"Cortex — migration, lamination, ligne médiane", mag:"faible" },
  { k:"laminationNormaleSousGyri", bloc:false, fiche:"[devneuro, ch. 8]", g:"Cortex — migration, lamination, ligne médiane", mag:"faible",
    l:"Histologie et lamination NORMALES sous les circonvolutions surnuméraires",
    meta:"présent = lamination normale : c'est ce qui fait une polygyrie d'hydrocéphalie, pas une polymicrogyrie" },
  { k:"laminationDesorganisee", fiche:"[§ 6]", g:"Cortex — migration, lamination, ligne médiane", mag:"faible",
    l:"Lamination corticale désorganisée" },
  { k:"heterotopieSubstanceBlanche", fiche:"[§ 8.3]", g:"Cortex — migration, lamination, ligne médiane", mag:"faible",
    l:"Amas neuronaux dans la substance blanche",
    meta:"les grands neurones interstitiels, résidus de sous-plaque, miment cet aspect (variante du cadre)" },
  { k:"heterotopieStriee", fv:"FOETO:PF.CER-MAL-169", g:"Cortex — migration, lamination, ligne médiane", mag:"faible",
    meta:"l'un des trois aspects de la surmigration des lissencéphalies cobblestone [devneuro, ch. 4]" },
  { k:"dysplasieCortexAdjacent", fiche:"[§ 5.2]", g:"Cortex — migration, lamination, ligne médiane", mag:"faible",
    l:"Dysplasie du cortex adjacent à la malformation médiane" },
  { k:"faisceauxProbst", fiche:"[§ 5.2]", g:"Cortex — migration, lamination, ligne médiane", mag:"faible",
    l:"Faisceaux de Probst — faisceaux longitudinaux para-ventriculaires",
    meta:"faits des axones qui n'ont pas traversé : à chercher dans l'agénésie calleuse" },
  { k:"surmigrationPie", fv:"FOETO:PF.CER-MAL-216", g:"Cortex — migration, lamination, ligne médiane", mag:"moyen",
    meta:"le franchissement de la pie-mère est le critère lisible des lissencéphalies cobblestone " +
         "(v1 : surmigration de nids neurogliaux À TRAVERS la pie-mère)" },
  { k:"amasNeuronesZSV", fv:"FOETO:PF.CER-MAL-022", g:"Cortex — migration, lamination, ligne médiane", mag:"moyen",
    meta:"l'un des trois aspects de la surmigration des lissencéphalies cobblestone [devneuro, ch. 4]" },
  { k:"cortexInverse", fv:"FOETO:PF.CER-MAL-179", g:"Cortex — migration, lamination, ligne médiane", mag:"moyen",
    meta:"le cortex inversé est un phénotype de souris : ne pas le chercher sur une lame humaine au motif du " +
         "modèle murin — le phénotype humain publié des mutations RELN est une lissencéphalie avec hypoplasie cérébelleuse" },
  { k:"neuronesGlieGrandsAtypiques", fv:"FOETO:PF.CER-MAL-210", g:"Cortex — migration, lamination, ligne médiane", mag:"moyen",
    meta:"« the large size and atypia of neurons and glia » [devneuro, ch. 8] — neurones ET glie (libellé v1)" },

  /* — Fosse postérieure — cervelet, aqueduc, tronc — */
  { k:"heterotopieCerebelleuseProeminente", fv:"FOETO:PF.CER-MAL-291", g:"Fosse postérieure — cervelet, aqueduc, tronc", mag:"faible",
    meta:"le négatif utile porte sur le caractère proéminent, jamais sur la présence" },
  { k:"vermisAplasieFusion", fv:"FOETO:PF.CER-MAL-296", g:"Fosse postérieure — cervelet, aqueduc, tronc", mag:"faible",
    meta:"diagnostic de coupe FRONTALE — fusion apparente des hémisphères cérébelleux (libellé v1)" },
  { k:"dysplasieCerebelleuseExtensive", fiche:"[devneuro, ch. 15]", g:"Fosse postérieure — cervelet, aqueduc, tronc", mag:"faible",
    l:"Dysplasie cérébelleuse extensive" },
  { k:"aqueducStenose", fiche:"[§ 5.5]", g:"Fosse postérieure — cervelet, aqueduc, tronc", mag:"faible",
    l:"Aqueduc de Sylvius rétréci ou non perméable" },
  { k:"troncRepereManquant", fiche:"[§ 4, § 6]", g:"Fosse postérieure — cervelet, aqueduc, tronc", mag:"faible",
    l:"Noyaux pontiques ou pyramides bulbaires absents",
    meta:"v2 : pour que le négatif du tronc ne dise pas plus que ce qui a été répondu" },
  { k:"purkinjeInterrompue", fiche:"[§ 6]", g:"Fosse postérieure — cervelet, aqueduc, tronc", mag:"moyen",
    l:"Monocouche de Purkinje interrompue ou irrégulière" },
  { k:"rosettesEpendymaires", fv:"FOETO:PF.CER-CLA-176", g:"Fosse postérieure — cervelet, aqueduc, tronc", mag:"moyen",
    meta:"dans l'aqueduc, les 3ᵉ et 4ᵉ ventricules (libellé v1) — substrat histologique nommé de la sténose de l'aqueduc" },

  /* — Tube neural et moelle — fermeture, clivage : ce que les deux CR décrivent sans le mot — */
  { k:"placodeNeurale", fv:"FOETO:PF.CER-MAL-294", g:"Tube neural et moelle — fermeture, clivage", mag:"faible",
    meta:"moelle ouverte vers l'arrière, épendyme en quasi-continuité avec la peau (libellé v1) — le service " +
         "l'écrit déjà : “Au niveau du défect, la moelle est ouverte vers l'arrière et l'épendyme en " +
         "quasi-continuité avec la peau” [corpus CR]" },
  { k:"fermetureSousLesion", fiche:"[corpus CR]", g:"Tube neural et moelle — fermeture, clivage", mag:"faible",
    l:"Fermeture de la moelle sous le niveau lésionnel, malformative et hémorragique",
    meta:"second verbatim du même CR, et il décrit un étage SOUS la lésion — donc plusieurs niveaux" },
  { k:"areaCerebrovasculosa", fiche:"[devneuro, ch. 2]", g:"Tube neural et moelle — fermeture, clivage", mag:"faible",
    l:"Area cerebrovasculosa — tissu neuroglial désorganisé et vasculaire",
    meta:"l'anencéphalie n'est pas un défaut de fermeture mais une dégénérescence secondaire d'un tube " +
         "ouvert : on trouve un tissu désorganisé, pas un cerveau formé puis amputé" },
  { k:"deuxHemiMoellesUnSac", fv:"FOETO:PF.CER-MAL-295", g:"Tube neural et moelle — fermeture, clivage", mag:"faible",
    meta:"critère de coupe TRANSVERSALE : le sac dural, pas la moelle" },
  { k:"deuxSacsDuraux", fv:"FOETO:PF.CER-MAL-288", g:"Tube neural et moelle — fermeture, clivage", mag:"faible",
    meta:"critère de coupe TRANSVERSALE : le sac dural, pas la moelle" },
  { k:"hydromyelie", fiche:"[devneuro, ch. 2]", g:"Tube neural et moelle — fermeture, clivage", mag:"faible",
    l:"Dilatation du canal médullaire (hydromyélie)" },
  { k:"clivageDuplicationPartielle", fv:"FOETO:PF.CER-MAL-286", g:"Tube neural et moelle — fermeture, clivage", mag:"faible",
    meta:"perineuro ch. 38 distingue le clivage de la vraie duplication" },

  /* — Structures transitoires — maturation anormale, par structure — */
  { k:"matricePersistante", fiche:"[perineuro, s2_nervous_development]", g:"Structures transitoires — maturation", mag:"faible",
    l:"Matrice germinative persistante au-delà de l'âge attendu",
    meta:"seule sa PERSISTANCE se coche : on ne sait pas dire à partir de quel âge son absence est anormale" },
  { k:"sousPlaquePersistante", fiche:"[§ 3.4]", g:"Structures transitoires — maturation", mag:"faible",
    l:"Sous-plaque persistante après 35" },
  { k:"laminaVermis", bloc:false, fiche:"[perineuro, s2_nervous_development]", g:"Structures transitoires — maturation", mag:"faible",
    l:"Lamina dissecans présente au vermis",
    meta:"observation : perineuro la donne disparue à 28 au vermis, ernst à 32 sans distinguer d'étage" },
  { k:"laminaHemisphere", bloc:false, fiche:"[perineuro, s2_nervous_development]", g:"Structures transitoires — maturation", mag:"faible",
    l:"Lamina dissecans présente à l'hémisphère cérébelleux",
    meta:"observation : perineuro la donne disparue à 30 aux hémisphères, ernst à 32" },
  { k:"laminaDissecansPersistante", fiche:"[ernst, ch. 29 ; perineuro]", g:"Structures transitoires — maturation", mag:"faible",
    l:"Lamina dissecans persistante aux DEUX étages, vermis compris" },
  { k:"dentelNonCrenele", fiche:"[§ 3.5]", g:"Structures transitoires — maturation", mag:"faible",
    l:"Noyau dentelé à contour lisse et mal délimité après 22",
    meta:"une FORME, lue à faible grossissement : survit à la macération" },
  { k:"oliveNonCrenelee", fiche:"[§ 3.5]", g:"Structures transitoires — maturation", mag:"faible",
    l:"Olive bulbaire inférieure à contour lisse au 3ᵉ trimestre" },
  { k:"granSousPialePersistante", fiche:"[§ 3.4]", g:"Structures transitoires — maturation", mag:"moyen",
    l:"Couche granulaire sous-piale persistante après 30",
    meta:"date portée par un seul terme de base, sans source livre retrouvée" },

  /* — Destruction, hémorragie, substance blanche — et leur horloge — */
  { k:"hemorragieMatrice", fiche:"[devneuro, ch. 20]", g:"Destruction, hémorragie, substance blanche", mag:"faible",
    l:"Hémorragie de la matrice germinative ou intraventriculaire",
    meta:"1 seul CR sur 176 en mentionne une — et c'est le type de lésion qui part dans le rapport différé" },
  { k:"leucomalacie", fiche:"[devneuro, ch. 21]", g:"Destruction, hémorragie, substance blanche", mag:"faible",
    l:"Leucomalacie périventriculaire ou cavitation de la substance blanche" },
  { k:"caviteSansGliose", fiche:"[devneuro, ch. 19]", g:"Destruction, hémorragie, substance blanche", mag:"faible",
    l:"Cavité ou perte de substance SANS gliose" },
  { k:"structurePetiteBienConstruite", fiche:"[§ 5.3]", g:"Destruction, hémorragie, substance blanche", mag:"faible",
    l:"Structure petite mais bien construite, sans gliose ni perte neuronale" },
  { k:"necroseLaminaire", fv:"FOETO:PF.CER-CLA-151", g:"Destruction, hémorragie, substance blanche", mag:"faible" },
  { k:"rarefactionNeuronale", fiche:"[§ 5.3]", g:"Destruction, hémorragie, substance blanche", mag:"moyen",
    l:"Raréfaction neuronale" },
  { k:"glioseReactionnelle", fv:"FOETO:PF.CER-RET-026", g:"Destruction, hémorragie, substance blanche", mag:"moyen",
    meta:"astrocytose réactionnelle (libellé v1) — n'apparaît que vers 20-23 semaines : avant, son absence ne prouve rien" },
  { k:"sansMacrophagesMyeline", bloc:false, fiche:"[perineuro, s9_infections]", g:"Destruction, hémorragie, substance blanche", mag:"fort",
    l:"Pas de macrophages chargés de myéline — pas de démyélinisation active",
    meta:"polarité normale, à répondre seul : c'est l'ABSENCE qui est le critère différentiel du retard de " +
         "myélinisation infectieux (§ 5.9) ; absent = macrophages chargés de myéline vus (v1 : macrophagesMyeline)" },
  { k:"retardMyelinisation", fiche:"[perineuro, s9_infections]", g:"Destruction, hémorragie, substance blanche", mag:"technique",
    l:"Réduction d'intensité de la substance blanche attendue pour l'âge",
    meta:"le critère existe, la technique qui le lit (coloration de myéline) n'apparaît dans aucun CR" },

  /* — Neurones — surcharge : la famille, jamais la maladie — */
  { k:"perteNeuronaleNGC", fv:"FOETO:PF.CER-MET-114", g:"Neurones — surcharge", mag:"moyen" },
  { k:"neuroneBallonise", fv:"FOETO:PF.CER-MET-077", g:"Neurones — surcharge", mag:"moyen",
    meta:"distension (ballonisation) des corps cellulaires neuronaux et de leurs prolongements (libellé v1) — " +
         "pose la famille, jamais la maladie" },
  { k:"cellulesGaucher", fv:"FOETO:PF.CER-RET-012", g:"Neurones — surcharge", mag:"fort",
    meta:"dispersées une à une dans tout le cerveau [devneuro, ch. 29] (libellé v1)" },
  { k:"neuronophagie", fv:"FOETO:PF.CER-MAL-293", g:"Neurones — surcharge", mag:"fort" },
  { k:"pasdPositif", fv:"FOETO:PF.CER-RET-051", g:"Neurones — surcharge", mag:"technique",
    meta:"v1 : matériel de surcharge PASD-positif — le PAS est déjà pratiqué dans 84 CR sur 176, la moitié " +
         "de la parade est en place, le fer colloïdal n'apparaît dans aucun CR" },

  /* — Motoneurone et chromatolyse — le diagnostic se fait à la moelle, pas au muscle — */
  { k:"perteCornesAnterieures", fv:"FOETO:PF.CER-INF-033", g:"Motoneurone et chromatolyse", mag:"moyen",
    meta:"cornes antérieures de la moelle (libellé v1 : perte des motoneurones des cornes antérieures)" },
  { k:"noyauxMoteursBulbaires", fv:"FOETO:PF.CER-RET-007", g:"Motoneurone et chromatolyse", mag:"moyen" },
  { k:"colonneClarke", fv:"FOETO:PF.CER-RET-041", g:"Motoneurone et chromatolyse", mag:"moyen" },
  { k:"chromatolyseMotoneurones", fv:"FOETO:PF.CER-CLA-199", g:"Motoneurone et chromatolyse", mag:"fort",
    meta:"v1 : deux lignes, chromatolyse des motoneurones médullaires et ballonisation des motoneurones — " +
         "FOETO les porte en un seul terme" },
  { k:"activationMicrogliale", fv:"FOETO:PF.CER-CLA-003", g:"Motoneurone et chromatolyse", mag:"fort" },
  { k:"gangliRachidiensChromatolyse", fv:"FOETO:PF.CER-RET-015", g:"Motoneurone et chromatolyse", mag:"fort",
    meta:"cellules sensitives des ganglions rachidiens dorsaux (libellé v1)" },
  { k:"chromatolyseThalamique", fv:"FOETO:PF.CER-MAL-285", g:"Motoneurone et chromatolyse", mag:"fort",
    meta:"le repli quand la moelle manque, et la moelle n'est réellement décrite que dans 2 CR sur 176" }
];

/* ── Associations lues ────────────────────────────────────────────────────────
   Elles s'affichent, elles ne se cochent jamais. Sur cet organe, plusieurs
   d'entre elles partagent délibérément leurs signes : la macération, la
   variante normale et la lésion donnent souvent la MÊME image, et le module
   doit les faire apparaître ensemble plutôt que d'en choisir une. Un terme
   FOETO de maladie (fv) s'affiche avec l'association, il n'est pas exporté. */
var DIAGS = [
  { k:"lissencephalieII", l:"Lissencéphalie de type II — les trois critères de coupe", fv:"FOETO:PF.CER-MAL-191",
    cle:"espaceSousArachnoidienOblitere", min:2,
    signes:["espaceSousArachnoidienOblitere","vaguesAmasNeuronaux","heterotopiesNodulairesProfondes",
            "surmigrationPie","heterotopieStriee","amasNeuronesZSV"],
    stop:" — les trois critères viennent EN CREUX, du diagnostic différentiel de la polymicrogyrie : " +
         "« obliteration of the subarachnoid space, complete disorganization of the laminar pattern " +
         "into neuronal waves and clusters, and deeply placed nodular heterotopias » [devneuro, ch. 8]. " +
         "La surmigration cobblestone en donne trois aspects : « Overmigration of neuroglial nests " +
         "through the pia into the subarachnoid spaces, streaky heterotopia in the intermediate zone " +
         "and clusters of immature neurons in the outer subventricular zone » [devneuro, ch. 4]. " +
         "Le type I est un groupe génétique, 13 gènes causaux dont LIS1 sur 17p : la lame ne le porte " +
         "pas. Et NE PAS chercher une inversion corticale au motif du modèle murin — “Le cortex " +
         "inversé est un phénotype de souris” et le phénotype humain publié des mutations RELN est " +
         "une lissencéphalie avec hypoplasie cérébelleuse." },

  { k:"polygyrieHydrocephalie", l:"Polygyrie d'hydrocéphalie — PAS une polymicrogyrie", fv:"FOETO:PF.CER-MAL-308",
    cle:"laminationNormaleSousGyri", min:2,
    signes:["laminationNormaleSousGyri","corticalHyperconvolute","aqueducStenose","rosettesEpendymaires"],
    stop:" — piège de macroscopie que SEULE la coupe résout : « Polymicrogyria must be distinguished " +
         "from polygyria, a macroscopically hyperconvoluted cortex most often associated with " +
         "hydrocephalus in early life in which cortical histology and layering is normal » " +
         "[devneuro, ch. 8]. Un cortex hyperconvoluté à lamination normale est une conséquence " +
         "MÉCANIQUE, pas un trouble de migration." },

  { k:"dysplasieCorticaleFocale", l:"Dysplasie corticale focale", fv:"FOETO:PF.CER-MAL-072",
    cle:"neuronesGlieGrandsAtypiques", min:2,
    signes:["neuronesGlieGrandsAtypiques","laminationDesorganisee","dysplasieCortexAdjacent"],
    stop:" — troisième différentiel donné par devneuro ch. 8, sur « the large size and atypia of " +
         "neurons and glia ». La fiche n'en donne ni gradation ni topographie : ne rien ajouter." },

  { k:"heterotopieCerebelleuseLue", l:"Hétérotopie cérébelleuse — le faux positif le mieux quantifié de la série",
    fv:"FOETO:PF.CER-MAL-158", cle:"heterotopieCerebelleuseProeminente", min:2,
    signes:["heterotopieCerebelleuseProeminente","dysplasieCerebelleuseExtensive","vermisAplasieFusion",
            "purkinjeInterrompue"],
    stop:" — “Une hétérotopie cérébelleuse est présente chez plus d'un nourrisson normal sur deux.” " +
         "Ce n'est donc PAS un signe. Elle ne devient significative que proéminente ET associée — " +
         "trisomies 13 et 18, syndromes cérébelleux constitués. La signaler seule, “sans contexte, " +
         "produit un faux diagnostic une fois sur deux”." },

  { k:"rhombencephalosynapsis", l:"Rhombencéphalosynapsis", fv:"FOETO:PF.CER-MAL-244",
    cle:"vermisAplasieFusion", min:2,
    signes:["vermisAplasieFusion","dysplasieCerebelleuseExtensive","purkinjeInterrompue"],
    stop:" — « a syndrome of vermian aplasia with apparent fusion of the cerebellar hemispheres » " +
         "[devneuro, ch. 15]. Diagnostic de coupe FRONTALE. Le même chapitre relie les dysplasies " +
         "cérébelleuses au syndrome de Zellweger et signale l'association rare dysplasie " +
         "septo-optique / hypoplasie cérébelleuse — associations, pas critères de lame." },

  { k:"stenoseAqueduc", l:"Sténose de l'aqueduc — un substrat histologique nommé", fv:"FOETO:PF.CER-MAL-258",
    cle:"aqueducStenose", min:2,   /* pivot : la sténose est l'objet, les rosettes son substrat à chercher (§ 5.5) */
    signes:["aqueducStenose","rosettesEpendymaires","herniationCervelet"],
    stop:" — c'est l'apport le plus directement actionnable du § 5.5 : “la sténose de l'aqueduc a un " +
         "substrat histologique nommé”, les rosettes épendymaires de l'hydrocéphalie autosomique " +
         "récessive non syndromique de type 2 (MPDZ), l'autre cause génétique étant CCDC88C. Le " +
         "gabarit du service porte déjà “Mésencéphale : aqueduc de taille conforme” : l'item " +
         "existe, il lui manque le critère microscopique." },

  { k:"chiari", l:"Malformation de Chiari — lecture macroscopique", fv:"FOETO:PF.CER-MAL-298",
    cle:"herniationCervelet", min:2,
    signes:["herniationCervelet","placodeNeurale","aqueducStenose"],
    stop:" — point commun des quatre types : « herniation of the cerebellum, and, in some cases, " +
         "parts of the brainstem outside the posterior fossa » [devneuro, ch. 12], classés en " +
         "association avec l'hydrocéphalie. La fréquence de l'hydrocéphalie dans le Chiari II DIVERGE " +
         "entre les sources du corpus et la fiche ne la chiffre pas, faute d'avoir pu vérifier le " +
         "verbatim des deux côtés (§ 9). Ne pas en écrire une." },

  { k:"tubeNeuralOuvert", l:"Défaut de fermeture du tube neural — nomenclature à respecter", fv:"FOETO:PF.CER-MAL-205",
    cle:"placodeNeurale", min:2,
    signes:["placodeNeurale","fermetureSousLesion","areaCerebrovasculosa"],
    stop:" — deux points de méthode : l'anencéphalie n'est PAS un défaut de fermeture mais une " +
         "dégénérescence secondaire d'un tube ouvert, d'où l'area cerebrovasculosa sur la lame ; et " +
         "l'exencéphalie ne se voit QUE chez l'embryon et le fœtus précoce — la porter au 2ᵉ " +
         "trimestre est un contresens de stade. Les deux seuls CR qui décrivent réellement la moelle " +
         "sont des myéloméningocèles, et ils écrivent la placode sans le mot : “C'est exactement la " +
         "placode neurale de devneuro, décrite sans le mot.”" },

  { k:"agenesieCalleuse", l:"Agénésie du corps calleux — ce que la coupe ajoute", fv:"FOETO:PF.CER-MAL-016",
    cle:"corpsCalleuxAbsent", min:2,
    signes:["corpsCalleuxAbsent","faisceauxProbst","dysplasieCortexAdjacent","glioseReactionnelle"],
    stop:" — diagnostic MACROSCOPIQUE. La coupe n'ajoute que trois points : les faisceaux de Probst, " +
         "la distinction agénésie / destruction secondaire qui repose sur la gliose, et la dysplasie " +
         "du cortex adjacent. ATTENTION : le deuxième point est inutilisable avant 20-23 semaines, " +
         "puisque la gliose n'existe pas encore (Maturation)." },

  { k:"surchargeNonTypable", l:"Surcharge neuronale — la famille, JAMAIS la maladie", fv:"FOETO:PF.CER-MET-116",
    cle:"neuroneBallonise", min:1,
    signes:["neuroneBallonise","pasdPositif","perteNeuronaleNGC"],
    stop:" — un seul signe suffit à poser la famille, et aucun nombre de signes ne suffit à nommer la " +
         "maladie : “Le neurone ballonisé pose la famille, jamais la maladie.” Le corpus est " +
         "explicite — la seule présence de neurones élargis n'est diagnostique d'aucune maladie " +
         "sous-jacente, Tay-Sachs, Niemann-Pick et NCL comprises [keeling, ch. 29]. Le libellé " +
         "recevable est : surcharge neuronale, maladie non typable sur la lame." },

  { k:"gaucher", l:"Maladie de Gaucher — la seule exception documentée du corpus", fv:"FOETO:PF.CER-MAL-302",
    cle:"cellulesGaucher", min:2,
    signes:["cellulesGaucher","neuronophagie","perteNeuronaleNGC","necroseLaminaire"],
    stop:" — seule surcharge du corpus à avoir une cellule caractéristique nommée dans le cerveau " +
         "[devneuro, ch. 29] : perte neuronale prédominant aux noyaux gris centraux, au tronc et aux " +
         "noyaux dentelés, atteinte corticale maximale au cortex calcarin et à l'hippocampe, " +
         "neuronophagie fréquente, nécrose laminaire possible dans les formes sévères. Dans la forme " +
         "périnatale léthale, le CD68 marque la composante microgliale — et le CD68 est DÉJÀ pratiqué " +
         "par le service, dans 25 CR sur 176." },

  { k:"motoneuroneMedullaire", l:"Atteinte du motoneurone — le diagnostic se fait ICI, pas au muscle", fv:"FOETO:PF.CER-MAL-297",
    cle:"perteCornesAnterieures", min:2,
    signes:["perteCornesAnterieures","glioseReactionnelle","chromatolyseMotoneurones",
            "activationMicrogliale","neuronophagie","noyauxMoteursBulbaires","colonneClarke"],
    stop:" — apport de cette fiche aux quatorze précédentes : la fiche muscle laissait la divergence " +
         "keeling / soffoet ouverte à 1 contre 1 ; devneuro ch. 39, source indépendante, la déplace à " +
         "2 contre 1 en écrivant que chez le nouveau-né l'atrophie groupée peut manquer et n'apparaît " +
         "qu'à partir de six semaines de vie — c'est-à-dire jamais chez le fœtus. Conséquence : " +
         "“le diagnostic se fait à la moelle, pas au muscle”, et le muscle sert de confirmation. La " +
         "divergence n'est pas tranchée en autorité, elle est déplacée. « Bulbar motor neurons and " +
         "Clarke's column can be affected » [devneuro, ch. 39]. Sans niveaux médullaires " +
         "(Maturation), rien de tout cela n'est conclusif." },

  { k:"repliThalamique", l:"Repli thalamique — quand la moelle manque",
    cle:"chromatolyseThalamique", min:1,   /* le pointeur vaut seul, moelle absente (§ 5.7) */
    signes:["chromatolyseThalamique","gangliRachidiensChromatolyse","chromatolyseMotoneurones"],
    stop:" — la phrase la plus utile de tout le § 5 pour la pratique : la chromatolyse thalamique est " +
         "« a useful diagnostic pointer when the spinal cord is unavailable for examination » " +
         "[devneuro, ch. 39]. La moelle n'étant réellement décrite que dans 2 CR sur 176, cette " +
         "situation est la RÈGLE. Le geste est bon marché : la coupe thalamique fait déjà partie du " +
         "prélèvement sus-tentoriel standard." },

  { k:"splitCordII", l:"Split cord malformation de type II (un seul sac dural)", fv:"FOETO:PF.CER-MAL-305",
    cle:"deuxHemiMoellesUnSac", min:2,
    signes:["deuxHemiMoellesUnSac","hydromyelie","fermetureSousLesion","clivageDuplicationPartielle"],
    stop:" — « As the hemi-cords exist within a single dural sac, this defect is referred to as split " +
         "cord malformation type II, according to the classification of Pang et al. » [devneuro, " +
         "ch. 2]. Le critère est le SAC DURAL, pas la moelle, et il est de coupe TRANSVERSALE : perdu " +
         "définitivement sur un prélèvement fragmenté. perineuro ch. 38 distingue en outre le clivage " +
         "de la vraie duplication — « Histology shows the malformation is mainly splitting with only " +
         "partial duplication of the spinal cord at the lower lumbar level ». Vocabulaire NON " +
         "réconcilié entre les deux registres : diastématomyélie, diplomyélie, split cord " +
         "malformation coexistent dans la base." },

  { k:"splitCordI", l:"Split cord malformation de type I (deux sacs duraux)", fv:"FOETO:PF.CER-MAL-305",
    cle:"deuxSacsDuraux", min:2,
    signes:["deuxSacsDuraux","hydromyelie","fermetureSousLesion","clivageDuplicationPartielle"],
    stop:" — deux sacs duraux distincts = type I. Même réserve de coupe transversale, et même " +
         "flottement de vocabulaire que ci-dessus." },

  { k:"lesionAcquise", l:"Lésion acquise — et sa chronologie", fv:"FOETO:PF.CER-MAL-304",
    cle:"caviteSansGliose", min:2,
    signes:["caviteSansGliose","rarefactionNeuronale","glioseReactionnelle","leucomalacie"],
    stop:" — l'astrocytose réactionnelle n'apparaît que vers 20-23 semaines et un tissu nécrotique " +
         "peut être résorbé sans laisser de trace gliale [devneuro, ch. 19]. Trois conséquences : " +
         "avant ~20-23 semaines l'absence de gliose ne prouve rien ; le discriminant hypoplasie / " +
         "atrophie n'est pas utilisable au 2ᵉ trimestre précoce ; une cavité sans gliose sur un fœtus " +
         "jeune reste compatible avec une lésion acquise et n'autorise PAS à conclure au malformatif. " +
         "Or “On ne note pas d'apoptose ou de gliose” apparaît dans 17 CR sur 176, dont deux sur " +
         "des fœtus de 11,8 et 17,4 SA." },

  { k:"hemorragieMatriceGerm", l:"Hémorragie de la matrice germinative — lésion bornée dans le temps", fv:"FOETO:PF.CER-VAS-004",
    cle:"hemorragieMatrice", min:2,
    signes:["hemorragieMatrice","matricePersistante","leucomalacie","caviteSansGliose"],
    stop:" — la fragilité de la matrice a un substrat : ses vaisseaux ont une paroi fine, sans " +
         "adventice significative, et la tunique musculeuse lisse des artères cérébrales profondes " +
         "n'est pas constituée avant 30 SA. “La fenêtre de vulnérabilité hémorragique coïncide donc " +
         "avec la fenêtre d'existence de la matrice” : ce n'est pas un accident de tout âge. 1 seul " +
         "CR sur 176 en mentionne une — avec la réserve du § 0, c'est précisément le type de lésion " +
         "qui part dans le rapport neuropathologique différé." },

  { k:"hypoplasieOuAtrophie", l:"Petite structure — hypoplasie ou atrophie ?",
    cle:"structurePetiteBienConstruite", min:2,
    signes:["structurePetiteBienConstruite","cerveauPetit","glioseReactionnelle","rarefactionNeuronale"],
    stop:" — ce que la lame apporte de décisif et de souvent négligé : une structure petite mais bien " +
         "construite, sans gliose, n'a jamais atteint sa taille ; une structure petite avec gliose et " +
         "raréfaction neuronale a été détruite. Le corpus de livres ne donne AUCUN seuil chiffré de " +
         "microcéphalie — aucune définition en déviations standard dans les six livres — donc ne pas " +
         "en fabriquer un. Et le discriminant lui-même a une date de naissance (Maturation)." },

  { k:"retardMyelinisationInfectieux", l:"Retard de myélinisation d'origine infectieuse",
    cle:"retardMyelinisation", min:2,
    signes:["retardMyelinisation","sansMacrophagesMyeline","glioseReactionnelle"],
    stop:" — le seul apport spécifique de la lame de cerveau au groupe TORCH (rubéole, HIV) : une " +
         "réduction d'intensité de la substance blanche attendue pour l'âge, “sans démyélinisation " +
         "active” donc “sans macrophages chargés de myéline”. Le critère différentiel est NÉGATIF, " +
         "ce qui le rend robuste — mais il suppose une coloration de myéline qui n'apparaît dans " +
         "aucun CR : “Le critère existe, la technique qui le lit n'est pas documentée dans ce " +
         "corpus.” Et la divergence LFB / IHC n'est pas tranchée (Techniques)." },

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

/* ── Négatifs à énoncer — déduits des signes ──────────────────────────────────
   Le gabarit du service en fournit déjà l'ossature, étage par étage, et il est
   bon : la fiche le reprend tel quel plutôt que d'en inventer un autre. Les
   quatre de la fin sont d'un autre genre — ce sont des négatifs qu'il ne faut
   PAS écrire tels quels, et ils sont ici pour qu'on ne les écrive pas.
   En présence, aucun ne se coche : un négatif d'étage est énoncé quand tous ses
   signes sont répondus absents, en défaut dès qu'un est présent. */
function etatSignes(ks){
  var v = ks.map(function(k){ return E.signes[k]; });
  return v.indexOf(POS) >= 0 ? false : v.every(function(x){ return x === NEG; }) ? true : null;
}

var NEGATIFS = [
  { k:"cortex", l:"Cortex cérébral : lamination conforme, pas d'hétérotopie, pas de dysplasie focale",
    p:"le service écrit déjà “Cortex cérébral : lamination conforme” — 22 CR sur 176 portent l'item cortex",
    ko:"lamination, hétérotopie ou dysplasie focale ANORMALE — décrire, et vérifier d'abord la fixation",
    auto:function(){ return etatSignes(["laminationDesorganisee","vaguesAmasNeuronaux","heterotopiesNodulairesProfondes",
                                        "heterotopieSubstanceBlanche","heterotopieStriee","neuronesGlieGrandsAtypiques"]); } },
  { k:"ngc", signe:"perteNeuronaleNGC", l:"Noyaux gris centraux : conformes",
    p:"item le plus constant du gabarit du service, 25 CR sur 176",
    ko:"noyaux gris centraux ANORMAUX" },
  { k:"commissures", l:"Commissures blanches présentes : corps calleux, capsule interne, commissure antérieure",
    p:"21 CR sur 176 portent l'item commissures, 22 le corps calleux",
    ko:"une commissure MANQUE — agénésie ou destruction secondaire, et c'est la gliose qui sépare les deux",
    auto:function(){ return etatSignes(["corpsCalleuxAbsent","commissureManquante"]); } },
  { k:"substanceBlanche",
    l:"Substance blanche sous-corticale : pas de leucomalacie, pas de cavitation, pas de macrophages chargés de myéline",
    p:"le troisième terme est le critère différentiel du retard de myélinisation infectieux, et il est négatif",
    ko:"leucomalacie, cavitation ou macrophages chargés de myéline PRÉSENTS",
    auto:function(){
      var l = E.signes.leucomalacie, m = E.signes.sansMacrophagesMyeline;   /* m : polarité normale */
      return l === POS || m === NEG ? false : l === NEG && m === POS ? true : null; } },
  { k:"aqueduc", l:"Mésencéphale : aqueduc perméable, pas de rosette épendymaire",
    p:"“Mésencéphale : aqueduc de taille conforme” existe déjà — il lui manque le critère microscopique",
    ko:"aqueduc non perméable ou rosettes épendymaires PRÉSENTES — substrat nommé de la sténose de l'aqueduc",
    auto:function(){ return etatSignes(["aqueducStenose","rosettesEpendymaires"]); } },
  { k:"tronc", l:"Tronc : noyaux pontiques, pyramides, olives inférieures présentes — crénelées au 3ᵉ trimestre",
    p:"protubérance 24 CR, bulbe 23 CR, olives 22 CR sur 176 — la liste est appliquée. Olive : contour lisse " +
      "à 17-18, crénelation visible mais incomplète en milieu de gestation, crénelation franche au 3ᵉ trimestre (§ 3.5)",
    ko:"un repère du tronc MANQUE ou l'olive n'est pas crénelée — la crénelation est un repère daté",
    auto:function(){ return etatSignes(["troncRepereManquant","oliveNonCrenelee"]); } },
  { k:"cervelet", l:"Cervelet : monocouche de Purkinje continue, pas d'hétérotopie PROÉMINENTE",
    p:"cervelet 23 CR, noyau dentelé 17 CR sur 176",
    ko:"Purkinje interrompue ou hétérotopie proéminente — la présence d'une hétérotopie non proéminente, elle, est normale",
    auto:function(){ return etatSignes(["purkinjeInterrompue","heterotopieCerebelleuseProeminente"]); } },
  { k:"moelle", l:"Moelle : cornes antérieures avec motoneurones en agrégats, sac dural unique, cône en regard du rachis lombaire moyen",
    p:"la moelle n'est réellement décrite que dans 2 CR sur 176, et les deux sont des myéloméningocèles",
    ko:"cornes antérieures, sac dural ou niveau du cône ANORMAUX — le sac dural est un critère de coupe transversale",
    auto:function(){ return etatSignes(["perteCornesAnterieures","deuxHemiMoellesUnSac","deuxSacsDuraux","coneNiveau"]); } },

  /* Négatifs de MATURATION — la spécificité de cet organe : ils sont datables,
     donc ils ne valent qu'accompagnés de l'âge. */
  { k:"matriceAge", l:"Matrice germinative involuée ou persistante, AVEC L'ÂGE EN REGARD",
    p:"0 CR sur 176 nomme la matrice germinative, alors que c'est le repère de datation le plus robuste",
    ko:"état de la matrice noté SANS l'âge en regard — et l'on ne sait pas dire à partir de quel âge son absence est anormale",
    auto:function(){ return E.signes.matricePersistante ? num("sa") != null : null; } },
  { k:"laminaDeuxEtages", l:"Lamina dissecans notée au vermis ET à l'hémisphère SÉPARÉMENT",
    p:"la disparition n'est pas synchrone entre les deux étages",
    ko:"un seul étage noté — présente à l'hémisphère et absente au vermis est la SÉQUENCE NORMALE, pas une contradiction",
    auto:function(){
      var v = E.signes.laminaVermis, h = E.signes.laminaHemisphere;
      return v && h ? true : v || h ? false : null; } },
  { k:"granSousPiale", signe:"granSousPialePersistante", l:"Couche granulaire sous-piale : présente ou disparue",
    p:"date portée par un seul terme de base, sans source livre retrouvée (§ 9-26)",
    ko:"couche granulaire sous-piale non notée, ou persistante après 30" },
  { k:"sousPlaque", signe:"sousPlaquePersistante", l:"Sous-plaque : présente ou dissipée",
    p:"présente de 14-17 à environ 35, sa dissipation est concomitante de la gyrification secondaire",
    ko:"sous-plaque non notée, ou persistante — ses cellules résiduelles miment une hétérotopie de substance blanche" },

  /* Les quatre à NE PAS écrire tels quels. */
  { k:"gliose", l:"Gliose : négatif énoncé AVEC l'âge, ou pas énoncé",
    p:"“On ne note pas d'apoptose ou de gliose” apparaît dans 17 CR sur 176, dont deux sur des fœtus de 11,8 et 17,4 SA",
    ko:"négatif de gliose posé — avant 20 SA il est VIDE : formuler “pas de gliose ; non interprétable à cet âge” ; " +
       "sans terme saisi, il n'est pas daté",
    auto:function(){
      var g = E.signes.glioseReactionnelle, sa = num("sa");
      if (!g) return null;
      if (g === POS) return true;          /* gliose vue : aucun négatif à énoncer */
      return sa != null && sa >= 20; } },
  { k:"heterotopieCereb", signe:"heterotopieCerebelleuseProeminente",
    l:"Hétérotopie cérébelleuse : négatif portant sur le caractère PROÉMINENT",
    p:"sa présence est normale chez plus d'un nourrisson sur deux — “Pas d'hétérotopie cérébelleuse” écrit " +
      "comme critère de normalité n'est pas un critère",
    ko:"hétérotopie cérébelleuse PROÉMINENTE — elle ne devient significative qu'associée (trisomies 13 et 18, " +
       "syndromes cérébelleux constitués)" },
  { k:"myeline", l:"Myélinisation : affirmée seulement si une coloration de myéline a été faite",
    p:"LFB, Luxol, Loyez, MBP, PLP sortent à ZÉRO CR sur 176",
    ko:"“Myélinisation conforme” sans coloration de myéline — l'affirmation n'est pas soutenue par le geste",
    auto:function(){
      if (!E.signes.retardMyelinisation) return null;
      return !!(E.techniques.lfb || E.techniques.ihcMyeline); } },
  { k:"glieRadiaire", l:"Glie radiaire : jamais utilisée comme argument de maturité",
    p:"elle persiste normalement jusqu'au terme, dans le raphé dorsal — énoncé quand la variante est vue et écartée",
    ko:"“Pas de glie radiaire” invoqué comme argument — son absence n'est jamais un argument de maturité",
    auto:function(){ return E.variantes.glieRadiaire ? true : null; } },

  { k:"renvoiNeuropath", l:"Renvoi au compte rendu de neuropathologie : oui ou non, écrit",
    p:"7 CR sur 8 renvoient l'examen à plus tard, ce qui fait de tout chiffre de corpus un plancher",
    ko:"renvoi non tracé — le rendre explicite transforme un silence en donnée",
    auto:function(){ return E.signes.neuropathDiffere || E.prelev.renvoiNeuro ? true : null; } }
];

/* ── Techniques ───────────────────────────────────────────────────────────────
   Trois blocs dans la fiche : ce qui est prescrit ET pratiqué, ce qui est
   prescrit et ABSENT du corpus de CR, et ce qui se décide à l'autopsie. Le
   deuxième bloc contient l'écart de rendement le moins cher de la fiche. */
var TECHNIQUES = [
  { k:"fixationZinc", l:"Fixation formol zinc, en suspension par l'artère basilaire, 2 à 4 semaines",
    q:"la prescription de fixation la plus détaillée de tout le corpus, et elle est spécifique de cet organe" },
  { k:"he", l:"HE",
    q:"porte l'essentiel de la maturation et des signes : crénelations, structures transitoires, lamination" },
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
    q:"soffoet ch. 11 prescrit « Sa visualisation se fait par les techniques de Luxol fast blue ou de Loyez » ; ernst ch. 29 dit que « standard histochemical stains for myelin are not very useful for detecting the small amounts of immature myelin in the fetal central nervous system, and immunohistochemistry is preferred ». “Un livre prescrit le LFB, l'autre dit que le LFB ne marche pas sur le fœtus.” 0 CR sur 176 pour l'une comme pour l'autre" },
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

/* ── Propositions de techniques — déduites des clics, jamais imposées ─────── */
function suggerer(){
  var s = {};
  function vu(){ for (var i = 0; i < arguments.length; i++) if (E.signes[arguments[i]] === POS) return true; return false; }
  function ret(k){ return E.retention[k] === "present"; }
  var sa = num("sa");

  /* Le faux positif du tissu cérébral déplacé a DEUX parades nommées, et elles
     sont au catalogue du service : c'est le meilleur rapport de la fiche. */
  if (ret("massesRacines") || ret("tissuViscere")){ s.gfap = 1; s.cd56 = 1; }
  if (ret("liquefaction") && !E.prelev.duremere) s.fixationZinc = 1;

  if (vu("neuroneBallonise", "pasdPositif")){ s.pas = 1; s.ferColloidal = 1; }
  if (vu("cellulesGaucher", "neuronophagie")){ s.cd68 = 1; s.pas = 1; }
  if (vu("perteNeuronaleNGC", "necroseLaminaire")) s.cd68 = 1;
  if (vu("glioseReactionnelle", "caviteSansGliose", "leucomalacie", "rarefactionNeuronale")) s.gfap = 1;
  if (vu("heterotopieSubstanceBlanche", "heterotopiesNodulairesProfondes", "surmigrationPie",
         "heterotopieStriee", "amasNeuronesZSV")) s.neurofilament = 1;
  if (vu("perteCornesAnterieures", "chromatolyseMotoneurones", "noyauxMoteursBulbaires", "colonneClarke")){
    s.cresyl = 1; s.argentique = 1; }
  if (vu("activationMicrogliale")) s.cd68 = 1;
  if (vu("purkinjeInterrompue", "dysplasieCerebelleuseExtensive")) s.s100 = 1;
  if (vu("hemorragieMatrice")) s.gfap = 1;

  /* La boîte à outils de la myéline reste BARRÉE : la proposer serait prescrire
     une coloration que le service ne fait pas, et ouvrir un champ vide. */
  if (vu("retardMyelinisation") || E.signes.sansMacrophagesMyeline === NEG){ s.lfb = 1; s.ihcMyeline = 1; }
  if (etatNegatif(par(NEGATIFS, "myeline")) === "ko"){ s.lfb = 1; s.ihcMyeline = 1; }

  /* Les deux gestes irrattrapables : ils ne se suggèrent utilement qu'AVANT. */
  if (vu("neuroneBallonise", "pasdPositif") && !E.prelev.congele) s.congelation = 1;
  if (sa != null && sa >= 34 && !E.prelev.pigmentIct) s.pigmentIctere = 1;
  if (!E.prelev.basilaire) s.fixationZinc = 1;
  s.he = 1;
  return s;
}

/* ── Banc propre à l'organe ───────────────────────────────────────────────── */
async function testsOrgane(chk, clic, set, crTient, pause){
  /* Le banc commun laisse des signes posés : on part d'un état voulu, pas supposé. */
  function pose(k, v){ if (E.signes[k] !== v) clic("les", k, v); }
  function ote(k){ if (E.signes[k] && !par(SIGNES, k).auto) clic("les", k, E.signes[k]); }
  function propre(){ SIGNES.forEach(function(x){ ote(x.k); }); }
  function tenue(k){ return associations().some(function(a){ return a.d.k === k && a.tenu; }); }
  function lue(k){ return associations().some(function(a){ return a.d.k === k; }); }
  function niveau(k){ if (E.mesure.def !== k) clic("mdef", k); }
  function gyre(k){ if (E.mesure.opt !== k) clic("mopt", k); }
  function neg(k){ return etatNegatif(par(NEGATIFS, k)); }
  /* en présence, la rétention datable se choisit dans la liste déroulante */
  function retSel(k){ var s = $("retNiveau"); s.value = k; s.dispatchEvent(new Event("change", {bubbles:true})); }
  function cadre(nom){ return groupes().indexOf(nom); }

  chk("aucune latéralité sur cet organe", PAIR === false);
  propre();

  /* ── Le § 2 est inversé : la macération ne ferme pas la lame ────────────── */
  clic("ret", "liquefaction", "present");
  chk("un cerveau liquéfié n'est pas un cerveau perdu",
      crTient("may demonstrate interpretable histology"));
  chk("aucune borne recevable sur un prédicteur mauvais seul",
      crTient("Seuls des prédicteurs MAUVAIS sont positifs"));
  clic("ret", "liquefaction", "present");

  retSel("neuroneCortical");
  chk("le service date par le neurone cortical", crTient("Rétention ≥ 8 semaines"));
  chk("le cerveau n'a aucun rang dans les deux tables", crTient("AUCUN rang dans la séquence de macération"));
  chk("la borne de 8 semaines est donnée pour non sourcée",
      par(RETENTION, "neuroneCortical").note.indexOf("n'est retrouvée dans AUCUN livre") >= 0);
  chk("ernst ne va pas au-delà de 2 à 4 semaines",
      par(RETENTION, "neuroneCortical").note.indexOf("between 2 and 4 weeks") >= 0);
  retSel("ret0");
  chk("rétention 0 : borne nulle, terme bien construit", crTient("Rétention nulle"));
  retSel("");

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
  pose("glioseReactionnelle", NEG);
  set("sa", "17");
  chk("avant 20 SA le négatif de gliose est vide", crTient("Le négatif n'est pas faux, il est VIDE") &&
      neg("gliose") === "ko" && crTient("avant 20 SA il est VIDE"));
  chk("la formulation de repli est donnée", crTient("non interprétable à cet âge"));
  chk("le discriminant hypoplasie/atrophie tombe avec elle",
      crTient("Le discriminant hypoplasie/atrophie n'est pas utilisable ici non plus"));
  set("sa", "30");
  chk("au-delà de 20 SA la réserve tombe", !crTient("Le négatif n'est pas faux, il est VIDE") &&
      neg("gliose") === "ok");
  ote("glioseReactionnelle");
  chk("gliose non répondue : négatif ouvert, jamais supposé", neg("gliose") === null);

  /* ── Niveaux médullaires : ce qui décide de ce que la moelle peut conclure ─ */
  niveau("aucun");
  chk("sans niveau, cornes antérieures normales ne veut rien dire",
      crTient("AUCUN NIVEAU MÉDULLAIRE PRÉLEVÉ"));
  chk("le repli thalamique est rappelé", crTient("when the spinal cord is unavailable for examination"));
  pose("perteCornesAnterieures", NEG); pose("deuxHemiMoellesUnSac", NEG);
  pose("deuxSacsDuraux", NEG); pose("coneNiveau", NEG);
  niveau("fragmentee");
  chk("moelle fragmentée : le critère de Pang est perdu", crTient("le critère de Pang est perdu, définitivement"));
  chk("le critère est le sac dural, pas la moelle", crTient("Le critère est le SAC DURAL"));
  niveau("unSeul");
  chk("un seul niveau ne conclut pas à une atteinte diffuse", crTient("ATTEINTE DIFFUSE"));
  niveau("trois");
  chk("trois niveaux : le geste est connu du service", crTient("cervical, distal, lombaire"));
  chk("moelle répondue absente : négatif énoncé", neg("moelle") === "ok");
  pose("deuxSacsDuraux", POS);
  chk("deux sacs duraux : négatif de la moelle en défaut", neg("moelle") === "ko");
  propre();

  /* ── Gyration : le seul repère qui survive à la macération ───────────────── */
  gyre("dysharmonieuse");
  chk("le retard dysharmonieux oriente vers la formation corticale", crTient("DYSHARMONIEUX"));
  gyre("harmonieuse");
  chk("le retard harmonieux ne dit pas la même chose", crTient("petite taille constitutionnelle"));
  chk("les repères gyraux divergent sans biais constant", crTient("ce n'est pas un biais"));
  chk("le seuil d'alerte est le stade, pas la semaine", crTient("le seuil d'alerte n'est pas la semaine"));
  chk("gyration en retard : le signe se déduit de la mesure, sans bouton", E.signes.gyrationRetard === POS &&
      !document.querySelector('[data-act="les"][data-k="gyrationRetard"]'));
  gyre("conforme");
  chk("gyration conforme : signe déduit absent", E.signes.gyrationRetard === NEG);
  gyre("nonEvaluable");
  chk("gyration non évaluable : rien de déduit", !E.signes.gyrationRetard);

  /* ── La seule épaisseur chiffrée de la fiche, et elle est en CELLULES ────── */
  set("m_egl", "7");
  chk("compte conforme entre 20 et 30 SA", crTient("Compte conforme"));
  set("sa", "36");
  chk("hors fenêtre, le compte ne s'interprète pas", crTient("HORS DE LA FENÊTRE 20–30 SA"));
  set("sa", "26");
  set("m_egl", "3");
  chk("verbatim : sous 6 cellules, consigné sans alerte (6 à 9 est un maximum, pas un plancher)",
      crTient("pas comme plancher") && $("vMesure").className.indexOf("bad") < 0);
  set("m_egl", "");
  set("sa", "30");
  chk("aucun autre chiffre proposé", MESURE.champs.length === 1);
  chk("aucun poids cérébral dans la grille",
      JSON.stringify(MESURE).toLowerCase().indexOf("poids") < 0);
  chk("aucune épaisseur corticale en mm",
      MESURE.champs.every(function(c){ return c.label.indexOf(" mm") < 0; }));

  /* ── Le faux positif le mieux quantifié de la série ──────────────────────── */
  propre();
  pose("heterotopieCerebelleuseProeminente", POS);
  chk("une hétérotopie cérébelleuse seule ne tient pas",
      !tenue("heterotopieCerebelleuseLue") && lue("heterotopieCerebelleuseLue"));
  chk("plus d'un nourrisson normal sur deux en porte",
      crTient("présente chez plus d'un nourrisson normal sur deux"));
  chk("proéminente : les deux négatifs du cervelet tombent", neg("heterotopieCereb") === "ko" && neg("cervelet") === "ko");
  pose("vermisAplasieFusion", POS); pose("purkinjeInterrompue", POS);
  chk("proéminente ET associée, elle se lit", tenue("heterotopieCerebelleuseLue"));
  chk("le rhombencéphalosynapsis se lit en même temps", tenue("rhombencephalosynapsis"));
  chk("et il est de coupe frontale", par(SIGNES, "vermisAplasieFusion").meta.indexOf("FRONTALE") >= 0);

  /* ── Migration : le seul endroit où l'histologie tranche ─────────────────── */
  propre();
  pose("corticalHyperconvolute", POS); pose("laminationNormaleSousGyri", POS);
  chk("un cortex hyperconvoluté à lamination normale est une polygyrie",
      tenue("polygyrieHydrocephalie"));
  chk("ce n'est pas une lissencéphalie de type II", !tenue("lissencephalieII"));
  propre();
  pose("surmigrationPie", POS); pose("heterotopieStriee", POS);
  chk("surmigration sans oblitération : le type II ne tient pas", !tenue("lissencephalieII") && lue("lissencephalieII"));
  pose("espaceSousArachnoidienOblitere", POS);
  chk("oblitération + surmigration : le type II se lit", tenue("lissencephalieII"));
  propre();
  pose("espaceSousArachnoidienOblitere", POS); pose("vaguesAmasNeuronaux", POS);
  chk("les trois critères de coupe tiennent le type II", tenue("lissencephalieII"));
  chk("le cortex inversé reste un phénotype de souris",
      par(DIAGS, "lissencephalieII").stop.indexOf("phénotype de souris") >= 0 &&
      par(SIGNES, "cortexInverse").meta.indexOf("phénotype de souris") >= 0);

  /* Le Non du cadre cortex énonce le négatif du cortex, sans répondre la polarité normale */
  propre();
  var iC = cadre("Cortex — migration, lamination, ligne médiane");
  clic("grp", iC, "non");
  chk("cortex “Non” : négatif du cortex énoncé", neg("cortex") === "ok");
  chk("cortex “Non” : la lamination normale sous les gyri reste à répondre",
      !E.signes.laminationNormaleSousGyri && !blocable(par(SIGNES, "laminationNormaleSousGyri")));
  clic("grp", iC, "non");
  pose("heterotopieStriee", POS);
  chk("une hétérotopie striée met le négatif du cortex en défaut", neg("cortex") === "ko");

  /* ── Surcharge : la famille, jamais la maladie ───────────────────────────── */
  propre();
  pose("neuroneBallonise", POS);
  chk("un seul signe suffit à poser la FAMILLE", tenue("surchargeNonTypable"));
  chk("et il ne nomme aucune maladie", crTient("maladie non typable sur la lame"));
  chk("aucune maladie de surcharge n'est nommée par une association", !tenue("gaucher"));
  chk("le PAS est proposé", suggerer().pas === 1);
  chk("le congelé est proposé tant qu'il n'est pas coché", suggerer().congelation === 1);
  pose("cellulesGaucher", POS); pose("neuronophagie", POS);
  chk("la seule exception documentée se lit", tenue("gaucher"));
  chk("le CD68 est déjà au catalogue du service", suggerer().cd68 === 1);

  /* ── Motoneurone : le diagnostic se fait à la moelle, pas au muscle ──────── */
  propre();
  pose("chromatolyseMotoneurones", POS); pose("noyauxMoteursBulbaires", POS);
  chk("sans perte des cornes antérieures, l'atteinte du motoneurone ne tient pas",
      !tenue("motoneuroneMedullaire") && lue("motoneuroneMedullaire"));
  pose("perteCornesAnterieures", POS);
  chk("l'atteinte du motoneurone se lit sur la moelle", tenue("motoneuroneMedullaire"));
  chk("la divergence de la fiche muscle est déplacée, pas tranchée",
      crTient("le diagnostic se fait à la moelle, pas au muscle"));
  chk("noyaux bulbaires et colonne de Clarke sont dans l'association",
      par(DIAGS, "motoneuroneMedullaire").signes.indexOf("colonneClarke") >= 0 && suggerer().cresyl === 1);
  propre();
  pose("chromatolyseThalamique", POS);
  chk("verbatim : la chromatolyse thalamique seule tient le repli, moelle absente", tenue("repliThalamique"));
  pose("gangliRachidiensChromatolyse", POS);
  chk("le repli thalamique tient sans la moelle", tenue("repliThalamique"));
  chk("la coupe thalamique est déjà dans le prélèvement standard",
      par(DIAGS, "repliThalamique").stop.indexOf("prélèvement sus-tentoriel standard") >= 0);

  /* ── Moelle fendue : deux types, un seul critère ─────────────────────────── */
  propre();
  pose("deuxHemiMoellesUnSac", POS); pose("hydromyelie", POS);
  chk("un seul sac dural : type II", tenue("splitCordII"));
  chk("et pas le type I", !tenue("splitCordI"));
  chk("le vocabulaire n'est pas réconcilié",
      par(DIAGS, "splitCordII").stop.indexOf("Vocabulaire NON") >= 0);

  /* ── Lésion acquise et sa chronologie ────────────────────────────────────── */
  propre();
  set("sa", "17");
  pose("caviteSansGliose", POS); pose("rarefactionNeuronale", POS);
  chk("une cavité sans gliose reste compatible avec l'acquis", tenue("lesionAcquise"));
  chk("17 CR sur 176 écrivent le négatif vide",
      par(DIAGS, "lesionAcquise").stop.indexOf("17 CR sur 176") >= 0);
  pose("glioseReactionnelle", NEG);
  chk("le négatif de gliose posé à 17 SA sort en défaut", crTient("avant 20 SA il est VIDE") && neg("gliose") === "ko");
  set("sa", "30");

  /* ── Hémorragie de la matrice : une lésion bornée dans le temps ──────────── */
  propre();
  pose("hemorragieMatrice", POS); pose("matricePersistante", POS);
  chk("l'hémorragie de matrice se lit avec sa fenêtre", tenue("hemorragieMatriceGerm"));
  chk("la fenêtre hémorragique est celle de la matrice",
      crTient("La fenêtre de vulnérabilité hémorragique coïncide"));

  /* ── Myéline : le critère existe, la technique n'est pas documentée ──────── */
  propre();
  pose("retardMyelinisation", POS); pose("sansMacrophagesMyeline", NEG);
  chk("verbatim : macrophages chargés de myéline vus, le retard infectieux ne tient pas",
      !tenue("retardMyelinisationInfectieux"));
  pose("leucomalacie", NEG);
  chk("macrophages vus : négatif de la substance blanche en défaut", neg("substanceBlanche") === "ko");
  pose("sansMacrophagesMyeline", POS);
  chk("verbatim : sans macrophages chargés de myéline, le retard infectieux se lit",
      tenue("retardMyelinisationInfectieux") && neg("substanceBlanche") === "ok");
  chk("le critère différentiel est négatif", crTient("sans macrophages chargés de myéline"));
  chk("la divergence LFB / IHC est portée dans les deux sens",
      suggerer().lfb === 1 && suggerer().ihcMyeline === 1 &&
      par(TECHNIQUES, "lfb").l.indexOf("DIVERGENCE NON tranchée") >= 0);
  chk("myéline jugée sans coloration : négatif en défaut", neg("myeline") === "ko");
  clic("tech", "ihcMyeline");
  chk("myéline jugée avec une coloration demandée : négatif énoncé", neg("myeline") === "ok");
  clic("tech", "ihcMyeline");
  chk("la myéline ne se répond pas d'un Non en bloc", !blocable(par(SIGNES, "retardMyelinisation")));

  /* ── Négatifs de maturation : datés, et par étage ────────────────────────── */
  propre();
  pose("laminaVermis", NEG);
  chk("lamina notée à un seul étage : en défaut", neg("laminaDeuxEtages") === "ko");
  pose("laminaHemisphere", POS);
  chk("lamina notée aux deux étages : énoncé", neg("laminaDeuxEtages") === "ok");
  chk("les deux observations de lamina se répondent seules",
      !blocable(par(SIGNES, "laminaVermis")) && !blocable(par(SIGNES, "laminaHemisphere")));
  pose("matricePersistante", NEG);
  chk("matrice notée avec l'âge : énoncé", neg("matriceAge") === "ok");
  set("sa", "");
  chk("matrice notée sans l'âge : en défaut", neg("matriceAge") === "ko" && crTient("SANS l'âge en regard"));
  set("sa", "30");
  pose("sousPlaquePersistante", POS);
  chk("sous-plaque persistante : négatif en défaut", neg("sousPlaque") === "ko");
  propre();

  /* ── Hors lame : le renvoi se répond oui ou non, jamais d'un Non en bloc ── */
  chk("renvoi non répondu : négatif ouvert", neg("renvoiNeuropath") === null);
  pose("neuropathDiffere", POS);
  chk("renvoi répondu oui : négatif énoncé", neg("renvoiNeuropath") === "ok");
  pose("neuropathDiffere", NEG);
  chk("renvoi répondu non : négatif énoncé aussi", neg("renvoiNeuropath") === "ok");
  ote("neuropathDiffere");
  chk("renvoi hors du Non en bloc", !blocable(par(SIGNES, "neuropathDiffere")));

  /* ── Divergences portées, jamais arbitrées ───────────────────────────────── */
  chk("divergence corticale 20-22 contre 24 portée",
      par(STADES, "dentelCrenele").note.indexOf("DIVERGENCE NON") >= 0);
  chk("divergence de la lamina dissecans portée",
      par(STADES, "sixCouches").note.indexOf("DIVERGENCE NON") >= 0);
  chk("les deux fenêtres de la matrice ne sont pas confondues",
      par(STADES, "matriceInvolution").note.indexOf("Épaisseur et prolifération ne culminent pas") >= 0);
  chk("l'incertitude d'unité pèse sur toute avance", AVANCE_NOTE.indexOf("problème d'UNITÉ") >= 0);
  chk("verbatim : cône — plus bas que le rachis lombaire moyen, 27 semaines d'ernst non converties en SA",
      /plus bas que le rachis lombaire moyen/.test(par(SIGNES, "coneNiveau").l) &&
      /27 semaines \[non convertible\]/.test(par(SIGNES, "coneNiveau").l) && !/SA/.test(par(SIGNES, "coneNiveau").l));
  chk("verbatim : négatif du tronc borné — olives crénelées au 3ᵉ trimestre",
      /crénelées au 3ᵉ trimestre/.test(par(NEGATIFS, "tronc").l) && par(NEGATIFS, "tronc").p.indexOf("contour lisse à 17-18") >= 0);
  propre();
  pose("rosettesEpendymaires", POS); pose("herniationCervelet", POS);
  chk("verbatim : sans aqueduc rétréci, la sténose de l'aqueduc ne tient pas", !tenue("stenoseAqueduc"));
  ote("rosettesEpendymaires"); pose("aqueducStenose", POS);
  chk("verbatim : l'aqueduc rétréci est le pivot de la sténose", tenue("stenoseAqueduc") &&
      par(DIAGS, "stenoseAqueduc").cle === "aqueducStenose");
  propre();

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

  /* Le nom se déduit des signes — il ne se coche pas */
  chk("aucun bouton ne porte un diagnostic",
      DIAGS.every(function(d){ return !document.querySelector('[data-act="les"][data-k="' + d.k + '"]'); }));

  /* ── Branchement FOETO ───────────────────────────────────────────────────── */
  chk("v2 : libellé venu de FOETO",
      par(SIGNES, "vaguesAmasNeuronaux").l === "Désorganisation complète de la lamination en vagues et amas neuronaux");
  chk("v2 : code FOETO du terme verbatim", codesDe(par(SIGNES, "chromatolyseThalamique"))[0] === "FOETO:PF.CER-MAL-285");
  chk("v2 : HPO arbitré venu de la base", par(SIGNES, "glioseReactionnelle").hpo === "HP:0002171");
  chk("v2 : constat de fiche sans terme non marqué hors fiche",
      !par(SIGNES, "hydromyelie").horsFiche && !par(SIGNES, "laminationNormaleSousGyri").horsFiche);
  chk("v2 : aucun signe hors fiche", SIGNES.every(function(x){ return !x.horsFiche; }));
  chk("v2 : terme maladie sur l'association", par(DIAGS, "lissencephalieII").foeto[0] === "FOETO:PF.CER-MAL-191");
  chk("v2 : ballonisation et chromatolyse fondues en un signe",
      !par(SIGNES, "ballonisationMotoneurone") && par(SIGNES, "chromatolyseMotoneurones").foeto === "FOETO:PF.CER-CLA-199");
  chk("v2 : blocs lus en §02", BLOCS_LUS && !$("blocsBloc").hidden);

  propre();
  niveau("trois"); gyre("conforme");
  set("sa", "30");
}
