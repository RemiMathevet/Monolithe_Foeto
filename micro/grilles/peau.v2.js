/* Grille de lecture — peau. VERSION 2 (2.0.0).
   Migration de peau.js (1.0.1) sur le patron rein v3 / poumon v2 : gen_grille.py,
   mode présence, termes FOETO fondus dans les signes et branchés (termes tagués
   verbatim), blocs lus en §02, ordre de lecture (LECTURE). La v1 reste publiée à
   côté tant que la v2 n'a pas été validée à l'usage.
   Ce que la v2 change, sans rien retrancher de la v1 :
   · un signe est un CONSTAT, présent / absent / non regardé (plus normal /
     anormal). Les 24 constats de fiche_peau.md tagués dans FOETO ont chacun leur
     signe : 20 signes v1 sont branchés (fv), 4 signes entrent — annexesReduites
     (le terme FOETO réunit les trois annexes) et les trois niveaux de clivage lus
     en IF / ME (clivageBasal, clivageLucida, clivageDensa), qui nourrissent
     l'association épidermolyse bulleuse. Les 18 signes v1 sans terme FOETO portent
     fiche:"[source]" : aucun signe hors fiche ;
   · le terme MAL-031 (décollement sous-épidermique à infiltrat pauvre) est porté
     par infiltratPauvre, dont il recopie le critère keeling ; le signe pivot
     clivageSousEpid garde son libellé v1, sans terme ;
   · dix noms de maladie FOETO vont aux associations (fv), affichés, jamais
     exportés. Non branchés faute d'association propre : bébé collodion (MAL-085),
     fœtus arlequin (MAL-091), ichtyose bulleuse (MAL-092), impétigo bulleux
     (MAL-094, partage decollementHaut avec MAL-090), hémangiome congénital
     (TUM-001, partage malformationVasculaire avec VAS-004) — une association ne
     porte qu'un terme ;
   · les douze négatifs se DÉDUISENT : cinq d'un signe répondu absent, sept d'un
     contrôle (région, gestes, deux blocs, signes réunis, origine de la
     desquamation). Plus de bouton « Vérifié » ;
   · la rétention suit le mode présence : les bornes de Genest datables dans la
     liste déroulante, les prédicteurs mauvais et les marqueurs de lame à part ;
   · le prélèvement sépare les gestes irrattrapables (en tête, comme le veut la
     fiche) de ce qui qualifie la lecture ;
   · ordre de lecture : cadres de la peau (CADRES), signes du faible au fort
     grossissement (mag, [expérience], à valider à l'usage), variantes normales
     dans le cadre qu'elles miment et en parenthèse au CR. Le contexte hors lame
     (macro, anamnèse, région du bloc) sort des signes, avant la rétention : les
     signes de disruption (sillon, amputation, syndactylie), le lambeau détaché et
     la région non renseignée y rejoignent les signes que la v1 marquait déjà
     comme lus hors de la lame. Les cinq signes après technique (GLUT-1, niveaux de
     clivage) ne sont pas répondus par le Non en bloc. Aucun signe de polarité
     normale : aucun bloc:false ;
   · regionNonNommee ne se clique plus : il se DÉDUIT de la région déclarée au
     § 04 (auto), que la v1 faisait saisir deux fois ;
   · INFERENCE devient INFÉRENCE dans la note de rétention corneeSeule.
   Fond : ~/Bureau/fiches_lecture/fiche_peau.md (§1 à §9).
   Les divergences entre sources sont PORTÉES dans les champs, jamais arbitrées. */

/* 2.1.0 (2026-11-14) — lot FOETO, propositions relues par Kimi K3.1 Pro et vérifiées par script
   (verbatim mot pour mot dans la fiche) : 3 fenêtre(s) de terme — le « Non » en bloc ne répond plus
   un signe daté hors de sa fenêtre (seul : un par un) ; 16 code(s) FOETO existant(s) branché(s)
   (variantes, rétention, stades, mesures, associations) ; 6 code(s) créé(s) depuis le verbatim de la
   fiche. Les propositions jugées faibles ou fausses attendent le tri de Rémi. */
var ORGANE  = "peau";
var TITRE   = "peau";
var SOURCE  = "fiche_peau.md";
var MODULE  = "grille_peau";
var VERSION = "2.1.0";
var SCHEMA  = "0.3.0";   /* 0.3.0 : signes present/absent, négatifs déduits */
var ETATS   = "presence";
var FOETO_DANS_SIGNES = true;
var BLOCS   = true;
var LECTURE = true;   /* cadres (CADRES), grossissement (mag), variantes dans leur cadre */

/* La peau n'a pas de côté. Elle a une RÉGION, et la région est à la peau ce que
   la latéralité est au rein : la kératinisation est « plus en avance au niveau
   céphalique qu'au niveau caudal, au niveau du dos et des faces latérales du
   thorax qu'au niveau de l'abdomen, en peau épaisse qu'en peau fine et en regard
   des follicules pileux que dans les zones interfolliculaires » [soffoet, ch. 12].
   Deux régions différentes donnent deux termes histologiques différents chez le
   MÊME fœtus, et c'est normal. La région se déclare donc au § 04, où elle
   conditionne le stade. */
var PAIR = false;

var TITRE_CR    = "PEAU";
var STADE_TITRE = "Horloge de la kératinisation — un contrôle croisé du terme, sur un organe qui résiste";

var KCL_TXT = "Fœticide par KCl déclaré. Aucune des sources ne décrit d'effet cutané du geste — mais " +
              "l'heure du décès est alors CONNUE : les constats externes de Genest ne servent plus à " +
              "estimer un délai, ils se comparent au délai réel. Aucune borne n'est à lire ici.";

/* Le retard de kératinisation est le faux positif n° 1 de l'organe, et sa cause
   est presque toujours administrative : on ne sait pas d'où vient le fragment. */
var RETARD_NOTE = "Sur cet organe, un retard de kératinisation est d'abord une erreur de RÉGION : " +
                  "le gradient céphalo-caudal, dorso-ventral et fin/épais est physiologique, et un " +
                  "fragment abdominal comparé à une norme établie sur cuir chevelu est un artefact de " +
                  "région [soffoet, ch. 12]. Vérifier la région déclarée au § 04 et le plan de coupe " +
                  "avant de conclure. La kératinisation normale est tardive : « Elle n'est pas terminée " +
                  "à terme. » [soffoet, ch. 12].";

var AVANCE_NOTE = "Une avance apparente est d'abord une COUPE TANGENTIELLE : elle épaissit faussement " +
                  "l'épiderme et désorganise les couches. Chercher les annexes coupées obliquement et " +
                  "refaire une coupe perpendiculaire avant de parler d'avance ou d'acanthose [expérience].";

var TECH_NOTE = "Les pointillés sont des propositions déduites des clics, jamais des prescriptions. " +
                "Sur cet organe, trois d'entre elles ne se rattrapent pas après le fixateur : culture " +
                "de fibroblastes, fragment congelé pour IF, fragment pour ME. Elles se décident à " +
                "l'ouverture, pas à la lecture.";

/* ── 02 · Prélèvement ─────────────────────────────────────────────────────── */
/* La peau est le seul organe dont le prélèvement principal n'est pas un bloc
   d'histologie : trois décisions se prennent à l'ouverture et aucune ne se
   rattrape ensuite. Elles sont donc en tête. */
var PRELEV = [
  { k:"fibro", g:"Gestes irrattrapables — décidés à l'ouverture", l:"Fragment frais mis en culture de fibroblastes", grave:true,
    manque:"geste irrattrapable — « A skin sample should be submitted for fibroblast culture storage in " +
           "case metabolic enzyme testing is required » [keeling, ch. 31] ; le fixateur l'interdit " +
           "définitivement, et la culture n'apparaît dans AUCUN CR du service (0 occurrence)" },
  { k:"congeleIF", g:"Gestes irrattrapables — décidés à l'ouverture", l:"Fragment congelé 3–4 mm pour IF", grave:true,
    manque:"geste irrattrapable — « Il est conseillé, outre le prélèvement formolé pour la MO standard, " +
           "de congeler systématiquement un fragment cutané (3 à 4 mm) pour l'IHC et d'en prévoir un " +
           "autre pour la ME. » [soffoet, ch. 12] ; sans lui le clivage d'une épidermolyse bulleuse ne " +
           "sera jamais localisé" },
  { k:"me", g:"Gestes irrattrapables — décidés à l'ouverture", l:"Fragment dédié à la microscopie électronique", grave:true,
    manque:"geste irrattrapable — le siège exact du clivage (kératinocytes basaux / lamina lucida / " +
           "fibrilles d'ancrage) ne se lit qu'en ME [soffoet, ch. 12]" },
  { k:"bordureBulle", g:"Gestes irrattrapables — décidés à l'ouverture", l:"S'il y a une bulle : prélèvement en BORDURE",
    manque:"« Il ne faut jamais biopsier le centre de la bulle » [soffoet, ch. 12]" },
  { k:"temoin", g:"Gestes irrattrapables — décidés à l'ouverture", l:"Témoin « peau normale » prévu pour l'IF",
    manque:"l'IF de la JDE ne se lit pas sans son témoin [soffoet, ch. 12]" },
  { k:"deuxBlocs", g:"Qualifie la lecture", l:"Deux blocs SÉPARÉS : peau fine et peau épaisse", grave:true,
    manque:"« peau (abdominale, plante du pied) » [corpus CR] est le couple pratiqué par le service — " +
           "deux fragments de régions différentes dans un MÊME bloc rendent la datation ininterprétable" },
  { k:"region", g:"Qualifie la lecture", l:"Région nommée sur chaque bloc", grave:true,
    manque:"un stade de maturation cutanée sans région nommée ne veut rien dire (§ 04)" },
  { k:"perpendiculaire", g:"Qualifie la lecture", l:"Coupe perpendiculaire au plan cutané",
    manque:"une coupe tangentielle épaissit faussement l'épiderme et simule une acanthose" },
  { k:"dermeProfond", g:"Qualifie la lecture", l:"Derme profond présent sur le fragment",
    manque:"sans derme profond les annexes ne sont pas évaluables — le critère des dysplasies " +
           "ectodermiques porte sur leur nombre et leur taille" },
  { k:"epidermeTient", g:"Qualifie la lecture", l:"Épiderme présent, non décollé sur toute la longueur",
    manque:"la peau cesse de dater quand l'épiderme est ABSENT du fragment, pas quand il est lysé" },
  { k:"pas", g:"Qualifie la lecture", l:"PAS fait",
    manque:"le PAS est discriminant sur cet organe et pas seulement d'appoint : la couche spineuse " +
           "fœtale est glycogénique et PAS+ jusque vers 25 SA [soffoet, ch. 12]" }
];

