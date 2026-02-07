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
        translation: 'un verre d\'eau'
      },
      {
        hanzi: '三个人',
        pinyin: 'sān gè rén',
        translation: 'trois personnes'
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
        translation: 'Je suis occupé aujourd\'hui'
      },
      {
        hanzi: '他明天来',
        pinyin: 'tā míngtiān lái',
        translation: 'Il vient demain'
      },
      {
        hanzi: '我们晚上七点吃饭',
        pinyin: 'wǒmen wǎnshang qī diǎn chī fàn',
        translation: 'Nous dînons à 19h'
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
        translation: 'Je suis en train de lire'
      },
      {
        hanzi: '他正在工作呢',
        pinyin: 'tā zhèngzài gōngzuò ne',
        translation: 'Il est en train de travailler'
      },
      {
        hanzi: '他们正在开会',
        pinyin: 'tāmen zhèngzài kāihuì',
        translation: 'Ils sont en réunion'
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
        translation: 'J\'ai étudié pendant 2 ans'
      },
      {
        hanzi: '他等了一个小时',
        pinyin: 'tā děng le yī gè xiǎoshí',
        translation: 'Il a attendu une heure'
      },
      {
        hanzi: '我们聊了十分钟',
        pinyin: 'wǒmen liáo le shí fēnzhōng',
        translation: 'Nous avons discuté dix minutes'
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
        translation: 'Il a compris (en écoutant)'
      },
      {
        hanzi: '门开好了',
        pinyin: 'mén kāi hǎo le',
        translation: 'La porte est bien ouverte'
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
        translation: 'Bien que ce soit cher, c\'est bien'
      },
      {
        hanzi: '如果下雨，我就不去',
        pinyin: 'rúguǒ xiàyǔ, wǒ jiù bú qù',
        translation: 'S\'il pleut, je n\'irai pas'
      },
      {
        hanzi: '要是有时间，我就去看你',
        pinyin: 'yàoshi yǒu shíjiān, wǒ jiù qù kàn nǐ',
        translation: 'Si j\'ai du temps, j\'irai te voir'
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
  }
];
