/* Grille de lecture — surrénales fœtales.
   Fond : ~/Bureau/fiches_lecture/fiche_surrenales.md (§1 à §9).
   Forme : gen_grille.py, calquée sur grille_poumon.html.
   Les divergences entre sources sont PORTÉES dans les champs, jamais arbitrées.

   Deux inversions propres à cet organe, et elles commandent tout le fragment :
   1. la maturation tombe AVANT la datation — le cortex définitif perd sa
      cohésion dès moins de deux jours, alors que la basophilie tient jusqu'au
      rang 9 sur 10 de la Table 15.6. La glande est donc longtemps DATANTE ET
      NON MESURABLE. C'est l'inverse du poumon ;
   2. l'axe de maturation n'est pas une séquence de stades nommés mais un
      RAPPORT entre deux cortex — et aucune source ouverte ne le donne par
      semaine. Le champ existe, la norme par terme n'existe pas. */

var ORGANE  = "surrenales";
var TITRE   = "surrénales fœtales";
var SOURCE  = "fiche_surrenales.md";
var MODULE  = "grille_surrenales";
var VERSION = "1.0.0";

/* La fiche latéralise : « droite et gauche sur des blocs séparés », parce que
   l'hémorragie est « often unilateral » et que la galette d'agénésie rénale
   peut l'être aussi. */
var PAIR = true;

var TITRE_CR    = "SURRÉNALES";
var STADE_TITRE = "Fenêtres en SA — ordre chronologique strict, aucune source n'énonce de stades nommés";

var KCL_TXT = "Fœticide par KCl déclaré. La surrénale est un organe abdominal rétropéritonéal, donc " +
              "exposée : « KCl solutions used for intracardiac injection to induce fetal demise are " +
              "extremely hypertonic, and the effects on fetal tissues mimic maceration changes », et " +
              "« other sites commonly affected include the abdomen, liver, and pleural spaces or lung » " +
              "avec pour résultat une « accelerated tissue destruction » [ernst, ch. 37]. Aucune borne " +
              "de rétention n'est recevable, et l'hémorragie centrale de cette glande devient d'abord " +
              "un geste : le corpus l'écrit ainsi — « on note une importante hémorragie récente de la " +
              "médullaire de l'une des surrénales liée au foeticide » [corpus CR].";

/* Le retard porte sur le cortex fœtal, et il se PÈSE avant de se voir. */
var RETARD_NOTE = "Sur cet organe, un retard est d'abord un cortex fœtal réduit — et trois choses le " +
                  "miment : la lyse (« Hypoplasie surrénalienne (secondaire à la lyse ?) » [corpus CR]), " +
                  "le plan de coupe, et le poids non fait. La vraie hypoplasie se pèse : 137 phrases " +
                  "macro du corpus portent un percentile ou un écart-type, aucune ne mesure le rapport " +
                  "CF/CP [corpus CR]. Et la borne d'entrée du signe anencéphalique est tardive : " +
                  "l'hypoplasie « n'apparaît qu'au-delà de 16 SA » [soffoet, ch. 8].";

/* L'avance a deux formes, et la seconde n'est pas arbitrée par les livres. */
var AVANCE_NOTE = "Deux avances possibles, à ne pas confondre. (a) La médullaire peut être en avance " +
                  "quand le cortex est en retard : « Paradoxalement la médullosurrénale paraît un peu " +
                  "plus mature pour l'âge, avec des phéochromocytes bien visibles » [soffoet, ch. 8] — " +
                  "c'est pourquoi l'axe médullaire est coté séparément. (b) La zonation du cortex " +
                  "définitif est en DIVERGENCE FRONTALE et non tranchée : « near term, the beginnings " +
                  "of this zonation may be seen » [ernst, ch. 20] contre « Differentiation of the DZ " +
                  "into the zona glomerulosa and zona fasciculata occurs between the second and fourth " +
                  "week of postnatal life » [keeling, ch. 26]. Une glomérulée en amas à 40 SA est donc " +
                  "soit normale, soit précoce : ne pas la coder comme critère de maturation (§ 9-1).";

var TECH_NOTE = "Les pointillés sont des propositions déduites des clics, jamais des prescriptions. " +
                "Deux réserves de méthode : les clones et dilutions de CD31, MIB-1, caspase-3, Bcl-2, " +
                "GFAP, CD56 et adipophiline ne sont donnés par aucune source ouverte, ils restent à " +
                "renseigner par le service ; et le Perls sur la surrénale est proposé par DÉDUCTION — " +
                "le corpus ne l'emploie jamais sur cet organe et aucun livre ne le mentionne pour lui.";

/* ── 01 · Prélèvement ─────────────────────────────────────────────────────── */
var PRELEV = [
  { k:"veineCentrale", l:"Coupe transversale passant par la veine centrale", grave:true,
    manque:"c'est le seul plan qui montre en même temps les deux cortex et la médullaire ; sans lui, " +
           "l'absence d'amas neuroblastiques est un artefact de plan et non un constat" },
  { k:"deuxCortex", l:"Les deux cortex sur la même coupe", grave:true,
    manque:"une coupe à un seul cortex interdit le rapport CF/CP, qui EST l'axe de maturation de " +
           "l'organe" },
  { k:"deuxBlocs", l:"Droite et gauche sur des blocs séparés", grave:true,
    manque:"l'hémorragie surrénalienne est « often unilateral » [keeling, ch. 26] et la galette " +
           "d'agénésie rénale peut l'être — sans latéralité, l'asymétrie n'est pas nommable" },
  { k:"medullaire", l:"Médullaire et amas neuroblastiques centraux sur la coupe",
    manque:"les nodules sont centraux en fin de gestation : une coupe périphérique ne les montre pas" },
  { k:"reinHomolateral", l:"Rein homolatéral sur le bloc composite",
    manque:"la surrénale est presque toujours listée avec le rein dans le corpus, et la galette se lit " +
           "avec l'agénésie rénale, pas sans elle" },
  { k:"pesee", l:"Surrénales pesées, percentile ou écart-type rapporté", grave:true,
    manque:"la maturation surrénalienne est pesée en macro, pas mesurée en micro — 137 des 318 phrases " +
           "macro portent un percentile ou un écart-type [corpus CR]" },
  { k:"masseCorporelle", l:"Poids rapporté à la masse corporelle",
    manque:"le second chiffre peut normaliser ce que le premier signale — le corpus écrit les deux" },
  { k:"congele", l:"Fragment congelé pour la question lipidique",
    manque:"sans coupe congelée, Oil Red O et Noir Soudan sont fermés d'avance, donc la gradation " +
           "I/II/III de la surcharge et la distinction mort aiguë / mort chronique aussi" },
  { k:"foeticide", l:"Geste de fœticide et délai fœticide-extraction tracés",
    manque:"le fœticide n'est mentionné que dans 3 CR sur 200, alors qu'il modifie la lecture de la " +
           "macération [corpus CR]" },
  { k:"snc", l:"Examen du SNC disponible",
    manque:"l'hypoplasie secondaire et les formes idiopathiques ne se séparent que sur le SNC" }
];

/* ── 02 · Rétention ───────────────────────────────────────────────────────────
   La surrénale est l'un des quatre organes de datation d'[ernst, ch. 37] :
   « the myocardium, the liver, the adrenal gland ». Elle est au rang 9 sur 10
   de la Table 15.6 [keeling, ch. 15], juste avant le rein.
   ⚠️ La colonne des délais horaires de cette table est PERDUE à l'extraction et
   la Table 37.1 ne laisse que des lignes orphelines. Aucune heure n'est donc
   attribuable à la surrénale par les livres : la seule valeur défendable est un
   PLANCHER ≥ 1 semaine, par monotonie du rang. Toute autre valeur serait une
   interpolation, et ce fragment n'en porte aucune. */
var MODIF = "modificateurs de l'horloge : « accelerated by fetal hydrops and delivery-autopsy interval " +
            "of >24 h, and decelerated by fetal gestational age <25/40 » [keeling, ch. 15]";

var PAS_HEURE = "aucune heure n'est attribuable à la surrénale : la colonne des délais de la Table 15.6 " +
                "est perdue à l'extraction et le rang seul est conservé. Le plancher ≥ 1 semaine vient " +
                "de la MONOTONIE du rang (le cartilage trachéal, rang antérieur, est coté ≥ 1 semaine " +
                "dans la Table 37.1 d'[ernst, ch. 37]) — interpoler une heure entre deux tables serait " +
                "une fabrication";

