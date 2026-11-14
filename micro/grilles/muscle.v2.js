/* Grille de lecture — muscle squelettique. VERSION 2 (2.0.0).
   Migration de muscle.js (1.0.1) sur le patron rein v3.5 / poumon v2.1 :
   gen_grille.py, mode présence, termes FOETO fondus dans les signes et branchés
   (termes tagués « verbatim »), blocs lus en §02, ordre de lecture (LECTURE).
   La v1 reste publiée à côté tant que la v2 n'a pas été validée à l'usage.
   Ce que la v2 change, sans rien retrancher de la v1 :
   · un signe est un CONSTAT, présent / absent / non regardé (plus normal /
     anormal) ; les lésions de la v1 restent des associations, affichées, jamais
     cochées, et chacune porte son terme maladie FOETO (13 sur 13) ;
   · les 27 constats de fiche_muscle.md tagués dans FOETO ont chacun leur signe :
     18 branchent un signe v1, 9 entrent comme signes nouveaux (mérosine en déficit
     ou normale, cores, myosine lente retardée, halo NADH, groupement et petite
     taille des fibres de type 1, tableau contractures + polyhydramnios + hypoplasie
     pulmonaire + fente palatine, anasarque précoce) et rejoignent les associations
     que la fiche leur donne. Trois termes maladie de la fiche restent sans
     association, faute de deux constats sourcés : myopathie à cores, disproportion
     congénitale des types, myasthénie néonatale — ils restent dans la recherche
     d'un autre terme FOETO. Les constats de fiche sans terme portent
     fiche:"[source]" ; la fibrose périmysiale et les ragged red fibers, sans livre
     derrière (fiche § 2 sans source, corpus CR), sont marqués hors fiche ;
   · cadres de lecture (CADRES) au lieu des cinq rubriques v1, lus du faible au fort
     grossissement ; chaque signe porte son grossissement (mag) — savoir de
     pratique [expérience], à valider à l'usage ; Gomori, IHC et typage sont
     mag:"technique". Le contexte macro / moelle / clinique sort des signes, avant
     la rétention ; le signe muscle d'aspect essentiellement normal (muscleNormal)
     quitte le contexte pour la lame (c'est un constat de lame) ;
   · signes de polarité normale (présent = normal) marqués bloc:false : le « Non »
     en bloc ne les répond pas à l'envers. Ce sont muscleNormal, perimysiumFasc
     (au pied de la lettre, l'architecture normale), calibreHomogene,
     necroseRegenerationPeu, masseOsseuseNormale, micrognathieMoindre, cornesNormales ;
   · chaque variante normale vit dans le cadre qu'elle mime (g) et ne passe au CR
     qu'en parenthèse ;
   · les douze négatifs se DÉDUISENT : sept d'un signe répondu absent, trois de deux
     signes (fascicules, atrophie, nécrose), deux d'une donnée consignée (muscle
     nommé ; négatif nosologique écrit dans la remarque) ;
   · prélèvement séparé en ce qui qualifie la lecture et en critères de coupe
     (grille macro fixée) ; le verbatim keeling du diaphragme est rendu tel que le
     livre l'écrit (paravertebral, que la v1 accentuait) ;
   · un muscle NON DÉCLARÉ n'est plus rouge : ce qui est compté (fuseau) est une
     observation, consignée sans son référentiel, l'interprétation reste ouverte.
     Un muscle déclaré non nommé ou indéterminé reste bloquant, comme en v1 ;
   · le libellé FOETO du signe myotubes dit persistance anormale : des myotubes cochés
     avant 18 SA renvoient à la variante normale (réserve nouvelle).
   Fond : ~/Bureau/fiches_lecture/fiche_muscle.md (§1 à §9).
   Les divergences entre sources sont PORTÉES dans les champs, jamais arbitrées. */

var ORGANE  = "muscle";
var TITRE   = "muscle squelettique";
var SOURCE  = "fiche_muscle.md";
var MODULE  = "grille_muscle";
var VERSION = "2.0.0";
var SCHEMA  = "0.3.0";   /* 0.3.0 : signes present/absent, négatifs déduits */
var ETATS   = "presence";
var FOETO_DANS_SIGNES = true;
/* La fiche ne latéralise jamais le muscle : elle le NOMME. Un quadriceps droit et
   un quadriceps gauche se comparent, un quadriceps et un diaphragme non — c'est le
   NOM du muscle qui commande la norme, pas son côté (§ 1, § 9.7). */
var PAIR    = false;
var BLOCS   = true;
var LECTURE = true;   /* 2.0.0 : cadres (CADRES), grossissement (mag), variantes dans leur cadre */

var TITRE_CR    = "MUSCLE SQUELETTIQUE";
var STADE_TITRE = "Stade de maturation musculaire — échelle de QUADRICEPS, en SA";

var KCL_TXT = "Fœticide par KCl déclaré. Le muscle ne date déjà aucun intervalle post-mortem — il est " +
              "absent de la Table 15.6 et le mot « muscle » ne rend aucun chunk du chapitre de " +
              "macération d'[ernst, ch. 37] ; après le geste, plus aucune borne n'est recevable.";

/* Un « retard » lu sur du muscle est d'abord une question de muscle, ensuite une
   question de terme : chaque muscle a son propre profil et aucun autre que le
   quadriceps n'est décrit (§ 9.7). */
var RETARD_NOTE = "Avant de lire un retard : sur quel muscle ? L'échelle ci-dessus est une échelle de " +
                  "QUADRICEPS. « tous les muscles possèdent dans une certaine mesure leur propre profil " +
                  "de développement » [soffoet, ch. 10], et la source ne donne le profil d'AUCUN autre " +
                  "muscle — un retard lu sur le diaphragme ou le psoas peut être un profil de diaphragme " +
                  "ou de psoas. Le seul retard de maturation musculaire qui porte un nom est la persistance " +
                  "de myotubes après 18 SA (Steinert congénital), et le discriminant est le terme, pas la lame.";

var AVANCE_NOTE = "Une avance ne se lit pas sur cet organe : l'échelle de [soffoet, ch. 10] n'a que trois " +
                  "étages et son étage 2 repose sur une source unique et francophone (le mot « Wohlfart » " +
                  "n'existe que dans soffoet ch. 10, § 9.4). Un calibre déjà uniforme avant 35 SA se " +
                  "consigne ; il ne se conclut pas.";

var TECH_NOTE = "Les pointillés sont des propositions déduites des clics, jamais des prescriptions. " +
                "HES, Gomori et PAS sont déjà de pratique de service ; l'immunohistochimie musculaire " +
                "n'existe dans aucun CR du corpus — la proposer, c'est ouvrir une pratique, pas la rappeler. " +
                "Tout ce qui exige du congelé est mort avant la première coupe sur un fœtus fixé.";

/* ── 02 · Prélèvement ─────────────────────────────────────────────────────── */
var PRELEV = [
  { k:"quadriceps", g:"Qualifie la lecture", l:"Quadriceps prélevé et nommé comme tel", grave:true,
    manque:"« The quadriceps muscle, which is generally used as a reference muscle in pathology… » " +
           "[keeling, ch. 31] — l'échelle de maturation du § 3 est une échelle de quadriceps et d'aucun " +
           "autre muscle" },
  { k:"vasteLat", g:"Qualifie la lecture", l:"Site précisé : vaste latéral en sa partie moyenne",
    manque:"[soffoet, ch. 10] nomme le site, pas seulement le muscle ; deltoïde, biceps et jambier " +
           "antérieur sont les références secondaires" },
  { k:"diaphragme", g:"Qualifie la lecture", l:"Diaphragme prélevé ou son aspect noté", grave:true,
    manque:"« Note should also be made regarding the appearance of the diaphragms, psoas, and " +
           "paravertebral muscles to give further impression of the severity of any wasting or " +
           "hypotrophy » [keeling, ch. 31]" },
  { k:"transversale", g:"Qualifie la lecture", l:"Coupe transversale disponible",
    manque:"calibre, dispersion et pourcentage de noyaux internes ne se lisent que sur coupe " +
           "transversale — mais AUCUNE source ne le prescrit pour l'HES (§ 9.1) : c'est un trou de " +
           "sourçage, pas une évidence" },
  { k:"assez", g:"Qualifie la lecture", l:"Assez de muscle sur la lame pour juger les fascicules", grave:true,
    manque:"« it is therefore important in the case of the fetus to examine sufficient muscle tissue » " +
           "[keeling, ch. 31] — la parade au piège des petites fibres rondes est QUANTITATIVE" },
  { k:"antagoniste", g:"Critères de coupe — iront à la grille macro fixée", l:"Muscle ANTAGONISTE de la contracture prélevé",
    manque:"« the abnormalities are generally most marked in muscles opposing the contracture » " +
           "[keeling, ch. 31] — le prélèvement standard du service est fixe et n'est jamais adapté " +
           "à la contracture" },
  { k:"moelle", g:"Critères de coupe — iront à la grille macro fixée", l:"Moelle épinière prélevée aux trois niveaux (cervical, distal, lombaire)",
    manque:"sans la moelle, le muscle seul ne sépare pas neurogène de myogène [soffoet, ch. 22] — " +
           "le prélèvement se décide ici, la lecture relève de neuropath" },
  { k:"congele", g:"Critères de coupe — iront à la grille macro fixée", l:"Fragment CONGELÉ pour enzymologie",
    manque:"ATPase, NADH-TR et COX/SDH exigent du congelé : sans lui l'axe du typage est perdu " +
           "avant la première coupe, quelle que soit la macération" },
  { k:"adn", g:"Critères de coupe — iront à la grille macro fixée", l:"Fragment en DNAthèque",
    manque:"« It is imperative that sufficient DNA be stored to enable molecular testing, which will " +
           "be vital in most cases » [keeling, ch. 31] ; le corpus le fait déjà — « Pour DNAthèque : " +
           "poumon, muscle » [corpus CR]" },
  { k:"fibroblastes", g:"Critères de coupe — iront à la grille macro fixée", l:"Peau prélevée pour CULTURE de fibroblastes",
    manque:"« A skin sample should be submitted for fibroblast culture storage in case metabolic " +
           "enzyme testing is required » [keeling, ch. 31] — le corpus prélève de la peau, jamais " +
           "pour la culture (§ 9.21). C'est irréversible" }
];

