/* Grille de lecture — rein et voies urinaires hautes. VERSION 3 (3.0.0).
   Publiée à côté de la v1 (rein.js) et de la v2 (rein.v2.js) tant qu'elle n'a
   pas été validée à l'usage.
   Ce que la v3 change par rapport à la v2 : la section « Termes FOETO » est
   fondue dans les signes. Sur les 35 termes LESION que foeto_terms rattache à
   la fiche, 10 étaient déjà portés par un signe ; 14 lésions deviennent des
   signes (16 termes : deux doublons de la base) ; 9 termes nomment une maladie
   et vont aux associations, affichés, jamais exportés d'office. La recherche
   « autre terme FOETO » reste en bas des signes pour le hors-fiche ; un terme
   déjà porté par un signe y pose le signe. Couverture vérifiée à la génération.
   3.1.0 — branchée sur FOETO v2 (foeto_base/foeto_v2.db, bâtie depuis
   fiche_rein.md) : un signe porte f2 (une clé de la base), son libellé et ses codes viennent
   de la base ; les codes v1 exacts suivent pour l'akinator. Un signe sans f2
   est propre à la grille (pas dans la fiche) : la génération les liste.
   Fond : ~/Bureau/fiches_lecture/fiche_rein.md (§1 à §9).
   Ce qui change par rapport à rein.js (1.1.1), sans rien retrancher :
   · le bon couple au bon endroit : un signe est un CONSTAT, présent / absent /
     non regardé (plus normal / anormal) ; la rétention l'était déjà ;
   · les négatifs obligatoires ne se cochent plus une seconde fois : ils se
     déduisent d'un signe répondu absent ou d'une donnée consignée ;
   · le prélèvement sépare ce qui qualifie la lecture des critères de coupe,
     destinés à la future grille macro fixée ;
   · les signes sont groupés, le contexte hors lame à part ;
   · un signe PRÉSENT exporte ses codes FOETO/HPO — correspondances nettes
     seulement ; les partielles attendent l'arbitrage (rein.codes_a_valider.tsv).
   Forme : gen_grille.py, calquée sur grille_poumon.html.
   Les divergences entre sources sont PORTÉES dans les champs, jamais arbitrées. */

var ORGANE  = "rein";
var TITRE   = "rein et voies urinaires hautes";
var SOURCE  = "fiche_rein.md";
var MODULE  = "grille_rein";
var VERSION = "3.1.2";
var SCHEMA  = "0.3.0";   /* 0.3.0 : signes present/absent, négatifs déduits */
var ETATS   = "presence";
var FOETO_DANS_SIGNES = true;   /* v3 : plus de section « Termes FOETO » */
/* Paragraphes sans étendue : le contexte hors lame n'est pas une lésion qui s'étend. */
var GROUPES_SANS_ETENDUE = ["Contexte hors lame — macro, foie, clinique"];
var PAIR    = true;

var TITRE_CR    = "REIN";
var STADE_TITRE = "État de la zone néphrogène";

var KCL_TXT = "Fœticide par KCl déclaré — la nécrose tubulaire et la basophilie induites par le geste " +
              "ne sont pas datables. Aucune borne de rétention n'est recevable.";

/* La zone néphrogène s'épuise ; un retard signifie un blastème encore là au terme. */
var RETARD_NOTE = "Une zone néphrogène plus riche qu'attendue au terme n'est pas un retard de " +
                  "maturation isolé : reprendre le CRG et la datation avant de conclure.";

/* C'est la branche qui porte le sens au rein : la néphrogenèse s'est arrêtée trop tôt. */
var AVANCE_NOTE = "Une zone néphrogène épuisée avant le terme fait discuter une néphrogenèse arrêtée " +
                  "(obstruction, hypoplasie, phénocopie médicamenteuse) — à confronter au CRG. " +
                  "La fin de la néphrogenèse a quatre bornes sourcées différentes : ne pas la lire à la semaine.";

var TECH_NOTE = "Les pointillés sont des propositions déduites des clics, jamais des prescriptions. " +
                "Le CD15 est absent du corpus du service : le proposer, c'est ouvrir une pratique, pas la rappeler.";

/* ── 01 · Prélèvement ─────────────────────────────────────────────────────── */
var PRELEV = [
  { k:"sagittale",  g:"Qualifie la lecture", l:"Coupe sagittale, capsule → bassinet", grave:true,
    manque:"sans coupe sagittale orientée le CRG n'est pas qualifié (« such well-oriented areas are not " +
           "necessarily common on routine autopsy sections » [ernst, ch. 8])" },
  { k:"corticale",  g:"Qualifie la lecture", l:"Cortex entier, capsule → artère arciforme", grave:true,
    manque:"le compte radial exige la colonne complète de la capsule à l'artère arciforme" },
  { k:"bertin", g:"Critères de coupe — iront à la grille macro fixée", l:"Une colonne de Bertin sur la coupe",
    manque:"sans colonne de Bertin, la limite cortico-médullaire n'est pas jugeable" },
  { k:"medullaire", g:"Critères de coupe — iront à la grille macro fixée", l:"Médullaire incluse",
    manque:"le critère opérationnel de dysplasie (tube à collerette) siège dans la médullaire" },
  { k:"cotes", g:"Critères de coupe — iront à la grille macro fixée", l:"Les deux reins échantillonnés séparément",
    manque:"92 % des CR écrivent « les reins » comme un objet unique — une asymétrie ne se voit qu'en séparant" },
  { k:"pole", g:"Critères de coupe — iront à la grille macro fixée", l:"Pôles supérieur et inférieur documentés",
    manque:"dans un duplex la dysplasie est polaire : une coupe médiane peut être normale" },
  { k:"foie", g:"Critères de coupe — iront à la grille macro fixée", l:"Fragment de foie prélevé",
    manque:"la plaque ductale est constante dans la PKRA — sans foie, la distinction PKRA/PKDA reste ouverte" },
  { k:"congele", g:"Critères de coupe — iront à la grille macro fixée", l:"Fragment congelé pour ADN fœtal",
    manque:"« accurate genetic counseling can be offered only in the presence of fetal DNA samples » [keeling, ch. 24]" },
  { k:"voies", g:"Critères de coupe — iront à la grille macro fixée", l:"Uretères et bassinets suivis",
    manque:"une obstruction basse ne se conclut pas sur le seul parenchyme" }
];

