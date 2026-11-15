/* Grille de lecture — thyroïde et parathyroïdes. VERSION 2 (2.0.0).
   Migration de thyroide.js (1.0.1) sur le patron ordre de lecture de rein
   3.5.0 et poumon 2.1.0 : gen_grille.py, mode présence, termes FOETO fondus
   dans les signes et branchés (termes tagués verbatim), blocs lus en §02,
   cadres de lecture. La v1 reste publiée à côté tant que la v2 n'a pas été
   validée à l'usage.
   Fond : ~/Bureau/fiches_lecture/fiche_thyroide.md (§1 à §9).
   Forme : gen_grille.py, calquée sur grille_poumon.html.
   Les divergences entre sources sont PORTÉES dans les champs, jamais arbitrées.

   Une seule grille pour deux glandes : elles sortent du même bloc cervical, sur
   la même lame, et l'une sert de témoin de lyse à l'autre (§ 2). Les séparer
   ferait perdre le seul contrôle interne disponible.

   Ce que la v2 change par rapport à la v1, sans rien retrancher :
   · un signe est un CONSTAT — présent / absent / non regardé, plus normal /
     anormal. Les 46 signes de la v1 sont tous là, avec leurs méta ; aucun nom
     de maladie n'y entre, les associations les portent ;
   · branchement FOETO : les 19 constats de la fiche tagués verbatim ont chacun
     leur signe (fv) et en prennent le libellé. Quatre de ces termes sont
     COMPOSITES et recouvrent un signe v1 voisin, gardé tel quel pour ne rien
     perdre : tissuAbsent (absence OU glande très atrophique) ⊃ glandeAtrophique ;
     deplationColloide (les quatre critères de Sagreiya et Emery) ⊃
     vacuolisationDetachement et noyauxPycnotiques ; colloideAugmentee (gros
     follicules ET colloïde augmentée) ⊃ folliculesGros ; epitheliumHyperplasique
     devient hyperplasie épithéliale AVEC déplétion colloïdale, l'image de
     l'hyperthyroïdie [keeling, ch. 26]. Les signes v1 sans terme portent
     fiche:"[source]" ; un seul est hors fiche (contingentsMultiples). Les
     maladies de la fiche vont aux associations (fv : affiché, jamais exporté) ;
   · une association ajoutée, hypoplasie / aplasie parathyroïdienne (§ 5.6),
     pour porter END-MAL-132 et ses causes hors 22q11. END-TUM-004 (carcinome
     congénital) n'est porté par aucune association : une association n'a qu'un
     fv, la masse porte le tératome, le carcinome reste ce qu'il ne faut pas
     surdire (stop de la masse et de la dyshormonogenèse) ;
   · ordre de lecture (LECTURE) : huit cadres, la glande et ses lobes d'abord,
     les parathyroïdes avant le parenchyme (elles sont le témoin qui dit si le
     parenchyme se lit), du faible au fort grossissement dans chaque cadre (mag,
     savoir de pratique [expérience], à valider à l'usage). Le contexte hors
     lame (autres lames, clinique, échantillonnage) sort des signes, avant la
     rétention ; chaque variante normale vit dans le cadre qu'elle mime et ne
     passe au CR qu'en parenthèse ; deux variantes ajoutées depuis la fiche
     (épithélium sécrétoire § 4, taille parathyroïdienne croissante § 3) ;
   · le Non en bloc ne répond ni les signes après technique (Perls, PAS, IHC)
     ni epitheliumCubiqueRegulier (bloc:false : formulé en normal, son absence
     en bloc écrirait l'inverse au CR) ;
   · aucuneParaVue se DÉDUIT (auto) du siège déclaré en Maturation, ou du
     compte de parathyroïdes : il redisait mot pour mot le siège aucune de la
     v1, deux saisies qui pouvaient se contredire ;
   · les onze négatifs se DÉDUISENT, plus de case vérifié : quatre d'un signe
     répondu absent, sept d'une donnée consignée (Perls, variantes
     parathyroïdiennes, blocs de base de langue, siège, basophilie, lisibilité
     folliculaire) ;
   · la rétention datable se lit dans une liste du moins au plus avancé : h du
     témoin interne (2) et des deux glandes effondrées (3) permutés — aucun des
     deux ne donne d'heure, h n'ordonne que la liste ;
   · pivot du goitre endémique : colloideAugmentee (le terme FOETO) au lieu de
     folliculesGros, qui l'est par définition ;
   · techniques : un négatif fer EN DÉFAUT (pigment brun sans Perls) propose le
     Perls, comme la v1 ;
   · blocs lus en § 02 (BLOCS) ; toujours pas de côté. */

/* 2.1.0 (2026-11-14) — lot FOETO, propositions relues par Kimi K3.1 Pro et vérifiées par script
   (verbatim mot pour mot dans la fiche) : 3 fenêtre(s) de terme — le « Non » en bloc ne répond plus
   un signe daté hors de sa fenêtre (seul : un par un) ; 11 code(s) FOETO existant(s) branché(s)
   (variantes, rétention, stades, mesures, associations) ; 13 code(s) créé(s) depuis le verbatim de la
   fiche. Les propositions jugées faibles ou fausses attendent le tri de Rémi. */
var ORGANE  = "thyroide";
var TITRE   = "thyroïde et parathyroïdes";
var SOURCE  = "fiche_thyroide.md";
var MODULE  = "grille_thyroide";
var VERSION = "2.1.0";
var SCHEMA  = "0.3.0";   /* 0.3.0 : signes present/absent, négatifs déduits */
var ETATS   = "presence";
var FOETO_DANS_SIGNES = true;
var BLOCS   = true;
var LECTURE = true;   /* cadres (CADRES), grossissement (mag), variantes dans leur cadre */
/* L'étendue focale / multifocale / diffuse n'a pas de sens pour ces cadres-là. */
var GROUPES_SANS_ETENDUE = ["Glande, lobes, ectopie et kystes", "Masses et tissus non thyroïdiens", "Parathyroïdes"];

/* La thyroïde n'est pas un organe PAIR au sens de la coquille : elle est
   médiane, bilobée, et les deux lobes arrivent sur la MÊME coupe transversale —
   il n'y a pas de côté prélevé à déclarer, et pas davantage de 1/2 à cocher.
   La latéralité est pourtant pertinente (hémiagénésie, hyperplasie
   compensatrice d'un lobe restant [keeling, ch. 26]) : elle vit donc en
   Maturation, dans MESURE.defs, où le lobe se date séparément. */
var PAIR = false;

var TITRE_CR    = "THYROÏDE ET PARATHYROÏDES";
var STADE_TITRE = "Maturation folliculaire — échelle importée des livres, que personne ne pratique";

var KCL_TXT = "Fœticide par KCl déclaré — l'heure du décès est CONNUE, il n'y a plus de délai à " +
              "estimer. Et il n'y en aurait de toute façon aucun à lire ici : ni la thyroïde ni les " +
              "parathyroïdes ne figurent dans les tables de macération. Le seul constat encore " +
              "recevable est le contraste des deux glandes sur la lame.";

/* Le retard est ici presque toujours un artefact : c'est exactement l'axe de
   maturation que l'autolyse détruit en premier (§ 2). */
var RETARD_NOTE = "Sur cet organe, un retard apparent est d'abord une AUTOLYSE : « the fetal thyroid " +
                  "gland undergoes postmortem autolytic changes relatively quickly, which can lead to " +
                  "a collapse of the glandular architecture and the appearance of a nearly solid sheet " +
                  "of epithelium » [ernst, ch. 21], et cet effondrement mime l'immaturité. Lire la " +
                  "parathyroïde de la même lame avant de conclure : préservée, elle dit que l'aspect " +
                  "solide est post-mortem. Deuxième cause : la thyroïde jeune est NORMALEMENT " +
                  "« cellulaire, presque solide » à faible grossissement — monter au fort " +
                  "grossissement et chercher les follicules périphériques.";

var AVANCE_NOTE = "Une avance apparente est d'abord un PLAN DE COUPE : le gradient de maturation va du " +
                  "centre vers la périphérie — « In general, the thyroid follicles in the fetus appear " +
                  "larger toward the periphery of the gland, and this may represent a progressive " +
                  "maturation of the follicles from center to periphery » [ernst, ch. 21] — et une " +
                  "tranche tangentielle ne ramène que les plus gros follicules. Vérifier que la coupe " +
                  "traverse l'épaisseur du lobe avant de parler d'avance.";

var TECH_NOTE = "Les pointillés sont des propositions déduites des clics, jamais des prescriptions. " +
                "Sur cet organe, la technique qui tranche le plus souvent n'est pas une coloration : " +
                "c'est l'échantillonnage — reprendre le bloc cervical en coupes transversales sériées.";

/* ── 01 · Prélèvement ─────────────────────────────────────────────────────── */
var PRELEV = [
  { k:"blocSerie", l:"Bloc cervical entier, coupes transversales SÉRIÉES, base de langue → sous la thyroïde",
    grave:true,
    manque:"sans sériation, l'absence de parathyroïde n'est pas une donnée — « Parathyroid glands can " +
           "be difficult to identify grossly in fetuses, even with the aid of a dissecting microscope, " +
           "but they can be identified histologically if the eviscerated neck organs are serially " +
           "sectioned in the transverse plane and entirely submitted from the base of the tongue to " +
           "just below the thyroid gland » [ernst, ch. 22]" },
  { k:"neckBlock", l:"Tissus mous du cou en arrière des muscles sous-hyoïdiens, du voile du palais à la trachée",
    grave:true,
    manque:"définition du bloc cervical — il « includes all the soft tissues of the neck, posterior to " +
           "the strap muscles, from the soft palate to the trachea » [ernst, ch. 21] et donne en même " +
           "temps larynx, pharynx et thyroïde" },
  { k:"transversale", l:"Plan transversal, pas un plan oblique du lobe", grave:true,
    manque:"plan oblique = follicules coupés en biais, taille non évaluable : on ne peut alors ni " +
           "dater, ni exclure une parathyroïde [ernst, ch. 21, ch. 22]" },
  { k:"epaisseurLobe", l:"Coupe traversant l'épaisseur du lobe, centre ET périphérie",
    manque:"la maturation suit un gradient centre → périphérie : une tranche périphérique ne ramène " +
           "que les follicules les plus gros et fait surestimer le terme" },
  { k:"deuxLobes", l:"Les deux lobes et l'isthme sur la lame",
    manque:"l'hémiagénésie et l'hyperplasie compensatrice du lobe restant sont décrites — chaque lobe " +
           "se date séparément [keeling, ch. 26]" },
  { k:"baseLangue", l:"Si la question est l'agénésie : blocs multiples de la base de langue et du cou",
    manque:"« in cases of thyroid agenesis, careful sampling by taking multiple blocks of the posterior " +
           "tongue and the neck is necessary to investigate for ectopic thyroid foci » [keeling, " +
           "ch. 26] — le tissu ectopique peut être le SEUL tissu thyroïdien du fœtus" },
  { k:"parathyroides", l:"Parathyroïdes cherchées, et leur siège noté",
    manque:"elles ne sont pas dans la liste de prélèvement du service — « Le larynx et la thyroïde " +
           "sont prélevés » [soffoet, ch. 3] : elles arrivent par accident dans le bloc " +
           "laryngo-thyroïdien, pas par intention (§ 9-13)" },
  { k:"thymus", l:"Thymus repéré sur la même lame ou sur le bloc voisin",
    manque:"le défaut des 3ᵉ et 4ᵉ poches se lit sur la PAIRE thymus + parathyroïdes, jamais sur une " +
           "glande seule" },
  { k:"perls", l:"Perls prévu dès qu'il y a un pigment brun",
    manque:"« The lipofuscin pigment sometimes seen in adult thyroid follicular cells is not identified " +
           "in fetal follicular cells. » [ernst, ch. 21] : un pigment brun n'a pas d'alternative normale" },
  { k:"muscleStrie", l:"Fibres musculaires striées de bordure conservées sur la coupe",
    manque:"bonus de prélèvement — « Si ce prélèvement a été oublié on peut trouver quelques fibres " +
           "musculaires striées en périphérie de la coupe transversale de thyroïde, suffisantes pour " +
           "faire le diagnostic » [soffoet, ch. 20]" }
];

