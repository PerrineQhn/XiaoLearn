import type { LessonExercise } from '../types';
import { level1LessonExercises as level1CourseExercises } from './level1-course';
import { cecrExercisesFull } from './cecr-exercises';

export const lessonExercises: Record<string, LessonExercise[]> = {
  ...level1CourseExercises,
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
      id: 'dinner-reconstruction',
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
    },
    {
      id: 'convo-10-opinions-dialogue',
      type: 'dialogue',
      mode: 'display',
      promptFr: 'Dialogue : Donner son avis',
      promptEn: 'Dialogue: Giving Opinions',
      context: 'Débattre d\'un film',
      contextEn: 'Debating a movie',
      dialogue: [
        { speaker: 'A', speakerName: '小明', text: '你觉得这部电影怎么样？', pinyin: 'Nǐ juéde zhè bù diànyǐng zěnmeyàng?', translationFr: 'Que penses-tu de ce film ?' },
        { speaker: 'B', speakerName: '小红', text: '我觉得很好看！故事很有意思。', pinyin: 'Wǒ juéde hěn hǎo kàn! Gùshi hěn yǒu yìsi.', translationFr: 'Je trouve ça très bien ! L\'histoire est intéressante.' },
        { speaker: 'A', speakerName: '小明', text: '真的吗？我认为有点无聊。', pinyin: 'Zhēn de ma? Wǒ rènwéi yǒudiǎn wúliáo.', translationFr: 'Vraiment ? Je trouve ça un peu ennuyeux.' },
        { speaker: 'B', speakerName: '小红', text: '哈哈，我们看法不同！', pinyin: 'Hāhā, wǒmen kànfǎ bù tóng!', translationFr: 'Ha ha, nos avis diffèrent !' },
      ],
    }
  ]
};

const createL2TextAndFillExercises = (
  lessonId: string,
  mcqPromptFr: string,
  mcqPromptEn: string,
  mcqChoices: string[],
  mcqCorrectIndex: number,
  fillSentence: string,
  fillTranslationFr: string,
  fillTranslationEn: string,
  fillChoices: string[],
  fillCorrectChoice: string,
  fillPinyin: string,
  listening?: {
    audio: string;
    promptFr: string;
    promptEn: string;
    choices: string[];
    correctChoiceIndex: number;
    explanationFr?: string;
    explanationEn?: string;
  }
): LessonExercise[] => {
  const completedFillSentence = fillSentence.replace('___', fillCorrectChoice);
  const exercises: LessonExercise[] = [];

  if (listening) {
    exercises.push({
      id: `${lessonId}-listening`,
      type: 'listening',
      mode: 'dialogue',
      audio: listening.audio,
      promptFr: listening.promptFr,
      promptEn: listening.promptEn,
      choices: listening.choices,
      correctChoiceIndex: listening.correctChoiceIndex,
      explanationFr: listening.explanationFr,
      explanationEn: listening.explanationEn
    });
  }

  exercises.push(
    {
      id: `${lessonId}-mcq`,
      type: 'text-mcq',
      promptFr: mcqPromptFr,
      promptEn: mcqPromptEn,
      choices: mcqChoices,
      correctChoiceIndex: mcqCorrectIndex
    },
    {
      id: `${lessonId}-fill`,
      type: 'grammar',
      quiz: {
        type: 'fill-blank',
        sentence: fillSentence,
        translation: fillTranslationFr,
        translationEn: fillTranslationEn,
        choices: fillChoices,
        correctChoice: fillCorrectChoice,
        pinyin: fillPinyin
      }
    },
    {
      id: `${lessonId}-dialogue`,
      type: 'dialogue',
      mode: 'display',
      promptFr: 'Mini-dialogue de mise en pratique',
      promptEn: 'Practice mini-dialogue',
      context: 'Utilisation naturelle de la structure dans une conversation courte',
      contextEn: 'Natural use of the structure in a short conversation',
      dialogue: [
        {
          speaker: 'A',
          speakerName: 'A',
          text: '我们来练习这个表达吧。',
          pinyin: 'Wǒmen lái liànxí zhège biǎodá ba.',
          translationFr: 'On s’entraîne avec cette expression ?',
          translationEn: 'Shall we practice this expression?'
        },
        {
          speaker: 'B',
          speakerName: 'B',
          text: mcqChoices[mcqCorrectIndex] ?? '',
          translationFr: 'Exemple naturel de la structure.',
          translationEn: 'Natural example of the target structure.'
        },
        {
          speaker: 'A',
          speakerName: 'A',
          text: completedFillSentence,
          translationFr: fillTranslationFr,
          translationEn: fillTranslationEn
        }
      ]
    }
  );

  return exercises;
};

