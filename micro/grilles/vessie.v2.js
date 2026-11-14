/* Grille de lecture — vessie et voies urinaires basses (urètre, ouraque). VERSION 2 (2.0.0).
   Migration de vessie.js (1.0.1) sur le patron rein 3.5.0 / poumon 2.1.0 : mode
   présence, termes FOETO fondus dans les signes et branchés (termes tagués
   “verbatim”), blocs lus en §02, ordre de lecture (LECTURE). La v1 reste
   publiée à côté tant que la v2 n'a pas été validée à l'usage.
   Fond : ~/Bureau/fiches_lecture/fiche_vessie.md (§1 à §10).
   Forme : gen_grille.py, calquée sur grille_poumon.html.
   Les divergences entre sources sont PORTÉES dans les champs, jamais arbitrées.
   Aucune page n'est citée : page_start est vide sur tout le corpus.

   La fiche est mince et sa minceur EST le résultat : 8 chunks de source
   histologique, 5 CR sur 176 décrivant l'organe en micro, aucun rang de
   macération, aucune norme d'épaisseur pariétale. Rien n'est comblé ici.

   Ce que la v2 change par rapport à la v1, sans rien retrancher :
   · un signe est un CONSTAT, présent / absent / non regardé (plus normal /
     anormal). Les 26 constats de la fiche tagués dans FOETO ont chacun leur
     signe (fv) ; quatre étaient absents de la v1 et entrent : mégavessie du
     1er trimestre, urètre postérieur effilé sans obstacle, vessie à paroi
     épaisse non trabéculée, désorganisation cortico-médullaire du rein. Deux
     artefacts tagués (perforation au cathétérisme, urètre délabré) sont
     branchés aussi. Un signe branché prend son libellé dans FOETO ; la
     précision du libellé v1 passe dans meta. Un constat de la fiche sans terme
     porte fiche:"[source]" — dont les observations du service, fiche:"[corpus CR]" ;
   · l'urine obtenue au méat devient un signe (FOETO) distinct du cathétérisme
     passé ; tous deux sont de polarité normale (présent = urètre perméable) et
     restent hors du Non en bloc (bloc:false) ;
   · v1 eviscerationArtefactuelle (libellé v1 : perforation ou déchirure vésicale
     rapportable au geste) se scinde : perforation au cathétérisme et urètre
     délabré (lame d'urètre), éviscération artefactuelle vraie (corpus CR) ;
   · les associations portent les termes-maladies de FOETO. Mégavessie sans
     obstacle anatomique (v1) s'éclate en prune belly, mégavessie-microcôlon et
     dysgénésie cloacale, chacune avec son pivot ; l'exstrophie en vésicale et
     cloacale ; le trépied de l'obstacle bas (valves, sténose, atrésie) entre à
     côté de l'association v1 Obstacle urétral, gardée (c'est la lame) ;
   · les huit négatifs se DÉDUISENT des signes ou des données consignées ;
   · ordre de lecture : le contexte hors lame en quatre cadres (vessie et urètre
     en macro ; amont, rein, poumon, Potter ; paroi abdominale, génital, digestif,
     exstrophie ; ouraque et cordon) avant la rétention, puis trois cadres de lame lus
     du faible au fort grossissement (mag, [expérience], à valider à l'usage) ;
     chaque variante normale vit dans le cadre qu'elle mime et ne passe au CR
     qu'en parenthèse. Le reliquat allantoïdien se lit sur la lame de CORDON,
     autre prélèvement : ses deux signes vivent dans le contexte hors lame ;
   · les guillemets « » sont réservés aux livres : les verbatims du corpus CR
     passent en “ ” suivis de [corpus CR] ;
   · le prélèvement sépare ce qui qualifie la lecture des critères de dissection,
     destinés à la future grille macro fixée.
   Inchangés : rétention (le seul prédicteur bon est un report), stades, les
   deux axes catégoriels (site du bloc, couches présentes) et leur verdict
   bloquant, techniques. */

var ORGANE  = "vessie";
var TITRE   = "vessie et voies urinaires basses — urètre, ouraque";
var SOURCE  = "fiche_vessie.md";
var MODULE  = "grille_vessie";
var VERSION = "2.0.0";
var SCHEMA  = "0.3.0";   /* 0.3.0 : signes present/absent, négatifs déduits */
var ETATS   = "presence";
var FOETO_DANS_SIGNES = true;
var BLOCS   = true;
var LECTURE = true;   /* cadres (CADRES), grossissement (mag), variantes dans leur cadre */

/* La vessie est MÉDIANE : elle n'a pas de côté. Ce qui se latéralise dans ce
   territoire, ce sont les uretères — et la fiche les laisse au rein, dont la
   grille porte déjà les voies hautes et l'uretère dilaté. L'axe de variation
   n'est donc pas droite/gauche : c'est le SITE du bloc et les COUCHES présentes
   sur la coupe, et les deux vivent en Maturation. */
var PAIR = false;

/* Sur l'urètre, une étendue focale / diffuse ne veut rien dire. */
var GROUPES_SANS_ETENDUE = ["Urètre et continuité vésico-urétrale"];

var TITRE_CR    = "VESSIE";
var STADE_TITRE = "Densité de la musculeuse propre — seul axe de maturation de l'organe, et il n'est jamais mesuré";

var KCL_TXT = "Fœticide par KCl déclaré. Aucune borne n'était de toute façon recevable ici : la vessie n'a " +
              "AUCUN rang de macération — elle est absente de la Table 15.6 de [keeling, ch. 15] et de " +
              "[ernst, ch. 37], zéro occurrence mesurée. Le geste se consigne ; il ne retire rien, il n'y " +
              "avait rien à retirer. Reste que l'heure du décès est alors connue : la datation se lit sur " +
              "les autres organes, avec cette heure pour étalon.";

/* Sur cet organe, un “retard” est presque toujours un effet de site ou de réplétion. */
var RETARD_NOTE = "Avant de parler de retard : l'organe ne date pas. « This full-thickness view of the " +
                  "bladder wall near term illustrates how little the microscopic features of the bladder " +
                  "wall change during the second and third trimesters of gestation, except for an increase " +
                  "in smooth muscle in the muscularis propria » [ernst, ch. 9, légende Fig. 9.6]. Une " +
                  "musculeuse jugée pauvre est d'abord un effet de SITE — hors col, « three distinct layers " +
                  "cannot be identified » — et de RÉPLÉTION, avant d'être un retard. Et les légendes des " +
                  "Fig. 9.3, 9.4 et 9.5, celles de l'urothélium mûr et de la musculeuse du 3e trimestre, " +
                  "sont perdues à l'extraction : le repère visuel n'est pas consultable (§ 9-11).";

var AVANCE_NOTE = "Une musculeuse jugée dense avant le terme n'est pas une avance de maturation : c'est la " +
                  "lecture d'une paroi de lutte qui se pose alors, et elle ne se conclut pas ici. « the " +
                  "fetal bladder becomes enlarged and hypertrophic in the presence of prolonged obstruction " +
                  "of the bladder outlet or urethra. These pathologic changes should be distinguished from " +
                  "the normal variability of physiologic dilatation, which will also affect the thickness " +
                  "of the wall and its histological appearance. » [ernst, ch. 9]. Aucune mesure n'existe : " +
                  "ni épaisseur pariétale par terme, ni ratio muscle/paroi, ni compte de faisceaux (§ 9-3).";

var TECH_NOTE = "Les pointillés sont des propositions déduites des clics, jamais des prescriptions. Deux " +
                "faits bornent ce paragraphe : aucune immunohistochimie de la vessie ou de l'urètre n'est " +
                "décrite dans les trois sources, et le corpus n'en pratique aucune (§ 9-10) — la case " +
                "absente ici n'est donc pas un oubli. La seule technique histologique explicitement " +
                "prescrite pour ce territoire est la coupe étagée de l'urètre ; tout le reste est " +
                "macroscopique, et c'est le résultat du § 5.7.";

/* ── 02 · Prélèvement ─────────────────────────────────────────────────────────
   En routine, rien : le temps vésical du manuel d'autopsie est entièrement
   macroscopique et 4 CR sur 152 seulement citent la vessie en prélèvements. Ce
   § n'est donc pas une liste de vœux, c'est le relevé de ce qui décide de la
   lisibilité de la lame quand une lame existe. */
var PRELEV = [
  { k:"repletion", g:"Qualifie la lecture", l:"État de réplétion noté AVANT l'ouverture de la vessie", grave:true,
    manque:"c'est le piège central de la fiche : la réplétion commande À LA FOIS le nombre de couches " +
           "urothéliales, l'épaisseur du chorion et l'épaisseur pariétale globale [ernst, ch. 9]. Et la " +
           "pièce examinée est une vessie VIDÉE par le geste — trois lectures dépendent d'une variable que " +
           "le compte rendu ne note jamais" },
  { k:"col", g:"Qualifie la lecture", l:"Col vésical inclus dans le bloc",
    manque:"« Similar to the adult bladder, the layers of smooth muscle that constitute the muscularis " +
           "propria frequently have no definite orientation, and three distinct layers cannot be " +
           "identified, with the exception of the area of the bladder neck » [ernst, ch. 9] : un bloc de " +
           "dôme ou de face latérale ne donne pas d'architecture musculaire lisible. Aucune source ne " +
           "prescrit pourtant de site — décision de service, non documentée (§ 9-4)" },
  { k:"cordon", g:"Qualifie la lecture", l:"Coupe de cordon prise entre les deux artères ombilicales",
    manque:"résultat contre-intuitif du § 5.6 : l'urothélium que la lame de routine rencontre n'est presque " +
           "jamais dans un bloc de vessie, il est dans le cordon — « The remains of this connection in the " +
           "umbilical cord are always located centrally between the two umbilical arteries, and they " +
           "usually consist of a collection of epithelial cells without lumens. » [benirschke, ch. 16]" },
  { k:"reinPoumon", g:"Qualifie la lecture", l:"Lames de REIN et de POUMON du même fœtus disponibles", grave:true,
    manque:"la vessie ne s'interprète jamais seule : la gravité de l'obstruction se lit sur le rein, sa " +
           "conséquence létale sur le poumon. Sans ces deux lames, la séquence obstructive n'est ni " +
           "retenue ni écartée — elle est seulement esquissée" },
  { k:"sexeGonadique", g:"Qualifie la lecture", l:"Sexe gonadique établi",
    manque:"« Certaines mégavessies rentrent dans le cadre d'une dysgénésie cloacale. C'est pratiquement " +
           "toujours le cas lorsque le fœtus est de sexe féminin. » [soffoet, ch. 9] — et un phénotype " +
           "masculin ne suffit pas : le § 5.4 décrit un fœtus de « phénotype masculin mais de sexe " +
           "gonadique féminin »" },
  { k:"gesteConsigne", g:"Qualifie la lecture", l:"Cathétérisme et ouverture antérieure de l'urètre consignés",
    manque:"« Wigglesworth suggests that this appearance might be transformed to the more classically " +
           "described one by the passage of a catheter or by opening the urethra anteriorly at necropsy. » " +
           "[keeling, ch. 24] : l'aspect classique des valves peut être un artefact de dissection. Un geste " +
           "non consigné devient une morphologie" },
  { k:"tempsVesical", g:"Critères de dissection — iront à la grille macro fixée",
    l:"Temps vésical fait — pression au méat, ouverture, aspect de l'urine et de la muqueuse notés", grave:true,
    manque:"« La vessie est ensuite ouverte. L'aspect de l'urine et de la muqueuse vésicale sont notés. » " +
           "[soffoet, ch. 3] : c'est tout le temps vésical du manuel, et il ne comporte aucun prélèvement. " +
           "Sans lui, la lame arrive sans son observation d'origine" },
  { k:"uretreTotalite", g:"Critères de dissection — iront à la grille macro fixée",
    l:"Urètre prélevé en totalité, coupes étagées", grave:true,
    manque:"« Le très jeune âge des fœtus concernés ajoute une difficulté supplémentaire à la dissection " +
           "qui n'est pas toujours possible. » et alors « Dans ce cas on peut essayer de mettre en évidence " +
           "l'obstacle en faisant des coupes histologiques étagées de l'urètre prélevé en totalité. » " +
           "[soffoet, ch. 9] — la seule technique histologique prescrite pour ce territoire" },
  { k:"monobloc", g:"Critères de dissection — iront à la grille macro fixée",
    l:"Bloc vésico-génito-digestif disséqué monobloc", grave:true,
    manque:"« Une section des branches ilio-pubiennes et des branches ischio-pubiennes permet de disséquer " +
           "de façon monobloc l'ensemble vésico-génito-digestif » [soffoet, ch. 8] : c'est le bloc de toute " +
           "anomalie génitale ou cloacale, et son objet n'est pas la paroi vésicale mais la CONTINUITÉ " +
           "vésico-urétrale" },
  { k:"veru", g:"Critères de dissection — iront à la grille macro fixée",
    l:"Urètre postérieur ouvert jusqu'au veru montanum",
    manque:"« can be seen in most fetal specimens » [ernst, ch. 14] — le veru est le repère qui donne sa " +
           "valeur au négatif de valves ; sans lui, écrire l'absence de repli valvulaire ne dit rien" },
  { k:"ouraqueRespecte", g:"Critères de dissection — iront à la grille macro fixée",
    l:"Incision en Y renversé — ouraque et artères ombilicales respectés",
    manque:"« l'insertion fœtale du cordon occupant l'angle formé par les deux branches de l'Y afin de bien " +
           "respecter les deux artères ombilicales et l'ouraque » [soffoet, ch. 3] : l'incision existe pour " +
           "épargner l'ouraque, une médiane mal conduite le détruit" }
];

