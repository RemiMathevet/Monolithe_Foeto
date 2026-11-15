/* Grille de lecture — oreille (rocher, caisse, conduit). VERSION 2 (2.0.0).
   Migration de oreille.js (1.0.1) sur le patron rein v3.5 / poumon v2.1 :
   mode présence, termes FOETO fondus dans les signes et branchés (termes tagués
   verbatim), blocs lus en §02, ordre de lecture (LECTURE). La v1 reste
   publiée à côté tant que la v2 n'a pas été validée à l'usage.
   Fond : ~/Bureau/fiches_lecture/fiche_oreille.md (§1 à §9).
   Les divergences entre sources sont PORTÉES dans les champs, jamais arbitrées.

   Particularité de cet organe, inchangée : une seule source histologique.
   [keeling, ch. 34] décline — « The examination of the middle and inner ear
   structures in detail lies beyond the scope of the present chapter » — et
   [soffoet, ch. 3] n'ouvre pas le rocher. Aucune description n'est contredite,
   aucune n'est confirmée. Et le rocher n'est pas prélevé en routine : 0 des 176
   CR du corpus ne décrit l'oreille au microscope (§6.0). La grille porte ces deux
   limites (aide de la §04, TECH_NOTE, ce qu'il ne faut pas conclure) ; elle ne les comble pas.

   Ce que la v2 change, sans rien retrancher de la v1 :
   · signes = CONSTATS présent / absent / non regardé (ETATS = "presence",
     schéma 0.3.0) ; les lésions restent des associations, affichées, jamais
     cochées ;
   · FOETO : 14 constats de la fiche sont tagués ; 13 sont portés par un signe
     (fv). Le 14e, PF.ORL-INF-010 (atteinte virale de la strie vasculaire ET
     des macules), réunit deux signes v1 que la grille lit dans deux cadres
     (cochlée, vestibule) et dont l'association CMV compte les sites : il reste
     non branché, les deux signes portent fiche:"[ernst, ch. 31]". En plus, le
     terme NOR-089 (fragments otolithiques libres) porte le signe de même libellé.
     Termes maladie sur les associations : otite invasive (MAL-107), CMV
     (INF-015), malformation (MAL-106), AFIS (INF-013) ;
   · glandes séreuses ou muqueuses + cellules caliciformes nombreuses : deux
     signes v1 → un signe (metaplasieGlandes), parce que la fiche en fait UNE règle
     (seule règle binaire du chapitre) avec UN négatif, que FOETO la porte en
     un terme (MAL-098), et que les deux signes v1 allaient toujours ensemble
     (mêmes associations, à seuil 1 sur pivot : aucune ne change de verdict) ;
   · microtie ou anotie → microtie + anotie ; appendices ou tubercule
     prétragiens → appendices + tubercule (deux termes FOETO chacun) ; deux
     constats tagués entrent : oreilles basses et malformées, hémorragie
     sous-épendymaire, intraventriculaire et sous-arachnoïdienne ;
   · atrésie du conduit : libellé FOETO atrésie congénitale — la v1 écrivait
     atrésie ou sténose, la sténose n'est pas dans la fiche ;
   · les douze négatifs se DÉDUISENT (d'un signe, d'une donnée consignée) ; leurs
     intitulés restent ceux de la fiche, mot pour mot, mais sans guillemets
     (réservés aux citations de livre). Un défaut v1 qui décrivait l'état non
     fait passe dans p quand le négatif déduit a un autre défaut ;
   · LECTURE : sur-titres = les trois étages, dans l'ordre où la bisection
     horizontale les montre (externe → moyen → interne) ; cadres = cadres de
     pathologie de chaque étage, du faible au fort grossissement (mag,
     [expérience], à valider à l'usage). Variantes dans le cadre qu'elles miment.
     Contexte hors lame (macro, autre organe, placenta) avant la rétention ;
   · Fissure de Hyrtl ouverte : bloc:false — présente, elle est NORMALE avant 24
     semaines (unité source) ; un Non en bloc écrirait fermée à tort ;
   · rétention : en présence, tout critère non mauvais entre dans la liste
     du critère le plus avancé. L'oreille n'en a aucun qui date : la liste ne
     garde que la coupe lisible (q bon, comme en v1) ; cortiFragmente passe de
     q moyen à mauvais pour rester un Présent / Absent à côté des autres
     destructions. Aucun ne date, en v1 comme en v2 ;
   · prélèvement : ce qui qualifie la lecture, puis les critères de coupe ;
   · une association entre : AFIS (degré 4 du continuum, INF-013) ; une
     variante entre : quelques cellules muco-sécrétantes (§4.7, NOR-075), qui
     mime la métaplasie. */

/* 2.1.0 (2026-11-14) — lot FOETO, propositions relues par Kimi K3.1 Pro et vérifiées par script
   (verbatim mot pour mot dans la fiche) : 4 fenêtre(s) de terme — le « Non » en bloc ne répond plus
   un signe daté hors de sa fenêtre (seul : un par un) ; 16 code(s) FOETO existant(s) branché(s)
   (variantes, rétention, stades, mesures, associations) ; 6 code(s) créé(s) depuis le verbatim de la
   fiche. Les propositions jugées faibles ou fausses attendent le tri de Rémi. */
var ORGANE  = "oreille";
var TITRE   = "oreille — rocher, caisse du tympan et conduit auditif externe";
var SOURCE  = "fiche_oreille.md";
var MODULE  = "grille_oreille";
var VERSION = "2.1.0";
var SCHEMA  = "0.3.0";   /* 0.3.0 : signes present/absent, négatifs déduits */
var ETATS   = "presence";
var FOETO_DANS_SIGNES = true;
var PAIR    = true;
var BLOCS   = true;
var LECTURE = true;   /* cadres (CADRES), grossissement (mag), variantes dans leur cadre */

var TITRE_CR    = "OREILLE";
var STADE_TITRE = "Étape de maturation otologique atteinte";

/* Le KCl ne change rien à une datation qui n'existe pas : on l'écrit quand même,
   parce qu'un geste déclaré vaut mieux qu'un geste supposé. */
var KCL_TXT = "Fœticide par KCl déclaré. Aucune borne de rétention n'était de toute façon recevable sur " +
              "cet organe : l'oreille est absente des trois barèmes. Le geste se consigne, il ne retire " +
              "rien — il n'y avait rien à retirer.";

/* L'échelle contamine tout le §3 : elle est rappelée aux deux discordances. */
var ECHELLE = "aucune borne de maturation otologique n'est fiable à mieux que ± 2 semaines : [ernst, ch. 31] " +
              "emploie trois échelles d'âge dans le même chapitre et la fiche n'a pas pu établir laquelle " +
              "vaut où — selon que « weeks gestation » y vaut post-menstruel ou post-fertilisation, la borne " +
              "est N SA ou N + 2 SA";

var RETARD_NOTE = "Avant de conclure à un retard : " + ECHELLE + ". Vérifier aussi que la décalcification " +
                  "n'a pas effacé les fronts d'ossification, et que l'étage lu est bien celui que la borne décrit.";

var AVANCE_NOTE = "Avant de conclure à une avance : " + ECHELLE + ". Et une maturité cochléaire n'est pas un " +
                  "âge : la maturation part de la base du conduit cochléaire vers l'apex, « the time of " +
                  "complete maturation will depend upon where along the spiral the section is obtained ».";

var TECH_NOTE = "Les pointillés sont des propositions déduites des clics, jamais des prescriptions. Aucune " +
                "coloration n'est prescrite par la source : le Gram, le Grocott et l'argentique sont des " +
                "déductions de la fiche à partir des organismes nommés, et l'immunohistochimie anti-CMV sur " +
                "l'oreille n'est ni recommandée ni déconseillée — elle n'est pas mentionnée. Tout ce " +
                "paragraphe repose sur un témoin unique. Et : « All these histologic procedures are " +
                "complicated by multiple artifacts. »";

/* ── 02 · Prélèvement ─────────────────────────────────────────────────────────
   Seul organe de la série dont le prélèvement décide du contenu de la lame plus
   que la maladie. Ce qui qualifie la lecture d'abord ; puis les quatre incisions
   d'[ernst, ch. 31], dans l'ordre, avec les autres critères de coupe. */
