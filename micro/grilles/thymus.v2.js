/* Grille de lecture — thymus. VERSION 2 (2.0.0).
   Migration de thymus.js (1.0.1) sur le patron “ordre de lecture” (rein 3.5.0,
   poumon 2.1.0) : gen_grille.py, mode présence, termes FOETO fondus dans les signes
   et branchés (termes tagués “verbatim”), blocs lus en §02, cadres de lecture.
   La v1 reste publiée à côté tant que la v2 n'a pas été validée à l'usage.
   Ce que la v2 change, sans rien retrancher de la v1 :
   · un signe est un CONSTAT présent / absent / non regardé (plus normal / anormal).
     Les 26 constats de fiche_thymus.md tagués dans FOETO ont chacun leur signe (fv) :
     22 étaient des signes v1, 4 entrent — lyse ou apoptose des lymphocytes corticaux
     (le critère positif d'ernst), diabète maternel, hypoplasie parathyroïdienne,
     thymus absent ou très petit. Trois termes NOR tagués portent aussi un signe v1
     (blue blobs, nodule non connecté, tissu parathyroïdien). Les signes v1 sans
     terme FOETO portent fiche:"[source]" ;
   · le signe v1 “Reliquat thymique seulement, ou glande non retrouvée” est scindé :
     le reliquat histologique (sur la lame, pivot de l'hypoplasie comme en v1) et le
     thymus absent ou très petit (macro, hors lame) ; la FISH reste proposée sur l'un
     ou l'autre ;
   · deux signes v1 partagent un terme : la lymphophagocytose focale porte le terme
     (“focale” passe en meta), la marquée garde son libellé ; les foyers de
     déplétion portent la déplétion corticale (“en foyers” passe en meta) ;
   · les 12 négatifs se DÉDUISENT : 8 d'un signe répondu absent, 4 d'un contrôle auto
     (lymphophagocytose focale ET marquée, Hassall présents ET non tassés, surcharge
     de Gaucher ET vacuolisée, grade composé sur les deux colonnes). Le négatif
     “surcharge en fer” n'avait pas de signe : il en reçoit un (corpus CR) ;
   · l'involution de stress reste une SÉVÉRITÉ : la Table 15.8 vit dans MESURE (deux
     colonnes qui s'intersectent), jamais dans les stades ni comme terme de signe ;
     ses critères restent des constats. L'axe de grade (HEM-NOR-095), la fraction
     corticale (HEM-NOR-099) et le poids (HEM-NOR-100) sont les champs de MESURE ;
     une aide au survol porte l'avertissement d'écran de la fiche (§ 10.5) ;
   · ordre de lecture : le cadre hors lame (les sept signes “lus hors thymus”, les
     poids, les pétéchies, la clinique, et le nodule ectopique avec ses deux variantes :
     il se lit sur le bloc thyroïdien ou cervical, un autre prélèvement de la liste
     habituelle, qui n'a pas de cadre ici) passe avant la rétention, puis huit cadres
     lus du faible au fort ; chaque signe porte son grossissement (mag — savoir de
     pratique [expérience], à valider à l'usage) ; les dix variantes vivent dans le
     cadre qu'elles miment et ne passent au CR qu'en parenthèse. “Lame d'aspect
     normal pour l'âge” est de polarité normale : hors du “Non” en bloc (bloc:false) ;
   · le prélèvement sépare ce qui qualifie la lecture de la dissection et de la
     macro, destinées à la future grille macro fixée ;
   · les associations portent leur terme FOETO quand la base nomme l'entité
     (involution, hypoplasie, les deux hyperplasies, ectopie, surcharge, hémorragie,
     hypoxie chronique) — affiché, jamais exporté. VIH, déficit immunitaire,
     lymphohistiocytose, Gaucher, CHARGE, 22q11, Wiedemann-Beckwith et kyste thymique
     sont nommés dans les “ne pas conclure”, sans association propre ;
   · “au § 04” devient “en Maturation” : les sections se renumérotent.
   Fond : ~/Bureau/fiches_lecture/fiche_thymus.md (§1 à §9).
   Forme : gen_grille.py, calquée sur grille_poumon.html.
   Les divergences entre sources sont PORTÉES dans les champs, jamais arbitrées. */

/* 2.1.0 (2026-11-14) — lot FOETO, propositions relues par Kimi K3.1 Pro et vérifiées par script
   (verbatim mot pour mot dans la fiche) : 4 fenêtre(s) de terme — le « Non » en bloc ne répond plus
   un signe daté hors de sa fenêtre (seul : un par un) ; 17 code(s) FOETO existant(s) branché(s)
   (variantes, rétention, stades, mesures, associations) ; 7 code(s) créé(s) depuis le verbatim de la
   fiche. Les propositions jugées faibles ou fausses attendent le tri de Rémi. */
var ORGANE  = "thymus";
var TITRE   = "thymus";
var SOURCE  = "fiche_thymus.md";
var MODULE  = "grille_thymus";
var VERSION = "2.1.0";
var SCHEMA  = "0.3.0";   /* 0.3.0 : signes present/absent, négatifs déduits */
var ETATS   = "presence";
var FOETO_DANS_SIGNES = true;
/* Glande bilobée fusionnée dès ~9 SA, et aucun CR ne date les deux lobes
   séparément. C'est un défaut d'usage, pas une preuve d'homogénéité (§ 9.10). */
var PAIR    = false;
var BLOCS   = true;
var LECTURE = true;   /* cadres (CADRES), grossissement (mag), variantes dans leur cadre */
/* Une étendue (focale, multifocale, diffuse) ne dit rien d'un repère manquant ni d'une ectopie. */
var GROUPES_SANS_ETENDUE = ["Repères manquants ou reliquat seul", "Kyste et tissu parathyroïdien"];

var TITRE_CR    = "THYMUS";
var STADE_TITRE = "Repère de maturation du lobule — trajectoire continue, pas des paliers";

var KCL_TXT = "Fœticide par KCl déclaré. Le thymus ne date déjà aucun intervalle post-mortem — il est " +
              "absent de la Table 15.6 et ne se place à aucun rang ; après le geste, plus aucune borne " +
              "n'est recevable.";

/* Au thymus le « retard » est ambigu par construction : cortex mince et septa
   larges sont l'image de la mi-gestation ET celle des rangs 3-4 de l'involution. */
var RETARD_NOTE = "Il n'y a PAS de stades au thymus : ces repères sont des apparitions datables sur une " +
                  "trajectoire continue. Un cortex mince à septa larges est normal à la mi-gestation et " +
                  "il est aussi l'image de l'involution — c'est l'immaturité qui contrefait la lésion, " +
                  "la grille ne tranche pas.";

var AVANCE_NOTE = "Une avance ne se lit pas sur cet organe : il n'existe pas de courbe de fraction " +
                  "corticale entre la mi-gestation et le terme. Deux points seulement, environ 67 % " +
                  "(dont la borne SA est perdue à l'extraction) et environ 85 % au terme.";

var TECH_NOTE = "Les pointillés sont des propositions déduites des clics, jamais des prescriptions. " +
                "Aucune IHC n'apparaît sur une phrase thymique du corpus : les proposer, c'est ouvrir " +
                "une pratique, pas la rappeler.";