/* ── 03 · Rétention ───────────────────────────────────────────────────────── */
/* Inversion assumée par rapport au gabarit : la peau ne figure PAS dans la
   Table 15.6, elle n'a donc aucun rang de résistance histologique sourcé. En
   revanche elle est le seul organe à porter une échelle horaire PUBLIÉE — mais
   elle est EXTERNE, macroscopique, et contestée par keeling lui-même.
   En présence, les bornes datables (bon, moyen) tiennent dans la liste
   déroulante, dans l'ordre du délai ; les prédicteurs mauvais et les marqueurs de
   lame se signalent à part. */
var GENEST = "bornes publiées mais faillibles, et EXTERNES : ce sont des constats de macroscopie, " +
             "pas de lame. keeling ch. 15 les conteste nommément — « only 69 % were classified " +
             "correctly » — soit environ 31 % d'erreur de classement. Elles se citent avec leur " +
             "taux d'erreur ; elles ne se donnent pas comme un chronomètre";

var HORS_TABLE = "la peau ne figure PAS dans la Table 15.6 de [keeling, ch. 15] — les dix organes de la " +
                 "séquence de perte de basophilie ne la comprennent pas. Aucun rang de résistance " +
                 "histologique n'existe pour cet organe : ne pas en inventer un";

var RETENTION = [
  { k:"desqToute", l:"Desquamation, quelle qu'elle soit", b:"≥ 3 h",
    d:"constat externe, Genest 1992", h:3, q:"moyen", alerte:GENEST },
  { k:"desq1cm", l:"Desquamation d'au moins 1 cm", b:"≥ 6 h",
    d:"constat externe, Genest 1992", h:6, q:"bon", alerte:GENEST },
  { k:"desqFaceDosAbdo", l:"Desquamation de la face, du dos ou de l'abdomen", b:"≥ 12 h",
    d:"constat externe, Genest 1992", h:12, q:"bon", alerte:GENEST },
  { k:"desqDeuxZones", l:"Desquamation sur au moins 2 zones sur 11", b:"≥ 18 h",
    d:"constat externe, Genest 1992", h:18, q:"bon", alerte:GENEST },
  { k:"desq5pct", l:"Desquamation d'au moins 5 % de la surface", b:"≥ 18 h",
    d:"constat externe, Genest 1992", h:18, q:"bon", alerte:GENEST },
  { k:"desqModSev", l:"Desquamation modérée ou sévère", b:"≥ 24 h",
    d:"constat externe, Genest 1992", h:24, q:"bon", alerte:GENEST },
  { k:"cordonBrun", l:"Coloration brune ou ocre du cordon", b:"≥ 24 h",
    d:"constat externe, Genest 1992", h:24, q:"bon", alerte:GENEST,
    note:"c'est aussi ce qui distingue un né vivant d'un macéré : l'absence de modification de couleur " +
         "DU CORDON [keeling, ch. 15]" },
  { k:"desq10pct", l:"Desquamation de plus de 10 % de la surface", b:"≥ 48 h",
    d:"constat externe, prédicteur mauvais", h:48, q:"mauvais", alerte:GENEST },
  { k:"desq75pct", l:"Desquamation de plus de 75 % de la surface", b:"≥ 72 h",
    d:"constat externe, prédicteur mauvais", h:72, q:"mauvais", alerte:GENEST },
  { k:"ocre", l:"Coloration ocre du fœtus", b:"≥ 4 semaines",
    d:"constat externe, Genest 1992", h:672, q:"moyen", alerte:GENEST,
    note:"une coloration brune ou ocre de la peau est un signe de RÉTENTION, pas une lésion — ni " +
         "ictère ni hémochromatose [ernst, ch. 37]" },

  { k:"clivageSsInfiltrat", l:"Clivage sous-épidermique sans infiltrat ni réaction", b:"—",
    d:"ne sépare rien", h:0, q:"mauvais",
    note:"ce critère NE TRANCHE PAS : tous les sous-types d'épidermolyse bulleuse donnent " +
         "« subepidermal blistering with cell-poor infiltrate » [keeling, ch. 33]. Sur un fœtus macéré, " +
         "un décollement sous-épidermique n'est pas interprétable — et le seul aveu honnête est de " +
         "l'écrire (§ 06)" },
  { k:"necroseEpidRet", fv:"FOETO:PF.PEA-NOR-040", l:"Nécrose épidermique associée à la bulle", b:"—",
    d:"oriente, ne date pas", h:0, q:"mauvais",
    note:"oriente vers la macération plutôt que vers une génodermatose [soffoet, ch. 12] — c'est le " +
         "seul élément de lame qui sépare les deux, et il ne donne aucun délai" },
  { k:"basoPerdue", l:"Perte de basophilie des noyaux basaux et spineux", b:"—",
    d:"non daté pour cet organe", h:0, q:"mauvais", note:HORS_TABLE },
  { k:"corneeSeule", l:"Couche cornée conservée sur un épiderme dénucléé", b:"—",
    d:"ne prouve rien", h:0, q:"mauvais",
    note:"la couche cornée est ANUCLÉÉE : elle ne perd pas de basophilie, donc sa conservation ne dit " +
         "rien de la fraîcheur du tissu. C'est aussi pourquoi l'axe maturation survit ici à la lyse — " +
         "mais ce mécanisme est une INFÉRENCE de la fiche, pas une citation (§ 9-4)" },
  { k:"decollementPrema", fv:"FOETO:PF.PEA-NOR-045", l:"Décollement épidermique d'un grand prématuré", b:"—",
    d:"geste, pas rétention", h:0, q:"mauvais",
    note:"« The immature skin of premature babies may be easily sloughed if tangential force is applied " +
         "to the skin during or following delivery » [keeling, ch. 15] — c'est la délivrance, pas la " +
         "rétention" },
  { k:"moisissures", fv:"FOETO:PF.PEA-NOR-046", l:"Moisissures, activité d'insectes", b:"—",
    d:"décomposition post-délivrance", h:0, q:"mauvais",
    note:"les moisissures et l'activité d'insectes distinguent la décomposition APRÈS la délivrance de " +
         "la macération intra-utérine [keeling, ch. 15] : elles n'entrent dans aucune borne" }
];

/* ── 04 · Maturation ──────────────────────────────────────────────────────── */
/* Toute la fiche est en SA. keeling Table 33.1 est en âge CONCEPTIONNEL : la
   conversion SA = conceptionnel + 2 est appliquée et signalée rang par rang.
   ernst ch. 34 écrit « weeks gestation » quand ch. 35 écrit « postmenstrual
   age » : son échelle n'est pas établie, ses valeurs restent hors de cette table
   (§ 9-1). Les intervalles de la Table 33.1 se chevauchent ; les bornes
   affichées sont reconstruites en une suite continue, ce sont des repères. */