var PRELEV = [
  { k:"planHorizontal", g:"Qualifie la lecture", l:"Bisection horizontale par les méats acoustiques externe et interne", grave:true,
    manque:"c'est le seul plan qui livre tous les compartiments en une coupe, et le seul qui coupe la " +
           "cochlée longitudinalement — donc plusieurs tours de spire à la fois, ce qu'il faut pour situer " +
           "le gradient de maturation" },
  { k:"pasDeRas", g:"Qualifie la lecture", l:"Aucune coupe au ras de la face interne du temporal", grave:true,
    manque:"la coupe à ras détruit ensemble l'anneau tympanique, la membrane tympanique et l'oreille " +
           "moyenne — exactement les trois structures que la lame était censée montrer" },
  { k:"decalcification", g:"Qualifie la lecture", l:"Décalcification surveillée et adaptée à la pièce",
    manque:"« carefully monitored and tailored to each specimen » : ni décalcifiant, ni durée, ni contrôle " +
           "de fin ne sont sourcés — et « Specimens from first-trimester and early second-trimester fetuses " +
           "may need no decalcification »" },
  { k:"poumon", g:"Qualifie la lecture", l:"Poumon et placenta du même fœtus lus en parallèle",
    manque:"la caisse se lit comme un poumon miniature — même entrée, même clairance : une discordance " +
           "entre les deux compartiments est une information, pas un détail" },
  { k:"incision1", g:"Critères de coupe — iront à la grille macro fixée",
    l:"Incision 1 — lambeau de scalp, conduit auditif externe transsecté", grave:true,
    manque:"c'est la seule incision qui décide si le conduit et la membrane tympanique seront sur la pièce" },
  { k:"incision2", g:"Critères de coupe — iront à la grille macro fixée",
    l:"Incision 2 — extrémité antéromédiale du rocher détachée de la selle et du clivus", grave:true,
    manque:"« It should be made flush against the side of the sella and clivus » — la cochlée est l'élément " +
           "le plus antéromédial : mal placée, cette incision l'ampute" },
  { k:"incision3", g:"Critères de coupe — iront à la grille macro fixée",
    l:"Incision 3 — plancher de la fosse crânienne moyenne, tegmen tympani inclus",
    manque:"« It should include all of the tegmen tympani. » — sans le toit de la caisse, ni récessus " +
           "épitympanique, ni tête du marteau, ni corps de l'enclume" },
  { k:"incision4", g:"Critères de coupe — iront à la grille macro fixée",
    l:"Incision 4 — bord inférieur de la paroi postérieure, orifice de l'aqueduc cochléaire inclus",
    manque:"le conduit périotique est la voie par laquelle une hémorragie sous-arachnoïdienne gagne " +
           "l'oreille interne : sans lui, l'hémorragie du labyrinthe n'a plus de mécanisme" },
  { k:"instrument", g:"Critères de coupe — iront à la grille macro fixée",
    l:"Bistouri ou scie Stryker pédiatrique — aucun burin",
    manque:"« The use of chisels should be avoided. » ; les petits ciseaux à os « may cause crushing and " +
           "fragmentation of the specimen », et « Adult Stryker saws are usually too large for use in " +
           "fetuses and newborns. »" },
  { k:"reperes", g:"Critères de coupe — iront à la grille macro fixée",
    l:"Repères retrouvés avant de couper : méat acoustique interne, extrémité sectionnée du conduit",
    manque:"la mauvaise orientation est l'un des trois défauts nommés par la source, avec l'écrasement et " +
           "le prélèvement incomplet" },
  { k:"cotes", g:"Critères de coupe — iront à la grille macro fixée",
    l:"Les deux rochers prélevés et repérés séparément",
    manque:"la microtie isolée est unilatérale à prédominance droite : une asymétrie ne se voit qu'en séparant" }
];

/* ── 04 · Rétention ───────────────────────────────────────────────────────────
   Ce bloc ne date rien, et c'est son contenu. L'oreille est absente de la Table
   15.6 [keeling, ch. 15], de la Table 37.1 [ernst, ch. 37] et des 23 critères de
   [Genest I]. Absent ≠ résistant ≠ fragile : absent = non évalué. Les lignes
   ci-dessous consignent une DESTRUCTION, mécanique ou autolytique, et le verdict
   ne produit aucune heure — il n'y en a aucune à produire.
   En présence, la liste déroulante ne porte que la coupe lisible ; les
   destructions se signalent une à une (q « mauvais » : aucune ne date). */
var INTERDIT = "l'organe est absent des trois barèmes de datation : ne pas écrire que l'oreille est bien " +
               "conservée, ce qui plaiderait contre une rétention prolongée — ce serait une interpolation " +
               "sans source";

var RETENTION = [
  { k:"coupeLisible", l:"Capsule otique retrouvée, coupe orientable", b:"non datable",
    d:"l'oreille est absente des trois barèmes", h:1, q:"bon",
    note:INTERDIT,
    alerte:"une coupe lisible atteste que la lecture est possible, elle n'atteste d'aucun délai" },
  { k:"cortiFragmente", fv:"FOETO:PF.ORL-NOR-078", l:"Organe de Corti fragmenté, en miettes ou absent", b:"non datable",
    d:"mécanique OU autolytique, non départagé", h:0, q:"mauvais",
    note:"la source écrit dans le même chapitre « typically severely fragmented » en coupes de routine et " +
         "« often autolyzed in routine sections even in otherwise well-preserved specimens » — les deux " +
         "imputations coexistent et ne sont pas hiérarchisées : divergence non arbitrée. La conséquence " +
         "pratique diffère pourtant : si c'est mécanique, un fœtus frais justifie une recoupe ; si c'est " +
         "autolytique, la recoupe ne servira à rien" },
  { k:"sacculeDetruit", fv:"FOETO:PF.ORL-NOR-095", l:"Saccule et utricule introuvables dans le vestibule", b:"non datable",
    d:"détruits au prélèvement dans presque tous les cas", h:0, q:"mauvais",
    note:"« usually destroyed in routine sections of even well-preserved specimens » et « destroyed during " +
         "removal and sectioning of the specimen as almost always occurs » : ce n'est pas une agénésie " +
         "vestibulaire, c'est le régime normal de la lame" },
  { k:"tympanNu", fv:"FOETO:PF.ORL-NOR-097", l:"Membrane tympanique réduite à ses deux plans conjonctifs", b:"non datable",
    d:"épiderme et endoderme tombés", h:0, q:"mauvais",
    note:"« has fallen off » des deux surfaces, décrit à 15 semaines (unité source) sur une pièce normale — " +
         "artefact, pas agénésie épithéliale" },
  { k:"caisseDesquamee", fv:"FOETO:PF.ORL-NOR-093", l:"Revêtement de la caisse absent par plaques", b:"non datable",
    d:"autolyse légère", h:0, q:"mauvais",
    note:"« often falls off owing to mild autolysis » — ne pas lire une desquamation inflammatoire" },
  { k:"reissnerEffondree", fv:"FOETO:PF.ORL-NOR-091", l:"Membrane de Reissner effondrée sur le plancher", b:"non datable",
    d:"décrite sur un cas normal", h:0, q:"mauvais",
    note:"« almost completely collapsed » sur une coupe donnée pour normale à 24 semaines (unité source)" },
  { k:"blocDetruit", fv:"FOETO:PF.ORL-NOR-080", l:"Anneau tympanique, tympan et oreille moyenne absents en bloc", b:"non datable",
    d:"signature de la coupe au ras interdite", h:0, q:"mauvais",
    note:"avant de conclure à une malformation majeure, exclure le geste : c'est exactement ce que produit " +
         "l'incision au ras de la face interne du temporal (§ prélèvement)" }
];

/* ── 05 · Maturation ──────────────────────────────────────────────────────────
   Les quatre processus qui restent à la période fœtale : recanalisation du
   bouchon méatique et maturation du tympan, résorption du mésenchyme de la
   caisse, ossification des osselets et de la capsule otique, achèvement des
   organes sensoriels. Tout le reste est en place et ne date plus rien.
   Bornes lues dans la lecture BASSE de l'échelle indéterminée : elles valent
   ± 2 semaines, la note de chaque stade le redit. */
var STADES = [
  { k:"bouchonPlein", l:"Bouchon méatique plein, tympan non jugeable, osselets non ossifiés", max:15,
    note:"« The mature histology of the tympanic membrane cannot be appreciated until the meatal plug is " +
         "removed at 13–18 weeks gestational age » : avant, il n'y a rien à juger" },
  { k:"recanalisation", l:"Bouchon méatique en cours de recanalisation, tympan à deux plans conjonctifs bien développés", max:18,
    note:"les deux couches conjonctives du tympan sont données bien développées à 15 semaines, unité source" },
  { k:"ossifDebut", l:"Ossification des osselets commencée (enclume puis marteau), capsule otique à taille adulte", max:20,
    note:"la capsule otique cartilagineuse atteint sa taille adulte à 16 semaines (unité source) ; son " +
         "ossification ne commence qu'alors, par sites multiples" },
  { k:"etrierOssifie", l:"Étrier ossifié, recanalisation méatique complète, tympan jugeable", max:26,
    note:"la platine de l'étrier ne vient pas du 2e arc comme le reste de l'osselet mais de la capsule " +
         "otique : un osselet peut être malformé sur sa partie arcale avec une platine normale" },
  { k:"ossifComplete", l:"Ossification des osselets et de la capsule otique complète, fissure de Hyrtl fermée", max:34,
    note:"« By 24 weeks, Hyrtl's fissure is closed » (unité source) — c'est la borne la plus lourde de " +
         "conséquences du calendrier, elle change l'interprétation d'une hémorragie de la caisse" },
  { k:"mesenchymeResorbe", l:"Mésenchyme de la caisse résorbé, lumière élargie, tympan secondaire trilamellaire", max:99,
    note:"la résorption n'est complète qu'APRÈS la naissance, et c'est alors seulement que les osselets " +
         "deviennent pleinement mobiles : au terme, du mésenchyme périossiculaire reste normal" }
];