/* ── 03 · Rétention ───────────────────────────────────────────────────────────
   Résultat NÉGATIF du § 2 : le muscle n'a AUCUN rang dans la séquence de
   macération. Une seule ligne « bon », et elle est empruntée aux autres organes —
   même construction qu'au thymus, pour la même raison : ne rien interpoler.
   Termes FOETO de la fiche portés ici, hors signes (le générateur ne branche fv
   que sur SIGNES et DIAGS) : PF.MUS-NOR-021 (perte de basophilie), PF.MUS-NOR-017
   (débris granulaire), PF.MUS-NOR-016 (corps « mûre »). */
var MODIF = "délai accéléré par l'anasarque et par un intervalle délivrance-autopsie > 24 h ; sur le " +
            "muscle aucun modificateur n'est sourcé, ceux-ci sont ceux des organes qui portent la borne";

var RETENTION = [
  { k:"horsMuscle", l:"Rang de rétention établi sur les AUTRES organes", b:"celle des autres organes",
    d:"lue hors muscle, Table 15.6", h:1, q:"bon",
    note:"le muscle squelettique ne figure à aucun des dix rangs de [keeling, ch. 15, Table 15.6], et " +
         "une recherche des mots « muscle » et « skeletal » dans tout le chapitre 37 d'[ernst] ne rend " +
         "aucun chunk — la borne portée ici est celle du rein, du foie, du myocarde ou du poumon, " +
         "jamais celle du muscle ; deux lectures restent ouvertes et aucune n'est sourcée (§ 9.2) : " +
         "soit le muscle n'a pas été étudié, soit il ne date pas",
    alerte:MODIF },
  { k:"basophiliePerdue", l:"Perte de basophilie nucléaire des fibres", b:"—", d:"non situable au muscle",
    h:0, q:"mauvais",
    note:"« There is a predictable pattern of loss of nuclear basophilia in the internal organs which " +
         "should not be mistaken for necrosis » [keeling, ch. 15] — mais le muscle n'est pas dans la " +
         "table : on ne sait pas quand il perd sa basophilie, on sait seulement qu'il ne faut pas la " +
         "lire comme une nécrose de fibre" },
  { k:"contractionBand", l:"« Nécrose musculaire de contraction »", b:"—", d:"borne non sourcée",
    h:0, q:"mauvais",
    note:"le terme FOETO:PF.MUS-RET-038 de la base porte une borne « rétention >12h » qui n'existe " +
         "dans AUCUNE source — ni Table 15.6, ni Table 37.1, ni keeling ch. 31, ni soffoet ch. 10 — et " +
         "l'expression contraction band n'est sourcée que pour le MYOCARDE [ashworth, ch. 6]. " +
         "Quatrième occurrence du même défaut dans la série (§ 9.3) : ne pas dater là-dessus" },
  { k:"debrisGranulaire", l:"Débris granulaire des tissus mous", b:"—", d:"non datable seul", h:0, q:"mauvais",
    note:"« Degeneration of soft tissues results in granular debris which may be mistaken for bacterial " +
         "colonisation » [keeling, ch. 15] ; le critère de discrimination est la présence d'une réponse " +
         "inflammatoire — faire un Gram tissulaire avant de conclure" },
  { k:"mulberry", l:"Corps « mûre » (mulberry-like bodies) dans les vaisseaux", b:"≈ 2–3 jours",
    d:"lu hors muscle, [keeling, ch. 15]", h:60, q:"moyen",
    note:"« should not be mistaken for infective organisms » [keeling, ch. 15] — le muscle est richement " +
         "vascularisé donc il les porte, mais la borne est celle de l'artefact vasculaire général, elle " +
         "n'a jamais été mesurée SUR le muscle",
    alerte:MODIF },
  { k:"enzymoMorte", l:"Enzymologie négative sur prélèvement fixé", b:"—", d:"jamais un résultat", h:0,
    q:"mauvais",
    note:"ATPase, NADH-TR et COX/SDH sont ininterprétables par principe sur du fixé : un COX négatif ne " +
         "dit RIEN. Le terme MUS-RET-001 de la base existe sans porter cette réserve. Ce qui tombe en " +
         "premier au muscle n'est pas un axe morphologique, c'est l'axe du typage" }
];

/* ── 04 · Maturation — l'échelle native de soffoet, en SA, sur le quadriceps ──
   (terme FOETO de la fiche : PF.MUS-NOR-013, l'axe de maturation lui-même) */
var STADES = [
  { k:"ebauche", l:"1 — ébauche : cellules mononucléées et myotubes à noyaux centraux", max:18,
    note:"« tous les myotubes ont normalement disparu à 18 SA » [soffoet, ch. 10] ; avant 18 SA la lame " +
         "normale est une AUTRE lame, et le corpus l'écrit correctement — « Au microscope, les muscles ne " +
         "sont constitués que de myotubes (normal pour le terme déterminé) » [corpus CR]" },
  { k:"foetal",  l:"2 — aspect fœtal : fibres de Wohlfart « a » (petites) et « b » (grandes) distinguables",
    max:35,
    note:"distinguables « normalement entre 18 et 35 SA » [soffoet, ch. 10] — étage reposant sur une " +
         "SOURCE UNIQUE et francophone : le mot Wohlfart n'a aucune occurrence dans ernst, keeling ni " +
         "ashworth (§ 9.4). La différence de calibre s'atténue progressivement, ce n'est pas un palier" },
  { k:"terme",   l:"3 — fin de grossesse : calibre uniforme, fibres « a » et « b » non reconnaissables",
    max:99,
    /* Verbatim porteur d'une apostrophe ET de guillemets droits : il ne peut ni tenir
       dans une chaîne à guillemets doubles ni dans une chaîne à apostrophes sans
       échappement — et un échappement le rendrait faux à l'affichage. Littéral brut. */
    note:`« il n'est plus possible de reconnaître des fibres "a" et "b" de Wohlfart après 35 SA » ` +
         "[soffoet, ch. 10] — le recrutement tardif des fibres de 2e génération vers le phénotype lent, " +
         "entre 20 et 35 SA, est le mécanisme qui explique cette homogénéisation" }
];

/* ── 04 bis · Le muscle prélevé, le plan de coupe, le fuseau ──────────────────
   Deux axes catégoriels imposés par le contrat, et ce sont exactement les deux
   que la fiche désigne comme conditions de lecture : QUEL muscle (§ 1, § 9.7) et
   sur QUEL plan (§ 9.1). Le champ numérique unique est le compte de couches
   capsulaires du fuseau — le seul repère qui gradue 13 à 33 SA (§ 3, § 9.17).
   (terme FOETO de la fiche : PF.MUS-NOR-012 ; PF.MUS-NOR-014 et PF.MUS-NOR-015,
   calibre et pourcentage de noyaux internes, ne sont PAS des champs : § 10.8) */
var MUSCLES = [
  { k:"quadriceps",   l:"Quadriceps — muscle de référence" },
  { k:"diaphragme",   l:"Diaphragme — muscle de commodité" },
  { k:"psoas",        l:"Psoas" },
  { k:"paravertebral", l:"Paravertébral" },
  { k:"antagoniste",  l:"Antagoniste de la contracture" },
  { k:"oculomoteur",  l:"Muscle oculo-moteur, sur lame d'orbite" },
  { k:"autre",        l:"Autre muscle, nommé en clair dans la remarque" },
  { k:"indetermine",  l:"Indéterminé — « soit le diaphragme, soit le muscle pariétal »" },
  { k:"nonNomme",     l:"NON nommé sur le bloc" }
];

var PLANS = [
  { k:"transversal",  l:"Transversal" },
  { k:"longitudinal", l:"Longitudinal" },
  { k:"oblique",      l:"Oblique — plan indéterminable" }
];

var MESURE = {
  titre:"Muscle prélevé, plan de coupe, fuseau neuromusculaire",
  defLabel:"muscle prélevé — sans son nom, aucune norme",
  optLabel:"plan de coupe — commande ce qui est mesurable",
  defs:MUSCLES, opts:PLANS,
  champs:[{ id:"couches", label:"Couches capsulaires du fuseau (nb)", min:0, max:15, step:1 }]
};

/* La chronologie du fuseau d'[ernst, ch. 33], convertie en SA. Les bornes sont
   celles de la fiche : 1 couche à 14-16 SA, 2 couches à 17 SA, 5 couches au
   maximum fœtal à 33 SA. Au-delà de 5, on est en territoire postnatal. */
function fuseauSA(n){
  if (n <= 0) return { txt:"aucune couche capsulaire comptée", sa:null };
  if (n === 1) return { txt:"capsule à 1 couche", sa:"≈ 14–16 SA" };
  if (n === 2) return { txt:"capsule à 2 couches", sa:"≈ 17 SA" };
  if (n <= 5)  return { txt:"capsule à " + n + " couches", sa:"entre 17 et 33 SA, sans palier sourcé" };
  return { txt:"capsule à " + n + " couches", sa:"au-dessus du maximum fœtal de 5 couches" };
}

/* Le muscle déclaré NON nommé (ou indéterminé) bloque : c'est le verdict le plus
   lourd de cette grille. Construction empruntée à peau.js, où la région non nommée
   rend le stade ininterprétable — ici c'est le NOM du muscle qui joue ce rôle.
   v2 : un muscle simplement NON DÉCLARÉ n'est plus rouge — le compte de couches
   est une observation, il s'entre sans son référentiel ; l'interprétation attend. */