/* ── 02 · Rétention ───────────────────────────────────────────────────────── */
/* Modificateurs communs, énoncés par [ernst, ch. 37] sur la série des délais.
   Chaque ligne est une PERTE de basophilie nucléaire (Genest ; keeling Table 15.6).
   h ordonne les critères ; pour « toutes les cellules du rein » (rang 10, délai
   perdu à l'extraction) c'est un rang, pas un délai. 3.1.2 : le palier du
   service « persistante dans quelques tubules, 2–4 semaines » est retiré —
   la pratique du service ne compte pas devant les livres. */
var MODIF = "délai accéléré par l'anasarque et par un intervalle délivrance-autopsie > 24 h, ralenti par un terme < 27 SA";

var RETENTION = [
  { k:"basoTubIso", l:"Perte de basophilie nucléaire de cellules tubulaires corticales isolées", b:"≥ 4 h", d:"« Tubules — ≥ 4 h »", h:4, q:"bon",
    note:"l'attribution de cette ligne au rein est une RECONSTRUCTION : la colonne d'organe est amputée " +
         "à l'extraction de [ernst, ch. 37]", alerte:MODIF },
  { k:"basoRein",   l:"Perte de basophilie nucléaire de toutes les cellules du rein", b:"rang 10 de la série",
    d:"« All cells in the kidney » — délai non sourcé", h:700, q:"moyen",
    note:"le rein figure aux rangs 1 ET 10 de [keeling, ch. 15, Table 15.6] ; la colonne des délais a été " +
         "perdue à l'extraction — le rang est conservé, pas le chiffre" },
  { k:"necroseTub", l:"Nécrose tubulaire aiguë", b:"—", d:"non datable seule", h:0, q:"mauvais",
    note:"lésion ou artefact de lyse, jamais départageable sur la seule morphologie" },
  { k:"poussiere",  l:"« Basophilic dust » interstitielle", b:"—", d:"non datable seule", h:0, q:"mauvais",
    note:"faire un Gram tissulaire avant de conclure : des colonies bactériennes post-mortem donnent la même image" },
  { k:"mulberry",   l:"Aspect « mulberry » des glomérules", b:"≈ 2–3 jours", d:"« usually apparent at 2–3 days »",
    h:60, q:"moyen", alerte:MODIF },
  { k:"tcpAbsents", l:"TCP non identifiables", b:"—", d:"non interprétable sur macéré", h:0, q:"mauvais",
    note:"conclure une dysplasie tubulaire rénale sur un rein macéré sans CD10 est une faute" }
];

/* ── 03 · Maturation — zone néphrogène ────────────────────────────────────── */
var STADES = [
  { k:"blastemeAbondant", l:"Zone continue, blastème abondant", max:30 },
  { k:"blastemePeu",      l:"Zone continue, blastème peu abondant", max:34 },
  { k:"discontinue",      l:"Zone discontinue, foyers isolés", max:38 },
  { k:"absente",          l:"Zone absente, tubes matures jusqu'à la capsule", max:99,
    note:"le « cortex corticis » est un aspect POSTNATAL, pas un stade fœtal — piège classique" }
];

/* ── 03 bis · Compte radial glomérulaire ──────────────────────────────────── */
/* Deux barèmes issus de la MÊME source, divergents. On affiche les deux. */
function baremeT156(sa){
  var P = [{ max:25.5, lo:3,  hi:3,  l:"3",     sa:"< 25 SA" },
           { max:28,   lo:5,  hi:7,  l:"5–7",   sa:"≈ 26 SA" },
           { max:32,   lo:8,  hi:9,  l:"8–9",   sa:"≈ 30 SA" },
           { max:36,   lo:9,  hi:10, l:"9–10",  sa:"≈ 34 SA" },
           { max:99,   lo:10, hi:14, l:"10–14", sa:"≈ 38 SA" }];
  for (var i = 0; i < P.length; i++) if (sa < P[i].max) return P[i];
  return P[P.length - 1];
}
/* Règle A : 2–3 rangées à 18–19 SA, plateau jusqu'à 25 SA, puis +1 rangée par
   semaine jusqu'à 35–36 SA, 12–14 à l'arrêt de la néphrogenèse. */
function baremeRegleA(sa){
  if (sa < 20)   return { lo:2,  hi:3,  l:"2–3",   sa:"18–19 SA" };
  if (sa < 25.5) return { lo:2,  hi:3,  l:"2–3",   sa:"zone quiescente jusqu'à 25 SA" };
  var n = 3 + Math.round(Math.min(sa, 36) - 25);
  if (sa >= 35)  return { lo:12, hi:14, l:"12–14", sa:"≥ 35 SA, néphrogenèse achevée" };
  return { lo:n - 1, hi:n + 1, l:(n - 1) + "–" + (n + 1), sa:Math.round(sa) + " SA, +1 rangée/semaine" };
}

