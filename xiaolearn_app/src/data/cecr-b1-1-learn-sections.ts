/**
 * cecr-b1-1-learn-sections.ts — contenu pédagogique manuel pour les 25 leçons B1.1.
 * Injecté dans cecr-course.ts via `learnSections: ...` sur chaque `LessonModule`.
 *
 * Règle produit : tous les `audio` pointent vers un fichier MP3/WAV pré-généré
 * (Azure Neural TTS — cf. xiaolearn_audio_policy). Convention :
 *   audio/hsk{N}/hsk{N}_{hanzi}.wav  (N = niveau HSK réel du mot)
 */

import type { LessonV2LearnSection } from '../types/lesson-learn';

// ═════════════════════════════════════════════════════════════════════════════
// Grammaire B1.1 — 了 · 把 · 被 · 的/地/得 · 是…的 · 就/才
// ═════════════════════════════════════════════════════════════════════════════

// --- cecr-b11-le-m1 — 了 changement d'état ---------------------------------
export const b11LeStateChangeLearnSections: LessonV2LearnSection[] = [
  {
    id: 'b11-le-state-signal',
    title: '了 final = « maintenant c\'est devenu… »',
    titleEn: '了 at the end = "now it has become…"',
    body:
      'Placé à la **fin** d\'une phrase (pas accolé au verbe), 了 signale un changement d\'état ou de situation. Avant non, maintenant oui.\n' +
      '\n' +
      'Exemples révélateurs :\n' +
      '- 我饿 (état neutre) → 我饿了 (j\'ai faim **maintenant**)\n' +
      '- 他是老师 (fait) → 他是老师了 (il l\'est **devenu**)\n' +
      '\n' +
      'RÈGLE D\'OR : cherche toujours ce déclic « voilà, les choses ont basculé ».',
    bodyEn:
      'Placed at the END of the sentence (not glued to the verb), 了 signals a change of state or situation. 我饿 describes a neutral state; 我饿了 claims a shift: not before, now yes. Same with 他是老师 (fact) → 他是老师了 (he HAS BECOME one). Always look for this "now things have flipped" reading.',
    items: [
      { hanzi: '饿了', pinyin: 'è le', meaning: 'avoir faim (maintenant)', meaningEn: 'hungry now', audio: 'audio/hsk3/hsk3_饿.wav' },
      { hanzi: '渴了', pinyin: 'kě le', meaning: 'avoir soif (maintenant)', meaningEn: 'thirsty now', audio: 'audio/hsk3/hsk3_渴.wav' },
      { hanzi: '累了', pinyin: 'lèi le', meaning: 'être fatigué', meaningEn: 'tired now', audio: 'audio/hsk2/hsk2_累.wav' },
      { hanzi: '下雨了', pinyin: 'xià yǔ le', meaning: 'il s\'est mis à pleuvoir', meaningEn: 'it started raining', audio: 'audio/hsk1/hsk1_下雨.wav' },
      { hanzi: '我不去了', pinyin: 'wǒ bù qù le', meaning: 'je n\'y vais plus', meaningEn: 'I\'m not going anymore', audio: 'audio/hsk1/hsk1_去.wav' }
    ],
    tip:
      'Un verbe peut porter DEUX 了 : un perfectif après V + un final en fin de phrase. 我吃了三个苹果了 = j\'ai déjà mangé 3 pommes (et c\'est clos maintenant).',
    tipEn:
      'A verb can carry TWO 了s: perfective after V + final at the end. 我吃了三个苹果了 = I\'ve eaten 3 apples (done for now).'
  },
  {
    id: 'b11-le-state-negation',
    title: 'Nier un changement : 不 + V + 了',
    titleEn: 'Negating a change: 不 + V + 了',
    body:
      'Pour nier un **nouveau** comportement, on garde 了 final mais on place 不 devant le verbe. C\'est une bascule d\'habitude, pas un perfectif.\n' +
      '\n' +
      'Cas typiques :\n' +
      '- 我不吃肉了 (je ne mange plus de viande — avant oui, plus maintenant)\n' +
      '- 他不来了 (il ne vient plus)\n' +
      '\n' +
      'Attention : **jamais** 没…了 — le perfectif nié perd son 了.',
    bodyEn:
      'To negate a NEW behaviour, keep final 了 but put 不 before the verb. 我不吃肉了 = I don\'t eat meat anymore (used to, not now). Nothing to do with the perfective — it\'s a habit switch. Never 没…了: a negated perfective drops its 了.',
    items: [
      { hanzi: '不吃了', pinyin: 'bù chī le', meaning: 'ne plus manger', meaningEn: 'not eating anymore', audio: 'audio/hsk1/hsk1_吃.wav' },
      { hanzi: '不去了', pinyin: 'bù qù le', meaning: 'ne plus y aller', meaningEn: 'not going anymore', audio: 'audio/hsk1/hsk1_去.wav' },
      { hanzi: '不想了', pinyin: 'bù xiǎng le', meaning: 'ne plus avoir envie', meaningEn: 'don\'t want to anymore', audio: 'audio/hsk1/hsk1_想.wav' },
      { hanzi: '老了', pinyin: 'lǎo le', meaning: 'avoir vieilli', meaningEn: 'gotten old', audio: 'audio/hsk1/hsk1_老.wav' },
      { hanzi: '好了', pinyin: 'hǎo le', meaning: 'c\'est bon / ça va', meaningEn: 'it\'s fine now', audio: 'audio/hsk1/hsk1_好.wav' }
    ]
  },
  {
    id: 'b11-le-state-tokens',
    title: 'Structure visuelle : 了 final vs 了 perfectif',
    titleEn: 'Visual structure: final 了 vs perfective 了',
    body:
      '了 colle au verbe (orange) = perfectif (action terminée). 了 à la fin de phrase (Particule) = changement d\'état. Position différente, sens différent.',
    bodyEn:
      '了 next to the verb (orange) = perfective (completed action). 了 at the end of the sentence (Particle) = change of state. Different position, different meaning.',
    tokenizedSentences: [
      {
        zh: [
          { text: '我', pinyin: 'wǒ', role: 'sujet' },
          { text: '吃', pinyin: 'chī', role: 'verbe' },
          { text: '了', pinyin: 'le', role: 'particule' },
          { text: '三个苹果', pinyin: 'sān ge píng guǒ', role: 'objet' }
        ],
        fr: [
          { text: 'J\'ai', role: 'sujet' },
          { text: 'mangé', role: 'verbe' },
          { text: 'trois pommes', role: 'objet' }
        ],
        note: 'PERFECTIF : 了 collé au verbe = action terminée et quantifiée.'
      },
      {
        zh: [
          { text: '我', pinyin: 'wǒ', role: 'sujet' },
          { text: '饿', pinyin: 'è', role: 'verbe' },
          { text: '了', pinyin: 'le', role: 'particule' }
        ],
        fr: [
          { text: 'J\'ai', role: 'sujet' },
          { text: 'faim', role: 'verbe' },
          { text: '(maintenant)', role: 'particule' }
        ],
        note: 'CHANGEMENT D\'ÉTAT : 了 en fin de phrase = ça vient de basculer. Avant non, maintenant oui.'
      },
      {
        zh: [
          { text: '下雨', pinyin: 'xià yǔ', role: 'verbe' },
          { text: '了', pinyin: 'le', role: 'particule' }
        ],
        fr: [
          { text: 'Il', role: 'sujet' },
          { text: 's\'est mis à', role: 'particule' },
          { text: 'pleuvoir', role: 'verbe' }
        ],
        note: 'Idem : 了 final = bascule. La pluie a démarré (avant ce n\'était pas le cas).'
      }
    ],
    tip:
      'Test mental : si tu peux ajouter « maintenant, ça a changé » à ta phrase française, utilise 了 final. Si tu énumères des actions accomplies, utilise 了 perfectif.',
    tipEn:
      'Mental test: if you can add «now, it has changed» to your English sentence, use final 了. If you\'re listing completed actions, use perfective 了.'
  }
];

// --- cecr-b11-le-m2 — 了 quantité atteinte ---------------------------------
export const b11LeDurationLearnSections: LessonV2LearnSection[] = [
  {
    id: 'b11-le-duration-double',
    title: 'Double 了 : action qui CONTINUE',
    titleEn: 'Double 了: ongoing action',
    body:
      'Structure : **S + V + 了 + quantité/durée + 了**. Le premier 了 marque l\'action accomplie, le second signale que le compteur **tourne encore**.\n' +
      '\n' +
      'Deux lectures opposées :\n' +
      '- 我学了两年中文了 (j\'étudie le chinois depuis 2 ans — **et je continue**)\n' +
      '- 我学了两年中文 (j\'ai étudié 2 ans — **c\'est fini**)\n' +
      '\n' +
      'Attention : sans le second 了, l\'action est close. C\'est le piège classique.',
    bodyEn:
      'Structure: S + V + 了 + quantity/duration + 了. 我学了两年中文了 = I\'ve been studying Chinese for 2 years (and continuing). First 了 marks the completed action, second 了 signals the clock is still running. Without the second 了, action is closed: 我学了两年中文 = I studied for 2 years (over).',
    items: [
      { hanzi: '学了', pinyin: 'xué le', meaning: 'avoir étudié', meaningEn: 'studied', audio: 'audio/hsk1/hsk1_学.wav' },
      { hanzi: '工作', pinyin: 'gōng zuò', meaning: 'travailler', meaningEn: 'work', audio: 'audio/hsk1/hsk1_工作.wav' },
      { hanzi: '等', pinyin: 'děng', meaning: 'attendre', meaningEn: 'wait', audio: 'audio/hsk2/hsk2_等.wav' },
      { hanzi: '已经', pinyin: 'yǐ jīng', meaning: 'déjà', meaningEn: 'already', audio: 'audio/hsk2/hsk2_已经.wav' },
      { hanzi: '多久', pinyin: 'duō jiǔ', meaning: 'combien de temps', meaningEn: 'how long', audio: 'audio/hsk3/hsk3_多久.wav' }
    ],
    tip:
      'Combine avec 已经 pour intensifier : 我已经等了半小时了 = ça fait déjà une demi-heure que j\'attends (sous-entendu : ça commence à faire long).',
    tipEn:
      'Pair with 已经 for emphasis: 我已经等了半小时了 = I\'ve been waiting half an hour already (implying: long enough).'
  },
  {
    id: 'b11-le-duration-tokens',
    title: 'Structure visuelle : action close vs action qui continue',
    titleEn: 'Visual structure: closed action vs ongoing action',
    body:
      'Un seul 了 (après le verbe) = action finie. Deux 了 (un après V, un final) = action en cours qui dure encore. La différence se voit dans la dernière position.',
    bodyEn:
      'One 了 (after the verb) = finished action. Two 了 (after V + at end) = ongoing action still running. The difference is in the last slot.',
    tokenizedSentences: [
      {
        zh: [
          { text: '我', pinyin: 'wǒ', role: 'sujet' },
          { text: '学', pinyin: 'xué', role: 'verbe' },
          { text: '了', pinyin: 'le', role: 'particule' },
          { text: '两年', pinyin: 'liǎng nián', role: 'complement' },
          { text: '中文', pinyin: 'zhōng wén', role: 'objet' }
        ],
        fr: [
          { text: 'J\'ai', role: 'sujet' },
          { text: 'étudié', role: 'verbe' },
          { text: 'le chinois', role: 'objet' },
          { text: 'pendant 2 ans', role: 'complement' }
        ],
        note: 'UN seul 了 → action TERMINÉE (j\'ai étudié 2 ans, maintenant c\'est fini).'
      },
      {
        zh: [
          { text: '我', pinyin: 'wǒ', role: 'sujet' },
          { text: '学', pinyin: 'xué', role: 'verbe' },
          { text: '了', pinyin: 'le', role: 'particule' },
          { text: '两年', pinyin: 'liǎng nián', role: 'complement' },
          { text: '中文', pinyin: 'zhōng wén', role: 'objet' },
          { text: '了', pinyin: 'le', role: 'particule' }
        ],
        fr: [
          { text: 'J\'étudie', role: 'verbe' },
          { text: 'le chinois', role: 'objet' },
          { text: 'depuis 2 ans', role: 'complement' }
        ],
        note: 'DOUBLE 了 → action toujours EN COURS (j\'étudie depuis 2 ans, je continue encore).'
      }
    ],
    tip:
      'Le second 了 (final) garde le compteur ouvert. Sans lui, le compteur est arrêté. C\'est la nuance la plus difficile pour un francophone — l\'oeil doit chercher s\'il y a un 了 à la toute fin.',
    tipEn:
      'The second 了 (final) keeps the clock running. Without it, the clock has stopped. Hardest nuance for English speakers — the eye must check if there\'s a 了 at the very end.'
  }
];

// --- cecr-b11-le-m3 — 了 récap --------------------------------------------
export const b11LeRecapLearnSections: LessonV2LearnSection[] = [
  {
    id: 'b11-le-recap-positions',
    title: '3 positions → 3 sens',
    titleEn: '3 positions → 3 meanings',
    body:
      'Carte mentale à graver : **3 positions, 3 sens**. La position du 了 change tout.\n' +
      '\n' +
      'Les trois cas :\n' +
      '- **V + 了 + O** → perfectif, action accomplie : 我吃了饭\n' +
      '- **Phrase + 了** (final) → changement d\'état : 下雨了\n' +
      '- **V + 了 + quantité + 了** → action qui continue : 我学了两年中文了\n' +
      '\n' +
      'Attention : l\'inversion « V了O了 » est la seule vraiment ambiguë et se lit au contexte.',
    bodyEn:
      'Fridge-worthy mental map. (1) V + 了 + O = perfective, completed action: 我吃了饭. (2) Sentence + 了 (final) = state change: 下雨了. (3) V + 了 + quantity + 了 = ongoing action: 我学了两年中文了. Position is everything — the "V了O了" merge is the only truly ambiguous one and needs context.',
    items: [
      { hanzi: '了', pinyin: 'le', meaning: 'particule 了', meaningEn: '了 particle', audio: 'audio/hsk1/hsk1_了.wav' },
      { hanzi: '没', pinyin: 'méi', meaning: 'négation du passé', meaningEn: 'past negation', audio: 'audio/hsk1/hsk1_没.wav' },
      { hanzi: '不', pinyin: 'bù', meaning: 'négation du présent', meaningEn: 'present negation', audio: 'audio/hsk1/hsk1_不.wav' },
      { hanzi: '还没', pinyin: 'hái méi', meaning: 'pas encore', meaningEn: 'not yet', audio: 'audio/hsk2/hsk2_还.wav' },
      { hanzi: '刚才', pinyin: 'gāng cái', meaning: 'à l\'instant', meaningEn: 'just now', audio: 'audio/hsk3/hsk3_刚才.wav' }
    ],
    tip:
      'Habitudes = JAMAIS 了. 我每天六点起床 ✓, 我每天六点起了床 ✗. Le 了 est réservé aux événements ponctuels ou aux changements, pas aux routines.',
    tipEn:
      'Habits = NEVER 了. 我每天六点起床 ✓, 我每天六点起了床 ✗. 了 is reserved for one-off events or changes, not routines.'
  }
];

// --- cecr-b11-ba-m1 — 把 construction ------------------------------------
export const b11BaUsageLearnSections: LessonV2LearnSection[] = [
  {
    id: 'b11-ba-skeleton',
    title: 'S + 把 + OBJET + V + complément',
    titleEn: 'S + 把 + OBJECT + V + complement',
    body:
      'La construction 把 déplace l\'**objet devant le verbe** pour insister sur ce qu\'il advient à cet objet. L\'objet doit être connu/spécifique (pas un générique).\n' +
      '\n' +
      'RÈGLE D\'OR : le verbe ne peut **jamais** être nu — il doit être complété par 了, un résultatif, une direction ou une quantité.',
    bodyEn:
      'The 把 construction moves the object BEFORE the verb to stress what HAPPENS to that object. The object must be known/specific (not a generic). And the verb can NEVER be bare: it must be "completed" by 了, a resultative, a direction, or a quantity.',
    items: [
      { hanzi: '把', pinyin: 'bǎ', meaning: 'particule de disposition', meaningEn: 'disposal marker', audio: 'audio/hsk3/hsk3_把.wav' },
      { hanzi: '放', pinyin: 'fàng', meaning: 'poser, placer', meaningEn: 'put, place', audio: 'audio/hsk3/hsk3_放.wav' },
      { hanzi: '放在', pinyin: 'fàng zài', meaning: 'placer à', meaningEn: 'put at', audio: 'audio/hsk3/hsk3_放.wav' },
      { hanzi: '拿走', pinyin: 'ná zǒu', meaning: 'emporter', meaningEn: 'take away', audio: 'audio/hsk3/hsk3_拿.wav' },
      { hanzi: '送给', pinyin: 'sòng gěi', meaning: 'offrir à', meaningEn: 'give to', audio: 'audio/hsk2/hsk2_送.wav' }
    ],
    tip:
      'Question à se poser avant de choisir 把 : est-ce que je veux insister sur le RÉSULTAT/DEVENIR de l\'objet ? Si oui → 把. Si c\'est juste une description neutre → ordre SVO classique.',
    tipEn:
      'Ask yourself before picking 把: am I stressing the RESULT/fate of the object? If yes → 把. If it\'s a neutral description → classic SVO order.'
  },
  {
    id: 'b11-ba-tokens',
    title: 'Structure visuelle : 把 déplace l\'objet AVANT le verbe',
    titleEn: 'Visual structure: 把 moves the object BEFORE the verb',
    body:
      'Compare la phrase neutre SVO avec sa version 把 : l\'objet (vert) saute **avant** le verbe (orange), encadré par la particule 把.',
    bodyEn:
      'Compare the neutral SVO sentence with its 把 version: the object (green) jumps BEFORE the verb (orange), bracketed by the 把 particle.',
    tokenizedSentences: [
      {
        zh: [
          { text: '我', pinyin: 'wǒ', role: 'sujet' },
          { text: '放', pinyin: 'fàng', role: 'verbe' },
          { text: '书', pinyin: 'shū', role: 'objet' },
          { text: '在桌上', pinyin: 'zài zhuō shàng', role: 'lieu' }
        ],
        fr: [
          { text: 'Je', role: 'sujet' },
          { text: 'mets', role: 'verbe' },
          { text: 'le livre', role: 'objet' },
          { text: 'sur la table', role: 'lieu' }
        ],
        note: 'Version SVO neutre. Le verbe 放 est nu — peu naturel à l\'oral pour exprimer un placement précis.'
      },
      {
        zh: [
          { text: '我', pinyin: 'wǒ', role: 'sujet' },
          { text: '把', pinyin: 'bǎ', role: 'particule' },
          { text: '书', pinyin: 'shū', role: 'objet' },
          { text: '放', pinyin: 'fàng', role: 'verbe' },
          { text: '在桌上', pinyin: 'zài zhuō shàng', role: 'complement' }
        ],
        fr: [
          { text: 'J\'ai', role: 'sujet' },
          { text: 'posé', role: 'verbe' },
          { text: 'le livre', role: 'objet' },
          { text: 'sur la table', role: 'complement' }
        ],
        note: 'Version 把 : objet 书 transféré AVANT le verbe, encadré par 把. Le verbe 放 est ENRICHI d\'un complément 在桌上 — c\'est obligatoire avec 把.'
      },
      {
        zh: [
          { text: '他', pinyin: 'tā', role: 'sujet' },
          { text: '把', pinyin: 'bǎ', role: 'particule' },
          { text: '那个苹果', pinyin: 'nà ge píngguǒ', role: 'objet' },
          { text: '吃', pinyin: 'chī', role: 'verbe' },
          { text: '了', pinyin: 'le', role: 'complement' }
        ],
        fr: [
          { text: 'Il', role: 'sujet' },
          { text: 'a mangé', role: 'verbe' },
          { text: 'cette pomme-là', role: 'objet' }
        ],
        note: 'Insistance sur le devenir : la pomme N\'EST PLUS LÀ (吃了 = entièrement mangée). 那个 (cette… là) signale qu\'elle est spécifique — 把 exige un objet connu.'
      }
    ],
    tip:
      'Repère graphique : dans la phrase 把, le rouge (sujet) → violet (把) → vert (objet) → orange (verbe) → turquoise (complément). Toujours dans cet ordre.',
    tipEn:
      'Visual cue: in 把 sentences, red (subject) → purple (把) → green (object) → orange (verb) → teal (complement). Always in this order.'
  }
];

// --- cecr-b11-ba-m2 — 5 compléments de 把 ---------------------------------
export const b11BaComplementsLearnSections: LessonV2LearnSection[] = [
  {
    id: 'b11-ba-5-complements',
    title: 'Les 5 types de compléments qui débloquent 把',
    titleEn: 'The 5 complements that unlock 把',
    body:
      'Sans complément, 把 est agrammatical. Cinq types débloquent la construction :\n' +
      '\n' +
      '- **Lieu** : 放在桌上 (poser sur la table)\n' +
      '- **Bénéficiaire** : 给我 (à moi)\n' +
      '- **Résultatif** : 吃完, 写好, 洗干净\n' +
      '- **Direction** : 拿起来, 送过去\n' +
      '- **Quantité / redoublement** : 看一下, 想了想\n' +
      '\n' +
      'Attention : la négation 没 se place **avant** 把, jamais après.',
    bodyEn:
      'Without a complement, 把 is ungrammatical. (1) Location: 放在桌上. (2) Beneficiary: 给我. (3) Resultative: 吃完, 写好, 洗干净. (4) Direction: 拿起来, 送过去. (5) Quantity/reduplication: 看一下, 想了想. Negation 没 goes BEFORE 把, never after.',
    items: [
      { hanzi: '吃完', pinyin: 'chī wán', meaning: 'finir de manger', meaningEn: 'finish eating', audio: 'audio/hsk2/hsk2_完.wav' },
      { hanzi: '做好', pinyin: 'zuò hǎo', meaning: 'avoir fini (bien) de faire', meaningEn: 'get done (well)', audio: 'audio/hsk1/hsk1_做.wav' },
      { hanzi: '洗干净', pinyin: 'xǐ gān jìng', meaning: 'laver proprement', meaningEn: 'wash clean', audio: 'audio/hsk3/hsk3_干净.wav' },
      { hanzi: '打扫', pinyin: 'dǎ sǎo', meaning: 'faire le ménage', meaningEn: 'clean up', audio: 'audio/hsk3/hsk3_打扫.wav' },
      { hanzi: '完成', pinyin: 'wán chéng', meaning: 'achever', meaningEn: 'complete', audio: 'audio/hsk3/hsk3_完成.wav' }
    ],
    tip:
      'Mnémo : résultatif = « verbe + adjectif/verbe-résultat ». 吃 (manger) + 完 (fini) = 吃完 (finir de manger). Cette composition permet à 把 de respirer.',
    tipEn:
      'Mnemonic: resultative = "verb + adjective/result verb". 吃 (eat) + 完 (done) = 吃完 (finish eating). This composition lets 把 breathe.'
  },
  {
    id: 'b11-ba-complements-tokens',
    title: 'Structure visuelle : verbe + complément obligatoire',
    titleEn: 'Visual structure: verb + mandatory complement',
    body:
      'Le verbe (orange) doit **toujours** être suivi d\'un complément (turquoise) dans une phrase 把. Sans complément, la phrase est ungrammatical.',
    bodyEn:
      'The verb (orange) must ALWAYS be followed by a complement (teal) in a 把 sentence. Without it, the sentence is ungrammatical.',
    tokenizedSentences: [
      {
        zh: [
          { text: '我', pinyin: 'wǒ', role: 'sujet' },
          { text: '把', pinyin: 'bǎ', role: 'particule' },
          { text: '饭', pinyin: 'fàn', role: 'objet' },
          { text: '吃', pinyin: 'chī', role: 'verbe' },
          { text: '完', pinyin: 'wán', role: 'complement' },
          { text: '了', pinyin: 'le', role: 'particule' }
        ],
        fr: [
          { text: 'J\'ai', role: 'sujet' },
          { text: 'fini', role: 'complement' },
          { text: 'mon repas', role: 'objet' }
        ],
        note: 'Complément résultatif 完 (= « jusqu\'au bout »). Sans 完, on ne pourrait pas dire 我把饭吃了 — ce serait bancal.'
      },
      {
        zh: [
          { text: '她', pinyin: 'tā', role: 'sujet' },
          { text: '把', pinyin: 'bǎ', role: 'particule' },
          { text: '衣服', pinyin: 'yīfu', role: 'objet' },
          { text: '洗', pinyin: 'xǐ', role: 'verbe' },
          { text: '干净', pinyin: 'gān jìng', role: 'complement' },
          { text: '了', pinyin: 'le', role: 'particule' }
        ],
        fr: [
          { text: 'Elle', role: 'sujet' },
          { text: 'a lavé', role: 'verbe' },
          { text: 'les vêtements', role: 'objet' },
          { text: 'à fond', role: 'complement' }
        ],
        note: 'Résultatif 干净 (= « propre »). Ça décrit l\'ÉTAT FINAL de l\'objet après le verbe.'
      }
    ],
    tip:
      'Vérifier ta phrase 把 : après le verbe, est-ce qu\'il y a UN des 5 ? (lieu / bénéficiaire / résultatif / direction / quantité). Si non, 把 est invalide.',
    tipEn:
      'Check your 把 sentence: after the verb, is there ONE of the 5? (location / beneficiary / resultative / direction / quantity). If not, 把 is invalid.'
  }
];

