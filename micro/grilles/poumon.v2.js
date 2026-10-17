/* Grille de lecture — poumon. VERSION 2 (2.0.0).
   Migration de grille_poumon.html (1.1.1, écrite à la main, gabarit de FORME de
   toutes les grilles) sur le patron rein v3 : gen_grille.py, mode présence,
   termes FOETO fondus dans les signes, branchée sur FOETO (termes tagués
   « verbatim »), blocs lus en §02. La v1 reste publiée à côté tant que la v2
   n'a pas été validée à l'usage.
   Ce que la v2 change, sans rien retrancher de la v1 :
   · les critères des lésions deviennent des SIGNES (constats présent / absent /
     non regardé) ; les lésions deviennent des associations, affichées, jamais
     cochées. Les 44 constats de fiche_poumon.md tagués dans FOETO ont chacun
     leur signe ; deux constats de la fiche sans terme FOETO portent fiche:"…" ;
   · les cases Pattern 1 / 2 et uni / bilatérale ne sont plus des cases : le côté
     se déclare en §02 (organe pair), le pattern se lit en croisant l'hypoplasie
     avec la §04 Maturation ;
   · les six négatifs se DÉDUISENT des signes ;
   · la citation keeling du cartilage de type 1 est rétablie en entier
     (« small islands of cartilage may be present » ; la v1 la tronquait) ;
   · compte radial et rapport de poids sont des observations : ils s'entrent sans
     définition ni terme, et se situent ensuite (la v1 bloquait en rouge un compte
     sans définition).
   Fond : ~/Bureau/fiches_lecture/fiche_poumon.md (§1 à §9).
   Les divergences entre sources sont PORTÉES dans les champs, jamais arbitrées. */

var ORGANE  = "poumon";
var TITRE   = "poumon";
var SOURCE  = "fiche_poumon.md";
var MODULE  = "grille_poumon";
var VERSION = "2.0.0";
var SCHEMA  = "0.3.0";   /* 0.3.0 : signes present/absent, négatifs déduits */
var ETATS   = "presence";
var FOETO_DANS_SIGNES = true;
var GROUPES_SANS_ETENDUE = ["Contexte hors lame — macro, clinique"];
var PAIR    = true;
var BLOCS   = true;

var TITRE_CR    = "POUMONS";
var STADE_TITRE = "Stade de maturation";

var KCL_TXT = "Fœticide par KCl déclaré : ses effets sur les tissus fœtaux miment la macération, et le poumon " +
              "est nommément dans la liste des sites atteints. Aucune borne de rétention ne s'écrit avant " +
              "vérification du mode d'interruption.";

var RETARD_NOTE = "Un retard HOMOGÈNE et isolé sur un poumon de poids normal fait chercher l'ACD/MPV et la " +
                  "dysplasie alvéolaire congénitale AVANT d'être écrit comme un retard.";
var AVANCE_NOTE = "";

var TECH_NOTE = "Les pointillés sont des propositions déduites des clics, jamais des prescriptions.";

/* ── 02 · Prélèvement ─────────────────────────────────────────────────────── */
var PRELEV = [
  { k:"plevre", g:"Qualifie la lecture", l:"Plèvre ou septum interlobulaire sur le bloc", grave:true,
    manque:"sans plèvre ni septum sur le bloc, AUCUN compte radial n'est recevable — la ligne de comptage n'a pas de point d'arrivée" },
  { k:"trachee", g:"Qualifie la lecture", l:"Larynx et trachée en 3–4 blocs transversaux",
    manque:"sans larynx ni trachée, on perd le critère de datation le plus spécifique de l'organe (chondrocytes trachéaux, spéc. 1,000 · VPP 1,000)" },
  { k:"faisceau", g:"Qualifie la lecture", l:"Faisceau broncho-vasculaire présent" },
  { k:"lateralite", g:"Qualifie la lecture", l:"Droit et gauche sur blocs séparés, latéralité notée" },
  { k:"lobes",  g:"Critères de coupe — iront à la grille macro fixée", l:"Un bloc par lobe principal (5)" },
  { k:"coeur",  g:"Critères de coupe — iront à la grille macro fixée", l:"Poumons prélevés avec le cœur" },
  { k:"nlobes", g:"Critères de coupe — iront à la grille macro fixée", l:"Nombre de lobes consigné" }
];

/* ── 03 · Rétention · les six lignes pulmonaires de [Genest I] ───────────────
   Les deux bons prédicteurs en tête. Les mauvais restent cliquables — ils se
   voient, ils ne datent pas. */
