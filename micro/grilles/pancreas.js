/* Grille de lecture — pancréas fœtal.
   Fond : ~/Bureau/fiches_lecture/fiche_pancreas.md (§1 à §7 ; §9 porté, jamais arbitré).
   Forme : gen_grille.py, calquée sur grille_poumon.html.
   Les divergences entre sources sont PORTÉES dans les champs, jamais arbitrées.

   Deux choses que la coquille ne sait pas faire, et qui sont écrites ici plutôt
   que masquées :

   1. LE PANCRÉAS N'A PAS DE STADES. Aucune des trois sources n'en propose (§ 3).
      La coquille exige pourtant un tableau STADES ordonné. Les six rangs
      ci-dessous ne sont donc PAS des stades : ce sont les repères datés du
      RAPPORT STROMA / GLANDE et de la chronologie endocrine, et chacun le dit
      dans sa note. Conséquence tenue jusqu'au bout : « retard de maturation
      pancréatique » n'est pas écrivable (§ 9.3), et RETARD_NOTE le dit.

   2. LE PANCRÉAS N'A NI RANG NI HEURE de macération. Il est absent des dix rangs
      de la Table 15.6 (§ 2). La seule borne recevable est donc un REPORT depuis
      les autres organes du fœtus, comme au thymus et au muscle. La borne
      36–48 h employée par le service est portée telle quelle, à côté de la
      phrase d'ernst qui dit l'inverse — non tranchée (§ 9.1, § 9.17). */

var ORGANE  = "pancreas";
var TITRE   = "pancréas";
var SOURCE  = "fiche_pancreas.md";
var MODULE  = "grille_pancreas";
var VERSION = "1.0.1";

/* Organe médian impair : la latéralité est sans objet. Son remplaçant
   fonctionnel est le SIÈGE — tête ≠ corps ≠ queue — et il est au § 04, où il
   BLOQUE : « There is proportionately more endocrine tissue present in the body
   and the tail of the pancreas than in the head ». Un chiffre insulaire sans son
   siège ne se compare à rien. */
var PAIR = false;

var TITRE_CR    = "PANCRÉAS";
var STADE_TITRE = "Repères datés du rapport stroma / glande — une chronologie, PAS une échelle de stades";

var KCL_TXT = "Fœticide par KCl déclaré. Aucune source ouverte ne décrit d'effet pancréatique du geste — " +
              "et le pancréas n'a de toute façon aucune borne propre à perdre : il ne figure à aucun " +
              "des dix rangs de la Table 15.6 [keeling, ch. 15]. La borne à lire ici reste celle des " +
              "AUTRES organes du fœtus, et le KCl la frappe comme partout ailleurs.";

var PLAFOND = "plafond général : le barème de macération est « accelerated by fetal hydrops and " +
              "delivery-autopsy interval of >24 h, and decelerated by fetal gestational age <25/40 » " +
              "[keeling, ch. 15] — il se lit multi-organes, le pancréas n'en fait pas partie";

var HORS_TABLE = "le pancréas n'a ni rang ni heure : la Table 15.6 nomme dix organes dans l'ordre de " +
                 "perte de basophilie nucléaire — tubes corticaux rénaux, foie, myocarde, épithélium " +
                 "bronchique, cartilage trachéal, tube digestif, surrénale, rein — et le pancréas n'y " +
                 "figure à aucun rang [keeling, ch. 15]. Écrire « le pancréas perd sa basophilie vers " +
                 "X heures » serait une invention";

/* Le service date le pancréas UNE fois sur 176 CR, par voisinage, dans une phrase
   dont le seul chiffre est rénal. Constat, pas méthode (§ 9.3). */
var RETARD_NOTE = "⚠️ « retard de maturation pancréatique » n'est PAS écrivable aujourd'hui : aucune " +
                  "source ne fournit d'échelle permettant d'estimer un terme pancréatique (§ 9.3). Les " +
                  "rangs ci-dessus sont des repères de rapport stroma/glande, pas des stades. La seule " +
                  "forme attestée dans le corpus est « maturation pancréatique, cutanée conformes au " +
                  "terme » — et elle est écrite par voisinage, à l'intérieur d'une phrase dont le seul " +
                  "chiffre est rénal. Avant tout écart : vérifier le SIÈGE du bloc et la rétention.";

var AVANCE_NOTE = "Une avance apparente est d'abord un stroma lu à contre-terme : le tissu conjonctif " +
                  "est physiologiquement abondant jusqu'à mi-gestation, et un pancréas qui paraît " +
                  "compact avant le 3e trimestre est plus probablement une coupe pauvre en stroma " +
                  "qu'un pancréas avancé. Et sur un fœtus lysé, les îlots deviennent artificiellement " +
                  "nets quand l'exocrine se délite : c'est un contraste, pas une maturité.";

var TECH_NOTE = "Les pointillés sont des propositions déduites des clics, jamais des prescriptions. Deux " +
                "lignes ne sont JAMAIS proposées et figurent pour être lues : le rouge Sirius, qui n'est " +
                "pas documenté sur le pancréas (§ 9.16), et la datation pancréatique, qui n'existe pas. " +
                "Rien de coché ne veut pas dire absent : ça veut dire non regardé.";

/* ── 01 · Prélèvement ─────────────────────────────────────────────────────── */
var PRELEV = [
  { k:"troisSieges", l:"Trois sièges en bloc : tête (duodénum inclus), corps, queue", grave:true,
    manque:"« Samples should be obtained from the head (including the duodenum), body, and tail » " +
           "[ernst, ch. 6] — et sur un bloc unique « toute quantification endocrine est invalide », " +
           "parce que la densité insulaire varie d'un lobule à l'autre ET d'un siège à l'autre" },
  { k:"duodenum", l:"Duodénum présent sur le bloc de tête", grave:true,
    manque:"c'est le seul moyen de voir « Pancreatic tissue may be intermingled with the duodenal " +
           "muscularis » [keeling, ch. 22] — sans lui le pancréas annulaire n'est pas confirmable, et " +
           "le divisum ne se lit de toute façon pas sur une coupe" },
  { k:"queueHile", l:"Les 5 derniers millimètres de la queue, inclus AVEC le hile splénique", grave:true,
    manque:"« Il est important de prélever les 5 derniers millimètres de la queue du pancréas et de " +
           "l'inclure avec le hile splénique pour identifier ces anomalies évocatrices en premier lieu " +
           "d'une trisomie 13 » [soffoet, ch. 7] — ce bloc d'interface se perd si la queue est " +
           "sectionnée à distance de la rate" },
  { k:"pancreasRetrouve", l:"Pancréas effectivement retrouvé et mis en bloc", grave:true,
    manque:"« Le pancréas n'a pas été identifié dans la masse digestive » [corpus CR] s'écrit, ne se " +
           "laisse pas vide — et avant d'écrire agénésie il faut rouvrir la masse duodénale : " +
           "« in assessment of the pancreas, where a significant portion of the gland may remain with " +
           "the duodenum » [keeling, ch. 15]" },
  { k:"temoinAge", l:"Témoin apparié en âge disponible pour comparaison",
    manque:"c'est la seule parade que les livres proposent pour toute lecture endocrine, et elle " +
           "est organisationnelle : « sampling various parts of the pancreas, including head, neck and " +
           "tail, and comparison with age-matched controls is helpful in histological assessment » " +
           "[keeling, ch. 26]" },
  { k:"pas", l:"PAS disponible sur le bloc",
    manque:"c'est la coloration du matériel apical acineux de mucoviscidose, attendu « vers 20 SA » et " +
           "pas avant [soffoet, ch. 7]" },
  { k:"perls", l:"Perls disponible sur le bloc",
    manque:"le pancréas est un organe-cible du fer ET le témoin négatif du service : « pancréas Perls " +
           "négatifs » est ce qui restreint une surcharge au foie [corpus CR]" },
  { k:"blocsSupp", l:"Blocs pancréatiques supplémentaires si omphalocèle ou macrosomie",
    manque:"l'omphalocèle impose d'« orienter les prélèvements histologiques, en particulier pour le " +
           "pancréas, les surrénales » [soffoet, ch. 7]" },
  { k:"autresOrganes", l:"État de conservation des AUTRES organes du même fœtus noté", grave:true,
    manque:"le pancréas n'a pas de borne propre : la rétention se reporte des autres organes, elle ne " +
           "se mesure pas sur lui (§ 2)" },
  { k:"poidsFoetal", l:"Poids fœtal consigné, pour le seul chiffre normé de l'organe",
    manque:"la seule normale publiée du pancréas est indexée sur le POIDS FŒTAL, pas sur le terme " +
           "[soffoet, ch. 7] — sans le dénominateur, le poids pancréatique ne se lit pas" }
];

