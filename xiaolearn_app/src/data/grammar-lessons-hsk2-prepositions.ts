/**
 * grammar-lessons-hsk2-prepositions.ts — 4 fiches HSK2 : prépositions + imminence + indéfinis
 * ------------------------------------------------------------------------------
 *   1. 从 / 离 / 到                — points de référence spatiale/temporelle
 *   2. 对 / 给 / 跟 / 和            — prépositions relationnelles
 *   3. 快...了 / 就要...了          — imminence
 *   4. 什么都 / 谁都 / 哪儿都        — usage indéfini des interrogatifs
 *
 * Chaque entrée respecte le shape `LessonItem` (grammarExplanation complet +
 * examples + quiz + grammarQuiz).
 */
import type { LessonItem } from '../types';

export const grammarLessonsHsk2Prepositions: LessonItem[] = [
  // ============================================
  // HSK2 — 从 / 离 / 到 (points de référence)
  // ============================================
  {
    id: 'grammar-cong-li-dao',
    level: 'hsk2',
    hanzi: '从 / 离 / 到',
    pinyin: 'cóng / lí / dào',
    translation: 'from / away from / to',
    translationFr: '« de/depuis » (从), « distance à » (离), « jusqu\'à » (到)',
    category: 'grammaire',
    explanation: 'Trois prépositions pour localiser un point de départ, une distance, ou une destination.',
    grammarExplanation: {
      whenToUse: '• 从 = origine, point de DÉPART (« depuis X »)\n• 离 = DISTANCE ENTRE 2 points (« X est loin de Y »)\n• 到 = ARRIVÉE / destination (« jusqu\'à Y »)',
      whenToUseEn: '• 从 = origin, STARTING point ("from X")\n• 离 = DISTANCE BETWEEN 2 points ("X is far from Y")\n• 到 = ARRIVAL / destination ("up to Y")',
      howToUse: '从 : 从 + [lieu/temps] + Verbe\n• 我从北京来 = Je viens de Pékin\n• 从九点开始 = Ça commence à 9h\nCombo : 从...到... (« de X à Y »)\n\n离 : A + 离 + B + [distance/adjectif]\n• 我家离学校很近 = Ma maison est près de l\'école\n• 离国庆节还有一周 = Il reste une semaine avant la fête nationale\n\n到 : 到 + [lieu/temps]\n• 我到北京了 = Je suis arrivé à Pékin\n• 到十点吃饭 = Manger jusqu\'à 10h\n\nCombo : 从...到...',
      howToUseEn: '从: 从 + [place/time] + Verb\n• 我从北京来 = I come from Beijing\n• 从九点开始 = Starts at 9\nCombo: 从...到... ("from X to Y")\n\n离: A + 离 + B + [distance/adjective]\n• 我家离学校很近 = My home is close to school\n• 离国庆节还有一周 = One week left until National Day\n\n到: 到 + [place/time]\n• 我到北京了 = I arrived in Beijing\n• 到十点吃饭 = Eat until 10\n\nCombo: 从...到...',
      commonMistakes: '❌ 我离北京来 (faux) ; ✅ 我从北京来 (origine)\n❌ 我家从学校近 (faux) ; ✅ 我家离学校近 (distance)\n❌ 从北京 sans verbe/deuxième point (souvent incomplet)\n\nRetiens : 从 = ligne (point de départ), 离 = mesure (écart), 到 = arrivée.',
      commonMistakesEn: '❌ 我离北京来 (wrong); ✅ 我从北京来 (origin)\n❌ 我家从学校近 (wrong); ✅ 我家离学校近 (distance)\n❌ 从北京 alone without verb / second point (usually incomplete)\n\nRemember: 从 = line (start), 离 = gap (measure), 到 = arrival.',
      tips: '💡 Mnémo : 从 = « FROM », 离 = « AWAY (from) », 到 = « TO »\n💡 Combo magique 从X到Y = « de X à Y »\n💡 离...远/近 = « loin/proche de... »',
      tipsEn: '💡 Mnemonic: 从 = "FROM", 离 = "AWAY (from)", 到 = "TO"\n💡 Magic combo 从X到Y = "from X to Y"\n💡 离...远/近 = "far/close from..."',
      relatedGrammar: ['grammar-location-zai']
    },
    audio: 'audio/grammar/grammar-cong-li-dao.wav',
    examples: [
      { hanzi: '从我家到学校要半个小时', pinyin: 'cóng wǒ jiā dào xuéxiào yào bàn ge xiǎoshí', translation: 'From my home to school takes half an hour', translationFr: 'De chez moi à l\'école ça prend une demi-heure' },
      { hanzi: '学校离我家不远', pinyin: 'xuéxiào lí wǒ jiā bù yuǎn', translation: 'The school is not far from my home', translationFr: 'L\'école n\'est pas loin de chez moi' },
      { hanzi: '我从法国来', pinyin: 'wǒ cóng Fǎguó lái', translation: 'I come from France', translationFr: 'Je viens de France' }
    ],
    quiz: {
      prompt: 'Pour dire « de Paris à Pékin » :',
      choices: ['离巴黎到北京', '从巴黎离北京', '从巴黎到北京', '到巴黎从北京'],
      correctChoiceIndex: 2
    },
    grammarQuiz: {
      type: 'fill-blank',
      sentence: '我家___学校很近',
      translation: 'Ma maison est proche de l\'école',
      translationEn: 'My home is close to school',
      choices: ['从', '离', '到', '在'],
      correctChoice: '离',
      pinyin: 'wǒ jiā ___ xuéxiào hěn jìn',
      explanation: '离 exprime la distance entre deux points : A 离 B + proche/loin.'
    },
    tags: ['grammaire', 'préposition', 'lieu', 'hsk2'],
    theme: 'grammar'
  },

  // ============================================
  // HSK2 — 对 / 给 / 跟 / 和 (prépositions relationnelles)
  // ============================================
  {
    id: 'grammar-dui-gei-gen-he',
    level: 'hsk2',
    hanzi: '对 / 给 / 跟 / 和',
    pinyin: 'duì / gěi / gēn / hé',
    translation: 'toward / for / with / and',
    translationFr: '« à/envers » (对), « à/pour » (给), « avec » (跟), « et/avec » (和)',
    category: 'grammaire',
    explanation: 'Quatre prépositions relationnelles souvent confondues. Chacune a une nuance précise.',
    grammarExplanation: {
      whenToUse: '• 对 = orientation « envers/à propos de qqn » (对我说 « me dire »)\n• 给 = bénéficiaire ou destinataire (给我打电话 « m\'appeler »)\n• 跟 = compagnie active « avec » (跟他去 « aller avec lui »)\n• 和 = accompagnement neutre « et/avec » (我和他 « lui et moi »)',
      whenToUseEn: '• 对 = orientation "toward / regarding sb" (对我说 = "tell me")\n• 给 = beneficiary or recipient (给我打电话 = "call me")\n• 跟 = active companionship "with" (跟他去 = "go with him")\n• 和 = neutral accompaniment "and/with" (我和他 = "he and I")',
      howToUse: '对 : Sujet + 对 + Objet + Verbe\n• 老师对学生很好 = Le prof est gentil AVEC les élèves\n• 我对你说 = Je te dis\n\n给 : Sujet + 给 + Bénéficiaire + Verbe\n• 我给妈妈打电话 = Je téléphone à maman\n\n跟 : Sujet + 跟 + Personne + Verbe\n• 我跟朋友吃饭 = Je mange avec un ami\n\n和 : plus souvent CONJONCTION (« et »)\n• 我和他是朋友 = Lui et moi sommes amis',
      howToUseEn: '对: Subject + 对 + Object + Verb\n• 老师对学生很好 = The teacher is kind TOWARD the students\n• 我对你说 = I tell you\n\n给: Subject + 给 + Beneficiary + Verb\n• 我给妈妈打电话 = I call mom\n\n跟: Subject + 跟 + Person + Verb\n• 我跟朋友吃饭 = I eat with a friend\n\n和: mostly a CONJUNCTION ("and")\n• 我和他是朋友 = He and I are friends',
      commonMistakes: '❌ 我跟你说 : correct MAIS 我对你说 sonne plus doux pour « te dire »\n  Choix 对 vs 跟 pour parler : 跟 = échanger, 对 = orienter\n\n❌ 我给他去 (faux) ; ✅ 我跟他去 (compagnie)\n\n❌ 我打电话对妈妈 (faux) ; ✅ 我给妈妈打电话',
      commonMistakesEn: '❌ 我跟你说: correct BUT 我对你说 sounds softer for "tell you"\n  对 vs 跟 for speaking: 跟 = exchange, 对 = orient toward\n\n❌ 我给他去 (wrong); ✅ 我跟他去 (companionship)\n\n❌ 我打电话对妈妈 (wrong); ✅ 我给妈妈打电话',
      tips: '💡 Mnémo :\n• 对 = « to/toward (attitude) »\n• 给 = « to (bénéficiaire) »\n• 跟 = « with (compagnie active) »\n• 和 = « and/with (neutre) »\n\n💡 Pour un cadeau/service : 给\n💡 Pour parler à qqn : 对 ou 跟\n💡 Pour « moi et toi » : 我和你',
      tipsEn: '💡 Mnemonic:\n• 对 = "to/toward (attitude)"\n• 给 = "to (beneficiary)"\n• 跟 = "with (active companionship)"\n• 和 = "and/with (neutral)"\n\n💡 For a gift / favor: 给\n💡 To talk TO someone: 对 or 跟\n💡 For "you and me": 我和你',
      relatedGrammar: []
    },
    audio: 'audio/grammar/grammar-dui-gei-gen-he.wav',
    examples: [
      { hanzi: '我给他写信', pinyin: 'wǒ gěi tā xiě xìn', translation: 'I write him a letter', translationFr: 'Je lui écris une lettre' },
      { hanzi: '我跟他一起去', pinyin: 'wǒ gēn tā yìqǐ qù', translation: 'I go with him', translationFr: 'J\'y vais avec lui' },
      { hanzi: '老师对我很好', pinyin: 'lǎoshī duì wǒ hěn hǎo', translation: 'The teacher is very kind to me', translationFr: 'Le prof est très gentil avec moi' }
    ],
    quiz: {
      prompt: '« J\'ai téléphoné à ma mère » = ?',
      choices: ['我对妈妈打电话了', '我给妈妈打电话了', '我跟妈妈打电话了', '我和妈妈打电话了'],
      correctChoiceIndex: 1
    },
    grammarQuiz: {
      type: 'fill-blank',
      sentence: '请___我说说这件事',
      translation: 'Dis-moi cette affaire (parle-moi de ça)',
      translationEn: 'Please tell me about this matter',
      choices: ['对', '给', '跟', '和'],
      correctChoice: '跟',
      pinyin: 'qǐng ___ wǒ shuōshuo zhè jiàn shì',
      explanation: '跟 introduit la personne avec qui on échange une information.'
    },
    tags: ['grammaire', 'préposition', 'relation', 'hsk2'],
    theme: 'grammar'
  },

  // ============================================
  // HSK2 — 快...了 / 就要...了 (imminence)
  // ============================================
  {
    id: 'grammar-kuai-le-imminence',
    level: 'hsk2',
    hanzi: '快...了 / 就要...了 / 要...了',
    pinyin: 'kuài...le / jiù yào...le',
    translation: 'about to / soon',
    translationFr: '« bientôt / sur le point de »',
    category: 'grammaire',
    explanation: 'Structures d\'aspect imminent pour dire qu\'une action VA SE PRODUIRE bientôt.',
    grammarExplanation: {
      whenToUse: 'Pour parler d\'un événement TRÈS PROCHE (minutes, heures, jours).\nSans indication temporelle précise autre que « bientôt ».',
      whenToUseEn: 'To talk about an event VERY SOON (minutes, hours, days).\nWith no precise time indicator beyond "soon".',
      howToUse: 'Structure 1 : Sujet + 快 + Verbe/Adj + 了\n• 火车快到了 = Le train arrive bientôt\n• 天快黑了 = Il va bientôt faire nuit\n\nStructure 2 : Sujet + 就要 + Verbe + 了 (souvent avec un moment précis)\n• 我们就要毕业了 = On va bientôt être diplômés\n• 明天就要考试了 = L\'examen c\'est demain !\n\nStructure 3 : 要...了 seule est plus légère\n• 我要走了 = Je vais partir',
      howToUseEn: 'Pattern 1: Subject + 快 + Verb/Adj + 了\n• 火车快到了 = The train is arriving soon\n• 天快黑了 = It will get dark soon\n\nPattern 2: Subject + 就要 + Verb + 了 (often with a precise time)\n• 我们就要毕业了 = We\'re about to graduate\n• 明天就要考试了 = The exam is tomorrow!\n\nPattern 3: 要...了 alone is lighter\n• 我要走了 = I\'m leaving',
      commonMistakes: '❌ 快到 sans 了 (incomplet, il manque la particule finale) ; ✅ 快到了\n\nDifférence : 就要...了 peut PRENDRE un moment précis en amont (明天就要 = demain c\'est), 快...了 ne le peut PAS (❌ 明天快到)\n\nNégation : impossible. Pour dire « pas bientôt » on utilise 还不 (还不来 = pas encore arriver).',
      commonMistakesEn: '❌ 快到 without 了 (incomplete, missing final particle); ✅ 快到了\n\nDifference: 就要...了 CAN take a precise time upfront (明天就要 = tomorrow it will), 快...了 CANNOT (❌ 明天快到)\n\nNegation: impossible. For "not soon" use 还不 (还不来 = not coming yet).',
      tips: '💡 Mnémo : 快...了 = « ça arrive VITE, ça va se passer »\n💡 Toujours PAIRE 快 + 了\n💡 就要 est plus urgent/annoncé\n💡 Sans 快 ni 就要 : 要走了 = « je m\'en vais (là) »',
      tipsEn: '💡 Mnemonic: 快...了 = "coming FAST, about to happen"\n💡 Always PAIR 快 + 了\n💡 就要 is more urgent / pre-announced\n💡 Without 快 nor 就要: 要走了 = "I\'m off (now)"',
      relatedGrammar: ['grammar-aspect-le']
    },
    audio: 'audio/grammar/grammar-kuai-le-imminence.wav',
    examples: [
      { hanzi: '快下雨了！', pinyin: 'kuài xià yǔ le!', translation: 'It\'s about to rain!', translationFr: 'Il va bientôt pleuvoir !' },
      { hanzi: '我们就要出发了', pinyin: 'wǒmen jiù yào chūfā le', translation: 'We\'re about to leave', translationFr: 'On est sur le point de partir' },
      { hanzi: '妈妈快回来了', pinyin: 'māma kuài huílái le', translation: 'Mom is coming back soon', translationFr: 'Maman rentre bientôt' }
    ],
    quiz: {
      prompt: 'Structure pour « le train arrive bientôt » :',
      choices: ['火车快到', '火车到了', '火车快到了', '火车了到'],
      correctChoiceIndex: 2
    },
    grammarQuiz: {
      type: 'fill-blank',
      sentence: '妈妈___回家___',
      translation: 'Maman rentre bientôt à la maison',
      translationEn: 'Mom is coming home soon',
      choices: ['快 ... 了', '就 ... 了', '要 ... 了', '在 ... 了'],
      correctChoice: '快 ... 了',
      pinyin: 'māma ___ huí jiā ___',
      explanation: '快...了 est la structure d\'imminence la plus courante : « bientôt X ».'
    },
    tags: ['grammaire', 'aspect', 'imminence', 'hsk2'],
    theme: 'grammar'
  },

  // ============================================
  // HSK2 — 什么都 / 谁都 / 哪儿都 (usage indéfini)
  // ============================================
  {
    id: 'grammar-shenme-dou-indefinite',
    level: 'hsk2',
    hanzi: '什么都 / 谁都 / 哪儿都',
    pinyin: 'shénme dōu / shéi dōu / nǎr dōu',
    translation: 'anything / anyone / anywhere',
    translationFr: '« tout / n\'importe quoi » (usage indéfini des interrogatifs)',
    category: 'grammaire',
    explanation: 'Piège classique intermédiaire : 什么/谁/哪儿 ne sont pas QUE des questions. Combinés avec 都/也, ils forment des sens « TOUT, RIEN, N\'IMPORTE QUEL ».',
    grammarExplanation: {
      whenToUse: 'Pour dire « tout, n\'importe quoi, partout, personne, rien ».\nToujours en couple avec 都 ou 也 (affirmation ou négation).',
      whenToUseEn: 'To say "anything, everything, anywhere, no one, nothing".\nAlways paired with 都 or 也 (affirmative or negative).',
      howToUse: 'Structure : Sujet + [什么/谁/哪儿] + 都/也 + Verbe\n\nAffirmatif (« tout ») :\n• 他什么都吃 = Il mange TOUT\n• 我哪儿都想去 = Je veux aller PARTOUT\n\nNégatif (« rien / personne ») :\n• 我什么都不知道 = Je ne sais RIEN\n• 谁都不认识我 = PERSONNE ne me connaît\n• 我哪儿也不去 = Je ne vais NULLE PART\n\nAvec 也 : équivalent à 都 mais plus emphatique dans le négatif.',
      howToUseEn: 'Pattern: Subject + [什么/谁/哪儿] + 都/也 + Verb\n\nAffirmative ("everything"):\n• 他什么都吃 = He eats EVERYTHING\n• 我哪儿都想去 = I want to go EVERYWHERE\n\nNegative ("nothing / nobody"):\n• 我什么都不知道 = I know NOTHING\n• 谁都不认识我 = NOBODY knows me\n• 我哪儿也不去 = I go NOWHERE\n\nWith 也: equivalent to 都 but more emphatic in the negative.',
      commonMistakes: '❌ 他吃什么都 (faux — ordre) ; ✅ 他什么都吃\n\nLe 都 est OBLIGATOIRE et fait la totalité. Sans 都 ni 也, 什么 redevient question :\n• 他吃什么？= « qu\'est-ce qu\'il mange ? »\n\nAttention à l\'ordre : Sujet + INTERROGATIF + 都/也 + VERBE.',
      commonMistakesEn: '❌ 他吃什么都 (wrong — order); ✅ 他什么都吃\n\n都 is MANDATORY and creates the totality. Without 都 or 也, 什么 becomes a question again:\n• 他吃什么？= "what is he eating?"\n\nWatch the order: Subject + INTERROGATIVE + 都/也 + VERB.',
      tips: '💡 Astuce : « INTERROGATIF + 都 = TOTALITÉ »\n💡 什么都吃 = « mange tout »\n💡 什么都不吃 = « ne mange rien »\n💡 Négation typique : 什么...也不 est très courant',
      tipsEn: '💡 Rule: "INTERROGATIVE + 都 = TOTALITY"\n💡 什么都吃 = "eats everything"\n💡 什么都不吃 = "eats nothing"\n💡 Typical negation: 什么...也不 is very common',
      relatedGrammar: ['grammar-question-words', 'grammar-dou-all']
    },
    audio: 'audio/grammar/grammar-shenme-dou-indefinite.wav',
    examples: [
      { hanzi: '他什么都想学', pinyin: 'tā shénme dōu xiǎng xué', translation: 'He wants to learn everything', translationFr: 'Il veut tout apprendre' },
      { hanzi: '我哪儿都没去过', pinyin: 'wǒ nǎr dōu méi qùguo', translation: 'I have never been anywhere', translationFr: 'Je ne suis jamais allé nulle part' },
      { hanzi: '谁都可以来', pinyin: 'shéi dōu kěyǐ lái', translation: 'Anyone can come', translationFr: 'N\'importe qui peut venir' }
    ],
    quiz: {
      prompt: '« Je ne mange rien » = ?',
      choices: ['我不吃什么', '我什么都不吃', '我什么吃', '什么我吃'],
      correctChoiceIndex: 1
    },
    grammarQuiz: {
      type: 'fill-blank',
      sentence: '他___都喜欢',
      translation: 'Il aime tout',
      translationEn: 'He likes everything',
      choices: ['什么', '谁', '哪儿', '几'],
      correctChoice: '什么',
      pinyin: 'tā ___ dōu xǐhuan',
      explanation: '什么 + 都 devient « tout » : ici « il aime tout ».'
    },
    tags: ['grammaire', 'indéfini', 'interrogatif', 'hsk2'],
    theme: 'grammar'
  }
];
