/* Grille de lecture — œil fœtal.
   Fond : ~/Bureau/fiches_lecture/fiche_oeil.md (§1 à §9).
   Forme : gen_grille.py, calquée sur grille_poumon.html.
   Les divergences entre sources sont PORTÉES dans les champs, jamais arbitrées.

   Trois écarts de fond, tous portés par la fiche et non par cette grille :
   — l'œil n'est pas un prélèvement de routine, il est conditionnel (§ 1, § 9.15) ;
   — il est absent des trois barèmes de macération du fonds : l'ordre de rétention
     est INTERNE au globe et ne se convertit en aucune heure (§ 2.1, § 9.1) ;
   — il se date par DEUX axes de résistance opposée, et il faut écrire lequel on a
     utilisé (§ 2.3, § 3.4) — c'est l'axe catégoriel de MESURE. */

var ORGANE  = "oeil";
var TITRE   = "œil fœtal";
var SOURCE  = "fiche_oeil.md";
var MODULE  = "grille_oeil";
var VERSION = "1.0.0";
var PAIR    = true;

var TITRE_CR    = "ŒIL";
var STADE_TITRE = "Repère de maturation le plus avancé effectivement vu";

var KCL_TXT = "Fœticide par KCl déclaré — l'œil n'a de toute façon aucun rang dans les barèmes de " +
              "macération (ni Table 15.6, ni ernst ch. 37, ni les 23 critères de Genest) : aucune " +
              "borne horaire n'était recevable avant le geste, aucune ne l'est après. L'ordre du " +
              "§ 2.2 reste lisible comme ordre interne, jamais comme durée.";

/* Le retard oculaire est le point où l'axe utilisé doit être nommé : la stratification
   rétinienne est détruite par la lyse alors que la régression vasculaire tient. */
var RETARD_NOTE = "Nommer l'axe qui a servi (rétinien, antérieur ou vasculaire) : sur un œil " +
                  "macéré un « retard » rétinien peut n'être que le rang 1 de l'ordre interne. " +
                  "Et une rétine à dix couches ne se date pas « ≥ 27 SA » mais « ≥ 24–27 SA " +
                  "selon la source » (§ 9.19) : elle ne doit jamais servir seule à contredire " +
                  "un terme obstétrical.";

var AVANCE_NOTE = "Une avance sur l'axe vasculaire (hyaloïde déjà régressée) n'est pas une avance " +
                  "de maturation générale : la régression hyaloïdienne a « a bit of variability, " +
                  "also between fellow eyes ». Reprendre la datation sur l'axe antérieur, le plus " +
                  "dense en repères, avant de conclure.";

var TECH_NOTE = "Les pointillés sont des propositions déduites des clics, jamais des prescriptions. " +
                "Le PAS systématique est une décision de la fiche, pas une prescription de la " +
                "source (§ 9.16) — le proposer, c'est ouvrir un choix, pas rappeler une règle.";

/* ── 01 · Prélèvement ─────────────────────────────────────────────────────────
   L'œil est le seul organe du dossier dont le § 1 est une INDICATION autant
   qu'une check-list : « si nécessaire » (soffoet), 7 CR sur 176 (corpus). */
var PRELEV = [
  { k:"indication", l:"Indication du prélèvement écrite (microphtalmie · inflammation · tumeur · TCNA · TORCH)",
    manque:"le prélèvement oculaire est conditionnel — le manuel l'écrit « si nécessaire » et le " +
           "corpus ne le trouve que dans 7 CR sur 176 : écrire pourquoi on a décidé de le faire" },
  { k:"deuxBlocs", l:"Deux blocs — un par œil, identifiés OD / OS", grave:true,
    manque:"« It is crucial for the pathologist to study both eyes in a case of suspected AHT » — " +
           "et en microphtalmie unilatérale l'œil adelphe EST l'étalon de mesure" },
  { k:"planPO", l:"Globe ouvert selon le plan PO (pupille – nerf optique)", grave:true,
    manque:"sans le plan pupille–nerf optique, ni le DAP, ni l'angle, ni les trois items " +
           "pronostiques du rétinoblastome ne sont évaluables (§ 8.3)" },
  { k:"ciliaires", l:"Longues artères ciliaires postérieures repérées avant la coupe",
    manque:"« The identification of the long posterior ciliary arteries helps to identify the " +
           "horizontal plane » — le plan se prouve à la macroscopie, pas après" },
  { k:"nerfOptique", l:"Tête du nerf optique sur la coupe", grave:true,
    manque:"à défaut de tête de nerf optique, ni l'hémorragie péripapillaire intrasclérale ni le " +
           "colobome papillaire ne se jugent ; la méningite listérienne du nerf non plus" },
  { k:"etagees", l:"Coupes étagées (step sections) 4 μm réalisées", grave:true,
    manque:"« A detailed stepwise sectioning and microscopic investigation of the orbital contents " +
           "is mandatory to differentiate between anophthalmia and microphthalmia » ; sans elles, " +
           "ni le négatif d'anophtalmie ni celui de colobome ne sont rendables" },
  { k:"cristallinIntact", l:"Cristallin NON traversé par la lame",
    manque:"« cutting through the lens should be avoided, as it usually dislocates » — la pièce " +
           "cristallinienne n'est plus jugeable" },
  { k:"blocEntier", l:"Globe < 6–8 mm inclus EN ENTIER, sans ouverture",
    manque:"en microphtalmie sévère (< 6–8 mm de longueur axiale) on n'ouvre pas : le globe est " +
           "inclus en entier" },
  { k:"voiePosterieure", l:"Voie postérieure (toit de l'orbite effondré) quand l'orbite doit être examinée",
    manque:"la voie postérieure est obligatoire « in cases of microphthalmia (with cyst) or " +
           "anophthalmia, when the whole contents of the orbit need to be examined in order to " +
           "decide between the two diagnoses », et « in cases of inflammation, neoplasia, or " +
           "non-accidental trauma » — verbatim : « par voie interne, en effondrant le toit de l'orbite »" },
  { k:"paupieres", l:"Paupières respectées et examinées",
    manque:"« Dans les deux cas, les paupières doivent être soigneusement respectées » — elles " +
           "portent la fusion / séparation palpébrale, repère de maturation daté (rangs 1 et 16)" },
  { k:"blocTete", l:"Cryptophtalmie ou cyclopie : bloc de tête, pas d'énucléation",
    manque:"en cryptophtalmie « the globe is tightly attached to the overlying skin, resulting in " +
           "damage to the anterior parts of the eye » ; en cyclopie « the eye may not be removed »" },
  { k:"macro", l:"Macroscopie faite AVANT la coupe : DAP · DC · transillumination · aspect du cristallin",
    grave:true,
    manque:"trois données ne sont plus récupérables une fois le globe coupé — la biométrie, la " +
           "transillumination et l'aspect du cristallin. Le pli périmaculaire « can only be " +
           "determined by macroscopic evaluation »" },
  { k:"photo", l:"Photographie de la pièce au grossage",
    manque:"« photography at grossing is recommended » — le type d'hémorragie (en flammèche, en " +
           "points, en taches) n'est plus ré-observable ensuite" },
  { k:"pas", l:"HES ET PAS, les deux systématiques",
    manque:"« Step sections of 4 μm are cut and routinely stained with H&E and PAS » ; les quatre " +
           "repères du segment antérieur (Bowman, Descemet, capsule, Bruch) sont des lames dont " +
           "l'ABSENCE FOCALE est le critère — une absence ne se lit pas sur HES seul (§ 9.16)" },
  { k:"formol", l:"Formol 10 %, ≥ 24 h, SANS injection dans le vitré",
    manque:"« There is no need to inject formalin into the vitreous cavity. This procedure should " +
           "be avoided, as it will lead to additional artifacts without any proven benefits » — " +
           "la déformation du globe rend le DAP et l'angle ininterprétables" }
];

/* ── 02 · Rétention ───────────────────────────────────────────────────────────
   ⚠ L'ŒIL N'A AUCUN RANG DANS L'HORLOGE MULTI-ORGANES. Ce qui suit n'est pas
   une horloge : c'est l'ordre de résistance INTERNE au globe (verdijk ch. 3),
   du plus fragile au plus résistant. Aucun « b » ne porte d'heure, et c'est
   volontaire (§ 2.1, § 9.1). Plus le rang atteint est haut, plus la lyse est
   avancée — d'où h = numéro de rang. */

/* Modificateur unique et sourcé, l'équivalent pour l'œil des deux modificateurs
   de l'horloge de keeling. */
var MODIF = "modificateur unique et sourcé : « Eyes from fetuses who died intrauterine often show " +
            "more extensive autolysis than eyes from abortions » — devant une MFIU, relever le " +
            "seuil d'exigence avant tout diagnostic rétinien";

var RETENTION = [
  { k:"retineFragmentee", l:"Rétine neurosensorielle fragmentée, architecture stratifiée disloquée",
    b:"rang 1/7 de l'ordre interne", d:"« The retina seems to be most affected by autolytic changes »",
    h:1, q:"bon",
    note:"c'est le rang qui commande tout le reste : dès que la rétine est fragmentée, l'axe de " +
         "datation « nombre de couches » est mort — il ne se rattrape pas, ne s'interpole pas, ne " +
         "se déduit pas de l'épaisseur. Ce n'est ni une dysplasie rétinienne, ni un décollement. " +
         "Écrire « non évaluable », pas « rétine normale ». Mais l'œil n'est pas indatable pour " +
         "autant : l'axe vasculaire (rang 6) tient",
    alerte:MODIF },

  { k:"cristallinArtefacts", l:"Cristallin : globules, vacuoles, fentes, décollement capsulaire",
    b:"rang 2/7 de l'ordre interne", d:"« Lens artifacts are present in nearly all fetal and neonatal eyes »",
    h:2, q:"mauvais",
    note:"prédicteur MAUVAIS par construction : la base est ~100 %, donc l'artefact n'est pas " +
         "informatif. Et il est indissociable d'une cataracte vraie — « Fixation and mechanical " +
         "damage to the lens can induce changes that resemble a nuclear cataract, making it " +
         "extremely difficult to diagnose on histology alone ». Le négatif de cataracte exige " +
         "l'inspection macroscopique du cristallin, pas la lame" },

  { k:"pigmentDisperse", l:"Pigment irien / ciliaire dispersé dans le vitré et les deux chambres",
    b:"rang 3/7 de l'ordre interne",
    d:"« dispersed throughout the vitreous cavity and the anterior and posterior ocular chamber »",
    h:3, q:"moyen",
    note:"interdit deux énoncés : ce n'est ni un essaimage tumoral ni un pigment d'hémorragie " +
         "ancienne, ET le négatif d'aniridie devient NON RENDABLE — « absence of the pigment " +
         "epithelium of the iris and ciliary body due to autolysis » a été décrit dans un angle " +
         "par ailleurs « regular developed ». La dépigmentation irienne de la rubéole est " +
         "inutilisable sur ce fond",
    alerte:MODIF },

  { k:"corneeEpithelium", l:"Épithélium et endothélium cornéens raréfiés ou rudimentaires",
    b:"rang 4/7 de l'ordre interne",
    d:"« autolytic changes most often affect the corneal epithelium and endothelium »",
    h:4, q:"moyen",
    note:"vu et nommé comme tel dans un œil de trisomie 18 par ailleurs normal : « Because of " +
         "autolysis, the epithelium and endothelium are only rudimentary ». Ce n'est ni une " +
         "paucité endothéliale, ni une sclérocornée — la sclérocornée se lit sur la structure du " +
         "stroma et le limbe, pas sur l'endothélium" },

  { k:"stromaCorneenOedeme", l:"Stroma cornéen œdémateux, délité",
    b:"rang 5/7 de l'ordre interne",
    d:"« Severe autolysis is characterized by an edematous corneal stroma »",
    h:5, q:"bon",
    note:"la source qualifie elle-même ce rang de lyse SÉVÈRE : si le stroma est œdémateux, l'œil " +
         "entier bascule vers l'ininterprétable. Ce n'est pas l'œdème cornéen central d'une " +
         "anomalie de Peters",
    alerte:MODIF },

  { k:"rang6Atteint", l:"Atteinte des structures RÉSISTANTES (EPR · stroma uvéal · choroïde · système hyaloïdien · nerf optique)",
    b:"rang 6/7 de l'ordre interne",
    d:"normalement conservées : « The retinal pigment epithelium is usually well preserved »",
    h:6, q:"moyen",
    note:"le rang 6 est censé tenir — « If present, the vascular system of the hyaloid artery is " +
         "usually well-preserved, as is the tunica vasculosa lentis anterior and posterior » et " +
         "« The optic nerve usually is well-preserved ». S'il est atteint, l'axe de datation " +
         "VASCULAIRE tombe à son tour et il ne reste aucun axe. C'est aussi le rang qui portait " +
         "l'argument du CHRPE (« the RPE is usually well preserved and is not prone to artifacts " +
         "of this kind ») : cet argument ne tient plus" },

  { k:"scleraLysee", l:"Sclérotique elle-même altérée",
    b:"rang 7/7 de l'ordre interne", d:"« The sclera usually is not affected by autolytic changes »",
    h:7, q:"moyen",
    note:"structure la plus résistante du globe : son altération signe une lyse au-delà de tout " +
         "l'ordre décrit. Aucune source ne donne de durée correspondante — ne pas en inventer une",
    alerte:MODIF }
];