var STADES = [
  { k:"unistratifie", l:"Ectoderme unistratifié", max:7,
    note:"couche unique d'ectoderme, < 10 mm LCC [keeling, ch. 33, Table 33.1, conceptionnel + 2]" },
  { k:"bilaminaire", l:"Épiderme bilaminaire — périderme et couche germinative", max:10,
    note:"10–30 mm LCC [keeling, ch. 33, Table 33.1, conceptionnel + 2]" },
  { k:"interIncomplete", l:"Couche intermédiaire incomplète, mélanocytes plus nombreux", max:13,
    note:"30–65 mm LCC [keeling, ch. 33]. Repère soffoet dans le même intervalle : « A 12 1/2 SA, une " +
         "couche intermédiaire (PAS+ et KL1+) devient identifiable » [soffoet, ch. 12] — c'est le PAS " +
         "et le KL1 qui la rendent visible, pas l'HES seul" },
  { k:"trilaminaire", l:"Épiderme trilaminaire, germes pileux précoces", max:15,
    note:"40–95 mm LCC [keeling, ch. 33]" },
  { k:"deuxCouches", l:"Deux couches interstitielles ou plus, périderme individualisé", max:18,
    note:"80–150 mm LCC [keeling, ch. 33] ; « A 16 SA, une couche intermédiaire est apparue et le " +
         "périderme s'est individualisé » [soffoet, ch. 12]. La Table 33.1 porte ici DEUX rangs " +
         "successifs dont le second est décrit « as above » : elle ne les distingue pas, ils sont " +
         "fondus" },
  { k:"keratPeriFoll", l:"Kératinisation péri-folliculaire, desquamation du périderme", max:25,
    note:"le rang PIVOT de la datation cutanée, 18–25 SA : « Keratinisation first seen around hair " +
         "follicles » et « Periderm begins to peel away », ≥ 4 couches interstitielles [keeling, ch. 33]. " +
         "ATTENTION : le terme foeto_terms PEA-NOR-035 porte « 16–23 semaines », qui est l'âge " +
         "CONCEPTIONNEL de la Table 33.1 recopié comme s'il s'agissait de SA — 2 semaines d'erreur sur " +
         "le rang pivot (§ 10-A). Repère du même intervalle : « A 22 SA, en peau épaisse, la couche " +
         "spineuse reste très claire et PAS + » [soffoet, ch. 12]. Le périderme qui desquame ici est " +
         "PHYSIOLOGIQUE : ne pas le lire comme une desquamation de macération" },
  { k:"procheNouveauNe", l:"Aspect proche du nouveau-né au CUIR CHEVELU", max:29,
    note:"à 25 SA, « la peau du fœtus apparaît très proche de celle d'un nouveau-né à terme », la couche " +
         "cornée et le derme restant plus minces et le réseau élastique immature [soffoet, ch. 12]. " +
         "keeling place au même moment « Appearance approaches adult epidermis » (> 185 mm, > 23 " +
         "semaines conceptionnelles) [keeling, ch. 33]. Le cuir chevelu est EN AVANCE sur le reste du " +
         "corps : ce rang ne vaut que si la région déclarée est céphalique" },
  { k:"corpsEntier", l:"Aspect proche du nouveau-né sur le RESTE DU CORPS, glycogène spineux disparu", max:99,
    note:"« A 29 SA sur le reste du corps » et « les plages de glycogène ont disparu et le PAS est " +
         "négatif » [soffoet, ch. 12] — le PAS bascule ici, c'est le seul virage coloré daté de " +
         "l'organe. DIVERGENCE NON tranchée sur la fin de l'échelle, trois valeurs pour l'aspect " +
         "adulte : > 25 SA [keeling, ch. 33], 29 SA [soffoet, ch. 12], et « By the 34th week of " +
         "gestation, the skin has achieved an architecture similar to that seen in the adult » " +
         "[ernst, ch. 34], dont l'échelle n'est pas établie donc non convertie (§ 9-5). Divergence " +
         "INTERNE à soffoet par-dessus : le même chapitre écrit qu'à 29 SA la peau est très proche de " +
         "celle d'un nouveau-né et que la kératinisation « Elle n'est pas terminée à terme. » (§ 9-6)" }
];

/* La région n'est pas un commentaire : sans elle le stade ne veut rien dire. */
var REGIONS = [
  { k:"abdomen",     l:"Abdomen — peau fine" },
  { k:"plante",      l:"Plante du pied — peau épaisse" },
  { k:"cuirChevelu", l:"Cuir chevelu — céphalique, en avance" },
  { k:"dos",         l:"Dos — en avance sur l'abdomen" },
  { k:"thoraxLat",   l:"Face latérale du thorax — en avance sur l'abdomen" },
  { k:"autre",       l:"Autre région, nommée en clair dans la remarque" },
  { k:"nonNommee",   l:"Région NON nommée sur le bloc" }
];

/* L'échelle réellement pratiquée par le service, relevée sur les 18 CR qui
   datent sur la kératinisation. Elle est ORDINALE, à deux colonnes fine/épaisse
   dans un même rang, et n'a AUCUNE borne SA attachée. C'est un gradient d'usage,
   pas une norme publiée : elle est portée telle quelle, sans borne inventée. */
var KERAT = [
  { k:"r0", l:"0 — « peau non kératinisée »" },
  { k:"r1", l:"1 — « début de kératinisation en peau épaisse et pas en peau fine »" },
  { k:"r2", l:"2 — « la peau épaisse présente quelques couches de kératine, la peau fine est peu kératinisée »" },
  { k:"r3", l:"3 — « kératinisation complète de la peau épaisse, partielle en peau fine »" },
  { k:"r4", l:"4 — « la peau fine est en cours de kératinisation »" },
  { k:"r5", l:"5 — « les peaux fine et épaisse sont toutes deux kératinisées », « épaisse couche cornée »" }
];

var MESURE = {
  titre:"Région prélevée, échelle ordinale du service, épaisseur de la couche cornée",
  defLabel:"région prélevée — sans elle, aucun stade",
  optLabel:"rang du service — aucune borne SA",
  defs:REGIONS, opts:KERAT,
  champs:[{ id:"cornee", fv:"FOETO:PF.PEA-NOR-039", label:"Épaisseur de la couche cornée, peau fine (µm)", min:0, max:200, step:0.1 }]
};

function peauFine(k){ return k === "abdomen" || k === "cuirChevelu" || k === "dos" || k === "thoraxLat"; }

/* Le plancher d'interprétabilité du § 5 : il est CONSTRUIT, pas cité. Il combine
   l'ultrastructure de soffoet et les termes de biopsie anténatale du même
   chapitre ; aucune source ne l'énonce comme seuil (§ 9-10). */
function plancher(reg){ return reg === "plante" ? 22 : 25; }

function verdictMesure(){
  var reg = E.mesure.def, g = E.mesure.opt, n = E.mesure.v.cornee, sa = num("sa");
  if (!reg && !g && n == null && !E.stade)
    return { cls:"", txt:"Ni région, ni rang, ni mesure — la peau n'est pas encore lue." };

  var t = [], cls = "ok", res = [];

  if (!reg || reg === "nonNommee"){
    cls = "bad";
    t.push((reg === "nonNommee" ? "Région déclarée NON nommée sur le bloc" : "Région NON déclarée") +
           " : le stade de maturation cutanée est ININTERPRÉTABLE. La kératinisation est « plus en " +
           "avance au niveau céphalique qu'au niveau caudal, au niveau du dos et des faces latérales " +
           "du thorax qu'au niveau de l'abdomen, en peau épaisse qu'en peau fine et en regard des " +
           "follicules pileux que dans les zones interfolliculaires » [soffoet, ch. 12] : sans région, " +
           "il n'y a pas de norme à laquelle comparer. C'est la cause d'indéterminabilité la plus " +
           "fréquente — l'écrire, ne pas laisser vide.");
  } else {
    t.push("Région : " + par(REGIONS, reg).l.toLowerCase() + ", " +
           (reg === "autre" ? "à nommer en clair" : peauFine(reg) ? "peau fine" : "peau épaisse") + ".");
  }

  if (g){
    var r = par(KERAT, g);
    t.push("Rang du service : " + r.l + ". Cette échelle est ordinale, à deux colonnes fine et épaisse, " +
           "et n'a AUCUNE borne SA attachée dans les CR — c'est un gradient d'usage, pas une norme " +
           "publiée. foeto_grades est d'ailleurs vide pour la peau (0 ligne) alors que le service s'en " +
           "sert tous les jours.");
    if (g === "r1")
      t.push("Seul ce rang s'aligne sur les livres, par le bas : la kératinisation péri-folliculaire " +
             "est datée 18–25 SA [keeling, ch. 33].");
    else if (g === "r5")
      t.push("Seul ce rang s'aligne sur les livres, par le haut : ≳ 29 SA [soffoet, ch. 12] — sans " +
             "oublier que la kératinisation « Elle n'est pas terminée à terme. »");
    else
      res.push("les rangs 2, 3 et 4 sont des jugements d'expérience non sourcés — ne leur attacher " +
               "aucune SA (§ 9-7)");
  }

  if (n != null){
    if (cls === "ok") cls = "warn";
    t.push("Couche cornée mesurée à " + n + " µm — et il n'existe AUCUNE NORME PUBLIÉE TROUVÉE pour " +
           "cet organe : aucune épaisseur épidermique ou cornée datée par terme n'est dans les livres " +
           "du corpus. Le service mesure pourtant, et le dit : « La peau est kératinisée, on note que " +
           "la couche cornée est parfois assez peu épaisse en peau fine (de l'ordre de 8 µm, possible " +
           "retard de kératinisation qui pourrait expliquer le LA normal après 23 SA) » [corpus CR]. " +
           "Un chiffre sans son normal ne vaut rien : la mesure se consigne, elle ne s'interprète pas. " +
           "La référence qui comblerait ce trou (Ersch & Stallmach, Obstet Gynecol 1999) est citée en " +
           "bibliographie d'[ernst, ch. 34] mais absente du corpus indexé (§ 9-8).");
  }

  if (reg && reg !== "nonNommee" && sa != null && sa < plancher(reg))
    res.push("à " + sa + " SA en " + (peauFine(reg) ? "peau fine" : "peau épaisse") + ", le plancher " +
             "d'interprétabilité n'est pas atteint (~" + plancher(reg) + " SA) : une hyperkératose ou " +
             "une absence de kératinisation n'est PAS interprétable comme lésion. Bornes d'appui : " +
             "« A 24 SA, en peau épaisse, la différenciation épidermique terminale n'apparaît pas " +
             "terminée », « A 25 SA, en peau fine, la différenciation épidermique terminale est à " +
             "peine ébauchée » [soffoet, ch. 12], et « biopsie de peau à 20-22 SA » pour l'ichtyose " +
             "bulleuse. Ce seuil est CONSTRUIT, aucune source ne l'énonce (§ 9-10)");

  if (reg === "plante" && E.signes.folliculesReduits === POS)
    res.push("follicules réduits déclarés sur une PLANTE DE PIED : la peau épaisse palmoplantaire est " +
             "NORMALEMENT sans follicule — vérifier la région avant d'évoquer une dysplasie ectodermique");
  if (E.stade === "procheNouveauNe" && reg && reg !== "cuirChevelu" && reg !== "nonNommee")
    res.push("le rang « proche du nouveau-né » à 25 SA est décrit AU CUIR CHEVELU : sur une autre " +
             "région il est en avance de son propre gradient");
  if (!E.prelev.deuxBlocs)
    res.push("un seul bloc : peau fine et peau épaisse se datent SÉPARÉMENT, et le couple donne les " +
             "deux bornes du gradient");
  if (!E.prelev.perpendiculaire)
    res.push("plan de coupe non confirmé — une coupe tangentielle épaissit faussement l'épiderme");

  if (res.length){ if (cls === "ok") cls = "warn"; t.push("Réserves : " + res.join(" ; ") + "."); }
  return { cls:cls, txt:t.join(" ") };
}