/* ── 02 · Rétention ───────────────────────────────────────────────────────────
   Inversion assumée par rapport au gabarit : la thyroïde n'est dans AUCUNE
   horloge. Le seul instrument est un contraste entre deux glandes de la même
   lame, et il ne donne pas d'heure. */
var HORS_HORLOGE = "ni la thyroïde ni les parathyroïdes ne figurent dans les tables de macération — " +
                   "« zéro occurrence » de thyroid ou parathyroid dans [keeling, ch. 15] et " +
                   "[ernst, ch. 37]. Aucune heure, aucun délai n'existe pour cet organe : ne pas en " +
                   "interpoler depuis la Table 37.1 (§ 9-10)";

var DIVERGENCE_BASO = "divergence frontale et NON tranchée (§ 9-1) : la thyroïde est absente de la " +
                      "séquence de perte de basophilie des livres, alors que le service l'y met — " +
                      "« La perte de basophilie nucléaire concerne : le pancréas, les testicules, la " +
                      "thyroïde, le cœur (persistance dans le SIV), les surrénales, les entérocytes, " +
                      "le foie » [corpus CR]. Écrire laquelle des deux lectures on retient";

/* v2 : en présence, h ordonne la liste du critère le plus avancé. Les deux
   glandes effondrées viennent APRÈS le témoin interne (v1 : 3 et 2, permutés). */
var RETENTION = [
  { k:"temoinInterne",
    l:"Thyroïde en nappe épithéliale quasi pleine ET parathyroïde préservée, bords cellulaires nets",
    b:"non datable en heures", d:"témoin interne des deux glandes", h:2, q:"bon",
    note:"c'est l'outil de lecture de l'organe : « In contrast to the thyroid gland, the parathyroid " +
         "gland is usually well preserved, as it undergoes autolysis more slowly. » [ernst, ch. 22] — " +
         "l'aspect solide de la thyroïde est alors post-mortem, et il ne reste que la lésion : " +
         "« ni stade, ni déplétion colloïdale, ni hyperplasie »",
    alerte:HORS_HORLOGE },
  { k:"deuxEffondrees", l:"Thyroïde en nappe pleine ET bords cellulaires parathyroïdiens perdus",
    b:"prolongée, sans borne", d:"seuil d'ininterprétabilité", h:3, q:"moyen",
    note:"les deux glandes effondrées = rien ne se rend, ni maturation ni lésion : le différentiel " +
         "parathyroïde / ganglion / thyroïde repose sur les bords cellulaires, " +
         "« a key feature in differentiating them from the lymphocytes of small cervical lymph nodes " +
         "in this anatomic location or adjacent thyroid gland, especially when the tissues are " +
         "autolyzed » [ernst, ch. 22]",
    alerte:HORS_HORLOGE },
  { k:"nappeSeule", l:"Nappe épithéliale quasi pleine, aucune parathyroïde sur la lame", b:"—",
    d:"sans témoin, rien ne se sépare", h:0, q:"mauvais",
    note:"sans la parathyroïde de la même lame, l'autolyse thyroïdienne et la thyroïde normalement " +
         "« cellulaire, presque solide » d'avant ~22 SA ne se départagent pas" },
  { k:"basoThyroide", l:"Perte de basophilie nucléaire de la thyroïde", b:"—",
    d:"hors des deux tables", h:0, q:"mauvais", note:DIVERGENCE_BASO, alerte:HORS_HORLOGE },
  { k:"bordsPerdus", l:"Bords cellulaires parathyroïdiens perdus, cytoplasme sans limite", b:"—",
    d:"seuil d'ininterprétabilité", h:0, q:"mauvais",
    note:"le critère qui compte est perdu : « polygonal cells with well-defined cell borders » " +
         "[ernst, ch. 22] — au-delà, le nodule cervical n'est plus rattachable" },
  { k:"ihcNegLysee", l:"IHC négative sur tissu lysé", b:"—", d:"n'exclut rien, ne date rien", h:0,
    q:"mauvais",
    note:"le corpus enregistre lui-même l'échec : « négatifs (tissus lysés +++) » [corpus CR] — une " +
         "IHC négative sur tissu lysé n'exclut pas l'infection" },
  { k:"geantesNecrosees", l:"Cellules géantes nécrosées, inclusions non affirmables", b:"—",
    d:"oriente, ne date pas", h:0, q:"mauvais",
    note:"« de multiples cellules géantes (souvent nécrosées) dont il est difficile d'affirmer la " +
         "présence d'inclusion nucléaires » [corpus CR] : la macération fabrique l'image, elle ne la " +
         "date pas" }
];
/* ── 03 · Maturation ──────────────────────────────────────────────────────────
   Cinq rangs, tous en SA (les livres comptent en gestation, SA = gestation + 2).
   Le rang 6 du § 3 — l'aspect néonatal d'après le pic de TSH — n'est PAS ici :
   il est daté « après la naissance » et non par un terme, il ne peut donc pas
   entrer dans une échelle indexée sur les SA. Il vit au § 05, comme variante
   normale, et sa déplétion colloïdale au § 06 avec ses trois lectures.
   Rappel du § 3 : cette échelle est entièrement importée des livres — aucun des
   176 CR ne rend un stade thyroïdien (§ 9-6). */
var STADES = [
  { k:"prefolliculaire", l:"Pré-folliculaire — épaississement épithélial, diverticule, descente", max:10,
    note:"« The thyroid gland develops as an epithelial thickening in the floor of the primitive " +
         "pharynx during weeks 3 and 4 of gestation » [keeling, ch. 26] ; position définitive en avant " +
         "de la trachée à la 7ᵉ semaine de gestation, soit 9 SA" },
  { k:"folliculaireNaissant", l:"Folliculaire naissant, sans colloïde intraluminale", max:14,
    note:"« Between weeks 8 and 12, further differentiation includes follicle formation, colloid " +
         "production, concentration of iodine and formation of thyroxine » [keeling, ch. 26]. " +
         "DIVERGENCE NON tranchée sur le début de la colloïde, trois valeurs incompatibles (§ 9-2) : " +
         "« fetal thyroid follicular cells begin to produce colloid as early as 10–12 weeks of " +
         "gestation » soit 12–14 SA, et quelques lignes plus loin dans le MÊME chapitre « Although " +
         "fetal colloid production begins around 11 weeks gestation… » soit 13 SA [ernst, ch. 21], " +
         "contre 10–14 SA [keeling, ch. 26]" },
  { k:"folliculaireCellulaire", l:"Folliculaire cellulaire, sécrétions éosinophiles pâles", max:22,
    note:"le rang où l'aspect trompe : « At low power, early fetal thyroid has a cellular, almost " +
         "solid appearance, but on close inspection, the follicular development can be seen » et " +
         "« Lightly stained eosinophilic secretions are seen within the follicles in the previable " +
         "stage » [ernst, ch. 21] — l'aspect solide d'un tissu BIEN CONSERVÉ est ici la normale, pas " +
         "une autolyse" },
  { k:"folliculaireSecretant", l:"Folliculaire sécrétant, cytoplasme apical éosinophile visible", max:28,
    note:"« Significant fetal hormone secretion is present after week 20 » soit 22 SA [keeling, " +
         "ch. 26] ; les follicules se remplissent et l'épithélium peut devenir plus haut [ernst, ch. 21]" },
  { k:"colloideAbondante", l:"Colloïde abondante — début du 3ᵉ trimestre", max:99,
    note:"« In the early third trimester, colloid becomes more prominent within follicles » [ernst, " +
         "ch. 21]. L'échelle s'arrête là : le rang suivant du § 3 est post-natal, il ne se date pas " +
         "en SA" }
];

/* ── 03 bis · Lobe daté, siège de la parathyroïde, chiffres consignés ─────────
   Les deux axes catégoriels de cet organe ne sont pas des barèmes : il n'existe
   aucune mesure quantitative de maturation thyroïdienne (§ 3). Ce sont les deux
   choses sans lesquelles une observation ne veut rien dire — DE QUEL LOBE on
   parle, et OÙ la parathyroïde a été trouvée, l'ectopie y étant normale. */
var LOBES = [
  { k:"lobeDroit",  l:"Lobe droit" },
  { k:"lobeGauche", l:"Lobe gauche" },
  { k:"deuxLobes",  l:"Les deux lobes, datés séparément" },
  { k:"lobeUnique", l:"Un seul lobe retrouvé sur le bloc" },
  { k:"nonPrecise", l:"Lobe NON précisé sur le bloc" }
];

var SIEGES = [
  { k:"retro",       l:"Rétro-thyroïdienne" },
  { k:"intrathy",    l:"Intrathyroïdienne" },
  { k:"intrathym",   l:"Intrathymique ou avec un lobule thymique non descendu" },
  { k:"pericarde",   l:"Péricardique" },
  { k:"paratracheal",l:"Paratrachéale ou para-œsophagienne" },
  { k:"aucune",      l:"Aucune parathyroïde identifiée sur la lame" }
];

var MESURE = {
  titre:"Lobe daté, siège de la parathyroïde, chiffres consignés",
  defLabel:"lobe daté — le stade se lit lobe par lobe",
  optLabel:"siège de la parathyroïde identifiée — l'ectopie y est normale",
  defs:LOBES, opts:SIEGES,
  champs:[{ id:"follicule", label:"Diamètre du plus gros follicule (mm)", min:0, max:10, step:0.1 },
          { id:"poids",     fv:"FOETO:PF.END-NOR-096", label:"Poids thyroïdien (g)",                 min:0, max:30, step:0.01 },
          { id:"nPara",     label:"Parathyroïdes identifiées (n)",        min:0, max:4,  step:1 }]
};

/* Le verdict de cet axe est le seul endroit de la grille qui BLOQUE : un stade
   coché sur une thyroïde effondrée n'est pas une lecture, c'est une lecture de
   l'autolyse. Et une parathyroïde absente d'un bloc non sérié n'est pas une
   donnée. */
