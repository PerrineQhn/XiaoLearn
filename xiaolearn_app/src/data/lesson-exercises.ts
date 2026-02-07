import type { LessonExercise } from '../types';

export const lessonExercises: Record<string, LessonExercise[]> = {
  // ============================================
  // PINYIN & TONES
  // ============================================
  'pinyin-3-tones': [
    {
      id: 'tone-pengyou',
      type: 'listening',
      mode: 'tone',
      audio: 'audio/hsk1/hsk1_朋友.wav',
      promptFr: 'Quel ton entends-tu pour « 朋友 » ?',
      promptEn: 'Which tone do you hear for "朋友"?',
      choices: ['péngyou', 'pēngyòu', 'péngyōu', 'pěngyǒu'],
      choiceLabels: [
        'péngyou — ton 2 + ton neutre',
        'pēngyòu — ton 1 + ton 4',
        'péngyōu — ton 2 + ton 1',
        'pěngyǒu — ton 3 + ton 3'
      ],
      correctChoiceIndex: 0,
      explanationFr: '朋友 se prononce péngyou (2e ton + ton neutre sur « you »).',
      explanationEn: '朋友 is pronounced péngyou (2nd tone + neutral tone on “you”).'
    },
    {
      id: 'tone-mama',
      type: 'listening',
      mode: 'tone',
      audio: 'audio/hsk1/hsk1_妈妈.wav',
      promptFr: 'Quelle prononciation correspond à « 妈妈 » ?',
      promptEn: 'Which pronunciation matches "妈妈"?',
      choices: ['māma', 'máma', 'mǎma', 'màma'],
      correctChoiceIndex: 0,
      explanationFr: '妈 utilise le 1er ton haut et plat.',
      explanationEn: '妈 uses the 1st tone (high-level).'
    },
    {
      id: 'tone-laoshi',
      type: 'listening',
      mode: 'tone',
      audio: 'audio/hsk1/hsk1_老师.wav',
      promptFr: 'Choisis la bonne combinaison de tons pour « 老师 ».',
      promptEn: 'Pick the correct tone combination for "老师".',
      choices: ['lǎoshī', 'láoshǐ', 'làoshī', 'lǎoshǐ'],
      correctChoiceIndex: 0,
      explanationFr: '老师 se prononce lǎoshī (3e ton + neutre).',
      explanationEn: '老师 is pronounced lǎoshī (3rd tone + neutral).'
    }
  ],
  'pinyin-1-initials': [
    {
      id: 'initial-b-or-p',
      type: 'listening',
      mode: 'minimal-pair',
      audio: 'audio/hsk1/hsk1_朋友.wav',
      promptFr: 'Le son initial entendu est-il p ou b ?',
      promptEn: 'Is the initial sound p or b?',
      choices: ['péngyǒu (p)', 'béngyǒu (b)'],
      correctChoiceIndex: 0,
      explanationFr: 'On entend une aspiration claire → pinyin p.',
      explanationEn: 'The strong aspiration reveals the p sound.'
    },
    {
      id: 'initial-baba',
      type: 'listening',
      mode: 'minimal-pair',
      audio: 'audio/hsk1/hsk1_爸爸.wav',
      promptFr: 'Le mot « 爸爸 » commence-t-il par b ou p ?',
      promptEn: 'Does "爸爸" begin with b or p?',
      choices: ['bàba (b)', 'pàba (p)'],
      choiceLabels: [
        'bàba — consonne non aspirée (b)',
        'pàba — consonne aspirée (p)'
      ],
      correctChoiceIndex: 0,
      explanationFr: 'Pas d’aspiration, on est sur la consonne b.',
      explanationEn: 'No aspiration, so it is the b sound.'
    }
  ],

  // ============================================
  // BASIC PHRASES
  // ============================================
  'phrases-1-greetings': [
    {
      id: 'greeting-audio-evening',
      type: 'listening',
      mode: 'tone',
      audio: 'audio/phrases/greeting_wanshanghao.wav',
      promptFr: 'Quel message viens-tu d’entendre ?',
      promptEn: 'Which greeting did you hear?',
      choices: ['Bonsoir', 'Bonjour', 'Merci beaucoup', 'À bientôt'],
      correctChoiceIndex: 0,
      explanationFr: '晚上好 signifie « bonsoir ».',
      explanationEn: '晚上好 means “good evening”.'
    },
    {
      id: 'greeting-text-reply',
      type: 'text-mcq',
      promptFr: 'Quelle réponse convient face à « 你好 » ?',
      promptEn: 'How would you reply to “你好”?',
      choices: ['你好！', '谢谢。', '对不起。', '没关系。'],
      correctChoiceIndex: 0,
      explanationFr: 'On répond généralement par le même salut « 你好！ ».',
      explanationEn: 'The standard reply is also “你好！”'
    },
    {
      id: 'greeting-reconstruction',
      type: 'grammar',
      quiz: {
        type: 'sentence-reconstruction',
        translation: 'Au revoir, à demain.',
        translationEn: 'Goodbye, see you tomorrow.',
        words: ['明天', '见', '，', '再见'],
        correctOrder: ['再见', '，', '明天', '见'],
        pinyin: 'zàijiàn, míngtiān jiàn'
      }
    }
  ],
  'phrases-2-introductions': [
    {
      id: 'intro-audio-name',
      type: 'listening',
      mode: 'dialogue',
      audio: 'audio/phrases/intro_nijiaoshenme.wav',
      promptFr: 'Quelle question est posée ?',
      promptEn: 'Which question is being asked?',
      choices: ['Comment tu t’appelles ?', 'D’où viens-tu ?', 'Quel âge as-tu ?', 'Où habites-tu ?'],
      correctChoiceIndex: 0,
      explanationFr: '你叫什么名字？ demande le nom de la personne.',
      explanationEn: '你叫什么名字 means “What is your name?”.'
    },
    {
      id: 'intro-text-country',
      type: 'text-mcq',
      promptFr: 'Comment dire « Je suis français » ?',
      promptEn: 'How do you say “I am French”?',
      choices: ['我是法国人。', '我去法国。', '我叫法国人。', '我是法国。'],
      correctChoiceIndex: 0,
      explanationFr: 'Utiliser 人 pour exprimer la nationalité.',
      explanationEn: 'Add 人 to express nationality.'
    },
    {
      id: 'intro-reconstruction',
      type: 'grammar',
      quiz: {
        type: 'sentence-reconstruction',
        translation: 'Ravi de te rencontrer.',
        translationEn: 'Nice to meet you.',
        words: ['高兴', '很', '认识', '你'],
        correctOrder: ['很', '高兴', '认识', '你'],
        pinyin: 'hěn gāoxìng rènshi nǐ'
      }
    }
  ],
  'phrases-3-politeness': [
    {
      id: 'polite-audio-sorry',
      type: 'listening',
      mode: 'dialogue',
      audio: 'audio/phrases/polite_duibuqi.wav',
      promptFr: 'Pourquoi la personne s’excuse-t-elle ?',
      promptEn: 'What is the person apologizing for?',
      choices: ['Elle présente ses excuses', 'Elle dit bonjour', 'Elle remercie', 'Elle commande un café'],
      correctChoiceIndex: 0,
      explanationFr: 'On entend simplement « 对不起 » (je suis désolé).',
      explanationEn: 'You just hear “对不起” (I am sorry).'
    },
    {
      id: 'polite-text-thanks',
      type: 'text-mcq',
      promptFr: 'Quelle phrase signifie « de rien » ?',
      promptEn: 'Which phrase means “you’re welcome”?',
      choices: ['不客气。', '对不起。', '谢谢。', '没问题。'],
      correctChoiceIndex: 0,
      explanationFr: '不客气 est la réponse standard à un remerciement.',
      explanationEn: '不客气 is the standard reply to thanks.'
    },
    {
      id: 'polite-reconstruction',
      type: 'grammar',
      quiz: {
        type: 'sentence-reconstruction',
        translation: 'Ce n’est rien.',
        translationEn: 'It’s nothing.',
        words: ['没', '关系', '。'],
        correctOrder: ['没', '关系', '。'],
        pinyin: 'méi guānxi.'
      }
    }
  ],
  'phrases-4-questions': [
    {
      id: 'questions-audio-where',
      type: 'listening',
      mode: 'dialogue',
      audio: 'audio/phrases/question_xishoujian.wav',
      promptFr: 'Que cherche la personne ?',
      promptEn: 'What is the speaker looking for?',
      choices: ['Les toilettes', 'Le métro', 'Un ami', 'L’hôtel'],
      correctChoiceIndex: 0,
      explanationFr: '洗手间 = toilettes.',
      explanationEn: '洗手间 means restroom.'
    },
    {
      id: 'questions-text-who',
      type: 'text-mcq',
      promptFr: 'Quel mot interroge l’identité ?',
      promptEn: 'Which word asks for identity?',
      choices: ['谁', '哪儿', '什么', '几'],
      correctChoiceIndex: 0,
      explanationFr: '谁 (shuí) signifie « qui ».',
      explanationEn: '谁 means “who”.'
    },
    {
      id: 'questions-reconstruction',
      type: 'grammar',
      quiz: {
        type: 'sentence-reconstruction',
        translation: 'Quand reviens-tu ?',
        translationEn: 'When will you come back?',
        words: ['你', '什么时候', '回来', '？'],
        correctOrder: ['你', '什么时候', '回来', '？'],
        pinyin: 'nǐ shénme shíhou huílai?'
      }
    }
  ],
  'phrases-5-yes-no': [
    {
      id: 'yesno-audio-question',
      type: 'listening',
      mode: 'dialogue',
      audio: 'audio/phrases/yesno_nishilaoshima.wav',
      promptFr: 'Quelle question entends-tu ?',
      promptEn: 'Which question is asked?',
      choices: ['Es-tu professeur ?', 'Es-tu étudiant ?', 'Où vas-tu ?', 'Comment tu t’appelles ?'],
      correctChoiceIndex: 0,
      explanationFr: 'La phrase se termine par 吗 pour une question oui/non.',
      explanationEn: 'The question ends with 吗 for a yes/no question.'
    },
    {
      id: 'yesno-text-affirm',
      type: 'text-mcq',
      promptFr: 'Quelle réponse confirme poliment ?',
      promptEn: 'Which answer confirms politely?',
      choices: ['是的，我是老师。', '不是，我是老师。', '我不是老师。', '不知道。'],
      correctChoiceIndex: 0,
      explanationFr: '是的 marque une réponse positive formelle.',
      explanationEn: '是的 introduces a polite affirmation.'
    },
    {
      id: 'yesno-reconstruction',
      type: 'grammar',
      quiz: {
        type: 'sentence-reconstruction',
        translation: 'Non, je ne suis pas étudiant.',
        translationEn: 'No, I am not a student.',
        words: ['不', '是', '，', '我', '不', '是', '学生', '。'],
        correctOrder: ['不', '是', '，', '我', '不', '是', '学生', '。'],
        pinyin: 'bú shì, wǒ bú shì xuésheng.'
      }
    }
  ],
  'phrases-6-numbers-1-10': [
    {
      id: 'numbers-audio-three',
      type: 'listening',
      mode: 'dialogue',
      audio: 'audio/phrases/number_woyousange.wav',
      promptFr: 'Combien d’objets la personne possède-t-elle ?',
      promptEn: 'How many items does the speaker have?',
      choices: ['Trois', 'Deux', 'Quatre', 'Cinq'],
      correctChoiceIndex: 0,
      explanationFr: 'La phrase dit « 三个苹果 » (trois pommes).',
      explanationEn: 'The sentence contains “三个苹果” (three apples).'
    },
    {
      id: 'numbers-text-time',
      type: 'text-mcq',
      promptFr: 'Quelle phrase annonce « Il est neuf heures » ?',
      promptEn: 'Which phrase states “It is nine o’clock”?',
      choices: ['现在是九点。', '我们九点见。', '九点多少？', '九点喝水。'],
      correctChoiceIndex: 0,
      explanationFr: '现在 introduit l’heure actuelle.',
      explanationEn: '现在 indicates the current time.'
    },
    {
      id: 'numbers-reconstruction',
      type: 'grammar',
      quiz: {
        type: 'sentence-reconstruction',
        translation: 'On se voit à dix heures.',
        translationEn: 'We meet at ten o’clock.',
        words: ['我们', '十点', '见', '。'],
        correctOrder: ['我们', '十点', '见', '。'],
        pinyin: 'wǒmen shí diǎn jiàn.'
      }
    }
  ],
  'phrases-7-time': [
    {
      id: 'time-audio-now',
      type: 'listening',
      mode: 'dialogue',
      audio: 'audio/phrases/hsk1-phrase-018.wav',
      promptFr: 'Que dit la personne ?',
      promptEn: 'What does the speaker say?',
      choices: ['Il est trois heures', 'Il fait très chaud', 'Il y a trois personnes', 'Nous nous voyons demain'],
      correctChoiceIndex: 0,
      explanationFr: 'La phrase « 现在三点 » donne l’heure actuelle.',
      explanationEn: 'The sentence “现在三点” states the current time.'
    },
    {
      id: 'time-text-tomorrow',
      type: 'text-mcq',
      promptFr: 'Quelle phrase signifie « À demain » ?',
      promptEn: 'Which sentence means “See you tomorrow”?',
      choices: ['明天见。', '今天见。', '晚上见。', '现在见。'],
      correctChoiceIndex: 0
    },
    {
      id: 'time-reconstruction',
      type: 'grammar',
      quiz: {
        type: 'sentence-reconstruction',
        translation: 'Quelle heure est-il maintenant ?',
        translationEn: 'What time is it now?',
        words: ['现在', '几点', '？'],
        correctOrder: ['现在', '几点', '？'],
        pinyin: 'xiànzài jǐ diǎn?'
      }
    }
  ],
  'phrases-8-family': [
    {
      id: 'family-audio-father',
      type: 'listening',
      mode: 'dialogue',
      audio: 'audio/phrases/hsk1-phrase-014.wav',
      promptFr: 'De qui parle-t-on ?',
      promptEn: 'Who is being introduced?',
      choices: ['Du père', 'De la mère', 'Du frère', 'Du professeur'],
      correctChoiceIndex: 0,
      explanationFr: 'La phrase contient « 爸爸 » (père).',
      explanationEn: 'The sentence contains “爸爸” meaning father.'
    },
    {
      id: 'family-text-status',
      type: 'text-mcq',
      promptFr: 'Quelle phrase annonce que tout le monde va bien ?',
      promptEn: 'Which sentence says everyone is fine?',
      choices: ['他们都很好。', '他们很好吗？', '他们都不见。', '他们都在这儿。'],
      correctChoiceIndex: 0
    },
    {
      id: 'family-reconstruction',
      type: 'grammar',
      quiz: {
        type: 'sentence-reconstruction',
        translation: 'Viens chez moi.',
        translationEn: 'Come to my home.',
        words: ['来', '你', '我家', '。'],
        correctOrder: ['你', '来', '我家', '。'],
        pinyin: 'nǐ lái wǒ jiā.'
      }
    }
  ],
  'phrases-9-food-drinks': [
    {
      id: 'food-audio-coffee',
      type: 'listening',
      mode: 'dialogue',
      audio: 'audio/phrases/hsk2-phrase-007.wav',
      promptFr: 'Qu’est-ce qui est commandé ?',
      promptEn: 'What is being ordered?',
      choices: ['Un café', 'Un thé', 'Un plat chinois', 'Un dessert'],
      correctChoiceIndex: 0,
      explanationFr: 'La phrase dit « 请给我一杯咖啡 ».',
      explanationEn: 'The line says “请给我一杯咖啡” (one cup of coffee).'
    },
    {
      id: 'food-text-preference',
      type: 'text-mcq',
      promptFr: 'Quelle phrase exprime « J’aime manger chinois » ?',
      promptEn: 'Which sentence says “I like to eat Chinese food”?',
      choices: ['我喜欢吃中国菜。', '我喜欢喝中国茶。', '我喜欢中国。', '我在吃中国菜。'],
      correctChoiceIndex: 0
    },
    {
      id: 'food-reconstruction',
      type: 'grammar',
      quiz: {
        type: 'sentence-reconstruction',
        translation: 'Je n’ai pas faim, merci.',
        translationEn: 'I’m not hungry, thanks.',
        words: ['我', '不饿', '，', '谢谢', '。'],
        correctOrder: ['我', '不饿', '，', '谢谢', '。'],
        pinyin: 'wǒ bú è, xièxie.'
      }
    }
  ],
  'phrases-10-wants-needs': [
    {
      id: 'needs-audio-water',
      type: 'listening',
      mode: 'dialogue',
      audio: 'audio/phrases/hsk1-phrase-013.wav',
      promptFr: 'De quoi la personne a-t-elle envie ?',
      promptEn: 'What does the speaker want?',
      choices: ['Boire de l’eau', 'Aller dormir', 'Aller à l’école', 'Acheter un livre'],
      correctChoiceIndex: 0
    },
    {
      id: 'needs-text-help',
      type: 'text-mcq',
      promptFr: 'Quelle phrase signifie « J’ai besoin d’aide » ?',
      promptEn: 'Which sentence means “I need help”?',
      choices: ['我需要帮助。', '我帮你需要。', '我喜欢帮助。', '我不需要。'],
      correctChoiceIndex: 0
    },
    {
      id: 'needs-reconstruction',
      type: 'grammar',
      quiz: {
        type: 'sentence-reconstruction',
        translation: 'Demain j’ai du temps.',
        translationEn: 'Tomorrow I have time.',
        words: ['明天', '我', '有', '时间', '。'],
        correctOrder: ['明天', '我', '有', '时间', '。'],
        pinyin: 'míngtiān wǒ yǒu shíjiān.'
      }
    }
  ],
  'phrases-11-common-verbs': [
    {
      id: 'verbs-audio-study',
      type: 'listening',
      mode: 'dialogue',
      audio: 'audio/phrases/hsk2-phrase-019.wav',
      promptFr: 'Que fait la personne ?',
      promptEn: 'What is the person doing?',
      choices: ['Elle apprend le chinois', 'Elle va à l’école', 'Elle boit de l’eau', 'Elle dort'],
      correctChoiceIndex: 0
    },
    {
      id: 'verbs-text-together',
      type: 'text-mcq',
      promptFr: 'Quelle phrase propose de partir ensemble ?',
      promptEn: 'Which sentence suggests going together?',
      choices: ['我们一起去。', '我们一起在。', '我们一起学。', '我们去一起。'],
      correctChoiceIndex: 0
    },
    {
      id: 'verbs-reconstruction',
      type: 'grammar',
      quiz: {
        type: 'sentence-reconstruction',
        translation: 'Je ne comprends pas (ce que j’entends).',
        translationEn: 'I can’t understand (what I hear).',
        words: ['我', '听', '不懂', '。'],
        correctOrder: ['我', '听', '不懂', '。'],
        pinyin: 'wǒ tīng bù dǒng.'
      }
    }
  ],
  'phrases-12-daily-actions': [
    {
      id: 'daily-audio-reading',
      type: 'listening',
      mode: 'dialogue',
      audio: 'audio/phrases/hsk2-phrase-002.wav',
      promptFr: 'Quelle activité est décrite ?',
      promptEn: 'Which activity is described?',
      choices: ['Lire un livre', 'Cuisiner', 'Dormir', 'Prendre le métro'],
      correctChoiceIndex: 0
    },
    {
      id: 'daily-text-busy',
      type: 'text-mcq',
      promptFr: 'Quelle phrase signifie « Aujourd’hui je suis très occupé » ?',
      promptEn: 'Which sentence says “I’m very busy today”?',
      choices: ['今天我很忙。', '今天我不忙。', '我今天很忙吗？', '明天我很忙。'],
      correctChoiceIndex: 0
    },
    {
      id: 'daily-reconstruction',
      type: 'grammar',
      quiz: {
        type: 'sentence-reconstruction',
        translation: 'On se voit à dix heures.',
        translationEn: 'We meet at ten o’clock.',
        words: ['我们', '十点', '见', '。'],
        correctOrder: ['我们', '十点', '见', '。'],
        pinyin: 'wǒmen shí diǎn jiàn.'
      }
    }
  ],

  // ============================================
  // GRAMMAR LESSONS
  // ============================================
  'grammar-1-subject-verb': [
    {
      id: 'sv-order-mcq',
      type: 'text-mcq',
      promptFr: 'Quelle phrase respecte l’ordre Sujet + Verbe ?',
      promptEn: 'Which sentence keeps the Subject + Verb order?',
      choices: ['我喝茶', '喝我茶', '茶我喝', '喝茶我'],
      correctChoiceIndex: 0,
      explanationFr: 'En chinois, le sujet (我) vient toujours avant le verbe (喝).',
      explanationEn: 'The subject (我) must precede the verb (喝) in Chinese.'
    },
    {
      id: 'sv-translation',
      type: 'grammar',
      quiz: {
        type: 'translation-to-chinese',
        translation: 'Ils lisent un livre.',
        translationEn: 'They read a book.',
        correctAnswer: '他们看书',
        pinyin: 'tāmen kàn shū',
        choices: ['他们看书', '书他们看', '看书他们', '他们书看']
      }
    },
    {
      id: 'sv-reconstruction',
      type: 'grammar',
      quiz: {
        type: 'sentence-reconstruction',
        translation: 'Ma mère cuisine.',
        translationEn: 'My mother cooks.',
        words: ['妈妈', '做饭', '。'],
        correctOrder: ['妈妈', '做饭', '。'],
        pinyin: 'māma zuò fàn.'
      }
    }
  ],
  'grammar-1-negation': [
    {
      id: 'grammar-neg-translate-present',
      type: 'text-mcq',
      promptFr: 'Traduisez : « Je ne bois pas de café le soir. »',
      promptEn: 'Translate: "I do not drink coffee in the evening."',
      choices: [
        '我晚上不喝咖啡',
        '我晚上没喝咖啡',
        '我晚上喝咖啡',
        '我没晚上咖啡'
      ],
      correctChoiceIndex: 0,
      explanationFr: 'Action habituelle → on utilise 不.',
      explanationEn: 'Habitual action → use 不.'
    },
    {
      id: 'grammar-neg-translate-past',
      type: 'text-mcq',
      promptFr: 'Traduisez : « Je n’ai pas mangé ce matin. »',
      promptEn: 'Translate: "I did not eat this morning."',
      choices: [
        '我今天早上不吃饭',
        '我今天早上没吃饭',
        '我今天早上不吃饭啊',
        '我今天早上别吃饭'
      ],
      correctChoiceIndex: 1,
      explanationFr: 'On nie un fait passé → 没 + verbe.',
      explanationEn: 'Past action → use 没 before the verb.'
    },
    {
      id: 'grammar-negation-particle-mcq',
      type: 'text-mcq',
      promptFr: 'Quelle particule nie une action déjà accomplie ?',
      promptEn: 'Which particle negates a completed action?',
      choices: ['不', '没', '别', '吗'],
      correctChoiceIndex: 1,
      explanationFr: '没 (ou 没有) sert à nier le passé.',
      explanationEn: '没 (or 没有) is used for past negation.'
    },
    {
      id: 'grammar-neg-rebuild',
      type: 'grammar',
      quiz: {
        type: 'sentence-reconstruction',
        translation: 'Ils ne sont pas allés au restaurant hier.',
        translationEn: 'They didn’t go to the restaurant yesterday.',
        words: ['他们', '昨天', '去', '饭馆', '没'],
        correctOrder: ['他们', '昨天', '没', '去', '饭馆'],
        pinyin: 'tāmen zuótiān méi qù fànguǎn'
      }
    }
  ],
  'grammar-2-possession': [
    {
      id: 'possession-mcq',
      type: 'text-mcq',
      promptFr: 'Quelle option signifie « mon livre » ?',
      promptEn: 'Which option means “my book”?',
      choices: ['我的书', '我书的', '书我', '书我的'],
      correctChoiceIndex: 0,
      explanationFr: 'La structure est possesseur + 的 + chose possédée.',
      explanationEn: 'Use possessor + 的 + possessed item.'
    },
    {
      id: 'possession-fill',
      type: 'grammar',
      quiz: {
        type: 'fill-blank',
        sentence: '老师___名字很长。',
        translation: 'Le nom du professeur est long.',
        translationEn: 'The teacher’s name is long.',
        choices: ['的', '得', '地', '吗'],
        correctChoice: '的',
        pinyin: 'lǎoshī ___ míngzi hěn cháng.'
      }
    },
    {
      id: 'possession-reconstruction',
      type: 'grammar',
      quiz: {
        type: 'sentence-reconstruction',
        translation: 'Le livre de Marie',
        translationEn: "Mary's book",
        words: ['玛丽', '的', '书'],
        correctOrder: ['玛丽', '的', '书'],
        pinyin: 'Mǎlì de shū'
      }
    }
  ],
  'grammar-3-adjectives': [
    {
      id: 'adjective-mcq',
      type: 'text-mcq',
      promptFr: 'Quelle phrase est correcte ?',
      promptEn: 'Which sentence is correct?',
      choices: ['他很高', '他高很', '很他高', '他高'],
      correctChoiceIndex: 0,
      explanationFr: 'Les adjectifs prédicatifs sont précédés de 很.',
      explanationEn: 'Predicate adjectives need 很 before them.'
    },
    {
      id: 'adjective-fill',
      type: 'grammar',
      quiz: {
        type: 'fill-blank',
        sentence: '今天___热。',
        translation: 'Il fait chaud aujourd’hui.',
        translationEn: 'It is hot today.',
        choices: ['很', '在', '的', '会'],
        correctChoice: '很',
        pinyin: 'jīntiān ___ rè.'
      }
    },
    {
      id: 'adjective-translation',
      type: 'grammar',
      quiz: {
        type: 'translation-to-chinese',
        translation: 'Le chinois est difficile.',
        translationEn: 'Chinese is difficult.',
        correctAnswer: '中文很难',
        pinyin: 'zhōngwén hěn nán',
        choices: ['中文很难', '中文难', '很中文难', '难中文']
      }
    }
  ],
  'grammar-3-questions': [
    {
      id: 'ma-mcq',
      type: 'text-mcq',
      promptFr: 'Quelle phrase est une question oui/non correcte ?',
      promptEn: 'Which sentence is a correct yes/no question?',
      choices: ['你喜欢茶吗？', '你喜欢吗茶？', '你喜欢茶？吗', '吗你喜欢茶？'],
      correctChoiceIndex: 0,
      explanationFr: 'La particule 吗 se place à la fin de la phrase.',
      explanationEn: 'The particle 吗 is placed at the end.'
    },
    {
      id: 'ma-reconstruction',
      type: 'grammar',
      quiz: {
        type: 'sentence-reconstruction',
        translation: 'Es-tu professeur ?',
        translationEn: 'Are you a teacher?',
        words: ['你', '是', '老师', '吗', '？'],
        correctOrder: ['你', '是', '老师', '吗', '？'],
        pinyin: 'nǐ shì lǎoshī ma?'
      }
    }
  ],
  'grammar-4-location': [
    {
      id: 'zai-listening',
      type: 'listening',
      mode: 'dialogue',
      audio: 'audio/phrases/hsk1-phrase-021.wav',
      promptFr: 'Où se trouve la personne ?',
      promptEn: 'Where is the speaker?',
      choices: ['À la maison', 'À l’école', 'Au parc', 'Au restaurant'],
      correctChoiceIndex: 0,
      explanationFr: 'La phrase « 我在家 » signifie « Je suis à la maison ».',
      explanationEn: 'The sentence “我在家” means “I am at home.”'
    },
    {
      id: 'zai-fill',
      type: 'grammar',
      quiz: {
        type: 'fill-blank',
        sentence: '我___学校。',
        translation: 'Je suis à l’école.',
        translationEn: 'I am at school.',
        choices: ['在', '是', '有', '到'],
        correctChoice: '在',
        pinyin: 'wǒ ___ xuéxiào.'
      }
    }
  ],
  'grammar-7-measure-words': [
    {
      id: 'measure-mcq',
      type: 'text-mcq',
      promptFr: 'Quel spécificatif complète « deux ___ livres » ?',
      promptEn: 'Which measure word completes “two ___ books”?',
      choices: ['本', '杯', '个', '张'],
      correctChoiceIndex: 0,
      explanationFr: '本 est le spécificatif des livres et cahiers.',
      explanationEn: '本 is the classifier for books/notebooks.'
    },
    {
      id: 'measure-reconstruction',
      type: 'grammar',
      quiz: {
        type: 'sentence-reconstruction',
        translation: 'Trois tasses de thé.',
        translationEn: 'Three cups of tea.',
        words: ['三', '杯', '茶', '。'],
        correctOrder: ['三', '杯', '茶', '。'],
        pinyin: 'sān bēi chá.'
      }
    }
  ],
  'grammar-8-time-expressions': [
    {
      id: 'timeorder-mcq',
      type: 'text-mcq',
      promptFr: 'Quelle phrase respecte la position du groupe temporel ?',
      promptEn: 'Which sentence places the time expression correctly?',
      choices: ['我今天学习中文。', '我学习今天中文。', '今天我中文学习。', '学习我今天中文。'],
      correctChoiceIndex: 0,
      explanationFr: 'L’expression de temps (今天) se place après le sujet et avant le verbe.',
      explanationEn: 'The time expression (今天) goes after the subject and before the verb.'
    },
    {
      id: 'time-reconstruction',
      type: 'grammar',
      quiz: {
        type: 'sentence-reconstruction',
        translation: 'Nous dînons ce soir.',
        translationEn: 'We eat tonight.',
        words: ['我们', '晚上', '吃饭', '。'],
        correctOrder: ['我们', '晚上', '吃饭', '。'],
        pinyin: 'wǒmen wǎnshàng chīfàn.'
      }
    }
  ],

  // ============================================
  // RESTAURANT / DIALOGUES
  // ============================================
  'convo-1-restaurant': [
    {
      id: 'dialog-restaurant-greeting',
      type: 'listening',
      mode: 'dialogue',
      audio: 'audio/dialogues/restaurant_greeting.wav',
      promptFr: 'Quelle est la première question du serveur ?',
      promptEn: 'What is the waiter’s first question?',
      choices: [
        'Combien de personnes êtes-vous ?',
        'Que voulez-vous boire ?',
        'Avez-vous réservé ?',
        'Êtes-vous prêts à commander ?'
      ],
      correctChoiceIndex: 0,
      explanationFr: 'Le serveur demande « 请问几位？ »',
      explanationEn: 'The waiter says “请问几位?” (How many people?).'
    },
    {
      id: 'dialog-restaurant-order',
      type: 'listening',
      mode: 'dialogue',
      audio: 'audio/dialogues/restaurant_order.wav',
      promptFr: 'Que demande le client à la fin du dialogue ?',
      promptEn: 'What does the customer ask at the end of the dialogue?',
      choices: [
        'Une recommandation',
        'Plus de riz',
        'La note',
        'Un dessert'
      ],
      correctChoiceIndex: 2,
      explanationFr: 'Le client dit « 服务员，买单。 »',
      explanationEn: 'The customer says “服务员，买单。” (The bill, please).'
    }
  ],
  'convo-2-shopping': [
    {
      id: 'shopping-price-feedback',
      type: 'listening',
      mode: 'dialogue',
      audio: 'audio/phrases/hsk2-phrase-011.wav',
      promptFr: 'Qu’indique le client à propos du vêtement ?',
      promptEn: 'What does the customer say about the clothing?',
      choices: [
        'Il est trop cher.',
        'Il est parfait.',
        'Il est trop grand.',
        'Il est bleu.'
      ],
      correctChoiceIndex: 0,
      explanationFr: 'On entend « 这件衣服太贵了 » — le prix est jugé trop élevé.',
      explanationEn: 'The sentence “这件衣服太贵了” means the item is too expensive.'
    },
    {
      id: 'shopping-discount-text',
      type: 'text-mcq',
      promptFr: 'Quelle phrase demande une réduction polie ?',
      promptEn: 'Which sentence politely asks for a discount?',
      choices: ['能便宜一点吗？', '我喜欢这个。', '这是什么颜色？', '你在哪买？'],
      correctChoiceIndex: 0,
      explanationFr: '能便宜一点吗 signifie « Pouvez-vous baisser le prix ? »',
      explanationEn: '能便宜一点吗 literally asks “Can it be a little cheaper?”.'
    },
    {
      id: 'shopping-ticket-reconstruction',
      type: 'grammar',
      quiz: {
        type: 'sentence-reconstruction',
        translation: 'Je voudrais un billet.',
        translationEn: 'I would like one ticket.',
        words: ['我', '要', '一张', '票', '。'],
        correctOrder: ['我', '要', '一张', '票', '。'],
        pinyin: 'wǒ yào yì zhāng piào.'
      }
    }
  ],
  'convo-3-directions': [
    {
      id: 'directions-go-straight',
      type: 'listening',
      mode: 'dialogue',
      audio: 'audio/phrases/hsk2-phrase-023.wav',
      promptFr: 'Quelle indication est donnée ?',
      promptEn: 'What instruction is given?',
      choices: ['Allez tout droit.', 'Tournez à gauche.', 'Revenez en arrière.', 'Prenez le métro.'],
      correctChoiceIndex: 0,
      explanationFr: '一直往前走 signifie « Continuez tout droit ». ',
      explanationEn: '一直往前走 literally means “keep walking straight ahead”.'
    },
    {
      id: 'directions-target-mcq',
      type: 'text-mcq',
      promptFr: 'Quelle phrase indique clairement votre destination ?',
      promptEn: 'Which phrase clearly states your destination?',
      choices: ['我想去火车站。', '火车站是谁？', '火车站很贵。', '火车站很好吃。'],
      correctChoiceIndex: 0,
      explanationFr: '我想去火车站 signifie « Je veux aller à la gare ».',
      explanationEn: '我想去火车站 states “I want to go to the train station.”'
    },
    {
      id: 'directions-hospital-reconstruction',
      type: 'grammar',
      quiz: {
        type: 'sentence-reconstruction',
        translation: 'Où est l’hôpital ?',
        translationEn: 'Where is the hospital?',
        words: ['医院', '在', '哪里', '？'],
        correctOrder: ['医院', '在', '哪里', '？'],
        pinyin: 'yīyuàn zài nǎlǐ?'
      }
    }
  ],
  'convo-4-making-plans': [
    {
      id: 'plans-availability-audio',
      type: 'listening',
      mode: 'dialogue',
      audio: 'audio/phrases/hsk2-phrase-028.wav',
      promptFr: 'Quand la personne est-elle disponible ?',
      promptEn: 'When is the speaker available?',
      choices: ['Demain.', 'Aujourd’hui.', 'Ce soir.', 'La semaine prochaine.'],
      correctChoiceIndex: 0,
      explanationFr: 'La phrase « 明天我有时间 » indique une disponibilité demain.',
      explanationEn: '“明天我有时间” clearly says “I have time tomorrow.”'
    },
    {
      id: 'plans-time-choice',
      type: 'text-mcq',
      promptFr: 'Quelle phrase propose 15 h comme horaire ?',
      promptEn: 'Which sentence proposes 3 PM?',
      choices: [
        '下午三点怎么样？',
        '下午三点去哪里？',
        '下午三点太晚了。',
        '下午三点没有人。'
      ],
      correctChoiceIndex: 0,
      explanationFr: '怎么样 exprime une proposition (« Que dirais-tu de… »).',
      explanationEn: 'Using 怎么样 introduces “How about 3 PM?”.'
    },
    {
      id: 'plans-meet-reconstruction',
      type: 'grammar',
      quiz: {
        type: 'sentence-reconstruction',
        translation: 'Quand se voit-on ?',
        translationEn: 'When shall we meet?',
        words: ['我们', '什么时候', '见面', '？'],
        correctOrder: ['我们', '什么时候', '见面', '？'],
        pinyin: 'wǒmen shénme shíhou jiànmiàn?'
      }
    }
  ],
  'convo-5-phone-call': [
    {
      id: 'phone-slowly-audio',
      type: 'listening',
      mode: 'dialogue',
      audio: 'audio/phrases/hsk2-phrase-017.wav',
      promptFr: 'Que demande l’interlocuteur ?',
      promptEn: 'What does the speaker ask?',
      choices: [
        'Parlez plus lentement.',
        'Raccrochez maintenant.',
        'Envoyez un message.',
        'Répondez demain.'
      ],
      correctChoiceIndex: 0,
      explanationFr: '请说慢一点 signifie « Parlez plus lentement ». ',
      explanationEn: 'The line “请说慢一点” is literally “Please speak slower.”'
    },
    {
      id: 'phone-understand-mcq',
      type: 'text-mcq',
      promptFr: 'Quelle phrase exprime un problème de compréhension ?',
      promptEn: 'Which sentence signals you don’t understand?',
      choices: ['我听不懂。', '我会听懂。', '我在听音乐。', '我喜欢电话。'],
      correctChoiceIndex: 0,
      explanationFr: '听不懂 = « ne pas comprendre ce qu’on entend ».',
      explanationEn: '听不懂 literally means “unable to understand what is heard.”'
    },
    {
      id: 'phone-ask-activity',
      type: 'grammar',
      quiz: {
        type: 'sentence-reconstruction',
        translation: 'Que fais-tu ?',
        translationEn: 'What are you doing?',
        words: ['你', '在', '做', '什么', '？'],
        correctOrder: ['你', '在', '做', '什么', '？'],
        pinyin: 'nǐ zài zuò shénme?'
      }
    }
  ],
  'convo-6-doctor': [
    {
      id: 'doctor-feel-bad-audio',
      type: 'listening',
      mode: 'dialogue',
      audio: 'audio/phrases/hsk2-phrase-032.wav',
      promptFr: 'Que dit le patient ?',
      promptEn: 'What does the patient say?',
      choices: [
        'Il ne se sent pas bien.',
        'Il va mieux.',
        'Il veut manger.',
        'Il va voyager.'
      ],
      correctChoiceIndex: 0,
      explanationFr: '我身体不舒服 = « Je ne me sens pas bien ». ',
      explanationEn: '我身体不舒服 translates to “My body doesn’t feel well.”'
    },
    {
      id: 'doctor-advice-mcq',
      type: 'text-mcq',
      promptFr: 'Quelle phrase conseille de consulter un médecin ?',
      promptEn: 'Which sentence tells someone to see a doctor?',
      choices: ['你应该去看医生。', '你应该多吃饭。', '你应该去工作。', '你应该去买东西。'],
      correctChoiceIndex: 0,
      explanationFr: '去看医生 = aller consulter.',
      explanationEn: '去看医生 literally means “to go see a doctor.”'
    },
    {
      id: 'doctor-rest-reconstruction',
      type: 'grammar',
      quiz: {
        type: 'sentence-reconstruction',
        translation: 'Je veux me reposer un peu.',
        translationEn: 'I want to rest for a while.',
        words: ['我', '想', '休息', '一下', '。'],
        correctOrder: ['我', '想', '休息', '一下', '。'],
        pinyin: 'wǒ xiǎng xiūxi yíxià.'
      }
    }
  ],
  'convo-7-weather-talk': [
    {
      id: 'weather-rain-audio',
      type: 'listening',
      mode: 'dialogue',
      audio: 'audio/phrases/hsk2-phrase-040.wav',
      promptFr: 'Quelle information donne la personne ?',
      promptEn: 'What information does the speaker give?',
      choices: ['Il pleut dehors.', 'Il neige.', 'Il fait très chaud.', 'Il fait nuit.'],
      correctChoiceIndex: 0,
      explanationFr: '外面下雨了 = « Il pleut dehors ». ',
      explanationEn: '外面下雨了 literally says “It is raining outside.”'
    },
    {
      id: 'weather-umbrella-mcq',
      type: 'text-mcq',
      promptFr: 'Laquelle rappelle de prendre un parapluie ?',
      promptEn: 'Which one reminds someone to bring an umbrella?',
      choices: ['别忘了带伞。', '别忘了吃饭。', '别忘了回家。', '别忘了写字。'],
      correctChoiceIndex: 0,
      explanationFr: '带伞 = « prendre un parapluie ». ',
      explanationEn: '带伞 literally means “bring an umbrella”.'
    },
    {
      id: 'weather-cold-reconstruction',
      type: 'grammar',
      quiz: {
        type: 'sentence-reconstruction',
        translation: 'Je trouve qu’il fait très froid.',
        translationEn: 'I feel it is very cold.',
        words: ['我', '觉得', '很冷', '。'],
        correctOrder: ['我', '觉得', '很冷', '。'],
        pinyin: 'wǒ juéde hěn lěng.'
      }
    }
  ],
  'convo-8-complaints': [
    {
      id: 'complaint-room-audio',
      type: 'listening',
      mode: 'dialogue',
      audio: 'audio/phrases/hsk2-phrase-036.wav',
      promptFr: 'Que souhaite faire le client ?',
      promptEn: 'What does the customer want to do?',
      choices: ['Changer de chambre.', 'Payer plus cher.', 'Nettoyer la chambre.', 'Dormir immédiatement.'],
      correctChoiceIndex: 0,
      explanationFr: '我想换一个房间 = « Je veux changer de chambre ». ',
      explanationEn: '我想换一个房间 expresses the desire to change rooms.'
    },
    {
      id: 'complaint-need-help-mcq',
      type: 'text-mcq',
      promptFr: 'Quelle phrase ouvre une demande d’aide ?',
      promptEn: 'Which phrase opens a help request?',
      choices: ['我需要帮助。', '我想帮助你。', '我没有问题。', '我在房间。'],
      correctChoiceIndex: 0,
      explanationFr: 'La phrase signifie littéralement « J’ai besoin d’aide ». ',
      explanationEn: 'It clearly states “I need help.”'
    },
    {
      id: 'complaint-ask-help-reconstruction',
      type: 'grammar',
      quiz: {
        type: 'sentence-reconstruction',
        translation: 'Peux-tu m’aider ?',
        translationEn: 'Can you help me?',
        words: ['你', '能', '帮', '我', '吗', '？'],
        correctOrder: ['你', '能', '帮', '我', '吗', '？'],
        pinyin: 'nǐ néng bāng wǒ ma?'
      }
    }
  ],
  'convo-9-invitations': [
    {
      id: 'invitation-hiking-audio',
      type: 'listening',
      mode: 'dialogue',
      audio: 'audio/phrases/hsk2-phrase-050.wav',
      promptFr: 'Quelle activité est proposée ?',
      promptEn: 'What activity is being planned?',
      choices: ['Aller randonner.', 'Aller travailler.', 'Aller dormir.', 'Aller faire les courses.'],
      correctChoiceIndex: 0,
      explanationFr: '我打算去爬山 = « Je prévois d’aller randonner ». ',
      explanationEn: 'The sentence clearly states a plan to go hiking.'
    },
    {
      id: 'invitation-weekend-mcq',
      type: 'text-mcq',
      promptFr: 'Comment demander les projets du week-end ?',
      promptEn: 'How do you ask for someone’s weekend plans?',
      choices: [
        '周末你有什么打算？',
        '周末你什么时候？',
        '周末你几点？',
        '周末你在哪里？'
      ],
      correctChoiceIndex: 0,
      explanationFr: '有什么打算 = « Quels projets as-tu ». ',
      explanationEn: 'The structure asks “What plans do you have?”.'
    },
    {
      id: 'invitation-accept-reconstruction',
      type: 'grammar',
      quiz: {
        type: 'sentence-reconstruction',
        translation: 'Pas de problème, allons-y ensemble.',
        translationEn: 'No problem, let’s go together.',
        words: ['没问题', '，', '我们', '一起', '去', '吧', '。'],
        correctOrder: ['没问题', '，', '我们', '一起', '去', '吧', '。'],
        pinyin: 'méi wèntí, wǒmen yìqǐ qù ba.'
      }
    }
  ],
  'convo-10-opinions': [
    {
      id: 'opinion-work-audio',
      type: 'listening',
      mode: 'dialogue',
      audio: 'audio/phrases/hsk2-phrase-046.wav',
      promptFr: 'Que pense la personne de son travail ?',
      promptEn: 'What does the speaker think about their job?',
      choices: [
        'Il est très intéressant.',
        'Il est ennuyeux.',
        'Il est trop loin.',
        'Il est terminé.'
      ],
      correctChoiceIndex: 0,
      explanationFr: '工作很有意思 = « Le travail est intéressant ». ',
      explanationEn: 'The line explicitly says the work is interesting.'
    },
    {
      id: 'opinion-hard-question-mcq',
      type: 'text-mcq',
      promptFr: 'Quelle phrase exprime qu’une question est difficile ?',
      promptEn: 'Which sentence states that a question is difficult?',
      choices: ['这个问题很难。', '这个问题很好。', '这个问题很冷。', '这个问题很贵。'],
      correctChoiceIndex: 0,
      explanationFr: '很难 = « très difficile ». ',
      explanationEn: '很难 directly translates to “very difficult”.'
    },
    {
      id: 'opinion-compliment-reconstruction',
      type: 'grammar',
      quiz: {
        type: 'sentence-reconstruction',
        translation: 'Tu parles très bien chinois.',
        translationEn: 'You speak Chinese very well.',
        words: ['你', '的', '汉语', '说得', '很好', '。'],
        correctOrder: ['你', '的', '汉语', '说得', '很好', '。'],
        pinyin: 'nǐ de hànyǔ shuō de hěn hǎo.'
      }
    }
  ]
};