/* ── 03 · Maturation — repères datés, pas des stades nommés ───────────────────
   « Cette fiche ne fabrique pas de stades » : pas d'équivalent oculaire du
   pseudoglandulaire/canaliculaire/sacculaire/alvéolaire. Ce qui suit est une
   échelle unique reconstruite depuis les 25 rangs du § 3.1, en gardant un
   repère par palier et en préfixant le compartiment (R/A/C/V/P). */
var STADES = [
  { k:"paupieresFusionnees", l:"P/A — paupières fusionnées, sinus marginal de l'iris présent", max:15 },
  { k:"neuroblastiques",     l:"R — INBL et ONBL distinguables, couche des cellules ganglionnaires visible", max:19,
    note:"borne basse de l'axe rétinien ; l'ora serrata du même palier (14 SA chez verdijk, « by " +
         "the sixth month » chez ernst) est une DIVERGENCE NON tranchée d'environ 10 semaines — " +
         "elle n'est pas utilisée ici comme jalon discriminant (§ 9.20)" },
  { k:"bowman",              l:"C — couche de Bowman détectable en microscopie optique", max:24,
    note:"« Bowman's layer can first be detected by light microscopy about week 17 » ; ernst date " +
         "le DÉBUT de la synthèse à la semaine 8 — ce n'est pas une divergence, les deux sources " +
         "ne parlent pas du même événement (§ 3.5)" },
  { k:"dixCouches",          l:"R — les dix couches rétiniennes identifiables en microscopie optique", max:29,
    note:"DIVERGENCE NON tranchée de 3 semaines sur le jalon le plus utilisé de la fiche : " +
         "verdijk « At week 25, all retinal layers … are seen by light microscopy » → 27 SA, " +
         "keeling « By the 22nd week, the retina is composed of ten layers similar in structure " +
         "to that in the adult » → 24 SA. Deux sources de même rang, aucun argument pour " +
         "départager : écrire « ≥ 24–27 SA selon la source », jamais une valeur unique (§ 9.19)" },
  { k:"paupieresSeparees",   l:"P/A — paupières séparées, sinus marginal de l'iris disparu", max:34,
    note:"trois valeurs échelonnées sur ~5 semaines (verdijk 29 SA · keeling « completely " +
         "separated by the end of the seventh month » · ernst « the eyelids open during week 24 ») " +
         "— non arbitrées. Et la séparation se fait « starting nasally and extending laterally » : " +
         "une paupière séparée en nasal et fusionnée en temporal est un état intermédiaire NORMAL, " +
         "pas une asymétrie" },
  { k:"hyaloideRegressee",   l:"V — artère hyaloïde complètement régressée", max:37,
    note:"« By week 34, it should have undergone complete regression » (→ 36 SA), avec « a bit of " +
         "variability, also between fellow eyes » : une asymétrie de régression hyaloïdienne seule " +
         "ne fait pas une asymétrie de maturation (§ 3.4)" },
  { k:"tvlRegressee",        l:"V — régression de la TVL antérieure achevée", max:42,
    note:"« regression is completed around week 35 » (→ 37 SA) ; à 40 SA la TVL antérieure est " +
         "« almost completely regressed » et l'angle iridocornéen « almost completely developed ». " +
         "Après ces bornes, les reliquats sont une VARIANTE ; avant elles, la même image est " +
         "l'état normal (§ 4.2.5, § 8.4)" },
  { k:"conesBatonnets",      l:"R — cônes et bâtonnets clairement visibles", max:99,
    note:"le livre inscrit lui-même la réserve dans son dernier repère : « the rods and cones are " +
         "clearly visible (obviously depending on the degree of autolytic changes) »" }
];

/* ── 03 bis · Biométrie et les deux axes catégoriels ──────────────────────────
   Les deux axes de MESURE sont les deux choses que la fiche exige d'écrire et
   que rien d'autre ne porte :
     · defs = le PLAN DE COUPE PROUVÉ. § 8.3 : « plan de coupe non PO » ne
       produit pas une lame lisible. C'est le seul verdict bloquant de la grille.
     · opts = l'AXE DE DATATION EFFECTIVEMENT UTILISÉ. § 3.4 : la discordance ne
       s'écrit qu'avec « l'axe utilisé nommé » — et § 2.3 : l'axe rétinien meurt
       au rang 1 pendant que l'axe vasculaire survit au rang 6. */

var MESURE = {
  titre:"Biométrie du globe (DAP · DC) et axes de lecture",
  defLabel:"plan de coupe prouvé — sans lui, ni DAP, ni angle, ni items pronostiques",
  optLabel:"axe de datation effectivement utilisé — à nommer dans le compte rendu",
  defs:[
    { k:"poProuve",   l:"PO prouvé : cornée + pupille + cristallin + rétine postérieure + tête du nerf optique sur la même coupe" },
    { k:"poPartiel",  l:"PO partiel : tête du nerf optique absente de la coupe" },
    { k:"blocEntier", l:"Globe entier non ouvert (< 6–8 mm) ou bloc de tête" },
    { k:"horsPO",     l:"Plan hors PO" }
  ],
  opts:[
    { k:"retinien",  l:"Axe rétinien (stratification) — détruit par la lyse" },
    { k:"anterieur", l:"Axe antérieur / angulaire — résistance intermédiaire" },
    { k:"vasculaire",l:"Axe vasculaire fœtal (hyaloïde, TVL) — conservé malgré la lyse" },
    { k:"aucun",     l:"Aucun axe utilisable — non évaluable pour autolyse" }
  ],
  champs:[
    { id:"dap",        label:"DAP — diamètre antéropostérieur (mm)", min:0, max:30, step:0.1 },
    { id:"dc",         label:"DC — diamètre cornéen (mm)",           min:0, max:20, step:0.1 },
    { id:"dapAdelphe", label:"DAP de l'œil adelphe (mm)",            min:0, max:30, step:0.1 }
  ]
};

/* Les valeurs intermédiaires du nomogramme (Fig. 2.7, 600 yeux, intervalle de
   prédiction à 95 %) sont perdues à l'extraction. Il ne reste QUE trois points
   écrits. Toute autre valeur retourne null : on n'interpole pas (§ 3.2, § 9.3). */
function normeNomogramme(sa){
  var P = [{ sa:20, dap:8, dc:4 }, { sa:36, dap:16, dc:8 }, { sa:42, dap:17.5, dc:10 }];
  for (var i = 0; i < P.length; i++) if (sa === P[i].sa) return P[i];
  return null;
}
function fr(x){ return String(x).replace(".", ","); }

