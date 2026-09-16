/* Grille de lecture — rate.
   Fond : ~/Bureau/fiches_lecture/fiche_rate.md (§1 à §9).
   Forme : gen_grille.py, calquée sur grille_poumon.html.
   Les divergences entre sources sont PORTÉES dans les champs, jamais arbitrées. */

var ORGANE  = "rate";
var TITRE   = "rate";
var SOURCE  = "fiche_rate.md";
var MODULE  = "grille_rate";
var VERSION = "1.0.1";
/* Organe unique et unilatéral gauche : « The spleen is the only mesenchymal,
   unilateral left organ » [keeling, ch. 27]. Il n'y a donc pas de côté à
   déclarer — mais le NOMBRE et le SIÈGE des masses sont la donnée de l'organe,
   et ils se portent au § 04. */
var PAIR    = false;

var TITRE_CR    = "RATE";
var STADE_TITRE = "Horloge lymphoïde — colonisation d'un stroma déjà en place";

var KCL_TXT = "Fœticide par KCl déclaré. La rate ne date déjà aucun intervalle post-mortem — elle est " +
              "absente de la Table 15.6 et non attribuable dans la Table 37.1 ; le KCl intracardiaque " +
              "mime en outre la macération et touche aussi l'abdomen. Après le geste, plus aucune borne " +
              "n'est recevable.";

var RETARD_NOTE = "Sur cet organe, un retard apparent est d'abord un piège : la maturation splénique est " +
                  "entièrement portée par des noyaux lymphocytaires, c'est-à-dire par le premier élément " +
                  "que la lyse efface. Et la rate fœtale normale, lue avec l'œil adulte, paraît toujours " +
                  "déplétée et désorganisée : c'est le faux positif n° 1 de l'organe. Si la basophilie " +
                  "lymphocytaire est perdue, écrire « maturation lymphoïde non évaluable du fait de la " +
                  "rétention », jamais « pauvre en lymphocytes ».";

var AVANCE_NOTE = "Une avance portée par un centre germinatif n'est pas une avance, c'est une réaction : " +
                  "le centre germinatif est ABSENT du fœtus normal au terme, il s'écrit au § 06. Et " +
                  "aucune mesure histologique quantitative de maturation splénique n'existe dans le " +
                  "corpus — ni compte folliculaire, ni densité lymphocytaire, ni fraction de pulpe " +
                  "blanche : la rate se date qualitativement.";

var TECH_NOTE = "Les pointillés sont des propositions déduites des clics, jamais des prescriptions. " +
                "La réticuline est la seule coloration qui date la rate quand la pulpe blanche est " +
                "illisible, et elle n'apparaît dans aucune des 176 sections micro du corpus : la " +
                "proposer, c'est ouvrir une pratique, pas la rappeler.";

/* ── 01 · Prélèvement ─────────────────────────────────────────────────────────
   La rate est, dans la pratique du service, un organe MACROSCOPIQUE : 133 CR sur
   196 la décrivent en macro, 8 seulement portent une vraie phrase descriptive en
   micro. Ce que la lame doit permettre est donc court, et le bloc qui fait un
   diagnostic n'est pas la rate elle-même. */
var PRELEV = [
  { k:"tranche",     l:"Tranche de section prélevée après pesée", grave:true,
    manque:"« La rate est pesée et une tranche de section est prélevée pour l'analyse histologique » " +
           "[soffoet, ch. 3] — la pesée vient AVANT, elle ne se rattrape pas" },
  { k:"blocPancreas", l:"Bloc queue du pancréas (5 derniers mm) + hile splénique", grave:true,
    manque:"« Il est important de prélever les 5 derniers millimètres de la queue du pancréas et de " +
           "l'inclure avec le hile splénique » [soffoet, ch. 7] : c'est le SEUL geste splénique qui " +
           "fait un diagnostic sur coupe, « évocatrices en premier lieu d'une trisomie 13 »" },
  { k:"capsule",     l:"Capsule sur la coupe", grave:true,
    manque:"sans capsule, on ne peut plus juger l'épaisseur capsulaire ni exclure une masse accessoire " +
           "capsulée — et l'encapsulation est le critère décisif de la fusion spléno-pancréatique" },
  { k:"trabecules",  l:"Trabécules courtes et artériole centrale identifiables",
    manque:"« Trabeculae… generally do not contain blood vessels and extend only a short distance into " +
           "the parenchyma » [ernst, ch. 25] : ce sont les repères qui prouvent le bon plan de coupe" },
  { k:"massesIncluses", l:"Une masse splénique surnuméraire = un bloc, comptée, pesée et située",
    manque:"le nombre et le siège sont LA donnée splénique ; sans un bloc par masse, polysplénie et rate " +
           "accessoire ne se séparent plus, et chaque masse doit être datée séparément" },
  { k:"pesee",       l:"Rate pesée séparément de la queue du pancréas",
    manque:"« on saisit à la pince la queue du pancréas au contact du hile splénique » [soffoet, ch. 3] — " +
           "la séparation conditionne DEUX poids, pas un : « L'hypertrophie pancréatique est artéfactuelle " +
           "(pesé avec la rate) »" },
  { k:"referentiel", l:"Référentiel de poids nommé à côté du z-score",
    manque:"trois référentiels sont en usage et ils donnent 12 DS d'écart sur la même rate — un z-score " +
           "sans son référentiel n'est pas interprétable" },
  { k:"retrouvee",   l:"Rate retrouvée et identifiée à l'ouverture",
    manque:"« La rate n'a pas été retrouvée, vraisemblablement très lysée et non reconnaissable » " +
           "[corpus CR] : la lyse est le différentiel n° 1 de l'asplénie, et il ne se tranche pas sur la lame" },
  { k:"lateralite",  l:"Compte rendu de latéralité disponible (situs, surrénales, poumons)",
    manque:"le diagnostic splénique majeur — asplénie, polysplénie — se fait à l'ouverture par le nombre " +
           "et le siège ; l'axe de latéralité du service est rattaché au cœur, « Le cœur est en situs " +
           "solitus… », pas à la rate" },
  { k:"autresOrganes", l:"État de rétention des AUTRES organes disponible",
    manque:"la rate n'est dans aucune des deux horloges : toute heure qu'on lui attribuerait par " +
           "interpolation serait inventée" },
  { k:"congele",     l:"Fragment congelé",
    manque:"« Pour congélation : VD, VG, SIV, poumon D, poumon G, foie, bile, rate » [corpus CR]" }
];

/* ── 02 · Rétention ───────────────────────────────────────────────────────────
   Résultat principal du § 2 de la fiche, et c'est une ABSENCE : la rate n'est
   dans aucune des deux horloges. La seule borne recevable est donc lue ailleurs —
   la ligne « bon » de ce tableau est explicitement une lecture hors rate. */
var MODIF = "délai « accelerated by fetal hydrops » et par un intervalle accouchement-autopsie > 24 h, " +
            "ralenti par un terme < 25 SA — et l'hydrops est aussi le contexte pathologique splénique " +
            "principal, le modificateur compte donc doublement ici";

