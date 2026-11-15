/* Grille de lecture — tube digestif (œsophage → canal anal). VERSION 2 (2.0.0).
   Migration de digestif.js (1.0.1) sur le patron rein v3.5 / poumon v2.1 :
   gen_grille.py, mode présence, termes FOETO fondus dans les signes et branchés
   (termes tagués verbatim), blocs lus, ordre de lecture (LECTURE). La v1 reste
   publiée à côté tant que la v2 n'a pas été validée à l'usage.
   Ce que la v2 change, sans rien retrancher de la v1 :
   · un signe est un CONSTAT, présent / absent / non regardé (plus normal /
     anormal) ; les lésions restent des associations, affichées, jamais cochées ;
   · CADRES : la lame d'un tube se lit comme une section transversale — le
     fragment (segment, orientation, muqueuse lisible), la lumière, le calibre et
     la paroi au faible grossissement, puis la séreuse ; ensuite la muqueuse, les
     plexus et le GALT au moyen et au fort. Les cadres suivent ces compartiments
     croisés avec les familles de lésions de la fiche. PAS de cadre par segment :
     le plan de paroi est constant sur tout le tube (§ 4), une lame porte un ou
     deux segments, et la nécrose, les plexus, le contenu se liraient dix fois.
     Le segment se déclare UNE fois, en Maturation : c'est la norme, pas un cadre.
     Un discriminant sourcé s'affiche au survol de chaque segment ;
   · chaque signe porte son grossissement (mag) — savoir de pratique
     [expérience], proposé, à valider à l'usage ; le macro (paroi abdominale,
     trajet, œsophage, duodénum, méconium) et les autres lames (poumon,
     pancréas) sortent vers le Contexte hors lame, avant la rétention, en DEUX
     cadres : un « Non » sur le macro du tube ne doit pas énoncer des négatifs sur
     des lames que le lecteur du tube n'a pas sous les yeux ;
   · « Non » en bloc : sept signes de polarité normale ou de piège sont hors du
     bloc (bloc:false) — méconium, squames, lanugo dans la lumière ; ganglions
     épargnés par la nécrose ; cellules ganglionnaires immatures, dans la séreuse ;
     fragment pris dans la zone hypoganglionnaire distale. Le signe segment du
     fragment non identifiable se DÉDUIT du segment déclaré en Maturation (auto) : la v1
     le faisait déclarer deux fois, au risque de deux réponses contraires ;
   · FOETO : les 36 constats (-CON-) de fiche_digestif.md tagués verbatim ont
     chacun leur signe (fv). Correspondances qui changent la forme v1 :
       - PF.DIG-MAL-002 (absence de ganglions dans les plexus entériques) :
         les deux signes v1 sous-muqueux / myentérique deviennent UN signe, le
         critère entier de la fiche (§ 5.5 : sous-muqueux ET myentérique) ; le
         seuil de l'association Hirschsprung passe de 2 à 1 en conséquence ;
       - PF.DIG-MAL-043 (centres germinatifs OU plasmocytes matures) : un signe ;
         il devient le pivot de la stimulation antigénique (la v1 n'acceptait
         que le centre germinatif, alors que son stop dit : l'un OU l'autre) ;
       - PF.DIG-MAL-040, -051, -061 sont un constat v1 PLUS un qualificatif :
         le constat v1 garde sa ligne (amont dilaté, cul-de-sac œsophagien, kyste
         à paroi intestinale) et le terme FOETO porte l'image entière (amont ET
         aval, type C avec fistule, siège mésentérique) sous la clé v1 qui
         portait le qualificatif (avalCollabe, fistuleOesoTracheale,
         bordMesenterique) ;
       - PF.DIG-MAL-053 / -054 : l'hétérotopie de duplication v1 se dédouble
         (gastrique / pancréatique) ;
       - six constats nouveaux, tous de la fiche : polynucléaires déglutis dans
         le contenu gastrique (INF-003, il porte enfin le négatif gastrique),
         nécrose du cul-de-sac d'amont (VAS-002), zone de transition (MAL-065),
         perte de la calrétinine (MAL-031), AChE augmentée (MAL-007), canaux
         pancréatiques distendus par du mucus (MAL-060) ;
       - deux -NOR- tagués portent un signe v1 au même libellé (muqueuse
         desquamée NOR-107, ganglions dans la séreuse NOR-100). Dix termes qui
         nomment une maladie vont aux associations, affichés, jamais exportés ;
         omphalocèle et mucoviscidose n'ont pas d'association v1 qui les porte ;
   · les 12 négatifs ne se cochent plus : 6 se déduisent d'un signe répondu
     absent, 6 d'un contrôle (plusieurs signes, le segment, la muscularis
     mucosae, les gestes de sonde du prélèvement). Le contre-exemple du corpus
     que la v1 écrivait en défaut passe dans le pourquoi (p) ;
   · chaque variante normale vit dans le cadre qu'elle mime et ne passe au CR
     qu'en parenthèse ; les associations ouvrent la synthèse ;
   · le prélèvement est groupé (ce qui qualifie la lecture / critères et gestes
     d'autopsie) ; les renvois aux § 01, § 02, § 04 et § 08 de la v1 deviennent
     des noms de section : la numérotation change en lecture.
   Doublons de la v1 conservés tels quels : muqueuse desquamée, gaz dans la paroi
   et nécrose de coagulation sont à la fois une ligne de rétention (non datable)
   et un signe ; les cellules ganglionnaires immatures et le segment
   hypoganglionnaire sont à la fois variante et signe.
   Fond : ~/Bureau/fiches_lecture/fiche_digestif.md (§1 à §10).
   Les divergences entre sources sont PORTÉES dans les champs, jamais arbitrées.
   Aucune page n'est citée : page_start est vide sur tout le corpus. */

/* 2.1.0 (2026-11-14) — lot FOETO, propositions relues par Kimi K3.1 Pro et vérifiées par script
   (verbatim mot pour mot dans la fiche) : 2 fenêtre(s) de terme — le « Non » en bloc ne répond plus
   un signe daté hors de sa fenêtre (seul : un par un) ; 17 code(s) FOETO existant(s) branché(s)
   (variantes, rétention, stades, mesures, associations) ; 13 code(s) créé(s) depuis le verbatim de la
   fiche. Les propositions jugées faibles ou fausses attendent le tri de Rémi. */
var ORGANE  = "digestif";
var TITRE   = "tube digestif";
var SOURCE  = "fiche_digestif.md";
var MODULE  = "grille_digestif";
var VERSION = "2.1.0";
var SCHEMA  = "0.3.0";   /* 0.3.0 : signes present/absent, négatifs déduits */
var ETATS   = "presence";
var FOETO_DANS_SIGNES = true;

/* Le tube digestif ne se latéralise pas : il se SEGMENTE. L'axe de variation
   n'est pas droite/gauche mais rostro-caudal — « Histogenesis in general
   proceeds from rostral to caudal. » [ernst, ch. 4] — et un même repère est
   plus tardif en distal. Le segment tient donc ici la place que la latéralité
   tient au rein : il se déclare en Maturation (segment), et sans lui rien ne
   se date. */
var PAIR    = false;
var BLOCS   = true;
var LECTURE = true;   /* cadres (CADRES), grossissement (mag), variantes dans leur cadre */
/* L'étendue focale / multifocale / diffuse n'a de sens que pour le contenu, la
   nécrose et la séreuse : la longueur d'une aganglionose est une étendue, pas un
   foyer, et un kyste de duplication ne se dit pas multifocal. */
var GROUPES_SANS_ETENDUE = ["Repérage et lisibilité du fragment", "Obstacle et atrésie",
                            "Duplication et hétérotopie", "Villosités, cryptes et glandes de Brunner",
                            "Innervation — plexus", "Tissu lymphoïde (GALT)"];

var TITRE_CR    = "TUBE DIGESTIF";
var STADE_TITRE = "Horloge du GALT — la seule chronologie transversale du § 3 qui porte un critère diagnostique";

var KCL_TXT = "Fœticide par KCl déclaré. Aucune des sources ne décrit d'effet digestif du geste — mais " +
              "l'heure du décès est alors CONNUE, et c'est exactement ce que la source appelle son étalon : " +
              "l'estimation du délai se compare au délai réel, elle ne le remplace pas. Aucune borne n'est " +
              "à lire ici.";

/* Le faux retard n° 1 de l'organe est administratif : la lame arrive étiquetée
   « intestins » et rien ne dit quel segment. */
var RETARD_NOTE = "Sur cet organe, un retard de maturation est d'abord une erreur de SEGMENT : " +
                  "« Histogenesis in general proceeds from rostral to caudal. » [ernst, ch. 4], donc un " +
                  "intestin terminal « en retard » sur un duodénum n'est pas une anomalie mais la règle. " +
                  "Vérifier le segment déclaré ci-dessous avant de conclure. Et toute la chronologie du § 3 " +
                  "est une moyenne d'auteurs, déclarée telle par la source : « averages of different ages " +
                  "given for each event by several authors » et « should be considered approximations » " +
                  "[ernst, ch. 4] — un ordre, pas un barème.";

var AVANCE_NOTE = "Une avance du GALT n'est pas une curiosité : c'est le seul critère diagnostique du § 3. " +
                  "Des follicules primaires sous-muqueux facilement identifiables avant 20 SA, ou un " +
                  "« centre germinatif ou un plasmocyte mature à n'importe quel âge fœtal », font évoquer " +
                  "une infection fœtale ou un autre stimulus antigénique [ernst, ch. 4]. MAIS le seuil " +
                  "repose sur un « 20 weeks » écrit deux fois avec deux échelles dans la même phrase " +
                  "(§ 9-6) : 2 SA d'écart sur un critère diagnostique. Le versant fort du critère est " +
                  "l'autre : le centre germinatif et le plasmocyte mature sont anormaux SANS condition d'âge.";

var TECH_NOTE = "Les pointillés sont des propositions déduites des clics, jamais des prescriptions. Deux " +
                "d'entre elles ne se rattrapent pas après le fixateur : l'histochimie AChE, qui " +
                "« requires fresh rectal mucosa and is performed on frozen section tissue » " +
                "[keeling, ch. 22], et la congélation pour CFTR. Le corpus prouve par ailleurs que le " +
                "panel lymphoïde est DÉJÀ pratiqué sur le tube digestif dans ce service, quand aucune IHC " +
                "neurale (calrétinine, PHOX2B, CD117) n'apparaît dans un seul CR.";

/* ── 02 · Prélèvement ─────────────────────────────────────────────────────── */
/* Le § 1 est ici un constat d'écart, pas une liste de vœux : la liste de
   prélèvement du service est identique dans les 176 CR et ne porte que deux
   entrées digestives, « estomac » et « intestins ». Aucun segment nommé, aucun
   rectum, aucune orientation, aucune mesure. */
var PRELEV = [
  { k:"segmentNomme", g:"Qualifie la lecture", l:"Chaque segment prélevé et NOMMÉ séparément", grave:true,
    manque:"« Chaque segment digestif doit être analysé systématiquement. » [soffoet, ch. digestif] — la " +
           "liste pratiquée est « cœur, estomac, foie, gonades, intestins, muscle squelettique " +
           "(diaphragme, quadriceps), pancréas, peau, poumons, rate, reins, surrénales, thymus » " +
           "[corpus CR] : deux entrées seulement, jamais un segment. Sans segment nommé, tout le § 3 et " +
           "tout le § 4 sont inapplicables (Maturation — segment)" },
  { k:"perpendiculaire", g:"Qualifie la lecture", l:"Coupe perpendiculaire, les deux couches de la musculeuse et le plexus myentérique sur la MÊME coupe", grave:true,
    manque:"« well-oriented, perpendicular to the serosal or mucosal surface », de sorte que « both " +
           "layers of the muscularis propria and the intervening myenteric plexus are visualized » " +
           "[keeling, ch. 22] ; l'orientation n'est mentionnée dans aucun CR [corpus CR]. Une coupe " +
           "tangentielle fait disparaître un plexus myentérique présent" },
  { k:"lumiereConservee", g:"Qualifie la lecture", l:"Lumière et contenu luminal conservés",
    manque:"le contenu est ce que ce service décrit réellement — méconium, squames, polynucléaires " +
           "déglutis, hématies — et il reste lisible sur un tube macéré à 1–2 semaines [corpus CR] : le " +
           "contenu est plus robuste que le contenant" },
  { k:"duodenumPancreas", g:"Qualifie la lecture", l:"Rapport duodénum / tête du pancréas conservé sur le bloc",
    manque:"avant 16 SA le duodénum ne s'identifie pas autrement : « The jejunum and ileum cannot be " +
           "differentiated histologically from the duodenum at this gestational age », et il se " +
           "reconnaît « only by its attachment to the head of the pancreas » [ernst, ch. 4]" },
  { k:"rectum", g:"Critères de prélèvement et gestes d'autopsie — iront à la grille macro fixée", l:"Rectum prélevé", grave:true,
    manque:"le rectum est prescrit — « la muqueuse et le contenu gastrique, meilleur moyen de détecter " +
           "la présence de polynucléaires d'origine amniotique déglutis, le rectum et le pancréas » " +
           "[soffoet, ch. digestif] — et prélevé dans ZÉRO CR [corpus CR]. C'est le seul segment où une " +
           "aganglionose serait discutable, et c'est celui qui n'est pas prélevé (§ 9-20)" },
  { k:"estomacContenu", g:"Critères de prélèvement et gestes d'autopsie — iront à la grille macro fixée", l:"Muqueuse ET contenu gastriques",
    manque:"le prélèvement gastrique existe pour une question précise : « meilleur moyen de détecter la " +
           "présence de polynucléaires d'origine amniotique déglutis » [soffoet, ch. digestif]. Son " +
           "négatif est une donnée d'infection, pas un blanc" },
  { k:"appendice", g:"Critères de prélèvement et gestes d'autopsie — iront à la grille macro fixée", l:"Appendice prélevé",
    manque:"le repère de datation le plus commode du § 3 n'est pas dans le tube : les cryptes " +
           "microkystiques appendiculaires sont transitoires, 17–28 SA, pic 20–25 SA, et " +
           "« can be used as an additional histologic marker for midtrimester gestation » [ernst, ch. 4]" },
  { k:"niveauRectal", g:"Critères de prélèvement et gestes d'autopsie — iront à la grille macro fixée", l:"Niveau du prélèvement rectal noté, si aganglionose évoquée",
    manque:"« An adequate suction rectal biopsy is ideally obtained 2–3 cm proximal to the anorectal " +
           "junction (dentate line) » [keeling, ch. 22] — un prélèvement trop distal tombe dans le " +
           "segment hypoganglionnaire physiologique et produit un faux Hirschsprung" },
  { k:"sondeOesophage", g:"Critères de prélèvement et gestes d'autopsie — iront à la grille macro fixée", l:"Sonde passée dans l'œsophage",
    manque:"« Une sonde doit être passée dans la lumière de l'œsophage » [soffoet] — c'est le négatif " +
           "d'atrésie de l'œsophage, et il ne se rattrape pas après éviscération" },
  { k:"sondeAnale", g:"Critères de prélèvement et gestes d'autopsie — iront à la grille macro fixée", l:"Perméabilité anale vérifiée à la sonde",
    manque:"« une petite sonde permet de vérifier la perméabilité » [soffoet] — négatif d'imperforation. " +
           "Le geste peut éroder la muqueuse : une érosion muqueuse consignée après sondage se lit avec " +
           "cette réserve (§ 8)" },
  { k:"trajetCalibre", g:"Critères de prélèvement et gestes d'autopsie — iront à la grille macro fixée", l:"Trajet inspecté en entier, calibre et longueurs relevés",
    manque:"« L'inspection de l'intestin sur tout son trajet permet de rechercher une disparité de " +
           "calibre pouvant évoquer une sténose ou atrésie, des calcifications ou adhérences. » " +
           "[soffoet] ; aucune de ces mesures n'apparaît dans un seul CR [corpus CR]" }
];

/* ── 04 · Rétention ───────────────────────────────────────────────────────── */
/* Le tube digestif est l'axe de datation le plus utilisé du service ET le plus
   contradictoire : la « perte complète » de basophilie y est écrite pour > 75 h,
   1, 2 et 4 semaines. La cause n'est pas rédactionnelle, elle est lexicale — le
   corpus écrit « tube digestif » sans dire de quel COMPARTIMENT il parle, alors
   que l'épithélium part tôt et que la paroi reste. Les neuf formules du corpus
   sont donc portées telles quelles, avec leur délai et leur contradiction, et
   toutes en prédicteur MAUVAIS ; ce qui ordonne sans dater est en MOYEN ; et le
   seul prédicteur BON est celui que la source elle-même nomme son étalon.
   En présence, les quatre lignes non mauvaises tiennent dans la liste déroulante
   (critère le plus avancé) : les trois profils de compartiment, puis
   l'histoire clinique, en dernier parce qu'elle domine toute borne histologique. */