function verdictMesure(){
  var plan = E.mesure.def, axe = E.mesure.opt, sa = num("sa");
  var dap = E.mesure.v.dap, dc = E.mesure.v.dc, adel = E.mesure.v.dapAdelphe;
  var cls = "ok", res = [], t;

  /* 1 — l'observation d'abord : le chiffre s'entre sans son référentiel. */
  var b = [];
  if (dap != null) b.push("DAP " + fr(dap) + " mm");
  if (dc  != null) b.push("DC " + fr(dc) + " mm");
  if (adel != null) b.push("DAP adelphe " + fr(adel) + " mm");
  t = b.length ? "Biométrie : " + b.join(" · ") + "." : "Biométrie non mesurée.";

  /* 2 — situer, mais seulement aux trois points publiés. */
  if (dap != null || dc != null){
    if (sa == null){
      cls = "warn";
      t += " Sans terme, aucune norme n'est appelable.";
    } else {
      var n = normeNomogramme(sa);
      if (!n){
        cls = "warn";
        t += " Aucune norme publiée à " + sa + " SA : le nomogramme n'a survécu à l'extraction " +
             "qu'en trois points (20 SA · 36 SA · terme 42 SA). Ne pas interpoler ; à un âge " +
             "intermédiaire l'étalon reste l'œil adelphe.";
      } else {
        t += " Norme publiée à " + n.sa + " SA : DAP " + fr(n.dap) + " mm, DC " + fr(n.dc) + " mm " +
             "— valeur à rapporter à l'intervalle de prédiction à 95 % de la Fig. 2.7, pas à la moyenne.";
        if (dap != null && dap < n.dap)
          t += " DAP sous la norme : la définition de la microphtalmie (« a total axial length at " +
               "least two standard deviations below the mean for age ») « cannot be directly " +
               "applied to fetal eyes » — ne pas la transposer.";
        if (dap != null && dap > n.dap)
          t += " DAP au-dessus de la norme : chercher la buphtalmie (globe augmenté, cristallin " +
               "aplati, excavation papillaire, stries de Haab), même nomogramme, même réserve de fixation.";
      }
    }
  }

  /* 3 — l'œil adelphe est le seul étalon disponible, et sa variabilité normale
     n'est publiée nulle part : c'est la lacune la plus gênante de la fiche. */
  if (dap != null && adel != null){
    var ecart = Math.round(Math.abs(dap - adel) * 10) / 10;
    t += " Écart entre les deux yeux : " + fr(ecart) + " mm — aucune source ne donne l'écart normal " +
         "attendu entre les deux yeux d'un même fœtus (§ 9.6) : on ne sait pas à partir de quelle " +
         "différence une asymétrie devient pathologique. Constater, ne pas seuiller.";
    if (cls === "ok") cls = "warn";
  }

  /* 4 — le DC : un seuil existe, il est post-natal, et il ne se transpose pas. */
  if (dc != null && dc < 10)
    t += " DC < 10 mm : « A cornea measuring less than 10 mm diameter in an otherwise normal eye is " +
         "considered to be a microcornea » — mais ce seuil est défini chez le NOUVEAU-NÉ, pas chez " +
         "le fœtus (§ 9.21). Une microcornée peut exister sans microphtalmie : le dire séparément.";
  if (dc != null && dc > 13)
    t += " DC > 13 mm : seuil de mégalocornée, à distinguer de la buphtalmie — même réserve d'âge.";

  /* 5 — le plan de coupe : le seul verdict bloquant. */
  if (!plan){
    cls = "bad";
    t += " PLAN DE COUPE NON DÉCLARÉ — tant qu'il ne l'est pas, la biométrie et l'angle ne sont pas " +
         "qualifiés et aucune conclusion morphologique n'est recevable.";
  } else if (plan === "horsPO"){
    cls = "bad";
    t += " PLAN HORS PO — la lame n'est pas lisible pour cet organe : ni le DAP, ni l'angle, ni les " +
         "trois items pronostiques du rétinoblastome (infiltration du nerf optique, envahissement " +
         "choroïdien, essaimage vitréen) ne sont évaluables. Ne rien conclure ; redemander des coupes.";
  } else if (plan === "poPartiel"){
    if (cls === "ok") cls = "warn";
    t += " Tête du nerf optique absente : ni l'hémorragie intrasclérale péripapillaire, ni le " +
         "colobome papillaire, ni l'excavation glaucomateuse ne se jugent sur cette coupe.";
  } else if (plan === "blocEntier"){
    if (cls === "ok") cls = "warn";
    t += " Globe non ouvert / bloc de tête : c'est la conduite juste (< 6–8 mm on n'ouvre pas, " +
         "en cyclopie « the eye may not be removed »), mais l'orientation PO n'est pas garantie sur " +
         "chaque niveau — lire coupe par coupe.";
  }

  /* 6 — l'axe de datation, l'autre exigence d'écriture de la fiche. */
  if (!axe){
    res.push("axe de datation non nommé — la discordance ne s'écrit qu'avec l'axe utilisé nommé (§ 3.4)");
  } else if (axe === "retinien"){
    t += " Axe retenu : rétinien.";
    if (E.retention.retineFragmentee === "present"){
      cls = "bad";
      t += " CONTRADICTION : la rétine est cochée fragmentée (rang 1 de l'ordre interne). L'axe " +
           "« nombre de couches » est mort — il ne se rattrape pas, ne s'interpole pas, ne se " +
           "déduit pas de l'épaisseur. Basculer sur l'axe vasculaire, conservé au rang 6.";
    } else {
      t += " Rappel : une rétine à dix couches se date « ≥ 24–27 SA selon la source », jamais par " +
           "une valeur unique (§ 9.19).";
    }
  } else if (axe === "vasculaire"){
    t += " Axe retenu : vasculaire fœtal — c'est l'axe qui survit à la macération, « If present, " +
         "the vascular system of the hyaloid artery is usually well-preserved, as is the tunica " +
         "vasculosa lentis anterior and posterior ».";
    if (E.retention.rang6Atteint === "present"){
      cls = "bad";
      t += " Mais le rang 6 est coché atteint : l'axe vasculaire est tombé lui aussi. Aucun axe " +
           "de datation ne reste — écrire non évaluable.";
    }
    if (PAIR && E.cote === "deux")
      res.push("sur l'axe vasculaire, une différence entre les deux yeux peut être physiologique " +
               "(« a bit of variability, also between fellow eyes ») : une asymétrie de régression " +
               "hyaloïdienne seule ne fait pas une asymétrie de maturation");
  } else if (axe === "anterieur"){
    t += " Axe retenu : antérieur / angulaire — le plus dense en repères (11 → 40 SA), de " +
         "résistance intermédiaire : l'angle reste lisible mais son épithélium pigmenté part au rang 3.";
  } else if (axe === "aucun"){
    cls = "bad";
    t += " AUCUN AXE UTILISABLE — écrire « non évaluable pour autolyse », qui n'est pas « normal ». " +
         "Dans une série publiée d'IMG, 16 % des yeux (4/25 en trisomies 13 et 18) ont été écartés " +
         "pour lyse sévère : ce n'est pas un échec de lecture, c'est le régime normal de l'organe.";
  }

  /* 7 — réserves */
  if (!E.prelev.macro)  res.push("macroscopie non confirmée — DAP, DC, transillumination et aspect du cristallin ne sont plus récupérables après la coupe");
  if (!E.prelev.planPO) res.push("plan PO non confirmé au prélèvement");
  if (PAIR && E.cote !== "deux" && adel == null)
    res.push("œil adelphe non mesuré — c'est le meilleur étalon disponible en microphtalmie unilatérale");
  if (!E.stade) res.push("aucun repère de maturation coché — la biométrie seule ne date pas un œil");
  if (res.length){ if (cls === "ok") cls = "warn"; t += " Réserves : " + res.join(" ; ") + "."; }
  return { cls:cls, txt:t };
}

/* ── 05 · Variantes normales ──────────────────────────────────────────────────
   Six entrées du § 4.2, plus les états normaux de la fenêtre temporelle (§ 8.4)
   qui sont, eux, la même image lue à un autre âge. */
var VARIANTES = [
  { k:"embryotoxon",     l:"Embryotoxon postérieur (ligne de Schwalbe proéminente, nodule collagène PAS-négatif)" },
  { k:"chrpe",           l:"Hypertrophie congénitale de l'EPR (CHRPE)" },
  { k:"hemIntraoculaire",l:"Hématopoïèse extramédullaire intraoculaire ou orbitaire" },
  { k:"pliDeLange",      l:"Pli de Lange — pli circulaire à l'ora serrata, architecture inchangée" },
  { k:"reliquatsTVL",    l:"Reliquats de TVL antérieure (taches étoilées sur le cristallin, brides de la collerette irienne)" },
  { k:"mittendorf",      l:"Point de Mittendorf (tache blanchâtre à la capsule postérieure)" },
  { k:"bergmeister",     l:"Papille de Bergmeister" },
  { k:"hyaloidePresente",l:"Artère hyaloïde présente AVANT 36 SA" },
  { k:"tvlPresente",     l:"TVL antérieure présente AVANT 37 SA" },
  { k:"peripherieNonVasc",l:"Rétine périphérique temporale non vascularisée avant la naissance" },
  { k:"ganglionnairePeriph",l:"Raréfaction ganglionnaire à prédominance PÉRIPHÉRIQUE depuis 21 SA" },
  { k:"mesenchymeAngle", l:"Trabéculum encore recouvert de mésenchyme avant ~28 SA" },
  { k:"nerfPeuMyelinise",l:"Nerf optique peu myélinisé et uvée peu pigmentée au terme" },
  { k:"foveaPlate",      l:"Fovéa sans dépression franche au terme" },
  { k:"dilatateurIncomplet",l:"Muscle dilatateur de l'iris incomplet avant 34 SA" },
  { k:"paupiereNasale",  l:"Paupière séparée en nasal, encore fusionnée en temporal" }
];

/* ── 06 · Signes ──────────────────────────────────────────────────────────────
   On coche ce qu'on voit, un signe à la fois. Aucun nom de maladie ici : les
   noms se lisent en dessous, dans DIAGS, par association des signes cochés.
   Sclérocornée et anomalie de Peters se chevauchent, et la classification y est
   « not as clear as reported in the literature » — raison de plus de ne cocher
   que des signes. */