/* ── 03 · Rétention ───────────────────────────────────────────────────────────
   Ce bloc ne date rien, et c'est son contenu. Mesuré, non supposé : bladder,
   urinary et urothelium ne renvoient rien dans [keeling, ch. 15] ni dans
   [ernst, ch. 37]. Aucun rang, donc aucune heure. Le seul prédicteur BON est
   un REPORT depuis les autres organes ; tout le reste ordonne ou ne dit rien.
   basophiliePerdue est le constat FOETO PF.REN-NOR-048 (la rétention ne se
   branche pas : voir le rapport de migration). */
var HORS_BAREME = "la vessie est absente de la Table 15.6 et de [ernst, ch. 37], zéro occurrence mesurée : " +
                  "lui attribuer un rang par analogie — urothélium comme épithélium bronchique, muscle " +
                  "lisse comme myocarde — serait une invention, et la fiche refuse l'analogie (§ 9-2)";

var MODIF = "modificateurs communs de l'horloge, valables ici comme ailleurs : « accelerated by fetal " +
            "hydrops and delivery-autopsy interval of >24 h, and decelerated by fetal gestational age " +
            "<25/40 » [keeling, ch. 15]";

var RETENTION = [
  { k:"reportAutresOrganes", l:"Délai lu sur les AUTRES organes de la même autopsie — rein, foie, myocarde, tube digestif",
    b:"reportée des autres organes", d:"report, jamais mesuré sur la vessie", h:1, q:"bon",
    note:HORS_BAREME, alerte:MODIF },

  { k:"musculeuseSeule", l:"Musculeuse encore identifiable alors que l'urothélium est nécrosé", b:"compartiment résistant encore là",
    d:"ordre structurel, non chiffré", h:2, q:"moyen",
    note:"le muscle lisse est la structure qui survit, et le corpus le confirme dans son cas le plus " +
         "délabré : “La vessie est composée d'une épaisse couche scléreuse à l'intérieur de laquelle se " +
         "trouve un urothélium nécrosé” [corpus CR]. Cela ORDONNE sans DATER : " + HORS_BAREME },

  { k:"urotheliumAbsent", l:"Urothélium incomplet ou totalement absent", b:"—", d:"artefact d'autopsie de base", h:0, q:"mauvais",
    note:"c'est le seul fait de lisibilité sourcé, et il est catégorique : « The urothelium is usually up " +
         "to six to seven layers thick in the contracted bladder, but in autopsy specimens, the urothelium " +
         "often is poorly preserved, and its layers may be incomplete or completely absent » [ernst, " +
         "ch. 9]. Le constat est fait sur des spécimens d'autopsie EN GÉNÉRAL, pas sur des fœtus macérés : " +
         "la desquamation urothéliale ne date rien et ne permet jamais de conclure à une nécrose ni à une " +
         "desquamation lésionnelle" },

  { k:"chorionEpais", l:"Chorion épais, conjonctif dense conservé", b:"—", d:"non interprétable — dépend de la réplétion", h:0, q:"mauvais",
    note:"« The underlying lamina propria is relatively thick, depending on the degree of dilatation » " +
         "[ernst, ch. 9] : l'épaisseur du chorion mesure la réplétion, pas le temps" },

  { k:"basophiliePerdue", l:"Perte de la basophilie nucléaire dans la paroi vésicale", b:"—", d:"aucun rang attribuable", h:0, q:"mauvais",
    note:"« There is a predictable pattern of loss of nuclear basophilia in the internal organs which " +
         "should not be mistaken for necrosis » [keeling, ch. 15] — la règle générale s'applique, la " +
         "séquence chiffrée non : " + HORS_BAREME },

  { k:"sediment", l:"Sédiment intravésical ancien, débris en suspension", b:"—", d:"origine post-mortem non départageable", h:0, q:"mauvais",
    note:"le corpus décrit un “sédiment hémorragique ancien” et des débris méconiaux [corpus CR] ; rien " +
         "ne permet d'en dater ni d'en trancher l'origine post-mortem" },

  { k:"vessieVidee", l:"Vessie vidée par la pression au méat avant l'ouverture", b:"—", d:"geste, pas rétention", h:0, q:"mauvais",
    note:"« La vessie est ensuite ouverte. L'aspect de l'urine et de la muqueuse vésicale sont notés. » " +
         "[soffoet, ch. 3] : la pièce examinée est une vessie vidée PAR LE GESTE. Ce qui en découle — " +
         "couches urothéliales, épaisseur pariétale — est une conséquence de manipulation, à ne lire ni " +
         "comme un délai ni comme une lésion" }
];

/* ── 04 · Maturation ──────────────────────────────────────────────────────────
   Quatre rangs, pas un de plus, et la fiche dit d'emblée qu'ils ne datent pas :
   « how little the microscopic features of the bladder wall change during the
   second and third trimesters of gestation ». L'urothélium, lui, est mûr tôt et
   sort de l'échelle. Les bornes 10, 20 et 28 SA sont les seules sourçables ;
   celle de 28 est une MISE EN FORME du mot « third trimester », pas une date.
   L'axe est le terme FOETO PF.REN-NOR-038 (les stades ne se branchent pas). */
var STADES = [
  { k:"mesenchyme", l:"Mésenchyme indifférencié — musculeuse non encore séparée du chorion", max:10,
    note:"« During the eighth week, beginning at the dome of the bladder, the undifferentiated mesenchyme " +
         "begins to differentiate into lamina propria and muscularis propria » [ernst, ch. 9] — la " +
         "différenciation commence AU DÔME : un bloc de col peut être en retard sur un bloc de dôme sans " +
         "que rien ne soit anormal" },
  { k:"peuDeveloppee", l:"Musculeuse présente mais relativement peu développée", max:20,
    note:"« the muscularis propria, which is relatively poorly developed in the early midtrimester » " +
         "[ernst, ch. 9, renvoi Fig. 9.1, 16 semaines du livre] — qualitatif, jamais mesuré" },
  { k:"faisceauxSepares", l:"Faisceaux musculaires encore séparés par un stroma abondant", max:28,
    note:"« The muscularis propria is better developed than in Fig. 9.1, but the smooth muscle fascicles " +
         "still remain separated by relatively abundant stroma » [ernst, ch. 9, légende Fig. 9.2, " +
         "19 semaines du livre]. La borne haute de 28 SA MET EN FORME le mot « third trimester » : aucune " +
         "source ne place de repère entre ce rang et le suivant, et les deux légendes qui le feraient sont " +
         "perdues (§ 9-11)" },
  { k:"epaississement", l:"Musculeuse progressivement épaissie, maturation achevée", max:99,
    note:"« becomes progressively thicker during the third trimester » et « Full maturation of the " +
         "epithelium and muscularis propria is completed in fetal life. » [ernst, ch. 9] — achevée avant " +
         "la naissance, sans date. L'urothélium, lui, est hors échelle : « The urothelium becomes well " +
         "differentiated early in the midtrimester and has a similar appearance to the adult urothelium »" }
];

/* ── 04 bis · Les deux axes catégoriels ───────────────────────────────────────
   1) Le SITE du bloc, qui décide de ce que la musculeuse peut montrer : seul le
      col donne trois couches identifiables.
   2) Les COUCHES présentes sur la coupe, c'est-à-dire paroi complète ou non.
      Sur une paroi incomplète, l'épaisseur de la musculeuse — le signe qui
      compterait, celui de l'obstruction sous-vésicale — NE SE JUGE PAS : le
      verdict est bloquant, et il l'est aussi quand le site n'est pas déclaré.
   Le compte de couches urothéliales est le terme FOETO PF.REN-NOR-039. */
var PLANS = [
  { k:"col",        l:"Col vésical", trois:true },
  { k:"dome",       l:"Dôme", trois:false },
  { k:"lateral",    l:"Paroi latérale", trois:false },
  { k:"superieure", l:"Vessie supérieure, adventice recouverte de péritoine", trois:false },
  { k:"uretrePost", l:"Urètre postérieur et veru montanum, coupes étagées", trois:false },
  { k:"monobloc",   l:"Bloc vésico-génito-digestif, coupes sériées", trois:false },
  { k:"cordon",     l:"Cordon ombilical, entre les deux artères", trois:false },
  { k:"siteNonDeclare", l:"Site du bloc NON déclaré", trois:false }
];