var RETENTION = [
  { k:"horsRate", l:"Rang de rétention établi sur les AUTRES organes", b:"celle des autres organes",
    d:"lue hors rate, Table 15.6", h:1, q:"bon",
    note:"aucune ligne splénique dans la Table 15.6 de [keeling, ch. 15], et dans la Table 37.1 " +
         "d'[ernst, ch. 37] la colonne « organe » est détruite à l'extraction : aucune ligne ne peut " +
         "être rattachée à la rate. Le livre le dit en clair, « the organs that are the most helpful » " +
         "sont le myocarde, le foie, la surrénale et le rein — la rate n'en fait pas partie",
    alerte:MODIF },
  { k:"nonRetrouvee", l:"Rate non retrouvée, non reconnaissable", b:"—", d:"rétention majeure, non horaire",
    h:0, q:"mauvais",
    note:"« La rate n'a pas été retrouvée, vraisemblablement très lysée et non reconnaissable » " +
         "[corpus CR] — l'organe est mou et se délite ; c'est le constat splénique le plus fréquent du " +
         "corpus, et c'est le différentiel n° 1 de l'asplénie, à trancher sur le contexte de latéralité" },
  { k:"basoPerdue", l:"Perte de basophilie des noyaux lymphocytaires de la pulpe blanche", b:"—",
    d:"aucune borne sourcée", h:0, q:"mauvais",
    note:"c'est l'axe de datation de l'organe qui tombe, pas l'organe : la maturation du § 04 devient " +
         "INDÉTERMINABLE et doit être écrite telle quelle. Ne jamais rendre une rate lysée comme " +
         "« pauvre en lymphocytes »" },
  { k:"demarcationRet", l:"Limite pulpe rouge / pulpe blanche effacée", b:"—", d:"constat de rétention",
    h:0, q:"mauvais",
    note:"terme existant dans la base : loss_splenic_pulp_demarcation. C'est un constat de RÉTENTION, " +
         "pas de maturation — ne pas le lire comme une rate immature ou déstructurée" },
  { k:"congestionRet", l:"Pulpe rouge dense, gorgée d'hématies", b:"—", d:"non datable", h:0, q:"mauvais",
    note:"la congestion post-mortem est la règle sur un organe qui est un réservoir sanguin, et aucune " +
         "source du corpus ne donne de critère la séparant d'une congestion pathologique — décrire, " +
         "ne pas trancher" },
  { k:"precurseursRet", l:"Origine des précurseurs hématopoïétiques indiscernable", b:"—",
    d:"ligne orpheline, non attribuée", h:0, q:"mauvais",
    note:"« With moderate to severe loss of nuclear basophilia, it can be difficult to assess the origin " +
         "of hematopoietic precursors. PAS stain is helpful in some cases » [ernst, ch. 37] — cette ligne " +
         "de la Table 37.3 n'est rattachée à AUCUN organe : elle vaut peut-être pour la rate, le foie ou " +
         "la moelle, c'est une piste et pas une prescription" },
  { k:"capsuleTient", l:"Capsule et trabécules encore lisibles", b:"—", d:"identité, pas datation",
    h:0, q:"mauvais",
    note:"structures collagène-élastiques : elles tiennent en dernier et permettent d'identifier le tissu " +
         "comme splénique bien après que la pulpe blanche est devenue illisible — c'est une preuve " +
         "d'identité d'organe, jamais une borne de délai" }
];

/* ── 03 · Maturation — l'horloge lymphoïde ────────────────────────────────────
   La rate ne se date pas par son parenchyme fonctionnel mais par la colonisation
   progressive d'un stroma déjà en place. Intervalles convertis en SA (+2) depuis
   les semaines de gestation des livres : aucun des deux livres ne déclare son
   échelle sur la rate, la conversion est une hypothèse de lecture (§ 9.17). */
var STADES = [
  { k:"ebauche", l:"Ébauche — condensation mésodermique, aucune organisation architecturale", max:10,
    note:"« derived from condensation of mesoderm within the dorsal mesogastrium around the fifth week " +
         "of gestation » [ernst, ch. 25], confirmé par « form the spleen in the fifth week » " +
         "[keeling, ch. 27] ; la rotation établit les ligaments spléno-rénal et gastro-splénique" },
  { k:"prelymphoide", l:"Pré-lymphoïde — précurseurs hématopoïétiques et macrophages, pas de lymphocytes",
    max:16,
    note:"le parenchyme « consists predominantly of hematopoietic precursors and a few macrophages » ; " +
         "artérioles « small, muscularized arterioles surrounded by delicate reticulin fibers », " +
         "adventice collagène conservée, pas de sinus [ernst, ch. 25]" },
  { k:"colonisation", l:"Colonisation lymphoïde diffuse — lymphocytes dispersés, non groupés", max:21,
    note:"« Colonization of the spleen by lymphoid tissue is usually not visible until approximately " +
         "14–18 weeks gestation… scattered T lymphocytes and B lymphocytes » [ernst, ch. 25] — " +
         "conversion +2 présumée" },
  { k:"amas", l:"Amas périartériolaires non organisés", max:24,
    note:"« lymphocytes begin to form small clusters around splenic arterioles… no specific " +
         "organization… into lymphoid follicles » ; la topographie est déjà en place — « the early " +
         "aggregates of B lymphocytes accumulate around the more peripheral branches of the arterioles, " +
         "whereas T lymphocytes are seen more centrally surrounding the larger arteriole trunks » " +
         "[ernst, ch. 25]" },
  { k:"folliculesPrim", l:"Follicules primaires — prolifération excentrée par rapport au manchon", max:28,
    note:"divergence NON tranchée : [ernst, ch. 25] place les follicules primaires à la fin du 2e " +
         "trimestre, soit environ 28 SA, quand [keeling, ch. 27] les fait apparaître à 22–24 semaines de " +
         "gestation, soit 24–26 SA — 2 à 4 semaines d'écart, et les deux livres ne définissent pas " +
         "« follicule » de la même façon. Écrire l'intervalle large 24–28 SA, ne pas choisir. La Table " +
         "25.1 d'[ernst, ch. 25], référencée deux fois, est perdue à l'extraction : c'est exactement " +
         "elle qui trancherait. Critère HES : « B lymphocytes begin to form small, primary follicular " +
         "clusters… recognized on H&E by the presence of an eccentric proliferation of small lymphocytes " +
         "adjacent to the periarteriolar lymphoid cuff »" },
  { k:"croissance", l:"Croissance folliculaire et manchons périartériolaires (PALS) en formation", max:39,
    note:"« These primary follicles enlarge throughout the third trimester » ; l'artériole devient " +
         "centrale au sens histologique — « In the mature spleen, the central arteriole is identified " +
         "because it no longer travels with an accompanying vein, and its collagenous adventitia is " +
         "replaced by lymphoid tissue » [ernst, ch. 25]" },
  { k:"terme", l:"État au terme — follicules primaires (zones B) et PALS précoce (zones T), rien d'autre",
    max:99,
    note:"le résultat le plus opératoire de la fiche est une ABSENCE : au terme normal, « splenic " +
         "lymphoid tissue consists of primary follicles (B-lymphocyte zones) » et les zones du manteau " +
         "et marginale sont absentes. Le centre germinatif est postnatal — « secondary follicles are " +
         "consistently found at an age of 2.5 months or older » — et la zone marginale « consistently " +
         "present at an age of 8.5 months or older » [ernst, ch. 25]. L'absence fait partie du conforme " +
         "et s'énonce au § 07" }
];

/* ── 03 bis · L'axe parallèle des sinus, et le seul chiffre de l'organe ───────
   Il n'existe AUCUNE mesure histologique quantitative de maturation splénique
   dans le corpus : pas de compte folliculaire, pas de densité lymphocytaire, pas
   de fraction de pulpe blanche. Ce bloc porte donc deux choses qui ne sont pas
   des mesures de maturation : la formation des sinus, qui court en PARALLÈLE du
   rang lymphoïde et ne s'y compose pas, et le poids, qui est macroscopique et
   n'a pas de référentiel unique. */
var SINUS = [
  { k:"sinusNon",   l:"Sinus de la pulpe rouge non formés" },
  { k:"sinusForm",  l:"Sinus en cours de formation" },
  { k:"sinusFaits", l:"Sinus formés, endothélium sinusal identifiable" },
  { k:"sinusInd",   l:"Sinus non jugeables — pulpe rouge illisible" }
];
var REFS = [
  { k:"mullerBrochut", l:"Muller Brochut 2005" },
  { k:"guihardCosta",  l:"Guihard-Costa 2002" },
  { k:"maroun",        l:"Maroun 2018" }
];

