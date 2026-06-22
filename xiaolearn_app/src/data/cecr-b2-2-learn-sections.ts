/**
 * cecr-b2-2-learn-sections.ts — contenu pédagogique manuel pour les 13 leçons B2.2.
 * Injecté dans cecr-course.ts via `learnSections: ...` sur chaque `LessonModule`.
 *
 * Règle produit : tous les `audio` pointent vers un fichier MP3/WAV pré-généré
 * (Azure Neural TTS — cf. xiaolearn_audio_policy). Convention :
 *   audio/hsk{N}/hsk{N}_{hanzi}.wav  (N = niveau HSK réel du mot)
 *
 * Note : les 3 modules `cecr-b22-grammar-complement-*` (compléments résultatifs
 * et directionnels) sont pédagogiquement rattachés à B1.2 et leurs learn
 * sections se trouvent dans `cecr-b1-2-learn-sections.ts`.
 */

import type { LessonV2LearnSection } from '../types/lesson-learn';

// ═════════════════════════════════════════════════════════════════════════════
// Structures argumentatives fines — 与其 · 宁可 · 只要/只有
// ═════════════════════════════════════════════════════════════════════════════

// --- cecr-b22-grammar-structure-m1 — 与其 A 不如 B --------------------------
export const b22StructureM1LearnSections: LessonV2LearnSection[] = [
  {
    id: 'b22-yuqi-buru',
    title: '与其 A 不如 B — choisir le moindre mal',
    titleEn: '与其 A 不如 B — pick the lesser evil',
    body:
      'On propose un arbitrage : l\'option **rejetée** vient après 与其, l\'option **retenue** après 不如. Contrairement à 比 qui compare objectivement, 与其…不如 porte un **jugement de valeur**, souvent un conseil.\n' +
      '\n' +
      'Exemples canoniques :\n' +
      '- 与其抱怨，不如行动 (plutôt que se plaindre, mieux vaut agir)\n' +
      '- 不如你先走 (tu ferais mieux de partir d\'abord — 与其 omis à l\'oral)\n' +
      '\n' +
      'Astuce : à l\'oral, on omet fréquemment 与其 quand le contexte est clair.',
    bodyEn:
      'We propose a trade-off: the rejected option comes after 与其, the chosen one after 不如. 与其抱怨，不如行动 = rather than complain, better to act. Unlike 比 which compares objectively, 与其…不如 carries a value judgment, often advice. In speech, 与其 is often dropped if context is clear: 不如你先走 = better you leave first.',
    items: [
      { hanzi: '与其', pinyin: 'yǔ qí', meaning: 'plutôt que', meaningEn: 'rather than', audio: 'audio/hsk6/hsk6_与其.wav' },
      { hanzi: '不如', pinyin: 'bù rú', meaning: 'autant vaut, mieux', meaningEn: 'better, rather', audio: 'audio/hsk5/hsk5_不如.wav' },
      { hanzi: '还不如', pinyin: 'hái bù rú', meaning: 'autant valoir', meaningEn: 'might as well', audio: 'audio/hsk5/hsk5_还不如.wav' },
      { hanzi: '抱怨', pinyin: 'bào yuàn', meaning: 'se plaindre', meaningEn: 'complain', audio: 'audio/hsk5/hsk5_抱怨.wav' },
      { hanzi: '行动', pinyin: 'xíng dòng', meaning: 'agir, action', meaningEn: 'act, action', audio: 'audio/hsk5/hsk5_行动.wav' }
    ],
    tip:
      'Piège fréquent : 与其 ne compare PAS deux choses/personnes, il compare deux ACTIONS ou situations. Pour comparer deux objets, garde 比 (他比我高). Pour comparer deux décisions, passe à 与其…不如.',
    tipEn:
      'Common pitfall: 与其 does NOT compare two things/people, it compares two ACTIONS or situations. To compare two objects, keep 比 (他比我高). To compare two decisions, switch to 与其…不如.'
  },
  {
    id: 'b22-yuqi-haibu-ru',
    title: 'La variante familière : 还不如',
    titleEn: 'The casual variant: 还不如',
    body:
      '还不如 = « autant vaudrait carrément ». C\'est la version **énervée** ou **résignée** de 与其…不如, qu\'on utilise quand l\'option actuelle paraît si inefficace qu\'on plaisante ou critique.\n' +
      '\n' +
      'Exemples typiques :\n' +
      '- 这个工资，还不如去送外卖 (avec ce salaire, autant livrer des repas)\n' +
      '- 你这么不努力，还不如别学了 (vu que tu ne bosses pas, autant arrêter)\n' +
      '\n' +
      'Attention : ton **ironique** ou désabusé, à éviter à l\'écrit formel.',
    bodyEn:
      '还不如 = "one might as well just". It\'s the exasperated / resigned version of 与其…不如. Used when you find the current option so inefficient you\'re half-joking or criticizing: 这个工资，还不如去送外卖 = with this salary, you might as well deliver meals. 你这么不努力，还不如别学了 = since you don\'t work, might as well quit. Oral tone, often ironic or disillusioned. Avoid in formal writing.',
    items: [
      { hanzi: '工资', pinyin: 'gōng zī', meaning: 'salaire', meaningEn: 'salary', audio: 'audio/hsk4/hsk4_工资.wav' },
      { hanzi: '送外卖', pinyin: 'sòng wài mài', meaning: 'livrer des repas', meaningEn: 'deliver meals', audio: 'audio/hsk4/hsk4_外卖.wav' },
      { hanzi: '浪费', pinyin: 'làng fèi', meaning: 'gaspiller', meaningEn: 'waste', audio: 'audio/hsk4/hsk4_浪费.wav' },
      { hanzi: '效率', pinyin: 'xiào lǜ', meaning: 'efficacité', meaningEn: 'efficiency', audio: 'audio/hsk6/hsk6_效率.wav' },
      { hanzi: '值得', pinyin: 'zhí dé', meaning: 'mériter, valoir', meaningEn: 'worth', audio: 'audio/hsk4/hsk4_值得.wav' }
    ],
    tip:
      'En dialogue, 还不如 est souvent précédé de 这样 : 这样还不如… = « comme ça, autant vaudrait… ». Ça renforce le côté « regarde, la situation actuelle est pire que l\'alternative proposée ».',
    tipEn:
      'In dialogue, 还不如 is often preceded by 这样: 这样还不如… = "this way, one might as well…". It reinforces the "look, the current situation is worse than the alternative" angle.'
  }
];

// --- cecr-b22-grammar-structure-m2 — 宁可 A 也 B ----------------------------
export const b22StructureM2LearnSections: LessonV2LearnSection[] = [
  {
    id: 'b22-ningke',
    title: '宁可 A 也 B — la préférence résolue',
    titleEn: '宁可 A 也 B — the resolute preference',
    body:
      'Le ton monte d\'un cran par rapport à 与其. **宁可** marque une préférence assumée, **souvent au prix d\'un sacrifice**. Variante 宁愿 = même sens, plus écrit.\n' +
      '\n' +
      'Exemples :\n' +
      '- 我宁可加班，也不拖延 (je préfère faire des heures sup plutôt que de traîner)\n' +
      '- 宁死也不投降 (plutôt mourir que se rendre)\n' +
      '\n' +
      'Attention : 与其 compare deux options **neutres**, 宁可 affirme une **fermeté personnelle**.',
    bodyEn:
      'The tone rises a notch above 与其. 宁可 marks an assumed preference, often at a cost. 我宁可加班，也不拖延 = I\'d rather do overtime than procrastinate. Variant 宁愿 = same meaning, more written. With negation in the second clause (也不): 宁死也不投降 = rather die than surrender. 与其 compares two neutral options; 宁可 asserts personal firmness.',
    items: [
      { hanzi: '宁可', pinyin: 'nìng kě', meaning: 'plutôt (sacrifice)', meaningEn: 'would rather (sacrifice)', audio: 'audio/hsk6/hsk6_宁可.wav' },
      { hanzi: '宁愿', pinyin: 'nìng yuàn', meaning: 'préférer (écrit)', meaningEn: 'prefer (written)', audio: 'audio/hsk5/hsk5_宁愿.wav' },
      { hanzi: '也不', pinyin: 'yě bù', meaning: 'même pas', meaningEn: 'nor, also not', audio: 'audio/hsk1/hsk1_也.wav' },
      { hanzi: '加班', pinyin: 'jiā bān', meaning: 'heures supplémentaires', meaningEn: 'overtime', audio: 'audio/hsk4/hsk4_加班.wav' },
      { hanzi: '投降', pinyin: 'tóu xiáng', meaning: 'se rendre', meaningEn: 'surrender', audio: 'audio/hsk6/hsk6_投降.wav' }
    ],
    tip:
      'Différence clé avec 与其 : 与其 = je compare deux options ; 宁可 = j\'en accepte une quitte à en subir le prix. 宁可 garde un parfum stoïque.',
    tipEn:
      'Key difference with 与其: 与其 = I compare two options; 宁可 = I accept one even at a cost. 宁可 keeps a stoic flavour.'
  },
  {
    id: 'b22-ningke-yebu-schema',
    title: 'Le schéma 宁可 A，也不 B',
    titleEn: 'The 宁可 A, 也不 B pattern',
    body:
      'La forme la plus fréquente est avec négation : 宁可 A 也不 B = « plutôt A que jamais B ».\n' +
      '\n' +
      'Exemples :\n' +
      '- 宁可饿着也不吃剩饭 (plutôt avoir faim que manger des restes)\n' +
      '- 宁可走路，也不坐地铁 (plutôt marcher que prendre le métro)\n' +
      '\n' +
      'RÈGLE D\'OR — trois conditions à respecter :\n' +
      '- le verbe de B doit être **nié** (也不, 也不会, 也没有)\n' +
      '- A est l\'option **coûteuse** qu\'on préfère\n' +
      '- B est l\'option **rejetée**, même si elle paraît plus confortable\n' +
      '\n' +
      'Attention : c\'est l\'**inverse** de l\'intuition française.',
    bodyEn:
      'The most common form uses negation: 宁可 A 也不 B = "rather A than ever B". 宁可饿着也不吃剩饭 = rather stay hungry than eat leftovers. 宁可走路，也不坐地铁 = rather walk than take the metro. Three golden rules: (1) B\'s verb must be negated (也不, 也不会, 也没有), (2) A is the costly option you prefer, (3) B is the rejected one, even if seemingly more comfortable. Opposite of French intuition — careful.',
    items: [
      { hanzi: '饿', pinyin: 'è', meaning: 'avoir faim', meaningEn: 'hungry', audio: 'audio/hsk3/hsk3_饿.wav' },
      { hanzi: '剩饭', pinyin: 'shèng fàn', meaning: 'restes (repas)', meaningEn: 'leftovers', audio: 'audio/hsk4/hsk4_剩.wav' },
      { hanzi: '辞职', pinyin: 'cí zhí', meaning: 'démissionner', meaningEn: 'resign', audio: 'audio/hsk5/hsk5_辞职.wav' },
      { hanzi: '委屈', pinyin: 'wěi qū', meaning: 'être lésé, avaler une humiliation', meaningEn: 'feel wronged', audio: 'audio/hsk5/hsk5_委屈.wav' },
      { hanzi: '坚持', pinyin: 'jiān chí', meaning: 'tenir bon', meaningEn: 'stand firm', audio: 'audio/hsk4/hsk4_坚持.wav' }
    ],
    tip:
      'Dans la littérature et la rhétorique, on croise souvent le schéma extrême 宁可…也不… avec 死 : 宁死不屈 = plutôt mourir que céder. Ce slogan classique résume l\'esprit de la structure.',
    tipEn:
      'In literature and rhetoric, the extreme pattern 宁可…也不… often appears with 死: 宁死不屈 = rather die than yield. This classical slogan captures the spirit of the structure.'
  }
];

// --- cecr-b22-grammar-structure-m3 — 只要/只有 ------------------------------
export const b22StructureM3LearnSections: LessonV2LearnSection[] = [
  {
    id: 'b22-zhiyao-zhiyou',
    title: '只要 + 就 vs 只有 + 才',
    titleEn: '只要 + 就 vs 只有 + 才',
    body:
      'RÈGLE D\'OR : deux conditionnels à ne **jamais** mélanger.\n' +
      '\n' +
      'Les deux structures :\n' +
      '- 只要 A 就 B = il suffit que A pour que B (**ouvert**, permissif) — 只要你来，我就开心\n' +
      '- 只有 A 才 B = seulement si A, alors B (**fermé**, restrictif) — 只有努力，才能成功\n' +
      '\n' +
      'Astuce mnémo : 就 **autorise** (« dès que ça suffit »), 才 **restreint** (« pas avant que »). Inverser les deux inverse totalement l\'argument.',
    bodyEn:
      'Two conditionals NEVER to mix. 只要 A 就 B = it\'s enough for A, then B (open, permissive). 只要你来，我就开心. 只有 A 才 B = only if A, then B (closed, restrictive). 只有努力，才能成功 = only effort brings success. Mnemonic: 就 permits ("as soon as it suffices"), 才 restricts ("not before"). Swapping the two flips the argument entirely.',
    items: [
      { hanzi: '只要', pinyin: 'zhǐ yào', meaning: 'il suffit que', meaningEn: 'as long as', audio: 'audio/hsk4/hsk4_只要.wav' },
      { hanzi: '只有', pinyin: 'zhǐ yǒu', meaning: 'seulement si', meaningEn: 'only if', audio: 'audio/hsk3/hsk3_只有.wav' },
      { hanzi: '就', pinyin: 'jiù', meaning: 'alors (permissif)', meaningEn: 'then (permissive)', audio: 'audio/hsk2/hsk2_就.wav' },
      { hanzi: '才', pinyin: 'cái', meaning: 'alors (restrictif)', meaningEn: 'only then (restrictive)', audio: 'audio/hsk2/hsk2_才.wav' },
      { hanzi: '努力', pinyin: 'nǔ lì', meaning: 'faire des efforts', meaningEn: 'work hard', audio: 'audio/hsk3/hsk3_努力.wav' },
      { hanzi: '成功', pinyin: 'chéng gōng', meaning: 'réussir', meaningEn: 'succeed', audio: 'audio/hsk4/hsk4_成功.wav' }
    ],
    tip:
      'En examen (HSK, grammaire), les QCM jouent TOUJOURS sur le couple 就/才. Ne laisse jamais l\'un sans son partenaire.',
    tipEn:
      'In exams (HSK, grammar), MCQs ALWAYS test the 就/才 pair. Never leave one without its partner.'
  },
  {
    id: 'b22-zhiyou-cai-exclusive',
    title: '只有…才 — l\'unique chemin',
    titleEn: '只有…才 — the one and only path',
    body:
      '只有…才 verrouille une condition **exclusive** — aucun autre chemin n\'est possible. Le 才 peut être renforcé par 能/才能 (capacité) ou 会 (possibilité future).\n' +
      '\n' +
      'Exemples :\n' +
      '- 只有通过练习，才能说得流利 (c\'est uniquement par la pratique qu\'on parle couramment)\n' +
      '- 只有冷静，才能做出正确的判断 (seul le sang-froid permet le bon jugement)\n' +
      '- 除非你同意，否则我不会做 (à moins que tu acceptes, je ne le ferai pas — variante avec 除非)\n' +
      '\n' +
      'Astuce : langage de presse, débat, essai — très fréquent aux examens **écrits**.',
    bodyEn:
      '只有…才 locks in an EXCLUSIVE condition: no other path works. 只有通过练习，才能说得流利 = only through practice can one speak fluently. 才 is often reinforced by 能/才能 (capacity) or 会 (future possibility): 只有冷静，才能做出正确的判断. To further emphasize, prefix with 除非: 除非你同意，否则我不会做 = unless you agree, I won\'t do it. Press, debate, essay register — very common in written exams.',
    items: [
      { hanzi: '练习', pinyin: 'liàn xí', meaning: 's\'exercer', meaningEn: 'practice', audio: 'audio/hsk3/hsk3_练习.wav' },
      { hanzi: '流利', pinyin: 'liú lì', meaning: 'couramment', meaningEn: 'fluently', audio: 'audio/hsk5/hsk5_流利.wav' },
      { hanzi: '冷静', pinyin: 'lěng jìng', meaning: 'calme, sang-froid', meaningEn: 'calm, composed', audio: 'audio/hsk5/hsk5_冷静.wav' },
      { hanzi: '判断', pinyin: 'pàn duàn', meaning: 'juger, jugement', meaningEn: 'judge, judgment', audio: 'audio/hsk5/hsk5_判断.wav' },
      { hanzi: '除非', pinyin: 'chú fēi', meaning: 'à moins que', meaningEn: 'unless', audio: 'audio/hsk5/hsk5_除非.wav' }
    ],
    tip:
      'Piège d\'écrit : ne confonds pas 只有 (condition exclusive) avec 除了 (exception) ni avec 只 (simplement). 只有你能帮我 = tu es le SEUL à pouvoir m\'aider. 只你能帮我 ≠ correct à l\'écrit.',
    tipEn:
      'Writing trap: don\'t mix 只有 (exclusive condition) with 除了 (exception) nor 只 (simply). 只有你能帮我 = you\'re the ONLY one who can help me. 只你能帮我 ≠ correct in writing.'
  }
];

// ═════════════════════════════════════════════════════════════════════════════
// Arts et littérature moderne
// ═════════════════════════════════════════════════════════════════════════════

// --- cecr-b22-arts-m1 — Littérature moderne & Lu Xun -----------------------
export const b22ArtsM1LearnSections: LessonV2LearnSection[] = [
  {
    id: 'b22-arts-m1-luxun',
    title: '鲁迅 et la bascule 白话文',
    titleEn: '鲁迅 and the 白话文 shift',
    body:
      'Avant 1918, la Chine écrit en 文言文 (classique, inintelligible à l\'oral). Lu Xun publie 《狂人日记》 en 白话文, un chinois écrit **tel qu\'on le parle**. C\'est une **rupture sismique** : soudain, la littérature s\'adresse à toute la population lettrée et non plus aux seuls érudits.\n' +
      '\n' +
      'Repères clés :\n' +
      '- 1918 : Lu Xun publie 《狂人日记》, premier texte majeur en 白话文\n' +
      '- 1919 : Mouvement du 4 mai (五四运动), qui institutionnalise la réforme\n' +
      '- Aujourd\'hui : tout roman, article, manuel se lit en 白话文 ; le 文言文 reste une matière scolaire.',
    bodyEn:
      'Before 1918, China wrote in 文言文 (classical, unreadable aloud). Lu Xun publishes 《狂人日记》 in 白话文, written Chinese as spoken. It\'s a seismic rupture: suddenly literature addresses the literate population at large, not scholars alone. The May Fourth Movement 1919 (五四运动) institutionalizes this reform. Today every novel, article, textbook reads in 白话文; 文言文 stays a school subject.',
    items: [
      { hanzi: '鲁迅', pinyin: 'lǔ xùn', meaning: 'Lu Xun', meaningEn: 'Lu Xun', audio: 'audio/hsk6/hsk6_鲁迅.wav' },
      { hanzi: '白话文', pinyin: 'bái huà wén', meaning: 'chinois vernaculaire', meaningEn: 'vernacular Chinese', audio: 'audio/hsk6/hsk6_白话文.wav' },
      { hanzi: '文言文', pinyin: 'wén yán wén', meaning: 'chinois classique', meaningEn: 'classical Chinese', audio: 'audio/hsk6/hsk6_文言文.wav' },
      { hanzi: '狂人日记', pinyin: 'kuáng rén rì jì', meaning: 'Journal d\'un fou', meaningEn: 'Diary of a Madman', audio: 'audio/hsk6/hsk6_狂人日记.wav' },
      { hanzi: '阿Q正传', pinyin: 'ā q zhèng zhuàn', meaning: 'La véritable histoire d\'A Q', meaningEn: 'The True Story of Ah Q', audio: 'audio/hsk6/hsk6_阿Q正传.wav' },
      { hanzi: '五四运动', pinyin: 'wǔ sì yùn dòng', meaning: 'Mouvement du 4 mai 1919', meaningEn: 'May Fourth Movement 1919', audio: 'audio/hsk6/hsk6_五四运动.wav' }
    ]
  }
];

// --- cecr-b22-arts-m2 — Cinéma chinois -------------------------------------
export const b22ArtsM2LearnSections: LessonV2LearnSection[] = [
  {
    id: 'b22-arts-m2-cinema',
    title: 'Trois générations de réalisateurs',
    titleEn: 'Three generations of directors',
    body:
      'Trois générations qui ont façonné le cinéma chinois moderne :\n' +
      '- **5ème génération** (fin 80s-90s) : 张艺谋 (Zhang Yimou, 《红高粱》, 《英雄》) et 陈凯歌 (Chen Kaige, 《霸王别姬》, Palme d\'or 1993) — esthétique flamboyante et récits historiques\n' +
      '- **6ème génération** (années 2000) : 贾樟柯 (Jia Zhangke) filme la Chine urbaine en mutation, loin des fresques\n' +
      '- **Aujourd\'hui** : le 票房 chinois est le premier au monde ; certains films locaux dépassent 1 milliard $ sans jamais sortir à l\'étranger.',
    bodyEn:
      '5th generation (late 80s-90s): 张艺谋 (Zhang Yimou, 《红高粱》, 《英雄》) and 陈凯歌 (Chen Kaige, 《霸王别姬》, Palme d\'Or 1993) bring a flamboyant aesthetic and historical narratives. 6th generation (2000s): 贾樟柯 (Jia Zhangke) films urban China in transition, far from epics. Today China\'s 票房 is the world\'s #1, with local films exceeding $1 billion without ever releasing abroad.',
    items: [
      { hanzi: '导演', pinyin: 'dǎo yǎn', meaning: 'réalisateur', meaningEn: 'director', audio: 'audio/hsk5/hsk5_导演.wav' },
      { hanzi: '演员', pinyin: 'yǎn yuán', meaning: 'acteur', meaningEn: 'actor', audio: 'audio/hsk4/hsk4_演员.wav' },
      { hanzi: '电影节', pinyin: 'diàn yǐng jié', meaning: 'festival de cinéma', meaningEn: 'film festival', audio: 'audio/hsk5/hsk5_电影节.wav' },
      { hanzi: '票房', pinyin: 'piào fáng', meaning: 'box-office', meaningEn: 'box office', audio: 'audio/hsk6/hsk6_票房.wav' },
      { hanzi: '张艺谋', pinyin: 'zhāng yì móu', meaning: 'Zhang Yimou', meaningEn: 'Zhang Yimou', audio: 'audio/hsk5/hsk5_张艺谋.wav' },
      { hanzi: '陈凯歌', pinyin: 'chén kǎi gē', meaning: 'Chen Kaige', meaningEn: 'Chen Kaige', audio: 'audio/hsk5/hsk5_陈凯歌.wav' }
    ]
  }
];

// --- cecr-b22-arts-m3 — Musique populaire ----------------------------------
export const b22ArtsM3LearnSections: LessonV2LearnSection[] = [
  {
    id: 'b22-arts-m3-music',
    title: 'De 邓丽君 à C-pop — 60 ans de voix',
    titleEn: 'From 邓丽君 to C-pop — 60 years of voices',
    body:
      'Trois ères de la chanson chinoise contemporaine :\n' +
      '- **邓丽君** (Teresa Teng, 1953-1995) : a marqué toute l\'Asie sinophone avec 《月亮代表我的心》 — sa voix a traversé le rideau de bambou entre Taïwan et la RPC dans les années 80\n' +
      '- **周杰伦** (Jay Chou) : a dominé les années 2000 en mélangeant rap, jazz et éléments traditionnels\n' +
      '- **Aujourd\'hui** : la 华语乐坛 passe par les 选秀节目 (télé-crochets) type 《歌手》 ou 《乘风破浪的姐姐》. 邓紫棋 (G.E.M.) et 华晨宇 (Hua Chenyu) sont des figures marquantes.',
    bodyEn:
      '邓丽君 (Teresa Teng, 1953-1995) marked the whole Sinophone Asia with 《月亮代表我的心》 — her voice crossed the bamboo curtain between Taiwan and PRC in the 80s. 周杰伦 (Jay Chou) dominated the 2000s, mixing rap, jazz and traditional Chinese elements. Today, the 华语乐坛 runs through 选秀节目 (talent shows) like 《歌手》 or 《乘风破浪的姐姐》. 邓紫棋 (G.E.M.) and 华晨宇 (Hua Chenyu) are leading figures.',
    items: [
      { hanzi: '邓丽君', pinyin: 'dèng lì jūn', meaning: 'Teresa Teng', meaningEn: 'Teresa Teng', audio: 'audio/hsk6/hsk6_邓丽君.wav' },
      { hanzi: '周杰伦', pinyin: 'zhōu jié lún', meaning: 'Jay Chou', meaningEn: 'Jay Chou', audio: 'audio/hsk5/hsk5_周杰伦.wav' },
      { hanzi: '歌手', pinyin: 'gē shǒu', meaning: 'chanteur', meaningEn: 'singer', audio: 'audio/hsk4/hsk4_歌手.wav' },
      { hanzi: '专辑', pinyin: 'zhuān jí', meaning: 'album', meaningEn: 'album', audio: 'audio/hsk5/hsk5_专辑.wav' },
      { hanzi: '演唱会', pinyin: 'yǎn chàng huì', meaning: 'concert', meaningEn: 'concert', audio: 'audio/hsk5/hsk5_演唱会.wav' },
      { hanzi: '选秀节目', pinyin: 'xuǎn xiù jié mù', meaning: 'télé-crochet, talent show', meaningEn: 'talent show', audio: 'audio/hsk6/hsk6_选秀节目.wav' }
    ]
  }
];