var COUCHES = [
  { k:"quatre",          l:"Les quatre couches — urothélium, chorion, musculeuse, adventice", c:4 },
  { k:"sansUrothelium",  l:"Paroi sans urothélium — chorion, musculeuse, adventice", c:3 },
  { k:"sansAdventice",   l:"Paroi sans adventice — urothélium, chorion, musculeuse", c:3 },
  { k:"musculeuseSeuleC", l:"Musculeuse seule identifiable", c:1 },
  { k:"tangentielle",    l:"Coupe tangentielle — aucune couche traversée de part en part", c:0 },
  { k:"couchesNonDeclarees", l:"Couches présentes NON déclarées", c:null }
];

var MESURE = {
  titre:"Site du bloc, couches présentes, comptes et épaisseurs",
  defLabel:"site du bloc — seul le col donne trois couches musculaires",
  optLabel:"couches présentes — paroi complète ou incomplète",
  defs:PLANS, opts:COUCHES,
  champs:[
    { id:"couches",    label:"Couches urothéliales comptées", min:0, max:20, step:1 },
    { id:"musculeuse", label:"Épaisseur de la musculeuse (mm)", min:0, max:15, step:0.1 },
    { id:"paroi",      label:"Épaisseur pariétale totale à la coupe (mm)", min:0, max:30, step:0.1 }
  ]
};

var SANS_NORME = "Aucune norme d'épaisseur de paroi vésicale par terme n'existe, ni ratio muscle/paroi, ni " +
                 "compte de faisceaux : les seules mesures du corpus sont macroscopiques et sans normal " +
                 "associé — “2 mm à la coupe”, “mesure 6 x 3 x 3 cm”, “globulaire d'environ 3 cm de " +
                 "diamètre” [corpus CR] (§ 9-3). Le chiffre se consigne, il ne se rapporte à rien.";

function trois(k){ var p = k ? par(PLANS, k) : null; return !!(p && p.trois); }
function nbCouches(k){ var o = k ? par(COUCHES, k) : null; return o ? o.c : null; }

function verdictMesure(){
  var site = E.mesure.def, cou = E.mesure.opt;
  var nc = E.mesure.v.couches, mus = E.mesure.v.musculeuse, ep = E.mesure.v.paroi;
  if (!site && !cou && nc == null && mus == null && ep == null)
    return { cls:"", txt:"Ni site de bloc, ni couches déclarées, ni mesure — la lame n'est pas située." };

  var t = [], res = [], cls = "ok";
  var c = nbCouches(cou);
  var complete = (c === 4);
  var siteVrai = site && site !== "siteNonDeclare";

  if (!siteVrai){
    cls = "warn";
    res.push("site du bloc non déclaré — « three distinct layers cannot be identified, with the exception " +
             "of the area of the bladder neck » [ernst, ch. 9] : sans site, une musculeuse jugée pauvre " +
             "peut n'être qu'un bloc de dôme");
  } else {
    t.push("Site : " + par(PLANS, site).l.toLowerCase() + ".");
    if (site === "col")
      t.push("C'est le seul site où l'architecture musculaire est lisible.");
    else if (site === "dome" || site === "lateral" || site === "superieure")
      t.push("Hors col, les faisceaux « frequently have no definite orientation » : l'organisation " +
             "musculaire ne se juge pas sur ce bloc.");
    if (site === "superieure")
      t.push("Un péritoine sur l'adventice est attendu ici — « The adventitia consists of a thin layer of " +
             "connective tissue, which may be covered by peritoneum in sections of the superior bladder » " +
             "[ernst, ch. 9, légende Fig. 9.1] — et ne se lit pas comme une couche surnuméraire.");
    if (site === "cordon")
      t.push("Sur le cordon, l'objet n'est pas une paroi vésicale mais un reliquat allantoïdien, et le " +
             "critère est la POSITION : « always located centrally between the two umbilical arteries ». " +
             "Présent dans 14,6 % des cordons — c'est une variante, pas une lésion.");
    if (site === "uretrePost" || site === "monobloc")
      t.push("Sur ce bloc, la question lisible est la CONTINUITÉ vésico-urétrale, pas la paroi.");
  }

  if (!cou || cou === "couchesNonDeclarees"){
    cls = "warn";
    res.push("couches présentes non déclarées — paroi complète ou incomplète non établie");
  } else {
    t.push("Couches lues : " + par(COUCHES, cou).l.toLowerCase() + ".");
    if (!complete)
      t.push("Paroi INCOMPLÈTE : la lecture pariétale est partielle.");
  }

  /* Le verdict bloquant de l'organe. */
  if (mus != null){
    if (!complete){
      cls = "bad";
      t.push("Épaisseur de musculeuse saisie sur une paroi incomplète ou non déclarée : elle NE SE JUGE " +
             "PAS. C'est pourtant le seul chiffre qui aurait un sens ici — celui de l'obstruction " +
             "sous-vésicale — et il exige les quatre couches sur la même coupe pour savoir de quoi la " +
             "mesure est la fraction. Le chiffre est consigné ; il n'est pas interprété.");
    } else {
      if (!trois(site)){
        if (cls === "ok") cls = "warn";
        res.push("épaisseur de musculeuse mesurée hors col — « three distinct layers cannot be identified » " +
                 "ailleurs, la mesure porte sur des faisceaux sans orientation définie");
      }
      t.push("Musculeuse : " + mus + " mm sur paroi complète. " + SANS_NORME);
    }
    if (!E.prelev.repletion)
      res.push("réplétion non notée — « the normal variability of physiologic dilatation, which will also " +
               "affect the thickness of the wall and its histological appearance » [ernst, ch. 9] : sans " +
               "elle l'épaisseur n'a pas de dénominateur");
  }

  if (nc != null){
    t.push("Couches urothéliales comptées : " + nc + ". Six à sept couches est une valeur d'ÉTAT DE " +
           "RÉPLÉTION, pas de terme — « consisting of a variable number of cellular layers depending on " +
           "the degree of bladder dilatation » [ernst, ch. 9].");
    if (nc === 0)
      t.push("Zéro couche n'est pas une nécrose : « in autopsy specimens, the urothelium often is poorly " +
             "preserved » — c'est le régime ordinaire de la pièce d'autopsie.");
    if (cou === "sansUrothelium" && nc > 0){
      if (cls === "ok") cls = "warn";
      res.push("couches comptées alors que l'axe déclare une paroi sans urothélium — l'un des deux est faux");
    }
    if (!E.prelev.repletion)
      res.push("réplétion non notée — le compte des couches urothéliales n'est alors rapportable à rien");
  }

  if (ep != null){
    t.push("Épaisseur pariétale : " + ep + " mm. " + SANS_NORME);
    t.push("Et l'épaisseur ne signe rien dans un sens ni dans l'autre : l'obstruction basse donne « either " +
           "thin or very thick » [keeling, ch. 24].");
  }

  if (E.stade && !complete){
    if (cls !== "bad") cls = "bad";
    res.push("stade de maturation coché sur une paroi incomplète ou non déclarée — le rang de Maturation EST " +
             "la densité de la musculeuse : il n'est pas jugeable ici");
  }
  if (!E.prelev.tempsVesical)
    res.push("temps vésical non confirmé — la lame arrive sans l'observation macroscopique qui la précède");

  if (res.length){
    if (cls === "ok") cls = "warn";
    t.push("Réserves : " + res.join(" ; ") + ".");
  }
  return { cls:cls, txt:t.join(" ") };
}

/* ── Cadres — l'ordre de lecture ─────────────────────────────────────────────
   La vessie est l'organe le plus macroscopique de la série (§ 5.7) : presque
   tout ce qui compte vit hors de la lame, en quatre cadres hors lame ; la lame,
   quand elle existe, se lit en trois cadres — paroi et contenu au faible
   grossissement, puis l'urothélium ; l'urètre est l'autre bloc du territoire.
   Le reliquat allantoïdien se lit sur la lame de cordon, autre prélèvement :
   il n'a pas de cadre ici, ses signes vivent dans le contexte hors lame. */
var CADRES = [
  { g:"Contexte hors lame — vessie et urètre en macro", hors:true },
  { g:"Contexte hors lame — amont, rein, poumon, Potter", hors:true },
  { g:"Contexte hors lame — paroi abdominale, génital, digestif, exstrophie", hors:true },
  { g:"Contexte hors lame — ouraque et cordon", hors:true },
  { g:"Paroi et contenu vésical", sur:"Vessie" },
  { g:"Urothélium", sur:"Vessie" },
  { g:"Urètre et continuité vésico-urétrale", sur:"Urètre" }
];

/* ── Variantes normales — chacune dans le cadre dont elle mime un signe ──────
   Sur cet organe la liste est longue et ce n'est pas un ornement : la quasi-
   totalité de ce que la lame de routine montre ici est une variante, et le
   reliquat allantoïdien du cordon — 14,6 % — est de loin l'urothélium le plus
   souvent rencontré. C'est une variante, pas une lésion [benirschke, ch. 16].
   Elles correspondent aux termes FOETO PF.REN-NOR-039 à 057 (une variante ne se
   branche pas : voir le rapport de migration). */
var VARIANTES = [
  { k:"desquamation", g:"Urothélium", l:"Urothélium desquamé ou absent — « in autopsy specimens, the urothelium often is poorly preserved »" },
  { k:"sixSept", g:"Urothélium",      l:"Six à sept couches urothéliales — « six to seven layers thick in the contracted bladder », valeur de réplétion" },
  { k:"urotheliumMur", g:"Urothélium", l:"Urothélium d'aspect adulte dès le milieu de grossesse — « fully differentiated prenatally »" },
  { k:"chorionVariable", g:"Paroi et contenu vésical", l:"Chorion d'épaisseur relative, fonction de la dilatation" },
  { k:"muscMuqIndistincte", g:"Paroi et contenu vésical", l:"Musculaire muqueuse indistincte — « may be indistinct and composed of a thin, discontinuous layer of smooth muscle », existence contestée" },
  { k:"faisceauxSansOrientation", g:"Paroi et contenu vésical", l:"Faisceaux musculaires sans orientation définie hors du col" },
  { k:"peritoine", g:"Paroi et contenu vésical", l:"Péritoine recouvrant l'adventice sur une coupe de vessie supérieure" },
  { k:"amande", g:"Contexte hors lame — vessie et urètre en macro",
    l:"Vessie haut située, flanquée des deux artères ombilicales, en amande vers l'ouraque" },
  { k:"metaplasieUretrale", g:"Urètre et continuité vésico-urétrale", l:"Métaplasie malpighienne de l'urètre, « especially along the posterior wall » — normale, hormonale, décroissante" },
  { k:"utricule", g:"Urètre et continuité vésico-urétrale", l:"Utricule prostatique au veru montanum, épithélium malpighien stratifié" },
  { k:"veruU", g:"Urètre et continuité vésico-urétrale", l:"Lumière urétrale en U inversé au niveau du veru montanum" },
  { k:"morgagniLittre", g:"Urètre et continuité vésico-urétrale", l:"Lacunes de Morgagni et glandes de Littre de l'urètre pénien" },
  { k:"fosseNaviculaire", g:"Urètre et continuité vésico-urétrale", l:"Fosse naviculaire à épithélium malpighien non kératinisant" },
  { k:"reliquatCordon", g:"Contexte hors lame — ouraque et cordon",
     l:"Amas d'épithélium transitionnel sans lumière dans le cordon, central entre les deux artères — 14,6 %" },
  { k:"cryptorchidie", g:"Contexte hors lame — paroi abdominale, génital, digestif, exstrophie",
    l:"Testicules non descendus chez le jeune fœtus — « une cryptorchidie qui, chez le jeune fœtus, est physiologique » [soffoet]" }
];