var MESURE = {
  titre:"Compte radial glomérulaire (CRG)",
  defLabel:"barème déclaré",
  optLabel:"méthode de comptage",
  defs:[{ k:"t156",   l:"Table 15.6 [keeling, ch. 15]" },
        { k:"regleA", l:"Règle +1 rangée/semaine [keeling, ch. 24]" }],
  opts:[{ k:"hes",   l:"HES seul" },
        { k:"cd10",  l:"CD10" },
        { k:"cd15",  l:"CD15" },
        { k:"duo",   l:"CD10 + CD15" }],
  champs:[{ id:"crg", label:"CRG (rangées)", min:0, max:30, step:1 }]
};

function situe(n, b){ return n < b.lo ? "bas" : n > b.hi ? "haut" : "conforme"; }

/* Le compte est une observation ; le barème est l'interprétation qui vient après.
   On n'exige donc jamais un barème pour entrer un CRG : sans barème déclaré on
   situe le compte dans les DEUX, et on dit s'ils s'accordent. */
function verdictMesure(){
  var n = E.mesure.v.crg, sa = num("sa");
  if (n == null) return { cls:"", txt:"CRG non compté — la maturation rénale reste non chiffrée." };
  if (sa == null) return { cls:"warn",
    txt:"CRG = " + n + " rangées — sans terme, aucune attente n'est calculable." };

  var a = baremeT156(sa), b = baremeRegleA(sa);
  var t = "CRG = " + n + " rangées à " + sa + " SA. Table 15.6 : " + a.l + " (" + a.sa + ") ; " +
          "règle +1/semaine : " + b.l + " (" + b.sa + ").";
  var cls = "ok", res = [], sit;

  if (!E.mesure.def){
    var sa156 = situe(n, a), saA = situe(n, b);
    t += " Barème non déclaré — le compte est consigné, l'interprétation reste ouverte : ";
    if (sa156 === saA){ sit = sa156; t += "les deux barèmes le situent " + sa156 + "."; }
    else { sit = null; cls = "warn";
      t += sa156 + " selon la Table 15.6, " + saA + " selon la règle +1/semaine — " +
           "les deux barèmes ne s'accordent pas ici, déclarer lequel on retient."; }
  } else {
    var ref = E.mesure.def === "t156" ? a : b;
    sit = situe(n, ref);
    if (a.l !== b.l)
      t += " Les deux barèmes divergent ici — barème retenu : " +
           (E.mesure.def === "t156" ? "Table 15.6" : "règle +1/semaine") + ".";
  }

  if (sit === "bas"){ cls = "bad";
    t += " Compte BAS — trois lectures restent ouvertes : fœtus plus jeune que " +
         "le terme déclaré, hypoplasie rénale, néphrogenèse arrêtée."; }
  else if (sit === "haut"){ if (cls === "ok") cls = "warn";
    t += (n > 14
      ? " Compte au-dessus du maximum de 12–14 rangées — excès de néphrons (le corpus décrit 16 rangées à 29,5 SA)."
      : " Compte HAUT."); }
  else if (sit === "conforme"){ t += " Compte conforme."; }

  if (!E.prelev.sagittale) res.push("coupe sagittale non confirmée — le compte n'est pas qualifié");
  if (!E.prelev.corticale) res.push("colonne capsule→artère arciforme non confirmée");
  if (!E.mesure.opt)       res.push("méthode de comptage non déclarée");
  if (E.mesure.opt === "hes" && RETENTION.some(function(r){ return E.retention[r.k] === "present"; }))
    res.push("HES seul sur un rein en rétention : compter en CD10 (± CD15)");
  if (!E.stade) res.push("état de la zone néphrogène non consigné — le CRG n'est que la moitié du critère de datation");
  if (res.length){ if (cls === "ok") cls = "warn"; t += " Réserves : " + res.join(" ; ") + "."; }
  return { cls:cls, txt:t };
}

/* ── 05 · Variantes normales ──────────────────────────────────────────────── */
var VARIANTES = [
  { k:"lobulation",  l:"Lobulation fœtale conservée" },
  { k:"blasteme",    l:"Blastème sous-capsulaire d'un fœtus jeune" },
  { k:"glomImmat",   l:"Glomérules immatures en virgule sous la capsule" },
  { k:"colonnes",    l:"Colonnes de Bertin proéminentes" },
  { k:"erythro",     l:"Îlots d'érythropoïèse interstitielle" },
  { k:"vacuoles",    l:"Vacuolisation claire des TCP du fœtus jeune" },
  { k:"cristaux",    l:"Cristaux d'urate dans les tubes médullaires" },
  { k:"pelvis",      l:"Bassinet extrarénal ample sans dilatation calicielle" },
  { k:"sclerose",    l:"Rares glomérules scléreux (plancher 1–2 % [ernst] · < 1 % service)" }
];

/* ── 06 · Signes ──────────────────────────────────────────────────────────────
   On coche ce qu'on voit, un signe à la fois. Aucun nom de maladie ici : les
   noms se lisent en dessous, dans DIAGS, par association des signes cochés. */