var CONTRA = "le corpus se contredit frontalement sur cet axe : la même « perte complète » de basophilie " +
             "digestive est écrite pour > 75 h, 1 semaine, 2 semaines et 4 semaines, et deux CR datent " +
             "4–8 h et 8–24 h sur le tube digestif — l'un par sa persistance, l'autre par sa perte " +
             "[corpus CR]. Le même organe sert de témoin PRÉCOCE et de témoin TARDIF (§ 9-2)";

var COMPART = "et surtout : la phrase ne nomme pas le COMPARTIMENT. L'épithélium part tôt, la paroi reste " +
              "[ernst, ch. 37] — écrire « tube digestif » mélange les deux vitesses. Écrire entérocytes " +
              "ou épithélium de surface (précoce), ou muscularis mucosae, musculeuse propre et cellules " +
              "ganglionnaires (tardif). Six CR emploient déjà le bon mot, treize non [corpus CR]";

var NON_ATTRIBUABLE = "la ligne « Epithelium ≥96 h » de la Table 37.1 — celle qui trancherait — est " +
                      "extraite avec sa colonne d'organe détruite : elle n'est rattachable à aucun organe " +
                      "de façon vérifiable et n'est PAS attribuée ici au tube digestif (§ 9-1). Aucune " +
                      "source ne donne de séquence chronologique compartiment par compartiment pour ce " +
                      "tube, contrairement au foie et aux surrénales (§ 9-3)";

var RETENTION = [
  { k:"histoireClinique", l:"Histoire clinique datée disponible — heure ou jour du décès connus", b:"= le délai clinique",
    d:"étalon déclaré par la source", h:9999, q:"bon",
    note:"c'est le seul prédicteur qui ne se contredise pas, et la source le dit elle-même : le " +
         "« gold standard » de l'estimation est « intrauterine fetal demise is an accurate clinical " +
         "history » [ernst, ch. 37]. La même source borne la méthode histologique : les pertes de " +
         "basophilie « and therefore may limit the accurate assessment of the duration of » la mort " +
         "fœtale quand elles sont discordantes d'un organe à l'autre" },

  { k:"epithProfil", l:"Épithélium de surface / entérocytes : basophilie perdue, paroi encore lisible", b:"compartiment PRÉCOCE",
    d:"ordre structurel, non chiffré", h:1, q:"moyen",
    note:"c'est la forme correcte, mais elle ORDONNE sans DATER : « The GI mucosa is often sloughed and " +
         "difficult to assess » [ernst, ch. 37] pendant que la paroi reste jugeable. " + NON_ATTRIBUABLE },
  { k:"paroiProfil", l:"Paroi — muscularis mucosae, musculeuse propre, cellules ganglionnaires : basophilie perdue", b:"compartiment TARDIF",
    d:"ordre structurel, non chiffré", h:2, q:"moyen",
    note:"le compartiment résistant est parti : c'est plus tard que la perte épithéliale, et c'est tout " +
         "ce qu'on peut en dire sans inventer un chiffre. " + NON_ATTRIBUABLE },
  { k:"deuxProfils", l:"Les DEUX compartiments ont perdu leur basophilie", b:"les deux compartiments perdus",
    d:"ordre structurel, non chiffré", h:3, q:"moyen",
    note:"« et si les deux sont perdus, le dire ainsi » est la consigne du § 2 : c'est la borne la plus " +
         "tardive que l'organe sache produire, et elle reste sans heure. " + NON_ATTRIBUABLE },

  { k:"cr4_8", l:"Basophilie persistante dans l'épithélium gastro-intestinal, perte débutante aux tubules rénaux", b:"4–8 h",
    d:"formule locale, contradictoire", h:8, q:"mauvais",
    note:"« début de perte de basophilie nucléaire des tubules rénaux et sa persistance au niveau de " +
         "l'épithélium gastro-intestinal » [corpus CR] — " + CONTRA },
  { k:"cr8_24", l:"Basophilie perdue aux TCP et à l'épithélium digestif, conservée dans les hépatocytes", b:"8–24 h",
    d:"formule locale, déclarée artéfactuelle", h:24, q:"mauvais",
    note:"« perte de basophilie nucléaire des TCP, de l'épithélium du tube digestif, conservée au sein " +
         "des hépatocytes (rétention estimée entre 8 et 24 heures, artéfactuelle) » [corpus CR] — le CR " +
         "déclare lui-même sa borne artéfactuelle. " + CONTRA },
  { k:"cr75", l:"Absence de basophilie du tractus digestif", b:"> 75 h",
    d:"formule locale, contradictoire", h:75, q:"mauvais",
    note:"« absence de basophilie du tractus digestif » [corpus CR] — et un autre CR conclut à la " +
         "PERSISTANCE digestive à 96 h – 1 semaine, contre un foie déjà éteint. " + CONTRA },
  { k:"cr72_1s", l:"Basophilie persistante du cortex surrénalien fœtal ET du tractus digestif", b:"72 h – 1 sem",
    d:"formule locale, contradictoire", h:168, q:"mauvais",
    note:"« persistance d'une basophilie nucléaire du cortex fœtal surrénalien et du tractus digestif » " +
         "[corpus CR] — " + CONTRA },
  { k:"cr96_1s", l:"Basophilie hépatique perdue, conservée dans le tractus intestinal", b:"96 h – 1 sem",
    d:"formule locale, contradictoire", h:168, q:"mauvais",
    note:"« perte de la basophilie nucléaire hépatique, conservation dans le tractus intestinal » et " +
         "« perte de basophilie des hépatocytes et sa persistance au sein des entérocytes » [corpus CR] " +
         "— cette formule inverse l'ordre foie/digestif de la borne 8–24 h, et le même délai porte " +
         "encore « perte complète de basophilie nucléaire intestinale et persistance dans les " +
         "chondrocytes trachéaux ». " + CONTRA },
  { k:"cr1_2s", l:"Perte totale de basophilie intestinale, basophilie alvéolaire encore discrète", b:"1–2 sem",
    d:"formule locale, contradictoire", h:336, q:"mauvais",
    note:"« perte totale de basophilie nucléaire intestinale, discrète persistance de la basophilie des " +
         "murs alvéolaires » [corpus CR] — " + CONTRA },
  { k:"cr2s", l:"Perte complète de basophilie du tube digestif, des surrénales et de la trachée", b:"2 sem",
    d:"formule locale, contradictoire", h:336, q:"mauvais",
    note:"« perte complète de basophilie nucléaire du tube digestif, des surrénales et de la trachée » " +
         "[corpus CR] — " + COMPART },
  { k:"cr1_4s", l:"Perte complète de basophilie du tube digestif et des surrénales", b:"1–4 sem",
    d:"formule locale, contradictoire", h:672, q:"mauvais",
    note:"« perte complète de la basophilie nucléaire du tube digestif et des surrénales » [corpus CR] " +
         "— la même phrase que la borne 2 semaines, avec un délai différent. " + COMPART },
  { k:"cr4s", l:"Perte quasi complète de basophilie des surrénales et du tube digestif", b:"4 sem",
    d:"formule locale, contradictoire", h:672, q:"mauvais",
    note:"« perte de la basophilie nucléaire quasi complète des surrénales et du tube digestif » " +
         "[corpus CR] — " + COMPART },

  { k:"muqueuseSloughee", l:"Muqueuse desquamée, épithélium détaché en nappes", b:"—",
    d:"artefact, ne date rien", h:0, q:"mauvais",
    note:"« The GI mucosa is often sloughed and difficult to assess » [ernst, ch. 37] : ce n'est pas une " +
         "nécrose muqueuse et ce n'est pas une borne. Juger sur la paroi, qui persiste (§ 8)" },
  { k:"gazParoi", l:"Gaz dans la paroi intestinale sur fœtus macéré", b:"—",
    d:"non interprétable", h:0, q:"mauvais",
    note:"AUCUNE source du corpus ne donne de critère séparant une pneumatose d'un gaz de putréfaction " +
         "sur un fœtus macéré (§ 9-10) : ne pas conclure « pneumatose » ici" },
  { k:"necroseIndistincte", l:"Nécrose de coagulation de la paroi sur pièce d'autopsie", b:"—",
    d:"ne sépare rien", h:0, q:"mauvais",
    note:"« In autopsy specimens, the coagulative necrosis may be difficult to differentiate from " +
         "post-mortem tissue autolysis. » [keeling, ch. 22] — c'est le piège qui coûte un diagnostic. " +
         "Le seul argument en faveur de l'entérocolite est topographique : " +
         "« Ganglion cells are generally spared » [keeling, ch. 22]" }
];

/* ── 05 · Maturation ──────────────────────────────────────────────────────────
   Le § 3 porte six chronologies : quatre par segment (œsophage, estomac, grêle,
   côlon-appendice-anal) et deux transversales (système nerveux entérique,
   muscularis mucosae, GALT). Une seule peut tenir dans une échelle unique :
   celle du GALT. Elle est la seule à la fois TRANSVERSALE — elle ne suppose
   aucun segment particulier —, MONOTONE en SA, et porteuse d'un CRITÈRE
   diagnostique. La muscularis mucosae, plus robuste encore, ne pouvait pas tenir
   ici : sa date attendue dépend du segment, donc elle vit avec le segment, dans
   la mesure. Le système nerveux entérique est achevé à 16 SA et n'ordonne plus
   rien ensuite.
   Toute la table est en SA (= post-fécondation + 2), conversion validée par la
   source elle-même sur les cryptes appendiculaires (17 = 15+2, 28 = 26+2). */
var STADES = [
  { k:"epars", l:"Cellules lymphoïdes ÉPARSES de la lamina propria — pas de GALT en coloration de routine", max:16,
    note:"« Scattered lymphoid cells appear in the lamina propria during the seventh week » (pf 7 → 9 SA) " +
         "[ernst, ch. 4]. Entre-temps, à 13 SA, seule l'IHC voit quelque chose : « Beginning in the 11th " +
         "week, immunohistochemical stains identify precursors of lymphoid tissue » — donc une lame HES " +
         "muette avant 16 SA n'est pas un déficit lymphoïde" },
  { k:"routineRare", l:"GALT visible en routine — petits amas de l'iléon terminal encore RARES", max:18,
    note:"« After 14 weeks, the gut-associated lymphoid tissue is visible in routine histological " +
         "sections. » (pf 14 → 16 SA) et « Tiny aggregates […] of the terminal ileum are infrequent at " +
         "14 weeks and more consistently seen at 16 weeks. » (pf 14→16 → 16→18 SA) [ernst, ch. 4]. " +
         "Rare ne veut pas dire absent : c'est le rang où le compte ne prouve rien" },
  { k:"amasConstants", l:"Amas lymphoïdes de l'iléon terminal CONSTANTS, pas encore de follicule organisé", max:21,
    note:"borne haute du même verbatim : « more consistently seen at 16 weeks » (pf 16 → 18 SA) " +
         "[ernst, ch. 4]. C'est le rang où passe le seuil d'anomalie du GALT — et c'est précisément " +
         "celui dont l'échelle est ambiguë (§ 9-6)" },
  { k:"folliculesPrimaires", l:"Follicules primaires ORGANISÉS", max:26,
    note:"« By 19–20 weeks, more organized primary follicles are present » (pf 19–20 → 21–22 SA) " +
         "[ernst, ch. 4]. INCOHÉRENCE INTERNE NON ARBITRÉE : la même phrase écrit ensuite « these become " +
         "easily recognizable […] after 20 weeks postmenstrual age », donc 20 SA — 21–22 SA d'un côté, " +
         "20 SA de l'autre, pour le même objet (§ 9-6). Deux SA d'écart, et c'est sur ce chiffre que " +
         "repose le seuil d'anomalie du GALT : follicules primaires sous-muqueux avant 20 SA" },
  { k:"peyer", l:"Plaques de Peyer volumineuses dans la sous-muqueuse de l'iléon terminal", max:99,
    note:"« By 24 weeks, large Peyer's patches are present in the submucosa of the terminal ileum » " +
         "(pf 24 → 26 SA) [ernst, ch. 4], avec des follicules solitaires sous-muqueux au duodénum, au " +
         "jéjunum, à l'appendice et au côlon distal. Topographie normale à connaître avant de s'étonner " +
         "d'un amas : les follicules sont « most well-developed at the junctions of the primary " +
         "segments », et le GALT « is most prominent in the cecum and rectum » [ernst, ch. 4]" }
];

/* ── 05 bis · Segment, muscularis mucosae, calibre et longueur ────────────────
   Le segment est à ce tube ce que la région est à la peau : sans lui, aucune
   norme à laquelle comparer. C'est le champ manquant n° 1 du § 10-2.
   v2 : chaque segment porte au survol son discriminant sourcé (§ 1, « Reconnaître
   le segment sur une lame désorientée ») — le repérage se fait là, une fois. */
var SEGMENTS = [
  { k:"oesophage",  l:"Œsophage",
    aide:"muscularis mucosae la plus épaisse du tube : « The esophageal muscularis mucosae rapidly increases " +
         "in thickness and becomes the thickest of all the segments of the gastrointestinal tract. » ; " +
         "papilles de la lamina propria : « are not present during fetal life » [ernst, ch. 4]" },
  { k:"jog",        l:"Jonction œsogastrique",
    aide:"« The thick muscularis mucosae (MMe) of the esophagus abruptly transitions into the much thinner " +
         "muscularis mucosae of the stomach (MMs) » [ernst, ch. 4]" },
  { k:"estomac",    l:"Estomac",
    aide:"musculeuse à trois couches : « an additional oblique layer internal to the inner circular layer » " +
         "[ernst, ch. 4] — absente du sphincter pylorique" },
  { k:"duodenum",   l:"Duodénum",
    aide:"avant 16 SA, seulement par son rapport à la tête du pancréas ; après 16 SA, Brunner : « The glands " +
         "are largest near the pyloric sphincter and are progressively smaller caudally. » [ernst, ch. 4]" },
  { k:"jejunum",    l:"Jéjunum",
    aide:"grêle et côlon ne se séparent pas avant 18 SA : « difficult, especially prior to 16 weeks » " +
         "(pf 16 → 18 SA) [ernst, ch. 4]" },
  { k:"ileon",      l:"Iléon",
    aide:"grêle et côlon ne se séparent pas avant 18 SA : « difficult, especially prior to 16 weeks » " +
         "(pf 16 → 18 SA) [ernst, ch. 4]" },
  { k:"appendice",  l:"Appendice",
    aide:"« The mucosa of the appendix is similar to that of the colon except that it lacks villi. » " +
         "[ernst, ch. 4]" },
  { k:"colon",      l:"Côlon",
    aide:"villositaire jusqu'à ~32 SA ; ensuite « Later in gestation, the colonic epithelium is " +
         "predominantly composed of goblet cells » [ernst, ch. 4]" },
  { k:"rectum",     l:"Rectum" },
  { k:"canalAnal",  l:"Canal anal",
    aide:"zone transitionnelle : « stratified cuboidal and columnar epithelium with peg cells on the " +
         "surface » [ernst, ch. 4]" },
  { k:"nonNomme",   l:"Segment NON identifiable — bloc étiqueté « intestins »" }
];

/* La muscularis mucosae est la dernière couche à se développer et la seule qui
   survive à une macération ayant effacé la muqueuse. Elle date donc mieux que
   tout le reste — à condition de savoir de quel segment on parle. */
var MM = [
  { k:"presente", l:"Muscularis mucosae PRÉSENTE" },
  { k:"absente",  l:"Muscularis mucosae ABSENTE" },
  { k:"nonEval",  l:"Muscularis mucosae NON ÉVALUABLE — coupe, lyse ou orientation" }
];

var MESURE = {
  titre:"Segment prélevé, muscularis mucosae, calibre et longueur",
  defLabel:"segment — sans lui, aucune norme",
  optLabel:"horloge qui survit à la macération",
  defs:SEGMENTS, opts:MM,
  champs:[{ id:"calibre",  fv:"FOETO:PF.DIG-NOR-083", label:"Calibre du segment (mm)",  min:0, max:60,  step:0.1 },
          { id:"longueur", label:"Longueur totale du grêle ou du côlon (cm)", min:0, max:400, step:1 }]
};