/* ── Signes ───────────────────────────────────────────────────────────────────
   On coche ce qu'on VOIT, un constat à la fois : présent, absent, ou non regardé.
   Aucun nom de maladie ici : les noms se lisent dans DIAGS. Un signe branché (fv)
   prend son libellé et son HPO dans FOETO. Beaucoup de ces signes ne sont pas des
   signes de lame — macro, dissection, opacification, autre organe : c'est voulu,
   § 5.7 de la fiche, l'obstruction basse ne se diagnostique pas sur la lame, et
   une grille qui n'accueillerait que du microscopique ne pourrait jamais
   assembler la séquence. Le champ meta dit d'où vient le signe. */
var SIGNES = [
  /* — Contexte hors lame : la vessie en macro — */
  { k:"megavessie", fv:"FOETO:PF.REN-MAL-093", g:"Contexte hors lame — vessie et urètre en macro",
    meta:"macro — 0 occurrence en micro dans le corpus ; elle devient aussi un prélèvement (urines pour caryotype)" },
  { k:"megavessiePrecoce", fv:"FOETO:PF.REN-MAL-094", g:"Contexte hors lame — vessie et urètre en macro",
    meta:"clinique, échographie — oriente vers l'atrésie, ne la prouve pas" },
  { k:"microvessie", fv:"FOETO:PF.REN-MAL-096", g:"Contexte hors lame — vessie et urètre en macro",
    meta:"même séquence de Potter que la mégavessie, par l'autre bout ; v1 : ou vessie non identifiable" },
  { k:"paroiEpaisse", fv:"FOETO:PF.REN-MAL-099", g:"Contexte hors lame — vessie et urètre en macro",
    meta:"macro — jamais décrite au microscope par les trois sources ; sans réplétion notée, non séparable du normal" },
  { k:"vessieNonTrabeculee", fv:"FOETO:PF.REN-MAL-109", g:"Contexte hors lame — vessie et urètre en macro",
    meta:"macro — « The bladder is thick-walled, although usually not trabeculated. » (prune belly)" },
  { k:"paroiMince", fv:"FOETO:PF.REN-MAL-100", g:"Contexte hors lame — vessie et urètre en macro",
    meta:"macro — v1 : vessie de grande capacité, « very large capacity, thin-walled bladder »" },
  { k:"asciteUrineuse", fiche:"[soffoet]", g:"Contexte hors lame — vessie et urètre en macro",
    l:"Ascite urineuse, urinome ou rupture vésicale",
    meta:"macro — l'ascite urineuse accompagne la paroi très mince [soffoet, ch. 9] ; urinome et rupture : libellé v1, sans source dans la fiche" },
  { k:"vessieTubulaire", fiche:"[corpus CR]", g:"Contexte hors lame — vessie et urètre en macro",
    l:"Vessie tubulaire", meta:"signe fonctionnel : absence de flux urinaire — idiome du service, sans répondant livre" },
  { k:"sablier", fv:"FOETO:PF.REN-MAL-110", g:"Contexte hors lame — vessie et urètre en macro",
    meta:"« The so-called hourglass bladder probably reflects a partial persistence of the urachus »" },
  { k:"refluxTrigone", fv:"FOETO:PF.REN-MAL-105", g:"Contexte hors lame — vessie et urètre en macro",
    meta:"macro — « subject to vesicoureteric reflux »" },
  /* — Contexte hors lame : l'urètre à la dissection — */
  { k:"urineMeat", bloc:false, fv:"FOETO:PF.REN-MAL-108", g:"Contexte hors lame — vessie et urètre en macro",
    meta:"geste du temps vésical — présent = urètre perméable : exclut l'atrésie" },
  { k:"catheterismePasse", bloc:false, fiche:"[soffoet]", g:"Contexte hors lame — vessie et urètre en macro",
    l:"Cathétérisme urétral passé",
    meta:"geste — exclut l'atrésie, à cocher comme fait accompli ; v1 y joignait l'urine au méat, devenue un signe" },
  { k:"uretrePostDilate", fv:"FOETO:PF.REN-MAL-107", g:"Contexte hors lame — vessie et urètre en macro",
    meta:"macro/imagerie — aspect de trou de serrure" },
  { k:"uretreEffile", fv:"FOETO:PF.REN-MAL-106", g:"Contexte hors lame — vessie et urètre en macro",
    meta:"« tapering dilatation of the posterior urethra narrowing into the membranous urethra without obstruction » (prune belly)" },
  { k:"replisVeru", fv:"FOETO:PF.REN-MAL-103", g:"Contexte hors lame — vessie et urètre en macro",
    meta:"macro/dissection — valves, urètre restant franchissable" },
  { k:"orificePunctiforme", fv:"FOETO:PF.REN-MAL-098", g:"Contexte hors lame — vessie et urètre en macro",
    meta:"macro/dissection — sténose" },
  { k:"obstacleInfranchissable", fv:"FOETO:PF.REN-MAL-097", g:"Contexte hors lame — vessie et urètre en macro",
    meta:"macro — atrésie" },
  { k:"colBorgne", fiche:"[corpus CR]", g:"Contexte hors lame — vessie et urètre en macro",
    l:"Col vésical borgne, aucun passage à l'opacification",
    meta:"“à l'opacification vésicale, absence de passage urétral” [corpus CR]" },
  /* — Contexte hors lame : gestes et artefacts de dissection — */
  { k:"ouraqueSectionne", fiche:"[soffoet]", g:"Contexte hors lame — ouraque et cordon",
    l:"Ouraque sectionné à l'ouverture, continuité dôme-ombilic perdue",
    meta:"artefact de dissection — l'incision en Y renversé existe pour l'épargner" },
  { k:"eviscerationArtefactuelle", fiche:"[corpus CR]", g:"Contexte hors lame — paroi abdominale, génital, digestif, exstrophie",
    l:"Éviscération partielle artefactuelle, fragilité du mur abdominal antérieur",
    meta:"artefact — “une éviscération partielle artefactuelle liée à une fragilité du mur antérieur de la cavité abdominale” [corpus CR] : piège du différentiel exstrophie / omphalocèle" },
  /* — Contexte hors lame : l'amont, le rein, le poumon — ce que la vessie seule ne montre pas — */
  { k:"uretereDilate", fiche:"[keeling]", g:"Contexte hors lame — amont, rein, poumon, Potter",
    l:"Uretère dilaté, urétéro-hydronéphrose", meta:"amont — bloc rein/voies ; « dilated ureters often have a thin wall »" },
  { k:"hydronephrose", fiche:"[keeling]", g:"Contexte hors lame — amont, rein, poumon, Potter",
    l:"Hydronéphrose", meta:"amont" },
  { k:"kysteSousCapsulaire", fiche:"[keeling]", g:"Contexte hors lame — amont, rein, poumon, Potter",
    l:"Kyste sous-capsulaire cortical rénal", meta:"lame de rein — « hallmark of obstruction » sur la grille rein" },
  { k:"desorganisation", fv:"FOETO:PF.REN-MAL-016", g:"Contexte hors lame — amont, rein, poumon, Potter",
    meta:"lame de rein — « the cortex is thin and disorganized »" },
  { k:"reinDysplasique", fiche:"[keeling]", g:"Contexte hors lame — amont, rein, poumon, Potter",
    l:"Rein dysplasique sur la lame de rein",
    meta:"amont — c'est là que se juge la gravité ; reprise de la grille rein, pas un constat de cette lame" },
  { k:"oligoamnios", fiche:"[soffoet]", g:"Contexte hors lame — amont, rein, poumon, Potter",
    l:"Oligoamnios ou anamnios", meta:"clinique" },
  { k:"hypoplasiePulmonaire", fiche:"[soffoet]", g:"Contexte hors lame — amont, rein, poumon, Potter",
    l:"Hypoplasie pulmonaire", meta:"aval de la séquence — se juge sur la lame de poumon et le rapport poids" },
  { k:"faciesPotter", fiche:"[soffoet]", g:"Contexte hors lame — amont, rein, poumon, Potter",
    l:"Faciès de Potter, déformations positionnelles", meta:"externe" },
  /* — Contexte hors lame : paroi abdominale, génital, digestif — */
  { k:"defautMusculatureAbdo", fv:"FOETO:PF.REN-MAL-089", g:"Contexte hors lame — paroi abdominale, génital, digestif, exstrophie",
    meta:"macro — non spécifique : aussi dans les distensions d'origine non vésicale" },
  { k:"testiculesNonDescendus", fv:"FOETO:PF.REN-MAL-088", g:"Contexte hors lame — paroi abdominale, génital, digestif, exstrophie",
    meta:"critère prune belly pour keeling ; non retenu chez le jeune fœtus par soffoet — § 9-8" },
  { k:"sexeFemininOuAmbigu", fv:"FOETO:PF.REN-MAL-104", g:"Contexte hors lame — paroi abdominale, génital, digestif, exstrophie",
    meta:"v1 : féminin OU AMBIGU, même sous phénotype masculin — les VUP n'existent que chez le garçon" },
  { k:"microcolon", fv:"FOETO:PF.REN-MAL-095", g:"Contexte hors lame — paroi abdominale, génital, digestif, exstrophie",
    meta:"mégavessie-microcôlon" },
  /* — Contexte hors lame : exstrophie — */
  { k:"plaqueVesicale", fv:"FOETO:PF.REN-MAL-101", g:"Contexte hors lame — paroi abdominale, génital, digestif, exstrophie",
    meta:"macro" },
  { k:"pubisSepares", fv:"FOETO:PF.REN-MAL-102", g:"Contexte hors lame — paroi abdominale, génital, digestif, exstrophie",
    meta:"macro — à mesurer" },
  { k:"imperforationAnale", fv:"FOETO:PF.REN-MAL-092", g:"Contexte hors lame — paroi abdominale, génital, digestif, exstrophie",
    meta:"pratiquement constante dans l'exstrophie ; parfois associée à l'atrésie urétrale" },
  { k:"deuxHemivessies", fv:"FOETO:PF.REN-MAL-090", g:"Contexte hors lame — paroi abdominale, génital, digestif, exstrophie",
    meta:"forme majeure, cloacale" },
  { k:"omphalocele", fiche:"[keeling]", g:"Contexte hors lame — paroi abdominale, génital, digestif, exstrophie",
    l:"Omphalocèle", meta:"spectre OEIS" },
  { k:"defectSpinal", fiche:"[keeling]", g:"Contexte hors lame — paroi abdominale, génital, digestif, exstrophie",
    l:"Défect spinal", meta:"spectre OEIS" },
  /* — Contexte hors lame : ouraque en macro, reliquat sur la lame de cordon — */
  { k:"ouraquePermeable", fiche:"[keeling]", g:"Contexte hors lame — ouraque et cordon",
    l:"Ouraque perméable, fistule vésico-ombilicale", meta:"« once in 200,000 births », plus fréquent chez le garçon" },
  { k:"cordonGeant", fv:"FOETO:PF.REN-MAL-087", g:"Contexte hors lame — ouraque et cordon",
    meta:"« giant umbilical cord » : peut révéler un ouraque perméable" },
  { k:"kysteOuraquien", fiche:"[keeling]", g:"Contexte hors lame — ouraque et cordon",
    l:"Kyste ou diverticule ouraquien", meta:"persistance partielle, moyenne ou distale" },
  { k:"reliquatExcentre", fiche:"[benirschke]", g:"Contexte hors lame — ouraque et cordon",
    l:"Reliquat épithélial du cordon NON central entre les deux artères",
    meta:"lame de cordon — la position est le critère : hors du centre, penser omphalomésentérique" },
  { k:"ouraqueMuscle", fiche:"[benirschke]", g:"Contexte hors lame — ouraque et cordon",
    l:"Reliquat allantoïdien accompagné de musculature", meta:"lame de cordon — « Rarely is the allantoic tissue accompanied by muscle »" },

  /* — Paroi et contenu vésical — */
  { k:"paroiFibreuse", fiche:"[corpus CR]", g:"Paroi et contenu vésical", mag:"faible",
    l:"Paroi fibreuse, scléreuse ou fibrino-musculaire à la lame", meta:"vocabulaire du service, sans répondant livre — § 9-7" },
  { k:"sedimentIntravesical", fiche:"[corpus CR]", g:"Paroi et contenu vésical", mag:"faible",
    l:"Sédiment, méconium ou débris dans la lumière vésicale", meta:"nature du contenu : la lame répond" },
  { k:"calcificationsVesicales", fiche:"[corpus CR]", g:"Paroi et contenu vésical", mag:"faible",
    l:"Gros foyers calcifiés près du départ de l'urètre",
    meta:"“gros foyers calcifiés à proximité du départ de l'urètre” [corpus CR] — observation du service" },
  { k:"urolithiase", fiche:"[corpus CR]", g:"Paroi et contenu vésical", mag:"moyen",
    l:"Urolithiase : matériel protéique éosinophile grumeleux, débris méconiaux, calcifications",
    meta:"“des urolithiases composées de matériel protéique éosinophile grumeleux et de débris méconiaux, parsemés de calcifications” [corpus CR] — observation du service" },
  /* — Urothélium — */
  { k:"rosettesUrotheliales", fiche:"[corpus CR]", g:"Urothélium", mag:"moyen",
    l:"Rosettes urothéliales multiples, réparties sans organisation dans un tissu fibro-musculaire",
    meta:"“multiples rosettes urothéliales réparties sans organisation” [corpus CR] — observation du service, aucun répondant livre" },
  { k:"proliferationCanaliculaire", fiche:"[corpus CR]", g:"Urothélium", mag:"moyen",
    l:"Prolifération canaliculaire urothéliale anarchique et anastomotique",
    meta:"“prolifération canaliculaire urothéliale tant anarchique qu'anastomotique” [corpus CR] — observation du service, aucun répondant livre" },
  { k:"urotheliumNecrose", fiche:"[corpus CR]", g:"Urothélium", mag:"fort",
    l:"Urothélium nécrosé, au-delà de la desquamation d'autopsie", meta:"la desquamation simple est une variante" },
  /* — Urètre et continuité vésico-urétrale — */
  { k:"discontinuiteVesicoUretrale", fv:"FOETO:PF.REN-MAL-086", g:"Urètre et continuité vésico-urétrale", mag:"faible",
    meta:"le seul énoncé histologique qui compte sur ce territoire" },
  { k:"veruNonIdentifie", fiche:"[ernst]", g:"Urètre et continuité vésico-urétrale", mag:"faible",
    l:"Veru montanum non identifié sur les coupes",
    meta:"« can be seen in most fetal specimens » : son absence est d'abord un défaut de prélèvement" },
  { k:"hypoplasieProstatique", fv:"FOETO:PF.REN-MAL-091", g:"Urètre et continuité vésico-urétrale", mag:"faible",
    meta:"critère prune belly selon soffoet, absent de keeling — § 9-8 ; se lit autour de l'urètre prostatique" },
  { k:"perforationCatheterisme", fv:"FOETO:PF.REN-NOR-047", g:"Urètre et continuité vésico-urétrale", mag:"faible",
    meta:"artefact — mime l'absence de continuité ; v1 : perforation ou déchirure rapportable au geste" },
  { k:"uretreDelabre", fv:"FOETO:PF.REN-NOR-050", g:"Urètre et continuité vésico-urétrale", mag:"faible",
    meta:"artefact de dissection — mime l'absence de continuité" }
];