var SIGNES = [
  /* Un signe est un constat : présent, absent, ou non regardé (rien cliqué).
     « Absent » est un clic explicite — l'absence de clic n'est jamais un négatif. */
  { k:"tubeCollerette", f2:"tube_collerette", g:"Architecture et kystes", l:"Tube dilaté à collerette de cellules fusiformes, dans la MÉDULLAIRE",
    meta:"critère opérationnel de la dysplasie" },
  { k:"tubeColleretteCort", g:"Architecture et kystes", l:"Tube à collerette CORTICAL seulement",
    meta:"n'a pas la valeur du critère médullaire" },
  { k:"smaCollerette", g:"Architecture et kystes",  l:"Collerette SMA-positive" },
  { k:"desorganisation", f2:"desorganisation", g:"Architecture et kystes", l:"Désorganisation architecturale, perte du gradient cortico-médullaire" },
  { k:"cartilage", f2:"ilot_cartilage", g:"Architecture et kystes",      l:"Îlot de cartilage", meta:"rare — son absence ne réfute rien" },
  { k:"kystesInegaux", g:"Architecture et kystes",  l:"Kystes de taille inégale, sans systématisation" },
  { k:"kysteSC", f2:"kystes_sous_capsulaires", hpo:"HP:0000803", g:"Architecture et kystes",        l:"Kyste sous-capsulaire cortical", meta:"« hallmark of obstruction »" },
  { k:"kystesNoyau", f2:"kystes_noyau_fibreux", g:"Architecture et kystes",    l:"Amas de kystes translucides centrés sur un noyau fibreux dense" },
  { k:"kystesRadiaires", f2:"kystes_radies", g:"Architecture et kystes", l:"Kystes fusiformes radiaires, tous les néphrons atteints" },
  { k:"kystesGlom", f2:"kystes_glomerulaires", g:"Architecture et kystes",     l:"Kystes glomérulaires nombreux" },
  { k:"kystesDiffus", g:"Architecture et kystes",   l:"Kystes corticaux ET médullaires diffus" },
  { k:"intercalaire", g:"Architecture et kystes",   l:"Parenchyme intercalaire normal entre les kystes" },
  { k:"fibrosePeriKyst", g:"Architecture et kystes", l:"Fibrose péri-kystique" },
  { k:"collecteursNorm", f2:"collecteurs_normaux", g:"Architecture et kystes", l:"Tubes collecteurs médullaires normaux, non dilatés" },
  { k:"collecteursDil", g:"Architecture et kystes", l:"Dilatation des tubes collecteurs" },
  { k:"collecteursConj", f2:"collecteurs_manchon", g:"Architecture et kystes", l:"Tubes collecteurs dilatés cernés de tissu conjonctif dense" },
  { k:"kystesCollecteurs", f2:"kystes_collecteurs", g:"Architecture et kystes", l:"Kystes dérivés des tubes collecteurs", meta:"typage EMA+ / CD10−" },
  { k:"kystesMed", f2:"kystes_medullaires", g:"Architecture et kystes", l:"Kystes médullaires" },
  { k:"oedemePeriKyst", f2:"oedeme_perikystique", g:"Architecture et kystes", l:"Œdème fibro-interstitiel péri-kystique" },
  { k:"mesAplati", f2:"mesenchyme_intercystique", g:"Architecture et kystes", l:"Mésenchyme inter-kystique aplati, quasi acellulaire" },
  { k:"mesLache", g:"Architecture et kystes", l:"Mésenchyme inter-kystique lâche" },
  { k:"nephronsDysmorphes", f2:"nephrons_rares", g:"Architecture et kystes", l:"Néphrons dysmorphiques résiduels" },
  { k:"myofibroblastique", f2:"blasteme_sma", g:"Architecture et kystes", l:"Différenciation myofibroblastique du blastème" },
  { k:"fibrosePericalic", f2:"fibrose_pericalicielle", g:"Architecture et kystes", l:"Fibrose autour des calices et des tubes collecteurs médullaires" },
  { k:"papilleAplatie", f2:"calices_dilates", g:"Architecture et kystes", l:"Papille aplatie et fibreuse" },
  { k:"blastemeBande", f2:"blasteme_bande", g:"Architecture et kystes",  l:"Blastème en bande dense parallèle à la surface",
    meta:"néphrogenèse arrêtée — décrite dès 23 SA" },
  { k:"fibroseSC", g:"Architecture et kystes",      l:"Fibrose interstitielle sous-capsulaire" },
  { k:"tcpRarefies", f2:"tcp_rares", g:"Tubes, glomérules, vaisseaux",    l:"Tubes contournés proximaux absents ou raréfiés (CD10)" },
  { k:"tcpDediff", f2:"tcp_dedifferencies", g:"Tubes, glomérules, vaisseaux", l:"Tubes proximaux dédifférenciés (sans bordure en brosse, CD10 faible)",
    meta:"doublon en base : PF.REN-MAL-050 « tubules » — un seul code exporté" },
  { k:"glomRetractes", f2:"glomerules_retractes", g:"Tubes, glomérules, vaisseaux",  l:"Glomérules rétractés, serrés" },
  { k:"hypertrophieGlom", f2:"hypertrophie_nephronique", g:"Tubes, glomérules, vaisseaux", l:"Hypertrophie glomérulaire",
    meta:"compensatrice : surtout postnatale" },
  { k:"arteriolesEp", f2:"arterioles_epaissies", g:"Tubes, glomérules, vaisseaux",   l:"Paroi des artérioles épaissie" },
  { k:"renineAbsente", f2:"renine_anomalie", g:"Tubes, glomérules, vaisseaux",  l:"Rénine non marquée dans les cellules juxta-glomérulaires" },
  { k:"renineHyper", f2:"renine_surexpression", g:"Tubes, glomérules, vaisseaux",  l:"Rénine hyperexprimée dans les cellules juxta-glomérulaires" },
  { k:"tammHorsfall", f2:"tamm_horsfall", g:"Tubes, glomérules, vaisseaux", l:"Dépôts de protéine de Tamm-Horsfall", meta:"éosinophile amorphe, confirmé en IHC" },
  { k:"crgBas", f2:"generations_reduites", g:"Tubes, glomérules, vaisseaux",         l:"CRG abaissé pour le terme" },
  { k:"crgHaut", f2:"generations_exces", g:"Tubes, glomérules, vaisseaux",        l:"CRG au-dessus de 12–14 rangées" },
  { k:"nephronsReduits", g:"Tubes, glomérules, vaisseaux", l:"Néphrons normalement constitués, en nombre réduit" },
  { k:"noyauxPerdus", g:"Nécrose",   l:"Perte des noyaux tubulaires, membranes basales nues" },
  { k:"debrisLumieres", g:"Nécrose", l:"Débris cellulaires dans les lumières tubulaires" },
  { k:"regeneration", g:"Nécrose",   l:"Régénération épithéliale (mitoses, noyaux hyperchromatiques)",
    meta:"le seul élément vital de la série" },
  { k:"scleroseSurPlancher", hpo:"HP:0000096", g:"Sclérose", l:"Glomérules scléreux au-dessus du plancher retenu" },
  { k:"scleroseSegm", g:"Sclérose",   l:"Sclérose segmentaire" },
  { k:"fibroseInterst", hpo:"HP:0005576", g:"Sclérose", l:"Fibrose interstitielle" },
  { k:"cmv", f2:"inclusions_cmv", g:"Infection",            l:"Inclusions virales de type CMV (noyau en œil de hibou)",
    meta:"survit à la macération sévère" },
  { k:"infiltrat", f2:"inflammation", g:"Infection",      l:"Infiltrat inflammatoire interstitiel" },
  { k:"microAbces", g:"Infection",     l:"Micro-abcès, polynucléaires dans les tubes" },
  { k:"colonies", g:"Infection",       l:"Colonies bactériennes (Gram tissulaire)" },
  { k:"noduleBlast", g:"Prolifération",    l:"Nodule blastémateux expansif, à limites nettes" },
  { k:"triphasique", g:"Prolifération",    l:"Contingent triphasique (blastème, épithélium, stroma)" },
  { k:"resteNephro", g:"Prolifération",    l:"Reste néphrogénique — nodule persistant sans expansion" },
  { k:"mitoses", g:"Prolifération",        l:"Mitoses nombreuses" },
  { k:"uretereDilate", f2:"voies_urinaires_anormales", g:"Contexte hors lame — macro, foie, clinique",  l:"Uretère ou bassinet dilaté en amont" },
  { k:"reinsVolumineux", hpo:"HP:0000105", g:"Contexte hors lame — macro, foie, clinique", l:"Reins volumineux, contour conservé" },
  { k:"reinsPetits", f2:"reins_petits_conserves", hpo:"HP:0000089", g:"Contexte hors lame — macro, foie, clinique",    l:"Reins de petite taille, architecture conservée" },
  { k:"poidsAugmente", g:"Contexte hors lame — macro, foie, clinique",  l:"Reins de poids augmenté" },
  { k:"plaqueDuctale", f2:"plaque_ductale", hpo:"HP:0006563", g:"Contexte hors lame — macro, foie, clinique",  l:"Plaque ductale sur le fragment de foie" },
  { k:"anomAssociees", g:"Contexte hors lame — macro, foie, clinique",  l:"Anomalies extrarénales associées (polydactylie, encéphalocèle, foie)" },
  { k:"voute", f2:"voute_ossification", g:"Contexte hors lame — macro, foie, clinique",          l:"Retard d'ossification de la voûte crânienne", meta:"constant dans la DTR" },
  { k:"exposition", f2:"exposition_medicamenteuse", g:"Contexte hors lame — macro, foie, clinique",     l:"Exposition maternelle ARA2 / IEC / AINS documentée" },
  { k:"syndromique", g:"Contexte hors lame — macro, foie, clinique",    l:"Contexte syndromique (Beckwith-Wiedemann, diabète maternel)" }
];