/* Dates d'apparition sourcées, § 3.7. Là où la fiche ne donne rien, la valeur
   est null et se dit : un trou dans la fiche reste un trou dans la grille. */
function mmAttendue(seg){
  return { oesophage:13, jog:null, estomac:16, duodenum:23, jejunum:null, ileon:32,
           appendice:null, colon:null, rectum:null, canalAnal:18 }[seg];
}
function mmSource(seg){
  return {
    oesophage:"« It begins in the esophagus during the 11th week » (pf 11 → 13 SA)",
    jog:null,
    estomac:"« in the stomach during the 14th week » (pf 14 → 16 SA)",
    duodenum:"« The muscularis mucosae appears in the duodenum as early as the 21st week and spreads " +
             "caudally. » (pf 21 → 23 SA)",
    jejunum:null,
    ileon:"« It may arrive at the terminal ileum by 30 weeks in some cases, but not until later in " +
          "others. » (pf 30 → 32 SA) — donc 32 SA est un PLANCHER incertain, pas une date",
    appendice:null,
    colon:null,
    rectum:null,
    canalAnal:"« in the anal canal in the 16th week » (pf 16 → 18 SA)"
  }[seg];
}
function famille(seg){
  if (seg === "duodenum" || seg === "jejunum" || seg === "ileon") return "grele";
  if (seg === "colon" || seg === "rectum" || seg === "appendice") return "colon";
  return "haut";
}

function verdictMesure(){
  var seg = E.mesure.def, mm = E.mesure.opt,
      cal = E.mesure.v.calibre, lon = E.mesure.v.longueur, sa = num("sa");
  if (!seg && !mm && cal == null && lon == null && !E.stade)
    return { cls:"", txt:"Ni segment, ni muscularis mucosae, ni mesure — le tube digestif n'est pas encore lu." };

  var t = [], cls = "ok", res = [];

  if (!seg || seg === "nonNomme"){
    cls = "bad";
    t.push((seg === "nonNomme" ? "Segment déclaré NON identifiable" : "Segment NON déclaré") +
           " : toute la lecture du tube digestif est ININTERPRÉTABLE. La différenciation va de la " +
           "bouche vers l'anus — « Histogenesis in general proceeds from rostral to caudal. » " +
           "[ernst, ch. 4] — donc un même repère est plus tardif en distal et il n'existe AUCUNE norme " +
           "commune à laquelle comparer. C'est le champ manquant n° 1 du service : la liste de " +
           "prélèvement ne porte que « estomac » et « intestins », jamais un segment nommé [corpus CR]. " +
           "Discriminants sourçables à tenter avant de renoncer : muscularis mucosae la plus épaisse " +
           "du tube et « are not present during fetal life » pour les papilles de la lamina propria " +
           "(œsophage) ; « an additional oblique layer internal to the inner circular layer » " +
           "(estomac) ; « The glands are largest near the pyloric sphincter and are progressively " +
           "smaller caudally. » (Brunner, duodénum après 16 SA) ; « The mucosa of the appendix is " +
           "similar to that of the colon except that it lacks villi. » ; « stratified cuboidal and " +
           "columnar epithelium with peg cells on the surface » (canal anal) [ernst, ch. 4]. Et avant " +
           "18 SA, renoncer est la bonne réponse entre grêle et côlon : « difficult, especially prior " +
           "to 16 weeks » (pf 16 → 18 SA).");
  } else {
    t.push("Segment : " + par(SEGMENTS, seg).l.toLowerCase() + ".");
    if (seg === "duodenum" && sa != null && sa < 16)
      res.push("avant 16 SA le duodénum ne s'identifie QUE par son rapport au pancréas — « The jejunum " +
               "and ileum cannot be differentiated histologically from the duodenum at this " +
               "gestational age » [ernst, ch. 4]");
    if ((seg === "colon" || seg === "rectum") && sa != null && sa < 18)
      res.push("avant 18 SA, côlon et grêle sont tous deux villositaires et ne se séparent pas en " +
               "pratique : « difficult, especially prior to 16 weeks » (pf 16 → 18 SA) [ernst, ch. 4]");
    if (seg === "rectum" && !E.prelev.rectum)
      res.push("segment rectum déclaré alors que le rectum n'est pas coché au Prélèvement — il est prélevé " +
               "dans zéro CR du corpus, vérifier ce qui est réellement sur la lame");
  }

  if (mm){
    var att = mmAttendue(seg), src = mmSource(seg);
    t.push("Muscularis mucosae : " + par(MM, mm).l.toLowerCase().replace("muscularis mucosae ", "") +
           ". C'est « The muscularis mucosae is the last layer to develop » [ernst, ch. 4], et c'est " +
           "la structure qui SURVIT à la macération : la maturation par la paroi reste lisible quand " +
           "la muqueuse est partie (voir Rétention).");
    if (seg && seg !== "nonNomme" && att == null)
      res.push("aucune date d'apparition de la muscularis mucosae n'est sourcée pour ce segment : la " +
               "progression est BIDIRECTIONNELLE — « It spreads from the duodenum caudally and from the " +
               "anal canal rostrally to meet at the ileocecal junction during the last trimester. » " +
               "[ernst, ch. 4] — mais aucune borne intermédiaire n'est donnée. Ne pas en inventer une");
    else if (att != null){
      t.push("Date attendue pour ce segment : " + att + " SA — " + src + " [ernst, ch. 4].");
      if (mm === "absente" && sa != null && sa < att)
        t.push("Absence ATTENDUE à " + sa + " SA : ce n'est pas une hypoplasie pariétale. " +
               "« The muscularis mucosae is not present, although the muscularis propria and " +
               "Auerbach's plexus are well-developed » [ernst, ch. 4] est l'image normale du grêle de " +
               "deuxième trimestre.");
      else if (mm === "absente" && sa != null && sa >= att){
        if (cls === "ok") cls = "warn";
        res.push("muscularis mucosae absente à " + sa + " SA alors qu'elle est attendue dès " + att +
                 " SA sur ce segment : soit le segment déclaré n'est pas le bon, soit le repère est en " +
                 "retard. Sur un tube, la première hypothèse est la plus fréquente");
      }
      else if (mm === "presente" && sa != null && sa < att)
        res.push("muscularis mucosae présente à " + sa + " SA, avant la date HES attendue (" + att +
                 " SA) : ne pas conclure à une avance. La source signale elle-même que ses dates " +
                 "musculaires sont datées, les études IHC plaçant la différenciation plus tôt et la " +
                 "vague rostro-caudale plus rapide « which are based on routine stains » (§ 9-7)");
    }
    if (mm === "nonEval")
      res.push("muscularis mucosae non évaluable : c'est la dernière horloge qui restait sur un tube " +
               "macéré. Sur coupe mal orientée, le smoothelin sépare musculeuse propre et muscularis " +
               "mucosae — « especially in suboptimally sampled and/or poorly oriented specimens » " +
               "[ernst, ch. 4] (Techniques)");
  }

  if (cal != null){
    if (cls === "ok") cls = "warn";
    t.push("Calibre mesuré à " + cal + " mm. Les seules valeurs datées de la fiche sont MACROSCOPIQUES " +
           "et portent une INVERSION : « L'intestin grêle est plus large (4 mm) que le côlon jusqu'à " +
           "mi-gestation (< 3 mm) », puis le côlon « devient plus large que le grêle à la fin du " +
           "deuxième trimestre (6 mm) » [soffoet, ch. digestif]. Un calibre ne se lit donc qu'avec son " +
           "segment ET son terme, et les deux bornes ne sont pas des intervalles.");
    if (famille(seg) === "haut" && seg && seg !== "nonNomme")
      res.push("aucune valeur de calibre n'est sourcée hors grêle et côlon : le chiffre se consigne, " +
               "il ne s'interprète pas");
    if (cal > 6)
      res.push("calibre au-delà de la plus haute valeur de référence citée (6 mm, côlon en fin de 2ᵉ " +
               "trimestre) : chercher une disparité de calibre sur tout le trajet et un obstacle " +
               "d'aval avant de conclure à une variation");
  }

  if (lon != null){
    if (cls === "ok") cls = "warn";
    t.push("Longueur mesurée à " + lon + " cm. Ancres sourcées, macroscopiques : grêle « 80 cm à 20 SA, " +
           "2 m à 32 SA, et 3 m à terme » ; « Le côlon mesure environ 15 cm à 20 SA, 40 cm à 32 SA, et " +
           "50 cm à terme » [soffoet, ch. digestif]. Ces trois valeurs sont des POINTS, pas un " +
           "intervalle : la fiche ne fournit ni écart-type ni bornes, et un écart ne se quantifie pas " +
           "ici. Aucune de ces mesures n'apparaît dans un seul CR du corpus.");
  }

  if ((cal != null || lon != null) && !E.prelev.trajetCalibre)
    res.push("mesure saisie sans que l'inspection du trajet soit cochée au Prélèvement — « L'inspection de " +
             "l'intestin sur tout son trajet permet de rechercher une disparité de calibre pouvant " +
             "évoquer une sténose ou atrésie, des calcifications ou adhérences. » [soffoet]");

  if (seg && seg !== "nonNomme" && !E.prelev.perpendiculaire)
    res.push("plan de coupe non confirmé — une coupe tangentielle fait disparaître un plexus " +
             "myentérique PRÉSENT et transforme un tube normal en faux Hirschsprung");

  res.push("aucune mesure HISTOLOGIQUE n'est possible sur cet organe : zéro épaisseur de paroi, zéro " +
           "hauteur villositaire, zéro rapport crypte/villosité, zéro compte de ganglions sur 176 CR, " +
           "et AUCUNE source ne fournit de normale digestive chiffrée par SA (§ 9-19). Les deux champs " +
           "ci-dessus sont macroscopiques et ce n'est pas un oubli");

  if (res.length){ if (cls === "ok") cls = "warn"; t.push("Réserves : " + res.join(" ; ") + "."); }
  return { cls:cls, txt:t.join(" ") };
}

/* ── Variantes normales — chacune dans le cadre dont elle mime un signe ───────
   Le § 8 de la fiche est presque entièrement fait de normalités surdiagnostiquées :
   sur un tube fœtal, la plupart des « lésions » sont des étapes. Celles qui font
   prendre un segment pour un autre vivent dans le repérage du fragment. */
var VARIANTES = [
  { k:"colonVillositaire", fv:"FOETO:PF.DIG-NOR-092", g:"Repérage et lisibilité du fragment", l:"Côlon villositaire — « The colonic mucosa is villous from this point in development until the 30th week or later. »" },
  { k:"villiGastriques",   g:"Repérage et lisibilité du fragment", l:"Villosités cardiales et pyloriques proéminentes (16–32 SA), pouvant persister au-delà" },
  { k:"ciliesOesophage",   fv:"FOETO:PF.DIG-NOR-089", g:"Repérage et lisibilité du fragment", l:"Cellules ciliées à la surface de l'œsophage — « Some patches of ciliated epithelium may remain at birth »" },
  { k:"mmAbsenteGrele",    g:"Repérage et lisibilité du fragment", l:"Absence de muscularis mucosae dans le grêle avant 23 SA" },
  { k:"longiFine",         fv:"FOETO:PF.DIG-NOR-103", g:"Obstacle et atrésie", l:"Longitudinale externe très fine — « The outer longitudinal layer is very thin until approximately the third trimester »" },
  { k:"pasDePapilles",     fv:"FOETO:PF.DIG-NOR-113", g:"Repérage et lisibilité du fragment", l:"Absence de papilles de la lamina propria œsophagienne, à tout âge fœtal" },
  { k:"muscleStrieOeso",   fv:"FOETO:PF.DIG-NOR-109", g:"Repérage et lisibilité du fragment", l:"Muscle strié squelettique dans le tiers supérieur de l'œsophage" },
  { k:"gastriqueEctopique",fv:"FOETO:PF.DIG-NOR-108", g:"Duplication et hétérotopie", l:"Muqueuse gastrique ectopique dans l'œsophage — hétérotopie fréquente et banale" },
  { k:"pyloriqueDuodenum", fv:"FOETO:PF.DIG-NOR-095", g:"Duplication et hétérotopie", l:"« pyloric-like epithelium may be found in the duodenum » — hétérotopie banale" },
  { k:"cryptesMicrokystiques", fv:"FOETO:PF.DIG-NOR-093", g:"Nécrose et inflammation de la paroi", l:"Cryptes microkystiques appendiculaires et microdiverticules (17–28 SA, pic 20–25 SA)" },
  { k:"muqueuseDesorganisee", fv:"FOETO:PF.DIG-NOR-106", g:"Nécrose et inflammation de la paroi", l:"Muqueuse appendiculaire désorganisée — « This process results in a disorganized mucosa with extensive areas of crypt dropout »" },
  { k:"folliculesAppendice", fv:"FOETO:PF.DIG-NOR-097", g:"Tissu lymphoïde (GALT)", l:"Gros follicules primaires appendiculaires après 22 SA — « Beginning at 20 weeks, larger primary follicles become common. »" },
  { k:"appendiceSansVilli",g:"Repérage et lisibilité du fragment", l:"Appendice sans villosités et à couches musculaires indistinctes avant 22 SA" },
  { k:"thanatosomes",      fv:"FOETO:PF.DIG-NOR-101", g:"Nécrose et inflammation de la paroi", l:"Globules hyalins / thanatosomes aux sommets des villosités, 16–22 SA, absents des cryptes" },
  { k:"apoptoseApicale",   fv:"FOETO:PF.DIG-MAL-074", g:"Nécrose et inflammation de la paroi", l:"Apoptose des cellules au sommet des villosités et débris épithéliaux dans la lumière" },
  { k:"segiCaps",          fv:"FOETO:PF.DIG-NOR-090", g:"Repérage et lisibilité du fragment", l:"Coiffes de Segi au sommet des villosités après 22 SA" },
  { k:"panethDroit",       fv:"FOETO:PF.DIG-NOR-112", g:"Repérage et lisibilité du fragment", l:"Cellules de Paneth au fond des cryptes, « confined to the right colon »" },
  { k:"ganglionsImmaturesVar", fv:"FOETO:PF.DIG-NOR-099", g:"Innervation — plexus", l:"Cellules ganglionnaires immatures dans les plexus entériques" },
  { k:"hypoganglionnaire", fv:"FOETO:PF.DIG-NOR-115", g:"Innervation — plexus", l:"Segment hypoganglionnaire physiologique du canal anal distal" }
];

/* Cadres, dans l'ordre où l'on lit une section transversale de tube : le
   fragment et sa lumière, les malformations (calibre, culs-de-sac, kystes), les
   lésions acquises de la paroi et de la séreuse au faible grossissement ; puis
   la muqueuse, les plexus et le GALT au moyen et au fort. */
var CADRES = [
  { g:"Contexte hors lame — macro du tube et de la paroi abdominale", hors:true },
  { g:"Contexte hors lame — autres lames : poumon, pancréas", hors:true },
  { g:"Repérage et lisibilité du fragment", sur:"Le fragment et sa lumière" },
  { g:"Contenu de la lumière", sur:"Le fragment et sa lumière" },
  { g:"Obstacle et atrésie", sur:"Malformations" },
  { g:"Duplication et hétérotopie", sur:"Malformations" },
  { g:"Nécrose et inflammation de la paroi", sur:"Lésions acquises" },
  { g:"Séreuse et péritoine", sur:"Lésions acquises" },
  { g:"Villosités, cryptes et glandes de Brunner", sur:"Lésions acquises" },
  { g:"Innervation — plexus", sur:"Structures de la paroi" },
  { g:"Tissu lymphoïde (GALT)", sur:"Structures de la paroi" }
];

/* ── 06 · Signes ──────────────────────────────────────────────────────────────
   On coche des SIGNES, jamais des diagnostics. Rien de coché ne veut pas dire
   absent : ça veut dire non regardé. Sur cet organe, le rappel n'est pas
   rhétorique : sur 176 CR à section micro, le tube digestif n'est décrit comme
   porteur d'une lésion que dans TROIS. Le reste est une horloge de macération,
   un contenant, ou un « normal » global. La liste ci-dessous vient donc
   massivement des livres : ce sont des lésions que le service ne produit pas
   encore, pas des lésions qu'il exclut.
   Un signe branché (fv) prend son libellé et son HPO dans FOETO ; un constat de
   la fiche sans terme porte fiche:"[source]" ; abcès cryptiques et
   pseudomembrane n'ont aucune source dans la fiche (marqués hors fiche). */