var RETENTION = [
  { k:"perteComplete", l:"Perte complète de la basophilie nucléaire surrénalienne",
    b:"≥ 1 semaine", d:"borne BASSE — rang 9 sur 10 atteint", h:168, q:"bon",
    note:PAS_HEURE + " ; le service mesure la même charnière et ne descend jamais en dessous — " +
         "« Macération estimée à plus de une semaine par perte complète de la basophilie nucléaire " +
         "surrénalienne » [corpus CR]",
    alerte:MODIF },
  { k:"basoCFPersistante", l:"Basophilie nucléaire persistante dans le cortex fœtal",
    b:"< 1 semaine", d:"borne HAUTE — rang 9 non atteint, rangs 1 à 8 déjà tombés", h:120, q:"bon",
    note:"c'est l'autre moitié de l'encadrement : le corpus écrit systématiquement deux bornes et " +
         "jamais un point — « Examen limité par la macération évaluée à entre 72h et une semaine par " +
         "persistance d'une basophilie nucléaire du cortex fœtal surrénalien et du tractus digestif » " +
         "[corpus CR]",
    alerte:MODIF },
  { k:"murAlveolaire", l:"Surrénale ayant tout perdu, basophilie persistant dans les murs alvéolaires",
    b:"encadrée par le haut", d:"le poumon perd après la surrénale", h:169, q:"moyen",
    note:"partenaire d'encadrement, pas une borne propre : la surrénale donne l'une des deux bornes, " +
         "l'autre organe donne la seconde. Les partenaires les plus fréquents du corpus sont le tube " +
         "digestif, le cartilage trachéal et les murs alvéolaires [corpus CR]" },
  { k:"cohesionCP", l:"Perte de cohésion et d'architecture du cortex définitif, noyaux encore détaillés",
    b:"≲ 2 jours", d:"le PREMIER axe qui tombe — et il emporte la maturation", h:48, q:"moyen",
    note:"légende de figure, pas ligne de table : « loss of tissue integrity and architecture in the " +
         "definitive cortex » sur un fœtus dont la mort est estimée « less than 2 days » avant la " +
         "délivrance [ernst, ch. 37]. Conséquence : à ce stade la cytologie est encore lisible et le " +
         "rapport CF/CP ne l'est déjà plus — la glande est DATANTE MAIS NON MESURABLE" },
  { k:"mulberry", l:"Masses basophiles sphérulaires intravasculaires (aspect en mûre)",
    b:"≈ 2–3 jours", d:"« usually apparent at 2–3 days after intrauterine death »", h:60, q:"moyen",
    note:"artefact de coloration des hématies, « basophilic masses apparently comprising multiple small " +
         "spherules, which are seen in fetal blood vessels » [keeling, ch. 15] — et collision de " +
         "vocabulaire : la calcification en mûre du syndrome néphrotique finlandais porte le même mot" },
  { k:"debrisGranuleux", l:"Débris granuleux péri-surrénaliens", b:"—",
    d:"artefact qui mime une colonisation bactérienne", h:0, q:"mauvais",
    note:"« Degeneration of soft tissues results in granular debris which may be mistaken for bacterial " +
         "colonisation » [keeling, ch. 15] ; le discriminant est « evidence of an inflammatory response " +
         "or focus of infection », la vraie bactériémie étant « very dense and predominantly limited to " +
         "vessels ». Doublement piégeux ici : la surrénale est la cible élective de la listériose" },
  { k:"vacuolesFantomes", l:"Vacuoles claires dans des fantômes cellulaires dépourvus de tout noyau",
    b:"—", d:"lyse avancée — ce n'est PAS une stéatose", h:0, q:"mauvais",
    note:"« La surrénale a perdu toute sa basophilie nucléaire, on note de fréquentes et nombreuses " +
         "vacuoles claires dans le cytoplasme des fantômes cellulaires » [corpus CR] : chercher les " +
         "noyaux — la stéatose vraie en a" },
  { k:"cerveauRefoule", l:"Masse à petites cellules dans le rétropéritoine", b:"—",
    d:"cerveau liquéfié refoulé — ne date rien", h:0, q:"mauvais",
    note:"« should not be confused with a neuroblastic tumor in the retroperitoneum » [ernst, ch. 37] — " +
         "se tranche en GFAP / CD56, pas à l'œil" },
  { k:"petiteEtLysee", l:"Glande petite ET lysée", b:"—", d:"ambigu : hypoplasie OU lyse", h:0, q:"mauvais",
    note:"le corpus écrit le doute plutôt que la conclusion — « Hypoplasie surrénalienne (secondaire à " +
         "la lyse ?) » [corpus CR]. Peser avant de conclure" },
  { k:"nonAnalysable", l:"Surrénales non analysables — problème technique", b:"—",
    d:"recevabilité, pas rétention", h:0, q:"mauvais",
    note:"« Les reins et surrénales n'ont pas pu être analysés du fait d'un problème technique » " +
         "[corpus CR] — l'écrire, ne pas laisser vide" }
];

/* ── 03 · Maturation — fenêtres en SA ─────────────────────────────────────────
   SA = semaines de gestation + 2. Les trois livres anglophones comptent en
   gestation ; chaque intervalle converti est marqué ⟨conv⟩. Aucune des sources
   n'énonce de STADES : ce qui suit est l'ordre chronologique strict du § 3.b,
   découpé en fenêtres. Ce sont des repères, pas des seuils. */
var STADES = [
  { k:"ebaucheCoelomique", max:9,
    l:"≈ 6–7 SA · ébauche cœlomique — deux vagues mésothéliales, cortex fœtal puis cortex définitif",
    note:"les cellules corticales fœtales sont d'emblée de « large, polygonal cells with abundant " +
         "eosinophilic cytoplasm », la seconde vague donnant des cellules « generally smaller and less " +
         "eosinophilic » [ernst, ch. 20] [keeling, ch. 26]" },
  { k:"steroidogeneseCF", max:16,
    l:"≈ 9–15 SA · stéroïdogenèse du cortex fœtal, médullaire peuplée, premiers nodules neuroblastiques",
    note:"« the FZ… shows evidence of steroidogenic activity from the seventh week » et « By 7 weeks, " +
         "cells from the neural crest (phaeochromoblasts) migrate into the center of the early cortex " +
         "to form the medulla » [keeling, ch. 26] = ≈ 9 SA ⟨conv⟩" },
  { k:"nodulesConstants", max:19,
    l:"≈ 16–18 SA · nodules neuroblastiques chez TOUS les fœtus, entrée de la dépendance à l'axe hypothalamo-hypophysaire",
    note:"« They appear from around 7 weeks gestation, increasing in size and number until they are " +
         "identifiable in all fetuses by 14–18 weeks » = ≈ 16–20 SA ⟨conv⟩ [keeling, ch. 26]. C'est " +
         "aussi la date d'entrée du signe anencéphalique : « An intact hypothalamic/pituitary/adrenal " +
         "axis is necessary for FZ maintenance after about 16 weeks' gestation » = ≈ 18 SA ⟨conv⟩, " +
         "confirmé nativement en SA — l'hypoplasie « n'apparaît qu'au-delà de 16 SA » [soffoet, ch. 8]" },
  { k:"picNodulaire", max:27,
    l:"≈ 19–26 SA · pic de taille des nodules, neuroblastes superficiels qui se raréfient",
    note:"« [size] peaks between 17 and 20 weeks » = ≈ 19–22 SA ⟨conv⟩, puis décroît ; « Superficial " +
         "neuroblasts are rare after 20 weeks of gestation, but deep groups are seen throughout " +
         "gestation » [ernst, ch. 20]. ⚠️ l'échelle de ces deux valeurs n'est pas énoncée par la " +
         "source : la conversion suppose des semaines de gestation (§ 9-12)" },
  { k:"cpFonctionnel", max:36,
    l:"≈ 27–35 SA · le cortex définitif s'épaissit et entre en stéroïdogenèse, la zone transitionnelle se différencie",
    note:"« From about the 25th week of gestation, the DZ thickens and begins steroidogenesis » = " +
         "≈ 27 SA ⟨conv⟩ ; la zone transitionnelle était « functionally identical [to the FZ] until " +
         "about 25–30 weeks » = ≈ 27–32 SA ⟨conv⟩ avant de produire le cortisol de fin de grossesse " +
         "[keeling, ch. 26]" },
  { k:"procheTerme", max:99,
    l:"≳ 36 SA · nodules migrés au centre, maturation chromaffine, cortex fœtal à ≈ 80 % du volume cortical",
    note:"« Later in gestation, the neuroblastic nodules are present in the center of the gland, " +
         "surrounding central veins of the medulla » et « medullary cells appear less neuroblastic and " +
         "take on a more chromaffin-like appearance » [ernst, ch. 20]. L'involution du cortex fœtal est " +
         "POST-NATALE : elle n'entre pas dans une échelle en SA" }
];

/* ── 03 bis · Lisibilité du rapport CF/CP, axe médullaire, chiffres consignés ──
   Les deux axes catégoriels de cet organe ne sont pas des barèmes. Le premier
   BLOQUE : sans les deux cortex sur une coupe passant par la veine centrale,
   aucun stade coché ne veut dire quoi que ce soit. Le second existe parce
   qu'une seule case « maturation surrénalienne » est structurellement fausse —
   la médullaire peut être en avance quand le cortex est en retard (§ 8.d-5). */