// --- cecr-b22-arts-m4 — Calligraphie et peinture ---------------------------
export const b22ArtsM4LearnSections: LessonV2LearnSection[] = [
  {
    id: 'b22-arts-m4-calligraphy',
    title: '书法 et les quatre trésors du lettré',
    titleEn: '书法 and the Four Treasures of the Study',
    body:
      'La calligraphie chinoise est considérée comme l\'**art suprême**, au-dessus de la peinture. Elle exige les **文房四宝** (quatre trésors du lettré) :\n' +
      '- 笔 (pinceau)\n' +
      '- 墨 (encre en bâton)\n' +
      '- 纸 (papier de riz)\n' +
      '- 砚 (pierre à encre)\n' +
      '\n' +
      'Les cinq styles dans l\'ordre historique :\n' +
      '- 篆书 (sigillaire, antique)\n' +
      '- 隶书 (scribal)\n' +
      '- 楷书 (régulier, celui qu\'on apprend à l\'école)\n' +
      '- 行书 (courant, semi-cursif)\n' +
      '- 草书 (cursif, « herbe folle »)\n' +
      '\n' +
      'Astuce : 王羲之 (Wang Xizhi, IVe s.) est 书圣, le « **saint de la calligraphie** ».',
    bodyEn:
      'Chinese calligraphy is considered the supreme art, above painting. It requires the 文房四宝: 笔 (brush), 墨 (ink stick), 纸 (rice paper), 砚 (inkstone). Five styles in historical order: 篆书 (seal, ancient) → 隶书 (clerical) → 楷书 (regular, what you learn at school) → 行书 (running, semi-cursive) → 草书 (cursive, "wild grass"). 王羲之 (Wang Xizhi, 4th c.) is 书圣, the "Sage of Calligraphy".',
    items: [
      { hanzi: '书法', pinyin: 'shū fǎ', meaning: 'calligraphie', meaningEn: 'calligraphy', audio: 'audio/hsk5/hsk5_书法.wav' },
      { hanzi: '文房四宝', pinyin: 'wén fáng sì bǎo', meaning: 'les 4 trésors du lettré', meaningEn: 'Four Treasures of Study', audio: 'audio/hsk6/hsk6_文房四宝.wav' },
      { hanzi: '笔', pinyin: 'bǐ', meaning: 'pinceau', meaningEn: 'brush', audio: 'audio/hsk1/hsk1_笔.wav' },
      { hanzi: '墨', pinyin: 'mò', meaning: 'encre', meaningEn: 'ink', audio: 'audio/hsk6/hsk6_墨.wav' },
      { hanzi: '楷书', pinyin: 'kǎi shū', meaning: 'style régulier', meaningEn: 'regular script', audio: 'audio/hsk6/hsk6_楷书.wav' },
      { hanzi: '草书', pinyin: 'cǎo shū', meaning: 'style cursif', meaningEn: 'cursive script', audio: 'audio/hsk6/hsk6_草书.wav' },
      { hanzi: '山水画', pinyin: 'shān shuǐ huà', meaning: 'peinture de paysage', meaningEn: 'landscape painting', audio: 'audio/hsk6/hsk6_山水画.wav' }
    ],
    tip:
      'Tester sa compréhension d\'un style : sais-tu reconnaître un 楷书 (angles nets, traits séparés) d\'un 草书 (un seul mouvement, presque illisible) ? C\'est la première étape.',
    tipEn:
      'Test your style recognition: can you tell a 楷书 (clean angles, separate strokes) from a 草书 (one flowing motion, nearly unreadable)? That\'s the first step.'
  }
];

// ═════════════════════════════════════════════════════════════════════════════
// Santé : médecines traditionnelle et moderne
// ═════════════════════════════════════════════════════════════════════════════

// --- cecr-b22-health-m1 — Médecine chinoise --------------------------------
export const b22HealthM1LearnSections: LessonV2LearnSection[] = [
  {
    id: 'b22-health-m1-tcm',
    title: '中医 : un système fondé sur l\'équilibre',
    titleEn: '中医: a system built on balance',
    body:
      'La médecine chinoise traditionnelle (中医) ne traite pas un organe isolé mais l\'**équilibre global** entre 阴/阳 et les cinq éléments (五行). Le diagnostic suit la méthode **望闻问切** : observer, écouter/sentir, interroger, palper le pouls.\n' +
      '\n' +
      'Quatre thérapies principales :\n' +
      '- 针灸 (aiguilles et moxibustion)\n' +
      '- 推拿 (massage appuyé)\n' +
      '- 中药 (décoctions d\'herbes)\n' +
      '- 拔罐 (ventouses)\n' +
      '\n' +
      'Remarque : concepts clés à mémoriser — 气 (énergie vitale), 血 (sang) et 经络 (méridiens qui relient les organes).',
    bodyEn:
      'Traditional Chinese Medicine (中医) doesn\'t treat an isolated organ but the overall balance between 阴/阳 and the five elements (五行). Diagnosis follows the 望闻问切 method — look, listen/smell, ask, palpate the pulse. Main therapies: 针灸 (needles and moxibustion), 推拿 (deep massage), 中药 (herbal decoctions), 拔罐 (cupping). Key concepts: 气 (vital energy), 血 (blood), 经络 (meridians linking organs).',
    items: [
      { hanzi: '中医', pinyin: 'zhōng yī', meaning: 'médecine chinoise', meaningEn: 'Chinese medicine', audio: 'audio/hsk4/hsk4_中医.wav' },
      { hanzi: '针灸', pinyin: 'zhēn jiǔ', meaning: 'acupuncture-moxibustion', meaningEn: 'acupuncture', audio: 'audio/hsk6/hsk6_针灸.wav' },
      { hanzi: '推拿', pinyin: 'tuī ná', meaning: 'massage thérapeutique', meaningEn: 'therapeutic massage', audio: 'audio/hsk6/hsk6_推拿.wav' },
      { hanzi: '中药', pinyin: 'zhōng yào', meaning: 'pharmacopée chinoise', meaningEn: 'Chinese medicine', audio: 'audio/hsk4/hsk4_中药.wav' },
      { hanzi: '气', pinyin: 'qì', meaning: 'énergie vitale', meaningEn: 'vital energy, qi', audio: 'audio/hsk1/hsk1_气.wav' },
      { hanzi: '经络', pinyin: 'jīng luò', meaning: 'méridiens', meaningEn: 'meridians', audio: 'audio/hsk6/hsk6_经络.wav' },
      { hanzi: '阴阳', pinyin: 'yīn yáng', meaning: 'yin et yang', meaningEn: 'yin and yang', audio: 'audio/hsk5/hsk5_阴阳.wav' }
    ],
    tip:
      'En Chine urbaine aujourd\'hui, beaucoup de patients mixent les deux médecines : 中西医结合. Ton généraliste peut te prescrire à la fois un antibiotique occidental et une décoction de plantes.',
    tipEn:
      'In urban China today, many patients blend both medicines: 中西医结合. Your GP may prescribe both a Western antibiotic and a herbal decoction.'
  }
];

// --- cecr-b22-health-m2 — Hôpital ------------------------------------------
export const b22HealthM2LearnSections: LessonV2LearnSection[] = [
  {
    id: 'b22-health-m2-hospital',
    title: 'Parcours dans un hôpital chinois',
    titleEn: 'The path through a Chinese hospital',
    body:
      'Séquence typique d\'une visite à l\'hôpital chinois :\n' +
      '- arriver à l\'hôpital (医院) et prendre un ticket numéroté au comptoir — 挂号\n' +
      '- patienter en salle d\'attente (候诊)\n' +
      '- consultation 看病, puis prescription 开药\n' +
      '- retirer les médicaments à la pharmacie interne (取药) et payer (付款)\n' +
      '- pour une hospitalisation (住院), un **dépôt** (押金) est souvent exigé\n' +
      '\n' +
      'L\'assurance publique 医保 rembourse une partie. Services à connaître : 内科 (interne), 外科 (chirurgie), 儿科 (pédiatrie), 皮肤科 (derma).',
    bodyEn:
      'Typical sequence: you arrive at the hospital (医院), get a numbered ticket at the counter — 挂号. Wait in the waiting room (候诊). The doctor sees you (看病), prescribes (开药). You go to the in-hospital pharmacy to collect drugs (取药) and pay (付款). For admission (住院), a deposit (押金) is often required. Public insurance 医保 reimburses part. Departments: 内科 (internal), 外科 (surgery), 儿科 (pediatrics), 皮肤科 (dermatology).',
    items: [
      { hanzi: '医院', pinyin: 'yī yuàn', meaning: 'hôpital', meaningEn: 'hospital', audio: 'audio/hsk1/hsk1_医院.wav' },
      { hanzi: '门诊', pinyin: 'mén zhěn', meaning: 'consultation externe', meaningEn: 'outpatient', audio: 'audio/hsk6/hsk6_门诊.wav' },
      { hanzi: '急诊', pinyin: 'jí zhěn', meaning: 'urgences', meaningEn: 'emergency', audio: 'audio/hsk6/hsk6_急诊.wav' },
      { hanzi: '挂号', pinyin: 'guà hào', meaning: 'prendre un ticket médical', meaningEn: 'register for consultation', audio: 'audio/hsk5/hsk5_挂号.wav' },
      { hanzi: '看病', pinyin: 'kàn bìng', meaning: 'consulter un médecin', meaningEn: 'see a doctor', audio: 'audio/hsk2/hsk2_看病.wav' },
      { hanzi: '开药', pinyin: 'kāi yào', meaning: 'prescrire', meaningEn: 'prescribe', audio: 'audio/hsk4/hsk4_开药.wav' },
      { hanzi: '医保', pinyin: 'yī bǎo', meaning: 'assurance santé', meaningEn: 'health insurance', audio: 'audio/hsk6/hsk6_医保.wav' }
    ]
  }
];

// --- cecr-b22-health-m3 — Bien-être ----------------------------------------
export const b22HealthM3LearnSections: LessonV2LearnSection[] = [
  {
    id: 'b22-health-m3-wellbeing',
    title: '养生 : l\'art de « nourrir la vie »',
    titleEn: '养生: the art of "nurturing life"',
    body:
      '养生 englobe **alimentation, sommeil, émotions, exercice doux** — l\'art de cultiver la longévité par l\'équilibre quotidien.\n' +
      '\n' +
      'Pratiques typiques :\n' +
      '- matins dans les parcs : 太极拳, 气功, 散步 en famille\n' +
      '- 食疗 (« soigner par l\'alimentation ») : pastèque rafraîchissante en été, soupes reconstituantes en hiver\n' +
      '- 喝热水 toute l\'année — le froid étant jugé nocif pour le 气\n' +
      '\n' +
      'Remarque : côté sombre moderne — 亚健康 (fatigue chronique sans diagnostic) et 抑郁症 (dépression, dont la reconnaissance progresse depuis 2020).',
    bodyEn:
      '养生 covers food, sleep, emotions, gentle exercise. Morning in the parks: seniors practicing 太极拳 and 气功, families doing 散步. Table: 食疗 ("healing through food") — cooling watermelon in summer, restorative soups in winter. Ritual: 喝热水 year-round, cold is deemed harmful to the 气. Modern dark side: 亚健康 (chronic fatigue without diagnosis), 抑郁症 (depression, whose recognition has been growing since 2020).',
    items: [
      { hanzi: '养生', pinyin: 'yǎng shēng', meaning: 'cultiver la santé', meaningEn: 'nurture life', audio: 'audio/hsk6/hsk6_养生.wav' },
      { hanzi: '太极拳', pinyin: 'tài jí quán', meaning: 'taichi', meaningEn: 'tai chi', audio: 'audio/hsk5/hsk5_太极拳.wav' },
      { hanzi: '气功', pinyin: 'qì gōng', meaning: 'qigong', meaningEn: 'qigong', audio: 'audio/hsk5/hsk5_气功.wav' },
      { hanzi: '散步', pinyin: 'sàn bù', meaning: 'promenade', meaningEn: 'stroll', audio: 'audio/hsk4/hsk4_散步.wav' },
      { hanzi: '热水', pinyin: 'rè shuǐ', meaning: 'eau chaude', meaningEn: 'hot water', audio: 'audio/hsk1/hsk1_热水.wav' },
      { hanzi: '亚健康', pinyin: 'yà jiàn kāng', meaning: '« sub-santé »', meaningEn: 'sub-health', audio: 'audio/hsk6/hsk6_亚健康.wav' },
      { hanzi: '抑郁症', pinyin: 'yì yù zhèng', meaning: 'dépression', meaningEn: 'depression', audio: 'audio/hsk6/hsk6_抑郁症.wav' }
    ],
    tip:
      'Si une amie chinoise te propose 喝热水 quand tu es malade, ce n\'est pas une blague — c\'est l\'équivalent culturel du « soigne-toi bien » universel.',
    tipEn:
      'If a Chinese friend offers 喝热水 when you\'re sick, it\'s not a joke — it\'s the cultural equivalent of the universal "get well soon".'
  }
];

// ═════════════════════════════════════════════════════════════════════════════
// Argumentation et débat
// ═════════════════════════════════════════════════════════════════════════════

// --- cecr-b22-debate-m1 — Introduire et soutenir ---------------------------
export const b22DebateM1LearnSections: LessonV2LearnSection[] = [
  {
    id: 'b22-debate-m1-open',
    title: 'Ouvrir, justifier, illustrer',
    titleEn: 'Open, justify, illustrate',
    body:
      'Une argumentation B2 se construit en **trois mouvements** :\n' +
      '- **Ouvrir** : 我认为 ou 在我看来 (poser une thèse) ; 从…来看 (adopter un angle)\n' +
      '- **Justifier** : 因为 (neutre), 由于 (formel), 之所以…是因为 (raisonnement inversé)\n' +
      '- **Illustrer** : 例如, 比如, 举例来说\n' +
      '\n' +
      'Astuce : enrichir avec 另外, 此外, 再说 pour ajouter sans relancer la même idée.',
    bodyEn:
      'A B2 argument is built in three moves. (1) Open: 我认为 or 在我看来 to state a thesis; 从…来看 to adopt an angle. (2) Justify: 因为 (neutral), 由于 (formal), 之所以…是因为 for a reverse reasoning. (3) Illustrate: 例如 / 比如 / 举例来说. Then enrich with 另外, 此外, 再说 to add without re-launching the same idea.',
    items: [
      { hanzi: '认为', pinyin: 'rèn wéi', meaning: 'penser que', meaningEn: 'think that', audio: 'audio/hsk4/hsk4_认为.wav' },
      { hanzi: '在我看来', pinyin: 'zài wǒ kàn lái', meaning: 'selon moi', meaningEn: 'in my view', audio: 'audio/hsk5/hsk5_在我看来.wav' },
      { hanzi: '因为', pinyin: 'yīn wèi', meaning: 'parce que', meaningEn: 'because', audio: 'audio/hsk2/hsk2_因为.wav' },
      { hanzi: '由于', pinyin: 'yóu yú', meaning: 'du fait que', meaningEn: 'due to', audio: 'audio/hsk4/hsk4_由于.wav' },
      { hanzi: '例如', pinyin: 'lì rú', meaning: 'par exemple', meaningEn: 'for example', audio: 'audio/hsk5/hsk5_例如.wav' },
      { hanzi: '另外', pinyin: 'lìng wài', meaning: 'en outre', meaningEn: 'besides', audio: 'audio/hsk4/hsk4_另外.wav' },
      { hanzi: '此外', pinyin: 'cǐ wài', meaning: 'en plus', meaningEn: 'in addition', audio: 'audio/hsk5/hsk5_此外.wav' }
    ]
  }
];

// --- cecr-b22-debate-m2 — Nuancer ------------------------------------------
export const b22DebateM2LearnSections: LessonV2LearnSection[] = [
  {
    id: 'b22-debate-m2-nuance',
    title: 'Reconnaître l\'adversaire, puis nuancer',
    titleEn: 'Acknowledge the opponent, then qualify',
    body:
      'La technique du « yes, but » chinoise commence par **reconnaître**, puis **nuance** sans contredire frontalement.\n' +
      '\n' +
      'Étape 1 — reconnaître :\n' +
      '- 的确 (certes)\n' +
      '- 不可否认 (on ne peut nier)\n' +
      '- 虽然…但是 (bien que… toutefois)\n' +
      '\n' +
      'Étape 2 — introduire la nuance :\n' +
      '- 不过 (plus doux que 但是)\n' +
      '- 然而 (soutenu)\n' +
      '- 其实 (qui révèle la réalité)\n' +
      '\n' +
      'Astuce : enchaîne avec des généralisations prudentes (一般来说, 通常, 大多数) et des restrictions (只是, 不一定) — très apprécié en contexte chinois formel.',
    bodyEn:
      'The Chinese "yes, but" technique begins by acknowledging (的确, 不可否认, 虽然…但是), then introduces a real nuance (不过 softer than 但是, 然而 formal, 其实 which reveals reality). Follow with cautious generalizations (一般来说, 通常, 大多数) and restrictions (只是, 不一定). The whole creates an argument that feels balanced — highly valued in formal Chinese contexts.',
    items: [
      { hanzi: '的确', pinyin: 'dí què', meaning: 'certes, en effet', meaningEn: 'admittedly, indeed', audio: 'audio/hsk5/hsk5_的确.wav' },
      { hanzi: '不可否认', pinyin: 'bù kě fǒu rèn', meaning: 'on ne peut nier', meaningEn: 'undeniable', audio: 'audio/hsk6/hsk6_不可否认.wav' },
      { hanzi: '不过', pinyin: 'bú guò', meaning: 'cependant', meaningEn: 'however', audio: 'audio/hsk3/hsk3_不过.wav' },
      { hanzi: '然而', pinyin: 'rán ér', meaning: 'toutefois', meaningEn: 'yet, however', audio: 'audio/hsk4/hsk4_然而.wav' },
      { hanzi: '其实', pinyin: 'qí shí', meaning: 'en réalité', meaningEn: 'actually', audio: 'audio/hsk3/hsk3_其实.wav' },
      { hanzi: '一般来说', pinyin: 'yī bān lái shuō', meaning: 'en général', meaningEn: 'generally speaking', audio: 'audio/hsk5/hsk5_一般来说.wav' },
      { hanzi: '不一定', pinyin: 'bù yí dìng', meaning: 'pas forcément', meaningEn: 'not necessarily', audio: 'audio/hsk4/hsk4_不一定.wav' }
    ]
  }
];

// --- cecr-b22-debate-m3 — Réfuter et conclure ------------------------------
export const b22DebateM3LearnSections: LessonV2LearnSection[] = [
  {
    id: 'b22-debate-m3-refute',
    title: 'Réfuter sans froisser, conclure avec force',
    titleEn: 'Refute without offense, conclude with force',
    body:
      'En Chine, dire frontalement 这是错的 en réunion peut coûter cher en **面子**. Les formules de réfutation se gradent en intensité.\n' +
      '\n' +
      'Pour réfuter en douceur :\n' +
      '- 我不太同意 (je ne suis pas trop d\'accord)\n' +
      '- 恐怕不是这样 (je crains que ce ne soit pas le cas)\n' +
      '- 这种看法值得商榷 (cette vue mérite discussion — ultra-soutenu)\n' +
      '- 我反对 (à réserver aux débats explicitement contradictoires)\n' +
      '\n' +
      'Astuce : pour conclure, monter d\'un cran de formalité — 总之 (oral) → 总的来说 → 综上所述 (écrit) → 因此 (par conséquent).',
    bodyEn:
      'In China, bluntly saying 这是错的 in a meeting can cost 面子. Prefer: 我不太同意, 恐怕不是这样, 这种看法值得商榷 (ultra-formal, for writing or high-level meetings). Reserve 我反对 for explicitly contradictory debates. To conclude, step up formality: 总之 (spoken) → 总的来说 → 综上所述 (written) → 因此 (therefore).',
    items: [
      { hanzi: '同意', pinyin: 'tóng yì', meaning: 'être d\'accord', meaningEn: 'agree', audio: 'audio/hsk3/hsk3_同意.wav' },
      { hanzi: '反对', pinyin: 'fǎn duì', meaning: 's\'opposer', meaningEn: 'oppose', audio: 'audio/hsk4/hsk4_反对.wav' },
      { hanzi: '恐怕', pinyin: 'kǒng pà', meaning: 'je crains que', meaningEn: 'I\'m afraid', audio: 'audio/hsk4/hsk4_恐怕.wav' },
      { hanzi: '商榷', pinyin: 'shāng què', meaning: 'mériter discussion', meaningEn: 'worth discussing', audio: 'audio/hsk6/hsk6_商榷.wav' },
      { hanzi: '总之', pinyin: 'zǒng zhī', meaning: 'en bref', meaningEn: 'in short', audio: 'audio/hsk4/hsk4_总之.wav' },
      { hanzi: '综上所述', pinyin: 'zōng shàng suǒ shù', meaning: 'au vu de ce qui précède', meaningEn: 'in light of the above', audio: 'audio/hsk6/hsk6_综上所述.wav' },
      { hanzi: '因此', pinyin: 'yīn cǐ', meaning: 'par conséquent', meaningEn: 'therefore', audio: 'audio/hsk4/hsk4_因此.wav' },
      { hanzi: '面子', pinyin: 'miàn zi', meaning: 'face, réputation', meaningEn: 'face, reputation', audio: 'audio/hsk5/hsk5_面子.wav' }
    ],
    tip:
      'Règle d\'or : plus le contexte est formel / hiérarchique, plus 恐怕 et 商榷 deviennent utiles. Les réunions officielles chinoises n\'utilisent presque jamais 你错了.',
    tipEn:
      'Golden rule: the more formal / hierarchical the context, the more useful 恐怕 and 商榷 become. Official Chinese meetings almost never use 你错了.'
  }
];

// ═════════════════════════════════════════════════════════════════════════════
// VAGUE 2 — extension B2.2 (15 nouvelles leçons)
// Ajoutées après audit qui montrait B2.2 sous-doté en contenu (13 leçons sur
// les ~28 attendus pour atteindre vraiment le niveau).
// Audio MP3 à générer dans une 2e passe via le pipeline Azure TTS.
// ═════════════════════════════════════════════════════════════════════════════

// --- cecr-b22-grammar-structure-m4 — 既然…就/那 ----------------------------
export const b22StructureM4LearnSections: LessonV2LearnSection[] = [
  {
    id: 'b22-jiran',
    title: '既然 A，就/那 B — « puisque A, alors B »',
    titleEn: '既然 A, 就/那 B — «since A, then B»',
    body:
      'RÈGLE D\'OR : 既然 introduit une cause **déjà admise** par les deux interlocuteurs — on ne la justifie plus, on en tire la conséquence.\n' +
      '\n' +
      'Exemples :\n' +
      '- 既然你已经决定了，就别后悔 (puisque tu as décidé, ne regrette plus)\n' +
      '- 既然这样，那就算了 (puisque c\'est comme ça, laisse tomber)\n' +
      '\n' +
      'Attention : différence majeure avec 因为 — 因为 **informe** la cause (l\'autre ne la connaît pas), 既然 la **présuppose** (l\'autre la connaît). Souvent suivi de 就 (logique) ou 那(就) (familier).',
    bodyEn:
      '既然 (jìrán) introduces a cause ALREADY accepted by both speakers: we no longer justify it, we draw its consequence. 既然你已经决定了，就别后悔 = since you\'ve already decided, don\'t regret it. Major difference with 因为: 因为 INFORMS of the cause (the other doesn\'t know it), 既然 PRESUPPOSES it (the other knows). Often followed by 就 (logical) or 那(就) (casual).',
    items: [
      { hanzi: '既然', pinyin: 'jì rán', meaning: 'puisque', meaningEn: 'since', audio: 'audio/hsk5/hsk5_既然.wav' },
      { hanzi: '决定', pinyin: 'jué dìng', meaning: 'décider', meaningEn: 'decide', audio: 'audio/hsk3/hsk3_决定.wav' },
      { hanzi: '后悔', pinyin: 'hòu huǐ', meaning: 'regretter', meaningEn: 'regret', audio: 'audio/hsk4/hsk4_后悔.wav' },
      { hanzi: '那', pinyin: 'nà', meaning: 'alors', meaningEn: 'then', audio: 'audio/hsk1/hsk1_那.wav' },
      { hanzi: '就', pinyin: 'jiù', meaning: 'donc, alors', meaningEn: 'then, so', audio: 'audio/hsk2/hsk2_就.wav' }
    ],
    tip:
      'Test rapide : si tu peux remplacer par « puisque » en français (et pas par « parce que »), 既然 fonctionne. Sinon, garde 因为.',
    tipEn:
      'Quick test: if you can replace with «since» in English (not «because»), 既然 works. Otherwise stick with 因为.'
  },
  {
    id: 'b22-jiran-formel',
    title: 'Variante écrite : 既 A 又 B vs 既然',
    titleEn: 'Written variant: 既 A 又 B vs 既然',
    body:
      'Attention : ne pas confondre 既然 (puisque) avec **既…又…** (à la fois… et…).\n' +
      '\n' +
      'Exemples de parallélisme :\n' +
      '- 既好吃又便宜 (à la fois bon et pas cher)\n' +
      '- 既漂亮又聪明 (à la fois belle et intelligente)\n' +
      '\n' +
      'Astuce : très utilisé à l\'écrit B2/C1 pour énumérer deux qualités positives. Variante 既…也… (registre soutenu). Différence avec 又…又… — 既…又 est plus **écrit**, plus formel.',
    bodyEn:
      'Don\'t confuse 既然 (since) with 既…又… (both… and…). 既好吃又便宜 = both tasty and cheap (parallelism). Heavily used in B2/C1 writing to list two positive qualities. Variant: 既…也… (formal register). Difference from 又…又…: 既…又 is slightly more written, more formal.',
    items: [
      { hanzi: '既', pinyin: 'jì', meaning: 'à la fois', meaningEn: 'both', audio: 'audio/hsk6/hsk6_既.wav' },
      { hanzi: '又', pinyin: 'yòu', meaning: 'aussi, et', meaningEn: 'also, and', audio: 'audio/hsk3/hsk3_又.wav' },
      { hanzi: '便宜', pinyin: 'pián yi', meaning: 'pas cher', meaningEn: 'cheap', audio: 'audio/hsk2/hsk2_便宜.wav' },
      { hanzi: '好吃', pinyin: 'hǎo chī', meaning: 'bon (à manger)', meaningEn: 'tasty', audio: 'audio/hsk1/hsk1_好吃.wav' },
      { hanzi: '质量', pinyin: 'zhì liàng', meaning: 'qualité', meaningEn: 'quality', audio: 'audio/hsk4/hsk4_质量.wav' }
    ],
    tip:
      '既…又 introduit toujours DEUX adjectifs/qualités du MÊME sujet. Si les sujets diffèrent, repasse à 不但…而且 ou 既然.',
    tipEn:
      '既…又 always introduces TWO adjectives/qualities of the SAME subject. If subjects differ, switch to 不但…而且 or 既然.'
  }
];