var SIGNES = [
  /* — Contexte hors lame — macro du tube et de la paroi abdominale (puis autres lames) — */
  { k:"laparoschisis", fv:"FOETO:PF.DIG-MAL-047", g:"Contexte hors lame — macro du tube et de la paroi abdominale",
    meta:"macroscopie exclusivement, avant éviscération" },
  { k:"omphalocele", fv:"FOETO:PF.DIG-MAL-063", g:"Contexte hors lame — macro du tube et de la paroi abdominale",
    meta:"macroscopie — le sac fait la différence" },
  { k:"ansesExposees", fv:"FOETO:PF.DIG-MAL-079", fiche:"[soffoet]", g:"Contexte hors lame — macro du tube et de la paroi abdominale", l:"Anses ayant flotté librement dans le liquide amniotique",
    meta:"macroscopie — c'est l'exposition qui produit la lésion digestive" },
  { k:"disparite", fv:"FOETO:PF.DIG-MAL-049", g:"Contexte hors lame — macro du tube et de la paroi abdominale" },
  { k:"deuxCulsDeSac", fv:"FOETO:PF.DIG-MAL-080", fiche:"[keeling]", g:"Contexte hors lame — macro du tube et de la paroi abdominale", l:"Deux culs-de-sac borgnes" },
  { k:"culDeSacOeso", fv:"FOETO:PF.DIG-MAL-081", fiche:"[soffoet]", g:"Contexte hors lame — macro du tube et de la paroi abdominale", l:"Cul-de-sac œsophagien supérieur",
    meta:"l'atrésie, avec ou sans fistule — le type C a sa propre ligne" },
  { k:"fistuleOesoTracheale", fv:"FOETO:PF.DIG-MAL-051", g:"Contexte hors lame — macro du tube et de la paroi abdominale",
    meta:"type C : le cul-de-sac ET la fistule inférieure" },
  { k:"diaphragmeMuqueux", fv:"FOETO:PF.DIG-MAL-048", g:"Contexte hors lame — macro du tube et de la paroi abdominale" },
  { k:"pancreasAnnulaire", fv:"FOETO:PF.DIG-MAL-059", g:"Contexte hors lame — macro du tube et de la paroi abdominale",
    meta:"n'entraîne pas obligatoirement une réduction de la lumière duodénale" },
  { k:"meconiumImpacte", fv:"FOETO:PF.DIG-MAL-057", g:"Contexte hors lame — macro du tube et de la paroi abdominale" },
  { k:"concretions", fv:"FOETO:PF.DIG-MAL-044", g:"Contexte hors lame — macro du tube et de la paroi abdominale" },
  { k:"microcolon", fv:"FOETO:PF.DIG-MAL-058", g:"Contexte hors lame — macro du tube et de la paroi abdominale" },
  { k:"contenuPoumon", fiche:"[corpus CR]", g:"Contexte hors lame — autres lames : poumon, pancréas", l:"Même contenu dans les lumières aériques pulmonaires",
    meta:"hors lame digestive — un même liquide amniotique dégluti ET inhalé" },
  { k:"pancreasCanauxMucus", seul:true, fv:"FOETO:PF.DIG-MAL-060", g:"Contexte hors lame — autres lames : poumon, pancréas",
    meta:"lame de pancréas — ces lésions « ne sont pas précoces » : un pancréas normal avant mi-gestation n'exclut rien" },

  /* — Repérage et lisibilité du fragment — */
  /* v2 : déduit de la Maturation (segment NON identifiable) — la v1 le faisait déclarer deux fois. */
  { k:"segmentNonIdentifiable", auto:function(){ var d = E.mesure.def; return d === "nonNomme" ? true : d ? false : null; },
    fiche:"[ernst, ch. 4]", g:"Repérage et lisibilité du fragment", mag:"faible", l:"Segment du fragment non identifiable" },
  { k:"coupeTangentielle", fiche:"[keeling]", g:"Repérage et lisibilité du fragment", mag:"faible",
    l:"Coupe mal orientée — les deux couches de la musculeuse ne sont pas sur le même plan" },
  { k:"muqueuseDesquamee", fv:"FOETO:PF.DIG-NOR-107", g:"Repérage et lisibilité du fragment", mag:"faible",
    meta:"« The GI mucosa is often sloughed and difficult to assess » — post-mortem, pas nécrose" },

  /* — Contenu de la lumière — le seul axe que le service alimente déjà spontanément.
     Méconium, squames et lanugo sont le contenu normal d'un tube perméable : ils se
     répondent un par un, hors du « Non » en bloc. */
  { k:"meconiumLumiere", bloc:false, fiche:"[corpus CR]", g:"Contenu de la lumière", mag:"faible", l:"Méconium dans la lumière" },
  { k:"contenuDiffus", fiche:"[corpus CR]", g:"Contenu de la lumière", mag:"faible", l:"Contenu retrouvé « sur presque tous les segments étudiés »",
    meta:"la distribution EST le diagnostic : diffus = déglutition, focal = local" },
  { k:"squames", bloc:false, fiche:"[corpus CR]", g:"Contenu de la lumière", mag:"moyen", l:"Squames dans la lumière" },
  { k:"lanugo", bloc:false, fiche:"[corpus CR]", g:"Contenu de la lumière", mag:"moyen", l:"Poils de lanugo dans la lumière" },
  { k:"pnAlteres", fiche:"[corpus CR]", g:"Contenu de la lumière", mag:"moyen", l:"Polynucléaires ALTÉRÉS dans la lumière",
    meta:"« de très volumineux amas de polynucléaires plus ou moins altérés »" },
  { k:"hematiesLumiere", fiche:"[corpus CR]", g:"Contenu de la lumière", mag:"moyen", l:"Hématies fœtales dans la lumière" },
  { k:"amasNecroses", fiche:"[corpus CR]", g:"Contenu de la lumière", mag:"moyen", l:"Amas cellulaires nécrosés dans la lumière" },
  { k:"pnGastriques", fv:"FOETO:PF.DIG-INF-003", g:"Contenu de la lumière", mag:"moyen",
    meta:"le prélèvement dédié : muqueuse ET contenu gastriques — son négatif est une donnée d'infection" },
  { k:"pnPeuAlteres", fiche:"[corpus CR]", g:"Contenu de la lumière", mag:"fort", l:"Polynucléaires PEU altérés dans la lumière",
    meta:"peu altérés = déglutis récemment ; l'altération n'est pas une gradation, c'est une chronologie" },

  /* — Obstacle et atrésie — */
  { k:"amontDilate", fv:"FOETO:PF.DIG-MAL-082", fiche:"[keeling]", g:"Obstacle et atrésie", mag:"faible", l:"Segment d'amont dilaté et hypertrophié",
    meta:"l'amont seul — les deux bouts sur la lame ont leur propre ligne" },
  { k:"avalCollabe", fv:"FOETO:PF.DIG-MAL-040", g:"Obstacle et atrésie", mag:"faible",
    meta:"les deux bouts : amont dilaté ET aval rétracté, étroit, collabé" },
  { k:"longitudinaleEpaisse", fv:"FOETO:PF.DIG-MAL-055", g:"Obstacle et atrésie", mag:"faible",
    meta:"signe positif d'obstacle d'aval, gratuit en HES" },
  { k:"necroseCulDeSac", fv:"FOETO:PF.DIG-VAS-002", g:"Obstacle et atrésie", mag:"faible",
    meta:"« Necrosis of the proximal blind end » — ne pas la lire comme une entérocolite" },
  { k:"remnantsTracheoBronchiques", fv:"FOETO:PF.DIG-MAL-062", g:"Obstacle et atrésie", mag:"faible",
    meta:"signe POSITIF d'anomalie de séparation — pas du cartilage d'entraînement de coupe" },
  { k:"contenuAval", fv:"FOETO:PF.DIG-MAL-045", g:"Obstacle et atrésie", mag:"moyen",
    meta:"la preuve du mécanisme : l'atrésie est postérieure à la perméabilité établie" },

  /* — Duplication et hétérotopie — */
  { k:"kysteParoiIntestinale", fv:"FOETO:PF.DIG-MAL-083", fiche:"[keeling]", g:"Duplication et hétérotopie", mag:"faible",
    l:"Structure kystique ou tubulaire à paroi identique à celle de l'intestin",
    meta:"la paroi prouve, quel que soit le siège — le siège mésentérique a sa propre ligne" },
  { k:"bordMesenterique", fv:"FOETO:PF.DIG-MAL-061", g:"Duplication et hétérotopie", mag:"faible",
    meta:"la paroi ET le siège ; certaines duplications sont très à distance du tube" },
  { k:"heterotopieGastrique", fv:"FOETO:PF.DIG-MAL-053", g:"Duplication et hétérotopie", mag:"moyen",
    meta:"c'est elle qui porte le risque ulcéreux" },
  { k:"heterotopiePancreatique", fv:"FOETO:PF.DIG-MAL-054", g:"Duplication et hétérotopie", mag:"moyen" },

  /* — Nécrose et inflammation de la paroi — */
  { k:"necroseCoagulation", fv:"FOETO:PF.DIG-MAL-030", g:"Nécrose et inflammation de la paroi", mag:"faible",
    meta:"« may be difficult to differentiate from post-mortem tissue autolysis » sur pièce d'autopsie" },
  { k:"necroseTransmurale", fiche:"[keeling]", g:"Nécrose et inflammation de la paroi", mag:"faible",
    l:"Nécrose atteignant la MUSCULEUSE PROPRE — transmurale" },
  { k:"oedemeParoi", fv:"FOETO:PF.DIG-MAL-084", fiche:"[keeling]", g:"Nécrose et inflammation de la paroi", mag:"faible", l:"Œdème de la paroi" },
  { k:"hemorragieParoi", fv:"FOETO:PF.DIG-VAS-004", fiche:"[keeling]", g:"Nécrose et inflammation de la paroi", mag:"faible", l:"Hémorragie de la paroi" },
  { k:"pneumatose", fv:"FOETO:PF.DIG-MAL-032", g:"Nécrose et inflammation de la paroi", mag:"faible",
    meta:"le constat est un gaz dans la paroi : aucune source ne le sépare d'un gaz de putréfaction sur macéré" },
  { k:"perforation", fv:"FOETO:PF.DIG-MAL-085", fiche:"[keeling]", g:"Nécrose et inflammation de la paroi", mag:"faible", l:"Perforation pariétale",
    meta:"siège antimésentérique à noter ; dans la péritonite fibro-adhésive, le trou peut être introuvable" },
  { k:"necroseMuqueuse", fiche:"[keeling]", g:"Nécrose et inflammation de la paroi", mag:"moyen", l:"Nécrose limitée à la MUQUEUSE" },
  { k:"necroseSousMuqueuse", fiche:"[keeling]", g:"Nécrose et inflammation de la paroi", mag:"moyen", l:"Nécrose atteignant la SOUS-MUQUEUSE" },
  { k:"infiltratParoi", fv:"FOETO:PF.DIG-INF-007", fiche:"[keeling]", g:"Nécrose et inflammation de la paroi", mag:"moyen", l:"Infiltrat inflammatoire de la PAROI",
    meta:"des polynucléaires DANS LA LUMIÈRE ne sont pas une inflammation pariétale" },
  { k:"abcesCryptiques", g:"Nécrose et inflammation de la paroi", mag:"moyen", l:"Abcès cryptiques" },
  { k:"pseudomembrane", g:"Nécrose et inflammation de la paroi", mag:"moyen", l:"Pseudomembrane" },
  { k:"fibroseSousMuqueuse", fv:"FOETO:PF.DIG-MAL-050", g:"Nécrose et inflammation de la paroi", mag:"moyen" },
  { k:"ganglionsEpargnes", bloc:false, fv:"FOETO:PF.DIG-VAS-001", g:"Nécrose et inflammation de la paroi", mag:"fort",
    meta:"« Ganglion cells are generally spared » — le seul argument contre l'autolyse globale" },

  /* — Séreuse et péritoine — */
  { k:"calcificationsPeritoneales", fv:"FOETO:PF.DIG-MAL-009", g:"Séreuse et péritoine", mag:"faible",
    meta:"isolées, sans réaction cellulaire, elles ne prouvent pas la péritonite méconiale" },
  { k:"adherences", fv:"FOETO:PF.DIG-MAL-086", fiche:"[soffoet]", g:"Séreuse et péritoine", mag:"faible", l:"Adhérences péritonéales" },
  { k:"squamesPeritoine", fv:"FOETO:PF.DIG-MAL-064", g:"Séreuse et péritoine", mag:"moyen" },
  { k:"gigantoCellulaire", fv:"FOETO:PF.DIG-MAL-087", fiche:"[keeling]", g:"Séreuse et péritoine", mag:"moyen", l:"Réaction giganto-cellulaire péritonéale au méconium",
    meta:"« typically associated » pour keeling, « exceptionnel » pour soffoet — divergence non arbitrée" },
  { k:"macrophagesBiliaires", fv:"FOETO:PF.DIG-MAL-056", g:"Séreuse et péritoine", mag:"fort" },

  /* — Villosités, cryptes et glandes de Brunner — */
  { k:"villositesAplaties", fv:"FOETO:PF.DIG-MAL-041", g:"Villosités, cryptes et glandes de Brunner", mag:"faible",
    meta:"pas d'atrophie villositaire : les villosités « may appear shortened, blunted, or bent in segments distended by meconium »" },
  { k:"cryptesDilatees", fv:"FOETO:PF.DIG-MAL-046", g:"Villosités, cryptes et glandes de Brunner", mag:"moyen" },
  { k:"brunnerDilatees", fv:"FOETO:PF.DIG-MAL-042", g:"Villosités, cryptes et glandes de Brunner", mag:"moyen" },

  /* — Innervation — plexus. Cellules immatures, ganglions de la séreuse et zone
     hypoganglionnaire sont des pièges de lecture, pas des lésions : hors du bloc. */
  { k:"hypoganglionnaireSigne", bloc:false, fiche:"[keeling]", g:"Innervation — plexus", mag:"faible",
    l:"Fragment pris dans la zone distale normalement pauvre en ganglions",
    meta:"faux positif n° 1 — et les deux sources ne s'accordent pas sur la longueur de cette zone" },
  { k:"ganglionsAbsents", fv:"FOETO:PF.DIG-MAL-002", g:"Innervation — plexus", mag:"moyen",
    meta:"plexus sous-muqueux ET myentérique ; cellules résolues à l'objectif ×10, sur au moins deux coupes adjacentes" },
  { k:"zoneTransition", fv:"FOETO:PF.DIG-MAL-065", g:"Innervation — plexus", mag:"moyen",
    meta:"seuil propre : plus de 12,5 % de la circonférence" },
  { k:"nerfsHypertrophiques", fv:"FOETO:PF.DIG-MAL-029", g:"Innervation — plexus", mag:"moyen",
    meta:"plus de 40 µm, au moins deux" },
  { k:"filetsEpais", fv:"FOETO:PF.DIG-MAL-088", fiche:"[soffoet]", g:"Innervation — plexus", mag:"moyen",
    l:"« Le plexus myentérique est remplacé par d'épais filets nerveux »" },
  { k:"ganglionsSereuse", bloc:false, fv:"FOETO:PF.DIG-NOR-100", g:"Innervation — plexus", mag:"moyen",
    meta:"« erroneously interpreted as ganglionic submucosa »" },
  { k:"ganglionsImmatures", fv:"FOETO:PF.DIG-NOR-118", bloc:false, fiche:"[keeling]", g:"Innervation — plexus", mag:"fort",
    l:"Cellules ganglionnaires petites, à chromatine mottée, sans nucléole",
    meta:"normales jusqu'à la fin de la 1ʳᵉ année — PHOX2B les révèle" },
  { k:"perteCalretinine", fv:"FOETO:PF.DIG-MAL-031", g:"Innervation — plexus", mag:"technique",
    meta:"normal = filets calrétinine-positifs dans la lamina propria" },
  { k:"acheAugmentee", fv:"FOETO:PF.DIG-MAL-007", g:"Innervation — plexus", mag:"technique",
    meta:"histochimie sur muqueuse rectale FRAÎCHE congelée seulement ; à peine ébauchée chez le fœtus" },

  /* — Tissu lymphoïde (GALT) — deux signes, deux négatifs : le « Non » compte double. */
  { k:"folliculesSousMuqueux", seul:true, fv:"FOETO:PF.DIG-MAL-052", g:"Tissu lymphoïde (GALT)", mag:"faible",
    meta:"versant fragile : le seuil repose sur un « 20 weeks » écrit avec deux échelles (§ 9-6)" },
  { k:"cgPlasmocyte", fv:"FOETO:PF.DIG-MAL-043", g:"Tissu lymphoïde (GALT)", mag:"fort",
    meta:"anormal SANS condition d'âge fœtal — le versant fort du critère" }
];

