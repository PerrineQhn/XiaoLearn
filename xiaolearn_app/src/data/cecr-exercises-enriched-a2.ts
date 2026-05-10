/**
 * cecr-exercises-enriched-a2.ts
 * -----------------------------
 * Exercices A2 rédigés à la main — extension V9 de cecr-exercises.ts.
 *
 * Même grille pédagogique que cecr-exercises-enriched-a1.ts :
 *   1. grammar-quiz / mcq  — compréhension conceptuelle (registre, sens)
 *   2. fill                — phrase à trou
 *   3. order               — remise dans l'ordre
 *   4. translation zh→fr   — phrase + 4 choix FR
 *   5. translation fr→zh   — phrase + 4 choix ZH
 *   6. error-correction    — trouver le segment fautif
 *   7. mcq listening       — avec audioHanzi + autoPlay
 *   8. mcq reverse         — hanzi à partir du sens FR
 *
 * Chaque pack est ancré sur les flashcards et les objectifs spécifiques
 * de la leçon (cf. cecr-course.ts). Tous les audio cibles sont vérifiés
 * présents sur disque (cf. find public/audio/hsk*).
 */

import type { LessonV2Exercise } from '../pages/StructuredLessonPageV2';

// ============================================================================
//  A2 — EN VILLE & TRANSPORTS (4 modules)
// ============================================================================

// --- A2 City M1 : Demander son chemin -------------------------------------
// Flashcards : 请问, 怎么走, 往前, 往左, 往右, 拐, 一直走, 过马路, 附近, 旁边, 对面
const A2_CITY_M1: LessonV2Exercise[] = [
  {
    id: 'cecr-a2-city-m1-gq1',
    type: 'grammar-quiz',
    category: 'grammar',
    prompt: 'Tu veux aborder un inconnu pour demander ton chemin. Quel mot ouvre obligatoirement ta phrase ?',
    promptEn: 'You want to approach a stranger to ask directions. Which word MUST open your question?',
    choices: ['你好', '请问', '对不起', '师傅'],
    correctIndex: 1,
    explanation: '请问 (qǐng wèn, « puis-je demander ») est la formule polie pour ouvrir une question à un inconnu. 你好 est une salutation, pas une ouverture de question.',
    explanationEn: '请问 (qǐng wèn, «may I ask») is the polite opener when asking a stranger a question. 你好 is a greeting, not a question-opener.'
  },
  {
    id: 'cecr-a2-city-m1-fill1',
    type: 'fill',
    category: 'vocabulary',
    prompt: 'Tu indiques à quelqu\u2019un qu\u2019il doit marcher tout droit sans s\u2019arrêter.',
    promptEn: 'You tell someone to walk straight without stopping.',
    sentence: '\u4F60 ___ \uFF0C\u5C31\u5230\u4E86\u3002',
    sentenceEn: 'You ___, and you\u2019re there.',
    choices: ['\u5F80\u5DE6\u62D0', '\u4E00\u76F4\u8D70', '\u8FC7\u9A6C\u8DEF', '\u5728\u5BF9\u9762'],
    correctIndex: 1,
    explanation: '一直走 = « aller tout droit » (marcher en ligne droite sans changer de direction). 往左拐 = tourner à gauche, 过马路 = traverser la rue.',
    explanationEn: '一直走 = «go straight» (walk in a line without turning). 往左拐 = turn left, 过马路 = cross the street.'
  },
  {
    id: 'cecr-a2-city-m1-order1',
    type: 'order',
    category: 'grammar',
    prompt: 'Remets dans l\u2019ordre : « Excusez-moi, comment va-t-on à la gare ? »',
    promptEn: 'Reorder: «Excuse me, how do I get to the train station?»',
    sentence: 'Excusez-moi, comment va-t-on à la gare ?',
    sentenceEn: 'Excuse me, how do I get to the train station?',
    choices: ['\u8BF7\u95EE', '\uFF0C', '\u706B\u8F66\u7AD9', '\u600E\u4E48\u8D70', '\uFF1F'],
    correctIndex: 0,
    explanation: 'Structure fixe : 请问，[lieu] 怎么走 ? Jamais 请问怎么走火车站 (le lieu vient AVANT 怎么走).',
    explanationEn: 'Fixed structure: 请问，[place] 怎么走? Never 请问怎么走火车站 (place comes BEFORE 怎么走).'
  },
  {
    id: 'cecr-a2-city-m1-trans-zh2fr',
    type: 'translation',
    category: 'translation',
    prompt: 'Traduis : « 往右拐，银行就在对面。»',
    promptEn: 'Translate: «往右拐，银行就在对面。»',
    choices: [
      'Va tout droit, la banque est à côté.',
      'Tourne à gauche, la banque est derrière.',
      'Tourne à droite, la banque est juste en face.',
      'Passe la rue, la banque est à droite.'
    ],
    correctIndex: 2,
    explanation: '往右拐 = tourner à droite. 对面 = en face (de l\u2019autre côté). 就 renforce : « juste en face ». Distinguer 对面 (en face) de 旁边 (à côté).',
    explanationEn: '往右拐 = turn right. 对面 = opposite/across. 就 emphasises: «right opposite». Tell 对面 (across) apart from 旁边 (next to).'
  },
  {
    id: 'cecr-a2-city-m1-trans-fr2zh',
    type: 'translation',
    category: 'translation',
    prompt: 'Traduis : « Est-ce qu\u2019il y a un supermarché près d\u2019ici ? »',
    promptEn: 'Translate: «Is there a supermarket nearby?»',
    choices: [
      '\u8FD9\u91CC\u6709\u8D85\u5E02\u5417\uFF1F',
      '\u9644\u8FD1\u6709\u8D85\u5E02\u5417\uFF1F',
      '\u8D85\u5E02\u5728\u54EA\u513F\uFF1F',
      '\u65C1\u8FB9\u662F\u8D85\u5E02\u5417\uFF1F'
    ],
    correctIndex: 1,
    explanation: '附近 (fù jìn) = « à proximité / aux alentours », zone floue autour de toi. 这里 = « ici » (point précis). La question standard est 附近有...吗 ?',
    explanationEn: '附近 (fù jìn) = «nearby/around», fuzzy zone around you. 这里 = «here» (precise spot). Standard question: 附近有...吗?'
  },
  {
    id: 'cecr-a2-city-m1-err1',
    type: 'error-correction',
    category: 'grammar',
    prompt: 'Trouve l\u2019erreur : « 请问怎么走火车站 ? »',
    promptEn: 'Find the error: «请问怎么走火车站?»',
    sentence: '\u8BF7\u95EE\u600E\u4E48\u8D70\u706B\u8F66\u7AD9\uFF1F',
    choices: ['\u8BF7\u95EE', '\u600E\u4E48\u8D70', '\u706B\u8F66\u7AD9', 'L\u2019ordre des mots'],
    correctIndex: 3,
    explanation: 'Le lieu doit précéder 怎么走. Correct : 请问火车站怎么走 ? C\u2019est une règle d\u2019ordre, pas un mot isolé qui est faux.',
    explanationEn: 'Place must come before 怎么走. Correct: 请问火车站怎么走? It\u2019s a word-order rule, not a single wrong word.'
  },
  {
    id: 'cecr-a2-city-m1-listen1',
    type: 'mcq',
    category: 'listening',
    prompt: 'Écoute — quelle action indique-t-on ?',
    promptEn: 'Listen — which action is being pointed out?',
    choices: [
      'Traverser la rue',
      'Tourner à gauche',
      'Marcher tout droit',
      'Demander son chemin'
    ],
    correctIndex: 0,
    explanation: '过马路 (guò mǎ lù) = traverser la rue. Littéralement « passer la route ». Instruction fréquente dans la description d\u2019un itinéraire.',
    explanationEn: '过马路 (guò mǎ lù) = cross the street. Literally «pass the road». Common step in directions.',
    audioHanzi: '\u8FC7\u9A6C\u8DEF',
    autoPlay: true
  },
  {
    id: 'cecr-a2-city-m1-mcq-reverse',
    type: 'mcq',
    category: 'vocabulary',
    prompt: 'Comment dit-on « à côté de » en chinois ?',
    promptEn: 'How do you say «next to» in Chinese?',
    choices: ['\u5BF9\u9762', '\u9644\u8FD1', '\u65C1\u8FB9', '\u524D\u9762'],
    correctIndex: 2,
    explanation: '旁边 (páng biān) = « à côté, juste contre ». 附近 = « aux alentours » (plus flou). 对面 = « en face ». 前面 = « devant ».',
    explanationEn: '旁边 (páng biān) = «right beside». 附近 = «around/nearby» (fuzzier). 对面 = «across». 前面 = «in front».'
  }
];

// --- A2 City M2 : Les transports urbains ----------------------------------
// Flashcards : 坐, 骑, 地铁, 公共汽车, 出租车, 飞机, 火车, 自行车, 从, 到, 多长时间
const A2_CITY_M2: LessonV2Exercise[] = [
  {
    id: 'cecr-a2-city-m2-gq1',
    type: 'grammar-quiz',
    category: 'grammar',
    prompt: 'Quel verbe utilises-tu pour « aller au travail à vélo » ?',
    promptEn: 'Which verb for «going to work by bike»?',
    choices: ['\u5750', '\u9A91', '\u5F00', '\u8D70'],
    correctIndex: 1,
    explanation: '骑 (qí, chevaucher) pour tout ce qu\u2019on enfourche : 骑自行车, 骑摩托车, 骑马. 坐 (s\u2019asseoir) pour tout ce où l\u2019on est assis DANS (métro, bus, taxi, train, avion).',
    explanationEn: '骑 (qí, to ride astride) for anything you straddle: 骑自行车, 骑摩托车, 骑马. 坐 (to sit) for anything you sit IN (subway, bus, taxi, train, plane).'
  },
  {
    id: 'cecr-a2-city-m2-fill1',
    type: 'fill',
    category: 'vocabulary',
    prompt: 'Tu décris ton trajet domicile-bureau.',
    promptEn: 'You describe your home-office commute.',
    sentence: '\u6211\u6BCF\u5929 ___ \u5730\u94C1\u4E0A\u73ED\u3002',
    sentenceEn: 'Every day I ___ the subway to work.',
    choices: ['\u9A91', '\u5F00', '\u5750', '\u8DD1'],
    correctIndex: 2,
    explanation: 'On prend le métro (assis DANS) = 坐地铁. 开 = conduire (soi-même), 骑 = chevaucher, 跑 = courir.',
    explanationEn: 'Take the subway (sit IN) = 坐地铁. 开 = to drive (yourself), 骑 = to ride astride, 跑 = to run.'
  },
  {
    id: 'cecr-a2-city-m2-order1',
    type: 'order',
    category: 'grammar',
    prompt: 'Ordonne : « De la maison à l\u2019école, il faut 20 minutes. »',
    promptEn: 'Reorder: «From home to school it takes 20 minutes.»',
    sentence: 'De la maison à l\u2019école, il faut 20 minutes.',
    sentenceEn: 'From home to school, it takes 20 minutes.',
    choices: ['\u4ECE\u5BB6', '\u5230\u5B66\u6821', '\u8981', '\u4E8C\u5341\u5206\u949F'],
    correctIndex: 0,
    explanation: 'Structure 从...到... : « de... à... ». L\u2019ordre est fixe. 要二十分钟 = « ça demande 20 minutes » (durée nécessaire).',
    explanationEn: 'Structure 从...到...: «from... to...». Fixed order. 要二十分钟 = «takes 20 minutes» (required duration).'
  },
  {
    id: 'cecr-a2-city-m2-trans-zh2fr',
    type: 'translation',
    category: 'translation',
    prompt: 'Traduis : « 从北京到上海坐高铁多长时间 ? »',
    promptEn: 'Translate: «从北京到上海坐高铁多长时间?»',
    choices: [
      'Combien coûte le TGV Pékin-Shanghai ?',
      'Combien de temps faut-il en TGV de Pékin à Shanghai ?',
      'Quand part le prochain TGV pour Shanghai ?',
      'Est-ce que le TGV Pékin-Shanghai est rapide ?'
    ],
    correctIndex: 1,
    explanation: '多长时间 ? = combien de temps ? (durée). Pas à confondre avec 多少钱 (combien ça coûte) ou 什么时候 (quand).',
    explanationEn: '多长时间? = how long? (duration). Don\u2019t confuse with 多少钱 (cost) or 什么时候 (when).'
  },
  {
    id: 'cecr-a2-city-m2-trans-fr2zh',
    type: 'translation',
    category: 'translation',
    prompt: 'Traduis : « Je prends l\u2019avion pour aller à Chengdu. »',
    promptEn: 'Translate: «I fly to Chengdu.»',
    choices: [
      '\u6211\u9A91\u98DE\u673A\u53BB\u6210\u90FD\u3002',
      '\u6211\u5750\u98DE\u673A\u53BB\u6210\u90FD\u3002',
      '\u6211\u5F00\u98DE\u673A\u53BB\u6210\u90FD\u3002',
      '\u6211\u8D70\u98DE\u673A\u53BB\u6210\u90FD\u3002'
    ],
    correctIndex: 1,
    explanation: 'Pour l\u2019avion : 坐飞机 (on est assis DANS l\u2019avion). 骑飞机 ✗ — on ne chevauche pas un avion. 开飞机 = piloter soi-même.',
    explanationEn: 'For a plane: 坐飞机 (you sit IN the plane). 骑飞机 ✗ — you don\u2019t straddle a plane. 开飞机 = to pilot.'
  },
  {
    id: 'cecr-a2-city-m2-err1',
    type: 'error-correction',
    category: 'grammar',
    prompt: 'Trouve le mot mal choisi : « 我坐自行车去公司。»',
    promptEn: 'Find the wrongly chosen word: «我坐自行车去公司。»',
    sentence: '\u6211\u5750\u81EA\u884C\u8F66\u53BB\u516C\u53F8\u3002',
    choices: ['\u6211', '\u5750', '\u81EA\u884C\u8F66', '\u53BB'],
    correctIndex: 1,
    explanation: 'Erreur classique des étrangers : 坐自行车 ✗. Le vélo s\u2019enfourche, donc 骑. Correct : 我骑自行车去公司.',
    explanationEn: 'Classic foreigner mistake: 坐自行车 ✗. A bike is straddled → 骑. Correct: 我骑自行车去公司.'
  },
  {
    id: 'cecr-a2-city-m2-listen1',
    type: 'mcq',
    category: 'listening',
    prompt: 'Écoute — quel moyen de transport ?',
    promptEn: 'Listen — which transport?',
    choices: [
      'Le métro (地铁)',
      'Le taxi (出租车)',
      'Le bus (公共汽车)',
      'L\u2019avion (飞机)'
    ],
    correctIndex: 0,
    explanation: '地铁 (dì tiě, ton 4 + ton 3) = métro. Littéralement « fer souterrain ». Différent de 火车 (huǒ chē) = train.',
    explanationEn: '地铁 (dì tiě, tone 4 + tone 3) = subway. Literally «underground iron». Different from 火车 (huǒ chē) = train.',
    audioHanzi: '\u5730\u94C1',
    autoPlay: true
  },
  {
    id: 'cecr-a2-city-m2-mcq-reverse',
    type: 'mcq',
    category: 'vocabulary',
    prompt: 'Comment dit-on « bus » (transport public) en chinois ?',
    promptEn: 'How do you say «(public) bus» in Chinese?',
    choices: ['\u51FA\u79DF\u8F66', '\u516C\u5171\u6C7D\u8F66', '\u706B\u8F66', '\u5730\u94C1'],
    correctIndex: 1,
    explanation: '公共汽车 (gōng gòng qì chē) = bus public, mot à mot « public voiture à vapeur ». 出租车 = taxi, 火车 = train, 地铁 = métro.',
    explanationEn: '公共汽车 (gōng gòng qì chē) = public bus, literally «public steam-vehicle». 出租车 = taxi, 火车 = train, 地铁 = subway.'
  }
];

// --- A2 City M3 : Lieux de la ville ---------------------------------------
// Flashcards : 书店, 饭店, 商店, 图书馆, 博物馆, 咖啡馆, 医院, 电影院, 银行, 邮局, 超市
const A2_CITY_M3: LessonV2Exercise[] = [
  {
    id: 'cecr-a2-city-m3-gq1',
    type: 'grammar-quiz',
    category: 'grammar',
    prompt: 'Les 3 suffixes récurrents des lieux chinois sont 店, 馆 et...',
    promptEn: 'The 3 recurring suffixes for Chinese places are 店, 馆 and...',
    choices: ['\u7AD9', '\u9662', '\u5BAB', '\u5BE4'],
    correctIndex: 1,
    explanation: 'Les 3 suffixes clés : 店 (petit commerce : 书店, 饭店, 商店), 馆 (établissement : 图书馆, 博物馆, 咖啡馆), 院 (institution : 医院, 电影院).',
    explanationEn: 'The 3 key suffixes: 店 (small shop: 书店, 饭店, 商店), 馆 (venue: 图书馆, 博物馆, 咖啡馆), 院 (institution: 医院, 电影院).'
  },
  {
    id: 'cecr-a2-city-m3-fill1',
    type: 'fill',
    category: 'vocabulary',
    prompt: 'Tu cherches un endroit pour retirer de l\u2019argent en Chine.',
    promptEn: 'You\u2019re looking for a place to withdraw cash in China.',
    sentence: '___ \u5728\u54EA\u513F\uFF1F',
    sentenceEn: 'Where is the ___?',
    choices: ['\u4E66\u5E97', '\u94F6\u884C', '\u533B\u9662', '\u90AE\u5C40'],
    correctIndex: 1,
    explanation: '银行 (yín háng, littéralement « maison d\u2019argent ») = banque. Fait exception à la règle des suffixes (ni 店 ni 馆 ni 院).',
    explanationEn: '银行 (yín háng, lit. «money house») = bank. Exception to the suffix rule (neither 店 nor 馆 nor 院).'
  },
  {
    id: 'cecr-a2-city-m3-order1',
    type: 'order',
    category: 'grammar',
    prompt: 'Ordonne : « Je suis à la bibliothèque. »',
    promptEn: 'Reorder: «I am at the library.»',
    sentence: 'Je suis à la bibliothèque.',
    sentenceEn: 'I am at the library.',
    choices: ['\u6211', '\u5728', '\u56FE\u4E66\u9986'],
    correctIndex: 0,
    explanation: 'Structure 我在 + lieu = « je suis à + lieu ». 在 est le verbe « être à » (pas besoin de 是). Correct : 我在图书馆.',
    explanationEn: 'Structure 我在 + place = «I\u2019m at + place». 在 is the verb «to be at» (no 是 needed). Correct: 我在图书馆.'
  },
  {
    id: 'cecr-a2-city-m3-trans-zh2fr',
    type: 'translation',
    category: 'translation',
    prompt: 'Traduis : « 电影院在超市旁边。»',
    promptEn: 'Translate: «电影院在超市旁边。»',
    choices: [
      'Le cinéma est en face du supermarché.',
      'Le cinéma est à côté du supermarché.',
      'Le cinéma est derrière le supermarché.',
      'Le cinéma est dans le supermarché.'
    ],
    correctIndex: 1,
    explanation: '旁边 = à côté (juste contre). 对面 = en face. Le mot à mot est « le cinéma se trouve au côté du supermarché ».',
    explanationEn: '旁边 = next to (right beside). 对面 = across. Word-for-word: «cinema is at the side of supermarket».'
  },
  {
    id: 'cecr-a2-city-m3-trans-fr2zh',
    type: 'translation',
    category: 'translation',
    prompt: 'Traduis : « Y a-t-il une librairie près d\u2019ici ? »',
    promptEn: 'Translate: «Is there a bookshop nearby?»',
    choices: [
      '\u9644\u8FD1\u6709\u4E66\u5E97\u5417\uFF1F',
      '\u9644\u8FD1\u6709\u533B\u9662\u5417\uFF1F',
      '\u9644\u8FD1\u6709\u5546\u5E97\u5417\uFF1F',
      '\u9644\u8FD1\u6709\u94F6\u884C\u5417\uFF1F'
    ],
    correctIndex: 0,
    explanation: '书店 (shū diàn) = librairie (店 suffixe commerce). 商店 = boutique générale, 医院 = hôpital, 银行 = banque.',
    explanationEn: '书店 (shū diàn) = bookshop (店 commerce suffix). 商店 = general shop, 医院 = hospital, 银行 = bank.'
  },
  {
    id: 'cecr-a2-city-m3-err1',
    type: 'error-correction',
    category: 'grammar',
    prompt: 'Trouve l\u2019erreur : « 我是超市。»',
    promptEn: 'Find the error: «我是超市。»',
    sentence: '\u6211\u662F\u8D85\u5E02\u3002',
    choices: ['\u6211', '\u662F', '\u8D85\u5E02', 'L\u2019ordre'],
    correctIndex: 1,
    explanation: 'Pour se situer on utilise 在 (« être à »), pas 是 (« être = »). Correct : 我在超市 = « je suis au supermarché ». 我是超市 = « je SUIS un supermarché » (absurde).',
    explanationEn: 'To locate, use 在 («to be at»), not 是 («to be = »). Correct: 我在超市 = «I\u2019m at the supermarket». 我是超市 = «I AM a supermarket» (absurd).'
  },
  {
    id: 'cecr-a2-city-m3-listen1',
    type: 'mcq',
    category: 'listening',
    prompt: 'Écoute — quel lieu urbain ?',
    promptEn: 'Listen — which urban place?',
    choices: [
      'Hôpital (医院)',
      'Musée (博物馆)',
      'Poste (邮局)',
      'Cinéma (电影院)'
    ],
    correctIndex: 1,
    explanation: '博物馆 (bó wù guǎn) = musée (3 syllabes). Le suffixe 馆 signale un lieu culturel. Différent de 医院 (yī yuàn) et 电影院 (diàn yǐng yuàn).',
    explanationEn: '博物馆 (bó wù guǎn) = museum (3 syllables). Suffix 馆 marks a cultural venue. Different from 医院 (yī yuàn) and 电影院 (diàn yǐng yuàn).',
    audioHanzi: '\u535A\u7269\u9986',
    autoPlay: true
  },
  {
    id: 'cecr-a2-city-m3-mcq-reverse',
    type: 'mcq',
    category: 'vocabulary',
    prompt: 'Comment dit-on « la poste » en chinois ?',
    promptEn: 'How do you say «post office» in Chinese?',
    choices: ['\u94F6\u884C', '\u5546\u5E97', '\u90AE\u5C40', '\u533B\u9662'],
    correctIndex: 2,
    explanation: '邮局 (yóu jú, « bureau postal »). Utilise le suffixe 局 (jú, bureau administratif), typique aussi de 警察局 (commissariat).',
    explanationEn: '邮局 (yóu jú, «postal bureau»). Uses suffix 局 (jú, administrative bureau), also found in 警察局 (police station).'
  }
];

// --- A2 City M4 : Réserver un taxi (Didi) ---------------------------------
// Flashcards : 师傅, 去, 到了, 就在这儿, 多少钱, 微信, 扫码, 不用找了
const A2_CITY_M4: LessonV2Exercise[] = [
  {
    id: 'cecr-a2-city-m4-gq1',
    type: 'grammar-quiz',
    category: 'grammar',
    prompt: 'Comment t\u2019adresses-tu à un chauffeur de taxi en Chine ?',
    promptEn: 'How do you address a taxi driver in China?',
    choices: ['\u5148\u751F', '\u5E08\u5085', '\u8001\u677F', '\u540C\u5B66'],
    correctIndex: 1,
    explanation: '师傅 (shī fu) est le terme de respect pour un artisan ou un chauffeur. 先生 = monsieur (trop formel/neutre). L\u2019utiliser change immédiatement le ton du trajet.',
    explanationEn: '师傅 (shī fu) is the respectful term for a craftsman or driver. 先生 = sir (too formal/neutral). Using it instantly changes the trip\u2019s tone.'
  },
  {
    id: 'cecr-a2-city-m4-fill1',
    type: 'fill',
    category: 'vocabulary',
    prompt: 'Tu arrives à ta destination, tu dis au chauffeur :',
    promptEn: 'You arrive at your destination, you tell the driver:',
    sentence: '\u5E08\u5085\uFF0C ___ \uFF0C\u8C22\u8C22\uFF01',
    sentenceEn: 'Driver, ___, thanks!',
    choices: ['\u591A\u5C11\u94B1', '\u5230\u4E86', '\u626B\u7801', '\u5FAE\u4FE1'],
    correctIndex: 1,
    explanation: '到了 (dào le) = « c\u2019est arrivé / on y est ». Le 了 marque le changement d\u2019état (arrivée). Signale au chauffeur qu\u2019il peut s\u2019arrêter.',
    explanationEn: '到了 (dào le) = «we\u2019re here». 了 marks state change (arrival). Tells the driver they can stop.'
  },
  {
    id: 'cecr-a2-city-m4-order1',
    type: 'order',
    category: 'grammar',
    prompt: 'Ordonne : « Chauffeur, je vais à l\u2019aéroport. »',
    promptEn: 'Reorder: «Driver, I\u2019m going to the airport.»',
    sentence: 'Chauffeur, je vais à l\u2019aéroport.',
    sentenceEn: 'Driver, I\u2019m going to the airport.',
    choices: ['\u5E08\u5085', '\uFF0C', '\u6211', '\u53BB', '\u673A\u573A'],
    correctIndex: 0,
    explanation: 'Structure directe chinoise : 师傅，我去机场. Pas besoin de « s\u2019il vous plaît » ou « pouvez-vous ». Concision = politesse dans ce contexte.',
    explanationEn: 'Direct Chinese structure: 师傅，我去机场. No need for «please» or «can you». Conciseness = politeness here.'
  },
  {
    id: 'cecr-a2-city-m4-trans-zh2fr',
    type: 'translation',
    category: 'translation',
    prompt: 'Traduis : « 用微信还是用现金 ? »',
    promptEn: 'Translate: «用微信还是用现金?»',
    choices: [
      'Combien ça coûte par WeChat ?',
      'WeChat ou espèces ?',
      'Je paie par WeChat, d\u2019accord ?',
      'Vous avez WeChat ?'
    ],
    correctIndex: 1,
    explanation: '还是 (hái shi) = « ou bien » (dans une question à choix). 用 = utiliser. La question propose les 2 options de paiement.',
    explanationEn: '还是 (hái shi) = «or» (in a choice question). 用 = to use. The question offers the 2 payment options.'
  },
  {
    id: 'cecr-a2-city-m4-trans-fr2zh',
    type: 'translation',
    category: 'translation',
    prompt: 'Traduis : « C\u2019est juste ici. »',
    promptEn: 'Translate: «Right here.»',
    choices: [
      '\u5728\u90A3\u513F\u3002',
      '\u5C31\u5728\u8FD9\u513F\u3002',
      '\u5728\u5BF9\u9762\u3002',
      '\u5728\u9644\u8FD1\u3002'
    ],
    correctIndex: 1,
    explanation: '就在这儿 = « c\u2019est juste ici » (就 renforce). 在那儿 = « là-bas ». Formule pour dire au chauffeur de s\u2019arrêter exactement là.',
    explanationEn: '就在这儿 = «right here» (就 emphasises). 在那儿 = «over there». Phrase to tell the driver to stop exactly there.'
  },
  {
    id: 'cecr-a2-city-m4-err1',
    type: 'error-correction',
    category: 'grammar',
    prompt: 'Dans un taxi, quel mot sonne bizarre : « 先生，我去机场。» ?',
    promptEn: 'In a taxi, which word sounds off: «先生，我去机场。»?',
    sentence: '\u5148\u751F\uFF0C\u6211\u53BB\u673A\u573A\u3002',
    choices: ['\u5148\u751F', '\u6211', '\u53BB', '\u673A\u573A'],
    correctIndex: 0,
    explanation: '先生 (« monsieur ») est trop formel et ne s\u2019utilise pas avec un chauffeur. Le terme normal est 师傅 (shī fu).',
    explanationEn: '先生 («sir») is too formal for a driver. Normal term: 师傅 (shī fu).'
  },
  {
    id: 'cecr-a2-city-m4-listen1',
    type: 'mcq',
    category: 'listening',
    prompt: 'Écoute — quelle instruction donne le chauffeur ou le passager ?',
    promptEn: 'Listen — what instruction is given?',
    choices: [
      'Scanner le QR code',
      'Payer en espèces',
      'Tourner à gauche',
      'Attendre un moment'
    ],
    correctIndex: 0,
    explanation: '扫码 (sǎo mǎ) = scanner le QR code. Verbe clé du paiement mobile chinois. Littéralement « balayer-code ».',
    explanationEn: '扫码 (sǎo mǎ) = scan the QR code. Key verb of Chinese mobile payment. Literally «sweep-code».',
    audioHanzi: '\u626B\u7801',
    autoPlay: true
  },
  {
    id: 'cecr-a2-city-m4-mcq-reverse',
    type: 'mcq',
    category: 'vocabulary',
    prompt: 'Tu laisses le pourboire au chauffeur. Tu dis :',
    promptEn: 'You tip the driver. You say:',
    choices: ['\u518D\u89C1', '\u4E0D\u7528\u627E\u4E86', '\u5230\u4E86', '\u5C31\u5728\u8FD9\u513F'],
    correctIndex: 1,
    explanation: '不用找了 (bú yòng zhǎo le) = « pas besoin de rendre la monnaie » = vous gardez le reste. Culturellement rare en Chine (paiements mobiles exacts), mais utile en taxi.',
    explanationEn: '不用找了 (bú yòng zhǎo le) = «no need for change» = keep the rest. Culturally rare in China (mobile payments are exact), but useful in a taxi.'
  }
];