/* ── 02 · Prélèvement ─────────────────────────────────────────────────────── */
var PRELEV = [
  { k:"lobule", g:"Qualifie la lecture", l:"Un lobule complet : capsule → cortex → médullaire → cortex", grave:true,
    manque:"sans lobule complet, quatre des cinq critères de gradation ne se jugent pas" },
  { k:"capsule", g:"Qualifie la lecture", l:"Capsule sur la coupe",
    manque:"sans capsule, ni l'épaisseur corticale ni la séparation des lobules ne se jugent" },
  { k:"medullaire", g:"Qualifie la lecture", l:"Médullaire incluse", grave:true,
    manque:"sans médullaire, la fraction corticale et l'inversion de densité sont indéterminables" },
  { k:"hassall", g:"Qualifie la lecture", l:"Au moins un corpuscule de Hassall", grave:true,
    manque:"c'est le repère qui prouve qu'il s'agit bien de thymus" },
  { k:"autres", g:"Qualifie la lecture", l:"Surrénale, foie, rein, pancréas et placenta lus",
    manque:"le thymus ne date rien seul, et le faisceau d'hypoxie chronique compte cinq organes" },
  { k:"cervical", g:"Dissection et macro — iront à la grille macro fixée", l:"Extensions cervicales prélevées avec l'organe",
    manque:"« tongues of thymic tissue may reach high into the neck » [keeling, ch. 15] — un poids bas " +
           "se vérifie d'abord sur la dissection" },
  { k:"mediastin", g:"Dissection et macro — iront à la grille macro fixée", l:"Médiastin antérieur ET cou explorés si le thymus n'est pas retrouvé",
    manque:"« Son absence complète est rare même dans les cardiopathies cono-truncales » [soffoet, ch. 5] : " +
           "rechercher les reliquats histologiques avant de conclure à l'aplasie" },
  { k:"poids", g:"Dissection et macro — iront à la grille macro fixée", l:"Poids du thymus consigné",
    manque:"96 CR sur 196 le portent, et le seuil d'hyperplasie ne s'écrit que dessus" },
  { k:"dissection", g:"Dissection et macro — iront à la grille macro fixée", l:"Compte rendu de dissection disponible",
    manque:"seul le compte rendu de dissection sépare l'hémorragie thymique du saignement de retrait" },
  { k:"congele", g:"Dissection et macro — iront à la grille macro fixée", l:"Fragment congelé à −80 °C",
    manque:"thymus dans la liste à congeler devant tout syndrome polymalformatif et toute suspicion de " +
           "maladie métabolique [soffoet, ch. 3]" }
];

/* ── 03 · Rétention ───────────────────────────────────────────────────────────
   Le thymus est ABSENT de la Table 15.6 : il ne se place à aucun rang et il est
   interdit de l'interpoler. La seule borne recevable est donc lue ailleurs — la
   ligne « bon » de ce tableau est explicitement une lecture hors thymus. */
var MODIF = "délai accéléré par l'anasarque et par un intervalle accouchement-autopsie > 24 h, ralenti " +
            "par un terme < 25 SA (donc sous 25 SA le délai est SOUS-estimé)";

var RETENTION = [
  { k:"horsThymus", l:"Rang de rétention établi sur les AUTRES organes", b:"celle des autres organes",
    d:"lue hors thymus, Table 15.6", h:1, q:"bon",
    note:"le thymus n'apparaît à aucun des dix rangs de [keeling, ch. 15, Table 15.6] — la borne portée " +
         "ici est celle du rein, du foie, du myocarde ou du poumon, jamais celle du thymus",
    alerte:MODIF },
  { k:"cortexPaleRet", l:"Perte de basophilie nucléaire du cortex", b:"—", d:"non situable", h:0, q:"mauvais",
    note:"« can overlap with loss of nuclear basophilia from maceration » [ernst, ch. 37] : c'est LE MÊME " +
         "signe que le rang 2 de l'involution, sur LE MÊME compartiment — il ne date rien et ne grade rien" },
  { k:"blueBlobsRet", l:"« Blue blobs » du parenchyme", b:"—", d:"artefact non daté", h:0, q:"mauvais",
    note:"artefact nommé de macération, décrit au foie et au thymus ; « should not be confused with " +
         "calcifications, bacteria, viral inclusions, hemosiderin deposits, or formalin pigment » [ernst, ch. 37]" },
  { k:"poussiereRet", l:"Poussière basophile péri-viscérale", b:"—", d:"non datable seule", h:0, q:"mauvais",
    note:"faire un Gram tissulaire avant de conclure : une prolifération bactérienne post-mortem donne " +
         "la même image" },
  { k:"lobulesSeparesRet", l:"Lobules rétractés et séparés", b:"—", d:"non documenté au thymus", h:0, q:"mauvais",
    note:"« shrinkage and compaction of tissues and organs » [keeling, ch. 15] est écrit pour les organes " +
         "en général ; rien ne dit qu'elle sépare les lobules thymiques — le piège est posé PAR ANALOGIE " +
         "(§ 9.8), et l'image est aussi celle des grades 2 à 4" },
  { k:"poidsBasRet", l:"Poids abaissé", b:"—", d:"trois causes, une valeur", h:0, q:"mauvais",
    note:"involution, rétention (« En cas de rétention, le poids des organes est abaissé » [soffoet, ch. 16] ; " +
         "« organ weights may all be artefactually altered » [keeling, ch. 15]) ou prélèvement partiel — " +
         "la baisse de poids est le DERNIER rang de la séquence d'involution, elle ne se conclut pas sans " +
         "les six premiers sur la lame" }
];

/* ── 04 · Maturation — apparitions datables ───────────────────────────────────
   La fiche l'écrit en tête : le thymus n'a pas de stades. Ce qui suit est la
   trajectoire continue découpée en repères d'affichage, dont deux seulement ont
   un intervalle sourcé — et leur unité n'est pas précisée (± 2 SA, § 9.4). */
var STADES = [
  { k:"cordons",       l:"Cordons épithéliaux, pas de distinction cortico-médullaire", max:14,
    note:"« corticomedullary distinction is apparent between 11 and 14 weeks » [keeling, ch. 27] — " +
         "l'unité n'est pas précisée : incertitude de ± 2 SA sur cette borne" },
  { k:"cmHassall",     l:"Distinction cortico-médullaire apparente, corpuscules de Hassall apparus", max:18,
    note:"« Hassall's corpuscles, which appear between 12 and 16 weeks » [keeling, ch. 27] — même " +
         "incertitude d'unité" },
  { k:"cortexMince",   fv:"FOETO:PF.HEM-NOR-121", l:"Cortex en calotte mince, septa larges, lobules espacés", max:24,
    note:"borne reconstruite depuis les figures d'[ernst, ch. 24] (17 puis 22 semaines de gestation) : " +
         "ce n'est pas un seuil sourcé, et cette image est aussi celle des rangs 3 et 4 de l'involution" },
  { k:"cortexEpaissi", fv:"FOETO:PF.HEM-NOR-107", l:"Cortex épaissi, septa resserrés, lobules rapprochés", max:37,
    note:"« As gestation progresses, the interlobular septa become narrower, and the cortex becomes " +
         "thicker » [ernst, ch. 24] — trajectoire sans palier, la borne haute est un repère d'affichage" },
  { k:"cortex85",      l:"Cortex occupant l'essentiel du lobule", max:99,
    note:"divergence NON tranchée (§ 9.1) : [ernst, ch. 24] attend au terme « approximately 85 % of the " +
         "thymus is composed of cortex », [keeling, ch. 27] écrit que la démarcation est « blurred by " +
         "term » — or une fraction de 85 % suppose une démarcation lisible" }
];

/* ── 04 bis · Gradation de l'involution — Table 15.8, DEUX colonnes ───────────
   L'involution de stress n'est pas une maturation : c'est une sévérité. Elle vit
   donc ici, en axe séparé, et non dans les stades ni dans les signes (règle actée :
   une gradation n'est jamais un terme). Les deux colonnes s'INTERSECTENT — elles
   ne se moyennent jamais. Axe FOETO : HEM-NOR-095 ; champs : HEM-NOR-099
   (fraction corticale) et HEM-NOR-100 (poids). */
var ARCH = [
  { k:"a01",  l:"Lobules serrés, septa fins, définition cortico-médullaire nette", g:[0, 1] },
  { k:"a2",   l:"Début de séparation des lobules, première rétraction corticale, définition CM encore nette",
    g:[2] },
  { k:"a3",   l:"Séparation croissante, rétrécissement cortical irrégulier, définition CM perdue à faible grossissement",
    g:[3] },
  { k:"a4",   l:"Rétraction et séparation avancées, interstitium et vaisseaux proéminents, définition CM complètement perdue",
    g:[4] },
  { k:"aInd", l:"Architecture non jugeable — pas de capsule ou pas de médullaire", g:[0, 1, 2, 3, 4] }
];
var CELL = [
  { k:"c0",   l:"Haute densité corticale, pas de lymphophagocytose", g:[0] },
  { k:"c1",   l:"Haute densité, lymphophagocytose corticale focale", g:[1] },
  { k:"c2",   l:"Haute densité, lymphophagocytose marquée, aspect en ciel étoilé", g:[2] },
  { k:"c3",   l:"Foyers de déplétion lymphocytaire corticale", g:[3] },
  { k:"c4",   l:"Déplétion marquée, densité plus élevée dans la médullaire que dans le cortex", g:[4] },
  { k:"cInd", l:"Basophilie corticale perdue — cellularité non jugeable", g:[0, 1, 2, 3, 4] }
];