/* ── 06 bis · Associations — affichées, jamais cochées ────────────────────────
   Le nom se déduit des signes. « cle » est le signe pivot : sans lui le compte
   peut être atteint sans que l'association tienne. */
var DIAGS = [
  { k:"dysplasie", l:"Dysplasie rénale", cle:"tubeCollerette", min:1,
    signes:["tubeCollerette","smaCollerette","desorganisation","cartilage","kystesInegaux"],
    stop:" — l'absence de cartilage ne réfute rien : il est rare et son absence n'exclut pas la dysplasie. " +
         "Un tube à collerette CORTICAL n'a pas la même valeur : le critère est médullaire. La dysplasie " +
         "n'est pas un diagnostic étiologique — elle peut être obstructive ou syndromique." },

  { k:"obstruction", l:"Obstruction des voies urinaires", min:2,
    signes:["kysteSC","kystesNoyau","blastemeBande","collecteursDil","fibroseSC","uretereDilate"],
    stop:" — le kyste sous-capsulaire n'est PAS spécifique de l'obstruction : les AINS donnent la même " +
         "image. Ne pas nommer le niveau de l'obstacle sans les voies urinaires sur la table." },

  { k:"pkra", l:"Polykystose autosomique récessive (PKRA)", cle:"kystesRadiaires", min:2,
    signes:["kystesRadiaires","plaqueDuctale","reinsVolumineux"],
    stop:" — la plaque ductale est CONSTANTE dans la PKRA : sans foie examiné, la PKRA n'est ni retenue " +
         "ni écartée. Des kystes glomérulaires nombreux l'écartent." },

  { k:"pkda", l:"Polykystose autosomique dominante (PKDA)", min:2,
    signes:["kystesInegaux","intercalaire","kystesGlom","reinsVolumineux"],
    stop:" — des kystes glomérulaires nombreux écartent la PKRA, ils ne signent pas la PKDA pour autant." },

  { k:"ciliopathie", l:"Ciliopathie syndromique (Meckel, Bardet-Biedl)", min:2,
    signes:["kystesDiffus","collecteursNorm","fibrosePeriKyst","anomAssociees"],
    stop:" — un tube primitif à collerette EXCLUT le Meckel : c'est un critère d'exclusion, pas une " +
         "nuance. Ne pas nommer un syndrome sur le rein seul, sans l'examen fœtal complet." },

  { k:"hypoplasie", l:"Hypoplasie rénale", f2:"hypoplasie", cle:"crgBas", min:2,
    signes:["crgBas","reinsPetits","nephronsReduits"],
    stop:" — ne jamais écrire « hypoplasie oligoméganéphronique » sur un fœtus : l'hypertrophie " +
         "compensatrice qui la définit est postnatale. Un CRG bas peut aussi ne dire que : fœtus plus " +
         "jeune que le terme déclaré." },

  { k:"hyperplasie", l:"Excès de néphrons", cle:"crgHaut", min:1,
    signes:["crgHaut","poidsAugmente","syndromique"],
    stop:" — le corpus décrit jusqu'à 16 rangées à 29,5 SA : au-dessus du maximum théorique, l'excès " +
         "se constate, il ne se conclut pas seul." },

  { k:"dtr", l:"Dysplasie tubulaire rénale (DTR) et ses phénocopies", f2:"dtr", cle:"tcpRarefies", min:2,
    signes:["tcpRarefies","glomRetractes","arteriolesEp","renineAbsente","voute","exposition"],
    stop:" — l'image est une CONVERGENCE : DTR génétique, blocage du système rénine-angiotensine, " +
         "AINS donnent le même rein. Sans l'anamnèse médicamenteuse, écrire la lésion, pas la cause. " +
         "Sur macéré, ne rien conclure sans CD10." },

  { k:"nta", l:"Nécrose tubulaire aiguë", min:2,
    signes:["noyauxPerdus","debrisLumieres","regeneration"],
    stop:" — lésion et artefact de lyse post-mortem ne sont jamais départageables sur la seule " +
         "morphologie. La régénération, elle, est vitale : c'est le seul élément qui tranche." },

  { k:"glomSclerose", l:"Glomérulosclérose", cle:"scleroseSurPlancher", min:1,
    signes:["scleroseSurPlancher","scleroseSegm","fibroseInterst"],
    stop:" — deux planchers coexistent : 1–2 % [ernst] et < 1 % (service). Écrire le pourcentage compté " +
         "et le plancher retenu, ne pas trancher entre les deux." },

  { k:"infection", l:"Infection", min:2,
    signes:["cmv","infiltrat","microAbces","colonies"],
    stop:" — les inclusions virales SURVIVENT à la macération sévère : leur absence sur un rein macéré " +
         "n'exclut rien, mais leur présence reste lisible. Ne pas confondre colonies post-mortem et " +
         "infection anténatale." },

  { k:"nephroblastome", l:"Prolifération blastémateuse / néphroblastome", cle:"noduleBlast", min:2,
    signes:["noduleBlast","triphasique","resteNephro","mitoses"],
    stop:" — un blastème sous-capsulaire physiologique n'est pas un reste néphrogénique, et un reste " +
         "néphrogénique n'est pas un néphroblastome. Le panel de 13 marqueurs est une pratique de " +
         "service : le nommer comme tel." }
];

