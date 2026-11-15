/* Grille de lecture — foie et voies biliaires. VERSION 2 (2.0.0).
   Migration de foie.js (1.1.1) sur le patron rein v3.5 / poumon v2.1 : mode
   présence, termes FOETO fondus dans les signes et branchés (termes tagués
   verbatim), blocs lus en §02, ordre de lecture (cadres, grossissement). La v1
   reste publiée à côté tant que la v2 n'a pas été validée à l'usage.
   Ce que la v2 change, sans rien retrancher de la v1 :
   · un signe est un CONSTAT, présent / absent / non regardé (plus normal /
     anormal). Les 13 lésions v1 restent des associations, affichées, jamais
     cochées ; 8 portent leur terme maladie FOETO (fv). Une association est
     ajoutée : infection disséminée (HSV, Listeria, entérovirus), fiche § 2 et
     § 5.7, qui porte le terme FOETO de la fiche et loge l'abcès ;
   · les 25 constats de fiche_foie.md tagués dans FOETO ont chacun leur signe :
     19 signes v1 branchés, 6 signes nouveaux (abcès, calcifications
     intra-hépatiques, foyers de nécrose focale, anasarque, stéatose non typée,
     trajet anormal de la VCI). Le libellé d'un signe branché vient de FOETO ;
     ce que le libellé v1 précisait passe en meta (CD71, MPO, au trichrome) ;
   · trois signes v1 qui réunissaient plusieurs constats sont scindés :
     inflammation portale / endothéliite / hémophagocytose sinusoïdale (§ 5.8) ;
     agénésie des veines portes ou hépatiques / trajet anormal de la VCI (§ 5.12) ;
     atteinte hilaire = profil ductal persistant au hile (pivot de la MPD), et
     pour la paucité un signe propre : espaces portes hilaires sans canal (§ 5.2) ;
   · le ratio bas (< 0,4 sur ≥ 10 espaces portes) se DÉDUIT du comptage (auto) :
     il ne se clique plus, il ne peut plus contredire le compte saisi ;
   · les signes v1 sans terme FOETO tagué portent fiche:"§ …" (la section de la
     fiche qui les porte) : aucun signe n'est marqué hors fiche ;
   · les dix négatifs se DÉDUISENT : cinq d'un signe répondu absent, cinq d'une
     donnée consignée (espaces portes comptés, topographie, rétention, bile,
     voies extra-hépatiques lues) ;
   · rétention : les deux paliers de la pratique du service (perte partielle
     ≈ 24–48 h ; perte complète 96 h – 1 semaine) ne sont plus des critères
     datables — la pratique du service ne compte pas devant les livres (comme
     rein 3.1.2). Leur contenu passe dans les notes des deux paliers des livres,
     avec la règle d'arbitrage non écrite. Épithélium biliaire effacé et noyaux
     hématopoïétiques perdus disent la lisibilité, pas un délai : ils rejoignent
     les non datables (q mauvais, v1 moyen), comme tcpAbsents du rein ;
   · ordre de lecture (LECTURE) : cadres du foie (CADRES), signes du faible au
     fort grossissement (mag, [expérience], à valider à l'usage), contexte hors
     lame avant la rétention, associations en tête de la synthèse. Quatre signes
     changent de paragraphe sans changer d'association : ectasie de Caroli et
     prolifération ductulaire vers les canaux biliaires, granulomes vers
     l'infection, mégacaryocytes vers l'hématopoïèse ; fer et surcharges
     métaboliques partagent un cadre (le fer seul n'a que des signes après Perls) ;
     les voies extra-hépatiques, prélevées en bloc avec le foie, se lisent avec
     les voies biliaires ;
   · chaque variante normale vit dans le cadre qu'elle mime (fiche § 4, colonne
     Piège) et ne passe au CR qu'en parenthèse ;
   · les guillemets français sont réservés aux livres : les citations du corpus
     CR et de la base passent en “ ” ;
   · prélèvement groupé (qualifie la lecture / critères de coupe), aide au
     survol du comptage ; stops complétés depuis la fiche (asphyxie, orientations
     de la stéatose, colonisation post-mortem) ;
   · bloc:false — epargneSRE : « absent » y affirmerait du fer macrophagique.
   Fond : ~/Bureau/fiches_lecture/fiche_foie.md (§1 à §9).
   Forme : gen_grille.py, calquée sur grille_poumon.html.
   Les divergences entre sources sont PORTÉES dans les champs, jamais arbitrées. */

/* 2.1.0 (2026-11-14) — lot FOETO, propositions relues par Kimi K3.1 Pro et vérifiées par script
   (verbatim mot pour mot dans la fiche) : 4 fenêtre(s) de terme — le « Non » en bloc ne répond plus
   un signe daté hors de sa fenêtre (seul : un par un) ; 11 code(s) FOETO existant(s) branché(s)
   (variantes, rétention, stades, mesures, associations) ; 2 code(s) créé(s) depuis le verbatim de la
   fiche. Les propositions jugées faibles ou fausses attendent le tri de Rémi. */
/* 2.1.1 (2026-11-15) — tri des propositions du lot jugées faibles ou fausses par Kimi, relues sur la
   fiche et vérifiées par script : 2 fenêtre(s) de terme, 0 code(s) créé(s), 2 branché(s) sur un
   code existant ; 0 proposition(s) rejetée(s) (le signe garde son comportement). */
var ORGANE  = "foie";
var TITRE   = "foie et voies biliaires";
var SOURCE  = "fiche_foie.md";
var MODULE  = "grille_foie";
var VERSION = "2.1.1";
var SCHEMA  = "0.3.0";   /* 0.3.0 : signes present/absent, négatifs déduits */
var ETATS   = "presence";
var FOETO_DANS_SIGNES = true;
var PAIR    = false;
var BLOCS   = true;
var LECTURE = true;   /* cadres (CADRES), grossissement (mag), variantes dans leur cadre */

var TITRE_CR    = "FOIE";
var STADE_TITRE = "Érythropoïèse sinusoïdale (horloge décroissante)";

var KCL_TXT = "Fœticide par KCl déclaré — la perte de basophilie induite par le geste ne se distingue " +
              "pas de celle de la rétention. Aucune borne n'est recevable.";

/* Le foie ne date pas le fœtus : il date sa rétention. */
var RETARD_NOTE = "Aucune des trois horloges hépatiques ne borne mieux que ± 4 SA. Ne pas rendre un " +
                  "terme sur le foie quand le poumon ou le rein sont disponibles.";
var AVANCE_NOTE = "Une érythropoïèse plus éteinte qu'attendue peut n'être que la perte des noyaux " +
                  "hématopoïétiques par macération, pas une donnée du fœtus. " +
                  "Le foie ne date pas le fœtus : il date sa rétention.";

var TECH_NOTE = "Les quatre dernières lignes sont hors de la lame : c'est en lisant la lame qu'on " +
                "découvre qu'il aurait fallu prélever, et il est alors trop tard. Réticuline, orcéine " +
                "et rouge Sirius sont absentes du corpus du service, mais aucune source ouverte ne les " +
                "recommande pour le foie fœtal : l'absence peut être un alignement correct, pas un manque. " +
                "Les pointillés sont des propositions déduites des clics, jamais des prescriptions.";

/* ── 02 · Prélèvement ─────────────────────────────────────────────────────── */
var PRELEV = [
  { k:"epaisseur", g:"Qualifie la lecture", l:"Toute l'épaisseur du parenchyme, du hile à la périphérie", grave:true,
    manque:"le gradient de maturation biliaire est hile→périphérie ; un prélèvement périphérique seul " +
           "fait conclure à tort à une paucité [keeling, ch. 23]" },
  { k:"pasSousCapsulaire", g:"Qualifie la lecture", l:"Prélèvement non parallèle à la capsule", grave:true,
    manque:"un prélèvement superficiel ne ramène que du sous-capsulaire, sans espace porte évaluable — " +
           "le CR du service l'observe lui-même : “3 fragments de parenchyme hépatique sous-capsulaire”" },
  { k:"dixEP", g:"Qualifie la lecture", l:"Au moins 10 espaces portes évaluables", grave:true,
    manque:"seuil explicite du comptage canal/espace porte [keeling, ch. 23] — sans lui, ni la paucité " +
           "ni son absence ne se concluent" },
  { k:"hile", g:"Qualifie la lecture", l:"Région hilaire présente sur la coupe",
    manque:"au hile le remodelage est achevé bien avant le terme : c'est la topographie qui sépare " +
           "l'immaturité de la paucité vraie" },
  { k:"deuxLobes", g:"Critères de coupe — iront à la grille macro fixée", l:"Les deux lobes échantillonnés",
    manque:"les malformations de plaque ductale peuvent être segmentaires [soffoet, ch. 7]" },
  { k:"vbeh", g:"Critères de coupe — iront à la grille macro fixée", l:"Voies biliaires extra-hépatiques et vésicule en bloc",
    manque:"l'oblitération est extra-hépatique ; le foie seul ne tranche pas l'atrésie [keeling, ch. 23]" },
  { k:"congele", g:"Critères de coupe — iront à la grille macro fixée", l:"Fragment de foie congelé",
    manque:"la paraffine dissout les lipides et ferme le diagnostic métabolique — « Fresh/frozen liver " +
           "and muscle assays » [keeling, ch. 11]" },
  { k:"peauCulture", g:"Critères de coupe — iront à la grille macro fixée", l:"Biopsie de peau en milieu de culture",
    manque:"« trying to establish fibroblast growth from the decedent is a priority » [keeling, ch. 11]" },
  { k:"autresViscere", g:"Critères de coupe — iront à la grille macro fixée", l:"Cœur, thyroïde, pancréas, glandes salivaires disponibles pour Perls",
    manque:"le critère qui fait le diagnostic de GALD n'est pas dans le foie" }
];