/* ── 05 bis · Les deux axes catégoriels ───────────────────────────────────────
   1) L'étage présent sur la coupe. L'oreille est trois organes empilés et une
      lame n'en montre presque jamais les trois. Sans capsule otique retrouvée,
      la coupe n'a pas de topographie : verdict bloquant.
   2) La position de la coupe sur la spirale cochléaire. C'est le piège de
      datation propre à l'organe : la maturation part de la base vers l'apex. */
var ETAGES = [
  { k:"externe",  l:"Externe seul — conduit auditif externe et membrane tympanique", e:"e" },
  { k:"moyenne",  l:"Moyen seul — caisse, osselets, portion tympanique de la trompe", e:"m" },
  { k:"interne",  l:"Interne seul — capsule otique, cochlée, vestibule, canaux", e:"i" },
  { k:"externeMoyenne", l:"Externe et moyen", e:"em" },
  { k:"moyenneInterne", l:"Moyen et interne", e:"mi" },
  { k:"trois",    l:"Les trois étages — bisection horizontale par les deux méats", e:"emi" },
  { k:"nonIdentifiable", l:"Étage NON identifiable — capsule otique non retrouvée", e:"" }
];

var SPIRALE = [
  { k:"base",     l:"Tour basal du conduit cochléaire" },
  { k:"moyen",    l:"Tour moyen" },
  { k:"apex",     l:"Tour apical" },
  { k:"plusieurs", l:"Plusieurs tours sur la même coupe" },
  { k:"nonSituable", l:"Position sur la spirale non situable" }
];

var MESURE = {
  titre:"Étage présent sur la coupe, position sur la spirale, comptes",
  defLabel:"étage présent — sans capsule otique, pas de topographie",
  optLabel:"position de la coupe — la maturation va de la base vers l'apex",
  /* Au survol : les deux limites de l'organe, portées telles que la fiche les écrit. */
  aide:"La capsule otique est le repère : un liseré d'os très dense, souvent basophile, distinct du rocher — " +
       "dedans le labyrinthe, dehors le rocher. Une seule source histologique, [ernst, ch. 31] : aucune " +
       "description n'est contredite, aucune n'est confirmée. Le protocole de [soffoet, ch. 3] ne prélève " +
       "pas le rocher, et aucun des 176 CR du corpus ne décrit l'oreille au microscope : cette grille sert " +
       "le jour où le rocher est prélevé, elle ne dit pas qu'il faut le prélever. Aucune biométrie n'existe " +
       "pour cet organe : les comptes ci-dessous situent la coupe, ils ne se comparent à aucune norme.",
  defs:ETAGES, opts:SPIRALE,
  champs:[
    { id:"debris",  label:"Débris amniotiques de la caisse — degré 0 à 4", min:0, max:4, step:1 },
    { id:"tours",   label:"Tours de spire présents sur la coupe (2 ¾ au total)", min:0, max:3, step:0.25 },
    { id:"macules", label:"Macules otolithiques identifiées (0 à 2)", min:0, max:2, step:1 }
  ]
};

/* Le continuum du §5.1, mis en forme. Aucune source ne calibre le passage du
   degré 1 au degré 2 : la source oppose « small » et « excessive », rien de plus. */
var DEGRES = ["Absence de débris amniotique dans la caisse",
              "Faible quantité de débris amniotiques — registre NORMAL",
              "Débris amniotiques en excès — « an excessive amount of amniotic debris in the tympanic cavity " +
              "should suggest significant intrauterine fetal distress »",
              "Rétention avec réaction à corps étranger — « polypoid nodules attached to the ossicles or the " +
              "wall of the tympanic cavity »",
              "Débris inflammatoires aigus et/ou agents infectieux — « cocci, bacilli, fungi, and spirochetes »"];

function verdictMesure(){
  var et = E.mesure.def, sp = E.mesure.opt;
  var deb = E.mesure.v.debris, tours = E.mesure.v.tours, mac = E.mesure.v.macules;
  if (!et && !sp && deb == null && tours == null && mac == null)
    return { cls:"", txt:"Ni étage, ni position sur la spirale, ni compte — la lame n'est pas encore située." };

  var t = [], cls = "ok", res = [], ee = "";

  if (!et || et === "nonIdentifiable"){
    cls = "bad";
    t.push((et ? "Étage déclaré NON identifiable" : "Étage NON déclaré") + " : la lecture est BLOQUÉE. " +
           "Le repère est la capsule otique, « a thin rim of very dense, often basophilic, bone, which is " +
           "distinct from the petrous bone in which it is embedded » — dedans c'est le labyrinthe, dehors " +
           "c'est le rocher. Sans elle la coupe n'a pas de topographie : une macule se décrit sans être " +
           "nommée (« Cross sections of the saccular and utricular otolithic maculae are identical. »), et " +
           "aucune absence ne se conclut — sur cet organe une absence a deux causes, le geste de " +
           "prélèvement et l'autolyse, avant d'en avoir une troisième.");
  } else {
    ee = par(ETAGES, et).e;
    t.push("Étage lu : " + par(ETAGES, et).l.toLowerCase() + ".");
    if (ee === "e")
      t.push("C'est le seul territoire de l'organe dont l'histologie normale est entièrement décrite, " +
             "lisible sans décalcification lourde et dont les négatifs sont vérifiables — le rocher " +
             "complet est une autre décision.");
    if (ee.indexOf("m") < 0)
      res.push("l'étage moyen n'est pas sur la coupe : le continuum amniotique, l'otite invasive et la " +
               "règle des glandes ne sont ni retenus ni écartés");
    if (ee.indexOf("i") < 0)
      res.push("l'étage interne n'est pas sur la coupe : les trois cibles du CMV — strie vasculaire, " +
               "macule sacculaire, macule utriculaire — ne sont pas examinées");
  }

  if (ee.indexOf("i") >= 0 || sp){
    if (!sp || sp === "nonSituable"){
      if (cls === "ok") cls = "warn";
      res.push("position sur la spirale non établie — un organe de Corti immature ne date alors RIEN : " +
               "« the time of complete maturation will depend upon where along the spiral the section is " +
               "obtained », et une coupe apicale de 26 SA donne la même image qu'une coupe basale de 20 SA");
    } else {
      t.push("Position : " + par(SPIRALE, sp).l.toLowerCase() + ".");
      if (sp === "apex")
        t.push("La maturation part de la base : sur un tour apical, un organe de Corti incomplet est " +
               "attendu, pas retardé.");
      if (sp === "base")
        t.push("Sur un tour basal, la maturation est la plus avancée de toute la spirale : c'est la coupe " +
               "la moins indulgente pour un organe de Corti immature.");
      if (sp === "plusieurs")
        t.push("Plusieurs tours sur la même coupe : le gradient est visible, c'est la seule situation où " +
               "l'organe de Corti se juge.");
    }
  }

  if (deb != null){
    deb = Math.max(0, Math.min(4, Math.round(deb)));
    t.push("Débris amniotiques, degré " + deb + " : " + DEGRES[deb] + ".");
    if (deb >= 2){
      if (cls === "ok") cls = "warn";
      t.push("Aucune source ne calibre le passage du degré 1 au degré 2 : cette échelle met en forme une " +
             "opposition qualitative, elle n'est pas une gradation validée.");
    }
    if (deb >= 3)
      res.push("des polynucléaires dans la LUMIÈRE restent du continuum amniotique — l'otite moyenne " +
               "invasive se lit dans le mésenchyme, la muqueuse ou l'os : c'est un seuil de compartiment, " +
               "pas de quantité");
    if (ee && ee.indexOf("m") < 0)
      res.push("débris comptés alors que l'étage moyen n'est pas déclaré présent sur la coupe");
  } else if (ee.indexOf("m") >= 0){
    res.push("degré des débris amniotiques non renseigné — écrire la présence sans la quantité est " +
             "ininterprétable, seule la quantité porte l'information");
  }

  if (tours != null){
    t.push("Tours de spire présents : " + tours + " sur 2 ¾.");
    if (tours <= 1)
      res.push("un seul tour ne situe pas le gradient — la bisection horizontale par les deux méats donne " +
               "une coupe longitudinale de la cochlée, donc plusieurs tours à la fois");
  }

  if (mac != null){
    t.push("Macules otolithiques identifiées : " + mac + " sur 2.");
    if (mac > 0)
      t.push("Ne pas les nommer sur l'histologie : « They cannot be differentiated microscopically. » Les " +
             "deux seuls repères sont topographiques — le saccule est le plus près de la cochlée, et " +
             "chaque macule regarde l'autre. Cela ne fait rien perdre : le CMV atteint « the sensory " +
             "organs of the saccule and utricle », c'est-à-dire les deux.");
    if (mac === 0 && ee.indexOf("i") >= 0)
      t.push("Aucune macule retrouvée n'est pas une anomalie : les parois libres du labyrinthe sont ce qui " +
             "part en premier au prélèvement.");
  }

  if (!E.prelev.planHorizontal)
    res.push("plan de bisection horizontale non confirmé — l'étage lu peut n'être qu'un effet du plan de coupe");
  if (!E.prelev.pasDeRas)
    res.push("absence de coupe au ras non confirmée — un étage moyen manquant peut être un étage détruit");

  if (res.length){
    if (cls === "ok") cls = "warn";
    t.push("Réserves : " + res.join(" ; ") + ".");
  }
  return { cls:cls, txt:t.join(" ") };
}

