/* Grille de lecture — thymus.
   Fond : ~/Bureau/fiches_lecture/fiche_thymus.md (§1 à §9).
   Forme : gen_grille.py, calquée sur grille_poumon.html.
   Les divergences entre sources sont PORTÉES dans les champs, jamais arbitrées. */

var ORGANE  = "thymus";
var TITRE   = "thymus";
var SOURCE  = "fiche_thymus.md";
var MODULE  = "grille_thymus";
var VERSION = "1.0.0";
/* Glande bilobée fusionnée dès ~9 SA, et aucun CR ne date les deux lobes
   séparément. C'est un défaut d'usage, pas une preuve d'homogénéité (§ 9.10). */
var PAIR    = false;

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

/* ── 01 · Prélèvement ─────────────────────────────────────────────────────── */
var PRELEV = [
  { k:"lobule",     l:"Un lobule complet : capsule → cortex → médullaire → cortex", grave:true,
    manque:"sans lobule complet, quatre des cinq critères de gradation ne se jugent pas" },
  { k:"capsule",    l:"Capsule sur la coupe",
    manque:"sans capsule, ni l'épaisseur corticale ni la séparation des lobules ne se jugent" },
  { k:"medullaire", l:"Médullaire incluse", grave:true,
    manque:"sans médullaire, la fraction corticale et l'inversion de densité sont indéterminables" },
  { k:"hassall",    l:"Au moins un corpuscule de Hassall", grave:true,
    manque:"c'est le repère qui prouve qu'il s'agit bien de thymus" },
  { k:"cervical",   l:"Extensions cervicales prélevées avec l'organe",
    manque:"« tongues of thymic tissue may reach high into the neck » [keeling, ch. 15] — un poids bas " +
           "se vérifie d'abord sur la dissection" },
  { k:"mediastin",  l:"Médiastin antérieur ET cou explorés si le thymus n'est pas retrouvé",
    manque:"« Son absence complète est rare même dans les cardiopathies cono-truncales » [soffoet, ch. 5] : " +
           "rechercher les reliquats histologiques avant de conclure à l'aplasie" },
  { k:"poids",      l:"Poids du thymus consigné",
    manque:"96 CR sur 196 le portent, et le seuil d'hyperplasie ne s'écrit que dessus" },
  { k:"dissection", l:"Compte rendu de dissection disponible",
    manque:"seul le compte rendu de dissection sépare l'hémorragie thymique du saignement de retrait" },
  { k:"congele",    l:"Fragment congelé à −80 °C",
    manque:"thymus dans la liste à congeler devant tout syndrome polymalformatif et toute suspicion de " +
           "maladie métabolique [soffoet, ch. 3]" },
  { k:"autres",     l:"Surrénale, foie, rein, pancréas et placenta lus",
    manque:"le thymus ne date rien seul, et le faisceau d'hypoxie chronique compte cinq organes" }
];