// --- cecr-b11-bei-m1 — passif 被 -----------------------------------------
export const b11BeiPassiveLearnSections: LessonV2LearnSection[] = [
  {
    id: 'b11-bei-skeleton',
    title: 'OBJET + 被 + (agent) + V + complément',
    titleEn: 'OBJECT + 被 + (agent) + V + complement',
    body:
      '被 est le **miroir de 把** — l\'objet (celui qui subit) passe en tête, puis 被, puis un agent facultatif, puis le verbe avec complément obligatoire.\n' +
      '\n' +
      'Deux cas typiques :\n' +
      '- 杯子被打破了 (le verre a été cassé — agent **omis**)\n' +
      '- 我被老师批评了 (j\'ai été grondé par le prof — agent **présent**)\n' +
      '\n' +
      'RÈGLE D\'OR : comme 把, **jamais de verbe nu** après 被.',
    bodyEn:
      '被 mirrors 把: the object (the one UNDERGOING) moves up front, then 被, then an optional agent, then the verb with a mandatory complement. 杯子被打破了 (the glass got broken) — agent omitted. 我被老师批评了 (I got told off by the teacher) — agent present. Like 把, no bare verb after 被.',
    items: [
      { hanzi: '被', pinyin: 'bèi', meaning: 'particule passive', meaningEn: 'passive marker', audio: 'audio/hsk3/hsk3_被.wav' },
      { hanzi: '打破', pinyin: 'dǎ pò', meaning: 'briser', meaningEn: 'break', audio: 'audio/hsk2/hsk2_打.wav' },
      { hanzi: '批评', pinyin: 'pī píng', meaning: 'critiquer', meaningEn: 'criticize', audio: 'audio/hsk4/hsk4_批评.wav' },
      { hanzi: '骂', pinyin: 'mà', meaning: 'gronder, insulter', meaningEn: 'scold', audio: 'audio/hsk4/hsk4_骂.wav' },
      { hanzi: '抓住', pinyin: 'zhuā zhù', meaning: 'attraper', meaningEn: 'catch', audio: 'audio/hsk4/hsk4_抓.wav' }
    ],
    tip:
      'Nuance culturelle : 被 garde en chinois moderne une charge NÉGATIVE (malheur subi). 他被老师表扬了 sonne étrange — on préfèrera 老师表扬了他. Pour les bonnes nouvelles, revient à l\'actif.',
    tipEn:
      'Cultural nuance: 被 keeps a NEGATIVE tint in modern Chinese (misfortune suffered). 他被老师表扬了 sounds off — prefer 老师表扬了他. For good news, go active.'
  },
  {
    id: 'b11-bei-tokens',
    title: 'Structure visuelle : 被 inverse l\'agent et le patient',
    titleEn: 'Visual structure: 被 swaps agent and patient',
    body:
      'Compare la phrase active avec sa version passive 被. Le **patient** (celui qui subit, vert) passe en **tête** de phrase. L\'agent (rouge), s\'il est mentionné, vient après 被.',
    bodyEn:
      'Compare the active sentence with its 被 passive. The PATIENT (the one undergoing, green) moves to the FRONT. The agent (red), if mentioned, comes after 被.',
    tokenizedSentences: [
      {
        zh: [
          { text: '老师', pinyin: 'lǎoshī', role: 'sujet' },
          { text: '批评', pinyin: 'pī píng', role: 'verbe' },
          { text: '了', pinyin: 'le', role: 'particule' },
          { text: '我', pinyin: 'wǒ', role: 'objet' }
        ],
        fr: [
          { text: 'Le prof', role: 'sujet' },
          { text: 'm\'', role: 'objet' },
          { text: 'a grondé', role: 'verbe' }
        ],
        note: 'Version ACTIVE neutre. Sujet 老师 = celui qui agit.'
      },
      {
        zh: [
          { text: '我', pinyin: 'wǒ', role: 'objet' },
          { text: '被', pinyin: 'bèi', role: 'particule' },
          { text: '老师', pinyin: 'lǎoshī', role: 'sujet' },
          { text: '批评', pinyin: 'pī píng', role: 'verbe' },
          { text: '了', pinyin: 'le', role: 'particule' }
        ],
        fr: [
          { text: 'J\'ai été', role: 'objet' },
          { text: 'grondé', role: 'verbe' },
          { text: 'par le prof', role: 'sujet' }
        ],
        note: 'Version PASSIVE. Le patient 我 (que je suis) passe en tête. L\'agent 老师 reste mentionné après 被.'
      },
      {
        zh: [
          { text: '杯子', pinyin: 'bēizi', role: 'objet' },
          { text: '被', pinyin: 'bèi', role: 'particule' },
          { text: '打破', pinyin: 'dǎ pò', role: 'verbe' },
          { text: '了', pinyin: 'le', role: 'particule' }
        ],
        fr: [
          { text: 'Le verre', role: 'objet' },
          { text: 'a été cassé', role: 'verbe' }
        ],
        note: 'Agent OMIS : on ne sait pas (ou on s\'en fiche) QUI a cassé. C\'est l\'usage le plus fréquent de 被. Note 打破 = complément résultatif obligatoire (jamais 打 nu).'
      }
    ],
    tip:
      'Mémoire visuelle : dans 被, le vert (objet/patient) saute À GAUCHE, le rouge (sujet/agent) descend À DROITE après la particule violette 被. Symétrie miroir avec 把.',
    tipEn:
      'Visual memory: in 被, green (object/patient) jumps LEFT, red (subject/agent) goes RIGHT after the purple 被. Mirror image of 把.'
  }
];

// --- cecr-b11-de-m1 — 的 liaison -----------------------------------------
export const b11DeLinkLearnSections: LessonV2LearnSection[] = [
  {
    id: 'b11-de-link-functions',
    title: '的 pointe TOUJOURS vers un nom',
    titleEn: '的 ALWAYS points to a noun',
    body:
      'Quatre usages, une seule règle : ce qui suit 的 est **toujours un nom**.\n' +
      '\n' +
      'Les quatre cas :\n' +
      '- **Possessif** : 我的书 (mon livre)\n' +
      '- **Adjectif long + nom** : 漂亮的女孩 (la jolie fille)\n' +
      '- **Proposition relative** : 我买的书 (le livre que j\'ai acheté)\n' +
      '- **Nominalisation** : 红的 (le rouge)\n' +
      '\n' +
      'Exception : omission avec la famille / amis proches — 我妈, 我哥, 我朋友.',
    bodyEn:
      '4 uses, 1 rule: whatever follows 的 is a noun. (1) Possessive: 我的书. (2) Long adj + noun: 漂亮的女孩. (3) Relative clause: 我买的书 (the book I bought). (4) Nominalisation: 红的 (the red one). Omit with close family/friends: 我妈, 我哥, 我朋友.',
    items: [
      { hanzi: '的', pinyin: 'de', meaning: 'particule 的', meaningEn: '的 particle', audio: 'audio/hsk1/hsk1_的.wav' },
      { hanzi: '我的', pinyin: 'wǒ de', meaning: 'le mien / mon', meaningEn: 'mine / my', audio: 'audio/hsk1/hsk1_我.wav' },
      { hanzi: '他的', pinyin: 'tā de', meaning: 'le sien / son', meaningEn: 'his / his', audio: 'audio/hsk1/hsk1_他.wav' },
      { hanzi: '漂亮', pinyin: 'piào liang', meaning: 'joli', meaningEn: 'pretty', audio: 'audio/hsk1/hsk1_漂亮.wav' },
      { hanzi: '红', pinyin: 'hóng', meaning: 'rouge', meaningEn: 'red', audio: 'audio/hsk2/hsk2_红.wav' }
    ],
    tip:
      'Adjectifs monosyllabiques courants (小, 大, 好) : PAS de 的 entre adj et nom. 好朋友 ✓, 好的朋友 (grammaticalement OK mais plus précieux).',
    tipEn:
      'Common monosyllabic adjectives (小, 大, 好): NO 的 between adj and noun. 好朋友 ✓, 好的朋友 (grammatical but fussier).'
  }
];

// --- cecr-b11-de-m2 — 地 adverbe -----------------------------------------
export const b11DeAdvLearnSections: LessonV2LearnSection[] = [
  {
    id: 'b11-di-adv-structure',
    title: '地 transforme un adjectif en adverbe',
    titleEn: '地 turns an adjective into an adverb',
    body:
      'Prononcé « de » (pas « dì »), 地 se glisse entre un adjectif et un verbe : **adjectif + 地 + V**.\n' +
      '\n' +
      'Deux patterns :\n' +
      '- Monosyllabiques redoublés : 慢慢地走, 好好地学\n' +
      '- Dissyllabiques tels quels : 认真地工作, 安静地看\n' +
      '\n' +
      'RÈGLE D\'OR : comme pour 的, c\'est une règle de **pointage** — 地 pointe toujours vers un verbe.',
    bodyEn:
      'Pronounced "de" (not "dì"), 地 slots between an adjective and a verb: adjective + 地 + V. Double monosyllabics (慢慢地走, 好好地学), keep dissyllabics as-is (认真地工作, 安静地看). Like 的, pointing rule: 地 ALWAYS points to a verb.',
    items: [
      { hanzi: '地', pinyin: 'de', meaning: 'particule adverbiale', meaningEn: 'adverbial particle', audio: 'audio/hsk3/hsk3_地.wav' },
      { hanzi: '慢慢', pinyin: 'màn màn', meaning: 'lentement', meaningEn: 'slowly', audio: 'audio/hsk3/hsk3_慢.wav' },
      { hanzi: '认真', pinyin: 'rèn zhēn', meaning: 'sérieusement', meaningEn: 'seriously', audio: 'audio/hsk3/hsk3_认真.wav' },
      { hanzi: '安静', pinyin: 'ān jìng', meaning: 'tranquillement', meaningEn: 'quietly', audio: 'audio/hsk3/hsk3_安静.wav' },
      { hanzi: '努力', pinyin: 'nǔ lì', meaning: 'avec effort', meaningEn: 'diligently', audio: 'audio/hsk3/hsk3_努力.wav' }
    ],
    tip:
      'Piège : à l\'écrit décontracté (forums, WeChat), les natifs écrivent souvent 的 à la place de 地. C\'est toléré mais incorrect en rédaction formelle.',
    tipEn:
      'Trap: in casual writing (forums, WeChat), natives often type 的 for 地. Tolerated but incorrect in formal writing.'
  }
];

// --- cecr-b11-de-m3 — 得 complément --------------------------------------
export const b11DeComplementLearnSections: LessonV2LearnSection[] = [
  {
    id: 'b11-de-complement-rule',
    title: 'V + 得 + évaluation',
    titleEn: 'V + 得 + evaluation',
    body:
      '得 vient **après** le verbe et introduit un jugement sur la manière ou l\'intensité.\n' +
      '\n' +
      'Exemples typiques :\n' +
      '- 他跑得很快 (il court vite)\n' +
      '- 她唱得好 (elle chante bien)\n' +
      '- 我说得不清楚 (je ne parle pas clairement)\n' +
      '\n' +
      'Astuce : si un objet suit le verbe, on le **duplique** (他说汉语说得很好) ou on le met en **tête** (他汉语说得很好).',
    bodyEn:
      '得 comes AFTER the verb and introduces a judgment on manner or intensity. 他跑得很快 (he runs fast). 她唱得好 (she sings well). 我说得不清楚 (I speak unclearly). If there\'s an object after the verb, you either duplicate: 他说汉语说得很好 — or front it: 他汉语说得很好.',
    items: [
      { hanzi: '得', pinyin: 'de', meaning: 'particule d\'évaluation', meaningEn: 'evaluative particle', audio: 'audio/hsk1/hsk1_得.wav' },
      { hanzi: '跑', pinyin: 'pǎo', meaning: 'courir', meaningEn: 'run', audio: 'audio/hsk2/hsk2_跑.wav' },
      { hanzi: '唱', pinyin: 'chàng', meaning: 'chanter', meaningEn: 'sing', audio: 'audio/hsk3/hsk3_唱.wav' },
      { hanzi: '写', pinyin: 'xiě', meaning: 'écrire', meaningEn: 'write', audio: 'audio/hsk1/hsk1_写.wav' },
      { hanzi: '怎么样', pinyin: 'zěn me yàng', meaning: 'comment (qualité)', meaningEn: 'how (quality)', audio: 'audio/hsk1/hsk1_怎么样.wav' }
    ],
    tip:
      'Question : V + 得 + 怎么样 ? (他跑得怎么样 ? = il court comment ?). Négation : V + 得 + 不 + adj (我睡得不好 = j\'ai mal dormi).',
    tipEn:
      'Question: V + 得 + 怎么样? (他跑得怎么样? = how does he run?). Negation: V + 得 + 不 + adj (我睡得不好 = I slept badly).'
  }
];

// --- cecr-b11-de-m4 — tri 的/地/得 --------------------------------------
export const b11DeSortingLearnSections: LessonV2LearnSection[] = [
  {
    id: 'b11-de-sorting-heuristic',
    title: 'L\'heuristique infaillible',
    titleEn: 'The foolproof heuristic',
    body:
      'Trois questions à se poser dans l\'ordre. Applique cette grille et **95 %** des cas tombent.\n' +
      '\n' +
      'L\'arbre de décision :\n' +
      '- Ce qui **suit** est un nom ? → 的 (我的书, 漂亮的女孩)\n' +
      '- Ce qui **suit** est un verbe ? → 地 (慢慢地走)\n' +
      '- Ce qui **précède** est un verbe suivi d\'une évaluation ? → 得 (跑得快)\n' +
      '\n' +
      'RÈGLE D\'OR : applique toujours dans cet ordre — la première qui matche gagne.',
    bodyEn:
      'Three questions, one answer. (1) What FOLLOWS is a noun? → 的 (我的书, 漂亮的女孩). (2) What FOLLOWS is a verb? → 地 (慢慢地走). (3) What PRECEDES is a verb followed by an evaluation? → 得 (跑得快). Apply in order and 95% of cases fall into place.',
    items: [
      { hanzi: '的', pinyin: 'de', meaning: 'vers un nom', meaningEn: 'to a noun', audio: 'audio/hsk1/hsk1_的.wav' },
      { hanzi: '地', pinyin: 'de', meaning: 'vers un verbe', meaningEn: 'to a verb', audio: 'audio/hsk3/hsk3_地.wav' },
      { hanzi: '得', pinyin: 'de', meaning: 'après un verbe', meaningEn: 'after a verb', audio: 'audio/hsk1/hsk1_得.wav' }
    ],
    tip:
      'À l\'oral, les trois sonnent identiques (« de »). Ton cerveau doit décider sur la syntaxe, pas sur le son. Entraîne-toi avec des phrases écrites avant de passer à l\'écoute.',
    tipEn:
      'Orally, all three sound the same ("de"). Your brain must decide on syntax, not sound. Train on written sentences before listening drills.'
  },
  {
    id: 'b11-de-sorting-tokens',
    title: 'Structure visuelle : où pointent les 3 « de » ?',
    titleEn: 'Visual structure: where do the 3 «de» point?',
    body:
      'Une fois la syntaxe **visualisée**, plus jamais de confusion à l\'écrit entre les trois 的/地/得.\n' +
      '\n' +
      'Chaque « de » a sa cible :\n' +
      '- 的 (rose, **modificateur**) — pointe vers un nom (vert, objet)\n' +
      '- 地 (rose, **modificateur**) — pointe vers un verbe (orange)\n' +
      '- 得 (violet, **particule**) — vient APRÈS un verbe et introduit un complément (turquoise)\n' +
      '\n' +
      'RÈGLE D\'OR : repérer d\'abord le **mot qui suit** le « de » — nom, verbe ou complément — et la bonne graphie tombe d\'elle-même.',
    bodyEn:
      '的 (pink-modifier) points to a noun (green-object). 地 (pink-modifier) points to a verb (orange). 得 (purple-particle) comes AFTER a verb and introduces a complement (teal). Once you see the syntax, no more confusion in writing.',
    tokenizedSentences: [
      {
        zh: [
          { text: '我', pinyin: 'wǒ', role: 'modificateur' },
          { text: '的', pinyin: 'de', role: 'particule' },
          { text: '书', pinyin: 'shū', role: 'objet' }
        ],
        fr: [
          { text: 'mon', role: 'modificateur' },
          { text: 'livre', role: 'objet' }
        ],
        note: '的 : Modificateur + 的 → Nom. Pointe à droite.'
      },
      {
        zh: [
          { text: '他', pinyin: 'tā', role: 'sujet' },
          { text: '慢慢', pinyin: 'màn màn', role: 'modificateur' },
          { text: '地', pinyin: 'de', role: 'particule' },
          { text: '走', pinyin: 'zǒu', role: 'verbe' }
        ],
        fr: [
          { text: 'Il', role: 'sujet' },
          { text: 'marche', role: 'verbe' },
          { text: 'lentement', role: 'modificateur' }
        ],
        note: '地 : Adverbe + 地 → Verbe. Pointe à droite vers le verbe.'
      },
      {
        zh: [
          { text: '他', pinyin: 'tā', role: 'sujet' },
          { text: '跑', pinyin: 'pǎo', role: 'verbe' },
          { text: '得', pinyin: 'de', role: 'particule' },
          { text: '很快', pinyin: 'hěn kuài', role: 'complement' }
        ],
        fr: [
          { text: 'Il', role: 'sujet' },
          { text: 'court', role: 'verbe' },
          { text: 'vite', role: 'complement' }
        ],
        note: '得 : Verbe + 得 → Complément d\'évaluation. Pointe à gauche (vers le verbe) et à droite (vers l\'évaluation).'
      }
    ],
    tip:
      'Récap des flèches : 的→ Nom | 地→ Verbe | Verbe →得→ Évaluation. Question à se poser : ce qui suit/précède est un mot de quel type ?',
    tipEn:
      'Arrow recap: 的→ Noun | 地→ Verb | Verb →得→ Evaluation. Ask yourself: what follows/precedes — what type of word?'
  }
];

// --- cecr-b11-shide-m1 — 是…的 -------------------------------------------
export const b11ShideLearnSections: LessonV2LearnSection[] = [
  {
    id: 'b11-shide-focus',
    title: '是…的 met en relief un circonstant PASSÉ',
    titleEn: '是…的 highlights a PAST circumstance',
    body:
      'Structure : **S + 是 + circonstant + V + 的** (où le circonstant précise quand / où / comment / avec qui). On ne remet pas en cause l\'action, on pointe l\'élément précis.\n' +
      '\n' +
      'Exemples typiques :\n' +
      '- 我是昨天来的 (c\'est **hier** que je suis venu — pas un autre jour)\n' +
      '- 她是坐飞机来的 (c\'est **en avion** qu\'elle est venue)\n' +
      '\n' +
      'RÈGLE D\'OR : usage **uniquement** pour un événement passé et connu. Pour le futur ou une action toute neuve, utilise 了 ou rien.',
    bodyEn:
      'S + 是 + circumstance (when/where/how/with whom) + V + 的. 我是昨天来的 (it\'s YESTERDAY I came — not another day). You don\'t doubt the coming, you point to a specific detail. Only for past and known events. For future or brand-new actions, use 了 or nothing.',
    items: [
      { hanzi: '是', pinyin: 'shì', meaning: 'être / focaliseur', meaningEn: 'be / focus', audio: 'audio/hsk1/hsk1_是.wav' },
      { hanzi: '昨天', pinyin: 'zuó tiān', meaning: 'hier', meaningEn: 'yesterday', audio: 'audio/hsk1/hsk1_昨天.wav' },
      { hanzi: '坐飞机', pinyin: 'zuò fēi jī', meaning: 'prendre l\'avion', meaningEn: 'fly', audio: 'audio/hsk1/hsk1_飞机.wav' },
      { hanzi: '怎么', pinyin: 'zěn me', meaning: 'comment', meaningEn: 'how', audio: 'audio/hsk1/hsk1_怎么.wav' },
      { hanzi: '跟谁', pinyin: 'gēn shuí', meaning: 'avec qui', meaningEn: 'with whom', audio: 'audio/hsk3/hsk3_跟.wav' }
    ],
    tip:
      'Objet : 2 positions possibles. V + O + 的 (我是在上海学中文的) ou V + 的 + O (我是在上海学的中文). Les deux sont corrects, la seconde est plus courante à Pékin.',
    tipEn:
      'Object: 2 possible slots. V + O + 的 (我是在上海学中文的) or V + 的 + O (我是在上海学的中文). Both OK, the second is more common in Beijing.'
  },
  {
    id: 'b11-shide-tokens',
    title: 'Structure visuelle : 是…的 encadre le focus',
    titleEn: 'Visual structure: 是…的 frames the focus',
    body:
      '是…的 forme une **pince** autour de l\'élément circonstanciel mis en relief. Tout ce qui est entre 是 et 的 est l\'info nouvelle, ce sur quoi on insiste.',
    bodyEn:
      '是…的 forms a FRAME around the circumstantial element being highlighted. Whatever sits BETWEEN 是 and 的 is the new info, the focus point.',
    tokenizedSentences: [
      {
        zh: [
          { text: '我', pinyin: 'wǒ', role: 'sujet' },
          { text: '是', pinyin: 'shì', role: 'particule' },
          { text: '昨天', pinyin: 'zuó tiān', role: 'temps' },
          { text: '来', pinyin: 'lái', role: 'verbe' },
          { text: '的', pinyin: 'de', role: 'particule' }
        ],
        fr: [
          { text: 'C\'est', role: 'particule' },
          { text: 'hier', role: 'temps' },
          { text: 'que je', role: 'sujet' },
          { text: 'suis venu', role: 'verbe' }
        ],
        note: 'FOCUS sur le TEMPS : 昨天 entre 是 et 的. On précise QUAND, pas QUE.'
      },
      {
        zh: [
          { text: '她', pinyin: 'tā', role: 'sujet' },
          { text: '是', pinyin: 'shì', role: 'particule' },
          { text: '坐飞机', pinyin: 'zuò fēi jī', role: 'modificateur' },
          { text: '来', pinyin: 'lái', role: 'verbe' },
          { text: '的', pinyin: 'de', role: 'particule' }
        ],
        fr: [
          { text: 'C\'est', role: 'particule' },
          { text: 'en avion', role: 'modificateur' },
          { text: 'qu\'elle', role: 'sujet' },
          { text: 'est venue', role: 'verbe' }
        ],
        note: 'FOCUS sur le MOYEN : 坐飞机 entre 是 et 的. On précise COMMENT.'
      },
      {
        zh: [
          { text: '他', pinyin: 'tā', role: 'sujet' },
          { text: '是', pinyin: 'shì', role: 'particule' },
          { text: '跟朋友', pinyin: 'gēn péng you', role: 'modificateur' },
          { text: '一起去', pinyin: 'yī qǐ qù', role: 'verbe' },
          { text: '的', pinyin: 'de', role: 'particule' }
        ],
        fr: [
          { text: 'C\'est', role: 'particule' },
          { text: 'avec des amis', role: 'modificateur' },
          { text: 'qu\'il', role: 'sujet' },
          { text: 'y est allé', role: 'verbe' }
        ],
        note: 'FOCUS sur l\'ACCOMPAGNATEUR : 跟朋友 entre 是 et 的.'
      }
    ],
    tip:
      'Test mental : remplace le contenu entre 是…的 par autre chose. Si le sens change radicalement (« hier » → « demain »), c\'est bien sur ce circonstant qu\'on insiste.',
    tipEn:
      'Mental test: replace what\'s between 是…的 with something else. If the meaning changes drastically («yesterday» → «tomorrow»), that\'s indeed what you\'re focusing on.'
  }
];

// --- cecr-b11-jiucai-m1 — 就 vs 才 --------------------------------------
export const b11JiuCaiLearnSections: LessonV2LearnSection[] = [
  {
    id: 'b11-jiucai-timing',
    title: '就 = tôt/facile | 才 = tard/difficile',
    titleEn: '就 = early/easy | 才 = late/hard',
    body:
      'Les deux adverbes livrent un **jugement** sur le timing. C\'est subjectif, pas neutre.\n' +
      '\n' +
      'Les deux usages :\n' +
      '- **就** valorise la précocité / facilité : 他六点就起床了 (debout dès 6h), 他一看就懂 (comprend au premier regard)\n' +
      '- **才** pointe le retard / effort : 他九点才起床 (pas levé avant 9h), 我学了三年才会说 (3 ans avant de savoir parler)\n' +
      '\n' +
      'RÈGLE D\'OR : 就 = **tôt/facile** | 才 = **tard/difficile**.',
    bodyEn:
      'Both adverbs render a JUDGEMENT on timing. 就 praises earliness or ease: 他六点就起床了 (up already at 6am), 他一看就懂 (gets it at a glance). 才 flags lateness or effort: 他九点才起床 (didn\'t rise until 9am), 我学了三年才会说 (3 years of study to speak).',
    items: [
      { hanzi: '就', pinyin: 'jiù', meaning: 'déjà, dès, précisément', meaningEn: 'already, as early as', audio: 'audio/hsk2/hsk2_就.wav' },
      { hanzi: '才', pinyin: 'cái', meaning: 'seulement alors, tard', meaningEn: 'only then, late', audio: 'audio/hsk3/hsk3_才.wav' },
      { hanzi: '起床', pinyin: 'qǐ chuáng', meaning: 'se lever', meaningEn: 'get up', audio: 'audio/hsk2/hsk2_起床.wav' },
      { hanzi: '懂', pinyin: 'dǒng', meaning: 'comprendre', meaningEn: 'understand', audio: 'audio/hsk2/hsk2_懂.wav' },
      { hanzi: '会', pinyin: 'huì', meaning: 'savoir faire', meaningEn: 'be able to', audio: 'audio/hsk1/hsk1_会.wav' }
    ],
    tip:
      'Règle clé : 就 + passé prend 了 (他六点就来了). 才 + passé NE PREND PAS 了 (他九点才来, JAMAIS 他九点才来了). 才 contient déjà l\'idée de parcours accompli — le 了 deviendrait redondant.',
    tipEn:
      'Key rule: 就 + past takes 了 (他六点就来了). 才 + past DOES NOT take 了 (他九点才来, NEVER 他九点才来了). 才 already encodes "made it" — 了 would be redundant.'
  }
];