var SIGNES = [
  /* Globe, orbite, taille */
  { k:"orbiteSansStructure", l:"Aucune structure oculaire retrouvée dans l'orbite, coupes étagées épuisées",
    meta:"critère microscopique ET négatif : n'existe qu'après épuisement des coupes" },
  { k:"orbiteMesodermique", l:"Orbite petite mais contenant graisse, muscle oculomoteur, glande lacrymale",
    meta:"ne contredit pas l'anophtalmie" },
  { k:"residusGlobe",   l:"Résidus ou ébauches de globe : structures scléro-adipeuses à amas pigmentés" },
  { k:"dapBas",         l:"DAP sous la norme du terme (ou nettement inférieur à l'œil adelphe)" },
  { k:"dapHaut",        l:"DAP au-dessus de la norme du terme" },
  { k:"dcBas",          l:"DC abaissé (microcornée), globe par ailleurs de taille conservée" },
  { k:"globeSymetriquePetit", l:"Œil symétriquement petit avec choroïde ET sclère épaissies",
    meta:"nanophtalmie — à ne pas confondre avec la microphtalmie relative" },
  { k:"cristallinAplati", l:"Cristallin aplati" },
  { k:"excavationPapillaire", l:"Excavation de la tête du nerf optique" },
  { k:"descemetEnroulee", l:"Enroulement de la membrane de Descemet (Descemet curl)",
    meta:"traduction histologique des stries de Haab" },
  { k:"kysteScleralPost", l:"Masse kystique de la sclère postérieure",
    meta:"microphtalmie avec kyste" },
  { k:"muscleLisseChoristome", l:"Muscle lisse choristomateux dans la paroi du kyste (IHC)" },

  /* Colobome */
  { k:"defautParoi",    l:"Défaut de paroi à bords NETS, quadrant inféro-nasal" },
  { k:"progressifEtage",l:"Apparition et disparition PROGRESSIVES du défaut en coupes étagées",
    meta:"critère de colobome vrai, pas d'artefact" },
  { k:"pasPerforation", l:"Aucune perforation mécanique ailleurs sur le globe" },
  { k:"scleraAmincie",  l:"Sclère amincie sous le défaut, comblé de rétine dysplasique" },
  { k:"colobomePapille",l:"Défaut papillaire bordé d'EPR, en communication avec la rétine",
    meta:"se lit à faible grossissement" },
  { k:"eprBruchDiscordants", l:"Perte choroïdienne dont les limites ne coïncident PAS avec celles de l'EPR, Bruch persistante",
    meta:"signe de dommage mécanique, pas de colobome" },
  { k:"globePerfore",   l:"Globe perforé au prélèvement" },

  /* Segment antérieur */
  { k:"sclerocornee",   l:"Cornée à vaisseaux et lamelles collagènes anormales, opacité périphérique" },
  { k:"bowmanAbsente",  l:"Absence FOCALE de la couche de Bowman (PAS)" },
  { k:"descemetAbsente",l:"Absence FOCALE de la membrane de Descemet et de l'endothélium adjacent (PAS)" },
  { k:"stromaPostAbsent", l:"Absence focale du stroma cornéen postérieur" },
  { k:"opaciteCentrale",l:"Opacité cornéenne CENTRALE" },
  { k:"adherenceKeratoLent", l:"Adhérence kératolenticulaire ou iridocornéenne" },
  { k:"tvlAttacheeCornee", l:"TVL antérieure attachée à la face postérieure de la cornée",
    meta:"indice indirect de fixation lenticulaire quand la synéchie a été lysée" },
  { k:"angleRudimentaire", l:"Angle iridocornéen resté rudimentaire au terme" },
  { k:"schwalbeAnteposee", l:"Ligne de Schwalbe antéposée et ÉLARGIE, brides mésodermiques vers le stroma irien" },
  { k:"anomaliesIriennes", l:"Corectopie ou hypoplasie du stroma irien" },
  { k:"anomExtraoculaires", l:"Anomalies extra-oculaires associées (dents, os de la face)" },
  { k:"descemetEpaissie", l:"Membrane de Descemet ÉPAISSIE avec endothélium anormal",
    meta:"CHED — « has not yet been reported in a fetus » : hors périmètre fœtal" },

  /* Cristallin */
  { k:"wedl",           l:"Cellules de Wedl (bladder cells)" },
  { k:"noyauxRetenus",  l:"Rétention des noyaux dans le nucleus du cristallin" },
  { k:"lenticone",      l:"Amincissement capsulaire avec bombement du cortex (lenticône)" },
  { k:"fibreuxSousCapsulaire", l:"Tissu fibreux sous-capsulaire (cataracte polaire)" },
  { k:"epithCristallinNecrose", l:"Nécrose ou prolifération de l'épithélium cristallinien" },
  { k:"liquefaction",   l:"Liquéfaction extensive, fibres mal formées, macrophages" },
  { k:"cristallinCompact", l:"Cristallin « plus compact » ou noyau bien distinguable",
    meta:"ne suffit pas : « further verification is required »" },
  { k:"macroCristallin",l:"Aspect cataracté CONFIRMÉ à l'inspection macroscopique ou en échographie",
    meta:"le seul accès hors lame" },
  { k:"microphakie",    l:"Cristallin petit, aplati, discoïde (microphakie / sphérophakie)" },
  { k:"aphakie",        l:"Aphakie ou résorption du cristallin" },
  { k:"oxalate",        l:"Cristaux biréfringents en lumière polarisée dans le cristallin" },

  /* Vitré et système vasculaire fœtal */
  { k:"cordonFibrovasc",l:"Cordon fibrovasculaire rétrolenticulaire au contact des procès ciliaires" },
  { k:"rotationIridoCiliaire", l:"Rotation du complexe irido-ciliaire vers le cristallin",
    meta:"signe indirect, à faible grossissement" },
  { k:"metaplasieChondroide", l:"Métaplasie chondroïde intraoculaire" },
  { k:"calcificationsRetine", l:"Calcifications au contact d'une rétine dystrophique" },
  { k:"hyaloideApres36", l:"Système hyaloïdien encore présent APRÈS 36 SA" },

  /* Rétine */
  { k:"rosettesOrganisees", l:"Rosettes rétiniennes à architecture ORGANISÉE, lumière centrale",
    meta:"lisibles malgré l'autolyse — c'est l'organisation, pas la présence" },
  { k:"excroissances",  l:"Excroissances rétiniennes",
    meta:"équivoques, « may be attributed to autolysis » sur œil macéré" },
  { k:"retineDysplasiqueColobome", l:"Tissu rétinien dysplasique comblant un colobome" },
  { k:"hemorragieRetinienne", l:"Hémorragie rétinienne" },
  { k:"surface2030",    l:"Hémorragie couvrant 20–30 % ou plus de la surface rétinienne",
    meta:"mesure de SURFACE, pas un compte de foyers" },
  { k:"toutesCouches",  l:"Toutes les couches rétiniennes intéressées par l'hémorragie" },
  { k:"typeHemorragie", l:"Type d'hémorragie décrit (en flammèche · punctiforme · en tache)" },
  { k:"pliPerimaculaire", l:"Pli périmaculaire semi-circulaire, en cratère, vu en MACROSCOPIE" },
  { k:"hemGaineNerf",   l:"Hémorragie de la gaine du nerf optique" },
  { k:"hemIntrasclerale", l:"Hémorragie intrasclérale péripapillaire",
    meta:"« highly suspect for AHT »" },
  { k:"hemosiderine",   l:"Hémosidérine (Perls) dans la rétine, la gaine ou l'orbite" },
  { k:"lesionAxonale",  l:"Lésion axonale du nerf optique (β-APP, ubiquitine)" },
  { k:"proliferationFusiforme", l:"Prolifération de cellules mésenchymateuses fusiformes à la jonction vascularisé / non vascularisé" },
  { k:"neovaisseauxCD34", l:"Néovaisseaux CD34+ franchissant la limitante interne, dans un mésenchyme CD34−" },
  { k:"neNeQuePli",     l:"Pli périphérique isolé à la jonction, sans prolifération",
    meta:"artefact de fixation : le pli n'est pas la lésion" },
  { k:"cd34CentralSeul",l:"CD34 : vaisseaux rétiniens présents seulement du côté CENTRAL du pli",
    meta:"la preuve objective du pli de Lange" },

  /* Nerf optique, anencéphalie */
  { k:"nerfAminci",     l:"Nerfs optiques amincis, faits surtout d'éléments conjonctifs" },
  { k:"nerfNAtteintPasForamen", l:"Nerfs optiques n'atteignant pas le foramen optique" },
  { k:"chiasmaAbsent",  l:"Chiasma optique absent" },
  { k:"ganglionnaireCentrale", l:"Raréfaction des cellules ganglionnaires à prédominance CENTRALE, noyaux pycnotiques",
    meta:"la topographie tranche, pas le compte" },
  { k:"fibresOptiquesPerdues", l:"Perte de la couche des fibres optiques" },
  { k:"protuberanceVasculaire", l:"Prolifération vasculaire de la rétine et du vitré dans un contexte anencéphalique" },

  /* Infections */
  { k:"pseudokystesRetine", l:"Pseudokystes à bradyzoïtes de 4–7 μm dans la rétine" },
  { k:"pseudokystesNerf", l:"Pseudokystes dans le NERF OPTIQUE",
    meta:"site souvent oublié : le nerf se regarde même si la rétine est négative" },
  { k:"ihcToxo",        l:"IHC anti-Toxoplasma positive alors que l'HES ne montrait rien" },
  { k:"necroseRetinienne", l:"Nécrose rétinienne" },
  { k:"nevriteOptique", l:"Névrite optique" },
  { k:"chorioretiniteCicatricielle", l:"Cicatrices choriorétiniennes atrophiques et pigmentées, en cratère" },
  { k:"gramPositif",    l:"Bacilles Gram positif dans les lésions" },
  { k:"meningiteNerf",  l:"Méningite du nerf optique" },
  { k:"cataracteNucleaireNoyaux", l:"Cataracte nucléaire à noyaux karyorrhectiques retenus" },
  { k:"uveiteNonGranulomateuse", l:"Uvéite non granulomateuse (chorioïdite monomorphonucléée)" },
  { k:"perteDilatateur",l:"Perte focale de l'épithélium ciliaire et irien avec perte du dilatateur" },
  { k:"owlsEye",        l:"Inclusions nucléaires de 8–10 μm à halo clair (owls' eyes)" },
  { k:"placentaCMV",    l:"Placenta porteur des mêmes inclusions cytomégaliques" },
  { k:"necroseHemorragiqueCalcifiee", l:"Nécrose rétinienne hémorragique étendue AVEC calcification" },
  { k:"cowdryB",        l:"Inclusions de Cowdry B" },
  { k:"infiltratChoroidien", l:"Infiltrat lymphocytaire choroïdien",
    meta:"détectable malgré l'autolyse — son négatif a de la valeur" },

  /* Tumeurs */
  { k:"masseOrbitaire", l:"Masse orbitaire circonscrite mais non encapsulée, souvent multikystique" },
  { k:"troisFeuillets", l:"Dérivés des trois feuillets sur la même lame" },
  { k:"neuroepitheliumImmature", l:"Neuroépithélium IMMATURE, quantifié en champs à 40× sur la lame la plus atteinte" },
  { k:"yolkSac",        l:"Contingent vitellin (α-fœtoprotéine, glypicane-3)" },
  { k:"masseRetinienne",l:"Masse rétinienne blanche exophytique derrière le cristallin" },
  { k:"cellulesRondesBleues", l:"Tumeur à cellules rondes bleues très cellulaire, mitoses fréquentes" },
  { k:"flexnerWintersteiner", l:"Rosettes de Flexner-Wintersteiner (lumière à fines extensions cytoplasmiques, sans neuropile)" },
  { k:"fleurettes",     l:"Fleurettes (différenciation photoréceptrice)" },
  { k:"necroseManchons",l:"Nécrose à manchons périvasculaires de cellules viables, calcifications dans la nécrose" },
  { k:"infiltrationNerf", l:"Infiltration du nerf optique par la tumeur" },
  { k:"envahissementChoroidien", l:"Envahissement choroïdien" },
  { k:"essaimageVitreen", l:"Essaimage vitréen" },
  { k:"synaptoNSE",     l:"Synaptophysine / NSE positives" },
  { k:"macrophagesSpumeux", l:"Vaisseaux télangiectasiques à macrophages spumeux dans la paroi",
    meta:"maladie de Coats — pseudorétinoblastome clinique, pas histologique" },
  { k:"medullaryEpithelium", l:"Prolifération reproduisant l'épithélium médullaire de la cupule optique embryonnaire, au corps ciliaire" },
  { k:"heteroplasiques",l:"Éléments hétéroplasiques (cartilage hyalin, muscle, rhabdomyoblastes, tissu cérébral)" },
  { k:"extensionExtraoculaire", l:"Extension extra-oculaire de la tumeur" }
];

/* ── 06 bis · Associations — affichées, jamais cochées ────────────────────────
   Le nom se déduit des signes. « cle » est le signe pivot : sans lui le compte
   peut être atteint sans que l'association tienne. Sur l'œil fœtal, on décrit
   « des constellations, on ne coche pas des entités ». */