/* ── 02 · Rétention ───────────────────────────────────────────────────────────
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

/* ── 03 · Maturation — apparitions datables ───────────────────────────────────
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
  { k:"cortexMince",   l:"Cortex en calotte mince, septa larges, lobules espacés", max:24,
    note:"borne reconstruite depuis les figures d'[ernst, ch. 24] (17 puis 22 semaines de gestation) : " +
         "ce n'est pas un seuil sourcé, et cette image est aussi celle des rangs 3 et 4 de l'involution" },
  { k:"cortexEpaissi", l:"Cortex épaissi, septa resserrés, lobules rapprochés", max:37,
    note:"« As gestation progresses, the interlobular septa become narrower, and the cortex becomes " +
         "thicker » [ernst, ch. 24] — trajectoire sans palier, la borne haute est un repère d'affichage" },
  { k:"cortex85",      l:"Cortex occupant l'essentiel du lobule", max:99,
    note:"divergence NON tranchée (§ 9.1) : [ernst, ch. 24] attend au terme « approximately 85 % of the " +
         "thymus is composed of cortex », [keeling, ch. 27] écrit que la démarcation est « blurred by " +
         "term » — or une fraction de 85 % suppose une démarcation lisible" }
];

/* ── 03 bis · Gradation de l'involution — Table 15.8, DEUX colonnes ───────────
   L'involution de stress n'est pas une maturation : c'est une sévérité. Elle vit
   donc ici, en axe séparé, et non dans les stades ni dans les signes. Les deux
   colonnes s'INTERSECTENT — elles ne se moyennent jamais. */
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
  defs:ARCH,
  opts:CELL,
  champs:[{ id:"cortex", label:"Fraction corticale (%)", min:0, max:100, step:1 },
          { id:"poids",  label:"Poids du thymus (g)",    min:0, max:60,  step:0.01 }]
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
  if (E.signes.cortexPale === "anormal" && E.mesure.opt && E.mesure.opt !== "cInd")
    res.push("cortex moins basophile coché alors que la cellularité est déclarée jugeable — la perte de " +
             "basophilie de macération et le rang 2 de l'involution sont le même signe");
  if (res.length){
    if (cls !== "bad") cls = "warn";
    t.push("Réserves : " + res.join(" ; ") + ".");
  }
  return { cls:cls, txt:t.join(" ") };
}

/* ── 05 · Variantes normales ──────────────────────────────────────────────── */
var VARIANTES = [
  { k:"extensionsCerv",  l:"Extensions cervicales du thymus" },
  { k:"nodulesLibres",   l:"Nodules thymiques non connectés à la glande" },
  { k:"parathyroideVar", l:"Tissu parathyroïdien dans un lobule thymique" },
  { k:"ehmSeptale",      l:"Hématopoïèse dans la capsule, les septa et le long des vaisseaux" },
  { k:"ehmEosino",       l:"Éléments myéloïdes purement éosinophiles" },
  { k:"cielDiscret",     l:"Ciel étoilé discret — macrophages à corps tingibles physiologiques" },
  { k:"apoptose",        l:"Apoptose lymphocytaire corticale" },
  { k:"bPeriHassall",    l:"Lymphocytes B isolés autour des corpuscules de Hassall" },
  { k:"gradientCortex",  l:"Grands lymphocytes sous-capsulaires, plus petits en profondeur" },
  { k:"capsuleMince",    l:"Capsule mince — elle le reste toute la gestation" }
];

/* ── 06 · Signes ──────────────────────────────────────────────────────────────
   On coche ce qu'on voit, un signe à la fois. Aucun nom de maladie ici : les
   noms se lisent en dessous, dans DIAGS, par association des signes cochés.
   La SÉVÉRITÉ de l'involution n'est pas un signe non plus : elle se compose au
   § 04, sur les deux colonnes de la Table 15.8. */