var MESURE = {
  titre:"Gradation de l'involution (Table 15.8)",
  defLabel:"colonne Architecture",
  optLabel:"colonne Cellularité",
  /* Au survol : la règle d'intersection (fiche § 2, § 5.1) et l'avertissement d'écran (§ 10.5). */
  aide:"Le grade se compose des DEUX colonnes de la Table 15.8 [keeling, ch. 15] : elles s'intersectent, " +
       "elles ne se moyennent jamais. Les grades 0 et 1 partagent le même texte d'architecture : seule la " +
       "Cellularité sépare 0 de 1 — basophilie corticale perdue, le grade ne s'écrit plus en dessous de 0-1 " +
       "(construction de la fiche, à valider, § 9.16). Un cortex mince avant ~24 SA est normal (septa larges, " +
       "lobules espacés) : c'est l'architecture qui sépare immaturité et involution. Fraction corticale : deux " +
       "points seulement, environ 67 % à la mi-gestation (borne perdue) et environ 85 % au terme. Poids : " +
       "médianes du service lues dans les CR, pas dans l'abaque d'origine.",
  defs:ARCH,
  opts:CELL,
  champs:[{ id:"cortex", fv:"FOETO:PF.HEM-NOR-099", label:"Fraction corticale (%)", min:0, max:100, step:1 },
          { id:"poids",  fv:"FOETO:PF.HEM-NOR-100", label:"Poids du thymus (g)",    min:0, max:60,  step:0.01 }]
};

/* Les grades 0 et 1 partagent le même texte d'architecture : la colonne 1 ne
   sépare que 0-1 / 2 / 3 / 4. L'intersection en tire seule le seuil du § 2 —
   basophilie perdue + architecture normale = « 0-1 », jamais « 0 ». */
function composerGrade(){
  var a = E.mesure.def ? par(ARCH, E.mesure.def) : null;
  var c = E.mesure.opt ? par(CELL, E.mesure.opt) : null;
  if (!a && !c) return null;
  if (!a || !c) return { g:(a || c).g, a:a, c:c, partiel:true };
  return { g:a.g.filter(function(x){ return c.g.indexOf(x) >= 0; }), a:a, c:c, partiel:false };
}
function ecrireGrade(g){
  return !g.length ? null : g.length === 1 ? "grade " + g[0] : "grade " + g[0] + "-" + g[g.length - 1];
}

/* Médianes de l'abaque du service, reconstruites depuis les CR eux-mêmes. */
function medianeService(sa){
  var T = [[15, 0.09, "13-14"], [17, 0.17, "15-16"], [19, 0.31, "17-18"], [21, 0.53, "19-20"],
           [23, 0.87, "21-22"], [25, 1.35, "23-24"], [27, 2.01, "25-26"], [29, 2.92, "27-28"],
           [31, 4.14, "29-30"], [33, 5.00, "31-32"], [35, 7.75, "33-34"], [37, 10.33, "35-36"],
           [39, 13.54, "37-38"], [99, 17.50, "39-40"]];
  if (sa < 13) return null;
  for (var i = 0; i < T.length; i++) if (sa < T[i][0]) return { g:T[i][1], bin:T[i][2] };
  return { g:17.50, bin:"39-40" };
}

function verdictMesure(){
  var sa = num("sa"), G = composerGrade(), t = [], res = [], cls = "";

  if (!G) t.push("Involution non gradée — aucune des deux colonnes de la Table 15.8 n'est déclarée.");
  else if (G.partiel){
    cls = "warn";
    t.push("Une seule colonne déclarée (" + (G.a ? "Architecture" : "Cellularité") + ") : " +
           ecrireGrade(G.g) + " au plus large. Le grade se compose des DEUX colonnes.");
  } else if (!G.g.length){
    cls = "bad";
    t.push("DISCORDANCE des deux colonnes : l'architecture porte " + ecrireGrade(G.a.g) +
           ", la cellularité porte " + ecrireGrade(G.c.g) + ". Les deux colonnes ne se recouvrent " +
           "pas — écrire la discordance, ne pas en faire la moyenne.");
  } else {
    cls = "ok";
    t.push("Involution " + ecrireGrade(G.g) + " (architecture " + ecrireGrade(G.a.g) +
           ", cellularité " + ecrireGrade(G.c.g) + ").");
  }
  /* Le seuil opératoire du § 2, tiré de l'intersection et non d'une règle ajoutée. */
  if (G && G.c && G.c.k === "cInd")
    t.push("Basophilie corticale perdue : le grade ne peut plus s'écrire en dessous de 0-1. " +
           "L'architecture seule peut encore porter un 2, un 3 ou un 4 ; elle ne peut jamais porter un 0.");

  var pc = E.mesure.v.cortex;
  if (pc != null){
    if (sa == null) res.push("fraction corticale saisie sans terme — elle ne se situe pas");
    else if (sa >= 39)
      t.push("Fraction corticale " + pc + " % à " + sa + " SA — l'attente au terme est d'environ 85 %.");
    else
      t.push("Fraction corticale " + pc + " % à " + sa + " SA : ININTERPRÉTABLE. Il n'existe pas de " +
             "courbe entre la mi-gestation et le terme — deux points seulement, environ 67 % (borne SA " +
             "perdue à l'extraction) et environ 85 % au terme.");
  }

  var p = E.mesure.v.poids, m = sa == null ? null : medianeService(sa);
  if (p != null){
    if (!m) res.push("poids saisi sans terme exploitable — aucune médiane n'est calculable");
    else {
      t.push("Poids " + p + " g pour une médiane de service de " + m.g + " g (bin " + m.bin +
             " SA, abaque Guihard-Costa et al. 2002 lu dans 96 CR, pas dans l'abaque d'origine).");
      if (m.bin === "31-32")
        res.push("la médiane de 5,00 g du bin 31-32 SA n'a pu être rattachée avec certitude (§ 9.17)");
      if (sa >= 39)
        t.push("Divergence de référentiel NON tranchée (§ 9.3) : [keeling, ch. 27] donne au terme 12 g " +
               "(maximum normal 25 g) ou 10,2 g avec +2 DS à 18 g, soit un facteur d'environ 1,7 sur la " +
               "médiane du service — et le terme de keeling est 40 semaines de gestation, donc 42 SA. " +
               "Le seuil « > 2 DS » de l'hyperplasie change de conclusion selon l'abaque : écrire lequel " +
               "on retient.");
      if (p < m.g / 2)
        t.push("Poids abaissé — trois causes et une seule valeur : involution, rétention, prélèvement " +
               "partiel. Vérifier la dissection avant de lire la lame.");
    }
  }

  if (!E.prelev.medullaire)
    res.push("médullaire non confirmée — fraction corticale, définition cortico-médullaire, inversion " +
             "de densité et tassement des Hassall deviennent indéterminables");
  if (!E.prelev.hassall)
    res.push("aucun corpuscule de Hassall confirmé — rien ne prouve qu'il s'agit de thymus");
  if (E.signes.cortexPale === POS && E.mesure.opt && E.mesure.opt !== "cInd")
    res.push("cortex moins basophile répondu présent alors que la cellularité est déclarée jugeable — la perte de " +
             "basophilie de macération et le rang 2 de l'involution sont le même signe");
  if (res.length){
    if (cls !== "bad") cls = "warn";
    t.push("Réserves : " + res.join(" ; ") + ".");
  }
  return { cls:cls, txt:t.join(" ") };
}

/* ── Variantes normales — chacune dans le cadre dont elle mime un signe ───── */
var VARIANTES = [
  { k:"extensionsCerv", fv:"FOETO:PF.HEM-NOR-108", g:"Contexte hors lame — macro, autres organes, clinique", l:"Extensions cervicales du thymus" },
  { k:"nodulesLibres", g:"Contexte hors lame — macro, autres organes, clinique",  l:"Nodules thymiques non connectés à la glande" },
  { k:"parathyroideVar", g:"Kyste et tissu parathyroïdien", l:"Tissu parathyroïdien dans un lobule thymique" },
  { k:"ehmSeptale", fv:"FOETO:PF.HEM-NOR-111", g:"Déplétion non liée au stress",      l:"Hématopoïèse dans la capsule, les septa et le long des vaisseaux" },
  { k:"ehmEosino", g:"Déplétion non liée au stress",       l:"Éléments myéloïdes purement éosinophiles" },
  { k:"cielDiscret", g:"Cellularité corticale",            l:"Ciel étoilé discret — macrophages à corps tingibles physiologiques" },
  { k:"apoptose", g:"Cellularité corticale",               l:"Apoptose lymphocytaire corticale" },
  { k:"bPeriHassall", g:"Hyperplasie et prolifération lymphoïde", l:"Lymphocytes B isolés autour des corpuscules de Hassall" },
  { k:"gradientCortex", fv:"FOETO:PF.HEM-NOR-109", g:"Cellularité corticale",         l:"Grands lymphocytes sous-capsulaires, plus petits en profondeur" },
  { k:"capsuleMince", fv:"FOETO:PF.HEM-NOR-102", g:"Architecture lobulaire",          l:"Capsule mince — elle le reste toute la gestation" }
];