/* ── Associations — affichées, jamais cochées ─────────────────────────────────
   Sur cet organe plus que sur tout autre, le ne-pas-conclure porte l'essentiel :
   la vessie ne s'interprète jamais seule, et « lui seul permet l'identification
   précise du type d'obstacle » se dit de la MACRO, pas de la lame. « cle » est le
   signe pivot : sans lui le compte peut être atteint sans que l'association tienne. */
var DIAGS = [
  { k:"seqObstructive", l:"Séquence d'obstruction du bas appareil", fv:"FOETO:PF.REN-MAL-116", cle:"megavessie", min:3,
    signes:["megavessie","uretrePostDilate","uretereDilate","hydronephrose","kysteSousCapsulaire","desorganisation",
            "reinDysplasique","oligoamnios","hypoplasiePulmonaire"],
    stop:" — la lame de vessie n'ajoute RIEN de spécifique à cette séquence, et c'est mesuré : " +
         "aucune des trois sources ne donne de critère histologique vésical d'obstruction. La lame " +
         "qui date et qui gradue l'obstruction basse est la lame de REIN, pas la lame de vessie. Ne " +
         "pas nommer le TYPE d'obstacle depuis un bloc de vessie : « L'examen macroscopique de ces " +
         "uropathies obstructives basses représente une réelle difficulté technique, mais lui seul " +
         "permet l'identification précise du type d'obstacle pouvant correspondre à des valves, une " +
         "atrésie ou une sténose de l'urètre postérieur. » [soffoet, ch. 9]. Sans lame de rein et " +
         "sans poumon pesé, la séquence n'est ni graduée ni close — et la micro décrit, la conclusion " +
         "nomme : “agénésie vésicale” et “dysplasie rénale kystique de type obstructif et " +
         "primitif” [corpus CR] sont des libellés de CONCLUSION, jamais de description microscopique." },

  { k:"vessieDeLutte", l:"Vessie de lutte", cle:"paroiEpaisse", min:2,
    signes:["paroiEpaisse","megavessie","uretrePostDilate","refluxTrigone","hydronephrose"],
    stop:" — fait MACROSCOPIQUE, jamais décrit au microscope par aucune des trois sources. Et " +
         "l'épaisseur ne tranche pas dans un sens : « the bladder wall is either thin or very thick » " +
         "[keeling, ch. 24]. Surtout, sans état de réplétion noté, l'épaississement n'est pas " +
         "séparable du normal : « These pathologic changes should be distinguished from the normal " +
         "variability of physiologic dilatation, which will also affect the thickness of the wall and " +
         "its histological appearance. » [ernst, ch. 9]." },

  { k:"obstacleUretral", l:"Obstacle urétral, niveau à préciser en macro", cle:"discontinuiteVesicoUretrale", min:2,
    signes:["discontinuiteVesicoUretrale","obstacleInfranchissable","colBorgne","orificePunctiforme",
            "replisVeru","uretrePostDilate","megavessie"],
    stop:" — la lame établit la CONTINUITÉ vésico-urétrale ou son absence, pas le type d'obstacle. " +
         "Valves, sténose et atrésie se départagent au cathétérisme et à l'opacification, non sur " +
         "coupe. Un veru montanum non identifié n'est pas un argument : c'est d'abord un défaut de " +
         "prélèvement, puisqu'il « can be seen in most fetal specimens ». Une perforation au " +
         "cathétérisme ou un urètre délabré par la dissection miment l'absence de continuité. Le terme " +
         "de l'apparition compte : « Lorsque la mégavessie est dépistée plus précocement dès le 1er " +
         "trimestre on suspectera plus volontiers une atrésie de l'urètre » [soffoet, ch. 9]. Les " +
         "valves antérieures existent aussi : « Anterior urethral valves are estimated to be seven " +
         "times less common than posterior urethral valves » [keeling, ch. 24]." },

  { k:"vup", l:"Valves de l'urètre postérieur", fv:"FOETO:PF.REN-MAL-123", cle:"replisVeru", min:2,
    signes:["replisVeru","uretrePostDilate","catheterismePasse"],
    stop:" — les VUP n'existent que chez le garçon : devant un sexe gonadique féminin ou ambigu, ce ne " +
         "sont pas des valves. L'aspect classique peut être fabriqué par le geste : « Wigglesworth " +
         "suggests that this appearance might be transformed to the more classically described one by " +
         "the passage of a catheter or by opening the urethra anteriorly at necropsy. » [keeling, " +
         "ch. 24] — consigner le cathétérisme et l'ouverture antérieure. Les VUP ne se concluent pas " +
         "sur une lame de vessie : la micro écrit la continuité, la conclusion nomme les valves." },

  { k:"stenose", l:"Sténose de l'urètre postérieur", fv:"FOETO:PF.REN-MAL-120", cle:"orificePunctiforme", min:2,
    signes:["orificePunctiforme","uretrePostDilate","catheterismePasse"],
    stop:" — même présentation que les valves à l'échographie ; c'est le cathétérisme qui la " +
         "départage, pas la coupe : « un orifice punctiforme est visible et cathétérisable à la partie " +
         "distale de l'urètre postérieur dilaté » [soffoet, ch. 9]. La seule mesure publiée est macro " +
         "et radiologique (sténose étendue sur 4 mm de longueur)." },

  { k:"atresie", l:"Atrésie de l'urètre postérieur", fv:"FOETO:PF.REN-MAL-111", cle:"obstacleInfranchissable", min:2,
    signes:["obstacleInfranchissable","colBorgne","discontinuiteVesicoUretrale","megavessiePrecoce","imperforationAnale"],
    stop:" — une urine obtenue au méat ou un cathétérisme passé EXCLUT l'atrésie. La mégavessie du " +
         "1er trimestre oriente, elle ne prouve pas. Sur un fœtus trop jeune pour la dissection, c'est " +
         "la continuité sur coupes étagées de l'urètre prélevé en totalité qui répond — association " +
         "Obstacle urétral, pivot sur la lame." },

  { k:"pruneBelly", l:"Prune belly — mégavessie sans obstacle anatomique", fv:"FOETO:PF.REN-MAL-118",
    cle:"defautMusculatureAbdo", min:3,
    signes:["defautMusculatureAbdo","testiculesNonDescendus","hypoplasieProstatique","uretreEffile",
            "vessieNonTrabeculee","refluxTrigone","megavessie","uretereDilate","hydronephrose"],
    stop:" — divergence de critères non tranchée : soffoet ajoute l'hypo/aplasie prostatique au " +
         "tableau prune belly et refuse la cryptorchidie comme critère chez le jeune fœtus, où elle " +
         "est physiologique ; keeling compte les « undescended testes » parmi les critères. La grille " +
         "porte les deux. Le défaut de musculature abdominale est nécessaire, il ne suffit pas : « Le " +
         "défaut de musculature pariétale abdominale est retrouvé autant en cas de mégavessie qu'en " +
         "cas de distension d'origine non vésicale » [soffoet, ch. 7] — prune belly ne se conclut pas " +
         "depuis le ventre. « Mechanical urethral obstruction is unusual » [keeling, ch. 24], mais « Une " +
         "séquence prune belly peut s'observer dans les différents types d'obstruction urétrale. » " +
         "[soffoet, ch. 9]." },

  { k:"megavessieMicrocolon", l:"Mégavessie-microcôlon — mégavessie sans obstacle anatomique", fv:"FOETO:PF.REN-MAL-115",
    cle:"microcolon", min:2,
    signes:["microcolon","megavessie","paroiMince","refluxTrigone"],
    stop:" — « Megacystis may be seen in association with microcolon » [keeling, ch. 24] ; récessif " +
         "autosomique, sex-ratio F/M de 4/1, et « exceptionnellement observé en fœtopathologie, d'autant " +
         "qu'il ne s'accompagne pas d'oligoamnios » [soffoet, ch. 9] : un oligoamnios oriente ailleurs. " +
         "Le bloc utile est le bloc vésico-génito-digestif monobloc ; le congelé part en génétique." },

  { k:"dysgenesieCloacale", l:"Dysgénésie cloacale — mégavessie sans obstacle anatomique", fv:"FOETO:PF.REN-MAL-112",
    cle:"sexeFemininOuAmbigu", min:2,
    signes:["sexeFemininOuAmbigu","megavessie"],
    stop:" — devant un sexe gonadique féminin ou ambigu, ce ne sont PAS des valves — les VUP " +
         "n'existent que chez le garçon : « Certaines mégavessies rentrent dans le cadre d'une " +
         "dysgénésie cloacale. C'est pratiquement toujours le cas lorsque le fœtus est de sexe " +
         "féminin. » [soffoet, ch. 9]. Le phénotype ne suffit pas : « chez un fœtus de phénotype " +
         "masculin mais de sexe gonadique féminin » [soffoet, ch. 17]. Le bloc utile devient le bloc " +
         "vésico-génito-digestif monobloc. Un fœtus féminin peut aussi relever de la mégavessie-" +
         "microcôlon (sex-ratio F/M de 4/1)." },

  { k:"potterDeuxSens", l:"Séquence de Potter — par rétention ou par absence de formation d'urine",
    fv:"FOETO:PF.REN-MAL-119", min:2,
    signes:["oligoamnios","hypoplasiePulmonaire","faciesPotter","megavessie","microvessie","reinDysplasique"],
    stop:" — mégavessie et microvessie mènent au MÊME aboutissement par deux chemins opposés : " +
         "« absence de formation d'urine (agénésie rénale bilatérale, reins kystiques ou hypoplasiques " +
         "non fonctionnels avec microvessie) ou rétention d'urine (valve urétrale, mégavessie) » " +
         "[soffoet, ch. 23]. Le sens de la séquence ne se lit donc pas sur la vessie : il se lit sur " +
         "le rein. L'hypoplasie pulmonaire ne se conclut pas non plus ici — elle se pèse." },

  { k:"exstrophieVesicale", l:"Exstrophie vésicale", fv:"FOETO:PF.REN-MAL-114", cle:"plaqueVesicale", min:2,
    signes:["plaqueVesicale","pubisSepares","imperforationAnale"],
    stop:" — rien ne se conclut depuis la lame : c'est la lésion la moins microscopique de toutes. " +
         "Ce qui se mesure est la brèche pariétale et le diastasis pubien, en macro. Noter que " +
         "l'exstrophie va « sans urétéro-hydronéphrose sus-jacente » : son absence n'est pas " +
         "rassurante, elle est attendue. Une éviscération artefactuelle n'est pas un défect pariétal. " +
         "Le seul apport histologique documenté est hors période fœtale — « There is a long-term risk " +
         "of squamous cell carcinoma of the bladder in survivors. »" },

  { k:"exstrophieCloacale", l:"Exstrophie cloacale (spectre OEIS)", fv:"FOETO:PF.REN-MAL-113", cle:"deuxHemivessies", min:2,
    signes:["deuxHemivessies","omphalocele","imperforationAnale","defectSpinal","pubisSepares"],
    stop:" — forme majeure, « cloacal exstrophy around 10 times less common » [keeling, ch. 24] que " +
         "l'exstrophie vésicale ; rien ne se conclut depuis la lame, tout se mesure en macro. Une " +
         "éviscération artefactuelle mime le défect pariétal." },

  { k:"reliquatOuraquien", l:"Reliquat ouraquien ou allantoïdien", fv:"FOETO:PF.REN-MAL-117", min:2,
    signes:["ouraquePermeable","ouraqueMuscle","cordonGeant","kysteOuraquien","sablier","reliquatExcentre"],
    stop:" — un amas d'épithélium transitionnel dans le cordon est présent dans 14,6 % des cordons : " +
         "c'est une VARIANTE, pas une lésion. Le critère qui sépare le reliquat allantoïdien de " +
         "l'omphalomésentérique est la POSITION : « always located centrally between the two " +
         "umbilical arteries ». L'ouraque véritablement perméable est estimé « once in 200,000 " +
         "births » : ne pas le conclure d'un simple amas épithélial." },

  { k:"urotheliumRemanie", l:"Urothélium remanié sans grille de lecture publiée", min:2,
    signes:["rosettesUrotheliales","proliferationCanaliculaire","urotheliumNecrose","paroiFibreuse"],
    stop:" — ces constats sont écrits par le service et n'ont AUCUN répondant dans les trois livres : " +
         "aucune occurrence de rosette associée à l'urothélium dans le corpus livre. Ils se " +
         "consignent comme observations, jamais comme entités, et ne peuvent pas servir de critère. " +
         "Et la desquamation banale ne se lit pas comme une nécrose : « in autopsy specimens, the " +
         "urothelium often is poorly preserved »." },

  { k:"contenuVesical", l:"Contenu vésical anormal — lithiase, méconium, sédiment", min:2,
    signes:["urolithiase","calcificationsVesicales","sedimentIntravesical","paroiEpaisse"],
    stop:" — c'est l'une des rares questions auxquelles la lame répond vraiment ; elle ne dit " +
         "cependant ni la cause ni l'ancienneté. Du méconium dans la vessie oriente vers une " +
         "communication, mais celle-ci se démontre en coupes sériées du bloc, pas sur un bloc de " +
         "paroi." },

  { k:"artefactDeGeste", l:"Aspect rapportable au geste d'autopsie", min:2,
    signes:["eviscerationArtefactuelle","ouraqueSectionne","perforationCatheterisme","uretreDelabre",
            "catheterismePasse","urotheliumNecrose"],
    stop:" — ne pas lire comme lésion ce que la dissection a produit. Le cathétérisme « devra " +
         "utiliser chez le très jeune fœtus un matériel très fin et non traumatisant » : une " +
         "perforation est un risque connu du geste, et « La dissection de l'urètre, assez délabrante, " +
         "impose de sectionner les os pubiens latéralement, en protégeant l'urètre rétro-symphysaire. » " +
         "[soffoet, ch. 9]. Mais un cathétérisme passé est aussi une INFORMATION — il exclut " +
         "l'atrésie ; le noter comme fait, pas seulement comme artefact." }
];