/* ── 05 · Variantes normales — chacune dans le cadre dont elle mime un signe ── */
var VARIANTES = [
  { k:"spineuseClaire",  fv:"FOETO:PF.PEA-NOR-043", g:"Épiderme et kératinisation", l:"Couche spineuse claire, glycogénique, PAS+ (aspect de cellules claires)" },
  { k:"elastiqueImmat",  fv:"FOETO:PF.PEA-NOR-053", g:"Derme — œdème et vaisseaux", l:"Réseau élastique dermique immature ou raréfié à l'orcéine" },
  { k:"granuleuseAbs",   fv:"FOETO:PF.PEA-NOR-042", g:"Épiderme et kératinisation", l:"Absence de couche granuleuse avant la kératinisation de la région" },
  { k:"peridermeDesq",   fv:"FOETO:PF.PEA-NOR-052", g:"Décollement et bulles",      l:"Périderme desquamant en fin de 2ᵉ trimestre" },
  { k:"melanoSansTransf",fv:"FOETO:PF.PEA-NOR-054", g:"Épiderme et kératinisation", l:"Mélanocytes présents sans transfert mélanosomal aux kératinocytes" },
  { k:"corneeMince",     fv:"FOETO:PF.PEA-NOR-041", g:"Épiderme et kératinisation", l:"Couche cornée encore mince au 3ᵉ trimestre" },
  { k:"pasDeFollicule",  fv:"FOETO:PF.PEA-NOR-051", g:"Annexes",                    l:"Absence de follicule pileux en peau épaisse palmoplantaire" },
  { k:"kerato21",        g:"Épiderme et kératinisation", l:"Absence de grains de kératohyaline avant ≈ 21 semaines (ernst, échelle non établie)" },
  { k:"vernix",          g:"Décollement et bulles",      l:"Vernix caseosa — périderme desquamé, sébum et lanugo" },
  { k:"cicatrisation",   g:"Contexte hors lame — macro, anamnèse, bloc",
    l:"Cicatrisation cutanée fœtale sans cicatrice (PEA-NOR-001, non retrouvée verbatim dans les livres)" }
];

/* Cadres de la peau, dans l'ordre où on lit la lame. Le décollement passe avant
   l'épiderme : la peau cesse de se lire quand l'épiderme manque (§ 2). */
var CADRES = [
  { g:"Contexte hors lame — macro, anamnèse, bloc", hors:true },
  { g:"Décollement et bulles", sur:"Épiderme" },
  { g:"Épiderme et kératinisation", sur:"Épiderme" },
  { g:"Annexes", sur:"Derme et annexes" },
  { g:"Derme — œdème et vaisseaux", sur:"Derme et annexes" },
  { g:"Inflammation et infection" }
];

/* ── 06 · Signes ──────────────────────────────────────────────────────────────
   On coche des SIGNES, jamais des diagnostics. Sur cet organe la frontière est
   particulièrement nette : « hyperkératose, parakératose focale, hypergranulose,
   acanthose » appartient à la micro, « ichtyose » appartient à la conclusion ET
   à la génétique [keeling, ch. 33]. Un signe branché (fv) prend son libellé et son
   HPO dans FOETO ; un l écrit à côté garde le libellé v1 pour mémoire. Rien de
   coché ne veut pas dire absent : ça veut dire non regardé. */
var SIGNES = [
  /* — Contexte hors lame — macro, anamnèse, bloc — */
  { k:"peauTendue", fv:"FOETO:PF.PEA-MAL-081", g:"Contexte hors lame — macro, anamnèse, bloc", l:"Peau tendue et rigide",
    meta:"macroscopie — « evidenced by tight skin »" },
  { k:"bebeCollodion", fiche:"[keeling, ch. 33]", g:"Contexte hors lame — macro, anamnèse, bloc", l:"Aspect de bébé collodion",
    meta:"macroscopie — forme moins sévère d'ARCI" },
  { k:"arlequin", fiche:"[keeling, ch. 33]", g:"Contexte hors lame — macro, anamnèse, bloc", l:"Aspect d'arlequin",
    meta:"macroscopie — forme la plus sévère d'ARCI, ABCA12" },
  { k:"desquamationLambeaux", fv:"FOETO:PF.PEA-NOR-048", fiche:"[soffoet, ch. 18]", g:"Contexte hors lame — macro, anamnèse, bloc", l:"Desquamation cutanée en lambeaux",
    meta:"macroscopie" },
  { k:"colorationBrune", fv:"FOETO:PF.PEA-MAL-120", fiche:"[ernst, ch. 37]", g:"Contexte hors lame — macro, anamnèse, bloc", l:"Coloration brune ou ocre de la peau",
    meta:"macroscopie — signe de rétention" },
  { k:"sillonConstrictif", fv:"FOETO:PF.PEA-MAL-083", g:"Contexte hors lame — macro, anamnèse, bloc", l:"Sillon constrictif circonférentiel" },
  { k:"amputation", fv:"FOETO:PF.PEA-MAL-121", fiche:"[keeling, ch. 33]", g:"Contexte hors lame — macro, anamnèse, bloc", l:"Amputation d'un segment" },
  { k:"syndactylie", fv:"FOETO:PF.PEA-MAL-122", fiche:"[keeling, ch. 33]", g:"Contexte hors lame — macro, anamnèse, bloc", l:"Syndactylie de fusion" },
  { k:"lambeauDetache", fv:"FOETO:PF.PEA-MAL-123", fiche:"[soffoet, ch. 18]", g:"Contexte hors lame — macro, anamnèse, bloc", l:"Lambeau de peau détaché" },
  { k:"amniocentese", fv:"FOETO:PF.PEA-MAL-068", g:"Contexte hors lame — macro, anamnèse, bloc",
    meta:"hors lame — l'anamnèse tranche, pas la lame" },
  /* déduit de la région déclarée au § 04 (la v1 la faisait saisir deux fois) */
  { k:"regionNonNommee", auto:function(){ var r = E.mesure.def; return r == null ? null : r === "nonNommee"; },
    fiche:"[soffoet, ch. 12]", g:"Contexte hors lame — macro, anamnèse, bloc", l:"Région du fragment non renseignée" },

  /* — Décollement et bulles — le piège majeur de l'organe — */
  { k:"decollementTotal", fiche:"[expérience]", g:"Décollement et bulles", mag:"faible", l:"Épiderme décollé sur toute la longueur du fragment" },
  { k:"bulle", fv:"FOETO:PF.PEA-MAL-069", g:"Décollement et bulles", mag:"faible" },
  { k:"clivageSousEpid", fv:"FOETO:PF.PEA-MAL-124", fiche:"[keeling, ch. 33]", g:"Décollement et bulles", mag:"faible", l:"Clivage SOUS-épidermique" },
  { k:"clivageHaut", fv:"FOETO:PF.PEA-MAL-072", g:"Décollement et bulles", mag:"moyen", l:"Décollement épidermique HAUT, intra-épidermique" },
  { k:"infiltratPauvre", fv:"FOETO:PF.PEA-MAL-031", g:"Décollement et bulles", mag:"moyen", l:"Infiltrat pauvre en cellules au niveau du clivage",
    meta:"« subepidermal blistering with cell-poor infiltrate » — commun à TOUS les sous-types d'EB : ce critère ne sépare rien" },
  { k:"necroseEpidermique", fv:"FOETO:PF.PEA-VAS-002", g:"Décollement et bulles", mag:"moyen", l:"Nécrose épidermique",
    meta:"le seul élément de lame qui oriente vers la macération plutôt que vers une génodermatose" },
  { k:"clivageBasal", fv:"FOETO:PF.PEA-MAL-070", g:"Décollement et bulles", mag:"technique",
    meta:"siège du clivage lu en IF sur congelé ou en ME [soffoet, ch. 12]" },
  { k:"clivageLucida", fv:"FOETO:PF.PEA-MAL-071", g:"Décollement et bulles", mag:"technique",
    meta:"siège du clivage lu en IF sur congelé ou en ME [soffoet, ch. 12]" },
  { k:"clivageDensa", fv:"FOETO:PF.PEA-MAL-023", g:"Décollement et bulles", mag:"technique",
    meta:"zone des fibrilles d'ancrage, lue en IF sur congelé ou en ME [soffoet, ch. 12]" },

  /* — Épiderme et kératinisation — descripteurs, jamais un nom — */
  { k:"coupeTangentielle", fiche:"[expérience]", g:"Épiderme et kératinisation", mag:"faible", l:"Annexes coupées obliquement — coupe tangentielle",
    meta:"à lire d'abord : elle contrefait l'acanthose et l'avance" },
  { k:"epidermeEpais", fiche:"[expérience]", g:"Épiderme et kératinisation", mag:"faible", l:"Épiderme épais, couches désorganisées",
    meta:"chercher d'abord la coupe tangentielle" },
  { k:"epidermeMince", fv:"FOETO:PF.PEA-MAL-125", fiche:"[soffoet, ch. 12]", g:"Épiderme et kératinisation", mag:"faible", l:"Épiderme mince, non kératinisé au terme déclaré" },
  { k:"acanthose", fv:"FOETO:PF.PEA-MAL-067", g:"Épiderme et kératinisation", mag:"faible" },
  { k:"hyperkeratose", fv:"FOETO:PF.PEA-MAL-076", g:"Épiderme et kératinisation", mag:"faible",
    meta:"descripteur : « There is usually variable hyperkeratosis, focal parakeratosis, hypergranulosis and acanthosis of the epidermis in all forms »" },
  { k:"corneeAbsente", fiche:"[soffoet, ch. 12]", g:"Épiderme et kératinisation", mag:"moyen", l:"Couche cornée absente" },
  { k:"hypergranulose", fv:"FOETO:PF.PEA-MAL-075", g:"Épiderme et kératinisation", mag:"moyen" },
  { k:"parakeratoseFocale", fv:"FOETO:PF.PEA-MAL-080", g:"Épiderme et kératinisation", mag:"fort" },

  /* — Annexes — le compte des dysplasies ectodermiques — */
  { k:"annexesAbsentes", fiche:"[expérience]", g:"Annexes", mag:"faible", l:"Aucune annexe sur le fragment",
    meta:"prélèvement trop superficiel avant tout — pas de derme profond" },
  { k:"annexesReduites", seul:true, fv:"FOETO:PF.PEA-MAL-061", g:"Annexes", mag:"faible",
    meta:"les trois annexes ensemble ; aucune densité normale par terme n'est publiée" },
  { k:"folliculesReduits", fiche:"[keeling, ch. 33]", g:"Annexes", mag:"faible", l:"Follicules pileux réduits en nombre ou en taille" },
  { k:"eccrinesReduites", seul:true, fiche:"[keeling, ch. 33]", g:"Annexes", mag:"moyen", l:"Glandes sudorales eccrines réduites en nombre ou en taille" },
  { k:"sebaceesReduites", seul:true, fiche:"[keeling, ch. 33]", g:"Annexes", mag:"moyen", l:"Glandes sébacées réduites en nombre ou en taille" },

  /* — Derme — œdème et vaisseaux — */
  { k:"oedemeDermoHypo", fv:"FOETO:PF.PEA-MAL-079", g:"Derme — œdème et vaisseaux", mag:"faible" },
  { k:"lymphatiquesDilates", fv:"FOETO:PF.PEA-MAL-078", g:"Derme — œdème et vaisseaux", mag:"faible", l:"Espaces lymphatiques dilatés" },
  { k:"prolifCapillaire", fv:"FOETO:PF.PEA-VAS-003", g:"Derme — œdème et vaisseaux", mag:"faible" },
  { k:"canauxDysmorphiques", fv:"FOETO:PF.PEA-VAS-001", g:"Derme — œdème et vaisseaux", mag:"moyen", l:"Canaux vasculaires dysmorphiques SANS prolifération" },
  { k:"glut1Pos", fv:"FOETO:PF.PEA-MAL-074", g:"Derme — œdème et vaisseaux", mag:"technique", meta:"lecture d'IHC, pas de HES" },
  { k:"glut1Neg", fv:"FOETO:PF.PEA-MAL-073", g:"Derme — œdème et vaisseaux", mag:"technique", meta:"lecture d'IHC, pas de HES" },

  /* — Inflammation et infection — */
  { k:"pustules", fv:"FOETO:PF.PEA-MAL-082", g:"Inflammation et infection", mag:"faible" },
  { k:"infiltratDermique", fv:"FOETO:PF.PEA-INF-002", g:"Inflammation et infection", mag:"moyen",
    meta:"la lyse dégrade l'infiltrat : son absence sur macéré ne vaut pas exclusion" },
  { k:"inclusionsVirales", fv:"FOETO:PF.PEA-MAL-077", g:"Inflammation et infection", mag:"fort", l:"Inclusions virales" }
];