/* Cadres dans l'ordre de lecture : ce que porte la coupe, puis les deux colonnes de
   la Table 15.8 (critères, pas grade), puis les autres constats. */
var CADRES = [
  { g:"Contexte hors lame — macro, autres organes, clinique", hors:true },
  { g:"Repères manquants ou reliquat seul", sur:"Ce que porte la coupe" },
  { g:"Architecture lobulaire", sur:"Critères de la Table 15.8 — le grade se compose en Maturation" },
  { g:"Cellularité corticale", sur:"Critères de la Table 15.8 — le grade se compose en Maturation" },
  { g:"Hémorragie et artefacts", sur:"Autres constats" },
  { g:"Kyste et tissu parathyroïdien", sur:"Autres constats" },
  { g:"Déplétion non liée au stress", sur:"Autres constats" },
  { g:"Surcharge", sur:"Autres constats" },
  { g:"Hyperplasie et prolifération lymphoïde", sur:"Autres constats" }
];

/* ── Signes ───────────────────────────────────────────────────────────────────
   On coche ce qu'on voit, un signe à la fois. Aucun nom de maladie ici : les
   noms se lisent dans les associations, par association des signes présents.
   La SÉVÉRITÉ de l'involution n'est pas un signe non plus : elle se compose en
   Maturation, sur les deux colonnes de la Table 15.8. Un signe branché (fv) prend
   son libellé et son HPO dans FOETO. */
var SIGNES = [
  /* — Contexte hors lame — macro, autres organes, clinique — */
  { k:"poidsBas", fv:"FOETO:PF.HEM-MAL-036", g:"Contexte hors lame — macro, autres organes, clinique", l:"Poids abaissé pour le terme" },
  { k:"poidsEleve", fv:"FOETO:PF.HEM-MAL-028", g:"Contexte hors lame — macro, autres organes, clinique" },
  { k:"masse2pc", fv:"FOETO:PF.HEM-NOR-124", fiche:"[keeling, ch. 27]", g:"Contexte hors lame — macro, autres organes, clinique", l:"Thymus représentant plus de 2 % de la masse corporelle" },
  { k:"thymusAbsent", fv:"FOETO:PF.HEM-MAL-038", g:"Contexte hors lame — macro, autres organes, clinique",
    meta:"constat macro — « Son absence complète est rare même dans les cardiopathies cono-truncales » : chercher le reliquat histologique (médiastin antérieur ET cou)" },
  { k:"petechies", fv:"FOETO:PF.HEM-MAL-035", g:"Contexte hors lame — macro, autres organes, clinique",
    meta:"constat macroscopique — ne pas le reporter en micro" },
  { k:"noduleEctopique", fv:"FOETO:PF.HEM-NOR-116", g:"Contexte hors lame — macro, autres organes, clinique",
    l:"Nodule thymique isolé dans le cou, la thyroïde ou la parathyroïde",
    meta:"commun et normal chez le fœtus — lu sur le bloc thyroïdien ou cervical, un autre prélèvement" },
  { k:"cardiopathieCT", fv:"FOETO:PF.HEM-MAL-021", g:"Contexte hors lame — macro, autres organes, clinique", meta:"lu hors thymus" },
  { k:"malfoAssociees", fiche:"[soffoet, ch. 3]", g:"Contexte hors lame — macro, autres organes, clinique", l:"Anomalies rénales, spina bifida ou anomalies des extrémités",
    meta:"lu hors thymus" },
  { k:"hypoplasieParathyr", fv:"FOETO:PF.HEM-MAL-029", g:"Contexte hors lame — macro, autres organes, clinique",
    meta:"même défaut des 3e et 4e poches pharyngées que l'hypoplasie thymique [keeling, ch. 27]" },
  { k:"diabeteMaternel", fv:"FOETO:PF.HEM-MAL-026", g:"Contexte hors lame — macro, autres organes, clinique",
    meta:"contexte, jamais critère : « more than half of stillbirths occurring in diabetic mothers » ont un petit placenta et une involution aiguë [keeling, ch. 15]" },
  { k:"langerhansVol", fiche:"[soffoet, ch. 16]", g:"Contexte hors lame — macro, autres organes, clinique", l:"Îlots de Langerhans volumineux", meta:"lu hors thymus" },
  { k:"surrenaleLipoide", fv:"FOETO:PF.HEM-MAL-058", fiche:"[soffoet, ch. 16]", g:"Contexte hors lame — macro, autres organes, clinique", l:"Dégénérescence lipoïdique de la zone fœtale surrénalienne",
    meta:"lu hors thymus" },
  { k:"steatoseHep", fv:"FOETO:PF.HEM-MET-014", fiche:"[soffoet, ch. 16]", g:"Contexte hors lame — macro, autres organes, clinique", l:"Stéatose hépatique et déplétion glycogénique", meta:"lu hors thymus" },
  { k:"tubesRenauxDil", fv:"FOETO:PF.HEM-MAL-059", fiche:"[soffoet, ch. 16]", g:"Contexte hors lame — macro, autres organes, clinique", l:"Tubes rénaux dilatés", meta:"lu hors thymus" },
  { k:"placentaPetit", fv:"FOETO:PF.HEM-MAL-060", fiche:"[keeling, ch. 15]", g:"Contexte hors lame — macro, autres organes, clinique", l:"Petit placenta", meta:"lu hors thymus" },
  /* — Repères manquants ou reliquat seul — */
  { k:"medullaireAbsente", fv:"FOETO:PF.HEM-MAL-061", fiche:"[keeling, ch. 15]", g:"Repères manquants ou reliquat seul", mag:"faible", l:"Pas de médullaire sur la coupe",
    meta:"quatre des cinq critères de gradation deviennent indéterminables" },
  { k:"reliquat", fv:"FOETO:PF.HEM-MAL-037", g:"Repères manquants ou reliquat seul", mag:"faible",
    meta:"le mot exact du geste diagnostique en cardiopathie cono-troncale — jamais l'aplasie sur une macro négative" },
  { k:"hassallAbsents", seul:true, fiche:"[ernst, ch. 24]", g:"Repères manquants ou reliquat seul", mag:"moyen", l:"Aucun corpuscule de Hassall sur la coupe" },
  /* — Architecture lobulaire (colonne 1 de la Table 15.8) — */
  { k:"lobulesSepares", terme:[24, null], fv:"FOETO:PF.HEM-NOR-098", g:"Architecture lobulaire", mag:"faible", l:"Lobules séparés, septa élargis" },
  { k:"interstitiumProem", fv:"FOETO:PF.HEM-MAL-030", g:"Architecture lobulaire", mag:"faible" },
  { k:"cmFloue", seul:true, fv:"FOETO:PF.HEM-MAL-034", g:"Architecture lobulaire", mag:"faible", meta:"le seuil du grade 3" },
  { k:"cortexRetreci", terme:[24, null], fv:"FOETO:PF.HEM-CLA-001", g:"Architecture lobulaire", mag:"faible",
    meta:"aussi l'image du thymus immature de la mi-gestation" },
  { k:"cortexDisparu", fv:"FOETO:PF.HEM-MAL-027", g:"Architecture lobulaire", mag:"faible" },
  { k:"hassallTasses", fv:"FOETO:PF.HEM-NOR-070", g:"Architecture lobulaire", mag:"moyen",
    meta:"rang 6 de la séquence — aucune source ne dit à quel grade il correspond" },
  /* — Cellularité corticale (colonne 2 de la Table 15.8) — */
  { k:"cortexPale", fv:"FOETO:PF.HEM-MAL-025", g:"Cellularité corticale", mag:"faible",
    meta:"le signe de la lésion ET celui de la macération, sur le même compartiment" },
  { k:"inversionDensite", fv:"FOETO:PF.HEM-NOR-097", g:"Cellularité corticale", mag:"faible", meta:"le seuil du grade 4" },
  { k:"deplFoyers", fv:"FOETO:PF.HEM-CLA-002", g:"Cellularité corticale", mag:"faible", l:"Foyers de déplétion lymphocytaire corticale",
    meta:"en foyers : la Cellularité du grade 3 ; l'étendue se gradue en Maturation" },
  { k:"cielEtoile", fv:"FOETO:PF.HEM-NOR-096", g:"Cellularité corticale", mag:"moyen",
    meta:"macrophages à corps tingibles démasqués — physiologiques en eux-mêmes" },
  { k:"lymphophagoMarquee", fiche:"[keeling, ch. 15]", g:"Cellularité corticale", mag:"moyen", l:"Lymphophagocytose corticale marquée" },
  { k:"lymphophagoFocale", fv:"FOETO:PF.HEM-MAL-031", g:"Cellularité corticale", mag:"fort", l:"Lymphophagocytose corticale focale",
    meta:"présente même focale : le seul critère qui sépare le grade 0 du grade 1" },
  { k:"epithDemasquees", fv:"FOETO:PF.HEM-MAL-022", g:"Cellularité corticale", mag:"fort",
    meta:"normalement masquées par la densité lymphocytaire : leur visibilité est déjà le rang 1" },
  { k:"lyseCorticale", fv:"FOETO:PF.HEM-MAL-032", g:"Cellularité corticale", mag:"fort",
    meta:"« lysis or apoptosis of the many dark-staining cortical lymphocytes » — quelques apoptoses sont physiologiques (variante)" },
  /* — Hémorragie et artefacts — */
  { k:"foyersHemo", fiche:"[corpus CR]", g:"Hémorragie et artefacts", mag:"faible", l:"Foyers hémorragiques intraparenchymateux",
    meta:"aucun critère histologique ne le sépare du saignement de dissection" },
  { k:"blueBlobs", fv:"FOETO:PF.HEM-NOR-101", g:"Hémorragie et artefacts", mag:"moyen", l:"« Blue blobs » du parenchyme" },
  { k:"poussiereBaso", fv:"FOETO:PF.HEM-NOR-117", fiche:"[ernst, ch. 37]", g:"Hémorragie et artefacts", mag:"moyen", l:"Poussière basophile péri-viscérale",
    meta:"Gram tissulaire avant de conclure" },
  /* — Kyste et tissu parathyroïdien (le nodule ectopique se lit sur un autre prélèvement : hors lame) — */
  { k:"kysteThymique", fiche:"[keeling, ch. 27]", g:"Kyste et tissu parathyroïdien", mag:"faible", l:"Kyste bordé dans un tissu thymique" },
  { k:"parathyroide", fv:"FOETO:PF.HEM-NOR-122", g:"Kyste et tissu parathyroïdien", mag:"moyen",
    meta:"origine commune, 3e poche pharyngée" },
  /* — Déplétion non liée au stress — */
  { k:"infiltratLH", fv:"FOETO:PF.HEM-INF-012", g:"Déplétion non liée au stress", mag:"moyen" },
  { k:"inclusionNucl", fiche:"[corpus CR]", g:"Déplétion non liée au stress", mag:"fort", l:"Inclusion nucléaire ou cellule géante" },
  { k:"macrophagesCD4", fv:"FOETO:PF.HEM-MAL-033", g:"Déplétion non liée au stress", mag:"technique",
    l:"Macrophages CD4 positifs dans une déplétion" },
  /* — Surcharge — */
  { k:"gaucher", fv:"FOETO:PF.HEM-MAL-023", g:"Surcharge", mag:"fort",
    meta:"vue en HES à fort grossissement ; le PAS la confirme" },
  { k:"vacuolisees", fv:"FOETO:PF.HEM-MET-009", g:"Surcharge", mag:"fort",
    meta:"à chercher à fort grossissement ou à l'immersion" },
  { k:"surchargeFer", fiche:"[corpus CR]", g:"Surcharge", mag:"fort", l:"Surcharge en fer",
    meta:"porte le négatif v1 sur la surcharge en fer — corpus, sans source de livre" },
  /* — Hyperplasie et prolifération lymphoïde — */
  { k:"centreGerminatif", fv:"FOETO:PF.HEM-MAL-024", g:"Hyperplasie et prolifération lymphoïde", mag:"faible",
    meta:"le cortex fœtal normal n'en a pas" },
  { k:"lameNormaleAge", fv:"FOETO:PF.HEM-NOR-125", bloc:false, fiche:"[keeling, ch. 27]", g:"Hyperplasie et prolifération lymphoïde", mag:"faible",
    l:"Lame d'aspect normal pour l'âge",
    meta:"constat d'ensemble, à répondre après les autres cadres — « with retention of normal microscopic appearances for age »" },
  { k:"amasPeriHassall", fiche:"[ernst, ch. 24]", g:"Hyperplasie et prolifération lymphoïde", mag:"moyen", l:"Amas lymphoïde autour d'un corpuscule de Hassall",
    meta:"lymphocytes B isolés normaux — ce n'est pas un centre germinatif" }
];