var MESURE = {
  titre:"Axe parallèle des sinus, et poids — la rate n'a aucune mesure histologique de maturation",
  defLabel:"axe parallèle — sinus",
  optLabel:"référentiel du poids déclaré",
  defs:SINUS,
  opts:REFS,
  champs:[{ id:"poids",  label:"Poids splénique (g)",        min:0, max:60, step:0.01 },
          { id:"ds",     label:"Z-score du poids (DS)",      min:-20, max:20, step:0.01 },
          { id:"masses", label:"Nombre de masses spléniques", min:0, max:20, step:1 }]
};

/* Les sinus « begin formation at 19–23 weeks gestation », soit 21–25 SA. Cet axe
   ne se compose PAS avec le rang lymphoïde : un désaccord entre les deux n'est
   pas une erreur de lecture, c'est ce que la source décrit. */
function verdictMesure(){
  var sa = num("sa"), t = [], res = [], cls = "";
  var s = E.mesure.def ? par(SINUS, E.mesure.def) : null;
  var r = E.mesure.opt ? par(REFS, E.mesure.opt) : null;
  var p = E.mesure.v.poids, ds = E.mesure.v.ds, n = E.mesure.v.masses;

  if (!s) t.push("Axe des sinus non déclaré.");
  else {
    t.push(s.l + ".");
    if (s.k !== "sinusInd")
      t.push("« even in the early second trimester, splenic sinuses are not yet formed, and they begin " +
             "formation at 19–23 weeks gestation » [ernst, ch. 25], soit 21–25 SA. Cet axe est PARALLÈLE " +
             "au rang lymphoïde, il ne s'y compose pas : un désaccord entre les deux n'est pas une " +
             "erreur de lecture.");
    if (sa != null && s.k === "sinusFaits" && sa < 21){ cls = "warn";
      t.push("Sinus formés à " + sa + " SA, avant la fenêtre de 21–25 SA — vérifier le terme déclaré " +
             "avant de conclure quoi que ce soit."); }
    if (sa != null && s.k === "sinusNon" && sa > 25){ cls = "warn";
      t.push("Sinus toujours non formés à " + sa + " SA, au-delà de la fenêtre de 21–25 SA."); }
  }

  if (p != null){
    if (p === 0)
      t.push("Rate à 0 g : « Le thymus, la rate et le pancréas ne peuvent être pesés (0g) » [corpus CR] — " +
             "c'est un plancher de balance, pas une mesure, et ce n'est pas une agénésie.");
    else
      t.push("Poids " + p + " g. Le seul repère de croissance sourcé est un facteur, pas une valeur : " +
             "« Splenic weight increases tenfold in the second half of pregnancy » [keeling, ch. 27].");
  }

  if (ds != null){
    if (!r){ cls = "bad";
      t.push("Z-score " + ds + " DS saisi SANS référentiel : ININTERPRÉTABLE. Trois référentiels sont en " +
             "usage et, sur un même fœtus, rate à 0 g, ils donnent « DS Muller Brochut -1.50 / DS Guihard " +
             "Costa 2002 -3.50 / DS Maroun 2018 -13.75 » [corpus CR] — 12 DS d'écart sur la même mesure. " +
             "Aucune source ne dit lequel fait foi."); }
    else {
      if (cls !== "bad") cls = "ok";
      t.push("Z-score " + ds + " DS selon " + r.l + " — référentiel déclaré, donc lisible. Les deux autres " +
             "donneraient un autre chiffre ; le service s'en défie lui-même : « de la rate (-2.1DS, sans " +
             "grande signification) » [corpus CR].");
    }
  }

  if (n == null) res.push("nombre de masses non consigné — c'est LA donnée splénique, et elle se prend " +
                          "à l'ouverture, pas sur la lame");
  else if (n === 0){ cls = "bad";
    t.push("Aucune masse splénique retrouvée. Ne pas conclure à l'asplénie depuis la rate : la lyse est " +
           "le différentiel n° 1, et le témoin utile est ailleurs — isomérisme, surrénale en fer à " +
           "cheval, atrésie anale."); }
  else if (n >= 2){ if (cls !== "bad") cls = "warn";
    t.push(n + " masses spléniques. La définition tient à trois conditions : « Polysplenia is the " +
           "presence of multiple smaller, similarly sized spleens that together equal the mass of a " +
           "normal spleen. » [keeling, ch. 27] — multiples, de taille comparable, et de masse totale " +
           "égale à une rate normale. Le poids à comparer est donc le poids CUMULÉ, et chaque masse se " +
           "date séparément : « Les 2 rates présentent une morphologie normale » [corpus CR]. Ce module " +
           "ne porte pas la ligne par masse (nombre · poids · siège · maturation) : l'écrire en clair " +
           "dans la remarque libre."); }

  if (!E.prelev.blocPancreas)
    res.push("bloc queue du pancréas + hile non confirmé — la seule entité splénique qui se diagnostique " +
             "franchement sur lame n'est pas cherchée");
  if (!E.prelev.referentiel && ds != null)
    res.push("référentiel non consigné au prélèvement alors qu'un z-score est saisi");
  if (E.retention.basoPerdue === "present")
    res.push("basophilie lymphocytaire perdue — le rang lymphoïde du § 04 est indéterminable ; les sinus, " +
             "la capsule et la réticuline survivent bien plus longtemps");
  if (res.length){
    if (cls !== "bad") cls = "warn";
    t.push("Réserves : " + res.join(" ; ") + ".");
  }
  return { cls:cls, txt:t.join(" ") };
}

/* ── 05 · Variantes normales ──────────────────────────────────────────────────
   Piège de fond n° 1 de l'organe : la rate fœtale normale ressemble à une rate
   pathologique d'adulte. Lue avec l'œil adulte, elle est toujours « déplétée ». */
var VARIANTES = [
  { k:"lobulation",    l:"Lobulation splénique fœtale — macroscopique, perdue au terme, ce n'est pas une polysplénie" },
  { k:"accessoire",    l:"Rate accessoire (splénunculus) — vue dans 10 % des autopsies" },
  { k:"bilobee",       l:"Rate bilobée" },
  { k:"normoblastes",  l:"Normoblastes intravasculaires et sinusaux — hématopoïèse fœtale normale" },
  { k:"hemaPeuDense",  l:"Hématopoïèse peu dense, présente à tous les termes fœtaux" },
  { k:"pasCentreGermNorm", l:"Pas de centre germinatif, pas de manteau, pas de zone marginale — le normal fœtal" },
  { k:"peuLympho",     l:"Rate pauvre en lymphocytes avant environ 24 SA" },
  { k:"pulpePauvreVar", l:"Pulpe blanche paraissant pauvre — énoncé ganglionnaire, transposition à la rate NON sourcée" },
  { k:"hemophagoVar",  l:"Hémophagocytose — énoncé ganglionnaire, « agonal event », transposition NON sourcée" },
  { k:"capsuleMince",  l:"Capsule mince, à peine « slightly thicker » avec l'âge — variation non chiffrée" },
  { k:"congestionVar", l:"Congestion de la pulpe rouge — la règle post-mortem sur un réservoir sanguin" }
];

/* ── 06 · Signes ──────────────────────────────────────────────────────────────
   On coche ce qu'on voit, un signe à la fois. Aucun nom de maladie ici : les noms
   se lisent en dessous, dans DIAGS, par association des signes cochés. Sur cet
   organe, une partie des signes qui NOMMENT sont lus hors de la lame — ils sont
   marqués comme tels, et c'est le § 0 de la fiche : la rate est un organe
   macroscopique. Aucun grade splénique n'existe : ce qui n'est pas gradable ne se
   grade pas. */