var LISIBILITE = [
  { k:"deuxCortex",    l:"Les deux cortex identifiables, veine centrale sur la coupe" },
  { k:"unSeulCortex",  l:"Un seul cortex sur la coupe — plan tangentiel" },
  { k:"cpDesorganise", l:"Cortex définitif désorganisé, noyaux encore détaillés" },
  { k:"fantomes",      l:"Fantômes cellulaires — glande lysée" },
  { k:"nonExaminee",   l:"Surrénale non prélevée ou non examinée" }
];

var MEDULLAIRE = [
  { k:"medConforme", l:"Médullaire conforme au terme" },
  { k:"medAvance",   l:"Médullaire en AVANCE — phéochromocytes bien visibles" },
  { k:"medRetard",   l:"Médullaire en retard — amas neuroblastiques restés centraux, pas de cortex fœtal" },
  { k:"medNonLue",   l:"Médullaire non lue — veine centrale hors coupe" }
];

var MESURE = {
  titre:"Lisibilité du rapport CF/CP, axe médullaire, chiffres consignés",
  defLabel:"lisibilité du rapport CF/CP — à déclarer AVANT tout stade",
  optLabel:"axe médullaire, coté SÉPARÉMENT de l'axe cortical",
  defs:LISIBILITE, opts:MEDULLAIRE,
  champs:[{ id:"cf",     label:"Part du cortex fœtal (%)",                min:0, max:100, step:1 },
          { id:"cp",     label:"Épaisseur du cortex définitif (cellules)", min:0, max:100, step:1 },
          { id:"poids",  label:"Poids combiné des surrénales (g)",        min:0, max:40,  step:0.01 },
          { id:"nodule", label:"Plus grand nodule neuroblastique (mm)",   min:0, max:50,  step:0.1 }]
};

function verdictMesure(){
  var lis = E.mesure.def, med = E.mesure.opt, sa = num("sa");
  var pcf = E.mesure.v.cf, ncp = E.mesure.v.cp, pds = E.mesure.v.poids, nod = E.mesure.v.nodule;
  if (!lis && !med && pcf == null && ncp == null && pds == null && nod == null && !E.stade)
    return { cls:"", txt:"Ni lisibilité du rapport CF/CP, ni axe médullaire, ni chiffre — la glande " +
                         "n'est pas encore lue." };

  var t = [], cls = "ok", res = [];

  /* 1 — Le blocage. Le rapport entre les deux cortex EST l'axe de maturation. */
  if (!lis){
    cls = "bad";
    t.push("Lisibilité du rapport CF/CP NON déclarée : c'est l'axe de maturation de cet organe et il ne " +
           "se présume pas. Le rapport se lit sur une coupe passant par la veine centrale, entre un " +
           "cortex définitif « recognizable by its basophilic appearance », « thin (10–20 cells thick) », " +
           "et un cortex fœtal fait de « large, polygonal cells with abundant eosinophilic cytoplasm » " +
           "[ernst, ch. 20]. Tant que ce champ est vide, un stade coché n'est pas une lecture.");
  } else if (lis === "nonExaminee"){
    cls = "bad";
    t.push("Surrénale non prélevée ou non examinée : l'écrire fait la différence entre une omission et " +
           "une normalité — « Les reins et surrénales n'ont pas pu être analysés du fait d'un problème " +
           "technique » [corpus CR].");
  } else if (lis === "unSeulCortex"){
    cls = "bad";
    t.push("Un seul cortex sur la coupe : ce n'est PAS une agénésie corticale, c'est un plan de coupe " +
           "tangentiel. Le repère de bon plan est la veine centrale. Le rapport CF/CP est " +
           "INDÉTERMINABLE — dire pourquoi, ne pas laisser le champ vide.");
  } else if (lis === "cpDesorganise" || lis === "fantomes"){
    cls = "bad";
    t.push("Glande DATANTE MAIS NON MESURABLE : sur cet organe le cortex définitif perd sa cohésion " +
           "AVANT que les noyaux ne perdent leur basophilie — « loss of tissue integrity and " +
           "architecture in the definitive cortex » sur un fœtus mort « less than 2 days » avant la " +
           "délivrance [ernst, ch. 37]. Le rapport CF/CP est donc perdu alors que la datation tient " +
           "encore jusqu'au rang 9. Écrire la borne de rétention, pas un rapport.");
    if (lis === "fantomes")
      t.push("Sur des fantômes cellulaires, une petite glande n'est pas une hypoplasie et des vacuoles " +
             "ne sont pas une stéatose : le corpus écrit le doute — « Hypoplasie surrénalienne " +
             "(secondaire à la lyse ?) » [corpus CR].");
  } else {
    t.push("Les deux cortex identifiables sur une coupe passant par la veine centrale : le rapport " +
           "CF/CP est mesurable.");
  }
  if (lis && lis !== "deuxCortex" && E.stade)
    t.push("Un stade est pourtant coché : il se lit alors sur une glande dont l'axe de maturation " +
           "n'est plus rendu. Le retirer, ou écrire à côté pourquoi il est maintenu.");

  /* 2 — L'axe médullaire, coté séparément : c'est le point du § 8.d-5. */
  if (!med){
    res.push("axe médullaire non coté — une seule case « maturation surrénalienne » est " +
             "structurellement fausse : la glande peut être en retard sur un axe et en avance sur " +
             "l'autre");
  } else if (med === "medAvance"){
    if (cls === "ok") cls = "warn";
    t.push("Médullaire en avance sur le cortex : « Paradoxalement la médullosurrénale paraît un peu " +
           "plus mature pour l'âge, avec des phéochromocytes bien visibles » [soffoet, ch. 8] — décrit " +
           "dans l'anencéphalie. Deux termes histologiques estimés, l'un cortical l'autre médullaire, " +
           "et ils peuvent différer.");
  } else if (med === "medRetard"){
    if (cls === "ok") cls = "warn";
    t.push("Médullaire en retard : « Les surrénales présentent un défaut de migration des ilôts " +
           "neuroblastiques qui restent centraux résultant en une absence de formation de cortex " +
           "foetal (observé dans les anencéphalies) » [corpus CR].");
  } else if (med === "medNonLue"){
    res.push("médullaire non lue faute de veine centrale — l'absence d'amas neuroblastiques est alors " +
             "un artefact de plan, pas un défaut de migration");
  }
  if (med && med !== "medNonLue")
    t.push("Rappel de norme : « La médullosurrénale reste peu développée pendant la vie fœtale » " +
           "[soffoet, ch. 8] — la petite taille de la médullaire EST la norme, pas un défaut.");

  /* 3 — Part du cortex fœtal. Le chiffre existe, la norme par terme n'existe pas. */
  if (pcf != null){
    t.push("Part du cortex fœtal = " + pcf + " %. Les seules valeurs sourçables sont des PLATEAUX, pas " +
           "une courbe : « le cortex fœtal (CF) qui forme les 4/5e de l'épaisseur de la glande » " +
           "[soffoet, ch. 8] et « The FZ comprises ~80 % of the entire adrenal cortex at term » " +
           "[keeling, ch. 26]. AUCUNE SOURCE OUVERTE NE DONNE CE RAPPORT PAR SEMAINE : écrire " +
           "« CF = 60 % à 24 SA » serait une invention (§ 9-9). La seule courbe chiffrée est " +
           "pathologique — « from 80 % of cortical volume to only 20 % of the cortical volume by 33 " +
           "weeks' gestation » dans l'anencéphalie, soit ≈ 35 SA ⟨conv⟩.");
    if (pcf < 50){
      if (cls === "ok") cls = "warn";
      t.push("Part du cortex fœtal sous la moitié : c'est l'ordre de grandeur de la chute " +
             "anencéphalique, mais le chiffre ne se lit qu'avec le SNC, le poids et l'état de " +
             "conservation — et l'hypoplasie « n'apparaît qu'au-delà de 16 SA » [soffoet, ch. 8].");
      if (sa != null && sa < 18)
        t.push("À " + sa + " SA, la réduction du cortex fœtal n'est PAS opposable : la dépendance à " +
               "l'axe hypothalamo-hypophysaire ne commence qu'après ≈ 18 SA ⟨conv⟩.");
    }
    if (!E.prelev.veineCentrale)
      res.push("coupe passant par la veine centrale non confirmée — le rapport n'est pas qualifié");
  }

  /* 4 — Épaisseur du cortex définitif : une borne SANS son terme. */
  if (ncp != null){
    t.push("Cortex définitif = " + ncp + " cellules d'épaisseur ; borne sourcée « thin (10–20 cells " +
           "thick) » [ernst, ch. 20] — ⚠️ SANS TERME ASSOCIÉ : on ignore si c'est une valeur de plateau " +
           "ou une valeur de terme (§ 9-12). La zone transitionnelle a « similar thickness (10–20 " +
           "cells) as the definitive zone » et ne se sépare qu'en IHC, pas en HES.");
    if (ncp > 0 && ncp < 10){ if (cls === "ok") cls = "warn";
      t.push("Sous la borne basse : un cortex permanent pratiquement absent est le versant DAX1 du " +
             "couple du § 5.5 — encore faut-il que le cortex fœtal, lui, soit développé."); }
    if (ncp > 20){ if (cls === "ok") cls = "warn";
      t.push("Au-dessus de la borne haute : un cortex permanent plus développé et invaginant est l'une " +
             "des deux descriptions de l'HCS, et elles divergent entre les livres."); }
  }

  /* 5 — Le poids : le vrai outil du service, et sa seule normale sourçable. */
  if (pds != null){
    t.push("Poids combiné = " + pds + " g. Seule normale sourçable dans les livres : « the normal " +
           "combined weight of 9 g » au terme [keeling, ch. 26]. Le référentiel réellement employé — " +
           "Mitropoulos et al., 1992 — n'est PAS dans le corpus indexé, et la Table 20.1 d'[ernst, " +
           "ch. 20], qui donnerait le poids par âge gestationnel, est absente de l'extraction " +
           "(§ 9-5, § 9-6). Un chiffre sans son normal pour le terme ne vaut rien : écrire le " +
           "percentile ou l'écart-type, et le rapport à la masse corporelle.");
    if (pds >= 15){ if (cls === "ok") cls = "warn";
      t.push("À ce poids, la famille HCS entre dans la description : « The adrenals, in all forms, are " +
             "greatly enlarged (average ~ 15 g) » [keeling, ch. 26] — une HCS se voit d'abord à la " +
             "balance et au couteau, pas au microscope."); }
    if (!E.prelev.masseCorporelle)
      res.push("rapport à la masse corporelle non calculé — il peut normaliser ce que le percentile " +
               "signale, le corpus écrit les deux");
  }

  /* 6 — Le nodule neuroblastique : la seule borne chiffrée, et son support est ouvert. */
  if (nod != null){
    t.push("Plus grand nodule neuroblastique = " + nod + " mm ; seule borne chiffrée séparant " +
           "l'incidentel du reste : « Nodules of these cells (typically measuring less than 3,5 mm in " +
           "maximum size) may persist in the center of the gland and be found incidentally » " +
           "[keeling, ch. 26]. ⚠️ La source ne dit pas si la mesure se prend sur la lame ou sur la " +
           "pièce — sur une coupe, 3,5 mm est une taille macroscopique (§ 9-19).");
    if (nod > 3.5){ if (cls === "ok") cls = "warn";
      t.push("Au-dessus de 3,5 mm : la description cytologique du nodule et celle du neuroblastome " +
             "congénital sont SUPERPOSABLES — seules la taille et la masse les séparent."); }
    else t.push("Sous la borne : nodule attendu, d'autant que les nodules sont présents chez tous les " +
                "fœtus entre ≈ 16 et 20 SA ⟨conv⟩ et que « deep groups are seen throughout gestation ».");
  }

  if (!E.prelev.pesee)
    res.push("glande non pesée — la maturation surrénalienne se pèse en macro avant de se mesurer en " +
             "micro, et le cortex permanent n'est écrit nulle part dans le corpus (§ 9-17)");
  if (res.length){ if (cls === "ok") cls = "warn"; t.push("Réserves : " + res.join(" ; ") + "."); }
  return { cls:cls, txt:t.join(" ") };
}