/* ── 06 bis · Associations — affichées, jamais cochées ────────────────────────
   Plusieurs partagent délibérément leurs signes : sur cet organe, la macération
   et la génodermatose donnent la MÊME image, et le module doit les faire
   apparaître ensemble plutôt que d'en choisir une. Un fv nomme la maladie FOETO
   de l'association : affiché, non exporté. Une association ne porte qu'un
   terme : decollementHaut prend l'épidermolyse staphylococcique (MAL-090), pas
   l'impétigo bulleux (MAL-094) ; malformationVasculaire prend VAS-004, pas
   l'hémangiome congénital (TUM-001). */
var DIAGS = [
  { k:"keratDescriptive", l:"Trouble de la kératinisation — description, PAS un nom", fv:"FOETO:PF.PEA-MAL-093",
    cle:"hyperkeratose", min:2,
    signes:["hyperkeratose","parakeratoseFocale","hypergranulose","acanthose"],
    stop:" — « ichtyose » NE SE CONCLUT PAS sur l'histologie : « Histology is of limited value in the " +
         "diagnosis of the various forms of congenital ichthyosis » [keeling, ch. 33]. La micro décrit " +
         "hyperkératose, parakératose focale, hypergranulose, acanthose ; la conclusion nomme, et " +
         "seulement avec la génétique — ABCA12 pour l'arlequin. Et avant le plancher " +
         "d'interprétabilité (~22 SA en peau épaisse, ~25 SA en peau fine, § 04), une hyperkératose " +
         "n'est pas même une lésion." },

  { k:"coupeTangFausseAvance", l:"Coupe tangentielle contrefaisant une acanthose ou une avance",
    cle:"coupeTangentielle", min:2,
    signes:["coupeTangentielle","epidermeEpais","acanthose","hypergranulose"],
    stop:" — se lit EN MÊME TEMPS que la description précédente, et c'est voulu : rien sur la lame ne " +
         "les sépare tant que la coupe n'a pas été refaite perpendiculairement au plan cutané " +
         "[expérience]." },

  { k:"clivageNonInterpretable", l:"Décollement sous-épidermique NON interprétable (fœtus macéré)",
    cle:"clivageSousEpid", min:2,
    signes:["clivageSousEpid","infiltratPauvre","necroseEpidermique","decollementTotal","desquamationLambeaux"],
    stop:" — c'est la BONNE réponse, pas un échec : sur un fœtus macéré un décollement sous-épidermique " +
         "n'est pas interprétable. La nécrose épidermique oriente vers la macération [soffoet, ch. 12], " +
         "et le niveau exact du clivage ne se lit qu'en IF et en ME — deux techniques inutilisables sur " +
         "macéré. Aujourd'hui foeto_terms ne permet pas d'enregistrer ce refus de conclure (§ 10-E)." },

  { k:"ebSuspecte", l:"Épidermolyse bulleuse héréditaire — ce que la lame ne tranche pas", fv:"FOETO:PF.PEA-MAL-089",
    cle:"clivageSousEpid", min:2,
    signes:["clivageSousEpid","infiltratPauvre","bulle","clivageBasal","clivageLucida","clivageDensa"],
    stop:" — ne JAMAIS écrire « épidermolyse bulleuse » sur une lame HES formolée seule, et jamais sur " +
         "un fœtus macéré. Le sous-type n'est pas un grade. DIVERGENCE NON tranchée sur la méthode, et " +
         "elle se décide AVANT l'autopsie parce qu'elle change ce qu'on prélève : soffoet maintient le " +
         "diagnostic sur IF (peau congelée, antigènes de la JDE) et ME, quand keeling le déplace vers " +
         "la génétique — « Electron microscopy is now less commonly used for diagnosis of EB… Routine " +
         "histology is not useful for the diagnosis of the EB subtypes » [keeling, ch. 33] (§ 9-11). " +
         "Le niveau du clivage (kératinocytes basaux, lamina lucida, fibrilles d'ancrage) entre ici " +
         "comme signe lu après technique [soffoet, ch. 12]." },

  { k:"bulleVirale", l:"Bulle d'origine infectieuse", fv:"FOETO:PF.PEA-INF-003",
    cle:"inclusionsVirales", min:2,
    signes:["inclusionsVirales","bulle","infiltratDermique","pustules"],
    stop:" — une bulle n'est pas un diagnostic : « l'observation de bulles chez un fœtus fait discuter " +
         "une ichtyose bulleuse, une éruption virale à HSV (herpès, varicelle), un impétigo bulleux, " +
         "une épidermolyse staphylococcique aiguë ou des bulles par macération (nécrose épidermique) » " +
         "[soffoet, ch. 12]. Décrire le niveau, l'infiltrat, l'état de l'épiderme sus-jacent. Un " +
         "négatif viral sur fœtus macéré ne vaut pas exclusion." },

  { k:"decollementHaut", l:"Décollement épidermique haut — impétigo, épidermolyse staphylococcique", fv:["FOETO:PF.PEA-MAL-090","FOETO:PF.PEA-MAL-094"],
    cle:"clivageHaut", min:2,
    signes:["clivageHaut","pustules","bulle"],
    stop:" — le niveau du décollement est ce qui sépare cette famille de l'épidermolyse bulleuse " +
         "héréditaire : haut ici, sous-épidermique là [soffoet, ch. 12]." },

  { k:"dysplasieEctodermique", l:"Dysplasie ectodermique (forme anhidrotique)", fv:"FOETO:PF.PEA-MAL-088",
    cle:"eccrinesReduites", min:2,
    signes:["eccrinesReduites","folliculesReduits","sebaceesReduites","annexesReduites"],
    stop:" — le critère est « marked reduction in the number and size of eccrine glands, hair " +
         "follicles, and sebaceous glands » [keeling, ch. 33], et il n'a AUCUN dénominateur : aucune " +
         "densité normale d'annexes par terme n'est publiée dans le corpus, donc « marked » n'a pas de " +
         "seuil (§ 9-12). Deux causes de faux positif à écarter avant : un prélèvement sans derme " +
         "profond, et une région normalement dépourvue de follicules (peau épaisse palmoplantaire)." },

  { k:"prelevementSuperficiel", l:"Annexes non évaluables — prélèvement superficiel ou mauvaise région",
    cle:"annexesAbsentes", min:2,
    signes:["annexesAbsentes","eccrinesReduites","folliculesReduits","sebaceesReduites","annexesReduites"],
    stop:" — s'affiche EN MÊME TEMPS que la dysplasie ectodermique, et c'est voulu : sans derme profond " +
         "sur le fragment, l'absence d'annexes ne dit rien de l'enfant [expérience]." },

  { k:"hemangiomeInfantile", l:"Hémangiome infantile", fv:"FOETO:PF.PEA-TUM-002",
    cle:"glut1Pos", min:2,
    signes:["prolifCapillaire","glut1Pos"],
    stop:" — ne pas nommer « hémangiome » sans GLUT-1 quand la distinction change la prise en charge : " +
         "GLUT-1 est positif dans l'hémangiome infantile et négatif dans l'hémangiome congénital comme " +
         "dans les malformations vasculaires [keeling, ch. 33]. Si la lésion est multiple, chercher les " +
         "localisations viscérales." },

  { k:"malformationVasculaire", l:"Hémangiome congénital ou malformation vasculaire", fv:["FOETO:PF.PEA-VAS-004","FOETO:PF.PEA-TUM-001"],
    cle:"glut1Neg", min:2,
    signes:["canauxDysmorphiques","glut1Neg","prolifCapillaire"],
    stop:" — GLUT-1 négatif ne distingue PAS l'hémangiome congénital de la malformation vasculaire : " +
         "c'est la prolifération (lobulée) contre les canaux dysmorphiques sans prolifération qui les " +
         "sépare [keeling, ch. 33]." },

  { k:"oedemeAnasarque", l:"Œdème cutané d'anasarque, hygroma", fv:"FOETO:PF.PEA-MAL-084",
    cle:"oedemeDermoHypo", min:2,
    signes:["oedemeDermoHypo","lymphatiquesDilates"],
    stop:" — ne pas conclure « anasarque » sur un fœtus macéré sans corrélation macroscopique " +
         "(épanchements, poids placentaire). Aucune épaisseur cutanée normale par terme n'existe dans " +
         "le corpus pour objectiver l'œdème (§ 9-13) : la mesure ne tranchera pas." },

  { k:"pseudoAnasarquePM", l:"Pseudo-anasarque post-mortem",
    cle:"oedemeDermoHypo", min:2,
    signes:["oedemeDermoHypo","desquamationLambeaux","colorationBrune"],
    stop:" — s'affiche EN MÊME TEMPS que l'anasarque, et c'est voulu : « doit être distinguée des " +
         "déplacements de liquide, sans augmentation de leur quantité, que l'on constate chez le fœtus " +
         "décédé in utero et macéré. Ils sont dus au passage passif de liquide au travers de la paroi " +
         "vasculaire devenue perméable après le décès fœtal. » [soffoet, ch. 17]. Sans augmentation de " +
         "QUANTITÉ : la lame ne la mesure pas, la macroscopie si." },

  { k:"brideAmniotique", l:"Bride amniotique — disruption", fv:"FOETO:PF.PEA-MAL-086",
    cle:"sillonConstrictif", min:2,
    signes:["sillonConstrictif","amputation","syndactylie","amniocentese"],
    stop:" — incidence 1:10 000 naissances vivantes, 1:5 000 en incluant les mort-nés [keeling, ch. 33]. " +
         "L'amniocentèse peut en causer : l'anamnèse tranche, pas la lame. Le sillon cutané est cutané, " +
         "la bride est une disruption multi-organe — les deux ne se rangent pas au même endroit." },

  { k:"lambeauPasBride", l:"Lambeau desquamé — ce n'est PAS une bride",
    cle:"lambeauDetache", min:2,
    signes:["lambeauDetache","desquamationLambeaux","sillonConstrictif"],
    stop:" — « il faut faire la part de lambeaux cutanés desquamant en raison de la macération » " +
         "[soffoet, ch. 18], et de même « Il ne faut pas prendre une desquamation cutanée en lambeaux " +
         "due à la macération pour une génodermatose » [soffoet, ch. 18]. Une bande de peau détachée " +
         "n'est ni une bride ni une génodermatose." },

  { k:"peauTendueGeste", l:"Peau tendue ou rigide — trois présentations macroscopiques, un seul geste", fv:["FOETO:PF.PEA-MAL-087","FOETO:PF.PEA-MAL-085","FOETO:PF.PEA-MAL-091"],
    cle:"peauTendue", min:1,
    signes:["peauTendue","bebeCollodion","arlequin"],
    stop:" — ce n'est pas une association histologique : aucune histologie de la dermopathie " +
         "restrictive n'est sourçable dans les chapitres lus, le signe d'appel est MACROSCOPIQUE " +
         "(« particularly if there is any suggestion of restrictive dermopathy… (evidenced by tight " +
         "skin) » [keeling, ch. 31]). Ce qui se décide ici est le GESTE, et il ne se rattrape pas : " +
         "prélever pour l'histologie ET mettre en culture de fibroblastes. Collodion et arlequin sont " +
         "des formes d'ARCI que la génétique nomme, pas la lame." },

  { k:"regionInconnue", l:"Retard de kératinisation NON interprétable — région inconnue",
    cle:"regionNonNommee", min:2,
    signes:["regionNonNommee","epidermeMince","corneeAbsente"],
    stop:" — le gradient régional est physiologique et il est de plusieurs semaines : un fragment " +
         "abdominal comparé à une norme de cuir chevelu produit un retard qui n'existe pas " +
         "[soffoet, ch. 12]. Renseigner la région au § 04 ; à défaut, écrire « indéterminable » et non " +
         "laisser vide." }
];

