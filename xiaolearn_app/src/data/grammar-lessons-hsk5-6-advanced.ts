/**
 * grammar-lessons-hsk5-6-advanced.ts — 6 leçons de grammaire HSK5-6 avancées
 * -------------------------------------------------------------------------
 * Rhétorique, connecteurs soutenus, préférences comparées :
 *   - HSK5 : 与其...不如... (préférence comparée)
 *   - HSK5 : 宁可...也不... (préférence intransigeante)
 *   - HSK5 : Questions rhétoriques (哪里 / 难道...吗)
 *   - HSK5 : 何况 / 况且 (renchérissement)
 *   - HSK5 : 反正 / 索性 (adverbes d'attitude)
 *   - HSK6 : Connecteurs écrits (而 / 从而 / 因而 / 于是)
 *
 * Chaque entrée respecte le shape `LessonItem` avec `grammarExplanation`
 * complet (when / how / mistakes / tips) + `examples` + `grammarQuiz`.
 */
import type { LessonItem } from '../types';

export const grammarLessonsHsk56Advanced: LessonItem[] = [
  // ============================================
  // HSK5 — 与其...不如... (préférence comparée)
  // ============================================
  {
    id: 'grammar-yuqi-buru',
    level: 'hsk5',
    hanzi: '与其...不如...',
    pinyin: 'yǔqí ... bùrú ...',
    translation: 'rather than X, better Y',
    translationFr: '« plutôt que... autant... » (préférence)',
    category: 'grammaire',
    explanation: 'Structure de PRÉFÉRENCE COMPARÉE : « au lieu de faire X, il vaut mieux faire Y ». Registre soutenu.',
    grammarExplanation: {
      whenToUse: 'Pour comparer deux options et déclarer que la seconde est préférable à la première.',
      whenToUseEn: 'To compare two options and declare that the second is preferable to the first.',
      howToUse: 'Structure : 与其 + Option 1, 不如 + Option 2.\n\nExemples :\n• 与其等他，不如自己去 = plutôt que de l\'attendre, autant y aller nous-mêmes\n• 与其抱怨，不如行动 = au lieu de te plaindre, agis plutôt\n\nOn peut inverser : 不如 + Option préférée. Version simple : 不如 + Verbe (« autant... »).',
      howToUseEn: 'Structure: 与其 + Option 1, 不如 + Option 2.\n\nExamples:\n• 与其等他，不如自己去 = rather than wait for him, we might as well go ourselves\n• 与其抱怨，不如行动 = instead of complaining, take action\n\nCan be inverted: 不如 + preferred option. Simple form: 不如 + verb ("might as well...").',
      commonMistakes: '❌ Confondre avec 宁可 (préférence même à un coût).\n• 与其...不如 = comparaison équilibrée\n• 宁可 = préférence même avec sacrifice\n\nRegistre : soutenu, davantage écrit qu\'oral (mais oral cultivé OK). Ordre STRICT : 与其 avant Option 1.',
      commonMistakesEn: '❌ Don\'t confuse with 宁可 (preference even at a cost).\n• 与其...不如 = balanced comparison\n• 宁可 = preference even with sacrifice\n\nRegister: formal, more written than spoken (but cultivated speech OK). STRICT order: 与其 before Option 1.',
      tips: '💡 Mnémo : « rather than X, better Y ». Utile en dissertation, argumentation.\n💡 不如 seul (« autant... ») fonctionne en oral casual :\n  → 不如我们去看电影 = on n\'a qu\'à aller voir un film',
      tipsEn: '💡 Mnemonic: "rather than X, better Y". Useful in essays, argumentation.\n💡 不如 alone ("might as well...") works in casual speech:\n  → 不如我们去看电影 = we might as well go see a movie',
      relatedGrammar: ['grammar-ningke-ye-bu']
    },
    audio: 'audio/grammar/yuqi-buru.wav',
    examples: [
      { hanzi: '与其后悔，不如努力', pinyin: 'yǔqí hòuhuǐ, bùrú nǔlì', translation: 'Rather than regret, better strive', translationFr: 'Plutôt que d\'avoir des regrets, autant faire des efforts' },
      { hanzi: '与其在家发呆，不如去散步', pinyin: 'yǔqí zài jiā fādāi, bùrú qù sànbù', translation: 'Rather than daydream at home, better go for a walk', translationFr: 'Plutôt que de rêvasser à la maison, autant aller se promener' },
      { hanzi: '不如我们试试看', pinyin: 'bùrú wǒmen shìshi kàn', translation: 'We might as well try', translationFr: 'On n\'a qu\'à essayer' }
    ],
    quiz: {
      prompt: 'Structure "plutôt que...autant..."',
      choices: ['与其...不如', '宁可...也不', '只要...就', '如果...就'],
      correctChoiceIndex: 0
    },
    grammarQuiz: {
      type: 'fill-blank',
      sentence: '___抱怨天气，___好好利用时间',
      translation: 'Plutôt que de se plaindre du temps, autant bien utiliser le temps',
      translationEn: 'Rather than complain about the weather, better make good use of the time',
      choices: ['与其 ... 不如', '宁可 ... 也不', '如果 ... 就', '因为 ... 所以'],
      correctChoice: '与其 ... 不如',
      explanation: '与其...不如 met en balance deux options et déclare la seconde préférable.'
    },
    tags: ['grammaire', 'préférence', 'connecteur', 'soutenu'],
    theme: 'grammar'
  },

  // ============================================
  // HSK5 — 宁可...也不... (préférer au prix de)
  // ============================================
  {
    id: 'grammar-ningke-ye-bu',
    level: 'hsk5',
    hanzi: '宁可/宁愿...也不...',
    pinyin: 'nìngkě/nìngyuàn ... yě bù ...',
    translation: 'would rather X, even if not Y',
    translationFr: '« plutôt X, quitte à Y » (préférence forte)',
    category: 'grammaire',
    explanation: 'Structure de PRÉFÉRENCE INTRANSIGEANTE. Le locuteur préfère X, MÊME AU PRIX de Y (souvent négatif).',
    grammarExplanation: {
      whenToUse: 'Pour exprimer une préférence forte, un principe personnel, un choix moral qui accepte un coût.',
      whenToUseEn: 'To express strong preference, personal principle, or a moral choice that accepts a cost.',
      howToUse: 'Structure : Sujet + 宁可/宁愿 + Choix préféré, 也不 + Rejet.\n\nExemples :\n• 我宁可挨饿，也不吃这个 = je préfère avoir faim plutôt que manger ça\n• 他宁愿走路，也不坐地铁 = il préfère marcher plutôt que prendre le métro\n\n宁可 (plus soutenu, écrit) ; 宁愿 (plus courant à l\'oral).',
      howToUseEn: 'Structure: Subject + 宁可/宁愿 + preferred choice, 也不 + rejection.\n\nExamples:\n• 我宁可挨饿，也不吃这个 = I\'d rather go hungry than eat this\n• 他宁愿走路，也不坐地铁 = he\'d rather walk than take the metro\n\n宁可 (more formal, written); 宁愿 (more common in speech).',
      commonMistakes: '❌ Ne pas confondre avec 与其...不如 (comparaison neutre). 宁可 = choix MORAL/PRINCIPE.\n❌ 宁可...不如 (mélange faux)\n✅ 宁可...也不\n\nLa partie 也不 est OBLIGATOIRE pour marquer le rejet.',
      commonMistakesEn: '❌ Don\'t confuse with 与其...不如 (neutral comparison). 宁可 = MORAL/PRINCIPLE choice.\n❌ 宁可...不如 (wrong mix)\n✅ 宁可...也不\n\nThe 也不 part is REQUIRED to mark the rejection.',
      tips: '💡 Mnémo : « I\'d RATHER X, EVEN if not Y ». Ton engagé, personnel.\n💡 宁可 en registre soutenu, 宁愿 en oral.\n💡 Pour un choix résigné : 宁可 sonne héroïque, 宁愿 sonne pragmatique.',
      tipsEn: '💡 Mnemonic: "I\'d RATHER X, EVEN if not Y". Committed, personal tone.\n💡 宁可 in formal register, 宁愿 in speech.\n💡 For a resigned choice: 宁可 sounds heroic, 宁愿 sounds pragmatic.',
      relatedGrammar: ['grammar-yuqi-buru']
    },
    audio: 'audio/grammar/ningke-ye-bu.wav',
    examples: [
      { hanzi: '我宁愿单身，也不将就', pinyin: 'wǒ nìngyuàn dānshēn, yě bù jiāngjiù', translation: 'I\'d rather stay single than settle', translationFr: 'Je préfère rester seul·e plutôt que de me contenter de peu' },
      { hanzi: '他宁可失败，也不作弊', pinyin: 'tā nìngkě shībài, yě bù zuòbì', translation: 'He\'d rather fail than cheat', translationFr: 'Il préfère échouer plutôt que tricher' },
      { hanzi: '宁可少赚，也不欺骗客户', pinyin: 'nìngkě shǎo zhuàn, yě bù qīpiàn kèhù', translation: 'Rather earn less than deceive customers', translationFr: 'Mieux vaut gagner moins que tromper les clients' }
    ],
    quiz: {
      prompt: 'Structure "préférer X, quitte à ne pas Y"',
      choices: ['宁可...也不', '与其...不如', '虽然...但是', '因为...所以'],
      correctChoiceIndex: 0
    },
    grammarQuiz: {
      type: 'fill-blank',
      sentence: '我___走路，___坐拥挤的公交车',
      translation: 'Je préfère marcher plutôt que prendre le bus bondé',
      translationEn: 'I\'d rather walk than take the crowded bus',
      choices: ['宁可 ... 也不', '与其 ... 不如', '虽然 ... 但是', '不但 ... 而且'],
      correctChoice: '宁可 ... 也不',
      explanation: '宁可...也不 marque une préférence intransigeante avec rejet explicite de l\'alternative.'
    },
    tags: ['grammaire', 'préférence', 'principe', 'soutenu'],
    theme: 'grammar'
  },

  // ============================================
  // HSK5 — Questions rhétoriques (哪里 / 难道...吗)
  // ============================================
  {
    id: 'grammar-rhetorical-questions',
    level: 'hsk5',
    hanzi: '哪里 / 难道...吗',
    pinyin: 'nǎlǐ / nándào ... ma',
    translation: 'rhetorical questions',
    translationFr: 'Questions rhétoriques : nier avec force sans dire « non »',
    category: 'grammaire',
    explanation: 'Structures qui posent une question dont la réponse est ÉVIDENTE, pour affirmer avec plus d\'impact.',
    grammarExplanation: {
      whenToUse: '哪里 (litt. « où ça ? ») = « pas du tout », dément un compliment ou une supposition.\n难道...吗 (« se pourrait-il que...? ») = incrédulité, indignation, réfutation.',
      whenToUseEn: '哪里 (lit. "where?") = "not at all", denies a compliment or a supposition.\n难道...吗 ("could it be that...?") = disbelief, indignation, refutation.',
      howToUse: '哪里 : réponse à un compliment.\n• « 你的中文真好！» → « 哪里哪里 » (« oh, pas du tout ! », modeste)\n• Aussi négation : 我哪里知道 = comment je pourrais savoir ? = « je ne sais absolument pas »\n\n难道 : Sujet + 难道 + Verbe + 吗？\n• 难道你不知道吗？= ne me dis pas que tu ne le sais pas ? (attend « bien sûr que si »)\n• 难道我错了吗？= mais alors j\'aurais tort ? (indignation)',
      howToUseEn: '哪里: reply to a compliment.\n• "你的中文真好！" → "哪里哪里" ("oh, not at all!", modest)\n• Also negation: 我哪里知道 = how could I know? = "I really don\'t know"\n\n难道: Subject + 难道 + Verb + 吗？\n• 难道你不知道吗？= don\'t tell me you don\'t know? (expects "of course I do")\n• 难道我错了吗？= you mean I\'m wrong? (indignant)',
      commonMistakes: '❌ Ne pas prendre au premier degré ! Ce sont des NÉGATIONS DÉGUISÉES.\n❌ Répondre « oui, tu as tort » à 难道我错了吗 : le locuteur AFFIRME qu\'il a raison.\n\n哪里哪里 en réponse au compliment = code politesse chinois.',
      commonMistakesEn: '❌ Don\'t take these literally! They are DISGUISED NEGATIONS.\n❌ Answering "yes, you\'re wrong" to 难道我错了吗: the speaker is INSISTING they\'re right.\n\n哪里哪里 as a compliment reply = Chinese politeness code.',
      tips: '💡 Astuce : quand tu entends 难道...吗, cherche la NÉGATION IMPLICITE.\n  → « 难道 X 吗？» = « Non, ce n\'est pas X ! » (ou « Bien sûr que si ! » selon contexte)\n💡 哪里 (invariant) fait office de « nope, absolutely not » en modeste ou en réfutation.',
      tipsEn: '💡 Tip: when you hear 难道...吗, look for the IMPLICIT NEGATION.\n  → "难道 X 吗？" = "No, it\'s not X!" (or "Of course it is!" depending on context)\n💡 哪里 (invariant) works as "nope, absolutely not" in modesty or refutation.',
      relatedGrammar: ['grammar-question-ma']
    },
    audio: 'audio/grammar/rhetorical-questions.wav',
    examples: [
      { hanzi: '你的书法真好 — 哪里哪里', pinyin: 'nǐ de shūfǎ zhēn hǎo — nǎlǐ nǎlǐ', translation: 'Your calligraphy is so good — oh not at all!', translationFr: 'Ta calligraphie est superbe — oh pas du tout, voyons !' },
      { hanzi: '难道你没看见吗？', pinyin: 'nándào nǐ méi kànjiàn ma?', translation: 'You mean you didn\'t see?', translationFr: 'Ne me dis pas que tu n\'as pas vu ?' },
      { hanzi: '我哪里能忘记', pinyin: 'wǒ nǎlǐ néng wàngjì', translation: 'How could I forget', translationFr: 'Comment est-ce que je pourrais oublier' }
    ],
    quiz: {
      prompt: 'Une question rhétorique pour "bien sûr que si !" (indigné)',
      choices: ['难道我不知道吗', '我不知道吗', '我知道吗', '我怎么知道'],
      correctChoiceIndex: 0
    },
    grammarQuiz: {
      type: 'fill-blank',
      sentence: '___你不知道这件事___？',
      translation: 'Comment pourrais-tu ne pas savoir ça ?',
      translationEn: 'Don\'t tell me you don\'t know about this?',
      choices: ['难道 ... 吗', '是不是 ... 吗', '为什么 ... 呢', '哪里 ... 呢'],
      correctChoice: '难道 ... 吗',
      explanation: '难道...吗 encadre la question rhétorique et exprime l\'incrédulité.'
    },
    tags: ['grammaire', 'rhétorique', 'négation', 'oral'],
    theme: 'grammar'
  },

  // ============================================
  // HSK5 — 何况 / 况且 (renchérissement)
  // ============================================
  {
    id: 'grammar-hekuang-kuangqie',
    level: 'hsk5',
    hanzi: '何况 / 况且',
    pinyin: 'hékuàng / kuàngqiě',
    translation: 'let alone / moreover',
    translationFr: '« qui plus est / à plus forte raison »',
    category: 'grammaire',
    explanation: 'Deux adverbes qui AJOUTENT UN ARGUMENT SUPPLÉMENTAIRE plus fort que le précédent. Registre soutenu.',
    grammarExplanation: {
      whenToUse: 'Pour renforcer un raisonnement en ajoutant un argument encore plus décisif.\n• 何况 = « à plus forte raison, surtout que »\n• 况且 = « en plus, qui plus est » (accumulation plus neutre)',
      whenToUseEn: 'To reinforce reasoning by adding an even more decisive argument.\n• 何况 = "let alone, all the more so"\n• 况且 = "moreover, besides" (more neutral accumulation)',
      howToUse: '何况 : Argument 1, 何况 + Argument 2 (plus fort).\n• 大人都做不了，何况小孩 = même les adultes n\'y arrivent pas, à plus forte raison les enfants\n\n况且 : Phrase + 况且 + Nouvelle raison.\n• 我今天很忙，况且外面在下雨 = je suis très occupé aujourd\'hui, en plus il pleut dehors\n\nCombinaison possible : 更何况 (« encore plus, à plus forte raison »).',
      howToUseEn: '何况: Argument 1, 何况 + Argument 2 (stronger).\n• 大人都做不了，何况小孩 = even adults can\'t do it, let alone children\n\n况且: Sentence + 况且 + new reason.\n• 我今天很忙，况且外面在下雨 = I\'m very busy today, plus it\'s raining outside\n\nPossible combination: 更何况 ("all the more so").',
      commonMistakes: '❌ Utiliser 况且 en oral casual : sonne pompeux. Préfère 而且.\n\nDistinction :\n• 况且 = accumulation neutre\n• 何况 = escalade logique (argumentation)\n\n❌ Placer 何况 en tête sans argument précédent — le premier argument est nécessaire.',
      commonMistakesEn: '❌ Using 况且 in casual speech sounds pompous. Prefer 而且.\n\nDistinction:\n• 况且 = neutral accumulation\n• 何况 = logical escalation (argumentation)\n\n❌ Placing 何况 at the start without a prior argument — the first argument is required.',
      tips: '💡 Mnémo : 何况 = « let alone / how much more so ». 况且 = « moreover, besides ».\n💡 En dissertation : 更何况 (« a fortiori ») donne du poids.\n💡 À l\'ORAL : 而且 suffit dans 90 % des cas.',
      tipsEn: '💡 Mnemonic: 何况 = "let alone / how much more so". 况且 = "moreover, besides".\n💡 In essays: 更何况 ("a fortiori") adds weight.\n💡 In SPEECH: 而且 suffices in 90% of cases.',
      relatedGrammar: ['grammar-budan-erqie', 'grammar-bujin-erqie']
    },
    audio: 'audio/grammar/hekuang-kuangqie.wav',
    examples: [
      { hanzi: '他连基础都不会，何况这么难的题', pinyin: 'tā lián jīchǔ dōu bú huì, hékuàng zhème nán de tí', translation: 'He doesn\'t even know the basics, let alone such hard problems', translationFr: 'Il ne maîtrise même pas les bases, à plus forte raison des exercices aussi difficiles' },
      { hanzi: '我不想去，况且已经很晚了', pinyin: 'wǒ bù xiǎng qù, kuàngqiě yǐjīng hěn wǎn le', translation: 'I don\'t want to go, plus it\'s already late', translationFr: 'Je n\'ai pas envie d\'y aller, en plus il est déjà tard' },
      { hanzi: '更何况我们没时间', pinyin: 'gèng hékuàng wǒmen méi shíjiān', translation: 'All the more so since we have no time', translationFr: 'À plus forte raison qu\'on n\'a pas le temps' }
    ],
    quiz: {
      prompt: '"À plus forte raison" (argumentation)',
      choices: ['何况', '况且', '而且', '因为'],
      correctChoiceIndex: 0
    },
    grammarQuiz: {
      type: 'fill-blank',
      sentence: '连专家都解决不了，___普通人',
      translation: 'Même les experts ne peuvent pas résoudre ça, à plus forte raison une personne ordinaire',
      translationEn: 'Even experts can\'t solve it, let alone an ordinary person',
      choices: ['何况', '况且', '而且', '不但'],
      correctChoice: '何况',
      explanation: '何况 est employé pour l\'escalade logique après un argument déjà fort.'
    },
    tags: ['grammaire', 'connecteur', 'argumentation', 'soutenu'],
    theme: 'grammar'
  },

  // ============================================
  // HSK5 — 反正 / 索性 (adverbes d'attitude)
  // ============================================
  {
    id: 'grammar-fanzheng-suoxing',
    level: 'hsk5',
    hanzi: '反正 / 索性',
    pinyin: 'fǎnzhèng / suǒxìng',
    translation: 'anyway / might as well go all in',
    translationFr: '« de toute façon » (反正) / « autant carrément » (索性)',
    category: 'grammaire',
    explanation: 'Deux adverbes qui expriment une ATTITUDE du locuteur — indifférence tranchée (反正) ou résolution radicale (索性).',
    grammarExplanation: {
      whenToUse: '• 反正 = « de toute façon, quoi qu\'il en soit » — le locuteur affirme un fait indépendant des circonstances.\n• 索性 = « autant faire carrément... » — décision radicale face à un obstacle.',
      whenToUseEn: '• 反正 = "anyway, no matter what" — the speaker asserts a fact independent of circumstances.\n• 索性 = "might as well go all in..." — radical decision facing an obstacle.',
      howToUse: '反正 : (Sujet) + 反正 + Verbe + (raison).\n• 反正我不去 = de toute façon, je n\'y vais pas\n• 反正现在没事，我们聊聊 = comme on n\'a rien à faire, autant discuter\n\n索性 : (Sujet) + 索性 + Verbe (décision radicale).\n• 既然下雨，索性不出去了 = puisqu\'il pleut, autant ne pas sortir du tout\n• 他索性把电脑关了 = il a carrément éteint l\'ordinateur',
      howToUseEn: '反正: (Subject) + 反正 + verb + (reason).\n• 反正我不去 = I\'m not going anyway\n• 反正现在没事，我们聊聊 = since we\'re free, we might as well chat\n\n索性: (Subject) + 索性 + verb (radical decision).\n• 既然下雨，索性不出去了 = since it\'s raining, might as well not go out at all\n• 他索性把电脑关了 = he just went ahead and shut down the computer',
      commonMistakes: '❌ Ne pas confondre 反正 (« anyway ») avec 无论如何 (« coûte que coûte » — plus formel et engagé).\n\n反正 sonne un peu résigné/indifférent, 索性 sonne décidé/tranchant.\n\nRegistre : 反正 = ORAL. 索性 = ORAL + écrit soutenu.',
      commonMistakesEn: '❌ Don\'t confuse 反正 ("anyway") with 无论如何 ("at all costs" — more formal and committed).\n\n反正 sounds a bit resigned/indifferent, 索性 sounds decisive/sharp.\n\nRegister: 反正 = SPEECH. 索性 = SPEECH + written formal.',
      tips: '💡 Mnémo : 反正 = « anyway / whatever », 索性 = « just / might as well go all in ».\n💡 Utile pour donner de la couleur au discours.\n💡 À placer après le sujet et avant le verbe.',
      tipsEn: '💡 Mnemonic: 反正 = "anyway / whatever", 索性 = "just / might as well go all in".\n💡 Useful to add color to speech.\n💡 Place after the subject and before the verb.',
      relatedGrammar: []
    },
    audio: 'audio/grammar/fanzheng-suoxing.wav',
    examples: [
      { hanzi: '反正我不喜欢他', pinyin: 'fǎnzhèng wǒ bù xǐhuan tā', translation: 'I don\'t like him anyway', translationFr: 'De toute façon, je ne l\'aime pas' },
      { hanzi: '索性我们今天什么都不做', pinyin: 'suǒxìng wǒmen jīntiān shénme dōu bú zuò', translation: 'We might as well do nothing today', translationFr: 'Autant ne rien faire du tout aujourd\'hui' },
      { hanzi: '反正你也不会听，我就不说了', pinyin: 'fǎnzhèng nǐ yě bú huì tīng, wǒ jiù bù shuō le', translation: 'You won\'t listen anyway, so I won\'t say it', translationFr: 'De toute façon tu n\'écouteras pas, alors je ne dis rien' }
    ],
    quiz: {
      prompt: '"Autant carrément (aller au bout)" =',
      choices: ['反正', '索性', '一定', '大概'],
      correctChoiceIndex: 1
    },
    grammarQuiz: {
      type: 'fill-blank',
      sentence: '___你也不喜欢，我就不买了',
      translation: 'De toute façon tu n\'aimes pas, alors je n\'achète pas',
      translationEn: 'You don\'t like it anyway, so I won\'t buy it',
      choices: ['反正', '索性', '一定', '大概'],
      correctChoice: '反正',
      explanation: '反正 exprime l\'attitude « de toute façon, quoi qu\'il en soit ».'
    },
    tags: ['grammaire', 'adverbe', 'attitude', 'oral'],
    theme: 'grammar'
  },

  // ============================================
  // HSK6 — Connecteurs écrits (而 / 从而 / 因而 / 于是)
  // ============================================
  {
    id: 'grammar-written-connectors',
    level: 'hsk6',
    hanzi: '而 / 从而 / 因而 / 于是',
    pinyin: 'ér / cóng\'ér / yīn\'ér / yúshì',
    translation: 'and / thereby / thus / then',
    translationFr: 'Connecteurs écrits : liaison logique et temporelle',
    category: 'grammaire',
    explanation: 'Quatre connecteurs de niveau soutenu, essentiels à l\'écrit et au discours formel.',
    grammarExplanation: {
      whenToUse: '• 而 = « et, mais » — coordination neutre (contraste ou complément)\n• 从而 = « et par conséquent, ce qui permet de » (résultat logique)\n• 因而 = « et donc, par conséquent » (cause → effet)\n• 于是 = « alors, sur ce » (temporel, on enchaîne)',
      whenToUseEn: '• 而 = "and, yet" — neutral coordination (contrast or complement)\n• 从而 = "thereby, which enables" (logical result)\n• 因而 = "thus, consequently" (cause → effect)\n• 于是 = "then, whereupon" (temporal sequencing)',
      howToUse: '而 : Phrase 1, 而 + Phrase 2 (contraste ou addition).\n• 他很聪明，而她更用功 = il est intelligent, tandis qu\'elle est plus travailleuse\n\n从而 : Phrase 1，从而 + Résultat.\n• 大家一起努力，从而完成了任务 = tout le monde a travaillé, ce qui a permis d\'achever la tâche\n\n因而 : Cause，因而 + Conséquence.\n• 天气恶劣，因而航班取消了 = le temps était mauvais, par conséquent le vol a été annulé\n\n于是 : Situation, 于是 + Action.\n• 我很累，于是决定休息 = j\'étais fatigué, alors j\'ai décidé de me reposer',
      howToUseEn: '而: Sentence 1, 而 + sentence 2 (contrast or addition).\n• 他很聪明，而她更用功 = he is smart, while she is more hardworking\n\n从而: Sentence 1，从而 + result.\n• 大家一起努力，从而完成了任务 = everyone worked together, thereby completing the task\n\n因而: Cause，因而 + consequence.\n• 天气恶劣，因而航班取消了 = the weather was bad, therefore the flight was cancelled\n\n于是: Situation, 于是 + action.\n• 我很累，于是决定休息 = I was tired, so I decided to rest',
      commonMistakes: 'Registre ÉCRIT — évite à l\'oral casual (préfère 所以, 然后, 但是).\n\nDistinction cause vs conséquence vs enchaînement :\n• 因而 = cause forte\n• 从而 = conséquence positive/résultat\n• 于是 = enchaînement temporel\n\n❌ Combiner deux connecteurs (« 因为...因而 ») : redondant.',
      commonMistakesEn: 'WRITTEN register — avoid in casual speech (prefer 所以, 然后, 但是).\n\nCause vs consequence vs sequence distinction:\n• 因而 = strong cause\n• 从而 = positive consequence/result\n• 于是 = temporal sequencing\n\n❌ Combining two connectors ("因为...因而"): redundant.',
      tips: '💡 Mnémo : 而 = « yet/and », 从而 = « thereby », 因而 = « thus », 于是 = « then/so ».\n💡 En dissertation, en article, en compte-rendu : ces 4 connecteurs élèvent le registre.\n💡 À maîtriser passivement d\'abord.',
      tipsEn: '💡 Mnemonic: 而 = "yet/and", 从而 = "thereby", 因而 = "thus", 于是 = "then/so".\n💡 In essays, articles, reports: these 4 connectors raise the register.\n💡 Master passively first.',
      relatedGrammar: ['grammar-conjunction-yinwei-suoyi', 'grammar-youyu-yinci']
    },
    audio: 'audio/grammar/written-connectors.wav',
    examples: [
      { hanzi: '学习很重要，而实践更关键', pinyin: 'xuéxí hěn zhòngyào, ér shíjiàn gèng guānjiàn', translation: 'Study matters, but practice is even more crucial', translationFr: 'L\'étude est importante, tandis que la pratique est encore plus cruciale' },
      { hanzi: '于是他决定辞职', pinyin: 'yúshì tā juédìng cízhí', translation: 'So he decided to resign', translationFr: 'Sur ce, il décida de démissionner' },
      { hanzi: '他一直在努力，因而取得了成功', pinyin: 'tā yìzhí zài nǔlì, yīn\'ér qǔdéle chénggōng', translation: 'He kept striving, and therefore succeeded', translationFr: 'Il a persévéré, par conséquent il a réussi' }
    ],
    quiz: {
      prompt: '"Alors, sur ce" (enchaînement temporel)',
      choices: ['而', '从而', '因而', '于是'],
      correctChoiceIndex: 3
    },
    grammarQuiz: {
      type: 'fill-blank',
      sentence: '他学习很努力，___成绩很好',
      translation: 'Il étudie très dur, par conséquent ses notes sont excellentes',
      translationEn: 'He studies very hard, and consequently his grades are excellent',
      choices: ['而', '从而', '因而', '于是'],
      correctChoice: '因而',
      explanation: '因而 exprime la conséquence directe d\'une cause : « par conséquent ».'
    },
    tags: ['grammaire', 'connecteur', 'écrit', 'soutenu'],
    theme: 'grammar'
  }
];