var RETENTION = [
  { k:"basoBronche", l:"Perte de basophilie de l'épithélium bronchique", h:96, b:"≥ 96 h", q:"bon", d:"spéc. 0,973" },
  { k:"chondroTrachee", l:"Perte de basophilie des chondrocytes trachéaux", h:168, b:"≥ 1 semaine", q:"bon",
    d:"spéc. 1,000 · VPP 1,000", note:"lisible seulement si larynx et trachée sont prélevés (§02)" },
  { k:"paroiAlv", l:"Perte de basophilie de la paroi alvéolaire", h:336, b:"≥ 2 semaines", q:"moyen", d:"spéc. 0,949",
    alerte:"fenêtre 2–4 semaines : ernst tient qu'aucun organe fœtal ne l'estime bien, la fiche réconcilie par une lecture, pas par une source" },
  { k:"detachMuq", l:"Détachement de l'épithélium muqueux bronchique", h:18, b:"≥ 18 h", q:"mauvais",
    d:"spéc. 0,588 — le pire faux ami du poumon",
    note:"le détachement épithélial muqueux est constant au-delà de 18 h et ne discrimine presque rien (spéc. 0,588) — lire la basophilie du même épithélium, pas son décollement" },
  { k:"matriceCart", l:"Altération de la matrice cartilagineuse bronchique", h:24, b:"≥ 24 h", q:"mauvais", d:"spéc. 0,625",
    note:"la matrice cartilagineuse bronchique est un mauvais prédicteur (spéc. 0,625) ; le cartilage qui date, ce sont les chondrocytes trachéaux" },
  { k:"perteMax", l:"Perte de basophilie maximale du poumon", h:1344, b:"> 8 semaines", q:"mauvais",
    d:"classement de l'article, non déductible de ses chiffres" }
];

/* ── 04 · Stades. Bornes reconstruites depuis la prose (§ 9.17 de la fiche) ── */
var STADES = [
  { k:"embryonnaire",      l:"Embryonnaire",      max:8  },
  { k:"pseudoglandulaire", l:"Pseudoglandulaire", max:18 },
  { k:"canaliculaire",     l:"Canaliculaire",     max:26 },
  { k:"sacculaire",        l:"Sacculaire",        max:36,
    note:"borne basse 26 SA (soffoet) ; keeling donne ~30 SA — 4 semaines d'écart, non tranché" },
  { k:"alveolaire",        l:"Alvéolaire",        max:99, note:"surtout post-natal" }
];

/* ── 04 bis · Compte radial alvéolaire et rapport de poids ─────────────────
   Deux observations : elles s'entrent sans définition ni terme, et se situent
   ensuite. La définition du compte est l'interprétation qui vient après. */
var MESURE = {
  titre:"Compte radial alvéolaire et rapport de poids",
  defLabel:"définition du compte",
  optLabel:"œdème fœtal",
  aide:"Compte radial alvéolaire : nombre d'espaces aériques traversés par la perpendiculaire menée de la " +
       "bronchiole jusqu'à la plèvre ou au septum le plus proche — sans plèvre ni septum sur le bloc, aucun " +
       "compte n'est recevable. Rapport de poids : poids des deux poumons / poids du corps.",
  defs:[{ k:"resp", l:"Bronchiole respiratoire",
          aide:"soffoet · ernst — c'est la définition dont vient la normale de 2,2" },
        { k:"term", l:"Bronchiole terminale",
          aide:"keeling — normales non superposables, ne pas y appliquer le 2,2" }],
  opts:[{ k:"sec", l:"Pas d'anasarque" }, { k:"anasarque", l:"Anasarque" }],
  champs:[{ id:"rac_d", label:"RAC droit",  min:0, max:20, step:0.1 },
          { id:"rac_g", label:"RAC gauche", min:0, max:20, step:0.1 },
          { id:"poids_poumons", label:"Poids des poumons (g)", min:0, max:200, step:0.01 },
          { id:"poids_foetal",  label:"Poids du corps (g)",    min:0, max:6000, step:1 }]
};

