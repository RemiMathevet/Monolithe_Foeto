/* Grille de lecture — gonades et tractus génitaux internes.
   Fond : ~/Bureau/fiches_lecture/fiche_gonades.md (§1 à §7 ; §9 porté, jamais arbitré).
   Forme : gen_grille.py, calquée sur grille_poumon.html.
   Les divergences entre sources sont PORTÉES dans les champs, jamais arbitrées.

   Ce que la coquille NE SAIT PAS FAIRE, et qui est écrit ici plutôt que masqué :
   la fiche réclame DEUX listes de stades conditionnées par le sexe gonadique
   (§ 3.1 testicule, 6 rangs ; § 3.2 ovaire, 8 rangs), « jamais fusionnées ».
   La coquille n'offre qu'un seul tableau STADES. Les rangs ci-dessous sont donc
   des FENÊTRES EN SA — le seul axe que les deux échelles partagent réellement,
   puisque chaque rang est daté en SA par sa source — et chaque fenêtre porte
   SÉPARÉMENT sa colonne testiculaire et sa colonne ovarienne. Aucune
   correspondance rang à rang n'est affirmée : les livres n'en donnent pas, et
   en fabriquer une serait inventer une symétrie. Le sexe gonadique se déclare
   au § 04 et il BLOQUE : sans lui, aucun stade n'est lisible. */

var ORGANE  = "gonades";
var TITRE   = "gonades et tractus génitaux internes";
var SOURCE  = "fiche_gonades.md";
var MODULE  = "grille_gonades";
var VERSION = "1.0.1";

/* Organe pair, et de façon plus contraignante que tout autre : deux dysgénésies
   se DÉFINISSENT par l'asymétrie gonadique — la dysgénésie gonadique mixte et
   l'ovotestis unilatéral. Deux gonades dans un même bloc restent visibles, mais
   « on ne sait plus lequel est lequel ». */
var PAIR = true;

var TITRE_CR    = "GONADES";
var STADE_TITRE = "Fenêtres en SA — colonne testiculaire et colonne ovarienne, jamais fusionnées";

var KCL_TXT = "Fœticide par KCl déclaré. Aucune source ouverte ne décrit d'effet gonadique du geste — " +
              "et la gonade n'a de toute façon aucune borne à perdre : elle est absente des dix rangs " +
              "de la Table 15.6 [keeling, ch. 15] comme des 18 chunks d'[ernst, ch. 37]. Aucune borne " +
              "n'est à lire ici, avec ou sans KCl.";

/* Le service ne date jamais la gonade : sur 200 CR, aucun terme histologique
   gonadique estimé, alors que la formule existe pour le poumon, le rein et le
   cerveau. Choix ou omission : la fiche ne tranche pas (§ 9.3). */
var RETARD_NOTE = "Avant d'écrire un retard : vérifier le SEXE gonadique déclaré (les deux échelles ne se " +
                  "comparent pas entre elles), le plan de coupe et l'état de conservation. Sur l'ovaire, un " +
                  "retard apparent est d'abord une autolyse ou une coupe tangentielle du cortex superficiel. " +
                  "Et sur 200 CR le service n'écrit AUCUN terme histologique gonadique estimé : refus " +
                  "délibéré ou omission, la fiche ne tranche pas (§ 9.3).";

var AVANCE_NOTE = "Une avance apparente sur le testicule est d'abord une densité leydigienne lue à " +
                  "contre-terme : le pic est physiologique à 16–21 SA ⟨conv⟩ et l'involution attendue vers " +
                  "23 SA. Sur les tractus génitaux internes, ni avance ni retard ne se lisent : " +
                  "« the time of the appearance of smooth muscle differentiation may vary », et un " +
                  "épididyme de 34 weeks « less well developed » qu'un de 22 weeks est publié en figure " +
                  "[ernst, ch. 11]. Le tractus ne date pas.";

var TECH_NOTE = "Les pointillés sont des propositions déduites des clics, jamais des prescriptions. Deux " +
                "lignes de cette liste sont des CONTRE-INDICATIONS — la GCNIS avant 6 mois de vie et le " +
                "sous-typage germinal : elles ne sont jamais proposées, elles sont écrites pour être " +
                "refusées. Rien de coché ne veut pas dire absent : ça veut dire non regardé.";

/* ── 01 · Prélèvement ─────────────────────────────────────────────────────── */
var PRELEV = [
  { k:"gonadeRetrouvee", l:"Gonade retrouvée et effectivement mise en bloc", grave:true,
    manque:"117 CR sur 200 portent la gonade dans une liste de prélèvement, 17 la décrivent " +
           "[corpus CR] — la non-description est l'issue majoritaire, et « gonade non retrouvée » " +
           "s'écrit, ne se laisse pas vide" },
  { k:"deuxBlocs", l:"Gonade droite et gonade gauche sur DEUX blocs séparés", grave:true,
    manque:"la dysgénésie gonadique mixte et l'ovotestis unilatéral se DÉFINISSENT par l'asymétrie ; " +
           "dans un bloc unique l'asymétrie reste visible mais « on ne sait plus lequel est lequel », " +
           "et le tractus homolatéral n'est plus rattachable" },
  { k:"albuginee", l:"Testicule : albuginée ET épithélium de surface sur la coupe", grave:true,
    manque:"sans eux on ne peut pas dire que les cordons sont « isolés de l'épithélium cœlomique », " +
           "qui est le critère formel de différenciation testiculaire [soffoet, ch. 8]" },
  { k:"cortexMedullaire", l:"Ovaire : toute l'épaisseur du cortex jusqu'à la médullaire", grave:true,
    manque:"les follicules primordiaux apparaissent dans le cortex profond près de la médullaire AVANT " +
           "le cortex superficiel — une coupe tangentielle est vide de follicules chez un ovaire NORMAL " +
           "[ernst, ch. 15]" },
  { k:"niveaux", l:"Plusieurs niveaux de coupe sur chaque gonade",
    manque:"le foyer dysgénétique du corpus était CENTRAL avec « une différentiation corticale normale, " +
           "on note un centre dysgénétique (pour les 2) » ; et la partie ovarienne d'un ovotestis peut " +
           "être polaire" },
  { k:"reteEpididyme", l:"Repères : rete testis au hile, tête de l'épididyme au pôle supérieur",
    manque:"ils prouvent qu'on n'est pas dans un fragment de médiastin isolé [ernst, ch. 10] [ernst, ch. 11]" },
  { k:"blocPelvien", l:"Bloc pelvien : gonade et tractus non séparés avant fixation",
    manque:"c'est le seul moyen de documenter la « genitourinary ductal anatomy » exigée à toutes les " +
           "autopsies [keeling, ch. 25] — et une protection contre la perte de la gonade à la dissection " +
           "[soffoet, ch. 8]" },
  { k:"congele", l:"Tissu congelé pour extraction d'ADN",
    manque:"« and tissue stored for DNA extraction and examination (with appropriate informed consent) » " +
           "[keeling, ch. 25]" },
  { k:"caryotype", l:"Statut chromosomique demandé ou disponible",
    manque:"les quatre volets sont exigés ENSEMBLE : « external genital morphology, genitourinary ductal " +
           "anatomy, gonadal histology, and chromosomal status should all be thoroughly documented at all " +
           "fetal/neonatal postmortem examinations » [keeling, ch. 25]" },
  { k:"macroSexe", l:"Sexe phénotypique de la macroscopie consigné, pour confrontation",
    manque:"le sexe gonadique se CONFRONTE au sexe phénotypique et au caryotype ; il ne s'en dérive " +
           "jamais. Sur 200 CR, le DSD est diagnostiqué 3 fois et 3 fois sur les organes génitaux " +
           "EXTERNES, jamais sur la gonade [corpus CR]" },
  { k:"autresOrganes", l:"État de conservation des AUTRES organes du même fœtus noté",
    manque:"sur l'ovaire, le critère lésionnel et son artefact sont la même image : on tranche sur le " +
           "foie et le rein du même fœtus, jamais sur la gonade seule [ernst, ch. 15]" }
];

/* ── 02 · Rétention ───────────────────────────────────────────────────────────
   Inversion assumée : la gonade n'a NI RANG NI HEURE. Deux recherches
   exhaustives et indépendantes le montrent — 0/65 chunks de [keeling, ch. 15],
   0/18 chunks d'[ernst, ch. 37]. La seule ligne recevable de ce tableau est
   donc un REPORT : la borne vient des autres organes du fœtus, elle n'est
   jamais mesurée sur la gonade. Interpoler serait une fabrication. */
var PLAFOND = "plafond général : aucun organe fœtal ne donne de bonne estimation du délai entre 2 et " +
              "4 semaines [ernst, ch. 37]";

var HORS_TABLE = "la gonade n'a ni rang ni heure : absente des dix rangs de la Table 15.6 " +
                 "[keeling, ch. 15] et des 18 chunks d'[ernst, ch. 37]. Écrire « lyse gonadique " +
                 "compatible avec 48 h » serait une fabrication";