/* ── 03 · Rétention — le foie porte DEUX paliers, séparés par ~72 h ─────────
   v2 : seuls les paliers des livres sont datables. La gradation partielle /
   complète du service reste écrite dans les notes : elle dit ce que le service
   écrit, elle ne date pas. L'épithélium biliaire et les noyaux hématopoïétiques
   disent la lisibilité : ils se signalent avec les non datables. */
var MODIF = "horloge accélérée par l'anasarque et par un intervalle délivrance-autopsie > 24 h, " +
            "ralentie par un terme < 25 SA — « Development of these features accelerated by fetal " +
            "hydrops and delivery-autopsy interval of > 24 h, and decelerated by fetal gestational " +
            "age < 25/40 » [keeling, ch. 15, Table 15.6]";

var RETENTION = [
  { k:"basoIsoles", l:"Perte de basophilie de quelques hépatocytes isolés", b:"≥ 24 h",
    d:"« Individual cells in liver »", h:24, q:"bon", alerte:MODIF,
    note:"la base porte une entrée concurrente à 4—12 h, sans source et sans description ; les livres " +
         "et la pratique du service donnent tous ≥ 24 h — trois valeurs, une seule sourcée. " +
         "Le palier 4–24 h appartient au REIN, pas au foie. Le service gradue ce palier en perte " +
         "hépatocytaire partielle, ≈ 24–48 h (pratique du service, que la base ne porte pas : elle ne " +
         "compte pas devant les livres et ne date pas ici)" },
  { k:"basoTous", l:"Perte de basophilie de TOUS les hépatocytes", b:"≥ 96 h",
    d:"« All cells in the liver »", h:96, q:"bon", alerte:MODIF,
    note:"le rattachement de la ligne orpheline « Maximal ≥ 96 h » d'ernst au foie s'appuie sur " +
         "l'alignement des deux tables ; elles n'ont pas le même nombre de lignes (9 contre 10) — " +
         "l'alignement est CONCORDANT sur trois sources, pas démontré ligne à ligne. Le service écrit " +
         "perte complète avec persistance dans le tube digestif, 96 h – 1 semaine (pratique du service, " +
         "ne date pas ici). Le foie n'est jamais lu seul : il s'encadre d'un organe plus rapide (tubes " +
         "rénaux) et d'un plus lent (tube digestif, surrénale). La règle d'arbitrage quand les deux " +
         "divergent n'est écrite nulle part" },
  { k:"epithBiliaire", fv:"FOETO:PF.FOI-NOR-027", l:"Épithélium biliaire effacé", b:"—", d:"le premier perdu", h:0, q:"mauvais",
    note:"« Biliary epithelium is lost quickly with maceration, so assessment of bile duct development " +
         "could be hindered » [ernst, ch. 37] — une paucité biliaire ne se conclut pas sur foie macéré. " +
         "Indicateur de lisibilité (v1 : prédicteur moyen), pas un délai" },
  { k:"noyauxHemato", fv:"FOETO:PF.FOI-NOR-028", l:"Noyaux hématopoïétiques perdus", b:"—", d:"perdus avec ceux des hépatocytes",
    h:0, q:"mauvais",
    note:"une hématopoïèse “effondrée” sur macéré est un artefact, pas une anémie ni une aplasie. " +
         "Indicateur de lisibilité (v1 : prédicteur moyen), pas un délai" },
  { k:"archTrichrome", l:"Architecture conservée au trichrome", b:"—", d:"indicateur de lisibilité",
    h:0, q:"mauvais",
    note:"« Trichrome can be helpful to determine if the structure of the liver is normal or abnormal » " +
         "[ernst, ch. 37] — l'architecture tombe en dernier et reste rattrapable" },
  { k:"calcifDystro", fv:"FOETO:PF.FOI-NOR-017", l:"Calcifications dystrophiques", b:"—", d:"non datable", h:0, q:"mauvais",
    note:"« Dystrophic calcification may develop in autolysed liver tissue » [keeling, ch. 15] — " +
         "ne pas y lire une infection, une tumeur ou une thrombose. Le constat lui-même est aussi un " +
         "signe (cadre Infection et inflammation)" },
  { k:"debrisGranulaires", fv:"FOETO:PF.FOI-NOR-020", l:"Débris granulaires", b:"—", d:"non datable", h:0, q:"mauvais",
    note:"« Degeneration of soft tissues results in granular debris which may be mistaken for " +
         "bacterial colonisation » [keeling, ch. 15]" }
];

/* ── 04 · Maturation — l'érythropoïèse sinusoïdale décroît de 24 à 36 SA ──── */
var STADES = [
  { k:"erythroMax", l:"Érythropoïèse sinusoïdale maximale", max:24,
    note:"maximale au 2ᵉ trimestre [ernst, ch. 5] ; la myélopoïèse portale est parallèlement active " +
         "de 20 à 32 SA — un excès à 24 SA et à 38 SA ne sont pas la même donnée" },
  { k:"erythroDecroit", l:"Érythropoïèse en décroissance", max:36,
    note:"l'hémosidérose périportale croît en miroir : elle est la conséquence de l'extinction de " +
         "l'érythropoïèse, pas une surcharge" },
  { k:"erythroResiduelle", l:"Îlots résiduels d'érythropoïèse", max:99,
    note:"le remodelage de la plaque ductale n'est PAS achevé au terme en périphérie — l'anneau " +
         "ductal périphérique persistant reste normal" }
];

/* ── 04 bis · Comptage canal biliaire / espace porte ──────────────────────── */
/* La seule mesure chiffrée solide de la fiche. Le compte s'entre nu ; déclarer
   la topographie et la technique est l'interprétation, elle vient après. */
var MESURE = {
  titre:"Comptage canal biliaire / espace porte",
  defLabel:"topographie du comptage",
  optLabel:"technique du comptage",
  aide:"Ratio canal biliaire / espace porte, sur au moins 10 espaces portes évaluables [keeling, ch. 23], " +
       "hile et périphérie comptés séparément : les espaces portes périphériques sont les derniers " +
       "remodelés, une paucité apparente y est attendue chez le prématuré et jusqu'au terme. Normale " +
       "0,9–1,8 chez le nouveau-né à terme, paucité si < 0,4 — barèmes néonatals, aucune valeur par âge " +
       "gestationnel dans les sources ouvertes. CK7/CK19 : un canal effacé en HES peut rester marqué. " +
       "Sur foie macéré l'épithélium biliaire tombe le premier : le compte n'est pas recevable.",
  defs:[{ k:"hile",       l:"Hile inclus",
          aide:"au hile le remodelage est achevé bien avant le terme : c'est la topographie qui sépare " +
               "l'immaturité de la paucité vraie" },
        { k:"peripherie", l:"Périphérie seule",
          aide:"faux positif documenté : les espaces portes périphériques sont les derniers remodelés " +
               "[keeling, ch. 23]" }],
  opts:[{ k:"hes", l:"HES seul" },
        { k:"ck",  l:"CK7 / CK19" }],
  champs:[{ id:"ep",    fv:"FOETO:PF.FOI-NOR-015", label:"Espaces portes évaluables", min:0, max:100, step:1 },
          { id:"ratio", label:"Ratio canal / espace porte", min:0, max:3, step:0.1 }]
};