function texteRac(){
  var d = E.mesure.v.rac_d, g = E.mesure.v.rac_g, sa = num("sa"), def = E.mesure.def;
  if (d == null && g == null) return null;
  var v = [], res = [], cls = "ok";
  if (d != null) v.push("droit " + d);
  if (g != null) v.push("gauche " + g);
  var t = "Compte radial alvéolaire " + v.join(", ") +
          (def ? " (" + par(MESURE.defs, def).l.toLowerCase() + ")." : ".") +
          " Repères : ≈ 2,2 entre 24 et 27 semaines — échelle non déclarée par la source, l'écart possible est de deux semaines — et 4 à 6 au terme.";
  if (!def) res.push("définition non déclarée — le compte est consigné, l'interprétation reste ouverte : bronchiole respiratoire et bronchiole terminale sont deux structures différentes, les deux comptes ne sont pas superposables et la normale de 2,2 ne vaut que pour la première");
  if (def === "term") res.push("définition « bronchiole terminale » — ne pas y appliquer la normale de 2,2, qui vient de la définition respiratoire");
  if (!E.prelev.plevre) res.push("bloc sans plèvre ni septum confirmé — compte non recevable");
  if (sa != null && sa <= 24) res.push("à " + sa + " SA le compte n'est pas recevable (soffoet : au-delà de 24 semaines)");
  else if (sa != null && sa < 32) res.push("keeling ne le tient pour utile qu'après 32–36 semaines ; ernst ne conclut que si la valeur est nettement hors de la fourchette");
  if (d != null && g != null && Math.abs(d - g) >= 1)
    res.push("asymétrie D/G de " + Math.abs(d - g).toFixed(1) + " : le degré d'inflation modifie sensiblement les comptes et la variabilité inter-observateur est marquée — multiplier les comptes avant d'y lire une asymétrie de maturation vraie");
  if (res.length){ cls = "warn"; t += " Réserves : " + res.join(" ; ") + "."; }
  return { cls:cls, txt:t };
}

function texteRatio(){
  var p = E.mesure.v.poids_poumons, f = E.mesure.v.poids_foetal, sa = num("sa");
  if (p == null || f == null || !f) return null;
  var r = p / f, t = "Rapport poids des poumons / poids du corps " + r.toFixed(4);
  /* Sans terme, le rapport est situé contre les DEUX seuils, sans en choisir un. */
  var seuils = sa == null ? [0.015, 0.012] : [sa >= 28 ? 0.012 : 0.015];
  var sous = seuils.map(function(s){ return r < s; });
  if (sa == null)
    t += " — terme non saisi : " + (sous[0] ? "sous" : "au-dessus de") + " 0,015 (< 28 SA), " +
         (sous[1] ? "sous" : "au-dessus de") + " 0,012 (≥ 28 SA).";
  else
    t += " pour un seuil de " + String(seuils[0]).replace(".", ",") + " (" + (sa >= 28 ? "≥ 28" : "< 28") + " SA) : " +
         (sous[0] ? "sous le seuil." : "au-dessus du seuil.");
  t += " Le seuil est reconnu arbitraire par sa propre source (moitié du rapport moyen du groupe 20–27 semaines) ; plancher absolu 1,2 % du poids du corps.";
  if (E.mesure.opt === "anasarque")
    return { cls:"warn", sous:false,
      txt:t + " ANASARQUE déclarée : le dénominateur est artificiellement augmenté, le rapport est aléatoire et ne doit pas être opposé." };
  return { cls: sous.indexOf(true) >= 0 ? "warn" : "ok", sous: sous.every(Boolean), txt:t };
}

function verdictMesure(){
  var a = texteRac(), b = texteRatio();
  if (!a && !b) return { cls:"", txt:"Compte radial et rapport de poids non saisis — l'hypoplasie reste non chiffrée." };
  var cls = [a, b].some(function(x){ return x && x.cls === "warn"; }) ? "warn" : "ok";
  return { cls:cls, txt:[a, b].filter(Boolean).map(function(x){ return x.txt; }).join(" ") };
}

/* ── 05 · Variantes normales ──────────────────────────────────────────────── */
var VARIANTES = [
  { k:"caryo",   l:"Matériel caryorrhectique abondant" },
  { k:"squames", l:"Quelques squames éparses" },
  { k:"repli",   l:"Repliement de l'épithélium des voies aériennes" },
  { k:"asym",    l:"Asymétrie droite/gauche de maturation" },
  { k:"anneaux", l:"Demi-anneaux trachéaux" },
  { k:"media",   l:"Média artériolaire fœtale épaisse" },
  { k:"veinesSepta", l:"Veines dans les septa interlobulaires, artères avec les bronches" },
  { k:"surfactant",  l:"Masses éosinophiles amorphes distales : résidu d'instillation de surfactant" },
  { k:"artefacts",   l:"Blue blobs, mulberries, yellow starbursts (macération)" },
  { k:"detachBronchiol", l:"Détachement de l'épithélium bronchiolaire (macération)" },
  { k:"epanchement", l:"Épanchement pleural de macération" },
  { k:"poussiere",   l:"Poussière basophile autour des viscères" }
];