/* ── 02 · Rétention ───────────────────────────────────────────────────────────
   Report assumé, comme au thymus et au muscle : la seule ligne recevable vient
   des AUTRES organes. Et la divergence dominante de la fiche est ici — ernst
   décrit un organe bien conservé, le service s'en sert pour dater. Les deux
   lectures sont portées, aucune n'est arbitrée (§ 9.1, § 9.17). */
var RETENTION = [
  { k:"horsPancreas", l:"Rang de rétention établi sur les AUTRES organes du fœtus",
    b:"celle des autres organes", d:"lue hors pancréas, Table 15.6", h:1, q:"bon",
    note:HORS_TABLE, alerte:PLAFOND },
  { k:"basoPancreas", l:"Perte de basophilie nucléaire pancréatique cotée dans la séquence du service",
    b:"36–48 h, usage du service", d:"borne sans source livre", h:0, q:"moyen",
    note:"DIVERGENCE DOMINANTE, portée et NON tranchée (§ 9.1) : le service date sur cette perte, avec " +
         "une borne de 36 à 48 h qu'aucun livre de ce corpus ne fournit, et cite le pancréas en tête de " +
         "sa liste de pertes de basophilie [corpus CR] — alors qu'ernst ouvre son chapitre par " +
         "l'inverse, « the fetal pancreas does not undergo rapid postmortem autolysis », organe " +
         "« relatively well preserved » [ernst, ch. 6]. Le rang reste ouvert : absence de donnée ou " +
         "absence de valeur datante ? (§ 9.17)", alerte:PLAFOND },
  { k:"autolyse", l:"« Autolyse du pancréas » écrite comme lyse débutante",
    b:"—", d:"marqueur précoce en pratique, non établi", h:0, q:"mauvais",
    note:"le corpus l'écrit comme un signe de lyse DÉBUTANTE, donc précoce, et ernst dit l'organe " +
         "« relatively well preserved » : les deux énoncés portent sur le même objet et ne sont pas " +
         "départagés. Ce n'est donc pas une borne, c'est une observation à confronter aux autres organes" },
  { k:"cytoEndocrine", l:"Détail cytologique de la cellule endocrine non lisible",
    b:"—", d:"le premier axe qui tombe", h:0, q:"mauvais",
    note:"le postulat du gabarit ne s'applique pas ici, et pas à cause de la lyse : il n'y a pas de " +
         "maturation pancréatique à plafonner (§ 3). Ce qui tombe en premier est la nucléomégalie et la " +
         "taille insulaire — précisément le seul critère lésionnel chiffré de l'organe (§ 5.3). Ordre " +
         "d'effondrement proposé, NON sourcé livre (§ 9.2) : nucléomégalie et taille insulaire → " +
         "cytologie acineuse → distension canalaire → architecture lobulaire" },
  { k:"ilotsTropNets", l:"Îlots devenus « mieux visibles » parce que l'exocrine est délité",
    b:"—", d:"contraste artificiel, pas une borne", h:0, q:"mauvais",
    note:"chez le fœtus les îlots sont normalement mal circonscrits — « Fetal islets generally are not " +
         "as compact and well circumscribed as islets in individuals who are several months old » " +
         "[ernst, ch. 6] : des îlots trop nets sur un fœtus lysé sont un artefact avant d'être un signe" },
  { k:"retentionProlongee", l:"Rétention prolongée in utero déclarée par ailleurs",
    b:"—", d:"seule concession d'ernst, sans chiffre", h:0, q:"mauvais",
    note:"c'est la seule condition où ernst concède la mauvaise conservation du pancréas, et il ne " +
         "l'assortit d'aucune borne chiffrée [ernst, ch. 6]. À écrire, jamais à convertir en heures" },
  { k:"nonIdentifie", l:"Pancréas non identifié — recevabilité, pas rétention",
    b:"—", d:"limite de pièce", h:0, q:"mauvais",
    note:"« Le pancréas n'a pas été identifié dans la masse digestive » [corpus CR] : c'est un motif " +
         "d'indéterminabilité à écrire comme tel, et il impose de rouvrir la masse duodénale avant " +
         "toute phrase d'agénésie" }
];

/* ── 03 · Chronologie du rapport stroma / glande ──────────────────────────────
   SA = semaines d'aménorrhée = gestation + 2. Ce tableau est une CHRONOLOGIE
   D'ÉVÉNEMENTS et un gradient continu, pas une échelle de stades : le § 3 de la
   fiche l'établit comme son résultat le plus important. Les quatre vignettes
   d'ernst fig. 6.1 sont toutes à HES 10×, donc directement comparables entre
   elles — c'est ce qui rend le repère utilisable à l'œil. */
var STADES = [
  { k:"organogenese", max:12,
    l:"≈ 8–10 SA · fusion des deux bourgeons, première génération endocrine dans les septa",
    note:"repère chronologique, pas un stade : « The endocrine cells are seen first during the seventh " +
         "week as small clusters of cells on the outer surface of the ducts » [ernst, ch. 6] ; " +
         "organogenèse achevée à la semaine 8 de gestation = 10 SA [keeling, ch. 26]" },
  { k:"hormonesDetectables", max:18,
    l:"12–16 SA · glucagon et insuline détectables, β-cellules sensibles à la leucine et l'arginine",
    note:"repère chronologique, pas un stade, et il n'est PAS lisible à l'HES : ces rangs sont " +
         "immunohistochimiques et fonctionnels [keeling, ch. 26]. Rien de ce qui les date ne se voit " +
         "sur une lame de routine" },
  { k:"stromaAbondant", max:24,
    l:"18–22 SA · stroma abondant DANS et ENTRE les lobules — le normal du 2e trimestre",
    note:"le repère continu de l'organe : « Note the abundant connective tissue within and between " +
         "lobules, which is characteristic of the midtrimester pancreas » [ernst, ch. 6, légende " +
         "fig. 6.1a]. ⚠️ Une fibrose lue à ce terme est d'abord ce stroma : « La fibrose n'est pas " +
         "visible avant le troisième trimestre » [soffoet, ch. 7]. Seconde génération endocrine datée " +
         "18 SA par keeling, ≈ 15–18 SA par ernst dont les bornes du « 4e mois » ne sont pas " +
         "précisées — divergence d'unité, non tranchée (§ 9.4)" },
  { k:"ilotsPrimairesDefaits", max:34,
    l:"après 22 SA · les îlots primaires se désagrègent ; β non répondeuses au glucose avant 26 SA",
    note:"« These islets continue to enlarge until week 20, after which they disintegrate » " +
         "[keeling, ch. 26]. Une raréfaction insulaire à ce terme n'est donc pas une hypoplasie : " +
         "c'est le programme normal" },
  { k:"stromaDiminue", max:40,
    l:"34–38 SA · stroma diminué, conjonctif intralobulaire encore visible",
    note:"« The relative amount of connective tissue has diminished as the glandular elements increase. " +
         "Intralobular connective tissue still remains visible » [ernst, ch. 6, légende fig. 6.1b]" },
  { k:"lobulesCompacts", max:99,
    l:"≳ 40 SA · lobules compacts, conjonctif intralobulaire minime",
    note:"« Lobules are more compact, with little intervening intralobular connective tissue » " +
         "[ernst, ch. 6, légende fig. 6.1c]. ⚠️ Et le rang qui commande tout le § 5 est POST-NATAL : " +
         "ce n'est qu'à 2 mois de vie que « the islets of Langerhans are becoming better defined on " +
         "routine stains » — sur toute lame fœtale la composante endocrine est par construction mal " +
         "circonscrite" }
];

