/* Grille de lecture — peau.
   Fond : ~/Bureau/fiches_lecture/fiche_peau.md (§1 à §9).
   Forme : gen_grille.py, calquée sur grille_poumon.html.
   Les divergences entre sources sont PORTÉES dans les champs, jamais arbitrées. */

var ORGANE  = "peau";
var TITRE   = "peau";
var SOURCE  = "fiche_peau.md";
var MODULE  = "grille_peau";
var VERSION = "1.0.0";

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

/* ── 01 · Prélèvement ─────────────────────────────────────────────────────── */
/* La peau est le seul organe dont le prélèvement principal n'est pas un bloc
   d'histologie : trois décisions se prennent à l'ouverture et aucune ne se
   rattrape ensuite. Elles sont donc en tête. */
var PRELEV = [
  { k:"fibro", l:"Fragment frais mis en culture de fibroblastes", grave:true,
    manque:"geste irrattrapable — « A skin sample should be submitted for fibroblast culture storage in " +
           "case metabolic enzyme testing is required » [keeling, ch. 31] ; le fixateur l'interdit " +
           "définitivement, et la culture n'apparaît dans AUCUN CR du service (0 occurrence)" },
  { k:"congeleIF", l:"Fragment congelé 3–4 mm pour IF", grave:true,
    manque:"geste irrattrapable — « Il est conseillé, outre le prélèvement formolé pour la MO standard, " +
           "de congeler systématiquement un fragment cutané (3 à 4 mm) pour l'IHC et d'en prévoir un " +
           "autre pour la ME. » [soffoet, ch. 12] ; sans lui le clivage d'une épidermolyse bulleuse ne " +
           "sera jamais localisé" },
  { k:"me", l:"Fragment dédié à la microscopie électronique", grave:true,
    manque:"geste irrattrapable — le siège exact du clivage (kératinocytes basaux / lamina lucida / " +
           "fibrilles d'ancrage) ne se lit qu'en ME [soffoet, ch. 12]" },
  { k:"deuxBlocs", l:"Deux blocs SÉPARÉS : peau fine et peau épaisse", grave:true,
    manque:"« peau (abdominale, plante du pied) » [corpus CR] est le couple pratiqué par le service — " +
           "deux fragments de régions différentes dans un MÊME bloc rendent la datation ininterprétable" },
  { k:"region", l:"Région nommée sur chaque bloc", grave:true,
    manque:"un stade de maturation cutanée sans région nommée ne veut rien dire (§ 04)" },
  { k:"perpendiculaire", l:"Coupe perpendiculaire au plan cutané",
    manque:"une coupe tangentielle épaissit faussement l'épiderme et simule une acanthose" },
  { k:"dermeProfond", l:"Derme profond présent sur le fragment",
    manque:"sans derme profond les annexes ne sont pas évaluables — le critère des dysplasies " +
           "ectodermiques porte sur leur nombre et leur taille" },
  { k:"epidermeTient", l:"Épiderme présent, non décollé sur toute la longueur",
    manque:"la peau cesse de dater quand l'épiderme est ABSENT du fragment, pas quand il est lysé" },
  { k:"pas", l:"PAS fait",
    manque:"le PAS est discriminant sur cet organe et pas seulement d'appoint : la couche spineuse " +
           "fœtale est glycogénique et PAS+ jusque vers 25 SA [soffoet, ch. 12]" },
  { k:"bordureBulle", l:"S'il y a une bulle : prélèvement en BORDURE",
    manque:"« Il ne faut jamais biopsier le centre de la bulle » [soffoet, ch. 12]" },
  { k:"temoin", l:"Témoin « peau normale » prévu pour l'IF",
    manque:"l'IF de la JDE ne se lit pas sans son témoin [soffoet, ch. 12]" }
];