/* ── 07 · Négatifs obligatoires — déduits des signes et des données ───────────
   Constat mesuré d'abord : sur les 176 CR avec micro, les négatifs cutanés sont
   quasi absents — décollement 0, périderme 0, follicule pileux 0, hémangiome 0,
   œdème cutané 1, bride 1 [corpus CR]. Cette liste est donc une PROPOSITION
   issue des livres, pas un relevé de pratique. C'est un écart à assumer.
   Un négatif portant sur plusieurs signes est énoncé quand tous sont répondus
   absents, en défaut dès que l'un est présent, ouvert sinon. */
function tousAbsents(ks){
  var v = ks.map(function(k){ return E.signes[k]; });
  return v.indexOf(POS) >= 0 ? false : v.every(function(x){ return x === NEG; }) ? true : null;
}

var NEGATIFS = [
  { k:"region", l:"Région prélevée nommée", p:"sans elle, le stade ne veut rien dire",
    ko:"région NON nommée — le stade de maturation cutanée n'est pas interprétable",
    auto:function(){ var r = E.mesure.def; return r == null ? null : r !== "nonNommee"; } },
  { k:"geste", l:"Gestes irrattrapables tracés : culture, congelé IF, ME",
    p:"culture de fibroblastes : 0 occurrence dans le corpus",
    ko:"gestes irrattrapables NON tracés — ils ne se refont pas après le fixateur",
    auto:function(){ return E.prelev.fibro && E.prelev.congeleIF && E.prelev.me ? true : null; } },
  { k:"deuxColonnes", l:"Peau fine et peau épaisse datées séparément",
    p:"le couple « peau (abdominale, plante du pied) » est ce que le service prélève",
    ko:"une seule colonne datée — le gradient fin/épais n'est pas lu",
    auto:function(){ return E.prelev.deuxBlocs ? true : null; } },
  { k:"bulleClivage", l:"Absence de bulle et de clivage sous-épidermique", p:"décollement : 0 occurrence",
    ko:"bulle ou clivage sous-épidermique PRÉSENT — non interprétable si le fœtus est macéré",
    auto:function(){ return tousAbsents(["bulle", "clivageSousEpid"]); } },
  { k:"necrose", signe:"necroseEpidermique", l:"Absence de nécrose épidermique", p:"le seul signe qui oriente vers la macération",
    ko:"nécrose épidermique PRÉSENTE — oriente vers la macération plutôt que vers une génodermatose" },
  { k:"infiltrat", signe:"infiltratDermique", l:"Absence d'infiltrat inflammatoire dermique", p:"jamais écrit dans le corpus",
    ko:"infiltrat dermique PRÉSENT" },
  { k:"viral", signe:"inclusionsVirales", l:"Absence d'inclusion virale", p:"jamais écrit dans le corpus",
    ko:"inclusion virale PRÉSENTE" },
  { k:"descripteurs", l:"Absence d'hyperkératose, de parakératose, d'hypergranulose, d'acanthose",
    p:"les quatre descripteurs manquent à foeto_terms (§ 10-E)",
    ko:"au moins un descripteur de kératinisation PRÉSENT — décrire, ne pas nommer",
    auto:function(){ return tousAbsents(["hyperkeratose", "parakeratoseFocale", "hypergranulose", "acanthose"]); } },
  { k:"annexes", l:"Présence et nombre non réduit des follicules, glandes sébacées et sudorales eccrines",
    p:"follicule pileux : 0 occurrence",
    ko:"annexes réduites ou absentes — vérifier le derme profond et la région avant de conclure",
    auto:function(){ return tousAbsents(["annexesAbsentes", "annexesReduites", "folliculesReduits",
                                         "eccrinesReduites", "sebaceesReduites"]); } },
  { k:"oedeme", signe:"oedemeDermoHypo", l:"Absence d'œdème dermo-hypodermique", p:"œdème cutané : 1 occurrence",
    ko:"œdème dermo-hypodermique PRÉSENT — anasarque ou déplacement passif post-mortem" },
  { k:"vasculaire", signe:"prolifCapillaire", l:"Absence de prolifération vasculaire", p:"hémangiome : 0 occurrence",
    ko:"prolifération vasculaire PRÉSENTE — GLUT-1 avant de nommer" },
  { k:"peridermeOrigine", l:"Origine de la desquamation énoncée : périderme physiologique ou macération",
    p:"périderme : 0 occurrence",
    ko:"desquamation non rattachée — le périderme desquame PHYSIOLOGIQUEMENT en fin de 2ᵉ trimestre",
    /* énoncée quand le périderme est déclaré vu (variante) ou la desquamation
       rattachée à la macération (signe ou borne de rétention) */
    auto:function(){
      var desq = RETENTION.some(function(r){ return /^desq/.test(r.k) && E.retention[r.k] === "present"; });
      return E.variantes.peridermeDesq || E.signes.desquamationLambeaux === POS || desq ? true : null; } }
];