// ═════════════════════════════════════════════════════════════════════════════
// Travail & carrière (cecr-b11-work)
// ═════════════════════════════════════════════════════════════════════════════

// --- cecr-b11-work-m1 — Métiers & postes --------------------------------
export const b11WorkJobsLearnSections: LessonV2LearnSection[] = [
  {
    id: 'b11-work-jobs-suffixes',
    title: 'Les suffixes 员 / 师 / 家',
    titleEn: 'The suffixes 员 / 师 / 家',
    body:
      'La plupart des métiers suivent un motif. Repère le suffixe et tu décodes le titre **avant même** d\'en connaître le sens.\n' +
      '\n' +
      'Les trois familles :\n' +
      '- **员** (yuán, membre) = exécutant : 服务员, 售货员, 销售员, 公务员\n' +
      '- **师** (shī, maître) = expert : 老师, 律师, 厨师, 医师\n' +
      '- **家** (jiā, spécialiste) = créateur : 作家 (écrivain), 画家 (peintre), 艺术家 (artiste)',
    bodyEn:
      'Most jobs follow a pattern. 员 (yuán, member) = doer: 服务员, 售货员, 销售员, 公务员. 师 (shī, master) = expert: 老师, 律师, 厨师, 医师. 家 (jiā, specialist) = creator: 作家 (writer), 画家 (painter), 艺术家 (artist). This spotting lets you decode a title before even knowing its meaning.',
    items: [
      { hanzi: '工作', pinyin: 'gōng zuò', meaning: 'travail', meaningEn: 'work', audio: 'audio/hsk1/hsk1_工作.wav' },
      { hanzi: '老板', pinyin: 'lǎo bǎn', meaning: 'patron', meaningEn: 'boss', audio: 'audio/hsk3/hsk3_老板.wav' },
      { hanzi: '经理', pinyin: 'jīng lǐ', meaning: 'manager', meaningEn: 'manager', audio: 'audio/hsk3/hsk3_经理.wav' },
      { hanzi: '同事', pinyin: 'tóng shì', meaning: 'collègue', meaningEn: 'colleague', audio: 'audio/hsk3/hsk3_同事.wav' },
      { hanzi: '律师', pinyin: 'lǜ shī', meaning: 'avocat', meaningEn: 'lawyer', audio: 'audio/hsk4/hsk4_律师.wav' },
      { hanzi: '医生', pinyin: 'yī shēng', meaning: 'médecin', meaningEn: 'doctor', audio: 'audio/hsk1/hsk1_医生.wav' }
    ],
    tip:
      'Formule « je travaille chez X » : 我在 X 工作 (action) plutôt que 我是 X 的员工 (statut). Les Chinois insistent sur l\'acte de travailler, pas sur l\'étiquette.',
    tipEn:
      '"I work at X" formula: 我在 X 工作 (action) rather than 我是 X 的员工 (status). Chinese speakers stress the act of working, not the label.'
  }
];

// --- cecr-b11-work-m2 — Réunion & agenda --------------------------------
export const b11WorkMeetingLearnSections: LessonV2LearnSection[] = [
  {
    id: 'b11-work-meeting-verbs',
    title: '开会 = « ouvrir une réunion »',
    titleEn: '开会 = "open a meeting"',
    body:
      'En chinois pro, 开会 est **le** verbe pour réunion. Le nom neutre correspondant est 会议. Attention : 有会 ne se dit pas.\n' +
      '\n' +
      'Variantes utiles :\n' +
      '- 开一个会 (tenir une réunion)\n' +
      '- 开一个小时的会 (tenir une réunion d\'une heure)\n' +
      '- 辛苦了 (clôture rituelle — « merci pour vos efforts »)',
    bodyEn:
      'In pro Chinese, 开会 is THE verb for meeting. 有会 isn\'t said. 开会 can split to insert duration or object: 开一个小时的会 (hold a one-hour meeting), 开一个会 (hold a meeting). The neutral noun is 会议. Ritual closer: 辛苦了 (lit. "you\'ve worn yourself out", thanks for your efforts).',
    items: [
      { hanzi: '会议', pinyin: 'huì yì', meaning: 'réunion (nom)', meaningEn: 'meeting (noun)', audio: 'audio/hsk3/hsk3_会议.wav' },
      { hanzi: '开会', pinyin: 'kāi huì', meaning: 'tenir une réunion', meaningEn: 'hold a meeting', audio: 'audio/hsk3/hsk3_开.wav' },
      { hanzi: '讨论', pinyin: 'tǎo lùn', meaning: 'discuter', meaningEn: 'discuss', audio: 'audio/hsk3/hsk3_讨论.wav' },
      { hanzi: '决定', pinyin: 'jué dìng', meaning: 'décider', meaningEn: 'decide', audio: 'audio/hsk3/hsk3_决定.wav' },
      { hanzi: '总结', pinyin: 'zǒng jié', meaning: 'conclure, synthétiser', meaningEn: 'wrap up', audio: 'audio/hsk5/hsk5_总结.wav' },
      { hanzi: '辛苦了', pinyin: 'xīn kǔ le', meaning: 'merci pour vos efforts', meaningEn: 'thanks for the hard work', audio: 'audio/hsk4/hsk4_辛苦.wav' }
    ],
    tip:
      '辛苦了 ne se dit pas entre amis : réservé au monde pro ou au service rendu (livreur, chauffeur, collègue). Au quotidien amical, préfère 谢谢 tout court.',
    tipEn:
      '辛苦了 is not said between friends: reserved for work or service contexts (delivery driver, taxi, colleague). In everyday friendly settings, stick to 谢谢.'
  }
];

// --- cecr-b11-work-m3 — Emails formels ----------------------------------
export const b11WorkEmailLearnSections: LessonV2LearnSection[] = [
  {
    id: 'b11-work-email-skeleton',
    title: 'La structure 称呼-正文-敬礼',
    titleEn: 'The 称呼-正文-敬礼 skeleton',
    body:
      'Un mail pro chinois suit un squelette **fixe** en quatre temps. On utilise 您 (vous) partout, **jamais** 你.\n' +
      '\n' +
      'La structure :\n' +
      '- **Ouverture** : 尊敬的 [titre] + 您好 !\n' +
      '- **Corps** : concis, un sujet par paragraphe\n' +
      '- **Pré-clôture** : 期待您的回复\n' +
      '- **Signature rituelle** : 此致 敬礼 ! + nom\n' +
      '\n' +
      'Attention : pas d\'émojis, et mieux vaut CC le 领导 (supérieur) en cas de doute.',
    bodyEn:
      'A pro Chinese email opens with 尊敬的 [title] + 您好!, develops a concise body (one topic per paragraph), closes with 期待您的回复 then the ritual signature: 此致 敬礼! + name. Use 您 (formal you) throughout, never 你. No emojis. Better to CC the 领导 (superior) when in doubt.',
    items: [
      { hanzi: '尊敬的', pinyin: 'zūn jìng de', meaning: 'cher (formel)', meaningEn: 'dear (formal)', audio: 'audio/hsk5/hsk5_尊敬.wav' },
      { hanzi: '您好', pinyin: 'nín hǎo', meaning: 'bonjour (poli)', meaningEn: 'hello (polite)', audio: 'audio/hsk2/hsk2_您.wav' },
      { hanzi: '感谢', pinyin: 'gǎn xiè', meaning: 'remercier', meaningEn: 'thank', audio: 'audio/hsk4/hsk4_感谢.wav' },
      { hanzi: '期待', pinyin: 'qī dài', meaning: 'attendre (avec impatience)', meaningEn: 'look forward to', audio: 'audio/hsk5/hsk5_期待.wav' },
      { hanzi: '回复', pinyin: 'huí fù', meaning: 'répondre', meaningEn: 'reply', audio: 'audio/hsk4/hsk4_回复.wav' },
      { hanzi: '敬礼', pinyin: 'jìng lǐ', meaning: 'salutations (fin de lettre)', meaningEn: 'yours sincerely', audio: 'audio/hsk5/hsk5_敬礼.wav' }
    ],
    tip:
      '此致 敬礼 ! est l\'équivalent exact de « veuillez recevoir mes salutations distinguées ». Figé, obligatoire dans toute correspondance professionnelle écrite.',
    tipEn:
      '此致 敬礼! is the exact equivalent of "yours faithfully/sincerely". Fixed phrase, mandatory in any written pro correspondence.'
  }
];

// --- cecr-b11-work-m4 — Entretien d'embauche ----------------------------
export const b11WorkInterviewLearnSections: LessonV2LearnSection[] = [
  {
    id: 'b11-work-interview-5q',
    title: 'Les 5 questions rituelles',
    titleEn: 'The 5 ritual questions',
    body:
      'Cinq questions reviennent presque **toujours** en entretien. Les réponses attendues sont factuelles, humbles, orientées collectif.\n' +
      '\n' +
      'Le rituel :\n' +
      '- 请自我介绍一下 (présente-toi)\n' +
      '- 你为什么想来我们公司 (pourquoi chez nous)\n' +
      '- 你的优点和缺点是什么 (forces/faiblesses)\n' +
      '- 你对薪水有什么期望 (attentes salariales)\n' +
      '- 你还有什么问题吗 (tes questions)\n' +
      '\n' +
      'Astuce : défaut cliché socialement acceptable — 我最大的缺点是太认真.',
    bodyEn:
      '请自我介绍一下 (introduce yourself), 你为什么想来我们公司 (why us), 你的优点和缺点是什么 (strengths/weaknesses), 你对薪水有什么期望 (salary expectations), 你还有什么问题吗 (your questions). Expected answers: factual, humble, team-oriented. Cliché flaw: 我最大的缺点是太认真 — socially acceptable.',
    items: [
      { hanzi: '面试', pinyin: 'miàn shì', meaning: 'entretien', meaningEn: 'interview', audio: 'audio/hsk4/hsk4_面试.wav' },
      { hanzi: '简历', pinyin: 'jiǎn lì', meaning: 'CV', meaningEn: 'résumé', audio: 'audio/hsk5/hsk5_简历.wav' },
      { hanzi: '自我介绍', pinyin: 'zì wǒ jiè shào', meaning: 'se présenter', meaningEn: 'introduce oneself', audio: 'audio/hsk3/hsk3_介绍.wav' },
      { hanzi: '优点', pinyin: 'yōu diǎn', meaning: 'qualité', meaningEn: 'strength', audio: 'audio/hsk4/hsk4_优点.wav' },
      { hanzi: '缺点', pinyin: 'quē diǎn', meaning: 'défaut', meaningEn: 'weakness', audio: 'audio/hsk4/hsk4_缺点.wav' },
      { hanzi: '经验', pinyin: 'jīng yàn', meaning: 'expérience', meaningEn: 'experience', audio: 'audio/hsk4/hsk4_经验.wav' }
    ],
    tip:
      'Code culturel : arrive 10 min en avance, tends le CV à DEUX mains, évite de trop sourire (= léger, peu sérieux en contexte pro chinois). Mentionne la stabilité à long terme : 稳定的职业发展.',
    tipEn:
      'Cultural code: arrive 10 min early, hand over résumé with BOTH hands, avoid over-smiling (= flighty in Chinese pro context). Mention long-term stability: 稳定的职业发展.'
  }
];

// ═════════════════════════════════════════════════════════════════════════════
// Voyage en Chine (cecr-b11-travel)
// ═════════════════════════════════════════════════════════════════════════════

// --- cecr-b11-travel-m1 — Réserver un train -----------------------------
export const b11TravelTrainLearnSections: LessonV2LearnSection[] = [
  {
    id: 'b11-travel-train-types',
    title: '高铁 / 动车 / 普快 — 3 gammes',
    titleEn: '高铁 / 动车 / 普快 — 3 tiers',
    body:
      'Le réseau chinois propose **trois gammes**, identifiables par la lettre devant le numéro de train.\n' +
      '\n' +
      'Les trois tiers :\n' +
      '- **高铁 (G)** : TGV, >300 km/h, moderne, cher\n' +
      '- **动车 (D)** : rapide, 200-250 km/h, confortable\n' +
      '- **普快 / 快速 / 特快 (K, T)** : classiques lents mais bon marché, parfois de nuit\n' +
      '\n' +
      'Astuce : pense aussi aux classes — 二等座 (standard), 一等座, 商务座, 硬卧 / 软卧 (couchettes nuit).',
    bodyEn:
      'The Chinese network has 3 main tiers. 高铁 (G): high-speed, >300 km/h, modern, pricey. 动车 (D): fast, 200-250 km/h, comfy. 普快/快速/特快 (K, T): classic slow trains, cheap, sometimes overnight. Classes: 二等座 (standard), 一等座, 商务座, 硬卧/软卧 (overnight sleepers).',
    items: [
      { hanzi: '高铁', pinyin: 'gāo tiě', meaning: 'TGV chinois', meaningEn: 'high-speed train', audio: 'audio/hsk4/hsk4_高铁.wav' },
      { hanzi: '动车', pinyin: 'dòng chē', meaning: 'train rapide D', meaningEn: 'D-train', audio: 'audio/hsk4/hsk4_动车.wav' },
      { hanzi: '火车', pinyin: 'huǒ chē', meaning: 'train', meaningEn: 'train', audio: 'audio/hsk2/hsk2_火车.wav' },
      { hanzi: '订票', pinyin: 'dìng piào', meaning: 'réserver un billet', meaningEn: 'book a ticket', audio: 'audio/hsk3/hsk3_票.wav' },
      { hanzi: '身份证', pinyin: 'shēn fèn zhèng', meaning: 'carte d\'identité', meaningEn: 'ID card', audio: 'audio/hsk4/hsk4_身份证.wav' },
      { hanzi: '候车厅', pinyin: 'hòu chē tīng', meaning: 'salle d\'attente', meaningEn: 'waiting room', audio: 'audio/hsk4/hsk4_候车.wav' }
    ],
    tip:
      'Les étrangers réservent sur 12306 (site officiel) avec le passeport — mais doivent souvent retirer un billet papier au guichet à la gare. Compte 15-20 min de marge avant embarquement.',
    tipEn:
      'Foreigners book on 12306 (official site) with passport — but often need to pick up a paper ticket at the station counter. Leave 15-20 min margin before boarding.'
  }
];

// --- cecr-b11-travel-m2 — À l'hôtel -------------------------------------
export const b11TravelHotelLearnSections: LessonV2LearnSection[] = [
  {
    id: 'b11-travel-hotel-checkin',
    title: '入住 / 退房 + 押金 obligatoire',
    titleEn: '入住 / 退房 + mandatory 押金',
    body:
      '入住 (rùzhù) = check-in, 退房 (tuìfáng) = check-out, généralement avant midi. À l\'arrivée, dire **我预订了…的房间** (j\'ai réservé une chambre…).\n' +
      '\n' +
      'Vocabulaire essentiel :\n' +
      '- 单人间 (simple), 双人间 (2 lits), 大床房 (lit double)\n' +
      '- 押金 (caution), 服务台 (réception)\n' +
      '\n' +
      'Attention : presque tous les hôtels chinois exigent un **押金** (dépôt de caution) de 200-500 ¥, rendu au check-out.',
    bodyEn:
      '入住 (rùzhù) = check-in. 退房 (tuìfáng) = check-out, usually before noon. On arrival: 我预订了…的房间 (I booked a … room). Almost all Chinese hotels require a 押金 (deposit) of 200-500 ¥, refunded at check-out. Room types: 单人间 (single), 双人间 (twin), 大床房 (double bed).',
    items: [
      { hanzi: '酒店', pinyin: 'jiǔ diàn', meaning: 'hôtel', meaningEn: 'hotel', audio: 'audio/hsk2/hsk2_酒店.wav' },
      { hanzi: '前台', pinyin: 'qián tái', meaning: 'réception', meaningEn: 'reception', audio: 'audio/hsk4/hsk4_前台.wav' },
      { hanzi: '入住', pinyin: 'rù zhù', meaning: 'check-in', meaningEn: 'check-in', audio: 'audio/hsk5/hsk5_入住.wav' },
      { hanzi: '退房', pinyin: 'tuì fáng', meaning: 'check-out', meaningEn: 'check-out', audio: 'audio/hsk4/hsk4_退.wav' },
      { hanzi: '押金', pinyin: 'yā jīn', meaning: 'caution', meaningEn: 'deposit', audio: 'audio/hsk5/hsk5_押金.wav' },
      { hanzi: '空调', pinyin: 'kōng tiáo', meaning: 'climatisation', meaningEn: 'air conditioning', audio: 'audio/hsk3/hsk3_空调.wav' }
    ],
    tip:
      'Pour signaler un problème : ...坏了 (…est en panne). 空调坏了, 热水坏了, 电视坏了. Formulation simple, ultra-efficace à la réception.',
    tipEn:
      'To report an issue: ...坏了 (…is broken). 空调坏了, 热水坏了, 电视坏了. Simple phrasing, maximally efficient at reception.'
  }
];

// --- cecr-b11-travel-m3 — Sites touristiques ----------------------------
export const b11TravelSitesLearnSections: LessonV2LearnSection[] = [
  {
    id: 'b11-travel-sites-top5',
    title: 'Les 5 sites incontournables',
    titleEn: 'The top 5 sites',
    body:
      'Cinq sites incontournables pour un premier voyage en Chine. Le **passeport** est souvent requis pour acheter 门票 (billet d\'entrée).\n' +
      '\n' +
      'Top 5 :\n' +
      '- **长城** (Grande Muraille — 八达岭 touristique, 慕田峪 plus calme)\n' +
      '- **故宫** (Cité Interdite, Pékin — réservation en ligne 1 jour à l\'avance)\n' +
      '- **兵马俑** (Armée de terre cuite, Xi\'an)\n' +
      '- **外滩** (Bund, Shanghai) avec 东方明珠\n' +
      '- **黄山** (Montagnes Jaunes)\n' +
      '\n' +
      'Attention : évite **周末** (week-end) et jours fériés — 人山人海 (foule extrême).',
    bodyEn:
      '长城 (Great Wall — sections 八达岭 touristy, 慕田峪 quieter), 故宫 (Forbidden City, Beijing — online booking 1 day ahead), 兵马俑 (Terracotta Army, Xi\'an), 外滩 (Bund, Shanghai) with 东方明珠, 黄山 (Yellow Mountains). Passport often needed to buy 门票. Avoid 周末 (weekends) and holidays: 人山人海.',
    items: [
      { hanzi: '长城', pinyin: 'cháng chéng', meaning: 'Grande Muraille', meaningEn: 'Great Wall', audio: 'audio/hsk4/hsk4_长城.wav' },
      { hanzi: '故宫', pinyin: 'gù gōng', meaning: 'Cité Interdite', meaningEn: 'Forbidden City', audio: 'audio/hsk5/hsk5_故宫.wav' },
      { hanzi: '门票', pinyin: 'mén piào', meaning: 'billet d\'entrée', meaningEn: 'entrance ticket', audio: 'audio/hsk4/hsk4_门票.wav' },
      { hanzi: '导游', pinyin: 'dǎo yóu', meaning: 'guide', meaningEn: 'tour guide', audio: 'audio/hsk4/hsk4_导游.wav' },
      { hanzi: '拍照', pinyin: 'pāi zhào', meaning: 'photographier', meaningEn: 'take pictures', audio: 'audio/hsk4/hsk4_拍.wav' },
      { hanzi: '纪念品', pinyin: 'jì niàn pǐn', meaning: 'souvenir', meaningEn: 'souvenir', audio: 'audio/hsk4/hsk4_纪念.wav' }
    ],
    tip:
      '人山人海 (littéralement « des gens-montagne des gens-mer ») décrit parfaitement un site touristique chinois à la fête nationale. Évite à tout prix la semaine du 1er octobre (国庆节).',
    tipEn:
      '人山人海 (lit. "people-mountain people-sea") perfectly captures a Chinese tourist site on National Day. Avoid the October 1st week (国庆节) at all costs.'
  }
];

// ═════════════════════════════════════════════════════════════════════════════
// Émotions & santé (cecr-b11-emotions-health)
// ═════════════════════════════════════════════════════════════════════════════

// --- cecr-b11-emo-m1 — Vocabulaire émotions -----------------------------
export const b11EmoVocabLearnSections: LessonV2LearnSection[] = [
  {
    id: 'b11-emo-vocab-xin',
    title: 'Le radical 忄/心 au cœur des émotions',
    titleEn: 'The 忄/心 radical at the heart of emotion',
    body:
      'La plupart des mots d\'émotion portent le radical **忄** (latéral) ou **心** (en bas) — « cœur » : 快乐, 高兴, 难过, 伤心, 担心, 害怕, 紧张, 失望. Structure : **S + 觉得 / 感到 + émotion**.\n' +
      '\n' +
      'Modulateurs d\'intensité :\n' +
      '- Intensifier : 非常, 特别\n' +
      '- Atténuer : 有点儿, 比较\n' +
      '\n' +
      'Remarque : les Chinois atténuent souvent — 有点不高兴 (« assez mécontent ») a un sous-texte **fort**.',
    bodyEn:
      'Most emotion words carry the 忄 radical (side) or 心 (bottom) — "heart". 快乐, 高兴, 难过, 伤心, 担心, 害怕, 紧张, 失望. Structure: S + 觉得/感到 + emotion. Intensify: 非常, 特别; soften: 有点儿, 比较. Chinese often softens: 有点不高兴 = quite upset (strong undertone).',
    items: [
      { hanzi: '高兴', pinyin: 'gāo xìng', meaning: 'content', meaningEn: 'happy', audio: 'audio/hsk1/hsk1_高兴.wav' },
      { hanzi: '快乐', pinyin: 'kuài lè', meaning: 'joyeux', meaningEn: 'joyful', audio: 'audio/hsk2/hsk2_快乐.wav' },
      { hanzi: '难过', pinyin: 'nán guò', meaning: 'triste', meaningEn: 'sad', audio: 'audio/hsk3/hsk3_难过.wav' },
      { hanzi: '生气', pinyin: 'shēng qì', meaning: 'en colère', meaningEn: 'angry', audio: 'audio/hsk3/hsk3_生气.wav' },
      { hanzi: '担心', pinyin: 'dān xīn', meaning: 'inquiet', meaningEn: 'worried', audio: 'audio/hsk3/hsk3_担心.wav' },
      { hanzi: '紧张', pinyin: 'jǐn zhāng', meaning: 'tendu, nerveux', meaningEn: 'nervous', audio: 'audio/hsk4/hsk4_紧张.wav' }
    ],
    tip:
      'Déclarer son affection : les Chinois modernes emploient rarement 我爱你 hors couple intime. Pour amis/famille, préfère 我很在乎你 (je tiens à toi) — moins embarrassant, plus naturel.',
    tipEn:
      'Declaring affection: modern Chinese rarely use 我爱你 outside a romantic context. For friends/family, prefer 我很在乎你 (I care about you) — less awkward, more natural.'
  }
];

// --- cecr-b11-emo-m2 — Donner son avis ----------------------------------
export const b11EmoOpinionLearnSections: LessonV2LearnSection[] = [
  {
    id: 'b11-emo-opinion-3levels',
    title: '3 niveaux d\'opinion : 觉得 / 认为 / 在我看来',
    titleEn: '3 levels: 觉得 / 认为 / 在我看来',
    body:
      'Trois niveaux d\'opinion **du plus oral au plus écrit**. Choisir le bon registre te fait gagner en crédibilité.\n' +
      '\n' +
      'Les trois entrées :\n' +
      '- **我觉得** : quotidien, ressenti (« j\'ai l\'impression »)\n' +
      '- **我认为** : posé, argumentatif (« je pense que »)\n' +
      '- **在我看来** : formel, dissertation (« à mon sens »)\n' +
      '\n' +
      'Attention : pour un désaccord poli, préfère **我不太同意** plutôt que 我不同意 — moins frontal.',
    bodyEn:
      '我觉得 = daily, feeling-based (I feel/find). 我认为 = measured, argumentative (I think). 在我看来 = formal, essayistic (in my view). Nuance: 可能, 也许, 好像. Balance: 一方面…另一方面. Polite disagreement: 我不太同意 rather than 我不同意.',
    items: [
      { hanzi: '我觉得', pinyin: 'wǒ jué de', meaning: 'je trouve, j\'ai l\'impression', meaningEn: 'I feel/find', audio: 'audio/hsk2/hsk2_觉得.wav' },
      { hanzi: '我认为', pinyin: 'wǒ rèn wéi', meaning: 'je pense que', meaningEn: 'I think that', audio: 'audio/hsk3/hsk3_认为.wav' },
      { hanzi: '可能', pinyin: 'kě néng', meaning: 'peut-être', meaningEn: 'possibly', audio: 'audio/hsk2/hsk2_可能.wav' },
      { hanzi: '同意', pinyin: 'tóng yì', meaning: 'être d\'accord', meaningEn: 'agree', audio: 'audio/hsk3/hsk3_同意.wav' },
      { hanzi: '不同意', pinyin: 'bù tóng yì', meaning: 'ne pas être d\'accord', meaningEn: 'disagree', audio: 'audio/hsk3/hsk3_同意.wav' },
      { hanzi: '说得对', pinyin: 'shuō de duì', meaning: 'tu as raison', meaningEn: 'you\'re right', audio: 'audio/hsk2/hsk2_对.wav' }
    ],
    tip:
      'Astuce conversation : avant d\'annoncer un désaccord, commence par acquiescer partiellement (你说得有道理, 但是…) — courant et bien vu en Chine.',
    tipEn:
      'Conversation trick: before disagreeing, half-agree first (你说得有道理, 但是… = you have a point, but…) — common and well-received in China.'
  }
];

