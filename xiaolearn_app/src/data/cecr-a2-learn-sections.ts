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