function verdictMesure(){
  var ep = E.mesure.v.ep, r = E.mesure.v.ratio, sa = num("sa");
  if (ep == null && r == null) return { cls:"",
    txt:"Comptage non fait — sans nombre d'espaces portes évaluables, toute mention de paucité ou " +
        "d'absence de paucité est ininterprétable. C'est le négatif que le service n'écrit jamais." };

  var t = "", cls = "ok", res = [];
  if (ep != null){
    t += ep + " espace(s) porte(s) évaluable(s).";
    if (ep < 10){ cls = "bad";
      t += " Le seuil de 10 exigé par [keeling, ch. 23] n'est pas atteint : ni la paucité ni son " +
           "absence ne se concluent."; }
  } else { cls = "warn"; res.push("nombre d'espaces portes évaluables non compté"); }

  if (r != null){
    t += " Ratio canal/espace porte = " + r + ".";
    if (r < 0.4){ if (cls !== "bad") cls = "bad";
      t += " Sous le seuil de paucité (0,4)."; }
    else if (r < 0.9){ if (cls === "ok") cls = "warn";
      t += " Entre le seuil de paucité (0,4) et la borne basse du normal (0,9) — zone que les sources " +
           "ne qualifient pas."; }
    else if (r <= 1.8){ t += " Dans l'intervalle normal (0,9–1,8)."; }
    else { if (cls === "ok") cls = "warn"; t += " Au-dessus de l'intervalle normal (0,9–1,8)."; }
    /* La borne est néonatale et la fiche ne sait pas ce qu'elle vaut à 22 SA. */
    t += " Réserve de barème : l'intervalle 0,9–1,8 et le seuil de 0,4 sont NÉONATALS ; aucune valeur " +
         "normale du ratio par âge gestationnel n'existe dans les sources ouvertes.";
    if (sa != null && sa < 30)
      res.push("barème néonatal appliqué à un fœtus de " + sa + " SA — la fiche ne sait pas ce qu'est " +
               "un ratio normal à ce terme, qui est pourtant le terme médian du service");
  }

  if (!E.mesure.def) res.push("topographie du comptage non déclarée — hile et périphérie ne se comptent pas ensemble");
  else if (E.mesure.def === "peripherie")
    res.push("comptage en périphérie seule : faux positif documenté — « as the most peripheral portal " +
             "tracts are the last to undergo ductal plate remodeling an apparent paucity may be seen in " +
             "biopsies from premature neonates or even close to term » [keeling, ch. 23]");
  if (!E.mesure.opt) res.push("technique du comptage non déclarée");
  else if (E.mesure.opt === "hes")
    res.push("HES seul : un canal effacé en HES peut rester marqué en CK7/CK19");
  if (E.retention.epithBiliaire === "present")
    res.push("épithélium biliaire effacé par la macération — le comptage n'est pas recevable");
  if (!E.prelev.dixEP) res.push("les 10 espaces portes ne sont pas confirmés au prélèvement");

  if (res.length){ if (cls === "ok") cls = "warn"; t += " Réserves : " + res.join(" ; ") + "."; }
  return { cls:cls, txt:t };
}

/* ── Variantes normales — chacune dans le cadre qu'elle mime (fiche § 4) ──── */
var VARIANTES = [
  { k:"travees",      g:"Architecture et fibrose",           l:"Travées hépatocytaires épaisses, pluristratifiées" },
  { k:"epFetal",      fv:"FOETO:PF.FOI-NOR-022", g:"Architecture et fibrose",           l:"Espace porte fœtal lâche et mésenchymateux" },
  { k:"plaqueDuct",   fv:"FOETO:PF.FOI-NOR-029", g:"Plaque ductale et canaux biliaires", l:"Plaque ductale périphérique encore présente au terme" },
  { k:"bileFine",     g:"Cholestase",                         l:"Immaturité physiologique de la sécrétion biliaire" },
  { k:"bessis",       fv:"FOETO:PF.FOI-NOR-021", g:"Infection et inflammation",          l:"Îlots de Bessis, érythropoïèse sinusoïdale" },
  { k:"myelo",        fv:"FOETO:PF.FOI-NOR-026", g:"Infection et inflammation",          l:"Myélopoïèse portale dans et autour des espaces portes" },
  { k:"glycogene",    fv:"FOETO:PF.FOI-NOR-023", g:"Stéatose",                           l:"Glycogénisation hépatocytaire, cytoplasme clair" },
  { k:"hemosiderose", g:"Surcharges — fer et métaboliques",   l:"Hémosidérose périportale croissant avec le terme" },
  { k:"cuivre",       fv:"FOETO:PF.FOI-NOR-019", g:"Surcharges — fer et métaboliques",   l:"Protéine associée au cuivre périportale néonatale physiologique" }
];

/* ── Cadres — dans l'ordre où on lit la lame ──────────────────────────────── */
var CADRES = [
  { g:"Contexte hors lame — macro, autres viscères, clinique", hors:true },
  { g:"Architecture et fibrose", sur:"Architecture" },
  { g:"Nécrose et lésions circulatoires", sur:"Architecture" },
  { g:"Plaque ductale et canaux biliaires", sur:"Voies biliaires" },
  { g:"Voies biliaires extra-hépatiques", sur:"Voies biliaires" },
  { g:"Cholestase", sur:"Voies biliaires" },
  { g:"Hématopoïèse", sur:"Hématopoïèse et inflammation" },
  { g:"Infection et inflammation", sur:"Hématopoïèse et inflammation" },
  { g:"Stéatose", sur:"Hépatocytes" },
  { g:"Surcharges — fer et métaboliques", sur:"Hépatocytes" },
  { g:"Hétérotopies et lésions rares" }
];

/* ── Signes ───────────────────────────────────────────────────────────────────
   On coche ce qu'on voit, un signe à la fois. Aucun nom de maladie ici : les
   noms se lisent dans DIAGS, par association des signes cochés. Un signe branché
   (fv) prend son libellé et son HPO dans FOETO ; un l à côté d'un fv n'est que le
   libellé de repli. Les exigences de consignation (compter ≥ 10 EP, nommer la
   lignée, préciser la zonation) ne sont pas des signes : elles vivent dans les
   négatifs et dans les avertissements des associations. */