var DIAGS = [
  { k:"anophtalmie", l:"Anophtalmie", cle:"orbiteSansStructure", min:1,
    signes:["orbiteSansStructure","orbiteMesodermique"],
    stop:" — le critère est MICROSCOPIQUE et NÉGATIF : il n'existe qu'après épuisement des coupes " +
         "étagées, « A detailed stepwise sectioning and microscopic investigation of the orbital " +
         "contents is mandatory to differentiate between anophthalmia and microphthalmia ». " +
         "Ne jamais écrire « anophtalmie » sur une coupe unique. " +
         "Trouver de la graisse, du muscle et une glande lacrymale ne contredit pas l'anophtalmie : " +
         "« The anophthalmic orbit is small, but does contain mesodermal structures like fat, " +
         "extraocular muscle tissue, and lacrimal gland ». Si des résidus de globe sont retrouvés, " +
         "c'est une microphtalmie — écrire le doute sous la forme « micro/anophtalmie »." },

  { k:"microphtalmie", l:"Microphtalmie", cle:"dapBas", min:2,
    signes:["dapBas","residusGlobe","dcBas","cristallinAplati"],
    stop:" — « The definition of microphthalmia—a total axial length at least two standard " +
         "deviations below the mean for age—cannot be directly applied to fetal eyes. Although " +
         "nomograms exist, the measurements are not as precise as in living children, because of " +
         "fixation and other artifacts. » Le seuil existe et le livre dit de ne pas l'appliquer tel " +
         "quel. « For unilateral cases, comparison to the fellow eye may be helpful » — mais aucune " +
         "source ne donne l'écart normal entre deux yeux (§ 9.6). Un DC bas sans DAP bas est une " +
         "MICROCORNÉE sans microphtalmie : les dire séparément. Ne pas oublier les causes non " +
         "génétiques : rubéole, CMV, EBV, alcool, thalidomide, acide rétinoïque, anticonvulsivants." },

  { k:"nanophtalmie", l:"Nanophtalmie", cle:"globeSymetriquePetit", min:2,
    signes:["globeSymetriquePetit","dapBas"],
    stop:" — la nanophtalmie est un œil SYMÉTRIQUEMENT petit avec choroïde et sclère épaissies, " +
         "sur un continuum depuis l'œil hypermétrope ; ce n'est pas une microphtalmie antérieure " +
         "ou postérieure relative. Ne pas les confondre dans la conclusion." },

  { k:"microphtalmieKyste", l:"Microphtalmie avec kyste", cle:"kysteScleralPost", min:2,
    signes:["kysteScleralPost","muscleLisseChoristome","dapBas","defautParoi"],
    stop:" — kyste et colobome relèvent du même défaut de fermeture de la fissure embryonnaire : " +
         "les chercher ensemble. La paroi du kyste est faite de sclère ou de gaine du nerf optique, " +
         "avec éventuellement du muscle lisse choristomateux (à révéler en IHC) et de la graisse. " +
         "C'est l'indication n° 1 de la voie postérieure, avec l'orbite entière sur la table." },

  { k:"buphtalmie", l:"Buphtalmie", cle:"dapHaut", min:2,
    signes:["dapHaut","cristallinAplati","excavationPapillaire","descemetEnroulee"],
    stop:" — ne pas écrire « glaucome congénital » depuis la micro seule : décrire l'excavation, " +
         "l'aplatissement du cristallin et l'état de la Descemet. Les stries de Haab sont des " +
         "« vertical paralimbal Descemet tears », vues histologiquement comme un enroulement. " +
         "Chercher la cause sur la même lame : irido-trabéculodysgénésie ou anomalie de Peters ; " +
         "et les formes systémiques (aniridie, NF1, Sturge-Weber). Le DAP se lit sur le même " +
         "nomogramme que la microphtalmie, avec la même réserve de fixation." },

  { k:"colobome", l:"Colobome", cle:"defautParoi", min:2,
    signes:["defautParoi","progressifEtage","pasPerforation","scleraAmincie","colobomePapille",
            "retineDysplasiqueColobome"],
    stop:" — trois critères CUMULABLES et non interchangeables : bords nets · progressivité en " +
         "coupes sériées · absence de perforation ailleurs. « In step sections, the gradual " +
         "appearance and disappearance of a genuine coloboma become visible. » Le colobome est " +
         "l'une des trois lésions lisibles malgré la lyse (« can be detected in eyes with severe " +
         "autolytic changes, as these lesions are clearly demarcated ») : son négatif garde de la " +
         "valeur — mais seulement si les coupes ont été étagées. Il ne se grade pas : il a un " +
         "SIÈGE, et une règle fonctionnelle non morphologique (« the more posterior the coloboma, " +
         "the more it affects vision »). La Table 5.1 des syndromes est une liste d'orientation " +
         "pour la conclusion, pas un critère micro." },

  { k:"artefactMecanique", l:"Dommage mécanique de la paroi — pas un colobome", cle:"eprBruchDiscordants", min:1,
    signes:["eprBruchDiscordants","globePerfore","defautParoi"],
    stop:" — contre-exemple donné par la source elle-même : « The choroid is focally missing, " +
         "whereas Bruch's membrane is still present … The RPE is not absent in exactly the same " +
         "area as the choroid ». Une perte choroïdienne dont les limites ne coïncident pas avec " +
         "celles de l'EPR est mécanique. Une perforation ailleurs sur le globe est un indice " +
         "supplémentaire d'artefact." },

  { k:"dysgenesieSA", l:"Dysgénésie du segment antérieur (terme parapluie)", min:2,
    signes:["sclerocornee","angleRudimentaire","bowmanAbsente","descemetAbsente","stromaPostAbsent",
            "schwalbeAnteposee","anomaliesIriennes"],
    stop:" — la constellation micro constante est à trois termes : « a combination of findings " +
         "consisting of sclerocornea, rudimentary development of the chamber angle, and " +
         "cataractous changes (in association with PHPV) ». C'est elle qu'on décrit, pas un nom " +
         "d'anomalie. Terminologie périmée à ne pas réutiliser : dysgénésie mésodermique, anterior " +
         "chamber cleavage syndrome — « it has been shown that the affected tissues derive from " +
         "the neural crest ». Nommer un embryotoxon postérieur ne suffit pas à conclure à une " +
         "dysgénésie : c'est l'extrémité bénigne du spectre, présent dans 15–30 % de la population." },

  { k:"peters", l:"Anomalie de Peters", cle:"opaciteCentrale", min:3,
    signes:["opaciteCentrale","adherenceKeratoLent","descemetAbsente","stromaPostAbsent",
            "angleRudimentaire","tvlAttacheeCornee"],
    stop:" — sclérocornée et anomalie de Peters SE RECOUVRENT et ne se départagent pas de façon " +
         "fiable sur l'œil fœtal — sclérocornée et anomalie de Peters se chevauchent, et la " +
         "classification y est « not as clear as reported in the literature ». " +
         "Décrire les absences membranaires observées, laisser la conclusion nommer. Et surtout : " +
         "une ABSENCE de synéchie kératolenticulaire ne réfute PAS Peters sur œil macéré — « The " +
         "missing attachment of the lens to the cornea, also not detectable in step sections, may " +
         "be attributed to the severe autolytic changes ». Chercher alors la TVL antérieure " +
         "attachée à la cornée comme indice indirect." },

  { k:"sclerocorneeC", l:"Sclérocornée", cle:"sclerocornee", min:2,
    signes:["sclerocornee","bowmanAbsente","descemetAbsente"],
    stop:" — « Bowman's layer and Descemet membrane (with the adjacent corneal endothelium) may be " +
         "absent » : l'absence est FOCALE et ne se lit pas sur HES seul, le PAS est nécessaire. Un " +
         "épithélium ou un endothélium rudimentaire est un rang 4 d'autolyse, pas une sclérocornée : " +
         "la sclérocornée se lit sur la structure du stroma et le limbe." },

  { k:"axenfeldRieger", l:"Spectre Axenfeld-Rieger", cle:"schwalbeAnteposee", min:2,
    signes:["schwalbeAnteposee","anomaliesIriennes","anomExtraoculaires"],
    stop:" — quatre niveaux à ne pas confondre : anomalie d'Axenfeld (Schwalbe antéposée et élargie " +
         "+ brides) · syndrome d'Axenfeld (+ glaucome juvénile, non jugeable chez le fœtus) · " +
         "anomalie de Rieger (+ anomalies iriennes) · syndrome de Rieger (+ malformations " +
         "extra-oculaires, dents et os de la face). Le glaucome ne s'observe pas sur une lame " +
         "fœtale : ne pas franchir le niveau que la morphologie autorise. Et sur analyse " +
         "génétique, « the same mutation can result in a spectrum of clinical findings »." },

  { k:"ched", l:"CHED — hors périmètre fœtal", cle:"descemetEpaissie", min:1,
    signes:["descemetEpaissie","opaciteCentrale"],
    stop:" — DIVERGENCE de fenêtre, pas de morphologie : « CHED has not yet been reported in a " +
         "fetus, but it can be present in newborns ». Sur un fœtus, ce nom ne se pose pas. Une " +
         "Descemet épaissie chez un fœtus demande d'abord d'écarter l'artefact et de rediscuter " +
         "le terme, pas de reprendre l'étiquette." },

  { k:"cataracte", l:"Cataracte fœtale", cle:"macroCristallin", min:2,
    signes:["macroCristallin","wedl","noyauxRetenus","lenticone","fibreuxSousCapsulaire",
            "epithCristallinNecrose","liquefaction","cristallinCompact"],
    stop:" — LE PIVOT N'EST PAS HISTOLOGIQUE, et c'est voulu : « A clinical inspection in " +
         "newborns/children respectively a macroscopic inspection of the lens in fetal eyes should " +
         "be performed to guide the ophthalmic pathologist in diagnosing a fetal cataract ». La " +
         "cataracte fœtale ne se diagnostique pas sur la lame seule. Fond du problème : « Lens " +
         "artifacts are present in nearly all fetal and neonatal eyes » — la base est ~100 %, donc " +
         "l'artefact n'est pas informatif. Un cristallin « plus compact » ou un noyau distinguable " +
         "ne suffisent pas : « further verification is required to reliably diagnose a cataract ». " +
         "Et les deux formes les plus difficiles sont celles qui n'ont AUCUN signe positif : " +
         "« isolated cataracts also can be found; they are much more difficult to diagnose, " +
         "especially nuclear or total cataracts, which lack the characteristic Wedl cells ». " +
         "Le type est TOPOGRAPHIQUE " +
         "(sous-capsulaire, nucléaire, corticale, suturale, totale) : il ne se convertit pas en " +
         "sévérité. Écrire « aspect compatible avec » et demander la corrélation macro/échographique." },

  { k:"lowe", l:"Microphakie / sphérophakie — évoquer un syndrome de Lowe", cle:"microphakie", min:2,
    signes:["microphakie","noyauxRetenus","aphakie","oxalate"],
    stop:" — cristallin « small, flattened, and discoid » avec rétention des noyaux : c'est une " +
         "orientation pour la conclusion, pas un diagnostic de lame. Une résorption du cristallin " +
         "s'observe aussi après traumatisme, infection congénitale ou dans un Hallermann-Streiff. " +
         "Les cristaux d'oxalate biréfringents peuvent être une hyperoxalurie ou une trouvaille " +
         "isolée : les deux lectures restent ouvertes." },

  { k:"phpv", l:"PHPV — persistance et hyperplasie du vitré primitif", cle:"cordonFibrovasc", min:2,
    signes:["cordonFibrovasc","rotationIridoCiliaire","metaplasieChondroide","calcificationsRetine",
            "hyaloideApres36","wedl"],
    stop:" — DIVERGENCE DE FENÊTRE, non quantifiée par la source : le PHPV est un défaut de " +
         "régression du système même dont la régression date l'œil. Avant 34–36 SA, un système " +
         "hyaloïdien présent est NORMAL ; il ne devient un PHPV que par son caractère hyperplasique " +
         "et fibrovasculaire, pas par sa persistance. La source « ne dit jamais quelle épaisseur, " +
         "quelle cellularité ou quel diamètre fait basculer un vestige normal en PHPV » (§ 9.8) : " +
         "la rotation du complexe irido-ciliaire est un SIGNE INDIRECT, pas un seuil. Ne pas " +
         "appeler PHPV une artère hyaloïde persistante simple avant terme, et ne pas conclure à un " +
         "rétinoblastome devant une masse rétrolenticulaire. Attention aussi à la rétraction du " +
         "vitré à la fixation, qui mime un vitré « dense »." },

  { k:"dysplasieRetinienne", l:"Dysplasie rétinienne", cle:"rosettesOrganisees", min:2,
    signes:["rosettesOrganisees","excroissances","retineDysplasiqueColobome","calcificationsRetine"],
    /* Guillemets droits dans le verbatim : littéral en apostrophes simples, pas d'échappement. */
    stop:" — le pivot est la rosette ORGANISÉE : " +
         '« retinal rosettes usually can be distinguished from retinal fragments by their "organized" architecture »' +
         ". Un fragment rétinien " +
         "anguleux sans lumière est un rang 1 d'autolyse, pas une dysplasie. Sur un œil macéré, " +
         "des excroissances seules ne suffisent pas — la source le dit d'elle-même : « Retina with " +
         "mild, equivocal retinal excrescences. This finding may be attributed to autolysis ». " +
         "AUCUN grade ni stade de dysplasie rétinienne fœtale n'existe dans les sources : ne pas " +
         "en fabriquer un. Et une rosette de dysplasie n'est pas une rosette de " +
         "Flexner-Wintersteiner : c'est le contenu de la lumière et le fond cellulaire qui " +
         "séparent, pas la forme ronde." },

  { k:"tcna", l:"Hémorragie rétinienne — contexte de TCNA", cle:"surface2030", min:3,
    signes:["hemorragieRetinienne","surface2030","toutesCouches","typeHemorragie","pliPerimaculaire",
            "hemGaineNerf","hemIntrasclerale","lesionAxonale","hemosiderine"],
    stop:" — l'hémorragie rétinienne n'est PAS pathognomonique : « it can be found in about 20% of " +
         "neonates shortly after uncomplicated birth ». Ce qui compte est la SURFACE " +
         "(« Retinal hemorrhages covering 20–30% of the retina must be regarded as a very strong " +
         "indicator of AHT ») et le NOMBRE DE COUCHES (« Involvement of all separate retinal layers " +
         "with hemorrhage is frequently observed in AHT cases ») — deux mesures CONTINUES, à rendre " +
         "telles quelles, jamais converties en stade. « unilateral retinal hemorrhage does not " +
         "exclude AHT » : l'asymétrie n'est pas un argument d'exclusion, et les deux yeux doivent " +
         "être examinés. Le pli périmaculaire est documenté hors TCNA (écrasement sévère, " +
         "secouement lors d'une réanimation par des proches non formés après noyade accidentelle, " +
         "leucémie) et se distingue du pli de Lange par le CD34. L'hémosidérine borne un PLANCHER, " +
         "jamais un plafond (6–8 semaines selon la British Child Abuse Working Party, mais " +
         "persistance documentée à 32 mois) — et une hématopoïèse extramédullaire intraoculaire " +
         "INVALIDE cette datation. Citer explicitement le différentiel de la Table 6.1." },

  { k:"rop", l:"Rétinopathie du prématuré — différentiel, pas une attente fœtale",
    cle:"proliferationFusiforme", min:2,
    signes:["proliferationFusiforme","neovaisseauxCD34","neNeQuePli"],
    stop:" — PRÉALABLE ABSOLU : « ROP is not seen in fetal eyes because the disease develops after " +
         "birth in the immature retina. » Sur un fœtus, ce diagnostic ne se pose pas ; il n'entre " +
         "ici que comme différentiel de l'hémorragie rétinienne. Ce qui fait la ROP est la " +
         "prolifération fusiforme et les néovaisseaux CD34+, PAS le pli : un pli périphérique se " +
         "forme à la fixation exactement à cette jonction. Et la jonction vascularisé / non " +
         "vascularisé est physiologiquement TEMPORALE avant la naissance. Les stades de ROP sont " +
         "OPHTALMOSCOPIQUES : la source ne distingue que non prolifératif / prolifératif — ne pas " +
         "grader une lame en stades ROP." },

  { k:"anencephalie", l:"Atteinte oculaire de l'anencéphalie ou de l'hydranencéphalie",
    cle:"ganglionnaireCentrale", min:2,
    signes:["ganglionnaireCentrale","nerfAminci","nerfNAtteintPasForamen","chiasmaAbsent",
            "fibresOptiquesPerdues","protuberanceVasculaire"],
    stop:" — c'est la TOPOGRAPHIE qui tranche, pas le compte : la réduction ganglionnaire " +
         "physiologique existe aussi (21 SA) mais elle est à prédominance PÉRIPHÉRIQUE, alors " +
         "qu'ici la perte commence au CENTRE dès ~14 SA et devient globale vers 21–22 SA. Cette " +
         "opposition est une DÉDUCTION CROISÉE : la source dit « peripheral-predominant » d'un côté " +
         "et « central retina » de l'autre, mais ne les oppose jamais explicitement et ne donne " +
         "aucun seuil chiffré (§ 9.9). Le critère siège sur la structure de RANG 1 de l'ordre " +
         "d'autolyse : ne rien conclure sur un œil macéré. « At early fetal stages, the eyes may " +
         "look relatively normal » — un œil normal avant ~14 SA ne réfute rien. Enfin l'œil ne " +
         "distingue pas les deux entités : « The histopathologic ocular changes in hydranencephaly " +
         "appear identical to those seen in anencephaly ». Ne pas conclure à une hypoplasie " +
         "primitive du nerf optique, et ne pas lire la prolifération vasculaire associée comme une ROP." },

  { k:"toxoplasmose", l:"Toxoplasmose oculaire", min:1,
    signes:["pseudokystesRetine","pseudokystesNerf","ihcToxo","necroseRetinienne","nevriteOptique",
            "chorioretiniteCicatricielle"],
    stop:" — FAUX NÉGATIF ATTENDU SUR HES SEULE : « Tissue cysts were not detected by light " +
         "microscopy in the investigated eyes. However, immunohistochemical stains revealed " +
         "parasites in the fetal and neonatal eyes ». Chez le fœtus et le nouveau-né, un négatif " +
         "HES n'est pas un négatif toxoplasmose : l'IHC est le seul test qui a rendu positif dans " +
         "leur série. Le nerf optique doit être regardé même si la rétine est négative " +
         "(« pseudocysts also may be present in the optic nerve »). Une cicatrice ne dit pas " +
         "l'activité : « Most retinal lesions seen after birth do not contain microorganisms ». Ne " +
         "pas confondre les amas d'EPR hyperplasique post-infectieux avec un CHRPE." },

  { k:"listeriose", l:"Listériose oculaire", cle:"gramPositif", min:2,
    signes:["gramPositif","meningiteNerf","necroseRetinienne"],
    stop:" — c'est l'atteinte du NERF, pas de la rétine, qui porte le diagnostic oculaire : la " +
         "méningite du nerf optique impose d'avoir conservé le nerf sur toute sa longueur " +
         "intra-orbitaire. Un négatif rendu sur un nerf absent de la coupe n'est pas un négatif." },

  { k:"rubeole", l:"Atteinte oculaire de la rubéole", cle:"cataracteNucleaireNoyaux", min:2,
    signes:["cataracteNucleaireNoyaux","uveiteNonGranulomateuse","perteDilatateur"],
    stop:" — « No ocular histological features of rubella may be found after elective pregnancy " +
         "termination. » Dans le contexte le plus fréquent en fœtopathologie, l'œil peut être " +
         "normal et un œil normal NE RÉFUTE PAS l'infection. La perte focale de l'épithélium " +
         "pigmentaire irien et ciliaire est aussi un rang 3 d'autolyse : sur œil macéré ce critère " +
         "est INUTILISABLE, c'est la cataracte à noyaux retenus qui porte. Un dilatateur incomplet " +
         "avant 34 SA est normal. Ne pas conclure à une aniridie sur une dépigmentation irienne." },

  { k:"cmv", l:"Infection à cytomégalovirus", cle:"owlsEye", min:1,
    signes:["owlsEye","placentaCMV","necroseRetinienne"],
    stop:" — « Not all fetal eyes present the typical histopathological features of CMV infection " +
         "(enlarged cells with inclusion bodies). The eyes may be very autolytic (especially in " +
         "cases of intrauterine death), with the " +
         "retina being fragmented. » L'autolyse détruit d'abord le tissu où l'on cherche " +
         "l'inclusion : c'est exactement le rang 1. Ne jamais conclure à l'absence de CMV sur une " +
         "rétine fragmentée — croiser avec le PLACENTA, qui porte les mêmes inclusions et n'est pas " +
         "soumis à l'autolyse rétinienne." },

  { k:"hsv", l:"Infection herpétique", cle:"necroseHemorragiqueCalcifiee", min:1,
    signes:["necroseHemorragiqueCalcifiee","cowdryB","necroseRetinienne"],
    stop:" — ce sont la NÉCROSE et la CALCIFICATION qui rattachent à l'HSV, pas l'hémorragie : la " +
         "nécrose hémorragique croise le différentiel de l'hémorragie rétinienne (Table 6.1). Les " +
         "inclusions de Cowdry B ne sont vues qu'« occasionally »." },

  { k:"teratome", l:"Tératome orbitaire", cle:"masseOrbitaire", min:2,
    signes:["masseOrbitaire","troisFeuillets","neuroepitheliumImmature","yolkSac"],
    stop:" — SEUL GRADE SOURCÉ DE CETTE FICHE, et il est extra-oculaire : Norris modifié " +
         "Gonzalez-Crussi, mesuré en champs à faible grossissement (40×) SUR LA LAME QUI EN " +
         "CONTIENT LE PLUS — grade 1 : pas plus d'un champ · grade 2 : plus d'un mais pas plus de " +
         "trois · grade 3 : quatre champs ou plus. Sous-échantillonner SOUS-GRADE mécaniquement. " +
         "Le neuroépithélium immature « may metastasize, comparable to neuroblastoma ». Le " +
         "composant pronostique majeur est la tumeur vitelline, et l'IHC négative ne met pas à " +
         "l'abri : « teratomas without a discernible yolk sac component may recur or metastasize " +
         "as yolk sac tumors »." },

  { k:"retinoblastome", l:"Rétinoblastome", cle:"cellulesRondesBleues", min:2,
    signes:["masseRetinienne","cellulesRondesBleues","flexnerWintersteiner","fleurettes",
            "necroseManchons","synaptoNSE"],
    stop:" — « extremely rare in fetal eyes » : en fœtopathologie c'est un différentiel, pas une " +
         "attente. La rosette de Flexner-Wintersteiner se reconnaît au contenu de sa lumière — " +
         "« unlike the center of a Homer Wright rosette, the central lumen does not contain the " +
         "fiber-rich neuropil » — et non à sa forme ronde : ne pas conclure à un rétinoblastome sur " +
         "des rosettes de dysplasie. Le piège du pseudorétinoblastome est CLINIQUE, pas " +
         "histologique : « Benign lesions such as intraocular infection or Coats' disease may be " +
         "clinically—but not histologically—mistaken for retinoblastoma »." },

  { k:"pronosticRetinoblastome", l:"Items pronostiques du rétinoblastome", min:1,
    signes:["infiltrationNerf","envahissementChoroidien","essaimageVitreen"],
    stop:" — ces trois items EXIGENT que le nerf optique et la choroïde soient sur la lame, ce qui " +
         "renvoie à l'exigence de plan PO. Sur une coupe hors PO ou sans tête de nerf optique, ils " +
         "ne sont pas « négatifs » : ils sont NON ÉVALUABLES, et c'est cela qu'il faut écrire." },

  { k:"medulloepitheliome", l:"Médulloépithéliome", cle:"medullaryEpithelium", min:1,
    signes:["medullaryEpithelium","heteroplasiques","extensionExtraoculaire"],
    stop:" — DIVERGENCE DE CLASSIFICATION NON tranchée : les auteurs constatent que « current " +
         "criteria for malignancy do not correlate with clinical behavior » et PROPOSENT de " +
         "remplacer la dichotomie bénin/malin par un grade simple. C'est leur proposition, publiée " +
         "par eux, pas un standard (§ 9.10) : la fiche l'enregistre sans l'adopter, et classer " +
         "selon ce schéma serait suivre une source unique contre l'usage établi. « Most cases are " +
         "diagnosed in children between 2 and 5 years of age; they are exceedingly rare in the " +
         "fetus or neonate ». Les éléments hétéroplasiques (37 % des cas, forme tératoïde) ont " +
         "« no effect on prognosis ». « Metastatic disease occurs only in cases with extraocular " +
         "extension ». Et le piège est symétrique : des lésions bénignes peuvent être prises pour " +
         "un médulloépithéliome et conduire à une énucléation." },

  { k:"coats", l:"Maladie de Coats", cle:"macrophagesSpumeux", min:1,
    signes:["macrophagesSpumeux","masseRetinienne"],
    stop:" — « telangiectatic vasculature with foamy macrophages in the vessel walls and retinal " +
         "detachment, atrophy, and gliosis » : c'est un pseudorétinoblastome CLINIQUE, que " +
         "l'histologie tranche. Ne pas franchir dans l'autre sens non plus." }
];