/* ── Cadres — l'ordre où la bisection horizontale montre l'organe ───────────
   Sur-titre = étage, du conduit vers le labyrinthe ; dans chaque étage, les
   cadres de pathologie du faible au fort grossissement. Le vestibule a son
   cadre : ses parois libres partent presque toujours au prélèvement, et son
   « Non » ne doit pas empêcher celui de la cochlée. */
var C_HORS  = "Contexte hors lame — macro, autre organe, clinique";
var C_CAE   = "Conduit auditif externe et tympan";
var C_MALF  = "Caisse et osselets — malformation";
var C_LUM   = "Contenu de la caisse — débris, sang, germes";
var C_PAROI = "Mésenchyme, muqueuse et os de la caisse";
var C_COCH  = "Cochlée — Corti, strie, rampes";
var C_VEST  = "Vestibule, canaux et sac endolymphatique";

var CADRES = [
  { g:C_HORS, hors:true },
  { g:C_CAE,   sur:"Oreille externe" },
  { g:C_MALF,  sur:"Oreille moyenne" },
  { g:C_LUM,   sur:"Oreille moyenne" },
  { g:C_PAROI, sur:"Oreille moyenne" },
  { g:C_COCH,  sur:"Oreille interne" },
  { g:C_VEST,  sur:"Oreille interne" }
];
/* Une malformation, une annexe déplacée ou un bouchon n'ont pas d'étendue focale / diffuse. */
var GROUPES_SANS_ETENDUE = [C_CAE, C_MALF];

/* ── Variantes normales ───────────────────────────────────────────────────────
   Sur cet organe, la liste des variantes est aussi longue que celle des lésions :
   c'est le paragraphe qui empêche de lire une normalité comme une maladie.
   Chacune vit dans le cadre dont elle mime un signe. */
var VARIANTES = [
  { k:"hem", fv:"FOETO:PF.ORL-NOR-083", g:C_PAROI,       l:"Hématopoïèse extramédullaire dans le mésenchyme de la caisse" },
  { k:"debrisPeu", g:C_LUM,   l:"Faible quantité de débris amniotiques dans la caisse" },
  { k:"keratineCae", fv:"FOETO:PF.ORL-NOR-084", g:C_CAE, l:"Kératine libre dans le conduit auditif externe" },
  { k:"cilieCoins", g:C_PAROI, l:"Épithélium cilié pseudostratifié dans les coins et anfractuosités de la caisse" },
  { k:"reticulum", fv:"FOETO:PF.ORL-NOR-092", g:C_COCH,  l:"Réticulum périlymphatique résiduel du vestibule ou des canaux semi-circulaires" },
  { k:"maculeSansOtolithe", fv:"FOETO:PF.ORL-NOR-088", g:C_VEST, l:"Macule sans otolithe visible" },
  { k:"cerumineusesImmatures", fv:"FOETO:PF.ORL-NOR-076", g:C_CAE, l:"Glandes cérumineuses immatures" },
  { k:"sacFjord", fv:"FOETO:PF.ORL-NOR-094", g:C_VEST,   l:"Sac endolymphatique à paroi hérissée dans la dure-mère postérieure" },
  { k:"tectoriale", fv:"FOETO:PF.ORL-NOR-087", g:C_COCH, l:"Membrane tectoriale conservée au-dessus d'un organe de Corti fragmenté" },
  { k:"membraneInconnue", fv:"FOETO:PF.ORL-NOR-086", g:C_VEST, l:"Membrane fragmentée entre utricule et saccule, d'origine indéterminée" },
  { k:"liquideCaisse", g:C_LUM, l:"Caisse remplie de liquide amniotique" },
  { k:"mucoRares", fv:"FOETO:PF.ORL-NOR-075", g:C_PAROI, l:"Quelques cellules muco-sécrétantes dans l'épithélium de la caisse" }
];

/* ── Signes ───────────────────────────────────────────────────────────────────
   On coche ce qu'on voit, un signe à la fois. Aucun nom de maladie ici : les
   noms se lisent dans les associations. Un signe branché (fv) prend son libellé
   et son HPO dans FOETO ; fiche:"[…]" = constat de la fiche sans terme FOETO. */
var SIGNES = [
  /* — Contexte hors lame — macro, autre organe, clinique — */
  { k:"microtie",      fv:"FOETO:PF.ORL-MAL-099", g:C_HORS },
  { k:"anotie",        fv:"FOETO:PF.ORL-MAL-094", g:C_HORS },
  { k:"appendices",    fv:"FOETO:PF.ORL-MAL-095", g:C_HORS },
  { k:"tubercule",     fv:"FOETO:PF.ORL-MAL-101", g:C_HORS },
  { k:"oreillesBasses", fv:"FOETO:PF.ORL-MAL-100", g:C_HORS },
  { k:"anomAssociees", fiche:"[keeling, ch. 34]", g:C_HORS,
    l:"Anomalies associées : cardiovasculaires, fentes faciales, anophtalmie ou microphtalmie" },
  { k:"cmvAutre",      g:C_HORS, l:"Inclusions de type CMV sur un autre organe du même fœtus" },
  { k:"hemoFossePost", fv:"FOETO:PF.ORL-VAS-017", fiche:"[ernst, ch. 31]", g:C_HORS, l:"Hémorragie sous-arachnoïdienne de la fosse postérieure documentée" },
  { k:"hemoIntracranienne", fv:"FOETO:PF.ORL-VAS-009", g:C_HORS },
  { k:"abruptio",      fiche:"[ernst, ch. 31]", g:C_HORS, l:"Décollement placentaire aigu documenté" },
  /* — Conduit auditif externe et tympan — la règle des annexes, le bouchon — */
  { k:"atresieCae",    fv:"FOETO:PF.ORL-MAL-096", g:C_CAE, mag:"faible" },
  { k:"bouchonPersistant", fv:"FOETO:PF.ORL-MAL-158", seul:true, fiche:"[ernst, ch. 31]", g:C_CAE, mag:"faible", l:"Bouchon méatique encore plein" },
  { k:"tympanImmature", seul:true, fiche:"[ernst, ch. 31]", g:C_CAE, mag:"moyen", l:"Membrane tympanique immature, plans conjonctifs peu développés" },
  { k:"cerumineuseInterne", fv:"FOETO:PF.ORL-MAL-159", fiche:"[ernst, ch. 31]", g:C_CAE, mag:"moyen", l:"Glande cérumineuse dans la moitié INTERNE du conduit" },
  { k:"glandeSudorale", fv:"FOETO:PF.ORL-MAL-097", g:C_CAE, mag:"moyen",
    meta:"absolu de la source : il n'y en a nulle part" },
  /* — Caisse et osselets — malformation — */
  { k:"caisseMalformee", fiche:"[keeling, ch. 34]", g:C_MALF, mag:"faible", l:"Caisse du tympan malformée ou non individualisée" },
  { k:"osseletsMalformes", fiche:"[ernst, ch. 31]", g:C_MALF, mag:"faible", l:"Osselets malformés, fusionnés ou absents" },
  { k:"platineAnormale", fiche:"[ernst, ch. 31]", g:C_MALF, mag:"moyen", l:"Platine de l'étrier anormale",
    meta:"elle vient de la capsule otique, pas du 2e arc" },
  /* — Contenu de la caisse — le continuum amniotique, le sang — */
  { k:"debrisExces",   fiche:"[ernst, ch. 31]", g:C_LUM, mag:"faible", l:"Débris amniotiques en EXCÈS dans la caisse",
    meta:"seule la quantité porte l'information" },
  { k:"nodulesPolypoides", fv:"FOETO:PF.ORL-MAL-160", fiche:"[ernst, ch. 31]", g:C_LUM, mag:"faible", l:"Nodules polypoïdes sur les osselets ou la paroi de la caisse",
    meta:"réaction à corps étranger — plus probable chez le nouveau-né que chez le fœtus" },
  { k:"hemoCaisse",    fv:"FOETO:PF.ORL-VAS-008", g:C_LUM, mag:"faible" },
  { k:"hyrtlOuverte",  fiche:"[ernst, ch. 31]", bloc:false, g:C_LUM, mag:"moyen", l:"Fissure de Hyrtl encore ouverte sur la coupe",
    meta:"se ferme à 24 semaines, unité source — présente avant, elle est normale" },
  { k:"pnLumiere",     fv:"FOETO:PF.ORL-INF-020", fiche:"[ernst, ch. 31]", g:C_LUM, mag:"moyen", l:"Polynucléaires dans la LUMIÈRE de la caisse",
    meta:"degré 4 du continuum, pas une otite" },
  { k:"germes",        fv:"FOETO:PF.ORL-INF-011", g:C_LUM, mag:"fort" },
  /* — Mésenchyme, muqueuse et os de la caisse — le seuil topographique — */
  { k:"pnMesenchyme",  fv:"FOETO:PF.ORL-INF-012", g:C_PAROI, mag:"moyen",
    meta:"seuil de l'otite moyenne invasive — topographique, pas quantitatif" },
  { k:"metaplasieGlandes", fv:"FOETO:PF.ORL-MAL-098", g:C_PAROI, mag:"moyen",
    meta:"seule règle binaire du chapitre" },
  { k:"cilieBosses",   fv:"FOETO:PF.ORL-MAL-161", fiche:"[ernst, ch. 31]", g:C_PAROI, mag:"moyen", l:"Épithélium cylindrique cilié pseudostratifié sur une BOSSE de mésenchyme",
    meta:"normal dans les creux, pas sur les reliefs" },
  { k:"hemAbondante",  fiche:"[ernst, ch. 31]", g:C_PAROI, mag:"moyen", l:"Hématopoïèse extramédullaire au-delà de l'abondance attendue" },
  { k:"infiltratMonomorphe", fiche:"[ernst, ch. 31]", g:C_PAROI, mag:"moyen", l:"Infiltrat cellulaire monomorphe inattendu dans la caisse ou le rocher" },
  { k:"mitoses",       g:C_PAROI, mag:"fort", l:"Mitoses nombreuses dans l'infiltrat" },
  /* — Cochlée — Corti, strie, rampes — */
  { k:"hemoLabyrinthe", fv:"FOETO:PF.ORL-VAS-010", g:C_COCH, mag:"faible" },
  { k:"reticulumRampes", terme:[14, null], fiche:"[ernst, ch. 31]", g:C_COCH, mag:"moyen", l:"Réticulum périlymphatique persistant dans les RAMPES cochléaires",
    meta:"les rampes en sont vides dès la 12e semaine post-fertilisation ; au-delà, la source ne dit rien" },
  { k:"cortiImmature", seul:true, fiche:"[ernst, ch. 31]", g:C_COCH, mag:"fort", l:"Organe de Corti immature : cellules ciliées indifférenciées, tunnel non ouvert",
    meta:"ne date rien sans la position de la coupe sur la spirale" },
  { k:"inclusionsStrie", fiche:"[ernst, ch. 31]", g:C_COCH, mag:"fort", l:"Inclusions virales dans la strie vasculaire" },
  /* — Vestibule, canaux et sac endolymphatique — */
  { k:"otolithesLibres", fv:"FOETO:PF.ORL-NOR-089", g:C_VEST, mag:"moyen",
    meta:"le piège majeur : pris pour des germes" },
  { k:"inclusionsMacule", fiche:"[ernst, ch. 31]", g:C_VEST, mag:"fort", l:"Inclusions virales dans une macule otolithique" }
];