function verdictMesure(){
  var lob = E.mesure.def, sie = E.mesure.opt, sa = num("sa");
  var d = E.mesure.v.follicule, p = E.mesure.v.poids, n = E.mesure.v.nPara;
  if (!lob && !sie && d == null && p == null && n == null && !E.stade)
    return { cls:"", txt:"Ni lobe, ni siège de parathyroïde, ni chiffre — la lame n'est pas encore lue." };

  var t = [], cls = "ok", res = [];
  var autolyse = E.retention.temoinInterne === "present" || E.retention.deuxEffondrees === "present" ||
                 E.signes.nappePleine === POS;

  /* 1 — Le blocage : le stade se lit sur une architecture, pas sur une nappe. */
  if (autolyse && E.stade){
    cls = "bad";
    t.push("Stade coché sur une thyroïde effondrée : la maturation n'est PAS lisible. C'est " +
           "exactement l'axe que l'autolyse détruit en premier — il ne reste que la lésion, et encore : " +
           "« ni stade, ni déplétion colloïdale, ni hyperplasie ». La formule à écrire est " +
           "« maturation thyroïdienne non évaluable (effondrement autolytique de l'architecture " +
           "folliculaire, parathyroïde adjacente préservée) », pas un rang.");
  }

  /* 2 — Le lobe : sans lui, l'asymétrie n'existe pas. */
  if (!lob || lob === "nonPrecise"){
    if (cls === "ok") cls = "warn";
    t.push((lob === "nonPrecise" ? "Lobe déclaré NON précisé sur le bloc" : "Lobe NON déclaré") +
           " : la thyroïde est médiane mais bilobée, et la discordance de maturation s'écrit aussi en " +
           "ASYMÉTRIE, chaque lobe daté séparément [keeling, ch. 26]. Sans le lobe, une hémiagénésie " +
           "et une hyperplasie compensatrice ne se distinguent d'aucune façon.");
  } else if (lob === "lobeUnique"){
    if (cls === "ok") cls = "warn";
    t.push("Un seul lobe retrouvé. Trois lectures restent ouvertes et la lame n'en écarte aucune : " +
           "hémiagénésie vraie, lobe absent DU BLOC, ou dysgénésie. Le tissu ectopique peut être le " +
           "seul tissu thyroïdien du fœtus et « may show compensatory hyperplasia and hyperactivity » " +
           "[keeling, ch. 26] — un foyer lingual hyperplasique n'est pas un reliquat, c'est peut-être " +
           "la glande.");
  } else {
    t.push("Lobe daté : " + par(LOBES, lob).l.toLowerCase() + ".");
  }

  /* 3 — La parathyroïde : où, et sur quel bloc. */
  if (sie === "aucune"){
    if (E.prelev.blocSerie){
      if (cls === "ok") cls = "warn";
      t.push("Aucune parathyroïde identifiée SUR BLOC SÉRIÉ : le constat devient recevable, et il " +
             "s'écrit — il ne se conclut pas. Corréler au thymus de la même lame et au cœur.");
    } else {
      cls = "bad";
      t.push("Aucune parathyroïde identifiée ET bloc cervical non sérié : ce n'est PAS une donnée. " +
             "« Parathyroid glands can be difficult to identify grossly in fetuses » [ernst, ch. 22] ; " +
             "une parathyroïde peut être intrathyroïdienne, intrathymique, péricardique, " +
             "paratrachéale — elle n'est pas absente, elle est ailleurs.");
    }
  } else if (sie){
    t.push("Parathyroïde identifiée : " + par(SIEGES, sie).l.toLowerCase() + " — siège NORMAL, " +
           "sans valeur pathologique : « it is not unusual for a parathyroid gland to be found " +
           "posterior to or within the thyroid gland or with an associated undescended thymic " +
           "lobule » [ernst, ch. 22]. C'est sa non-mention qui ne vaut rien.");
  } else {
    res.push("siège de la parathyroïde non déclaré — l'ectopie y est normale, l'énoncé doit porter le siège");
  }

  if (n != null){
    t.push(n + " parathyroïde(s) identifiée(s) sur 4 attendues — « Usually, there are 4 parathyroid " +
           "glands (superior and inferior pairs) but they may vary in number and position » " +
           "[keeling, ch. 26] : un compte inférieur à 4 n'est pas un déficit, c'est le compte de ce " +
           "qui a été retrouvé.");
    if (n < 4 && !E.prelev.blocSerie)
      res.push("compte de parathyroïdes établi sur un bloc non sérié — il ne se rapporte à rien");
  }

  /* 4 — Les chiffres : consignés, jamais rapportés à une norme qui n'existe pas. */
  if (d != null){
    if (cls === "ok") cls = "warn";
    t.push("Plus gros follicule mesuré à " + d + " mm. Aucune norme : « Ni diamètre folliculaire, ni " +
           "hauteur épithéliale, ni rapport colloïde/épithélium, ni densité folliculaire n'est chiffré " +
           "dans les sources ouvertes. » Le corpus mesure quand même, et c'est ce qu'il faut faire : " +
           "« Thyroïde : présence de follicules thyroïdiens irrégulièrement dilatés, certains de taille " +
           "kystique (jusqu'à 1 mm), bordés par un épithélium folliculaire cubique régulier, contenant " +
           "une colloïde pâle finement réticulée. » [corpus CR]. La mesure se consigne, elle ne " +
           "s'interprète pas.");
  }
  if (p != null){
    if (cls === "ok") cls = "warn";
    t.push("Poids thyroïdien " + p + " g — à consigner SANS barème. Le seul chiffre disponible, " +
           "« enlarged thyroids weighing 5–10 g (normal 1–3 g) » [keeling, ch. 26], est cité pour une " +
           "comparaison adulte-endémique : il n'est rattaché ni à un terme, ni à une échelle, ni " +
           "explicitement au nouveau-né (§ 9-3). « Il n'existe aucune normale pondérale thyroïdienne " +
           "ou parathyroïdienne par SA dans les sources ouvertes. » Écrire " +
           "« thyroïde de 0,4 g (N : [1–3 g]) » serait un faux chiffré.");
  }

  /* 5 — Réserves de plan de coupe, qui décident du sens du stade. */
  if (!E.prelev.transversale)
    res.push("plan transversal non confirmé — en oblique, les follicules sont coupés en biais et leur " +
             "taille n'est pas évaluable");
  if (!E.prelev.epaisseurLobe)
    res.push("épaisseur du lobe non confirmée — le gradient est centrifuge, une tranche périphérique " +
             "surestime le terme");
  if (!E.prelev.deuxLobes && lob === "deuxLobes")
    res.push("deux lobes datés alors que leur présence sur la lame n'est pas confirmée au § 02");
  if (sa != null && sa < 22 && E.signes.nappePleine === POS)
    res.push("à " + sa + " SA, l'aspect « cellulaire, presque solide » est la NORMALE des livres — " +
             "chercher les follicules périphériques au fort grossissement avant de parler d'autolyse");

  if (res.length){ if (cls === "ok") cls = "warn"; t.push("Réserves : " + res.join(" ; ") + "."); }
  return { cls:cls, txt:t.join(" ") };
}

/* ── 05 · Variantes normales ──────────────────────────────────────────────────
   Chacune vit dans le cadre dont elle MIME un signe (g) : visible même
   paragraphe replié, au CR seulement en parenthèse. Termes FOETO NOR
   correspondants (le générateur ne branche pas les variantes, ids pour mémoire) :
   gradientCentrifuge END-NOR-102 · epitheliumSecretoire END-NOR-101 ·
   cellulesC END-NOR-100 · nidsSolides END-NOR-104 · inclusionsHetero END-NOR-028 ·
   lobePyramidal END-NOR-103 · paraIntrathy END-MAL-134 · pasOxyphiles END-NOR-098 ·
   pasStromaAdipeux END-NOR-099 · tailleParaCroissante END-NOR-107. */
var VARIANTES = [
  { k:"aspectSolideJeune", g:"Nappe épithéliale et déplétion colloïdale",
    l:"Aspect cellulaire, presque solide, à faible grossissement sur tissu conservé" },
  { k:"neonatalPostTsh", g:"Nappe épithéliale et déplétion colloïdale",
    l:"Aspect néonatal d'après le pic de TSH — rang hors échelle fœtale" },
  { k:"gradientCentrifuge", fv:"FOETO:PF.END-NOR-102", g:"Follicules et colloïde",
    l:"Follicules plus gros à la périphérie du lobe — gradient centre → périphérie" },
  /* v2, fiche § 4 [ernst, ch. 21] : mime l'épithélium hyperplasique */
  { k:"epitheliumSecretoire", fv:"FOETO:PF.END-NOR-101", g:"Follicules et colloïde",
    l:"Cellules folliculaires plus hautes, cytoplasme apical éosinophile pâle — activité sécrétoire" },
  { k:"cellulesC", fv:"FOETO:PF.END-NOR-100", g:"Follicules et colloïde",
    l:"Cellules C parafolliculaires du tiers moyen profond des lobes latéraux" },
  { k:"nidsSolides", fv:"FOETO:PF.END-NOR-104", g:"Masses et tissus non thyroïdiens",
    l:"Nids de cellules solides, reliquats des corps ultimobranchiaux (p63+)" },
  { k:"inclusionsHetero", fv:"FOETO:PF.END-NOR-028", g:"Masses et tissus non thyroïdiens",
    l:"Inclusions intrathyroïdiennes hétérotopiques : thymus, cartilage, épithélium cilié, graisse" },
  { k:"choristome", g:"Masses et tissus non thyroïdiens", l:"Choristome thymique intrathyroïdien, bénin" },
  { k:"lobePyramidal", fv:"FOETO:PF.END-NOR-103", g:"Masses et tissus non thyroïdiens", l:"Lobe pyramidal mêlé de muscle squelettique" },
  { k:"paraIntrathy", g:"Parathyroïdes", l:"Parathyroïde en arrière du lobe ou dans la thyroïde" },
  { k:"paraThymusEctopique", g:"Parathyroïdes", l:"Parathyroïdes entourées de tissu thymique ectopique" },
  { k:"pasOxyphiles", fv:"FOETO:PF.END-NOR-098", g:"Parathyroïdes", l:"Absence de cellule oxyphile parathyroïdienne" },
  { k:"pasStromaAdipeux", fv:"FOETO:PF.END-NOR-099", g:"Parathyroïdes", l:"Absence de stroma adipeux parathyroïdien" },
  /* v2, fiche § 3 [ernst, ch. 22] : mime l'hypertrophie parathyroïdienne */
  { k:"tailleParaCroissante", fv:"FOETO:PF.END-NOR-107", g:"Parathyroïdes",
    l:"Parathyroïde plus grande avec le terme — tendance illustrée, sans borne chiffrée" }
];

/* Cadres dans l'ordre de lecture du bloc cervical : la glande et ses lobes au
   faible grossissement, ce qui n'est pas de la thyroïde, les parathyroïdes —
   témoin qui dit si le parenchyme se lit —, puis le parenchyme, puis ce qui se
   cherche cellule par cellule. */