/* ── 02 · Rétention ───────────────────────────────────────────────────────── */
/* Inversion assumée par rapport au gabarit : la peau ne figure PAS dans la
   Table 15.6, elle n'a donc aucun rang de résistance histologique sourcé. En
   revanche elle est le seul organe à porter une échelle horaire PUBLIÉE — mais
   elle est EXTERNE, macroscopique, et contestée par keeling lui-même. */
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
  { k:"necroseEpidRet", l:"Nécrose épidermique associée à la bulle", b:"—",
    d:"oriente, ne date pas", h:0, q:"mauvais",
    note:"oriente vers la macération plutôt que vers une génodermatose [soffoet, ch. 12] — c'est le " +
         "seul élément de lame qui sépare les deux, et il ne donne aucun délai" },
  { k:"basoPerdue", l:"Perte de basophilie des noyaux basaux et spineux", b:"—",
    d:"non daté pour cet organe", h:0, q:"mauvais", note:HORS_TABLE },
  { k:"corneeSeule", l:"Couche cornée conservée sur un épiderme dénucléé", b:"—",
    d:"ne prouve rien", h:0, q:"mauvais",
    note:"la couche cornée est ANUCLÉÉE : elle ne perd pas de basophilie, donc sa conservation ne dit " +
         "rien de la fraîcheur du tissu. C'est aussi pourquoi l'axe maturation survit ici à la lyse — " +
         "mais ce mécanisme est une INFERENCE de la fiche, pas une citation (§ 9-4)" },
  { k:"decollementPrema", l:"Décollement épidermique d'un grand prématuré", b:"—",
    d:"geste, pas rétention", h:0, q:"mauvais",
    note:"« The immature skin of premature babies may be easily sloughed if tangential force is applied " +
         "to the skin during or following delivery » [keeling, ch. 15] — c'est la délivrance, pas la " +
         "rétention" },
  { k:"moisissures", l:"Moisissures, activité d'insectes", b:"—",
    d:"décomposition post-délivrance", h:0, q:"mauvais",
    note:"les moisissures et l'activité d'insectes distinguent la décomposition APRÈS la délivrance de " +
         "la macération intra-utérine [keeling, ch. 15] : elles n'entrent dans aucune borne" }
];

/* ── 03 · Maturation ──────────────────────────────────────────────────────── */
/* Toute la fiche est en SA. keeling Table 33.1 est en âge CONCEPTIONNEL : la
   conversion SA = conceptionnel + 2 est appliquée et signalée rang par rang.
   ernst ch. 34 écrit « weeks gestation » quand ch. 35 écrit « postmenstrual
   age » : son échelle n'est pas établie, ses valeurs restent hors de cette
   table (§ 9-1). Les intervalles de la Table 33.1 se chevauchent ; les bornes
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
  champs:[{ id:"cornee", label:"Épaisseur de la couche cornée, peau fine (µm)", min:0, max:200, step:0.1 }]
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

  if (reg === "plante" && E.signes.folliculesReduits === "anormal")
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

/* ── 05 · Variantes normales ──────────────────────────────────────────────── */
var VARIANTES = [
  { k:"spineuseClaire",  l:"Couche spineuse claire, glycogénique, PAS+ (aspect de cellules claires)" },
  { k:"elastiqueImmat",  l:"Réseau élastique dermique immature ou raréfié à l'orcéine" },
  { k:"granuleuseAbs",   l:"Absence de couche granuleuse avant la kératinisation de la région" },
  { k:"peridermeDesq",   l:"Périderme desquamant en fin de 2ᵉ trimestre" },
  { k:"melanoSansTransf",l:"Mélanocytes présents sans transfert mélanosomal aux kératinocytes" },
  { k:"corneeMince",     l:"Couche cornée encore mince au 3ᵉ trimestre" },
  { k:"pasDeFollicule",  l:"Absence de follicule pileux en peau épaisse palmoplantaire" },
  { k:"kerato21",        l:"Absence de grains de kératohyaline avant ≈ 21 semaines (ernst, échelle non établie)" },
  { k:"vernix",          l:"Vernix caseosa — périderme desquamé, sébum et lanugo" },
  { k:"cicatrisation",   l:"Cicatrisation cutanée fœtale sans cicatrice (PEA-NOR-001, non retrouvée verbatim dans les livres)" }
];