/* ── Associations — affichées, jamais cochées ─────────────────────────────── */
var DIAGS = [
  { k:"continuum", l:"Continuum amniotique de la caisse", cle:"debrisExces", min:1,
    signes:["debrisExces","nodulesPolypoides","metaplasieGlandes","pnLumiere","germes"],
    stop:" — la présence de débris est NORMALE, seule la quantité informe : « The histologic continuum of " +
         "normal aspiration of amniotic fluid, excessive aspiration of amniotic fluid, and amniotic fluid " +
         "infection sequence is one of the most common findings in sections of the ear ». Aucune source ne " +
         "calibre le passage du degré 1 au degré 2. Des polynucléaires dans la lumière ne font PAS une " +
         "otite. Et lire la caisse contre le poumon : même entrée, même clairance — une caisse chargée sur " +
         "un poumon propre est une discordance à écrire." },

  { k:"afis", l:"Séquence d'infection amniotique (AFIS) — degré 4 du continuum", fv:"FOETO:PF.ORL-INF-013", min:1,
    signes:["pnLumiere","germes"],
    stop:" — le degré 4 se lit dans la LUMIÈRE de la caisse : « acute inflammatory debris and infectious " +
         "agents—including cocci, bacilli, fungi, and spirochetes—may be found in the tympanic cavity ». Ce " +
         "n'est pas une otite : l'otite moyenne invasive se lit dans le mésenchyme, la muqueuse ou l'os. " +
         "Avant d'écrire des germes, écarter les fragments otolithiques libres — le compartiment tranche, " +
         "le labyrinthe membraneux n'est pas en continuité avec la cavité amniotique, la caisse l'est. Les " +
         "colorations sont des déductions de la fiche : la source nomme les organismes, elle ne prescrit " +
         "aucune coloration." },

  { k:"otiteInvasive", l:"Otite moyenne invasive", fv:"FOETO:PF.ORL-MAL-107", cle:"pnMesenchyme", min:1,
    signes:["pnMesenchyme","germes","metaplasieGlandes","cilieBosses"],
    stop:" — le seuil est de COMPARTIMENT, pas de quantité : l'infiltrat doit être dans le mésenchyme " +
         "embryonnaire, la muqueuse ou l'os sous-jacent. Avant de conclure, écarter l'hématopoïèse " +
         "physiologique : « A normal amount of extramedullary hematopoiesis should not be mistaken for " +
         "otitis media ». Un épithélium cilié pseudostratifié dans un coin de caisse est normal." },

  { k:"cmv", l:"Infection transplacentaire de type CMV", fv:"FOETO:PF.ORL-INF-015", min:2,
    signes:["inclusionsStrie","inclusionsMacule","cmvAutre"],
    stop:" — la cible est nommée et elle est triple : « Cytomegalovirus commonly involves the stria " +
         "vascularis of the cochlear duct » et « the sensory organs of the saccule and utricle ». Écrire " +
         "qu'il n'y a pas d'inclusion sans dire où revient à ne rien écrire. Aucune source ne prescrit " +
         "d'immunohistochimie anti-CMV sur l'oreille : elle n'est pas mentionnée. Rubéole, herpès, " +
         "toxoplasmose et Listeria atteignent aussi l'oreille, et [keeling, ch. 34] documente la surdité, " +
         "pas l'image histologique." },

  { k:"hemoMoyenne", l:"Hémorragie de l'oreille moyenne", cle:"hemoCaisse", min:2,
    signes:["hemoCaisse","hemoFossePost","hemoIntracranienne","hyrtlOuverte","abruptio"],
    stop:" — l'interprétation dépend du terme et d'elle seule : avant 24 semaines (unité source) la " +
         "fissure de Hyrtl est ouverte et le sang peut venir de la fosse postérieure ; « By 24 weeks, " +
         "Hyrtl's fissure is closed », et après 24 semaines la même image ne s'explique plus par cette " +
         "voie et demande une autre cause. Les deux mécanismes proposés — lésion hypoxique-ischémique et " +
         "passage direct depuis l'espace sous-arachnoïdien — ne sont pas arbitrés par la source." },

  { k:"hemoInterne", l:"Hémorragie de l'oreille interne", cle:"hemoLabyrinthe", min:2,
    signes:["hemoLabyrinthe","hemoFossePost","hemoIntracranienne","abruptio"],
    stop:" — le conduit périotique reste ouvert TOUTE la vie fœtale et néonatale : cette hémorragie " +
         "s'explique par la voie sous-arachnoïdienne à tout âge, contrairement à celle de la caisse. Ne " +
         "pas conclure la même chose des deux : « Acute abruptio placenta with subependymal, " +
         "intraventricular, and subarachnoid hemorrhage is especially likely to be associated with severe " +
         "hemorrhage of the middle and inner ears »." },

  { k:"malformation", l:"Malformation d'arc branchial ou de poche pharyngée", fv:["FOETO:PF.ORL-MAL-106","FOETO:PF.ORL-MAL-110"], min:2,
    signes:["atresieCae","osseletsMalformes","platineAnormale","caisseMalformee","microtie","anotie",
            "appendices","tubercule","oreillesBasses","anomAssociees"],
    stop:" — la source histologique ne donne AUCUNE description microscopique de malformation, seulement " +
         "l'avertissement technique : « special care in removing and sectioning the temporal bone may be " +
         "required to demonstrate many of these malformations ». La malformation est perdue par le " +
         "prélèvement avant d'être manquée par le microscope, et le seul procédé capable de la documenter " +
         "— coupes sériées et reconstruction 3-D — est déclaré hors périmètre par la source elle-même. " +
         "Ne pas décrire la platine avec le reste de l'étrier : elle n'a pas la même origine. La " +
         "fréquence des fentes, de la macrostomie et des réductions de membre augmente avec la sévérité " +
         "de la microtie. Oreilles basses et malformées : T13, T18, triploïdie, délétions autosomiques ; " +
         "le tubercule prétragien accessoire est un trait constant du syndrome de Goldenhar [keeling, ch. 34] " +
         "— des contextes, pas des images. Divergence de calendrier non arbitrée sur le pavillon : « The auricle is " +
         "completely formed by the middle of the tenth week » contre « fully formed by the fourth month »." },

  { k:"annexes", l:"Annexes déplacées du conduit auditif externe", min:1,
    signes:["cerumineuseInterne","glandeSudorale"],
    stop:" — « Sweat glands are not present in any part of the external auditory canal » : une glande " +
         "sudorale n'est une variante nulle part. Le passage d'un revêtement à l'autre est net — « the " +
         "abrupt change from the ceruminous-bearing epidermis of the outer part of the canal to the " +
         "nonceruminous-bearing epidermis of the inner part » — donc une cérumineuse dans la moitié " +
         "interne est un déplacement, pas une variante. Une glande cérumineuse immature, elle, est " +
         "normale : elles « do not become fully functional until puberty or adolescence »." },

  { k:"proliferation", l:"Infiltrat cellulaire à typer", cle:"infiltratMonomorphe", min:2,
    signes:["infiltratMonomorphe","mitoses","hemAbondante"],
    stop:" — poser d'abord l'hématopoïèse extramédullaire, qui est physiologique dans le mésenchyme de la " +
         "caisse. Ensuite seulement les quatre entités nommées : neuroblastome congénital, leucémie, " +
         "tératome, histiocytose langerhansienne — citées comme extensions possibles, sans aucune " +
         "description histologique locale." },

  { k:"immaturite", l:"Immaturité otologique apparente", cle:"cortiImmature", min:2,
    signes:["cortiImmature","tympanImmature","bouchonPersistant","reticulumRampes"],
    stop:" — ne pas dater le fœtus là-dessus. La maturation cochléaire va de la base vers l'apex : " +
         "« the time of complete maturation will depend upon where along the spiral the section is " +
         "obtained », et elle peut n'être complète qu'à 25 semaines ou plus tard chez certains fœtus. Le " +
         "tympan, lui, n'est jugeable qu'après retrait du bouchon méatique, et les deux sources divergent " +
         "de douze à dix-sept semaines sur cette borne : « removed at 13–18 weeks gestational age » " +
         "contre « The auricle develops around the external meatus, which begins to canalize, the first " +
         "branchial cleft at week 30 » — divergence portée, non arbitrée. Un réticulum persistant dans " +
         "les rampes sort de la description, mais aucune source ne dit ce que cela signifierait." },

  { k:"objetsLibres", l:"Objets basophiles libres dans une lumière", cle:"otolithesLibres", min:1,
    signes:["otolithesLibres","germes","pnLumiere"],
    stop:" — c'est le piège que la source qualifie elle-même de facile : « the otolithic membranes may be " +
         "fragmented and lie in the lumen », et on les prend pour des germes. Le compartiment tranche : le " +
         "labyrinthe membraneux n'est pas en continuité avec la cavité amniotique, la caisse l'est. Un " +
         "objet basophile libre dans le vestibule ne vient pas de la trompe d'Eustache. Et les otolithes " +
         "varient dans la même coupe, là où une population microbienne est monomorphe." }
];