/* ── Associations — affichées, jamais cochées ─────────────────────────────────
   Le nom se déduit des signes. « cle » est le signe pivot : sans lui le compte
   peut être atteint sans que l'association tienne. */
var DIAGS = [
  { k:"involution", l:"Involution thymique de stress (involution aiguë)", fv:"FOETO:PF.HEM-CLA-005", min:2,
    signes:["lymphophagoFocale","lymphophagoMarquee","cielEtoile","epithDemasquees","cortexPale",
            "cortexRetreci","cmFloue","cortexDisparu","deplFoyers","inversionDensite",
            "lobulesSepares","interstitiumProem","hassallTasses","poidsBas","lyseCorticale"],
    stop:" — la sévérité ne se déduit PAS du nombre de signes cochés : le grade se compose en Maturation sur " +
         "les deux colonnes de la Table 15.8. Le cortex pâle, le ciel étoilé et les cellules épithéliales " +
         "démasquées sont aussi produits par la macération et par l'apoptose physiologique. Et la micro " +
         "décrit un grade, elle ne nomme pas le mécanisme : ni « hypoxie chronique », ni chorioamniotite, " +
         "ni RCIU, ni diabète maternel. Enfin la réversibilité n'a pas de cinétique — un grade 2 chez un " +
         "fœtus mort peut être un stress en cours ou résolu, rien ne les sépare sur la lame." },

  { k:"maceration", l:"Pâleur corticale post-mortem contrefaisant l'involution", cle:"cortexPale", min:2,
    signes:["cortexPale","cielEtoile","epithDemasquees","blueBlobs","poussiereBaso","lobulesSepares"],
    stop:" — aucune technique ne tranche. Perte de basophilie de macération et rang 2 de l'involution " +
         "sont le même signe sur le même compartiment : « can overlap with loss of nuclear basophilia " +
         "from maceration ». Ce qui tranche est ailleurs — la colonne Architecture (septa fins et lobules " +
         "serrés = pâleur non accompagnée, donc post-mortem) et le rang des AUTRES organes, le thymus " +
         "étant absent de la Table 15.6. La séparation des lobules par rétraction post-mortem n'est, elle, " +
         "documentée nulle part au thymus." },

  { k:"immaturite", l:"Thymus immature normal contrefaisant l'involution", min:2,
    signes:["cortexRetreci","lobulesSepares","cmFloue"],
    stop:" — c'est l'immaturité qui contrefait la lésion, l'inverse du piège de la macération : à la " +
         "mi-gestation « the interlobular septa are wider, and the cortex is thinner » et le cortex est " +
         "« a small cap at the tips of the lobules ». Le seul recours est le terme déclaré, et il n'y a " +
         "pas de courbe de fraction corticale entre la mi-gestation et le terme." },

  { k:"nonGradable", l:"Gradation impossible — les critères ne sont pas portés par la coupe",
    cle:"medullaireAbsente", min:1,
    signes:["medullaireAbsente","hassallAbsents","cortexPale"],
    stop:" — écrire « indéterminable » et dire pourquoi. Sans médullaire, quatre des cinq critères de " +
         "gradation tombent : fraction corticale, définition cortico-médullaire, inversion de densité, " +
         "tassement des corpuscules de Hassall. Sans corpuscule de Hassall, rien ne prouve qu'il s'agit " +
         "de thymus." },

  { k:"hypoplasie", l:"Hypoplasie ou aplasie thymique — spectre 22q11.2", fv:["FOETO:PF.HEM-MAL-003","FOETO:PF.HEM-MAL-039","FOETO:PF.HEM-MAL-041"], cle:"reliquat", min:1,
    signes:["reliquat","thymusAbsent","poidsBas","cardiopathieCT","malfoAssociees","hypoplasieParathyr"],
    stop:" — ne jamais conclure à l'aplasie sur une macro négative : « Son absence complète est rare même " +
         "dans les cardiopathies cono-truncales », où il faut en rechercher les reliquats histologiques. " +
         "Prélever le médiastin antérieur ET le cou. La micro écrit « thymus de petite taille » ou " +
         "« reliquat thymique histologique » ; DiGeorge et 22q11 se nomment après la FISH, jamais sur la lame. " +
         "Le CHARGE donne aussi une hypoplasie thymique fréquente [soffoet, ch. 23]." },

  { k:"hyperplasieLymphoide", l:"Hyperplasie lymphoïde thymique", fv:"FOETO:PF.HEM-MAL-042", cle:"centreGerminatif", min:1,
    signes:["centreGerminatif","poidsEleve","masse2pc"],
    stop:" — un amas lymphoïde autour d'un corpuscule de Hassall n'est PAS un centre germinatif : les " +
         "lymphocytes B y sont isolés et normaux. Le critère est le centre germinatif constitué, que le " +
         "cortex fœtal normal n'a pas — « a sheet without distinct follicle or germinal center formation »." },

  { k:"hyperplasieVraie", l:"Hyperplasie thymique vraie", fv:["FOETO:PF.HEM-MAL-043","FOETO:PF.HEM-MAL-049"], cle:"lameNormaleAge", min:2,
    signes:["lameNormaleAge","poidsEleve","masse2pc"],
    stop:" — la lame est normale pour l'âge : c'est le poids qui parle, et le seuil « more than 2 standard " +
         "deviations from the median weight for age » change de sens selon l'abaque — environ 17,50 g au " +
         "terme pour le service contre 12 g, ou 10,2 g avec +2 DS à 18 g, pour keeling. Hémorragie, " +
         "surcharge métabolique et Wiedemann-Beckwith donnent aussi un gros thymus." },

  { k:"ectopie", l:"Thymus ectopique ou kyste thymique", fv:["FOETO:PF.HEM-MAL-048","FOETO:PF.HEM-MAL-045"], min:2,
    signes:["noduleEctopique","kysteThymique","parathyroide"],
    stop:" — la plupart des nodules thymiques ectopiques du fœtus sont NORMAUX : « a common finding in " +
         "fetuses », et le corpus les écrit « choristome thymique intrathyroïdien (bénin) » et « tissu " +
         "thymique ectopique normal (pas de valeur pathologique) ». Les extensions cervicales sont " +
         "normales et font partie de l'organe. Ne pas coder une ectopie comme une lésion." },

  { k:"surcharge", l:"Surcharge lysosomale — le thymus est un site de lecture", fv:["FOETO:PF.HEM-MET-010","FOETO:PF.HEM-MAL-047"], min:1,
    signes:["gaucher","vacuolisees"],
    stop:" — la cellule de surcharge n'est caractéristique que dans la maladie de Gaucher ; ailleurs " +
         "l'aspect n'est pas caractéristique sur coloration standard, ce sont des « cellules au " +
         "cytoplasme vacuolisé » à chercher à fort grossissement et à l'immersion. Ces cellules restent " +
         "devinables sur un fœtus macéré de 24 SA : c'est l'un des rares constats qui survive à la " +
         "rétention sur cet organe." },

  { k:"hemorragie", l:"Hémorragie thymique", fv:"FOETO:PF.HEM-VAS-003", cle:"foyersHemo", min:1,
    signes:["foyersHemo","petechies","poidsEleve"],
    stop:" — aucun critère histologique ne sépare l'hémorragie du saignement de dissection : « ce tronc " +
         "veineux passe parfois en avant du thymus » ou y est enchâssé, et il se sectionne au retrait de " +
         "l'organe. Seul le compte rendu de dissection tranche. Les pétéchies de surface sont un constat " +
         "macroscopique, à ne pas reporter en micro, et l'attribution « anoxie aiguë » est la pratique du " +
         "service, pas une donnée des livres." },

  { k:"deplNonStress", fv:["FOETO:PF.HEM-INF-013","FOETO:PF.HEM-MAL-040","FOETO:PF.HEM-MAL-046"], l:"Déplétion lymphoïde non liée au stress", min:2,
    signes:["deplFoyers","inversionDensite","macrophagesCD4","infiltratLH","inclusionNucl"],
    stop:" — la lame ne tranche pas ce différentiel : le VIH donne une « déplétion thymique lymphocytaire " +
         "avec présence de macrophages CD4 », la lymphohistiocytose hémophagocytaire un infiltrat diffus, " +
         "et les appearances de l'involution « may be difficult to distinguish from those seen in many " +
         "immunodeficiency syndromes ». Une déplétion corticale isolée n'établit pas le stress." },

  { k:"faisceauHypoxie", l:"Faisceau d'hypoxie chronique — cinq organes, jamais le thymus seul",
    fv:"FOETO:PF.HEM-MAL-044", cle:"deplFoyers", min:3,
    signes:["deplFoyers","langerhansVol","surrenaleLipoide","steatoseHep","tubesRenauxDil","placentaPetit"],
    stop:" — soffoet range le thymus dans un faisceau de cinq organes, jamais seul, et la divergence " +
         "n'est pas tranchée : keeling écrit qu'un petit thymus anténatal est associé à la prématurité, " +
         "la chorioamniotite et le sepsis néonatal, « but not with fetal growth restriction », alors que " +
         "28 CR du service concluent « hypoxie chronique ». Écrire laquelle des deux lectures on retient." }
];