// ============================================================================
//  A2 — RESTAURANTS & COURSES (8 modules : food 4 + shopping 4)
// ============================================================================

// --- A2 Food M1 : Au restaurant : commander -------------------------------
// Flashcards : 点菜, 服务员, 我要, 一个, 一碗, 一杯, 菜单, 买单, 结账, 好吃
const A2_FOOD_M1: LessonV2Exercise[] = [
  {
    id: 'cecr-a2-food-m1-gq1',
    type: 'grammar-quiz',
    category: 'grammar',
    prompt: 'Quel classificateur choisir pour « une soupe » ?',
    promptEn: 'Which classifier for «a soup»?',
    choices: ['\u4E00\u4E2A', '\u4E00\u7897', '\u4E00\u676F', '\u4E00\u5F20'],
    correctIndex: 1,
    explanation: '一碗 (yī wǎn) = un bol. 碗 est le classificateur pour tout ce qu\u2019on mange dans un bol : soupe, riz, nouilles. 一杯 pour un verre, 一个 classificateur générique.',
    explanationEn: '一碗 (yī wǎn) = one bowl. 碗 is the classifier for anything eaten in a bowl: soup, rice, noodles. 一杯 for a glass, 一个 generic classifier.'
  },
  {
    id: 'cecr-a2-food-m1-fill1',
    type: 'fill',
    category: 'vocabulary',
    prompt: 'Tu lèves la main pour appeler le serveur.',
    promptEn: 'You raise your hand to call the waiter.',
    sentence: '___ \uFF01\u4E70\u5355\u3002',
    sentenceEn: '___! Check please.',
    choices: ['\u5E08\u5085', '\u670D\u52A1\u5458', '\u8001\u677F', '\u5148\u751F'],
    correctIndex: 1,
    explanation: '服务员 (fú wù yuán) = serveur/serveuse au restaurant. 师傅 pour un chauffeur/artisan, 老板 pour un patron, 先生 pour un inconnu dans la rue.',
    explanationEn: '服务员 (fú wù yuán) = restaurant server. 师傅 for a driver/craftsman, 老板 for a boss, 先生 for a stranger in the street.'
  },
  {
    id: 'cecr-a2-food-m1-order1',
    type: 'order',
    category: 'grammar',
    prompt: 'Ordonne : « Je veux un verre de thé et un bol de riz. »',
    promptEn: 'Reorder: «I want a glass of tea and a bowl of rice.»',
    sentence: 'Je veux un verre de thé et un bol de riz.',
    sentenceEn: 'I want a glass of tea and a bowl of rice.',
    choices: ['\u6211\u8981', '\u4E00\u676F\u8336', '\u548C', '\u4E00\u7897\u7C73\u996D'],
    correctIndex: 0,
    explanation: 'Structure : 我要 + nombre + classificateur + aliment + 和 + ... La coordination se fait avec 和 (entre noms). Classificateur obligatoire.',
    explanationEn: 'Structure: 我要 + number + classifier + food + 和 + ... Coordination uses 和 (between nouns). Classifier is mandatory.'
  },
  {
    id: 'cecr-a2-food-m1-trans-zh2fr',
    type: 'translation',
    category: 'translation',
    prompt: 'Traduis : « 菜单在哪儿 ? »',
    promptEn: 'Translate: «菜单在哪儿?»',
    choices: [
      'Où est le serveur ?',
      'Où est le menu ?',
      'Qu\u2019est-ce qu\u2019il y a au menu ?',
      'Quel est le plat du jour ?'
    ],
    correctIndex: 1,
    explanation: '菜单 (cài dān) = menu, littéralement « liste-de-plats ». 在哪儿 = « où est-ce ? ». 哪儿 (nǎr) est la forme Nord ; 哪里 (nǎ lǐ) au Sud.',
    explanationEn: '菜单 (cài dān) = menu, literally «dish-list». 在哪儿 = «where is it?». 哪儿 (nǎr) is Northern form; 哪里 (nǎ lǐ) in the South.'
  },
  {
    id: 'cecr-a2-food-m1-trans-fr2zh',
    type: 'translation',
    category: 'translation',
    prompt: 'Traduis : « L\u2019addition, s\u2019il vous plaît ! »',
    promptEn: 'Translate: «Check please!»',
    choices: [
      '\u670D\u52A1\u5458\uFF0C\u70B9\u83DC\uFF01',
      '\u670D\u52A1\u5458\uFF0C\u7ED3\u8D26\uFF01',
      '\u670D\u52A1\u5458\uFF0C\u83DC\u5355\uFF01',
      '\u670D\u52A1\u5458\uFF0C\u597D\u5403\uFF01'
    ],
    correctIndex: 1,
    explanation: 'Deux expressions équivalentes pour l\u2019addition : 结账 (jié zhàng, « clore le compte ») et 买单 (mǎi dān, « payer la note »). 点菜 = commander (avant le repas !).',
    explanationEn: 'Two equivalent phrases for the check: 结账 (jié zhàng, «close the tab») and 买单 (mǎi dān, «pay the bill»). 点菜 = to order (before the meal!).'
  },
  {
    id: 'cecr-a2-food-m1-err1',
    type: 'error-correction',
    category: 'grammar',
    prompt: 'Trouve l\u2019erreur : « 我要三汤。»',
    promptEn: 'Find the error: «我要三汤。»',
    sentence: '\u6211\u8981\u4E09\u6C64\u3002',
    choices: ['\u6211', '\u8981', '\u4E09', 'Manque le classificateur'],
    correctIndex: 3,
    explanation: 'En chinois, entre un nombre et un nom il faut OBLIGATOIREMENT un classificateur. Correct : 我要三碗汤 (trois bols de soupe). Sans 碗, c\u2019est agrammatical.',
    explanationEn: 'In Chinese, a classifier is ALWAYS required between a number and a noun. Correct: 我要三碗汤 (three bowls of soup). Without 碗, it\u2019s ungrammatical.'
  },
  {
    id: 'cecr-a2-food-m1-listen1',
    type: 'mcq',
    category: 'listening',
    prompt: 'Écoute — que dit-on au serveur ?',
    promptEn: 'Listen — what is said to the waiter?',
    choices: [
      'Je commande les plats',
      'Je veux l\u2019addition',
      'C\u2019est délicieux',
      'Quel est le menu'
    ],
    correctIndex: 0,
    explanation: '点菜 (diǎn cài, « pointer-plats ») = commander la nourriture. Verbe central du repas au restaurant.',
    explanationEn: '点菜 (diǎn cài, «point-dishes») = to order food. Central restaurant verb.',
    audioHanzi: '\u70B9\u83DC',
    autoPlay: true
  },
  {
    id: 'cecr-a2-food-m1-mcq-reverse',
    type: 'mcq',
    category: 'vocabulary',
    prompt: 'Comment dit-on « c\u2019est délicieux » à table ?',
    promptEn: 'How do you say «it\u2019s delicious» at the table?',
    choices: ['\u597D\u5403', '\u597D\u770B', '\u597D\u542C', '\u597D\u95FB'],
    correctIndex: 0,
    explanation: '好吃 (hǎo chī) = bon à manger, délicieux. Pattern 好 + verbe : 好看 (joli), 好听 (mélodieux), 好闻 (qui sent bon). Le verbe indique le sens.',
    explanationEn: '好吃 (hǎo chī) = good-to-eat, delicious. Pattern 好 + verb: 好看 (pretty), 好听 (melodious), 好闻 (smells good). The verb points to the sense.'
  }
];

// --- A2 Food M2 : Goûts & saveurs -----------------------------------------
// Flashcards : 酸, 甜, 苦, 辣, 咸, 好吃, 难吃, 有点, 太, 微辣, 中辣
const A2_FOOD_M2: LessonV2Exercise[] = [
  {
    id: 'cecr-a2-food-m2-gq1',
    type: 'grammar-quiz',
    category: 'grammar',
    prompt: 'Tu es sensible au piquant. Que dis-tu au serveur au Sichuan ?',
    promptEn: 'You\u2019re sensitive to spice. What do you tell the waiter in Sichuan?',
    choices: ['\u6211\u5403\u4E0D\u4E86\u8FA3', '\u6211\u8981\u7279\u8FA3', '\u6211\u4E0D\u5403\u996D', '\u6211\u559C\u6B22\u5403'],
    correctIndex: 0,
    explanation: '我吃不了辣 = « je ne peux pas manger du piquant ». 吃不了 = « impossible de manger ». Phrase salvatrice au Sichuan ou au Hunan. 特辣 signifie au contraire « extra piquant ».',
    explanationEn: '我吃不了辣 = «I can\u2019t eat spicy». 吃不了 = «unable to eat». Lifesaver in Sichuan or Hunan. 特辣 on the contrary = «extra spicy».'
  },
  {
    id: 'cecr-a2-food-m2-fill1',
    type: 'fill',
    category: 'vocabulary',
    prompt: 'Tu goûtes une soupe un peu trop salée.',
    promptEn: 'You taste a soup that\u2019s a bit too salty.',
    sentence: '\u8FD9\u4E2A\u6C64 ___ \u54B8\u3002',
    sentenceEn: 'This soup is ___ salty.',
    choices: ['\u592A', '\u6709\u70B9', '\u5F88', '\u975E\u5E38'],
    correctIndex: 1,
    explanation: '有点 (yǒu diǎn) = « un peu (plutôt négatif) ». Avant un adjectif, il suggère une critique douce. 太 = trop (négatif fort), 很 = très (neutre).',
    explanationEn: '有点 (yǒu diǎn) = «a bit (slightly negative)». Before an adjective, it hints at mild criticism. 太 = too (strong negative), 很 = very (neutral).'
  },
  {
    id: 'cecr-a2-food-m2-order1',
    type: 'order',
    category: 'grammar',
    prompt: 'Ordonne : « Ce plat est trop piquant. »',
    promptEn: 'Reorder: «This dish is too spicy.»',
    sentence: 'Ce plat est trop piquant.',
    sentenceEn: 'This dish is too spicy.',
    choices: ['\u8FD9\u4E2A\u83DC', '\u592A', '\u8FA3', '\u4E86'],
    correctIndex: 0,
    explanation: 'Structure : 太 + adjectif + 了 = « trop... ». Le 了 est presque obligatoire avec 太. 太辣了 = « c\u2019est trop piquant ! ». Note : pas de 是 avec un adjectif.',
    explanationEn: 'Structure: 太 + adjective + 了 = «too...». 了 is almost mandatory with 太. 太辣了 = «it\u2019s too spicy!». Note: no 是 before an adjective.'
  },
  {
    id: 'cecr-a2-food-m2-trans-zh2fr',
    type: 'translation',
    category: 'translation',
    prompt: 'Traduis : « 糖醋里脊又酸又甜。»',
    promptEn: 'Translate: «糖醋里脊又酸又甜。»',
    choices: [
      'Le filet sucré-salé est très salé.',
      'Le filet sucré-acide est à la fois acide et sucré.',
      'Le filet est trop piquant et sucré.',
      'Le filet est délicieux et piquant.'
    ],
    correctIndex: 1,
    explanation: 'Pattern 又 A 又 B = « à la fois A et B ». 又酸又甜 = acide et sucré à la fois. Le plat 糖醋里脊 porte d\u2019ailleurs ces saveurs dans son nom (糖 sucre + 醋 vinaigre).',
    explanationEn: 'Pattern 又 A 又 B = «both A and B». 又酸又甜 = sour and sweet together. Dish name 糖醋里脊 literally means sugar-vinegar pork tenderloin.'
  },
  {
    id: 'cecr-a2-food-m2-trans-fr2zh',
    type: 'translation',
    category: 'translation',
    prompt: 'Traduis : « Le café est très amer. »',
    promptEn: 'Translate: «The coffee is very bitter.»',
    choices: [
      '\u5496\u5561\u5F88\u9178\u3002',
      '\u5496\u5561\u5F88\u82E6\u3002',
      '\u5496\u5561\u5F88\u751C\u3002',
      '\u5496\u5561\u5F88\u54B8\u3002'
    ],
    correctIndex: 1,
    explanation: '苦 (kǔ, ton 3) = amer. Les 5 saveurs : 酸 (acide), 甜 (sucré), 苦 (amer), 辣 (piquant), 咸 (salé). 很 est obligatoire en chinois avant un adjectif positif.',
    explanationEn: '苦 (kǔ, tone 3) = bitter. 5 flavors: 酸 (sour), 甜 (sweet), 苦 (bitter), 辣 (spicy), 咸 (salty). 很 is mandatory before a Chinese adjective in plain statement.'
  },
  {
    id: 'cecr-a2-food-m2-err1',
    type: 'error-correction',
    category: 'grammar',
    prompt: 'Trouve le mot de trop : « 这个菜是很辣。»',
    promptEn: 'Find the extra word: «这个菜是很辣。»',
    sentence: '\u8FD9\u4E2A\u83DC\u662F\u5F88\u8FA3\u3002',
    choices: ['\u8FD9\u4E2A', '\u662F', '\u5F88', '\u8FA3'],
    correctIndex: 1,
    explanation: 'Avec un adjectif on ne met JAMAIS 是. 很 suffit. Correct : 这个菜很辣. Confusion fréquente avec la structure « être + adj » du français.',
    explanationEn: 'With an adjective, NEVER use 是. 很 is enough. Correct: 这个菜很辣. Frequent French/English «to be + adj» interference.'
  },
  {
    id: 'cecr-a2-food-m2-listen1',
    type: 'mcq',
    category: 'listening',
    prompt: 'Écoute — quelle saveur ?',
    promptEn: 'Listen — which flavor?',
    choices: [
      'Sucré (甜)',
      'Amer (苦)',
      'Piquant (辣)',
      'Salé (咸)'
    ],
    correctIndex: 2,
    explanation: '辣 (là, ton 4) = piquant. Technique : ce n\u2019est pas vraiment un goût mais une douleur, pourtant toujours compté parmi les 5 saveurs chinoises.',
    explanationEn: '辣 (là, tone 4) = spicy. Technically not a taste but a pain, yet always counted among the 5 Chinese flavors.',
    audioHanzi: '\u8FA3',
    autoPlay: true
  },
  {
    id: 'cecr-a2-food-m2-mcq-reverse',
    type: 'mcq',
    category: 'vocabulary',
    prompt: 'Comment dit-on « moyennement piquant » ?',
    promptEn: 'How do you say «medium spicy»?',
    choices: ['\u5FAE\u8FA3', '\u4E2D\u8FA3', '\u7279\u8FA3', '\u4E0D\u8FA3'],
    correctIndex: 1,
    explanation: 'Échelle Sichuan : 微辣 (légèrement) < 中辣 (moyen) < 特辣 (extra). Graduer avec 微/中/特 est très pratique quand on commande un plat épicé.',
    explanationEn: 'Sichuan scale: 微辣 (mild) < 中辣 (medium) < 特辣 (extra). Grading with 微/中/特 is very handy when ordering spicy food.'
  }
];

// --- A2 Food M3 : Plats emblématiques -------------------------------------
// Flashcards : 宫保鸡丁, 麻婆豆腐, 糖醋里脊, 鱼香肉丝, 饺子, 米饭, 面条, 炒, 蒸, 炸, 炖
const A2_FOOD_M3: LessonV2Exercise[] = [
  {
    id: 'cecr-a2-food-m3-gq1',
    type: 'grammar-quiz',
    category: 'grammar',
    prompt: 'Dans « 宫保鸡丁 », 鸡丁 désigne quel ingrédient ?',
    promptEn: 'In «宫保鸡丁», what does 鸡丁 mean?',
    choices: ['Du b\u0153uf en lamelles', 'Des d\u00E9s de poulet', 'Du tofu frit', 'Du poisson entier'],
    correctIndex: 1,
    explanation: '鸡 (jī) = poulet ; 丁 (dīng) = petits cubes/dés. Le motif « [ingrédient] + [forme] » est universel dans les menus chinois : 肉丝 = lamelles de viande, 鱼片 = tranches de poisson.',
    explanationEn: '鸡 (jī) = chicken; 丁 (dīng) = small cubes. «[Ingredient] + [shape]» is universal in Chinese menus: 肉丝 = meat strips, 鱼片 = fish slices.'
  },
  {
    id: 'cecr-a2-food-m3-fill1',
    type: 'fill',
    category: 'vocabulary',
    prompt: 'Tu veux des légumes sautés, pas frits ni à la vapeur.',
    promptEn: 'You want stir-fried veggies, not deep-fried or steamed.',
    sentence: '\u6211\u8981\u4E00\u76D8 ___ \u83DC\u3002',
    sentenceEn: 'I want a dish of ___ vegetables.',
    choices: ['\u84B8', '\u7092', '\u70B8', '\u7096'],
    correctIndex: 1,
    explanation: '炒 (chǎo) = sauter au wok (flamme vive, huile, rapidité). 蒸 = vapeur, 炸 = friture profonde, 炖 = mijoter. Chaque mode change radicalement le résultat.',
    explanationEn: '炒 (chǎo) = stir-fry (high flame, oil, fast). 蒸 = steam, 炸 = deep-fry, 炖 = stew. Each method radically changes the result.'
  },
  {
    id: 'cecr-a2-food-m3-order1',
    type: 'order',
    category: 'grammar',
    prompt: 'Ordonne : « J\u2019aimerais goûter les raviolis. »',
    promptEn: 'Reorder: «I\u2019d like to try the dumplings.»',
    sentence: 'J\u2019aimerais goûter les raviolis.',
    sentenceEn: 'I\u2019d like to try the dumplings.',
    choices: ['\u6211', '\u60F3', '\u5C1D\u5C1D', '\u997A\u5B50'],
    correctIndex: 0,
    explanation: 'Structure 想 + verbe + objet = « j\u2019aimerais + V ». La réduplication 尝尝 (goûter-goûter) adoucit la demande, équivalent de « goûter un peu ».',
    explanationEn: 'Structure 想 + verb + object = «I\u2019d like to + V». Reduplication 尝尝 (taste-taste) softens the request, like «taste a bit».'
  },
  {
    id: 'cecr-a2-food-m3-trans-zh2fr',
    type: 'translation',
    category: 'translation',
    prompt: 'Traduis : « 麻婆豆腐不太辣，你可以吃。»',
    promptEn: 'Translate: «麻婆豆腐不太辣，你可以吃。»',
    choices: [
      'Le mapo tofu est très piquant, tu devrais éviter.',
      'Le mapo tofu n\u2019est pas trop piquant, tu peux en manger.',
      'Le mapo tofu est délicieux, il faut goûter.',
      'Le mapo tofu est froid, tu peux commander.'
    ],
    correctIndex: 1,
    explanation: '不太 = « pas trop », atténuateur. 可以 = « peux/pouvoir ». 麻婆豆腐 est le plat sichuanais emblématique — tofu + sauce rouge pimentée.',
    explanationEn: '不太 = «not too», softener. 可以 = «can/may». 麻婆豆腐 is Sichuan\u2019s flagship — tofu in red chili sauce.'
  },
  {
    id: 'cecr-a2-food-m3-trans-fr2zh',
    type: 'translation',
    category: 'translation',
    prompt: 'Traduis : « Je voudrais un bol de nouilles. »',
    promptEn: 'Translate: «I\u2019d like a bowl of noodles.»',
    choices: [
      '\u6211\u8981\u4E00\u7897\u9970\u5B50\u3002',
      '\u6211\u8981\u4E00\u7897\u9762\u6761\u3002',
      '\u6211\u8981\u4E00\u7897\u7C73\u996D\u3002',
      '\u6211\u8981\u4E00\u676F\u9762\u6761\u3002'
    ],
    correctIndex: 1,
    explanation: '面条 (miàn tiáo) = nouilles. Classificateur 碗 (bol) — pas 杯 (verre) ni 个 (générique). 饺子 = raviolis, 米饭 = riz cuit.',
    explanationEn: '面条 (miàn tiáo) = noodles. Classifier 碗 (bowl) — not 杯 (glass) nor 个 (generic). 饺子 = dumplings, 米饭 = cooked rice.'
  },
  {
    id: 'cecr-a2-food-m3-err1',
    type: 'error-correction',
    category: 'grammar',
    prompt: 'Trouve l\u2019erreur : « 我要一个饺子。»',
    promptEn: 'Find the error: «我要一个饺子。»',
    sentence: '\u6211\u8981\u4E00\u4E2A\u997A\u5B50\u3002',
    choices: ['\u6211\u8981', '\u4E00\u4E2A', '\u997A\u5B50', 'Tout est correct'],
    correctIndex: 1,
    explanation: 'Les raviolis se commandent à la portion (assiette ou gros bol). « Un seul ravioli » est absurde au restaurant. Correct : 我要一盘饺子 (une assiette) ou 一份饺子 (une portion).',
    explanationEn: 'Dumplings are ordered by portion (plate or large bowl). «One single dumpling» is absurd in a restaurant. Correct: 我要一盘饺子 (a plate) or 一份饺子 (a portion).'
  },
  {
    id: 'cecr-a2-food-m3-listen1',
    type: 'mcq',
    category: 'listening',
    prompt: 'Écoute — quel aliment ?',
    promptEn: 'Listen — which food?',
    choices: [
      'Raviolis (饺子)',
      'Riz (米饭)',
      'Nouilles (面条)',
      'Tofu (豆腐)'
    ],
    correctIndex: 0,
    explanation: '饺子 (jiǎo zi) = raviolis chinois, typiques du Nord et obligatoires au réveillon du Nouvel An. Deux syllabes, ton 3 + neutre.',
    explanationEn: '饺子 (jiǎo zi) = Chinese dumplings, northern staple and a must on Chinese New Year\u2019s Eve. Two syllables, tone 3 + neutral.',
    audioHanzi: '\u997A\u5B50',
    autoPlay: true
  },
  {
    id: 'cecr-a2-food-m3-mcq-reverse',
    type: 'mcq',
    category: 'vocabulary',
    prompt: 'Comment dit-on « cuit à la vapeur » ?',
    promptEn: 'How do you say «steamed»?',
    choices: ['\u7092', '\u70B8', '\u84B8', '\u7096'],
    correctIndex: 2,
    explanation: '蒸 (zhēng) = à la vapeur. Mode très sain, typique des poissons et des dim sum cantonais. 炒 = sauté, 炸 = frit, 炖 = mijoté.',
    explanationEn: '蒸 (zhēng) = steamed. Healthy method, typical for fish and Cantonese dim sum. 炒 = stir-fried, 炸 = deep-fried, 炖 = stewed.'
  }
];