/* ── 06 · Signes ──────────────────────────────────────────────────────────────
   On coche des SIGNES, jamais des diagnostics. Sur cet organe la frontière est
   particulièrement nette : « hyperkératose, parakératose focale, hypergranulose,
   acanthose » appartient à la micro, « ichtyose » appartient à la conclusion ET
   à la génétique [keeling, ch. 33]. Une partie des signes qui NOMMENT se lisent
   hors de la lame — ils sont marqués comme tels. Rien de coché ne veut pas dire
   absent : ça veut dire non regardé. */
var SIGNES = [
  /* Épiderme — descripteurs, jamais un nom */
  { k:"hyperkeratose",     l:"Hyperkératose",
    meta:"descripteur : « There is usually variable hyperkeratosis, focal parakeratosis, hypergranulosis and acanthosis of the epidermis in all forms »" },
  { k:"parakeratoseFocale",l:"Parakératose focale" },
  { k:"hypergranulose",    l:"Hypergranulose" },
  { k:"acanthose",         l:"Acanthose" },
  { k:"epidermeEpais",     l:"Épiderme épais, couches désorganisées",
    meta:"chercher d'abord la coupe tangentielle" },
  { k:"epidermeMince",     l:"Épiderme mince, non kératinisé au terme déclaré" },
  { k:"corneeAbsente",     l:"Couche cornée absente" },

  /* Bulles et clivage — le piège majeur de l'organe */
  { k:"bulle",             l:"Bulle" },
  { k:"clivageSousEpid",   l:"Clivage SOUS-épidermique" },
  { k:"infiltratPauvre",   l:"Infiltrat pauvre en cellules au niveau du clivage",
    meta:"« subepidermal blistering with cell-poor infiltrate » — commun à TOUS les sous-types d'EB : ce critère ne sépare rien" },
  { k:"necroseEpidermique",l:"Nécrose épidermique",
    meta:"le seul élément de lame qui oriente vers la macération plutôt que vers une génodermatose" },
  { k:"clivageHaut",       l:"Décollement épidermique HAUT, intra-épidermique" },
  { k:"decollementTotal",  l:"Épiderme décollé sur toute la longueur du fragment" },
  { k:"inclusionsVirales", l:"Inclusions virales" },
  { k:"pustules",          l:"Pustules" },
  { k:"infiltratDermique", l:"Infiltrat inflammatoire dermique",
    meta:"la lyse dégrade l'infiltrat : son absence sur macéré ne vaut pas exclusion" },

  /* Annexes — le compte des dysplasies ectodermiques */
  { k:"eccrinesReduites",  l:"Glandes sudorales eccrines réduites en nombre ou en taille" },
  { k:"folliculesReduits", l:"Follicules pileux réduits en nombre ou en taille" },
  { k:"sebaceesReduites",  l:"Glandes sébacées réduites en nombre ou en taille" },
  { k:"annexesAbsentes",   l:"Aucune annexe sur le fragment",
    meta:"prélèvement trop superficiel avant tout — pas de derme profond" },

  /* Derme, vaisseaux, lymphatiques */
  { k:"oedemeDermoHypo",   l:"Œdème du derme et de l'hypoderme" },
  { k:"lymphatiquesDilates", l:"Espaces lymphatiques dilatés" },
  { k:"prolifCapillaire",  l:"Prolifération capillaire lobulée" },
  { k:"canauxDysmorphiques", l:"Canaux vasculaires dysmorphiques SANS prolifération" },
  { k:"glut1Pos",          l:"GLUT-1 positif", meta:"lecture d'IHC, pas de HES" },
  { k:"glut1Neg",          l:"GLUT-1 négatif", meta:"lecture d'IHC, pas de HES" },

  /* Disruption */
  { k:"sillonConstrictif", l:"Sillon constrictif circonférentiel" },
  { k:"amputation",        l:"Amputation d'un segment" },
  { k:"syndactylie",       l:"Syndactylie de fusion" },
  { k:"lambeauDetache",    l:"Lambeau de peau détaché" },

  /* Lus HORS de la lame — la peau est aussi un organe macroscopique */
  { k:"peauTendue",        l:"Peau tendue et rigide", meta:"macroscopie — « evidenced by tight skin »" },
  { k:"bebeCollodion",     l:"Aspect de bébé collodion", meta:"macroscopie — forme moins sévère d'ARCI" },
  { k:"arlequin",          l:"Aspect d'arlequin", meta:"macroscopie — forme la plus sévère d'ARCI, ABCA12" },
  { k:"desquamationLambeaux", l:"Desquamation cutanée en lambeaux", meta:"macroscopie" },
  { k:"colorationBrune",   l:"Coloration brune ou ocre de la peau", meta:"macroscopie — signe de rétention" },
  { k:"amniocentese",      l:"Amniocentèse dans l'anamnèse", meta:"hors lame — l'anamnèse tranche, pas la lame" },

  /* Prélèvement et technique */
  { k:"coupeTangentielle", l:"Annexes coupées obliquement — coupe tangentielle" },
  { k:"regionNonNommee",   l:"Région du fragment non renseignée" }
];

