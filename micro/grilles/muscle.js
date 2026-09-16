/* Grille de lecture — muscle squelettique.
   Fond : ~/Bureau/fiches_lecture/fiche_muscle.md (§1 à §9).
   Forme : gen_grille.py, calquée sur grille_poumon.html.
   Les divergences entre sources sont PORTÉES dans les champs, jamais arbitrées. */

var ORGANE  = "muscle";
var TITRE   = "muscle squelettique";
var SOURCE  = "fiche_muscle.md";
var MODULE  = "grille_muscle";
var VERSION = "1.0.1";
/* La fiche ne latéralise jamais le muscle : elle le NOMME. Un quadriceps droit et
   un quadriceps gauche se comparent, un quadriceps et un diaphragme non — c'est le
   NOM du muscle qui commande la norme, pas son côté (§ 1, § 9.7). */
var PAIR    = false;

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

/* ── 01 · Prélèvement ─────────────────────────────────────────────────────── */
var PRELEV = [
  { k:"quadriceps", l:"Quadriceps prélevé et nommé comme tel", grave:true,
    manque:"« The quadriceps muscle, which is generally used as a reference muscle in pathology… » " +
           "[keeling, ch. 31] — l'échelle de maturation du § 3 est une échelle de quadriceps et d'aucun " +
           "autre muscle" },
  { k:"vasteLat",   l:"Site précisé : vaste latéral en sa partie moyenne",
    manque:"[soffoet, ch. 10] nomme le site, pas seulement le muscle ; deltoïde, biceps et jambier " +
           "antérieur sont les références secondaires" },
  { k:"diaphragme", l:"Diaphragme prélevé ou son aspect noté", grave:true,
    manque:"« Note should also be made regarding the appearance of the diaphragms, psoas, and " +
           "paravertébral muscles to give further impression of the severity of any wasting or " +
           "hypotrophy » [keeling, ch. 31]" },
  { k:"antagoniste", l:"Muscle ANTAGONISTE de la contracture prélevé",
    manque:"« the abnormalities are generally most marked in muscles opposing the contracture » " +
           "[keeling, ch. 31] — le prélèvement standard du service est fixe et n'est jamais adapté " +
           "à la contracture" },
  { k:"transversale", l:"Coupe transversale disponible",
    manque:"calibre, dispersion et pourcentage de noyaux internes ne se lisent que sur coupe " +
           "transversale — mais AUCUNE source ne le prescrit pour l'HES (§ 9.1) : c'est un trou de " +
           "sourçage, pas une évidence" },
  { k:"assez",      l:"Assez de muscle sur la lame pour juger les fascicules", grave:true,
    manque:"« it is therefore important in the case of the fetus to examine sufficient muscle tissue » " +
           "[keeling, ch. 31] — la parade au piège des petites fibres rondes est QUANTITATIVE" },
  { k:"adn",        l:"Fragment en DNAthèque",
    manque:"« It is imperative that sufficient DNA be stored to enable molecular testing, which will " +
           "be vital in most cases » [keeling, ch. 31] ; le corpus le fait déjà — « Pour DNAthèque : " +
           "poumon, muscle » [corpus CR]" },
  { k:"fibroblastes", l:"Peau prélevée pour CULTURE de fibroblastes",
    manque:"« A skin sample should be submitted for fibroblast culture storage in case metabolic " +
           "enzyme testing is required » [keeling, ch. 31] — le corpus prélève de la peau, jamais " +
           "pour la culture (§ 9.21). C'est irréversible" },
  { k:"moelle",     l:"Moelle épinière prélevée aux trois niveaux (cervical, distal, lombaire)",
    manque:"sans la moelle, le muscle seul ne sépare pas neurogène de myogène [soffoet, ch. 22] — " +
           "le prélèvement se décide ici, la lecture relève de neuropath" },
  { k:"congele",    l:"Fragment CONGELÉ pour enzymologie",
    manque:"ATPase, NADH-TR et COX/SDH exigent du congelé : sans lui l'axe du typage est perdu " +
           "avant la première coupe, quelle que soit la macération" }
];