var SIGNES = [
  /* Identité du tissu et plan de coupe */
  { k:"capsuleAbsente",   l:"Pas de capsule sur la coupe",
    meta:"ni l'épaisseur capsulaire ni l'exclusion d'une masse accessoire capsulée ne se jugent plus" },
  { k:"pasTissuSplenique", l:"Masse sans pulpe rouge ni pulpe blanche identifiable",
    meta:"ganglion, surrénale accessoire ou pancréas ectopique : la lame sert d'abord à ça" },

  /* Lyse — ce que la rétention efface en premier */
  { k:"basoLympho",       l:"Noyaux lymphocytaires non basophiles",
    meta:"le premier élément que la lyse efface sur cet organe — la maturation devient indéterminable" },
  { k:"demarcationEffacee", l:"Limite pulpe rouge / pulpe blanche effacée" },

  /* Pulpe blanche — les structures normalement ABSENTES au terme */
  { k:"centreGerminatif", l:"Centre germinatif constitué",
    meta:"absent du fœtus normal : c'est un SIGNE, pas un stade de maturation" },
  { k:"zoneManteau",      l:"Zone du manteau identifiable" },
  { k:"zoneMarginale",    l:"Zone marginale identifiable" },
  { k:"pulpeBlanchePauvre", l:"Pulpe blanche pauvre en lymphocytes pour le terme",
    meta:"la rate fœtale normale est pauvre en lymphocytes avant environ 24 SA" },
  { k:"palsAbsent",       l:"Manchon périartériolaire non identifiable au terme" },
  { k:"folliculesAbsents", l:"Aucun follicule primaire au terme" },

  /* Pulpe rouge et hématopoïèse */
  { k:"emhInterstitielle", l:"Hématopoïèse interstitielle dense effaçant l'architecture",
    meta:"aucun seuil sourcé ; le basculement est interstitiel, pas intravasculaire" },
  { k:"plusDenseQueFoie", l:"Rate plus riche en cellules hématopoïétiques que le foie du même fœtus",
    meta:"le seul critère opérationnel disponible, et il est relatif" },
  { k:"congestionPulpeRouge", l:"Pulpe rouge dense, gorgée d'hématies" },
  { k:"pulpeExsangue",    l:"Pulpe rouge vide, rate exsangue",
    meta:"exsanguination du geste — regarder les autres organes" },
  { k:"trabeculeLongue",  l:"Trabécule longue et vascularisée",
    meta:"ce n'est pas la norme fœtale" },

  /* Surcharge */
  { k:"macrophagesSurcharge", l:"Métabolite accumulé dans les macrophages de la pulpe rouge" },
  { k:"cellulesSpumeuses", l:"Cellules spumeuses de la pulpe rouge" },
  { k:"perlsPositif",     l:"Perls positif sur la rate" },

  /* Réaction, infection, activation macrophagique */
  { k:"cd163Fort",        l:"Marquage CD163 très important (macrophages activés)" },
  { k:"hemophagocytose",  l:"Images d'hémophagocytose",
    meta:"énoncé ganglionnaire, événement agonique fréquent — transposition à la rate non sourcée" },
  { k:"infiltratInflam",  l:"Infiltrat inflammatoire" },
  { k:"inclusionVirale",  l:"Inclusion virale" },

  /* Fusions et hétérotopies — les seules entités réellement histologiques */
  { k:"pancreasIntrasplenique", l:"Acini et îlots pancréatiques dans la rate" },
  { k:"spleniqueIntrapancreatique", l:"Foyers spléniques dans la queue du pancréas" },
  { k:"nonEncapsule",     l:"Foyer hétérotopique mal ou non encapsulé",
    meta:"c'est l'encapsulation, ou son absence, qui est le critère décisif" },
  { k:"canauxCaliciformes", l:"Canaux excréteurs pancréatiques bordés de cellules caliciformes",
    meta:"signe indirect de dissociation du tissu par les foyers spléniques" },
  { k:"interpenetration", l:"Interpénétration des deux tissus, sans capsule interposée" },
  { k:"tissuSpleniqueGonade", l:"Tissu splénique au contact ou en continuité du parenchyme gonadique" },

  /* Tumeur */
  { k:"proliferationVasc", l:"Prolifération vasculaire intrasplénique" },

  /* Lus hors rate — le diagnostic splénique majeur ne se fait pas sur la lame */
  { k:"rateNonRetrouveeMacro", l:"Rate non retrouvée à l'ouverture", meta:"lu hors rate" },
  { k:"massesMultiples",  l:"Masses spléniques multiples, de taille comparable",
    meta:"lu hors rate — comptées, pesées, situées" },
  { k:"nodulesAutourRate", l:"Nodules spléniques autour d'une rate de taille normale", meta:"lu hors rate" },
  { k:"ratePositionAnormale", l:"Rate hors de sa loge", meta:"lu hors rate" },
  { k:"surrenaleFerACheval", l:"Surrénale en fer à cheval",
    meta:"lu hors rate — le meilleur témoin indirect de l'asplénie, et lui est sur une lame" },
  { k:"atresieAnale",     l:"Atrésie ou sténose anale", meta:"lu hors rate" },
  { k:"anomaliesViscerales", l:"Anomalies viscérales associées (foie médian, malrotation)",
    meta:"lu hors rate — c'est ICI que se tranche polysplénie contre rate accessoire" },
  { k:"isomerismeDroit",  l:"Isomérisme droit (deux poumons trilobés, deux oreillettes droites)",
    meta:"lu hors rate" },
  { k:"blocAV",           l:"Bloc auriculo-ventriculaire complet", meta:"lu hors rate" },
  { k:"hydrops",          l:"Anasarque fœto-placentaire", meta:"lu hors rate" },
  { k:"anemieFoetale",    l:"Anémie fœtale ou érythroblastose", meta:"lu hors rate" }
];

/* ── 06 bis · Associations — affichées, jamais cochées ────────────────────────
   Le nom se déduit des signes. « cle » est le signe pivot : sans lui le compte
   peut être atteint sans que l'association tienne. Sur la rate, deux couples
   d'associations partagent leurs signes À DESSEIN — déplétion et lyse, polysplénie
   et rate accessoire — parce que rien sur la lame ne les sépare. */