/* ── Associations lues ────────────────────────────────────────────────────────
   Elles s'affichent, elles ne se cochent jamais. Plusieurs partagent
   délibérément leurs signes : sur cet organe, la macération et la génodermatose
   donnent la MÊME image, et le module doit les faire apparaître ensemble plutôt
   que d'en choisir une. */
var DIAGS = [
  { k:"keratDescriptive", l:"Trouble de la kératinisation — description, PAS un nom",
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

  { k:"ebSuspecte", l:"Épidermolyse bulleuse héréditaire — ce que la lame ne tranche pas",
    cle:"clivageSousEpid", min:2,
    signes:["clivageSousEpid","infiltratPauvre","bulle"],
    stop:" — ne JAMAIS écrire « épidermolyse bulleuse » sur une lame HES formolée seule, et jamais sur " +
         "un fœtus macéré. Le sous-type n'est pas un grade. DIVERGENCE NON tranchée sur la méthode, et " +
         "elle se décide AVANT l'autopsie parce qu'elle change ce qu'on prélève : soffoet maintient le " +
         "diagnostic sur IF (peau congelée, antigènes de la JDE) et ME, quand keeling le déplace vers " +
         "la génétique — « Electron microscopy is now less commonly used for diagnosis of EB… Routine " +
         "histology is not useful for the diagnosis of the EB subtypes » [keeling, ch. 33] (§ 9-11)." },

  { k:"bulleVirale", l:"Bulle d'origine infectieuse",
    cle:"inclusionsVirales", min:2,
    signes:["inclusionsVirales","bulle","infiltratDermique","pustules"],
    stop:" — une bulle n'est pas un diagnostic : « l'observation de bulles chez un fœtus fait discuter " +
         "une ichtyose bulleuse, une éruption virale à HSV (herpès, varicelle), un impétigo bulleux, " +
         "une épidermolyse staphylococcique aiguë ou des bulles par macération (nécrose épidermique) » " +
         "[soffoet, ch. 12]. Décrire le niveau, l'infiltrat, l'état de l'épiderme sus-jacent. Un " +
         "négatif viral sur fœtus macéré ne vaut pas exclusion." },

  { k:"decollementHaut", l:"Décollement épidermique haut — impétigo, épidermolyse staphylococcique",
    cle:"clivageHaut", min:2,
    signes:["clivageHaut","pustules","bulle"],
    stop:" — le niveau du décollement est ce qui sépare cette famille de l'épidermolyse bulleuse " +
         "héréditaire : haut ici, sous-épidermique là [soffoet, ch. 12]." },

  { k:"dysplasieEctodermique", l:"Dysplasie ectodermique (forme anhidrotique)",
    cle:"eccrinesReduites", min:2,
    signes:["eccrinesReduites","folliculesReduits","sebaceesReduites"],
    stop:" — le critère est « marked reduction in the number and size of eccrine glands, hair " +
         "follicles, and sebaceous glands » [keeling, ch. 33], et il n'a AUCUN dénominateur : aucune " +
         "densité normale d'annexes par terme n'est publiée dans le corpus, donc « marked » n'a pas de " +
         "seuil (§ 9-12). Deux causes de faux positif à écarter avant : un prélèvement sans derme " +
         "profond, et une région normalement dépourvue de follicules (peau épaisse palmoplantaire)." },

  { k:"prelevementSuperficiel", l:"Annexes non évaluables — prélèvement superficiel ou mauvaise région",
    cle:"annexesAbsentes", min:2,
    signes:["annexesAbsentes","eccrinesReduites","folliculesReduits","sebaceesReduites"],
    stop:" — s'affiche EN MÊME TEMPS que la dysplasie ectodermique, et c'est voulu : sans derme profond " +
         "sur le fragment, l'absence d'annexes ne dit rien de l'enfant [expérience]." },

  { k:"hemangiomeInfantile", l:"Hémangiome infantile",
    cle:"glut1Pos", min:2,
    signes:["prolifCapillaire","glut1Pos"],
    stop:" — ne pas nommer « hémangiome » sans GLUT-1 quand la distinction change la prise en charge : " +
         "GLUT-1 est positif dans l'hémangiome infantile et négatif dans l'hémangiome congénital comme " +
         "dans les malformations vasculaires [keeling, ch. 33]. Si la lésion est multiple, chercher les " +
         "localisations viscérales." },

  { k:"malformationVasculaire", l:"Hémangiome congénital ou malformation vasculaire",
    cle:"glut1Neg", min:2,
    signes:["canauxDysmorphiques","glut1Neg","prolifCapillaire"],
    stop:" — GLUT-1 négatif ne distingue PAS l'hémangiome congénital de la malformation vasculaire : " +
         "c'est la prolifération (lobulée) contre les canaux dysmorphiques sans prolifération qui les " +
         "sépare [keeling, ch. 33]." },

  { k:"oedemeAnasarque", l:"Œdème cutané d'anasarque, hygroma",
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

  { k:"brideAmniotique", l:"Bride amniotique — disruption",
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

  { k:"peauTendueGeste", l:"Peau tendue ou rigide — trois présentations macroscopiques, un seul geste",
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

/* ── 07 · Négatifs obligatoires ───────────────────────────────────────────────
   Constat mesuré d'abord : sur les 176 CR avec micro, les négatifs cutanés sont
   quasi absents — décollement 0, périderme 0, follicule pileux 0, hémangiome 0,
   œdème cutané 1, bride 1 [corpus CR]. Cette liste est donc une PROPOSITION
   issue des livres, pas un relevé de pratique. C'est un écart à assumer. */
var NEGATIFS = [
  { k:"region", l:"Région prélevée nommée", p:"sans elle, le stade ne veut rien dire",
    ko:"région NON nommée — le stade de maturation cutanée n'est pas interprétable" },
  { k:"geste", l:"Gestes irrattrapables tracés : culture, congelé IF, ME",
    p:"culture de fibroblastes : 0 occurrence dans le corpus",
    ko:"gestes irrattrapables NON tracés — ils ne se refont pas après le fixateur" },
  { k:"deuxColonnes", l:"Peau fine et peau épaisse datées séparément",
    p:"le couple « peau (abdominale, plante du pied) » est ce que le service prélève",
    ko:"une seule colonne datée — le gradient fin/épais n'est pas lu" },
  { k:"bulleClivage", l:"Absence de bulle et de clivage sous-épidermique", p:"décollement : 0 occurrence",
    ko:"bulle ou clivage sous-épidermique PRÉSENT — non interprétable si le fœtus est macéré" },
  { k:"necrose", l:"Absence de nécrose épidermique", p:"le seul signe qui oriente vers la macération",
    ko:"nécrose épidermique PRÉSENTE — oriente vers la macération plutôt que vers une génodermatose" },
  { k:"infiltrat", l:"Absence d'infiltrat inflammatoire dermique", p:"jamais écrit dans le corpus",
    ko:"infiltrat dermique PRÉSENT" },
  { k:"viral", l:"Absence d'inclusion virale", p:"jamais écrit dans le corpus",
    ko:"inclusion virale PRÉSENTE" },
  { k:"descripteurs", l:"Absence d'hyperkératose, de parakératose, d'hypergranulose, d'acanthose",
    p:"les quatre descripteurs manquent à foeto_terms (§ 10-E)",
    ko:"au moins un descripteur de kératinisation PRÉSENT — décrire, ne pas nommer" },
  { k:"annexes", l:"Présence et nombre non réduit des follicules, glandes sébacées et sudorales eccrines",
    p:"follicule pileux : 0 occurrence",
    ko:"annexes réduites ou absentes — vérifier le derme profond et la région avant de conclure" },
  { k:"oedeme", l:"Absence d'œdème dermo-hypodermique", p:"œdème cutané : 1 occurrence",
    ko:"œdème dermo-hypodermique PRÉSENT — anasarque ou déplacement passif post-mortem" },
  { k:"vasculaire", l:"Absence de prolifération vasculaire", p:"hémangiome : 0 occurrence",
    ko:"prolifération vasculaire PRÉSENTE — GLUT-1 avant de nommer" },
  { k:"peridermeOrigine", l:"Origine de la desquamation énoncée : périderme physiologique ou macération",
    p:"périderme : 0 occurrence",
    ko:"desquamation non rattachée — le périderme desquame PHYSIOLOGIQUEMENT en fin de 2ᵉ trimestre" }
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

function suggerer(){
  var s = {};
  function anormal(k){ return E.signes[k] === "anormal"; }
  function ret(k){ return E.retention[k] === "present"; }
  var sa = num("sa");

  if (anormal("hyperkeratose") || anormal("parakeratoseFocale") ||
      anormal("hypergranulose") || anormal("acanthose")){ s.pas = 1; s.genetique = 1; s.faldh = 1; }
  if (anormal("bulle") || anormal("clivageSousEpid") || anormal("infiltratPauvre") ||
      anormal("clivageHaut")){ s.me = 1; s.ifCongele = 1; s.genetique = 1; }
  if (anormal("inclusionsVirales") || anormal("pustules") || anormal("infiltratDermique")) s.ihcVirale = 1;
  if (anormal("prolifCapillaire") || anormal("canauxDysmorphiques")) s.glut1 = 1;
  if (anormal("oedemeDermoHypo") || anormal("lymphatiquesDilates")) s.d2_40 = 1;
  if (anormal("peauTendue") || anormal("bebeCollodion") || anormal("arlequin")){
    s.cultureFibro = 1; s.genetique = 1; }
  if (anormal("eccrinesReduites") || anormal("folliculesReduits") || anormal("sebaceesReduites"))
    s.genetique = 1;
  if (anormal("epidermeMince") || anormal("corneeAbsente")) s.pas = 1;

  /* Le PAS n'est pas d'appoint sur cet organe : c'est lui qui date le virage
     glycogénique de la couche spineuse. */
  if (sa != null && sa < 29 && !E.prelev.pas) s.pas = 1;
  if (sa != null && sa < 16) s.kl1 = 1;
  if (E.variantes.elastiqueImmat) s.orceine = 1;
  if (E.negatifs.vasculaire === "present") s.glut1 = 1;
  if (E.negatifs.oedeme === "present") s.d2_40 = 1;

  /* Sur macéré, la lame ne tranchera pas le clivage : ce qui reste utile est le
     matériel qu'on n'a peut-être pas prélevé. */
  if ((ret("clivageSsInfiltrat") || ret("necroseEpidRet")) && !E.prelev.congeleIF) s.ifCongele = 1;
  if (RETENTION.some(function(r){ return E.retention[r.k] === "present"; }) && !E.prelev.fibro)
    s.cultureFibro = 1;
  return s;
}

/* ── Banc propre à l'organe ───────────────────────────────────────────────── */
async function testsOrgane(chk, clic, set, crTient, pause){
  /* Le banc commun laisse des signes posés : on part d'un état voulu. */
  function pose(k, v){ if (E.signes[k] !== v) clic("les", k, v); }
  function ote(k){ if (E.signes[k]) clic("les", k, E.signes[k]); }
  function propre(){ SIGNES.forEach(function(x){ ote(x.k); }); }
  function tenue(k){ return associations().some(function(a){ return a.d.k === k && a.tenu; }); }
  function lue(k){ return associations().some(function(a){ return a.d.k === k; }); }
  function region(k){ if (E.mesure.def !== k) clic("mdef", k); }

  /* La peau n'a pas de côté, elle a une région — et c'est la région qui bloque. */
  chk("aucune latéralité sur cet organe", PAIR === false);
  propre();
  region("nonNommee");
  chk("région non nommée : stade ininterprétable",
      crTient("ININTERPRÉTABLE") && crTient("cause d'indéterminabilité la plus fréquente"));
  region("plante");
  chk("région posée", crTient("plante du pied") && crTient("peau épaisse"));

  /* Le plancher d'interprétabilité est CONSTRUIT, il se dit comme tel. */
  set("sa", "20");
  chk("plancher non atteint en peau épaisse", crTient("le plancher d'interprétabilité n'est pas atteint"));
  chk("le seuil est annoncé construit", crTient("Ce seuil est CONSTRUIT"));
  region("plante"); region("abdomen");
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
      par(RETENTION, "corneeSeule").note.indexOf("INFERENCE") >= 0);
  clic("ret", "desq1cm", "present");
  chk("borne Genest lue", crTient("Rétention ≥ 6 h"));
  chk("taux d'erreur porté avec la borne", crTient("only 69 % were classified correctly"));
  chk("constats externes signalés", crTient("pas de lame"));
  clic("ret", "desq1cm", "present");

  /* La macération et la génodermatose donnent la MÊME image : les deux s'affichent. */
  propre();
  pose("clivageSousEpid", "anormal"); pose("infiltratPauvre", "anormal");
  pose("necroseEpidermique", "anormal");
  chk("le refus de conclure se lit", tenue("clivageNonInterpretable"));
  chk("l'épidermolyse bulleuse se lit aussi", tenue("ebSuspecte"));
  chk("le critère cell-poor ne sépare rien",
      par(SIGNES, "infiltratPauvre").meta.indexOf("ne sépare rien") >= 0);
  chk("divergence EB non tranchée", par(DIAGS, "ebSuspecte").stop.indexOf("DIVERGENCE NON tranchée") >= 0);

  /* Un lambeau n'est ni une bride ni une génodermatose. */
  propre();
  pose("lambeauDetache", "anormal"); pose("desquamationLambeaux", "anormal");
  chk("le lambeau se lit comme un lambeau", tenue("lambeauPasBride"));
  chk("un lambeau ne fait pas une bride", !tenue("brideAmniotique"));
  propre();
  pose("sillonConstrictif", "anormal");
  chk("un sillon seul ne tient pas la bride", !tenue("brideAmniotique"));

  /* GLUT-1 est le pivot : sans lui, l'hémangiome ne se nomme pas. */
  propre();
  pose("prolifCapillaire", "anormal");
  chk("prolifération seule ne nomme pas", !tenue("hemangiomeInfantile") && lue("hemangiomeInfantile"));
  pose("glut1Pos", "anormal");
  chk("GLUT-1 positif tient l'hémangiome infantile", tenue("hemangiomeInfantile"));

  /* La dysplasie ectodermique n'a pas de dénominateur, et la région la contrefait. */
  propre();
  region("abdomen"); region("plante");
  pose("folliculesReduits", "anormal");
  chk("la plante est normalement sans follicule", crTient("NORMALEMENT sans follicule"));
  pose("eccrinesReduites", "anormal");
  chk("la dysplasie ectodermique se lit", tenue("dysplasieEctodermique"));
  chk("aucun seuil pour « marked reduction »",
      par(DIAGS, "dysplasieEctodermique").stop.indexOf("AUCUN dénominateur") >= 0);
  pose("annexesAbsentes", "anormal");
  chk("le prélèvement superficiel se lit en même temps", tenue("prelevementSuperficiel"));

  /* Le geste macroscopique, lui, ne demande qu'un signe. */
  propre();
  pose("peauTendue", "anormal");
  chk("peau tendue seule rappelle le geste", tenue("peauTendueGeste"));
  chk("aucune histologie de la dermopathie restrictive",
      par(DIAGS, "peauTendueGeste").stop.indexOf("aucune histologie") >= 0);
  chk("la culture est proposée", suggerer().cultureFibro === 1);

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

  propre();
  region("abdomen");
}