/* ── 06 · Signes ──────────────────────────────────────────────────────────────
   On coche ce qu'on voit, un signe à la fois. Aucun nom de maladie ici : les
   noms se lisent en dessous, dans DIAGS, par association des signes cochés.
   Un signe branché (fv) prend son libellé et son HPO dans FOETO. */
var SIGNES = [
  { k:"divisionsReduites", fv:"FOETO:PF.POU-MAL-048", g:"Développement", meta:"atteinte avant la 16e semaine" },
  { k:"emphyseme",         fv:"FOETO:PF.POU-MAL-015", g:"Développement" },

  { k:"muscuIntra", fv:"FOETO:PF.POU-VAS-001", g:"Vaisseaux",
    meta:"ce qui compte est le NIVEAU atteint (bronchiole respiratoire, parois sacculaires ou alvéolaires), pas l'épaisseur" },
  { k:"epaississementMedial", fv:"FOETO:PF.POU-MAL-059", g:"Vaisseaux" },
  { k:"malalignVeines",  fv:"FOETO:PF.POU-VAS-005", g:"Vaisseaux" },
  { k:"capillairesRares", fv:"FOETO:PF.POU-VAS-003", g:"Vaisseaux" },
  { k:"densiteVasc",     fv:"FOETO:PF.POU-VAS-004", g:"Vaisseaux" },
  { k:"lymphangiectasie", fv:"FOETO:PF.POU-MAL-025", g:"Vaisseaux" },
  { k:"cerveauEmbolise", fv:"FOETO:PF.POU-MAL-085", g:"Vaisseaux", meta:"GFAP ou CD56" },

  { k:"sacsBronchiques", fv:"FOETO:PF.POU-MAL-077", g:"Kystes et malformations", meta:"Stocker type 0" },
  { k:"kystesGrands",    fv:"FOETO:PF.POU-MAL-063", g:"Kystes et malformations", meta:"Stocker type 1" },
  { k:"kystesPetits",    fv:"FOETO:PF.POU-MAL-065", g:"Kystes et malformations", meta:"Stocker type 2" },
  { k:"kystesInfra5",    fv:"FOETO:PF.POU-MAL-064", g:"Kystes et malformations", meta:"Stocker type 3" },
  { k:"kystesPneumocytes", fv:"FOETO:PF.POU-MAL-066", g:"Kystes et malformations", meta:"Stocker type 4 — chercher un composant solide" },
  { k:"mucigene",        fv:"FOETO:PF.POU-MAL-052", g:"Kystes et malformations" },
  { k:"fibresStriees",   fv:"FOETO:PF.POU-MAL-060", g:"Kystes et malformations" },
  { k:"cartilageKyste",  fv:"FOETO:PF.POU-MAL-058", g:"Kystes et malformations" },
  { k:"glandesKyste",    fv:"FOETO:PF.POU-MAL-061", g:"Kystes et malformations" },
  { k:"sansCommunication", fv:"FOETO:PF.POU-MAL-055", g:"Kystes et malformations" },
  { k:"artereSystemique", fv:"FOETO:PF.POU-VAS-002", g:"Kystes et malformations" },
  { k:"plevrePropre",    fv:"FOETO:PF.POU-MAL-072", g:"Kystes et malformations" },
  { k:"retentionMucus",  fv:"FOETO:PF.POU-MAL-076", g:"Kystes et malformations" },
  { k:"parenchymeIntercale", fv:"FOETO:PF.POU-INF-018", g:"Kystes et malformations" },

  { k:"reacInterst",    fv:"FOETO:PF.POU-INF-019", g:"Infection et inflammation",
    meta:"le critère qui prouve ou exclut la pneumopathie" },
  { k:"agregatsLympho", fv:"FOETO:PF.POU-MAL-002", g:"Infection et inflammation" },
  { k:"pnnLumiere",     fv:"FOETO:PF.POU-INF-015", g:"Infection et inflammation",
    meta:"dans la lumière SEULE, ne fait pas une pneumopathie ; le matériel caryorrhectique les mime" },
  { k:"membranesBleues", fv:"FOETO:PF.POU-MAL-068", g:"Infection et inflammation" },
  { k:"hyphes", fiche:"[keeling]", g:"Infection et inflammation", l:"Hyphes dans une bronchopneumonie floride" },
  { k:"abcesGranulo",   fv:"FOETO:PF.POU-INF-016", g:"Infection et inflammation" },
  { k:"onion",          fv:"FOETO:PF.POU-INF-017", g:"Infection et inflammation" },
  { k:"inclusions",     fv:"FOETO:PF.POU-INF-005", g:"Infection et inflammation",
    meta:"gardent leur valeur sous macération" },
  { k:"necroseBland",   fv:"FOETO:PF.POU-VAS-006", g:"Infection et inflammation" },

  { k:"squamesNombreuses", fv:"FOETO:PF.POU-CLA-002", g:"Aspiration",
    meta:"le critère est quantitatif : quelques squames éparses sont normales" },
  { k:"bouchonsSquames", fv:"FOETO:PF.POU-MAL-057", g:"Aspiration" },
  { k:"meconiumAlv",     fv:"FOETO:PF.POU-MAL-012", g:"Aspiration" },

  { k:"membranesHyalines", fv:"FOETO:PF.POU-MAL-069", g:"Membranes hyalines et matériel intra-alvéolaire" },
  { k:"necroseBronchiol", fv:"FOETO:PF.POU-INF-006", g:"Membranes hyalines et matériel intra-alvéolaire",
    meta:"signe le plus précoce" },
  { k:"membranophages",  fv:"FOETO:PF.POU-MAL-027", g:"Membranes hyalines et matériel intra-alvéolaire" },
  { k:"pneumocytesRegen", fiche:"[keeling]", g:"Membranes hyalines et matériel intra-alvéolaire",
    l:"Pneumocytes de type II régénératifs recouvrant les membranes" },
  { k:"materielPAS",     fv:"FOETO:PF.POU-MAL-067", g:"Membranes hyalines et matériel intra-alvéolaire" },

  { k:"poumonsPetits",   fv:"FOETO:PF.POU-MAL-074", g:"Contexte hors lame — macro, clinique" },
  { k:"poumonsCoeur",    fv:"FOETO:PF.POU-MAL-073", g:"Contexte hors lame — macro, clinique" },
  { k:"poumonsVolumineux", fv:"FOETO:PF.POU-MAL-075", g:"Contexte hors lame — macro, clinique" },
  { k:"anomalieLobation", fv:"FOETO:PF.POU-MAL-056", g:"Contexte hors lame — macro, clinique" },
  { k:"obstructionLaryngee", fv:"FOETO:PF.POU-MAL-070", g:"Contexte hors lame — macro, clinique" },
  { k:"oligoamnios",     fv:"FOETO:PF.POU-MAL-071", g:"Contexte hors lame — macro, clinique" },
  { k:"hernieDiaph",     fv:"FOETO:PF.POU-MAL-062", g:"Contexte hors lame — macro, clinique" }
];