/* ── Négatifs obligatoires — déduits ──────────────────────────────────────────
   Le corpus compte 176 CR avec microscopie et ZÉRO description otologique
   microscopique : ce ne sont pas des oublis à combler dans une pratique en
   cours, ce sont les négatifs que les sources rendent obligatoires le jour où
   l'organe est prélevé. Les intitulés sont ceux de la fiche, mot pour mot.
   Chacun se lit d'un signe répondu, ou d'une donnée consignée (auto). */
var NEGATIFS = [
  { k:"hem", l:"hématopoïèse extramédullaire d'abondance normale, sans inflammation",
    p:"le mésenchyme « contains variable amounts of extramedullary hematopoietic tissue » ; non qualifiée, " +
      "un infiltrat physiologique se lit comme une otite",
    ko:"hématopoïèse au-delà de l'abondance attendue, ou mésenchyme inflammatoire — l'hématopoïèse n'est " +
       "plus qualifiée de normale",
    auto:function(){
      var h = E.signes.hemAbondante, i = E.signes.pnMesenchyme;
      if (h === POS || i === POS) return false;
      return (h === NEG || E.variantes.hem) && i === NEG ? true : null; } },
  { k:"debris", l:"quantité de débris amniotiques dans la caisse : faible / excessive",
    p:"la présence est normale, seule la quantité informe",
    ko:"quantité NON écrite — un CR qui note la présence de débris sans la quantifier est ininterprétable",
    auto:function(){ return E.mesure.v.debris != null || E.signes.debrisExces || E.variantes.debrisPeu ? true : null; } },
  { k:"glandes", signe:"metaplasieGlandes",
    l:"absence de glandes séreuses ou muqueuses et absence de cellules caliciformes nombreuses dans la muqueuse de la caisse",
    p:"seule règle binaire du chapitre",
    ko:"glandes ou cellules caliciformes nombreuses PRÉSENTES — réponse métaplasique probable à un excès " +
       "de liquide amniotique ou à une infection" },
  { k:"pn", signe:"pnMesenchyme", l:"mésenchyme de la caisse, muqueuse et os sous-jacent : sans infiltrat à polynucléaires",
    p:"seuil topographique de l'otite invasive",
    ko:"infiltrat à polynucléaires dans le mésenchyme, la muqueuse ou l'os — otite moyenne invasive" },
  { k:"cmv", l:"strie vasculaire, macule sacculaire et macule utriculaire examinées, sans inclusion virale",
    p:"trois sites, pas un — écrire qu'il n'y a pas d'inclusion sans dire où revient à ne rien écrire",
    ko:"inclusion virale PRÉSENTE dans la strie vasculaire ou une macule otolithique",
    auto:function(){
      var a = E.signes.inclusionsStrie, b = E.signes.inclusionsMacule;
      return a === POS || b === POS ? false : a === NEG && b === NEG ? true : null; } },
  { k:"corti", l:"état de conservation de l'organe de Corti",
    p:"sa destruction est la règle, pas l'exception",
    ko:"état de conservation NON dit — un CR muet laisse croire que l'organe a été jugé ; dire qu'il est " +
       "non analysable est une information",
    auto:function(){ return E.retention.cortiFragmente ? true : null; } },
  { k:"saccule", l:"saccule et utricule : détruits par le prélèvement / conservés",
    p:"« usually destroyed in routine sections of even well-preserved specimens »",
    ko:"saccule et utricule NON qualifiés — introuvables n'est pas agénésique",
    auto:function(){ return E.retention.sacculeDetruit ? true : null; } },
  { k:"reticulum", l:"réticulum périlymphatique partiellement résorbé",
    p:"normal de 20 semaines au terme, et « may never be completely resorbed »",
    ko:"réticulum NON qualifié — un lecteur ultérieur le prendra pour un exsudat ou un retard de maturation",
    auto:function(){ return E.variantes.reticulum || E.signes.reticulumRampes === NEG ? true : null; } },
  { k:"cerumineuses", signe:"cerumineuseInterne", l:"pas de glande cérumineuse dans la moitié interne du conduit",
    p:"le passage d'un revêtement à l'autre est abrupt",
    ko:"glande cérumineuse dans la moitié interne — déplacement, pas variante" },
  { k:"sudorales", signe:"glandeSudorale", l:"pas de glande sudorale",
    p:"« Sweat glands are not present in any part of the external auditory canal »",
    ko:"glande sudorale dans le conduit — absolu de la source contredit : reprendre l'identification" },
  { k:"hyrtl", l:"fissure de Hyrtl : ouverte / fermée compte tenu du terme",
    p:"sans elle, l'hémorragie de la caisse n'est pas interprétable",
    ko:"fissure de Hyrtl NON située par rapport au terme — l'hémorragie de la caisse reste sans mécanisme",
    auto:function(){
      if (E.signes.hyrtlOuverte && num("sa") != null) return true;
      return E.signes.hemoCaisse === POS ? false : null; } },
  { k:"capsule", l:"capsule otique distincte du rocher, identifiée",
    p:"attestation que la coupe est orientable",
    ko:"capsule otique NON retrouvée — la coupe n'a pas de topographie : une macule se décrit, elle ne se " +
       "nomme pas",
    auto:function(){
      if (E.mesure.def === "nonIdentifiable") return false;
      return E.mesure.def || E.retention.coupeLisible === "present" ? true : null; } }
];

/* ── Techniques ──────────────────────────────────────────────────────────────
   Les colorations sont des DÉDUCTIONS de la fiche à partir des organismes
   nommés ; la source n'en prescrit aucune. */