/* ── 04 · Siège du bloc, échantillonnage, et les trois chiffres ────────────────
   Le SIÈGE est le premier champ de l'organe et il BLOQUE. Il n'y a pas de côté à
   déclarer ici — l'organe est médian — mais il y a un siège, et la fiche le
   désigne explicitement comme « le remplaçant fonctionnel de la latéralité » :
   la densité insulaire diffère entre tête, corps et queue. Un chiffre insulaire
   sans son siège ne se compare à rien (§ 1, § 9.20, § 10.6).

   ⚠️ Un champ numérique est délibérément ABSENT : le rapport de taille nucléaire
   endocrine / voisin. Le dénominateur diverge entre les sources — ernst compare
   aux « neighbors », keeling aux « adjacent acinar nuclei » — et le même nombre
   ne mesure donc pas la même chose (§ 9.11). Fixer le dénominateur d'abord, le
   champ ensuite (§ 10.6). */
var SIEGES = [
  { k:"tete",       l:"Tête (duodénum inclus)" },
  { k:"corps",      l:"Corps" },
  { k:"queue",      l:"Queue" },
  { k:"interface",  l:"Interface queue / hile splénique — les 5 derniers millimètres" },
  { k:"nonIdentifiable", l:"Siège non identifiable sur la pièce — limite de prélèvement, pas un diagnostic" }
];

/* La seule parade que les livres opposent à une lecture endocrine est
   organisationnelle : plusieurs sièges, et un témoin apparié en âge. */
var ECHANT = [
  { k:"blocUnique",   l:"Un seul bloc" },
  { k:"multiSieges",  l:"Plusieurs sièges, sans témoin" },
  { k:"multiTemoin",  l:"Plusieurs sièges ET témoin apparié en âge" }
];

var MESURE = {
  titre:"Siège du bloc, échantillonnage, et les trois chiffres de l'organe",
  defLabel:"siège du bloc — le remplaçant de la latéralité, à nommer AVANT tout constat insulaire",
  optLabel:"échantillonnage — la seule parade proposée par les livres pour l'endocrine",
  defs:SIEGES, opts:ECHANT,
  champs:[{ id:"poids",  label:"Poids pancréatique (g) — normale indexée sur le poids FŒTAL, pas sur le terme", min:0, max:20, step:0.1 },
          { id:"pfoetal",label:"Poids fœtal (g) — dénominateur obligatoire du précédent", min:0, max:6000, step:10 },
          { id:"sieges", label:"Nombre de sièges pancréatiques réellement en bloc", min:0, max:4, step:1 }]
};

/* Droite ajustée sur les TROIS points publiés, et sur rien d'autre : 1 g à 500 g,
   2 g à 1500 g, 3–4 g à la naissance. La source déclare la relation linéaire ;
   l'interpolation ne fabrique donc pas de donnée, elle relie des points donnés. */
function poidsAttendu(pf){ return 0.5 + pf / 1000; }

function verdictMesure(){
  var sg = E.mesure.def, ec = E.mesure.opt, sa = num("sa");
  var pp = E.mesure.v.poids, pf = E.mesure.v.pfoetal, ns = E.mesure.v.sieges;
  if (!sg && !ec && pp == null && pf == null && ns == null && !E.stade)
    return { cls:"", txt:"Ni siège, ni échantillonnage, ni chiffre — le pancréas n'est pas encore lu." };

  var t = [], cls = "ok", res = [];

  /* ── Le siège bloque, exactement comme le sexe gonadique bloque la gonade ── */
  if (!sg){
    cls = "bad";
    t.push("Siège du bloc NON déclaré : tout constat insulaire est ININTERPRÉTABLE. La densité " +
           "endocrine n'est pas homogène — « There is proportionately more endocrine tissue present in " +
           "the body and the tail of the pancreas than in the head » [keeling, ch. 26] — et un bloc de " +
           "queue plus endocrine qu'un bloc de tête est le siège, pas une lésion. L'organe est médian : " +
           "il n'a pas de côté, il a un siège, et c'est le siège qui remplace la latéralité ici.");
  } else if (sg === "nonIdentifiable"){
    cls = "bad";
    t.push("Siège non identifiable SUR LA PIÈCE : c'est une limite de prélèvement, PAS un diagnostic. " +
           "Tout constat insulaire est ININTERPRÉTABLE, rien de ce qui suit sur l'endocrine n'est " +
           "comparable à quoi que ce soit. Le motif " +
           "d'indéterminabilité réellement attesté s'écrit : « Le pancréas n'a pas été identifié dans " +
           "la masse digestive ».");
  } else {
    t.push("Siège : " + par(SIEGES, sg).l.toLowerCase().split(" —")[0] + ".");
    if (sg === "interface")
      t.push("Bloc d'INTERFACE, pas un bloc de pancréas : ce qu'on y cherche est du tissu splénique " +
             "intrapancréatique et des canaux bordés de cellules caliciformes, « anomalies évocatrices " +
             "en premier lieu d'une trisomie 13 ».");
    if (sg === "queue")
      t.push("Sur la queue, deux confondeurs de geste : la pince de prélèvement passe précisément là — " +
             "« on saisit à la pince la queue du pancréas au contact du hile splénique » — et les " +
             "hétérotopies spléniques nodulaires y sont une variante normale.");
    if (sg === "tete")
      t.push("Sur la tête, le duodénum est le repère utile : c'est lui qui permet « Pancreatic tissue " +
             "may be intermingled with the duodenal muscularis », seul caractère histologique du " +
             "pancréas annulaire.");
  }

  /* ── L'échantillonnage commande toute lecture endocrine ─────────────────── */
  if (!ec){
    res.push("échantillonnage non déclaré — or c'est la seule parade que les livres proposent " +
             "contre une fausse hyperplasie, et elle est organisationnelle, pas histochimique");
  } else if (ec === "blocUnique"){
    cls = "bad";
    t.push("BLOC UNIQUE : aucune quantification endocrine n'est recevable. « The quantification of " +
           "endocrine tissue is complicated by the considerable variation in the concentration of " +
           "islets from one lobule to the next » [ernst, ch. 6] — la variation existe d'un lobule à " +
           "l'autre ET d'un siège à l'autre, et « toute quantification endocrine est invalide sur un " +
           "bloc unique ». Décrire, localiser, ne rien quantifier.");
  } else if (ec === "multiSieges"){
    if (cls === "ok") cls = "warn";
    t.push("Plusieurs sièges, mais sans témoin apparié : la moitié de la parade seulement. La source " +
           "les exige ensemble — « sampling various parts of the pancreas, including head, neck and " +
           "tail, and comparison with age-matched controls is helpful in histological assessment » " +
           "[keeling, ch. 26].");
  } else {
    t.push("Plusieurs sièges et témoin apparié en âge : c'est le dispositif complet que les livres " +
           "réclament avant toute lecture endocrine.");
  }

  /* ── Le seul chiffre normé de l'organe, et il n'est pas en SA ───────────── */
  if (pp != null){
    t.push("Poids pancréatique = " + pp + " g.");
    if (pf == null){
      if (cls === "ok") cls = "warn";
      res.push("poids pancréatique saisi SANS le poids fœtal : la seule normale publiée est indexée sur " +
               "le poids fœtal et non sur le terme — « il existe une relation linéaire entre le poids " +
               "pancréatique et le poids fœtal » — donc sans son dénominateur ce chiffre ne se lit pas, " +
               "et il n'est pas convertible en SA (§ 9.6)");
    } else {
      var att = poidsAttendu(pf);
      t.push("Pour un fœtus de " + pf + " g, la droite ajustée sur les trois points publiés donne " +
             "≈ " + att.toFixed(1) + " g : « Le poids pancréatique est de l'ordre de 1 gramme pour un " +
             "fœtus de 500 grammes, 2 grammes à 1500 grammes et entre 3 et 4 grammes à la naissance » " +
             "[soffoet, ch. 7]. Trois points, une droite déclarée par la source — aucun autre repère.");
      if (pp < att * 0.6 || pp > att * 1.6){
        if (cls === "ok") cls = "warn";
        t.push("Écart marqué à la droite publiée. Un pancréas petit fait chercher l'agénésie ou " +
               "l'hypoplasie, avec un RCIU sévère attendu ; un pancréas volumineux est un carrefour : " +
               "« Le volume pancréatique est plus important en cas de diabète, de syndrome de Beckwith " +
               "Wiedemann, d'infection, d'érythroblastose, de leucémie » [soffoet, ch. 7].");
      }
      t.push("⚠️ C'est un POIDS D'ORGANE : il ne se lit pas sur la lame, et il ne date pas le fœtus.");
    }
  } else if (pf != null){
    res.push("poids fœtal saisi sans le poids pancréatique — le dénominateur seul ne dit rien");
  }

  /* ── Compter les sièges, parce que personne ne les compte (§ 9.20) ──────── */
  if (ns != null){
    t.push("Sièges en bloc = " + ns + " ; le § 1 en exige trois, plus le bloc d'interface queue / hile " +
           "splénique.");
    if (ns < 3){ if (cls === "ok") cls = "warn";
      t.push("Sous les trois sièges attendus : ce qui manque n'est pas du volume, c'est la seule " +
             "stratification qui rende un constat endocrine interprétable. Le corpus ne permet même " +
             "pas de savoir combien de blocs le service inclut : les CR listent les organes prélevés, " +
             "pas les blocs par siège (§ 9.20)."); }
  }

  /* ── Le terme commande ce que la lame peut dire — le 3e piège de fond ───── */
  if (sa != null){
    if (sa < 20)
      t.push("À " + sa + " SA, la lame exclut peu : la mucoviscidose ne donne rien avant la " +
             "mi-gestation — « il n'existe pas de différence chez les fœtus atteints de " +
             "mucoviscidose » — la macrosomie d'enfant de mère diabétique n'est pas apparue, et les " +
             "îlots ne seront bien définis à l'HES qu'après la naissance. Écrire cette limite dans le " +
             "CR : « le pancréas est un organe qui exclut peu ».");
    else if (sa < 27)
      t.push("À " + sa + " SA, le matériel PAS+ apical devient cherchable (« vers 20 SA »), mais la " +
             "distension canalaire n'est nette qu'au 3e trimestre et « La fibrose n'est pas visible " +
             "avant le troisième trimestre ». La macrosomie d'enfant de mère diabétique n'est pas " +
             "apparue : « Macrosomia is not apparent before week 25, as fetal tissues have a low " +
             "sensitivity to insulin before the third trimester » [keeling, ch. 26].");
    else
      t.push("À " + sa + " SA on est au terme où la distension canalaire et la fibrose deviennent " +
             "lisibles ; les îlots, eux, ne seront bien circonscrits à l'HES qu'après la naissance.");

    if (sa < 27 && E.signes.densificationTrame === "anormal"){
      if (cls === "ok") cls = "warn";
      t.push("⚠️ Densification de la trame cochée à " + sa + " SA : avant le 3e trimestre, un stroma " +
             "abondant dans ET entre les lobules est le NORMAL de l'organe. Le corpus a d'ailleurs le " +
             "bon mot : « Le pancréas présente une densification de la trame conjonctive normale et " +
             "une discrète dilatation des canaux excréteurs ».");
    }
    if (sa < 20 && E.signes.materielInspisse === "anormal")
      res.push("matériel inspissé coché avant 20 SA — le signe n'est pas attendu à ce terme, la source " +
               "le date « vers 20 SA » et pas avant");
  }

  /* ── Cohérences entre le siège déclaré et les signes cochés ─────────────── */
  if (E.signes.tissuSpleniqueIntrapancreatique === "anormal" && sg !== "queue" && sg !== "interface")
    res.push("tissu splénique intrapancréatique coché hors queue et hors bloc d'interface — vérifier le " +
             "siège avant d'en faire un signe de trisomie 13");
  if (E.signes.tissuDansMusculeuseDuodenale === "anormal" && sg !== "tete")
    res.push("tissu pancréatique dans la musculeuse duodénale coché hors bloc de tête — le pancréas " +
             "annulaire se confirme sur le bloc de tête, et se diagnostique à la macroscopie");
  if ((E.signes.nucleomegalie === "anormal" || E.signes.ilotsVolumineux === "anormal") &&
      !E.prelev.temoinAge)
    res.push("critère endocrine coché sans témoin apparié en âge — les six caractères NORMAUX du " +
             "pancréas fœtal miment tous une hyperplasie, et c'est le témoin qui les départage");
  if (!E.prelev.troisSieges)
    res.push("trois sièges non confirmés au prélèvement — la stratification manque à la racine");

  if (res.length){ if (cls === "ok") cls = "warn"; t.push("Réserves : " + res.join(" ; ") + "."); }
  return { cls:cls, txt:t.join(" ") };
}