/* ── 06 bis · Associations — affichées, jamais cochées ────────────────────── */
var DIAGS = [
  { k:"hypoplasie", l:"Hypoplasie pulmonaire", fv:"FOETO:PF.POU-MAL-080", cle:"poumonsPetits", min:1,
    signes:["poumonsPetits","poumonsCoeur","divisionsReduites","oligoamnios","hernieDiaph"],
    stop:" — hypoplasie et retard de maturation sont deux axes dissociables — les écrire ensemble écrase " +
         "l'information la plus discriminante de l'organe. Pattern 1 (immature ET mal développé) ou pattern 2 " +
         "(mal développé, maturation appropriée) : croiser avec la §04 Maturation ; uni- ou bilatérale : le côté " +
         "de la §02. La micro décrit calibre, compte et épaisseur des septa ; l'entité et sa cause se nomment dans " +
         "la conclusion, après la face, le placenta, les radios, le tronc cérébral et le muscle." },

  { k:"muscularisation", l:"Muscularisation artériolaire intra-acinaire", cle:"muscuIntra", min:1,
    signes:["muscuIntra","hernieDiaph"],
    stop:" — ce qui compte est le NIVEAU atteint par le muscle, pas son épaisseur : la média fœtale normale est " +
         "épaisse. soffoet tient toute muscularisation intra-acineuse pour pathologique, ernst la dit problématique " +
         "sans quantification étendue — divergence d'assertivité à écrire, pas à arbitrer." },

  { k:"cpam", l:"CPAM / MAKP (Stocker)", min:1,
    signes:["sacsBronchiques","kystesGrands","kystesPetits","kystesInfra5","kystesPneumocytes","mucigene","fibresStriees","cartilageKyste"],
    stop:" — la classification est difficile à appliquer en vie fœtale, et jusqu'à un quart des lésions sont " +
         "hybrides avec la séquestration. Le cartilage du type 1 : « sans cartilage » et datation avant la 10e " +
         "semaine chez soffoet, « small islands of cartilage may be present » chez keeling — ne pas dater là-dessus. Type 4 : " +
         "chercher un composant solide, le blastome pleuro-pulmonaire est très difficile à écarter." },

  { k:"sequestration", l:"Séquestration pulmonaire", fv:"FOETO:PF.POU-MAL-083", cle:"sansCommunication", min:1,
    signes:["sansCommunication","artereSystemique","plevrePropre","retentionMucus","parenchymeIntercale"],
    stop:" — la vascularisation systémique n'est pas un hallmark : elle se voit aussi dans les lobes atteints de " +
         "CPAM. Le parenchyme interposé peut lui aussi être anormal. Intralobaire (souvent lobe inférieur gauche) " +
         "ou extralobaire (plèvre propre) : à écrire." },

  { k:"bronchogenique", l:"Kyste bronchogénique", fv:"FOETO:PF.POU-MAL-023", min:1,
    signes:["glandesKyste","cartilageKyste"],
    stop:" — sans glandes ni cartilage dans la paroi, rien ne sépare le kyste bronchogénique du kyste " +
         "œsophagien. Pas de connexion à l'arbre trachéo-bronchique (kyste sans air)." },

  { k:"hyperplasie", l:"Hyperplasie pulmonaire", fv:"FOETO:PF.POU-MAL-019", cle:"poumonsVolumineux", min:1,
    signes:["poumonsVolumineux","obstructionLaryngee","oligoamnios"],
    stop:" — des poumons non hypoplasiques malgré un oligoamnios majeur ne réfutent pas l'oligoamnios : ils " +
         "orientent vers une obstruction haute. Couper le larynx en 3–4 blocs et chercher les autres signes du " +
         "syndrome de Fraser." },

  { k:"acd", l:"ACD / MPV — dysplasie alvéolo-capillaire", fv:"FOETO:PF.POU-VAS-007", cle:"malalignVeines", min:2,
    signes:["malalignVeines","epaississementMedial","capillairesRares","densiteVasc","lymphangiectasie"],
    stop:" — l'ACD MIME un arrêt de maturation (développement lobulaire déficient), la dysplasie alvéolaire " +
         "congénitale aussi — et cette dernière survient sur des poumons macroscopiquement normaux. Un retard de " +
         "maturation homogène et isolé sur un poumon de poids normal fait chercher ces deux entités AVANT d'être " +
         "écrit comme un retard." },

  { k:"pneumopathie", l:"Pneumopathie infectieuse", fv:"FOETO:PF.POU-INF-023", cle:"reacInterst", min:1,
    signes:["reacInterst","agregatsLympho","pnnLumiere","membranesBleues","hyphes","abcesGranulo","onion","inclusions","necroseBland"],
    stop:" — des polynucléaires dans la LUMIÈRE SEULE ne font pas une pneumopathie : la réaction interstitielle " +
         "ou vasculaire est requise pour la prouver. Le matériel caryorrhectique normal mime les polynucléaires. " +
         "Un épanchement peut tenir à la macération." },

  { k:"aspiration", l:"Aspiration — squames, méconium", min:1,
    signes:["squamesNombreuses","bouchonsSquames","meconiumAlv"],
    stop:" — le critère est quantitatif : quelques squames éparses sont normales. Un infiltrat inflammatoire aigu " +
         "étendu est inhabituel — chez le mort-né, l'aspiration méconiale est le plus souvent un événement " +
         "terminal, pas causal." },

  { k:"membranes", l:"Membranes hyalines", fv:"FOETO:PF.POU-MAL-082", cle:"membranesHyalines", min:1,
    signes:["membranesHyalines","necroseBronchiol","membranophages","pneumocytesRegen"],
    stop:" — lésion de nouveau-né : elle suppose une ventilation post-natale. Hors périmètre du fœtus mort in " +
         "utero — à connaître pour ne pas la chercher là où elle ne peut pas être." }
];