/* ── 07 · Associations lues ───────────────────────────────────────────────────
   Aucun diagnostic ne se coche. Chaque faisceau est DÉDUIT des signes cochés.
   Un faisceau incomplet reste affiché avec le compte de ce qui n'a pas été
   regardé : sur cet organe, non regardé est la situation la plus fréquente.
   Le pivot (cle) est le signal sans lequel le faisceau ne veut rien dire.        */
var DIAGS = [

  { k:"deglutitionInflammatoire",
    l:"Contenu inflammatoire dégluti — le tube lit le LIQUIDE AMNIOTIQUE, il n'est pas malade",
    cle:"pnAlteres", min:2,
    signes:["pnAlteres","pnPeuAlteres","squames","lanugo","contenuDiffus","contenuPoumon","pnGastriques"],
    stop:"Ne pas conclure à une atteinte du tube digestif. Le contenu luminal est un " +
         "PRÉLÈVEMENT de liquide amniotique, pas une lésion pariétale : la paroi doit être " +
         "regardée séparément. L'altération des polynucléaires oriente sur l'ancienneté du " +
         "passage, pas sur l'organe. Un même contenu retrouvé dans les lumières aériques " +
         "pulmonaires confirme la déglutition-inhalation et retire toute spécificité " +
         "digestive." },

  { k:"hemorragieDeglutie",
    l:"Hématies dans la lumière — chercher la source EN AMONT avant d'accuser le tube",
    cle:"hematiesLumiere", min:2,
    signes:["hematiesLumiere","squames","contenuDiffus","contenuPoumon","meconiumLumiere"],
    stop:"Ne pas conclure à une hémorragie digestive. Des hématies dans la lumière sans " +
         "hémorragie de la paroi et sans lésion muqueuse plaident pour du sang dégluti " +
         "(source maternelle, placentaire ou ORL). La fiche ne donne AUCUN critère " +
         "morphologique séparant sang dégluti et sang d'origine pariétale : la distinction " +
         "se fait sur la présence ou l'absence d'hémorragie de la paroi, pas sur l'aspect " +
         "du sang." },

  { k:"ecunSuspecte", fv:"FOETO:PF.DIG-INF-004",
    l:"Entérocolite ulcéro-nécrosante — faisceau de phase aiguë",
    cle:"necroseCoagulation", min:4,
    signes:["necroseCoagulation","oedemeParoi","hemorragieParoi","infiltratParoi",
            "pneumatose","ganglionsEpargnes","perforation","necroseTransmurale",
            "fibroseSousMuqueuse"],
    stop:"Ne pas conclure ECUN sans contexte clinique, et ne JAMAIS écrire un stade de Bell " +
         "depuis la lame : la stadification est clinique. Le piège central est écrit — " +
         "« In autopsy specimens, the coagulative necrosis may be difficult to differentiate " +
         "from post-mortem tissue autolysis. » Le seul argument morphologique opposable est " +
         "de localisation : « Ganglion cells are generally spared » — une nécrose qui " +
         "respecte les cellules ganglionnaires plaide contre une autolyse globale. La " +
         "pneumatose ne tranche PAS : aucune source du corpus ne donne de critère pour " +
         "distinguer un gaz de fermentation d'un gaz de putréfaction sur un fœtus macéré." },

  { k:"autolyseNonEcun",
    l:"Nécrose pariétale SANS argument de vivant — lire d'abord l'autolyse",
    cle:"necroseCoagulation", min:2,
    signes:["necroseCoagulation","muqueuseDesquamee","amasNecroses","contenuDiffus",
            "segmentNonIdentifiable"],
    stop:"Faisceau affiché DÉLIBÉRÉMENT à côté du précédent : les deux partagent le même " +
         "pivot. Tant qu'aucun signe de réaction du vivant n'est coché — infiltrat, " +
         "pneumatose, ganglions épargnés, fibrose de réparation — la nécrose reste non " +
         "attribuée. Ne pas trancher par le nombre de signes cochés : trancher par la " +
         "présence d'un argument de réaction tissulaire." },

  { k:"ecunExteriorisation", fv:"FOETO:PF.DIG-MAL-071",
    l:"Nécrose intestinale SUR défaut de paroi — mécanisme écrit, pas une ECUN du prématuré",
    cle:"laparoschisis", min:2,
    signes:["laparoschisis","ansesExposees","necroseCoagulation","necroseTransmurale",
            "fibroseSousMuqueuse","omphalocele"],
    stop:"Ne pas conclure ECUN du prématuré : le seul cas du corpus est secondaire et son " +
         "mécanisme est écrit — « entérocolite nécrosante distale secondaire à " +
         "l'extériorisation du tube digestif ». Le sac fait la différence entre omphalocèle " +
         "et laparoschisis : si les deux sont cochés ensemble, la macroscopie n'a pas été " +
         "tranchée avant éviscération." },

  { k:"atresieDuodenale", fv:"FOETO:PF.DIG-MAL-066",
    l:"Atrésie ou sténose duodénale — le seul site à mécanisme ÉPITHÉLIAL",
    cle:"diaphragmeMuqueux", min:2,
    signes:["diaphragmeMuqueux","disparite","amontDilate","avalCollabe","pancreasAnnulaire"],
    stop:"Ne pas conclure au mécanisme vasculaire : le duodénum est le seul point de " +
         "l'intestin où la prolifération épithéliale occlut complètement la lumière pendant " +
         "l'embryogenèse — « The suggested mechanism of duodenal atresia by Tandler is a " +
         "failure of the lumen of the embryonic duodenum to recanalise ». Un pancréas " +
         "annulaire associé n'est pas la cause : « n'entraîne pas obligatoirement une " +
         "réduction de la lumière duodénale ». Caryotype systématique, trisomie 21." },

  { k:"atresieJejunoIleale", fv:"FOETO:PF.DIG-MAL-067",
    l:"Atrésie jéjuno-iléale — événement VASCULAIRE tardif, marqueur d'hypoperfusion",
    cle:"deuxCulsDeSac", min:3,
    signes:["deuxCulsDeSac","amontDilate","avalCollabe","disparite","contenuAval",
            "necroseCoagulation","necroseCulDeSac"],
    stop:"Ne pas conclure « défaut de recanalisation » : ce mécanisme ne vaut QUE pour le " +
         "duodénum. La preuve du mécanisme est dans la lumière d'aval — « the bowel lumen " +
         "distal to the site of atresia often contains squames, lanugo hair or bile » : " +
         "l'atrésie est survenue APRÈS que la lumière était perméable. Une nécrose du " +
         "cul-de-sac proximal ne doit pas être lue comme une entérocolite. Les types I à IV " +
         "sont une typologie, pas une échelle, et leurs fréquences divergent entre les deux " +
         "sources sans être arbitrées." },

  { k:"atresieOesophage", fv:"FOETO:PF.DIG-MAL-068",
    l:"Atrésie de l'œsophage — anomalie de séparation trachéo-œsophagienne",
    cle:"culDeSacOeso", min:2,
    signes:["culDeSacOeso","fistuleOesoTracheale","remnantsTracheoBronchiques","disparite"],
    stop:"Ne pas conclure à l'isolement : la forme isolée ne vaut que la moitié des " +
         "nouveau-nés, et les associations sont plus fréquentes en fœtopathologie. Chercher " +
         "le VACTERL, faire un caryotype. Les remnants trachéo-bronchiques de la paroi " +
         "œsophagienne sont un signe positif d'anomalie de séparation : ne pas les confondre " +
         "avec du cartilage adjacent entraîné par la coupe. Le passage de sonde " +
         "œsophagienne est un geste d'autopsie obligatoire : sans lui, le faisceau ne se " +
         "constitue pas." },

  /* v2 : un seul signe porte l'absence dans les DEUX plexus (PF.DIG-MAL-002) ; le
     seuil passe de 2 (sous-muqueux + myentérique en v1) à 1, ce qui garde la même
     règle. Perte de la calrétinine, AChE et zone de transition s'y ajoutent. */
  { k:"hirschsprungNonConcluable", fv:"FOETO:PF.DIG-MAL-069",
    l:"Absence de cellules ganglionnaires — sur un fœtus, ce faisceau ne conclut PAS",
    cle:"ganglionsAbsents", min:1,
    signes:["ganglionsAbsents","nerfsHypertrophiques","filetsEpais","zoneTransition",
            "perteCalretinine","acheAugmentee"],
    stop:"Ce faisceau est affiché pour être REFUSÉ. Consigne de la fiche, mot pour mot : " +
         "« sur un fœtus, ne rien conclure du tout ». Quatre raisons cumulées : la " +
         "maturation neuroblaste vers cellule ganglionnaire n'est pas achevée à la " +
         "naissance — « Immature ganglion cells may persist up to the end of the first year " +
         "of life » — et chez un fœtus tout le rectum est dans cet état ; le gradient " +
         "rostro-caudal fait du rectum le segment le plus immature ; le segment distal est " +
         "NORMALEMENT pauvre en ganglions, sur une longueur que les deux sources ne " +
         "s'accordent pas à définir ; et le rectum n'est pas prélevé dans le service. Le " +
         "signe positif de secours manque aussi : l'hyperplasie des filets cholinergiques " +
         "est à peine ébauchée chez le fœtus. Le service l'a vérifié — « La maladie de " +
         "Hirschsprung est exceptionnellement retrouvée en période fœtale. » Conclure au " +
         "plus : innervation non évaluable sur ce prélèvement." },

  { k:"fauxHirschsprung",
    l:"Les trois faux positifs documentés de l'aganglionose",
    cle:"ganglionsImmatures", min:2,
    signes:["ganglionsImmatures","ganglionsSereuse","hypoganglionnaireSigne",
            "ganglionsAbsents","coupeTangentielle"],
    stop:"Faisceau de RÉFUTATION, à lire AVANT le précédent. Les trois faux positifs sont " +
         "écrits : le segment hypoganglionnaire physiologique distal, les cellules " +
         "ganglionnaires immatures non reconnues, et des cellules ganglionnaires de la " +
         "séreuse prises pour de la sous-muqueuse. S'y ajoute la coupe tangentielle. Il faut " +
         "jusqu'à cent coupes sériées pour affirmer une absence, et les cellules doivent " +
         "être résolues à l'objectif ×10 sur deux coupes adjacentes au moins." },

  { k:"ileusMeconial", fv:"FOETO:PF.DIG-MAL-070",
    l:"Iléus méconial — une obstruction, pas un diagnostic de mucoviscidose",
    cle:"meconiumImpacte", min:3,
    signes:["meconiumImpacte","concretions","microcolon","cryptesDilatees",
            "brunnerDilatees","villositesAplaties","perforation","pancreasCanauxMucus"],
    stop:"Ne pas conclure mucoviscidose sur l'iléus seul : elle n'est prouvée que quinze " +
         "fois sur trente-huit iléus. Ne pas conclure mucoviscidose sur le PANCRÉAS non " +
         "plus : jusqu'à mi-gestation il n'existe aucune différence chez les fœtus atteints, " +
         "un pancréas fœtal normal n'exclut rien. Le contenu mastic est rare en fœtal, la " +
         "présentation fœtale est plus fruste qu'en néonatal. Congeler du tissu pour CFTR si " +
         "l'étude n'a pas été faite sur liquide amniotique. La seule mesure digestive " +
         "prescrite de toute la fiche est ici : niveau d'arrêt du méconium par rapport à la " +
         "valvule de Bauhin, et diamètre le plus large." },

  { k:"peritoniteMeconiale", fv:"FOETO:PF.DIG-INF-005",
    l:"Péritonite méconiale — la perforation n'a pas besoin d'être retrouvée",
    cle:"calcificationsPeritoneales", min:2,
    signes:["calcificationsPeritoneales","macrophagesBiliaires","squamesPeritoine",
            "gigantoCellulaire","adherences","perforation"],
    stop:"Ne pas exiger de trouver le trou : dans la forme fibro-adhésive la perforation " +
         "« has usually been sealed off and may not be detectable at operation or " +
         "post-mortem examination ». Ne pas conclure sur des calcifications péritonéales " +
         "isolées, sans réaction cellulaire. Ne pas conclure mucoviscidose : elle n'est " +
         "trouvée que chez dix pour cent des péritonites méconiales. DIVERGENCE FRONTALE " +
         "NON ARBITRÉE sur la réaction giganto-cellulaire — keeling : « typically " +
         "associated with a peritoneal foreign body-type giant cell reaction » ; soffoet : " +
         "« Il est exceptionnel de retrouver une réaction giganto-cellulaire au contact. » " +
         "Son absence n'infirme rien, sa présence ne confirme rien de plus que le méconium " +
         "extravasé. Borne temporelle — « Peristalsis, which is necessary to extrude the " +
         "meconium, rarely occurs before 20 weeks gestation » — mais l'échelle gestation " +
         "n'est pas résolue dans la source." },

  { k:"duplication", fv:"FOETO:PF.DIG-MAL-023",
    l:"Duplication digestive — se prouve par la PAROI, pas par le siège",
    cle:"kysteParoiIntestinale", min:2,
    signes:["kysteParoiIntestinale","bordMesenterique","heterotopieGastrique","heterotopiePancreatique"],
    stop:"Ne pas conclure à un mécanisme : « none consistently explain EDCs at all " +
         "locations ». Piège de siège : une duplication peut évoquer un kyste d'origine " +
         "ovarienne, et certaines sont très à distance du tube, vascularisées par le " +
         "rétropéritoine — l'absence de contiguïté n'élimine rien. Chercher l'hétérotopie " +
         "gastrique, qui porte le risque ulcéreux. Les fréquences par site divergent entre " +
         "les deux sources et leurs catégories ne sont pas superposables : ne pas les citer." },

  /* v2 : centre germinatif et plasmocyte mature sont un seul terme FOETO (l'un OU l'autre) et
     un seul signe — le pivot accepte désormais l'un ou l'autre, comme le dit le stop. */
  { k:"stimulationAntigenique", fv:"FOETO:PF.DIG-INF-006",
    l:"GALT en avance — le seul critère diagnostique porté par la chronologie du § 3",
    cle:"cgPlasmocyte", min:1,
    signes:["cgPlasmocyte","folliculesSousMuqueux","infiltratParoi"],
    stop:"Seuil à UN : un centre germinatif ou un plasmocyte mature est anormal SANS " +
         "condition d'âge — « found in normal fetuses or in neonates prior to 2 weeks of " +
         "age » ne s'applique ni à l'un ni à l'autre. Ce versant est solide. Le versant " +
         "faible est celui des follicules sous-muqueux : il repose sur un « 20 weeks » écrit " +
         "avec deux échelles non résolues (§ 9-6) et ne doit pas être utilisé seul. Le " +
         "faisceau dit une stimulation antigénique in utero ; il ne nomme pas l'agent." },

  { k:"obstacleAval",
    l:"Hypertrophie de la longitudinale externe — argument d'obstacle sur le trajet",
    cle:"longitudinaleEpaisse", min:2,
    signes:["longitudinaleEpaisse","amontDilate","disparite","avalCollabe","microcolon"],
    stop:"La longitudinale externe est normalement la couche MINCE : son épaississement est " +
         "un argument d'obstacle d'aval, pas une variante. Vérifier d'abord que la coupe " +
         "n'est pas tangentielle. La fiche ne donne aucun seuil chiffré d'épaisseur : ne pas " +
         "en inventer un, décrire le rapport des deux couches." },

  { k:"segmentInconnu",
    l:"Fragment non rattachable à un segment — tout ce qui suit est non interprétable",
    cle:"segmentNonIdentifiable", min:1,
    signes:["segmentNonIdentifiable","coupeTangentielle","muqueuseDesquamee",
            "contenuDiffus"],
    stop:"Faisceau de blocage. Sans segment nommé, aucune norme du § 3 ne s'applique : la " +
         "date attendue de la muscularis mucosae, la densité lymphoïde attendue, le calibre " +
         "et la longueur n'ont plus de référent. Reprendre les discriminants histologiques " +
         "avant de décrire quoi que ce soit ; si le rattachement reste impossible, l'écrire " +
         "dans le compte rendu plutôt que de décrire un « intestin » sans adresse." }

];