/* ── 05 · Variantes normales ─────────────────────────────────────────────────
   Sur cet organe la liste est longue et rentable : plusieurs de ces images sont
   explicitement désignées comme non pathologiques par les sources. */
var VARIANTES = [
  { k:"nodulesPeri", l:"Nodules corticaux péri-surrénaliens — « frequently seen adjacent to the adrenal gland and are generally not considered to represent an abnormality »" },
  { k:"heterotopie", l:"Hétérotopie surrénalienne à distance (gonades, épididyme, foie) — « usually consists only of cortical tissue »" },
  { k:"neuroIsoles", l:"Cellules neuroblastiques isolées dans le cortex fœtal — « throughout fetal life and even into the neonatal period »" },
  { k:"nodulesTerme", l:"Nodules neuroblastiques persistant au terme — « deep groups are seen throughout gestation »" },
  { k:"adenoide", l:"Aspect adénoïde / pseudo-folliculaire du cortex définitif — « may represent a normal developmental process, especially in very immature fetuses »" },
  { k:"hematopoiese", l:"Foyers d'hématopoïèse — « Foci of hemopoietic activity may be present in the adrenals of infants with no clinical evidence of increased hemopoiesis »" },
  { k:"lobulees", l:"« Surrénales lobulées » — décrites telles quelles en macro, sans commentaire lésionnel" },
  { k:"medullairePetite", l:"Médullaire peu développée — « La médullosurrénale reste peu développée pendant la vie fœtale »" },
  { k:"clustersChromaffines", l:"Médullaire en « scattered clusters of chromaffin cells », sans masse constituée" },
  { k:"roseCharnue", l:"Glande « pink and fleshy », conique, « presque aussi hautes que larges »" }
];

/* ── 06 · Signes ─────────────────────────────────────────────────────────────
   On coche des SIGNES, pas des diagnostics. Les associations de la § 07 sont
   dérivées de ces cases et ne se cliquent pas. Aucune clé ci-dessous ne porte
   un nom de maladie. */