/* ── Négatifs obligatoires — déduits des signes ───────────────────────────────
   Un seul des 29 CR mentionnant le thymus énonce des négatifs. Cette liste est
   donc proposée depuis les livres, pas relevée dans l'usage (§ 9.22). */
var NEGATIFS = [
  { k:"lymphophago", l:"Absence de lymphophagocytose corticale", p:"le seul négatif qui rende le grade 0 opposable",
    ko:"lymphophagocytose corticale PRÉSENTE — le grade 0 n'est plus opposable",
    auto:function(){
      var a = E.signes.lymphophagoFocale, b = E.signes.lymphophagoMarquee;
      return a === POS || b === POS ? false : a === NEG && b === NEG ? true : null; } },
  { k:"cmConservee", signe:"cmFloue", l:"Définition cortico-médullaire conservée à faible grossissement", p:"le seuil du grade 3",
    ko:"définition cortico-médullaire PERDUE à faible grossissement — seuil du grade 3" },
  { k:"pasInversion", signe:"inversionDensite", l:"Absence d'inversion de densité cortex / médullaire", p:"le seuil du grade 4",
    ko:"inversion de densité PRÉSENTE — seuil du grade 4" },
  { k:"lobulesSerres", signe:"lobulesSepares", l:"Lobules serrés, septa fins", p:"le seul négatif qui survive à la macération",
    ko:"lobules séparés et septa élargis — mais la rétraction post-mortem au thymus n'est documentée nulle part" },
  { k:"hassall", l:"Corpuscules de Hassall présents et non tassés", p:"rang 6 de la séquence d'involution",
    ko:"corpuscules de Hassall absents ou tassés",
    auto:function(){
      var a = E.signes.hassallAbsents, b = E.signes.hassallTasses;
      return a === POS || b === POS ? false : a === NEG && b === NEG ? true : null; } },
  { k:"pasCentreGerm", signe:"centreGerminatif", l:"Absence de centre germinatif", p:"le critère de l'hyperplasie lymphoïde",
    ko:"centre germinatif CONSTITUÉ" },
  { k:"pasSurcharge", l:"Absence de cellule de surcharge", p:"« thymus en particulier » dans le négatif du corpus",
    ko:"cellule de surcharge PRÉSENTE — confirmer au PAS, à l'immersion",
    auto:function(){
      var a = E.signes.gaucher, b = E.signes.vacuolisees;
      return a === POS || b === POS ? false : a === NEG && b === NEG ? true : null; } },
  { k:"pasInclusion", signe:"inclusionNucl", l:"Absence d'inclusion nucléaire et de cellule géante", p:"1 CR sur 29 énonce ces négatifs",
    ko:"inclusion nucléaire ou cellule géante PRÉSENTE" },
  { k:"pasFer", signe:"surchargeFer", l:"Absence de surcharge en fer", p:"énoncée en bloc par le seul CR négatif",
    ko:"surcharge en fer PRÉSENTE" },
  { k:"pasHemo", signe:"foyersHemo", l:"Absence de foyer hémorragique", p:"différentiel avec le saignement de dissection",
    ko:"foyer hémorragique PRÉSENT — reprendre le compte rendu de dissection" },
  { k:"medullaire", signe:"medullaireAbsente", l:"Présence de médullaire sur la coupe", p:"sans elle, aucun négatif ci-dessus n'est opposable",
    ko:"pas de médullaire sur la coupe — les négatifs ne sont pas opposables" },
  { k:"grade", l:"Grade d'involution composé sur les deux colonnes", p:"aucun des 29 CR n'écrit un grade 0-4",
    ko:"grade NON composé — la gradation existe dans les livres, pas dans la pratique du service",
    auto:function(){ var G = composerGrade(); return G && !G.partiel ? true : null; } }
];

