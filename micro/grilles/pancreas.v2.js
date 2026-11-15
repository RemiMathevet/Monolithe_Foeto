/* Grille de lecture — pancréas fœtal. VERSION 2 (2.0.0).
   Publiée à côté de la v1 (pancreas.js, 1.0.1) tant qu'elle n'a pas été validée
   à l'usage. Fond : ~/Bureau/fiches_lecture/fiche_pancreas.md (§1 à §9 ; §9
   porté, jamais arbitré). Forme : gen_grille.py, patron rein v3.5 / poumon v2.1.
   Les divergences entre sources sont PORTÉES dans les champs, jamais arbitrées.

   Ce que la v2 change par rapport à la v1, sans rien retrancher :
   · mode présence (schéma 0.3.0) : un signe est un CONSTAT, présent / absent /
     non regardé ; les maladies se lisent dans les associations, affichées,
     jamais cochées ;
   · les douze négatifs ne se cochent plus : chacun se DÉDUIT d'un signe répondu
     absent ou d'une donnée consignée (rétention regardée, Perls répondu, paire
     inclusion / infiltrat, paire plasmocytes / destruction). Pour que le négatif
     surchargeFoetale se déduise, un signe le porte (surchargeLysosomale) ; ce
     que la v1 écrivait pour un négatif non vérifié passe dans son texte (p) ;
   · branchée sur FOETO (termes tagués verbatim) : les 29 constats de la fiche
     ont chacun leur signe, libellé et HPO venus de la base. Neuf sont nouveaux
     (cristaux de Charcot-Leyden, pléomorphisme bêta, complexes ducto-insulaires,
     espaces kystiques intralobulaires, fibrose pancréatique, fibrose post-
     éosinophile, omphalocèle, RCIU sévère, cytomégalie surrénalienne). Deux
     paires v1 sont fondues parce qu'un seul terme FOETO porte les deux
     constats : kysteBordeCubique dans kystesCanalaires, mesenchymePrimitif dans
     canauxDilatesRamifies — le détail v1 passe en meta. Les constats de la fiche
     sans terme FOETO portent fiche:"[source]". Douze maladies FOETO sont portées
     par une association (fv) ; une association est ajoutée, la lésion canalaire
     ramifiée de la trisomie 18, que la v1 rangeait dans la dysplasie kystique ;
   · ordre de lecture (LECTURE) : cadres du pancréas (CADRES), du faible au fort
     grossissement ; grossissement par signe (mag) — savoir de pratique
     [expérience], à valider à l'usage ; chaque variante normale vit dans le cadre
     qu'elle mime et ne passe au CR qu'en parenthèse. Pancréas petit et pancréas
     non retrouvé sortent des signes vers le contexte hors lame. L'inclusion
     virale ne vit PAS avec l'infiltrat (CMV sans inflammation), la nécrose
     insulaire vit avec l'éosinophile péri-insulaire (le discriminant IDM /
     Coxsackie). Une variante ajoutée : le bourgeonnement ducto-insulaire normal
     (sens premier du mot nésidioblastose, § 5.2), qui mime les complexes ;
   · « Non » en bloc : les signes après technique (Perls, topographie insuline /
     glucagon) ne sont jamais répondus en bloc ; la topographie CONSERVÉE est en
     outre de polarité normale (bloc:false) ;
   · blocs lus en §02 (BLOCS) ; le prélèvement sépare ce qui qualifie la lecture
     des critères de coupe et de pesée, destinés à la future grille macro fixée ;
   · le viscère fœtal est examiné ENTIER : un siège entier (k:"entier") s'ajoute
     aux cinq sièges v1 ; il ne bloque pas la lecture endocrine (les cinq
     autres gardent leur verdict v1).

   Deux choses que la coquille ne sait pas faire, écrites ici plutôt que masquées
   (inchangées depuis la v1) :

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
      phrase d'ernst qui dit l'inverse — non tranchée (§ 9.1, § 9.17). En mode
      présence, la liste déroulante de rétention les range par h : ce sont deux
      lectures, pas deux paliers. */

/* 2.1.0 (2026-11-14) — lot FOETO, propositions relues par Kimi K3.1 Pro et vérifiées par script
   (verbatim mot pour mot dans la fiche) : 7 fenêtre(s) de terme — le « Non » en bloc ne répond plus
   un signe daté hors de sa fenêtre (seul : un par un) ; 16 code(s) FOETO existant(s) branché(s)
   (variantes, rétention, stades, mesures, associations) ; 6 code(s) créé(s) depuis le verbatim de la
   fiche. Les propositions jugées faibles ou fausses attendent le tri de Rémi. */
var ORGANE  = "pancreas";
var TITRE   = "pancréas";
var SOURCE  = "fiche_pancreas.md";
var MODULE  = "grille_pancreas";
var VERSION = "2.1.0";
var SCHEMA  = "0.3.0";   /* 0.3.0 : signes present/absent, négatifs déduits */
var ETATS   = "presence";
var FOETO_DANS_SIGNES = true;
var BLOCS   = true;
var LECTURE = true;   /* cadres (CADRES), grossissement (mag), variantes dans leur cadre */

/* Organe médian impair : la latéralité est sans objet. Son remplaçant
   fonctionnel est le SIÈGE — tête ≠ corps ≠ queue — et il est au § Maturation, où
   il BLOQUE : « There is proportionately more endocrine tissue present in the body
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

/* ── 02 · Prélèvement ─────────────────────────────────────────────────────── */
var PRELEV = [
  { k:"troisSieges", g:"Qualifie la lecture", l:"Trois sièges en bloc : tête (duodénum inclus), corps, queue", grave:true,
    manque:"« Samples should be obtained from the head (including the duodenum), body, and tail » " +
           "[ernst, ch. 6] — et sur un bloc unique « toute quantification endocrine est invalide », " +
           "parce que la densité insulaire varie d'un lobule à l'autre ET d'un siège à l'autre" },
  { k:"duodenum", g:"Qualifie la lecture", l:"Duodénum présent sur le bloc de tête", grave:true,
    manque:"c'est le seul moyen de voir « Pancreatic tissue may be intermingled with the duodenal " +
           "muscularis » [keeling, ch. 22] — sans lui le pancréas annulaire n'est pas confirmable, et " +
           "le divisum ne se lit de toute façon pas sur une coupe" },
  { k:"queueHile", g:"Qualifie la lecture", l:"Les 5 derniers millimètres de la queue, inclus AVEC le hile splénique", grave:true,
    manque:"« Il est important de prélever les 5 derniers millimètres de la queue du pancréas et de " +
           "l'inclure avec le hile splénique pour identifier ces anomalies évocatrices en premier lieu " +
           "d'une trisomie 13 » [soffoet, ch. 7] — ce bloc d'interface se perd si la queue est " +
           "sectionnée à distance de la rate" },
  { k:"pancreasRetrouve", g:"Qualifie la lecture", l:"Pancréas effectivement retrouvé et mis en bloc", grave:true,
    manque:"« Le pancréas n'a pas été identifié dans la masse digestive » [corpus CR] s'écrit, ne se " +
           "laisse pas vide — et avant d'écrire agénésie il faut rouvrir la masse duodénale : " +
           "« in assessment of the pancreas, where a significant portion of the gland may remain with " +
           "the duodenum » [keeling, ch. 15]" },
  { k:"autresOrganes", g:"Qualifie la lecture", l:"État de conservation des AUTRES organes du même fœtus noté", grave:true,
    manque:"le pancréas n'a pas de borne propre : la rétention se reporte des autres organes, elle ne " +
           "se mesure pas sur lui (§ 2)" },
  { k:"temoinAge", g:"Qualifie la lecture", l:"Témoin apparié en âge disponible pour comparaison",
    manque:"c'est la seule parade que les livres proposent pour toute lecture endocrine, et elle " +
           "est organisationnelle : « sampling various parts of the pancreas, including head, neck and " +
           "tail, and comparison with age-matched controls is helpful in histological assessment » " +
           "[keeling, ch. 26]" },
  { k:"pas", g:"Qualifie la lecture", l:"PAS disponible sur le bloc",
    manque:"c'est la coloration du matériel apical acineux de mucoviscidose, attendu « vers 20 SA » et " +
           "pas avant [soffoet, ch. 7]" },
  { k:"perls", g:"Qualifie la lecture", l:"Perls disponible sur le bloc",
    manque:"le pancréas est un organe-cible du fer ET le témoin négatif du service : « pancréas Perls " +
           "négatifs » est ce qui restreint une surcharge au foie [corpus CR]" },
  { k:"blocsSupp", g:"Critères de coupe et pesée — iront à la grille macro fixée", l:"Blocs pancréatiques supplémentaires si omphalocèle ou macrosomie",
    manque:"l'omphalocèle impose d'« orienter les prélèvements histologiques, en particulier pour le " +
           "pancréas, les surrénales » [soffoet, ch. 7]" },
  { k:"poidsFoetal", g:"Critères de coupe et pesée — iront à la grille macro fixée", l:"Poids fœtal consigné, pour le seul chiffre normé de l'organe",
    manque:"la seule normale publiée du pancréas est indexée sur le POIDS FŒTAL, pas sur le terme " +
           "[soffoet, ch. 7] — sans le dénominateur, le poids pancréatique ne se lit pas" }
];