function verdictMesure(){
  var mus = E.mesure.def, plan = E.mesure.opt, n = E.mesure.v.couches, sa = num("sa");
  if (!mus && !plan && n == null && !E.stade)
    return { cls:"", txt:"Ni muscle nommé, ni plan de coupe, ni fuseau compté — le muscle n'est pas encore lu." };

  var t = [], cls = "ok", res = [];

  if (mus === "nonNomme" || mus === "indetermine"){
    cls = "bad";
    t.push((mus === "nonNomme" ? "Muscle déclaré NON nommé sur le bloc" : "Muscle déclaré INDÉTERMINÉ") +
           " : la maturation musculaire est ININTERPRÉTABLE et aucun normal ne s'applique. " +
           "« tous les muscles possèdent dans une certaine mesure leur propre profil de développement » " +
           "[soffoet, ch. 10], et la source ne donne le profil d'AUCUN muscle autre que le quadriceps " +
           "(§ 9.7) : un muscle qu'on ne sait pas nommer ne se compare à aucun normal. Ce n'est pas une " +
           "hypothèse d'école — le corpus l'écrit lui-même : « soit du diaphragme, soit du muscle " +
           "pariétal » [corpus CR]. Écrire l'indétermination, ne pas la laisser vide.");
  } else if (!mus){
    cls = "warn";
    t.push("Muscle NON déclaré : ce qui est compté est consigné, l'interprétation reste ouverte — aucune " +
           "norme de maturation ne s'applique tant que le muscle n'est pas nommé, l'échelle du § 3 étant une " +
           "échelle de quadriceps (§ 9.7). Déclarer le muscle, ou son indétermination.");
  } else if (mus === "quadriceps"){
    t.push("Muscle : quadriceps — c'est le muscle de l'échelle du § 3, la lecture de stade est recevable.");
  } else {
    cls = "warn";
    t.push("Muscle : " + par(MUSCLES, mus).l.toLowerCase().split(" —")[0] + " — ce n'est PAS le " +
           "quadriceps. L'échelle de maturation est une échelle de quadriceps et le corpus ne contient " +
           "le profil d'aucun autre muscle : un « retard de maturation » lu ici peut être le profil " +
           "propre de ce muscle (§ 9.7).");
    if (mus === "oculomoteur")
      t.push("Les muscles oculo-moteurs sont d'origine mésodermique CRÂNIALE, distincte des somites " +
             "[keeling, ch. 31] : leur profil de maturation n'est pas celui du quadriceps.");
    if (mus === "diaphragme")
      t.push("Le diaphragme arrive aussi sur la lame de foie sans être annoncé — « un peu de tissu " +
             "musculaire provenant du diaphragme » [corpus CR] : vérifier que le bloc lu est bien un " +
             "bloc de muscle et non un bord de bloc hépatique.");
  }

  if (plan === "transversal"){
    t.push("Coupe transversale : calibre, dispersion et pourcentage de noyaux internes sont lisibles. " +
           "Aucune source ne PRESCRIT pourtant ce plan pour l'HES — la seule mention du plan de coupe " +
           "dans les livres concerne l'enzymologie oxydative (§ 9.1) : le plan est nécessaire à la " +
           "lecture, il n'est pas exigé par un texte.");
  } else if (plan === "longitudinal"){
    if (cls === "ok") cls = "warn";
    t.push("Coupe longitudinale : ni le calibre, ni la dispersion, ni le pourcentage de noyaux internes " +
           "ne se lisent — les trois mesures des § 3 et § 4 exigent le transversal. Les stries " +
           "transversales et les chaînes de noyaux centraux des myotubes restent visibles.");
  } else if (plan === "oblique"){
    if (cls === "ok") cls = "warn";
    t.push("Plan indéterminable : un oblique majore faussement le calibre et fait paraître internes des " +
           "noyaux périphériques. Ne rien chiffrer sur ce plan.");
  } else {
    res.push("plan de coupe non déclaré — il commande à peu près tout ce qui est mesurable ici");
  }

  if (n != null){
    var f = fuseauSA(n);
    if (cls === "ok") cls = "warn";
    t.push("Fuseau neuromusculaire : " + f.txt + (f.sa ? " (" + f.sa + " [ernst, ch. 33])" : "") + ". " +
           "Ce compte est le SEUL repère qui gradue 13 à 33 SA, là où l'échelle de soffoet est un " +
           "plateau — mais il n'est validé NULLE PART comme mesure de terme : aucune source ne l'utilise " +
           "pour dater, aucun CR ne le pratique, aucun terme de la base ne le porte (§ 9.17). Il se " +
           "consigne comme observation, il ne date pas.");
    if (n > 5)
      t.push("Au-dessus de 5 couches, on sort du fœtal : la capsule adulte compte 10 à 15 couches " +
             "[ernst, ch. 33]. Vérifier le terme et le comptage avant d'en faire quoi que ce soit.");
    if (plan !== "transversal")
      res.push("le fuseau se compte sur une capsule coupée en travers — sans plan transversal déclaré, " +
               "le compte de couches n'est pas qualifié");
    res.push("un fuseau coupé transversalement mime un groupe de fibres atrophiques encapsulées : " +
             "ce n'est ni un nerf ni une lésion, il siège dans le périmysium (§ 8, piège 21)");
  }

  if (sa != null && sa > 18 && E.signes.myotubes === POS && mus === "quadriceps")
    res.push("myotubes déclarés à " + sa + " SA sur un quadriceps : au-delà de 18 SA leur persistance " +
             "n'est plus un stade, elle est un signe — le discriminant est le terme, et il vient de la " +
             "macro, pas de la lame (§ 8, piège 13)");
  /* v2 : le libellé FOETO du signe dit « persistance anormale » — avant 18 SA, c'est la variante. */
  if (sa != null && sa < 18 && E.signes.myotubes === POS)
    res.push("myotubes déclarés à " + sa + " SA : avant 18 SA ils sont le stade 1 normal — c'est la " +
             "variante normale des myotubes avant 18 SA, pas le signe de persistance (§ 8, piège 13)");
  if (sa != null && sa >= 18 && sa <= 35 && E.signes.dispersion === POS)
    res.push("dispersion de calibre déclarée à " + sa + " SA, c'est-à-dire DANS la fenêtre 18–35 SA où " +
             "la bimodalité des fibres « a » et « b » de Wohlfart est NORMALE : séparer une bimodalité " +
             "de deux populations d'une dispersion anarchique avant de coter (§ 8, piège 14)");
  if (!E.prelev.assez)
    res.push("quantité de muscle non confirmée — la parade au piège des petites fibres rondes est " +
             "quantitative, pas qualitative");
  if (!E.stade)
    res.push("stade de maturation non consigné");
  if (E.mesure.v.couches == null && sa != null && sa < 18)
    res.push("sous 18 SA l'échelle de soffoet est un plateau sans gradation interne : le compte de " +
             "couches capsulaires du fuseau est le seul repère disponible entre 13 et 33 SA");

  if (res.length){ if (cls === "ok") cls = "warn"; t.push("Réserves : " + res.join(" ; ") + "."); }
  return { cls:cls, txt:t.join(" ") };
}

/* ── Cadres de lecture — dans l'ordre où la lame se lit ───────────────────────
   Architecture au faible (fascicules, atrophie groupée, conjonctif), puis la fibre
   (calibre, noyaux), puis les lésions et les colorations spéciales. Le contexte
   hors lame (macro, moelle, clinique) se répond avant la rétention. */
var CADRES = [
  { g:"Contexte hors lame — macro, moelle, clinique", hors:true },
  { g:"Architecture fasciculaire", sur:"Architecture" },
  { g:"Atrophie groupée et fibres hypertrophiques", sur:"Architecture" },
  { g:"Tissu conjonctif et aspect dystrophique", sur:"Architecture" },
  { g:"Calibre des fibres", sur:"Fibre musculaire" },
  { g:"Noyaux et myotubes", sur:"Fibre musculaire" },
  { g:"Nécrose, régénération et inflammation", sur:"Lésions et colorations spéciales" },
  { g:"Structures et inclusions", sur:"Lésions et colorations spéciales" }
];

/* ── 05 · Variantes normales ──────────────────────────────────────────────────
   Le muscle fœtal est l'organe de la série où le normal mime le mieux la lésion :
   quatre de ces lignes sont des pièges nommés du § 8. Chacune vit dans le cadre
   dont elle mime un signe. (Termes FOETO de la fiche : PF.MUS-NOR-018 petites
   fibres rondes, PF.MUS-NOR-019 fuseau, PF.MUS-NOR-020 oculo-moteurs.) */
var VARIANTES = [
  { k:"petitesRondes", g:"Calibre des fibres", l:"Petites fibres rondes — normales chez le FŒTUS" },
  { k:"wohlfart",      g:"Calibre des fibres", l:"Bimodalité « a » / « b » de Wohlfart entre 18 et 35 SA" },
  { k:"myotubesJeune", g:"Noyaux et myotubes", l:"Myotubes avant 18 SA — stade, pas maladie" },
  { k:"fuseau",        g:"Atrophie groupée et fibres hypertrophiques", l:"Fuseau neuromusculaire du périmysium, coupé en travers" },
  { k:"noyauxInternesRares", g:"Noyaux et myotubes", l:"Quelques noyaux internes, moins de 5 % à terme" },
  { k:"glycogenePAS",  g:"Structures et inclusions", l:"Répartition inhomogène du glycogène au PAS" },
  { k:"muscleFoie",    g:"Architecture fasciculaire", l:"Muscle strié en bordure d'un bloc de foie ou de paroi" },
  { k:"oculomoteurs",  g:"Calibre des fibres", l:"Muscles oculo-moteurs sur une lame d'orbite" }
];

/* ── 06 · Signes ──────────────────────────────────────────────────────────────
   On coche ce qu'on voit, un signe à la fois. Aucun nom de maladie ici : les noms
   se lisent en dessous, dans DIAGS, par association des signes cochés. Un signe
   branché (fv) prend son libellé et son HPO dans FOETO ; un l à côté d'un fv est
   le libellé v1, gardé pour mémoire quand il était plus précis (la précision passe
   dans meta, qui s'affiche). bloc:false = polarité normale, hors du « Non » en bloc. */