/* ── 07 · Négatifs obligatoires ───────────────────────────────────────────────
   Le § 6 de cette fiche est plus lourd que le § 5, et c'est le résultat : il
   existe une cohorte fœtale caryotypée (101 fœtus) qui MESURE le négatif. Un
   0/65 en trisomie 21 vaut plus, à la lame, qu'une liste de noms. */
var NEGATIFS = [
  { k:"lateralite", l:"Côté déclaré et deux blocs identifiés OD / OS",
    p:"bascule bloquante : aucun champ œil ne se saisit sans elle",
    ko:"latéralité NON déclarée — trois raisons sourcées l'exigent : différences inter-yeux en TCNA, " +
       "œil adelphe comme étalon en microphtalmie unilatérale, variabilité hyaloïdienne entre yeux adelphes" },
  { k:"dapMesure", l:"DAP mesuré et comparé à l'œil controlatéral",
    p:"le nomogramme et l'œil adelphe sont les deux seuls étalons",
    ko:"DAP non mesuré ou non comparé — l'absence de microphtalmie n'est pas appuyée" },
  { k:"buphtalmie", l:"Absence de buphtalmie", p:"prévalence 1 pour 30 000 naissances",
    ko:"globe augmenté — chercher cristallin aplati, excavation papillaire, stries de Haab" },
  { k:"colobome", l:"Absence de colobome, APRÈS coupes étagées",
    p:"lisible malgré l'autolyse — donc son négatif a de la valeur",
    ko:"colobome présent, ou coupes non étagées : sans étagement le négatif n'est pas rendable" },
  { k:"cryptoCyclo", l:"Absence de cryptophtalmie et de cyclopie", p:"conditionne la voie de prélèvement",
    ko:"cryptophtalmie ou cyclopie — bloc de tête, pas d'énucléation" },
  { k:"sclerocornee", l:"Absence de sclérocornée", p:"membranes lues au PAS, pas à l'HES seul",
    ko:"sclérocornée — décrire les absences membranaires, laisser la conclusion nommer" },
  { k:"angleDecrit", l:"Angle iridocornéen DÉCRIT, pas seulement « vu »",
    p:"un angle rempli de mésenchyme est normal avant ~28 SA",
    ko:"angle non décrit — le rang le plus dense de l'axe antérieur est perdu" },
  { k:"peters", l:"Absence d'adhérence kératolenticulaire",
    p:"⚠ son absence ne réfute pas Peters sur œil macéré",
    ko:"adhérence kératolenticulaire — ou négatif rendu à tort sur un œil autolytique" },
  { k:"aniridie", l:"Épithélium pigmentaire irien présent",
    p:"⚠ négatif NON rendable si le pigment est dispersé (rang 3)",
    ko:"épithélium pigmentaire irien absent — rang 3 d'autolyse ou aniridie : non départageable" },
  { k:"cataracte", l:"Cristallin inspecté MACROSCOPIQUEMENT avant inclusion",
    p:"« Lens artifacts are present in nearly all fetal and neonatal eyes »",
    ko:"cristallin non inspecté en macroscopie — le négatif de cataracte n'est pas rendable sur la lame seule" },
  { k:"phpv", l:"Absence de PHPV",
    p:"⚠ à distinguer d'une persistance hyaloïdienne physiologique avant 34–36 SA",
    ko:"cordon fibrovasculaire hyperplasique — ou persistance physiologique lue comme un PHPV" },
  { k:"hyaloideDatee", l:"Artère hyaloïde et TVL : présence ou absence ÉCRITE et datée",
    p:"ici l'énoncé positif ET négatif sont tous deux informatifs",
    ko:"système vasculaire fœtal non renseigné — c'est l'axe de datation qui survit à la macération" },
  { k:"stratification", l:"État de la stratification rétinienne consigné (dix couches identifiables, ou non évaluable)",
    p:"§ 3 : 24–27 SA selon la source · § 2.2 rang 1",
    ko:"stratification rétinienne non consignée — ni le jalon de datation ni la non-évaluabilité ne sont écrits" },
  { k:"dysplasieRet", l:"Absence de dysplasie rétinienne et de rosettes",
    p:"rosettes lisibles malgré l'autolyse ; excroissances non énonçables sur macéré",
    ko:"rosettes ou excroissances rétiniennes présentes" },
  { k:"hemorragie", l:"Absence d'hémorragie rétinienne — et si présente : % de surface + nombre de couches + type",
    p:"base de 20 % après accouchement non compliqué",
    ko:"hémorragie rétinienne non quantifiée — deux mesures continues sont exigées, pas un stade" },
  { k:"gaineNerf", l:"Absence d'hémorragie de la gaine du nerf optique, précisée uni- ou bilatérale",
    p:"OR 5,1 unilatérale · OR 7,6 bilatérale",
    ko:"hémorragie de la gaine — préciser la latéralité, elle change l'odds ratio" },
  { k:"pronostiques", l:"Absence d'infiltration du nerf optique, d'envahissement choroïdien, d'essaimage vitréen",
    p:"les trois items pronostiques — exigent le plan PO",
    ko:"un des trois items pronostiques est présent, ou non évaluable faute de plan PO" },
  { k:"infiltratChoroidien", l:"Absence d'infiltrat lymphocytaire choroïdien",
    p:"lisible malgré l'autolyse — son négatif a de la valeur",
    ko:"infiltrat lymphocytaire choroïdien présent" },
  { k:"nerfOptiqueMorpho", l:"Nerf optique d'épaisseur normale, chiasma présent",
    p:"anencéphalie et hydranencéphalie : l'œil ne les distingue pas",
    ko:"nerf optique aminci ou chiasma absent" },
  { k:"toxoIHC", l:"Absence de pseudokystes dans la rétine ET dans le nerf optique",
    p:"⚠ négatif à ne pas rendre sur la seule HES",
    ko:"pseudokystes présents, ou négatif rendu sans IHC anti-Toxoplasma" },
  { k:"cmvPlacenta", l:"Absence d'inclusions owl's eye, croisée avec le placenta",
    p:"⚠ négatif non rendable sur rétine fragmentée",
    ko:"inclusions présentes, ou négatif rendu sur une rétine fragmentée sans contrôle placentaire" },
  { k:"listeria", l:"Absence de bacilles Gram positif et de méningite du nerf optique",
    p:"exige le nerf sur toute sa longueur intra-orbitaire",
    ko:"bacilles Gram positif ou méningite du nerf optique" },
  { k:"hsvNecrose", l:"Absence de nécrose rétinienne calcifiée", p:"nécrose + calcification = HSV",
    ko:"nécrose rétinienne calcifiée" },
  { k:"nonEvaluable", l:"« Non évaluable pour autolyse » distingué de « normal », structure par structure",
    p:"16 % des yeux d'une série publiée d'IMG (4/25)",
    ko:"non-évaluabilité écrite comme une normalité — ce n'est pas un échec de lecture, c'est le régime normal de l'organe" },
  { k:"t21", l:"Chez un fœtus T21 : le rendement oculaire attendu est NUL",
    p:"0/65 dans la cohorte — le plus gros effectif du tableau",
    ko:"anomalie oculaire chez un fœtus T21 — elle n'est PAS expliquée par la trisomie : chercher autre chose" }
];