/* ── 07 · Négatifs obligatoires ───────────────────────────────────────────── */
/* Ceux que les sources imposent et que le corpus des 176 CR n'écrit jamais. */
var NEGATIFS = [
  { k:"zone", l:"État de la zone néphrogène et du blastème consigné", p:"jamais écrit dans le corpus",
    ko:"état de la zone néphrogène NON consigné — la moitié du critère de datation manque",
    auto:function(){ return E.stade ? true : null; } },
  { k:"kysteSC", signe:"kysteSC", l:"Absence de kyste sous-capsulaire cortical", p:"« hallmark of obstruction »",
    ko:"kyste sous-capsulaire cortical PRÉSENT — obstruction ou AINS" },
  { k:"orientation", l:"Orientation de la coupe déclarée", p:"conditionne la validité du CRG",
    ko:"orientation de la coupe NON déclarée — le CRG n'est pas qualifié",
    auto:function(){ return E.prelev.sagittale ? true : null; } },
  { k:"voiesHautes", signe:"uretereDilate", l:"Voies urinaires hautes non dilatées", p:"uretères et bassinets suivis",
    ko:"voies urinaires hautes ANORMALES ou non examinées" },
  { k:"crg", l:"CRG compté et rapporté au barème", p:"84 mentions dans 128 des 176 CR",
    ko:"CRG NON compté ou barème non nommé",
    auto:function(){ return E.mesure.v.crg != null && E.mesure.def ? true : null; } },
  { k:"tcp", signe:"tcpRarefies", l:"Tubes contournés proximaux présents", p:"leur raréfaction ouvre la DTR",
    ko:"TCP raréfiés ou absents — contrôler en CD10 avant de conclure" },
  { k:"cortMed", signe:"desorganisation", l:"Différenciation cortico-médullaire respectée", p:"sa perte ouvre la dysplasie",
    ko:"différenciation cortico-médullaire PERDUE" },
  { k:"symetrie", l:"Les deux reins comparés", p:"92 % des CR traitent « les reins » comme un objet unique",
    ko:"reins NON comparés séparément — une asymétrie ne serait pas vue",
    auto:function(){ return E.prelev.cotes || E.cote === "deux" ? true : null; } }
];