/* ── 02 · Rétention ───────────────────────────────────────────────────────────
   Résultat NÉGATIF du § 2 : le muscle n'a AUCUN rang dans la séquence de
   macération. Une seule ligne « bon », et elle est empruntée aux autres organes —
   même construction qu'au thymus, pour la même raison : ne rien interpoler. */
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

/* ── 03 · Maturation — l'échelle native de soffoet, en SA, sur le quadriceps ── */
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

/* ── 03 bis · Le muscle prélevé, le plan de coupe, le fuseau ──────────────────
   Deux axes catégoriels imposés par le contrat, et ce sont exactement les deux
   que la fiche désigne comme conditions de lecture : QUEL muscle (§ 1, § 9.7) et
   sur QUEL plan (§ 9.1). Le champ numérique unique est le compte de couches
   capsulaires du fuseau — le seul repère qui gradue 13 à 33 SA (§ 3, § 9.17). */
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

/* Le muscle NON nommé bloque : c'est le verdict le plus lourd de cette grille.
   Construction empruntée à peau.js, où la région non nommée rend le stade
   ininterprétable — ici c'est le NOM du muscle qui joue ce rôle. */
function verdictMesure(){
  var mus = E.mesure.def, plan = E.mesure.opt, n = E.mesure.v.couches, sa = num("sa");
  if (!mus && !plan && n == null && !E.stade)
    return { cls:"", txt:"Ni muscle nommé, ni plan de coupe, ni fuseau compté — le muscle n'est pas encore lu." };

  var t = [], cls = "ok", res = [];

  if (!mus || mus === "nonNomme" || mus === "indetermine"){
    cls = "bad";
    t.push((mus === "nonNomme" ? "Muscle déclaré NON nommé sur le bloc"
          : mus === "indetermine" ? "Muscle déclaré INDÉTERMINÉ"
          : "Muscle NON déclaré") +
           " : la maturation musculaire est ININTERPRÉTABLE et aucun normal ne s'applique. " +
           "« tous les muscles possèdent dans une certaine mesure leur propre profil de développement » " +
           "[soffoet, ch. 10], et la source ne donne le profil d'AUCUN muscle autre que le quadriceps " +
           "(§ 9.7) : un muscle qu'on ne sait pas nommer ne se compare à aucun normal. Ce n'est pas une " +
           "hypothèse d'école — le corpus l'écrit lui-même : « soit du diaphragme, soit du muscle " +
           "pariétal » [corpus CR]. Écrire l'indétermination, ne pas la laisser vide.");
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

  if (sa != null && sa > 18 && E.signes.myotubes === "anormal" && mus === "quadriceps")
    res.push("myotubes déclarés à " + sa + " SA sur un quadriceps : au-delà de 18 SA leur persistance " +
             "n'est plus un stade, elle est un signe — le discriminant est le terme, et il vient de la " +
             "macro, pas de la lame (§ 8, piège 13)");
  if (sa != null && sa >= 18 && sa <= 35 && E.signes.dispersion === "anormal")
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

/* ── 05 · Variantes normales ──────────────────────────────────────────────────
   Le muscle fœtal est l'organe de la série où le normal mime le mieux la lésion :
   quatre de ces sept lignes sont des pièges nommés du § 8. */
var VARIANTES = [
  { k:"petitesRondes", l:"Petites fibres rondes — normales chez le FŒTUS" },
  { k:"wohlfart",      l:"Bimodalité « a » / « b » de Wohlfart entre 18 et 35 SA" },
  { k:"myotubesJeune", l:"Myotubes avant 18 SA — stade, pas maladie" },
  { k:"fuseau",        l:"Fuseau neuromusculaire du périmysium, coupé en travers" },
  { k:"noyauxInternesRares", l:"Quelques noyaux internes, moins de 5 % à terme" },
  { k:"glycogenePAS",  l:"Répartition inhomogène du glycogène au PAS" },
  { k:"muscleFoie",    l:"Muscle strié en bordure d'un bloc de foie ou de paroi" },
  { k:"oculomoteurs",  l:"Muscles oculo-moteurs sur une lame d'orbite" }
];

/* ── 06 · Signes ──────────────────────────────────────────────────────────────
   On coche ce qu'on voit, un signe à la fois. Aucun nom de maladie ici : les noms
   se lisent en dessous, dans DIAGS, par association des signes cochés. */
var SIGNES = [
  /* Maturation et calibre */
  { k:"myotubes",       l:"Myotubes présents — noyaux centraux en chaîne",
    meta:"normal avant 18 SA, signe après — le terme tranche, pas la lame" },
  { k:"petitesFibres",  l:"Fibres de petite taille",
    meta:"« small and rounded as they are in arthrogryposis » chez le fœtus normal" },
  { k:"dispersion",     l:"Dispersion de calibre",
    meta:"bimodale = Wohlfart si 18–35 SA ; anarchique = à coter" },
  { k:"calibreHomogene", l:"Calibre uniforme, fibres « a » et « b » non reconnaissables" },
  { k:"noyauxInternes",  l:"Noyaux internes au-delà de 5 %",
    meta:"5–75 % dans la myopathie myotubulaire — les seuils se touchent à 5 %" },
  { k:"noyauxCentrauxPredom", l:"Prédominance de noyaux centraux" },

  /* Architecture fasciculaire — le seul axe qui survit à la fixation */
  { k:"fasciculesIncomplets", l:"Fascicules incomplets",
    meta:"axe qui survit à la fixation ET à la macération" },
  { k:"adipeux",        l:"Remplacement adipeux intrafasciculaire" },
  { k:"perimysiumFasc", l:"Fascicules entourés de périmysium",
    meta:"« said to be a characteristic feature »" },
  { k:"atrophieGroupee", l:"Atrophie groupée de larges groupes de fibres" },
  { k:"fibresHypertrophiques", l:"Fibres hypertrophiques isolées, dispersées" },
  { k:"fibresArrondies", l:"Aspect arrondi des fibres atrophiques" },
  { k:"atrophieFasciculaire", l:"Atrophie fasciculaire" },

  /* Tissu conjonctif */
  { k:"fibroseEndomysiale", l:"Prolifération conjonctive de l'endomysium" },
  { k:"fibrosePerimysiale", l:"Fibrose périmysiale" },
  { k:"fibresReduites", l:"Diminution du nombre et du diamètre des fibres" },
  { k:"necroseRegenerationPeu", l:"Nécrose et régénération PEU importantes",
    meta:"négatif qui vaut critère positif de DMC" },

  /* Inclusions et colorations sur fixé */
  { k:"batonnets",      l:"Bâtonnets (rods) au Gomori trichrome modifié" },
  { k:"raggedRed",      l:"Ragged red fibers au Gomori" },
  { k:"vacuolaire",     l:"Dégénérescence vacuolaire" },
  { k:"morphoMyotubulaire", l:"Morphologie myotubulaire diffuse" },
  { k:"hypotrophieGen", l:"Hypotrophie généralisée des fibres" },

  /* Nécrose, inflammation, infection */
  { k:"necrose",        l:"Nécrose de fibres" },
  { k:"regeneration",   l:"Régénération (fibres basophiles, noyaux vésiculeux)" },
  { k:"infiltrat",      l:"Infiltrat inflammatoire intramusculaire",
    meta:"non spécifique — présent dans plusieurs DMC" },
  { k:"necroseHemorragique", l:"Nécrose hémorragique des muscles périphériques",
    meta:"fait évoquer un échovirus, jamais la rétention" },

  /* Contexte macroscopique — lu ailleurs, coché ici parce qu'il commande la lecture */
  { k:"contractures",   l:"Contractures multiples articulaires (macro)" },
  { k:"contracturesDistales", l:"Contractures distales seulement (mains, pieds, poignets, chevilles)" },
  { k:"asymetrie",      l:"Anomalies posturales ASYMÉTRIQUES" },
  { k:"masseOsseuseNormale", l:"Masse osseuse normale" },
  { k:"micrognathieMoindre", l:"Micrognathie peu marquée" },
  { k:"ptergyium",      l:"Ptérygia" },
  { k:"hydramnios",     l:"Polyhydramnios" },
  { k:"hypoplasiePulm", l:"Hypoplasie pulmonaire" },
  { k:"fentePalatine",  l:"Fente palatine" },
  { k:"oligoamnios",    l:"Oligoamnios documenté" },
  { k:"anasarque",      l:"Œdème sous-cutané ou anasarque" },
  { k:"peauRigide",     l:"Peau rigide, bouche fixée ouverte en « O »" },
  { k:"diaphragmeSureleve", l:"Diaphragme surélevé ou éventré" },
  { k:"mortNeuronale",  l:"Mort neuronale des cornes antérieures (moelle, 3 niveaux)" },
  { k:"cornesNormales", l:"Cornes antérieures SANS déplétion ni dégénérescence" },
  { k:"muscleNormal",   l:"Muscle d'aspect essentiellement normal",
    meta:"n'exclut aucune maladie létale" }
];

/* ── 06 bis · Associations — affichées, jamais cochées ────────────────────────
   Le nom se déduit des signes. « cle » est le signe pivot : sans lui le compte
   peut être atteint sans que l'association tienne. */
var DIAGS = [
  { k:"amyoplasie", l:"Amyoplasie", cle:"adipeux", min:2,
    signes:["adipeux","fasciculesIncomplets","perimysiumFasc","petitesFibres","contractures"],
    stop:" — LE PIÈGE CENTRAL de cet organe : « In the case of the normal fetus, muscle fibers are " +
         "small and rounded as they are in arthrogryposis and this may cause some confusion in " +
         "interpretation » [keeling, ch. 31]. Le critère qui fait l'amyoplasie chez le nouveau-né est " +
         "un état NORMAL chez le fœtus. Seuls les fascicules incomplets et le remplacement adipeux ne " +
         "sont jamais normaux, et la parade est quantitative : examiner assez de muscle. Le quadriceps " +
         "standard peut aussi être le mauvais muscle, les lésions étant maximales dans l'antagoniste " +
         "de la contracture." },

  { k:"sma", l:"Amyotrophie spinale infantile", cle:"atrophieGroupee", min:2,
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

  { k:"dmc", l:"Dystrophie musculaire congénitale", cle:"fibroseEndomysiale", min:2,
    signes:["fibroseEndomysiale","fibresReduites","necroseRegenerationPeu","fibrosePerimysiale",
            "infiltrat"],
    stop:" — le NÉGATIF est ici un critère POSITIF : « nécrose et régénération sont peu importantes » " +
         "[soffoet, ch. 10] dans un muscle très fibreux oriente vers une DMC, et c'est lisible au " +
         "trichrome sur du fixé. Un infiltrat ne fait PAS une myopathie inflammatoire : il est non " +
         "spécifique dans Fukuyama, Walker-Warburg et le déficit en laminine-α2. Le sous-type ne se " +
         "nomme pas sans immunohistochimie — et la mérosine couvrirait 40 à 50 % des DMC." },

  { k:"myotubulaire", l:"Myopathie myotubulaire / centronucléaire", cle:"noyauxCentrauxPredom", min:2,
    signes:["noyauxCentrauxPredom","noyauxInternes","petitesFibres","morphoMyotubulaire"],
    stop:" — le seuil de la maladie CHEVAUCHE le normal : les noyaux centraux y sont « dans 5 à 75 % " +
         "des cas » [soffoet, ch. 10] et le normal est « up to 5% » [ernst, ch. 33] — à 5 % les deux se " +
         "touchent et aucune source ne donne de seuil de décision (§ 9.16). La forme liée à l'X (MTM1, " +
         "Xq28) ne concerne que les garçons. Le différentiel avec le Steinert exige de l'immuno." },

  { k:"steinert", l:"Dystrophie myotonique congénitale (Steinert)", cle:"myotubes", min:2,
    signes:["myotubes","petitesFibres","dispersion","hydramnios"],
    stop:" — la persistance de myotubes n'est un signe qu'APRÈS 18 SA : avant, c'est le stade 1 normal. " +
         "Le discriminant n'est pas sur la lame, il vient de la macro — une image de myotube sans terme " +
         "déclaré n'est pas interprétable. Transmission exclusivement maternelle ; le diagnostic " +
         "définitif est l'analyse ADN des répétitions CTG, pas la lame." },

  { k:"sdaf", l:"Séquence de déformation d'akinésie fœtale (SDAF / FADS)", cle:"contractures", min:2,
    signes:["contractures","hydramnios","hypoplasiePulm","fentePalatine","anasarque",
            "diaphragmeSureleve"],
    stop:" — ce n'est PAS un diagnostic : " +
         `« the terms "fetal akinesia" and "fetal akinesia deformation sequence (FADS)" do not represent a specific diagnosis but rather describe a phenotype with heterogeneous causes »` +
         " [keeling, ch. 31], et de même « arthrogryposis is not a " +
         "disorder but rather a phenotype ». Le tableau « dépend du moment de l'arrêt des mouvements et " +
         "non de sa cause » [soffoet, ch. 22]. Le « 60 % de formes neurogènes » est un chiffre de " +
         "DÉTECTION de 1996, pas une prévalence : la source dit elle-même que les formes myogènes sont " +
         "sous-diagnostiquées. Neurogène contre myogène exige la moelle aux trois niveaux." },

  /* La clé diffère du signe « oligoamnios » : aucun bouton de signe ne doit porter
     le nom d'une association, sinon le diagnostic redeviendrait cliquable. */
  { k:"contrainte", l:"Contrainte intra-utérine — séquence oligoamnios", cle:"oligoamnios", min:2,
    signes:["oligoamnios","asymetrie","masseOsseuseNormale","micrognathieMoindre","contractures"],
    stop:" — le critère décisif est MACROSCOPIQUE et CLINIQUE, pas microscopique : la lame de muscle ne " +
         "distingue pas une séquence oligoamnios d'une SDAF neuromusculaire. Les trois séparateurs sont " +
         "l'asymétrie des anomalies posturales, la masse osseuse normale (l'immobilisation est tardive) " +
         "et la micrognathie moindre. Chercher la rupture prématurée des membranes, les léiomyomes et " +
         "les anomalies müllériennes avant de nommer une maladie du muscle." },

  { k:"pterygia", l:"Syndrome des ptérygia multiples", cle:"ptergyium", min:2,
    signes:["ptergyium","contractures","hydramnios","muscleNormal","cornesNormales","vacuolaire",
            "hypotrophieGen"],
    stop:" — UN MUSCLE NORMAL N'EXCLUT PAS un ptérygium létal : « the appearances varied and included " +
         "features of vacuolar degeneration, dystrophy (with variation in muscle fiber diameter and " +
         "interstitial fibrosis), myotubular morphology, and generalized hypotrophy, and in one case " +
         "the appearances were essentially normal » [keeling, ch. 31]. " +
         "C'est le seul énoncé de la série où une source dit que la lame peut être normale dans une " +
         "maladie létale. L'examen de la moelle n'y montrait pas de déplétion des cornes antérieures : " +
         "des cornes normales n'écartent donc pas ce cadre." },

  { k:"distale", l:"Arthrogrypose distale", cle:"contracturesDistales", min:2,
    signes:["contracturesDistales","muscleNormal","masseOsseuseNormale"],
    stop:" — dans ce groupe le muscle est NORMAL PAR DÉFINITION : ce sont des contractures congénitales " +
         "non progressives sans maladie neurologique ni musculaire primitive. Une arthrogrypose distale " +
         "ne se diagnostique pas sur la lame de quadriceps ; elle est autosomique dominante à " +
         "expressivité variable, avec 15 sous-types à l'OMIM. Cette ligne est là pour empêcher de " +
         "chercher une lésion qui n'existera pas." },

  { k:"nemaline", l:"Myopathie à bâtonnets (némaline)", cle:"batonnets", min:1,
    signes:["batonnets","petitesFibres","dispersion"],
    stop:" — les rods se voient au Gomori trichrome modifié, donc sur du FIXÉ : c'est l'une des rares " +
         "myopathies congénitales encore accessibles au service. Mais le cadre morphologique s'est " +
         "dissous : « Many of the congenital myopathies are caused by mutations in more than one gene. " +
         "Conversely, mutations in one gene can lead to more than one form of myopathy » " +
         "[keeling, ch. 31]. Nommer la morphologie, pas la maladie. L'entité est absente du corps de " +
         "texte de soffoet ch. 10 (§ 9.11)." },

  { k:"inflammatoire", l:"Myopathie inflammatoire congénitale", cle:"infiltrat", min:2,
    signes:["infiltrat","necrose","regeneration","necroseHemorragique"],
    stop:" — ENTITÉ CONTESTÉE, et ses critères majeurs sont deux négatifs sur trois : infiltrats, " +
         "ABSENCE de changements dystrophiques et de myopathie congénitale, marquage mérosine NORMAL " +
         "(McNeil 2002). Le troisième exige de l'immuno que le service ne pratique pas : le diagnostic " +
         "est donc, en pratique fœtale, un diagnostic d'exclusion INCOMPLET. Un infiltrat isolé est non " +
         "spécifique et se voit dans plusieurs DMC. Une nécrose hémorragique des muscles périphériques " +
         "fait d'abord évoquer un échovirus (types 33 et 27), pas la rétention." },

  { k:"echovirus", l:"Infection congénitale — échovirus", cle:"necroseHemorragique", min:1,
    signes:["necroseHemorragique","necrose","infiltrat"],
    stop:" — « Congenital echovirus infection (echovirus types 33 and 27) has also been implicated as a " +
         "rare cause of stillbirth and may be suspected in the fetus with marked hemorrhagic necrosis, " +
         "particularly in the peripheral muscles » [keeling, ch. 15]. Piège en sens INVERSE de tous les " +
         "autres : attribuer cette image à la rétention ferait perdre un diagnostic. Le muscle n'ayant " +
         "aucun rang de macération, rien ne permet de dire que c'est post-mortem." },

  { k:"dermopathie", l:"Dermopathie restrictive", cle:"peauRigide", min:2,
    signes:["peauRigide","contractures","hydramnios","hypoplasiePulm","muscleNormal"],
    stop:" — c'est une akinésie dont le diagnostic est sur la lame de PEAU, pas de muscle : épiderme " +
         "aminci et hyperkératosique, déficit en élastine dermique, collagène anormalement dense. Et " +
         "une peau normale ne l'écarte pas avant 24-26 SA : « These abnormalities usually appear after " +
         "22–24 weeks' gestation, which is why prenatal ultrasound detection may fail » " +
         "[keeling, ch. 31]. Renvoyer à fiche_peau.md." }
];

/* ── 07 · Négatifs obligatoires ───────────────────────────────────────────────
   L'ordre est celui du § 6 de la fiche, « par ordre de rendement ». Le muscle est,
   avec le cœur, l'un des rares organes où le service en énonce spontanément. */
var NEGATIFS = [
  { k:"myotubes", l:"Absence de myotube au-delà de 18 SA", p:"négatif de maturation — 5 CR sur 176",
    ko:"MYOTUBES PRÉSENTS — au-delà de 18 SA ce n'est plus un stade, c'est un signe (Steinert)" },
  { k:"dispersion", l:"Absence de dispersion de calibre", p:"homogénéité des fibres [soffoet, ch. 10]",
    ko:"DISPERSION de calibre — bimodale entre 18 et 35 SA elle est normale (Wohlfart), anarchique elle se cote" },
  { k:"noyaux", l:"Noyaux périphériques, moins de 5 % de noyaux internes",
    p:"seul seuil chiffré confirmé par deux livres",
    ko:"NOYAUX INTERNES au-delà de 5 % — et le normal n'est donné que pour 40 SA (§ 9.15)" },
  { k:"fascicules", l:"Fascicules complets, sans remplacement adipeux", p:"négatif de l'amyoplasie",
    ko:"FASCICULES incomplets ou remplacement adipeux — les deux seuls signes jamais normaux chez le fœtus" },
  { k:"atrophie", l:"Absence d'atrophie fasciculaire ou groupée", p:"négatif de l'amyotrophie spinale",
    ko:"ATROPHIE groupée ou fasciculaire — et les deux sources divergent sur sa lisibilité en HES (§ 9.9)" },
  { k:"fibrose", l:"Absence de fibrose endomysiale", p:"négatif de la DMC, à énoncer au trichrome",
    ko:"FIBROSE endomysiale — avec peu de nécrose et peu de régénération, elle oriente vers une DMC" },
  { k:"necrose", l:"Absence de nécrose et de régénération",
    p:"ambigu : leur absence est AUSSI un critère positif de DMC",
    ko:"NÉCROSE ou régénération présente — n'énoncer ce négatif qu'avec le contexte de fibrose" },
  { k:"batonnets", l:"Absence de bâtonnets de némaline au Gomori", p:"faisable sur fixé",
    ko:"BÂTONNETS présents au Gomori" },
  { k:"raggedRed", l:"Absence de ragged red fibers", p:"déjà pratiqué — 3 CR sur 176",
    ko:"RAGGED RED FIBERS présentes" },
  { k:"infiltrat", l:"Absence d'infiltrat inflammatoire",
    p:"sa présence ne fait pas une myopathie inflammatoire",
    ko:"INFILTRAT présent — non spécifique, décrit dans Fukuyama, Walker-Warburg et le déficit en laminine-α2" },
  { k:"muscleNomme", l:"Muscle nommé dans le compte rendu",
    p:"le corpus écrit lui-même « soit… soit »",
    ko:"MUSCLE NON NOMMÉ — aucun normal ne s'applique, la maturation est ininterprétable" },
  { k:"pasNosologique", l:"Le négatif rendu est DESCRIPTIF, pas nosologique",
    p:"« absence de myopathie » ne s'écrit jamais",
    ko:"NÉGATIF NOSOLOGIQUE écrit — cinq des six catégories de keeling ne se lisent pas sur cette lame" }
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
  function anormal(k){ return E.signes[k] === "anormal"; }
  function ret(k){ return E.retention[k] === "present"; }

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
  if (anormal("contractures") || anormal("ptergyium") || anormal("contracturesDistales")){
    s.adn = 1; s.moelle = 1;
  }
  if (anormal("peauRigide")) s.adn = 1;
  if (anormal("vacuolaire") || anormal("morphoMyotubulaire") || anormal("hypotrophieGen")) s.me = 1;

  /* Ce qui se décide au moment de l'autopsie et jamais après. */
  if (!E.prelev.congele && SIGNES.some(function(x){ return E.signes[x.k] === "anormal"; })) s.congelation = 1;
  if (!E.prelev.fibroblastes && SIGNES.some(function(x){ return E.signes[x.k] === "anormal"; }))
    s.fibroblastes = 1;
  if (!E.prelev.moelle && (anormal("contractures") || anormal("atrophieGroupee"))) s.moelle = 1;

  if (ret("debrisGranulaire")) s.gram = 1;
  if (ret("enzymoMorte")) s.congelation = 1;

  if (E.negatifs.fibrose === "present"){ s.trichrome = 1; s.merosine = 1; }
  if (E.negatifs.batonnets === "present" || E.negatifs.raggedRed === "present") s.gomori = 1;
  if (E.negatifs.atrophie === "present") s.moelle = 1;
  return s;
}

/* ── Contrôles propres au muscle ──────────────────────────────────────────── */
async function testsOrgane(chk, clic, set, crTient, pause){
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

  /* ── LE verdict bloquant du muscle : un muscle qu'on ne sait pas nommer ── */
  set("sa", "30");
  clic("mdef", "nonNomme");
  chk("muscle non nommé = verdict bloquant", $("vMesure").className.indexOf("bad") >= 0);
  chk("non nommé : maturation ininterprétable", crTient("ININTERPRÉTABLE") &&
      crTient("ne se compare à aucun normal"));
  chk("non nommé : le profil propre est cité", crTient("leur propre profil de développement"));
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
  function pose(k, v){ if (E.signes[k] !== v) clic("les", k, v); }
  function ote(k){ if (E.signes[k]) clic("les", k, E.signes[k]); }
  function tenue(k){ return associations().some(function(a){ return a.d.k === k && a.tenu; }); }
  SIGNES.forEach(function(x){ ote(x.k); });

  set("sa", "30");
  pose("myotubes", "anormal");
  chk("myotubes après 18 SA : réserve de date", crTient("au-delà de 18 SA leur persistance"));
  chk("le terme vient de la macro", crTient("il vient de la macro, pas de la lame"));
  set("sa", "16");
  chk("myotubes à 16 SA : plus de réserve", !crTient("au-delà de 18 SA leur persistance"));
  chk("sous 18 SA le fuseau est proposé", crTient("le seul repère disponible entre 13 et 33 SA"));
  ote("myotubes");

  set("sa", "25");
  pose("dispersion", "anormal");
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
  pose("petitesFibres", "anormal");
  pose("contractures", "anormal");
  chk("petites fibres seules ne tiennent pas l'amyoplasie", !tenue("amyoplasie"));
  pose("adipeux", "anormal");
  pose("fasciculesIncomplets", "anormal");
  chk("le remplacement adipeux la tient", tenue("amyoplasie"));
  chk("le piège central est au CR", crTient("un état NORMAL chez le fœtus"));
  ote("adipeux"); ote("fasciculesIncomplets"); ote("petitesFibres"); ote("contractures");

  /* La DMC se lit sur un négatif qui vaut critère positif */
  pose("fibroseEndomysiale", "anormal");
  pose("necroseRegenerationPeu", "anormal");
  chk("DMC tenue sur fibrose + peu de nécrose", tenue("dmc"));
  chk("DMC propose la mérosine et le trichrome",
      suggerer().merosine === 1 && suggerer().trichrome === 1);
  chk("l'infiltrat ne fait pas la myopathie inflammatoire",
      par(DIAGS, "dmc").stop.indexOf("ne fait PAS une myopathie inflammatoire") >= 0);
  ote("fibroseEndomysiale"); ote("necroseRegenerationPeu");

  /* La SMA sans son pivot ne tient pas */
  pose("fibresHypertrophiques", "anormal");
  pose("fibresArrondies", "anormal");
  chk("sans le pivot, la SMA ne tient pas", !tenue("sma") &&
      crTient("signe pivot non coché : Atrophie groupée"));
  pose("atrophieGroupee", "anormal");
  chk("l'atrophie groupée tient la SMA", tenue("sma"));
  chk("la SMA propose la moelle", suggerer().moelle === 1);
  ote("fibresHypertrophiques"); ote("fibresArrondies"); ote("atrophieGroupee");

  /* Le piège de sens inverse : la nécrose hémorragique n'est pas post-mortem */
  pose("necroseHemorragique", "anormal");
  chk("échovirus se lit", tenue("echovirus"));
  chk("ne pas l'attribuer à la rétention", crTient("attribuer cette image à la rétention"));
  chk("nécrose hémorragique propose le Gram", suggerer().gram === 1);
  ote("necroseHemorragique");

  /* Le muscle normal reste une lecture, pas une exclusion */
  pose("muscleNormal", "anormal");
  pose("ptergyium", "anormal");
  chk("ptérygia tenu sur un muscle normal", tenue("pterygia"));
  ote("muscleNormal"); ote("ptergyium");

  /* Le prélèvement qui ne se rattrape jamais */
  chk("fibroblastes proposés dès qu'un signe est coché", (function(){
    pose("necrose", "anormal");
    var s = suggerer(); ote("necrose");
    return s.fibroblastes === 1 && s.congelation === 1;
  })());

  clic("ret", "debrisGranulaire", "present");
  chk("débris granulaire propose le Gram", suggerer().gram === 1);
  clic("ret", "debrisGranulaire", "present");

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