var SIGNES = [
  /* — Contexte hors lame — macro, autres viscères, clinique — */
  { k:"anasarque", fv:"FOETO:PF.FOI-MAL-060", g:"Contexte hors lame — macro, autres viscères, clinique",
    meta:"accélère l'horloge de rétention ; fait chercher l'agénésie du ductus venosus, des veines portes ou hépatiques, un trajet anormal de la VCI" },
  { k:"situs", fiche:"§ 5.3", g:"Contexte hors lame — macro, autres viscères, clinique", l:"Contexte syndromique (situs, polysplénie)" },
  { k:"ferExtraHep", fiche:"§ 5.5", g:"Contexte hors lame — macro, autres viscères, clinique",
    l:"Dépôts de fer extra-hépatiques parenchymateux (cœur, thyroïde, pancréas, salivaires)",
    meta:"le critère du GALD n'est pas dans le foie" },
  { k:"ductusVenosus", fv:"FOETO:PF.FOI-MAL-059", g:"Contexte hors lame — macro, autres viscères, clinique", l:"Agénésie du ductus venosus" },
  { k:"agenesieVeines", fv:"FOETO:PF.FOI-VAS-001", g:"Contexte hors lame — macro, autres viscères, clinique",
    meta:"v1 : réuni avec le trajet anormal de la VCI" },
  { k:"trajetVCI", fv:"FOETO:PF.FOI-VAS-003", g:"Contexte hors lame — macro, autres viscères, clinique" },
  { k:"shuntAbernethy", fiche:"§ 5.12", g:"Contexte hors lame — macro, autres viscères, clinique", l:"Shunt porto-systémique congénital (Abernethy)" },
  /* — Architecture et fibrose — */
  { k:"cirrhose", fiche:"§ 5.11", g:"Architecture et fibrose", mag:"faible", l:"Nodules de régénération, cirrhose" },
  { k:"pontsPortoPortaux", fiche:"§ 5.11", g:"Architecture et fibrose", mag:"faible", l:"Ponts fibreux porto-portaux" },
  { k:"fibroseDissequante", fiche:"§ 5.11", g:"Architecture et fibrose", mag:"moyen", l:"Fibrose lobulaire disséquante",
    meta:"critère d'exclusion du GALD" },
  { k:"fibrosePeriDuctale", fiche:"§ 5.11", g:"Architecture et fibrose", mag:"moyen", l:"Fibrose péri-ductale en manchon" },
  { k:"fibrosePeriveineuse", fiche:"§ 5.11", g:"Architecture et fibrose", mag:"moyen", l:"Fibrose périveineuse" },
  { k:"fibrosePortale", fv:"FOETO:PF.FOI-MAL-062", g:"Architecture et fibrose", mag:"technique", l:"Fibrose portale au trichrome",
    meta:"au trichrome : l'espace porte fœtal est normalement lâche, fibreux en HES seul n'est pas une donnée" },
  { k:"fibrosePericell", fiche:"§ 5.11", g:"Architecture et fibrose", mag:"technique", l:"Fibrose péricellulaire ou périsinusoïdale" },
  /* — Nécrose et lésions circulatoires — */
  { k:"necroseFocale", fv:"FOETO:PF.FOI-MAL-027", g:"Nécrose et lésions circulatoires", mag:"faible" },
  { k:"necrosePeriveineuse", fv:"FOETO:PF.FOI-VAS-002", g:"Nécrose et lésions circulatoires", mag:"faible", l:"Nécrose périveineuse hémorragique" },
  { k:"emportePiece", fiche:"§ 5.7", g:"Nécrose et lésions circulatoires", mag:"faible", l:"Distribution aléatoire à emporte-pièce" },
  { k:"hematomeSC", fiche:"§ 5.12", g:"Nécrose et lésions circulatoires", mag:"faible", l:"Hématome sous-capsulaire" },
  { k:"cavernome", fiche:"§ 5.12", g:"Nécrose et lésions circulatoires", mag:"faible", l:"Cavernome portal" },
  { k:"foyersBordureNette", fv:"FOETO:PF.FOI-MAL-066", g:"Nécrose et lésions circulatoires", mag:"moyen", l:"Foyers focaux à bordure nette",
    meta:"le contraste local, pas l'état de la cellule" },
  { k:"reactionCellulaire", fv:"FOETO:PF.FOI-MAL-080", fiche:"§ 5.7", g:"Nécrose et lésions circulatoires", mag:"moyen", l:"Réaction cellulaire en regard des foyers",
    meta:"comprise dans le terme FOETO du pivot quand bordure et réaction coexistent" },
  { k:"thrombiFibrineux", fiche:"§ 5.12", g:"Nécrose et lésions circulatoires", mag:"moyen", l:"Thrombi fibrineux intravasculaires" },
  /* — Plaque ductale et canaux biliaires — */
  { k:"ectasieCaroli", fiche:"§ 5.13", g:"Plaque ductale et canaux biliaires", mag:"faible", l:"Ectasie ductale de type Caroli" },
  { k:"profilDuctal", seul:true, fv:"FOETO:PF.FOI-MAL-067", g:"Plaque ductale et canaux biliaires", mag:"moyen",
    l:"Profil ductal circonférentiel persistant en couronne autour de l'espace porte" },
  { k:"atteinteHilaire", fv:"FOETO:PF.FOI-MAL-064", g:"Plaque ductale et canaux biliaires", mag:"moyen", l:"Atteinte des espaces portes HILAIRES",
    meta:"le critère qui sépare l'immaturité périphérique de la lésion" },
  { k:"canauxAnastomoses", fiche:"§ 5.1", g:"Plaque ductale et canaux biliaires", mag:"moyen", l:"Canaux dilatés et anastomosés" },
  { k:"proliferationDuctulaire", fiche:"§ 5.11", g:"Plaque ductale et canaux biliaires", mag:"moyen", l:"Prolifération ductulaire" },
  { k:"canauxAbsentsHile", seul:true, fiche:"§ 5.2", g:"Plaque ductale et canaux biliaires", mag:"moyen", l:"Espaces portes hilaires dépourvus de canal biliaire",
    meta:"au hile le remodelage est achevé bien avant le terme : l'immaturité est écartée par la topographie" },
  { k:"ratioBas", fv:"FOETO:PF.FOI-DYS-001", seul:true, fiche:"§ 5.2", g:"Plaque ductale et canaux biliaires", mag:"moyen", l:"Ratio canal / espace porte < 0,4 sur ≥ 10 espaces portes",
    meta:"déduit du comptage : rien sous 10 espaces portes ni sur épithélium biliaire effacé",
    auto:function(){
      var r = E.mesure.v.ratio, ep = E.mesure.v.ep;
      if (r == null || ep == null || ep < 10 || E.retention.epithBiliaire === "present") return null;
      return r < 0.4; } },
  { k:"ckConfirme", fv:"FOETO:PF.FOI-DYS-001", fiche:"§ 5.2", g:"Plaque ductale et canaux biliaires", mag:"technique", l:"Raréfaction confirmée en CK7 / CK19" },
  /* — Voies biliaires extra-hépatiques (prélevées en bloc avec le foie) — */
  { k:"obliterationVBEH", fv:"FOETO:PF.FOI-MAL-047", g:"Voies biliaires extra-hépatiques", mag:"faible",
    l:"Oblitération fibreuse du canal extra-hépatique" },
  { k:"lumiereResiduelle", fiche:"§ 5.3", g:"Voies biliaires extra-hépatiques", mag:"moyen", l:"Lumière résiduelle réduite, calibre mesuré" },
  { k:"epithResiduel", fiche:"§ 5.3", g:"Voies biliaires extra-hépatiques", mag:"moyen", l:"Épithélium résiduel altéré ou absent" },
  /* — Cholestase — */
  { k:"bouchonsDuctul", fiche:"§ 5.4", g:"Cholestase", mag:"moyen", l:"Bouchons biliaires ductulaires" },
  { k:"pseudoglandulaire", fiche:"§ 5.4", g:"Cholestase", mag:"moyen", l:"Forme pseudoglandulaire / rosettoïde" },
  { k:"bouchonsCanalic", fiche:"§ 5.4", g:"Cholestase", mag:"fort", l:"Bouchons biliaires canaliculaires" },
  { k:"cholestaseHepato", fiche:"§ 5.4", g:"Cholestase", mag:"fort", l:"Cholestase hépatocytaire" },
  /* — Hématopoïèse — */
  { k:"erythroAugmentee", seul:true, fv:"FOETO:PF.FOI-MET-006", g:"Hématopoïèse", mag:"moyen", l:"Érythropoïèse sinusoïdale augmentée (CD71)",
    meta:"lignée confirmée en CD71" },
  { k:"myeloAugmentee", seul:true, fv:"FOETO:PF.FOI-MAL-065", g:"Hématopoïèse", mag:"moyen", l:"Myélopoïèse portale augmentée (MPO)",
    meta:"lignée confirmée en MPO" },
  { k:"erythroDiminuee", terme:[null, 24], fv:"FOETO:PF.FOI-MAL-061", g:"Hématopoïèse", mag:"moyen", l:"Érythropoïèse diminuée" },
  { k:"megacaryocytes", fiche:"§ 5.13", g:"Hématopoïèse", mag:"moyen", l:"Mégacaryocytes en excès" },
  /* — Infection et inflammation — */
  { k:"abces", fv:"FOETO:PF.FOI-INF-002", g:"Infection et inflammation", mag:"faible",
    meta:"reste identifiable sur foie sévèrement autolysé" },
  { k:"calcifications", fv:"FOETO:PF.FOI-MAL-004", g:"Infection et inflammation", mag:"faible",
    meta:"se forment aussi dans le foie autolysé : seules, ce n'est pas une infection" },
  { k:"granulomes", fiche:"§ 5.13", g:"Infection et inflammation", mag:"moyen", l:"Granulomes caséeux" },
  { k:"inflamPortale", fv:"FOETO:PF.FOI-MAL-037", g:"Infection et inflammation", mag:"moyen", l:"Inflammation portale",
    meta:"v1 : réunie avec l'endothéliite et l'hémophagocytose sinusoïdale" },
  { k:"geantocellulaire", fv:"FOETO:PF.FOI-MAL-068", g:"Infection et inflammation", mag:"moyen", l:"Transformation géantocellulaire",
    meta:"réponse stéréotypée du foie fœtal, pas une signature" },
  { k:"endotheliite", fiche:"§ 5.8", g:"Infection et inflammation", mag:"fort", l:"Endothéliite" },
  { k:"hemophagocytose", fiche:"§ 5.8", g:"Infection et inflammation", mag:"fort", l:"Hémophagocytose sinusoïdale" },
  { k:"oeilDeHibou", fv:"FOETO:PF.FOI-MAL-063", g:"Infection et inflammation", mag:"fort", l:"Inclusions intranucléaires en œil-de-hibou",
    meta:"survit à la macération" },
  { k:"inclusionsCytopl", fv:"FOETO:PF.FOI-INF-006", fiche:"§ 5.8", g:"Infection et inflammation", mag:"fort", l:"Inclusions cytoplasmiques",
    meta:"comprises dans le terme FOETO de l'œil-de-hibou quand les deux sont vues" },
  { k:"cytomegaliqueBiliaire", fv:"FOETO:PF.FOI-MAL-009", g:"Infection et inflammation", mag:"fort", l:"Cellules cytomégaliques dans les canaux biliaires" },
  /* — Stéatose — */
  { k:"steatoseNonTypee", fv:"FOETO:PF.FOI-MET-007", g:"Stéatose", mag:"faible",
    meta:"topographie et calibre : ce sont eux, et eux seuls, qui orientent" },
  { k:"steatoseMassive", fv:"FOETO:PF.FOI-MET-008", g:"Stéatose", mag:"faible", l:"Stéatose dominante ou massive" },
  { k:"steatosePanlobulaire", fiche:"§ 5.10", g:"Stéatose", mag:"faible", l:"Stéatose panlobulaire" },
  { k:"steatosePeriportale", fv:"FOETO:PF.FOI-MET-010", g:"Stéatose", mag:"faible", l:"Stéatose périportale" },
  { k:"steatoseMicro", fv:"FOETO:PF.FOI-MET-009", g:"Stéatose", mag:"fort", l:"Stéatose microvésiculaire" },
  /* — Surcharges — fer et métaboliques — */
  { k:"ballooning", fiche:"§ 5.9", g:"Surcharges — fer et métaboliques", mag:"moyen", l:"Ballooning hépatocytaire" },
  { k:"verreDepoli", fiche:"§ 5.9", g:"Surcharges — fer et métaboliques", mag:"fort", l:"Inclusions en verre dépoli / corps polyglucosaniques" },
  { k:"amylopectine", fiche:"§ 5.9", g:"Surcharges — fer et métaboliques", mag:"fort", l:"Matériel amylopectine-like" },
  { k:"globulesDPAS", fv:"FOETO:PF.FOI-MAL-035", g:"Surcharges — fer et métaboliques", mag:"technique", l:"Inclusions DPAS+ en globules" },
  { k:"microvesiculationDPAS", fiche:"§ 5.9", g:"Surcharges — fer et métaboliques", mag:"technique", l:"Microvésiculation DPAS+" },
  { k:"macrophagesDPAS", fiche:"§ 5.9", g:"Surcharges — fer et métaboliques", mag:"technique", l:"Macrophages DPAS+" },
  { k:"perlsHepatoDuctul", fiche:"§ 5.5", g:"Surcharges — fer et métaboliques", mag:"technique",
    l:"Dépôts Perls+ massifs dans les hépatocytes ET les cellules ductulaires" },
  { k:"predominanceParench", fiche:"§ 5.5", g:"Surcharges — fer et métaboliques", mag:"technique",
    l:"Prédominance parenchymateuse nette sur les dépôts macrophagiques" },
  { k:"epargneSRE", bloc:false, fiche:"§ 5.5", g:"Surcharges — fer et métaboliques", mag:"technique",
    l:"Épargne du système réticulo-endothélial" },
  /* — Hétérotopies et lésions rares — */
  { k:"kysteForegut", fiche:"§ 5.13", g:"Hétérotopies et lésions rares", mag:"faible", l:"Kyste cilié d'origine foregut, kyste cholédoque" },
  { k:"pancreasEctopique", fiche:"§ 5.13", g:"Hétérotopies et lésions rares", mag:"moyen", l:"Tissu pancréatique ectopique périductal" },
  { k:"cartilagePeriductal", fiche:"§ 5.13", g:"Hétérotopies et lésions rares", mag:"moyen", l:"Cartilage hyalin périductal" }
];