// --- cecr-b11-emo-m3 — Compliments & politesse --------------------------
export const b11EmoComplimentLearnSections: LessonV2LearnSection[] = [
  {
    id: 'b11-emo-compliment-nali',
    title: 'Refuser un compliment : la modestie chinoise',
    titleEn: 'Refusing a compliment: Chinese modesty',
    body:
      'En Chine, accepter un compliment par « merci ! » peut sonner **arrogant**. La modestie est la norme socioculturelle.\n' +
      '\n' +
      'Refuser un compliment :\n' +
      '- 哪里哪里 (« mais non »)\n' +
      '- 过奖了 (« vous flattez trop »)\n' +
      '- 还差得远呢 (« je suis encore loin »)\n' +
      '\n' +
      'Astuce : pour émettre un compliment, reste **précis** — évite « tu es bien », préfère 你做得真好 ou 你的 [X] 真漂亮.',
    bodyEn:
      'In China, accepting a compliment with "thanks!" can sound arrogant. Traditional reply: 哪里哪里 (nǎ li nǎ li, "not at all"), 过奖了 (guò jiǎng le, "you flatter me"), 还差得远呢 (I\'m still far from it). When giving one: stay specific (avoid "you\'re nice"), prefer 你做得真好, 你的 [X] 真漂亮.',
    items: [
      { hanzi: '哪里', pinyin: 'nǎ li', meaning: 'mais non (refus compliment)', meaningEn: 'not at all', audio: 'audio/hsk1/hsk1_哪里.wav' },
      { hanzi: '过奖了', pinyin: 'guò jiǎng le', meaning: 'vous flattez trop', meaningEn: 'you flatter me', audio: 'audio/hsk5/hsk5_过奖.wav' },
      { hanzi: '聪明', pinyin: 'cōng míng', meaning: 'intelligent', meaningEn: 'smart', audio: 'audio/hsk3/hsk3_聪明.wav' },
      { hanzi: '漂亮', pinyin: 'piào liang', meaning: 'joli', meaningEn: 'pretty', audio: 'audio/hsk1/hsk1_漂亮.wav' },
      { hanzi: '真好', pinyin: 'zhēn hǎo', meaning: 'vraiment bien', meaningEn: 'really good', audio: 'audio/hsk1/hsk1_真.wav' },
      { hanzi: '客气', pinyin: 'kè qi', meaning: 'poli, formel', meaningEn: 'polite', audio: 'audio/hsk3/hsk3_客气.wav' }
    ],
    tip:
      'Les jeunes urbains chinois acceptent de plus en plus un 谢谢 direct. En contexte formel (prof, collègue senior, beaux-parents) : reste sur 哪里 par prudence.',
    tipEn:
      'Young urban Chinese increasingly accept a direct 谢谢. In formal settings (teacher, senior colleague, in-laws): stick to 哪里 to play safe.'
  }
];

// --- cecr-b11-health-m1 — Parties du corps ------------------------------
export const b11HealthBodyLearnSections: LessonV2LearnSection[] = [
  {
    id: 'b11-health-body-map',
    title: 'Le corps en 15 mots',
    titleEn: 'The body in 15 words',
    body:
      'Le corps en trois zones, plus un radical à reconnaître. Pour parler de douleur, formule universelle : **[partie] + 疼** (我头疼 = j\'ai mal à la tête).\n' +
      '\n' +
      'Carte du corps :\n' +
      '- **Haut** : 头, 脸, 眼睛, 耳朵, 鼻子, 嘴, 牙\n' +
      '- **Tronc** : 脖子, 肩膀, 胸, 肚子, 背\n' +
      '- **Membres** : 手, 胳膊, 腿, 脚\n' +
      '\n' +
      'Astuce : beaucoup d\'organes portent le radical **月** (forme adoucie de 肉, chair) — 肚, 肺, 胃, 肝.',
    bodyEn:
      'Top: 头, 脸, 眼睛, 耳朵, 鼻子, 嘴, 牙. Torso: 脖子, 肩膀, 胸, 肚子, 背. Limbs: 手, 胳膊, 腿, 脚. Many organ words carry the 月 radical (softened form of 肉, flesh): 肚, 肺, 胃, 肝. To speak of pain, universal pattern: [part] 疼. 我头疼 (my head hurts).',
    items: [
      { hanzi: '头', pinyin: 'tóu', meaning: 'tête', meaningEn: 'head', audio: 'audio/hsk3/hsk3_头.wav' },
      { hanzi: '眼睛', pinyin: 'yǎn jīng', meaning: 'yeux', meaningEn: 'eyes', audio: 'audio/hsk2/hsk2_眼睛.wav' },
      { hanzi: '鼻子', pinyin: 'bí zi', meaning: 'nez', meaningEn: 'nose', audio: 'audio/hsk3/hsk3_鼻子.wav' },
      { hanzi: '嘴', pinyin: 'zuǐ', meaning: 'bouche', meaningEn: 'mouth', audio: 'audio/hsk3/hsk3_嘴.wav' },
      { hanzi: '手', pinyin: 'shǒu', meaning: 'main', meaningEn: 'hand', audio: 'audio/hsk2/hsk2_手.wav' },
      { hanzi: '肚子', pinyin: 'dù zi', meaning: 'ventre', meaningEn: 'belly', audio: 'audio/hsk3/hsk3_肚子.wav' },
      { hanzi: '疼', pinyin: 'téng', meaning: 'douloureux, faire mal', meaningEn: 'painful, hurt', audio: 'audio/hsk3/hsk3_疼.wav' }
    ],
    tip:
      'Synonyme de 疼 : 痛 (tòng). Les deux sont interchangeables dans 我头疼/头痛. 痛 est légèrement plus littéraire et fréquent au sud ; 疼 est plus courant au nord et à l\'oral.',
    tipEn:
      'Synonym of 疼: 痛 (tòng). Interchangeable in 我头疼/头痛. 痛 is slightly more literary and frequent in the south; 疼 more common in the north and orally.'
  }
];

// --- cecr-b11-health-m2 — Chez le médecin -------------------------------
export const b11HealthDoctorLearnSections: LessonV2LearnSection[] = [
  {
    id: 'b11-health-doctor-flow',
    title: '挂号 → spécialité → 开药',
    titleEn: '挂号 → specialty → 开药',
    body:
      'Le parcours hospitalier (医院) en Chine suit **cinq étapes fixes**. À mémoriser pour ne pas perdre une heure dans les couloirs.\n' +
      '\n' +
      'Les étapes :\n' +
      '- **挂号处** (enregistrement) — paye la consultation, prends un ticket\n' +
      '- Direction du service : 内科 (générale), 外科 (chirurgie), 儿科 (pédiatrie), 牙科 (dentaire)\n' +
      '- Consultation : 我觉得… / 我头疼 (j\'ai mal à la tête)\n' +
      '- Le médecin **开药** (prescrit)\n' +
      '- Retrait à la **药房** (pharmacie de l\'hôpital)',
    bodyEn:
      'Hospital flow (医院) in China: (1) 挂号处 (registration desk), pay the consultation fee, get a ticket. (2) Go to the specialty: 内科 (general), 外科 (surgery), 儿科 (pediatrics), 牙科 (dental). (3) Consult, describe: 我觉得... (I feel…), 我头疼 (my head hurts). (4) Doctor 开药 (prescribes). (5) Head to the 药房 (pharmacy) in the hospital.',
    items: [
      { hanzi: '医院', pinyin: 'yī yuàn', meaning: 'hôpital', meaningEn: 'hospital', audio: 'audio/hsk1/hsk1_医院.wav' },
      { hanzi: '挂号', pinyin: 'guà hào', meaning: 'enregistrement hospitalier', meaningEn: 'hospital registration', audio: 'audio/hsk5/hsk5_挂号.wav' },
      { hanzi: '发烧', pinyin: 'fā shāo', meaning: 'avoir de la fièvre', meaningEn: 'have a fever', audio: 'audio/hsk3/hsk3_发烧.wav' },
      { hanzi: '咳嗽', pinyin: 'ké sou', meaning: 'tousser', meaningEn: 'cough', audio: 'audio/hsk4/hsk4_咳嗽.wav' },
      { hanzi: '感冒', pinyin: 'gǎn mào', meaning: 'rhume', meaningEn: 'cold', audio: 'audio/hsk3/hsk3_感冒.wav' },
      { hanzi: '开药', pinyin: 'kāi yào', meaning: 'prescrire un médicament', meaningEn: 'prescribe medicine', audio: 'audio/hsk2/hsk2_药.wav' }
    ],
    tip:
      'Hiérarchie des hôpitaux : 三甲 (sān jiǎ, niveau 3A, les plus réputés) > 二级 > 一级. Pour un souci sérieux, vise un 三甲 — file d\'attente longue mais qualité.',
    tipEn:
      'Hospital tiers: 三甲 (sān jiǎ, 3A grade, top-ranked) > 二级 > 一级. For a serious issue, aim for a 三甲 — long queues but best quality.'
  }
];

// --- cecr-b11-health-m3 — Pharmacie -------------------------------------
export const b11HealthPharmacyLearnSections: LessonV2LearnSection[] = [
  {
    id: 'b11-health-pharmacy-forms',
    title: 'Formes & posologie',
    titleEn: 'Forms & dosage',
    body:
      '药店 (yàodiàn) = pharmacie. Posologie type très utile à comprendre : **一天三次，每次两片** (3 fois/jour, 2 cachets à chaque prise).\n' +
      '\n' +
      'Formes courantes :\n' +
      '- 药片 (cachet), 胶囊 (gélule), 药水 (sirop), 药膏 (pommade)\n' +
      '\n' +
      'Médicaments à connaître :\n' +
      '- 感冒药 (rhume), 退烧药 (fièvre), 止痛药 (douleur), 消炎药 (inflammation), 抗生素 (antibiotiques)\n' +
      '\n' +
      'Astuce : sur la boîte, 饭前 (avant repas), 饭后 (après), 睡前 (au coucher).',
    bodyEn:
      '药店 (yàodiàn) = pharmacy. Forms: 药片 (tablet), 胶囊 (capsule), 药水 (syrup), 药膏 (ointment). Meds: 感冒药, 退烧药, 止痛药, 消炎药, 抗生素. Standard dosage: 一天三次，每次两片 (3 times/day, 2 tablets each). Box labels: 饭前 (before meals), 饭后 (after), 睡前 (bedtime).',
    items: [
      { hanzi: '药店', pinyin: 'yào diàn', meaning: 'pharmacie', meaningEn: 'pharmacy', audio: 'audio/hsk3/hsk3_药.wav' },
      { hanzi: '药片', pinyin: 'yào piàn', meaning: 'cachet', meaningEn: 'tablet', audio: 'audio/hsk3/hsk3_药.wav' },
      { hanzi: '感冒药', pinyin: 'gǎn mào yào', meaning: 'médicament rhume', meaningEn: 'cold medicine', audio: 'audio/hsk3/hsk3_感冒.wav' },
      { hanzi: '止痛药', pinyin: 'zhǐ tòng yào', meaning: 'antidouleur', meaningEn: 'painkiller', audio: 'audio/hsk5/hsk5_止.wav' },
      { hanzi: '中药', pinyin: 'zhōng yào', meaning: 'médecine chinoise', meaningEn: 'Chinese medicine', audio: 'audio/hsk5/hsk5_中药.wav' },
      { hanzi: '针灸', pinyin: 'zhēn jiǔ', meaning: 'acupuncture', meaningEn: 'acupuncture', audio: 'audio/hsk6/hsk6_针灸.wav' }
    ],
    tip:
      'Usage combiné : nombreux Chinois prennent simultanément 西医 (médecine occidentale) et 中医 (traditionnelle), chacune pour ses indications. Demander au pharmacien 有没有中药 ? ouvre cette deuxième voie.',
    tipEn:
      'Combined use: many Chinese take 西医 (Western medicine) and 中医 (traditional) simultaneously, each for its strengths. Asking the pharmacist 有没有中药? opens that second path.'
  }
];

// ═════════════════════════════════════════════════════════════════════════════
// VAGUE B1.1 — Conversation + Nuances
// ═════════════════════════════════════════════════════════════════════════════

// === CONVERSATION B1.1 =======================================================

export const b11ConvM1LearnSections: LessonV2LearnSection[] = [
  {
    id: 'b11-opinion',
    title: 'Exprimer une opinion nuancée',
    titleEn: 'Express a nuanced opinion',
    body:
      'Au-delà du A2 « 我觉得 », le B1 **nuance**. Trois axes à maîtriser pour passer du basique à l\'argumenté.\n' +
      '\n' +
      'Boîte à outils :\n' +
      '- **Introduire** : 在我看来, 我个人认为, 从我的角度\n' +
      '- **Reconnaître l\'autre** : 我理解你的意思，但是… / 你说得有道理，不过…\n' +
      '- **Renforcer** : 确实如此, 没错\n' +
      '\n' +
      'Attention : évite le « 我觉得 » sec — ça sonne très **débutant**. Préfère 在我看来 ou 我个人认为 dès qu\'il s\'agit d\'argumenter.',
    bodyEn:
      'Beyond A2 «我觉得», B1 adds nuance. Introduce: 在我看来 (in my view), 我个人认为 (personally I think), 从我的角度 (from my perspective). Acknowledge the other side: 我理解你的意思，但是… (I get your point, but…), 你说得有道理，不过… (you have a point, however…). Reinforce: 确实如此 (that\'s exactly it), 没错 (that\'s right). Important: avoid bare impersonal «我觉得» — sounds very beginner. Prefer 在我看来 or 我个人认为 when arguing.',
    items: [
      { hanzi: '在我看来', pinyin: 'zài wǒ kàn lái', meaning: 'à mon avis', meaningEn: 'in my view', audio: 'audio/hsk4/hsk4_看法.wav' },
      { hanzi: '个人', pinyin: 'gè rén', meaning: 'personnel', meaningEn: 'personal', audio: 'audio/hsk3/hsk3_个人.wav' },
      { hanzi: '角度', pinyin: 'jiǎo dù', meaning: 'angle, point de vue', meaningEn: 'angle, perspective', audio: 'audio/hsk5/hsk5_角度.wav' },
      { hanzi: '道理', pinyin: 'dào lǐ', meaning: 'raison, sens', meaningEn: 'reason, sense', audio: 'audio/hsk5/hsk5_道理.wav' },
      { hanzi: '确实', pinyin: 'què shí', meaning: 'effectivement', meaningEn: 'indeed', audio: 'audio/hsk4/hsk4_确实.wav' }
    ],
    tip:
      'Astuce diplomatie : commence TOUJOURS par 我理解你 / 你说得有道理 avant de nuancer. Sans cette préface, ton désaccord sonne agressif en chinois.',
    tipEn:
      'Diplomacy tip: ALWAYS start with 我理解你 / 你说得有道理 before adding nuance. Without that preface, your disagreement sounds aggressive in Chinese.'
  },
  {
    id: 'b11-preference',
    title: 'Exprimer préférence et regret',
    titleEn: 'Express preference and regret',
    body:
      'Deux familles de structures à acquérir au B1 : exprimer une **préférence** et exprimer un **regret**. Chacune a ses formules figées.\n' +
      '\n' +
      'Préférence :\n' +
      '- 我更喜欢 X (je préfère X)\n' +
      '- 比起 X，我更喜欢 Y (entre X et Y, je préfère Y)\n' +
      '- 我宁愿 X 也不 Y (je préférerais X plutôt que Y — **fort**)\n' +
      '\n' +
      'Regret :\n' +
      '- 我后悔了 (je regrette)\n' +
      '- 早知道就… (si j\'avais su, j\'aurais…)\n' +
      '- 要是…就好了 (si seulement…)\n' +
      '\n' +
      'Astuce : pour soutenir l\'autre — 别后悔 (ne regrette pas), 没关系，过去了 (laisse, c\'est passé).',
    bodyEn:
      'Preference: 我更喜欢 X (I prefer X), 比起 X，我更喜欢 Y (between X and Y, I prefer Y), 我宁愿 X 也不 Y (I\'d rather X than Y — strong). Regret: 我后悔了 (I regret), 早知道就… (if I\'d known…), 要是…就好了 (if only…). Typical phrase: 早知道我就不来了 = if I\'d known I wouldn\'t have come. 早知道 marks late realization. Support: 别后悔 (don\'t regret), 没关系，过去了 (let it go, it\'s past).',
    items: [
      { hanzi: '更', pinyin: 'gèng', meaning: 'plus, encore plus', meaningEn: 'more', audio: 'audio/hsk3/hsk3_更.wav' },
      { hanzi: '宁愿', pinyin: 'nìng yuàn', meaning: 'préférer (fort)', meaningEn: 'would rather', audio: 'audio/hsk5/hsk5_宁愿.wav' },
      { hanzi: '后悔', pinyin: 'hòu huǐ', meaning: 'regretter', meaningEn: 'regret', audio: 'audio/hsk4/hsk4_后悔.wav' },
      { hanzi: '早知道', pinyin: 'zǎo zhī dào', meaning: 'si j\'avais su', meaningEn: 'if I had known', audio: 'audio/hsk2/hsk2_知道.wav' },
      { hanzi: '要是', pinyin: 'yào shì', meaning: 'si (hypothèse)', meaningEn: 'if (hypothetical)', audio: 'audio/hsk4/hsk4_要是.wav' }
    ],
    tip:
      '« 要是…就好了 » est la formule magique du regret hypothétique chinois. 要是我学了中文就好了 = si seulement j\'avais appris le chinois. Très expressive, à utiliser sans complexe.',
    tipEn:
      '«要是…就好了» is the magic Chinese hypothetical-regret formula. 要是我学了中文就好了 = if only I had learned Chinese. Very expressive, use freely.'
  }
];

export const b11ConvM2LearnSections: LessonV2LearnSection[] = [
  {
    id: 'b11-passe-detail',
    title: 'Raconter le passé en détail',
    titleEn: 'Tell about the past in detail',
    body:
      'Raconter un passé détaillé demande des **marqueurs temporels** et le bon aspect verbal. L\'arc narratif suit toujours 4 phases.\n' +
      '\n' +
      'Marqueurs temporels :\n' +
      '- 那时候 (à cette époque), 当时 (à ce moment-là)\n' +
      '- 后来 (par la suite), 接着 (ensuite)\n' +
      '- 突然 (soudain), 最后 (finalement)\n' +
      '\n' +
      'L\'arc d\'un récit :\n' +
      '- Situation initiale : 那时候我…\n' +
      '- Déclencheur : 突然…\n' +
      '- Développement : 然后…\n' +
      '- Résolution : 最后…\n' +
      '\n' +
      'Astuce : coloration narrative avec **谁知道** (qui aurait cru) et **没想到** (je n\'aurais pas pensé). Aspect verbal — 了 (action accomplie), 过 (expérience vécue).',
    bodyEn:
      'Time markers: 那时候 (back then), 当时 (at that moment), 后来 (later on), 接着 (next), 突然 (suddenly), 最后 (finally). Verbal aspect: 了 (completed action), 过 (lived experience, not necessarily recent — 我去过中国 = I\'ve been to China at least once). Story arc: initial situation (那时候我…) + trigger event (突然…) + development (然后…) + resolution (最后…). Narrative color: 谁知道 (who\'d have thought), 没想到 (didn\'t expect). Example: 那时候我才二十岁，突然接到一个电话…',
    items: [
      { hanzi: '那时候', pinyin: 'nà shí hou', meaning: 'à cette époque', meaningEn: 'back then', audio: 'audio/hsk3/hsk3_时候.wav' },
      { hanzi: '当时', pinyin: 'dāng shí', meaning: 'à ce moment-là', meaningEn: 'at the time', audio: 'audio/hsk5/hsk5_当时.wav' },
      { hanzi: '后来', pinyin: 'hòu lái', meaning: 'par la suite', meaningEn: 'later on', audio: 'audio/hsk3/hsk3_后来.wav' },
      { hanzi: '突然', pinyin: 'tū rán', meaning: 'soudainement', meaningEn: 'suddenly', audio: 'audio/hsk3/hsk3_突然.wav' },
      { hanzi: '没想到', pinyin: 'méi xiǎng dào', meaning: 'je n\'aurais pas pensé', meaningEn: 'didn\'t expect', audio: 'audio/hsk4/hsk4_没想到.wav' }
    ],
    tip:
      'Marqueur de coloration : « 谁知道 + événement inattendu » est un classique narratif chinois. 谁知道他真的来了！= et qui aurait cru, il est vraiment venu ! Très oral, très expressif.',
    tipEn:
      'Color marker: «谁知道 + unexpected event» is a Chinese narrative classic. 谁知道他真的来了！= and who\'d have thought, he actually came! Very oral, very expressive.'
  },
  {
    id: 'b11-anecdote',
    title: 'Raconter une anecdote drôle ou gênante',
    titleEn: 'Tell a funny or awkward anecdote',
    body:
      'Une anecdote orale chinoise se découpe en trois temps : démarrage, narration colorée, conclusion. Pour démarrer : **我跟你说一件好玩的事**.\n' +
      '\n' +
      'Pour le drôle :\n' +
      '- 太搞笑了 (trop marrant)\n' +
      '- 笑死我了 (je suis mort de rire — argot oral)\n' +
      '- 真有意思 (vraiment amusant)\n' +
      '\n' +
      'Pour le gênant :\n' +
      '- 太尴尬了 (super gênant)\n' +
      '- 不好意思 (gêné)\n' +
      '- 我真想找个地缝钻进去 (idiomatique : me cacher dans un trou)\n' +
      '\n' +
      'Attention : réaction de l\'autre **attendue** (真的吗？/ 哈哈哈！) — sans réaction, l\'échange tombe à plat.',
    bodyEn:
      'Start: 我跟你说一件好玩的事 (let me tell you something funny). For funny: 太搞笑了 (so funny), 笑死我了 (I died laughing — slang), 真有意思 (truly amusing). For awkward: 太尴尬了 (so awkward), 不好意思 (embarrassed), 我真想找个地缝钻进去 (I wanted to hide in a crack in the floor — idiomatic). Conclude: 这就是那时候发生的事 (that\'s what happened back then). Expected reaction: 真的吗？/ 哈哈哈！ No reaction = cold.',
    items: [
      { hanzi: '好玩', pinyin: 'hǎo wán', meaning: 'amusant', meaningEn: 'fun', audio: 'audio/hsk3/hsk3_好玩.wav' },
      { hanzi: '搞笑', pinyin: 'gǎo xiào', meaning: 'drôle', meaningEn: 'funny', audio: 'audio/hsk5/hsk5_搞笑.wav' },
      { hanzi: '尴尬', pinyin: 'gān gà', meaning: 'gênant', meaningEn: 'awkward', audio: 'audio/hsk5/hsk5_尴尬.wav' },
      { hanzi: '发生', pinyin: 'fā shēng', meaning: 'se produire', meaningEn: 'happen', audio: 'audio/hsk4/hsk4_发生.wav' },
      { hanzi: '哈哈哈', pinyin: 'hā hā hā', meaning: 'hahaha', meaningEn: 'hahaha', audio: 'audio/hsk1/hsk1_哈.wav' }
    ],
    tip:
      'Sur WeChat, montre que tu es engagé en répondant 哈哈哈 (3 哈 minimum). Un seul 哈 sonne sarcastique. 6 哈 = vraiment drôle. C\'est une vraie convention sociale numérique.',
    tipEn:
      'On WeChat, show you\'re engaged by replying 哈哈哈 (minimum 3 哈). A single 哈 sounds sarcastic. 6 哈 = really funny. It\'s a real digital social convention.'
  }
];