/* ── 05 · Variantes normales ──────────────────────────────────────────────────
   C'est la partie la plus rentable de la fiche : six caractères NORMAUX du
   pancréas endocrine fœtal miment à eux seuls une hyperplasie, et les deux
   livres assortissent le tableau du même avertissement. */
var VARIANTES = [
  { k:"endocrineDiffus",   l:"Cellules endocrines isolées ou en petits nids plutôt qu'en îlots compacts" },
  { k:"dixPourCent",       l:"Composante endocrine ≈ 10 % du volume — contre 1–2 % chez l'adulte" },
  { k:"densiteVariable",   l:"Densité insulaire variable d'un lobule à l'autre" },
  { k:"tailleVariable",    l:"Taille et forme des îlots variables" },
  { k:"ilotsMalLimites",   l:"Îlots mal circonscrits — « Fetal islets generally are not as compact and well circumscribed as islets in individuals who are several months old »" },
  { k:"ilotsSeptaux",      l:"Îlots septaux — « septal islets are not uncommon in the fetus and newborn »" },
  { k:"hematopoiese",      l:"Hématopoïèse extramédullaire, parfois volumineuse, dissociant les acini — « ne doivent pas conduire à un faux diagnostic de pancréatite interstitielle »" },
  { k:"infiltratLympho",   l:"Infiltrat lymphocytaire — présent chez 50 % des fœtus (Liu and Potter)" },
  { k:"agregatsLymphoides",l:"Agrégats lymphoïdes péri-pancréatiques — « lymphoid heterotopias »" },
  { k:"centroAcineuses",   l:"Cellules centro-acineuses proéminentes, qui miment les cellules endocrines" },
  { k:"stromaMidtrimestre",l:"Stroma abondant dans ET entre les lobules avant le 3e trimestre" },
  { k:"heterotopieSplenique", l:"Hétérotopie splénique nodulaire de la queue, découverte fortuite isolée" },
  { k:"amasAcineuxAntre",  l:"Amas de cellules acineuses ectopiques dans l'antre gastrique" },
  { k:"canalAccessoire",   l:"Canal accessoire atrophique ou absent — « undergoes varying degrees of atrophy and may be absent »" }
];

/* ── 06 · Signes ──────────────────────────────────────────────────────────────
   On coche des SIGNES, un à la fois. Aucun nom d'entité ici : les noms se lisent
   en dessous, dans les associations. Rien de coché ne veut pas dire absent : ça
   veut dire non regardé. */