var RETENTION = [
  { k:"reportAutres", l:"Délai retenu sur les AUTRES organes du fœtus (foie, rein), reporté ici",
    b:"reportée des autres organes", d:"report, jamais mesuré sur la gonade", h:1, q:"bon",
    note:HORS_TABLE, alerte:PLAFOND },
  { k:"basoTesticule", l:"Perte de basophilie nucléaire des testicules cotée dans la séquence du service",
    b:"rang non publié", d:"usage du service, hors livre", h:0, q:"moyen",
    note:"divergence pratique / livre, écrite et NON tranchée (§ 9.4) : un CR cote « le pancréas, les " +
         "testicules, la thyroïde, le cœur » dans la séquence de perte de basophilie, alors qu'aucune " +
         "source ouverte ne cote la gonade. Rang connu de Rémi et non publié, ou usage non fondé ?" },
  { k:"folliculesEffaces", l:"Follicules primordiaux non identifiables sur un ovaire ≥ 20 SA",
    b:"—", d:"ambigu : dysgénésie OU autolyse", h:0, q:"mauvais",
    note:"c'est le piège majeur de l'organe, et la source met le critère et son artefact dans la même " +
         "phrase : « autolysis frequently impairs the evaluation of folliculogenesis and ovarian " +
         "dysgenesis in autopsy specimens, and caution should be used when tissues are not well " +
         "preserved » [ernst, ch. 15]" },
  { k:"ovaireNonAnalysable", l:"Ovaire non analysable — comptage folliculaire tombé",
    b:"—", d:"le premier axe qui tombe, § 2.2", h:0, q:"mauvais",
    note:"sur l'ovaire ce qui porte la maturation est LA CELLULE — le follicule est un ovocyte plus sa " +
         "couronne — donc la maturation tombe en même temps que le diagnostic, et ce qui survit (stroma, " +
         "épithélium de surface) ne date rien. Sur un ovaire macéré : ni stade ni dysgénésie, « non " +
         "analysable »" },
  { k:"germSertoli", l:"Cellules germinales et de Sertoli indistinctes",
    b:"—", d:"normal en autopsie, pas un signe", h:0, q:"mauvais",
    note:"« Even in this well-preserved specimen, the germ cells are difficult to differentiate from " +
         "Sertoli cells » [ernst, ch. 10] — l'indistinction ne signe ni la rétention ni une hypoplasie " +
         "germinale" },
  { k:"sousTypageTombe", l:"Sous-types germinaux non distinguables",
    b:"—", d:"jamais praticable, quel que soit le délai", h:0, q:"mauvais",
    note:"« Identification of subtypes of germ cells is impossible in most autopsy specimens » ; la " +
         "distinction exige « very fresh tissue obtained within an hour of death » [ernst, ch. 10]. Ce " +
         "n'est donc pas un seuil de macération mais un délai d'autopsie qu'aucun fœtus ne satisfait" },
  { k:"stereocils", l:"Desquamation des stéréocils du déférent, perte de la barre terminale éosinophile",
    b:"—", d:"artéfact post-mortem pur", h:0, q:"mauvais",
    note:"« not easily seen in sections from autopsy material, as preservation is typically suboptimal » " +
         "[ernst, ch. 12] — à ne pas lire comme une anomalie épithéliale" },
  { k:"oedemeScrotal", l:"Œdème et extravasation érythrocytaire scrotaux",
    b:"—", d:"artéfact obstétrical, pas une rétention", h:0, q:"mauvais",
    note:"« fréquent chez les mort-nés délivrés par voie vaginale » — c'est un traumatisme de la " +
         "délivrance, pas une hémorragie, et ce n'est pas non plus un délai" },
  { k:"nonExaminee", l:"Gonade prélevée mais non examinée — problème technique",
    b:"—", d:"recevabilité, pas rétention", h:0, q:"mauvais",
    note:"deux CR l'enregistrent : « L'ovaire et le thymus n'ont pas pu être examinés » pour un " +
         "« problème technique » [corpus CR]. La gonade est petite et mobile : sa perte à la dissection " +
         "est un geste, à écrire comme tel" }
];

/* ── 03 · Maturation — fenêtres en SA, deux colonnes ──────────────────────────
   SA = semaines de gestation + 2. Toute valeur convertie est marquée ⟨conv⟩.
   ⚠️ ernst ch. 10 emploie TROIS échelles dans le même chapitre et date le même
   événement testiculaire à deux dates différentes : une valeur ⟨conv⟩ peut être
   fausse de 2 SA (§ 9.2). Les bornes sont des repères, pas des seuils. */
var STADES = [
  { k:"differenciation", max:14,
    l:"≈ 10 SA · testicule : albuginée constituée, cordons pleins · ovaire : oogonies, avant la méiose",
    note:"testicule, rang 1 : « By the end of the eighth postfertilization week, the germ, Sertoli, and " +
         "Leydig cell lines are present, and the production of Müllerian-inhibiting substance and " +
         "testosterone is established » [ernst, ch. 10] ; le critère formel repris en français par " +
         "[soffoet, ch. 8] est l'isolement des cordons de l'épithélium cœlomique par l'albuginée. " +
         "Côté ovaire, aucun rang n'est daté avant l'entrée en méiose" },
  { k:"meioseEtDeuxiemeEtape", max:16,
    l:"14–15 SA · ovaire : entrée en méiose, ovocytes au dictyotène · testicule : deuxième étape",
    note:"ovaire, rang 1 : « starting at 12–13 weeks gestation, some oogonia in the inner cortex enter " +
         "meiosis and become oocytes » [ernst, ch. 15]. Testicule, rang 2 : DIVERGENCE INTERNE à une " +
         "seule source, non tranchée — « The second step in testicular differentiation begins at 14 " +
         "weeks postmenstrual age » (= 14 SA) contre « By 14 weeks gestation, fetal Leydig cells " +
         "constitute half the volume of the testis » (= 16 SA ⟨conv⟩), deux SA d'écart pour le même " +
         "événement (§ 9.2)" },
  { k:"picLeydigien", max:20,
    l:"16–21 SA · testicule : pic leydigien, nappes éosinophiles · ovaire : syncytium puis transition",
    note:"testicule, rang 3 : abondance « greatest between 14 and 19 weeks gestation » = 16–21 SA ⟨conv⟩ " +
         "[ernst, ch. 10]. Ovaire, rang 2 : syncytium oogonial, dont les cellules de prégranulosa sont " +
         "« quasi indistinguables des oogonies sur coupes HE sauf dans les spécimens bien conservés » — " +
         "bornes 14–20 SA sourcées par la BASE seule, aucun chunk ouvert ne les porte (§ 9.7). Ovaire, " +
         "rang 3 : phrase TRONQUÉE à l'extraction, « Between 14 and 18 weeks gestation, individual " +
         "oocytes lose the — » : le critère de ce rang est perdu (§ 9.6)" },
  { k:"folliculesPrimordiaux", max:22,
    l:"20 SA · ovaire : follicules primordiaux à la profondeur du cortex — LE repère opposable",
    note:"« Primordial follicles should be observed in the normal ovary by 18 weeks gestation » " +
         "[ernst, ch. 15] = 20 SA ⟨conv⟩, avec convergence indépendante EN SA : « les follicules " +
         "primordiaux n'apparaissent pas à la profondeur du cortex vers 20 SA » [soffoet, ch. 23]. " +
         "⚠️ La base porte les DEUX valeurs pour la MÊME phrase — 20 SA converti et 18 SA non converti — " +
         "et c'est le libellé non converti qui a été promu en nom de terme, « Absence de follicule " +
         "primordial à 18 SA ou plus » (§ 9.18). Côté testicule, le pic leydigien court encore" },
  { k:"picGerminalEffondrement", max:26,
    l:"22–23 SA · ovaire : pic germinal · testicule : effondrement leydigien, tubes tassés dos à dos",
    note:"ovaire, rang 5 : « 6–7 million at 20 weeks gestation, when the largest number of germ cells can " +
         "be observed, and then declines through week 28 » [ernst, ch. 15] = 22 SA ⟨conv⟩. Testicule, " +
         "rang 4, bascule brutale de l'aspect d'ensemble : « This testis is dramatically different from " +
         "the 17-week testis », « The fetal Leydig cells have almost completely disappeared, and the " +
         "tubules are extensively coiled and packed back-to-back » [ernst, ch. 10] ≈ 23 SA ⟨conv⟩" },
  { k:"vasculosaEtCroissance", max:36,
    l:"22–32 SA · testicule : tunica vasculosa, septa, rete qui se canalise · ovaire : folliculogenèse",
    note:"testicule, rang 5 : « The tunica vasculosa gradually develops between 20 and 30 weeks " +
         "gestation » [ernst, ch. 10] ; rang 6 : « Les lumières apparaissent progressivement à partir de " +
         "24 semaines » = 26 SA ⟨conv⟩. Ovaire, rang 6 : follicule primaire (granulosa cubique) puis " +
         "secondaire préantral, 50–400 µm et trois à cinq couches de granulosa — mais AUCUN intervalle " +
         "SA n'est donné par la source : on sait reconnaître un follicule secondaire, on ne sait pas à " +
         "quel terme il est attendu (§ 9.8)" },
  { k:"procheTerme", max:99,
    l:"≳ 36 SA · ovaire : follicules de De Graaf visibles · testicule : interstitium pauvre en Leydig",
    note:"ovaire, rang 7 : « In the near-term fetus, multiple grossly visible Graafian follicles may be " +
         "present », avec atrésie active et corpus fibrosum ; rang 8, à la naissance, 0,5–1 million de " +
         "cellules germinales [ernst, ch. 15]. Testicule : interstitium pauvre en cellules de Leydig au " +
         "troisième trimestre — l'inverse du deuxième — et « La canalisation devient complète vers 40–41 " +
         "semaines de gestation » = 42–43 SA ⟨conv⟩" }
];

/* ── 04 · Sexe gonadique, conservation, et les trois chiffres ──────────────────
   Le sexe gonadique est le premier champ de l'organe et il BLOQUE : la même
   lame se lit avec deux échelles différentes selon qu'elle est testiculaire ou
   ovarienne. Il ne se dérive JAMAIS du sexe déclaré. */
var SEXES = [
  { k:"testicule",      l:"Testiculaire" },
  { k:"ovaire",         l:"Ovarien" },
  { k:"ovotesticulaire",l:"Ovotesticulaire — les deux compartiments dans la même gonade" },
  { k:"indeterminable", l:"Indéterminable SUR LA PIÈCE — limite de prélèvement, pas un diagnostic" },
  { k:"nonRetrouvee",   l:"Gonade non retrouvée ou non prélevée" }
];

/* La conservation ne se juge pas sur la gonade : elle se juge sur les autres
   organes du même fœtus (§ 8). C'est le seul organe de la série où le marqueur
   de rétention EST le critère lésionnel. */
var CONSERV = [
  { k:"conserve",    l:"Autres organes du fœtus bien conservés" },
  { k:"lyseModeree", l:"Autres organes en lyse débutante" },
  { k:"lyseSevere",  l:"Autres organes lysés — foie, rein" }
];

var MESURE = {
  titre:"Sexe gonadique, état de conservation, et les trois chiffres de l'organe",
  defLabel:"sexe gonadique — à nommer AVANT tout stade",
  optLabel:"conservation, jugée sur les AUTRES organes",
  defs:SEXES, opts:CONSERV,
  champs:[{ id:"germ",    label:"Cellules germinales par section transversale de tube", min:0, max:60, step:1 },
          { id:"kyste",   label:"Grand axe du plus grand kyste ovarien (cm)", min:0, max:20, step:0.1 },
          { id:"diamTub", label:"Diamètre tubulaire médian (µm)", min:0, max:300, step:1 }]
};