export const b11ConvM3LearnSections: LessonV2LearnSection[] = [
  {
    id: 'b11-debate-simple',
    title: 'Débattre simplement : pour et contre',
    titleEn: 'Simple debate: for and against',
    body:
      'Au B1, le débat reste **mesuré et indirect**. Quatre familles d\'outils à équilibrer : pour, contre poli, argumentation, concession.\n' +
      '\n' +
      'Pour :\n' +
      '- 我同意, 完全同意, 我也是这么想的, 没错\n' +
      '\n' +
      'Contre poli :\n' +
      '- 我不太同意, 我看法不一样, 我觉得不一定\n' +
      '\n' +
      'Argumenter & concéder :\n' +
      '- Argument : 因为…, 由于…, 比如…, 据我所知\n' +
      '- Concession : 你说得对，不过…\n' +
      '\n' +
      'Attention : au B1, on évite encore **反对** (s\'opposer) sauf en débat formel — trop frontal en chinois social.',
    bodyEn:
      'For: 我同意 (I agree), 完全同意 (totally), 我也是这么想的 (I think the same), 没错 (right). Against politely: 我不太同意 (I don\'t fully agree), 我看法不一样 (I have a different view), 我觉得不一定 (not necessarily). Give an argument: 因为…, 由于…, 比如…, 据我所知 (to my knowledge). Concession: 你说得对，不过… (you\'re right, but…). At B1, still avoid 反对 (oppose) outside formal debate — too frontal in social Chinese.',
    items: [
      { hanzi: '同意', pinyin: 'tóng yì', meaning: 'd\'accord', meaningEn: 'agree', audio: 'audio/hsk3/hsk3_同意.wav' },
      { hanzi: '完全', pinyin: 'wán quán', meaning: 'totalement', meaningEn: 'completely', audio: 'audio/hsk4/hsk4_完全.wav' },
      { hanzi: '不一定', pinyin: 'bù yí dìng', meaning: 'pas forcément', meaningEn: 'not necessarily', audio: 'audio/hsk3/hsk3_不一定.wav' },
      { hanzi: '据我所知', pinyin: 'jù wǒ suǒ zhī', meaning: 'à ma connaissance', meaningEn: 'to my knowledge', audio: 'audio/hsk5/hsk5_据.wav' },
      { hanzi: '观点', pinyin: 'guān diǎn', meaning: 'point de vue', meaningEn: 'viewpoint', audio: 'audio/hsk5/hsk5_观点.wav' }
    ],
    tip:
      'Chez les Chinois, le débat « à la française » (frontal, contradictoire) peut surprendre. Préfère le sandwich : reconnais d\'abord (你说得有道理) + nuance (不过…). Sans la 1re partie, perçu comme agressif.',
    tipEn:
      'With Chinese people, French-style debate (frontal, contradictory) can surprise. Prefer the sandwich: acknowledge first (你说得有道理) + nuance (不过…). Without the first part, perceived as aggressive.'
  },
  {
    id: 'b11-imprevu',
    title: 'Gérer un imprévu : retard, annulation',
    titleEn: 'Handle the unexpected: late, cancellation',
    body:
      'Gérer un imprévu en chinois suit toujours la même séquence : **annonce + cause + remède + excuse finale**.\n' +
      '\n' +
      'Annoncer :\n' +
      '- 不好意思，我可能要迟到 (désolé, je vais être en retard)\n' +
      '- 突然有事，我去不了 (j\'ai un imprévu, je ne peux pas venir)\n' +
      '\n' +
      'Cause + remède + reprogrammer :\n' +
      '- 因为堵车，我会晚 30 分钟 (cause embouteillage, 30 min de retard)\n' +
      '- 能不能改个时间？/ 我们另外约 (refixons un RDV)\n' +
      '\n' +
      'Attention : conclure **toujours** par 真的不好意思 ou 给你添麻烦了 (désolé du dérangement). Sur WeChat, message immédiat — ne pas attendre.',
    bodyEn:
      'Announce: 不好意思，我可能要迟到 (sorry, I\'ll be late), 突然有事，我去不了 (something came up, I can\'t come). Cause + fix: 因为堵车，我会晚 30 分钟 (cause = traffic, fix = 30 min late). Reschedule: 能不能改个时间？(can we change?), 我们另外约 (let\'s set another time). On WeChat: message immediately, don\'t wait. If really urgent, send a short voice note (≤ 30s). Always close with 真的不好意思 / 给你添麻烦了 (sorry for the trouble).',
    items: [
      { hanzi: '迟到', pinyin: 'chí dào', meaning: 'arriver en retard', meaningEn: 'be late', audio: 'audio/hsk3/hsk3_迟到.wav' },
      { hanzi: '突然', pinyin: 'tū rán', meaning: 'soudain', meaningEn: 'suddenly', audio: 'audio/hsk3/hsk3_突然.wav' },
      { hanzi: '堵车', pinyin: 'dǔ chē', meaning: 'embouteillage', meaningEn: 'traffic jam', audio: 'audio/hsk4/hsk4_堵车.wav' },
      { hanzi: '另外', pinyin: 'lìng wài', meaning: 'autre, ailleurs', meaningEn: 'other, also', audio: 'audio/hsk4/hsk4_另外.wav' },
      { hanzi: '添麻烦', pinyin: 'tiān má fan', meaning: 'donner du trouble', meaningEn: 'cause trouble', audio: 'audio/hsk4/hsk4_麻烦.wav' }
    ],
    tip:
      '« 给你添麻烦了 » est la formule passe-partout d\'excuse pour avoir dérangé. Réponse standard : 不会不会, 没关系 (de rien). Sans cette phrase, ton excuse paraît incomplète.',
    tipEn:
      '«给你添麻烦了» is the all-purpose apology for having bothered. Standard reply: 不会不会, 没关系 (no worries). Without this phrase, your apology feels incomplete.'
  }
];

export const b11ConvM4LearnSections: LessonV2LearnSection[] = [
  {
    id: 'b11-felicitation',
    title: 'Faire un vrai compliment + l\'accepter',
    titleEn: 'Give a real compliment + accept it',
    body:
      'Au-delà du **你真棒** (tu es super) générique du A2, le B1 précise et personnalise.\n' +
      '\n' +
      'Compliments précis :\n' +
      '- 你的中文进步真快 (ton chinois progresse vraiment vite)\n' +
      '- 你这个想法很有创意 (cette idée est très créative)\n' +
      '- 你做得太到位了 (parfaitement bien fait)\n' +
      '\n' +
      'Féliciter un succès :\n' +
      '- 恭喜 ! / 祝贺你 ! / 太替你高兴了\n' +
      '\n' +
      'Accepter avec modernité :\n' +
      '- 谢谢，你过奖了 (merci, vous me flattez)\n' +
      '- 谢谢，我会继续努力 (merci, je continue à bosser — mix gratitude + humilité)',
    bodyEn:
      'Beyond generic A2 «你真棒» (you\'re great), B1 specifies: 你的中文进步真快 (your Chinese is really improving fast), 你这个想法很有创意 (this idea is very creative), 你做得太到位了 (perfectly done). To congratulate a success: 恭喜！(congrats), 祝贺你！(same family), 太替你高兴了 (so happy for you). Modern acceptance: 谢谢，你过奖了 (thanks, you flatter me). Even more modern: 谢谢，我会继续努力 (thanks, I\'ll keep working). Gratitude + humility mix.',
    items: [
      { hanzi: '进步', pinyin: 'jìn bù', meaning: 'progrès', meaningEn: 'progress', audio: 'audio/hsk4/hsk4_进步.wav' },
      { hanzi: '创意', pinyin: 'chuàng yì', meaning: 'créativité', meaningEn: 'creativity', audio: 'audio/hsk5/hsk5_创意.wav' },
      { hanzi: '到位', pinyin: 'dào wèi', meaning: 'au point', meaningEn: 'on point', audio: 'audio/hsk6/hsk6_到位.wav' },
      { hanzi: '恭喜', pinyin: 'gōng xǐ', meaning: 'félicitations', meaningEn: 'congrats', audio: 'audio/hsk2/hsk2_恭喜.wav' },
      { hanzi: '祝贺', pinyin: 'zhù hè', meaning: 'féliciter', meaningEn: 'congratulate', audio: 'audio/hsk5/hsk5_祝贺.wav' }
    ],
    tip:
      'Pour un succès académique/pro chinois, dire 恭喜 SEUL peut sonner sec. Combo classique : 恭喜恭喜 ! 你太厉害了 ! (réplique 恭喜 + un compliment précis). Le double 恭喜 est attendu.',
    tipEn:
      'For a Chinese academic/pro success, saying 恭喜 ALONE can sound dry. Classic combo: 恭喜恭喜！你太厉害了！(double 恭喜 + a specific compliment). The doubled 恭喜 is expected.'
  },
  {
    id: 'b11-souhait',
    title: 'Souhaits et formules de politesse étendues',
    titleEn: 'Wishes and extended polite formulas',
    body:
      'Les souhaits chinois sont **figés et attendus** pour chaque occasion. L\'absence est notée — apprends-les comme des blocs.\n' +
      '\n' +
      'Le catalogue :\n' +
      '- **Génériques** : 生日快乐, 新年快乐, 节日快乐\n' +
      '- **Mariage** : 百年好合 (100 ans d\'union), 早生贵子 (chengyu traditionnel)\n' +
      '- **Études** : 学业进步, 考试顺利\n' +
      '- **Voyage** : 一路平安, 一路顺风\n' +
      '- **Santé** : 早日康复 (rétablissement rapide)\n' +
      '- **Travail** : 工作顺利\n' +
      '\n' +
      'Attention : ces formules paraissent figées mais sont **vraiment** attendues pour les occasions correspondantes.',
    bodyEn:
      '生日快乐 (happy birthday), 新年快乐 (happy new year), 节日快乐 (happy holiday). For weddings: 百年好合 (100 years of happy union), 早生贵子 (have a fine boy soon — traditional chengyu). Studies: 学业进步 (academic progress), 考试顺利 (good luck on the exam). Travel: 一路平安 (safe travels), 一路顺风 (favorable wind). Health: 早日康复 (quick recovery). Work: 工作顺利 (work goes well). These formulas seem fixed but are REALLY expected for matching occasions — absence is noted.',
    items: [
      { hanzi: '快乐', pinyin: 'kuài lè', meaning: 'joyeux', meaningEn: 'happy', audio: 'audio/hsk2/hsk2_快乐.wav' },
      { hanzi: '顺利', pinyin: 'shùn lì', meaning: 'sans heurts', meaningEn: 'smooth', audio: 'audio/hsk4/hsk4_顺利.wav' },
      { hanzi: '康复', pinyin: 'kāng fù', meaning: 'rétablissement', meaningEn: 'recovery', audio: 'audio/hsk6/hsk6_康复.wav' },
      { hanzi: '一路平安', pinyin: 'yí lù píng ān', meaning: 'bon voyage', meaningEn: 'safe travels', audio: 'audio/hsk6/hsk6_平安.wav' },
      { hanzi: '祝你', pinyin: 'zhù nǐ', meaning: 'je te souhaite', meaningEn: 'I wish you', audio: 'audio/hsk3/hsk3_祝.wav' }
    ],
    tip:
      'Pour le Nouvel An chinois (春节), envoie le vœu sur WeChat le matin du jour J : 新年快乐！恭喜发财！(joyeux nouvel an + souhait de prospérité). Le double vœu est culturellement attendu, surtout aux aînés.',
    tipEn:
      'For Chinese New Year (春节), send wishes on WeChat the morning of: 新年快乐！恭喜发财！(happy new year + wishing prosperity). The double wish is culturally expected, especially to elders.'
  }
];

export const b11ConvM5LearnSections: LessonV2LearnSection[] = [
  {
    id: 'b11-rdv-pro',
    title: 'Prendre un RDV professionnel',
    titleEn: 'Make a professional appointment',
    body:
      'Plus formel que le RDV amical du A2. Le flux pro suit quatre temps : **ouverture, précision, proposition, confirmation**.\n' +
      '\n' +
      'Ouvrir & préciser :\n' +
      '- 您好，我想跟您约个时间 (j\'aimerais convenir d\'un moment)\n' +
      '- 关于 X 的事情, 大概需要 30 分钟\n' +
      '\n' +
      'Proposer & accepter :\n' +
      '- 您下周二上午方便吗？(mardi matin, ça vous va ?)\n' +
      '- 没问题，我下午两点有空 (dispo à 14 h)\n' +
      '- 那就这样定了 (c\'est dit comme ça)\n' +
      '\n' +
      'Attention : reconfirmer **24 h avant** n\'est pas optionnel — 明天我们的会议还按计划进行吗？',
    bodyEn:
      'More formal than A2 friendly meet-up. Open: 您好，我想跟您约个时间 (hello, I\'d like to set a time with you). Specify: 关于 X 的事情 (about X), 大概需要 30 分钟 (about 30 min). Propose: 您下周二上午方便吗？(next Tuesday morning OK?). Accept: 没问题，我下午两点有空 (no problem, free at 2pm). Confirm by mail/WeChat: 那就这样定了 (settled then). 24h before, reconfirm: 明天我们的会议还按计划进行吗？(is tomorrow\'s meeting still on?). This reconfirm is expected.',
    items: [
      { hanzi: '约', pinyin: 'yuē', meaning: 'convenir, donner RDV', meaningEn: 'arrange, set', audio: 'audio/hsk3/hsk3_约.wav' },
      { hanzi: '关于', pinyin: 'guān yú', meaning: 'concernant', meaningEn: 'concerning', audio: 'audio/hsk3/hsk3_关于.wav' },
      { hanzi: '大概', pinyin: 'dà gài', meaning: 'environ', meaningEn: 'approximately', audio: 'audio/hsk4/hsk4_大概.wav' },
      { hanzi: '会议', pinyin: 'huì yì', meaning: 'réunion', meaningEn: 'meeting', audio: 'audio/hsk4/hsk4_会议.wav' },
      { hanzi: '计划', pinyin: 'jì huà', meaning: 'plan', meaningEn: 'plan', audio: 'audio/hsk4/hsk4_计划.wav' }
    ],
    tip:
      'En milieu pro chinois, reconfirmer un RDV 24 h avant n\'est pas optionnel — c\'est une marque de sérieux. Sans cela, le destinataire peut douter que tu viennes vraiment.',
    tipEn:
      'In Chinese pro settings, reconfirming a meeting 24h before is not optional — it\'s a mark of seriousness. Without it, the recipient may doubt you\'re really coming.'
  },
  {
    id: 'b11-job-interview',
    title: 'Mini entretien : se présenter pro',
    titleEn: 'Mini interview: introduce yourself professionally',
    body:
      'Une mini-présentation pro chinoise suit toujours **identité → formation → expérience → compétences → clôture**.\n' +
      '\n' +
      'Identité & formation :\n' +
      '- 我叫 X，今年 X 岁\n' +
      '- 毕业于 X 大学，主修 X (spécialité)\n' +
      '\n' +
      'Expérience & compétences :\n' +
      '- 我有 X 年工作经验, 在 X 公司工作过\n' +
      '- 我擅长 X, 我对 X 感兴趣\n' +
      '\n' +
      'Clôture & question piège :\n' +
      '- Conclure : 希望有机会跟您合作\n' +
      '- 你为什么想来我们公司？ → 我了解贵公司的项目，我觉得很有意思 + une raison précise',
    bodyEn:
      'Structure: 我叫 X，今年 X 岁，毕业于 X 大学 (school), 主修 X (major). Experience: 我有 X 年工作经验 (X years of experience), 在 X 公司工作过 (I worked at X). Skills: 我擅长 X (I\'m good at X), 我对 X 感兴趣 (I\'m interested in X). To close: 希望有机会跟您合作 (I hope to have the chance to collaborate). Frequent question: 你为什么想来我们公司？ Sample reply: 我了解贵公司的项目，我觉得很有意思 + a specific reason.',
    items: [
      { hanzi: '毕业', pinyin: 'bì yè', meaning: 'diplômé', meaningEn: 'graduate', audio: 'audio/hsk4/hsk4_毕业.wav' },
      { hanzi: '专业', pinyin: 'zhuān yè', meaning: 'spécialité', meaningEn: 'major', audio: 'audio/hsk4/hsk4_专业.wav' },
      { hanzi: '经验', pinyin: 'jīng yàn', meaning: 'expérience', meaningEn: 'experience', audio: 'audio/hsk4/hsk4_经验.wav' },
      { hanzi: '擅长', pinyin: 'shàn cháng', meaning: 'fort en, expert', meaningEn: 'good at', audio: 'audio/hsk6/hsk6_擅长.wav' },
      { hanzi: '合作', pinyin: 'hé zuò', meaning: 'collaborer', meaningEn: 'collaborate', audio: 'audio/hsk4/hsk4_合作.wav' }
    ],
    tip:
      '« 贵公司 » (votre estimée entreprise) est une formule respectueuse au lieu de 你们公司. À utiliser dans toutes les conversations pro avec un client/employeur potentiel.',
    tipEn:
      '«贵公司» (your esteemed company) is a respectful formula instead of 你们公司. Use in all pro conversations with a client/potential employer.'
  }
];

export const b11ConvM6LearnSections: LessonV2LearnSection[] = [
  {
    id: 'b11-conseiller',
    title: 'Conseiller un ami sans imposer',
    titleEn: 'Advise a friend without imposing',
    body:
      'En chinois, le conseil est **indirect** pour respecter l\'autonomie de l\'autre. Trois familles d\'outils à maîtriser.\n' +
      '\n' +
      'Ouvrir & suggérer :\n' +
      '- 我跟你说一下我的想法，你参考一下\n' +
      '- 你为什么不试试…？\n' +
      '- 也许你可以…, 我建议你…, 不如…吧\n' +
      '\n' +
      'Adoucir :\n' +
      '- 这只是我的建议, 你自己决定\n' +
      '\n' +
      'RÈGLE D\'OR : **évite** 你应该 (moralisateur) et 你必须 (autoritaire). Préfère 你可以考虑…',
    bodyEn:
      'Open: 我跟你说一下我的想法，你参考一下 (let me share my thoughts, you decide). 你为什么不试试…？(why not try…?). Suggest: 也许你可以… (maybe you could…), 我建议你… (I suggest…), 不如…吧 (might as well…). Soften: 这只是我的建议 (this is just my advice), 你自己决定 (you decide). AVOID: 你应该 (you should — moralizing), 你必须 (you must — authoritarian). Prefer 你可以考虑… (you could consider). Chinese advice is INDIRECT to respect the other\'s autonomy.',
    items: [
      { hanzi: '建议', pinyin: 'jiàn yì', meaning: 'suggérer', meaningEn: 'suggest', audio: 'audio/hsk4/hsk4_建议.wav' },
      { hanzi: '参考', pinyin: 'cān kǎo', meaning: 'consulter, à titre indicatif', meaningEn: 'reference', audio: 'audio/hsk4/hsk4_参考.wav' },
      { hanzi: '试试', pinyin: 'shì shi', meaning: 'essayer un peu', meaningEn: 'give a try', audio: 'audio/hsk2/hsk2_试.wav' },
      { hanzi: '考虑', pinyin: 'kǎo lǜ', meaning: 'considérer', meaningEn: 'consider', audio: 'audio/hsk4/hsk4_考虑.wav' },
      { hanzi: '决定', pinyin: 'jué dìng', meaning: 'décider', meaningEn: 'decide', audio: 'audio/hsk3/hsk3_决定.wav' }
    ],
    tip:
      'Conseil culturel : « 你参考一下 » (à titre indicatif) est essentiel pour préserver la face de l\'autre. Sans cette précaution, ton conseil sonne autoritaire/moralisateur.',
    tipEn:
      'Cultural tip: «你参考一下» (just for reference) is essential to preserve the other\'s face. Without that hedge, your advice sounds authoritarian/moralizing.'
  },
  {
    id: 'b11-plainte',
    title: 'Exprimer une plainte sans être agressif',
    titleEn: 'Voice a complaint without being aggressive',
    body:
      'Se plaindre en chinois sans paraître agressif demande **calme + précision**. Commence toujours par 不好意思 ou 麻烦你 — ça adoucit énormément.\n' +
      '\n' +
      'Au resto :\n' +
      '- 不好意思，这个菜有点问题 (ce plat a un souci)\n' +
      '- 我点的不是这个 (ce n\'est pas ma commande)\n' +
      '- 能不能换一下？ (on peut changer ?)\n' +
      '\n' +
      'Produit défectueux :\n' +
      '- 这个东西坏了 (cassé)\n' +
      '- 能退货吗？ (je peux le retourner ?)\n' +
      '\n' +
      'Attention : **jamais** de ton de colère — si tu hausses la voix, ton interlocuteur perd la face et devient défensif.',
    bodyEn:
      'At a restaurant, in a store: 不好意思，这个菜有点问题 (sorry, this dish has an issue). 我点的不是这个 (this isn\'t what I ordered). Ask for an exchange: 能不能换一下？(can we swap?). For a defective product: 这个东西坏了 (broken), 能退货吗？(can I return it?). Always start with 不好意思 or 麻烦你 — softens hugely. Avoid an angry tone: if you raise your voice, the other loses face and becomes defensive. Calm + precise = winning your case.',
    items: [
      { hanzi: '问题', pinyin: 'wèn tí', meaning: 'problème', meaningEn: 'problem', audio: 'audio/hsk2/hsk2_问题.wav' },
      { hanzi: '换', pinyin: 'huàn', meaning: 'échanger', meaningEn: 'exchange', audio: 'audio/hsk3/hsk3_换.wav' },
      { hanzi: '坏', pinyin: 'huài', meaning: 'cassé, mauvais', meaningEn: 'broken, bad', audio: 'audio/hsk3/hsk3_坏.wav' },
      { hanzi: '退货', pinyin: 'tuì huò', meaning: 'retourner un achat', meaningEn: 'return goods', audio: 'audio/hsk5/hsk5_退货.wav' },
      { hanzi: '解决', pinyin: 'jiě jué', meaning: 'résoudre', meaningEn: 'solve', audio: 'audio/hsk4/hsk4_解决.wav' }
    ],
    tip:
      'Si tu rencontres un problème en Chine, formule : « 不好意思，能不能帮我解决一下？» (excusez-moi, pouvez-vous m\'aider à résoudre ça ?). Cette phrase ouvre des portes — tu demandes de l\'AIDE plutôt que de te plaindre.',
    tipEn:
      'If you hit a problem in China, frame: «不好意思，能不能帮我解决一下？» (excuse me, can you help me solve this?). This phrase opens doors — you ask for HELP rather than complain.'
  }
];

export const b11ConvM7LearnSections: LessonV2LearnSection[] = [
  {
    id: 'b11-projet',
    title: 'Présenter un projet ou une idée',
    titleEn: 'Present a project or idea',
    body:
      'Une présentation chinoise suit un squelette **rigide** : contexte → objectif → moyens → bénéfices → clôture. Le format chinois est plus formel qu\'en Occident — l\'improvisation est **mal vue**.\n' +
      '\n' +
      'Le squelette :\n' +
      '- **Ouvrir** : 我想介绍一下我们的项目\n' +
      '- **Contexte** : 大家都知道现在 X 是个问题\n' +
      '- **Objectif** : 我们希望解决 X\n' +
      '- **Moyens** : 通过 X 和 Y, 主要分三个步骤\n' +
      '- **Bénéfices** : 这样可以 X\n' +
      '- **Conclure** : 谢谢大家！欢迎提问',
    bodyEn:
      'Structure: context → objective → means → benefits. Open: 我想介绍一下我们的项目 (I\'d like to introduce our project). Context: 大家都知道现在 X 是个问题 (everyone knows X is a problem). Objective: 我们希望解决 X (our goal is to solve X). Means: 通过 X 和 Y (through X and Y), 主要分三个步骤 (mainly in 3 steps). Benefits: 这样可以 X (this way we can X). Close: 谢谢大家！欢迎提问 (thanks everyone, questions welcome). Chinese format is more structured and formal than the West — improvisation is frowned upon in pro settings.',
    items: [
      { hanzi: '项目', pinyin: 'xiàng mù', meaning: 'projet', meaningEn: 'project', audio: 'audio/hsk5/hsk5_项目.wav' },
      { hanzi: '介绍', pinyin: 'jiè shào', meaning: 'présenter', meaningEn: 'introduce', audio: 'audio/hsk2/hsk2_介绍.wav' },
      { hanzi: '解决', pinyin: 'jiě jué', meaning: 'résoudre', meaningEn: 'solve', audio: 'audio/hsk4/hsk4_解决.wav' },
      { hanzi: '步骤', pinyin: 'bù zhòu', meaning: 'étape', meaningEn: 'step', audio: 'audio/hsk5/hsk5_步骤.wav' },
      { hanzi: '提问', pinyin: 'tí wèn', meaning: 'poser une question', meaningEn: 'ask a question', audio: 'audio/hsk5/hsk5_提问.wav' }
    ],
    tip:
      'Lors d\'une présentation chinoise, éviter l\'humour spontané — risque de perdre la face si la blague tombe à plat. Le sérieux + structuré est valorisé. L\'humour vient APRÈS, en privé.',
    tipEn:
      'In a Chinese presentation, avoid spontaneous humor — risk of losing face if the joke falls flat. Serious + structured is valued. Humor comes LATER, in private.'
  },
  {
    id: 'b11-parcours',
    title: 'Parler de son parcours et ses ambitions',
    titleEn: 'Talk about your journey and ambitions',
    body:
      'Parler de son parcours combine **récit chronologique** + **projection** vers l\'avenir. Quelques verbes-pivots structurent tout.\n' +
      '\n' +
      'Verbes-pivots du parcours :\n' +
      '- 学 (étudier), 毕业 (diplômé), 工作 (travailler)\n' +
      '- 换工作 (changer de job)\n' +
      '- 跳槽 (démissionner pour mieux — **argot RH chinois**)\n' +
      '- 创业 (créer une boîte)\n' +
      '\n' +
      'Ambitions & rêves :\n' +
      '- 我想在 X 年内 X / 我的目标是 X\n' +
      '- 我希望有一天 X\n' +
      '- 我想找一份有意义的工作 (sujet d\'époque, très utilisé par les jeunes)',
    bodyEn:
      'Narrative: 我在大学学了 X 年，毕业后去了 X 公司 (studied X years at uni, after grad went to X company). Pivot verbs: 学 (study), 毕业 (graduate), 工作 (work), 换工作 (change jobs), 跳槽 (jump ship for better — Chinese HR slang), 创业 (start a business). Ambitions: 我想在 X 年内 X (I\'d like X within X years), 我的目标是 X. For dreams: 我希望有一天 X (I hope one day). Very common modern phrase among young people: 我想找一份有意义的工作 (I want a job that has meaning) — generational topic.',
    items: [
      { hanzi: '毕业', pinyin: 'bì yè', meaning: 'diplômé', meaningEn: 'graduate', audio: 'audio/hsk4/hsk4_毕业.wav' },
      { hanzi: '换工作', pinyin: 'huàn gōng zuò', meaning: 'changer de boulot', meaningEn: 'change jobs', audio: 'audio/hsk3/hsk3_换.wav' },
      { hanzi: '跳槽', pinyin: 'tiào cáo', meaning: 'démissionner pour mieux', meaningEn: 'jump ship', audio: 'audio/hsk6/hsk6_跳槽.wav' },
      { hanzi: '创业', pinyin: 'chuàng yè', meaning: 'créer une boîte', meaningEn: 'start a business', audio: 'audio/hsk5/hsk5_创业.wav' },
      { hanzi: '目标', pinyin: 'mù biāo', meaning: 'objectif', meaningEn: 'goal', audio: 'audio/hsk4/hsk4_目标.wav' }
    ],
    tip:
      '« 跳槽 » (« sauter du bac/auge ») est l\'argot RH chinois pour démissionner et aller chez la concurrence. Très utilisé en tech et finance. À reconnaître absolument en conversation pro.',
    tipEn:
      '«跳槽» («jumping the trough») is Chinese HR slang for resigning to join a competitor. Very common in tech and finance. Must recognize in pro conversations.'
  }
];