var DIAGS = [
  { k:"fusionSplenoPancreatique", l:"Fusion spléno-pancréatique / hétérotopie splénique intrapancréatique",
    min:2,
    signes:["pancreasIntrasplenique","spleniqueIntrapancreatique","nonEncapsule","canauxCaliciformes",
            "interpenetration"],
    stop:" — deux tissus voisins dans un même bloc ne sont pas une fusion : c'est le piège de contiguïté " +
         "du prélèvement, et il se tranche sur l'interpénétration et sur l'absence de capsule. Le critère " +
         "est écrit : « The intrapancreatic tissue is poorly encapsulated or nonencapsulated, while the " +
         "intrasplenic pancreatic tissue contains pancreatic acini and islets. » [keeling, ch. 27]. Les " +
         "trois formes sont « (1) ectopic splenic tissue present in the tail of the pancreas, (2) ectopic " +
         "pancreatic tissue present in the spleen or an accessory spleen, and (3) fusion of the tail of " +
         "the pancreas with the hilum of the spleen ». Ne pas nommer la trisomie 13 depuis la lame : " +
         "écrire le signe, demander le caryotype — c'est « related usually to trisomy 13 », " +
         "« évocatrices en premier lieu d'une trisomie 13 », aussi trisomie 21 et Schinzel-Gideon." },

  { k:"asplenie", l:"Asplénie — lecture macroscopique, pas une lecture de lame", cle:"rateNonRetrouveeMacro",
    min:2,
    signes:["rateNonRetrouveeMacro","pasTissuSplenique","surrenaleFerACheval","atresieAnale",
            "isomerismeDroit"],
    stop:" — le critère positif est l'absence de tissu splénique, et elle s'établit à l'ouverture. La lame " +
         "n'a de valeur que négative sur une masse suspecte, et le différentiel n° 1 est la LYSE : " +
         "« La rate n'a pas été retrouvée, vraisemblablement très lysée et non reconnaissable ». Trancher " +
         "sur le contexte de latéralité, pas sur la rate — « asplenia is seen in over 50 % of horseshoe " +
         "adrenal gland. Fused adrenal gland and anal atresia or stenosis are exclusive to asplenia of " +
         "the heterotaxy syndromes ». Ne jamais écrire « Ivemark » : « Asplenia syndrome is sometimes " +
         "referred to as Ivemark syndrome but that is only one of several syndromes with asplenia as a " +
         "feature » — et la Table 27.1 qui liste ces syndromes est perdue à l'extraction. Prévalences à " +
         "citer : « asplenia… 87 % with right atrial isomerism and 7 % with left atrial isomerism » ; " +
         "l'asplénie isolée existe, « Mutations in… RPSA… underlie approximately half of all isolated " +
         "congenital asplenia cases »." },

  { k:"polysplenie", l:"Polysplénie — lecture macroscopique, pas une lecture de lame", cle:"massesMultiples",
    min:2,
    signes:["massesMultiples","anomaliesViscerales","blocAV","hydrops"],
    stop:" — trois conditions, pas une : « Polysplenia is the presence of multiple smaller, similarly " +
         "sized spleens that together equal the mass of a normal spleen. » Le compte n'est pas un grade, " +
         "et le nombre, le poids cumulé et le siège se portent au § 04. Ne pas nommer l'isomérisme depuis " +
         "la micro : le lien est statistique, « polysplenia… 2 % with right atrial isomerism and 56 % " +
         "with left atrial isomerism », donc 44 % ne sont pas des isomérismes gauches. Et l'hydrops de la " +
         "polysplénie est RYTHMIQUE, il ne s'explique pas par la rate : « complete atrio-ventricular " +
         "heart block, which occurs in about a third of cases of left atrial isomerism »." },

  { k:"rateAccessoire", l:"Rate accessoire (splénunculus) — variante normale", cle:"nodulesAutourRate",
    min:1,
    signes:["nodulesAutourRate","massesMultiples","anomaliesViscerales"],
    stop:" — c'est une variante normale, pas une lésion : « Accessory spleens… are seen in 10 % of " +
         "autopsies, most commonly adjacent to the tail of the pancreas or the hilum ». La définition la " +
         "sépare de la polysplénie — « Polysplenia differs from accessory (supernumerary) spleens " +
         "(splenunculi) where one or more splenic masses are seen around a normally sized spleen » — et " +
         "le discriminant décisif n'est PAS dans la rate : « Visceral anomalies are seen in polysplenia " +
         "but not in accessory spleens. » Zone grise mesurée : un CR décrit à la fois deux rates ET des " +
         "nodules accessoires, et la dichotomie du livre n'a pas de case pour ce cas." },

  { k:"fusionSplenoGonadique", l:"Fusion spléno-gonadique", cle:"tissuSpleniqueGonade", min:1,
    signes:["tissuSpleniqueGonade","atresieAnale","anomaliesViscerales"],
    stop:" — typologie binaire, jamais un grade : type continu (tissu splénique en continuité) ou type " +
         "discontinu (fusion avec du tissu splénique accessoire seulement, beaucoup moins d'anomalies " +
         "associées). Le type se conclut sur l'ensemble macro + micro, la micro n'écrit que « tissu " +
         "splénique au contact du parenchyme gonadique ». Distribution : « Left-sided occurrences are " +
         "the norm », M:F = 16:1, et « about one-sixth of cases have been found at autopsy ». Chercher " +
         "autour, sur le type continu : anomalies des membres, micrognathie, microglossie, atrésie " +
         "anale, poumons hypoplasiques." },

  { k:"rateEctopique", l:"Rate ectopique ou baladeuse", cle:"ratePositionAnormale", min:1,
    signes:["ratePositionAnormale","anomaliesViscerales"],
    stop:" — laxité ou absence des ligaments lieno-rénal ou gastro-splénique. Contextes sourcés : prune " +
         "belly syndrome, hernie de Bochdalek pouvant contenir la rate. Une rate à droite n'est PAS en " +
         "soi une hétérotaxie : la position se conclut avec le situs complet, et le service porte le " +
         "situs sur le cœur. Mesuré : « la queue s'étend vers la droite en direction de la rate elle-même " +
         "située à droite »." },

  { k:"emhExuberante", l:"Hématopoïèse extramédullaire splénique exubérante", cle:"emhInterstitielle",
    min:2,
    signes:["emhInterstitielle","plusDenseQueFoie","hydrops","anemieFoetale"],
    stop:" — aucun seuil, aucune gradation, aucune densité normale par terme n'existe dans le corpus : " +
         "proposer un grade serait inventer l'échelle. Le seul repère est relatif — « far less density " +
         "than in the fetal liver » [ernst, ch. 25] — donc une rate plus riche que le foie du même fœtus " +
         "est anormale, et c'est tout ce dont on dispose. Ne pas écrire « hématopoïèse extramédullaire » " +
         "devant l'hématopoïèse splénique physiologique : elle est présente « beginning in the embryonic " +
         "period and throughout fetal life », et les normoblastes se voient « predominantly in vessels " +
         "and sinuses », ce qui évoque un transit. C'est le faux positif structurel de l'organe. Et " +
         "keeling ch. 13 « hydrops », lu intégralement, ne contient aucune histologie splénique : à quoi " +
         "ressemble une rate d'hydrops sur coupe n'a pas de réponse dans le corpus." },

  { k:"surcharge", l:"Surcharge métabolique ou ferrique — la rate est un poste du panel", min:2,
    signes:["macrophagesSurcharge","cellulesSpumeuses","perlsPositif"],
    stop:" — la question est binaire et se pose en panel multi-organes : « absence de surcharge fœtale " +
         "(lymphatiques, podocytes, pancréas, rate, SRH, thymus en particulier) » [corpus CR]. La rate " +
         "est un poste du panel, pas l'organe de décision. Rien ne se grade ; le Perls se rend en " +
         "intensité qualitative — « diffusément modérément positive au Perls ». Ne pas nommer la maladie " +
         "de surcharge depuis la rate : la conclusion nomme, appuyée sur le panel et la biochimie." },

  { k:"reactionLymphoide", l:"Réaction lymphoïde — stimulation antigénique, infection anténatale",
    cle:"centreGerminatif", min:1,
    signes:["centreGerminatif","zoneMarginale","zoneManteau","infiltratInflam","inclusionVirale"],
    stop:" — le centre germinatif est le SEUL critère de réaction lymphoïde splénique réellement sourcé : " +
         "il est absent du fœtus normal parce qu'il requiert « sufficient antigen exposure and time », et " +
         "« secondary follicles are consistently found at an age of 2.5 months or older ». Même règle pour " +
         "une zone marginale, « consistently present at an age of 8.5 months or older ». Mais la fiche ne " +
         "peut pas dire de quoi ce signe est spécifique, ni à partir de quel terme il cesse d'être " +
         "anormal : aucune source ne le dit. Ne pas nommer l'agent depuis la réaction — l'IHC virale est " +
         "la preuve." },

  { k:"activationMacrophagique", l:"Activation macrophagique splénique", cle:"cd163Fort", min:1,
    signes:["cd163Fort","perlsPositif","hemophagocytose"],
    stop:" — le syndrome d'activation macrophagique se DISCUTE en conclusion, il ne se lit pas dans la " +
         "micro : la formulation du service est « Sur rate : CD163… : pas d'élément pour un SAM ». " +
         "L'hémophagocytose, elle, est un énoncé GANGLIONNAIRE non transposé — « The presence of " +
         "hemophagocytosis does not imply that the patient has hemophagocytic syndrome… it may likely " +
         "represent an agonal event » [ernst, ch. 26] : cliniquement crédible sur la rate, non sourcé " +
         "sur la rate. Aucune échelle d'intensité n'existe." },

  { k:"deplLymphocytaire", l:"Déplétion lymphocytaire splénique — l'entrée la plus fragile",
    cle:"pulpeBlanchePauvre", min:2,
    signes:["pulpeBlanchePauvre","palsAbsent","folliculesAbsents","basoLympho","demarcationEffacee"],
    stop:" — AUCUN critère n'est sourcé. La formulation existe dans la pratique, « La rate présente aussi " +
         "une déplétion lymphocytaire. » [corpus CR], et elle est absente de tous les livres. Trois faux " +
         "positifs majeurs : la rate fœtale est normalement pauvre en lymphocytes avant environ 24 SA ; " +
         "la lyse efface les noyaux lymphocytaires en premier ; et l'aspect déplété non pathologique est " +
         "un énoncé ganglionnaire. Ne pas reprendre l'échelle thymique — « < 12 h no change », « grade 2 " +
         "starry-sky within 24–48 h », « > 80 % of grade 4 have > 72 h » : ces grades sont THYMIQUES et " +
         "ne se transposent pas. Ne pas conclure au stress fœtal depuis la rate seule : c'est le thymus " +
         "qui porte cette lecture." },

  { k:"lyseContrefaitDepletion", l:"Lyse contrefaisant la déplétion lymphocytaire", cle:"basoLympho",
    min:1,
    signes:["basoLympho","demarcationEffacee","pulpeBlanchePauvre","palsAbsent"],
    stop:" — la basophilie lymphocytaire est le PREMIER élément que la lyse efface sur cet organe, et la " +
         "maturation splénique est entièrement portée par ces noyaux. Regarder si les noyaux des autres " +
         "lignées sont encore basophiles ; si non, la maturation est indéterminable et s'écrit telle " +
         "quelle. « There is a predictable pattern of loss of nuclear basophilia in the internal organs " +
         "which should not be mistaken for necrosis » [keeling, ch. 15]. La limite pulpe rouge / pulpe " +
         "blanche effacée est un constat de rétention, pas de maturation. Ne jamais rendre une rate lysée " +
         "comme « pauvre en lymphocytes »." },

  { k:"rateNormaleLueAdulte", l:"Rate fœtale normale lue avec l'œil adulte — faux positif n° 1",
    cle:"pulpeBlanchePauvre", min:2,
    signes:["pulpeBlanchePauvre","palsAbsent","folliculesAbsents"],
    stop:" — pas de centre germinatif, pas de manteau, pas de zone marginale, peu de lymphocytes : lue " +
         "avec l'œil adulte, toute rate fœtale normale est « déplétée » et « désorganisée ». Au terme " +
         "normal, « splenic lymphoid tissue consists of primary follicles (B-lymphocyte zones) » et la " +
         "PALS est encore en formation précoce — c'est le conforme, et il s'énonce comme tel au § 07. " +
         "Avant environ 24 SA, l'absence de follicule n'est même pas un retard." },

  { k:"congestionPulpe", l:"Congestion de la pulpe rouge — à décrire, pas à trancher",
    cle:"congestionPulpeRouge", min:1,
    signes:["congestionPulpeRouge","hydrops","emhInterstitielle"],
    stop:" — aucun critère du corpus ne sépare la congestion post-mortem d'une hyperplasie ou d'une " +
         "congestion pathologique de la pulpe rouge, et la congestion post-mortem est la RÈGLE sur un " +
         "organe qui est un réservoir sanguin. Décrire, ne pas trancher. À l'inverse, une pulpe exsangue " +
         "est d'abord l'exsanguination du geste." },

  { k:"tumeur", l:"Tumeur splénique", cle:"proliferationVasc", min:1,
    signes:["proliferationVasc","hydrops"],
    stop:" — rareté explicite : « Hemangioma is the most common primary tumor of the spleen but is rare " +
         "in the neonatal period. » [keeling, ch. 27]. Ne pas retenir une tumeur splénique sans " +
         "confirmation. Contextes syndromiques : Beckwith-Wiedemann, Turner, et l'hémangioendothéliome " +
         "kaposiforme avec syndrome de Kasabach-Merritt." },

  { k:"tissuNonSplenique", l:"Le tissu n'est pas identifiable comme splénique", cle:"pasTissuSplenique",
    min:1,
    signes:["pasTissuSplenique","capsuleAbsente","trabeculeLongue"],
    stop:" — c'est la première chose que la lame fait : confirmer qu'une masse est bien du tissu " +
         "splénique et non un ganglion, une surrénale accessoire ou du pancréas ectopique. Les repères " +
         "sont la capsule, les trabécules courtes et avasculaires, la pulpe rouge réticulaire — « loose, " +
         "reticular stromal tissue » — et l'artériole centrale. Capsule et trabécules survivent très " +
         "longtemps à la lyse : leur absence est un problème de plan de coupe avant d'être un problème " +
         "de rétention." }
];