function verdictMesure(){
  var sx = E.mesure.def, cs = E.mesure.opt, sa = num("sa");
  var ng = E.mesure.v.germ, nk = E.mesure.v.kyste, nd = E.mesure.v.diamTub;
  if (!sx && !cs && ng == null && nk == null && nd == null && !E.stade)
    return { cls:"", txt:"Ni sexe gonadique, ni conservation, ni chiffre — la gonade n'est pas encore lue." };

  var t = [], cls = "ok", res = [];

  if (!sx){
    cls = "bad";
    t.push("Sexe gonadique NON déclaré : le stade est ININTERPRÉTABLE. Il y a deux échelles et pas une, " +
           "et elles ne sont pas symétriques — le testicule se date par son interstitium, l'ovaire par sa " +
           "lignée germinale. Aucune source n'établit de correspondance rang à rang entre les deux. Le " +
           "sexe gonadique se lit sur la lame ; il ne se dérive jamais du sexe déclaré.");
  } else if (sx === "nonRetrouvee"){
    cls = "bad";
    t.push("Gonade non retrouvée ou non prélevée — rien de ce qui suit n'est lisible, et c'est l'issue " +
           "la plus fréquente : 117 CR sur 200 portent la gonade dans une liste de prélèvement, 17 la " +
           "décrivent [corpus CR]. L'écrire fait la différence entre une omission et une normalité.");
  } else if (sx === "indeterminable"){
    cls = "bad";
    t.push("Sexe gonadique indéterminable SUR LA PIÈCE : c'est une limite de prélèvement, PAS un " +
           "diagnostic. Dans le corpus, « Fœtus de sexe indéterminable […] présentant une macération " +
           "moyenne » et « Foetus fragmentaire de sexe indéterminable » désignent 7 fois sur 7 une pièce " +
           "trop jeune, fragmentée ou macérée, jamais un phénotype ambigu. Ne pas le confondre avec " +
           "« Sexe ambigu / DSD » : un formulaire qui fusionne les deux sens fabrique des DSD à partir " +
           "de fœtus trop jeunes.");
  } else {
    t.push("Sexe gonadique : " + par(SEXES, sx).l.toLowerCase().split(" —")[0] + ".");
    if (sx === "ovotesticulaire")
      t.push("Un compartiment de chaque sexe dans la même gonade se décrit compartiment par " +
             "compartiment ; le stade se lit alors dans les deux colonnes, jamais dans une seule.");
  }

  /* Conservation : sur cet organe, elle commande tout le reste. */
  if (!cs){
    res.push("état de conservation non jugé — et il ne se juge PAS sur la gonade : il se juge sur les " +
             "autres organes du même fœtus");
  } else if (cs === "lyseSevere"){
    if (sx === "ovaire" || sx === "ovotesticulaire"){
      cls = "bad";
      t.push("Ovaire sur un fœtus dont les autres organes sont lysés : on n'écrit NI STADE NI DYSGÉNÉSIE, " +
             "on écrit non analysable. « autolysis frequently impairs the evaluation of folliculogenesis " +
             "and ovarian dysgenesis in autopsy specimens, and caution should be used when tissues are " +
             "not well preserved » [ernst, ch. 15] — le critère et son artefact sont dans la même phrase.");
    } else if (sx === "testicule"){
      if (cls === "ok") cls = "warn";
      t.push("Testicule macéré : le stade grossier — capsule, tubes, interstitium — reste écrivable ; le " +
             "sous-typage germinal, jamais. Sur le compte germinal la fiche se contredit et ne tranche " +
             "pas : le § 2.2 le donne comme la seule mesure gonadique robuste à la rétention, le § 2.3 le " +
             "place au deuxième rang de ce qui tombe. Porter les deux lectures.");
    }
  }

  /* Compte germinal — critère testiculaire, plancher sourcé. */
  if (ng != null){
    t.push("Compte germinal = " + ng + " par section transversale de tube ; plancher sourcé : « Each " +
           "cross section of a seminiferous tubule usually contains six or more germ cells of various " +
           "types » [ernst, ch. 10].");
    if (sx === "ovaire")
      res.push("le compte germinal par section de tube est un critère TESTICULAIRE : il n'a pas de sens " +
               "sur un ovaire déclaré");
    if (ng < 6){ cls = "bad";
      t.push("Compte SOUS le plancher de 6 — compter n'est pas typer : le sous-typage germinal exige " +
             "« very fresh tissue obtained within an hour of death » et n'est praticable sur aucun fœtus " +
             "d'autopsie. Et une indistinction germinale / sertolienne est NORMALE, même sur tissu bien " +
             "conservé : elle ne fait pas une pauvreté germinale."); }
    else t.push("Compte au-dessus du plancher.");
  }

  /* Kyste ovarien — un seuil binaire, et il est très haut. */
  if (nk != null){
    t.push("Kyste ovarien, grand axe = " + nk + " cm.");
    if (nk < 3)
      t.push("SOUS le seuil du livre : « Follicles that exceed 3 cm are designated as follicular cysts » " +
             "[ernst, ch. 15]. En dessous, il n'y a rien à conclure — ce sont des follicules atrétiques " +
             "kystiques, qui « remain as atretic cystic follicles for an indefinite period ». Le corpus " +
             "décrit « un kyste de l'ovaire de 4 mm de grand axe (découverte fortuite bénigne) » et " +
             "« des structures kystiques (une de chaque côté, env 3 mm de diamètre) » : deux ordres de " +
             "grandeur sous le critère du livre.");
    else { if (cls === "ok") cls = "warn";
      t.push("AU-DESSUS du seuil de 3 cm : « Follicles that exceed 3 cm are designated as follicular " +
             "cysts » [ernst, ch. 15]. Le différentiel reste ouvert entre kyste folliculaire et kyste du " +
             "rete ovarii, et il se tranche en IHC, pas à la règle."); }
  }

  /* Un chiffre sans son normal ne vaut rien. */
  if (nd != null){
    if (cls === "ok") cls = "warn";
    t.push("Diamètre tubulaire médian = " + nd + " µm — et il n'existe AUCUNE NORME PAR TERME pour ce " +
           "chiffre : la seule valeur publiée est donnée sans le terme auquel elle s'applique, « The " +
           "median tubular diameter increases to 59 μm » [ernst, ch. 10]. Un chiffre sans son normal ne " +
           "vaut rien : la mesure se consigne, elle ne s'interprète pas, et ce qui serait la mesure de " +
           "maturation testiculaire la plus objective reste NON UTILISABLE en l'état (§ 9.5).");
  }

  /* Le repère opposable de l'ovaire est binaire, et il a une borne d'entrée. */
  if ((sx === "ovaire" || sx === "ovotesticulaire") && sa != null){
    if (sa >= 20)
      t.push("À " + sa + " SA, le repère opposable est en vigueur et il est BINAIRE : présence ou absence " +
             "de follicules primordiaux à la profondeur du cortex. Il ne se grade pas — un ovaire pauvre " +
             "en follicules se décrit et se compte, il ne se cote pas.");
    else
      t.push("À " + sa + " SA, l'absence de follicule primordial n'est PAS un signe : le repère n'est " +
             "opposable qu'à partir de 20 SA ⟨conv⟩.");
  }

  /* La densité leydigienne bascule avec le terme — le seul critère du § 5 qui l'exige. */
  if ((sx === "testicule" || sx === "ovotesticulaire") && sa != null &&
      E.signes.leydigAbondants === "anormal"){
    if (sa <= 21) t.push("Cellules de Leydig très abondantes à " + sa + " SA : c'est le PIC " +
                         "PHYSIOLOGIQUE de 16–21 SA ⟨conv⟩, pas une lésion.");
    else if (sa >= 23){ if (cls === "ok") cls = "warn";
      t.push("Cellules de Leydig très abondantes à " + sa + " SA : l'involution est attendue depuis " +
             "≈ 23 SA ⟨conv⟩ — c'est une DISCORDANCE, pas une variante."); }
    else t.push("Cellules de Leydig très abondantes à " + sa + " SA : zone de bascule entre le pic et " +
                "l'effondrement, que les sources ne tranchent pas à la semaine.");
  }

  /* Cohérence entre le sexe déclaré et les signes cochés. */
  if (sx === "testicule" && (E.signes.pasDeFolliculeProfond === "anormal" ||
                             E.signes.fibroseStromale === "anormal"))
    res.push("des signes OVARIENS sont cochés sur un sexe gonadique testiculaire — ou c'est un ovotestis, " +
             "ou le sexe déclaré est à reprendre");
  if (sx === "ovaire" && E.signes.leydigAbondants === "anormal")
    res.push("cellules de Leydig très abondantes sur un OVAIRE déclaré : ce sont d'abord des cellules " +
             "hilaires, « morphologically identical to Leydig cells », normales et parfois en amas dans " +
             "le cortex interne — un amas éosinophile au hile n'est pas un compartiment testiculaire");

  if (!E.prelev.deuxBlocs)
    res.push("deux blocs séparés non confirmés — sans latéralité, dysgénésie mixte et ovotestis " +
             "unilatéral deviennent innommables");
  if ((sx === "ovaire" || sx === "ovotesticulaire") && !E.prelev.cortexMedullaire)
    res.push("cortex jusqu'à la médullaire non confirmé — une coupe tangentielle du cortex superficiel " +
             "est vide de follicules chez un ovaire NORMAL");
  if ((sx === "testicule" || sx === "ovotesticulaire") && !E.prelev.albuginee)
    res.push("albuginée et épithélium de surface non confirmés — le critère formel de différenciation " +
             "testiculaire tombe avec eux");
  if (!E.prelev.caryotype)
    res.push("statut chromosomique non tracé — l'aneuploïdie n'est pas histologique");

  if (res.length){ if (cls === "ok") cls = "warn"; t.push("Réserves : " + res.join(" ; ") + "."); }
  return { cls:cls, txt:t.join(" ") };
}
/* ── 05 · Variantes normales ──────────────────────────────────────────────────
   Sur cet organe c'est la partie la plus rentable de la fiche : six pièges dont
   trois sont explicitement désignés comme tels par la source. */
var VARIANTES = [
  { k:"blastemeAlbuginee", l:"Restes de blastème testiculaire dans l'albuginée — « should not be mistaken for testicular dysgenesis »" },
  { k:"gonadoblastomeLike", l:"Nodules gonadoblastome-like ou SCTAT dans des follicules atrétiques — jusqu'à 35 % des fœtus normaux, à NE JAMAIS énoncer en négatif" },
  { k:"plapOct4",        l:"Cellules PLAP+, OCT-4+, CD117+ avant 6 mois de vie" },
  { k:"hematoTerme",     l:"Nids d'hématopoïèse extramédullaire testiculaire au terme" },
  { k:"marchand",        l:"Résidus corticaux surrénaliens de Marchand au contact du cordon" },
  { k:"nidsGerminaux",   l:"Nids de cellules germinales dans l'épithélium de surface testiculaire" },
  { k:"cellulesHilaires", l:"Cellules hilaires ovariennes, éosinophiles polygonales, « morphologically identical to Leydig cells »" },
  { k:"atresie",         l:"Atrésie folliculaire active, pyknose ovocytaire, corpus fibrosum" },
  { k:"stromaFusiforme", l:"Stroma ovarien fusiforme peu développé" },
  { k:"albugineeOvaire", l:"Tunica albuginea ovarienne peu ou pas individualisée" },
  { k:"germSertoliVar",  l:"Cellules germinales et de Sertoli difficiles à distinguer" },
  { k:"appendices",      l:"Appendice pédiculé au pôle supérieur — appendix testis et epididymis non départageables sur la lame" },
  { k:"hyperplasieVaginale", l:"Hyperplasie de l'épithélium malpighien vaginal, imprégnation œstrogénique" }
];