// === NUANCES B1.1 ============================================================

export const b11NuancesM1LearnSections: LessonV2LearnSection[] = [
  {
    id: 'b11-rang-shi-jiao',
    title: '让 vs 使 vs 叫 — trois causatifs « faire faire »',
    titleEn: '让 vs 使 vs 叫 — three causatives «make do»',
    body:
      'Trois verbes pour « faire faire » — chacun avec son **registre** propre. La hiérarchie va du neutre au formel.\n' +
      '\n' +
      'Les trois causatifs :\n' +
      '- **让** (ràng) = laisser / faire faire (oral, **neutre**) : 妈妈让我去\n' +
      '- **叫** (jiào) = ordonner (oral, **autoritaire**) : 老板叫我加班\n' +
      '- **使** (shǐ) = causer (formel, écrit, **abstrait**) : 这个故事使我感动\n' +
      '\n' +
      'Attention : **jamais** 让我感动 dans un texte écrit soutenu — utilise 使. À l\'oral, 让 est ton ami par défaut.',
    bodyEn:
      '让 (ràng) = let / make do (spoken, neutral). 妈妈让我去 = mom makes me go / lets me go. The most universal in speech. 使 (shǐ) = cause (formal, written, abstract — emotions, states). 这个故事使我感动 = this story moves me. NEVER 让我感动 in formal writing. 叫 (jiào) = order (spoken, authoritative — superior to subordinate, parent to child). 老板叫我加班 = boss ordered me to work overtime. More directive tone. Hierarchy: 让 (neutral) < 叫 (authority) < 使 (formal/abstract).',
    items: [
      { hanzi: '让', pinyin: 'ràng', meaning: 'laisser, faire faire', meaningEn: 'let, make do', audio: 'audio/hsk2/hsk2_让.wav' },
      { hanzi: '使', pinyin: 'shǐ', meaning: 'causer (formel)', meaningEn: 'cause (formal)', audio: 'audio/hsk3/hsk3_使.wav' },
      { hanzi: '叫', pinyin: 'jiào', meaning: 'ordonner', meaningEn: 'order, tell', audio: 'audio/hsk1/hsk1_叫.wav' },
      { hanzi: '感动', pinyin: 'gǎn dòng', meaning: 'émouvoir', meaningEn: 'move emotionally', audio: 'audio/hsk4/hsk4_感动.wav' },
      { hanzi: '加班', pinyin: 'jiā bān', meaning: 'faire des heures sup', meaningEn: 'work overtime', audio: 'audio/hsk4/hsk4_加班.wav' }
    ],
    tip:
      'Test rapide : si tu peux remplacer par « ordonner » → 叫. Par « émouvoir / rendre » devant un état abstrait → 使. Sinon → 让 par défaut. Le 让 est ton ami à l\'oral.',
    tipEn:
      'Quick test: if you can replace with «order» → 叫. With «move/render» before an abstract state → 使. Otherwise → 让 by default. 让 is your friend in speech.'
  },
  {
    id: 'b11-bei-rang',
    title: '让 (passif oral) vs 被 (passif standard)',
    titleEn: '让 (oral passive) vs 被 (standard passive)',
    body:
      'En plus du causatif, **让 sert aussi de passif** à l\'oral. La différence avec 被 est subtile mais réelle.\n' +
      '\n' +
      'Trois passifs, du plus oral au plus écrit :\n' +
      '- **给** (gěi) — oral familier : 我给他骗了\n' +
      '- **让** (ràng) — oral, teinte « j\'ai laissé arriver » : 我让他骗了\n' +
      '- **被** (bèi) — neutre, écrit : 我被他骗了\n' +
      '\n' +
      'Attention : à l\'écrit B1+, préfère **toujours** 被. Le 让-passif garde une nuance de **responsabilité partielle**.',
    bodyEn:
      'Beyond causative, 让 ALSO serves as oral passive. 我让他骗了 = I got tricked by him (oral passive). 我被他骗了 = I was deceived by him (standard passive). Difference: 让-passive is MORE ORAL and carries a slight «I let it happen» tinge (partial responsibility). 被-passive is MORE NEUTRAL and can be written. Even more spoken synonym: 给 (gěi) — 我给他骗了 (casual oral). Hierarchy oral → written: 给 < 让 < 被.',
    items: [
      { hanzi: '被', pinyin: 'bèi', meaning: 'particule passive', meaningEn: 'passive particle', audio: 'audio/hsk3/hsk3_被.wav' },
      { hanzi: '骗', pinyin: 'piàn', meaning: 'tromper', meaningEn: 'deceive', audio: 'audio/hsk5/hsk5_骗.wav' },
      { hanzi: '偷', pinyin: 'tōu', meaning: 'voler', meaningEn: 'steal', audio: 'audio/hsk4/hsk4_偷.wav' },
      { hanzi: '丢', pinyin: 'diū', meaning: 'perdre', meaningEn: 'lose', audio: 'audio/hsk4/hsk4_丢.wav' },
      { hanzi: '抓', pinyin: 'zhuā', meaning: 'attraper', meaningEn: 'catch', audio: 'audio/hsk5/hsk5_抓.wav' }
    ],
    tip:
      'À l\'écrit B1+, préfère TOUJOURS 被 pour le passif. À l\'oral entre amis, 给/让 sont OK. En conversation pro avec un supérieur, garde 被 (plus neutre, sans suggérer ta responsabilité).',
    tipEn:
      'In B1+ writing, ALWAYS prefer 被 for passive. Orally among friends, 给/让 are fine. In pro conversation with a superior, keep 被 (more neutral, doesn\'t suggest your responsibility).'
  }
];

export const b11NuancesM2LearnSections: LessonV2LearnSection[] = [
  {
    id: 'b11-gei-wei-ti',
    title: '给 vs 为 vs 替 — pour, à la place de, au profit de',
    titleEn: '给 vs 为 vs 替 — for, in place of, in favor of',
    body:
      'Trois mots pour « pour » — chacun avec son **angle** spécifique. Comprendre la nuance évite des erreurs classiques.\n' +
      '\n' +
      'Les trois angles :\n' +
      '- **给** (gěi) = transmission **concrète** (à) : 我给妈妈打电话\n' +
      '- **为** (wèi) = motivation / cause **abstraite** : 我为你高兴, 我为环境做点事\n' +
      '- **替** (tì) = substitution **physique** : 我替你去\n' +
      '\n' +
      'Attention : erreur classique d\'utiliser 为 pour un coup de fil → 我为妈妈打电话 ✗. C\'est 给.',
    bodyEn:
      '给 (gěi) = to, give to (concrete recipient). 我给妈妈打电话 = I call mom (to her). 为 (wèi) = for, in favor of (abstract cause / motivation). 我为你高兴 = I\'m happy for you. 我为环境做点事 = I do something for the environment. 替 (tì) = in place of, as a substitute. 我替你去 = I\'ll go in your place. Differences: 给 = concrete transmission (object, message); 为 = abstract motivation/cause; 替 = physical substitution. Common mistake: using 为 for a phone call → 我为妈妈打电话 ✗.',
    items: [
      { hanzi: '给', pinyin: 'gěi', meaning: 'à, donner à', meaningEn: 'to, give to', audio: 'audio/hsk2/hsk2_给.wav' },
      { hanzi: '为', pinyin: 'wèi', meaning: 'pour (motivation)', meaningEn: 'for (motivation)', audio: 'audio/hsk3/hsk3_为.wav' },
      { hanzi: '替', pinyin: 'tì', meaning: 'à la place de', meaningEn: 'in place of', audio: 'audio/hsk4/hsk4_替.wav' },
      { hanzi: '环境', pinyin: 'huán jìng', meaning: 'environnement', meaningEn: 'environment', audio: 'audio/hsk3/hsk3_环境.wav' },
      { hanzi: '帮忙', pinyin: 'bāng máng', meaning: 'donner un coup de main', meaningEn: 'give a hand', audio: 'audio/hsk3/hsk3_帮忙.wav' }
    ],
    tip:
      'Astuce sentimentale : « 我为你高兴 » (je suis content POUR toi) est plus chaleureux que « 我替你高兴 » (je remplace ta joie). Sentir la différence affective entre 为 (motivation) et 替 (remplacement) est un vrai marqueur B1.',
    tipEn:
      'Emotional tip: «我为你高兴» (I\'m happy FOR you) is warmer than «我替你高兴» (I substitute your joy). Feeling the affective difference between 为 (motivation) and 替 (replacement) is a real B1 marker.'
  },
  {
    id: 'b11-yong-ti',
    title: '替 vs 代 — substitution informelle vs formelle',
    titleEn: '替 vs 代 — informal vs formal substitution',
    body:
      'Deux verbes pour « remplacer » distingués par le **registre** : 替 (oral) vs 代 (formel).\n' +
      '\n' +
      'Les deux usages :\n' +
      '- **替** (tì) — oral, **informel**, actions ponctuelles : 我替他去 (j\'y vais à sa place)\n' +
      '- **代** (dài) — formel, écrit, **structuré** : 代表 (représentant), 代理 (agent), 代课 (cours de remplacement)\n' +
      '\n' +
      'Astuce : formule passe-partout — **代我向他问好** (passe-lui mes salutations). À l\'écrit, préfère **systématiquement** 代.',
    bodyEn:
      '替 (tì) = replace (spoken, informal). 我替他去 = I go in his place. 代 (dài) = replace (formal, written, institutional). 代表 = representative. 代理 = agent. 代课 = substitute teaching. At B1, remember: 替 for casual one-off actions among friends; 代 for institutional roles. Useful compound: 代我向他问好 = pass on my regards (on my behalf). 替我向他问好 works too but 代 is slightly more refined. In writing, always prefer 代.',
    items: [
      { hanzi: '代', pinyin: 'dài', meaning: 'remplacer (formel)', meaningEn: 'substitute (formal)', audio: 'audio/hsk5/hsk5_代.wav' },
      { hanzi: '代表', pinyin: 'dài biǎo', meaning: 'représentant', meaningEn: 'representative', audio: 'audio/hsk4/hsk4_代表.wav' },
      { hanzi: '代理', pinyin: 'dài lǐ', meaning: 'agent, intérim', meaningEn: 'agent, acting', audio: 'audio/hsk6/hsk6_代理.wav' },
      { hanzi: '问好', pinyin: 'wèn hǎo', meaning: 'saluer', meaningEn: 'greet', audio: 'audio/hsk2/hsk2_问好.wav' },
      { hanzi: '向', pinyin: 'xiàng', meaning: 'vers, à', meaningEn: 'toward, to', audio: 'audio/hsk3/hsk3_向.wav' }
    ],
    tip:
      'Formule très utile à mémoriser : « 代我向 X 问好 » = passe mes salutations à X. Universellement utilisée et très appréciée en chinois — montre que tu te soucies des proches de l\'autre.',
    tipEn:
      'Very useful formula: «代我向 X 问好» = pass on my greetings to X. Universally used and very appreciated in Chinese — shows you care about the other\'s loved ones.'
  }
];

export const b11NuancesM3LearnSections: LessonV2LearnSection[] = [
  {
    id: 'b11-qilai-xiaqu',
    title: '起来 vs 下去 vs 出来 — composés directionnels aspectuels',
    titleEn: '起来 vs 下去 vs 出来 — aspectual directional compounds',
    body:
      'Au-delà du sens directionnel basique, ces composés portent un **aspect verbal**. Les trois sont fondamentaux à l\'oral B1.\n' +
      '\n' +
      'Les trois aspects :\n' +
      '- **起来** = **commencer** (action qui démarre) : 我笑起来了, 想起来 (se souvenir), 看起来 (avoir l\'air de)\n' +
      '- **下去** = **continuer** (action qui persiste) : 说下去 (continue à parler), 看下去 (continue à lire)\n' +
      '- **出来** = **révéler** (action qui se manifeste) : 我看出来了 (j\'ai compris), 听出来 (reconnaître à l\'oreille)',
    bodyEn:
      'Beyond their basic directional sense, these compounds carry a verbal ASPECT. 起来 = start (action that BEGINS). 我笑起来了 = I started laughing. 想起来 = remember (idea surfaces). 看起来 = look like. 下去 = continue (action that PERSISTS). 说下去 = keep talking. 看下去 = keep reading. 出来 = manifest (action that REVEALS). 我看出来了 = I figured it out (caught visually). 听出来 = recognize by ear. These 3 are fundamental B1 oral.',
    items: [
      { hanzi: '起来', pinyin: 'qǐ lái', meaning: 'commencer (aspect)', meaningEn: 'start (aspect)', audio: 'audio/hsk3/hsk3_起来.wav' },
      { hanzi: '下去', pinyin: 'xià qù', meaning: 'continuer (aspect)', meaningEn: 'continue (aspect)', audio: 'audio/hsk3/hsk3_下去.wav' },
      { hanzi: '出来', pinyin: 'chū lái', meaning: 'révéler (aspect)', meaningEn: 'reveal (aspect)', audio: 'audio/hsk3/hsk3_出来.wav' },
      { hanzi: '想起来', pinyin: 'xiǎng qǐ lái', meaning: 'se souvenir', meaningEn: 'recall', audio: 'audio/hsk3/hsk3_想.wav' },
      { hanzi: '看出来', pinyin: 'kàn chū lái', meaning: 'comprendre, deviner', meaningEn: 'figure out', audio: 'audio/hsk1/hsk1_看.wav' }
    ],
    tip:
      'Trio mnémotechnique : 起来 = COMMENCER (debout = on commence) | 下去 = CONTINUER (descend = on poursuit) | 出来 = RÉVÉLER (sort = ça apparaît). À mémoriser comme bloc.',
    tipEn:
      'Mnemonic trio: 起来 = START (standing up = you begin) | 下去 = CONTINUE (going down = you keep going) | 出来 = REVEAL (coming out = it appears). Memorize as a block.'
  },
  {
    id: 'b11-qilai-suivant',
    title: '起来 d\'apparence : « 看起来 / 听起来 / 闻起来 »',
    titleEn: '起来 of appearance: «看起来 / 听起来 / 闻起来»',
    body:
      'Construction très productive : **verbe de sens + 起来** = avoir l\'air / sembler. Une famille à mémoriser comme un tout.\n' +
      '\n' +
      'Les six sens :\n' +
      '- 看起来 (visuellement), 听起来 (auditivement)\n' +
      '- 闻起来 (olfactivement), 摸起来 (au toucher)\n' +
      '- 吃起来 (au goût), 用起来 (à l\'usage)\n' +
      '\n' +
      'Exemples typiques :\n' +
      '- 这个菜看起来很好吃 (ce plat a l\'air bon)\n' +
      '- 这个想法听起来不错 (cette idée semble bien)\n' +
      '\n' +
      'Attention : ne pas confondre avec **像** (comparaison concrète). « Ça a l\'air bon » = 看起来好 ; « ça ressemble à un poisson » = 像鱼.',
    bodyEn:
      'Very useful construction: sense + 起来 = look like / sound like. 看起来 (visually), 听起来 (auditorily), 闻起来 (olfactorily), 摸起来 (by touch), 吃起来 (by taste), 用起来 (by use). 这个菜看起来很好吃 = this dish looks tasty. 这个想法听起来不错 = this idea sounds good. Common mistake: using 像 (be like) — wrong. 像 introduces a concrete comparison, not a sensory impression. «Looks tasty» = 看起来好; «looks like a fish» = 像鱼.',
    items: [
      { hanzi: '看起来', pinyin: 'kàn qǐ lái', meaning: 'avoir l\'air', meaningEn: 'look like', audio: 'audio/hsk1/hsk1_看.wav' },
      { hanzi: '听起来', pinyin: 'tīng qǐ lái', meaning: 'sembler à l\'oreille', meaningEn: 'sound like', audio: 'audio/hsk1/hsk1_听.wav' },
      { hanzi: '闻起来', pinyin: 'wén qǐ lái', meaning: 'sentir', meaningEn: 'smell like', audio: 'audio/hsk5/hsk5_闻.wav' },
      { hanzi: '摸起来', pinyin: 'mō qǐ lái', meaning: 'au toucher', meaningEn: 'feels like', audio: 'audio/hsk5/hsk5_摸.wav' },
      { hanzi: '吃起来', pinyin: 'chī qǐ lái', meaning: 'au goût', meaningEn: 'tastes like', audio: 'audio/hsk1/hsk1_吃.wav' }
    ],
    tip:
      'Pour donner ton AVIS sur un plat sans engagement total : « 看起来不错，但我没尝过 » (ça a l\'air bon, mais je n\'ai pas goûté). Phrase de politesse universelle.',
    tipEn:
      'To give an OPINION on a dish without full commitment: «看起来不错，但我没尝过» (looks good but I haven\'t tasted). Universal polite phrase.'
  }
];

export const b11NuancesM4LearnSections: LessonV2LearnSection[] = [
  {
    id: 'b11-xiang-haoxiang',
    title: '像 vs 好像 vs 似乎 — comme, on dirait, semble',
    titleEn: '像 vs 好像 vs 似乎 — like, seems, appears',
    body:
      'Trois mots pour « comme / sembler », distingués par la nature de la **comparaison**.\n' +
      '\n' +
      'Les trois nuances :\n' +
      '- **像** (xiàng) = ressembler à (comparaison **concrète**) : 他像他爸爸, 像你这样的人\n' +
      '- **好像** (hǎoxiàng) = on dirait, apparemment (impression **incertaine** oral) : 好像下雨了, 他好像不知道\n' +
      '- **似乎** (sìhū) = sembler (impression **écrite** formelle) : 似乎不太可能\n' +
      '\n' +
      'Attention : erreur classique d\'utiliser 像 pour « il semble que » → préfère **好像**.',
    bodyEn:
      '像 (xiàng) = resemble (CONCRETE comparison). 他像他爸爸 = he looks like his dad. 像你这样的人 = someone like you. 好像 (hǎoxiàng) = seems, apparently (UNCERTAIN impression). 好像下雨了 = seems like it\'s raining. 他好像不知道 = apparently he doesn\'t know. 似乎 (sìhū) = appear (formal, written). 似乎不太可能 = appears unlikely. Hierarchy: 像 (concrete comparison) ≠ 好像 (oral impression) ≠ 似乎 (written impression). Common mistake: using 像 for «it seems» → prefer 好像.',
    items: [
      { hanzi: '像', pinyin: 'xiàng', meaning: 'ressembler à', meaningEn: 'resemble', audio: 'audio/hsk3/hsk3_像.wav' },
      { hanzi: '好像', pinyin: 'hǎo xiàng', meaning: 'on dirait', meaningEn: 'seem', audio: 'audio/hsk4/hsk4_好像.wav' },
      { hanzi: '似乎', pinyin: 'sì hū', meaning: 'sembler (écrit)', meaningEn: 'appear (written)', audio: 'audio/hsk5/hsk5_似乎.wav' },
      { hanzi: '可能', pinyin: 'kě néng', meaning: 'peut-être', meaningEn: 'maybe', audio: 'audio/hsk2/hsk2_可能.wav' },
      { hanzi: '不太', pinyin: 'bú tài', meaning: 'pas trop', meaningEn: 'not very', audio: 'audio/hsk2/hsk2_不太.wav' }
    ],
    tip:
      'À l\'oral B1, 好像 est l\'outil n°1 pour adoucir une affirmation. « Il est en colère » → trop tranchant ; « 他好像生气了 » → impression nuancée. Fais-en ton ami.',
    tipEn:
      'In B1 speech, 好像 is the n°1 tool to soften an assertion. «He\'s angry» → too sharp; «他好像生气了» → nuanced impression. Make it your friend.'
  },
  {
    id: 'b11-shide-haoxiang',
    title: 'Variantes : 似的 / 一样 / 跟…一样',
    titleEn: 'Variants: 似的 / 一样 / 跟…一样',
    body:
      'Deux variantes complètent 像 et 好像. La distinction clé : **ressemblance** (像) vs **égalité** (一样).\n' +
      '\n' +
      'Les deux variantes :\n' +
      '- **似的** (shìde) = comme (en **fin** de comparaison) : 像孩子似的 — souvent en duo avec 像\n' +
      '- **一样** (yíyàng) = pareil : 我跟你一样 — combo classique **跟 X 一样 + adj** = aussi… que X (他跟我一样高)\n' +
      '\n' +
      'Attention : 他像我 = il me ressemble (en partie) ; 他跟我一样 = il est **identique** en ce point précis.',
    bodyEn:
      '似的 (shìde) = like (at the end of the comparison). 像孩子似的 = like a child. Often paired with 像: 像 X 似的. 一样 (yíyàng) = same. 我跟你一样 = I\'m like you. Classic combo: 跟 X 一样 + adjective = as… as X. 他跟我一样高 = he\'s as tall as me. Distinguish: 像 = general resemblance (like), 一样 = equality (same). 他像我 = he looks like me (partially); 他跟我一样 = he\'s like me (identical on that specific point).',
    items: [
      { hanzi: '似的', pinyin: 'shì de', meaning: 'comme (final)', meaningEn: 'like (final)', audio: 'audio/hsk5/hsk5_似的.wav' },
      { hanzi: '一样', pinyin: 'yí yàng', meaning: 'pareil', meaningEn: 'same', audio: 'audio/hsk3/hsk3_一样.wav' },
      { hanzi: '不一样', pinyin: 'bù yí yàng', meaning: 'différent', meaningEn: 'different', audio: 'audio/hsk3/hsk3_一样.wav' },
      { hanzi: '跟…一样', pinyin: 'gēn yí yàng', meaning: 'comme, aussi…que', meaningEn: 'same as, as…as', audio: 'audio/hsk3/hsk3_跟.wav' },
      { hanzi: '比', pinyin: 'bǐ', meaning: 'que (compare)', meaningEn: 'than', audio: 'audio/hsk2/hsk2_比.wav' }
    ],
    tip:
      'Astuce comparison : 跟…一样 (égalité) vs 比 (comparaison avec différence). 他跟我一样高 = il est aussi grand que moi (égal). 他比我高 = il est plus grand que moi (différent).',
    tipEn:
      'Comparison tip: 跟…一样 (equality) vs 比 (comparison with difference). 他跟我一样高 = he\'s as tall as me (equal). 他比我高 = he\'s taller than me (different).'
  }
];