// --- A2 Food M4 : Boissons & thé ------------------------------------------
// Flashcards : 茶, 绿茶, 红茶, 乌龙茶, 普洱茶, 水, 开水, 果汁, 啤酒, 可乐, 咖啡
const A2_FOOD_M4: LessonV2Exercise[] = [
  {
    id: 'cecr-a2-food-m4-gq1',
    type: 'grammar-quiz',
    category: 'grammar',
    prompt: 'Tu demandes de l\u2019eau au restaurant en Chine. Par défaut, tu reçois :',
    promptEn: 'You ask for water in a Chinese restaurant. By default, you get:',
    choices: ['De l\u2019eau gla\u00E7\u00E9e', 'De l\u2019eau fra\u00EEche', 'De l\u2019eau bouillie chaude', 'Du th\u00E9'],
    correctIndex: 2,
    explanation: '开水 (kāi shuǐ) = eau bouillie chaude. En Chine l\u2019eau servie est toujours bouillie (sécurité sanitaire historique). Pour de l\u2019eau froide, il faut explicitement demander 凉水 ou 冰水.',
    explanationEn: '开水 (kāi shuǐ) = boiled hot water. Served water in China is always boiled (historical safety). For cold water, explicitly ask 凉水 or 冰水.'
  },
  {
    id: 'cecr-a2-food-m4-fill1',
    type: 'fill',
    category: 'vocabulary',
    prompt: 'Tu commandes un thé oolong.',
    promptEn: 'You order an oolong tea.',
    sentence: '\u6211\u8981\u4E00\u676F ___ \u3002',
    sentenceEn: 'I want a cup of ___.',
    choices: ['\u7EFF\u8336', '\u7EA2\u8336', '\u4E4C\u9F99\u8336', '\u666E\u6D31\u8336'],
    correctIndex: 2,
    explanation: '乌龙茶 (wū lóng chá) = thé oolong (semi-fermenté, origine Fujian). 绿茶 = thé vert (non fermenté), 红茶 = thé rouge (= « black tea » en anglais), 普洱茶 = pu\u2019er (fermenté, Yunnan).',
    explanationEn: '乌龙茶 (wū lóng chá) = oolong tea (semi-fermented, Fujian origin). 绿茶 = green tea (unfermented), 红茶 = red tea (= «black tea» in English), 普洱茶 = pu\u2019er (fermented, Yunnan).'
  },
  {
    id: 'cecr-a2-food-m4-order1',
    type: 'order',
    category: 'grammar',
    prompt: 'Ordonne : « Je voudrais une bière bien fraîche. »',
    promptEn: 'Reorder: «I\u2019d like a really cold beer.»',
    sentence: 'Je voudrais une bière bien fraîche.',
    sentenceEn: 'I\u2019d like a really cold beer.',
    choices: ['\u6211\u8981', '\u4E00\u74F6', '\u51B0\u7684', '\u5564\u9152'],
    correctIndex: 0,
    explanation: 'Classificateur 瓶 (bouteille) pour la bière. 冰的 = « le froid / le glacé » (de + 的 pour nominaliser). Correct : 我要一瓶冰的啤酒.',
    explanationEn: 'Classifier 瓶 (bottle) for beer. 冰的 = «the cold one» (冰 + 的 nominalizer). Correct: 我要一瓶冰的啤酒.'
  },
  {
    id: 'cecr-a2-food-m4-trans-zh2fr',
    type: 'translation',
    category: 'translation',
    prompt: 'Traduis : « 中国人喜欢喝热水。»',
    promptEn: 'Translate: «中国人喜欢喝热水。»',
    choices: [
      'Les Chinois aiment boire du café.',
      'Les Chinois aiment boire du thé vert.',
      'Les Chinois aiment boire de l\u2019eau chaude.',
      'Les Chinois aiment boire de la bière.'
    ],
    correctIndex: 2,
    explanation: '喝 (hē) = boire. 热水 = eau chaude. Fait culturel : les Chinois boivent de l\u2019eau chaude toute l\u2019année (TCM — médecine traditionnelle chinoise — conseille d\u2019éviter le froid).',
    explanationEn: '喝 (hē) = to drink. 热水 = hot water. Cultural fact: Chinese drink hot water all year long (TCM advises avoiding cold drinks).'
  },
  {
    id: 'cecr-a2-food-m4-trans-fr2zh',
    type: 'translation',
    category: 'translation',
    prompt: 'Traduis : « Je n\u2019aime pas le coca, je veux du jus. »',
    promptEn: 'Translate: «I don\u2019t like coke, I want juice.»',
    choices: [
      '\u6211\u4E0D\u559C\u6B22\u53EF\u4E50\uFF0C\u6211\u8981\u5564\u9152\u3002',
      '\u6211\u4E0D\u559C\u6B22\u53EF\u4E50\uFF0C\u6211\u8981\u679C\u6C41\u3002',
      '\u6211\u559C\u6B22\u53EF\u4E50\uFF0C\u4E0D\u8981\u679C\u6C41\u3002',
      '\u6211\u559C\u6B22\u679C\u6C41\u548C\u53EF\u4E50\u3002'
    ],
    correctIndex: 1,
    explanation: '可乐 (kě lè) = Coca/cola. 果汁 (guǒ zhī) = jus de fruits. 啤酒 = bière. Négation 不 + verbe pour une préférence permanente.',
    explanationEn: '可乐 (kě lè) = Coke/cola. 果汁 (guǒ zhī) = juice. 啤酒 = beer. Negation 不 + verb for a permanent preference.'
  },
  {
    id: 'cecr-a2-food-m4-err1',
    type: 'error-correction',
    category: 'grammar',
    prompt: 'Trouve l\u2019erreur : « 我要一个咖啡。»',
    promptEn: 'Find the error: «我要一个咖啡。»',
    sentence: '\u6211\u8981\u4E00\u4E2A\u5496\u5561\u3002',
    choices: ['\u6211', '\u4E00\u4E2A', '\u5496\u5561', 'Tout est correct'],
    correctIndex: 1,
    explanation: 'Pour une boisson dans un contenant, classificateur 杯 (verre/tasse). Correct : 我要一杯咖啡. 个 est trop générique et sonne débutant.',
    explanationEn: 'For a drink in a vessel, use classifier 杯 (glass/cup). Correct: 我要一杯咖啡. 个 is too generic and sounds beginner.'
  },
  {
    id: 'cecr-a2-food-m4-listen1',
    type: 'mcq',
    category: 'listening',
    prompt: 'Écoute — quelle boisson ?',
    promptEn: 'Listen — which drink?',
    choices: [
      'Thé vert (绿茶)',
      'Café (咖啡)',
      'Bière (啤酒)',
      'Jus (果汁)'
    ],
    correctIndex: 0,
    explanation: '绿茶 (lǜ chá, ton 4 + ton 2) = thé vert. Thé le plus consommé en Chine, associé au Zhejiang (Longjing) et à l\u2019Anhui. Non fermenté = goût frais.',
    explanationEn: '绿茶 (lǜ chá, tone 4 + tone 2) = green tea. Most consumed tea in China, associated with Zhejiang (Longjing) and Anhui. Unfermented = fresh taste.',
    audioHanzi: '\u7EFF\u8336',
    autoPlay: true
  },
  {
    id: 'cecr-a2-food-m4-mcq-reverse',
    type: 'mcq',
    category: 'vocabulary',
    prompt: 'Comment dit-on « thé pu\u2019er » (thé fermenté du Yunnan) ?',
    promptEn: 'How do you say «pu\u2019er tea» (fermented tea from Yunnan)?',
    choices: ['\u7EFF\u8336', '\u7EA2\u8336', '\u4E4C\u9F99\u8336', '\u666E\u6D31\u8336'],
    correctIndex: 3,
    explanation: '普洱茶 (pǔ ěr chá) vient de la région de Pu\u2019er au Yunnan. Thé post-fermenté, vieilli (parfois des décennies). Prisé dans les cercles de collectionneurs chinois.',
    explanationEn: '普洱茶 (pǔ ěr chá) from Pu\u2019er region in Yunnan. Post-fermented tea, aged (sometimes decades). Highly valued by Chinese collectors.'
  }
];

// --- A2 Shopping M1 : Les prix 块/毛/分 -----------------------------------
// Flashcards : 人民币, 元, 块, 毛, 分, 多少钱, 便宜, 贵, 打折, 便宜点儿
const A2_SHOPPING_M1: LessonV2Exercise[] = [
  {
    id: 'cecr-a2-shopping-m1-gq1',
    type: 'grammar-quiz',
    category: 'grammar',
    prompt: 'Au marché, pour dire « 25 yuans », un Chinois dira :',
    promptEn: 'At the market, to say «25 yuan», a Chinese speaker says:',
    choices: ['\u4E8C\u5341\u4E94\u5143', '\u4E8C\u5341\u4E94\u5757', '\u4E8C\u5341\u4E94\u6BDB', '\u4E8C\u5341\u4E94\u5206'],
    correctIndex: 1,
    explanation: '元 est l\u2019unité écrite ; 块 (kuài) est la forme orale. À l\u2019oral, 25元 sonne trop formel. On dit 二十五块. Les deux réfèrent à la même somme.',
    explanationEn: '元 is the written unit; 块 (kuài) is the oral form. Orally, 25元 sounds too formal. People say 二十五块. Both refer to the same amount.'
  },
  {
    id: 'cecr-a2-shopping-m1-fill1',
    type: 'fill',
    category: 'vocabulary',
    prompt: 'Tu négocies un prix au marché.',
    promptEn: 'You bargain at the market.',
    sentence: '\u592A\u8D35\u4E86\uFF0C ___ \u4E00\u70B9\u513F\uFF01',
    sentenceEn: 'Too expensive, a bit ___!',
    choices: ['\u8D35', '\u4FBF\u5B9C', '\u6253\u6298', '\u591A\u5C11'],
    correctIndex: 1,
    explanation: '便宜点儿 (pián yi diǎnr) = « un peu moins cher, s\u2019il vous plaît ». 便宜 = bon marché, 一点儿 atténue. Formule standard de négociation sur les marchés.',
    explanationEn: '便宜点儿 (pián yi diǎnr) = «a little cheaper, please». 便宜 = cheap, 一点儿 softens. Standard haggling formula at markets.'
  },
  {
    id: 'cecr-a2-shopping-m1-order1',
    type: 'order',
    category: 'grammar',
    prompt: 'Ordonne : « Combien coûte ce livre ? »',
    promptEn: 'Reorder: «How much does this book cost?»',
    sentence: 'Combien coûte ce livre ?',
    sentenceEn: 'How much does this book cost?',
    choices: ['\u8FD9\u672C\u4E66', '\u591A\u5C11\u94B1', '\uFF1F'],
    correctIndex: 0,
    explanation: 'Structure : [objet] + 多少钱 ? Classificateur 本 obligatoire pour un livre. Correct : 这本书多少钱 ?',
    explanationEn: 'Structure: [object] + 多少钱? Classifier 本 mandatory for a book. Correct: 这本书多少钱?'
  },
  {
    id: 'cecr-a2-shopping-m1-trans-zh2fr',
    type: 'translation',
    category: 'translation',
    prompt: 'Traduis : « 打八折。»',
    promptEn: 'Translate: «打八折。»',
    choices: [
      'R\u00E9duction de 80 %.',
      'Tu paies 80 % du prix (20 % de remise).',
      'Il y a une taxe de 8 %.',
      'L\u2019article co\u00FBte 8 yuans.'
    ],
    correctIndex: 1,
    explanation: 'Système chinois inversé : 打X折 = « payer X/10 du prix ». 打八折 = tu paies 80 %, donc 20 % de remise. 打五折 = -50 %. Piège classique pour les Occidentaux.',
    explanationEn: 'Inverted Chinese system: 打X折 = «pay X/10 of the price». 打八折 = you pay 80 %, so 20 % off. 打五折 = -50 %. Classic trap for Westerners.'
  },
  {
    id: 'cecr-a2-shopping-m1-trans-fr2zh',
    type: 'translation',
    category: 'translation',
    prompt: 'Traduis : « C\u2019est trop cher ! »',
    promptEn: 'Translate: «It\u2019s too expensive!»',
    choices: [
      '\u592A\u4FBF\u5B9C\u4E86\uFF01',
      '\u592A\u8D35\u4E86\uFF01',
      '\u592A\u591A\u4E86\uFF01',
      '\u592A\u597D\u4E86\uFF01'
    ],
    correctIndex: 1,
    explanation: '贵 (guì) = cher. Pattern 太 + adj + 了 = « trop... ». 便宜 (pián yi) = bon marché (l\u2019inverse). Couple indispensable au marché.',
    explanationEn: '贵 (guì) = expensive. Pattern 太 + adj + 了 = «too...». 便宜 (pián yi) = cheap (opposite). Indispensable pair at markets.'
  },
  {
    id: 'cecr-a2-shopping-m1-err1',
    type: 'error-correction',
    category: 'grammar',
    prompt: 'Trouve l\u2019erreur de registre : « 二十五元五毛。»',
    promptEn: 'Find the register error: «二十五元五毛。»',
    sentence: '\u4E8C\u5341\u4E94\u5143\u4E94\u6BDB\u3002',
    choices: ['\u4E8C\u5341\u4E94', '\u5143', '\u4E94\u6BDB', 'Aucune'],
    correctIndex: 1,
    explanation: 'Mélange incohérent : 元 (écrit) + 毛 (oral). Soit tout oral : 二十五块五毛. Soit tout écrit : 二十五元五角. Ne mélange pas les registres.',
    explanationEn: 'Incoherent mix: 元 (written) + 毛 (spoken). Either all spoken: 二十五块五毛. Or all written: 二十五元五角. Don\u2019t mix registers.'
  },
  {
    id: 'cecr-a2-shopping-m1-listen1',
    type: 'mcq',
    category: 'listening',
    prompt: 'Écoute — que demande le client ?',
    promptEn: 'Listen — what does the customer ask?',
    choices: [
      'Le prix',
      'Un rabais',
      'La qualit\u00E9',
      'L\u2019adresse'
    ],
    correctIndex: 0,
    explanation: '多少钱 ? (duō shao qián) = combien ça coûte ? Question universelle du commerce chinois. 多少 = quantité ouverte (peu importe la valeur).',
    explanationEn: '多少钱? (duō shao qián) = how much does it cost? Universal Chinese commerce question. 多少 = open quantity (any size).',
    audioHanzi: '\u591A\u5C11\u94B1',
    autoPlay: true
  },
  {
    id: 'cecr-a2-shopping-m1-mcq-reverse',
    type: 'mcq',
    category: 'vocabulary',
    prompt: 'Comment dit-on « monnaie chinoise » officiellement ?',
    promptEn: 'How do you officially say «Chinese currency»?',
    choices: ['\u7F8E\u5143', '\u4EBA\u6C11\u5E01', '\u6B27\u5143', '\u65E5\u5143'],
    correctIndex: 1,
    explanation: '人民币 (rén mín bì, RMB) = « monnaie du peuple », nom officiel. 美元 = USD, 欧元 = EUR, 日元 = JPY. Le code ISO est CNY.',
    explanationEn: '人民币 (rén mín bì, RMB) = «people\u2019s currency», official name. 美元 = USD, 欧元 = EUR, 日元 = JPY. ISO code is CNY.'
  }
];

// --- A2 Shopping M2 : Vêtements & tailles ---------------------------------
// Flashcards : 穿, 戴, 衣服, 鞋, 帽子, 眼镜, 大号, 中号, 小号, 试, 颜色
const A2_SHOPPING_M2: LessonV2Exercise[] = [
  {
    id: 'cecr-a2-shopping-m2-gq1',
    type: 'grammar-quiz',
    category: 'grammar',
    prompt: 'Quel verbe pour « porter des lunettes » ?',
    promptEn: 'Which verb for «wearing glasses»?',
    choices: ['\u7A7F', '\u6234', '\u62EC', '\u62FF'],
    correctIndex: 1,
    explanation: '戴 (dài) pour les accessoires qui s\u2019accrochent : lunettes, chapeau, montre, bague. 穿 (chuān) pour ce qui se passe sur le corps : vêtements, chaussures.',
    explanationEn: '戴 (dài) for hanging accessories: glasses, hat, watch, ring. 穿 (chuān) for what slips onto the body: clothes, shoes.'
  },
  {
    id: 'cecr-a2-shopping-m2-fill1',
    type: 'fill',
    category: 'vocabulary',
    prompt: 'Tu demandes une autre taille au vendeur.',
    promptEn: 'You ask the shop assistant for another size.',
    sentence: '\u6709 ___ \u5417\uFF1F\u8FD9\u4E2A\u6709\u70B9\u5C0F\u3002',
    sentenceEn: 'Do you have ___? This one is a bit small.',
    choices: ['\u5927\u53F7', '\u4E2D\u53F7', '\u5C0F\u53F7', '\u989C\u8272'],
    correctIndex: 0,
    explanation: '大号 (dà hào) = grande taille (L). 中号 = M, 小号 = S. 号 = « numéro ». Les Chinois utilisent aussi S/M/L écrits, surtout dans les enseignes internationales.',
    explanationEn: '大号 (dà hào) = large (L). 中号 = M, 小号 = S. 号 = «number». Chinese also use S/M/L directly, especially in international brands.'
  },
  {
    id: 'cecr-a2-shopping-m2-order1',
    type: 'order',
    category: 'grammar',
    prompt: 'Ordonne : « Est-ce que je peux l\u2019essayer ? »',
    promptEn: 'Reorder: «May I try it on?»',
    sentence: 'Est-ce que je peux l\u2019essayer ?',
    sentenceEn: 'May I try it on?',
    choices: ['\u6211', '\u53EF\u4EE5', '\u8BD5\u8BD5', '\u5417\uFF1F'],
    correctIndex: 0,
    explanation: '可以 (pouvoir), la réduplication 试试 (« essayer un peu ») adoucit la demande. Phrase complète : 我可以试试吗 ? Usage standard en boutique.',
    explanationEn: '可以 (may), reduplication 试试 («try a bit») softens the request. Full phrase: 我可以试试吗? Standard in shops.'
  },
  {
    id: 'cecr-a2-shopping-m2-trans-zh2fr',
    type: 'translation',
    category: 'translation',
    prompt: 'Traduis : « 有别的颜色吗 ? »',
    promptEn: 'Translate: «有别的颜色吗?»',
    choices: [
      'Avez-vous autre chose ?',
      'Y a-t-il d\u2019autres couleurs ?',
      'Combien de couleurs avez-vous ?',
      'Quelle couleur pr\u00E9f\u00E9rez-vous ?'
    ],
    correctIndex: 1,
    explanation: '别的 (bié de) = « autre / d\u2019un autre type ». 颜色 = couleur. Structure 有...吗 ? pour interroger sur la disponibilité.',
    explanationEn: '别的 (bié de) = «other / different type». 颜色 = color. Structure 有...吗? for asking about availability.'
  },
  {
    id: 'cecr-a2-shopping-m2-trans-fr2zh',
    type: 'translation',
    category: 'translation',
    prompt: 'Traduis : « Il porte un chapeau noir. »',
    promptEn: 'Translate: «He\u2019s wearing a black hat.»',
    choices: [
      '\u4ED6\u7A7F\u4E00\u9876\u9ED1\u5E3D\u5B50\u3002',
      '\u4ED6\u6234\u4E00\u9876\u9ED1\u5E3D\u5B50\u3002',
      '\u4ED6\u6709\u4E00\u9876\u9ED1\u5E3D\u5B50\u3002',
      '\u4ED6\u4E70\u4E86\u4E00\u9876\u9ED1\u5E3D\u5B50\u3002'
    ],
    correctIndex: 1,
    explanation: 'Chapeau = accessoire → 戴. Classificateur 顶 spécifique aux chapeaux. 黑 = noir, 帽子 = chapeau. Ne pas dire 穿帽子 ✗.',
    explanationEn: 'Hat = accessory → 戴. Classifier 顶 specific to hats. 黑 = black, 帽子 = hat. Never 穿帽子 ✗.'
  },
  {
    id: 'cecr-a2-shopping-m2-err1',
    type: 'error-correction',
    category: 'grammar',
    prompt: 'Trouve l\u2019erreur : « 我戴这双鞋。»',
    promptEn: 'Find the error: «我戴这双鞋。»',
    sentence: '\u6211\u6234\u8FD9\u53CC\u978B\u3002',
    choices: ['\u6211', '\u6234', '\u8FD9\u53CC', '\u978B'],
    correctIndex: 1,
    explanation: 'Les chaussures se portent → 穿. 戴 serait absurde (on ne les accroche pas). Correct : 我穿这双鞋.',
    explanationEn: 'Shoes are put on → 穿. 戴 would be absurd (you don\u2019t hang them). Correct: 我穿这双鞋.'
  },
  {
    id: 'cecr-a2-shopping-m2-listen1',
    type: 'mcq',
    category: 'listening',
    prompt: 'Écoute — qu\u2019entend-on ?',
    promptEn: 'Listen — what do you hear?',
    choices: [
      'Chaussures (鞋)',
      'V\u00EAtements (衣服)',
      'Chapeau (帽子)',
      'Lunettes (眼镜)'
    ],
    correctIndex: 1,
    explanation: '衣服 (yī fu) = vêtements (collectif). Ton 1 + ton neutre. Différent de 衣 seul (plutôt écrit) et de 服装 (fú zhuāng, plus formel « tenue »).',
    explanationEn: '衣服 (yī fu) = clothes (collective). Tone 1 + neutral. Different from 衣 alone (more written) and 服装 (fú zhuāng, more formal «attire»).',
    audioHanzi: '\u8863\u670D',
    autoPlay: true
  },
  {
    id: 'cecr-a2-shopping-m2-mcq-reverse',
    type: 'mcq',
    category: 'vocabulary',
    prompt: 'Comment dit-on « essayer (un vêtement) » ?',
    promptEn: 'How do you say «try on» (a piece of clothing)?',
    choices: ['\u4E70', '\u8BD5', '\u6234', '\u7A7F'],
    correctIndex: 1,
    explanation: '试 (shì) = essayer, tester. 试衣间 (shì yī jiān) = cabine d\u2019essayage. La réduplication 试试 est très courante pour adoucir.',
    explanationEn: '试 (shì) = to try, to test. 试衣间 (shì yī jiān) = fitting room. Reduplication 试试 is very common to soften.'
  }
];

// --- A2 Shopping M3 : Payer en Chine --------------------------------------
// Flashcards : 微信支付, 支付宝, 扫码, 二维码, 现金, 刷卡, 转账, 付钱, 收款
const A2_SHOPPING_M3: LessonV2Exercise[] = [
  {
    id: 'cecr-a2-shopping-m3-gq1',
    type: 'grammar-quiz',
    category: 'grammar',
    prompt: 'Le vendeur te demande : « 您扫我还是我扫您 ? ». Que veut-il savoir ?',
    promptEn: 'The seller asks «您扫我还是我扫您?». What do they want to know?',
    choices: ['Quel est ton num\u00E9ro', 'Qui scanne le QR de qui', 'Combien tu paies', 'Si tu as du cash'],
    correctIndex: 1,
    explanation: '扫 = scanner. Deux modes de paiement mobile : tu scannes le QR du vendeur (tu payes), ou le vendeur scanne ton QR (il encaisse). Question pratique du quotidien chinois.',
    explanationEn: '扫 = to scan. Two mobile payment modes: you scan the vendor\u2019s QR (you pay), or the vendor scans yours (they collect). Daily Chinese life question.'
  },
  {
    id: 'cecr-a2-shopping-m3-fill1',
    type: 'fill',
    category: 'vocabulary',
    prompt: 'Tu n\u2019as ni WeChat ni Alipay. Tu sors un billet.',
    promptEn: 'You have neither WeChat nor Alipay. You pull out a bill.',
    sentence: '\u6211\u7528 ___ \u4ED8\u94B1\u3002',
    sentenceEn: 'I\u2019ll pay with ___.',
    choices: ['\u626B\u7801', '\u73B0\u91D1', '\u5FAE\u4FE1', '\u652F\u4ED8\u5B9D'],
    correctIndex: 1,
    explanation: '现金 (xiàn jīn) = argent liquide, espèces. Rare en Chine moderne, mais toujours accepté légalement. Avoir quelques billets reste utile pour les petits marchés traditionnels.',
    explanationEn: '现金 (xiàn jīn) = cash. Rare in modern China but still legal tender. Keeping a few bills is still useful for small traditional markets.'
  },
  {
    id: 'cecr-a2-shopping-m3-order1',
    type: 'order',
    category: 'grammar',
    prompt: 'Ordonne : « Tu peux scanner le code ? »',
    promptEn: 'Reorder: «Can you scan the QR code?»',
    sentence: 'Tu peux scanner le code ?',
    sentenceEn: 'Can you scan the QR code?',
    choices: ['\u4F60', '\u53EF\u4EE5', '\u626B\u4E00\u4E0B', '\u8FD9\u4E2A\u7801\u5417\uFF1F'],
    correctIndex: 0,
    explanation: 'Structure 可以 + V-一下 = « peux-tu + V + un moment ? ». 一下 atténue, rend moins impératif. Correct : 你可以扫一下这个码吗 ?',
    explanationEn: 'Structure 可以 + V-一下 = «can you + V + briefly?». 一下 softens. Correct: 你可以扫一下这个码吗?'
  },
  {
    id: 'cecr-a2-shopping-m3-trans-zh2fr',
    type: 'translation',
    category: 'translation',
    prompt: 'Traduis : « 这里不收现金，只能用微信或支付宝。»',
    promptEn: 'Translate: «这里不收现金，只能用微信或支付宝。»',
    choices: [
      'Ici on ne prend plus WeChat, seulement du cash.',
      'Ici on ne prend pas d\u2019esp\u00E8ces, il faut payer par WeChat ou Alipay.',
      'Ici on accepte WeChat mais pas Alipay.',
      'Ici on n\u2019accepte aucun paiement.'
    ],
    correctIndex: 1,
    explanation: '收 = recevoir/accepter (pour un paiement). 只能 = « seulement pouvoir » (on ne peut que...). 或 = ou (écrit ; 还是 en question, 或者 à l\u2019affirmatif).',
    explanationEn: '收 = to receive/accept (payment). 只能 = «can only». 或 = or (written; 还是 in questions, 或者 in statements).'
  },
  {
    id: 'cecr-a2-shopping-m3-trans-fr2zh',
    type: 'translation',
    category: 'translation',
    prompt: 'Traduis : « Scan ce QR code s\u2019il te plaît. »',
    promptEn: 'Translate: «Please scan this QR code.»',
    choices: [
      '\u8BF7\u4ED8\u8FD9\u4E2A\u4E8C\u7EF4\u7801\u3002',
      '\u8BF7\u626B\u8FD9\u4E2A\u4E8C\u7EF4\u7801\u3002',
      '\u8BF7\u770B\u8FD9\u4E2A\u4E8C\u7EF4\u7801\u3002',
      '\u8BF7\u8BFB\u8FD9\u4E2A\u4E8C\u7EF4\u7801\u3002'
    ],
    correctIndex: 1,
    explanation: '二维码 (èr wéi mǎ) = QR code, littéralement « code à deux dimensions ». Verbe dédié 扫. 看码 ✗ — on ne « regarde » pas un QR code.',
    explanationEn: '二维码 (èr wéi mǎ) = QR code, literally «two-dimension code». Dedicated verb 扫. 看码 ✗ — you don\u2019t «look at» a QR code.'
  },
  {
    id: 'cecr-a2-shopping-m3-err1',
    type: 'error-correction',
    category: 'grammar',
    prompt: 'Trouve le mot mal utilisé : « 我读二维码。»',
    promptEn: 'Find the wrong word: «我读二维码。»',
    sentence: '\u6211\u8BFB\u4E8C\u7EF4\u7801\u3002',
    choices: ['\u6211', '\u8BFB', '\u4E8C\u7EF4\u7801', 'Aucun'],
    correctIndex: 1,
    explanation: '读 = lire (texte). Pour un QR code on utilise 扫 (scanner). 读二维码 est incompréhensible. Correct : 我扫二维码.',
    explanationEn: '读 = to read (text). For a QR code, use 扫 (scan). 读二维码 is nonsense. Correct: 我扫二维码.'
  },
  {
    id: 'cecr-a2-shopping-m3-listen1',
    type: 'mcq',
    category: 'listening',
    prompt: 'Écoute — quel moyen de paiement ?',
    promptEn: 'Listen — which payment method?',
    choices: [
      'WeChat Pay (微信)',
      'Alipay (支付宝)',
      'Carte bancaire (刷卡)',
      'Esp\u00E8ces (现金)'
    ],
    correctIndex: 1,
    explanation: '支付宝 (zhī fù bǎo) = Alipay, app de Ant Group/Alibaba. Plus ancien que WeChat Pay, toujours dominant en e-commerce et dans le Sud.',
    explanationEn: '支付宝 (zhī fù bǎo) = Alipay, Ant Group/Alibaba app. Older than WeChat Pay, still dominant in e-commerce and in the South.',
    audioHanzi: '\u652F\u4ED8\u5B9D',
    autoPlay: true
  },
  {
    id: 'cecr-a2-shopping-m3-mcq-reverse',
    type: 'mcq',
    category: 'vocabulary',
    prompt: 'Comment dit-on « payer par carte bancaire » ?',
    promptEn: 'How do you say «pay by card»?',
    choices: ['\u5237\u5361', '\u8F6C\u8D26', '\u6536\u6B3E', '\u626B\u7801'],
    correctIndex: 0,
    explanation: '刷卡 (shuā kǎ) = passer la carte, littéralement « brosser la carte ». 转账 = virement bancaire, 收款 = encaisser, 扫码 = scanner.',
    explanationEn: '刷卡 (shuā kǎ) = to swipe the card, literally «brush the card». 转账 = bank transfer, 收款 = collect payment, 扫码 = scan QR.'
  }
];