const level2PlanExercises: Record<string, LessonExercise[]> = {
  'zh-l2-g01': createL2TextAndFillExercises(
    'zh-l2-g01',
    'Quelle phrase exprime correctement le futur ?',
    'Which sentence correctly expresses the future?',
    ['我明天会去学校。', '我明天在去学校。', '我明天去了学校。', '我明天的去学校。'],
    0,
    '明天我___去上课。',
    'Demain, j’irai en cours.',
    'Tomorrow, I will go to class.',
    ['会', '在', '了', '的'],
    '会',
    'míngtiān wǒ ___ qù shàngkè.',
    {
      audio: 'audio/phrases/hsk2-phrase-028.wav',
      promptFr: 'Quand la personne est-elle disponible ?',
      promptEn: 'When is the speaker available?',
      choices: ['Demain.', 'Aujourd’hui.', 'Hier.', 'Le mois prochain.'],
      correctChoiceIndex: 0,
      explanationFr: '« 明天我有时间 » évoque une action future.',
      explanationEn: '“明天我有时间” clearly points to the future.'
    }
  ),
  'zh-l2-g02': createL2TextAndFillExercises(
    'zh-l2-g02',
    'Quelle phrase utilise correctement la particule d’objet 把 ?',
    'Which sentence correctly uses the object particle 把?',
    ['我把书放在桌子上。', '我书把放在桌子上。', '我在把书桌子上。', '我把在书桌子上。'],
    0,
    '他___书放在桌子上。',
    'Il pose le livre sur la table.',
    'He puts the book on the table.',
    ['把', '在', '了', '吗'],
    '把',
    'tā ___ shū fàng zài zhuōzi shàng.'
  ),
  'zh-l2-g03': createL2TextAndFillExercises(
    'zh-l2-g03',
    'Quelle phrase relie correctement deux actions ?',
    'Which sentence correctly links two actions?',
    ['我先吃饭，然后去学习。', '我先吃饭，所以去学习然后。', '我先吃饭但是去学习因为。', '我先吃饭跟去学习。'],
    0,
    '我先吃饭，___去学习。',
    'Je mange d’abord, puis je vais étudier.',
    'I eat first, then I go study.',
    ['然后', '因为', '但是', '把'],
    '然后',
    'wǒ xiān chīfàn, ___ qù xuéxí.'
  ),
  'zh-l2-g04': createL2TextAndFillExercises(
    'zh-l2-g04',
    'Quelle phrase signifie « Je vais avec mon ami » ?',
    'Which sentence means “I go with my friend”?',
    ['我跟朋友一起去。', '我把朋友一起去。', '我在朋友一起去。', '我比朋友一起去。'],
    0,
    '我___朋友一起喝茶。',
    'Je bois le thé avec un ami.',
    'I drink tea with a friend.',
    ['跟', '把', '被', '吗'],
    '跟',
    'wǒ ___ péngyou yìqǐ hē chá.'
  ),
  'zh-l2-g05': createL2TextAndFillExercises(
    'zh-l2-g05',
    'Quelle phrase exprime un contraste avec « mais » ?',
    'Which sentence expresses contrast with “but”?',
    ['我想去，但是今天很忙。', '我想去，所以今天很忙。', '我想去，然后今天很忙。', '我想去，跟今天很忙。'],
    0,
    '我喜欢咖啡，___今天喝茶。',
    'J’aime le café, mais aujourd’hui je bois du thé.',
    'I like coffee, but today I drink tea.',
    ['但是', '所以', '然后', '因为'],
    '但是',
    'wǒ xǐhuān kāfēi, ___ jīntiān hē chá.'
  ),
  'zh-l2-g06': createL2TextAndFillExercises(
    'zh-l2-g06',
    'Quelle phrase signifie « J’envoie un message à mon professeur » ?',
    'Which sentence means “I send a message to my teacher”?',
    ['我给老师发消息。', '我从老师发消息。', '我把老师发消息。', '我跟老师发消息给。'],
    0,
    '这本书是我___朋友借的。',
    'Ce livre, je l’ai emprunté à un ami.',
    'I borrowed this book from a friend.',
    ['从', '给', '把', '在'],
    '从',
    'zhè běn shū shì wǒ ___ péngyou jiè de.'
  ),
  'zh-l2-g07': createL2TextAndFillExercises(
    'zh-l2-g07',
    'Quelle phrase exprime une action en cours ?',
    'Which sentence expresses an ongoing action?',
    ['我在看书呢。', '我看书了呢。', '我会看书呢。', '我把书看呢。'],
    0,
    '我___做饭呢。',
    'Je suis en train de cuisiner.',
    'I am cooking right now.',
    ['在', '把', '会', '得'],
    '在',
    'wǒ ___ zuòfàn ne.'
  ),
  'zh-l2-g08': createL2TextAndFillExercises(
    'zh-l2-g08',
    'Quelle phrase signifie « Moi aussi, j’aime ce film » ?',
    'Which sentence means “I also like this movie”?',
    ['我也喜欢这个电影。', '我都喜欢这个电影。', '我只喜欢这个电影也。', '我还这个电影喜欢。'],
    0,
    '他去，我___去。',
    'Il y va, moi aussi.',
    'He goes, I go too.',
    ['也', '都', '还', '再'],
    '也',
    'tā qù, wǒ ___ qù.'
  ),
  'zh-l2-g09': createL2TextAndFillExercises(
    'zh-l2-g09',
    'Quelle phrase est correcte avec 还 (« encore / toujours ») ?',
    'Which sentence is correct with 还 (“still”)?',
    ['我还没吃饭。', '我也没吃饭还。', '我都没吃饭还。', '我把没吃饭还。'],
    0,
    '现在八点，他___在办公室。',
    'Il est 8h et il est encore au bureau.',
    'It is 8 PM and he is still at the office.',
    ['还', '也', '都', '再'],
    '还',
    'xiànzài bā diǎn, tā ___ zài bàngōngshì.'
  ),
  'zh-l2-g10': createL2TextAndFillExercises(
    'zh-l2-g10',
    'Quelle phrase signifie « Je bois seulement de l’eau » ?',
    'Which sentence means “I only drink water”?',
    ['我只喝水。', '我都喝水。', '我还喝水。', '我更喝水。'],
    0,
    '今天我___有十分钟。',
    'Aujourd’hui, je n’ai que dix minutes.',
    'Today, I only have ten minutes.',
    ['只', '都', '还', '更'],
    '只',
    'jīntiān wǒ ___ yǒu shí fēnzhōng.'
  ),
  'zh-l2-g11': createL2TextAndFillExercises(
    'zh-l2-g11',
    'Quelle phrase exprime « ne pas pouvoir » ?',
    'Which sentence expresses “cannot”?',
    ['我今天不能来。', '我今天不会来着。', '我今天把来。', '我今天在来吗。'],
    0,
    '今天我生病了，___去上班。',
    'Je suis malade aujourd’hui, je ne peux pas aller travailler.',
    'I am sick today, I cannot go to work.',
    ['不能', '会', '要', '在'],
    '不能',
    'jīntiān wǒ shēngbìng le, ___ qù shàngbān.'
  ),
  'zh-l2-g12': createL2TextAndFillExercises(
    'zh-l2-g12',
    'Quelle phrase signifie « Il est bon en cuisine » ?',
    'Which sentence means “He is good at cooking”?',
    ['他擅长做饭。', '他做饭很会。', '他在做饭擅长。', '他把做饭擅长。'],
    0,
    '我___数学，不擅长历史。',
    'Je suis bon en maths, pas en histoire.',
    'I am good at math, not good at history.',
    ['擅长', '喜欢', '正在', '只有'],
    '擅长',
    'wǒ ___ shùxué, bù shàncháng lìshǐ.'
  ),
  'zh-l2-g13': createL2TextAndFillExercises(
    'zh-l2-g13',
    'Quelle phrase transforme un verbe en nom ?',
    'Which sentence turns a verb into a noun?',
    ['学习中文很有意思。', '我学习中文很有意思。', '学习了中文很有意思。', '在学习中文很有意思。'],
    0,
    '___中文需要时间。',
    'Apprendre le chinois demande du temps.',
    'Learning Chinese takes time.',
    ['学习', '学习了', '在学习', '会学习'],
    '学习',
    '___ zhōngwén xūyào shíjiān.'
  ),
  'zh-l2-g14': createL2TextAndFillExercises(
    'zh-l2-g14',
    'Quelle phrase exprime une obligation ?',
    'Which sentence expresses obligation?',
    ['你应该早点睡。', '你在早点睡。', '你把早点睡。', '你会早点睡吗。'],
    0,
    '我明天考试，今天___复习。',
    'J’ai un examen demain, je dois réviser aujourd’hui.',
    'I have an exam tomorrow, I must review today.',
    ['得', '在', '了', '把'],
    '得',
    'wǒ míngtiān kǎoshì, jīntiān ___ fùxí.'
  ),
  'zh-l2-g15': createL2TextAndFillExercises(
    'zh-l2-g15',
    'Quelle phrase compare correctement deux choses ?',
    'Which sentence correctly compares two things?',
    ['今天比昨天冷。', '今天昨天比冷。', '今天很比昨天冷。', '今天把昨天冷比。'],
    0,
    '这本书___那本书贵。',
    'Ce livre est plus cher que celui-là.',
    'This book is more expensive than that one.',
    ['比', '把', '跟', '在'],
    '比',
    'zhè běn shū ___ nà běn shū guì.'
  ),
  'zh-l2-g16': createL2TextAndFillExercises(
    'zh-l2-g16',
    'Quelle phrase exprime clairement un goût ?',
    'Which sentence clearly expresses a preference?',
    ['我最喜欢听音乐。', '我在喜欢听音乐。', '我把喜欢听音乐。', '我喜欢最听音乐。'],
    0,
    '我___看电影。',
    'J’aime regarder des films.',
    'I like watching movies.',
    ['喜欢', '在', '会', '给'],
    '喜欢',
    'wǒ ___ kàn diànyǐng.'
  ),
  'zh-l2-g17': createL2TextAndFillExercises(
    'zh-l2-g17',
    'Quelle phrase utilise correctement la condition « si » ?',
    'Which sentence correctly uses the condition “if”?',
    ['如果下雨，我们就在家。', '下雨如果，我们就在家。', '我们如果下雨就在家吗。', '如果我们在下雨就家。'],
    0,
    '___你有时间，我们一起吃饭。',
    'Si tu as le temps, on mange ensemble.',
    'If you have time, we eat together.',
    ['如果', '所以', '但是', '虽然'],
    '如果',
    '___ nǐ yǒu shíjiān, wǒmen yìqǐ chīfàn.'
  ),
  'zh-l2-g18': createL2TextAndFillExercises(
    'zh-l2-g18',
    'Quelle phrase exprime « déjà » ?',
    'Which sentence expresses “already”?',
    ['我已经吃饭了。', '我还吃饭了。', '我再吃饭了。', '我只吃饭了。'],
    0,
    '他___在办公室。',
    'Il est encore au bureau.',
    'He is still at the office.',
    ['还', '把', '被', '才'],
    '还',
    'tā ___ zài bàngōngshì.'
  ),
  'zh-l2-g19': createL2TextAndFillExercises(
    'zh-l2-g19',
    'Quelle phrase est un impératif poli ?',
    'Which sentence is a polite imperative?',
    ['请坐。', '坐请。', '请在坐。', '请把坐。'],
    0,
    '___慢一点说。',
    'Parlez un peu plus lentement, s’il vous plaît.',
    'Please speak a bit more slowly.',
    ['请', '把', '在', '得'],
    '请',
    '___ màn yìdiǎn shuō.',
    {
      audio: 'audio/phrases/hsk2-phrase-017.wav',
      promptFr: 'Quelle demande polie entends-tu ?',
      promptEn: 'Which polite request do you hear?',
      choices: ['Parlez plus lentement.', 'Parlez plus fort.', 'Répétez demain.', 'Attendez dehors.'],
      correctChoiceIndex: 0,
      explanationFr: '« 请说慢一点 » est un impératif poli.',
      explanationEn: '“请说慢一点” is a polite imperative.'
    }
  ),
  'zh-l2-g20': createL2TextAndFillExercises(
    'zh-l2-g20',
    'Quelle phrase signifie « S’il te plaît, fais-le pour moi » ?',
    'Which sentence means “Please do it for me”?',
    ['请帮我做一下。', '请我帮做一下。', '帮请我做一下。', '请做我帮一下。'],
    0,
    '请___我买一杯咖啡。',
    'S’il te plaît, achète-moi un café.',
    'Please buy me a coffee.',
    ['帮', '比', '被', '从'],
    '帮',
    'qǐng ___ wǒ mǎi yì bēi kāfēi.',
    {
      audio: 'audio/phrases/hsk2-phrase-007.wav',
      promptFr: 'Que demande la personne ?',
      promptEn: 'What is the person asking for?',
      choices: ['Un café, s’il vous plaît.', 'Un thé, s’il vous plaît.', 'Un billet de train.', 'Une chambre.'],
      correctChoiceIndex: 0,
      explanationFr: 'La phrase contient « 请给我一杯咖啡 ».',
      explanationEn: 'The sentence includes “请给我一杯咖啡”.'
    }
  ),
  'zh-l2-g21': createL2TextAndFillExercises(
    'zh-l2-g21',
    'Quelle question demande la manière de faire ?',
    'Which question asks for the method?',
    ['这个菜怎么做？', '这个菜谁做？', '这个菜几做？', '这个菜哪做？'],
    0,
    '你___去学校？',
    'Comment vas-tu à l’école ?',
    'How do you go to school?',
    ['怎么', '多少', '哪里', '谁'],
    '怎么',
    'nǐ ___ qù xuéxiào?'
  ),
  'zh-l2-g22': createL2TextAndFillExercises(
    'zh-l2-g22',
    'Quelle phrase signifie « Ils sont tous venus » ?',
    'Which sentence means “They all came”?',
    ['他们都来了。', '他们只来了。', '他们还来了都。', '他们来了更。'],
    0,
    '我们___准备好了。',
    'Nous sommes tous prêts.',
    'We are all ready.',
    ['都', '只', '把', '被'],
    '都',
    'wǒmen ___ zhǔnbèi hǎo le.'
  ),
  'zh-l2-g23': createL2TextAndFillExercises(
    'zh-l2-g23',
    'Quelle phrase exprime une interdiction ?',
    'Which sentence expresses prohibition?',
    ['别说话。', '会说话。', '在说话。', '跟说话。'],
    0,
    '___迟到。',
    'N’arrive pas en retard.',
    'Do not be late.',
    ['别', '会', '在', '跟'],
    '别',
    '___ chídào.'
  ),

  'zh-l2-v01': createL2TextAndFillExercises(
    'zh-l2-v01',
    'Quel mot signifie « mercredi » ?',
    'Which word means “Wednesday”?',
    ['星期三', '星期一', '星期五', '星期天'],
    0,
    '今天星期___。',
    'Aujourd’hui, nous sommes lundi.',
    'Today is Monday.',
    ['一', '二', '四', '六'],
    '一',
    'jīntiān xīngqī ___.'
  ),
  'zh-l2-v02': createL2TextAndFillExercises(
    'zh-l2-v02',
    'Quelle phrase signifie « Je ne suis pas du tout fatigué » ?',
    'Which sentence means “I am not tired at all”?',
    ['我一点也不累。', '我不太累一点。', '我有点不累。', '我真不太累了。'],
    0,
    '这个电影___有意思。',
    'Ce film est vraiment intéressant.',
    'This movie is really interesting.',
    ['真', '有点', '不太', '一点也不'],
    '真',
    'zhège diànyǐng ___ yǒu yìsi.'
  ),
  'zh-l2-v03': createL2TextAndFillExercises(
    'zh-l2-v03',
    'Quelle phrase contient « quelqu’un » ?',
    'Which sentence contains “someone”?',
    ['门外有人。', '门外有东西。', '门外有地方。', '门外有一天。'],
    0,
    '冰箱里___可以吃。',
    'Il y a quelque chose à manger dans le frigo.',
    'There is something to eat in the fridge.',
    ['有东西', '有人', '有地方', '有一天'],
    '有东西',
    'bīngxiāng lǐ ___ kěyǐ chī.'
  ),

  'zh-l2-n01': createL2TextAndFillExercises(
    'zh-l2-n01',
    'Quelle phrase dit correctement l’heure ?',
    'Which sentence tells the time correctly?',
    ['现在是三点半。', '现在是三月半。', '现在是三号半。', '现在是三岁半。'],
    0,
    '现在三___。',
    'Il est 3 heures maintenant.',
    'It is 3 o’clock now.',
    ['点', '月', '号', '岁'],
    '点',
    'xiànzài sān ___.',
    {
      audio: 'audio/phrases/hsk1-phrase-018.wav',
      promptFr: 'Quelle heure entends-tu ?',
      promptEn: 'What time do you hear?',
      choices: ['Trois heures.', 'Cinq heures.', 'Neuf heures.', 'Midi.'],
      correctChoiceIndex: 0,
      explanationFr: 'L’audio dit « 现在三点 ».',
      explanationEn: 'The audio says “现在三点”.'
    }
  ),
  'zh-l2-n02': createL2TextAndFillExercises(
    'zh-l2-n02',
    'Quel classificateur convient pour les livres ?',
    'Which measure word is used for books?',
    ['一本书', '一杯书', '一件书', '一口书'],
    0,
    '我买了两___书。',
    'J’ai acheté deux livres.',
    'I bought two books.',
    ['本', '杯', '件', '口'],
    '本',
    'wǒ mǎi le liǎng ___ shū.'
  ),
  'zh-l2-n03': createL2TextAndFillExercises(
    'zh-l2-n03',
    'Quelle question demande la date ?',
    'Which question asks for the date?',
    ['今天几月几号？', '今天几点几分？', '今天谁在这儿？', '今天怎么去？'],
    0,
    '今天是五月一___。',
    'Aujourd’hui, c’est le 1er mai.',
    'Today is May 1st.',
    ['号', '点', '个', '岁'],
    '号',
    'jīntiān shì wǔ yuè yī ___.'
  ),

  'zh-l2-c01': [
    {
      id: 'zh-l2-c01-listening',
      type: 'listening',
      mode: 'dialogue',
      audio: 'audio/phrases/intro_nijiaoshenme.wav',
      promptFr: 'Quelle question d’introduction entends-tu ?',
      promptEn: 'Which introduction question do you hear?',
      choices: ['Comment tu t’appelles ?', 'Où habites-tu ?', 'Quel âge as-tu ?', 'Que manges-tu ?'],
      correctChoiceIndex: 0,
      explanationFr: '« 你叫什么名字？ » sert à demander le nom.',
      explanationEn: '“你叫什么名字？” is used to ask someone’s name.'
    },
    {
      id: 'zh-l2-c01-mcq',
      type: 'text-mcq',
      promptFr: 'Quelle phrase convient pour se présenter poliment ?',
      promptEn: 'Which sentence is appropriate for a polite self-introduction?',
      choices: ['你好，我叫李明。', '你好，我在李明。', '你好，我把李明。', '你好，我会李明。'],
      correctChoiceIndex: 0
    },
    {
      id: 'zh-l2-c01-reconstruction',
      type: 'grammar',
      quiz: {
        type: 'sentence-reconstruction',
        translation: 'Bonjour, je m’appelle Marie, ravi de te rencontrer.',
        translationEn: 'Hello, my name is Marie, nice to meet you.',
        words: ['你好', '，', '我', '叫', '玛丽', '，', '很高兴', '认识', '你', '。'],
        correctOrder: ['你好', '，', '我', '叫', '玛丽', '，', '很高兴', '认识', '你', '。'],
        pinyin: 'nǐhǎo, wǒ jiào Mǎlì, hěn gāoxìng rènshi nǐ.'
      }
    },
    {
      id: 'zh-l2-c01-dialogue',
      type: 'dialogue',
      mode: 'display',
      promptFr: 'Dialogue : Se présenter',
      promptEn: 'Dialogue: Introducing Yourself',
      context: 'Première rencontre entre deux personnes',
      contextEn: 'First meeting between two people',
      dialogue: [
        { speaker: 'A', speakerName: 'A', text: '你好，我叫安娜。', pinyin: 'Nǐhǎo, wǒ jiào Ānnà.', translationFr: 'Bonjour, je m’appelle Anna.', translationEn: 'Hello, my name is Anna.' },
        { speaker: 'B', speakerName: 'B', text: '你好，我是保罗。很高兴认识你。', pinyin: 'Nǐhǎo, wǒ shì Bǎoluó. Hěn gāoxìng rènshi nǐ.', translationFr: 'Bonjour, je suis Paul. Ravi de te rencontrer.', translationEn: 'Hello, I am Paul. Nice to meet you.' },
        { speaker: 'A', speakerName: 'A', text: '我也很高兴认识你。', pinyin: 'Wǒ yě hěn gāoxìng rènshi nǐ.', translationFr: 'Moi aussi, ravie de te rencontrer.', translationEn: 'Nice to meet you too.' }
      ]
    }
  ]
};