export const b11NuancesM5LearnSections: LessonV2LearnSection[] = [
  {
    id: 'b11-na-dai-bao',
    title: '拿 vs 带 vs 抱 — porter / apporter / serrer',
    titleEn: '拿 vs 带 vs 抱 — hold / bring / hug',
    body:
      'Trois verbes pour « porter », distingués par le **canal corporel** et le **poids** de l\'objet.\n' +
      '\n' +
      'Les trois usages :\n' +
      '- **拿** (ná) — **main**, objet petit, prise active : 我拿着一本书, 帮我拿一下\n' +
      '- **带** (dài) — **apporter avec soi** (objet ou personne) : 我带了水, 我带孩子去公园\n' +
      '- **抱** (bào) — **bras**, étreinte : 抱孩子 (porter un bébé), 抱你一下 (un câlin)\n' +
      '\n' +
      'Astuce : test rapide — peux-tu **attraper** (拿) ? **apporter** (带) ? **enlacer** (抱) ?',
    bodyEn:
      '拿 (ná) = take / hold in the hand (small object, active grip). 我拿着一本书 = I\'m holding a book. 帮我拿一下 = give me a hand to grab. 带 (dài) = bring / take along (object OR person, movement context). 我带了水 = I brought water. 我带孩子去公园 = I\'m taking the kids to the park. 抱 (bào) = hold in arms / hug. 抱孩子 (hold a baby), 抱你一下 (a hug). Difference: 拿 (hand, object) ≠ 带 (bring along) ≠ 抱 (arms, hug).',
    items: [
      { hanzi: '拿', pinyin: 'ná', meaning: 'tenir, prendre', meaningEn: 'hold, take', audio: 'audio/hsk3/hsk3_拿.wav' },
      { hanzi: '带', pinyin: 'dài', meaning: 'apporter, amener', meaningEn: 'bring, take along', audio: 'audio/hsk3/hsk3_带.wav' },
      { hanzi: '抱', pinyin: 'bào', meaning: 'porter dans les bras, étreindre', meaningEn: 'hug, hold in arms', audio: 'audio/hsk5/hsk5_抱.wav' },
      { hanzi: '提', pinyin: 'tí', meaning: 'porter (par anse)', meaningEn: 'carry (by handle)', audio: 'audio/hsk3/hsk3_提.wav' },
      { hanzi: '搬', pinyin: 'bān', meaning: 'déplacer (lourd)', meaningEn: 'move (heavy)', audio: 'audio/hsk5/hsk5_搬.wav' }
    ],
    tip:
      'Test rapide : « peux-tu attraper un livre ? » → 拿 (main). « Tu as pris ton parapluie ? » → 带 (apporter). « Tiens-moi le bébé » → 抱 (bras). Le verbe dépend du POIDS, du CANAL et du contexte.',
    tipEn:
      'Quick test: «can you grab a book?» → 拿 (hand). «Did you bring your umbrella?» → 带 (bring along). «Hold the baby» → 抱 (arms). The verb depends on WEIGHT, CHANNEL and context.'
  },
  {
    id: 'b11-songti-jihui',
    title: '送 vs 寄 vs 递 — donner / envoyer / passer',
    titleEn: '送 vs 寄 vs 递 — give / send / pass',
    body:
      'Trois verbes pour « donner » distingués par le **canal** : geste, poste, main.\n' +
      '\n' +
      'Les trois usages :\n' +
      '- **送** (sòng) = offrir / accompagner / livrer : 我送你一个礼物, 我送你回家\n' +
      '- **寄** (jì) = envoyer par la **poste** : 我寄了一封信, 寄快递 (envoi express)\n' +
      '- **递** (dì) = passer de **main à main** : 把那个递给我\n' +
      '\n' +
      'Astuce : 邮递员 = facteur (composé poste + passer + personne) — un beau résumé.',
    bodyEn:
      '送 (sòng) = give as a gift / accompany / deliver. 我送你一个礼物 = I give you a gift. 我送你回家 = I\'ll see you home. Verb with 2 fundamental senses. 寄 (jì) = send by mail / courier. 我寄了一封信 = I sent a letter. 寄快递 = express shipping. 递 (dì) = pass (hand to hand). 把那个递给我 = pass that to me. Trinket, short distance. Three different verbs: 送 (gift or escort), 寄 (postal), 递 (hand to hand). 邮递员 = postman (compound: mail + pass + person).',
    items: [
      { hanzi: '送', pinyin: 'sòng', meaning: 'offrir, accompagner', meaningEn: 'gift, escort', audio: 'audio/hsk2/hsk2_送.wav' },
      { hanzi: '寄', pinyin: 'jì', meaning: 'envoyer par poste', meaningEn: 'mail', audio: 'audio/hsk4/hsk4_寄.wav' },
      { hanzi: '递', pinyin: 'dì', meaning: 'passer de main', meaningEn: 'pass by hand', audio: 'audio/hsk6/hsk6_递.wav' },
      { hanzi: '快递', pinyin: 'kuài dì', meaning: 'livraison express', meaningEn: 'express delivery', audio: 'audio/hsk5/hsk5_快递.wav' },
      { hanzi: '礼物', pinyin: 'lǐ wù', meaning: 'cadeau', meaningEn: 'gift', audio: 'audio/hsk3/hsk3_礼物.wav' }
    ],
    tip:
      'En Chine, 送 a un sens très large : « je te raccompagne » utilise le même verbe que « je t\'offre un cadeau ». Comprendre cette polyvalence ouvre la porte au sens chinois de « accompagner = offrir du temps ».',
    tipEn:
      'In Chinese, 送 has a very broad sense: «I\'ll see you home» uses the same verb as «I give you a gift». Grasping this versatility opens the door to the Chinese sense of «accompanying = gifting time».'
  }
];

export const b11NuancesM6LearnSections: LessonV2LearnSection[] = [
  {
    id: 'b11-tingjian-tingdao',
    title: '听 vs 听见 vs 听到 — entendre vs avoir entendu',
    titleEn: '听 vs 听见 vs 听到 — hear vs have heard',
    body:
      'Trois nuances de l\'audition. La différence se joue entre **action volontaire** et **perception accomplie**.\n' +
      '\n' +
      'Les trois usages :\n' +
      '- **听** (tīng) = écouter (action volontaire, processus) : 我在听音乐\n' +
      '- **听见** (tīngjiàn) = avoir entendu (perception **physique** aboutie) : 我听见了\n' +
      '- **听到** (tīngdào) = entendre / avoir reçu une **info** : 我听到他生病了\n' +
      '\n' +
      'Astuce : à l\'oral, 听见 et 听到 sont souvent interchangeables — sauf quand 听到 introduit une **info/rumeur**.',
    bodyEn:
      '听 (tīng) = listen (voluntary action, process). 我在听音乐 = I\'m listening to music. 听见 (tīngjiàn) = have heard (effortless completed perception). 我听见了 = I heard it. 听到 (tīngdào) = hear / have received info (result + sometimes news). 我听到他生病了 = I heard he\'s sick. Difference: 听 = action, 听见 = completed physical perception, 听到 = info arrived + perception. In speech, 听见 and 听到 are often interchangeable except when 听到 introduces INFO/RUMOR.',
    items: [
      { hanzi: '听', pinyin: 'tīng', meaning: 'écouter', meaningEn: 'listen', audio: 'audio/hsk1/hsk1_听.wav' },
      { hanzi: '听见', pinyin: 'tīng jiàn', meaning: 'avoir entendu', meaningEn: 'have heard', audio: 'audio/hsk1/hsk1_听.wav' },
      { hanzi: '听到', pinyin: 'tīng dào', meaning: 'entendre (info)', meaningEn: 'hear (info)', audio: 'audio/hsk1/hsk1_听.wav' },
      { hanzi: '听说', pinyin: 'tīng shuō', meaning: 'j\'ai entendu dire', meaningEn: 'I heard', audio: 'audio/hsk2/hsk2_听说.wav' },
      { hanzi: '声音', pinyin: 'shēng yīn', meaning: 'son, voix', meaningEn: 'sound, voice', audio: 'audio/hsk3/hsk3_声音.wav' }
    ],
    tip:
      'Trois 听 + résultat : 听见 (perception physique : « tu m\'entends ? »), 听到 (info : « j\'ai entendu que… »), 听懂 (compréhension : « j\'ai compris ce que tu dis »). 听不懂 = je ne comprends pas (audio).',
    tipEn:
      'Three 听 + result: 听见 (physical perception: «do you hear me?»), 听到 (info: «I heard that…»), 听懂 (comprehension: «I understood what you said»). 听不懂 = I don\'t understand (audio).'
  },
  {
    id: 'b11-ganjue-juede',
    title: '感觉 vs 觉得 vs 感到 — sensation vs opinion',
    titleEn: '感觉 vs 觉得 vs 感到 — sensation vs opinion',
    body:
      'Trois verbes proches mais distincts : **sensation** vs **opinion** vs **ressenti structuré**.\n' +
      '\n' +
      'Les trois nuances :\n' +
      '- **感觉** (gǎnjué) = sentir, sensation **physique** ou émotionnelle : 我感觉冷, 我感觉很累\n' +
      '- **觉得** (juéde) = trouver, **opinion** subjective : 我觉得这个菜好吃\n' +
      '- **感到** (gǎndào) = ressentir, éprouver (plus **formel / écrit**) : 感到惊讶\n' +
      '\n' +
      'Astuce : pour une **douleur physique**, préfère 感觉 ; pour une **opinion**, préfère 觉得.',
    bodyEn:
      '感觉 (gǎnjué) = feel, sensation (PHYSICAL or bodily/emotional experience). 我感觉冷 = I feel cold. 我感觉很累 = I feel tired. 觉得 (juéde) = find, think (subjective OPINION — already covered). 我觉得这个菜好吃 = I find this dish tasty. 感到 (gǎndào) = experience, feel (slightly more formal/written than 感觉). 感到惊讶 = be surprised. Hierarchy: 感觉 (oral, sensation) < 觉得 (oral, opinion) < 感到 (written, structured feeling). For physical pain: prefer 感觉. For an opinion: prefer 觉得.',
    items: [
      { hanzi: '感觉', pinyin: 'gǎn jué', meaning: 'sentir, sensation', meaningEn: 'feel, sensation', audio: 'audio/hsk3/hsk3_感觉.wav' },
      { hanzi: '觉得', pinyin: 'jué de', meaning: 'trouver, penser', meaningEn: 'think, find', audio: 'audio/hsk2/hsk2_觉得.wav' },
      { hanzi: '感到', pinyin: 'gǎn dào', meaning: 'ressentir', meaningEn: 'experience', audio: 'audio/hsk4/hsk4_感到.wav' },
      { hanzi: '惊讶', pinyin: 'jīng yà', meaning: 'surpris', meaningEn: 'surprised', audio: 'audio/hsk5/hsk5_惊讶.wav' },
      { hanzi: '感动', pinyin: 'gǎn dòng', meaning: 'ému', meaningEn: 'moved', audio: 'audio/hsk4/hsk4_感动.wav' }
    ],
    tip:
      'Bonne pratique : à l\'oral, n\'hésite pas à utiliser 我感觉 quand tu décris une sensation ; 我觉得 pour une opinion. 我感到 reste utile à l\'écrit ou dans un discours soigné.',
    tipEn:
      'Good practice: in speech, freely use 我感觉 when describing a sensation; 我觉得 for an opinion. 我感到 remains useful in writing or in polished speech.'
  }
];

export const b11NuancesM7LearnSections: LessonV2LearnSection[] = [
  {
    id: 'b11-yibian-youyou',
    title: '一边…一边… vs 又…又… — actions simultanées',
    titleEn: '一边…一边… vs 又…又… — simultaneous actions',
    body:
      'Deux structures pour la **simultanéité**, à ne pas confondre : actions vs qualités.\n' +
      '\n' +
      'Les deux structures :\n' +
      '- **一边 X 一边 Y** = deux **actions** simultanées, même sujet : 我一边吃饭一边看电视\n' +
      '- **又 X 又 Y** = deux **qualités / états** qui coexistent : 这个菜又好吃又便宜\n' +
      '\n' +
      'Attention : erreur classique 我又吃饭又看电视 ✗ — ça énumère, ça ne simultanéise pas. Pour des actions concurrentes, préfère **toujours** 一边…一边….',
    bodyEn:
      '一边 X 一边 Y = doing X and Y at the same time (two ACTIONS, same subject, truly SIMULTANEOUS). 我一边吃饭一边看电视 = I eat while watching TV. 又 X 又 Y = having X and Y at the same time (two QUALITIES / STATES, parallelism). 这个菜又好吃又便宜 = this dish is both tasty and cheap. Radical difference: 一边 = ACTIONS taking place; 又…又 = QUALITIES coexisting. Common mistake: 我又吃饭又看电视 = I eat AND watch TV (enumeration, not simultaneous). Always prefer 一边…一边… for concurrent actions.',
    items: [
      { hanzi: '一边', pinyin: 'yì biān', meaning: 'd\'une part / en même temps', meaningEn: 'while', audio: 'audio/hsk3/hsk3_一边.wav' },
      { hanzi: '又', pinyin: 'yòu', meaning: 'aussi, à la fois', meaningEn: 'also, both', audio: 'audio/hsk3/hsk3_又.wav' },
      { hanzi: '同时', pinyin: 'tóng shí', meaning: 'en même temps', meaningEn: 'simultaneously', audio: 'audio/hsk4/hsk4_同时.wav' },
      { hanzi: '看电视', pinyin: 'kàn diàn shì', meaning: 'regarder la télé', meaningEn: 'watch TV', audio: 'audio/hsk1/hsk1_电视.wav' },
      { hanzi: '便宜', pinyin: 'pián yi', meaning: 'pas cher', meaningEn: 'cheap', audio: 'audio/hsk2/hsk2_便宜.wav' }
    ],
    tip:
      'Test rapide : VERBE simultané → 一边…一边. ADJECTIF coexistant → 又…又. « marcher en parlant » → 一边走一边说. « grand et fort » → 又高又壮.',
    tipEn:
      'Quick test: simultaneous VERB → 一边…一边. Coexisting ADJECTIVE → 又…又. «Walk while talking» → 一边走一边说. «Tall and strong» → 又高又壮.'
  },
  {
    id: 'b11-bingqie-erqie',
    title: '并且 vs 而且 — et de plus (registre)',
    titleEn: '并且 vs 而且 — and moreover (register)',
    body:
      'Deux connecteurs « de plus », distingués par le **registre** : oral/neutre vs formel/écrit.\n' +
      '\n' +
      'Les deux usages :\n' +
      '- **而且** (érqiě) — **neutre**, oral et écrit, très commun : 这个工作很有意思，而且工资也不错\n' +
      '- **并且** (bìngqiě) — **formel**, écrit, structuré : 项目按时完成，并且超出预期\n' +
      '\n' +
      'Attention : **jamais** 并且 dans une conversation décontractée — ça sonne pédant. À l\'oral B1, 而且 partout.',
    bodyEn:
      '而且 (érqiě) = moreover, also (NEUTRAL, oral and written). Very common. 这个工作很有意思，而且工资也不错 = this job is interesting, plus the salary is good. 并且 (bìngqiě) = and moreover (FORMAL, written, more structured). 项目按时完成，并且超出预期 = the project was completed on time and exceeded expectations. In B1 speech, 而且 everywhere. In writing (essays, reports), alternate 而且 and 并且 for rhythm. NEVER 并且 in casual conversation — sounds pedantic.',
    items: [
      { hanzi: '而且', pinyin: 'ér qiě', meaning: 'de plus', meaningEn: 'moreover', audio: 'audio/hsk3/hsk3_而且.wav' },
      { hanzi: '并且', pinyin: 'bìng qiě', meaning: 'et de plus (formel)', meaningEn: 'and moreover (formal)', audio: 'audio/hsk5/hsk5_并且.wav' },
      { hanzi: '另外', pinyin: 'lìng wài', meaning: 'par ailleurs', meaningEn: 'in addition', audio: 'audio/hsk4/hsk4_另外.wav' },
      { hanzi: '此外', pinyin: 'cǐ wài', meaning: 'en outre (formel)', meaningEn: 'besides (formal)', audio: 'audio/hsk5/hsk5_此外.wav' },
      { hanzi: '工资', pinyin: 'gōng zī', meaning: 'salaire', meaningEn: 'salary', audio: 'audio/hsk4/hsk4_工资.wav' }
    ],
    tip:
      'Hierarchy oral → écrit pour « de plus » : 还 (oral, basique) < 而且 (oral standard) < 并且 (écrit) < 此外 (très soutenu, écrit). Choisis selon le registre attendu.',
    tipEn:
      'Hierarchy oral → written for «moreover»: 还 (oral, basic) < 而且 (oral standard) < 并且 (written) < 此外 (very formal, written). Choose by expected register.'
  }
];

export const b11NuancesDouLearnSections: LessonV2LearnSection[] = [
  {
    id: 'b11-dou-neg-total-vs-partial',
    title: '都不 vs 不都 — négation totale vs partielle',
    titleEn: '都不 vs 不都 — total vs partial negation',
    body:
      'Une petite différence d\'ordre inverse complètement le sens.\n' +
      '\n' +
      'Les deux structures :\n' +
      '- **都不** (dōu bù) = négation **TOTALE** : « aucun / pas un seul ». Structure : [Groupe] + 都 + 不 + verbe/adj.\n' +
      '  - 这些菜都不是辣的 (zhèxiē cài dōu bú shì là de) « aucun de ces plats n\'est épicé »\n' +
      '  - 他们都不来 (tāmen dōu bù lái) « aucun d\'eux ne vient »\n' +
      '- **不都** (bù dōu) = négation **PARTIELLE** : « pas tous » (donc certains oui). Structure : [Groupe] + 不 + 都 + verbe/adj.\n' +
      '  - 这些菜不都是辣的 (zhèxiē cài bù dōu shì là de) « tous ces plats ne sont pas épicés » (donc certains le sont)\n' +
      '\n' +
      'Piège français : « ils ne viennent pas tous » est ambigu en français mais **très précis** en chinois.\n' +
      '\n' +
      'Attention : la place de 不 change le sens complètement — c\'est l\'ordre qui compte.',
    bodyEn:
      '都不 (dōu bù) = TOTAL negation: «none / not a single one». Structure: [Group] + 都 + 不 + verb/adj. 这些菜都不是辣的 = none of these dishes is spicy. 他们都不来 = none of them is coming. 不都 (bù dōu) = PARTIAL negation: «not all» (so some yes). Structure: [Group] + 不 + 都 + verb/adj. 这些菜不都是辣的 = not all of these dishes are spicy (so some are). French trap: «they don\'t all come» is ambiguous in French but very precise in Chinese. Watch out: the position of 不 flips the meaning — word order is what matters.',
    items: [
      { hanzi: '都', pinyin: 'dōu', meaning: 'tous', meaningEn: 'all', audio: 'audio/hsk1/hsk1_都.wav' },
      { hanzi: '不', pinyin: 'bù', meaning: 'ne...pas', meaningEn: 'not', audio: 'audio/hsk1/hsk1_不.wav' },
      { hanzi: '都不', pinyin: 'dōu bù', meaning: 'aucun, pas un seul', meaningEn: 'none, not a single one', audio: 'audio/hsk1/hsk1_都.wav' },
      { hanzi: '不都', pinyin: 'bù dōu', meaning: 'pas tous', meaningEn: 'not all', audio: 'audio/hsk1/hsk1_都.wav' },
      { hanzi: '辣', pinyin: 'là', meaning: 'épicé', meaningEn: 'spicy', audio: 'audio/hsk4/hsk4_辣.wav' }
    ],
    tip:
      '都不 = « personne / aucun » ; 不都 = « pas tous » (implique une exception). Retiens : le 不 après 都 « ratisse tout », le 不 avant 都 « laisse des îlots ».',
    tipEn:
      '都不 = «no one / none»; 不都 = «not all» (implies an exception). Remember: 不 after 都 «sweeps everything clean», 不 before 都 «leaves islands».'
  },
  {
    id: 'b11-yidian-dou-bu',
    title: '一点都不 / 一点都没 — « pas du tout »',
    titleEn: '一点都不 / 一点都没 — «not at all»',
    body:
      'Structure : sujet + **一点 + 都 + 不/没** + verbe/adjectif.\n' +
      '\n' +
      '一点 (yìdiǎn) = « un peu ». Encadré par 都/也 et 不/没, il signale la plus petite quantité imaginable, poussée à zéro → « pas du tout ».\n' +
      '- 这个办法一点都不麻烦 (zhège bànfǎ yìdiǎn dōu bù máfan) « cette méthode n\'est pas du tout compliquée »\n' +
      '- 我一点都不累 (wǒ yìdiǎn dōu bú lèi) « je ne suis pas du tout fatigué »\n' +
      '- Avec 没 : 昨天他一点都没吃 (zuótiān tā yìdiǎn dōu méi chī) « hier il n\'a rien mangé du tout »\n' +
      '\n' +
      'Variante **一点也不** : 也 peut remplacer 都 avec la même force. 我一点也不困 (wǒ yìdiǎn yě bù kùn) « je ne suis pas du tout somnolent ».\n' +
      '\n' +
      'Renforcement plus fort que le simple 不 : 不麻烦 = « pas compliqué » (neutre), 一点都不麻烦 = « pas du tout compliqué » (insistance).',
    bodyEn:
      'Structure: subject + 一点 + 都 + 不/没 + verb/adj. 一点 (yìdiǎn) = «a little». Framed by 都/也 and 不/没, it signals the smallest imaginable amount, pushed to zero → «not at all». 这个办法一点都不麻烦 = this method is not at all complicated. 我一点都不累 = I\'m not tired at all. With 没: 昨天他一点都没吃 = yesterday he didn\'t eat anything at all. Variant 一点也不: 也 can replace 都 with the same force. 我一点也不困 = I\'m not sleepy at all. Stronger than plain 不: 不麻烦 = «not complicated» (neutral), 一点都不麻烦 = «not complicated at all» (emphatic).',
    items: [
      { hanzi: '一点', pinyin: 'yì diǎn', meaning: 'un peu', meaningEn: 'a little', audio: 'audio/hsk1/hsk1_一点.wav' },
      { hanzi: '一点都不', pinyin: 'yì diǎn dōu bù', meaning: 'pas du tout', meaningEn: 'not at all', audio: 'audio/hsk1/hsk1_一点.wav' },
      { hanzi: '一点也不', pinyin: 'yì diǎn yě bù', meaning: 'pas du tout (variante)', meaningEn: 'not at all (variant)', audio: 'audio/hsk1/hsk1_一点.wav' },
      { hanzi: '麻烦', pinyin: 'má fan', meaning: 'compliqué, ennuyeux', meaningEn: 'complicated, bothersome', audio: 'audio/hsk3/hsk3_麻烦.wav' },
      { hanzi: '累', pinyin: 'lèi', meaning: 'fatigué', meaningEn: 'tired', audio: 'audio/hsk2/hsk2_累.wav' },
      { hanzi: '困', pinyin: 'kùn', meaning: 'somnolent', meaningEn: 'sleepy', audio: 'audio/hsk4/hsk4_困.wav' }
    ],
    tip:
      'Chaque fois que tu veux insister sur « pas du tout », pense au trio 一点 + 都/也 + 不/没. C\'est aussi la formule pour un compliment discret : 一点都不辣 (pas piquant du tout) pour rassurer quelqu\'un.',
    tipEn:
      'Whenever you want to emphasize «not at all», think of the trio 一点 + 都/也 + 不/没. It\'s also the formula for a discreet compliment: 一点都不辣 (not spicy at all) to reassure someone.'
  }
];