/* ── 07 · Négatifs obligatoires ───────────────────────────────────────────────
   Caveat mesuré, à ne pas gommer : 8 sections micro sur 176 portent une phrase
   descriptive splénique. Cette liste vient donc de très peu de CR — ce n'est pas
   une liste consensuelle du service, c'est ce que le corpus contient. Les
   formulations dominantes sont laconiques : « rate : cytoarchitecture et
   histologie normale », « Rate : sans particularité ».
   Les trois premiers négatifs sont des NORMAUX : ils s'énoncent comme conformité. */
var NEGATIFS = [
  { k:"pasCentreGerm", l:"Absence de centre germinatif",
    p:"c'est le normal fœtal — à énoncer comme conformité, pas comme absence pathologique",
    ko:"centre germinatif CONSTITUÉ — signe de stimulation antigénique, jamais un stade de maturation" },
  { k:"pasManteau", l:"Absence de zone du manteau", p:"postnatale chez le sujet normal",
    ko:"zone du manteau IDENTIFIABLE chez un fœtus" },
  { k:"pasZoneMarginale", l:"Absence de zone marginale",
    p:"« consistently present at an age of 8.5 months or older »",
    ko:"zone marginale IDENTIFIABLE chez un fœtus" },
  { k:"structuresTerme", l:"Follicules primaires et PALS précoce présents au terme",
    p:"les seules structures lymphoïdes attendues au terme",
    ko:"structures attendues du terme ABSENTES — retard lymphoïde ou lyse, dire lequel et pourquoi" },
  { k:"pasSurcharge", l:"Absence de surcharge des macrophages de la pulpe rouge",
    p:"la rate est un poste du panel multi-organes",
    ko:"surcharge PRÉSENTE — confirmer au PAS, et la conclusion nomme, pas la rate" },
  { k:"perlsNeg", l:"Perls négatif",
    p:"« Le Perls sur le foie, thyroïde, rate, pancréas, reins est négatif »",
    ko:"Perls POSITIF — rendre l'intensité en qualitatif, aucune échelle n'existe" },
  { k:"pasSAM", l:"Pas d'élément pour un SAM au CD163",
    p:"le SAM se discute en conclusion, il ne se lit pas dans la micro",
    ko:"marquage CD163 très important — le discuter en conclusion, ne pas le conclure ici" },
  { k:"pasInfiltrat", l:"Absence d'infiltrat inflammatoire et d'inclusion virale",
    p:"le seul critère de réaction sourcé reste le centre germinatif",
    ko:"infiltrat inflammatoire ou inclusion virale PRÉSENT — l'IHC virale est la preuve" },
  { k:"blocDedie", l:"Bloc dédié : ni tissu pancréatique intrasplénique, ni tissu splénique intrapancréatique",
    p:"le seul bloc splénique qui fait un diagnostic sur coupe",
    ko:"hétérotopie PRÉSENTE — écrire le signe et demander le caryotype" },
  { k:"pasEMH", l:"Absence d'hématopoïèse interstitielle effaçant l'architecture",
    p:"l'hématopoïèse splénique est physiologique ; c'est l'interstitiel massif qui serait le signe",
    ko:"hématopoïèse interstitielle effaçant l'architecture — sans seuil sourcé, la décrire sans la grader" },
  { k:"massesComptees", l:"Nombre et siège des masses spléniques consignés",
    p:"c'est LA donnée splénique, et elle se prend à l'ouverture",
    ko:"masses non comptées — polysplénie et rate accessoire deviennent indistinguables" },
  { k:"pasLyse", l:"Lecture non empêchée par la lyse",
    p:"sans elle, aucun négatif ci-dessus n'est opposable",
    ko:"lyse empêchant la lecture — tous les négatifs ci-dessus sont NULS" }
];