// --- A2 Shopping M4 : Classificateurs -------------------------------------
// Flashcards : 个, 本, 张, 条, 件, 把, 杯, 碗, 只, 辆, 双
const A2_SHOPPING_M4: LessonV2Exercise[] = [
  {
    id: 'cecr-a2-shopping-m4-gq1',
    type: 'grammar-quiz',
    category: 'grammar',
    prompt: 'Quel classificateur pour « une paire de chaussures » ?',
    promptEn: 'Which classifier for «a pair of shoes»?',
    choices: ['\u4E00\u4E2A', '\u4E00\u53EA', '\u4E00\u53CC', '\u4E00\u6761'],
    correctIndex: 2,
    explanation: '双 (shuāng) = paire. Utilisé pour tout ce qui va par deux naturellement : 双筷子 (baguettes), 双鞋 (chaussures), 双眼 (yeux). 只 pour un seul d\u2019une paire.',
    explanationEn: '双 (shuāng) = pair. For things that naturally go in pairs: 双筷子 (chopsticks), 双鞋 (shoes), 双眼 (eyes). 只 for just one of a pair.'
  },
  {
    id: 'cecr-a2-shopping-m4-fill1',
    type: 'fill',
    category: 'vocabulary',
    prompt: 'Tu comptes tes livres.',
    promptEn: 'You count your books.',
    sentence: '\u6211\u6709\u4E09 ___ \u4E66\u3002',
    sentenceEn: 'I have three ___ books.',
    choices: ['\u4E2A', '\u672C', '\u5F20', '\u4EF6'],
    correctIndex: 1,
    explanation: '本 (běn) classificateur obligatoire pour les livres. 三个书 ✗ est une erreur de débutant. 张 pour les objets plats (feuille, billet), 件 pour vêtements.',
    explanationEn: '本 (běn) mandatory classifier for books. 三个书 ✗ is beginner\u2019s error. 张 for flat objects (sheet, ticket), 件 for clothes.'
  },
  {
    id: 'cecr-a2-shopping-m4-order1',
    type: 'order',
    category: 'grammar',
    prompt: 'Ordonne : « J\u2019ai deux voitures. »',
    promptEn: 'Reorder: «I have two cars.»',
    sentence: 'J\u2019ai deux voitures.',
    sentenceEn: 'I have two cars.',
    choices: ['\u6211', '\u6709', '\u4E24\u8F86', '\u8F66'],
    correctIndex: 0,
    explanation: 'Structure 我有 + [nombre] + [classif] + [nom]. 辆 (liàng) = classificateur des véhicules (voitures, vélos, bus). Note : 两 (deux) avant classificateur, pas 二.',
    explanationEn: 'Structure 我有 + [number] + [classifier] + [noun]. 辆 (liàng) = vehicle classifier (cars, bikes, buses). Note: 两 (two) before classifier, not 二.'
  },
  {
    id: 'cecr-a2-shopping-m4-trans-zh2fr',
    type: 'translation',
    category: 'translation',
    prompt: 'Traduis : « 请给我一张纸和一把椅子。»',
    promptEn: 'Translate: «请给我一张纸和一把椅子。»',
    choices: [
      'Donne-moi du papier et un crayon.',
      'Donne-moi une feuille de papier et une chaise.',
      'Donne-moi un livre et une chaise.',
      'Donne-moi un verre d\u2019eau et une feuille.'
    ],
    correctIndex: 1,
    explanation: '张 (zhāng) = classificateur des objets plats (papier, billet, table, photo). 把 (bǎ) = objets à poignée ou que l\u2019on saisit (chaise, parapluie, couteau).',
    explanationEn: '张 (zhāng) = classifier for flat objects (paper, ticket, table, photo). 把 (bǎ) = objects with a handle or grip (chair, umbrella, knife).'
  },
  {
    id: 'cecr-a2-shopping-m4-trans-fr2zh',
    type: 'translation',
    category: 'translation',
    prompt: 'Traduis : « Quatre poissons et un pantalon. »',
    promptEn: 'Translate: «Four fish and one pair of trousers.»',
    choices: [
      '\u56DB\u4E2A\u9C7C\u548C\u4E00\u4EF6\u88E4\u5B50\u3002',
      '\u56DB\u6761\u9C7C\u548C\u4E00\u6761\u88E4\u5B50\u3002',
      '\u56DB\u53EA\u9C7C\u548C\u4E00\u4EF6\u88E4\u5B50\u3002',
      '\u56DB\u672C\u9C7C\u548C\u4E00\u4EF6\u88E4\u5B50\u3002'
    ],
    correctIndex: 1,
    explanation: '条 (tiáo) pour les objets longs et fins : poisson, rue, pantalon, serpent, route. Il existe une symétrie : 一条鱼 et 一条裤子 partagent le même classificateur.',
    explanationEn: '条 (tiáo) for long thin objects: fish, road, trousers, snake. Symmetry: 一条鱼 and 一条裤子 share the same classifier.'
  },
  {
    id: 'cecr-a2-shopping-m4-err1',
    type: 'error-correction',
    category: 'grammar',
    prompt: 'Trouve l\u2019erreur : « 我喝一个咖啡。»',
    promptEn: 'Find the error: «我喝一个咖啡。»',
    sentence: '\u6211\u559D\u4E00\u4E2A\u5496\u5561\u3002',
    choices: ['\u6211', '\u4E00\u4E2A', '\u5496\u5561', 'Tout est correct'],
    correctIndex: 1,
    explanation: 'Pour une boisson dans une tasse, 杯 (verre/tasse) est requis. Correct : 我喝一杯咖啡. 个 est toléré oralement mais sonne débutant.',
    explanationEn: 'For a drink in a cup, 杯 (cup/glass) is required. Correct: 我喝一杯咖啡. 个 is tolerated orally but sounds beginner.'
  },
  {
    id: 'cecr-a2-shopping-m4-listen1',
    type: 'mcq',
    category: 'listening',
    prompt: 'Écoute — quel classificateur entends-tu ?',
    promptEn: 'Listen — which classifier do you hear?',
    choices: [
      '张 (objets plats)',
      '条 (objets longs)',
      '件 (v\u00EAtements)',
      '把 (\u00E0 poign\u00E9e)'
    ],
    correctIndex: 2,
    explanation: '件 (jiàn, ton 4) = classificateur pour les vêtements (une pièce : chemise, robe) et certains événements (affaires : 一件事 « une affaire »).',
    explanationEn: '件 (jiàn, tone 4) = classifier for clothing items (shirt, dress) and certain events/matters (一件事 «one matter»).',
    audioHanzi: '\u4EF6',
    autoPlay: true
  },
  {
    id: 'cecr-a2-shopping-m4-mcq-reverse',
    type: 'mcq',
    category: 'vocabulary',
    prompt: 'Quel classificateur pour un chien ou un chat ?',
    promptEn: 'Which classifier for a dog or cat?',
    choices: ['\u4E2A', '\u6761', '\u53EA', '\u672C'],
    correctIndex: 2,
    explanation: '只 (zhī) = classificateur des petits animaux (chat, chien, oiseau, lapin). 条 pour les animaux longs (serpent, poisson). 头 pour gros animaux de ferme (bœuf, cochon).',
    explanationEn: '只 (zhī) = classifier for small animals (cat, dog, bird, rabbit). 条 for long animals (snake, fish). 头 for large farm animals (ox, pig).'
  }
];

// ============================================================================
//  A2 — JOURNÉE & COMMUNICATION (7 modules : day 4 + phone 3)
// ============================================================================

// --- A2 Day M1 : L'heure en chinois ---------------------------------------
// Flashcards : 点, 分, 半, 刻, 差, 上午, 中午, 下午, 晚上, 现在, 几点
const A2_DAY_M1: LessonV2Exercise[] = [
  {
    id: 'cecr-a2-day-m1-gq1',
    type: 'grammar-quiz',
    category: 'grammar',
    prompt: 'Comment dit-on 8h30 de manière la plus naturelle ?',
    promptEn: 'How do you say 8:30 most naturally?',
    choices: ['\u516B\u70B9\u4E09\u5341', '\u516B\u70B9\u534A', '\u516B\u70B9\u4E24\u523B', '\u516B\u4E09\u5341'],
    correctIndex: 1,
    explanation: '八点半 (bā diǎn bàn) = 8h et demie. 半 = moitié. 八点三十分 est correct mais plus administratif. 两刻 (2 quarts) existe mais quasi jamais utilisé.',
    explanationEn: '八点半 (bā diǎn bàn) = 8:30 (half past eight). 半 = half. 八点三十分 works but sounds bureaucratic. 两刻 (2 quarters) exists but hardly used.'
  },
  {
    id: 'cecr-a2-day-m1-fill1',
    type: 'fill',
    category: 'vocabulary',
    prompt: 'Tu demandes l\u2019heure à un passant.',
    promptEn: 'You ask a passer-by for the time.',
    sentence: '\u8BF7\u95EE\uFF0C\u73B0\u5728 ___ \uFF1F',
    sentenceEn: 'Excuse me, what time ___ now?',
    choices: ['\u51E0\u70B9', '\u591A\u5C11', '\u600E\u4E48', '\u5728\u54EA'],
    correctIndex: 0,
    explanation: '几点 (jǐ diǎn) = « quelle heure ? » (nombre attendu ≤ 12). 现在几点 ? = formule fixe. 多少 conviendrait seulement pour un nombre très grand (prix, etc.).',
    explanationEn: '几点 (jǐ diǎn) = «what hour?» (expected number ≤ 12). 现在几点? is a fixed phrase. 多少 would fit only for large numbers (prices, etc.).'
  },
  {
    id: 'cecr-a2-day-m1-order1',
    type: 'order',
    category: 'grammar',
    prompt: 'Ordonne : « On se retrouve à 3h de l\u2019après-midi. »',
    promptEn: 'Reorder: «Let\u2019s meet at 3 pm.»',
    sentence: 'On se retrouve à 3h de l\u2019après-midi.',
    sentenceEn: 'Let\u2019s meet at 3 pm.',
    choices: ['\u6211\u4EEC', '\u4E0B\u5348', '\u4E09\u70B9', '\u89C1'],
    correctIndex: 0,
    explanation: 'Ordre chinois : sujet + période + heure + verbe. 下午 (après-midi) se place AVANT l\u2019heure. Correct : 我们下午三点见.',
    explanationEn: 'Chinese order: subject + period + time + verb. 下午 (afternoon) goes BEFORE the time. Correct: 我们下午三点见.'
  },
  {
    id: 'cecr-a2-day-m1-trans-zh2fr',
    type: 'translation',
    category: 'translation',
    prompt: 'Traduis : « 九点差一刻。»',
    promptEn: 'Translate: «九点差一刻。»',
    choices: [
      '9 h 15',
      '9 h 45',
      '8 h 45 (9 h moins le quart)',
      '8 h 15'
    ],
    correctIndex: 2,
    explanation: '差 (chà) = manquer, « moins ». 九点差一刻 = « 9 heures moins un quart » = 8h45. Structure inversée par rapport à 九点一刻 (9h15).',
    explanationEn: '差 (chà) = to lack, «to/minus». 九点差一刻 = «a quarter to 9» = 8:45. Structure inverted from 九点一刻 (9:15).'
  },
  {
    id: 'cecr-a2-day-m1-trans-fr2zh',
    type: 'translation',
    category: 'translation',
    prompt: 'Traduis : « Il est midi. »',
    promptEn: 'Translate: «It\u2019s noon.»',
    choices: [
      '\u73B0\u5728\u4E0A\u5348\u3002',
      '\u73B0\u5728\u4E2D\u5348\u3002',
      '\u73B0\u5728\u4E0B\u5348\u3002',
      '\u73B0\u5728\u665A\u4E0A\u3002'
    ],
    correctIndex: 1,
    explanation: '中午 (zhōng wǔ) = midi (vers 12h). Décomposition : 上午 (matin) / 中午 (midi) / 下午 (après-midi) / 晚上 (soir). Note : pas de « il est » — 现在 suffit.',
    explanationEn: '中午 (zhōng wǔ) = noon (around 12). Breakdown: 上午 (morning) / 中午 (noon) / 下午 (afternoon) / 晚上 (evening). Note: no «it is» — 现在 is enough.'
  },
  {
    id: 'cecr-a2-day-m1-err1',
    type: 'error-correction',
    category: 'grammar',
    prompt: 'Trouve l\u2019erreur d\u2019ordre : « 我三点下午见他。»',
    promptEn: 'Find the order error: «我三点下午见他。»',
    sentence: '\u6211\u4E09\u70B9\u4E0B\u5348\u89C1\u4ED6\u3002',
    choices: ['\u6211', '\u4E09\u70B9', 'L\u2019ordre \u4E0B\u5348/\u4E09\u70B9', '\u4ED6'],
    correctIndex: 2,
    explanation: 'La période (下午) doit précéder l\u2019heure précise, jamais l\u2019inverse. Correct : 我下午三点见他. Règle : du plus grand au plus petit.',
    explanationEn: 'The period (下午) must precede the precise time, never the reverse. Correct: 我下午三点见他. Rule: big before small.'
  },
  {
    id: 'cecr-a2-day-m1-listen1',
    type: 'mcq',
    category: 'listening',
    prompt: 'Écoute — quelle période de la journée ?',
    promptEn: 'Listen — which part of the day?',
    choices: [
      'Matin (上午)',
      'Midi (中午)',
      'Apr\u00E8s-midi (下午)',
      'Soir (晚上)'
    ],
    correctIndex: 3,
    explanation: '晚上 (wǎn shang) = soir. Ton 3 + ton neutre. Attention à ne pas confondre avec 晚安 (bonne nuit) ou 晚饭 (dîner).',
    explanationEn: '晚上 (wǎn shang) = evening. Tone 3 + neutral. Don\u2019t confuse with 晚安 (good night) or 晚饭 (dinner).',
    audioHanzi: '\u665A\u4E0A',
    autoPlay: true
  },
  {
    id: 'cecr-a2-day-m1-mcq-reverse',
    type: 'mcq',
    category: 'vocabulary',
    prompt: 'Quel mot signifie « un quart (15 min) » ?',
    promptEn: 'Which word means «a quarter (15 min)»?',
    choices: ['\u534A', '\u523B', '\u5206', '\u70B9'],
    correctIndex: 1,
    explanation: '刻 (kè) = un quart d\u2019heure. 一刻 (15 min), 三刻 (45 min). Littéralement « marque » (vient des anciennes clepsydres graduées).',
    explanationEn: '刻 (kè) = a quarter-hour. 一刻 (15 min), 三刻 (45 min). Literally «mark» (from ancient graduated water clocks).'
  }
];

// --- A2 Day M2 : Routine quotidienne --------------------------------------
// Flashcards : 起床, 刷牙, 洗脸, 吃早饭, 上班, 下班, 睡觉, 每天, 常常, 有时候, 从不
const A2_DAY_M2: LessonV2Exercise[] = [
  {
    id: 'cecr-a2-day-m2-gq1',
    type: 'grammar-quiz',
    category: 'grammar',
    prompt: 'Où place-t-on le temps (« chaque jour ») en chinois ?',
    promptEn: 'Where does time («every day») go in Chinese?',
    choices: ['Apr\u00E8s le verbe', 'Avant le verbe', 'En fin de phrase', 'Apr\u00E8s l\u2019objet'],
    correctIndex: 1,
    explanation: 'En chinois, le temps est TOUJOURS avant le verbe. 我每天起床 ✓ / 我起床每天 ✗. Peut aussi être avant le sujet : 每天我起床.',
    explanationEn: 'In Chinese, time ALWAYS comes before the verb. 我每天起床 ✓ / 我起床每天 ✗. Can also precede the subject: 每天我起床.'
  },
  {
    id: 'cecr-a2-day-m2-fill1',
    type: 'fill',
    category: 'vocabulary',
    prompt: 'Tu décris ton réveil matinal.',
    promptEn: 'You describe your morning wake-up.',
    sentence: '\u6211\u6BCF\u5929\u4E03\u70B9 ___ \u3002',
    sentenceEn: 'I ___ every day at 7.',
    choices: ['\u7761\u89C9', '\u8D77\u5E8A', '\u4E0B\u73ED', '\u523B'],
    correctIndex: 1,
    explanation: '起床 (qǐ chuáng) = se lever (du lit). Littéralement « sortir du lit ». 睡觉 = dormir (inverse). 下班 = finir le travail.',
    explanationEn: '起床 (qǐ chuáng) = get up (out of bed). Literally «rise from bed». 睡觉 = to sleep (opposite). 下班 = to leave work.'
  },
  {
    id: 'cecr-a2-day-m2-order1',
    type: 'order',
    category: 'grammar',
    prompt: 'Ordonne : « Je prends rarement le métro. »',
    promptEn: 'Reorder: «I rarely take the subway.»',
    sentence: 'Je prends rarement le métro.',
    sentenceEn: 'I rarely take the subway.',
    choices: ['\u6211', '\u5F88\u5C11', '\u5750', '\u5730\u94C1'],
    correctIndex: 0,
    explanation: '很少 (hěn shǎo) = rarement. Se place AVANT le verbe (comme 常常, 有时候, 从不). Correct : 我很少坐地铁.',
    explanationEn: '很少 (hěn shǎo) = rarely. Placed BEFORE the verb (like 常常, 有时候, 从不). Correct: 我很少坐地铁.'
  },
  {
    id: 'cecr-a2-day-m2-trans-zh2fr',
    type: 'translation',
    category: 'translation',
    prompt: 'Traduis : « 我晚上十一点睡觉。»',
    promptEn: 'Translate: «我晚上十一点睡觉。»',
    choices: [
      'Je me l\u00E8ve \u00E0 11h du soir.',
      'Je dors \u00E0 11h du matin.',
      'Je me couche \u00E0 23h.',
      'Je finis le travail \u00E0 23h.'
    ],
    correctIndex: 2,
    explanation: '睡觉 = se coucher/dormir. 晚上 (soir) + 十一点 (11h) → 23h. Ordre chinois : période → heure → action.',
    explanationEn: '睡觉 = to go to bed/sleep. 晚上 (evening) + 十一点 (11) → 23:00. Chinese order: period → time → action.'
  },
  {
    id: 'cecr-a2-day-m2-trans-fr2zh',
    type: 'translation',
    category: 'translation',
    prompt: 'Traduis : « Je ne bois jamais de café. »',
    promptEn: 'Translate: «I never drink coffee.»',
    choices: [
      '\u6211\u5F88\u5C11\u559D\u5496\u5561\u3002',
      '\u6211\u4ECE\u4E0D\u559D\u5496\u5561\u3002',
      '\u6211\u6709\u65F6\u5019\u559D\u5496\u5561\u3002',
      '\u6211\u5E38\u5E38\u559D\u5496\u5561\u3002'
    ],
    correctIndex: 1,
    explanation: '从不 (cóng bù) = « jamais » (habituel, jamais de la vie). 从来不 est synonyme. 很少 = rarement, 有时候 = parfois, 常常 = souvent.',
    explanationEn: '从不 (cóng bù) = «never» (habitual, never in life). 从来不 synonym. 很少 = rarely, 有时候 = sometimes, 常常 = often.'
  },
  {
    id: 'cecr-a2-day-m2-err1',
    type: 'error-correction',
    category: 'grammar',
    prompt: 'Trouve l\u2019erreur : « 我吃早饭每天。»',
    promptEn: 'Find the error: «我吃早饭每天。»',
    sentence: '\u6211\u5403\u65E9\u996D\u6BCF\u5929\u3002',
    choices: ['\u6211', '\u5403', 'Place de \u6BCF\u5929', '\u65E9\u996D'],
    correctIndex: 2,
    explanation: '每天 doit venir AVANT le verbe, jamais après l\u2019objet. Correct : 我每天吃早饭. Règle fondamentale : temps → sujet/verbe → objet.',
    explanationEn: '每天 must come BEFORE the verb, never after the object. Correct: 我每天吃早饭. Fundamental rule: time → subject/verb → object.'
  },
  {
    id: 'cecr-a2-day-m2-listen1',
    type: 'mcq',
    category: 'listening',
    prompt: 'Écoute — quelle action quotidienne ?',
    promptEn: 'Listen — which daily action?',
    choices: [
      'Se lever (起床)',
      'Se brosser les dents (刷牙)',
      'Aller au travail (上班)',
      'Dormir (睡觉)'
    ],
    correctIndex: 1,
    explanation: '刷牙 (shuā yá) = se brosser les dents. Littéralement « brosser-dents ». Verbe + objet en un seul bloc. Ne se décompose pas en usage.',
    explanationEn: '刷牙 (shuā yá) = to brush teeth. Literally «brush-teeth». Verb + object as a single chunk. Not decomposable in use.',
    audioHanzi: '\u5237\u7259',
    autoPlay: true
  },
  {
    id: 'cecr-a2-day-m2-mcq-reverse',
    type: 'mcq',
    category: 'vocabulary',
    prompt: 'Comment dit-on « souvent » ?',
    promptEn: 'How do you say «often»?',
    choices: ['\u4ECE\u4E0D', '\u5E38\u5E38', '\u6709\u65F6\u5019', '\u5F88\u5C11'],
    correctIndex: 1,
    explanation: '常常 (cháng cháng) = souvent. Réduplication de 常. 经常 (jīng cháng) est synonyme à fréquence équivalente, plus écrit. Tous se placent avant le verbe.',
    explanationEn: '常常 (cháng cháng) = often. Reduplication of 常. 经常 (jīng cháng) is synonym, more written. All placed before the verb.'
  }
];