var SIGNES = [
  /* Hémorragie, nécrose, calcification — le différentiel central de l'organe */
  { k:"hemoCF", l:"Sang extravasé dans le CORTEX FŒTAL",
    meta:"« The hemorrhages usually occur in the FZ cortex » — le siège de l'hémorragie anoxique" },
  { k:"hemoCentrale", l:"Hémorragie CENTRALE / médullaire",
    meta:"siège de l'hémorragie de fœticide et de l'hémorragie « habituelle » du corpus — disqualifiée par défaut" },
  { k:"hemoSousCapsulaire", l:"Hémorragie « subcapsular or predominantly periadrenal »" },
  { k:"necroseGlandulaire", l:"Nécrose glandulaire étendue accompagnant l'hémorragie" },
  { k:"unilateral", l:"Atteinte hémorragique UNILATÉRALE",
    meta:"« often unilateral » — vaut pour le contexte obstétrical comme pour le geste" },
  { k:"foeticide", l:"Geste de fœticide connu / délai fœticide–extraction renseigné",
    meta:"3 CR sur 200 seulement le tracent — le cocher est déjà un gain" },
  { k:"calcifInterne", l:"Calcifications de la corticale interne et de la médullaire",
    meta:"« the outer cortex being well preserved » ; « This dystrophic calcification can be apparent as early as 9 days post hemorrhage »" },
  { k:"calcifMure", l:"Calcification en mûre — « an unusual mulberry shape »",
    meta:"forme du syndrome néphrotique congénital finlandais, à ne pas confondre avec les mulberry-like bodies de macération" },

  /* Surcharge lipidique réactionnelle */
  { k:"vacuolesCF", l:"« clear, round, lipid vacuoles within the eosinophilic cytoplasm of the fetal cortical cells »",
    meta:"noyaux PRÉSENTS — la lyse, elle, laisse des « fantômes cellulaires »" },
  { k:"vacuolesPeriVeine", l:"Vacuolisation bordant la veine centrale seulement",
    meta:"l'étendue radiale est l'axe de la gradation I/II/III, qui vit dans foeto_grades" },
  { k:"vacuolesDiffuses", l:"« lipid accumulation throughout the entire fetal zone »" },
  { k:"glandeJaune", l:"Glande jaune au lieu de rose, ou « liseré blanchâtre au centre de la glande, à la partie profonde du cortex fœtal »" },
  { k:"pasNegatif", l:"PAS négatif sur la vacuole",
    meta:"« la coloration PAS est négative » — usage du service pour trancher la nature de la vacuole" },

  /* Surcharge constitutionnelle */
  { k:"aspectStrie", l:"Surcharge cellulaire lipidique prenant un « aspect strié » dans les cellules du cortex fœtal",
    meta:"Zellweger — attendu « dès le deuxième trimestre », et sur foie + Leydig en même temps" },
  { k:"inclusionsLamellaires", l:"Cellules ballonnisées, petites striations ou « inclusions lamellaires »" },
  { k:"perteArchiCF", l:"« l'architecture générale du cortex fœtal a disparu »" },
  { k:"petiteBlanche", l:"Glandes « anormalement petites, blanches »" },
  { k:"atteinteMultiorgane", l:"Même surcharge retrouvée sur un autre organe (foie, cellules de Leydig)",
    meta:"« L'atteinte multi-organe est le critère » — rien de chiffré dans les sources" },

  /* Hyperplasie congénitale */
  { k:"glandeVolumineuse", l:"Glande volumineuse et cérébriforme, poids très au-dessus du repère",
    meta:"« average ~ 15 g » contre « the normal combined weight of 9 g »" },
  { k:"cortexEpais", l:"Cortex épais avec « l'architecture générale est conservée »" },
  { k:"hyperplasieNodulaire", l:"« nodular hyperplasia of the cortex » avec cellules compactes qui « stream outward toward the surface »",
    meta:"divergence avec soffoet, qui décrit au contraire une architecture conservée — non tranchée" },
  { k:"cpInvaginant", l:"« Le cortex permanent est plus développé et s'invagine dans le cortex fœtal »" },
  { k:"lipidiquesRarefiees", l:"« Lipid-containing cells of the zona fasciculata are greatly reduced »" },
  { k:"ambiguite", l:"Ambiguïté génitale constatée",
    meta:"« more than 90 % of cases of 46,XX individuals with male or ambiguous genitalia » — fait peser et couper les surrénales" },

  /* Hypoplasies — les deux cortex se cotent SÉPARÉMENT */
  { k:"cfReduit", l:"Cortex FŒTAL réduit sans être absent",
    meta:"« a progressive reduction of the FZ » — anencéphalie, T18, hypoxie/toxémie, triploïdie" },
  { k:"cfAbsent", l:"Cortex FŒTAL « pratiquement absent »" },
  { k:"cpAbsent", l:"Cortex PERMANENT « pratiquement absent » — « The DZ fails to develop »" },
  { k:"cfEtCpReduits", l:"« both the FZ and DZ are severely reduced or absent »" },
  { k:"cortexDesorganise", l:"« the adrenal cortex to be disorganized »" },
  { k:"cytomegalieEosino", l:"« marked cytomegaly of intensely eosinophilic FZ cortical cells »" },
  { k:"cytoplasmeVitreux", l:"Cytoplasme vitreux abondant avec noyaux de taille normale",
    meta:"« excessive, glassy cytoplasm and normal-sized nuclei » — seul critère qui sépare l'hypoplasie cytomégalique de la cytomégalie ordinaire" },
  { k:"snc", l:"Anomalie du SNC constatée (anencéphalie, NTD)" },
  { k:"sncNormal", l:"Examen du SNC normal malgré une glande minuscule" },
  { k:"medullaireMature", l:"Médullaire « un peu plus mature pour l'âge, avec des phéochromocytes bien visibles »",
    meta:"paradoxe de l'anencéphalie — la médullaire peut être en avance quand le cortex est en retard" },
  { k:"poidsBas", l:"Poids en dessous du repère, glande pesée",
    meta:"« the glands typically weigh only 10 % of normal at term » ; la vraie hypoplasie se pèse avant de se voir" },

  /* Cytomégalie du cortex fœtal */
  { k:"noyauxGeants", l:"« nuclear gigantism » avec « occasional nuclear pseudoinclusions »" },
  { k:"taille3a4", l:"Cellules « 3 à 4 fois plus volumineuses que la moyenne »",
    meta:"seule valeur chiffrée disponible pour cette lésion" },
  { k:"plurifocal", l:"Atteinte plurifocale du cortex fœtal" },
  { k:"inclusionsVraies", l:"Inclusions « nucléaires et cytoplasmiques, spécifiques » de ce virus",
    meta:"vraies inclusions ≠ pseudo-inclusions ; elles survivent à la macération" },

  /* Nodules neuroblastiques */
  { k:"amasDenses", l:"« unencapsulated groups of densely packed cells with high nuclear/cytoplasmic ratios »" },
  { k:"rosettes", l:"« Some are quite large aggregates with rosette formation »" },
  { k:"nodulesCentraux", l:"Amas neuroblastiques centraux, autour des veines médullaires",
    meta:"attendus chez tous les fœtus vers 16–20 SA ; une coupe périphérique ne les montre pas" },
  { k:"nodulePlus35", l:"Nodule dépassant 3,5 mm",
    meta:"« typically measuring less than 3,5 mm in maximum size » — seule borne qui sépare l'incidentel du reste" },
  { k:"masseExpansive", l:"Masse constituée, expansive, refoulant le parenchyme",
    meta:"« description cytologiquement superposable » au nodule : seules la taille et la masse séparent" },

  /* Infection et inflammation */
  { k:"microAbces", l:"Microabcès arrondis, « bien délimités, mais non encapsulés », à polynucléaires altérés",
    meta:"« white abscesses, the size of pinheads » — visibles à l'œil nu" },
  { k:"gramPositif", l:"Bâtonnets Gram (+) vus sur la coupe",
    meta:"« rarement visibles » sur les coupes histologiques — un Gram négatif n'exclut pas" },
  { k:"necroseMultifocale", l:"« multifocal, punctate cortical necrosis with surrounding hyperemia or hemorrhage »" },
  { k:"infiltrat", l:"Infiltrat leucocytaire dans le parenchyme",
    meta:"« La réaction inflammatoire n'apparaît que dans un deuxième temps » — son absence n'exclut pas le CMV" },
  { k:"kysteToxo", l:"« kyste (cellule ballonnisée), à distance de l'infiltrat inflammatoire »" },
  { k:"amasBasophilesPeri", l:"Amas basophiles granuleux au contact de la glande, SANS polynucléaires",
    meta:"« Degeneration of soft tissues results in granular debris which may be mistaken for bacterial colonisation »" },

  /* Position, forme, contexte */
  { k:"galette", l:"Surrénale en galette, glande aplatie" },
  { k:"agenesieRenale", l:"Agénésie rénale homolatérale ou bilatérale" },
  { k:"poidsNormal", l:"Poids normal malgré une forme anormale",
    meta:"« mais leur poids reste normal » — une galette ne se conclut pas hypoplasie" },
  { k:"hematopoieseFoyer", l:"Foyer d'hématopoïèse",
    meta:"peut exister sans contexte hématologique — le noter, ne pas le conclure" },
  { k:"masseRetroperit", l:"Masse à petites cellules dans le rétropéritoine, hors glande",
    meta:"peut être du cerveau liquéfié refoulé — « should not be confused with a neuroblastic tumor in the retroperitoneum »" }
];

/* ── 07 · Associations lues ──────────────────────────────────────────────────
   Dérivées des signes cochés, jamais cliquables. Clés préfixées « d » pour
   qu'aucune ne puisse entrer en collision avec une clé de SIGNES. Le « stop »
   dit ce que l'association NE permet pas de conclure. */