var SIGNES = [
  /* — Contexte hors lame — macro, moelle, clinique — lu ailleurs, répondu ici
       parce qu'il commande la lecture — */
  { k:"contractures", fiche:"[keeling, ch. 31]", g:"Contexte hors lame — macro, moelle, clinique", l:"Contractures multiples articulaires (macro)" },
  { k:"contracturesDistales", fiche:"[keeling, ch. 31]", g:"Contexte hors lame — macro, moelle, clinique", l:"Contractures distales seulement (mains, pieds, poignets, chevilles)" },
  { k:"contracturesPoly", fv:"FOETO:PF.MUS-MAL-013", g:"Contexte hors lame — macro, moelle, clinique",
    meta:"ce qui sépare la SDAF de l'AMC [keeling, ch. 31] — redit trois signes de ce cadre, répondre aussi chacun" },
  { k:"asymetrie", fiche:"[keeling, ch. 31]", g:"Contexte hors lame — macro, moelle, clinique", l:"Anomalies posturales ASYMÉTRIQUES" },
  { k:"masseOsseuseNormale", bloc:false, fiche:"[keeling, ch. 31]", g:"Contexte hors lame — macro, moelle, clinique", l:"Masse osseuse normale" },
  { k:"micrognathieMoindre", bloc:false, fiche:"[keeling, ch. 31]", g:"Contexte hors lame — macro, moelle, clinique", l:"Micrognathie peu marquée" },
  { k:"ptergyium", fiche:"[keeling, ch. 31]", g:"Contexte hors lame — macro, moelle, clinique", l:"Ptérygia" },
  { k:"anasarquePrecoce", fv:"FOETO:PF.MUS-MAL-017", g:"Contexte hors lame — macro, moelle, clinique",
    meta:"« early-onset (first-trimester) hydrops leads to the formation of pterygia » [keeling, ch. 31]" },
  { k:"hydramnios", fiche:"[soffoet, ch. 22]", g:"Contexte hors lame — macro, moelle, clinique", l:"Polyhydramnios" },
  { k:"oligoamnios", fiche:"[keeling, ch. 31]", g:"Contexte hors lame — macro, moelle, clinique", l:"Oligoamnios documenté" },
  { k:"hypoplasiePulm", fiche:"[soffoet, ch. 22]", g:"Contexte hors lame — macro, moelle, clinique", l:"Hypoplasie pulmonaire" },
  { k:"fentePalatine", fiche:"[keeling, ch. 31]", g:"Contexte hors lame — macro, moelle, clinique", l:"Fente palatine" },
  { k:"anasarque", fiche:"[soffoet, ch. 22]", g:"Contexte hors lame — macro, moelle, clinique", l:"Œdème sous-cutané ou anasarque" },
  { k:"diaphragmeSureleve", fiche:"[soffoet, ch. 22]", g:"Contexte hors lame — macro, moelle, clinique", l:"Diaphragme surélevé ou éventré" },
  { k:"peauRigide", fiche:"[keeling, ch. 31]", g:"Contexte hors lame — macro, moelle, clinique", l:"Peau rigide, bouche fixée ouverte en « O »" },
  { k:"mortNeuronale", fiche:"[soffoet, ch. 22]", g:"Contexte hors lame — macro, moelle, clinique", l:"Mort neuronale des cornes antérieures (moelle, 3 niveaux)" },
  { k:"cornesNormales", bloc:false, fiche:"[keeling, ch. 31]", g:"Contexte hors lame — macro, moelle, clinique", l:"Cornes antérieures SANS déplétion ni dégénérescence" },

  /* — Architecture fasciculaire — le seul axe qui survit à la fixation — */
  { k:"fasciculesIncomplets", fv:"FOETO:PF.MUS-RET-019", g:"Architecture fasciculaire", mag:"faible", l:"Fascicules incomplets",
    meta:"axe qui survit à la fixation ET à la macération" },
  { k:"adipeux", fv:"FOETO:PF.MUS-RET-040", g:"Architecture fasciculaire", mag:"faible", l:"Remplacement adipeux intrafasciculaire",
    meta:"intrafasciculaire" },
  { k:"perimysiumFasc", bloc:false, fv:"FOETO:PF.MUS-MAL-020", g:"Architecture fasciculaire", mag:"faible", l:"Fascicules entourés de périmysium",
    meta:"« said to be a characteristic feature »" },
  { k:"muscleNormal", bloc:false, fiche:"[keeling, ch. 31]", g:"Architecture fasciculaire", mag:"faible", l:"Muscle d'aspect essentiellement normal",
    meta:"n'exclut aucune maladie létale — se répond seul, en fin de lecture" },

  /* — Atrophie groupée et fibres hypertrophiques — */
  { k:"atrophieGroupee", fv:"FOETO:PF.MUS-MAL-002", g:"Atrophie groupée et fibres hypertrophiques", mag:"faible", l:"Atrophie groupée de larges groupes de fibres",
    meta:"« large group atrophy » [keeling, ch. 31] — groupes de fibres atrophiques" },
  { k:"atrophieFasciculaire", fiche:"[soffoet, ch. 10]", g:"Atrophie groupée et fibres hypertrophiques", mag:"faible", l:"Atrophie fasciculaire",
    meta:"le motif nommé par soffoet — deux sources, deux mots pour une image voisine" },
  { k:"fibresHypertrophiques", fv:"FOETO:PF.MUS-RET-022", g:"Atrophie groupée et fibres hypertrophiques", mag:"moyen", l:"Fibres hypertrophiques isolées, dispersées",
    meta:"isolées, dispersées — « scattered enlarged individual fibers » [keeling, ch. 31]" },
  { k:"fibresArrondies", fv:"FOETO:PF.MUS-MAL-015", g:"Atrophie groupée et fibres hypertrophiques", mag:"moyen", l:"Aspect arrondi des fibres atrophiques" },
  { k:"groupementType1", fv:"FOETO:PF.MUS-RET-049", g:"Atrophie groupée et fibres hypertrophiques", mag:"technique",
    meta:"forme infantile du Steinert, muscle par ailleurs « relatively normal » — exige le typage, donc du congelé" },
  { k:"type1PlusPetites", fv:"FOETO:PF.MUS-RET-051", g:"Atrophie groupée et fibres hypertrophiques", mag:"technique",
    meta:"définition de la disproportion congénitale de types — exige le typage ; peut être un stade « pre-pathologic » d'amyotrophie spinale" },

  /* — Tissu conjonctif et aspect dystrophique — */
  { k:"fibrosePerimysiale", g:"Tissu conjonctif et aspect dystrophique", mag:"faible", l:"Fibrose périmysiale",
    meta:"rattrapable au trichrome sur fixé" },
  { k:"fibroseEndomysiale", fv:"FOETO:PF.MUS-RET-024", g:"Tissu conjonctif et aspect dystrophique", mag:"moyen", l:"Prolifération conjonctive de l'endomysium" },
  { k:"fibresReduites", fv:"FOETO:PF.MUS-MAL-016", g:"Tissu conjonctif et aspect dystrophique", mag:"moyen", l:"Diminution du nombre et du diamètre des fibres",
    meta:"« diminution du nombre et du diamètre » chez soffoet : le diamètre seul se répond au signe de petite taille des fibres" },
  { k:"necroseRegenerationPeu", bloc:false, fv:"FOETO:PF.MUS-MAL-001", g:"Tissu conjonctif et aspect dystrophique", mag:"moyen", l:"Nécrose et régénération PEU importantes",
    meta:"négatif qui vaut critère positif de DMC — ne se répond qu'en contexte de fibrose" },
  { k:"merosineDeficit", fv:"FOETO:PF.MUS-MAL-007", g:"Tissu conjonctif et aspect dystrophique", mag:"technique",
    meta:"DMC1A / LAMA2, 40 à 50 % des DMC — IHC faisable sur fixé, jamais pratiquée au corpus" },
  { k:"merosineNormale", fv:"FOETO:PF.MUS-MAL-018", g:"Tissu conjonctif et aspect dystrophique", mag:"technique",
    meta:"critère majeur de la myopathie inflammatoire congénitale (McNeil 2002)" },

  /* — Calibre des fibres — sur coupe transversale — */
  { k:"dispersion", fv:"FOETO:PF.MUS-MAL-006", g:"Calibre des fibres", mag:"moyen", l:"Dispersion de calibre",
    meta:"bimodale = Wohlfart si 18–35 SA ; anarchique = à coter" },
  { k:"petitesFibres", fv:"FOETO:PF.MUS-MAL-011", g:"Calibre des fibres", mag:"moyen", l:"Fibres de petite taille",
    meta:"« small and rounded as they are in arthrogryposis » chez le fœtus normal" },
  { k:"hypotrophieGen", fiche:"[keeling, ch. 31]", g:"Calibre des fibres", mag:"moyen", l:"Hypotrophie généralisée des fibres" },
  { k:"calibreHomogene", bloc:false, fiche:"[soffoet, ch. 10]", g:"Calibre des fibres", mag:"moyen", l:"Calibre uniforme, fibres « a » et « b » non reconnaissables",
    meta:"repère du stade 3, après 35 SA" },

  /* — Noyaux et myotubes — */
  { k:"myotubes", fv:"FOETO:PF.MUS-MAL-010", g:"Noyaux et myotubes", mag:"moyen", l:"Myotubes présents — noyaux centraux en chaîne",
    meta:"noyaux centraux en chaîne ; normal avant 18 SA, signe après — le terme tranche, pas la lame" },
  { k:"noyauxCentrauxPredom", fiche:"[keeling, ch. 31]", g:"Noyaux et myotubes", mag:"moyen", l:"Prédominance de noyaux centraux" },
  { k:"morphoMyotubulaire", fiche:"[keeling, ch. 31]", g:"Noyaux et myotubes", mag:"moyen", l:"Morphologie myotubulaire diffuse" },
  { k:"noyauxInternes", fv:"FOETO:PF.MUS-RET-035", g:"Noyaux et myotubes", mag:"fort", l:"Noyaux internes au-delà de 5 %",
    meta:"au-delà de 5 % ; 5–75 % dans la myopathie myotubulaire — les seuils se touchent à 5 %" },
  { k:"myosineLenteRetardee", fv:"FOETO:PF.MUS-MAL-019", g:"Noyaux et myotubes", mag:"technique",
    meta:"retardée dans le Steinert, normale dans la myopathie myotubulaire — le différentiel exige de l'immuno" },
  { k:"haloNadh", fv:"FOETO:PF.MUS-RET-028", g:"Noyaux et myotubes", mag:"technique",
    meta:"NADH-TR, donc du congelé — halo de Farkas-Bargeton" },

  /* — Nécrose, régénération et inflammation — */
  { k:"necroseHemorragique", fv:"FOETO:PF.MUS-VAS-001", g:"Nécrose, régénération et inflammation", mag:"faible", l:"Nécrose hémorragique des muscles périphériques",
    meta:"fait évoquer un échovirus, jamais la rétention" },
  { k:"infiltrat", fv:"FOETO:PF.MUS-RET-050", g:"Nécrose, régénération et inflammation", mag:"moyen", l:"Infiltrat inflammatoire intramusculaire",
    meta:"non spécifique — présent dans plusieurs DMC" },
  { k:"regeneration", fv:"FOETO:PF.MUS-RET-043", g:"Nécrose, régénération et inflammation", mag:"moyen", l:"Régénération (fibres basophiles, noyaux vésiculeux)",
    meta:"fibres basophiles, noyaux vésiculeux" },
  { k:"necrose", fiche:"[soffoet, ch. 10]", g:"Nécrose, régénération et inflammation", mag:"fort", l:"Nécrose de fibres" },

  /* — Structures et inclusions — colorations sur fixé, typage sur congelé — */
  { k:"vacuolaire", fv:"FOETO:PF.MUS-RET-018", g:"Structures et inclusions", mag:"fort", l:"Dégénérescence vacuolaire" },
  { k:"batonnets", fv:"FOETO:PF.MUS-MAL-003", g:"Structures et inclusions", mag:"technique", l:"Bâtonnets (rods) au Gomori trichrome modifié",
    meta:"au Gomori trichrome modifié, sur fixé" },
  { k:"raggedRed", g:"Structures et inclusions", mag:"technique", l:"Ragged red fibers au Gomori",
    meta:"au Gomori — négatif déjà écrit par le service" },
  { k:"cores", fv:"FOETO:PF.MUS-MAL-014", g:"Structures et inclusions", mag:"technique",
    meta:"exige l'enzymologie oxydative, donc du congelé ; « habituellement uniques et excentrés » (RYR1)" }
];