var CADRES = [
  { g:"Contexte hors lame — autres lames, clinique, échantillonnage", hors:true },
  { g:"Glande, lobes, ectopie et kystes", sur:"Glande et développement" },
  { g:"Masses et tissus non thyroïdiens", sur:"Glande et développement" },
  { g:"Parathyroïdes", sur:"Parathyroïdes" },
  { g:"Nappe épithéliale et déplétion colloïdale", sur:"Parenchyme thyroïdien" },
  { g:"Follicules et colloïde", sur:"Parenchyme thyroïdien" },
  { g:"Pigment et fer", sur:"Lésions acquises" },
  { g:"Infection, inflammation et circulation", sur:"Lésions acquises" }
];
/* ── 06 · Signes ──────────────────────────────────────────────────────────────
   On coche des SIGNES, jamais des diagnostics. Sur cet organe la frontière est
   nette : la micro décrit l'absence, l'atrophie, la déplétion ; « hypothyroïdie
   congénitale » et « DiGeorge » appartiennent à la conclusion, après la biologie
   ou la FISH. Rien de coché ne veut pas dire absent : ça veut dire non regardé.
   v2 : un signe branché (fv) prend son libellé et son HPO dans FOETO ; le l
   écrit à côté est celui de la v1, gardé pour mémoire. Un signe sans terme porte
   fiche:"[source]" quand la fiche le décrit. bloc:false = hors du Non en bloc. */
var SIGNES = [
  /* — Contexte hors lame — autres lames, clinique, échantillonnage — */
  { k:"thymusAbsentHypo", fv:"FOETO:PF.END-MAL-122", g:"Contexte hors lame — autres lames, clinique, échantillonnage",
    l:"Thymus absent ou hypoplasique" },
  { k:"malfCardiaqueConotroncale", fv:"FOETO:PF.END-MAL-114", g:"Contexte hors lame — autres lames, clinique, échantillonnage",
    l:"Malformation cardiaque cono-troncale", meta:"hors de cette lame — le cœur d'abord" },
  { k:"rciuOligo", fiche:"[soffoet, ch. 13]", g:"Contexte hors lame — autres lames, clinique, échantillonnage",
    l:"RCIU sévère et précoce avec oligo-anamnios", meta:"hors lame" },
  { k:"nidfPlacenta", fv:"FOETO:PF.END-MET-005", g:"Contexte hors lame — autres lames, clinique, échantillonnage",
    l:"Placenta trapu, NIDF diffuse, dépôts fibrinoïdes massifs", meta:"lame placentaire" },
  { k:"tubesDedifferencies", fv:"FOETO:PF.END-MAL-153", fiche:"[soffoet, ch. 13]", g:"Contexte hors lame — autres lames, clinique, échantillonnage",
    l:"Dysgénésie tubulaire acquise — dé-différenciation des tubes contournés proximaux", meta:"lame rénale" },
  { k:"hypocalvaria", fv:"FOETO:PF.END-MAL-154", fiche:"[soffoet, ch. 13]", g:"Contexte hors lame — autres lames, clinique, échantillonnage",
    l:"Hypocalvaria, ostéopénie radiologique", meta:"hors lame" },
  /* prélèvement qui contrefait des lésions : se sait du bloc, pas de la lame */
  { k:"blocNonSerie", fiche:"[ernst, ch. 22]", g:"Contexte hors lame — autres lames, clinique, échantillonnage",
    l:"Bloc cervical NON sérié en coupes transversales" },

  /* — Glande, lobes, ectopie et kystes — dysgénésie, kystes, plan de coupe — */
  { k:"tissuAbsent", terme:[9, null], fv:"FOETO:PF.END-MAL-123", g:"Glande, lobes, ectopie et kystes", mag:"faible",
    l:"Aucun tissu thyroïdien en position normale sur le bloc" },
  { k:"glandeAtrophique", fv:"FOETO:PF.END-MAL-155", fiche:"[keeling, ch. 26]", g:"Glande, lobes, ectopie et kystes", mag:"faible",
    l:"Glande très atrophique" },
  { k:"lobeAbsent", fv:"FOETO:PF.END-MAL-118", g:"Glande, lobes, ectopie et kystes", mag:"faible",
    l:"Un lobe absent, l'autre en place" },
  { k:"lobeAsymetrique", fiche:"[keeling, ch. 26]", g:"Glande, lobes, ectopie et kystes", mag:"faible",
    l:"Asymétrie de taille ou de stade entre les deux lobes" },
  { k:"coupeTangentielle", fv:"FOETO:PF.END-MAL-156", fiche:"[ernst, ch. 21]", g:"Glande, lobes, ectopie et kystes", mag:"faible",
    l:"Coupe tangentielle ou périphérique du lobe" },
  { k:"tissuEctopique", fv:"FOETO:PF.END-MAL-055", g:"Glande, lobes, ectopie et kystes", mag:"faible",
    l:"Foyer de tissu thyroïdien ectopique — lingual, sublingual, supra- ou infrathyroïdien" },
  { k:"kysteTrajet", fv:"FOETO:PF.END-MAL-157", fiche:"[keeling, ch. 26]", g:"Glande, lobes, ectopie et kystes", mag:"faible",
    l:"Kyste médian sur le trajet du canal thyréoglosse" },
  { k:"kysteIntraglandulaire", fiche:"[corpus CR]", g:"Glande, lobes, ectopie et kystes", mag:"faible",
    l:"Kyste intraglandulaire à matrice éosinophile" },
  { k:"ectopieHyperplasique", fv:"FOETO:PF.END-MAL-115", g:"Glande, lobes, ectopie et kystes", mag:"moyen",
    l:"Foyer ectopique hyperplasique ou hyperactif",
    meta:"ce n'est peut-être pas un reliquat : c'est peut-être la glande" },

  /* — Masses et tissus non thyroïdiens — masse, et le muscle de bordure — */
  { k:"masse", fiche:"[keeling, ch. 26]", g:"Masses et tissus non thyroïdiens", mag:"faible",
    l:"Masse ou nodule expansif" },
  { k:"muscleStrieIntrathy", fiche:"[ernst, ch. 21]", g:"Masses et tissus non thyroïdiens", mag:"faible",
    l:"Muscle strié dans la thyroïde ou en bordure de coupe",
    meta:"lobe pyramidal normal, ou « a possible association with myopathies » — non tranché" },
  { k:"contingentsMultiples", g:"Masses et tissus non thyroïdiens", mag:"moyen",
    l:"Contingents tissulaires multiples dans la masse" },
  { k:"surchargePAS", fv:"FOETO:PF.END-INF-013", fiche:"[soffoet, ch. 20]", g:"Masses et tissus non thyroïdiens", mag:"technique",
    l:"Inclusions PAS+ résistantes à l'amylase dans les fibres striées" },

  /* — Parathyroïdes — */
  { k:"paraHypertrophiee", fv:"FOETO:PF.END-MAL-120", g:"Parathyroïdes", mag:"faible",
    l:"Hypertrophie d'une parathyroïde" },
  /* Déduit, ne se clique pas : il redit le siège déclaré en Maturation (Aucune parathyroïde
     identifiée sur la lame) ou le compte saisi. Hors du Non en bloc : formulé en négatif,
     le Non affirmerait qu'une parathyroïde a été vue, sans siège. */
  { k:"aucuneParaVue", fv:"FOETO:PF.END-MAL-158", auto:function(){
      var o = E.mesure.opt, n = E.mesure.v.nPara;
      if (o) return o === "aucune";
      return n == null ? null : n === 0; },
    fiche:"[ernst, ch. 22]", g:"Parathyroïdes", mag:"moyen",
    l:"Aucune parathyroïde identifiée sur la lame" },
  { k:"paraAbsentePetite", fv:"FOETO:PF.END-MAL-119", g:"Parathyroïdes", mag:"moyen",
    l:"Parathyroïdes absentes ou de petite taille SUR BLOC CERVICAL SÉRIÉ" },
  { k:"nodulePasIdentifiable", fiche:"[ernst, ch. 22]", g:"Parathyroïdes", mag:"fort",
    l:"Nodule cervical non rattachable : parathyroïde, ganglion ou thyroïde" },

  /* — Nappe épithéliale et déplétion colloïdale — autolyse et son témoin, le piège central — */
  { k:"nappePleine", fv:"FOETO:PF.END-MAL-159", fiche:"[ernst, ch. 21]", g:"Nappe épithéliale et déplétion colloïdale", mag:"faible",
    l:"Follicules non identifiables, nappe épithéliale quasi pleine",
    meta:"mime à la fois l'immaturité et la déplétion colloïdale" },
  { k:"contrasteTemoin", fv:"FOETO:PF.END-MAL-160", fiche:"[ernst, ch. 22]", g:"Nappe épithéliale et déplétion colloïdale", mag:"moyen",
    l:"Contraste sur la même lame : thyroïde effondrée, parathyroïde préservée",
    meta:"témoin interne — c'est la paire qui informe, pas chaque glande" },
  { k:"deplationColloide", seul:true, fv:"FOETO:PF.END-NOR-095", g:"Nappe épithéliale et déplétion colloïdale", mag:"moyen",
    l:"Déplétion colloïdale, perte de colloïde",
    meta:"trois lectures irréconciliables : lésion, réponse au travail, autolyse" },
  { k:"vacuolisationDetachement", fv:"FOETO:PF.END-MET-012", fiche:"[ernst, ch. 21]", g:"Nappe épithéliale et déplétion colloïdale", mag:"fort",
    l:"Vacuolisation ou détachement des cellules épithéliales" },
  { k:"noyauxPycnotiques", fv:"FOETO:PF.END-MAL-161", fiche:"[ernst, ch. 21]", g:"Nappe épithéliale et déplétion colloïdale", mag:"fort",
    l:"Noyaux irréguliers et pycnotiques, « nuclear knots »" },

  /* — Follicules et colloïde — goitre, trois images à ne pas confondre, et l'image sans source — */
  { k:"glandeVolumineuse", fv:"FOETO:PF.END-MAL-124", g:"Follicules et colloïde", mag:"faible",
    l:"Glande augmentée de volume" },
  { k:"hyperplasieNodulaire", fv:"FOETO:PF.END-MAL-117", g:"Follicules et colloïde", mag:"faible",
    l:"Hyperplasie nodulaire" },
  { k:"folliculesGros", fv:"FOETO:PF.END-MAL-162", fiche:"[keeling, ch. 26]", g:"Follicules et colloïde", mag:"faible",
    l:"Follicules larges" },
  { k:"colloideAugmentee", fv:"FOETO:PF.END-MAL-116", g:"Follicules et colloïde", mag:"faible",
    l:"Colloïde augmentée en quantité" },
  { k:"folliculesKystiquesRetic", fiche:"[corpus CR]", g:"Follicules et colloïde", mag:"moyen",
    l:"Follicules irrégulièrement dilatés à colloïde pâle finement réticulée",
    meta:"aucun des trois livres ne décrit cette image" },
  /* bloc:false — polarité normale (« régulier ») : absent en bloc dirait un épithélium irrégulier */
  { k:"epitheliumCubiqueRegulier", bloc:false, fiche:"[corpus CR]", g:"Follicules et colloïde", mag:"moyen",
    l:"Épithélium folliculaire cubique régulier bordant les follicules dilatés" },
  { k:"folliculesPetitsVides", fv:"FOETO:PF.END-MAL-163", terme:[14, null], fiche:"[keeling, ch. 26]", g:"Follicules et colloïde", mag:"moyen",
    l:"Petits follicules vides" },
  { k:"epitheliumHyperplasique", fv:"FOETO:PF.END-MAL-016", g:"Follicules et colloïde", mag:"moyen",
    l:"Épithélium folliculaire hyperplasique" },
  { k:"pleomorphismeNucleaire", fv:"FOETO:PF.END-MAL-121", g:"Follicules et colloïde", mag:"fort",
    l:"Pléomorphisme et gigantisme nucléaires focaux",
    meta:"chez le fœtus, ce n'est PAS un critère de malignité" },

  /* — Pigment et fer — surcharge ; le Non de ce cadre est le négatif récurrent du service — */
  { k:"pigmentBrun", fv:"FOETO:PF.END-NOR-023", g:"Pigment et fer", mag:"moyen",
    l:"Pigment brun dans les cellules épithéliales",
    meta:"il n'y a pas de lipofuscine normale dans la thyroïde fœtale" },
  { k:"perlsPositif", fv:"FOETO:PF.END-MET-006", g:"Pigment et fer", mag:"technique",
    l:"Perls positif dans les cellules épithéliales" },

  /* — Infection, inflammation et circulation — */
  { k:"congestion", fiche:"[corpus CR]", g:"Infection, inflammation et circulation", mag:"faible",
    l:"Congestion" },
  { k:"hemorragiesParenchymateuses", fiche:"[corpus CR]", g:"Infection, inflammation et circulation", mag:"faible",
    l:"Foyers d'hémorragie intraparenchymateux" },
  { k:"inflammation", fv:"FOETO:PF.END-INF-011", g:"Infection, inflammation et circulation", mag:"moyen",
    l:"Infiltrat inflammatoire" },
  { k:"cellulesGeantesNecrosees", fiche:"[corpus CR]", g:"Infection, inflammation et circulation", mag:"moyen",
    l:"Cellules géantes, souvent nécrosées" },
  { k:"inclusionsCMV", fv:"FOETO:PF.END-INF-001", g:"Infection, inflammation et circulation", mag:"fort",
    l:"Inclusion nucléaire ± cytoplasmique dans une cellule épithéliale" },
  { k:"ihcCmvNegLysee", fiche:"[corpus CR]", g:"Infection, inflammation et circulation", mag:"technique",
    l:"IHC CMV négative sur tissu lysé", meta:"n'exclut rien" }
];
/* ── 06 bis · Associations lues ────────────────────────────────────────────────
   Rien ne se clique ici : ces lignes s'allument toutes seules à partir des
   signes cochés. Elles ne concluent pas, elles disent ce qu'il reste à faire et
   ce qui, sur cette lame, ne peut pas être tranché. Deux associations
   contradictoires peuvent s'afficher ensemble : c'est voulu. */