/* ── 08 · Techniques ──────────────────────────────────────────────────────── */
var TECHNIQUES = [
  { k:"me",         l:"Microscopie électronique",
    q:"siège exact du clivage — kératinocytes basaux, lamina lucida, fibrilles d'ancrage" },
  { k:"ifCongele",  l:"IF sur peau congelée, avec témoin « peau normale »",
    q:"quel antigène de la JDE manque ; biopsier en BORDURE de bulle" },
  { k:"pas",        l:"PAS",
    q:"la couche spineuse est-elle encore glycogénique, donc avant 29 SA" },
  { k:"kl1",        l:"PAS et KL1",
    q:"la couche intermédiaire est-elle apparue, à partir de 12,5 SA" },
  { k:"orceine",    l:"Orcéine",
    q:"maturité du réseau élastique — immature avant 25 SA, et l'immaturité n'est pas une lésion" },
  { k:"glut1",      l:"IHC GLUT-1",
    q:"hémangiome infantile (positif) contre hémangiome congénital ou malformation (négatif)" },
  { k:"d2_40",      l:"IHC D2-40",
    q:"lymphatiques dilatés d'un hygroma [expérience]" },
  { k:"ihcVirale",  l:"IHC virale et PCR",
    q:"HSV, varicelle, CMV — un négatif sur fœtus macéré ne vaut pas exclusion" },
  { k:"cultureFibro", l:"Culture de fibroblastes sur fragment FRAIS",
    q:"caryotype, CGH-array, enzymologie — milieu non tranché entre RPMI, « tissue culture media » et sérum physiologique" },
  { k:"faldh",      l:"Dosage du FALDH sur culture de fibroblastes",
    q:"déficit de Sjögren-Larsson" },
  { k:"genetique",  l:"Génétique ciblée",
    q:"c'est elle qui NOMME : ABCA12 pour l'arlequin, COL7A1 pour la DEB, laminine 332 pour la JEB Herlitz" }
];

/* ── Propositions de techniques — déduites des clics, jamais imposées ─────── */
function suggerer(){
  var s = {};
  function vu(){ for (var i = 0; i < arguments.length; i++) if (E.signes[arguments[i]] === POS) return true; return false; }
  function ret(k){ return E.retention[k] === "present"; }
  var sa = num("sa");

  if (vu("hyperkeratose", "parakeratoseFocale", "hypergranulose", "acanthose")){ s.pas = 1; s.genetique = 1; s.faldh = 1; }
  if (vu("bulle", "clivageSousEpid", "infiltratPauvre", "clivageHaut")){ s.me = 1; s.ifCongele = 1; s.genetique = 1; }
  if (vu("inclusionsVirales", "pustules", "infiltratDermique")) s.ihcVirale = 1;
  if (vu("prolifCapillaire", "canauxDysmorphiques")) s.glut1 = 1;
  if (vu("oedemeDermoHypo", "lymphatiquesDilates")) s.d2_40 = 1;
  if (vu("peauTendue", "bebeCollodion", "arlequin")){ s.cultureFibro = 1; s.genetique = 1; }
  if (vu("eccrinesReduites", "folliculesReduits", "sebaceesReduites", "annexesReduites")) s.genetique = 1;
  if (vu("epidermeMince", "corneeAbsente")) s.pas = 1;

  /* Le PAS n'est pas d'appoint sur cet organe : c'est lui qui date le virage
     glycogénique de la couche spineuse. */
  if (sa != null && sa < 29 && !E.prelev.pas) s.pas = 1;
  if (sa != null && sa < 16) s.kl1 = 1;
  if (E.variantes.elastiqueImmat) s.orceine = 1;
  /* v1 : négatif vasculaire ou œdème EN DÉFAUT — en présence, il se lit du signe */
  if (etatNegatif(par(NEGATIFS, "vasculaire")) === "ko") s.glut1 = 1;
  if (etatNegatif(par(NEGATIFS, "oedeme")) === "ko") s.d2_40 = 1;

  /* Sur macéré, la lame ne tranchera pas le clivage : ce qui reste utile est le
     matériel qu'on n'a peut-être pas prélevé. */
  if ((ret("clivageSsInfiltrat") || ret("necroseEpidRet")) && !E.prelev.congeleIF) s.ifCongele = 1;
  if (RETENTION.some(function(r){ return E.retention[r.k] === "present"; }) && !E.prelev.fibro)
    s.cultureFibro = 1;
  return s;
}

