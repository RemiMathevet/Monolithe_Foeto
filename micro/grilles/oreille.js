/* Grille de lecture — oreille (rocher, caisse, conduit).
   Fond : ~/Bureau/fiches_lecture/fiche_oreille.md (§1 à §9).
   Forme : gen_grille.py, calquée sur grille_poumon.html.
   Les divergences entre sources sont PORTÉES dans les champs, jamais arbitrées.
   Particularité de cet organe : une seule source histologique. [keeling, ch. 34]
   décline — « The examination of the middle and inner ear structures in detail
   lies beyond the scope of the present chapter » — et [soffoet, ch. 3] n'ouvre
   pas le rocher. Aucune description n'est contredite, aucune n'est confirmée. */

var ORGANE  = "oreille";
var TITRE   = "oreille — rocher, caisse du tympan et conduit auditif externe";
var SOURCE  = "fiche_oreille.md";
var MODULE  = "grille_oreille";
var VERSION = "1.0.1";
var PAIR    = true;

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

/* ── 01 · Prélèvement ─────────────────────────────────────────────────────────
   Seul organe de la série dont le prélèvement décide du contenu de la lame plus
   que la maladie. Les quatre incisions d'[ernst, ch. 31], dans l'ordre. */
var PRELEV = [
  { k:"incision1", l:"Incision 1 — lambeau de scalp, conduit auditif externe transsecté", grave:true,
    manque:"c'est la seule incision qui décide si le conduit et la membrane tympanique seront sur la pièce" },
  { k:"incision2", l:"Incision 2 — extrémité antéromédiale du rocher détachée de la selle et du clivus", grave:true,
    manque:"« It should be made flush against the side of the sella and clivus » — la cochlée est l'élément " +
           "le plus antéromédial : mal placée, cette incision l'ampute" },
  { k:"incision3", l:"Incision 3 — plancher de la fosse crânienne moyenne, tegmen tympani inclus",
    manque:"« It should include all of the tegmen tympani. » — sans le toit de la caisse, ni récessus " +
           "épitympanique, ni tête du marteau, ni corps de l'enclume" },
  { k:"incision4", l:"Incision 4 — bord inférieur de la paroi postérieure, orifice de l'aqueduc cochléaire inclus",
    manque:"le conduit périotique est la voie par laquelle une hémorragie sous-arachnoïdienne gagne " +
           "l'oreille interne : sans lui, l'hémorragie du labyrinthe n'a plus de mécanisme" },
  { k:"pasDeRas", l:"Aucune coupe au ras de la face interne du temporal", grave:true,
    manque:"la coupe à ras détruit ensemble l'anneau tympanique, la membrane tympanique et l'oreille " +
           "moyenne — exactement les trois structures que la lame était censée montrer" },
  { k:"instrument", l:"Bistouri ou scie Stryker pédiatrique — aucun burin",
    manque:"« The use of chisels should be avoided. » ; les petits ciseaux à os « may cause crushing and " +
           "fragmentation of the specimen », et « Adult Stryker saws are usually too large for use in " +
           "fetuses and newborns. »" },
  { k:"decalcification", l:"Décalcification surveillée et adaptée à la pièce",
    manque:"« carefully monitored and tailored to each specimen » : ni décalcifiant, ni durée, ni contrôle " +
           "de fin ne sont sourcés — et « Specimens from first-trimester and early second-trimester fetuses " +
           "may need no decalcification »" },
  { k:"planHorizontal", l:"Bisection horizontale par les méats acoustiques externe et interne", grave:true,
    manque:"c'est le seul plan qui livre tous les compartiments en une coupe, et le seul qui coupe la " +
           "cochlée longitudinalement — donc plusieurs tours de spire à la fois, ce qu'il faut pour situer " +
           "le gradient de maturation" },
  { k:"reperes", l:"Repères retrouvés avant de couper : méat acoustique interne, extrémité sectionnée du conduit",
    manque:"la mauvaise orientation est l'un des trois défauts nommés par la source, avec l'écrasement et " +
           "le prélèvement incomplet" },
  { k:"cotes", l:"Les deux rochers prélevés et repérés séparément",
    manque:"la microtie isolée est unilatérale à prédominance droite : une asymétrie ne se voit qu'en séparant" },
  { k:"poumon", l:"Poumon et placenta du même fœtus lus en parallèle",
    manque:"la caisse se lit comme un poumon miniature — même entrée, même clairance : une discordance " +
           "entre les deux compartiments est une information, pas un détail" }
];

