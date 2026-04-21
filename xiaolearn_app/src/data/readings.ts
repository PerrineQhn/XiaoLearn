/**
 * readings.ts — Textes de lecture XiaoLearn
 * ------------------------------------------
 * Textes courts (5-12 phrases) calibrés par niveau CECR. Chaque phrase a sa
 * version hanzi, pinyin et traduction fr/en. Utilisés par ReadingPageV2
 * (catalogue) et par certaines leçons via LessonModule.reading.
 */

import type { ReadingText } from '../types/lesson-structure';
// Import différé pour éviter la circularité : cecr-b2-texts re-importe ReadingEntry.
import { cecrB2ExtraReadings } from './cecr-b2-texts';

export interface ReadingEntry {
  cecrLevel: 'a1' | 'a2' | 'b1.1' | 'b1.2' | 'b2.1' | 'b2.2' | 'c1.1' | 'c1.2' | 'c2.1' | 'c2.2';
  theme: string;
  themeEn: string;
  reading: ReadingText;
}

export const readings: ReadingEntry[] = [
  // ========== A1 ==========
  {
    cecrLevel: 'a1',
    theme: 'Ma journée',
    themeEn: 'My day',
    reading: {
      id: 'rd-a1-my-day',
      title: 'La journée de Wang Lin',
      titleEn: 'Wang Lin\'s day',
      intro: 'Wang Lin est étudiante à Pékin. Elle raconte une journée typique.',
      introEn: 'Wang Lin is a student in Beijing. She tells about a typical day.',
      segments: [
        { hanzi: '我叫王琳，今年二十岁。', pinyin: 'Wǒ jiào Wáng Lín, jīnnián èrshí suì.', translationFr: 'Je m\'appelle Wang Lin, j\'ai vingt ans cette année.', translationEn: 'My name is Wang Lin, I\'m twenty this year.' },
        { hanzi: '我是学生，我在北京大学学习。', pinyin: 'Wǒ shì xuésheng, wǒ zài Běijīng Dàxué xuéxí.', translationFr: 'Je suis étudiante, j\'étudie à l\'Université de Pékin.', translationEn: 'I\'m a student, I study at Peking University.' },
        { hanzi: '每天早上七点，我起床。', pinyin: 'Měi tiān zǎoshang qī diǎn, wǒ qǐ chuáng.', translationFr: 'Tous les matins, je me lève à sept heures.', translationEn: 'Every morning at 7, I get up.' },
        { hanzi: '我喜欢喝牛奶，吃面包。', pinyin: 'Wǒ xǐhuan hē niúnǎi, chī miànbāo.', translationFr: 'J\'aime boire du lait et manger du pain.', translationEn: 'I like to drink milk and eat bread.' },
        { hanzi: '八点，我去学校。', pinyin: 'Bā diǎn, wǒ qù xuéxiào.', translationFr: 'À huit heures, je vais à l\'école.', translationEn: 'At 8, I go to school.' },
        { hanzi: '晚上，我在家看书。', pinyin: 'Wǎnshang, wǒ zài jiā kàn shū.', translationFr: 'Le soir, je lis à la maison.', translationEn: 'In the evening, I read at home.' }
      ],
      vocab: ['早上', '晚上', '起床', '学校', '牛奶', '面包', '看书', '在'],
      questions: [
        {
          questionFr: 'À quelle heure Wang Lin se lève-t-elle ?',
          questionEn: 'What time does Wang Lin get up?',
          answerFr: 'À sept heures (七点).',
          answerEn: 'At 7 o\'clock (七点).'
        },
        {
          questionFr: 'Où étudie-t-elle ?',
          questionEn: 'Where does she study?',
          answerFr: 'À l\'Université de Pékin (北京大学).',
          answerEn: 'At Peking University (北京大学).'
        }
      ]
    }
  },

  // ========== A2 ==========
  {
    cecrLevel: 'a2',
    theme: 'Voyage',
    themeEn: 'Travel',
    reading: {
      id: 'rd-a2-travel',
      title: 'Un week-end à Xi\'an',
      titleEn: 'A weekend in Xi\'an',
      intro: 'Un jeune Français raconte un week-end de voyage à Xi\'an.',
      introEn: 'A young French person recounts a weekend trip to Xi\'an.',
      segments: [
        { hanzi: '上个周末，我和朋友去西安旅游。', pinyin: 'Shàng ge zhōumò, wǒ hé péngyou qù Xī\'ān lǚyóu.', translationFr: 'Le week-end dernier, mes amis et moi sommes allés à Xi\'an.', translationEn: 'Last weekend, my friends and I went to Xi\'an.' },
        { hanzi: '我们坐高铁去，大概五个小时。', pinyin: 'Wǒmen zuò gāotiě qù, dàgài wǔ ge xiǎoshí.', translationFr: 'Nous y sommes allés en TGV, environ cinq heures.', translationEn: 'We took the high-speed train, about five hours.' },
        { hanzi: '西安的兵马俑非常有名。', pinyin: 'Xī\'ān de Bīngmǎyǒng fēicháng yǒumíng.', translationFr: 'L\'armée de terre cuite de Xi\'an est très célèbre.', translationEn: 'The Terracotta Warriors of Xi\'an are very famous.' },
        { hanzi: '我们看到了几千个兵马俑，真的太厉害了。', pinyin: 'Wǒmen kàn dào le jǐ qiān ge Bīngmǎyǒng, zhēn de tài lìhai le.', translationFr: 'Nous avons vu des milliers de soldats, c\'était impressionnant.', translationEn: 'We saw thousands of warriors, truly amazing.' },
        { hanzi: '晚上，我们去回民街吃小吃。', pinyin: 'Wǎnshang, wǒmen qù Huímín jiē chī xiǎochī.', translationFr: 'Le soir, nous sommes allés manger des snacks rue Huimin.', translationEn: 'In the evening, we went to Hui Street for snacks.' },
        { hanzi: '羊肉泡馍和肉夹馍都很好吃。', pinyin: 'Yángròu pàomó hé ròujiāmó dōu hěn hǎochī.', translationFr: 'Le yangrou paomo et le roujiamo sont tous deux délicieux.', translationEn: 'Both yangrou paomo and roujiamo were delicious.' },
        { hanzi: '下次，我想在西安多住几天。', pinyin: 'Xià cì, wǒ xiǎng zài Xī\'ān duō zhù jǐ tiān.', translationFr: 'La prochaine fois, j\'aimerais rester plus longtemps à Xi\'an.', translationEn: 'Next time, I\'d like to stay in Xi\'an a few more days.' }
      ],
      vocab: ['周末', '旅游', '高铁', '小时', '兵马俑', '有名', '小吃', '好吃', '下次'],
      questions: [
        {
          questionFr: 'Comment le narrateur est-il allé à Xi\'an ?',
          questionEn: 'How did the narrator go to Xi\'an?',
          answerFr: 'En TGV (高铁), environ 5 heures.',
          answerEn: 'By high-speed train (高铁), about 5 hours.'
        }
      ]
    }
  },

  // ========== B1.1 ==========
  {
    cecrLevel: 'b1.1',
    theme: 'Expérience de travail',
    themeEn: 'Work experience',
    reading: {
      id: 'rd-b11-work',
      title: 'Mon premier stage',
      titleEn: 'My first internship',
      intro: 'Li Hua, étudiante en master, raconte l\'expérience de son premier stage en entreprise.',
      introEn: 'Li Hua, a master\'s student, shares her first internship experience.',
      segments: [
        { hanzi: '去年夏天，我在一家互联网公司做了三个月的实习。', pinyin: 'Qùnián xiàtiān, wǒ zài yì jiā hùliánwǎng gōngsī zuò le sān ge yuè de shíxí.', translationFr: 'L\'été dernier, j\'ai fait un stage de trois mois dans une entreprise d\'Internet.', translationEn: 'Last summer, I did a three-month internship at an internet company.' },
        { hanzi: '那时候，我每天早上九点到公司，晚上八点才下班。', pinyin: 'Nà shíhou, wǒ měi tiān zǎoshang jiǔ diǎn dào gōngsī, wǎnshang bā diǎn cái xiàbān.', translationFr: 'À cette époque, j\'arrivais à 9 h et je ne partais qu\'à 20 h.', translationEn: 'Back then, I arrived at 9 and didn\'t leave until 8pm.' },
        { hanzi: '虽然有点累，但是我学到了很多东西。', pinyin: 'Suīrán yǒudiǎn lèi, dànshì wǒ xué dào le hěn duō dōngxi.', translationFr: 'Même si c\'était un peu fatigant, j\'ai beaucoup appris.', translationEn: 'Although it was tiring, I learned a lot.' },
        { hanzi: '我的同事们都很友好，经常帮我解决问题。', pinyin: 'Wǒ de tóngshìmen dōu hěn yǒuhǎo, jīngcháng bāng wǒ jiějué wèntí.', translationFr: 'Mes collègues étaient tous sympathiques et m\'aidaient souvent.', translationEn: 'My colleagues were all friendly and often helped me.' },
        { hanzi: '三个月后，经理对我说：\u201c你工作很认真，继续加油！\u201d', pinyin: 'Sān ge yuè hòu, jīnglǐ duì wǒ shuō: "Nǐ gōngzuò hěn rènzhēn, jìxù jiāyóu!"', translationFr: 'Trois mois plus tard, le manager m\'a dit : « Tu travailles sérieusement, continue ! »', translationEn: 'Three months later, the manager said: "You work hard, keep it up!"' },
        { hanzi: '这次实习让我明白了，学校和社会很不一样。', pinyin: 'Zhè cì shíxí ràng wǒ míngbai le, xuéxiào hé shèhuì hěn bù yíyàng.', translationFr: 'Ce stage m\'a fait comprendre que l\'école et la vie active sont très différentes.', translationEn: 'This internship showed me that school and the working world are very different.' }
      ],
      vocab: ['实习', '互联网', '公司', '下班', '累', '同事', '友好', '经理', '认真', '社会'],
      questions: [
        {
          questionFr: 'Combien de temps a duré le stage ?',
          questionEn: 'How long did the internship last?',
          answerFr: 'Trois mois (三个月).',
          answerEn: 'Three months (三个月).'
        },
        {
          questionFr: 'Qu\'est-ce que Li Hua a appris ?',
          questionEn: 'What did Li Hua learn?',
          answerFr: 'Que l\'école et la vie active sont très différentes.',
          answerEn: 'That school and real work life are very different.'
        }
      ]
    }
  },

  // ========== B1.2 ==========
  {
    cecrLevel: 'b1.2',
    theme: 'Éducation',
    themeEn: 'Education',
    reading: {
      id: 'rd-b12-gaokao',
      title: 'Le gaokao, un pont étroit',
      titleEn: 'The Gaokao, a narrow bridge',
      intro: 'Article court sur la pression du gaokao, l\'examen d\'entrée à l\'université.',
      introEn: 'Short article about the pressure of the gaokao, China\'s university entrance exam.',
      segments: [
        { hanzi: '高考是中国学生人生中最重要的考试之一。', pinyin: 'Gāokǎo shì Zhōngguó xuésheng rénshēng zhōng zuì zhòngyào de kǎoshì zhī yī.', translationFr: 'Le gaokao est l\'un des examens les plus importants de la vie des étudiants chinois.', translationEn: 'The Gaokao is one of the most important exams in Chinese students\' lives.' },
        { hanzi: '每年六月，超过一千万学生参加这个考试。', pinyin: 'Měi nián liù yuè, chāoguò yì qiān wàn xuésheng cānjiā zhè ge kǎoshì.', translationFr: 'Chaque année en juin, plus de dix millions d\'étudiants passent cet examen.', translationEn: 'Every June, over ten million students take this exam.' },
        { hanzi: '人们常说：\u201c高考是千军万马过独木桥。\u201d', pinyin: 'Rénmen cháng shuō: "Gāokǎo shì qiān jūn wàn mǎ guò dúmùqiáo."', translationFr: 'On dit souvent : « Le gaokao, c\'est mille soldats qui traversent un pont étroit. »', translationEn: 'People often say: "The Gaokao is thousands of soldiers crossing a single-log bridge."' },
        { hanzi: '这句话的意思是竞争非常激烈。', pinyin: 'Zhè jù huà de yìsi shì jìngzhēng fēicháng jīliè.', translationFr: 'Cela signifie que la compétition est extrêmement intense.', translationEn: 'This means the competition is extremely fierce.' },
        { hanzi: '为了准备高考，很多学生每天学习十几个小时。', pinyin: 'Wèile zhǔnbèi gāokǎo, hěn duō xuésheng měi tiān xuéxí shí jǐ ge xiǎoshí.', translationFr: 'Pour se préparer, beaucoup d\'étudiants étudient plus de dix heures par jour.', translationEn: 'To prepare, many students study more than ten hours a day.' },
        { hanzi: '有的父母也陪孩子一起复习，压力很大。', pinyin: 'Yǒude fùmǔ yě péi háizi yìqǐ fùxí, yālì hěn dà.', translationFr: 'Certains parents révisent avec leurs enfants, c\'est très stressant.', translationEn: 'Some parents review with their children; the pressure is intense.' },
        { hanzi: '最近，社会开始讨论如何减轻学生的负担。', pinyin: 'Zuìjìn, shèhuì kāishǐ tǎolùn rúhé jiǎnqīng xuésheng de fùdān.', translationFr: 'Récemment, la société commence à débattre de l\'allègement de la charge des élèves.', translationEn: 'Recently, society has started to discuss how to ease students\' burden.' }
      ],
      vocab: ['高考', '考试', '参加', '千军万马', '独木桥', '竞争', '激烈', '准备', '压力', '负担'],
      questions: [
        {
          questionFr: 'Combien d\'étudiants passent le gaokao chaque année ?',
          questionEn: 'How many students take the gaokao each year?',
          answerFr: 'Plus de dix millions (一千万).',
          answerEn: 'Over ten million (一千万).'
        },
        {
          questionFr: 'Que signifie l\'image du « pont étroit » ?',
          questionEn: 'What does the "narrow bridge" image mean?',
          answerFr: 'La compétition est extrêmement intense.',
          answerEn: 'The competition is extremely fierce.'
        }
      ]
    }
  },

  // ========== B2.1 ==========
  {
    cecrLevel: 'b2.1',
    theme: 'Environnement',
    themeEn: 'Environment',
    reading: {
      id: 'rd-b21-environment',
      title: 'La Chine et les énergies renouvelables',
      titleEn: 'China and renewable energy',
      intro: 'Article d\'actualité sur la transition énergétique chinoise.',
      introEn: 'News article on China\'s energy transition.',
      segments: [
        { hanzi: '最近几年，中国在可再生能源领域发展非常迅速。', pinyin: 'Zuìjìn jǐ nián, Zhōngguó zài kě zàishēng néngyuán lǐngyù fāzhǎn fēicháng xùnsù.', translationFr: 'Ces dernières années, la Chine se développe très rapidement dans les énergies renouvelables.', translationEn: 'In recent years, China has developed very rapidly in renewable energy.' },
        { hanzi: '不但在太阳能方面世界第一，而且风能也排在前三。', pinyin: 'Búdàn zài tàiyángnéng fāngmiàn shìjiè dì yī, érqiě fēngnéng yě pái zài qián sān.', translationFr: 'Non seulement numéro un mondial du solaire, elle est aussi dans le top 3 pour l\'éolien.', translationEn: 'Not only is it world number one in solar, it\'s also in the top three for wind.' },
        { hanzi: '然而，中国目前仍然依赖大量煤炭。', pinyin: 'Rán\'ér, Zhōngguó mùqián réngrán yīlài dàliàng méitàn.', translationFr: 'Cependant, la Chine dépend encore largement du charbon aujourd\'hui.', translationEn: 'However, China still relies heavily on coal today.' },
        { hanzi: '政府已经提出了\u201c双碳\u201d目标：2030年碳达峰，2060年碳中和。', pinyin: 'Zhèngfǔ yǐjīng tíchū le "shuāng tàn" mùbiāo: èr líng sān líng nián tàn dá fēng, èr líng liù líng nián tàn zhōnghé.', translationFr: 'Le gouvernement a fixé les « doubles objectifs carbone » : pic d\'émissions en 2030, neutralité en 2060.', translationEn: 'The government has set "dual carbon" targets: peak emissions by 2030, neutrality by 2060.' },
        { hanzi: '专家认为，只要坚持这个方向，气候变化的影响就可以减少。', pinyin: 'Zhuānjiā rènwéi, zhǐyào jiānchí zhè ge fāngxiàng, qìhòu biànhuà de yǐngxiǎng jiù kěyǐ jiǎnshǎo.', translationFr: 'Les experts pensent que, pour peu qu\'on maintienne le cap, on pourra réduire les effets du changement climatique.', translationEn: 'Experts believe that if this course is maintained, climate change impacts can be reduced.' },
        { hanzi: '当然，转型的代价也不小，很多传统工业面临挑战。', pinyin: 'Dāngrán, zhuǎnxíng de dàijià yě bù xiǎo, hěn duō chuántǒng gōngyè miànlín tiǎozhàn.', translationFr: 'Bien sûr, le prix de la transition est élevé, beaucoup d\'industries traditionnelles font face à des défis.', translationEn: 'Of course, the cost of the transition is high, many traditional industries face challenges.' },
        { hanzi: '总之，中国的绿色发展既是机会，也是考验。', pinyin: 'Zǒngzhī, Zhōngguó de lǜsè fāzhǎn jì shì jīhuì, yě shì kǎoyàn.', translationFr: 'En somme, le développement vert de la Chine est à la fois une opportunité et une épreuve.', translationEn: 'In short, China\'s green development is both an opportunity and a test.' }
      ],
      vocab: ['可再生能源', '太阳能', '风能', '煤炭', '碳达峰', '碳中和', '坚持', '气候变化', '转型', '挑战'],
      questions: [
        {
          questionFr: 'Quels sont les « doubles objectifs carbone » chinois ?',
          questionEn: 'What are China\'s "dual carbon" targets?',
          answerFr: 'Pic des émissions en 2030, neutralité carbone en 2060.',
          answerEn: 'Peak emissions in 2030, carbon neutrality in 2060.'
        }
      ]
    }
  }
];

// V8 : ajoute les textes longs authentiques B2.1 (article tech, article éco,
// extrait des Analectes). Ils sont dans cecr-b2-texts.ts pour préserver la
// lisibilité de ce fichier.
readings.push(...cecrB2ExtraReadings);

export const getReadingById = (id: string) => readings.find((r) => r.reading.id === id)?.reading;
export const getReadingsByLevel = (level: ReadingEntry['cecrLevel']) =>
  readings.filter((r) => r.cecrLevel === level);