var DIAGS = [
  { k:"autolyseThyroidienne", l:"Effondrement folliculaire post-mortem — le témoin parathyroïdien répond",
    cle:"nappePleine", min:2,
    signes:["nappePleine","contrasteTemoin","deplationColloide","vacuolisationDetachement","noyauxPycnotiques"],
    stop:"Avant tout : la parathyroïde de la même lame. Préservée pendant que la thyroïde est " +
         "en nappe, c'est de l'autolyse thyroïdienne, et alors ni stade, ni déplétion colloïdale, " +
         "ni hyperplasie ne se lisent. Ne pas conclure sans elle : la thyroïde n'est dans aucune " +
         "horloge de macération, elle ne date rien toute seule." },

  { k:"dechargePerinatale", l:"Déplétion colloïdale — trois lectures irréconciliables, aucune tranchée",
    cle:"deplationColloide", min:2,
    signes:["deplationColloide","vacuolisationDetachement","noyauxPycnotiques","nappePleine"],
    stop:"La même image porte trois lectures, et aucune n'a été départagée. Lésion vraie " +
         "(Sagreiya et Emery, sur 1 225 thyroïdes d'enfants) : « irregular and pyknotic nuclei, " +
         "and nuclear knots », et les auteurs tiennent que « these changes represented pathologic " +
         "changes », ni normales ni autolytiques [ernst, ch. 21]. Réponse physiologique au " +
         "travail : « a more solid appearance due to depletion of the colloid », qui serait " +
         "« the result of physiological response to labor and delivery. » [keeling, ch. 26]. " +
         "Autolyse post-mortem : la lecture ancienne, « postmortem autolysis by some. » " +
         "[keeling, ch. 26]. Le constat qui clôt le débat sans le trancher : ces travaux n'ont " +
         "jamais été répétés et « it can be extremely difficult to sort out » l'autolyse d'une " +
         "lésion vraie sur la thyroïde d'un mort-né [ernst, ch. 21]. Décrire la déplétion ; " +
         "écrire « décharge thyroïdienne périnatale », c'est choisir un camp." },

  { k:"dysgenesie", l:"Dysgénésie thyroïdienne — absence, atrophie ou ectopie",
    fv:"FOETO:PF.END-MAL-126", cle:"tissuAbsent", min:2,
    signes:["tissuAbsent","glandeAtrophique","tissuEctopique","ectopieHyperplasique","blocNonSerie"],
    stop:"« In thyroid dysgenesis, the thyroid is absent or very atrophic ». Une thyroïde absente " +
         "DU BLOC n'est pas une thyroïde absente du fœtus : blocs de base de langue et de cou " +
         "avant de conclure. Un foyer ectopique peut « show compensatory hyperplasia and " +
         "hyperactivity » — ce n'est peut-être pas un reliquat, c'est peut-être la glande. Ne pas " +
         "écrire « hypothyroïdie congénitale » en micro : la micro décrit l'absence, la conclusion nomme." },

  { k:"hemiagenesie", l:"Un lobe manquant ou décalé — hémiagénésie ou hypoplasie unilatérale",
    fv:"FOETO:PF.END-MAL-129", cle:"lobeAbsent", min:2,
    signes:["lobeAbsent","lobeAsymetrique","coupeTangentielle","blocNonSerie"],
    stop:"Dater les deux lobes séparément avant de parler d'asymétrie : le gradient est centrifuge, " +
         "une coupe tangentielle d'un lobe et une coupe centrale de l'autre suffisent à fabriquer " +
         "un décalage de stade." },

  { k:"dyshormonogenese", l:"Image nodulaire à petits follicules vides — évoque une dyshormonogenèse",
    fv:"FOETO:PF.END-MAL-127", cle:"hyperplasieNodulaire", min:2,
    signes:["hyperplasieNodulaire","folliculesPetitsVides","pleomorphismeNucleaire","glandeVolumineuse"],
    stop:"« nodular hyperplasia with small empty follicles » avec « focal nuclear pleomorphism and " +
         "gigantism ». Le piège est de lire un cancer : « This appearance has been mistaken for " +
         "thyroid carcinoma. » Chez le fœtus, pléomorphisme et gigantisme nucléaires ne sont pas " +
         "un critère de malignité." },

  { k:"goitreEndemique", l:"Gros follicules à colloïde abondante — image de goitre endémique / iode",
    /* v2 : pivot = le terme FOETO (gros follicules ET colloïde augmentée) ; v1 : folliculesGros */
    fv:"FOETO:PF.END-MAL-128", cle:"colloideAugmentee", min:2,
    signes:["folliculesGros","colloideAugmentee","glandeVolumineuse"],
    stop:"« The follicles are large and colloid is increased in amount. » Le contexte maternel " +
         "(iode, antithyroïdiens, amiodarone) est hors lame. Le poids cité, « enlarged thyroids " +
         "weighing 5–10 g (normal 1–3 g) », n'est rattaché ni à un terme ni à une échelle : le " +
         "consigner, ne pas en faire une norme." },

  { k:"hyperthyroidie", l:"Épithélium hyperplasique et colloïde effondrée — image d'hyperthyroïdie",
    fv:"FOETO:PF.END-MAL-131", cle:"epitheliumHyperplasique", min:2,
    signes:["epitheliumHyperplasique","deplationColloide","glandeVolumineuse","folliculesPetitsVides"],
    stop:"« The thyroid gland is enlarged and shows hyperplastic epithelium and colloid depletion. » " +
         "Deux barrières : le témoin parathyroïdien, sinon la déplétion est peut-être post-mortem ; " +
         "et le contexte maternel (Graves, mutation TSHR), qui n'est pas sur la lame. À chercher " +
         "ailleurs : hydramnios, hyperextension du cou, insuffisance cardiaque à haut débit, " +
         "anasarque, RCIU avec maturation osseuse en avance." },

  { k:"kysteThyreoglosse", l:"Kyste médian sur le trajet — kyste du canal thyréoglosse",
    fv:"FOETO:PF.END-MAL-133", cle:"kysteTrajet", min:2,
    signes:["kysteTrajet","tissuEctopique","kysteIntraglandulaire"],
    stop:"Ne pas nommer « kyste thyréoglosse » sur une coupe intraglandulaire sans le trajet. Le " +
         "corpus décrit aussi un kyste intrathyroïdien : « Un kyste thyroïdien de 2 x 3 mm " +
         "contenant une matrice éosinophile ». Différentiel : « Congenital thymus cyst might be " +
         "considered in the differential diagnosis »." },

  { k:"folliculesReticules", l:"Follicules dilatés à colloïde pâle réticulée — image sans étiquette",
    cle:"folliculesKystiquesRetic", min:2,
    signes:["folliculesKystiquesRetic","epitheliumCubiqueRegulier","folliculesGros"],
    stop:"Aucun des trois livres ne décrit cette image ; elle vient du corpus seul : « présence de " +
         "follicules thyroïdiens irrégulièrement dilatés, certains de taille kystique (jusqu'à " +
         "1 mm), bordés par un épithélium folliculaire cubique régulier, contenant une colloïde " +
         "pâle finement réticulée. » L'enregistrer telle quelle, mesurer le plus gros follicule, " +
         "ne pas la ranger dans le goitre endémique ni dans l'artefact de rétraction." },

  { k:"surchargeFer", l:"Pigment brun thyroïdien — dépôt de fer extrahépatique à confirmer au Perls",
    fv:"FOETO:PF.END-MET-007", cle:"pigmentBrun", min:2,
    signes:["pigmentBrun","perlsPositif"],
    stop:"« Brown pigment within the fetal thyroid gland should raise suspicion for extrahepatic " +
         "iron deposition, as seen in neonatal hemochromatosis, and should be confirmed by " +
         "Prussian blue stain. » Il n'y a pas de lipofuscine normale dans la thyroïde fœtale : le " +
         "pigment brun n'a pas d'alternative bénigne, il faut le Perls. Ne pas écrire " +
         "« hémochromatose périnatale » ici : le diagnostic se fait sur le foie et l'histoire familiale." },

  { k:"cmv", l:"Inclusion épithéliale — infection à CMV à confirmer",
    fv:"FOETO:PF.END-INF-012", cle:"inclusionsCMV", min:2,
    signes:["inclusionsCMV","cellulesGeantesNecrosees","inflammation","ihcCmvNegLysee"],
    stop:"La thyroïde est une cible épithéliale reconnue du CMV. Piège symétrique : les cellules " +
         "géantes de macération — le corpus l'écrit lui-même, « de multiples cellules géantes " +
         "(souvent nécrosées) dont il est difficile d'affirmer la présence d'inclusion " +
         "nucléaires ». IHC CMV clone E13 (CCH2 + DDG9), Dako, 1/50 ; sur fœtus très macéré, " +
         "chercher les inclusions dans les alvéoles pulmonaires. Une IHC négative sur tissu lysé " +
         "n'exclut rien." },

  /* v2 : ajoutée pour porter END-MAL-132 (fiche § 5.6) — la lésion, avant son faisceau 22q11 */
  { k:"hypoplasiePara", l:"Parathyroïdes absentes ou petites sur bloc sérié — hypoplasie / aplasie parathyroïdienne",
    fv:"FOETO:PF.END-MAL-132", cle:"paraAbsentePetite", min:1,
    signes:["paraAbsentePetite","aucuneParaVue"],
    stop:"Sur bloc cervical correctement sérié seulement : « Parathyroid glands can be difficult to " +
         "identify grossly in fetuses, even with the aid of a dissecting microscope ». Une parathyroïde " +
         "non vue est peut-être ailleurs — intrathyroïdienne, intrathymique, péricardique, paratrachéale. " +
         "Le défaut des 3ᵉ et 4ᵉ poches se lit sur la paire thymus + parathyroïdes et sur le cœur " +
         "(faisceau 22q11), mais il n'est pas la seule cause : mutations PTH, CASR, GCMB, " +
         "hypoparathyroïdie récessive liée à l'X avec agénésie parathyroïdienne, Kenny-Caffey, " +
         "Kearns-Sayre [keeling, ch. 26]. La micro décrit l'absence ; la conclusion nomme." },

  { k:"digeorge", l:"Parathyroïdes absentes sur bloc sérié + thymus + cœur — faisceau 22q11",
    fv:"FOETO:PF.END-MAL-125", cle:"paraAbsentePetite", min:2,
    signes:["paraAbsentePetite","thymusAbsentHypo","malfCardiaqueConotroncale"],
    stop:"« DiGeorge syndrome… is characterised by thymic aplasia or hypoplasia, parathyroid " +
         "hypoplasia and cardiac malformation ». Le cœur d'abord : sur 31 cas fœtaux de la série " +
         "collaborative, interruption de l'arche aortique 9, atrésie pulmonaire + CIV 8, " +
         "tétralogie de Fallot 6, tronc artériel commun 5, anomalies rénales dans un tiers des " +
         "cas, aucune fente palatine. Ce qui tranche est un caryotype AVEC FISH, « la délétion " +
         "n'étant pas, en général, repérable sur un caryotype fœtal standard ». Ne pas écrire " +
         "« DiGeorge » en micro. Autres causes à garder en conclusion : PTH, CASR, GCMB, " +
         "hypoparathyroïdie liée à l'X, Kenny-Caffey, Kearns-Sayre." },

  { k:"fausseAplasiePara", l:"Aucune parathyroïde vue — absence de preuve, pas preuve d'absence",
    cle:"aucuneParaVue", min:2,
    signes:["aucuneParaVue","blocNonSerie","nodulePasIdentifiable","coupeTangentielle"],
    stop:"« Parathyroid glands can be difficult to identify grossly in fetuses, even with the aid " +
         "of a dissecting microscope » — une parathyroïde peut être intrathyroïdienne, " +
         "intrathymique, péricardique, paratrachéale : elle n'est pas absente, elle est ailleurs. " +
         "Sans bloc cervical sérié, cette ligne ne dit rien de plus que : non regardé." },

  { k:"hyperparathyroidieSecondaire", l:"Parathyroïde hypertrophiée — faisceau RCIU / oligoamnios / NIDF",
    fv:"FOETO:PF.END-MAL-130", cle:"paraHypertrophiee", min:2,
    signes:["paraHypertrophiee","rciuOligo","nidfPlacenta","tubesDedifferencies","hypocalvaria"],
    stop:"Le faisceau se lit sur trois lames, pas sur celle-ci : placenta trapu à NIDF diffuse et " +
         "dépôts fibrinoïdes massifs, dysgénésie tubulaire acquise sur le rein, hypocalvaria et " +
         "ostéopénie sur l'os. Ne pas conclure « hyperparathyroïdie » sur la seule taille d'une " +
         "glande : elle grandit avec le terme et aucune borne chiffrée n'existe. Différentiels à " +
         "garder : hyperparathyroïdie primitive, I-cell disease / mucolipidose II ; côté maternel, " +
         "hypoparathyroïdie, carence en vitamine D, insuffisance rénale chronique." },

  { k:"circulatoire", l:"Congestion et foyers hémorragiques — lus comme hypoxie aiguë par le corpus",
    cle:"congestion", min:2,
    signes:["congestion","hemorragiesParenchymateuses"],
    stop:"Le corpus les rapporte et les interprète : « On note une congestion modérée du foie et " +
         "de la thyroïde » ; « de multiples petit foyers d'hémorragie intra-parenchymteuses " +
         "diffus ». Aucun livre ne donne le différentiel avec l'exsanguination du fœticide ni avec " +
         "la congestion post-mortem : la fiche ne le tranche pas non plus." },

  { k:"tumeur", l:"Masse thyroïdienne — tératome en tête, carcinome à ne pas surdire",
    fv:["FOETO:PF.END-TUM-005","FOETO:PF.END-TUM-004"], cle:"masse", min:2,
    signes:["masse","contingentsMultiples","hyperplasieNodulaire","pleomorphismeNucleaire"],
    stop:"« Teratomas are the most common neonatal thyroid tumor and may present with " +
         "polyhydramnios. Congenital carcinoma of the thyroid is extremely rare, and some of the " +
         "cases reported are possibly examples of thyroid dyshormonogenesis. » Autrement dit : " +
         "avant de nommer un carcinome congénital, relire l'hypothèse dyshormonogenèse et le kyste " +
         "thymique congénital." },

  { k:"muscleStrieVu", l:"Muscle strié sur la coupe — lobe pyramidal, et une fenêtre sur le muscle",
    cle:"muscleStrieIntrathy", min:2,
    signes:["muscleStrieIntrathy","surchargePAS"],
    stop:"Ce n'est ni une contamination ni une myopathie : « The pyramidal lobe is often admixed " +
         "with skeletal muscle. » La source évoque cependant « a possible association with " +
         "myopathies » sans la trancher. Profiter du muscle plutôt que l'écarter : PAS avec " +
         "digestion amylasique s'il y a des inclusions, la glycogénose IV se voit là." },

  { k:"stadeSurestime", l:"Stade probablement surestimé — le plan de coupe fabrique de la maturité",
    cle:"coupeTangentielle", min:2,
    signes:["coupeTangentielle","blocNonSerie","folliculesGros"],
    stop:"Gradient centrifuge : les follicules périphériques sont les plus gros. Une tranche " +
         "tangentielle, un plan oblique, un bloc non sérié — et le stade monte sans que la glande " +
         "ait bougé. Reprendre le plan transversal avant de dater." }
];
/* ── 07 · Négatifs à énoncer ──────────────────────────────────────────────────
   Sur cet organe la liste des négatifs est plus longue que celle des positifs :
   le corpus s'en sert d'abord comme organe témoin. Un seul est énoncé de façon
   récurrente et volontaire par le service, celui de la surcharge ; les autres
   sont proposés par la fiche.
   v2 : aucun ne se coche. Chacun se DÉDUIT d'un signe répondu absent (signe) ou
   d'une donnée consignée (auto) ; non répondu, il reste ouvert — jamais supposé. */