/* ── 07 · Négatifs obligatoires — déduits des signes ──────────────────────── */
var NEGATIFS = [
  { k:"interstitiel", signe:"reacInterst", l:"Absence de réaction interstitielle ou vasculaire",
    p:"c'est le critère qui prouve ou exclut la pneumopathie (§ 5.8)",
    ko:"réaction interstitielle ou vasculaire PRÉSENTE — la pneumopathie est prouvée" },
  { k:"muscu", signe:"muscuIntra", l:"Absence de muscularisation des artérioles intra-acinaires",
    p:"c'est ce qui valide la lecture d'une média fœtale épaisse comme normale (§ 4)",
    ko:"muscularisation intra-acinaire PRÉSENTE — la média épaisse n'est plus une variante" },
  { k:"malalign", signe:"malalignVeines", l:"Absence de malalignement des veines pulmonaires",
    p:"sans lui, un retard de maturation homogène n'est pas interprétable (§ 5.7)",
    ko:"veines pulmonaires MALPOSÉES — l'ACD/MPV est ouverte" },
  { k:"viral", signe:"inclusions", l:"Absence d'inclusion virale",
    p:"au poumon ce négatif garde sa valeur sous macération, là où les autres organes la perdent",
    ko:"inclusions virales PRÉSENTES" },
  { k:"squames", l:"Absence de squames en excès et de méconium intra-alvéolaire",
    p:"le critère est quantitatif : dire squames sans dire en excès ou non ne dit rien",
    ko:"squames en excès ou méconium intra-alvéolaire PRÉSENTS",
    auto:function(){
      var a = E.signes.squamesNombreuses, b = E.signes.meconiumAlv;
      return a === POS || b === POS ? false : a === NEG && b === NEG ? true : null; } },
  { k:"lobation", signe:"anomalieLobation", l:"Absence d'anomalie de la lobation",
    p:"20 des 22 cas résiduels s'associaient à une malformation cardiaque — ce négatif conditionne un AUTRE organe",
    ko:"anomalie de la lobation PRÉSENTE — regarder le cœur" }
];