// --- A2 Day M3 : Météo & saisons ------------------------------------------
// Flashcards : 天气, 冷, 热, 暖和, 凉快, 下雨, 下雪, 刮风, 春天, 夏天, 秋天, 冬天
const A2_DAY_M3: LessonV2Exercise[] = [
  {
    id: 'cecr-a2-day-m3-gq1',
    type: 'grammar-quiz',
    category: 'grammar',
    prompt: 'Quel mot NE DOIT PAS se trouver dans la phrase « 今天天气很热 » ?',
    promptEn: 'Which word MUST NOT appear in «今天天气很热»?',
    choices: ['\u5F88', '\u662F', '\u7684', '\u4E86'],
    correctIndex: 1,
    explanation: 'Avec un adjectif, JAMAIS de 是. 很 seul suffit à relier sujet et adjectif. 今天天气很热 ✓, 今天天气是热 ✗. Règle absolue du chinois.',
    explanationEn: 'With an adjective, NEVER use 是. 很 alone links subject and adjective. 今天天气很热 ✓, 今天天气是热 ✗. Absolute Chinese rule.'
  },
  {
    id: 'cecr-a2-day-m3-fill1',
    type: 'fill',
    category: 'vocabulary',
    prompt: 'En décembre à Pékin, il fait...',
    promptEn: 'In December in Beijing, it\u2019s...',
    sentence: '\u5317\u4EAC\u51AC\u5929\u5F88 ___ \u3002',
    sentenceEn: 'Beijing winter is very ___.',
    choices: ['\u70ED', '\u51B7', '\u6696\u548C', '\u51C9\u5FEB'],
    correctIndex: 1,
    explanation: '冷 (lěng) = froid. 热 (rè) = chaud. 暖和 (nuǎn huo) = doux/tiède (positif). 凉快 (liáng kuai) = frais agréable.',
    explanationEn: '冷 (lěng) = cold. 热 (rè) = hot. 暖和 (nuǎn huo) = mild/warm (positive). 凉快 (liáng kuai) = pleasantly cool.'
  },
  {
    id: 'cecr-a2-day-m3-order1',
    type: 'order',
    category: 'grammar',
    prompt: 'Ordonne : « Il pleut aujourd\u2019hui. »',
    promptEn: 'Reorder: «It\u2019s raining today.»',
    sentence: 'Il pleut aujourd\u2019hui.',
    sentenceEn: 'It\u2019s raining today.',
    choices: ['\u4ECA\u5929', '\u4E0B\u96E8', '\u4E86'],
    correctIndex: 0,
    explanation: '下雨 (xià yǔ) = pleuvoir (verbe + objet, lit. « tomber pluie »). Le sujet n\u2019est pas exprimé : 今天下雨了 = « aujourd\u2019hui, il a commencé à pleuvoir ». 了 marque le changement.',
    explanationEn: '下雨 (xià yǔ) = to rain (verb + object, lit. «fall rain»). Subject omitted: 今天下雨了 = «today it\u2019s started raining». 了 marks change.'
  },
  {
    id: 'cecr-a2-day-m3-trans-zh2fr',
    type: 'translation',
    category: 'translation',
    prompt: 'Traduis : « 春天的天气很暖和。»',
    promptEn: 'Translate: «春天的天气很暖和。»',
    choices: [
      'Le temps du printemps est froid.',
      'Le temps du printemps est doux.',
      'Le temps de l\u2019\u00E9t\u00E9 est chaud.',
      'Le temps de l\u2019automne est frais.'
    ],
    correctIndex: 1,
    explanation: '春天 (chūn tiān) = printemps. 暖和 = doux/tiède (agréablement chaud). 的 lie un qualificatif. 很 est la liaison neutre obligatoire.',
    explanationEn: '春天 (chūn tiān) = spring. 暖和 = mild/warm (pleasantly warm). 的 links a qualifier. 很 is the mandatory neutral link.'
  },
  {
    id: 'cecr-a2-day-m3-trans-fr2zh',
    type: 'translation',
    category: 'translation',
    prompt: 'Traduis : « Il neige en hiver. »',
    promptEn: 'Translate: «It snows in winter.»',
    choices: [
      '\u51AC\u5929\u4E0B\u96E8\u3002',
      '\u51AC\u5929\u4E0B\u96EA\u3002',
      '\u51AC\u5929\u5237\u98CE\u3002',
      '\u51AC\u5929\u5F88\u70ED\u3002'
    ],
    correctIndex: 1,
    explanation: '下雪 (xià xuě) = neiger. 下 + phénomène : 下雨 (pleuvoir), 下雪 (neiger), mais 刮风 (venter, avec 刮 « souffler »).',
    explanationEn: '下雪 (xià xuě) = to snow. 下 + phenomenon: 下雨 (rain), 下雪 (snow), but 刮风 (wind, with 刮 «blow»).'
  },
  {
    id: 'cecr-a2-day-m3-err1',
    type: 'error-correction',
    category: 'grammar',
    prompt: 'Trouve l\u2019erreur : « 今天下风。»',
    promptEn: 'Find the error: «今天下风。»',
    sentence: '\u4ECA\u5929\u4E0B\u98CE\u3002',
    choices: ['\u4ECA\u5929', '\u4E0B', '\u98CE', '\u7D50\u69CB'],
    correctIndex: 1,
    explanation: 'Le vent ne « tombe » pas en chinois. Verbe correct : 刮 (guā, souffler). Correct : 今天刮风. 下 est réservé à la pluie et à la neige.',
    explanationEn: 'Wind doesn\u2019t «fall» in Chinese. Correct verb: 刮 (guā, to blow). Correct: 今天刮风. 下 is reserved for rain and snow.'
  },
  {
    id: 'cecr-a2-day-m3-listen1',
    type: 'mcq',
    category: 'listening',
    prompt: 'Écoute — quelle saison ?',
    promptEn: 'Listen — which season?',
    choices: [
      'Printemps (春天)',
      '\u00C9t\u00E9 (夏天)',
      'Automne (秋天)',
      'Hiver (冬天)'
    ],
    correctIndex: 1,
    explanation: '夏天 (xià tiān) = été. Ton 4 + ton 1. Très chaud dans la plupart des régions chinoises, souvent avec tempêtes (tifū, 台风 typhons).',
    explanationEn: '夏天 (xià tiān) = summer. Tone 4 + tone 1. Very hot in most of China, often with tifū (台风 typhoons).',
    audioHanzi: '\u590F\u5929',
    autoPlay: true
  },
  {
    id: 'cecr-a2-day-m3-mcq-reverse',
    type: 'mcq',
    category: 'vocabulary',
    prompt: 'Comment dit-on « automne » en chinois ?',
    promptEn: 'How do you say «autumn»?',
    choices: ['\u6625\u5929', '\u590F\u5929', '\u79CB\u5929', '\u51AC\u5929'],
    correctIndex: 2,
    explanation: '秋天 (qiū tiān) = automne. Les 4 saisons suivent 春夏秋冬 (le printemps, l\u2019été, l\u2019automne, l\u2019hiver). Facile à retenir : même suffixe 天 pour les 4.',
    explanationEn: '秋天 (qiū tiān) = autumn. 4 seasons: 春夏秋冬 (spring, summer, autumn, winter). Easy mnemonic: same suffix 天 for all 4.'
  }
];

// --- A2 Day M4 : Dates & jours --------------------------------------------
// Flashcards : 年, 月, 日, 号, 星期, 星期一, 星期二, 星期天, 今天, 明天, 昨天
const A2_DAY_M4: LessonV2Exercise[] = [
  {
    id: 'cecr-a2-day-m4-gq1',
    type: 'grammar-quiz',
    category: 'grammar',
    prompt: 'Dans quel ordre écrit-on une date en chinois ?',
    promptEn: 'In what order do you write a Chinese date?',
    choices: ['Jour-mois-ann\u00E9e', 'Mois-jour-ann\u00E9e', 'Ann\u00E9e-mois-jour', 'Jour-ann\u00E9e-mois'],
    correctIndex: 2,
    explanation: 'Le chinois va du plus grand au plus petit : 2026年4月22日 (2026-04-22). Exactement l\u2019inverse du français et de l\u2019américain. Même logique pour adresses et heures.',
    explanationEn: 'Chinese goes largest-to-smallest: 2026年4月22日 (2026-04-22). Opposite of French and US formats. Same logic for addresses and times.'
  },
  {
    id: 'cecr-a2-day-m4-fill1',
    type: 'fill',
    category: 'vocabulary',
    prompt: 'Tu demandes quel jour on est.',
    promptEn: 'You ask what day it is.',
    sentence: '\u4ECA\u5929\u661F\u671F ___ \uFF1F',
    sentenceEn: 'What day of the week is today?',
    choices: ['\u51E0', '\u54EA', '\u591A\u5C11', '\u4EC0\u4E48'],
    correctIndex: 0,
    explanation: '星期几 ? = « quel jour (de la semaine) ? » formulaire fixe. 几 pour un chiffre entre 1 et 6 attendu. 哪 ✗ ici (哪 = « lequel parmi »).',
    explanationEn: '星期几? = «which day (of the week)?» set phrase. 几 expects a digit 1-6. 哪 ✗ here (哪 = «which among»).'
  },
  {
    id: 'cecr-a2-day-m4-order1',
    type: 'order',
    category: 'grammar',
    prompt: 'Ordonne : « Mon anniversaire est le 5 mai. »',
    promptEn: 'Reorder: «My birthday is May 5th.»',
    sentence: 'Mon anniversaire est le 5 mai.',
    sentenceEn: 'My birthday is May 5th.',
    choices: ['\u6211\u7684\u751F\u65E5', '\u662F', '\u4E94\u6708', '\u4E94\u53F7'],
    correctIndex: 0,
    explanation: 'Date : 5月5号 (mois avant jour, grand → petit). Avec 是 car c\u2019est une identification (pas un adjectif). Correct : 我的生日是五月五号.',
    explanationEn: 'Date: 5月5号 (month before day, big → small). With 是 because it\u2019s identification (not an adjective). Correct: 我的生日是五月五号.'
  },
  {
    id: 'cecr-a2-day-m4-trans-zh2fr',
    type: 'translation',
    category: 'translation',
    prompt: 'Traduis : « 今天星期天。»',
    promptEn: 'Translate: «今天星期天。»',
    choices: [
      'Aujourd\u2019hui c\u2019est lundi.',
      'Aujourd\u2019hui c\u2019est samedi.',
      'Aujourd\u2019hui c\u2019est dimanche.',
      'Aujourd\u2019hui c\u2019est un jour f\u00E9ri\u00E9.'
    ],
    correctIndex: 2,
    explanation: '星期天 (xīng qī tiān) OU 星期日 = dimanche. Le seul jour qui ne suit pas un chiffre (星期一 lundi, 二 mardi...). Pas de 是 requis avec 星期+jour.',
    explanationEn: '星期天 (xīng qī tiān) OR 星期日 = Sunday. The only day not following a digit (星期一 Mon, 二 Tue...). No 是 needed with 星期+day.'
  },
  {
    id: 'cecr-a2-day-m4-trans-fr2zh',
    type: 'translation',
    category: 'translation',
    prompt: 'Traduis : « Demain c\u2019est lundi. »',
    promptEn: 'Translate: «Tomorrow is Monday.»',
    choices: [
      '\u660E\u5929\u661F\u671F\u4E00\u3002',
      '\u6628\u5929\u661F\u671F\u4E00\u3002',
      '\u4ECA\u5929\u661F\u671F\u4E00\u3002',
      '\u660E\u5929\u661F\u671F\u5929\u3002'
    ],
    correctIndex: 0,
    explanation: '明天 (míng tiān) = demain. 星期一 = lundi. 昨天 (zuó tiān) = hier. 今天 = aujourd\u2019hui. Les jours 星期一 à 星期六 suivent la numérotation 1→6.',
    explanationEn: '明天 (míng tiān) = tomorrow. 星期一 = Monday. 昨天 (zuó tiān) = yesterday. 今天 = today. Days 星期一 to 星期六 follow 1→6 numbering.'
  },
  {
    id: 'cecr-a2-day-m4-err1',
    type: 'error-correction',
    category: 'grammar',
    prompt: 'Trouve l\u2019erreur : « 5号4月2026年。»',
    promptEn: 'Find the error: «5号4月2026年。»',
    sentence: '5\u53F74\u67082026\u5E74\u3002',
    choices: ['5\u53F7', '4\u6708', '2026\u5E74', 'L\u2019ordre'],
    correctIndex: 3,
    explanation: 'L\u2019ordre est inversé : le chinois va du grand au petit. Correct : 2026年4月5号. Jamais jour-mois-année en chinois.',
    explanationEn: 'Order is reversed: Chinese goes big to small. Correct: 2026年4月5号. Never day-month-year in Chinese.'
  },
  {
    id: 'cecr-a2-day-m4-listen1',
    type: 'mcq',
    category: 'listening',
    prompt: 'Écoute — quel moment ?',
    promptEn: 'Listen — which moment?',
    choices: [
      'Hier (昨天)',
      'Aujourd\u2019hui (今天)',
      'Demain (明天)',
      'La semaine prochaine (下周)'
    ],
    correctIndex: 2,
    explanation: '明天 (míng tiān, ton 2 + ton 1) = demain. Le 明 signifie aussi « brillant, clair » (lendemain = prochain jour lumineux).',
    explanationEn: '明天 (míng tiān, tone 2 + tone 1) = tomorrow. 明 also means «bright/clear» (tomorrow = next bright day).',
    audioHanzi: '\u660E\u5929',
    autoPlay: true
  },
  {
    id: 'cecr-a2-day-m4-mcq-reverse',
    type: 'mcq',
    category: 'vocabulary',
    prompt: 'Comment dit-on « mercredi » ?',
    promptEn: 'How do you say «Wednesday»?',
    choices: ['\u661F\u671F\u4E8C', '\u661F\u671F\u4E09', '\u661F\u671F\u56DB', '\u661F\u671F\u4E94'],
    correctIndex: 1,
    explanation: '星期三 (xīng qī sān) = mercredi (3e jour après lundi). Les chiffres 1-6 correspondent aux jours lundi-samedi. Dimanche fait exception : 星期天/日.',
    explanationEn: '星期三 (xīng qī sān) = Wednesday (3rd day after Monday). Digits 1-6 map to Mon-Sat. Sunday is the exception: 星期天/日.'
  }
];

// ============================================================================
//  A2 PHONE — Décrocher, raccrocher (M1)
// ============================================================================

const A2_PHONE_M1: LessonV2Exercise[] = [
  {
    id: 'cecr-a2-phone-m1-grammar1',
    type: 'grammar-quiz',
    category: 'grammar',
    prompt: 'Quelle est la façon conventionnelle de dire « allô ? » au téléphone en chinois ?',
    promptEn: 'What is the conventional Chinese phone «hello»?',
    choices: ['\u4F60\u597D\uFF1F', '\u55C2\uFF1F', '\u55E8\uFF1F', '\u5582\uFF01'],
    correctIndex: 1,
    explanation: 'Au téléphone, on dit 喂 ? avec un ton 2 montant (presque « wéi »), bien que le caractère soit officiellement ton 4. 你好 existe mais sonne formel/froid au téléphone.',
    explanationEn: 'On the phone, 喂? is said with a rising tone 2 (almost «wéi»), though the character is officially tone 4. 你好 exists but sounds formal/cold on the phone.'
  },
  {
    id: 'cecr-a2-phone-m1-fill1',
    type: 'fill',
    category: 'vocabulary',
    prompt: 'Je voudrais te passer un coup de fil...',
    promptEn: 'I\u2019d like to call you...',
    sentence: '\u6211\u60F3 ___ \u4F60\u3002',
    sentenceEn: 'I want to ___ you.',
    choices: ['\u6253\u7535\u8BDD\u7ED9', '\u63A5\u7535\u8BDD', '\u6302\u7535\u8BDD', '\u542C\u7535\u8BDD'],
    correctIndex: 0,
    explanation: '打电话给 (dǎ diànhuà gěi) = appeler (qqn). Littéralement « frapper téléphone pour ». 接电话 = décrocher/répondre. 挂电话 = raccrocher.',
    explanationEn: '打电话给 (dǎ diànhuà gěi) = call (someone). Lit. «hit phone for». 接电话 = pick up/answer. 挂电话 = hang up.'
  },
  {
    id: 'cecr-a2-phone-m1-order1',
    type: 'order',
    category: 'grammar',
    prompt: 'Ordonne : « Je te rappelle dans un instant. »',
    promptEn: 'Reorder: «I\u2019ll call you back in a moment.»',
    sentence: 'Je te rappelle dans un instant.',
    sentenceEn: 'I\u2019ll call you back in a moment.',
    choices: ['\u6211', '\u4E00\u4F1A\u513F', '\u6253\u7ED9', '\u4F60'],
    correctIndex: 0,
    explanation: '我一会儿打给你 = « moi + dans un instant + appeler à + toi ». 一会儿 (yí huì r) = un moment, se place après le sujet et avant le verbe (indicateur de temps).',
    explanationEn: '我一会儿打给你 = «me + in a moment + call to + you». 一会儿 (yí huì r) = a little while, placed after subject and before verb (time indicator).'
  },
  {
    id: 'cecr-a2-phone-m1-trans-zh2fr',
    type: 'translation',
    category: 'translation',
    prompt: 'Traduis : « 喂 ? 你是哪位 ? »',
    promptEn: 'Translate: «喂？你是哪位？»',
    choices: [
      'All\u00F4 ? Qui \u00EAtes-vous ?',
      'All\u00F4 ? O\u00F9 \u00EAtes-vous ?',
      'Salut ! C\u2019est qui ?',
      '\u00C9coute, qui parle ?'
    ],
    correctIndex: 0,
    explanation: '你是哪位 ? (nǐ shì nǎ wèi ?) = « vous êtes quelle personne ? » — formule polie au téléphone. 哪位 est plus respectueux que 谁 (familier).',
    explanationEn: '你是哪位? (nǐ shì nǎ wèi?) = «which person are you?» — polite phone formula. 哪位 is more respectful than 谁 (casual).'
  },
  {
    id: 'cecr-a2-phone-m1-trans-fr2zh',
    type: 'translation',
    category: 'translation',
    prompt: 'Traduis : « Je suis Marie. »',
    promptEn: 'Translate: «This is Marie (I am Marie).»',
    choices: [
      '\u6211\u662F\u9A6C\u4E3D\u3002',
      '\u6211\u53EB\u9A6C\u4E3D\u3002',
      '\u6211\u7684\u540D\u5B57\u9A6C\u4E3D\u3002',
      '\u8FD9\u662F\u9A6C\u4E3D\u3002'
    ],
    correctIndex: 0,
    explanation: '我是 + [nom] = « je suis [nom] », formule classique pour se présenter au téléphone. 我叫 + [nom] est aussi correct mais 我是 est plus direct.',
    explanationEn: '我是 + [name] = «I am [name]», classic phone self-introduction. 我叫 + [name] also works but 我是 is more direct.'
  },
  {
    id: 'cecr-a2-phone-m1-err1',
    type: 'error-correction',
    category: 'grammar',
    prompt: 'Trouve l\u2019erreur : « 我打电话你。»',
    promptEn: 'Find the error: «我打电话你。»',
    sentence: '\u6211\u6253\u7535\u8BDD\u4F60\u3002',
    choices: ['\u6211', '\u6253\u7535\u8BDD', '\u4F60', 'manque \u7ED9'],
    correctIndex: 3,
    explanation: '打电话 (V+O) ne peut pas prendre un COI direct — il faut 给 : 我打电话给你 ou 我给你打电话. 给 (gěi) = « à, pour ». C\u2019est une structure verbe-objet détachable.',
    explanationEn: '打电话 (V+O) can\u2019t take a direct indirect object — 给 is required: 我打电话给你 or 我给你打电话. 给 (gěi) = «to, for». This is a detachable verb-object structure.'
  },
  {
    id: 'cecr-a2-phone-m1-listen1',
    type: 'mcq',
    category: 'listening',
    prompt: '\u00C9coute \u2014 que veut dire ce mot ?',
    promptEn: 'Listen \u2014 what does this word mean?',
    choices: ['All\u00F4 ?', 'Merci !', 'Au revoir', '\u00C9coute !'],
    correctIndex: 0,
    explanation: '喂 (wèi / wéi au téléphone) = allô ? Au téléphone seulement ; dans d\u2019autres contextes 喂 peut signifier « hep ! » pour attirer l\u2019attention, un peu rude.',
    explanationEn: '喂 (wèi / wéi on the phone) = hello? Only on the phone; in other contexts 喂 can mean «hey!» to grab attention, somewhat rude.',
    audioHanzi: '\u5582',
    autoPlay: true
  },
  {
    id: 'cecr-a2-phone-m1-mcq-reverse',
    type: 'mcq',
    category: 'vocabulary',
    prompt: 'Comment dit-on « raccrocher (le téléphone) » ?',
    promptEn: 'How do you say «hang up (the phone)»?',
    choices: ['\u6253\u7535\u8BDD', '\u63A5\u7535\u8BDD', '\u6302\u7535\u8BDD', '\u542C\u7535\u8BDD'],
    correctIndex: 2,
    explanation: '挂电话 (guà diànhuà) = raccrocher (挂 = suspendre, accrocher). 打 = appeler, 接 = décrocher. Mnémotechnique : 挂 comme « accrocher le combiné sur son support ».',
    explanationEn: '挂电话 (guà diànhuà) = hang up (挂 = hang, hook up). 打 = call, 接 = pick up. Mnemonic: 挂 as in «hang the receiver back on its hook».'
  }
];

// ============================================================================
//  A2 PHONE — Messages WeChat (M2)
// ============================================================================

const A2_PHONE_M2: LessonV2Exercise[] = [
  {
    id: 'cecr-a2-phone-m2-grammar1',
    type: 'grammar-quiz',
    category: 'vocabulary',
    prompt: 'Que signifie littéralement 微信 (Wēi Xìn) ?',
    promptEn: 'What does 微信 (Wēi Xìn) literally mean?',
    choices: ['Grand message', 'Micro-message', 'Message rapide', 'Message secret'],
    correctIndex: 1,
    explanation: '微 (wēi) = micro/petit ; 信 (xìn) = message/lettre. Le nom reflète la nature « courts messages instantanés » de l\u2019app. Par comparaison WhatsApp = « what\u2019s up + app ».',
    explanationEn: '微 (wēi) = micro/small; 信 (xìn) = message/letter. The name reflects the «short instant messages» nature of the app. Compare WhatsApp = «what\u2019s up + app».'
  },
  {
    id: 'cecr-a2-phone-m2-fill1',
    type: 'fill',
    category: 'vocabulary',
    prompt: 'Pour ajouter un nouvel ami sur WeChat, on utilise souvent...',
    promptEn: 'To add a new friend on WeChat, you often use...',
    sentence: '\u6211\u4EEC ___ \u5427\uFF01',
    sentenceEn: 'Let\u2019s ___!',
    choices: ['\u626B\u4E00\u626B', '\u5403\u4E00\u5403', '\u770B\u4E00\u770B', '\u542C\u4E00\u542C'],
    correctIndex: 0,
    explanation: '扫一扫 (sǎo yī sǎo) = scanner (le QR code). Redoublement V一V = « faire un petit peu de V ». 扫 = balayer. Expression ultra-fréquente en Chine pour échanger les contacts.',
    explanationEn: '扫一扫 (sǎo yī sǎo) = scan (the QR code). V一V reduplication = «do a quick V». 扫 = sweep. Extremely common phrase in China for exchanging contacts.'
  },
  {
    id: 'cecr-a2-phone-m2-order1',
    type: 'order',
    category: 'grammar',
    prompt: 'Ordonne : « Je t\u2019envoie un message vocal. »',
    promptEn: 'Reorder: «I\u2019m sending you a voice message.»',
    sentence: 'Je t\u2019envoie un message vocal.',
    sentenceEn: 'I\u2019m sending you a voice message.',
    choices: ['\u6211', '\u7ED9\u4F60', '\u53D1', '\u4E00\u4E2A\u8BED\u97F3'],
    correctIndex: 0,
    explanation: '我给你发一个语音 = « moi + pour toi + envoyer + un vocal ». 给 + personne marque le destinataire, placé avant le verbe. 一个 est le classificateur neutre.',
    explanationEn: '我给你发一个语音 = «me + for you + send + one voice». 给 + person marks the recipient, placed before the verb. 一个 is the neutral classifier.'
  },
  {
    id: 'cecr-a2-phone-m2-trans-zh2fr',
    type: 'translation',
    category: 'translation',
    prompt: 'Traduis : « 我在朋友圈发了一张照片。»',
    promptEn: 'Translate: «我在朋友圈发了一张照片。»',
    choices: [
      'J\u2019ai ajout\u00E9 un ami sur WeChat.',
      'J\u2019ai post\u00E9 une photo sur Moments.',
      'J\u2019ai envoy\u00E9 une photo \u00E0 un ami.',
      'J\u2019ai sauvegard\u00E9 une photo.'
    ],
    correctIndex: 1,
    explanation: '朋友圈 (péngyou quān, lit. « cercle d\u2019amis ») = Moments, le fil d\u2019actualité de WeChat. 发 + 了 = action accomplie. 一张 = classificateur pour photos/feuilles.',
    explanationEn: '朋友圈 (péngyou quān, lit. «friend circle») = Moments, the WeChat feed. 发 + 了 = completed action. 一张 = classifier for photos/sheets.'
  },
  {
    id: 'cecr-a2-phone-m2-trans-fr2zh',
    type: 'translation',
    category: 'translation',
    prompt: 'Traduis : « Ajoute-moi sur WeChat. »',
    promptEn: 'Translate: «Add me on WeChat.»',
    choices: [
      '\u52A0\u6211\u7684\u5FAE\u4FE1\u3002',
      '\u5173\u6389\u6211\u7684\u5FAE\u4FE1\u3002',
      '\u5220\u6389\u6211\u7684\u5FAE\u4FE1\u3002',
      '\u5F00\u59CB\u6211\u7684\u5FAE\u4FE1\u3002'
    ],
    correctIndex: 0,
    explanation: '加 (jiā) = ajouter. 加我的微信 ou plus concis 加我微信 = « ajoute mon WeChat ». 加好友 seul = « ajouter un ami ». Formule quotidienne pour échanger un contact.',
    explanationEn: '加 (jiā) = add. 加我的微信 or more concise 加我微信 = «add my WeChat». 加好友 alone = «add a friend». Daily phrase for exchanging a contact.'
  },
  {
    id: 'cecr-a2-phone-m2-err1',
    type: 'error-correction',
    category: 'grammar',
    prompt: 'Trouve l\u2019erreur : « 我发消息朋友。»',
    promptEn: 'Find the error: «我发消息朋友。»',
    sentence: '\u6211\u53D1\u6D88\u606F\u670B\u53CB\u3002',
    choices: ['\u6211', '\u53D1\u6D88\u606F', '\u670B\u53CB', 'manque \u7ED9'],
    correctIndex: 3,
    explanation: 'Pour indiquer le destinataire, il faut 给 : 我给朋友发消息 (je envoie un message à un ami). Sans 给, la structure est agrammaticale : 发消息 ne prend pas d\u2019objet humain direct.',
    explanationEn: 'To mark the recipient, 给 is required: 我给朋友发消息 (I send a message to a friend). Without 给, the structure is ungrammatical: 发消息 doesn\u2019t take a direct human object.'
  },
  {
    id: 'cecr-a2-phone-m2-listen1',
    type: 'mcq',
    category: 'listening',
    prompt: '\u00C9coute \u2014 quelle application ?',
    promptEn: 'Listen \u2014 which app?',
    choices: ['WeChat (\u5FAE\u4FE1)', 'Weibo (\u5FAE\u535A)', 'Douyin (\u6296\u97F3)', 'QQ'],
    correctIndex: 0,
    explanation: '微信 (Wēi Xìn) = WeChat. Ton 1 + ton 4. L\u2019app chinoise la plus utilisée, largement plus qu\u2019un messenger : portefeuille, mini-apps, réseau social...',
    explanationEn: '微信 (Wēi Xìn) = WeChat. Tone 1 + tone 4. China\u2019s most-used app, far more than a messenger: wallet, mini-apps, social network...',
    audioHanzi: '\u5FAE\u4FE1',
    autoPlay: true
  },
  {
    id: 'cecr-a2-phone-m2-mcq-reverse',
    type: 'mcq',
    category: 'vocabulary',
    prompt: 'Comment dit-on « liker (un post) » ?',
    promptEn: 'How do you say «like (a post)»?',
    choices: ['\u8BC4\u8BBA', '\u70B9\u8D5E', '\u5206\u4EAB', '\u6536\u85CF'],
    correctIndex: 1,
    explanation: '点赞 (diǎn zàn) = liker (lit. « cliquer + approbation »). 评论 = commenter. 分享 = partager. 收藏 = enregistrer/mettre en favoris. Mnémotechnique : 赞 = « louer, approuver ».',
    explanationEn: '点赞 (diǎn zàn) = to like (lit. «tap + praise»). 评论 = to comment. 分享 = to share. 收藏 = to save/favorite. Mnemonic: 赞 = «praise, approve».'
  }
];

// ============================================================================
//  A2 PHONE — Urgence & problème (M3)
// ============================================================================