/* ── 06 bis · Associations — affichées, jamais cochées ────────────────────────
   Le nom se déduit des signes. « cle » est le signe pivot : sans lui le compte
   peut être atteint sans que l'association tienne. */
var DIAGS = [
  { k:"amyoplasie", l:"Amyoplasie", fv:"FOETO:PF.MUS-MAL-021", cle:"adipeux", min:2,
    signes:["adipeux","fasciculesIncomplets","perimysiumFasc","petitesFibres","contractures"],
    stop:" — LE PIÈGE CENTRAL de cet organe : « In the case of the normal fetus, muscle fibers are " +
         "small and rounded as they are in arthrogryposis and this may cause some confusion in " +
         "interpretation » [keeling, ch. 31]. Le critère qui fait l'amyoplasie chez le nouveau-né est " +
         "un état NORMAL chez le fœtus. Seuls les fascicules incomplets et le remplacement adipeux ne " +
         "sont jamais normaux, et la parade est quantitative : examiner assez de muscle. Le quadriceps " +
         "standard peut aussi être le mauvais muscle, les lésions étant maximales dans l'antagoniste " +
         "de la contracture." },

  { k:"sma", l:"Amyotrophie spinale infantile", fv:"FOETO:PF.MUS-MAL-022", cle:"atrophieGroupee", min:2,
    signes:["atrophieGroupee","fibresHypertrophiques","fibresArrondies","atrophieFasciculaire",
            "mortNeuronale"],
    stop:" — DIVERGENCE FRONTALE ET NON TRANCHÉE, la plus lourde de la fiche (§ 9.9) : [keeling, ch. 31] " +
         "écrit « Diagnosis by examination of skeletal muscle is straightforward, with the typical " +
         "appearance of large group atrophy with scattered enlarged individual fibers and generally " +
         "being readily apparent in routine hematoxylin and eosin-stained sections », quand " +
         "[soffoet, ch. 10] dit les biopsies délicates et l'examen « ne montre parfois que des lésions " +
         "minimes ». Écrire laquelle des deux lectures on retient. Et le piège de sens inverse : une " +
         "disproportion congénitale de types peut être un stade « pre-pathologic » de SMA — mais les " +
         "deux entités exigent le typage, donc du congelé." },

  { k:"dmc", l:"Dystrophie musculaire congénitale", fv:"FOETO:PF.MUS-MAL-025", cle:"fibroseEndomysiale", min:2,
    signes:["fibroseEndomysiale","fibresReduites","necroseRegenerationPeu","fibrosePerimysiale",
            "infiltrat","merosineDeficit"],
    stop:" — le NÉGATIF est ici un critère POSITIF : « nécrose et régénération sont peu importantes » " +
         "[soffoet, ch. 10] dans un muscle très fibreux oriente vers une DMC, et c'est lisible au " +
         "trichrome sur du fixé. Un infiltrat ne fait PAS une myopathie inflammatoire : il est non " +
         "spécifique dans Fukuyama, Walker-Warburg et le déficit en laminine-α2. Le sous-type ne se " +
         "nomme pas sans immunohistochimie — et la mérosine couvrirait 40 à 50 % des DMC." },

  { k:"myotubulaire", l:"Myopathie myotubulaire / centronucléaire", fv:"FOETO:PF.MUS-MAL-028", cle:"noyauxCentrauxPredom", min:2,
    signes:["noyauxCentrauxPredom","noyauxInternes","petitesFibres","morphoMyotubulaire"],
    stop:" — le seuil de la maladie CHEVAUCHE le normal : les noyaux centraux y sont « dans 5 à 75 % " +
         "des cas » [soffoet, ch. 10] et le normal est « up to 5% » [ernst, ch. 33] — à 5 % les deux se " +
         "touchent et aucune source ne donne de seuil de décision (§ 9.16). La forme liée à l'X (MTM1, " +
         "Xq28) ne concerne que les garçons. Le différentiel avec le Steinert exige de l'immuno." },

  { k:"steinert", l:"Dystrophie myotonique congénitale (Steinert)", fv:"FOETO:PF.MUS-MAL-033", cle:"myotubes", min:2,
    signes:["myotubes","petitesFibres","dispersion","hydramnios","myosineLenteRetardee","haloNadh",
            "groupementType1"],
    stop:" — la persistance de myotubes n'est un signe qu'APRÈS 18 SA : avant, c'est le stade 1 normal. " +
         "Le discriminant n'est pas sur la lame, il vient de la macro — une image de myotube sans terme " +
         "déclaré n'est pas interprétable. Transmission exclusivement maternelle ; le diagnostic " +
         "définitif est l'analyse ADN des répétitions CTG, pas la lame." },

  { k:"sdaf", l:"Séquence de déformation d'akinésie fœtale (SDAF / FADS)", fv:"FOETO:PF.MUS-MAL-031", cle:"contractures", min:2,
    signes:["contractures","hydramnios","hypoplasiePulm","fentePalatine","anasarque",
            "diaphragmeSureleve","contracturesPoly"],
    stop:" — ce n'est PAS un diagnostic : " +
         `« the terms "fetal akinesia" and "fetal akinesia deformation sequence (FADS)" do not represent a specific diagnosis but rather describe a phenotype with heterogeneous causes »` +
         " [keeling, ch. 31], et de même « arthrogryposis is not a " +
         "disorder but rather a phenotype ». Le tableau « dépend du moment de l'arrêt des mouvements et " +
         "non de sa cause » [soffoet, ch. 22]. Le « 60 % de formes neurogènes » est un chiffre de " +
         "DÉTECTION de 1996, pas une prévalence : la source dit elle-même que les formes myogènes sont " +
         "sous-diagnostiquées. Neurogène contre myogène exige la moelle aux trois niveaux." },

  /* La clé diffère du signe « oligoamnios » : aucun bouton de signe ne doit porter
     le nom d'une association, sinon le diagnostic redeviendrait cliquable. */
  { k:"contrainte", l:"Contrainte intra-utérine — séquence oligoamnios", fv:"FOETO:PF.MUS-MAL-032", cle:"oligoamnios", min:2,
    signes:["oligoamnios","asymetrie","masseOsseuseNormale","micrognathieMoindre","contractures"],
    stop:" — le critère décisif est MACROSCOPIQUE et CLINIQUE, pas microscopique : la lame de muscle ne " +
         "distingue pas une séquence oligoamnios d'une SDAF neuromusculaire. Les trois séparateurs sont " +
         "l'asymétrie des anomalies posturales, la masse osseuse normale (l'immobilisation est tardive) " +
         "et la micrognathie moindre. Chercher la rupture prématurée des membranes, les léiomyomes et " +
         "les anomalies müllériennes avant de nommer une maladie du muscle." },

  { k:"pterygia", l:"Syndrome des ptérygia multiples", fv:"FOETO:PF.MUS-MAL-030", cle:"ptergyium", min:2,
    signes:["ptergyium","contractures","hydramnios","muscleNormal","cornesNormales","vacuolaire",
            "hypotrophieGen","anasarquePrecoce"],
    stop:" — UN MUSCLE NORMAL N'EXCLUT PAS un ptérygium létal : « the appearances varied and included " +
         "features of vacuolar degeneration, dystrophy (with variation in muscle fiber diameter and " +
         "interstitial fibrosis), myotubular morphology, and generalized hypotrophy, and in one case " +
         "the appearances were essentially normal » [keeling, ch. 31]. " +
         "C'est le seul énoncé de la série où une source dit que la lame peut être normale dans une " +
         "maladie létale. L'examen de la moelle n'y montrait pas de déplétion des cornes antérieures : " +
         "des cornes normales n'écartent donc pas ce cadre." },

  { k:"distale", l:"Arthrogrypose distale", fv:"FOETO:PF.MUS-MAL-023", cle:"contracturesDistales", min:2,
    signes:["contracturesDistales","muscleNormal","masseOsseuseNormale"],
    stop:" — dans ce groupe le muscle est NORMAL PAR DÉFINITION : ce sont des contractures congénitales " +
         "non progressives sans maladie neurologique ni musculaire primitive. Une arthrogrypose distale " +
         "ne se diagnostique pas sur la lame de quadriceps ; elle est autosomique dominante à " +
         "expressivité variable, avec 15 sous-types à l'OMIM. Cette ligne est là pour empêcher de " +
         "chercher une lésion qui n'existera pas." },

  { k:"nemaline", l:"Myopathie à bâtonnets (némaline)", fv:"FOETO:PF.MUS-MAL-029", cle:"batonnets", min:1,
    signes:["batonnets","petitesFibres","dispersion"],
    stop:" — les rods se voient au Gomori trichrome modifié, donc sur du FIXÉ : c'est l'une des rares " +
         "myopathies congénitales encore accessibles au service. Mais le cadre morphologique s'est " +
         "dissous : « Many of the congenital myopathies are caused by mutations in more than one gene. " +
         "Conversely, mutations in one gene can lead to more than one form of myopathy » " +
         "[keeling, ch. 31]. Nommer la morphologie, pas la maladie. L'entité est absente du corps de " +
         "texte de soffoet ch. 10 (§ 9.11)." },

  { k:"inflammatoire", l:"Myopathie inflammatoire congénitale", fv:"FOETO:PF.MUS-INF-002", cle:"infiltrat", min:2,
    signes:["infiltrat","necrose","regeneration","necroseHemorragique","merosineNormale"],
    stop:" — ENTITÉ CONTESTÉE, et ses critères majeurs sont deux négatifs sur trois : infiltrats, " +
         "ABSENCE de changements dystrophiques et de myopathie congénitale, marquage mérosine NORMAL " +
         "(McNeil 2002). Le troisième exige de l'immuno que le service ne pratique pas : le diagnostic " +
         "est donc, en pratique fœtale, un diagnostic d'exclusion INCOMPLET. Un infiltrat isolé est non " +
         "spécifique et se voit dans plusieurs DMC. Une nécrose hémorragique des muscles périphériques " +
         "fait d'abord évoquer un échovirus (types 33 et 27), pas la rétention." },

  { k:"echovirus", l:"Infection congénitale — échovirus", fv:"FOETO:PF.MUS-INF-001", cle:"necroseHemorragique", min:1,
    signes:["necroseHemorragique","necrose","infiltrat"],
    stop:" — « Congenital echovirus infection (echovirus types 33 and 27) has also been implicated as a " +
         "rare cause of stillbirth and may be suspected in the fetus with marked hemorrhagic necrosis, " +
         "particularly in the peripheral muscles » [keeling, ch. 15]. Piège en sens INVERSE de tous les " +
         "autres : attribuer cette image à la rétention ferait perdre un diagnostic. Le muscle n'ayant " +
         "aucun rang de macération, rien ne permet de dire que c'est post-mortem." },

  { k:"dermopathie", l:"Dermopathie restrictive", fv:"FOETO:PF.MUS-MAL-024", cle:"peauRigide", min:2,
    signes:["peauRigide","contractures","hydramnios","hypoplasiePulm","muscleNormal"],
    stop:" — c'est une akinésie dont le diagnostic est sur la lame de PEAU, pas de muscle : épiderme " +
         "aminci et hyperkératosique, déficit en élastine dermique, collagène anormalement dense. Et " +
         "une peau normale ne l'écarte pas avant 24-26 SA : « These abnormalities usually appear after " +
         "22–24 weeks' gestation, which is why prenatal ultrasound detection may fail » " +
         "[keeling, ch. 31]. Renvoyer à fiche_peau.md." }
];