// --- cecr-b22-grammar-structure-m5 — 以…为… ---------------------------------
export const b22StructureM5LearnSections: LessonV2LearnSection[] = [
  {
    id: 'b22-yi-wei',
    title: '以 X 为 Y — « prendre X comme/pour Y »',
    titleEn: '以 X 为 Y — «take X as/for Y»',
    body:
      'Structure formelle issue du chinois classique, omniprésente à l\'écrit B2+. Construction : **sujet implicite + 以 + objet + 为 + attribut**.\n' +
      '\n' +
      'Exemples canoniques :\n' +
      '- 以学生为中心 (avoir l\'élève au centre)\n' +
      '- 以质量为先 (donner la priorité à la qualité)\n' +
      '- 以人为本 (l\'humain au cœur — slogan politique)\n' +
      '\n' +
      'Astuce : très utilisée dans les slogans, missions d\'entreprise et manifestes pédagogiques.',
    bodyEn:
      'Formal structure from classical Chinese, ubiquitous in B2+ writing. 以学生为中心 = put the student at the center. 以质量为先 = put quality first. Heavily used in slogans, company missions, educational manifestos. Structure: implicit subject + 以 + object + 为 + attribute.',
    items: [
      { hanzi: '以', pinyin: 'yǐ', meaning: 'avec, prendre', meaningEn: 'with, take', audio: 'audio/hsk4/hsk4_以.wav' },
      { hanzi: '为', pinyin: 'wéi', meaning: 'comme, pour', meaningEn: 'as, for', audio: 'audio/hsk2/hsk2_为.wav' },
      { hanzi: '中心', pinyin: 'zhōng xīn', meaning: 'centre', meaningEn: 'center', audio: 'audio/hsk3/hsk3_中心.wav' },
      { hanzi: '主', pinyin: 'zhǔ', meaning: 'principal', meaningEn: 'main', audio: 'audio/hsk3/hsk3_主.wav' },
      { hanzi: '为主', pinyin: 'wéi zhǔ', meaning: 'comme principal', meaningEn: 'as main', audio: 'audio/hsk5/hsk5_为主.wav' }
    ],
    tip:
      'À retenir comme bloc figé : 以…为主 (donner la priorité à), 以…为荣 (être fier de), 以…为例 (prendre comme exemple). Très productif en composition écrite.',
    tipEn:
      'Memorize as fixed blocks: 以…为主 (prioritize), 以…为荣 (be proud of), 以…为例 (take as example). Very productive in essay writing.'
  },
  {
    id: 'b22-yi-wei-rong',
    title: 'Idiomes courants : 以…为荣 / 以…为耻',
    titleEn: 'Common idioms: 以…为荣 / 以…为耻',
    body:
      'Couple émotionnel hérité de la culture confucéenne :\n' +
      '- **以…为荣** (yǐ…wéi róng) = être fier de\n' +
      '- **以…为耻** (yǐ…wéi chǐ) = avoir honte de\n' +
      '\n' +
      'Exemples :\n' +
      '- 我以你为荣 (je suis fier de toi — plus fort que 我为你骄傲)\n' +
      '- 中国以悠久的历史为荣 (la Chine s\'enorgueillit de sa longue histoire)\n' +
      '\n' +
      'Astuce : très utilisé dans les discours patriotiques, éducatifs ou familiaux.',
    bodyEn:
      '以…为荣 (yǐ…wéi róng) = be proud of. 以…为耻 (yǐ…wéi chǐ) = be ashamed of. Emotional pair inherited from Confucian culture. 我以你为荣 = I\'m proud of you (very valorizing, stronger than 我为你骄傲). 中国以悠久的历史为荣 = China prides itself on its long history. Heavily used in patriotic, educational or family speech.',
    items: [
      { hanzi: '荣', pinyin: 'róng', meaning: 'honneur, gloire', meaningEn: 'honor, glory', audio: 'audio/hsk6/hsk6_荣.wav' },
      { hanzi: '耻', pinyin: 'chǐ', meaning: 'honte', meaningEn: 'shame', audio: 'audio/hsk6/hsk6_耻.wav' },
      { hanzi: '骄傲', pinyin: 'jiāo ào', meaning: 'fier', meaningEn: 'proud', audio: 'audio/hsk4/hsk4_骄傲.wav' },
      { hanzi: '悠久', pinyin: 'yōu jiǔ', meaning: 'ancien, long', meaningEn: 'long-standing', audio: 'audio/hsk6/hsk6_悠久.wav' },
      { hanzi: '历史', pinyin: 'lì shǐ', meaning: 'histoire', meaningEn: 'history', audio: 'audio/hsk3/hsk3_历史.wav' }
    ],
    tip:
      '以你为荣 sonne plus solennel et plus chaleureux que 为你骄傲 — préfère-le pour féliciter un proche après un grand succès.',
    tipEn:
      '以你为荣 sounds more solemn and warmer than 为你骄傲 — prefer it to congratulate a loved one after a major success.'
  }
];

// --- cecr-b22-grammar-structure-m6 — 不仅…而且… (avancé) ---------------------
export const b22StructureM6LearnSections: LessonV2LearnSection[] = [
  {
    id: 'b22-bujin-erqie',
    title: '不仅 A 而且 B — « non seulement A, mais aussi B »',
    titleEn: '不仅 A 而且 B — «not only A but also B»',
    body:
      'Version **soutenue** de 不但…而且 (vu en B1) — plus écrit, plus solennel. Exemple : 这本书不仅内容深刻，而且文笔优美 (ce livre est non seulement profond mais bien écrit).\n' +
      '\n' +
      'Hiérarchie des variantes par registre :\n' +
      '- 不只 (parlé)\n' +
      '- 不但 (standard)\n' +
      '- 不仅 (écrit)\n' +
      '- 不仅仅 (insistant)\n' +
      '\n' +
      'Astuce : le 2e élément peut prendre 还、也、更 à la place de 而且 pour graduer.',
    bodyEn:
      'Formal version of 不但…而且 (B1). More written, more solemn. 这本书不仅内容深刻，而且文笔优美 = this book is not only deep but also beautifully written. Register variants: 不只 (spoken) < 不但 (standard) < 不仅 (written) < 不仅仅 (emphatic). The 2nd element can use 还、也、更 instead of 而且 to grade up.',
    items: [
      { hanzi: '不仅', pinyin: 'bù jǐn', meaning: 'non seulement', meaningEn: 'not only', audio: 'audio/hsk5/hsk5_不仅.wav' },
      { hanzi: '而且', pinyin: 'ér qiě', meaning: 'mais aussi', meaningEn: 'but also', audio: 'audio/hsk3/hsk3_而且.wav' },
      { hanzi: '深刻', pinyin: 'shēn kè', meaning: 'profond', meaningEn: 'profound', audio: 'audio/hsk5/hsk5_深刻.wav' },
      { hanzi: '文笔', pinyin: 'wén bǐ', meaning: 'style d\'écriture', meaningEn: 'writing style', audio: 'audio/hsk6/hsk6_文笔.wav' },
      { hanzi: '优美', pinyin: 'yōu měi', meaning: 'gracieux, beau', meaningEn: 'graceful, fine', audio: 'audio/hsk5/hsk5_优美.wav' }
    ],
    tip:
      'Pour graduer encore plus fort : 不仅 A 反而 B = non seulement pas A mais au contraire B. Très efficace pour exprimer une surprise ou un retournement.',
    tipEn:
      'To grade up even stronger: 不仅 A 反而 B = not only not A but on the contrary B. Very effective for surprise or reversal.'
  },
  {
    id: 'b22-bujin-jin',
    title: 'Renforcement : 不仅 X 还/也 / 不仅仅',
    titleEn: 'Reinforcement: 不仅 X 还/也 / 不仅仅',
    body:
      'En 2e proposition, on peut remplacer 而且 par un connecteur plus nuancé :\n' +
      '- 还 (en plus)\n' +
      '- 也 (aussi)\n' +
      '- 更 (encore plus)\n' +
      '\n' +
      'Exemples :\n' +
      '- 他不仅会说中文，还会写汉字 (il ne sait pas seulement parler chinois, il écrit aussi)\n' +
      '- 这不仅仅是钱的问题 (ce n\'est pas qu\'une question d\'argent)\n' +
      '\n' +
      'Astuce : **不仅仅** (avec doublement) intensifie — « pas seulement, mais bien plus ».',
    bodyEn:
      'In the 2nd clause, replace 而且 with 还 (additionally), 也 (also), 更 (even more) for nuance. 他不仅会说中文，还会写汉字 = he doesn\'t only speak Chinese, he also writes characters. 不仅仅 (doubled) intensifies: «not just, but much more». 这不仅仅是钱的问题 = this is not JUST a money issue.',
    items: [
      { hanzi: '不仅仅', pinyin: 'bù jǐn jǐn', meaning: 'pas seulement', meaningEn: 'not just', audio: 'audio/hsk6/hsk6_不仅仅.wav' },
      { hanzi: '还', pinyin: 'hái', meaning: 'encore, en plus', meaningEn: 'still, also', audio: 'audio/hsk2/hsk2_还.wav' },
      { hanzi: '更', pinyin: 'gèng', meaning: 'encore plus', meaningEn: 'even more', audio: 'audio/hsk3/hsk3_更.wav' },
      { hanzi: '钱', pinyin: 'qián', meaning: 'argent', meaningEn: 'money', audio: 'audio/hsk1/hsk1_钱.wav' },
      { hanzi: '问题', pinyin: 'wèn tí', meaning: 'question, problème', meaningEn: 'question, issue', audio: 'audio/hsk2/hsk2_问题.wav' }
    ],
    tip:
      '不仅仅 + 是 X 的问题 (« pas QU\'une question de X ») est une formule rhétorique extrêmement courante dans les éditoriaux et discours.',
    tipEn:
      '不仅仅 + 是 X 的问题 («not JUST a question of X») is an extremely common rhetorical formula in op-eds and speeches.'
  }
];

// --- cecr-b22-grammar-structure-m7 — 即使…也… --------------------------------
export const b22StructureM7LearnSections: LessonV2LearnSection[] = [
  {
    id: 'b22-jishi',
    title: '即使 A 也 B — « même si A, B » (concession irréelle)',
    titleEn: '即使 A 也 B — «even if A, B» (hypothetical concession)',
    body:
      'RÈGLE D\'OR : 即使 introduit une **hypothèse extrême**, souvent contraire aux faits, suivie obligatoirement de 也 dans la 2e proposition. Exemple : 即使下雨，我也要去 (même s\'il pleut, j\'y vais).\n' +
      '\n' +
      'Variantes par registre :\n' +
      '- 哪怕 (oral, expressif)\n' +
      '- 即便 (écrit)\n' +
      '- 就算 (parlé/familier)\n' +
      '\n' +
      'Attention : différence avec 虽然 — 虽然 = **fait réel** admis (« bien qu\'il pleuve [il pleut vraiment] »), 即使 = **hypothèse** (« même s\'il pleuvait »).',
    bodyEn:
      '即使 (jíshǐ) introduces an extreme hypothesis, often counter-factual, followed mandatorily by 也 in the 2nd clause. 即使下雨，我也要去 = even if it rains, I\'m going. Difference from 虽然: 虽然 = real accepted fact («although it\'s raining [it really is]»), 即使 = hypothetical («even if it were to rain»). Register variants: 哪怕 (oral, expressive), 即便 (written), 就算 (spoken/casual).',
    items: [
      { hanzi: '即使', pinyin: 'jí shǐ', meaning: 'même si', meaningEn: 'even if', audio: 'audio/hsk5/hsk5_即使.wav' },
      { hanzi: '哪怕', pinyin: 'nǎ pà', meaning: 'même si', meaningEn: 'even if', audio: 'audio/hsk5/hsk5_哪怕.wav' },
      { hanzi: '就算', pinyin: 'jiù suàn', meaning: 'même si', meaningEn: 'even if', audio: 'audio/hsk5/hsk5_就算.wav' },
      { hanzi: '即便', pinyin: 'jí biàn', meaning: 'même si', meaningEn: 'even if', audio: 'audio/hsk6/hsk6_即便.wav' },
      { hanzi: '坚持', pinyin: 'jiān chí', meaning: 'persévérer', meaningEn: 'persist', audio: 'audio/hsk4/hsk4_坚持.wav' }
    ],
    tip:
      'Le 也 est obligatoire dans la 2e proposition. Sans 也, la phrase n\'est pas grammaticale en chinois standard. C\'est l\'erreur n°1 des apprenants francophones.',
    tipEn:
      '也 is mandatory in the 2nd clause. Without 也, the sentence is ungrammatical in standard Chinese. It\'s the n°1 mistake for French learners.'
  },
  {
    id: 'b22-jishi-napa',
    title: '哪怕 — la concession émotionnelle',
    titleEn: '哪怕 — the emotional concession',
    body:
      '哪怕 = « même si », mais avec une **charge émotionnelle** plus forte que 即使. Souvent utilisé pour exprimer **détermination, sacrifice, amour**. Aussi suivi obligatoirement de 也.\n' +
      '\n' +
      'Exemples typiques :\n' +
      '- 哪怕只有一线希望，我也不放弃 (même s\'il n\'y a qu\'une lueur d\'espoir, je ne renonce pas)\n' +
      '- 哪怕你不爱我了，我也会等你 (même si tu ne m\'aimes plus, je t\'attendrai)\n' +
      '\n' +
      'Astuce : très présent dans les **chansons d\'amour**, films dramatiques et discours motivationnels.',
    bodyEn:
      '哪怕 (nǎpà) = «even if», with a stronger emotional charge than 即使. Often used to express determination, sacrifice, love. 哪怕只有一线希望，我也不放弃 = even if there\'s only a glimmer of hope, I won\'t give up. 哪怕你不爱我了 = even if you no longer love me. Very present in love songs, dramatic films, motivational speech. Also mandatorily followed by 也.',
    items: [
      { hanzi: '一线', pinyin: 'yí xiàn', meaning: 'une lueur', meaningEn: 'a glimmer', audio: 'audio/hsk5/hsk5_一线.wav' },
      { hanzi: '希望', pinyin: 'xī wàng', meaning: 'espoir', meaningEn: 'hope', audio: 'audio/hsk2/hsk2_希望.wav' },
      { hanzi: '放弃', pinyin: 'fàng qì', meaning: 'renoncer', meaningEn: 'give up', audio: 'audio/hsk4/hsk4_放弃.wav' },
      { hanzi: '爱', pinyin: 'ài', meaning: 'aimer', meaningEn: 'love', audio: 'audio/hsk1/hsk1_爱.wav' },
      { hanzi: '相信', pinyin: 'xiāng xìn', meaning: 'croire', meaningEn: 'believe', audio: 'audio/hsk3/hsk3_相信.wav' }
    ],
    tip:
      'Si tu hésites entre 即使 et 哪怕 : 即使 = neutre logique, 哪怕 = chargé d\'émotion (engagement, pari, sacrifice).',
    tipEn:
      'When choosing 即使 vs 哪怕: 即使 = logical neutral, 哪怕 = emotionally charged (commitment, bet, sacrifice).'
  }
];

// --- cecr-b22-arts-m5 — Théâtre traditionnel : opéras chinois -----------------
export const b22ArtsM5LearnSections: LessonV2LearnSection[] = [
  {
    id: 'b22-jingju',
    title: '京剧 — l\'opéra de Pékin',
    titleEn: '京剧 — Beijing Opera',
    body:
      'Né au 19e siècle à Pékin, devenu **emblème national**. Combine quatre disciplines : chant 唱, parole rythmée 念, gestes acrobatiques 做, combats martiaux 打.\n' +
      '\n' +
      'Quatre rôles principaux :\n' +
      '- 生 (homme)\n' +
      '- 旦 (femme)\n' +
      '- 净 (visage peint, fort caractère)\n' +
      '- 丑 (comique)\n' +
      '\n' +
      'Maquillage **脸谱** ultra-codé :\n' +
      '- rouge = loyauté\n' +
      '- blanc = traîtrise\n' +
      '- noir = intégrité\n' +
      '- jaune = cruauté\n' +
      '\n' +
      'Astuce : œuvres clés à connaître — 《霸王别姬》 (Adieu ma concubine), 《贵妃醉酒》 (L\'ivresse de la concubine).',
    bodyEn:
      '京剧 (jīngjù) born in 19th-century Beijing, now a national emblem. Combines singing 唱 (chàng), rhythmic speech 念 (niàn), acrobatic gestures 做 (zuò), and martial combat 打 (dǎ). 4 main roles: 生 (male), 旦 (female), 净 (painted-face, strong character), 丑 (clown). 脸谱 (liǎnpǔ) makeup highly coded: red = loyalty, white = treachery, black = integrity, yellow = cruelty. Key works: 《霸王别姬》(Farewell My Concubine), 《贵妃醉酒》(The Drunken Concubine).',
    items: [
      { hanzi: '京剧', pinyin: 'jīng jù', meaning: 'opéra de Pékin', meaningEn: 'Beijing opera', audio: 'audio/hsk5/hsk5_京剧.wav' },
      { hanzi: '脸谱', pinyin: 'liǎn pǔ', meaning: 'maquillage facial', meaningEn: 'face makeup', audio: 'audio/hsk6/hsk6_脸谱.wav' },
      { hanzi: '生', pinyin: 'shēng', meaning: 'rôle masculin', meaningEn: 'male role', audio: 'audio/hsk1/hsk1_生.wav' },
      { hanzi: '旦', pinyin: 'dàn', meaning: 'rôle féminin', meaningEn: 'female role', audio: 'audio/hsk5/hsk5_旦.wav' },
      { hanzi: '丑', pinyin: 'chǒu', meaning: 'rôle comique', meaningEn: 'clown role', audio: 'audio/hsk4/hsk4_丑.wav' }
    ],
    tip:
      'Anecdote utile : les rôles de 旦 (femme) étaient historiquement joués par des hommes — 梅兰芳 (méi lán fāng) reste le 旦 le plus célèbre du 20e siècle.',
    tipEn:
      'Useful anecdote: 旦 (female) roles were historically played by men — 梅兰芳 (Mei Lanfang) is the most famous 20th-century 旦.'
  },
  {
    id: 'b22-difang-xi',
    title: 'Au-delà de Pékin : 越剧, 川剧, 粤剧',
    titleEn: 'Beyond Beijing: 越剧, 川剧, 粤剧',
    body:
      'La Chine compte **300+ formes d\'opéra régional**, chacune avec ses dialectes, costumes et instruments. Tous reconnus patrimoine immatériel UNESCO.\n' +
      '\n' +
      'Trois traditions majeures :\n' +
      '- 越剧 (Zhejiang) — féminin, lyrique, célèbre pour 《梁山伯与祝英台》\n' +
      '- 川剧 (Sichuan) — célèbre pour son 变脸 (l\'acteur change de masque en une seconde par un mouvement secret)\n' +
      '- 粤剧 (Cantonais) — populaire à Hong Kong, Canton et dans toutes les diasporas chinoises',
    bodyEn:
      'China has 300+ regional opera forms. 越剧 (yuèjù, Zhejiang) — feminine, lyrical, famous for 《梁山伯与祝英台》. 川剧 (chuānjù, Sichuan) — famous for 变脸 (face-changing: actor switches masks in a second via a secret movement). 粤剧 (yuèjù, Cantonese) — popular in Hong Kong, Canton, and Chinese diasporas. Each opera has its dialects, costumes, instruments. All recognized as UNESCO intangible heritage.',
    items: [
      { hanzi: '川剧', pinyin: 'chuān jù', meaning: 'opéra du Sichuan', meaningEn: 'Sichuan opera', audio: 'audio/hsk6/hsk6_川剧.wav' },
      { hanzi: '变脸', pinyin: 'biàn liǎn', meaning: 'changement de visage', meaningEn: 'face-changing', audio: 'audio/hsk6/hsk6_变脸.wav' },
      { hanzi: '粤剧', pinyin: 'yuè jù', meaning: 'opéra cantonais', meaningEn: 'Cantonese opera', audio: 'audio/hsk6/hsk6_粤剧.wav' },
      { hanzi: '戏曲', pinyin: 'xì qǔ', meaning: 'opéra traditionnel', meaningEn: 'traditional opera', audio: 'audio/hsk5/hsk5_戏曲.wav' },
      { hanzi: '面具', pinyin: 'miàn jù', meaning: 'masque', meaningEn: 'mask', audio: 'audio/hsk5/hsk5_面具.wav' }
    ],
    tip:
      'Le 变脸 du 川剧 reste un secret de famille jalousement gardé : techniques transmises uniquement de maître à apprenti, jamais filmées en gros plan.',
    tipEn:
      '川剧\'s 变脸 remains a closely-guarded family secret: techniques passed only master-to-apprentice, never filmed in close-up.'
  }
];

// --- cecr-b22-arts-m6 — Architecture chinoise ---------------------------------
export const b22ArtsM6LearnSections: LessonV2LearnSection[] = [
  {
    id: 'b22-jianzhu',
    title: '四合院 et architecture traditionnelle',
    titleEn: '四合院 and traditional architecture',
    body:
      'Le 四合院 (« cour aux 4 ailes ») est la maison traditionnelle pékinoise : **4 bâtiments autour d\'une cour centrale**, symbole de la famille étendue chinoise.\n' +
      '\n' +
      'Éléments architecturaux iconiques :\n' +
      '- toits courbés 屋顶 avec tuiles 瓦\n' +
      '- portes rouges 红门\n' +
      '- lions de pierre 石狮子 (gardiens)\n' +
      '\n' +
      'Astuce : la **紫禁城** (Cité Interdite) est l\'extension impériale du même principe — 9 999 pièces autour de cours hiérarchisées. Le 四合院 a en grande partie disparu de Pékin avec les démolitions des années 90, mais reste classé patrimoine.',
    bodyEn:
      '四合院 (sìhéyuàn, «4-sided courtyard»): traditional Beijing house, 4 buildings around a central courtyard. Symbol of the Chinese extended family. Curved roofs 屋顶 (wūdǐng) with tiles 瓦 (wǎ). Red doors 红门 and stone lion guardians 石狮子. Largely lost in Beijing during 90s demolitions, but heritage-listed. The 紫禁城 (Forbidden City) is the imperial extension: 9,999 rooms around hierarchically-ordered courtyards.',
    items: [
      { hanzi: '四合院', pinyin: 'sì hé yuàn', meaning: 'maison à cour', meaningEn: 'courtyard house', audio: 'audio/hsk6/hsk6_四合院.wav' },
      { hanzi: '紫禁城', pinyin: 'zǐ jìn chéng', meaning: 'Cité Interdite', meaningEn: 'Forbidden City', audio: 'audio/hsk6/hsk6_紫禁城.wav' },
      { hanzi: '屋顶', pinyin: 'wū dǐng', meaning: 'toit', meaningEn: 'roof', audio: 'audio/hsk5/hsk5_屋顶.wav' },
      { hanzi: '瓦', pinyin: 'wǎ', meaning: 'tuile', meaningEn: 'tile', audio: 'audio/hsk6/hsk6_瓦.wav' },
      { hanzi: '石狮子', pinyin: 'shí shī zi', meaning: 'lion de pierre', meaningEn: 'stone lion', audio: 'audio/hsk6/hsk6_石狮子.wav' }
    ],
    tip:
      'Les couleurs sont codifiées : jaune réservé à l\'empereur (toits de la Cité Interdite), rouge pour la noblesse, vert pour les princes. Un toit de tuiles jaunes signale immédiatement le pouvoir impérial.',
    tipEn:
      'Colors were codified: yellow reserved for the emperor (Forbidden City roofs), red for nobility, green for princes. A yellow-tile roof immediately signals imperial power.'
  },
  {
    id: 'b22-modern-jianzhu',
    title: 'Architecture moderne : du gratte-ciel à la fusion',
    titleEn: 'Modern architecture: from skyscraper to fusion',
    body:
      'Boom architectural depuis les années 90 — la Chine devient un terrain d\'expérimentation mondial.\n' +
      '\n' +
      'Repères emblématiques :\n' +
      '- 上海 / 浦东 : 东方明珠 (Perle d\'Orient), 上海中心大厦 (Shanghai Tower, 632m, 2e plus haut du monde)\n' +
      '- 北京 : 鸟巢 (« nid d\'oiseau », stade JO 2008), 水立方 (« cube d\'eau »)\n' +
      '- Tendance fusion : 苏州博物馆 de I.M. Pei (贝聿铭), modernité + lignes du jardin classique\n' +
      '\n' +
      'Astuce : vocabulaire clé — **建筑师** (architecte), **摩天大楼** (gratte-ciel).',
    bodyEn:
      'Architectural boom since the 90s. Shanghai: 浦东 (Pudong) with 东方明珠 (Oriental Pearl), 上海中心大厦 (Shanghai Tower, 632m, world\'s 2nd-tallest). Beijing: 鸟巢 (Bird\'s Nest, 2008 Olympic stadium), 水立方 (Water Cube). «Fusion» trend: Suzhou Museum by I.M. Pei (贝聿铭), blending modernity with classical garden lines. Vocabulary: 建筑师 (architect), 摩天大楼 (skyscraper).',
    items: [
      { hanzi: '建筑', pinyin: 'jiàn zhù', meaning: 'architecture, bâtiment', meaningEn: 'architecture, building', audio: 'audio/hsk5/hsk5_建筑.wav' },
      { hanzi: '建筑师', pinyin: 'jiàn zhù shī', meaning: 'architecte', meaningEn: 'architect', audio: 'audio/hsk5/hsk5_建筑师.wav' },
      { hanzi: '摩天大楼', pinyin: 'mó tiān dà lóu', meaning: 'gratte-ciel', meaningEn: 'skyscraper', audio: 'audio/hsk6/hsk6_摩天大楼.wav' },
      { hanzi: '鸟巢', pinyin: 'niǎo cháo', meaning: 'nid d\'oiseau (stade)', meaningEn: 'Bird\'s Nest', audio: 'audio/hsk6/hsk6_鸟巢.wav' },
      { hanzi: '设计', pinyin: 'shè jì', meaning: 'design', meaningEn: 'design', audio: 'audio/hsk5/hsk5_设计.wav' }
    ],
    tip:
      'Pékin a ses « 5 monstres » architecturaux contemporains : CCTV (le « pantalon »), 鸟巢, 水立方, 国家大剧院 (« l\'œuf »), 大兴机场 (l\'étoile de mer). Chacun controversé mais devenu emblème.',
    tipEn:
      'Beijing has its «5 architectural monsters»: CCTV (the «trousers»), 鸟巢, 水立方, 国家大剧院 («the egg»), 大兴 airport (starfish). Each controversial but now emblematic.'
  }
];