const A2_PHONE_M3: LessonV2Exercise[] = [
  {
    id: 'cecr-a2-phone-m3-grammar1',
    type: 'grammar-quiz',
    category: 'vocabulary',
    prompt: 'Quel num\u00E9ro appeler pour une ambulance en Chine ?',
    promptEn: 'Which number do you call for an ambulance in China?',
    choices: ['110', '119', '120', '112'],
    correctIndex: 2,
    explanation: 'Les 3 num\u00E9ros d\u2019urgence chinois : 110 (\u8B66\u5BDF police), 119 (\u6D88\u9632 pompiers), 120 (\u6551\u62A4\u8F66 ambulance). \u00C0 m\u00E9moriser ensemble. 112 est le num\u00E9ro europ\u00E9en, pas chinois.',
    explanationEn: 'China\u2019s 3 emergency numbers: 110 (\u8B66\u5BDF police), 119 (\u6D88\u9632 fire), 120 (\u6551\u62A4\u8F66 ambulance). Memorize together. 112 is the European number, not Chinese.'
  },
  {
    id: 'cecr-a2-phone-m3-fill1',
    type: 'fill',
    category: 'grammar',
    prompt: 'Je suis malade...',
    promptEn: 'I\u2019m sick...',
    sentence: '\u6211\u75C5 ___ \u3002',
    sentenceEn: 'I ___ sick.',
    choices: ['\u4E86', '\u8FC7', '\u7740', '\u7684'],
    correctIndex: 0,
    explanation: '我病了 (wǒ bìng le) = je suis tombé malade. Ici 了 marque un CHANGEMENT D\u2019\u00C9TAT (j\u2019étais bien, maintenant je suis malade) — pas une action accomplie. Usage clé pour les urgences.',
    explanationEn: '我病了 (wǒ bìng le) = I got sick. Here 了 marks a STATE CHANGE (I was fine, now I\u2019m sick) — not a completed action. Key usage for emergencies.'
  },
  {
    id: 'cecr-a2-phone-m3-order1',
    type: 'order',
    category: 'grammar',
    prompt: 'Ordonne : « J\u2019ai perdu mon passeport. »',
    promptEn: 'Reorder: «I lost my passport.»',
    sentence: 'J\u2019ai perdu mon passeport.',
    sentenceEn: 'I lost my passport.',
    choices: ['\u6211\u7684', '\u62A4\u7167', '\u4E22', '\u4E86'],
    correctIndex: 0,
    explanation: '我的护照丢了 = « mon passeport + perdu + 了 ». Structure possesseur + 的 + objet + verbe + 了. 丢 (diū) = perdre/jeter. 了 marque le changement d\u2019état (je l\u2019avais, plus maintenant).',
    explanationEn: '我的护照丢了 = «my passport + lost + 了». Structure: possessor + 的 + object + verb + 了. 丢 (diū) = lose/drop. 了 marks state change (I had it, now I don\u2019t).'
  },
  {
    id: 'cecr-a2-phone-m3-trans-zh2fr',
    type: 'translation',
    category: 'translation',
    prompt: 'Traduis : « 救命 ! 我迷路了 ! »',
    promptEn: 'Translate: «救命！我迷路了！»',
    choices: [
      'Aide-moi ! Je suis fatigu\u00E9 !',
      'Au secours ! Je suis perdu !',
      'Piti\u00E9 ! Je suis bless\u00E9 !',
      'Attention ! Je suis malade !'
    ],
    correctIndex: 1,
    explanation: '救命 ! (jiù mìng !) = sauvez-moi ! (lit. « sauver + vie »), cri d\u2019urgence universel. 迷路 (mí lù) = perdre son chemin (lit. « confus + route »). 了 marque le changement d\u2019état.',
    explanationEn: '救命! (jiù mìng!) = save me! (lit. «save + life»), universal emergency cry. 迷路 (mí lù) = get lost (lit. «confused + road»). 了 marks state change.'
  },
  {
    id: 'cecr-a2-phone-m3-trans-fr2zh',
    type: 'translation',
    category: 'translation',
    prompt: 'Traduis : « Appelez une ambulance, s\u2019il vous pla\u00EEt ! »',
    promptEn: 'Translate: «Please call an ambulance!»',
    choices: [
      '\u8BF7\u53EB\u8B66\u5BDF\uFF01',
      '\u8BF7\u53EB\u6551\u62A4\u8F66\uFF01',
      '\u8BF7\u53EB\u6D88\u9632\uFF01',
      '\u8BF7\u53EB\u670B\u53CB\uFF01'
    ],
    correctIndex: 1,
    explanation: '叫 (jiào) ici = appeler/héler (une voiture/personne). 救护车 (jiù hù chē) = ambulance (lit. « voiture de secours et soins »). 警察 = police, 消防 = pompiers.',
    explanationEn: '叫 (jiào) here = call/hail (a car/person). 救护车 (jiù hù chē) = ambulance (lit. «rescue-care car»). 警察 = police, 消防 = fire dept.'
  },
  {
    id: 'cecr-a2-phone-m3-err1',
    type: 'error-correction',
    category: 'grammar',
    prompt: 'Trouve l\u2019erreur : « 我受伤。»',
    promptEn: 'Find the error: «我受伤。»',
    sentence: '\u6211\u53D7\u4F24\u3002',
    choices: ['\u6211', '\u53D7\u4F24', 'manque \u4E86', 'manque \u662F'],
    correctIndex: 2,
    explanation: 'Pour annoncer une urgence (changement d\u2019\u00E9tat r\u00E9cent), le 了 est quasi-obligatoire : 我受伤了 (je suis bless\u00E9). Sans 了 la phrase sonne d\u2019un ton d\u00E9tach\u00E9 ou g\u00E9n\u00E9rique.',
    explanationEn: 'For emergencies (recent state change), 了 is nearly mandatory: 我受伤了 (I\u2019m hurt). Without 了 the sentence sounds detached or generic.'
  },
  {
    id: 'cecr-a2-phone-m3-listen1',
    type: 'mcq',
    category: 'listening',
    prompt: '\u00C9coute \u2014 quel v\u00E9hicule arrive ?',
    promptEn: 'Listen \u2014 what vehicle is coming?',
    choices: ['Voiture de police', 'Ambulance', 'Camion de pompiers', 'Taxi'],
    correctIndex: 1,
    explanation: '救护车 (jiù hù chē, tons 4-4-1) = ambulance. 救 = sauver, 护 = protéger/soigner, 车 = voiture. Num\u00E9ro : 120.',
    explanationEn: '救护车 (jiù hù chē, tones 4-4-1) = ambulance. 救 = save, 护 = protect/care, 车 = car. Number: 120.',
    audioHanzi: '\u6551\u62A4\u8F66',
    autoPlay: true
  },
  {
    id: 'cecr-a2-phone-m3-mcq-reverse',
    type: 'mcq',
    category: 'vocabulary',
    prompt: 'Comment dit-on « passeport » ?',
    promptEn: 'How do you say «passport»?',
    choices: ['\u8EAB\u4EFD\u8BC1', '\u62A4\u7167', '\u7B7E\u8BC1', '\u673A\u7968'],
    correctIndex: 1,
    explanation: '护照 (hù zhào) = passeport (lit. « protéger + illuminer »). 身份证 = carte d\u2019identité. 签证 = visa. 机票 = billet d\u2019avion. Document vital à l\u2019étranger.',
    explanationEn: '护照 (hù zhào) = passport (lit. «protect + illuminate»). 身份证 = ID card. 签证 = visa. 机票 = plane ticket. Vital document abroad.'
  }
];

// ============================================================================
//  A2 GRAMMAR — 了 perfectif (M1)
// ============================================================================

const A2_GRAMMAR_M1: LessonV2Exercise[] = [
  {
    id: 'cecr-a2-grammar-m1-grammar1',
    type: 'grammar-quiz',
    category: 'grammar',
    prompt: 'O\u00F9 se place le 了 perfectif ?',
    promptEn: 'Where does the perfective 了 go?',
    choices: [
      'Avant le verbe',
      'Juste apr\u00E8s le verbe',
      '\u00C0 la fin de la phrase',
      'Avant le sujet'
    ],
    correctIndex: 1,
    explanation: 'Le 了 perfectif se colle DIRECTEMENT apr\u00E8s le verbe : V + 了 + objet. 我吃了饭. Attention, le 了 modal (fin de phrase) est un autre 了 distinct, trait\u00E9 plus tard.',
    explanationEn: 'Perfective 了 sticks DIRECTLY after the verb: V + 了 + object. 我吃了饭. Careful: sentence-final 了 is a different 了, covered later.'
  },
  {
    id: 'cecr-a2-grammar-m1-fill1',
    type: 'fill',
    category: 'grammar',
    prompt: 'J\u2019ai achet\u00E9 deux livres.',
    promptEn: 'I bought two books.',
    sentence: '\u6211\u4E70 ___ \u4E24\u672C\u4E66\u3002',
    sentenceEn: 'I bought ___ two books.',
    choices: ['\u4E86', '\u8FC7', '\u7740', '\u7684'],
    correctIndex: 0,
    explanation: '了 apr\u00E8s le verbe marque l\u2019action accomplie. La phrase est compl\u00E8te gr\u00E2ce au compl\u00E9ment 两本书 (quantit\u00E9 + objet). Sans compl\u00E9ment, 我买了 sonne tronqu\u00E9.',
    explanationEn: '了 after the verb marks completed action. Sentence is complete thanks to 两本书 (quantity + object). Without a complement, 我买了 sounds truncated.'
  },
  {
    id: 'cecr-a2-grammar-m1-order1',
    type: 'order',
    category: 'grammar',
    prompt: 'Ordonne : « J\u2019ai vu un film hier. »',
    promptEn: 'Reorder: «I watched a movie yesterday.»',
    sentence: 'J\u2019ai vu un film hier.',
    sentenceEn: 'I watched a movie yesterday.',
    choices: ['\u6628\u5929', '\u6211', '\u770B\u4E86', '\u4E00\u90E8\u7535\u5F71'],
    correctIndex: 0,
    explanation: '昨天我看了一部电影 : temps + sujet + V + 了 + quantit\u00E9 + objet. Le temps (昨天) peut se placer avant ou apr\u00E8s le sujet. 一部 = classificateur des films.',
    explanationEn: '昨天我看了一部电影: time + subject + V + 了 + quantity + object. Time (昨天) can come before or after subject. 一部 = movie classifier.'
  },
  {
    id: 'cecr-a2-grammar-m1-trans-zh2fr',
    type: 'translation',
    category: 'translation',
    prompt: 'Traduis : « 他已经去了北京。»',
    promptEn: 'Translate: «他已经去了北京。»',
    choices: [
      'Il va souvent \u00E0 P\u00E9kin.',
      'Il est d\u00E9j\u00E0 parti \u00E0 P\u00E9kin.',
      'Il aimerait aller \u00E0 P\u00E9kin.',
      'Il ne va pas \u00E0 P\u00E9kin.'
    ],
    correctIndex: 1,
    explanation: '已经 (yǐ jīng) = déjà, renforce l\u2019idée d\u2019accomplissement. 了 après 去 = action terminée. Combinaison très fréquente : 已经 + V + 了.',
    explanationEn: '已经 (yǐ jīng) = already, reinforces completion. 了 after 去 = finished action. Very common combo: 已经 + V + 了.'
  },
  {
    id: 'cecr-a2-grammar-m1-trans-fr2zh',
    type: 'translation',
    category: 'translation',
    prompt: 'Traduis : « Il n\u2019a pas mang\u00E9. »',
    promptEn: 'Translate: «He didn\u2019t eat.»',
    choices: [
      '\u4ED6\u4E0D\u5403\u996D\u3002',
      '\u4ED6\u6CA1\u5403\u996D\u3002',
      '\u4ED6\u6CA1\u5403\u4E86\u996D\u3002',
      '\u4ED6\u4E0D\u5403\u4E86\u996D\u3002'
    ],
    correctIndex: 1,
    explanation: 'N\u00E9gation du 了 perfectif : 没 + V (SANS 了). 他没吃饭. Jamais 没\u2026\u4E86 ensemble. 不 (bù) sert \u00E0 la n\u00E9gation habituelle/future, pas au pass\u00E9.',
    explanationEn: 'Negation of perfective 了: 没 + V (NO 了). 他没吃饭. Never 没...了 together. 不 (bù) is for habitual/future negation, not past.'
  },
  {
    id: 'cecr-a2-grammar-m1-err1',
    type: 'error-correction',
    category: 'grammar',
    prompt: 'Trouve l\u2019erreur : « 我不去了北京。»',
    promptEn: 'Find the error: «我不去了北京。»',
    sentence: '\u6211\u4E0D\u53BB\u4E86\u5317\u4EAC\u3002',
    choices: ['\u6211', '\u4E0D\u53BB', '\u4E86', '\u5317\u4EAC'],
    correctIndex: 2,
    explanation: 'Avec 不, on ne met JAMAIS le 了 perfectif. Correction : 我没去北京 (je ne suis pas all\u00E9 à P\u00E9kin). Si on veut garder 不, on parle du futur sans 了 : 我不去北京 (je n\u2019irai pas).',
    explanationEn: 'With 不, NEVER use perfective 了. Correction: 我没去北京 (I didn\u2019t go to Beijing). To keep 不, talk about future without 了: 我不去北京 (I won\u2019t go).'
  },
  {
    id: 'cecr-a2-grammar-m1-listen1',
    type: 'mcq',
    category: 'listening',
    prompt: '\u00C9coute \u2014 que signifie cette phrase ?',
    promptEn: 'Listen \u2014 what does this mean?',
    choices: [
      'Je vais manger.',
      'J\u2019ai mang\u00E9.',
      'Je suis en train de manger.',
      'Je n\u2019ai pas mang\u00E9.'
    ],
    correctIndex: 1,
    explanation: '我吃了 (wǒ chī le) = j\u2019ai mang\u00E9 (\u00E0 l\u2019oral, souvent suffisant si le contexte pr\u00E9cise quoi). \u00C9crit complet : 我吃了饭.',
    explanationEn: '我吃了 (wǒ chī le) = I ate (orally, often enough if context specifies what). Full written: 我吃了饭.',
    audioHanzi: '\u6211\u5403\u4E86',
    autoPlay: true
  },
  {
    id: 'cecr-a2-grammar-m1-mcq-reverse',
    type: 'mcq',
    category: 'grammar',
    prompt: 'Laquelle est correcte pour « j\u2019ai bu du th\u00E9 » ?',
    promptEn: 'Which is correct for «I drank tea»?',
    choices: [
      '\u6211\u559D\u8336\u4E86',
      '\u6211\u559D\u4E86\u8336',
      '\u6211\u4E86\u559D\u8336',
      '\u6211\u4E0D\u4E86\u559D\u8336'
    ],
    correctIndex: 1,
    explanation: '我喝了茶 : 了 juste après le verbe 喝, puis l\u2019objet 茶. 我喝茶了 est aussi possible mais nuance différente (changement d\u2019état, 了 modal).',
    explanationEn: '我喝了茶: 了 right after verb 喝, then object 茶. 我喝茶了 also possible but shifts nuance (state change, modal 了).'
  }
];

// ============================================================================
//  A2 GRAMMAR — 过 expérience vécue (M2)
// ============================================================================

const A2_GRAMMAR_M2: LessonV2Exercise[] = [
  {
    id: 'cecr-a2-grammar-m2-grammar1',
    type: 'grammar-quiz',
    category: 'grammar',
    prompt: 'Que marque 过 (guo) apr\u00E8s un verbe ?',
    promptEn: 'What does 过 (guo) after a verb mark?',
    choices: [
      'Une action en cours',
      'Une exp\u00E9rience v\u00E9cue au moins une fois',
      'Une action futuree',
      'Une action habituelle'
    ],
    correctIndex: 1,
    explanation: '过 (atone) apr\u00E8s verbe = exp\u00E9rience d\u00E9j\u00E0 v\u00E9cue au moins une fois dans la vie. 我吃过饺子 (j\u2019ai d\u00E9j\u00E0 mang\u00E9 des raviolis, une fois dans ma vie).',
    explanationEn: '过 (toneless) after verb = life experience had at least once. 我吃过饺子 (I\u2019ve eaten dumplings, at least once in my life).'
  },
  {
    id: 'cecr-a2-grammar-m2-fill1',
    type: 'fill',
    category: 'grammar',
    prompt: 'As-tu d\u00E9j\u00E0 \u00E9t\u00E9 en Chine ?',
    promptEn: 'Have you ever been to China?',
    sentence: '\u4F60\u53BB ___ \u4E2D\u56FD\u5417\uFF1F',
    sentenceEn: 'Have you ___ been to China?',
    choices: ['\u4E86', '\u8FC7', '\u7740', '\u5728'],
    correctIndex: 1,
    explanation: '过 après 去 = expérience (as-tu déjà ?). 了 serait compris comme « tu es allé » (un événement spécifique, récent) — incorrect ici, sens différent.',
    explanationEn: '过 after 去 = experience (have you ever?). 了 would be read as «you went» (a specific recent event) — wrong here, different meaning.'
  },
  {
    id: 'cecr-a2-grammar-m2-order1',
    type: 'order',
    category: 'grammar',
    prompt: 'Ordonne : « Je n\u2019ai jamais mang\u00E9 de tofu puant. »',
    promptEn: 'Reorder: «I\u2019ve never eaten stinky tofu.»',
    sentence: 'Je n\u2019ai jamais mang\u00E9 de tofu puant.',
    sentenceEn: 'I\u2019ve never eaten stinky tofu.',
    choices: ['\u6211', '\u4ECE\u6765', '\u6CA1\u5403\u8FC7', '\u81ED\u8C46\u8150'],
    correctIndex: 0,
    explanation: '我从来没吃过臭豆腐 : 从来 (cóng lái, « depuis toujours ») renforce « jamais ». Structure : 从来 + 没 + V + 过. N\u00E9gation de 过 = 没 + V + 过 (jamais 不).',
    explanationEn: '我从来没吃过臭豆腐: 从来 (cóng lái, «ever/always») reinforces «never». Structure: 从来 + 没 + V + 过. Negation of 过 = 没 + V + 过 (never 不).'
  },
  {
    id: 'cecr-a2-grammar-m2-trans-zh2fr',
    type: 'translation',
    category: 'translation',
    prompt: 'Traduis : « 我学过中文，但是忘了。»',
    promptEn: 'Translate: «我学过中文，但是忘了。»',
    choices: [
      'J\u2019apprends le chinois, mais c\u2019est difficile.',
      'J\u2019ai d\u00E9j\u00E0 \u00E9tudi\u00E9 le chinois, mais j\u2019ai oubli\u00E9.',
      'Je vais \u00E9tudier le chinois, je ne l\u2019ai pas oubli\u00E9.',
      'J\u2019\u00E9tudie le chinois tous les jours.'
    ],
    correctIndex: 1,
    explanation: '学过 = j\u2019ai d\u00E9j\u00E0 \u00E9tudi\u00E9 (exp\u00E9rience pass\u00E9e). 但是 = mais. 忘了 = oubli\u00E9 (了 de changement d\u2019\u00E9tat : maintenant, je n\u2019en ai plus la m\u00E9moire).',
    explanationEn: '学过 = I\u2019ve studied (past experience). 但是 = but. 忘了 = forgot (了 of state change: now, I no longer remember).'
  },
  {
    id: 'cecr-a2-grammar-m2-trans-fr2zh',
    type: 'translation',
    category: 'translation',
    prompt: 'Traduis : « Je ne suis jamais all\u00E9 \u00E0 Shanghai. »',
    promptEn: 'Translate: «I\u2019ve never been to Shanghai.»',
    choices: [
      '\u6211\u4E0D\u53BB\u4E0A\u6D77\u3002',
      '\u6211\u6CA1\u53BB\u4E86\u4E0A\u6D77\u3002',
      '\u6211\u6CA1\u53BB\u8FC7\u4E0A\u6D77\u3002',
      '\u6211\u4E0D\u60F3\u53BB\u4E0A\u6D77\u3002'
    ],
    correctIndex: 2,
    explanation: 'N\u00E9gation du 过 : 没 + V + 过. 我没去过上海 (je n\u2019ai jamais \u00E9t\u00E9 \u00E0 Shanghai, au cours de ma vie). Jamais 不 + V + 过.',
    explanationEn: 'Negation of 过: 没 + V + 过. 我没去过上海 (I\u2019ve never been to Shanghai, in my life). Never 不 + V + 过.'
  },
  {
    id: 'cecr-a2-grammar-m2-err1',
    type: 'error-correction',
    category: 'grammar',
    prompt: 'Trouve l\u2019erreur : « 我吃过了饺子。»',
    promptEn: 'Find the error: «我吃过了饺子。»',
    sentence: '\u6211\u5403\u8FC7\u4E86\u997A\u5B50\u3002',
    choices: ['\u6211', '\u5403\u8FC7', '\u4E86', '\u997A\u5B50'],
    correctIndex: 2,
    explanation: '过 et 了 ne s\u2019accumulent PAS pour l\u2019exp\u00E9rience. Choisir : 我吃过饺子 (exp\u00E9rience : j\u2019ai d\u00E9j\u00E0 go\u00FBt\u00E9) OU 我吃了饺子 (j\u2019ai mang\u00E9 les raviolis, action sp\u00E9cifique).',
    explanationEn: '过 and 了 don\u2019t stack for experience. Pick: 我吃过饺子 (experience: I\u2019ve tried) OR 我吃了饺子 (I ate the dumplings, specific action).'
  },
  {
    id: 'cecr-a2-grammar-m2-listen1',
    type: 'mcq',
    category: 'listening',
    prompt: '\u00C9coute \u2014 que signifie cette phrase ?',
    promptEn: 'Listen \u2014 what does this mean?',
    choices: [
      'Je vais en Chine.',
      'Je suis d\u00E9j\u00E0 all\u00E9 en Chine.',
      'Je ne veux pas aller en Chine.',
      'Je suis all\u00E9 en Chine hier.'
    ],
    correctIndex: 1,
    explanation: '我去过中国 (wǒ qù guo Zhōngguó) = je suis d\u00E9j\u00E0 all\u00E9 en Chine. 去过 = verbe 去 + marqueur 过 d\u2019exp\u00E9rience.',
    explanationEn: '我去过中国 (wǒ qù guo Zhōngguó) = I\u2019ve been to China. 去过 = verb 去 + 过 experience marker.',
    audioHanzi: '\u6211\u53BB\u8FC7\u4E2D\u56FD',
    autoPlay: true
  },
  {
    id: 'cecr-a2-grammar-m2-mcq-reverse',
    type: 'mcq',
    category: 'grammar',
    prompt: 'Quelle question veut dire « As-tu d\u00E9j\u00E0 vu ce film ? »',
    promptEn: 'Which sentence asks «Have you ever seen this movie?»',
    choices: [
      '\u4F60\u770B\u8FD9\u90E8\u7535\u5F71\u5417\uFF1F',
      '\u4F60\u770B\u8FC7\u8FD9\u90E8\u7535\u5F71\u5417\uFF1F',
      '\u4F60\u770B\u4E86\u8FD9\u90E8\u7535\u5F71\u5417\uFF1F',
      '\u4F60\u5728\u770B\u8FD9\u90E8\u7535\u5F71\u5417\uFF1F'
    ],
    correctIndex: 1,
    explanation: '你看过这部电影吗 ? = as-tu d\u00E9j\u00E0 vu (exp\u00E9rience). 你看了\u2026 = tu as vu (action r\u00E9cente sp\u00E9cifique). 你在看\u2026 = tu es en train de voir.',
    explanationEn: '你看过这部电影吗? = have you ever seen (experience). 你看了... = you saw (specific recent action). 你在看... = you\u2019re currently watching.'
  }
];

// ============================================================================
//  A2 GRAMMAR — 在 progressif (M3)
// ============================================================================