/* ── 07 · Négatifs obligatoires — déduits des signes ──────────────────────────
   L'ordre est celui du § 6 de la fiche, « par ordre de rendement ». Le muscle est,
   avec le cœur, l'un des rares organes où le service en énonce spontanément.
   Un négatif sur deux signes : énoncé si les deux sont répondus absents, en
   défaut si l'un est présent, ouvert sinon. */
function negDeux(a, b){
  var x = E.signes[a], y = E.signes[b];
  return x === POS || y === POS ? false : x === NEG && y === NEG ? true : null;
}
var NEGATIFS = [
  { k:"myotubes", signe:"myotubes", l:"Absence de myotube au-delà de 18 SA", p:"négatif de maturation — 5 CR sur 176",
    ko:"MYOTUBES PRÉSENTS — au-delà de 18 SA ce n'est plus un stade, c'est un signe (Steinert)" },
  { k:"dispersion", signe:"dispersion", l:"Absence de dispersion de calibre", p:"homogénéité des fibres [soffoet, ch. 10]",
    ko:"DISPERSION de calibre — bimodale entre 18 et 35 SA elle est normale (Wohlfart), anarchique elle se cote" },
  { k:"noyaux", signe:"noyauxInternes", l:"Noyaux périphériques, moins de 5 % de noyaux internes",
    p:"seul seuil chiffré confirmé par deux livres",
    ko:"NOYAUX INTERNES au-delà de 5 % — et le normal n'est donné que pour 40 SA (§ 9.15)" },
  { k:"fascicules", l:"Fascicules complets, sans remplacement adipeux", p:"négatif de l'amyoplasie",
    ko:"FASCICULES incomplets ou remplacement adipeux — les deux seuls signes jamais normaux chez le fœtus",
    auto:function(){ return negDeux("fasciculesIncomplets", "adipeux"); } },
  { k:"atrophie", l:"Absence d'atrophie fasciculaire ou groupée", p:"négatif de l'amyotrophie spinale",
    ko:"ATROPHIE groupée ou fasciculaire — et les deux sources divergent sur sa lisibilité en HES (§ 9.9)",
    auto:function(){ return negDeux("atrophieGroupee", "atrophieFasciculaire"); } },
  { k:"fibrose", signe:"fibroseEndomysiale", l:"Absence de fibrose endomysiale", p:"négatif de la DMC, à énoncer au trichrome",
    ko:"FIBROSE endomysiale — avec peu de nécrose et peu de régénération, elle oriente vers une DMC" },
  { k:"necrose", l:"Absence de nécrose et de régénération",
    p:"ambigu : leur absence est AUSSI un critère positif de DMC",
    ko:"NÉCROSE ou régénération présente — n'énoncer ce négatif qu'avec le contexte de fibrose",
    auto:function(){ return negDeux("necrose", "regeneration"); } },
  { k:"batonnets", signe:"batonnets", l:"Absence de bâtonnets de némaline au Gomori", p:"faisable sur fixé",
    ko:"BÂTONNETS présents au Gomori" },
  { k:"raggedRed", signe:"raggedRed", l:"Absence de ragged red fibers", p:"déjà pratiqué — 3 CR sur 176",
    ko:"RAGGED RED FIBERS présentes" },
  { k:"infiltrat", signe:"infiltrat", l:"Absence d'infiltrat inflammatoire",
    p:"sa présence ne fait pas une myopathie inflammatoire",
    ko:"INFILTRAT présent — non spécifique, décrit dans Fukuyama, Walker-Warburg et le déficit en laminine-α2" },
  { k:"muscleNomme", l:"Muscle nommé dans le compte rendu",
    p:"le corpus écrit lui-même « soit… soit »",
    ko:"MUSCLE NON NOMMÉ — aucun normal ne s'applique, la maturation est ininterprétable",
    auto:function(){
      var m = E.mesure.def;
      return !m ? null : m === "nonNomme" || m === "indetermine" ? false : true; } },
  /* La grille n'écrit que des constats : le négatif rendu est descriptif par
     construction. Seule la remarque libre peut porter un négatif nosologique. */
  { k:"pasNosologique", l:"Le négatif rendu est DESCRIPTIF, pas nosologique",
    p:"« absence de myopathie » ne s'écrit jamais",
    ko:"NÉGATIF NOSOLOGIQUE écrit — cinq des six catégories de keeling ne se lisent pas sur cette lame",
    auto:function(){
      if (/absence\s+de\s+(myopathie|maladie\s+neuromusculaire)/i.test(E.libre || "")) return false;
      return SIGNES.some(function(x){ return E.signes[x.k] === NEG; }) ? true : null; } }
];

/* ── 08 · Techniques ──────────────────────────────────────────────────────── */
var TECHNIQUES = [
  { k:"gomori",   l:"Trichrome de Gomori modifié", q:"bâtonnets, ragged red, fibrose — fait, 3 CR sur 176" },
  { k:"pas",      l:"PAS", q:"glycogène et polyglucosanes — fait, avec sa réserve d'interprétation" },
  { k:"trichrome", l:"Trichrome de Masson", q:"fibrose endomysiale et périmysiale, sur fixé" },
  { k:"merosine", l:"IHC mérosine / laminine-α2", q:"couvrirait 40 à 50 % des DMC — zéro usage dans le corpus" },
  { k:"dystrophine", l:"IHC dystrophines et sarcoglycanes", q:"détectables dès ~17 SA, non pratiquées" },
  { k:"collagene6", l:"IHC collagène VI et α-dystroglycane", q:"termes présents en base, usage nul" },
  { k:"gram",     l:"Gram tissulaire", q:"débris granulaire post-mortem contre colonisation vraie" },
  { k:"congelation", l:"Congélation d'un fragment pour enzymologie", q:"seule voie vers ATPase, NADH-TR, COX/SDH" },
  { k:"fibroblastes", l:"Mise en culture de fibroblastes cutanés", q:"irréversible — sans lignée, aucun dosage plus tard" },
  { k:"adn",      l:"Envoi du congelé en génétique", q:"CTG du Steinert, SMN1, LMNA, CHRNG — le diagnostic définitif" },
  { k:"moelle",   l:"Prélèvement de moelle aux trois niveaux", q:"condition du diagnostic neurogène" },
  { k:"me",       l:"Microscopie électronique", q:"associée à l'histochimie par keeling, aucune ME sur muscle au corpus" }
];