/* ── 02 · Rétention ───────────────────────────────────────────────────────────
   Ce bloc ne date rien, et c'est son contenu. L'oreille est absente de la Table
   15.6 [keeling, ch. 15], de la Table 37.1 [ernst, ch. 37] et des 23 critères de
   [Genest I]. Absent ≠ résistant ≠ fragile : absent = non évalué. Les lignes
   ci-dessous consignent une DESTRUCTION, mécanique ou autolytique, et le verdict
   ne produit aucune heure — il n'y en a aucune à produire. */
var INTERDIT = "l'organe est absent des trois barèmes de datation : ne pas écrire que l'oreille est bien " +
               "conservée, ce qui plaiderait contre une rétention prolongée — ce serait une interpolation " +
               "sans source";

var RETENTION = [
  { k:"coupeLisible", l:"Capsule otique retrouvée, coupe orientable", b:"non datable",
    d:"l'oreille est absente des trois barèmes", h:1, q:"bon",
    note:INTERDIT,
    alerte:"une coupe lisible atteste que la lecture est possible, elle n'atteste d'aucun délai" },
  { k:"cortiFragmente", l:"Organe de Corti fragmenté, en miettes ou absent", b:"non datable",
    d:"mécanique OU autolytique, non départagé", h:0, q:"moyen",
    note:"la source écrit dans le même chapitre « typically severely fragmented » en coupes de routine et " +
         "« often autolyzed in routine sections even in otherwise well-preserved specimens » — les deux " +
         "imputations coexistent et ne sont pas hiérarchisées : divergence non arbitrée. La conséquence " +
         "pratique diffère pourtant : si c'est mécanique, un fœtus frais justifie une recoupe ; si c'est " +
         "autolytique, la recoupe ne servira à rien" },
  { k:"sacculeDetruit", l:"Saccule et utricule introuvables dans le vestibule", b:"non datable",
    d:"détruits au prélèvement dans presque tous les cas", h:0, q:"mauvais",
    note:"« usually destroyed in routine sections of even well-preserved specimens » et « destroyed during " +
         "removal and sectioning of the specimen as almost always occurs » : ce n'est pas une agénésie " +
         "vestibulaire, c'est le régime normal de la lame" },
  { k:"tympanNu", l:"Membrane tympanique réduite à ses deux plans conjonctifs", b:"non datable",
    d:"épiderme et endoderme tombés", h:0, q:"mauvais",
    note:"« has fallen off » des deux surfaces, décrit à 15 semaines (unité source) sur une pièce normale — " +
         "artefact, pas agénésie épithéliale" },
  { k:"caisseDesquamee", l:"Revêtement de la caisse absent par plaques", b:"non datable",
    d:"autolyse légère", h:0, q:"mauvais",
    note:"« often falls off owing to mild autolysis » — ne pas lire une desquamation inflammatoire" },
  { k:"reissnerEffondree", l:"Membrane de Reissner effondrée sur le plancher", b:"non datable",
    d:"décrite sur un cas normal", h:0, q:"mauvais",
    note:"« almost completely collapsed » sur une coupe donnée pour normale à 24 semaines (unité source)" },
  { k:"blocDetruit", l:"Anneau tympanique, tympan et oreille moyenne absents en bloc", b:"non datable",
    d:"signature de la coupe au ras interdite", h:0, q:"mauvais",
    note:"avant de conclure à une malformation majeure, exclure le geste : c'est exactement ce que produit " +
         "l'incision au ras de la face interne du temporal (§ prélèvement)" }
];

/* ── 03 · Maturation ──────────────────────────────────────────────────────────
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

/* ── 03 bis · Les deux axes catégoriels ───────────────────────────────────────
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

/* ── 05 · Variantes normales ──────────────────────────────────────────────────
   Sur cet organe, la liste des variantes est aussi longue que celle des lésions :
   c'est le paragraphe qui empêche de lire une normalité comme une maladie. */