var SIGNES = [
  /* Cellularité corticale */
  { k:"lymphophagoFocale",  l:"Lymphophagocytose corticale focale",
    meta:"le seul critère qui sépare le grade 0 du grade 1" },
  { k:"lymphophagoMarquee", l:"Lymphophagocytose corticale marquée" },
  { k:"cielEtoile",         l:"Aspect en ciel étoilé du cortex",
    meta:"macrophages à corps tingibles démasqués — physiologiques en eux-mêmes" },
  { k:"epithDemasquees",    l:"Cellules épithélio-réticulaires corticales visibles en HES",
    meta:"normalement masquées par la densité lymphocytaire : leur visibilité est déjà le rang 1" },
  { k:"cortexPale",         l:"Cortex moins basophile",
    meta:"le signe de la lésion ET celui de la macération, sur le même compartiment" },
  { k:"cortexRetreci",      l:"Rétrécissement du cortex" },
  { k:"cortexDisparu",      l:"Cortex disparu" },
  { k:"deplFoyers",         l:"Foyers de déplétion lymphocytaire corticale" },
  { k:"inversionDensite",   l:"Densité lymphocytaire plus élevée dans la médullaire que dans le cortex",
    meta:"le seuil du grade 4" },

  /* Architecture lobulaire */
  { k:"lobulesSepares",     l:"Lobules séparés, septa élargis" },
  { k:"interstitiumProem",  l:"Interstitium et vaisseaux proéminents" },
  { k:"cmFloue",            l:"Définition cortico-médullaire perdue à faible grossissement",
    meta:"le seuil du grade 3" },
  { k:"hassallTasses",      l:"Corpuscules de Hassall tassés dans la médullaire",
    meta:"rang 6 de la séquence — aucune source ne dit à quel grade il correspond" },
  { k:"hassallAbsents",     l:"Aucun corpuscule de Hassall sur la coupe" },
  { k:"medullaireAbsente",  l:"Pas de médullaire sur la coupe",
    meta:"quatre des cinq critères de gradation deviennent indéterminables" },

  /* Taille et poids */
  { k:"poidsBas",           l:"Poids abaissé pour le terme" },
  { k:"poidsEleve",         l:"Poids très supérieur à l'attendu pour l'âge" },
  { k:"masse2pc",           l:"Thymus représentant plus de 2 % de la masse corporelle" },
  { k:"reliquat",           l:"Reliquat thymique seulement, ou glande non retrouvée" },
  { k:"lameNormaleAge",     l:"Lame d'aspect normal pour l'âge" },

  /* Prolifération lymphoïde */
  { k:"centreGerminatif",   l:"Centre germinatif constitué",
    meta:"le cortex fœtal normal n'en a pas" },
  { k:"amasPeriHassall",    l:"Amas lymphoïde autour d'un corpuscule de Hassall",
    meta:"lymphocytes B isolés normaux — ce n'est pas un centre germinatif" },

  /* Surcharge */
  { k:"gaucher",            l:"Grandes cellules histiocytaires au cytoplasme strié PAS+ sur fond lymphoïde" },
  { k:"vacuolisees",        l:"Cellules au cytoplasme vacuolisé, vues à fort grossissement ou à l'immersion" },

  /* Circulatoire */
  { k:"foyersHemo",         l:"Foyers hémorragiques intraparenchymateux" },
  { k:"petechies",          l:"Pétéchies de la surface des organes thoraciques",
    meta:"constat macroscopique — ne pas le reporter en micro" },

  /* Déplétion non liée au stress */
  { k:"macrophagesCD4",     l:"Macrophages CD4 positifs dans une déplétion" },
  { k:"infiltratLH",        l:"Infiltrat lymphohistiocytaire diffus" },
  { k:"inclusionNucl",      l:"Inclusion nucléaire ou cellule géante" },

  /* Ectopie */
  { k:"noduleEctopique",    l:"Nodule thymique isolé dans le cou, la thyroïde ou la parathyroïde",
    meta:"commun et normal chez le fœtus" },
  { k:"kysteThymique",      l:"Kyste bordé dans un tissu thymique" },
  { k:"parathyroide",       l:"Tissu parathyroïdien dans un lobule thymique",
    meta:"origine commune, 3e poche pharyngée" },

  /* Artefacts de macération */
  { k:"blueBlobs",          l:"« Blue blobs » du parenchyme" },
  { k:"poussiereBaso",      l:"Poussière basophile péri-viscérale" },

  /* Lus hors thymus — le faisceau ne se coche pas sur cette lame, il s'y déclare */
  { k:"langerhansVol",      l:"Îlots de Langerhans volumineux", meta:"lu hors thymus" },
  { k:"surrenaleLipoide",   l:"Dégénérescence lipoïdique de la zone fœtale surrénalienne",
    meta:"lu hors thymus" },
  { k:"steatoseHep",        l:"Stéatose hépatique et déplétion glycogénique", meta:"lu hors thymus" },
  { k:"tubesRenauxDil",     l:"Tubes rénaux dilatés", meta:"lu hors thymus" },
  { k:"placentaPetit",      l:"Petit placenta", meta:"lu hors thymus" },
  { k:"cardiopathieCT",     l:"Cardiopathie cono-troncale", meta:"lu hors thymus" },
  { k:"malfoAssociees",     l:"Anomalies rénales, spina bifida ou anomalies des extrémités",
    meta:"lu hors thymus" }
];