/* ── Négatifs — déduits des signes et des données consignées ─────────────────
   Un seul CR du corpus écrit un négatif nu sur la vessie. Le meilleur énoncé du
   corpus est celui qui joint le constat et sa portée fonctionnelle.
   Ce qui NE figure PAS ici, délibérément : « paroi vésicale d'épaisseur
   normale ». Aucune norme d'épaisseur par terme n'existe et l'épaisseur dépend
   de la réplétion : le négatif serait faux par construction (fiche § 6). */
var NEGATIFS = [
  { k:"nonTubulisee", signe:"vessieTubulaire", l:"Vessie non tubulisée",
    p:"“la vessie n'est pas tubulaire (fonction urinaire résiduelle)” [corpus CR]",
    ko:"vessie TUBULAIRE — absence de flux urinaire" },
  { k:"urineAuMeat", l:"Urine obtenue au méat à la pression vésicale",
    p:"premier geste du temps vésical ; sa positivité exclut l'atrésie — « Avant la dissection, on vérifie par " +
      "pression vésicale, la possibilité ou non d'obtenir quelques gouttes d'urine au méat. »",
    ko:"aucune urine au méat, ou pression vésicale non faite",
    auto:function(){ var v = E.signes.urineMeat; return v === POS ? true : v === NEG ? false : null; } },
  { k:"continuiteVesicoUretrale", l:"Continuité vésico-urétrale vérifiée, méthode énoncée",
    p:"le seul énoncé histologique qui compte sur ce territoire — méthode : cathétérisme, opacification, " +
      "coupes étagées ou sériées",
    ko:"continuité vésico-urétrale ABSENTE ou NON vérifiée, ou méthode non dite",
    auto:function(){
      if (E.signes.discontinuiteVesicoUretrale === POS || E.signes.obstacleInfranchissable === POS ||
          E.signes.colBorgne === POS) return false;
      if (E.signes.catheterismePasse === POS) return true;
      if (E.signes.discontinuiteVesicoUretrale !== NEG) return null;
      return E.mesure.def === "uretrePost" || E.mesure.def === "monobloc" ||
             !!(E.techniques.coupesEtagees || E.techniques.coupesSeriees || E.techniques.opacification || E.techniques.crin); } },
  { k:"urotheliumStatut", l:"Urothélium dit conservé ou dit desquamé non interprétable",
    p:"« in autopsy specimens, the urothelium often is poorly preserved » : ne pas l'énoncer laisse croire à un constat",
    ko:"statut de l'urothélium NON énoncé",
    auto:function(){
      if (E.mesure.opt === "couchesNonDeclarees") return false;
      return E.variantes.desquamation || E.mesure.v.couches != null ||
             ["quatre", "sansUrothelium", "sansAdventice", "musculeuseSeuleC"].indexOf(E.mesure.opt) >= 0 ? true : null; } },
  { k:"veruIdentifie", l:"Veru montanum identifié, sans repli valvulaire",
    p:"« can be seen in most fetal specimens » — c'est son identification qui donne sa valeur au négatif",
    ko:"veru montanum NON identifié ou replis valvulaires présents — le négatif valvulaire ne vaut rien",
    auto:function(){
      var a = E.signes.veruNonIdentifie, b = E.signes.replisVeru;
      return a === POS || b === POS ? false : a === NEG && b === NEG ? true : null; } },
  { k:"ouraqueCentral", signe:"reliquatExcentre", l:"Reliquat ouraquien central entre les deux artères, sans lumière",
    p:"négatif de banalité — 14,6 % des cordons",
    ko:"reliquat NON central — penser omphalomésentérique" },
  { k:"sexeGonadique", signe:"sexeFemininOuAmbigu", l:"Sexe gonadique vérifié devant une mégavessie — ni féminin ni ambigu",
    p:"conditionne tout le raisonnement étiologique",
    ko:"sexe gonadique FÉMININ ou AMBIGU devant une mégavessie — ce ne sont pas des VUP, qui n'existent que chez le garçon" },
  { k:"repletionNotee", l:"État de réplétion de la vessie noté", p:"sans lui, ni l'épaisseur ni le compte de couches n'ont de dénominateur",
    ko:"état de réplétion NON noté — le confondeur central de l'organe reste ouvert",
    auto:function(){ return E.prelev.repletion ? true : null; } }
];