/* ── 06 · Signes ──────────────────────────────────────────────────────────────
   On coche des SIGNES, un à la fois. Aucun nom d'entité ici : les noms se lisent
   en dessous, dans les associations. La micro décrit, la conclusion nomme — et
   sur cet organe le corpus le respecte presque parfaitement. Rien de coché ne
   veut pas dire absent : ça veut dire non regardé. */
var SIGNES = [
  /* Bandelette et dysgénésies */
  { k:"gonadeFibreuse", l:"Gonade petite, mince et plate, tissu fibreux en faisceaux et tourbillons de cellules fusiformes",
    meta:"« being composed entirely of fibrous tissue in poorly organized fascicles and whorls of spindle cells »" },
  { k:"aucuneGerminale", l:"Aucune cellule germinale identifiable",
    meta:"exactement ce que produit l'autolyse ovarienne — le différentiel qui compte est la macération" },
  { k:"aucuneStructure", l:"Aucune structure différenciée identifiable — ni cordon ou tube, ni follicule" },
  { k:"gonadeAtrophique", l:"Gonade atrophique" },
  { k:"asymetrieGonadique", l:"Les deux gonades diffèrent l'une de l'autre",
    meta:"c'est la définition même de la dysgénésie gonadique mixte — exige deux blocs étiquetés" },

  /* Testicule dysgénétique */
  { k:"distribGerminale", l:"Distribution germinale anormale dans les tubes" },
  { k:"noyauxGerminauxElargis", l:"Noyaux des cellules germinales élargis" },
  { k:"leydigAbondants", l:"Cellules de Leydig très abondantes",
    meta:"le seul critère du § 5 qui bascule avec le terme : pic à 16–21 SA, involution après ≈ 23 SA" },
  { k:"centreDysgenetique", l:"Foyer dysgénétique central, périphérie corticale normale",
    meta:"lire toute la coupe et plusieurs niveaux" },
  { k:"tubesNonIndividualises", l:"Tubes séminifères mal individualisés",
    meta:"critère du service, non retrouvé dans les livres ouverts (§ 9.11)" },
  { k:"albugineeAbsente", l:"Albuginée non identifiable, cordons au contact de l'épithélium de surface" },
  { k:"moinsDe6Germinales", l:"Moins de 6 cellules germinales par section transversale de tube" },

  /* Ovotestis */
  { k:"compartimentTesticulaire", l:"Compartiment testiculaire : cordons ou tubes séminifères" },
  { k:"compartimentOvarien", l:"Compartiment ovarien : cortex folliculaire dans la même gonade" },

  /* Dysgénésie ovarienne et ses confondeurs */
  { k:"pasDeFolliculeProfond", l:"Aucun follicule primordial à la profondeur du cortex, sur un ovaire ≥ 20 SA" },
  { k:"fibroseStromale", l:"Fibrose stromale diffuse de l'ovaire" },
  { k:"folliculesPrimairesReduits", l:"Follicules primaires réduits en nombre" },
  { k:"autresOrganesLyses", l:"Les autres organes du même fœtus sont lysés",
    meta:"c'est là que se tranche l'autolyse ovarienne, jamais sur la gonade seule" },
  { k:"corticaleSeule", l:"Coupe tangentielle : cortex superficiel seul, médullaire absente" },

  /* Kystes */
  { k:"kysteOvarien", l:"Kyste ovarien" },
  { k:"coquesCanalaires", l:"Structures canalaires régulières dans les coques du kyste (WT1)" },
  { k:"inhibineNeg", l:"Inhibine α négative dans la coque du kyste" },

  /* Fibrose albuginéenne et périorchite */
  { k:"fibroseAlbuginee", l:"Fibrose de l'albuginée" },
  { k:"bilateraleRadiaire", l:"Fibrose bilatérale avec extensions en travées radiaires" },
  { k:"cellulesGeantes", l:"Macrophages et cellules géantes péri-testiculaires" },
  { k:"perforationDigestive", l:"Perforation digestive anténatale retrouvée sur le tube digestif" },

  /* Hématopoïèse */
  { k:"nidsErythroides", l:"Nids érythroïdes le long des septa fibreux inter-tubulaires" },
  { k:"erythroAbondante", l:"Érythropoïèse abondante — de nombreux érythroblastes" },
  { k:"multilignee", l:"Lignée granulocytaire ou B associée (MPO+, PAX5+)",
    meta:"une hématopoïèse multilignée n'est pas une érythropoïèse abondante : la lignée change la lecture" },

  /* Tractus et confrontation */
  { k:"derivesMulleriens", l:"Dérivés paramésonéphrotiques persistants du côté examiné (trompe, utérus)" },
  { k:"derivesMesonephrotiques", l:"Dérivés mésonéphrotiques présents du côté examiné (épididyme, déférent)" },
  { k:"discordanceSexe", l:"Sexe gonadique discordant du sexe phénotypique ou du caryotype",
    meta:"se lit hors de la lame — la lame ne fournit qu'un des quatre volets" },

  /* Signes orphelins — décrits, non sourcés */
  { k:"calcifsIntraluminales", l:"Calcifications intraluminales de tubes séminifères",
    meta:"« calcifications intraluminales concernant quelques tubules séminifères » — absentes de la base ET des livres" },
  { k:"crenelage", l:"Ovaires crénelés",
    meta:"une seule occurrence dans le corpus, aucune source ne dit si c'est normal, artéfactuel ou un signe" },
  { k:"hemorragieGonadique", l:"Hémorragie gonadique",
    meta:"aucun critère ne la sépare d'un saignement de dissection — même trou qu'à la surrénale et au thymus" }
];

/* ── 06 bis · Associations — affichées, jamais cochées ────────────────────────
   Plusieurs partagent délibérément leurs signes : sur cet organe l'autolyse et
   la dysgénésie donnent la MÊME image, et le module doit les afficher ensemble
   plutôt que d'en choisir une. */