/* ── Associations — affichées, jamais cochées ─────────────────────────────────
   Le nom se déduit des signes. « cle » est le signe pivot : sans lui le compte
   peut être atteint sans que l'association tienne. */
var DIAGS = [
  { k:"mpd", l:"Malformation de la plaque ductale / fibrose hépatique congénitale", fv:"FOETO:PF.FOI-MAL-018",
    cle:"atteinteHilaire", min:2,
    signes:["profilDuctal","canauxAnastomoses","fibrosePortale","atteinteHilaire"],
    stop:" — le remodelage physiologique non achevé en périphérie donne le même anneau : sans atteinte " +
         "hilaire, ce n'est pas une donnée. Aucune gradation validée n'existe (0 ligne hépatique dans " +
         "foeto_grades) : ne pas grader. Et pas de syndrome (Meckel, ARPKD, Joubert, Ivemark) sur le " +
         "foie seul — la MPD est un motif partagé, pas un diagnostic." },

  { k:"paucite", l:"Paucité des canaux biliaires interlobulaires", fv:"FOETO:PF.FOI-DYS-001", cle:"ratioBas", min:2,
    signes:["ratioBas","ckConfirme","canauxAbsentsHile"],
    stop:" — ni Alagille ni atrésie ne se concluent sur le compte intra-hépatique. Trois faux positifs " +
         "documentés : prématurité ou proche du terme, prélèvement sous-capsulaire, et macération, " +
         "l'épithélium biliaire tombant le premier. Le ratio EST la mesure : il n'y a pas de grade au-dessus. " +
         "Au hile, des espaces portes sans canal écartent l'immaturité par la topographie." },

  { k:"avbeh", l:"Atrésie des voies biliaires extra-hépatiques", fv:"FOETO:PF.FOI-MAL-070", cle:"obliterationVBEH", min:2,
    signes:["obliterationVBEH","lumiereResiduelle","epithResiduel","situs"],
    stop:" — essentiellement pas de diagnostic en anténatal : « L'atrésie des voies biliaires " +
         "extra-hépatiques (AVBEH) est très rarement découverte en période fœtale » et " +
         "« il s'agit d'une lésion acquise car on ne connaît pas de cas familiaux » [soffoet, ch. 7]. " +
         "Sur un fœtus, prolifération ductulaire + cholestase N'AUTORISENT PAS ce diagnostic." },

  { k:"cholestase", l:"Cholestase", fv:"FOETO:PF.FOI-MET-011", min:1,
    signes:["bouchonsCanalic","bouchonsDuctul","cholestaseHepato","pseudoglandulaire"],
    stop:" — trois différentiels avant de nommer : l'immaturité physiologique de la sécrétion biliaire, " +
         "le pigment formolique (biréfringent, Perls négatif — le CR du service pose lui-même la " +
         "question “pigment formolique ? sels biliaires ?”), et l'hémosidérine. La cholestase est un " +
         "syndrome commun : « Specific features of IEM are not often seen in biopsy reports » " +
         "[keeling, ch. 11]. Elle oriente le bilan, elle ne nomme pas la maladie. Compter les " +
         "compartiments atteints, ne pas grader." },

  { k:"gald", l:"Surcharge en fer / hémochromatose néonatale (GALD)", cle:"ferExtraHep", min:3,
    signes:["perlsHepatoDuctul","predominanceParench","epargneSRE","ferExtraHep"],
    stop:" — jamais d'hémochromatose néonatale sur le foie seul : la base l'écrit, “pattern évocateur " +
         "d'hémochromatose néonatale (GALD) mais non diagnostique en l'absence de preuve de dépôts " +
         "extra-hépatiques parenchymateux”. Ce qui tranche entre physiologique et pathologique est le " +
         "COMPARTIMENT et la distribution, pas l'intensité : périportal et macrophagique = physiologique. " +
         "Le Perls des foyers d'hématopoïèse est normal — le CR du service le note : “Le Perls est positif " +
         "au niveau des zones d'hématopoïèse”. Une fibrose disséquante EXCLUT le GALD." },

  { k:"emh", l:"Hématopoïèse extra-médullaire déplacée — physiologique ou réactive", min:1,
    signes:["erythroAugmentee","myeloAugmentee","erythroDiminuee"],
    stop:" — ne jamais écrire “hématopoïèse extra-médullaire augmentée” sans dire QUELLE lignée. " +
         "L'érythropoïèse monte dans « chronic fetal hypoxia or anemia and in infants of diabetic " +
         "mothers » et descend en prééclampsie ; la myélopoïèse monte sur infection et « may help " +
         "confirm a diagnosis of chorioamnionitis when the placenta is unavailable » [ernst, ch. 5]. " +
         "Aucune échelle de quantification n'existe dans aucune source : le seuil de “myélopoïèse " +
         "portale disproportionnée” est une compétence de lecteur, pas une donnée de livre. Le corpus n'a que " +
         "quatre modalités implicites, jamais définies." },

  { k:"necrose", l:"Nécrose hépatique", fv:"FOETO:PF.FOI-VAS-004", cle:"foyersBordureNette", min:2,
    signes:["foyersBordureNette","reactionCellulaire","necrosePeriveineuse","emportePiece","necroseFocale"],
    stop:" — « There is a predictable pattern of loss of nuclear basophilia in the internal organs " +
         "which should not be mistaken for necrosis » [keeling, ch. 15] : sur foie macéré tout " +
         "ressemble à une nécrose de coagulation. Ce qui distingue la nécrose, c'est le CONTRASTE " +
         "LOCAL — bordure et réaction — pas la cellule ; l'autolyse est homogène sur toute la lame. " +
         "Jamais de nécrose sur un foie dont TOUS les hépatocytes ont perdu leur basophilie : l'un " +
         "explique l'autre. Le corpus du service porte 0 nécrose hépatique sur 63. La zonation et la " +
         "fraction du parenchyme se consignent, elles ne se déduisent pas. La périveineuse hémorragique " +
         "oriente l'asphyxie — « Pathological signs of asphyxia include… splanchnic hemorrhagic necroses " +
         "in the liver, spleen, kidneys, and adrenal glands » [keeling, ch. 15] ; l'emporte-pièce " +
         "aléatoire oriente l'infection." },

  { k:"infectionDisseminee", l:"Infection disséminée (HSV, Listeria, entérovirus)", fv:"FOETO:PF.FOI-INF-004", min:2,
    signes:["abces","emportePiece","necroseFocale"],
    stop:" — l'emporte-pièce aléatoire et l'abcès orientent, ils ne nomment pas le germe. Les abcès " +
         "restent lisibles en pleine autolyse : « Despite the severe autolysis, two areas can be " +
         "appreciated where the parenchyma is darker as a consequence of abscesses with accumulation of " +
         "inflammatory cells » [keeling, ch. 15]. Une colonisation bactérienne post-mortem ne compte que " +
         "« if there is evidence of an inflammatory response or focus of infection » [keeling, ch. 15] ; " +
         "les débris granulaires la miment." },

  { k:"cmv", l:"Infection à CMV et autres infections", fv:"FOETO:PF.FOI-INF-005", cle:"oeilDeHibou", min:2,
    signes:["oeilDeHibou","inclusionsCytopl","cytomegaliqueBiliaire","inflamPortale","geantocellulaire",
            "calcifications","endotheliite","hemophagocytose"],
    stop:" — une transformation géantocellulaire n'est PAS une signature virale : c'est la réponse " +
         "stéréotypée du foie fœtal et néonatal à toute agression. Les hépatocytes oncocytaires et les " +
         "noyaux hypertrophiés de l'hématopoïèse simulent une cytomégalie. Les inclusions survivent à " +
         "la macération et « immunohistochemistry could be performed should there be diagnostic " +
         "uncertainty » [keeling, ch. 15]. Compter les cellules à inclusion et dire où (hépatocytes, " +
         "épithélium biliaire, endothélium)." },

  { k:"surcharge", l:"Surcharge métabolique", fv:"FOETO:PF.FOI-MET-013", min:2,
    signes:["ballooning","verreDepoli","globulesDPAS","amylopectine","microvesiculationDPAS","macrophagesDPAS"],
    stop:" — aucun nom de maladie sur la morphologie seule : s'arrêter à “surcharge de type X, " +
         "compartiment Y”. La paraffine perd les lipides, « Oil-red-O staining may be useful to " +
         "document microvesicular steatosis » exige du congelé, et « Alcian blue stains failed to " +
         "convincingly demonstrate MPS in any of the liver sections » [pubmed] — un alcian bleu négatif " +
         "n'exclut rien. Préciser le compartiment (hépatocyte vs Kupffer) et la texture de la vacuole." },

  { k:"steatose", l:"Stéatose", min:1,
    signes:["steatoseNonTypee","steatosePeriportale","steatoseMicro","steatoseMassive","steatosePanlobulaire"],
    stop:" — « Steatosis in general should arouse suspicion of a metabolic disorder » [keeling, ch. 23], " +
         "et le côté artefact est VIDE : aucune source ouverte ne documente une stéatose induite par la " +
         "technique, le jeûne ou l'agonie. Toute stéatose est donc à lire comme potentiellement " +
         "significative — inconfortable, mais sourcé. Le différentiel est la glycogénisation fœtale : " +
         "le PAS avec et sans diastase tranche, le glycogène est PAS+ digestible. Chez un mort-né de " +
         "mère diabétique, « Hepatic steatosis is significantly more severe in stillborns of diabetic " +
         "mothers than in controls » [keeling, ch. 23]. Orientations [keeling, ch. 23] : périportale → " +
         "déficit en α1-antitrypsine ; microvésiculaire → cytopathie mitochondriale ; dominante ou " +
         "massive → anomalie de la β-oxydation des acides gras — elles orientent le bilan, elles ne " +
         "nomment pas." },

  { k:"fibrose", l:"Fibrose", min:1,
    signes:["fibrosePortale","proliferationDuctulaire","pontsPortoPortaux","fibroseDissequante",
            "fibrosePeriDuctale","fibrosePericell","fibrosePeriveineuse","cirrhose"],
    stop:" — l'espace porte fœtal est NORMALEMENT lâche et mésenchymateux : “fibreux” en HES seul " +
         "n'est pas une donnée, il faut le trichrome. La fibrose disséquante est le critère d'exclusion " +
         "du GALD, que le service énonce déjà comme négatif : “sans fibrose disséquante”. Le " +
         "compartiment oriente, pas la quantité." },

  { k:"vasculaire", l:"Anomalies vasculaires", min:1,
    signes:["shuntAbernethy","cavernome","ductusVenosus","agenesieVeines","trajetVCI","thrombiFibrineux","hematomeSC"],
    stop:" — le foie est un ACTEUR de l'anasarque, pas seulement une victime : « Immature liver " +
         "produces low amounts of albumin, resulting in low protein levels » [keeling, ch. 13]. " +
         "Trois des causes vasculaires d'hydrops listées par le livre n'avaient aucun terme dans " +
         "foeto_terms quand la fiche a été écrite : ne pas conclure à leur absence parce que le champ manque." },

  { k:"rares", l:"Hétérotopies et lésions rares", min:1,
    signes:["pancreasEctopique","cartilagePeriductal","kysteForegut","ectasieCaroli",
            "granulomes","megacaryocytes"],
    stop:" — aucune de ces entités n'appelle de mesure ni de gradation. Un foie autolysé faisant hernie " +
         "par la paroi n'est pas une hétérotopie : « the softness of the autolysed liver may result in " +
         "protrusion of the autolysed liver mass through the anterior abdominal wall, mimicking " +
         "omphalocele » [keeling, ch. 15]." }
];