var VARIANTES = [
  { k:"hem",        l:"Hématopoïèse extramédullaire dans le mésenchyme de la caisse" },
  { k:"debrisPeu",  l:"Faible quantité de débris amniotiques dans la caisse" },
  { k:"keratineCae", l:"Kératine libre dans le conduit auditif externe" },
  { k:"cilieCoins", l:"Épithélium cilié pseudostratifié dans les coins et anfractuosités de la caisse" },
  { k:"reticulum",  l:"Réticulum périlymphatique résiduel du vestibule ou des canaux semi-circulaires" },
  { k:"maculeSansOtolithe", l:"Macule sans otolithe visible" },
  { k:"cerumineusesImmatures", l:"Glandes cérumineuses immatures" },
  { k:"sacFjord",   l:"Sac endolymphatique à paroi hérissée dans la dure-mère postérieure" },
  { k:"tectoriale", l:"Membrane tectoriale conservée au-dessus d'un organe de Corti fragmenté" },
  { k:"membraneInconnue", l:"Membrane fragmentée entre utricule et saccule, d'origine indéterminée" },
  { k:"liquideCaisse", l:"Caisse remplie de liquide amniotique" }
];

/* ── 06 · Signes ──────────────────────────────────────────────────────────────
   On coche ce qu'on voit, un signe à la fois. Aucun nom de maladie ici : les
   noms se lisent en dessous, dans les associations. */
var SIGNES = [
  /* Caisse — le continuum amniotique et son seuil topographique */
  { k:"debrisExces",   l:"Débris amniotiques en EXCÈS dans la caisse",
    meta:"seule la quantité porte l'information" },
  { k:"nodulesPolypoides", l:"Nodules polypoïdes sur les osselets ou la paroi de la caisse",
    meta:"réaction à corps étranger — plus probable chez le nouveau-né que chez le fœtus" },
  { k:"metaplasieGlandes", l:"Glandes séreuses ou muqueuses dans la muqueuse de la caisse",
    meta:"seule règle binaire du chapitre" },
  { k:"caliciformes",  l:"Cellules caliciformes nombreuses dans la muqueuse de la caisse" },
  { k:"pnLumiere",     l:"Polynucléaires dans la LUMIÈRE de la caisse" },
  { k:"pnMesenchyme",  l:"Polynucléaires dans le MÉSENCHYME, la muqueuse ou l'os sous-jacent",
    meta:"seuil de l'otite moyenne invasive — topographique, pas quantitatif" },
  { k:"germes",        l:"Agents infectieux dans la caisse (cocci, bacilles, champignons, spirochètes)" },
  { k:"cilieBosses",   l:"Épithélium cylindrique cilié pseudostratifié sur une BOSSE de mésenchyme",
    meta:"normal dans les creux, pas sur les reliefs" },

  /* Infection transplacentaire */
  { k:"inclusionsStrie", l:"Inclusions virales dans la strie vasculaire" },
  { k:"inclusionsMacule", l:"Inclusions virales dans une macule otolithique" },
  { k:"cmvAutre",      l:"Inclusions de type CMV sur un autre organe du même fœtus" },

  /* Hémorragie */
  { k:"hemoCaisse",    l:"Hémorragie de la caisse du tympan" },
  { k:"hemoLabyrinthe", l:"Hémorragie du labyrinthe, espace périlymphatique" },
  { k:"hemoFossePost", l:"Hémorragie sous-arachnoïdienne de la fosse postérieure documentée" },
  { k:"hyrtlOuverte",  l:"Fissure de Hyrtl encore ouverte sur la coupe",
    meta:"se ferme à 24 semaines, unité source" },
  { k:"abruptio",      l:"Décollement placentaire aigu documenté" },

  /* Malformations — externes et d'arc */
  { k:"atresieCae",    l:"Atrésie ou sténose du conduit auditif externe" },
  { k:"osseletsMalformes", l:"Osselets malformés, fusionnés ou absents" },
  { k:"platineAnormale", l:"Platine de l'étrier anormale",
    meta:"elle vient de la capsule otique, pas du 2e arc" },
  { k:"caisseMalformee", l:"Caisse du tympan malformée ou non individualisée" },
  { k:"microtie",      l:"Microtie ou anotie à l'examen externe" },
  { k:"appendices",    l:"Appendices ou tubercule prétragiens" },
  { k:"anomAssociees", l:"Anomalies associées : cardiovasculaires, fentes faciales, anophtalmie ou microphtalmie" },

  /* Conduit auditif externe — la règle des annexes */
  { k:"cerumineuseInterne", l:"Glande cérumineuse dans la moitié INTERNE du conduit" },
  { k:"glandeSudorale", l:"Glande sudorale dans le conduit auditif externe",
    meta:"absolu de la source : il n'y en a nulle part" },

  /* Prolifération */
  { k:"infiltratMonomorphe", l:"Infiltrat cellulaire monomorphe inattendu dans la caisse ou le rocher" },
  { k:"mitoses",       l:"Mitoses nombreuses dans l'infiltrat" },
  { k:"hemAbondante",  l:"Hématopoïèse extramédullaire au-delà de l'abondance attendue" },

  /* Maturation et objets libres */
  { k:"cortiImmature", l:"Organe de Corti immature : cellules ciliées indifférenciées, tunnel non ouvert" },
  { k:"tympanImmature", l:"Membrane tympanique immature, plans conjonctifs peu développés" },
  { k:"bouchonPersistant", l:"Bouchon méatique encore plein" },
  { k:"reticulumRampes", l:"Réticulum périlymphatique persistant dans les RAMPES cochléaires",
    meta:"les rampes en sont vides dès la 12e semaine post-fertilisation ; au-delà, la source ne dit rien" },
  { k:"otolithesLibres", l:"Fragments de membrane otolithique libres dans la lumière du labyrinthe" }
];