// --- cecr-b22-arts-m7 — Artisanat : céramique, soie, jade --------------------
export const b22ArtsM7LearnSections: LessonV2LearnSection[] = [
  {
    id: 'b22-ciqi',
    title: '瓷器 — la céramique chinoise',
    titleEn: '瓷器 — Chinese porcelain',
    body:
      'Invention chinoise donnant son nom au pays en anglais (« china »). Capitale : **景德镇** au Jiangxi, qui produit depuis 1 000 ans. Argile 高岭土 (kaolin) cuite à 1 300°C.\n' +
      '\n' +
      'Styles iconiques :\n' +
      '- 青花 (bleu et blanc, dynastie Yuan)\n' +
      '- 粉彩 (polychrome, Qing)\n' +
      '- 釉里红 (rouge sous couverte)\n' +
      '\n' +
      'Astuce : très collectionnée — les pièces Ming/Qing peuvent atteindre des **millions** aux enchères.',
    bodyEn:
      '瓷器 (cíqì, porcelain): a Chinese invention giving the country its English name. Capital: 景德镇 (jǐng dé zhèn) in Jiangxi, producing for 1,000 years. Iconic styles: 青花 (blue and white, Yuan dynasty), 粉彩 (polychrome, Qing), 釉里红 (red under glaze). Process: 高岭土 (kaolin) clay fired at 1,300°C. Highly collected — Ming/Qing pieces can reach millions at auction.',
    items: [
      { hanzi: '瓷器', pinyin: 'cí qì', meaning: 'porcelaine', meaningEn: 'porcelain', audio: 'audio/hsk5/hsk5_瓷器.wav' },
      { hanzi: '青花', pinyin: 'qīng huā', meaning: 'bleu et blanc', meaningEn: 'blue and white', audio: 'audio/hsk6/hsk6_青花.wav' },
      { hanzi: '景德镇', pinyin: 'jǐng dé zhèn', meaning: 'Jingdezhen (capitale)', meaningEn: 'Jingdezhen (capital)', audio: 'audio/hsk6/hsk6_景德镇.wav' },
      { hanzi: '陶瓷', pinyin: 'táo cí', meaning: 'céramique', meaningEn: 'ceramics', audio: 'audio/hsk5/hsk5_陶瓷.wav' },
      { hanzi: '釉', pinyin: 'yòu', meaning: 'glaçure', meaningEn: 'glaze', audio: 'audio/hsk6/hsk6_釉.wav' }
    ],
    tip:
      'Astuce de connaisseur : un vrai 青花 Ming sonne « cristallin » quand on le tape légèrement. Les copies modernes sonnent sourd.',
    tipEn:
      'Connoisseur tip: a true Ming 青花 sounds «crystalline» when tapped lightly. Modern copies sound dull.'
  },
  {
    id: 'b22-sichou-yu',
    title: '丝绸 et 玉 : soie et jade',
    titleEn: '丝绸 and 玉: silk and jade',
    body:
      'Deux trésors textiles et minéraux qui ont façonné la culture chinoise.\n' +
      '\n' +
      '**丝绸 (soie)** : autre invention chinoise, gardée secrète **3 000 ans**. La 丝绸之路 (Route de la Soie) reliait Chang\'an (Xi\'an) à Rome. Centres actuels : Suzhou, Hangzhou.\n' +
      '\n' +
      '**玉 (jade)** : pierre sacrée chinoise, plus précieuse que l\'or. Considéré comme incarnation des **5 vertus confucéennes** :\n' +
      '- pureté 仁\n' +
      '- probité 义\n' +
      '- sagesse 智\n' +
      '- courage 勇\n' +
      '- propreté 洁\n' +
      '\n' +
      'Astuce : couleurs — 白玉 (blanc, le plus rare), 翠玉 (vert émeraude). Cadeau symbolique fort : 平安扣 (médaillon de jade pour la paix).',
    bodyEn:
      '丝绸 (silk): another Chinese invention, kept secret for 3,000 years. The 丝绸之路 (Silk Road) linked Chang\'an (Xi\'an) to Rome. Current centers: Suzhou, Hangzhou. 玉 (jade): a sacred Chinese stone, more precious than gold. Considered embodiment of 5 Confucian virtues: purity 仁, integrity 义, wisdom 智, courage 勇, cleanness 洁. Colors: 白玉 (white jade, rarest), 翠玉 (emerald green). Strong symbolic gift: 平安扣 (jade peace medallion).',
    items: [
      { hanzi: '丝绸', pinyin: 'sī chóu', meaning: 'soie', meaningEn: 'silk', audio: 'audio/hsk5/hsk5_丝绸.wav' },
      { hanzi: '玉', pinyin: 'yù', meaning: 'jade', meaningEn: 'jade', audio: 'audio/hsk5/hsk5_玉.wav' },
      { hanzi: '丝绸之路', pinyin: 'sī chóu zhī lù', meaning: 'Route de la Soie', meaningEn: 'Silk Road', audio: 'audio/hsk6/hsk6_丝绸之路.wav' },
      { hanzi: '白玉', pinyin: 'bái yù', meaning: 'jade blanc', meaningEn: 'white jade', audio: 'audio/hsk6/hsk6_白玉.wav' },
      { hanzi: '翡翠', pinyin: 'fěi cuì', meaning: 'jadéite verte', meaningEn: 'emerald jade', audio: 'audio/hsk6/hsk6_翡翠.wav' }
    ],
    tip:
      'Offrir du jade à un Chinois est un geste très chargé positivement. Évite par contre d\'en offrir cassé ou ébréché : très mauvais augure (le jade « protège » son porteur, casser = la protection est rompue).',
    tipEn:
      'Gifting jade to a Chinese person is a strongly positive gesture. But never offer it cracked or chipped: very bad omen (jade «protects» its wearer, breaking = protection broken).'
  }
];

// --- cecr-b22-health-m4 — Sport et activité physique --------------------------
export const b22HealthM4LearnSections: LessonV2LearnSection[] = [
  {
    id: 'b22-yundong',
    title: '运动 — le vocabulaire du sport',
    titleEn: '运动 — sports vocabulary',
    body:
      'Sports populaires en Chine :\n' +
      '- 篮球 (basket — la NBA est culte)\n' +
      '- 足球 (foot)\n' +
      '- 乒乓球 (ping-pong, sport national)\n' +
      '- 羽毛球 (badminton, très pratiqué)\n' +
      '\n' +
      'Vocabulaire de la salle : 健身房 (gym), 跑步机 (tapis de course). Verbes clés : **锻炼** (faire du sport), 出汗 (transpirer), 放松 (se détendre).\n' +
      '\n' +
      'Astuce : phrase utile — 我每周锻炼三次 = je fais du sport 3 fois par semaine.',
    bodyEn:
      'Popular sports: 篮球 (basketball — NBA is huge), 足球 (soccer), 乒乓球 (ping-pong, national sport), 羽毛球 (badminton, widely played). Indoor: 健身房 (gym), 跑步机 (treadmill). Key verbs: 锻炼 (exercise, work out), 出汗 (sweat), 放松 (relax). Useful phrase: 我每周锻炼三次 = I work out 3 times a week.',
    items: [
      { hanzi: '锻炼', pinyin: 'duàn liàn', meaning: 'faire du sport', meaningEn: 'exercise', audio: 'audio/hsk3/hsk3_锻炼.wav' },
      { hanzi: '健身房', pinyin: 'jiàn shēn fáng', meaning: 'salle de gym', meaningEn: 'gym', audio: 'audio/hsk5/hsk5_健身房.wav' },
      { hanzi: '篮球', pinyin: 'lán qiú', meaning: 'basket', meaningEn: 'basketball', audio: 'audio/hsk2/hsk2_篮球.wav' },
      { hanzi: '乒乓球', pinyin: 'pīng pāng qiú', meaning: 'ping-pong', meaningEn: 'ping-pong', audio: 'audio/hsk4/hsk4_乒乓球.wav' },
      { hanzi: '出汗', pinyin: 'chū hàn', meaning: 'transpirer', meaningEn: 'sweat', audio: 'audio/hsk5/hsk5_出汗.wav' }
    ],
    tip:
      'Demander « tu fais du sport ? » à un Chinois sonne souvent comme « tu vas à la salle ? » — l\'idée d\'exercice physique régulier 锻炼 est plus présente que celle d\'un sport de compétition.',
    tipEn:
      'Asking «do you do sport?» to a Chinese person often means «do you go to the gym?» — the idea of regular exercise 锻炼 is more present than competitive sport.'
  },
  {
    id: 'b22-yundong-shoushang',
    title: 'Blessures et récupération',
    titleEn: 'Injuries and recovery',
    body:
      'Lexique de la santé sportive — blessures :\n' +
      '- 受伤 (se blesser)\n' +
      '- 扭伤 (entorse)\n' +
      '- 拉伤 (claquage)\n' +
      '- 肌肉酸痛 (courbatures)\n' +
      '\n' +
      'Lexique de la récupération :\n' +
      '- 休息 (se reposer)\n' +
      '- 冰敷 (glace)\n' +
      '- 按摩 (massage)\n' +
      '- 热身 (échauffement)\n' +
      '- 拉伸 (étirements)\n' +
      '\n' +
      'Astuce : la culture chinoise du sport intègre beaucoup la **récupération douce** (taichi, massage, médecine traditionnelle). Phrase typique : 我跑步的时候扭伤了脚踝.',
    bodyEn:
      'Sports health vocab: 受伤 (get injured), 扭伤 (sprain), 拉伤 (strain), 肌肉酸痛 (sore muscles). Recovery: 休息 (rest), 冰敷 (ice), 按摩 (massage), 热身 (warm-up), 拉伸 (stretching). Typical phrase: 我跑步的时候扭伤了脚踝 = I sprained my ankle while running. Chinese sports culture integrates gentle recovery (tai chi, massage, traditional medicine).',
    items: [
      { hanzi: '受伤', pinyin: 'shòu shāng', meaning: 'se blesser', meaningEn: 'get injured', audio: 'audio/hsk4/hsk4_受伤.wav' },
      { hanzi: '扭伤', pinyin: 'niǔ shāng', meaning: 'entorse', meaningEn: 'sprain', audio: 'audio/hsk5/hsk5_扭伤.wav' },
      { hanzi: '热身', pinyin: 'rè shēn', meaning: 'échauffement', meaningEn: 'warm-up', audio: 'audio/hsk5/hsk5_热身.wav' },
      { hanzi: '按摩', pinyin: 'àn mó', meaning: 'massage', meaningEn: 'massage', audio: 'audio/hsk4/hsk4_按摩.wav' },
      { hanzi: '休息', pinyin: 'xiū xi', meaning: 'se reposer', meaningEn: 'rest', audio: 'audio/hsk2/hsk2_休息.wav' }
    ],
    tip:
      'Si tu te blesses en Chine et qu\'on te propose 推拿 (tuīná), c\'est du massage thérapeutique TCM ; 按摩 (ànmó) seul peut être plus généraliste (relaxation).',
    tipEn:
      'If you get injured in China and someone offers 推拿 (tuīná), it\'s TCM therapeutic massage; plain 按摩 (ànmó) can be more general (relaxation).'
  }
];

// --- cecr-b22-health-m5 — Nutrition et alimentation équilibrée ----------------
export const b22HealthM5LearnSections: LessonV2LearnSection[] = [
  {
    id: 'b22-yingyang',
    title: '营养 — nutrition et alimentation',
    titleEn: '营养 — nutrition and diet',
    body:
      'Concept central : **均衡饮食** (alimentation équilibrée). En Chine, l\'idée d\'aliments « chauds/froids » (热性/凉性) issus de la TCM coexiste avec la nutrition occidentale.\n' +
      '\n' +
      'Cinq familles d\'aliments :\n' +
      '- 蛋白质 (protéines)\n' +
      '- 碳水化合物 (glucides, souvent abrégé 碳水)\n' +
      '- 脂肪 (lipides)\n' +
      '- 维生素 (vitamines)\n' +
      '- 矿物质 (minéraux)\n' +
      '\n' +
      'Astuce : **上火** (« monter en feu ») = excès d\'aliments chauds → bouton, mal de gorge.',
    bodyEn:
      '营养 (yíngyǎng, nutrition): central concept. 均衡饮食 (balanced diet). Food families: 蛋白质 (proteins), 碳水化合物 (carbs — often shortened to 碳水), 脂肪 (fats), 维生素 (vitamins), 矿物质 (minerals). In China, the TCM idea of «hot/cold» foods (热性/凉性) coexists with Western nutrition. 上火 (shànghuǒ, «going on fire») = excess of hot foods → pimple, sore throat.',
    items: [
      { hanzi: '营养', pinyin: 'yíng yǎng', meaning: 'nutrition', meaningEn: 'nutrition', audio: 'audio/hsk4/hsk4_营养.wav' },
      { hanzi: '均衡', pinyin: 'jūn héng', meaning: 'équilibré', meaningEn: 'balanced', audio: 'audio/hsk6/hsk6_均衡.wav' },
      { hanzi: '蛋白质', pinyin: 'dàn bái zhì', meaning: 'protéine', meaningEn: 'protein', audio: 'audio/hsk5/hsk5_蛋白质.wav' },
      { hanzi: '维生素', pinyin: 'wéi shēng sù', meaning: 'vitamine', meaningEn: 'vitamin', audio: 'audio/hsk5/hsk5_维生素.wav' },
      { hanzi: '上火', pinyin: 'shàng huǒ', meaning: 'excès de chaleur (TCM)', meaningEn: 'excess heat (TCM)', audio: 'audio/hsk5/hsk5_上火.wav' }
    ],
    tip:
      '上火 est un concept que tout Chinois utilise au quotidien. Si tu manges trop épicé, frit ou de mangues : « 你上火了 ». La réponse ? Boire du thé chrysanthème 菊花茶 ou de la 凉茶 (boissons « froides »).',
    tipEn:
      '上火 is used daily by every Chinese person. Eat too spicy, fried or mangoes: «你上火了». The fix? Chrysanthemum tea 菊花茶 or 凉茶 («cool drink»).'
  },
  {
    id: 'b22-jianfei',
    title: 'Régime, jeûne, mode de vie',
    titleEn: 'Diet, fasting, lifestyle',
    body:
      '**减肥** (perdre du poids) est un sujet immense en Chine, surtout chez les jeunes femmes. Vocabulaire de base : 节食 (se priver), 间歇性禁食 (jeûne intermittent — concept importé), 健身餐 (repas fitness).\n' +
      '\n' +
      'Tendances alimentaires :\n' +
      '- 低碳水 (low-carb)\n' +
      '- 纯素 (vegan)\n' +
      '- 素食 (végétarien)\n' +
      '\n' +
      'Attention : le rebound — **报复性饮食** (manger compulsivement après un régime). Phrase utile : 我在减肥，少吃点.',
    bodyEn:
      '减肥 (jiǎnféi, lose weight): a huge topic in China, especially among young women. 节食 (deprive yourself), 间歇性禁食 (intermittent fasting — imported concept), 健身餐 (fitness meal). Trends: low-carb 低碳水, vegan 纯素, vegetarian 素食. But also the rebound: «报复性饮食» (compulsive eating after a diet). Useful phrase: 我在减肥，少吃点 = I\'m on a diet, I eat little.',
    items: [
      { hanzi: '减肥', pinyin: 'jiǎn féi', meaning: 'perdre du poids', meaningEn: 'lose weight', audio: 'audio/hsk4/hsk4_减肥.wav' },
      { hanzi: '节食', pinyin: 'jié shí', meaning: 'se restreindre', meaningEn: 'restrict diet', audio: 'audio/hsk5/hsk5_节食.wav' },
      { hanzi: '素食', pinyin: 'sù shí', meaning: 'végétarien', meaningEn: 'vegetarian', audio: 'audio/hsk5/hsk5_素食.wav' },
      { hanzi: '健身', pinyin: 'jiàn shēn', meaning: 'fitness', meaningEn: 'fitness', audio: 'audio/hsk5/hsk5_健身.wav' },
      { hanzi: '热量', pinyin: 'rè liàng', meaning: 'calorie', meaningEn: 'calorie', audio: 'audio/hsk5/hsk5_热量.wav' }
    ],
    tip:
      'Sujet sensible : commenter le poids (« tu as grossi/maigri ») reste très fréquent en Chine, surtout en famille. Pas malveillant culturellement, mais peut blesser une personne occidentale.',
    tipEn:
      'Sensitive topic: commenting on weight («you\'ve gained/lost weight») is still common in China, especially in family. Not malicious culturally, but can hurt Western sensibilities.'
  }
];

// --- cecr-b22-health-m6 — Santé mentale et stress -----------------------------
export const b22HealthM6LearnSections: LessonV2LearnSection[] = [
  {
    id: 'b22-xinli',
    title: '心理健康 — santé mentale',
    titleEn: '心理健康 — mental health',
    body:
      'Sujet longtemps **tabou** en Chine, qui s\'ouvre depuis 2010. 心理咨询 (consultation psy) reste rare mais en hausse, surtout dans les grandes villes.\n' +
      '\n' +
      'Vocabulaire clinique :\n' +
      '- 抑郁症 (dépression)\n' +
      '- 焦虑 (anxiété)\n' +
      '- 失眠 (insomnie)\n' +
      '- 压力大 (beaucoup de pression)\n' +
      '\n' +
      'Astuce : une nouvelle génération parle plus librement de **内卷** (« involution », surcompétition épuisante) et **躺平** (« rester allongé », refuser la pression).',
    bodyEn:
      '心理健康 (mental health): long taboo in China, opening up since 2010. 抑郁症 (depression), 焦虑 (anxiety), 失眠 (insomnia), 压力大 (high pressure). 心理咨询 (psy consultation) remains rare but growing, especially in big cities. A new generation speaks more openly of 内卷 («involution», exhausting hyper-competition) and 躺平 («lying flat», refusing pressure).',
    items: [
      { hanzi: '心理', pinyin: 'xīn lǐ', meaning: 'psychologie', meaningEn: 'psychology', audio: 'audio/hsk4/hsk4_心理.wav' },
      { hanzi: '抑郁', pinyin: 'yì yù', meaning: 'dépression', meaningEn: 'depression', audio: 'audio/hsk6/hsk6_抑郁.wav' },
      { hanzi: '焦虑', pinyin: 'jiāo lǜ', meaning: 'anxiété', meaningEn: 'anxiety', audio: 'audio/hsk6/hsk6_焦虑.wav' },
      { hanzi: '失眠', pinyin: 'shī mián', meaning: 'insomnie', meaningEn: 'insomnia', audio: 'audio/hsk5/hsk5_失眠.wav' },
      { hanzi: '压力', pinyin: 'yā lì', meaning: 'pression, stress', meaningEn: 'pressure, stress', audio: 'audio/hsk4/hsk4_压力.wav' }
    ],
    tip:
      '内卷 et 躺平 sont devenus des memes générationnels. Comprendre ces deux mots = comprendre la Chine urbaine post-2020 (jeunes diplômés débordés / qui décrochent).',
    tipEn:
      '内卷 and 躺平 have become generational memes. Understanding these two words = understanding post-2020 urban China (overwhelmed graduates / those who drop out).'
  },
  {
    id: 'b22-fangsong',
    title: 'Stratégies de gestion du stress',
    titleEn: 'Stress management strategies',
    body:
      'Vocabulaire de la régulation émotionnelle : **放松** (se détendre), 冥想 (méditer), 深呼吸 (respiration profonde), 倾诉 (se confier).\n' +
      '\n' +
      'Activités déstressantes typiques en Chine :\n' +
      '- 茶 (boire du thé)\n' +
      '- 太极 (tai chi)\n' +
      '- 散步 (marche)\n' +
      '- 写日记 (journal intime)\n' +
      '\n' +
      'Astuce : phrases utiles — 我最近压力很大，需要放松. Demander : 你最近怎么样？睡得好吗？',
    bodyEn:
      'Useful vocab: 放松 (relax), 冥想 (meditate), 深呼吸 (deep breath), 倾诉 (confide). Destressing activities in China: 茶 (drinking tea), 太极 (tai chi), 散步 (walking), 写日记 (journaling). Useful phrase: 我最近压力很大，需要放松 = I\'m very stressed lately, I need to relax. Ask: 你最近怎么样？睡得好吗？= how have you been? Sleeping well?',
    items: [
      { hanzi: '放松', pinyin: 'fàng sōng', meaning: 'se détendre', meaningEn: 'relax', audio: 'audio/hsk4/hsk4_放松.wav' },
      { hanzi: '冥想', pinyin: 'míng xiǎng', meaning: 'méditer', meaningEn: 'meditate', audio: 'audio/hsk6/hsk6_冥想.wav' },
      { hanzi: '深呼吸', pinyin: 'shēn hū xī', meaning: 'respiration profonde', meaningEn: 'deep breath', audio: 'audio/hsk5/hsk5_深呼吸.wav' },
      { hanzi: '倾诉', pinyin: 'qīng sù', meaning: 'se confier', meaningEn: 'confide', audio: 'audio/hsk6/hsk6_倾诉.wav' },
      { hanzi: '调节', pinyin: 'tiáo jié', meaning: 'réguler', meaningEn: 'regulate', audio: 'audio/hsk5/hsk5_调节.wav' }
    ],
    tip:
      'Demander « 你需要倾诉吗？» (« tu as besoin de te confier ? ») à un proche stressé est très bien reçu. Plus chaleureux que « 你怎么了 ? » qui peut sembler intrusif.',
    tipEn:
      'Asking «你需要倾诉吗？» («do you need to confide?») to a stressed friend is well received. Warmer than «你怎么了？» which can feel intrusive.'
  }
];