/* ── Négatifs obligatoires — déduits, jamais cochés ───────────────────────── */
var NEGATIFS = [
  { k:"nbEP", l:"Nombre d'espaces portes évaluables énoncé", p:"jamais écrit dans le corpus",
    ko:"nombre d'espaces portes NON énoncé — toute mention de paucité devient ininterprétable",
    auto:function(){ return E.mesure.v.ep != null ? true : null; } },
  { k:"hileInclus", l:"Hile inclus ou non, précisé", p:"c'est la topographie qui sépare immaturité et paucité",
    ko:"topographie du comptage NON précisée",
    auto:function(){ return E.mesure.def ? true : null; } },
  { k:"macerationSignes", l:"Absence de signe de macération", p:"c'est ce qui autorise à lire la paucité et l'hématopoïèse",
    ko:"signes de macération PRÉSENTS — paucité biliaire et compte hématopoïétique non rendus",
    auto:function(){
      if (RETENTION.some(function(r){ return E.retention[r.k] === "present"; })) return false;
      return retNiveau() === "absente" ? true : null; } },
  { k:"fer", signe:"perlsHepatoDuctul", l:"Absence de surcharge en fer, Perls fait", p:"déjà pratiqué, 3 occurrences",
    ko:"surcharge en fer PRÉSENTE — étendre le Perls hors du foie avant de conclure" },
  { k:"ferExtra", signe:"ferExtraHep", l:"Perls négatif sur les autres viscères",
    p:"“absence de surcharge d'autres viscères (cœur, thyroïde et parathyroïdes, glandes paratrachéales, pancréas Perls négatifs)” — formulation du service",
    ko:"Perls extra-hépatique POSITIF ou non fait — le GALD ne se conclut pas sans lui" },
  { k:"bile", l:"Absence de surcharge en bile", p:"déjà pratiqué",
    ko:"surcharge en bile PRÉSENTE",
    auto:function(){
      var k = ["bouchonsCanalic","bouchonsDuctul","cholestaseHepato","pseudoglandulaire"];
      if (k.some(function(x){ return E.signes[x] === POS; })) return false;
      return k.every(function(x){ return E.signes[x] === NEG; }) ? true : null; } },
  { k:"inflam", signe:"inflamPortale", l:"Absence d'élément inflammatoire portal", p:"déjà pratiqué",
    ko:"inflammation portale PRÉSENTE — distinguer de la myélopoïèse portale physiologique" },
  { k:"inclusions", signe:"oeilDeHibou", l:"Absence d'inclusion nucléaire", p:"déjà pratiqué",
    ko:"inclusions nucléaires PRÉSENTES" },
  { k:"fibroseDiss", signe:"fibroseDissequante", l:"Absence de fibrose disséquante", p:"critère d'exclusion du GALD",
    ko:"fibrose disséquante PRÉSENTE" },
  { k:"vbehVues", l:"Voies biliaires extra-hépatiques examinées", p:"sans elles l'atrésie est indécidable",
    ko:"voies biliaires extra-hépatiques NON examinées",
    auto:function(){
      return etatGroupe("Voies biliaires extra-hépatiques") ||
             ["obliterationVBEH","lumiereResiduelle","epithResiduel"].some(function(x){ return E.signes[x]; })
             ? true : null; } }
];

/* ── Techniques — une question par ligne ──────────────────────────────────── */
var TECHNIQUES = [
  { k:"ck",       l:"CK7 / CK19", q:"y a-t-il assez de canaux biliaires ? — inutile sur foie macéré" },
  { k:"trichrome",l:"Trichrome", q:"l'architecture est-elle normale ? — reste valide sur foie macéré" },
  { k:"perls",    l:"Perls, foie", q:"ce pigment est-il du fer ?" },
  { k:"perlsExtra",l:"Perls, cœur / thyroïde / pancréas / salivaires", q:"le fer est-il extra-hépatique ? — le critère du GALD" },
  { k:"pasDiast", l:"PAS ± digestion diastasique", q:"ce cytoplasme clair est-il du glycogène ?" },
  { k:"dpas",     l:"DPAS", q:"y a-t-il des globules d'α1-antitrypsine ?" },
  { k:"oilred",   l:"Oil-red-O", q:"y a-t-il une stéatose ? — exige du congelé" },
  { k:"ferColl",  l:"Fer colloïdal, FFPE et coupe congelée", q:"y a-t-il des mucopolysaccharides ? — l'alcian bleu ne suffit pas" },
  { k:"mpo",      l:"MPO", q:"la lignée myéloïde est-elle augmentée ?" },
  { k:"cd71",     l:"CD71", q:"la lignée érythroïde est-elle augmentée ?" },
  { k:"ihcCmv",   l:"IHC anti-CMV", q:"est-ce un CMV ? — reste faisable sur macéré" },
  { k:"congeleAssay",l:"Dosages sur foie et muscle congelés", q:"cytopathie mitochondriale — rien en histologie" },
  { k:"fibroblastes",l:"Fibroblastes en culture, enzymes leucocytaires, ME", q:"surcharge lysosomale — rien en histologie" }
];