var SIGNES = [
  /* Exocrine — mucoviscidose et sa gradation ordinale */
  { k:"materielInspisse", l:"Matériel éosinophile ou PAS+ inspissé dans les acini et les canaux",
    meta:"le signe est daté : « vers 20 SA », jamais avant la mi-gestation" },
  { k:"aplatissementEpithelial", l:"Aplatissement de l'épithélium acineux ou canalaire" },
  { k:"distensionCanalaire", l:"Distension des canaux pancréatiques",
    meta:"« La distension des canaux pancréatiques est plus nette au troisième trimestre »" },
  { k:"atrophieAcineuse", l:"Atrophie acineuse",
    meta:"ne compte que si elle est accompagnée de fibrose ; seule, c'est de la lyse" },
  { k:"fibrosePeriCanalaire", l:"Fibrose péri-canalaire et inter-acineuse" },

  /* Endocrine — le seul critère chiffré de l'organe, et ses mimes */
  { k:"nucleomegalie", l:"Nucléomégalie des cellules endocrines",
    meta:"critère le plus fiable ET non spécifique ; dénominateur divergent selon la source (§ 9.11)" },
  { k:"ilotsVolumineux", l:"Îlots anormalement volumineux — de l'ordre de trois fois la taille attendue pour l'âge" },
  { k:"ilotsNodulaires", l:"Îlots hyperplasiques formant des nodules irréguliers" },
  { k:"cordonsAcini", l:"Cellules endocrines disposées en cordons, avec des acini peu développés" },
  { k:"topographieConservee", l:"Topographie insuline / glucagon CONSERVÉE dans l'îlot (IHC)",
    meta:"critère discriminant : sa conservation malgré une hyperplasie oriente vers l'érythroblastose" },
  { k:"eosinophilesPeriInsulaires", l:"Infiltrat à éosinophiles AUTOUR des îlots, et non dedans",
    meta:"« around, and not within » — c'est la topographie qui porte le critère, pas la densité" },
  { k:"necroseInsulaire", l:"Nécrose des cellules insulaires",
    meta:"le discriminant entre éosinophiles d'enfant de mère diabétique et Coxsackie B" },

  /* Inflammation et infection */
  { k:"inclusionOeilDeHibou", l:"Inclusion virale intranucléaire en œil de hibou",
    meta:"en CMV pancréatique, l'absence d'infiltrat n'exclut rien" },
  { k:"plasmocytes", l:"Infiltrat significatif de plasmocytes" },
  { k:"destructionParenchyme", l:"Destruction du parenchyme ou des canaux" },
  { k:"infiltratDense", l:"Infiltrat inflammatoire pancréatique dense",
    meta:"isolé, il est normal chez 50 % des fœtus : il ne bascule qu'avec plasmocytes ou destruction" },
  { k:"erythropoieseInterstitielle", l:"Interstitium infiltré de cellules érythropoïétiques",
    meta:"l'hématopoïèse extramédullaire pancréatique est une variante normale du 2e trimestre" },
  { k:"elementsMyeloides", l:"Éléments myéloïdes dans l'interstitium" },

  /* Malformatif */
  { k:"tissuDansMusculeuseDuodenale", l:"Tissu pancréatique intriqué à la musculeuse duodénale" },
  { k:"heterotopieDigestive", l:"Nodule pancréatique hétérotopique dans une paroi digestive",
    meta:"un nodule à canaux ± acini ± îlots ; un simple amas de cellules acineuses n'en est pas un" },
  { k:"pancreasPetit", l:"Pancréas macroscopiquement absent, réduit ou hypoplasique" },
  { k:"pancreasNonRetrouve", l:"Pancréas non identifié à la dissection" },
  { k:"kystesCanalaires", l:"Distension kystique des canaux, voire de certains acini" },
  { k:"kysteBordeCubique", l:"Kystes bordés par un épithélium aplati ou cubique, paroi parfois fibreuse" },
  { k:"canauxDilatesRamifies", l:"Structures canalaires ramifiées et kystiquement dilatées" },
  { k:"mesenchymePrimitif", l:"Mésenchyme primitif entourant les structures canalaires" },
  { k:"cellulesCaliciformes", l:"Cellules caliciformes dans les canaux pancréatiques",
    meta:"caractère NON physiologique du pancréas — c'est le critère qui réunit les anomalies chromosomiques" },
  { k:"tissuSpleniqueIntrapancreatique", l:"Tissu splénique intrapancréatique" },

  /* Surcharge, stroma, geste */
  { k:"perlsAcineux", l:"Perls positif dans les cellules épithéliales ACINEUSES" },
  { k:"perlsHistiocytaire", l:"Perls positif dans les cellules histiocytaires seulement" },
  { k:"densificationTrame", l:"Densification de la trame conjonctive",
    meta:"avant le 3e trimestre, c'est le stroma normal du 2e trimestre jusqu'à preuve du contraire" },
  { k:"cellulesPalesNoyauCentral", l:"Cellules pâles à noyau central au sein des acini",
    meta:"centro-acineuses jusqu'à preuve kératine : « occasionally they can be prominent and can be mistakenly interpreted as endocrine cells »" },
  { k:"lesionHemorragiqueQueue", l:"Lésion hémorragique de la queue du pancréas",
    meta:"le geste de prélèvement passe précisément par là — trancher sur la récence et le siège exact" }
];

/* ── 06 bis · Associations lues ───────────────────────────────────────────────
   Jamais cliquables : elles se déduisent des signes cochés anormaux.
   Chaque réserve dit ce que la lame ne permet PAS d'écrire. */