/* ── 08 · Négatifs à énoncer — déduits, jamais cochés ─────────────────────────
   Le corpus écrit onze fois un négatif GLOBAL — « Le tube digestif semble
   normal. » — qui ne nomme ni un segment, ni une couche, ni une structure. Un
   tel énoncé n'est pas faux, il est INEXPLOITABLE : il ne permet à personne de
   savoir ce qui a été regardé. Chaque ligne ci-dessous est le négatif d'un
   critère positif écrit ailleurs dans la fiche : l'énoncer transforme le
   « normal » global en donnée.
   v2 : six négatifs se déduisent d'un signe répondu absent, six d'un contrôle
   (plusieurs signes, le segment, la muscularis mucosae, les gestes de sonde).
   Le contre-exemple du corpus que la v1 affichait en défaut est gardé dans p. */
var NEGATIFS = [

  { k:"segmentNomme",
    l:"Le segment étudié est nommé (et le compartiment lu est nommé aussi)",
    p:"Sans segment, aucune norme du § 3 n'a de référent : ni la date de la muscularis " +
      "mucosae, ni la densité lymphoïde attendue, ni le calibre. Le compartiment compte " +
      "autant : « épithélium » et « entérocytes » désignent une horloge PRÉCOCE, « paroi », " +
      "« musculeuse » et « ganglions » une horloge TARDIVE. Le corpus nomme le compartiment " +
      "six fois sur dix-neuf ; c'est cette imprécision lexicale qui rend ses délais " +
      "contradictoires entre eux. Contre-exemple du corpus : « Le tube digestif semble normal. » " +
      "— sans segment ni compartiment, la phrase ne vaut pour aucun des deux.",
    ko:"segment NON nommé ou non identifiable — aucune norme du § 3 ne s'applique à cette lecture",
    auto:function(){
      if (E.signes.segmentNonIdentifiable === POS || E.mesure.def === "nonNomme") return false;
      return E.mesure.def ? true : null; } },

  { k:"ganglionsPresents", signe:"ganglionsAbsents",
    l:"Cellules ganglionnaires PRÉSENTES dans les plexus myentérique ET sous-muqueux, segment nommé",
    p:"C'est le négatif de Hirschsprung, et il n'est JAMAIS écrit dans le corpus. Il ne " +
      "coûte rien : les deux plexus sont sur la même coupe HES. Il doit porter le nom du " +
      "segment, parce que la maturation suit le gradient rostro-caudal et qu'un rectum " +
      "pauvre en ganglions est normal. Contre-exemple du corpus : « Le tube digestif est de " +
      "morphologie normale. » — ne dit pas si les plexus ont été cherchés.",
    ko:"cellules ganglionnaires ABSENTES des plexus — sur un fœtus, ne rien conclure : innervation " +
       "non évaluable sur ce prélèvement" },

  { k:"pasDeNerfHypertrophique", signe:"nerfsHypertrophiques",
    l:"Absence de nerf sous-muqueux hypertrophique de plus de 40 µm",
    p:"L'autre versant du même diagnostic, et le seul critère morphologique sur lequel les " +
      "deux sources convergent en période fœtale. Un seuil chiffré existe : il se dit. " +
      "Silence complet du corpus sur ce point.",
    ko:"nerfs sous-muqueux hypertrophiques PRÉSENTS — plus de 40 µm, au moins deux" },

  { k:"pasDeCentreGerminatif", signe:"cgPlasmocyte",
    l:"Absence de centre germinatif et de plasmocyte mature",
    p:"Leur présence est anormale à TOUT âge fœtal, sans condition — c'est le seul critère " +
      "diagnostique porté par la chronologie du § 3. Le négatif a donc la même valeur que " +
      "le positif. Contre-exemple du corpus : « Sur tube digestif et foie, marquage normal » — " +
      "un panel lymphoïde normal ne dit rien de la MATURITÉ des structures lymphoïdes en HES.",
    ko:"centre germinatif ou plasmocyte mature PRÉSENT — anormal à tout âge fœtal : stimulation " +
       "antigénique in utero, agent non nommé" },

  { k:"pasDeFolliculeSousMuqueux", signe:"folliculesSousMuqueux",
    l:"Absence de follicule primaire sous-muqueux avant 20 SA",
    p:"Seuil d'anomalie du GALT — mais sous réserve : le « 20 weeks » de la source est " +
      "écrit avec une échelle non résolue (§ 9-6). Énoncer le négatif AVEC sa réserve, " +
      "jamais sans. Silence complet du corpus.",
    ko:"follicules primaires sous-muqueux facilement identifiables avant 20 SA PRÉSENTS — sous " +
       "la réserve d'échelle du seuil des 20 semaines (§ 9-6), ne pas l'utiliser seul" },

  { k:"pasDeDisparite",
    l:"Absence de disparité de calibre sur tout le trajet, ni calcification ni adhérence",
    p:"Négatif d'atrésie et de sténose, MACROSCOPIQUE et gratuit : « L'inspection de " +
      "l'intestin sur tout son trajet permet de rechercher une disparité de calibre » " +
      "pouvant évoquer une sténose ou une atrésie. Il couvre en même temps la péritonite " +
      "méconiale. Contre-exemple du corpus : « Le tube digestif est d'aspect attendu. » — " +
      "aspect de quoi, vu comment, sur quelle longueur ?",
    ko:"disparité de calibre, calcification ou adhérence PRÉSENTE sur le trajet",
    auto:function(){
      var s = ["disparite", "calcificationsPeritoneales", "adherences"].map(function(k){ return E.signes[k]; });
      return s.indexOf(POS) >= 0 ? false : s.every(function(v){ return v === NEG; }) ? true : null; } },

  { k:"sondeAnalePassee",
    l:"Perméabilité anale vérifiée à la sonde",
    p:"Négatif d'imperforation, geste explicitement prescrit : « une petite sonde permet de " +
      "vérifier la perméabilité ». Un geste prescrit et non tracé équivaut à un geste non " +
      "fait. Aucun CR du corpus ne trace ce geste.",
    ko:"perméabilité anale NON vérifiée à la sonde",
    auto:function(){ return E.prelev.sondeAnale ? true : null; } },

  { k:"sondeOesoPassee",
    l:"Perméabilité œsophagienne vérifiée à la sonde",
    p:"Négatif d'atrésie de l'œsophage : « Une sonde doit être passée dans la lumière de " +
      "l'œsophage ». Sans lui, une atrésie de type C peut être manquée sur un fœtus dont " +
      "l'œsophage n'a pas été ouvert. Aucun CR du corpus ne trace ce geste.",
    ko:"œsophage NON perméable — cul-de-sac œsophagien supérieur",
    auto:function(){
      if (E.signes.culDeSacOeso === POS || E.signes.fistuleOesoTracheale === POS) return false;
      return E.prelev.sondeOesophage ? true : null; } },

  { k:"pasDePeritoniteMeconiale",
    l:"Absence de calcification péritonéale et d'adhérence",
    p:"Négatif de péritonite méconiale. Il se lit à l'œil nu au moment de l'éviscération, " +
      "et il est perdu définitivement si on ne le regarde pas à ce moment-là. Silence du corpus.",
    ko:"calcification péritonéale ou adhérence PRÉSENTE — chercher squames, lanugo, macrophages biliaires",
    auto:function(){
      var a = E.signes.calcificationsPeritoneales, b = E.signes.adherences;
      return a === POS || b === POS ? false : a === NEG && b === NEG ? true : null; } },

  { k:"pasDePnGastriques", signe:"pnGastriques",
    l:"Absence de polynucléaires déglutis dans le contenu gastrique",
    p:"Le prélèvement dédié existe pour ça. Son négatif est une donnée d'infection " +
      "ovulaire, au même titre que son positif : ne pas le jeter parce qu'il est négatif. " +
      "Le prélèvement de contenu gastrique n'apparaît dans aucun CR.",
    ko:"polynucléaires déglutis PRÉSENTS dans le contenu gastrique — donnée d'infection ovulaire" },

  { k:"pasDeNecroseParoi", signe:"necroseCoagulation",
    l:"Absence de nécrose de la paroi, distincte de la lyse post-mortem",
    p:"C'est le seul moyen de rendre interprétable le mot « nécrose » sur cet organe. " +
      "Écrire le négatif en le distinguant explicitement de l'autolyse revient à déclarer " +
      "qu'on a fait la différence — et à s'obliger à la faire. Contre-exemple du corpus : " +
      "« Le foie et le tube digestif sont d'histologie normale, absence de signe de " +
      "macération. » — le seul CR qui approche le bon énoncé, mais il ne sépare pas " +
      "nécrose et lyse.",
    ko:"nécrose de la paroi PRÉSENTE — la distinguer de la lyse post-mortem avant de la nommer" },

  { k:"mmParSegment",
    l:"Muscularis mucosae présente ou absente, PAR SEGMENT",
    p:"La seule horloge de maturation lisible même sur tissu macéré, et une phrase de " +
      "compte rendu de dix mots. Sa date attendue dépend du segment : sans le segment, " +
      "l'énoncé ne se lit pas. Aucun CR du corpus ne mentionne la muscularis mucosae.",
    ko:"muscularis mucosae NON évaluable — la dernière horloge d'un tube macéré manque",
    auto:function(){
      var m = E.mesure.opt, s = E.mesure.def;
      if (m === "nonEval") return false;
      return m && s && s !== "nonNomme" ? true : null; } }

];

/* ── 09 · Techniques ──────────────────────────────────────────────────────────
   Ce que le corpus PROUVE : le panel lymphoïde complet est déjà pratiqué sur le
   tube digestif dans ce service. Aucune IHC neurale — calrétinine, PHOX2B,
   CD117 — et aucune histochimie AChE n'apparaît dans un seul CR. Deux d'entre
   elles ont une contrainte de prélèvement qui doit être connue AVANT
   l'autopsie, pas au moment où on les prescrit.                                 */
var TECHNIQUES = [
  { k:"hesSeriees",  l:"HES, coupes sériées — jusqu'à cent",
    q:"y a-t-il des cellules ganglionnaires ? Résolues à l'objectif ×10, sur au moins deux coupes adjacentes ; normal = présentes dans le plexus sous-muqueux ET myentérique" },
  { k:"phox2b",      l:"IHC PHOX2B",
    q:"les cellules ganglionnaires sont-elles présentes mais immatures ? « IHC for PHOX2B has recently been shown to identify both mature and immature ganglion cells » — lève le premier faux positif ; absente de tout CR du corpus" },
  { k:"calretinine", l:"IHC calrétinine",
    q:"l'innervation intrinsèque de la lamina propria est-elle conservée ? Normal = filets calrétinine-positifs dans la lamina propria ; leur perte signe le Hirschsprung ; absente de tout CR du corpus" },
  { k:"ache",        l:"Histochimie AChE — sur tissu FRAIS CONGELÉ uniquement",
    q:"y a-t-il une hyperinnervation cholinergique extrinsèque ? Impraticable sur tissu fixé : « requires fresh rectal mucosa and is performed on frozen section tissue » — se décide avant l'autopsie ou jamais ; faux négatifs dans l'aganglionose colique totale" },
  { k:"cd117",       l:"IHC CD117",
    q:"les cellules interstitielles de Cajal sont-elles présentes ? « CD117 is a useful immunohistochemical marker for identification of interstitial cells of Cajal » — positives dès le premier trimestre, autour d'Auerbach puis des plexus sous-muqueux" },
  { k:"actineLisse", l:"IHC actine musculaire lisse",
    q:"les cellules myoépithéliales salivaires sont-elles différenciées ? Normal = couche basale des structures tubulaires distales positive, AVANT toute lisibilité en HES" },
  { k:"vonKossa",    l:"Von Kossa",
    q:"ce dépôt péritonéal est-il calcifié ? Normal = négatif" },
  { k:"perls",       l:"Coloration de Perls",
    q:"y a-t-il eu hémorragie ou dépôt ferrique dans un iléus ? Normal = négatif" },
  { k:"cftr",        l:"Congélation de tissu fœtal pour mutations CFTR",
    q:"est-ce une mucoviscidose, si l'étude n'a pas été faite sur liquide amniotique ? Contrainte de prélèvement : la congélation se décide à l'autopsie, elle ne se rattrape pas sur bloc" },
  { k:"cd45",        l:"IHC CD45 (clone 2B11+PD7/26, Bio SB, 1/150)",
    q:"y a-t-il un infiltrat lymphoïde anormal dans la paroi ? Normal dans le corpus : « tube digestif, poumons normaux »" },
  { k:"panelLymphoide", l:"CD3 · CD4 · CD8 · CD20 · CD163",
    q:"quelle est la composition d'un infiltrat pariétal ? Panel déjà pratiqué sur le tube digestif dans ce service — CD3 polyclonal Dako 1/200, CD4 UMAB64 SDIX 1/100, CD8 C8/144B BioSB 1/100, CD20 L26 Agilent 1/400, CD163 10D6 Thermo 1/25" },
  { k:"cmvSalivaire", l:"HES sur glandes salivaires — inclusions intranucléaires",
    q:"y a-t-il une infection à CMV ? Le prélèvement existe pour ça : « to evaluate the presence of developmental anomalies or cytomegalovirus infection » ; normal = absence" },
  { k:"caryotype",   l:"Caryotype ou CGH",
    q:"quelle étiologie derrière une atrésie ? Trisomie 21 pour le duodénum ; T21, 13, 18, del22q11, del17q21q23 pour l'œsophage" },
  { k:"smoothelin",  l:"IHC smoothelin",
    q:"cette couche musculaire est-elle la musculeuse propre ou la muscularis mucosae ? « strong and diffuse expression of smoothelin in both layers of the muscularis propria », la muscularis mucosae restant faible ou irrégulière — « especially in suboptimally sampled and/or poorly oriented specimens », c'est-à-dire exactement la situation du service" },
  { k:"pcrInfectieux", l:"Bactériologie et virologie PCR",
    q:"étiologie d'un iléus ou d'une péritonite méconiale ? CMV et parvovirus B19 à évoquer en l'absence d'obstruction" }
];

/* ── Suggestions de techniques ────────────────────────────────────────────────
   Deux techniques ont une contrainte de PRÉLÈVEMENT : l'AChE veut de la muqueuse
   rectale fraîche congelée, le CFTR veut du tissu congelé. Elles se proposent
   donc AVANT que la question ne se pose, pas après.                             */
function suggerer(){
  var s = {};
  function anormal(k){ return E.signes[k] === POS; }
  var seg = E.mesure.def;

  if (anormal("ganglionsAbsents") || anormal("zoneTransition") ||
      anormal("ganglionsImmatures") || anormal("ganglionsSereuse") ||
      anormal("nerfsHypertrophiques") || anormal("filetsEpais")){
    s.hesSeriees = 1; s.phox2b = 1; s.calretinine = 1;
  }
  if (anormal("coupeTangentielle")) s.hesSeriees = 1;
  if (anormal("infiltratParoi") || anormal("abcesCryptiques")){ s.cd45 = 1; s.panelLymphoide = 1; }
  if (anormal("cgPlasmocyte") || anormal("folliculesSousMuqueux")){
    s.panelLymphoide = 1; s.cmvSalivaire = 1; s.pcrInfectieux = 1;
  }
  if (anormal("calcificationsPeritoneales") || anormal("squamesPeritoine") ||
      anormal("macrophagesBiliaires") || anormal("gigantoCellulaire")){
    s.vonKossa = 1; s.pcrInfectieux = 1;
  }
  if (anormal("hemorragieParoi") || anormal("meconiumImpacte") || anormal("concretions")) s.perls = 1;
  if (anormal("meconiumImpacte") || anormal("concretions") || anormal("microcolon") ||
      anormal("brunnerDilatees") || anormal("cryptesDilatees") || anormal("pancreasCanauxMucus")){
    s.cftr = 1; s.caryotype = 1;
  }
  if (anormal("diaphragmeMuqueux") || anormal("pancreasAnnulaire") ||
      anormal("culDeSacOeso") || anormal("fistuleOesoTracheale") || anormal("deuxCulsDeSac"))
    s.caryotype = 1;
  if (anormal("necroseCoagulation") || anormal("necroseTransmurale") || anormal("pneumatose"))
    s.pcrInfectieux = 1;
  if (E.mesure.opt === "nonEval" || anormal("coupeTangentielle")) s.smoothelin = 1;

  /* Le CD117 date les cellules de Cajal, il ne cherche pas une lésion : il sert
     quand on doute de la maturité de la paroi, pas quand on la sait malade. */
  if (E.mesure.opt === "absente" || E.variantes.ganglionsImmaturesVar) s.cd117 = 1;

  /* Les deux techniques à contrainte de prélèvement : proposées tant que le
     matériel n'est pas déclaré pris. Après fixation, plus rien à décider. */
  if ((seg === "rectum" || anormal("ganglionsAbsents")) && !E.prelev.niveauRectal) s.ache = 1;
  /* v1 : lisait le négatif gastrique coché en défaut ; v2 : le signe présent. */
  if (anormal("pnGastriques")) s.pcrInfectieux = 1;
  return s;
}