var DIAGS = [
  { k:"bandelette", l:"Gonade en bandelette (streak gonad)", cle:"gonadeFibreuse", min:3,
    signes:["gonadeFibreuse","aucuneGerminale","aucuneStructure","gonadeAtrophique"],
    stop:" — ne pas écrire « dysgénésie gonadique » dans la micro : décrire « tissu gonadique fibreux " +
         "fasciculé sans cellule germinale ni structure différenciée identifiable ». La bandelette ne se " +
         "grade pas, c'est « the most complete end of the spectrum » — une borne, pas un grade. Et le " +
         "vocabulaire a bougé : le terme dysgénésie gonadique « was first introduced to describe the " +
         "gonads in (postnatal) Turner syndrome », il désigne aujourd'hui le SPECTRE dont la bandelette " +
         "est l'extrémité. Sur tissu mal conservé le diagnostic est INTERDIT : « no recognizable germ " +
         "cells » est exactement ce que produit l'autolyse." },

  { k:"autolyseOvarienne", l:"Ovaire sans follicule — autolyse avant dysgénésie", cle:"autresOrganesLyses", min:2,
    signes:["autresOrganesLyses","pasDeFolliculeProfond","aucuneGerminale","gonadeFibreuse"],
    stop:" — s'affiche EN MÊME TEMPS que la dysgénésie ovarienne, et c'est voulu : « autolysis " +
         "frequently impairs the evaluation of folliculogenesis and ovarian dysgenesis in autopsy " +
         "specimens, and caution should be used when tissues are not well preserved » [ernst, ch. 15]. " +
         "Le critère et son artefact sont dans le même paragraphe. On tranche sur l'état de conservation " +
         "des AUTRES organes du même fœtus, jamais sur la gonade seule ; si le foie et le rein sont " +
         "lysés, ne rien conclure." },

  { k:"dysgenesieOvarienne", l:"Dysgénésie ovarienne — absence de follicules primordiaux à 20 SA ou plus",
    cle:"pasDeFolliculeProfond", min:2,
    signes:["pasDeFolliculeProfond","fibroseStromale","folliculesPrimairesReduits","gonadeAtrophique"],
    stop:" — « Turner » ne se lit pas sur une gonade. Le critère est BINAIRE et il a une borne d'entrée : " +
         "avant 20 SA ⟨conv⟩ l'absence de follicule n'est pas un signe. Il ne se grade pas non plus : la " +
         "base propose pourtant un continuum implicite, « Peut représenter un stade intermédiaire de " +
         "dysgénésie ovarienne », qu'AUCUNE source ouverte ne définit (§ 9.13). Et le repère se cherche " +
         "à la PROFONDEUR du cortex, jamais en superficie." },

  { k:"coupeTangentielle", l:"Follicules absents par PLAN DE COUPE", cle:"corticaleSeule", min:2,
    signes:["corticaleSeule","pasDeFolliculeProfond","fibroseStromale"],
    stop:" — les follicules primordiaux apparaissent dans le cortex profond près de la médullaire AVANT " +
         "le cortex superficiel [ernst, ch. 15] [soffoet, ch. 23] : une coupe tangentielle du cortex " +
         "superficiel est vide de follicules chez un ovaire NORMAL. Exiger la médullaire sur la coupe " +
         "avant de conclure quoi que ce soit." },

  { k:"testiculeDysgenetique", l:"Testicule dysgénétique", cle:"distribGerminale", min:2,
    signes:["distribGerminale","noyauxGerminauxElargis","leydigAbondants","centreDysgenetique",
            "tubesNonIndividualises"],
    stop:" — le verbatim de la seule figure d'histologie gonadique du chapitre porte TROIS items, à " +
         "compter séparément : « The germ cells are abnormally distributed, their nuclei are enlarged, " +
         "and the Leydig cells are very abundant » [keeling, ch. 25] — et AUCUNE valeur de bascule n'est " +
         "donnée pour aucun des trois. La densité leydigienne bascule avec le TERME : très abondante à " +
         "18 SA c'est le pic physiologique, après ≈ 23 SA c'est anormal. Ne pas nommer l'entité " +
         "(69,XXY, 46,XY DSD) sur la lame : l'aneuploïdie n'est pas histologique. Et « Les tubules " +
         "spermatiques ne sont pas bien individualisés » n'est dans aucun livre ouvert : critère " +
         "d'expérience, non défini (§ 9.11)." },

  { k:"ovotestis", l:"Ovotestis — DSD ovotesticulaire", cle:"compartimentOvarien", min:2,
    signes:["compartimentOvarien","compartimentTesticulaire","asymetrieGonadique"],
    stop:" — le piège est au hile : les cellules hilaires ovariennes sont « morphologically identical to " +
         "Leydig cells » [ernst, ch. 15], et un amas de cellules éosinophiles polygonales au hile d'un " +
         "ovaire n'est PAS un compartiment testiculaire. Tout échantillonner : la partie ovarienne peut " +
         "être polaire et une coupe unique ne montrer qu'un compartiment. Vocabulaire : ne plus écrire " +
         "« hermaphrodisme vrai », le terme est remplacé « as ovotesticular DSD » [keeling, ch. 25] — " +
         "mais [soffoet, ch. 8], plus ancien, emploie encore l'ancien vocabulaire : divergence de " +
         "nomenclature écrite, non arbitrée (§ 9.12)." },

  { k:"dysgenesieMixte", l:"Dysgénésie gonadique mixte — deux gonades différentes", cle:"asymetrieGonadique",
    min:2, signes:["asymetrieGonadique","gonadeFibreuse","distribGerminale","derivesMulleriens"],
    stop:" — cette association ne tient QUE si les deux gonades sont sur deux blocs séparés et " +
         "étiquetés : dans un bloc unique l'asymétrie reste visible mais « on ne sait plus lequel est " +
         "lequel », et le tractus homolatéral n'est plus rattachable. Le service latéralise déjà quand " +
         "il voit — « agénésie testiculaire gauche », « on note un centre dysgénétique (pour les 2) » — " +
         "mais il ne date jamais côté par côté." },

  { k:"kyste", l:"Kyste ovarien — folliculaire, du rete ovarii, ou rien du tout", cle:"kysteOvarien", min:1,
    signes:["kysteOvarien","coquesCanalaires","inhibineNeg"],
    stop:" — le seuil du livre est très haut : « Follicles that exceed 3 cm are designated as follicular " +
         "cysts » [ernst, ch. 15]. En dessous, rien à conclure. Le corpus décrit « un kyste de l'ovaire " +
         "de 4 mm de grand axe (découverte fortuite bénigne) » : deux ordres de grandeur sous le critère. " +
         "Modèle de rédaction à suivre, divergence assumée et écrite : « de probables kystes du rete " +
         "ovarii » « ou kystes folliculaires (mais inhibine négative) »." },

  { k:"periorchite", l:"Fibrose de l'albuginée · périorchite méconiale", cle:"fibroseAlbuginee", min:2,
    signes:["fibroseAlbuginee","bilateraleRadiaire","cellulesGeantes","perforationDigestive"],
    stop:" — sans cellules géantes ni pigment, la fibrose seule n'est PAS méconiale, et la périorchite " +
         "méconiale exige d'aller chercher la perforation digestive sur le tube digestif. Il n'existe " +
         "AUCUNE épaisseur albuginéenne normale par terme : le corpus écrit « importante fibrose de " +
         "l'albuginée, bilatérale, avec quelques extensions en travées radiaires » et conclut « fibrose " +
         "péritesticulaire (de l'albuginée) », sans mesure et sans norme (§ 9.14). Entité non retrouvée " +
         "dans les livres ouverts : famille inflammatoire-réactionnelle, pas malformative." },

  { k:"hematoAbondante", l:"Hématopoïèse extramédullaire testiculaire abondante", cle:"erythroAbondante", min:2,
    signes:["nidsErythroides","erythroAbondante","multilignee"],
    stop:" — la PRÉSENCE est normale au terme : « Nests of erythroid extramedullary hematopoiesis are " +
         "present » à 39 weeks gestation [ernst, ch. 10]. Seule l'abondance est interprétable, et aucun " +
         "seuil n'existe : la frontière est qualitative des deux côtés, « nombreux érythroblastes », " +
         "« d'assez nombreux foyers » (§ 9.15). Ne pas écrire « hypoxie chronique » depuis la seule " +
         "gonade — le service lui-même l'écrit au conditionnel, « physiologique à ce terme pour la " +
         "localisation testiculaire ; l'abondance pourrait témoigner d'une hypoxie fœtale chronique ». " +
         "Et « des lignées rouge et granulocytaire » change la lecture : « Une hématopoïèse multilignée " +
         "testiculaire » n'est plus une érythropoïèse abondante." },

  { k:"pauvreteGerminale", l:"Pauvreté germinale testiculaire", cle:"moinsDe6Germinales", min:1,
    signes:["moinsDe6Germinales","distribGerminale","albugineeAbsente"],
    stop:" — compter, jamais typer : le sous-typage gonocyte / cellule intermédiaire / spermatogonie " +
         "exige « very fresh tissue obtained within an hour of death » [ernst, ch. 10] et n'est un axe " +
         "praticable sur AUCUN fœtus d'autopsie. Et « Even in this well-preserved specimen, the germ " +
         "cells are difficult to differentiate from Sertoli cells » : une indistinction germinale n'est " +
         "pas une pauvreté germinale." },

  { k:"dsd", l:"Discordance du sexe gonadique — ce que la lame ne conclut pas", cle:"discordanceSexe", min:2,
    signes:["discordanceSexe","derivesMulleriens","compartimentTesticulaire","asymetrieGonadique"],
    stop:" — la lame ne fournit qu'un des quatre volets exigés ensemble : « external genital morphology, " +
         "genitourinary ductal anatomy, gonadal histology, and chromosomal status should all be " +
         "thoroughly documented at all fetal/neonatal postmortem examinations » [keeling, ch. 25]. " +
         "L'aneuploïdie n'est pas histologique : c'est le caryotype qui tranche. Ne jamais confondre " +
         "« Sexe ambigu / DSD » avec un sexe indéterminable sur la pièce — dans le corpus, ce second " +
         "libellé désigne 7 fois sur 7 un fœtus de 11–17 SA fragmenté ou macéré, jamais un phénotype " +
         "ambigu. Et le sous-diagnostic est mesuré, pas théorique : « gonadal histology may be omitted »." },

  { k:"tractusNonDatant", l:"Dérivés du tractus — différenciation, jamais un terme", cle:"derivesMesonephrotiques",
    min:2, signes:["derivesMesonephrotiques","derivesMulleriens","asymetrieGonadique"],
    stop:" — les tractus génitaux internes ne datent pas : « the time of the appearance of smooth muscle " +
         "differentiation may vary », et l'atlas publie un épididyme de 34 weeks « less well developed » " +
         "qu'un de 22 weeks [ernst, ch. 11]. Leurs critères sont de DIFFÉRENCIATION — présent / absent, " +
         "côté par côté — au service du DSD, pas du terme histologique. Sur 200 CR, aucun tractus " +
         "génital interne n'a été décrit en histologie : 0 pour l'épididyme, la prostate, la vésicule " +
         "séminale et le déférent, et la seule mention est « deux structures allongée, symétriques, " +
         "rosées […] (canaux de Wolff ?) »." },

  { k:"orphelins", l:"Signes orphelins — décrits, non sourcés", cle:"calcifsIntraluminales", min:1,
    signes:["calcifsIntraluminales","crenelage","hemorragieGonadique"],
    stop:" — aucun de ces trois n'a de source : les calcifications intraluminales sont absentes de la " +
         "base ET des livres (§ 9.16), « Les ovaires sont crénelés et les trompes utérines tortueuses » " +
         "n'a qu'une occurrence et personne ne dit si c'est normal, artéfactuel ou un signe (§ 9.17), et " +
         "aucun critère ne sépare une hémorragie gonadique ante-mortem d'un saignement de dissection " +
         "(§ 9.22). Les décrire, les localiser, ne rien en conclure." }
];
/* ── 07 · Négatifs obligatoires ───────────────────────────────────────────────
   ⚠️ Liste construite depuis les livres, PAS relevée dans l'usage : sur les
   200 CR, deux seulement énoncent un négatif gonadique, « absence d'anomalie
   des gonades » et « absence d'érythropoïèse ». Elle est proposée, pas
   validée. Un négatif manquant ici n'est pas un négatif faux : c'est un
   négatif non regardé. */
