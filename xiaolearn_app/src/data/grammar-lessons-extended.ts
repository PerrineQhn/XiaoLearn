import type { LessonItem } from '../types';

/**
 * Leçons de grammaire supplémentaires
 * Ces leçons complètent grammar-lessons.ts avec des structures plus avancées
 */

export const grammarLessonsExtended: LessonItem[] = [
  // ============================================
  // SPÉCIFICATIFS / MEASURE WORDS
  // ============================================
  {
    id: 'grammar-measure-words',
    level: 'hsk1',
    hanzi: '量词',
    pinyin: 'liàngcí',
    translation: 'Measure Words / Classifiers',
    translationFr: 'Spécificatifs / Classificateurs',
    category: 'grammaire',
    explanation: 'En chinois, on ne peut pas dire directement "un livre". Il faut un spécificatif entre le nombre et le nom.',
    grammarExplanation: {
      whenToUse: 'Les spécificatifs s\'utilisent :\n• Entre un nombre et un nom\n• Pour compter des objets\n• Avec 这 (ce) et 那 (ce...là)\n• Dans presque toutes les phrases avec quantités',
      whenToUseEn: 'Measure words are used:\n• Between a number and a noun\n• To count objects\n• With 这 (this) and 那 (that)\n• In almost all sentences with quantities',
      howToUse: 'Structure : **Nombre + Spécificatif + Nom**\n\nExemples :\n• 一本书 (yī běn shū) = un livre\n• 两个人 (liǎng gè rén) = deux personnes\n• 三杯茶 (sān bēi chá) = trois tasses de thé\n• 这本书 (zhè běn shū) = ce livre',
      howToUseEn: 'Structure: **Number + Measure Word + Noun**\n\nExamples:\n• 一本书 (yī běn shū) = one book\n• 两个人 (liǎng gè rén) = two people\n• 三杯茶 (sān bēi chá) = three cups of tea\n• 这本书 (zhè běn shū) = this book',
      commonMistakes: '❌ NE PAS omettre le spécificatif !\n• Incorrect : 一书 ❌\n• Correct : 一本书 ✅\n\n❌ Chaque type d\'objet a son spécificatif\n• 个 (gè) = général (personnes, fruits, etc.)\n• 本 (běn) = livres, cahiers\n• 杯 (bēi) = tasses, verres\n• 张 (zhāng) = feuilles, tables, billets\n• 只 (zhī) = animaux\n• 条 (tiáo) = objets longs (rivières, pantalons)',
      commonMistakesEn: '❌ DON\'T omit the measure word!\n• Incorrect: 一书 ❌\n• Correct: 一本书 ✅\n\n❌ Each type of object has its measure word\n• 个 (gè) = general (people, fruits, etc.)\n• 本 (běn) = books, notebooks\n• 杯 (bēi) = cups, glasses\n• 张 (zhāng) = flat objects (paper, tables, tickets)\n• 只 (zhī) = animals\n• 条 (tiáo) = long objects (rivers, pants)',
      tips: '💡 个 est le spécificatif universel\n• Si vous ne savez pas quel spécificatif utiliser, utilisez 个\n• C\'est le plus courant en chinois parlé\n\n💡 Astuce de mémorisation\n• 本 ressemble à un livre ouvert\n• 杯 contient 木 (bois) → tasses en bois\n• 张 s\'utilise pour les choses plates',
      tipsEn: '💡 个 is the universal measure word\n• If you don\'t know which measure word to use, use 个\n• It\'s the most common in spoken Chinese\n\n💡 Memory trick\n• 本 looks like an open book\n• 杯 contains 木 (wood) → wooden cups\n• 张 is used for flat things',
      relatedGrammar: []
    },
    audio: 'audio/grammar/measure-words.wav',
    examples: [
      {
        hanzi: '两本书',
        pinyin: 'liǎng běn shū',
        translation: 'deux livres'
      },
      {
        hanzi: '一杯水',
        pinyin: 'yī bēi shuǐ',
        translation: 'a glass of water',
        translationFr: 'un verre d\'eau'
      },
      {
        hanzi: '三个人',
        pinyin: 'sān gè rén',
        translation: 'three people',
        translationFr: 'trois personnes'
      }
    ],
    quiz: {
      prompt: 'Quel spécificatif pour les livres ?',
      choices: ['本', '个', '杯', '张'],
      correctChoiceIndex: 0
    },
    grammarQuiz: {
      type: 'sentence-reconstruction',
      words: ['两', '本', '书'],
      translation: 'deux livres',
      translationEn: 'two books',
      correctOrder: ['两', '本', '书'],
      pinyin: 'liǎng běn shū'
    },
    tags: ['grammaire', 'spécificatif', 'quantité'],
    theme: 'grammar'
  },

  // ============================================
  // EXPRESSIONS TEMPORELLES
  // ============================================
  {
    id: 'grammar-time-expressions',
    level: 'hsk1',
    hanzi: '时间词',
    pinyin: 'shíjiān cí',
    translation: 'Time Expressions',
    translationFr: 'Expressions de temps',
    category: 'grammaire',
    explanation: 'En chinois, les expressions de temps se placent généralement AVANT le verbe, après le sujet.',
    grammarExplanation: {
      whenToUse: 'Les expressions de temps indiquent :\n• QUAND une action se passe\n• La fréquence d\'une action\n• Le moment dans le temps',
      whenToUseEn: 'Time expressions indicate:\n• WHEN an action happens\n• The frequency of an action\n• The moment in time',
      howToUse: 'Structure : **Sujet + Temps + Verbe + Objet**\n\nExemples :\n• 我今天吃饭 (wǒ jīntiān chī fàn) = Je mange aujourd\'hui\n• 他明天来 (tā míngtiān lái) = Il vient demain\n• 我昨天看电影了 (wǒ zuótiān kàn diànyǐng le) = J\'ai vu un film hier',
      howToUseEn: 'Structure: **Subject + Time + Verb + Object**\n\nExamples:\n• 我今天吃饭 (wǒ jīntiān chī fàn) = I eat today\n• 他明天来 (tā míngtiān lái) = He comes tomorrow\n• 我昨天看电影了 (wǒ zuótiān kàn diànyǐng le) = I watched a movie yesterday',
      commonMistakes: '❌ NE PAS mettre le temps à la fin !\n• Incorrect : 我吃饭今天 ❌\n• Correct : 我今天吃饭 ✅\n\n❌ Le temps va AVANT le verbe\n• Incorrect : 我吃今天饭 ❌\n• Correct : 我今天吃饭 ✅',
      commonMistakesEn: '❌ DON\'T put time at the end!\n• Incorrect: 我吃饭今天 ❌\n• Correct: 我今天吃饭 ✅\n\n❌ Time goes BEFORE the verb\n• Incorrect: 我吃今天饭 ❌\n• Correct: 我今天吃饭 ✅',
      tips: '💡 Ordre des éléments temporels\n• Du plus général au plus précis\n• 2023年12月9日早上8点 (année > mois > jour > matin > heure)\n\n💡 Expressions courantes\n• 今天 (jīntiān) = aujourd\'hui\n• 明天 (míngtiān) = demain\n• 昨天 (zuótiān) = hier\n• 现在 (xiànzài) = maintenant\n• 以前 (yǐqián) = avant\n• 以后 (yǐhòu) = après',
      tipsEn: '💡 Order of time elements\n• From general to specific\n• 2023年12月9日早上8点 (year > month > day > morning > hour)\n\n💡 Common expressions\n• 今天 (jīntiān) = today\n• 明天 (míngtiān) = tomorrow\n• 昨天 (zuótiān) = yesterday\n• 现在 (xiànzài) = now\n• 以前 (yǐqián) = before\n• 以后 (yǐhòu) = after',
      relatedGrammar: ['grammar-aspect-le']
    },
    audio: 'audio/grammar/time-expressions.wav',
    examples: [
      {
        hanzi: '我今天很忙',
        pinyin: 'wǒ jīntiān hěn máng',
        translation: 'I am busy today',
        translationFr: 'Je suis occupé aujourd\'hui'
      },
      {
        hanzi: '他明天来',
        pinyin: 'tā míngtiān lái',
        translation: 'He is coming tomorrow',
        translationFr: 'Il vient demain'
      },
      {
        hanzi: '我们晚上七点吃饭',
        pinyin: 'wǒmen wǎnshang qī diǎn chī fàn',
        translation: 'We have dinner at 7pm',
        translationFr: 'Nous dînons à 19h'
      }
    ],
    quiz: {
      prompt: 'Où placer l\'expression de temps ?',
      choices: ['Avant le verbe', 'Après le verbe', 'À la fin', 'Au début absolu'],
      correctChoiceIndex: 0
    },
    grammarQuiz: {
      type: 'sentence-reconstruction',
      words: ['我', '今天', '吃', '饭'],
      translation: 'Je mange aujourd\'hui',
      translationEn: 'I eat today',
      correctOrder: ['我', '今天', '吃', '饭'],
      pinyin: 'wǒ jīntiān chī fàn'
    },
    tags: ['grammaire', 'temps', 'ordre'],
    theme: 'grammar'
  },

  // ============================================
  // PROGRESSIF: 在/正在
  // ============================================
  {
    id: 'grammar-progressive',
    level: 'hsk2',
    hanzi: '在/正在',
    pinyin: 'zài/zhèngzài',
    translation: 'Progressive Aspect (在/正在)',
    translationFr: 'Aspect progressif (在/正在)',
    category: 'grammaire',
    explanation: '在 et 正在 indiquent qu\'une action est EN TRAIN de se passer maintenant.',
    grammarExplanation: {
      whenToUse: '在/正在 s\'utilise pour :\n• Actions en cours MAINTENANT\n• Équivalent de "en train de"\n• Insister sur le déroulement de l\'action\n• Souvent avec 呢 (ne) à la fin',
      whenToUseEn: '在/正在 is used for:\n• Actions happening NOW\n• Equivalent to "in the process of"\n• Emphasizing the ongoing nature\n• Often with 呢 (ne) at the end',
      howToUse: 'Structure : **Sujet + 在/正在 + Verbe + (呢)**\n\nExemples :\n• 我在吃饭 (wǒ zài chī fàn) = Je suis en train de manger\n• 他正在学习呢 (tā zhèngzài xuéxí ne) = Il est en train d\'étudier\n• 妈妈在做饭 (māma zài zuò fàn) = Maman est en train de cuisiner',
      howToUseEn: 'Structure: **Subject + 在/正在 + Verb + (呢)**\n\nExamples:\n• 我在吃饭 (wǒ zài chī fàn) = I am eating\n• 他正在学习呢 (tā zhèngzài xuéxí ne) = He is studying\n• 妈妈在做饭 (māma zài zuò fàn) = Mom is cooking',
      commonMistakes: '❌ Ne confondez pas 在 (localisation) et 在 (progressif)\n• 我在家 = Je suis à la maison (lieu)\n• 我在吃饭 = Je suis en train de manger (action)\n\n❌ 正在 est plus formel que 在\n• Parlé : 我在吃饭 ✅\n• Écrit : 我正在吃饭 ✅',
      commonMistakesEn: '❌ Don\'t confuse 在 (location) and 在 (progressive)\n• 我在家 = I am at home (location)\n• 我在吃饭 = I am eating (action)\n\n❌ 正在 is more formal than 在\n• Spoken: 我在吃饭 ✅\n• Written: 我正在吃饭 ✅',
      tips: '💡 Différence avec le présent simple\n• 我吃饭 = Je mange (habitude, fait général)\n• 我在吃饭 = Je suis EN TRAIN de manger (maintenant)\n\n💡 Avec 呢 pour renforcer\n• 你在做什么呢？ = Qu\'es-tu en train de faire ?',
      tipsEn: '💡 Difference with simple present\n• 我吃饭 = I eat (habit, general fact)\n• 我在吃饭 = I AM eating (right now)\n\n💡 With 呢 for emphasis\n• 你在做什么呢？ = What are you doing?',
      relatedGrammar: ['grammar-location-zai']
    },
    audio: 'audio/grammar/progressive.wav',
    examples: [
      {
        hanzi: '我在看书',
        pinyin: 'wǒ zài kàn shū',
        translation: 'I am reading right now',
        translationFr: 'Je suis en train de lire'
      },
      {
        hanzi: '他正在工作呢',
        pinyin: 'tā zhèngzài gōngzuò ne',
        translation: 'He is working right now',
        translationFr: 'Il est en train de travailler'
      },
      {
        hanzi: '他们正在开会',
        pinyin: 'tāmen zhèngzài kāihuì',
        translation: 'They are in a meeting',
        translationFr: 'Ils sont en réunion'
      }
    ],
    quiz: {
      prompt: 'Quelle particule pour "en train de" ?',
      choices: ['在/正在', '了', '的', '过'],
      correctChoiceIndex: 0
    },
    grammarQuiz: {
      type: 'particle-choice',
      sentenceBefore: '我',
      sentenceAfter: '吃饭呢',
      translation: 'Je suis en train de manger',
      translationEn: 'I am eating',
      choices: ['在', '了', '的', '很'],
      correctChoice: '在',
      explanation: '在 indique qu\'une action est en cours maintenant'
    },
    tags: ['grammaire', 'aspect', 'progressif'],
    theme: 'grammar'
  },

  // ============================================
  // DURÉE TEMPORELLE
  // ============================================
  {
    id: 'grammar-duration',
    level: 'hsk2',
    hanzi: '时间段',
    pinyin: 'shíjiān duàn',
    translation: 'Duration',
    translationFr: 'Durée',
    category: 'grammaire',
    explanation: 'Pour exprimer combien de temps dure une action, la durée se place après le verbe.',
    grammarExplanation: {
      whenToUse: 'Pour exprimer :\n• Combien de temps dure une action\n• La durée d\'une activité\n• "Pendant X temps"',
      whenToUseEn: 'To express:\n• How long an action lasts\n• The duration of an activity\n• "For X time"',
      howToUse: 'Structure : **Sujet + Verbe + 了 + Durée + (Objet)**\n\nExemples :\n• 我学了两年中文 (wǒ xué le liǎng nián zhōngwén) = J\'ai étudié le chinois pendant 2 ans\n• 他睡了八个小时 (tā shuì le bā gè xiǎoshí) = Il a dormi 8 heures\n• 我等了你三十分钟 (wǒ děng le nǐ sānshí fēnzhōng) = Je t\'ai attendu 30 minutes',
      howToUseEn: 'Structure: **Subject + Verb + 了 + Duration + (Object)**\n\nExamples:\n• 我学了两年中文 (wǒ xué le liǎng nián zhōngwén) = I studied Chinese for 2 years\n• 他睡了八个小时 (tā shuì le bā gè xiǎoshí) = He slept for 8 hours\n• 我等了你三十分钟 (wǒ děng le nǐ sānshí fēnzhōng) = I waited for you for 30 minutes',
      commonMistakes: '❌ La durée va APRÈS le verbe, pas avant !\n• Incorrect : 我两年学了中文 ❌\n• Correct : 我学了两年中文 ✅\n\n❌ Avec objet, deux positions possibles\n• 我学了两年中文 ✅\n• 我学中文学了两年 ✅ (répéter le verbe)',
      commonMistakesEn: '❌ Duration goes AFTER the verb, not before!\n• Incorrect: 我两年学了中文 ❌\n• Correct: 我学了两年中文 ✅\n\n❌ With object, two positions possible\n• 我学了两年中文 ✅\n• 我学中文学了两年 ✅ (repeat the verb)',
      tips: '💡 Unités de temps courantes\n• 分钟 (fēnzhōng) = minute\n• 小时 (xiǎoshí) = heure\n• 天 (tiān) = jour\n• 星期 (xīngqī) = semaine\n• 月 (yuè) = mois\n• 年 (nián) = année',
      tipsEn: '💡 Common time units\n• 分钟 (fēnzhōng) = minute\n• 小时 (xiǎoshí) = hour\n• 天 (tiān) = day\n• 星期 (xīngqī) = week\n• 月 (yuè) = month\n• 年 (nián) = year',
      relatedGrammar: ['grammar-aspect-le']
    },
    audio: 'audio/grammar/duration.wav',
    examples: [
      {
        hanzi: '我学了两年',
        pinyin: 'wǒ xué le liǎng nián',
        translation: 'I studied for 2 years',
        translationFr: 'J\'ai étudié pendant 2 ans'
      },
      {
        hanzi: '他等了一个小时',
        pinyin: 'tā děng le yī gè xiǎoshí',
        translation: 'He waited for an hour',
        translationFr: 'Il a attendu une heure'
      },
      {
        hanzi: '我们聊了十分钟',
        pinyin: 'wǒmen liáo le shí fēnzhōng',
        translation: 'We talked for ten minutes',
        translationFr: 'Nous avons discuté dix minutes'
      }
    ],
    quiz: {
      prompt: 'Où placer la durée dans la phrase ?',
      choices: ['Après le verbe', 'Avant le verbe', 'À la fin absolue', 'Au début'],
      correctChoiceIndex: 0
    },
    grammarQuiz: {
      type: 'sentence-reconstruction',
      words: ['我', '学', '了', '两', '年', '中文'],
      translation: 'J\'ai étudié le chinois pendant 2 ans',
      translationEn: 'I studied Chinese for 2 years',
      correctOrder: ['我', '学', '了', '两', '年', '中文'],
      pinyin: 'wǒ xué le liǎng nián zhōngwén'
    },
    tags: ['grammaire', 'temps', 'durée'],
    theme: 'grammar'
  },

  // ============================================
  // COMPLÉMENTS DE RÉSULTAT
  // ============================================
  {
    id: 'grammar-resultative',
    level: 'hsk2',
    hanzi: '结果补语',
    pinyin: 'jiéguǒ bǔyǔ',
    translation: 'Resultative Complements',
    translationFr: 'Compléments de résultat',
    category: 'grammaire',
    explanation: 'Les compléments de résultat indiquent le RÉSULTAT ou l\'ABOUTISSEMENT d\'une action.',
    grammarExplanation: {
      whenToUse: 'Pour indiquer :\n• Le résultat d\'une action\n• Si l\'action est terminée ou réussie\n• L\'état final après l\'action',
      whenToUseEn: 'To indicate:\n• The result of an action\n• Whether the action is finished or successful\n• The final state after the action',
      howToUse: 'Structure : **Verbe + Complément de résultat**\n\nCompléments courants :\n• 完 (wán) = fini, terminé\n• 好 (hǎo) = bien fait, prêt\n• 到 (dào) = atteint, arrivé\n• 懂 (dǒng) = compris\n• 见 (jiàn) = vu\n\nExemples :\n• 我吃完了 (wǒ chī wán le) = J\'ai fini de manger\n• 做好了吗？ (zuò hǎo le ma?) = C\'est prêt ?\n• 我听懂了 (wǒ tīng dǒng le) = J\'ai compris (en écoutant)',
      howToUseEn: 'Structure: **Verb + Resultative Complement**\n\nCommon complements:\n• 完 (wán) = finished, completed\n• 好 (hǎo) = well done, ready\n• 到 (dào) = reached, arrived\n• 懂 (dǒng) = understood\n• 见 (jiàn) = seen\n\nExamples:\n• 我吃完了 (wǒ chī wán le) = I finished eating\n• 做好了吗？ (zuò hǎo le ma?) = Is it ready?\n• 我听懂了 (wǒ tīng dǒng le) = I understood (by listening)',
      commonMistakes: '❌ Le complément va directement APRÈS le verbe\n• Incorrect : 我吃了完 ❌\n• Correct : 我吃完了 ✅\n\n❌ Ne confondez pas avec les verbes séparés\n• 做完 = finir de faire (un seul mot verbal)\n• 做 + 完 ≠ deux verbes séparés',
      commonMistakesEn: '❌ The complement goes directly AFTER the verb\n• Incorrect: 我吃了完 ❌\n• Correct: 我吃完了 ✅\n\n❌ Don\'t confuse with separate verbs\n• 做完 = finish doing (one verb compound)\n• 做 + 完 ≠ two separate verbs',
      tips: '💡 Compléments les plus utiles\n• 完 (wán) : action terminée\n• 好 (hǎo) : action bien faite\n• 到 (dào) : but atteint\n• 懂 (dǒng) : compréhension réussie\n• 清楚 (qīngchu) : clarté obtenue\n\n💡 Forme négative : 没 + Verbe + Complément\n• 我没听懂 = Je n\'ai pas compris',
      tipsEn: '💡 Most useful complements\n• 完 (wán): action finished\n• 好 (hǎo): action well done\n• 到 (dào): goal reached\n• 懂 (dǒng): understanding achieved\n• 清楚 (qīngchu): clarity obtained\n\n💡 Negative form: 没 + Verb + Complement\n• 我没听懂 = I didn\'t understand',
      relatedGrammar: ['grammar-aspect-le']
    },
    audio: 'audio/grammar/resultative.wav',
    examples: [
      {
        hanzi: '我做完了',
        pinyin: 'wǒ zuò wán le',
        translation: 'J\'ai fini (de faire)'
      },
      {
        hanzi: '他听懂了',
        pinyin: 'tā tīng dǒng le',
        translation: 'He understood (by listening)',
        translationFr: 'Il a compris (en écoutant)'
      },
      {
        hanzi: '门开好了',
        pinyin: 'mén kāi hǎo le',
        translation: 'The door is indeed open',
        translationFr: 'La porte est bien ouverte'
      }
    ],
    quiz: {
      prompt: 'Quel complément pour "finir de faire" ?',
      choices: ['完', '好', '了', '过'],
      correctChoiceIndex: 0
    },
    grammarQuiz: {
      type: 'particle-choice',
      sentenceBefore: '我吃',
      sentenceAfter: '了',
      translation: 'J\'ai fini de manger',
      translationEn: 'I finished eating',
      choices: ['完', '好', '到', '了'],
      correctChoice: '完',
      explanation: '完 indique que l\'action est terminée'
    },
    tags: ['grammaire', 'résultat', 'complément'],
    theme: 'grammar'
  },

  // ============================================
  // CONJONCTIONS COMPLEXES
  // ============================================
  {
    id: 'grammar-conjunctions-complex',
    level: 'hsk2',
    hanzi: '复杂连词',
    pinyin: 'fùzá liáncí',
    translation: 'Complex Conjunctions',
    translationFr: 'Conjonctions complexes',
    category: 'grammaire',
    explanation: 'Les conjonctions complexes relient deux propositions avec des relations de cause, concession, ou condition.',
    grammarExplanation: {
      whenToUse: 'Pour exprimer :\n• Une concession : "bien que...mais"\n• Une condition : "si...alors"\n• Une cause différente de 因为...所以',
      whenToUseEn: 'To express:\n• A concession: "although...but"\n• A condition: "if...then"\n• A cause different from 因为...所以',
      howToUse: '**虽然...但是 (suīrán...dànshì)** = Bien que...mais\n• 虽然很贵，但是很好 = Bien que ce soit cher, c\'est bien\n\n**如果...就 (rúguǒ...jiù)** = Si...alors\n• 如果下雨，我就不去 = S\'il pleut, je n\'irai pas\n\n**要是...就 (yàoshi...jiù)** = Si (plus familier)\n• 要是累了，就休息 = Si tu es fatigué, repose-toi',
      howToUseEn: '**虽然...但是 (suīrán...dànshì)** = Although...but\n• 虽然很贵，但是很好 = Although it\'s expensive, it\'s good\n\n**如果...就 (rúguǒ...jiù)** = If...then\n• 如果下雨，我就不去 = If it rains, I won\'t go\n\n**要是...就 (yàoshi...jiù)** = If (more colloquial)\n• 要是累了，就休息 = If you\'re tired, rest',
      commonMistakes: '❌ En chinois, on peut utiliser "bien que" ET "mais" ensemble\n• Chinois : 虽然...但是 ✅\n• Français : on choisit l\'un OU l\'autre\n\n❌ 就 renforce la conséquence\n• Sans 就 : 如果下雨，我不去 ✅ (correct)\n• Avec 就 : 如果下雨，我就不去 ✅ (plus naturel)',
      commonMistakesEn: '❌ In Chinese, you can use "although" AND "but" together\n• Chinese: 虽然...但是 ✅\n• English: choose one OR the other\n\n❌ 就 reinforces the consequence\n• Without 就: 如果下雨，我不去 ✅ (correct)\n• With 就: 如果下雨，我就不去 ✅ (more natural)',
      tips: '💡 Structure flexible\n• On peut omettre la première partie\n• 但是很好 = Mais c\'est bien (sans 虽然)\n• 我就不去 = Alors je n\'irai pas (sans 如果)\n\n💡 Différence 如果 vs 要是\n• 如果 : plus formel, écrit\n• 要是 : plus familier, parlé',
      tipsEn: '💡 Flexible structure\n• You can omit the first part\n• 但是很好 = But it\'s good (without 虽然)\n• 我就不去 = Then I won\'t go (without 如果)\n\n💡 Difference 如果 vs 要是\n• 如果: more formal, written\n• 要是: more colloquial, spoken',
      relatedGrammar: ['grammar-conjunction-yinwei-suoyi']
    },
    audio: 'audio/grammar/complex-conjunctions.wav',
    examples: [
      {
        hanzi: '虽然贵，但是很好',
        pinyin: 'suīrán guì, dànshì hěn hǎo',
        translation: 'Although it\'s expensive, it\'s good',
        translationFr: 'Bien que ce soit cher, c\'est bien'
      },
      {
        hanzi: '如果下雨，我就不去',
        pinyin: 'rúguǒ xiàyǔ, wǒ jiù bú qù',
        translation: 'If it rains, I won\'t go',
        translationFr: 'S\'il pleut, je n\'irai pas'
      },
      {
        hanzi: '要是有时间，我就去看你',
        pinyin: 'yàoshi yǒu shíjiān, wǒ jiù qù kàn nǐ',
        translation: 'If I have time, I\'ll come see you',
        translationFr: 'Si j\'ai du temps, j\'irai te voir'
      }
    ],
    quiz: {
      prompt: 'Quelle conjonction pour "bien que...mais" ?',
      choices: ['虽然...但是', '因为...所以', '如果...就', '要是...就'],
      correctChoiceIndex: 0
    },
    grammarQuiz: {
      type: 'fill-blank',
      sentence: '虽然很贵，___ 很好',
      translation: 'Bien que ce soit cher, c\'est bien',
      translationEn: 'Although it\'s expensive, it\'s good',
      choices: ['但是', '所以', '就', '和'],
      correctChoice: '但是',
      explanation: '虽然...但是 exprime une concession',
      pinyin: 'suīrán hěn guì，___ hěn hǎo'
    },
    tags: ['grammaire', 'conjonction', 'complexe'],
    theme: 'grammar'
  },

  // ============================================
  // HSK3 — CONSTRUCTION 把 (DISPOSAL)
  // ============================================
  {
    id: 'grammar-ba-disposal',
    level: 'hsk3',
    hanzi: '把',
    pinyin: 'bǎ',
    translation: 'Disposal construction with 把',
    translationFr: 'Construction de disposition avec 把',
    category: 'grammaire',
    explanation: '把 déplace l\'objet avant le verbe pour insister sur ce qu\'on fait AVEC cet objet, et sur le résultat.',
    grammarExplanation: {
      whenToUse: 'Utilisez 把 pour :\n• Insister sur ce qui arrive à l\'objet\n• Indiquer un résultat ou un changement d\'état\n• Le verbe doit être « disposant » (provoquer un effet)\n• L\'objet doit être défini (ce livre, mon sac…)',
      whenToUseEn: 'Use 把 to:\n• Emphasize what happens to the object\n• Indicate a result or state change\n• The verb must be "disposing" (cause an effect)\n• The object must be definite (this book, my bag…)',
      howToUse: 'Structure : **Sujet + 把 + Objet + Verbe + Complément**\n\nLe verbe doit être suivi d\'un complément (résultat, direction, durée, 了, etc.) — jamais seul.\n\nExemples :\n• 我把书放在桌子上 (wǒ bǎ shū fàng zài zhuōzi shàng) = Je pose le livre sur la table\n• 请把门关上 (qǐng bǎ mén guān shàng) = Ferme la porte, s\'il te plaît\n• 他把作业做完了 (tā bǎ zuòyè zuòwán le) = Il a fini ses devoirs',
      howToUseEn: 'Structure: **Subject + 把 + Object + Verb + Complement**\n\nThe verb must be followed by a complement (result, direction, duration, 了, etc.) — never alone.\n\nExamples:\n• 我把书放在桌子上 = I put the book on the table\n• 请把门关上 = Please close the door\n• 他把作业做完了 = He finished his homework',
      commonMistakes: '❌ Ne jamais utiliser 把 avec un verbe isolé\n• Incorrect : 我把书看 ❌\n• Correct : 我把书看完了 ✅\n\n❌ L\'objet doit être défini\n• Incorrect : 我把一本书看完了 ❌ (un livre indéfini)\n• Correct : 我把这本书看完了 ✅ (ce livre)\n\n❌ Pas de 把 avec les verbes d\'état (是, 有, 喜欢, 觉得)\n• Incorrect : 我把他喜欢 ❌',
      commonMistakesEn: '❌ Never use 把 with a bare verb\n• Incorrect: 我把书看 ❌\n• Correct: 我把书看完了 ✅\n\n❌ The object must be definite\n• Incorrect: 我把一本书看完了 ❌\n• Correct: 我把这本书看完了 ✅\n\n❌ No 把 with state verbs (是, 有, 喜欢, 觉得)\n• Incorrect: 我把他喜欢 ❌',
      tips: '💡 Pense à 把 comme à la poignée d\'un objet\n• Tu « saisis » l\'objet puis tu lui fais quelque chose\n• Cela explique pourquoi il faut un résultat\n\n💡 Test rapide\n• Si tu peux remplacer par « prendre X et… » → utilise 把\n• Ex : 把饭吃了 = prendre le riz et le manger',
      tipsEn: '💡 Think of 把 as the handle of an object\n• You "grab" the object then do something to it\n• That\'s why you need a result\n\n💡 Quick test\n• If you can rephrase as "take X and…" → use 把\n• Ex: 把饭吃了 = take the rice and eat it',
      relatedGrammar: ['grammar-bei-passive', 'grammar-resultative']
    },
    audio: 'audio/grammar/ba-disposal.wav',
    examples: [
      {
        hanzi: '我把钱包忘在家里了',
        pinyin: 'wǒ bǎ qiánbāo wàng zài jiā lǐ le',
        translation: 'I left my wallet at home',
        translationFr: 'J\'ai oublié mon portefeuille à la maison'
      },
      {
        hanzi: '请把窗户打开',
        pinyin: 'qǐng bǎ chuānghu dǎkāi',
        translation: 'Please open the window',
        translationFr: 'Ouvre la fenêtre, s\'il te plaît'
      },
      {
        hanzi: '他把杯子打破了',
        pinyin: 'tā bǎ bēizi dǎpò le',
        translation: 'He broke the cup',
        translationFr: 'Il a cassé la tasse'
      }
    ],
    quiz: {
      prompt: 'Quelle phrase est correcte avec 把 ?',
      choices: ['我把书看', '我把书看完了', '我把一本书看', '我把觉得对'],
      correctChoiceIndex: 1
    },
    grammarQuiz: {
      type: 'sentence-reconstruction',
      words: ['我', '把', '作业', '做完了'],
      translation: 'J\'ai fini mes devoirs',
      translationEn: 'I finished my homework',
      correctOrder: ['我', '把', '作业', '做完了'],
      pinyin: 'wǒ bǎ zuòyè zuòwán le'
    },
    tags: ['grammaire', 'hsk3', 'ba', 'disposition'],
    theme: 'grammar'
  },

  // ============================================
  // HSK3 — PASSIF AVEC 被
  // ============================================
  {
    id: 'grammar-bei-passive',
    level: 'hsk3',
    hanzi: '被',
    pinyin: 'bèi',
    translation: 'Passive voice with 被',
    translationFr: 'Voix passive avec 被',
    category: 'grammaire',
    explanation: '被 introduit la voix passive : le sujet subit l\'action. C\'est le symétrique de 把.',
    grammarExplanation: {
      whenToUse: 'Utilisez 被 pour :\n• Mettre l\'accent sur qui/quoi subit l\'action\n• Marquer un événement souvent désagréable (traditionnellement)\n• Quand l\'agent est inconnu ou secondaire\n• Comme en français : « La tasse a été cassée »',
      whenToUseEn: 'Use 被 to:\n• Emphasize who/what receives the action\n• Mark an often unfortunate event (traditionally)\n• When the agent is unknown or secondary\n• Like English: "The cup was broken"',
      howToUse: 'Structure : **Sujet (patient) + 被 + (Agent) + Verbe + Complément**\n\nL\'agent est optionnel. Comme 把, le verbe demande un complément.\n\nExemples :\n• 杯子被打破了 (bēizi bèi dǎpò le) = La tasse a été cassée\n• 我被老师批评了 (wǒ bèi lǎoshī pīpíng le) = J\'ai été grondé par le prof\n• 钱包被偷了 (qiánbāo bèi tōu le) = Le portefeuille a été volé',
      howToUseEn: 'Structure: **Subject (patient) + 被 + (Agent) + Verb + Complement**\n\nThe agent is optional. Like 把, the verb needs a complement.\n\nExamples:\n• 杯子被打破了 = The cup was broken\n• 我被老师批评了 = I was scolded by the teacher\n• 钱包被偷了 = The wallet was stolen',
      commonMistakes: '❌ Le verbe a toujours un complément\n• Incorrect : 杯子被打破 ❌\n• Correct : 杯子被打破了 ✅\n\n❌ 让 et 叫 peuvent aussi marquer le passif (plus familier)\n• 让 : 他让狗咬了 = Il s\'est fait mordre par le chien\n• 叫 : 我叫雨淋湿了 = Je me suis fait tremper par la pluie\n\n❌ Ne pas confondre 被 « passif » avec 被子 « couverture »',
      commonMistakesEn: '❌ The verb always has a complement\n• Incorrect: 杯子被打破 ❌\n• Correct: 杯子被打破了 ✅\n\n❌ 让 and 叫 can also mark passive (colloquial)\n• 让: 他让狗咬了 = He got bitten by the dog\n• 叫: 我叫雨淋湿了 = I got soaked by the rain\n\n❌ Don\'t confuse 被 "passive" with 被子 "blanket"',
      tips: '💡 被 se traduit souvent par « se faire + infinitif »\n• 被骗 = se faire escroquer\n• 被抓 = se faire attraper\n\n💡 Dans le chinois moderne, 被 s\'utilise aussi pour des événements neutres/positifs\n• 被录取 = être admis (à une université)\n• 被邀请 = être invité',
      tipsEn: '💡 被 often translates as "get + past participle"\n• 被骗 = get scammed\n• 被抓 = get caught\n\n💡 In modern Chinese, 被 is also used for neutral/positive events\n• 被录取 = be admitted (to university)\n• 被邀请 = be invited',
      relatedGrammar: ['grammar-ba-disposal']
    },
    audio: 'audio/grammar/bei-passive.wav',
    examples: [
      {
        hanzi: '我的自行车被偷了',
        pinyin: 'wǒ de zìxíngchē bèi tōu le',
        translation: 'My bike was stolen',
        translationFr: 'Mon vélo a été volé'
      },
      {
        hanzi: '他被公司录取了',
        pinyin: 'tā bèi gōngsī lùqǔ le',
        translation: 'He was hired by the company',
        translationFr: 'Il a été embauché par l\'entreprise'
      },
      {
        hanzi: '蛋糕被孩子吃完了',
        pinyin: 'dàngāo bèi háizi chīwán le',
        translation: 'The cake was finished by the kids',
        translationFr: 'Le gâteau a été fini par les enfants'
      }
    ],
    quiz: {
      prompt: 'Quelle phrase est au passif avec 被 ?',
      choices: ['我吃蛋糕', '蛋糕被我吃了', '我把蛋糕吃了', '蛋糕是我的'],
      correctChoiceIndex: 1
    },
    grammarQuiz: {
      type: 'fill-blank',
      sentence: '我的钱包 ___ 偷了',
      translation: 'Mon portefeuille a été volé',
      translationEn: 'My wallet was stolen',
      choices: ['把', '被', '是', '在'],
      correctChoice: '被',
      pinyin: 'wǒ de qiánbāo ___ tōu le',
      explanation: '被 marque le passif : le sujet subit l\'action'
    },
    tags: ['grammaire', 'hsk3', 'bei', 'passif'],
    theme: 'grammar'
  },

  // ============================================
  // HSK3 — CAUSATIF AVEC 让
  // ============================================
  {
    id: 'grammar-rang-causative',
    level: 'hsk3',
    hanzi: '让',
    pinyin: 'ràng',
    translation: 'Causative with 让',
    translationFr: 'Causatif avec 让',
    category: 'grammaire',
    explanation: '让 signifie « faire faire », « laisser faire ». Il introduit l\'acteur d\'une action qu\'on provoque ou autorise.',
    grammarExplanation: {
      whenToUse: 'Utilisez 让 pour :\n• Demander ou faire faire : « faire X faire Y »\n• Autoriser : « laisser X faire Y »\n• Invitation : « laisse-moi… »\n• Exprimer un effet : « ça me rend triste »',
      whenToUseEn: 'Use 让 to:\n• Ask or make someone do: "make X do Y"\n• Allow: "let X do Y"\n• Invitation: "let me…"\n• Express effect: "it makes me sad"',
      howToUse: 'Structure : **Sujet + 让 + Objet/Personne + Verbe**\n\nExemples :\n• 妈妈让我做作业 (māma ràng wǒ zuò zuòyè) = Maman me fait faire mes devoirs\n• 让我想想 (ràng wǒ xiǎngxiang) = Laisse-moi réfléchir\n• 这部电影让我很感动 (zhè bù diànyǐng ràng wǒ hěn gǎndòng) = Ce film m\'a beaucoup ému',
      howToUseEn: 'Structure: **Subject + 让 + Object/Person + Verb**\n\nExamples:\n• 妈妈让我做作业 = Mom makes me do homework\n• 让我想想 = Let me think\n• 这部电影让我很感动 = This film moved me a lot',
      commonMistakes: '❌ 让 ≠ « permettre » seulement\n• Selon le contexte : obliger, laisser, faire en sorte que\n• Seul le contexte tranche\n\n❌ Ne pas confondre avec 叫 (jiào)\n• 让 : plus neutre, souvent autorisation\n• 叫 : plus fort, souvent ordre\n\n❌ 使 (shǐ) est un équivalent plus formel/écrit',
      commonMistakesEn: '❌ 让 ≠ only "to permit"\n• Depending on context: force, let, cause\n• Only context decides\n\n❌ Don\'t confuse with 叫 (jiào)\n• 让: more neutral, often permission\n• 叫: stronger, often order\n\n❌ 使 (shǐ) is a more formal/written equivalent',
      tips: '💡 让 sert aussi à céder la place\n• 请让一让 = Laissez passer, s\'il vous plaît\n• Utile dans le métro !\n\n💡 « 让…开心 / 难过 / 感动 »\n• Formule clé pour décrire un effet émotionnel\n• 让我开心 = ça me rend heureux',
      tipsEn: '💡 让 also means to yield\n• 请让一让 = Excuse me, let me through\n• Useful on the subway!\n\n💡 "让…happy / sad / moved"\n• Key formula for emotional effects\n• 让我开心 = it makes me happy',
      relatedGrammar: ['grammar-bei-passive']
    },
    audio: 'audio/grammar/rang-causative.wav',
    examples: [
      {
        hanzi: '老师让我们写作文',
        pinyin: 'lǎoshī ràng wǒmen xiě zuòwén',
        translation: 'The teacher has us write an essay',
        translationFr: 'Le professeur nous fait écrire une rédaction'
      },
      {
        hanzi: '这让我很失望',
        pinyin: 'zhè ràng wǒ hěn shīwàng',
        translation: 'This disappoints me',
        translationFr: 'Ça me déçoit beaucoup'
      },
      {
        hanzi: '让我帮你',
        pinyin: 'ràng wǒ bāng nǐ',
        translation: 'Let me help you',
        translationFr: 'Laisse-moi t\'aider'
      }
    ],
    quiz: {
      prompt: 'Traduisez : « Laisse-moi réfléchir »',
      choices: ['我想想', '让我想想', '被我想想', '把我想想'],
      correctChoiceIndex: 1
    },
    grammarQuiz: {
      type: 'sentence-reconstruction',
      words: ['老师', '让', '我', '回答', '问题'],
      translation: 'Le prof me fait répondre à la question',
      translationEn: 'The teacher has me answer the question',
      correctOrder: ['老师', '让', '我', '回答', '问题'],
      pinyin: 'lǎoshī ràng wǒ huídá wèntí'
    },
    tags: ['grammaire', 'hsk3', 'rang', 'causatif'],
    theme: 'grammar'
  },

  // ============================================
  // HSK3 — 一…就… (DÈS QUE)
  // ============================================
  {
    id: 'grammar-yi-jiu',
    level: 'hsk3',
    hanzi: '一…就…',
    pinyin: 'yī … jiù …',
    translation: 'As soon as… then…',
    translationFr: 'Dès que… aussitôt…',
    category: 'grammaire',
    explanation: 'La structure 一…就… relie deux actions successives très rapprochées : « dès que A, alors B ».',
    grammarExplanation: {
      whenToUse: 'Utilisez 一…就… pour :\n• Indiquer une succession immédiate\n• Décrire une habitude (A déclenche toujours B)\n• Remplacer « à peine… que… »',
      whenToUseEn: 'Use 一…就… to:\n• Indicate immediate succession\n• Describe a habit (A always triggers B)\n• Replace "as soon as…"',
      howToUse: 'Structure : **Sujet + 一 + Verbe1, (Sujet +) 就 + Verbe2**\n\nExemples :\n• 我一回家就吃饭 (wǒ yī huí jiā jiù chīfàn) = Dès que je rentre, je mange\n• 他一看书就睡觉 (tā yī kàn shū jiù shuìjiào) = Dès qu\'il lit, il s\'endort\n• 一下课，学生就走了 (yí xiàkè, xuéshēng jiù zǒu le) = Dès la fin du cours, les élèves sont partis',
      howToUseEn: 'Structure: **Subject + 一 + Verb1, (Subject +) 就 + Verb2**\n\nExamples:\n• 我一回家就吃饭 = As soon as I get home, I eat\n• 他一看书就睡觉 = As soon as he reads, he falls asleep\n• 一下课，学生就走了 = As soon as class ended, students left',
      commonMistakes: '❌ Les deux sujets peuvent être différents\n• 我一说，他就懂 = Dès que je parle, il comprend\n\n❌ Ne pas oublier 就\n• Incorrect : 我一回家吃饭 ❌\n• Correct : 我一回家就吃饭 ✅\n\n❌ Ne pas confondre avec 一直 (tout le temps)\n• 一…就… = dès que (succession)\n• 一直 = continuellement',
      commonMistakesEn: '❌ The two subjects can be different\n• 我一说，他就懂 = As soon as I speak, he understands\n\n❌ Don\'t forget 就\n• Incorrect: 我一回家吃饭 ❌\n• Correct: 我一回家就吃饭 ✅\n\n❌ Don\'t confuse with 一直 (all the time)\n• 一…就… = as soon as\n• 一直 = continuously',
      tips: '💡 Astuce mnémo\n• 一 = « un » (une seule fois/action)\n• 就 = « alors tout de suite »\n• Une action → tout de suite l\'autre\n\n💡 Marque souvent une réaction automatique\n• Très utile pour parler de ses habitudes',
      tipsEn: '💡 Memory trick\n• 一 = "one" (one action)\n• 就 = "then right away"\n• One action → immediately the other\n\n💡 Often marks an automatic reaction\n• Very useful for describing habits',
      relatedGrammar: ['grammar-conjunctions-complex']
    },
    audio: 'audio/grammar/yi-jiu.wav',
    examples: [
      {
        hanzi: '我一到公司就开会',
        pinyin: 'wǒ yī dào gōngsī jiù kāihuì',
        translation: 'As soon as I arrive at the office, I have a meeting',
        translationFr: 'Dès que j\'arrive au bureau, j\'ai une réunion'
      },
      {
        hanzi: '他一紧张就说错话',
        pinyin: 'tā yī jǐnzhāng jiù shuō cuò huà',
        translation: 'As soon as he gets nervous, he misspeaks',
        translationFr: 'Dès qu\'il est stressé, il dit des bêtises'
      },
      {
        hanzi: '一下雨，路就滑',
        pinyin: 'yí xiàyǔ, lù jiù huá',
        translation: 'As soon as it rains, the road gets slippery',
        translationFr: 'Dès qu\'il pleut, la route devient glissante'
      }
    ],
    quiz: {
      prompt: 'Quelle structure exprime « dès que… aussitôt… » ?',
      choices: ['如果…就…', '一…就…', '虽然…但是…', '因为…所以…'],
      correctChoiceIndex: 1
    },
    grammarQuiz: {
      type: 'fill-blank',
      sentence: '我 一 看电影 ___ 想吃爆米花',
      translation: 'Dès que je regarde un film, j\'ai envie de pop-corn',
      translationEn: 'As soon as I watch a movie, I want popcorn',
      choices: ['就', '才', '但', '所以'],
      correctChoice: '就',
      pinyin: 'wǒ yī kàn diànyǐng ___ xiǎng chī bàomǐhuā',
      explanation: 'La paire 一…就… demande toujours 就 dans la seconde partie'
    },
    tags: ['grammaire', 'hsk3', 'succession', 'corrélatif'],
    theme: 'grammar'
  },

  // ============================================
  // HSK3 — 越…越… (PLUS… PLUS…)
  // ============================================
  {
    id: 'grammar-yue-yue',
    level: 'hsk3',
    hanzi: '越…越…',
    pinyin: 'yuè … yuè …',
    translation: 'The more… the more…',
    translationFr: 'Plus… plus…',
    category: 'grammaire',
    explanation: 'La structure 越…越… exprime la progression conjointe de deux éléments : « plus A, plus B ».',
    grammarExplanation: {
      whenToUse: 'Utilisez 越…越… pour :\n• Lier deux changements qui évoluent ensemble\n• Exprimer une intensification\n• Décrire une tendance dans le temps avec 越来越',
      whenToUseEn: 'Use 越…越… to:\n• Link two changes that evolve together\n• Express intensification\n• Describe a trend over time with 越来越',
      howToUse: '**越 + Verbe/Adjectif1 + 越 + Verbe/Adjectif2**\n• 他越跑越快 = Plus il court, plus il va vite\n\n**越来越 + Adjectif** = « de plus en plus »\n• 天气越来越冷 = Il fait de plus en plus froid\n• 我的汉语越来越好 = Mon chinois s\'améliore',
      howToUseEn: '**越 + Verb/Adj1 + 越 + Verb/Adj2**\n• 他越跑越快 = The more he runs, the faster he goes\n\n**越来越 + Adjective** = "more and more"\n• 天气越来越冷 = Weather is getting colder\n• 我的汉语越来越好 = My Chinese is getting better',
      commonMistakes: '❌ Le sujet est souvent sous-entendu dans la 2e partie\n• 他越说越生气 = (Il) plus il parle, plus il s\'énerve\n\n❌ Ne pas mettre 很 avant l\'adjectif\n• Incorrect : 越来越很冷 ❌\n• Correct : 越来越冷 ✅\n\n❌ Attention à l\'ordre\n• 越 + action/état progressif en premier',
      commonMistakesEn: '❌ The subject is often implied in part 2\n• 他越说越生气 = (He) the more he speaks, the angrier he gets\n\n❌ Don\'t put 很 before the adjective\n• Incorrect: 越来越很冷 ❌\n• Correct: 越来越冷 ✅\n\n❌ Watch the order\n• 越 + progressive action/state first',
      tips: '💡 越来越 est ultra fréquent\n• Utilisable partout pour décrire une tendance\n• « de plus en plus » en un seul mot\n\n💡 越 = dépasser, franchir\n• Étymologiquement : chaque pas en dépasse un autre\n• D\'où l\'idée d\'intensification',
      tipsEn: '💡 越来越 is very common\n• Usable everywhere for trends\n• "more and more" in one word\n\n💡 越 = surpass, cross over\n• Etymologically: each step surpasses another\n• Hence the intensification',
      relatedGrammar: []
    },
    audio: 'audio/grammar/yue-yue.wav',
    examples: [
      {
        hanzi: '我越学越喜欢中文',
        pinyin: 'wǒ yuè xué yuè xǐhuan Zhōngwén',
        translation: 'The more I study, the more I love Chinese',
        translationFr: 'Plus j\'étudie, plus j\'aime le chinois'
      },
      {
        hanzi: '这个城市越来越漂亮',
        pinyin: 'zhège chéngshì yuèláiyuè piàoliang',
        translation: 'This city is getting more and more beautiful',
        translationFr: 'Cette ville devient de plus en plus belle'
      },
      {
        hanzi: '他越想越害怕',
        pinyin: 'tā yuè xiǎng yuè hàipà',
        translation: 'The more he thinks, the more scared he gets',
        translationFr: 'Plus il y pense, plus il a peur'
      }
    ],
    quiz: {
      prompt: 'Comment dire « de plus en plus chaud » ?',
      choices: ['很热', '越来越热', '太热了', '非常热'],
      correctChoiceIndex: 1
    },
    grammarQuiz: {
      type: 'sentence-reconstruction',
      words: ['我', '越', '学', '越', '喜欢'],
      translation: 'Plus j\'étudie, plus j\'aime',
      translationEn: 'The more I study, the more I like it',
      correctOrder: ['我', '越', '学', '越', '喜欢'],
      pinyin: 'wǒ yuè xué yuè xǐhuan'
    },
    tags: ['grammaire', 'hsk3', 'yue', 'progression'],
    theme: 'grammar'
  },

  // ============================================
  // HSK3 — 除了…(以外) (SAUF / EN PLUS DE)
  // ============================================
  {
    id: 'grammar-chule-yiwai',
    level: 'hsk3',
    hanzi: '除了…以外',
    pinyin: 'chúle … yǐwài',
    translation: 'Except / Besides',
    translationFr: 'Sauf / En plus de',
    category: 'grammaire',
    explanation: '除了…以外 a deux sens opposés selon le second mot : avec 还/也 = « en plus de », avec 都 = « sauf ».',
    grammarExplanation: {
      whenToUse: 'Utilisez 除了…以外 pour :\n• Ajouter (avec 还/也) = en plus de\n• Exclure (avec 都) = à part, sauf\n• 以外 est souvent omis',
      whenToUseEn: 'Use 除了…以外 to:\n• Add (with 还/也) = in addition to\n• Exclude (with 都) = except for\n• 以外 is often dropped',
      howToUse: '**除了A (以外), 还/也 B** = En plus de A, aussi B\n• 除了汉语，我还会英语 = En plus du chinois, je sais aussi l\'anglais\n\n**除了A (以外), 都 B** = Sauf A, tout le monde B\n• 除了他，我们都去了 = Sauf lui, nous sommes tous allés\n\n**除了A 不…** = Seul A ne…\n• 除了他，没人知道 = Seul lui sait',
      howToUseEn: '**除了A (以外), 还/也 B** = Besides A, also B\n• 除了汉语，我还会英语 = Besides Chinese, I also know English\n\n**除了A (以外), 都 B** = Except A, all B\n• 除了他，我们都去了 = Except him, we all went\n\n**除了A 不…** = Only A does not\n• 除了他，没人知道 = Only he knows',
      commonMistakes: '❌ Le sens dépend du deuxième connecteur !\n• 还/也 → addition\n• 都 → exclusion\n• Faute classique : inverser les deux\n\n❌ Mettre 都 après le sujet, pas avant\n• Correct : 除了他，我们都去 ✅\n• Incorrect : 除了他，都我们去 ❌\n\n❌ 以外 est facultatif en oral, plus formel à l\'écrit',
      commonMistakesEn: '❌ Meaning depends on the second connector!\n• 还/也 → addition\n• 都 → exclusion\n• Classic mistake: swapping them\n\n❌ Put 都 after the subject, not before\n• Correct: 除了他，我们都去 ✅\n• Incorrect: 除了他，都我们去 ❌\n\n❌ 以外 is optional in speech, more formal in writing',
      tips: '💡 Astuce « 还 = + / 都 = − »\n• 还/也 ajoute quelque chose\n• 都 exclut et généralise\n• Mémo : think "+ or −" après 除了\n\n💡 Variante formelle : 除了…之外\n• Même sens, ton plus soutenu',
      tipsEn: '💡 Trick "还 = + / 都 = −"\n• 还/也 adds something\n• 都 excludes and generalizes\n• Memo: think "+ or −" after 除了\n\n💡 Formal variant: 除了…之外\n• Same meaning, more polished tone',
      relatedGrammar: []
    },
    audio: 'audio/grammar/chule-yiwai.wav',
    examples: [
      {
        hanzi: '除了咖啡，我还喝茶',
        pinyin: 'chúle kāfēi, wǒ hái hē chá',
        translation: 'Besides coffee, I also drink tea',
        translationFr: 'En plus du café, je bois aussi du thé'
      },
      {
        hanzi: '除了他，我们都同意',
        pinyin: 'chúle tā, wǒmen dōu tóngyì',
        translation: 'Except for him, we all agree',
        translationFr: 'Sauf lui, nous sommes tous d\'accord'
      },
      {
        hanzi: '除了周末，他都工作',
        pinyin: 'chúle zhōumò, tā dōu gōngzuò',
        translation: 'Except for weekends, he works every day',
        translationFr: 'Sauf le week-end, il travaille tous les jours'
      }
    ],
    quiz: {
      prompt: '除了咖啡，我 ___ 喝茶 = « En plus du café, je bois aussi du thé »',
      choices: ['都', '还', '不', '要'],
      correctChoiceIndex: 1
    },
    grammarQuiz: {
      type: 'particle-choice',
      sentenceBefore: '除了他，我们 ',
      sentenceAfter: ' 去了',
      translation: 'Sauf lui, nous sommes tous allés',
      translationEn: 'Except for him, we all went',
      choices: ['还', '都', '也', '要'],
      correctChoice: '都',
      explanation: 'Avec 除了…, on utilise 都 pour l\'exclusion (= sauf)'
    },
    tags: ['grammaire', 'hsk3', 'chule', 'exclusion'],
    theme: 'grammar'
  },

  // ============================================
  // HSK3 — 连…都… (MÊME)
  // ============================================
  {
    id: 'grammar-lian-dou',
    level: 'hsk3',
    hanzi: '连…都…',
    pinyin: 'lián … dōu …',
    translation: 'Even…',
    translationFr: 'Même…',
    category: 'grammaire',
    explanation: 'La structure 连…都/也… met en relief un élément extrême : « même X », souvent pour souligner la surprise.',
    grammarExplanation: {
      whenToUse: 'Utilisez 连…都/也… pour :\n• Souligner un cas extrême ou inattendu\n• Exprimer la surprise, l\'indignation\n• Mettre en relief (équivalent de « même »)',
      whenToUseEn: 'Use 连…都/也… to:\n• Highlight an extreme or unexpected case\n• Express surprise or indignation\n• Emphasize (equivalent of "even")',
      howToUse: 'Structure : **连 + Élément mis en relief + 都/也 + (不/没) + Verbe**\n\nExemples :\n• 他连一句话都没说 (tā lián yī jù huà dōu méi shuō) = Il n\'a même pas dit un mot\n• 这个字连老师都不认识 (zhège zì lián lǎoshī dōu bú rènshi) = Même le prof ne connaît pas ce caractère\n• 我连中国菜都不敢吃 (wǒ lián Zhōngguó cài dōu bù gǎn chī) = Je n\'ose même pas manger de cuisine chinoise',
      howToUseEn: 'Structure: **连 + highlighted element + 都/也 + (不/没) + Verb**\n\nExamples:\n• 他连一句话都没说 = He didn\'t even say a word\n• 这个字连老师都不认识 = Even the teacher doesn\'t know this character\n• 我连中国菜都不敢吃 = I don\'t even dare eat Chinese food',
      commonMistakes: '❌ Ne pas oublier 都/也 après l\'élément\n• Incorrect : 他连一句话没说 ❌\n• Correct : 他连一句话都没说 ✅\n\n❌ Structure souvent négative\n• Très fréquent avec 不 ou 没\n• « pas même… »\n\n❌ Ne pas confondre 连 avec son sens de « relier »\n• 连 (relier) : 连接 = relier\n• 连…都 (même) : structure emphatique',
      commonMistakesEn: '❌ Don\'t forget 都/也 after the element\n• Incorrect: 他连一句话没说 ❌\n• Correct: 他连一句话都没说 ✅\n\n❌ Often negative structure\n• Very common with 不 or 没\n• "not even…"\n\n❌ Don\'t confuse 连 with its "connect" meaning\n• 连 (connect): 连接 = to link\n• 连…都 (even): emphatic structure',
      tips: '💡 Idéal pour l\'emphase émotionnelle\n• Surprise : « Même X !? »\n• Déception : « Il n\'a pas même… »\n\n💡 Variante positive possible\n• 他连跑步都很快 = Même en course, il est rapide\n• Moins fréquent mais valide',
      tipsEn: '💡 Perfect for emotional emphasis\n• Surprise: "Even X!?"\n• Disappointment: "He didn\'t even…"\n\n💡 Positive variant possible\n• 他连跑步都很快 = Even running, he\'s fast\n• Less common but valid',
      relatedGrammar: []
    },
    audio: 'audio/grammar/lian-dou.wav',
    examples: [
      {
        hanzi: '他连名字都没写',
        pinyin: 'tā lián míngzi dōu méi xiě',
        translation: 'He didn\'t even write his name',
        translationFr: 'Il n\'a même pas écrit son nom'
      },
      {
        hanzi: '这么简单的问题，连小孩子都会',
        pinyin: 'zhème jiǎndān de wèntí, lián xiǎoháizi dōu huì',
        translation: 'Even a child can solve such a simple problem',
        translationFr: 'Même un enfant sait résoudre une question aussi simple'
      },
      {
        hanzi: '我连一块钱也没有',
        pinyin: 'wǒ lián yí kuài qián yě méi yǒu',
        translation: 'I don\'t even have one yuan',
        translationFr: 'Je n\'ai même pas un yuan'
      }
    ],
    quiz: {
      prompt: 'Comment dire « Il n\'a même pas mangé » ?',
      choices: ['他没吃', '他连吃都没吃', '他都没吃', '他一点吃'],
      correctChoiceIndex: 1
    },
    grammarQuiz: {
      type: 'fill-blank',
      sentence: '他 连 名字 ___ 没写',
      translation: 'Il n\'a même pas écrit son nom',
      translationEn: 'He didn\'t even write his name',
      choices: ['都', '就', '才', '还'],
      correctChoice: '都',
      pinyin: 'tā lián míngzi ___ méi xiě',
      explanation: '连 se combine avec 都 (ou 也) pour l\'emphase « même »'
    },
    tags: ['grammaire', 'hsk3', 'lian', 'emphase'],
    theme: 'grammar'
  },

  // ============================================
  // HSK3 — 着 (ZHE) ASPECT CONTINU/DURATIF
  // ============================================
  {
    id: 'grammar-zhe-durative',
    level: 'hsk3',
    hanzi: '着',
    pinyin: 'zhe',
    translation: 'Durative aspect 着',
    translationFr: 'Aspect duratif 着',
    category: 'grammaire',
    explanation: '着 indique qu\'un état perdure ou qu\'une action se déroule en arrière-plan. Il se place après le verbe.',
    grammarExplanation: {
      whenToUse: 'Utilisez 着 pour :\n• Décrire un état qui dure (la porte est ouverte)\n• Marquer une action d\'arrière-plan (simultanée à une autre)\n• Dans les consignes : « garder X »',
      whenToUseEn: 'Use 着 to:\n• Describe a lasting state (the door is open)\n• Mark a background action (simultaneous to another)\n• In instructions: "keep X"',
      howToUse: 'Structure : **Verbe + 着 (+ Objet)**\n\n**État qui dure :**\n• 门开着 (mén kāi zhe) = La porte est ouverte\n• 他站着 (tā zhàn zhe) = Il est debout\n\n**Action de fond :**\n• 他听着音乐写作业 (tā tīng zhe yīnyuè xiě zuòyè) = Il fait ses devoirs en écoutant de la musique\n\n**Consigne :**\n• 拿着 (ná zhe) = Tiens ça ; garde-le',
      howToUseEn: 'Structure: **Verb + 着 (+ Object)**\n\n**Lasting state:**\n• 门开着 = The door is open\n• 他站着 = He is standing\n\n**Background action:**\n• 他听着音乐写作业 = He does homework while listening to music\n\n**Instruction:**\n• 拿着 = Hold it; keep it',
      commonMistakes: '❌ Ne pas confondre avec 正在 (progressif)\n• 正在 : action en train de se dérouler\n• 着 : état qui dure OU action d\'arrière-plan\n• 他正在吃饭 = Il est en train de manger\n• 他坐着吃饭 = Il mange (en étant) assis\n\n❌ Pas avec tous les verbes\n• Oui : 开, 关, 站, 坐, 拿, 挂, 写, 听, 看, 躺\n• Non : 吃, 喝 (actions ponctuelles)\n\n❌ Négation avec 没\n• 门没开着 = La porte n\'est pas ouverte',
      commonMistakesEn: '❌ Don\'t confuse with 正在 (progressive)\n• 正在: action in progress\n• 着: lasting state OR background action\n• 他正在吃饭 = He\'s eating right now\n• 他坐着吃饭 = He eats while sitting\n\n❌ Not with all verbs\n• Yes: 开, 关, 站, 坐, 拿, 挂, 写, 听, 看, 躺\n• No: 吃, 喝 (punctual actions)\n\n❌ Negation with 没\n• 门没开着 = The door is not open',
      tips: '💡 Deux verbes avec 着 = simultanéité\n• V1着 + V2 = faire V2 en V1-ant\n• 他笑着说话 = Il parle en souriant\n\n💡 着 est plus descriptif que dynamique\n• Pense « photo fixe » plutôt que « vidéo »\n• Idéal pour décrire une scène',
      tipsEn: '💡 Two verbs with 着 = simultaneity\n• V1着 + V2 = do V2 while V1-ing\n• 他笑着说话 = He speaks while smiling\n\n💡 着 is more descriptive than dynamic\n• Think "still photo" rather than "video"\n• Perfect for describing a scene',
      relatedGrammar: ['grammar-progressive', 'grammar-aspect-le']
    },
    audio: 'audio/grammar/zhe-durative.wav',
    examples: [
      {
        hanzi: '墙上挂着一幅画',
        pinyin: 'qiáng shàng guà zhe yì fú huà',
        translation: 'A painting hangs on the wall',
        translationFr: 'Un tableau est accroché au mur'
      },
      {
        hanzi: '他笑着对我说谢谢',
        pinyin: 'tā xiào zhe duì wǒ shuō xièxie',
        translation: 'He said thanks to me with a smile',
        translationFr: 'Il m\'a dit merci en souriant'
      },
      {
        hanzi: '她拿着一本书',
        pinyin: 'tā ná zhe yì běn shū',
        translation: 'She is holding a book',
        translationFr: 'Elle tient un livre'
      }
    ],
    quiz: {
      prompt: 'Quelle phrase décrit un ÉTAT qui dure ?',
      choices: ['我正在吃饭', '门开着', '我吃了饭', '我会吃饭'],
      correctChoiceIndex: 1
    },
    grammarQuiz: {
      type: 'fill-blank',
      sentence: '他 笑 ___ 对我说话',
      translation: 'Il me parle en souriant',
      translationEn: 'He talks to me while smiling',
      choices: ['着', '了', '过', '在'],
      correctChoice: '着',
      pinyin: 'tā xiào ___ duì wǒ shuōhuà',
      explanation: '着 marque une action simultanée ou un état qui dure'
    },
    tags: ['grammaire', 'hsk3', 'zhe', 'aspect'],
    theme: 'grammar'
  },

  // ============================================
  // HSK3 — 过 (GUO) ASPECT EXPÉRIENTIEL
  // ============================================
  {
    id: 'grammar-guo-experiential',
    level: 'hsk3',
    hanzi: '过',
    pinyin: 'guo',
    translation: 'Experiential aspect 过',
    translationFr: 'Aspect expérientiel 过',
    category: 'grammaire',
    explanation: '过 marque qu\'on a déjà fait quelque chose au moins une fois dans sa vie. C\'est l\'aspect de l\'expérience vécue.',
    grammarExplanation: {
      whenToUse: 'Utilisez 过 pour :\n• Parler d\'une expérience passée (déjà fait)\n• Dire qu\'on a/n\'a pas « jamais » fait X\n• Liste d\'expériences de vie',
      whenToUseEn: 'Use 过 to:\n• Talk about a past experience (already done)\n• Say you have/haven\'t "ever" done X\n• List life experiences',
      howToUse: 'Structure : **Verbe + 过 (+ Objet)**\n\n**Affirmatif :**\n• 我去过北京 (wǒ qù guo Běijīng) = J\'ai déjà été à Pékin\n\n**Négatif : 没 + V + 过**\n• 我没吃过饺子 (wǒ méi chī guo jiǎozi) = Je n\'ai jamais mangé de raviolis\n\n**Interrogatif : V + 过 + (Objet) + 吗 ?**\n• 你去过中国吗 ? = As-tu déjà été en Chine ?',
      howToUseEn: 'Structure: **Verb + 过 (+ Object)**\n\n**Affirmative:**\n• 我去过北京 = I\'ve been to Beijing\n\n**Negative: 没 + V + 过**\n• 我没吃过饺子 = I\'ve never eaten dumplings\n\n**Question: V + 过 + (Object) + 吗?**\n• 你去过中国吗? = Have you been to China?',
      commonMistakes: '❌ Ne pas confondre avec 了\n• 过 = jamais dans la vie (expérience)\n• 了 = action accomplie (souvent récente)\n• 我吃了 = J\'ai mangé (aujourd\'hui par ex.)\n• 我吃过 = J\'ai déjà mangé (dans ma vie)\n\n❌ Négation avec 没, pas 不\n• Incorrect : 我不去过 ❌\n• Correct : 我没去过 ✅\n\n❌ 过 est atone (neutral tone: guo)\n• Pas 过 (guò, quatrième ton) qui signifie « passer/traverser »',
      commonMistakesEn: '❌ Don\'t confuse with 了\n• 过 = ever in life (experience)\n• 了 = completed action (often recent)\n• 我吃了 = I ate (today etc.)\n• 我吃过 = I\'ve eaten (in my life)\n\n❌ Negate with 没, not 不\n• Incorrect: 我不去过 ❌\n• Correct: 我没去过 ✅\n\n❌ 过 is neutral tone (guo)\n• Not 过 (guò, 4th tone) which means "to pass"',
      tips: '💡 Structure parfaite pour les CV culturels\n• 你去过哪些国家？= Dans quels pays es-tu déjà allé ?\n• 你吃过什么菜？= Quels plats as-tu déjà goûtés ?\n\n💡 Combinable avec 从来 = jamais de la vie\n• 我从来没去过 = Je n\'y suis jamais allé',
      tipsEn: '💡 Perfect structure for cultural CVs\n• 你去过哪些国家？= Which countries have you been to?\n• 你吃过什么菜？= What dishes have you tried?\n\n💡 Combine with 从来 = never ever\n• 我从来没去过 = I\'ve never been there',
      relatedGrammar: ['grammar-aspect-le', 'grammar-zhe-durative']
    },
    audio: 'audio/grammar/guo-experiential.wav',
    examples: [
      {
        hanzi: '我去过中国',
        pinyin: 'wǒ qù guo Zhōngguó',
        translation: 'I have been to China',
        translationFr: 'J\'ai déjà été en Chine'
      },
      {
        hanzi: '你吃过北京烤鸭吗',
        pinyin: 'nǐ chī guo Běijīng kǎoyā ma',
        translation: 'Have you ever eaten Peking duck?',
        translationFr: 'As-tu déjà goûté au canard laqué ?'
      },
      {
        hanzi: '他从来没学过法语',
        pinyin: 'tā cónglái méi xué guo Fǎyǔ',
        translation: 'He has never studied French',
        translationFr: 'Il n\'a jamais étudié le français'
      }
    ],
    quiz: {
      prompt: 'Comment dire « Je n\'ai jamais mangé de tofu puant » ?',
      choices: ['我不吃臭豆腐', '我没吃过臭豆腐', '我吃了臭豆腐', '我要吃臭豆腐'],
      correctChoiceIndex: 1
    },
    grammarQuiz: {
      type: 'particle-choice',
      sentenceBefore: '我去 ',
      sentenceAfter: ' 北京',
      translation: 'J\'ai déjà été à Pékin',
      translationEn: 'I have been to Beijing',
      choices: ['了', '过', '在', '着'],
      correctChoice: '过',
      explanation: '过 marque l\'expérience (au moins une fois dans la vie)'
    },
    tags: ['grammaire', 'hsk3', 'guo', 'aspect'],
    theme: 'grammar'
  },

  // ============================================
  // HSK3 — 不但…而且… (NON SEULEMENT… MAIS AUSSI…)
  // ============================================
  {
    id: 'grammar-budan-erqie',
    level: 'hsk3',
    hanzi: '不但…而且…',
    pinyin: 'búdàn … érqiě …',
    translation: 'Not only… but also…',
    translationFr: 'Non seulement… mais aussi…',
    category: 'grammaire',
    explanation: '不但…而且… introduit une gradation : une première qualité ET une seconde, plus forte.',
    grammarExplanation: {
      whenToUse: 'Utilisez 不但…而且… pour :\n• Ajouter un second argument plus fort\n• Exprimer une gradation positive ou négative\n• Synonymes : 不仅…还…, 不只…也…',
      whenToUseEn: 'Use 不但…而且… to:\n• Add a stronger second argument\n• Express positive or negative gradation\n• Synonyms: 不仅…还…, 不只…也…',
      howToUse: 'Structure : **(Sujet) 不但 A, 而且 B**\n\n**Même sujet :**\n• 他不但会说汉语，而且会写汉字 = Non seulement il parle chinois, mais il écrit aussi les caractères\n\n**Sujets différents :**\n• 不但我喜欢，而且我的朋友也喜欢 = Non seulement moi j\'aime, mais mes amis aussi\n\n**Négatif intensifié :** 不但不…，而且…\n• 他不但不听，而且还生气了 = Non seulement il n\'écoute pas, mais en plus il s\'énerve',
      howToUseEn: 'Structure: **(Subject) 不但 A, 而且 B**\n\n**Same subject:**\n• 他不但会说汉语，而且会写汉字 = He not only speaks Chinese, but also writes characters\n\n**Different subjects:**\n• 不但我喜欢，而且我的朋友也喜欢 = Not only do I like it, but my friends too\n\n**Intensified negative:** 不但不…，而且…\n• 他不但不听，而且还生气了 = He not only doesn\'t listen, but gets angry too',
      commonMistakes: '❌ Attention à la position du sujet\n• Même sujet : après 不但 (le sujet se place avant)\n• Sujets différents : sujet après 不但 ET après 而且\n\n❌ 还/也 renforcent souvent 而且\n• 他不但聪明，而且也很努力 ✅\n\n❌ Ne pas traduire littéralement « mais »\n• 而且 ≠ 但是 : pas d\'opposition, c\'est une addition',
      commonMistakesEn: '❌ Watch subject position\n• Same subject: after 不但 (subject goes first)\n• Different subjects: subject after 不但 AND after 而且\n\n❌ 还/也 often reinforce 而且\n• 他不但聪明，而且也很努力 ✅\n\n❌ Don\'t translate as "but"\n• 而且 ≠ 但是: no opposition, it\'s addition',
      tips: '💡 Version orale plus légère : 不仅…还…\n• 她不仅漂亮，还很聪明\n• Parfait pour décrire quelqu\'un\n\n💡 Astuce « escalier »\n• Pense A → B où B monte d\'un cran\n• Toujours positif/négatif dans la même direction',
      tipsEn: '💡 Lighter oral version: 不仅…还…\n• 她不仅漂亮，还很聪明\n• Perfect for describing someone\n\n💡 "Staircase" trick\n• Think A → B where B goes up a step\n• Always in the same direction',
      relatedGrammar: ['grammar-conjunctions-complex']
    },
    audio: 'audio/grammar/budan-erqie.wav',
    examples: [
      {
        hanzi: '她不但漂亮，而且很聪明',
        pinyin: 'tā búdàn piàoliang, érqiě hěn cōngmíng',
        translation: 'She is not only pretty, but also smart',
        translationFr: 'Non seulement elle est belle, mais en plus elle est intelligente'
      },
      {
        hanzi: '这家餐厅不但便宜，而且好吃',
        pinyin: 'zhè jiā cāntīng búdàn piányi, érqiě hǎochī',
        translation: 'This restaurant is not only cheap, but also delicious',
        translationFr: 'Ce resto n\'est pas seulement pas cher, mais en plus c\'est bon'
      },
      {
        hanzi: '他不但不道歉，而且还骂人',
        pinyin: 'tā búdàn bú dàoqiàn, érqiě hái mà rén',
        translation: 'He not only doesn\'t apologize, he insults people',
        translationFr: 'Non seulement il ne s\'excuse pas, mais en plus il insulte'
      }
    ],
    quiz: {
      prompt: 'Quelle paire exprime « non seulement… mais aussi… » ?',
      choices: ['虽然…但是…', '不但…而且…', '因为…所以…', '如果…就…'],
      correctChoiceIndex: 1
    },
    grammarQuiz: {
      type: 'fill-blank',
      sentence: '她 不但 漂亮， ___ 很 聪明',
      translation: 'Non seulement elle est belle, mais aussi intelligente',
      translationEn: 'She is not only pretty, but also smart',
      choices: ['但是', '而且', '所以', '就'],
      correctChoice: '而且',
      pinyin: 'tā búdàn piàoliang, ___ hěn cōngmíng',
      explanation: '不但…而且… forme une paire corrélative d\'addition croissante'
    },
    tags: ['grammaire', 'hsk3', 'budan', 'addition'],
    theme: 'grammar'
  },

  // ============================================
  // HSK3 — 就 vs 才 (TÔT VS TARD)
  // ============================================
  {
    id: 'grammar-jiu-cai',
    level: 'hsk3',
    hanzi: '就 vs 才',
    pinyin: 'jiù vs cái',
    translation: '就 (early/fast) vs 才 (late/slow)',
    translationFr: '就 (tôt/vite) vs 才 (tard/lentement)',
    category: 'grammaire',
    explanation: '就 et 才 expriment tous deux un timing, mais avec des connotations opposées : 就 = plus tôt que prévu, 才 = plus tard que prévu.',
    grammarExplanation: {
      whenToUse: 'Utilisez **就** pour :\n• Action arrivée plus tôt / plus vite\n• Suggérer facilité ou rapidité\n• Connotation « déjà », « tout de suite »\n\nUtilisez **才** pour :\n• Action arrivée plus tard / plus lentement\n• Suggérer retard, difficulté, surprise\n• Connotation « seulement », « pas avant »',
      whenToUseEn: 'Use **就** for:\n• Action happened earlier / faster\n• Suggest ease or speed\n• Connotation "already", "right away"\n\nUse **才** for:\n• Action happened later / more slowly\n• Suggest delay, difficulty, surprise\n• Connotation "only", "not before"',
      howToUse: '**就** (plus tôt que prévu) :\n• 他七点就到了 (tā qī diǎn jiù dào le) = Il est arrivé dès 7h\n• 我一说他就懂了 = Dès que je parle, il comprend\n\n**才** (plus tard que prévu) :\n• 他十点才到 (tā shí diǎn cái dào) = Il n\'est arrivé qu\'à 10h\n• 我说了三次他才懂 = Il a compris seulement après trois répétitions',
      howToUseEn: '**就** (earlier than expected):\n• 他七点就到了 = He arrived by 7 AM\n• 我一说他就懂了 = As soon as I speak, he gets it\n\n**才** (later than expected):\n• 他十点才到 = He didn\'t arrive until 10\n• 我说了三次他才懂 = He only got it after I said it three times',
      commonMistakes: '❌ Confusion fréquente : c\'est la perspective du locuteur qui compte\n• Même heure, connotation différente :\n• 八点就来 = venu dès 8h (tôt)\n• 八点才来 = pas venu avant 8h (tard)\n\n❌ 就 s\'emploie avec 了 en général\n• 就…了 = déjà fait, accompli\n• 才 ne s\'emploie PAS avec 了 (mal ressenti)\n\n❌ Ne pas confondre 就 (temps) avec 就 (alors)\n• 如果…就 : « alors » (conséquence)\n• 就 seul + temps : « déjà / seulement »',
      commonMistakesEn: '❌ Frequent confusion: speaker\'s perspective matters\n• Same time, different connotation:\n• 八点就来 = arrived by 8 (early)\n• 八点才来 = not arrived until 8 (late)\n\n❌ 就 usually takes 了\n• 就…了 = already done\n• 才 does NOT take 了 (feels wrong)\n\n❌ Don\'t confuse 就 (time) with 就 (then)\n• 如果…就: "then" (consequence)\n• Standalone 就 + time: "already / only"',
      tips: '💡 Mémo de position\n• 就 = action rapide, pas de marche d\'escalier\n• 才 = action lente, marche après marche\n\n💡 Test rapide\n• Si tu trouves que c\'est « tôt/rapide/facile » → 就\n• Si tu trouves que c\'est « tard/lent/difficile » → 才',
      tipsEn: '💡 Position memo\n• 就 = fast action, no staircase\n• 才 = slow action, step by step\n\n💡 Quick test\n• If you feel "early/fast/easy" → 就\n• If you feel "late/slow/hard" → 才',
      relatedGrammar: ['grammar-yi-jiu']
    },
    audio: 'audio/grammar/jiu-vs-cai.wav',
    examples: [
      {
        hanzi: '他六点就起床了',
        pinyin: 'tā liù diǎn jiù qǐchuáng le',
        translation: 'He was up by 6 AM',
        translationFr: 'Il était déjà levé à 6h'
      },
      {
        hanzi: '他十一点才起床',
        pinyin: 'tā shíyī diǎn cái qǐchuáng',
        translation: 'He only got up at 11',
        translationFr: 'Il ne s\'est levé qu\'à 11h'
      },
      {
        hanzi: '我学了三个月就能说汉语',
        pinyin: 'wǒ xué le sān gè yuè jiù néng shuō Hànyǔ',
        translation: 'After just 3 months of study, I can speak Chinese',
        translationFr: 'Après seulement 3 mois d\'étude, je parle chinois'
      }
    ],
    quiz: {
      prompt: 'Pour insister sur « il n\'est arrivé qu\'à 10h (tard) » :',
      choices: ['他十点就到了', '他十点才到', '他十点要到', '他十点不到'],
      correctChoiceIndex: 1
    },
    grammarQuiz: {
      type: 'particle-choice',
      sentenceBefore: '他 七 点 ',
      sentenceAfter: ' 到 了',
      translation: 'Il est arrivé dès 7 h (plus tôt que prévu)',
      translationEn: 'He arrived by 7 (earlier than expected)',
      choices: ['就', '才', '还', '都'],
      correctChoice: '就',
      explanation: '就 + 了 exprime « dès », « déjà » (plus tôt que prévu)'
    },
    tags: ['grammaire', 'hsk3', 'jiu', 'cai', 'temps'],
    theme: 'grammar'
  },

  // ============================================
  // HSK4 — 竟然 (ÉTONNAMMENT)
  // ============================================
  {
    id: 'grammar-jingran-surprise',
    level: 'hsk4',
    hanzi: '竟然',
    pinyin: 'jìngrán',
    translation: 'Surprisingly / unexpectedly',
    translationFr: 'Étonnamment / à la grande surprise de',
    category: 'grammaire',
    explanation: '竟然 exprime la surprise du locuteur face à un événement imprévu. Se place généralement après le sujet, avant le verbe.',
    grammarExplanation: {
      whenToUse: 'Utilisez 竟然 pour :\n• Exprimer l\'étonnement face à un résultat inattendu\n• Marquer que quelque chose dépasse nos attentes\n• Traduction : « figure-toi que », « à ma grande surprise »',
      whenToUseEn: 'Use 竟然 to:\n• Express surprise at an unexpected result\n• Mark that something exceeds expectations\n• Translation: "surprisingly", "to my surprise"',
      howToUse: 'Structure : **Sujet + 竟然 + Verbe/Adjectif**\n\nExemples :\n• 他竟然来了 (tā jìngrán lái le) = Figure-toi qu\'il est venu !\n• 这个孩子竟然会说五种语言 = Cet enfant parle cinq langues !\n• 考试竟然不难 = Étonnamment, l\'examen n\'était pas dur',
      howToUseEn: 'Structure: **Subject + 竟然 + Verb/Adjective**\n\nExamples:\n• 他竟然来了 = Surprisingly he came!\n• 这个孩子竟然会说五种语言 = This kid speaks five languages!\n• 考试竟然不难 = Surprisingly, the test wasn\'t hard',
      commonMistakes: '❌ Ne pas placer 竟然 en début de phrase\n• Incorrect : 竟然他来了 ❌\n• Correct : 他竟然来了 ✅\n\n❌ Synonyme : 居然 (jūrán)\n• Quasi-identiques, 居然 est plus écrit\n\n❌ Pas pour des événements ordinaires\n• Il faut un vrai effet de surprise',
      commonMistakesEn: '❌ Don\'t place 竟然 at sentence start\n• Incorrect: 竟然他来了 ❌\n• Correct: 他竟然来了 ✅\n\n❌ Synonym: 居然 (jūrán)\n• Near-identical, 居然 is more written\n\n❌ Not for ordinary events\n• Must be genuinely surprising',
      tips: '💡 Mot vedette des ragots et des anecdotes\n• Parfait pour raconter une histoire étonnante\n• Très utilisé à l\'oral\n\n💡 Ton émotionnel positif ou négatif\n• 他竟然考了满分！= Incroyable, il a eu 20/20 !\n• 他竟然骗我 = Figure-toi qu\'il m\'a menti !',
      tipsEn: '💡 Star word for gossip and stories\n• Perfect for surprising tales\n• Very common in speech\n\n💡 Positive or negative emotional tone\n• 他竟然考了满分！= Incredible, he got 100!\n• 他竟然骗我 = Can you believe he lied!',
      relatedGrammar: []
    },
    audio: 'audio/grammar/jingran.wav',
    examples: [
      {
        hanzi: '他竟然忘了我的名字',
        pinyin: 'tā jìngrán wàng le wǒ de míngzi',
        translation: 'He surprisingly forgot my name',
        translationFr: 'Figure-toi qu\'il a oublié mon nom'
      },
      {
        hanzi: '这本书竟然这么贵',
        pinyin: 'zhè běn shū jìngrán zhème guì',
        translation: 'This book is surprisingly this expensive',
        translationFr: 'Incroyable comme ce livre est cher'
      },
      {
        hanzi: '你竟然还不知道',
        pinyin: 'nǐ jìngrán hái bù zhīdào',
        translation: 'You surprisingly still don\'t know',
        translationFr: 'Comment, tu ne sais toujours pas ?'
      }
    ],
    quiz: {
      prompt: 'Pour exprimer l\'étonnement :',
      choices: ['他来了', '他竟然来了', '他要来了', '他就来了'],
      correctChoiceIndex: 1
    },
    grammarQuiz: {
      type: 'fill-blank',
      sentence: '他 ___ 忘 了 我 的 生日',
      translation: 'Figure-toi qu\'il a oublié mon anniversaire',
      translationEn: 'He surprisingly forgot my birthday',
      choices: ['竟然', '应该', '一定', '已经'],
      correctChoice: '竟然',
      pinyin: 'tā ___ wàng le wǒ de shēngrì',
      explanation: '竟然 marque la surprise du locuteur'
    },
    tags: ['grammaire', 'hsk4', 'jingran', 'surprise'],
    theme: 'grammar'
  },

  // ============================================
  // HSK4 — 反而 (AU CONTRAIRE)
  // ============================================
  {
    id: 'grammar-faner-opposite',
    level: 'hsk4',
    hanzi: '反而',
    pinyin: 'fǎn\'ér',
    translation: 'On the contrary / instead',
    translationFr: 'Au contraire / plutôt',
    category: 'grammaire',
    explanation: '反而 introduit un résultat opposé à ce qu\'on attendait. Plus marqué qu\'un simple 但是.',
    grammarExplanation: {
      whenToUse: 'Utilisez 反而 pour :\n• Signaler un résultat inverse de l\'attendu\n• Contredire une logique ou une attente\n• Souvent après une situation normale / une cause',
      whenToUseEn: 'Use 反而 to:\n• Signal a result opposite to what was expected\n• Contradict logic or expectation\n• Often after a normal situation / cause',
      howToUse: 'Structure : **Situation, 反而 + Verbe/Adjectif**\n\nExemples :\n• 他越紧张，反而越说错 = Plus il est stressé, plus il se trompe\n• 吃了药，反而更不舒服 = J\'ai pris le médicament, et je me sens encore moins bien\n• 下雨了，反而凉快 = Il pleut, et du coup il fait plus frais (inattendu)',
      howToUseEn: 'Structure: **Situation, 反而 + Verb/Adjective**\n\nExamples:\n• 他越紧张，反而越说错 = The more nervous he is, the more he misspeaks\n• 吃了药，反而更不舒服 = I took the medicine, but I feel worse\n• 下雨了，反而凉快 = It\'s raining, and (unexpectedly) it\'s cooler',
      commonMistakes: '❌ Ne pas confondre avec 但是\n• 但是 : opposition simple\n• 反而 : opposition inverse de l\'attendu\n\n❌ Place : APRÈS le sujet, AVANT le verbe\n• Incorrect : 反而我更累 ❌\n• Correct : 我反而更累 ✅\n\n❌ Souvent combiné avec 越…越…\n• 越努力，反而越差 = Plus j\'essaie, pire c\'est',
      commonMistakesEn: '❌ Don\'t confuse with 但是\n• 但是: simple opposition\n• 反而: inverted opposition from expectation\n\n❌ Position: AFTER subject, BEFORE verb\n• Incorrect: 反而我更累 ❌\n• Correct: 我反而更累 ✅\n\n❌ Often combined with 越…越…\n• 越努力，反而越差 = The more I try, the worse',
      tips: '💡 Marqueur d\'ironie de situation\n• Parfait pour exprimer un paradoxe\n• Très présent dans les récits\n\n💡 Pair fréquent : 不但不… 反而…\n• « Non seulement pas…, mais au contraire… »\n• 不但不道歉，反而生气 = Non seulement il ne s\'excuse pas, mais en plus il se fâche',
      tipsEn: '💡 Situational irony marker\n• Perfect for expressing paradox\n• Very common in narratives\n\n💡 Common pair: 不但不… 反而…\n• "Not only not…, but instead…"\n• 不但不道歉，反而生气 = Not only doesn\'t apologize, but gets angry',
      relatedGrammar: ['grammar-conjunctions-complex']
    },
    audio: 'audio/grammar/faner.wav',
    examples: [
      {
        hanzi: '天气变冷了，我反而更精神',
        pinyin: 'tiānqì biàn lěng le, wǒ fǎn\'ér gèng jīngshen',
        translation: 'The weather got colder, but I\'m more energetic',
        translationFr: 'Le temps s\'est refroidi, mais du coup j\'ai plus d\'énergie'
      },
      {
        hanzi: '吃少了反而长胖了',
        pinyin: 'chī shǎo le fǎn\'ér zhǎngpàng le',
        translation: 'I ate less but gained weight',
        translationFr: 'J\'ai moins mangé mais j\'ai grossi'
      },
      {
        hanzi: '他不但不生气，反而笑了',
        pinyin: 'tā búdàn bù shēngqì, fǎn\'ér xiào le',
        translation: 'Not only was he not angry, he even laughed',
        translationFr: 'Non seulement il ne s\'est pas fâché, mais en plus il a ri'
      }
    ],
    quiz: {
      prompt: 'Quel connecteur marque un résultat opposé à l\'attendu ?',
      choices: ['但是', '反而', '而且', '所以'],
      correctChoiceIndex: 1
    },
    grammarQuiz: {
      type: 'fill-blank',
      sentence: '吃 了 药， ___ 更 不 舒服',
      translation: 'J\'ai pris le médicament, et je me sens pire',
      translationEn: 'I took the medicine, and I feel worse',
      choices: ['但是', '反而', '所以', '而且'],
      correctChoice: '反而',
      pinyin: 'chī le yào, ___ gèng bù shūfu',
      explanation: '反而 marque le résultat inverse de l\'attendu'
    },
    tags: ['grammaire', 'hsk4', 'faner', 'opposition'],
    theme: 'grammar'
  },

  // ============================================
  // HSK4 — 无论…都… (PEU IMPORTE)
  // ============================================
  {
    id: 'grammar-wulun-dou',
    level: 'hsk4',
    hanzi: '无论…都…',
    pinyin: 'wúlùn … dōu …',
    translation: 'No matter… always…',
    translationFr: 'Peu importe… toujours…',
    category: 'grammaire',
    explanation: '无论…都… exprime que le résultat est le même quelle que soit la condition. Équivalent de « peu importe, quel que soit ».',
    grammarExplanation: {
      whenToUse: 'Utilisez 无论…都… pour :\n• Affirmer qu\'une action se produit dans tous les cas\n• Balayer plusieurs conditions\n• Souvent avec mots interrogatifs : 什么, 谁, 怎么, 哪里',
      whenToUseEn: 'Use 无论…都… to:\n• Affirm an action happens in all cases\n• Sweep through multiple conditions\n• Often with question words: 什么, 谁, 怎么, 哪里',
      howToUse: 'Structure : **无论 + Alternative / Mot interrogatif, (Sujet) + 都 + Verbe**\n\nExemples :\n• 无论下雨下雪，我都去 (wúlùn xiàyǔ xiàxuě, wǒ dōu qù) = Qu\'il pleuve ou qu\'il neige, j\'y vais\n• 无论谁来，我都欢迎 = Peu importe qui vient, je l\'accueille\n• 无论多难，她都不放弃 = Aussi dur que ce soit, elle n\'abandonne pas',
      howToUseEn: 'Structure: **无论 + Alternative / Question Word, (Subject) + 都 + Verb**\n\nExamples:\n• 无论下雨下雪，我都去 = Rain or snow, I\'m going\n• 无论谁来，我都欢迎 = Whoever comes, I welcome them\n• 无论多难，她都不放弃 = However hard, she doesn\'t give up',
      commonMistakes: '❌ Synonymes : 不管 (plus oral), 不论 (plus soutenu)\n• 不管 est le plus fréquent à l\'oral\n• Même structure : 不管…都…\n\n❌ Ne pas oublier 都 ou 也 après\n• Incorrect : 无论谁来，我欢迎 ❌\n• Correct : 无论谁来，我都欢迎 ✅\n\n❌ Pas avec des conditions définies\n• 无论 exige plusieurs alternatives ou un mot interrogatif',
      commonMistakesEn: '❌ Synonyms: 不管 (more oral), 不论 (more formal)\n• 不管 is most common in speech\n• Same structure: 不管…都…\n\n❌ Don\'t forget 都 or 也 after\n• Incorrect: 无论谁来，我欢迎 ❌\n• Correct: 无论谁来，我都欢迎 ✅\n\n❌ Not with definite conditions\n• 无论 needs multiple alternatives or a question word',
      tips: '💡 Pattern ultra fréquent avec 什么\n• 无论什么时候 = quand que ce soit\n• 无论什么情况 = quelle que soit la situation\n\n💡 Astuce contrastive\n• 如果…就… : si (une seule condition)\n• 无论…都… : peu importe (toutes les conditions)',
      tipsEn: '💡 Very common pattern with 什么\n• 无论什么时候 = whenever\n• 无论什么情况 = whatever the situation\n\n💡 Contrastive tip\n• 如果…就…: if (one condition)\n• 无论…都…: no matter (all conditions)',
      relatedGrammar: ['grammar-conjunctions-complex']
    },
    audio: 'audio/grammar/wulun-dou.wav',
    examples: [
      {
        hanzi: '无论什么时候，你都可以打电话',
        pinyin: 'wúlùn shénme shíhou, nǐ dōu kěyǐ dǎ diànhuà',
        translation: 'Whenever it is, you can call me',
        translationFr: 'Peu importe l\'heure, tu peux appeler'
      },
      {
        hanzi: '无论谁问，都不要告诉',
        pinyin: 'wúlùn shéi wèn, dōu bú yào gàosu',
        translation: 'No matter who asks, don\'t tell',
        translationFr: 'Peu importe qui demande, ne dis rien'
      },
      {
        hanzi: '无论多累，我也要完成',
        pinyin: 'wúlùn duō lèi, wǒ yě yào wánchéng',
        translation: 'No matter how tired, I will finish',
        translationFr: 'Aussi fatigué que je sois, je finirai'
      }
    ],
    quiz: {
      prompt: 'Quelle structure exprime « peu importe » ?',
      choices: ['虽然…但是…', '无论…都…', '因为…所以…', '一…就…'],
      correctChoiceIndex: 1
    },
    grammarQuiz: {
      type: 'particle-choice',
      sentenceBefore: '无 论 谁 问， 我 ',
      sentenceAfter: ' 不 说',
      translation: 'Peu importe qui demande, je ne dis rien',
      translationEn: 'No matter who asks, I don\'t speak',
      choices: ['都', '就', '才', '要'],
      correctChoice: '都',
      explanation: '无论 se combine obligatoirement avec 都 (ou 也)'
    },
    tags: ['grammaire', 'hsk4', 'wulun', 'inconditionnel'],
    theme: 'grammar'
  },

  // ============================================
  // HSK4 — 要是…就… (SI, FAMILIER)
  // ============================================
  {
    id: 'grammar-yaoshi-jiu',
    level: 'hsk4',
    hanzi: '要是…就…',
    pinyin: 'yàoshi … jiù …',
    translation: 'If… then… (colloquial)',
    translationFr: 'Si… alors… (familier)',
    category: 'grammaire',
    explanation: '要是…就… est la version orale de 如果…就… Plus familière, idéale pour parler naturellement.',
    grammarExplanation: {
      whenToUse: 'Utilisez 要是…就… pour :\n• Exprimer une condition orale\n• Suggérer un scénario hypothétique\n• Remplacer 如果 dans un contexte familier',
      whenToUseEn: 'Use 要是…就… to:\n• Express an oral condition\n• Suggest a hypothetical scenario\n• Replace 如果 in casual context',
      howToUse: 'Structure : **要是 + Condition, (Sujet) + 就 + Résultat**\n\nOn peut ajouter 的话 en fin de condition (ton plus naturel).\n\nExemples :\n• 要是你有时间，就来看我 = Si tu as du temps, viens me voir\n• 要是下雨的话，我们就取消 = S\'il pleut, on annule\n• 要是不饿，就别吃 = Si tu n\'as pas faim, ne mange pas',
      howToUseEn: 'Structure: **要是 + Condition, (Subject) + 就 + Result**\n\nYou can add 的话 at the condition\'s end (more natural tone).\n\nExamples:\n• 要是你有时间，就来看我 = If you have time, come see me\n• 要是下雨的话，我们就取消 = If it rains, we cancel\n• 要是不饿，就别吃 = If not hungry, don\'t eat',
      commonMistakes: '❌ Registre : 要是 = familier, 如果 = neutre, 假如 = littéraire\n• Choisir selon le contexte\n\n❌ Ne pas oublier 就\n• 就 rend la conséquence naturelle\n\n❌ 要是 n\'est pas le verbe 要 + 是 !\n• C\'est une conjonction autonome',
      commonMistakesEn: '❌ Register: 要是 = casual, 如果 = neutral, 假如 = literary\n• Pick per context\n\n❌ Don\'t forget 就\n• 就 makes the consequence natural\n\n❌ 要是 isn\'t the verb 要 + 是!\n• It\'s a standalone conjunction',
      tips: '💡 的话 est ton ami\n• 要是…的话 = si…\n• Sonne très naturel en dialogue\n\n💡 Combinaison avec 就 vs 也\n• 就 : conséquence directe\n• 也 : même alternative (« aussi »)',
      tipsEn: '💡 的话 is your friend\n• 要是…的话 = if…\n• Sounds natural in dialogue\n\n💡 Combining with 就 vs 也\n• 就: direct consequence\n• 也: alternative (also)',
      relatedGrammar: ['grammar-conjunctions-complex']
    },
    audio: 'audio/grammar/yaoshi-jiu.wav',
    examples: [
      {
        hanzi: '要是你来，我就高兴',
        pinyin: 'yàoshi nǐ lái, wǒ jiù gāoxìng',
        translation: 'If you come, I\'ll be happy',
        translationFr: 'Si tu viens, je serai content'
      },
      {
        hanzi: '要是我有钱的话，就买房子',
        pinyin: 'yàoshi wǒ yǒu qián de huà, jiù mǎi fángzi',
        translation: 'If I had money, I\'d buy a house',
        translationFr: 'Si j\'avais de l\'argent, j\'achèterais une maison'
      },
      {
        hanzi: '要是明天不下雨，就去公园',
        pinyin: 'yàoshi míngtiān bú xiàyǔ, jiù qù gōngyuán',
        translation: 'If it doesn\'t rain tomorrow, let\'s go to the park',
        translationFr: 'S\'il ne pleut pas demain, on va au parc'
      }
    ],
    quiz: {
      prompt: 'Version la plus familière de « Si tu as le temps, viens » :',
      choices: ['假如你有时间，就来', '要是你有时间，就来', '如果你有时间，就来', '既然你有时间，就来'],
      correctChoiceIndex: 1
    },
    grammarQuiz: {
      type: 'sentence-reconstruction',
      words: ['要是', '下雨', '我', '就', '不', '去'],
      translation: 'S\'il pleut, je n\'y vais pas',
      translationEn: 'If it rains, I\'m not going',
      correctOrder: ['要是', '下雨', '我', '就', '不', '去'],
      pinyin: 'yàoshi xiàyǔ, wǒ jiù bú qù'
    },
    tags: ['grammaire', 'hsk4', 'yaoshi', 'condition'],
    theme: 'grammar'
  },

  // ============================================
  // HSK4 — 尽管 (BIEN QUE, FORMEL)
  // ============================================
  {
    id: 'grammar-jinguan-although',
    level: 'hsk4',
    hanzi: '尽管',
    pinyin: 'jǐnguǎn',
    translation: 'Although / even though',
    translationFr: 'Bien que / quoique',
    category: 'grammaire',
    explanation: '尽管 est l\'équivalent plus formel de 虽然. Il introduit une concession, souvent appariée avec 但是 ou 还是.',
    grammarExplanation: {
      whenToUse: 'Utilisez 尽管 pour :\n• Exprimer une concession (admettre un fait)\n• Contraste formel à l\'écrit\n• Registre soutenu',
      whenToUseEn: 'Use 尽管 to:\n• Express a concession (admit a fact)\n• Formal written contrast\n• Elevated register',
      howToUse: 'Structure : **尽管 A, 但是/还是 B**\n\nExemples :\n• 尽管很累，他还是坚持 = Bien que fatigué, il persévère\n• 尽管下雨，比赛还是进行 = Malgré la pluie, le match continue\n• 尽管有困难，我们也要前进 = Malgré les difficultés, avançons',
      howToUseEn: 'Structure: **尽管 A, 但是/还是 B**\n\nExamples:\n• 尽管很累，他还是坚持 = Although tired, he persists\n• 尽管下雨，比赛还是进行 = Despite the rain, the match continues\n• 尽管有困难，我们也要前进 = Despite difficulties, we press on',
      commonMistakes: '❌ 尽管 vs 虽然\n• Sens identiques\n• 尽管 plus formel, 虽然 plus neutre/oral\n\n❌ Signification « n\'hésitez pas »\n• 尽管 a une seconde valeur : encouragement\n• 有问题尽管问 = N\'hésitez pas à demander\n• Attention au contexte !\n\n❌ Ne pas confondre avec 不管\n• 不管 (peu importe) ≠ 尽管 (bien que)',
      commonMistakesEn: '❌ 尽管 vs 虽然\n• Same meaning\n• 尽管 more formal, 虽然 more neutral/oral\n\n❌ Second meaning "feel free"\n• 尽管 also means encouragement\n• 有问题尽管问 = Feel free to ask\n• Context-sensitive!\n\n❌ Don\'t confuse with 不管\n• 不管 (no matter) ≠ 尽管 (although)',
      tips: '💡 尽管 + 还是 = version douce\n• Moins contrastif que 虽然…但是…\n• Idéal à l\'écrit professionnel\n\n💡 Formule d\'encouragement\n• 尽管说 = parle sans gêne\n• 尽管用 = sers-toi sans problème',
      tipsEn: '💡 尽管 + 还是 = softer version\n• Less contrastive than 虽然…但是…\n• Perfect for professional writing\n\n💡 Encouragement formula\n• 尽管说 = speak freely\n• 尽管用 = help yourself',
      relatedGrammar: ['grammar-conjunctions-complex']
    },
    audio: 'audio/grammar/jinguan.wav',
    examples: [
      {
        hanzi: '尽管很忙，他还是来帮我',
        pinyin: 'jǐnguǎn hěn máng, tā háishi lái bāng wǒ',
        translation: 'Although busy, he still came to help',
        translationFr: 'Bien qu\'occupé, il est venu m\'aider'
      },
      {
        hanzi: '尽管年纪大，他还在工作',
        pinyin: 'jǐnguǎn niánjì dà, tā hái zài gōngzuò',
        translation: 'Despite his age, he is still working',
        translationFr: 'Malgré son âge, il travaille encore'
      },
      {
        hanzi: '有问题尽管问我',
        pinyin: 'yǒu wèntí jǐnguǎn wèn wǒ',
        translation: 'Feel free to ask me any question',
        translationFr: 'N\'hésitez pas à me demander'
      }
    ],
    quiz: {
      prompt: 'Quelle phrase signifie « N\'hésitez pas à demander » ?',
      choices: ['不要问我', '有问题尽管问', '一定要问', '别问'],
      correctChoiceIndex: 1
    },
    grammarQuiz: {
      type: 'fill-blank',
      sentence: '___ 很 累， 他 还是 坚持',
      translation: 'Bien qu\'il soit très fatigué, il persévère',
      translationEn: 'Although very tired, he persists',
      choices: ['如果', '尽管', '因为', '无论'],
      correctChoice: '尽管',
      pinyin: '___ hěn lèi, tā háishi jiānchí',
      explanation: '尽管 exprime la concession (version formelle de 虽然)'
    },
    tags: ['grammaire', 'hsk4', 'jinguan', 'concession'],
    theme: 'grammar'
  },

  // ============================================
  // HSK5 — 逐渐 (GRADUELLEMENT)
  // ============================================
  {
    id: 'grammar-zhujian-gradually',
    level: 'hsk5',
    hanzi: '逐渐',
    pinyin: 'zhújiàn',
    translation: 'Gradually',
    translationFr: 'Graduellement / peu à peu',
    category: 'grammaire',
    explanation: '逐渐 décrit un changement progressif et continu, souvent sur une longue période. Adverbe placé avant le verbe.',
    grammarExplanation: {
      whenToUse: 'Utilisez 逐渐 pour :\n• Décrire un changement progressif\n• Insister sur la lenteur d\'une évolution\n• Synonyme plus formel de 慢慢',
      whenToUseEn: 'Use 逐渐 to:\n• Describe gradual change\n• Emphasize slow evolution\n• More formal synonym of 慢慢',
      howToUse: 'Structure : **Sujet + 逐渐 + Verbe (souvent avec 了, 起来, 下去)**\n\nExemples :\n• 天气逐渐变冷 (tiānqì zhújiàn biàn lěng) = Le temps devient peu à peu froid\n• 他逐渐习惯了新生活 = Il s\'est peu à peu habitué à sa nouvelle vie\n• 经济逐渐恢复 = L\'économie se rétablit graduellement',
      howToUseEn: 'Structure: **Subject + 逐渐 + Verb (often with 了, 起来, 下去)**\n\nExamples:\n• 天气逐渐变冷 = The weather gradually turns cold\n• 他逐渐习惯了新生活 = He gradually got used to the new life\n• 经济逐渐恢复 = The economy is gradually recovering',
      commonMistakes: '❌ Synonymes : 渐渐 (plus littéraire), 慢慢 (plus oral)\n• Même idée, registre différent\n\n❌ Avec des verbes de changement\n• 变, 成为, 开始, 学会, 习惯\n• Pas très naturel avec des verbes statiques\n\n❌ Ne pas utiliser pour changement rapide\n• Si c\'est rapide : 很快, 马上',
      commonMistakesEn: '❌ Synonyms: 渐渐 (more literary), 慢慢 (more oral)\n• Same idea, different register\n\n❌ With change verbs\n• 变, 成为, 开始, 学会, 习惯\n• Less natural with static verbs\n\n❌ Don\'t use for rapid change\n• Fast change: 很快, 马上',
      tips: '💡 Parfait pour les tendances\n• Économie, climat, société\n• 人口逐渐老龄化 = La population vieillit\n\n💡 Combinable avec 越来越\n• 逐渐越来越 = insistance double\n• 技术逐渐越来越先进 = La tech progresse toujours plus',
      tipsEn: '💡 Perfect for trends\n• Economy, climate, society\n• 人口逐渐老龄化 = Population gradually ages\n\n💡 Can combine with 越来越\n• 逐渐越来越 = double emphasis\n• 技术逐渐越来越先进 = Tech keeps advancing',
      relatedGrammar: ['grammar-yue-yue']
    },
    audio: 'audio/grammar/zhujian.wav',
    examples: [
      {
        hanzi: '他的中文逐渐提高',
        pinyin: 'tā de Zhōngwén zhújiàn tígāo',
        translation: 'His Chinese is gradually improving',
        translationFr: 'Son chinois s\'améliore peu à peu'
      },
      {
        hanzi: '天空逐渐变黑',
        pinyin: 'tiānkōng zhújiàn biàn hēi',
        translation: 'The sky gradually darkened',
        translationFr: 'Le ciel s\'est assombri peu à peu'
      },
      {
        hanzi: '我们逐渐了解了真相',
        pinyin: 'wǒmen zhújiàn liǎojiě le zhēnxiàng',
        translation: 'We gradually understood the truth',
        translationFr: 'Nous avons peu à peu compris la vérité'
      }
    ],
    quiz: {
      prompt: 'Quel adverbe signifie « graduellement » ?',
      choices: ['突然', '马上', '逐渐', '很快'],
      correctChoiceIndex: 2
    },
    grammarQuiz: {
      type: 'fill-blank',
      sentence: '天气 ___ 变 冷 了',
      translation: 'Le temps s\'est peu à peu refroidi',
      translationEn: 'The weather gradually got cold',
      choices: ['突然', '逐渐', '马上', '已经'],
      correctChoice: '逐渐',
      pinyin: 'tiānqì ___ biàn lěng le',
      explanation: '逐渐 exprime un changement lent et continu'
    },
    tags: ['grammaire', 'hsk5', 'zhujian', 'progression'],
    theme: 'grammar'
  },

  // ============================================
  // HSK5 — 陆续 (SUCCESSIVEMENT)
  // ============================================
  {
    id: 'grammar-luxu-successively',
    level: 'hsk5',
    hanzi: '陆续',
    pinyin: 'lùxù',
    translation: 'One after another',
    translationFr: 'Successivement / l\'un après l\'autre',
    category: 'grammaire',
    explanation: '陆续 indique que plusieurs événements arrivent les uns après les autres, sans être simultanés.',
    grammarExplanation: {
      whenToUse: 'Utilisez 陆续 pour :\n• Décrire une succession d\'événements/personnes\n• Décrire une arrivée ou une action échelonnée\n• Alternative à 一个接一个',
      whenToUseEn: 'Use 陆续 to:\n• Describe a succession of events/people\n• Describe staggered arrival or action\n• Alternative to 一个接一个',
      howToUse: 'Structure : **Sujet + 陆续 + Verbe**\n\nLes sujets sont souvent pluriels (plusieurs personnes/objets).\n\nExemples :\n• 客人陆续到了 (kèrén lùxù dào le) = Les invités sont arrivés les uns après les autres\n• 学生陆续走进教室 = Les élèves sont entrés en classe un à un\n• 订单陆续发出 = Les commandes ont été envoyées successivement',
      howToUseEn: 'Structure: **Subject + 陆续 + Verb**\n\nSubjects are often plural (several people/things).\n\nExamples:\n• 客人陆续到了 = Guests arrived one after another\n• 学生陆续走进教室 = Students came in one by one\n• 订单陆续发出 = Orders were sent out successively',
      commonMistakes: '❌ Pas pour une seule personne\n• Il faut plusieurs acteurs/événements\n• Incorrect : 我陆续来了 ❌ (un seul sujet)\n\n❌ Synonyme : 相继 (plus formel)\n• Écrit : 相继\n• Oral : 陆续\n\n❌ Ne pas confondre avec 继续 (continuer)\n• 继续 : une seule action qui continue\n• 陆续 : plusieurs actions successives',
      commonMistakesEn: '❌ Not for a single person\n• Needs multiple actors/events\n• Incorrect: 我陆续来了 ❌ (one subject)\n\n❌ Synonym: 相继 (more formal)\n• Written: 相继\n• Oral: 陆续\n\n❌ Don\'t confuse with 继续 (continue)\n• 继续: one ongoing action\n• 陆续: multiple successive actions',
      tips: '💡 Parfait pour les comptes-rendus\n• Réunions, événements, flux de personnes\n• Ton journalistique\n\n💡 Pair classique : 陆续到达\n• Décrit bien l\'arrivée échelonnée\n• Très utilisé dans les infos',
      tipsEn: '💡 Perfect for reports\n• Meetings, events, flows of people\n• Journalistic tone\n\n💡 Classic pair: 陆续到达\n• Describes staggered arrival\n• Common in news',
      relatedGrammar: []
    },
    audio: 'audio/grammar/luxu.wav',
    examples: [
      {
        hanzi: '客人陆续离开了',
        pinyin: 'kèrén lùxù líkāi le',
        translation: 'Guests left one after another',
        translationFr: 'Les invités sont partis l\'un après l\'autre'
      },
      {
        hanzi: '新产品陆续上市',
        pinyin: 'xīn chǎnpǐn lùxù shàngshì',
        translation: 'New products are released successively',
        translationFr: 'Les nouveaux produits sortent les uns après les autres'
      },
      {
        hanzi: '学校陆续开学了',
        pinyin: 'xuéxiào lùxù kāixué le',
        translation: 'Schools have opened one after another',
        translationFr: 'Les écoles ont rouvert successivement'
      }
    ],
    quiz: {
      prompt: 'Quel adverbe signifie « successivement » ?',
      choices: ['同时', '陆续', '突然', '总是'],
      correctChoiceIndex: 1
    },
    grammarQuiz: {
      type: 'sentence-reconstruction',
      words: ['客人', '陆续', '到', '了'],
      translation: 'Les invités sont arrivés les uns après les autres',
      translationEn: 'Guests arrived one after another',
      correctOrder: ['客人', '陆续', '到', '了'],
      pinyin: 'kèrén lùxù dào le'
    },
    tags: ['grammaire', 'hsk5', 'luxu', 'succession'],
    theme: 'grammar'
  },

  // ============================================
  // HSK5 — 不过 (CEPENDANT)
  // ============================================
  {
    id: 'grammar-buguo-however',
    level: 'hsk5',
    hanzi: '不过',
    pinyin: 'búguò',
    translation: 'However / but',
    translationFr: 'Cependant / mais',
    category: 'grammaire',
    explanation: '不过 introduit une restriction ou un contraste, plus doux que 但是. Il nuance un propos sans trop le contredire.',
    grammarExplanation: {
      whenToUse: 'Utilisez 不过 pour :\n• Introduire une nuance ou réserve\n• Contraster doucement\n• Plus léger que 但是, souvent oral',
      whenToUseEn: 'Use 不过 to:\n• Introduce a nuance or reservation\n• Contrast gently\n• Lighter than 但是, often oral',
      howToUse: 'Structure : **Proposition A, 不过 + Proposition B**\n\nExemples :\n• 这件衣服很好，不过有点贵 = Ce vêtement est bien, mais un peu cher\n• 他很聪明，不过有点懒 = Il est intelligent, seulement un peu paresseux\n• 我想去，不过没时间 = Je voudrais y aller, mais je n\'ai pas le temps',
      howToUseEn: 'Structure: **Clause A, 不过 + Clause B**\n\nExamples:\n• 这件衣服很好，不过有点贵 = This garment is nice, but a bit expensive\n• 他很聪明，不过有点懒 = He\'s smart, just a bit lazy\n• 我想去，不过没时间 = I\'d like to go, but don\'t have time',
      commonMistakes: '❌ Ne pas confondre avec 不过 = « seulement »\n• 不过 comme adverbe : 不过一个小时 = seulement une heure\n• 不过 comme conjonction : cependant\n\n❌ Moins fort que 但是\n• 但是 : opposition franche\n• 不过 : nuance douce\n\n❌ Souvent en début de phrase\n• Incorrect : 我想去，没时间不过 ❌',
      commonMistakesEn: '❌ Don\'t confuse with 不过 = "only"\n• 不过 as adverb: 不过一个小时 = only an hour\n• 不过 as conjunction: however\n\n❌ Weaker than 但是\n• 但是: strong opposition\n• 不过: gentle nuance\n\n❌ Often at clause start\n• Incorrect: 我想去，没时间不过 ❌',
      tips: '💡 Ultra fréquent à l\'oral\n• Ponctuation courante en conversation\n• Marque la politesse / l\'atténuation\n\n💡 Dans les petites annonces\n• 房子很大，不过位置不方便 = La maison est grande, mais mal située',
      tipsEn: '💡 Very common in speech\n• Common conversational punctuation\n• Marks politeness / softening\n\n💡 In ads\n• 房子很大，不过位置不方便 = The house is big, but poorly located',
      relatedGrammar: ['grammar-conjunctions-complex']
    },
    audio: 'audio/grammar/buguo.wav',
    examples: [
      {
        hanzi: '这家餐厅不错，不过有点贵',
        pinyin: 'zhè jiā cāntīng búcuò, búguò yǒudiǎn guì',
        translation: 'This restaurant is good, but a bit expensive',
        translationFr: 'Ce restaurant est bien, mais un peu cher'
      },
      {
        hanzi: '我想帮你，不过没办法',
        pinyin: 'wǒ xiǎng bāng nǐ, búguò méi bànfǎ',
        translation: 'I want to help you, but I can\'t',
        translationFr: 'Je voudrais t\'aider, mais je ne peux pas'
      },
      {
        hanzi: '她很努力，不过还是失败了',
        pinyin: 'tā hěn nǔlì, búguò háishi shībài le',
        translation: 'She tried hard, but still failed',
        translationFr: 'Elle a fait des efforts, mais a quand même échoué'
      }
    ],
    quiz: {
      prompt: 'Quelle conjonction est la nuance la plus douce ?',
      choices: ['但是', '然而', '不过', '可是'],
      correctChoiceIndex: 2
    },
    grammarQuiz: {
      type: 'fill-blank',
      sentence: '这 件 衣服 好 看， ___ 太 贵 了',
      translation: 'Ce vêtement est joli, mais trop cher',
      translationEn: 'This garment looks nice, but too expensive',
      choices: ['然而', '而且', '不过', '所以'],
      correctChoice: '不过',
      pinyin: 'zhè jiàn yīfu hǎokàn, ___ tài guì le',
      explanation: '不过 nuance un propos avec un contraste doux'
    },
    tags: ['grammaire', 'hsk5', 'buguo', 'restriction'],
    theme: 'grammar'
  },

  // ============================================
  // HSK5 — 的话 (DANS LE CAS DE)
  // ============================================
  {
    id: 'grammar-dehua-if',
    level: 'hsk5',
    hanzi: '的话',
    pinyin: 'de huà',
    translation: 'If / in the case of',
    translationFr: 'Dans le cas de / si',
    category: 'grammaire',
    explanation: '的话 se place à la fin d\'une proposition conditionnelle pour la « marquer ». Très utilisé à l\'oral.',
    grammarExplanation: {
      whenToUse: 'Utilisez 的话 pour :\n• Renforcer une proposition conditionnelle\n• Ajouter de la fluidité à l\'oral\n• Former des hypothèses polies',
      whenToUseEn: 'Use 的话 to:\n• Reinforce a conditional clause\n• Add fluency to speech\n• Form polite hypotheticals',
      howToUse: 'Structure : **(要是/如果) + Condition + 的话, (就) + Résultat**\n\nExemples :\n• 你有时间的话，来看我 = Si tu as du temps, viens me voir\n• 要是下雨的话，就不去 = S\'il pleut, on n\'y va pas\n• 我的话，选第二个 = À ma place, je choisirais le deuxième',
      howToUseEn: 'Structure: **(要是/如果) + Condition + 的话, (就) + Result**\n\nExamples:\n• 你有时间的话，来看我 = If you have time, come\n• 要是下雨的话，就不去 = If it rains, we won\'t go\n• 我的话，选第二个 = If it were me, I\'d pick the second',
      commonMistakes: '❌ 的话 est facultatif après 如果/要是\n• 如果下雨我就不去 = correct\n• 如果下雨的话我就不去 = plus oral, plus naturel\n\n❌ Peut s\'utiliser sans 如果/要是 !\n• 下雨的话，我就不去 = également correct\n• L\'ajout de 的话 suffit à marquer la condition\n\n❌ Ne pas confondre avec 说的话 (mots prononcés)\n• 他说的话 = ce qu\'il dit\n• 要是的话 = si',
      commonMistakesEn: '❌ 的话 optional after 如果/要是\n• 如果下雨我就不去 = correct\n• 如果下雨的话我就不去 = more natural\n\n❌ Can be used without 如果/要是!\n• 下雨的话，我就不去 = also correct\n• 的话 alone marks the conditional\n\n❌ Don\'t confuse with 说的话 (spoken words)\n• 他说的话 = what he says\n• 要是的话 = if so',
      tips: '💡 Pattern minimaliste\n• Un seul mot (的话) à la fin\n• Évite de commencer par 如果 à chaque fois\n\n💡 Utile pour les conseils polis\n• 我的话 / 要是我的话 = à ma place\n• Plus poli que « tu devrais »',
      tipsEn: '💡 Minimalist pattern\n• One word (的话) at the end\n• Avoids starting every clause with 如果\n\n💡 Polite advice formula\n• 我的话 / 要是我的话 = if I were you\n• More polite than "you should"',
      relatedGrammar: ['grammar-yaoshi-jiu', 'grammar-conjunctions-complex']
    },
    audio: 'audio/grammar/dehua.wav',
    examples: [
      {
        hanzi: '你喜欢的话，就买',
        pinyin: 'nǐ xǐhuan de huà, jiù mǎi',
        translation: 'If you like it, buy it',
        translationFr: 'Si ça te plaît, achète'
      },
      {
        hanzi: '有问题的话，打我电话',
        pinyin: 'yǒu wèntí de huà, dǎ wǒ diànhuà',
        translation: 'If there\'s a problem, call me',
        translationFr: 'S\'il y a un souci, appelle-moi'
      },
      {
        hanzi: '我的话，不会去',
        pinyin: 'wǒ de huà, bú huì qù',
        translation: 'In my case, I wouldn\'t go',
        translationFr: 'À ma place, je n\'irais pas'
      }
    ],
    quiz: {
      prompt: 'Quelle phrase exprime une condition à l\'oral ?',
      choices: ['我去', '我不去', '有时间的话，我去', '我要去'],
      correctChoiceIndex: 2
    },
    grammarQuiz: {
      type: 'sentence-reconstruction',
      words: ['你', '有', '时间', '的话', '来', '我家'],
      translation: 'Si tu as le temps, viens chez moi',
      translationEn: 'If you have time, come to my place',
      correctOrder: ['你', '有', '时间', '的话', '来', '我家'],
      pinyin: 'nǐ yǒu shíjiān de huà, lái wǒ jiā'
    },
    tags: ['grammaire', 'hsk5', 'dehua', 'condition'],
    theme: 'grammar'
  },

  // ============================================
  // HSK5 — 倒 (POURTANT, RENVERSÉ)
  // ============================================
  {
    id: 'grammar-dao-contrary',
    level: 'hsk5',
    hanzi: '倒',
    pinyin: 'dào',
    translation: 'Unexpected contrast',
    translationFr: 'Contraste / au contraire',
    category: 'grammaire',
    explanation: '倒 (adverbe) marque un contraste avec l\'attente, un jugement nuancé ou une tournure polie. Placé après le sujet.',
    grammarExplanation: {
      whenToUse: 'Utilisez 倒 pour :\n• Exprimer un contraste avec une attente\n• Adoucir un jugement (politesse)\n• Concéder partiellement\n• Taquiner gentiment',
      whenToUseEn: 'Use 倒 to:\n• Express contrast with expectation\n• Soften a judgment (politeness)\n• Partially concede\n• Tease gently',
      howToUse: 'Structure : **Sujet + 倒 + Verbe/Adjectif**\n\nExemples :\n• 你倒挺聪明 (nǐ dào tǐng cōngmíng) = Tu es plutôt intelligent (contre-attendu positif)\n• 他说得倒好听，可是… = Ce qu\'il dit sonne bien, mais…\n• 这个菜便宜倒是便宜，但是不好吃 = Ce plat, pas cher ça l\'est, mais pas bon',
      howToUseEn: 'Structure: **Subject + 倒 + Verb/Adjective**\n\nExamples:\n• 你倒挺聪明 = You\'re actually pretty smart\n• 他说得倒好听，可是… = What he says sounds nice, but…\n• 这个菜便宜倒是便宜，但是不好吃 = This dish, cheap yes, but not tasty',
      commonMistakes: '❌ Ne pas confondre avec 倒 (renverser)\n• 倒 (dào) adverbe : contraste\n• 倒 (dǎo) verbe : tomber, renverser\n\n❌ Très pragmatique — se sent plus qu\'il ne se traduit\n• « Plutôt », « bien », « après tout »\n\n❌ Pattern spécial : A 倒是 A, 但是\n• Concession : « A, c\'est vrai, mais… »\n• 便宜倒是便宜 = Pour pas cher c\'est pas cher',
      commonMistakesEn: '❌ Don\'t confuse with 倒 (fall/invert)\n• 倒 (dào) adverb: contrast\n• 倒 (dǎo) verb: fall, invert\n\n❌ Very pragmatic — felt more than literally translated\n• "Rather", "well", "after all"\n\n❌ Special pattern: A 倒是 A, 但是\n• Concession: "A is A, but…"\n• 便宜倒是便宜 = Cheap, cheap it is',
      tips: '💡 Marqueur de « politesse de compromis »\n• Adoucit les objections\n• Très fréquent en dialogue\n\n💡 Pattern 倒是…不过…\n• Admet un point, nuance le suivant\n• 倒是不贵，不过有点小 = Pas cher, mais un peu petit',
      tipsEn: '💡 Marker of "compromise politeness"\n• Softens objections\n• Very common in dialogue\n\n💡 Pattern 倒是…不过…\n• Concede one point, nuance the next\n• 倒是不贵，不过有点小 = Not expensive, but a bit small',
      relatedGrammar: ['grammar-buguo-however']
    },
    audio: 'audio/grammar/dao.wav',
    examples: [
      {
        hanzi: '你倒会省钱',
        pinyin: 'nǐ dào huì shěng qián',
        translation: 'You\'re actually good at saving money',
        translationFr: 'Toi, tu sais plutôt bien économiser'
      },
      {
        hanzi: '天气倒不太冷',
        pinyin: 'tiānqì dào bú tài lěng',
        translation: 'The weather isn\'t too cold after all',
        translationFr: 'Finalement il ne fait pas si froid'
      },
      {
        hanzi: '便宜倒是便宜，但是质量不好',
        pinyin: 'piányi dào shì piányi, dànshì zhìliàng bù hǎo',
        translation: 'Cheap it is, but quality is poor',
        translationFr: 'Pas cher, ça l\'est, mais la qualité est mauvaise'
      }
    ],
    quiz: {
      prompt: 'Le ton le plus nuancé pour admettre « pas cher, mais… » :',
      choices: ['便宜但是…', '便宜倒是便宜，但是…', '便宜了', '便宜很'],
      correctChoiceIndex: 1
    },
    grammarQuiz: {
      type: 'fill-blank',
      sentence: '你 ___ 挺 会 做 菜',
      translation: 'Tu sais plutôt bien cuisiner, finalement',
      translationEn: 'You\'re actually pretty good at cooking',
      choices: ['倒', '还', '也', '都'],
      correctChoice: '倒',
      pinyin: 'nǐ ___ tǐng huì zuò cài',
      explanation: '倒 exprime un jugement contraire à l\'attente (souvent positif)'
    },
    tags: ['grammaire', 'hsk5', 'dao', 'contraste'],
    theme: 'grammar'
  }
];