/* ── 08 · Techniques — une ligne par question, pas par coloration ──────────── */
var TECHNIQUES = [
  { k:"hes", l:"HES",
    q:"le tissu est-il bien splénique ? capsule, trabécules courtes avasculaires, cordons de Billroth" },
  { k:"reticuline", l:"Réticuline",
    q:"quelle maturité quand la pulpe blanche n'est plus lisible ? repère continu, sans borne" },
  { k:"perls", l:"Perls", q:"y a-t-il une surcharge ferrique ?" },
  { k:"cd163", l:"IHC CD163 (clone 10D6, THERMO/EPREDIA, 1/25)", q:"les macrophages sont-ils activés ?" },
  { k:"cd3cd20", l:"IHC CD3 (Dako, 1/200) et CD20 (L26, Agilent, 1/400), ± CD4 et CD8",
    q:"les compartiments T et B sont-ils en place ? l'IHC montre la topographie, elle ne date pas" },
  { k:"marginale", l:"IHC bcl-2 / CD45RA / IgD + SMA",
    q:"y a-t-il une zone marginale, donc une anomalie fœtale ?" },
  { k:"manteau", l:"IHC bcl-2 / CD45RA / IgM / IgD", q:"y a-t-il une zone du manteau ?" },
  { k:"cdf", l:"IHC CD21 / CD23 / CD35",
    q:"y a-t-il un réseau de cellules dendritiques folliculaires ? il doit être absent" },
  { k:"cd34", l:"IHC CD34", q:"les sinus sont-ils formés ? endothélium « weakly expressing CD34 »" },
  { k:"viro", l:"IHC Parvovirus B19 (R92F6, 1/200) et CMV E13 (Argene, 1/200)", q:"infection anténatale ?" },
  { k:"pas", l:"PAS",
    q:"origine des précurseurs hématopoïétiques malgré la lyse — ligne orpheline, piste et non prescription" },
  { k:"autresOrganes", l:"Relire le rang des AUTRES organes (Table 15.6)",
    q:"la rate ne date pas la mort fœtale ; « There is no fetal organ that provides a good estimate of " +
      "the timing of fetal death between 2 and 4 weeks »" },
  { k:"macro", l:"Reprendre le compte rendu macroscopique de latéralité",
    q:"nombre, siège, situs, surrénale en fer à cheval : le diagnostic splénique majeur est là" },
  { k:"caryotype", l:"Caryotype / ACPA", q:"hétérotopie spléno-pancréatique — trisomie 13 en premier lieu" },
  { k:"congele", l:"Envoi du congelé", q:"la rate est dans la liste de congélation du service" }
];

/* ── Propositions de techniques — déduites des clics, jamais imposées ─────── */
function suggerer(){
  var s = {};
  function anormal(k){ return E.signes[k] === "anormal"; }
  function un(){ for (var i = 0; i < arguments.length; i++) if (anormal(arguments[i])) return true;
                 return false; }

  if (un("pasTissuSplenique","capsuleAbsente","trabeculeLongue")) s.hes = 1;
  if (un("basoLympho","demarcationEffacee")){ s.reticuline = 1; s.autresOrganes = 1; }
  if (un("pulpeBlanchePauvre","palsAbsent","folliculesAbsents")){ s.cd3cd20 = 1; s.reticuline = 1; }
  if (un("centreGerminatif")){ s.cd3cd20 = 1; s.cdf = 1; }
  if (un("zoneMarginale")) s.marginale = 1;
  if (un("zoneManteau")) s.manteau = 1;
  if (un("infiltratInflam","inclusionVirale")) s.viro = 1;
  if (un("cd163Fort","hemophagocytose")){ s.cd163 = 1; s.perls = 1; }
  if (un("macrophagesSurcharge","cellulesSpumeuses")){ s.pas = 1; s.perls = 1; }
  if (un("perlsPositif")) s.perls = 1;
  if (un("emhInterstitielle","plusDenseQueFoie")) s.hes = 1;
  if (un("pancreasIntrasplenique","spleniqueIntrapancreatique","nonEncapsule","canauxCaliciformes",
         "interpenetration")) s.caryotype = 1;
  if (un("rateNonRetrouveeMacro","massesMultiples","nodulesAutourRate","ratePositionAnormale",
         "surrenaleFerACheval","isomerismeDroit","anomaliesViscerales")) s.macro = 1;

  if (E.mesure.def === "sinusInd" || E.mesure.def === "sinusForm") s.cd34 = 1;
  if (E.retention.basoPerdue === "present"){ s.reticuline = 1; s.autresOrganes = 1; }
  if (E.retention.precurseursRet === "present") s.pas = 1;
  if (E.retention.nonRetrouvee === "present") s.macro = 1;
  if (E.negatifs.pasCentreGerm === "present"){ s.cd3cd20 = 1; s.cdf = 1; }
  if (E.negatifs.blocDedie === "present") s.caryotype = 1;
  if (E.negatifs.perlsNeg === "present") s.perls = 1;
  if (E.prelev.congele && SIGNES.some(function(x){ return E.signes[x.k] === "anormal"; })) s.congele = 1;
  return s;
}