/* ── 08 · Techniques ──────────────────────────────────────────────────────── */
var TECHNIQUES = [
  { k:"pas",        l:"PAS", q:"continuité de Bowman, Descemet, capsule cristallinienne, Bruch — systématique sur l'œil" },
  { k:"perls",      l:"Perls / bleu de Prusse", q:"hémosidérine — borne un plancher, jamais un plafond" },
  { k:"polarisee",  l:"HES en lumière polarisée", q:"cristaux d'oxalate de calcium biréfringents" },
  { k:"grocott",    l:"Grocott (imprégnation argentique)", q:"bradyzoïtes de Toxoplasma, micro-organismes fongiques" },
  { k:"gram",       l:"Gram", q:"bacille Gram positif — Listeria" },
  { k:"cd34",       l:"CD34 (clone QBEnd-10)", q:"pli de Lange vs pli périmaculaire ; néovaisseaux de ROP" },
  { k:"hemPanel",   l:"Leder · MPO · glycophorine C · CD117", q:"hématopoïèse extramédullaire intraoculaire" },
  { k:"ihcToxo",    l:"IHC anti-Toxoplasma", q:"obligatoire chez le fœtus : l'HES seule est un faux négatif attendu" },
  { k:"ihcCmv",     l:"IHC anti-CMV", q:"CMV sans inclusion visible — à croiser avec le placenta" },
  { k:"bapp",       l:"IHC β-APP / ubiquitine", q:"lésion axonale du nerf optique, contexte TCNA" },
  { k:"gfap",       l:"GFAP", q:"gliose — ⚠ régulièrement exprimée au-delà de 29 SA, la positivité n'y prouve rien" },
  { k:"synapto",    l:"Synaptophysine · NSE", q:"tumeur à cellules rondes bleues, cas équivoques" },
  { k:"afpGpc3",    l:"α-fœtoprotéine + glypicane-3", q:"contingent vitellin — ⚠ une IHC négative ne met pas à l'abri" },
  { k:"ihcMuscle",  l:"IHC muscle lisse", q:"muscle lisse choristomateux dans la paroi d'un kyste colobomateux" },
  { k:"macroCrist", l:"Inspection macroscopique du cristallin avant inclusion",
    q:"pas une technique de laboratoire — la seule voie d'accès à la cataracte fœtale" },
  { k:"macroCoque", l:"Évaluation macroscopique de la coque avant coupe", q:"pli périmaculaire — perdu dès que la pièce est coupée" },
  { k:"biometrie",  l:"DAP + DC au pied à coulisse, et l'œil controlatéral", q:"nomogramme à trois points ; l'œil adelphe est l'étalon" },
  { k:"etagees",    l:"Coupes étagées 4 μm", q:"anophtalmie vs microphtalmie · colobome vrai vs artefact — un protocole, pas une technique" },
  { k:"placenta",   l:"Reprise du placenta", q:"inclusions cytomégaliques, non soumises à l'autolyse rétinienne" }
];