// --- cecr-b22-health-m7 — Vieillissement et 3e âge ----------------------------
export const b22HealthM7LearnSections: LessonV2LearnSection[] = [
  {
    id: 'b22-laoren',
    title: '老龄化 — la Chine vieillissante',
    titleEn: '老龄化 — aging China',
    body:
      '**老龄化社会** (société vieillissante) : défi majeur pour la Chine. Politique de l\'enfant unique (1979-2015) → 4-2-1 (4 grands-parents, 2 parents, 1 enfant). Les enfants ont la responsabilité culturelle **孝** (piété filiale) de s\'occuper de leurs parents. 养老院 (maison de retraite) reste mal vu mais se développe.\n' +
      '\n' +
      'Vocabulaire santé du 3e âge :\n' +
      '- 老花眼 (presbytie)\n' +
      '- 高血压 (hypertension)\n' +
      '- 糖尿病 (diabète)',
    bodyEn:
      '老龄化社会 (aging society): a major challenge for China. 老人 (elderly), 退休 (retirement). One-child policy (1979-2015) → 4-2-1 (4 grandparents, 2 parents, 1 child). Children carry the cultural duty 孝 (xiào, filial piety) of caring for parents. 养老院 (retirement home) still frowned upon but growing. Health vocab: 老花眼 (presbyopia), 高血压 (hypertension), 糖尿病 (diabetes).',
    items: [
      { hanzi: '老龄化', pinyin: 'lǎo líng huà', meaning: 'vieillissement', meaningEn: 'aging', audio: 'audio/hsk6/hsk6_老龄化.wav' },
      { hanzi: '退休', pinyin: 'tuì xiū', meaning: 'retraite', meaningEn: 'retirement', audio: 'audio/hsk4/hsk4_退休.wav' },
      { hanzi: '孝顺', pinyin: 'xiào shùn', meaning: 'piété filiale', meaningEn: 'filial piety', audio: 'audio/hsk5/hsk5_孝顺.wav' },
      { hanzi: '养老院', pinyin: 'yǎng lǎo yuàn', meaning: 'maison de retraite', meaningEn: 'retirement home', audio: 'audio/hsk6/hsk6_养老院.wav' },
      { hanzi: '高血压', pinyin: 'gāo xuè yā', meaning: 'hypertension', meaningEn: 'hypertension', audio: 'audio/hsk5/hsk5_高血压.wav' }
    ],
    tip:
      'Dire d\'un ami « 你很孝顺 » est un compliment fort qui honore son éducation. À l\'inverse, 不孝 (búxiào) reste l\'une des pires accusations sociales.',
    tipEn:
      'Saying «你很孝顺» to a friend is a strong compliment honoring their upbringing. Conversely, 不孝 (unfilial) remains one of the worst social accusations.'
  },
  {
    id: 'b22-yanglao',
    title: 'Quotidien des retraités urbains',
    titleEn: 'Urban retirees\' daily life',
    body:
      'Les retraités chinois urbains ont une **vie sociale dense**, structurée autour de quelques rituels collectifs.\n' +
      '\n' +
      'Activités phares :\n' +
      '- 广场舞 (danse de place publique) — phénomène national, 100M de pratiquants, source de tensions de bruit\n' +
      '- 公园 — taichi, mahjong 麻将, chant en groupe\n' +
      '- 带孙子 (garder les petits-enfants) — les grands-parents prennent souvent le relais des parents qui travaillent\n' +
      '\n' +
      'Astuce : les **广场舞大妈** (« tatas de la place ») sont devenues un meme sociologique — énergiques, organisées, parfois redoutées.',
    bodyEn:
      'Chinese urban retirees have dense social lives. 广场舞 (square dance) — a national phenomenon, 100M practitioners, source of noise tensions. 公园 (park) — tai chi, mahjong 麻将, group singing. 带孙子 (look after grandchildren) — key role: grandparents often take over from working parents. 广场舞大妈 («square aunties») have become a sociological meme: energetic, organized, sometimes feared.',
    items: [
      { hanzi: '广场舞', pinyin: 'guǎng chǎng wǔ', meaning: 'danse de place', meaningEn: 'square dance', audio: 'audio/hsk6/hsk6_广场舞.wav' },
      { hanzi: '公园', pinyin: 'gōng yuán', meaning: 'parc', meaningEn: 'park', audio: 'audio/hsk3/hsk3_公园.wav' },
      { hanzi: '麻将', pinyin: 'má jiàng', meaning: 'mahjong', meaningEn: 'mahjong', audio: 'audio/hsk5/hsk5_麻将.wav' },
      { hanzi: '孙子', pinyin: 'sūn zi', meaning: 'petit-fils', meaningEn: 'grandson', audio: 'audio/hsk4/hsk4_孙子.wav' },
      { hanzi: '退休金', pinyin: 'tuì xiū jīn', meaning: 'pension', meaningEn: 'pension', audio: 'audio/hsk6/hsk6_退休金.wav' }
    ],
    tip:
      'Si tu visites Pékin tôt le matin (6h-7h), va dans un parc : tu verras des centaines de retraités faire taichi, calligraphie sur dalles avec de l\'eau, danse en couple. C\'est culturel à observer.',
    tipEn:
      'If you visit Beijing early morning (6-7am), go to a park: you\'ll see hundreds of retirees doing tai chi, water-calligraphy on slabs, ballroom dance. A must-see cultural scene.'
  }
];

// --- cecr-b22-debate-m4 — Comparer et opposer ---------------------------------
export const b22DebateM4LearnSections: LessonV2LearnSection[] = [
  {
    id: 'b22-bijiao',
    title: 'Comparer : 相比 / 比起来 / 与…相比',
    titleEn: 'Compare: 相比 / 比起来 / 与…相比',
    body:
      'Pour comparer en argumentation B2, trois connecteurs essentiels :\n' +
      '- 相比之下 (par comparaison)\n' +
      '- 比起来 (en comparaison)\n' +
      '- 与 X 相比 (comparé à X — soutenu)\n' +
      '\n' +
      'Exemple : 与传统教育相比，在线课程更灵活 (comparé à l\'enseignement classique, les cours en ligne sont plus flexibles).\n' +
      '\n' +
      'Attention : distinction avec le simple 比 (X 比 Y 高) — 相比/与…相比 introduit toute une **proposition** comparée, pas juste deux items.',
    bodyEn:
      'To compare in B2 argumentation: 相比之下 (in comparison), 比起来 (compared with), 与 X 相比 (compared to X — formal). Example: 与传统教育相比，在线课程更灵活 = compared to traditional education, online classes are more flexible. Distinction from simple 比 (X 比 Y high): 相比/与…相比 introduces a whole COMPARED CLAUSE, not just two items.',
    items: [
      { hanzi: '相比', pinyin: 'xiāng bǐ', meaning: 'comparer', meaningEn: 'compare', audio: 'audio/hsk5/hsk5_相比.wav' },
      { hanzi: '相比之下', pinyin: 'xiāng bǐ zhī xià', meaning: 'par comparaison', meaningEn: 'in comparison', audio: 'audio/hsk6/hsk6_相比之下.wav' },
      { hanzi: '传统', pinyin: 'chuán tǒng', meaning: 'traditionnel', meaningEn: 'traditional', audio: 'audio/hsk4/hsk4_传统.wav' },
      { hanzi: '灵活', pinyin: 'líng huó', meaning: 'flexible', meaningEn: 'flexible', audio: 'audio/hsk4/hsk4_灵活.wav' },
      { hanzi: '区别', pinyin: 'qū bié', meaning: 'différence', meaningEn: 'difference', audio: 'audio/hsk4/hsk4_区别.wav' }
    ],
    tip:
      '与 X 相比 est une formule de l\'écrit académique. À l\'oral spontané, 跟 X 比起来 est plus naturel.',
    tipEn:
      '与 X 相比 is academic writing. In spontaneous speech, 跟 X 比起来 is more natural.'
  },
  {
    id: 'b22-duibi',
    title: 'Opposer : 相反 / 反之 / 然而',
    titleEn: 'Oppose: 相反 / 反之 / 然而',
    body:
      'Trois connecteurs d\'opposition selon la **force croissante** 不过 < 但是 < 然而 < 相反 :\n' +
      '- 相反 (au contraire) : opposition forte — 我以为他会拒绝，相反，他立刻同意了\n' +
      '- 反之 (à l\'inverse, soutenu) : très utilisé à l\'écrit\n' +
      '- 然而 (cependant) : opposition + concession — 这个方案很好，然而成本太高\n' +
      '\n' +
      'Astuce : 相反 = surprise/retournement, 反之 = symétrie logique, 然而 = bémol mesuré.',
    bodyEn:
      '相反 (xiāngfǎn, on the contrary) introduces strong opposition. 我以为他会拒绝，相反，他立刻同意了 = I thought he\'d refuse, on the contrary he agreed immediately. 反之 (fǎn zhī, conversely — formal) heavily used in writing. 然而 (rán\'ér, however) opposition + concession. 这个方案很好，然而成本太高 = this plan is good, however the cost is too high. Increasing force: 不过 < 但是 < 然而 < 相反.',
    items: [
      { hanzi: '相反', pinyin: 'xiāng fǎn', meaning: 'au contraire', meaningEn: 'on the contrary', audio: 'audio/hsk4/hsk4_相反.wav' },
      { hanzi: '反之', pinyin: 'fǎn zhī', meaning: 'à l\'inverse', meaningEn: 'conversely', audio: 'audio/hsk6/hsk6_反之.wav' },
      { hanzi: '然而', pinyin: 'rán ér', meaning: 'cependant', meaningEn: 'however', audio: 'audio/hsk4/hsk4_然而.wav' },
      { hanzi: '拒绝', pinyin: 'jù jué', meaning: 'refuser', meaningEn: 'refuse', audio: 'audio/hsk4/hsk4_拒绝.wav' },
      { hanzi: '成本', pinyin: 'chéng běn', meaning: 'coût', meaningEn: 'cost', audio: 'audio/hsk5/hsk5_成本.wav' }
    ],
    tip:
      'Dans un essai, alterne 然而 et 不过 pour ne pas répéter. 反之 est très spécialisé : surtout dans les démonstrations logiques (« si X alors Y, à l\'inverse… »).',
    tipEn:
      'In an essay, alternate 然而 and 不过 to avoid repetition. 反之 is highly specialized: mostly in logical demonstrations («if X then Y, conversely…»).'
  }
];

// --- cecr-b22-debate-m5 — Donner des exemples / cas concrets ------------------
export const b22DebateM5LearnSections: LessonV2LearnSection[] = [
  {
    id: 'b22-juli',
    title: 'Illustrer : 例如 / 比如 / 譬如 / 拿…来说',
    titleEn: 'Illustrate: 例如 / 比如 / 譬如 / 拿…来说',
    body:
      'Quatre formules pour illustrer un argument, gradées par registre :\n' +
      '- 例如 (par exemple — neutre)\n' +
      '- 比如说 (comme par exemple — oral)\n' +
      '- 譬如 (par exemple — soutenu, livresque)\n' +
      '- 拿 X 来说 (prenons X)\n' +
      '\n' +
      'Exemple : 拿北京来说，房价已经太高了 (prenons Pékin, les prix de l\'immobilier sont déjà trop élevés).\n' +
      '\n' +
      'Astuce : la structure **拿…来说** cible un cas particulier qui illustre une tendance générale.',
    bodyEn:
      'To illustrate an argument: 例如 (for example — neutral), 比如说 (like for example — spoken), 譬如 (for instance — formal, literary), 拿 X 来说 (take X). Example: 拿北京来说，房价已经太高了 = take Beijing, real estate prices are already too high. The 拿…来说 structure targets a specific case illustrating a general trend.',
    items: [
      { hanzi: '例如', pinyin: 'lì rú', meaning: 'par exemple', meaningEn: 'for example', audio: 'audio/hsk5/hsk5_例如.wav' },
      { hanzi: '譬如', pinyin: 'pì rú', meaning: 'par exemple (soutenu)', meaningEn: 'for instance (formal)', audio: 'audio/hsk6/hsk6_譬如.wav' },
      { hanzi: '比如说', pinyin: 'bǐ rú shuō', meaning: 'comme par exemple', meaningEn: 'like for instance', audio: 'audio/hsk3/hsk3_比如.wav' },
      { hanzi: '房价', pinyin: 'fáng jià', meaning: 'prix immobilier', meaningEn: 'housing prices', audio: 'audio/hsk5/hsk5_房价.wav' },
      { hanzi: '案例', pinyin: 'àn lì', meaning: 'cas, exemple', meaningEn: 'case, example', audio: 'audio/hsk5/hsk5_案例.wav' }
    ],
    tip:
      'En oral, ne dis JAMAIS 譬如 (te fait passer pour pédant). En écrit, 譬如 est élégant. Règle : 比如 partout, 例如 dans des contextes formels, 譬如 réservé à l\'écrit littéraire.',
    tipEn:
      'In speech, NEVER say 譬如 (sounds pedantic). In writing, 譬如 is elegant. Rule: 比如 everywhere, 例如 in formal contexts, 譬如 reserved for literary writing.'
  },
  {
    id: 'b22-shuju',
    title: 'Citer des données et chiffres',
    titleEn: 'Citing data and numbers',
    body:
      'Pour ancrer un argument dans le concret, quatre formules d\'attribution :\n' +
      '- 据 (selon)\n' +
      '- 据统计 (selon les statistiques)\n' +
      '- 数据显示 (les données montrent)\n' +
      '- 调查表明 (l\'enquête révèle)\n' +
      '\n' +
      'Construction : **据 + source + 报道/介绍** = selon X. 据新华社报道 = selon l\'agence Xinhua.\n' +
      '\n' +
      'Astuce : vocabulaire chiffres — 百分比 (pourcentage), 比例 (proportion), 增长 (croissance), 下降 (baisse). Phrase : 据统计，去年 GDP 增长了 5.2%.',
    bodyEn:
      'To anchor an argument in fact: 据 (according to), 据统计 (according to statistics), 数据显示 (data show), 调查表明 (survey reveals). 据 + source + 报道/介绍 = according to X. 据新华社报道 = according to Xinhua agency. Number vocab: 百分比 (percentage), 比例 (proportion), 增长 (growth), 下降 (decline). Phrase: 据统计，去年 GDP 增长了 5.2% = per statistics, GDP grew 5.2% last year.',
    items: [
      { hanzi: '据', pinyin: 'jù', meaning: 'selon', meaningEn: 'according to', audio: 'audio/hsk5/hsk5_据.wav' },
      { hanzi: '统计', pinyin: 'tǒng jì', meaning: 'statistique', meaningEn: 'statistics', audio: 'audio/hsk5/hsk5_统计.wav' },
      { hanzi: '数据', pinyin: 'shù jù', meaning: 'données', meaningEn: 'data', audio: 'audio/hsk5/hsk5_数据.wav' },
      { hanzi: '显示', pinyin: 'xiǎn shì', meaning: 'montrer', meaningEn: 'show, display', audio: 'audio/hsk4/hsk4_显示.wav' },
      { hanzi: '调查', pinyin: 'diào chá', meaning: 'enquête', meaningEn: 'survey, investigation', audio: 'audio/hsk5/hsk5_调查.wav' }
    ],
    tip:
      'Pour gagner en crédibilité dans un débat formel chinois, cite TOUJOURS la source : « 据X日报报道 ». Sans source, l\'argument paraît subjectif.',
    tipEn:
      'To gain credibility in formal Chinese debate, ALWAYS cite the source: «据X日报报道». Without a source, the argument feels subjective.'
  }
];

// --- cecr-b22-debate-m6 — Cause / conséquence ---------------------------------
export const b22DebateM6LearnSections: LessonV2LearnSection[] = [
  {
    id: 'b22-yinguo',
    title: 'Causes : 由于 / 因为 / 之所以…是因为',
    titleEn: 'Causes: 由于 / 因为 / 之所以…是因为',
    body:
      'Trois marqueurs de cause selon le **registre** :\n' +
      '- 由于 (du fait que — soutenu)\n' +
      '- 因为 (parce que — neutre)\n' +
      '- 之所以…是因为 (si… c\'est parce que — emphatique, inversé)\n' +
      '\n' +
      'Exemples :\n' +
      '- 由于天气恶劣，航班取消了 (en raison du mauvais temps, le vol est annulé)\n' +
      '- 之所以失败，是因为准备不足 (si nous avons échoué, c\'est par manque de préparation)\n' +
      '\n' +
      'Astuce : la structure inversée **之所以** met l\'accent sur le résultat avant d\'expliquer la cause — très oratoire.',
    bodyEn:
      'To express a cause at B2: 由于 (due to — formal), 因为 (because — neutral), 之所以…是因为 (the reason… is that — emphatic). 由于天气恶劣，航班取消了 = due to bad weather, the flight is canceled. 之所以失败，是因为准备不足 = the reason we failed is insufficient preparation. The inverted 之所以 structure highlights the result before explaining the cause: very oratorical.',
    items: [
      { hanzi: '由于', pinyin: 'yóu yú', meaning: 'du fait que', meaningEn: 'due to', audio: 'audio/hsk4/hsk4_由于.wav' },
      { hanzi: '之所以', pinyin: 'zhī suǒ yǐ', meaning: 'la raison pour laquelle', meaningEn: 'the reason why', audio: 'audio/hsk5/hsk5_之所以.wav' },
      { hanzi: '恶劣', pinyin: 'è liè', meaning: 'mauvais (conditions)', meaningEn: 'severe, bad', audio: 'audio/hsk5/hsk5_恶劣.wav' },
      { hanzi: '航班', pinyin: 'háng bān', meaning: 'vol (avion)', meaningEn: 'flight', audio: 'audio/hsk5/hsk5_航班.wav' },
      { hanzi: '原因', pinyin: 'yuán yīn', meaning: 'cause, raison', meaningEn: 'cause, reason', audio: 'audio/hsk4/hsk4_原因.wav' }
    ],
    tip:
      '之所以 X 是因为 Y est une formule très efficace pour ouvrir une démonstration : tu énonces la conclusion, puis tu expliques. Très utilisé en rhétorique politique et juridique.',
    tipEn:
      '之所以 X 是因为 Y is a very effective formula to open a demonstration: state the conclusion, then explain. Heavily used in political and legal rhetoric.'
  },
  {
    id: 'b22-jieguo',
    title: 'Conséquences : 因此 / 所以 / 因而 / 从而',
    titleEn: 'Consequences: 因此 / 所以 / 因而 / 从而',
    body:
      'Quatre marqueurs de conséquence selon la **hiérarchie de registre** 所以 (oral) < 因此 (mixte) < 因而/从而 (écrit) :\n' +
      '- 所以 (donc — neutre)\n' +
      '- 因此 (par conséquent — soutenu)\n' +
      '- 因而 (de ce fait — formel)\n' +
      '- 从而 (et par là — soutenu, marque enchaînement logique)\n' +
      '\n' +
      'Astuce : 从而 introduit souvent une **conséquence positive** ou un objectif atteint — 减少了开支，从而提高了利润 (on a réduit les coûts, et ainsi augmenté les bénéfices). 因而 est plus neutre.',
    bodyEn:
      '因此 (yīncǐ, therefore — formal), 所以 (suǒyǐ, so — neutral), 因而 (yīn\'ér, hence — formal), 从而 (cóng\'ér, thereby — formal, marks logical sequence). 从而 often introduces a positive consequence or achieved goal: 减少了开支，从而提高了利润 = we cut spending, thereby boosting profits. 因而 is more neutral. Hierarchy: 所以 (oral) < 因此 (mixed) < 因而/从而 (written).',
    items: [
      { hanzi: '因此', pinyin: 'yīn cǐ', meaning: 'par conséquent', meaningEn: 'therefore', audio: 'audio/hsk4/hsk4_因此.wav' },
      { hanzi: '因而', pinyin: 'yīn ér', meaning: 'de ce fait', meaningEn: 'hence', audio: 'audio/hsk6/hsk6_因而.wav' },
      { hanzi: '从而', pinyin: 'cóng ér', meaning: 'et par là', meaningEn: 'thereby', audio: 'audio/hsk5/hsk5_从而.wav' },
      { hanzi: '开支', pinyin: 'kāi zhī', meaning: 'dépense', meaningEn: 'expenditure', audio: 'audio/hsk6/hsk6_开支.wav' },
      { hanzi: '利润', pinyin: 'lì rùn', meaning: 'bénéfice', meaningEn: 'profit', audio: 'audio/hsk5/hsk5_利润.wav' }
    ],
    tip:
      'Dans un essai B2-C1, alterne 因此 et 从而 pour rythmer. Évite de répéter 所以 plus de 2x dans un même paragraphe : ça sonne oral.',
    tipEn:
      'In a B2-C1 essay, alternate 因此 and 从而 for rhythm. Avoid repeating 所以 more than 2x in one paragraph: sounds spoken.'
  }
];

// --- cecr-b22-debate-m7 — Synthétiser et conclure -----------------------------
export const b22DebateM7LearnSections: LessonV2LearnSection[] = [
  {
    id: 'b22-zongjie',
    title: 'Conclure : 总之 / 总的来说 / 综上所述',
    titleEn: 'Conclude: 总之 / 总的来说 / 综上所述',
    body:
      'Quatre formules de conclusion, gradées par registre :\n' +
      '- 总之 (en bref) — concluant rapide, oral et écrit\n' +
      '- 总的来说 (dans l\'ensemble) — bilan plus posé\n' +
      '- 综上所述 (au vu de ce qui précède) — très soutenu, typique des essais/rapports\n' +
      '- 一言以蔽之 (en un mot) — chengyu, registre lettré\n' +
      '\n' +
      'Attention : le marqueur final introduit la conclusion **sans rien rajouter** — c\'est la synthèse qui suit qui doit porter le poids.',
    bodyEn:
      '总之 (in short) — quick concluder, oral and written. 总的来说 (overall) — more measured wrap-up. 综上所述 (in light of the above) — very formal, typical of essay or report conclusions. 一言以蔽之 (in a word) — chengyu, scholarly register. The closing marker introduces the conclusion without adding anything: the synthesis that follows must carry the weight.',
    items: [
      { hanzi: '总之', pinyin: 'zǒng zhī', meaning: 'en bref', meaningEn: 'in short', audio: 'audio/hsk4/hsk4_总之.wav' },
      { hanzi: '总的来说', pinyin: 'zǒng de lái shuō', meaning: 'dans l\'ensemble', meaningEn: 'overall', audio: 'audio/hsk5/hsk5_总的来说.wav' },
      { hanzi: '综上所述', pinyin: 'zōng shàng suǒ shù', meaning: 'au vu de ce qui précède', meaningEn: 'in light of the above', audio: 'audio/hsk6/hsk6_综上所述.wav' },
      { hanzi: '总结', pinyin: 'zǒng jié', meaning: 'résumer', meaningEn: 'summarize', audio: 'audio/hsk4/hsk4_总结.wav' },
      { hanzi: '结论', pinyin: 'jié lùn', meaning: 'conclusion', meaningEn: 'conclusion', audio: 'audio/hsk5/hsk5_结论.wav' }
    ],
    tip:
      'À l\'oral, 总之 suffit. À l\'écrit B2+, alterne 综上所述 (formel) et 总的来说 (modéré). Ne combine jamais 总之 + 综上所述 : redondance lourde.',
    tipEn:
      'In speech, 总之 is enough. In B2+ writing, alternate 综上所述 (formal) and 总的来说 (moderate). Never combine 总之 + 综上所述: heavy redundancy.'
  },
  {
    id: 'b22-zhanwang',
    title: 'Ouvrir vers l\'avenir : 展望 / 期待 / 值得',
    titleEn: 'Open to the future: 展望 / 期待 / 值得',
    body:
      'Pour ne pas finir sur une note plate, ouvrir vers l\'avenir avec trois formules :\n' +
      '- 展望未来 (regarder vers l\'avenir)\n' +
      '- 期待 (espérer, attendre)\n' +
      '- 值得 (mériter de)\n' +
      '\n' +
      'Exemples :\n' +
      '- 这个议题值得进一步探讨 (ce sujet mérite d\'être approfondi)\n' +
      '- 我们期待… (nous espérons…)\n' +
      '- 展望未来，… (en regardant vers l\'avenir,…)\n' +
      '\n' +
      'Astuce : ces formules signalent une pensée **encore en mouvement**, ouverte au débat — très valorisé en argumentation académique chinoise.',
    bodyEn:
      'To avoid ending flat, open toward the future: 展望未来 (look ahead), 期待 (hope, expect), 值得 (deserve to). 这个议题值得进一步探讨 = this topic deserves further exploration. 我们期待… = we hope… 展望未来，… = looking to the future,… These formulas signal still-moving thought, open to debate — highly valued in Chinese academic argumentation.',
    items: [
      { hanzi: '展望', pinyin: 'zhǎn wàng', meaning: 'envisager, regarder vers', meaningEn: 'envision, look forward', audio: 'audio/hsk6/hsk6_展望.wav' },
      { hanzi: '期待', pinyin: 'qī dài', meaning: 'attendre, espérer', meaningEn: 'expect, hope', audio: 'audio/hsk4/hsk4_期待.wav' },
      { hanzi: '值得', pinyin: 'zhí dé', meaning: 'mériter', meaningEn: 'deserve, worth', audio: 'audio/hsk4/hsk4_值得.wav' },
      { hanzi: '议题', pinyin: 'yì tí', meaning: 'sujet de débat', meaningEn: 'debate topic', audio: 'audio/hsk6/hsk6_议题.wav' },
      { hanzi: '探讨', pinyin: 'tàn tǎo', meaning: 'approfondir', meaningEn: 'explore deeply', audio: 'audio/hsk6/hsk6_探讨.wav' }
    ],
    tip:
      'Une bonne conclusion B2+ chinoise = synthèse + ouverture. Termine par « 这个问题值得我们继续思考 » = ce sujet mérite que nous continuions à y réfléchir. Touche élégante.',
    tipEn:
      'A good B2+ Chinese conclusion = synthesis + opening. End with «这个问题值得我们继续思考» = this topic deserves continued reflection. Elegant touch.'
  }
];

// ═════════════════════════════════════════════════════════════════════════════
// VAGUE 3 — pivot strategique : B2.2 Conversation + Nuances
// Les anciens parcours Arts/Santé sont retirés du périmètre B2.2 ; on les
// remplace par 7 leçons Conversation (patterns avancés au-delà du débat formel)
// et 7 leçons Nuances (paires/triplets de mots subtils que les apprenants
// confondent, même à niveau B2+).
// ═════════════════════════════════════════════════════════════════════════════

// === CONVERSATION B2.2 =======================================================