var DIAGS = [
  { k:"mucoviscidoseAssoc", l:"Mucoviscidose — signes précoces",
    signes:["materielInspisse","aplatissementEpithelial","distensionCanalaire",
            "fibrosePeriCanalaire","atrophieAcineuse"],
    min:2, cle:"materielInspisse",
    stop:"le pancréas évoque, il ne diagnostique pas — la confirmation est génétique. Et un fœtus atteint peut avoir un pancréas normal : l'atteinte s'installe souvent après la naissance. Le matériel apical PAS+ est daté « vers 20 SA » : plus tôt, son absence ne vaut rien." },

  { k:"hyperinsulinismeAssoc", l:"Hyperinsulinisme congénital",
    signes:["nucleomegalie","ilotsVolumineux","cordonsAcini"],
    min:1, cle:"nucleomegalie",
    stop:"seule la nucléomégalie porte : « Islet cells with nucleomegaly (nuclei three to four times the size of their neighbors) are the most reliable evidence for congenital hyperinsulinism ». Le volume insulaire seul ne conclut pas. Aucun rapport nucléaire n'est chiffré ici : les sources ne prennent pas le même dénominateur — « three to five times the size of adjacent acinar nuclei » d'un côté, les noyaux voisins de l'autre. Focale contre diffuse : cette lame ne tranche pas." },

  { k:"mereDiabetiqueAssoc", l:"Enfant de mère diabétique",
    signes:["eosinophilesPeriInsulaires","ilotsVolumineux","topographieConservee"],
    min:2, cle:"eosinophilesPeriInsulaires",
    stop:"l'infiltrat est « around, and not within » l'îlot : dedans, ce n'est plus cela. Le même éosinophile péri-insulaire se voit dans le Coxsackie — le discriminant est la nécrose insulaire, pas l'éosinophile. Sans nécrose regardée, l'association reste ouverte." },

  { k:"coxsackieAssoc", l:"Coxsackie B — atteinte insulaire",
    signes:["necroseInsulaire","eosinophilesPeriInsulaires","infiltratDense"],
    min:1, cle:"necroseInsulaire",
    stop:"« The diagnosis is easy to miss if there is no accompanying inflammatory cell infiltrate. » — une lame sans infiltrat n'exclut donc rien. Sérologie et PCR tranchent, pas l'histologie." },

  { k:"cmvAssoc", l:"CMV pancréatique",
    signes:["inclusionOeilDeHibou","infiltratDense","plasmocytes"],
    min:1, cle:"inclusionOeilDeHibou",
    stop:"l'inclusion signe le virus, son absence ne l'exclut pas. Le corpus écrit d'ailleurs « absence d'inclusion nucléaire » comme un constat, jamais comme une exclusion. IHC ou PCR pour trancher." },

  { k:"basculeInflammatoire", l:"Infiltrat lymphoïde — bascule du physiologique au pathologique",
    signes:["plasmocytes","destructionParenchyme","infiltratDense"],
    min:2,
    stop:"pas de signe pivot ici, c'est un OU : « if such infiltrates are accompanied by a significant infiltrate of plasma cells or the destruction of parenchyma or ducts, infections such as cytomegalovirus or immune dysregulation disorders should be considered ». Un infiltrat lymphoïde seul reste une variante normale. Le seuil de « significant » n'est chiffré nulle part : c'est un jugement, pas une mesure." },

  { k:"beckwithAssoc", l:"Hyperplasie endocrine syndromique (Beckwith-Wiedemann)",
    signes:["ilotsVolumineux","cordonsAcini","nucleomegalie","ilotsNodulaires"],
    min:2, cle:"ilotsVolumineux",
    stop:"le pancréas est une pièce du syndrome, pas le syndrome. Et l'hyperplasie endocrine apparente est le piège majeur de cet organe : sans témoin apparié en âge et sans plusieurs sièges, le constat n'est pas opposable — « The quantification of endocrine tissue is complicated by the considerable variation in the concentration of islets from one lobule to the next »." },

  { k:"erythroblastoseAssoc", l:"Érythroblastose — hyperplasie insulaire de l'anémie chronique",
    signes:["ilotsVolumineux","erythropoieseInterstitielle","elementsMyeloides"],
    min:2, cle:"ilotsVolumineux",
    stop:"l'érythropoïèse interstitielle est physiologique au 2e trimestre : elle ne devient un argument que rapportée à un âge déclaré. Le foie, la rate et la moelle décident avant le pancréas." },

  { k:"agenesieAssoc", l:"Agénésie ou hypoplasie pancréatique",
    signes:["pancreasPetit","pancreasNonRetrouve"],
    min:1, cle:"pancreasPetit",
    stop:"non identifié à la dissection n'est pas absent : le pancréas fœtal est petit, mou, autolytique et se dissocie du rétropéritoine. Sans réserve de dissection levée, l'agénésie ne s'écrit pas." },

  { k:"annulaireAssoc", l:"Pancréas annulaire",
    signes:["tissuDansMusculeuseDuodenale","heterotopieDigestive"],
    min:1, cle:"tissuDansMusculeuseDuodenale",
    stop:"« Pancreatic tissue may be intermingled with the duodenal muscularis » est le seul caractère histologique — le discriminant avec l'hétérotopie simple est MACROSCOPIQUE (anneau autour du deuxième duodénum). Sans la macroscopie, la lame ne choisit pas." },

  { k:"heterotopieAssoc", l:"Hétérotopie pancréatique digestive",
    signes:["heterotopieDigestive","tissuDansMusculeuseDuodenale"],
    min:1, cle:"heterotopieDigestive",
    stop:"différentiel obligé du pancréas annulaire, et il ne se tranche pas sur la lame. Reprendre la macroscopie duodénale." },

  { k:"dysplasieKystiqueAssoc", l:"Dysplasie kystique du pancréas",
    signes:["kystesCanalaires","kysteBordeCubique","canauxDilatesRamifies","mesenchymePrimitif"],
    min:2, cle:"kystesCanalaires",
    stop:"le siège des kystes est en divergence ouverte : « plutôt localisés à la tête » d'un côté, « more likely to be located in the tail » de l'autre — et les deux énoncés ne portent pas sur le même objet. Conséquence : échantillonner les DEUX pôles, ne rien conclure sur un bloc unique. Le rein, le foie et la rate décident ici plus que le pancréas." },

  { k:"trisomie13Assoc", l:"Profil pancréatique d'anomalie chromosomique",
    signes:["kystesCanalaires","cellulesCaliciformes","tissuSpleniqueIntrapancreatique","kysteBordeCubique"],
    min:2, cle:"cellulesCaliciformes",
    stop:"le caractère qui porte est la cellule caliciforme, non physiologique dans le pancréas — avec « Intrapancreatic splenic tissue is also seen ». Mais un profil n'est pas un caryotype : cette lame oriente la prescription, elle ne classe pas le fœtus." },

  { k:"surchargeFerAssoc", l:"Surcharge ferrique pancréatique",
    signes:["perlsAcineux","perlsHistiocytaire"],
    min:1, cle:"perlsAcineux",
    stop:"c'est l'acinus qui porte : « Pancréas, coloration de Perls positive au niveau des acini », et « Il n'y a pas de surcharge en fer dans les cellules histiocytaires ». Un Perls purement histiocytaire va contre le diagnostic. Le foie décide, le pancréas confirme." },

  { k:"leucemoideAssoc", l:"Infiltration myéloïde interstitielle",
    signes:["elementsMyeloides","erythropoieseInterstitielle","infiltratDense"],
    min:2, cle:"elementsMyeloides",
    stop:"l'hématopoïèse intrapancréatique est une variante normale du 2e trimestre. Sans l'âge déclaré et sans la rate, le foie et la moelle, aucune bascule ne s'écrit ici." },

  { k:"centroAcineuxAssoc", l:"Cellules pâles à noyau central — endocrines ou centro-acineuses ?",
    signes:["cellulesPalesNoyauCentral","cordonsAcini"],
    min:1, cle:"cellulesPalesNoyauCentral",
    stop:"question de technique, pas de morphologie : cytokératines. Centro-acineuse = kératine positive ; l'endocrine « generally are not reactive for keratins ». Ne pas compter ces cellules comme endocrines avant l'immunohistochimie." },

  { k:"gesteQueueAssoc", l:"Remaniement de la queue — artefact de prélèvement ?",
    signes:["lesionHemorragiqueQueue","tissuSpleniqueIntrapancreatique"],
    min:1, cle:"lesionHemorragiqueQueue",
    stop:"la queue et le hile splénique sont le lieu du geste : une hémorragie y est un artefact jusqu'à preuve du contraire. Trancher sur la récence, c'est-à-dire sur la réaction cellulaire, avant d'écrire une lésion." },

  { k:"stromaOuFibrose", l:"Trame conjonctive dense — stroma physiologique ou fibrose ?",
    signes:["densificationTrame","fibrosePeriCanalaire","atrophieAcineuse"],
    min:2, cle:"densificationTrame",
    stop:"avant le 3e trimestre, le stroma abondant est la norme et non une fibrose. Il n'existe aucun seuil publié de rapport stroma sur glande : le terme en SA, déclaré, est le seul juge disponible." }
];

/* ── 07 · Négatifs ────────────────────────────────────────────────────────────
   Le pancréas est, dans ce corpus, un organe de NÉGATIFS plus que de lésions.
   Les cinq premiers sont la doctrine locale écrite, repris tels quels. Les sept
   suivants sont réclamés par les livres et ne sont écrits dans AUCUN compte
   rendu du service : ils sont créés ici, et c'est assumé comme un ajout. */
var NEGATIFS = [
  { k:"cytoarchitecture", l:"Absence d'anomalie de la cytoarchitecture pancréatique",
    p:"le seul négatif propre à l'organe réellement écrit — et c'est une formule globale, pas un critère",
    ko:"cytoarchitecture pancréatique non vérifiée, ou anormale : le négatif global du service ne peut pas être écrit" },
  { k:"reserveRetention", l:"Réserve de rétention accolée au négatif — « sous réserve de la rétention »",
    p:"la formulation attestée énonce le négatif ET son plafond dans la même phrase ; ne pas l'amputer",
    ko:"négatif pancréatique écrit SANS sa réserve de rétention — le plafond de lecture disparaît de la phrase" },
  { k:"triadeVirale", l:"Absence d'inclusion nucléaire, absence de cellule géante, absence d'inflammation",
    p:"triade générique appliquée au pancréas ; couvre le CMV (inclusion sans infiltrat) et le Coxsackie",
    ko:"triade inclusion / cellule géante / inflammation non énoncée sur le pancréas" },
  { k:"perlsNegatif", l:"Perls pancréatique négatif",
    p:"énoncé organe par organe dans le corpus — « Le Perls sur le foie, thyroïde, rate, pancréas, reins est négatif »",
    ko:"statut du fer pancréatique non tranché : ni acineux, ni histiocytaire, ni négatif" },
  { k:"surchargeFoetale", l:"Absence de surcharge fœtale sur le site-témoin pancréatique",
    p:"« absence de surcharge fœtale (lymphatiques, podocytes, pancréas, rate, SRH, thymus en particulier) » — le pancréas est l'un des six sites-témoins du bilan de surcharge",
    ko:"site-témoin pancréatique du bilan de surcharge non lu : le bilan lysosomal est incomplet" },

  { k:"pasInspisse", l:"Absence de matériel éosinophile ou PAS+ inspissé dans les acini et les canaux",
    p:"réclamé par les livres, jamais écrit par le service ; le signe est daté « vers 20 SA »",
    ko:"matériel apical inspissé non recherché — la question mucoviscidose reste ouverte sur cette lame" },
  { k:"distensionNeg", l:"Absence de distension canalaire",
    p:"réclamé par les livres, jamais écrit ; plus net au 3e trimestre",
    ko:"distension canalaire non regardée" },
  { k:"nucleomegalieNeg", l:"Absence de nucléomégalie des cellules endocrines",
    p:"c'est le seul critère fiable de l'hyperinsulinisme : son négatif vaut plus que le compte des îlots",
    ko:"nucléomégalie endocrine non recherchée — aucun énoncé sur l'hyperinsulinisme n'est possible" },
  { k:"eosinophilesNeg", l:"Absence d'infiltrat éosinophile péri-insulaire",
    p:"réclamé par les livres, jamais écrit ; couvre l'enfant de mère diabétique et le Coxsackie",
    ko:"éosinophiles péri-insulaires non recherchés" },
  { k:"caliciformesNeg", l:"Absence de cellules caliciformes dans les canaux pancréatiques",
    p:"non physiologique dans le pancréas : c'est le négatif qui écarte le profil chromosomique",
    ko:"cellules caliciformes canalaires non recherchées" },
  { k:"spleniqueNeg", l:"Absence de tissu splénique intrapancréatique sur le bloc queue + hile",
    p:"suppose que le bloc de l'interface queue / hile splénique existe — sinon le négatif n'est pas opposable",
    ko:"tissu splénique intrapancréatique non recherché, ou recherché sans le bloc de l'interface" },
  { k:"plasmoDestructionNeg", l:"Absence de plasmocytes ET absence de destruction parenchymateuse ou canalaire",
    p:"le double critère qui fait basculer un infiltrat lymphocytaire de normal à suspect — un infiltrat seul reste normal",
    ko:"un infiltrat lymphocytaire a été vu sans que plasmocytes ni destruction soient tranchés : la bascule n'est pas jugeable" }
];

