/**
 * grammar-lessons-hsk2-modaux.ts — 5 fiches HSK2 : verbes modaux + adverbes clés
 * ------------------------------------------------------------------------------
 *   1. 想 (xiǎng)          — vouloir / avoir envie de
 *   2. 要 (yào)            — vouloir / falloir
 *   3. 能 vs 可以           — pouvoir (capacité) / être autorisé à
 *   4. 一点(儿) vs 有点儿    — « un peu » positif vs négatif
 *   5. 又 vs 再 vs 还        — « encore » (passé / futur / état continu)
 *
 * Chaque entrée respecte le shape `LessonItem` (grammarExplanation complet +
 * examples + quiz + grammarQuiz).
 */
import type { LessonItem } from '../types';

export const grammarLessonsHsk2Modaux: LessonItem[] = [
  // ============================================
  // HSK2 — 想 (vouloir / avoir envie de)
  // ============================================
  {
    id: 'grammar-modal-xiang',
    level: 'hsk2',
    hanzi: '想',
    pinyin: 'xiǎng',
    translation: 'want to / would like to',
    translationFr: 'vouloir / avoir envie de',
    category: 'grammaire',
    explanation: 'Le modal 想 (xiǎng) exprime un DÉSIR ou une INTENTION plus douce que 要. Il correspond au « I would like to » anglais.',
    grammarExplanation: {
      whenToUse: '想 s\'utilise pour exprimer :\n• Un désir subjectif, un souhait\n• Une intention à venir\n• « Penser à faire quelque chose »\nTon neutre à doux, plus poli que 要.',
      whenToUseEn: '想 is used to express:\n• A subjective wish or desire\n• An upcoming intention\n• "Thinking of doing something"\nNeutral to soft tone, more polite than 要.',
      howToUse: 'Structure : Sujet + 想 + Verbe (+ Objet)\n\nExemples :\n• 我想去中国 (wǒ xiǎng qù Zhōngguó) = J\'ai envie d\'aller en Chine\n• 我想吃饺子 (wǒ xiǎng chī jiǎozi) = Je veux manger des raviolis\n• 他想学中文 (tā xiǎng xué Zhōngwén) = Il a envie d\'apprendre le chinois',
      howToUseEn: 'Structure: Subject + 想 + Verb (+ Object)\n\nExamples:\n• 我想去中国 = I\'d like to go to China\n• 我想吃饺子 = I want to eat dumplings\n• 他想学中文 = He wants to learn Chinese',
      commonMistakes: '❌ Ne mettez pas 吗 au milieu de la phrase\n• Incorrect : 我想去中国吗？\n• Correct : 你想去中国吗？(吗 en fin de phrase)\n\n❌ Ne confondez PAS 想 et 要\n• 想 = envie douce, désir\n• 要 = volonté ferme, besoin\n\n❌ Négation : 不想 (jamais 没想)\n• Correct : 我不想去 = Je n\'ai pas envie d\'y aller',
      commonMistakesEn: '❌ Don\'t misplace 吗 mid-sentence\n• Incorrect: 我想去中国吗？\n• Correct: 你想去中国吗？(吗 goes at end)\n\n❌ Don\'t confuse 想 with 要\n• 想 = soft wish\n• 要 = firm will, need\n\n❌ Negation: 不想 (never 没想)\n• Correct: 我不想去 = I don\'t want to go',
      tips: '💡 Mnémo : 想 = « I would like to » (poli), 要 = « I want » (ferme).\n💡 想 est aussi un VERBE autonome : 我想你 = « Je pense à toi ».\n💡 Ton doux : idéal pour proposer, suggérer, exprimer un rêve.',
      tipsEn: '💡 Mnemonic: 想 = "I would like to" (polite), 要 = "I want" (firm).\n💡 想 is also a standalone VERB: 我想你 = "I miss you / I think of you".\n💡 Soft tone: perfect for suggestions, proposals, dreams.',
      relatedGrammar: ['grammar-modal-yao', 'grammar-modal-hui']
    },
    audio: 'audio/grammar/grammar-modal-xiang.wav',
    examples: [
      { hanzi: '我想喝茶', pinyin: 'wǒ xiǎng hē chá', translation: 'I\'d like to drink tea', translationFr: 'J\'ai envie de boire du thé' },
      { hanzi: '你想去哪儿？', pinyin: 'nǐ xiǎng qù nǎr?', translation: 'Where would you like to go?', translationFr: 'Où as-tu envie d\'aller ?' },
      { hanzi: '他想学画画', pinyin: 'tā xiǎng xué huàhuà', translation: 'He\'d like to learn painting', translationFr: 'Il a envie d\'apprendre à peindre' }
    ],
    quiz: {
      prompt: 'Quel modal exprime « avoir envie de » (désir doux) ?',
      choices: ['会', '能', '想', '可以'],
      correctChoiceIndex: 2
    },
    grammarQuiz: {
      type: 'fill-blank',
      sentence: '我___去看电影',
      translation: 'J\'ai envie d\'aller voir un film',
      translationEn: 'I want to go see a movie',
      choices: ['想', '会', '能', '可以'],
      correctChoice: '想',
      pinyin: 'wǒ ___ qù kàn diànyǐng',
      explanation: '想 exprime le désir / l\'envie, plus doux que 要.'
    },
    tags: ['grammaire', 'modal', 'désir', 'hsk2'],
    theme: 'grammar'
  },

  // ============================================
  // HSK2 — 要 (vouloir / falloir / futur imminent)
  // ============================================
  {
    id: 'grammar-modal-yao',
    level: 'hsk2',
    hanzi: '要',
    pinyin: 'yào',
    translation: 'want / need / must / will soon',
    translationFr: 'vouloir / falloir',
    category: 'grammaire',
    explanation: '要 (yào) fonctionne comme modal ET comme verbe autonome. Il exprime une volonté ferme, un besoin, un futur imminent ou une obligation.',
    grammarExplanation: {
      whenToUse: '要 s\'utilise pour :\n• Volonté FERME (« je veux X »)\n• Demander / commander qch (à un serveur, un vendeur)\n• Futur IMMINENT (« bientôt », « sur le point de »)\n• Obligation (« il faut »)',
      whenToUseEn: '要 is used for:\n• FIRM will ("I want X")\n• Ordering / requesting (at a restaurant, shop)\n• IMMINENT future ("about to", "soon")\n• Obligation ("must", "have to")',
      howToUse: 'Comme MODAL : Sujet + 要 + Verbe\n• 我要走了 (wǒ yào zǒu le) = Je vais partir\n• 你要小心 (nǐ yào xiǎoxīn) = Tu dois faire attention\n\nComme VERBE : Sujet + 要 + Objet\n• 我要一杯茶 (wǒ yào yì bēi chá) = Je voudrais un thé\n• 他要那本书 = Il veut ce livre-là',
      howToUseEn: 'As MODAL: Subject + 要 + Verb\n• 我要走了 = I\'m about to leave\n• 你要小心 = You must be careful\n\nAs VERB: Subject + 要 + Object\n• 我要一杯茶 = I\'d like a cup of tea\n• 他要那本书 = He wants that book',
      commonMistakes: '❌ ATTENTION à la négation 不要 !\n• « ne pas vouloir » : 我不要 = Je n\'en veux pas\n• « ne pas + verbe » (interdiction) : 不要说话 = Ne parle pas !\nLe contexte décide.\n\n❌ Pour « je n\'aurai pas besoin de », utilisez 不用 (pas 不要).\n• Correct : 你不用来 = Tu n\'as pas besoin de venir\n\n❌ Ne confondez pas 要 (ferme) et 想 (envie douce).',
      commonMistakesEn: '❌ Watch out for 不要 negation!\n• "don\'t want": 我不要 = I don\'t want it\n• "don\'t + verb" (prohibition): 不要说话 = Don\'t speak!\nContext decides.\n\n❌ For "no need to", use 不用 (not 不要).\n• Correct: 你不用来 = You don\'t need to come\n\n❌ Don\'t confuse 要 (firm) with 想 (soft wish).',
      tips: '💡 要 devant un verbe peut marquer le FUTUR planifié :\n  我要去中国 = Je vais aller en Chine (décidé).\n💡 Au restaurant, 要 est LE verbe : 你要什么？= Qu\'est-ce que tu prends ?\n💡 Marqueur d\'imminence : 快要...了 / 就要...了 = « sur le point de ».',
      tipsEn: '💡 要 before a verb can mark planned FUTURE:\n  我要去中国 = I\'m going to China (decided).\n💡 In restaurants, 要 is THE verb: 你要什么？= What will you have?\n💡 Imminence markers: 快要...了 / 就要...了 = "about to".',
      relatedGrammar: ['grammar-modal-xiang', 'grammar-negation-bu']
    },
    audio: 'audio/grammar/grammar-modal-yao.wav',
    examples: [
      { hanzi: '我要一杯咖啡', pinyin: 'wǒ yào yì bēi kāfēi', translation: 'I want a cup of coffee', translationFr: 'Je voudrais un café' },
      { hanzi: '你要小心', pinyin: 'nǐ yào xiǎoxīn', translation: 'You must be careful', translationFr: 'Tu dois faire attention' },
      { hanzi: '他要走了', pinyin: 'tā yào zǒu le', translation: 'He\'s about to leave', translationFr: 'Il est sur le point de partir' }
    ],
    quiz: {
      prompt: 'Quel modal exprime une volonté FERME ou une commande ?',
      choices: ['想', '会', '要', '能'],
      correctChoiceIndex: 2
    },
    grammarQuiz: {
      type: 'translation-to-chinese',
      translation: 'Je voudrais une tasse de café',
      translationEn: 'I want a cup of coffee',
      correctAnswer: '我要一杯咖啡',
      pinyin: 'wǒ yào yì bēi kāfēi',
      choices: ['我要一杯咖啡', '我想一杯咖啡', '我会一杯咖啡', '我能一杯咖啡']
    },
    tags: ['grammaire', 'modal', 'volonté', 'hsk2'],
    theme: 'grammar'
  },

  // ============================================
  // HSK2 — 能 vs 可以 (pouvoir / permission)
  // ============================================
  {
    id: 'grammar-modal-neng-keyi',
    level: 'hsk2',
    hanzi: '能 / 可以',
    pinyin: 'néng / kěyǐ',
    translation: 'can (capacity) / may (permission)',
    translationFr: 'pouvoir (capacité) / être autorisé à',
    category: 'grammaire',
    explanation: 'Deux modaux traduisent « pouvoir ». 能 (néng) = capacité physique / circonstancielle. 可以 (kěyǐ) = permission ou possibilité neutre. Souvent interchangeables mais avec des nuances clés.',
    grammarExplanation: {
      whenToUse: '能 (néng) : capacité physique / circonstancielle\n• « Je peux car j\'ai le temps / l\'énergie »\n• Peut aussi indiquer permission mais insiste sur la CAPACITÉ.\n\n可以 (kěyǐ) : permission sociale / autorisation\n• Propositions polies (« puis-je ? »)\n• Possibilité neutre, permission accordée.',
      whenToUseEn: '能 (néng): physical / circumstantial ability\n• "I can because I have time / energy"\n• Can also mark permission but emphasizes CAPACITY.\n\n可以 (kěyǐ): social permission / authorization\n• Polite proposals ("may I?")\n• Neutral possibility, granted permission.',
      howToUse: 'Structure : Sujet + 能/可以 + Verbe\n\nExemples 能 :\n• 我今天能来 = Je peux venir aujourd\'hui (capacité)\n• 他能跑十公里 = Il peut courir 10 km (capacité physique)\n\nExemples 可以 :\n• 我可以进来吗？= Puis-je entrer ? (permission)\n• 你可以走了 = Tu peux partir (autorisation)',
      howToUseEn: 'Structure: Subject + 能/可以 + Verb\n\nExamples with 能:\n• 我今天能来 = I can come today (capacity)\n• 他能跑十公里 = He can run 10 km (physical ability)\n\nExamples with 可以:\n• 我可以进来吗？= May I come in? (permission)\n• 你可以走了 = You may leave (authorization)',
      commonMistakes: '❌ Ne confondez PAS avec 会 (huì) !\n• 会 = capacité APPRISE (nager, langue, conduire)\n• 能 = capable MAINTENANT (contexte)\n• 可以 = AUTORISÉ\n\n❌ Pour demander une permission polie, préférez 可以.\n• Meilleur : 我可以借你的书吗？\n\n❌ Négations différentes :\n• 不能 = incapable OU interdit (fort)\n• 不可以 = pas autorisé (règle sociale)',
      commonMistakesEn: '❌ Don\'t confuse with 会 (huì)!\n• 会 = LEARNED ability (swim, languages, drive)\n• 能 = capable NOW (contextual)\n• 可以 = ALLOWED\n\n❌ For polite permission, prefer 可以.\n• Better: 我可以借你的书吗？\n\n❌ Different negations:\n• 不能 = incapable OR forbidden (strong)\n• 不可以 = not allowed (social rule)',
      tips: '💡 Ordre mnémotechnique :\n  会 (as-tu APPRIS ?) → 能 (as-tu la CAPACITÉ maintenant ?) → 可以 (as-tu la PERMISSION ?)\n💡 Exemples :\n  我会游泳 (j\'ai appris) / 我今天不能游泳 (trop fatigué) / 这里可以游泳吗？(autorisé ici ?)',
      tipsEn: '💡 Mnemonic order:\n  会 (did you LEARN?) → 能 (do you have CAPACITY?) → 可以 (do you have PERMISSION?)\n💡 Examples:\n  我会游泳 (learned) / 我今天不能游泳 (too tired) / 这里可以游泳吗？(allowed here?)',
      relatedGrammar: ['grammar-modal-hui', 'grammar-modal-xiang']
    },
    audio: 'audio/grammar/grammar-modal-neng-keyi.wav',
    examples: [
      { hanzi: '我明天能来', pinyin: 'wǒ míngtiān néng lái', translation: 'I can come tomorrow', translationFr: 'Je peux venir demain' },
      { hanzi: '你可以借我的书', pinyin: 'nǐ kěyǐ jiè wǒ de shū', translation: 'You may borrow my book', translationFr: 'Tu peux emprunter mon livre' },
      { hanzi: '我不能吃辣的', pinyin: 'wǒ bù néng chī là de', translation: 'I can\'t eat spicy food', translationFr: 'Je ne peux pas manger épicé' }
    ],
    quiz: {
      prompt: 'Pour demander une permission polie, on utilise...',
      choices: ['会', '能', '可以', '想'],
      correctChoiceIndex: 2
    },
    grammarQuiz: {
      type: 'fill-blank',
      sentence: '请问，我___进来吗？',
      translation: 'Excusez-moi, puis-je entrer ?',
      translationEn: 'Excuse me, may I come in?',
      choices: ['会', '能', '可以', '想'],
      correctChoice: '可以',
      pinyin: 'qǐngwèn, wǒ ___ jìnlái ma?',
      explanation: '可以 est le meilleur choix pour demander une PERMISSION polie.'
    },
    tags: ['grammaire', 'modal', 'permission', 'capacité', 'hsk2'],
    theme: 'grammar'
  },

  // ============================================
  // HSK2 — 一点(儿) vs 有(一)点儿
  // ============================================
  {
    id: 'grammar-yidian-vs-youdian',
    level: 'hsk2',
    hanzi: '一点(儿) / 有点儿',
    pinyin: 'yìdiǎnr / yǒudiǎnr',
    translation: '"a little": positive (一点) vs negative (有点儿)',
    translationFr: '« un peu » : positif (一点) vs négatif (有点儿)',
    category: 'grammaire',
    explanation: 'Deux « un peu » aux positions et significations différentes. 一点(儿) se place APRÈS le mot (sens neutre / comparatif). 有(一)点儿 se place AVANT l\'adjectif (sens souvent NÉGATIF ou déplaisant).',
    grammarExplanation: {
      whenToUse: '一点儿 = QUANTITÉ / COMPARATIF\n• Après un adjectif comparatif ou un verbe\n• Sens neutre : « un peu plus X »\n\n有点儿 = ADVERBE de degré léger\n• Avant un adjectif souvent NÉGATIF (fatigue, prix, gêne)\n• Sens subjectif déplaisant : « c\'est un chouïa X (dommage) »',
      whenToUseEn: '一点儿 = QUANTITY / COMPARATIVE\n• After a comparative adjective or verb\n• Neutral: "a bit more X"\n\n有点儿 = light-degree ADVERB\n• Before a usually NEGATIVE adjective (tired, expensive, awkward)\n• Subjective, mildly unpleasant: "a tad X (unfortunately)"',
      howToUse: '一点儿 : Adjectif + 一点儿\n• 大一点儿 (dà yìdiǎnr) = un peu plus grand\n• 便宜一点儿 = un peu moins cher\n• Comme quantité : 我要一点儿水 = Je veux un peu d\'eau\n\n有(一)点儿 : Sujet + 有点儿 + Adjectif (souvent négatif)\n• 这个有点儿贵 = C\'est un peu cher (déplaisant)\n• 我有点儿累 = Je suis un peu fatigué',
      howToUseEn: '一点儿: Adjective + 一点儿\n• 大一点儿 = a bit bigger\n• 便宜一点儿 = a bit cheaper\n• As quantity: 我要一点儿水 = I want a little water\n\n有(一)点儿: Subject + 有点儿 + Adjective (usually negative)\n• 这个有点儿贵 = This is a bit expensive (regret)\n• 我有点儿累 = I\'m a bit tired',
      commonMistakes: '❌ Position INVERSÉE !\n• Incorrect : 这个一点儿贵 (c\'est déplaisant → 有点儿)\n• Correct : 这个有点儿贵\n\n❌ 有点儿 avec un adjectif POSITIF sans dommage\n• Étrange : 有点儿漂亮\n• Naturel : 挺漂亮 / 有点儿丑 (déplaisant)\n\n💡 Retiens : « déplaisant » → 有点儿 AVANT l\'adj. « comparatif / quantité » → 一点儿 APRÈS.',
      commonMistakesEn: '❌ REVERSED positions!\n• Wrong: 这个一点儿贵 (it\'s unpleasant → 有点儿)\n• Right: 这个有点儿贵\n\n❌ 有点儿 with a truly POSITIVE adjective\n• Odd: 有点儿漂亮\n• Natural: 挺漂亮 / 有点儿丑 (unpleasant)\n\n💡 Rule: "unpleasant" → 有点儿 BEFORE adj. "comparative/quantity" → 一点儿 AFTER.',
      tips: '💡 Mnémo :\n  • 有点儿 = « c\'est un chouïa PÉNIBLE » (avant l\'adj)\n  • 一点儿 = « un chouïa PLUS » (après l\'adj)\n💡 Astuce polie : « parle un peu plus lentement » = 说慢一点儿 (jamais 有点儿).\n💡 儿 est optionnel au sud de la Chine : 一点 / 有点 tout court.',
      tipsEn: '💡 Mnemonic:\n  • 有点儿 = "it\'s a tad ANNOYING" (before adj)\n  • 一点儿 = "a tad MORE" (after adj)\n💡 Polite trick: "speak a bit slower" = 说慢一点儿 (never 有点儿).\n💡 儿 is optional in southern China: 一点 / 有点.',
      relatedGrammar: ['grammar-comparison-bi', 'grammar-adjectives-hen']
    },
    audio: 'audio/grammar/grammar-yidian-vs-youdian.wav',
    examples: [
      { hanzi: '你可以说慢一点儿吗？', pinyin: 'nǐ kěyǐ shuō màn yìdiǎnr ma?', translation: 'Can you speak a bit slower?', translationFr: 'Peux-tu parler un peu plus lentement ?' },
      { hanzi: '我有点儿饿', pinyin: 'wǒ yǒudiǎnr è', translation: 'I\'m a bit hungry', translationFr: 'J\'ai un peu faim' },
      { hanzi: '这件衣服有点儿贵', pinyin: 'zhè jiàn yīfu yǒudiǎnr guì', translation: 'This piece of clothing is a bit expensive', translationFr: 'Ce vêtement est un peu cher' }
    ],
    quiz: {
      prompt: 'Pour dire « un peu fatigué » (sens négatif), on dit...',
      choices: ['一点儿累', '有点儿累', '累一点儿', '有累'],
      correctChoiceIndex: 1
    },
    grammarQuiz: {
      type: 'fill-blank',
      sentence: '今天我___累',
      translation: 'Aujourd\'hui je suis un peu fatigué',
      translationEn: 'Today I\'m a bit tired',
      choices: ['一点儿', '有点儿', '很', '非常'],
      correctChoice: '有点儿',
      pinyin: 'jīntiān wǒ ___ lèi',
      explanation: '有点儿 précède un adjectif à connotation négative (累 = fatigué).'
    },
    tags: ['grammaire', 'adverbe', 'degré', 'hsk2'],
    theme: 'grammar'
  },

  // ============================================
  // HSK2 — 又 vs 再 vs 还 (répétition / continuation)
  // ============================================
  {
    id: 'grammar-you-zai-hai-repetition',
    level: 'hsk2',
    hanzi: '又 / 再 / 还',
    pinyin: 'yòu / zài / hái',
    translation: '"again": 又 (past), 再 (future), 还 (still)',
    translationFr: '« encore » : 又 (déjà), 再 (à venir), 还 (toujours)',
    category: 'grammaire',
    explanation: 'Trois adverbes de répétition / continuation aux valeurs distinctes. Piège classique intermédiaire : chaque mot indique un temps différent (passé, futur, état continu).',
    grammarExplanation: {
      whenToUse: '又 (yòu) = répétition PASSÉE ou HABITUELLE\n• « Encore une fois ! » (souvent avec 了 en fin)\n\n再 (zài) = répétition FUTURE\n• « À nouveau la prochaine fois »\n\n还 (hái) = continuation d\'un état, ENCORE en cours\n• « Toujours pas », « toujours en train de »',
      whenToUseEn: '又 (yòu) = PAST or HABITUAL repetition\n• "Again!" (usually with 了 at end)\n\n再 (zài) = FUTURE repetition\n• "Again next time"\n\n还 (hái) = ongoing state, STILL\n• "Still not", "still doing"',
      howToUse: '又 : Sujet + 又 + Verbe + 了\n• 他又迟到了 = Il est ENCORE en retard (comme d\'hab)\n• 你又忘了！= Tu as ENCORE oublié !\n\n再 : Sujet + 再 + Verbe\n• 再来一次 = Refais-le une fois\n• 再见 = À la prochaine (litt. « re-voir »)\n\n还 : Sujet + 还 + Verbe / Adjectif\n• 我还在学中文 = J\'étudie encore le chinois\n• 他还没来 = Il n\'est toujours pas là',
      howToUseEn: '又: Subject + 又 + Verb + 了\n• 他又迟到了 = He\'s late AGAIN (as usual)\n• 你又忘了！= You forgot AGAIN!\n\n再: Subject + 再 + Verb\n• 再来一次 = Do it again\n• 再见 = See you (lit. "again-see")\n\n还: Subject + 还 + Verb / Adjective\n• 我还在学中文 = I\'m still studying Chinese\n• 他还没来 = He\'s still not here',
      commonMistakes: '❌ 又 pour le futur\n• Incorrect : 明天他又来 (futur)\n• Correct : 明天他再来\n\n❌ 再 pour le passé\n• Incorrect : 他再迟到了 (passé)\n• Correct : 他又迟到了\n\n💡 Astuce temps :\n• 又 + 了 → passé\n• 再 → futur\n• 还 → état continu (« pas encore » = 还没)',
      commonMistakesEn: '❌ 又 for future\n• Wrong: 明天他又来 (future)\n• Right: 明天他再来\n\n❌ 再 for past\n• Wrong: 他再迟到了 (past)\n• Right: 他又迟到了\n\n💡 Time cheat sheet:\n• 又 + 了 → past\n• 再 → future\n• 还 → ongoing state ("not yet" = 还没)',
      tips: '💡 Mnémo :\n  • 又 = « ENCORE ! » (râlé, passé, avec 了)\n  • 再 = « à REFAIRE » (futur, propositions)\n  • 还 = « TOUJOURS/ENCORE » (état continu)\n💡 Test rapide : si tu mets 了 en fin → c\'est 又. Si futur explicite → 再. Si « pas encore » → 还没.',
      tipsEn: '💡 Mnemonic:\n  • 又 = "AGAIN!" (annoyed, past, with 了)\n  • 再 = "DO IT AGAIN" (future, proposals)\n  • 还 = "STILL / YET" (ongoing state)\n💡 Quick test: 了 at end → use 又. Future context → use 再. "Not yet" → 还没.',
      relatedGrammar: ['grammar-aspect-le']
    },
    audio: 'audio/grammar/grammar-you-zai-hai-repetition.wav',
    examples: [
      { hanzi: '你又忘了！', pinyin: 'nǐ yòu wàng le!', translation: 'You forgot again!', translationFr: 'Tu as encore oublié !' },
      { hanzi: '我们下次再见', pinyin: 'wǒmen xià cì zài jiàn', translation: 'See you next time', translationFr: 'On se revoit la prochaine fois' },
      { hanzi: '你还在吗？', pinyin: 'nǐ hái zài ma?', translation: 'Are you still there?', translationFr: 'Tu es toujours là ?' }
    ],
    quiz: {
      prompt: '« Il est ENCORE en retard (comme d\'habitude) » utilise quel adverbe ?',
      choices: ['又', '再', '还', '也'],
      correctChoiceIndex: 0
    },
    grammarQuiz: {
      type: 'fill-blank',
      sentence: '你明天___来吗？',
      translation: 'Tu reviens demain ?',
      translationEn: 'Are you coming again tomorrow?',
      choices: ['又', '再', '还', '也'],
      correctChoice: '再',
      pinyin: 'nǐ míngtiān ___ lái ma?',
      explanation: '再 marque une répétition dans le FUTUR (明天 = demain).'
    },
    tags: ['grammaire', 'adverbe', 'répétition', 'hsk2'],
    theme: 'grammar'
  }
];
