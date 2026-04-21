/**
 * dialogues.ts — Catalogue de dialogues XiaoLearn
 * ------------------------------------------------
 * Chaque dialogue est rattaché à un niveau CECR et un thème. Les dialogues
 * servent dans DialoguePageV2 (liste indépendante) et sont aussi référencés
 * par certaines leçons via LessonModule.dialogue.
 *
 * Principe rédactionnel :
 *   - Dialogue court (5-10 répliques), une intention communicative claire.
 *   - Traductions fr ET en fournies.
 *   - Pinyin systématique.
 *   - Le vocabulaire clé est extrait en fin de dialogue.
 */

import type { Dialogue } from '../types/lesson-structure';
import { cecrB2ExtraDialogues } from './cecr-b2-texts';

export interface DialogueEntry {
  cecrLevel: 'a1' | 'a2' | 'b1.1' | 'b1.2' | 'b2.1' | 'b2.2' | 'c1.1' | 'c1.2' | 'c2.1' | 'c2.2';
  theme: string;         // ex : "Salutations", "Restaurant"
  themeEn: string;
  dialogue: Dialogue;
}

export const dialogues: DialogueEntry[] = [
  // ========== A1 ==========
  {
    cecrLevel: 'a1',
    theme: 'Salutations',
    themeEn: 'Greetings',
    dialogue: {
      id: 'dlg-a1-hello',
      title: 'Premier bonjour',
      titleEn: 'First hello',
      context: 'Deux étudiants se rencontrent pour la première fois à l\'université.',
      contextEn: 'Two students meet for the first time at university.',
      lines: [
        { speaker: '小明', hanzi: '你好！', pinyin: 'Nǐ hǎo!', translationFr: 'Bonjour !', translationEn: 'Hello!' },
        { speaker: '王丽', hanzi: '你好！你叫什么名字？', pinyin: 'Nǐ hǎo! Nǐ jiào shénme míngzi?', translationFr: 'Bonjour ! Comment t\'appelles-tu ?', translationEn: 'Hello! What\'s your name?' },
        { speaker: '小明', hanzi: '我叫小明。你呢？', pinyin: 'Wǒ jiào Xiǎo Míng. Nǐ ne?', translationFr: 'Je m\'appelle Xiao Ming. Et toi ?', translationEn: 'I\'m Xiao Ming. And you?' },
        { speaker: '王丽', hanzi: '我叫王丽。很高兴认识你。', pinyin: 'Wǒ jiào Wáng Lì. Hěn gāoxìng rènshi nǐ.', translationFr: 'Je m\'appelle Wang Li. Ravie de te rencontrer.', translationEn: 'I\'m Wang Li. Nice to meet you.' },
        { speaker: '小明', hanzi: '我也很高兴认识你。', pinyin: 'Wǒ yě hěn gāoxìng rènshi nǐ.', translationFr: 'Moi aussi, ravi de te rencontrer.', translationEn: 'Nice to meet you too.', note: '也 = aussi, se place avant le verbe.', noteEn: '也 = also, placed before the verb.' }
      ],
      vocab: ['你好', '叫', '名字', '我', '你', '认识', '高兴', '也'],
      comprehension: {
        questionFr: 'Comment s\'appelle le garçon ?',
        questionEn: 'What is the boy\'s name?',
        answerFr: 'Il s\'appelle Xiao Ming (小明).',
        answerEn: 'His name is Xiao Ming (小明).'
      }
    }
  },
  {
    cecrLevel: 'a1',
    theme: 'Famille',
    themeEn: 'Family',
    dialogue: {
      id: 'dlg-a1-family',
      title: 'Ta famille',
      titleEn: 'Your family',
      context: 'Un étudiant chinois pose des questions sur la famille de son correspondant.',
      contextEn: 'A Chinese student asks about their pen pal\'s family.',
      lines: [
        { speaker: '老师', hanzi: '你家有几个人？', pinyin: 'Nǐ jiā yǒu jǐ ge rén?', translationFr: 'Combien de personnes y a-t-il dans ta famille ?', translationEn: 'How many people are in your family?' },
        { speaker: '学生', hanzi: '我家有四个人：爸爸、妈妈、姐姐和我。', pinyin: 'Wǒ jiā yǒu sì ge rén: bàba, māma, jiějie hé wǒ.', translationFr: 'Nous sommes quatre : papa, maman, ma grande sœur et moi.', translationEn: 'There are four of us: dad, mom, older sister and me.' },
        { speaker: '老师', hanzi: '你姐姐做什么工作？', pinyin: 'Nǐ jiějie zuò shénme gōngzuò?', translationFr: 'Que fait ta grande sœur dans la vie ?', translationEn: 'What does your older sister do for work?' },
        { speaker: '学生', hanzi: '她是老师。', pinyin: 'Tā shì lǎoshī.', translationFr: 'Elle est professeure.', translationEn: 'She\'s a teacher.' },
        { speaker: '老师', hanzi: '真好！', pinyin: 'Zhēn hǎo!', translationFr: 'C\'est super !', translationEn: 'That\'s great!' }
      ],
      vocab: ['家', '爸爸', '妈妈', '姐姐', '和', '几个人', '工作', '老师'],
      comprehension: {
        questionFr: 'Que fait la sœur de l\'étudiant ?',
        questionEn: 'What does the student\'s sister do?',
        answerFr: 'Elle est professeure (老师).',
        answerEn: 'She\'s a teacher (老师).'
      }
    }
  },

  // ========== A2 ==========
  {
    cecrLevel: 'a2',
    theme: 'Restaurant',
    themeEn: 'Restaurant',
    dialogue: {
      id: 'dlg-a2-restaurant',
      title: 'Commander au restaurant',
      titleEn: 'Ordering at a restaurant',
      context: 'Au restaurant, un client commande son repas au serveur.',
      contextEn: 'At a restaurant, a customer orders their meal from the waiter.',
      lines: [
        { speaker: '服务员', hanzi: '您好，请问您想吃什么？', pinyin: 'Nín hǎo, qǐngwèn nín xiǎng chī shénme?', translationFr: 'Bonjour, que souhaitez-vous manger ?', translationEn: 'Hello, what would you like to eat?', note: '您 est la forme polie de 你.', noteEn: '您 is the polite form of 你.' },
        { speaker: '客人', hanzi: '我想吃宫保鸡丁和米饭。', pinyin: 'Wǒ xiǎng chī gōngbǎo jīdīng hé mǐfàn.', translationFr: 'Je voudrais du poulet kung pao et du riz.', translationEn: 'I\'d like kung pao chicken and rice.' },
        { speaker: '服务员', hanzi: '好的。您要喝什么？', pinyin: 'Hǎo de. Nín yào hē shénme?', translationFr: 'D\'accord. Que voulez-vous boire ?', translationEn: 'Alright. What would you like to drink?' },
        { speaker: '客人', hanzi: '请给我一杯茶。', pinyin: 'Qǐng gěi wǒ yì bēi chá.', translationFr: 'Une tasse de thé, s\'il vous plaît.', translationEn: 'A cup of tea, please.' },
        { speaker: '服务员', hanzi: '还要别的吗？', pinyin: 'Hái yào biéde ma?', translationFr: 'Autre chose ?', translationEn: 'Anything else?' },
        { speaker: '客人', hanzi: '不用了，谢谢。', pinyin: 'Bú yòng le, xièxie.', translationFr: 'Non merci, ça ira.', translationEn: 'No thanks, that\'s all.' }
      ],
      vocab: ['吃', '喝', '想', '要', '茶', '米饭', '宫保鸡丁', '别的', '不用'],
      comprehension: {
        questionFr: 'Que commande le client à boire ?',
        questionEn: 'What does the customer order to drink?',
        answerFr: 'Une tasse de thé (一杯茶).',
        answerEn: 'A cup of tea (一杯茶).'
      }
    }
  },
  {
    cecrLevel: 'a2',
    theme: 'Métro',
    themeEn: 'Metro',
    dialogue: {
      id: 'dlg-a2-metro',
      title: 'Prendre le métro',
      titleEn: 'Taking the metro',
      context: 'Un touriste demande son chemin dans une station de métro à Pékin.',
      contextEn: 'A tourist asks for directions in a Beijing metro station.',
      lines: [
        { speaker: '游客', hanzi: '请问，到天安门怎么走？', pinyin: 'Qǐngwèn, dào Tiān\'ānmén zěnme zǒu?', translationFr: 'Excusez-moi, comment va-t-on à Tian\'anmen ?', translationEn: 'Excuse me, how do I get to Tiananmen?' },
        { speaker: '工作人员', hanzi: '坐一号线，在天安门东站下车。', pinyin: 'Zuò yī hào xiàn, zài Tiān\'ānmén dōng zhàn xià chē.', translationFr: 'Prenez la ligne 1, descendez à la station Tian\'anmen Est.', translationEn: 'Take line 1, get off at Tiananmen East.' },
        { speaker: '游客', hanzi: '要多长时间？', pinyin: 'Yào duō cháng shíjiān?', translationFr: 'Ça prend combien de temps ?', translationEn: 'How long does it take?' },
        { speaker: '工作人员', hanzi: '大概二十分钟。', pinyin: 'Dàgài èrshí fēnzhōng.', translationFr: 'Environ vingt minutes.', translationEn: 'About twenty minutes.' },
        { speaker: '游客', hanzi: '谢谢您！', pinyin: 'Xièxie nín!', translationFr: 'Merci beaucoup !', translationEn: 'Thank you!' },
        { speaker: '工作人员', hanzi: '不客气。', pinyin: 'Bú kèqi.', translationFr: 'De rien.', translationEn: 'You\'re welcome.' }
      ],
      vocab: ['坐', '地铁', '一号线', '下车', '怎么走', '多长时间', '大概', '分钟'],
      comprehension: {
        questionFr: 'Combien de temps faut-il pour aller à Tian\'anmen ?',
        questionEn: 'How long does it take to get to Tiananmen?',
        answerFr: 'Environ 20 minutes en ligne 1.',
        answerEn: 'About 20 minutes on line 1.'
      }
    }
  },
  {
    cecrLevel: 'a2',
    theme: 'Hôtel',
    themeEn: 'Hotel',
    dialogue: {
      id: 'dlg-a2-hotel',
      title: "Enregistrement à l'hôtel",
      titleEn: 'Hotel check-in',
      context: "Un voyageur arrive dans un hôtel de Pékin le soir et se présente à la réception.",
      contextEn: 'A traveler arrives at a Beijing hotel in the evening and checks in at reception.',
      lines: [
        { speaker: '客人', hanzi: '你好，我有预订，姓李。', pinyin: 'Nǐ hǎo, wǒ yǒu yùdìng, xìng Lǐ.', translationFr: 'Bonjour, j\'ai une réservation au nom de Li.', translationEn: 'Hello, I have a reservation under the name Li.' },
        { speaker: '服务员', hanzi: '您好，李先生。请稍等，我查一下……请问您预订了几天？', pinyin: 'Nín hǎo, Lǐ xiānsheng. Qǐng shāo děng, wǒ chá yīxià…… Qǐngwèn nín yùdìngle jǐ tiān?', translationFr: 'Bonjour Monsieur Li. Un instant, je vérifie… Vous avez réservé pour combien de nuits ?', translationEn: 'Hello Mr. Li. One moment, let me check… How many nights did you book?' },
        { speaker: '客人', hanzi: '三个晚上，单人间。', pinyin: 'Sān gè wǎnshàng, dān rénjiān.', translationFr: 'Trois nuits, chambre simple.', translationEn: 'Three nights, a single room.' },
        { speaker: '服务员', hanzi: '找到了。可以给我看一下您的护照吗？', pinyin: 'Zhǎodàole. Kěyǐ gěi wǒ kàn yīxià nín de hùzhào ma?', translationFr: 'C\'est trouvé. Puis-je voir votre passeport, s\'il vous plaît ?', translationEn: 'Found it. May I see your passport, please?' },
        { speaker: '客人', hanzi: '给您。房费现在付还是退房时付？', pinyin: 'Gěi nín. Fángfèi xiànzài fù háishì tuìfáng shí fù?', translationFr: 'Le voici. Je paie la chambre maintenant ou au départ ?', translationEn: 'Here you are. Do I pay for the room now or at checkout?' },
        { speaker: '服务员', hanzi: '都可以。您方便哪种？', pinyin: 'Dōu kěyǐ. Nín fāngbiàn nǎ zhǒng?', translationFr: 'Les deux sont possibles. Qu\'est-ce qui vous arrange ?', translationEn: 'Either is fine. Which would you prefer?' },
        { speaker: '客人', hanzi: '那退房时再付吧。房间里有Wi-Fi吗？', pinyin: 'Nà tuìfáng shí zài fù ba. Fángjiān lǐ yǒu Wi-Fi ma?', translationFr: 'Alors au départ. Il y a du Wi-Fi dans la chambre ?', translationEn: 'Let\'s do it at checkout, then. Is there Wi-Fi in the room?' },
        { speaker: '服务员', hanzi: '有，密码在房卡背面。早餐是七点到十点，在二楼。', pinyin: 'Yǒu, mìmǎ zài fángkǎ bèimiàn. Zǎocān shì qī diǎn dào shí diǎn, zài èr lóu.', translationFr: 'Oui, le mot de passe est au dos de la carte. Le petit-déjeuner est de 7 à 10 heures, au 2e étage.', translationEn: 'Yes, the password is on the back of your key card. Breakfast is from 7 to 10, on the second floor.' },
        { speaker: '客人', hanzi: '明白了。退房是几点？', pinyin: 'Míngbáile. Tuìfáng shì jǐ diǎn?', translationFr: 'C\'est noté. Le départ se fait à quelle heure ?', translationEn: 'Got it. What time is checkout?' },
        { speaker: '服务员', hanzi: '中午十二点。这是您的房卡，八零六房间，在八楼。祝您住得愉快！', pinyin: 'Zhōngwǔ shí\'èr diǎn. Zhè shì nín de fángkǎ, bā líng liù fángjiān, zài bā lóu. Zhù nín zhù de yúkuài!', translationFr: 'Midi. Voici votre carte, chambre 806 au 8e étage. Bon séjour !', translationEn: 'Noon. Here\'s your key card, room 806 on the 8th floor. Enjoy your stay!' },
        { speaker: '客人', hanzi: '谢谢！', pinyin: 'Xièxiè!', translationFr: 'Merci !', translationEn: 'Thank you!' }
      ],
      vocab: ['预订', '单人间', '护照', '房费', '退房', '房卡', '密码', '早餐', '愉快'],
      comprehension: {
        questionFr: 'À quelle heure doit-on libérer la chambre ?',
        questionEn: 'At what time must the room be vacated?',
        answerFr: 'À midi (中午十二点).',
        answerEn: 'At noon (中午十二点).'
      }
    }
  },

  // ========== B1.1 ==========
  {
    cecrLevel: 'b1.1',
    theme: 'Entretien d\'embauche',
    themeEn: 'Job interview',
    dialogue: {
      id: 'dlg-b11-interview',
      title: 'Un premier entretien',
      titleEn: 'A first job interview',
      context: 'Un diplômé passe son premier entretien dans une entreprise privée.',
      contextEn: 'A graduate has their first interview at a private company.',
      lines: [
        { speaker: '经理', hanzi: '请你先介绍一下自己。', pinyin: 'Qǐng nǐ xiān jièshào yíxià zìjǐ.', translationFr: 'Pourriez-vous vous présenter ?', translationEn: 'Could you introduce yourself?' },
        { speaker: '应聘者', hanzi: '好的。我叫李华，今年二十四岁。我去年从北京大学毕业了。', pinyin: 'Hǎo de. Wǒ jiào Lǐ Huá, jīnnián èrshísì suì. Wǒ qùnián cóng Běijīng Dàxué bìyè le.', translationFr: 'Bien. Je m\'appelle Li Hua, j\'ai 24 ans. J\'ai obtenu mon diplôme de l\'Université de Pékin l\'année dernière.', translationEn: 'Sure. My name is Li Hua, I\'m 24. I graduated from Peking University last year.', note: '了 marque l\'action passée et accomplie.', noteEn: '了 marks a completed past action.' },
        { speaker: '经理', hanzi: '你为什么想来我们公司工作？', pinyin: 'Nǐ wèishénme xiǎng lái wǒmen gōngsī gōngzuò?', translationFr: 'Pourquoi souhaitez-vous travailler chez nous ?', translationEn: 'Why do you want to work at our company?' },
        { speaker: '应聘者', hanzi: '因为我对贵公司的产品很感兴趣，而且我的专业很对口。', pinyin: 'Yīnwèi wǒ duì guì gōngsī de chǎnpǐn hěn gǎn xìngqù, érqiě wǒ de zhuānyè hěn duìkǒu.', translationFr: 'Parce que vos produits m\'intéressent beaucoup, et mon domaine d\'études correspond.', translationEn: 'Because I\'m very interested in your products, and my field matches well.' },
        { speaker: '经理', hanzi: '你有什么优势？', pinyin: 'Nǐ yǒu shénme yōushì?', translationFr: 'Quels sont vos points forts ?', translationEn: 'What are your strengths?' },
        { speaker: '应聘者', hanzi: '我工作认真，学习能力也很强。', pinyin: 'Wǒ gōngzuò rènzhēn, xuéxí nénglì yě hěn qiáng.', translationFr: 'Je travaille avec sérieux et j\'apprends rapidement.', translationEn: 'I work diligently and I\'m a fast learner.' }
      ],
      vocab: ['介绍', '自己', '毕业', '公司', '工作', '为什么', '产品', '专业', '优势', '能力'],
      comprehension: {
        questionFr: 'Quand Li Hua a-t-il obtenu son diplôme ?',
        questionEn: 'When did Li Hua graduate?',
        answerFr: 'Il est diplômé depuis l\'année dernière (去年).',
        answerEn: 'He graduated last year (去年).'
      }
    }
  },

  // ========== B1.2 ==========
  {
    cecrLevel: 'b1.2',
    theme: 'Générations',
    themeEn: 'Generations',
    dialogue: {
      id: 'dlg-b12-generations',
      title: '90后 et 00后',
      titleEn: '90s & 00s kids',
      context: 'Deux amis discutent des différences entre leurs générations.',
      contextEn: 'Two friends discuss the differences between their generations.',
      lines: [
        { speaker: '小李', hanzi: '你觉得90后和00后有什么不同？', pinyin: 'Nǐ juéde jiǔlínghòu hé línglínghòu yǒu shénme bùtóng?', translationFr: 'Selon toi, quelles différences y a-t-il entre les 90后 et les 00后 ?', translationEn: 'What differences do you see between 90s and 00s kids?' },
        { speaker: '小王', hanzi: '我觉得00后更喜欢刷短视频，而90后更习惯看微博。', pinyin: 'Wǒ juéde línglínghòu gèng xǐhuan shuā duǎn shìpín, ér jiǔlínghòu gèng xíguàn kàn Wēibó.', translationFr: 'Je trouve que les 00后 adorent scroller les shorts, alors que les 90后 sont plus habitués à Weibo.', translationEn: 'I think 00s kids love scrolling short videos, while 90s kids are more used to Weibo.' },
        { speaker: '小李', hanzi: '是的。而且00后更愿意\u201c躺平\u201d。', pinyin: 'Shì de. Érqiě línglínghòu gèng yuànyì "tǎng píng".', translationFr: 'Oui. Et les 00后 sont plus prêts à « s\'allonger à plat ».', translationEn: 'Right. And 00s kids are more willing to "lie flat".', note: '躺平 = abandonner la course à la compétition.', noteEn: '躺平 = give up the competition rat race.' },
        { speaker: '小王', hanzi: '不过，每一代人都有自己的压力。', pinyin: 'Búguò, měi yí dài rén dōu yǒu zìjǐ de yālì.', translationFr: 'Cela dit, chaque génération a ses propres pressions.', translationEn: 'Still, every generation has its own pressures.' },
        { speaker: '小李', hanzi: '你说得对。', pinyin: 'Nǐ shuō de duì.', translationFr: 'Tu as raison.', translationEn: 'You\'re right.' }
      ],
      vocab: ['90后', '00后', '不同', '短视频', '微博', '躺平', '压力', '一代人', '习惯'],
      comprehension: {
        questionFr: 'Quelle différence numérique Xiao Wang évoque-t-il ?',
        questionEn: 'What digital difference does Xiao Wang mention?',
        answerFr: 'Les 00后 préfèrent les shorts, les 90后 Weibo.',
        answerEn: '00s kids prefer shorts, 90s kids prefer Weibo.'
      }
    }
  },
  {
    cecrLevel: 'b1.2',
    theme: 'Consultation médicale',
    themeEn: 'Medical consultation',
    dialogue: {
      id: 'dlg-b12-doctor',
      title: 'Chez le médecin',
      titleEn: 'At the doctor\'s',
      context: "Un patient se rend chez son médecin de quartier après plusieurs jours de toux et de fièvre.",
      contextEn: 'A patient visits their neighborhood doctor after several days of coughing and fever.',
      lines: [
        { speaker: '医生', hanzi: '请坐。哪里不舒服？', pinyin: 'Qǐng zuò. Nǎlǐ bù shūfu?', translationFr: 'Je vous en prie, asseyez-vous. Qu\'est-ce qui ne va pas ?', translationEn: 'Please have a seat. What\'s bothering you?' },
        { speaker: '病人', hanzi: '这几天一直咳嗽，晚上更严重，睡不好觉。', pinyin: 'Zhè jǐ tiān yīzhí késou, wǎnshàng gèng yánzhòng, shuì bù hǎo jiào.', translationFr: 'Ça fait plusieurs jours que je tousse, c\'est pire le soir et je dors mal.', translationEn: 'I\'ve been coughing for several days — it\'s worse at night and I can\'t sleep well.' },
        { speaker: '医生', hanzi: '有发烧吗？量过体温没有？', pinyin: 'Yǒu fāshāo ma? Liángguò tǐwēn méiyǒu?', translationFr: 'Avez-vous de la fièvre ? Avez-vous pris votre température ?', translationEn: 'Any fever? Have you taken your temperature?' },
        { speaker: '病人', hanzi: '昨晚量了，三十八度二。今天早上好像降下来了一点。', pinyin: 'Zuówǎn liángle, sānshíbā dù èr. Jīntiān zǎoshang hǎoxiàng jiàng xiàláile yīdiǎn.', translationFr: 'Hier soir, 38,2 °C. Ce matin, elle semble avoir un peu baissé.', translationEn: 'Last night, 38.2°C. This morning it seems to have come down a bit.' },
        { speaker: '医生', hanzi: '我看一下嗓子。张开嘴，说"啊"……嗯，有点红，也有点肿。', pinyin: 'Wǒ kàn yīxià sǎngzi. Zhāng kāi zuǐ, shuō "ā"…… Èn, yǒudiǎn hóng, yě yǒudiǎn zhǒng.', translationFr: 'Je regarde votre gorge. Ouvrez la bouche et dites « ah »… Mm, c\'est un peu rouge et enflé.', translationEn: 'Let me look at your throat. Open your mouth and say "ah"… Hmm, a bit red and swollen.' },
        { speaker: '病人', hanzi: '会不会是流感？最近同事也有好几个人请病假。', pinyin: 'Huì bù huì shì liúgǎn? Zuìjìn tóngshì yě yǒu hǎo jǐ gè rén qǐng bìngjià.', translationFr: 'Ça pourrait être une grippe ? Plusieurs collègues sont en arrêt maladie en ce moment.', translationEn: 'Could it be the flu? Several coworkers have been off sick lately.' },
        { speaker: '医生', hanzi: '有这个可能。我先给您开一个血常规，确认一下。', pinyin: 'Yǒu zhège kěnéng. Wǒ xiān gěi nín kāi yīgè xuè chángguī, quèrèn yīxià.', translationFr: 'C\'est possible. Je vais d\'abord vous prescrire une prise de sang pour vérifier.', translationEn: 'That\'s possible. Let me first order a blood test to confirm.' },
        { speaker: '病人', hanzi: '需要打针吗？我有点怕打针。', pinyin: 'Xūyào dǎzhēn ma? Wǒ yǒudiǎn pà dǎzhēn.', translationFr: 'Il faudra une piqûre ? J\'ai un peu peur des piqûres.', translationEn: 'Will I need an injection? I\'m a bit afraid of needles.' },
        { speaker: '医生', hanzi: '不一定。普通感冒的话，吃药加多休息就够了；如果是流感，可能要开抗病毒的。', pinyin: 'Bù yīdìng. Pǔtōng gǎnmào dehuà, chī yào jiā duō xiūxí jiù gòule; rúguǒ shì liúgǎn, kěnéng yào kāi kàng bìngdú de.', translationFr: 'Pas forcément. Pour un simple rhume, médicaments et repos suffisent ; pour la grippe, il faudra peut-être un antiviral.', translationEn: 'Not necessarily. For a common cold, meds and rest are enough; if it\'s flu, I might prescribe an antiviral.', note: '……的话 = « si » (conditionnel souple, très courant à l\'oral).', noteEn: '……的话 = "if" (soft conditional, very common in speech).' },
        { speaker: '病人', hanzi: '好的。那平时要注意什么？', pinyin: 'Hǎo de. Nà píngshí yào zhùyì shénme?', translationFr: 'D\'accord. Et au quotidien, à quoi dois-je faire attention ?', translationEn: 'All right. What should I be careful about day to day?' },
        { speaker: '医生', hanzi: '多喝水，少去人多的地方，暂时不要运动。出门戴口罩，保护自己也保护别人。', pinyin: 'Duō hē shuǐ, shǎo qù rén duō de dìfāng, zànshí bùyào yùndòng. Chūmén dài kǒuzhào, bǎohù zìjǐ yě bǎohù biérén.', translationFr: 'Buvez beaucoup d\'eau, évitez les endroits bondés et pas de sport pour l\'instant. Mettez un masque dehors, pour vous et pour les autres.', translationEn: 'Drink plenty of water, avoid crowded places, no exercise for now. Wear a mask when you go out, to protect yourself and others.' },
        { speaker: '病人', hanzi: '这个药一天吃几次？', pinyin: 'Zhège yào yītiān chī jǐ cì?', translationFr: 'Ce médicament, je le prends combien de fois par jour ?', translationEn: 'How many times a day do I take this medicine?' },
        { speaker: '医生', hanzi: '一天三次，饭后吃，连续吃五天。如果五天后还没好转，再过来看看。', pinyin: 'Yītiān sān cì, fàn hòu chī, liánxù chī wǔ tiān. Rúguǒ wǔ tiān hòu hái méi hǎozhuǎn, zài guòlái kàn kàn.', translationFr: 'Trois fois par jour, après les repas, pendant cinq jours. Si ça ne s\'améliore pas au bout de cinq jours, revenez me voir.', translationEn: 'Three times a day, after meals, for five days. If it hasn\'t improved after five days, come back.' },
        { speaker: '病人', hanzi: '好的，谢谢医生。', pinyin: 'Hǎo de, xièxiè yīshēng.', translationFr: 'Bien, merci docteur.', translationEn: 'Got it, thank you, doctor.' },
        { speaker: '医生', hanzi: '不客气，早日康复。', pinyin: 'Bù kèqì, zǎorì kāngfù.', translationFr: 'Je vous en prie, prompt rétablissement.', translationEn: 'You\'re welcome, get well soon.' }
      ],
      vocab: ['咳嗽', '发烧', '体温', '嗓子', '流感', '血常规', '打针', '抗病毒', '口罩', '饭后', '康复'],
      comprehension: {
        questionFr: 'Combien de temps le patient doit-il prendre le médicament ?',
        questionEn: 'How long should the patient take the medicine?',
        answerFr: 'Cinq jours, trois fois par jour après les repas.',
        answerEn: 'Five days, three times a day after meals.'
      }
    }
  },

  // ========== B2.1 ==========
  {
    cecrLevel: 'b2.1',
    theme: 'Environnement',
    themeEn: 'Environment',
    dialogue: {
      id: 'dlg-b21-environment',
      title: 'Voiture électrique ou pas ?',
      titleEn: 'Electric car or not?',
      context: 'Deux collègues discutent de l\'achat d\'une voiture électrique à Shanghai.',
      contextEn: 'Two colleagues debate buying an electric car in Shanghai.',
      lines: [
        { speaker: '张经理', hanzi: '你最近考虑换电动车了吗？', pinyin: 'Nǐ zuìjìn kǎolǜ huàn diàndòngchē le ma?', translationFr: 'Tu as pensé à passer à l\'électrique récemment ?', translationEn: 'Have you considered switching to an EV recently?' },
        { speaker: '李工程师', hanzi: '考虑过。不但上海的油车牌照很难拿到，而且充电站也越来越方便。', pinyin: 'Kǎolǜ guò. Búdàn Shànghǎi de yóuchē páizhào hěn nán ná dào, érqiě chōngdiàn zhàn yě yuè lái yuè fāngbiàn.', translationFr: 'J\'y ai pensé. D\'une part, les plaques thermiques sont très dures à obtenir à Shanghai, d\'autre part, les bornes sont de plus en plus pratiques.', translationEn: 'Yes. On one hand, combustion plates are hard to get in Shanghai; on the other, charging stations keep improving.', note: '不但…而且 = non seulement…mais aussi.', noteEn: '不但…而且 = not only…but also.' },
        { speaker: '张经理', hanzi: '那你倾向于哪个品牌？', pinyin: 'Nà nǐ qīngxiàng yú nǎge pǐnpái?', translationFr: 'Tu penches pour quelle marque ?', translationEn: 'Which brand are you leaning toward?' },
        { speaker: '李工程师', hanzi: '我觉得比亚迪的性价比最高，特斯拉虽然有名，但是价格太贵。', pinyin: 'Wǒ juéde Bǐyàdí de xìngjiàbǐ zuì gāo, Tèsīlā suīrán yǒumíng, dànshì jiàgé tài guì.', translationFr: 'BYD a le meilleur rapport qualité-prix ; Tesla est célèbre mais trop cher.', translationEn: 'BYD has the best value; Tesla is famous but too expensive.' },
        { speaker: '张经理', hanzi: '有道理。不过，充电时间还是比加油慢得多。', pinyin: 'Yǒu dàolǐ. Búguò, chōngdiàn shíjiān háishi bǐ jiāyóu màn de duō.', translationFr: 'Ça se tient. Mais la recharge reste bien plus lente que faire le plein.', translationEn: 'Makes sense. But charging is still much slower than refueling.' },
        { speaker: '李工程师', hanzi: '所以长途旅行前要提前规划好。', pinyin: 'Suǒyǐ chángtú lǚxíng qián yào tíqián guīhuà hǎo.', translationFr: 'Il faut donc bien planifier avant un long trajet.', translationEn: 'So you need to plan ahead before a long trip.' }
      ],
      vocab: ['电动车', '牌照', '充电', '品牌', '比亚迪', '特斯拉', '性价比', '价格', '规划', '不但...而且'],
      comprehension: {
        questionFr: 'Pourquoi Li préfère BYD à Tesla ?',
        questionEn: 'Why does Li prefer BYD over Tesla?',
        answerFr: 'Meilleur rapport qualité-prix (性价比最高).',
        answerEn: 'Better value for money (性价比最高).'
      }
    }
  }
];

// V8 : dialogue long B2.1 (pitch d'une startup medtech à un investisseur),
// défini dans cecr-b2-texts.ts pour ne pas alourdir ce fichier.
dialogues.push(...cecrB2ExtraDialogues);

export const getDialogueById = (id: string) => dialogues.find((d) => d.dialogue.id === id)?.dialogue;
export const getDialoguesByLevel = (level: DialogueEntry['cecrLevel']) =>
  dialogues.filter((d) => d.cecrLevel === level);