/* ── 08 · Techniques ──────────────────────────────────────────────────────── */
var TECHNIQUES = [
  { k:"cd10",     l:"CD10", q:"tubes contournés proximaux" },
  { k:"ema",      l:"EMA", q:"tubes distaux et collecteurs" },
  { k:"cd10cd15", l:"CD10 + CD15", q:"comptage du CRG sur rein macéré" },
  { k:"emaCd10",  l:"EMA / CD10 sur les kystes", q:"arbre de typage des kystes, Fig. 24.30" },
  { k:"sma",      l:"Anti-actine musculaire lisse", q:"collerette du tube dysplasique" },
  { k:"renine",   l:"Anti-rénine", q:"cellules juxta-glomérulaires, axe DTR" },
  { k:"trichrome",l:"Trichrome de Masson", q:"fibrose interstitielle et péri-kystique" },
  { k:"perls",    l:"Perls", q:"dépôts ferriques" },
  { k:"gram",     l:"Gram tissulaire", q:"colonies bactériennes vs « basophilic dust »" },
  { k:"adn",      l:"Envoi du congelé en génétique", q:"conseil génétique impossible sans ADN fœtal" }
];

/* ── Propositions de techniques — déduites des clics, jamais imposées ─────── */
function suggerer(){
  var s = {};
  function anormal(k){ return E.signes[k] === POS; }
  function ret(k){ return E.retention[k] === "present"; }

  /* Les propositions suivent les SIGNES : une technique se demande sur ce qu'on
     a vu, pas sur le nom qu'on lui donnerait. */
  if (anormal("tubeCollerette") || anormal("tubeColleretteCort")) s.sma = 1;
  if (anormal("desorganisation")){ s.sma = 1; s.trichrome = 1; }
  if (anormal("kysteSC") || anormal("kystesNoyau") || anormal("kystesInegaux") ||
      anormal("kystesRadiaires") || anormal("kystesGlom") || anormal("kystesDiffus") ||
      anormal("kystesCollecteurs") || anormal("kystesMed")) s.emaCd10 = 1;
  if (anormal("fibrosePeriKyst") || anormal("fibroseSC") || anormal("fibroseInterst") ||
      anormal("fibrosePericalic")) s.trichrome = 1;
  if (anormal("kystesRadiaires") || anormal("plaqueDuctale") || anormal("anomAssociees")) s.adn = 1;
  if (anormal("crgBas") || anormal("nephronsReduits")){ s.cd10 = 1; s.adn = 1; }
  if (anormal("tcpRarefies")){ s.cd10 = 1; s.renine = 1; }
  if (anormal("renineAbsente") || anormal("arteriolesEp") || anormal("voute")){ s.renine = 1; s.adn = 1; }
  if (anormal("renineHyper")) s.renine = 1;
  if (anormal("tcpDediff")) s.cd10 = 1;
  if (anormal("scleroseSurPlancher") || anormal("scleroseSegm")) s.trichrome = 1;
  if (anormal("cmv") || anormal("infiltrat") || anormal("microAbces") || anormal("colonies")) s.gram = 1;
  if (anormal("noduleBlast") || anormal("resteNephro")) s.cd10 = 1;

  if (ret("poussiere")) s.gram = 1;
  if (ret("tcpAbsents")) s.cd10 = 1;
  /* Compter sur macéré à l'œil nu ne tient pas : le double marquage rend les glomérules. */
  if (E.mesure.v.crg == null && RETENTION.some(function(r){ return E.retention[r.k] === "present" && r.q !== "mauvais"; }))
    s.cd10cd15 = 1;
  if (E.mesure.opt === "hes" && E.mesure.v.crg != null) s.cd10cd15 = 1;

  if (E.prelev.congele && SIGNES.some(function(x){ return E.signes[x.k] === POS; }))
    s.adn = 1;
  return s;
}