var NEGATIFS = [
  { k:"conservation", l:"Qualité de conservation énoncée AVANT tout autre négatif",
    p:"un négatif posé sur du tissu autolysé ne vaut rien [ernst, ch. 15]",
    ko:"conservation NON énoncée — tous les négatifs qui suivent sont sans portée" },
  { k:"sexeGonadique", l:"Sexe gonadique histologique énoncé et confronté à la macro et au caryotype",
    p:"les quatre volets sont exigés ensemble : « external genital morphology, genitourinary ductal anatomy, gonadal histology, and chromosomal status »",
    ko:"sexe gonadique NON énoncé ou non confronté — la lame ne fournit qu'un des quatre volets" },
  { k:"lateralite", l:"Chaque gonade décrite séparément, y compris quand elles sont identiques",
    p:"sans côté par côté, la dysgénésie mixte est innommable [keeling, ch. 25]",
    ko:"gonades NON décrites séparément — une asymétrie ne serait pas nommable" },
  { k:"ovotestisNeg", l:"Absence de compartiment de l'autre sexe dans la gonade",
    p:"la partie ovarienne d'un ovotestis peut être polaire [keeling, ch. 25]",
    ko:"compartiment de l'AUTRE sexe présent — écarter d'abord les cellules hilaires au hile" },
  { k:"bandeletteNeg", l:"Absence de structure gonadique en bandelette",
    p:"fibreuse, sans germinale ni structure différenciée [keeling, ch. 25]",
    ko:"aspect en bandelette PRÉSENT — interdit de conclure sur tissu mal conservé" },
  { k:"inflammation", l:"Absence d'inflammation péri-gonadique et de cellules géantes",
    p:"périorchite méconiale, famille inflammatoire-réactionnelle",
    ko:"inflammation péri-gonadique ou cellules géantes PRÉSENTES — chercher la perforation digestive" },
  { k:"albugineeNeg", l:"Testicule : présence de l'albuginée isolant les cordons de l'épithélium de surface",
    p:"le critère formel de différenciation [soffoet, ch. 8]",
    ko:"albuginée NON identifiée — le critère formel de différenciation testiculaire tombe" },
  { k:"sixGerminales", l:"Testicule : au moins 6 cellules germinales par section transversale de tube",
    p:"« Each cross section of a seminiferous tubule usually contains six or more germ cells of various types »",
    ko:"compte germinal SOUS 6 par section — compter, jamais typer" },
  { k:"leydigTerme", l:"Testicule : densité des cellules de Leydig confrontée au terme",
    p:"haute à 16–21 SA ⟨conv⟩, effondrée après ≈ 23 SA [ernst, ch. 10]",
    ko:"densité leydigienne NON confrontée au terme — le même aspect est pic ou lésion selon la semaine" },
  { k:"germinalesNormales", l:"Testicule : absence de distribution germinale aberrante et de noyaux élargis",
    p:"deux des trois items du verbatim de dysgénésie [keeling, ch. 25]",
    ko:"distribution germinale aberrante ou noyaux élargis PRÉSENTS" },
  { k:"hematoTerme", l:"Testicule : caractère physiologique ou non de l'hématopoïèse, avec le terme",
    p:"présente au terme sur testicule normal ; seule l'abondance s'interprète",
    ko:"hématopoïèse NON rapportée au terme — sa présence seule n'est pas un signe" },
  { k:"folliculesPrimordiaux", l:"Ovaire ≥ 20 SA ⟨conv⟩ : follicules primordiaux présents à la profondeur du cortex",
    p:"le seul négatif ovarien réellement opposable [ernst, ch. 15] [soffoet, ch. 23]",
    ko:"aucun follicule primordial en profondeur ≥ 20 SA — trancher d'abord sur la lyse des AUTRES organes" },
  { k:"kysteMesure", l:"Ovaire : grand axe de tout kyste, en cm, avec le seuil de 3 cm rappelé",
    p:"« Follicles that exceed 3 cm are designated as follicular cysts »",
    ko:"kyste NON mesuré ou seuil non rappelé — un kyste de quelques mm n'est pas un kyste folliculaire" },
  { k:"fibroseStromaleNeg", l:"Ovaire : absence de fibrose stromale diffuse",
    p:"un des signes d'appui de la dysgénésie ovarienne [keeling, ch. 25]",
    ko:"fibrose stromale diffuse PRÉSENTE" },
  { k:"tractusCoteParCote", l:"Tractus, si prélevés : dérivés mésonéphrotiques et paramésonéphrotiques, côté par côté",
    p:"critères de différenciation au service du DSD [keeling, ch. 25] [ernst, ch. 11–18]",
    ko:"dérivés du tractus NON énoncés côté par côté — le rattachement homolatéral est perdu" },
  { k:"gonadeExaminee", l:"Gonade effectivement examinée, et non seulement prélevée",
    p:"117 CR sur 200 la listent, 17 la décrivent [corpus CR]",
    ko:"gonade NON examinée — l'écrire fait la différence entre une omission et une normalité" }
];
/* ⚠️ Un négatif volontairement ABSENT de cette liste : « absence de structure
   gonadoblastome-like ». Elles sont présentes dans jusqu'à 35 % des ovaires
   normaux — ce négatif serait faux plus d'une fois sur trois. */

/* ── 08 · Techniques ──────────────────────────────────────────────────────────
   Une ligne par QUESTION. Les clones et dilutions sont ceux réellement écrits
   dans les CR du service. Les deux dernières lignes sont des CONTRE-INDICATIONS :
   deux panels d'apparence évidente sont réfutés par la source, et les écrire
   comme des questions à ne pas poser vaut mieux que de les omettre. */
var TECHNIQUES = [
  { k:"cd71",     l:"CD71 — clone MRQ-48, Cell Marque, 1/200",
    q:"y a-t-il une érythropoïèse extramédullaire, et de quelle abondance" },
  { k:"mpoPax5",  l:"MPO polyclonal Dako 1/8000 · PAX5 clone SP34, Cell Marque, 1/25",
    q:"l'hématopoïèse est-elle multilignée — négatifs attendus" },
  { k:"inhibine", l:"Inhibine α — clone R1, Agilent, pur",
    q:"ce kyste ovarien est-il folliculaire — « négative = écarte l'origine folliculaire »" },
  { k:"wt1",      l:"WT1 — clone 6F H2, ZETA, 1/100",
    q:"ou est-ce un kyste du rete ovarii — « structures canalaires régulières » dans les coques" },
  { k:"ki67",     l:"Ki-67 / MIB — clone SP6, Cell Marque, 1/200",
    q:"ces cellules kystiques prolifèrent-elles" },
  { k:"sall4",    l:"SALL4 — clone EP299, MENARINI, 1/100",
    q:"y a-t-il une population germinale tumorale — négatif attendu" },
  { k:"synapto",  l:"Synaptophysine — clone 27G12, LEICA, 1/100",
    q:"lésion des cordons sexuels ou neuroendocrine — négatif attendu" },
  { k:"cd45",     l:"CD45 — clone 2B11+PD7/26, Bio SB, 1/150",
    q:"y a-t-il un infiltrat lymphoïde — négatif attendu" },
  { k:"cd68",     l:"CD68 — clone PGM1, Dako, 1/100",
    q:"macrophages : abondants et à cellules géantes oriente vers le méconium" },
  { k:"d240",     l:"D2-40 — clone D2-40, Dako, 1/200",
    q:"lymphatiques péri-lésionnels" },
  { k:"parvo",    l:"Parvovirus B19 — BIOSB, clone R92F6, 1/200",
    q:"parvovirose devant une érythropoïèse abondante — réalisé sur testicule dans le corpus" },
  { k:"cd10",     l:"CD10",
    q:"où est le rete, où est l'épididyme — fort dans l'épididyme, faible et par plages dans le rete" },
  { k:"caryotype",l:"Caryotype ou analyse moléculaire — pas une IHC",
    q:"le sexe gonadique est-il cohérent avec le sexe chromosomique" },
  { k:"adn",      l:"Mise en réserve de tissu congelé pour extraction d'ADN",
    q:"« tissue stored for DNA extraction » — sans ADN fœtal, pas de conseil génétique" },
  { k:"gcnisNon", l:"PLAP / OCT-4 / CD117 — CONTRE-INDIQUÉ sur un fœtus",
    q:"GCNIS : la question ne se pose pas avant 6 mois de vie — ne pas prescrire" },
  { k:"sousTypageNon", l:"Semi-fines épon 0,5–1 µm et microscopie électronique — CONTRE-INDIQUÉ",
    q:"sous-typage germinal : hors de portée de l'autopsie — ne pas prescrire" }
];

/* ── Propositions de techniques — déduites des clics, jamais imposées ─────────
   Aucune contre-indication n'est jamais proposée ici : elles figurent dans la
   liste pour être lues, pas pour être cochées par le module. */
function suggerer(){
  var s = {};
  function anormal(k){ return E.signes[k] === "anormal"; }

  if (anormal("nidsErythroides") || anormal("erythroAbondante")) s.cd71 = 1;
  if (anormal("erythroAbondante")){ s.mpoPax5 = 1; s.parvo = 1; }
  if (anormal("multilignee")) s.mpoPax5 = 1;

  if (anormal("kysteOvarien")){ s.inhibine = 1; s.wt1 = 1; s.ki67 = 1; }
  if (anormal("inhibineNeg")) s.wt1 = 1;
  if (anormal("coquesCanalaires")) s.wt1 = 1;
  if (anormal("kysteOvarien") && (E.mesure.v.kyste != null && E.mesure.v.kyste >= 3)) s.sall4 = 1;

  if (anormal("cellulesGeantes") || anormal("fibroseAlbuginee") || anormal("bilateraleRadiaire"))
    s.cd68 = 1;
  if (anormal("perforationDigestive")) s.cd68 = 1;

  /* Le rete et l'épididyme se départagent au marqueur, pas à l'œil. */
  if (anormal("derivesMesonephrotiques") || anormal("derivesMulleriens")) s.cd10 = 1;

  /* Tout ce qui touche au sexe gonadique sort de la lame. */
  if (anormal("discordanceSexe") || anormal("compartimentOvarien") ||
      anormal("compartimentTesticulaire") || anormal("asymetrieGonadique") ||
      anormal("gonadeFibreuse")){ s.caryotype = 1; s.adn = 1; }
  if (E.mesure.def === "ovotesticulaire" || E.mesure.def === "indeterminable"){
    s.caryotype = 1; s.adn = 1;
  }
  if (E.negatifs.sexeGonadique === "present") s.caryotype = 1;
  if (E.negatifs.tractusCoteParCote === "present") s.cd10 = 1;
  if (E.negatifs.hematoTerme === "present") s.cd71 = 1;
  if (E.negatifs.kysteMesure === "present") s.inhibine = 1;

  if (E.prelev.congele && SIGNES.some(function(x){ return E.signes[x.k] === "anormal"; }))
    s.adn = 1;
  return s;
}

/* ── Contrôles propres aux gonades ────────────────────────────────────────────
   Le banc commun a déjà tourné : il laisse gonadeFibreuse en anormal et le
   côté retiré. On part d'un état VOULU, jamais supposé. */