const A2_GRAMMAR_M3: LessonV2Exercise[] = [
  {
    id: 'cecr-a2-grammar-m3-grammar1',
    type: 'grammar-quiz',
    category: 'grammar',
    prompt: 'Que signifie 在 avant un verbe ?',
    promptEn: 'What does 在 before a verb mean?',
    choices: [
      '\u00EAtre \u00E0 (un lieu)',
      '\u00EAtre en train de (action en cours)',
      'avoir d\u00E9j\u00E0 fait',
      'vouloir faire'
    ],
    correctIndex: 1,
    explanation: '在 + verbe = action en cours (progressif). Le m\u00EAme caract\u00E8re 在 sert aussi de verbe d\u2019emplacement (\u00EAtre à), mais suivi d\u2019un LIEU, pas d\u2019un verbe.',
    explanationEn: '在 + verb = action in progress (progressive). The same 在 also works as a location verb (to be at), but followed by a PLACE, not a verb.'
  },
  {
    id: 'cecr-a2-grammar-m3-fill1',
    type: 'fill',
    category: 'grammar',
    prompt: 'Il est en train de dormir.',
    promptEn: 'He is sleeping.',
    sentence: '\u4ED6 ___ \u7761\u89C9\u3002',
    sentenceEn: 'He ___ sleeping.',
    choices: ['\u4E86', '\u8FC7', '\u6B63\u5728', '\u6CA1'],
    correctIndex: 2,
    explanation: '正在 (zhèng zài) renforce 在 : « pile en train de ». 他正在睡觉 = il est juste en train de dormir (l\u00E0, maintenant). 在 seul aurait aussi march\u00E9 mais 正在 est plus expressif.',
    explanationEn: '正在 (zhèng zài) strengthens 在: «precisely in progress». 他正在睡觉 = he\u2019s just now sleeping. Plain 在 also works but 正在 is more vivid.'
  },
  {
    id: 'cecr-a2-grammar-m3-order1',
    type: 'order',
    category: 'grammar',
    prompt: 'Ordonne : « Je suis en train de lire. »',
    promptEn: 'Reorder: «I\u2019m reading.»',
    sentence: 'Je suis en train de lire.',
    sentenceEn: 'I\u2019m reading.',
    choices: ['\u6211', '\u5728', '\u770B\u4E66', '\u5462'],
    correctIndex: 0,
    explanation: '我在看书呢 : 在 + V + particule finale 呢. 呢 ajoute un ton familier/insistant (« je lis, l\u00E0 »). Ordre fixe : sujet + 在 + V + objet (+ 呢).',
    explanationEn: '我在看书呢: 在 + V + final particle 呢. 呢 adds a casual/emphatic tone («I\u2019m reading, right now»). Fixed order: subject + 在 + V + object (+ 呢).'
  },
  {
    id: 'cecr-a2-grammar-m3-trans-zh2fr',
    type: 'translation',
    category: 'translation',
    prompt: 'Traduis : « 妈妈在做饭，爸爸在看电视。»',
    promptEn: 'Translate: «妈妈在做饭，爸爸在看电视。»',
    choices: [
      'Maman cuisine souvent, papa regarde souvent la t\u00E9l\u00E9.',
      'Maman est en train de cuisiner, papa est en train de regarder la t\u00E9l\u00E9.',
      'Maman a cuisin\u00E9, papa a regard\u00E9 la t\u00E9l\u00E9.',
      'Maman va cuisiner, papa va regarder la t\u00E9l\u00E9.'
    ],
    correctIndex: 1,
    explanation: 'Deux actions en cours en parall\u00E8le, chacune marqu\u00E9e par 在 + verbe. Scene typique pour pratiquer le progressif.',
    explanationEn: 'Two parallel actions in progress, each marked by 在 + verb. Typical scene for practicing the progressive.'
  },
  {
    id: 'cecr-a2-grammar-m3-trans-fr2zh',
    type: 'translation',
    category: 'translation',
    prompt: 'Traduis : « Que fais-tu (l\u00E0, maintenant) ? »',
    promptEn: 'Translate: «What are you doing (right now)?»',
    choices: [
      '\u4F60\u505A\u4EC0\u4E48\uFF1F',
      '\u4F60\u5728\u505A\u4EC0\u4E48\uFF1F',
      '\u4F60\u505A\u4E86\u4EC0\u4E48\uFF1F',
      '\u4F60\u60F3\u505A\u4EC0\u4E48\uFF1F'
    ],
    correctIndex: 1,
    explanation: '你在做什么 ? = qu\u2019es-tu en train de faire ? Formule super courante. 你做什么 ? = que fais-tu (en général) ? 你做了什么 ? = qu\u2019as-tu fait ?',
    explanationEn: '你在做什么? = what are you doing right now? Super common. 你做什么? = what do you do (generally)? 你做了什么? = what did you do?'
  },
  {
    id: 'cecr-a2-grammar-m3-err1',
    type: 'error-correction',
    category: 'grammar',
    prompt: 'Trouve l\u2019erreur : « 我吃在饭。»',
    promptEn: 'Find the error: «我吃在饭。»',
    sentence: '\u6211\u5403\u5728\u996D\u3002',
    choices: ['\u6211', '\u5403\u5728', '\u996D', '\u4F4D\u7F6E'],
    correctIndex: 3,
    explanation: 'Le 在 progressif se place AVANT le verbe, pas après. Correct : 我在吃饭 (je suis en train de manger). Erreur typique de confusion avec un -ing anglais postpos\u00E9.',
    explanationEn: 'Progressive 在 goes BEFORE the verb, not after. Correct: 我在吃饭 (I\u2019m eating). Typical confusion with postposed English -ing.'
  },
  {
    id: 'cecr-a2-grammar-m3-listen1',
    type: 'mcq',
    category: 'listening',
    prompt: '\u00C9coute \u2014 que fait la personne ?',
    promptEn: 'Listen \u2014 what is the person doing?',
    choices: [
      'Elle va au travail.',
      'Elle est en train de travailler.',
      'Elle a travaill\u00E9.',
      'Elle n\u2019a pas travaill\u00E9.'
    ],
    correctIndex: 1,
    explanation: '我在工作 (wǒ zài gōngzuò) = je suis en train de travailler. 在 + 工作. R\u00E9ponse typique quand quelqu\u2019un demande « 你在做什么 ? ».',
    explanationEn: '我在工作 (wǒ zài gōngzuò) = I\u2019m working. 在 + 工作. Typical reply when asked «你在做什么?».',
    audioHanzi: '\u6211\u5728\u5DE5\u4F5C',
    autoPlay: true
  },
  {
    id: 'cecr-a2-grammar-m3-mcq-reverse',
    type: 'mcq',
    category: 'grammar',
    prompt: 'Laquelle des phrases signifie « Je suis \u00E0 la maison » (lieu) ?',
    promptEn: 'Which sentence means «I am at home» (location)?',
    choices: [
      '\u6211\u5728\u5BB6',
      '\u6211\u5728\u5403',
      '\u6211\u5728\u5BB6\u5403',
      '\u6211\u5728\u5462'
    ],
    correctIndex: 0,
    explanation: '我在家 = verbe d\u2019emplacement : « je suis à la maison ». 我在家吃 = progressif dans un lieu : « je mange à la maison ». Piège classique : 在 + LIEU \u2260 在 + VERBE.',
    explanationEn: '我在家 = location verb: «I\u2019m at home». 我在家吃 = progressive in a place: «I\u2019m eating at home». Classic trap: 在 + PLACE \u2260 在 + VERB.'
  }
];

// ============================================================================
//  A2 GRAMMAR — 也 vs 都 (M4)
// ============================================================================

const A2_GRAMMAR_M4: LessonV2Exercise[] = [
  {
    id: 'cecr-a2-grammar-m4-grammar1',
    type: 'grammar-quiz',
    category: 'grammar',
    prompt: 'Diff\u00E9rence entre 也 et 都 ?',
    promptEn: 'Difference between 也 and 都?',
    choices: [
      '也 = \u00AB tous \u00BB, 都 = \u00AB aussi \u00BB',
      '也 = \u00AB aussi \u00BB, 都 = \u00AB tous sans exception \u00BB',
      'Ils sont synonymes',
      '也 est plus formel que 都'
    ],
    correctIndex: 1,
    explanation: '也 (yě) = aussi (\u00E9cho entre sujets). 都 (dōu) = tous sans exception (totalisateur). Les deux se placent avant le verbe.',
    explanationEn: '也 (yě) = also (echo between subjects). 都 (dōu) = all without exception (totalizer). Both placed before verb.'
  },
  {
    id: 'cecr-a2-grammar-m4-fill1',
    type: 'fill',
    category: 'grammar',
    prompt: 'Il aime le café, moi aussi.',
    promptEn: 'He likes coffee, so do I.',
    sentence: '\u4ED6\u559C\u6B22\u5496\u5561\uFF0C\u6211 ___ \u559C\u6B22\u3002',
    sentenceEn: 'He likes coffee, I ___ like (it).',
    choices: ['\u4E5F', '\u90FD', '\u5C31', '\u8FD8'],
    correctIndex: 0,
    explanation: '也 (yě) fait écho au sujet pr\u00E9c\u00E9dent : « moi aussi je l\u2019aime ». 都 serait incorrect ici car un seul sujet (« moi ») ne peut pas \u00EAtre « tous ».',
    explanationEn: '也 (yě) echoes the previous subject: «me too, I like it». 都 would be wrong here since a single subject («me») can\u2019t be «all».'
  },
  {
    id: 'cecr-a2-grammar-m4-order1',
    type: 'order',
    category: 'grammar',
    prompt: 'Ordonne : « Nous sommes tous \u00E9tudiants. »',
    promptEn: 'Reorder: «We are all students.»',
    sentence: 'Nous sommes tous \u00E9tudiants.',
    sentenceEn: 'We are all students.',
    choices: ['\u6211\u4EEC', '\u90FD', '\u662F', '\u5B66\u751F'],
    correctIndex: 0,
    explanation: '我们都是学生 : pronom pluriel + 都 (totalisateur) + verbe 是 + attribut. 都 est obligatoirement AVANT le verbe.',
    explanationEn: '我们都是学生: plural pronoun + 都 (totalizer) + verb 是 + attribute. 都 is mandatory BEFORE the verb.'
  },
  {
    id: 'cecr-a2-grammar-m4-trans-zh2fr',
    type: 'translation',
    category: 'translation',
    prompt: 'Traduis : « 我们也都是老师。»',
    promptEn: 'Translate: «我们也都是老师。»',
    choices: [
      'Nous sommes aussi tous professeurs.',
      'Nous ne sommes pas tous professeurs.',
      'Nous sommes quelques professeurs.',
      'Certains d\u2019entre nous sont professeurs.'
    ],
    correctIndex: 0,
    explanation: '也 et 都 coexistent ! Ordre fixe : 也 AVANT 都. 也都 = « aussi tous » : une autre équipe est prof, et nous aussi nous sommes tous prof.',
    explanationEn: '也 and 都 can coexist! Fixed order: 也 BEFORE 都. 也都 = «also all»: another team is made of teachers, and we too are all teachers.'
  },
  {
    id: 'cecr-a2-grammar-m4-trans-fr2zh',
    type: 'translation',
    category: 'translation',
    prompt: 'Traduis : « Ils n\u2019aiment pas tous le thé. »',
    promptEn: 'Translate: «They don\u2019t all like tea.»',
    choices: [
      '\u4ED6\u4EEC\u4E0D\u559C\u6B22\u8336\u3002',
      '\u4ED6\u4EEC\u90FD\u4E0D\u559C\u6B22\u8336\u3002',
      '\u4ED6\u4EEC\u4E0D\u90FD\u559C\u6B22\u8336\u3002',
      '\u4ED6\u4EEC\u4E5F\u4E0D\u559C\u6B22\u8336\u3002'
    ],
    correctIndex: 2,
    explanation: 'Subtilité clé : 都不 = « aucun n\u2019aime » (tous pas) ; 不都 = « pas tous aiment » (certains oui, certains non). Ici la traduction fran\u00E7aise correspond \u00E0 不都.',
    explanationEn: 'Key subtlety: 都不 = «none likes» (all don\u2019t); 不都 = «not all like» (some do, some don\u2019t). Here the French matches 不都.'
  },
  {
    id: 'cecr-a2-grammar-m4-err1',
    type: 'error-correction',
    category: 'grammar',
    prompt: 'Trouve l\u2019erreur : « 也我喜欢中国。»',
    promptEn: 'Find the error: «也我喜欢中国。»',
    sentence: '\u4E5F\u6211\u559C\u6B22\u4E2D\u56FD\u3002',
    choices: ['\u4E5F', '\u6211', '\u559C\u6B22', 'ordre'],
    correctIndex: 3,
    explanation: '也 ne peut JAMAIS pr\u00E9c\u00E9der le sujet. Correction : 我也喜欢中国. R\u00E8gle absolue : 也/都 vont avant le verbe, apr\u00E8s le sujet.',
    explanationEn: '也 can NEVER precede the subject. Correction: 我也喜欢中国. Absolute rule: 也/都 go before the verb, after the subject.'
  },
  {
    id: 'cecr-a2-grammar-m4-listen1',
    type: 'mcq',
    category: 'listening',
    prompt: '\u00C9coute \u2014 que signifie cette phrase ?',
    promptEn: 'Listen \u2014 what does this mean?',
    choices: [
      'Moi aussi je suis chinois.',
      'Je suis aussi chinois (nationalit\u00E9).',
      'Nous sommes tous chinois.',
      'Je suis chinois.'
    ],
    correctIndex: 0,
    explanation: '我也是中国人 (wǒ yě shì Zhōngguó rén) = moi aussi je suis chinois(e). 也 en écho à un sujet précédent dans la conversation.',
    explanationEn: '我也是中国人 (wǒ yě shì Zhōngguó rén) = me too, I\u2019m Chinese. 也 echoes a previous subject in the conversation.',
    audioHanzi: '\u6211\u4E5F\u662F\u4E2D\u56FD\u4EBA',
    autoPlay: true
  },
  {
    id: 'cecr-a2-grammar-m4-mcq-reverse',
    type: 'mcq',
    category: 'grammar',
    prompt: 'Laquelle exprime « nous avons tous ... » ?',
    promptEn: 'Which expresses «we all have...»?',
    choices: [
      '\u6211\u4EEC\u4E5F\u6709',
      '\u6211\u4EEC\u90FD\u6709',
      '\u6211\u4EEC\u6709\u90FD',
      '\u4E5F\u6211\u4EEC\u6709'
    ],
    correctIndex: 1,
    explanation: '我们都有 : 都 (totalisateur) se place avant le verbe 有. 我们也有 = « nous avons aussi » (\u00E9cho d\u2019un autre sujet).',
    explanationEn: '我们都有: 都 (totalizer) before the verb 有. 我们也有 = «we also have» (echo of another subject).'
  }
];

// ============================================================================
//  A2 GRAMMAR — 要 vs 想 (M5)
// ============================================================================

const A2_GRAMMAR_M5: LessonV2Exercise[] = [
  {
    id: 'cecr-a2-grammar-m5-grammar1',
    type: 'grammar-quiz',
    category: 'grammar',
    prompt: 'Au restaurant, pour commander, quel verbe privil\u00E9gier ?',
    promptEn: 'At a restaurant to order, which verb to prefer?',
    choices: ['\u8981', '\u60F3', '\u559C\u6B22', '\u7231'],
    correctIndex: 0,
    explanation: '要 (yào) = volont\u00E9 ferme, direct. 我要一杯咖啡 = je veux un caf\u00E9 (au serveur). 想 serait trop h\u00E9sitant (« j\u2019aurais bien envie \u2026 »). Au restaurant : 要 est la norme.',
    explanationEn: '要 (yào) = firm will, direct. 我要一杯咖啡 = I want a coffee (to waiter). 想 would sound hesitant («I\u2019d kind of like...»). At restaurants: 要 is standard.'
  },
  {
    id: 'cecr-a2-grammar-m5-fill1',
    type: 'fill',
    category: 'grammar',
    prompt: 'Tu me manques (je pense à toi).',
    promptEn: 'I miss you (I think of you).',
    sentence: '\u6211 ___ \u4F60\u3002',
    sentenceEn: 'I ___ you.',
    choices: ['\u8981', '\u60F3', '\u7231', '\u662F'],
    correctIndex: 1,
    explanation: '想 (xiǎng) + personne = « penser à, manquer \u00E0 ». 我想你 = tu me manques. 要 ici signifierait « je te veux » (d\u00E9sir / possession) — ambigu et souvent inappropri\u00E9.',
    explanationEn: '想 (xiǎng) + person = «think of, miss». 我想你 = I miss you. 要 here would mean «I want you» (desire/possession) — ambiguous and often inappropriate.'
  },
  {
    id: 'cecr-a2-grammar-m5-order1',
    type: 'order',
    category: 'grammar',
    prompt: 'Ordonne : « Je voudrais aller en Chine. »',
    promptEn: 'Reorder: «I\u2019d like to go to China.»',
    sentence: 'Je voudrais aller en Chine.',
    sentenceEn: 'I\u2019d like to go to China.',
    choices: ['\u6211', '\u60F3', '\u53BB', '\u4E2D\u56FD'],
    correctIndex: 0,
    explanation: '我想去中国 : 想 + verbe + lieu. Pour un projet encore hypoth\u00E9tique, 想 est plus naturel que 要. Avec 要, la phrase sonnerait comme une d\u00E9cision d\u00E9j\u00E0 prise.',
    explanationEn: '我想去中国: 想 + verb + place. For a still-hypothetical plan, 想 sounds more natural than 要. With 要 it would sound like a decision already made.'
  },
  {
    id: 'cecr-a2-grammar-m5-trans-zh2fr',
    type: 'translation',
    category: 'translation',
    prompt: 'Traduis : « 我不要咖啡，我要茶。»',
    promptEn: 'Translate: «我不要咖啡，我要茶。»',
    choices: [
      'Je n\u2019aime pas le caf\u00E9, j\u2019aime le th\u00E9.',
      'Je ne veux pas de caf\u00E9, je veux du th\u00E9.',
      'Je n\u2019ai pas de caf\u00E9, j\u2019ai du th\u00E9.',
      'Je ne bois pas de caf\u00E9, je bois du th\u00E9.'
    ],
    correctIndex: 1,
    explanation: '不要 = ne pas vouloir (refus cat\u00E9gorique). Typique au restau pour refuser/commander. 不喜欢 serait « ne pas aimer » (plus permanent).',
    explanationEn: '不要 = don\u2019t want (flat refusal). Typical at restaurants to reject/order. 不喜欢 would be «don\u2019t like» (more permanent).'
  },
  {
    id: 'cecr-a2-grammar-m5-trans-fr2zh',
    type: 'translation',
    category: 'translation',
    prompt: 'Traduis : « Je dois travailler demain. »',
    promptEn: 'Translate: «I have to work tomorrow.»',
    choices: [
      '\u6211\u660E\u5929\u60F3\u5DE5\u4F5C\u3002',
      '\u6211\u660E\u5929\u8981\u5DE5\u4F5C\u3002',
      '\u6211\u660E\u5929\u4E0D\u8981\u5DE5\u4F5C\u3002',
      '\u6211\u660E\u5929\u559C\u6B22\u5DE5\u4F5C\u3002'
    ],
    correctIndex: 1,
    explanation: '要 ici a le sens \u00AB devoir, falloir \u00BB (obligation). 我明天要工作 = je dois travailler demain. 想 = vouloir (d\u00E9sir), ne rendrait pas l\u2019obligation.',
    explanationEn: '要 here means «must, have to» (obligation). 我明天要工作 = I have to work tomorrow. 想 = want (desire) wouldn\u2019t convey obligation.'
  },
  {
    id: 'cecr-a2-grammar-m5-err1',
    type: 'error-correction',
    category: 'grammar',
    prompt: 'Trouve l\u2019erreur : « 我不想要茶。»',
    promptEn: 'Find the error: «我不想要茶。»',
    sentence: '\u6211\u4E0D\u60F3\u8981\u8336\u3002',
    choices: ['\u6211', '\u4E0D\u60F3\u8981', '\u8336', 'redondance'],
    correctIndex: 3,
    explanation: 'Empiler 想 + 要 est redondant/maladroit. Choisir : 我不想喝茶 (je n\u2019ai pas envie de boire du th\u00E9) ou 我不要茶 (je ne veux pas de th\u00E9, au serveur).',
    explanationEn: 'Stacking 想 + 要 is redundant/awkward. Pick: 我不想喝茶 (I don\u2019t feel like drinking tea) or 我不要茶 (I don\u2019t want tea, to waiter).'
  },
  {
    id: 'cecr-a2-grammar-m5-listen1',
    type: 'mcq',
    category: 'listening',
    prompt: '\u00C9coute \u2014 que veut dire cette phrase ?',
    promptEn: 'Listen \u2014 what does this mean?',
    choices: [
      'Je veux un caf\u00E9.',
      'J\u2019ai bu un caf\u00E9.',
      'Je n\u2019aime pas le caf\u00E9.',
      'Je vais boire un caf\u00E9.'
    ],
    correctIndex: 0,
    explanation: '我要一杯咖啡 (wǒ yào yì bēi kā fēi) = je veux un caf\u00E9 (commande directe). 一杯 = un verre/une tasse.',
    explanationEn: '我要一杯咖啡 (wǒ yào yì bēi kā fēi) = I want a coffee (direct order). 一杯 = one cup.',
    audioHanzi: '\u6211\u8981\u4E00\u676F\u5496\u5561',
    autoPlay: true
  },
  {
    id: 'cecr-a2-grammar-m5-mcq-reverse',
    type: 'mcq',
    category: 'grammar',
    prompt: 'Laquelle signifie « Je n\u2019ai pas envie de sortir » ?',
    promptEn: 'Which means «I don\u2019t feel like going out»?',
    choices: [
      '\u6211\u4E0D\u8981\u51FA\u95E8',
      '\u6211\u4E0D\u60F3\u51FA\u95E8',
      '\u6211\u6CA1\u51FA\u95E8',
      '\u6211\u4E0D\u662F\u51FA\u95E8'
    ],
    correctIndex: 1,
    explanation: '不想 (bù xiǎng) = ne pas avoir envie. Plus nuanc\u00E9 que 不要 (refus ferme). 不要出门 = « ne sors pas ! » (impératif) ou refus brusque.',
    explanationEn: '不想 (bù xiǎng) = don\u2019t feel like. Softer than 不要 (flat refusal). 不要出门 = «don\u2019t go out!» (imperative) or blunt refusal.'
  }
];

// ============================================================================
//  A2 CULTURE — 春节 Nouvel An chinois (M1)
// ============================================================================

const A2_CULTURE_M1: LessonV2Exercise[] = [
  {
    id: 'cecr-a2-culture-m1-grammar1',
    type: 'grammar-quiz',
    category: 'vocabulary',
    prompt: 'Quel calendrier d\u00E9termine la date du 春节 ?',
    promptEn: 'Which calendar sets the date of 春节?',
    choices: [
      'Le calendrier gr\u00E9gorien (solaire)',
      'Le calendrier lunaire (\u519C\u5386)',
      'Le calendrier julien',
      'Le calendrier bouddhiste'
    ],
    correctIndex: 1,
    explanation: 'Le 春节 suit le 农历 (nóng lì, calendrier lunaire). Le 1er jour du 1er mois lunaire tombe entre fin janvier et mi-f\u00E9vrier. D\u2019o\u00F9 la date qui change chaque ann\u00E9e en gr\u00E9gorien.',
    explanationEn: '春节 follows the 农历 (lunar calendar). Day 1 of month 1 (lunar) lands between late January and mid-February. That\u2019s why the Gregorian date shifts each year.'
  },
  {
    id: 'cecr-a2-culture-m1-fill1',
    type: 'fill',
    category: 'vocabulary',
    prompt: 'Les enfants re\u00E7oivent des enveloppes rouges.',
    promptEn: 'Children receive red envelopes.',
    sentence: '\u5B69\u5B50\u4EEC\u6536\u5230 ___ \u3002',
    sentenceEn: 'The kids receive ___.',
    choices: ['\u7EA2\u5305', '\u6708\u997C', '\u7B77\u5B50', '\u7206\u7AF9'],
    correctIndex: 0,
    explanation: '红包 (hóng bāo) = enveloppe rouge avec de l\u2019argent, offerte aux enfants (et c\u00E9libataires) pendant le 春节. Le rouge symbolise la chance. Aujourd\u2019hui, tr\u00E8s souvent d\u00E9mat\u00E9rialis\u00E9 via WeChat.',
    explanationEn: '红包 (hóng bāo) = red envelope with money, given to children (and singles) during 春节. Red = luck. Today, very often digital via WeChat.'
  },
  {
    id: 'cecr-a2-culture-m1-order1',
    type: 'order',
    category: 'grammar',
    prompt: 'Ordonne : « Je vous souhaite une bonne année ! »',
    promptEn: 'Reorder: «I wish you a happy new year!»',
    sentence: 'Je vous souhaite une bonne ann\u00E9e !',
    sentenceEn: 'I wish you a happy new year!',
    choices: ['\u795D\u4F60', '\u65B0\u5E74', '\u5FEB\u4E50'],
    correctIndex: 0,
    explanation: '祝你新年快乐 : 祝 + destinataire + v\u0153u. Structure fig\u00E9e pour formuler des v\u0153ux. 祝 (zhù) = souhaiter.',
    explanationEn: '祝你新年快乐: 祝 + recipient + wish. Fixed structure for well-wishes. 祝 (zhù) = to wish.'
  },
  {
    id: 'cecr-a2-culture-m1-trans-zh2fr',
    type: 'translation',
    category: 'translation',
    prompt: 'Traduis : « 恭喜发财 ! »',
    promptEn: 'Translate: «恭喜发财！»',
    choices: [
      'Bonne sant\u00E9 !',
      'Prosp\u00E9rit\u00E9 et richesse !',
      'Longue vie !',
      'Joyeux anniversaire !'
    ],
    correctIndex: 1,
    explanation: '恭喜发财 (gōng xǐ fā cái) = « f\u00E9licitations et prosp\u00E9rit\u00E9 ». Voeu tr\u00E8s populaire au 春节, souvent suivi de 红包拿来 (« passe l\u2019enveloppe rouge ! ») par les enfants, comme blague.',
    explanationEn: '恭喜发财 (gōng xǐ fā cái) = «congrats and prosperity». Very popular 春节 greeting, often followed by 红包拿来 («hand over the red envelope!») from kids as a joke.'
  },
  {
    id: 'cecr-a2-culture-m1-trans-fr2zh',
    type: 'translation',
    category: 'translation',
    prompt: 'Traduis : « On mange des raviolis le réveillon du Nouvel An. »',
    promptEn: 'Translate: «We eat dumplings on New Year\u2019s Eve.»',
    choices: [
      '\u9664\u5915\u6211\u4EEC\u559D\u8336\u3002',
      '\u9664\u5915\u6211\u4EEC\u5403\u997A\u5B50\u3002',
      '\u9664\u5915\u6211\u4EEC\u5403\u6708\u997C\u3002',
      '\u9664\u5915\u6211\u4EEC\u770B\u7535\u89C6\u3002'
    ],
    correctIndex: 1,
    explanation: '除夕 (chú xī) = réveillon du Nouvel An lunaire. 饺子 sont incontournables au Nord (forme de lingot ancien, symbole de richesse). Au Sud, on privil\u00E9gie le 年糕 (gâteau de riz).',
    explanationEn: '除夕 (chú xī) = Lunar New Year\u2019s Eve. 饺子 are a must in the North (shape of ancient ingots, wealth symbol). In the South, 年糕 (rice cake) is preferred.'
  },
  {
    id: 'cecr-a2-culture-m1-err1',
    type: 'error-correction',
    category: 'vocabulary',
    prompt: 'Quelle pratique est un tabou le 1er jour de l\u2019ann\u00E9e ?',
    promptEn: 'Which practice is taboo on Day 1 of the new year?',
    sentence: 'Choisis le tabou.',
    choices: [
      'Manger des raviolis',
      'Balayer la maison',
      'Offrir un \u7EA2\u5305',
      'Dire \u65B0\u5E74\u5FEB\u4E50'
    ],
    correctIndex: 1,
    explanation: 'Balayer le 1er jour = balayer la chance entrante. Tabou strict. Autres tabous : casser de la vaisselle, prononcer le mot 死 (mort), pleurer. Les pr\u00E9paratifs de m\u00E9nage se font AVANT le 1er.',
    explanationEn: 'Sweeping on day 1 = sweeping luck away. Strict taboo. Other taboos: breaking dishes, saying 死 (death), crying. All cleaning is done BEFORE day 1.'
  },
  {
    id: 'cecr-a2-culture-m1-listen1',
    type: 'mcq',
    category: 'listening',
    prompt: '\u00C9coute \u2014 que signifie ce voeu ?',
    promptEn: 'Listen \u2014 what does this greeting mean?',
    choices: [
      'Joyeux Noël',
      'Bonne année !',
      'Bon anniversaire',
      'Bonne santé'
    ],
    correctIndex: 1,
    explanation: '新年快乐 (xīn nián kuài lè) = bonne ann\u00E9e ! Voeu le plus courant au 春节. Prononciation nette avec les 4 tons : 1-2-4-4.',
    explanationEn: '新年快乐 (xīn nián kuài lè) = Happy New Year! Most common 春节 greeting. Clear pronunciation with all 4 tones: 1-2-4-4.',
    audioHanzi: '\u65B0\u5E74\u5FEB\u4E50',
    autoPlay: true
  },
  {
    id: 'cecr-a2-culture-m1-mcq-reverse',
    type: 'mcq',
    category: 'vocabulary',
    prompt: 'Comment dit-on « repas des retrouvailles » (la veille du Nouvel An) ?',
    promptEn: 'How do you say «reunion dinner» (New Year\u2019s Eve dinner)?',
    choices: ['\u65E9\u9910', '\u5348\u9910', '\u56E2\u5706\u996D', '\u665A\u9910'],
    correctIndex: 2,
    explanation: '团圆饭 (tuán yuán fàn, lit. « repas de r\u00E9union arrondie ») = repas familial du r\u00E9veillon. Tous les membres doivent rentrer — d\u2019o\u00F9 l\u2019immense 春运 (migration ferroviaire du Nouvel An).',
    explanationEn: '团圆饭 (tuán yuán fàn, lit. «round-reunion meal») = family reunion meal on NY Eve. All members must come home — hence the huge 春运 (New Year railway migration).'
  }
];