/* ── Propositions de techniques — déduites des clics, jamais imposées ─────── */
function suggerer(){
  var s = {};
  function anormal(k){ return E.signes[k] === POS; }
  function ret(k){ return E.retention[k] === "present"; }
  function enDefaut(k){ return etatNegatif(par(NEGATIFS, k)) === "ko"; }

  /* Les propositions suivent les SIGNES : une technique se demande sur ce qu'on a
     vu, pas sur le nom qu'on lui donnerait. */
  if (anormal("fibroseEndomysiale") || anormal("fibrosePerimysiale")){ s.trichrome = 1; s.merosine = 1; }
  if (anormal("fibresReduites") || anormal("necroseRegenerationPeu")){ s.trichrome = 1; s.merosine = 1; }
  if (anormal("petitesFibres") || anormal("dispersion")) s.gomori = 1;
  if (anormal("batonnets") || anormal("raggedRed")) s.gomori = 1;
  if (anormal("noyauxCentrauxPredom") || anormal("noyauxInternes")) s.adn = 1;
  if (anormal("myotubes")){ s.adn = 1; s.merosine = 1; }
  if (anormal("adipeux") || anormal("fasciculesIncomplets")) s.adn = 1;
  if (anormal("atrophieGroupee") || anormal("atrophieFasciculaire") || anormal("fibresArrondies")){
    s.moelle = 1; s.adn = 1;
  }
  if (anormal("mortNeuronale")) s.moelle = 1;
  if (anormal("infiltrat")){ s.merosine = 1; s.gram = 1; }
  if (anormal("necrose") || anormal("necroseHemorragique")) s.gram = 1;
  if (anormal("contractures") || anormal("ptergyium") || anormal("contracturesDistales") ||
      anormal("contracturesPoly")){
    s.adn = 1; s.moelle = 1;
  }
  if (anormal("peauRigide")) s.adn = 1;
  if (anormal("vacuolaire") || anormal("morphoMyotubulaire") || anormal("hypotrophieGen")) s.me = 1;
  /* v2 : les constats d'immuno et de typage entrés depuis FOETO */
  if (anormal("merosineDeficit") || anormal("merosineNormale")) s.merosine = 1;
  if (anormal("myosineLenteRetardee") || anormal("haloNadh")) s.adn = 1;

  /* Ce qui se décide au moment de l'autopsie et jamais après. */
  if (!E.prelev.congele && SIGNES.some(function(x){ return E.signes[x.k] === POS; })) s.congelation = 1;
  if (!E.prelev.fibroblastes && SIGNES.some(function(x){ return E.signes[x.k] === POS; }))
    s.fibroblastes = 1;
  if (!E.prelev.moelle && (anormal("contractures") || anormal("atrophieGroupee"))) s.moelle = 1;

  if (ret("debrisGranulaire")) s.gram = 1;
  if (ret("enzymoMorte")) s.congelation = 1;

  /* v1 : lus sur les négatifs cochés ; v2 : sur les négatifs déduits en défaut */
  if (enDefaut("fibrose")){ s.trichrome = 1; s.merosine = 1; }
  if (enDefaut("batonnets") || enDefaut("raggedRed")) s.gomori = 1;
  if (enDefaut("atrophie")) s.moelle = 1;
  return s;
}