/* ── Techniques ───────────────────────────────────────────────────────────────
   Aucune immunohistochimie n'est décrite pour ce territoire dans aucune des
   trois sources (§ 9-10). La liste est donc dominée par de la macro et de la
   dissection : c'est le constat de la fiche, pas une lacune de la grille. */
var TECHNIQUES = [
  { k:"coupesEtagees", l:"Coupes histologiques étagées de l'urètre prélevé en totalité",
    q:"la seule technique histologique explicitement prescrite pour ce territoire — « mettre en évidence l'obstacle en faisant des coupes histologiques étagées de l'urètre prélevé en totalité »" },
  { k:"coupesSeriees", l:"Coupes sériées du bloc vésico-génito-digestif",
    q:"continuités vésico-urétrale et utéro-vaginale, trajets fistuleux" },
  { k:"opacification", l:"Opacification vésicale sus-pubienne, cliché de profil",
    q:"macro — « le siège rétro-symphysaire de l'obstacle », valves ou sténose parfois visibles" },
  { k:"crin", l:"Cathétérisme urétral au crin de Florence",
    q:"macro — départage valves, sténose et atrésie ; matériel fin et non traumatisant" },
  { k:"pressionMeat", l:"Pression vésicale et recueil d'urine au méat",
    q:"premier temps, avant toute dissection" },
  { k:"blocMonobloc", l:"Prélèvement en bloc vésico-génito-digestif, sans ouverture",
    q:"devant un sexe féminin ou ambigu, ou une malformation cloacale" },
  { k:"caryotype", l:"Caryotype",
    q:"« une malformation unique a priori isolée (cardiopathie, mégavessie, anasarque) »" },
  { k:"urinesCaryotype", l:"Urines vésicales comme matériel de caryotype",
    q:"en cas d'anamnios, on préfère prélever les urines « s'il existe une mégavessie » — la mégavessie devient un prélèvement" },
  { k:"lameRein", l:"Lame de rein, avec SMA et comptage des générations de néphrons",
    q:"c'est là que la gravité et l'irréversibilité de la séquence se jugent, pas sur la vessie" },
  { k:"lamePoumon", l:"Poumons pesés et lame de poumon",
    q:"l'hypoplasie pulmonaire se pèse, elle ne se déduit pas d'une mégavessie" },
  { k:"cordonUrothelium", l:"Coupe de cordon à l'extrémité placentaire",
    q:"c'est là que l'urothélium de routine se trouve, et la position centrale est le critère" },
  { k:"radioPubis", l:"Radiographie du bassin, mesure du diastasis pubien",
    q:"exstrophie — la mesure est osseuse, pas histologique" },
  { k:"genetique", l:"Envoi du congelé en génétique",
    q:"mégavessie-microcôlon « récessif autosomique », prune belly syndromique" }
];

/* ── Propositions de techniques — déduites des clics, jamais imposées ─────── */
function suggerer(){
  var s = {};
  function vu(){ for (var i = 0; i < arguments.length; i++) if (E.signes[arguments[i]] === POS) return true; return false; }

  if (vu("megavessie")){ s.opacification = 1; s.crin = 1; s.caryotype = 1; s.lameRein = 1; }
  if (vu("megavessie") && vu("oligoamnios")) s.urinesCaryotype = 1;
  if (vu("megavessiePrecoce")){ s.crin = 1; s.caryotype = 1; }
  if (vu("microvessie", "vessieTubulaire")) s.lameRein = 1;
  if (vu("uretrePostDilate", "replisVeru", "orificePunctiforme", "obstacleInfranchissable", "colBorgne")){
    s.crin = 1; s.opacification = 1; s.coupesEtagees = 1; }
  if (E.signes.urineMeat === NEG){ s.crin = 1; s.opacification = 1; }
  if (vu("veruNonIdentifie")) s.coupesEtagees = 1;
  if (vu("discontinuiteVesicoUretrale")){ s.coupesSeriees = 1; s.opacification = 1; }
  if (vu("sexeFemininOuAmbigu")){ s.blocMonobloc = 1; s.coupesSeriees = 1; s.caryotype = 1; }
  if (vu("microcolon")){ s.blocMonobloc = 1; s.genetique = 1; }
  if (vu("defautMusculatureAbdo", "hypoplasieProstatique", "testiculesNonDescendus", "uretreEffile",
         "vessieNonTrabeculee")) s.genetique = 1;
  if (vu("uretereDilate", "hydronephrose", "reinDysplasique", "kysteSousCapsulaire", "desorganisation",
         "refluxTrigone")) s.lameRein = 1;
  if (vu("oligoamnios", "faciesPotter", "hypoplasiePulmonaire")) s.lamePoumon = 1;
  if (vu("plaqueVesicale", "pubisSepares", "deuxHemivessies", "omphalocele", "defectSpinal")) s.radioPubis = 1;
  if (vu("imperforationAnale")) s.coupesSeriees = 1;
  if (vu("ouraquePermeable", "ouraqueMuscle", "cordonGeant", "kysteOuraquien", "reliquatExcentre", "sablier"))
    s.cordonUrothelium = 1;
  if (vu("paroiEpaisse", "paroiMince")) s.opacification = 1;
  if (vu("eviscerationArtefactuelle", "ouraqueSectionne", "perforationCatheterisme", "uretreDelabre")) s.coupesSeriees = 1;
  if (!E.signes.urineMeat && E.signes.catheterismePasse !== POS && vu("megavessie", "uretrePostDilate")) s.pressionMeat = 1;

  /* Le report des autres organes n'est pas une option : la vessie ne se conclut
     pas seule. Dès qu'il est posé, les deux lames partenaires sont demandées. */
  if (E.retention.reportAutresOrganes === "present"){ s.lameRein = 1; s.lamePoumon = 1; }

  return s;
}