var DIAGS = [
  { k:"dHemoAnoxique", l:"Hémorragie de siège cortical fœtal, à rattacher au contexte", cle:"hemoCF", min:2,
    signes:["hemoCF","necroseGlandulaire","unilateral","calcifInterne","hemoSousCapsulaire"],
    stop:" — le siège cortical fœtal est le seul appui de livre pour une hémorragie anoxique, et c'est un appui " +
         "faible. Aucune source ouverte n'énonce de critère de réaction cellulaire, de fibrine, d'hémosidérine " +
         "ou d'organisation appliqué à la surrénale : le différentiel lésion/artefact de cet organe n'est PAS " +
         "résolu par les livres. Une hémorragie sans calcification ni organisation ne prouve rien, la " +
         "calcification n'apparaissant qu'à partir de 9 jours." },

  { k:"dHemoGeste", l:"Hémorragie centrale — qualifier avant de retenir", cle:"hemoCentrale", min:2,
    signes:["hemoCentrale","unilateral","foeticide","necroseGlandulaire"],
    stop:" — c'est le piège central de cet organe. Le service qualifie cette image d'emblée : « liée au " +
         "foeticide », « (habituel) », « artéfactuelle ». Ne pas écrire « hémorragie surrénalienne » comme " +
         "lésion sans qualifier le siège et sans exclure le geste. Le fœticide n'apparaît que dans 3 CR du " +
         "corpus : son absence dans le dossier ne vaut pas absence de geste." },

  { k:"dSteatose", l:"Surcharge lipidique du cortex fœtal", cle:"vacuolesCF", min:2,
    signes:["vacuolesCF","vacuolesPeriVeine","vacuolesDiffuses","glandeJaune","pasNegatif"],
    stop:" — ne pas écrire « souffrance chronique » dans la micro : la micro décrit la surcharge et son type, " +
         "la conclusion relie. Le type I/II/III se cote dans la gradation, pas dans la liste des lésions. " +
         "La confirmation exige une coupe congelée, donc une décision prise à la table d'autopsie : elle est " +
         "structurellement inaccessible en routine différée et aucune congélation surrénalienne n'existe dans " +
         "le corpus. Chercher les noyaux avant de conclure : la lyse laisse des « fantômes cellulaires »." },

  { k:"dMetabolique", l:"Surcharge évocatrice d'une maladie constitutionnelle", cle:"aspectStrie", min:2,
    signes:["aspectStrie","inclusionsLamellaires","perteArchiCF","petiteBlanche","atteinteMultiorgane"],
    stop:" — ne pas nommer la maladie sur la lame. Une surrénale petite et blanche avec inclusions lamellaires " +
         "appelle un bilan peroxysomal, elle ne le remplace pas. Aucune coloration n'est nommée dans les " +
         "sources pour cet organe : le diagnostic est biochimique et génétique, la lame oriente." },

  { k:"dHcs", l:"Aspect d'hyperplasie corticosurrénalienne", cle:"glandeVolumineuse", min:2,
    signes:["glandeVolumineuse","cortexEpais","hyperplasieNodulaire","cpInvaginant","lipidiquesRarefiees","ambiguite"],
    stop:" — ne pas écrire « HCS » dans la micro : écrire glande volumineuse, cortex épais, hyperplasie ou " +
         "invagination du cortex permanent, raréfaction des cellules lipidiques, et poser la question en " +
         "conclusion. Le diagnostic est biochimique et génétique, aucune technique ne tranche sur la lame. " +
         "Les deux livres divergent sur l'image : hyperplasie nodulaire d'un côté, architecture conservée " +
         "avec invagination du cortex permanent de l'autre — divergence portée, non arbitrée. " +
         "Se voit d'abord à la balance et au couteau, pas au microscope." },

  { k:"dHypoSecondaire", l:"Réduction du cortex fœtal en contexte de SNC anormal", cle:"cfReduit", min:2,
    signes:["cfReduit","snc","poidsBas","medullaireMature","vacuolesCF"],
    stop:" — la réduction du cortex fœtal n'est pas propre à l'anencéphalie : trisomie 18, restriction de " +
         "croissance sévère, hypoxie et toxémie, triploïdie donnent la même image, et pour l'hypoxie « Cette " +
         "hypoplasie n'est pas constante et jamais majeure ». Elle « n'apparaît qu'au-delà de 16 SA » : avant, " +
         "l'absence de réduction ne réfute rien. Sur une glande lysée, écrire le doute et non la conclusion. " +
         "Cette lecture est macro et pondérale avant d'être micro." },

  { k:"dDax1", l:"Cortex fœtal développé, cortex permanent absent — moitié cytomégalique du miroir", cle:"cpAbsent", min:2,
    signes:["cpAbsent","cytomegalieEosino","cortexDesorganise","cfReduit"],
    stop:" — le couple avec la forme miniature est un miroir exact et c'est le seul discriminant " +
         "morphologique disponible : cette moitié-ci a le cortex fœtal présent et le cortex permanent absent. " +
         "Un seul cortex sur la coupe peut n'être qu'un plan tangentiel : sans veine centrale, ne pas conclure " +
         "à l'absence d'un cortex. Ne pas nommer le gène sur la lame. Le repère pondéral donné par soffoet " +
         "pour cette forme est douteux et n'est pas repris ici." },

  { k:"dMiniature", l:"Cortex fœtal absent, cortex permanent conservé — moitié miniature du miroir", cle:"cfAbsent", min:2,
    signes:["cfAbsent","sncNormal","poidsBas"],
    stop:" — miroir exact de la forme précédente. Le SNC normal est ce qui la sépare de l'hypoplasie " +
         "secondaire, et il doit avoir été examiné pour être opposable. Même réserve de plan de coupe : " +
         "l'absence d'un cortex ne se lit que sur une coupe passant par la veine centrale." },

  { k:"dRecessive", l:"Les deux cortex sévèrement réduits", cle:"cfEtCpReduits", min:2,
    signes:["cfEtCpReduits","poidsBas","sncNormal"],
    stop:" — l'atteinte des deux cortex ne discrimine plus le couple cytomégalique/miniature : elle sort du " +
         "miroir. Ne pas nommer l'entité familiale sur la lame. Sur glande lysée, le cortex permanent est " +
         "le premier détruit — la réduction peut être une lecture de l'autolyse." },

  { k:"dCytomegalie", l:"Cytomégalie du cortex fœtal", cle:"noyauxGeants", min:2,
    signes:["noyauxGeants","taille3a4","plurifocal"],
    stop:" — non spécifique : « described in patients with Beckwith-Wiedemann syndrome, the cytomegalic type " +
         "of congenital adrenal hypoplasia, trisomy 13 and in infants of diabetic mothers », et « may be seen " +
         "as an unexpected finding without any clinical correlation ». Ne pas écrire Beckwith-Wiedemann. " +
         "Trois choses portent ce mot : gros noyaux ici, cytoplasme vitreux à noyaux normaux dans " +
         "l'hypoplasie cytomégalique, inclusions vraies dans la cytomégalie virale. Fréquence de base " +
         "divergente selon les sources (≈ 3 % contre « 0,1–6,5 % »), divergence portée. L'âge d'apparition " +
         "dans le syndrome de Beckwith-Wiedemann diverge aussi entre les livres, non arbitré." },

  { k:"dHypoCytomegalique", l:"Cytomégalie à noyaux de taille normale — l'autre cytomégalie", cle:"cytoplasmeVitreux", min:2,
    signes:["cytoplasmeVitreux","cortexDesorganise","poidsBas","cfReduit"],
    stop:" — cette association existe pour empêcher la confusion, pas pour nommer une maladie. Le seul " +
         "critère morphologique écrit est la taille du noyau : gros noyau = cytomégalie ordinaire, cytoplasme " +
         "vitreux avec noyau normal = hypoplasie cytomégalique. Il n'y a pas d'autre discriminant sourcé." },

  { k:"dNeuroblastique", l:"Amas neuroblastiques", cle:"amasDenses", min:2,
    signes:["amasDenses","rosettes","nodulesCentraux","nodulePlus35","masseExpansive"],
    stop:" — ne pas écrire « neuroblastome in situ » : le terme est contesté et le corpus ne l'emploie jamais, " +
         "il écrit une description. Ces amas sont NORMAUX à leur âge, et « no clonal proliferation has been " +
         "demonstrated in these lesions ». La description cytologique du neuroblastome congénital est " +
         "superposable : seules la taille et la masse séparent, et 3,5 mm est la seule borne écrite. " +
         "Leur absence sur une coupe périphérique ne veut rien dire, ils sont centraux en fin de gestation." },

  { k:"dListeriose", l:"Abcédation à polynucléaires du cortex", cle:"microAbces", min:2,
    signes:["microAbces","gramPositif","infiltrat","necroseGlandulaire"],
    stop:" — sur une surrénale macérée, des amas basophiles péri-glandulaires sans polynucléaires ne sont pas " +
         "une listériose. Le discriminant est « evidence of an inflammatory response or focus of infection », " +
         "la vraie bactériémie étant « very dense and predominantly limited to vessels ». Un Gram négatif " +
         "n'exclut rien : les bacilles sont « rarement visibles » sur les coupes." },

  { k:"dViral", l:"Aspect évocateur d'une infection virale", cle:"inclusionsVraies", min:2,
    signes:["inclusionsVraies","necroseMultifocale","infiltrat","kysteToxo","calcifInterne"],
    stop:" — une surrénale à inclusions sans infiltrat n'exclut rien, la réaction inflammatoire venant dans " +
         "un second temps. Ne pas nommer l'agent sur la seule morphologie ; le kyste toxoplasmique et " +
         "l'inclusion virale ne sont pas la même chose. Les inclusions virales survivent à la macération, " +
         "ce qui en fait un des rares signes encore lisibles sur glande rétenue." },

  { k:"dGalette", l:"Surrénale en galette", cle:"galette", min:2,
    signes:["galette","agenesieRenale","poidsNormal"],
    stop:" — une glande aplatie n'est pas une hypoplasie : « leur poids reste normal ». Et gare à l'inverse, " +
         "le corpus décrit des galettes « sphérisées par une probable hémorragie artéfactuelle ». Une glande " +
         "de poids normal peut être profondément anormale de forme, et une glande de forme normale peut " +
         "être très en dessous du repère pondéral." },

  { k:"dCalcif", l:"Calcifications surrénaliennes", cle:"calcifInterne", min:2,
    signes:["calcifInterne","calcifMure","hemoCF","hemoCentrale","necroseGlandulaire"],
    stop:" — « When no mass or other adrenal disease is identified, it can be presumed that calcifications " +
         "represent the resolution of previous adrenal hemorrhage » : c'est une présomption, à écrire comme " +
         "telle. Les autres causes sont l'infection in utero, l'anasarque et les maladies de surcharge. " +
         "Ne pas confondre avec les artefacts pigmentaires de macération, qui « should not be confused with " +
         "calcifications, bacteria, viral inclusions, hemosiderin deposits, or formalin pigment »." },

  { k:"dMasse", l:"Masse rétropéritonéale à petites cellules", cle:"masseRetroperit", min:2,
    signes:["masseRetroperit","masseExpansive","amasDenses","rosettes"],
    stop:" — avant de parler de tumeur, éliminer le cerveau liquéfié refoulé par GFAP et CD56. Et pour les " +
         "tumeurs corticosurrénaliennes, « The histological criteria used to predict malignant behavior in " +
         "adults are not reliable in children » : la mesure décisive est le poids de la tumeur, pas la lame." }
];

/* ── 08 · Négatifs ───────────────────────────────────────────────────────────
   Sur 68 phrases micro surrénaliennes du corpus, 4 seulement énoncent un
   négatif, contre 8 qui écrivent une normalité globale sans dire ce qui a été
   cherché. Un seul négatif nommé existe réellement dans la pratique : la
   cytomégalie. Le reste de cette liste est une proposition normative, et le
   champ « p » le dit. */