var NEGATIFS = [
  /* Le Perls est un signe après technique : le Non en bloc ne le répond pas, et un
     pigment brun sans Perls met le négatif en défaut (le ko de la v1). */
  { k:"perls", l:"Absence de surcharge en fer — Perls négatif, thyroïde ET parathyroïdes",
    p:"« absence de surcharge d'autres viscères (coeur, thyroïde et parathyroïdes, glandes " +
      "paratrachéales, pancréas Perls négatifs) » — le seul négatif récurrent du service ; se lit " +
      "sur le signe Perls positif, répondu après la coloration",
    ko:"surcharge ferrique PRÉSENTE ou Perls non fait devant un pigment brun",
    auto:function(){
      var p = E.signes.perlsPositif;
      if (p === POS) return false;
      if (p === NEG) return true;
      return E.signes.pigmentBrun === POS ? false : null; } },
  { k:"pigmentBrun", signe:"pigmentBrun", l:"Absence de pigment brun en HES",
    p:"il n'y a pas de lipofuscine normale dans la thyroïde fœtale",
    ko:"pigment brun PRÉSENT, NON commenté — sans Perls, il reste non qualifié" },
  { k:"cmv", signe:"inclusionsCMV", l:"Absence d'inclusion virale de type CMV (± IHC E13)",
    p:"la thyroïde est une cible épithéliale reconnue du CMV",
    ko:"inclusion suspectée et non tranchée, ou IHC lue sur tissu lysé" },
  { k:"celluleGeante", signe:"cellulesGeantesNecrosees", l:"Absence de cellule géante",
    p:"le corpus l'énonce ; les géantes nécrosées de macération miment l'infection",
    ko:"cellules géantes présentes sans conclusion sur leur nature" },
  { k:"oxyphiles", l:"Absence de cellule oxyphile parathyroïdienne",
    p:"normal jusqu'à 4,5–7 ans : son absence n'est pas une lésion — énoncé quand la variante " +
      "normale est cochée (Parathyroïdes)",
    ko:"absence d'oxyphiles rapportée comme anormale",
    auto:function(){ return E.variantes.pasOxyphiles ? true : null; } },
  { k:"stromaAdipeux", l:"Absence de stroma adipeux parathyroïdien",
    p:"normal chez le fœtus — énoncé quand la variante normale est cochée (Parathyroïdes)",
    ko:"absence de graisse parathyroïdienne lue comme hyperplasie",
    auto:function(){ return E.variantes.pasStromaAdipeux ? true : null; } },
  { k:"ectopie", l:"Absence de tissu thyroïdien ectopique sur les blocs de base de langue et de cou",
    p:"n'a de valeur que si ces blocs ont été faits (Prélèvement) : négatif énoncé SANS bloc de " +
      "base de langue — il ne vaut rien, il reste donc non répondu",
    ko:"tissu thyroïdien ectopique PRÉSENT",
    auto:function(){
      var t = E.signes.tissuEctopique;
      if (t === POS) return false;
      return t === NEG && E.prelev.baseLangue ? true : null; } },
  { k:"siegePara", l:"Présence ou absence de parathyroïde identifiée, ET son siège",
    p:"rétro-thyroïdien, intrathyroïdien, intrathymique : l'ectopie y est normale — se lit au " +
      "siège déclaré (Maturation)",
    ko:"parathyroïde non cherchée, ou trouvée sans que le siège soit écrit",
    auto:function(){
      if (E.mesure.opt) return true;
      return E.signes.aucuneParaVue === NEG ? false : null; } },
  { k:"inflammation", signe:"inflammation", l:"Absence d'infiltrat inflammatoire",
    p:"énoncé par le corpus",
    ko:"infiltrat présent et non caractérisé" },
  { k:"basophilie", l:"Perte de basophilie nucléaire : présente ou absente, en nommant les organes comparés",
    p:"c'est ainsi que le service l'écrit — la comparaison fait le constat, pas l'organe seul ; se " +
      "lit sur la ligne de rétention, organes comparés en remarque",
    ko:"basophilie non commentée, ou commentée sans nommer les organes comparés",
    auto:function(){ return E.retention.basoThyroide ? true : null; } },
  { k:"colloide", l:"Absence de déplétion colloïdale",
    p:"recevable UNIQUEMENT si l'architecture folliculaire est lisible — énoncé quand la déplétion " +
      "ET la nappe épithéliale sont répondues absentes",
    ko:"déplétion colloïdale PRÉSENTE, ou négatif colloïdal énoncé sur une glande en nappe — il n'est pas lisible",
    auto:function(){
      var d = E.signes.deplationColloide, n = E.signes.nappePleine;
      var nappe = n === POS || E.retention.temoinInterne === "present" || E.retention.deuxEffondrees === "present";
      if (d === POS) return false;
      if (d === NEG && nappe) return false;
      return d === NEG && n === NEG ? true : null; } }
];