type Level2DialogueLine = {
  speaker: 'A' | 'B';
  speakerName?: string;
  text: string;
  translationFr: string;
  translationEn: string;
  pinyin?: string;
};

const dLine = (
  speaker: 'A' | 'B',
  text: string,
  translationFr: string,
  translationEn: string,
  pinyin?: string
): Level2DialogueLine => ({
  speaker,
  speakerName: speaker,
  text,
  translationFr,
  translationEn,
  ...(pinyin ? { pinyin } : {})
});

const level2DialogueOverrides: Record<
  string,
  {
    contextFr: string;
    contextEn: string;
    lines: Level2DialogueLine[];
  }
> = {
  'zh-l2-g01': {
    contextFr: 'Organisation du programme de demain',
    contextEn: 'Planning tomorrow',
    lines: [
      dLine('A', '明天你会来吗？', 'Tu viendras demain ?', 'Will you come tomorrow?'),
      dLine('B', '会，我下午会来。', 'Oui, je viendrai dans l’après-midi.', 'Yes, I will come in the afternoon.'),
      dLine('A', '好，那我们三点见。', 'D’accord, alors on se voit à 15h.', 'Great, then let’s meet at 3 PM.')
    ]
  },
  'zh-l2-g02': {
    contextFr: 'Ranger et retrouver des objets',
    contextEn: 'Putting and finding objects',
    lines: [
      dLine('A', '你把手机放哪儿了？', 'Où as-tu mis ton téléphone ?', 'Where did you put your phone?'),
      dLine('B', '我把手机放在包里了。', 'Je l’ai mis dans le sac.', 'I put it in the bag.'),
      dLine('A', '好，我找到了。', 'Ok, je l’ai trouvé.', 'Okay, I found it.')
    ]
  },
  'zh-l2-g03': {
    contextFr: 'Décrire une suite d’actions',
    contextEn: 'Describing sequence of actions',
    lines: [
      dLine('A', '我先做饭，然后洗碗。', 'Je cuisine d’abord, puis je fais la vaisselle.', 'I cook first, then do the dishes.'),
      dLine('B', '所以你现在很忙。', 'Donc tu es très occupé maintenant.', 'So you are very busy now.'),
      dLine('A', '对，等一下我们再聊。', 'Oui, on reparle un peu plus tard.', 'Yes, let’s talk a bit later.')
    ]
  },
  'zh-l2-g04': {
    contextFr: 'Aller quelque part avec quelqu’un',
    contextEn: 'Going somewhere with someone',
    lines: [
      dLine('A', '你跟谁一起去图书馆？', 'Avec qui vas-tu à la bibliothèque ?', 'Who are you going to the library with?'),
      dLine('B', '我跟同学一起去。', 'J’y vais avec un camarade.', 'I am going with a classmate.'),
      dLine('A', '那我也跟你们去。', 'Alors je viens avec vous aussi.', 'Then I will go with you too.')
    ]
  },
  'zh-l2-g05': {
    contextFr: 'Exprimer un contraste',
    contextEn: 'Expressing contrast',
    lines: [
      dLine('A', '我想去跑步，但是下雨了。', 'Je veux aller courir, mais il pleut.', 'I want to go running, but it is raining.'),
      dLine('B', '那我们在家运动吧。', 'Alors faisons du sport à la maison.', 'Then let’s exercise at home.'),
      dLine('A', '好主意。', 'Bonne idée.', 'Good idea.')
    ]
  },
  'zh-l2-g06': {
    contextFr: 'Donner et recevoir',
    contextEn: 'Giving and receiving',
    lines: [
      dLine('A', '这本书你给谁？', 'À qui donnes-tu ce livre ?', 'Who are you giving this book to?'),
      dLine('B', '我给老师。', 'Je le donne au professeur.', 'I am giving it to the teacher.'),
      dLine('A', '这是我从朋友借来的。', 'Moi je l’ai emprunté à un ami.', 'I borrowed this from a friend.')
    ]
  },
  'zh-l2-g07': {
    contextFr: 'Action en cours',
    contextEn: 'Action in progress',
    lines: [
      dLine('A', '你在做什么呢？', 'Tu fais quoi en ce moment ?', 'What are you doing right now?'),
      dLine('B', '我正在写作业。', 'Je suis en train de faire mes devoirs.', 'I am doing my homework right now.'),
      dLine('A', '写完我们去吃饭吧。', 'Quand tu as fini, on va manger.', 'After you finish, let’s go eat.')
    ]
  },
  'zh-l2-g08': {
    contextFr: 'Exprimer “aussi” avec 也',
    contextEn: 'Using 也 to say “also”',
    lines: [
      dLine('A', '我喜欢看纪录片。', 'J’aime regarder des documentaires.', 'I like watching documentaries.'),
      dLine('B', '我也喜欢。', 'Moi aussi.', 'I like them too.'),
      dLine('A', '太好了，我们一起看。', 'Super, regardons ensemble.', 'Great, let’s watch together.')
    ]
  },
  'zh-l2-g09': {
    contextFr: 'Exprimer “encore / toujours”',
    contextEn: 'Using “still”',
    lines: [
      dLine('A', '你还在公司吗？', 'Tu es encore au bureau ?', 'Are you still at the office?'),
      dLine('B', '对，我还没下班。', 'Oui, je n’ai pas encore fini.', 'Yes, I still have not finished work.'),
      dLine('A', '我已经到家了。', 'Moi, je suis déjà rentré.', 'I am already home.')
    ]
  },
  'zh-l2-g10': {
    contextFr: 'Exprimer la restriction',
    contextEn: 'Expressing restriction',
    lines: [
      dLine('A', '你喝什么？', 'Tu bois quoi ?', 'What do you drink?'),
      dLine('B', '我只喝水。', 'Je bois seulement de l’eau.', 'I only drink water.'),
      dLine('A', '我也是，只要温水。', 'Moi aussi, uniquement de l’eau tiède.', 'Same, only warm water.')
    ]
  },
  'zh-l2-g11': {
    contextFr: 'Parler de la capacité / impossibilité',
    contextEn: 'Talking about ability / inability',
    lines: [
      dLine('A', '今晚你能来吗？', 'Tu peux venir ce soir ?', 'Can you come tonight?'),
      dLine('B', '不行，我不能来。', 'Non, je ne peux pas venir.', 'No, I cannot come.'),
      dLine('A', '没关系，下次吧。', 'Pas grave, une prochaine fois.', 'No problem, next time.')
    ]
  },
  'zh-l2-g12': {
    contextFr: 'Dire ce qu’on sait bien faire',
    contextEn: 'Saying what you are good at',
    lines: [
      dLine('A', '你擅长做什么？', 'Tu es bon en quoi ?', 'What are you good at?'),
      dLine('B', '我擅长做饭。', 'Je suis bon en cuisine.', 'I am good at cooking.'),
      dLine('A', '我不擅长做饭。', 'Moi, je ne suis pas bon en cuisine.', 'I am not good at cooking.')
    ]
  },
  'zh-l2-g13': {
    contextFr: 'Parler des activités comme des noms',
    contextEn: 'Using activities as nouns',
    lines: [
      dLine('A', '学习中文很有意思。', 'Apprendre le chinois est intéressant.', 'Learning Chinese is interesting.'),
      dLine('B', '对，学习也需要坚持。', 'Oui, l’apprentissage demande aussi de la régularité.', 'Yes, learning also requires consistency.'),
      dLine('A', '每天学习二十分钟就很好。', 'Étudier 20 minutes par jour, c’est déjà très bien.', 'Studying 20 minutes a day is already great.')
    ]
  },
  'zh-l2-g14': {
    contextFr: 'Conseils et obligation',
    contextEn: 'Advice and obligation',
    lines: [
      dLine('A', '明天考试了。', 'Demain il y a un examen.', 'The exam is tomorrow.'),
      dLine('B', '那你得早点睡。', 'Alors tu dois dormir tôt.', 'Then you must sleep early.'),
      dLine('A', '对，我也应该复习。', 'Oui, je dois aussi réviser.', 'Right, I should also review.')
    ]
  },
  'zh-l2-g15': {
    contextFr: 'Comparer deux options',
    contextEn: 'Comparing two options',
    lines: [
      dLine('A', '这家店比那家店贵。', 'Ce magasin est plus cher que l’autre.', 'This store is more expensive than the other one.'),
      dLine('B', '但是服务更好。', 'Mais le service est meilleur.', 'But the service is better.'),
      dLine('A', '我们再比较一下。', 'Comparons encore un peu.', 'Let’s compare a bit more.')
    ]
  },
  'zh-l2-g16': {
    contextFr: 'Exprimer ses goûts',
    contextEn: 'Expressing preferences',
    lines: [
      dLine('A', '你喜欢喝咖啡吗？', 'Tu aimes le café ?', 'Do you like coffee?'),
      dLine('B', '我喜欢，不过我更喜欢茶。', 'Oui, mais je préfère le thé.', 'I do, but I prefer tea.'),
      dLine('A', '我最喜欢奶茶。', 'Moi, je préfère le thé au lait.', 'My favorite is milk tea.')
    ]
  },
  'zh-l2-g17': {
    contextFr: 'Scénario conditionnel',
    contextEn: 'Conditional scenario',
    lines: [
      dLine('A', '如果明天下雨怎么办？', 'Et si demain il pleut ?', 'What if it rains tomorrow?'),
      dLine('B', '如果下雨，我们就在家学习。', 'S’il pleut, on étudiera à la maison.', 'If it rains, we will study at home.'),
      dLine('A', '好，那我带资料来。', 'D’accord, alors j’apporterai les documents.', 'Okay, then I will bring the materials.')
    ]
  },
  'zh-l2-g18': {
    contextFr: 'Opposer “déjà” et “encore”',
    contextEn: 'Contrasting “already” and “still”',
    lines: [
      dLine('A', '你已经吃饭了吗？', 'Tu as déjà mangé ?', 'Have you already eaten?'),
      dLine('B', '我已经吃了，你呢？', 'Oui, et toi ?', 'Yes, I have. What about you?'),
      dLine('A', '我还没吃。', 'Moi pas encore.', 'I have not eaten yet.')
    ]
  },
  'zh-l2-g19': {
    contextFr: 'Donner des consignes polies',
    contextEn: 'Giving polite instructions',
    lines: [
      dLine('A', '请坐，请看这份文件。', 'Asseyez-vous, regardez ce document.', 'Please sit down and look at this document.'),
      dLine('B', '好的，请再说慢一点。', 'D’accord, parlez juste un peu plus lentement.', 'Okay, please speak a bit more slowly.'),
      dLine('A', '没问题。', 'Pas de problème.', 'No problem.')
    ]
  },
  'zh-l2-g20': {
    contextFr: 'Demander un service',
    contextEn: 'Asking for a favor',
    lines: [
      dLine('A', '请帮我打印这页。', 'S\'il te plaît, imprime cette page pour moi.', 'Please print this page for me.'),
      dLine('B', '好，我马上帮你。', 'Oui, je le fais tout de suite.', 'Sure, I will help you right away.'),
      dLine('A', '谢谢你，麻烦你了。', 'Merci, c\'est gentil.', 'Thank you, I appreciate it.')
    ]
  },
  'zh-l2-g21': {
    contextFr: 'Demander la méthode',
    contextEn: 'Asking how to do something',
    lines: [
      dLine('A', '这个词怎么读？', 'Comment lit-on ce mot ?', 'How do you read this word?'),
      dLine('B', '这样读，先四声再二声。', 'Comme ça, d\'abord 4e ton puis 2e ton.', 'Like this: first 4th tone, then 2nd tone.'),
      dLine('A', '明白了，谢谢。', 'Compris, merci.', 'Got it, thanks.')
    ]
  },
  'zh-l2-g22': {
    contextFr: 'Parler de “tout le monde”',
    contextEn: 'Talking about “everyone / all”',
    lines: [
      dLine('A', '人都到了吗？', 'Tout le monde est arrivé ?', 'Has everyone arrived?'),
      dLine('B', '都到了，还差老师。', 'Presque, il manque juste le prof.', 'Almost, only the teacher is missing.'),
      dLine('A', '好，我们先开始。', 'D\'accord, on commence.', 'Okay, let us start.')
    ]
  },
  'zh-l2-g23': {
    contextFr: 'Interdire ou prévenir',
    contextEn: 'Forbidding or warning',
    lines: [
      dLine('A', '这里很安静。', 'Ici, c\'est calme.', 'It is quiet here.'),
      dLine('B', '对，别大声说话。', 'Oui, ne parle pas fort.', 'Right, do not speak loudly.'),
      dLine('A', '好，我小声一点。', 'D\'accord, je parle plus doucement.', 'Okay, I will speak more softly.')
    ]
  },
  'zh-l2-v01': {
    contextFr: 'Se repérer dans la semaine',
    contextEn: 'Talking about weekdays',
    lines: [
      dLine('A', '今天星期几？', 'On est quel jour ?', 'What day is it today?'),
      dLine('B', '今天星期三。', 'On est mercredi.', 'It is Wednesday.'),
      dLine('A', '那明天就是星期四。', 'Alors demain c\'est jeudi.', 'Then tomorrow is Thursday.')
    ]
  },
  'zh-l2-v02': {
    contextFr: 'Nuancer son ressenti',
    contextEn: 'Nuancing intensity',
    lines: [
      dLine('A', '这个菜有点辣吗？', 'Ce plat est un peu épicé ?', 'Is this dish a little spicy?'),
      dLine('B', '不太辣，真的很好吃。', 'Pas trop, vraiment très bon.', 'Not too spicy, really tasty.'),
      dLine('A', '太好了，我很想试试。', 'Super, je veux vraiment goûter.', 'Great, I really want to try.')
    ]
  },
  'zh-l2-v03': {
    contextFr: 'Personnes et choses non spécifiées',
    contextEn: 'Indefinite people and things',
    lines: [
      dLine('A', '门外有人吗？', 'Il y a quelqu\'un dehors ?', 'Is there someone outside?'),
      dLine('B', '有人，是快递员。', 'Oui, c\'est le livreur.', 'Yes, it is the delivery person.'),
      dLine('A', '好，我去拿东西。', 'D\'accord, je vais récupérer le colis.', 'Okay, I will pick it up.')
    ]
  },
  'zh-l2-n01': {
    contextFr: 'Demander et donner l’heure',
    contextEn: 'Asking and telling time',
    lines: [
      dLine('A', '现在几点？', 'Il est quelle heure ?', 'What time is it now?'),
      dLine('B', '现在三点半。', 'Il est 15h30.', 'It is 3:30 now.'),
      dLine('A', '四点我们开会。', 'On a une réunion à 16h.', 'We have a meeting at 4 PM.')
    ]
  },
  'zh-l2-n02': {
    contextFr: 'Utiliser les classificateurs',
    contextEn: 'Using measure words',
    lines: [
      dLine('A', '你买了几本书？', 'Tu as acheté combien de livres ?', 'How many books did you buy?'),
      dLine('B', '我买了两本书和一张地图。', 'Deux livres et une carte.', 'I bought two books and one map.'),
      dLine('A', '我买了一杯咖啡。', 'Moi, j\'ai pris un café.', 'I bought a cup of coffee.')
    ]
  },
  'zh-l2-n03': {
    contextFr: 'Parler des dates',
    contextEn: 'Talking about dates',
    lines: [
      dLine('A', '今天几月几号？', 'Nous sommes le combien ?', 'What is today’s date?'),
      dLine('B', '今天五月一号。', 'Nous sommes le 1er mai.', 'Today is May 1st.'),
      dLine('A', '下周一是几号？', 'Et lundi prochain, c\'est le combien ?', 'And what date is next Monday?')
    ]
  },
  'zh-l2-c01': {
    contextFr: 'Première rencontre',
    contextEn: 'First meeting',
    lines: [
      dLine('A', '你好，我叫安娜。', 'Bonjour, je m\'appelle Anna.', 'Hello, my name is Anna.'),
      dLine('B', '你好，我是保罗。', 'Bonjour, je suis Paul.', 'Hello, I am Paul.'),
      dLine('A', '很高兴认识你。', 'Ravi de te rencontrer.', 'Nice to meet you.'),
      dLine('B', '我也很高兴认识你。', 'Moi aussi, ravi de te rencontrer.', 'Nice to meet you too.')
    ]
  }
};

for (const [lessonId, override] of Object.entries(level2DialogueOverrides)) {
  const exercises = level2PlanExercises[lessonId];
  if (!exercises) continue;
  const dialogueIndex = exercises.findIndex((exercise) => exercise.id === `${lessonId}-dialogue`);
  if (dialogueIndex === -1) continue;
  exercises[dialogueIndex] = {
    id: `${lessonId}-dialogue`,
    type: 'dialogue',
    mode: 'display',
    promptFr: 'Dialogue contextualisé',
    promptEn: 'Contextualized dialogue',
    context: override.contextFr,
    contextEn: override.contextEn,
    dialogue: override.lines
  };
}

Object.assign(lessonExercises, level2PlanExercises);

// Exercices dédiés aux modules CECR (générés par gen_cecr_exercises.py).
// Chargés après le reste pour prendre le dessus si un id est partagé.
Object.assign(lessonExercises, cecrExercisesFull);
