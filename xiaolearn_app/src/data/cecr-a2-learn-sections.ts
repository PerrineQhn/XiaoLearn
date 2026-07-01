/**
 * cecr-a2-learn-sections.ts — contenu pédagogique manuel pour les 28 leçons A2.
 * Injecté dans cecr-course.ts via `learnSections: ...` sur chaque `LessonModule`.
 *
 * Règle produit : tous les `audio` pointent vers un fichier MP3/WAV pré-généré
 * (Azure Neural TTS — cf. xiaolearn_audio_policy). Convention A2 :
 *   audio/hsk2/hsk2_{hanzi}.wav  (ou hsk1/hsk3 selon le niveau réel du mot)
 */

import type { LessonV2LearnSection } from '../types/lesson-learn';

// ═════════════════════════════════════════════════════════════════════════════
// En ville & transports (cecr-a2-city)
// ═════════════════════════════════════════════════════════════════════════════

// --- cecr-a2-city-m1 — Demander son chemin ---------------------------------
export const a2CityDirectionsLearnSections: LessonV2LearnSection[] = [
  {
    id: 'a2-city-dir-ask',
    title: '请问 + lieu + 怎么走 ?',
    titleEn: '请问 + place + 怎么走?',
    body:
      'La phrase pour demander un chemin est ultra-stable en mandarin. Le squelette en trois temps :\n' +
      '\n' +
      '- 请问 (qǐngwèn) — « permettez-moi de demander »\n' +
      '- le lieu\n' +
      '- 怎么走 ? — littéralement « comment marcher ? »\n' +
      '\n' +
      'RÈGLE D\'OR : on ouvre **toujours** par 请问. Omettre ce marqueur rend la question abrupte, presque impolie.\n' +
      '\n' +
      'Astuce : une fois ce squelette mémorisé, il suffit de **changer le lieu**.',
    bodyEn:
      'Asking for directions in Mandarin follows a rock-solid template: you ALWAYS open with 请问 (qǐng wèn, "may I ask"), followed by the place, then 怎么走? (literally "how to walk?"). Skipping 请问 makes the question abrupt — almost rude. Once the skeleton is fixed, just swap the place name.',
    items: [
      { hanzi: '请问', pinyin: 'qǐng wèn', meaning: 'excusez-moi, puis-je demander', meaningEn: 'excuse me, may I ask', audio: 'audio/hsk2/hsk2_请问.wav' },
      { hanzi: '怎么走', pinyin: 'zěn me zǒu', meaning: 'comment y aller ?', meaningEn: 'how do I get there?', audio: 'audio/hsk2/hsk2_怎么走.wav' },
      { hanzi: '地铁站', pinyin: 'dì tiě zhàn', meaning: 'station de métro', meaningEn: 'metro station', audio: 'audio/hsk3/hsk3_地铁站.wav' },
      { hanzi: '附近', pinyin: 'fù jìn', meaning: 'à proximité', meaningEn: 'nearby', audio: 'audio/hsk3/hsk3_附近.wav' }
    ],
    tip:
      '请问 ne se traduit pas : c\'est un marqueur de politesse obligatoire. Même entre amis, on l\'utilise à un inconnu dans la rue.',
    tipEn:
      '请问 doesn\'t translate: it\'s a mandatory politeness marker. Even between friends, you use it with a stranger on the street.'
  },
  {
    id: 'a2-city-dir-verbs',
    title: '往 + direction + 走/拐',
    titleEn: '往 + direction + 走/拐',
    body:
      'Pour donner un itinéraire, le mandarin utilise deux verbes principaux : 走 (zǒu, marcher/continuer) et 拐 (guǎi, tourner).\n' +
      '\n' +
      'RÈGLE D\'OR : ils sont **toujours** précédés de 往 (wǎng, vers) + direction.\n' +
      '\n' +
      'Les combinaisons clés :\n' +
      '- 往前走 — continue tout droit\n' +
      '- 往左拐 — tourne à gauche\n' +
      '- 往右拐 — tourne à droite\n' +
      '- 一直走 — tout droit sans s\'arrêter\n' +
      '- 过马路 — traverser la rue',
    bodyEn:
      'To reply or give directions, Mandarin uses two main verbs: 走 (zǒu, walk/go) and 拐 (guǎi, turn). They always come after 往 (wǎng, toward) + direction: 往前走 (go straight), 往左拐 (turn left), 往右拐 (turn right). Distance follows: 一直走 (straight, no stopping), 过马路 (cross the street).',
    items: [
      { hanzi: '往前走', pinyin: 'wǎng qián zǒu', meaning: 'aller tout droit', meaningEn: 'go straight', audio: 'audio/hsk2/hsk2_往前走.wav' },
      { hanzi: '往左拐', pinyin: 'wǎng zuǒ guǎi', meaning: 'tourner à gauche', meaningEn: 'turn left', audio: 'audio/hsk3/hsk3_往左拐.wav' },
      { hanzi: '往右拐', pinyin: 'wǎng yòu guǎi', meaning: 'tourner à droite', meaningEn: 'turn right', audio: 'audio/hsk3/hsk3_往右拐.wav' },
      { hanzi: '一直', pinyin: 'yī zhí', meaning: 'tout droit, continuellement', meaningEn: 'straight, continuously', audio: 'audio/hsk3/hsk3_一直.wav' },
      { hanzi: '过马路', pinyin: 'guò mǎ lù', meaning: 'traverser la rue', meaningEn: 'cross the street', audio: 'audio/hsk3/hsk3_过马路.wav' }
    ],
    tip:
      'Ne confonds pas 走 (marcher à pied) et 去 (aller vers). 走 décrit le mouvement/le trajet ; 去 marque la destination.',
    tipEn:
      'Don\'t confuse 走 (walk/move) with 去 (go toward). 走 describes the motion/route; 去 marks the destination.'
  },
  {
    id: 'a2-city-dir-position',
    title: 'Situer : 旁边, 对面, 附近',
    titleEn: 'Locating: 旁边, 对面, 附近',
    body:
      'En chinois, les mots de position se placent **après** le nom — inverse du français, le repère vient d\'abord.\n' +
      '\n' +
      'Trois exemples avec 银行 (la banque) :\n' +
      '- 银行旁边 — à côté de la banque\n' +
      '- 银行对面 — en face de la banque\n' +
      '- 银行附近 — près de la banque\n' +
      '\n' +
      'Astuce : pour dire « X est à côté de Y », on utilise 在 — X 在 Y 旁边.',
    bodyEn:
      'Position words come AFTER the noun: 银行旁边 (next to the bank), 银行对面 (across from the bank), 银行附近 (near the bank). To say "X is next to Y", use 在: X 在 Y 旁边. This is the reverse of English — in Chinese, the reference point comes first.',
    items: [
      { hanzi: '旁边', pinyin: 'páng biān', meaning: 'à côté de', meaningEn: 'next to', audio: 'audio/hsk2/hsk2_旁边.wav' },
      { hanzi: '对面', pinyin: 'duì miàn', meaning: 'en face de', meaningEn: 'across from', audio: 'audio/hsk3/hsk3_对面.wav' },
      { hanzi: '前面', pinyin: 'qián miàn', meaning: 'devant', meaningEn: 'in front of', audio: 'audio/hsk2/hsk2_前面.wav' },
      { hanzi: '后面', pinyin: 'hòu miàn', meaning: 'derrière', meaningEn: 'behind', audio: 'audio/hsk2/hsk2_后面.wav' },
      { hanzi: '左边', pinyin: 'zuǒ biān', meaning: 'à gauche', meaningEn: 'on the left', audio: 'audio/hsk2/hsk2_左边.wav' },
      { hanzi: '右边', pinyin: 'yòu biān', meaning: 'à droite', meaningEn: 'on the right', audio: 'audio/hsk2/hsk2_右边.wav' }
    ]
  }
];

// --- cecr-a2-city-m2 — Les transports urbains -----------------------------
export const a2CityTransportsLearnSections: LessonV2LearnSection[] = [
  {
    id: 'a2-trans-zuo-qi',
    title: '坐 vs 骑 — la position du corps',
    titleEn: '坐 vs 骑 — body position',
    body:
      'Contrairement au français (« prendre » le métro, le vélo, l\'avion), le chinois distingue deux verbes selon la **posture du corps**.\n' +
      '\n' +
      'RÈGLE D\'OR :\n' +
      '- 坐 (zuò, « s\'asseoir ») — tout ce dans quoi on est assis : 坐地铁, 坐出租车, 坐飞机, 坐火车, 坐船\n' +
      '- 骑 (qí, « chevaucher ») — tout ce qu\'on enfourche : 骑自行车, 骑摩托车, 骑马\n' +
      '\n' +
      'Attention : erreur classique 坐自行车 ✗ — on dit **骑自行车**.',
    bodyEn:
      'Unlike English ("take" the subway, the bike, the plane), Chinese picks two different verbs by posture. 坐 (zuò, "sit") for anything you sit inside: 坐地铁, 坐出租车, 坐飞机, 坐火车, 坐船. 骑 (qí, "ride astride") for anything you straddle: 骑自行车, 骑摩托车, 骑马. Classic mistake: 坐自行车 ✗ — say 骑自行车.',
    items: [
      { hanzi: '坐', pinyin: 'zuò', meaning: 'prendre (assis)', meaningEn: 'take (seated)', audio: 'audio/hsk1/hsk1_坐.wav' },
      { hanzi: '骑', pinyin: 'qí', meaning: 'prendre (à califourchon)', meaningEn: 'ride astride', audio: 'audio/hsk3/hsk3_骑.wav' },
      { hanzi: '地铁', pinyin: 'dì tiě', meaning: 'métro', meaningEn: 'subway', audio: 'audio/hsk3/hsk3_地铁.wav' },
      { hanzi: '公共汽车', pinyin: 'gōng gòng qì chē', meaning: 'bus', meaningEn: 'bus', audio: 'audio/hsk2/hsk2_公共汽车.wav' },
      { hanzi: '出租车', pinyin: 'chū zū chē', meaning: 'taxi', meaningEn: 'taxi', audio: 'audio/hsk2/hsk2_出租车.wav' },
      { hanzi: '自行车', pinyin: 'zì xíng chē', meaning: 'vélo', meaningEn: 'bicycle', audio: 'audio/hsk3/hsk3_自行车.wav' }
    ],
    tip:
      'Le cheval : 骑马 (cheval) — on chevauche. Mais le bus : 坐公共汽车 — on est assis dedans. La position du corps décide toujours.',
    tipEn:
      'Horse: 骑马 — you straddle. But bus: 坐公共汽车 — you\'re seated inside. Body position always decides.'
  },
  {
    id: 'a2-trans-from-to',
    title: '从 A 到 B — de A à B',
    titleEn: '从 A 到 B — from A to B',
    body:
      'Pour décrire un trajet, le mandarin utilise la structure 从 (cóng, depuis) ... 到 (dào, jusqu\'à) ..., placée **avant le verbe**.\n' +
      '\n' +
      'Exemple : 我从北京到上海坐高铁 (je prends le TGV de Pékin à Shanghai).\n' +
      '\n' +
      'RÈGLE D\'OR : l\'ordre est strict — **temps/lieu avant verbe**. Pour demander la durée, 多长时间 ? (combien de temps ?).',
    bodyEn:
      'To describe a trip, Mandarin uses the 从 (cóng, from) ... 到 (dào, to) ... structure, placed BEFORE the verb: 我从北京到上海坐高铁 (I take the high-speed train from Beijing to Shanghai). Order is strict: time/place before verb. To ask how long: 多长时间? (how long?).',
    items: [
      { hanzi: '从', pinyin: 'cóng', meaning: 'depuis, à partir de', meaningEn: 'from', audio: 'audio/hsk2/hsk2_从.wav' },
      { hanzi: '到', pinyin: 'dào', meaning: 'jusqu\'à, arriver', meaningEn: 'to, arrive', audio: 'audio/hsk2/hsk2_到.wav' },
      { hanzi: '多长时间', pinyin: 'duō cháng shí jiān', meaning: 'combien de temps ?', meaningEn: 'how long?', audio: 'audio/hsk3/hsk3_多长时间.wav' },
      { hanzi: '小时', pinyin: 'xiǎo shí', meaning: 'heure (durée)', meaningEn: 'hour (duration)', audio: 'audio/hsk2/hsk2_小时.wav' },
      { hanzi: '分钟', pinyin: 'fēn zhōng', meaning: 'minute (durée)', meaningEn: 'minute (duration)', audio: 'audio/hsk2/hsk2_分钟.wav' }
    ]
  }
];

// --- cecr-a2-city-m3 — Lieux de la ville -----------------------------------
export const a2CityPlacesLearnSections: LessonV2LearnSection[] = [
  {
    id: 'a2-places-suffixes',
    title: 'Les 3 suffixes de lieux : 店, 馆, 院',
    titleEn: 'The 3 place suffixes: 店, 馆, 院',
    body:
      'La majorité des lieux urbains chinois suivent un schéma fixe : **[fonction] + suffixe**. Trois suffixes dominants :\n' +
      '\n' +
      '- 店 (diàn) — boutiques : 书店 librairie, 饭店 restaurant, 花店 fleuriste\n' +
      '- 馆 (guǎn) — établissements culturels : 图书馆 bibliothèque, 博物馆 musée, 咖啡馆 café\n' +
      '- 院 (yuàn) — grandes institutions : 医院 hôpital, 电影院 cinéma\n' +
      '\n' +
      'Astuce : reconnaître ces 3 suffixes te permet de deviner **80 %** des noms de lieux.',
    bodyEn:
      'Most Chinese urban places follow a fixed pattern: [function] + suffix. 店 (diàn) for shops: 书店 bookstore, 饭店 restaurant, 花店 florist. 馆 (guǎn) for cultural establishments: 图书馆 library, 博物馆 museum, 咖啡馆 café. 院 (yuàn) for big institutions: 医院 hospital, 电影院 cinema. Spotting these 3 suffixes lets you decode 80% of place names.',
    items: [
      { hanzi: '商店', pinyin: 'shāng diàn', meaning: 'boutique', meaningEn: 'shop', audio: 'audio/hsk1/hsk1_商店.wav' },
      { hanzi: '图书馆', pinyin: 'tú shū guǎn', meaning: 'bibliothèque', meaningEn: 'library', audio: 'audio/hsk3/hsk3_图书馆.wav' },
      { hanzi: '医院', pinyin: 'yī yuàn', meaning: 'hôpital', meaningEn: 'hospital', audio: 'audio/hsk1/hsk1_医院.wav' },
      { hanzi: '电影院', pinyin: 'diàn yǐng yuàn', meaning: 'cinéma', meaningEn: 'cinema', audio: 'audio/hsk3/hsk3_电影院.wav' },
      { hanzi: '银行', pinyin: 'yín háng', meaning: 'banque', meaningEn: 'bank', audio: 'audio/hsk3/hsk3_银行.wav' },
      { hanzi: '超市', pinyin: 'chāo shì', meaning: 'supermarché', meaningEn: 'supermarket', audio: 'audio/hsk3/hsk3_超市.wav' }
    ],
    tip:
      '银行 (yínháng) est une exception : littéralement « maison d\'argent ». Pour « bank » au sens financier, 行 se prononce háng, pas xíng.',
    tipEn:
      '银行 (yínháng) is an exception: literally "money house". For "bank" (financial), 行 is pronounced háng, not xíng.'
  },
  {
    id: 'a2-places-zai-nar',
    title: '...在哪儿 ? — où est... ?',
    titleEn: '...在哪儿? — where is...?',
    body:
      'Pour demander où se trouve un lieu, la structure chinoise est **l\'inverse du français** : le lieu d\'abord, puis 在哪儿 ?\n' +
      '\n' +
      'Exemple : 厕所在哪儿 ? (où sont les toilettes ?).\n' +
      '\n' +
      'Pour répondre, [lieu] 在 + repère. Le verbe 在 signifie ici « être situé à ».',
    bodyEn:
      'To ask where a place is, Chinese flips the French/English order: place first, then 在哪儿? Example: 厕所在哪儿? (where are the toilets?). To reply: [place] 在 + reference. The verb 在 here means "to be located at".',
    items: [
      { hanzi: '在哪儿', pinyin: 'zài nǎr', meaning: 'où ? (Nord)', meaningEn: 'where? (North)', audio: 'audio/hsk1/hsk1_在哪儿.wav' },
      { hanzi: '在哪里', pinyin: 'zài nǎ lǐ', meaning: 'où ? (Sud)', meaningEn: 'where? (South)', audio: 'audio/hsk1/hsk1_在哪里.wav' },
      { hanzi: '厕所', pinyin: 'cè suǒ', meaning: 'toilettes', meaningEn: 'toilet', audio: 'audio/hsk3/hsk3_厕所.wav' },
      { hanzi: '洗手间', pinyin: 'xǐ shǒu jiān', meaning: 'toilettes (poli)', meaningEn: 'restroom (polite)', audio: 'audio/hsk3/hsk3_洗手间.wav' }
    ],
    tip:
      '哪儿 est pékinois (érisation du 儿), 哪里 est du sud. Les deux sont corrects, mais au sud on entendra surtout 哪里.',
    tipEn:
      '哪儿 is Beijingese (the 儿 R-coloring), 哪里 is southern. Both are correct, but in the south you\'ll mostly hear 哪里.'
  }
];

// --- cecr-a2-city-m4 — Réserver un taxi (Didi) -----------------------------
export const a2CityTaxiLearnSections: LessonV2LearnSection[] = [
  {
    id: 'a2-taxi-shifu',
    title: '师傅 — le respect du chauffeur',
    titleEn: '师傅 — respecting the driver',
    body:
      '师傅 (shī fu, « maître, chef ») est l\'appellation à utiliser **absolument** avec un chauffeur de taxi, un livreur, un plombier — tout artisan.\n' +
      '\n' +
      'Attention : appeler un chauffeur 先生 (monsieur) sonne froid. 师傅 est le **bon niveau de respect informel**.\n' +
      '\n' +
      'Astuce : après 师傅, donne directement la destination — 师傅，我去 [lieu]. Ou encore plus direct : 去 [lieu].',
    bodyEn:
      '师傅 (shī fu, "master, chef") is the must-use address for a taxi driver, deliveryman, plumber, any craftsman. Calling a driver 先生 (sir) feels cold; 师傅 is the right level of informal respect. After 师傅, give the destination directly: 师傅，我去 [place]. Or even more direct: 去 [place].',
    items: [
      { hanzi: '师傅', pinyin: 'shī fu', meaning: 'chef (chauffeur, artisan)', meaningEn: 'master (driver, craftsman)', audio: 'audio/hsk3/hsk3_师傅.wav' },
      { hanzi: '去', pinyin: 'qù', meaning: 'aller à', meaningEn: 'go to', audio: 'audio/hsk1/hsk1_去.wav' },
      { hanzi: '机场', pinyin: 'jī chǎng', meaning: 'aéroport', meaningEn: 'airport', audio: 'audio/hsk2/hsk2_机场.wav' },
      { hanzi: '火车站', pinyin: 'huǒ chē zhàn', meaning: 'gare', meaningEn: 'train station', audio: 'audio/hsk2/hsk2_火车站.wav' }
    ],
    tip:
      '师傅 a une dimension de compétence technique : on ne l\'utilise pas pour un serveur (c\'est 服务员) ou un bureaucrate. Chauffeurs, mécaniciens, cuisiniers, oui.',
    tipEn:
      '师傅 carries a technical-skill flavor: don\'t use it for a waiter (that\'s 服务员) or an office worker. Drivers, mechanics, cooks, yes.'
  },
  {
    id: 'a2-taxi-arrival',
    title: 'À l\'arrivée : 到了, 就在这儿',
    titleEn: 'On arrival: 到了, 就在这儿',
    body:
      '到了 (dào le, « arrivé ») est la phrase courte que le chauffeur ou le passager lâche à destination.\n' +
      '\n' +
      'Pour préciser le point de dépose :\n' +
      '- 就在这儿 — juste ici\n' +
      '- 前面 — un peu plus loin\n' +
      '- 路口 — au carrefour\n' +
      '\n' +
      'Astuce paiement : 多少钱 ? (combien ?) — la réponse est presque toujours en **块**. Puis 用微信 (via WeChat) ou 用支付宝 (via Alipay), en scannant le QR code du chauffeur.',
    bodyEn:
      '到了 (dào le, "arrived") is the short phrase driver or passenger drops at destination. To pinpoint the drop-off: 就在这儿 ("right here"), 前面 (a bit further), 路口 (at the crossing). Paying: 多少钱? (how much?) — answer is almost always in 块. Then: 用微信 (via WeChat) or 用支付宝 (via Alipay), scanning the driver\'s QR.',
    items: [
      { hanzi: '到了', pinyin: 'dào le', meaning: 'c\'est arrivé', meaningEn: 'we\'ve arrived', audio: 'audio/hsk2/hsk2_到了.wav' },
      { hanzi: '就在这儿', pinyin: 'jiù zài zhèr', meaning: 'juste ici', meaningEn: 'right here', audio: 'audio/hsk3/hsk3_就在这儿.wav' },
      { hanzi: '多少钱', pinyin: 'duō shǎo qián', meaning: 'combien ça coûte ?', meaningEn: 'how much?', audio: 'audio/hsk1/hsk1_多少钱.wav' },
      { hanzi: '扫码', pinyin: 'sǎo mǎ', meaning: 'scanner le QR', meaningEn: 'scan the QR', audio: 'audio/hsk4/hsk4_扫码.wav' },
      { hanzi: '不用找了', pinyin: 'bú yòng zhǎo le', meaning: 'gardez la monnaie', meaningEn: 'keep the change', audio: 'audio/hsk3/hsk3_不用找了.wav' }
    ]
  }
];

// ═════════════════════════════════════════════════════════════════════════════
// Restaurants & courses (cecr-a2-food-shopping)
// ═════════════════════════════════════════════════════════════════════════════

// --- cecr-a2-food-m1 — Au restaurant : commander ---------------------------
export const a2FoodOrderLearnSections: LessonV2LearnSection[] = [
  {
    id: 'a2-food-dian',
    title: '点菜 : le verbe de la commande',
    titleEn: '点菜: the ordering verb',
    body:
      'En français, « commander » couvre tout. En chinois, on sépare. 点 (diǎn, « pointer ») est le **verbe universel au restaurant** :\n' +
      '\n' +
      '- 点菜 — commander la nourriture\n' +
      '- 点饮料 — commander les boissons\n' +
      '\n' +
      'Pour appeler le serveur : 服务员 ! (fú wù yuán). La structure-type est **我要 + quantité + classificateur + plat**.',
    bodyEn:
      'In English, "order" covers everything. In Chinese, it\'s split. 点 (diǎn, "point at") is the universal restaurant verb: 点菜 (order food), 点饮料 (order drinks). To call the waiter: 服务员! (fú wù yuán). Typical structure: 我要 + quantity + classifier + dish.',
    items: [
      { hanzi: '点菜', pinyin: 'diǎn cài', meaning: 'commander (un plat)', meaningEn: 'order (a dish)', audio: 'audio/hsk3/hsk3_点菜.wav' },
      { hanzi: '服务员', pinyin: 'fú wù yuán', meaning: 'serveur/se', meaningEn: 'waiter/waitress', audio: 'audio/hsk2/hsk2_服务员.wav' },
      { hanzi: '菜单', pinyin: 'cài dān', meaning: 'menu', meaningEn: 'menu', audio: 'audio/hsk3/hsk3_菜单.wav' },
      { hanzi: '我要', pinyin: 'wǒ yào', meaning: 'je veux / je voudrais', meaningEn: 'I want / I\'ll have', audio: 'audio/hsk1/hsk1_我要.wav' }
    ],
    tip:
      'En Chine, appeler 服务员 ! à haute voix à travers la salle n\'est ni impoli ni bruyant — c\'est la norme.',
    tipEn:
      'In China, shouting 服务员! across the room is neither rude nor noisy — it\'s the norm.'
  },
  {
    id: 'a2-food-classifiers',
    title: 'Classificateurs au restau : 个, 碗, 杯',
    titleEn: 'Restaurant classifiers: 个, 碗, 杯',
    body:
      'Le **classificateur** varie selon le contenant :\n' +
      '\n' +
      '- 个 (gè) — plats standards, en général (三个菜 = 3 plats)\n' +
      '- 碗 (wǎn) — tout ce qui se sert en bol : riz, soupe, nouilles (一碗米饭)\n' +
      '- 杯 (bēi) — tout ce qui se sert en verre : thé, jus, bière (一杯茶)\n' +
      '- 瓶 (píng) — bouteilles (一瓶啤酒)\n' +
      '\n' +
      'Attention : ne dis **jamais** 一个茶, c\'est 一杯茶.',
    bodyEn:
      'Classifier depends on the container. 个 (gè): standard dishes, general (三个菜 = 3 dishes). 碗 (wǎn): anything served in a bowl (rice, soup, noodles) — 一碗米饭. 杯 (bēi): anything served in a glass (tea, juice, beer) — 一杯茶. 瓶 (píng): bottles — 一瓶啤酒. NEVER say 一个茶: it\'s 一杯茶.',
    items: [
      { hanzi: '一个', pinyin: 'yí gè', meaning: 'un (générique)', meaningEn: 'one (generic)', audio: 'audio/hsk1/hsk1_一个.wav' },
      { hanzi: '一碗', pinyin: 'yì wǎn', meaning: 'un bol de', meaningEn: 'a bowl of', audio: 'audio/hsk3/hsk3_一碗.wav' },
      { hanzi: '一杯', pinyin: 'yì bēi', meaning: 'un verre/une tasse de', meaningEn: 'a glass/cup of', audio: 'audio/hsk1/hsk1_一杯.wav' },
      { hanzi: '一瓶', pinyin: 'yì píng', meaning: 'une bouteille de', meaningEn: 'a bottle of', audio: 'audio/hsk3/hsk3_一瓶.wav' },
      { hanzi: '买单', pinyin: 'mǎi dān', meaning: 'l\'addition (Sud)', meaningEn: 'the bill (South)', audio: 'audio/hsk3/hsk3_买单.wav' },
      { hanzi: '结账', pinyin: 'jié zhàng', meaning: 'régler (Nord)', meaningEn: 'check out (North)', audio: 'audio/hsk4/hsk4_结账.wav' }
    ]
  }
];

// --- cecr-a2-food-m2 — Goûts & saveurs -------------------------------------
export const a2FoodTasteLearnSections: LessonV2LearnSection[] = [
  {
    id: 'a2-taste-five',
    title: 'Les 5 saveurs : 酸甜苦辣咸',
    titleEn: 'The 5 flavors: 酸甜苦辣咸',
    body:
      'La gastronomie chinoise repose sur 5 saveurs fondamentales, associées aux 5 éléments de la médecine traditionnelle :\n' +
      '\n' +
      '- 酸 (suān) — acide\n' +
      '- 甜 (tián) — sucré\n' +
      '- 苦 (kǔ) — amer\n' +
      '- 辣 (là) — piquant\n' +
      '- 咸 (xián) — salé\n' +
      '\n' +
      'Remarque : 辣 n\'est techniquement pas un goût mais une **douleur** ressentie par les récepteurs thermiques. Les Chinois le comptent quand même dans la liste des « saveurs ».',
    bodyEn:
      'Chinese cuisine rests on 5 fundamental flavors, tied to the 5 elements of traditional medicine. 酸 (suān, sour), 甜 (tián, sweet), 苦 (kǔ, bitter), 辣 (là, spicy), 咸 (xián, salty). Fun fact: 辣 is technically not a taste but pain felt by heat receptors — Chinese still count it among the "flavors".',
    items: [
      { hanzi: '酸', pinyin: 'suān', meaning: 'acide', meaningEn: 'sour', audio: 'audio/hsk3/hsk3_酸.wav' },
      { hanzi: '甜', pinyin: 'tián', meaning: 'sucré', meaningEn: 'sweet', audio: 'audio/hsk3/hsk3_甜.wav' },
      { hanzi: '苦', pinyin: 'kǔ', meaning: 'amer', meaningEn: 'bitter', audio: 'audio/hsk4/hsk4_苦.wav' },
      { hanzi: '辣', pinyin: 'là', meaning: 'piquant', meaningEn: 'spicy', audio: 'audio/hsk3/hsk3_辣.wav' },
      { hanzi: '咸', pinyin: 'xián', meaning: 'salé', meaningEn: 'salty', audio: 'audio/hsk4/hsk4_咸.wav' }
    ]
  },
  {
    id: 'a2-taste-spicy-scale',
    title: 'Graduer le piquant',
    titleEn: 'Grading spiciness',
    body:
      'Au Sichuan, au Hunan, au Guizhou, on demande **toujours** le niveau de piquant. L\'échelle standard :\n' +
      '\n' +
      '- 微辣 — légèrement piquant\n' +
      '- 中辣 — moyen\n' +
      '- 特辣 — extra piquant\n' +
      '\n' +
      'Astuce : si tu ne supportes pas, 不要辣 (sans piquant) ou la phrase magique 我吃不了辣 (je ne peux pas manger piquant, littéralement « je-manger-pas-achevable piquant »).\n' +
      '\n' +
      'Pour juger un plat : 很好吃 (très bon), 太咸了 (trop salé), 有点辣 (un peu piquant).',
    bodyEn:
      'In Sichuan, Hunan, Guizhou, you always get asked your spice level. Standard scale: 微辣 (mild), 中辣 (medium), 特辣 (extra hot). If you can\'t handle it: 不要辣 (no spice) or the magic phrase 我吃不了辣 (I can\'t eat spicy, lit. "I-eat-not-achievable spicy"). To judge: 很好吃 (very tasty), 太咸了 (too salty), 有点辣 (a bit spicy).',
    items: [
      { hanzi: '微辣', pinyin: 'wēi là', meaning: 'légèrement piquant', meaningEn: 'mildly spicy', audio: 'audio/hsk4/hsk4_微辣.wav' },
      { hanzi: '中辣', pinyin: 'zhōng là', meaning: 'moyennement piquant', meaningEn: 'medium spicy', audio: 'audio/hsk3/hsk3_中辣.wav' },
      { hanzi: '特辣', pinyin: 'tè là', meaning: 'extra piquant', meaningEn: 'extra spicy', audio: 'audio/hsk3/hsk3_特辣.wav' },
      { hanzi: '好吃', pinyin: 'hǎo chī', meaning: 'bon (à manger)', meaningEn: 'tasty', audio: 'audio/hsk1/hsk1_好吃.wav' },
      { hanzi: '有点', pinyin: 'yǒu diǎn', meaning: 'un peu (+ négatif)', meaningEn: 'a bit (+ negative)', audio: 'audio/hsk3/hsk3_有点.wav' },
      { hanzi: '太…了', pinyin: 'tài... le', meaning: 'trop...', meaningEn: 'too...', audio: 'audio/hsk1/hsk1_太.wav' }
    ],
    tip:
      '有点 (un peu) a souvent une connotation NÉGATIVE : 有点贵 = un peu (trop) cher. Pour une nuance neutre, utilise 一点 APRÈS le verbe : 便宜一点 (un peu moins cher).',
    tipEn:
      '有点 (a bit) usually carries a NEGATIVE connotation: 有点贵 = a bit (too) expensive. For a neutral shade, use 一点 AFTER the verb: 便宜一点 (a bit cheaper).'
  }
];

// --- cecr-a2-food-m3 — Plats emblématiques ---------------------------------
export const a2FoodDishesLearnSections: LessonV2LearnSection[] = [
  {
    id: 'a2-dishes-decode',
    title: 'Décoder un nom de plat',
    titleEn: 'Decoding a dish name',
    body:
      'Les plats chinois se lisent comme des **équations**. Schéma : [style/marinade] + [ingrédient principal] + [forme].\n' +
      '\n' +
      'Deux exemples :\n' +
      '- 宫保鸡丁 = 宫保 (style « Gong Bao ») + 鸡 (poulet) + 丁 (dés)\n' +
      '- 糖醋里脊 = 糖醋 (sucré-acide) + 里脊 (filet de porc)\n' +
      '\n' +
      'Astuce : dès que tu connais une dizaine de « briques », tu devines **80 %** d\'un menu.',
    bodyEn:
      'Chinese dishes read like equations. Schema: [style/marinade] + [main ingredient] + [cut]. 宫保鸡丁 = 宫保 (Gong Bao style) + 鸡 (chicken) + 丁 (cubes). 糖醋里脊 = 糖醋 (sweet-sour) + 里脊 (pork tenderloin). Once you know ~10 "bricks", you decode 80% of a menu.',
    items: [
      { hanzi: '鸡', pinyin: 'jī', meaning: 'poulet', meaningEn: 'chicken', audio: 'audio/hsk2/hsk2_鸡.wav' },
      { hanzi: '牛肉', pinyin: 'niú ròu', meaning: 'bœuf', meaningEn: 'beef', audio: 'audio/hsk2/hsk2_牛肉.wav' },
      { hanzi: '猪肉', pinyin: 'zhū ròu', meaning: 'porc', meaningEn: 'pork', audio: 'audio/hsk3/hsk3_猪肉.wav' },
      { hanzi: '鱼', pinyin: 'yú', meaning: 'poisson', meaningEn: 'fish', audio: 'audio/hsk2/hsk2_鱼.wav' },
      { hanzi: '豆腐', pinyin: 'dòu fu', meaning: 'tofu', meaningEn: 'tofu', audio: 'audio/hsk4/hsk4_豆腐.wav' },
      { hanzi: '菜', pinyin: 'cài', meaning: 'légume / plat', meaningEn: 'vegetable / dish', audio: 'audio/hsk1/hsk1_菜.wav' }
    ]
  },
  {
    id: 'a2-dishes-methods',
    title: 'Modes de cuisson : 炒 · 炖 · 炸 · 蒸',
    titleEn: 'Cooking methods: 炒 · 炖 · 炸 · 蒸',
    body:
      'Chaque méthode de cuisson devient un caractère dans le nom du plat :\n' +
      '\n' +
      '- 炒 (chǎo) — sauté à feu vif (宫保鸡丁 est un 炒)\n' +
      '- 炖 (dùn) — mijoté longtemps, typique des soupes\n' +
      '- 炸 (zhá) — frit en bain d\'huile\n' +
      '- 蒸 (zhēng) — vapeur, doux, léger, typique cantonais\n' +
      '\n' +
      'Astuce de survie : évite **生** (shēng, cru) si tu n\'es pas sûr.',
    bodyEn:
      'Each cooking method becomes a character in the dish name. 炒 (chǎo, high-heat stir-fry) — 宫保鸡丁 is a 炒. 炖 (dùn, slow-stewed) — typical of soups. 炸 (zhá, deep-fried). 蒸 (zhēng, steamed) — soft, light, typical Cantonese. Survival rule: avoid 生 (shēng, raw) if unsure.',
    items: [
      { hanzi: '炒', pinyin: 'chǎo', meaning: 'sauté', meaningEn: 'stir-fry', audio: 'audio/hsk4/hsk4_炒.wav' },
      { hanzi: '炖', pinyin: 'dùn', meaning: 'mijoté', meaningEn: 'stew', audio: 'audio/hsk4/hsk4_炖.wav' },
      { hanzi: '炸', pinyin: 'zhá', meaning: 'frit', meaningEn: 'deep-fry', audio: 'audio/hsk4/hsk4_炸.wav' },
      { hanzi: '蒸', pinyin: 'zhēng', meaning: 'à la vapeur', meaningEn: 'steam', audio: 'audio/hsk4/hsk4_蒸.wav' },
      { hanzi: '饺子', pinyin: 'jiǎo zi', meaning: 'raviolis', meaningEn: 'dumplings', audio: 'audio/hsk3/hsk3_饺子.wav' },
      { hanzi: '米饭', pinyin: 'mǐ fàn', meaning: 'riz cuit', meaningEn: 'cooked rice', audio: 'audio/hsk2/hsk2_米饭.wav' }
    ],
    tip:
      '麻婆豆腐 (má pó dòufu) veut littéralement dire « tofu de la grand-mère grêlée » — c\'est le nom de son inventrice au Sichuan au XIXe siècle.',
    tipEn:
      '麻婆豆腐 (má pó dòufu) literally means "pockmarked-granny tofu" — named after its 19th-century Sichuan inventor.'
  }
];

// --- cecr-a2-food-m4 — Boissons & thé --------------------------------------
export const a2FoodDrinksLearnSections: LessonV2LearnSection[] = [
  {
    id: 'a2-drinks-tea',
    title: '茶 : le mot qui a voyagé',
    titleEn: '茶: the word that traveled',
    body:
      'Le mot 茶 (chá) a conquis le monde par deux voies — par la mer (Fujian, « te ») → tea/thé/Tee, par la terre (Mandarin, « cha ») → chai/çay.\n' +
      '\n' +
      'En Chine, on classe le thé par **couleur** :\n' +
      '- 绿茶 — vert (Zhejiang)\n' +
      '- 红茶 — rouge (= « black tea » en Occident)\n' +
      '- 乌龙茶 — oolong, semi-fermenté\n' +
      '- 普洱茶 — pu\'er, fermenté (Yunnan)\n' +
      '\n' +
      'Remarque : sans sucre, sans lait — le thé chinois se boit **pur**.',
    bodyEn:
      'The word 茶 (chá) conquered the world via two routes. Sea (Fujian, "te") → tea/thé/Tee. Land (Mandarin, "cha") → chai/çay. In China, tea is classified by color: 绿茶 (green, Zhejiang), 红茶 (red = "black tea" in the West), 乌龙茶 (oolong, semi-fermented), 普洱茶 (pu\'er, fermented, Yunnan). No sugar, no milk — Chinese tea is drunk pure.',
    items: [
      { hanzi: '茶', pinyin: 'chá', meaning: 'thé', meaningEn: 'tea', audio: 'audio/hsk1/hsk1_茶.wav' },
      { hanzi: '绿茶', pinyin: 'lǜ chá', meaning: 'thé vert', meaningEn: 'green tea', audio: 'audio/hsk3/hsk3_绿茶.wav' },
      { hanzi: '红茶', pinyin: 'hóng chá', meaning: 'thé rouge (noir)', meaningEn: 'red tea (black)', audio: 'audio/hsk3/hsk3_红茶.wav' },
      { hanzi: '乌龙茶', pinyin: 'wū lóng chá', meaning: 'thé oolong', meaningEn: 'oolong tea', audio: 'audio/hsk4/hsk4_乌龙茶.wav' }
    ]
  },
  {
    id: 'a2-drinks-water',
    title: '开水 : l\'eau chaude par défaut',
    titleEn: '开水: hot water by default',
    body:
      'Dans un restaurant chinois, si tu demandes juste 水 (shuǐ, eau), on te servira du **开水** (kāi shuǐ, eau bouillie chaude). C\'est le standard.\n' +
      '\n' +
      'Demander 冰水 (bīng shuǐ, eau glacée) ou 凉水 (liáng shuǐ, eau fraîche) te marque comme **occidental**.\n' +
      '\n' +
      'Remarque : il y a une croyance médicale traditionnelle — l\'eau froide « déséquilibre » l\'estomac.',
    bodyEn:
      'In a Chinese restaurant, if you just ask for 水 (shuǐ, water), you\'ll be served 开水 (kāi shuǐ, boiled hot water) — that\'s the default. Asking for 冰水 (bīng shuǐ, ice water) or 凉水 (liáng shuǐ, cool water) flags you as Western. Traditional medical belief: cold water "unbalances" the stomach.',
    items: [
      { hanzi: '水', pinyin: 'shuǐ', meaning: 'eau', meaningEn: 'water', audio: 'audio/hsk1/hsk1_水.wav' },
      { hanzi: '开水', pinyin: 'kāi shuǐ', meaning: 'eau chaude bouillie', meaningEn: 'boiled hot water', audio: 'audio/hsk3/hsk3_开水.wav' },
      { hanzi: '冰水', pinyin: 'bīng shuǐ', meaning: 'eau glacée', meaningEn: 'ice water', audio: 'audio/hsk3/hsk3_冰水.wav' },
      { hanzi: '果汁', pinyin: 'guǒ zhī', meaning: 'jus de fruit', meaningEn: 'juice', audio: 'audio/hsk3/hsk3_果汁.wav' },
      { hanzi: '啤酒', pinyin: 'pí jiǔ', meaning: 'bière', meaningEn: 'beer', audio: 'audio/hsk3/hsk3_啤酒.wav' },
      { hanzi: '咖啡', pinyin: 'kā fēi', meaning: 'café', meaningEn: 'coffee', audio: 'audio/hsk2/hsk2_咖啡.wav' }
    ],
    tip:
      'En Chine du nord, 开水 est servi même en été. Dans les bureaux, le distributeur d\'eau a toujours un robinet chaud — marqueur culturel discret mais omniprésent.',
    tipEn:
      'In northern China, 开水 is served even in summer. Office water dispensers always have a hot-water tap — a quiet but pervasive cultural marker.'
  }
];

// ═════════════════════════════════════════════════════════════════════════════
// Courses & paiement (cecr-a2-shopping-*)
// ═════════════════════════════════════════════════════════════════════════════

// --- cecr-a2-shopping-m1 — Les prix : 块, 毛, 分 ----------------------------
export const a2ShoppingPricesLearnSections: LessonV2LearnSection[] = [
  {
    id: 'a2-prices-kuai',
    title: '块 (oral) vs 元 (écrit)',
    titleEn: '块 (spoken) vs 元 (written)',
    body:
      'La monnaie chinoise est 人民币 (rén mín bì, RMB). L\'unité officielle écrite est 元 (yuán) — tu la vois sur les billets et les prix. Mais à l\'oral, on dit **块** (kuài).\n' +
      '\n' +
      'Attention : un Chinois ne dira **jamais** « 十元 » dans un restaurant — il dira 十块.\n' +
      '\n' +
      'Subdivisions parallèles :\n' +
      '- 1 元 = 10 角 (écrit) = 10 毛 (oral)\n' +
      '- 1 角 = 10 分',
    bodyEn:
      'Chinese currency is 人民币 (rén mín bì, RMB). Official written unit: 元 (yuán): you see it on bills and price tags. But spoken, it\'s 块 (kuài). A Chinese speaker NEVER says "十元" in a restaurant; they say 十块. Parallel subdivisions: 1 元 = 10 角 (written) = 10 毛 (spoken); 1 角 = 10 分.',
    items: [
      { hanzi: '人民币', pinyin: 'rén mín bì', meaning: 'yuan (RMB)', meaningEn: 'RMB', audio: 'audio/hsk3/hsk3_人民币.wav' },
      { hanzi: '元', pinyin: 'yuán', meaning: 'yuan (écrit)', meaningEn: 'yuan (written)', audio: 'audio/hsk3/hsk3_元.wav' },
      { hanzi: '块', pinyin: 'kuài', meaning: 'yuan (oral)', meaningEn: 'yuan (spoken)', audio: 'audio/hsk2/hsk2_块.wav' },
      { hanzi: '毛', pinyin: 'máo', meaning: '1/10 de yuan (oral)', meaningEn: '1/10 yuan (spoken)', audio: 'audio/hsk3/hsk3_毛.wav' },
      { hanzi: '分', pinyin: 'fēn', meaning: '1/100 de yuan', meaningEn: '1/100 yuan', audio: 'audio/hsk2/hsk2_分.wav' }
    ],
    tip:
      'Lire un prix comme 25,50 ¥ à l\'oral : 二十五块五 (sans prononcer 毛, qui est sous-entendu). C\'est la forme la plus naturelle.',
    tipEn:
      'To read 25.50 ¥ aloud: 二十五块五 (without saying 毛, which is implied). That\'s the most natural form.'
  },
  {
    id: 'a2-prices-bargain',
    title: 'Négocier : 便宜点儿, 打几折 ?',
    titleEn: 'Bargaining: 便宜点儿, 打几折?',
    body:
      'Dans les marchés, les boutiques de souvenirs ou sur Taobao, la négociation est **attendue**. Phrases-clés :\n' +
      '\n' +
      '- 太贵了 ! — trop cher !\n' +
      '- 便宜点儿 — un peu moins cher\n' +
      '- 能打折吗 ? — vous faites une réduction ?\n' +
      '\n' +
      'Attention au système des 折 : **7折 = 70 % du prix = 30 % de remise**. Donc 打几折 ? = combien tu réduis ? (littéralement « frapper combien de dixièmes ? »).',
    bodyEn:
      'In markets, souvenir shops or on Taobao, bargaining is expected. Key phrases: 太贵了! (too expensive!), 便宜点儿 (a bit cheaper), 能打折吗? (any discount?). Watch out for the 折 system: 7折 = 70% of the price = 30% off. 打几折? = how much off? (lit. "strike how many tenths?").',
    items: [
      { hanzi: '贵', pinyin: 'guì', meaning: 'cher', meaningEn: 'expensive', audio: 'audio/hsk2/hsk2_贵.wav' },
      { hanzi: '便宜', pinyin: 'pián yi', meaning: 'bon marché', meaningEn: 'cheap', audio: 'audio/hsk2/hsk2_便宜.wav' },
      { hanzi: '打折', pinyin: 'dǎ zhé', meaning: 'faire une remise', meaningEn: 'discount', audio: 'audio/hsk4/hsk4_打折.wav' },
      { hanzi: '便宜点儿', pinyin: 'pián yi diǎnr', meaning: 'un peu moins cher', meaningEn: 'a bit cheaper', audio: 'audio/hsk3/hsk3_便宜点儿.wav' }
    ]
  }
];

// --- cecr-a2-shopping-m2 — Vêtements & tailles ----------------------------
export const a2ShoppingClothesLearnSections: LessonV2LearnSection[] = [
  {
    id: 'a2-clothes-chuan-dai',
    title: '穿 vs 戴 : porter deux façons',
    titleEn: '穿 vs 戴: wear two ways',
    body:
      'Le français unique « porter » se **scinde** en chinois.\n' +
      '\n' +
      'RÈGLE D\'OR :\n' +
      '- 穿 (chuān) — vêtements, chaussures, chaussettes : 穿衣服, 穿鞋, 穿袜子\n' +
      '- 戴 (dài) — accessoires qui s\'accrochent : 戴眼镜 (lunettes), 戴帽子 (chapeau), 戴手表 (montre), 戴戒指 (bague)\n' +
      '\n' +
      'Astuce : si ça **couvre** une partie du corps = 穿 ; si ça **s\'accroche/s\'enfile** = 戴.',
    bodyEn:
      'English "wear" splits in Chinese. 穿 (chuān): clothes, shoes, socks (穿衣服, 穿鞋, 穿袜子). 戴 (dài): accessories that attach (戴眼镜 glasses, 戴帽子 hat, 戴手表 watch, 戴戒指 ring). Mnemonic: if it covers a body part = 穿; if it attaches/slips on = 戴.',
    items: [
      { hanzi: '穿', pinyin: 'chuān', meaning: 'porter (vêtements)', meaningEn: 'wear (clothes)', audio: 'audio/hsk2/hsk2_穿.wav' },
      { hanzi: '戴', pinyin: 'dài', meaning: 'porter (accessoires)', meaningEn: 'wear (accessory)', audio: 'audio/hsk4/hsk4_戴.wav' },
      { hanzi: '衣服', pinyin: 'yī fu', meaning: 'vêtement', meaningEn: 'clothing', audio: 'audio/hsk1/hsk1_衣服.wav' },
      { hanzi: '鞋', pinyin: 'xié', meaning: 'chaussure', meaningEn: 'shoe', audio: 'audio/hsk3/hsk3_鞋.wav' },
      { hanzi: '帽子', pinyin: 'mào zi', meaning: 'chapeau', meaningEn: 'hat', audio: 'audio/hsk3/hsk3_帽子.wav' },
      { hanzi: '眼镜', pinyin: 'yǎn jìng', meaning: 'lunettes', meaningEn: 'glasses', audio: 'audio/hsk4/hsk4_眼镜.wav' }
    ]
  },
  {
    id: 'a2-clothes-sizes',
    title: 'Tailles & essayer',
    titleEn: 'Sizes & trying on',
    body:
      'En Chine, les tailles s\'indiquent soit à la façon occidentale (S/M/L/XL), soit en chinois :\n' +
      '\n' +
      '- 小号 — S\n' +
      '- 中号 — M\n' +
      '- 大号 — L\n' +
      '- 加大号 — XL\n' +
      '\n' +
      'Phrases utiles :\n' +
      '- 我可以试试吗 ? — puis-je essayer ?\n' +
      '- 试衣间在哪儿 ? — où est la cabine ?\n' +
      '- 有别的颜色吗 ? — avez-vous une autre couleur ?\n' +
      '\n' +
      'Astuce : le verbe 试 se **redouble** pour adoucir (« un peu essayer »).',
    bodyEn:
      'In China, sizes are either Western (S/M/L/XL) or Chinese: 小号 (S), 中号 (M), 大号 (L), 加大号 (XL). Useful phrases: 我可以试试吗? (may I try?), 试衣间在哪儿? (where\'s the fitting room?), 有别的颜色吗? (any other color?). The verb 试 is doubled to soften ("try a little").',
    items: [
      { hanzi: '大号', pinyin: 'dà hào', meaning: 'grande taille (L)', meaningEn: 'large size', audio: 'audio/hsk3/hsk3_大号.wav' },
      { hanzi: '中号', pinyin: 'zhōng hào', meaning: 'taille moyenne (M)', meaningEn: 'medium size', audio: 'audio/hsk3/hsk3_中号.wav' },
      { hanzi: '小号', pinyin: 'xiǎo hào', meaning: 'petite taille (S)', meaningEn: 'small size', audio: 'audio/hsk3/hsk3_小号.wav' },
      { hanzi: '试', pinyin: 'shì', meaning: 'essayer', meaningEn: 'try', audio: 'audio/hsk2/hsk2_试.wav' },
      { hanzi: '颜色', pinyin: 'yán sè', meaning: 'couleur', meaningEn: 'color', audio: 'audio/hsk2/hsk2_颜色.wav' }
    ],
    tip:
      'Le verbe dupliqué (试试, 看看, 听听) a un effet de « un peu, pour voir » — il rend la demande plus légère et polie.',
    tipEn:
      'Doubling a verb (试试, 看看, 听听) creates a "just a little, to see" effect — it makes the request lighter and more polite.'
  }
];

// --- cecr-a2-shopping-m3 — Payer en Chine (微信/支付宝) --------------------
export const a2ShoppingPayLearnSections: LessonV2LearnSection[] = [
  {
    id: 'a2-pay-apps',
    title: 'Les 2 apps reines : 微信支付 et 支付宝',
    titleEn: 'The 2 kings: 微信支付 and 支付宝',
    body:
      'La Chine est de facto **sans cash**. Deux applications dominent :\n' +
      '\n' +
      '- 微信支付 — WeChat Pay (intégré à l\'appli de messagerie 微信)\n' +
      '- 支付宝 — Alipay (de Alibaba)\n' +
      '\n' +
      'On paye partout, du vendeur de rue au chauffeur. Le verbe-roi est **扫码** (sǎo mǎ, scanner le QR code).\n' +
      '\n' +
      'Astuce : variantes 扫一扫 (juste « scanner »), 扫二维码 (scanner le QR code).',
    bodyEn:
      'China is de facto cashless. Two apps rule: 微信支付 (WeChat Pay, built into the 微信 messenger) and 支付宝 (Alipay, by Alibaba). You pay everywhere — street vendor to driver. The king verb is 扫码 (sǎo mǎ, scan the QR). Variants: 扫一扫 (just "scan"), 扫二维码 (scan the QR code).',
    items: [
      { hanzi: '微信支付', pinyin: 'wēi xìn zhī fù', meaning: 'WeChat Pay', meaningEn: 'WeChat Pay', audio: 'audio/hsk4/hsk4_微信支付.wav' },
      { hanzi: '支付宝', pinyin: 'zhī fù bǎo', meaning: 'Alipay', meaningEn: 'Alipay', audio: 'audio/hsk4/hsk4_支付宝.wav' },
      { hanzi: '扫码', pinyin: 'sǎo mǎ', meaning: 'scanner le QR', meaningEn: 'scan QR', audio: 'audio/hsk4/hsk4_扫码.wav' },
      { hanzi: '二维码', pinyin: 'èr wéi mǎ', meaning: 'QR code', meaningEn: 'QR code', audio: 'audio/hsk4/hsk4_二维码.wav' },
      { hanzi: '现金', pinyin: 'xiàn jīn', meaning: 'argent liquide', meaningEn: 'cash', audio: 'audio/hsk4/hsk4_现金.wav' }
    ],
    tip:
      'Question fréquente à la caisse : 您扫我还是我扫您 ? (vous me scannez ou moi je vous scanne ?). Le client scanne le QR du vendeur dans 90 % des cas.',
    tipEn:
      'Common question at checkout: 您扫我还是我扫您? (you scan me or I scan you?). The customer scans the vendor\'s QR 90% of the time.'
  }
];

// --- cecr-a2-shopping-m4 — Quantités & classificateurs ---------------------
export const a2ShoppingClassifiersLearnSections: LessonV2LearnSection[] = [
  {
    id: 'a2-classif-must',
    title: 'Pourquoi un classificateur est obligatoire',
    titleEn: 'Why a classifier is mandatory',
    body:
      'En mandarin, entre un chiffre et un nom, on insère **toujours** un classificateur — comme on insère « feuille » entre « deux » et « papier » en français (« deux feuilles de papier »).\n' +
      '\n' +
      'Exemple : 两本书 (deux livres, littéralement « deux [tome] livre »).\n' +
      '\n' +
      'Attention : sans classificateur, 两书 ✗ est incorrect.\n' +
      '\n' +
      'Astuce : **个** (gè) est le joker — si tu ne sais pas, utilise 个, tu seras compris. Mais les vrais classificateurs font sonner plus naturel.',
    bodyEn:
      'In Mandarin, between a number and a noun, you ALWAYS insert a classifier — like "sheet" between "two" and "paper" in English ("two sheets of paper"). 两本书 (two books, lit. "two [volume] book"). Without classifier, 两书 ✗ is wrong. 个 (gè) is the wildcard — use it if unsure, you\'ll be understood — but the real classifier sounds more native.',
    items: [
      { hanzi: '个', pinyin: 'gè', meaning: 'classificateur générique', meaningEn: 'generic classifier', audio: 'audio/hsk1/hsk1_个.wav' },
      { hanzi: '本', pinyin: 'běn', meaning: 'cl. pour livres', meaningEn: 'cl. for books', audio: 'audio/hsk1/hsk1_本.wav' },
      { hanzi: '张', pinyin: 'zhāng', meaning: 'cl. pour objets plats', meaningEn: 'cl. for flat objects', audio: 'audio/hsk3/hsk3_张.wav' },
      { hanzi: '条', pinyin: 'tiáo', meaning: 'cl. pour objets longs', meaningEn: 'cl. for long objects', audio: 'audio/hsk3/hsk3_条.wav' },
      { hanzi: '件', pinyin: 'jiàn', meaning: 'cl. pour vêtements/événements', meaningEn: 'cl. for clothes/events', audio: 'audio/hsk3/hsk3_件.wav' }
    ]
  },
  {
    id: 'a2-classif-families',
    title: 'Classificateurs par famille d\'objets',
    titleEn: 'Classifiers by object family',
    body:
      'Chaque famille d\'objets a son classificateur :\n' +
      '\n' +
      '- 本 — livres\n' +
      '- 张 — papier, billet, table (plat)\n' +
      '- 条 — poisson, rue, pantalon (long et souple)\n' +
      '- 件 — vêtement, affaire\n' +
      '- 把 — couteau, parapluie, chaise (à poignée)\n' +
      '- 杯 — verre\n' +
      '- 碗 — bol\n' +
      '- 只 — animal\n' +
      '- 辆 — voiture\n' +
      '- 双 — paire\n' +
      '\n' +
      'Apprendre les **10 plus courants** = couvrir 90 % des cas.',
    bodyEn:
      'Each object family has its classifier. Books → 本. Paper/ticket/table → 张 (flat). Fish/road/pants → 条 (long and flexible). Clothes/matter → 件. Knife/umbrella/chair → 把 (with handle). Glass → 杯. Bowl → 碗. Animal → 只. Vehicle → 辆. Pair → 双. Learning the 10 most common = covering 90% of cases.',
    items: [
      { hanzi: '把', pinyin: 'bǎ', meaning: 'cl. objets à poignée', meaningEn: 'cl. handle objects', audio: 'audio/hsk3/hsk3_把.wav' },
      { hanzi: '杯', pinyin: 'bēi', meaning: 'cl. verres', meaningEn: 'cl. glasses', audio: 'audio/hsk1/hsk1_杯.wav' },
      { hanzi: '碗', pinyin: 'wǎn', meaning: 'cl. bols', meaningEn: 'cl. bowls', audio: 'audio/hsk3/hsk3_碗.wav' },
      { hanzi: '只', pinyin: 'zhī', meaning: 'cl. animaux', meaningEn: 'cl. animals', audio: 'audio/hsk3/hsk3_只.wav' },
      { hanzi: '辆', pinyin: 'liàng', meaning: 'cl. véhicules', meaningEn: 'cl. vehicles', audio: 'audio/hsk3/hsk3_辆.wav' },
      { hanzi: '双', pinyin: 'shuāng', meaning: 'cl. paires', meaningEn: 'cl. pairs', audio: 'audio/hsk3/hsk3_双.wav' }
    ],
    tip:
      '两 remplace 二 devant un classificateur : jamais 二个 ✗, toujours 两个. Exception : les dates (2 mois = 二月 le mois de février, 两个月 deux mois de durée).',
    tipEn:
      '两 replaces 二 before a classifier: never 二个 ✗, always 两个. Exception: dates (二月 = February month, 两个月 = two months of duration).'
  }
];

// ═════════════════════════════════════════════════════════════════════════════
// Journée & communication (cecr-a2-day-phone)
// ═════════════════════════════════════════════════════════════════════════════

// --- cecr-a2-day-m1 — L'heure en chinois -----------------------------------
export const a2DayTimeLearnSections: LessonV2LearnSection[] = [
  {
    id: 'a2-time-structure',
    title: '点 heure, 分 minute, 半 demi, 刻 quart',
    titleEn: '点 hour, 分 minute, 半 half, 刻 quarter',
    body:
      'L\'heure chinoise suit un schéma strict : **[chiffre] 点 [chiffre] 分**.\n' +
      '\n' +
      '8h30 s\'écrit 八点三十分 mais se dit plus naturellement 八点半 (8 et demie).\n' +
      '\n' +
      'Les quarts :\n' +
      '- 一刻 — 15 min\n' +
      '- 三刻 — 45 min\n' +
      '- 两刻 existe mais on préfère 半\n' +
      '\n' +
      'Pour « moins », 差 (chà, manquer). 8h45 = 九点差一刻 (à 9h moins un quart).',
    bodyEn:
      'Chinese time follows a strict pattern: [number] 点 [number] 分. 8:30 is written 八点三十分 but more naturally said 八点半 (half past 8). Quarters: 一刻 (15 min), 三刻 (45 min). 两刻 exists but 半 is preferred. For "to": 差 (chà, lack). 8:45 = 九点差一刻 (a quarter to 9).',
    items: [
      { hanzi: '点', pinyin: 'diǎn', meaning: 'heure (marqueur)', meaningEn: 'o\'clock', audio: 'audio/hsk1/hsk1_点.wav' },
      { hanzi: '分', pinyin: 'fēn', meaning: 'minute', meaningEn: 'minute', audio: 'audio/hsk2/hsk2_分.wav' },
      { hanzi: '半', pinyin: 'bàn', meaning: 'et demi', meaningEn: 'half', audio: 'audio/hsk2/hsk2_半.wav' },
      { hanzi: '刻', pinyin: 'kè', meaning: 'quart d\'heure', meaningEn: 'quarter', audio: 'audio/hsk3/hsk3_刻.wav' },
      { hanzi: '差', pinyin: 'chà', meaning: 'manquer (moins)', meaningEn: 'lack (to/minus)', audio: 'audio/hsk3/hsk3_差.wav' }
    ]
  },
  {
    id: 'a2-time-am-pm',
    title: 'Matin/midi/après-midi AVANT l\'heure',
    titleEn: 'Morning/noon/afternoon BEFORE the time',
    body:
      'Les marqueurs AM/PM chinois se placent **avant l\'heure** (contrairement à « 8h du matin » en français).\n' +
      '\n' +
      '- 上午 (shàngwǔ) — matin\n' +
      '- 中午 (zhōngwǔ) — midi\n' +
      '- 下午 (xiàwǔ) — après-midi\n' +
      '- 晚上 (wǎnshàng) — soir\n' +
      '- 凌晨 (língchén) — petite heure du matin\n' +
      '\n' +
      'Exemples : 下午三点 (15h), 晚上八点 (20h). Pour demander : 现在几点 ? (il est quelle heure ?).',
    bodyEn:
      'Chinese AM/PM markers come BEFORE the time (unlike English "8 AM"). 上午 (shàngwǔ, morning), 中午 (zhōngwǔ, noon), 下午 (xiàwǔ, afternoon), 晚上 (wǎnshàng, evening), 凌晨 (língchén, small hours). Example: 下午三点 (3pm), 晚上八点 (8pm). Ask: 现在几点? (what time is it?).',
    items: [
      { hanzi: '上午', pinyin: 'shàng wǔ', meaning: 'matin', meaningEn: 'morning', audio: 'audio/hsk2/hsk2_上午.wav' },
      { hanzi: '中午', pinyin: 'zhōng wǔ', meaning: 'midi', meaningEn: 'noon', audio: 'audio/hsk2/hsk2_中午.wav' },
      { hanzi: '下午', pinyin: 'xià wǔ', meaning: 'après-midi', meaningEn: 'afternoon', audio: 'audio/hsk1/hsk1_下午.wav' },
      { hanzi: '晚上', pinyin: 'wǎn shàng', meaning: 'soir', meaningEn: 'evening', audio: 'audio/hsk2/hsk2_晚上.wav' },
      { hanzi: '现在', pinyin: 'xiàn zài', meaning: 'maintenant', meaningEn: 'now', audio: 'audio/hsk1/hsk1_现在.wav' },
      { hanzi: '几点', pinyin: 'jǐ diǎn', meaning: 'quelle heure ?', meaningEn: 'what time?', audio: 'audio/hsk1/hsk1_几点.wav' }
    ]
  }
];

// --- cecr-a2-day-m2 — Routine quotidienne ----------------------------------
export const a2DayRoutineLearnSections: LessonV2LearnSection[] = [
  {
    id: 'a2-routine-order',
    title: 'Ordre TEMPS avant VERBE',
    titleEn: 'Time-before-Verb order',
    body:
      'En chinois, le temps se place **toujours avant le verbe**. Deux positions acceptables : avant ou après le sujet.\n' +
      '\n' +
      'Exemple : 我早上七点起床 ou 早上七点我起床 (je me lève à 7h).\n' +
      '\n' +
      'Attention : **jamais après le verbe** — 我起床早上 ✗.\n' +
      '\n' +
      'Cette règle vaut pour l\'heure (八点), le jour (星期一), la fréquence (每天) et les repères (以前, 以后).',
    bodyEn:
      'Chinese golden rule: time BEFORE the verb. Two accepted positions: before or after subject. 我早上七点起床 or 早上七点我起床 (I wake up at 7). Never after the verb: 我起床早上 ✗. Same rule for times (八点), days (星期一), frequency (每天), reference points (以前, 以后).',
    items: [
      { hanzi: '起床', pinyin: 'qǐ chuáng', meaning: 'se lever', meaningEn: 'get up', audio: 'audio/hsk2/hsk2_起床.wav' },
      { hanzi: '刷牙', pinyin: 'shuā yá', meaning: 'se brosser les dents', meaningEn: 'brush teeth', audio: 'audio/hsk3/hsk3_刷牙.wav' },
      { hanzi: '洗脸', pinyin: 'xǐ liǎn', meaning: 'se laver le visage', meaningEn: 'wash face', audio: 'audio/hsk3/hsk3_洗脸.wav' },
      { hanzi: '吃早饭', pinyin: 'chī zǎo fàn', meaning: 'prendre le petit-déjeuner', meaningEn: 'eat breakfast', audio: 'audio/hsk2/hsk2_吃早饭.wav' },
      { hanzi: '睡觉', pinyin: 'shuì jiào', meaning: 'dormir', meaningEn: 'sleep', audio: 'audio/hsk1/hsk1_睡觉.wav' }
    ]
  },
  {
    id: 'a2-routine-freq',
    title: 'Fréquence : 每天, 常常, 有时候, 从不',
    titleEn: 'Frequency: 每天, 常常, 有时候, 从不',
    body:
      'Les adverbes de fréquence se placent **avant le verbe**.\n' +
      '\n' +
      '- 每天 (měitiān) — chaque jour\n' +
      '- 常常 (chángcháng) — souvent\n' +
      '- 有时候 (yǒushíhòu) — parfois\n' +
      '- 从不 (cóngbù) — jamais (+ verbe positif)\n' +
      '\n' +
      'Exemple : 我常常看电影 (je regarde souvent des films).\n' +
      '\n' +
      'Astuce : pour « jamais », utilise aussi **从来不** — plus emphatique.',
    bodyEn:
      'Frequency adverbs go BEFORE the verb. 每天 (měi tiān, every day), 常常 (cháng cháng, often), 有时候 (yǒu shí hòu, sometimes), 从不 (cóng bù, never, + positive verb). Example: 我常常看电影 (I often watch movies). For "never", also 从来不 — more emphatic.',
    items: [
      { hanzi: '每天', pinyin: 'měi tiān', meaning: 'chaque jour', meaningEn: 'every day', audio: 'audio/hsk2/hsk2_每天.wav' },
      { hanzi: '常常', pinyin: 'cháng cháng', meaning: 'souvent', meaningEn: 'often', audio: 'audio/hsk2/hsk2_常常.wav' },
      { hanzi: '有时候', pinyin: 'yǒu shí hòu', meaning: 'parfois', meaningEn: 'sometimes', audio: 'audio/hsk3/hsk3_有时候.wav' },
      { hanzi: '从不', pinyin: 'cóng bù', meaning: 'ne jamais', meaningEn: 'never', audio: 'audio/hsk4/hsk4_从不.wav' }
    ]
  }
];

// --- cecr-a2-day-m3 — Météo & saisons --------------------------------------
export const a2DayWeatherLearnSections: LessonV2LearnSection[] = [
  {
    id: 'a2-weather-pattern',
    title: 'Le pattern 天气 + 很 + adjectif',
    titleEn: 'The 天气 + 很 + adjective pattern',
    body:
      'En chinois, on ne dit **pas** « le temps EST chaud » — pas de verbe « être » (是) avec un adjectif.\n' +
      '\n' +
      'La structure correcte est **天气很热** (littéralement « le temps très chaud »).\n' +
      '\n' +
      'Le 很 (hěn) est quasi **obligatoire** : il n\'a presque plus son sens de « très », il sert juste de liaison entre sujet et adjectif.\n' +
      '\n' +
      'Attention : erreur 今天天气是热 ✗. Correct : 今天天气很热.',
    bodyEn:
      'In Chinese, you do NOT say "the weather IS hot" — no "to be" verb (是) with an adjective. Correct structure: 天气很热 (lit. "weather very hot"). The 很 (hěn) is nearly mandatory; it barely keeps its "very" meaning, it just links subject and adjective. Error: 今天天气是热 ✗. Correct: 今天天气很热.',
    items: [
      { hanzi: '天气', pinyin: 'tiān qì', meaning: 'temps, météo', meaningEn: 'weather', audio: 'audio/hsk1/hsk1_天气.wav' },
      { hanzi: '冷', pinyin: 'lěng', meaning: 'froid', meaningEn: 'cold', audio: 'audio/hsk1/hsk1_冷.wav' },
      { hanzi: '热', pinyin: 'rè', meaning: 'chaud', meaningEn: 'hot', audio: 'audio/hsk1/hsk1_热.wav' },
      { hanzi: '暖和', pinyin: 'nuǎn huo', meaning: 'doux, tiède', meaningEn: 'mild', audio: 'audio/hsk4/hsk4_暖和.wav' },
      { hanzi: '凉快', pinyin: 'liáng kuai', meaning: 'frais', meaningEn: 'cool', audio: 'audio/hsk4/hsk4_凉快.wav' }
    ],
    tip:
      '很 ne veut pas dire « très » ici — c\'est juste un lien. Pour un vrai « très », utilise 非常 (fēicháng) : 天气非常热 (il fait vraiment chaud).',
    tipEn:
      '很 doesn\'t mean "very" here — it\'s just a link. For real "very", use 非常 (fēicháng): 天气非常热 (it\'s really hot).'
  },
  {
    id: 'a2-weather-verbs',
    title: 'Phénomènes = verbes (下雨, 下雪, 刮风)',
    titleEn: 'Phenomena = verbs (下雨, 下雪, 刮风)',
    body:
      'Là où le français a des expressions fixes (« il pleut »), le chinois utilise des **verbes** :\n' +
      '\n' +
      '- 下雨 (xiàyǔ) — « tomber pluie » = il pleut\n' +
      '- 下雪 (xiàxuě) — il neige\n' +
      '- 刮风 (guāfēng) — il vente (littéralement « racler vent »)\n' +
      '\n' +
      'Astuce : on peut les conjuguer comme des verbes normaux — 昨天下雨了 (il a plu hier), 明天会下雪 (il neigera demain).',
    bodyEn:
      'Where English has fixed expressions ("it\'s raining"), Chinese uses VERBS. 下雨 (xiàyǔ) = "fall rain" = it rains. 下雪 (xiàxuě) = it snows. 刮风 (guāfēng) = it\'s windy (lit. "scrape wind"). Treat them as normal verbs: 昨天下雨了 (it rained yesterday), 明天会下雪 (it\'ll snow tomorrow).',
    items: [
      { hanzi: '下雨', pinyin: 'xià yǔ', meaning: 'pleuvoir', meaningEn: 'rain', audio: 'audio/hsk2/hsk2_下雨.wav' },
      { hanzi: '下雪', pinyin: 'xià xuě', meaning: 'neiger', meaningEn: 'snow', audio: 'audio/hsk2/hsk2_下雪.wav' },
      { hanzi: '刮风', pinyin: 'guā fēng', meaning: 'venter', meaningEn: 'wind blows', audio: 'audio/hsk4/hsk4_刮风.wav' },
      { hanzi: '春天', pinyin: 'chūn tiān', meaning: 'printemps', meaningEn: 'spring', audio: 'audio/hsk3/hsk3_春天.wav' },
      { hanzi: '夏天', pinyin: 'xià tiān', meaning: 'été', meaningEn: 'summer', audio: 'audio/hsk3/hsk3_夏天.wav' },
      { hanzi: '秋天', pinyin: 'qiū tiān', meaning: 'automne', meaningEn: 'autumn', audio: 'audio/hsk3/hsk3_秋天.wav' },
      { hanzi: '冬天', pinyin: 'dōng tiān', meaning: 'hiver', meaningEn: 'winter', audio: 'audio/hsk3/hsk3_冬天.wav' }
    ]
  }
];

// --- cecr-a2-day-m4 — Dates & jours ----------------------------------------
export const a2DayDatesLearnSections: LessonV2LearnSection[] = [
  {
    id: 'a2-dates-order',
    title: 'Grand au petit : 年 > 月 > 日',
    titleEn: 'Big to small: 年 > 月 > 日',
    body:
      'Les dates chinoises descendent du **grand au petit** — l\'inverse du français.\n' +
      '\n' +
      'Exemple : 2026年4月21日 = « année 2026, mois 4, jour 21 ».\n' +
      '\n' +
      'Astuce : pour lire l\'année, prononce **chaque chiffre** — 二零二六 (2-0-2-6), jamais « deux mille vingt-six ».\n' +
      '\n' +
      'Remarque : 号 (hào) est une variante orale de 日 (rì) pour les jours du mois. Exemple : 今天十五号.',
    bodyEn:
      'Chinese dates go big to small — reverse of English. 2026年4月21日 = "year 2026, month 4, day 21". To read the year, say EACH digit: 二零二六 (2-0-2-6), never "two thousand twenty-six". 号 (hào) is the spoken variant of 日 (rì) for month-days. Day of month: 今天十五号.',
    items: [
      { hanzi: '年', pinyin: 'nián', meaning: 'année', meaningEn: 'year', audio: 'audio/hsk1/hsk1_年.wav' },
      { hanzi: '月', pinyin: 'yuè', meaning: 'mois', meaningEn: 'month', audio: 'audio/hsk1/hsk1_月.wav' },
      { hanzi: '日', pinyin: 'rì', meaning: 'jour (écrit)', meaningEn: 'day (written)', audio: 'audio/hsk1/hsk1_日.wav' },
      { hanzi: '号', pinyin: 'hào', meaning: 'jour (oral)', meaningEn: 'day (spoken)', audio: 'audio/hsk2/hsk2_号.wav' }
    ]
  },
  {
    id: 'a2-dates-week',
    title: '星期 + chiffre = jours de la semaine',
    titleEn: '星期 + number = weekdays',
    body:
      'Les jours de la semaine se forment de façon logique : **星期 + chiffre 1 à 6**. 星期一 (lundi), 星期二 (mardi), ..., 星期六 (samedi).\n' +
      '\n' +
      'Exception : le dimanche est **星期天** ou 星期日, pas « 星期七 ».\n' +
      '\n' +
      'Variante plus courte, très fréquente à l\'oral — 周一, 周二, ..., 周日.\n' +
      '\n' +
      'Pour demander : 今天星期几 ? (quel jour sommes-nous ?).',
    bodyEn:
      'Weekdays are built logically: 星期 (xīng qī, week) + number 1 to 6. 星期一 (Mon), 星期二 (Tue), ..., 星期六 (Sat). Sunday is the exception: 星期天 or 星期日, not "星期七". Shorter variant, very common orally: 周一, 周二, ..., 周日. Ask: 今天星期几? (what day is it?).',
    items: [
      { hanzi: '星期', pinyin: 'xīng qī', meaning: 'semaine', meaningEn: 'week', audio: 'audio/hsk1/hsk1_星期.wav' },
      { hanzi: '星期一', pinyin: 'xīng qī yī', meaning: 'lundi', meaningEn: 'Monday', audio: 'audio/hsk1/hsk1_星期一.wav' },
      { hanzi: '星期天', pinyin: 'xīng qī tiān', meaning: 'dimanche', meaningEn: 'Sunday', audio: 'audio/hsk1/hsk1_星期天.wav' },
      { hanzi: '今天', pinyin: 'jīn tiān', meaning: 'aujourd\'hui', meaningEn: 'today', audio: 'audio/hsk1/hsk1_今天.wav' },
      { hanzi: '明天', pinyin: 'míng tiān', meaning: 'demain', meaningEn: 'tomorrow', audio: 'audio/hsk1/hsk1_明天.wav' },
      { hanzi: '昨天', pinyin: 'zuó tiān', meaning: 'hier', meaningEn: 'yesterday', audio: 'audio/hsk1/hsk1_昨天.wav' }
    ],
    tip:
      '周末 (zhōumò) = week-end. 周一到周五 = du lundi au vendredi. Les messages d\'entreprise utilisent presque toujours la forme 周X, plus pro.',
    tipEn:
      '周末 (zhōumò) = weekend. 周一到周五 = Mon to Fri. Business messages almost always use the 周X form, more professional.'
  }
];

// ═════════════════════════════════════════════════════════════════════════════
// Téléphone / urgence (cecr-a2-phone-*)
// ═════════════════════════════════════════════════════════════════════════════

// --- cecr-a2-phone-m1 — Décrocher, raccrocher ------------------------------
export const a2PhoneCallLearnSections: LessonV2LearnSection[] = [
  {
    id: 'a2-phone-wei',
    title: '喂 ? — le « allô » chinois',
    titleEn: '喂? — the Chinese "hello"',
    body:
      'Au téléphone, on ouvre par **喂 ?** avec un ton interrogatif qui monte — presque « wéi » (ton 2) au lieu de « wèi » (ton 4). Cette convention téléphonique sonne plus douce.\n' +
      '\n' +
      'Ensuite, on se présente ou on demande :\n' +
      '- 你是哪位 ? — qui est-ce ? (poli)\n' +
      '- 你是谁 ? — plus familier\n' +
      '\n' +
      'Pour raccrocher, 挂 ! mais en pratique, on conclut par 好, 再见.',
    bodyEn:
      'On the phone, open with 喂? using a rising tone — almost "wéi" (tone 2) instead of "wèi" (tone 4). This phone convention sounds softer. Then introduce yourself or ask: 你是哪位? (who\'s this, polite) or 你是谁? (more casual). To hang up: 挂 ! but in practice, wrap with 好, 再见.',
    items: [
      { hanzi: '喂', pinyin: 'wéi / wèi', meaning: 'allô (téléphone)', meaningEn: 'hello (phone)', audio: 'audio/hsk3/hsk3_喂.wav' },
      { hanzi: '你是哪位', pinyin: 'nǐ shì nǎ wèi', meaning: 'qui est à l\'appareil ?', meaningEn: 'who\'s this? (polite)', audio: 'audio/hsk3/hsk3_你是哪位.wav' },
      { hanzi: '打电话', pinyin: 'dǎ diàn huà', meaning: 'passer un appel', meaningEn: 'make a call', audio: 'audio/hsk1/hsk1_打电话.wav' },
      { hanzi: '接电话', pinyin: 'jiē diàn huà', meaning: 'décrocher', meaningEn: 'pick up', audio: 'audio/hsk3/hsk3_接电话.wav' },
      { hanzi: '挂电话', pinyin: 'guà diàn huà', meaning: 'raccrocher', meaningEn: 'hang up', audio: 'audio/hsk3/hsk3_挂电话.wav' }
    ],
    tip:
      '打 (dǎ, frapper) est le verbe pour « passer un appel », exactement comme « frapper » au téléphone est un archaïsme français. Mnémotechnique : on tape un numéro sur les touches.',
    tipEn:
      '打 (dǎ, to hit) is the verb for "make a call", just as "to strike" a phone number is an old image. Mnemonic: you tap the keys.'
  }
];

// --- cecr-a2-phone-m2 — Messages WeChat ------------------------------------
export const a2PhoneWechatLearnSections: LessonV2LearnSection[] = [
  {
    id: 'a2-wechat-ecosystem',
    title: '微信 : plus qu\'une messagerie',
    titleEn: '微信: more than a messenger',
    body:
      '微信 (Wēi Xìn, « micro-message ») est **omniprésent** en Chine : messagerie, paiement, mini-apps, réseau social, hôpital, ticket de train, santé publique.\n' +
      '\n' +
      'Vocabulaire clé :\n' +
      '- 加好友 — ajouter un ami\n' +
      '- 扫一扫 — scanner le QR pour ajouter\n' +
      '- 发消息 — envoyer un message\n' +
      '- 语音 — message vocal (la forme **préférée** en Chine)\n' +
      '- 视频通话 — appel vidéo\n' +
      '- 朋友圈 — Moments, le fil d\'actualité',
    bodyEn:
      '微信 (Wēi Xìn, "micro-message") is omnipresent in China: messenger, payment, mini-apps, social network, hospital, train ticket, public health. Key vocab: 加好友 (add friend), 扫一扫 (scan QR to add), 发消息 (send message), 语音 (voice message — THE preferred form in China), 视频通话 (video call), 朋友圈 (Moments, the feed).',
    items: [
      { hanzi: '微信', pinyin: 'wēi xìn', meaning: 'WeChat', meaningEn: 'WeChat', audio: 'audio/hsk4/hsk4_微信.wav' },
      { hanzi: '加好友', pinyin: 'jiā hǎo yǒu', meaning: 'ajouter un ami', meaningEn: 'add friend', audio: 'audio/hsk4/hsk4_加好友.wav' },
      { hanzi: '发消息', pinyin: 'fā xiāo xi', meaning: 'envoyer un message', meaningEn: 'send message', audio: 'audio/hsk3/hsk3_发消息.wav' },
      { hanzi: '语音', pinyin: 'yǔ yīn', meaning: 'message vocal', meaningEn: 'voice message', audio: 'audio/hsk4/hsk4_语音.wav' },
      { hanzi: '朋友圈', pinyin: 'péng yǒu quān', meaning: 'Moments (fil social)', meaningEn: 'Moments (social feed)', audio: 'audio/hsk4/hsk4_朋友圈.wav' }
    ],
    tip:
      'Envoyer un 语音 (audio) à un patron ou un inconnu est courant en Chine — là où en Europe ce serait perçu comme trop familier. Codes différents.',
    tipEn:
      'Sending a 语音 (voice message) to a boss or stranger is common in China — where in Europe it would feel too casual. Different codes.'
  }
];

// --- cecr-a2-phone-m3 — Urgence & problème ---------------------------------
export const a2PhoneEmergencyLearnSections: LessonV2LearnSection[] = [
  {
    id: 'a2-emer-numbers',
    title: 'Les 3 numéros d\'urgence',
    titleEn: 'The 3 emergency numbers',
    body:
      'À connaître **absolument** avant d\'aller en Chine :\n' +
      '\n' +
      '- 110 — police (警察)\n' +
      '- 119 — pompiers (消防)\n' +
      '- 120 — ambulance (救护车)\n' +
      '\n' +
      'Pour appeler au secours, cris standards : 救命 ! (jiù mìng !, « sauvez-moi »), 帮帮我 ! (aidez-moi).\n' +
      '\n' +
      'Pour expliquer :\n' +
      '- 我病了 — je suis malade\n' +
      '- 我受伤了 — je suis blessé\n' +
      '- 我迷路了 — je suis perdu\n' +
      '\n' +
      'Remarque : le **了** final marque un changement d\'état.',
    bodyEn:
      'Must-know before going to China: 110 police (警察), 119 fire (消防), 120 ambulance (救护车). To shout for help, standard cries: 救命! (jiù mìng!, "save me"), 帮帮我! (help me). Explain: 我病了 (I\'m sick), 我受伤了 (I\'m hurt), 我迷路了 (I\'m lost). Final 了 marks a state change.',
    items: [
      { hanzi: '救命', pinyin: 'jiù mìng', meaning: 'au secours !', meaningEn: 'help! (cry)', audio: 'audio/hsk4/hsk4_救命.wav' },
      { hanzi: '警察', pinyin: 'jǐng chá', meaning: 'police', meaningEn: 'police', audio: 'audio/hsk3/hsk3_警察.wav' },
      { hanzi: '救护车', pinyin: 'jiù hù chē', meaning: 'ambulance', meaningEn: 'ambulance', audio: 'audio/hsk4/hsk4_救护车.wav' },
      { hanzi: '病了', pinyin: 'bìng le', meaning: 'je suis tombé malade', meaningEn: 'got sick', audio: 'audio/hsk2/hsk2_病了.wav' },
      { hanzi: '迷路', pinyin: 'mí lù', meaning: 'se perdre', meaningEn: 'get lost', audio: 'audio/hsk4/hsk4_迷路.wav' },
      { hanzi: '护照', pinyin: 'hù zhào', meaning: 'passeport', meaningEn: 'passport', audio: 'audio/hsk3/hsk3_护照.wav' }
    ],
    tip:
      'En voyage, porte toujours l\'adresse de ton hôtel écrite en caractères chinois (pas en pinyin !). Les chauffeurs de taxi ne lisent le pinyin que rarement.',
    tipEn:
      'When traveling, always carry your hotel\'s address written in Chinese characters (not pinyin!). Taxi drivers rarely read pinyin.'
  }
];

// ═════════════════════════════════════════════════════════════════════════════
// Grammaire A2 (cecr-a2-grammar-*)
// ═════════════════════════════════════════════════════════════════════════════

// --- cecr-a2-grammar-m1 — 了 (1/3) : perfectif après le verbe --------------
export const a2GrammarLePerfLearnSections: LessonV2LearnSection[] = [
  {
    id: 'a2-le1-position',
    title: '了 juste après le verbe = complétion',
    titleEn: '了 right after verb = completion',
    body:
      '了 (le) a 3 usages distincts — on ne traite ici que le premier, le **了 perfectif**.\n' +
      '\n' +
      'Placé juste après le verbe, il marque une action terminée. Exemple : 我吃了饭 (j\'ai mangé).\n' +
      '\n' +
      'Attention : 了 ne veut **pas** dire « passé » ! Le chinois n\'a pas de temps grammatical. 我吃饭 peut être présent ou futur selon le contexte ; 我吃了饭 souligne la **complétion**.',
    bodyEn:
      '了 (le) has 3 distinct uses — here we cover only the first, the perfective 了. Placed right after the verb, it marks a completed action: 我吃了饭 (I ate). Careful: 了 does NOT mean "past"! Chinese has no grammatical tense. 我吃饭 can be present or future by context. 我吃了饭 stresses completion.',
    items: [
      { hanzi: '吃了', pinyin: 'chī le', meaning: 'avoir mangé', meaningEn: 'ate / have eaten', audio: 'audio/hsk1/hsk1_吃了.wav' },
      { hanzi: '去了', pinyin: 'qù le', meaning: 'y être allé', meaningEn: 'went', audio: 'audio/hsk1/hsk1_去了.wav' },
      { hanzi: '买了', pinyin: 'mǎi le', meaning: 'avoir acheté', meaningEn: 'bought', audio: 'audio/hsk1/hsk1_买了.wav' },
      { hanzi: '看了', pinyin: 'kàn le', meaning: 'avoir vu', meaningEn: 'watched', audio: 'audio/hsk1/hsk1_看了.wav' },
      { hanzi: '已经', pinyin: 'yǐ jīng', meaning: 'déjà', meaningEn: 'already', audio: 'audio/hsk2/hsk2_已经.wav' }
    ]
  },
  {
    id: 'a2-le1-complete',
    title: 'Compléter : verbe + 了 + objet/quantité',
    titleEn: 'Completing: verb + 了 + object/quantity',
    body:
      'À l\'oral, 我吃了 seul sonne inachevé — il faut un complément. Trois options :\n' +
      '\n' +
      '- un objet — 我吃了饭\n' +
      '- une quantité — 我吃了两碗\n' +
      '- un adverbe temporel — 已经吃了\n' +
      '\n' +
      'RÈGLE D\'OR : pour la négation, on utilise **没 + verbe, SANS 了**. 我没吃饭 (je n\'ai pas mangé). Jamais 我没吃了饭 ✗.',
    bodyEn:
      'Orally, 我吃了 alone sounds incomplete. A complement is needed: an object (我吃了饭), a quantity (我吃了两碗), or a time adverb (已经吃了). Negation: 没 + verb, NO 了. 我没吃饭 (I haven\'t eaten). Never 我没吃了饭 ✗.',
    items: [
      { hanzi: '没', pinyin: 'méi', meaning: 'ne... pas (passé)', meaningEn: 'not (past)', audio: 'audio/hsk1/hsk1_没.wav' },
      { hanzi: '没吃', pinyin: 'méi chī', meaning: 'ne pas avoir mangé', meaningEn: 'didn\'t eat', audio: 'audio/hsk1/hsk1_没吃.wav' },
      { hanzi: '没去', pinyin: 'méi qù', meaning: 'ne pas y être allé', meaningEn: 'didn\'t go', audio: 'audio/hsk1/hsk1_没去.wav' }
    ],
    tip:
      'Règle à mémoriser : 不 nie le présent/futur (不吃 = je ne mange pas / ne mangerai pas), 没 nie le passé (没吃 = n\'ai pas mangé). Jamais 不 + 了.',
    tipEn:
      'Rule to memorize: 不 negates present/future (不吃 = don\'t / won\'t eat), 没 negates past (没吃 = didn\'t eat). Never 不 + 了.'
  },
  {
    id: 'a2-le1-tokens',
    title: 'Structure visuelle : 了 colle au verbe',
    titleEn: 'Visual structure: 了 sticks to the verb',
    body:
      'Le 了 perfectif est une Particule qui colle au verbe (orange), et qui demande un complément ou un objet pour sonner naturel.',
    bodyEn:
      'The perfective 了 is a Particle stuck to the verb (orange), and it requires a complement or object to sound natural.',
    tokenizedSentences: [
      {
        zh: [
          { text: '我', pinyin: 'wǒ', role: 'sujet' },
          { text: '吃', pinyin: 'chī', role: 'verbe' },
          { text: '了', pinyin: 'le', role: 'particule' },
          { text: '饭', pinyin: 'fàn', role: 'objet' }
        ],
        fr: [
          { text: 'J\'ai', role: 'sujet' },
          { text: 'mangé', role: 'verbe' }
        ],
        note: '了 colle à 吃. Compléter avec un objet (饭) pour que la phrase sonne complète.'
      },
      {
        zh: [
          { text: '她', pinyin: 'tā', role: 'sujet' },
          { text: '买', pinyin: 'mǎi', role: 'verbe' },
          { text: '了', pinyin: 'le', role: 'particule' },
          { text: '两本书', pinyin: 'liǎng běn shū', role: 'objet' }
        ],
        fr: [
          { text: 'Elle a', role: 'sujet' },
          { text: 'acheté', role: 'verbe' },
          { text: 'deux livres', role: 'objet' }
        ],
        note: 'Quantité (两本) sert de complément suffisant — le 了 perfectif a besoin d\'un nombre ou objet pour respirer.'
      },
      {
        zh: [
          { text: '我', pinyin: 'wǒ', role: 'sujet' },
          { text: '没', pinyin: 'méi', role: 'modificateur' },
          { text: '吃', pinyin: 'chī', role: 'verbe' },
          { text: '饭', pinyin: 'fàn', role: 'objet' }
        ],
        fr: [
          { text: 'Je n\'ai', role: 'sujet' },
          { text: 'pas', role: 'modificateur' },
          { text: 'mangé', role: 'verbe' }
        ],
        note: 'NÉGATION : 没 (Modificateur) + V — JAMAIS de 了 dans la négation. ✗ 我没吃了 = faux.'
      }
    ],
    tip:
      'Repère visuel : si tu vois 没 dans une phrase, supprime tout 了. La paire 没…了 est interdite.',
    tipEn:
      'Visual cue: if 没 is in your sentence, remove any 了. The pair 没…了 is forbidden.'
  }
];

// --- cecr-a2-grammar-m2 — 过 : expérience vécue ----------------------------
export const a2GrammarGuoLearnSections: LessonV2LearnSection[] = [
  {
    id: 'a2-guo-experience',
    title: '过 = « avoir déjà... un jour »',
    titleEn: '过 = "have ever... in life"',
    body:
      '过 (guo, atone) après un verbe signale une **expérience déjà vécue** au moins une fois.\n' +
      '\n' +
      'Exemples : 我去过中国 (je suis allé en Chine — au moins une fois, dans ma vie). 你吃过饺子吗 ? (as-tu déjà mangé des raviolis ?).\n' +
      '\n' +
      'Contraste essentiel avec 了 :\n' +
      '- 我吃了饺子 — j\'ai mangé LES raviolis (action spécifique, récente)\n' +
      '- 我吃过饺子 — j\'ai déjà goûté aux raviolis (dans ma vie)',
    bodyEn:
      '过 (guo, toneless) after a verb signals an experience lived at least once. 我去过中国 (I\'ve been to China — at least once). 你吃过饺子吗? (have you ever tried dumplings?). Key contrast with 了: 我吃了饺子 = I ate THE dumplings (specific, recent); 我吃过饺子 = I\'ve ever tried dumplings (in my life).',
    items: [
      { hanzi: '过', pinyin: 'guo', meaning: '(expérience vécue)', meaningEn: '(lived experience)', audio: 'audio/hsk2/hsk2_过.wav' },
      { hanzi: '去过', pinyin: 'qù guo', meaning: 'être déjà allé', meaningEn: 'have been to', audio: 'audio/hsk2/hsk2_去过.wav' },
      { hanzi: '吃过', pinyin: 'chī guo', meaning: 'avoir déjà goûté', meaningEn: 'have tried', audio: 'audio/hsk2/hsk2_吃过.wav' },
      { hanzi: '看过', pinyin: 'kàn guo', meaning: 'avoir déjà vu', meaningEn: 'have seen', audio: 'audio/hsk2/hsk2_看过.wav' },
      { hanzi: '从来没', pinyin: 'cóng lái méi', meaning: 'ne jamais (encore)', meaningEn: 'never (yet)', audio: 'audio/hsk4/hsk4_从来没.wav' }
    ],
    tip:
      'Négation : 没 + verbe + 过. 我没去过中国 = je ne suis jamais allé en Chine. Renforcé : 我从来没去过中国.',
    tipEn:
      'Negation: 没 + verb + 过. 我没去过中国 = I\'ve never been to China. Emphatic: 我从来没去过中国.'
  },
  {
    id: 'a2-guo-tokens',
    title: 'Structure visuelle : 过 vs 了',
    titleEn: 'Visual structure: 过 vs 了',
    body:
      '过 et 了 collent tous les deux au verbe — mais leur sens diverge. 过 = expérience un jour vécue (« dans ma vie »). 了 = action terminée (« cette fois-ci »). Le tokenisation aide à voir qu\'ils occupent la MÊME position syntaxique.',
    bodyEn:
      '过 and 了 both stick to the verb — but their meanings diverge. 过 = experience ever lived («in my life»). 了 = completed action («this time»). Tokenizing helps see they occupy the SAME syntactic slot.',
    tokenizedSentences: [
      {
        zh: [
          { text: '我', pinyin: 'wǒ', role: 'sujet' },
          { text: '吃', pinyin: 'chī', role: 'verbe' },
          { text: '过', pinyin: 'guo', role: 'particule' },
          { text: '饺子', pinyin: 'jiǎo zi', role: 'objet' }
        ],
        fr: [
          { text: 'J\'ai', role: 'sujet' },
          { text: 'déjà goûté', role: 'verbe' },
          { text: 'aux raviolis', role: 'objet' }
        ],
        note: '过 = expérience dans la vie. Pas forcément récente, juste « ça m\'est arrivé un jour ».'
      },
      {
        zh: [
          { text: '我', pinyin: 'wǒ', role: 'sujet' },
          { text: '吃', pinyin: 'chī', role: 'verbe' },
          { text: '了', pinyin: 'le', role: 'particule' },
          { text: '饺子', pinyin: 'jiǎo zi', role: 'objet' }
        ],
        fr: [
          { text: 'J\'ai', role: 'sujet' },
          { text: 'mangé', role: 'verbe' },
          { text: 'les raviolis', role: 'objet' }
        ],
        note: '了 = action terminée spécifique (les raviolis dont on parle, là, viennent d\'être mangés).'
      },
      {
        zh: [
          { text: '我', pinyin: 'wǒ', role: 'sujet' },
          { text: '没', pinyin: 'méi', role: 'modificateur' },
          { text: '去', pinyin: 'qù', role: 'verbe' },
          { text: '过', pinyin: 'guo', role: 'particule' },
          { text: '中国', pinyin: 'zhōng guó', role: 'objet' }
        ],
        fr: [
          { text: 'Je ne suis', role: 'sujet' },
          { text: 'jamais', role: 'modificateur' },
          { text: 'allé', role: 'verbe' },
          { text: 'en Chine', role: 'objet' }
        ],
        note: 'Négation de 过 : 没 + V + 过 (le 过 RESTE, contrairement au 了 qui DISPARAÎT dans la négation).'
      }
    ],
    tip:
      'Test mental : si tu peux ajouter « au moins une fois dans ma vie » en français, utilise 过. Si tu parles d\'un événement spécifique terminé, utilise 了.',
    tipEn:
      'Mental test: if you can add «at least once in my life» in English, use 过. For a specific completed event, use 了.'
  }
];

// --- cecr-a2-grammar-m3 — 在 : action en cours -----------------------------
export const a2GrammarZaiProgLearnSections: LessonV2LearnSection[] = [
  {
    id: 'a2-zai-progressive',
    title: '在 + verbe = « être en train de »',
    titleEn: '在 + verb = "be doing"',
    body:
      'Le même 在 (zài) porte **deux rôles totalement différents** :\n' +
      '\n' +
      '- verbe de localisation — 我在家 (je suis à la maison)\n' +
      '- marqueur progressif — 在 + verbe = action en cours, 我在吃饭 (je suis en train de manger)\n' +
      '\n' +
      'Astuce : pour insister, 正在 (juste en train de) — 他正在睡觉 (il est justement en train de dormir). À la fin, on peut ajouter la particule **呢** pour adoucir : 我在看书呢.',
    bodyEn:
      'The same 在 (zài) plays two totally different roles. (1) Location verb: 我在家 (I\'m home). (2) Progressive marker: 在 + verb = action in progress. 我在吃饭 (I\'m eating). To emphasize: 正在 (right now): 他正在睡觉 (he\'s just sleeping). Final particle 呢 softens: 我在看书呢.',
    items: [
      { hanzi: '在', pinyin: 'zài', meaning: 'être à / en train de', meaningEn: 'at / in the middle of', audio: 'audio/hsk1/hsk1_在.wav' },
      { hanzi: '正在', pinyin: 'zhèng zài', meaning: 'juste en train de', meaningEn: 'right in the middle of', audio: 'audio/hsk3/hsk3_正在.wav' },
      { hanzi: '呢', pinyin: 'ne', meaning: '(particule)', meaningEn: '(particle)', audio: 'audio/hsk1/hsk1_呢.wav' }
    ],
    tip:
      'Différence avec le -ing anglais : 在 met l\'accent sur l\'instantanéité (maintenant précisément), pas sur la durée abstraite. Pour une habitude en cours, on utilise plutôt 常常.',
    tipEn:
      'Vs English -ing: 在 stresses immediacy (right now), not abstract duration. For a running habit, use 常常 instead.'
  }
];

// --- cecr-a2-grammar-m4 — 也 vs 都 ------------------------------------------
export const a2GrammarYeDouLearnSections: LessonV2LearnSection[] = [
  {
    id: 'a2-ye-vs-dou',
    title: '也 = « aussi », 都 = « tous sans exception »',
    titleEn: '也 = "also", 都 = "all without exception"',
    body:
      'Deux adverbes souvent confondus :\n' +
      '\n' +
      '- 也 (yě) — « aussi » au sens d\'un écho : 他喜欢咖啡，我也喜欢 (il aime le café, moi aussi)\n' +
      '- 都 (dōu) — « tous sans exception » : 我们都是学生 (nous sommes tous étudiants)\n' +
      '\n' +
      'RÈGLE D\'OR : les deux se placent **toujours avant le verbe**, jamais avant le sujet. Erreur typique 也我喜欢 ✗ — il faut 我也喜欢.',
    bodyEn:
      'Two adverbs often confused. 也 (yě) = "also" as an echo: 他喜欢咖啡，我也喜欢 (he likes coffee, me too). 都 (dōu) = "all without exception": 我们都是学生 (we\'re all students). Absolute rule: both ALWAYS before the verb, never before subject. Typical error: 也我喜欢 ✗ — should be 我也喜欢.',
    items: [
      { hanzi: '也', pinyin: 'yě', meaning: 'aussi', meaningEn: 'also', audio: 'audio/hsk1/hsk1_也.wav' },
      { hanzi: '都', pinyin: 'dōu', meaning: 'tous, toutes', meaningEn: 'all', audio: 'audio/hsk1/hsk1_都.wav' },
      { hanzi: '我也', pinyin: 'wǒ yě', meaning: 'moi aussi', meaningEn: 'me too', audio: 'audio/hsk1/hsk1_我也.wav' },
      { hanzi: '都是', pinyin: 'dōu shì', meaning: 'tous sont', meaningEn: 'all are', audio: 'audio/hsk1/hsk1_都是.wav' }
    ],
    tip:
      'Les deux peuvent coexister : 我们也都是学生 (nous aussi nous sommes tous étudiants). L\'ordre est fixe : 也 AVANT 都.',
    tipEn:
      'Both can coexist: 我们也都是学生 (we too are all students). Order is fixed: 也 BEFORE 都.'
  },
  {
    id: 'a2-dou-word-order',
    title: '都 : l\'ensemble couvert vient AVANT',
    titleEn: '都: what 都 covers must come BEFORE it',
    body:
      'Règle d\'or : ce que 都 couvre doit se trouver **AVANT** 都, jamais après.\n' +
      '\n' +
      '- Structure sujet : sujet + 都 + verbe → 他们都喜欢喝茶 (tāmen dōu xǐhuān hē chá) « ils aiment tous boire du thé »\n' +
      '- Structure objet : [objet-ensemble] + sujet + 都 + verbe → 这两本书我都看过 (zhè liǎng běn shū wǒ dōu kàn guò) « j\'ai lu ces deux livres » — on remonte l\'objet en tête (structure topique)\n' +
      '\n' +
      'Erreur classique : 我都看过这两本书 sonne mal, car l\'ensemble (les deux livres) est APRÈS 都.\n' +
      '\n' +
      'Astuce : à chaque phrase avec 都, se demander « qu\'est-ce que 都 est en train de couvrir ? » — la réponse doit toujours être AVANT 都.',
    bodyEn:
      'Golden rule: whatever 都 covers must come BEFORE 都, never after. Subject structure: subject + 都 + verb → 他们都喜欢喝茶 (they all like tea). Object structure: [object-group] + subject + 都 + verb → 这两本书我都看过 (I\'ve read both books) — the object is topicalized to the front. Classic mistake: 我都看过这两本书 sounds off because the group is placed AFTER 都. Tip: with each 都 sentence, ask «what is 都 covering?» — the answer must always sit BEFORE 都.',
    items: [
      { hanzi: '都', pinyin: 'dōu', meaning: 'tous, toutes', meaningEn: 'all', audio: 'audio/hsk1/hsk1_都.wav' },
      { hanzi: '他们', pinyin: 'tā men', meaning: 'ils, elles', meaningEn: 'they', audio: 'audio/hsk1/hsk1_他们.wav' },
      { hanzi: '喜欢', pinyin: 'xǐ huān', meaning: 'aimer', meaningEn: 'like', audio: 'audio/hsk1/hsk1_喜欢.wav' },
      { hanzi: '这两本书', pinyin: 'zhè liǎng běn shū', meaning: 'ces deux livres', meaningEn: 'these two books', audio: 'audio/hsk1/hsk1_书.wav' },
      { hanzi: '看过', pinyin: 'kàn guò', meaning: 'avoir lu / vu', meaningEn: 'have read / seen', audio: 'audio/hsk1/hsk1_看.wav' }
    ],
    tip:
      'Comme test rapide : pointe du doigt ce que « tous » couvre dans la phrase française — en chinois, ce mot doit être posé AVANT 都.',
    tipEn:
      'Quick test: point at what «all» refers to in the English sentence — in Chinese, that phrase must sit BEFORE 都.'
  },
  {
    id: 'a2-mei-dou',
    title: '每...都... : « chaque X sans exception »',
    titleEn: '每...都...: "each X, no exception"',
    body:
      'Structure : **每 + [temps / personne / objet] + 都 + verbe**.\n' +
      '\n' +
      '每 (měi) introduit l\'ensemble, 都 confirme que rien n\'est laissé de côté.\n' +
      '\n' +
      '- 每天我都给妈妈打电话 (měi tiān wǒ dōu gěi māma dǎ diànhuà) « j\'appelle maman chaque jour »\n' +
      '- 每个人都要来 (měi ge rén dōu yào lái) « tout le monde doit venir »\n' +
      '- 每次他都迟到 (měi cì tā dōu chídào) « à chaque fois, il est en retard »\n' +
      '\n' +
      'Règle : 都 est presque toujours obligatoire dans ce pattern ; l\'omettre sonne incomplet.',
    bodyEn:
      'Structure: 每 + [time / person / object] + 都 + verb. 每 (měi) sets up the group, 都 confirms nothing is left out. Examples: 每天我都给妈妈打电话 (I call mum every day); 每个人都要来 (everybody has to come); 每次他都迟到 (he is late every single time). Rule: 都 is almost always mandatory in this pattern — dropping it sounds incomplete.',
    items: [
      { hanzi: '每', pinyin: 'měi', meaning: 'chaque', meaningEn: 'each, every', audio: 'audio/hsk2/hsk2_每.wav' },
      { hanzi: '每天', pinyin: 'měi tiān', meaning: 'chaque jour', meaningEn: 'every day', audio: 'audio/hsk2/hsk2_每天.wav' },
      { hanzi: '每个人', pinyin: 'měi ge rén', meaning: 'chaque personne', meaningEn: 'everyone', audio: 'audio/hsk2/hsk2_每个人.wav' },
      { hanzi: '每次', pinyin: 'měi cì', meaning: 'chaque fois', meaningEn: 'every time', audio: 'audio/hsk2/hsk2_每次.wav' },
      { hanzi: '都', pinyin: 'dōu', meaning: 'tous, sans exception', meaningEn: 'all, without exception', audio: 'audio/hsk1/hsk1_都.wav' }
    ],
    tip:
      'Penser 每 = « pour chaque » et 都 = « et sans exception ». Les deux forment un duo quasi indissociable.',
    tipEn:
      'Think of 每 as «for each» and 都 as «and without exception». They act as an almost inseparable duo.'
  },
  {
    id: 'a2-question-dou',
    title: 'Mot interrogatif + 都 = universalité',
    titleEn: 'Question word + 都 = universal reference',
    body:
      'Un mot interrogatif placé devant 都 arrête de poser une question et couvre **TOUT** :\n' +
      '\n' +
      '- 什么 (shénme, quoi) → 什么都 = « tout »\n' +
      '- 谁 (shéi, qui) → 谁都 = « tout le monde »\n' +
      '- 哪儿 (nǎr, où) → 哪儿都 = « partout »\n' +
      '\n' +
      'Exemple positif : 她什么都想学 (tā shénme dōu xiǎng xué) « elle veut tout apprendre ».\n' +
      '\n' +
      'En phrase négative avec 不/没, ça bascule vers « rien, personne, nulle part » :\n' +
      '- 他谁都不认识 (tā shéi dōu bú rènshi) « il ne connaît personne »\n' +
      '- 我什么都没吃 (wǒ shénme dōu méi chī) « je n\'ai rien mangé »\n' +
      '\n' +
      'Astuce : pour rendre explicite le « peu importe / no matter », on peut ajouter 无论 (wúlùn) ou 不管 (bùguǎn) au début → 不管你什么时候来，我都欢迎 (bùguǎn nǐ shénme shíhou lái, wǒ dōu huānyíng) « quand que tu viennes, tu es le bienvenu ».',
    bodyEn:
      'A question word placed before 都 stops asking a question and instead covers EVERYTHING. 什么 (what) → 什么都 = «everything». 谁 (who) → 谁都 = «everyone». 哪儿 (where) → 哪儿都 = «everywhere». Positive: 她什么都想学 (she wants to learn everything). In a negative sentence with 不/没, it flips to «nothing, no one, nowhere»: 他谁都不认识 (he doesn\'t know anyone); 我什么都没吃 (I ate nothing). Tip: to make «no matter» explicit, add 无论 (wúlùn) or 不管 (bùguǎn) at the start: 不管你什么时候来，我都欢迎 (no matter when you come, you\'re welcome).',
    items: [
      { hanzi: '什么都', pinyin: 'shén me dōu', meaning: 'tout / n\'importe quoi', meaningEn: 'anything / everything', audio: 'audio/hsk1/hsk1_什么.wav' },
      { hanzi: '谁都', pinyin: 'shéi dōu', meaning: 'tout le monde / personne', meaningEn: 'anyone / no one', audio: 'audio/hsk1/hsk1_谁.wav' },
      { hanzi: '哪儿都', pinyin: 'nǎr dōu', meaning: 'partout / nulle part', meaningEn: 'anywhere / nowhere', audio: 'audio/hsk1/hsk1_哪儿.wav' },
      { hanzi: '不管', pinyin: 'bù guǎn', meaning: 'peu importe', meaningEn: 'no matter', audio: 'audio/hsk4/hsk4_不管.wav' },
      { hanzi: '无论', pinyin: 'wú lùn', meaning: 'quel que soit', meaningEn: 'no matter (formal)', audio: 'audio/hsk4/hsk4_无论.wav' }
    ],
    tip:
      'Repère mental : mot-question + 都 en phrase affirmative = « tout / partout / tout le monde » ; en phrase négative = « rien / nulle part / personne ».',
    tipEn:
      'Memory anchor: question word + 都 in a positive sentence = «all/everywhere/everyone»; in a negative sentence = «nothing/nowhere/no one».'
  }
];

// --- cecr-a2-grammar-m5 — 要 vs 想 -----------------------------------------
export const a2GrammarYaoXiangLearnSections: LessonV2LearnSection[] = [
  {
    id: 'a2-yao-vs-xiang',
    title: '要 = volonté ferme, 想 = désir / projet',
    titleEn: '要 = firm will, 想 = desire / plan',
    body:
      'Les deux traduisent « vouloir », mais à des forces différentes :\n' +
      '\n' +
      '- 要 (yào) — volonté **décidée**, proche de « I want / I will ». Au restaurant : 我要一杯咖啡.\n' +
      '- 想 (xiǎng) — désir plus **léger**, proche de « I\'d like / I\'m thinking of ». 我想喝咖啡 (j\'ai envie d\'un café).\n' +
      '\n' +
      'Astuce : pour commander, **toujours 要** ; pour un projet hypothétique, plutôt 想.',
    bodyEn:
      'Both translate "want", with different strengths. 要 (yào): firm will, close to "I want / I will". At the restaurant: 我要一杯咖啡. 想 (xiǎng): softer desire, close to "I\'d like / I\'m thinking of". 我想喝咖啡 (I feel like a coffee). To order: ALWAYS 要. For a hypothetical plan: rather 想.',
    items: [
      { hanzi: '要', pinyin: 'yào', meaning: 'vouloir (ferme)', meaningEn: 'want (firm)', audio: 'audio/hsk2/hsk2_要.wav' },
      { hanzi: '想', pinyin: 'xiǎng', meaning: 'avoir envie de', meaningEn: 'feel like', audio: 'audio/hsk1/hsk1_想.wav' },
      { hanzi: '不要', pinyin: 'bú yào', meaning: 'ne pas vouloir', meaningEn: 'don\'t want', audio: 'audio/hsk2/hsk2_不要.wav' },
      { hanzi: '不想', pinyin: 'bù xiǎng', meaning: 'ne pas avoir envie', meaningEn: 'don\'t feel like', audio: 'audio/hsk1/hsk1_不想.wav' }
    ],
    tip:
      '想 a aussi le sens de « penser à, manquer à » : 我想你 = tu me manques (je pense à toi). 要 peut aussi signifier « devoir » : 我要工作 = je dois travailler.',
    tipEn:
      '想 also means "miss, think of": 我想你 = I miss you. 要 can mean "must": 我要工作 = I must work.'
  }
];

// ═════════════════════════════════════════════════════════════════════════════
// Fêtes & traditions (cecr-a2-culture-*)
// ═════════════════════════════════════════════════════════════════════════════

// --- cecr-a2-culture-m1 — 春节 ---------------------------------------------
export const a2CultureChunjieLearnSections: LessonV2LearnSection[] = [
  {
    id: 'a2-chunjie-rituals',
    title: '春节 : 5 rituels clés',
    titleEn: '春节: 5 key rituals',
    body:
      'Le 春节 (Chūnjié, Fête du Printemps) est la **plus grande fête chinoise**, célébrée sur 15 jours autour du 1er jour lunaire (fin janvier-mi-février).\n' +
      '\n' +
      'Cinq rituels incontournables :\n' +
      '- 团圆饭 — repas de retrouvailles la veille\n' +
      '- 红包 — enveloppes rouges avec de l\'argent\n' +
      '- 春联 — distiques rouges collés sur les portes\n' +
      '- 鞭炮 — pétards pour chasser les démons\n' +
      '- 饺子 — raviolis au Nord le soir du réveillon',
    bodyEn:
      '春节 (Chūnjié, Spring Festival) is the biggest Chinese holiday, celebrated 15 days around day 1 of the lunar calendar (late Jan-mid Feb). Five essential rituals: 团圆饭 (reunion dinner on the eve), 红包 (red envelopes with money), 春联 (red couplets pasted on doors), 鞭炮 (firecrackers to scare demons), 饺子 (dumplings in the North on NY Eve).',
    items: [
      { hanzi: '春节', pinyin: 'chūn jié', meaning: 'Nouvel An chinois', meaningEn: 'Chinese New Year', audio: 'audio/hsk3/hsk3_春节.wav' },
      { hanzi: '团圆饭', pinyin: 'tuán yuán fàn', meaning: 'repas de retrouvailles', meaningEn: 'reunion dinner', audio: 'audio/hsk4/hsk4_团圆饭.wav' },
      { hanzi: '红包', pinyin: 'hóng bāo', meaning: 'enveloppe rouge', meaningEn: 'red envelope', audio: 'audio/hsk4/hsk4_红包.wav' },
      { hanzi: '鞭炮', pinyin: 'biān pào', meaning: 'pétards', meaningEn: 'firecrackers', audio: 'audio/hsk4/hsk4_鞭炮.wav' },
      { hanzi: '新年快乐', pinyin: 'xīn nián kuài lè', meaning: 'bonne année !', meaningEn: 'happy new year!', audio: 'audio/hsk3/hsk3_新年快乐.wav' },
      { hanzi: '恭喜发财', pinyin: 'gōng xǐ fā cái', meaning: 'prospérité !', meaningEn: 'prosperity!', audio: 'audio/hsk4/hsk4_恭喜发财.wav' }
    ],
    tip:
      'Tabous du jour 1 : ne pas balayer (on balaye la chance), ne pas casser de vaisselle, ne pas se laver les cheveux (on rince la prospérité). Respecter ces règles compte plus que la croyance.',
    tipEn:
      'Day-1 taboos: no sweeping (sweeps luck away), no breaking dishes, no washing hair (rinses prosperity). Respecting the rules matters more than belief.'
  }
];

// --- cecr-a2-culture-m2 — 中秋节 -------------------------------------------
export const a2CultureZhongqiuLearnSections: LessonV2LearnSection[] = [
  {
    id: 'a2-zhongqiu-moon',
    title: '团圆 : la pleine lune = la famille réunie',
    titleEn: '团圆: full moon = family reunion',
    body:
      '中秋节 (Zhōngqiū jié, Fête de la mi-automne, 15e jour du 8e mois lunaire, généralement septembre) est la **2e fête la plus importante**.\n' +
      '\n' +
      'Symbole central : la pleine lune (满月) incarne le concept de 团圆 (tuányuán, **réunion familiale**).\n' +
      '\n' +
      'On mange des 月饼 (yuèbǐng, gâteaux de lune) — petits gâteaux ronds, gras, fourrés de pâte de haricot rouge, de graines de lotus, parfois d\'un jaune d\'œuf salé central représentant la lune.',
    bodyEn:
      '中秋节 (Zhōngqiū jié, Mid-Autumn Festival, 15th day of the 8th lunar month, usually September) is the 2nd most important holiday. Central symbol: the full moon (满月) embodies the idea of 团圆 (tuányuán, family reunion). Eat 月饼 (yuèbǐng, mooncakes) — round, rich cakes filled with red bean paste, lotus seeds, sometimes a central salted egg yolk representing the moon.',
    items: [
      { hanzi: '中秋节', pinyin: 'zhōng qiū jié', meaning: 'Fête de la Lune', meaningEn: 'Mid-Autumn Festival', audio: 'audio/hsk4/hsk4_中秋节.wav' },
      { hanzi: '月饼', pinyin: 'yuè bǐng', meaning: 'gâteau de lune', meaningEn: 'mooncake', audio: 'audio/hsk4/hsk4_月饼.wav' },
      { hanzi: '团圆', pinyin: 'tuán yuán', meaning: 'réunion familiale', meaningEn: 'family reunion', audio: 'audio/hsk5/hsk5_团圆.wav' },
      { hanzi: '嫦娥', pinyin: 'cháng é', meaning: 'Chang\'e (déesse lune)', meaningEn: 'Chang\'e (moon goddess)', audio: 'audio/hsk5/hsk5_嫦娥.wav' },
      { hanzi: '赏月', pinyin: 'shǎng yuè', meaning: 'admirer la lune', meaningEn: 'admire the moon', audio: 'audio/hsk5/hsk5_赏月.wav' }
    ],
    tip:
      'Les 月饼 circulent massivement entre collègues et partenaires pro — c\'est un moment clé du business chinois. Offrir une boîte de 月饼 haut de gamme à un client est un geste classique.',
    tipEn:
      '月饼 circulate heavily between colleagues and business partners — a key moment of Chinese business. Gifting a fancy 月饼 box to a client is a classic gesture.'
  }
];

// --- cecr-a2-culture-m3 — Étiquette à table --------------------------------
export const a2CultureTableLearnSections: LessonV2LearnSection[] = [
  {
    id: 'a2-table-chopsticks',
    title: 'Les 5 règles sacrées des baguettes',
    titleEn: 'The 5 sacred chopstick rules',
    body:
      'Les 5 règles à respecter avec les **筷子** :\n' +
      '\n' +
      '- Ne **jamais** planter ses baguettes verticalement dans le riz — ça évoque l\'encens funéraire, très tabou\n' +
      '- Ne pas tapoter son bol avec les baguettes — geste de mendiant\n' +
      '- Ne pas passer de nourriture baguette à baguette — rappelle le rite funéraire des os crémés\n' +
      '- Au début du repas, l\'aîné/l\'hôte mange en premier, on attend\n' +
      '- Servir les autres avant soi, surtout pour 茶 ou 酒',
    bodyEn:
      '(1) NEVER stick 筷子 vertically in rice: evokes funeral incense, huge taboo. (2) Don\'t tap bowl with chopsticks: beggar gesture. (3) Don\'t pass food chopstick-to-chopstick: mirrors the cremated-bones funeral rite. (4) At meal start, elder/host eats first; you wait. (5) Serve others before yourself, especially for 茶 or 酒.',
    items: [
      { hanzi: '筷子', pinyin: 'kuài zi', meaning: 'baguettes', meaningEn: 'chopsticks', audio: 'audio/hsk3/hsk3_筷子.wav' },
      { hanzi: '敬酒', pinyin: 'jìng jiǔ', meaning: 'porter un toast', meaningEn: 'toast', audio: 'audio/hsk5/hsk5_敬酒.wav' },
      { hanzi: '干杯', pinyin: 'gān bēi', meaning: 'cul sec !', meaningEn: 'cheers / bottoms up!', audio: 'audio/hsk4/hsk4_干杯.wav' },
      { hanzi: '很好吃', pinyin: 'hěn hǎo chī', meaning: 'très bon', meaningEn: 'very tasty', audio: 'audio/hsk1/hsk1_很好吃.wav' }
    ],
    tip:
      'Compliment post-repas : 很好吃，谢谢. L\'hôte répondra presque toujours par auto-dévalorisation polie : 哪里，很一般 (pas du tout, c\'est ordinaire). Ne prends pas au sérieux.',
    tipEn:
      'Post-meal compliment: 很好吃，谢谢. The host will almost always politely self-deprecate: 哪里，很一般 (not at all, it\'s ordinary). Don\'t take it at face value.'
  }
];

// --- cecr-a2-culture-m4 — Zodiaque chinois ---------------------------------
export const a2CultureZodiacLearnSections: LessonV2LearnSection[] = [
  {
    id: 'a2-zodiac-twelve',
    title: '十二生肖 : 12 animaux, cycle de 12 ans',
    titleEn: '十二生肖: 12 animals, 12-year cycle',
    body:
      'Le zodiaque chinois (生肖, shēngxiào) compte **12 animaux** dans un ordre fixe.\n' +
      '\n' +
      'L\'ordre canonique :\n' +
      '- 鼠 (shǔ) — rat\n' +
      '- 牛 (niú) — bœuf\n' +
      '- 虎 (hǔ) — tigre\n' +
      '- 兔 (tù) — lapin\n' +
      '- 龙 (lóng) — dragon\n' +
      '- 蛇 (shé) — serpent\n' +
      '- 马 (mǎ) — cheval\n' +
      '- 羊 (yáng) — chèvre\n' +
      '- 猴 (hóu) — singe\n' +
      '- 鸡 (jī) — coq\n' +
      '- 狗 (gǒu) — chien\n' +
      '- 猪 (zhū) — cochon\n' +
      '\n' +
      'Chaque année lunaire porte un animal. **2026 est l\'année du 马** (cheval).\n' +
      '\n' +
      'ASTUCE : question typique 你属什么 ? (quel est ton signe ?) → réponse 我属龙.',
    bodyEn:
      'Chinese zodiac (生肖, shēngxiào) has 12 animals in fixed order: 鼠 (rat), 牛 (ox), 虎 (tiger), 兔 (rabbit), 龙 (dragon), 蛇 (snake), 马 (horse), 羊 (goat), 猴 (monkey), 鸡 (rooster), 狗 (dog), 猪 (pig). Each lunar year carries one animal. 2026 is year of the 马 (horse). Typical question: 你属什么? (what\'s your sign?) → reply 我属龙.',
    items: [
      { hanzi: '生肖', pinyin: 'shēng xiào', meaning: 'signe du zodiaque', meaningEn: 'zodiac sign', audio: 'audio/hsk5/hsk5_生肖.wav' },
      { hanzi: '属', pinyin: 'shǔ', meaning: 'appartenir à (signe)', meaningEn: 'belong to (sign)', audio: 'audio/hsk4/hsk4_属.wav' },
      { hanzi: '龙', pinyin: 'lóng', meaning: 'dragon', meaningEn: 'dragon', audio: 'audio/hsk4/hsk4_龙.wav' },
      { hanzi: '虎', pinyin: 'hǔ', meaning: 'tigre', meaningEn: 'tiger', audio: 'audio/hsk4/hsk4_虎.wav' },
      { hanzi: '马', pinyin: 'mǎ', meaning: 'cheval', meaningEn: 'horse', audio: 'audio/hsk3/hsk3_马.wav' },
      { hanzi: '本命年', pinyin: 'běn mìng nián', meaning: 'année de son signe', meaningEn: 'year of one\'s sign', audio: 'audio/hsk5/hsk5_本命年.wav' }
    ],
    tip:
      'Pendant son 本命年 (tous les 12 ans), on porte du rouge (sous-vêtements, ceinture) pour conjurer la malchance. Ce n\'est pas du folklore : même les jeunes urbains le pratiquent encore.',
    tipEn:
      'During your 本命年 (every 12 years), you wear red (underwear, belt) to ward off bad luck. Not just folklore: urban youths still practice it.'
  }
];

// ═════════════════════════════════════════════════════════════════════════════
// VAGUE A2 — Conversation + Nuances (pivot stratégique)
// 14 nouvelles leçons : 7 Conversation (négocier, météo, RDV…) et 7 Nuances
// (才/就, 还/再, 跟/和, 给/对, 在/正在, 一点/有点, 从/离).
// ═════════════════════════════════════════════════════════════════════════════

// === CONVERSATION A2 =========================================================

export const a2ConvM1LearnSections: LessonV2LearnSection[] = [
  {
    id: 'a2-marche',
    title: 'Au marché : négocier un prix',
    titleEn: 'At the market: bargain a price',
    body:
      'Au marché, marchander est la **norme** ; en supermarché ou centre commercial, **non**. Le prix de départ vaut typiquement 2-3× le prix réel.\n' +
      '\n' +
      'Le déroulé de la négociation :\n' +
      '- Demander le prix — 这个多少钱？/ 怎么卖？\n' +
      '- Trouver cher — 太贵了, 便宜一点吧\n' +
      '- Contre-offrir — 50 块怎么样？\n' +
      '- Renoncer (souvent le commerçant cède) — 算了\n' +
      '- Insister — 别的地方更便宜 (ailleurs c\'est moins cher)',
    bodyEn:
      'Ask the price: 这个多少钱？/ 怎么卖？(how much? / how do you sell it?). Find it pricey: 太贵了 (way too expensive!), 便宜一点吧 (a bit cheaper please). Counter-offer: 50 块怎么样？(50 yuan OK?). If refused: 算了 (forget it) — often the seller yields. Key phrase: 别的地方更便宜 (cheaper elsewhere). At the market, bargaining is the NORM; in supermarkets or malls, NO. Rule: opening price = 2-3× real price.',
    items: [
      { hanzi: '贵', pinyin: 'guì', meaning: 'cher', meaningEn: 'expensive', audio: 'audio/hsk2/hsk2_贵.wav' },
      { hanzi: '便宜', pinyin: 'pián yi', meaning: 'pas cher', meaningEn: 'cheap', audio: 'audio/hsk2/hsk2_便宜.wav' },
      { hanzi: '块', pinyin: 'kuài', meaning: 'yuan (oral)', meaningEn: 'yuan (spoken)', audio: 'audio/hsk1/hsk1_块.wav' },
      { hanzi: '算了', pinyin: 'suàn le', meaning: 'laisse tomber', meaningEn: 'forget it', audio: 'audio/hsk4/hsk4_算了.wav' },
      { hanzi: '怎么卖', pinyin: 'zěn me mài', meaning: 'comment vendez-vous', meaningEn: 'how do you sell', audio: 'audio/hsk2/hsk2_卖.wav' }
    ],
    tip:
      'Astuce d\'or : si tu commences à partir, le commerçant te rappelle souvent (« 等等！»). Le « walk-away » est l\'outil de marchandage n°1 en Chine.',
    tipEn:
      'Golden tip: if you start to walk away, the seller often calls back («等等！»). Walk-away is the n°1 bargaining tool in China.'
  },
  {
    id: 'a2-paiement',
    title: 'Modes de paiement : QR code, carte, liquide',
    titleEn: 'Payment methods: QR, card, cash',
    body:
      '微信支付 (WeChat Pay) et 支付宝 (Alipay) dominent : **90 %** des transactions. On dit 扫一下 (scanne) pour montrer le QR code.\n' +
      '\n' +
      'Les autres modes de paiement :\n' +
      '- 现金 (xiànjīn) — liquide, de moins en moins accepté\n' +
      '- 刷卡 — carte bancaire, accepté surtout dans grandes villes/hôtels\n' +
      '- 找零 — rendre la monnaie\n' +
      '- 收据 — reçu (utile pour notes de frais)\n' +
      '\n' +
      'Attention : comme touriste, prévois du liquide pour petits commerces traditionnels qui ne reconnaissent pas tes cartes étrangères.',
    bodyEn:
      '微信支付 (WeChat Pay) and 支付宝 (Alipay) dominate — 90% of transactions. 扫一下 (scan): show the QR code. 现金 (xiànjīn, cash) — less and less accepted. 刷卡 (bank card) — mostly accepted in big cities/hotels. 找零 (give change). 收据 (receipt — useful for expense reports). As a tourist, bring cash for small traditional shops that won\'t recognize foreign cards.',
    items: [
      { hanzi: '扫', pinyin: 'sǎo', meaning: 'scanner', meaningEn: 'scan', audio: 'audio/hsk5/hsk5_扫.wav' },
      { hanzi: '现金', pinyin: 'xiàn jīn', meaning: 'liquide', meaningEn: 'cash', audio: 'audio/hsk5/hsk5_现金.wav' },
      { hanzi: '刷卡', pinyin: 'shuā kǎ', meaning: 'payer par carte', meaningEn: 'pay by card', audio: 'audio/hsk5/hsk5_刷卡.wav' },
      { hanzi: '找零', pinyin: 'zhǎo líng', meaning: 'rendre la monnaie', meaningEn: 'give change', audio: 'audio/hsk5/hsk5_零.wav' },
      { hanzi: '收据', pinyin: 'shōu jù', meaning: 'reçu', meaningEn: 'receipt', audio: 'audio/hsk5/hsk5_收据.wav' }
    ],
    tip:
      'Demande systématiquement « 可以扫吗？» (puis-je scanner ?) — c\'est plus rapide que de fouiller son portefeuille. Le commerçant montrera son QR à scanner.',
    tipEn:
      'Always ask «可以扫吗？» (can I scan?) — faster than fishing in your wallet. The seller will show their QR to scan.'
  }
];

export const a2ConvM2LearnSections: LessonV2LearnSection[] = [
  {
    id: 'a2-meteo',
    title: 'Parler de la météo',
    titleEn: 'Talk about the weather',
    body:
      'Démarrer une conversation : 今天天气怎么样？(comment est le temps aujourd\'hui ?).\n' +
      '\n' +
      'Réponses possibles :\n' +
      '- 今天很热 — il fait chaud\n' +
      '- 今天很冷 — froid\n' +
      '- 下雨 — il pleut\n' +
      '- 下雪 — il neige\n' +
      '- 刮风 — il y a du vent\n' +
      '- 多云 — nuageux\n' +
      '- 晴天 — soleil\n' +
      '\n' +
      'Remarque : en Chine, parler de la météo n\'est **pas** le brise-glace que c\'est en France/UK — on préfère « 你吃了吗？» (t\'as mangé ?). Mais en cas de tempête/canicule, ça reste pertinent — 太热了，受不了 (insupportable).',
    bodyEn:
      'Start a chat: 今天天气怎么样？(how\'s the weather today?). Replies: 今天很热 (it\'s hot), 今天很冷 (cold), 下雨 (raining), 下雪 (snowing), 刮风 (windy), 多云 (cloudy), 晴天 (sunny). In China, weather is NOT the icebreaker it is in French/UK: «你吃了吗？» (have you eaten?) is preferred. But during storms/heatwaves, it\'s relevant: 太热了，受不了 (unbearable).',
    items: [
      { hanzi: '天气', pinyin: 'tiān qì', meaning: 'météo', meaningEn: 'weather', audio: 'audio/hsk1/hsk1_天气.wav' },
      { hanzi: '热', pinyin: 'rè', meaning: 'chaud', meaningEn: 'hot', audio: 'audio/hsk1/hsk1_热.wav' },
      { hanzi: '冷', pinyin: 'lěng', meaning: 'froid', meaningEn: 'cold', audio: 'audio/hsk1/hsk1_冷.wav' },
      { hanzi: '下雨', pinyin: 'xià yǔ', meaning: 'pleuvoir', meaningEn: 'rain', audio: 'audio/hsk1/hsk1_下雨.wav' },
      { hanzi: '刮风', pinyin: 'guā fēng', meaning: 'venter', meaningEn: 'windy', audio: 'audio/hsk3/hsk3_刮风.wav' }
    ],
    tip:
      'Brise-glace chinois préféré : « 你吃了吗？» (« t\'as mangé ? »). Pas une vraie question, juste un « bonjour, ça va » culturel. Réponds 吃了，谢谢 même si tu n\'as pas mangé.',
    tipEn:
      'Preferred Chinese icebreaker: «你吃了吗？» («have you eaten?»). Not a real question, just a cultural «hi, how are you». Reply 吃了，谢谢 even if you haven\'t eaten.'
  },
  {
    id: 'a2-saisons',
    title: 'Les saisons et les vêtements',
    titleEn: 'Seasons and clothing',
    body:
      'Les 4 saisons : 春天 (printemps), 夏天 (été), 秋天 (automne), 冬天 (hiver).\n' +
      '\n' +
      'Vêtements clés :\n' +
      '- 衣服 — vêtements\n' +
      '- 外套 — manteau\n' +
      '- 毛衣 — pull\n' +
      '- T恤 — T-shirt\n' +
      '- 裤子 — pantalon\n' +
      '- 鞋 — chaussures\n' +
      '\n' +
      'Pour conseiller : 多穿一点 (mets plus de couches), 注意保暖 (attention à bien te couvrir), 别感冒 (n\'attrape pas froid).\n' +
      '\n' +
      'Astuce culturelle : **春捂秋冻** (au printemps couvre-toi, en automne accepte le frisquet) — sagesse chinoise sur l\'adaptation au climat.',
    bodyEn:
      '4 seasons: 春天 (spring), 夏天 (summer), 秋天 (autumn), 冬天 (winter). Clothing: 衣服 (clothes), 外套 (coat), 毛衣 (sweater), T恤 (T-shirt), 裤子 (pants), 鞋 (shoes). To advise: 多穿一点 (put on more layers), 注意保暖 (mind keeping warm), 别感冒 (don\'t catch a cold). Cultural phrase: 春捂秋冻 (cover up in spring, accept the chill in fall) — Chinese wisdom on climate adaptation.',
    items: [
      { hanzi: '春天', pinyin: 'chūn tiān', meaning: 'printemps', meaningEn: 'spring', audio: 'audio/hsk3/hsk3_春天.wav' },
      { hanzi: '夏天', pinyin: 'xià tiān', meaning: 'été', meaningEn: 'summer', audio: 'audio/hsk3/hsk3_夏天.wav' },
      { hanzi: '秋天', pinyin: 'qiū tiān', meaning: 'automne', meaningEn: 'autumn', audio: 'audio/hsk3/hsk3_秋天.wav' },
      { hanzi: '冬天', pinyin: 'dōng tiān', meaning: 'hiver', meaningEn: 'winter', audio: 'audio/hsk3/hsk3_冬天.wav' },
      { hanzi: '感冒', pinyin: 'gǎn mào', meaning: 'rhume', meaningEn: 'cold (illness)', audio: 'audio/hsk3/hsk3_感冒.wav' }
    ],
    tip:
      'En Chine du Nord (Pékin), l\'hiver descend à -10°C avec vent sec ; au Sud (Canton), il pleut beaucoup. Si tu visites en hiver, prévois selon la latitude : Pékin = équipement vraiment chaud, Shanghai = imperméable + couches.',
    tipEn:
      'In northern China (Beijing), winter drops to -10°C with dry wind; in the south (Canton), lots of rain. Visiting in winter, plan by latitude: Beijing = serious cold gear, Shanghai = waterproof + layers.'
  }
];

export const a2ConvM3LearnSections: LessonV2LearnSection[] = [
  {
    id: 'a2-malade',
    title: 'Dire qu\'on est malade ou fatigué',
    titleEn: 'Say you\'re sick or tired',
    body:
      'Symptômes courants :\n' +
      '- 我不舒服 — je ne me sens pas bien (phrase passe-partout)\n' +
      '- 我感冒了 — j\'ai un rhume\n' +
      '- 我发烧 — j\'ai de la fièvre\n' +
      '- 我头疼 — j\'ai mal à la tête\n' +
      '- 我肚子疼 — mal au ventre\n' +
      '- 我累 — je suis fatigué\n' +
      '\n' +
      'Expressions clés : 你怎么了？(qu\'est-ce qui ne va pas ?), 多休息 (repose-toi bien).\n' +
      '\n' +
      'À la pharmacie : 药店 (yàodiàn), 退烧药 (anti-fièvre), 感冒药 (anti-rhume). Si grave, **去医院** (aller à l\'hôpital — en Chine on va à l\'hôpital pour tout, pas chez le médecin de ville).',
    bodyEn:
      'Symptoms: 我不舒服 (I don\'t feel well — catchall), 我感冒了 (I have a cold), 我发烧 (I have a fever), 我头疼 (I have a headache), 我肚子疼 (stomach ache), 我累 (I\'m tired). Key expressions: 你怎么了？(what\'s wrong?), 多休息 (rest up). For the pharmacy: 药店 (yàodiàn), 退烧药 (fever reducer), 感冒药 (cold meds). If serious: 去医院 (go to the hospital — in China you go to the hospital for everything, not a private doctor).',
    items: [
      { hanzi: '舒服', pinyin: 'shū fu', meaning: 'à l\'aise', meaningEn: 'comfortable', audio: 'audio/hsk3/hsk3_舒服.wav' },
      { hanzi: '感冒', pinyin: 'gǎn mào', meaning: 'rhume', meaningEn: 'cold', audio: 'audio/hsk3/hsk3_感冒.wav' },
      { hanzi: '发烧', pinyin: 'fā shāo', meaning: 'fièvre', meaningEn: 'fever', audio: 'audio/hsk3/hsk3_发烧.wav' },
      { hanzi: '疼', pinyin: 'téng', meaning: 'douloureux', meaningEn: 'painful', audio: 'audio/hsk3/hsk3_疼.wav' },
      { hanzi: '医院', pinyin: 'yī yuàn', meaning: 'hôpital', meaningEn: 'hospital', audio: 'audio/hsk1/hsk1_医院.wav' }
    ],
    tip:
      'En Chine, pas de médecin généraliste de quartier comme en France. On va directement à l\'hôpital (公立医院 = public, ou 私立医院 = privé), on prend un ticket 挂号, on attend, on consulte. Plus rapide qu\'on ne pense pour les urgences.',
    tipEn:
      'In China, no neighborhood GP like in France. You go directly to the hospital (公立医院 = public, or 私立医院 = private), take a 挂号 ticket, wait, consult. Faster than expected for emergencies.'
  },
  {
    id: 'a2-tired',
    title: 'Fatigue, sommeil, stress',
    titleEn: 'Fatigue, sleep, stress',
    body:
      'Exprimer la fatigue :\n' +
      '- 我太累了 — je suis épuisé\n' +
      '- 我没睡好 — j\'ai mal dormi\n' +
      '- 我睡不着 — je n\'arrive pas à dormir\n' +
      '\n' +
      'Stress moderne : 我压力大 (je suis stressé), 工作很忙 (le travail est chargé).\n' +
      '\n' +
      'Encouragement : 加油 (courage), 多休息 (repose-toi), 早点睡觉 (couche-toi tôt).\n' +
      '\n' +
      'Remarque : phrase typique des proches chinois **注意身体** (zhùyì shēntǐ, prends soin de ta santé) — l\'équivalent du « take care » mais avec une vraie inquiétude pour le corps. Très courant en famille.',
    bodyEn:
      '我太累了 (I\'m exhausted), 我没睡好 (I slept badly), 我睡不着 (I can\'t fall asleep). Modern stress: 我压力大 (I\'m stressed), 工作很忙 (work is hectic). Encouragement: 加油 (chin up), 多休息 (rest), 早点睡觉 (sleep early). Typical Chinese loved-one phrase: 注意身体 (zhùyì shēntǐ, take care of your health). The equivalent of «take care» but with real concern for the body. Very common within families.',
    items: [
      { hanzi: '累', pinyin: 'lèi', meaning: 'fatigué', meaningEn: 'tired', audio: 'audio/hsk2/hsk2_累.wav' },
      { hanzi: '睡觉', pinyin: 'shuì jiào', meaning: 'dormir', meaningEn: 'sleep', audio: 'audio/hsk1/hsk1_睡觉.wav' },
      { hanzi: '压力', pinyin: 'yā lì', meaning: 'pression', meaningEn: 'pressure', audio: 'audio/hsk4/hsk4_压力.wav' },
      { hanzi: '休息', pinyin: 'xiū xi', meaning: 'se reposer', meaningEn: 'rest', audio: 'audio/hsk2/hsk2_休息.wav' },
      { hanzi: '身体', pinyin: 'shēn tǐ', meaning: 'corps, santé', meaningEn: 'body, health', audio: 'audio/hsk2/hsk2_身体.wav' }
    ],
    tip:
      'Si tes amis chinois te disent 注意身体, ce n\'est pas une politesse vide. C\'est un vrai marqueur d\'affection. Réponds 谢谢，你也是 (toi aussi).',
    tipEn:
      'If your Chinese friends say 注意身体, it\'s not an empty courtesy. It\'s a real marker of affection. Reply 谢谢，你也是 (you too).'
  }
];

export const a2ConvM4LearnSections: LessonV2LearnSection[] = [
  {
    id: 'a2-rdv',
    title: 'Prendre un rendez-vous',
    titleEn: 'Make an appointment',
    body:
      'Proposer un RDV :\n' +
      '- 我们什么时候见面？— quand est-ce qu\'on se voit ?\n' +
      '- 你周末有空吗？— libre ce weekend ?\n' +
      '- 我们一起吃饭吧 — mangeons ensemble\n' +
      '\n' +
      'Donner une date : 明天 (demain), 这个周末 (ce weekend), 下星期 (la semaine prochaine), X 月 X 号 (date précise).\n' +
      '\n' +
      'Confirmer : 几点？(à quelle heure ?), 在哪儿见？(où se voit-on ?).\n' +
      '\n' +
      'Annuler/reporter poliment : **不好意思，我有事，能不能改天？** (désolé, j\'ai un truc, on peut changer ?). Préfère **改天** (un autre jour) à un refus sec.',
    bodyEn:
      'Suggest: 我们什么时候见面？(when shall we meet?), 你周末有空吗？(free this weekend?), 我们一起吃饭吧 (let\'s eat together). Give a date: 明天 (tomorrow), 这个周末 (this weekend), 下星期 (next week), X 月 X 号 (specific date). Confirm: 几点？(what time?), 在哪儿见？(where?). Cancel/reschedule politely: 不好意思，我有事，能不能改天？(sorry, something came up, can we reschedule?). Prefer 改天 (another day) over a flat refusal.',
    items: [
      { hanzi: '见面', pinyin: 'jiàn miàn', meaning: 'se rencontrer', meaningEn: 'meet', audio: 'audio/hsk3/hsk3_见面.wav' },
      { hanzi: '有空', pinyin: 'yǒu kòng', meaning: 'avoir du temps libre', meaningEn: 'be free', audio: 'audio/hsk3/hsk3_有空.wav' },
      { hanzi: '周末', pinyin: 'zhōu mò', meaning: 'weekend', meaningEn: 'weekend', audio: 'audio/hsk3/hsk3_周末.wav' },
      { hanzi: '改天', pinyin: 'gǎi tiān', meaning: 'un autre jour', meaningEn: 'another day', audio: 'audio/hsk5/hsk5_改天.wav' },
      { hanzi: '一起', pinyin: 'yì qǐ', meaning: 'ensemble', meaningEn: 'together', audio: 'audio/hsk2/hsk2_一起.wav' }
    ],
    tip:
      'Pour fixer un RDV en Chine, on confirme presque toujours sur WeChat juste avant l\'heure : « 你到哪了？» (où es-tu ?), « 我马上到 » (j\'arrive). C\'est culturellement attendu — ne pas confirmer = perçu comme désinvolte.',
    tipEn:
      'To set an appointment in China, you almost always confirm on WeChat right before: «你到哪了？» (where are you?), «我马上到» (I\'m almost there). It\'s culturally expected — not confirming = seen as careless.'
  },
  {
    id: 'a2-rdv-rest',
    title: 'Inviter et qui paie',
    titleEn: 'Inviting and who pays',
    body:
      '我请你 (wǒ qǐng nǐ, je t\'invite — je paie) est un **marqueur fort** de relation.\n' +
      '\n' +
      'Le rituel typique :\n' +
      '- Refuser doucement — 不用，我自己来 (pas besoin, je me débrouille)\n' +
      '- L\'autre insiste — 没事，我请你 (de rien, je t\'invite)\n' +
      '- Tu cèdes — 那好吧，下次我请 (OK, la prochaine fois c\'est moi)\n' +
      '\n' +
      'Attention : le **下次我请** = promesse réciproque, à honorer absolument.\n' +
      '\n' +
      'Au resto chinois, partager l\'addition (AA制) est rare entre amis proches mais courant entre collègues ou couples jeunes urbains.',
    bodyEn:
      '我请你 (wǒ qǐng nǐ, I\'m inviting/treating you — I pay). It\'s a STRONG marker of relationship. Refuse gently: 不用，我自己来 (no need, I\'ll cover myself) — for form. The other INSISTS: 没事，我请你 (no worries, I\'m treating). You yield: 那好吧，下次我请 (OK, next time it\'s on me). 下次我请 = reciprocity promise, MUST be honored. At a Chinese restaurant, splitting the bill (AA制) is rare between close friends but common among colleagues or young urban couples.',
    items: [
      { hanzi: '请', pinyin: 'qǐng', meaning: 'inviter, payer pour', meaningEn: 'invite, treat', audio: 'audio/hsk1/hsk1_请.wav' },
      { hanzi: '不用', pinyin: 'bú yòng', meaning: 'pas besoin', meaningEn: 'no need', audio: 'audio/hsk2/hsk2_不用.wav' },
      { hanzi: '自己', pinyin: 'zì jǐ', meaning: 'soi-même', meaningEn: 'oneself', audio: 'audio/hsk3/hsk3_自己.wav' },
      { hanzi: '下次', pinyin: 'xià cì', meaning: 'la prochaine fois', meaningEn: 'next time', audio: 'audio/hsk2/hsk2_下次.wav' },
      { hanzi: 'AA制', pinyin: 'A A zhì', meaning: 'partage à parts égales', meaningEn: 'split bill', audio: 'audio/hsk5/hsk5_AA制.wav' }
    ],
    tip:
      'Au resto chinois entre amis, NE PROPOSE PAS de partager l\'addition d\'office. Laisse l\'autre dire 我请你 et accepte. Tu invites la prochaine fois (réel, pas formule). Sinon perçu comme froid/individualiste.',
    tipEn:
      'At a Chinese restaurant with friends, DON\'T propose to split the bill upfront. Let the other say 我请你 and accept. You\'ll treat next time (for real, not just a formula). Otherwise perceived as cold/individualistic.'
  }
];

export const a2ConvM5LearnSections: LessonV2LearnSection[] = [
  {
    id: 'a2-journee',
    title: 'Raconter sa journée',
    titleEn: 'Tell about your day',
    body:
      'Structure simple : **早上 (le matin) → 中午 (midi) → 下午 (après-midi) → 晚上 (le soir)**.\n' +
      '\n' +
      'Verbes-clés :\n' +
      '- 起床 — se lever\n' +
      '- 吃早饭 — petit-déjeuner\n' +
      '- 上班 — aller travailler\n' +
      '- 上学 — aller à l\'école\n' +
      '- 吃午饭 — déjeuner\n' +
      '- 下班 — rentrer du travail\n' +
      '- 回家 — rentrer chez soi\n' +
      '- 睡觉 — dormir\n' +
      '\n' +
      'Connecteurs : 然后 (puis), 接着 (ensuite), 最后 (à la fin).\n' +
      '\n' +
      'Phrase modèle : 我早上七点起床，然后吃早饭，八点上班.',
    bodyEn:
      'Simple structure: 早上 (morning) → 中午 (noon) → 下午 (afternoon) → 晚上 (evening). Key verbs: 起床 (get up), 吃早饭 (have breakfast), 上班 (go to work), 上学 (go to school), 吃午饭 (lunch), 下班 (get off work), 回家 (go home), 睡觉 (sleep). Connectors: 然后 (then), 接着 (next), 最后 (finally). Sample sentence: 我早上七点起床，然后吃早饭，八点上班.',
    items: [
      { hanzi: '起床', pinyin: 'qǐ chuáng', meaning: 'se lever', meaningEn: 'get up', audio: 'audio/hsk2/hsk2_起床.wav' },
      { hanzi: '上班', pinyin: 'shàng bān', meaning: 'aller travailler', meaningEn: 'go to work', audio: 'audio/hsk2/hsk2_上班.wav' },
      { hanzi: '下班', pinyin: 'xià bān', meaning: 'rentrer du travail', meaningEn: 'get off work', audio: 'audio/hsk2/hsk2_下班.wav' },
      { hanzi: '回家', pinyin: 'huí jiā', meaning: 'rentrer chez soi', meaningEn: 'go home', audio: 'audio/hsk1/hsk1_回家.wav' },
      { hanzi: '接着', pinyin: 'jiē zhe', meaning: 'ensuite', meaningEn: 'next', audio: 'audio/hsk4/hsk4_接着.wav' }
    ],
    tip:
      'En Chine, l\'horaire standard de bureau est 9h-18h (9-9-6 dans certaines tech : 9h-21h, 6 jours/sem — sujet brûlant). Mentionner 996 dans une conversation est immédiatement compris.',
    tipEn:
      'In China, standard office hours are 9-6 (9-9-6 in some tech: 9am-9pm, 6 days/week — a hot topic). Mentioning 996 in conversation is instantly understood.'
  },
  {
    id: 'a2-loisirs',
    title: 'Loisirs : ce que tu aimes faire',
    titleEn: 'Hobbies: what you like to do',
    body:
      'Structure-clé : **我喜欢 + verbe** (j\'aime).\n' +
      '\n' +
      'Loisirs courants :\n' +
      '- 看书 — lire\n' +
      '- 看电视 — regarder la TV\n' +
      '- 看电影 — films\n' +
      '- 听音乐 — écouter de la musique\n' +
      '- 跑步 — courir\n' +
      '- 旅游 — voyager\n' +
      '- 玩游戏 — jouer\n' +
      '- 拍照 — prendre des photos\n' +
      '\n' +
      'Pour préciser un type : 我喜欢中国电影 (j\'aime les films chinois).\n' +
      '\n' +
      'Astuce fréquence : 经常 (souvent), 有时候 (parfois), 偶尔 (occasionnellement), 从来不 (jamais).',
    bodyEn:
      '我喜欢 + verb (I like). Common hobbies: 看书 (read), 看电视 (watch TV), 看电影 (films), 听音乐 (listen to music), 跑步 (run), 旅游 (travel), 玩游戏 (play games), 拍照 (take photos). To specify: 我喜欢中国电影 (I like Chinese films). To express frequency: 经常 (often), 有时候 (sometimes), 偶尔 (occasionally), 从来不 (never).',
    items: [
      { hanzi: '看书', pinyin: 'kàn shū', meaning: 'lire', meaningEn: 'read', audio: 'audio/hsk1/hsk1_看书.wav' },
      { hanzi: '电影', pinyin: 'diàn yǐng', meaning: 'film', meaningEn: 'movie', audio: 'audio/hsk1/hsk1_电影.wav' },
      { hanzi: '音乐', pinyin: 'yīn yuè', meaning: 'musique', meaningEn: 'music', audio: 'audio/hsk3/hsk3_音乐.wav' },
      { hanzi: '旅游', pinyin: 'lǚ yóu', meaning: 'voyager', meaningEn: 'travel', audio: 'audio/hsk2/hsk2_旅游.wav' },
      { hanzi: '经常', pinyin: 'jīng cháng', meaning: 'souvent', meaningEn: 'often', audio: 'audio/hsk3/hsk3_经常.wav' }
    ],
    tip:
      'Demander les loisirs en Chine : 你平时喜欢做什么？(qu\'est-ce que tu aimes faire d\'habitude ?). Plus naturel que 你的爱好是什么？ qui sonne formulaire administratif.',
    tipEn:
      'Asking hobbies in China: 你平时喜欢做什么？(what do you usually like to do?). More natural than 你的爱好是什么？ which sounds like an admin form.'
  }
];

export const a2ConvM6LearnSections: LessonV2LearnSection[] = [
  {
    id: 'a2-resto',
    title: 'Au restaurant : commander un plat',
    titleEn: 'At the restaurant: order a dish',
    body:
      'Le parcours type au restaurant :\n' +
      '- Entrée — 几位？(combien de personnes ?) → 两位 / 三位\n' +
      '- Carte — 请给我菜单 (la carte svp)\n' +
      '- Commander — 我要 X (je veux X), 来一个 X (donne-moi un X, plus oral)\n' +
      '- Eau — 一壶水 (un pichet d\'eau, souvent gratuit)\n' +
      '- Appeler — 服务员 ! (serveur)\n' +
      '- Addition — 买单 (mǎidān, l\'addition svp)\n' +
      '\n' +
      'Pour préciser : 不要辣 (pas piquant), 少盐 (moins salé), 多放 X (mets plus de X).\n' +
      '\n' +
      'À table, le **partage de plats au centre** est la norme.',
    bodyEn:
      'Enter: 几位？(how many — by the waiter). Reply: 两位 / 三位. Ask for the menu: 请给我菜单 (menu please). Order: 我要 X (I want X), 来一个 X (give me an X — more oral). Specify: 不要辣 (not spicy), 少盐 (less salt), 多放 X (more X). Water: 一壶水 (a pitcher of water — often free), 服务员 (waiter — to call). Bill: 买单 (mǎidān, the bill please). At the table, sharing dishes in the center is the norm.',
    items: [
      { hanzi: '位', pinyin: 'wèi', meaning: 'classif. personnes (poli)', meaningEn: 'classifier persons (polite)', audio: 'audio/hsk2/hsk2_位.wav' },
      { hanzi: '菜单', pinyin: 'cài dān', meaning: 'menu', meaningEn: 'menu', audio: 'audio/hsk3/hsk3_菜单.wav' },
      { hanzi: '辣', pinyin: 'là', meaning: 'piquant', meaningEn: 'spicy', audio: 'audio/hsk4/hsk4_辣.wav' },
      { hanzi: '服务员', pinyin: 'fú wù yuán', meaning: 'serveur', meaningEn: 'waiter', audio: 'audio/hsk1/hsk1_服务员.wav' },
      { hanzi: '买单', pinyin: 'mǎi dān', meaning: 'l\'addition', meaningEn: 'the bill', audio: 'audio/hsk4/hsk4_买单.wav' }
    ],
    tip:
      'En Chine, on appelle le serveur d\'une voix forte 服务员 ! sans culpabiliser — c\'est la norme. Pas de pourboire (le service est inclus). Le prix affiché = le prix payé.',
    tipEn:
      'In China, you call the waiter with a loud 服务员 ! without guilt — it\'s the norm. No tipping (service included). Displayed price = price paid.'
  },
  {
    id: 'a2-feedback',
    title: 'Donner son avis sur la nourriture',
    titleEn: 'Give feedback on food',
    body:
      'Positif :\n' +
      '- 很好吃 — très bon\n' +
      '- 太好吃了 — extra\n' +
      '- 味道不错 — la saveur est bien\n' +
      '\n' +
      'Négatif (rare au resto, on ne se plaint pas en public) :\n' +
      '- 有点淡 — un peu fade\n' +
      '- 太咸了 — trop salé\n' +
      '- 太油 — trop gras\n' +
      '\n' +
      'Spécificités chinoises : **鲜** (xiān, umami — éloge suprême en cuisine chinoise), **清淡** (qīngdàn, peu épicé/léger, positif).\n' +
      '\n' +
      'Attention : les Chinois te demanderont 你吃习惯了吗？(tu t\'habitues à la cuisine ?). Réponds positivement même si tu galères, sinon tu **blesses**.',
    bodyEn:
      'Positive: 很好吃 (very tasty), 太好吃了 (super tasty), 味道不错 (good flavor). Negative (rare at the restaurant, you don\'t complain in public): 有点淡 (a bit bland), 太咸了 (too salty), 太油 (too greasy). Chinese specifics: 鲜 (xiān, umami — supreme praise in Chinese cuisine), 清淡 (qīngdàn, mild/light — positive). Chinese people will ask 你吃习惯了吗？(are you used to the food?) — reply positively even if struggling, otherwise you hurt them.',
    items: [
      { hanzi: '好吃', pinyin: 'hǎo chī', meaning: 'bon (à manger)', meaningEn: 'tasty', audio: 'audio/hsk1/hsk1_好吃.wav' },
      { hanzi: '味道', pinyin: 'wèi dào', meaning: 'goût, saveur', meaningEn: 'flavor', audio: 'audio/hsk4/hsk4_味道.wav' },
      { hanzi: '咸', pinyin: 'xián', meaning: 'salé', meaningEn: 'salty', audio: 'audio/hsk4/hsk4_咸.wav' },
      { hanzi: '甜', pinyin: 'tián', meaning: 'sucré', meaningEn: 'sweet', audio: 'audio/hsk3/hsk3_甜.wav' },
      { hanzi: '清淡', pinyin: 'qīng dàn', meaning: 'léger, peu relevé', meaningEn: 'mild, light', audio: 'audio/hsk5/hsk5_清淡.wav' }
    ],
    tip:
      'Hiérarchie de compliments alimentaires chinois : 不错 < 好吃 < 太好吃了 < 鲜 < 绝了 (zǎule, ouf c\'est dingue). « 鲜 » est le mot-roi : impossible à traduire, signifie « la saveur naturelle de l\'aliment frais ».',
    tipEn:
      'Chinese food compliment hierarchy: 不错 < 好吃 < 太好吃了 < 鲜 < 绝了 (zǎule, off the charts). «鲜» is the king word: untranslatable, means «natural fresh-ingredient flavor».'
  }
];

export const a2ConvM7LearnSections: LessonV2LearnSection[] = [
  {
    id: 'a2-relation',
    title: 'Décrire une relation : ami, collègue, famille',
    titleEn: 'Describe a relationship: friend, colleague, family',
    body:
      'RÈGLE D\'OR : la famille chinoise distingue **grand/petit** pour les frères/sœurs (pas en français).\n' +
      '\n' +
      'Famille :\n' +
      '- 爸爸 — père\n' +
      '- 妈妈 — mère\n' +
      '- 哥哥 — grand frère\n' +
      '- 弟弟 — petit frère\n' +
      '- 姐姐 — grande sœur\n' +
      '- 妹妹 — petite sœur\n' +
      '\n' +
      'Amis : 朋友 (ami), 好朋友 (bon ami), 男朋友 (petit copain), 女朋友 (petite copine).\n' +
      '\n' +
      'Travail : 同事 (collègue), 老板 (patron), 同学 (camarade de classe).\n' +
      '\n' +
      'Pour présenter quelqu\'un : 这是我朋友 X / 这是我同事 X.',
    bodyEn:
      'Family: 爸爸 (dad), 妈妈 (mom), 哥哥 (older brother), 弟弟 (younger brother), 姐姐 (older sister), 妹妹 (younger sister). Friends: 朋友 (friend), 好朋友 (good friend), 男朋友 (boyfriend), 女朋友 (girlfriend). Work: 同事 (colleague), 老板 (boss), 同学 (classmate). Particularity: Chinese family distinguishes older/younger for siblings (not in English). Introduce someone: 这是我朋友 X / 这是我同事 X.',
    items: [
      { hanzi: '朋友', pinyin: 'péng you', meaning: 'ami', meaningEn: 'friend', audio: 'audio/hsk1/hsk1_朋友.wav' },
      { hanzi: '同事', pinyin: 'tóng shì', meaning: 'collègue', meaningEn: 'colleague', audio: 'audio/hsk3/hsk3_同事.wav' },
      { hanzi: '老板', pinyin: 'lǎo bǎn', meaning: 'patron', meaningEn: 'boss', audio: 'audio/hsk5/hsk5_老板.wav' },
      { hanzi: '同学', pinyin: 'tóng xué', meaning: 'camarade de classe', meaningEn: 'classmate', audio: 'audio/hsk1/hsk1_同学.wav' },
      { hanzi: '男朋友', pinyin: 'nán péng you', meaning: 'petit copain', meaningEn: 'boyfriend', audio: 'audio/hsk2/hsk2_男朋友.wav' }
    ],
    tip:
      'Question CULTURELLE qu\'on te posera VITE : « 你结婚了吗？» (es-tu marié ?). Pas une intrusion en Chine, juste de la curiosité sociale normale. Réponds franchement : 还没 (pas encore) ou 结婚了 (oui).',
    tipEn:
      'CULTURAL question you\'ll be asked QUICKLY: «你结婚了吗？» (are you married?). Not an intrusion in China, just normal social curiosity. Reply honestly: 还没 (not yet) or 结婚了 (yes).'
  },
  {
    id: 'a2-personnalite',
    title: 'Décrire la personnalité de quelqu\'un',
    titleEn: 'Describe someone\'s personality',
    body:
      'Adjectifs courants :\n' +
      '- 聪明 — intelligent\n' +
      '- 善良 — gentil\n' +
      '- 友好 — amical\n' +
      '- 努力 — travailleur\n' +
      '- 幽默 — drôle\n' +
      '- 安静 — calme\n' +
      '- 活泼 — vif\n' +
      '- 热情 — chaleureux\n' +
      '- 冷淡 — froid\n' +
      '\n' +
      'Phrases types : 他人很好 (il est très bien — sens « bonne personne »), 她很聪明 (elle est intelligente).\n' +
      '\n' +
      'Pour nuancer : **有点 + adjectif négatif** (un peu — adoucit). 他有点害羞 (il est un peu timide).\n' +
      '\n' +
      'Attention : critiquer un Chinois par un adjectif négatif fort en public = **perte de face**, même si c\'est vrai.',
    bodyEn:
      'Common adjectives: 聪明 (smart), 善良 (kind), 友好 (friendly), 努力 (hardworking), 幽默 (funny), 安静 (quiet), 活泼 (lively), 热情 (warm), 冷淡 (cold). Phrase: 他人很好 (he\'s a good person), 她很聪明 (she\'s smart). To soften: 有点 + negative adjective (a bit — softens). 他有点害羞 (he\'s a bit shy). Avoid in public: criticizing a Chinese person with a strong negative adjective = loss of face, even if true.',
    items: [
      { hanzi: '聪明', pinyin: 'cōng ming', meaning: 'intelligent', meaningEn: 'smart', audio: 'audio/hsk3/hsk3_聪明.wav' },
      { hanzi: '热情', pinyin: 'rè qíng', meaning: 'chaleureux', meaningEn: 'warm', audio: 'audio/hsk4/hsk4_热情.wav' },
      { hanzi: '幽默', pinyin: 'yōu mò', meaning: 'humour, drôle', meaningEn: 'humor, funny', audio: 'audio/hsk4/hsk4_幽默.wav' },
      { hanzi: '害羞', pinyin: 'hài xiū', meaning: 'timide', meaningEn: 'shy', audio: 'audio/hsk5/hsk5_害羞.wav' },
      { hanzi: '认真', pinyin: 'rèn zhēn', meaning: 'sérieux', meaningEn: 'serious, earnest', audio: 'audio/hsk3/hsk3_认真.wav' }
    ],
    tip:
      '« 他人很好 » (« il est très bien comme personne ») est l\'éloge passe-partout. Si on te le dit de quelqu\'un, c\'est une vraie recommandation. À l\'inverse, dire « 他人不太好 » est très lourd — réservé aux situations vraiment claires.',
    tipEn:
      '«他人很好» («he\'s a good person») is the all-purpose praise. If said about someone, it\'s a real recommendation. Conversely, «他人不太好» is very heavy — reserved for truly clear-cut situations.'
  }
];

// === NUANCES A2 ==============================================================

export const a2NuancesM1LearnSections: LessonV2LearnSection[] = [
  {
    id: 'a2-cai-jiu-timing',
    title: '才 vs 就 — tard vs tôt (timing)',
    titleEn: '才 vs 就 — late vs early (timing)',
    body:
      'Deux adverbes qui colorent le **timing** d\'une action :\n' +
      '\n' +
      '- 就 (jiù) — déjà / dès, action arrivée **tôt**. 我七点就到了 = j\'étais arrivé dès 7h.\n' +
      '- 才 (cái) — seulement / pas avant, action **tardive**. 我九点才到 = je suis arrivé seulement à 9h.\n' +
      '\n' +
      'Test simple : si tu peux dire « pas avant » → **才** ; si « déjà » → **就**.\n' +
      '\n' +
      'Attention : phrase rouge 你怎么才来？(comment ça tu n\'arrives que maintenant ?) — exprime souvent un reproche.',
    bodyEn:
      '就 (jiù, already / as early as) marks an action that arrived EARLY, earlier than expected. 我七点就到了 = I arrived as early as 7. 才 (cái, only / not until) marks a LATE action. 我九点才到 = I only arrived at 9. Test: if you can say «not until» → 才. If «as early as» → 就. Classic mistake: using 就 everywhere — loses the temporal nuance. Red flag phrase: 你怎么才来？(how come you only arrive now?) — often a reproach.',
    items: [
      { hanzi: '才', pinyin: 'cái', meaning: 'seulement, pas avant', meaningEn: 'only, not until', audio: 'audio/hsk2/hsk2_才.wav' },
      { hanzi: '就', pinyin: 'jiù', meaning: 'déjà, dès', meaningEn: 'as early as', audio: 'audio/hsk2/hsk2_就.wav' },
      { hanzi: '到', pinyin: 'dào', meaning: 'arriver à', meaningEn: 'arrive at', audio: 'audio/hsk1/hsk1_到.wav' },
      { hanzi: '已经', pinyin: 'yǐ jīng', meaning: 'déjà', meaningEn: 'already', audio: 'audio/hsk2/hsk2_已经.wav' },
      { hanzi: '刚', pinyin: 'gāng', meaning: 'à l\'instant', meaningEn: 'just', audio: 'audio/hsk3/hsk3_刚.wav' }
    ],
    tip:
      'Astuce mnémotechnique : 才 a une « barre haute » qui suggère un retard ; 就 sonne « zhū » comme « zoooom » = rapide. À chaque heure tu te demandes : tôt ou tard ? puis 就 ou 才.',
    tipEn:
      'Mnemonic: 才 has a «high bar» suggesting delay; 就 sounds «jiù» like «zoom» = fast. Every time, ask: early or late? then 就 or 才.'
  },
  {
    id: 'a2-cai-jiu-quantite',
    title: '才 vs 就 — peu vs beaucoup (quantité)',
    titleEn: '才 vs 就 — few vs many (quantity)',
    body:
      'Au-delà du temps, 才/就 marquent aussi la **quantité avec sentiment** :\n' +
      '\n' +
      '- 我才吃了一个 — je n\'en ai mangé QU\'UN (peu, déçu)\n' +
      '- 我就吃了一个 — j\'en ai mangé un (suffisant, je m\'arrête)\n' +
      '\n' +
      'RÈGLE D\'OR : **才 = « pas assez »**, **就 = « ça suffit »**.\n' +
      '\n' +
      'Comparaison sur un prix :\n' +
      '- 这本书才十块 — ce livre coûte SEULEMENT 10 yuans (étonnamment peu cher)\n' +
      '- 这本书就十块？— ce livre c\'est 10 yuans seulement ? (suffisant ou douteux selon ton)\n' +
      '\n' +
      'Le ton change tout.',
    bodyEn:
      'Beyond time, 才/就 also mark quantity with feeling. 我才吃了一个 = I only ate ONE (few, disappointed). 我就吃了一个 = I ate just one (enough, I\'m stopping). 才 = «not enough» feeling; 就 = «that\'s enough» feeling. 这本书才十块 = this book is ONLY 10 yuan (surprisingly cheap). 这本书就十块？= this book is just 10 yuan? (sufficient or skeptical by tone). Tone is everything.',
    items: [
      { hanzi: '才', pinyin: 'cái', meaning: 'seulement (peu)', meaningEn: 'only (few)', audio: 'audio/hsk2/hsk2_才.wav' },
      { hanzi: '一个', pinyin: 'yí gè', meaning: 'un (chose)', meaningEn: 'one (thing)', audio: 'audio/hsk1/hsk1_一个.wav' },
      { hanzi: '本', pinyin: 'běn', meaning: 'classif. livres', meaningEn: 'classif. books', audio: 'audio/hsk1/hsk1_本.wav' },
      { hanzi: '足够', pinyin: 'zú gòu', meaning: 'suffisant', meaningEn: 'enough', audio: 'audio/hsk5/hsk5_足够.wav' },
      { hanzi: '不够', pinyin: 'bú gòu', meaning: 'pas assez', meaningEn: 'not enough', audio: 'audio/hsk4/hsk4_不够.wav' }
    ],
    tip:
      'Clé : 才 colore en NEGATIF (insuffisant, retard, peu) ; 就 colore en POSITIF (suffisant, à l\'heure, déjà). Si tu hésites, demande-toi quel ressenti tu veux exprimer.',
    tipEn:
      'Key: 才 colors NEGATIVELY (insufficient, late, few); 就 colors POSITIVELY (sufficient, on time, already). When hesitating, ask which feeling you want to express.'
  }
];

export const a2NuancesM2LearnSections: LessonV2LearnSection[] = [
  {
    id: 'a2-hai-zai',
    title: '还 vs 再 — encore (en cours) vs encore (à venir)',
    titleEn: '还 vs 再 — still (ongoing) vs again (upcoming)',
    body:
      'Différence **radicale** entre les deux :\n' +
      '\n' +
      '- 还 (hái) — encore, en COURS, n\'a pas changé\n' +
      '- 再 (zài) — encore une fois, plus tard (action FUTURE répétée)\n' +
      '\n' +
      'Exemples avec 还 : 我还在工作 (je suis encore en train de travailler), 还没 = pas encore. 我还没吃 = je n\'ai pas encore mangé.\n' +
      '\n' +
      'Exemples avec 再 : 我再来 (je reviens plus tard), 再说一遍 (redites encore, futur).\n' +
      '\n' +
      'Astuce : « Je veux encore du thé » → si on en boit déjà **我还要** ; si on demande à nouveau **我再要**.',
    bodyEn:
      '还 (hái, still — ONGOING, hasn\'t changed). 我还在工作 = I\'m still working. 还没 = not yet. 我还没吃 = I haven\'t eaten yet. 再 (zài, again, later). 我再来 = I\'ll come back. 再说一遍 = say it again (future). Radical difference: 还 = CONTINUOUS state, 再 = REPEATED future action. «I want more tea» → if drinking now: 我还要; if asking again: 我再要.',
    items: [
      { hanzi: '还', pinyin: 'hái', meaning: 'encore (en cours)', meaningEn: 'still (ongoing)', audio: 'audio/hsk2/hsk2_还.wav' },
      { hanzi: '再', pinyin: 'zài', meaning: 'encore (futur)', meaningEn: 'again (future)', audio: 'audio/hsk1/hsk1_再.wav' },
      { hanzi: '还没', pinyin: 'hái méi', meaning: 'pas encore', meaningEn: 'not yet', audio: 'audio/hsk2/hsk2_还.wav' },
      { hanzi: '又', pinyin: 'yòu', meaning: 'encore (passé)', meaningEn: 'again (past)', audio: 'audio/hsk3/hsk3_又.wav' },
      { hanzi: '继续', pinyin: 'jì xù', meaning: 'continuer', meaningEn: 'continue', audio: 'audio/hsk4/hsk4_继续.wav' }
    ],
    tip:
      'Test : remplace par « toujours / pas encore » → 还. Par « une nouvelle fois plus tard » → 再. Par « encore, dans le passé » → 又 (3e mot à connaître : 我又来了 = je suis revenu encore une fois).',
    tipEn:
      'Test: replace with «still / not yet» → 还. With «one more time later» → 再. With «again, in the past» → 又 (3rd word to know: 我又来了 = I\'ve come again).'
  },
  {
    id: 'a2-zai-you',
    title: '再 vs 又 — encore (futur) vs encore (passé)',
    titleEn: '再 vs 又 — again (future) vs again (past)',
    body:
      'RÈGLE D\'OR : **再 regarde le futur**, **又 regarde le passé**.\n' +
      '\n' +
      '- 再 — encore une fois dans le FUTUR (action pas encore faite). 明天再来 = je reviens demain.\n' +
      '- 又 (yòu) — encore une fois dans le PASSÉ (action déjà faite, répétée). 你又迟到了 = tu es encore arrivé en retard !\n' +
      '\n' +
      'Attention : erreur classique francophone — « il pleut encore aujourd\'hui » :\n' +
      '- Si c\'est récurrent maintenant et déjà — 又下雨了 (encore !)\n' +
      '- Si on prévoit la pluie demain — 明天又会下雨',
    bodyEn:
      '再 = once more in the FUTURE (action not yet done). 明天再来 = I\'ll come tomorrow again. 又 (yòu) = once more in the PAST (action already done, repeated). 你又迟到了 = you\'re late again! Classic mistake: «it\'s raining again today» → if recurring now and already: 又下雨了 (again!); if forecasting rain tomorrow: 明天又会下雨. Rule: 又 looks back, 再 looks forward.',
    items: [
      { hanzi: '又', pinyin: 'yòu', meaning: 'encore (passé)', meaningEn: 'again (past)', audio: 'audio/hsk3/hsk3_又.wav' },
      { hanzi: '迟到', pinyin: 'chí dào', meaning: 'arriver en retard', meaningEn: 'be late', audio: 'audio/hsk3/hsk3_迟到.wav' },
      { hanzi: '下雨', pinyin: 'xià yǔ', meaning: 'pleuvoir', meaningEn: 'rain', audio: 'audio/hsk1/hsk1_下雨.wav' },
      { hanzi: '重复', pinyin: 'chóng fù', meaning: 'répéter', meaningEn: 'repeat', audio: 'audio/hsk5/hsk5_重复.wav' },
      { hanzi: '一遍', pinyin: 'yí biàn', meaning: 'une fois (entière)', meaningEn: 'once (through)', audio: 'audio/hsk2/hsk2_遍.wav' }
    ],
    tip:
      '« 你又来了 ! » (encore toi !) sonne souvent reproche ou taquinerie. « 你再来吧 » (reviens) est neutre/encourageant. Inversion = malentendu social.',
    tipEn:
      '«你又来了！» (you again!) often sounds like reproach or teasing. «你再来吧» (come back) is neutral/encouraging. Mixing them up = social misunderstanding.'
  }
];

export const a2NuancesM3LearnSections: LessonV2LearnSection[] = [
  {
    id: 'a2-gen-he',
    title: '跟 vs 和 vs 与 — avec / et selon le registre',
    titleEn: '跟 vs 和 vs 与 — with / and by register',
    body:
      'Trois variantes selon le **registre** :\n' +
      '\n' +
      '- 和 (hé) — neutre, écrit ET oral, marche partout. 我和你一起去 = j\'y vais avec toi.\n' +
      '- 跟 (gēn) — oral, plus chaleureux, très utilisé entre amis. 我跟你说 = je te dis.\n' +
      '- 与 (yǔ) — formel, écrit. 中国与法国 = la Chine et la France. À l\'oral, **jamais 与**.\n' +
      '\n' +
      'Astuce : pour « parler à quelqu\'un » → 跟 X 说 (oral), 和 X 说 (neutre), 对 X 说 (un peu plus formel).',
    bodyEn:
      '和 (hé) = and / with (NEUTRAL, written AND spoken). Works everywhere. 我和你一起去 = I\'m going with you. 跟 (gēn) = with (SPOKEN, warmer). 我跟你说 = I\'m telling you. Heavy among friends. 与 (yǔ) = and / with (FORMAL, WRITTEN). 中国与法国 = China and France. In speech, NEVER 与. Tip: for «talk to someone» → 跟 X 说 (spoken), 和 X 说 (neutral), 对 X 说 (slightly more formal).',
    items: [
      { hanzi: '和', pinyin: 'hé', meaning: 'et / avec', meaningEn: 'and / with', audio: 'audio/hsk1/hsk1_和.wav' },
      { hanzi: '跟', pinyin: 'gēn', meaning: 'avec (oral)', meaningEn: 'with (spoken)', audio: 'audio/hsk3/hsk3_跟.wav' },
      { hanzi: '与', pinyin: 'yǔ', meaning: 'et / avec (formel)', meaningEn: 'and / with (formal)', audio: 'audio/hsk6/hsk6_与.wav' },
      { hanzi: '一起', pinyin: 'yì qǐ', meaning: 'ensemble', meaningEn: 'together', audio: 'audio/hsk2/hsk2_一起.wav' },
      { hanzi: '说', pinyin: 'shuō', meaning: 'parler, dire', meaningEn: 'speak, say', audio: 'audio/hsk1/hsk1_说.wav' }
    ],
    tip:
      'Si tu hésites, choisis 和 — universellement accepté. Réserve 跟 aux conversations entre amis/familier, et 与 aux écrits soutenus (presse, contrats).',
    tipEn:
      'When hesitating, pick 和 — universally accepted. Reserve 跟 for friendly/casual conversations, and 与 for formal writing (press, contracts).'
  },
  {
    id: 'a2-gen-dui',
    title: '跟 X 说 vs 对 X 说 vs 给 X 打电话',
    titleEn: '跟 X 说 vs 对 X 说 vs 给 X 打电话',
    body:
      'La préposition **change selon le canal** de communication :\n' +
      '\n' +
      '- 跟 X 说 — oral, échange à 2 sens (我跟妈妈说 = je discute avec maman)\n' +
      '- 对 X 说 — à sens unique, parfois autorité (我对妈妈说 = je dis à maman, sans forcément attendre de réponse)\n' +
      '- 给 X 打电话 — appeler X au téléphone\n' +
      '- 给 X 写信 — écrire à X\n' +
      '- 给 X 发消息 — SMS/WeChat\n' +
      '\n' +
      'Attention : erreur fréquente — utiliser 跟 pour téléphoner. C\'est **给** (donner) qui marque le destinataire ici.',
    bodyEn:
      'To talk to someone: 跟 X 说 (oral, two-way exchange), 对 X 说 (one-way, sometimes authoritative). 我跟妈妈说 = I\'m chatting with mom. 我对妈妈说 = I tell mom (without necessarily expecting a reply). 给 X 打电话 = call X on the phone. 给 X 写信 = write to X. The preposition CHANGES with the channel: for SMS/WeChat, also 给 X 发消息. Common mistake: using 跟 for phone — it\'s 给 (give) that marks the recipient here.',
    items: [
      { hanzi: '对', pinyin: 'duì', meaning: 'à, envers', meaningEn: 'to, toward', audio: 'audio/hsk1/hsk1_对.wav' },
      { hanzi: '给', pinyin: 'gěi', meaning: 'à, donner', meaningEn: 'to, give', audio: 'audio/hsk2/hsk2_给.wav' },
      { hanzi: '打电话', pinyin: 'dǎ diàn huà', meaning: 'appeler', meaningEn: 'phone', audio: 'audio/hsk1/hsk1_打电话.wav' },
      { hanzi: '发', pinyin: 'fā', meaning: 'envoyer', meaningEn: 'send', audio: 'audio/hsk3/hsk3_发.wav' },
      { hanzi: '消息', pinyin: 'xiāo xi', meaning: 'message, info', meaningEn: 'message', audio: 'audio/hsk4/hsk4_消息.wav' }
    ],
    tip:
      'Mémorise les blocs : 跟 X 说话 (parler avec) | 对 X 说 (dire à) | 给 X 打电话 (appeler) | 给 X 发消息 (envoyer un message). Le verbe gouverne la préposition.',
    tipEn:
      'Memorize the blocks: 跟 X 说话 (talk with) | 对 X 说 (tell) | 给 X 打电话 (call) | 给 X 发消息 (text). The verb governs the preposition.'
  }
];

export const a2NuancesM4LearnSections: LessonV2LearnSection[] = [
  {
    id: 'a2-zai-zhengzai',
    title: '在 vs 正在 — état vs en train de',
    titleEn: '在 vs 正在 — state vs in the act of',
    body:
      'Deux niveaux d\'intensité pour le progressif :\n' +
      '\n' +
      '- 在 + verbe — être en train de (état progressif simple). 我在吃饭 = je mange (en ce moment).\n' +
      '- 正在 + verbe — être JUSTE EN TRAIN DE (insistance sur l\'instant). 我正在吃饭 = je suis en plein repas (n\'interromps pas !).\n' +
      '\n' +
      '正在 souligne l\'instant précis, **plus fort**. Souvent suivi de 呢 à l\'oral : 我正在吃饭呢.\n' +
      '\n' +
      'Attention : erreur classique — confondre 在 (préposition de lieu) avec 在 (progressif). 我在家 (chez moi, lieu) vs 我在吃 (je mange, action en cours).',
    bodyEn:
      '在 + verb = be in the act of (simple progressive state). 我在吃饭 = I\'m eating (right now). 正在 + verb = be RIGHT IN THE MIDDLE OF (emphasis on the moment). 我正在吃饭 = I\'m in the middle of eating (don\'t interrupt!). Difference: 正在 highlights the precise moment, stronger. Often followed by 呢 in speech: 我正在吃饭呢. Common mistake: confusing 在 (place preposition) with 在 (progressive). 我在家 (at home, place) vs 我在吃 (I\'m eating, action in progress).',
    items: [
      { hanzi: '在', pinyin: 'zài', meaning: 'à / en train de', meaningEn: 'at / in act of', audio: 'audio/hsk1/hsk1_在.wav' },
      { hanzi: '正在', pinyin: 'zhèng zài', meaning: 'juste en train de', meaningEn: 'right in the act of', audio: 'audio/hsk2/hsk2_正在.wav' },
      { hanzi: '吃饭', pinyin: 'chī fàn', meaning: 'manger', meaningEn: 'eat', audio: 'audio/hsk1/hsk1_吃饭.wav' },
      { hanzi: '呢', pinyin: 'ne', meaning: 'particule en cours', meaningEn: 'progressive particle', audio: 'audio/hsk1/hsk1_呢.wav' },
      { hanzi: '正', pinyin: 'zhèng', meaning: 'juste, précisément', meaningEn: 'just, exactly', audio: 'audio/hsk4/hsk4_正.wav' }
    ],
    tip:
      'Combiné fréquent : 正在 + verbe + 呢 (formule complète d\'insistance). « 我正在工作呢 ! » = je suis en plein boulot ! (n\'embête pas).',
    tipEn:
      'Frequent combo: 正在 + verb + 呢 (full emphasis formula). «我正在工作呢！» = I\'m in the middle of work! (don\'t bother me).'
  },
  {
    id: 'a2-zhe-progressif',
    title: '着 — l\'état CONTINU',
    titleEn: '着 — the CONTINUOUS state',
    body:
      '着 (zhe) après un verbe = **état qui DURE (statique)**. Différent du progressif 在/正在 qui marque l\'action en cours.\n' +
      '\n' +
      'Comparaison :\n' +
      '- 他坐着 — il est assis (état statique)\n' +
      '- 他在坐 — il est en train de s\'asseoir (action en train de se faire)\n' +
      '- 门开着 — la porte est ouverte (état)\n' +
      '\n' +
      'À A2, retiens 5 verbes statiques avec 着 :\n' +
      '- 站着 — debout\n' +
      '- 坐着 — assis\n' +
      '- 拿着 — en train de tenir\n' +
      '- 穿着 — porter (vêtement)\n' +
      '- 开着 — ouvert / allumé',
    bodyEn:
      '着 (zhe) after a verb = state that LASTS (static). Different from progressive 在/正在 which marks action in progress. 他坐着 = he\'s sitting (static state). 门开着 = the door is open (state). 他在坐 = he\'s in the act of sitting down (action happening). At A2, learn 5 static verbs with 着: 站着 (standing), 坐着 (sitting), 拿着 (holding), 穿着 (wearing — clothes), 开着 (open / on).',
    items: [
      { hanzi: '着', pinyin: 'zhe', meaning: 'particule état continu', meaningEn: 'continuous state particle', audio: 'audio/hsk2/hsk2_着.wav' },
      { hanzi: '坐着', pinyin: 'zuò zhe', meaning: 'assis', meaningEn: 'sitting', audio: 'audio/hsk1/hsk1_坐.wav' },
      { hanzi: '站着', pinyin: 'zhàn zhe', meaning: 'debout', meaningEn: 'standing', audio: 'audio/hsk3/hsk3_站.wav' },
      { hanzi: '拿着', pinyin: 'ná zhe', meaning: 'en tenant', meaningEn: 'holding', audio: 'audio/hsk3/hsk3_拿.wav' },
      { hanzi: '开着', pinyin: 'kāi zhe', meaning: 'ouvert / allumé', meaningEn: 'open / on', audio: 'audio/hsk1/hsk1_开.wav' }
    ],
    tip:
      'Astuce : 着 décrit ce qu\'on VOIT en photo (état figé). 在/正在 décrit ce qu\'on VOIT en vidéo (action). « Sur la photo, il est 坐着 » ; « Dans la vidéo, il 在坐下 ».',
    tipEn:
      'Tip: 着 describes what you see in a PHOTO (frozen state). 在/正在 describes what you see in a VIDEO (action). «In the photo, he\'s 坐着»; «In the video, he\'s 在坐下».'
  },
  {
    id: 'a2-zai-zhe-tokens',
    title: 'Structure visuelle : 在 (avant V) vs 着 (après V)',
    titleEn: 'Visual structure: 在 (before V) vs 着 (after V)',
    body:
      '在/正在 (Modificateur) précèdent le verbe et marquent une action en cours. 着 (Particule) colle au verbe et marque un état statique qui DURE. Position différente, sens différent.',
    bodyEn:
      '在/正在 (Modifier) precede the verb and mark an action in progress. 着 (Particle) sticks to the verb and marks a static state that LASTS. Different position, different meaning.',
    tokenizedSentences: [
      {
        zh: [
          { text: '我', pinyin: 'wǒ', role: 'sujet' },
          { text: '在', pinyin: 'zài', role: 'modificateur' },
          { text: '吃', pinyin: 'chī', role: 'verbe' },
          { text: '饭', pinyin: 'fàn', role: 'objet' }
        ],
        fr: [
          { text: 'Je suis en train de', role: 'modificateur' },
          { text: 'manger', role: 'verbe' }
        ],
        note: 'PROGRESSIF : 在 AVANT le verbe = action en cours (comme -ing en anglais).'
      },
      {
        zh: [
          { text: '他', pinyin: 'tā', role: 'sujet' },
          { text: '正在', pinyin: 'zhèng zài', role: 'modificateur' },
          { text: '睡觉', pinyin: 'shuì jiào', role: 'verbe' }
        ],
        fr: [
          { text: 'Il est justement en train de', role: 'modificateur' },
          { text: 'dormir', role: 'verbe' }
        ],
        note: 'PROGRESSIF FORT : 正在 insiste sur l\'instant précis (« n\'interromps pas »).'
      },
      {
        zh: [
          { text: '他', pinyin: 'tā', role: 'sujet' },
          { text: '坐', pinyin: 'zuò', role: 'verbe' },
          { text: '着', pinyin: 'zhe', role: 'particule' }
        ],
        fr: [
          { text: 'Il est', role: 'sujet' },
          { text: 'assis', role: 'verbe' }
        ],
        note: 'STATIQUE : 着 APRÈS le verbe = état figé. La photo, pas la vidéo.'
      },
      {
        zh: [
          { text: '门', pinyin: 'mén', role: 'sujet' },
          { text: '开', pinyin: 'kāi', role: 'verbe' },
          { text: '着', pinyin: 'zhe', role: 'particule' }
        ],
        fr: [
          { text: 'La porte', role: 'sujet' },
          { text: 'est ouverte', role: 'verbe' }
        ],
        note: 'État résultat : la porte EST DANS l\'état « ouverte » (pas en train de s\'ouvrir).'
      }
    ],
    tip:
      'Repère graphique : 在 / 正在 sont AVANT le verbe (à gauche, rose). 着 est APRÈS le verbe (à droite, violet). Si tu vois 着 dans une phrase, n\'ajoute pas 在 — sauf cas particulier.',
    tipEn:
      'Visual cue: 在 / 正在 are BEFORE the verb (left, pink). 着 is AFTER the verb (right, purple). If you see 着 in a sentence, don\'t add 在 — except in special cases.'
  }
];

export const a2NuancesM5LearnSections: LessonV2LearnSection[] = [
  {
    id: 'a2-yidian-youdian',
    title: '一点 vs 有点 — un peu (positif vs négatif)',
    titleEn: '一点 vs 有点 — a bit (positive vs negative)',
    body:
      'Deux expressions pour « un peu », mais avec des positions et des couleurs différentes :\n' +
      '\n' +
      '- 一点 (yìdiǎn) — APRÈS le verbe ou comparatif. **Neutre voire positif**.\n' +
      '- 有点 (yǒudiǎn) — AVANT un adjectif, souvent **négatif**.\n' +
      '\n' +
      'Exemples avec 一点 : 多吃一点 (mange un peu plus), 慢一点 (un peu plus lentement), 我会一点 (j\'en sais un peu, modeste).\n' +
      '\n' +
      'Exemples avec 有点 : 我有点累 (je suis un peu fatigué), 这个有点贵 (c\'est un peu cher = trop cher poliment).',
    bodyEn:
      '一点 (yìdiǎn) = a little, after verb or comparative. Neutral or positive. 多吃一点 = eat a bit more. 慢一点 = a bit slower. 我会一点 = I know a little (modest). 有点 (yǒudiǎn) = a bit, BEFORE an often NEGATIVE adjective. 我有点累 = I\'m a bit tired. 这个有点贵 = this is a bit pricey (= too expensive politely). Rule: 一点 + after verb or comparative; 有点 + before subjective adj (often negative).',
    items: [
      { hanzi: '一点', pinyin: 'yì diǎn', meaning: 'un peu (positif)', meaningEn: 'a bit (positive)', audio: 'audio/hsk1/hsk1_一点.wav' },
      { hanzi: '有点', pinyin: 'yǒu diǎn', meaning: 'un peu (négatif)', meaningEn: 'a bit (negative)', audio: 'audio/hsk2/hsk2_有点.wav' },
      { hanzi: '慢', pinyin: 'màn', meaning: 'lent', meaningEn: 'slow', audio: 'audio/hsk2/hsk2_慢.wav' },
      { hanzi: '快', pinyin: 'kuài', meaning: 'rapide', meaningEn: 'fast', audio: 'audio/hsk2/hsk2_快.wav' },
      { hanzi: '便宜一点', pinyin: 'pián yi yì diǎn', meaning: 'un peu moins cher', meaningEn: 'a bit cheaper', audio: 'audio/hsk2/hsk2_便宜.wav' }
    ],
    tip:
      'Test rapide : si tu peux remplacer par « légèrement » (positif/neutre) → 一点 ; par « malheureusement un peu » → 有点. « Légèrement plus rapide » → 快一点 ; « malheureusement un peu cher » → 有点贵.',
    tipEn:
      'Quick test: if you can replace with «slightly» (positive/neutral) → 一点; with «unfortunately a bit» → 有点. «Slightly faster» → 快一点; «unfortunately a bit pricey» → 有点贵.'
  },
  {
    id: 'a2-marchander',
    title: 'Application : marchander avec 一点',
    titleEn: 'Application: bargain with 一点',
    body:
      'Au marché, le 一点 est ton **arme** — doux, n\'agresse pas. Variantes utiles :\n' +
      '\n' +
      '- 便宜一点 — un peu moins cher\n' +
      '- 再便宜一点 — encore un peu moins\n' +
      '- 少一点 — un peu moins\n' +
      '\n' +
      'Pour insister sans être impoli : 真的太贵了 + 便宜一点吧 (vraiment trop cher + un petit peu moins svp). Le **吧** final adoucit (« quoi »).\n' +
      '\n' +
      'Attention : évite 我不要 (je ne veux pas) sec + tu pars. Préfère **算了，我再想想** (laisse tomber, je vais réfléchir).',
    bodyEn:
      'At the market, 一点 is your weapon: 便宜一点 (a bit cheaper), 再便宜一点 (a bit cheaper still), 少一点 (a little less). It\'s gentle and non-aggressive. To insist without rudeness: 真的太贵了 + 便宜一点吧 (really too expensive + a bit less please). Final 吧 softens («come on»). Avoid: 我不要 (I don\'t want) blunt + leaving. Prefer: 算了，我再想想 (forget it, I\'ll think it over).',
    items: [
      { hanzi: '少', pinyin: 'shǎo', meaning: 'peu', meaningEn: 'few, less', audio: 'audio/hsk1/hsk1_少.wav' },
      { hanzi: '吧', pinyin: 'ba', meaning: 'particule adoucissante', meaningEn: 'softener particle', audio: 'audio/hsk2/hsk2_吧.wav' },
      { hanzi: '想想', pinyin: 'xiǎng xiang', meaning: 'réfléchir un peu', meaningEn: 'think about it', audio: 'audio/hsk1/hsk1_想.wav' },
      { hanzi: '算了', pinyin: 'suàn le', meaning: 'laisse tomber', meaningEn: 'forget it', audio: 'audio/hsk4/hsk4_算了.wav' },
      { hanzi: '太', pinyin: 'tài', meaning: 'trop', meaningEn: 'too', audio: 'audio/hsk1/hsk1_太.wav' }
    ],
    tip:
      'Le 吧 final est ton ami : il transforme un ordre en suggestion gentille. 走 (vas-y, sec) → 走吧 (allons-y, gentil). Use à profusion en marchandage et entre amis.',
    tipEn:
      'Final 吧 is your friend: it turns an order into a gentle suggestion. 走 (go, blunt) → 走吧 (let\'s go, friendly). Use generously in bargaining and among friends.'
  }
];

export const a2NuancesM6LearnSections: LessonV2LearnSection[] = [
  {
    id: 'a2-cong-li',
    title: '从 vs 离 — depuis (origine) vs distance',
    titleEn: '从 vs 离 — from (origin) vs distance',
    body:
      'Deux prépositions à ne **pas confondre** :\n' +
      '\n' +
      '- 从 (cóng) — depuis, à partir de. Marque l\'**origine** d\'un mouvement ou d\'un temps. Toujours suivi d\'un point de DÉPART.\n' +
      '- 离 (lí) — à distance de. Marque la **distance** entre 2 points (sans mouvement).\n' +
      '\n' +
      'Exemples avec 从 : 我从北京来 (je viens de Pékin), 从早上九点 (à partir de 9h).\n' +
      '\n' +
      'Exemples avec 离 : 我家离公司很近 (ma maison est proche du bureau). Structure : 离 + lieu/date + distance/durée.\n' +
      '\n' +
      'Attention : erreur fréquente 我离北京来 ✗ (impossible). Pour « venir de » → **toujours 从**.',
    bodyEn:
      '从 (cóng, from, starting from) marks the ORIGIN of a movement or time. 我从北京来 = I come from Beijing. 从早上九点 = from 9am. Always followed by a STARTING point. 离 (lí, at a distance from) marks DISTANCE between 2 points (no movement). 我家离公司很近 = my home is close to the office. 离 + place/date + distance/duration. Common mistake: 我离北京来 ✗ (impossible). For «come from» → always 从.',
    items: [
      { hanzi: '从', pinyin: 'cóng', meaning: 'depuis, de', meaningEn: 'from', audio: 'audio/hsk2/hsk2_从.wav' },
      { hanzi: '离', pinyin: 'lí', meaning: 'à distance de', meaningEn: 'distance from', audio: 'audio/hsk3/hsk3_离.wav' },
      { hanzi: '近', pinyin: 'jìn', meaning: 'proche', meaningEn: 'near', audio: 'audio/hsk2/hsk2_近.wav' },
      { hanzi: '远', pinyin: 'yuǎn', meaning: 'loin', meaningEn: 'far', audio: 'audio/hsk2/hsk2_远.wav' },
      { hanzi: '到', pinyin: 'dào', meaning: 'jusqu\'à', meaningEn: 'until', audio: 'audio/hsk1/hsk1_到.wav' }
    ],
    tip:
      'Combo classique : 从 X 到 Y = de X à Y. 从北京到上海 (de Pékin à Shanghai). Pour la distance entre les deux : 北京离上海一千公里 (Pékin est à 1000 km de Shanghai).',
    tipEn:
      'Classic combo: 从 X 到 Y = from X to Y. 从北京到上海 (from Beijing to Shanghai). For the distance between them: 北京离上海一千公里 (Beijing is 1000 km from Shanghai).'
  },
  {
    id: 'a2-cong-conglai',
    title: '从来 vs 一直 — toujours et son contraire',
    titleEn: '从来 vs 一直 — always and its opposite',
    body:
      'Deux adverbes pour exprimer la **continuité** ou son contraire :\n' +
      '\n' +
      '- 从来 (cónglái) — toujours suivi d\'une **négation** = jamais (depuis toujours)\n' +
      '- 一直 (yìzhí) — tout le temps, sans interruption. Marche dans positif ET négatif.\n' +
      '\n' +
      'Exemples avec 从来 : 我从来不喝酒 (je n\'ai jamais bu d\'alcool), 从来没去过 (je n\'y suis jamais allé).\n' +
      '\n' +
      'Exception : 从来 ne s\'utilise **pas** en positif seul (pas 我从来去 ✗).\n' +
      '\n' +
      'Exemple avec 一直 : 我一直在等你 (je t\'attends depuis tout ce temps). 一直 souligne la **continuité**.',
    bodyEn:
      '从来 (cónglái) followed by NEGATION = never (since always). 我从来不喝酒 = I\'ve never drunk alcohol / I never drink. 从来没去过 = I\'ve never been there. 从来 is NOT used in standalone positive (not 我从来去 ✗). 一直 (yìzhí, all the time, uninterrupted) works in positive AND negative. 我一直在等你 = I\'ve been waiting for you all this time. 一直 highlights CONTINUITY. Difference: 从来不 = never (absolute negation); 一直 = continuous / constant.',
    items: [
      { hanzi: '从来', pinyin: 'cóng lái', meaning: 'jamais (+ négation)', meaningEn: 'never (+ negation)', audio: 'audio/hsk4/hsk4_从来.wav' },
      { hanzi: '一直', pinyin: 'yì zhí', meaning: 'tout le temps', meaningEn: 'continuously', audio: 'audio/hsk3/hsk3_一直.wav' },
      { hanzi: '永远', pinyin: 'yǒng yuǎn', meaning: 'pour toujours', meaningEn: 'forever', audio: 'audio/hsk5/hsk5_永远.wav' },
      { hanzi: '总是', pinyin: 'zǒng shì', meaning: 'toujours', meaningEn: 'always', audio: 'audio/hsk3/hsk3_总是.wav' },
      { hanzi: '从未', pinyin: 'cóng wèi', meaning: 'jamais (écrit)', meaningEn: 'never (written)', audio: 'audio/hsk6/hsk6_从未.wav' }
    ],
    tip:
      'Hierarchy de « toujours » : 总是 (toujours, fréquent) < 经常 (souvent) < 一直 (continu). « Jamais » : 从来不 (jamais, présent absolu) ; 从来没 + 过 (jamais, passé). À ne pas confondre.',
    tipEn:
      'Hierarchy of «always»: 总是 (always, frequent) < 经常 (often) < 一直 (continuous). «Never»: 从来不 (never, absolute present); 从来没 + 过 (never, past). Don\'t mix them.'
  }
];

export const a2NuancesM7LearnSections: LessonV2LearnSection[] = [
  {
    id: 'a2-zenmeyang-zenme',
    title: '怎么样 vs 怎么 — comment c\'est vs comment faire',
    titleEn: '怎么样 vs 怎么 — how is it vs how to',
    body:
      'Deux interrogatifs proches mais distincts :\n' +
      '\n' +
      '- 怎么样 (zěnmeyàng) — demande un **avis** ou un état\n' +
      '- 怎么 (zěnme) — demande la **manière** ou la cause\n' +
      '\n' +
      'Exemples avec 怎么样 :\n' +
      '- 这个怎么样？— qu\'en penses-tu ?\n' +
      '- 你最近怎么样？— comment vas-tu récemment ?\n' +
      '\n' +
      'Exemples avec 怎么 :\n' +
      '- 这个怎么用？— comment ça s\'utilise ?\n' +
      '- 你怎么来了？— pourquoi/comment es-tu venu ?',
    bodyEn:
      '怎么样 (zěnmeyàng, how is it / what do you think) = asks for an OPINION or state. 这个怎么样？= what do you think? / how is it? 你最近怎么样？= how have you been? 怎么 (zěnme, how / why) = asks the MANNER or cause. 这个怎么用？= how do you use it? 你怎么来了？= why/how did you come? Difference: 怎么样 expects an OPINION; 怎么 expects a METHOD or REASON.',
    items: [
      { hanzi: '怎么样', pinyin: 'zěn me yàng', meaning: 'comment c\'est', meaningEn: 'how is it', audio: 'audio/hsk1/hsk1_怎么样.wav' },
      { hanzi: '怎么', pinyin: 'zěn me', meaning: 'comment / pourquoi', meaningEn: 'how / why', audio: 'audio/hsk1/hsk1_怎么.wav' },
      { hanzi: '为什么', pinyin: 'wèi shén me', meaning: 'pourquoi (cause)', meaningEn: 'why (cause)', audio: 'audio/hsk2/hsk2_为什么.wav' },
      { hanzi: '用', pinyin: 'yòng', meaning: 'utiliser', meaningEn: 'use', audio: 'audio/hsk2/hsk2_用.wav' },
      { hanzi: '最近', pinyin: 'zuì jìn', meaning: 'récemment', meaningEn: 'recently', audio: 'audio/hsk3/hsk3_最近.wav' }
    ],
    tip:
      'Astuce : 怎么样 = bon brise-glace pour démarrer une conversation. « 你最近怎么样 ? » est l\'équivalent du « ça va depuis longtemps ? » français. Réponses standards : 还行 (ça va), 不错 (pas mal), 挺好 (très bien).',
    tipEn:
      'Tip: 怎么样 = good icebreaker to start a conversation. «你最近怎么样？» is the equivalent of English «how have you been?». Standard replies: 还行 (OK), 不错 (not bad), 挺好 (very good).'
  },
  {
    id: 'a2-weishenme-zenme-le',
    title: '为什么 vs 怎么了 — pourquoi (curiosité) vs qu\'est-ce qui se passe',
    titleEn: '为什么 vs 怎么了 — why (curiosity) vs what\'s wrong',
    body:
      'Deux questions très différentes émotionnellement :\n' +
      '\n' +
      '- 为什么 (wèishénme) — pourquoi (**cause logique**). Demande une explication.\n' +
      '- 怎么了 (zěnme le) — qu\'est-ce qui se passe, qu\'est-ce qui ne va pas. Marque l\'**inquiétude** ou la surprise.\n' +
      '\n' +
      'Exemples : 你为什么学中文？(pourquoi étudies-tu le chinois ?) vs 你怎么了？(qu\'est-ce qui ne va pas ?).\n' +
      '\n' +
      'Attention : devant quelqu\'un en pleurs, tu n\'utiliserais **jamais** 为什么 — trop froid, demande de justification.',
    bodyEn:
      '为什么 (wèishénme) = why (logical cause). 你为什么学中文？= why are you studying Chinese? 怎么了 (zěnme le) = what\'s going on / what\'s wrong. Marks CONCERN or SURPRISE. You see someone crying: 你怎么了？= what\'s wrong? You wouldn\'t use 为什么 here (too cold, demand for justification). Difference: 为什么 = causal explanation; 怎么了 = empathy/concern.',
    items: [
      { hanzi: '为什么', pinyin: 'wèi shén me', meaning: 'pourquoi (cause)', meaningEn: 'why (cause)', audio: 'audio/hsk2/hsk2_为什么.wav' },
      { hanzi: '怎么了', pinyin: 'zěn me le', meaning: 'qu\'est-ce qui se passe', meaningEn: 'what\'s wrong', audio: 'audio/hsk1/hsk1_怎么.wav' },
      { hanzi: '哭', pinyin: 'kū', meaning: 'pleurer', meaningEn: 'cry', audio: 'audio/hsk5/hsk5_哭.wav' },
      { hanzi: '担心', pinyin: 'dān xīn', meaning: 's\'inquiéter', meaningEn: 'worry', audio: 'audio/hsk4/hsk4_担心.wav' },
      { hanzi: '关心', pinyin: 'guān xīn', meaning: 'se préoccuper de', meaningEn: 'care about', audio: 'audio/hsk3/hsk3_关心.wav' }
    ],
    tip:
      'Devant un proche en détresse, NE COMMENCE JAMAIS par 为什么. C\'est interprété comme « justifie-toi ». Toujours 怎么了？(qu\'est-ce qui ne va pas ?) puis 你需要什么吗？(de quoi as-tu besoin ?).',
    tipEn:
      'In front of a distressed loved one, NEVER start with 为什么. It\'s read as «justify yourself». Always 怎么了？(what\'s wrong?) then 你需要什么吗？(do you need anything?).'
  }
];

export const a2NuancesKaiMainVerbLearnSections: LessonV2LearnSection[] = [
  {
    id: 'a2-kai-family-1-open',
    title: '开 famille 1 : ouvrir, activer, rendre disponible',
    titleEn: '开 family 1: open, activate, make available',
    body:
      'L\'idée centrale de 开 : passer d\'un état FERMÉ, éteint ou scellé à un état OUVERT, actif ou libre. Cette métaphore couvre bien plus que les portes.\n' +
      '\n' +
      'Objets physiques : 开门 (kāi mén) « ouvrir la porte », 开窗 (kāi chuāng) « ouvrir la fenêtre ». Antonyme systématique : 关 (guān) « fermer ».\n' +
      '\n' +
      'Appareils électriques : le chinois considère qu\'allumer un appareil, c\'est « ouvrir » son circuit. 开灯 (kāi dēng) « allumer la lumière », 开空调 (kāi kōngtiáo) « mettre la clim », 开电脑 (kāi diànnǎo) « allumer l\'ordi ». Ex : 天黑了，快开灯吧 (tiān hēi le, kuài kāi dēng ba) « il fait noir, allume vite ».\n' +
      '\n' +
      'Fleurs : 花开了 (huā kāi le) « les fleurs ont éclos » — même métaphore, appliquée aux pétales qui s\'ouvrent.\n' +
      '\n' +
      'Documents officiels : dans le sens « ouvrir un dossier / émettre un papier ». 开发票 (kāi fāpiào) « émettre une facture », 开证明 (kāi zhèngmíng) « délivrer un certificat », 开药 (kāi yào) « prescrire des médicaments », 开户 (kāi hù) « ouvrir un compte bancaire ».\n' +
      '\n' +
      'Ouverture d\'esprit et sentiments : 开心 (kāi xīn) « content » = littéralement « cœur ouvert ». 开朗 (kāi lǎng) « ouvert, jovial ». 开放 (kāi fàng) « ouvert (société, esprit) ». Ex : 跟你聊天以后，我开心多了 (gēn nǐ liáotiān yǐhòu, wǒ kāi xīn duō le) « après avoir discuté avec toi, je vais beaucoup mieux ».',
    bodyEn:
      'The core idea of 开: shift from CLOSED, off, or sealed to OPEN, active, or free. This metaphor covers far more than doors. Physical objects: 开门 (open the door), 开窗 (open the window). Systematic antonym: 关 (close). Electric devices: Chinese treats turning on a device as «opening» its circuit. 开灯 (turn on the light), 开空调 (turn on the AC), 开电脑 (turn on the computer). Ex: 天黑了，快开灯吧 = «it\'s dark, turn on the light quickly». Flowers: 花开了 (the flowers have bloomed) — same metaphor applied to petals opening up. Official documents: in the sense «open a file / issue a paper». 开发票 (issue an invoice), 开证明 (deliver a certificate), 开药 (prescribe meds), 开户 (open a bank account). Open-mindedness and feelings: 开心 «happy» = literally «open heart». 开朗 «open, cheerful». 开放 «open (society, mind)». Ex: 跟你聊天以后，我开心多了 = «after chatting with you, I feel much better».',
    items: [
      { hanzi: '开门', pinyin: 'kāi mén', meaning: 'ouvrir la porte', meaningEn: 'open the door', audio: 'audio/hsk1/hsk1_开门.wav' },
      { hanzi: '开灯', pinyin: 'kāi dēng', meaning: 'allumer la lumière', meaningEn: 'turn on the light', audio: 'audio/hsk1/hsk1_开灯.wav' },
      { hanzi: '开空调', pinyin: 'kāi kōng tiáo', meaning: 'allumer la clim', meaningEn: 'turn on the AC', audio: 'audio/hsk3/hsk3_空调.wav' },
      { hanzi: '开发票', pinyin: 'kāi fā piào', meaning: 'émettre une facture', meaningEn: 'issue an invoice', audio: 'audio/hsk4/hsk4_发票.wav' },
      { hanzi: '开心', pinyin: 'kāi xīn', meaning: 'content, joyeux', meaningEn: 'happy', audio: 'audio/hsk1/hsk1_开心.wav' },
      { hanzi: '花开了', pinyin: 'huā kāi le', meaning: 'les fleurs ont éclos', meaningEn: 'the flowers bloomed', audio: 'audio/hsk3/hsk3_花.wav' }
    ],
    tip:
      'Quand tu vois un mot nouveau contenant 开, demande-toi ce qui était « fermé » et devient « ouvert ». Ça marche 8 fois sur 10.',
    tipEn:
      'When you meet a new word containing 开, ask yourself what was «closed» and becomes «open». It works 8 times out of 10.'
  },
  {
    id: 'a2-kai-family-2-launch',
    title: '开 famille 2 : lancer, démarrer une activité',
    titleEn: '开 family 2: launch, start an activity',
    body:
      'Ici 开 lance une activité qui était en pause ou en attente. Le verbe le plus général est 开始 (kāi shǐ) « commencer », qui marche presque partout : 会议开始了 (huìyì kāi shǐ le) « la réunion a commencé », 我们开始上课吧 (wǒmen kāi shǐ shàng kè ba) « on commence le cours ».\n' +
      '\n' +
      'Compounds figés du calendrier ou de la routine : à mémoriser en bloc. 开学 (kāi xué) « la rentrée / débuter l\'année scolaire », 开工 (kāi gōng) « démarrer les travaux, se remettre au boulot », 开饭 (kāi fàn) « le repas est servi ».\n' +
      '\n' +
      'Attention : 开学 ≠ 开始学. 开学 (kāi xué) signifie « la rentrée scolaire » (compound figé). 开始学 (kāi shǐ xué) signifie « commencer à étudier » (verbe + verbe).\n' +
      '\n' +
      'Version orale et vive : à l\'oral décontracté, 开 s\'attache directement à un verbe monosyllabique pour dire « démarrer X avec énergie ». 开吃 (kāi chī) « allez, on mange », 开聊 (kāi liáo) « on cause », 开跑 (kāi pǎo) « on court ». Plus vif que 开始吃. Ex : 人都到齐了，我们开吃吧 (rén dōu dào qí le, wǒmen kāi chī ba) « tout le monde est là, on attaque ».\n' +
      '\n' +
      'Compound célèbre : 开玩笑 (kāi wánxiào) « plaisanter, blaguer » — littéralement « lancer une blague ». Souvent en 别开玩笑了 (bié kāi wánxiào le) « arrête de rigoler ».',
    bodyEn:
      'Here 开 launches an activity that was paused or pending. The most general verb is 开始 (start), which works almost everywhere: 会议开始了 = «the meeting has started», 我们开始上课吧 = «let\'s start the class». Fixed compounds for the calendar or routine: memorize as blocks. 开学 «school starts / new school year begins», 开工 «start work / get back to work», 开饭 «the meal is served». Watch out: 开学 ≠ 开始学. 开学 = «start of the school year» (frozen compound). 开始学 = «start studying» (verb + verb). Spoken lively version: in casual speech, 开 attaches directly to a monosyllabic verb to say «start X with energy». 开吃 «let\'s eat», 开聊 «let\'s chat», 开跑 «let\'s run». Livelier than 开始吃. Ex: 人都到齐了，我们开吃吧 = «everyone\'s here, let\'s dig in». Famous compound: 开玩笑 «joke around» — literally «launch a joke». Often as 别开玩笑了 = «stop joking around».',
    items: [
      { hanzi: '开始', pinyin: 'kāi shǐ', meaning: 'commencer', meaningEn: 'start, begin', audio: 'audio/hsk2/hsk2_开始.wav' },
      { hanzi: '开学', pinyin: 'kāi xué', meaning: 'rentrée scolaire', meaningEn: 'school starts', audio: 'audio/hsk3/hsk3_开学.wav' },
      { hanzi: '开工', pinyin: 'kāi gōng', meaning: 'démarrer les travaux', meaningEn: 'start work', audio: 'audio/hsk4/hsk4_工作.wav' },
      { hanzi: '开饭', pinyin: 'kāi fàn', meaning: 'le repas est servi', meaningEn: 'the meal is served', audio: 'audio/hsk1/hsk1_饭.wav' },
      { hanzi: '开玩笑', pinyin: 'kāi wán xiào', meaning: 'plaisanter, blaguer', meaningEn: 'joke around', audio: 'audio/hsk4/hsk4_开玩笑.wav' }
    ],
    tip:
      'À l\'écrit soutenu ou officiel, on préfère 开始 ou 开启 (kāi qǐ, « inaugurer, ouvrir un nouveau chapitre »). À l\'oral vif, 开 + verbe court est très naturel.',
    tipEn:
      'In formal writing, prefer 开始 or 开启 (inaugurate, open a new chapter). In lively speech, 开 + short verb is very natural.'
  },
  {
    id: 'a2-kai-family-3-operate',
    title: '开 famille 3 : conduire, opérer, tenir un établissement',
    titleEn: '开 family 3: drive, operate, run a business',
    body:
      'Cette famille couvre l\'ACTIVITÉ CONTINUE d\'utiliser une machine, tenir un commerce ou animer un événement.\n' +
      '\n' +
      'Véhicules motorisés : 开车 (kāi chē) « conduire », 开飞机 (kāi fēi jī) « piloter un avion », 开船 (kāi chuán) « naviguer ». Ex : 他每天开车去上班 (tā měi tiān kāi chē qù shàng bān) « il vient au boulot en voiture tous les jours ».\n' +
      '\n' +
      'Attention : pour vélo ou cheval, on utilise 骑 (qí « chevaucher »), pas 开.\n' +
      '\n' +
      'Le véhicule sujet : 火车开了 (huǒ chē kāi le) « le train est parti », 船开了 (chuán kāi le) « le bateau a levé l\'ancre ». Le focus est le départ du véhicule sans mentionner le conducteur.\n' +
      '\n' +
      'Tenir un commerce : 开店 (kāi diàn) « ouvrir / tenir un magasin », 开公司 (kāi gōng sī) « lancer / diriger une entreprise », 开餐厅 (kāi cān tīng) « ouvrir / tenir un resto ». Ex : 她想开店，以后自己当老板 (tā xiǎng kāi diàn, yǐhòu zì jǐ dāng lǎo bǎn) « elle veut ouvrir un magasin, devenir sa propre patronne ».\n' +
      '\n' +
      'Animer un événement : 开会 (kāi huì) « tenir une réunion », 开派对 (kāi pài duì) « faire une fête », 开演唱会 (kāi yǎn chàng huì) « donner un concert ». Ex : 我们下午三点开会 (wǒmen xià wǔ sān diǎn kāi huì) « on a une réunion à 15 h ». En cours de réunion : 我们正在开会 (wǒmen zhèng zài kāi huì) « on est en réunion ».',
    bodyEn:
      'This family covers the CONTINUOUS ACTIVITY of using a machine, running a business, or holding an event. Motor vehicles: 开车 (drive), 开飞机 (pilot a plane), 开船 (sail). Ex: 他每天开车去上班 = «he drives to work every day». Watch out: for bike or horse, use 骑 (qí «ride»), not 开. Vehicle as subject: 火车开了 = «the train has left», 船开了 = «the boat has cast off». The focus is the vehicle\'s departure without mentioning the driver. Running a business: 开店 «open/run a shop», 开公司 «launch/run a company», 开餐厅 «open/run a restaurant». Ex: 她想开店，以后自己当老板 = «she wants to open a shop and be her own boss». Holding an event: 开会 «hold a meeting», 开派对 «throw a party», 开演唱会 «give a concert». Ex: 我们下午三点开会 = «we have a meeting at 3 pm». Mid-meeting: 我们正在开会 = «we\'re in a meeting».',
    items: [
      { hanzi: '开车', pinyin: 'kāi chē', meaning: 'conduire', meaningEn: 'drive', audio: 'audio/hsk2/hsk2_开车.wav' },
      { hanzi: '开船', pinyin: 'kāi chuán', meaning: 'naviguer, faire partir un bateau', meaningEn: 'sail', audio: 'audio/hsk3/hsk3_船.wav' },
      { hanzi: '开店', pinyin: 'kāi diàn', meaning: 'ouvrir / tenir un magasin', meaningEn: 'open/run a shop', audio: 'audio/hsk1/hsk1_商店.wav' },
      { hanzi: '开公司', pinyin: 'kāi gōng sī', meaning: 'lancer / diriger une entreprise', meaningEn: 'run a company', audio: 'audio/hsk2/hsk2_公司.wav' },
      { hanzi: '开会', pinyin: 'kāi huì', meaning: 'tenir une réunion', meaningEn: 'hold a meeting', audio: 'audio/hsk3/hsk3_开会.wav' },
      { hanzi: '开演唱会', pinyin: 'kāi yǎn chàng huì', meaning: 'donner un concert', meaningEn: 'give a concert', audio: 'audio/hsk4/hsk4_演出.wav' }
    ],
    tip:
      '开会 ne signifie pas seulement « démarrer une réunion » mais aussi la TENIR pendant sa durée. C\'est le sens « opérer / faire fonctionner ».',
    tipEn:
      '开会 doesn\'t just mean «start a meeting» — it also means HOLDING it for its whole duration. That\'s the «operate / keep running» sense.'
  }
];

// --- cecr-a2-nuances-m9 — 怎么 vs 怎么样 vs 什么样 ------------------------
export const a2NuancesZenmeBasicsLearnSections: LessonV2LearnSection[] = [
  {
    id: 'a2-zenme-method',
    title: '怎么 + verbe : demander la méthode',
    titleEn: '怎么 + verb: asking about method',
    body:
      'Structure : (sujet) + 怎么 + verbe + (objet) ?\n' +
      '\n' +
      '怎么 avant un verbe demande le « comment faire ». Ex : 这个字怎么写 (zhè ge zì zěn me xiě) « comment écrit-on ce caractère ? ».\n' +
      '\n' +
      'Ex : 这道菜怎么做 (zhè dào cài zěn me zuò) « comment prépare-t-on ce plat ? ».\n' +
      '\n' +
      'Directions : usage constant avec 去/走/到. Ex : 去地铁站怎么走 (qù dì tiě zhàn zěn me zǒu) « comment on va à la station de métro ? ». Peut se dire seul (怎么走 ?) quand le contexte pointe la destination.\n' +
      '\n' +
      'Attention à l\'ordre : en français « comment » vient en tête, en chinois 怎么 reste JUSTE AVANT LE VERBE, à la place où irait la réponse. L\'objet monte en début de phrase comme topique : 这道菜 (topique) + 怎么 + 做.\n' +
      '\n' +
      'Alternatives par registre : 怎样 (zěn yàng) un peu plus posé (cours, présentation) ; 如何 (rú hé) très écrit (titres, essais). À l\'oral, garde 怎么.',
    bodyEn:
      'Structure: (subject) + 怎么 + verb + (object)? 怎么 before a verb asks «how do you do X?». Ex: 这个字怎么写 (zěn me xiě) = «how do you write this character?». Ex: 这道菜怎么做 = «how do you make this dish?». Directions: constant usage with 去/走/到. Ex: 去地铁站怎么走 = «how do you get to the subway station?». Can stand alone (怎么走?) when context points to the destination. Watch the word order: in English «how» comes first, but in Chinese 怎么 stays RIGHT BEFORE THE VERB — where the answer would go. The object moves to sentence-initial as a topic: 这道菜 (topic) + 怎么 + 做. Register alternatives: 怎样 (zěn yàng) slightly more measured (classes, presentations); 如何 (rú hé) very written (titles, essays). In speech, stick with 怎么.',
    items: [
      { hanzi: '怎么', pinyin: 'zěn me', meaning: 'comment (méthode)', meaningEn: 'how (method)', audio: 'audio/hsk1/hsk1_怎么.wav' },
      { hanzi: '怎么写', pinyin: 'zěn me xiě', meaning: 'comment écrit-on', meaningEn: 'how do you write', audio: 'audio/hsk2/hsk2_写.wav' },
      { hanzi: '怎么做', pinyin: 'zěn me zuò', meaning: 'comment fait-on', meaningEn: 'how do you make', audio: 'audio/hsk1/hsk1_做.wav' },
      { hanzi: '怎么走', pinyin: 'zěn me zǒu', meaning: 'comment y aller', meaningEn: 'how to get there', audio: 'audio/hsk2/hsk2_怎么走.wav' },
      { hanzi: '怎样', pinyin: 'zěn yàng', meaning: 'comment (posé)', meaningEn: 'how (measured)', audio: 'audio/hsk3/hsk3_怎样.wav' },
      { hanzi: '如何', pinyin: 'rú hé', meaning: 'comment (écrit)', meaningEn: 'how (written)', audio: 'audio/hsk4/hsk4_如何.wav' }
    ],
    tip:
      'Demande-toi toujours où irait la réponse. Elle vient avant le verbe → 怎么 aussi.',
    tipEn:
      'Always ask yourself where the answer would go. Answer comes before the verb → so does 怎么.'
  },
  {
    id: 'a2-zenmeyang-evaluation',
    title: '怎么样 : demander une évaluation ou proposer',
    titleEn: '怎么样: asking for an evaluation or proposing',
    body:
      'Structure : [sujet] + 怎么样 ? pour demander un JUGEMENT. Ex : 你最近怎么样 (nǐ zuì jìn zěn me yàng) « comment ça va ces temps-ci ? ». Ex : 昨天的面试怎么样 (zuó tiān de miàn shì zěn me yàng) « il s\'est passé comment, l\'entretien d\'hier ? ».\n' +
      '\n' +
      'Test simple : si la réponse attendue est un adjectif (bien, mal, pas mal, fatigant…), c\'est 怎么样.\n' +
      '\n' +
      'Proposition : après une suggestion, [action]，怎么样 ? = « ça te dit ? ». Ex : 我们先喝咖啡，怎么样 (wǒ men xiān hē kā fēi, zěn me yàng) « on prend un café d\'abord, ça te va ? ». Plus doux qu\'une proposition directe.\n' +
      '\n' +
      '不怎么样 (bù zěn me yàng) = « bof, pas top ». Réponse standard négative sans être blessant. Ex : 这家店的服务不怎么样 (zhè jiā diàn de fú wù bù zěn me yàng) « le service ici est pas top ».\n' +
      '\n' +
      '怎么样了 ? = « comment ça a fini ? » (demande une MAJ). Ex : 面试怎么样了 (miàn shì zěn me yàng le) « l\'entretien, ça a donné quoi ? ». Le 了 indique qu\'un résultat est attendu.\n' +
      '\n' +
      'Verbe + 得 + 怎么样 ? = « à quel point tu... ? ». Ex : 你中文说得怎么样 (nǐ zhōng wén shuō de zěn me yàng) « tu parles chinois à quel niveau ? ».',
    bodyEn:
      'Structure: [subject] + 怎么样? asks for a JUDGMENT. Ex: 你最近怎么样 = «how have you been lately?». Ex: 昨天的面试怎么样 = «how did yesterday\'s interview go?». Simple test: if the expected answer is an adjective (fine, bad, not bad, tiring…), use 怎么样. Proposal: after a suggestion, [action]，怎么样? = «what do you say?». Ex: 我们先喝咖啡，怎么样 = «let\'s grab a coffee first, does that work?». Softer than a direct proposal. 不怎么样 (bù zěn me yàng) = «meh, not great». Standard negative reply without being harsh. Ex: 这家店的服务不怎么样 = «the service here isn\'t great». 怎么样了? = «how did it end up?» (asks for an UPDATE). Ex: 面试怎么样了 = «what came of the interview?». The 了 signals that a result is expected. Verb + 得 + 怎么样? = «how well do you…?». Ex: 你中文说得怎么样 = «how well do you speak Chinese?».',
    items: [
      { hanzi: '怎么样', pinyin: 'zěn me yàng', meaning: 'comment (jugement)', meaningEn: 'how (judgment)', audio: 'audio/hsk1/hsk1_怎么样.wav' },
      { hanzi: '不怎么样', pinyin: 'bù zěn me yàng', meaning: 'pas top, bof', meaningEn: 'not great, meh', audio: 'audio/hsk3/hsk3_不怎么样.wav' },
      { hanzi: '最近', pinyin: 'zuì jìn', meaning: 'ces temps-ci', meaningEn: 'lately', audio: 'audio/hsk3/hsk3_最近.wav' },
      { hanzi: '面试', pinyin: 'miàn shì', meaning: 'entretien d\'embauche', meaningEn: 'job interview', audio: 'audio/hsk4/hsk4_面试.wav' },
      { hanzi: '服务', pinyin: 'fú wù', meaning: 'service', meaningEn: 'service', audio: 'audio/hsk4/hsk4_服务.wav' },
      { hanzi: '咖啡', pinyin: 'kā fēi', meaning: 'café', meaningEn: 'coffee', audio: 'audio/hsk2/hsk2_咖啡.wav' }
    ],
    tip:
      '怎么样 pose une question de qualité ou d\'état ; 怎么 pose une question de méthode. Confondre les deux est l\'erreur la plus fréquente des apprenants.',
    tipEn:
      '怎么样 asks a quality/state question; 怎么 asks a method question. Mixing them up is the most common learner mistake.'
  },
  {
    id: 'a2-shenmeyang-type',
    title: '什么样(的) : demander le type ou les qualités',
    titleEn: '什么样(的): asking about type or qualities',
    body:
      'Structure : 什么样 + 的 + nom ? = « quel genre de X ? ». 什么样的 modifie le nom qui suit.\n' +
      '\n' +
      'Ex : 你想找什么样的男朋友 (nǐ xiǎng zhǎo shén me yàng de nán péng yǒu) « quel genre de copain tu cherches ? ». Attend une description.\n' +
      '\n' +
      'Templates fréquents : 什么样的人 (personnalité), 什么样的东西 (propriétés), 什么样的方法 (procédure).\n' +
      '\n' +
      'Ex : 他是个什么样的人 (tā shì gè shén me yàng de rén) « c\'est quel genre de personne ? » (attend : gentil, ambitieux, tranquille…).\n' +
      '\n' +
      'Variante avec 是...的 : ...是什么样的 ? pour décrire la NATURE d\'une chose abstraite. Ex : 你的工作是什么样的 (nǐ de gōng zuò shì shén me yàng de) « c\'est comment ton boulot ? » (description du contenu, pas jugement).\n' +
      '\n' +
      '哪种 / 哪样 : « lequel parmi X » quand les options sont limitées. Ex : 你喜欢哪种女孩 (nǐ xǐ huan nǎ zhǒng nǚ hái) « t\'aimes lequel des types ? » (implique des catégories connues). Vs 什么样 = ouvert (« décris-moi »).\n' +
      '\n' +
      'Piège classique 什么样 vs 怎么样 : 什么样 = description de type ; 怎么样 = jugement. « 这家店怎么样 » attend « pas mal / cher » ; « 这家店是什么样的 » attend « petit resto de hot pot, très typé ».',
    bodyEn:
      'Structure: 什么样 + 的 + noun? = «what kind of X?». 什么样的 modifies the noun that follows. Ex: 你想找什么样的男朋友 = «what kind of boyfriend are you looking for?». Expects a description. Frequent templates: 什么样的人 (personality), 什么样的东西 (properties), 什么样的方法 (procedure). Ex: 他是个什么样的人 = «what kind of person is he?» (expects: kind, ambitious, quiet…). Variant with 是...的: ...是什么样的? to describe the NATURE of an abstract thing. Ex: 你的工作是什么样的 = «what\'s your job like?» (content description, not judgment). 哪种 / 哪样: «which one among X» when options are limited. Ex: 你喜欢哪种女孩 = «which type do you like?» (implies known categories). Vs 什么样 = open («describe it»). Classic trap 什么样 vs 怎么样: 什么样 = type description; 怎么样 = judgment. «这家店怎么样» expects «not bad / expensive»; «这家店是什么样的» expects «tiny hot pot place, very authentic».',
    items: [
      { hanzi: '什么样', pinyin: 'shén me yàng', meaning: 'quel genre', meaningEn: 'what kind', audio: 'audio/hsk3/hsk3_什么样.wav' },
      { hanzi: '男朋友', pinyin: 'nán péng yǒu', meaning: 'petit ami', meaningEn: 'boyfriend', audio: 'audio/hsk2/hsk2_男朋友.wav' },
      { hanzi: '方法', pinyin: 'fāng fǎ', meaning: 'méthode', meaningEn: 'method', audio: 'audio/hsk4/hsk4_方法.wav' },
      { hanzi: '工作', pinyin: 'gōng zuò', meaning: 'travail', meaningEn: 'work, job', audio: 'audio/hsk1/hsk1_工作.wav' },
      { hanzi: '哪种', pinyin: 'nǎ zhǒng', meaning: 'quel type (parmi)', meaningEn: 'which type (among)', audio: 'audio/hsk3/hsk3_哪种.wav' }
    ],
    tip:
      'Si tu attends une DESCRIPTION → 什么样(的). Si tu attends un JUGEMENT → 怎么样.',
    tipEn:
      'If you expect a DESCRIPTION → 什么样(的). If you expect a JUDGMENT → 怎么样.'
  }
];

// --- cecr-a2-grammar-mw-m1 — Mots de mesure : bases -----------------------
export const a2GrammarMeasureWordsLearnSections: LessonV2LearnSection[] = [
  {
    id: 'a2-mw-basics',
    title: 'Nombre + MW + nom : la structure obligatoire',
    titleEn: 'Number + MW + noun: the mandatory structure',
    body:
      'En chinois, tu ne peux PAS dire directement « 3 livres ». Il faut un CLASSIFICATEUR (mot de mesure) entre le nombre et le nom.\n' +
      '\n' +
      'Structure : [nombre] + [MW] + [nom]. Ex : 我买了三本书 (wǒ mǎi le sān běn shū) « j\'ai acheté 3 livres ». 本 (běn) est le classificateur pour les livres reliés.\n' +
      '\n' +
      'Erreur classique : 三书 ✗ n\'existe pas. Le MW est OBLIGATOIRE.\n' +
      '\n' +
      '个 (ge) est le MW « générique » : marche pour les personnes et beaucoup de concepts abstraits (三个朋友, 一个问题). Mais pour les objets physiques, il vaut mieux le vrai MW (三本书, pas 三个书 qui sonne étranger).\n' +
      '\n' +
      'Structure démonstrative : 这/那 + MW + nom. Ex : 那杯咖啡很苦 (nà bēi kā fēi hěn kǔ) « ce café est amer ». 那咖啡 ✗ ne marche pas.\n' +
      '\n' +
      'Avec quantité et démonstratif : 这/那 + nombre + MW + nom. Ex : 这两位老师很严格 (zhè liǎng wèi lǎo shī hěn yán gé) « ces 2 profs sont sévères ». 位 (wèi) = MW poli pour les personnes.\n' +
      '\n' +
      'MW seul sans nombre = « un » implicite : 我想喝杯咖啡 (wǒ xiǎng hē bēi kā fēi) « j\'aimerais un café ». Très courant à l\'oral détendu (来杯水, 买本书).\n' +
      '\n' +
      'Nom omis quand contexte clair : 你要几个 ? 要三个 (« combien tu en veux ? j\'en veux 3 »). Le nom pommes/objets est sous-entendu.',
    bodyEn:
      'In Chinese, you CANNOT say «3 books» directly. You need a CLASSIFIER (measure word) between the number and the noun. Structure: [number] + [MW] + [noun]. Ex: 我买了三本书 (wǒ mǎi le sān běn shū) «I bought 3 books». 本 (běn) is the classifier for bound books. Classic mistake: 三书 ✗ doesn\'t exist — the MW is MANDATORY. 个 (ge) is the «generic» MW: works for people and many abstract concepts (三个朋友, 一个问题). For physical objects, use the specific MW (三本书 not 三个书, which sounds odd). Demonstrative structure: 这/那 + MW + noun. Ex: 那杯咖啡很苦 «that cup of coffee is bitter». 那咖啡 ✗ doesn\'t work. With quantity and demonstrative: 这/那 + number + MW + noun. Ex: 这两位老师很严格 «these 2 teachers are strict». 位 (wèi) = polite MW for people. MW alone without a number = implicit «one»: 我想喝杯咖啡 «I\'d like a coffee». Very common in relaxed speech (来杯水, 买本书). Noun dropped when context is clear: 你要几个? 要三个 («how many? I want 3»). The noun (apples/objects) is understood.',
    items: [
      { hanzi: '个', pinyin: 'ge', meaning: 'MW générique (personnes, abstrait)', meaningEn: 'generic MW (people, abstract)', audio: 'audio/hsk1/hsk1_个.wav' },
      { hanzi: '本', pinyin: 'běn', meaning: 'MW livres reliés', meaningEn: 'MW bound books', audio: 'audio/hsk1/hsk1_本.wav' },
      { hanzi: '位', pinyin: 'wèi', meaning: 'MW personne (poli)', meaningEn: 'MW person (polite)', audio: 'audio/hsk3/hsk3_位.wav' },
      { hanzi: '朋友', pinyin: 'péng yǒu', meaning: 'ami', meaningEn: 'friend', audio: 'audio/hsk1/hsk1_朋友.wav' },
      { hanzi: '问题', pinyin: 'wèn tí', meaning: 'question, problème', meaningEn: 'question, problem', audio: 'audio/hsk2/hsk2_问题.wav' },
      { hanzi: '咖啡', pinyin: 'kā fēi', meaning: 'café', meaningEn: 'coffee', audio: 'audio/hsk2/hsk2_咖啡.wav' }
    ],
    tip:
      'Quand tu comptes, pointes ou spécifies une INSTANCE, il te faut un MW. Quand tu parles d\'une chose en général comme concept, tu peux omettre le MW (我喜欢咖啡 « j\'aime le café » sans MW).',
    tipEn:
      'When you count, point, or specify an INSTANCE, you need a MW. When you talk about a thing in general as a concept, you can drop the MW (我喜欢咖啡 «I like coffee» — no MW).'
  },
  {
    id: 'a2-mw-liang-ban-na',
    title: '两 vs 二, 半, 哪 : nombres et questions',
    titleEn: '两 vs 二, 半, 哪: numbers and questions',
    body:
      '两 (liǎng) vs 二 (èr) : les 2 signifient « 2 » mais s\'utilisent différemment.\n' +
      '\n' +
      '两 : « 2 » qui COMPTE avec un MW. 两本书, 两个人, 两杯水. C\'est ton défaut au quotidien.\n' +
      '\n' +
      '二 : dans les contextes formels, séquences, ordinaux, dates. Ex : 他住在二楼 (tā zhù zài èr lóu) « il habite au 2e étage ». Aussi dans 第二 (deuxième), 二月 (février), lecture de numéros (téléphone, ID).\n' +
      '\n' +
      '半 (bàn) = « moitié ». 2 positions selon le sens :\n' +
      '\n' +
      '半 + MW + nom = « une demi-... ». Ex : 再等半个小时吧 (zài děng bàn ge xiǎo shí ba) « attends encore une demi-heure ». Half OF one unit.\n' +
      '\n' +
      'Nombre + MW + 半 + nom = « X et demi ». Ex : 我们聊了三个半小时 (wǒmen liáo le sān ge bàn xiǎo shí) « on a discuté 3 h et demie ». X unités + une demi supplémentaire.\n' +
      '\n' +
      'Attention à l\'ordre : 三个半小时 ✓ / 三个小时半 ✗. Le 半 vient JUSTE APRÈS le MW, avant le nom.\n' +
      '\n' +
      '哪 + MW + nom = « quel/lequel » : Ex : 你想买哪本 (nǐ xiǎng mǎi nǎ běn) « lequel tu veux acheter ? ». Le nom peut disparaître quand le contexte est clair.',
    bodyEn:
      '两 (liǎng) vs 二 (èr): both mean «2» but are used differently. 两: «2» that COUNTS with a MW. 两本书, 两个人, 两杯水. This is your everyday default. 二: in formal contexts, sequences, ordinals, dates. Ex: 他住在二楼 «he lives on the 2nd floor». Also in 第二 (second), 二月 (February), reading numbers (phone, ID). 半 (bàn) = «half». 2 positions depending on meaning: 半 + MW + noun = «half a ...». Ex: 再等半个小时吧 «wait another half hour». Half OF one unit. Number + MW + 半 + noun = «X and a half». Ex: 我们聊了三个半小时 «we talked for 3.5 hours». X units + an extra half. Watch the order: 三个半小时 ✓ / 三个小时半 ✗. 半 comes RIGHT AFTER the MW, before the noun. 哪 + MW + noun = «which»: Ex: 你想买哪本 «which one do you want to buy?». The noun can drop when context is clear.',
    items: [
      { hanzi: '两', pinyin: 'liǎng', meaning: '2 (pour compter)', meaningEn: '2 (for counting)', audio: 'audio/hsk2/hsk2_两.wav' },
      { hanzi: '二', pinyin: 'èr', meaning: '2 (ordinal, formel)', meaningEn: '2 (ordinal, formal)', audio: 'audio/hsk1/hsk1_二.wav' },
      { hanzi: '半', pinyin: 'bàn', meaning: 'moitié, demi', meaningEn: 'half', audio: 'audio/hsk3/hsk3_半.wav' },
      { hanzi: '哪', pinyin: 'nǎ', meaning: 'quel, lequel', meaningEn: 'which', audio: 'audio/hsk1/hsk1_哪.wav' },
      { hanzi: '小时', pinyin: 'xiǎo shí', meaning: 'heure', meaningEn: 'hour', audio: 'audio/hsk2/hsk2_小时.wav' },
      { hanzi: '第二', pinyin: 'dì èr', meaning: 'deuxième', meaningEn: 'second', audio: 'audio/hsk2/hsk2_第二.wav' }
    ],
    tip:
      'Dans le doute, 两 pour compter, 二 pour lire ou nommer. Pour le demi, l\'ordre change tout : 半个 = 0.5 unité, 一个半 = 1.5 unité.',
    tipEn:
      'When in doubt, 两 to count, 二 to read or name. For half, order changes everything: 半个 = 0.5 unit, 一个半 = 1.5 unit.'
  },
  {
    id: 'a2-mw-containers-shapes',
    title: 'MW selon la forme et le contenant',
    titleEn: 'MW by shape and container',
    body:
      'Les MW ne servent pas qu\'à compter : ils DÉCRIVENT la forme ou le contenant. Choisir le bon MW rend le chinois vivant.\n' +
      '\n' +
      'CONTENANTS (restauration surtout) :\n' +
      '\n' +
      '杯 (bēi) : tasse, verre. 一杯咖啡, 一杯水.\n' +
      '\n' +
      '碗 (wǎn) : bol. 一碗面 (un bol de nouilles), 一碗汤.\n' +
      '\n' +
      '盘 (pán) : assiette. 一盘菜.\n' +
      '\n' +
      '瓶 (píng) : bouteille. 一瓶酒, 一瓶水.\n' +
      '\n' +
      'Le MW change ton IMAGE : 一杯咖啡 (café servi en tasse) vs 一瓶咖啡 (café en bouteille).\n' +
      '\n' +
      'FORMES :\n' +
      '\n' +
      '块 (kuài) : morceau, bloc. 一块蛋糕 (part de gâteau), 一块肉, 一块肥皂. Aussi pour l\'argent (一块钱 = 1 yuan).\n' +
      '\n' +
      '片 (piàn) : tranche plate et fine. 一片面包, 一片叶子, 一片药 (comprimé).\n' +
      '\n' +
      '条 (tiáo) : long et fin. 一条路, 一条河, 一条鱼, 一条裤子. Ultra polyvalent, aussi pour choses abstraites longues : 一条消息 (message), 一条规定 (règle).\n' +
      '\n' +
      '张 (zhāng) : surface plate. 一张纸, 一张桌子, 一张票, 一张床. Aussi pour les visages : 一张脸.\n' +
      '\n' +
      'PAIRES :\n' +
      '\n' +
      '双 (shuāng) : paire IDENTIQUE, surtout parties du corps et ce qui les couvre. 一双鞋, 一双袜子, 一双手套, 一双筷子, 一双眼睛, 一双手.\n' +
      '\n' +
      '对 (duì) : paire COMPLÉMENTAIRE ou couple. 一对夫妻 (couple marié), 一对耳环 (paire de boucles), 一对花瓶 (vases assortis).',
    bodyEn:
      'MW don\'t just count: they DESCRIBE the shape or container. Picking the right MW makes Chinese come alive. CONTAINERS (restaurant esp.): 杯 (bēi): cup, glass. 一杯咖啡, 一杯水. 碗 (wǎn): bowl. 一碗面 (a bowl of noodles), 一碗汤. 盘 (pán): plate. 一盘菜. 瓶 (píng): bottle. 一瓶酒, 一瓶水. The MW changes your IMAGE: 一杯咖啡 (coffee served in a cup) vs 一瓶咖啡 (coffee in a bottle). SHAPES: 块 (kuài): piece, block. 一块蛋糕 (a slice of cake), 一块肉, 一块肥皂. Also for money (一块钱 = 1 yuan). 片 (piàn): flat, thin slice. 一片面包, 一片叶子, 一片药 (a pill). 条 (tiáo): long and thin. 一条路, 一条河, 一条鱼, 一条裤子. Very versatile, also for abstract long things: 一条消息 (message), 一条规定 (rule). 张 (zhāng): flat surface. 一张纸, 一张桌子, 一张票, 一张床. Also for faces: 一张脸. PAIRS: 双 (shuāng): IDENTICAL pair, mostly body parts and what covers them. 一双鞋, 一双袜子, 一双手套, 一双筷子, 一双眼睛, 一双手. 对 (duì): COMPLEMENTARY pair or couple. 一对夫妻 (married couple), 一对耳环 (pair of earrings), 一对花瓶 (matching vases).',
    items: [
      { hanzi: '杯', pinyin: 'bēi', meaning: 'MW tasse, verre', meaningEn: 'MW cup, glass', audio: 'audio/hsk1/hsk1_杯.wav' },
      { hanzi: '碗', pinyin: 'wǎn', meaning: 'MW bol', meaningEn: 'MW bowl', audio: 'audio/hsk3/hsk3_碗.wav' },
      { hanzi: '瓶', pinyin: 'píng', meaning: 'MW bouteille', meaningEn: 'MW bottle', audio: 'audio/hsk2/hsk2_瓶.wav' },
      { hanzi: '块', pinyin: 'kuài', meaning: 'MW morceau, bloc', meaningEn: 'MW piece, block', audio: 'audio/hsk1/hsk1_块.wav' },
      { hanzi: '片', pinyin: 'piàn', meaning: 'MW tranche fine', meaningEn: 'MW thin slice', audio: 'audio/hsk3/hsk3_片.wav' },
      { hanzi: '条', pinyin: 'tiáo', meaning: 'MW long et fin', meaningEn: 'MW long and thin', audio: 'audio/hsk3/hsk3_条.wav' },
      { hanzi: '张', pinyin: 'zhāng', meaning: 'MW surface plate', meaningEn: 'MW flat surface', audio: 'audio/hsk2/hsk2_张.wav' },
      { hanzi: '双', pinyin: 'shuāng', meaning: 'MW paire identique', meaningEn: 'MW identical pair', audio: 'audio/hsk3/hsk3_双.wav' },
      { hanzi: '对', pinyin: 'duì', meaning: 'MW paire complémentaire', meaningEn: 'MW complementary pair', audio: 'audio/hsk1/hsk1_对.wav' }
    ],
    tip:
      'Quand tu apprends un nouveau nom, note aussi son MW favori. Pense au MW comme à un article français : « un » vs « une » signale déjà la catégorie.',
    tipEn:
      'When you learn a new noun, jot down its favorite MW too. Think of the MW like a French article: «un» vs «une» already signals the category.'
  },
  {
    id: 'a2-mw-collectives',
    title: 'MW collectifs : groupes, tas, séries',
    titleEn: 'Collective MW: groups, piles, sets',
    body:
      'Ces MW décrivent comment les items sont REGROUPÉS.\n' +
      '\n' +
      '群 (qún) : troupeau, foule (personnes ou animaux). 一群人 (une foule), 一群羊 (troupeau de moutons). Ex : 门口站着一群人 (mén kǒu zhàn zhe yì qún rén) « il y a une foule à l\'entrée ».\n' +
      '\n' +
      '堆 (duī) : tas, monceau (objets empilés, souvent en désordre). 一堆书, 一堆衣服, 一堆问题.\n' +
      '\n' +
      '排 (pái) : rangée, ligne ordonnée. 一排椅子, 一排树.\n' +
      '\n' +
      '串 (chuàn) : ensemble accroché ensemble. 一串葡萄 (grappe de raisin), 一串钥匙 (trousseau), 一串烤肉 (brochette).\n' +
      '\n' +
      '套 (tào) : ENSEMBLE complet, kit. Très utile : 一套教材 (jeu de manuels), 一套房子 (appartement = « ensemble de pièces »), 一套西装 (costume complet), 一套方案 (plan complet). Ex : 他买了一套教材 (tā mǎi le yí tào jiào cái) « il a acheté un jeu complet de manuels ».\n' +
      '\n' +
      '组 (zǔ) : groupe, équipe, jeu. Souvent pour data, piles, équipes. 一组数据.\n' +
      '\n' +
      '系列 (xìliè) : série (produits, événements, films).',
    bodyEn:
      'These MW describe how items are GROUPED. 群 (qún): herd, crowd (people or animals). 一群人 (a crowd), 一群羊 (a flock of sheep). Ex: 门口站着一群人 «there\'s a crowd at the entrance». 堆 (duī): heap, pile (stacked objects, often messy). 一堆书, 一堆衣服, 一堆问题. 排 (pái): row, orderly line. 一排椅子, 一排树. 串 (chuàn): items strung together. 一串葡萄 (bunch of grapes), 一串钥匙 (bunch of keys), 一串烤肉 (skewer). 套 (tào): complete SET, kit. Very useful: 一套教材 (set of textbooks), 一套房子 (apartment = «set of rooms»), 一套西装 (full suit), 一套方案 (full plan). Ex: 他买了一套教材 «he bought a full set of textbooks». 组 (zǔ): group, team, set. Often for data, batches, teams. 一组数据. 系列 (xìliè): series (products, events, films).',
    items: [
      { hanzi: '群', pinyin: 'qún', meaning: 'MW foule, troupeau', meaningEn: 'MW crowd, herd', audio: 'audio/hsk4/hsk4_群.wav' },
      { hanzi: '堆', pinyin: 'duī', meaning: 'MW tas, monceau', meaningEn: 'MW heap, pile', audio: 'audio/hsk5/hsk5_堆.wav' },
      { hanzi: '排', pinyin: 'pái', meaning: 'MW rangée', meaningEn: 'MW row', audio: 'audio/hsk4/hsk4_排.wav' },
      { hanzi: '串', pinyin: 'chuàn', meaning: 'MW ensemble accroché', meaningEn: 'MW string, cluster', audio: 'audio/hsk5/hsk5_串.wav' },
      { hanzi: '套', pinyin: 'tào', meaning: 'MW ensemble complet, kit', meaningEn: 'MW full set, kit', audio: 'audio/hsk4/hsk4_套.wav' },
      { hanzi: '组', pinyin: 'zǔ', meaning: 'MW groupe, équipe', meaningEn: 'MW group, team', audio: 'audio/hsk4/hsk4_组.wav' },
      { hanzi: '教材', pinyin: 'jiào cái', meaning: 'manuel scolaire', meaningEn: 'textbook', audio: 'audio/hsk5/hsk5_教材.wav' },
      { hanzi: '葡萄', pinyin: 'pú tao', meaning: 'raisin', meaningEn: 'grapes', audio: 'audio/hsk4/hsk4_葡萄.wav' }
    ],
    tip:
      'Le MW collectif AJOUTE de l\'info. 一串钥匙 = clés sur un anneau. 一堆书 = livres empilés (souvent en pagaille). L\'image change.',
    tipEn:
      'Collective MW ADD information. 一串钥匙 = keys on a ring. 一堆书 = stacked books (often messy). The image shifts.'
  }
];

// --- cecr-a2-nuances-m10 — Erreurs courantes des débutants ------------------
export const a2NuancesCommonMistakesLearnSections: LessonV2LearnSection[] = [
  {
    id: 'a2-mistakes-shi-with-adjectives',
    title: 'Ne PAS mettre 是 devant un adjectif',
    titleEn: 'Do NOT put 是 before an adjective',
    body:
      'En français on dit « il EST fatigué ». En chinois, on ne met PAS 是 devant un adjectif. Les adjectifs chinois fonctionnent comme des verbes d\'état.\n' +
      '\n' +
      'Erreur classique : 今天是冷 ✗ « aujourd\'hui il est froid ».\n' +
      '\n' +
      'Correct : 今天很冷 (jīn tiān hěn lěng) « aujourd\'hui il fait froid ». Le 很 sert de tampon pour que la phrase coule, il ne signifie pas forcément « très ».\n' +
      '\n' +
      'Autre exemple : 我很忙 (wǒ hěn máng) « je suis occupé », PAS 我是忙 ✗.\n' +
      '\n' +
      '很 peut être omis quand un autre adverbe est là : 我不忙 (« je ne suis pas occupé »), 我太累了 (« je suis trop fatigué »).\n' +
      '\n' +
      'Structure : sujet + (很 / 太 / 不…) + adjectif. Pas de 是.\n' +
      '\n' +
      'Exception : le pattern 是...的 sert à insister (« c\'est... qui »), mais c\'est une autre structure spécifique.',
    bodyEn:
      'In French we say «he IS tired». In Chinese, do NOT put 是 before an adjective. Chinese adjectives work like stative verbs. Classic mistake: 今天是冷 ✗ «today is cold». Correct: 今天很冷 (jīn tiān hěn lěng) «it\'s cold today». 很 is a buffer so the sentence flows, it does not necessarily mean «very». Another example: 我很忙 (wǒ hěn máng) «I\'m busy», NOT 我是忙 ✗. 很 can be dropped when another adverb is present: 我不忙 («I\'m not busy»), 我太累了 («I\'m too tired»). Structure: subject + (很 / 太 / 不…) + adjective. No 是. Exception: the 是...的 pattern emphasizes («it\'s… that»), but that\'s a different specific structure.',
    items: [
      { hanzi: '很', pinyin: 'hěn', meaning: 'très, tampon devant adjectif', meaningEn: 'very, buffer before adjective', audio: 'audio/hsk1/hsk1_很.wav' },
      { hanzi: '冷', pinyin: 'lěng', meaning: 'froid', meaningEn: 'cold', audio: 'audio/hsk1/hsk1_冷.wav' },
      { hanzi: '忙', pinyin: 'máng', meaning: 'occupé, affairé', meaningEn: 'busy', audio: 'audio/hsk2/hsk2_忙.wav' },
      { hanzi: '累', pinyin: 'lèi', meaning: 'fatigué', meaningEn: 'tired', audio: 'audio/hsk2/hsk2_累.wav' },
      { hanzi: '太', pinyin: 'tài', meaning: 'trop', meaningEn: 'too, overly', audio: 'audio/hsk1/hsk1_太.wav' },
      { hanzi: '不', pinyin: 'bù', meaning: 'ne pas', meaningEn: 'not', audio: 'audio/hsk1/hsk1_不.wav' }
    ],
    tip:
      'Chaque fois que tu veux dire « je suis + adjectif », arrête-toi et remplace 是 par 很. Le réflexe est difficile à installer mais c\'est un des marqueurs les plus visibles d\'un chinois naturel.',
    tipEn:
      'Every time you want to say «I am + adjective», stop and swap 是 for 很. The reflex is hard to build but it\'s one of the most visible markers of natural Chinese.'
  },
  {
    id: 'a2-mistakes-you-vs-shi',
    title: '有 vs 是 : possession/existence vs identification',
    titleEn: '有 vs 是: possession/existence vs identification',
    body:
      '是 (shì) et 有 (yǒu) ne se recoupent PAS. L\'un identifie, l\'autre situe.\n' +
      '\n' +
      '是 = « être = » : identifier ou définir. Structure A 是 B.\n' +
      '\n' +
      'Ex : 他是学生 (tā shì xué shēng) « il est étudiant » (identification). Ex : 这是我的书 (zhè shì wǒ de shū) « c\'est mon livre ».\n' +
      '\n' +
      '有 = « il y a / posséder » : existence ou possession.\n' +
      '\n' +
      'Ex de possession : 我有一只猫 (wǒ yǒu yì zhī māo) « j\'ai un chat ». Ex : 我家有三只猫 (wǒ jiā yǒu sān zhī māo) « il y a 3 chats chez moi ».\n' +
      '\n' +
      'Ex d\'existence : 桌子上有一本书 (zhuō zi shàng yǒu yì běn shū) « il y a un livre sur la table ».\n' +
      '\n' +
      'Erreur classique : 这里是很多人 ✗ (calque de « here is many people »). Correct : 这里有很多人 (zhè lǐ yǒu hěn duō rén) « il y a beaucoup de monde ici ».\n' +
      '\n' +
      'Bonus : pour dire OÙ une chose se trouve, on utilise 在 (zài). Ex : 东西在桌子上 (dōng xi zài zhuō zi shàng) « les affaires SONT sur la table ». C\'est un 3e pattern, distinct de 是 et 有.',
    bodyEn:
      '是 (shì) and 有 (yǒu) do NOT overlap. One identifies, the other locates. 是 = «to be =»: identify or define. Structure A 是 B. Ex: 他是学生 «he is a student» (identification). Ex: 这是我的书 «this is my book». 有 = «there is / to have»: existence or possession. Possession ex: 我有一只猫 «I have a cat». Ex: 我家有三只猫 «there are 3 cats at my place». Existence ex: 桌子上有一本书 «there\'s a book on the table». Classic mistake: 这里是很多人 ✗ (calque of «here is many people»). Correct: 这里有很多人 «there are lots of people here». Bonus: to say WHERE a thing is located, use 在 (zài). Ex: 东西在桌子上 «the stuff IS on the table». That\'s a 3rd pattern, distinct from 是 and 有.',
    items: [
      { hanzi: '是', pinyin: 'shì', meaning: 'être (identification A = B)', meaningEn: 'to be (identification A = B)', audio: 'audio/hsk1/hsk1_是.wav' },
      { hanzi: '有', pinyin: 'yǒu', meaning: 'avoir, il y a', meaningEn: 'to have, there is', audio: 'audio/hsk1/hsk1_有.wav' },
      { hanzi: '在', pinyin: 'zài', meaning: 'se trouver à, être à', meaningEn: 'to be located at', audio: 'audio/hsk1/hsk1_在.wav' },
      { hanzi: '学生', pinyin: 'xué shēng', meaning: 'étudiant, élève', meaningEn: 'student', audio: 'audio/hsk1/hsk1_学生.wav' },
      { hanzi: '猫', pinyin: 'māo', meaning: 'chat', meaningEn: 'cat', audio: 'audio/hsk1/hsk1_猫.wav' },
      { hanzi: '桌子', pinyin: 'zhuō zi', meaning: 'table', meaningEn: 'table', audio: 'audio/hsk1/hsk1_桌子.wav' }
    ],
    tip:
      'Test rapide en français : si tu peux dire « il y a » ou « avoir », c\'est 有. Si tu peux dire « est/sont = équivalent », c\'est 是. Si tu peux dire « se trouve à », c\'est 在.',
    tipEn:
      'Quick French test: if you can say «there is» or «to have», use 有. If you can say «is/are = equivalent», use 是. If you can say «is located at», use 在.'
  },
  {
    id: 'a2-mistakes-age-and-yes-answers',
    title: 'L\'âge sans 是 + répondre par écho au lieu de « oui »',
    titleEn: 'Age without 是 + answering by echo instead of «yes»',
    body:
      'L\'ÂGE : en chinois, on ne dit PAS d\'équivalent de « avoir » ou « être » pour l\'âge. On DONNE le nombre + 岁.\n' +
      '\n' +
      'Erreur : 我是三十岁 ✗ « je suis 30 ans ». Correct : 我三十岁 (wǒ sān shí suì) « j\'ai 30 ans ». Juste sujet + nombre + 岁.\n' +
      '\n' +
      'Formel/littéraire : 我今年有三十岁 accepté mais moins courant. Le naturel c\'est SANS verbe.\n' +
      '\n' +
      'Pour demander : 你多大 ? (informel), 您今年多大岁数 ? (poli aux aînés). Jamais 你是几岁 ✗.\n' +
      '\n' +
      'RÉPONDRE PAR ÉCHO : le chinois n\'a pas un « oui » universel comme en français.\n' +
      '\n' +
      'Le pattern natif : on REPREND le verbe ou l\'adjectif de la question.\n' +
      '\n' +
      'Ex : « 你喜欢中国菜吗 ? » (nǐ xǐ huan zhōng guó cài ma) « tu aimes la cuisine chinoise ? » → réponse naturelle : 喜欢 (xǐ huan) « oui, j\'aime ». PAS 对 (correct) ni 是的 (« oui ») en réponse spontanée.\n' +
      '\n' +
      'Ex : « 你累吗 ? » → 累 (« oui je suis fatigué ») ou 有点累 (« un peu ») ou 不累 (« non »).\n' +
      '\n' +
      'Pour NIER : 不 + verbe/adj. Ex : 不喜欢, 不累, 不去.\n' +
      '\n' +
      '对 (duì) = « c\'est ça / correct ». S\'utilise pour confirmer un ÉNONCÉ, pas pour répondre à un verbe.\n' +
      '\n' +
      '是的 (shì de) = « oui » poli/formel. OK dans un email pro, moins naturel à l\'oral décontracté.',
    bodyEn:
      'AGE: in Chinese, do NOT use an equivalent of «to have» or «to be» for age. You GIVE the number + 岁. Mistake: 我是三十岁 ✗ «I am 30 years». Correct: 我三十岁 (wǒ sān shí suì) «I\'m 30». Just subject + number + 岁. Formal/literary: 我今年有三十岁 accepted but less common. Natural = NO verb. To ask: 你多大? (casual), 您今年多大岁数? (polite to elders). Never 你是几岁 ✗. ANSWERING BY ECHO: Chinese doesn\'t have a universal «yes» like French. The native pattern: REPEAT the verb or adjective from the question. Ex: «你喜欢中国菜吗?» «do you like Chinese food?» → natural reply: 喜欢 (xǐ huan) «yes, I like it». NOT 对 (correct) or 是的 («yes») as a spontaneous reply. Ex: «你累吗?» → 累 («yes I\'m tired») or 有点累 («a bit») or 不累 («no»). To negate: 不 + verb/adj. Ex: 不喜欢, 不累, 不去. 对 (duì) = «that\'s right / correct». Used to confirm a STATEMENT, not to reply to a verb. 是的 (shì de) = polite/formal «yes». Fine in a work email, less natural in casual speech.',
    items: [
      { hanzi: '岁', pinyin: 'suì', meaning: 'ans (âge)', meaningEn: 'years old', audio: 'audio/hsk1/hsk1_岁.wav' },
      { hanzi: '多大', pinyin: 'duō dà', meaning: 'quel âge', meaningEn: 'how old', audio: 'audio/hsk1/hsk1_多大.wav' },
      { hanzi: '喜欢', pinyin: 'xǐ huan', meaning: 'aimer', meaningEn: 'to like', audio: 'audio/hsk1/hsk1_喜欢.wav' },
      { hanzi: '对', pinyin: 'duì', meaning: 'correct, c\'est ça', meaningEn: 'right, correct', audio: 'audio/hsk1/hsk1_对.wav' },
      { hanzi: '是的', pinyin: 'shì de', meaning: 'oui (poli/formel)', meaningEn: 'yes (polite/formal)', audio: 'audio/hsk1/hsk1_是.wav' },
      { hanzi: '不', pinyin: 'bù', meaning: 'ne pas (négation)', meaningEn: 'not (negation)', audio: 'audio/hsk1/hsk1_不.wav' }
    ],
    tip:
      'Entends la question comme un miroir. La réponse porte le même verbe que la question. Ça évite aussi les pièges des questions négatives.',
    tipEn:
      'Hear the question as a mirror. The answer carries the same verb as the question. It also avoids the pitfalls of negative questions.'
  },
  {
    id: 'a2-mistakes-a-not-a-word-order',
    title: 'Répondre aux questions A-不-A + ordre TEMPS/LIEU',
    titleEn: 'Answering A-not-A questions + TIME/PLACE word order',
    body:
      'QUESTIONS A-不-A : forme oui/non typique en chinois. Verbe/adj + 不 + Verbe/adj + ? Ex : 你去不去 (nǐ qù bu qù) « tu y vas ou pas ? ». Ex : 忙不忙 (busy or not), 有没有 (avoir ou pas).\n' +
      '\n' +
      'La question TE DONNE les mots de réponse. Réponds simplement 去 (oui) ou 不去 (non). PAS 对/是.\n' +
      '\n' +
      'Ex : « 妈妈问我忙不忙 » → 我回答说不忙 (wǒ huí dá shuō bù máng) « j\'ai répondu que je n\'étais pas occupé ».\n' +
      '\n' +
      'ORDRE DES MOTS TEMPS/LIEU : plus rigide qu\'en français. La règle générale :\n' +
      '\n' +
      'Sujet + TEMPS + LIEU + VERBE + OBJET\n' +
      '\n' +
      'Ex : 我明天去北京 (wǒ míng tiān qù běi jīng) « je vais à Pékin demain ». Le TEMPS 明天 vient JUSTE APRÈS le sujet, PAS à la fin. Erreur classique : 我去北京明天 ✗.\n' +
      '\n' +
      'Ex de lieu avant verbe : 我在家吃饭 (wǒ zài jiā chī fàn) « je mange à la maison ». PAS 我吃饭在家 ✗. Le lieu 在家 (à la maison) vient AVANT le verbe.\n' +
      '\n' +
      'Si plusieurs éléments de temps : du plus général au plus précis (année → mois → jour → heure).\n' +
      '\n' +
      'POSITION DE 也 (aussi) : entre sujet et verbe. Ex : 我也是学生 (wǒ yě shì xué shēng) « je suis aussi étudiant ». PAS 我是也学生 ✗. Idem pour 都 et autres adverbes courts.',
    bodyEn:
      'A-不-A QUESTIONS: classic Chinese yes/no form. Verb/adj + 不 + Verb/adj + ? Ex: 你去不去 (nǐ qù bu qù) «are you going or not?». Ex: 忙不忙 (busy or not), 有没有 (have or not). The question GIVES you the answer words. Just reply 去 (yes) or 不去 (no). NOT 对/是. Ex: «妈妈问我忙不忙» → 我回答说不忙 (wǒ huí dá shuō bù máng) «I replied that I wasn\'t busy». TIME/PLACE WORD ORDER: more rigid than in French. General rule: Subject + TIME + PLACE + VERB + OBJECT. Ex: 我明天去北京 (wǒ míng tiān qù běi jīng) «I\'m going to Beijing tomorrow». TIME 明天 comes RIGHT AFTER the subject, NOT at the end. Classic mistake: 我去北京明天 ✗. Place-before-verb ex: 我在家吃饭 (wǒ zài jiā chī fàn) «I eat at home». NOT 我吃饭在家 ✗. The place 在家 (at home) comes BEFORE the verb. If several time elements: from broadest to most specific (year → month → day → hour). POSITION OF 也 (also): between subject and verb. Ex: 我也是学生 (wǒ yě shì xué shēng) «I\'m also a student». NOT 我是也学生 ✗. Same for 都 and other short adverbs.',
    items: [
      { hanzi: '去', pinyin: 'qù', meaning: 'aller, y aller', meaningEn: 'to go', audio: 'audio/hsk1/hsk1_去.wav' },
      { hanzi: '明天', pinyin: 'míng tiān', meaning: 'demain', meaningEn: 'tomorrow', audio: 'audio/hsk1/hsk1_明天.wav' },
      { hanzi: '北京', pinyin: 'běi jīng', meaning: 'Pékin', meaningEn: 'Beijing', audio: 'audio/hsk1/hsk1_北京.wav' },
      { hanzi: '在家', pinyin: 'zài jiā', meaning: 'à la maison', meaningEn: 'at home', audio: 'audio/hsk1/hsk1_家.wav' },
      { hanzi: '吃饭', pinyin: 'chī fàn', meaning: 'manger, prendre un repas', meaningEn: 'to eat, have a meal', audio: 'audio/hsk1/hsk1_吃饭.wav' },
      { hanzi: '也', pinyin: 'yě', meaning: 'aussi', meaningEn: 'also, too', audio: 'audio/hsk1/hsk1_也.wav' },
      { hanzi: '都', pinyin: 'dōu', meaning: 'tous, tou(te)s', meaningEn: 'all', audio: 'audio/hsk1/hsk1_都.wav' }
    ],
    tip:
      'Quand tu construis une phrase, pense « QUAND + OÙ + QUOI ». Le temps et le lieu se placent AVANT l\'action, pas après. C\'est l\'inverse du français « je vais à Pékin demain ».',
    tipEn:
      'When you build a sentence, think «WHEN + WHERE + WHAT». Time and place come BEFORE the action, not after. It\'s the opposite of the French «I\'m going to Beijing tomorrow».'
  },
  {
    id: 'a2-mistakes-yinwei-suoyi-and-le',
    title: '因为...所以 (flexibilité) + 了 (ne pas doubler, pas avec 没)',
    titleEn: '因为...所以 (flexibility) + 了 (don\'t double, don\'t use with 没)',
    body:
      '因为...所以... = « parce que... donc... ». Les manuels imposent le duo, mais en pratique, on peut ne garder QU\'UN des deux.\n' +
      '\n' +
      'Ex complet : 因为下雨，所以我们不去公园 (yīn wèi xià yǔ, suǒ yǐ wǒmen bú qù gōng yuán) « comme il pleut, on n\'ira pas au parc ».\n' +
      '\n' +
      'Ex sans 所以 : 因为我很忙，我不去了 (yīn wèi wǒ hěn máng, wǒ bú qù le) « je suis très occupé, du coup je n\'y vais pas ». Naturel et fluide.\n' +
      '\n' +
      'Ex sans 因为 : 我很忙，所以不去了 (wǒ hěn máng, suǒ yǐ bú qù le) « je suis très occupé, donc je n\'y vais pas ».\n' +
      '\n' +
      'Utiliser les 2 rend la phrase un peu scolaire, comme si tu récites un manuel. À l\'oral, garde-en un seul.\n' +
      '\n' +
      '了 : deux erreurs très fréquentes.\n' +
      '\n' +
      '1) Ne PAS mettre 了 avec 没 pour nier une action passée. Le 没 signifie déjà « n\'a pas eu lieu », donc 了 (« a eu lieu ») est contradictoire. Erreur : 昨天我没去公园了 ✗. Correct : 昨天我没去公园 (zuó tiān wǒ méi qù gōng yuán) « hier je ne suis pas allé au parc ».\n' +
      '\n' +
      '2) Ne PAS doubler 了 dans la même clause. Un seul 了 suffit. Erreur : 我昨天去了北京了 ✗ (deux 了). Correct : soit 我昨天去了北京 (accent sur l\'action accomplie), soit 昨天我去北京了 (accent sur le changement de situation).\n' +
      '\n' +
      'Rappel : 了 n\'est PAS un marqueur du passé. Il marque un ACCOMPLISSEMENT ou un CHANGEMENT D\'ÉTAT. Toutes les phrases au passé n\'ont pas besoin de 了.',
    bodyEn:
      '因为...所以... = «because... so...». Textbooks push the duo, but in practice, you can keep just ONE of the two. Full ex: 因为下雨，所以我们不去公园 (yīn wèi xià yǔ, suǒ yǐ wǒmen bú qù gōng yuán) «since it\'s raining, we won\'t go to the park». Without 所以: 因为我很忙，我不去了 (yīn wèi wǒ hěn máng, wǒ bú qù le) «I\'m really busy, so I\'m not going». Natural and fluid. Without 因为: 我很忙，所以不去了 (wǒ hěn máng, suǒ yǐ bú qù le) «I\'m really busy, so I\'m not going». Using both makes the sentence slightly bookish, as if you were reciting a textbook. In speech, keep just one. 了: two very common mistakes. 1) Do NOT put 了 with 没 to negate a past action. 没 already means «didn\'t happen», so 了 («did happen») contradicts it. Mistake: 昨天我没去公园了 ✗. Correct: 昨天我没去公园 «yesterday I didn\'t go to the park». 2) Do NOT double 了 in the same clause. One 了 is enough. Mistake: 我昨天去了北京了 ✗ (two 了). Correct: either 我昨天去了北京 (focus on the completed action) or 昨天我去北京了 (focus on the change of situation). Reminder: 了 is NOT a past-tense marker. It marks COMPLETION or CHANGE OF STATE. Not every past-tense sentence needs 了.',
    items: [
      { hanzi: '因为', pinyin: 'yīn wèi', meaning: 'parce que', meaningEn: 'because', audio: 'audio/hsk2/hsk2_因为.wav' },
      { hanzi: '所以', pinyin: 'suǒ yǐ', meaning: 'donc, alors', meaningEn: 'so, therefore', audio: 'audio/hsk2/hsk2_所以.wav' },
      { hanzi: '了', pinyin: 'le', meaning: 'particule d\'accomplissement / changement d\'état', meaningEn: 'completion / change-of-state particle', audio: 'audio/hsk1/hsk1_了.wav' },
      { hanzi: '没', pinyin: 'méi', meaning: 'ne pas (au passé)', meaningEn: 'not (past)', audio: 'audio/hsk1/hsk1_没.wav' },
      { hanzi: '下雨', pinyin: 'xià yǔ', meaning: 'pleuvoir', meaningEn: 'to rain', audio: 'audio/hsk1/hsk1_下雨.wav' },
      { hanzi: '公园', pinyin: 'gōng yuán', meaning: 'parc', meaningEn: 'park', audio: 'audio/hsk3/hsk3_公园.wav' },
      { hanzi: '昨天', pinyin: 'zuó tiān', meaning: 'hier', meaningEn: 'yesterday', audio: 'audio/hsk1/hsk1_昨天.wav' }
    ],
    tip:
      'À chaque phrase avec 没, vérifie qu\'il n\'y a AUCUN 了 dans le même segment. À chaque phrase avec plusieurs 了, retire-en un — presque toujours ça sonnera mieux.',
    tipEn:
      'For every sentence with 没, check there is NO 了 in the same segment. For every sentence with several 了, drop one — it will almost always sound better.'
  }
];

// ═════════════════════════════════════════════════════════════════════════════
// Nuances A2 — 差不多 & 快要...了 : dire « presque »
// (cecr-a2-nuances-m11)
// ═════════════════════════════════════════════════════════════════════════════

export const a2NuancesAlmostBasicsLearnSections: LessonV2LearnSection[] = [
  {
    id: 'a2-almost-chabuduo',
    title: '差不多 : le « presque » polyvalent',
    titleEn: '差不多: the versatile «almost»',
    body:
      '差不多 (chà bù duō) littéralement « peu de différence ». C\'est le « presque » le plus versatile et le plus utilisé du quotidien.\n' +
      '\n' +
      '3 usages principaux :\n' +
      '\n' +
      '1) Deux choses ~similaires : 这两个差不多大 (zhè liǎng ge chà bù duō dà) « ces 2 font à peu près la même taille ».\n' +
      '\n' +
      '2) Presque fini / presque prêt : 我的作业差不多写完了 (wǒ de zuò yè chà bù duō xiě wán le) « mon devoir est presque fini ».\n' +
      '\n' +
      '3) Réponse SEULE : « 你好了吗 ? » « 差不多了 » « ça y est ? / — presque, oui ». Très courant à l\'oral.\n' +
      '\n' +
      'Registre : décontracté, chaleureux. Idéal en famille, entre amis, au marché.\n' +
      '\n' +
      'Avec les NOMBRES aussi : 差不多五十个人来了 (« environ 50 personnes sont venues », estimation grossière). Pour être PRÉCIS avec un nombre, préfère 将近 (B1).\n' +
      '\n' +
      'Attention : ne le confonds pas avec 差不多的 (« l\'à-peu-près », négatif : décrit quelque chose de médiocre) — c\'est un autre sens.',
    bodyEn:
      '差不多 (chà bù duō) literally means «little difference». It is the most versatile and most-used «almost» in daily life. 3 main uses: (1) Two ~similar things: 这两个差不多大 (zhè liǎng ge chà bù duō dà) «these 2 are roughly the same size». (2) Almost finished / almost ready: 我的作业差不多写完了 (wǒ de zuò yè chà bù duō xiě wán le) «my homework is almost done». (3) STANDALONE answer: «你好了吗?» «差不多了» «all set? — almost, yes». Very common in speech. Register: casual, warm. Perfect with family, friends, at the market. Also with NUMBERS: 差不多五十个人来了 («about 50 people came», loose estimate). For PRECISE numeric approximation, prefer 将近 (B1). Careful: don\'t confuse it with 差不多的 («mediocre», negative: describes something so-so) — different meaning.',
    items: [
      { hanzi: '差不多', pinyin: 'chà bù duō', meaning: 'presque, à peu près', meaningEn: 'almost, roughly', audio: 'audio/hsk4/hsk4_差不多.wav' },
      { hanzi: '差不多了', pinyin: 'chà bù duō le', meaning: 'presque prêt / presque fini', meaningEn: 'almost ready / almost done', audio: 'audio/hsk4/hsk4_差不多.wav' },
      { hanzi: '大', pinyin: 'dà', meaning: 'grand', meaningEn: 'big', audio: 'audio/hsk1/hsk1_大.wav' },
      { hanzi: '作业', pinyin: 'zuò yè', meaning: 'devoirs', meaningEn: 'homework', audio: 'audio/hsk3/hsk3_作业.wav' },
      { hanzi: '写完', pinyin: 'xiě wán', meaning: 'finir d\'écrire', meaningEn: 'finish writing', audio: 'audio/hsk2/hsk2_写.wav' },
      { hanzi: '好了', pinyin: 'hǎo le', meaning: 'c\'est bon / prêt', meaningEn: 'ready / done', audio: 'audio/hsk1/hsk1_好.wav' }
    ],
    tip:
      'Quand tu doutes du bon « presque » à utiliser à l\'oral, 差不多 marche 90 % du temps. C\'est ton défaut le plus sûr.',
    tipEn:
      'When in doubt about which «almost» to use in speech, 差不多 works 90% of the time. It\'s your safest default.'
  },
  {
    id: 'a2-almost-kuaiyao',
    title: '快要...了 : « ça va bientôt se passer »',
    titleEn: '快要...了: «it\'s about to happen»',
    body:
      'Structure : sujet + 快要 + verbe + 了. Signale qu\'un événement est IMMINENT (« sur le point de », « d\'une seconde à l\'autre »).\n' +
      '\n' +
      'Le 了 en fin de phrase marque le changement d\'état à venir.\n' +
      '\n' +
      'Ex : 我们快要到家了 (wǒmen kuài yào dào jiā le) « on va bientôt être chez nous ».\n' +
      '\n' +
      'Ex : 电影快要开始了 (diàn yǐng kuài yào kāi shǐ le) « le film va bientôt commencer ». Typique des annonces au cinéma.\n' +
      '\n' +
      'Formes raccourcies à l\'oral : 快...了 (encore plus court) ou 要...了 (juste 要 sans 快).\n' +
      '\n' +
      '- 快到了 (kuài dào le) « on y est bientôt ».\n' +
      '- 要下雨了 (yào xià yǔ le) « il va pleuvoir ».\n' +
      '\n' +
      '就要...了 (jiù yào ... le) : quasi-synonyme, avec une nuance de « à un moment PRÉCIS attendu ». Ex : 火车就要开了 (huǒ chē jiù yào kāi le) « le train est sur le point de partir » (à l\'horaire annoncé).\n' +
      '\n' +
      'Registres formels : 将要 (jiāng yào) et 即将 (jí jiāng) pour les annonces officielles. Ex : 会议即将开始 (huì yì jí jiāng kāi shǐ) « la réunion va commencer ». Sonne comme un haut-parleur d\'aéroport. À l\'oral tous les jours, garde 快要...了.',
    bodyEn:
      'Structure: subject + 快要 + verb + 了. Signals an IMMINENT event («about to», «any second now»). The sentence-final 了 marks the upcoming change of state. Ex: 我们快要到家了 (wǒmen kuài yào dào jiā le) «we\'ll be home soon». Ex: 电影快要开始了 (diàn yǐng kuài yào kāi shǐ le) «the movie is about to start». Typical of cinema announcements. Shortened forms in speech: 快...了 (even shorter) or 要...了 (just 要 without 快). 快到了 (kuài dào le) «almost there». 要下雨了 (yào xià yǔ le) «it\'s going to rain». 就要...了 (jiù yào ... le): near-synonym with a nuance of «at a SPECIFIC expected time». Ex: 火车就要开了 (huǒ chē jiù yào kāi le) «the train is about to leave» (at its scheduled time). Formal registers: 将要 (jiāng yào) and 即将 (jí jiāng) for official announcements. Ex: 会议即将开始 (huì yì jí jiāng kāi shǐ) «the meeting is about to begin». Sounds like an airport PA. For daily speech, stick with 快要...了.',
    items: [
      { hanzi: '快要', pinyin: 'kuài yào', meaning: 'sur le point de, bientôt', meaningEn: 'about to, soon', audio: 'audio/hsk2/hsk2_快.wav' },
      { hanzi: '就要', pinyin: 'jiù yào', meaning: 'sur le point de (moment précis)', meaningEn: 'about to (specific moment)', audio: 'audio/hsk2/hsk2_就.wav' },
      { hanzi: '到家', pinyin: 'dào jiā', meaning: 'arriver à la maison', meaningEn: 'get home', audio: 'audio/hsk2/hsk2_到.wav' },
      { hanzi: '开始', pinyin: 'kāi shǐ', meaning: 'commencer', meaningEn: 'to begin', audio: 'audio/hsk2/hsk2_开始.wav' },
      { hanzi: '下雨', pinyin: 'xià yǔ', meaning: 'pleuvoir', meaningEn: 'to rain', audio: 'audio/hsk1/hsk1_下雨.wav' },
      { hanzi: '即将', pinyin: 'jí jiāng', meaning: 'sur le point de (formel)', meaningEn: 'about to (formal)', audio: 'audio/hsk5/hsk5_即将.wav' },
      { hanzi: '了', pinyin: 'le', meaning: 'particule de changement d\'état', meaningEn: 'change-of-state particle', audio: 'audio/hsk1/hsk1_了.wav' }
    ],
    tip:
      'Le 了 final est essentiel — sans lui, la structure ne fonctionne pas. Pense à 快要 comme « ça arrive, tiens-toi prêt ».',
    tipEn:
      'The final 了 is essential — without it, the structure doesn\'t work. Think of 快要 as «it\'s coming, get ready».'
  }
];

// ═════════════════════════════════════════════════════════════════════════════
// Grammaire A2 — Modaux d'obligation + compléments directionnels de base
// (cecr-a2-grammar-m6)
// ═════════════════════════════════════════════════════════════════════════════

export const a2GrammarModalsDirectionLearnSections: LessonV2LearnSection[] = [
  {
    id: 'a2-grammar-modals-obligation',
    title: 'Modaux d\'obligation : 应该, 得, 必须, 一定要',
    titleEn: 'Obligation modals: 应该, 得, 必须, 一定要',
    body:
      'Le chinois offre plusieurs modaux pour marquer l\'obligation ou le conseil, du plus doux au plus ferme.\n' +
      '\n' +
      '应该 (yīng gāi) = « devrait / il faudrait » — obligation MORALE ou conseil. Neutre.\n' +
      '- Structure : sujet + 应该 + verbe. Ex : 你应该多喝水 (nǐ yīng gāi duō hē shuǐ) « tu devrais boire plus d\'eau ».\n' +
      '- Négation : 不应该. Ex : 你不应该迟到 (« tu ne devrais pas être en retard »).\n' +
      '\n' +
      '得 (děi, PAS de) = « il faut / je dois » — nécessité PRATIQUE, oral. Attention : se lit « děi » pas « de » quand c\'est le modal.\n' +
      '- Ex : 我得走了 (wǒ děi zǒu le) « il faut que j\'y aille ». Très oral, très courant.\n' +
      '- Négation : on n\'utilise PAS 不得, on utilise 不用 (bú yòng) « pas besoin ». Ex : 你不用去 (nǐ bú yòng qù) « pas besoin d\'y aller ».\n' +
      '\n' +
      '必须 (bì xū) = « OBLIGATOIRE, il faut absolument » — le plus ferme. Registre formel ou insistant.\n' +
      '- Ex : 学生必须交作业 (xué shēng bì xū jiāo zuò yè) « les élèves DOIVENT rendre les devoirs ».\n' +
      '- Négation : 不必 (bú bì) « pas nécessaire ».\n' +
      '\n' +
      '一定要 (yí dìng yào) = « il FAUT absolument » — insistance émotionnelle, souvent avec enthousiasme ou souci.\n' +
      '- Ex : 你一定要来我的婚礼 (nǐ yí dìng yào lái wǒ de hūn lǐ) « il faut absolument que tu viennes à mon mariage ».\n' +
      '- Négation : 一定不要 = « surtout ne fais pas ». Ex : 一定不要迟到 « surtout ne sois pas en retard ».\n' +
      '\n' +
      'Échelle de force : 应该 (conseil doux) < 得 (nécessité pratique) < 一定要 (insistance perso) < 必须 (obligation absolue).',
    bodyEn:
      'Chinese offers several modals for obligation/advice, from soft to firm. 应该 (yīng gāi) = «should» — moral obligation or advice. Neutral. Structure: subj + 应该 + verb. Ex: 你应该多喝水 «you should drink more water». Negation: 不应该. 得 (děi, NOT de) = «must / gotta» — PRACTICAL necessity, spoken. Careful: read «děi» not «de» when it\'s the modal. Ex: 我得走了 «I gotta go». Very oral, very common. Negation: NOT 不得, use 不用 (bú yòng) «no need». 必须 (bì xū) = «MANDATORY, absolutely must» — firmest. Formal or insistent. Ex: 学生必须交作业 «students MUST turn in homework». Negation: 不必 (bú bì) «not necessary». 一定要 (yí dìng yào) = «really must» — emotional emphasis, often with enthusiasm or concern. Ex: 你一定要来我的婚礼 «you absolutely must come to my wedding». Negation: 一定不要 = «make sure you don\'t». Force scale: 应该 (soft advice) < 得 (practical) < 一定要 (personal insistence) < 必须 (absolute).',
    items: [
      { hanzi: '应该', pinyin: 'yīng gāi', meaning: 'devrait, il faudrait', meaningEn: 'should', audio: 'audio/hsk3/hsk3_应该.wav' },
      { hanzi: '得', pinyin: 'děi', meaning: 'il faut, je dois (oral)', meaningEn: 'must (oral)', audio: 'audio/hsk3/hsk3_得.wav' },
      { hanzi: '必须', pinyin: 'bì xū', meaning: 'obligatoirement', meaningEn: 'must, mandatory', audio: 'audio/hsk3/hsk3_必须.wav' },
      { hanzi: '一定要', pinyin: 'yí dìng yào', meaning: 'il faut absolument', meaningEn: 'really must', audio: 'audio/hsk2/hsk2_一定.wav' },
      { hanzi: '不用', pinyin: 'bú yòng', meaning: 'pas besoin', meaningEn: 'no need', audio: 'audio/hsk2/hsk2_不用.wav' },
      { hanzi: '不必', pinyin: 'bú bì', meaning: 'pas nécessaire', meaningEn: 'not necessary', audio: 'audio/hsk4/hsk4_不必.wav' }
    ],
    tip:
      'À l\'oral quotidien 得 est ultra fréquent, à l\'écrit ou en public 必须 est plus « correct ». Choisis selon l\'intensité que tu veux transmettre.',
    tipEn:
      'In daily speech 得 is super common; in writing or public 必须 sounds more «proper». Pick based on the intensity you want to convey.'
  },
  {
    id: 'a2-grammar-direction-complements',
    title: 'Compléments directionnels simples : verbe + 来/去',
    titleEn: 'Simple directional complements: verb + 来/去',
    body:
      'Structure : verbe de mouvement + 来 (vers moi) OU 去 (loin de moi).\n' +
      '\n' +
      '来 vs 去 : décidé par la position du LOCUTEUR.\n' +
      '- 你过来 (nǐ guò lai) « viens ici » (vers moi qui parle).\n' +
      '- 你过去 (nǐ guò qu) « va là-bas » (loin de moi).\n' +
      '\n' +
      'Verbes directionnels + 来/去 (pattern de base) :\n' +
      '- 上来/上去 : monter (vers moi / loin de moi). Ex : 快上来吧 (kuài shàng lái ba) « monte vite (ici) ».\n' +
      '- 下来/下去 : descendre. Ex : 请下来 (qǐng xià lái) « descends (vers moi) ».\n' +
      '- 进来/进去 : entrer. Ex : 请进来 (qǐng jìn lái) « entre (chez moi) ». Ex : 他进去了 (tā jìn qù le) « il est entré (dans une pièce loin de moi) ».\n' +
      '- 出来/出去 : sortir. Ex : 我出去买东西 (wǒ chū qù mǎi dōng xi) « je sors faire des courses ».\n' +
      '- 回来/回去 : revenir / retourner. Ex : 妈妈回来了 (mā ma huí lái le) « maman est rentrée » (vers moi).\n' +
      '- 过来/过去 : venir / y aller. Ex : 你过来 « viens ici », 我过去 « j\'y vais ».\n' +
      '- 起来 : se lever / monter (surtout avec 站/坐). Ex : 请站起来 (qǐng zhàn qǐ lái) « lève-toi ».\n' +
      '\n' +
      'Composition VERBE + DIRECTIONNEL + 来/去 :\n' +
      '- Structure : verbe d\'action + directionnel + 来/去.\n' +
      '- Ex : 他走进来了 (tā zǒu jìn lái le) « il est entré (à pied, vers moi) ». Décompose : 走 (marcher) + 进 (dans) + 来 (vers moi).\n' +
      '- Ex : 我拿出去 (wǒ ná chū qù) « je le sors (dehors, loin de moi) ». 拿 (prendre) + 出 (dehors) + 去 (loin).\n' +
      '- Ex : 请你坐下来 (qǐng nǐ zuò xià lái) « assieds-toi (par ici) ».\n' +
      '\n' +
      'Cas OBJET : si un objet suit, il vient AVANT 来/去 ou APRÈS le directionnel.\n' +
      '- Ex : 我买回来一本书 (wǒ mǎi huí lái yì běn shū) « j\'ai rapporté un livre ». Ou : 我买了一本书回来.\n' +
      '- Attention aux lieux : le lieu-destination vient AVANT 来/去. Ex : 他跑进房间来 (tā pǎo jìn fáng jiān lái) « il est entré dans la pièce en courant ».',
    bodyEn:
      'Structure: motion verb + 来 (toward me) OR 去 (away from me). 来 vs 去 decided by SPEAKER position. 你过来 «come here» (toward me). 你过去 «go there» (away from me). Directional verbs + 来/去 (base pattern): 上来/上去 (go up), 下来/下去 (go down), 进来/进去 (enter), 出来/出去 (exit), 回来/回去 (come/go back), 过来/过去 (come/go over), 起来 (stand up/rise, especially with 站/坐). Composition VERB + DIRECTIONAL + 来/去: action verb + directional + 来/去. Ex: 他走进来了 «he walked in (toward me)». 走 (walk) + 进 (in) + 来 (toward me). Ex: 我拿出去 «I\'ll take it out (away)». 拿 (take) + 出 (out) + 去 (away). Ex: 请你坐下来 «please sit down (here)». OBJECT case: if an object follows, it comes BEFORE 来/去 or AFTER the directional. Ex: 我买回来一本书 «I brought back a book». Or: 我买了一本书回来. Place-destination goes BEFORE 来/去: 他跑进房间来 «he ran into the room».',
    items: [
      { hanzi: '来', pinyin: 'lái', meaning: 'venir (vers le locuteur)', meaningEn: 'come (toward speaker)', audio: 'audio/hsk1/hsk1_来.wav' },
      { hanzi: '去', pinyin: 'qù', meaning: 'aller (loin du locuteur)', meaningEn: 'go (away)', audio: 'audio/hsk1/hsk1_去.wav' },
      { hanzi: '进来', pinyin: 'jìn lái', meaning: 'entrer (vers moi)', meaningEn: 'come in', audio: 'audio/hsk2/hsk2_进.wav' },
      { hanzi: '进去', pinyin: 'jìn qù', meaning: 'entrer (loin de moi)', meaningEn: 'go in', audio: 'audio/hsk2/hsk2_进.wav' },
      { hanzi: '出来', pinyin: 'chū lái', meaning: 'sortir (vers moi)', meaningEn: 'come out', audio: 'audio/hsk2/hsk2_出.wav' },
      { hanzi: '出去', pinyin: 'chū qù', meaning: 'sortir (loin de moi)', meaningEn: 'go out', audio: 'audio/hsk2/hsk2_出.wav' },
      { hanzi: '回来', pinyin: 'huí lái', meaning: 'revenir', meaningEn: 'come back', audio: 'audio/hsk1/hsk1_回.wav' },
      { hanzi: '回去', pinyin: 'huí qù', meaning: 'retourner', meaningEn: 'go back', audio: 'audio/hsk1/hsk1_回.wav' },
      { hanzi: '过来', pinyin: 'guò lái', meaning: 'venir par ici', meaningEn: 'come over', audio: 'audio/hsk2/hsk2_过.wav' },
      { hanzi: '起来', pinyin: 'qǐ lái', meaning: 'se lever, monter', meaningEn: 'get up, rise', audio: 'audio/hsk2/hsk2_起来.wav' }
    ],
    tip:
      'Entraîne-toi à choisir 来 vs 去 en fonction de « moi qui parle ». Ferme les yeux, sens où tu es, puis décide.',
    tipEn:
      'Practice picking 来 vs 去 based on «me the speaker». Close your eyes, feel where you are, then decide.'
  }
];

// ═════════════════════════════════════════════════════════════════════════════
// Nuances A2 — 你好 en vrai : au-delà du manuel (cecr-a2-nuances-m12)
// Basé sur CGG #97 : usages réels de 你好, salutations selon le contexte,
// salutations observationnelles + 喂 au téléphone.
// ═════════════════════════════════════════════════════════════════════════════

export const a2NuancesRealGreetingsLearnSections: LessonV2LearnSection[] = [
  {
    id: 'a2-real-greetings-nihao',
    title: '你好 en vrai : formel et pour attirer l\'attention',
    titleEn: '你好 in real life: formal and for getting attention',
    body:
      'Les manuels enseignent 你好 (nǐ hǎo) = « bonjour », mais en vrai les natifs l\'utilisent RAREMENT entre amis. Ça crée de la distance, comme dire « bonjour monsieur » à ton meilleur pote.\n' +
      '\n' +
      'Contextes où 你好 EST naturel :\n' +
      '- Rencontre avec un inconnu ou une nouvelle connaissance.\n' +
      '- Situation formelle (interview, réunion).\n' +
      '- Quand tu ne sais pas quoi dire d\'autre — c\'est le défaut sûr.\n' +
      '\n' +
      '您好 (nín hǎo) : version RESPECTUEUSE avec 您. À utiliser avec profs, chefs, aînés, clients. Ex : 李教授，您好 (lǐ jiào shòu, nín hǎo) « bonjour professeur Li ».\n' +
      '\n' +
      '你好吗 (nǐ hǎo ma) ? = « comment vas-tu ? » — le manuel l\'enseigne, mais les Chinois ne l\'utilisent PRESQUE JAMAIS. Sonne bizarre en conversation courante. Le seul cas OK : après 好久不见 (retrouvailles). Ex : 好久不见，你好吗 (hǎo jiǔ bú jiàn, nǐ hǎo ma) « ça fait longtemps, tu vas bien ? ».\n' +
      '\n' +
      'À la place, les natifs demandent : 最近怎么样 (zuì jìn zěn me yàng) « quoi de neuf récemment ? » ou 最近忙吗 (zuì jìn máng ma) « occupé ces temps-ci ? ».\n' +
      '\n' +
      'USAGE PRINCIPAL de 你好 : « excusez-moi ». Bien plus courant que comme salutation. Pour aborder poliment un inconnu.\n' +
      '- Ex : 你好，请问图书馆在哪里 (nǐ hǎo, qǐng wèn tú shū guǎn zài nǎ lǐ) « excusez-moi, où est la bibliothèque ? ».\n' +
      '- Ex : 师傅，你好，去火车站多少钱 (shī fu, nǐ hǎo, qù huǒ chē zhàn duō shao qián) « bonjour, chef, combien pour la gare ? ».\n' +
      '- Ex : 你好，洗手间在哪里 (nǐ hǎo, xǐ shǒu jiān zài nǎ lǐ) « excusez-moi, les toilettes ? ».',
    bodyEn:
      'Textbooks teach 你好 (nǐ hǎo) = «hello», but natives RARELY use it between friends. It creates distance, like saying «good day sir» to your best mate. Contexts where 你好 IS natural: meeting a stranger or new acquaintance; formal setting (interview, meeting); when you don\'t know what else to say — the safe default. 您好 (nín hǎo): RESPECTFUL version with 您. Use with teachers, bosses, elders, customers. Ex: 李教授，您好 «hello professor Li». 你好吗? = «how are you?» — textbooks teach it, but Chinese people ALMOST NEVER use it. Sounds weird in normal conversation. The only OK case: after 好久不见 (reunion). Ex: 好久不见，你好吗 «it\'s been a while, how are you?». Instead, natives ask: 最近怎么样 «what\'s new lately?» or 最近忙吗 «busy these days?». MAIN USE of 你好: «excuse me». Far more common than as a greeting. To politely approach a stranger. Ex: 你好，请问图书馆在哪里 «excuse me, where is the library?». Ex: 师傅，你好，去火车站多少钱 «hello, driver, how much to the train station?». Ex: 你好，洗手间在哪里 «excuse me, where\'s the restroom?».',
    items: [
      { hanzi: '你好', pinyin: 'nǐ hǎo', meaning: 'bonjour (formel / excusez-moi)', meaningEn: 'hello (formal / excuse me)', audio: 'audio/hsk1/hsk1_你好.wav' },
      { hanzi: '您好', pinyin: 'nín hǎo', meaning: 'bonjour (respectueux)', meaningEn: 'hello (respectful)', audio: 'audio/hsk1/hsk1_您好.wav' },
      { hanzi: '您', pinyin: 'nín', meaning: 'vous (poli, singulier)', meaningEn: 'you (polite, singular)', audio: 'audio/hsk2/hsk2_您.wav' },
      { hanzi: '请问', pinyin: 'qǐng wèn', meaning: 'excusez-moi, puis-je demander', meaningEn: 'excuse me, may I ask', audio: 'audio/hsk2/hsk2_请问.wav' },
      { hanzi: '最近', pinyin: 'zuì jìn', meaning: 'récemment, ces temps-ci', meaningEn: 'recently, lately', audio: 'audio/hsk3/hsk3_最近.wav' },
      { hanzi: '怎么样', pinyin: 'zěn me yàng', meaning: 'comment ça va, qu\'en penses-tu', meaningEn: 'how is it, what do you think', audio: 'audio/hsk1/hsk1_怎么样.wav' },
      { hanzi: '师傅', pinyin: 'shī fu', meaning: 'chef (artisan, chauffeur)', meaningEn: 'master (craftsman, driver)', audio: 'audio/hsk4/hsk4_师傅.wav' }
    ],
    tip:
      'Chaque fois que tu VOULAIS dire « excusez-moi », essaie 你好 à la place. C\'est ainsi que les natifs l\'utilisent le plus.',
    tipEn:
      'Whenever you WANTED to say «excuse me», try 你好 instead. That\'s how natives use it most.'
  },
  {
    id: 'a2-real-greetings-time-and-group',
    title: 'Salutations selon l\'heure et pour un groupe',
    titleEn: 'Greetings by time and for a group',
    body:
      '早 (zǎo) = « salut » du matin. En vrai UNE syllabe suffit, pas 早上好.\n' +
      '- Utilisable jusque vers 10h avec presque tout le monde (amis, collègues, voisins).\n' +
      '- Registre formel : 早上好 (zǎo shàng hǎo) pour un chef ou un inconnu ; peut être combiné avec un titre. Ex : 王校长，早上好 (wáng xiào zhǎng, zǎo shàng hǎo) « bonjour monsieur le directeur Wang ».\n' +
      '- À Taïwan on entend souvent 早安 (zǎo ān), équivalent poli, moins fréquent en Chine continentale.\n' +
      '\n' +
      '下午好 (xià wǔ hǎo) / 晚上好 (wǎn shàng hǎo) : « bon après-midi » / « bonsoir ». Beaucoup moins courants qu\'en français ! Réservés aux SITUATIONS FORMELLES (conférence, discours). Pas utilisés entre amis pour dire « bonsoir ». Ex : 晚上好，各位 (wǎn shàng hǎo, gè wèi) « bonsoir à tous » (formel).\n' +
      '\n' +
      '大家好 (dà jiā hǎo) = « bonjour à tous ». La façon standard de saluer un groupe. Utilisé par les profs qui entrent en classe, un intervenant, quelqu\'un qui rejoint un groupe. Ex : 大家好，我是李华 (dà jiā hǎo, wǒ shì lǐ huá) « bonjour à tous, je suis Li Hua ».\n' +
      '\n' +
      '你们好 (nǐ men hǎo) ? Grammaticalement correct mais sonne RAIDE. On préfère toujours 大家好, plus inclusif et naturel.\n' +
      '\n' +
      '吃了吗 (chī le ma) « t\'as mangé ? » : salutation TRADITIONNELLE, encore utilisée par les personnes âgées ou en zone rurale. Historique liée à l\'importance de la nourriture. N\'est PAS une invitation à manger : réponse standard = 吃了，你呢 (chī le, nǐ ne) ? (« oui, et toi ? »). Rare chez les jeunes urbains aujourd\'hui.',
    bodyEn:
      '早 (zǎo) = morning «hi». Actually ONE syllable is enough, not 早上好. Usable until around 10 a.m. with almost anyone (friends, coworkers, neighbors). Formal register: 早上好 (zǎo shàng hǎo) for a boss or stranger; can be combined with a title. Ex: 王校长，早上好 «good morning principal Wang». In Taiwan you often hear 早安 (zǎo ān), a polite equivalent, less frequent on the mainland. 下午好 / 晚上好: «good afternoon» / «good evening». Way less common than in English! Reserved for FORMAL SETTINGS (conference, speech). NOT used between friends to say «good evening». Ex: 晚上好，各位 «good evening everyone» (formal). 大家好 (dà jiā hǎo) = «hi everyone». The standard way to greet a group. Used by teachers entering class, a speaker, someone joining a group. Ex: 大家好，我是李华 «hi everyone, I\'m Li Hua». 你们好? Grammatically correct but sounds STIFF. Always prefer 大家好, more inclusive and natural. 吃了吗 «have you eaten?»: TRADITIONAL greeting, still used by elders or in rural areas. Historically linked to the importance of food. NOT an invitation to eat: standard reply = 吃了，你呢? («yes, and you?»). Rare among urban youth today.',
    items: [
      { hanzi: '早', pinyin: 'zǎo', meaning: 'salut (matin)', meaningEn: 'morning (hi)', audio: 'audio/hsk1/hsk1_早.wav' },
      { hanzi: '早上好', pinyin: 'zǎo shàng hǎo', meaning: 'bonjour (matin, formel)', meaningEn: 'good morning (formal)', audio: 'audio/hsk1/hsk1_早上好.wav' },
      { hanzi: '晚上好', pinyin: 'wǎn shàng hǎo', meaning: 'bonsoir (formel)', meaningEn: 'good evening (formal)', audio: 'audio/hsk1/hsk1_晚上好.wav' },
      { hanzi: '大家好', pinyin: 'dà jiā hǎo', meaning: 'bonjour à tous', meaningEn: 'hi everyone', audio: 'audio/hsk1/hsk1_大家好.wav' },
      { hanzi: '大家', pinyin: 'dà jiā', meaning: 'tout le monde', meaningEn: 'everyone', audio: 'audio/hsk2/hsk2_大家.wav' },
      { hanzi: '各位', pinyin: 'gè wèi', meaning: 'mesdames et messieurs (formel)', meaningEn: 'everyone (formal)', audio: 'audio/hsk5/hsk5_各位.wav' },
      { hanzi: '吃了吗', pinyin: 'chī le ma', meaning: 't\'as mangé ? (salutation trad.)', meaningEn: 'have you eaten? (trad. greeting)', audio: 'audio/hsk1/hsk1_吃.wav' }
    ],
    tip:
      'La vraie « salutation » d\'un ami au matin dans un bureau chinois, c\'est un simple 早 lancé en passant. Pense-y comme un « salut » ultra-court.',
    tipEn:
      'The real morning «greeting» to a friend in a Chinese office is a simple 早 tossed in passing. Think of it as an ultra-short «hi».'
  },
  {
    id: 'a2-real-greetings-name-observation-phone',
    title: 'Appeler par le nom, salutations d\'observation, 喂 au téléphone',
    titleEn: 'Calling by name, observation greetings, 喂 on the phone',
    body:
      'Appeler par le NOM ou le TITRE seul : une des façons LES PLUS NATURELLES de saluer.\n' +
      '- Ex : 小王 (xiǎo wáng) ! « Xiao Wang ! ». 张老师 (zhāng lǎo shī) « prof Zhang ». 老板 (lǎo bǎn) « chef ! ». 师傅 (shī fu) « chef ! » (chauffeur, artisan). 经理 (jīng lǐ) « manager ! ».\n' +
      '- Le NOM SEUL est la salutation. Pas besoin de 你好. La réponse est un simple 诶 (éi, « ouais ! ») ou un signe de tête.\n' +
      '- Contexte collectif formel : élèves qui saluent en cœur « 老师好 » (lǎo shī hǎo) (« bonjour prof »).\n' +
      '\n' +
      'Salutations d\'OBSERVATION : très typiques du chinois. On énonce ce qui se passe visible.\n' +
      '- Ex : ton voisin te voit partir → 上班去了 (shàng bān qù le) « tu pars bosser ! ». Rentrée du travail → 回来了 (huí lái le) « t\'es revenu ! ». Fin de journée → 下班了 (xià bān le) « tu finis ! ». Il pleut → 下雨了 (xià yǔ le) « il pleut ! ».\n' +
      '- Ce ne sont PAS des questions. Réponds juste par un 嗯 (en, « mm-hm »), un sourire ou un hochement de tête. C\'est un « je te vois, bonjour » sans dire bonjour.\n' +
      '- Le 了 marque le changement d\'état, dit sur un ton chaleureux.\n' +
      '\n' +
      '喂 (wéi) : la salutation AU TÉLÉPHONE. Ton MONTANT (« wéi ? » comme une question). NE DIS PAS 你好 pour décrocher : les Chinois trouveraient bizarre.\n' +
      '- Ex : 喂，你好，请问哪位 (wéi, nǐ hǎo, qǐng wèn nǎ wèi) « allô, bonjour, qui est-ce ? ». On peut combiner 喂 + 你好 pour un appel pro.\n' +
      '- Attention au TON : 喂 avec ton MONTANT = allô téléphone. 喂 avec ton DESCENDANT (wèi !) = « eh toi ! » pour interpeller quelqu\'un physiquement. Ce dernier peut sonner IMPOLI ou impatient — à éviter au tél.',
    bodyEn:
      'Calling by NAME or TITLE alone: one of the MOST NATURAL ways to greet. Ex: 小王! «Xiao Wang!». 张老师 «Prof Zhang». 老板 «boss!». 师傅 «chief!» (driver, craftsman). 经理 «manager!». The NAME ALONE is the greeting. No 你好 needed. The reply is a simple 诶 (éi, «yeah!») or a nod. Formal group setting: students greeting in unison «老师好» («hello teacher»). OBSERVATION greetings: very typical Chinese. You state what\'s visibly happening. Ex: your neighbor sees you leaving → 上班去了 «off to work!». Coming back from work → 回来了 «you\'re back!». End of day → 下班了 «done for the day!». It\'s raining → 下雨了 «it\'s raining!». These are NOT questions. Just reply with 嗯 (en, «mm-hm»), a smile or nod. It\'s an «I see you, hello» without saying hello. The 了 marks the change of state, said in a warm tone. 喂 (wéi): PHONE greeting. RISING tone («wéi?» like a question). DON\'T say 你好 to pick up: Chinese people would find it weird. Ex: 喂，你好，请问哪位 «hello, hi, who is it?». You can combine 喂 + 你好 for a pro call. Watch the TONE: 喂 with RISING tone = phone «hello». 喂 with FALLING tone (wèi!) = «hey you!» to physically call someone. The latter can sound RUDE or impatient — avoid it on the phone.',
    items: [
      { hanzi: '老师', pinyin: 'lǎo shī', meaning: 'professeur', meaningEn: 'teacher', audio: 'audio/hsk1/hsk1_老师.wav' },
      { hanzi: '老板', pinyin: 'lǎo bǎn', meaning: 'chef, patron', meaningEn: 'boss', audio: 'audio/hsk4/hsk4_老板.wav' },
      { hanzi: '经理', pinyin: 'jīng lǐ', meaning: 'manager', meaningEn: 'manager', audio: 'audio/hsk3/hsk3_经理.wav' },
      { hanzi: '上班', pinyin: 'shàng bān', meaning: 'aller au travail', meaningEn: 'go to work', audio: 'audio/hsk2/hsk2_上班.wav' },
      { hanzi: '下班', pinyin: 'xià bān', meaning: 'finir le travail', meaningEn: 'finish work', audio: 'audio/hsk2/hsk2_下班.wav' },
      { hanzi: '回来了', pinyin: 'huí lái le', meaning: 't\'es revenu !', meaningEn: 'you\'re back!', audio: 'audio/hsk1/hsk1_回来.wav' },
      { hanzi: '喂', pinyin: 'wéi', meaning: 'allô (téléphone)', meaningEn: 'hello (phone)', audio: 'audio/hsk1/hsk1_喂.wav' },
      { hanzi: '哪位', pinyin: 'nǎ wèi', meaning: 'qui est-ce (poli)', meaningEn: 'who is it (polite)', audio: 'audio/hsk3/hsk3_位.wav' }
    ],
    tip:
      'Quand un livreur ou un serveur te salue avec 你好, c\'est aussi souvent « votre attention svp » plutôt qu\'un « bonjour » social. Réponds normalement.',
    tipEn:
      'When a delivery person or waiter greets you with 你好, it\'s often «excuse me, your attention please» rather than a social «hello». Just reply normally.'
  }
];

// ═════════════════════════════════════════════════════════════════════════════
// Nuances A2 — Premières rencontres, formalités et retrouvailles
// (cecr-a2-nuances-m13) — basé sur CGG #98.
// ═════════════════════════════════════════════════════════════════════════════

export const a2NuancesFirstMeetingLearnSections: LessonV2LearnSection[] = [
  {
    id: 'a2-first-meeting-standard',
    title: 'Rencontrer quelqu\'un pour la 1re fois : phrases courantes',
    titleEn: 'Meeting someone for the 1st time: common phrases',
    body:
      '很高兴认识你 (hěn gāo xìng rèn shi nǐ) = « ravi de te rencontrer ». LE défaut par excellence, marche partout, formel comme décontracté. Le sujet 我 est souvent omis.\n' +
      '- Ex : 你好，很高兴认识你 (nǐ hǎo, hěn gāo xìng rèn shi nǐ) « bonjour, ravi de te rencontrer » (en serrant la main).\n' +
      '- Réponse : 我也很高兴认识你 (wǒ yě hěn gāo xìng rèn shi nǐ) « moi aussi, ravi » ou plus court 我也是 (wǒ yě shì) « moi aussi ».\n' +
      '\n' +
      '很高兴见到你 (hěn gāo xìng jiàn dào nǐ) = « ravi de te voir ». Utilise 见到 (voir) à la place de 认识 (connaître).\n' +
      '\n' +
      'Différence subtile :\n' +
      '- 认识 (rèn shi) = « connaître, faire connaissance » → SPÉCIFIQUE à une 1re rencontre.\n' +
      '- 见到 (jiàn dào) = « voir » (physiquement) → OK pour une 1re rencontre OU pour revoir quelqu\'un qu\'on connaît.\n' +
      '- Ex : 很高兴见到你 « content de te voir » (avec quelqu\'un qu\'on ne connaissait que par messages jusque-là).\n' +
      '\n' +
      '认识你真好 (rèn shi nǐ zhēn hǎo) = « c\'est vraiment top de te connaître ». Plus personnel, plus chaleureux. À utiliser APRÈS avoir un peu discuté, quand on se sent vraiment content de la rencontre. Réponse : 认识你也真好 (rèn shi nǐ yě zhēn hǎo).\n' +
      '\n' +
      'Pour un groupe (formel, discours) : 今天认识各位朋友很高兴 (jīn tiān rèn shi gè wèi péng you hěn gāo xìng) « je suis très heureux de vous rencontrer aujourd\'hui ». 各位朋友 (gè wèi péng you) = « chers amis, mesdames et messieurs ». Réservé aux conférences, discours d\'ouverture. À ne pas utiliser pour retrouver 3 potes au café !',
    bodyEn:
      '很高兴认识你 (hěn gāo xìng rèn shi nǐ) = «nice to meet you». THE go-to default, works everywhere, formal or casual. The subject 我 is often omitted. Ex: 你好，很高兴认识你 «hello, nice to meet you» (shaking hands). Reply: 我也很高兴认识你 «me too, nice to meet you» or shorter 我也是 «me too». 很高兴见到你 (hěn gāo xìng jiàn dào nǐ) = «nice to see you». Uses 见到 (to see) instead of 认识 (to get to know). Subtle difference: 认识 = «know, get acquainted» → SPECIFIC to a 1st meeting. 见到 = «see» (physically) → OK for a 1st meeting OR seeing someone you already know. Ex: 很高兴见到你 «good to see you» (with someone you\'ve only known through messages until then). 认识你真好 (rèn shi nǐ zhēn hǎo) = «it\'s really great getting to know you». More personal, warmer. Use it AFTER chatting a bit, when you genuinely feel happy about the encounter. Reply: 认识你也真好. For a group (formal, speech): 今天认识各位朋友很高兴 «I\'m very glad to meet everyone today». 各位朋友 = «dear friends, ladies and gentlemen». Reserved for conferences, opening speeches. Don\'t use it to meet up with 3 buddies at a café!',
    items: [
      { hanzi: '很高兴认识你', pinyin: 'hěn gāo xìng rèn shi nǐ', meaning: 'ravi de te rencontrer', meaningEn: 'nice to meet you', audio: 'audio/hsk1/hsk1_很高兴认识你.wav' },
      { hanzi: '认识', pinyin: 'rèn shi', meaning: 'connaître, faire connaissance', meaningEn: 'to know, get acquainted', audio: 'audio/hsk1/hsk1_认识.wav' },
      { hanzi: '见到', pinyin: 'jiàn dào', meaning: 'voir (rencontrer)', meaningEn: 'to see (meet)', audio: 'audio/hsk1/hsk1_见.wav' },
      { hanzi: '高兴', pinyin: 'gāo xìng', meaning: 'content, ravi', meaningEn: 'happy, glad', audio: 'audio/hsk1/hsk1_高兴.wav' },
      { hanzi: '我也是', pinyin: 'wǒ yě shì', meaning: 'moi aussi', meaningEn: 'me too', audio: 'audio/hsk1/hsk1_也.wav' },
      { hanzi: '朋友', pinyin: 'péng you', meaning: 'ami', meaningEn: 'friend', audio: 'audio/hsk1/hsk1_朋友.wav' }
    ],
    tip:
      'Dans 90 % des situations, 很高兴认识你 marche parfaitement. Garde les autres tournures pour les situations plus spécifiques.',
    tipEn:
      'In 90 % of situations, 很高兴认识你 works perfectly. Save the other phrasings for more specific situations.'
  },
  {
    id: 'a2-first-meeting-formal',
    title: 'Formel et respectueux : 幸会 et 很荣幸认识您',
    titleEn: 'Formal and respectful: 幸会 and 很荣幸认识您',
    body:
      '幸会 (xìng huì) = « enchanté » formel. Littéralement « rencontre chanceuse ». Réservé aux contextes PRO ou RESPECTUEUX (réunions d\'affaires, rencontre avec un prof).\n' +
      '- Souvent DOUBLÉ : 幸会幸会 (xìng huì xìng huì) en serrant la main. Le doublement amplifie la politesse, sans changer le sens.\n' +
      '- Registre un peu VIEILLI, rare entre jeunes. Équivalent français : « ravi de faire votre connaissance ».\n' +
      '- Si on te dit 幸会, réponds par 幸会 en écho, ou par 我也很荣幸 (wǒ yě hěn róng xìng) « je suis honoré aussi ».\n' +
      '\n' +
      '很荣幸认识您 (hěn róng xìng rèn shi nín) = « je suis très HONORÉ de vous rencontrer ». Le maximum de respect. Utilisé pour un VIP, quelqu\'un qu\'on admire profondément.\n' +
      '- Éléments clés : 荣幸 (róng xìng, « honoré ») + 您 (nín, vous poli).\n' +
      '- Variante : 见到您很荣幸 (jiàn dào nín hěn róng xìng) « honoré de vous voir ».\n' +
      '- Encore plus formel : 认识您是我的荣幸 (rèn shi nín shì wǒ de róng xìng) « vous rencontrer est un honneur pour moi ».\n' +
      '- Situations : prof réputé, haut responsable, personnalité publique.\n' +
      '\n' +
      'Nuances de choix :\n' +
      '- 认识您很荣幸 sous-entend que tu SAVAIS qui il/elle était avant.\n' +
      '- 见到您很荣幸 = politesse générale quand tu rencontres quelqu\'un d\'important.\n' +
      '- En pratique les 2 marchent au moment où tu serres la main.',
    bodyEn:
      '幸会 (xìng huì) = formal «pleased to meet you». Literally «lucky meeting». Reserved for PRO or RESPECTFUL settings (business meetings, meeting a professor). Often DOUBLED: 幸会幸会 while shaking hands. The doubling amplifies politeness without changing meaning. Slightly OLD-FASHIONED register, rare among young people. English equivalent: «delighted to make your acquaintance». If someone says 幸会 to you, echo back with 幸会, or with 我也很荣幸 «I\'m honored too». 很荣幸认识您 (hěn róng xìng rèn shi nín) = «I\'m truly HONORED to meet you». Maximum respect. Used for a VIP, someone you deeply admire. Key elements: 荣幸 («honored») + 您 (polite you). Variant: 见到您很荣幸 «honored to see you». Even more formal: 认识您是我的荣幸 «meeting you is an honor for me». Situations: renowned professor, high official, public figure. Nuance of choice: 认识您很荣幸 implies you KNEW who they were beforehand. 见到您很荣幸 = general politeness when meeting someone important. In practice both work at the moment of the handshake.',
    items: [
      { hanzi: '幸会', pinyin: 'xìng huì', meaning: 'enchanté (formel)', meaningEn: 'pleased to meet you (formal)', audio: 'audio/hsk5/hsk5_幸会.wav' },
      { hanzi: '荣幸', pinyin: 'róng xìng', meaning: 'honoré', meaningEn: 'honored', audio: 'audio/hsk5/hsk5_荣幸.wav' },
      { hanzi: '很荣幸', pinyin: 'hěn róng xìng', meaning: 'très honoré', meaningEn: 'very honored', audio: 'audio/hsk5/hsk5_荣幸.wav' },
      { hanzi: '您', pinyin: 'nín', meaning: 'vous (poli, singulier)', meaningEn: 'you (polite)', audio: 'audio/hsk2/hsk2_您.wav' },
      { hanzi: '认识您', pinyin: 'rèn shi nín', meaning: 'vous rencontrer', meaningEn: 'to meet you (polite)', audio: 'audio/hsk1/hsk1_认识.wav' }
    ],
    tip:
      'Si tu hésites en contexte pro, 很荣幸认识您 avec 您 est le choix le plus sûr. Le 您 seul signale déjà que tu élèves le niveau.',
    tipEn:
      'When in doubt in a pro setting, 很荣幸认识您 with 您 is the safest pick. Just using 您 already signals you\'re raising the register.'
  },
  {
    id: 'a2-first-meeting-famous-reunion',
    title: 'Célébrités, connexions instantanées et retrouvailles',
    titleEn: 'Celebrities, instant connections and reunions',
    body:
      '久仰大名 (jiǔ yǎng dà míng) = « votre réputation vous précède ». Littéralement « depuis longtemps j\'admire votre grand nom ». RÉSERVÉ à quelqu\'un de VRAIMENT connu ou distingué.\n' +
      '- Composants : 久仰 (jiǔ yǎng, « depuis longtemps j\'admire ») + 大名 (dà míng, « grand nom », honorifique).\n' +
      '- Ex : à un auteur célèbre → 莫言老师，久仰大名！您的小说深深打动了我 (mò yán lǎo shī, jiǔ yǎng dà míng ! nín de xiǎo shuō shēn shēn dǎ dòng le wǒ) « professeur Mo Yan, votre nom m\'est familier depuis longtemps ! Vos romans m\'ont profondément touché ».\n' +
      '- Version doublée : 久仰久仰 (jiǔ yǎng jiǔ yǎng) en serrant la main.\n' +
      '- Variante quasi-identique : 久闻大名 (jiǔ wén dà míng) « depuis longtemps j\'entends votre nom ».\n' +
      '- À ne PAS utiliser avec un inconnu random — seulement si la personne est vraiment reconnue.\n' +
      '\n' +
      '相见恨晚 (xiāng jiàn hèn wǎn) = « regret de s\'être rencontrés si tard ». Un chengyu (idiome 4 caractères).\n' +
      '- Sens : « on s\'entend tellement bien, pourquoi ne s\'est-on pas rencontrés plus tôt ! ». Sentiment POSITIF malgré le 恨 (regret).\n' +
      '- N\'est PAS une salutation initiale. À utiliser APRÈS avoir discuté un moment, quand tu réalises que ton nouvel interlocuteur t\'inspire vraiment.\n' +
      '- Ex : 真是相见恨晚 (zhēn shi xiāng jiàn hèn wǎn) ! « quel dommage qu\'on ne se soit pas rencontrés plus tôt ! ».\n' +
      '- Ex : 我跟他有种相见恨晚的感觉 (wǒ gēn tā yǒu zhǒng xiāng jiàn hèn wǎn de gǎn jué) « avec lui, j\'ai l\'impression qu\'on aurait dû se rencontrer plus tôt ».\n' +
      '\n' +
      '好久不见 (hǎo jiǔ bú jiàn) = « ça fait longtemps ! ». RETROUVAILLES avec quelqu\'un qu\'on connaît déjà. Ne PAS utiliser en 1re rencontre.\n' +
      '- Ex : 老李，好久不见 ! 你也在这里吃饭吗 (lǎo lǐ, hǎo jiǔ bú jiàn ! nǐ yě zài zhè lǐ chī fàn ma) ? « Lao Li, ça fait longtemps ! tu manges aussi ici ? ».\n' +
      '- Renforcement : 好久不见了 (hǎo jiǔ bú jiàn le) avec 了 en fin, marque encore plus le temps écoulé.\n' +
      '- Formel/littéraire : 久违了 (jiǔ wéi le) ou l\'ancien 别来无恙 (bié lái wú yàng) « j\'espère que tu vas bien depuis notre séparation ». Rare aujourd\'hui.\n' +
      '- Souvent suivi d\'un 最近好吗 (zuì jìn hǎo ma) ? (« comment ça va récemment ? ») ou 最近怎么样 (zuì jìn zěn me yàng) ?',
    bodyEn:
      '久仰大名 (jiǔ yǎng dà míng) = «your reputation precedes you». Literally «for a long time I\'ve admired your great name». RESERVED for someone TRULY renowned or distinguished. Components: 久仰 («I\'ve long admired») + 大名 («great name», honorific). Ex: to a famous author → 莫言老师，久仰大名！您的小说深深打动了我 «Professor Mo Yan, I\'ve long known your name! Your novels moved me deeply». Doubled version: 久仰久仰 while shaking hands. Near-identical variant: 久闻大名 «I\'ve long heard your name». Do NOT use with a random stranger — only if the person is genuinely recognized. 相见恨晚 (xiāng jiàn hèn wǎn) = «regret meeting so late». A chengyu (4-character idiom). Sense: «we get along so well, why didn\'t we meet earlier!». POSITIVE feeling despite the 恨 (regret). NOT an initial greeting. Use it AFTER chatting a while, when you realize your new acquaintance really clicks with you. Ex: 真是相见恨晚! «what a shame we didn\'t meet earlier!». Ex: 我跟他有种相见恨晚的感觉 «with him, I feel we should have met earlier». 好久不见 (hǎo jiǔ bú jiàn) = «long time no see!». REUNIONS with someone you already know. Do NOT use for a 1st meeting. Ex: 老李，好久不见 ! 你也在这里吃饭吗? «Lao Li, long time no see! you\'re eating here too?». Reinforcement: 好久不见了 with final 了 emphasizes even more time elapsed. Formal/literary: 久违了 (jiǔ wéi le) or the old 别来无恙 (bié lái wú yàng) «I hope you\'ve been well since we parted». Rare today. Often followed by 最近好吗? («how have you been recently?») or 最近怎么样?',
    items: [
      { hanzi: '久仰大名', pinyin: 'jiǔ yǎng dà míng', meaning: 'votre réputation vous précède', meaningEn: 'your reputation precedes you', audio: 'audio/hsk6/hsk6_久仰.wav' },
      { hanzi: '相见恨晚', pinyin: 'xiāng jiàn hèn wǎn', meaning: 'regret de s\'être rencontrés si tard', meaningEn: 'regret meeting so late', audio: 'audio/hsk6/hsk6_相见恨晚.wav' },
      { hanzi: '好久不见', pinyin: 'hǎo jiǔ bú jiàn', meaning: 'ça fait longtemps', meaningEn: 'long time no see', audio: 'audio/hsk1/hsk1_好久不见.wav' },
      { hanzi: '久违了', pinyin: 'jiǔ wéi le', meaning: 'ça fait longtemps (formel)', meaningEn: 'long time no see (formal)', audio: 'audio/hsk6/hsk6_久违.wav' },
      { hanzi: '最近好吗', pinyin: 'zuì jìn hǎo ma', meaning: 'comment ça va récemment', meaningEn: 'how have you been recently', audio: 'audio/hsk3/hsk3_最近.wav' },
      { hanzi: '小说', pinyin: 'xiǎo shuō', meaning: 'roman', meaningEn: 'novel', audio: 'audio/hsk4/hsk4_小说.wav' }
    ],
    tip:
      'Distinction cruciale — 你好 pour aborder, 很高兴认识你 pour 1re rencontre, 好久不见 pour retrouver quelqu\'un. Confondre les 3 sonne bizarre aux Chinois.',
    tipEn:
      'Crucial distinction — 你好 to approach, 很高兴认识你 for a 1st meeting, 好久不见 to reunite. Mixing the 3 up sounds strange to Chinese ears.'
  }
];

// ═════════════════════════════════════════════════════════════════════════════
// A2 Nuances — « si oui ou non » (whether or not) — CGG #96
// ═════════════════════════════════════════════════════════════════════════════

export const a2NuancesWhetherOrNotLearnSections: LessonV2LearnSection[] = [
  {
    id: 'a2-whether-verb-bu-verb',
    title: 'Structure V-不-V : la base de « si oui ou non »',
    titleEn: 'V-不-V structure: the basis of « whether or not »',
    body:
      'Le chinois n\'a PAS un mot unique pour « si oui ou non » à la mode française. À la place, on présente les 2 possibilités : verbe + 不 + verbe.\n' +
      '- Structure : (sujet) + verbe + 不 + verbe + (objet).\n' +
      '- Ex : 我不在乎她喜不喜欢 (wǒ bú zài hu tā xǐ bu xǐ huan) « je me fiche qu\'elle aime ou pas ».\n' +
      '- Ex : 你去不去 ? (nǐ qù bu qù) « tu y vas ou pas ? ».\n' +
      '- Attention : PAS de 吗 avec cette structure ! Et surtout PAS de 如果 (« si »). 如果 introduit une CONDITION hypothétique, alors que V-不-V exprime une INCERTITUDE oui/non.\n' +
      '- Pour un verbe/adjectif dissyllabique, 2 formes possibles :\n' +
      '  · Forme complète : 喜欢不喜欢 (xǐ huan bù xǐ huan).\n' +
      '  · Forme courte : 喜不喜欢 (xǐ bu xǐ huan) — juste le 1er caractère avant 不. Sonne un peu plus vif à l\'oral.\n' +
      '- Ex avec un adjectif : 你累不累 ? (nǐ lèi bu lèi) « fatigué ou pas ? ».\n' +
      '- Ex avec un dissyllabique court : 明白不明白 = 明不明白 (míng bu míng bái) « t\'as compris ou pas ? ».\n' +
      '- Registre : neutre à décontracté. Parfait pour la conversation quotidienne, les questions indirectes.',
    bodyEn:
      'Chinese does NOT have a single word for « whether or not » like in French/English. Instead, you lay out the 2 options: verb + 不 + verb.\n' +
      '- Structure: (subject) + verb + 不 + verb + (object).\n' +
      '- Ex: 我不在乎她喜不喜欢 « I don\'t care whether she likes it or not ».\n' +
      '- Ex: 你去不去? « are you going or not? ».\n' +
      '- Careful: NO 吗 with this structure! And especially NO 如果 (« if »). 如果 introduces a hypothetical CONDITION, whereas V-不-V expresses yes/no UNCERTAINTY.\n' +
      '- For a disyllabic verb/adjective, 2 possible forms:\n' +
      '  · Full form: 喜欢不喜欢.\n' +
      '  · Short form: 喜不喜欢 — just the 1st character before 不. Sounds a bit livelier orally.\n' +
      '- Ex with an adjective: 你累不累? « tired or not? ».\n' +
      '- Ex with a disyllabic short form: 明白不明白 = 明不明白 « got it or not? ».\n' +
      '- Register: neutral to casual. Perfect for daily conversation and indirect questions.',
    items: [
      { hanzi: '去不去', pinyin: 'qù bu qù', meaning: 'aller ou pas', meaningEn: 'go or not', audio: 'audio/hsk1/hsk1_去.wav' },
      { hanzi: '喜不喜欢', pinyin: 'xǐ bu xǐ huan', meaning: 'aimer ou pas', meaningEn: 'like or not', audio: 'audio/hsk1/hsk1_喜欢.wav' },
      { hanzi: '累不累', pinyin: 'lèi bu lèi', meaning: 'fatigué ou pas', meaningEn: 'tired or not', audio: 'audio/hsk2/hsk2_累.wav' },
      { hanzi: '明不明白', pinyin: 'míng bu míng bái', meaning: 'comprendre ou pas', meaningEn: 'understand or not', audio: 'audio/hsk3/hsk3_明白.wav' },
      { hanzi: '在乎', pinyin: 'zài hu', meaning: 'se soucier de', meaningEn: 'care about', audio: 'audio/hsk4/hsk4_在乎.wav' }
    ],
    tip:
      'Le V-不-V est utilisable partout où le français dirait « je me demande si », « je ne sais pas si », « je te demande si ». C\'est le passe-partout du chinois oral.',
    tipEn:
      'V-不-V works everywhere French/English would say « I wonder if », « I don\'t know if », « I\'m asking if ». It\'s the go-to structure in spoken Chinese.'
  },
  {
    id: 'a2-whether-common-variants',
    title: '是不是, 有没有, 要不要, 能不能, 会不会 : les 5 grands classiques',
    titleEn: '是不是, 有没有, 要不要, 能不能, 会不会: the 5 great classics',
    body:
      'Ces 5 formes suivent le même patron V-不-V mais chacune a son domaine.\n' +
      '- 是不是 (shì bu shì) = « est-ce que oui ou non » — vérifier un fait ou une identité.\n' +
      '  · Ex : 他问我是不是老师 (tā wèn wǒ shì bu shì lǎo shī) « il m\'a demandé si j\'étais prof ».\n' +
      '  · Ex : 你是不是累了 (nǐ shì bu shì lèi le) « tu es fatigué ou pas ? ».\n' +
      '- 有没有 (yǒu méi yǒu) : cas SPÉCIAL — 有 se nie avec 没, jamais avec 不. Donc c\'est 有没有, PAS 有不有 ✗.\n' +
      '  · Pour la possession : 我不知道他有没有女朋友 (wǒ bù zhī dào tā yǒu méi yǒu nǚ péng you) « je ne sais pas s\'il a une copine ».\n' +
      '  · Pour une action passée : 我不知道他有没有来 (wǒ bù zhī dào tā yǒu méi yǒu lái) « je ne sais pas s\'il est venu ».\n' +
      '- 要不要 (yào bu yào) : décisions, offres, choix. Littéralement « vouloir ou pas » mais s\'utilise comme « faut-il faire X ou pas ».\n' +
      '  · Ex : 她在考虑要不要换工作 (tā zài kǎo lǜ yào bu yào huàn gōng zuò) « elle se demande si elle doit changer de boulot ».\n' +
      '  · Ex : 你要不要来 ? « tu viens ou pas ? ».\n' +
      '  · Variante 该不该 (gāi bu gāi) « faut-il / faudrait-il » — accent sur « moralement, est-ce judicieux ».\n' +
      '- 能不能 (néng bu néng) : capacité, possibilité. Ex : 我不确定我能不能通过考试 (wǒ bù què dìng wǒ néng bu néng tōng guò kǎo shì) « je ne sais pas si je réussirai l\'examen ».\n' +
      '  · Variante 可不可以 (kě bu kě yǐ) : PERMISSION polie. Ex : 我可不可以请假 « je peux demander un congé ? ».\n' +
      '- 会不会 (huì bu huì) : événements futurs, probabilité. Ex : 我在想明天会不会下雨 (wǒ zài xiǎng míng tiān huì bu huì xià yǔ) « je me demande s\'il va pleuvoir demain ».\n' +
      '  · Sert aussi à adoucir une supposition (« et si... ? »).',
    bodyEn:
      'These 5 forms follow the V-不-V pattern but each has its own domain.\n' +
      '- 是不是 = « is it or isn\'t it » — checking a fact or identity. Ex: 他问我是不是老师 « he asked me whether I\'m a teacher ».\n' +
      '- 有没有: SPECIAL case — 有 is negated with 没, never with 不. So it\'s 有没有, NOT 有不有 ✗. Ex: 我不知道他有没有来 « I don\'t know whether he came ».\n' +
      '- 要不要: decisions, offers, choices. Literally « want or not » but used as « should we do X or not ». Ex: 她在考虑要不要换工作 « she\'s wondering whether to change jobs ». Variant 该不该 « should we ».\n' +
      '- 能不能: capacity, possibility. Ex: 我不确定我能不能通过考试 « I\'m not sure whether I\'ll pass the exam ». Variant 可不可以 for polite permission.\n' +
      '- 会不会: future events, probability. Ex: 我在想明天会不会下雨 « I wonder whether it\'ll rain tomorrow ». Also softens a hypothesis (« what if... »).',
    items: [
      { hanzi: '是不是', pinyin: 'shì bu shì', meaning: 'est-ce que oui ou non', meaningEn: 'is it or not', audio: 'audio/hsk1/hsk1_是.wav' },
      { hanzi: '有没有', pinyin: 'yǒu méi yǒu', meaning: 'avoir ou pas', meaningEn: 'have or not', audio: 'audio/hsk1/hsk1_有.wav' },
      { hanzi: '要不要', pinyin: 'yào bu yào', meaning: 'vouloir/falloir ou pas', meaningEn: 'want/should or not', audio: 'audio/hsk2/hsk2_要.wav' },
      { hanzi: '能不能', pinyin: 'néng bu néng', meaning: 'pouvoir ou pas', meaningEn: 'be able or not', audio: 'audio/hsk1/hsk1_能.wav' },
      { hanzi: '会不会', pinyin: 'huì bu huì', meaning: 'va-t-il / probablement ou pas', meaningEn: 'will or not', audio: 'audio/hsk1/hsk1_会.wav' },
      { hanzi: '可不可以', pinyin: 'kě bu kě yǐ', meaning: 'peut-on (permission)', meaningEn: 'may or not', audio: 'audio/hsk2/hsk2_可以.wav' }
    ],
    tip:
      'Ces 5 formes sont vraiment les briques centrales du chinois oral. Apprends-les comme des blocs.',
    tipEn:
      'These 5 forms are truly the central bricks of spoken Chinese. Learn them as fixed chunks.'
  },
  {
    id: 'a2-whether-haishi-alternative',
    title: '还是 seul : « soit A, soit B » comme alternative',
    titleEn: '还是 alone: « either A or B » as an alternative',
    body:
      'Quand les 2 possibilités NE SONT PAS de simples opposés (« oui / non »), mais des OPTIONS DISTINCTES, on utilise 还是 (hái shi) « ou bien... ».\n' +
      '- Structure : ... + option A + 还是 + option B.\n' +
      '- Ex : 我不知道这是真的还是只是一个故事 (wǒ bù zhī dào zhè shì zhēn de hái shi zhǐ shì yí ge gù shi) « je ne sais pas si c\'est vrai ou si c\'est juste une histoire ». Ici A ≠ non-A.\n' +
      '- Ex : 你想喝咖啡还是茶 (nǐ xiǎng hē kā fēi hái shi chá) « tu veux du café ou du thé ? » (2 options distinctes, pas un oui/non).\n' +
      '- Ex : 你今天来还是明天来 (nǐ jīn tiān lái hái shi míng tiān lái) « tu viens aujourd\'hui ou demain ? ».\n' +
      '- Différence avec V-不-V :\n' +
      '  · V-不-V = « X ou non-X » (opposition binaire).\n' +
      '  · 还是 = « X ou Y » (choix entre 2 options différentes).\n' +
      '- Attention : ne pas confondre avec 或者 (huò zhě) « ou » qui sert dans les phrases AFFIRMATIVES à énumérer des options (Ex : 你可以坐地铁或者打车 « tu peux prendre le métro OU un taxi »). 还是 est réservé aux QUESTIONS ou aux incertitudes.\n' +
      '- Bonus : « 我们去还是不去 ? » et « 我们去不去 ? » signifient à peu près pareil, mais le 1er avec 还是 sonne un peu plus délibératif (« on y va ou on n\'y va pas, faut choisir »).',
    bodyEn:
      'When the 2 options are NOT simple opposites (« yes / no ») but DISTINCT choices, you use 还是 (hái shi) « or ».\n' +
      '- Structure: ... + option A + 还是 + option B.\n' +
      '- Ex: 我不知道这是真的还是只是一个故事 « I don\'t know whether this is true or just a story ». A ≠ non-A.\n' +
      '- Ex: 你想喝咖啡还是茶 « coffee or tea? » (2 distinct options, not a yes/no).\n' +
      '- Difference with V-不-V:\n' +
      '  · V-不-V = « X or non-X » (binary opposition).\n' +
      '  · 还是 = « X or Y » (choice between 2 different options).\n' +
      '- Careful: don\'t confuse with 或者 (huò zhě) « or », used in AFFIRMATIVE sentences to list options. 还是 is reserved for QUESTIONS or uncertainties.\n' +
      '- Bonus: « 我们去还是不去? » ≈ « 我们去不去? » but the former with 还是 sounds a bit more deliberative (« are we going or not, we must decide »).',
    items: [
      { hanzi: '还是', pinyin: 'hái shi', meaning: 'ou bien (choix)', meaningEn: 'or (choice)', audio: 'audio/hsk3/hsk3_还是.wav' },
      { hanzi: '或者', pinyin: 'huò zhě', meaning: 'ou (affirmatif)', meaningEn: 'or (affirmative)', audio: 'audio/hsk3/hsk3_或者.wav' },
      { hanzi: '真的', pinyin: 'zhēn de', meaning: 'vraiment / vrai', meaningEn: 'really / true', audio: 'audio/hsk2/hsk2_真.wav' },
      { hanzi: '故事', pinyin: 'gù shi', meaning: 'histoire', meaningEn: 'story', audio: 'audio/hsk3/hsk3_故事.wav' },
      { hanzi: '咖啡', pinyin: 'kā fēi', meaning: 'café', meaningEn: 'coffee', audio: 'audio/hsk1/hsk1_咖啡.wav' }
    ],
    tip:
      'Le test rapide — si tu peux traduire par « soit A soit B » → 还是. Si c\'est « X ou pas X » → V-不-V.',
    tipEn:
      'Quick test — if you can translate as « either A or B » → 还是. If it\'s « X or not X » → V-不-V.'
  }
];

// ═════════════════════════════════════════════════════════════════════════════
// Nuances — Exprimer l'inquiétude (CGG #90) : 担心, 着急, 紧张, 怕, 放心, 关心
// ═════════════════════════════════════════════════════════════════════════════

export const a2NuancesWorryBasicsLearnSections: LessonV2LearnSection[] = [
  {
    id: 'a2-worry-danxin-zhaoji-jinzhang',
    title: '担心, 着急, 紧张 : 3 façons de s\'inquiéter',
    titleEn: '担心, 着急, 紧张: 3 ways to worry',
    body:
      'Ces 3 mots sont TOUS traduits par « s\'inquiéter » ou « être nerveux », mais ils ne sont PAS interchangeables.\n' +
      '- 担心 (dān xīn) : verbe, inquiétude GÉNÉRALE. Le plus polyvalent. Structure : sujet + 担心 + objet/clause.\n' +
      '  · Ex : 妈妈很担心孩子 (mā ma hěn dān xīn hái zi) « maman est très inquiète pour l\'enfant ».\n' +
      '  · Ex : 我担心你会迟到 (wǒ dān xīn nǐ huì chí dào) « j\'ai peur que tu sois en retard ».\n' +
      '  · Phrase clé : 别担心 (bié dān xīn) « ne t\'inquiète pas ».\n' +
      '  · Renforcement avec 的 : 我们会按时到家的 « on sera à l\'heure, promis ».\n' +
      '- 着急 (zháo jí) : adjectif, inquiétude URGENTE + impatience. Utilisé quand le temps presse.\n' +
      '  · Ex : 快迟到了，我很着急 (kuài chí dào le, wǒ hěn zháo jí) « c\'est presque l\'heure, je stresse ! ».\n' +
      '  · Ex : 你别着急，还有时间呢 « t\'énerve pas, on a encore le temps ».\n' +
      '  · Ne prend PAS d\'objet direct (contrairement à 担心). Pour dire « ça me rend anxieux », utilise 让 + qqn + 着急.\n' +
      '- 紧张 (jǐn zhāng) : adjectif, nervosité MOMENTANÉE (avant un examen, un discours). Sensation physique — cœur qui bat, mains moites.\n' +
      '  · Ex : 第一次演讲，他非常紧张 (dì-yī cì yǎn jiǎng, tā fēi cháng jǐn zhāng) « pour son premier discours, il était très nerveux ».\n' +
      '  · Ex : 明天我要面试了，现在有点紧张 (míng tiān wǒ yào miàn shì le, xiàn zài yǒu diǎn jǐn zhāng) « j\'ai un entretien demain, je suis un peu stressé ».\n' +
      '- Comparaison :\n' +
      '  · 担心 = inquiétude sur un résultat futur (« je m\'inquiète pour ta santé »).\n' +
      '  · 着急 = inquiétude + urgence (« je stresse, on va rater le train »).\n' +
      '  · 紧张 = nervosité corporelle du moment (« j\'ai le trac »).',
    bodyEn:
      'These 3 words are ALL translated as « to worry » or « to be nervous », but they are NOT interchangeable.\n' +
      '- 担心 (dān xīn): verb, GENERAL worry. The most versatile. Structure: subject + 担心 + object/clause.\n' +
      '  · Ex: 妈妈很担心孩子 « mom is very worried about the child ».\n' +
      '  · Ex: 我担心你会迟到 « I\'m afraid you\'ll be late ».\n' +
      '  · Key phrase: 别担心 « don\'t worry ».\n' +
      '- 着急 (zháo jí): adjective, URGENT worry + impatience. Used when time is pressing.\n' +
      '  · Ex: 快迟到了，我很着急 « we\'re almost late, I\'m stressing out! ».\n' +
      '  · Ex: 你别着急，还有时间呢 « don\'t panic, we still have time ».\n' +
      '  · Takes NO direct object (unlike 担心). Use 让 + someone + 着急 for « it makes me anxious ».\n' +
      '- 紧张 (jǐn zhāng): adjective, MOMENTARY nervousness (before an exam, a speech). Physical sensation — pounding heart, sweaty palms.\n' +
      '  · Ex: 第一次演讲，他非常紧张 « for his first speech, he was very nervous ».\n' +
      '  · Ex: 明天我要面试了，现在有点紧张 « I have an interview tomorrow, I\'m a bit stressed ».\n' +
      '- Comparison:\n' +
      '  · 担心 = worry about a future outcome (« I\'m worried about your health »).\n' +
      '  · 着急 = worry + urgency (« I\'m stressed, we\'ll miss the train »).\n' +
      '  · 紧张 = bodily nervousness in the moment (« I have stage fright »).',
    items: [
      { hanzi: '担心', pinyin: 'dān xīn', meaning: 's\'inquiéter (général)', meaningEn: 'to worry (general)', audio: 'audio/hsk3/hsk3_担心.wav' },
      { hanzi: '着急', pinyin: 'zháo jí', meaning: 's\'inquiéter (urgent), stresser', meaningEn: 'to worry (urgent), be anxious', audio: 'audio/hsk3/hsk3_着急.wav' },
      { hanzi: '紧张', pinyin: 'jǐn zhāng', meaning: 'nerveux, tendu', meaningEn: 'nervous, tense', audio: 'audio/hsk4/hsk4_紧张.wav' },
      { hanzi: '别担心', pinyin: 'bié dān xīn', meaning: 'ne t\'inquiète pas', meaningEn: 'don\'t worry', audio: 'audio/hsk3/hsk3_担心.wav' },
      { hanzi: '迟到', pinyin: 'chí dào', meaning: 'être en retard', meaningEn: 'be late', audio: 'audio/hsk3/hsk3_迟到.wav' },
      { hanzi: '面试', pinyin: 'miàn shì', meaning: 'entretien', meaningEn: 'interview', audio: 'audio/hsk5/hsk5_面试.wav' }
    ],
    tip:
      'Test rapide — si tu peux dire « je ne peux rien y faire, je m\'inquiète » → 担心. Si tu peux dire « vite, vite ! » → 着急. Si tu sens des papillons dans le ventre → 紧张.',
    tipEn:
      'Quick test — if you can say « I can\'t do anything about it, I\'m worried » → 担心. If you can say « quick, quick! » → 着急. If you feel butterflies in your stomach → 紧张.'
  },
  {
    id: 'a2-worry-pa-haipa-fangxin',
    title: '怕 / 害怕 : la peur + 放心 : rassurer',
    titleEn: '怕 / 害怕: fear + 放心: to reassure',
    body:
      '- 怕 (pà) = « avoir peur de », « craindre que ». Structure : sujet + 怕 + nom OU + clause.\n' +
      '  · Ex : 我怕明天会下雨 (wǒ pà míng tiān huì xià yǔ) « j\'ai peur qu\'il pleuve demain ».\n' +
      '  · Ex : 我怕老鼠 « j\'ai peur des souris ».\n' +
      '  · Avec 会 pour une possibilité future : 我怕他会生气 « j\'ai peur qu\'il se fâche ».\n' +
      '- 害怕 (hài pà) = version un peu plus FORTE, plus concrète.\n' +
      '  · Ex : 孩子一个人走夜路，妈妈很害怕 (hái zi yí ge rén zǒu yè lù, mā ma hěn hài pà) « l\'enfant marche seul la nuit, maman a très peur ».\n' +
      '  · Souvent pour des peurs tangibles (serpents, obscurité). En pratique, 怕 et 害怕 se chevauchent.\n' +
      '- 怕 vs 担心 : 我担心明天会下雨 et 我怕明天会下雨 se ressemblent, mais 怕 sonne plus personnellement affecté (« j\'espère vraiment que non »).\n' +
      '- 恐怕 (kǒng pà) « je crains que... » : contient 怕 mais fonctionne différemment. Sert à INTRODUIRE une mauvaise nouvelle avec tact.\n' +
      '  · Ex : 恐怕要下雨 « j\'ai bien peur qu\'il va pleuvoir ». Ne prend PAS de sujet, se place en début de clause.\n' +
      '- 放心 (fàng xīn) = « ne pas s\'inquiéter, être rassuré ». Littéralement « déposer le cœur ». C\'est l\'OPPOSÉ de 担心.\n' +
      '  · Ex : 你放心，我一定照顾好你的猫 (nǐ fàng xīn, wǒ yí dìng zhào gù hǎo nǐ de māo) « ne t\'en fais pas, je vais bien m\'occuper de ton chat ».\n' +
      '  · Version polie : 请放心 « soyez rassuré ».\n' +
      '  · Ex : 医生让病人放心，手术很顺利 « le médecin a rassuré le patient : l\'opération s\'est bien passée ».\n' +
      '- Distinction avec 放松 (fàng sōng) : 放松 = « se détendre » physiquement/mentalement ; 放心 = arrêter de s\'inquiéter.',
    bodyEn:
      '- 怕 (pà) = « to be afraid of », « to fear that ». Structure: subject + 怕 + noun OR + clause.\n' +
      '  · Ex: 我怕明天会下雨 « I\'m afraid it\'ll rain tomorrow ».\n' +
      '  · Ex: 我怕老鼠 « I\'m afraid of mice ».\n' +
      '  · With 会 for future possibility: 我怕他会生气 « I\'m afraid he\'ll get angry ».\n' +
      '- 害怕 (hài pà) = a slightly STRONGER, more concrete version.\n' +
      '  · Ex: 孩子一个人走夜路，妈妈很害怕 « the child walks alone at night, mom is very scared ».\n' +
      '  · Often for tangible fears (snakes, darkness). In practice, 怕 and 害怕 overlap.\n' +
      '- 怕 vs 担心: 我担心明天会下雨 and 我怕明天会下雨 sound similar, but 怕 sounds more personally affected (« I really hope not »).\n' +
      '- 恐怕 (kǒng pà) « I\'m afraid that... »: contains 怕 but works differently. Used to INTRODUCE bad news tactfully.\n' +
      '  · Ex: 恐怕要下雨 « I\'m afraid it\'s going to rain ». Takes NO subject, placed at the start of the clause.\n' +
      '- 放心 (fàng xīn) = « to not worry, to be reassured ». Literally « to put down the heart ». The OPPOSITE of 担心.\n' +
      '  · Ex: 你放心，我一定照顾好你的猫 « don\'t worry, I\'ll take good care of your cat ».\n' +
      '  · Polite: 请放心 « rest assured ».\n' +
      '  · Ex: 医生让病人放心，手术很顺利 « the doctor reassured the patient: the surgery went well ».\n' +
      '- Distinction with 放松 (fàng sōng): 放松 = « to relax » physically/mentally; 放心 = to stop worrying.',
    items: [
      { hanzi: '怕', pinyin: 'pà', meaning: 'avoir peur de, craindre', meaningEn: 'be afraid of', audio: 'audio/hsk3/hsk3_怕.wav' },
      { hanzi: '害怕', pinyin: 'hài pà', meaning: 'avoir peur (concret)', meaningEn: 'be scared (concrete)', audio: 'audio/hsk3/hsk3_害怕.wav' },
      { hanzi: '恐怕', pinyin: 'kǒng pà', meaning: 'je crains que...', meaningEn: 'I\'m afraid that...', audio: 'audio/hsk4/hsk4_恐怕.wav' },
      { hanzi: '放心', pinyin: 'fàng xīn', meaning: 'ne pas s\'inquiéter, être rassuré', meaningEn: 'not worry, be reassured', audio: 'audio/hsk3/hsk3_放心.wav' },
      { hanzi: '放松', pinyin: 'fàng sōng', meaning: 'se détendre', meaningEn: 'to relax', audio: 'audio/hsk4/hsk4_放松.wav' },
      { hanzi: '照顾', pinyin: 'zhào gù', meaning: 's\'occuper de, prendre soin', meaningEn: 'take care of', audio: 'audio/hsk3/hsk3_照顾.wav' }
    ],
    tip:
      'Chaque fois que quelqu\'un est inquiet, tu peux répondre par 放心 + un engagement (« ne t\'en fais pas, je m\'en occupe »).',
    tipEn:
      'Whenever someone is worried, you can respond with 放心 + a commitment (« don\'t worry, I\'ll handle it »).'
  },
  {
    id: 'a2-worry-guanxin-vs-danxin',
    title: '关心 vs 担心 : « prendre soin » vs « se faire du souci »',
    titleEn: '关心 vs 担心: « to care for » vs « to worry »',
    body:
      'Piège classique. Les 2 mots peuvent se traduire par « se soucier de », mais ils ne sont PAS interchangeables.\n' +
      '- 关心 (guān xīn) = « prendre soin de », « se soucier positivement de ». Ton chaleureux, affectueux. Pas d\'anxiété.\n' +
      '  · Ex : 父母很关心孩子的健康 (fù mǔ hěn guān xīn hái zi de jiàn kāng) « les parents veillent à la santé de leurs enfants » (attention bienveillante, sans crise).\n' +
      '  · Ex : 我很关心你 « je pense à toi, tu comptes pour moi » — sens chaleureux, pas alarmé.\n' +
      '- Phrase courante : 谢谢你的关心 (xiè xie nǐ de guān xīn) « merci pour ton attention/ta sollicitude ». C\'est la réponse quand quelqu\'un a demandé de tes nouvelles.\n' +
      '- 担心 = « s\'inquiéter » avec anxiété. Sous-entend qu\'on craint que quelque chose n\'aille pas.\n' +
      '  · Ex : 我很担心你最近的状态 (wǒ hěn dān xīn nǐ zuì jìn de zhuàng tài) « je m\'inquiète pour ton état ces derniers temps » — nuance : « je crois que quelque chose ne va pas ».\n' +
      '- Comparaison :\n' +
      '  · 关心 = « cœur bienveillant » (positif, affectueux).\n' +
      '  · 担心 = « cœur chargé » (anxieux, alarmé).\n' +
      '  · 我关心你 = « je pense à toi » (chaleureux).\n' +
      '  · 我担心你 = « je m\'inquiète pour toi » (alarmé).\n' +
      '- Sur le même sujet : 父母关心孩子 (chaleureux, ils veillent) vs 父母担心孩子 (ils s\'inquiètent, il y a un souci).',
    bodyEn:
      'Classic trap. The 2 words can both translate as « to care about », but they are NOT interchangeable.\n' +
      '- 关心 (guān xīn) = « to care for », « to positively concern oneself with ». Warm, affectionate tone. No anxiety.\n' +
      '  · Ex: 父母很关心孩子的健康 « parents care about their children\'s health » (kind attention, no crisis).\n' +
      '  · Ex: 我很关心你 « I care about you, you matter to me » — warm sense, not alarmed.\n' +
      '- Common phrase: 谢谢你的关心 « thank you for your concern ». The reply when someone has asked how you\'re doing.\n' +
      '- 担心 = « to worry » with anxiety. Implies you fear something is wrong.\n' +
      '  · Ex: 我很担心你最近的状态 « I\'m worried about how you\'ve been lately » — nuance: « I think something is off ».\n' +
      '- Comparison:\n' +
      '  · 关心 = « caring heart » (positive, affectionate).\n' +
      '  · 担心 = « heavy heart » (anxious, alarmed).\n' +
      '  · 我关心你 = « I care about you » (warm).\n' +
      '  · 我担心你 = « I\'m worried about you » (alarmed).\n' +
      '- Same subject: 父母关心孩子 (warm, they watch over) vs 父母担心孩子 (they worry, there\'s a problem).',
    items: [
      { hanzi: '关心', pinyin: 'guān xīn', meaning: 'prendre soin, se soucier (positif)', meaningEn: 'care about (positive)', audio: 'audio/hsk3/hsk3_关心.wav' },
      { hanzi: '担心', pinyin: 'dān xīn', meaning: 's\'inquiéter (anxieux)', meaningEn: 'worry (anxious)', audio: 'audio/hsk3/hsk3_担心.wav' },
      { hanzi: '谢谢你的关心', pinyin: 'xiè xie nǐ de guān xīn', meaning: 'merci pour ton attention', meaningEn: 'thank you for your concern', audio: 'audio/hsk3/hsk3_关心.wav' },
      { hanzi: '健康', pinyin: 'jiàn kāng', meaning: 'santé, en bonne santé', meaningEn: 'health, healthy', audio: 'audio/hsk3/hsk3_健康.wav' },
      { hanzi: '状态', pinyin: 'zhuàng tài', meaning: 'état, condition', meaningEn: 'state, condition', audio: 'audio/hsk5/hsk5_状态.wav' }
    ],
    tip:
      'Quand quelqu\'un t\'a montré de l\'attention, remercie par 谢谢你的关心 — jamais 谢谢你的担心 (ce serait bizarre).',
    tipEn:
      'When someone has shown you care, thank them with 谢谢你的关心 — never 谢谢你的担心 (that would be weird).'
  }
];

// ═════════════════════════════════════════════════════════════════════════════
// Grammaire A2 — Compléments de durée : « pendant X » vs « ça fait X »
// (cecr-a2-grammar-m7) — Basé sur CGG #93 : compléments de quantité (durées).
// ═════════════════════════════════════════════════════════════════════════════

export const a2GrammarDurationComplementsLearnSections: LessonV2LearnSection[] = [
  {
    id: 'a2-duration-completed-action',
    title: 'Durée d\'une action ACHEVÉE : 了 après le verbe',
    titleEn: 'Duration of a COMPLETED action: 了 after the verb',
    body:
      'Pour exprimer combien de temps a duré une action FINIE dans le passé, on utilise 了 juste après le verbe + la durée.\n' +
      '\n' +
      'Structure sans objet : sujet + verbe + 了 + durée.\n' +
      '- Ex : 他跑了一个小时 (tā pǎo le yí ge xiǎo shí) « il a couru pendant une heure ». Le 了 marque que l\'action de courir est COMPLÈTE.\n' +
      '\n' +
      'Avec un objet, 3 options équivalentes existent :\n' +
      '- Option 1 (répétition du verbe, très orale) : verbe + objet, verbe + 了 + durée. Ex : 我学中文学了两年 (wǒ xué zhōng wén xué le liǎng nián) « j\'ai étudié le chinois pendant 2 ans ».\n' +
      '- Option 2 (durée avant objet) : verbe + 了 + durée + objet. Ex : 我学了两年中文 (wǒ xué le liǎng nián zhōng wén) — équivalent, plus direct.\n' +
      '- Option 3 (avec 的, style « X de Y ») : verbe + 了 + durée + 的 + objet. Ex : 我学了两年的中文 (wǒ xué le liǎng nián de zhōng wén). Sonne comme « 2 ans de chinois ».\n' +
      '\n' +
      'Cas spécial des verbes SÉPARABLES (睡觉, 游泳) : l\'option 3 avec 的 est particulièrement naturelle.\n' +
      '- Ex : 他睡了八个小时的觉 (tā shuì le bā gè xiǎo shí de jiào) « il a dormi 8 heures ». La durée se glisse entre les 2 syllabes du verbe séparable, avec 的.\n' +
      '- Ex : 我游了半个小时的泳 (wǒ yóu le bàn ge xiǎo shí de yǒng) « j\'ai nagé une demi-heure ».\n' +
      '\n' +
      'Les 3 options veulent dire la même chose. À l\'oral, l\'option 1 (répétition) est très fréquente. À l\'écrit, options 2 et 3 sont plus concises.',
    bodyEn:
      'To express how long a COMPLETED past action lasted, use 了 right after the verb + duration. Structure without object: subj + verb + 了 + duration. Ex: 他跑了一个小时 «he ran for an hour». The 了 marks that the running is COMPLETE. With an object, 3 equivalent options exist: Option 1 (verb repetition, very oral): verb + obj, verb + 了 + duration. Ex: 我学中文学了两年 «I studied Chinese for 2 years». Option 2 (duration before object): verb + 了 + duration + obj. Ex: 我学了两年中文 — equivalent, more direct. Option 3 (with 的, «X of Y» style): verb + 了 + duration + 的 + obj. Ex: 我学了两年的中文. Sounds like «2 years of Chinese». Special case of SEPARABLE verbs (睡觉, 游泳): option 3 with 的 is particularly natural. Ex: 他睡了八个小时的觉 «he slept 8 hours». The duration slips between the 2 syllables of the separable verb, with 的. Ex: 我游了半个小时的泳 «I swam for half an hour». The 3 options mean the same thing. In speech, option 1 (repetition) is very frequent. In writing, options 2 and 3 are more concise.',
    items: [
      { hanzi: '了', pinyin: 'le', meaning: 'marqueur d\'action achevée', meaningEn: 'completed action marker', audio: 'audio/hsk1/hsk1_了.wav' },
      { hanzi: '小时', pinyin: 'xiǎo shí', meaning: 'heure (durée)', meaningEn: 'hour (duration)', audio: 'audio/hsk2/hsk2_小时.wav' },
      { hanzi: '分钟', pinyin: 'fēn zhōng', meaning: 'minute (durée)', meaningEn: 'minute (duration)', audio: 'audio/hsk1/hsk1_分钟.wav' },
      { hanzi: '睡觉', pinyin: 'shuì jiào', meaning: 'dormir (verbe séparable)', meaningEn: 'sleep (separable verb)', audio: 'audio/hsk1/hsk1_睡觉.wav' },
      { hanzi: '游泳', pinyin: 'yóu yǒng', meaning: 'nager (verbe séparable)', meaningEn: 'swim (separable verb)', audio: 'audio/hsk2/hsk2_游泳.wav' },
      { hanzi: '跑', pinyin: 'pǎo', meaning: 'courir', meaningEn: 'run', audio: 'audio/hsk2/hsk2_跑.wav' },
      { hanzi: '学', pinyin: 'xué', meaning: 'étudier', meaningEn: 'study', audio: 'audio/hsk1/hsk1_学.wav' }
    ],
    tip:
      'Retiens l\'option 2 (verbe + 了 + durée + objet) comme ta valeur par défaut : c\'est la plus courte et elle marche partout.',
    tipEn:
      'Remember option 2 (verb + 了 + duration + object) as your default: it\'s the shortest and works everywhere.'
  },
  {
    id: 'a2-duration-ongoing-le-final',
    title: 'Durée d\'une situation EN COURS : 了 en fin de phrase',
    titleEn: 'Duration of an ONGOING situation: 了 at end of sentence',
    body:
      'Pour dire « ça fait X temps que... et ÇA CONTINUE encore », on utilise 了 en FIN DE PHRASE. Ce 了 marque un changement d\'état (« on est arrivé à ce point »).\n' +
      '\n' +
      'Structure : sujet + verbe + (objet) + durée + 了. PAS de 了 juste après le verbe cette fois.\n' +
      '- Ex : 我来中国一个月了 (wǒ lái zhōng guó yí ge yuè le) « ça fait un mois que je suis en Chine (et je suis encore là) ». Sens : je suis venu il y a un mois, et j\'y suis toujours.\n' +
      '\n' +
      'Comparaison cruciale entre les 2 positions de 了 :\n' +
      '- 我来了中国 (wǒ lái le zhōng guó) = « je suis venu en Chine » (action passée simple, achevée, on ne sait pas si je suis encore là).\n' +
      '- 我来中国一个月了 = « ça fait un mois que je suis en Chine » (durée + toujours en cours).\n' +
      '\n' +
      'Autres exemples de « ça continue » :\n' +
      '- 我们等他三个小时了 (wǒ men děng tā sān ge xiǎo shí le) « ça fait 3 heures qu\'on l\'attend (et on l\'attend toujours) ».\n' +
      '- 他学中文两年了 (tā xué zhōng wén liǎng nián le) « ça fait 2 ans qu\'il apprend le chinois (et il continue) ».\n' +
      '\n' +
      'Renforcement possible avec 已经 (yǐ jīng) « déjà » devant la durée. Ex : 我已经来中国一个月了 « ça fait DÉJÀ un mois que je suis en Chine ».\n' +
      '\n' +
      'Attention : 了 en fin de phrase est ESSENTIEL. Sans lui, la phrase perd son sens de « ça continue ». 我来中国一个月 tout seul sonne incomplet et bizarre.\n' +
      '\n' +
      'Astuce test rapide :\n' +
      '- « ça fait X et ça continue » → 了 EN FIN.\n' +
      '- « j\'ai fait X pendant Y et c\'est fini » → 了 après le verbe.',
    bodyEn:
      'To say «it\'s been X and IT\'S STILL GOING», use 了 at the END of the sentence. This 了 marks a change of state («we\'ve reached this point»). Structure: subj + verb + (obj) + duration + 了. NO 了 right after the verb this time. Ex: 我来中国一个月了 «it\'s been a month since I came to China (and I\'m still here)». Crucial comparison of the 2 positions of 了: 我来了中国 = «I came to China» (simple past, completed, unclear if still there). 我来中国一个月了 = «it\'s been a month since I came to China» (duration + still ongoing). Other «still going» examples: 我们等他三个小时了 «we\'ve been waiting for him for 3 hours (still waiting)». 他学中文两年了 «it\'s been 2 years he\'s been learning Chinese (still going)». Reinforce with 已经 (yǐ jīng) «already» before the duration. Ex: 我已经来中国一个月了 «it\'s ALREADY been a month since I came to China». Careful: 了 at the end is ESSENTIAL. Without it, the sentence loses its «still going» sense. 我来中国一个月 alone sounds incomplete and weird. Quick test: «it\'s been X and it continues» → 了 AT END. «I did X for Y and it\'s done» → 了 after the verb.',
    items: [
      { hanzi: '了', pinyin: 'le', meaning: 'changement d\'état (en fin)', meaningEn: 'change of state (final)', audio: 'audio/hsk1/hsk1_了.wav' },
      { hanzi: '已经', pinyin: 'yǐ jīng', meaning: 'déjà', meaningEn: 'already', audio: 'audio/hsk2/hsk2_已经.wav' },
      { hanzi: '来', pinyin: 'lái', meaning: 'venir', meaningEn: 'come', audio: 'audio/hsk1/hsk1_来.wav' },
      { hanzi: '等', pinyin: 'děng', meaning: 'attendre', meaningEn: 'wait', audio: 'audio/hsk2/hsk2_等.wav' },
      { hanzi: '中国', pinyin: 'zhōng guó', meaning: 'Chine', meaningEn: 'China', audio: 'audio/hsk1/hsk1_中国.wav' },
      { hanzi: '月', pinyin: 'yuè', meaning: 'mois', meaningEn: 'month', audio: 'audio/hsk1/hsk1_月.wav' },
      { hanzi: '年', pinyin: 'nián', meaning: 'année', meaningEn: 'year', audio: 'audio/hsk1/hsk1_年.wav' }
    ],
    tip:
      'Le 了 final est le pilier. Si tu oublies, ta phrase sonne comme « je viens en Chine un mois » — incomplet. Ferme toujours par 了.',
    tipEn:
      'The final 了 is the pillar. If you drop it, your sentence sounds like «I come China a month» — incomplete. Always close with 了.'
  },
  {
    id: 'a2-duration-frequency-and-difference',
    title: 'Compter des fois : 次/遍/回 et exprimer un écart avec 比',
    titleEn: 'Counting occurrences: 次/遍/回 and expressing a gap with 比',
    body:
      'Compter les OCCURRENCES d\'une action :\n' +
      '- 次 (cì) : mesureur GÉNÉRIQUE pour « fois ». Ex : 我去过那个餐厅三次 (wǒ qù guò nà ge cān tīng sān cì) « je suis allé à ce resto 3 fois ». Souvent avec 过 pour l\'expérience.\n' +
      '- 遍 (biàn) : cycle COMPLET, du début à la fin. Ex : 这本书我看了两遍 (zhè běn shū wǒ kàn le liǎng biàn) « j\'ai lu ce livre 2 fois EN ENTIER ». Différent de 次 qui compte juste les occasions.\n' +
      '- 回 (huí) : synonyme de 次, plus oral et nord-chinois. Ex : 我去过一回 « j\'y suis allé une fois ».\n' +
      '\n' +
      'Position de la fréquence quand il y a un objet — 2 options :\n' +
      '- Après l\'objet : 我去过上海两次 (wǒ qù guò shàng hǎi liǎng cì).\n' +
      '- Avant l\'objet : 我去过两次上海 (wǒ qù guò liǎng cì shàng hǎi). Un peu plus courant en oral.\n' +
      '- Cas des PRONOMS : la fréquence reste juste après le verbe. Ex : 我找了他两次 (wǒ zhǎo le tā liǎng cì) « je l\'ai cherché 2 fois » (correct). PAS 我找了两次他 (incorrect).\n' +
      '\n' +
      'Exprimer un ÉCART dans une comparaison avec 比 : après [A 比 B + adjectif], on ajoute une quantité.\n' +
      '- Écart PETIT : + 一点儿 (yì diǎnr) ou 一些 (yì xiē). Ex : 今天比昨天凉快一点儿 (jīn tiān bǐ zuó tiān liáng kuài yì diǎnr) « il fait un peu plus frais qu\'hier ».\n' +
      '- Écart GRAND : + 得多 (de duō) ou 多了 (duō le). Ex : 她的中文比我流利得多 (tā de zhōng wén bǐ wǒ liú lì de duō) « son chinois est beaucoup plus fluide que le mien ». Ex : 流利多了 (même sens, formulation orale).\n' +
      '- Écart PRÉCIS (chiffré) : directement après l\'adjectif. Ex : 我比弟弟大两岁 (wǒ bǐ dì di dà liǎng suì) « j\'ai 2 ans de plus que mon petit frère ». Ex : 贵十块钱 (guì shí kuài qián) « plus cher de 10 yuan ».\n' +
      '- Sans 比 explicite : marche si le contexte est clair. Ex : 昨天很热，今天凉快一些 « hier il faisait chaud, aujourd\'hui c\'est un peu plus frais ».\n' +
      '\n' +
      'Règle d\'or : la quantité vient TOUJOURS APRÈS l\'adjectif dans les comparaisons. Jamais « 比 B 一点儿 adjectif ».',
    bodyEn:
      'Counting OCCURRENCES: 次 (cì): GENERIC measure word for «times». Ex: 我去过那个餐厅三次 «I\'ve been to that restaurant 3 times». Often with 过 for experience. 遍 (biàn): COMPLETE cycle, from start to finish. Ex: 这本书我看了两遍 «I read this book 2 times through». Different from 次 which just counts occasions. 回 (huí): synonym of 次, more oral and northern. Ex: 我去过一回 «I\'ve been there once». Position of frequency with an object — 2 options: After the object: 我去过上海两次. Before the object: 我去过两次上海. A bit more common in speech. PRONOUN case: frequency stays right after the verb. Ex: 我找了他两次 «I looked for him twice» (correct). NOT 我找了两次他 (wrong). Expressing a GAP in 比 comparisons: after [A 比 B + adjective], add a quantity. SMALL gap: + 一点儿 (yì diǎnr) or 一些 (yì xiē). Ex: 今天比昨天凉快一点儿 «it\'s a bit cooler today than yesterday». BIG gap: + 得多 (de duō) or 多了 (duō le). Ex: 她的中文比我流利得多 «her Chinese is much more fluent than mine». Ex: 流利多了 (same meaning, more oral). PRECISE gap (with number): directly after the adjective. Ex: 我比弟弟大两岁 «I\'m 2 years older than my little brother». Ex: 贵十块钱 «more expensive by 10 yuan». Without explicit 比: works if context is clear. Ex: 昨天很热，今天凉快一些 «yesterday was hot, today is a bit cooler». Golden rule: the quantity ALWAYS comes AFTER the adjective in comparisons. Never «比 B 一点儿 adjective».',
    items: [
      { hanzi: '次', pinyin: 'cì', meaning: 'fois (générique)', meaningEn: 'time(s) (generic)', audio: 'audio/hsk2/hsk2_次.wav' },
      { hanzi: '遍', pinyin: 'biàn', meaning: 'fois (cycle complet)', meaningEn: 'time(s) (full cycle)', audio: 'audio/hsk4/hsk4_遍.wav' },
      { hanzi: '回', pinyin: 'huí', meaning: 'fois (oral, nord)', meaningEn: 'time(s) (oral, northern)', audio: 'audio/hsk1/hsk1_回.wav' },
      { hanzi: '一点儿', pinyin: 'yì diǎnr', meaning: 'un peu (petit écart)', meaningEn: 'a bit (small gap)', audio: 'audio/hsk1/hsk1_一点儿.wav' },
      { hanzi: '得多', pinyin: 'de duō', meaning: 'beaucoup plus (écart grand)', meaningEn: 'much more (big gap)', audio: 'audio/hsk3/hsk3_多.wav' },
      { hanzi: '多了', pinyin: 'duō le', meaning: 'beaucoup plus (oral)', meaningEn: 'much more (oral)', audio: 'audio/hsk3/hsk3_多.wav' },
      { hanzi: '一些', pinyin: 'yì xiē', meaning: 'un peu, quelques', meaningEn: 'a bit, some', audio: 'audio/hsk2/hsk2_一些.wav' },
      { hanzi: '比', pinyin: 'bǐ', meaning: 'comparé à', meaningEn: 'compared to', audio: 'audio/hsk2/hsk2_比.wav' }
    ],
    tip:
      'Pense « adjectif D\'ABORD, quantité APRÈS ». Si tu dis 比他一点儿高, c\'est mort. Dis 比他高一点儿.',
    tipEn:
      'Think «adjective FIRST, quantity AFTER». Say 比他一点儿高 and you\'re toast. Say 比他高一点儿.'
  }
];

// ═════════════════════════════════════════════════════════════════════════════
// A2 Nuances — Dire « ça dépend » en conversation — CGG #94 (informel)
// 看 / 要看 / 得看 / 看情况 : la boîte à outils orale pour ne pas trancher.
// ═════════════════════════════════════════════════════════════════════════════

export const a2NuancesItDependsInformalLearnSections: LessonV2LearnSection[] = [
  {
    id: 'a2-depends-kan-basics',
    title: '看 / 要看 / 得看 : la base de « ça dépend »',
    titleEn: '看 / 要看 / 得看: the base for « it depends »',
    body:
      'Pour dire « ça dépend », le chinois oral s\'appuie sur le verbe 看 (kàn, « voir / regarder »). L\'idée : « il faut voir [tel facteur] ». La structure est très régulière.\n' +
      '\n' +
      'Structure de base : (这 / 那) + 看 / 要看 / 得看 + [facteur].\n' +
      '- 要看 (yào kàn) est le choix par défaut, ton neutre. C\'est la version que tu peux placer partout.\n' +
      '- 得看 (děi kàn) ajoute une emphase : « il FAUT voir… ». Un poil plus insistant, comme si tu voulais rappeler à ton interlocuteur qu\'un facteur pèse.\n' +
      '- 看 tout seul est très oral, familier, presque un haussement d\'épaule verbal.\n' +
      '\n' +
      'Exemples :\n' +
      '- 这事要看老板怎么说 (zhè shì yào kàn lǎo bǎn zěn me shuō) « ça dépend de ce que dit le patron ».\n' +
      '- 那得看天气怎么样 (nà děi kàn tiān qì zěn me yàng) « ça dépend de la météo ».\n' +
      '- 看时间吧 (kàn shí jiān ba) « bof, ça dépend du timing ».\n' +
      '\n' +
      'Registre : décontracté à neutre. Ces trois formes couvrent 80 % des situations orales quotidiennes entre collègues, amis, famille.',
    bodyEn:
      'To say « it depends », spoken Chinese leans on the verb 看 (kàn, « to see / to look »). The idea: « we have to see [such factor] ». The structure is very regular.\n' +
      '\n' +
      'Base structure: (这 / 那) + 看 / 要看 / 得看 + [factor].\n' +
      '- 要看 (yào kàn) is the neutral default. You can drop it anywhere.\n' +
      '- 得看 (děi kàn) adds emphasis: « we MUST see… ». A touch more insistent, as if to remind the listener a factor weighs in.\n' +
      '- 看 alone is very oral, casual, almost a verbal shrug.\n' +
      '\n' +
      'Examples:\n' +
      '- 这事要看老板怎么说 « it depends on what the boss says ».\n' +
      '- 那得看天气怎么样 « it depends on the weather ».\n' +
      '- 看时间吧 « meh, depends on the timing ».\n' +
      '\n' +
      'Register: casual to neutral. These three forms cover 80% of daily oral situations with coworkers, friends, family.',
    items: [
      { hanzi: '看', pinyin: 'kàn', meaning: 'voir, dépendre de', meaningEn: 'to see, depend on', audio: 'audio/hsk1/hsk1_看.wav' },
      { hanzi: '要看', pinyin: 'yào kàn', meaning: 'ça dépend (neutre)', meaningEn: 'it depends (neutral)', audio: 'audio/hsk1/hsk1_看.wav' },
      { hanzi: '得看', pinyin: 'děi kàn', meaning: 'il FAUT voir (emphase)', meaningEn: 'we MUST see (emphasis)', audio: 'audio/hsk1/hsk1_看.wav' },
      { hanzi: '老板', pinyin: 'lǎo bǎn', meaning: 'patron', meaningEn: 'boss', audio: 'audio/hsk2/hsk2_老板.wav' },
      { hanzi: '天气', pinyin: 'tiān qì', meaning: 'météo', meaningEn: 'weather', audio: 'audio/hsk1/hsk1_天气.wav' },
      { hanzi: '时间', pinyin: 'shí jiān', meaning: 'temps, timing', meaningEn: 'time, timing', audio: 'audio/hsk1/hsk1_时间.wav' }
    ],
    tip:
      'Astuce : 看 seul en réponse fonctionne comme un haussement d\'épaule. « 看时间吧 » = « bof, ça dépend du timing ». Court, oral, super pratique.',
    tipEn:
      'Tip: bare 看 as an answer works like a verbal shrug. «看时间吧» = «meh, depends on the timing». Short, oral, super handy.'
  },
  {
    id: 'a2-depends-kan-qingkuang',
    title: '看情况 : la réponse évasive par excellence',
    titleEn: '看情况: the go-to evasive answer',
    body:
      '看情况 (kàn qíng kuàng) littéralement « voir la situation ». C\'est LA réponse autonome ultra fréquente pour éluder une question sans dire non.\n' +
      '\n' +
      'Utilisation :\n' +
      '- Réponse en un mot, sans complément. Ex : — 你周末来吗 ? — 看情况. « Tu viens ce weekend ? — Ça dépend. »\n' +
      '- Ajoute 吧 pour adoucir encore : 看情况吧 (kàn qíng kuàng ba). Le 吧 fait « on verra bien, pas d\'engagement ».\n' +
      '- Version étendue : 看情况再说 (kàn qíng kuàng zài shuō) « on verra selon les circonstances / on en reparlera plus tard ». Manière polie de reporter la décision.\n' +
      '\n' +
      'Exemples en contexte :\n' +
      '- 周末去不去，看情况吧 (zhōu mò qù bú qù, kàn qíng kuàng ba) « on y va ce weekend ? ça dépend ».\n' +
      '- 我明天能不能来，看情况再说 « je pourrai venir demain ou pas, ça dépendra des circonstances ».\n' +
      '\n' +
      'Registre : neutre-décontracté. Marche même en situation semi-polie (avec un supérieur pas trop rigide, un client familier). En contexte très formel, on lui préfère les patterns B1.2 (取决于, 视…而定).',
    bodyEn:
      '看情况 (kàn qíng kuàng) literally « to see the situation ». THE super common standalone response to dodge a question without saying no.\n' +
      '\n' +
      'Usage:\n' +
      '- One-word reply, no complement. Ex: — 你周末来吗? — 看情况. « Coming this weekend? — Depends. »\n' +
      '- Add 吧 to soften further: 看情况吧. The 吧 says « we\'ll see, no commitment ».\n' +
      '- Extended version: 看情况再说 « we\'ll see according to circumstances / we\'ll discuss later ». Polite way to postpone a decision.\n' +
      '\n' +
      'Examples in context:\n' +
      '- 周末去不去，看情况吧 « are we going this weekend? depends ».\n' +
      '- 我明天能不能来，看情况再说 « whether I can come tomorrow depends on how things go ».\n' +
      '\n' +
      'Register: neutral-casual. Works even in semi-polite settings (with a chill boss, a familiar client). In very formal contexts, prefer B1.2 patterns (取决于, 视…而定).',
    items: [
      { hanzi: '看情况', pinyin: 'kàn qíng kuàng', meaning: 'ça dépend', meaningEn: 'it depends', audio: 'audio/hsk3/hsk3_情况.wav' },
      { hanzi: '情况', pinyin: 'qíng kuàng', meaning: 'situation, circonstances', meaningEn: 'situation, circumstances', audio: 'audio/hsk3/hsk3_情况.wav' },
      { hanzi: '吧', pinyin: 'ba', meaning: 'particule d\'adoucissement', meaningEn: 'softening particle', audio: 'audio/hsk1/hsk1_吧.wav' },
      { hanzi: '再说', pinyin: 'zài shuō', meaning: 'on en reparlera', meaningEn: 'we\'ll see later', audio: 'audio/hsk2/hsk2_再说.wav' },
      { hanzi: '周末', pinyin: 'zhōu mò', meaning: 'weekend', meaningEn: 'weekend', audio: 'audio/hsk2/hsk2_周末.wav' }
    ],
    tip:
      'Astuce : à utiliser quand tu n\'as pas envie de trancher tout de suite. 看情况吧 est aussi une formule d\'attente polie — comme « on verra » en français.',
    tipEn:
      'Tip: use when you don\'t want to commit right away. 看情况吧 is also a polite delaying formula — like «we\'ll see» in English.'
  },
  {
    id: 'a2-depends-kan-person-clause',
    title: '看 + personne / clause : « c\'est toi qui vois »',
    titleEn: '看 + person / clause: «you decide»',
    body:
      'Deuxième famille de constructions : 看 suivi d\'une personne ou d\'une clause avec question embarquée.\n' +
      '\n' +
      'Cas 1 : 看 + pronom (你 / 他 / 大家) = « c\'est [X] qui décide ».\n' +
      '- Ex : 今晚吃什么，看你 (jīn wǎn chī shén me, kàn nǐ) « ce qu\'on mange ce soir, c\'est toi qui vois ».\n' +
      '- Extensions courantes : 看你决定 (kàn nǐ jué dìng) « à toi de décider », 看你自己定 (kàn nǐ zì jǐ dìng) « décide toi-même ».\n' +
      '- Très pratique pour renvoyer poliment la balle sans passer pour indécis.\n' +
      '\n' +
      'Cas 2 : 看 + clause avec question embarquée. La clause est souvent une question du type « bien ou pas bien / d\'accord ou pas ». Le 看 fait le pont vers l\'incertitude : pas besoin d\'un mot pour « si ».\n' +
      '- Ex : 去不去看天气好不好 (qù bú qù kàn tiān qì hǎo bù hǎo) « on y va ou pas ? ça dépend s\'il fait beau ».\n' +
      '- Ex : 看他愿不愿意 (kàn tā yuàn bú yuàn yì) « ça dépend s\'il est d\'accord ».\n' +
      '- Ex : 看你想看什么 (kàn nǐ xiǎng kàn shén me) « ça dépend de ce que tu veux regarder ».\n' +
      '- Ex : 能不能成功，就看他自己了 (néng bù néng chéng gōng, jiù kàn tā zì jǐ le) « la réussite dépend de lui ». Le 就…了 encadre et renforce.\n' +
      '\n' +
      'Ces deux cas cohabitent souvent : on renvoie à une personne ET on précise la variable à trancher.',
    bodyEn:
      'Second family: 看 followed by a person or an embedded-question clause.\n' +
      '\n' +
      'Case 1: 看 + pronoun (你 / 他 / 大家) = « [X] decides ».\n' +
      '- Ex: 今晚吃什么，看你 « what we eat tonight, you decide ».\n' +
      '- Common extensions: 看你决定 « up to you », 看你自己定 « decide for yourself ».\n' +
      '- Handy to politely bounce the ball without looking indecisive.\n' +
      '\n' +
      'Case 2: 看 + clause with embedded question. The clause is often an A-not-A question. The 看 bridges to uncertainty: no need for a word for « whether ».\n' +
      '- Ex: 去不去看天气好不好 « whether we go depends on the weather ».\n' +
      '- Ex: 看他愿不愿意 « depends whether he\'s willing ».\n' +
      '- Ex: 看你想看什么 « depends what you want to watch ».\n' +
      '- Ex: 能不能成功，就看他自己了 « success depends on him ». 就…了 frames and reinforces.\n' +
      '\n' +
      'Both cases often coexist: bounce to a person AND spell out the variable.',
    items: [
      { hanzi: '看你', pinyin: 'kàn nǐ', meaning: 'c\'est toi qui vois', meaningEn: 'up to you', audio: 'audio/hsk1/hsk1_看.wav' },
      { hanzi: '看你决定', pinyin: 'kàn nǐ jué dìng', meaning: 'à toi de décider', meaningEn: 'you decide', audio: 'audio/hsk3/hsk3_决定.wav' },
      { hanzi: '决定', pinyin: 'jué dìng', meaning: 'décider', meaningEn: 'decide', audio: 'audio/hsk3/hsk3_决定.wav' },
      { hanzi: '愿意', pinyin: 'yuàn yì', meaning: 'être d\'accord, vouloir bien', meaningEn: 'be willing', audio: 'audio/hsk3/hsk3_愿意.wav' },
      { hanzi: '成功', pinyin: 'chéng gōng', meaning: 'réussir', meaningEn: 'succeed', audio: 'audio/hsk4/hsk4_成功.wav' },
      { hanzi: '自己', pinyin: 'zì jǐ', meaning: 'soi-même', meaningEn: 'oneself', audio: 'audio/hsk2/hsk2_自己.wav' }
    ],
    tip:
      'Astuce : le 看 fait le pont vers l\'incertitude — pas besoin d\'un mot pour « si » (whether). 看他愿不愿意 = « ça dépend s\'il est d\'accord ». Économique.',
    tipEn:
      'Tip: 看 bridges to uncertainty — no need for a word for «whether». 看他愿不愿意 = «depends whether he agrees». Economical.'
  },
  {
    id: 'a2-depends-context-and-playful',
    title: '看场合 / 对象 / 时机 + 不一定 + 看缘分 / 心情 (ton oral)',
    titleEn: '看场合 / 对象 / 时机 + 不一定 + 看缘分 / 心情 (oral tone)',
    body:
      'Troisième famille : 看 + nom de facteur. Structure ultra productive — apprends la formule, remplace le nom selon le contexte.\n' +
      '\n' +
      'Facteurs sociaux et contextuels :\n' +
      '- 看场合 (kàn chǎng hé) « ça dépend de l\'occasion ». Utile pour parler de codes vestimentaires, ton, humour.\n' +
      '- 看对象 (kàn duì xiàng) « ça dépend de la personne ». Ex : 说不说实话看对象 (shuō bù shuō shí huà kàn duì xiàng) « on dit la vérité ou pas selon la personne ».\n' +
      '- 看时机 (kàn shí jī) « ça dépend du timing / du moment opportun ». Plus stratégique que 看时间.\n' +
      '\n' +
      'Facteurs institutionnels (bureau, école) :\n' +
      '- 看政策 (kàn zhèng cè) « ça dépend du règlement / de la politique ».\n' +
      '- 看规定 (kàn guī dìng) « ça dépend des règles ».\n' +
      '- 看指标 (kàn zhǐ biāo) « ça dépend des objectifs ». Ex : 奖金多少看指标 (jiǎng jīn duō shao kàn zhǐ biāo) « le montant du bonus dépend des objectifs ».\n' +
      '\n' +
      'Alternatives sans expliciter le facteur :\n' +
      '- 不一定 (bù yí dìng) « pas forcément ». Exprime l\'incertitude sans dire ce qui la cause.\n' +
      '- 说不准 (shuō bù zhǔn) « difficile à dire ». Nuance de « je ne peux pas être catégorique ».\n' +
      '\n' +
      'Registre humoristique (à réserver aux amis) :\n' +
      '- 看缘分 (kàn yuán fèn) « ça dépend du destin ». Pour parler d\'amour, de chance, de rencontres. Ton semi-ironique.\n' +
      '- 看心情 (kàn xīn qíng) « ça dépend de mon humeur ». Blague classique entre amis. À NE JAMAIS utiliser avec un chef ou dans un contexte pro — ça sonne caprice.\n' +
      '- Ex : 明天去不去郊游，看心情吧 (míng tiān qù bú qù jiāo yóu, kàn xīn qíng ba) « demain on va se balader ? ça dépend de mon humeur ».',
    bodyEn:
      'Third family: 看 + factor noun. Super productive structure — learn the pattern, swap the noun for context.\n' +
      '\n' +
      'Social / contextual factors:\n' +
      '- 看场合 (kàn chǎng hé) « depends on the occasion ». Handy for dress codes, tone, humor.\n' +
      '- 看对象 (kàn duì xiàng) « depends on the person ». Ex: 说不说实话看对象 « whether we tell the truth depends on the person ».\n' +
      '- 看时机 (kàn shí jī) « depends on timing / the right moment ». More strategic than 看时间.\n' +
      '\n' +
      'Institutional factors (work, school):\n' +
      '- 看政策 « depends on policy ».\n' +
      '- 看规定 « depends on the rules ».\n' +
      '- 看指标 « depends on the targets ». Ex: 奖金多少看指标 « the bonus amount depends on the targets ».\n' +
      '\n' +
      'Without spelling out the factor:\n' +
      '- 不一定 (bù yí dìng) « not necessarily ». Expresses uncertainty without naming its cause.\n' +
      '- 说不准 (shuō bù zhǔn) « hard to say ». Nuance of « I can\'t be definite ».\n' +
      '\n' +
      'Playful register (friends only):\n' +
      '- 看缘分 (kàn yuán fèn) « depends on fate ». For love, luck, chance encounters. Semi-ironic tone.\n' +
      '- 看心情 (kàn xīn qíng) « depends on my mood ». Classic joke among friends. NEVER use with a boss or in a pro setting — sounds bratty.\n' +
      '- Ex: 明天去不去郊游，看心情吧 « are we hiking tomorrow? depends on my mood ».',
    items: [
      { hanzi: '看场合', pinyin: 'kàn chǎng hé', meaning: 'selon l\'occasion', meaningEn: 'depends on the occasion', audio: 'audio/hsk5/hsk5_场合.wav' },
      { hanzi: '看对象', pinyin: 'kàn duì xiàng', meaning: 'selon la personne', meaningEn: 'depends on the person', audio: 'audio/hsk4/hsk4_对象.wav' },
      { hanzi: '看时机', pinyin: 'kàn shí jī', meaning: 'selon le timing', meaningEn: 'depends on the timing', audio: 'audio/hsk5/hsk5_时机.wav' },
      { hanzi: '不一定', pinyin: 'bù yí dìng', meaning: 'pas forcément', meaningEn: 'not necessarily', audio: 'audio/hsk3/hsk3_一定.wav' },
      { hanzi: '说不准', pinyin: 'shuō bù zhǔn', meaning: 'difficile à dire', meaningEn: 'hard to say', audio: 'audio/hsk1/hsk1_说.wav' },
      { hanzi: '看缘分', pinyin: 'kàn yuán fèn', meaning: 'selon le destin', meaningEn: 'depends on fate', audio: 'audio/hsk6/hsk6_缘分.wav' },
      { hanzi: '看心情', pinyin: 'kàn xīn qíng', meaning: 'selon mon humeur', meaningEn: 'depends on my mood', audio: 'audio/hsk4/hsk4_心情.wav' },
      { hanzi: '心情', pinyin: 'xīn qíng', meaning: 'humeur, état d\'esprit', meaningEn: 'mood', audio: 'audio/hsk4/hsk4_心情.wav' }
    ],
    tip:
      'Astuce : 看 + noun est très productif — apprends la structure et remplace le nom selon le contexte. Mais garde 看心情 et 看缘分 pour les amis, jamais pour le chef.',
    tipEn:
      'Tip: 看 + noun is very productive — learn the pattern and swap the noun by context. But keep 看心情 and 看缘分 for friends, never for the boss.'
  }
];

// ═════════════════════════════════════════════════════════════════════════════
// cecr-a2-grammar-m8 — Particules finales (base) : 吗, 呢, 吧, 啊, 啦, 的
// ═════════════════════════════════════════════════════════════════════════════
export const a2GrammarSentenceParticlesLearnSections: LessonV2LearnSection[] = [
  {
    id: 'a2-particle-ma-ne-ba',
    title: '吗, 呢, 吧 : les 3 particules essentielles',
    titleEn: '吗, 呢, 吧: the 3 essential particles',
    body:
      'Les particules finales ne changent PAS le sens de base, mais elles CHANGENT LE TON. Sans elles, ton chinois sonne robotique.\n' +
      '\n' +
      '吗 (ma) : transforme une phrase affirmative en QUESTION oui/non. Neutre, marche partout.\n' +
      '- Structure : [affirmation] + 吗 ?\n' +
      '- Ex : 你是学生 (« tu es étudiant ») → 你是学生吗 ? (nǐ shì xué shēng ma) « tu es étudiant ? ».\n' +
      '- Ex : 你饿了吗 ? (nǐ è le ma) « tu as faim ? ».\n' +
      '- Variante mignonne : 么 (ma, même prononciation, ton neutre) plus doux, populaire en texto/SMS. Pas en formel. Ex : 你饿了么 ? (« t\'as faim, dis ? »).\n' +
      '\n' +
      '呢 (ne) : particule multi-fonctions. 3 usages principaux :\n' +
      '- Renvoyer une question (« et toi ? ») : « 我很好，你呢 ? » « ça va, et toi ? ».\n' +
      '- Marquer une action EN COURS : 他睡觉呢 (tā shuì jiào ne) « il dort en ce moment ».\n' +
      '- Rendre une question réfléchie : 我该怎么办呢 ? (wǒ gāi zěn me bàn ne) « qu\'est-ce que je dois faire, moi ? ».\n' +
      '\n' +
      '吧 (ba) : ADOUCIT un ordre en SUGGESTION. Aussi pour SUPPOSER.\n' +
      '- Ex : 我们一起去吧 (wǒmen yì qǐ qù ba) « allons-y ensemble ! » (invitation, pas ordre).\n' +
      '- Ex : 你是老师吧 ? (nǐ shì lǎo shī ba) « tu es prof, non ? » (supposition).',
    bodyEn:
      'Sentence-final particles do NOT change core meaning, but they CHANGE THE TONE. Without them, your Chinese sounds robotic.\n' +
      '\n' +
      '吗 (ma): turns an affirmative sentence into a yes/no QUESTION. Neutral, works everywhere.\n' +
      '- Structure: [statement] + 吗 ?\n' +
      '- Ex: 你是学生 → 你是学生吗? « are you a student? ».\n' +
      '- Ex: 你饿了吗? « are you hungry? ».\n' +
      '- Cute variant: 么 (ma) softer, popular in texting. Not for formal use.\n' +
      '\n' +
      '呢 (ne): multi-function particle. 3 main uses:\n' +
      '- Bounce a question back (« and you? »): « 我很好，你呢? » « I\'m fine, and you? ».\n' +
      '- Mark an ONGOING action: 他睡觉呢 « he\'s sleeping right now ».\n' +
      '- Make a question reflective: 我该怎么办呢? « what should I do, hmm? ».\n' +
      '\n' +
      '吧 (ba): SOFTENS an order into a SUGGESTION. Also for GUESSING.\n' +
      '- Ex: 我们一起去吧 « let\'s go together! » (invitation, not command).\n' +
      '- Ex: 你是老师吧? « you\'re a teacher, right? » (guess).',
    items: [
      { hanzi: '吗', pinyin: 'ma', meaning: 'particule question oui/non', meaningEn: 'yes/no question particle', audio: 'audio/hsk1/hsk1_吗.wav' },
      { hanzi: '么', pinyin: 'ma', meaning: 'variante mignonne de 吗', meaningEn: 'cute variant of 吗', audio: 'audio/hsk1/hsk1_吗.wav' },
      { hanzi: '呢', pinyin: 'ne', meaning: 'et toi ? / en cours / réflexion', meaningEn: 'and you? / ongoing / reflective', audio: 'audio/hsk1/hsk1_呢.wav' },
      { hanzi: '吧', pinyin: 'ba', meaning: 'suggestion, supposition', meaningEn: 'suggestion, guess', audio: 'audio/hsk2/hsk2_吧.wav' },
      { hanzi: '你饿了吗', pinyin: 'nǐ è le ma', meaning: 'tu as faim ?', meaningEn: 'are you hungry?', audio: 'audio/hsk3/hsk3_饿.wav' },
      { hanzi: '你呢', pinyin: 'nǐ ne', meaning: 'et toi ?', meaningEn: 'and you?', audio: 'audio/hsk1/hsk1_呢.wav' },
      { hanzi: '我们一起去吧', pinyin: 'wǒ men yī qǐ qù ba', meaning: 'allons-y ensemble !', meaningEn: 'let\'s go together!', audio: 'audio/hsk1/hsk1_一起.wav' },
      { hanzi: '你是老师吧', pinyin: 'nǐ shì lǎo shī ba', meaning: 'tu es prof, non ?', meaningEn: 'you\'re a teacher, right?', audio: 'audio/hsk1/hsk1_老师.wav' }
    ],
    tip:
      'Astuce : sans particules finales, ton chinois sonne comme un robot. Avec elles, tu montes d\'un niveau en fluidité immédiatement.',
    tipEn:
      'Tip: without sentence-final particles, your Chinese sounds robotic. With them, your fluency jumps a level instantly.'
  },
  {
    id: 'a2-particle-a-la-emotional',
    title: '啊/呀/哇/哪 et 啦 : émotion et urgence',
    titleEn: '啊/呀/哇/哪 and 啦: emotion and urgency',
    body:
      '啊 (a) : particule d\'émotion universelle. Adoucit, exprime enthousiasme, surprise, chaleur.\n' +
      '- Ex : 今天天气真好啊 ! (jīn tiān tiān qì zhēn hǎo a) « le temps est vraiment super aujourd\'hui ! ».\n' +
      '- Ex : 好啊 ! (hǎo a) « OK ! d\'accord ! » (avec chaleur).\n' +
      '\n' +
      'Règle de sandhi : 啊 change de forme selon le son qui précède, pour la fluidité.\n' +
      '- Après voyelle a/o/e/i/ü → 呀 (ya). Ex : 真是小孩子呀 ! (zhēn shì xiǎo hái zi ya) « quel gamin ! ».\n' +
      '- Après u → 哇 (wa). Ex : 真苦哇 ! (zhēn kǔ wa) « c\'est vraiment amer ! ».\n' +
      '- Après n → 哪 (na). Ex : 真好看哪 ! (zhēn hǎo kàn na) « c\'est vraiment beau ! ».\n' +
      '\n' +
      'Ces 4 formes (啊/呀/哇/哪) sont FONCTIONNELLEMENT IDENTIQUES. Seule la prononciation change.\n' +
      '\n' +
      '啦 (la) : fusion de 了 + 啊. Exprime URGENCE, FINALITÉ ou IMPATIENCE avec chaleur.\n' +
      '- Ex : 快点啦 ! (kuài diǎn la) « dépêche-toi ! » (impatience amicale).\n' +
      '- Ex : 我们要迟到啦 ! (wǒmen yào chí dào la) « on va être en retard ! ».\n' +
      '- Ex : 好啦好啦 (hǎo la hǎo la) « ok ok c\'est bon ! » (résignation amusée).',
    bodyEn:
      '啊 (a): universal emotion particle. Softens, expresses enthusiasm, surprise, warmth.\n' +
      '- Ex: 今天天气真好啊! « the weather is really nice today! ».\n' +
      '- Ex: 好啊! « OK, sure! » (warmly).\n' +
      '\n' +
      'Sandhi rule: 啊 morphs based on the preceding sound, for fluency.\n' +
      '- After vowel a/o/e/i/ü → 呀 (ya). Ex: 真是小孩子呀! « what a kid! ».\n' +
      '- After u → 哇 (wa). Ex: 真苦哇! « it\'s really bitter! ».\n' +
      '- After n → 哪 (na). Ex: 真好看哪! « it\'s really beautiful! ».\n' +
      '\n' +
      'These 4 forms (啊/呀/哇/哪) are FUNCTIONALLY IDENTICAL. Only pronunciation changes.\n' +
      '\n' +
      '啦 (la): fusion of 了 + 啊. Expresses URGENCY, FINALITY or WARM IMPATIENCE.\n' +
      '- Ex: 快点啦! « hurry up! » (friendly impatience).\n' +
      '- Ex: 我们要迟到啦! « we\'re gonna be late! ».\n' +
      '- Ex: 好啦好啦 « ok ok that\'s enough! » (amused resignation).',
    items: [
      { hanzi: '啊', pinyin: 'a', meaning: 'particule d\'émotion universelle', meaningEn: 'universal emotion particle', audio: 'audio/hsk1/hsk1_啊.wav' },
      { hanzi: '呀', pinyin: 'ya', meaning: 'variante de 啊 après voyelle', meaningEn: 'variant of 啊 after vowel', audio: 'audio/hsk1/hsk1_啊.wav' },
      { hanzi: '哇', pinyin: 'wa', meaning: 'variante de 啊 après u', meaningEn: 'variant of 啊 after u', audio: 'audio/hsk1/hsk1_啊.wav' },
      { hanzi: '哪', pinyin: 'na', meaning: 'variante de 啊 après n', meaningEn: 'variant of 啊 after n', audio: 'audio/hsk1/hsk1_啊.wav' },
      { hanzi: '啦', pinyin: 'la', meaning: 'urgence + chaleur (了 + 啊)', meaningEn: 'urgency + warmth (了 + 啊)', audio: 'audio/hsk1/hsk1_了.wav' },
      { hanzi: '好啊', pinyin: 'hǎo a', meaning: 'OK ! d\'accord !', meaningEn: 'OK! sure!', audio: 'audio/hsk1/hsk1_好.wav' },
      { hanzi: '快点啦', pinyin: 'kuài diǎn la', meaning: 'dépêche-toi !', meaningEn: 'hurry up!', audio: 'audio/hsk2/hsk2_快.wav' },
      { hanzi: '好啦好啦', pinyin: 'hǎo la hǎo la', meaning: 'ok ok c\'est bon !', meaningEn: 'ok ok, enough!', audio: 'audio/hsk1/hsk1_好.wav' }
    ],
    tip:
      'Astuce : à l\'oral, glisse un 啊 ou un 啦 chaque fois que tu veux sonner naturel. Si tu ne les utilises jamais, ton chinois sonne trop mécanique.',
    tipEn:
      'Tip: in speech, drop in a 啊 or a 啦 whenever you want to sound natural. Never using them makes your Chinese too mechanical.'
  },
  {
    id: 'a2-particle-de-certitude',
    title: '的 en fin de phrase : la certitude',
    titleEn: '的 at sentence end: certainty',
    body:
      'Attention : 的 (de) a de multiples usages (possession, adjectifs). Ici on parle du 的 DE FIN DE PHRASE, qui exprime CERTITUDE ou RASSURANCE.\n' +
      '\n' +
      'Sens : « pour sûr / c\'est garanti / je te le promets ».\n' +
      '\n' +
      'Souvent avec des modaux 会 (huì) ou 能 (néng).\n' +
      '\n' +
      'Structure : [affirmation avec 会/能/一定] + 的.\n' +
      '- Ex : 你一定会成功的 (nǐ yí dìng huì chéng gōng de) « tu vas réussir, c\'est sûr ! » (encouragement fort).\n' +
      '- Ex : 别担心，我们会按时到家的 (bié dān xīn, wǒmen huì àn shí dào jiā de) « t\'en fais pas, on rentrera à l\'heure, promis ».\n' +
      '- Ex : 他会来的 (tā huì lái de) « il va venir, tu peux compter dessus ».\n' +
      '\n' +
      'Sans le 的 final, la phrase est correcte mais moins RASSURANTE. Avec 的, tu ajoutes une couche de conviction.\n' +
      '\n' +
      'Différence avec le pattern 是...的 (qui insiste sur une info spécifique — cf. leçon B1.1). Ici, 的 est SEUL en fin de phrase, sans 是.',
    bodyEn:
      'Careful: 的 (de) has multiple uses (possession, adjectives). Here we focus on SENTENCE-FINAL 的, which expresses CERTAINTY or REASSURANCE.\n' +
      '\n' +
      'Meaning: « for sure / it\'s guaranteed / I promise you ».\n' +
      '\n' +
      'Often used with modals 会 (huì) or 能 (néng).\n' +
      '\n' +
      'Structure: [statement with 会/能/一定] + 的.\n' +
      '- Ex: 你一定会成功的 « you\'ll succeed, for sure! » (strong encouragement).\n' +
      '- Ex: 别担心，我们会按时到家的 « don\'t worry, we\'ll get home on time, promise ».\n' +
      '- Ex: 他会来的 « he will come, you can count on it ».\n' +
      '\n' +
      'Without final 的, the sentence is correct but less REASSURING. With 的, you add a layer of conviction.\n' +
      '\n' +
      'Different from the 是...的 pattern (which stresses a specific piece of info — see B1.1 lesson). Here, 的 stands ALONE at sentence end, without 是.',
    items: [
      { hanzi: '的', pinyin: 'de', meaning: 'particule de certitude (en fin de phrase)', meaningEn: 'certainty particle (sentence-final)', audio: 'audio/hsk1/hsk1_的.wav' },
      { hanzi: '会', pinyin: 'huì', meaning: 'modal : va, sera capable de', meaningEn: 'modal: will, be able to', audio: 'audio/hsk1/hsk1_会.wav' },
      { hanzi: '能', pinyin: 'néng', meaning: 'modal : pouvoir, être capable', meaningEn: 'modal: can, be able to', audio: 'audio/hsk1/hsk1_能.wav' },
      { hanzi: '一定', pinyin: 'yí dìng', meaning: 'certainement, à coup sûr', meaningEn: 'certainly, definitely', audio: 'audio/hsk3/hsk3_一定.wav' },
      { hanzi: '成功', pinyin: 'chéng gōng', meaning: 'réussir', meaningEn: 'succeed', audio: 'audio/hsk4/hsk4_成功.wav' },
      { hanzi: '你一定会成功的', pinyin: 'nǐ yí dìng huì chéng gōng de', meaning: 'tu vas réussir, c\'est sûr !', meaningEn: 'you\'ll succeed, for sure!', audio: 'audio/hsk4/hsk4_成功.wav' },
      { hanzi: '他会来的', pinyin: 'tā huì lái de', meaning: 'il va venir, promis', meaningEn: 'he will come, promise', audio: 'audio/hsk1/hsk1_来.wav' },
      { hanzi: '别担心', pinyin: 'bié dān xīn', meaning: 't\'inquiète pas', meaningEn: 'don\'t worry', audio: 'audio/hsk3/hsk3_担心.wav' }
    ],
    tip:
      'Astuce : chaque fois que tu veux rassurer ou promettre, ajoute 的 en fin. C\'est un des marqueurs les plus utilisés pour encourager quelqu\'un.',
    tipEn:
      'Tip: whenever you want to reassure or promise, add final 的. It\'s one of the most used markers to encourage someone.'
  }
];

// ═════════════════════════════════════════════════════════════════════════════
// A2 Nuances — 还 (hái/huán) : encore, aussi, rendre (base) — CGG #82
// ═════════════════════════════════════════════════════════════════════════════

export const a2NuancesHaiBasicsLearnSections: LessonV2LearnSection[] = [
  {
    id: 'a2-hai-still-timeline',
    title: '还 : « encore / toujours pas » (chronologie)',
    titleEn: '还: «still / not yet» (timeline)',
    body:
      'L\'usage le plus courant : 还 marque qu\'une action ou un état CONTINUE, ou qu\'un événement attendu N\'A PAS ENCORE eu lieu.\n' +
      '\n' +
      '还 + 在 + verbe = ENCORE en train de faire. Marque une action continue qui devrait peut-être avoir cessé.\n' +
      '- Ex : 他还在睡觉 (tā hái zài shuì jiào) « il dort encore ».\n' +
      '- Ex : 外面还在下雨 (wài miàn hái zài xià yǔ) « il pleut toujours dehors ».\n' +
      '\n' +
      '还没(有) + verbe = PAS ENCORE fait. Sous-entend que l\'action va probablement arriver.\n' +
      '- Attention : on utilise TOUJOURS 没 (pas 不) — on parle d\'un événement qui ne s\'est pas produit jusqu\'à maintenant.\n' +
      '- Ex : 我还没看那部电影 (wǒ hái méi kàn nà bù diàn yǐng) « je n\'ai pas encore vu ce film ».\n' +
      '- Ex : 妈妈还没回来 « maman n\'est pas encore rentrée ».\n' +
      '\n' +
      '还 + adjectif = un ÉTAT continue inchangé. Sens : « toujours / encore + adj ».\n' +
      '- Ex : 还早 (hái zǎo) « il est encore tôt ».\n' +
      '- Ex : 还不晚 (hái bù wǎn) « il n\'est pas encore tard ».\n' +
      '- Ex : 奶奶九十岁了，还很健康 « grand-mère a 90 ans et elle est encore en très bonne santé ».',
    bodyEn:
      'The most common use: 还 marks that an action/state CONTINUES, or that an expected event HAS NOT YET happened.\n' +
      '\n' +
      '还 + 在 + verb = STILL doing. Marks an ongoing action that maybe should have stopped.\n' +
      '- Ex: 他还在睡觉 «he\'s still sleeping».\n' +
      '- Ex: 外面还在下雨 «it\'s still raining outside».\n' +
      '\n' +
      '还没(有) + verb = NOT YET done. Implies the action will probably happen.\n' +
      '- Careful: ALWAYS use 没 (not 不) — we\'re talking about an event that hasn\'t occurred up to now.\n' +
      '- Ex: 我还没看那部电影 «I haven\'t seen that movie yet».\n' +
      '- Ex: 妈妈还没回来 «mom isn\'t back yet».\n' +
      '\n' +
      '还 + adjective = a STATE that continues unchanged. Meaning: «still + adj».\n' +
      '- Ex: 还早 «it\'s still early».\n' +
      '- Ex: 还不晚 «it\'s not too late yet».\n' +
      '- Ex: 奶奶九十岁了，还很健康 «grandma is 90 and still very healthy».',
    items: [
      { hanzi: '还', pinyin: 'hái', meaning: 'encore, toujours', meaningEn: 'still, yet', audio: 'audio/hsk2/hsk2_还.wav' },
      { hanzi: '还在', pinyin: 'hái zài', meaning: 'encore en train de', meaningEn: 'still in the middle of', audio: 'audio/hsk2/hsk2_还.wav' },
      { hanzi: '还没', pinyin: 'hái méi', meaning: 'pas encore', meaningEn: 'not yet', audio: 'audio/hsk2/hsk2_还.wav' },
      { hanzi: '还早', pinyin: 'hái zǎo', meaning: 'il est encore tôt', meaningEn: 'still early', audio: 'audio/hsk1/hsk1_早.wav' },
      { hanzi: '他还在睡觉', pinyin: 'tā hái zài shuì jiào', meaning: 'il dort encore', meaningEn: 'he\'s still sleeping', audio: 'audio/hsk2/hsk2_睡觉.wav' },
      { hanzi: '我还没看', pinyin: 'wǒ hái méi kàn', meaning: 'je n\'ai pas encore vu', meaningEn: 'I haven\'t seen yet', audio: 'audio/hsk1/hsk1_看.wav' },
      { hanzi: '妈妈还没回来', pinyin: 'mā ma hái méi huí lái', meaning: 'maman n\'est pas encore rentrée', meaningEn: 'mom isn\'t back yet', audio: 'audio/hsk2/hsk2_回来.wav' }
    ],
    tip:
      'Astuce : quand tu penses « encore » (dans le sens temporel), 还 est ton mot. Si c\'est un chinois qui te dit 还没到 « pas encore arrivé », relax, il arrive bientôt.',
    tipEn:
      'Tip: whenever you think «still» (in the temporal sense), 还 is your word. If a Chinese person says 还没到 «not there yet», relax — they\'re on the way.'
  },
  {
    id: 'a2-hai-adding-info',
    title: '还 : ajouter une info (« aussi / et en plus »)',
    titleEn: '还: adding info («also / on top»)',
    body:
      '还 sert aussi à AJOUTER une info sur le même sujet. Différent de 也 !\n' +
      '\n' +
      '也 = « aussi » (simple ajout entre 2 sujets ou 2 propositions).\n' +
      '还 = « en plus / de surcroît » — ajoute une PROPRIÉTÉ SUPPLÉMENTAIRE à ce qui vient d\'être dit sur le même sujet. Sonne beaucoup plus naturel que d\'énumérer.\n' +
      '\n' +
      '- Ex : 这个餐厅菜好吃，还很便宜 (zhè ge cān tīng cài hǎo chī, hái hěn pián yi) « ce resto la bouffe est bonne, et en plus c\'est pas cher ». Ce n\'est pas 也便宜.\n' +
      '- Ex : 他会说中文，还会说日语 « il parle chinois, et il parle aussi japonais ».\n' +
      '- Ex : 我喜欢咖啡，还喜欢茶 « j\'aime le café, et j\'aime aussi le thé ». Ici 还 sonne plus fluide que 也.\n' +
      '\n' +
      '不仅...还... (bù jǐn... hái...) = « non seulement... mais aussi... ». Version plus soutenue, pour insister.\n' +
      '- Ex : 她不仅漂亮，还很聪明 (tā bù jǐn piào liang, hái hěn cōng ming) « elle est non seulement belle, mais aussi très intelligente ».\n' +
      '- Ex : 这个手机不仅便宜，还很好看 « ce téléphone est non seulement pas cher, mais aussi joli ».',
    bodyEn:
      '还 also ADDS info about the same subject. Different from 也!\n' +
      '\n' +
      '也 = «also» (simple addition between 2 subjects or 2 clauses).\n' +
      '还 = «on top of that / moreover» — adds an EXTRA PROPERTY to what was just said about the same subject. Sounds far more natural than piling up 也.\n' +
      '\n' +
      '- Ex: 这个餐厅菜好吃，还很便宜 «this restaurant\'s food is good, and on top it\'s cheap». Not 也便宜.\n' +
      '- Ex: 他会说中文，还会说日语 «he speaks Chinese, and also Japanese».\n' +
      '- Ex: 我喜欢咖啡，还喜欢茶 «I like coffee, and I like tea too». Here 还 flows better than 也.\n' +
      '\n' +
      '不仅...还... = «not only... but also...». Slightly formal, for emphasis.\n' +
      '- Ex: 她不仅漂亮，还很聪明 «she\'s not only beautiful but also very smart».\n' +
      '- Ex: 这个手机不仅便宜，还很好看 «this phone is not only cheap but also nice-looking».',
    items: [
      { hanzi: '还', pinyin: 'hái', meaning: 'en plus, de surcroît', meaningEn: 'moreover, on top', audio: 'audio/hsk2/hsk2_还.wav' },
      { hanzi: '也', pinyin: 'yě', meaning: 'aussi (simple ajout)', meaningEn: 'also (simple)', audio: 'audio/hsk1/hsk1_也.wav' },
      { hanzi: '不仅', pinyin: 'bù jǐn', meaning: 'non seulement', meaningEn: 'not only', audio: 'audio/hsk3/hsk3_不仅.wav' },
      { hanzi: '便宜', pinyin: 'pián yi', meaning: 'bon marché', meaningEn: 'cheap', audio: 'audio/hsk2/hsk2_便宜.wav' },
      { hanzi: '聪明', pinyin: 'cōng ming', meaning: 'intelligent', meaningEn: 'smart', audio: 'audio/hsk3/hsk3_聪明.wav' },
      { hanzi: '菜好吃，还很便宜', pinyin: 'cài hǎo chī, hái hěn pián yi', meaning: 'la bouffe est bonne, et en plus pas chère', meaningEn: 'the food is good, and on top cheap', audio: 'audio/hsk2/hsk2_便宜.wav' },
      { hanzi: '不仅漂亮，还很聪明', pinyin: 'bù jǐn piào liang, hái hěn cōng ming', meaning: 'non seulement belle, mais aussi intelligente', meaningEn: 'not only beautiful but also smart', audio: 'audio/hsk3/hsk3_聪明.wav' }
    ],
    tip:
      'Astuce : quand tu veux ENRICHIR ta description d\'un même sujet, utilise 还. C\'est le petit détail qui fait la différence entre « je liste des faits » et « je raconte de manière fluide ».',
    tipEn:
      'Tip: when you want to ENRICH your description of one subject, use 还. It\'s the small detail that makes the difference between «listing facts» and «telling smoothly».'
  },
  {
    id: 'a2-hai-huan-return',
    title: '还 = 还(huán) : rendre, restituer',
    titleEn: '还 = 还(huán): to return, give back',
    body:
      'Surprise ! Le caractère 还 se prononce AUSSI huán (2e ton) avec un sens complètement différent : « rendre / restituer ».\n' +
      '\n' +
      'C\'est un verbe. Le contexte + les objets typiques (livres, argent, objets prêtés) rendent le sens évident.\n' +
      '\n' +
      'Structure : sujet + 还 + objet.\n' +
      '- Ex : 我明天还书 (wǒ míng tiān huán shū) « je rends les livres demain ».\n' +
      '- Ex : 快点还钱 (kuài diǎn huán qián) « rends l\'argent vite ».\n' +
      '- Ex : 我还伞 « je rapporte le parapluie ».\n' +
      '\n' +
      'Combinaison courante avec 把 : 把 + objet + 还给 + personne.\n' +
      '- Ex : 把钱还给他 (bǎ qián huán gěi tā) « rends-lui l\'argent ». 还给 = « restituer à ».\n' +
      '- Ex : 请把我的书还给我 « rends-moi mon livre s\'il te plaît ».\n' +
      '\n' +
      'Distinguer 还(hái) et 还(huán) :\n' +
      '- 还(hái) = adverbe : « encore, aussi, en plus ».\n' +
      '- 还(huán) = verbe : « rendre ». Se place devant un objet concret qui peut se prêter/emprunter.\n' +
      '- Ex ambigu : 我还没还他钱 (wǒ hái méi huán tā qián) « je ne lui ai pas encore rendu l\'argent » — les 2 dans la même phrase ! Le 1er = adverbe, le 2e = verbe.',
    bodyEn:
      'Surprise! The character 还 also reads huán (2nd tone) with a completely different meaning: «return / give back».\n' +
      '\n' +
      'It\'s a verb. Context + typical objects (books, money, borrowed items) make the meaning obvious.\n' +
      '\n' +
      'Structure: subject + 还 + object.\n' +
      '- Ex: 我明天还书 «I\'ll return the books tomorrow».\n' +
      '- Ex: 快点还钱 «pay back the money fast».\n' +
      '- Ex: 我还伞 «I\'m returning the umbrella».\n' +
      '\n' +
      'Common combo with 把: 把 + object + 还给 + person.\n' +
      '- Ex: 把钱还给他 «give him back the money». 还给 = «return to».\n' +
      '- Ex: 请把我的书还给我 «please give me back my book».\n' +
      '\n' +
      'Distinguishing 还(hái) and 还(huán):\n' +
      '- 还(hái) = adverb: «still, also, moreover».\n' +
      '- 还(huán) = verb: «return». Sits in front of a concrete object that can be lent/borrowed.\n' +
      '- Ambiguous ex: 我还没还他钱 «I haven\'t returned him the money yet» — both in one sentence! 1st = adverb, 2nd = verb.',
    items: [
      { hanzi: '还', pinyin: 'huán', meaning: 'rendre, restituer (verbe)', meaningEn: 'return, give back (verb)', audio: 'audio/hsk2/hsk2_还.wav' },
      { hanzi: '还书', pinyin: 'huán shū', meaning: 'rendre les livres', meaningEn: 'return books', audio: 'audio/hsk1/hsk1_书.wav' },
      { hanzi: '还钱', pinyin: 'huán qián', meaning: 'rembourser l\'argent', meaningEn: 'pay back money', audio: 'audio/hsk1/hsk1_钱.wav' },
      { hanzi: '还给', pinyin: 'huán gěi', meaning: 'restituer à', meaningEn: 'give back to', audio: 'audio/hsk2/hsk2_给.wav' },
      { hanzi: '把', pinyin: 'bǎ', meaning: 'marque l\'objet déplacé', meaningEn: 'marks disposed object', audio: 'audio/hsk3/hsk3_把.wav' },
      { hanzi: '把钱还给他', pinyin: 'bǎ qián huán gěi tā', meaning: 'rends-lui l\'argent', meaningEn: 'give him back the money', audio: 'audio/hsk1/hsk1_钱.wav' },
      { hanzi: '我还没还他钱', pinyin: 'wǒ hái méi huán tā qián', meaning: 'je ne lui ai pas encore rendu l\'argent', meaningEn: 'I haven\'t given him back the money yet', audio: 'audio/hsk1/hsk1_钱.wav' }
    ],
    tip:
      'Astuce : quand tu vois 还 juste devant un objet concret (书/钱/伞), pense « rendre » (huán). Devant un verbe ou adjectif, c\'est l\'adverbe (hái).',
    tipEn:
      'Tip: when you see 还 right in front of a concrete object (书/钱/伞), think «return» (huán). Before a verb/adjective, it\'s the adverb (hái).'
  }
];

// --- cecr-a2-nuances-ne — 呢 : particule multi-fonctions (base) ------------
export const a2NuancesNeBasicsLearnSections: LessonV2LearnSection[] = [
  {
    id: 'a2-ne-elliptical',
    title: '呢 : questions courtes « et toi ? »',
    titleEn: '呢: short «and you?» questions',
    body:
      'LE premier usage à connaître : renvoyer une question sans répéter toute la structure.\n' +
      '\n' +
      'Structure : [phrase A]，[topic B] + 呢 ?\n' +
      '\n' +
      '- Ex : 我有一个妹妹。你呢 ? (py wǒ yǒu yí ge mèi mei. nǐ ne) « j\'ai une petite sœur, et toi ? ». Pas besoin de reformuler la question.\n' +
      '- Ex : 我要喝咖啡，你呢 ? « je prends un café, et toi ? ».\n' +
      '- Ex : 今天很热，昨天呢 ? « il fait chaud aujourd\'hui, et hier ? ».\n' +
      '\n' +
      'Marche avec n\'importe quel élément : personne (你/他/她), lieu (北京/上海), temps (昨天/明天), objet (这个/那个).\n' +
      '\n' +
      'Attention : ne pas ajouter 吗 après 呢. 你呢吗 ✗ n\'existe pas.',
    bodyEn:
      'THE first use to know: bounce a question back without repeating the whole structure. Structure: [sentence A], [topic B] + 呢? Ex: 我有一个妹妹。你呢? (wǒ yǒu yí ge mèi mei. nǐ ne) «I have a little sister, and you?». No need to restate the question. Ex: 我要喝咖啡，你呢? «I\'ll have a coffee, and you?». Ex: 今天很热，昨天呢? «it\'s hot today, and yesterday?». Works with any element: person (你/他/她), place (北京/上海), time (昨天/明天), object (这个/那个). Careful: don\'t add 吗 after 呢. 你呢吗 ✗ doesn\'t exist.',
    items: [
      { hanzi: '呢', pinyin: 'ne', meaning: 'particule interrogative « et... ? »', meaningEn: 'question particle «and...?»', audio: 'audio/hsk1/hsk1_呢.wav' },
      { hanzi: '你呢', pinyin: 'nǐ ne', meaning: 'et toi ?', meaningEn: 'and you?', audio: 'audio/hsk1/hsk1_你.wav' },
      { hanzi: '他呢', pinyin: 'tā ne', meaning: 'et lui ?', meaningEn: 'and him?', audio: 'audio/hsk1/hsk1_他.wav' },
      { hanzi: '昨天呢', pinyin: 'zuó tiān ne', meaning: 'et hier ?', meaningEn: 'and yesterday?', audio: 'audio/hsk1/hsk1_昨天.wav' },
      { hanzi: '这个呢', pinyin: 'zhè ge ne', meaning: 'et celui-ci ?', meaningEn: 'and this one?', audio: 'audio/hsk1/hsk1_这个.wav' },
      { hanzi: '我有一个妹妹，你呢', pinyin: 'wǒ yǒu yí ge mèi mei, nǐ ne', meaning: 'j\'ai une petite sœur, et toi ?', meaningEn: 'I have a little sister, and you?', audio: 'audio/hsk1/hsk1_妹妹.wav' },
      { hanzi: '今天很热，昨天呢', pinyin: 'jīn tiān hěn rè, zuó tiān ne', meaning: 'il fait chaud aujourd\'hui, et hier ?', meaningEn: 'it\'s hot today, and yesterday?', audio: 'audio/hsk1/hsk1_今天.wav' }
    ],
    tip:
      'Astuce : dans une conversation naturelle, tu utiliseras 呢 des dizaines de fois par jour. C\'est la façon la plus rapide de renvoyer la balle.',
    tipEn:
      'Tip: in natural conversation, you\'ll use 呢 dozens of times a day. It\'s the fastest way to bounce the ball back.'
  },
  {
    id: 'a2-ne-rhetorical-wondering',
    title: '呢 : « je me demande... » (question rhétorique)',
    titleEn: '呢: «I wonder...» (rhetorical question)',
    body:
      '呢 après un mot interrogatif (谁/什么/哪儿/怎么) transforme une question directe en RÉFLEXION à voix haute.\n' +
      '\n' +
      'Sens : « je me demande... / hmm, où / qui / quoi... ».\n' +
      '\n' +
      'Structure : phrase avec question word + 呢 ?\n' +
      '\n' +
      '- Ex : 这是谁的笔呢 ? (py zhè shì shéi de bǐ ne) « je me demande à qui est ce stylo ». Découverte, tu réfléchis à voix haute, tu ne demandes pas à quelqu\'un précis.\n' +
      '- Ex : 他去哪儿了呢 ? (py tā qù nǎr le ne) « je me demande où il est parti ». Ton contemplatif.\n' +
      '- Ex : 这到底是什么呢 ? (py zhè dào dǐ shì shén me ne) « c\'est quoi ce truc, au juste ? ».\n' +
      '- Ex : 明天会下雨吗，怎么办呢 ? « et s\'il pleut demain, on fait comment ? ». Réflexion sur un souci.\n' +
      '\n' +
      'Nuance vs question sans 呢 : 谁的笔 ? (« à qui est le stylo ? », demande directe à qqn) vs 谁的笔呢 ? (« je me demande à qui est ce stylo », réflexion pour soi).',
    bodyEn:
      '呢 after a question word (谁/什么/哪儿/怎么) turns a direct question into THINKING out loud. Meaning: «I wonder... / hmm, where / who / what...». Structure: sentence with question word + 呢? Ex: 这是谁的笔呢? (zhè shì shéi de bǐ ne) «I wonder whose pen this is». Discovery, thinking aloud, not asking anyone in particular. Ex: 他去哪儿了呢? «I wonder where he went». Contemplative tone. Ex: 这到底是什么呢? «what on earth is this?». Ex: 明天会下雨吗，怎么办呢? «what if it rains tomorrow, how do we deal?». Nuance vs question without 呢: 谁的笔? («whose pen?», direct question to someone) vs 谁的笔呢? («I wonder whose pen this is», self-reflection).',
    items: [
      { hanzi: '谁呢', pinyin: 'shéi ne', meaning: 'qui donc ? (je me demande)', meaningEn: 'who then? (wondering)', audio: 'audio/hsk1/hsk1_谁.wav' },
      { hanzi: '什么呢', pinyin: 'shén me ne', meaning: 'quoi donc ?', meaningEn: 'what then?', audio: 'audio/hsk1/hsk1_什么.wav' },
      { hanzi: '哪儿呢', pinyin: 'nǎr ne', meaning: 'où donc ?', meaningEn: 'where then?', audio: 'audio/hsk1/hsk1_哪儿.wav' },
      { hanzi: '怎么办呢', pinyin: 'zěn me bàn ne', meaning: 'comment faire alors ?', meaningEn: 'what to do then?', audio: 'audio/hsk2/hsk2_怎么办.wav' },
      { hanzi: '这是谁的笔呢', pinyin: 'zhè shì shéi de bǐ ne', meaning: 'à qui est ce stylo, je me demande', meaningEn: 'whose pen is this, I wonder', audio: 'audio/hsk1/hsk1_笔.wav' },
      { hanzi: '他去哪儿了呢', pinyin: 'tā qù nǎr le ne', meaning: 'où est-il donc parti ?', meaningEn: 'where did he go, I wonder', audio: 'audio/hsk1/hsk1_去.wav' },
      { hanzi: '这到底是什么呢', pinyin: 'zhè dào dǐ shì shén me ne', meaning: 'c\'est quoi ça au juste ?', meaningEn: 'what on earth is this?', audio: 'audio/hsk1/hsk1_什么.wav' }
    ],
    tip:
      'Astuce : 呢 rend ta question plus douce, moins directe. Utile quand tu ne veux pas mettre la pression sur quelqu\'un.',
    tipEn:
      'Tip: 呢 makes your question softer, less direct. Useful when you don\'t want to pressure someone.'
  },
  {
    id: 'a2-ne-emphasize-statement',
    title: '呢 en fin d\'affirmation : « je te dis / tu sais »',
    titleEn: '呢 at the end of a statement: «I tell you / you know»',
    body:
      'À la fin d\'une PHRASE AFFIRMATIVE, 呢 ajoute une EMPHASE douce. Sens = « je te le dis / c\'est encore le cas / je t\'assure ».\n' +
      '\n' +
      'Souvent avec 还 (encore), 真 (vraiment), 得很 (très).\n' +
      '\n' +
      'Structure : phrase affirmative + 呢.\n' +
      '\n' +
      '- Ex : 还早呢 (py hái zǎo ne) « il est encore tôt, tu sais » (rassurant, sans reproche).\n' +
      '- Ex : 我还没吃呢 « je n\'ai pas encore mangé, moi » (peut être insistant ou attend qu\'on te propose).\n' +
      '- Ex : 好吃得很呢 (py hǎo chī de hěn ne) « c\'est vachement bon, tu sais ! ».\n' +
      '- Ex : 他忙得很呢 « il est super occupé, je te dis ».\n' +
      '\n' +
      'Nuance : ajoute une couche d\'affirmation chaleureuse. Sans 呢, la phrase est neutre. Avec 呢, elle sonne « informelle et engageante ».',
    bodyEn:
      'At the end of an AFFIRMATIVE sentence, 呢 adds soft EMPHASIS. Meaning = «I\'m telling you / it\'s still the case / I assure you». Often with 还 (still), 真 (really), 得很 (very). Structure: affirmative sentence + 呢. Ex: 还早呢 (hái zǎo ne) «it\'s still early, you know» (reassuring, no reproach). Ex: 我还没吃呢 «I haven\'t eaten yet, myself» (can be emphatic or hint at wanting to be offered). Ex: 好吃得很呢 «it\'s super tasty, you know!». Ex: 他忙得很呢 «he\'s so busy, I tell you». Nuance: adds a warm layer of affirmation. Without 呢, the sentence is neutral. With 呢, it sounds «informal and engaging».',
    items: [
      { hanzi: '还早呢', pinyin: 'hái zǎo ne', meaning: 'il est encore tôt, tu sais', meaningEn: 'still early, you know', audio: 'audio/hsk1/hsk1_早.wav' },
      { hanzi: '还没吃呢', pinyin: 'hái méi chī ne', meaning: 'pas encore mangé', meaningEn: 'haven\'t eaten yet', audio: 'audio/hsk1/hsk1_吃.wav' },
      { hanzi: '好吃得很呢', pinyin: 'hǎo chī de hěn ne', meaning: 'c\'est vachement bon !', meaningEn: 'super tasty!', audio: 'audio/hsk1/hsk1_好吃.wav' },
      { hanzi: '忙得很呢', pinyin: 'máng de hěn ne', meaning: 'super occupé, je te dis', meaningEn: 'super busy, I tell you', audio: 'audio/hsk2/hsk2_忙.wav' },
      { hanzi: '真好呢', pinyin: 'zhēn hǎo ne', meaning: 'c\'est vraiment bien, tu sais', meaningEn: 'really nice, you know', audio: 'audio/hsk1/hsk1_真.wav' },
      { hanzi: '还', pinyin: 'hái', meaning: 'encore', meaningEn: 'still', audio: 'audio/hsk2/hsk2_还.wav' },
      { hanzi: '得很', pinyin: 'de hěn', meaning: 'très (postposé)', meaningEn: 'very (postposed)', audio: 'audio/hsk1/hsk1_很.wav' }
    ],
    tip:
      'Astuce : ce 呢-là adoucit la phrase. Utilise-le pour rassurer, calmer, ou pour partager une info avec un ton complice.',
    tipEn:
      'Tip: this 呢 softens the sentence. Use it to reassure, calm, or share info with a complicit tone.'
  },
  {
    id: 'a2-ne-mid-sentence-topic',
    title: '呢 au milieu de phrase : marquer le contraste',
    titleEn: '呢 mid-sentence: marking contrast',
    body:
      '呢 peut aussi apparaître au milieu de la phrase pour MARQUER UN TOPIC et créer un CONTRASTE. Sens : « quant à... / lui/elle par contre... ».\n' +
      '\n' +
      'Structure : [topic A + commentaire A]，[topic B] + 呢，[commentaire B].\n' +
      '\n' +
      '- Ex : 他喜欢热闹，我呢，喜欢安静 (py tā xǐ huan rè nao, wǒ ne, xǐ huan ān jìng) « il aime l\'ambiance, moi par contre, j\'aime le calme ».\n' +
      '- Ex : 姐姐很聪明，妹妹呢，很漂亮 « la grande sœur est intelligente, la petite par contre, elle est très belle ». Distribution de qualités.\n' +
      '- Ex : 上海的房子很贵，北京呢，也不便宜 « les logements à Shanghai sont chers, à Beijing aussi c\'est pas donné ».\n' +
      '\n' +
      'Effet : 呢 fait pivoter la conversation en douceur d\'un sujet à un autre, tout en soulignant le contraste. Plus élégant que dire brutalement 但是 (mais).',
    bodyEn:
      '呢 can also appear MID-sentence to MARK A TOPIC and create CONTRAST. Meaning: «as for... / X on the other hand...». Structure: [topic A + comment A], [topic B] + 呢, [comment B]. Ex: 他喜欢热闹，我呢，喜欢安静 «he likes buzz, me on the other hand, I like quiet». Ex: 姐姐很聪明，妹妹呢，很漂亮 «big sister is smart, little sister on the other hand is beautiful». Distribution of qualities. Ex: 上海的房子很贵，北京呢，也不便宜 «Shanghai housing is expensive, Beijing isn\'t cheap either». Effect: 呢 smoothly pivots the conversation from one topic to another while underlining the contrast. More elegant than bluntly using 但是 (but).',
    items: [
      { hanzi: '我呢', pinyin: 'wǒ ne', meaning: 'moi par contre / quant à moi', meaningEn: 'me on the other hand', audio: 'audio/hsk1/hsk1_我.wav' },
      { hanzi: '他呢', pinyin: 'tā ne', meaning: 'lui par contre', meaningEn: 'him on the other hand', audio: 'audio/hsk1/hsk1_他.wav' },
      { hanzi: '热闹', pinyin: 'rè nao', meaning: 'animé, ambiance', meaningEn: 'lively, bustling', audio: 'audio/hsk3/hsk3_热闹.wav' },
      { hanzi: '安静', pinyin: 'ān jìng', meaning: 'calme, tranquille', meaningEn: 'quiet', audio: 'audio/hsk3/hsk3_安静.wav' },
      { hanzi: '他喜欢热闹，我呢，喜欢安静', pinyin: 'tā xǐ huan rè nao, wǒ ne, xǐ huan ān jìng', meaning: 'il aime l\'ambiance, moi le calme', meaningEn: 'he likes buzz, me quiet', audio: 'audio/hsk3/hsk3_安静.wav' },
      { hanzi: '姐姐很聪明，妹妹呢，很漂亮', pinyin: 'jiě jie hěn cōng ming, mèi mei ne, hěn piào liang', meaning: 'la grande est intelligente, la petite belle', meaningEn: 'big sister is smart, little sister is pretty', audio: 'audio/hsk1/hsk1_姐姐.wav' },
      { hanzi: '上海的房子很贵，北京呢，也不便宜', pinyin: 'shàng hǎi de fáng zi hěn guì, běi jīng ne, yě bù pián yi', meaning: 'à Shanghai les logements sont chers, à Pékin pas donné non plus', meaningEn: 'housing in Shanghai is expensive, Beijing isn\'t cheap either', audio: 'audio/hsk2/hsk2_贵.wav' }
    ],
    tip:
      'Astuce : ce pattern est LE signal du chinois oral fluide. Dès que tu compares 2 choses/personnes/lieux, glisse-le.',
    tipEn:
      'Tip: this pattern is THE signal of fluent spoken Chinese. Whenever you compare 2 things/people/places, slip it in.'
  }
];

// --- cecr-a2-nuances-m19 — Exprimer un choix : bases (CGG #74) ------------
export const a2NuancesChoicesBasicsLearnSections: LessonV2LearnSection[] = [
  {
    id: 'a2-choices-haishi-huozhe',
    title: '还是 (question) vs 或者 (affirmation) : distinction fondamentale',
    titleEn: '还是 (question) vs 或者 (statement): the core split',
    body:
      'En français, « ou » sert pour les questions ET les affirmations. En chinois, on distingue.\n' +
      '\n' +
      '还是 (hái shi) = « ou » DANS UNE QUESTION. Attend un CHOIX précis.\n' +
      '- Structure : (是) + option A + 还是 + option B ?\n' +
      '- Ex : 你喜欢茶还是咖啡 ? (py nǐ xǐ huan chá hái shi kā fēi) « tu préfères le thé ou le café ? ».\n' +
      '- Ex : 我们星期六去还是星期天去 ? « on y va samedi ou dimanche ? ».\n' +
      '- Pas de 吗 avec 还是 : la question est déjà signalée.\n' +
      '\n' +
      '或者 (huò zhě) = « ou » DANS UNE AFFIRMATION. Décrit des POSSIBILITÉS sans demander de choix.\n' +
      '- Structure simple : A + 或者 + B.\n' +
      '- Ex : 我可以坐地铁或者打车 « je peux prendre le métro ou un taxi ».\n' +
      '- Structure appariée : 或者 A，或者 B (pour insister).\n' +
      '- Ex : 周末我或者在家休息，或者出去散步 (py zhōu mò wǒ huò zhě zài jiā xiū xi, huò zhě chū qù sàn bù) « le weekend, soit je me repose à la maison, soit je sors marcher ».\n' +
      '\n' +
      '或是 (huò shì) : quasi-synonyme de 或者, PLUS FORMEL et fréquent à Taïwan. En Chine continentale à l\'écrit ou dans un contexte soutenu.\n' +
      '- Ex : 小李晚上或是在家看书，或是在公园散步 « le soir, Xiao Li soit lit à la maison, soit se promène au parc ».\n' +
      '\n' +
      'Sans « ou » explicite : à l\'oral détendu, on peut LISTER 2 options avec une pause et une intonation montante.\n' +
      '- Ex : 我们星期六去，星期天去 ? (à l\'oral, intonation questionnante) « on y va samedi ou dimanche ? ».',
    bodyEn:
      'In English, «or» works for both questions and statements. Chinese splits it. 还是 (hái shi) = «or» IN A QUESTION, expects a specific CHOICE: 你喜欢茶还是咖啡? «do you prefer tea or coffee?». No 吗 with 还是 — the question is already marked. 或者 (huò zhě) = «or» IN A STATEMENT, lists POSSIBILITIES without asking for a pick: 我可以坐地铁或者打车. Paired form 或者 A, 或者 B insists: 周末我或者在家休息，或者出去散步 «on weekends, I either rest at home or go for a walk». 或是 (huò shì) is a MORE FORMAL near-synonym of 或者, common in Taiwan and in written mainland Chinese. In casual speech, you can also just LIST 2 options with rising intonation to signal a question: 我们星期六去，星期天去?',
    items: [
      { hanzi: '还是', pinyin: 'hái shi', meaning: 'ou (dans une question)', meaningEn: 'or (in a question)', audio: 'audio/hsk2/hsk2_还是.wav' },
      { hanzi: '或者', pinyin: 'huò zhě', meaning: 'ou (dans une affirmation)', meaningEn: 'or (in a statement)', audio: 'audio/hsk3/hsk3_或者.wav' },
      { hanzi: '或是', pinyin: 'huò shì', meaning: 'ou (formel / Taïwan)', meaningEn: 'or (formal / Taiwan)', audio: 'audio/hsk3/hsk3_或.wav' },
      { hanzi: '你喜欢茶还是咖啡', pinyin: 'nǐ xǐ huan chá hái shi kā fēi', meaning: 'tu préfères le thé ou le café ?', meaningEn: 'do you prefer tea or coffee?', audio: 'audio/hsk1/hsk1_咖啡.wav' },
      { hanzi: '我们星期六去还是星期天去', pinyin: 'wǒ men xīng qī liù qù hái shi xīng qī tiān qù', meaning: 'on y va samedi ou dimanche ?', meaningEn: 'shall we go Saturday or Sunday?', audio: 'audio/hsk1/hsk1_星期六.wav' },
      { hanzi: '我可以坐地铁或者打车', pinyin: 'wǒ kě yǐ zuò dì tiě huò zhě dǎ chē', meaning: 'je peux prendre le métro ou un taxi', meaningEn: 'I can take the subway or grab a cab', audio: 'audio/hsk3/hsk3_打车.wav' },
      { hanzi: '周末我或者在家休息，或者出去散步', pinyin: 'zhōu mò wǒ huò zhě zài jiā xiū xi, huò zhě chū qù sàn bù', meaning: 'le weekend, soit je me repose, soit je vais marcher', meaningEn: 'on weekends, either I rest or I go for a walk', audio: 'audio/hsk2/hsk2_休息.wav' }
    ],
    tip:
      'Astuce mnémo : question → 还是 ; affirmation → 或者. Erreur ultra fréquente : dire « 你喜欢茶或者咖啡 ? » ✗ (mixer les deux).',
    tipEn:
      'Memory hook: question → 还是; statement → 或者. Super common mistake: saying «你喜欢茶或者咖啡?» ✗ (mixing the two).'
  },
  {
    id: 'a2-choices-yaome-ultimatum',
    title: '要么...要么... : « soit... soit... » (ultimatum)',
    titleEn: '要么...要么...: «either... or...» (ultimatum)',
    body:
      '要么 (yào me) présente un choix FERME entre 2 (ou plus) options, avec l\'idée « il n\'y a pas d\'autre alternative ».\n' +
      '\n' +
      'Ton d\'ultimatum ou de décision importante. Plus fort que 或者 (neutre).\n' +
      '\n' +
      'Structure : 要么 + option A，要么 + option B.\n' +
      '- Ex : 假期要么去海边，要么去爬山，我们总得选一个 (py jià qī yào me qù hǎi biān, yào me qù pá shān, wǒmen zǒng děi xuǎn yí ge) « pour les vacances, soit on va à la mer, soit on va en montagne, il faut choisir ».\n' +
      '- Ex : 你要么好好学习，要么退学 « soit tu bosses sérieusement, soit tu quittes l\'école ». Ultimatum parent-enfant.\n' +
      '- Ex : 要么现在做，要么永远别做 « soit tu le fais maintenant, soit tu ne le fais jamais ».\n' +
      '\n' +
      'Extension à 3+ options possible : 要么 A，要么 B，要么 C.\n' +
      '\n' +
      'Nuance vs 或者 : 或者 = neutre (« ou »). 要么 = ferme (« soit... soit... et rien d\'autre »).\n' +
      '\n' +
      'Nuance vs 还是 : 还是 pose une QUESTION (« lequel ? »). 要么 présente les OPTIONS mais dans une phrase déclarative.',
    bodyEn:
      '要么 (yào me) presents a FIRM choice between 2 (or more) options: «there\'s no other alternative». Ultimatum or important decision tone. Stronger than the neutral 或者. Structure: 要么 + A, 要么 + B. Ex: 假期要么去海边，要么去爬山，我们总得选一个 «for the holidays, either the sea or the mountains, we have to pick one». Ex: 你要么好好学习，要么退学 «either you study seriously, or you drop out» — parent-child ultimatum. Ex: 要么现在做，要么永远别做 «either do it now or never». Extends to 3+ options: 要么 A, 要么 B, 要么 C. Nuance vs 或者: 或者 is neutral; 要么 is firm. Nuance vs 还是: 还是 asks a QUESTION; 要么 declares OPTIONS.',
    items: [
      { hanzi: '要么', pinyin: 'yào me', meaning: 'soit... (choix ferme)', meaningEn: 'either... (firm choice)', audio: 'audio/hsk4/hsk4_要么.wav' },
      { hanzi: '要么...要么...', pinyin: 'yào me ... yào me ...', meaning: 'soit... soit...', meaningEn: 'either... or...', audio: 'audio/hsk4/hsk4_要么.wav' },
      { hanzi: '假期要么去海边，要么去爬山', pinyin: 'jià qī yào me qù hǎi biān, yào me qù pá shān', meaning: 'les vacances, soit la mer soit la montagne', meaningEn: 'holidays: either the sea or the mountains', audio: 'audio/hsk3/hsk3_爬山.wav' },
      { hanzi: '你要么好好学习，要么退学', pinyin: 'nǐ yào me hǎo hǎo xué xí, yào me tuì xué', meaning: 'soit tu bosses, soit tu quittes l\'école', meaningEn: 'either you study hard, or you drop out', audio: 'audio/hsk2/hsk2_学习.wav' },
      { hanzi: '要么现在做，要么永远别做', pinyin: 'yào me xiàn zài zuò, yào me yǒng yuǎn bié zuò', meaning: 'soit maintenant, soit jamais', meaningEn: 'either now or never', audio: 'audio/hsk4/hsk4_永远.wav' },
      { hanzi: '总得选一个', pinyin: 'zǒng děi xuǎn yí ge', meaning: 'il faut bien en choisir un', meaningEn: 'have to pick one', audio: 'audio/hsk3/hsk3_选.wav' }
    ],
    tip:
      'Astuce : quand tu veux insister « il n\'y a que ces 2 options », c\'est 要么. Utile pour poser des limites claires.',
    tipEn:
      'Tip: when you want to insist «only these 2 options exist», use 要么. Good for setting clear limits.'
  },
  {
    id: 'a2-choices-bushi-jiushi-huo-huo',
    title: '不是...就是... (habitude) + 或...或... (littéraire)',
    titleEn: '不是...就是... (habit) + 或...或... (literary)',
    body:
      '不是 A 就是 B (bú shi... jiù shi...) = « si ce n\'est pas A, alors c\'est B ». Décrit une HABITUDE ou un pattern récurrent où seulement 2 possibilités existent.\n' +
      '- Structure : 不是 + option A + 就是 + option B.\n' +
      '- Ex : 周末他们不是出去郊游，就是在家休息 (py zhōu mò tā men bú shi chū qù jiāo yóu, jiù shi zài jiā xiū xi) « le weekend, soit ils sortent se promener, soit ils se reposent à la maison ». Tu décris leurs habitudes.\n' +
      '- Ex : 他吃饭不是吃面就是吃饭 « pour manger, il prend soit des nouilles soit du riz ». Prévisible.\n' +
      '- Ex : 广州的天气不是晴天就是下雨 « à Canton, il fait soit beau soit il pleut ». Description de climat typique.\n' +
      '\n' +
      'Nuance clé vs 要么 :\n' +
      '- 要么 A 要么 B = tu PRÉSENTES un choix à faire.\n' +
      '- 不是 A 就是 B = tu DÉCRIS une habitude ou prédiction, sans exiger de choix.\n' +
      '\n' +
      '或...或... (huò... huò...) = « soit... soit... » FORMEL/LITTÉRAIRE. Chinois écrit, presse, contexte académique.\n' +
      '- Structure : 或 + option A，或 + option B. Sans redoublement (contrairement à 或者).\n' +
      '- Ex : 运动会上，同学们或参加跑步，或参加跳高 (py yùn dòng huì shàng, tóng xué men huò cān jiā pǎo bù, huò cān jiā tiào gāo) « au meeting sportif, les élèves participaient soit à la course, soit au saut en hauteur ». Ton descriptif élégant.\n' +
      '- Décrit souvent des CATÉGORIES parallèles (les uns... les autres...).\n' +
      '- À l\'oral décontracté, on préfère 有的...有的... (« certains... d\'autres... »).\n' +
      '\n' +
      'Recap des 5 patterns vus jusqu\'ici :\n' +
      '- 还是 (question, choix demandé).\n' +
      '- 或者/或是 (affirmation, possibilités neutres).\n' +
      '- 要么 A 要么 B (ultimatum, choix imposé).\n' +
      '- 不是 A 就是 B (habitude prévisible).\n' +
      '- 或 A 或 B (littéraire, catégories parallèles).',
    bodyEn:
      '不是 A 就是 B (bú shi... jiù shi...) = «if not A, then B». Describes a HABIT or predictable pattern with only 2 possibilities. Ex: 周末他们不是出去郊游，就是在家休息 «on weekends, they either go for a walk or rest at home». You describe their habits. Ex: 他吃饭不是吃面就是吃饭 «for meals, he has either noodles or rice» — predictable. Ex: 广州的天气不是晴天就是下雨 «Canton weather is either sunny or rainy». Key nuance vs 要么: 要么 A 要么 B PRESENTS a choice; 不是 A 就是 B DESCRIBES a habit or prediction, no choice required. 或...或... (huò... huò...) = FORMAL/LITERARY «either... or...». Written Chinese, press, academic contexts. Structure: 或 + A, 或 + B (no doubling like 或者). Ex: 运动会上，同学们或参加跑步，或参加跳高. Often describes PARALLEL CATEGORIES (some... others...). In casual speech, use 有的...有的... instead. Recap of 5 patterns: 还是 (question), 或者/或是 (statement, neutral), 要么 A 要么 B (ultimatum), 不是 A 就是 B (habit), 或 A 或 B (literary).',
    items: [
      { hanzi: '不是...就是...', pinyin: 'bú shi ... jiù shi ...', meaning: 'si ce n\'est pas... alors c\'est...', meaningEn: 'if not... then...', audio: 'audio/hsk1/hsk1_不是.wav' },
      { hanzi: '或...或...', pinyin: 'huò ... huò ...', meaning: 'soit... soit... (formel)', meaningEn: 'either... or... (formal)', audio: 'audio/hsk3/hsk3_或.wav' },
      { hanzi: '周末他们不是出去郊游，就是在家休息', pinyin: 'zhōu mò tā men bú shi chū qù jiāo yóu, jiù shi zài jiā xiū xi', meaning: 'le weekend, ils sortent se promener ou se reposent', meaningEn: 'on weekends, they either go out or rest at home', audio: 'audio/hsk2/hsk2_休息.wav' },
      { hanzi: '广州的天气不是晴天就是下雨', pinyin: 'guǎng zhōu de tiān qì bú shi qíng tiān jiù shi xià yǔ', meaning: 'à Canton, il fait beau ou il pleut', meaningEn: 'in Canton, it\'s either sunny or rainy', audio: 'audio/hsk2/hsk2_天气.wav' },
      { hanzi: '运动会上，同学们或参加跑步，或参加跳高', pinyin: 'yùn dòng huì shàng, tóng xué men huò cān jiā pǎo bù, huò cān jiā tiào gāo', meaning: 'au meeting sportif, soit course soit saut en hauteur', meaningEn: 'at the sports meet, either running or high jump', audio: 'audio/hsk2/hsk2_跑步.wav' },
      { hanzi: '有的...有的...', pinyin: 'yǒu de ... yǒu de ...', meaning: 'certains... d\'autres...', meaningEn: 'some... others...', audio: 'audio/hsk3/hsk3_有的.wav' }
    ],
    tip:
      'Astuce : chaque pattern porte un TON. Question douce → 还是. Neutre → 或者. Ferme → 要么. Habituel → 不是...就是. Formel → 或...或.',
    tipEn:
      'Tip: each pattern carries a TONE. Soft question → 还是. Neutral → 或者. Firm → 要么. Habitual → 不是...就是. Formal → 或...或.'
  }
];

// --- cecr-a2-nuances-m20 — Exprimer le but (base) -------------------------
export const a2NuancesPurposeBasicsLearnSections: LessonV2LearnSection[] = [
  {
    id: 'a2-purpose-weile-lai',
    title: '为了 + 来 : les 2 patterns fondamentaux « pour... »',
    titleEn: '为了 + 来: the 2 base patterns for «for/in order to»',
    body:
      '为了 (wèi le) = « pour, afin de ». C\'est LE connecteur du but PAR DÉFAUT. Neutre, marche partout.\n' +
      '\n' +
      'Structure : 为了 + [but]，[action].\n' +
      '- Ex : 为了学好中文，我每天听播客 (py wèi le xué hǎo zhōng wén, wǒ měi tiān tīng bō kè) « pour bien apprendre le chinois, j\'écoute des podcasts tous les jours ».\n' +
      '- Ex : 为了健康，他每天跑步 « pour rester en forme, il court chaque jour ».\n' +
      '\n' +
      'Attention : ne pas confondre avec 因为 (« parce que »). 为了 = OBJECTIF à atteindre. 因为 = RAISON qui a déclenché.\n' +
      '- Ex : 我学中文因为我喜欢中国 « j\'apprends le chinois parce que j\'aime la Chine » (cause).\n' +
      '- Ex : 我学中文为了去中国旅行 « j\'apprends pour voyager en Chine » (but).\n' +
      '\n' +
      'Note : le 了 dans 为了 fait partie du mot, ne marque PAS le passé.\n' +
      '\n' +
      '来 (lái) = « pour ». Connecteur COURT et oral, lie 2 verbes.\n' +
      '\n' +
      'Structure : [action 1] + 来 + [action 2 = but].\n' +
      '- Ex : 他用手机应用来学中文 (py tā yòng shǒu jī yìng yòng lái xué zhōng wén) « il utilise des appli pour apprendre le chinois ».\n' +
      '- Ex : 我打电话来告诉你 « je t\'appelle pour te dire ».\n' +
      '- Ex : 他来这儿来找工作 « il est venu ici pour chercher du boulot ».\n' +
      '\n' +
      'Souvent avec 用 (utiliser), 来 (venir), 去 (aller).',
    bodyEn:
      '为了 (wèi le) = «for, in order to». THE default purpose connector — neutral, works everywhere. Structure: 为了 + [purpose], [action]. Ex: 为了学好中文，我每天听播客 «to master Chinese, I listen to podcasts daily». Ex: 为了健康，他每天跑步 «to stay healthy, he runs every day». Careful: don\'t confuse with 因为 («because»). 为了 = GOAL to reach; 因为 = REASON that triggered. Ex: 我学中文因为我喜欢中国 «I study Chinese because I love China» (cause) vs. 我学中文为了去中国旅行 «I study Chinese to travel to China» (purpose). Note: the 了 in 为了 is part of the word, NOT a past marker. 来 (lái) = «for/to». SHORT and oral connector linking 2 verbs. Structure: [action 1] + 来 + [action 2 = purpose]. Ex: 他用手机应用来学中文 «he uses apps to learn Chinese». Ex: 我打电话来告诉你 «I\'m calling to tell you». Ex: 他来这儿来找工作 «he came here to look for work». Often paired with 用 (use), 来 (come), 去 (go).',
    items: [
      { hanzi: '为了', pinyin: 'wèi le', meaning: 'pour, afin de', meaningEn: 'in order to, for', audio: 'audio/hsk3/hsk3_为了.wav' },
      { hanzi: '来', pinyin: 'lái', meaning: 'pour (lier 2 verbes)', meaningEn: 'to (link 2 verbs)', audio: 'audio/hsk1/hsk1_来.wav' },
      { hanzi: '为了学好中文，我每天听播客', pinyin: 'wèi le xué hǎo zhōng wén, wǒ měi tiān tīng bō kè', meaning: 'pour bien apprendre le chinois, j\'écoute des podcasts', meaningEn: 'to master Chinese, I listen to podcasts daily', audio: 'audio/hsk1/hsk1_中文.wav' },
      { hanzi: '为了健康，他每天跑步', pinyin: 'wèi le jiàn kāng, tā měi tiān pǎo bù', meaning: 'pour la santé, il court chaque jour', meaningEn: 'for his health, he runs every day', audio: 'audio/hsk3/hsk3_健康.wav' },
      { hanzi: '我学中文为了去中国旅行', pinyin: 'wǒ xué zhōng wén wèi le qù zhōng guó lǚ xíng', meaning: 'j\'apprends le chinois pour voyager en Chine', meaningEn: 'I\'m learning Chinese to travel to China', audio: 'audio/hsk2/hsk2_旅行.wav' },
      { hanzi: '他用手机应用来学中文', pinyin: 'tā yòng shǒu jī yìng yòng lái xué zhōng wén', meaning: 'il utilise une appli pour apprendre le chinois', meaningEn: 'he uses an app to learn Chinese', audio: 'audio/hsk2/hsk2_手机.wav' },
      { hanzi: '我打电话来告诉你', pinyin: 'wǒ dǎ diàn huà lái gào su nǐ', meaning: 'je t\'appelle pour te dire', meaningEn: 'I\'m calling to tell you', audio: 'audio/hsk1/hsk1_电话.wav' }
    ],
    tip:
      'Astuce : à l\'écrit ou formellement, préfère 为了. À l\'oral avec un enchaînement de verbes, 来 est plus court et fluide.',
    tipEn:
      'Tip: for writing or formal contexts, pick 为了. In speech with linked verbs, 来 is punchier and flows better.'
  },
  {
    id: 'a2-purpose-hao-haorang',
    title: '好 et 好让 : « pour que » à l\'oral',
    titleEn: '好 and 好让: «so that» in speech',
    body:
      '好 (hǎo) en connecteur = « pour que / afin que ». Très oral, très naturel entre 2 clauses. Peut passer pour « pour » ou « afin de ».\n' +
      '\n' +
      'Structure : [action 1]，好 + [but].\n' +
      '- Ex : 我提前完成作业，好有时间休息 (py wǒ tí qián wán chéng zuò yè, hǎo yǒu shí jiān xiū xi) « je finis les devoirs à l\'avance, comme ça j\'aurai du temps pour me reposer ». Même sujet.\n' +
      '- Ex : 大声说，好让大家都听见 « parle fort, pour que tout le monde entende ». Sujets différents.\n' +
      '- Ex : 早点儿走，好赶上火车 « pars plus tôt, comme ça tu attrapes le train ».\n' +
      '\n' +
      '好让 (hǎo ràng) = « pour que quelqu\'un puisse ». Utilisé quand le but concerne QUELQU\'UN D\'AUTRE que le sujet initial.\n' +
      '\n' +
      'Structure : [action 1]，好让 + [personne] + [ce qu\'elle peut faire].\n' +
      '- Ex : 请把门开着，好让客人进来 (py qǐng bǎ mén kāi zhe, hǎo ràng kè rén jìn lái) « laisse la porte ouverte pour que les invités puissent entrer ».\n' +
      '- Ex : 说慢一点儿，好让我听懂 « parle un peu plus lentement pour que je comprenne ».\n' +
      '\n' +
      'Nuance vs 为了 : 为了 est plus large et formel. 好/好让 est très conversationnel, oral quotidien.',
    bodyEn:
      '好 (hǎo) as a connector = «so that / in order that». Very oral, natural between 2 clauses. Can render as «to» or «in order to». Structure: [action 1], 好 + [purpose]. Ex: 我提前完成作业，好有时间休息 «I finish homework early so I\'ll have time to rest» — same subject. Ex: 大声说，好让大家都听见 «speak up so everyone hears» — different subjects. Ex: 早点儿走，好赶上火车 «leave earlier so you catch the train». 好让 (hǎo ràng) = «so that someone can». Used when the purpose concerns SOMEONE OTHER than the initial subject. Structure: [action 1], 好让 + [person] + [what they can do]. Ex: 请把门开着，好让客人进来 «keep the door open so guests can come in». Ex: 说慢一点儿，好让我听懂 «speak slower so I understand». Nuance vs 为了: 为了 is broader and more formal; 好/好让 is very conversational, daily oral.',
    items: [
      { hanzi: '好', pinyin: 'hǎo', meaning: 'pour que, afin que (oral)', meaningEn: 'so that (oral)', audio: 'audio/hsk1/hsk1_好.wav' },
      { hanzi: '好让', pinyin: 'hǎo ràng', meaning: 'pour que quelqu\'un puisse', meaningEn: 'so that someone can', audio: 'audio/hsk2/hsk2_让.wav' },
      { hanzi: '我提前完成作业，好有时间休息', pinyin: 'wǒ tí qián wán chéng zuò yè, hǎo yǒu shí jiān xiū xi', meaning: 'je finis les devoirs tôt, pour avoir le temps de me reposer', meaningEn: 'I finish homework early to have time to rest', audio: 'audio/hsk2/hsk2_休息.wav' },
      { hanzi: '大声说，好让大家都听见', pinyin: 'dà shēng shuō, hǎo ràng dà jiā dōu tīng jiàn', meaning: 'parle fort, que tout le monde entende', meaningEn: 'speak loudly so everyone hears', audio: 'audio/hsk1/hsk1_大家.wav' },
      { hanzi: '早点儿走，好赶上火车', pinyin: 'zǎo diǎn ér zǒu, hǎo gǎn shàng huǒ chē', meaning: 'pars plus tôt, comme ça tu attrapes le train', meaningEn: 'leave earlier so you catch the train', audio: 'audio/hsk2/hsk2_火车.wav' },
      { hanzi: '请把门开着，好让客人进来', pinyin: 'qǐng bǎ mén kāi zhe, hǎo ràng kè rén jìn lái', meaning: 'laisse la porte ouverte pour que les invités entrent', meaningEn: 'keep the door open so guests can enter', audio: 'audio/hsk2/hsk2_门.wav' },
      { hanzi: '说慢一点儿，好让我听懂', pinyin: 'shuō màn yī diǎn ér, hǎo ràng wǒ tīng dǒng', meaning: 'parle plus lentement pour que je comprenne', meaningEn: 'speak slower so I understand', audio: 'audio/hsk2/hsk2_听.wav' }
    ],
    tip:
      'Astuce : 好让 = « pour que quelqu\'un puisse ». Ultra pratique quand tu fais qch pour la commodité de qqn d\'autre.',
    tipEn:
      'Tip: 好让 = «so that someone can». Super handy when you\'re doing something for someone else\'s convenience.'
  },
  {
    id: 'a2-purpose-weideshi-zhi-suoyi-shi-weile',
    title: '为的是 + 之所以...是为了 : mettre le but en avant',
    titleEn: '为的是 + 之所以...是为了: putting the purpose front and center',
    body:
      '为的是 (wèi de shì) = « la raison, c\'est pour... ». Structure : [action]，为的是 + [but]. Emphase sur l\'intention.\n' +
      '- Ex : 他每天跑步，为的是保持健康 (py tā měi tiān pǎo bù, wèi de shì bǎo chí jiàn kāng) « il court tous les jours, c\'est pour rester en forme ». Ton explicatif, comme si on clarifiait la motivation.\n' +
      '- Ex : 我学中文，为的是了解中国文化 « j\'apprends le chinois, c\'est pour comprendre la culture chinoise ».\n' +
      '\n' +
      'Nuance vs 为了 : 为了 vient EN TÊTE. 为的是 vient APRÈS l\'action, insiste sur « voici pourquoi ».\n' +
      '- 为了保持健康，他每天跑步 (défaut, sobre).\n' +
      '- 他每天跑步，为的是保持健康 (« il fait ça, c\'est pour... », emphase pédagogique).\n' +
      '\n' +
      '之所以...是为了... (zhī suǒ yǐ ... shì wèi le) = « la raison pour laquelle... c\'est pour ». Formel, analytique.\n' +
      '\n' +
      'Structure : sujet + 之所以 + [action]，是为了 + [but].\n' +
      '- Ex : 他之所以辞职，是为了专心创业 (py tā zhī suǒ yǐ cí zhí, shì wèi le zhuān xīn chuàng yè) « s\'il a démissionné, c\'est pour se consacrer à son entreprise ». Registre soutenu.\n' +
      '- Ex : 我们之所以选这个方案，是为了节省成本 « nous avons choisi cette option, c\'est pour économiser des coûts ». Style rapport.\n' +
      '\n' +
      'Ne pas confondre avec 之所以...是因为... (cause au lieu de but).\n' +
      '- 是为了 = BUT visé.\n' +
      '- 是因为 = CAUSE passée.',
    bodyEn:
      '为的是 (wèi de shì) = «the reason is to...». Structure: [action], 为的是 + [purpose]. Emphasizes intention. Ex: 他每天跑步，为的是保持健康 «he runs every day — the reason is to stay healthy». Explanatory tone, as if clarifying motivation. Ex: 我学中文，为的是了解中国文化 «I study Chinese, the reason is to understand Chinese culture». Nuance vs 为了: 为了 comes UP FRONT; 为的是 comes AFTER the action, insists on «here\'s why». 为了保持健康，他每天跑步 (default, plain) vs 他每天跑步，为的是保持健康 («he does that — it\'s to...», teaching-tone emphasis). 之所以...是为了... (zhī suǒ yǐ ... shì wèi le) = «the reason (why) ... is to ...». Formal, analytical. Structure: subject + 之所以 + [action], 是为了 + [purpose]. Ex: 他之所以辞职，是为了专心创业 «the reason he quit is to focus on his startup». Elevated register. Ex: 我们之所以选这个方案，是为了节省成本 «the reason we chose this plan is to save costs». Report style. Don\'t confuse with 之所以...是因为... (cause instead of purpose). 是为了 = intended PURPOSE; 是因为 = past CAUSE.',
    items: [
      { hanzi: '为的是', pinyin: 'wèi de shì', meaning: 'la raison, c\'est pour', meaningEn: 'the reason is to', audio: 'audio/hsk3/hsk3_为了.wav' },
      { hanzi: '之所以', pinyin: 'zhī suǒ yǐ', meaning: 'la raison pour laquelle', meaningEn: 'the reason why', audio: 'audio/hsk4/hsk4_之所以.wav' },
      { hanzi: '是为了', pinyin: 'shì wèi le', meaning: 'c\'est pour (but)', meaningEn: 'is to (purpose)', audio: 'audio/hsk3/hsk3_为了.wav' },
      { hanzi: '他每天跑步，为的是保持健康', pinyin: 'tā měi tiān pǎo bù, wèi de shì bǎo chí jiàn kāng', meaning: 'il court chaque jour, c\'est pour rester en forme', meaningEn: 'he runs daily — the reason is to stay healthy', audio: 'audio/hsk3/hsk3_健康.wav' },
      { hanzi: '我学中文，为的是了解中国文化', pinyin: 'wǒ xué zhōng wén, wèi de shì liǎo jiě zhōng guó wén huà', meaning: 'j\'apprends le chinois, c\'est pour comprendre la culture', meaningEn: 'I study Chinese, the reason is to understand the culture', audio: 'audio/hsk3/hsk3_文化.wav' },
      { hanzi: '他之所以辞职，是为了专心创业', pinyin: 'tā zhī suǒ yǐ cí zhí, shì wèi le zhuān xīn chuàng yè', meaning: 's\'il a démissionné, c\'est pour se consacrer à son entreprise', meaningEn: 'the reason he quit is to focus on his startup', audio: 'audio/hsk5/hsk5_辞职.wav' },
      { hanzi: '我们之所以选这个方案，是为了节省成本', pinyin: 'wǒ men zhī suǒ yǐ xuǎn zhè ge fāng àn, shì wèi le jié shěng chéng běn', meaning: 'nous avons choisi ce plan, c\'est pour économiser', meaningEn: 'the reason we chose this plan is to save costs', audio: 'audio/hsk5/hsk5_方案.wav' }
    ],
    tip:
      'Astuce : 之所以...是为了 est ton meilleur ami dans une dissertation HSK ou un email pro. Insiste sur la logique et rend le but explicite.',
    tipEn:
      'Tip: 之所以...是为了 is your best friend for an HSK essay or a pro email. Highlights logic and makes the purpose explicit.'
  }
];

// --- cecr-a2-nuances-cause-effect-basics — Cause et effet : basiques ------
export const a2NuancesCauseEffectBasicsLearnSections: LessonV2LearnSection[] = [
  {
    id: 'a2-cause-basics-yinwei-suoyi',
    title: '因为...所以... : le classique, et sans connecteur',
    titleEn: '因为...所以...: the classic, and no connector',
    body:
      'Le chinois adore le DUO 因为 + 所以 ensemble (contrairement au français qui évite « parce que... donc... »).\n' +
      '\n' +
      'Structure : 因为 + [cause]，所以 + [résultat].\n' +
      '- Ex : 因为明天有考试，所以我想早一点儿睡觉 (py yīn wèi míng tiān yǒu kǎo shì, suǒ yǐ wǒ xiǎng zǎo yì diǎnr shuì jiào) « comme j\'ai un examen demain, je veux me coucher tôt ».\n' +
      '\n' +
      'Utiliser un seul des deux est aussi correct : soit 因为... seul (répondre à « pourquoi »), soit 所以... seul (cause déjà connue).\n' +
      '- Ex : 因为下雨了 « parce qu\'il pleut ».\n' +
      '- Ex : 所以我没来 « donc je ne suis pas venu ».\n' +
      '\n' +
      'Sans connecteur — approche ULTRA élégante : juste juxtaposer cause + résultat séparés par une virgule. Le contexte fait le lien.\n' +
      '- Ex : 他生病了，没来上课 (py tā shēng bìng le, méi lái shàng kè) « il est tombé malade, il n\'est pas venu en cours ». Cause et effet évidents, aucun besoin de mot de liaison. Très naturel à l\'oral.',
    bodyEn:
      'Chinese loves the DUO 因为 + 所以 together (unlike English which avoids «because... so...»). Structure: 因为 + [cause], 所以 + [result]. Ex: 因为明天有考试，所以我想早一点儿睡觉 «since I have an exam tomorrow, I want to sleep early». Using only one of the two is also fine: 因为... alone (answering «why»), or 所以... alone (cause already known). Ex: 因为下雨了 «because it\'s raining». Ex: 所以我没来 «so I didn\'t come». No connector — ULTRA elegant: just juxtapose cause + result separated by a comma. Context does the linking. Ex: 他生病了，没来上课 «he got sick, he didn\'t come to class». Cause and effect obvious, no need for a link word. Very natural orally.',
    items: [
      { hanzi: '因为', pinyin: 'yīn wèi', meaning: 'parce que', meaningEn: 'because', audio: 'audio/hsk2/hsk2_因为.wav' },
      { hanzi: '所以', pinyin: 'suǒ yǐ', meaning: 'donc, c\'est pourquoi', meaningEn: 'so, therefore', audio: 'audio/hsk2/hsk2_所以.wav' },
      { hanzi: '因为...所以...', pinyin: 'yīn wèi ... suǒ yǐ ...', meaning: 'parce que... donc...', meaningEn: 'because... so...', audio: 'audio/hsk2/hsk2_因为.wav' },
      { hanzi: '因为明天有考试，所以我想早一点儿睡觉', pinyin: 'yīn wèi míng tiān yǒu kǎo shì, suǒ yǐ wǒ xiǎng zǎo yì diǎnr shuì jiào', meaning: 'comme j\'ai un examen demain, je veux dormir tôt', meaningEn: 'since I have an exam tomorrow, I want to sleep early', audio: 'audio/hsk2/hsk2_考试.wav' },
      { hanzi: '因为下雨了', pinyin: 'yīn wèi xià yǔ le', meaning: 'parce qu\'il pleut', meaningEn: 'because it\'s raining', audio: 'audio/hsk1/hsk1_下雨.wav' },
      { hanzi: '所以我没来', pinyin: 'suǒ yǐ wǒ méi lái', meaning: 'donc je ne suis pas venu', meaningEn: 'so I didn\'t come', audio: 'audio/hsk1/hsk1_来.wav' },
      { hanzi: '他生病了，没来上课', pinyin: 'tā shēng bìng le, méi lái shàng kè', meaning: 'il est tombé malade, il n\'est pas venu en cours', meaningEn: 'he got sick, he didn\'t come to class', audio: 'audio/hsk3/hsk3_生病.wav' }
    ],
    tip:
      'Astuce : quand le lien est ÉVIDENT, laisse tomber les connecteurs. Le chinois oral zappe le 因为/所以 dans la majorité des cas.',
    tipEn:
      'Tip: when the link is OBVIOUS, drop the connectors. Spoken Chinese skips 因为/所以 most of the time.'
  },
  {
    id: 'a2-cause-basics-yushi-jieguo',
    title: '于是 (narration) et 结果 (retournement)',
    titleEn: '于是 (narration) and 结果 (twist)',
    body:
      '于是 (yú shì) = « et alors / du coup ». Enchaîne un événement et une ACTION prise en réponse. Ton narratif.\n' +
      '\n' +
      'Structure : [événement]，于是 + [action prise].\n' +
      '- Ex : 他不喜欢这个工作，于是离开了这家公司 (py tā bù xǐ huan zhè ge gōng zuò, yú shì lí kāi le zhè jiā gōng sī) « il n\'aimait pas ce boulot, du coup il a quitté l\'entreprise ».\n' +
      '- Ex : 太累了，于是他睡着了 « il était trop fatigué, du coup il s\'est endormi ».\n' +
      '\n' +
      'Différent de 所以 : 于是 raconte une histoire, 所以 explique une conséquence logique. 所以 = neutre. 于是 = narratif.\n' +
      '\n' +
      '结果 (jié guǒ) = « au final / résultat des courses ». Introduit un résultat INATTENDU, ironique ou contraire aux attentes.\n' +
      '\n' +
      'Structure : [plan/attente]，结果 + [ce qui s\'est vraiment passé].\n' +
      '- Ex : 他们准备去野餐，结果下起了大雨 (py tā men zhǔn bèi qù yě cān, jié guǒ xià qǐ le dà yǔ) « ils voulaient pique-niquer, résultat il a plu à torrents ».\n' +
      '- Ex : 我以为他会同意，结果他拒绝了 « je pensais qu\'il accepterait, mais finalement il a refusé ».\n' +
      '\n' +
      'Nuance : 结果 signale souvent un rebondissement, un plot twist, une surprise déçue.',
    bodyEn:
      '于是 (yú shì) = «and then / so». Chains an event with an ACTION taken in response. Narrative tone. Structure: [event], 于是 + [action]. Ex: 他不喜欢这个工作，于是离开了这家公司 «he didn\'t like his job, so he left the company». Ex: 太累了，于是他睡着了 «he was too tired, so he fell asleep». Different from 所以: 于是 tells a story, 所以 explains a logical consequence. 所以 = neutral. 于是 = narrative. 结果 (jié guǒ) = «in the end / as it turned out». Introduces an UNEXPECTED, ironic or counter-expectation result. Structure: [plan/expectation], 结果 + [what really happened]. Ex: 他们准备去野餐，结果下起了大雨 «they planned a picnic, and it poured». Ex: 我以为他会同意，结果他拒绝了 «I thought he\'d agree, but he refused». Nuance: 结果 often signals a plot twist, a disappointment.',
    items: [
      { hanzi: '于是', pinyin: 'yú shì', meaning: 'et alors, du coup', meaningEn: 'and then, so', audio: 'audio/hsk4/hsk4_于是.wav' },
      { hanzi: '结果', pinyin: 'jié guǒ', meaning: 'au final, résultat', meaningEn: 'in the end, as it turned out', audio: 'audio/hsk3/hsk3_结果.wav' },
      { hanzi: '他不喜欢这个工作，于是离开了这家公司', pinyin: 'tā bù xǐ huan zhè ge gōng zuò, yú shì lí kāi le zhè jiā gōng sī', meaning: 'il n\'aimait pas ce boulot, du coup il a démissionné', meaningEn: 'he didn\'t like his job, so he quit', audio: 'audio/hsk2/hsk2_工作.wav' },
      { hanzi: '太累了，于是他睡着了', pinyin: 'tài lèi le, yú shì tā shuì zháo le', meaning: 'trop fatigué, du coup il s\'est endormi', meaningEn: 'too tired, so he fell asleep', audio: 'audio/hsk2/hsk2_累.wav' },
      { hanzi: '他们准备去野餐，结果下起了大雨', pinyin: 'tā men zhǔn bèi qù yě cān, jié guǒ xià qǐ le dà yǔ', meaning: 'ils voulaient pique-niquer, résultat il a plu', meaningEn: 'they planned a picnic, and it poured', audio: 'audio/hsk4/hsk4_野餐.wav' },
      { hanzi: '我以为他会同意，结果他拒绝了', pinyin: 'wǒ yǐ wéi tā huì tóng yì, jié guǒ tā jù jué le', meaning: 'je pensais qu\'il accepterait, mais il a refusé', meaningEn: 'I thought he\'d agree, but he refused', audio: 'audio/hsk3/hsk3_同意.wav' }
    ],
    tip:
      'Astuce : 于是 pour raconter une suite logique, 结果 pour souligner le twist. Dans un récit oral, ces 2 mots donnent du relief.',
    tipEn:
      'Tip: 于是 for a logical sequel, 结果 to highlight the twist. In oral storytelling, these 2 words add texture.'
  },
  {
    id: 'a2-cause-basics-jiran-jiu',
    title: '既然...就... : « puisque..., alors... »',
    titleEn: '既然...就...: «since..., then...»',
    body:
      'Ce duo introduit un FAIT DÉJÀ ACCEPTÉ (既然) et propose une conséquence logique (就), souvent suggestion ou conseil.\n' +
      '\n' +
      'Structure : 既然 + [fait admis]，就 + [suggestion/conclusion logique].\n' +
      '- Ex : 既然天气这么好，我们就去公园吧 (py jì rán tiān qì zhè me hǎo, wǒ men jiù qù gōng yuán ba) « puisqu\'il fait si beau, allons au parc ».\n' +
      '- Ex : 既然你不想去，就别去了 « puisque tu ne veux pas y aller, alors n\'y va pas ».\n' +
      '- Ex : 既然大家都同意，我们就开始吧 « puisque tout le monde est d\'accord, commençons ».\n' +
      '\n' +
      'Distinction cruciale vs 如果...就... (si...alors) :\n' +
      '- 如果 = HYPOTHÉTIQUE (peut arriver, peut ne pas arriver).\n' +
      '- 既然 = ACCEPTÉ / RECONNU (déjà vrai).\n' +
      '\n' +
      'Ex contraste : 如果下雨，我们就不去 « s\'il pleut, on n\'y va pas » (on ne sait pas encore). 既然下雨了，我们就不去 « puisqu\'il pleut, on n\'y va pas » (fait acquis, il pleut déjà).\n' +
      '\n' +
      'Souvent avec 吧 pour proposer, avec 别 pour déconseiller.',
    bodyEn:
      'This duo introduces an ALREADY ACCEPTED FACT (既然) and proposes a logical consequence (就), often a suggestion or advice. Structure: 既然 + [accepted fact], 就 + [suggestion/logical conclusion]. Ex: 既然天气这么好，我们就去公园吧 «since the weather is so nice, let\'s go to the park». Ex: 既然你不想去，就别去了 «since you don\'t want to go, then don\'t». Ex: 既然大家都同意，我们就开始吧 «since everyone agrees, let\'s start». Crucial distinction vs 如果...就... (if...then): 如果 = HYPOTHETICAL (may or may not happen); 既然 = ACCEPTED / ACKNOWLEDGED (already true). Contrast: 如果下雨，我们就不去 «if it rains, we\'re not going» (still unknown). 既然下雨了，我们就不去 «since it\'s raining, we\'re not going» (it already is). Often with 吧 to propose, with 别 to dissuade.',
    items: [
      { hanzi: '既然', pinyin: 'jì rán', meaning: 'puisque, du moment que', meaningEn: 'since, given that', audio: 'audio/hsk4/hsk4_既然.wav' },
      { hanzi: '就', pinyin: 'jiù', meaning: 'alors (conséquence)', meaningEn: 'then (consequence)', audio: 'audio/hsk2/hsk2_就.wav' },
      { hanzi: '既然...就...', pinyin: 'jì rán ... jiù ...', meaning: 'puisque... alors...', meaningEn: 'since... then...', audio: 'audio/hsk4/hsk4_既然.wav' },
      { hanzi: '既然天气这么好，我们就去公园吧', pinyin: 'jì rán tiān qì zhè me hǎo, wǒ men jiù qù gōng yuán ba', meaning: 'puisqu\'il fait si beau, allons au parc', meaningEn: 'since the weather is so nice, let\'s go to the park', audio: 'audio/hsk3/hsk3_公园.wav' },
      { hanzi: '既然你不想去，就别去了', pinyin: 'jì rán nǐ bù xiǎng qù, jiù bié qù le', meaning: 'puisque tu ne veux pas y aller, n\'y va pas', meaningEn: 'since you don\'t want to go, don\'t', audio: 'audio/hsk2/hsk2_别.wav' },
      { hanzi: '既然大家都同意，我们就开始吧', pinyin: 'jì rán dà jiā dōu tóng yì, wǒ men jiù kāi shǐ ba', meaning: 'puisque tout le monde est d\'accord, commençons', meaningEn: 'since everyone agrees, let\'s start', audio: 'audio/hsk2/hsk2_开始.wav' },
      { hanzi: '如果下雨，我们就不去', pinyin: 'rú guǒ xià yǔ, wǒ men jiù bú qù', meaning: 's\'il pleut, on n\'y va pas', meaningEn: 'if it rains, we\'re not going', audio: 'audio/hsk3/hsk3_如果.wav' },
      { hanzi: '既然下雨了，我们就不去', pinyin: 'jì rán xià yǔ le, wǒ men jiù bú qù', meaning: 'puisqu\'il pleut, on n\'y va pas', meaningEn: 'since it\'s raining, we\'re not going', audio: 'audio/hsk1/hsk1_下雨.wav' }
    ],
    tip:
      'Astuce : à chaque fois qu\'un fait est admis et que tu veux en tirer une conclusion pratique, 既然...就 est parfait. Le 就 est OBLIGATOIRE.',
    tipEn:
      'Tip: whenever a fact is accepted and you want to draw a practical conclusion, 既然...就 fits perfectly. The 就 is MANDATORY.'
  }
];

export const a2NuancesTogetherLearnSections: LessonV2LearnSection[] = [
  {
    id: 'a2-together-yiqi-yikuair',
    title: '一起 et 一块儿 : « ensemble » au quotidien',
    titleEn: '一起 and 一块儿: «together» in daily life',
    body:
      'Les 4 mots pour « ensemble » commencent tous par 一 (« un »), suggérant l\'unité. Voici les 2 les plus courants pour l\'oral quotidien.\n' +
      '\n' +
      '一起 (yì qǐ) = LE défaut universel. Neutre, versatile, oral comme écrit. Le mot à connaître en priorité.\n' +
      '\n' +
      'Structure : sujet + (和/跟 + personne) + 一起 + verbe. Le partenaire est optionnel.\n' +
      '- Ex : 我们一起去公园散步 (py wǒmen yì qǐ qù gōng yuán sàn bù) « on va se promener au parc ensemble ».\n' +
      '- Ex : 我和你一起去 (py wǒ hé nǐ yì qǐ qù) « je viens avec toi ». Le 和 (« avec ») introduit le compagnon.\n' +
      '- Ex : 你跟我们一起吃饭吧 (py nǐ gēn wǒ men yì qǐ chī fàn ba) « mange avec nous ». Le 跟 est équivalent oral de 和.\n' +
      '- Ex : 每个周末我们一起看电影 « chaque weekend on regarde un film ensemble ».\n' +
      '\n' +
      '一块儿 (yí kuàir) = équivalent COLLOQUIAL et NORDISTE, très ami. Le 儿 final trahit le parler pékinois. Prononcé "yí kuàir" (yī devient 2e ton devant le 4e ton de 块).\n' +
      '\n' +
      'Structure : identique à 一起.\n' +
      '- Ex : 下班后，我们一块儿去吃饭 (py xià bān hòu, wǒmen yí kuàir qù chī fàn) « après le boulot, on va manger ensemble ». Ton copain-copine.\n' +
      '- Ex : 咱们一块儿走吧 « allons-y ensemble ». 咱们 (nous inclusif) + 一块儿 = ultra Beijing.\n' +
      '\n' +
      'Comparaison : dans le sud de la Chine ou à l\'écrit, on préfère 一起. À l\'écrit formel, 一起 est le seul choix approprié entre ces deux.\n' +
      '\n' +
      'Astuce prononciation : le 儿 dans 一块儿 se prononce comme un « r » collé à la fin de 块, pas comme « तr ». C\'est un rétroflexe qui donne cette sonorité typique du mandarin nordiste.',
    bodyEn:
      'All 4 words for «together» start with 一 («one»), suggesting unity. Here are the 2 most common ones for daily spoken use. 一起 (yì qǐ) = THE universal default. Neutral, versatile, spoken and written. The one to know first. Structure: subject + (和/跟 + person) + 一起 + verb. Partner is optional. Ex: 我们一起去公园散步 «let\'s take a walk in the park together». Ex: 我和你一起去 «I\'ll come with you». 和 («with») introduces the companion. Ex: 你跟我们一起吃饭吧 «eat with us». 跟 is the oral equivalent of 和. Ex: 每个周末我们一起看电影 «every weekend we watch a movie together». 一块儿 (yí kuàir) = COLLOQUIAL and NORTHERN equivalent, very friendly. The final 儿 betrays the Beijing accent. Pronounced "yí kuàir" (yī becomes 2nd tone before the 4th tone of 块). Structure: same as 一起. Ex: 下班后，我们一块儿去吃饭 «after work, let\'s go eat together». Buddy tone. Ex: 咱们一块儿走吧 «let\'s go together». 咱们 (inclusive we) + 一块儿 = ultra Beijing. Comparison: in southern China or in writing, 一起 is preferred. In formal writing, 一起 is the only appropriate choice between the two. Pronunciation tip: the 儿 in 一块儿 sounds like an «r» stuck to the end of 块, not like a separate syllable. It\'s a retroflex giving that typical northern Mandarin sound.',
    items: [
      { hanzi: '一起', pinyin: 'yì qǐ', meaning: 'ensemble (neutre)', meaningEn: 'together (neutral)', audio: 'audio/hsk1/hsk1_一起.wav' },
      { hanzi: '一块儿', pinyin: 'yí kuàir', meaning: 'ensemble (oral, nord)', meaningEn: 'together (oral, northern)', audio: 'audio/hsk3/hsk3_一块儿.wav' },
      { hanzi: '和', pinyin: 'hé', meaning: 'et, avec', meaningEn: 'and, with', audio: 'audio/hsk1/hsk1_和.wav' },
      { hanzi: '跟', pinyin: 'gēn', meaning: 'avec (oral)', meaningEn: 'with (oral)', audio: 'audio/hsk2/hsk2_跟.wav' },
      { hanzi: '我们一起去公园散步', pinyin: 'wǒ men yì qǐ qù gōng yuán sàn bù', meaning: 'on va se promener au parc ensemble', meaningEn: 'let\'s walk in the park together', audio: 'audio/hsk3/hsk3_散步.wav' },
      { hanzi: '我和你一起去', pinyin: 'wǒ hé nǐ yì qǐ qù', meaning: 'je viens avec toi', meaningEn: 'I\'ll come with you', audio: 'audio/hsk1/hsk1_一起.wav' },
      { hanzi: '你跟我们一起吃饭吧', pinyin: 'nǐ gēn wǒ men yì qǐ chī fàn ba', meaning: 'mange avec nous', meaningEn: 'eat with us', audio: 'audio/hsk1/hsk1_吃饭.wav' },
      { hanzi: '每个周末我们一起看电影', pinyin: 'měi ge zhōu mò wǒ men yì qǐ kàn diàn yǐng', meaning: 'chaque weekend on regarde un film ensemble', meaningEn: 'every weekend we watch a movie together', audio: 'audio/hsk1/hsk1_电影.wav' },
      { hanzi: '下班后，我们一块儿去吃饭', pinyin: 'xià bān hòu, wǒ men yí kuàir qù chī fàn', meaning: 'après le boulot, on va manger ensemble', meaningEn: 'after work, let\'s eat together', audio: 'audio/hsk2/hsk2_下班.wav' },
      { hanzi: '咱们一块儿走吧', pinyin: 'zán men yí kuàir zǒu ba', meaning: 'allons-y ensemble', meaningEn: 'let\'s go together', audio: 'audio/hsk3/hsk3_咱们.wav' }
    ],
    tip:
      'Astuce : à l\'oral avec des amis, 一块儿 sonne chaleureux. Dans une réunion pro, un email ou un contexte écrit, garde toujours 一起.',
    tipEn:
      'Tip: orally with friends, 一块儿 sounds warm. In a work meeting, an email or written context, always stick with 一起.'
  },
  {
    id: 'a2-together-yiqi-yitong',
    title: '一齐 (simultané) et 一同 (soutenu) : registres particuliers',
    titleEn: '一齐 (simultaneous) and 一同 (formal): specific registers',
    body:
      '一齐 (yì qí) = « ensemble AU MÊME INSTANT / en cœur / en synchronisation ». Insiste sur la SIMULTANÉITÉ.\n' +
      '\n' +
      'Structure : sujet pluriel + 一齐 + verbe.\n' +
      '- Ex : 他们一齐举手 (py tā men yì qí jǔ shǒu) « ils ont levé la main tous en même temps ». La synchronicité est essentielle.\n' +
      '- Ex : 大家一齐鼓掌 « tout le monde a applaudi en cœur ». Applaudissements coordonnés.\n' +
      '- Ex : 学生们一齐回答 « les élèves ont répondu tous ensemble ». En chœur.\n' +
      '- Ex : 五个国家的代表一齐签字 « les représentants des 5 pays ont signé simultanément ».\n' +
      '\n' +
      'Nuance vs 一起 : 一起 = « ensemble » (fait joint, temps possiblement décalé). 一齐 = « ensemble » (fait joint ET simultané au même moment).\n' +
      '- 他们一起工作 = ils travaillent ensemble (peuvent avoir des horaires différents).\n' +
      '- 他们一齐鼓掌 = ils applaudissent tous en même temps (mouvement synchronisé).\n' +
      '\n' +
      'Registre : plutôt écrit, journalistique, littéraire. À l\'oral quotidien, 一起 fait le job même quand il y a synchronicité (contexte suffit).\n' +
      '\n' +
      '一同 (yì tóng) = « ensemble » FORMEL/SOUTENU. Registre presse, invitations officielles, discours.\n' +
      '\n' +
      'Structure : sujet + (与 + personne) + 一同 + verbe. Note le 与 (yǔ, « avec ») qui remplace le familier 和/跟.\n' +
      '- Ex : 我与朋友一同参观了博物馆 (py wǒ yǔ péng you yì tóng cān guān le bó wù guǎn) « j\'ai visité le musée avec un ami ». Style écrit soutenu.\n' +
      '- Ex : 请与我们一同庆祝 « rejoignez-nous pour célébrer ». Invitation formelle.\n' +
      '- Ex : 两国元首一同出席 « les chefs d\'État des deux pays ont assisté ensemble ». Style presse politique.\n' +
      '- Ex : 与会者一同合影 « les participants ont pris une photo de groupe ». Communiqué officiel.\n' +
      '\n' +
      'À l\'oral décontracté ou avec un ami, dire 我与朋友一同 sonne pompeux — préfère 我和朋友一起.\n' +
      '\n' +
      'Récap des 4 registres :\n' +
      '- 一起 : neutre, TOUS contextes. Le défaut à connaître.\n' +
      '- 一块儿 : oral, nord de la Chine, amis proches.\n' +
      '- 一齐 : écrit, insiste sur la synchronisation exacte.\n' +
      '- 一同 : soutenu, presse, invitations officielles, avec 与.',
    bodyEn:
      '一齐 (yì qí) = «together AT THE SAME MOMENT / in unison / in sync». Emphasizes SIMULTANEITY. Structure: plural subject + 一齐 + verb. Ex: 他们一齐举手 «they all raised their hands at the same time». Synchrony is essential. Ex: 大家一齐鼓掌 «everyone applauded in unison». Coordinated clapping. Ex: 学生们一齐回答 «the students answered together». In chorus. Ex: 五个国家的代表一齐签字 «representatives of the 5 countries signed simultaneously». Nuance vs 一起: 一起 = «together» (joint action, possibly at different times). 一齐 = «together» (joint AND simultaneous). 他们一起工作 = they work together (schedules may differ). 他们一齐鼓掌 = they applaud simultaneously (synchronized movement). Register: more written, journalistic, literary. Orally, 一起 does the job even when there\'s synchronicity (context is enough). 一同 (yì tóng) = FORMAL/ELEVATED «together». Press, official invitations, speeches. Structure: subject + (与 + person) + 一同 + verb. Note 与 (yǔ, «with») replaces familiar 和/跟. Ex: 我与朋友一同参观了博物馆 «I visited the museum with a friend». Elevated written style. Ex: 请与我们一同庆祝 «join us to celebrate». Formal invitation. Ex: 两国元首一同出席 «heads of state of both countries attended together». Political press. Ex: 与会者一同合影 «attendees took a group photo». Official communiqué. In casual speech with a friend, 我与朋友一同 sounds pompous — use 我和朋友一起. Register recap: 一起 neutral, ALL contexts (the default); 一块儿 oral, northern China, close friends; 一齐 written, insists on exact synchronization; 一同 formal, press, official invitations, with 与.',
    items: [
      { hanzi: '一齐', pinyin: 'yì qí', meaning: 'ensemble (au même instant)', meaningEn: 'together (at the same moment)', audio: 'audio/hsk4/hsk4_一齐.wav' },
      { hanzi: '一同', pinyin: 'yì tóng', meaning: 'ensemble (soutenu)', meaningEn: 'together (formal)', audio: 'audio/hsk5/hsk5_一同.wav' },
      { hanzi: '与', pinyin: 'yǔ', meaning: 'avec, et (soutenu)', meaningEn: 'with, and (formal)', audio: 'audio/hsk4/hsk4_与.wav' },
      { hanzi: '他们一齐举手', pinyin: 'tā men yì qí jǔ shǒu', meaning: 'ils ont levé la main tous en même temps', meaningEn: 'they all raised their hands at the same time', audio: 'audio/hsk4/hsk4_举.wav' },
      { hanzi: '大家一齐鼓掌', pinyin: 'dà jiā yì qí gǔ zhǎng', meaning: 'tout le monde a applaudi en cœur', meaningEn: 'everyone applauded in unison', audio: 'audio/hsk5/hsk5_鼓掌.wav' },
      { hanzi: '学生们一齐回答', pinyin: 'xué sheng men yì qí huí dá', meaning: 'les élèves ont répondu tous ensemble', meaningEn: 'the students answered together', audio: 'audio/hsk2/hsk2_回答.wav' },
      { hanzi: '五个国家的代表一齐签字', pinyin: 'wǔ ge guó jiā de dài biǎo yì qí qiān zì', meaning: 'les représentants des 5 pays ont signé simultanément', meaningEn: 'representatives of the 5 countries signed simultaneously', audio: 'audio/hsk5/hsk5_签.wav' },
      { hanzi: '我与朋友一同参观了博物馆', pinyin: 'wǒ yǔ péng you yì tóng cān guān le bó wù guǎn', meaning: 'j\'ai visité le musée avec un ami', meaningEn: 'I visited the museum with a friend', audio: 'audio/hsk4/hsk4_参观.wav' },
      { hanzi: '请与我们一同庆祝', pinyin: 'qǐng yǔ wǒ men yì tóng qìng zhù', meaning: 'rejoignez-nous pour célébrer', meaningEn: 'join us to celebrate', audio: 'audio/hsk4/hsk4_庆祝.wav' },
      { hanzi: '两国元首一同出席', pinyin: 'liǎng guó yuán shǒu yì tóng chū xí', meaning: 'les chefs d\'État des deux pays ont assisté ensemble', meaningEn: 'heads of state of both countries attended together', audio: 'audio/hsk5/hsk5_出席.wav' }
    ],
    tip:
      'Astuce : dans une invitation carton d\'un mariage chinois, on lira 请与我们一同分享. Dans un texto entre amis, on écrira 一起吃饭吧. Choisis selon le canal.',
    tipEn:
      'Tip: on a Chinese wedding invitation card, you\'ll read 请与我们一同分享. In a text between friends, you\'ll write 一起吃饭吧. Choose by channel.'
  }
];

export const a2NuancesFrequencyLearnSections: LessonV2LearnSection[] = [
  {
    id: 'a2-frequency-always-often',
    title: '« Toujours » et « souvent » : 总是, 老是, 通常, 常常, 经常',
    titleEn: '«Always» and «often»: 总是, 老是, 通常, 常常, 经常',
    body:
      'Le chinois offre plusieurs mots pour dire « toujours / souvent » avec des nuances de fréquence et de TON.\n' +
      '\n' +
      '总是 (zǒng shì) = « toujours » NEUTRE, marque une habitude constante. Se place avant le verbe.\n' +
      '- Ex : 她总是帮助别人 (py tā zǒng shì bāng zhù bié rén) « elle aide toujours les autres ». Constat objectif.\n' +
      '- Ex : 他总是迟到 (py tā zǒng shì chí dào) « il est toujours en retard ». Ton neutre.\n' +
      '\n' +
      '老是 (lǎo shì) = « toujours » avec AGACEMENT ou reproche. Version « ugh, ça recommence ». À l\'oral surtout.\n' +
      '- Ex : 他老是忘记带钥匙 (py tā lǎo shì wàng jì dài yào shi) « il oublie toujours ses clés ! ». Ton exaspéré.\n' +
      '- Ex : 你老是打断我 (py nǐ lǎo shì dǎ duàn wǒ) « tu m\'interromps sans arrêt ! ». Reproche.\n' +
      '\n' +
      'Version courte : à l\'oral décontracté, on peut dire 总 ou 老 seul (sans 是) : 他总迟到 / 他老忘记.\n' +
      '\n' +
      '通常 (tōng cháng) = « habituellement / d\'habitude » (pas 100 % mais la plupart du temps). Plus formel que « souvent ». Idéal pour routines et généralités.\n' +
      '- Ex : 他通常七点起床 (py tā tōng cháng qī diǎn qǐ chuáng) « d\'habitude il se lève à 7 h ».\n' +
      '- Ex : 冬天通常很冷 (py dōng tiān tōng cháng hěn lěng) « en hiver il fait généralement froid ».\n' +
      '\n' +
      '常常 (cháng cháng) = « souvent », très courant en oral et écrit.\n' +
      '- Ex : 我常常吃中餐 (py wǒ cháng cháng chī zhōng cān) « je mange souvent chinois ».\n' +
      '\n' +
      '经常 (jīng cháng) = « souvent », interchangeable avec 常常. Un chouïa plus soutenu à l\'écrit.\n' +
      '- Ex : 他经常运动 (py tā jīng cháng yùn dòng) « il fait souvent du sport ».\n' +
      '\n' +
      '常 seul (raccourci de 常常) : usage figé, surtout dans « 常来玩！» « viens souvent ! » (invitation) ou dans les proverbes.\n' +
      '\n' +
      'Récap de fréquence : 总是 (100 %, neutre) > 老是 (100 %, agacé) > 通常 (~80 %, formel) > 常常 / 经常 (~60-70 %, fréquent).',
    bodyEn:
      'Chinese offers several words for «always / often» with nuances of frequency and TONE. 总是 (zǒng shì) = NEUTRAL «always», marks a constant habit. Goes before the verb. Ex: 她总是帮助别人 «she always helps others». Objective statement. Ex: 他总是迟到 «he\'s always late». Neutral tone. 老是 (lǎo shì) = «always» with ANNOYANCE or reproach. The «ugh, here we go again» version. Mostly spoken. Ex: 他老是忘记带钥匙 «he\'s ALWAYS forgetting his keys!». Exasperated tone. Ex: 你老是打断我 «you keep interrupting me!». Reproach. Short version: in casual speech, one can say 总 or 老 alone (without 是): 他总迟到 / 他老忘记. 通常 (tōng cháng) = «usually / normally» (not 100% but most of the time). More formal than «often». Ideal for routines and general statements. Ex: 他通常七点起床 «he usually gets up at 7am». Ex: 冬天通常很冷 «in winter it\'s usually cold». 常常 (cháng cháng) = «often», very common in speech and writing. Ex: 我常常吃中餐 «I often eat Chinese food». 经常 (jīng cháng) = «often», interchangeable with 常常. Slightly more formal in writing. Ex: 他经常运动 «he often exercises». 常 alone (short for 常常): fixed usage, mostly in «常来玩！» «come visit often!» (invitation) or in proverbs. Frequency recap: 总是 (100%, neutral) > 老是 (100%, annoyed) > 通常 (~80%, formal) > 常常 / 经常 (~60-70%, frequent).',
    items: [
      { hanzi: '总是', pinyin: 'zǒng shì', meaning: 'toujours (neutre)', meaningEn: 'always (neutral)', audio: 'audio/hsk3/hsk3_总是.wav' },
      { hanzi: '老是', pinyin: 'lǎo shì', meaning: 'toujours (agacé)', meaningEn: 'always (annoyed)', audio: 'audio/hsk2/hsk2_老是.wav' },
      { hanzi: '通常', pinyin: 'tōng cháng', meaning: 'habituellement, d\'habitude', meaningEn: 'usually', audio: 'audio/hsk3/hsk3_通常.wav' },
      { hanzi: '常常', pinyin: 'cháng cháng', meaning: 'souvent', meaningEn: 'often', audio: 'audio/hsk1/hsk1_常常.wav' },
      { hanzi: '经常', pinyin: 'jīng cháng', meaning: 'souvent (un peu soutenu)', meaningEn: 'often (slightly formal)', audio: 'audio/hsk1/hsk1_经常.wav' },
      { hanzi: '她总是帮助别人', pinyin: 'tā zǒng shì bāng zhù bié rén', meaning: 'elle aide toujours les autres', meaningEn: 'she always helps others', audio: 'audio/hsk2/hsk2_帮助.wav' },
      { hanzi: '他总是迟到', pinyin: 'tā zǒng shì chí dào', meaning: 'il est toujours en retard', meaningEn: 'he\'s always late', audio: 'audio/hsk3/hsk3_迟到.wav' },
      { hanzi: '他老是忘记带钥匙', pinyin: 'tā lǎo shì wàng jì dài yào shi', meaning: 'il oublie toujours ses clés', meaningEn: 'he always forgets his keys', audio: 'audio/hsk1/hsk1_忘记.wav' },
      { hanzi: '你老是打断我', pinyin: 'nǐ lǎo shì dǎ duàn wǒ', meaning: 'tu m\'interromps sans arrêt', meaningEn: 'you keep interrupting me', audio: 'audio/hsk5/hsk5_打断.wav' },
      { hanzi: '他通常七点起床', pinyin: 'tā tōng cháng qī diǎn qǐ chuáng', meaning: 'd\'habitude il se lève à 7 h', meaningEn: 'he usually gets up at 7', audio: 'audio/hsk1/hsk1_起床.wav' },
      { hanzi: '冬天通常很冷', pinyin: 'dōng tiān tōng cháng hěn lěng', meaning: 'en hiver il fait généralement froid', meaningEn: 'winter is usually cold', audio: 'audio/hsk1/hsk1_冷.wav' },
      { hanzi: '我常常吃中餐', pinyin: 'wǒ cháng cháng chī zhōng cān', meaning: 'je mange souvent chinois', meaningEn: 'I often eat Chinese food', audio: 'audio/hsk1/hsk1_常常.wav' },
      { hanzi: '他经常运动', pinyin: 'tā jīng cháng yùn dòng', meaning: 'il fait souvent du sport', meaningEn: 'he often exercises', audio: 'audio/hsk1/hsk1_运动.wav' }
    ],
    tip:
      'Astuce : pour un compliment sur qqn de fiable, préfère 总是 ; pour râler contre un défaut, prends 老是.',
    tipEn:
      'Tip: for a compliment about someone reliable, use 总是; to grumble about a flaw, pick 老是.'
  },
  {
    id: 'a2-frequency-tends-and-everytime',
    title: '« En règle générale » 往往 + « chaque fois » 每次...都',
    titleEn: '«Generally» 往往 + «every time» 每次...都',
    body:
      '往往 (wǎng wǎng) = « en règle générale / tend à » — signale un pattern OBSERVÉ dans une condition. Nuance de « c\'est souvent le cas dans ce contexte ».\n' +
      '\n' +
      'Structure : sujet + 往往 + prédicat.\n' +
      '- Ex : 有钱人往往比较自信 (py yǒu qián rén wǎng wǎng bǐ jiào zì xìn) « les gens riches ont tendance à être plus sûrs d\'eux ».\n' +
      '- Ex : 下雨天往往堵车 (py xià yǔ tiān wǎng wǎng dǔ chē) « les jours de pluie, il y a souvent des embouteillages ». Constat contextuel.\n' +
      '- Ex : 老年人往往喜欢安静 (py lǎo nián rén wǎng wǎng xǐ huan ān jìng) « les personnes âgées ont tendance à préférer le calme ».\n' +
      '\n' +
      'Différence vs 常常/经常 : 常常/经常 = « souvent » (compte les occurrences). 往往 = « ça tend à arriver » (règle sociologique/logique liée à un contexte).\n' +
      '- 我常常晚睡 (py wǒ cháng cháng wǎn shuì) « je me couche souvent tard » (mon habitude).\n' +
      '- 我压力大的时候往往失眠 (py wǒ yā lì dà de shí hou wǎng wǎng shī mián) « quand je suis stressé, j\'ai tendance à faire de l\'insomnie » (règle conditionnelle).\n' +
      '\n' +
      '每次...都... (měi cì ... dōu ...) = « chaque fois que..., à chaque fois... ». Insiste sur l\'absence d\'exception.\n' +
      '\n' +
      'Structure : (sujet) + 每次 + [événement] + (sujet) + 都 + [résultat systématique].\n' +
      '- Ex : 我每次出门都忘记拿手机 (py wǒ měi cì chū mén dōu wàng jì ná shǒu jī) « chaque fois que je sors, j\'oublie mon téléphone ». Auto-critique.\n' +
      '- Ex : 他每次来都带礼物 (py tā měi cì lái dōu dài lǐ wù) « chaque fois qu\'il vient, il apporte un cadeau ». Constat systématique.\n' +
      '- Ex : 每次考试之前，我都很紧张 (py měi cì kǎo shì zhī qián, wǒ dōu hěn jǐn zhāng) « avant chaque examen, je suis toujours nerveux ». Cause récurrente.\n' +
      '\n' +
      'Le 都 est OBLIGATOIRE dans ce pattern. Sans lui, la phrase perd son sens systématique et sonne incomplète.\n' +
      '\n' +
      'Variantes : 每次...都... peut aussi utiliser 每天 (chaque jour), 每年 (chaque année), 每周 (chaque semaine) : 每天都 = « tous les jours sans exception ».',
    bodyEn:
      '往往 (wǎng wǎng) = «as a rule / tends to» — signals a pattern OBSERVED under a condition. Nuance of «it\'s often the case in this context». Structure: subject + 往往 + predicate. Ex: 有钱人往往比较自信 «wealthy people tend to be more confident». Ex: 下雨天往往堵车 «on rainy days there\'s often heavy traffic». Contextual observation. Ex: 老年人往往喜欢安静 «older people tend to prefer quiet». Difference vs 常常/经常: 常常/经常 = «often» (counts occurrences). 往往 = «it tends to happen» (sociological/logical rule tied to context). 我常常晚睡 «I often go to bed late» (my habit). 我压力大的时候往往失眠 «when I\'m stressed, I tend to have insomnia» (conditional rule). 每次...都... (měi cì ... dōu ...) = «every time..., every single time...». Emphasizes absence of exception. Structure: (subject) + 每次 + [event] + (subject) + 都 + [systematic result]. Ex: 我每次出门都忘记拿手机 «every time I go out, I forget my phone». Self-criticism. Ex: 他每次来都带礼物 «every time he comes, he brings a gift». Systematic observation. Ex: 每次考试之前，我都很紧张 «before every exam, I\'m always nervous». Recurring cause. 都 is MANDATORY in this pattern. Without it, the sentence loses its systematic meaning and sounds incomplete. Variants: 每次...都... can also use 每天 (every day), 每年 (every year), 每周 (every week): 每天都 = «every day without exception».',
    items: [
      { hanzi: '往往', pinyin: 'wǎng wǎng', meaning: 'en règle générale, tend à', meaningEn: 'as a rule, tends to', audio: 'audio/hsk3/hsk3_往往.wav' },
      { hanzi: '每次', pinyin: 'měi cì', meaning: 'chaque fois', meaningEn: 'every time', audio: 'audio/hors-hsk/hors-hsk_每次.wav' },
      { hanzi: '都', pinyin: 'dōu', meaning: 'tous, à chaque fois (marqueur)', meaningEn: 'all, every time (marker)', audio: 'audio/hsk1/hsk1_都.wav' },
      { hanzi: '有钱人往往比较自信', pinyin: 'yǒu qián rén wǎng wǎng bǐ jiào zì xìn', meaning: 'les gens riches ont tendance à être plus sûrs d\'eux', meaningEn: 'wealthy people tend to be more confident', audio: 'audio/hsk1/hsk1_自信.wav' },
      { hanzi: '下雨天往往堵车', pinyin: 'xià yǔ tiān wǎng wǎng dǔ chē', meaning: 'les jours de pluie, il y a souvent des embouteillages', meaningEn: 'on rainy days there\'s often traffic', audio: 'audio/hsk4/hsk4_堵车.wav' },
      { hanzi: '老年人往往喜欢安静', pinyin: 'lǎo nián rén wǎng wǎng xǐ huan ān jìng', meaning: 'les personnes âgées ont tendance à préférer le calme', meaningEn: 'older people tend to prefer quiet', audio: 'audio/hsk1/hsk1_安静.wav' },
      { hanzi: '我压力大的时候往往失眠', pinyin: 'wǒ yā lì dà de shí hou wǎng wǎng shī mián', meaning: 'quand je suis stressé j\'ai tendance à faire de l\'insomnie', meaningEn: 'when stressed I tend to have insomnia', audio: 'audio/hsk1/hsk1_失眠.wav' },
      { hanzi: '我每次出门都忘记拿手机', pinyin: 'wǒ měi cì chū mén dōu wàng jì ná shǒu jī', meaning: 'chaque fois que je sors, j\'oublie mon téléphone', meaningEn: 'every time I go out I forget my phone', audio: 'audio/hsk2/hsk2_出门.wav' },
      { hanzi: '他每次来都带礼物', pinyin: 'tā měi cì lái dōu dài lǐ wù', meaning: 'chaque fois qu\'il vient, il apporte un cadeau', meaningEn: 'every time he comes, he brings a gift', audio: 'audio/hsk1/hsk1_礼物.wav' },
      { hanzi: '每次考试之前，我都很紧张', pinyin: 'měi cì kǎo shì zhī qián, wǒ dōu hěn jǐn zhāng', meaning: 'avant chaque examen, je suis toujours nerveux', meaningEn: 'before every exam I\'m always nervous', audio: 'audio/hsk1/hsk1_紧张.wav' }
    ],
    tip:
      'Astuce : le duo 每次...都 est LE marqueur du systématisme. Utilise-le pour dépeindre une routine sans faille (ou un défaut agaçant sans exception).',
    tipEn:
      'Tip: the 每次...都 duo is THE marker of systematicity. Use it to depict an unfailing routine (or an annoying flaw with no exception).'
  },
  {
    id: 'a2-frequency-rarely-never',
    title: 'Fréquence basse : 有时候, 偶尔, 很少, 几乎不, 从来不, 从来没...过',
    titleEn: 'Low frequency: 有时候, 偶尔, 很少, 几乎不, 从来不, 从来没...过',
    body:
      '有时候 / 有时 (yǒu shí hou / yǒu shí) = « parfois ». La forme longue 有时候 est plus orale, la courte 有时 est plus écrite ou formelle. Placement flexible : début de phrase ou avant le verbe.\n' +
      '- Ex : 我有时候在家做饭 (py wǒ yǒu shí hou zài jiā zuò fàn) « parfois je cuisine à la maison ».\n' +
      '- Ex : 有时候我一个人去散步 (py yǒu shí hou wǒ yí gè rén qù sàn bù) « parfois je vais me promener seul ». Placement en début.\n' +
      '\n' +
      '偶尔 (ǒu ěr) = « occasionnellement / de temps en temps ». Moins fréquent que 有时候. Souvent avec 也.\n' +
      '- Ex : 我们偶尔出去吃饭 (py wǒ men ǒu ěr chū qù chī fàn) « on sort manger de temps en temps ». Sortie exceptionnelle.\n' +
      '- Ex : 我偶尔也听古典音乐 (py wǒ ǒu ěr yě tīng gǔ diǎn yīn yuè) « il m\'arrive de temps en temps d\'écouter du classique ». Événement rare.\n' +
      '\n' +
      '很少 (hěn shǎo) = « rarement ». Le 很 est ici FIGÉ, ne signifie pas vraiment « très ». Ne pas dire 少 seul, garder 很少.\n' +
      '- Ex : 我很少看电影 (py wǒ hěn shǎo kàn diàn yǐng) « je regarde rarement des films ».\n' +
      '- Ex : 他很少生气 (py tā hěn shǎo shēng qì) « il se met rarement en colère ». Trait de caractère.\n' +
      '\n' +
      '几乎不 (jī hū bù) = « presque jamais » (souligne la rareté extrême, avec 0.01 % de possibilité).\n' +
      '- Ex : 他几乎不说话 (py tā jī hū bù shuō huà) « il ne parle presque jamais ».\n' +
      '- Ex : 我几乎不喝咖啡 (py wǒ jī hū bù hē kā fēi) « je ne bois presque jamais de café ».\n' +
      '\n' +
      '从来不 / 从不 (cóng lái bù / cóng bù) = « jamais » HABITUEL (règle, principe). Emphase sur l\'absence totale depuis toujours jusqu\'à maintenant.\n' +
      '- Ex : 他从来不喝酒 (py tā cóng lái bù hē jiǔ) « il ne boit jamais d\'alcool ». Principe personnel.\n' +
      '- Ex : 我从来不撒谎 (py wǒ cóng lái bù sā huǎng) « je ne mens jamais ». Trait constant.\n' +
      '- 从不 = version courte, un peu plus soutenue.\n' +
      '\n' +
      '从来没...过 (cóng lái méi ... guò) = « jamais... [dans le passé] ». Pour dire qu\'on n\'a JAMAIS EU L\'EXPÉRIENCE de qch dans sa vie. Le 过 (guò) marque l\'expérience passée.\n' +
      '\n' +
      'Structure : sujet + 从来没 + verbe + 过 + (objet).\n' +
      '- Ex : 我从来没去过中国 (py wǒ cóng lái méi qù guò zhōng guó) « je ne suis jamais allé en Chine ».\n' +
      '- Ex : 他从来没吃过日本菜 (py tā cóng lái méi chī guò rì běn cài) « il n\'a jamais goûté la cuisine japonaise ».\n' +
      '\n' +
      'Distinction cruciale 从来不 vs 从来没...过 :\n' +
      '- 从来不喝酒 = « je ne bois JAMAIS d\'alcool (principe, refus habituel) ».\n' +
      '- 从来没喝过酒 = « je n\'ai jamais BU d\'alcool dans ma vie (pas d\'expérience) ».',
    bodyEn:
      '有时候 / 有时 (yǒu shí hou / yǒu shí) = «sometimes». The long form 有时候 is more oral, the short 有时 more written or formal. Flexible placement: start of sentence or before the verb. Ex: 我有时候在家做饭 «sometimes I cook at home». Ex: 有时候我一个人去散步 «sometimes I go for a walk alone». Start placement. 偶尔 (ǒu ěr) = «occasionally / now and then». Less frequent than 有时候. Often with 也. Ex: 我们偶尔出去吃饭 «we go out to eat occasionally». Exceptional outing. Ex: 我偶尔也听古典音乐 «I occasionally listen to classical music too». Rare event. 很少 (hěn shǎo) = «rarely». 很 is FROZEN here, doesn\'t really mean «very». Don\'t say 少 alone, keep 很少. Ex: 我很少看电影 «I rarely watch movies». Ex: 他很少生气 «he rarely gets angry». Character trait. 几乎不 (jī hū bù) = «almost never» (emphasizes extreme rarity, with 0.01% possibility). Ex: 他几乎不说话 «he almost never speaks». Ex: 我几乎不喝咖啡 «I almost never drink coffee». 从来不 / 从不 (cóng lái bù / cóng bù) = HABITUAL «never» (rule, principle). Emphasizes total absence from always to now. Ex: 他从来不喝酒 «he never drinks alcohol». Personal principle. Ex: 我从来不撒谎 «I never lie». Constant trait. 从不 = short version, slightly more formal. 从来没...过 (cóng lái méi ... guò) = «never... [in the past]». Says one has NEVER EXPERIENCED sth in their life. 过 (guò) marks past experience. Structure: subject + 从来没 + verb + 过 + (object). Ex: 我从来没去过中国 «I\'ve never been to China». Ex: 他从来没吃过日本菜 «he\'s never tried Japanese food». Crucial distinction 从来不 vs 从来没...过: 从来不喝酒 = «I NEVER drink alcohol (principle, habitual refusal)». 从来没喝过酒 = «I\'ve never DRUNK alcohol in my life (no experience)».',
    items: [
      { hanzi: '有时候', pinyin: 'yǒu shí hou', meaning: 'parfois', meaningEn: 'sometimes', audio: 'audio/hsk3/hsk3_有时候.wav' },
      { hanzi: '偶尔', pinyin: 'ǒu ěr', meaning: 'occasionnellement', meaningEn: 'occasionally', audio: 'audio/hsk1/hsk1_偶尔.wav' },
      { hanzi: '很少', pinyin: 'hěn shǎo', meaning: 'rarement', meaningEn: 'rarely', audio: 'audio/hsk1/hsk1_少.wav' },
      { hanzi: '几乎不', pinyin: 'jī hū bù', meaning: 'presque jamais', meaningEn: 'almost never', audio: 'audio/hsk3/hsk3_几乎.wav' },
      { hanzi: '从来不', pinyin: 'cóng lái bù', meaning: 'jamais (habituel)', meaningEn: 'never (habitual)', audio: 'audio/hsk3/hsk3_从来.wav' },
      { hanzi: '从来没', pinyin: 'cóng lái méi', meaning: 'jamais (expérience passée)', meaningEn: 'never (past experience)', audio: 'audio/hsk3/hsk3_从来.wav' },
      { hanzi: '过', pinyin: 'guò', meaning: 'marqueur d\'expérience passée', meaningEn: 'past experience marker', audio: 'audio/hsk1/hsk1_过.wav' },
      { hanzi: '我有时候在家做饭', pinyin: 'wǒ yǒu shí hou zài jiā zuò fàn', meaning: 'parfois je cuisine à la maison', meaningEn: 'sometimes I cook at home', audio: 'audio/hsk1/hsk1_做饭.wav' },
      { hanzi: '我们偶尔出去吃饭', pinyin: 'wǒ men ǒu ěr chū qù chī fàn', meaning: 'on sort manger de temps en temps', meaningEn: 'we go out to eat occasionally', audio: 'audio/hsk1/hsk1_出去.wav' },
      { hanzi: '我偶尔也听古典音乐', pinyin: 'wǒ ǒu ěr yě tīng gǔ diǎn yīn yuè', meaning: 'il m\'arrive de temps en temps d\'écouter du classique', meaningEn: 'I occasionally listen to classical music', audio: 'audio/hsk6/hsk6_古典.wav' },
      { hanzi: '我很少看电影', pinyin: 'wǒ hěn shǎo kàn diàn yǐng', meaning: 'je regarde rarement des films', meaningEn: 'I rarely watch movies', audio: 'audio/hsk1/hsk1_电影.wav' },
      { hanzi: '他很少生气', pinyin: 'tā hěn shǎo shēng qì', meaning: 'il se met rarement en colère', meaningEn: 'he rarely gets angry', audio: 'audio/hsk1/hsk1_生气.wav' },
      { hanzi: '他几乎不说话', pinyin: 'tā jī hū bù shuō huà', meaning: 'il ne parle presque jamais', meaningEn: 'he almost never speaks', audio: 'audio/hsk1/hsk1_说话.wav' },
      { hanzi: '我几乎不喝咖啡', pinyin: 'wǒ jī hū bù hē kā fēi', meaning: 'je ne bois presque jamais de café', meaningEn: 'I almost never drink coffee', audio: 'audio/hsk1/hsk1_咖啡.wav' },
      { hanzi: '他从来不喝酒', pinyin: 'tā cóng lái bù hē jiǔ', meaning: 'il ne boit jamais d\'alcool', meaningEn: 'he never drinks alcohol', audio: 'audio/hsk2/hsk2_酒.wav' },
      { hanzi: '我从来不撒谎', pinyin: 'wǒ cóng lái bù sā huǎng', meaning: 'je ne mens jamais', meaningEn: 'I never lie', audio: 'audio/hsk7/hsk7_撒谎.wav' },
      { hanzi: '我从来没去过中国', pinyin: 'wǒ cóng lái méi qù guò zhōng guó', meaning: 'je ne suis jamais allé en Chine', meaningEn: 'I\'ve never been to China', audio: 'audio/hsk1/hsk1_中国.wav' },
      { hanzi: '他从来没吃过日本菜', pinyin: 'tā cóng lái méi chī guò rì běn cài', meaning: 'il n\'a jamais goûté la cuisine japonaise', meaningEn: 'he\'s never tried Japanese food', audio: 'audio/hsk1/hsk1_日本.wav' }
    ],
    tip:
      'Astuce : sur l\'échelle de fréquence : 有时候 (~30 %) > 偶尔 (~10 %) > 很少 (~5 %) > 几乎不 (~1 %) > 从来不 (0 %, habitude) > 从来没...过 (0 %, expérience).',
    tipEn:
      'Tip: on the frequency scale: 有时候 (~30%) > 偶尔 (~10%) > 很少 (~5%) > 几乎不 (~1%) > 从来不 (0%, habit) > 从来没...过 (0%, experience).'
  }
];

// ═════════════════════════════════════════════════════════════════════════════
// A2 Grammaire — 在 basique : localisation, cadre d'action, « -ing » (CGG #61)
// ═════════════════════════════════════════════════════════════════════════════

export const a2GrammaireZaiBasicsLearnSections: LessonV2LearnSection[] = [
  {
    id: 'a2-zai-location-basics',
    title: 'Localisation avec 在 : dire où est qqch',
    titleEn: 'Location with 在: say where something is',
    body:
      '在 (zài) est un des mots-outils les plus fréquents en chinois. Sa fonction PREMIÈRE : indiquer une LOCALISATION.\n' +
      '\n' +
      'Structure basique : Sujet + 在 + Lieu → « X est à/dans... ».\n' +
      '- Ex : 我在家 (py wǒ zài jiā) « je suis à la maison ». Pas besoin de verbe « être » supplémentaire, 在 fait tout.\n' +
      '- Ex : 手机在桌子上 (py shǒu jī zài zhuō zi shàng) « le téléphone est sur la table ». Les particules de position (上, 里, 下...) précisent le lieu.\n' +
      '\n' +
      'Localisateurs courants :\n' +
      '- 里 (lǐ) « dans, à l\'intérieur » : 书在包里 (py shū zài bāo lǐ) « le livre est dans le sac ».\n' +
      '- 上 (shàng) « sur » : 猫在椅子上 (py māo zài yǐ zi shàng) « le chat est sur la chaise ».\n' +
      '- 下 (xià) « sous » : 狗在桌子下 (py gǒu zài zhuō zi xià) « le chien est sous la table ».\n' +
      '- 前 (qián) « devant » / 后 (hòu) « derrière » : 车在门前 (py chē zài mén qián) « la voiture est devant la porte ».\n' +
      '- 旁边 (páng biān) « à côté » : 商店在银行旁边 (py shāng diàn zài yín háng páng biān) « le magasin est à côté de la banque ».\n' +
      '\n' +
      'Négation : 不在 (bù zài) « ne pas être à/là ».\n' +
      '- Ex : 老板不在办公室 (py lǎo bǎn bù zài bàn gōng shì) « le patron n\'est pas au bureau ».\n' +
      '\n' +
      'Erreur classique : ne PAS dire 我是在家. En chinois, 在 remplace 是 pour la localisation.',
    bodyEn:
      '在 (zài) is one of the most frequent function words in Chinese. Its PRIMARY role: indicating LOCATION. Basic structure: Subject + 在 + Place → «X is at/in...». Ex: 我在家 «I\'m at home». No extra «to be» needed, 在 does everything. Ex: 手机在桌子上 «the phone is on the table». Position particles (上, 里, 下...) specify the place. Common localizers: 里 (lǐ) «inside»: 书在包里 «the book is in the bag». 上 (shàng) «on»: 猫在椅子上 «the cat is on the chair». 下 (xià) «under»: 狗在桌子下 «the dog is under the table». 前 (qián) «in front» / 后 (hòu) «behind»: 车在门前 «the car is in front of the door». 旁边 (páng biān) «next to»: 商店在银行旁边 «the shop is next to the bank». Negation: 不在 (bù zài) «not at/there». Ex: 老板不在办公室 «the boss isn\'t in the office». Classic mistake: do NOT say 我是在家. In Chinese, 在 replaces 是 for location.',
    items: [
      { hanzi: '在', pinyin: 'zài', meaning: 'à, dans, se trouver à', meaningEn: 'at, in, to be located at', audio: 'audio/hsk1/hsk1_在.wav' },
      { hanzi: '里', pinyin: 'lǐ', meaning: 'dans, à l\'intérieur', meaningEn: 'inside', audio: 'audio/hsk1/hsk1_里.wav' },
      { hanzi: '上', pinyin: 'shàng', meaning: 'sur, au-dessus', meaningEn: 'on, above', audio: 'audio/hsk1/hsk1_上.wav' },
      { hanzi: '下', pinyin: 'xià', meaning: 'sous, en dessous', meaningEn: 'under, below', audio: 'audio/hsk1/hsk1_下.wav' },
      { hanzi: '旁边', pinyin: 'páng biān', meaning: 'à côté', meaningEn: 'next to', audio: 'audio/hsk2/hsk2_旁边.wav' },
      { hanzi: '不在', pinyin: 'bù zài', meaning: 'ne pas être à/là', meaningEn: 'not at/there', audio: 'audio/hsk1/hsk1_不.wav' },
      { hanzi: '我在家', pinyin: 'wǒ zài jiā', meaning: 'je suis à la maison', meaningEn: 'I\'m at home', audio: 'audio/hsk1/hsk1_家.wav' },
      { hanzi: '手机在桌子上', pinyin: 'shǒu jī zài zhuō zi shàng', meaning: 'le téléphone est sur la table', meaningEn: 'the phone is on the table', audio: 'audio/hsk1/hsk1_桌子.wav' },
      { hanzi: '书在包里', pinyin: 'shū zài bāo lǐ', meaning: 'le livre est dans le sac', meaningEn: 'the book is in the bag', audio: 'audio/hsk1/hsk1_书.wav' },
      { hanzi: '猫在椅子上', pinyin: 'māo zài yǐ zi shàng', meaning: 'le chat est sur la chaise', meaningEn: 'the cat is on the chair', audio: 'audio/hsk1/hsk1_椅子.wav' },
      { hanzi: '狗在桌子下', pinyin: 'gǒu zài zhuō zi xià', meaning: 'le chien est sous la table', meaningEn: 'the dog is under the table', audio: 'audio/hsk1/hsk1_狗.wav' },
      { hanzi: '商店在银行旁边', pinyin: 'shāng diàn zài yín háng páng biān', meaning: 'le magasin est à côté de la banque', meaningEn: 'the shop is next to the bank', audio: 'audio/hsk2/hsk2_旁边.wav' },
      { hanzi: '老板不在办公室', pinyin: 'lǎo bǎn bù zài bàn gōng shì', meaning: 'le patron n\'est pas au bureau', meaningEn: 'the boss isn\'t in the office', audio: 'audio/hsk3/hsk3_办公室.wav' }
    ],
    tip:
      'Astuce : le duo 在 + localisateur (里/上/下) est la base absolue. Retiens toujours le localisateur associé au lieu.',
    tipEn:
      'Tip: the 在 + localizer (里/上/下) duo is the absolute foundation. Always memorize the localizer that goes with the place.'
  },
  {
    id: 'a2-zai-where-actions-happen',
    title: 'Où se passe l\'action : 在 + lieu + verbe',
    titleEn: 'Where the action happens: 在 + place + verb',
    body:
      'Pour dire OÙ SE DÉROULE UNE ACTION, on place « 在 + lieu » AVANT le verbe.\n' +
      '\n' +
      'Structure : Sujet + 在 + Lieu + Verbe (+ Objet).\n' +
      '- Ex : 我在家吃饭 (py wǒ zài jiā chī fàn) « je mange à la maison ». D\'abord le CADRE (à la maison), puis l\'action (manger).\n' +
      '- Ex : 孩子们在公园玩 (py hái zi men zài gōng yuán wán) « les enfants jouent au parc ».\n' +
      '- Ex : 我们在餐厅见面 (py wǒ men zài cān tīng jiàn miàn) « on se rejoint au restaurant ».\n' +
      '\n' +
      'Différence cruciale entre PLACEMENT AVANT et APRÈS le verbe :\n' +
      '- 我在图书馆学习 (py wǒ zài tú shū guǎn xué xí) = « j\'étudie À LA BIBLIOTHÈQUE » (cadre de l\'action).\n' +
      '- 我住在北京 (py wǒ zhù zài běi jīng) = « j\'habite À PÉKIN » (résultat/destination — le 在 s\'accole au verbe car il indique la LOCALISATION FINALE de l\'action de résider).\n' +
      '\n' +
      'Verbes qui aiment 在 APRÈS (car ils sous-entendent une localisation résultante) : 住 (habiter), 坐 (s\'asseoir), 站 (rester debout), 躺 (s\'allonger), 放 (poser).\n' +
      '- Ex : 请坐在这里 (py qǐng zuò zài zhè lǐ) « asseyez-vous ici ».\n' +
      '- Ex : 把书放在桌子上 (py bǎ shū fàng zài zhuō zi shàng) « pose le livre sur la table ».\n' +
      '\n' +
      'Question : « où fais-tu X ? » = 你在哪儿 + verbe ? Ex : 你在哪儿工作 ? (py nǐ zài nǎr gōng zuò) « où travailles-tu ? ».',
    bodyEn:
      'To say WHERE AN ACTION UNFOLDS, place «在 + place» BEFORE the verb. Structure: Subject + 在 + Place + Verb (+ Object). Ex: 我在家吃饭 «I eat at home». First the SETTING (at home), then the action (eat). Ex: 孩子们在公园玩 «the kids play at the park». Ex: 我们在餐厅见面 «we meet at the restaurant». Crucial difference between BEFORE and AFTER the verb placement: 我在图书馆学习 = «I study AT THE LIBRARY» (setting of the action). 我住在北京 = «I live IN BEIJING» (result/destination — 在 sticks to the verb because it marks the FINAL LOCATION of the residing action). Verbs that like 在 AFTER (they imply a resulting location): 住 (live), 坐 (sit), 站 (stand), 躺 (lie down), 放 (put). Ex: 请坐在这里 «please sit here». Ex: 把书放在桌子上 «put the book on the table». Question: «where do you X?» = 你在哪儿 + verb? Ex: 你在哪儿工作? «where do you work?».',
    items: [
      { hanzi: '在家吃饭', pinyin: 'zài jiā chī fàn', meaning: 'manger à la maison', meaningEn: 'eat at home', audio: 'audio/hsk1/hsk1_吃饭.wav' },
      { hanzi: '住', pinyin: 'zhù', meaning: 'habiter, loger', meaningEn: 'live, reside', audio: 'audio/hsk1/hsk1_住.wav' },
      { hanzi: '坐', pinyin: 'zuò', meaning: 's\'asseoir', meaningEn: 'sit', audio: 'audio/hsk1/hsk1_坐.wav' },
      { hanzi: '放', pinyin: 'fàng', meaning: 'poser, placer', meaningEn: 'put, place', audio: 'audio/hsk3/hsk3_放.wav' },
      { hanzi: '哪儿', pinyin: 'nǎr', meaning: 'où', meaningEn: 'where', audio: 'audio/hsk1/hsk1_哪儿.wav' },
      { hanzi: '我在家吃饭', pinyin: 'wǒ zài jiā chī fàn', meaning: 'je mange à la maison', meaningEn: 'I eat at home', audio: 'audio/hsk1/hsk1_吃饭.wav' },
      { hanzi: '孩子们在公园玩', pinyin: 'hái zi men zài gōng yuán wán', meaning: 'les enfants jouent au parc', meaningEn: 'the kids play at the park', audio: 'audio/hsk3/hsk3_公园.wav' },
      { hanzi: '我们在餐厅见面', pinyin: 'wǒ men zài cān tīng jiàn miàn', meaning: 'on se rejoint au restaurant', meaningEn: 'we meet at the restaurant', audio: 'audio/hsk3/hsk3_餐厅.wav' },
      { hanzi: '我在图书馆学习', pinyin: 'wǒ zài tú shū guǎn xué xí', meaning: 'j\'étudie à la bibliothèque', meaningEn: 'I study at the library', audio: 'audio/hsk3/hsk3_图书馆.wav' },
      { hanzi: '我住在北京', pinyin: 'wǒ zhù zài běi jīng', meaning: 'j\'habite à Pékin', meaningEn: 'I live in Beijing', audio: 'audio/hsk1/hsk1_北京.wav' },
      { hanzi: '请坐在这里', pinyin: 'qǐng zuò zài zhè lǐ', meaning: 'asseyez-vous ici', meaningEn: 'please sit here', audio: 'audio/hsk1/hsk1_请坐.wav' },
      { hanzi: '把书放在桌子上', pinyin: 'bǎ shū fàng zài zhuō zi shàng', meaning: 'pose le livre sur la table', meaningEn: 'put the book on the table', audio: 'audio/hsk3/hsk3_放.wav' },
      { hanzi: '你在哪儿工作', pinyin: 'nǐ zài nǎr gōng zuò', meaning: 'où travailles-tu ?', meaningEn: 'where do you work?', audio: 'audio/hsk1/hsk1_工作.wav' }
    ],
    tip:
      'Astuce : par défaut, 在 + lieu se met AVANT le verbe. Ne mets 在 APRÈS le verbe que pour 住/坐/站/放 et compagnie.',
    tipEn:
      'Tip: by default, 在 + place goes BEFORE the verb. Only put 在 AFTER the verb for 住/坐/站/放 and their friends.'
  },
  {
    id: 'a2-zai-progressive-ing',
    title: 'Action en cours : 在 + verbe = « en train de »',
    titleEn: 'Ongoing action: 在 + verb = «-ing»',
    body:
      '在 placé DIRECTEMENT DEVANT UN VERBE (sans lieu) marque une action EN COURS, comme « be + -ing » en anglais.\n' +
      '\n' +
      'Structure : Sujet + 在 + Verbe (+ Objet).\n' +
      '- Ex : 我在看书 (py wǒ zài kàn shū) « je suis en train de lire ». Action au moment où je parle.\n' +
      '- Ex : 他在打电话 (py tā zài dǎ diàn huà) « il est en train de téléphoner ». Ne dérange pas !\n' +
      '- Ex : 妈妈在做饭 (py mā ma zài zuò fàn) « maman est en train de cuisiner ».\n' +
      '\n' +
      'Version emphatique 正在 (zhèng zài) : insiste sur « juste maintenant, précisément ». Un peu plus formel/écrit.\n' +
      '- Ex : 他正在开会 (py tā zhèng zài kāi huì) « il est PRÉCISÉMENT en réunion (là) ».\n' +
      '- Ex : 我正在写邮件 (py wǒ zhèng zài xiě yóu jiàn) « je suis en plein milieu d\'écrire un email ».\n' +
      '\n' +
      'Particule 呢 en fin de phrase renforce l\'aspect « en train de » à l\'oral : 你在做什么呢 ? (py nǐ zài zuò shén me ne) « qu\'est-ce que tu fais (là, maintenant) ? ».\n' +
      '\n' +
      'Négation = 没在 (méi zài) : ne pas être en train de.\n' +
      '- Ex : 我没在睡觉，我在工作 (py wǒ méi zài shuì jiào, wǒ zài gōng zuò) « je ne suis pas en train de dormir, je travaille ».\n' +
      '\n' +
      '在 vs 着 : 在 = action en cours dynamique (« être en train de FAIRE ») ; 着 = état continu statique (« être ASSIS », « porter »). Ex : 他在坐 (bizarre) vs 他坐着 (py tā zuò zhe) (il est assis).',
    bodyEn:
      '在 placed DIRECTLY BEFORE A VERB (no place) marks an ONGOING action, like «be + -ing» in English. Structure: Subject + 在 + Verb (+ Object). Ex: 我在看书 «I\'m reading». Action at the moment of speech. Ex: 他在打电话 «he\'s on the phone». Don\'t disturb! Ex: 妈妈在做饭 «mom is cooking». Emphatic version 正在 (zhèng zài): insists on «right now, precisely». Slightly more formal/written. Ex: 他正在开会 «he\'s RIGHT NOW in a meeting». Ex: 我正在写邮件 «I\'m in the middle of writing an email». Particle 呢 at the end of the sentence reinforces the «-ing» aspect orally: 你在做什么呢? «what are you doing (right now)?». Negation = 没在 (méi zài): not in the process of. Ex: 我没在睡觉，我在工作 «I\'m not sleeping, I\'m working». 在 vs 着: 在 = dynamic ongoing action («being in the process of DOING»); 着 = static continuous state («being SEATED», «wearing»). Ex: 他在坐 (weird) vs 他坐着 (he is seated).',
    items: [
      { hanzi: '在看书', pinyin: 'zài kàn shū', meaning: 'être en train de lire', meaningEn: 'be reading', audio: 'audio/hsk1/hsk1_看书.wav' },
      { hanzi: '正在', pinyin: 'zhèng zài', meaning: 'être précisément en train de', meaningEn: 'be right now in the middle of', audio: 'audio/hsk2/hsk2_正在.wav' },
      { hanzi: '呢', pinyin: 'ne', meaning: 'particule d\'action en cours', meaningEn: 'ongoing action particle', audio: 'audio/hsk1/hsk1_呢.wav' },
      { hanzi: '着', pinyin: 'zhe', meaning: 'particule d\'état continu', meaningEn: 'continuous state particle', audio: 'audio/hsk2/hsk2_着.wav' },
      { hanzi: '没在', pinyin: 'méi zài', meaning: 'ne pas être en train de', meaningEn: 'not be in the process of', audio: 'audio/hsk1/hsk1_没.wav' },
      { hanzi: '我在看书', pinyin: 'wǒ zài kàn shū', meaning: 'je suis en train de lire', meaningEn: 'I\'m reading', audio: 'audio/hsk1/hsk1_看书.wav' },
      { hanzi: '他在打电话', pinyin: 'tā zài dǎ diàn huà', meaning: 'il est en train de téléphoner', meaningEn: 'he\'s on the phone', audio: 'audio/hsk1/hsk1_打电话.wav' },
      { hanzi: '妈妈在做饭', pinyin: 'mā ma zài zuò fàn', meaning: 'maman est en train de cuisiner', meaningEn: 'mom is cooking', audio: 'audio/hsk1/hsk1_做饭.wav' },
      { hanzi: '他正在开会', pinyin: 'tā zhèng zài kāi huì', meaning: 'il est précisément en réunion', meaningEn: 'he\'s right now in a meeting', audio: 'audio/hsk3/hsk3_开会.wav' },
      { hanzi: '我正在写邮件', pinyin: 'wǒ zhèng zài xiě yóu jiàn', meaning: 'je suis en plein milieu d\'écrire un email', meaningEn: 'I\'m in the middle of writing an email', audio: 'audio/hsk3/hsk3_邮件.wav' },
      { hanzi: '你在做什么呢', pinyin: 'nǐ zài zuò shén me ne', meaning: 'qu\'est-ce que tu fais (là) ?', meaningEn: 'what are you doing (right now)?', audio: 'audio/hsk1/hsk1_什么.wav' },
      { hanzi: '我没在睡觉，我在工作', pinyin: 'wǒ méi zài shuì jiào, wǒ zài gōng zuò', meaning: 'je ne dors pas, je travaille', meaningEn: 'I\'m not sleeping, I\'m working', audio: 'audio/hsk1/hsk1_睡觉.wav' },
      { hanzi: '他坐着', pinyin: 'tā zuò zhe', meaning: 'il est assis', meaningEn: 'he is seated', audio: 'audio/hsk1/hsk1_坐.wav' }
    ],
    tip:
      'Astuce : le trio 在 / 正在 / 呢 marque le présent progressif ; 呢 est le plus casual, 正在 le plus insistant.',
    tipEn:
      'Tip: the 在 / 正在 / 呢 trio marks the progressive present; 呢 is the most casual, 正在 the most insistent.'
  }
];

// ═════════════════════════════════════════════════════════════════════════════
// A2 Grammaire — 过 : marquer une expérience vécue (CGG #60)
// ═════════════════════════════════════════════════════════════════════════════

export const a2GrammaireGuoExperienceLearnSections: LessonV2LearnSection[] = [
  {
    id: 'a2-guo-experience-basics',
    title: '过 : marquer une expérience vécue',
    titleEn: '过: mark a life experience',
    body:
      'En chinois, on n\'utilise pas de temps verbal comme en français. À la place, on emploie des particules qui montrent COMMENT une action se déroule (aspect). 过 (guo, ton neutre) marque l\'ASPECT EXPÉRIENTIEL : « avoir fait au moins une fois dans sa vie ».\n' +
      '\n' +
      'Structure : Sujet + Verbe + 过 + (Objet).\n' +
      '- Ex : 我去过北京 (py wǒ qù guo běi jīng) « je suis (déjà) allé à Pékin ». Sans préciser quand.\n' +
      '- Ex : 我吃过日本菜 (py wǒ chī guo rì běn cài) « j\'ai (déjà) mangé japonais ». Une fois au moins.\n' +
      '- Ex : 他学过法语 (py tā xué guo fǎ yǔ) « il a (autrefois) étudié le français ». Expérience passée, peut-être oubliée aujourd\'hui.\n' +
      '\n' +
      'Équivalent français : le passé composé « j\'ai déjà + participe » avec la nuance d\'expérience de vie.\n' +
      '\n' +
      '过 vs 了 :\n' +
      '- 我吃了饭 (py wǒ chī le fàn) = « j\'ai mangé (l\'action est terminée à un moment précis) ». Action complétée.\n' +
      '- 我吃过日本菜 (py wǒ chī guo rì běn cài) = « j\'ai (déjà une fois) mangé japonais ». Expérience de vie sans moment précis.\n' +
      '\n' +
      'Prononciation : 过 en tant que particule = ton neutre léger (guo). Attention à ne pas le confondre avec 过 (guò, 4e ton) qui est un verbe indépendant (« traverser, passer »).\n' +
      '\n' +
      'Verbe + 过 courants : 去过, 吃过, 看过, 听过, 学过, 见过, 做过, 玩过, 尝过 (goûter).\n' +
      '- Ex : 你看过这部电影吗 ? (py nǐ kàn guo zhè bù diàn yǐng ma) « as-tu déjà vu ce film ? ».\n' +
      '- Ex : 我听过这首歌 (py wǒ tīng guo zhè shǒu gē) « j\'ai déjà entendu cette chanson ».',
    bodyEn:
      'In Chinese, there\'s no verb tense like in French. Instead, particles show HOW an action unfolds (aspect). 过 (guo, neutral tone) marks the EXPERIENTIAL ASPECT: «to have done something at least once in one\'s life». Structure: Subject + Verb + 过 + (Object). Ex: 我去过北京 «I\'ve (already) been to Beijing». Without specifying when. Ex: 我吃过日本菜 «I\'ve (already) eaten Japanese food». At least once. Ex: 他学过法语 «he (once) studied French». Past experience, maybe forgotten today. French equivalent: passé composé «I\'ve already + past participle» with the nuance of life experience. 过 vs 了: 我吃了饭 = «I ate (the action is done at a specific moment)». Completed action. 我吃过日本菜 = «I\'ve (once already) eaten Japanese». Life experience with no specific moment. Pronunciation: 过 as a particle = light neutral tone (guo). Don\'t confuse with 过 (guò, 4th tone), an independent verb («to cross, pass»). Common Verb + 过: 去过, 吃过, 看过, 听过, 学过, 见过, 做过, 玩过, 尝过 (taste). Ex: 你看过这部电影吗? «have you seen this movie?». Ex: 我听过这首歌 «I\'ve heard this song».',
    items: [
      { hanzi: '过', pinyin: 'guo', meaning: 'particule d\'expérience vécue', meaningEn: 'life-experience particle', audio: 'audio/hsk1/hsk1_过.wav' },
      { hanzi: '去过', pinyin: 'qù guo', meaning: 'être (déjà) allé', meaningEn: 'have been to', audio: 'audio/hsk1/hsk1_去.wav' },
      { hanzi: '吃过', pinyin: 'chī guo', meaning: 'avoir (déjà) mangé', meaningEn: 'have (already) eaten', audio: 'audio/hsk1/hsk1_吃.wav' },
      { hanzi: '看过', pinyin: 'kàn guo', meaning: 'avoir (déjà) vu/lu', meaningEn: 'have (already) seen/read', audio: 'audio/hsk1/hsk1_看.wav' },
      { hanzi: '学过', pinyin: 'xué guo', meaning: 'avoir (autrefois) étudié', meaningEn: 'have (once) studied', audio: 'audio/hsk1/hsk1_学.wav' },
      { hanzi: '尝', pinyin: 'cháng', meaning: 'goûter', meaningEn: 'taste', audio: 'audio/hsk3/hsk3_尝.wav' },
      { hanzi: '我去过北京', pinyin: 'wǒ qù guo běi jīng', meaning: 'je suis déjà allé à Pékin', meaningEn: 'I\'ve been to Beijing', audio: 'audio/hsk1/hsk1_北京.wav' },
      { hanzi: '我吃过日本菜', pinyin: 'wǒ chī guo rì běn cài', meaning: 'j\'ai déjà mangé japonais', meaningEn: 'I\'ve eaten Japanese food', audio: 'audio/hsk2/hsk2_日本.wav' },
      { hanzi: '他学过法语', pinyin: 'tā xué guo fǎ yǔ', meaning: 'il a autrefois étudié le français', meaningEn: 'he once studied French', audio: 'audio/hsk1/hsk1_学.wav' },
      { hanzi: '你看过这部电影吗', pinyin: 'nǐ kàn guo zhè bù diàn yǐng ma', meaning: 'as-tu déjà vu ce film ?', meaningEn: 'have you seen this movie?', audio: 'audio/hsk1/hsk1_电影.wav' },
      { hanzi: '我听过这首歌', pinyin: 'wǒ tīng guo zhè shǒu gē', meaning: 'j\'ai déjà entendu cette chanson', meaningEn: 'I\'ve heard this song', audio: 'audio/hsk3/hsk3_歌.wav' }
    ],
    tip:
      'Astuce : chaque fois que tu veux dire « déjà + verbe au moins une fois », pense 过. C\'est LE marqueur d\'expérience de vie.',
    tipEn:
      'Tip: whenever you want to say «already + verb at least once», think 过. It IS the life-experience marker.'
  },
  {
    id: 'a2-guo-negation-and-frequency',
    title: 'Négation 没...过 et fréquence avec 次',
    titleEn: 'Negation 没...过 and frequency with 次',
    body:
      'Négation : pour dire « je n\'ai jamais fait X », on emploie 没 (méi) ou 没有 (méi yǒu) DEVANT le verbe, en gardant 过 APRÈS.\n' +
      '\n' +
      'Structure : Sujet + 没(有) + Verbe + 过 + (Objet).\n' +
      '- Ex : 我没去过中国 (py wǒ méi qù guo zhōng guó) « je ne suis jamais allé en Chine ».\n' +
      '- Ex : 他没吃过榴莲 (py tā méi chī guo liú lián) « il n\'a jamais goûté au durian ».\n' +
      '\n' +
      'Erreur classique : on n\'utilise JAMAIS 不 pour nier une expérience passée. C\'est TOUJOURS 没. Dire 我不去过中国 est faux.\n' +
      '\n' +
      'Question type : Verbe + 过 + Objet + 吗 ? ou Verbe + 过 + Objet + 没有 ?\n' +
      '- Ex : 你去过日本吗 ? (py nǐ qù guo rì běn ma) « es-tu déjà allé au Japon ? ».\n' +
      '- Ex : 你看过这本书没有 ? (py nǐ kàn guo zhè běn shū méi yǒu) « as-tu déjà lu ce livre ? ».\n' +
      '\n' +
      'Renforcer avec 从来 (cóng lái) « jamais depuis toujours » : 从来 + 没(有) + Verbe + 过 = « jamais de la vie ».\n' +
      '- Ex : 他从来没喝过酒 (py tā cóng lái méi hē guo jiǔ) « il n\'a jamais bu d\'alcool de sa vie ». Ton plus emphatique.\n' +
      '- Ex : 我从来没吃过这么辣的东西 (py wǒ cóng lái méi chī guo zhè me là de dōng xi) « je n\'ai jamais mangé un truc aussi épicé ».\n' +
      '\n' +
      'Compter les occurrences avec 次 (cì) « fois » : Sujet + Verbe + 过 + Objet + [nombre] + 次.\n' +
      '- Ex : 我去过北京三次 (py wǒ qù guo běi jīng sān cì) « je suis allé à Pékin trois fois ».\n' +
      '- Ex : 我看过那部电影两次 (py wǒ kàn guo nà bù diàn yǐng liǎng cì) « j\'ai vu ce film deux fois ».\n' +
      '\n' +
      'Position flexible de 次 : on peut aussi dire 我去过三次北京, même sens.',
    bodyEn:
      'Negation: to say «I\'ve never done X», use 没 (méi) or 没有 (méi yǒu) BEFORE the verb, keeping 过 AFTER. Structure: Subject + 没(有) + Verb + 过 + (Object). Ex: 我没去过中国 «I\'ve never been to China». Ex: 他没吃过榴莲 «he\'s never tried durian». Classic mistake: NEVER use 不 to negate a past experience. It\'s ALWAYS 没. Saying 我不去过中国 is wrong. Yes/no question: Verb + 过 + Object + 吗? or Verb + 过 + Object + 没有? Ex: 你去过日本吗? «have you been to Japan?». Ex: 你看过这本书没有? «have you read this book?». Reinforce with 从来 (cóng lái) «ever since always»: 从来 + 没(有) + Verb + 过 = «never in life». Ex: 他从来没喝过酒 «he\'s never had alcohol in his life». More emphatic. Ex: 我从来没吃过这么辣的东西 «I\'ve never eaten something this spicy». Count occurrences with 次 (cì) «times»: Subject + Verb + 过 + Object + [number] + 次. Ex: 我去过北京三次 «I\'ve been to Beijing three times». Ex: 我看过那部电影两次 «I\'ve seen that movie twice». Flexible 次 position: you can also say 我去过三次北京, same meaning.',
    items: [
      { hanzi: '没', pinyin: 'méi', meaning: 'ne...pas (aspect passé)', meaningEn: 'not (past aspect)', audio: 'audio/hsk1/hsk1_没.wav' },
      { hanzi: '没有', pinyin: 'méi yǒu', meaning: 'ne...pas (forme longue)', meaningEn: 'not (long form)', audio: 'audio/hsk1/hsk1_没有.wav' },
      { hanzi: '从来', pinyin: 'cóng lái', meaning: 'jamais depuis toujours', meaningEn: 'ever, never (emphatic)', audio: 'audio/hsk3/hsk3_从来.wav' },
      { hanzi: '次', pinyin: 'cì', meaning: 'fois (occurrence)', meaningEn: 'time (occurrence)', audio: 'audio/hsk2/hsk2_次.wav' },
      { hanzi: '我没去过中国', pinyin: 'wǒ méi qù guo zhōng guó', meaning: 'je ne suis jamais allé en Chine', meaningEn: 'I\'ve never been to China', audio: 'audio/hsk1/hsk1_中国.wav' },
      { hanzi: '他没吃过榴莲', pinyin: 'tā méi chī guo liú lián', meaning: 'il n\'a jamais goûté au durian', meaningEn: 'he\'s never tried durian', audio: 'audio/hsk1/hsk1_吃.wav' },
      { hanzi: '你去过日本吗', pinyin: 'nǐ qù guo rì běn ma', meaning: 'es-tu déjà allé au Japon ?', meaningEn: 'have you been to Japan?', audio: 'audio/hsk2/hsk2_日本.wav' },
      { hanzi: '你看过这本书没有', pinyin: 'nǐ kàn guo zhè běn shū méi yǒu', meaning: 'as-tu déjà lu ce livre ?', meaningEn: 'have you read this book?', audio: 'audio/hsk1/hsk1_书.wav' },
      { hanzi: '他从来没喝过酒', pinyin: 'tā cóng lái méi hē guo jiǔ', meaning: 'il n\'a jamais bu d\'alcool de sa vie', meaningEn: 'he\'s never drunk alcohol', audio: 'audio/hsk2/hsk2_酒.wav' },
      { hanzi: '我从来没吃过这么辣的东西', pinyin: 'wǒ cóng lái méi chī guo zhè me là de dōng xi', meaning: 'je n\'ai jamais mangé un truc aussi épicé', meaningEn: 'I\'ve never eaten something this spicy', audio: 'audio/hsk3/hsk3_辣.wav' },
      { hanzi: '我去过北京三次', pinyin: 'wǒ qù guo běi jīng sān cì', meaning: 'je suis allé à Pékin trois fois', meaningEn: 'I\'ve been to Beijing three times', audio: 'audio/hsk1/hsk1_北京.wav' },
      { hanzi: '我看过那部电影两次', pinyin: 'wǒ kàn guo nà bù diàn yǐng liǎng cì', meaning: 'j\'ai vu ce film deux fois', meaningEn: 'I\'ve seen that movie twice', audio: 'audio/hsk1/hsk1_电影.wav' }
    ],
    tip:
      'Astuce : le duo 没...过 remplace TOUJOURS 不...过. Retiens : 不 nie une habitude/tendance, 没 nie une action/expérience passée.',
    tipEn:
      'Tip: the 没...过 duo ALWAYS replaces 不...过. Remember: 不 negates a habit/tendency, 没 negates an action/past experience.'
  },
  {
    id: 'a2-guo-vs-le-and-combined',
    title: '过 vs 了 : nuance expérience vs action complétée',
    titleEn: '过 vs 了: experience vs completed action',
    body:
      'Les DEUX marqueurs se réfèrent au passé, mais avec un ANGLE DIFFÉRENT :\n' +
      '- 过 = « j\'ai (déjà) fait ça, ça fait partie de mon expérience de vie » (SANS moment précis).\n' +
      '- 了 = « l\'action est COMPLÉTÉE à un moment donné » (souvent AVEC contexte temporel).\n' +
      '\n' +
      'Comparaison directe :\n' +
      '- 我吃过日本菜 (py wǒ chī guo rì běn cài) « j\'ai déjà mangé japonais (dans ma vie) ». Compte comme expérience.\n' +
      '- 昨天我吃了日本菜 (py zuó tiān wǒ chī le rì běn cài) « hier j\'ai mangé japonais ». Événement daté, terminé.\n' +
      '\n' +
      'Choix guidé par la QUESTION :\n' +
      '- Question sur l\'expérience de vie → réponse en 过 : 你去过法国吗 ? → 我去过 / 我没去过.\n' +
      '- Question sur un événement précis → réponse en 了 : 你今天吃饭了吗 ? → 吃了 / 没吃.\n' +
      '\n' +
      '过 + 了 dans la même phrase : possible pour insister sur « déjà FAIT, c\'est BOUCLÉ ». Le 过 marque l\'expérience, le 了 final ajoute « c\'est réglé, ne me le redemande pas ».\n' +
      '\n' +
      'Structure : Sujet + Verbe + 过 + (Objet) + 了.\n' +
      '- Ex : 我看过这本书了 (py wǒ kàn guo zhè běn shū le) « je l\'ai déjà lu (ce livre) ». Réponse à « tu veux lire ce livre ? ».\n' +
      '- Ex : 这部电影我看过了 (py zhè bù diàn yǐng wǒ kàn guo le) « ce film, je l\'ai déjà vu ». Ton final « pas la peine de me le proposer ».\n' +
      '- On peut renforcer avec 已经 (yǐ jīng) « déjà » : 我已经吃过了 (py wǒ yǐ jīng chī guo le) « j\'ai déjà mangé ».\n' +
      '\n' +
      'Nuance conversationnelle : sans 了 = information neutre (« j\'y suis allé un jour ») ; avec 了 = réponse à une invitation/proposition (« déjà fait, merci »).\n' +
      '- 我去过日本 (py wǒ qù guo rì běn) (fait de vie, cadre curriculum) vs 我去过日本了 (py wǒ qù guo rì běn le) (donc on ne prévoit plus ce voyage).\n' +
      '\n' +
      'Verbes qui rejettent 过 : les verbes NÉCESSAIREMENT durables comme 是 (être), 有 (avoir), 认识 (connaître), 姓 (avoir pour nom de famille) ne prennent PAS 过 car ils désignent des états, pas des expériences.',
    bodyEn:
      'BOTH markers refer to the past, but from a DIFFERENT ANGLE: 过 = «I\'ve (already) done that, it\'s part of my life experience» (WITHOUT a specific moment). 了 = «the action is COMPLETED at a given moment» (often WITH temporal context). Direct comparison: 我吃过日本菜 «I\'ve already eaten Japanese food (in my life)». Counts as experience. 昨天我吃了日本菜 «yesterday I ate Japanese food». Dated, finished event. Choice guided by the QUESTION: Question about life experience → answer with 过: 你去过法国吗? → 我去过 / 我没去过. Question about a specific event → answer with 了: 你今天吃饭了吗? → 吃了 / 没吃. 过 + 了 in the same sentence: possible to insist on «already DONE, it\'s WRAPPED UP». The 过 marks experience, the final 了 adds «it\'s settled, don\'t ask again». Structure: Subject + Verb + 过 + (Object) + 了. Ex: 我看过这本书了 «I\'ve already read it (this book)». Reply to «do you want to read this book?». Ex: 这部电影我看过了 «this movie, I\'ve already seen it». Final tone «no need to suggest it to me». You can reinforce with 已经 (yǐ jīng) «already»: 我已经吃过了 «I\'ve already eaten». Conversational nuance: without 了 = neutral info («I went there once»); with 了 = reply to an invitation/proposal («already done, thanks»). 我去过日本 (life fact, resume frame) vs 我去过日本了 (so we\'re not planning this trip anymore). Verbs that reject 过: NECESSARILY durable verbs like 是 (be), 有 (have), 认识 (know), 姓 (be surnamed) do NOT take 过 because they name states, not experiences.',
    items: [
      { hanzi: '了', pinyin: 'le', meaning: 'particule d\'action complétée', meaningEn: 'completed-action particle', audio: 'audio/hsk1/hsk1_了.wav' },
      { hanzi: '已经', pinyin: 'yǐ jīng', meaning: 'déjà', meaningEn: 'already', audio: 'audio/hsk2/hsk2_已经.wav' },
      { hanzi: '昨天', pinyin: 'zuó tiān', meaning: 'hier', meaningEn: 'yesterday', audio: 'audio/hsk1/hsk1_昨天.wav' },
      { hanzi: '我吃过日本菜', pinyin: 'wǒ chī guo rì běn cài', meaning: 'j\'ai déjà mangé japonais (vie)', meaningEn: 'I\'ve eaten Japanese food (life)', audio: 'audio/hsk2/hsk2_日本.wav' },
      { hanzi: '昨天我吃了日本菜', pinyin: 'zuó tiān wǒ chī le rì běn cài', meaning: 'hier j\'ai mangé japonais', meaningEn: 'yesterday I ate Japanese food', audio: 'audio/hsk1/hsk1_昨天.wav' },
      { hanzi: '我看过这本书了', pinyin: 'wǒ kàn guo zhè běn shū le', meaning: 'je l\'ai déjà lu (ce livre)', meaningEn: 'I\'ve already read it (this book)', audio: 'audio/hsk1/hsk1_书.wav' },
      { hanzi: '这部电影我看过了', pinyin: 'zhè bù diàn yǐng wǒ kàn guo le', meaning: 'ce film, je l\'ai déjà vu', meaningEn: 'this movie, I\'ve already seen it', audio: 'audio/hsk1/hsk1_电影.wav' },
      { hanzi: '我已经吃过了', pinyin: 'wǒ yǐ jīng chī guo le', meaning: 'j\'ai déjà mangé', meaningEn: 'I\'ve already eaten', audio: 'audio/hsk1/hsk1_吃.wav' },
      { hanzi: '我去过日本', pinyin: 'wǒ qù guo rì běn', meaning: 'je suis (déjà) allé au Japon', meaningEn: 'I\'ve been to Japan', audio: 'audio/hsk2/hsk2_日本.wav' },
      { hanzi: '我去过日本了', pinyin: 'wǒ qù guo rì běn le', meaning: 'j\'y suis déjà allé (donc bon)', meaningEn: 'I\'ve already been (so, done)', audio: 'audio/hsk2/hsk2_日本.wav' }
    ],
    tip:
      'Astuce : quand tu doutes entre 过 et 了 : « ça a laissé une trace dans mon CV de vie ? » → 过. « Ça s\'est passé, c\'est fini, à ce moment précis ? » → 了.',
    tipEn:
      'Tip: when unsure between 过 and 了: «did it leave a trace on my life resume?» → 过. «Did it happen, done, at that specific moment?» → 了.'
  }
];

// ═════════════════════════════════════════════════════════════════════════════
// A2 Nuances — Exprimer « tous » Part 1 : 都, 所有, 每, 全 (CGG #57)
// ═════════════════════════════════════════════════════════════════════════════

export const a2NuancesAllPart1LearnSections: LessonV2LearnSection[] = [
  {
    id: 'a2-all-dou-participation',
    title: '都 : marquer que « tout le monde » fait qch',
    titleEn: '都: marking that «everyone» does sth',
    body:
      '都 (dōu) est le PREMIER outil pour dire « tous, tous ensemble ». Il SUIT le sujet et PRÉCÈDE le verbe.\n' +
      '\n' +
      'Structure : Sujet pluriel + 都 + Verbe.\n' +
      '- Ex : 他们都来了 (py tā men dōu lái le) « ils sont tous venus ». 都 signale que tous les membres du groupe sont concernés.\n' +
      '- Ex : 我们都喜欢中国菜 (py wǒ men dōu xǐ huan zhōng guó cài) « nous aimons tous la cuisine chinoise ».\n' +
      '- Ex : 学生都在教室 (py xué shēng dōu zài jiào shì) « les étudiants sont tous en classe ».\n' +
      '\n' +
      'Règle absolue : 都 vient TOUJOURS AVANT le verbe, JAMAIS avant le sujet. Ne dis pas 都我们 mais 我们都.\n' +
      '\n' +
      '都 + questions : 你们都是中国人吗？(py nǐ men dōu shì zhōng guó rén ma) « êtes-vous tous chinois ? ».\n' +
      '\n' +
      '都 avec un mot interrogatif = « tout, n\'importe quoi » : 什么 + 都 forme une INCLUSION TOTALE (voir plus loin dans le parcours).\n' +
      '- Ex : 他什么都吃 (py tā shén me dōu chī) « il mange TOUT / n\'importe quoi ». 什么 n\'est plus une question ici.\n' +
      '- Ex : 我什么都不知道 (py wǒ shén me dōu bù zhī dào) « je ne sais RIEN » (négation totale).\n' +
      '- Ex : 她哪儿都想去 (py tā nǎ r dōu xiǎng qù) « elle veut aller PARTOUT ».\n' +
      '\n' +
      'Négation : 都不 = « tous NE ...pas » (négation totale) ; 不都 = « pas tous » (négation partielle).\n' +
      '- Ex : 他们都不来 (py tā men dōu bù lái) « ils ne viennent AUCUN ». vs 他们不都来 (py tā men bù dōu lái) « ils ne viennent pas tous (certains oui) ».',
    bodyEn:
      '都 (dōu) is the FIRST tool for saying «all, everyone together». It FOLLOWS the subject and PRECEDES the verb. Structure: Plural subject + 都 + Verb. Ex: 他们都来了 «they all came». 都 signals that every group member is concerned. Ex: 我们都喜欢中国菜 «we all like Chinese food». Ex: 学生都在教室 «the students are all in class». Absolute rule: 都 ALWAYS comes BEFORE the verb, NEVER before the subject. Don\'t say 都我们, say 我们都. 都 + questions: 你们都是中国人吗？«are you all Chinese?». 都 with a question word = «anything, everything»: 什么 + 都 forms TOTAL INCLUSION. Ex: 他什么都吃 «he eats ANYTHING». 什么 is no longer a question here. Ex: 我什么都不知道 «I know NOTHING» (total negation). Ex: 她哪儿都想去 «she wants to go EVERYWHERE». Negation: 都不 = «NONE of them do» (total negation); 不都 = «not all» (partial negation). Ex: 他们都不来 «NONE of them come». vs 他们不都来 «they don\'t all come (some do)».',
    items: [
      { hanzi: '都', pinyin: 'dōu', meaning: 'tous, tous ensemble', meaningEn: 'all, altogether', audio: 'audio/hsk1/hsk1_都.wav' },
      { hanzi: '什么', pinyin: 'shén me', meaning: 'quoi ; (avec 都) tout', meaningEn: 'what; (with 都) anything', audio: 'audio/hsk1/hsk1_什么.wav' },
      { hanzi: '哪儿', pinyin: 'nǎ r', meaning: 'où ; (avec 都) partout', meaningEn: 'where; (with 都) everywhere', audio: 'audio/hsk1/hsk1_哪儿.wav' },
      { hanzi: '他们都来了', pinyin: 'tā men dōu lái le', meaning: 'ils sont tous venus', meaningEn: 'they all came', audio: 'audio/hsk1/hsk1_来.wav' },
      { hanzi: '我们都喜欢中国菜', pinyin: 'wǒ men dōu xǐ huan zhōng guó cài', meaning: 'nous aimons tous la cuisine chinoise', meaningEn: 'we all like Chinese food', audio: 'audio/hsk1/hsk1_中国.wav' },
      { hanzi: '学生都在教室', pinyin: 'xué shēng dōu zài jiào shì', meaning: 'les étudiants sont tous en classe', meaningEn: 'students are all in class', audio: 'audio/hsk1/hsk1_学生.wav' },
      { hanzi: '你们都是中国人吗', pinyin: 'nǐ men dōu shì zhōng guó rén ma', meaning: 'êtes-vous tous chinois ?', meaningEn: 'are you all Chinese?', audio: 'audio/hsk1/hsk1_中国.wav' },
      { hanzi: '他什么都吃', pinyin: 'tā shén me dōu chī', meaning: 'il mange tout / n\'importe quoi', meaningEn: 'he eats anything', audio: 'audio/hsk1/hsk1_吃.wav' },
      { hanzi: '我什么都不知道', pinyin: 'wǒ shén me dōu bù zhī dào', meaning: 'je ne sais rien', meaningEn: 'I know nothing', audio: 'audio/hsk1/hsk1_知道.wav' },
      { hanzi: '她哪儿都想去', pinyin: 'tā nǎ r dōu xiǎng qù', meaning: 'elle veut aller partout', meaningEn: 'she wants to go everywhere', audio: 'audio/hsk1/hsk1_想.wav' },
      { hanzi: '他们都不来', pinyin: 'tā men dōu bù lái', meaning: 'aucun d\'eux ne vient', meaningEn: 'none of them come', audio: 'audio/hsk1/hsk1_来.wav' },
      { hanzi: '他们不都来', pinyin: 'tā men bù dōu lái', meaning: 'ils ne viennent pas tous', meaningEn: 'they don\'t all come', audio: 'audio/hsk1/hsk1_来.wav' }
    ],
    tip:
      'Astuce : 都 est le mot-outil de la totalité de groupe. Retiens ordre : SUJET + 都 + VERBE.',
    tipEn:
      'Tip: 都 is the totality-of-group toolword. Remember the order: SUBJECT + 都 + VERB.'
  },
  {
    id: 'a2-all-suoyou-mei',
    title: '所有 et 每 : chaque item, un par un',
    titleEn: '所有 and 每: each item, one by one',
    body:
      '所有 (suǒ yǒu) « tous les... » MODIFIE UN NOM, contrairement à 都 qui suit le sujet. Il balaye la totalité d\'un ensemble.\n' +
      '\n' +
      'Structure : 所有 + (的) + Nom + (都 + Verbe).\n' +
      '- Ex : 所有的学生都通过了考试 (py suǒ yǒu de xué shēng dōu tōng guò le kǎo shì) « tous les étudiants ont réussi l\'examen ». Souvent avec 的 et suivi de 都.\n' +
      '- Ex : 所有人都同意 (py suǒ yǒu rén dōu tóng yì) « tout le monde est d\'accord ».\n' +
      '- Ex : 所有的门都锁了 (py suǒ yǒu de mén dōu suǒ le) « toutes les portes sont fermées à clé ».\n' +
      '\n' +
      'Registre : 所有 est un chouïa plus formel/écrit que 都 seul.\n' +
      '\n' +
      '每 (měi) « chaque » individualise : chaque membre EST CONSIDÉRÉ SÉPARÉMENT. Requiert un CLASSIFICATEUR.\n' +
      '\n' +
      'Structure : 每 + Classificateur + Nom + (都 + Verbe).\n' +
      '- Ex : 每个人都很努力 (py měi gè rén dōu hěn nǔ lì) « chaque personne travaille dur ». Le 都 est quasi-obligatoire ici.\n' +
      '- Ex : 每天我都跑步 (py měi tiān wǒ dōu pǎo bù) « chaque jour, je cours ». 每天 est fixé (pas besoin de 个).\n' +
      '- Ex : 每本书都很有趣 (py měi běn shū dōu hěn yǒu qù) « chaque livre est intéressant ».\n' +
      '\n' +
      '每天 / 每年 / 每次 sont FIGÉS sans classificateur ; 每 + [autre nom] requiert 个 ou son classificateur : 每个学生, 每一位老师, 每一本书.\n' +
      '\n' +
      '每...都 vs 都 seul : 每 met le SPOT SUR CHAQUE INDIVIDU (« CHACUN sans exception ») ; 都 seul est plus collectif (« l\'ensemble »).\n' +
      '- Ex collective : 他们都在 (py tā men dōu zài) « ils sont tous là (l\'ensemble) ».\n' +
      '- Ex individuelle : 每个人都在 (py měi gè rén dōu zài) « chacun est là (un par un) ».\n' +
      '\n' +
      'Cas typiques :\n' +
      '- 每次 + 都 = « chaque fois... systématiquement... ».\n' +
      '- 每天 + 都 = « chaque jour... sans exception... ».',
    bodyEn:
      '所有 (suǒ yǒu) «all the ...» MODIFIES A NOUN, unlike 都 which follows the subject. It sweeps the totality of a set. Structure: 所有 + (的) + Noun + (都 + Verb). Ex: 所有的学生都通过了考试 «all students passed the exam». Often with 的 and followed by 都. Ex: 所有人都同意 «everyone agrees». Ex: 所有的门都锁了 «all doors are locked». Register: 所有 is a hair more formal/written than 都 alone. 每 (měi) «each» individualizes: each member IS CONSIDERED SEPARATELY. Requires a CLASSIFIER. Structure: 每 + Classifier + Noun + (都 + Verb). Ex: 每个人都很努力 «each person works hard». 都 is almost mandatory here. Ex: 每天我都跑步 «every day I run». 每天 is fixed (no need for 个). Ex: 每本书都很有趣 «every book is interesting». 每天 / 每年 / 每次 are FIXED without classifier; 每 + [other noun] requires 个 or its classifier: 每个学生, 每一位老师, 每一本书. 每...都 vs 都 alone: 每 spotlights EACH INDIVIDUAL («EACH one without exception»); 都 alone is more collective («the whole»). Collective ex: 他们都在 «they\'re all there (the group)». Individual ex: 每个人都在 «each one is there (one by one)». Typical cases: 每次 + 都 = «every time... systematically...». 每天 + 都 = «every day... without exception...».',
    items: [
      { hanzi: '所有', pinyin: 'suǒ yǒu', meaning: 'tous les...', meaningEn: 'all the...', audio: 'audio/hsk4/hsk4_所有.wav' },
      { hanzi: '的', pinyin: 'de', meaning: 'particule de détermination', meaningEn: 'possessive/modifier particle', audio: 'audio/hsk1/hsk1_的.wav' },
      { hanzi: '每', pinyin: 'měi', meaning: 'chaque', meaningEn: 'each, every', audio: 'audio/hsk2/hsk2_每.wav' },
      { hanzi: '个', pinyin: 'gè', meaning: 'classificateur générique', meaningEn: 'generic classifier', audio: 'audio/hsk1/hsk1_个.wav' },
      { hanzi: '所有的学生都通过了考试', pinyin: 'suǒ yǒu de xué shēng dōu tōng guò le kǎo shì', meaning: 'tous les étudiants ont réussi l\'examen', meaningEn: 'all students passed the exam', audio: 'audio/hsk2/hsk2_考试.wav' },
      { hanzi: '所有人都同意', pinyin: 'suǒ yǒu rén dōu tóng yì', meaning: 'tout le monde est d\'accord', meaningEn: 'everyone agrees', audio: 'audio/hsk3/hsk3_同意.wav' },
      { hanzi: '所有的门都锁了', pinyin: 'suǒ yǒu de mén dōu suǒ le', meaning: 'toutes les portes sont fermées à clé', meaningEn: 'all doors are locked', audio: 'audio/hsk2/hsk2_门.wav' },
      { hanzi: '每个人都很努力', pinyin: 'měi gè rén dōu hěn nǔ lì', meaning: 'chaque personne travaille dur', meaningEn: 'each person works hard', audio: 'audio/hsk3/hsk3_努力.wav' },
      { hanzi: '每天我都跑步', pinyin: 'měi tiān wǒ dōu pǎo bù', meaning: 'chaque jour, je cours', meaningEn: 'every day I run', audio: 'audio/hsk2/hsk2_跑步.wav' },
      { hanzi: '每本书都很有趣', pinyin: 'měi běn shū dōu hěn yǒu qù', meaning: 'chaque livre est intéressant', meaningEn: 'each book is interesting', audio: 'audio/hsk3/hsk3_有趣.wav' },
      { hanzi: '他们都在', pinyin: 'tā men dōu zài', meaning: 'ils sont tous là', meaningEn: 'they\'re all here', audio: 'audio/hsk1/hsk1_在.wav' },
      { hanzi: '每个人都在', pinyin: 'měi gè rén dōu zài', meaning: 'chacun est là', meaningEn: 'each person is here', audio: 'audio/hsk1/hsk1_在.wav' }
    ],
    tip:
      'Astuce : quand tu veux marteler « CHAQUE, un par un », prends 每 + classificateur + 都. Pour un simple constat collectif, 都 seul suffit.',
    tipEn:
      'Tip: when you want to hammer «EACH, one by one», use 每 + classifier + 都. For a simple collective observation, 都 alone is enough.'
  },
  {
    id: 'a2-all-quan-quanbu',
    title: '全 et 全部 : totalité et emphase',
    titleEn: '全 and 全部: totality and emphasis',
    body:
      '全 (quán) et 全部 (quán bù) « tout, entier, la totalité » ajoutent une insistance sur l\'INTÉGRALITÉ. 全 est court et familier ; 全部 un peu plus formel.\n' +
      '\n' +
      'Devant un nom : 全 / 全部 + (的) + Nom.\n' +
      '- Ex : 全家 (py quán jiā) « toute la famille ». 全 se colle directement au nom court.\n' +
      '- Ex : 全班同学 (py quán bān tóng xué) « toute la classe ».\n' +
      '- Ex : 全部的钱 (py quán bù de qián) « tout l\'argent ». Plus explicite avec 的.\n' +
      '\n' +
      'Combiné avec 都 : 全都 / 全部都 + Verbe = « ABSOLUMENT tous ». Emphase maximale.\n' +
      '- Ex : 孩子们全都笑了 (py hái zi men quán dōu xiào le) « les enfants ont TOUS ri (sans exception) ».\n' +
      '- Ex : 我的书全都在这里 (py wǒ de shū quán dōu zài zhè lǐ) « tous mes livres sont ici, absolument tous ».\n' +
      '- Ex : 他们全部都同意 (py tā men quán bù dōu tóng yì) « ils sont tous d\'accord, à 100 % ».\n' +
      '\n' +
      'Différence 都 / 所有 / 全 :\n' +
      '- 都 = suit le sujet, signale que la totalité participe.\n' +
      '- 所有 = modifie un nom, balaie l\'ensemble.\n' +
      '- 全 / 全部 = insiste sur la totalité (« pas UN de manquant »), plus expressif.\n' +
      '\n' +
      'Cumul possible : 所有的学生全都通过了 (py suǒ yǒu de xué shēng quán dōu tōng guò le) « TOUS les étudiants ont TOUS réussi (sans exception) ». Un peu redondant mais très emphatique.\n' +
      '\n' +
      '全 comme adjectif = « entier » : 全世界 (py quán shì jiè) « le monde entier », 全国 (py quán guó) « le pays entier », 全年 (py quán nián) « toute l\'année ».',
    bodyEn:
      '全 (quán) and 全部 (quán bù) «all, whole, the totality» add emphasis on WHOLENESS. 全 is short and casual; 全部 slightly more formal. Before a noun: 全 / 全部 + (的) + Noun. Ex: 全家 «the whole family». 全 sticks directly to short nouns. Ex: 全班同学 «the whole class». Ex: 全部的钱 «all the money». More explicit with 的. Combined with 都: 全都 / 全部都 + Verb = «ABSOLUTELY all». Maximum emphasis. Ex: 孩子们全都笑了 «the children ALL laughed (no exception)». Ex: 我的书全都在这里 «all my books are here, absolutely all». Ex: 他们全部都同意 «they all agree, 100%». Difference 都 / 所有 / 全: 都 = follows subject, signals total participation. 所有 = modifies a noun, sweeps the set. 全 / 全部 = insists on totality («not ONE missing»), more expressive. Possible stacking: 所有的学生全都通过了 «ALL students ALL passed (without exception)». A bit redundant but very emphatic. 全 as adjective = «whole»: 全世界 «the whole world», 全国 «the whole country», 全年 «the whole year».',
    items: [
      { hanzi: '全', pinyin: 'quán', meaning: 'entier, tout', meaningEn: 'whole, all', audio: 'audio/hsk4/hsk4_全.wav' },
      { hanzi: '全部', pinyin: 'quán bù', meaning: 'la totalité, tous', meaningEn: 'the whole, all', audio: 'audio/hsk4/hsk4_全部.wav' },
      { hanzi: '全都', pinyin: 'quán dōu', meaning: 'absolument tous', meaningEn: 'absolutely all', audio: 'audio/hsk4/hsk4_全.wav' },
      { hanzi: '全家', pinyin: 'quán jiā', meaning: 'toute la famille', meaningEn: 'the whole family', audio: 'audio/hsk1/hsk1_家.wav' },
      { hanzi: '全班同学', pinyin: 'quán bān tóng xué', meaning: 'toute la classe', meaningEn: 'the whole class', audio: 'audio/hsk2/hsk2_同学.wav' },
      { hanzi: '全部的钱', pinyin: 'quán bù de qián', meaning: 'tout l\'argent', meaningEn: 'all the money', audio: 'audio/hsk1/hsk1_钱.wav' },
      { hanzi: '孩子们全都笑了', pinyin: 'hái zi men quán dōu xiào le', meaning: 'les enfants ont tous ri (sans exception)', meaningEn: 'the children all laughed (no exception)', audio: 'audio/hsk2/hsk2_孩子.wav' },
      { hanzi: '我的书全都在这里', pinyin: 'wǒ de shū quán dōu zài zhè lǐ', meaning: 'tous mes livres sont ici, absolument tous', meaningEn: 'all my books are here, absolutely all', audio: 'audio/hsk1/hsk1_书.wav' },
      { hanzi: '他们全部都同意', pinyin: 'tā men quán bù dōu tóng yì', meaning: 'ils sont tous d\'accord, à 100 %', meaningEn: 'they all agree, 100%', audio: 'audio/hsk3/hsk3_同意.wav' },
      { hanzi: '全世界', pinyin: 'quán shì jiè', meaning: 'le monde entier', meaningEn: 'the whole world', audio: 'audio/hsk3/hsk3_世界.wav' },
      { hanzi: '全国', pinyin: 'quán guó', meaning: 'le pays entier', meaningEn: 'the whole country', audio: 'audio/hsk3/hsk3_全国.wav' },
      { hanzi: '全年', pinyin: 'quán nián', meaning: 'toute l\'année', meaningEn: 'the whole year', audio: 'audio/hsk1/hsk1_年.wav' }
    ],
    tip:
      'Astuce : pour ajouter du poids à ta totalité (« pas un ne manque à l\'appel »), prends 全都 ou 全部都. Sinon 都 suffit.',
    tipEn:
      'Tip: to add weight to your totality («not one missing»), use 全都 or 全部都. Otherwise 都 does the job.'
  }
];