/* ── 06 bis · Associations — affichées, jamais cochées ─────────────────────── */
var DIAGS = [
  { k:"continuum", l:"Continuum amniotique de la caisse", cle:"debrisExces", min:1,
    signes:["debrisExces","nodulesPolypoides","metaplasieGlandes","caliciformes","pnLumiere","germes"],
    stop:" — la présence de débris est NORMALE, seule la quantité informe : « The histologic continuum of " +
         "normal aspiration of amniotic fluid, excessive aspiration of amniotic fluid, and amniotic fluid " +
         "infection sequence is one of the most common findings in sections of the ear ». Aucune source ne " +
         "calibre le passage du degré 1 au degré 2. Des polynucléaires dans la lumière ne font PAS une " +
         "otite. Et lire la caisse contre le poumon : même entrée, même clairance — une caisse chargée sur " +
         "un poumon propre est une discordance à écrire." },

  { k:"otiteInvasive", l:"Otite moyenne invasive", cle:"pnMesenchyme", min:1,
    signes:["pnMesenchyme","germes","metaplasieGlandes","caliciformes","cilieBosses"],
    stop:" — le seuil est de COMPARTIMENT, pas de quantité : l'infiltrat doit être dans le mésenchyme " +
         "embryonnaire, la muqueuse ou l'os sous-jacent. Avant de conclure, écarter l'hématopoïèse " +
         "physiologique : « A normal amount of extramedullary hematopoiesis should not be mistaken for " +
         "otitis media ». Un épithélium cilié pseudostratifié dans un coin de caisse est normal." },

  { k:"cmv", l:"Infection transplacentaire de type CMV", min:2,
    signes:["inclusionsStrie","inclusionsMacule","cmvAutre"],
    stop:" — la cible est nommée et elle est triple : « Cytomegalovirus commonly involves the stria " +
         "vascularis of the cochlear duct » et « the sensory organs of the saccule and utricle ». Écrire " +
         "qu'il n'y a pas d'inclusion sans dire où revient à ne rien écrire. Aucune source ne prescrit " +
         "d'immunohistochimie anti-CMV sur l'oreille : elle n'est pas mentionnée. Rubéole, herpès, " +
         "toxoplasmose et Listeria atteignent aussi l'oreille, et [keeling, ch. 34] documente la surdité, " +
         "pas l'image histologique." },

  { k:"hemoMoyenne", l:"Hémorragie de l'oreille moyenne", cle:"hemoCaisse", min:2,
    signes:["hemoCaisse","hemoFossePost","hyrtlOuverte","abruptio"],
    stop:" — l'interprétation dépend du terme et d'elle seule : avant 24 semaines (unité source) la " +
         "fissure de Hyrtl est ouverte et le sang peut venir de la fosse postérieure ; « By 24 weeks, " +
         "Hyrtl's fissure is closed », et après 24 semaines la même image ne s'explique plus par cette " +
         "voie et demande une autre cause. Les deux mécanismes proposés — lésion hypoxique-ischémique et " +
         "passage direct depuis l'espace sous-arachnoïdien — ne sont pas arbitrés par la source." },

  { k:"hemoInterne", l:"Hémorragie de l'oreille interne", cle:"hemoLabyrinthe", min:2,
    signes:["hemoLabyrinthe","hemoFossePost","abruptio"],
    stop:" — le conduit périotique reste ouvert TOUTE la vie fœtale et néonatale : cette hémorragie " +
         "s'explique par la voie sous-arachnoïdienne à tout âge, contrairement à celle de la caisse. Ne " +
         "pas conclure la même chose des deux : « Acute abruptio placenta with subependymal, " +
         "intraventricular, and subarachnoid hemorrhage is especially likely to be associated with severe " +
         "hemorrhage of the middle and inner ears »." },

  { k:"malformation", l:"Malformation d'arc branchial ou de poche pharyngée", min:2,
    signes:["atresieCae","osseletsMalformes","platineAnormale","caisseMalformee","microtie","appendices","anomAssociees"],
    stop:" — la source histologique ne donne AUCUNE description microscopique de malformation, seulement " +
         "l'avertissement technique : « special care in removing and sectioning the temporal bone may be " +
         "required to demonstrate many of these malformations ». La malformation est perdue par le " +
         "prélèvement avant d'être manquée par le microscope, et le seul procédé capable de la documenter " +
         "— coupes sériées et reconstruction 3-D — est déclaré hors périmètre par la source elle-même. " +
         "Ne pas décrire la platine avec le reste de l'étrier : elle n'a pas la même origine. La " +
         "fréquence des fentes, de la macrostomie et des réductions de membre augmente avec la sévérité " +
         "de la microtie. Divergence de calendrier non arbitrée sur le pavillon : « The auricle is " +
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

/* ── 07 · Négatifs obligatoires ───────────────────────────────────────────────
   Le corpus compte 176 CR avec microscopie et ZÉRO description otologique
   microscopique : ce ne sont pas des oublis à combler dans une pratique en
   cours, ce sont les négatifs que les sources rendent obligatoires le jour où
   l'organe est prélevé. Les intitulés sont ceux de la fiche, mot pour mot. */
var NEGATIFS = [
  { k:"hem", l:"« hématopoïèse extramédullaire d'abondance normale, sans inflammation »",
    p:"le mésenchyme « contains variable amounts of extramedullary hematopoietic tissue »",
    ko:"hématopoïèse NON qualifiée — sans ce négatif, un infiltrat physiologique se lit comme une otite" },
  { k:"debris", l:"« quantité de débris amniotiques dans la caisse : faible / excessive »",
    p:"la présence est normale, seule la quantité informe",
    ko:"quantité NON écrite — un CR qui note la présence de débris sans la quantifier est ininterprétable" },
  { k:"glandes", l:"« absence de glandes séreuses ou muqueuses et absence de cellules caliciformes nombreuses dans la muqueuse de la caisse »",
    p:"seule règle binaire du chapitre",
    ko:"glandes ou cellules caliciformes nombreuses PRÉSENTES — réponse métaplasique probable à un excès " +
       "de liquide amniotique ou à une infection" },
  { k:"pn", l:"« mésenchyme de la caisse, muqueuse et os sous-jacent : sans infiltrat à polynucléaires »",
    p:"seuil topographique de l'otite invasive",
    ko:"infiltrat à polynucléaires dans le mésenchyme, la muqueuse ou l'os — otite moyenne invasive" },
  { k:"cmv", l:"« strie vasculaire, macule sacculaire et macule utriculaire examinées, sans inclusion virale »",
    p:"trois sites, pas un",
    ko:"les trois sites du CMV NON examinés — écrire qu'il n'y a pas d'inclusion sans dire où revient à " +
       "ne rien écrire" },
  { k:"corti", l:"« état de conservation de l'organe de Corti »",
    p:"sa destruction est la règle, pas l'exception",
    ko:"état de conservation NON dit — un CR muet laisse croire que l'organe a été jugé ; dire qu'il est " +
       "non analysable est une information" },
  { k:"saccule", l:"« saccule et utricule : détruits par le prélèvement / conservés »",
    p:"« usually destroyed in routine sections of even well-preserved specimens »",
    ko:"saccule et utricule NON qualifiés — introuvables n'est pas agénésique" },
  { k:"reticulum", l:"« réticulum périlymphatique partiellement résorbé »",
    p:"normal de 20 semaines au terme, et « may never be completely resorbed »",
    ko:"réticulum NON qualifié — un lecteur ultérieur le prendra pour un exsudat ou un retard de maturation" },
  { k:"cerumineuses", l:"« pas de glande cérumineuse dans la moitié interne du conduit »",
    p:"le passage d'un revêtement à l'autre est abrupt",
    ko:"glande cérumineuse dans la moitié interne — déplacement, pas variante" },
  { k:"sudorales", l:"« pas de glande sudorale »",
    p:"« Sweat glands are not present in any part of the external auditory canal »",
    ko:"glande sudorale dans le conduit — absolu de la source contredit : reprendre l'identification" },
  { k:"hyrtl", l:"« fissure de Hyrtl : ouverte / fermée compte tenu du terme »",
    p:"sans elle, l'hémorragie de la caisse n'est pas interprétable",
    ko:"fissure de Hyrtl NON située par rapport au terme — l'hémorragie de la caisse reste sans mécanisme" },
  { k:"capsule", l:"« capsule otique distincte du rocher, identifiée »",
    p:"attestation que la coupe est orientable",
    ko:"capsule otique NON retrouvée — la coupe n'a pas de topographie : une macule se décrit, elle ne se " +
       "nomme pas" }
];

/* ── 08 · Techniques ─────────────────────────────────────────────────────────
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
  function anormal(k){ return E.signes[k] === "anormal"; }
  function ret(k){ return E.retention[k] === "present"; }

  if (anormal("germes") || anormal("pnLumiere") || anormal("pnMesenchyme") || anormal("otolithesLibres")){
    s.gram = 1; s.grocott = 1; s.argentique = 1;
  }
  if (anormal("debrisExces") || anormal("nodulesPolypoides")) s.gram = 1;
  if (anormal("inclusionsStrie") || anormal("inclusionsMacule") || anormal("cmvAutre")) s.ihcCmv = 1;
  if (anormal("atresieCae") || anormal("osseletsMalformes") || anormal("platineAnormale") ||
      anormal("caisseMalformee")){ s.seriees = 1; s.recon3d = 1; s.genetique = 1; }
  if (anormal("microtie") || anormal("appendices") || anormal("anomAssociees")) s.genetique = 1;
  if (anormal("infiltratMonomorphe") || anormal("mitoses")) s.seriees = 1;
  if (anormal("cortiImmature") || anormal("tympanImmature") || anormal("bouchonPersistant")) s.recoupe = 1;

  /* Une destruction mécanique se rejoue au couteau ; une autolyse, non. Comme
     rien ne les sépare sur la lame, la recoupe se propose et ne s'impose pas. */
  if (ret("cortiFragmente") || ret("sacculeDetruit") || ret("blocDetruit")) s.recoupe = 1;
  if (ret("blocDetruit")) s.seriees = 1;

  if (E.negatifs.cmv === "present") s.ihcCmv = 1;
  if (E.negatifs.pn === "present" || E.negatifs.glandes === "present") s.gram = 1;
  if (E.negatifs.capsule === "present") s.seriees = 1;

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
  propre();

  /* La rétention ne produit aucune heure — parce qu'il n'y en a aucune */
  chk("aucune borne horaire", RETENTION.every(function(r){ return r.b === "non datable"; }));
  chk("aucun délai déguisé dans les critères",
      !/heure|jour|semaine/.test(JSON.stringify(RETENTION.map(function(r){ return r.b + " " + r.d; }))));
  clic("ret", "coupeLisible", "present");
  chk("verdict de rétention non datant", crTient("Rétention non datable") &&
      crTient("absente des trois barèmes"));
  chk("le négatif interdit est rappelé",
      crTient("ne pas écrire que l'oreille est bien conservée"));
  clic("ret", "cortiFragmente", "present");
  chk("Corti : les deux imputations sont portées",
      crTient("typically severely fragmented") && crTient("often autolyzed in routine sections"));
  chk("Corti fragmenté propose la recoupe", suggerer().recoupe === 1);
  clic("ret", "cortiFragmente", "present");
  clic("ret", "coupeLisible", "present");

  /* Étage — le verdict bloquant de cet organe */
  set("sa", "26");
  set("m_tours", "2");
  chk("étage non déclaré : lecture bloquée", $("vMesure").className.indexOf("bad") >= 0 &&
      crTient("Étage NON déclaré") && crTient("la lecture est BLOQUÉE"));
  clic("mdef", "nonIdentifiable");
  chk("étage non identifiable : bloquant aussi", $("vMesure").className.indexOf("bad") >= 0 &&
      crTient("Étage déclaré NON identifiable"));
  set("m_macules", "1");
  chk("sans capsule otique, la macule ne se nomme pas",
      crTient("une macule se décrit sans être nommée") &&
      crTient("They cannot be differentiated microscopically"));
  set("m_macules", "");
  chk("une absence a deux causes avant d'en avoir une troisième",
      crTient("le geste de prélèvement et l'autolyse, avant d'en avoir une troisième"));
  clic("mdef", "trois");
  chk("étage posé : blocage levé", $("vMesure").className.indexOf("bad") < 0);
  chk("les trois étages n'exonèrent pas de la spirale",
      crTient("where along the spiral the section is obtained"));
  clic("mopt", "apex");
  chk("coupe apicale : l'immaturité est attendue, pas retardée",
      crTient("un organe de Corti incomplet est attendu, pas retardé"));
  clic("mopt", "apex");
  clic("mopt", "plusieurs");
  chk("plusieurs tours : le gradient est visible", crTient("le gradient est visible"));

  /* Le degré des débris — une mise en forme, pas une gradation validée */
  set("m_debris", "1");
  chk("degré 1 = registre normal", crTient("registre NORMAL"));
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

  /* L'asymétrie de Hyrtl : la même image ne dit pas la même chose aux deux termes */
  pose("hemoCaisse", "anormal"); pose("hemoFossePost", "anormal");
  chk("hémorragie moyenne lue", tenue("hemoMoyenne"));
  chk("Hyrtl : avant et après 24 semaines",
      crTient("avant 24 semaines (unité source) la fissure de Hyrtl est ouverte") &&
      crTient("Hyrtl's fissure is closed"));
  ote("hemoCaisse");
  pose("hemoLabyrinthe", "anormal");
  chk("hémorragie interne lue", tenue("hemoInterne"));
  chk("la voie périotique reste ouverte à tout âge",
      crTient("reste ouvert TOUTE la vie fœtale et néonatale"));
  propre();

  /* Le piège majeur : otolithes libres pris pour des germes */
  pose("otolithesLibres", "anormal");
  chk("objets libres lus", tenue("objetsLibres"));
  chk("le compartiment tranche",
      crTient("le labyrinthe membraneux n'est pas en continuité avec la cavité amniotique"));
  chk("des objets libres proposent Gram, Grocott et argentique",
      suggerer().gram === 1 && suggerer().grocott === 1 && suggerer().argentique === 1);
  propre();

  /* Le seuil de l'otite est topographique */
  pose("pnLumiere", "anormal");
  chk("polynucléaires dans la lumière : pas d'otite", !tenue("otiteInvasive"));
  pose("pnMesenchyme", "anormal");
  chk("polynucléaires dans le mésenchyme : otite invasive", tenue("otiteInvasive"));
  chk("l'hématopoïèse normale est écartée d'abord",
      crTient("should not be mistaken for otitis media"));
  propre();

  /* Le CMV a trois cibles nommées, et aucune IHC prescrite */
  pose("inclusionsStrie", "anormal"); pose("inclusionsMacule", "anormal");
  chk("CMV lu sur deux cibles", tenue("cmv"));
  chk("les trois cibles sont nommées",
      crTient("stria vascularis of the cochlear duct") &&
      crTient("the sensory organs of the saccule and utricle"));
  chk("aucune IHC anti-CMV prescrite",
      par(TECHNIQUES, "ihcCmv").q.indexOf("aucune source ne la prescrit") >= 0);
  chk("le CMV propose quand même l'IHC, en l'ouvrant", suggerer().ihcCmv === 1);
  propre();

  /* Les absolus et les divergences, portées telles quelles */
  pose("glandeSudorale", "anormal");
  chk("la glande sudorale n'est une variante nulle part", tenue("annexes") &&
      crTient("Sweat glands are not present in any part of the external auditory canal"));
  propre();
  chk("canalisation : 13–18 semaines contre semaine 30",
      par(DIAGS, "immaturite").stop.indexOf("13–18 weeks gestational age") >= 0 &&
      par(DIAGS, "immaturite").stop.indexOf("branchial cleft at week 30") >= 0);
  chk("pavillon : 10e semaine contre 4e mois",
      par(DIAGS, "malformation").stop.indexOf("middle of the tenth week") >= 0 &&
      par(DIAGS, "malformation").stop.indexOf("fully formed by the fourth month") >= 0);
  chk("malformation : la source déclare la solution hors périmètre",
      par(DIAGS, "malformation").stop.indexOf("hors périmètre") >= 0);
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
}

