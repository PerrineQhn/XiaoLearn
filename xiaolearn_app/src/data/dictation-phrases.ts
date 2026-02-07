// Dictation phrases for each HSK level
export interface DictationPhrase {
  id: string;
  hanzi: string;
  pinyin: string;
  translation: string;
  translationFr: string;
  audio: string;
  level: 'hsk1' | 'hsk2' | 'hsk3';
}

export const dictationPhrases: DictationPhrase[] = [
  // ===== HSK1 Phrases (50) =====
  {
    id: 'hsk1-phrase-001',
    hanzi: '你好',
    pinyin: 'nǐ hǎo',
    translation: 'Hello',
    translationFr: 'Bonjour',
    audio: 'audio/phrases/hsk1-phrase-001.wav',
    level: 'hsk1'
  },
  {
    id: 'hsk1-phrase-002',
    hanzi: '我是学生',
    pinyin: 'wǒ shì xuésheng',
    translation: 'I am a student',
    translationFr: 'Je suis étudiant',
    audio: 'audio/phrases/hsk1-phrase-002.wav',
    level: 'hsk1'
  },
  {
    id: 'hsk1-phrase-003',
    hanzi: '你好吗',
    pinyin: 'nǐ hǎo ma',
    translation: 'How are you',
    translationFr: 'Comment vas-tu',
    audio: 'audio/phrases/hsk1-phrase-003.wav',
    level: 'hsk1'
  },
  {
    id: 'hsk1-phrase-004',
    hanzi: '谢谢你',
    pinyin: 'xièxie nǐ',
    translation: 'Thank you',
    translationFr: 'Merci',
    audio: 'audio/phrases/hsk1-phrase-004.wav',
    level: 'hsk1'
  },
  {
    id: 'hsk1-phrase-005',
    hanzi: '不客气',
    pinyin: 'bù kèqi',
    translation: 'You\'re welcome',
    translationFr: 'De rien',
    audio: 'audio/phrases/hsk1-phrase-005.wav',
    level: 'hsk1'
  },
  {
    id: 'hsk1-phrase-006',
    hanzi: '再见',
    pinyin: 'zàijiàn',
    translation: 'Goodbye',
    translationFr: 'Au revoir',
    audio: 'audio/phrases/hsk1-phrase-006.wav',
    level: 'hsk1'
  },
  {
    id: 'hsk1-phrase-007',
    hanzi: '今天很好',
    pinyin: 'jīntiān hěn hǎo',
    translation: 'Today is very good',
    translationFr: 'Aujourd\'hui est très bien',
    audio: 'audio/phrases/hsk1-phrase-007.wav',
    level: 'hsk1'
  },
  {
    id: 'hsk1-phrase-008',
    hanzi: '我叫小明',
    pinyin: 'wǒ jiào Xiǎomíng',
    translation: 'My name is Xiaoming',
    translationFr: 'Je m\'appelle Xiaoming',
    audio: 'audio/phrases/hsk1-phrase-008.wav',
    level: 'hsk1'
  },
  {
    id: 'hsk1-phrase-009',
    hanzi: '你叫什么名字',
    pinyin: 'nǐ jiào shénme míngzi',
    translation: 'What is your name',
    translationFr: 'Comment tu t\'appelles',
    audio: 'audio/phrases/hsk1-phrase-009.wav',
    level: 'hsk1'
  },
  {
    id: 'hsk1-phrase-010',
    hanzi: '我爱你',
    pinyin: 'wǒ ài nǐ',
    translation: 'I love you',
    translationFr: 'Je t\'aime',
    audio: 'audio/phrases/hsk1-phrase-010.wav',
    level: 'hsk1'
  },
  {
    id: 'hsk1-phrase-011',
    hanzi: '这是我的书',
    pinyin: 'zhè shì wǒ de shū',
    translation: 'This is my book',
    translationFr: 'C\'est mon livre',
    audio: 'audio/phrases/hsk1-phrase-011.wav',
    level: 'hsk1'
  },
  {
    id: 'hsk1-phrase-012',
    hanzi: '那是什么',
    pinyin: 'nà shì shénme',
    translation: 'What is that',
    translationFr: 'Qu\'est-ce que c\'est',
    audio: 'audio/phrases/hsk1-phrase-012.wav',
    level: 'hsk1'
  },
  {
    id: 'hsk1-phrase-013',
    hanzi: '我想喝水',
    pinyin: 'wǒ xiǎng hē shuǐ',
    translation: 'I want to drink water',
    translationFr: 'Je veux boire de l\'eau',
    audio: 'audio/phrases/hsk1-phrase-013.wav',
    level: 'hsk1'
  },
  {
    id: 'hsk1-phrase-014',
    hanzi: '他是我爸爸',
    pinyin: 'tā shì wǒ bàba',
    translation: 'He is my father',
    translationFr: 'C\'est mon père',
    audio: 'audio/phrases/hsk1-phrase-014.wav',
    level: 'hsk1'
  },
  {
    id: 'hsk1-phrase-015',
    hanzi: '她是我妈妈',
    pinyin: 'tā shì wǒ māma',
    translation: 'She is my mother',
    translationFr: 'C\'est ma mère',
    audio: 'audio/phrases/hsk1-phrase-015.wav',
    level: 'hsk1'
  },
  {
    id: 'hsk1-phrase-016',
    hanzi: '我有一个弟弟',
    pinyin: 'wǒ yǒu yí ge dìdi',
    translation: 'I have a younger brother',
    translationFr: 'J\'ai un petit frère',
    audio: 'audio/phrases/hsk1-phrase-016.wav',
    level: 'hsk1'
  },
  {
    id: 'hsk1-phrase-017',
    hanzi: '几点了',
    pinyin: 'jǐ diǎn le',
    translation: 'What time is it',
    translationFr: 'Quelle heure est-il',
    audio: 'audio/phrases/hsk1-phrase-017.wav',
    level: 'hsk1'
  },
  {
    id: 'hsk1-phrase-018',
    hanzi: '现在三点',
    pinyin: 'xiànzài sān diǎn',
    translation: 'It\'s 3 o\'clock now',
    translationFr: 'Il est 3 heures maintenant',
    audio: 'audio/phrases/hsk1-phrase-018.wav',
    level: 'hsk1'
  },
  {
    id: 'hsk1-phrase-019',
    hanzi: '我去学校',
    pinyin: 'wǒ qù xuéxiào',
    translation: 'I go to school',
    translationFr: 'Je vais à l\'école',
    audio: 'audio/phrases/hsk1-phrase-019.wav',
    level: 'hsk1'
  },
  {
    id: 'hsk1-phrase-020',
    hanzi: '你在哪儿',
    pinyin: 'nǐ zài nǎr',
    translation: 'Where are you',
    translationFr: 'Où es-tu',
    audio: 'audio/phrases/hsk1-phrase-020.wav',
    level: 'hsk1'
  },
  {
    id: 'hsk1-phrase-021',
    hanzi: '我在家',
    pinyin: 'wǒ zài jiā',
    translation: 'I am at home',
    translationFr: 'Je suis à la maison',
    audio: 'audio/phrases/hsk1-phrase-021.wav',
    level: 'hsk1'
  },
  {
    id: 'hsk1-phrase-022',
    hanzi: '今天星期几',
    pinyin: 'jīntiān xīngqī jǐ',
    translation: 'What day is today',
    translationFr: 'Quel jour sommes-nous',
    audio: 'audio/phrases/hsk1-phrase-022.wav',
    level: 'hsk1'
  },
  {
    id: 'hsk1-phrase-023',
    hanzi: '今天星期一',
    pinyin: 'jīntiān xīngqī yī',
    translation: 'Today is Monday',
    translationFr: 'Aujourd\'hui c\'est lundi',
    audio: 'audio/phrases/hsk1-phrase-023.wav',
    level: 'hsk1'
  },
  {
    id: 'hsk1-phrase-024',
    hanzi: '明天见',
    pinyin: 'míngtiān jiàn',
    translation: 'See you tomorrow',
    translationFr: 'À demain',
    audio: 'audio/phrases/hsk1-phrase-024.wav',
    level: 'hsk1'
  },
  {
    id: 'hsk1-phrase-025',
    hanzi: '我很累',
    pinyin: 'wǒ hěn lèi',
    translation: 'I am very tired',
    translationFr: 'Je suis très fatigué',
    audio: 'audio/phrases/hsk1-phrase-025.wav',
    level: 'hsk1'
  },
  {
    id: 'hsk1-phrase-026',
    hanzi: '他不在',
    pinyin: 'tā bú zài',
    translation: 'He is not here',
    translationFr: 'Il n\'est pas là',
    audio: 'audio/phrases/hsk1-phrase-026.wav',
    level: 'hsk1'
  },
  {
    id: 'hsk1-phrase-027',
    hanzi: '我会说中文',
    pinyin: 'wǒ huì shuō zhōngwén',
    translation: 'I can speak Chinese',
    translationFr: 'Je peux parler chinois',
    audio: 'audio/phrases/hsk1-phrase-027.wav',
    level: 'hsk1'
  },
  {
    id: 'hsk1-phrase-028',
    hanzi: '多少钱',
    pinyin: 'duōshao qián',
    translation: 'How much money',
    translationFr: 'Combien ça coûte',
    audio: 'audio/phrases/hsk1-phrase-028.wav',
    level: 'hsk1'
  },
  {
    id: 'hsk1-phrase-029',
    hanzi: '五块钱',
    pinyin: 'wǔ kuài qián',
    translation: 'Five yuan',
    translationFr: 'Cinq yuans',
    audio: 'audio/phrases/hsk1-phrase-029.wav',
    level: 'hsk1'
  },
  {
    id: 'hsk1-phrase-030',
    hanzi: '我想买水',
    pinyin: 'wǒ xiǎng mǎi shuǐ',
    translation: 'I want to buy water',
    translationFr: 'Je veux acheter de l\'eau',
    audio: 'audio/phrases/hsk1-phrase-030.wav',
    level: 'hsk1'
  },
  {
    id: 'hsk1-phrase-031',
    hanzi: '请坐',
    pinyin: 'qǐng zuò',
    translation: 'Please sit',
    translationFr: 'Asseyez-vous s\'il vous plaît',
    audio: 'audio/phrases/hsk1-phrase-031.wav',
    level: 'hsk1'
  },
  {
    id: 'hsk1-phrase-032',
    hanzi: '对不起',
    pinyin: 'duìbuqǐ',
    translation: 'Sorry',
    translationFr: 'Pardon',
    audio: 'audio/phrases/hsk1-phrase-032.wav',
    level: 'hsk1'
  },
  {
    id: 'hsk1-phrase-033',
    hanzi: '没关系',
    pinyin: 'méi guānxi',
    translation: 'It doesn\'t matter',
    translationFr: 'Ce n\'est pas grave',
    audio: 'audio/phrases/hsk1-phrase-033.wav',
    level: 'hsk1'
  },
  {
    id: 'hsk1-phrase-034',
    hanzi: '你几岁',
    pinyin: 'nǐ jǐ suì',
    translation: 'How old are you',
    translationFr: 'Quel âge as-tu',
    audio: 'audio/phrases/hsk1-phrase-034.wav',
    level: 'hsk1'
  },
  {
    id: 'hsk1-phrase-035',
    hanzi: '我十岁',
    pinyin: 'wǒ shí suì',
    translation: 'I am 10 years old',
    translationFr: 'J\'ai 10 ans',
    audio: 'audio/phrases/hsk1-phrase-035.wav',
    level: 'hsk1'
  },
  {
    id: 'hsk1-phrase-036',
    hanzi: '你吃饭了吗',
    pinyin: 'nǐ chī fàn le ma',
    translation: 'Have you eaten',
    translationFr: 'As-tu mangé',
    audio: 'audio/phrases/hsk1-phrase-036.wav',
    level: 'hsk1'
  },
  {
    id: 'hsk1-phrase-037',
    hanzi: '我吃了',
    pinyin: 'wǒ chī le',
    translation: 'I have eaten',
    translationFr: 'J\'ai mangé',
    audio: 'audio/phrases/hsk1-phrase-037.wav',
    level: 'hsk1'
  },
  {
    id: 'hsk1-phrase-038',
    hanzi: '天气很好',
    pinyin: 'tiānqì hěn hǎo',
    translation: 'The weather is very good',
    translationFr: 'Il fait très beau',
    audio: 'audio/phrases/hsk1-phrase-038.wav',
    level: 'hsk1'
  },
  {
    id: 'hsk1-phrase-039',
    hanzi: '今天很热',
    pinyin: 'jīntiān hěn rè',
    translation: 'Today is very hot',
    translationFr: 'Aujourd\'hui il fait très chaud',
    audio: 'audio/phrases/hsk1-phrase-039.wav',
    level: 'hsk1'
  },
  {
    id: 'hsk1-phrase-040',
    hanzi: '我喜欢你',
    pinyin: 'wǒ xǐhuan nǐ',
    translation: 'I like you',
    translationFr: 'Je t\'aime bien',
    audio: 'audio/phrases/hsk1-phrase-040.wav',
    level: 'hsk1'
  },
  {
    id: 'hsk1-phrase-041',
    hanzi: '这个很大',
    pinyin: 'zhège hěn dà',
    translation: 'This is very big',
    translationFr: 'Celui-ci est très grand',
    audio: 'audio/phrases/hsk1-phrase-041.wav',
    level: 'hsk1'
  },
  {
    id: 'hsk1-phrase-042',
    hanzi: '那个很小',
    pinyin: 'nàge hěn xiǎo',
    translation: 'That is very small',
    translationFr: 'Celui-là est très petit',
    audio: 'audio/phrases/hsk1-phrase-042.wav',
    level: 'hsk1'
  },
  {
    id: 'hsk1-phrase-043',
    hanzi: '我不知道',
    pinyin: 'wǒ bù zhīdào',
    translation: 'I don\'t know',
    translationFr: 'Je ne sais pas',
    audio: 'audio/phrases/hsk1-phrase-043.wav',
    level: 'hsk1'
  },
  {
    id: 'hsk1-phrase-044',
    hanzi: '我认识他',
    pinyin: 'wǒ rènshi tā',
    translation: 'I know him',
    translationFr: 'Je le connais',
    audio: 'audio/phrases/hsk1-phrase-044.wav',
    level: 'hsk1'
  },
  {
    id: 'hsk1-phrase-045',
    hanzi: '我们是朋友',
    pinyin: 'wǒmen shì péngyou',
    translation: 'We are friends',
    translationFr: 'Nous sommes amis',
    audio: 'audio/phrases/hsk1-phrase-045.wav',
    level: 'hsk1'
  },
  {
    id: 'hsk1-phrase-046',
    hanzi: '他们都很好',
    pinyin: 'tāmen dōu hěn hǎo',
    translation: 'They are all very good',
    translationFr: 'Ils vont tous très bien',
    audio: 'audio/phrases/hsk1-phrase-046.wav',
    level: 'hsk1'
  },
  {
    id: 'hsk1-phrase-047',
    hanzi: '我要回家',
    pinyin: 'wǒ yào huí jiā',
    translation: 'I want to go home',
    translationFr: 'Je veux rentrer à la maison',
    audio: 'audio/phrases/hsk1-phrase-047.wav',
    level: 'hsk1'
  },
  {
    id: 'hsk1-phrase-048',
    hanzi: '你来我家',
    pinyin: 'nǐ lái wǒ jiā',
    translation: 'Come to my house',
    translationFr: 'Viens chez moi',
    audio: 'audio/phrases/hsk1-phrase-048.wav',
    level: 'hsk1'
  },
  {
    id: 'hsk1-phrase-049',
    hanzi: '我们一起去',
    pinyin: 'wǒmen yìqǐ qù',
    translation: 'Let\'s go together',
    translationFr: 'Allons-y ensemble',
    audio: 'audio/phrases/hsk1-phrase-049.wav',
    level: 'hsk1'
  },
  {
    id: 'hsk1-phrase-050',
    hanzi: '祝你好运',
    pinyin: 'zhù nǐ hǎo yùn',
    translation: 'Good luck to you',
    translationFr: 'Bonne chance',
    audio: 'audio/phrases/hsk1-phrase-050.wav',
    level: 'hsk1'
  },

  // ===== HSK2 Phrases (50) =====
  {
    id: 'hsk2-phrase-001',
    hanzi: '你在做什么',
    pinyin: 'nǐ zài zuò shénme',
    translation: 'What are you doing',
    translationFr: 'Qu\'est-ce que tu fais',
    audio: 'audio/phrases/hsk2-phrase-001.wav',
    level: 'hsk2'
  },
  {
    id: 'hsk2-phrase-002',
    hanzi: '我正在看书',
    pinyin: 'wǒ zhèngzài kàn shū',
    translation: 'I am reading a book',
    translationFr: 'Je suis en train de lire',
    audio: 'audio/phrases/hsk2-phrase-002.wav',
    level: 'hsk2'
  },
  {
    id: 'hsk2-phrase-003',
    hanzi: '天气怎么样',
    pinyin: 'tiānqì zěnmeyàng',
    translation: 'How is the weather',
    translationFr: 'Quel temps fait-il',
    audio: 'audio/phrases/hsk2-phrase-003.wav',
    level: 'hsk2'
  },
  {
    id: 'hsk2-phrase-004',
    hanzi: '我觉得很冷',
    pinyin: 'wǒ juéde hěn lěng',
    translation: 'I feel very cold',
    translationFr: 'Je trouve qu\'il fait très froid',
    audio: 'audio/phrases/hsk2-phrase-004.wav',
    level: 'hsk2'
  },
  {
    id: 'hsk2-phrase-005',
    hanzi: '你喜欢吃什么',
    pinyin: 'nǐ xǐhuan chī shénme',
    translation: 'What do you like to eat',
    translationFr: 'Qu\'est-ce que tu aimes manger',
    audio: 'audio/phrases/hsk2-phrase-005.wav',
    level: 'hsk2'
  },
  {
    id: 'hsk2-phrase-006',
    hanzi: '我喜欢吃中国菜',
    pinyin: 'wǒ xǐhuan chī zhōngguó cài',
    translation: 'I like to eat Chinese food',
    translationFr: 'J\'aime manger chinois',
    audio: 'audio/phrases/hsk2-phrase-006.wav',
    level: 'hsk2'
  },
  {
    id: 'hsk2-phrase-007',
    hanzi: '请给我一杯咖啡',
    pinyin: 'qǐng gěi wǒ yì bēi kāfēi',
    translation: 'Please give me a cup of coffee',
    translationFr: 'Donnez-moi un café s\'il vous plaît',
    audio: 'audio/phrases/hsk2-phrase-007.wav',
    level: 'hsk2'
  },
  {
    id: 'hsk2-phrase-008',
    hanzi: '我已经吃过了',
    pinyin: 'wǒ yǐjīng chī guò le',
    translation: 'I have already eaten',
    translationFr: 'J\'ai déjà mangé',
    audio: 'audio/phrases/hsk2-phrase-008.wav',
    level: 'hsk2'
  },
  {
    id: 'hsk2-phrase-009',
    hanzi: '你去过北京吗',
    pinyin: 'nǐ qù guò běijīng ma',
    translation: 'Have you been to Beijing',
    translationFr: 'Es-tu déjà allé à Pékin',
    audio: 'audio/phrases/hsk2-phrase-009.wav',
    level: 'hsk2'
  },
  {
    id: 'hsk2-phrase-010',
    hanzi: '我去过很多次',
    pinyin: 'wǒ qù guò hěn duō cì',
    translation: 'I have been many times',
    translationFr: 'J\'y suis allé plusieurs fois',
    audio: 'audio/phrases/hsk2-phrase-010.wav',
    level: 'hsk2'
  },
  {
    id: 'hsk2-phrase-011',
    hanzi: '这件衣服太贵了',
    pinyin: 'zhè jiàn yīfu tài guì le',
    translation: 'This clothing is too expensive',
    translationFr: 'Ce vêtement est trop cher',
    audio: 'audio/phrases/hsk2-phrase-011.wav',
    level: 'hsk2'
  },
  {
    id: 'hsk2-phrase-012',
    hanzi: '能便宜一点吗',
    pinyin: 'néng piányi yìdiǎn ma',
    translation: 'Can it be a little cheaper',
    translationFr: 'Pouvez-vous baisser un peu le prix',
    audio: 'audio/phrases/hsk2-phrase-012.wav',
    level: 'hsk2'
  },
  {
    id: 'hsk2-phrase-013',
    hanzi: '我需要帮助',
    pinyin: 'wǒ xūyào bāngzhù',
    translation: 'I need help',
    translationFr: 'J\'ai besoin d\'aide',
    audio: 'audio/phrases/hsk2-phrase-013.wav',
    level: 'hsk2'
  },
  {
    id: 'hsk2-phrase-014',
    hanzi: '你能帮我吗',
    pinyin: 'nǐ néng bāng wǒ ma',
    translation: 'Can you help me',
    translationFr: 'Peux-tu m\'aider',
    audio: 'audio/phrases/hsk2-phrase-014.wav',
    level: 'hsk2'
  },
  {
    id: 'hsk2-phrase-015',
    hanzi: '当然可以',
    pinyin: 'dāngrán kěyǐ',
    translation: 'Of course I can',
    translationFr: 'Bien sûr que oui',
    audio: 'audio/phrases/hsk2-phrase-015.wav',
    level: 'hsk2'
  },
  {
    id: 'hsk2-phrase-016',
    hanzi: '我听不懂',
    pinyin: 'wǒ tīng bù dǒng',
    translation: 'I don\'t understand',
    translationFr: 'Je ne comprends pas',
    audio: 'audio/phrases/hsk2-phrase-016.wav',
    level: 'hsk2'
  },
  {
    id: 'hsk2-phrase-017',
    hanzi: '请说慢一点',
    pinyin: 'qǐng shuō màn yìdiǎn',
    translation: 'Please speak slower',
    translationFr: 'Parlez plus lentement s\'il vous plaît',
    audio: 'audio/phrases/hsk2-phrase-017.wav',
    level: 'hsk2'
  },
  {
    id: 'hsk2-phrase-018',
    hanzi: '你的汉语说得很好',
    pinyin: 'nǐ de hànyǔ shuō de hěn hǎo',
    translation: 'You speak Chinese very well',
    translationFr: 'Tu parles très bien chinois',
    audio: 'audio/phrases/hsk2-phrase-018.wav',
    level: 'hsk2'
  },
  {
    id: 'hsk2-phrase-019',
    hanzi: '我在学习中文',
    pinyin: 'wǒ zài xuéxí zhōngwén',
    translation: 'I am learning Chinese',
    translationFr: 'J\'apprends le chinois',
    audio: 'audio/phrases/hsk2-phrase-019.wav',
    level: 'hsk2'
  },
  {
    id: 'hsk2-phrase-020',
    hanzi: '这个问题很难',
    pinyin: 'zhège wèntí hěn nán',
    translation: 'This question is very difficult',
    translationFr: 'Cette question est très difficile',
    audio: 'audio/phrases/hsk2-phrase-020.wav',
    level: 'hsk2'
  },
  {
    id: 'hsk2-phrase-021',
    hanzi: '我们一起努力吧',
    pinyin: 'wǒmen yìqǐ nǔlì ba',
    translation: 'Let\'s work hard together',
    translationFr: 'Travaillons dur ensemble',
    audio: 'audio/phrases/hsk2-phrase-021.wav',
    level: 'hsk2'
  },
  {
    id: 'hsk2-phrase-022',
    hanzi: '医院在哪里',
    pinyin: 'yīyuàn zài nǎlǐ',
    translation: 'Where is the hospital',
    translationFr: 'Où est l\'hôpital',
    audio: 'audio/phrases/hsk2-phrase-022.wav',
    level: 'hsk2'
  },
  {
    id: 'hsk2-phrase-023',
    hanzi: '一直往前走',
    pinyin: 'yìzhí wǎng qián zǒu',
    translation: 'Go straight ahead',
    translationFr: 'Continuez tout droit',
    audio: 'audio/phrases/hsk2-phrase-023.wav',
    level: 'hsk2'
  },
  {
    id: 'hsk2-phrase-024',
    hanzi: '你要去哪儿',
    pinyin: 'nǐ yào qù nǎr',
    translation: 'Where do you want to go',
    translationFr: 'Où veux-tu aller',
    audio: 'audio/phrases/hsk2-phrase-024.wav',
    level: 'hsk2'
  },
  {
    id: 'hsk2-phrase-025',
    hanzi: '我想去火车站',
    pinyin: 'wǒ xiǎng qù huǒchē zhàn',
    translation: 'I want to go to the train station',
    translationFr: 'Je veux aller à la gare',
    audio: 'audio/phrases/hsk2-phrase-025.wav',
    level: 'hsk2'
  },
  {
    id: 'hsk2-phrase-026',
    hanzi: '坐地铁很方便',
    pinyin: 'zuò dìtiě hěn fāngbiàn',
    translation: 'Taking the subway is very convenient',
    translationFr: 'Prendre le métro est très pratique',
    audio: 'audio/phrases/hsk2-phrase-026.wav',
    level: 'hsk2'
  },
  {
    id: 'hsk2-phrase-027',
    hanzi: '今天我很忙',
    pinyin: 'jīntiān wǒ hěn máng',
    translation: 'Today I am very busy',
    translationFr: 'Aujourd\'hui je suis très occupé',
    audio: 'audio/phrases/hsk2-phrase-027.wav',
    level: 'hsk2'
  },
  {
    id: 'hsk2-phrase-028',
    hanzi: '明天我有时间',
    pinyin: 'míngtiān wǒ yǒu shíjiān',
    translation: 'Tomorrow I have time',
    translationFr: 'Demain j\'ai du temps',
    audio: 'audio/phrases/hsk2-phrase-028.wav',
    level: 'hsk2'
  },
  {
    id: 'hsk2-phrase-029',
    hanzi: '我们什么时候见面',
    pinyin: 'wǒmen shénme shíhou jiànmiàn',
    translation: 'When shall we meet',
    translationFr: 'Quand nous rencontrons-nous',
    audio: 'audio/phrases/hsk2-phrase-029.wav',
    level: 'hsk2'
  },
  {
    id: 'hsk2-phrase-030',
    hanzi: '下午三点怎么样',
    pinyin: 'xiàwǔ sān diǎn zěnmeyàng',
    translation: 'How about 3 PM',
    translationFr: 'Que penses-tu de 15h',
    audio: 'audio/phrases/hsk2-phrase-030.wav',
    level: 'hsk2'
  },
  {
    id: 'hsk2-phrase-031',
    hanzi: '没问题',
    pinyin: 'méi wèntí',
    translation: 'No problem',
    translationFr: 'Pas de problème',
    audio: 'audio/phrases/hsk2-phrase-031.wav',
    level: 'hsk2'
  },
  {
    id: 'hsk2-phrase-032',
    hanzi: '我身体不舒服',
    pinyin: 'wǒ shēntǐ bù shūfu',
    translation: 'I don\'t feel well',
    translationFr: 'Je ne me sens pas bien',
    audio: 'audio/phrases/hsk2-phrase-032.wav',
    level: 'hsk2'
  },
  {
    id: 'hsk2-phrase-033',
    hanzi: '你应该去看医生',
    pinyin: 'nǐ yīnggāi qù kàn yīshēng',
    translation: 'You should see a doctor',
    translationFr: 'Tu devrais voir un médecin',
    audio: 'audio/phrases/hsk2-phrase-033.wav',
    level: 'hsk2'
  },
  {
    id: 'hsk2-phrase-034',
    hanzi: '这是你的房间',
    pinyin: 'zhè shì nǐ de fángjiān',
    translation: 'This is your room',
    translationFr: 'Voici ta chambre',
    audio: 'audio/phrases/hsk2-phrase-034.wav',
    level: 'hsk2'
  },
  {
    id: 'hsk2-phrase-035',
    hanzi: '房间很干净',
    pinyin: 'fángjiān hěn gānjìng',
    translation: 'The room is very clean',
    translationFr: 'La chambre est très propre',
    audio: 'audio/phrases/hsk2-phrase-035.wav',
    level: 'hsk2'
  },
  {
    id: 'hsk2-phrase-036',
    hanzi: '我想换一个房间',
    pinyin: 'wǒ xiǎng huàn yí ge fángjiān',
    translation: 'I want to change rooms',
    translationFr: 'Je veux changer de chambre',
    audio: 'audio/phrases/hsk2-phrase-036.wav',
    level: 'hsk2'
  },
  {
    id: 'hsk2-phrase-037',
    hanzi: '我要一张票',
    pinyin: 'wǒ yào yì zhāng piào',
    translation: 'I want a ticket',
    translationFr: 'Je veux un billet',
    audio: 'audio/phrases/hsk2-phrase-037.wav',
    level: 'hsk2'
  },
  {
    id: 'hsk2-phrase-038',
    hanzi: '你会游泳吗',
    pinyin: 'nǐ huì yóuyǒng ma',
    translation: 'Can you swim',
    translationFr: 'Sais-tu nager',
    audio: 'audio/phrases/hsk2-phrase-038.wav',
    level: 'hsk2'
  },
  {
    id: 'hsk2-phrase-039',
    hanzi: '我会一点儿',
    pinyin: 'wǒ huì yìdiǎnr',
    translation: 'I know a little',
    translationFr: 'Je sais un peu',
    audio: 'audio/phrases/hsk2-phrase-039.wav',
    level: 'hsk2'
  },
  {
    id: 'hsk2-phrase-040',
    hanzi: '外面下雨了',
    pinyin: 'wàimiàn xià yǔ le',
    translation: 'It\'s raining outside',
    translationFr: 'Il pleut dehors',
    audio: 'audio/phrases/hsk2-phrase-040.wav',
    level: 'hsk2'
  },
  {
    id: 'hsk2-phrase-041',
    hanzi: '别忘了带伞',
    pinyin: 'bié wàng le dài sǎn',
    translation: 'Don\'t forget to bring an umbrella',
    translationFr: 'N\'oublie pas de prendre un parapluie',
    audio: 'audio/phrases/hsk2-phrase-041.wav',
    level: 'hsk2'
  },
  {
    id: 'hsk2-phrase-042',
    hanzi: '我想休息一下',
    pinyin: 'wǒ xiǎng xiūxi yíxià',
    translation: 'I want to rest for a while',
    translationFr: 'Je veux me reposer un peu',
    audio: 'audio/phrases/hsk2-phrase-042.wav',
    level: 'hsk2'
  },
  {
    id: 'hsk2-phrase-043',
    hanzi: '你在哪个公司工作',
    pinyin: 'nǐ zài nǎge gōngsī gōngzuò',
    translation: 'Which company do you work for',
    translationFr: 'Dans quelle entreprise travailles-tu',
    audio: 'audio/phrases/hsk2-phrase-043.wav',
    level: 'hsk2'
  },
  {
    id: 'hsk2-phrase-044',
    hanzi: '我是老师',
    pinyin: 'wǒ shì lǎoshī',
    translation: 'I am a teacher',
    translationFr: 'Je suis professeur',
    audio: 'audio/phrases/hsk2-phrase-044.wav',
    level: 'hsk2'
  },
  {
    id: 'hsk2-phrase-045',
    hanzi: '你的工作怎么样',
    pinyin: 'nǐ de gōngzuò zěnmeyàng',
    translation: 'How is your work',
    translationFr: 'Comment va ton travail',
    audio: 'audio/phrases/hsk2-phrase-045.wav',
    level: 'hsk2'
  },
  {
    id: 'hsk2-phrase-046',
    hanzi: '工作很有意思',
    pinyin: 'gōngzuò hěn yǒu yìsi',
    translation: 'The work is very interesting',
    translationFr: 'Le travail est très intéressant',
    audio: 'audio/phrases/hsk2-phrase-046.wav',
    level: 'hsk2'
  },
  {
    id: 'hsk2-phrase-047',
    hanzi: '我想学做中国菜',
    pinyin: 'wǒ xiǎng xué zuò zhōngguó cài',
    translation: 'I want to learn to cook Chinese food',
    translationFr: 'Je veux apprendre à cuisiner chinois',
    audio: 'audio/phrases/hsk2-phrase-047.wav',
    level: 'hsk2'
  },
  {
    id: 'hsk2-phrase-048',
    hanzi: '我可以教你',
    pinyin: 'wǒ kěyǐ jiāo nǐ',
    translation: 'I can teach you',
    translationFr: 'Je peux t\'apprendre',
    audio: 'audio/phrases/hsk2-phrase-048.wav',
    level: 'hsk2'
  },
  {
    id: 'hsk2-phrase-049',
    hanzi: '周末你有什么打算',
    pinyin: 'zhōumò nǐ yǒu shénme dǎsuàn',
    translation: 'What are your plans for the weekend',
    translationFr: 'Quels sont tes projets pour le week-end',
    audio: 'audio/phrases/hsk2-phrase-049.wav',
    level: 'hsk2'
  },
  {
    id: 'hsk2-phrase-050',
    hanzi: '我打算去爬山',
    pinyin: 'wǒ dǎsuàn qù pá shān',
    translation: 'I plan to go hiking',
    translationFr: 'Je prévois d\'aller randonner',
    audio: 'audio/phrases/hsk2-phrase-050.wav',
    level: 'hsk2'
  },

  // ===== HSK3 Phrases (50) =====
  {
    id: 'hsk3-phrase-001',
    hanzi: '你对这个城市的印象怎么样',
    pinyin: 'nǐ duì zhège chéngshì de yìnxiàng zěnmeyàng',
    translation: 'What is your impression of this city',
    translationFr: 'Quelle est ton impression de cette ville',
    audio: 'audio/phrases/hsk3-phrase-001.wav',
    level: 'hsk3'
  },
  {
    id: 'hsk3-phrase-002',
    hanzi: '我觉得这里的环境非常好',
    pinyin: 'wǒ juéde zhèlǐ de huánjìng fēicháng hǎo',
    translation: 'I think the environment here is very good',
    translationFr: 'Je trouve que l\'environnement ici est très bon',
    audio: 'audio/phrases/hsk3-phrase-002.wav',
    level: 'hsk3'
  },
  {
    id: 'hsk3-phrase-003',
    hanzi: '虽然工作很累，但是我很开心',
    pinyin: 'suīrán gōngzuò hěn lèi, dànshì wǒ hěn kāixīn',
    translation: 'Although work is tiring, I am very happy',
    translationFr: 'Bien que le travail soit fatigant, je suis très content',
    audio: 'audio/phrases/hsk3-phrase-003.wav',
    level: 'hsk3'
  },
  {
    id: 'hsk3-phrase-004',
    hanzi: '如果明天不下雨，我们就去公园',
    pinyin: 'rúguǒ míngtiān bú xià yǔ, wǒmen jiù qù gōngyuán',
    translation: 'If it doesn\'t rain tomorrow, we will go to the park',
    translationFr: 'S\'il ne pleut pas demain, nous irons au parc',
    audio: 'audio/phrases/hsk3-phrase-004.wav',
    level: 'hsk3'
  },
  {
    id: 'hsk3-phrase-005',
    hanzi: '因为太累了，所以我想早点睡觉',
    pinyin: 'yīnwèi tài lèi le, suǒyǐ wǒ xiǎng zǎo diǎn shuìjiào',
    translation: 'Because I\'m too tired, I want to sleep early',
    translationFr: 'Parce que je suis trop fatigué, je veux dormir tôt',
    audio: 'audio/phrases/hsk3-phrase-005.wav',
    level: 'hsk3'
  },
  {
    id: 'hsk3-phrase-006',
    hanzi: '我已经习惯了这里的生活',
    pinyin: 'wǒ yǐjīng xíguàn le zhèlǐ de shēnghuó',
    translation: 'I have already gotten used to life here',
    translationFr: 'Je me suis déjà habitué à la vie ici',
    audio: 'audio/phrases/hsk3-phrase-006.wav',
    level: 'hsk3'
  },
  {
    id: 'hsk3-phrase-007',
    hanzi: '你能不能帮我检查一下这份文件',
    pinyin: 'nǐ néng bu néng bāng wǒ jiǎnchá yíxià zhè fèn wénjiàn',
    translation: 'Can you help me check this document',
    translationFr: 'Peux-tu m\'aider à vérifier ce document',
    audio: 'audio/phrases/hsk3-phrase-007.wav',
    level: 'hsk3'
  },
  {
    id: 'hsk3-phrase-008',
    hanzi: '我希望能找到一份好工作',
    pinyin: 'wǒ xīwàng néng zhǎo dào yí fèn hǎo gōngzuò',
    translation: 'I hope to find a good job',
    translationFr: 'J\'espère trouver un bon travail',
    audio: 'audio/phrases/hsk3-phrase-008.wav',
    level: 'hsk3'
  },
  {
    id: 'hsk3-phrase-009',
    hanzi: '他的汉语水平提高得很快',
    pinyin: 'tā de hànyǔ shuǐpíng tígāo de hěn kuài',
    translation: 'His Chinese level is improving very quickly',
    translationFr: 'Son niveau de chinois s\'améliore très vite',
    audio: 'audio/phrases/hsk3-phrase-009.wav',
    level: 'hsk3'
  },
  {
    id: 'hsk3-phrase-010',
    hanzi: '我打算明年去中国留学',
    pinyin: 'wǒ dǎsuàn míngnián qù zhōngguó liúxué',
    translation: 'I plan to study abroad in China next year',
    translationFr: 'Je prévois d\'aller étudier en Chine l\'année prochaine',
    audio: 'audio/phrases/hsk3-phrase-010.wav',
    level: 'hsk3'
  },
  {
    id: 'hsk3-phrase-011',
    hanzi: '这本书的内容很有意思',
    pinyin: 'zhè běn shū de nèiróng hěn yǒu yìsi',
    translation: 'The content of this book is very interesting',
    translationFr: 'Le contenu de ce livre est très intéressant',
    audio: 'audio/phrases/hsk3-phrase-011.wav',
    level: 'hsk3'
  },
  {
    id: 'hsk3-phrase-012',
    hanzi: '我需要准备一下考试',
    pinyin: 'wǒ xūyào zhǔnbèi yíxià kǎoshì',
    translation: 'I need to prepare for the exam',
    translationFr: 'Je dois préparer l\'examen',
    audio: 'audio/phrases/hsk3-phrase-012.wav',
    level: 'hsk3'
  },
  {
    id: 'hsk3-phrase-013',
    hanzi: '你应该注意身体健康',
    pinyin: 'nǐ yīnggāi zhùyì shēntǐ jiànkāng',
    translation: 'You should pay attention to your health',
    translationFr: 'Tu devrais faire attention à ta santé',
    audio: 'audio/phrases/hsk3-phrase-013.wav',
    level: 'hsk3'
  },
  {
    id: 'hsk3-phrase-014',
    hanzi: '这家餐厅的菜味道不错',
    pinyin: 'zhè jiā cāntīng de cài wèidao búcuò',
    translation: 'The food at this restaurant tastes good',
    translationFr: 'Les plats de ce restaurant sont bons',
    audio: 'audio/phrases/hsk3-phrase-014.wav',
    level: 'hsk3'
  },
  {
    id: 'hsk3-phrase-015',
    hanzi: '我对中国文化很感兴趣',
    pinyin: 'wǒ duì zhōngguó wénhuà hěn gǎn xìngqù',
    translation: 'I am very interested in Chinese culture',
    translationFr: 'Je suis très intéressé par la culture chinoise',
    audio: 'audio/phrases/hsk3-phrase-015.wav',
    level: 'hsk3'
  },
  {
    id: 'hsk3-phrase-016',
    hanzi: '昨天我参加了一个聚会',
    pinyin: 'zuótiān wǒ cānjiā le yí ge jùhuì',
    translation: 'Yesterday I attended a party',
    translationFr: 'Hier j\'ai participé à une fête',
    audio: 'audio/phrases/hsk3-phrase-016.wav',
    level: 'hsk3'
  },
  {
    id: 'hsk3-phrase-017',
    hanzi: '我们应该保护环境',
    pinyin: 'wǒmen yīnggāi bǎohù huánjìng',
    translation: 'We should protect the environment',
    translationFr: 'Nous devrions protéger l\'environnement',
    audio: 'audio/phrases/hsk3-phrase-017.wav',
    level: 'hsk3'
  },
  {
    id: 'hsk3-phrase-018',
    hanzi: '他比我高一点儿',
    pinyin: 'tā bǐ wǒ gāo yìdiǎnr',
    translation: 'He is a little taller than me',
    translationFr: 'Il est un peu plus grand que moi',
    audio: 'audio/phrases/hsk3-phrase-018.wav',
    level: 'hsk3'
  },
  {
    id: 'hsk3-phrase-019',
    hanzi: '这个城市越来越漂亮了',
    pinyin: 'zhège chéngshì yuè lái yuè piàoliang le',
    translation: 'This city is getting more and more beautiful',
    translationFr: 'Cette ville devient de plus en plus belle',
    audio: 'audio/phrases/hsk3-phrase-019.wav',
    level: 'hsk3'
  },
  {
    id: 'hsk3-phrase-020',
    hanzi: '我把钱包忘在家里了',
    pinyin: 'wǒ bǎ qiánbāo wàng zài jiā lǐ le',
    translation: 'I forgot my wallet at home',
    translationFr: 'J\'ai oublié mon portefeuille à la maison',
    audio: 'audio/phrases/hsk3-phrase-020.wav',
    level: 'hsk3'
  },
  {
    id: 'hsk3-phrase-021',
    hanzi: '我们一边吃饭一边聊天',
    pinyin: 'wǒmen yìbiān chī fàn yìbiān liáotiān',
    translation: 'We chat while eating',
    translationFr: 'Nous discutons en mangeant',
    audio: 'audio/phrases/hsk3-phrase-021.wav',
    level: 'hsk3'
  },
  {
    id: 'hsk3-phrase-022',
    hanzi: '他向我借了一本书',
    pinyin: 'tā xiàng wǒ jiè le yì běn shū',
    translation: 'He borrowed a book from me',
    translationFr: 'Il m\'a emprunté un livre',
    audio: 'audio/phrases/hsk3-phrase-022.wav',
    level: 'hsk3'
  },
  {
    id: 'hsk3-phrase-023',
    hanzi: '我对这个结果很满意',
    pinyin: 'wǒ duì zhège jiéguǒ hěn mǎnyì',
    translation: 'I am satisfied with this result',
    translationFr: 'Je suis satisfait de ce résultat',
    audio: 'audio/phrases/hsk3-phrase-023.wav',
    level: 'hsk3'
  },
  {
    id: 'hsk3-phrase-024',
    hanzi: '你最好早点出发',
    pinyin: 'nǐ zuì hǎo zǎo diǎn chūfā',
    translation: 'You\'d better leave early',
    translationFr: 'Tu ferais mieux de partir tôt',
    audio: 'audio/phrases/hsk3-phrase-024.wav',
    level: 'hsk3'
  },
  {
    id: 'hsk3-phrase-025',
    hanzi: '我想了解一下中国历史',
    pinyin: 'wǒ xiǎng liǎojiě yíxià zhōngguó lìshǐ',
    translation: 'I want to learn about Chinese history',
    translationFr: 'Je veux me renseigner sur l\'histoire chinoise',
    audio: 'audio/phrases/hsk3-phrase-025.wav',
    level: 'hsk3'
  },
  {
    id: 'hsk3-phrase-026',
    hanzi: '除了工作以外，我还喜欢运动',
    pinyin: 'chúle gōngzuò yǐwài, wǒ hái xǐhuan yùndòng',
    translation: 'Besides work, I also like sports',
    translationFr: 'En plus du travail, j\'aime aussi le sport',
    audio: 'audio/phrases/hsk3-phrase-026.wav',
    level: 'hsk3'
  },
  {
    id: 'hsk3-phrase-027',
    hanzi: '他们正在讨论这个问题',
    pinyin: 'tāmen zhèngzài tǎolùn zhège wèntí',
    translation: 'They are discussing this issue',
    translationFr: 'Ils sont en train de discuter de ce problème',
    audio: 'audio/phrases/hsk3-phrase-027.wav',
    level: 'hsk3'
  },
  {
    id: 'hsk3-phrase-028',
    hanzi: '我决定接受这份工作',
    pinyin: 'wǒ juédìng jiēshòu zhè fèn gōngzuò',
    translation: 'I decided to accept this job',
    translationFr: 'J\'ai décidé d\'accepter ce travail',
    audio: 'audio/phrases/hsk3-phrase-028.wav',
    level: 'hsk3'
  },
  {
    id: 'hsk3-phrase-029',
    hanzi: '我们应该互相帮助',
    pinyin: 'wǒmen yīnggāi hùxiāng bāngzhù',
    translation: 'We should help each other',
    translationFr: 'Nous devrions nous entraider',
    audio: 'audio/phrases/hsk3-phrase-029.wav',
    level: 'hsk3'
  },
  {
    id: 'hsk3-phrase-030',
    hanzi: '这次旅行让我印象深刻',
    pinyin: 'zhè cì lǚxíng ràng wǒ yìnxiàng shēnkè',
    translation: 'This trip left a deep impression on me',
    translationFr: 'Ce voyage m\'a beaucoup marqué',
    audio: 'audio/phrases/hsk3-phrase-030.wav',
    level: 'hsk3'
  },
  {
    id: 'hsk3-phrase-031',
    hanzi: '我需要找一个安静的地方学习',
    pinyin: 'wǒ xūyào zhǎo yí ge ānjìng de dìfang xuéxí',
    translation: 'I need to find a quiet place to study',
    translationFr: 'J\'ai besoin de trouver un endroit calme pour étudier',
    audio: 'audio/phrases/hsk3-phrase-031.wav',
    level: 'hsk3'
  },
  {
    id: 'hsk3-phrase-032',
    hanzi: '他的态度让我很生气',
    pinyin: 'tā de tàidu ràng wǒ hěn shēngqì',
    translation: 'His attitude makes me very angry',
    translationFr: 'Son attitude me met en colère',
    audio: 'audio/phrases/hsk3-phrase-032.wav',
    level: 'hsk3'
  },
  {
    id: 'hsk3-phrase-033',
    hanzi: '我相信你一定能成功',
    pinyin: 'wǒ xiāngxìn nǐ yídìng néng chénggōng',
    translation: 'I believe you will definitely succeed',
    translationFr: 'Je crois que tu vas certainement réussir',
    audio: 'audio/phrases/hsk3-phrase-033.wav',
    level: 'hsk3'
  },
  {
    id: 'hsk3-phrase-034',
    hanzi: '这个问题需要仔细考虑',
    pinyin: 'zhège wèntí xūyào zǐxì kǎolǜ',
    translation: 'This issue needs careful consideration',
    translationFr: 'Ce problème nécessite une réflexion approfondie',
    audio: 'audio/phrases/hsk3-phrase-034.wav',
    level: 'hsk3'
  },
  {
    id: 'hsk3-phrase-035',
    hanzi: '我们应该尊重不同的文化',
    pinyin: 'wǒmen yīnggāi zūnzhòng bùtóng de wénhuà',
    translation: 'We should respect different cultures',
    translationFr: 'Nous devrions respecter les différentes cultures',
    audio: 'audio/phrases/hsk3-phrase-035.wav',
    level: 'hsk3'
  },
  {
    id: 'hsk3-phrase-036',
    hanzi: '他的表现超出了我的预期',
    pinyin: 'tā de biǎoxiàn chāochū le wǒ de yùqī',
    translation: 'His performance exceeded my expectations',
    translationFr: 'Sa performance a dépassé mes attentes',
    audio: 'audio/phrases/hsk3-phrase-036.wav',
    level: 'hsk3'
  },
  {
    id: 'hsk3-phrase-037',
    hanzi: '我终于完成了这个项目',
    pinyin: 'wǒ zhōngyú wánchéng le zhège xiàngmù',
    translation: 'I finally completed this project',
    translationFr: 'J\'ai finalement terminé ce projet',
    audio: 'audio/phrases/hsk3-phrase-037.wav',
    level: 'hsk3'
  },
  {
    id: 'hsk3-phrase-038',
    hanzi: '为了学好汉语，我每天都练习',
    pinyin: 'wèile xué hǎo hànyǔ, wǒ měitiān dōu liànxí',
    translation: 'In order to learn Chinese well, I practice every day',
    translationFr: 'Pour bien apprendre le chinois, je m\'entraîne tous les jours',
    audio: 'audio/phrases/hsk3-phrase-038.wav',
    level: 'hsk3'
  },
  {
    id: 'hsk3-phrase-039',
    hanzi: '他不但聪明而且很努力',
    pinyin: 'tā búdàn cōngming érqiě hěn nǔlì',
    translation: 'He is not only smart but also hardworking',
    translationFr: 'Il est non seulement intelligent mais aussi travailleur',
    audio: 'audio/phrases/hsk3-phrase-039.wav',
    level: 'hsk3'
  },
  {
    id: 'hsk3-phrase-040',
    hanzi: '我们的意见基本一致',
    pinyin: 'wǒmen de yìjiàn jīběn yízhì',
    translation: 'Our opinions are basically the same',
    translationFr: 'Nos opinions sont fondamentalement identiques',
    audio: 'audio/phrases/hsk3-phrase-040.wav',
    level: 'hsk3'
  },
  {
    id: 'hsk3-phrase-041',
    hanzi: '这个方法很有效',
    pinyin: 'zhège fāngfǎ hěn yǒuxiào',
    translation: 'This method is very effective',
    translationFr: 'Cette méthode est très efficace',
    audio: 'audio/phrases/hsk3-phrase-041.wav',
    level: 'hsk3'
  },
  {
    id: 'hsk3-phrase-042',
    hanzi: '我们需要更多的时间来准备',
    pinyin: 'wǒmen xūyào gèng duō de shíjiān lái zhǔnbèi',
    translation: 'We need more time to prepare',
    translationFr: 'Nous avons besoin de plus de temps pour nous préparer',
    audio: 'audio/phrases/hsk3-phrase-042.wav',
    level: 'hsk3'
  },
  {
    id: 'hsk3-phrase-043',
    hanzi: '他的话让我很感动',
    pinyin: 'tā de huà ràng wǒ hěn gǎndòng',
    translation: 'His words moved me very much',
    translationFr: 'Ses paroles m\'ont beaucoup touché',
    audio: 'audio/phrases/hsk3-phrase-043.wav',
    level: 'hsk3'
  },
  {
    id: 'hsk3-phrase-044',
    hanzi: '我们应该珍惜现在的生活',
    pinyin: 'wǒmen yīnggāi zhēnxī xiànzài de shēnghuó',
    translation: 'We should cherish our current life',
    translationFr: 'Nous devrions chérir notre vie actuelle',
    audio: 'audio/phrases/hsk3-phrase-044.wav',
    level: 'hsk3'
  },
  {
    id: 'hsk3-phrase-045',
    hanzi: '这个经验对我很有帮助',
    pinyin: 'zhège jīngyàn duì wǒ hěn yǒu bāngzhù',
    translation: 'This experience is very helpful to me',
    translationFr: 'Cette expérience m\'est très utile',
    audio: 'audio/phrases/hsk3-phrase-045.wav',
    level: 'hsk3'
  },
  {
    id: 'hsk3-phrase-046',
    hanzi: '无论遇到什么困难，都不要放弃',
    pinyin: 'wúlùn yùdào shénme kùnnan, dōu búyào fàngqì',
    translation: 'No matter what difficulties you encounter, don\'t give up',
    translationFr: 'Quelles que soient les difficultés rencontrées, n\'abandonne pas',
    audio: 'audio/phrases/hsk3-phrase-046.wav',
    level: 'hsk3'
  },
  {
    id: 'hsk3-phrase-047',
    hanzi: '我打算利用假期去旅游',
    pinyin: 'wǒ dǎsuàn lìyòng jiàqī qù lǚyóu',
    translation: 'I plan to use the vacation to travel',
    translationFr: 'Je prévois de profiter des vacances pour voyager',
    audio: 'audio/phrases/hsk3-phrase-047.wav',
    level: 'hsk3'
  },
  {
    id: 'hsk3-phrase-048',
    hanzi: '他的成绩比以前进步了很多',
    pinyin: 'tā de chéngjī bǐ yǐqián jìnbù le hěn duō',
    translation: 'His grades have improved a lot compared to before',
    translationFr: 'Ses résultats se sont beaucoup améliorés par rapport à avant',
    audio: 'audio/phrases/hsk3-phrase-048.wav',
    level: 'hsk3'
  },
  {
    id: 'hsk3-phrase-049',
    hanzi: '我们应该养成良好的习惯',
    pinyin: 'wǒmen yīnggāi yǎngchéng liánghǎo de xíguàn',
    translation: 'We should develop good habits',
    translationFr: 'Nous devrions développer de bonnes habitudes',
    audio: 'audio/phrases/hsk3-phrase-049.wav',
    level: 'hsk3'
  },
  {
    id: 'hsk3-phrase-050',
    hanzi: '通过这次经历，我学到了很多',
    pinyin: 'tōngguò zhè cì jīnglì, wǒ xué dào le hěn duō',
    translation: 'Through this experience, I learned a lot',
    translationFr: 'Grâce à cette expérience, j\'ai beaucoup appris',
    audio: 'audio/phrases/hsk3-phrase-050.wav',
    level: 'hsk3'
  }
];

export const getPhrasesByLevel = (level: 'hsk1' | 'hsk2' | 'hsk3') => {
  return dictationPhrases.filter(phrase => phrase.level === level);
};

export const getAllPhrases = () => dictationPhrases;