/* ── 06 bis · Associations — affichées, jamais cochées ────────────────────────
   Le nom se déduit des signes. « cle » est le signe pivot : sans lui le compte
   peut être atteint sans que l'association tienne. */
var DIAGS = [
  { k:"involution", l:"Involution thymique de stress (involution aiguë)", min:2,
    signes:["lymphophagoFocale","lymphophagoMarquee","cielEtoile","epithDemasquees","cortexPale",
            "cortexRetreci","cmFloue","cortexDisparu","deplFoyers","inversionDensite",
            "lobulesSepares","interstitiumProem","hassallTasses","poidsBas"],
    stop:" — la sévérité ne se déduit PAS du nombre de signes cochés : le grade se compose au § 04 sur " +
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

  { k:"hypoplasie", l:"Hypoplasie ou aplasie thymique — spectre 22q11.2", cle:"reliquat", min:1,
    signes:["reliquat","poidsBas","cardiopathieCT","malfoAssociees"],
    stop:" — ne jamais conclure à l'aplasie sur une macro négative : « Son absence complète est rare même " +
         "dans les cardiopathies cono-truncales », où il faut en rechercher les reliquats histologiques. " +
         "Prélever le médiastin antérieur ET le cou. La micro écrit « thymus de petite taille » ou " +
         "« reliquat thymique histologique » ; DiGeorge et 22q11 se nomment après la FISH, jamais sur la lame." },

  { k:"hyperplasieLymphoide", l:"Hyperplasie lymphoïde thymique", cle:"centreGerminatif", min:1,
    signes:["centreGerminatif","poidsEleve","masse2pc"],
    stop:" — un amas lymphoïde autour d'un corpuscule de Hassall n'est PAS un centre germinatif : les " +
         "lymphocytes B y sont isolés et normaux. Le critère est le centre germinatif constitué, que le " +
         "cortex fœtal normal n'a pas — « a sheet without distinct follicle or germinal center formation »." },

  { k:"hyperplasieVraie", l:"Hyperplasie thymique vraie", cle:"lameNormaleAge", min:2,
    signes:["lameNormaleAge","poidsEleve","masse2pc"],
    stop:" — la lame est normale pour l'âge : c'est le poids qui parle, et le seuil « more than 2 standard " +
         "deviations from the median weight for age » change de sens selon l'abaque — environ 17,50 g au " +
         "terme pour le service contre 12 g, ou 10,2 g avec +2 DS à 18 g, pour keeling. Hémorragie, " +
         "surcharge métabolique et Wiedemann-Beckwith donnent aussi un gros thymus." },

  { k:"ectopie", l:"Thymus ectopique ou kyste thymique", min:2,
    signes:["noduleEctopique","kysteThymique","parathyroide"],
    stop:" — la plupart des nodules thymiques ectopiques du fœtus sont NORMAUX : « a common finding in " +
         "fetuses », et le corpus les écrit « choristome thymique intrathyroïdien (bénin) » et « tissu " +
         "thymique ectopique normal (pas de valeur pathologique) ». Les extensions cervicales sont " +
         "normales et font partie de l'organe. Ne pas coder une ectopie comme une lésion." },

  { k:"surcharge", l:"Surcharge lysosomale — le thymus est un site de lecture", min:1,
    signes:["gaucher","vacuolisees"],
    stop:" — la cellule de surcharge n'est caractéristique que dans la maladie de Gaucher ; ailleurs " +
         "l'aspect n'est pas caractéristique sur coloration standard, ce sont des « cellules au " +
         "cytoplasme vacuolisé » à chercher à fort grossissement et à l'immersion. Ces cellules restent " +
         "devinables sur un fœtus macéré de 24 SA : c'est l'un des rares constats qui survive à la " +
         "rétention sur cet organe." },

  { k:"hemorragie", l:"Hémorragie thymique", cle:"foyersHemo", min:1,
    signes:["foyersHemo","petechies","poidsEleve"],
    stop:" — aucun critère histologique ne sépare l'hémorragie du saignement de dissection : « ce tronc " +
         "veineux passe parfois en avant du thymus » ou y est enchâssé, et il se sectionne au retrait de " +
         "l'organe. Seul le compte rendu de dissection tranche. Les pétéchies de surface sont un constat " +
         "macroscopique, à ne pas reporter en micro, et l'attribution « anoxie aiguë » est la pratique du " +
         "service, pas une donnée des livres." },

  { k:"deplNonStress", l:"Déplétion lymphoïde non liée au stress", min:2,
    signes:["deplFoyers","inversionDensite","macrophagesCD4","infiltratLH","inclusionNucl"],
    stop:" — la lame ne tranche pas ce différentiel : le VIH donne une « déplétion thymique lymphocytaire " +
         "avec présence de macrophages CD4 », la lymphohistiocytose hémophagocytaire un infiltrat diffus, " +
         "et les appearances de l'involution « may be difficult to distinguish from those seen in many " +
         "immunodeficiency syndromes ». Une déplétion corticale isolée n'établit pas le stress." },

  { k:"faisceauHypoxie", l:"Faisceau d'hypoxie chronique — cinq organes, jamais le thymus seul",
    cle:"deplFoyers", min:3,
    signes:["deplFoyers","langerhansVol","surrenaleLipoide","steatoseHep","tubesRenauxDil","placentaPetit"],
    stop:" — soffoet range le thymus dans un faisceau de cinq organes, jamais seul, et la divergence " +
         "n'est pas tranchée : keeling écrit qu'un petit thymus anténatal est associé à la prématurité, " +
         "la chorioamniotite et le sepsis néonatal, « but not with fetal growth restriction », alors que " +
         "28 CR du service concluent « hypoxie chronique ». Écrire laquelle des deux lectures on retient." }
];

/* ── 07 · Négatifs obligatoires ───────────────────────────────────────────────
   Un seul des 29 CR mentionnant le thymus énonce des négatifs. Cette liste est
   donc proposée depuis les livres, pas relevée dans l'usage (§ 9.22). */
var NEGATIFS = [
  { k:"lymphophago", l:"Absence de lymphophagocytose corticale", p:"le seul négatif qui rende le grade 0 opposable",
    ko:"lymphophagocytose corticale PRÉSENTE — le grade 0 n'est plus opposable" },
  { k:"cmConservee", l:"Définition cortico-médullaire conservée à faible grossissement", p:"le seuil du grade 3",
    ko:"définition cortico-médullaire PERDUE à faible grossissement — seuil du grade 3" },
  { k:"pasInversion", l:"Absence d'inversion de densité cortex / médullaire", p:"le seuil du grade 4",
    ko:"inversion de densité PRÉSENTE — seuil du grade 4" },
  { k:"lobulesSerres", l:"Lobules serrés, septa fins", p:"le seul négatif qui survive à la macération",
    ko:"lobules séparés et septa élargis — mais la rétraction post-mortem au thymus n'est documentée nulle part" },
  { k:"hassall", l:"Corpuscules de Hassall présents et non tassés", p:"rang 6 de la séquence d'involution",
    ko:"corpuscules de Hassall absents ou tassés" },
  { k:"pasCentreGerm", l:"Absence de centre germinatif", p:"le critère de l'hyperplasie lymphoïde",
    ko:"centre germinatif CONSTITUÉ" },
  { k:"pasSurcharge", l:"Absence de cellule de surcharge", p:"« thymus en particulier » dans le négatif du corpus",
    ko:"cellule de surcharge PRÉSENTE — confirmer au PAS, à l'immersion" },
  { k:"pasInclusion", l:"Absence d'inclusion nucléaire et de cellule géante", p:"1 CR sur 29 énonce ces négatifs",
    ko:"inclusion nucléaire ou cellule géante PRÉSENTE" },
  { k:"pasFer", l:"Absence de surcharge en fer", p:"énoncée en bloc par le seul CR négatif",
    ko:"surcharge en fer PRÉSENTE" },
  { k:"pasHemo", l:"Absence de foyer hémorragique", p:"différentiel avec le saignement de dissection",
    ko:"foyer hémorragique PRÉSENT — reprendre le compte rendu de dissection" },
  { k:"medullaire", l:"Présence de médullaire sur la coupe", p:"sans elle, aucun négatif ci-dessus n'est opposable",
    ko:"pas de médullaire sur la coupe — les négatifs ne sont pas opposables" },
  { k:"grade", l:"Grade d'involution composé sur les deux colonnes", p:"aucun des 29 CR n'écrit un grade 0-4",
    ko:"grade NON composé — la gradation existe dans les livres, pas dans la pratique du service" }
];

/* ── 08 · Techniques ──────────────────────────────────────────────────────── */
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
  function anormal(k){ return E.signes[k] === "anormal"; }
  function un(){ for (var i = 0; i < arguments.length; i++) if (anormal(arguments[i])) return true;
                 return false; }

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
  if (un("reliquat","cardiopathieCT","malfoAssociees")) s.fish = 1;

  if (E.retention.poussiereRet === "present") s.gram = 1;
  if (E.retention.cortexPaleRet === "present"){ s.autresOrganes = 1; s.trichrome = 1; }
  if (E.negatifs.pasSurcharge === "present") s.pas = 1;
  if (E.negatifs.pasCentreGerm === "present") s.ihcBT = 1;
  if (E.negatifs.medullaire === "present") s.autresOrganes = 1;
  if (E.prelev.congele && SIGNES.some(function(x){ return E.signes[x.k] === "anormal"; })) s.adn = 1;
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

  /* Le piège central : un seul signe, deux lectures affichées ensemble */
  SIGNES.forEach(function(x){ ote(x.k); });
  pose("cortexPale", "anormal");
  pose("cielEtoile", "anormal");
  chk("la macération se lit",  tenue("maceration"));
  chk("l'involution se lit aussi", associations().some(function(a){ return a.d.k === "involution"; }));
  chk("les deux lectures sont au CR", crTient("Involution thymique de stress") &&
      crTient("Pâleur corticale post-mortem"));
  chk("cortex pâle propose les autres organes", suggerer().autresOrganes === 1);
  ote("cortexPale"); ote("cielEtoile");

  /* Sans médullaire, la gradation tombe */
  pose("medullaireAbsente", "anormal");
  chk("gradation impossible", tenue("nonGradable") && crTient("quatre des cinq critères de gradation tombent"));
  ote("medullaireAbsente");

  /* Un amas péri-Hassall n'est pas un centre germinatif */
  pose("amasPeriHassall", "anormal");
  pose("poidsEleve", "anormal");
  chk("amas péri-Hassall ne tient pas l'hyperplasie lymphoïde", !tenue("hyperplasieLymphoide"));
  pose("centreGerminatif", "anormal");
  chk("centre germinatif la tient",  tenue("hyperplasieLymphoide"));
  chk("hyperplasie propose l'IHC B/T", suggerer().ihcBT === 1);
  ote("centreGerminatif"); ote("amasPeriHassall"); ote("poidsEleve");

  /* Le faisceau des cinq organes : le thymus seul ne le tient pas */
  pose("deplFoyers", "anormal");
  chk("thymus seul ne tient pas le faisceau", !tenue("faisceauHypoxie"));
  pose("surrenaleLipoide", "anormal");
  pose("steatoseHep", "anormal");
  chk("faisceau tenu à trois organes", tenue("faisceauHypoxie"));
  ote("deplFoyers"); ote("surrenaleLipoide"); ote("steatoseHep");

  clic("ret", "poussiereRet", "present");
  chk("poussière propose le Gram", suggerer().gram === 1);
  clic("ret", "poussiereRet", "present");
}