/* ── Banc propre à l'organe ───────────────────────────────────────────────────
   Le banc commun a déjà tourné et laisse des signes posés : chaque bloc repart
   d'un état voulu.                                                             */
async function testsOrgane(chk, clic, set, crTient, pause){
  function pose(k, v){ if (E.signes[k] !== v) clic("les", k, v); }
  function ote(k){ if (E.signes[k]) clic("les", k, E.signes[k]); }
  function propre(){ SIGNES.forEach(function(x){ if (!x.auto) ote(x.k); }); }
  function tenue(k){ return associations().some(function(a){ return a.d.k === k && a.tenu; }); }
  function lue(k){ return associations().some(function(a){ return a.d.k === k; }); }
  function segment(k){ if (E.mesure.def !== k) clic("mdef", k); }
  function mm(k){ if (E.mesure.opt !== k) clic("mopt", k); }
  function texte(x){ return JSON.stringify(x).toLowerCase(); }
  function neg(k){ return etatNegatif(par(NEGATIFS, k)); }
  function retPose(k){ var sel = $("retNiveau"); sel.value = k; sel.dispatchEvent(new Event("change", {bubbles:true})); }

  /* ── L'axe de l'organe : il ne latéralise pas, il segmente ─────────────── */
  chk("aucune latéralité sur cet organe", PAIR === false);
  propre();
  segment("nonNomme"); mm("nonEval");
  chk("segment non nommé : tout est ininterprétable",
      crTient("ININTERPRÉTABLE") && crTient("rostral to caudal"));
  chk("le champ manquant n° 1 est nommé", crTient("champ manquant n° 1 du service"));
  chk("des discriminants sont proposés avant de renoncer",
      crTient("lacks villi") && crTient("peg cells on the surface"));
  chk("v2 : segment non identifiable → négatif du segment en défaut",
      neg("segmentNomme") === "ko" && neg("mmParSegment") === "ko");

  /* ── La muscularis mucosae ne se lit qu'AVEC son segment ───────────────── */
  segment("ileon"); mm("absente"); set("sa", "24");
  chk("iléon reconnu", crTient("Segment : iléon."));
  chk("date attendue portée pour l'iléon", crTient("Date attendue pour ce segment : 32 SA"));
  chk("absence attendue à 24 SA n'est pas une hypoplasie",
      crTient("Absence ATTENDUE à 24 SA") && crTient("ce n'est pas une hypoplasie pariétale"));
  chk("v2 : muscularis mucosae consignée avec son segment → négatifs énoncés",
      neg("mmParSegment") === "ok" && neg("segmentNomme") === "ok");
  set("sa", "36");
  chk("absence tardive interroge d'abord le SEGMENT, pas le tissu",
      crTient("soit le segment déclaré n'est pas le bon"));
  segment("oesophage");
  chk("l'œsophage a une date bien plus précoce", crTient("Date attendue pour ce segment : 13 SA"));
  segment("jog");
  chk("aucune date sourcée pour la jonction œsogastrique",
      crTient("aucune date d'apparition de la muscularis mucosae n'est sourcée"));
  chk("la progression bidirectionnelle est portée, sans borne inventée",
      crTient("It spreads from the duodenum caudally"));
  chk("les segments sans date sont vraiment sans date",
      ["jog","jejunum","appendice","colon","rectum"].every(function(k){ return mmAttendue(k) == null; }));
  chk("les segments datés le sont tous par une citation",
      SEGMENTS.every(function(g){ return mmAttendue(g.k) == null || !!mmSource(g.k); }));
  chk("v2 : le discriminant du segment au survol",
      /thickest of all the segments/.test(document.querySelector('#mesDefs [data-k="oesophage"]').title) &&
      /lacks villi/.test(document.querySelector('#mesDefs [data-k="appendice"]').title));

  /* ── Le duodénum avant 16 SA, et le côlon avant 18 SA ──────────────────── */
  segment("duodenum"); mm("presente"); set("sa", "14");
  chk("avant 16 SA le duodénum ne se sépare pas du grêle",
      crTient("cannot be differentiated histologically from the duodenum"));
  segment("colon"); set("sa", "16");
  chk("avant 18 SA le côlon est villositaire comme le grêle",
      crTient("difficult, especially prior to 16 weeks"));
  set("sa", "26");
  chk("après 18 SA la réserve tombe", !crTient("difficult, especially prior to 16 weeks"));

  /* ── Le rectum : déclaré comme segment mais jamais prélevé ─────────────── */
  segment("rectum");
  chk("rectum déclaré sans être coché au prélèvement",
      crTient("il est prélevé dans zéro CR du corpus"));
  chk("le rectum est une réserve GRAVE au Prélèvement", par(PRELEV, "rectum").grave === true);
  chk("le segment nommé est lui aussi une réserve grave", par(PRELEV, "segmentNomme").grave === true);

  /* ── Aucune norme histologique : le trou est dit, pas comblé ───────────── */
  segment("ileon"); mm("presente"); set("sa", "34");
  set("m_calibre", "12");
  chk("l'inversion grêle/côlon est portée avec le calibre",
      crTient("plus large (4 mm) que le côlon jusqu'à mi-gestation"));
  chk("au-delà de 6 mm on cherche un obstacle avant de conclure",
      crTient("chercher une disparité de calibre sur tout le trajet"));
  set("m_longueur", "180");
  chk("les longueurs sont des points, pas des intervalles",
      crTient("des POINTS, pas un intervalle"));
  chk("le trajet non inspecté est une réserve",
      crTient("mesure saisie sans que l'inspection du trajet soit cochée"));
  chk("aucune mesure histologique n'existe sur cet organe",
      crTient("zéro rapport crypte/villosité") && crTient("AUCUNE source ne fournit de normale " +
      "digestive chiffrée par SA"));
  set("m_calibre", ""); set("m_longueur", "");
  chk("aucun champ n'est histologique",
      MESURE.champs.every(function(c){ return /mm|cm/.test(c.label); }));

  /* ── Rétention : le seul bon prédicteur n'est pas histologique ─────────── */
  chk("un seul prédicteur bon, et c'est l'histoire clinique",
      RETENTION.filter(function(r){ return r.q === "bon"; }).length === 1 &&
      RETENTION.filter(function(r){ return r.q === "bon"; })[0].k === "histoireClinique");
  chk("le corpus se contredit frontalement sur le même énoncé",
      par(RETENTION, "cr75").note.indexOf("contredit") >= 0 ||
      par(RETENTION, "cr75").note.indexOf("CONTRADICTION") >= 0);
  chk("les formules datées du corpus sont toutes de mauvais prédicteurs",
      ["cr4_8","cr8_24","cr75","cr72_1s","cr96_1s","cr1_2s","cr2s","cr1_4s","cr4s"]
        .every(function(k){ return par(RETENTION, k).q === "mauvais"; }));
  chk("les profils de compartiment ORDONNENT sans dater",
      ["epithProfil","paroiProfil","deuxProfils"].every(function(k){
        return par(RETENTION, k).q === "moyen"; }));
  /* En présence, une seule ligne de la liste déroulante : l'histoire clinique y est la
     plus haute, elle domine donc toute borne histologique par construction. */
  retPose("epithProfil");
  chk("un profil de compartiment ordonne, sans heure",
      crTient("Rétention " + par(RETENTION, "epithProfil").b));
  retPose("histoireClinique");
  chk("l'histoire clinique domine toute borne histologique",
      crTient("Rétention " + par(RETENTION, "histoireClinique").b) &&
      retDatables()[retDatables().length - 1].k === "histoireClinique");
  retPose("");
  clic("ret", "cr75", "present");
  chk("seuls des mauvais prédicteurs : aucune borne recevable",
      crTient("Seuls des prédicteurs MAUVAIS sont positifs"));
  clic("ret", "cr75", "present");
  chk("la ligne « Epithelium » n'est attribuée à aucun organe",
      par(RETENTION, "epithProfil").note.indexOf("n'est rattachable à aucun organe") >= 0 &&
      par(RETENTION, "epithProfil").note.indexOf("n'est PAS attribuée ici") >= 0);

  /* ── Le GALT : la seule chronologie du § 3 qui porte un critère ────────── */
  chk("cinq rangs de GALT", STADES.length === 5);
  chk("le dernier rang est ouvert", STADES[STADES.length-1].max === 99);
  chk("les bornes du GALT sont bien celles de la fiche",
      STADES.map(function(s){ return s.max; }).join(",") === "16,18,21,26,99");
  set("sa", "15");
  chk("avant 16 SA, pas de GALT en routine", stadeAttendu(15).k === "epars");
  set("sa", "25");
  chk("à 25 SA on attend des follicules organisés", stadeAttendu(25).k === "folliculesPrimaires");
  set("sa", "34");
  chk("à 34 SA on attend des plaques de Peyer", stadeAttendu(34).k === "peyer");
  chk("l'incohérence interne du seuil des 20 semaines est portée",
      par(STADES, "folliculesPrimaires").note.indexOf("§ 9-6") >= 0);
  chk("aucun rang du GALT n'est présenté comme une gradation de sévérité",
      STADES.every(function(s){ return !/grade|stade [0-9]/i.test(s.l); }));

  /* ── L'avance de GALT est le critère, et il n'a PAS de condition d'âge ─── */
  propre();
  pose("cgPlasmocyte", POS);
  chk("un centre germinatif ou un plasmocyte mature seul suffit", tenue("stimulationAntigenique"));
  chk("le seuil de ce faisceau est à un", par(DIAGS, "stimulationAntigenique").min === 1);
  chk("le versant fragile est signalé comme fragile",
      par(DIAGS, "stimulationAntigenique").stop.indexOf("versant faible") >= 0);
  chk("le faisceau ne nomme pas l'agent",
      par(DIAGS, "stimulationAntigenique").stop.indexOf("ne nomme pas l'agent") >= 0);
  chk("l'infection est cherchée ailleurs que dans le tube",
      suggerer().cmvSalivaire === 1 && suggerer().pcrInfectieux === 1);
  chk("v2 : centre germinatif présent → négatif en défaut", neg("pasDeCentreGerminatif") === "ko");
  propre();
  pose("folliculesSousMuqueux", POS);
  chk("le versant fragile seul ne tient pas le faisceau", !tenue("stimulationAntigenique") &&
      lue("stimulationAntigenique"));
  ote("folliculesSousMuqueux");
  clic("grp", groupes().indexOf("Tissu lymphoïde (GALT)"), "non");
  /* lot FOETO : les follicules sous-muqueux dépendent du terme (seul) — le « Non » ne les répond pas */
  chk("lot : « Non » au GALT laisse les follicules non regardés", !E.signes.folliculesSousMuqueux);
  clic("les", "folliculesSousMuqueux", NEG);
  chk("v2 : « Non » au GALT + follicules répondus énoncent les deux négatifs",
      neg("pasDeCentreGerminatif") === "ok" && neg("pasDeFolliculeSousMuqueux") === "ok");
  clic("les", "folliculesSousMuqueux", NEG);
  clic("grp", groupes().indexOf("Tissu lymphoïde (GALT)"), "non");

  /* ── Contenu luminal : le tube lit le liquide amniotique ───────────────── */
  propre();
  pose("pnAlteres", POS); pose("contenuDiffus", POS);
  chk("la déglutition se lit", tenue("deglutitionInflammatoire"));
  chk("le contenu n'est pas une lésion pariétale",
      par(DIAGS, "deglutitionInflammatoire").stop.indexOf("pas une lésion pariétale") >= 0);
  chk("l'infiltrat de PAROI est un autre signe que les PN de la lumière",
      par(SIGNES, "infiltratParoi").meta.indexOf("DANS LA LUMIÈRE") >= 0);
  pose("contenuPoumon", POS);
  chk("le même contenu au poumon retire la spécificité digestive",
      crTient("retire toute spécificité digestive"));
  chk("aucune inflammation pariétale n'est déduite du contenu", !tenue("ecunSuspecte"));

  /* « Non » en bloc : le méconium, contenu normal, n'est pas répondu absent à la place du lecteur */
  propre();
  var iL = groupes().indexOf("Contenu de la lumière");
  delete E.groupes["Contenu de la lumière"]; peindre();
  clic("grp", iL, "non");
  chk("v2 : « Non » à la lumière laisse le méconium non regardé",
      !E.signes.meconiumLumiere && !E.signes.squames && E.signes.pnAlteres === NEG &&
      etatGroupe("Contenu de la lumière") === "non");
  clic("grp", iL, "non");

  /* ── ECUN contre autolyse : le même pivot, deux lectures affichées ─────── */
  propre();
  pose("necroseCoagulation", POS); pose("muqueuseDesquamee", POS);
  chk("l'autolyse est lue d'abord", tenue("autolyseNonEcun"));
  chk("l'ECUN reste esquissée sans se tenir", lue("ecunSuspecte") && !tenue("ecunSuspecte"));
  pose("oedemeParoi", POS); pose("hemorragieParoi", POS);
  pose("infiltratParoi", POS);
  chk("avec les arguments de vivant, l'ECUN se tient", tenue("ecunSuspecte"));
  chk("le piège central est cité", crTient("difficult to differentiate from post-mortem tissue " +
      "autolysis"));
  chk("les ganglions épargnés sont le seul argument opposable",
      par(SIGNES, "ganglionsEpargnes").meta.indexOf("seul argument contre l'autolyse") >= 0);
  chk("la pneumatose ne tranche pas",
      par(DIAGS, "ecunSuspecte").stop.indexOf("La pneumatose ne tranche PAS") >= 0);
  chk("aucun stade de Bell depuis la lame",
      par(DIAGS, "ecunSuspecte").stop.indexOf("stade de Bell") >= 0);
  chk("aucun grade digestif inventé",
      SIGNES.concat(DIAGS).every(function(x){ return !/grade [0-9IV]/i.test(x.l); }));
  chk("v2 : nécrose présente → négatif de nécrose en défaut", neg("pasDeNecroseParoi") === "ko");
  propre();
  pose("laparoschisis", POS); pose("necroseTransmurale", POS);
  chk("sur laparoschisis, le mécanisme est écrit", tenue("ecunExteriorisation"));
  chk("ce n'est pas une ECUN du prématuré",
      par(DIAGS, "ecunExteriorisation").stop.indexOf("secondaire à l'extériorisation") >= 0);

  /* ── Hirschsprung : le faisceau est affiché pour être REFUSÉ ───────────── */
  propre();
  pose("ganglionsAbsents", POS);
  chk("le faisceau se constitue", tenue("hirschsprungNonConcluable"));
  chk("et il refuse explicitement de conclure",
      crTient("sur un fœtus, ne rien conclure du tout"));
  chk("les quatre raisons sont portées",
      par(DIAGS, "hirschsprungNonConcluable").stop.indexOf("Immature ganglion cells") >= 0 &&
      par(DIAGS, "hirschsprungNonConcluable").stop.indexOf("rostro-caudal") >= 0 &&
      par(DIAGS, "hirschsprungNonConcluable").stop.indexOf("n'est pas prélevé dans le service") >= 0);
  chk("le service l'a vérifié empiriquement",
      par(DIAGS, "hirschsprungNonConcluable").stop.indexOf("exceptionnellement retrouvée en " +
      "période fœtale") >= 0);
  chk("aucune conclusion positive de Hirschsprung dans la grille",
      DIAGS.every(function(d){ return !/^maladie de hirschsprung/i.test(d.l); }));
  chk("PHOX2B et calrétinine sont proposées", suggerer().phox2b === 1 && suggerer().calretinine === 1);
  chk("les coupes sériées aussi", suggerer().hesSeriees === 1);
  chk("v2 : ganglions absents → négatif de Hirschsprung en défaut", neg("ganglionsPresents") === "ko");
  pose("ganglionsImmatures", POS); pose("hypoganglionnaireSigne", POS);
  chk("la réfutation se lit en même temps", tenue("fauxHirschsprung"));
  chk("les trois faux positifs sont nommés",
      par(DIAGS, "fauxHirschsprung").stop.indexOf("hypoganglionnaire physiologique") >= 0 &&
      par(DIAGS, "fauxHirschsprung").stop.indexOf("immatures non reconnues") >= 0 &&
      par(DIAGS, "fauxHirschsprung").stop.indexOf("séreuse") >= 0);
  chk("cent coupes sériées avant d'affirmer une absence",
      par(DIAGS, "fauxHirschsprung").stop.indexOf("cent coupes sériées") >= 0);
  chk("la longueur du segment hypoganglionnaire n'est pas arbitrée",
      par(SIGNES, "hypoganglionnaireSigne").meta.indexOf("ne s'accordent pas") >= 0);
  chk("l'AChE est proposée mais avec sa contrainte",
      suggerer().ache === 1 && par(TECHNIQUES, "ache").l.indexOf("FRAIS CONGELÉ") >= 0);
  chk("v2 : les pièges de l'innervation sont hors du « Non » en bloc",
      ["ganglionsImmatures","ganglionsSereuse","hypoganglionnaireSigne"].every(function(k){
        return par(SIGNES, k).bloc === false; }) &&
      par(SIGNES, "perteCalretinine").mag === "technique" && par(SIGNES, "acheAugmentee").mag === "technique");

  /* ── Atrésies : trois mécanismes différents, pas un seul ───────────────── */
  propre();
  pose("diaphragmeMuqueux", POS); pose("amontDilate", POS);
  chk("l'atrésie duodénale se lit", tenue("atresieDuodenale"));
  chk("le duodénum est le seul site à mécanisme épithélial",
      par(DIAGS, "atresieDuodenale").stop.indexOf("Tandler") >= 0);
  pose("pancreasAnnulaire", POS);
  chk("un pancréas annulaire n'est pas la cause",
      par(SIGNES, "pancreasAnnulaire").meta.indexOf("n'entraîne pas obligatoirement") >= 0);
  chk("le caryotype est proposé", suggerer().caryotype === 1);
  propre();
  pose("deuxCulsDeSac", POS); pose("amontDilate", POS); pose("avalCollabe", POS);
  chk("l'atrésie jéjuno-iléale se lit", tenue("atresieJejunoIleale"));
  chk("ce n'est PAS un défaut de recanalisation",
      par(DIAGS, "atresieJejunoIleale").stop.indexOf("ne vaut QUE pour le duodénum") >= 0);
  chk("la preuve du mécanisme est dans la lumière d'aval",
      par(SIGNES, "contenuAval").meta.indexOf("postérieure à la perméabilité établie") >= 0);
  chk("les types I à IV sont une typologie, pas une échelle",
      par(DIAGS, "atresieJejunoIleale").stop.indexOf("typologie, pas une échelle") >= 0);
  chk("v2 : la nécrose du cul-de-sac d'amont entre dans l'atrésie, pas dans l'ECUN",
      par(DIAGS, "atresieJejunoIleale").signes.indexOf("necroseCulDeSac") >= 0 &&
      par(DIAGS, "ecunSuspecte").signes.indexOf("necroseCulDeSac") < 0);
  propre();
  pose("culDeSacOeso", POS); pose("fistuleOesoTracheale", POS);
  chk("l'atrésie de l'œsophage se lit", tenue("atresieOesophage"));
  chk("les remnants sont un signe positif, pas un artefact de coupe",
      par(SIGNES, "remnantsTracheoBronchiques").meta.indexOf("pas du cartilage") >= 0);
  chk("le passage de sonde est une réserve de prélèvement",
      !!par(PRELEV, "sondeOesophage") && !!par(PRELEV, "sondeAnale"));
  chk("v2 : atrésie de l'œsophage → perméabilité œsophagienne en défaut", neg("sondeOesoPassee") === "ko");
  /* Le pivot ne se remplace pas par le nombre : sans le cul-de-sac, pas d'atrésie */
  ote("culDeSacOeso"); pose("remnantsTracheoBronchiques", POS);
  chk("v2 : sans le signe pivot, l'atrésie de l'œsophage ne tient pas", !tenue("atresieOesophage") &&
      crTient("signe pivot non coché : " + par(SIGNES, "culDeSacOeso").l));
  propre();
  clic("prelev", "sondeOesophage");
  chk("v2 : sonde passée, sans atrésie → perméabilité œsophagienne énoncée", neg("sondeOesoPassee") === "ok");
  clic("prelev", "sondeOesophage");

  /* ── Méconium : une obstruction n'est pas un diagnostic génétique ──────── */
  propre();
  pose("meconiumImpacte", POS); pose("concretions", POS); pose("microcolon", POS);
  chk("l'iléus méconial se lit", tenue("ileusMeconial"));
  chk("l'iléus seul ne prouve pas la mucoviscidose",
      par(DIAGS, "ileusMeconial").stop.indexOf("quinze fois sur trente-huit") >= 0);
  chk("un pancréas fœtal normal n'exclut rien",
      par(DIAGS, "ileusMeconial").stop.indexOf("un pancréas fœtal normal n'exclut rien") >= 0);
  chk("la seule mesure prescrite de la fiche est portée",
      par(DIAGS, "ileusMeconial").stop.indexOf("valvule de Bauhin") >= 0);
  chk("CFTR et Perls sont proposés", suggerer().cftr === 1 && suggerer().perls === 1);
  chk("la contrainte de congélation est dite",
      par(TECHNIQUES, "cftr").q.indexOf("ne se rattrape pas sur bloc") >= 0);
  chk("l'aplatissement villositaire n'est pas une atrophie",
      par(SIGNES, "villositesAplaties").meta.indexOf("pas d'atrophie villositaire") >= 0);
  propre();
  pose("pancreasCanauxMucus", POS);
  chk("v2 : canaux pancréatiques distendus → CFTR proposé, iléus non tenu",
      suggerer().cftr === 1 && !tenue("ileusMeconial"));
  propre();
  pose("calcificationsPeritoneales", POS); pose("macrophagesBiliaires", POS);
  chk("la péritonite méconiale se lit", tenue("peritoniteMeconiale"));
  chk("on n'exige pas de trouver le trou",
      par(DIAGS, "peritoniteMeconiale").stop.indexOf("sealed off") >= 0);
  chk("la divergence giganto-cellulaire n'est pas arbitrée",
      par(DIAGS, "peritoniteMeconiale").stop.indexOf("DIVERGENCE FRONTALE NON ARBITRÉE") >= 0);
  chk("les deux versions sont citées",
      par(SIGNES, "gigantoCellulaire").meta.indexOf("keeling") >= 0 &&
      par(SIGNES, "gigantoCellulaire").meta.indexOf("soffoet") >= 0);
  chk("la borne des 20 semaines est portée AVEC son incertitude d'échelle",
      par(DIAGS, "peritoniteMeconiale").stop.indexOf("l'échelle gestation n'est pas résolue") >= 0);
  chk("Von Kossa est proposé", suggerer().vonKossa === 1);
  chk("v2 : calcification présente → les deux négatifs péritonéaux en défaut",
      neg("pasDePeritoniteMeconiale") === "ko" && neg("pasDeDisparite") === "ko");
  propre();
  pose("disparite", NEG); pose("calcificationsPeritoneales", NEG); pose("adherences", NEG);
  chk("v2 : trajet, calcifications, adhérences absents → négatifs énoncés",
      neg("pasDeDisparite") === "ok" && neg("pasDePeritoniteMeconiale") === "ok");
  propre();

  /* ── Duplication : la paroi prouve, le siège trompe ────────────────────── */
  propre();
  pose("kysteParoiIntestinale", POS); pose("bordMesenterique", POS);
  chk("la duplication se lit", tenue("duplication"));
  chk("aucun mécanisme n'est conclu",
      par(DIAGS, "duplication").stop.indexOf("none consistently explain") >= 0);
  chk("les fréquences par site ne sont pas citées",
      par(DIAGS, "duplication").stop.indexOf("ne pas les citer") >= 0);
  ote("bordMesenterique"); pose("heterotopiePancreatique", POS);
  chk("v2 : à distance du tube, la paroi et une hétérotopie suffisent", tenue("duplication"));
  propre();

  /* ── Variantes : ce qui se fait prendre pour une lésion ────────────────── */
  chk("le côlon villositaire est une variante, pas une lésion", !!par(VARIANTES, "colonVillositaire"));
  chk("les cils œsophagiens sont une variante", !!par(VARIANTES, "ciliesOesophage"));
  chk("la muscularis mucosae absente du grêle est une variante",
      !!par(VARIANTES, "mmAbsenteGrele"));
  chk("la longitudinale mince est la NORME, son épaississement le signe",
      !!par(VARIANTES, "longiFine") && par(SIGNES, "longitudinaleEpaisse").meta.indexOf("obstacle") >= 0);
  chk("les cellules ganglionnaires immatures sont AUSSI une variante",
      !!par(VARIANTES, "ganglionsImmaturesVar"));
  chk("l'appendice sans villosités est une variante", !!par(VARIANTES, "appendiceSansVilli"));
  chk("v2 : chaque variante vit dans le cadre qu'elle mime",
      par(VARIANTES, "longiFine").g === par(SIGNES, "longitudinaleEpaisse").g &&
      par(VARIANTES, "folliculesAppendice").g === par(SIGNES, "folliculesSousMuqueux").g &&
      par(VARIANTES, "ganglionsImmaturesVar").g === par(SIGNES, "ganglionsAbsents").g &&
      par(VARIANTES, "gastriqueEctopique").g === par(SIGNES, "heterotopieGastrique").g);
  propre();
  pose("longitudinaleEpaisse", POS); pose("amontDilate", POS);
  chk("l'obstacle d'aval se lit", tenue("obstacleAval"));
  chk("aucun seuil d'épaisseur n'est inventé",
      par(DIAGS, "obstacleAval").stop.indexOf("aucun seuil chiffré") >= 0);

  /* ── Le blocage terminal : sans segment, plus rien ne se lit ───────────── */
  propre();
  segment("nonNomme");
  chk("le fragment sans adresse bloque tout", tenue("segmentInconnu"));
  chk("et il s'écrit dans le compte rendu",
      par(DIAGS, "segmentInconnu").stop.indexOf("dans le compte rendu") >= 0);
  chk("v2 : le segment non identifiable se déduit de la Maturation, sans bouton",
      E.signes.segmentNonIdentifiable === POS && !!document.querySelector('[data-auto="segmentNonIdentifiable"]') &&
      !document.querySelector('[data-act="les"][data-k="segmentNonIdentifiable"]'));
  segment("ileon");
  chk("v2 : segment nommé → signe déduit absent, l'association tombe",
      E.signes.segmentNonIdentifiable === NEG && !tenue("segmentInconnu"));
  propre();

  /* ── Négatifs : l'inverse du « normal » global du corpus ───────────────── */
  chk("douze négatifs à énoncer", NEGATIFS.length === 12);
  chk("le négatif de Hirschsprung n'est jamais écrit dans le corpus",
      par(NEGATIFS, "ganglionsPresents").p.indexOf("JAMAIS écrit") >= 0);
  chk("le compartiment est un négatif à part entière",
      par(NEGATIFS, "segmentNomme").p.indexOf("entérocytes") >= 0);
  chk("le « normal » global du corpus est cité comme contre-exemple",
      par(NEGATIFS, "segmentNomme").p.indexOf("Le tube digestif semble normal.") >= 0);
  chk("la muscularis mucosae par segment est un négatif",
      par(NEGATIFS, "mmParSegment").p.indexOf("Aucun CR") >= 0);
  chk("les deux gestes de sonde sont des négatifs distincts",
      !!par(NEGATIFS, "sondeAnalePassee") && !!par(NEGATIFS, "sondeOesoPassee"));
  chk("le follicule sous-muqueux garde sa réserve d'échelle",
      par(NEGATIFS, "pasDeFolliculeSousMuqueux").p.indexOf("échelle non résolue") >= 0);
  pose("pnGastriques", POS);
  chk("un contenu gastrique positif relance la virologie",
      suggerer().pcrInfectieux === 1 && neg("pasDePnGastriques") === "ko");
  pose("pnGastriques", NEG);
  chk("v2 : contenu gastrique sans polynucléaire → négatif énoncé", neg("pasDePnGastriques") === "ok");
  ote("pnGastriques");
  clic("prelev", "sondeAnale");
  chk("v2 : sonde anale tracée au prélèvement → négatif énoncé", neg("sondeAnalePassee") === "ok");
  clic("prelev", "sondeAnale");

  /* ── Techniques : ce que le service fait déjà, ce qu'il ne fait pas ────── */
  chk("le panel lymphoïde est déjà pratiqué ici",
      par(TECHNIQUES, "panelLymphoide").q.indexOf("Déjà pratiqué") >= 0 ||
      par(TECHNIQUES, "panelLymphoide").q.indexOf("déjà pratiqué") >= 0);
  chk("aucune IHC neurale n'apparaît dans un CR",
      par(TECHNIQUES, "phox2b").q.indexOf("absente de tout CR") >= 0 &&
      par(TECHNIQUES, "calretinine").q.indexOf("absente de tout CR") >= 0);
  chk("chaque technique porte sa question", TECHNIQUES.every(function(t){ return !!t.q && !!t.l; }));
  mm("nonEval");
  chk("coupe mal orientée : le smoothelin sépare les deux couches musculaires",
      suggerer().smoothelin === 1);
  mm("presente");

  /* ── Ce qui n'a pas été comblé ─────────────────────────────────────────── */
  chk("aucune atrésie des voies biliaires inventée",
      SIGNES.concat(DIAGS).every(function(x){ return texte(x).indexOf("voies biliaires") < 0; }));
  chk("aucune maladie cœliaque inventée",
      SIGNES.concat(DIAGS).every(function(x){ return texte(x).indexOf("coeliaque") < 0 &&
                                                     texte(x).indexOf("cœliaque") < 0; }));
  chk("aucun volvulus ni malrotation inventés",
      SIGNES.concat(DIAGS).every(function(x){ return texte(x).indexOf("malrotation") < 0; }));
  chk("aucune tumeur digestive inventée",
      SIGNES.concat(DIAGS).every(function(x){ return texte(x).indexOf("tumeur") < 0 &&
                                                     texte(x).indexOf("carcinome") < 0; }));
  chk("aucune SA collée à un rang sans source",
      STADES.every(function(s){ return !!s.note; }));

  /* ── Branchement FOETO ─────────────────────────────────────────────────── */
  chk("v2 : libellé venu de FOETO", par(SIGNES, "disparite").l === "Disparité de calibre sur le trajet intestinal");
  chk("v2 : code FOETO du terme verbatim", codesDe(par(SIGNES, "necroseCoagulation"))[0] === "FOETO:PF.DIG-MAL-030");
  chk("v2 : terme maladie sur l'association", par(DIAGS, "ecunSuspecte").foeto[0] === "FOETO:PF.DIG-INF-004");
  chk("v2 : constat de fiche sans terme non marqué hors fiche",
      !par(SIGNES, "deuxCulsDeSac").horsFiche && !par(SIGNES, "ganglionsImmatures").horsFiche);
  chk("v2 : signe sans source dans la fiche marqué hors fiche",
      par(SIGNES, "abcesCryptiques").horsFiche === true && par(SIGNES, "pseudomembrane").horsFiche === true);
  chk("v2 : un terme pour les deux plexus, un seul signe",
      par(SIGNES, "ganglionsAbsents").foeto === "FOETO:PF.DIG-MAL-002" &&
      !par(SIGNES, "ganglionsAbsentsSM") && !par(SIGNES, "ganglionsAbsentsMY"));
  chk("v2 : le constat v1 garde sa ligne à côté du terme qui le qualifie",
      !!par(SIGNES, "culDeSacOeso").fiche && par(SIGNES, "fistuleOesoTracheale").foeto === "FOETO:PF.DIG-MAL-051" &&
      !!par(SIGNES, "amontDilate").fiche && par(SIGNES, "avalCollabe").foeto === "FOETO:PF.DIG-MAL-040");
  chk("v2 : le macro et les autres organes sont hors lame",
      !!$("contexte").querySelector('[data-k="laparoschisis"]') && !$("signes").querySelector('[data-k="laparoschisis"]') &&
      !!$("contexte").querySelector('[data-k="pancreasCanauxMucus"]'));
  chk("v2 : blocs lus en Prélèvement", BLOCS_LUS && !$("blocsBloc").hidden);

  /* On laisse le banc sur un état lisible : terme posé, segment déclaré. */
  propre();
  segment("ileon"); mm("presente"); set("sa", "28");
}