/* ── Contrôles propres à la rate ──────────────────────────────────────────── */
async function testsOrgane(chk, clic, set, crTient, pause){
  /* Le banc commun laisse des signes posés : on part d'un état voulu, pas supposé. */
  function pose(k, v){ if (E.signes[k] !== v) clic("les", k, v); }
  function ote(k){ if (E.signes[k]) clic("les", k, E.signes[k]); }
  function tenue(k){ return associations().some(function(a){ return a.d.k === k && a.tenu; }); }
  function lue(k){ return associations().some(function(a){ return a.d.k === k; }); }
  function propre(){ SIGNES.forEach(function(x){ ote(x.k); }); }

  /* La rate n'est dans aucune des deux horloges — et c'est le résultat, pas un trou */
  chk("absente de la Table 15.6",
      par(RETENTION, "horsRate").note.indexOf("aucune ligne splénique") >= 0);
  chk("colonne organe de la Table 37.1 détruite",
      par(RETENTION, "horsRate").note.indexOf("détruite à l'extraction") >= 0);
  chk("la borne est lue hors rate", par(RETENTION, "horsRate").d.indexOf("hors rate") >= 0);
  chk("ligne orpheline non attribuée",
      par(RETENTION, "precurseursRet").note.indexOf("AUCUN organe") >= 0);

  /* Divergences portées, jamais arbitrées */
  chk("follicules primaires : divergence non tranchée",
      par(STADES, "folliculesPrim").note.indexOf("NON tranchée") >= 0 &&
      par(STADES, "folliculesPrim").note.indexOf("24–28 SA") >= 0);
  chk("Table 25.1 nommée comme perdue",
      par(STADES, "folliculesPrim").note.indexOf("Table 25.1") >= 0);
  chk("conversion +2 déclarée présumée",
      par(STADES, "colonisation").note.indexOf("présumée") >= 0);

  /* Le centre germinatif est un SIGNE, jamais un stade */
  chk("centre germinatif dans les signes", !!par(SIGNES, "centreGerminatif"));
  chk("centre germinatif absent des stades",
      STADES.every(function(s){ return s.l.toLowerCase().indexOf("centre germinatif") < 0; }));
  chk("l'absence est le conforme",
      par(NEGATIFS, "pasCentreGerm").p.indexOf("normal fœtal") >= 0);

  /* Ce qui ne doit PAS être dans un formulaire de lecture de lame */
  chk("aucun corps de Howell-Jolly proposé",
      [PRELEV, RETENTION, STADES, VARIANTES, SIGNES, DIAGS, NEGATIFS, TECHNIQUES].every(function(t){
        return t.every(function(x){
          return JSON.stringify(x).toLowerCase().indexOf("howell") < 0; }); }));
  chk("aucun grade splénique inventé",
      SIGNES.concat(DIAGS).every(function(x){ return !/grade/i.test(x.l); }) &&
      SINUS.every(function(x){ return !/grade/i.test(x.l); }));

  /* Le poids : trois référentiels, 12 DS d'écart, aucune arbitration */
  set("sa", "36");
  set("m_ds", "-3.5");
  chk("z-score sans référentiel ininterprétable",
      crTient("ININTERPRÉTABLE") && crTient("12 DS d'écart sur la même mesure"));
  chk("les trois référentiels sont cités",
      crTient("DS Muller Brochut -1.50 / DS Guihard Costa 2002 -3.50 / DS Maroun 2018 -13.75"));
  clic("mopt", "maroun");
  chk("référentiel déclaré, z-score lisible", crTient("selon Maroun 2018"));
  chk("le service s'en défie lui-même", crTient("sans grande signification"));
  clic("mopt", "maroun");
  set("m_ds", "");

  set("m_poids", "0");
  chk("0 g est un plancher de balance", crTient("plancher de balance, pas une mesure"));
  set("m_poids", "");

  /* Le nombre de masses est LA donnée, et le module ne porte pas la ligne par masse */
  set("m_masses", "2");
  chk("définition de la polysplénie portée", crTient("similarly sized spleens that together equal"));
  chk("le poids à comparer est le cumulé", crTient("poids CUMULÉ"));
  chk("la ligne par masse manque au module", crTient("ne porte pas la ligne par masse"));
  set("m_masses", "0");
  chk("aucune masse ne conclut pas l'asplénie", crTient("Ne pas conclure à l'asplénie depuis la rate"));
  set("m_masses", "");

  /* Les sinus sont un axe PARALLÈLE, pas un rang de plus */
  clic("mdef", "sinusFaits");
  set("sa", "18");
  chk("sinus formés avant la fenêtre", crTient("avant la fenêtre de 21–25 SA"));
  chk("l'axe est déclaré parallèle", crTient("Cet axe est PARALLÈLE au rang lymphoïde"));
  chk("sinus proposent le CD34 quand ils sont en formation",
      (clic("mdef", "sinusFaits"), clic("mdef", "sinusForm"), suggerer().cd34 === 1));
  clic("mdef", "sinusForm");
  set("sa", "36");

  /* Le piège central de l'organe : une lyse qui se lit comme une déplétion */
  propre();
  pose("pulpeBlanchePauvre", "anormal");
  pose("basoLympho", "anormal");
  chk("la lyse se lit", tenue("lyseContrefaitDepletion"));
  chk("la déplétion se lit aussi", lue("deplLymphocytaire"));
  chk("les deux lectures sont au CR",
      crTient("Lyse contrefaisant la déplétion lymphocytaire") &&
      crTient("Déplétion lymphocytaire splénique"));
  chk("la déplétion n'a aucun critère sourcé",
      par(DIAGS, "deplLymphocytaire").stop.indexOf("AUCUN critère n'est sourcé") >= 0);
  chk("l'échelle thymique ne se transpose pas",
      par(DIAGS, "deplLymphocytaire").stop.indexOf("ne se transposent pas") >= 0);
  chk("l'œil adulte est le faux positif n° 1", lue("rateNormaleLueAdulte"));
  propre();

  /* Polysplénie contre rate accessoire : le discriminant n'est pas dans la rate */
  pose("nodulesAutourRate", "anormal");
  chk("des nodules seuls = rate accessoire", tenue("rateAccessoire"));
  chk("des nodules seuls ne font pas une polysplénie", !tenue("polysplenie"));
  pose("massesMultiples", "anormal");
  pose("anomaliesViscerales", "anormal");
  chk("masses multiples + anomalies viscérales = polysplénie", tenue("polysplenie"));
  chk("le discriminant est hors de la rate",
      par(DIAGS, "rateAccessoire").stop.indexOf("Visceral anomalies are seen in polysplenia") >= 0);
  chk("la zone grise est écrite",
      par(DIAGS, "rateAccessoire").stop.indexOf("Zone grise mesurée") >= 0);
  chk("le nombre n'est pas un grade",
      par(DIAGS, "polysplenie").stop.indexOf("Le compte n'est pas un grade") >= 0);
  chk("polysplénie propose la relecture macro", suggerer().macro === 1);
  propre();

  /* Asplénie : le pivot ne suffit pas, et la lyse est le différentiel n° 1 */
  pose("rateNonRetrouveeMacro", "anormal");
  chk("rate non retrouvée seule ne tient pas l'asplénie", !tenue("asplenie"));
  pose("surrenaleFerACheval", "anormal");
  chk("le témoin indirect la tient", tenue("asplenie"));
  chk("Ivemark interdit", par(DIAGS, "asplenie").stop.indexOf("Ne jamais écrire") >= 0);
  chk("la lyse est le différentiel n° 1",
      par(DIAGS, "asplenie").stop.indexOf("différentiel n° 1 est la LYSE") >= 0);
  propre();

  /* La seule entité franchement histologique de l'organe */
  pose("pancreasIntrasplenique", "anormal");
  chk("un seul signe ne fait pas la fusion", !tenue("fusionSplenoPancreatique"));
  pose("nonEncapsule", "anormal");
  chk("l'encapsulation tranche", tenue("fusionSplenoPancreatique"));
  chk("la contiguïté de prélèvement est écrite",
      par(DIAGS, "fusionSplenoPancreatique").stop.indexOf("piège de contiguïté") >= 0);
  chk("la trisomie 13 ne se nomme pas depuis la lame",
      par(DIAGS, "fusionSplenoPancreatique").stop.indexOf("Ne pas nommer la trisomie 13") >= 0);
  chk("la fusion propose le caryotype", suggerer().caryotype === 1);
  propre();

  /* L'hématopoïèse splénique est physiologique : le seul critère est relatif */
  pose("emhInterstitielle", "anormal");
  chk("un seul signe ne tient pas l'EMH exubérante", !tenue("emhExuberante"));
  pose("plusDenseQueFoie", "anormal");
  chk("le critère relatif la tient", tenue("emhExuberante"));
  chk("aucun seuil n'existe",
      par(DIAGS, "emhExuberante").stop.indexOf("proposer un grade serait inventer l'échelle") >= 0);
  propre();

  clic("ret", "basoPerdue", "present");
  chk("la lyse propose la réticuline", suggerer().reticuline === 1);
  chk("la maturation devient indéterminable",
      crTient("le rang lymphoïde du § 04 est indéterminable"));
  clic("ret", "basoPerdue", "present");
}