/* ── 08 · Techniques ──────────────────────────────────────────────────────────
   Une ligne par QUESTION, pas par coloration. Sur cet organe, la technique qui
   tranche le plus souvent n'est pas une coloration : c'est le bloc cervical
   sérié en coupes transversales. */
var TECHNIQUES = [
  { k:"perls",       l:"Perls / bleu de Prusse", q:"ce pigment brun est-il du fer ?" },
  { k:"ihcCmv",      l:"IHC CMV, clone E13 (CCH2 + DDG9), Dako, 1/50",
    q:"ces cellules géantes portent-elles un CMV ? — non interprétable si tissu lysé" },
  { k:"calcitonine", l:"IHC calcitonine, ou Grimelius", q:"où sont les cellules C ?" },
  { k:"p63",         l:"IHC p63", q:"cet amas interfolliculaire est-il un nid de cellules solides ?" },
  { k:"hesSeule",    l:"HES seule — bords cellulaires, chromatine sel et poivre, septa vasculaires, corpuscules de Hassall",
    q:"ce nodule cervical est-il une parathyroïde, un ganglion ou du thymus ? le critère est morphologique" },
  { k:"pasAmylase",  l:"PAS ± digestion amylasique, fer colloïdal",
    q:"surcharge en amylopectine (glycogénose IV) sur les fibres striées de bordure ?" },
  { k:"rougeSirius", l:"Rouge sirius SUR LE FOIE, pas sur la thyroïde",
    q:"la fibrose disséquante de l'hémochromatose périnatale est-elle là ?" },
  { k:"fish",        l:"Caryotype + FISH (pas d'IHC)",
    q:"délétion 22q11 ? le caryotype standard ne la voit pas" },
  { k:"blocSerie",   l:"Bloc cervical sérié en coupes transversales",
    q:"la parathyroïde est-elle absente, ou seulement pas encore sur la lame ?" }
];
/* ── 09 · Propositions techniques ─────────────────────────────────────────── */
function suggerer(){
  var s = {};
  /* v2 : « anormal » se lit présent — le nom de la fonction est gardé de la v1 */
  function anormal(k){ return E.signes[k] === POS; }
  function ret(k){ return E.retention[k] === "present"; }
  var sa = num("sa");

  if (anormal("pigmentBrun")) s.perls = 1;
  if (anormal("perlsPositif")) s.rougeSirius = 1;
  if (anormal("inclusionsCMV") || anormal("cellulesGeantesNecrosees") || anormal("inflammation"))
    s.ihcCmv = 1;
  if (anormal("muscleStrieIntrathy") || anormal("surchargePAS")) s.pasAmylase = 1;
  if (anormal("paraAbsentePetite") || anormal("thymusAbsentHypo") ||
      anormal("malfCardiaqueConotroncale")) s.fish = 1;
  if (anormal("nodulePasIdentifiable")) s.hesSeule = 1;
  if (anormal("masse") || anormal("contingentsMultiples")){ s.hesSeule = 1; s.calcitonine = 1; }
  if (anormal("hyperplasieNodulaire") || anormal("pleomorphismeNucleaire")) s.calcitonine = 1;

  /* Le nid de cellules solides est une variante normale : c'est justement pour
     ça qu'on le prouve, plutôt que de le décrire comme un amas suspect. */
  if (E.variantes.nidsSolides) s.p63 = 1;
  if (E.variantes.cellulesC) s.calcitonine = 1;

  /* L'échantillonnage est ici une technique à part entière, et souvent LA
     technique qui tranche. */
  if ((E.mesure.opt === "aucune" || anormal("aucuneParaVue") || anormal("paraAbsentePetite") ||
       anormal("tissuAbsent")) && !E.prelev.blocSerie) s.blocSerie = 1;
  if (anormal("coupeTangentielle") || anormal("blocNonSerie")) s.blocSerie = 1;
  if (sa != null && sa < 22 && anormal("nappePleine") && !E.prelev.transversale) s.blocSerie = 1;

  /* Sur tissu lysé, l'IHC ne conclura pas : c'est le prélèvement qu'il faut
     reprendre, pas la coloration. */
  if (ret("ihcNegLysee") || ret("geantesNecrosees")) s.ihcCmv = 1;
  /* v1 : négatif fer coché EN DÉFAUT → Perls. v2 : il se déduit (pigment brun sans Perls). */
  if (etatNegatif(par(NEGATIFS, "perls")) === "ko") s.perls = 1;
  return s;
}