// ============================================================================
//  A2 CULTURE — 中秋节 Mi-Automne (M2)
// ============================================================================

const A2_CULTURE_M2: LessonV2Exercise[] = [
  {
    id: 'cecr-a2-culture-m2-grammar1',
    type: 'grammar-quiz',
    category: 'vocabulary',
    prompt: 'Quel symbole central de la F\u00EAte de la Mi-Automne ?',
    promptEn: 'What is the central symbol of Mid-Autumn Festival?',
    choices: [
      'Le soleil couchant',
      'La pleine lune (\u6EE1\u6708)',
      'Les feux d\u2019artifice',
      'Les lanternes en papier'
    ],
    correctIndex: 1,
    explanation: 'La 满月 (mǎn yuè, pleine lune) est le symbole central. Sa rondeur incarne la r\u00E9union familiale (团圆). La f\u00EAte tombe le 15e jour du 8e mois lunaire, quand la lune est la plus grosse.',
    explanationEn: '满月 (mǎn yuè, full moon) is the central symbol. Its roundness embodies family reunion (团圆). The festival falls on day 15 of lunar month 8, when the moon is biggest.'
  },
  {
    id: 'cecr-a2-culture-m2-fill1',
    type: 'fill',
    category: 'vocabulary',
    prompt: 'Pour la F\u00EAte de la Lune, on mange traditionnellement...',
    promptEn: 'For the Moon Festival, people traditionally eat...',
    sentence: '\u4E2D\u79CB\u8282\u6211\u4EEC\u5403 ___ \u3002',
    sentenceEn: 'At Mid-Autumn we eat ___.',
    choices: ['\u997A\u5B50', '\u6708\u997C', '\u7C73\u9152', '\u7CBD\u5B50'],
    correctIndex: 1,
    explanation: '月饼 (yuè bǐng, « g\u00E2teau de lune ») = p\u00E2tisseries rondes fourr\u00E9es (pate de haricot rouge, graines de lotus, jaune d\u2019\u0153uf sal\u00E9). Rich et tr\u00E8s sucr\u00E9, souvent offert aux coll\u00E8gues/clients.',
    explanationEn: '月饼 (yuè bǐng, «moon cake») = round filled pastries (red bean paste, lotus seed, salted egg yolk). Rich and very sweet, often gifted to colleagues/clients.'
  },
  {
    id: 'cecr-a2-culture-m2-order1',
    type: 'order',
    category: 'grammar',
    prompt: 'Ordonne : « Toute la famille admire la lune ensemble. »',
    promptEn: 'Reorder: «The whole family admires the moon together.»',
    sentence: 'Toute la famille admire la lune ensemble.',
    sentenceEn: 'The whole family admires the moon together.',
    choices: ['\u5168\u5BB6', '\u4E00\u8D77', '\u8D4F\u6708'],
    correctIndex: 0,
    explanation: '全家一起赏月 : 全家 = toute la famille ; 一起 = ensemble ; 赏月 (shǎng yuè) = admirer la lune (活動 traditionnelle). Ordre fixe sujet + adverbe + verbe.',
    explanationEn: '全家一起赏月: 全家 = the whole family; 一起 = together; 赏月 (shǎng yuè) = admire the moon (traditional activity). Fixed order subject + adverb + verb.'
  },
  {
    id: 'cecr-a2-culture-m2-trans-zh2fr',
    type: 'translation',
    category: 'translation',
    prompt: 'Traduis : « 嫦娥飞到了月亮上。»',
    promptEn: 'Translate: «嫦娥飞到了月亮上。»',
    choices: [
      'Cháng\u2019é a mang\u00E9 la lune.',
      'Cháng\u2019é s\u2019est envol\u00E9e vers la lune.',
      'Cháng\u2019é est descendue de la lune.',
      'Cháng\u2019é habite sur le soleil.'
    ],
    correctIndex: 1,
    explanation: '嫦娥 (Cháng\u2019é) = déesse de la lune, qui a bu l\u2019élixir d\u2019immortalité et s\u2019est envolée vers la lune. 飞到 = voler jusqu\u2019à. 了 = action accomplie. 上 = sur.',
    explanationEn: '嫦娥 (Cháng\u2019é) = moon goddess who drank the immortality elixir and flew to the moon. 飞到 = fly to. 了 = completed. 上 = onto.'
  },
  {
    id: 'cecr-a2-culture-m2-trans-fr2zh',
    type: 'translation',
    category: 'translation',
    prompt: 'Traduis : « Joyeuse F\u00EAte de la Lune ! »',
    promptEn: 'Translate: «Happy Mid-Autumn Festival!»',
    choices: [
      '\u65B0\u5E74\u5FEB\u4E50\uFF01',
      '\u4E2D\u79CB\u5FEB\u4E50\uFF01',
      '\u751F\u65E5\u5FEB\u4E50\uFF01',
      '\u5723\u8BDE\u5FEB\u4E50\uFF01'
    ],
    correctIndex: 1,
    explanation: '中秋快乐 (zhōng qiū kuài lè) = bonne fête de la Mi-Automne. Abr\u00E9viation de 中秋节快乐. 节 (« fête ») peut sauter dans les formules de v\u0153ux.',
    explanationEn: '中秋快乐 (zhōng qiū kuài lè) = Happy Mid-Autumn. Short for 中秋节快乐. 节 («festival») can be dropped in greetings.'
  },
  {
    id: 'cecr-a2-culture-m2-err1',
    type: 'error-correction',
    category: 'vocabulary',
    prompt: 'Lequel NE fait PAS partie d\u2019un fourrage classique de 月饼 ?',
    promptEn: 'Which is NOT a classic 月饼 filling?',
    sentence: 'Choisis l\u2019intrus.',
    choices: [
      'Pate de haricot rouge',
      'Graines de lotus',
      'Chocolat au lait',
      'Jaune d\u2019\u0153uf sal\u00E9'
    ],
    correctIndex: 2,
    explanation: 'Les fourrages traditionnels sont la p\u00E2te de haricot rouge (红豆沙), les graines de lotus (莲蓉), et le jaune d\u2019\u0153uf sal\u00E9 (蛋黄, représentant la lune). Les versions chocolat/glace existent, mais modernes et non traditionnelles.',
    explanationEn: 'Traditional fillings are red bean paste (红豆沙), lotus seed paste (莲蓉), and salted egg yolk (蛋黄, representing the moon). Chocolate/ice-cream versions exist but are modern, not traditional.'
  },
  {
    id: 'cecr-a2-culture-m2-listen1',
    type: 'mcq',
    category: 'listening',
    prompt: '\u00C9coute \u2014 quelle f\u00EAte ?',
    promptEn: 'Listen \u2014 which festival?',
    choices: [
      'Nouvel An chinois (\u6625\u8282)',
      'F\u00EAte de la mi-automne (\u4E2D\u79CB\u8282)',
      'F\u00EAte des lanternes (\u5143\u5BB5\u8282)',
      'F\u00EAte des bateaux-dragons (\u7AEF\u5348\u8282)'
    ],
    correctIndex: 1,
    explanation: '中秋节 (zhōng qiū jié) = F\u00EAte de la mi-automne. Tons 1-1-2. 2e f\u00EAte la plus importante apr\u00E8s 春节.',
    explanationEn: '中秋节 (zhōng qiū jié) = Mid-Autumn Festival. Tones 1-1-2. 2nd most important after 春节.',
    audioHanzi: '\u4E2D\u79CB\u8282',
    autoPlay: true
  },
  {
    id: 'cecr-a2-culture-m2-mcq-reverse',
    type: 'mcq',
    category: 'vocabulary',
    prompt: 'Comment dit-on « calendrier lunaire » ?',
    promptEn: 'How do you say «lunar calendar»?',
    choices: ['\u65E5\u5386', '\u519C\u5386', '\u516C\u5386', '\u9633\u5386'],
    correctIndex: 1,
    explanation: '农历 (nóng lì, « calendrier agricole/paysan ») = calendrier lunaire chinois, encore utilis\u00E9 pour les f\u00EAtes et les anniversaires traditionnels. 公历/阳历 = calendrier gr\u00E9gorien (solaire).',
    explanationEn: '农历 (nóng lì, «agricultural calendar») = Chinese lunar calendar, still used for festivals and traditional birthdays. 公历/阳历 = Gregorian (solar) calendar.'
  }
];

// ============================================================================
//  A2 CULTURE — Étiquette à table (M3)
// ============================================================================

const A2_CULTURE_M3: LessonV2Exercise[] = [
  {
    id: 'cecr-a2-culture-m3-grammar1',
    type: 'grammar-quiz',
    category: 'vocabulary',
    prompt: 'Pourquoi ne jamais planter ses baguettes verticalement dans le riz ?',
    promptEn: 'Why never stick chopsticks vertically in rice?',
    choices: [
      '\u00C7a bloque la nourriture',
      '\u00C7a \u00E9voque l\u2019encens rituel pour les morts',
      '\u00C7a fait tomber le bol',
      '\u00C7a donne mauvaise chance en jeu'
    ],
    correctIndex: 1,
    explanation: 'Les baguettes plant\u00E9es verticalement rappellent les b\u00E2tons d\u2019encens (香) pos\u00E9s sur l\u2019autel funéraire. Geste extr\u00EAmement tabou en Chine (et en Asie de l\u2019Est en g\u00E9n\u00E9ral).',
    explanationEn: 'Vertically planted chopsticks resemble incense sticks (香) placed on a funeral altar. Extremely taboo gesture in China (and East Asia generally).'
  },
  {
    id: 'cecr-a2-culture-m3-fill1',
    type: 'fill',
    category: 'vocabulary',
    prompt: '\u00C0 table, pour trinquer, on dit...',
    promptEn: 'At the table, to toast, you say...',
    sentence: '\u6211\u4EEC ___ \uFF01',
    sentenceEn: 'Let\u2019s ___!',
    choices: ['\u5403\u996D', '\u5E72\u676F', '\u559D\u8336', '\u611F\u8C22'],
    correctIndex: 1,
    explanation: '干杯 (gān bēi) = trinquer (lit. « vider le verre »). En Chine, au sens strict il s\u2019agit de tout boire d\u2019un trait — surtout avec des sup\u00E9rieurs hi\u00E9rarchiques. Pour just\u00E9 trinquer sans vider, dire 随意 (à volont\u00E9).',
    explanationEn: '干杯 (gān bēi) = toast (lit. «dry the glass»). Strictly means drinking it all in one gulp — especially with superiors. To just toast without emptying, say 随意 (as you wish).'
  },
  {
    id: 'cecr-a2-culture-m3-order1',
    type: 'order',
    category: 'grammar',
    prompt: 'Ordonne : « Ce plat est tr\u00E8s bon, merci ! »',
    promptEn: 'Reorder: «This dish is very tasty, thank you!»',
    sentence: 'Ce plat est tr\u00E8s bon, merci !',
    sentenceEn: 'This dish is very tasty, thank you!',
    choices: ['\u5F88\u597D\u5403', '\u8C22\u8C22', '\uFF01'],
    correctIndex: 0,
    explanation: '很好吃，谢谢 ! = tr\u00E8s bon, merci ! Compliment standard apr\u00E8s le repas. L\u2019h\u00F4te répondra souvent 哪里哪里 (pas du tout) par modestie. 好吃 (hǎo chī) = bon \u00E0 manger.',
    explanationEn: '很好吃，谢谢! = very tasty, thank you! Standard post-meal compliment. Host often replies 哪里哪里 (not at all) out of modesty. 好吃 (hǎo chī) = good to eat.'
  },
  {
    id: 'cecr-a2-culture-m3-trans-zh2fr',
    type: 'translation',
    category: 'translation',
    prompt: 'Traduis : « \u8BF7\u60A8\u5148\u5403\u3002»',
    promptEn: 'Translate: «请您先吃。»',
    choices: [
      'Pouvez-vous manger moins ?',
      'Mangez d\u2019abord, s\u2019il vous pla\u00EEt.',
      'Vous avez d\u00E9j\u00E0 mang\u00E9 ?',
      '\u00C7a vous pla\u00EEt ?'
    ],
    correctIndex: 1,
    explanation: '请您 = « je vous en prie » (formel, avec 您). 先吃 = manger d\u2019abord. Formule polie adress\u00E9e \u00E0 l\u2019a\u00EEn\u00E9 ou \u00E0 l\u2019h\u00F4te, \u00E0 qui l\u2019on c\u00E8de toujours la premi\u00E8re bouch\u00E9e.',
    explanationEn: '请您 = «please» (formal, with 您). 先吃 = eat first. Polite formula addressed to elder or host, to whom one always yields the first bite.'
  },
  {
    id: 'cecr-a2-culture-m3-trans-fr2zh',
    type: 'translation',
    category: 'translation',
    prompt: 'Traduis : « Santé ! »',
    promptEn: 'Translate: «Cheers!»',
    choices: [
      '\u4F60\u597D\uFF01',
      '\u8C22\u8C22\uFF01',
      '\u5E72\u676F\uFF01',
      '\u518D\u89C1\uFF01'
    ],
    correctIndex: 2,
    explanation: '干杯 ! = santé ! (ou plus litt\u00E9ralement « cul sec ! »). En contexte d\u2019affaires, refuser un 干杯 peut \u00EAtre mal vu. Les pers. qui ne boivent pas d\u2019alcool peuvent trinquer au th\u00E9.',
    explanationEn: '干杯! = cheers! (or more literally «bottoms up!»). In business contexts, refusing a 干杯 can be seen as rude. Non-drinkers can toast with tea.'
  },
  {
    id: 'cecr-a2-culture-m3-err1',
    type: 'error-correction',
    category: 'vocabulary',
    prompt: 'Parmi ces gestes, lequel est CORRECT \u00E0 table ?',
    promptEn: 'Among these gestures, which is CORRECT at the table?',
    sentence: 'Choisis le geste correct.',
    choices: [
      'Planter les baguettes dans le riz',
      'Tapoter le bol avec les baguettes',
      'Servir l\u2019a\u00EEn\u00E9 avant soi',
      'Passer la nourriture baguette-\u00E0-baguette'
    ],
    correctIndex: 2,
    explanation: 'Servir l\u2019a\u00EEn\u00E9 ou l\u2019h\u00F4te avant soi est la r\u00E8gle de politesse essentielle. Les trois autres gestes sont des tabous associés aux rituels fun\u00E9raires ou à la mendicit\u00E9.',
    explanationEn: 'Serving the elder or host before yourself is the essential politeness rule. The other three gestures are taboos linked to funeral rites or begging.'
  },
  {
    id: 'cecr-a2-culture-m3-listen1',
    type: 'mcq',
    category: 'listening',
    prompt: '\u00C9coute \u2014 que veut dire ce mot ?',
    promptEn: 'Listen \u2014 what does this word mean?',
    choices: ['Cuill\u00E8re', 'Baguettes', 'Couteau', 'Fourchette'],
    correctIndex: 1,
    explanation: '筷子 (kuài zi, tons 4 + neutre) = baguettes. Toujours au pluriel (comme une paire). Outil principal \u00E0 table ; cuill\u00E8re (勺子) en compl\u00E9ment pour les soupes.',
    explanationEn: '筷子 (kuài zi, tone 4 + neutral) = chopsticks. Always plural (as a pair). Main table tool; spoon (勺子) complements for soups.',
    audioHanzi: '\u7B77\u5B50',
    autoPlay: true
  },
  {
    id: 'cecr-a2-culture-m3-mcq-reverse',
    type: 'mcq',
    category: 'vocabulary',
    prompt: 'Comment dit-on « porter un toast » de mani\u00E8re polie (sans vider) ?',
    promptEn: 'How do you politely toast (without downing)?',
    choices: ['\u5E72\u676F', '\u968F\u610F', '\u5403\u996D', '\u8C22\u8C22'],
    correctIndex: 1,
    explanation: '随意 (suí yì, lit. « selon ta volont\u00E9 ») = version douce du toast : « bois ce que tu veux ». Alternative polie \u00E0 干杯 (vider le verre), surtout si on ne boit pas beaucoup.',
    explanationEn: '随意 (suí yì, lit. «as you wish») = softer toast: «drink whatever you want». Polite alternative to 干杯 (bottoms up), especially if not a big drinker.'
  }
];

// ============================================================================
//  A2 CULTURE — Zodiaque chinois (M4)
// ============================================================================

const A2_CULTURE_M4: LessonV2Exercise[] = [
  {
    id: 'cecr-a2-culture-m4-grammar1',
    type: 'grammar-quiz',
    category: 'vocabulary',
    prompt: 'Combien d\u2019animaux dans le zodiaque chinois ?',
    promptEn: 'How many animals in the Chinese zodiac?',
    choices: ['10', '12', '13', '24'],
    correctIndex: 1,
    explanation: '12 animaux dans un ordre fixe : 鼠 (rat), 牛 (b\u0153uf), 虎 (tigre), 兔 (lapin), 龙 (dragon), 蛇 (serpent), 马 (cheval), 羊 (ch\u00E8vre), 猴 (singe), 鸡 (coq), 狗 (chien), 猪 (cochon). Cycle de 12 ans.',
    explanationEn: '12 animals in fixed order: 鼠 (rat), 牛 (ox), 虎 (tiger), 兔 (rabbit), 龙 (dragon), 蛇 (snake), 马 (horse), 羊 (goat), 猴 (monkey), 鸡 (rooster), 狗 (dog), 猪 (pig). 12-year cycle.'
  },
  {
    id: 'cecr-a2-culture-m4-fill1',
    type: 'fill',
    category: 'grammar',
    prompt: 'Je suis du signe du dragon.',
    promptEn: 'I\u2019m a dragon (zodiac).',
    sentence: '\u6211 ___ \u9F99\u3002',
    sentenceEn: 'I am ___ dragon.',
    choices: ['\u662F', '\u5C5E', '\u7684', '\u6709'],
    correctIndex: 1,
    explanation: '属 (shǔ) = « appartenir à / être du signe de ». Verbe sp\u00E9cial pour dire son signe. 我属龙 (je suis dragon). JAMAIS 我是龙 (« je suis un dragon », non-sens littéral).',
    explanationEn: '属 (shǔ) = «belong to / be of the sign of». Special verb to state your zodiac. 我属龙 (I\u2019m a dragon). NEVER 我是龙 («I am a dragon», literal nonsense).'
  },
  {
    id: 'cecr-a2-culture-m4-order1',
    type: 'order',
    category: 'grammar',
    prompt: 'Ordonne : « Tu es de quel signe ? »',
    promptEn: 'Reorder: «What\u2019s your zodiac sign?»',
    sentence: 'Tu es de quel signe ?',
    sentenceEn: 'What\u2019s your zodiac sign?',
    choices: ['\u4F60', '\u5C5E', '\u4EC0\u4E48', '\uFF1F'],
    correctIndex: 0,
    explanation: '你属什么 ? = litt\u00E9ralement « tu appartiens \u00E0 quoi ? ». Question sociale ultra-fr\u00E9quente en Chine, surtout au Nouvel An. Permet de deviner l\u2019\u00E2ge \u00E0 12 ans pr\u00E8s (attention aux cohortes).',
    explanationEn: '你属什么? = lit. «you belong to what?». Ultra-common social question in China, especially at New Year. Lets you guess age within 12 years (careful with cohorts).'
  },
  {
    id: 'cecr-a2-culture-m4-trans-zh2fr',
    type: 'translation',
    category: 'translation',
    prompt: 'Traduis : « \u4ECA\u5E74\u662F\u9A6C\u5E74\u3002»',
    promptEn: 'Translate: «今年是马年。»',
    choices: [
      'Cette ann\u00E9e est l\u2019ann\u00E9e du cheval.',
      'Cette ann\u00E9e est l\u2019ann\u00E9e du dragon.',
      'Cette ann\u00E9e est l\u2019ann\u00E9e du tigre.',
      'Cette ann\u00E9e est l\u2019ann\u00E9e du lapin.'
    ],
    correctIndex: 0,
    explanation: '马年 (mǎ nián) = ann\u00E9e du cheval. 2026 est l\u2019ann\u00E9e du cheval dans le cycle zodiacal chinois. Structure : animal + 年.',
    explanationEn: '马年 (mǎ nián) = year of the horse. 2026 is the year of the horse in the Chinese zodiac cycle. Structure: animal + 年.'
  },
  {
    id: 'cecr-a2-culture-m4-trans-fr2zh',
    type: 'translation',
    category: 'translation',
    prompt: 'Traduis : « L\u2019ann\u00E9e de son signe, on porte du rouge. »',
    promptEn: 'Translate: «In one\u2019s own-sign year, people wear red.»',
    choices: [
      '\u672C\u547D\u5E74\uFF0C\u6211\u4EEC\u7A7F\u767D\u8272\u3002',
      '\u672C\u547D\u5E74\uFF0C\u6211\u4EEC\u7A7F\u7EA2\u8272\u3002',
      '\u65B0\u5E74\uFF0C\u6211\u4EEC\u7A7F\u9ED1\u8272\u3002',
      '\u6625\u8282\uFF0C\u6211\u4EEC\u7A7F\u84DD\u8272\u3002'
    ],
    correctIndex: 1,
    explanation: '本命年 (běn mìng nián, « ann\u00E9e de sa propre destin\u00E9e ») = ann\u00E9e de son animal, tous les 12 ans. Consid\u00E9r\u00E9e risqu\u00E9e. On porte du rouge (sous-v\u00EAtements rouges offerts par la famille) pour conjurer la malchance.',
    explanationEn: '本命年 (běn mìng nián, «own-destiny year») = year of your animal, every 12 years. Seen as risky. People wear red (red underwear from family) to ward off bad luck.'
  },
  {
    id: 'cecr-a2-culture-m4-err1',
    type: 'error-correction',
    category: 'grammar',
    prompt: 'Trouve l\u2019erreur : « 我是龙。»',
    promptEn: 'Find the error: «我是龙。»',
    sentence: '\u6211\u662F\u9F99\u3002',
    choices: ['\u6211', '\u662F', '\u9F99', 'verbe'],
    correctIndex: 3,
    explanation: 'Pour dire son signe, le verbe correct est 属 (shǔ), pas 是 (shì). 我属龙 = je suis du signe du dragon. 我是龙 = « je suis UN dragon » (litt., non-sens sauf po\u00E9sie).',
    explanationEn: 'To state your zodiac sign, the correct verb is 属 (shǔ), not 是 (shì). 我属龙 = I\u2019m a dragon (sign). 我是龙 = «I am A dragon» (literal, nonsense except in poetry).'
  },
  {
    id: 'cecr-a2-culture-m4-listen1',
    type: 'mcq',
    category: 'listening',
    prompt: '\u00C9coute \u2014 quel animal ?',
    promptEn: 'Listen \u2014 which animal?',
    choices: ['Tigre (\u864E)', 'Dragon (\u9F99)', 'Serpent (\u86C7)', 'Cheval (\u9A6C)'],
    correctIndex: 1,
    explanation: '龙 (lóng, ton 2) = dragon. Animal le plus prestigieux du zodiaque : puissance, chance, autorit\u00E9 imp\u00E9riale. Les ann\u00E9es du dragon voient des pics de natalit\u00E9 en Chine.',
    explanationEn: '龙 (lóng, tone 2) = dragon. Most prestigious zodiac animal: power, luck, imperial authority. Dragon years see birth rate peaks in China.',
    audioHanzi: '\u9F99',
    autoPlay: true
  },
  {
    id: 'cecr-a2-culture-m4-mcq-reverse',
    type: 'mcq',
    category: 'vocabulary',
    prompt: 'Comment dit-on « zodiaque chinois » ?',
    promptEn: 'How do you say «Chinese zodiac»?',
    choices: ['\u661F\u5EA7', '\u5341\u4E8C\u751F\u8096', '\u516D\u5341\u7532\u5B50', '\u516B\u5B57'],
    correctIndex: 1,
    explanation: '十二生肖 (shí èr shēng xiào, « 12 signes de naissance ») = zodiaque chinois. 星座 (xīng zuò) = zodiaque occidental (b\u00E9lier, taureau...). Les deux coexistent en Chine moderne.',
    explanationEn: '十二生肖 (shí èr shēng xiào, «12 birth signs») = Chinese zodiac. 星座 (xīng zuò) = Western zodiac (Aries, Taurus...). Both coexist in modern China.'
  }
];

// ============================================================================
//  EXPORT
// ============================================================================

export const cecrExercisesEnrichedA2: Record<string, LessonV2Exercise[]> = {
  // A2 City (4)
  'cecr-a2-city-m1': A2_CITY_M1,
  'cecr-a2-city-m2': A2_CITY_M2,
  'cecr-a2-city-m3': A2_CITY_M3,
  'cecr-a2-city-m4': A2_CITY_M4,
  // A2 Food (4)
  'cecr-a2-food-m1': A2_FOOD_M1,
  'cecr-a2-food-m2': A2_FOOD_M2,
  'cecr-a2-food-m3': A2_FOOD_M3,
  'cecr-a2-food-m4': A2_FOOD_M4,
  // A2 Shopping (4)
  'cecr-a2-shopping-m1': A2_SHOPPING_M1,
  'cecr-a2-shopping-m2': A2_SHOPPING_M2,
  'cecr-a2-shopping-m3': A2_SHOPPING_M3,
  'cecr-a2-shopping-m4': A2_SHOPPING_M4,
  // A2 Day (4)
  'cecr-a2-day-m1': A2_DAY_M1,
  'cecr-a2-day-m2': A2_DAY_M2,
  'cecr-a2-day-m3': A2_DAY_M3,
  'cecr-a2-day-m4': A2_DAY_M4,
  // A2 Phone (3)
  'cecr-a2-phone-m1': A2_PHONE_M1,
  'cecr-a2-phone-m2': A2_PHONE_M2,
  'cecr-a2-phone-m3': A2_PHONE_M3,
  // A2 Grammar (5)
  'cecr-a2-grammar-m1': A2_GRAMMAR_M1,
  'cecr-a2-grammar-m2': A2_GRAMMAR_M2,
  'cecr-a2-grammar-m3': A2_GRAMMAR_M3,
  'cecr-a2-grammar-m4': A2_GRAMMAR_M4,
  'cecr-a2-grammar-m5': A2_GRAMMAR_M5,
  // A2 Culture (4)
  'cecr-a2-culture-m1': A2_CULTURE_M1,
  'cecr-a2-culture-m2': A2_CULTURE_M2,
  'cecr-a2-culture-m3': A2_CULTURE_M3,
  'cecr-a2-culture-m4': A2_CULTURE_M4
};