/* ── Contrôles propres au rein ────────────────────────────────────────────── */
async function testsOrgane(chk, clic, set, crTient, pause){
  /* Les deux barèmes, isolément */
  chk("T15.6 : 24 SA → 3",        baremeT156(24).l === "3");
  chk("T15.6 : 30 SA → 8–9",      baremeT156(30).l === "8–9");
  chk("T15.6 : 40 SA → 10–14",    baremeT156(40).l === "10–14");
  chk("règle A : 19 SA → 2–3",    baremeRegleA(19).l === "2–3");
  chk("règle A : plateau à 24 SA", baremeRegleA(24).l === "2–3");
  chk("règle A : ≥ 35 SA → 12–14", baremeRegleA(36).l === "12–14");
  /* Le point de la fiche : à 34 SA règle A ≈ 12, Table 15.6 donne 9–10. */
  chk("divergence à 34 SA",       baremeT156(34).hi < baremeRegleA(34).lo);

  set("sa", "34");
  set("m_crg", "10");
  /* Le compte s'entre sans barème : c'est une observation, pas une interprétation. */
  chk("CRG accepté sans barème",  $("vMesure").className.indexOf("bad") < 0 &&
      crTient("le compte est consigné, l'interprétation reste ouverte"));
  chk("situé dans les deux barèmes", crTient("conforme selon la Table 15.6, bas selon la règle +1/semaine"));
  chk("désaccord des barèmes signalé", crTient("les deux barèmes ne s'accordent pas ici"));

  set("m_crg", "2");
  chk("accord des deux barèmes",  crTient("les deux barèmes le situent bas"));
  set("m_crg", "10");

  clic("mdef", "t156");
  chk("les deux barèmes affichés", crTient("Table 15.6 : 9–10") && crTient("règle +1/semaine : 11–13"));
  chk("divergence nommée dans le CR", crTient("Les deux barèmes divergent ici"));
  chk("conforme sous T15.6",      crTient("Compte conforme."));

  clic("mdef", "regleA");
  chk("bas sous règle A",         crTient("Compte BAS") && crTient("néphrogenèse arrêtée"));
  chk("les trois lectures d'un CRG bas", crTient("hypoplasie") && crTient("fœtus plus jeune"));
  chk("réserve zone néphrogène",  crTient("état de la zone néphrogène non consigné"));

  set("m_crg", "16");
  chk("excès de néphrons",        crTient("au-dessus du maximum") && crTient("16 rangées à 29,5 SA"));
  set("m_crg", "");
  clic("mdef", "regleA");

  /* La branche qui porte le sens : zone épuisée avant le terme. */
  clic("stade", "absente");
  chk("néphrogenèse arrêtée sur avance", crTient("néphrogenèse arrêtée") &&
      crTient("quatre bornes sourcées"));
  clic("stade", "absente");

  /* Divergences portées, jamais arbitrées */
  chk("rétention : attribution reconstruite", par(RETENTION, "basoTubIso").note.indexOf("RECONSTRUCTION") >= 0);
  /* la pratique du service ne compte pas devant les livres : pas de palier 2–4 semaines */
  chk("rétention : pas de palier de service", !par(RETENTION, "basoTubQq"));
  chk("sclérose : deux planchers",  par(DIAGS, "glomSclerose").stop.indexOf("1–2 %") >= 0 &&
      par(DIAGS, "glomSclerose").stop.indexOf("< 1 %") >= 0);
  chk("dysplasie : cartilage non réfutant", par(DIAGS, "dysplasie").stop.indexOf("n'exclut pas") >= 0);
  chk("Meckel exclu par le tube à collerette", par(DIAGS, "ciliopathie").stop.indexOf("EXCLUT") >= 0);
  chk("jamais d'HOM sur un fœtus", par(DIAGS, "hypoplasie").stop.indexOf("oligoméganéphronique") >= 0);
  chk("DTR : convergence à trois", par(DIAGS, "dtr").stop.indexOf("CONVERGENCE") >= 0);

  /* Le nom se déduit des signes — il ne se coche pas */
  chk("aucun bouton ne porte un diagnostic",
      DIAGS.every(function(d){ return !document.querySelector('[data-act="les"][data-k="' + d.k + '"]'); }));

  /* Le banc commun laisse des signes posés : on part d'un état voulu, pas supposé. */
  function pose(k, v){ if (E.signes[k] !== v) clic("les", k, v); }
  function ote(k){ if (E.signes[k]) clic("les", k, E.signes[k]); }
  function tenue(k){ return associations().some(function(a){ return a.d.k === k && a.tenu; }); }

  pose("tcpRarefies", POS);
  pose("glomRetractes", POS);
  chk("DTR se lit dans l'association", tenue("dtr") &&
      crTient("Dysplasie tubulaire rénale (DTR) et ses phénocopies — association tenue"));
  chk("DTR propose rénine et CD10", suggerer().renine === 1 && suggerer().cd10 === 1);

  /* Le compte sans le pivot ne tient pas : la DTR se lit sur les TCP raréfiés */
  ote("tcpRarefies");
  pose("arteriolesEp", POS);
  chk("sans le signe pivot, l'association ne tient pas", !tenue("dtr") &&
      crTient("signe pivot non coché : " + par(SIGNES, "tcpRarefies").l));
  ote("glomRetractes"); ote("arteriolesEp");

  /* Un tube à collerette CORTICAL ne fait pas la dysplasie */
  ote("tubeCollerette");
  pose("tubeColleretteCort", POS);
  chk("collerette corticale ne tient pas la dysplasie", !tenue("dysplasie"));
  pose("tubeCollerette", POS);
  chk("collerette médullaire tient la dysplasie", tenue("dysplasie"));
  chk("dysplasie propose le SMA", suggerer().sma === 1);
  ote("tubeColleretteCort");

  clic("ret", "poussiere", "present");
  chk("poussière propose le Gram", suggerer().gram === 1);
  clic("ret", "poussiere", "present");

  /* v3 : la section Termes FOETO est fondue dans les signes */
  chk("v3 : plus de section Termes FOETO", $("secFoeto").hidden && !!$("secSignes").querySelector("#rqFoeto"));
  chk("v3 : terme maladie sur l'association", par(DIAGS, "dtr").foeto[0] === "FOETO2:PF.REN-DIA-dtr");
  set("rqFoeto", "Tamm");
  $("sgFoeto").querySelector('[data-pick="FOETO2:PF.REN-CON-tamm_horsfall"]').click();
  chk("v3 : un terme porté par un signe pose le signe", E.signes.tammHorsfall === POS && !E.foeto["FOETO2:PF.REN-CON-tamm_horsfall"]);
  chk("v3.1 : libellé venu de FOETO v2", par(SIGNES, "kysteSC").l === "Kystes sous-capsulaires corticaux");
  /* seules les correspondances v1 EXACTES suivent : MAL-036 est partielle (fiche § 10 C) */
  chk("v3.1 : codes v1 exacts seulement", codesDe(par(SIGNES, "kystesNoyau")).indexOf("FOETO:PF.REN-MAL-003") > 0 &&
      codesDe(par(SIGNES, "kysteSC")).indexOf("FOETO:PF.REN-MAL-036") < 0);
  ote("tammHorsfall");
}