/* ── 08 · Techniques ──────────────────────────────────────────────────────────
   Une ligne par QUESTION. Les clones sont ceux réellement employés par le
   service ; quand la source est un livre, le clone n'est pas donné et c'est dit. */
var TECHNIQUES = [
  { k:"pasTech", l:"PAS",
    q:"Y a-t-il du matériel inspissé au pôle apical des cellules acineuses ou dans les canaux ? Attendu si normal : rien. Le signe apparaît vers 20 SA et pas avant." },
  { k:"perlsTech", l:"Perls",
    q:"Y a-t-il une surcharge en fer, et dans QUEL compartiment ? Épithélial acineux = hémochromatose périnatale ; histiocytaire = autre chose. Le compartiment fait tout." },
  { k:"insuline", l:"IHC insuline (Polyclonal Dako pur, ou clone 2D11-H5 LEICA prêt à l'emploi)",
    q:"Où sont les cellules endocrines et comment sont-elles distribuées ? Attendu chez le fœtus : marquage diffus et en petits amas, pas seulement en îlots compacts." },
  { k:"insulineGlucagon", l:"IHC insuline + glucagon (clone glucagon non renseigné)",
    q:"La topographie insuline / glucagon DANS l'îlot est-elle conservée ? Sa conservation malgré une hyperplasie oriente vers l'érythroblastose. Aucun glucagon pancréatique n'apparaît dans le corpus du service." },
  { k:"cytokeratines", l:"IHC cytokératines (clone non donné par la source)",
    q:"Cette cellule pâle à noyau central est-elle centro-acineuse ou endocrine ? Centro-acineuse = kératine positive ; l'endocrine « generally are not reactive for keratins »." },
  { k:"neuroendocrine", l:"IHC marqueurs neuroendocrines (synaptophysine, clone non donné)",
    q:"Quel est le pattern de croissance des cellules endocrines nées des canaux ? « immunohistochemistry for various neuroendocrine markers is necessary in order to outline their pattern of growth » — l'HES ne suffit pas." },
  { k:"cd3", l:"IHC CD3 (Polyclonal Dako, 1/200)",
    q:"Cet infiltrat péri-pancréatique est-il lymphoïde ? Un groupement lymphoïde marqué reste un normal chez la moitié des fœtus." },
  { k:"cd71", l:"IHC CD71 (clone MRQ-48, Cell Marque, 1/200)",
    q:"Ces cellules interstitielles sont-elles érythroblastiques ? L'hématopoïèse est attendue, surtout au 2e trimestre." },
  { k:"cmvTech", l:"HES puis IHC CMV (clone E13 Argene 1/200, ou CCH2 + DDG9 Dako 1/50)",
    q:"Y a-t-il des inclusions virales ? En CMV pancréatique, l'absence d'infiltrat n'exclut rien." },
  { k:"argentique", l:"Réaction argentique sur coupe",
    q:"Y a-t-il un tréponème ? Attendu : négatif." },
  { k:"sirius", l:"Rouge Sirius — NON documenté sur le pancréas",
    q:"Cette trame dense est-elle une fibrose ou le stroma normal du 2e trimestre ? La technique est proposée par la source sur le FOIE autolysé, pas sur le pancréas : elle est ici un choix du lecteur, sans lecture attendue publiée. Jamais suggérée automatiquement." },
  { k:"temoinAgeTech", l:"Bloc témoin apparié en âge, monté en parallèle",
    q:"Cette impression d'hyperplasie endocrine tient-elle contre un témoin du même terme ? C'est la seule parade documentée au piège majeur de l'organe. Ce n'est pas une coloration : c'est une organisation." },
  { k:"aucuneDatation", l:"Aucune technique de datation pancréatique n'existe",
    q:"Le pancréas est-il conforme au terme ? Il n'existe ni mesure ni coloration de datation pancréatique. Cette ligne est là pour être lue, pas pour être cochée." }
];

/* ── Suggestions ──────────────────────────────────────────────────────────────
   Un signe coché anormal éclaire les techniques qui le tranchent. Deux lignes
   ne sont JAMAIS suggérées : le rouge Sirius, non documenté sur cet organe, et
   la ligne d'absence de datation pancréatique, qui n'est pas une prescription. */
function suggerer(){
  var s = E.signes, m = E.mesure, g = {};
  function on(k){ g[k] = 1; }

  if (s.materielInspisse === "anormal" || s.aplatissementEpithelial === "anormal"
      || s.distensionCanalaire === "anormal") on("pasTech");

  if (s.perlsAcineux === "anormal" || s.perlsHistiocytaire === "anormal") on("perlsTech");

  if (s.nucleomegalie === "anormal" || s.ilotsVolumineux === "anormal"
      || s.ilotsNodulaires === "anormal" || s.cordonsAcini === "anormal"){
    on("insuline"); on("temoinAgeTech");
  }
  if (s.ilotsVolumineux === "anormal" || s.erythropoieseInterstitielle === "anormal") on("insulineGlucagon");
  if (s.cellulesPalesNoyauCentral === "anormal") on("cytokeratines");
  if (s.cordonsAcini === "anormal" || s.ilotsNodulaires === "anormal") on("neuroendocrine");

  if (s.infiltratDense === "anormal" || s.plasmocytes === "anormal"
      || s.destructionParenchyme === "anormal") on("cd3");
  if (s.erythropoieseInterstitielle === "anormal" || s.elementsMyeloides === "anormal") on("cd71");
  if (s.inclusionOeilDeHibou === "anormal" || s.plasmocytes === "anormal"
      || s.destructionParenchyme === "anormal" || s.necroseInsulaire === "anormal") on("cmvTech");
  if (s.infiltratDense === "anormal" && s.destructionParenchyme === "anormal") on("argentique");

  /* Le piège majeur de l'organe : un seul siège, et on parle d'endocrine. */
  if (m && m.opt === "blocUnique"
      && (s.ilotsVolumineux === "anormal" || s.ilotsNodulaires === "anormal"
          || s.nucleomegalie === "anormal")) on("temoinAgeTech");

  return g;
}

/* ── Autotest de l'organe ─────────────────────────────────────────────────────
   Le tronc commun a tourné AVANT et laisse le premier signe de la première
   association coché anormal : on repart d'une lame propre, et on repose les
   deux axes catégoriels conditionnellement. */