/* ── Propositions de techniques — déduites des clics, jamais imposées ─────── */
function suggerer(){
  var s = {};
  function un(){ for (var i = 0; i < arguments.length; i++) if (E.signes[arguments[i]] === POS) return true;
                 return false; }
  function ret(k){ return E.retention[k] === "present"; }
  function neg(k){ return etatNegatif(par(NEGATIFS, k)); }

  /* Les propositions suivent les SIGNES : une technique se demande sur ce qu'on
     a vu, pas sur le nom qu'on lui donnerait. */
  if (un("profilDuctal","canauxAnastomoses","atteinteHilaire")){ s.trichrome = 1; s.ck = 1; }
  if (un("ratioBas","ckConfirme","canauxAbsentsHile")) s.ck = 1;
  if (un("obliterationVBEH","lumiereResiduelle","epithResiduel")){ s.ck = 1; s.trichrome = 1; }
  if (un("bouchonsCanalic","bouchonsDuctul","cholestaseHepato","pseudoglandulaire")) s.perls = 1;
  if (un("perlsHepatoDuctul","predominanceParench","epargneSRE","ferExtraHep")){
    s.perls = 1; s.perlsExtra = 1; s.trichrome = 1; }
  if (un("erythroAugmentee","myeloAugmentee","erythroDiminuee")){ s.mpo = 1; s.cd71 = 1; }
  if (un("foyersBordureNette","reactionCellulaire","necrosePeriveineuse","emportePiece","necroseFocale")) s.trichrome = 1;
  if (un("oeilDeHibou","inclusionsCytopl","cytomegaliqueBiliaire","geantocellulaire","inflamPortale",
         "endotheliite","hemophagocytose","calcifications")) s.ihcCmv = 1;
  if (un("ballooning","verreDepoli","globulesDPAS","amylopectine","microvesiculationDPAS","macrophagesDPAS")){
    s.dpas = 1; s.pasDiast = 1; s.oilred = 1; s.ferColl = 1; s.fibroblastes = 1; }
  if (un("steatoseNonTypee","steatosePeriportale","steatoseMicro","steatoseMassive","steatosePanlobulaire")){
    s.oilred = 1; s.pasDiast = 1; s.congeleAssay = 1; }
  if (un("fibrosePortale","proliferationDuctulaire","pontsPortoPortaux","fibroseDissequante",
         "fibrosePeriDuctale","fibrosePericell","fibrosePeriveineuse","cirrhose")) s.trichrome = 1;
  if (un("shuntAbernethy","cavernome","ductusVenosus","agenesieVeines","trajetVCI","thrombiFibrineux","hematomeSC"))
    s.trichrome = 1;

  /* Sur macéré le trichrome est la seule technique qui tienne encore. */
  if (RETENTION.some(function(r){ return E.retention[r.k] === "present" && r.q === "bon"; })) s.trichrome = 1;
  if (ret("epithBiliaire")) s.ck = 1;
  if (ret("noyauxHemato")){ s.mpo = 1; s.cd71 = 1; }

  if (E.mesure.opt === "hes" && E.mesure.v.ratio != null) s.ck = 1;
  /* v1 : négatif « en défaut » ; v2 : négatif déduit, en défaut quand son signe est présent */
  if (neg("ferExtra") === "ko") s.perlsExtra = 1;
  if (neg("inclusions") === "ko") s.ihcCmv = 1;
  if (neg("fibroseDiss") === "ko") s.trichrome = 1;
  /* La décision de congeler se prend à la table : dès qu'une surcharge est suspectée. */
  if (E.prelev.congele && (s.oilred || s.dpas)) s.congeleAssay = 1;
  return s;
}