// --- cecr-b22-conversation-m1 — Réagir aux nouvelles -------------------------
export const b22ConvM1LearnSections: LessonV2LearnSection[] = [
  {
    id: 'b22-react-news',
    title: 'Réagir spontanément à une nouvelle',
    titleEn: 'React spontaneously to news',
    body:
      'Au-delà du « 真的吗？» basique, le B2 distingue les nuances de réaction.\n' +
      '\n' +
      'Bonne nouvelle :\n' +
      '- 太好了 (super !)\n' +
      '- 真不错 (vraiment bien)\n' +
      '- 难以置信 (incroyable)\n' +
      '\n' +
      'Surprise :\n' +
      '- 没想到 (je n\'aurais pas pensé)\n' +
      '- 居然 (figure-toi que…)\n' +
      '- 竟然 (idem, ton plus oral)\n' +
      '\n' +
      'Mauvaise nouvelle :\n' +
      '- 太糟糕了 (c\'est nul)\n' +
      '- 真可惜 (quel dommage)\n' +
      '- 我替你难过 (je suis triste pour toi)\n' +
      '\n' +
      'Attention : réagir naturellement, c\'est ne **jamais** rester scotché à 哦 (oh) ou 是吗 (ah bon).',
    bodyEn:
      'Beyond basic «真的吗？» (really?), B2 distinguishes nuances: 太好了 (great!), 真不错 (really nice), 难以置信 (unbelievable). For surprise: 没想到 (I wouldn\'t have thought), 居然 (would you believe…), 竟然 (same, more spoken). For bad news: 太糟糕了 (that sucks), 真可惜 (what a pity), 我替你难过 (I\'m sad for you). Reacting naturally means not getting stuck on 哦 (oh) or 是吗 (oh really).',
    items: [
      { hanzi: '没想到', pinyin: 'méi xiǎng dào', meaning: 'je n\'aurais pas pensé', meaningEn: 'wouldn\'t have thought', audio: 'audio/hsk4/hsk4_没想到.wav' },
      { hanzi: '居然', pinyin: 'jū rán', meaning: 'figure-toi (surprise)', meaningEn: 'unexpectedly', audio: 'audio/hsk5/hsk5_居然.wav' },
      { hanzi: '竟然', pinyin: 'jìng rán', meaning: 'figure-toi (oral)', meaningEn: 'actually (spoken)', audio: 'audio/hsk5/hsk5_竟然.wav' },
      { hanzi: '难以置信', pinyin: 'nán yǐ zhì xìn', meaning: 'incroyable', meaningEn: 'unbelievable', audio: 'audio/hsk6/hsk6_难以置信.wav' },
      { hanzi: '可惜', pinyin: 'kě xī', meaning: 'dommage', meaningEn: 'pity', audio: 'audio/hsk4/hsk4_可惜.wav' }
    ],
    tip:
      'Astuce sociale : devant une bonne nouvelle, surenchère ! 真的吗？太厉害了！恭喜恭喜！. Une seule réaction = froide.',
    tipEn:
      'Social tip: for good news, pile it on! 真的吗？太厉害了！恭喜恭喜！. A single reaction = cold.'
  },
  {
    id: 'b22-empathy',
    title: 'Marquer l\'empathie sans tomber dans le pathos',
    titleEn: 'Show empathy without falling into pathos',
    body:
      'Trois registres d\'empathie selon le moment de la conversation.\n' +
      '\n' +
      'Compatir :\n' +
      '- 我理解你 (je te comprends)\n' +
      '- 我能想象 (j\'imagine)\n' +
      '- 这真不容易 (c\'est vraiment dur)\n' +
      '\n' +
      'Encourager :\n' +
      '- 加油 (bon courage, omniprésent)\n' +
      '- 别灰心 (ne te décourage pas)\n' +
      '- 一切都会好的 (tout va s\'arranger)\n' +
      '\n' +
      'Clore poliment : 你保重 (prends soin de toi).\n' +
      '\n' +
      'Attention : évite les phrases creuses comme 没事的 (« c\'est rien ») devant une vraie peine — perçu comme **dismissif**.',
    bodyEn:
      'To sympathize: 我理解你 (I get you), 我能想象 (I can imagine), 这真不容易 (that\'s really hard). To encourage: 加油 (chin up — ubiquitous), 别灰心 (don\'t lose heart), 一切都会好的 (it\'ll all work out). To close politely: 你保重 (take care). Avoid empty phrases like 没事的 («it\'s nothing») in front of real grief — feels dismissive.',
    items: [
      { hanzi: '理解', pinyin: 'lǐ jiě', meaning: 'comprendre', meaningEn: 'understand', audio: 'audio/hsk3/hsk3_理解.wav' },
      { hanzi: '想象', pinyin: 'xiǎng xiàng', meaning: 'imaginer', meaningEn: 'imagine', audio: 'audio/hsk5/hsk5_想象.wav' },
      { hanzi: '加油', pinyin: 'jiā yóu', meaning: 'bon courage', meaningEn: 'chin up', audio: 'audio/hsk2/hsk2_加油.wav' },
      { hanzi: '灰心', pinyin: 'huī xīn', meaning: 'se décourager', meaningEn: 'lose heart', audio: 'audio/hsk5/hsk5_灰心.wav' },
      { hanzi: '保重', pinyin: 'bǎo zhòng', meaning: 'prends soin', meaningEn: 'take care', audio: 'audio/hsk5/hsk5_保重.wav' }
    ],
    tip:
      '加油 ne se traduit pas vraiment. Selon contexte : « courage », « tu peux le faire », « allez ». Universellement positif, jamais sarcastique.',
    tipEn:
      '加油 doesn\'t really translate. By context: «courage», «you got this», «come on». Universally positive, never sarcastic.'
  }
];

// --- cecr-b22-conversation-m2 — Compliments et leur acceptation -------------
export const b22ConvM2LearnSections: LessonV2LearnSection[] = [
  {
    id: 'b22-compliment',
    title: 'Faire un compliment qui sonne vrai',
    titleEn: 'Make a compliment that sounds real',
    body:
      'Le compliment chinois doit être **précis** — la flatterie creuse est vite repérée. Règle d\'or : précise toujours **ce qui** est bien.\n' +
      '\n' +
      'Compliments classiques :\n' +
      '- 你今天很漂亮 (tu es belle aujourd\'hui)\n' +
      '- 你的中文真好 (ton chinois est très bon)\n' +
      '- 这件衣服很适合你 (ce vêtement te va bien)\n' +
      '\n' +
      'Pour un travail :\n' +
      '- 你做得真棒 (très bien fait)\n' +
      '- 太厉害了 (impressionnant)\n' +
      '\n' +
      'Astuce : compliments plus subtils — 你眼光真好 (tu as bon goût), 你考虑得很周到 (tu as bien pensé à tout).',
    bodyEn:
      'Classic compliments: 你今天很漂亮 (you look beautiful today), 你的中文真好 (your Chinese is great), 这件衣服很适合你 (that outfit suits you). For work: 你做得真棒 (well done), 太厉害了 (impressive). Subtler: 你眼光真好 (you have good taste), 你考虑得很周到 (you thought of everything). Avoid hollow flattery — Chinese people spot it fast. Always specify WHAT is good.',
    items: [
      { hanzi: '漂亮', pinyin: 'piào liang', meaning: 'beau, joli', meaningEn: 'beautiful', audio: 'audio/hsk1/hsk1_漂亮.wav' },
      { hanzi: '适合', pinyin: 'shì hé', meaning: 'aller bien à', meaningEn: 'suit', audio: 'audio/hsk4/hsk4_适合.wav' },
      { hanzi: '厉害', pinyin: 'lì hai', meaning: 'impressionnant', meaningEn: 'impressive', audio: 'audio/hsk4/hsk4_厉害.wav' },
      { hanzi: '眼光', pinyin: 'yǎn guāng', meaning: 'goût, perspicacité', meaningEn: 'taste, vision', audio: 'audio/hsk5/hsk5_眼光.wav' },
      { hanzi: '周到', pinyin: 'zhōu dào', meaning: 'attentionné', meaningEn: 'thoughtful', audio: 'audio/hsk6/hsk6_周到.wav' }
    ],
    tip:
      '你的中文真好 est la phrase entendue 1000x. Pour féliciter QUELQU\'UN qui parle français/anglais, varie : 你的发音很地道 (ta prononciation est authentique), 你的语法非常准 (ta grammaire est précise).',
    tipEn:
      '你的中文真好 is heard 1000x. To compliment someone speaking French/English, vary: 你的发音很地道 (your pronunciation is authentic), 你的语法非常准 (your grammar is accurate).'
  },
  {
    id: 'b22-modesty',
    title: 'Réponse polie à un compliment : 哪里哪里',
    titleEn: 'Polite response to a compliment: 哪里哪里',
    body:
      'En Chine, accepter un compliment direct (« Merci ! ») peut sonner **arrogant**. La modestie **谦虚** est culturellement valorisée.\n' +
      '\n' +
      'Réponses traditionnelles :\n' +
      '- 哪里哪里 (litt. « où ça où ça » = mais non)\n' +
      '- 过奖了 (vous flattez trop)\n' +
      '- 您客气了 (vous êtes trop poli)\n' +
      '\n' +
      'Réponses modernes :\n' +
      '- 谢谢，不过还差得远 (merci, mais je suis encore loin)\n' +
      '- 我还在学 (j\'apprends encore)\n' +
      '- 还差得远 (j\'ai encore beaucoup à faire)',
    bodyEn:
      'In China, accepting a direct compliment («Thanks!») can sound arrogant. Traditional responses: 哪里哪里 (lit. «where where» = no no), 过奖了 (you flatter), 您客气了 (you\'re too polite). More modern: 谢谢，不过还差得远 (thanks, but I\'m still far). For Chinese: 我还在学 (I\'m still learning), 还差得远 (I have a long way to go). This modesty 谦虚 (qiānxū) is culturally valued.',
    items: [
      { hanzi: '哪里', pinyin: 'nǎ lǐ', meaning: 'où (mais non)', meaningEn: 'where (= no no)', audio: 'audio/hsk1/hsk1_哪里.wav' },
      { hanzi: '过奖', pinyin: 'guò jiǎng', meaning: 'flatter', meaningEn: 'over-praise', audio: 'audio/hsk6/hsk6_过奖.wav' },
      { hanzi: '客气', pinyin: 'kè qi', meaning: 'poli, courtois', meaningEn: 'polite', audio: 'audio/hsk2/hsk2_客气.wav' },
      { hanzi: '谦虚', pinyin: 'qiān xū', meaning: 'modeste', meaningEn: 'modest', audio: 'audio/hsk5/hsk5_谦虚.wav' },
      { hanzi: '差得远', pinyin: 'chà de yuǎn', meaning: 'loin du compte', meaningEn: 'far from it', audio: 'audio/hsk5/hsk5_差得远.wav' }
    ],
    tip:
      'Acceptable aussi de répondre 谢谢 + détourner : « 谢谢，是因为我练得多 » (merci, c\'est parce que j\'ai beaucoup pratiqué) — tu remercies SANS te valoriser.',
    tipEn:
      'Also acceptable: 谢谢 + redirect: «谢谢，是因为我练得多» (thanks, it\'s because I practice a lot) — you thank WITHOUT self-promoting.'
  }
];

// --- cecr-b22-conversation-m3 — Petits désaccords du quotidien --------------
export const b22ConvM3LearnSections: LessonV2LearnSection[] = [
  {
    id: 'b22-disagree-soft',
    title: 'Désaccord poli au quotidien (≠ débat)',
    titleEn: 'Polite everyday disagreement (≠ debate)',
    body:
      'Différent du débat formel — ici on est entre amis ou collègues. Adoucir avec **不过** (mais, léger) plutôt que 但是 (mais, plus tranché).\n' +
      '\n' +
      'Formules douces :\n' +
      '- 我觉得不一定 (je trouve que pas forcément)\n' +
      '- 嗯…我有点不同意 (hmm… je ne suis pas tout à fait d\'accord)\n' +
      '- 我倒觉得… (moi au contraire je pense que…)\n' +
      '\n' +
      'Astuce : pour proposer une alternative, finir par une question ouverte — 这样会不会更好？(comme ça ce serait peut-être mieux ?).',
    bodyEn:
      'Different from formal debate: here you\'re among friends or colleagues. Gentle formulas: 我觉得不一定 (I don\'t think so necessarily), 嗯…我有点不同意 (hmm… I don\'t fully agree), 我倒觉得… (I rather think that…). To suggest an alternative: 这样会不会更好？(would this maybe be better?). Soften with 不过 (but — light) rather than 但是 (but — sharper).',
    items: [
      { hanzi: '不一定', pinyin: 'bù yí dìng', meaning: 'pas forcément', meaningEn: 'not necessarily', audio: 'audio/hsk3/hsk3_不一定.wav' },
      { hanzi: '不同意', pinyin: 'bù tóng yì', meaning: 'pas d\'accord', meaningEn: 'disagree', audio: 'audio/hsk3/hsk3_同意.wav' },
      { hanzi: '倒', pinyin: 'dào', meaning: 'plutôt, au contraire', meaningEn: 'rather, on the contrary', audio: 'audio/hsk5/hsk5_倒.wav' },
      { hanzi: '不过', pinyin: 'bú guò', meaning: 'mais (léger)', meaningEn: 'but (mild)', audio: 'audio/hsk3/hsk3_不过.wav' },
      { hanzi: '建议', pinyin: 'jiàn yì', meaning: 'suggérer', meaningEn: 'suggest', audio: 'audio/hsk4/hsk4_建议.wav' }
    ],
    tip:
      '我倒觉得 est très utile : tu introduis une opinion contraire SANS attaquer. « 你说他懒，我倒觉得他只是累 » = tu dis qu\'il est paresseux, moi je trouve qu\'il est juste fatigué.',
    tipEn:
      '我倒觉得 is very useful: introduces a contrary opinion WITHOUT attacking. «你说他懒，我倒觉得他只是累» = you say he\'s lazy, I think he\'s just tired.'
  },
  {
    id: 'b22-disagree-formal',
    title: 'En milieu pro : nuancer sans froisser',
    titleEn: 'In a pro setting: qualify without offending',
    body:
      'En milieu pro, la règle du **sandwich** : compliment + réserve + ouverture.\n' +
      '\n' +
      'Exemples canoniques :\n' +
      '- 我有一个不同的看法 (j\'ai une vision différente)\n' +
      '- 我们可以再讨论一下 (on peut en rediscuter)\n' +
      '- 这个想法很有意思，但… (idée intéressante, mais…)\n' +
      '- 您的方案非常好，我有一点小建议，您觉得呢？\n' +
      '\n' +
      'Astuce : demander l\'avis de l\'autre à la fin (您觉得呢/你觉得呢) **ouvre** le dialogue plutôt que de fermer.',
    bodyEn:
      'At work: 我有一个不同的看法 (I have a different view), 我们可以再讨论一下 (we can discuss further), 这个想法很有意思，但… (interesting idea, but…). The classic sandwich: compliment + reservation + opening. 您的方案非常好，我有一点小建议，您觉得呢？ Asking the other\'s opinion at the end (您觉得呢/你觉得呢) opens dialogue rather than closing.',
    items: [
      { hanzi: '看法', pinyin: 'kàn fǎ', meaning: 'point de vue', meaningEn: 'viewpoint', audio: 'audio/hsk4/hsk4_看法.wav' },
      { hanzi: '讨论', pinyin: 'tǎo lùn', meaning: 'discuter', meaningEn: 'discuss', audio: 'audio/hsk4/hsk4_讨论.wav' },
      { hanzi: '方案', pinyin: 'fāng àn', meaning: 'plan, proposition', meaningEn: 'plan, proposal', audio: 'audio/hsk5/hsk5_方案.wav' },
      { hanzi: '小建议', pinyin: 'xiǎo jiàn yì', meaning: 'petite suggestion', meaningEn: 'small suggestion', audio: 'audio/hsk4/hsk4_建议.wav' },
      { hanzi: '想法', pinyin: 'xiǎng fǎ', meaning: 'idée', meaningEn: 'idea, thought', audio: 'audio/hsk4/hsk4_想法.wav' }
    ],
    tip:
      'Astuce d\'or en réunion chinoise : ne JAMAIS dire « 你错了 » à un supérieur. Toujours formuler comme une suggestion : « 我想我们可以从另一个角度看 » (je pense qu\'on pourrait voir sous un autre angle).',
    tipEn:
      'Golden tip in Chinese meetings: NEVER say «你错了» to a superior. Always frame as a suggestion: «我想我们可以从另一个角度看» (I think we could view this from another angle).'
  }
];

// --- cecr-b22-conversation-m4 — Téléphone et messages pro -------------------
export const b22ConvM4LearnSections: LessonV2LearnSection[] = [
  {
    id: 'b22-phone',
    title: 'Conversation téléphonique professionnelle',
    titleEn: 'Professional phone conversation',
    body:
      'RÈGLE D\'OR : au téléphone en contexte pro, on dit toujours **您** (vous), jamais 你.\n' +
      '\n' +
      'Séquence type d\'un appel pro :\n' +
      '- décrocher : 喂，您好\n' +
      '- se présenter : 我是X公司的小王\n' +
      '- demander : 请问 X 在吗 ?\n' +
      '- si X absent : X 不在，您要留言吗？\n' +
      '- patienter : 请稍等\n' +
      '- erreur : 您打错了\n' +
      '- conclure : 不打扰您了，再见',
    bodyEn:
      'Pick up: 喂，您好 (hello). Introduce: 我是X公司的小王 (I\'m Wang from company X). Ask: 请问 X 在吗 ? (excuse me, is X there?). If X absent: X 不在，您要留言吗？(X isn\'t here, want to leave a message?). 请稍等 = one moment. 您打错了 = wrong number. Close: 不打扰您了 (I\'ll let you go), 再见 (goodbye). On the phone, in a pro context, always 您 (formal you), not 你.',
    items: [
      { hanzi: '喂', pinyin: 'wéi', meaning: 'allô', meaningEn: 'hello (phone)', audio: 'audio/hsk1/hsk1_喂.wav' },
      { hanzi: '请问', pinyin: 'qǐng wèn', meaning: 'excusez-moi', meaningEn: 'may I ask', audio: 'audio/hsk1/hsk1_请问.wav' },
      { hanzi: '留言', pinyin: 'liú yán', meaning: 'laisser un message', meaningEn: 'leave a message', audio: 'audio/hsk5/hsk5_留言.wav' },
      { hanzi: '稍等', pinyin: 'shāo děng', meaning: 'patientez un peu', meaningEn: 'wait a moment', audio: 'audio/hsk4/hsk4_稍等.wav' },
      { hanzi: '打扰', pinyin: 'dǎ rǎo', meaning: 'déranger', meaningEn: 'disturb', audio: 'audio/hsk4/hsk4_打扰.wav' }
    ],
    tip:
      '喂 se prononce avec un ton 2 montant au tél (wéi), pas le 4 normal (wèi). Le 2 est devenu la norme téléphonique nationale.',
    tipEn:
      '喂 is pronounced with rising tone 2 on the phone (wéi), not the normal 4 (wèi). Tone 2 has become the national phone standard.'
  },
  {
    id: 'b22-wechat',
    title: 'WeChat pro : ton et formules',
    titleEn: 'Pro WeChat: tone and phrases',
    body:
      'WeChat 微信 a **remplacé l\'email pro** en Chine. La structure d\'un échange respectueux suit toujours le même arc.\n' +
      '\n' +
      'Démarrer poliment :\n' +
      '- 您好，方便聊一下吗？(bonjour, vous avez un instant ?)\n' +
      '- 抱歉打扰您 (désolé de vous déranger)\n' +
      '\n' +
      'Demander :\n' +
      '- 麻烦您 + verbe (puis-je vous demander de…)\n' +
      '- 能否 + verbe (pourriez-vous…)\n' +
      '\n' +
      'Confirmer et clore :\n' +
      '- 收到，谢谢 (bien reçu, merci)\n' +
      '- 辛苦了 (vous avez bien travaillé — **quasi-obligatoire**)\n' +
      '\n' +
      'Attention : format vocal court (≤ 30s) accepté entre collègues, **pas** avec un client.',
    bodyEn:
      'WeChat 微信 has replaced pro email in China. Start politely: 您好，方便聊一下吗？(hi, do you have a moment?), 抱歉打扰您 (sorry to bother). Ask: 麻烦您 + verb (could I trouble you to…), 能否 + verb (could you…). Confirm: 收到，谢谢 (received, thanks). Close: 辛苦了 (you\'ve worked hard — almost mandatory). Short voice notes (≤ 30s) OK between colleagues, not with a client.',
    items: [
      { hanzi: '微信', pinyin: 'wēi xìn', meaning: 'WeChat', meaningEn: 'WeChat', audio: 'audio/hsk5/hsk5_微信.wav' },
      { hanzi: '方便', pinyin: 'fāng biàn', meaning: 'pratique, dispo', meaningEn: 'convenient', audio: 'audio/hsk3/hsk3_方便.wav' },
      { hanzi: '抱歉', pinyin: 'bào qiàn', meaning: 'désolé', meaningEn: 'sorry', audio: 'audio/hsk4/hsk4_抱歉.wav' },
      { hanzi: '麻烦', pinyin: 'má fan', meaning: 'déranger, ennui', meaningEn: 'trouble, bother', audio: 'audio/hsk4/hsk4_麻烦.wav' },
      { hanzi: '辛苦了', pinyin: 'xīn kǔ le', meaning: 'merci pour le travail', meaningEn: 'thanks for your work', audio: 'audio/hsk4/hsk4_辛苦.wav' }
    ],
    tip:
      '辛苦了 est culturellement énorme. Le supérieur le dit à l\'employé en fin de journée, le client au prestataire. L\'oublier est perçu comme froid voire impoli.',
    tipEn:
      '辛苦了 is culturally huge. The superior says it to the employee at day\'s end, the client to the contractor. Forgetting it feels cold or even rude.'
  }
];

// --- cecr-b22-conversation-m5 — Mauvaises nouvelles & excuses ----------------
export const b22ConvM5LearnSections: LessonV2LearnSection[] = [
  {
    id: 'b22-bad-news',
    title: 'Annoncer une mauvaise nouvelle',
    titleEn: 'Deliver bad news',
    body:
      'En Chine, on n\'annonce **jamais** une mauvaise nouvelle à brûle-pourpoint. La séquence se déroule en trois temps.\n' +
      '\n' +
      'Préparer le terrain :\n' +
      '- 我有件事要告诉你… (j\'ai quelque chose à te dire…)\n' +
      '- 我不知道怎么说… (je ne sais pas comment dire…)\n' +
      '- 你要做好心理准备 (prépare-toi mentalement)\n' +
      '\n' +
      'Annoncer la nouvelle :\n' +
      '- 出事了 (il y a eu un problème)\n' +
      '- 计划取消了 (le plan est annulé)\n' +
      '- 项目失败了 (le projet a échoué)\n' +
      '\n' +
      'Astuce : adoucir avec **不太顺利** (pas très bien) plutôt que 失败 (échec) si possible. Toujours suivre par une issue : 但是我们可以…',
    bodyEn:
      'Prepare the ground: 我有件事要告诉你… (I have something to tell you…), 我不知道怎么说… (I don\'t know how to say it…), 你要做好心理准备 (mentally prepare). The news: 出事了 (something happened), 计划取消了 (plan canceled), 项目失败了 (project failed). Soften with 不太顺利 (not going great) rather than 失败 (failure) when possible. Always follow with a path forward: 但是我们可以…',
    items: [
      { hanzi: '告诉', pinyin: 'gào sù', meaning: 'dire à', meaningEn: 'tell', audio: 'audio/hsk2/hsk2_告诉.wav' },
      { hanzi: '出事', pinyin: 'chū shì', meaning: 'arriver un problème', meaningEn: 'something happens', audio: 'audio/hsk5/hsk5_出事.wav' },
      { hanzi: '取消', pinyin: 'qǔ xiāo', meaning: 'annuler', meaningEn: 'cancel', audio: 'audio/hsk4/hsk4_取消.wav' },
      { hanzi: '失败', pinyin: 'shī bài', meaning: 'échouer', meaningEn: 'fail', audio: 'audio/hsk4/hsk4_失败.wav' },
      { hanzi: '顺利', pinyin: 'shùn lì', meaning: 'sans heurt', meaningEn: 'smooth', audio: 'audio/hsk4/hsk4_顺利.wav' }
    ],
    tip:
      'Culturellement, en Chine on n\'annonce JAMAIS une mauvaise nouvelle à brûle-pourpoint. Toujours un préambule (« je dois te dire quelque chose »), même 5 secondes. Sauter cette étape est perçu comme brutal.',
    tipEn:
      'Culturally in China, you NEVER drop bad news cold. Always a preamble («I have to tell you something»), even 5 seconds. Skipping this feels brutal.'
  },
  {
    id: 'b22-excuses',
    title: 'Présenter ses excuses : graduations',
    titleEn: 'Apologize: gradations',
    body:
      'Les excuses se gradent en intensité — la **suite** (raison + remède) est aussi importante que la formule. Une excuse sans suite = perçue comme **légère**.\n' +
      '\n' +
      'Quatre niveaux :\n' +
      '- léger : 不好意思 (oral le plus commun), 抱歉 (plus écrit)\n' +
      '- moyen : 对不起 (sincère)\n' +
      '- fort : 真的对不起, 非常抱歉\n' +
      '- très fort : 我向您道歉 (formel), 我错了 (j\'ai eu tort)\n' +
      '\n' +
      'Astuce : toujours faire suivre par une raison brève + remède — 因为堵车，我会赶紧过来 (cause + action corrective).',
    bodyEn:
      'Light: 不好意思 (excuse me, most common in speech), 抱歉 (sorry, more written). Medium: 对不起 (I\'m sorry, sincere). Strong: 真的对不起 (truly sorry), 非常抱歉 (extremely sorry). Very strong: 我向您道歉 (I apologize to you, formal), 我错了 (I was wrong). Follow with a brief reason + fix: 因为堵车，我会赶紧过来 = cause + corrective action. Apology without follow-up = feels light.',
    items: [
      { hanzi: '不好意思', pinyin: 'bù hǎo yì si', meaning: 'excuse-moi', meaningEn: 'excuse me', audio: 'audio/hsk2/hsk2_不好意思.wav' },
      { hanzi: '对不起', pinyin: 'duì bu qǐ', meaning: 'pardon, désolé', meaningEn: 'sorry', audio: 'audio/hsk1/hsk1_对不起.wav' },
      { hanzi: '抱歉', pinyin: 'bào qiàn', meaning: 'désolé (écrit)', meaningEn: 'sorry (written)', audio: 'audio/hsk4/hsk4_抱歉.wav' },
      { hanzi: '道歉', pinyin: 'dào qiàn', meaning: 'présenter ses excuses', meaningEn: 'apologize', audio: 'audio/hsk5/hsk5_道歉.wav' },
      { hanzi: '原谅', pinyin: 'yuán liàng', meaning: 'pardonner', meaningEn: 'forgive', audio: 'audio/hsk4/hsk4_原谅.wav' }
    ],
    tip:
      '不好意思 sert à BEAUCOUP plus que s\'excuser : aussi pour interpeller (« excusez-moi madame »), pour décliner (« 不好意思，我有事 »). Couteau suisse social.',
    tipEn:
      '不好意思 is for FAR more than apology: also for getting attention («excuse me ma\'am»), declining («不好意思，我有事»). Social swiss army knife.'
  }
];