/* ── Contrôles propres à la vessie ────────────────────────────────────────── */
async function testsOrgane(chk, clic, set, crTient, pause){
  /* Le banc commun laisse des signes posés : on part d'un état voulu. */
  function pose(k, v){ if (E.signes[k] !== v) clic("les", k, v); }
  function ote(k){ if (E.signes[k]) clic("les", k, E.signes[k]); }
  /* le banc commun a aussi demandé TECHNIQUES[0] (coupes étagées) : elle vaudrait méthode de continuité */
  function propre(){ SIGNES.forEach(function(x){ delete E.signes[x.k]; }); E.groupes = {}; E.techniques = {}; peindre(); }
  function tenue(k){ return associations().some(function(a){ return a.d.k === k && a.tenu; }); }
  function lue(k){ return associations().some(function(a){ return a.d.k === k; }); }
  function site(k){ if (E.mesure.def !== k) clic("mdef", k); }
  function couche(k){ if (E.mesure.opt !== k) clic("mopt", k); }
  function neg(k){ return etatNegatif(par(NEGATIFS, k)); }
  function retenir(k){ var s = $("retNiveau"); s.value = k; s.dispatchEvent(new Event("change", {bubbles:true})); }

  propre();
  set("sa", "28");

  /* La vessie est médiane : ce qui se latéralise, ce sont les uretères, et ils
     restent avec le rein. L'axe de variation ici est le SITE du bloc. */
  chk("aucune latéralité de coquille sur cet organe", PAIR === false);
  chk("le site du bloc est porté par l'axe catégoriel",
      MESURE.defs === PLANS && MESURE.opts === COUCHES);
  chk("deux axes catégoriels, pas trois", MESURE.champs.length === 3 && !!MESURE.defs && !!MESURE.opts);

  /* Le verdict bloquant de l'organe : la musculeuse sur paroi incomplète. */
  site("col"); couche("quatre");
  set("m_musculeuse", "1.2");
  chk("musculeuse jugeable sur paroi complète au col", verdictMesure().cls !== "bad");
  couche("sansUrothelium");
  chk("paroi incomplète : la musculeuse NE SE JUGE PAS", verdictMesure().cls === "bad");
  chk("et la formule le dit sans détour", verdictMesure().txt.indexOf("NE SE JUGE PAS") >= 0);
  couche("couchesNonDeclarees");
  chk("couches non déclarées : même blocage", verdictMesure().cls === "bad");
  chk("couches non déclarées : statut de l'urothélium en défaut", neg("urotheliumStatut") === "ko");
  couche("quatre");
  chk("quatre couches : statut de l'urothélium énoncé", neg("urotheliumStatut") === "ok");
  site("dome");
  chk("hors col, la mesure est réservée, pas bloquée",
      verdictMesure().cls === "warn" && verdictMesure().txt.indexOf("hors col") >= 0);
  site("siteNonDeclare");
  chk("site non déclaré : réserve explicite", verdictMesure().txt.indexOf("site du bloc non déclaré") >= 0);
  site("col");
  set("m_musculeuse", "");

  /* Aucun chiffre n'a de normal : ça se dit à chaque mesure. */
  set("m_paroi", "3");
  chk("aucune norme d'épaisseur pariétale par terme", crTient("Aucune norme d'épaisseur de paroi vésicale par terme"));
  chk("l'épaisseur ne tranche dans aucun sens", crTient("either thin or very thick"));
  set("m_paroi", "");
  set("m_couches", "7");
  chk("six à sept couches est une valeur de réplétion", crTient("pas de terme"));
  chk("sans réplétion notée le compte n'est rapportable à rien",
      verdictMesure().txt.indexOf("réplétion non notée") >= 0 && neg("repletionNotee") === null);
  clic("prelev", "repletion");
  chk("réplétion notée : la réserve tombe, le négatif s'énonce",
      verdictMesure().txt.indexOf("réplétion non notée") < 0 && neg("repletionNotee") === "ok");
  clic("prelev", "repletion");
  set("m_couches", "0");
  chk("zéro couche n'est pas une nécrose", verdictMesure().txt.indexOf("régime ordinaire") >= 0);
  set("m_couches", "");

  /* Le stade EST la densité de la musculeuse : il tombe avec elle. */
  couche("tangentielle");
  clic("stade", "faisceauxSepares");
  chk("stade coché sur paroi incomplète : bloqué", verdictMesure().cls === "bad");
  clic("stade", "faisceauxSepares");
  couche("quatre");

  /* L'organe ne date rien par lui-même, et son seul rang bon est un report. */
  chk("la rétention est reportée des autres organes",
      par(RETENTION, "reportAutresOrganes").q === "bon" &&
      par(RETENTION, "reportAutresOrganes").d.indexOf("jamais mesuré sur la vessie") >= 0);
  chk("vessie absente de la table de macération", HORS_BAREME.indexOf("absente") >= 0);
  retenir("reportAutresOrganes");
  chk("le report appelle rein ET poumon", suggerer().lameRein === 1 && suggerer().lamePoumon === 1);
  retenir("");

  /* La séquence obstructive : elle se tient sur la mégavessie, et elle ne conclut pas. */
  propre();
  pose("megavessie", POS);
  chk("un signe ne tient pas la séquence", !tenue("seqObstructive") && lue("seqObstructive"));
  pose("uretereDilate", POS); pose("hydronephrose", POS);
  chk("trois signes tiennent la séquence", tenue("seqObstructive"));
  ote("megavessie"); pose("oligoamnios", POS);
  chk("sans le pivot, la séquence ne tient pas", !tenue("seqObstructive") &&
      crTient("signe pivot non coché : " + par(SIGNES, "megavessie").l));
  pose("megavessie", POS);
  chk("la lame de vessie n'y ajoute rien de spécifique",
      par(DIAGS, "seqObstructive").stop.indexOf("n'ajoute RIEN de spécifique") >= 0);
  chk("le type d'obstacle reste à la macro",
      par(DIAGS, "seqObstructive").stop.indexOf("lui seul permet l'identification précise") >= 0);
  chk("la gravité se juge sur le rein", suggerer().lameRein === 1);
  chk("la micro décrit, la conclusion nomme",
      par(DIAGS, "seqObstructive").stop.indexOf("libellés de CONCLUSION") >= 0);

  /* Mégavessie et microvessie mènent au même Potter par deux chemins opposés. */
  propre();
  pose("microvessie", POS); pose("oligoamnios", POS);
  chk("la microvessie ouvre aussi le Potter", lue("potterDeuxSens"));
  chk("les deux sens sont portés",
      par(DIAGS, "potterDeuxSens").stop.indexOf("deux chemins opposés") >= 0);
  chk("l'hypoplasie pulmonaire se pèse", suggerer().lamePoumon === 1);

  /* Le trépied de l'obstacle bas : la dissection tient les valves, la lame tient la continuité. */
  propre();
  pose("replisVeru", POS); pose("uretrePostDilate", POS);
  chk("valves tenues sur les replis du veru", tenue("vup"));
  chk("sans continuité lue, l'obstacle urétral ne tient pas", !tenue("obstacleUretral") && lue("obstacleUretral"));
  chk("replis présents : le négatif de valves tombe", neg("veruIdentifie") === "ko");
  ote("replisVeru"); ote("uretrePostDilate");
  pose("obstacleInfranchissable", POS); pose("megavessiePrecoce", POS);
  chk("atrésie tenue sur l'obstacle infranchissable", tenue("atresie") && !tenue("vup"));
  chk("l'atrésie s'exclut par l'urine au méat", par(DIAGS, "atresie").stop.indexOf("EXCLUT") >= 0);
  chk("obstacle infranchissable : continuité en défaut", neg("continuiteVesicoUretrale") === "ko");
  propre();
  pose("discontinuiteVesicoUretrale", NEG);
  chk("continuité sans méthode : en défaut", neg("continuiteVesicoUretrale") === "ko");
  site("uretrePost");
  chk("continuité lue sur coupes étagées : énoncée", neg("continuiteVesicoUretrale") === "ok");
  site("col");
  pose("veruNonIdentifie", NEG); pose("replisVeru", NEG);
  chk("veru identifié sans replis : négatif énoncé", neg("veruIdentifie") === "ok");

  /* Polarité normale : l'urine au méat et le cathétérisme passé se répondent seuls. */
  propre();
  var iH = groupes().indexOf(par(SIGNES, "urineMeat").g);
  clic("grp", iH, "non");
  chk("polarité normale : le Non en bloc ne répond pas l'urine au méat",
      !E.signes.urineMeat && !E.signes.catheterismePasse && neg("urineAuMeat") === null);
  clic("grp", iH, "non");
  pose("urineMeat", POS);
  chk("urine au méat présente : négatif énoncé", neg("urineAuMeat") === "ok");
  pose("urineMeat", NEG);
  chk("aucune urine au méat : négatif en défaut, crin proposé", neg("urineAuMeat") === "ko" && suggerer().crin === 1);
  ote("urineMeat");

  /* Le piège de sexe : sourcé, et il change le bloc à demander. */
  propre();
  pose("megavessie", POS); pose("sexeFemininOuAmbigu", POS);
  chk("sexe féminin : dysgénésie cloacale tenue sur son pivot", tenue("dysgenesieCloacale"));
  chk("sexe féminin : ce ne sont pas des VUP",
      par(DIAGS, "dysgenesieCloacale").stop.indexOf("n'existent que chez le garçon") >= 0 &&
      par(DIAGS, "vup").stop.indexOf("garçon") >= 0);
  chk("sexe féminin : le négatif de sexe tombe", neg("sexeGonadique") === "ko");
  chk("le bloc monobloc est proposé", suggerer().blocMonobloc === 1);
  chk("la divergence prune belly est portée, pas tranchée",
      par(DIAGS, "pruneBelly").stop.indexOf("keeling compte") >= 0 &&
      par(SIGNES, "testiculesNonDescendus").meta.indexOf("soffoet") >= 0);
  chk("la cryptorchidie physiologique reste une variante",
      VARIANTES.some(function(v){ return v.k === "cryptorchidie"; }));
  /* Prune belly : le ventre est nécessaire, il ne suffit pas. */
  propre();
  pose("megavessie", POS); pose("uretereDilate", POS); pose("hydronephrose", POS);
  chk("prune belly ne tient pas sans le défaut pariétal", !tenue("pruneBelly"));
  pose("defautMusculatureAbdo", POS);
  chk("prune belly tenue sur le défaut pariétal", tenue("pruneBelly") && suggerer().genetique === 1);
  chk("le ventre seul ne conclut pas", par(DIAGS, "pruneBelly").stop.indexOf("ne se conclut pas") >= 0);

  /* Le reliquat du cordon : 14,6 %, variante et non lésion. */
  propre();
  pose("reliquatExcentre", POS); pose("kysteOuraquien", POS);
  chk("la position est le critère",
      par(DIAGS, "reliquatOuraquien").stop.indexOf("always located centrally") >= 0);
  chk("un amas transitionnel du cordon est une variante",
      par(DIAGS, "reliquatOuraquien").stop.indexOf("14,6 %") >= 0);
  chk("reliquat excentré : le négatif de banalité tombe", neg("ouraqueCentral") === "ko");
  chk("le cordon est demandé", suggerer().cordonUrothelium === 1);
  site("cordon");
  chk("sur le cordon, l'objet n'est pas une paroi vésicale",
      verdictMesure().txt.indexOf("reliquat allantoïdien") >= 0);
  site("col");

  /* Les trois observations du service restent des observations. */
  propre();
  pose("rosettesUrotheliales", POS); pose("proliferationCanaliculaire", POS);
  chk("l'urothélium remanié se lit", tenue("urotheliumRemanie"));
  chk("aucun répondant livre, donc aucun critère",
      par(DIAGS, "urotheliumRemanie").stop.indexOf("AUCUN répondant dans les trois livres") >= 0);
  chk("observation du service : marquée comme telle, sans terme",
      par(SIGNES, "rosettesUrotheliales").fiche === "[corpus CR]" && !par(SIGNES, "rosettesUrotheliales").foeto);
  chk("la desquamation banale reste une variante",
      VARIANTES.some(function(v){ return v.k === "desquamation" && v.g === "Urothélium"; }));

  /* Le négatif interdit n'a pas été écrit. */
  chk("aucun négatif d'épaisseur pariétale normale",
      NEGATIFS.every(function(n){ return !/épaisseur.*normale/i.test(n.l); }));
  chk("le meilleur négatif du corpus est repris",
      par(NEGATIFS, "nonTubulisee").p.indexOf("fonction urinaire résiduelle") >= 0);
  chk("l'urothélium a un statut à énoncer, dans les deux sens",
      par(NEGATIFS, "urotheliumStatut").l.indexOf("desquamé") >= 0);

  /* Aucune IHC n'est décrite pour ce territoire : rien n'a été inventé. */
  chk("aucune immunohistochimie inventée",
      TECHNIQUES.every(function(t){ return !/anti-|CD\d|immuno/i.test(t.l); }) &&
      SIGNES.every(function(x){ return x.mag !== "technique"; }));
  chk("l'absence d'IHC est dite", TECH_NOTE.indexOf("aucune immunohistochimie") >= 0);
  chk("la seule technique histologique prescrite est nommée",
      par(TECHNIQUES, "coupesEtagees").q.indexOf("la seule technique histologique") >= 0);

  /* Rien n'a été comblé là où la fiche s'arrête. */
  chk("aucun grade vésical inventé",
      SIGNES.concat(DIAGS).every(function(x){ return !/grade/i.test(x.l); }));
  chk("aucune norme dans les libellés de mesure",
      MESURE.champs.every(function(c){ return !/normal|norme/i.test(c.label); }));
  chk("aucun diagnostic n'est cliquable",
      DIAGS.every(function(d){ return !par(SIGNES, d.k); }) &&
      DIAGS.every(function(d){ return !document.querySelector('[data-act="les"][data-k="' + d.k + '"]'); }));

  /* v2 : branchement FOETO */
  chk("v2 : libellé venu de FOETO", par(SIGNES, "megavessie").l === "Mégavessie" &&
      par(SIGNES, "testiculesNonDescendus").l === "Cryptorchidie");
  chk("v2 : code FOETO du terme verbatim",
      codesDe(par(SIGNES, "discontinuiteVesicoUretrale"))[0] === "FOETO:PF.REN-MAL-086");
  chk("v2 : HPO arbitré venu de la base", par(SIGNES, "megavessie").hpo === "HP:0000021");
  chk("v2 : terme maladie sur l'association", par(DIAGS, "vup").foeto[0] === "FOETO:PF.REN-MAL-123" &&
      par(DIAGS, "seqObstructive").foeto[0] === "FOETO:PF.REN-MAL-116");
  chk("v2 : aucun signe hors fiche", SIGNES.every(function(x){ return !x.horsFiche; }));
  propre();
  set("rqFoeto", "semi-lun");
  var pick = $("sgFoeto").querySelector('[data-pick="FOETO:PF.REN-MAL-103"]');
  if (pick) pick.click();
  chk("v2 : un terme porté par un signe pose le signe", !!pick && E.signes.replisVeru === POS &&
      !E.foeto["FOETO:PF.REN-MAL-103"]);
  ote("replisVeru");
  chk("v2 : quatre cadres hors lame, avant la rétention", CADRES.filter(function(c){ return c.hors; }).length === 4 &&
      groupes().filter(horsLame).every(function(g){ return !!$("contexte").querySelector("#grp_" + groupes().indexOf(g)); }));
  chk("v2 : blocs lus en §02", BLOCS_LUS && !$("blocsBloc").hidden);

  propre();
  site("col"); couche("quatre");
  set("sa", "28");
}