/* ── Contrôles propres au foie ────────────────────────────────────────────── */
async function testsOrgane(chk, clic, set, crTient, pause){
  /* Le banc commun laisse des signes posés : on part d'un état voulu, pas supposé. */
  function pose(k, v){ if (E.signes[k] !== v) clic("les", k, v); }
  function ote(k){ if (E.signes[k]) clic("les", k, E.signes[k]); }
  function tenue(k){ return associations().some(function(a){ return a.d.k === k && a.tenu; }); }
  function retSel(v){ var s = $("retNiveau"); s.value = v; s.dispatchEvent(new Event("change", {bubbles:true})); }
  function neg(k){ return etatNegatif(par(NEGATIFS, k)); }

  /* Les deux paliers, et les ~72 h qui les séparent */
  chk("deux paliers hépatiques",  par(RETENTION, "basoIsoles").h === 24 &&
      par(RETENTION, "basoTous").h === 96);
  chk("écart de 72 h entre paliers",
      par(RETENTION, "basoTous").h - par(RETENTION, "basoIsoles").h === 72);
  chk("contradiction 4—12 h portée", par(RETENTION, "basoIsoles").note.indexOf("4—12 h") >= 0 &&
      par(RETENTION, "basoIsoles").note.indexOf("une seule sourcée") >= 0);
  chk("palier 4–24 h rendu au rein", par(RETENTION, "basoIsoles").note.indexOf("appartient au REIN") >= 0);
  chk("alignement ernst/keeling non démontré",
      par(RETENTION, "basoTous").note.indexOf("CONCORDANT") >= 0 &&
      par(RETENTION, "basoTous").note.indexOf("9 contre 10") >= 0);
  chk("règle d'arbitrage non écrite", par(RETENTION, "basoTous").note.indexOf("n'est écrite nulle part") >= 0);
  /* v2 : la pratique du service ne date plus ; ce qu'elle écrit reste dans les notes */
  chk("v2 : pas de palier de service datable", !par(RETENTION, "basoPartielle") && !par(RETENTION, "basoComplete") &&
      par(RETENTION, "basoIsoles").note.indexOf("24–48 h") >= 0 &&
      par(RETENTION, "basoTous").note.indexOf("96 h – 1 semaine") >= 0);
  chk("v2 : la lisibilité ne date pas", retDatables().every(function(r){ return r.h > 0; }) &&
      !$("retNiveau").querySelector('option[value="epithBiliaire"]'));

  /* Le comptage — observation d'abord */
  set("sa", "22");
  chk("sans comptage, la paucité est ininterprétable", crTient("est ininterprétable"));
  chk("négatif EP non répondu sans comptage", neg("nbEP") === null);

  set("m_ep", "6");
  chk("moins de 10 EP bloque la conclusion", $("vMesure").className.indexOf("bad") >= 0 &&
      crTient("ni la paucité ni son absence ne se concluent"));
  set("m_ep", "14");
  chk("14 EP acceptés",            crTient("14 espace(s) porte(s) évaluable(s)"));
  chk("négatif EP énoncé par le compte", neg("nbEP") === "ok");

  set("m_ratio", "0.3");
  chk("ratio sous le seuil de paucité", crTient("Sous le seuil de paucité (0,4)"));
  chk("barème néonatal signalé",   crTient("sont NÉONATALS"));
  chk("barème néonatal sur fœtus de 22 SA", crTient("barème néonatal appliqué à un fœtus de 22 SA"));

  set("m_ratio", "0.6");
  chk("zone grise 0,4–0,9 nommée", crTient("zone que les sources ne qualifient pas"));
  set("m_ratio", "1.2");
  chk("ratio normal",              crTient("Dans l'intervalle normal (0,9–1,8)"));

  clic("mdef", "peripherie");
  chk("périphérie seule = faux positif documenté",
      crTient("apparent paucity may be seen in biopsies from premature neonates"));
  chk("topographie déclarée → négatif énoncé", neg("hileInclus") === "ok");
  clic("mdef", "peripherie");
  clic("mopt", "hes");
  chk("HES seul propose la CK7",   suggerer().ck === 1 && crTient("peut rester marqué en CK7/CK19"));
  clic("mopt", "hes");
  chk("comment compter au survol", /10 espaces portes/.test($("m_ep").parentNode.querySelector("label").title));

  /* La macération invalide le comptage */
  clic("ret", "epithBiliaire", "present");
  chk("épithélium biliaire perdu invalide le comptage", crTient("le comptage n'est pas recevable"));
  chk("paucité non conclue sur macéré",
      par(RETENTION, "epithBiliaire").note.indexOf("ne se conclut pas sur foie macéré") >= 0);
  chk("macération présente → négatif en défaut", neg("macerationSignes") === "ko");
  clic("ret", "epithBiliaire", "present");
  set("m_ep", ""); set("m_ratio", "");
  retSel("absente");
  chk("rétention absente → négatif macération énoncé", neg("macerationSignes") === "ok");
  clic("ret", "calcifDystro", "present");
  chk("un non datable suffit à mettre la macération en défaut", neg("macerationSignes") === "ko");
  clic("ret", "calcifDystro", "present");
  retSel("");

  /* Les stop qui portent le sens */
  chk("nécrose : le contraste local, pas la cellule",
      par(DIAGS, "necrose").stop.indexOf("CONTRASTE LOCAL") >= 0);
  chk("EMH : jamais sans nommer la lignée",
      par(DIAGS, "emh").stop.indexOf("QUELLE lignée") >= 0);
  chk("EMH : aucune échelle n'existe",
      par(DIAGS, "emh").stop.indexOf("Aucune échelle de quantification n'existe") >= 0);
  chk("GALD : jamais sur le foie seul",
      par(DIAGS, "gald").stop.indexOf("jamais d'hémochromatose néonatale sur le foie seul") >= 0);
  chk("AVBEH : pas de diagnostic anténatal",
      par(DIAGS, "avbeh").stop.indexOf("N'AUTORISENT PAS") >= 0);
  chk("MPD : ne pas grader",       par(DIAGS, "mpd").stop.indexOf("ne pas grader") >= 0);
  chk("stéatose : côté artefact vide",
      par(DIAGS, "steatose").stop.indexOf("côté artefact est VIDE") >= 0);
  chk("fibrose : trichrome obligatoire",
      par(DIAGS, "fibrose").stop.indexOf("n'est pas une donnée") >= 0);
  chk("géantocellulaire n'est pas viral",
      par(DIAGS, "cmv").stop.indexOf("n'est PAS une signature virale") >= 0);

  /* Le négatif que le service n'écrit jamais */
  chk("nombre d'EP en tête des négatifs", NEGATIFS[0].k === "nbEP");

  /* Le nom se déduit des signes — il ne se coche pas */
  chk("aucun bouton ne porte un diagnostic",
      DIAGS.every(function(d){ return !document.querySelector('[data-act="les"][data-k="' + d.k + '"]'); }));

  /* Le GALD ne se conclut pas sans le fer extra-hépatique */
  pose("perlsHepatoDuctul", POS);
  pose("predominanceParench", POS);
  pose("epargneSRE", POS);
  chk("GALD ne tient pas sans dépôt extra-hépatique", !tenue("gald") &&
      crTient("signe pivot non coché : Dépôts de fer extra-hépatiques"));
  chk("le fer propose le Perls extra-hépatique", suggerer().perlsExtra === 1);
  chk("fer présent → négatif fer en défaut", neg("fer") === "ko");
  pose("ferExtraHep", POS);
  chk("GALD tient avec le dépôt extra-hépatique", tenue("gald"));
  chk("le fer extra-hépatique vit hors lame", !!$("contexte").querySelector('[data-act="les"][data-k="ferExtraHep"]'));
  ote("perlsHepatoDuctul"); ote("predominanceParench"); ote("epargneSRE"); ote("ferExtraHep");

  /* Le « Non » du cadre des surcharges ne répond ni le Perls ni le DPAS à la place du lecteur */
  var gS = "Surcharges — fer et métaboliques", iS = groupes().indexOf(gS);
  signesDe(gS).forEach(function(x){ delete E.signes[x.k]; }); delete E.groupes[gS]; peindre();
  clic("grp", iS, "non");
  chk("non en bloc : Perls, DPAS et épargne du SRE restent à répondre",
      E.signes.ballooning === NEG && !E.signes.perlsHepatoDuctul && !E.signes.globulesDPAS &&
      !E.signes.epargneSRE && etatGroupe(gS) === "non" && neg("fer") === null);
  clic("grp", iS, "non");

  /* La MPD se joue sur le hile : la couronne périphérique seule ne suffit pas */
  pose("profilDuctal", POS);
  pose("canauxAnastomoses", POS);
  chk("MPD ne tient pas sans le hile", !tenue("mpd"));
  pose("atteinteHilaire", POS);
  chk("MPD tient avec le hile", tenue("mpd"));
  ote("profilDuctal"); ote("canauxAnastomoses"); ote("atteinteHilaire");

  /* La paucité se lit sur le ratio ; le hile sans canal ne la tient pas seul.
     Le ratio bas se DÉDUIT du comptage : pas de bouton, rien sous 10 espaces portes. */
  chk("ratio bas : déduit, sans bouton", !document.querySelector('[data-act="les"][data-k="ratioBas"]') &&
      !!document.querySelector('[data-auto="ratioBas"]'));
  pose("canauxAbsentsHile", POS);
  pose("ckConfirme", POS);
  chk("paucité sans ratio bas ne tient pas", !tenue("paucite") &&
      crTient("signe pivot non coché : " + par(SIGNES, "ratioBas").l));
  set("m_ep", "6"); set("m_ratio", "0.3");
  chk("ratio bas non déduit sous 10 espaces portes", !E.signes.ratioBas && !tenue("paucite"));
  set("m_ep", "14");
  chk("paucité tient sur le ratio déduit", E.signes.ratioBas === POS && tenue("paucite") && suggerer().ck === 1);
  clic("ret", "epithBiliaire", "present");
  chk("ratio bas non déduit sur épithélium biliaire effacé", !E.signes.ratioBas);
  clic("ret", "epithBiliaire", "present");
  set("m_ratio", "1.2");
  chk("ratio normal → ratio bas déduit absent", E.signes.ratioBas === NEG);
  set("m_ep", ""); set("m_ratio", "");
  chk("sans comptage, rien de déduit", !E.signes.ratioBas);
  ote("canauxAbsentsHile"); ote("ckConfirme");

  /* Une lignée nommée suffit à porter l'hématopoïèse déplacée */
  pose("myeloAugmentee", POS);
  chk("EMH tient sur une lignée nommée", tenue("emh"));
  chk("EMH propose MPO et CD71",   suggerer().mpo === 1 && suggerer().cd71 === 1);
  ote("myeloAugmentee");

  /* L'abcès seul ne fait pas l'infection disséminée ; avec l'emporte-pièce, oui */
  pose("abces", POS);
  chk("abcès seul : faisceau incomplet", !tenue("infectionDisseminee"));
  pose("emportePiece", POS);
  chk("abcès + emporte-pièce : infection disséminée tenue", tenue("infectionDisseminee"));
  ote("abces"); ote("emportePiece");

  /* Négatifs calculés : bile, voies extra-hépatiques */
  ["bouchonsCanalic","bouchonsDuctul","cholestaseHepato","pseudoglandulaire"].forEach(function(k){ pose(k, NEG); });
  chk("cholestase absente → négatif bile énoncé", neg("bile") === "ok");
  pose("bouchonsCanalic", POS);
  chk("bouchon présent → négatif bile en défaut", neg("bile") === "ko" && crTient("surcharge en bile PRÉSENTE"));
  ["bouchonsCanalic","bouchonsDuctul","cholestaseHepato","pseudoglandulaire"].forEach(ote);
  var iV = groupes().indexOf("Voies biliaires extra-hépatiques");
  chk("voies extra-hépatiques non lues → négatif ouvert", neg("vbehVues") === null);
  clic("grp", iV, "non");
  chk("voies extra-hépatiques lues → négatif énoncé", neg("vbehVues") === "ok");
  clic("grp", iV, "non");

  /* Variantes dans le cadre qu'elles miment */
  chk("îlots de Bessis sous l'inflammation", par(VARIANTES, "bessis").g === "Infection et inflammation" &&
      par(VARIANTES, "glycogene").g === "Stéatose" && par(VARIANTES, "hemosiderose").g === "Surcharges — fer et métaboliques");

  /* Branchement FOETO */
  chk("v2 : libellé venu de FOETO", par(SIGNES, "atteinteHilaire").l === "Profil ductal persistant au hile");
  chk("v2 : code FOETO du terme verbatim", codesDe(par(SIGNES, "oeilDeHibou"))[0] === "FOETO:PF.FOI-MAL-063");
  chk("v2 : HPO arbitré venu de la base", par(SIGNES, "anasarque").hpo === "HP:0001789");
  chk("v2 : terme maladie sur l'association", par(DIAGS, "paucite").foeto[0] === "FOETO:PF.FOI-DYS-001" &&
      par(DIAGS, "infectionDisseminee").foeto[0] === "FOETO:PF.FOI-INF-004");
  chk("v2 : aucun signe hors fiche", SIGNES.every(function(x){ return !x.horsFiche; }));
  set("rqFoeto", "Abcès");
  var pick = $("sgFoeto").querySelector('[data-pick="FOETO:PF.FOI-INF-002"]');
  if (pick) pick.click();
  chk("v2 : un terme porté par un signe pose le signe", !!pick && E.signes.abces === POS &&
      !E.foeto["FOETO:PF.FOI-INF-002"]);
  ote("abces");
  chk("v2 : blocs lus en §02", BLOCS_LUS && !$("blocsBloc").hidden);
}