/* ── 03 · Rétention ───────────────────────────────────────────────────────────
   Report assumé, comme au thymus et au muscle : la seule ligne recevable vient
   des AUTRES organes. Et la divergence dominante de la fiche est ici — ernst
   décrit un organe bien conservé, le service s'en sert pour dater. Les deux
   lectures sont portées, aucune n'est arbitrée (§ 9.1, § 9.17). */
var RETENTION = [
  { k:"horsPancreas", l:"Rang de rétention établi sur les AUTRES organes du fœtus",
    b:"celle des autres organes", d:"lue hors pancréas, Table 15.6", h:1, q:"bon",
    note:HORS_TABLE, alerte:PLAFOND },
  { k:"basoPancreas", fv:"FOETO:PF.END-RET-009", l:"Perte de basophilie nucléaire pancréatique cotée dans la séquence du service",
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

/* ── 04 · Chronologie du rapport stroma / glande ──────────────────────────────
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

/* ── 04 bis · Siège du bloc, échantillonnage, et les trois chiffres ────────────
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
  /* v2 : le viscère fœtal est examiné ENTIER — le siège « entier » ne bloque rien,
     la comparaison tête / corps / queue se fait alors sur la lame elle-même. */
  { k:"entier",     l:"Pancréas entier — tête, corps et queue sur la lame" },
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
  champs:[{ id:"poids",  fv:"FOETO:PF.END-NOR-051", label:"Poids pancréatique (g) — normale indexée sur le poids FŒTAL, pas sur le terme", min:0, max:20, step:0.1 },
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
    if (sg === "entier")
      t.push("Organe entier : la densité endocrine se compare d'un siège à l'autre sur la même lame — « There " +
             "is proportionately more endocrine tissue present in the body and the tail of the pancreas than " +
             "in the head » [keeling, ch. 26].");
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

    if (sa < 27 && (E.signes.densificationTrame === POS || E.signes.fibrosePancreatique === POS)){
      if (cls === "ok") cls = "warn";
      t.push("⚠️ Densification de la trame ou fibrose présente à " + sa + " SA : avant le 3e trimestre, un " +
             "stroma abondant dans ET entre les lobules est le NORMAL de l'organe. Le corpus a d'ailleurs le " +
             "bon mot : « Le pancréas présente une densification de la trame conjonctive normale et " +
             "une discrète dilatation des canaux excréteurs ».");
    }
    if (sa < 20 && E.signes.materielInspisse === POS)
      res.push("matériel inspissé présent avant 20 SA — le signe n'est pas attendu à ce terme, la source " +
               "le date « vers 20 SA » et pas avant");
  }

  /* ── Cohérences entre le siège déclaré et les signes présents ───────────── */
  if (E.signes.tissuSpleniqueIntrapancreatique === POS && sg !== "queue" && sg !== "interface" && sg !== "entier")
    res.push("tissu splénique intrapancréatique présent hors queue et hors bloc d'interface — vérifier le " +
             "siège avant d'en faire un signe de trisomie 13");
  if (E.signes.tissuDansMusculeuseDuodenale === POS && sg !== "tete" && sg !== "entier")
    res.push("tissu pancréatique dans la musculeuse duodénale présent hors bloc de tête — le pancréas " +
             "annulaire se confirme sur le bloc de tête, et se diagnostique à la macroscopie");
  if ((E.signes.nucleomegalie === POS || E.signes.ilotsVolumineux === POS || E.signes.betaPleomorphisme === POS) &&
      !E.prelev.temoinAge)
    res.push("critère endocrine présent sans témoin apparié en âge — les six caractères NORMAUX du " +
             "pancréas fœtal miment tous une hyperplasie, et c'est le témoin qui les départage");
  if (!E.prelev.troisSieges)
    res.push("trois sièges non confirmés au prélèvement — la stratification manque à la racine");

  if (res.length){ if (cls === "ok") cls = "warn"; t.push("Réserves : " + res.join(" ; ") + "."); }
  return { cls:cls, txt:t.join(" ") };
}

/* ── Variantes normales — chacune sous le cadre dont elle mime un signe ───────
   C'est la partie la plus rentable de la fiche : six caractères NORMAUX du
   pancréas endocrine fœtal miment à eux seuls une hyperplasie, et les deux
   livres assortissent le tableau du même avertissement. */
var VARIANTES = [
  { k:"endocrineDiffus",   fv:"FOETO:PF.END-NOR-061", g:"Îlots — taille et disposition", l:"Cellules endocrines isolées ou en petits nids plutôt qu'en îlots compacts" },
  { k:"dixPourCent",       fv:"FOETO:PF.END-NOR-062", g:"Îlots — taille et disposition", l:"Composante endocrine ≈ 10 % du volume — contre 1–2 % chez l'adulte" },
  { k:"densiteVariable",   fv:"FOETO:PF.END-NOR-059", g:"Îlots — taille et disposition", l:"Densité insulaire variable d'un lobule à l'autre" },
  { k:"tailleVariable",    fv:"FOETO:PF.END-NOR-066", g:"Îlots — taille et disposition", l:"Taille et forme des îlots variables" },
  { k:"ilotsMalLimites",   fv:"FOETO:PF.END-NOR-064", g:"Îlots — taille et disposition", l:"Îlots mal circonscrits — « Fetal islets generally are not as compact and well circumscribed as islets in individuals who are several months old »" },
  { k:"ilotsSeptaux",      fv:"FOETO:PF.END-NOR-065", g:"Îlots — taille et disposition", l:"Îlots septaux — « septal islets are not uncommon in the fetus and newborn »" },
  { k:"bourgeonnement",    fv:"FOETO:PF.END-NOR-056", g:"Îlots — taille et disposition", l:"Bourgeonnement endocrine ducto-insulaire du développement — « The term nesidioblastosis was initially used to describe this normal developmental process »" },
  { k:"centroAcineuses",   fv:"FOETO:PF.END-NOR-058", g:"Îlots au fort grossissement", l:"Cellules centro-acineuses proéminentes, qui miment les cellules endocrines" },
  { k:"hematopoiese",      fv:"FOETO:PF.END-MAL-089", g:"Infiltrats interstitiels", l:"Hématopoïèse extramédullaire, parfois volumineuse, dissociant les acini — « ne doivent pas conduire à un faux diagnostic de pancréatite interstitielle »" },
  { k:"infiltratLympho",   fv:"FOETO:PF.END-MAL-030", g:"Infiltrats interstitiels", l:"Infiltrat lymphocytaire — présent chez 50 % des fœtus (Liu and Potter)" },
  { k:"agregatsLymphoides",fv:"FOETO:PF.DIG-INF-001", g:"Infiltrats interstitiels", l:"Agrégats lymphoïdes péri-pancréatiques — « lymphoid heterotopias »" },
  { k:"stromaMidtrimestre",g:"Kystes, trame et fibrose", l:"Stroma abondant dans ET entre les lobules avant le 3e trimestre" },
  { k:"canalAccessoire",   fv:"FOETO:PF.END-NOR-057", g:"Kystes, trame et fibrose", l:"Canal accessoire atrophique ou absent — « undergoes varying degrees of atrophy and may be absent »" },
  { k:"heterotopieSplenique", g:"Position et interface splénique", l:"Hétérotopie splénique nodulaire de la queue, découverte fortuite isolée" },
  { k:"amasAcineuxAntre",  fv:"FOETO:PF.END-NOR-054", g:"Position et interface splénique", l:"Amas de cellules acineuses ectopiques dans l'antre gastrique" }
];

/* ── Cadres — dans l'ordre où on lit la lame ──────────────────────────────────
   Le faible grossissement d'abord (position, kystes, trame), puis l'exocrine et
   l'interstitium, puis l'endocrine (îlots au moyen, cellules au fort), puis ce
   qui ne se répond qu'après coloration spéciale. */
var CADRES = [
  { g:"Contexte hors lame — macro, autres organes, clinique", hors:true },
  { g:"Position et interface splénique", sur:"Architecture" },
  { g:"Kystes, trame et fibrose", sur:"Architecture" },
  { g:"Acini et canaux", sur:"Exocrine et interstitium" },
  { g:"Infiltrats interstitiels", sur:"Exocrine et interstitium" },
  { g:"Îlots — taille et disposition", sur:"Endocrine" },
  { g:"Îlots au fort grossissement", sur:"Endocrine" },
  { g:"Perls et site-témoin", sur:"Surcharges" }
];

/* ── Signes ───────────────────────────────────────────────────────────────────
   On répond des CONSTATS, un à la fois : présent, absent, ou non regardé (rien
   cliqué). Aucun nom d'entité ici : les noms se lisent dans les associations.
   Un signe branché sur FOETO (fv) prend son libellé et son HPO dans la base ; le
   commentaire en bout de ligne rappelle ce libellé. Un constat de la fiche sans
   terme FOETO porte fiche:"[source]". */
var SIGNES = [
  /* — Contexte hors lame — macro, autres organes, clinique — */
  { k:"pancreasPetit", fiche:"[keeling, ch. 22] · [soffoet, ch. 7]", g:"Contexte hors lame — macro, autres organes, clinique",
    l:"Pancréas macroscopiquement absent, réduit ou hypoplasique" },
  { k:"pancreasNonRetrouve", fiche:"[corpus CR] · [keeling, ch. 15]", g:"Contexte hors lame — macro, autres organes, clinique",
    l:"Pancréas non identifié à la dissection", meta:"non identifié n'est pas absent : rouvrir la masse duodénale avant toute phrase d'agénésie" },
  { k:"omphalocele", fv:"FOETO:PF.END-MAL-068", g:"Contexte hors lame — macro, autres organes, clinique",
    meta:"impose des blocs pancréatiques supplémentaires (§ 02)" },   // Omphalocèle ou hernie dans le cordon avec macrosomie
  { k:"rciuSevere", fv:"FOETO:PF.END-MAL-069", g:"Contexte hors lame — macro, autres organes, clinique",
    meta:"« Congenital absence of the pancreas is rare and is associated with severe intrauterine growth restriction »" },   // Retard de croissance intra-utérin sévère
  { k:"cytomegalieSurrenale", fv:"FOETO:PF.END-MAL-059", g:"Contexte hors lame — macro, autres organes, clinique",
    meta:"se lit sur la surrénale : « Adrenal cells also show cytomegaly »" },   // Cytomégalie surrénalienne

  /* — Position et interface splénique — */
  { k:"tissuDansMusculeuseDuodenale", fv:"FOETO:PF.END-MAL-072", g:"Position et interface splénique", mag:"faible",
    meta:"sur le bloc de tête : seul caractère histologique du pancréas annulaire, qui se diagnostique à la macroscopie" },   // Tissu pancréatique intriqué à la musculeuse duodénale
  { k:"heterotopieDigestive", fv:"FOETO:PF.DIG-MAL-020", g:"Position et interface splénique", mag:"faible",
    meta:"nodule pancréatique dans une paroi digestive, à canaux ± acini ± îlots ; un simple amas de cellules acineuses n'en est pas un" },   // Hétérotopie pancréatique
  { k:"tissuSpleniqueIntrapancreatique", fv:"FOETO:PF.DIG-MAL-022", g:"Position et interface splénique", mag:"faible",
    meta:"tissu splénique intrapancréatique ; étendu ou avec fusion spléno-pancréatique, il entre dans le profil de trisomie 13 — « if they are extensive or accompanied by splenopancreatic fusion »" },   // Hétérotopie splénique nodulaire pancréatique
  { k:"lesionHemorragiqueQueue", fiche:"[soffoet, ch. 3]", g:"Position et interface splénique", mag:"faible",
    l:"Lésion hémorragique de la queue du pancréas",
    meta:"le geste de prélèvement passe précisément par là — trancher sur la récence et le siège exact" },

  /* — Kystes, trame et fibrose — */
  { k:"kystesCanalaires", fv:"FOETO:PF.END-MAL-067", g:"Kystes, trame et fibrose", mag:"faible",
    meta:"« lined by flattened to cuboidal epithelium and the cyst wall may contain fibrosis » ; siège en divergence : tête (soffoet), queue (keeling)" },   // Distension kystique des canaux, voire d'acini ; kystes bordés d'un épithélium aplati à cubique
  { k:"espacesKystiques", fv:"FOETO:PF.END-MAL-062", g:"Kystes, trame et fibrose", mag:"faible",
    meta:"intralobulaires, acini et îlots entre les kystes — « cystic spaces lined by cuboidal to columnar epithelium »" },   // Espaces kystiques intralobulaires bordés d'un épithélium cubique à cylindrique
  { k:"canauxDilatesRamifies", fv:"FOETO:PF.END-MAL-071", g:"Kystes, trame et fibrose", mag:"faible",
    meta:"canaux ramifiés et kystiques, bordés d'un épithélium cubique, dans un mésenchyme primitif — « branching and cystically dilated duct-like structures »" },   // Structures canalaires ramifiées et kystiques dans un mésenchyme primitif contenant des acini
  { k:"fibrosePancreatique", seul:true, fv:"FOETO:PF.END-MAL-063", g:"Kystes, trame et fibrose", mag:"faible",
    meta:"« La fibrose n'est pas visible avant le troisième trimestre » ; avec kystes, ou dans les infections et la surcharge ferrique" },   // Fibrose pancréatique
  { k:"densificationTrame", fv:"FOETO:PF.END-NOR-109", seul:true, fiche:"[ernst, ch. 6] · [soffoet, ch. 7]", g:"Kystes, trame et fibrose", mag:"faible",
    l:"Densification de la trame conjonctive",
    meta:"avant le 3e trimestre, c'est le stroma normal du 2e trimestre jusqu'à preuve du contraire" },
  { k:"cellulesCaliciformes", fv:"FOETO:PF.END-MAL-056", g:"Kystes, trame et fibrose", mag:"fort",
    meta:"caractère NON physiologique du pancréas — c'est le critère qui réunit les anomalies chromosomiques" },   // Cellules caliciformes dans les canaux pancréatiques

  /* — Acini et canaux — */
  { k:"distensionCanalaire", seul:true, fv:"FOETO:PF.END-MAL-061", g:"Acini et canaux", mag:"faible",
    meta:"« La distension des canaux pancréatiques est plus nette au troisième trimestre »" },   // Distension des canaux pancréatiques
  { k:"materielInspisse", terme:[null, 20], fiche:"[keeling, ch. 22] · [soffoet, ch. 7]", g:"Acini et canaux", mag:"moyen",
    l:"Matériel éosinophile ou PAS+ inspissé dans les acini et les canaux",
    meta:"le signe est daté : « vers 20 SA », jamais avant la mi-gestation" },
  { k:"atrophieAcineuse", fv:"FOETO:PF.END-MAL-143", fiche:"[keeling, ch. 22]", g:"Acini et canaux", mag:"moyen",
    l:"Atrophie acineuse",
    meta:"ne compte que si elle est accompagnée de fibrose ; seule, c'est de la lyse" },
  { k:"fibrosePeriCanalaire", fv:"FOETO:PF.END-MAL-144", seul:true, fiche:"[keeling, ch. 22]", g:"Acini et canaux", mag:"moyen",
    l:"Fibrose péri-canalaire et inter-acineuse",
    meta:"avec l'atrophie acineuse : « acinar atrophy and periductal and interacinar fibrosis are evidence of severe involvement »" },
  { k:"aplatissementEpithelial", fv:"FOETO:PF.END-MAL-145", fiche:"[keeling, ch. 22]", g:"Acini et canaux", mag:"fort",
    l:"Aplatissement de l'épithélium acineux ou canalaire" },
  { k:"inclusionOeilDeHibou", fv:"FOETO:PF.END-MAL-066", g:"Acini et canaux", mag:"fort",
    meta:"en CMV pancréatique, l'absence d'infiltrat n'exclut rien — « Les cellules cytomégaliques s'observent essentiellement dans le pancréas exocrine »" },   // Inclusions nucléaires virales en œil de hibou, sans réaction inflammatoire, surtout dans l'exocrine

  /* — Infiltrats interstitiels — */
  { k:"infiltratDense", seul:true, fiche:"[keeling, ch. 26] · [ernst, ch. 6]", g:"Infiltrats interstitiels", mag:"faible",
    l:"Infiltrat inflammatoire pancréatique dense",
    meta:"isolé, il est normal chez 50 % des fœtus : il ne bascule qu'avec plasmocytes ou destruction" },
  { k:"erythropoieseInterstitielle", fv:"FOETO:PF.END-MAL-146", seul:true, fiche:"[keeling, ch. 26]", g:"Infiltrats interstitiels", mag:"moyen",
    l:"Interstitium infiltré de cellules érythropoïétiques",
    meta:"l'hématopoïèse extramédullaire pancréatique est une variante normale du 2e trimestre" },
  { k:"destructionParenchyme", fv:"FOETO:PF.END-MAL-060", g:"Infiltrats interstitiels", mag:"moyen" },   // Destruction du parenchyme ou des canaux
  { k:"plasmocytes", fv:"FOETO:PF.END-INF-002", g:"Infiltrats interstitiels", mag:"fort" },   // Infiltrat plasmocytaire significatif
  { k:"elementsMyeloides", fv:"FOETO:PF.END-MAL-070", g:"Infiltrats interstitiels", mag:"fort",
    meta:"à distinguer de l'hématopoïèse normale" },   // Éléments myéloïdes d'une réaction leucémoïde généralisée

  /* — Îlots — taille et disposition — */
  { k:"ilotsVolumineux", fv:"FOETO:PF.END-MAL-012", g:"Îlots — taille et disposition", mag:"moyen",
    meta:"îlots anormalement volumineux, de l'ordre de trois fois la taille attendue pour l'âge ; ne s'oppose qu'avec plusieurs sièges et un témoin" },   // Hyperplasie des îlots de Langerhans
  { k:"ilotsNodulaires", fv:"FOETO:PF.END-MAL-065", g:"Îlots — taille et disposition", mag:"moyen" },   // Îlots hyperplasiques formant des nodules irréguliers
  { k:"cordonsAcini", fv:"FOETO:PF.END-MAL-058", g:"Îlots — taille et disposition", mag:"moyen" },   // Nombreuses cellules endocrines en cordons, acini peu développés
  { k:"complexesDuctoInsulaires", fv:"FOETO:PF.END-MAL-057", g:"Îlots — taille et disposition", mag:"moyen",
    meta:"« Ductulo-insular complexes may be hyperplastic with squamous metaplasia of ductular epithelium » ; le bourgeonnement ducto-insulaire normal du fœtus les mime" },   // Complexes ducto-insulaires hyperplasiques avec métaplasie malpighienne canalaire
  { k:"topographieConservee", bloc:false, fv:"FOETO:PF.END-MAL-073", g:"Îlots — taille et disposition", mag:"technique",
    meta:"IHC insuline + glucagon ; critère discriminant : sa conservation malgré une hyperplasie oriente vers l'érythroblastose" },   // Répartition insuline/glucagon conservée dans des îlots hyperplasiques

  /* — Îlots au fort grossissement — */
  { k:"fibrosePostEosino", fv:"FOETO:PF.END-MAL-064", g:"Îlots au fort grossissement", mag:"moyen",
    meta:"borne POST-NATALE — « from about 11 days onwards, there may be fibrosis » : sans objet chez le fœtus" },   // Fibrose succédant à l'infiltrat éosinophile
  { k:"eosinophilesPeriInsulaires", fv:"FOETO:PF.END-MAL-031", g:"Îlots au fort grossissement", mag:"fort",
    meta:"« around, and not within » — c'est la topographie qui porte le critère, pas la densité" },   // Infiltrat péri-insulaire à éosinophiles
  { k:"charcotLeyden", fv:"FOETO:PF.END-MAL-005", g:"Îlots au fort grossissement", mag:"fort",
    meta:"dans l'infiltrat péri-insulaire — « occasionally with Charcot–Leyden crystals »" },   // Cristaux de Charcot-Leyden dans le pancréas
  { k:"necroseInsulaire", fv:"FOETO:PF.END-MAL-040", g:"Îlots au fort grossissement", mag:"fort",
    meta:"le discriminant entre éosinophiles d'enfant de mère diabétique et Coxsackie B" },   // Nécrose des cellules insulaires (infection virale)
  { k:"nucleomegalie", fv:"FOETO:PF.DIG-NOR-044", g:"Îlots au fort grossissement", mag:"fort",
    meta:"critère le plus fiable ET non spécifique ; dénominateur divergent selon la source (§ 9.11) : ×3–4 les voisins (ernst), ×3–5 les noyaux acineux (keeling)" },   // Nucléomégalie des cellules endocrines pancréatiques
  { k:"betaPleomorphisme", fv:"FOETO:PF.END-MAL-048", g:"Îlots au fort grossissement", mag:"fort",
    meta:"« β cells are increased in number and show nuclear pleomorphism and gigantism »" },   // Pléomorphisme et gigantisme nucléaire des cellules bêta pancréatiques
  { k:"cellulesPalesNoyauCentral", fv:"FOETO:PF.END-NOR-110", fiche:"[ernst, ch. 6]", g:"Îlots au fort grossissement", mag:"fort",
    l:"Cellules pâles à noyau central au sein des acini",
    meta:"centro-acineuses jusqu'à preuve kératine : « occasionally they can be prominent and can be mistakenly interpreted as endocrine cells »" },

  /* — Perls et site-témoin — */
  { k:"surchargeLysosomale", fiche:"[corpus CR]", g:"Perls et site-témoin", mag:"fort",
    l:"Surcharge fœtale sur le site-témoin pancréatique",
    meta:"le pancréas est l'un des six sites-témoins du bilan de surcharge du service (lymphatiques, podocytes, pancréas, rate, SRH, thymus)" },
  { k:"perlsAcineux", fv:"FOETO:PF.END-MET-001", g:"Perls et site-témoin", mag:"technique",
    meta:"Perls positif dans les cellules épithéliales ACINEUSES" },   // Surcharge en fer épithéliale acineuse (Perls +)
  { k:"perlsHistiocytaire", fv:"FOETO:PF.END-MET-002", g:"Perls et site-témoin", mag:"technique",
    meta:"Perls positif dans les cellules histiocytaires seulement" }   // Surcharge en fer histiocytaire
];

/* ── Associations — affichées, jamais cochées ─────────────────────────────────
   Elles se déduisent des signes présents. « cle » est le signe pivot : sans lui
   le compte peut être atteint sans que l'association tienne. Chaque réserve dit
   ce que la lame ne permet PAS d'écrire. Un fv porte le terme maladie de FOETO,
   affiché, jamais exporté d'office. */
var DIAGS = [
  { k:"mucoviscidoseAssoc", l:"Mucoviscidose — signes précoces", fv:"FOETO:PF.END-MAL-083",
    signes:["materielInspisse","aplatissementEpithelial","distensionCanalaire",
            "fibrosePeriCanalaire","atrophieAcineuse"],
    min:2, cle:"materielInspisse",
    stop:"le pancréas évoque, il ne diagnostique pas — la confirmation est génétique. Et un fœtus atteint peut avoir un pancréas normal : l'atteinte s'installe souvent après la naissance. Le matériel apical PAS+ est daté « vers 20 SA » : plus tôt, son absence ne vaut rien." },

  { k:"hyperinsulinismeAssoc", l:"Hyperinsulinisme congénital", fv:"FOETO:PF.END-MAL-079",
    signes:["nucleomegalie","ilotsVolumineux","cordonsAcini","betaPleomorphisme","complexesDuctoInsulaires"],
    min:1, cle:"nucleomegalie",
    stop:"seule la nucléomégalie porte : « Islet cells with nucleomegaly (nuclei three to four times the size of their neighbors) are the most reliable evidence for congenital hyperinsulinism ». Le volume insulaire seul ne conclut pas. Aucun rapport nucléaire n'est chiffré ici : les sources ne prennent pas le même dénominateur — « three to five times the size of adjacent acinar nuclei » d'un côté, les noyaux voisins de l'autre. Focale contre diffuse : cette lame ne tranche pas." },

  { k:"mereDiabetiqueAssoc", l:"Enfant de mère diabétique", fv:"FOETO:PF.END-MAL-081",
    signes:["eosinophilesPeriInsulaires","ilotsVolumineux","topographieConservee","charcotLeyden","betaPleomorphisme","fibrosePostEosino"],
    min:2, cle:"eosinophilesPeriInsulaires",
    stop:"l'infiltrat est « around, and not within » l'îlot : dedans, ce n'est plus cela. Le même éosinophile péri-insulaire se voit dans le Coxsackie — le discriminant est la nécrose insulaire, pas l'éosinophile. Sans nécrose regardée, l'association reste ouverte. L'infiltrat n'entoure que certains îlots : son absence sur un bloc n'exclut rien. La fibrose qui lui succède est post-natale." },

  { k:"coxsackieAssoc", l:"Coxsackie B — atteinte insulaire", fv:"FOETO:PF.END-INF-003",
    signes:["necroseInsulaire","eosinophilesPeriInsulaires","infiltratDense"],
    min:1, cle:"necroseInsulaire",
    stop:"« The diagnosis is easy to miss if there is no accompanying inflammatory cell infiltrate. » — une lame sans infiltrat n'exclut donc rien. Sérologie et PCR tranchent, pas l'histologie." },

  { k:"cmvAssoc", l:"CMV pancréatique", fv:"FOETO:PF.END-INF-004",
    signes:["inclusionOeilDeHibou","infiltratDense","plasmocytes"],
    min:1, cle:"inclusionOeilDeHibou",
    stop:"l'inclusion signe le virus, son absence ne l'exclut pas. Le corpus écrit d'ailleurs « absence d'inclusion nucléaire » comme un constat, jamais comme une exclusion. IHC ou PCR pour trancher." },

  { k:"basculeInflammatoire", l:"Infiltrat lymphoïde — bascule du physiologique au pathologique",
    signes:["plasmocytes","destructionParenchyme","infiltratDense"],
    min:2,
    stop:"pas de signe pivot ici, c'est un OU : « if such infiltrates are accompanied by a significant infiltrate of plasma cells or the destruction of parenchyma or ducts, infections such as cytomegalovirus or immune dysregulation disorders should be considered ». Un infiltrat lymphoïde seul reste une variante normale. Le seuil de « significant » n'est chiffré nulle part : c'est un jugement, pas une mesure." },

  { k:"beckwithAssoc", l:"Hyperplasie endocrine syndromique (Beckwith-Wiedemann)", fv:"FOETO:PF.END-MAL-075",
    signes:["ilotsVolumineux","cordonsAcini","nucleomegalie","ilotsNodulaires","cytomegalieSurrenale","omphalocele"],
    min:2, cle:"ilotsVolumineux",
    stop:"le pancréas est une pièce du syndrome, pas le syndrome. Et l'hyperplasie endocrine apparente est le piège majeur de cet organe : sans témoin apparié en âge et sans plusieurs sièges, le constat n'est pas opposable — « The quantification of endocrine tissue is complicated by the considerable variation in the concentration of islets from one lobule to the next ». L'omphalocèle et la cytomégalie surrénalienne se lisent hors de cette lame." },

  { k:"erythroblastoseAssoc", l:"Érythroblastose — hyperplasie insulaire de l'anémie chronique", fv:"FOETO:PF.END-MAL-077",
    signes:["ilotsVolumineux","erythropoieseInterstitielle","elementsMyeloides","topographieConservee"],
    min:2, cle:"ilotsVolumineux",
    stop:"l'érythropoïèse interstitielle est physiologique au 2e trimestre : elle ne devient un argument que rapportée à un âge déclaré. Le foie, la rate et la moelle décident avant le pancréas. Le discriminant est la topographie insuline / glucagon CONSERVÉE dans l'îlot, qui ne se lit qu'en IHC." },

  { k:"agenesieAssoc", l:"Agénésie ou hypoplasie pancréatique", fv:["FOETO:PF.END-MAL-074","FOETO:PF.END-MAL-080"],
    signes:["pancreasPetit","pancreasNonRetrouve","rciuSevere"],
    min:1, cle:"pancreasPetit",
    stop:"non identifié à la dissection n'est pas absent : le pancréas fœtal est petit, mou, autolytique et se dissocie du rétropéritoine. Sans réserve de dissection levée, l'agénésie ne s'écrit pas. Un pancréas hypoplasique impose de regarder les reins (MODY5, HNF1B). Le diabète néonatal n'a pas d'autre substrat morphologique décrit que celui-ci." },

  { k:"annulaireAssoc", l:"Pancréas annulaire", fv:"FOETO:PF.END-MAL-084",
    signes:["tissuDansMusculeuseDuodenale","heterotopieDigestive"],
    min:1, cle:"tissuDansMusculeuseDuodenale",
    stop:"« Pancreatic tissue may be intermingled with the duodenal muscularis » est le seul caractère histologique — le discriminant avec l'hétérotopie simple est MACROSCOPIQUE (anneau autour du deuxième duodénum). Sans la macroscopie, la lame ne choisit pas." },

  { k:"heterotopieAssoc", l:"Hétérotopie pancréatique digestive",
    signes:["heterotopieDigestive","tissuDansMusculeuseDuodenale"],
    min:1, cle:"heterotopieDigestive",
    stop:"différentiel obligé du pancréas annulaire, et il ne se tranche pas sur la lame. Reprendre la macroscopie duodénale. Isolée, c'est une variante d'environ 1 % de la population : elle se décrit, elle ne fonde pas seule une orientation chromosomique." },

  { k:"dysplasieKystiqueAssoc", l:"Dysplasie kystique du pancréas",
    signes:["kystesCanalaires","fibrosePancreatique","canauxDilatesRamifies","espacesKystiques"],
    min:2, cle:"kystesCanalaires",
    stop:"le siège des kystes est en divergence ouverte : « plutôt localisés à la tête » d'un côté, « more likely to be located in the tail » de l'autre — et les deux énoncés ne portent pas sur le même objet. Conséquence : échantillonner les DEUX pôles, ne rien conclure sur un bloc unique. Le rein, le foie et la rate décident ici plus que le pancréas." },

  { k:"trisomie13Assoc", l:"Profil pancréatique d'anomalie chromosomique", fv:"FOETO:PF.END-MAL-086",
    signes:["cellulesCaliciformes","tissuSpleniqueIntrapancreatique","espacesKystiques","kystesCanalaires"],
    min:2, cle:"cellulesCaliciformes",
    stop:"le caractère qui porte est la cellule caliciforme, non physiologique dans le pancréas — avec « Intrapancreatic splenic tissue is also seen ». Mais un profil n'est pas un caryotype : cette lame oriente la prescription, elle ne classe pas le fœtus." },

  { k:"trisomie18Assoc", l:"Lésion canalaire ramifiée — profil de trisomie 18", fv:"FOETO:PF.END-MAL-087",
    signes:["canauxDilatesRamifies","elementsMyeloides"],
    min:1, cle:"canauxDilatesRamifies",
    stop:"un profil n'est pas un caryotype : cette lame oriente la prescription, elle ne classe pas le fœtus. Les mêmes canaux ramifiés et kystiques entrent dans la dysplasie kystique ; les éléments myéloïdes d'une réaction leucémoïde se voient aussi dans les infections congénitales et la trisomie 21." },

  { k:"surchargeFerAssoc", l:"Surcharge ferrique pancréatique", fv:"FOETO:PF.END-MAL-078",
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
    signes:["densificationTrame","fibrosePeriCanalaire","atrophieAcineuse","fibrosePancreatique"],
    min:2, cle:"densificationTrame",
    stop:"avant le 3e trimestre, le stroma abondant est la norme et non une fibrose. Il n'existe aucun seuil publié de rapport stroma sur glande : le terme en SA, déclaré, est le seul juge disponible." }
];

/* ── Négatifs obligatoires — déduits, jamais cochés ───────────────────────────
   Le pancréas est, dans ce corpus, un organe de NÉGATIFS plus que de lésions.
   Les cinq premiers sont la doctrine locale écrite, repris tels quels. Les sept
   suivants sont réclamés par les livres et ne sont écrits dans AUCUN compte
   rendu du service : ils sont créés ici, et c'est assumé comme un ajout. Chacun
   est lié à un signe (énoncé quand il est répondu absent) ou calculé (auto). */
function absents(){
  var k = Array.prototype.slice.call(arguments);
  if (k.some(function(x){ return E.signes[x] === POS; })) return false;
  return k.every(function(x){ return E.signes[x] === NEG; }) ? true : null;
}
var NEGATIFS = [
  { k:"cytoarchitecture", l:"Absence d'anomalie de la cytoarchitecture pancréatique",
    p:"le seul négatif propre à l'organe réellement écrit — et c'est une formule globale, pas un critère : " +
      "énoncé quand tous les signes de lame (hors techniques) sont répondus absents",
    ko:"un signe de lame est PRÉSENT : la formule globale du service ne s'écrit pas, on décrit",
    auto:function(){
      var lame = SIGNES.filter(function(x){ return x.mag && x.mag !== "technique"; });
      return absents.apply(null, lame.map(function(x){ return x.k; })); } },
  { k:"reserveRetention", l:"Réserve de rétention accolée au négatif — « sous réserve de la rétention »",
    p:"la formulation attestée énonce le négatif ET son plafond dans la même phrase ; ne pas l'amputer — " +
      "énoncée dès que la rétention est regardée",
    ko:"négatif pancréatique écrit SANS sa réserve de rétention — le plafond de lecture disparaît de la phrase",
    auto:function(){ return Object.keys(E.retention).length || E.kcl ? true : null; } },
  { k:"triadeVirale", l:"Absence d'inclusion nucléaire, absence de cellule géante, absence d'inflammation",
    p:"triade générique appliquée au pancréas ; couvre le CMV (inclusion sans infiltrat) et le Coxsackie — " +
      "déduite de l'inclusion virale et de l'infiltrat répondus",
    ko:"inclusion virale ou infiltrat PRÉSENT : la triade inclusion / cellule géante / inflammation ne s'énonce pas",
    auto:function(){ return absents("inclusionOeilDeHibou", "infiltratDense"); } },
  { k:"perlsNegatif", l:"Perls pancréatique négatif",
    p:"énoncé organe par organe dans le corpus — « Le Perls sur le foie, thyroïde, rate, pancréas, reins est négatif » ; " +
      "non répondu, le statut du fer pancréatique n'est pas tranché : ni acineux, ni histiocytaire, ni négatif",
    ko:"Perls pancréatique POSITIF — dire le compartiment : acineux ou histiocytaire",
    auto:function(){ return absents("perlsAcineux", "perlsHistiocytaire"); } },
  { k:"surchargeFoetale", signe:"surchargeLysosomale", l:"Absence de surcharge fœtale sur le site-témoin pancréatique",
    p:"« absence de surcharge fœtale (lymphatiques, podocytes, pancréas, rate, SRH, thymus en particulier) » — le pancréas est l'un des six sites-témoins du bilan de surcharge ; " +
      "non répondu, le bilan lysosomal est incomplet",
    ko:"surcharge fœtale PRÉSENTE sur le site-témoin pancréatique" },

  { k:"pasInspisse", signe:"materielInspisse", l:"Absence de matériel éosinophile ou PAS+ inspissé dans les acini et les canaux",
    p:"réclamé par les livres, jamais écrit par le service ; le signe est daté « vers 20 SA » — " +
      "non répondu, la question mucoviscidose reste ouverte sur cette lame",
    ko:"matériel éosinophile ou PAS+ inspissé PRÉSENT dans les acini ou les canaux" },
  { k:"distensionNeg", signe:"distensionCanalaire", l:"Absence de distension canalaire",
    p:"réclamé par les livres, jamais écrit ; plus net au 3e trimestre",
    ko:"distension canalaire PRÉSENTE" },
  { k:"nucleomegalieNeg", signe:"nucleomegalie", l:"Absence de nucléomégalie des cellules endocrines",
    p:"c'est le seul critère fiable de l'hyperinsulinisme : son négatif vaut plus que le compte des îlots — " +
      "non répondu, aucun énoncé sur l'hyperinsulinisme n'est possible",
    ko:"nucléomégalie endocrine PRÉSENTE — critère le plus fiable de l'hyperinsulinisme, et non spécifique" },
  { k:"eosinophilesNeg", signe:"eosinophilesPeriInsulaires", l:"Absence d'infiltrat éosinophile péri-insulaire",
    p:"réclamé par les livres, jamais écrit ; couvre l'enfant de mère diabétique et le Coxsackie",
    ko:"infiltrat éosinophile péri-insulaire PRÉSENT — regarder la nécrose insulaire" },
  { k:"caliciformesNeg", signe:"cellulesCaliciformes", l:"Absence de cellules caliciformes dans les canaux pancréatiques",
    p:"non physiologique dans le pancréas : c'est le négatif qui écarte le profil chromosomique",
    ko:"cellules caliciformes canalaires PRÉSENTES" },
  { k:"spleniqueNeg", signe:"tissuSpleniqueIntrapancreatique", l:"Absence de tissu splénique intrapancréatique sur le bloc queue + hile",
    p:"suppose que le bloc de l'interface queue / hile splénique existe — sinon le négatif n'est pas opposable",
    ko:"tissu splénique intrapancréatique PRÉSENT" },
  { k:"plasmoDestructionNeg", l:"Absence de plasmocytes ET absence de destruction parenchymateuse ou canalaire",
    p:"le double critère qui fait basculer un infiltrat lymphocytaire de normal à suspect — un infiltrat seul reste normal ; " +
      "non répondu devant un infiltrat vu, la bascule n'est pas jugeable",
    ko:"plasmocytes ou destruction parenchymateuse PRÉSENTS : l'infiltrat n'est plus une variante",
    auto:function(){ return absents("plasmocytes", "destructionParenchyme"); } }
];

/* ── Techniques ───────────────────────────────────────────────────────────────
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

/* ── Propositions de techniques — déduites des signes présents ────────────────
   Deux lignes ne sont JAMAIS proposées : le rouge Sirius, non documenté sur cet
   organe, et la ligne d'absence de datation pancréatique, qui n'est pas une
   prescription. */
function suggerer(){
  var m = E.mesure, g = {};
  function vu(){ for (var i = 0; i < arguments.length; i++) if (E.signes[arguments[i]] === POS) return true; return false; }
  function on(k){ g[k] = 1; }

  if (vu("materielInspisse", "aplatissementEpithelial", "distensionCanalaire")) on("pasTech");
  if (vu("perlsAcineux", "perlsHistiocytaire", "lesionHemorragiqueQueue")) on("perlsTech");
  if (vu("nucleomegalie", "ilotsVolumineux", "ilotsNodulaires", "cordonsAcini", "betaPleomorphisme",
         "complexesDuctoInsulaires")){ on("insuline"); on("temoinAgeTech"); }
  if (vu("ilotsVolumineux", "erythropoieseInterstitielle")) on("insulineGlucagon");
  if (vu("cellulesPalesNoyauCentral")) on("cytokeratines");
  if (vu("cordonsAcini", "ilotsNodulaires", "complexesDuctoInsulaires")) on("neuroendocrine");
  if (vu("infiltratDense", "plasmocytes", "destructionParenchyme")) on("cd3");
  if (vu("erythropoieseInterstitielle", "elementsMyeloides")) on("cd71");
  if (vu("inclusionOeilDeHibou", "plasmocytes", "destructionParenchyme", "necroseInsulaire")) on("cmvTech");
  if ((vu("infiltratDense") && vu("destructionParenchyme")) || vu("fibrosePancreatique")) on("argentique");

  /* Le piège majeur de l'organe : un seul siège, et on parle d'endocrine. */
  if (m && m.opt === "blocUnique" && vu("ilotsVolumineux", "ilotsNodulaires", "nucleomegalie")) on("temoinAgeTech");
  return g;
}

/* ── Contrôles propres au pancréas ────────────────────────────────────────────
   Le banc commun a tourné AVANT et laisse des signes posés : on repart d'une
   lame propre, et on repose les deux axes catégoriels conditionnellement. */
async function testsOrgane(chk, clic, set, crTient, pause){
  function pose(k, v){ if (E.signes[k] !== v) clic("les", k, v); }
  function ote(k){ if (E.signes[k]) clic("les", k, E.signes[k]); }
  function propre(){ SIGNES.forEach(function(x){ ote(x.k); }); }
  function siege(k){ if (E.mesure.def !== k) clic("mdef", k); }
  function ech(k){ if (E.mesure.opt !== k) clic("mopt", k); }
  function lue(k){ return associations().some(function(a){ return a.d.k === k; }); }
  function tenue(k){ return associations().some(function(a){ return a.d.k === k && a.tenu; }); }
  function neg(k){ return etatNegatif(par(NEGATIFS, k)); }
  function cadre(k){ return groupes().indexOf(par(SIGNES, k).g); }

  propre();

  /* ---- Ce que l'organe n'a PAS, et qui doit le rester -------------------- */
  chk("pancréas impair : pas d'axe de latéralité", PAIR === false);
  chk("aucun champ de rapport nucléaire chiffré",
      MESURE.champs.every(function(c){ return c.id !== "ratio" && c.id !== "rapportNucleaire"; }));
  chk("aucune clé d'association ne collisionne avec un signe",
      DIAGS.every(function(d){ return !SIGNES.some(function(x){ return x.k === d.k; }); }));
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
  siege("entier");
  chk("organe entier : rien ne bloque, la comparaison des sièges se fait sur la lame",
      verdictMesure().cls !== "bad" && verdictMesure().txt.indexOf("Organe entier") >= 0);
  siege("queue");
  ech("blocUnique");
  chk("bloc unique : bloquant", verdictMesure().cls === "bad");
  ech("multiTemoin");

  /* ---- Le poids ne se lit pas sans le poids fœtal ------------------------- */
  set("m_poids", "3");
  chk("poids pancréatique sans poids fœtal : non lisible", verdictMesure().txt.indexOf("poids fœtal") >= 0);
  set("m_pfoetal", "2500");
  chk("avec le poids fœtal, la borne se calcule", Math.abs(poidsAttendu(2500) - 3) < 0.001);
  set("m_poids", ""); set("m_pfoetal", "");

  /* ---- Le stroma avant le 3e trimestre ----------------------------------- */
  set("sa", "22");
  pose("densificationTrame", POS);
  chk("trame dense à 22 SA : le stroma normal est rappelé", verdictMesure().txt.indexOf("NORMAL de l'organe") >= 0);
  propre(); set("sa", "30");

  /* ---- Mucoviscidose : le pivot commande -------------------------------- */
  pose("aplatissementEpithelial", POS);
  pose("distensionCanalaire", POS);
  chk("sans le matériel inspissé, la mucoviscidose ne tient pas", !tenue("mucoviscidoseAssoc"));
  chk("mais l'association est lue quand même", lue("mucoviscidoseAssoc"));
  pose("materielInspisse", POS);
  chk("avec le pivot et deux signes, elle tient", tenue("mucoviscidoseAssoc"));
  chk("le PAS est suggéré", suggerer().pasTech === 1);
  chk("CR : elle refuse de conclure", crTient("la confirmation est génétique"));
  chk("négatif PAS en défaut, déduit du signe", neg("pasInspisse") === "ko" && crTient("! " + par(NEGATIFS, "pasInspisse").ko));
  propre();
  pose("materielInspisse", NEG);
  chk("matériel répondu absent → négatif énoncé", neg("pasInspisse") === "ok");
  propre();

  /* ---- Hyperinsulinisme : la nucléomégalie et elle seule ------------------ */
  pose("ilotsVolumineux", POS);
  pose("cordonsAcini", POS);
  chk("des îlots volumineux seuls ne font pas l'hyperinsulinisme", !tenue("hyperinsulinismeAssoc"));
  chk("le témoin apparié en âge est proposé dès qu'on parle d'endocrine", suggerer().temoinAgeTech === 1);
  pose("nucleomegalie", POS);
  chk("la nucléomégalie suffit", tenue("hyperinsulinismeAssoc"));
  propre();

  /* ---- Mère diabétique contre Coxsackie : la nécrose tranche -------------- */
  pose("eosinophilesPeriInsulaires", POS);
  pose("ilotsVolumineux", POS);
  chk("éosinophiles péri-insulaires : mère diabétique tenue", tenue("mereDiabetiqueAssoc"));
  chk("et le Coxsackie est lu en même temps", lue("coxsackieAssoc"));
  chk("mais sans nécrose il ne tient pas", !tenue("coxsackieAssoc"));
  pose("necroseInsulaire", POS);
  chk("la nécrose fait basculer", tenue("coxsackieAssoc"));
  chk("CR : le discriminant est nommé", crTient("le discriminant est la nécrose insulaire"));
  propre();

  /* ---- L'infiltrat lymphoïde ne bascule qu'à deux, sans pivot ------------- */
  pose("infiltratDense", POS);
  chk("un infiltrat seul reste physiologique", !tenue("basculeInflammatoire"));
  chk("le CD3 est proposé", suggerer().cd3 === 1);
  pose("plasmocytes", POS);
  chk("infiltrat + plasmocytes : la bascule est tenue", tenue("basculeInflammatoire"));
  chk("négatif plasmocytes / destruction en défaut", neg("plasmoDestructionNeg") === "ko");
  pose("plasmocytes", NEG);
  pose("destructionParenchyme", POS);
  chk("infiltrat + destruction aussi : c'est bien un OU", tenue("basculeInflammatoire"));
  propre();
  pose("plasmocytes", NEG);
  chk("un seul des deux répondu : négatif encore ouvert", neg("plasmoDestructionNeg") === null);
  pose("destructionParenchyme", NEG);
  chk("les deux absents : négatif énoncé", neg("plasmoDestructionNeg") === "ok");
  propre();

  /* ---- CMV : l'inclusion se cherche sans l'infiltrat ---------------------- */
  pose("inclusionOeilDeHibou", NEG); pose("infiltratDense", NEG);
  chk("triade virale énoncée : inclusion et infiltrat absents", neg("triadeVirale") === "ok");
  pose("inclusionOeilDeHibou", POS);
  chk("inclusion présente : triade en défaut, CMV tenu sans infiltrat", neg("triadeVirale") === "ko" && tenue("cmvAssoc"));
  propre();

  /* ---- Le fer : c'est le compartiment qui porte -------------------------- */
  pose("perlsHistiocytaire", POS);
  chk("Perls histiocytaire seul : la surcharge n'est pas tenue", !tenue("surchargeFerAssoc"));
  chk("mais la ligne est lue", lue("surchargeFerAssoc"));
  pose("perlsAcineux", POS);
  chk("Perls acineux : tenue", tenue("surchargeFerAssoc"));
  chk("le Perls est suggéré", suggerer().perlsTech === 1);
  chk("le Sirius et la non-datation ne sont jamais suggérés, même signes présents",
      suggerer().sirius !== 1 && suggerer().aucuneDatation !== 1);
  propre();
  pose("perlsAcineux", NEG); pose("perlsHistiocytaire", NEG);
  chk("Perls répondu négatif aux deux compartiments : négatif énoncé", neg("perlsNegatif") === "ok");
  propre();

  /* ---- Agénésie : non identifié n'est pas absent -------------------------- */
  pose("pancreasNonRetrouve", POS);
  chk("non retrouvé : l'agénésie est lue mais pas tenue", lue("agenesieAssoc") && !tenue("agenesieAssoc"));
  chk("CR : la réserve de dissection est écrite", crTient("le pancréas fœtal est petit"));
  propre();

  /* ---- Kystes : divergence de siège portée, jamais tranchée --------------- */
  pose("kystesCanalaires", POS);
  pose("fibrosePancreatique", POS);
  chk("dysplasie kystique tenue", tenue("dysplasieKystiqueAssoc"));
  chk("CR : les deux sièges sont donnés sans arbitrage",
      crTient("plutôt localisés à la tête") && crTient("more likely to be located in the tail"));
  chk("fibrose : la réaction argentique est proposée", suggerer().argentique === 1);
  propre();

  /* ---- Profil chromosomique : la cellule caliciforme est le pivot ---------- */
  pose("kystesCanalaires", POS);
  pose("tissuSpleniqueIntrapancreatique", POS);
  chk("kystes + tissu splénique sans caliciformes : profil non tenu", !tenue("trisomie13Assoc") && lue("trisomie13Assoc"));
  pose("cellulesCaliciformes", POS);
  chk("avec les cellules caliciformes : profil tenu", tenue("trisomie13Assoc"));
  chk("négatif caliciformes en défaut", neg("caliciformesNeg") === "ko");
  propre();

  /* ---- Annulaire ou hétérotopie : la lame ne choisit pas ------------------ */
  pose("tissuDansMusculeuseDuodenale", POS);
  chk("les deux lectures sortent ensemble", lue("annulaireAssoc") && lue("heterotopieAssoc"));
  chk("CR : le discriminant est macroscopique", crTient("est MACROSCOPIQUE"));
  propre();

  /* ---- Les négatifs propres à l'organe existent bien --------------------- */
  chk("la réserve de rétention est un négatif à part entière",
      NEGATIFS.some(function(n){ return n.k === "reserveRetention"; }));
  chk("les sept négatifs des livres sont créés",
      ["pasInspisse","distensionNeg","nucleomegalieNeg","eosinophilesNeg",
       "caliciformesNeg","spleniqueNeg","plasmoDestructionNeg"]
        .every(function(k){ return NEGATIFS.some(function(n){ return n.k === k; }); }));
  var sel = $("retNiveau");
  sel.value = "horsPancreas"; sel.dispatchEvent(new Event("change", {bubbles:true}));
  chk("rétention regardée : réserve énoncée", neg("reserveRetention") === "ok" && crTient("Rétention celle des autres organes"));
  sel.value = ""; sel.dispatchEvent(new Event("change", {bubbles:true}));
  chk("rétention non regardée : réserve ouverte", neg("reserveRetention") === null);

  /* ---- Rétention : la seule borne bonne est un report -------------------- */
  chk("la borne bonne est empruntée aux autres organes",
      RETENTION.filter(function(r){ return r.q === "bon"; })
               .every(function(r){ return r.k === "horsPancreas"; }));

  /* ---- Ordre de lecture : ce que la répartition doit garantir ------------- */
  chk("CMV : l'inclusion ne se range pas avec l'infiltrat", cadre("inclusionOeilDeHibou") !== cadre("infiltratDense"));
  chk("Coxsackie : la nécrose insulaire ne se range pas avec l'infiltrat", cadre("necroseInsulaire") !== cadre("infiltratDense"));
  chk("IDM / Coxsackie : éosinophile et nécrose dans le même cadre", cadre("eosinophilesPeriInsulaires") === cadre("necroseInsulaire"));
  chk("les six caractères normaux vivent sous les îlots",
      ["endocrineDiffus","dixPourCent","densiteVariable","tailleVariable","ilotsMalLimites","ilotsSeptaux"]
        .every(function(k){ return par(VARIANTES, k).g === par(SIGNES, "ilotsVolumineux").g; }));
  chk("l'hématopoïèse vit sous les infiltrats", par(VARIANTES, "hematopoiese").g === par(SIGNES, "erythropoieseInterstitielle").g);
  chk("pancréas petit ou non retrouvé : hors lame",
      horsLame(par(SIGNES, "pancreasPetit").g) && horsLame(par(SIGNES, "pancreasNonRetrouve").g));
  var iF = cadre("nucleomegalie");
  clic("grp", iF, "non");
  chk("« Non » sur les îlots au fort : nucléomégalie et éosinophiles énoncés absents",
      neg("nucleomegalieNeg") === "ok" && neg("eosinophilesNeg") === "ok");
  clic("grp", iF, "non");
  var iP = cadre("perlsAcineux");
  clic("grp", iP, "non");
  chk("« Non » sur les surcharges : le Perls n'est pas répondu à la place du lecteur",
      !E.signes.perlsAcineux && !E.signes.perlsHistiocytaire && neg("perlsNegatif") === null &&
      neg("surchargeFoetale") === "ok");
  clic("grp", iP, "non");
  chk("topographie conservée : polarité normale, hors du « Non » en bloc", par(SIGNES, "topographieConservee").bloc === false);
  /* La formule globale ne s'écrit que si tous les cadres de lame sont « Non » */
  var lames = groupes().filter(function(g){ return !horsLame(g); });
  lames.forEach(function(g){ clic("grp", groupes().indexOf(g), "non"); });
  /* lot FOETO : les signes datés (seul / terme) ne se répondent pas en bloc */
  var dates = SIGNES.filter(function(x){ return !horsLame(x.g) && (x.seul || x.terme) && !E.signes[x.k]; });
  chk("lot : signes datés laissés non regardés par le « Non »", dates.length > 0 && neg("cytoarchitecture") !== "ok");
  dates.forEach(function(x){ clic("les", x.k, NEG); });
  chk("tous les cadres « Non » + signes datés répondus : cytoarchitecture énoncée", neg("cytoarchitecture") === "ok");
  dates.forEach(function(x){ clic("les", x.k, NEG); });
  lames.forEach(function(g){ clic("grp", groupes().indexOf(g), "non"); });
  pose("infiltratDense", POS);
  chk("un signe de lame présent : cytoarchitecture en défaut", neg("cytoarchitecture") === "ko");
  propre();

  /* ---- Branchement FOETO ------------------------------------------------- */
  chk("v2 : libellé venu de FOETO", par(SIGNES, "nucleomegalie").l === "Nucléomégalie des cellules endocrines pancréatiques");
  chk("v2 : code FOETO du terme verbatim", codesDe(par(SIGNES, "eosinophilesPeriInsulaires"))[0] === "FOETO:PF.END-MAL-031");
  chk("v2 : HPO arbitré venu de la base", par(SIGNES, "ilotsVolumineux").hpo === "HP:0004510");
  chk("v2 : constat de fiche sans terme non marqué hors fiche",
      !par(SIGNES, "materielInspisse").horsFiche && !par(SIGNES, "cellulesPalesNoyauCentral").horsFiche);
  chk("v2 : terme maladie sur l'association", par(DIAGS, "mucoviscidoseAssoc").foeto[0] === "FOETO:PF.END-MAL-083");
  chk("v2 : deux paires v1 fondues sur un seul terme",
      !par(SIGNES, "kysteBordeCubique") && !par(SIGNES, "mesenchymePrimitif") &&
      par(SIGNES, "kystesCanalaires").foeto === "FOETO:PF.END-MAL-067" &&
      par(SIGNES, "canauxDilatesRamifies").foeto === "FOETO:PF.END-MAL-071");
  set("rqFoeto", "Charcot");
  var pick = $("sgFoeto").querySelector('[data-pick="FOETO:PF.END-MAL-005"]');
  if (pick) pick.click();
  chk("v2 : un terme porté par un signe pose le signe", !!pick && E.signes.charcotLeyden === POS &&
      !E.foeto["FOETO:PF.END-MAL-005"]);
  ote("charcotLeyden");
  chk("v2 : blocs lus en §02", BLOCS_LUS && !$("blocsBloc").hidden);

  await pause();

  /* On laisse la lame dans un état déclaré : le tronc commun relit le terme. */
  set("sa", "30");
  siege("corps");
  ech("multiTemoin");
}