/* ── 08 · Techniques ──────────────────────────────────────────────────────── */
var TECHNIQUES = [
  { k:"gram",      l:"Gram tissulaire",             q:"Y a-t-il des germes ? Cette poussière basophile est-elle bactérienne ?" },
  { k:"pas",       l:"PAS",                         q:"Ce matériel intra-alvéolaire est-il une protéinose ?" },
  { k:"cd34",      l:"CD34",                        q:"Les capillaires atteignent-ils la paroi alvéolaire ?" },
  { k:"evg",       l:"Élastique van Gieson",        q:"La veine chemine-t-elle avec l'artère ?" },
  { k:"d240",      l:"D2-40 + actine muscle lisse", q:"Ce vaisseau est-il un lymphatique ?" },
  { k:"elastique", l:"Coloration élastique",        q:"Où s'arrête le poumon séquestré ?" },
  { k:"orceine",   l:"Orcéine / élastique",         q:"Cette artériole intra-acinaire est-elle muscularisée ?" },
  { k:"gfap",      l:"GFAP ou CD56",                q:"Ce tissu est-il du cerveau embolisé ?" },
  { k:"trichrome", l:"Trichrome de Masson",         q:"L'architecture tient-elle sous macération sévère ?" },
  { k:"sp",        l:"SP-A / SP-B / proSP-C",       q:"Ce déficit du surfactant est-il SP-B ou SP-C ?" },
  { k:"insuf",     l:"Insufflation au formol",      q:"Question de maturité ou de morphométrie." }
];

/* ── Propositions de techniques — déduites des clics, jamais imposées ─────── */
function suggerer(){
  var s = {};
  function vu(){ for (var i = 0; i < arguments.length; i++) if (E.signes[arguments[i]] === POS) return true; return false; }
  if (vu("reacInterst", "pnnLumiere", "membranesBleues", "hyphes", "abcesGranulo")) s.gram = 1;
  if (vu("malalignVeines", "capillairesRares", "densiteVasc", "epaississementMedial")){ s.cd34 = 1; s.evg = 1; }
  if (vu("sansCommunication", "artereSystemique", "plevrePropre")) s.elastique = 1;
  if (vu("muscuIntra")) s.orceine = 1;
  if (vu("membranesHyalines", "materielPAS")) s.pas = 1;
  if (vu("materielPAS")) s.sp = 1;
  if (vu("poumonsPetits", "divisionsReduites")) s.insuf = 1;
  if (vu("lymphangiectasie")) s.d240 = 1;
  if (vu("cerveauEmbolise")) s.gfap = 1;
  var r = verdictRetention();
  if (r.borne && r.borne.h >= 336) s.trichrome = 1;
  if (verdictMaturation().txt.indexOf("Retard de maturation") === 0){ s.cd34 = 1; s.evg = 1; }
  return s;
}