// --- cecr-b22-conversation-m6 — Discours rapporté avancé --------------------
export const b22ConvM6LearnSections: LessonV2LearnSection[] = [
  {
    id: 'b22-discours-rapporte',
    title: 'Rapporter une discussion : 说 / 告诉 / 问',
    titleEn: 'Report a discussion: 说 / 告诉 / 问',
    body:
      'RÈGLE D\'OR : en chinois, discours indirect **sans concordance des temps**, contrairement au français. 他说他明天来 = il a dit qu\'il viendrait demain (litt. « il dit il demain venir »).\n' +
      '\n' +
      'Verbes de parole essentiels :\n' +
      '- 说 (dire — neutre)\n' +
      '- 告诉 X (dire à X — objet obligatoire)\n' +
      '- 问 (demander)\n' +
      '- 回答 (répondre)\n' +
      '\n' +
      'Astuce : pour rapporter une **question**, garder l\'ordre interrogatif — 他问我什么时候去 (il m\'a demandé quand j\'y allais).',
    bodyEn:
      'Indirect speech in Chinese: no tense agreement like French/English. 他说他明天来 = he said he\'d come tomorrow (lit. «he says he tomorrow come»). Speaking verbs: 说 (say — neutral), 告诉 X (tell X), 问 (ask), 回答 (reply). 他告诉我他不能来 = he told me he couldn\'t come. To report a question, keep the interrogative order: 他问我什么时候去 (he asked me when I\'d go).',
    items: [
      { hanzi: '说', pinyin: 'shuō', meaning: 'dire', meaningEn: 'say', audio: 'audio/hsk1/hsk1_说.wav' },
      { hanzi: '告诉', pinyin: 'gào sù', meaning: 'dire à qqn', meaningEn: 'tell', audio: 'audio/hsk2/hsk2_告诉.wav' },
      { hanzi: '问', pinyin: 'wèn', meaning: 'demander', meaningEn: 'ask', audio: 'audio/hsk1/hsk1_问.wav' },
      { hanzi: '回答', pinyin: 'huí dá', meaning: 'répondre', meaningEn: 'reply', audio: 'audio/hsk3/hsk3_回答.wav' },
      { hanzi: '提到', pinyin: 'tí dào', meaning: 'mentionner', meaningEn: 'mention', audio: 'audio/hsk4/hsk4_提到.wav' }
    ],
    tip:
      'Erreur classique : oublier que 告诉 a un objet obligatoire (告诉 + qui). On dit « 他告诉我X », JAMAIS « 他告诉X » seul. Différence fondamentale avec 说.',
    tipEn:
      'Classic mistake: forgetting that 告诉 requires an object (告诉 + whom). Say «他告诉我X», NEVER «他告诉X» alone. Fundamental difference from 说.'
  },
  {
    id: 'b22-rumeur',
    title: 'Rapporter une rumeur ou une information indirecte',
    titleEn: 'Report a rumor or indirect information',
    body:
      'Très utiles à l\'oral chinois pour rapporter sans **s\'engager personnellement**. Différence clé : 听说 est plus personnel (je l\'ai entendu), 据说 plus distant (la rumeur dit).\n' +
      '\n' +
      'Connecteurs de distance énonciative :\n' +
      '- 据说 (on dit que…)\n' +
      '- 听说 (j\'ai entendu dire)\n' +
      '- 大家都说 (tout le monde dit)\n' +
      '- 有人说 (quelqu\'un a dit)\n' +
      '\n' +
      'Exemple : 据说他要换工作 (on raconte qu\'il va changer de boulot).\n' +
      '\n' +
      'Astuce : pour relativiser, ajouter 不知道是不是真的 (je ne sais pas si c\'est vrai) ou 据说而已 (c\'est juste une rumeur).',
    bodyEn:
      'Speaker distance: 据说 (jùshuō, it\'s said), 听说 (tīngshuō, I heard), 大家都说 (everyone says), 有人说 (someone said). 据说他要换工作 = the word is he\'s changing jobs. To qualify: 不知道是不是真的 (don\'t know if it\'s true), 据说而已 (just a rumor). 听说 is more personal (I heard), 据说 more distant (the rumor says). Heavily used in spoken Chinese to avoid personal commitment.',
    items: [
      { hanzi: '据说', pinyin: 'jù shuō', meaning: 'on dit que', meaningEn: 'it is said', audio: 'audio/hsk5/hsk5_据说.wav' },
      { hanzi: '听说', pinyin: 'tīng shuō', meaning: 'j\'ai entendu dire', meaningEn: 'I heard', audio: 'audio/hsk2/hsk2_听说.wav' },
      { hanzi: '传言', pinyin: 'chuán yán', meaning: 'rumeur', meaningEn: 'rumor', audio: 'audio/hsk6/hsk6_传言.wav' },
      { hanzi: '消息', pinyin: 'xiāo xi', meaning: 'nouvelle, info', meaningEn: 'news, info', audio: 'audio/hsk4/hsk4_消息.wav' },
      { hanzi: '真假', pinyin: 'zhēn jiǎ', meaning: 'vrai ou faux', meaningEn: 'true or false', audio: 'audio/hsk5/hsk5_真假.wav' }
    ],
    tip:
      'Astuce : commence ta phrase par 听说 plutôt que 我觉得 quand tu rapportes quelque chose dont tu n\'es pas sûr. Tu actes la distance et tu n\'engages pas ta crédibilité.',
    tipEn:
      'Tip: start with 听说 rather than 我觉得 when reporting something uncertain. You signal the distance and don\'t risk your credibility.'
  }
];

// --- cecr-b22-conversation-m7 — Closing : remercier, prendre congé ----------
export const b22ConvM7LearnSections: LessonV2LearnSection[] = [
  {
    id: 'b22-closing',
    title: 'Clore une conversation sans la couper',
    titleEn: 'Close a conversation without cutting it',
    body:
      'La sortie chinoise se déroule en trois temps. Une sortie brutale (« 拜拜！») est perçue comme **froide**.\n' +
      '\n' +
      'Préparer la sortie :\n' +
      '- 那好 (bon alors)\n' +
      '- 那这样吧 (eh bien comme ça)\n' +
      '- 嗯…那我先… (bon… alors je vais…)\n' +
      '\n' +
      'Annoncer la sortie :\n' +
      '- 我得走了 (je dois y aller)\n' +
      '- 时间不早了 (il se fait tard)\n' +
      '- 还有事要办 (j\'ai des choses à faire)\n' +
      '\n' +
      'Prendre congé chaleureusement :\n' +
      '- 改天再聊 (on en reparle un autre jour)\n' +
      '- 保持联系 (on garde contact)\n' +
      '- 路上小心 (fais attention sur la route)',
    bodyEn:
      'Prepare the exit: 那好 (well then), 那这样吧 (let\'s do that), 嗯…那我先… (well… so I\'ll first…). Announce the exit: 我得走了 (I need to go), 时间不早了 (it\'s getting late), 还有事要办 (I have things to do). Warmly take leave: 改天再聊 (let\'s chat another day), 保持联系 (stay in touch), 路上小心 (be safe on the way). A blunt exit («拜拜！») feels cold.',
    items: [
      { hanzi: '走了', pinyin: 'zǒu le', meaning: 'partir', meaningEn: 'going', audio: 'audio/hsk1/hsk1_走.wav' },
      { hanzi: '改天', pinyin: 'gǎi tiān', meaning: 'un autre jour', meaningEn: 'another day', audio: 'audio/hsk5/hsk5_改天.wav' },
      { hanzi: '联系', pinyin: 'lián xì', meaning: 'contacter', meaningEn: 'contact', audio: 'audio/hsk4/hsk4_联系.wav' },
      { hanzi: '小心', pinyin: 'xiǎo xīn', meaning: 'fais attention', meaningEn: 'be careful', audio: 'audio/hsk3/hsk3_小心.wav' },
      { hanzi: '路上', pinyin: 'lù shang', meaning: 'sur la route', meaningEn: 'on the way', audio: 'audio/hsk3/hsk3_路上.wav' }
    ],
    tip:
      '路上小心 = formule chaleureuse universelle quand quelqu\'un part. Va aussi pour un trajet en métro de 5 minutes. Marque l\'attention.',
    tipEn:
      '路上小心 = universal warm closer when someone leaves. Works even for a 5-minute metro ride. Signals care.'
  },
  {
    id: 'b22-thanks-deep',
    title: 'Remercier en profondeur',
    titleEn: 'Thank deeply',
    body:
      'En Chine, la gratitude **spécifique** (« merci d\'avoir fait X ») est plus forte qu\'un simple 谢谢. Précise toujours **ce pour quoi** tu remercies.\n' +
      '\n' +
      'Au-delà de 谢谢 :\n' +
      '- 太感谢你了 (merci infiniment)\n' +
      '- 谢谢你的帮助 (merci pour ton aide)\n' +
      '- 真不知道怎么感谢你 (je ne sais comment te remercier)\n' +
      '\n' +
      'Registre très soutenu :\n' +
      '- 万分感谢 (mille fois merci)\n' +
      '- 不胜感激 (extrêmement reconnaissant — écrit)\n' +
      '\n' +
      'Astuce : si l\'autre minimise (« 不客气 »), tu peux insister — 真的，不是客气话 (vraiment, je ne dis pas ça par politesse).',
    bodyEn:
      'Beyond 谢谢: 太感谢你了 (thanks so much), 谢谢你的帮助 (thanks for your help — specify FOR WHAT), 真不知道怎么感谢你 (I don\'t know how to thank you). Very formal: 万分感谢 (a thousand thanks), 不胜感激 (extremely grateful — written). If the other minimizes («不客气» = no problem), you can insist: 真的，不是客气话 (truly, not just being polite). In China, SPECIFIC gratitude («thanks for doing X») is stronger than a simple 谢谢.',
    items: [
      { hanzi: '感谢', pinyin: 'gǎn xiè', meaning: 'remercier (formel)', meaningEn: 'thank (formal)', audio: 'audio/hsk4/hsk4_感谢.wav' },
      { hanzi: '帮助', pinyin: 'bāng zhù', meaning: 'aide', meaningEn: 'help', audio: 'audio/hsk2/hsk2_帮助.wav' },
      { hanzi: '不胜感激', pinyin: 'bú shèng gǎn jī', meaning: 'extrêmement reconnaissant', meaningEn: 'deeply grateful', audio: 'audio/hsk6/hsk6_感激.wav' },
      { hanzi: '客气话', pinyin: 'kè qi huà', meaning: 'parole de politesse', meaningEn: 'pleasantry', audio: 'audio/hsk5/hsk5_客气.wav' },
      { hanzi: '感激', pinyin: 'gǎn jī', meaning: 'reconnaissance', meaningEn: 'gratitude', audio: 'audio/hsk5/hsk5_感激.wav' }
    ],
    tip:
      'Si on t\'a vraiment rendu service, dis « 改天我请你吃饭 » (un autre jour je t\'invite au resto). C\'est la promesse de réciprocité culturelle, plus forte que tout merci verbal.',
    tipEn:
      'If someone really helped you, say «改天我请你吃饭» (some day I\'ll treat you to a meal). It\'s the cultural reciprocity promise, stronger than any verbal thanks.'
  }
];

// === NUANCES B2.2 ============================================================

// --- cecr-b22-nuances-m1 — 觉得 vs 认为 vs 以为 ------------------------------
export const b22NuancesM1LearnSections: LessonV2LearnSection[] = [
  {
    id: 'b22-juede-renwei',
    title: '觉得 vs 认为 — l\'opinion subjective vs raisonnée',
    titleEn: '觉得 vs 认为 — subjective vs reasoned opinion',
    body:
      'RÈGLE D\'OR : 觉得 = **goût/sensation/intuition**, 认为 = **jugement/analyse/conclusion**.\n' +
      '\n' +
      'Différences clés :\n' +
      '- 觉得 (juéde) : opinion subjective, intuition, sensation — 我觉得这个菜很好吃 (je trouve ce plat bon)\n' +
      '- 认为 (rènwéi) : opinion raisonnée, conviction réfléchie — 我认为这个政策不公平 (j\'estime que cette politique n\'est pas juste)\n' +
      '\n' +
      'Astuce : dans un essai ou débat formel, préfère **认为**. Au quotidien, **觉得** est plus naturel.',
    bodyEn:
      '觉得 (juéde, feel/find) : subjective opinion, intuition, sensation. 我觉得这个菜很好吃 = I find this dish tasty (personal sense). 认为 (rènwéi, consider/think) : reasoned opinion, considered conviction. 我认为这个政策不公平 = I judge this policy unfair (judgment). Simple rule : 觉得 = taste/sensation/intuition ; 认为 = judgment/analysis/conclusion. In an essay or formal debate, prefer 认为. In daily life, 觉得 is more natural.',
    items: [
      { hanzi: '觉得', pinyin: 'jué de', meaning: 'trouver, sentir', meaningEn: 'feel, find', audio: 'audio/hsk2/hsk2_觉得.wav' },
      { hanzi: '认为', pinyin: 'rèn wéi', meaning: 'estimer, juger', meaningEn: 'consider, judge', audio: 'audio/hsk3/hsk3_认为.wav' },
      { hanzi: '主观', pinyin: 'zhǔ guān', meaning: 'subjectif', meaningEn: 'subjective', audio: 'audio/hsk6/hsk6_主观.wav' },
      { hanzi: '客观', pinyin: 'kè guān', meaning: 'objectif', meaningEn: 'objective', audio: 'audio/hsk5/hsk5_客观.wav' },
      { hanzi: '判断', pinyin: 'pàn duàn', meaning: 'juger', meaningEn: 'judge', audio: 'audio/hsk5/hsk5_判断.wav' }
    ],
    tip:
      'Test rapide : peut-on remplacer par « avoir l\'impression » ? Oui → 觉得. Par « considérer que » ? Oui → 认为. 我觉得他不喜欢我 (j\'ai l\'impression que…). 我认为这是错的 (je considère que c\'est faux).',
    tipEn:
      'Quick test : can you replace with «have the feeling»? Yes → 觉得. With «consider that»? Yes → 认为. 我觉得他不喜欢我 (I have the feeling that…). 我认为这是错的 (I consider this wrong).'
  },
  {
    id: 'b22-yiwei',
    title: '以为 — l\'erreur d\'appréciation rétrospective',
    titleEn: '以为 — the retrospective mistaken belief',
    body:
      'RÈGLE D\'OR : 以为 implique **toujours** que la croyance s\'est révélée **fausse**. Piège sémantique total pour les francophones.\n' +
      '\n' +
      'Exemples typiques :\n' +
      '- 我以为他会来 (je croyais qu\'il viendrait — et il n\'est pas venu)\n' +
      '- 我以为今天没课，结果有 (je croyais qu\'il n\'y avait pas cours, en fait il y en a)\n' +
      '\n' +
      'Attention : on ne peut pas dire « 我以为这是真的 » si c\'est effectivement vrai. Si la croyance est **vérifiée** → 我觉得 ou 我认为.',
    bodyEn:
      '以为 (yǐwéi, mistakenly believe) ALWAYS implies the belief turned out false. A total semantic trap for English speakers. 我以为他会来 = I thought he\'d come (and he didn\'t — belief was wrong). You CANNOT say «我以为这是真的» if it\'s actually true. If belief is verified → 我觉得 or 我认为. 以为 = «I (mistakenly) thought». Often followed by a reveal : 我以为今天没课，结果有 = I thought there was no class today, turns out there is.',
    items: [
      { hanzi: '以为', pinyin: 'yǐ wéi', meaning: 'croire à tort', meaningEn: 'mistakenly think', audio: 'audio/hsk3/hsk3_以为.wav' },
      { hanzi: '其实', pinyin: 'qí shí', meaning: 'en fait', meaningEn: 'actually', audio: 'audio/hsk3/hsk3_其实.wav' },
      { hanzi: '结果', pinyin: 'jié guǒ', meaning: 'au final, résultat', meaningEn: 'in the end', audio: 'audio/hsk4/hsk4_结果.wav' },
      { hanzi: '原来', pinyin: 'yuán lái', meaning: 'en fait (révélation)', meaningEn: 'turns out', audio: 'audio/hsk4/hsk4_原来.wav' },
      { hanzi: '意外', pinyin: 'yì wài', meaning: 'inattendu', meaningEn: 'unexpected', audio: 'audio/hsk4/hsk4_意外.wav' }
    ],
    tip:
      'Phrase-piège typique : « 我以为你是中国人 » est un COMPLIMENT déguisé pour un étranger qui parle bien chinois (sous-entendu : tu m\'as trompé, je te prenais pour un Chinois). Inverse en français : « ah bon, tu n\'es pas chinois ? ».',
    tipEn:
      'Typical trap phrase: «我以为你是中国人» is a hidden COMPLIMENT for a foreigner who speaks Chinese well (subtext: you fooled me, I took you for Chinese). Reverse in English: «oh, you\'re not Chinese?».'
  }
];

// --- cecr-b22-nuances-m2 — 必须 vs 一定 vs 应该 vs 得 -----------------------
export const b22NuancesM2LearnSections: LessonV2LearnSection[] = [
  {
    id: 'b22-bixu-yiding',
    title: '必须 vs 一定 — obligation externe vs certitude',
    titleEn: '必须 vs 一定 — external obligation vs certainty',
    body:
      'RÈGLE D\'OR : **必须** = la règle l\'exige, **一定** = je tiens à ce que ça arrive.\n' +
      '\n' +
      'Différences clés :\n' +
      '- 必须 (bìxū) : obligation **externe**, règle, devoir — 你必须按时到 (règle imposée)\n' +
      '- 一定 (yídìng) : certitude/**insistance personnelle** — 你一定要来 (insistance affective)\n' +
      '\n' +
      'Astuce : pour le sens « il est très probable que », on utilise aussi 一定 — 他一定到了 (il est sûrement arrivé).',
    bodyEn:
      '必须 (bìxū) = EXTERNAL obligation, rule, duty. 你必须按时到 = you must arrive on time (imposed rule). 一定 (yídìng) = certainty/personal insistence. 你一定要来 = you absolutely must come (affective insistence). Radical difference : 必须 = the rule demands it ; 一定 = I insist on it happening. For «must» as «very likely», also 一定 : 他一定到了 = he must have arrived.',
    items: [
      { hanzi: '必须', pinyin: 'bì xū', meaning: 'devoir (obligation)', meaningEn: 'must (rule)', audio: 'audio/hsk3/hsk3_必须.wav' },
      { hanzi: '一定', pinyin: 'yí dìng', meaning: 'sûrement, absolument', meaningEn: 'definitely', audio: 'audio/hsk3/hsk3_一定.wav' },
      { hanzi: '按时', pinyin: 'àn shí', meaning: 'à l\'heure', meaningEn: 'on time', audio: 'audio/hsk4/hsk4_按时.wav' },
      { hanzi: '规定', pinyin: 'guī dìng', meaning: 'règle', meaningEn: 'rule', audio: 'audio/hsk4/hsk4_规定.wav' },
      { hanzi: '坚持', pinyin: 'jiān chí', meaning: 'insister, tenir à', meaningEn: 'insist', audio: 'audio/hsk4/hsk4_坚持.wav' }
    ],
    tip:
      'Erreur classique : utiliser 必须 pour insister auprès d\'un ami (« tu DOIS venir à mon mariage »). Trop froid, sonne juridique. Préfère « 你一定要来 » (insistance chaleureuse).',
    tipEn:
      'Classic mistake : using 必须 to insist with a friend («you MUST come to my wedding»). Too cold, sounds legal. Prefer «你一定要来» (warm insistence).'
  },
  {
    id: 'b22-yinggai-dei',
    title: '应该 vs 得 — devoir moral vs nécessité oral',
    titleEn: '应该 vs 得 — moral should vs spoken need',
    body:
      '应该 (yīnggāi) = devrait, **recommandation morale** — 你应该多休息. 得 (děi en sens d\'obligation) = devoir oral, nécessité concrète — 我得走了.\n' +
      '\n' +
      'Hiérarchie complète de l\'obligation :\n' +
      '- 应该 (devrait)\n' +
      '- 得 (oral, nécessité)\n' +
      '- 一定要 (insistant)\n' +
      '- 必须 (règle)\n' +
      '- 不得不 (forcé contre son gré)\n' +
      '\n' +
      'Attention : **得** est strictement oral, jamais à l\'écrit formel.',
    bodyEn:
      '应该 (yīnggāi) = should, moral recommendation. 你应该多休息 = you should rest more (advice). 得 (děi, pronounced děi when meaning obligation) = spoken duty, concrete necessity. 我得走了 = I gotta go (urgent, practical). 得 is strictly spoken, never formal writing. Hierarchy of obligation : 应该 (should) < 得 (oral, need) < 一定要 (insistent) < 必须 (rule) < 不得不 (forced against will).',
    items: [
      { hanzi: '应该', pinyin: 'yīng gāi', meaning: 'devrait', meaningEn: 'should', audio: 'audio/hsk3/hsk3_应该.wav' },
      { hanzi: '得', pinyin: 'děi', meaning: 'devoir (oral)', meaningEn: 'have to (spoken)', audio: 'audio/hsk2/hsk2_得.wav' },
      { hanzi: '不得不', pinyin: 'bù dé bù', meaning: 'être forcé de', meaningEn: 'forced to', audio: 'audio/hsk5/hsk5_不得不.wav' },
      { hanzi: '需要', pinyin: 'xū yào', meaning: 'avoir besoin', meaningEn: 'need', audio: 'audio/hsk3/hsk3_需要.wav' },
      { hanzi: '建议', pinyin: 'jiàn yì', meaning: 'conseil', meaningEn: 'advice', audio: 'audio/hsk4/hsk4_建议.wav' }
    ],
    tip:
      'Attention : 得 a 3 prononciations selon contexte. dé (obtenir : 得到), de (particule : 跑得快), děi (devoir : 我得走). C\'est la troisième la plus piégée. À l\'oral, c\'est děi.',
    tipEn:
      'Watch out: 得 has 3 pronunciations by context. dé (obtain : 得到), de (particle : 跑得快), děi (must : 我得走). The third is the trickiest. In speech, it\'s děi.'
  }
];