var TECHNIQUES = [
  { k:"gram",      l:"Gram tissulaire", q:"cocci et bacilles de la caisse — coloration déduite" },
  { k:"grocott",   l:"Grocott", q:"champignons — coloration déduite" },
  { k:"argentique", l:"Imprégnation argentique", q:"spirochètes — coloration déduite" },
  { k:"ihcCmv",    l:"Immunohistochimie anti-CMV",
    q:"aucune source ne la prescrit sur l'oreille — l'ouvrir, ce n'est pas la rappeler" },
  { k:"decalcNulle", l:"Ne pas décalcifier",
    q:"1er et début de 2e trimestre — décalcifier serait une agression sans nécessité" },
  { k:"decalcSuivie", l:"Décalcification surveillée, adaptée à la pièce",
    q:"aucun décalcifiant, aucune durée, aucun contrôle de fin ne sont sourcés" },
  { k:"recoupe",   l:"Recoupe du bloc",
    q:"utile si la destruction est mécanique, inutile si elle est autolytique — indépartageable" },
  { k:"seriees",   l:"Coupes sériées sur pièce non fixée, scie de précision",
    q:"seule voie que la source associe à l'immunohistochimie — et qu'elle déclare hors périmètre" },
  { k:"recon3d",   l:"Reconstruction tridimensionnelle",
    q:"seul procédé décrit pour documenter une malformation — filière de recherche" },
  { k:"trompe",    l:"Excision élargie de la trompe d'Eustache",
    q:"les quatre incisions n'en rapportent qu'une portion" },
  { k:"genetique", l:"Prélèvement congelé pour génétique",
    q:"contexte syndromique — plus de 400 syndromes comportent une surdité" }
];

/* ── Propositions de techniques — déduites des clics, jamais imposées ─────── */
function suggerer(){
  var s = {};
  function vu(){ for (var i = 0; i < arguments.length; i++) if (E.signes[arguments[i]] === POS) return true; return false; }
  function ret(k){ return E.retention[k] === "present"; }
  function enDefaut(k){ return etatNegatif(par(NEGATIFS, k)) === "ko"; }

  if (vu("germes", "pnLumiere", "pnMesenchyme", "otolithesLibres")){ s.gram = 1; s.grocott = 1; s.argentique = 1; }
  if (vu("debrisExces", "nodulesPolypoides")) s.gram = 1;
  if (vu("inclusionsStrie", "inclusionsMacule", "cmvAutre")) s.ihcCmv = 1;
  if (vu("atresieCae", "osseletsMalformes", "platineAnormale", "caisseMalformee")){ s.seriees = 1; s.recon3d = 1; s.genetique = 1; }
  if (vu("microtie", "anotie", "appendices", "tubercule", "oreillesBasses", "anomAssociees")) s.genetique = 1;
  if (vu("infiltratMonomorphe", "mitoses")) s.seriees = 1;
  if (vu("cortiImmature", "tympanImmature", "bouchonPersistant")) s.recoupe = 1;

  /* Une destruction mécanique se rejoue au couteau ; une autolyse, non. Comme
     rien ne les sépare sur la lame, la recoupe se propose et ne s'impose pas. */
  if (ret("cortiFragmente") || ret("sacculeDetruit") || ret("blocDetruit")) s.recoupe = 1;
  if (ret("blocDetruit")) s.seriees = 1;

  /* v1 : lus sur les négatifs cochés « EN DÉFAUT » ; v2 : sur les négatifs déduits */
  if (enDefaut("cmv")) s.ihcCmv = 1;
  if (enDefaut("pn") || enDefaut("glandes")) s.gram = 1;
  if (enDefaut("capsule")) s.seriees = 1;

  /* La décalcification est un réglage par pièce, et le terme en décide. */
  var sa = num("sa");
  if (sa != null && sa < 16) s.decalcNulle = 1;
  if (sa != null && sa >= 16) s.decalcSuivie = 1;
  if (E.mesure.def === "moyenne" || E.mesure.def === "externeMoyenne") s.trompe = 1;
  return s;
}