var NEGATIFS = [
  { k:"cytomegalie", l:"Absence de cytomégalie du cortex fœtal énoncée",
    p:"le seul négatif réellement attesté dans le corpus, en micro comme en conclusion",
    ko:"cytomégalie NON recherchée — le seul négatif que le service écrit vraiment" },
  { k:"pas", l:"Absence de surcharge PAS positive du cortex énoncée",
    p:"attesté : « Absence de surcharge PAS positive du cortex surrénalien »",
    ko:"surcharge PAS NON recherchée" },
  { k:"deuxCortexNeg", l:"Les deux cortex cotés SÉPARÉMENT (CF présent/absent, CP présent/absent)",
    p:"sans quoi le couple cytomégalique / miniature est indiscernable",
    ko:"cortex cotés en bloc — le miroir CF/CP ne peut plus être lu" },
  { k:"veineNeg", l:"Cytoarchitecture énoncée : deux cortex identifiables, veine centrale présente",
    p:"attesté dans le corpus, et c'est le garant du plan de coupe",
    ko:"cytoarchitecture non énoncée — le plan de coupe n'est pas documenté" },
  { k:"basoNeg", l:"Perte de basophilie nucléaire : complète / partielle / absente",
    p:"« c'est le négatif le plus utile de cet organe » — il donne l'une des deux bornes de la datation",
    ko:"basophilie nucléaire NON cotée — la borne de datation de cet organe est perdue" },
  { k:"hemoNeg", l:"Hémorragie : présente/absente, et si présente son SIÈGE",
    p:"cortical fœtal / central-médullaire / sous-capsulaire / péri-surrénalien",
    ko:"hémorragie non cotée ou siège non précisé — le différentiel de l'organe repose sur le siège" },
  { k:"lipideNeg", l:"Absence de surcharge lipidique du cortex fœtal, et si présente son type",
    p:"proposé par les livres, non attesté dans le corpus",
    ko:"surcharge lipidique NON recherchée" },
  { k:"calcifNeg", l:"Absence de calcification",
    p:"proposé par les livres — seul marqueur chronologique post-hémorragique de l'organe",
    ko:"calcification NON recherchée — le seul repère de datation post-hémorragique manque" },
  { k:"noduleNeg", l:"Absence de nodule neuroblastique de plus de 3,5 mm",
    p:"proposé par les livres — la seule borne chiffrée qui sépare l'incidentel du reste",
    ko:"taille des nodules neuroblastiques NON évaluée" },
  { k:"viralNeg", l:"Absence d'inclusion virale (CMV, herpès, parvovirus)",
    p:"d'autant plus utile que ces inclusions survivent à la macération",
    ko:"inclusions virales NON recherchées — elles restent lisibles là où le reste ne l'est plus" },
  { k:"abcesNeg", l:"Absence de microabcès à polynucléaires",
    p:"proposé par les livres, non attesté dans le corpus",
    ko:"microabcès NON recherchés" },
  { k:"hematoNeg", l:"Absence de foyer d'hématopoïèse",
    p:"à énoncer parce qu'il peut exister sans contexte hématologique et donc ne rien vouloir dire",
    ko:"foyers d'hématopoïèse NON cotés" }
];

/* ── 09 · Techniques ─────────────────────────────────────────────────────────
   Une ligne par QUESTION, pas par coloration. */
var TECHNIQUES = [
  { k:"hes",       l:"HES", q:"les deux cortex sont-ils identifiables et dans quel rapport ?" },
  { k:"trichrome", l:"Trichrome de Masson ou réticuline", q:"l'architecture est-elle conservée malgré la macération ?" },
  { k:"oro",       l:"Oil Red O ou Noir Soudan sur COUPE CONGELÉE", q:"surcharge lipidique du cortex fœtal, et de quel type ? — la paraffine ne le permet pas" },
  { k:"pas",       l:"PAS", q:"la vacuolisation est-elle lipidique ou glycogénique/mucineuse ?" },
  { k:"adipo",     l:"IHC adipophiline", q:"alternative en paraffine à la question lipidique — « optional »" },
  { k:"cd31",      l:"IHC CD31", q:"les colonnes du cortex fœtal sont-elles bien séparées par des sinusoïdes ?" },
  { k:"mib1",      l:"IHC MIB-1, caspase-3, Bcl-2", q:"cette cytomégalie est-elle proliférative ou apoptotique ? — les trois sont négatifs" },
  { k:"gfap",      l:"IHC GFAP et CD56", q:"cette masse rétropéritonéale est-elle du tissu neuroblastique ou du cerveau liquéfié ?" },
  { k:"gram",      l:"HES d'abord, Gram ensuite", q:"listériose ou débris de macération ? — chercher les polynucléaires avant les bacilles" },
  { k:"perls",     l:"Perls", q:"hémosidérine — PROPOSÉ PAR DÉDUCTION, non sourcé sur cet organe, non employé par le service" }
];

/* Les propositions suivent les SIGNES cochés : une technique se demande sur ce
   qu'on a vu, pas sur le nom qu'on lui donnerait. */
function suggerer(){
  var s = {};
  function anormal(k){ return E.signes[k] === "anormal"; }
  function ret(k){ return E.retention[k] === "present"; }

  if (anormal("vacuolesCF") || anormal("vacuolesPeriVeine") || anormal("vacuolesDiffuses") ||
      anormal("glandeJaune")){ s.pas = 1; s.oro = 1; s.adipo = 1; }
  if (anormal("aspectStrie") || anormal("inclusionsLamellaires") || anormal("perteArchiCF")) s.pas = 1;
  if (anormal("noyauxGeants") || anormal("taille3a4") || anormal("plurifocal")) s.mib1 = 1;
  if (anormal("cytoplasmeVitreux")) s.mib1 = 1;
  if (anormal("inclusionsVraies") || anormal("necroseMultifocale") || anormal("kysteToxo")) s.hes = 1;
  if (anormal("microAbces") || anormal("infiltrat") || anormal("amasBasophilesPeri")){ s.hes = 1; s.gram = 1; }
  if (anormal("masseRetroperit") || anormal("masseExpansive")) s.gfap = 1;
  if (anormal("hemoCF") || anormal("hemoCentrale") || anormal("hemoSousCapsulaire")) s.perls = 1;
  if (anormal("cfReduit") || anormal("cfAbsent") || anormal("cpAbsent") || anormal("cfEtCpReduits") ||
      anormal("cortexDesorganise")){ s.hes = 1; s.cd31 = 1; }
  if (anormal("cortexEpais") || anormal("cpInvaginant") || anormal("hyperplasieNodulaire")) s.hes = 1;

  /* La rétention change la question posée : sur glande lysée on ne demande plus
     un rapport, on demande s'il reste une architecture. */
  if (ret("cohesionCP") || ret("vacuolesFantomes") || ret("petiteEtLysee")) s.trichrome = 1;
  if (ret("debrisGranuleux") || ret("murAlveolaire")){ s.hes = 1; s.gram = 1; }
  if (ret("perteComplete") || ret("basoCFPersistante")) s.trichrome = 1;

  return s;
}

/* ── 10 · Contrôles propres à l'organe ───────────────────────────────────────
   Le banc commun tourne AVANT et laisse des signes posés, un côté et une
   technique : on part d'un état voulu, pas supposé. */