/* ── Contrôles propres à la peau ──────────────────────────────────────────── */
async function testsOrgane(chk, clic, set, crTient, pause){
  /* Le banc commun laisse des signes posés : on part d'un état voulu. */
  function pose(k, v){ if (E.signes[k] !== v) clic("les", k, v); }
  function ote(k){ if (E.signes[k]) clic("les", k, E.signes[k]); }
  function propre(){ SIGNES.forEach(function(x){ if (!x.auto) ote(x.k); }); }
  function tenue(k){ return associations().some(function(a){ return a.d.k === k && a.tenu; }); }
  function lue(k){ return associations().some(function(a){ return a.d.k === k; }); }
  function region(k){ if (E.mesure.def !== k) clic("mdef", k); }
  function neg(k){ return etatNegatif(par(NEGATIFS, k)); }
  /* en présence, la rétention datable se choisit dans la liste */
  function retPose(k){ var sel = $("retNiveau"); sel.value = k; sel.dispatchEvent(new Event("change", {bubbles:true})); }

  /* La peau n'a pas de côté, elle a une région — et c'est la région qui bloque. */
  chk("aucune latéralité sur cet organe", PAIR === false);
  propre();
  region("nonNommee");
  chk("région non nommée : stade ininterprétable",
      crTient("ININTERPRÉTABLE") && crTient("cause d'indéterminabilité la plus fréquente"));
  chk("région non nommée : négatif en défaut", neg("region") === "ko");
  chk("région non nommée : le signe se déduit, sans bouton", E.signes.regionNonNommee === POS &&
      !document.querySelector('[data-act="les"][data-k="regionNonNommee"]'));
  pose("epidermeMince", POS);
  chk("région inconnue : le retard n'est pas interprétable", tenue("regionInconnue"));
  ote("epidermeMince");
  region("plante");
  chk("région posée", crTient("plante du pied") && crTient("peau épaisse"));
  chk("région nommée : négatif énoncé, signe déduit absent", neg("region") === "ok" && E.signes.regionNonNommee === NEG);

  /* Le plancher d'interprétabilité est CONSTRUIT, il se dit comme tel. */
  set("sa", "20");
  chk("plancher non atteint en peau épaisse", crTient("le plancher d'interprétabilité n'est pas atteint"));
  chk("le seuil est annoncé construit", crTient("Ce seuil est CONSTRUIT"));
  region("abdomen");
  chk("le plancher est plus haut en peau fine", crTient("~25 SA"));
  set("sa", "30");
  chk("au-delà du plancher, plus de réserve", !crTient("le plancher d'interprétabilité n'est pas atteint"));

  /* Un chiffre sans son normal ne vaut rien. */
  set("m_cornee", "8");
  chk("aucune norme d'épaisseur", crTient("AUCUNE NORME PUBLIÉE TROUVÉE"));
  chk("la mesure se consigne sans s'interpréter", crTient("Un chiffre sans son normal ne vaut rien"));
  set("m_cornee", "");

  /* L'échelle du service est portée telle quelle, sans borne inventée. */
  chk("aucune SA collée aux rangs du service",
      KERAT.every(function(x){ return x.l.indexOf(" SA") < 0; }));
  clic("mopt", "r3");
  chk("les rangs intermédiaires ne s'alignent pas", crTient("jugements d'expérience non sourcés"));
  clic("mopt", "r3"); clic("mopt", "r1");
  chk("le rang 1 s'aligne par le bas", crTient("18–25 SA"));
  clic("mopt", "r1");

  /* Rétention : aucun rang histologique, une échelle externe et faillible. */
  chk("peau absente de la Table 15.6",
      par(RETENTION, "basoPerdue").note.indexOf("ne figure PAS dans la Table 15.6") >= 0);
  chk("l'inversion du § 2 est annoncée comme une inférence",
      par(RETENTION, "corneeSeule").note.indexOf("INFÉRENCE") >= 0);
  retPose("desq1cm");
  chk("borne Genest lue", crTient("Rétention ≥ 6 h"));
  chk("taux d'erreur porté avec la borne", crTient("only 69 % were classified correctly"));
  chk("constats externes signalés", crTient("pas de lame"));
  chk("desquamation datée : origine énoncée", neg("peridermeOrigine") === "ok");
  retPose("");
  chk("prédicteurs mauvais hors de la liste datable",
      !$("retNiveau").querySelector('option[value="desq10pct"]') && !!document.querySelector('[data-act="ret"][data-k="desq75pct"]'));

  /* La macération et la génodermatose donnent la MÊME image : les deux s'affichent. */
  propre();
  pose("clivageSousEpid", POS); pose("infiltratPauvre", POS);
  pose("necroseEpidermique", POS);
  chk("le refus de conclure se lit", tenue("clivageNonInterpretable"));
  chk("l'épidermolyse bulleuse se lit aussi", tenue("ebSuspecte"));
  chk("le critère cell-poor ne sépare rien",
      par(SIGNES, "infiltratPauvre").meta.indexOf("ne sépare rien") >= 0);
  chk("divergence EB non tranchée", par(DIAGS, "ebSuspecte").stop.indexOf("DIVERGENCE NON tranchée") >= 0);
  chk("nécrose présente : négatif en défaut", neg("necrose") === "ko" && crTient("! nécrose épidermique PRÉSENTE"));
  /* pivot : sans le clivage sous-épidermique, l'EB ne tient pas */
  ote("clivageSousEpid"); pose("bulle", POS);
  chk("EB sans le clivage pivot ne tient pas", !tenue("ebSuspecte") && lue("ebSuspecte") &&
      crTient("signe pivot non coché : " + par(SIGNES, "clivageSousEpid").l));
  /* le niveau lu après technique entre dans l'association */
  propre();
  pose("clivageSousEpid", POS); pose("clivageLucida", POS);
  chk("niveau lu en IF/ME : l'EB tient", tenue("ebSuspecte") && suggerer().ifCongele === 1);

  /* Négatif calculé sur deux signes */
  propre();
  pose("bulle", NEG); pose("clivageSousEpid", NEG);
  chk("bulle et clivage absents → négatif énoncé", neg("bulleClivage") === "ok");
  pose("bulle", POS);
  chk("bulle présente → négatif tombé", neg("bulleClivage") === "ko");

  /* Le Non en bloc du derme répond l'œdème et la prolifération, pas les lectures d'IHC */
  propre();
  var gD = "Derme — œdème et vaisseaux", iD = groupes().indexOf(gD);
  clic("grp", iD, "non");
  chk("Non sur le derme : GLUT-1 reste à lire", !E.signes.glut1Pos && !E.signes.glut1Neg &&
      etatGroupe(gD) === "non" && neg("vasculaire") === "ok" && neg("oedeme") === "ok");
  clic("grp", iD, "non");

  /* Un lambeau n'est ni une bride ni une génodermatose. */
  propre();
  pose("lambeauDetache", POS); pose("desquamationLambeaux", POS);
  chk("le lambeau se lit comme un lambeau", tenue("lambeauPasBride"));
  chk("un lambeau ne fait pas une bride", !tenue("brideAmniotique"));
  chk("desquamation rattachée à la macération : origine énoncée", neg("peridermeOrigine") === "ok");
  propre();
  pose("sillonConstrictif", POS);
  chk("un sillon seul ne tient pas la bride", !tenue("brideAmniotique"));

  /* GLUT-1 est le pivot : sans lui, l'hémangiome ne se nomme pas. */
  propre();
  pose("prolifCapillaire", POS);
  chk("prolifération seule ne nomme pas", !tenue("hemangiomeInfantile") && lue("hemangiomeInfantile"));
  chk("prolifération : GLUT-1 proposé", suggerer().glut1 === 1);
  pose("glut1Pos", POS);
  chk("GLUT-1 positif tient l'hémangiome infantile", tenue("hemangiomeInfantile"));

  /* La dysplasie ectodermique n'a pas de dénominateur, et la région la contrefait. */
  propre();
  region("plante");
  pose("folliculesReduits", POS);
  chk("la plante est normalement sans follicule", crTient("NORMALEMENT sans follicule"));
  pose("sebaceesReduites", POS);
  chk("sans les glandes eccrines pivot, pas de dysplasie ectodermique",
      !tenue("dysplasieEctodermique") && lue("dysplasieEctodermique"));
  pose("eccrinesReduites", POS);
  chk("la dysplasie ectodermique se lit", tenue("dysplasieEctodermique"));
  chk("aucun seuil pour « marked reduction »",
      par(DIAGS, "dysplasieEctodermique").stop.indexOf("AUCUN dénominateur") >= 0);
  chk("annexes réduites : négatif en défaut", neg("annexes") === "ko");
  pose("annexesAbsentes", POS);
  chk("le prélèvement superficiel se lit en même temps", tenue("prelevementSuperficiel"));

  /* Le geste macroscopique, lui, ne demande qu'un signe. */
  propre();
  pose("peauTendue", POS);
  chk("peau tendue seule rappelle le geste", tenue("peauTendueGeste"));
  chk("aucune histologie de la dermopathie restrictive",
      par(DIAGS, "peauTendueGeste").stop.indexOf("aucune histologie") >= 0);
  chk("la culture est proposée", suggerer().cultureFibro === 1);

  /* Les quatre descripteurs : un négatif calculé */
  propre();
  ["hyperkeratose", "parakeratoseFocale", "hypergranulose", "acanthose"].forEach(function(k){ pose(k, NEG); });
  chk("quatre descripteurs absents → négatif énoncé", neg("descripteurs") === "ok");
  pose("parakeratoseFocale", POS);
  chk("un descripteur présent → négatif tombé", neg("descripteurs") === "ko");

  /* Divergences portées, jamais arbitrées. */
  chk("trois valeurs pour l'aspect adulte",
      par(STADES, "corpsEntier").note.indexOf("DIVERGENCE NON tranchée") >= 0);
  chk("divergence interne à soffoet portée",
      par(STADES, "corpsEntier").note.indexOf("Divergence INTERNE") >= 0);
  chk("l'erreur d'échelle de PEA-NOR-035 est portée",
      par(STADES, "keratPeriFoll").note.indexOf("PEA-NOR-035") >= 0);
  chk("ernst reste hors de la table principale",
      STADES.every(function(s){ return !s.note || s.note.indexOf("[ernst, ch. 34]") < 0 ||
                                       s.note.indexOf("non convertie") >= 0; }));
  chk("« ichtyose » ne se conclut pas sur la lame",
      par(DIAGS, "keratDescriptive").stop.indexOf("NE SE CONCLUT PAS") >= 0);

  /* Aucune entrée n'a été comblée là où la fiche s'arrête. */
  chk("aucune aplasie cutanée inventée",
      [SIGNES, DIAGS].every(function(t){
        return t.every(function(x){ return JSON.stringify(x).toLowerCase().indexOf("aplasie") < 0; }); }));
  chk("aucune incontinentia pigmenti inventée",
      [SIGNES, DIAGS].every(function(t){
        return t.every(function(x){ return JSON.stringify(x).toLowerCase().indexOf("incontinentia") < 0; }); }));
  chk("aucun nævus mélanocytaire inventé",
      [SIGNES, DIAGS].every(function(t){
        return t.every(function(x){ return JSON.stringify(x).toLowerCase().indexOf("naevus") < 0 &&
                                           JSON.stringify(x).toLowerCase().indexOf("nævus") < 0; }); }));
  chk("aucun grade cutané inventé",
      SIGNES.concat(DIAGS).every(function(x){ return !/grade/i.test(x.l); }));

  /* Branchement FOETO */
  chk("v2 : libellé venu de FOETO", par(SIGNES, "necroseEpidermique").l === "Nécrose épidermique associée à la bulle");
  chk("v2 : code FOETO et HPO du terme verbatim",
      codesDe(par(SIGNES, "hyperkeratose"))[0] === "FOETO:PF.PEA-MAL-076" && par(SIGNES, "hyperkeratose").hpo === "HP:0000962");
  chk("v2 : aucun signe hors fiche", SIGNES.every(function(x){ return !x.horsFiche; }));
  chk("v2.1 : clivage sous-épidermique codé depuis son verbatim (lot)", /^FOETO:/.test(par(SIGNES, "clivageSousEpid").foeto || ""));
  chk("v2 : constat de fiche sans terme porté tel quel",
      !par(SIGNES, "bebeCollodion").foeto && par(SIGNES, "bebeCollodion").fiche === "[keeling, ch. 33]");
  chk("v2 : terme maladie sur l'association", par(DIAGS, "ebSuspecte").foeto[0] === "FOETO:PF.PEA-MAL-089");
  chk("v2 : blocs lus en §02", BLOCS_LUS && !$("blocsBloc").hidden);
  propre();
  set("rqFoeto", "Acanth");
  var pk = $("sgFoeto").querySelector('[data-pick="FOETO:PF.PEA-MAL-067"]');
  if (pk) pk.click();
  chk("v2 : un terme porté par un signe pose le signe",
      !!pk && E.signes.acanthose === POS && !E.foeto["FOETO:PF.PEA-MAL-067"]);

  propre();
  region("abdomen");
}