// --- cecr-b22-nuances-m3 — 已经 vs 都 vs 早已 -------------------------------
export const b22NuancesM3LearnSections: LessonV2LearnSection[] = [
  {
    id: 'b22-yijing-dou',
    title: '已经 vs 都 — accomplissement objectif vs étonnement',
    titleEn: '已经 vs 都 — objective completion vs surprise',
    body:
      'Deux marqueurs de « déjà » que tout sépare : **已经** reste neutre, **都** souligne « tant que ça ! » avec étonnement.\n' +
      '\n' +
      'Différences clés :\n' +
      '- 已经 (yǐjīng) : constat factuel d\'accomplissement — 我已经吃了 (info brute)\n' +
      '- 都 (dōu, emphatique) : surprise, exclamation, souvent avec un chiffre — 都十二点了，快睡吧 ! (il est déjà minuit !)\n' +
      '\n' +
      'Astuce — test rapide :\n' +
      '- 他都八十了 (il a déjà 80 ans — **waouh** !)\n' +
      '- 他已经八十了 (il a 80 ans — info)',
    bodyEn:
      '已经 (yǐjīng, already) = factual statement of completion. 我已经吃了 = I\'ve already eaten (fact). 都 (dōu, already — emphatic) = surprise, exclamation, often with a number. 都十二点了，快睡吧 = it\'s ALREADY midnight, go to bed! Subtlety : 都 emphasizes «that much already!» with surprise, 已经 stays neutral. 他都八十了 = he\'s already 80 (wow!). 他已经八十了 = he\'s 80 (info).',
    items: [
      { hanzi: '已经', pinyin: 'yǐ jīng', meaning: 'déjà (factuel)', meaningEn: 'already (fact)', audio: 'audio/hsk2/hsk2_已经.wav' },
      { hanzi: '都', pinyin: 'dōu', meaning: 'déjà (emphatique)', meaningEn: 'already (emphatic)', audio: 'audio/hsk1/hsk1_都.wav' },
      { hanzi: '半夜', pinyin: 'bàn yè', meaning: 'minuit', meaningEn: 'midnight', audio: 'audio/hsk5/hsk5_半夜.wav' },
      { hanzi: '完成', pinyin: 'wán chéng', meaning: 'achever', meaningEn: 'complete', audio: 'audio/hsk3/hsk3_完成.wav' },
      { hanzi: '惊讶', pinyin: 'jīng yà', meaning: 'surprise', meaningEn: 'surprised', audio: 'audio/hsk5/hsk5_惊讶.wav' }
    ],
    tip:
      '都 + chiffre + 了 = formule de surprise très oral. « 都九月了 » = on est DÉJÀ en septembre (le temps file). À retenir comme bloc.',
    tipEn:
      '都 + number + 了 = very oral surprise formula. «都九月了» = it\'s ALREADY September (time flies). Memorize as a block.'
  },
  {
    id: 'b22-zaoyi',
    title: '早已 / 老早 — depuis longtemps déjà',
    titleEn: '早已 / 老早 — already long ago',
    body:
      'Les deux ajoutent une **profondeur temporelle** que 已经 n\'a pas — « cela fait longtemps que ». Souvent suivis de 就.\n' +
      '\n' +
      'Deux registres :\n' +
      '- 早已 (zǎoyǐ) : formel et écrit — 这件事我早已忘了 (cette affaire, je l\'ai oubliée depuis longtemps)\n' +
      '- 老早 (lǎozǎo) : oral et expressif — 我老早就跟你说过 (je te l\'avais dit il y a longtemps)\n' +
      '\n' +
      'Astuce : très souvent dans la construction **早已就… / 老早就…**',
    bodyEn:
      '早已 (zǎoyǐ) = already long ago, formal and written. 这件事我早已忘了 = I forgot about this long ago. 老早 (lǎozǎo) = same sense but spoken and expressive. 我老早就跟你说过 = I told you long ago. Difference from 已经 : 早已/老早 add temporal depth («for a LONG TIME now»). Often followed by 就 : 早已就… / 老早就…',
    items: [
      { hanzi: '早已', pinyin: 'zǎo yǐ', meaning: 'depuis longtemps déjà', meaningEn: 'long since', audio: 'audio/hsk6/hsk6_早已.wav' },
      { hanzi: '老早', pinyin: 'lǎo zǎo', meaning: 'depuis longtemps (oral)', meaningEn: 'long ago (spoken)', audio: 'audio/hsk5/hsk5_老早.wav' },
      { hanzi: '忘记', pinyin: 'wàng jì', meaning: 'oublier', meaningEn: 'forget', audio: 'audio/hsk3/hsk3_忘记.wav' },
      { hanzi: '过去', pinyin: 'guò qù', meaning: 'passé', meaningEn: 'past', audio: 'audio/hsk2/hsk2_过去.wav' },
      { hanzi: '从前', pinyin: 'cóng qián', meaning: 'autrefois', meaningEn: 'in the past', audio: 'audio/hsk5/hsk5_从前.wav' }
    ],
    tip:
      '老早 a une coloration affective (souvent reproche ou nostalgie) que 早已 n\'a pas. « 我老早就告诉你了！» sous-entend : pourquoi tu n\'as pas écouté ?',
    tipEn:
      '老早 carries an emotional shade (often reproach or nostalgia) that 早已 lacks. «我老早就告诉你了！» implies : why didn\'t you listen?'
  }
];

// --- cecr-b22-nuances-m4 — 突然 vs 忽然 vs 一下子 -------------------------
export const b22NuancesM4LearnSections: LessonV2LearnSection[] = [
  {
    id: 'b22-turan-huran',
    title: '突然 vs 忽然 — soudaineté objective vs vécue',
    titleEn: '突然 vs 忽然 — objective vs experienced suddenness',
    body:
      'Deux mots de la soudaineté, distingués par leur **classe grammaticale** :\n' +
      '- 突然 (tūrán) : adjectif **et** adverbe — décrit un événement objectivement abrupt. 一个突然的决定 (une décision soudaine), 他突然来了 (il est venu soudainement)\n' +
      '- 忽然 (hūrán) : **adverbe uniquement** — souligne le vécu subjectif de la surprise. 我忽然想起 (ça m\'est revenu d\'un coup)\n' +
      '\n' +
      'Astuce : si tu peux dire « **brusquement** » → 突然. Si « soudain je… » → 忽然 marche mieux.',
    bodyEn:
      '突然 (tūrán, sudden) : can be adjective AND adverb. Describes an objectively abrupt event. 一个突然的决定 = a sudden decision. 他突然来了 = he came suddenly. 忽然 (hūrán, all of a sudden) : adverb only. Stresses the subjective experience of surprise. 我忽然想起 = it suddenly came back to me. If you can say «abruptly» → 突然. If «suddenly I…» → 忽然 fits better.',
    items: [
      { hanzi: '突然', pinyin: 'tū rán', meaning: 'soudain (adj+adv)', meaningEn: 'sudden (adj+adv)', audio: 'audio/hsk3/hsk3_突然.wav' },
      { hanzi: '忽然', pinyin: 'hū rán', meaning: 'tout à coup (adv)', meaningEn: 'all of a sudden', audio: 'audio/hsk3/hsk3_忽然.wav' },
      { hanzi: '决定', pinyin: 'jué dìng', meaning: 'décision', meaningEn: 'decision', audio: 'audio/hsk3/hsk3_决定.wav' },
      { hanzi: '想起', pinyin: 'xiǎng qǐ', meaning: 'se rappeler', meaningEn: 'recall', audio: 'audio/hsk3/hsk3_想起.wav' },
      { hanzi: '惊喜', pinyin: 'jīng xǐ', meaning: 'surprise heureuse', meaningEn: 'happy surprise', audio: 'audio/hsk5/hsk5_惊喜.wav' }
    ],
    tip:
      'Test grammatical : 一个 _ 的 + nom (« un X soudain ») → seul 突然 fonctionne. « 一个突然的电话 » ✓ ; « 一个忽然的电话 » ✗.',
    tipEn:
      'Grammar test : 一个 _ 的 + noun («a sudden X») → only 突然 works. «一个突然的电话» ✓ ; «一个忽然的电话» ✗.'
  },
  {
    id: 'b22-yixiazi',
    title: '一下子 — la soudaineté instantanée et complète',
    titleEn: '一下子 — instant complete suddenness',
    body:
      '一下子 marque la **rapidité absolue + le résultat complet**. Différence avec 突然/忽然 : 一下子 ajoute la **complétude** (« en une fraction de seconde, tout est fait »).\n' +
      '\n' +
      'Exemples :\n' +
      '- 一下子就明白了 (j\'ai tout compris d\'un coup)\n' +
      '- 一下子下了大雨 (il s\'est mis à pleuvoir des cordes d\'un coup)\n' +
      '\n' +
      'Attention : à ne pas confondre avec 一下 (« un peu », classifier verbal) — 看一下 = regarde un peu.',
    bodyEn:
      '一下子 (yíxiàzi, in one go, in a flash) : marks absolute speed + complete result. 一下子就明白了 = I got it all in a flash. 一下子下了大雨 = it suddenly poured. Difference from 突然/忽然 : 一下子 adds completeness («in a split second, all done»). Common spoken synonym : 一下 (without 子). Don\'t confuse with 一下 («a bit», verbal classifier) : 看一下 = take a quick look.',
    items: [
      { hanzi: '一下子', pinyin: 'yí xià zi', meaning: 'd\'un coup', meaningEn: 'in one go', audio: 'audio/hsk4/hsk4_一下子.wav' },
      { hanzi: '明白', pinyin: 'míng bai', meaning: 'comprendre', meaningEn: 'understand', audio: 'audio/hsk3/hsk3_明白.wav' },
      { hanzi: '下雨', pinyin: 'xià yǔ', meaning: 'pleuvoir', meaningEn: 'rain', audio: 'audio/hsk1/hsk1_下雨.wav' },
      { hanzi: '马上', pinyin: 'mǎ shàng', meaning: 'tout de suite', meaningEn: 'right away', audio: 'audio/hsk3/hsk3_马上.wav' },
      { hanzi: '立刻', pinyin: 'lì kè', meaning: 'immédiatement', meaningEn: 'immediately', audio: 'audio/hsk5/hsk5_立刻.wav' }
    ],
    tip:
      'Astuce : 一下子 ajoute presque toujours une notion d\'INTENSITÉ + COMPLÉTUDE. Compare : 突然下雨了 (il s\'est mis à pleuvoir) vs 一下子下大雨了 (il s\'est mis à pleuvoir des trombes en un éclair).',
    tipEn:
      'Tip : 一下子 almost always adds INTENSITY + COMPLETENESS. Compare : 突然下雨了 (it started raining) vs 一下子下大雨了 (it suddenly poured in a flash).'
  }
];

// --- cecr-b22-nuances-m5 — 大约 vs 大概 vs 差不多 --------------------------
export const b22NuancesM5LearnSections: LessonV2LearnSection[] = [
  {
    id: 'b22-dayue-dagai',
    title: '大约 vs 大概 — approximation chiffrée vs hypothèse',
    titleEn: '大约 vs 大概 — numeric approximation vs hypothesis',
    body:
      'RÈGLE D\'OR : **大约 = combien ?** (chiffre), **大概 = est-ce que ?** (probabilité). Confusion fréquente chez les francophones.\n' +
      '\n' +
      'Différences clés :\n' +
      '- 大约 (dàyuē) : approximation **numérique/temporelle**, toujours suivi d\'une quantité ou heure — 大约二十个人, 大约三点 (vers 15h)\n' +
      '- 大概 (dàgài) : hypothèse, supposition — 他大概不会来 (il ne viendra probablement pas)\n' +
      '\n' +
      'Astuce : 大概 a aussi un sens d\'« en gros » — 大概的内容 (le contenu en gros).',
    bodyEn:
      '大约 (dàyuē, about) = NUMERIC/temporal approximation. 大约二十个人 = about 20 people. 大约三点 = around 3pm. Always followed by quantity or time. 大概 (dàgài, probably) = hypothesis, supposition. 他大概不会来 = he probably won\'t come. Also : 大概的内容 = the gist. Difference : 大约 = how many? (number), 大概 = is it? (probability). Frequent French speaker confusion.',
    items: [
      { hanzi: '大约', pinyin: 'dà yuē', meaning: 'environ (chiffre)', meaningEn: 'about (number)', audio: 'audio/hsk5/hsk5_大约.wav' },
      { hanzi: '大概', pinyin: 'dà gài', meaning: 'probablement', meaningEn: 'probably', audio: 'audio/hsk4/hsk4_大概.wav' },
      { hanzi: '可能', pinyin: 'kě néng', meaning: 'peut-être', meaningEn: 'maybe', audio: 'audio/hsk2/hsk2_可能.wav' },
      { hanzi: '或许', pinyin: 'huò xǔ', meaning: 'peut-être (écrit)', meaningEn: 'perhaps (written)', audio: 'audio/hsk5/hsk5_或许.wav' },
      { hanzi: '估计', pinyin: 'gū jì', meaning: 'estimer', meaningEn: 'estimate', audio: 'audio/hsk4/hsk4_估计.wav' }
    ],
    tip:
      'Test simple : peut-on remplacer par « probablement » → 大概. Par « à peu près » + chiffre → 大约. « Le concert dure 大约2 heures » ; « Il 大概 ne viendra pas ».',
    tipEn:
      'Simple test : can you replace with «probably»? → 大概. With «about» + number? → 大约. «The concert lasts 大约 2 hours» ; «He 大概 won\'t come».'
  },
  {
    id: 'b22-chabuduo',
    title: '差不多 — l\'approximation idiomatique chinoise',
    titleEn: '差不多 — the idiomatic Chinese approximation',
    body:
      '差不多 est une **signature culturelle** chinoise — Lin Yutang en a fait un trait national, le Chinois préfère le 差不多 au précis absolu. Sens premier : « il ne manque pas grand-chose ».\n' +
      '\n' +
      'Trois emplois :\n' +
      '- similarité — 这两个差不多 (c\'est presque pareil)\n' +
      '- approximation — 差不多十块 (environ 10 yuans)\n' +
      '- suffisance — 差不多了，可以了 (c\'est bon comme ça)\n' +
      '\n' +
      'Attention : très utile à l\'oral, à **éviter** en pro où on attend du précis.',
    bodyEn:
      '差不多 (chàbuduō, almost, about) : a Chinese cultural signature. Primary sense : «not much missing» = almost the same. Covers 3 uses : (1) similarity : 这两个差不多 = these two are about the same. (2) approximation : 差不多十块 = about 10 yuan. (3) sufficiency : 差不多了，可以了 = good enough, OK. Lin Yutang made it a national trait : Chinese prefer 差不多 to absolute precision. Very useful in speech, avoid in pro where precision is expected.',
    items: [
      { hanzi: '差不多', pinyin: 'chà bu duō', meaning: 'presque, à peu près', meaningEn: 'almost', audio: 'audio/hsk2/hsk2_差不多.wav' },
      { hanzi: '差', pinyin: 'chà', meaning: 'manquer', meaningEn: 'lack', audio: 'audio/hsk3/hsk3_差.wav' },
      { hanzi: '类似', pinyin: 'lèi sì', meaning: 'similaire', meaningEn: 'similar', audio: 'audio/hsk5/hsk5_类似.wav' },
      { hanzi: '相似', pinyin: 'xiāng sì', meaning: 'ressembler', meaningEn: 'resemble', audio: 'audio/hsk5/hsk5_相似.wav' },
      { hanzi: '差异', pinyin: 'chā yì', meaning: 'différence', meaningEn: 'difference', audio: 'audio/hsk6/hsk6_差异.wav' }
    ],
    tip:
      'En milieu pro chinois, si on te répond 差不多 à une question précise, ça peut signifier 2 choses : (1) « c\'est en gros bon » (positif) ou (2) « j\'ai pas vraiment regardé en détail » (esquive). Pose une question de précision pour clarifier.',
    tipEn:
      'In Chinese pro settings, if you get 差不多 to a precise question, it can mean 2 things : (1) «basically OK» (positive) or (2) «I didn\'t really check in detail» (dodge). Ask a precision follow-up to clarify.'
  }
];

// --- cecr-b22-nuances-m6 — 看 vs 见 vs 看见 vs 见到 -----------------------
export const b22NuancesM6LearnSections: LessonV2LearnSection[] = [
  {
    id: 'b22-kan-jian',
    title: '看 vs 见 — l\'action vs le résultat de voir',
    titleEn: '看 vs 见 — action vs result of seeing',
    body:
      'RÈGLE D\'OR : **看** = action de regarder (processus, intention), **见** = résultat de voir (perception accomplie). En français : 看 = « regarder », 见 = « voir » (résultat).\n' +
      '\n' +
      'Compositions usuelles :\n' +
      '- 看见 (avoir vu — résultat)\n' +
      '- 见到 (voir, croiser quelqu\'un)\n' +
      '- 见面 (se rencontrer)\n' +
      '\n' +
      'Exemple-test : 我看了，但没看见 (j\'ai regardé mais je n\'ai rien vu). Attention : **见** seul ne s\'utilise quasiment jamais à l\'oral moderne.',
    bodyEn:
      '看 (kàn) = ACTION of looking, voluntary process. 我在看电视 = I\'m watching TV. 看 implies duration, intention. 见 (jiàn) = RESULT of seeing, completed perception. 见 is almost never used alone in modern speech — only in compositions : 看见 (saw — result), 见到 (see, run into someone), 见面 (meet). English distinction : 看 = «look at», 见 = «see» (result). 我看了，但没看见 = I looked but didn\'t see anything.',
    items: [
      { hanzi: '看', pinyin: 'kàn', meaning: 'regarder', meaningEn: 'look', audio: 'audio/hsk1/hsk1_看.wav' },
      { hanzi: '见', pinyin: 'jiàn', meaning: 'voir (résultat)', meaningEn: 'see (result)', audio: 'audio/hsk1/hsk1_见.wav' },
      { hanzi: '看见', pinyin: 'kàn jiàn', meaning: 'avoir vu', meaningEn: 'saw', audio: 'audio/hsk1/hsk1_看见.wav' },
      { hanzi: '见到', pinyin: 'jiàn dào', meaning: 'voir, croiser', meaningEn: 'see, encounter', audio: 'audio/hsk2/hsk2_见到.wav' },
      { hanzi: '见面', pinyin: 'jiàn miàn', meaning: 'se rencontrer', meaningEn: 'meet face to face', audio: 'audio/hsk3/hsk3_见面.wav' }
    ],
    tip:
      'Erreur fréquente : « 我没看 » (je n\'ai pas regardé — je n\'ai pas porté mon attention) vs « 我没看见 » (j\'ai regardé mais je n\'ai rien vu). Premier = manque d\'attention, second = manque de résultat.',
    tipEn:
      'Common mistake : «我没看» (I didn\'t look — didn\'t pay attention) vs «我没看见» (I looked but didn\'t see). First = lack of attention, second = lack of result.'
  },
  {
    id: 'b22-jiandao-yujian',
    title: '见到 vs 遇见 — voir un connu vs rencontre fortuite',
    titleEn: '见到 vs 遇见 — seeing the known vs chance encounter',
    body:
      'RÈGLE D\'OR : **见到** = factuel (neutre, planifié ou non), **遇见** = soulignement du **hasard**.\n' +
      '\n' +
      'Différences clés :\n' +
      '- 见到 (jiàndào) : voir/croiser, neutre — 我今天见到了老师\n' +
      '- 遇见 / 碰见 : rencontre **fortuite** — 我在街上遇见了他 (je l\'ai croisé par hasard)\n' +
      '\n' +
      'Astuce : 遇 / 碰 contiennent l\'idée du **hasard**. Pour une rencontre planifiée (rdv), utilise 见 ou 见面.',
    bodyEn:
      '见到 (jiàndào) = see/run into, neutral. Can be planned or not. 我今天见到了老师 = I saw the teacher today. 遇见 (yùjiàn) or 碰见 (pèngjiàn) = CHANCE encounter, randomness. 我在街上遇见了他 = I bumped into him in the street. 遇 / 碰 carry the chance idea. For a planned meeting (appointment), use 见 or 见面. Key difference : 见到 = factual, 遇见 = highlights the randomness.',
    items: [
      { hanzi: '遇见', pinyin: 'yù jiàn', meaning: 'rencontrer (hasard)', meaningEn: 'run into (chance)', audio: 'audio/hsk3/hsk3_遇见.wav' },
      { hanzi: '碰见', pinyin: 'pèng jiàn', meaning: 'tomber sur (hasard)', meaningEn: 'bump into', audio: 'audio/hsk4/hsk4_碰见.wav' },
      { hanzi: '相遇', pinyin: 'xiāng yù', meaning: 'se rencontrer (fortuit)', meaningEn: 'meet by chance', audio: 'audio/hsk5/hsk5_相遇.wav' },
      { hanzi: '约', pinyin: 'yuē', meaning: 'donner rdv', meaningEn: 'arrange to meet', audio: 'audio/hsk3/hsk3_约.wav' },
      { hanzi: '巧合', pinyin: 'qiǎo hé', meaning: 'coïncidence', meaningEn: 'coincidence', audio: 'audio/hsk6/hsk6_巧合.wav' }
    ],
    tip:
      '遇见 a une coloration romantique en chinois moderne. C\'est le mot des chansons d\'amour, des films romantiques. « 遇见你 » = te rencontrer (sous-entendu : c\'était le destin).',
    tipEn:
      '遇见 has a romantic shade in modern Chinese. It\'s the word of love songs, romance films. «遇见你» = meeting you (subtext : it was fate).'
  }
];

// --- cecr-b22-nuances-m7 — 帮助 vs 帮忙 vs 协助 ----------------------------
export const b22NuancesM7LearnSections: LessonV2LearnSection[] = [
  {
    id: 'b22-bangzhu-bangmang',
    title: '帮助 vs 帮忙 — aide objet vs aide service',
    titleEn: '帮助 vs 帮忙 — object help vs service help',
    body:
      'RÈGLE D\'OR : **帮助** = aide-concept (général, écrit), **帮忙** = aide-service ponctuel (oral, séparable).\n' +
      '\n' +
      'Différences clés :\n' +
      '- 帮助 (bāngzhù) : nom **ou** verbe, suivi d\'un objet direct — 我帮助他, plus écrit/formel\n' +
      '- 帮忙 (bāngmáng) : verbe **séparable** — 帮我一个忙 (rends-moi un service), plus oral/situationnel\n' +
      '\n' +
      'Comparer :\n' +
      '- 我需要你的帮助 (j\'ai besoin de ton aide — général)\n' +
      '- 我需要你帮忙 (j\'ai besoin que tu m\'aides — maintenant, sur ce truc)',
    bodyEn:
      '帮助 (bāngzhù) = help, can be NOUN or VERB. Followed by direct object : 我帮助他 = I help him. More written, more formal. 帮忙 (bāngmáng) = give a hand. SEPARABLE verb : say 帮我一个忙 (do me a favor), 帮你的忙 (give you a hand). More spoken, more situational. The difference is BETWEEN help-as-concept (帮助) and help-as-specific-service (帮忙). 我需要你的帮助 = I need your help (general). 我需要你帮忙 = I need you to help me (now, on this).',
    items: [
      { hanzi: '帮助', pinyin: 'bāng zhù', meaning: 'aider (général)', meaningEn: 'help (general)', audio: 'audio/hsk2/hsk2_帮助.wav' },
      { hanzi: '帮忙', pinyin: 'bāng máng', meaning: 'donner un coup de main', meaningEn: 'give a hand', audio: 'audio/hsk3/hsk3_帮忙.wav' },
      { hanzi: '帮', pinyin: 'bāng', meaning: 'aider', meaningEn: 'help', audio: 'audio/hsk2/hsk2_帮.wav' },
      { hanzi: '忙', pinyin: 'máng', meaning: 'occupé, affaire', meaningEn: 'busy, matter', audio: 'audio/hsk1/hsk1_忙.wav' },
      { hanzi: '请求', pinyin: 'qǐng qiú', meaning: 'demander, requête', meaningEn: 'request', audio: 'audio/hsk5/hsk5_请求.wav' }
    ],
    tip:
      'Erreur classique : « 我帮助你一下 » est faux car 一下 ne s\'insère pas dans 帮助. Dis « 我帮你一下 » (oral) ou « 我帮助你 » sans 一下. Pour insérer une mesure → utilise 帮 ou 帮忙.',
    tipEn:
      'Classic mistake : «我帮助你一下» is wrong because 一下 can\'t go inside 帮助. Say «我帮你一下» (spoken) or «我帮助你» without 一下. To insert a measure → use 帮 or 帮忙.'
  },
  {
    id: 'b22-xiezhu',
    title: '协助 — l\'aide professionnelle ou collaborative',
    titleEn: '协助 — professional or collaborative help',
    body:
      '协助 = assister, collaborer. **Très formel**, contexte professionnel. Implique un rapport hiérarchique ou collaboratif structuré. Le 协 contient l\'idée de **collaboration coordonnée**.\n' +
      '\n' +
      'Exemples pros :\n' +
      '- 协助经理 (assister le manager)\n' +
      '- 警方协助调查 (la police assiste à l\'enquête)\n' +
      '\n' +
      'Synonymes voisins :\n' +
      '- 配合 (coopérer en suivant le plan d\'autrui)\n' +
      '- 合作 (collaborer en partenariat)\n' +
      '\n' +
      'Attention : **jamais** entre amis (« 协助你买菜 » sonnerait absurde, dis 帮你).',
    bodyEn:
      '协助 (xiézhù) = assist, collaborate. Very formal, pro context. Implies a hierarchical or structured collaborative relationship : 协助经理 = assist the manager. 警方协助调查 = police assist the investigation. NEVER between friends («协助你买菜» would sound absurd, say 帮你). Remember : 协 carries the idea of coordinated COLLABORATION. Close synonyms : 配合 (cooperate by following another\'s plan), 合作 (collaborate as partners).',
    items: [
      { hanzi: '协助', pinyin: 'xié zhù', meaning: 'assister (formel)', meaningEn: 'assist (formal)', audio: 'audio/hsk5/hsk5_协助.wav' },
      { hanzi: '配合', pinyin: 'pèi hé', meaning: 'coopérer', meaningEn: 'cooperate', audio: 'audio/hsk5/hsk5_配合.wav' },
      { hanzi: '合作', pinyin: 'hé zuò', meaning: 'collaborer', meaningEn: 'collaborate', audio: 'audio/hsk4/hsk4_合作.wav' },
      { hanzi: '调查', pinyin: 'diào chá', meaning: 'enquête', meaningEn: 'investigation', audio: 'audio/hsk5/hsk5_调查.wav' },
      { hanzi: '支持', pinyin: 'zhī chí', meaning: 'soutenir', meaningEn: 'support', audio: 'audio/hsk3/hsk3_支持.wav' }
    ],
    tip:
      'Hiérarchie d\'aide en chinois : 帮 (oral, ami) < 帮忙 (oral, service) < 帮助 (général, écrit) < 协助 (pro, structuré) < 支援 (renfort, urgence) < 援助 (aide humanitaire).',
    tipEn:
      'Help hierarchy in Chinese : 帮 (oral, friend) < 帮忙 (oral, favor) < 帮助 (general, written) < 协助 (pro, structured) < 支援 (back-up, emergency) < 援助 (humanitarian aid).'
  }
];