/* ── Techniques ───────────────────────────────────────────────────────────── */
var TECHNIQUES = [
  { k:"autresOrganes", l:"Relire le rang des AUTRES organes (Table 15.6)",
    q:"cortex pâle : involué ou macéré ? aucune technique ne tranche" },
  { k:"pas",       l:"PAS", q:"cellules de surcharge, à fort grossissement ou à l'immersion" },
  { k:"ck",        l:"Cytokératine", q:"ces cellules pâles du cortex sont-elles épithéliales ?" },
  { k:"ihcBT",     l:"IHC de lignée B / T", q:"centre germinatif ? lymphocyte B ou T ?" },
  { k:"cd4",       l:"IHC CD4", q:"cette déplétion est-elle celle du VIH ?" },
  { k:"hes",       l:"HES sur le nodule", q:"ce nodule est-il du thymus ? le repère est le corpuscule de Hassall" },
  { k:"thymosine", l:"IHC thymosine alpha 1 / thymopoïétine", q:"sous-typer les cellules épithéliales corticales" },
  { k:"trichrome", l:"Trichrome de Masson",
    q:"architecture sur macéré sévère — proposé pour le foie, NON validé sur le thymus" },
  { k:"gram",      l:"Gram tissulaire", q:"poussière basophile péri-viscérale : bactéries ou artefact ?" },
  { k:"fish",      l:"FISH 22q11.2", q:"anomalie thymique avec cardiopathie conotroncale, rein, spina bifida, pieds bots" },
  { k:"adn",       l:"Envoi du congelé en génétique", q:"polymalformatif, métabolique, akinésie fœtale" }
];

/* ── Propositions de techniques — déduites des clics, jamais imposées ─────── */
function suggerer(){
  var s = {};
  function un(){ for (var i = 0; i < arguments.length; i++) if (E.signes[arguments[i]] === POS) return true;
                 return false; }
  function enDefaut(k){ return etatNegatif(par(NEGATIFS, k)) === "ko"; }

  /* Les propositions suivent les SIGNES : une technique se demande sur ce qu'on
     a vu, pas sur le nom qu'on lui donnerait. */
  if (un("cortexPale","cielEtoile","epithDemasquees","cortexRetreci")) s.autresOrganes = 1;
  if (un("epithDemasquees")){ s.ck = 1; s.thymosine = 1; }
  if (un("cortexPale","blueBlobs","lobulesSepares")) s.trichrome = 1;
  if (un("gaucher","vacuolisees")) s.pas = 1;
  if (un("centreGerminatif","amasPeriHassall")) s.ihcBT = 1;
  if (un("deplFoyers","inversionDensite","macrophagesCD4","infiltratLH")) s.cd4 = 1;
  if (un("noduleEctopique","kysteThymique","parathyroide")) s.hes = 1;
  if (un("poussiereBaso")) s.gram = 1;
  /* v1 : “reliquat” portait aussi la glande non retrouvée, scindée en v2 */
  if (un("reliquat","thymusAbsent","cardiopathieCT","malfoAssociees")) s.fish = 1;

  if (E.retention.poussiereRet === "present") s.gram = 1;
  if (E.retention.cortexPaleRet === "present"){ s.autresOrganes = 1; s.trichrome = 1; }
  /* v1 : négatifs cochés “en défaut” ; v2 : déduits des signes */
  if (enDefaut("pasSurcharge")) s.pas = 1;
  if (enDefaut("pasCentreGerm")) s.ihcBT = 1;
  if (enDefaut("medullaire")) s.autresOrganes = 1;
  if (E.prelev.congele && SIGNES.some(function(x){ return E.signes[x.k] === POS; })) s.adn = 1;
  return s;
}