/* ── Contrôles propres au muscle ──────────────────────────────────────────── */
async function testsOrgane(chk, clic, set, crTient, pause){
  function pose(k, v){ if (E.signes[k] !== v) clic("les", k, v); }
  function ote(k){ if (E.signes[k]) clic("les", k, E.signes[k]); }
  function tenue(k){ return associations().some(function(a){ return a.d.k === k && a.tenu; }); }
  function cadre(g){ return groupes().indexOf(g); }

  /* L'échelle de soffoet, isolément */
  chk("stade 1 jusqu'à 18 SA",   stadeAttendu(16).k === "ebauche");
  chk("18 SA bascule au stade 2", stadeAttendu(18).k === "foetal");
  chk("stade 2 jusqu'à 35 SA",   stadeAttendu(34).k === "foetal");
  chk("après 35 SA, stade 3",    stadeAttendu(36).k === "terme");
  chk("échelle en SA déclarée",  STADE_TITRE.indexOf("en SA") >= 0);

  /* La chronologie du fuseau, convertie de gestation en SA */
  chk("fuseau 1 couche → 14-16 SA", fuseauSA(1).sa === "≈ 14–16 SA");
  chk("fuseau 2 couches → 17 SA",   fuseauSA(2).sa === "≈ 17 SA");
  chk("5 couches = maximum fœtal",  fuseauSA(5).sa.indexOf("33 SA") >= 0);
  chk("au-delà de 5, hors fœtal",   fuseauSA(8).sa.indexOf("maximum fœtal") >= 0);

  /* v2 : le compte s'entre sans muscle déclaré — observation avant interprétation */
  set("sa", "30");
  set("m_couches", "2");
  chk("fuseau accepté sans muscle déclaré", $("vMesure").className.indexOf("bad") < 0 &&
      crTient("Muscle NON déclaré") && crTient("l'interprétation reste ouverte"));
  set("m_couches", "");

  /* ── LE verdict bloquant du muscle : un muscle qu'on ne sait pas nommer ── */
  clic("mdef", "nonNomme");
  chk("muscle non nommé = verdict bloquant", $("vMesure").className.indexOf("bad") >= 0);
  chk("non nommé : maturation ininterprétable", crTient("ININTERPRÉTABLE") &&
      crTient("ne se compare à aucun normal"));
  chk("non nommé : le profil propre est cité", crTient("leur propre profil de développement"));
  chk("non nommé : négatif muscleNomme en défaut", etatNegatif(par(NEGATIFS, "muscleNomme")) === "ko");
  clic("mdef", "nonNomme");

  clic("mdef", "indetermine");
  chk("indéterminé bloque aussi", $("vMesure").className.indexOf("bad") >= 0 &&
      crTient("Muscle déclaré INDÉTERMINÉ"));
  chk("le corpus écrit lui-même « soit… soit »", crTient("soit du diaphragme, soit du muscle pariétal"));
  clic("mdef", "indetermine");

  clic("mdef", "diaphragme");
  chk("diaphragme n'est pas le quadriceps", crTient("ce n'est PAS le quadriceps") &&
      $("vMesure").className.indexOf("bad") < 0);
  chk("diaphragme : le bord de bloc hépatique", crTient("un peu de tissu musculaire provenant du diaphragme"));
  clic("mdef", "diaphragme");

  clic("mdef", "oculomoteur");
  chk("oculo-moteurs d'origine crânienne", crTient("mésodermique CRÂNIALE"));
  clic("mdef", "oculomoteur");

  clic("mdef", "quadriceps");
  chk("quadriceps : lecture recevable", crTient("la lecture de stade est recevable"));
  chk("quadriceps : négatif muscleNomme énoncé", etatNegatif(par(NEGATIFS, "muscleNomme")) === "ok");

  /* Le plan de coupe commande ce qui est mesurable */
  chk("plan non déclaré en réserve", crTient("plan de coupe non déclaré"));
  clic("mopt", "longitudinal");
  chk("longitudinal : rien ne se chiffre", crTient("ne se lisent — les trois mesures"));
  clic("mopt", "longitudinal");
  clic("mopt", "oblique");
  chk("oblique majore le calibre", crTient("majore faussement le calibre"));
  clic("mopt", "oblique");
  clic("mopt", "transversal");
  chk("transversal lisible mais non prescrit", crTient("Aucune source ne PRESCRIT pourtant ce plan"));

  /* Le fuseau : seul repère de 13 à 33 SA, et validé nulle part */
  set("m_couches", "2");
  chk("fuseau situé",            crTient("capsule à 2 couches") && crTient("≈ 17 SA"));
  chk("fuseau non validé comme mesure", crTient("il n'est validé NULLE PART comme mesure de terme"));
  chk("fuseau : piège d'aspect", crTient("mime un groupe de fibres atrophiques encapsulées"));
  set("m_couches", "9");
  chk("au-dessus du maximum fœtal", crTient("la capsule adulte compte 10 à 15 couches"));
  set("m_couches", "");

  /* Les deux pièges de date, cochés dans les deux sens */
  SIGNES.forEach(function(x){ ote(x.k); });

  set("sa", "30");
  pose("myotubes", POS);
  chk("myotubes après 18 SA : réserve de date", crTient("au-delà de 18 SA leur persistance"));
  chk("le terme vient de la macro", crTient("il vient de la macro, pas de la lame"));
  set("sa", "16");
  chk("myotubes à 16 SA : plus de réserve", !crTient("au-delà de 18 SA leur persistance"));
  chk("myotubes à 16 SA : renvoi à la variante", crTient("avant 18 SA ils sont le stade 1 normal"));
  chk("sous 18 SA le fuseau est proposé", crTient("le seul repère disponible entre 13 et 33 SA"));
  ote("myotubes");

  set("sa", "25");
  pose("dispersion", POS);
  chk("dispersion dans la fenêtre Wohlfart", crTient("où la bimodalité des fibres"));
  set("sa", "40");
  chk("hors fenêtre, plus de réserve Wohlfart", !crTient("où la bimodalité des fibres"));
  ote("dispersion");
  set("sa", "30");

  /* Le retard de maturation reste d'abord une question de muscle */
  clic("stade", "ebauche");
  chk("retard : quel muscle d'abord ?", crTient("Avant de lire un retard : sur quel muscle ?") &&
      crTient("échelle de QUADRICEPS"));
  clic("stade", "ebauche");
  clic("stade", "terme");
  chk("avance : source unique et francophone", crTient("source unique et francophone"));
  clic("stade", "terme");

  /* Divergences portées, jamais arbitrées */
  chk("SMA : divergence frontale non tranchée",
      par(DIAGS, "sma").stop.indexOf("DIVERGENCE FRONTALE ET NON TRANCHÉE") >= 0);
  chk("SMA : les deux verbatims sont là",
      par(DIAGS, "sma").stop.indexOf("readily apparent in routine hematoxylin") >= 0 &&
      par(DIAGS, "sma").stop.indexOf("ne montre parfois que des lésions minimes") >= 0);
  chk("calibre : aucun champ numérique",
      MESURE.champs.every(function(c){ return c.id !== "calibre"; }) && MESURE.champs.length === 1);
  chk("myotubulaire : les seuils se touchent",
      par(DIAGS, "myotubulaire").stop.indexOf("CHEVAUCHE le normal") >= 0);
  chk("muscle sans rang de macération",
      par(RETENTION, "horsMuscle").note.indexOf("aucun des dix rangs") >= 0);
  chk("borne « > 12 h » non sourcée",
      par(RETENTION, "contractionBand").note.indexOf("n'existe dans AUCUNE source") >= 0);
  chk("contraction band est myocardique",
      par(RETENTION, "contractionBand").note.indexOf("MYOCARDE") >= 0);
  chk("l'enzymologie négative n'est pas un déficit",
      par(RETENTION, "enzymoMorte").note.indexOf("ne dit RIEN") >= 0);
  chk("un muscle normal n'exclut pas le létal",
      par(DIAGS, "pterygia").stop.indexOf("N'EXCLUT PAS") >= 0);
  chk("arthrogrypose distale : muscle normal par définition",
      par(DIAGS, "distale").stop.indexOf("NORMAL PAR DÉFINITION") >= 0);
  chk("60 % neurogène = chiffre de détection",
      par(DIAGS, "sdaf").stop.indexOf("chiffre de DÉTECTION") >= 0 ||
      par(DIAGS, "sdaf").stop.indexOf("DÉTECTION de 1996") >= 0);
  chk("le négatif nosologique est interdit",
      par(NEGATIFS, "pasNosologique").ko.indexOf("cinq des six catégories") >= 0);

  /* Le nom se déduit des signes — il ne se coche pas */
  chk("aucun bouton ne porte un diagnostic",
      DIAGS.every(function(d){ return !document.querySelector('[data-act="les"][data-k="' + d.k + '"]'); }));

  /* LE PIÈGE CENTRAL : les petites fibres rondes sont normales chez le fœtus */
  SIGNES.forEach(function(x){ ote(x.k); });
  pose("petitesFibres", POS);
  pose("contractures", POS);
  chk("petites fibres seules ne tiennent pas l'amyoplasie", !tenue("amyoplasie"));
  pose("adipeux", POS);
  pose("fasciculesIncomplets", POS);
  chk("le remplacement adipeux la tient", tenue("amyoplasie"));
  chk("le piège central est au CR", crTient("un état NORMAL chez le fœtus"));
  chk("amyoplasie : négatif des fascicules en défaut", etatNegatif(par(NEGATIFS, "fascicules")) === "ko");
  ote("adipeux"); ote("fasciculesIncomplets"); ote("petitesFibres"); ote("contractures");

  /* Négatif sur deux signes : énoncé seulement si les deux sont répondus absents */
  pose("fasciculesIncomplets", NEG);
  chk("un seul des deux absent : négatif ouvert", etatNegatif(par(NEGATIFS, "fascicules")) === null);
  pose("adipeux", NEG);
  chk("les deux absents : négatif énoncé", etatNegatif(par(NEGATIFS, "fascicules")) === "ok" &&
      crTient("· Fascicules complets, sans remplacement adipeux"));
  ote("fasciculesIncomplets"); ote("adipeux");

  /* La DMC se lit sur un négatif qui vaut critère positif */
  pose("fibroseEndomysiale", POS);
  pose("necroseRegenerationPeu", POS);
  chk("DMC tenue sur fibrose + peu de nécrose", tenue("dmc"));
  chk("DMC propose la mérosine et le trichrome",
      suggerer().merosine === 1 && suggerer().trichrome === 1);
  chk("l'infiltrat ne fait pas la myopathie inflammatoire",
      par(DIAGS, "dmc").stop.indexOf("ne fait PAS une myopathie inflammatoire") >= 0);
  ote("fibroseEndomysiale"); ote("necroseRegenerationPeu");

  /* La SMA sans son pivot ne tient pas */
  pose("fibresHypertrophiques", POS);
  pose("fibresArrondies", POS);
  chk("sans le pivot, la SMA ne tient pas", !tenue("sma") &&
      crTient("signe pivot non coché : " + par(SIGNES, "atrophieGroupee").l));
  pose("atrophieGroupee", POS);
  chk("l'atrophie groupée tient la SMA", tenue("sma"));
  chk("la SMA propose la moelle", suggerer().moelle === 1);
  ote("fibresHypertrophiques"); ote("fibresArrondies"); ote("atrophieGroupee");

  /* v2 : le Steinert compte les constats d'immuno, mais tient sur les myotubes */
  pose("myosineLenteRetardee", POS);
  pose("petitesFibres", POS);
  chk("Steinert sans myotubes ne tient pas", !tenue("steinert"));
  pose("myotubes", POS);
  chk("Steinert tenu sur les myotubes", tenue("steinert") && suggerer().adn === 1);
  ote("myosineLenteRetardee"); ote("petitesFibres"); ote("myotubes");

  /* Le piège de sens inverse : la nécrose hémorragique n'est pas post-mortem */
  pose("necroseHemorragique", POS);
  chk("échovirus se lit", tenue("echovirus"));
  chk("ne pas l'attribuer à la rétention", crTient("attribuer cette image à la rétention"));
  chk("nécrose hémorragique propose le Gram", suggerer().gram === 1);
  ote("necroseHemorragique");

  /* Le muscle normal reste une lecture, pas une exclusion */
  pose("muscleNormal", POS);
  pose("ptergyium", POS);
  chk("ptérygia tenu sur un muscle normal", tenue("pterygia"));
  ote("muscleNormal"); ote("ptergyium");

  /* v2 : polarité normale hors du « Non » en bloc — « Non » n'écrit pas l'inverse */
  var iA = cadre("Architecture fasciculaire"), iC = cadre("Tissu conjonctif et aspect dystrophique");
  clic("grp", iA, "non");
  chk("« Non » architecture : muscle d'aspect normal laissé non regardé",
      !E.signes.muscleNormal && !E.signes.perimysiumFasc && E.signes.adipeux === NEG &&
      etatGroupe(groupes()[iA]) === "non");
  clic("grp", iA, "non");
  clic("grp", iC, "non");
  chk("« Non » conjonctif : peu de nécrose et mérosine laissés non regardés",
      !E.signes.necroseRegenerationPeu && !E.signes.merosineNormale && !E.signes.merosineDeficit &&
      E.signes.fibroseEndomysiale === NEG && etatNegatif(par(NEGATIFS, "fibrose")) === "ok");
  clic("grp", iC, "non");
  chk("polarité normale marquée", ["muscleNormal","perimysiumFasc","calibreHomogene","necroseRegenerationPeu",
      "masseOsseuseNormale","micrognathieMoindre","cornesNormales"].every(function(k){
        return par(SIGNES, k).bloc === false; }));

  /* Le négatif nosologique se lit dans la remarque libre */
  var lib = $("libre").value;
  set("libre", "Absence de myopathie.");
  chk("négatif nosologique écrit → en défaut", etatNegatif(par(NEGATIFS, "pasNosologique")) === "ko" &&
      crTient("! NÉGATIF NOSOLOGIQUE écrit"));
  set("libre", lib);

  /* Le prélèvement qui ne se rattrape jamais */
  chk("fibroblastes proposés dès qu'un signe est coché", (function(){
    pose("necrose", POS);
    var s = suggerer(); ote("necrose");
    return s.fibroblastes === 1 && s.congelation === 1;
  })());

  clic("ret", "debrisGranulaire", "present");
  chk("débris granulaire propose le Gram", suggerer().gram === 1);
  clic("ret", "debrisGranulaire", "present");

  /* Branchement FOETO */
  chk("v2 : libellé venu de FOETO", par(SIGNES, "adipeux").l === "Remplacement adipeux du muscle squelettique");
  chk("v2 : code FOETO du terme verbatim", codesDe(par(SIGNES, "atrophieGroupee"))[0] === "FOETO:PF.MUS-MAL-002");
  chk("v2 : HPO arbitré venu de la base", par(SIGNES, "dispersion").hpo === "HP:0003557");
  chk("v2 : terme maladie sur l'association", par(DIAGS, "amyoplasie").foeto[0] === "FOETO:PF.MUS-MAL-021" &&
      DIAGS.every(function(d){ return d.foeto && /^FOETO:PF\.MUS-/.test(d.foeto[0]); }));
  chk("v2 : constat de fiche sans terme non marqué hors fiche",
      !par(SIGNES, "contractures").horsFiche && !par(SIGNES, "calibreHomogene").horsFiche);
  chk("v2 : signe sans livre marqué hors fiche", par(SIGNES, "raggedRed").horsFiche === true &&
      par(SIGNES, "fibrosePerimysiale").horsFiche === true);
  set("rqFoeto", "némaline");
  var pk = $("sgFoeto").querySelector('[data-pick="FOETO:PF.MUS-MAL-003"]');
  if (pk) pk.click();
  chk("v2 : un terme porté par un signe pose le signe", !!pk && E.signes.batonnets === POS &&
      !E.foeto["FOETO:PF.MUS-MAL-003"]);
  ote("batonnets");
  chk("v2 : blocs lus en §02", BLOCS_LUS && !$("blocsBloc").hidden);

  /* On rend le banc dans un état VOULU, pas supposé : les deux axes catégoriels
     sont déjà posés ici, un clic sec les retirerait. Et jamais un « sa » vide —
     la coquille compare ensuite $("sa").value à String(snap.terme_sa), et
     String(null) n'est pas la chaîne vide. */
  if (E.mesure.opt !== "transversal") clic("mopt", "transversal");
  if (E.mesure.def !== "quadriceps")  clic("mdef", "quadriceps");
  chk("banc rendu avec ses deux axes posés",
      E.mesure.def === "quadriceps" && E.mesure.opt === "transversal");
  set("sa", "30");
  chk("terme non vide à la sortie du banc", $("sa").value === "30");
}