async function testsOrgane(chk, clic, set, crTient, pause){

  function pose(k, v){ if (E.signes[k] !== v) clic("les", k, v); }
  function ote(k){ if (E.signes[k]) clic("les", k, E.signes[k]); }
  function propre(){ SIGNES.forEach(function(x){ ote(x.k); }); }
  function siege(k){ if (E.mesure.def !== k) clic("mdef", k); }
  function ech(k){ if (E.mesure.opt !== k) clic("mopt", k); }
  function lue(k){ return associations().some(function(a){ return a.d.k === k; }); }
  function tenue(k){ return associations().some(function(a){ return a.d.k === k && a.tenu; }); }

  propre();

  /* ---- Ce que l'organe n'a PAS, et qui doit le rester -------------------- */
  chk("pancréas impair : pas d'axe de latéralité", PAIR === false);
  chk("aucun champ de rapport nucléaire chiffré",
      MESURE.champs.every(function(c){ return c.id !== "ratio" && c.id !== "rapportNucleaire"; }));
  chk("aucune clé d'association ne collisionne avec un signe",
      DIAGS.every(function(d){
        return !SIGNES.some(function(x){ return x.k === d.k; });
      }));
  chk("le rouge Sirius et la ligne de non-datation existent",
      TECHNIQUES.some(function(t){ return t.k === "sirius"; }) &&
      TECHNIQUES.some(function(t){ return t.k === "aucuneDatation"; }));

  /* ---- Le siège : sans lui, rien ne se compare ---------------------------- */
  set("sa", "30");
  siege("nonIdentifiable"); ech("multiTemoin");
  chk("siège non identifiable : verdict bloquant", verdictMesure().cls === "bad");
  chk("et il le dit", verdictMesure().txt.indexOf("ININTERPRÉTABLE") >= 0);

  siege("queue");
  chk("siège déclaré : le verdict n'est plus bloquant pour cette raison",
      verdictMesure().txt.indexOf("ININTERPRÉTABLE") < 0);

  ech("blocUnique");
  chk("bloc unique : bloquant", verdictMesure().cls === "bad");
  ech("multiTemoin");

  /* ---- Le poids ne se lit pas sans le poids fœtal ------------------------- */
  set("m_poids", "3");
  chk("poids pancréatique sans poids fœtal : non lisible",
      verdictMesure().txt.indexOf("poids fœtal") >= 0);
  set("m_pfoetal", "2500");
  chk("avec le poids fœtal, la borne se calcule",
      Math.abs(poidsAttendu(2500) - 3) < 0.001);
  set("m_poids", ""); set("m_pfoetal", "");

  /* ---- Mucoviscidose : le pivot commande -------------------------------- */
  pose("aplatissementEpithelial", "anormal");
  pose("distensionCanalaire", "anormal");
  chk("sans le matériel inspissé, la mucoviscidose ne tient pas", !tenue("mucoviscidoseAssoc"));
  chk("mais l'association est lue quand même", lue("mucoviscidoseAssoc"));
  pose("materielInspisse", "anormal");
  chk("avec le pivot et deux signes, elle tient", tenue("mucoviscidoseAssoc"));
  chk("le PAS est suggéré", suggerer().pasTech === 1);
  chk("CR : elle refuse de conclure", crTient("la confirmation est génétique"));
  propre();

  /* ---- Hyperinsulinisme : la nucléomégalie et elle seule ------------------ */
  pose("ilotsVolumineux", "anormal");
  pose("cordonsAcini", "anormal");
  chk("des îlots volumineux seuls ne font pas l'hyperinsulinisme", !tenue("hyperinsulinismeAssoc"));
  chk("le témoin apparié en âge est proposé dès qu'on parle d'endocrine",
      suggerer().temoinAgeTech === 1);
  pose("nucleomegalie", "anormal");
  chk("la nucléomégalie suffit", tenue("hyperinsulinismeAssoc"));
  propre();

  /* ---- Mère diabétique contre Coxsackie : la nécrose tranche -------------- */
  pose("eosinophilesPeriInsulaires", "anormal");
  pose("ilotsVolumineux", "anormal");
  chk("éosinophiles péri-insulaires : mère diabétique tenue", tenue("mereDiabetiqueAssoc"));
  chk("et le Coxsackie est lu en même temps", lue("coxsackieAssoc"));
  chk("mais sans nécrose il ne tient pas", !tenue("coxsackieAssoc"));
  pose("necroseInsulaire", "anormal");
  chk("la nécrose fait basculer", tenue("coxsackieAssoc"));
  chk("CR : le discriminant est nommé", crTient("le discriminant est la nécrose insulaire"));
  propre();

  /* ---- L'infiltrat lymphoïde ne bascule qu'à deux, sans pivot ------------- */
  pose("infiltratDense", "anormal");
  chk("un infiltrat seul reste physiologique", !tenue("basculeInflammatoire"));
  chk("le CD3 est proposé", suggerer().cd3 === 1);
  pose("plasmocytes", "anormal");
  chk("infiltrat + plasmocytes : la bascule est tenue", tenue("basculeInflammatoire"));
  pose("plasmocytes", "normal");
  pose("destructionParenchyme", "anormal");
  chk("infiltrat + destruction aussi : c'est bien un OU", tenue("basculeInflammatoire"));
  propre();

  /* ---- Le fer : c'est le compartiment qui porte -------------------------- */
  pose("perlsHistiocytaire", "anormal");
  chk("Perls histiocytaire seul : la surcharge n'est pas tenue", !tenue("surchargeFerAssoc"));
  chk("mais la ligne est lue", lue("surchargeFerAssoc"));
  pose("perlsAcineux", "anormal");
  chk("Perls acineux : tenue", tenue("surchargeFerAssoc"));
  chk("le Perls est suggéré", suggerer().perlsTech === 1);
  chk("le Sirius et la non-datation ne sont jamais suggérés, même signes cochés",
      suggerer().sirius !== 1 && suggerer().aucuneDatation !== 1);
  propre();

  /* ---- Agénésie : non identifié n'est pas absent -------------------------- */
  pose("pancreasNonRetrouve", "anormal");
  chk("non retrouvé : l'agénésie est lue mais pas tenue", lue("agenesieAssoc") && !tenue("agenesieAssoc"));
  chk("CR : la réserve de dissection est écrite", crTient("le pancréas fœtal est petit"));
  propre();

  /* ---- Kystes : divergence de siège portée, jamais tranchée --------------- */
  pose("kystesCanalaires", "anormal");
  pose("kysteBordeCubique", "anormal");
  chk("dysplasie kystique tenue", tenue("dysplasieKystiqueAssoc"));
  chk("CR : les deux sièges sont donnés sans arbitrage",
      crTient("plutôt localisés à la tête") && crTient("more likely to be located in the tail"));
  propre();

  /* ---- Annulaire ou hétérotopie : la lame ne choisit pas ------------------ */
  pose("tissuDansMusculeuseDuodenale", "anormal");
  chk("les deux lectures sortent ensemble",
      lue("annulaireAssoc") && lue("heterotopieAssoc"));
  chk("CR : le discriminant est macroscopique", crTient("est MACROSCOPIQUE"));
  propre();

  /* ---- Les négatifs propres à l'organe existent bien --------------------- */
  chk("la réserve de rétention est un négatif à part entière",
      NEGATIFS.some(function(n){ return n.k === "reserveRetention"; }));
  chk("les sept négatifs des livres sont créés",
      ["pasInspisse","distensionNeg","nucleomegalieNeg","eosinophilesNeg",
       "caliciformesNeg","spleniqueNeg","plasmoDestructionNeg"]
        .every(function(k){ return NEGATIFS.some(function(n){ return n.k === k; }); }));

  /* ---- Rétention : la seule borne bonne est un report -------------------- */
  chk("la borne bonne est empruntée aux autres organes",
      RETENTION.filter(function(r){ return r.q === "bon"; })
               .every(function(r){ return r.k === "horsPancreas"; }));

  await pause();

  /* On laisse la lame dans un état déclaré : le tronc commun relit le terme. */
  set("sa", "30");
  siege("corps");
  ech("multiTemoin");
}