async function testsOrgane(chk, clic, set, crTient, pause){
  function pose(k, v){ if (E.signes[k] !== v) clic("les", k, v); }
  function ote(k){ if (E.signes[k]) clic("les", k, E.signes[k]); }
  function tenue(k){ return associations().some(function(a){ return a.d.k === k && a.tenu; }); }
  function mdef(k){ if (E.mesure.def !== k) clic("mdef", k); }
  function mopt(k){ if (E.mesure.opt !== k) clic("mopt", k); }

  SIGNES.forEach(function(x){ ote(x.k); });
  if (PAIR && E.cote !== "deux") clic("cote", "deux");

  /* La table de datation : le rang existe, l'heure n'existe pas. */
  chk("rang 9 : plancher ≥ 1 semaine", par(RETENTION, "perteComplete").b === "≥ 1 semaine");
  chk("borne haute symétrique",        par(RETENTION, "basoCFPersistante").b === "< 1 semaine");
  chk("aucune heure interpolée",       par(RETENTION, "perteComplete").note.indexOf("MONOTONIE") >= 0 &&
      par(RETENTION, "perteComplete").note.indexOf("fabrication") >= 0);
  chk("modificateurs portés",          par(RETENTION, "perteComplete").alerte.indexOf("hydrops") >= 0);
  chk("deux bornes bonnes, l'organe date",
      RETENTION.filter(function(r){ return r.q === "bon"; }).length === 2);
  chk("collision de vocabulaire « mûre » signalée",
      par(RETENTION, "mulberry").note.indexOf("collision de vocabulaire") >= 0);

  /* L'inversion de l'organe : la maturation tombe avant la datation. */
  chk("le cortex définitif tombe le premier",
      par(RETENTION, "cohesionCP").h < par(RETENTION, "perteComplete").h &&
      par(RETENTION, "cohesionCP").note.indexOf("DATANTE MAIS NON MESURABLE") >= 0);

  /* La lisibilité du rapport CF/CP BLOQUE : elle ne se présume pas.
     L'axe médullaire est posé d'abord, sinon le bloc mesure est encore muet. */
  mopt("medConforme");
  if (E.mesure.def) clic("mdef", E.mesure.def);
  chk("rapport CF/CP non déclaré = blocage", $("vMesure").className.indexOf("bad") >= 0 &&
      crTient("un stade coché n'est pas une lecture"));

  mdef("unSeulCortex");
  chk("un seul cortex n'est pas une agénésie", $("vMesure").className.indexOf("bad") >= 0 &&
      crTient("ce n'est PAS une agénésie corticale") && crTient("INDÉTERMINABLE"));

  mdef("cpDesorganise");
  chk("datante mais non mesurable", crTient("Glande DATANTE MAIS NON MESURABLE") &&
      crTient("rapport CF/CP est donc perdu alors que la datation tient"));

  mdef("fantomes");
  chk("sur fantômes, ni hypoplasie ni stéatose", crTient("une petite glande n'est pas une hypoplasie"));

  mdef("deuxCortex");
  chk("les deux cortex : le rapport devient mesurable",
      $("vMesure").className.indexOf("bad") < 0 && crTient("le rapport CF/CP est mesurable"));

  /* Le chiffre s'entre ; c'est son barème par terme qui n'existe pas. */
  set("sa", "24");
  set("m_cf", "60");
  chk("le rapport CF/CP s'entre sans norme", crTient("Part du cortex fœtal = 60 %"));
  chk("aucune norme par semaine", crTient("AUCUNE SOURCE OUVERTE NE DONNE CE RAPPORT PAR SEMAINE"));
  chk("les seules valeurs sourçables sont des plateaux", crTient("PLATEAUX, pas") &&
      crTient("4/5e de l'épaisseur de la glande") && crTient("~80 % of the entire adrenal cortex at term"));
  set("m_cf", "25");
  chk("chute anencéphalique évoquée, pas conclue", crTient("l'ordre de grandeur de la chute"));
  set("sa", "15");
  chk("avant 16 SA la réduction n'est pas opposable", crTient("n'est PAS opposable"));
  set("sa", "24");
  set("m_cf", "");

  /* Une borne sans son terme reste une borne sans son terme. */
  set("m_cp", "14");
  chk("borne du CP sans terme associé", crTient("thin (10–20 cells thick)") &&
      crTient("SANS TERME ASSOCIÉ"));
  set("m_cp", "4");
  chk("CP effondré renvoie au miroir", crTient("encore faut-il que le cortex fœtal, lui, soit développé"));
  set("m_cp", "");

  /* Le poids : le vrai outil du service, et son référentiel manquant. */
  set("m_poids", "16");
  chk("normale pondérale sourçable", crTient("the normal combined weight of 9 g"));
  chk("référentiel réel hors index", crTient("Mitropoulos"));
  chk("HCS entre par la balance", crTient("greatly enlarged (average ~ 15 g)"));
  set("m_poids", "");

  /* Le nodule : la seule borne chiffrée de l'organe, et son support est ouvert. */
  set("m_nodule", "2");
  chk("sous 3,5 mm, nodule attendu", crTient("nodule attendu"));
  set("m_nodule", "6");
  chk("au-dessus, descriptions superposables", crTient("SUPERPOSABLES"));
  chk("support de la mesure non tranché", crTient("ne dit pas si la mesure se prend sur la lame ou sur la pièce"));
  set("m_nodule", "");

  /* Deux axes, parce qu'une seule case « maturation surrénalienne » est fausse. */
  mopt("medAvance");
  chk("médullaire en avance sur cortex en retard",
      crTient("Paradoxalement la médullosurrénale paraît un peu plus mature pour l'âge"));
  chk("norme de la médullaire rappelée", crTient("la petite taille de la médullaire EST la norme"));
  mopt("medNonLue");
  chk("pas de veine centrale, pas de lecture médullaire", crTient("un artefact de plan"));
  mopt("medConforme");

  /* Divergences portées, jamais arbitrées */
  chk("zonation du CP en divergence frontale", AVANCE_NOTE.indexOf("DIVERGENCE FRONTALE") >= 0);
  chk("HCS : deux descriptions non arbitrées",
      par(DIAGS, "dHcs").stop.indexOf("divergence portée, non arbitrée") >= 0);
  chk("cytomégalie : fréquence de base divergente",
      par(DIAGS, "dCytomegalie").stop.indexOf("0,1–6,5 %") >= 0);
  chk("la gradation de la stéatose n'est pas un terme",
      par(SIGNES, "vacuolesPeriVeine").meta.indexOf("foeto_grades") >= 0);
  chk("Perls proposé par déduction seulement",
      par(TECHNIQUES, "perls").q.indexOf("PROPOSÉ PAR DÉDUCTION") >= 0);
  chk("clones et dilutions non sourcés", TECH_NOTE.indexOf("aucune source ouverte") >= 0 &&
      TECH_NOTE.indexOf("restent à") >= 0);

  /* Le nom se déduit des signes — il ne se coche pas */
  chk("aucun bouton ne porte un diagnostic",
      DIAGS.every(function(d){ return !document.querySelector('[data-act="les"][data-k="' + d.k + '"]'); }));

  /* Le miroir CF/CP : c'est le seul discriminant morphologique disponible. */
  pose("cpAbsent", "anormal");
  pose("cytomegalieEosino", "anormal");
  chk("moitié cytomégalique du miroir", tenue("dDax1") && !tenue("dMiniature"));
  chk("le miroir est nommé dans le stop", crTient("miroir exact"));
  ote("cpAbsent"); ote("cytomegalieEosino");

  pose("cfAbsent", "anormal");
  pose("sncNormal", "anormal");
  chk("moitié miniature du miroir", tenue("dMiniature") && !tenue("dDax1"));
  ote("cfAbsent"); ote("sncNormal");

  /* Sans le pivot, l'association ne tient pas. */
  pose("taille3a4", "anormal");
  pose("plurifocal", "anormal");
  chk("cytomégalie sans le pivot ne tient pas", !tenue("dCytomegalie") &&
      crTient("signe pivot non coché : « nuclear gigantism »"));
  pose("noyauxGeants", "anormal");
  chk("le pivot fait tenir la cytomégalie", tenue("dCytomegalie"));
  chk("cytomégalie propose MIB-1", suggerer().mib1 === 1);
  chk("Beckwith-Wiedemann refusé sur la lame",
      crTient("Ne pas écrire Beckwith-Wiedemann"));
  ote("noyauxGeants"); ote("taille3a4"); ote("plurifocal");

  /* Le piège central : l'hémorragie centrale se qualifie avant de se retenir. */
  pose("hemoCentrale", "anormal");
  pose("foeticide", "anormal");
  chk("hémorragie centrale = famille geste", tenue("dHemoGeste") &&
      crTient("liée au foeticide") && crTient("sans exclure le geste"));
  chk("hémorragie propose le Perls", suggerer().perls === 1);
  ote("hemoCentrale"); ote("foeticide");

  /* La stéatose se juge sur les noyaux, pas sur les vacuoles. */
  pose("vacuolesCF", "anormal");
  pose("glandeJaune", "anormal");
  chk("surcharge lipidique lue", tenue("dSteatose"));
  chk("la congélation est un préalable, pas un rattrapage",
      crTient("structurellement inaccessible en routine différée"));
  chk("stéatose propose PAS, Oil Red O et adipophiline",
      suggerer().pas === 1 && suggerer().oro === 1 && suggerer().adipo === 1);
  ote("vacuolesCF"); ote("glandeJaune");

  /* La galette : forme anormale, poids normal. */
  pose("galette", "anormal");
  pose("agenesieRenale", "anormal");
  chk("galette lue", tenue("dGalette") && crTient("leur poids reste normal"));
  ote("galette"); ote("agenesieRenale");

  /* Débris de macération contre listériose. */
  clic("ret", "debrisGranuleux", "present");
  chk("débris granuleux proposent HES puis Gram",
      suggerer().hes === 1 && suggerer().gram === 1);
  clic("ret", "debrisGranuleux", "present");
  pose("amasBasophilesPeri", "anormal");
  chk("amas sans polynucléaires ne font pas une listériose", !tenue("dListeriose"));
  ote("amasBasophilesPeri");

  /* Le négatif le plus utile de cet organe. */
  chk("basophilie : négatif le plus utile", par(NEGATIFS, "basoNeg").p.indexOf("le négatif le plus utile") >= 0);
  chk("les deux cortex cotés séparément est un négatif",
      par(NEGATIFS, "deuxCortexNeg").ko.indexOf("miroir") >= 0);

  set("sa", "34");
  chk("le terme reste posé en fin de tests", num("sa") === 34);
}