/* ── Contrôles propres à l'oreille ────────────────────────────────────────── */
async function testsOrgane(chk, clic, set, crTient, pause){
  /* Le banc commun laisse des signes posés : on part d'un état voulu. */
  function pose(k, v){ if (E.signes[k] !== v) clic("les", k, v); }
  function ote(k){ if (E.signes[k]) clic("les", k, E.signes[k]); }
  function propre(){ SIGNES.forEach(function(x){ ote(x.k); }); }
  function tenue(k){ return associations().some(function(a){ return a.d.k === k && a.tenu; }); }
  function neg(k){ return etatNegatif(par(NEGATIFS, k)); }
  function niveau(v){ var s = $("retNiveau"); s.value = v; s.dispatchEvent(new Event("change", {bubbles:true})); }
  propre();

  /* La rétention ne produit aucune heure — parce qu'il n'y en a aucune */
  chk("aucune borne horaire", RETENTION.every(function(r){ return r.b === "non datable"; }));
  chk("aucun délai déguisé dans les critères",
      !/heure|jour|semaine/.test(JSON.stringify(RETENTION.map(function(r){ return r.b + " " + r.d; }))));
  chk("rétention : la liste ne porte que la coupe lisible",
      retDatables().length === 1 && retDatables()[0].k === "coupeLisible");
  niveau("coupeLisible");
  chk("verdict de rétention non datant", crTient("Rétention non datable") &&
      crTient("absente des trois barèmes"));
  chk("le négatif interdit est rappelé",
      crTient("ne pas écrire que l'oreille est bien conservée"));
  chk("coupe lisible : capsule énoncée", neg("capsule") === "ok");
  clic("ret", "cortiFragmente", "present");
  chk("Corti : les deux imputations sont portées",
      crTient("typically severely fragmented") && crTient("often autolyzed in routine sections"));
  chk("Corti fragmenté propose la recoupe", suggerer().recoupe === 1);
  chk("Corti : l'état de conservation est dit dès qu'il est répondu", neg("corti") === "ok");
  niveau("");
  chk("Corti seul : aucune borne, les deux imputations restent",
      crTient("Seuls des prédicteurs MAUVAIS") && crTient("often autolyzed in routine sections"));
  clic("ret", "cortiFragmente", "present");
  chk("Corti non répondu : négatif ouvert, jamais supposé", neg("corti") === null);

  /* Étage — le verdict bloquant de cet organe */
  set("sa", "26");
  set("m_tours", "2");
  chk("étage non déclaré : lecture bloquée", $("vMesure").className.indexOf("bad") >= 0 &&
      crTient("Étage NON déclaré") && crTient("la lecture est BLOQUÉE"));
  clic("mdef", "nonIdentifiable");
  chk("étage non identifiable : bloquant aussi", $("vMesure").className.indexOf("bad") >= 0 &&
      crTient("Étage déclaré NON identifiable"));
  chk("capsule non retrouvée : négatif en défaut", neg("capsule") === "ko" &&
      crTient("capsule otique NON retrouvée"));
  set("m_macules", "1");
  chk("sans capsule otique, la macule ne se nomme pas",
      crTient("une macule se décrit sans être nommée") &&
      crTient("They cannot be differentiated microscopically"));
  set("m_macules", "");
  chk("une absence a deux causes avant d'en avoir une troisième",
      crTient("le geste de prélèvement et l'autolyse, avant d'en avoir une troisième"));
  clic("mdef", "trois");
  chk("étage posé : blocage levé", $("vMesure").className.indexOf("bad") < 0);
  chk("étage posé : capsule énoncée", neg("capsule") === "ok");
  chk("les trois étages n'exonèrent pas de la spirale",
      crTient("where along the spiral the section is obtained"));
  clic("mopt", "apex");
  chk("coupe apicale : l'immaturité est attendue, pas retardée",
      crTient("un organe de Corti incomplet est attendu, pas retardé"));
  clic("mopt", "apex");
  clic("mopt", "plusieurs");
  chk("plusieurs tours : le gradient est visible", crTient("le gradient est visible"));

  /* Le degré des débris — une mise en forme, pas une gradation validée */
  chk("débris : sans quantité, négatif ouvert", neg("debris") === null);
  set("m_debris", "1");
  chk("degré 1 = registre normal", crTient("registre NORMAL"));
  chk("débris : la quantité écrite énonce le négatif", neg("debris") === "ok");
  set("m_debris", "2");
  chk("degré 2 non calibré", crTient("an excessive amount of amniotic debris") &&
      crTient("Aucune source ne calibre le passage du degré 1 au degré 2"));
  set("m_debris", "4");
  chk("degré 4 : la lumière n'est pas l'otite",
      crTient("c'est un seuil de compartiment, pas de quantité"));
  set("m_debris", "");
  clic("mdef", "trois");
  clic("mdef", "interne");
  chk("étage interne : le continuum n'est ni retenu ni écarté",
      crTient("ni retenus ni écartés"));
  clic("mdef", "interne");

  /* Aucune biométrie : le gabarit valeur/borne est inapplicable à cet organe */
  chk("aucun champ biométrique",
      MESURE.champs.every(function(c){ return !/µm|mm|épaisseur|hauteur|diamètre/.test(c.label); }));
  chk("deux axes catégoriels, pas trois", MESURE.defs.length > 0 && MESURE.opts.length > 0);
  chk("les deux limites de l'organe au survol", /témoin|seule source/.test(MESURE.aide) &&
      MESURE.aide.indexOf("176 CR") >= 0 && /ne dit pas qu'il faut le prélever/.test(MESURE.aide));

  /* L'asymétrie de Hyrtl : la même image ne dit pas la même chose aux deux termes */
  pose("hemoCaisse", POS); pose("hemoFossePost", POS);
  chk("hémorragie moyenne lue", tenue("hemoMoyenne"));
  chk("Hyrtl : avant et après 24 semaines",
      crTient("avant 24 semaines (unité source) la fissure de Hyrtl est ouverte") &&
      crTient("Hyrtl's fissure is closed"));
  chk("sang dans la caisse, Hyrtl non situé : négatif en défaut", neg("hyrtl") === "ko" &&
      crTient("l'hémorragie de la caisse reste sans mécanisme"));
  pose("hyrtlOuverte", NEG);
  chk("Hyrtl répondu au terme saisi : négatif énoncé", neg("hyrtl") === "ok");
  ote("hyrtlOuverte");
  ote("hemoCaisse");
  pose("abruptio", POS);
  chk("hémorragie moyenne : sans le sang de la caisse, pas d'association", !tenue("hemoMoyenne") &&
      crTient("signe pivot non coché : " + nomSigne("hemoCaisse")));
  ote("abruptio");
  pose("hemoLabyrinthe", POS);
  chk("hémorragie interne lue", tenue("hemoInterne"));
  chk("la voie périotique reste ouverte à tout âge",
      crTient("reste ouvert TOUTE la vie fœtale et néonatale"));
  propre();
  pose("hemoLabyrinthe", POS); pose("hemoIntracranienne", POS);
  chk("v2 : la triade intracrânienne compte pour l'hémorragie interne", tenue("hemoInterne"));
  propre();

  /* Le piège majeur : otolithes libres pris pour des germes */
  pose("otolithesLibres", POS);
  chk("objets libres lus", tenue("objetsLibres"));
  chk("le compartiment tranche",
      crTient("le labyrinthe membraneux n'est pas en continuité avec la cavité amniotique"));
  chk("des objets libres proposent Gram, Grocott et argentique",
      suggerer().gram === 1 && suggerer().grocott === 1 && suggerer().argentique === 1);
  propre();

  /* Le seuil de l'otite est topographique */
  pose("pnLumiere", POS);
  chk("polynucléaires dans la lumière : pas d'otite", !tenue("otiteInvasive"));
  chk("polynucléaires dans la lumière : degré 4, AFIS affichée", tenue("afis"));
  pose("pnMesenchyme", POS);
  chk("polynucléaires dans le mésenchyme : otite invasive", tenue("otiteInvasive"));
  chk("l'hématopoïèse normale est écartée d'abord",
      crTient("should not be mistaken for otitis media"));
  chk("otite : négatif pariétal en défaut", neg("pn") === "ko");
  propre();
  pose("germes", POS); pose("metaplasieGlandes", POS);
  chk("otite : sans le pivot pariétal, pas d'association", !tenue("otiteInvasive") &&
      crTient("signe pivot non coché : " + nomSigne("pnMesenchyme")));
  propre();

  /* Le « Non » de la paroi énonce les trois négatifs de premier rang qui s'y lisent */
  var iP = groupes().indexOf(C_PAROI);
  clic("grp", iP, "non");
  chk("paroi « Non » : hématopoïèse, glandes, polynucléaires énoncés",
      neg("hem") === "ok" && neg("glandes") === "ok" && neg("pn") === "ok");
  clic("grp", iP, "non");
  pose("hemAbondante", POS);
  chk("hématopoïèse au-delà de l'attendu : négatif en défaut", neg("hem") === "ko");
  propre();

  /* Le CMV a trois cibles nommées, et aucune IHC prescrite */
  pose("inclusionsStrie", POS); pose("inclusionsMacule", POS);
  chk("CMV lu sur deux cibles", tenue("cmv"));
  chk("les trois cibles sont nommées",
      crTient("stria vascularis of the cochlear duct") &&
      crTient("the sensory organs of the saccule and utricle"));
  chk("aucune IHC anti-CMV prescrite",
      par(TECHNIQUES, "ihcCmv").q.indexOf("aucune source ne la prescrit") >= 0);
  chk("le CMV propose quand même l'IHC, en l'ouvrant", suggerer().ihcCmv === 1);
  chk("CMV : une inclusion présente met le négatif en défaut", neg("cmv") === "ko");
  propre();
  pose("inclusionsStrie", NEG);
  chk("CMV : la strie seule n'énonce pas le négatif", neg("cmv") === null);
  pose("inclusionsMacule", NEG);
  chk("CMV : strie et macule répondues absentes → négatif énoncé", neg("cmv") === "ok");
  propre();

  /* Les absolus et les divergences, portées telles quelles */
  pose("glandeSudorale", POS);
  chk("la glande sudorale n'est une variante nulle part", tenue("annexes") &&
      crTient("Sweat glands are not present in any part of the external auditory canal"));
  chk("glande sudorale : négatif en défaut", neg("sudorales") === "ko");
  propre();
  chk("canalisation : 13–18 semaines contre semaine 30",
      par(DIAGS, "immaturite").stop.indexOf("13–18 weeks gestational age") >= 0 &&
      par(DIAGS, "immaturite").stop.indexOf("branchial cleft at week 30") >= 0);
  chk("pavillon : 10e semaine contre 4e mois",
      par(DIAGS, "malformation").stop.indexOf("middle of the tenth week") >= 0 &&
      par(DIAGS, "malformation").stop.indexOf("fully formed by the fourth month") >= 0);
  chk("malformation : la source déclare la solution hors périmètre",
      par(DIAGS, "malformation").stop.indexOf("hors périmètre") >= 0);
  chk("Corti : mécanique ou autolyse, non arbitré",
      par(RETENTION, "cortiFragmente").note.indexOf("divergence non arbitrée") >= 0);
  chk("l'échelle d'âge contamine les deux discordances",
      RETARD_NOTE.indexOf("± 2 semaines") >= 0 && AVANCE_NOTE.indexOf("± 2 semaines") >= 0);
  chk("un seul témoin histologique", TECH_NOTE.indexOf("témoin unique") >= 0);

  /* Le nom se déduit des signes — il ne se coche pas */
  chk("aucun bouton ne porte un diagnostic",
      DIAGS.every(function(d){ return !document.querySelector('[data-act="les"][data-k="' + d.k + '"]'); }));

  /* La décalcification suit le terme, elle n'est pas un protocole */
  set("sa", "14");
  chk("avant 16 SA : ne pas décalcifier", suggerer().decalcNulle === 1 && !suggerer().decalcSuivie);
  set("sa", "26");
  chk("pièce ossifiée : décalcification surveillée", suggerer().decalcSuivie === 1);

  /* Branchement FOETO */
  chk("v2 : libellé venu de FOETO",
      par(SIGNES, "germes").l === "Agents infectieux dans la caisse : cocci, bacilles, levures, spirochètes");
  chk("v2 : code FOETO du terme verbatim", codesDe(par(SIGNES, "hemoCaisse"))[0] === "FOETO:PF.ORL-VAS-008");
  chk("v2 : glandes et caliciformes, une règle, un terme",
      par(SIGNES, "metaplasieGlandes").foeto === "FOETO:PF.ORL-MAL-098" && !par(SIGNES, "caliciformes"));
  chk("v2 : microtie et anotie, deux termes",
      par(SIGNES, "microtie").foeto === "FOETO:PF.ORL-MAL-099" && par(SIGNES, "anotie").foeto === "FOETO:PF.ORL-MAL-094");
  chk("v2 : constat de fiche sans terme non marqué hors fiche",
      !par(SIGNES, "inclusionsStrie").horsFiche && !par(SIGNES, "inclusionsMacule").horsFiche);
  chk("v2 : signe de grille sans fiche marqué hors fiche",
      par(SIGNES, "mitoses").horsFiche === true && par(SIGNES, "cmvAutre").horsFiche === true);
  chk("v2 : termes maladie sur les associations",
      par(DIAGS, "otiteInvasive").foeto[0] === "FOETO:PF.ORL-MAL-107" &&
      par(DIAGS, "cmv").foeto[0] === "FOETO:PF.ORL-INF-015");
  chk("v2 : Hyrtl hors du « Non » en bloc", par(SIGNES, "hyrtlOuverte").bloc === false);
  chk("v2 : blocs lus en §02", BLOCS_LUS && !$("blocsBloc").hidden);
}