export const b11NuancesYeConcessionLearnSections: LessonV2LearnSection[] = [
  {
    id: 'b11-ye-concession-basics',
    title: '也 = « quand même » : le sens de concession',
    titleEn: '也 = «still/anyway»: the concessive meaning',
    body:
      'Au-delà de « aussi », 也 sert aussi à marquer une **RÉSISTANCE** : quelque chose reste vrai malgré une condition ou un obstacle.\n' +
      '\n' +
      'Le premier segment pose l\'obstacle, 也 délivre le résultat qui **NE FLÉCHIT PAS**. Se traduit par « quand même, tout de même, malgré tout ».\n' +
      '\n' +
      'Trois familles de patterns à connaître :\n' +
      '- **就算/即使/哪怕...也** (concession hypothétique) — « même si »\n' +
      '- **无论/不管...也** (concession universelle) — « quoi que »\n' +
      '- **再...也** (concession de degré) — « aussi X que ce soit »',
    bodyEn:
      'Beyond «also», 也 also marks RESISTANCE: something stays true despite a condition or obstacle. The first clause sets the obstacle, 也 delivers the result that DOESN\'T BUDGE. Translated as «still, anyway, all the same». Three pattern families to know: 就算/即使/哪怕...也 (hypothetical concession) = «even if»; 无论/不管...也 (universal concession) = «whatever»; 再...也 (degree concession) = «no matter how X».',
    items: [
      { hanzi: '也', pinyin: 'yě', meaning: 'aussi ; quand même', meaningEn: 'also; still', audio: 'audio/hsk1/hsk1_也.wav' },
      { hanzi: '就算', pinyin: 'jiù suàn', meaning: 'même si (oral)', meaningEn: 'even if (spoken)', audio: 'audio/hsk4/hsk4_就.wav' },
      { hanzi: '即使', pinyin: 'jí shǐ', meaning: 'même si', meaningEn: 'even if', audio: 'audio/hsk4/hsk4_即使.wav' },
      { hanzi: '哪怕', pinyin: 'nǎ pà', meaning: 'même si (fort)', meaningEn: 'even if (strong)', audio: 'audio/hsk5/hsk5_哪怕.wav' },
      { hanzi: '无论', pinyin: 'wú lùn', meaning: 'quoi que (écrit)', meaningEn: 'no matter (written)', audio: 'audio/hsk4/hsk4_无论.wav' },
      { hanzi: '不管', pinyin: 'bù guǎn', meaning: 'quoi que (oral)', meaningEn: 'no matter (spoken)', audio: 'audio/hsk4/hsk4_不管.wav' }
    ],
    tip:
      'Quand tu vois 也 dans la 2e clause avec un obstacle en 1re clause, pense « still » en anglais, « quand même » en français. Ce n\'est plus 也 = « aussi ».',
    tipEn:
      'When you see 也 in the 2nd clause with an obstacle in the 1st clause, think «still» in English. It\'s no longer 也 = «also».'
  },
  {
    id: 'b11-jiusuan-jishi-napa-ye',
    title: '就算 / 即使 / 哪怕 ... 也 — « même si »',
    titleEn: '就算 / 即使 / 哪怕 ... 也 — «even if»',
    body:
      'Structure : **就算/即使/哪怕** + [condition hypothétique]，[sujet] + **也** + [résultat qui tient bon].\n' +
      '\n' +
      'Les trois variantes :\n' +
      '- **就算** (jiùsuàn) : le plus **oral**, familier.\n' +
      '  - 就算下大雨，我也要去看演唱会 (jiùsuàn xià dàyǔ, wǒ yě yào qù kàn yǎnchànghuì) « même s\'il pleut fort, j\'irai quand même au concert »\n' +
      '- **即使** (jíshǐ) : **neutre**, utilisable à l\'oral comme à l\'écrit.\n' +
      '  - 即使你不同意，我也会这么做 (jíshǐ nǐ bù tóngyì, wǒ yě huì zhème zuò) « même si tu n\'es pas d\'accord, je le ferai quand même »\n' +
      '- **哪怕** (nǎpà) : le plus **fort**, souligne un cas extrême.\n' +
      '  - 哪怕只有一点希望，我也不会放弃 (nǎpà zhǐyǒu yìdiǎn xīwàng, wǒ yě bú huì fàngqì) « même s\'il ne reste qu\'une lueur d\'espoir, je n\'abandonnerai pas »',
    bodyEn:
      'Structure: 就算/即使/哪怕 + [hypothetical condition], [subject] + 也 + [result that holds]. 就算 (jiùsuàn): most spoken, casual. 就算下大雨，我也要去看演唱会 = even if it pours, I\'m going to the concert anyway. 即使 (jíshǐ): neutral, oral and written. 即使你不同意，我也会这么做 = even if you disagree, I\'ll do it anyway. 哪怕 (nǎpà): strongest, highlights an extreme case. 哪怕只有一点希望，我也不会放弃 = even if there\'s only a glimmer of hope, I won\'t give up.',
    items: [
      { hanzi: '就算', pinyin: 'jiù suàn', meaning: 'même si (oral)', meaningEn: 'even if (spoken)', audio: 'audio/hsk4/hsk4_就.wav' },
      { hanzi: '即使', pinyin: 'jí shǐ', meaning: 'même si (neutre)', meaningEn: 'even if (neutral)', audio: 'audio/hsk4/hsk4_即使.wav' },
      { hanzi: '哪怕', pinyin: 'nǎ pà', meaning: 'même si (extrême)', meaningEn: 'even if (extreme)', audio: 'audio/hsk5/hsk5_哪怕.wav' },
      { hanzi: '希望', pinyin: 'xī wàng', meaning: 'espoir, espérer', meaningEn: 'hope', audio: 'audio/hsk2/hsk2_希望.wav' },
      { hanzi: '放弃', pinyin: 'fàng qì', meaning: 'abandonner', meaningEn: 'give up', audio: 'audio/hsk4/hsk4_放弃.wav' },
      { hanzi: '同意', pinyin: 'tóng yì', meaning: 'être d\'accord', meaningEn: 'agree', audio: 'audio/hsk3/hsk3_同意.wav' }
    ],
    tip:
      'Les trois sont interchangeables 90 % du temps. Choisir 就算 à l\'oral décontracté, 即使 par défaut, 哪怕 pour dramatiser un cas extrême.',
    tipEn:
      'All three are interchangeable 90% of the time. Pick 就算 for casual speech, 即使 by default, 哪怕 to dramatize an extreme case.'
  },
  {
    id: 'b11-wulun-buguan-ye-zai-zenme',
    title: '无论/不管...也 + 再...也 + 怎么也 — « quoi qu\'il arrive »',
    titleEn: '无论/不管...也 + 再...也 + 怎么也 — «whatever happens»',
    body:
      'Trois patterns de concession universelle ou de degré.\n' +
      '\n' +
      '**无论/不管** + [gamme de possibilités]，[sujet] + **也** + [résultat stable] : quand la condition couvre PLUSIEURS cas.\n' +
      '- 无论你说什么，我也不会改变主意 (wúlùn nǐ shuō shénme, wǒ yě bú huì gǎibiàn zhǔyi) « quoi que tu dises, je ne changerai pas d\'avis »\n' +
      '- 无论 = plus écrit, 不管 = plus oral. Note : dans ce pattern, 都 est très souvent utilisé à la place de 也 avec un sens quasi identique.\n' +
      '\n' +
      '**再** + [adjectif/verbe] ... **也** + [résultat] : concession sur un DEGRÉ, « aussi X que ce soit, ... quand même ».\n' +
      '- 这件衣服再贵，我也要买 (zhè jiàn yīfu zài guì, wǒ yě yào mǎi) « aussi chère soit-elle, je vais l\'acheter »\n' +
      '- 工作再忙，他也会陪孩子吃晚饭 (gōngzuò zài máng, tā yě huì péi háizi chī wǎnfàn) « aussi occupé soit-il, il dîne avec ses enfants »\n' +
      '\n' +
      '**怎么** + **也** + 不/没 + verbe : « on a beau essayer par tous les moyens, ça ne marche pas ». Frustration.\n' +
      '- 昨天晚上我怎么也睡不着 (zuótiān wǎnshang wǒ zěnme yě shuì bù zháo) « hier soir je ne pouvais pas m\'endormir, quoi que je fasse »\n' +
      '\n' +
      'Attention : dans les 3 patterns, l\'ordre est **TOUJOURS** [obstacle/gamme/degré] PUIS [résultat avec 也]. Ne pas inverser.',
    bodyEn:
      'Three patterns of universal or degree concession. 无论/不管 + [range of possibilities], [subject] + 也 + [stable result]: when the condition covers SEVERAL cases. 无论你说什么，我也不会改变主意 = whatever you say, I won\'t change my mind. 无论 = more written, 不管 = more spoken. Note: in this pattern, 都 is very often used in place of 也 with nearly identical meaning. 再 + [adj/verb] ... 也 + [result]: concession on a DEGREE, «no matter how X, still...». 这件衣服再贵，我也要买 = however expensive it is, I\'m buying it. 工作再忙，他也会陪孩子吃晚饭 = however busy work is, he has dinner with the kids. 怎么 + 也 + 不/没 + verb: «no matter how hard we try, it doesn\'t work». Frustration. 昨天晚上我怎么也睡不着 = last night I couldn\'t fall asleep no matter what. In all 3 patterns, order is ALWAYS [obstacle/range/degree] THEN [result with 也]. Don\'t swap.',
    items: [
      { hanzi: '无论', pinyin: 'wú lùn', meaning: 'quoi que (écrit)', meaningEn: 'no matter (written)', audio: 'audio/hsk4/hsk4_无论.wav' },
      { hanzi: '不管', pinyin: 'bù guǎn', meaning: 'quoi que (oral)', meaningEn: 'no matter (spoken)', audio: 'audio/hsk4/hsk4_不管.wav' },
      { hanzi: '再', pinyin: 'zài', meaning: 'encore ; aussi (degré)', meaningEn: 'again; however (degree)', audio: 'audio/hsk2/hsk2_再.wav' },
      { hanzi: '怎么', pinyin: 'zěn me', meaning: 'comment', meaningEn: 'how', audio: 'audio/hsk1/hsk1_怎么.wav' },
      { hanzi: '改变', pinyin: 'gǎi biàn', meaning: 'changer', meaningEn: 'change', audio: 'audio/hsk4/hsk4_改变.wav' },
      { hanzi: '主意', pinyin: 'zhǔ yi', meaning: 'idée, avis', meaningEn: 'idea, mind', audio: 'audio/hsk4/hsk4_主意.wav' }
    ],
    tip:
      'Astuce mnémo : 无论/不管 = « quoi que », 再...也 = « aussi X que », 怎么也 = « impossible de ». Les 3 patterns partagent 也 comme pivot du résultat qui ne bouge pas.',
    tipEn:
      'Mnemonic tip: 无论/不管 = «whatever», 再...也 = «no matter how X», 怎么也 = «impossible to». All 3 patterns share 也 as the pivot of the unmoving result.'
  }
];

export const b11NuancesHuiNengKeyiLearnSections: LessonV2LearnSection[] = [
  {
    id: 'b11-hui-neng-keyi-overlap',
    title: 'Chevauchement 能 vs 可以 pour la permission',
    titleEn: 'Overlap 能 vs 可以 for permission',
    body:
      'En pratique, 能 et 可以 se chevauchent souvent quand il s\'agit de demander la permission. Les 2 sont acceptés à l\'oral, mais avec une nuance de sens :\n' +
      '- 我能坐这儿吗？ (wǒ néng zuò zhèr ma?) → penche vers « la place est-elle libre / est-ce faisable ? ».\n' +
      '- 我可以坐这儿吗？ (wǒ kěyǐ zuò zhèr ma?) → penche vers « me le permets-tu ? ».\n' +
      '\n' +
      'Règle d\'or : quand tu veux CLAIREMENT demander une permission, 可以 est le choix le plus sûr et neutre.\n' +
      '\n' +
      'Détail important : les questions de permission se répondent avec 可以 / 不可以, PAS avec un simple 能. « 我可以进来吗？ » « 可以，请进 » ✓ ; « 能，请进 » ✗.\n' +
      '\n' +
      'Exemple typique :\n' +
      '- « 老师，我可以问一个问题吗？ » (lǎoshī, wǒ kěyǐ wèn yí gè wèntí ma?) « professeur, puis-je poser une question ? » — permission attendue.\n' +
      '- « 老师，我能问一个问题吗？ » sonnera à peu près pareil mais un peu plus timide, comme si tu doutais que le moment s\'y prête.',
    bodyEn:
      'In practice, 能 and 可以 often overlap when asking for permission. Both are accepted in speech, with a nuance: 我能坐这儿吗？leans toward «is the seat free / is it feasible?»; 我可以坐这儿吗？leans toward «will you permit me?». Golden rule: when you CLEARLY want to ask for permission, 可以 is the safest, most neutral choice. Important detail: permission questions are answered with 可以 / 不可以, NOT with a bare 能. «我可以进来吗？» «可以，请进» ✓; «能，请进» ✗. Typical example: «老师，我可以问一个问题吗？» = «Teacher, may I ask a question?» — expected permission. «老师，我能问一个问题吗？» sounds about the same but a bit more tentative, as if you doubted the moment was right.',
    items: [
      { hanzi: '能', pinyin: 'néng', meaning: 'pouvoir (faisable)', meaningEn: 'can (feasible)', audio: 'audio/hsk1/hsk1_能.wav' },
      { hanzi: '可以', pinyin: 'kě yǐ', meaning: 'pouvoir (permis)', meaningEn: 'may (allowed)', audio: 'audio/hsk1/hsk1_可以.wav' },
      { hanzi: '坐', pinyin: 'zuò', meaning: 's\'asseoir', meaningEn: 'sit', audio: 'audio/hsk1/hsk1_坐.wav' },
      { hanzi: '进来', pinyin: 'jìn lái', meaning: 'entrer', meaningEn: 'come in', audio: 'audio/hsk2/hsk2_进.wav' },
      { hanzi: '问题', pinyin: 'wèn tí', meaning: 'question', meaningEn: 'question', audio: 'audio/hsk2/hsk2_问题.wav' },
      { hanzi: '老师', pinyin: 'lǎo shī', meaning: 'professeur', meaningEn: 'teacher', audio: 'audio/hsk1/hsk1_老师.wav' }
    ],
    tip:
      'Pour poser une question de permission, utilise 可以. Pour répondre à ce genre de question, utilise 可以 ou 不可以. Ne réponds jamais par un 能 seul.',
    tipEn:
      'To ask a permission question, use 可以. To answer one, use 可以 or 不可以. Never answer with a bare 能.'
  },
  {
    id: 'b11-hen-hui-hen-neng',
    title: '很会 / 很能 : juger quelqu\'un',
    titleEn: '很会 / 很能: judging someone',
    body:
      'Ajouter 很 (hěn) devant 会 ou 能 fait glisser le sens : ce n\'est plus une simple capacité, c\'est un jugement porté sur quelqu\'un.\n' +
      '\n' +
      '他很会说话 (tā hěn huì shuōhuà) « il est très bon en communication » : décrit quelqu\'un qui a le sens du discours (diplomate, persuasif, drôle). Ce qu\'on juge, c\'est le NIVEAU de maîtrise → compliment.\n' +
      '\n' +
      '他很会做菜 (tā hěn huì zuò cài) « il cuisine super bien » : compliment sur la qualité.\n' +
      '\n' +
      '他很能吃 (tā hěn néng chī) « il mange énormément » : décrit quelqu\'un qui a une CAPACITÉ importante. Ce n\'est ni un compliment ni une critique, juste un constat sur le volume.\n' +
      '\n' +
      '他很能喝 (tā hěn néng hē) « il tient super bien l\'alcool » (ou « il boit beaucoup ») : capacité physique.\n' +
      '\n' +
      'Règle d\'or : 很会 X = *bien maîtriser* X (qualité), 很能 X = *pouvoir beaucoup* X (quantité, capacité brute).',
    bodyEn:
      'Adding 很 (hěn) before 会 or 能 shifts the meaning: it\'s no longer plain ability, it\'s a judgment about someone. 他很会说话 = «he\'s great at communicating»: describes someone with a sense for discourse (diplomatic, persuasive, funny). What\'s judged is the LEVEL of mastery → compliment. 他很会做菜 = «he cooks super well»: compliment on quality. 他很能吃 = «he eats a lot»: describes someone with a large CAPACITY. Neither compliment nor criticism, just a fact about volume. 他很能喝 = «he holds alcohol super well» (or «he drinks a lot»): physical capacity. Key rule: 很会 X = *master X well* (quality); 很能 X = *do a lot of X* (quantity, raw capacity).',
    items: [
      { hanzi: '很会', pinyin: 'hěn huì', meaning: 'très doué (qualité)', meaningEn: 'very skilled (quality)', audio: 'audio/hsk1/hsk1_会.wav' },
      { hanzi: '很能', pinyin: 'hěn néng', meaning: 'très capable (quantité)', meaningEn: 'very able (quantity)', audio: 'audio/hsk1/hsk1_能.wav' },
      { hanzi: '说话', pinyin: 'shuō huà', meaning: 'parler, s\'exprimer', meaningEn: 'speak, talk', audio: 'audio/hsk2/hsk2_说话.wav' },
      { hanzi: '做菜', pinyin: 'zuò cài', meaning: 'cuisiner', meaningEn: 'cook', audio: 'audio/hsk2/hsk2_做.wav' },
      { hanzi: '吃', pinyin: 'chī', meaning: 'manger', meaningEn: 'eat', audio: 'audio/hsk1/hsk1_吃.wav' },
      { hanzi: '喝', pinyin: 'hē', meaning: 'boire', meaningEn: 'drink', audio: 'audio/hsk1/hsk1_喝.wav' }
    ],
    tip:
      'Quand tu veux complimenter quelqu\'un sur une compétence bien exécutée, choisis 很会. Quand tu veux souligner une capacité impressionnante en volume (manger, boire, dormir…), choisis 很能.',
    tipEn:
      'To compliment someone on a skill well done, pick 很会. To point out an impressive capacity in volume (eating, drinking, sleeping…), pick 很能.'
  },
  {
    id: 'b11-nenggou-formal',
    title: '能够 — le jumeau formel de 能',
    titleEn: '能够 — the formal twin of 能',
    body:
      '能够 (nénggòu) partage exactement le même sens que 能 (« être en mesure de »), mais dans un registre plus SOUTENU / ÉCRIT.\n' +
      '\n' +
      'Contextes typiques :\n' +
      '- Écriture journalistique ou administrative : 这项技术能够帮助医生早期发现癌症 (zhè xiàng jìshù nénggòu bāngzhù yīshēng zǎoqī fāxiàn áizhèng) « cette technologie permet aux médecins de détecter le cancer précocement ».\n' +
      '- Discours formels : 我们能够克服所有困难 (wǒmen nénggòu kèfú suǒyǒu kùnnan) « nous saurons surmonter toutes les difficultés ».\n' +
      '\n' +
      'En conversation courante, on garde 能 (plus court, plus naturel).\n' +
      '\n' +
      'Attention : 能够 s\'utilise majoritairement en phrase POSITIVE. Pour la négation, on repasse à 不能 (rarement 不能够, qui sonne lourd).',
    bodyEn:
      '能够 (nénggòu) shares exactly the same meaning as 能 («be able to»), but in a more FORMAL / WRITTEN register. Typical contexts: journalistic or administrative writing — 这项技术能够帮助医生早期发现癌症 = «this technology enables doctors to detect cancer early.» Formal speeches — 我们能够克服所有困难 = «we will overcome all difficulties.» In casual conversation, stick with 能 (shorter, more natural). Watch out: 能够 is used mostly in POSITIVE sentences. For negation, switch back to 不能 (rarely 不能够, which sounds heavy).',
    items: [
      { hanzi: '能够', pinyin: 'néng gòu', meaning: 'être en mesure de (formel)', meaningEn: 'be able to (formal)', audio: 'audio/hsk3/hsk3_能够.wav' },
      { hanzi: '技术', pinyin: 'jì shù', meaning: 'technique, technologie', meaningEn: 'technology', audio: 'audio/hsk4/hsk4_技术.wav' },
      { hanzi: '发现', pinyin: 'fā xiàn', meaning: 'découvrir, détecter', meaningEn: 'discover, detect', audio: 'audio/hsk3/hsk3_发现.wav' },
      { hanzi: '克服', pinyin: 'kè fú', meaning: 'surmonter', meaningEn: 'overcome', audio: 'audio/hsk5/hsk5_克服.wav' },
      { hanzi: '困难', pinyin: 'kùn nan', meaning: 'difficulté', meaningEn: 'difficulty', audio: 'audio/hsk4/hsk4_困难.wav' },
      { hanzi: '医生', pinyin: 'yī shēng', meaning: 'médecin', meaningEn: 'doctor', audio: 'audio/hsk1/hsk1_医生.wav' }
    ],
    tip:
      'Quand tu écris un texte à rendre (essai HSK, article, mail formel), tu peux remplacer certains 能 par 能够 pour élever le registre. Mais dans un chat WeChat, garde 能.',
    tipEn:
      'When you\'re writing a text to hand in (HSK essay, article, formal email), you can replace some 能 with 能够 to raise the register. But in a WeChat chat, keep 能.'
  }
];

export const b11NuancesKaiComplementLearnSections: LessonV2LearnSection[] = [
  {
    id: 'b11-kai-family-4-complement',
    title: '开 famille 4 : complément de résultat (« séparer, étaler, libérer »)',
    titleEn: '开 family 4: resultative complement («separate, spread, release»)',
    body:
      'Ici 开 vient en SECONDE POSITION, après un autre verbe. Il agit comme COMPLÉMENT DE RÉSULTAT : le premier verbe dit l\'action, 开 dit le résultat.\n' +
      '\n' +
      'Trois sous-sens qui se recoupent : « SÉPARER », « ÉTALER », « LIBÉRER ».\n' +
      '\n' +
      'Séparer / écarter :\n' +
      '- 拉开 (lā kāi) « tirer pour ouvrir » — 他把窗帘拉开了 (tā bǎ chuāng lián lā kāi le) « il a tiré les rideaux ».\n' +
      '- 推开 (tuī kāi) « pousser pour ouvrir ».\n' +
      '- 分开 (fēn kāi) « séparer, partager ».\n' +
      '\n' +
      'Étaler / déployer :\n' +
      '- 展开 (zhǎn kāi) « déployer, ouvrir en grand ».\n' +
      '- 铺开 (pū kāi) « étaler à plat » — 他把地图铺开在桌子上 (tā bǎ dì tú pū kāi zài zhuō zi shàng) « il a étalé la carte sur la table ».\n' +
      '- 散开 (sàn kāi) « se disperser » (foule qui se disperse).\n' +
      '\n' +
      'Libérer / défaire :\n' +
      '- 解开 (jiě kāi) « défaire (un nœud), résoudre (un puzzle) ».\n' +
      '- 松开 (sōng kāi) « desserrer, lâcher ».\n' +
      '- 打开 (dǎ kāi) « ouvrir » (une boîte, un livre, une appli). Le plus général — c\'est aussi un complément (打 « frapper/agir » + 开 « résultat ouvert »).\n' +
      '\n' +
      'Négations : 门没开 (mén méi kāi) « la porte ne s\'est pas ouverte » = résultat non atteint. Complément potentiel : 这个结我打不开 (zhè ge jié wǒ dǎ bù kāi) « je n\'arrive pas à défaire ce nœud ». Version positive : 打得开 (dǎ de kāi) « ça peut s\'ouvrir ».\n' +
      '\n' +
      'Usage psychologique : 想开 (xiǎng kāi) « prendre du recul, accepter » — quand on relâche une pensée qui tient au cœur. 看开 (kàn kāi) « voir les choses avec détachement ». Ex : 别太难过，慢慢想开一点 (bié tài nán guò, màn màn xiǎng kāi yì diǎn) « ne sois pas trop triste, prends du recul petit à petit ». C\'est la métaphore « libérer » appliquée à l\'esprit.',
    bodyEn:
      'Here 开 comes in SECOND POSITION, after another verb. It acts as a RESULTATIVE COMPLEMENT: the first verb names the action, 开 states the result. Three overlapping sub-senses: «SEPARATE», «SPREAD», «RELEASE». Separate / pull apart: 拉开 «pull open» — 他把窗帘拉开了 = «he drew the curtains open». 推开 «push open». 分开 «separate, share». Spread / unfold: 展开 «unfold, open wide». 铺开 «lay flat» — 他把地图铺开在桌子上 = «he spread the map on the table». 散开 «scatter» (crowd dispersing). Release / undo: 解开 «untie a knot, solve a puzzle». 松开 «loosen, let go». 打开 «open» (a box, a book, an app). The most general — also a complement (打 «hit/act» + 开 «open result»). Negations: 门没开 = «the door didn\'t open» (result not reached). Potential complement: 这个结我打不开 = «I can\'t untie this knot». Positive form: 打得开 = «it can be opened». Psychological use: 想开 «take a step back, accept» — when you release a thought clinging to your heart. 看开 «see things with detachment». Ex: 别太难过，慢慢想开一点 = «don\'t be too sad, gradually let go a bit». That\'s the «release» metaphor applied to the mind.',
    items: [
      { hanzi: '打开', pinyin: 'dǎ kāi', meaning: 'ouvrir (boîte, appli)', meaningEn: 'open (box, app)', audio: 'audio/hsk3/hsk3_打开.wav' },
      { hanzi: '拉开', pinyin: 'lā kāi', meaning: 'tirer pour ouvrir', meaningEn: 'pull open', audio: 'audio/hsk4/hsk4_拉.wav' },
      { hanzi: '分开', pinyin: 'fēn kāi', meaning: 'séparer, partager', meaningEn: 'separate', audio: 'audio/hsk3/hsk3_分开.wav' },
      { hanzi: '展开', pinyin: 'zhǎn kāi', meaning: 'déployer, ouvrir en grand', meaningEn: 'unfold', audio: 'audio/hsk5/hsk5_展开.wav' },
      { hanzi: '解开', pinyin: 'jiě kāi', meaning: 'défaire, résoudre', meaningEn: 'untie, solve', audio: 'audio/hsk4/hsk4_解决.wav' },
      { hanzi: '松开', pinyin: 'sōng kāi', meaning: 'desserrer, lâcher', meaningEn: 'loosen, let go', audio: 'audio/hsk4/hsk4_松.wav' },
      { hanzi: '想开', pinyin: 'xiǎng kāi', meaning: 'prendre du recul, accepter', meaningEn: 'take a step back', audio: 'audio/hsk2/hsk2_想.wav' }
    ],
    tip:
      'Quand 开 est en 2e position, cherche l\'idée d\'écartement, d\'étalement ou de relâchement. Ça éclaire le sens de nombreux verbes composés.',
    tipEn:
      'When 开 is in 2nd position, look for the idea of pulling apart, spreading, or letting go. It lights up the meaning of many compound verbs.'
  },
  {
    id: 'b11-kai-family-5-special',
    title: '开 famille 5 : sens spéciaux figés',
    titleEn: '开 family 5: fixed special senses',
    body:
      'Deux usages qui ne rentrent PAS dans les 4 grandes familles et se retiennent comme des blocs.\n' +
      '\n' +
      'CUISINE — l\'eau qui bout : 水开了 (shuǐ kāi le) « l\'eau bout ». Métaphore de l\'eau qui « s\'ouvre » en bulles, mais en pratique c\'est un sens fixe. Négation : 水还没开 (shuǐ hái méi kāi) « l\'eau ne bout pas encore ». Ex : 水开了，可以下面了 (shuǐ kāi le, kě yǐ xià miàn le) « l\'eau bout, on peut mettre les nouilles ».\n' +
      '\n' +
      'BIJOUTERIE — l\'or et les carats : 十八开金 (shí bā kāi jīn) « or 18 carats ». 开 fait ici office d\'UNITÉ pour la pureté de l\'or, exactement comme « karat » en anglais. Ex : 24开金 (èr shí sì kāi jīn) « or 24 carats, or pur ».\n' +
      '\n' +
      'Il existe quelques autres usages rares (tailles de papier, expressions littéraires) mais tu peux les apprendre au cas par cas.',
    bodyEn:
      'Two uses that DON\'T fit the 4 main families and are memorized as blocks. COOKING — water boiling: 水开了 = «the water is boiling». Metaphor of water «opening up» into bubbles, but in practice it\'s a fixed sense. Negation: 水还没开 = «the water isn\'t boiling yet». Ex: 水开了，可以下面了 = «water\'s boiling, we can drop in the noodles». JEWELRY — gold and karats: 十八开金 = «18-karat gold». 开 acts as a UNIT for gold purity, exactly like «karat» in English. Ex: 24开金 = «24-karat gold, pure gold». A few other rare uses exist (paper sizes, literary expressions) but you can learn them case by case.',
    items: [
      { hanzi: '水开了', pinyin: 'shuǐ kāi le', meaning: 'l\'eau bout', meaningEn: 'the water is boiling', audio: 'audio/hsk1/hsk1_水.wav' },
      { hanzi: '下面', pinyin: 'xià miàn', meaning: 'mettre les nouilles (dans l\'eau)', meaningEn: 'drop noodles into the water', audio: 'audio/hsk3/hsk3_面条.wav' },
      { hanzi: '十八开金', pinyin: 'shí bā kāi jīn', meaning: 'or 18 carats', meaningEn: '18-karat gold', audio: 'audio/hsk5/hsk5_金.wav' },
      { hanzi: '金', pinyin: 'jīn', meaning: 'or (métal)', meaningEn: 'gold (metal)', audio: 'audio/hsk5/hsk5_金.wav' },
      { hanzi: '纯', pinyin: 'chún', meaning: 'pur', meaningEn: 'pure', audio: 'audio/hsk5/hsk5_纯.wav' }
    ],
    tip:
      'Ces 2 sens spéciaux se reconnaissent parce que le CONTEXTE (cuisine ou bijouterie) éclaire immédiatement le sens de 开. Sinon ces phrases sonneraient énigmatiques.',
    tipEn:
      'These 2 special senses stand out because CONTEXT (cooking or jewelry) instantly clears up what 开 means. Otherwise these sentences would sound cryptic.'
  }
];