/* ── Propositions de techniques — déduites des clics, jamais imposées ─────── */
function suggerer(){
  var s = {};
  function anormal(k){ return E.signes[k] === "anormal"; }
  function ret(k){ return E.retention[k] === "present"; }

  /* Segment antérieur : toute absence membranaire se lit au PAS. */
  if (anormal("bowmanAbsente") || anormal("descemetAbsente") || anormal("stromaPostAbsent") ||
      anormal("sclerocornee") || anormal("schwalbeAnteposee") || anormal("descemetEpaissie")) s.pas = 1;

  /* Cristallin : la lame ne suffit jamais. */
  if (anormal("wedl") || anormal("noyauxRetenus") || anormal("lenticone") ||
      anormal("fibreuxSousCapsulaire") || anormal("cristallinCompact") ||
      anormal("liquefaction") || anormal("epithCristallinNecrose")) s.macroCrist = 1;
  if (anormal("oxalate") || anormal("liquefaction")) s.polarisee = 1;
  if (ret("cristallinArtefacts")) s.macroCrist = 1;

  /* Plis, jonctions, néovaisseaux : un seul réactif tranche les deux. */
  if (anormal("pliPerimaculaire") || anormal("neNeQuePli") || anormal("proliferationFusiforme") ||
      anormal("cd34CentralSeul") || E.variantes.pliDeLange) s.cd34 = 1;

  /* Hémorragie et sa datation. */
  if (anormal("hemorragieRetinienne") || anormal("hemGaineNerf") || anormal("hemIntrasclerale") ||
      anormal("hemosiderine")) s.perls = 1;
  if (anormal("hemorragieRetinienne") || anormal("pliPerimaculaire")) s.macroCoque = 1;
  if (anormal("hemGaineNerf") || anormal("hemIntrasclerale")) s.bapp = 1;
  /* L'HEM invalide le Perls : le panel sert à savoir si on a le droit de dater. */
  if (anormal("hemosiderine") || E.variantes.hemIntraoculaire) s.hemPanel = 1;

  /* Infections — les trois faux négatifs interdits. */
  if (anormal("pseudokystesRetine") || anormal("pseudokystesNerf") || anormal("nevriteOptique") ||
      anormal("chorioretiniteCicatricielle") || anormal("necroseRetinienne")){ s.ihcToxo = 1; s.grocott = 1; }
  if (anormal("owlsEye") || anormal("necroseRetinienne")){ s.ihcCmv = 1; s.placenta = 1; }
  if (anormal("meningiteNerf") || anormal("gramPositif") || anormal("necroseRetinienne")) s.gram = 1;
  /* Une rétine fragmentée dans un contexte infectieux : le placenta prend le relais. */
  if (ret("retineFragmentee")){ s.placenta = 1; s.ihcCmv = 1; }

  /* Gliose : la borne d'âge est la question, pas le marquage. */
  if (anormal("fibresOptiquesPerdues") || anormal("ganglionnaireCentrale")) s.gfap = 1;

  /* Tumeurs. */
  if (anormal("cellulesRondesBleues") || anormal("flexnerWintersteiner") || anormal("masseRetinienne") ||
      anormal("medullaryEpithelium")) s.synapto = 1;
  if (anormal("masseOrbitaire") || anormal("troisFeuillets") || anormal("neuroepitheliumImmature") ||
      anormal("yolkSac")) s.afpGpc3 = 1;
  if (anormal("kysteScleralPost") || anormal("muscleLisseChoristome")) s.ihcMuscle = 1;

  /* Protocole : ce sont les négatifs qui l'exigent, pas les lésions. */
  if (anormal("defautParoi") || anormal("eprBruchDiscordants") || anormal("orbiteSansStructure") ||
      anormal("residusGlobe") || anormal("orbiteMesodermique")) s.etagees = 1;
  if (anormal("dapBas") || anormal("dapHaut") || anormal("dcBas") || anormal("globeSymetriquePetit")) s.biometrie = 1;

  if (E.negatifs.cataracte === "present") s.macroCrist = 1;
  if (E.negatifs.colobome === "present") s.etagees = 1;
  if (E.negatifs.dapMesure === "present") s.biometrie = 1;
  if (E.negatifs.toxoIHC === "present") s.ihcToxo = 1;
  if (E.negatifs.cmvPlacenta === "present"){ s.ihcCmv = 1; s.placenta = 1; }
  if (E.negatifs.listeria === "present") s.gram = 1;
  if (E.negatifs.hemorragie === "present"){ s.perls = 1; s.macroCoque = 1; }
  if (E.negatifs.aniridie === "present") s.pas = 1;
  if (E.negatifs.sclerocornee === "present") s.pas = 1;

  /* Le PAS est systématique dès qu'un œil est lu — décision de la fiche (§ 9.16). */
  if (E.prelev.planPO) s.pas = 1;
  return s;
}

/* ── 09 · Autotest d'organe ───────────────────────────────────────────────────
   L'autotest de la coque tourne AVANT celui-ci et laisse un état : côté « deux »,
   DIAGS[0].signes[0] anormal, NEGATIFS[0] à « absent », TECHNIQUES[0] cochée.
   On ne suppose donc rien : on repose ce dont on a besoin, on nettoie après, et
   on termine avec #sa numérique (la coque compare ensuite à snap.terme_sa). */
async function testsOrgane(chk, clic, set, crTient, pause){

  function pose(k, v){ if (E.signes[k] !== v) clic("les", k, v); }
  function ote(k){ if (E.signes[k]) clic("les", k, E.signes[k]); }
  function propre(){ SIGNES.forEach(function(x){ ote(x.k); }); }
  function tenue(k){ return associations().some(function(a){ return a.d.k === k && a.tenu; }); }
  function plan(k){ if (E.mesure.def !== k) clic("mdef", k); }
  function axe(k){ if (E.mesure.opt !== k) clic("mopt", k); }
  function ret(k, v){ if (E.retention[k] !== v) clic("ret", k, v); }
  function retOte(k){ if (E.retention[k]) clic("ret", k, E.retention[k]); }
  function cote(k){ if (E.cote !== k) clic("cote", k); }
  function mes(id, v){ set("m_" + id, v); }
  function vm(){ return $("vMesure").textContent; }

  /* — Organe pair : la latéralité est bloquante et ne se redéfinit pas. — */
  cote("droit");
  await pause();
  chk("le côté déclaré part au compte rendu", crTient("Droit — 1/2"));
  chk("la latéralité est le premier négatif obligatoire", NEGATIFS[0].k === "lateralite");

  /* — Rétention : un ordre interne, jamais une horloge (§ 2.1, § 9.1). — */
  chk("aucune borne de rétention ne porte d'heure",
      RETENTION.every(function(r){ return r.b.indexOf("rang ") === 0 && !/heure|\bh\b/.test(r.b); }));
  chk("le KCl rappelle l'absence de barème oculaire", KCL_TXT.indexOf("Genest") >= 0);
  chk("l'artefact cristallinien est un prédicteur mauvais",
      par(RETENTION, "cristallinArtefacts").q === "mauvais");

  /* — Nomogramme : trois points publiés, pas un de plus (§ 3.2, § 9.3). — */
  chk("norme publiée à 20 SA", normeNomogramme(20) !== null);
  chk("norme publiée à 36 SA", normeNomogramme(36) !== null);
  chk("norme publiée au terme", normeNomogramme(42).dap === 17.5);
  chk("aucune interpolation entre les points", normeNomogramme(28) === null);

  /* — Axe 1 de MESURE : le plan de coupe, seul verdict bloquant (§ 8.3). — */
  set("sa", "28");
  mes("dap", "12");
  await pause();
  chk("plan non déclaré : verdict bloquant", vm().indexOf("PLAN DE COUPE NON DÉCLARÉ") >= 0);
  plan("horsPO");
  await pause();
  chk("plan hors PO : la lame n'est pas lisible", vm().indexOf("PLAN HORS PO") >= 0);
  chk("hors PO, le rétinoblastome n'est pas stadifiable", vm().indexOf("essaimage vitréen") >= 0);
  plan("poProuve");
  await pause();
  chk("plan PO prouvé : plus de blocage de plan", vm().indexOf("PLAN HORS PO") < 0);
  chk("à 28 SA, aucune norme n'est appelable", vm().indexOf("Aucune norme publiée à 28 SA") >= 0);
  chk("on n'interpole pas, l'étalon est l'œil adelphe", vm().indexOf("Ne pas interpoler") >= 0);

  /* La lacune la plus gênante : aucun écart inter-yeux normal n'est publié (§ 9.6). */
  mes("dapAdelphe", "15");
  await pause();
  chk("l'écart inter-yeux se constate sans se seuiller",
      vm().indexOf("Constater, ne pas seuiller") >= 0);

  /* Le seuil de microcornée existe, mais il est post-natal (§ 9.21). */
  mes("dc", "8");
  await pause();
  chk("le seuil de microcornée porte sa réserve d'âge", vm().indexOf("NOUVEAU-NÉ") >= 0);

  /* — Axe 2 de MESURE : l'axe de datation effectivement utilisé (§ 2.3, § 3.4). — */
  axe("retinien");
  ret("retineFragmentee", "present");
  await pause();
  chk("rétine fragmentée : l'axe rétinien est mort",
      vm().indexOf("CONTRADICTION") >= 0 && vm().indexOf("Basculer sur l'axe vasculaire") >= 0);
  axe("vasculaire");
  await pause();
  chk("l'axe vasculaire survit au rang 1", vm().indexOf("CONTRADICTION") < 0);
  ret("rang6Atteint", "present");
  await pause();
  chk("rang 6 atteint : plus aucun axe de datation",
      vm().indexOf("Aucun axe de datation ne reste") >= 0);
  axe("aucun");
  await pause();
  chk("non évaluable pour autolyse n'est pas normal",
      vm().indexOf("16 %") >= 0 && vm().indexOf("régime normal de l'organe") >= 0);
  retOte("retineFragmentee");
  retOte("rang6Atteint");
  axe("anterieur");

  /* — Associations : elles se déduisent, elles ne se cliquent pas. — */
  chk("aucun bouton ne porte un diagnostic", DIAGS.every(function(d){
    return !document.querySelector('[data-act="les"][data-k="' + d.k + '"]');
  }));

  propre();
  pose("rosettesOrganisees", "anormal");
  await pause();
  chk("un pivot seul ne tient pas une association", !tenue("dysplasieRetinienne"));
  pose("excroissances", "anormal");
  await pause();
  chk("dysplasie rétinienne : faisceau tenu", tenue("dysplasieRetinienne"));
  chk("aucun grade de dysplasie n'est proposé",
      par(DIAGS, "dysplasieRetinienne").stop.indexOf("AUCUN grade") >= 0);
  ote("rosettesOrganisees");
  await pause();
  chk("sans la rosette organisée, le faisceau lâche", !tenue("dysplasieRetinienne"));

  /* Cataracte : le pivot est macroscopique, et c'est voulu. */
  propre();
  pose("wedl", "anormal");
  pose("noyauxRetenus", "anormal");
  await pause();
  chk("cataracte : sans inspection macroscopique, rien ne tient", !tenue("cataracte"));
  pose("macroCristallin", "anormal");
  await pause();
  chk("cataracte : le pivot est l'œil, pas la lame", tenue("cataracte"));

  /* — Les divergences sont portées, jamais arbitrées. — */
  chk("divergence 24 vs 27 SA portée dans le stade",
      par(STADES, "dixCouches").note.indexOf("DIVERGENCE NON tranchée") >= 0);
  chk("divergence ora serrata portée",
      par(STADES, "neuroblastiques").note.indexOf("DIVERGENCE NON tranchée") >= 0);
  chk("séparation palpébrale : trois valeurs non arbitrées",
      par(STADES, "paupieresSeparees").note.indexOf("trois valeurs") >= 0);
  chk("PHPV : fenêtre non quantifiée",
      par(DIAGS, "phpv").stop.indexOf("DIVERGENCE DE FENÊTRE") >= 0);
  chk("CHED : hors fenêtre fœtale", par(DIAGS, "ched").stop.indexOf("DIVERGENCE de fenêtre") >= 0);
  chk("médulloépithéliome : classification non tranchée",
      par(DIAGS, "medulloepitheliome").stop.indexOf("DIVERGENCE DE CLASSIFICATION") >= 0);
  chk("anencéphalie : déduction croisée assumée",
      par(DIAGS, "anencephalie").stop.indexOf("DÉDUCTION CROISÉE") >= 0);
  chk("ROP : les stades sont ophtalmoscopiques",
      par(DIAGS, "rop").stop.indexOf("OPHTALMOSCOPIQUES") >= 0);
  chk("aucun champ de gradation n'a été créé", typeof GRADES === "undefined");

  /* — Compte rendu : ce qui doit s'y trouver. — */
  propre();
  pose("orbiteSansStructure", "anormal");
  pose("orbiteMesodermique", "anormal");
  await pause();
  chk("micro/anophtalmie : le doute s'écrit", crTient("micro/anophtalmie"));
  chk("l'anophtalmie ne se pose pas sur une coupe unique",
      crTient("Ne jamais écrire « anophtalmie » sur une coupe unique."));

  /* — Nettoyage : on rend l'état à la coque, avec #sa numérique. — */
  propre();
  plan("poProuve");
  set("sa", "36");
  await pause();
  chk("aux 36 SA la norme existe", vm().indexOf("Norme publiée à 36 SA") >= 0);
}