/* ── Banc propre à l'organe ───────────────────────────────────────────────── */
async function testsOrgane(chk, clic, set, crTient, pause){
  /* Le banc commun laisse des signes posés : on part d'un état voulu. */
  function pose(k, v){ if (E.signes[k] !== v) clic("les", k, v); }
  function ote(k){ if (E.signes[k]) clic("les", k, E.signes[k]); }
  /* aucuneParaVue est déduit (pas de bouton) : on l'efface par le siège et le compte */
  function propre(){
    SIGNES.forEach(function(x){ if (!x.auto) ote(x.k); });
    if (E.mesure.opt) clic("mopt", E.mesure.opt);
    if (E.mesure.v.nPara != null) set("m_nPara", "");
  }
  function tenue(k){ return associations().some(function(a){ return a.d.k === k && a.tenu; }); }
  function lue(k){ return associations().some(function(a){ return a.d.k === k; }); }
  function lobe(k){ if (E.mesure.def !== k) clic("mdef", k); }
  function siege(k){ if (E.mesure.opt !== k) clic("mopt", k); }
  function sansSiege(){ if (E.mesure.opt) clic("mopt", E.mesure.opt); }
  /* v2 : la rétention datable se choisit dans une liste, plus par bouton */
  function retSel(k){ var s = $("retNiveau"); s.value = k; s.dispatchEvent(new Event("change", {bubbles:true})); }
  function neg(k){ return etatNegatif(par(NEGATIFS, k)); }
  function cadre(g){ return groupes().indexOf(g); }

  /* La thyroïde n'a pas de côté prélevé : elle a un lobe, et il vit en Maturation. */
  chk("aucune latéralité de coquille sur cet organe", PAIR === false);
  chk("le lobe est porté par l'axe catégoriel",
      LOBES.some(function(x){ return x.k === "lobeDroit"; }) &&
      LOBES.some(function(x){ return x.k === "lobeGauche"; }));
  propre();
  set("sa", "24");

  /* L'organe n'est dans aucune horloge : cela doit se lire, pas se deviner. */
  chk("thyroïde absente des tables de macération", HORS_HORLOGE.indexOf("zéro occurrence") >= 0);
  chk("aucun rang de rétention ne donne d'heure",
      RETENTION.every(function(r){ return !/\d\s*h\b/.test(r.b); }));
  chk("le seul rang « bon » ne date rien",
      par(RETENTION, "temoinInterne").q === "bon" &&
      par(RETENTION, "temoinInterne").b.indexOf("non datable") >= 0);
  chk("la divergence de basophilie est portée, pas tranchée",
      par(RETENTION, "basoThyroide").note.indexOf("NON tranchée") >= 0);
  chk("v2 : liste de rétention, le témoin avant les deux glandes effondrées",
      retDatables()[0].k === "temoinInterne" && retDatables()[1].k === "deuxEffondrees");

  /* Le témoin parathyroïdien : c'est LUI qui bloque la datation. */
  retSel("temoinInterne");
  chk("le témoin interne se lit dans le CR", crTient("témoin interne des deux glandes"));
  lobe("lobeDroit");
  clic("stade", "folliculaireCellulaire");
  chk("stade coché sur glande effondrée : bloqué", verdictMesure().cls === "bad");
  chk("la formule de non-évaluabilité est donnée",
      verdictMesure().txt.indexOf("maturation thyroïdienne non évaluable") >= 0);
  clic("stade", "folliculaireCellulaire");
  chk("stade retiré : plus de blocage de ce chef", verdictMesure().cls !== "bad");
  retSel("");

  /* Une parathyroïde absente d'un bloc non sérié n'est pas une donnée. */
  siege("aucune");
  chk("absence non recevable sans sériation", verdictMesure().cls === "bad");
  clic("prelev", "blocSerie");
  chk("sur bloc sérié, le constat devient recevable", verdictMesure().cls !== "bad");
  chk("et il s'écrit sans se conclure", verdictMesure().txt.indexOf("il ne se conclut pas") >= 0);
  clic("prelev", "blocSerie");
  chk("le bloc sérié est proposé, pas prescrit", suggerer().blocSerie === 1);
  siege("retro");
  chk("un siège ectopique est NORMAL", verdictMesure().txt.indexOf("siège NORMAL") >= 0);

  /* Les chiffres se consignent, jamais rapportés à une norme inexistante. */
  set("m_follicule", "1");
  chk("aucun diamètre folliculaire normal publié", crTient("Ni diamètre folliculaire"));
  chk("la mesure se consigne sans s'interpréter", crTient("La mesure se consigne, elle ne s'interprète pas"));
  set("m_follicule", "");
  set("m_poids", "0.4");
  chk("le poids n'a pas de normale par SA", crTient("aucune normale pondérale"));
  chk("le faux chiffré est nommé", crTient("serait un faux chiffré"));
  set("m_poids", "");

  /* Le piège central : la même nappe se lit de trois façons, et on les affiche. */
  propre();
  pose("nappePleine", POS); pose("contrasteTemoin", POS);
  chk("l'autolyse thyroïdienne se tient sur le témoin", tenue("autolyseThyroidienne"));
  pose("deplationColloide", POS); pose("noyauxPycnotiques", POS);
  chk("la décharge périnatale s'affiche EN MÊME TEMPS", tenue("dechargePerinatale"));
  chk("les trois lectures sont portées, aucune choisie",
      par(DIAGS, "dechargePerinatale").stop.indexOf("choisir un camp") >= 0);
  pose("epitheliumHyperplasique", POS); pose("glandeVolumineuse", POS);
  chk("l'hyperthyroïdie se lit aussi sur la même image", tenue("hyperthyroidie"));
  /* Pivot : sans l'épithélium hyperplasique, deux signes ne font pas l'hyperthyroïdie */
  ote("epitheliumHyperplasique");
  chk("hyperthyroïdie sans son pivot : ne tient pas", !tenue("hyperthyroidie") &&
      crTient("signe pivot non coché : " + par(SIGNES, "epitheliumHyperplasique").l));

  /* Négatif colloïdal : recevable seulement sur une architecture lisible. */
  propre();
  pose("deplationColloide", NEG);
  chk("déplétion absente, nappe non répondue : négatif ouvert", neg("colloide") === null);
  pose("nappePleine", NEG);
  chk("déplétion ET nappe absentes : négatif énoncé", neg("colloide") === "ok");
  pose("nappePleine", POS);
  chk("négatif colloïdal sur glande en nappe : en défaut", neg("colloide") === "ko" &&
      crTient("il n'est pas lisible"));
  propre();

  /* Aucune parathyroïde vue n'est pas une aplasie : les deux lignes coexistent.
     v2 : le signe se déduit du siège déclaré. */
  siege("aucune");
  chk("v2 : siège aucune → aucune parathyroïde vue, déduit", E.signes.aucuneParaVue === POS &&
      !document.querySelector('[data-act="les"][data-k="aucuneParaVue"]'));
  chk("un seul signe ne tient pas la fausse aplasie",
      !tenue("fausseAplasiePara") && lue("fausseAplasiePara"));
  chk("ni l'hypoplasie parathyroïdienne, sans son pivot sur bloc sérié",
      !tenue("hypoplasiePara") && lue("hypoplasiePara"));
  pose("blocNonSerie", POS);
  chk("bloc non sérié : absence de preuve, pas preuve d'absence", tenue("fausseAplasiePara"));
  chk("la glande est peut-être ailleurs",
      par(DIAGS, "fausseAplasiePara").stop.indexOf("elle est ailleurs") >= 0);
  chk("22q11 ne se lit PAS sur ce faisceau", !tenue("digeorge"));
  propre();
  pose("paraAbsentePetite", POS);
  chk("v2 : l'hypoplasie parathyroïdienne se lit sur son pivot", tenue("hypoplasiePara") &&
      par(DIAGS, "hypoplasiePara").stop.indexOf("Kenny-Caffey") >= 0);
  pose("thymusAbsentHypo", POS);
  chk("parathyroïde + thymus tiennent le faisceau 22q11", tenue("digeorge"));
  chk("le cœur d'abord, et la FISH", par(DIAGS, "digeorge").stop.indexOf("FISH") >= 0);
  chk("« DiGeorge » ne s'écrit pas en micro",
      par(DIAGS, "digeorge").stop.indexOf("Ne pas écrire") >= 0);
  chk("la FISH est proposée", suggerer().fish === 1);

  /* Parathyroïdes, Non en bloc : aucuneParaVue (déduit) n'est pas répondu par le
     Non, et le siège énonce le négatif. */
  propre();
  var iP = cadre("Parathyroïdes");
  delete E.groupes["Parathyroïdes"]; clic("grp", iP, "non");
  chk("v2 : Non sur les parathyroïdes ne dit pas qu'une parathyroïde a été vue",
      !E.signes.aucuneParaVue && E.signes.paraHypertrophiee === NEG && etatGroupe("Parathyroïdes") === "non");
  clic("grp", iP, "non");
  sansSiege();
  set("m_nPara", "2");
  chk("v2 : deux parathyroïdes comptées → aucune parathyroïde vue, absent", E.signes.aucuneParaVue === NEG);
  chk("parathyroïdes comptées sans siège : négatif en défaut", neg("siegePara") === "ko");
  siege("retro");
  chk("siège déclaré : négatif énoncé", neg("siegePara") === "ok");
  propre();

  /* Le pigment brun n'a pas d'alternative bénigne ici. */
  pose("pigmentBrun", POS);
  chk("Perls proposé dès le pigment brun", suggerer().perls === 1);
  chk("v2 : pigment brun sans Perls, négatif fer en défaut", neg("perls") === "ko");
  chk("le fer ne tient pas sans le Perls", !tenue("surchargeFer") && lue("surchargeFer"));
  pose("perlsPositif", POS);
  chk("Perls positif tient la surcharge", tenue("surchargeFer"));
  chk("la conclusion reste au foie",
      par(DIAGS, "surchargeFer").stop.indexOf("hémochromatose périnatale") >= 0);
  propre();

  /* Pigment et fer, Non en bloc : le pigment est répondu, le Perls attend sa coloration. */
  var iF = cadre("Pigment et fer");
  delete E.groupes["Pigment et fer"]; clic("grp", iF, "non");
  chk("v2 : Non en bloc énonce l'absence de pigment brun", neg("pigmentBrun") === "ok");
  chk("v2 : Non en bloc ne répond pas le Perls", !E.signes.perlsPositif && neg("perls") === null);
  clic("les", "perlsPositif", NEG);
  chk("v2 : Perls répondu négatif, seul : négatif fer énoncé", neg("perls") === "ok" &&
      crTient("· Absence de surcharge en fer"));
  clic("les", "perlsPositif", NEG);
  clic("grp", iF, "non");

  /* Négatifs calculés sur une donnée consignée */
  clic("var", "pasOxyphiles");
  chk("v2 : variante sans oxyphile cochée, négatif énoncé", neg("oxyphiles") === "ok");
  clic("var", "pasOxyphiles");
  chk("v2 : variante décochée, négatif ouvert", neg("oxyphiles") === null);
  pose("tissuEctopique", NEG);
  chk("v2 : ectopie absente SANS bloc de base de langue : ne vaut rien", neg("ectopie") === null);
  clic("prelev", "baseLangue");
  chk("v2 : avec les blocs de base de langue, le négatif s'énonce", neg("ectopie") === "ok");
  clic("prelev", "baseLangue");
  ote("tissuEctopique");
  clic("ret", "basoThyroide", "absent");
  chk("v2 : basophilie répondue, négatif énoncé", neg("basophilie") === "ok");
  clic("ret", "basoThyroide", "absent");

  /* Le muscle strié de bordure est une aubaine, pas un contaminant. */
  propre();
  pose("muscleStrieIntrathy", POS); pose("surchargePAS", POS);
  chk("le muscle strié se lit comme lobe pyramidal", tenue("muscleStrieVu"));
  chk("PAS + amylase proposé", suggerer().pasAmylase === 1);
  chk("la piste myopathie reste non tranchée",
      par(SIGNES, "muscleStrieIntrathy").meta.indexOf("non tranché") >= 0);

  /* Le plan de coupe fabrique de la maturité. */
  propre();
  pose("coupeTangentielle", POS); pose("folliculesGros", POS);
  chk("le stade surestimé se lit", tenue("stadeSurestime"));
  chk("le gradient est centrifuge", AVANCE_NOTE.indexOf("center to periphery") >= 0);

  /* Goitre endémique : v2, le pivot est le terme FOETO composite. */
  propre();
  pose("folliculesGros", POS); pose("glandeVolumineuse", POS);
  chk("v2 : gros follicules sans colloïde augmentée ne font pas le goitre endémique", !tenue("goitreEndemique"));
  pose("colloideAugmentee", POS);
  chk("v2 : goitre endémique tenu sur colloideAugmentee", tenue("goitreEndemique"));
  propre();

  /* L'image du corpus reste sans étiquette. */
  chk("aucun livre ne décrit les follicules réticulés",
      par(DIAGS, "folliculesReticules").stop.indexOf("Aucun des trois livres") >= 0);
  chk("le pléomorphisme fœtal n'est pas un critère de malignité",
      par(SIGNES, "pleomorphismeNucleaire").meta.indexOf("PAS un critère de malignité") >= 0);
  chk("le circulatoire n'est pas tranché contre le fœticide",
      par(DIAGS, "circulatoire").stop.indexOf("ne le tranche pas") >= 0);

  /* Le rang néonatal n'a pas été forcé dans une échelle en SA. */
  chk("cinq rangs seulement dans l'échelle SA", STADES.length === 5);
  chk("le rang néonatal vit en variante",
      VARIANTES.some(function(v){ return v.k === "neonatalPostTsh"; }));
  chk("aucun stade thyroïdien n'est rendu par le service",
      STADE_TITRE.indexOf("que personne ne pratique") >= 0);

  /* Rien n'a été comblé là où la fiche s'arrête. */
  chk("aucune thyroïdite de Hashimoto inventée",
      [SIGNES, DIAGS].every(function(t){
        return t.every(function(x){ return JSON.stringify(x).toLowerCase().indexOf("hashimoto") < 0; }); }));
  chk("aucun grade thyroïdien inventé",
      SIGNES.concat(DIAGS).every(function(x){ return !/grade/i.test(x.l); }));
  chk("aucune norme pondérale par SA inventée",
      MESURE.champs.every(function(c){ return !/normal|norme/i.test(c.label); }));

  /* Branchement FOETO */
  chk("v2 : libellé venu de FOETO", par(SIGNES, "inclusionsCMV").l === "Inclusions virales à CMV dans la thyroïde");
  chk("v2 : code FOETO du terme verbatim", codesDe(par(SIGNES, "pigmentBrun"))[0] === "FOETO:PF.END-NOR-023");
  chk("v2 : HPO arbitré venu de la base", par(SIGNES, "thymusAbsentHypo").hpo === "HP:0010515");
  chk("v2 : terme maladie sur l'association", par(DIAGS, "digeorge").foeto[0] === "FOETO:PF.END-MAL-125" &&
      par(DIAGS, "hypoplasiePara").foeto[0] === "FOETO:PF.END-MAL-132");
  chk("v2 : constat de fiche sans terme non marqué hors fiche",
      !par(SIGNES, "contrasteTemoin").horsFiche && !par(SIGNES, "folliculesKystiquesRetic").horsFiche);
  chk("v2 : signe sans source dans la fiche marqué hors fiche", par(SIGNES, "contingentsMultiples").horsFiche === true);
  chk("v2 : blocs lus en §02", BLOCS_LUS && !$("blocsBloc").hidden);

  propre();
  lobe("deuxLobes");
  set("sa", "24");
}