/* ── Contrôles propres au thymus ──────────────────────────────────────────── */
async function testsOrgane(chk, clic, set, crTient, pause){
  /* Le banc commun laisse des signes posés : on part d'un état voulu, pas supposé. */
  function pose(k, v){ if (E.signes[k] !== v) clic("les", k, v); }
  function ote(k){ if (E.signes[k]) clic("les", k, E.signes[k]); }
  function tenue(k){ return associations().some(function(a){ return a.d.k === k && a.tenu; }); }
  function grade(a, c){
    if (E.mesure.def !== a) clic("mdef", a);
    if (E.mesure.opt !== c) clic("mopt", c);
    var G = composerGrade();
    return G.g.length ? ecrireGrade(G.g) : "discordance";
  }

  /* La Table 15.8 est bi-colonne : le grade est une INTERSECTION, jamais une moyenne. */
  chk("architecture seule ne sépare pas 0 de 1", par(ARCH, "a01").g.length === 2);
  chk("0 + pas de lymphophagocytose = grade 0",  grade("a01", "c0")  === "grade 0");
  chk("0-1 + lymphophagocytose focale = grade 1", grade("a01", "c1") === "grade 1");
  chk("architecture 3 tranche seule",             grade("a3", "cInd") === "grade 3");
  chk("basophilie perdue : jamais en dessous de 0-1", grade("a01", "cInd") === "grade 0-1");
  chk("le seuil du § 2 est écrit", crTient("le grade ne peut plus s'écrire en dessous de 0-1"));
  chk("colonnes incompatibles = discordance",     grade("a2", "c4") === "discordance");
  chk("la discordance ne se moyenne pas", crTient("ne pas en faire la moyenne") && !crTient("grade 3 "));
  chk("les deux colonnes obligatoires",           par(CELL, "cInd").g.length === 5);

  clic("mopt", "c4");
  chk("une seule colonne ne compose pas", crTient("Une seule colonne déclarée"));
  clic("mdef", "a2");

  /* v2 : le négatif “grade composé” se déduit des deux colonnes déclarées */
  chk("négatif grade : ouvert sans les deux colonnes", etatNegatif(par(NEGATIFS, "grade")) === null);
  grade("a3", "c3");
  chk("négatif grade : énoncé sur les deux colonnes", etatNegatif(par(NEGATIFS, "grade")) === "ok");
  clic("mdef", "a3"); clic("mopt", "c3");

  /* La fraction corticale n'a pas de courbe entre la mi-gestation et le terme */
  set("sa", "30");
  set("m_cortex", "75");
  chk("fraction corticale ininterprétable", crTient("ININTERPRÉTABLE") && crTient("pas de courbe"));
  set("sa", "40");
  chk("attente au terme", crTient("l'attente au terme est d'environ 85 %"));

  /* Le poids : deux abaques, un facteur 1,7, aucune arbitration */
  chk("médiane du service au terme", medianeService(40).g === 17.50);
  chk("médiane à 26 SA",             medianeService(26).g === 2.01);
  chk("bin 31-32 douteux",           medianeService(32).bin === "31-32");
  set("m_poids", "6");
  chk("médiane affichée",   crTient("médiane de service de 17.5 g"));
  chk("divergence portée",  crTient("facteur d'environ 1,7") && crTient("10,2 g avec +2 DS à 18 g"));
  chk("poids bas explicité", crTient("trois causes et une seule valeur"));
  set("m_poids", "");
  set("m_cortex", "");
  chk("v2 : avertissement d'écran au survol", /architecture qui sépare immaturité et involution/.test(
      $("m_cortex").parentNode.querySelector("label").title));

  /* La maturation n'a pas de stades : les deux notes le disent */
  clic("stade", "cortexMince");
  chk("pas de stades au thymus", crTient("Il n'y a PAS de stades au thymus"));
  chk("l'immaturité contrefait la lésion", crTient("c'est l'immaturité qui contrefait la lésion"));
  clic("stade", "cortexMince");

  /* Divergences portées, jamais arbitrées */
  chk("85 % contre démarcation floue", par(STADES, "cortex85").note.indexOf("NON tranchée") >= 0);
  chk("unité des bornes non précisée", par(STADES, "cordons").note.indexOf("± 2 SA") >= 0);
  chk("thymus absent de la Table 15.6", par(RETENTION, "horsThymus").note.indexOf("aucun des dix rangs") >= 0);
  chk("rétraction post-mortem par analogie",
      par(RETENTION, "lobulesSeparesRet").note.indexOf("PAR ANALOGIE") >= 0);
  chk("RCIU : divergence non tranchée", par(DIAGS, "faisceauHypoxie").stop.indexOf("n'est pas tranchée") >= 0);
  chk("le grade ne se déduit pas des signes",
      par(DIAGS, "involution").stop.indexOf("ne se déduit PAS du nombre de signes") >= 0);

  /* Le nom se déduit des signes — il ne se coche pas */
  chk("aucun bouton ne porte un diagnostic",
      DIAGS.every(function(d){ return !document.querySelector('[data-act="les"][data-k="' + d.k + '"]'); }));
  chk("aucun bouton ne porte un grade",
      !document.querySelector('[data-act="les"][data-k="grade4"]'));
  /* Règle actée : l'involution est une gradation de sévérité — MESURE, jamais stades ni signes */
  chk("involution : en MESURE, jamais en stades ni en signes",
      MESURE.defs === ARCH && MESURE.opts === CELL &&
      !STADES.some(function(s){ return /involution|grade/i.test(s.l); }) &&
      !SIGNES.some(function(x){ return x.fv === "FOETO:PF.HEM-NOR-095" || x.fv === "FOETO:PF.HEM-CLA-005" ||
                                       /involution|grade \d/i.test(x.l); }));

  /* Le piège central : un seul signe, deux lectures affichées ensemble */
  SIGNES.forEach(function(x){ ote(x.k); });
  pose("cortexPale", POS);
  pose("cielEtoile", POS);
  chk("la macération se lit",  tenue("maceration"));
  chk("l'involution se lit aussi", associations().some(function(a){ return a.d.k === "involution"; }));
  chk("les deux lectures sont au CR", crTient("Involution thymique de stress") &&
      crTient("Pâleur corticale post-mortem"));
  chk("cortex pâle propose les autres organes", suggerer().autresOrganes === 1);
  ote("cortexPale"); ote("cielEtoile");

  /* Sans médullaire, la gradation tombe */
  pose("medullaireAbsente", POS);
  chk("gradation impossible", tenue("nonGradable") && crTient("quatre des cinq critères de gradation tombent"));
  chk("sans médullaire, négatif en défaut et autres organes proposés",
      etatNegatif(par(NEGATIFS, "medullaire")) === "ko" && suggerer().autresOrganes === 1);
  ote("medullaireAbsente");

  /* Un amas péri-Hassall n'est pas un centre germinatif */
  pose("amasPeriHassall", POS);
  pose("poidsEleve", POS);
  chk("amas péri-Hassall ne tient pas l'hyperplasie lymphoïde", !tenue("hyperplasieLymphoide"));
  pose("centreGerminatif", POS);
  chk("centre germinatif la tient",  tenue("hyperplasieLymphoide"));
  chk("hyperplasie propose l'IHC B/T", suggerer().ihcBT === 1);
  ote("centreGerminatif"); ote("amasPeriHassall"); ote("poidsEleve");

  /* Hyperplasie vraie : le poids seul ne la tient pas, la lame normale en est le pivot */
  pose("poidsEleve", POS); pose("masse2pc", POS);
  chk("hyperplasie vraie : le poids seul ne tient pas", !tenue("hyperplasieVraie"));
  pose("lameNormaleAge", POS);
  chk("hyperplasie vraie : tenue sur la lame normale", tenue("hyperplasieVraie"));
  ote("poidsEleve"); ote("masse2pc"); ote("lameNormaleAge");

  /* “Lame normale pour l'âge” est de polarité normale : le “Non” en bloc ne la répond pas */
  var gH = "Hyperplasie et prolifération lymphoïde", iH = groupes().indexOf(gH);
  signesDe(gH).forEach(function(x){ ote(x.k); });
  clic("grp", iH, "non");
  chk("lame normale : hors du Non en bloc", par(SIGNES, "lameNormaleAge").bloc === false &&
      !E.signes.lameNormaleAge && E.signes.centreGerminatif === NEG &&
      etatNegatif(par(NEGATIFS, "pasCentreGerm")) === "ok");
  clic("grp", iH, "non");

  /* Hypoplasie : la macro négative ne tient pas, le reliquat histologique est le pivot */
  pose("thymusAbsent", POS);
  pose("cardiopathieCT", POS);
  chk("hypoplasie : la macro négative ne tient pas", !tenue("hypoplasie") &&
      crTient("signe pivot non coché : " + par(SIGNES, "reliquat").l));
  chk("anomalie thymique + CCT propose la FISH", suggerer().fish === 1);
  pose("reliquat", POS);
  chk("hypoplasie : tenue sur le reliquat histologique", tenue("hypoplasie"));
  ote("thymusAbsent"); ote("cardiopathieCT"); ote("reliquat");

  /* Le faisceau des cinq organes : le thymus seul ne le tient pas */
  pose("deplFoyers", POS);
  chk("thymus seul ne tient pas le faisceau", !tenue("faisceauHypoxie"));
  pose("surrenaleLipoide", POS);
  pose("steatoseHep", POS);
  chk("faisceau tenu à trois organes", tenue("faisceauHypoxie"));
  ote("deplFoyers"); ote("surrenaleLipoide"); ote("steatoseHep");

  /* Négatifs calculés sur deux signes */
  var nL = par(NEGATIFS, "lymphophago");
  pose("lymphophagoFocale", NEG); pose("lymphophagoMarquee", NEG);
  chk("lymphophagocytose focale et marquée absentes → négatif énoncé", etatNegatif(nL) === "ok");
  pose("lymphophagoMarquee", POS);
  chk("lymphophagocytose marquée → négatif en défaut", etatNegatif(nL) === "ko" &&
      crTient("lymphophagocytose corticale PRÉSENTE"));
  ote("lymphophagoFocale"); ote("lymphophagoMarquee");
  pose("hassallAbsents", NEG); pose("hassallTasses", POS);
  chk("Hassall tassés → négatif en défaut", etatNegatif(par(NEGATIFS, "hassall")) === "ko");
  ote("hassallAbsents"); ote("hassallTasses");
  pose("vacuolisees", POS);
  chk("cellule vacuolisée → surcharge en défaut, PAS proposé",
      etatNegatif(par(NEGATIFS, "pasSurcharge")) === "ko" && suggerer().pas === 1);
  ote("vacuolisees");

  clic("ret", "poussiereRet", "present");
  chk("poussière propose le Gram", suggerer().gram === 1);
  clic("ret", "poussiereRet", "present");

  /* Branchement FOETO */
  chk("v2 : libellé venu de FOETO", par(SIGNES, "cortexPale").l === "Cortex moins basophile (pâle)");
  chk("v2 : code FOETO du terme verbatim", codesDe(par(SIGNES, "cielEtoile"))[0] === "FOETO:PF.HEM-NOR-096");
  chk("v2 : HPO arbitré venu de la base", codesDe(par(SIGNES, "cardiopathieCT"))[1] === "HP:0001710");
  chk("v2 : constat de fiche sans terme non marqué hors fiche",
      !par(SIGNES, "lymphophagoMarquee").horsFiche && !par(SIGNES, "foyersHemo").horsFiche);
  chk("v2 : terme maladie sur l'association", par(DIAGS, "involution").foeto[0] === "FOETO:PF.HEM-CLA-005");
  chk("v2 : reliquat (lame) et thymus absent (macro) scindés",
      par(SIGNES, "reliquat").l === "Reliquat thymique histologique" && horsLame(par(SIGNES, "thymusAbsent").g) &&
      !horsLame(par(SIGNES, "reliquat").g));
  chk("v2 : blocs lus en §02", BLOCS_LUS && !$("blocsBloc").hidden);
}