async function testsOrgane(chk, clic, set, crTient, pause){

  function pose(k, v){ if (E.signes[k] !== v) clic("les", k, v); }
  function ote(k){ if (E.signes[k]) clic("les", k, E.signes[k]); }
  function tenue(k){ return associations().some(function(a){ return a.d.k === k && a.tenu; }); }
  function lue(k){ return associations().some(function(a){ return a.d.k === k; }); }
  function propre(){ SIGNES.forEach(function(x){ ote(x.k); }); }
  function sexe(k){ if (E.mesure.def !== k) clic("mdef", k); }
  function cons(k){ if (E.mesure.opt !== k) clic("mopt", k); }

  propre();

  /* ── La latéralité : l'organe est pair, et le côté doit atteindre le CR ──── */
  chk("organe déclaré pair", PAIR === true);
  if (E.cote) clic("cote", E.cote);
  chk("côté absent = réserve au prélèvement",
      verdictPrelevement().res.indexOf("côté non déclaré — organe pair") >= 0);
  clic("prelev", "deuxBlocs");
  clic("cote", "droit");
  chk("le côté prélevé atteint le compte rendu", crTient("Droit — 1/2"));
  chk("le côté prélevé est repris au verdict prélèvement",
      verdictPrelevement().txt.indexOf(", droit.") >= 0 && crTient(", droit."));
  clic("cote", "deux");
  chk("les deux gonades sur un seul relevé", E.cote === "deux" && crTient("Les deux — 2/2"));
  clic("cote", "droit");

  /* ── Prélèvement : quatre manques sont GRAVES, et ils disent pourquoi ────── */
  chk("gonade non retrouvée est grave", par(PRELEV, "gonadeRetrouvee").grave === true);
  chk("deux blocs séparés est grave",   par(PRELEV, "deuxBlocs").grave === true);
  chk("albuginée est grave",            par(PRELEV, "albuginee").grave === true);
  chk("cortex jusqu'à la médullaire est grave", par(PRELEV, "cortexMedullaire").grave === true);
  chk("un bloc unique rend l'asymétrie non latéralisable",
      par(PRELEV, "deuxBlocs").manque.indexOf("on ne sait plus lequel est lequel") >= 0);

  /* ── Rétention : la gonade n'a NI RANG NI HEURE ──────────────────────────── */
  chk("une seule borne recevable, et c'est un report",
      RETENTION.filter(function(r){ return r.q !== "mauvais" && r.h > 0; }).length === 1 &&
      par(RETENTION, "reportAutres").q === "bon");
  chk("la borne recevable est un report des autres organes",
      par(RETENTION, "reportAutres").d.indexOf("jamais mesuré sur la gonade") >= 0);
  chk("absence de la gonade des tables de macération",
      par(RETENTION, "reportAutres").note.indexOf("ni rang ni heure") >= 0);
  chk("la cotation testiculaire du service est portée, non arbitrée",
      par(RETENTION, "basoTesticule").q === "moyen" &&
      par(RETENTION, "basoTesticule").note.indexOf("NON tranchée") >= 0);
  chk("l'effacement folliculaire n'est pas une borne",
      par(RETENTION, "folliculesEffaces").q === "mauvais");
  chk("l'indistinction germinale n'est pas une borne",
      par(RETENTION, "germSertoli").q === "mauvais");
  chk("le sous-typage n'est pas un seuil de macération",
      par(RETENTION, "sousTypageTombe").note.indexOf("délai d'autopsie") >= 0);

  clic("ret", "folliculesEffaces", "present");
  chk("seul un mauvais prédicteur : aucune borne recevable",
      crTient("Seuls des prédicteurs MAUVAIS sont positifs"));
  clic("ret", "reportAutres", "present");
  chk("le report donne la borne", crTient("Rétention reportée des autres organes"));
  chk("plafond 2–4 semaines rappelé", crTient("aucun organe fœtal ne donne de bonne estimation"));
  clic("ret", "folliculesEffaces", "present");
  clic("ret", "reportAutres", "present");

  /* ── Maturation : deux échelles, et aucune correspondance rang à rang ───── */
  chk("sept fenêtres en SA", STADES.length === 7);
  chk("chaque fenêtre porte SÉPARÉMENT ses deux colonnes",
      STADES.every(function(s){ var t = s.l + " " + s.note;
        return /testicul/i.test(t) && /ovair/i.test(t); }));
  chk("le repère opposable est à 20 SA", stadeAttendu(21).k === "folliculesPrimordiaux");
  chk("à 19 SA on est encore dans le pic leydigien", stadeAttendu(19).k === "picLeydigien");
  chk("à 40 SA, fenêtre ouverte", stadeAttendu(40).k === "procheTerme");
  chk("sans terme, aucune fenêtre", stadeAttendu(null) === null);
  chk("divergence interne d'ernst portée",
      par(STADES, "meioseEtDeuxiemeEtape").note.indexOf("DIVERGENCE INTERNE") >= 0);
  chk("rang ovarien tronqué à l'extraction, dit comme tel",
      par(STADES, "picLeydigien").note.indexOf("TRONQUÉE") >= 0);
  chk("bornes sourcées par la base seule, dites comme telles",
      par(STADES, "picLeydigien").note.indexOf("BASE seule") >= 0);
  chk("18 SA non converti promu en nom de terme, signalé",
      par(STADES, "folliculesPrimordiaux").note.indexOf("non converti") >= 0);
  chk("folliculogenèse reconnue mais non datée",
      par(STADES, "vasculosaEtCroissance").note.indexOf("AUCUN intervalle") >= 0);

  /* ── Le sexe gonadique BLOQUE tout le reste ──────────────────────────────── */
  set("sa", "24");
  chk("gonade non lue : ni sexe, ni conservation, ni chiffre",
      crTient("la gonade n'est pas encore lue"));
  clic("stade", "picGerminalEffondrement");
  chk("sans sexe gonadique, le stade est ininterprétable",
      $("vMesure").className.indexOf("bad") >= 0 && crTient("ININTERPRÉTABLE"));
  chk("les deux échelles ne sont pas symétriques",
      crTient("le testicule se date par son interstitium, l'ovaire par sa lignée germinale"));
  chk("le sexe gonadique ne se dérive pas du sexe déclaré",
      crTient("il ne se dérive jamais du sexe déclaré"));

  sexe("nonRetrouvee");
  chk("gonade non retrouvée : rien n'est lisible", $("vMesure").className.indexOf("bad") >= 0);
  chk("le chiffre du sous-diagnostic est écrit", crTient("117 CR sur 200"));

  sexe("indeterminable");
  chk("indéterminable est une limite de pièce, pas un diagnostic",
      $("vMesure").className.indexOf("bad") >= 0 && crTient("PAS un diagnostic"));
  chk("le piège de vocabulaire est nommé", crTient("fabrique des DSD à partir de fœtus trop jeunes"));

  sexe("ovotesticulaire");
  chk("l'ovotestis se lit dans les deux colonnes", crTient("jamais dans une seule"));
  chk("l'ovotestis appelle le caryotype et l'ADN",
      suggerer().caryotype === 1 && suggerer().adn === 1);

  /* ── Conservation : elle se juge sur les AUTRES organes ──────────────────── */
  sexe("ovaire");
  chk("conservation non jugée = réserve",
      crTient("il ne se juge PAS sur la gonade"));
  cons("lyseSevere");
  chk("ovaire lysé : ni stade ni dysgénésie",
      $("vMesure").className.indexOf("bad") >= 0 &&
      crTient("on n'écrit NI STADE NI DYSGÉNÉSIE"));
  chk("le critère et son artefact sont dans la même phrase",
      crTient("caution should be used when tissues are not well preserved"));

  sexe("testicule");
  chk("testicule macéré : le stade grossier reste écrivable",
      crTient("le sous-typage germinal, jamais"));
  chk("la fiche se contredit sur le compte germinal, et on porte les deux",
      crTient("Porter les deux lectures"));
  cons("conserve");

  /* ── Les trois chiffres, et leurs trois statuts épistémiques ─────────────── */
  set("m_germ", "4");
  chk("compte germinal sous le plancher sourcé",
      crTient("Compte SOUS le plancher de 6") && crTient("six or more germ cells"));
  chk("compter n'est pas typer", crTient("very fresh tissue obtained within an hour of death"));
  chk("une indistinction germinale n'est pas une pauvreté",
      crTient("elle ne fait pas une pauvreté germinale"));
  set("m_germ", "9");
  chk("compte au-dessus du plancher", crTient("Compte au-dessus du plancher"));

  sexe("ovaire");
  chk("le compte par tube n'a pas de sens sur un ovaire",
      crTient("critère TESTICULAIRE"));
  sexe("testicule");
  set("m_germ", "");

  set("m_kyste", "0.4");
  chk("kyste de 4 mm : sous le seuil du livre", crTient("SOUS le seuil du livre"));
  chk("le seuil de 3 cm est cité et sourcé",
      crTient("Follicles that exceed 3 cm are designated as follicular cysts"));
  chk("le corpus est deux ordres de grandeur sous le critère",
      crTient("découverte fortuite bénigne"));
  set("m_kyste", "4");
  chk("kyste de 4 cm : au-dessus du seuil", crTient("AU-DESSUS du seuil de 3 cm"));
  chk("le différentiel se tranche en IHC", crTient("pas à la règle"));
  set("m_kyste", "");

  set("m_diamTub", "59");
  chk("un chiffre sans son normal ne vaut rien",
      crTient("AUCUNE NORME PAR TERME") && crTient("The median tubular diameter increases to 59"));
  chk("la mesure se consigne, elle ne s'interprète pas", crTient("NON UTILISABLE en l'état"));
  set("m_diamTub", "");

  /* ── Le repère ovarien a une borne d'entrée, et il est binaire ───────────── */
  sexe("ovaire");
  set("sa", "18");
  chk("avant 20 SA, l'absence de follicule n'est pas un signe",
      crTient("n'est PAS un signe"));
  set("sa", "24");
  chk("à partir de 20 SA le repère est opposable et binaire",
      crTient("il est BINAIRE") && crTient("Il ne se grade pas"));

  /* ── La densité leydigienne bascule avec le TERME ────────────────────────── */
  sexe("testicule");
  pose("leydigAbondants", "anormal");
  set("sa", "18");
  chk("Leydig abondants à 18 SA : pic physiologique",
      crTient("PIC PHYSIOLOGIQUE de 16–21 SA"));
  set("sa", "26");
  chk("Leydig abondants à 26 SA : discordance",
      crTient("c'est une DISCORDANCE, pas une variante"));
  set("sa", "22");
  chk("entre 21 et 23 SA, les sources ne tranchent pas",
      crTient("que les sources ne tranchent pas à la semaine"));
  ote("leydigAbondants");

  /* ── Cohérence entre le sexe déclaré et les signes cochés ────────────────── */
  sexe("ovaire");
  pose("leydigAbondants", "anormal");
  chk("Leydig sur un ovaire déclaré : d'abord des cellules hilaires",
      crTient("morphologically identical to Leydig cells"));
  ote("leydigAbondants");
  sexe("testicule");
  pose("fibroseStromale", "anormal");
  chk("signes ovariens sur un testicule déclaré : réserve",
      crTient("ou le sexe déclaré est à reprendre"));
  ote("fibroseStromale");

  /* ── Le piège majeur : l'autolyse et la dysgénésie s'affichent ENSEMBLE ──── */
  propre();
  set("sa", "24");
  sexe("ovaire");
  pose("pasDeFolliculeProfond", "anormal");
  pose("fibroseStromale", "anormal");
  chk("dysgénésie ovarienne lue", tenue("dysgenesieOvarienne"));
  pose("autresOrganesLyses", "anormal");
  chk("l'autolyse s'affiche EN MÊME TEMPS que la dysgénésie",
      tenue("autolyseOvarienne") && tenue("dysgenesieOvarienne"));
  chk("on tranche sur les autres organes, jamais sur la gonade seule",
      crTient("jamais sur la gonade seule"));
  chk("si le foie et le rein sont lysés, ne rien conclure",
      par(DIAGS, "autolyseOvarienne").stop.indexOf("ne rien conclure") >= 0);
  ote("autresOrganesLyses");

  /* Et le troisième larron : le plan de coupe. */
  pose("corticaleSeule", "anormal");
  chk("le plan de coupe s'affiche aussi", tenue("coupeTangentielle"));
  chk("un cortex superficiel est vide de follicules chez un ovaire normal",
      par(DIAGS, "coupeTangentielle").stop.indexOf("ovaire NORMAL") >= 0);
  chk("les trois lectures coexistent",
      tenue("dysgenesieOvarienne") && tenue("coupeTangentielle"));
  propre();

  /* ── Le pivot commande : sans lui, l'association ne tient pas ────────────── */
  pose("fibroseStromale", "anormal");
  pose("folliculesPrimairesReduits", "anormal");
  chk("sans le pivot, la dysgénésie ovarienne ne tient pas",
      !tenue("dysgenesieOvarienne") &&
      crTient("signe pivot non coché : Aucun follicule primordial"));
  propre();

  /* ── Bandelette : une borne, pas un grade ────────────────────────────────── */
  pose("gonadeFibreuse", "anormal");
  pose("aucuneGerminale", "anormal");
  chk("deux signes ne suffisent pas au seuil de 3", !tenue("bandelette") && lue("bandelette"));
  chk("le faisceau incomplet reste affiché avec ses non regardés",
      crTient("faisceau incomplet") && crTient("non regardés"));
  pose("aucuneStructure", "anormal");
  chk("bandelette tenue à trois signes", tenue("bandelette"));
  chk("la bandelette est une borne, pas un grade",
      par(DIAGS, "bandelette").stop.indexOf("une borne, pas un grade") >= 0);
  chk("interdit sur tissu mal conservé",
      par(DIAGS, "bandelette").stop.indexOf("INTERDIT") >= 0);
  chk("le vocabulaire a bougé, et c'est écrit",
      par(DIAGS, "bandelette").stop.indexOf("Turner syndrome") >= 0);
  chk("la bandelette appelle le caryotype", suggerer().caryotype === 1);
  propre();

  /* ── Testicule dysgénétique : trois items, aucune valeur de bascule ──────── */
  pose("distribGerminale", "anormal");
  pose("noyauxGerminauxElargis", "anormal");
  chk("testicule dysgénétique lu", tenue("testiculeDysgenetique"));
  chk("les trois items du verbatim sont comptés séparément",
      par(DIAGS, "testiculeDysgenetique").signes.indexOf("leydigAbondants") >= 0 &&
      par(DIAGS, "testiculeDysgenetique").stop.indexOf("AUCUNE valeur de bascule") >= 0);
  chk("ne pas nommer l'entité sur la lame",
      par(DIAGS, "testiculeDysgenetique").stop.indexOf("l'aneuploïdie n'est pas histologique") >= 0);
  chk("le critère du service est signalé non défini",
      par(SIGNES, "tubesNonIndividualises").meta.indexOf("non retrouvé dans les livres") >= 0);
  propre();

  /* ── Ovotestis : le piège est au hile ────────────────────────────────────── */
  pose("compartimentOvarien", "anormal");
  pose("compartimentTesticulaire", "anormal");
  chk("ovotestis lu", tenue("ovotestis"));
  chk("un amas au hile n'est pas un compartiment testiculaire",
      par(DIAGS, "ovotestis").stop.indexOf("n'est PAS un compartiment testiculaire") >= 0);
  chk("divergence de nomenclature écrite et non arbitrée",
      par(DIAGS, "ovotestis").stop.indexOf("non arbitrée") >= 0);
  chk("gonadoblastome-like jamais énoncé en négatif",
      NEGATIFS.every(function(n){ return n.l.indexOf("gonadoblastome") < 0; }) &&
      par(VARIANTES, "gonadoblastomeLike").l.indexOf("NE JAMAIS énoncer en négatif") >= 0);
  propre();

  /* ── Dysgénésie mixte : elle a besoin des deux blocs ─────────────────────── */
  pose("asymetrieGonadique", "anormal");
  pose("gonadeFibreuse", "anormal");
  chk("dysgénésie mixte lue", tenue("dysgenesieMixte"));
  chk("elle ne tient qu'avec deux blocs étiquetés",
      par(DIAGS, "dysgenesieMixte").stop.indexOf("deux blocs séparés") >= 0);
  chk("le service latéralise déjà, mais ne date jamais côté par côté",
      par(DIAGS, "dysgenesieMixte").stop.indexOf("il ne date jamais côté par côté") >= 0);
  propre();

  /* ── Kyste : un seuil, et un modèle de rédaction ─────────────────────────── */
  pose("kysteOvarien", "anormal");
  chk("un kyste suffit à ouvrir l'association", tenue("kyste"));
  chk("le kyste propose inhibine, WT1 et Ki-67",
      suggerer().inhibine === 1 && suggerer().wt1 === 1 && suggerer().ki67 === 1);
  chk("sous 3 cm, pas de SALL4 proposé", suggerer().sall4 !== 1);
  set("m_kyste", "4");
  chk("au-dessus du seuil, SALL4 est proposé", suggerer().sall4 === 1);
  set("m_kyste", "");
  chk("le modèle de rédaction porte la divergence",
      par(DIAGS, "kyste").stop.indexOf("divergence assumée et écrite") >= 0);
  propre();

  /* ── Périorchite : la fibrose seule n'est pas méconiale ──────────────────── */
  pose("fibroseAlbuginee", "anormal");
  pose("bilateraleRadiaire", "anormal");
  chk("fibrose albuginéenne lue", tenue("periorchite"));
  chk("la fibrose seule n'est pas méconiale",
      par(DIAGS, "periorchite").stop.indexOf("n'est PAS méconiale") >= 0);
  chk("aucune épaisseur albuginéenne normale par terme",
      par(DIAGS, "periorchite").stop.indexOf("AUCUNE épaisseur albuginéenne normale") >= 0);
  chk("la fibrose propose le CD68", suggerer().cd68 === 1);
  pose("cellulesGeantes", "anormal");
  chk("cellules géantes : aller chercher la perforation digestive",
      par(DIAGS, "periorchite").signes.indexOf("perforationDigestive") >= 0);
  propre();

  /* ── Hématopoïèse : la présence est normale, seule l'abondance se lit ───── */
  pose("nidsErythroides", "anormal");
  chk("des nids seuls ne tiennent pas l'association", !tenue("hematoAbondante"));
  chk("les nids proposent quand même le CD71", suggerer().cd71 === 1);
  pose("erythroAbondante", "anormal");
  chk("abondance : association tenue", tenue("hematoAbondante"));
  chk("l'abondance appelle MPO, PAX5 et le parvovirus",
      suggerer().mpoPax5 === 1 && suggerer().parvo === 1);
  chk("la présence au terme est normale",
      par(DIAGS, "hematoAbondante").stop.indexOf("la PRÉSENCE est normale au terme") >= 0);
  chk("aucun seuil d'abondance n'existe",
      par(DIAGS, "hematoAbondante").stop.indexOf("aucun seuil n'existe") >= 0);
  chk("ne pas écrire hypoxie chronique depuis la seule gonade",
      par(DIAGS, "hematoAbondante").stop.indexOf("hypoxie chronique") >= 0);
  chk("multilignée change la lecture",
      par(SIGNES, "multilignee").meta.indexOf("la lignée change la lecture") >= 0);
  propre();

  /* ── DSD : la lame ne fournit qu'un des quatre volets ────────────────────── */
  pose("discordanceSexe", "anormal");
  pose("derivesMulleriens", "anormal");
  chk("discordance lue", tenue("dsd"));
  chk("les quatre volets sont cités ensemble",
      par(DIAGS, "dsd").stop.indexOf("gonadal histology, and chromosomal status") >= 0);
  chk("sexe ambigu et sexe indéterminable ne sont pas le même axe",
      par(DIAGS, "dsd").stop.indexOf("7 fois sur 7") >= 0);
  chk("le sous-diagnostic est mesuré, pas théorique",
      par(DIAGS, "dsd").stop.indexOf("gonadal histology may be omitted") >= 0);
  chk("la discordance appelle le caryotype, pas une IHC",
      suggerer().caryotype === 1 &&
      par(TECHNIQUES, "caryotype").l.indexOf("pas une IHC") >= 0);
  propre();

  /* ── Tractus : différenciation, jamais un terme ──────────────────────────── */
  pose("derivesMesonephrotiques", "anormal");
  pose("derivesMulleriens", "anormal");
  chk("tractus lu", tenue("tractusNonDatant"));
  chk("le tractus ne date pas",
      par(DIAGS, "tractusNonDatant").stop.indexOf("may vary") >= 0);
  chk("un épididyme de 34 weeks moins développé qu'un de 22 est publié",
      par(DIAGS, "tractusNonDatant").stop.indexOf("less well developed") >= 0);
  chk("0 tractus décrit en histologie sur 200 CR",
      par(DIAGS, "tractusNonDatant").stop.indexOf("aucun tractus") >= 0);
  chk("le tractus propose le CD10", suggerer().cd10 === 1);
  propre();

  /* ── Orphelins : décrits, localisés, rien conclu ─────────────────────────── */
  pose("calcifsIntraluminales", "anormal");
  chk("un orphelin suffit à s'afficher", tenue("orphelins"));
  chk("les orphelins ne concluent rien",
      par(DIAGS, "orphelins").stop.indexOf("ne rien en conclure") >= 0);
  chk("aucune source pour les trois",
      par(DIAGS, "orphelins").stop.indexOf("aucun de ces trois n'a de source") >= 0);
  propre();

  /* ── Négatifs et techniques : ce que la liste refuse de faire ────────────── */
  chk("la conservation est le premier négatif", NEGATIFS[0].k === "conservation");
  chk("un négatif sur tissu autolysé ne vaut rien",
      NEGATIFS[0].p.indexOf("ne vaut rien") >= 0);
  chk("deux techniques sont des contre-indications",
      TECHNIQUES.filter(function(t){ return /CONTRE-INDIQU/.test(t.l); }).length === 2);
  chk("aucune contre-indication n'est jamais suggérée",
      suggerer().gcnisNon !== 1 && suggerer().sousTypageNon !== 1);
  pose("noyauxGerminauxElargis", "anormal");
  chk("même sur signe germinal, le panel GCNIS reste non proposé",
      suggerer().gcnisNon !== 1);
  propre();
  clic("neg", "sexeGonadique", "present");
  chk("sexe gonadique non énoncé : le défaut est écrit",
      crTient("sexe gonadique NON énoncé"));
  chk("et il appelle le caryotype", suggerer().caryotype === 1);
  clic("neg", "sexeGonadique", "absent");

  /* ── Rien de coché ne veut pas dire absent ───────────────────────────────── */
  chk("la règle est écrite dans la grille",
      TECH_NOTE.indexOf("Rien de coché ne veut pas dire absent") >= 0);
  chk("aucun bouton ne porte un diagnostic",
      DIAGS.every(function(d){ return !document.querySelector('[data-act="les"][data-k="' + d.k + '"]'); }));
  chk("les non explorés sont dits dans le CR", crTient("Non explorés :"));

  /* On laisse le banc sur un terme réel : jamais set("sa", ""). */
  set("sa", "24");
  sexe("testicule");
  cons("conserve");
}