/* ── Contrôles propres au poumon ──────────────────────────────────────────── */
async function testsOrgane(chk, clic, set, crTient, pause){
  function pose(k, v){ if (E.signes[k] !== v) clic("les", k, v); }
  function ote(k){ if (E.signes[k]) clic("les", k, E.signes[k]); }
  function tenue(k){ return associations().some(function(a){ return a.d.k === k && a.tenu; }); }

  /* Le compte s'entre sans définition : c'est une observation (la v1 le bloquait en rouge). */
  set("sa", "34");
  set("m_rac_d", "4");
  chk("RAC accepté sans définition", $("vMesure").className.indexOf("bad") < 0 &&
      crTient("le compte est consigné, l'interprétation reste ouverte"));
  clic("mdef", "term");
  chk("RAC terminal : pas de 2,2", crTient("ne pas y appliquer la normale de 2,2"));
  clic("mdef", "term");
  set("m_rac_g", "2.5");
  chk("asymétrie D/G nommée", crTient("asymétrie D/G de 1.5"));
  set("m_rac_d", ""); set("m_rac_g", "");

  /* Rapport de poids : seuil selon le terme, les deux sans terme, anasarque */
  set("m_poids_poumons", "10"); set("m_poids_foetal", "1000");
  chk("rapport sous 0,012 à 34 SA", crTient("0.0100 pour un seuil de 0,012 (≥ 28 SA) : sous le seuil."));
  set("sa", "");
  chk("sans terme : situé dans les deux seuils", crTient("sous 0,015 (< 28 SA), sous 0,012 (≥ 28 SA)"));
  set("sa", "34");
  clic("mopt", "anasarque");
  chk("anasarque : rapport non opposable", crTient("ANASARQUE déclarée") && $("vMesure").className.indexOf("bad") < 0);
  clic("mopt", "anasarque");
  set("m_poids_poumons", ""); set("m_poids_foetal", "");

  /* Pneumopathie : les polynucléaires endoluminaux seuls ne la font pas */
  pose("pnnLumiere", POS);
  chk("PNN dans la lumière seuls : pas de pneumopathie", !tenue("pneumopathie"));
  pose("reacInterst", POS);
  chk("réaction interstitielle : pneumopathie tenue", tenue("pneumopathie") && suggerer().gram === 1);
  chk("négatif interstitiel au CR", crTient("réaction interstitielle ou vasculaire PRÉSENTE"));
  ote("pnnLumiere"); ote("reacInterst");

  /* ACD : deux signes dont le pivot ; propose CD34 + EVG */
  pose("epaississementMedial", POS);
  pose("capillairesRares", POS);
  chk("ACD sans veines malposées ne tient pas", !tenue("acd"));
  pose("malalignVeines", POS);
  chk("ACD tenue sur les veines malposées", tenue("acd") && suggerer().cd34 === 1 && suggerer().evg === 1);
  ote("epaississementMedial"); ote("capillairesRares"); ote("malalignVeines");

  /* Squames : négatif calculé sur deux signes */
  pose("squamesNombreuses", NEG); pose("meconiumAlv", NEG);
  chk("squames et méconium absents → négatif énoncé", etatNegatif(par(NEGATIFS, "squames")) === "ok");
  pose("meconiumAlv", POS);
  chk("méconium présent → négatif tombé", etatNegatif(par(NEGATIFS, "squames")) === "ko");
  ote("squamesNombreuses"); ote("meconiumAlv");

  /* Retard de maturation : ACD/MPV avant d'écrire un retard */
  clic("stade", "canaliculaire");
  chk("retard → chercher l'ACD", crTient("Retard de maturation") && crTient("ACD/MPV") && suggerer().cd34 === 1);
  clic("stade", "canaliculaire");

  /* Divergences portées, jamais arbitrées */
  chk("sacculaire : 26 contre ~30 SA", par(STADES, "sacculaire").note.indexOf("non tranché") >= 0);
  chk("muscularisation : divergence d'assertivité", par(DIAGS, "muscularisation").stop.indexOf("pas à arbitrer") >= 0);
  chk("CPAM : cartilage du type 1 non datant", par(DIAGS, "cpam").stop.indexOf("ne pas dater") >= 0);

  /* Branchement FOETO */
  chk("v2 : libellé venu de FOETO", par(SIGNES, "poumonsPetits").l === "Poumons petits dans une cage thoracique petite");
  chk("v2 : code FOETO du terme verbatim", codesDe(par(SIGNES, "meconiumAlv"))[0] === "FOETO:PF.POU-MAL-012");
  chk("v2 : constat de fiche sans terme non marqué hors fiche",
      !par(SIGNES, "hyphes").horsFiche && !par(SIGNES, "pneumocytesRegen").horsFiche);
  chk("v2 : terme maladie sur l'association", par(DIAGS, "acd").foeto[0] === "FOETO:PF.POU-VAS-007");
  chk("v2 : blocs lus en §02", BLOCS_LUS && !$("blocsBloc").hidden);
}
