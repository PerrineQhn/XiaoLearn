/**
 * hsk-evaluations.ts — Banque d'évaluations mock HSK style officiel
 * ------------------------------------------------------------------
 * Jeu enrichi (tâche #42) : 6 mock tests (HSK 1 → HSK 6), chacun bâti
 * sur le modèle du vrai examen HSK :
 *   - Vocabulaire (4-5 QCM) : reconnaissance sens/pinyin/mot-contexte
 *   - Grammaire (4-5 QCM) : lacune à compléter, choix de particule/connecteur
 *   - Compréhension écrite (4 QCM) : courts dialogues/textes
 *   - Compréhension orale (3-4 QCM) : l'apprenant clique sur 🔊 et choisit la
 *     traduction/paraphrase/détail. Les audios pointent vers la bibliothèque
 *     pré-générée `public/audio/hskN/` (Azure Neural TTS).
 *
 * Les IDs de questions suivent `<level>-<section>-<n>` pour faciliter le
 * debug et la persistance des réponses.
 */
import type { EvaluationV2Config } from '../pages/EvaluationPageV2';
import {
  HSK1_MOCK_B,
  HSK2_MOCK_B,
  HSK3_MOCK_B,
  HSK4_MOCK_B,
  HSK5_MOCK_B,
  HSK6_MOCK_B
} from './hsk-evaluations-b';

// ============================================================================
//  HSK 1 — niveau débutant (150 mots)
// ============================================================================
export const HSK1_MOCK: EvaluationV2Config = {
  id: 'mock-hsk1',
  level: 'hsk1',
  title: 'Mock HSK 1 — Essentiel débutant',
  titleEn: 'Mock HSK 1 — Beginner essentials',
  subtitle: '16 questions réparties sur 4 sections. 10 minutes pour situer ton niveau réel.',
  subtitleEn: '16 questions across 4 sections. 10 minutes to check your true level.',
  durationSeconds: 10 * 60,
  passingPercent: 60,
  xpReward: 120,
  sections: [
    {
      id: 'hsk1-vocab',
      kind: 'vocabulary',
      title: 'Vocabulaire courant',
      titleEn: 'Everyday vocabulary',
      questions: [
        {
          id: 'hsk1-v1',
          prompt: 'Que signifie 老师 ?',
          promptEn: 'What does 老师 mean?',
          choices: ['Étudiant', 'Professeur', 'Ami', 'Médecin'],
          correctIndex: 1,
          explanation: '老师 (lǎoshī) = professeur. Mot le plus fréquent pour désigner l\'enseignant.',
          explanationEn: '老师 (lǎoshī) = teacher. The most common word for an instructor.'
        },
        {
          id: 'hsk1-v2',
          prompt: 'Quel est le pinyin de 朋友 ?',
          promptEn: 'What is the pinyin of 朋友?',
          choices: ['péng yǒu', 'tóng xué', 'pǔ tōng', 'bàng wǎn'],
          correctIndex: 0,
          explanation: '朋友 = péng yǒu (ami). 同学 = camarade de classe, faux ami courant.',
          explanationEn: '朋友 = péng yǒu (friend). 同学 = classmate, a common false friend.'
        },
        {
          id: 'hsk1-v3',
          prompt: 'Lequel désigne un membre de la famille ?',
          promptEn: 'Which word means a family member?',
          choices: ['桌子', '爸爸', '学校', '电脑'],
          correctIndex: 1,
          explanation: '爸爸 = papa. 桌子 = table, 学校 = école, 电脑 = ordinateur.',
          explanationEn: '爸爸 = dad. 桌子 = table, 学校 = school, 电脑 = computer.'
        },
        {
          id: 'hsk1-v4',
          prompt: 'Que signifie 喜欢 ?',
          promptEn: 'What does 喜欢 mean?',
          choices: ['Aller', 'Manger', 'Aimer (bien)', 'Dormir'],
          correctIndex: 2,
          explanation: '喜欢 (xǐhuan) = aimer, apprécier. Base HSK 1 pour exprimer ses goûts.',
          explanationEn: '喜欢 (xǐhuan) = to like. HSK 1 staple for expressing preferences.'
        },
        {
          id: 'hsk1-v5',
          prompt: "Que signifie 水 ?",
          promptEn: "What does 水 mean?",
          choices: ["Feu","Eau","Terre","Bois"],
          correctIndex: 1,
          explanation: "水 (shuǐ) = eau.",
          explanationEn: "水 (shuǐ) = water."
        },
        {
          id: 'hsk1-v6',
          prompt: "Quel est le pinyin de 书 ?",
          promptEn: "Pinyin of 书?",
          choices: ["shū","shuǐ","shàng","sì"],
          correctIndex: 0,
          explanation: "书 (shū) = livre.",
          explanationEn: "书 = book."
        },
        {
          id: 'hsk1-v7',
          prompt: "Lequel est un chiffre ?",
          promptEn: "Which one is a number?",
          choices: ["学","五","家","汉"],
          correctIndex: 1,
          explanation: "五 (wǔ) = cinq.",
          explanationEn: "五 = five."
        },
        {
          id: 'hsk1-v8',
          prompt: "Que signifie 车 ?",
          promptEn: "What does 车 mean?",
          choices: ["Train","Voiture / véhicule","Vélo","Moto"],
          correctIndex: 1,
          explanation: "车 (chē) = véhicule, voiture.",
          explanationEn: "车 = vehicle / car."
        },
        {
          id: 'hsk1-v9',
          prompt: "Que signifie 大 ?",
          promptEn: "What does 大 mean?",
          choices: ["Petit","Grand","Beaucoup","Peu"],
          correctIndex: 1,
          explanation: "大 (dà) = grand.",
          explanationEn: "大 = big."
        },
        {
          id: 'hsk1-v10',
          prompt: "Lequel désigne une boisson ?",
          promptEn: "Which one is a drink?",
          choices: ["茶","桌子","书","狗"],
          correctIndex: 0,
          explanation: "茶 (chá) = thé.",
          explanationEn: "茶 = tea."
        }
      ]
    },
    {
      id: 'hsk1-grammar',
      kind: 'grammar',
      title: 'Grammaire basique',
      titleEn: 'Basic grammar',
      questions: [
        {
          id: 'hsk1-g1',
          prompt: 'Complète : 我 ___ 中国人。',
          promptEn: 'Fill in: 我 ___ 中国人。',
          choices: ['是', '有', '在', '的'],
          correctIndex: 0,
          explanation: '是 (shì) = être. « Je suis Chinois » = 我是中国人.',
          explanationEn: '是 (shì) = to be. "I am Chinese" = 我是中国人.'
        },
        {
          id: 'hsk1-g2',
          prompt: 'Complète : 你 ___ 老师？',
          promptEn: 'Fill in: 你 ___ 老师？',
          choices: ['吗', '呢', '的', '了'],
          correctIndex: 0,
          explanation: '吗 transforme une affirmation en question oui/non : 你是老师吗?',
          explanationEn: '吗 turns a statement into a yes/no question: 你是老师吗?'
        },
        {
          id: 'hsk1-g3',
          prompt: 'Complète : 我有 ___ 个哥哥。',
          promptEn: 'Fill in: 我有 ___ 个哥哥。',
          choices: ['一', '二', '两', '第一'],
          correctIndex: 2,
          explanation: 'Devant un spécificatif (量词) comme 个, on dit 两, pas 二. « J\'ai deux grands frères ».',
          explanationEn: 'Before a measure word (量词) like 个, use 两, not 二. "I have two older brothers".'
        },
        {
          id: 'hsk1-g4',
          prompt: 'Complète : 他 ___ 北京。',
          promptEn: 'Fill in: 他 ___ 北京。',
          choices: ['在', '是', '的', '很'],
          correctIndex: 0,
          explanation: '在 + lieu = se trouver, être à. « Il est à Pékin ».',
          explanationEn: '在 + place = to be at. "He is in Beijing".'
        },
        {
          id: 'hsk1-g5',
          prompt: "Complète : 我 ___ 学生。",
          promptEn: "Fill in: 我 ___ 学生。",
          choices: ["是","有","在","和"],
          correctIndex: 0,
          explanation: "是 relie sujet et attribut : « Je suis étudiant ».",
          explanationEn: "是 links subject + predicate noun."
        },
        {
          id: 'hsk1-g6',
          prompt: "Complète : 这 ___ 什么？",
          promptEn: "Fill in: 这 ___ 什么？",
          choices: ["是","有","要","会"],
          correctIndex: 0,
          explanation: "« Qu'est-ce que c'est ? » = 这是什么？",
          explanationEn: "« What is this? » = 这是什么？"
        },
        {
          id: 'hsk1-g7',
          prompt: "Complète : 我 ___ 喝咖啡。",
          promptEn: "Fill in: 我 ___ 喝咖啡。",
          choices: ["不","没","别","也不"],
          correctIndex: 0,
          explanation: "不 nie le présent / préférence.",
          explanationEn: "不 negates present / preference."
        },
        {
          id: 'hsk1-g8',
          prompt: "Complète : 你 ___ 朋友？",
          promptEn: "Fill in: 你 ___ 朋友？",
          choices: ["有","是","在","的"],
          correctIndex: 0,
          explanation: "有 = avoir : « As-tu des amis ? »",
          explanationEn: "有 = have."
        },
        {
          id: 'hsk1-g9',
          prompt: "Complète : 今天 ___ 星期一。",
          promptEn: "Fill in: 今天 ___ 星期一。",
          choices: ["是","在","和","都"],
          correctIndex: 0,
          explanation: "今天是星期一 = aujourd'hui est lundi.",
          explanationEn: "Today is Monday."
        },
        {
          id: 'hsk1-g10',
          prompt: "Complète : 我 ___ 爱我妈妈。",
          promptEn: "Fill in: 我 ___ 爱我妈妈。",
          choices: ["很","是","在","了"],
          correctIndex: 0,
          explanation: "很 + adjectif/émotion pour l'assertion simple.",
          explanationEn: "很 + adj/emotion for a plain assertion."
        }
      ]
    },
    {
      id: 'hsk1-reading',
      kind: 'reading',
      title: 'Compréhension écrite',
      titleEn: 'Reading comprehension',
      questions: [
        {
          id: 'hsk1-r1',
          context: '我叫小明。我是学生。我喜欢中文。',
          contextEn: '我叫小明。我是学生。我喜欢中文。',
          prompt: 'Que fait Xiao Ming ?',
          promptEn: 'What does Xiao Ming do?',
          choices: [
            'Il est professeur',
            'Il est étudiant et aime le chinois',
            'Il travaille à Pékin',
            'Il est médecin'
          ],
          correctIndex: 1,
          explanation: '我是学生 = je suis étudiant. 我喜欢中文 = j\'aime le chinois.',
          explanationEn: '我是学生 = I am a student. 我喜欢中文 = I like Chinese.'
        },
        {
          id: 'hsk1-r2',
          context: '今天星期六。我不去学校。我在家看书。',
          contextEn: '今天星期六。我不去学校。我在家看书。',
          prompt: 'Que fait la personne aujourd\'hui ?',
          promptEn: 'What is the person doing today?',
          choices: [
            'Elle va à l\'école',
            'Elle lit à la maison',
            'Elle dort',
            'Elle mange au restaurant'
          ],
          correctIndex: 1,
          explanation: '在家看书 = lire à la maison. 我不去学校 = je ne vais pas à l\'école.',
          explanationEn: '在家看书 = read at home. 我不去学校 = I\'m not going to school.'
        },
        {
          id: 'hsk1-r3',
          context: '我爸爸是医生。他很忙。',
          contextEn: '我爸爸是医生。他很忙。',
          prompt: 'Que sait-on sur le père ?',
          promptEn: 'What do we know about the father?',
          choices: [
            'Il est professeur',
            'Il est médecin et très occupé',
            'Il aime le sport',
            'Il habite Pékin'
          ],
          correctIndex: 1,
          explanation: '医生 = médecin. 很忙 = très occupé.',
          explanationEn: '医生 = doctor. 很忙 = very busy.'
        },
        {
          id: 'hsk1-r4',
          context: '现在几点？—— 现在三点。',
          contextEn: '现在几点？—— 现在三点。',
          prompt: 'Quelle heure est-il ?',
          promptEn: 'What time is it?',
          choices: ['2 heures', '3 heures', '4 heures', '30 minutes'],
          correctIndex: 1,
          explanation: '三点 = 3 heures.',
          explanationEn: '三点 = 3 o\'clock.'
        },
        {
          id: 'hsk1-r5',
          context: "我家有四个人：爸爸、妈妈、哥哥和我。",
          contextEn: "我家有四个人：爸爸、妈妈、哥哥和我。",
          prompt: "Combien sont-ils dans la famille ?",
          promptEn: "How many in the family?",
          choices: ["3","4","5","6"],
          correctIndex: 1,
          explanation: "四个人 = 4 personnes.",
          explanationEn: "四个人 = 4 people."
        },
        {
          id: 'hsk1-r6',
          context: "我喜欢吃水果，特别是苹果。",
          contextEn: "我喜欢吃水果，特别是苹果。",
          prompt: "Quel est son fruit préféré ?",
          promptEn: "Favourite fruit?",
          choices: ["Banane","Pomme","Orange","Raisin"],
          correctIndex: 1,
          explanation: "苹果 = pomme.",
          explanationEn: "苹果 = apple."
        },
        {
          id: 'hsk1-r7',
          context: "今天天气很冷。我穿了很多衣服。",
          contextEn: "今天天气很冷。我穿了很多衣服。",
          prompt: "Quel temps fait-il ?",
          promptEn: "What's the weather?",
          choices: ["Chaud","Froid","Pluie","Vent"],
          correctIndex: 1,
          explanation: "天气很冷 = il fait très froid.",
          explanationEn: "Very cold."
        },
        {
          id: 'hsk1-r8',
          context: "我八点去学校，下午四点回家。",
          contextEn: "我八点去学校，下午四点回家。",
          prompt: "À quelle heure rentre-t-il ?",
          promptEn: "When does he go home?",
          choices: ["8h","12h","16h","18h"],
          correctIndex: 2,
          explanation: "下午四点 = 16h.",
          explanationEn: "下午四点 = 4 PM."
        },
        {
          id: 'hsk1-r9',
          context: "我姐姐在北京工作。",
          contextEn: "我姐姐在北京工作。",
          prompt: "Où travaille la grande sœur ?",
          promptEn: "Where does the older sister work?",
          choices: ["Shanghai","Pékin","Canton","Chengdu"],
          correctIndex: 1,
          explanation: "在北京工作 = travaille à Pékin.",
          explanationEn: "Works in Beijing."
        },
        {
          id: 'hsk1-r10',
          context: "这个苹果五块钱。",
          contextEn: "这个苹果五块钱。",
          prompt: "Combien coûte la pomme ?",
          promptEn: "Price of the apple?",
          choices: ["5 yuans","15 yuans","50 yuans","Gratuit"],
          correctIndex: 0,
          explanation: "五块钱 = 5 yuans.",
          explanationEn: "五块钱 = 5 yuan."
        }
      ]
    },
    {
      id: 'hsk1-listening',
      kind: 'listening',
      title: 'Compréhension orale',
      titleEn: 'Listening comprehension',
      questions: [
        {
          id: 'hsk1-l1',
          prompt: 'Clique sur 🔊 puis choisis la bonne traduction.',
          promptEn: 'Click 🔊 then pick the right translation.',
          audio: 'audio/hsk1/hsk1_你好.mp3',
          choices: ['Bonjour', 'Au revoir', 'Merci', 'Pardon'],
          correctIndex: 0,
          explanation: '你好 (nǐhǎo) = bonjour.',
          explanationEn: '你好 (nǐhǎo) = hello.'
        },
        {
          id: 'hsk1-l2',
          prompt: 'Écoute et choisis la bonne réponse.',
          promptEn: 'Listen and pick the right answer.',
          audio: 'audio/hsk1/hsk1_吃饭.mp3',
          choices: ['Dormir', 'Manger (un repas)', 'Marcher', 'Parler'],
          correctIndex: 1,
          explanation: '吃饭 (chīfàn) = manger / prendre un repas.',
          explanationEn: '吃饭 (chīfàn) = eat a meal.'
        },
        {
          id: 'hsk1-l3',
          prompt: 'Écoute et indique le sens.',
          promptEn: 'Listen and pick the meaning.',
          audio: 'audio/hsk1/hsk1_明天.mp3',
          choices: ['Hier', 'Aujourd\'hui', 'Demain', 'Maintenant'],
          correctIndex: 2,
          explanation: '明天 (míngtiān) = demain.',
          explanationEn: '明天 (míngtiān) = tomorrow.'
        },
        {
          id: 'hsk1-l4',
          prompt: 'Écoute et indique le sens.',
          promptEn: 'Listen and pick the meaning.',
          audio: 'audio/hsk1/hsk1_学校.mp3',
          choices: ['Maison', 'École', 'Hôpital', 'Magasin'],
          correctIndex: 1,
          explanation: '学校 (xuéxiào) = école.',
          explanationEn: '学校 (xuéxiào) = school.'
        },
        {
          id: 'hsk1-l5',
          prompt: "Écoute et indique le sens.",
          promptEn: "Listen and pick the meaning.",
          audio: "audio/hsk1/hsk1_老师.mp3",
          choices: ["Étudiant","Professeur","Médecin","Ami"],
          correctIndex: 1,
          explanation: "老师 = professeur.",
          explanationEn: "老师 = teacher."
        },
        {
          id: 'hsk1-l6',
          prompt: "Écoute et choisis la bonne traduction.",
          promptEn: "Listen and pick the translation.",
          audio: "audio/hsk1/hsk1_妈妈.mp3",
          choices: ["Papa","Maman","Frère","Sœur"],
          correctIndex: 1,
          explanation: "妈妈 = maman.",
          explanationEn: "妈妈 = mom."
        },
        {
          id: 'hsk1-l7',
          prompt: "Écoute et indique le sens.",
          promptEn: "Listen and pick the meaning.",
          audio: "audio/hsk1/hsk1_朋友.mp3",
          choices: ["Ami","Collègue","Voisin","Famille"],
          correctIndex: 0,
          explanation: "朋友 = ami.",
          explanationEn: "朋友 = friend."
        },
        {
          id: 'hsk1-l8',
          prompt: "Écoute et choisis la bonne réponse.",
          promptEn: "Listen and pick the right answer.",
          audio: "audio/hsk1/hsk1_水.mp3",
          choices: ["Feu","Eau","Terre","Bois"],
          correctIndex: 1,
          explanation: "水 = eau.",
          explanationEn: "水 = water."
        },
        {
          id: 'hsk1-l9',
          prompt: "Écoute et indique le sens.",
          promptEn: "Listen and pick the meaning.",
          audio: "audio/hsk1/hsk1_工作.mp3",
          choices: ["Étudier","Travail / travailler","Dormir","Jouer"],
          correctIndex: 1,
          explanation: "工作 = travail.",
          explanationEn: "工作 = work."
        },
        {
          id: 'hsk1-l10',
          prompt: "Écoute et choisis la bonne réponse.",
          promptEn: "Listen and pick the right answer.",
          audio: "audio/hsk1/hsk1_今天.mp3",
          choices: ["Hier","Aujourd'hui","Demain","Bientôt"],
          correctIndex: 1,
          explanation: "今天 = aujourd'hui.",
          explanationEn: "今天 = today."
        }
      ]
    }
  ]
};

// ============================================================================
//  HSK 2 — niveau élémentaire (300 mots)
// ============================================================================
export const HSK2_MOCK: EvaluationV2Config = {
  id: 'mock-hsk2',
  level: 'hsk2',
  title: 'Mock HSK 2 — Communication quotidienne',
  titleEn: 'Mock HSK 2 — Everyday communication',
  subtitle: '16 questions, 12 minutes. Progression : passé 了, comparatifs, 在...呢.',
  subtitleEn: '16 questions, 12 minutes. Covers: 了 past, comparatives, 在...呢.',
  durationSeconds: 12 * 60,
  passingPercent: 60,
  xpReward: 140,
  sections: [
    {
      id: 'hsk2-vocab',
      kind: 'vocabulary',
      title: 'Vocabulaire élargi',
      titleEn: 'Expanded vocabulary',
      questions: [
        {
          id: 'hsk2-v1',
          prompt: 'Que signifie 便宜 ?',
          promptEn: 'What does 便宜 mean?',
          choices: ['Cher', 'Bon marché', 'Rapide', 'Lent'],
          correctIndex: 1,
          explanation: '便宜 (piányi) = bon marché. Opposé de 贵 (guì, cher).',
          explanationEn: '便宜 (piányi) = cheap. Opposite of 贵 (guì, expensive).'
        },
        {
          id: 'hsk2-v2',
          prompt: 'Lequel est un moyen de transport ?',
          promptEn: 'Which one is a means of transport?',
          choices: ['眼睛', '地铁', '颜色', '鸡蛋'],
          correctIndex: 1,
          explanation: '地铁 (dìtiě) = métro. 眼睛 = yeux, 颜色 = couleur, 鸡蛋 = œuf.',
          explanationEn: '地铁 (dìtiě) = subway. 眼睛 = eyes, 颜色 = color, 鸡蛋 = egg.'
        },
        {
          id: 'hsk2-v3',
          prompt: 'Que signifie 已经 ?',
          promptEn: 'What does 已经 mean?',
          choices: ['Encore', 'Déjà', 'Toujours', 'Peut-être'],
          correctIndex: 1,
          explanation: '已经 (yǐjīng) = déjà. Souvent accompagné de 了 en fin de phrase.',
          explanationEn: '已经 (yǐjīng) = already. Often paired with 了 at clause end.'
        },
        {
          id: 'hsk2-v4',
          prompt: 'Quel verbe correspond à « se laver » ?',
          promptEn: 'Which verb means "to wash"?',
          choices: ['洗', '送', '跳', '穿'],
          correctIndex: 0,
          explanation: '洗 (xǐ) = laver. 洗手 = se laver les mains, 洗澡 = prendre une douche.',
          explanationEn: '洗 (xǐ) = wash. 洗手 = wash hands, 洗澡 = shower.'
        },
        {
          id: 'hsk2-v5',
          prompt: "Que signifie 开始 ?",
          promptEn: "What does 开始 mean?",
          choices: ["Finir","Commencer","Arrêter","Continuer"],
          correctIndex: 1,
          explanation: "开始 (kāishǐ) = commencer.",
          explanationEn: "开始 = begin."
        },
        {
          id: 'hsk2-v6',
          prompt: "Lequel est une couleur ?",
          promptEn: "Which one is a color?",
          choices: ["白色","星期","时间","机场"],
          correctIndex: 0,
          explanation: "白色 (báisè) = blanc.",
          explanationEn: "白色 = white."
        },
        {
          id: 'hsk2-v7',
          prompt: "Que signifie 告诉 ?",
          promptEn: "What does 告诉 mean?",
          choices: ["Cacher","Dire à / informer","Oublier","Demander"],
          correctIndex: 1,
          explanation: "告诉 (gào su) = dire à qqn, informer.",
          explanationEn: "告诉 = tell, inform."
        },
        {
          id: 'hsk2-v8',
          prompt: "Lequel désigne un animal ?",
          promptEn: "Which one is an animal?",
          choices: ["猫","笔","书","桌子"],
          correctIndex: 0,
          explanation: "猫 (māo) = chat.",
          explanationEn: "猫 = cat."
        },
        {
          id: 'hsk2-v9',
          prompt: "Que signifie 介绍 ?",
          promptEn: "What does 介绍 mean?",
          choices: ["Refuser","Présenter","Ignorer","Oublier"],
          correctIndex: 1,
          explanation: "介绍 (jièshào) = présenter.",
          explanationEn: "介绍 = introduce."
        },
        {
          id: 'hsk2-v10',
          prompt: "Que signifie 出租车 ?",
          promptEn: "What does 出租车 mean?",
          choices: ["Bus","Taxi","Métro","Train"],
          correctIndex: 1,
          explanation: "出租车 (chūzūchē) = taxi.",
          explanationEn: "出租车 = taxi."
        }
      ]
    },
    {
      id: 'hsk2-grammar',
      kind: 'grammar',
      title: 'Structures HSK 2',
      titleEn: 'HSK 2 structures',
      questions: [
        {
          id: 'hsk2-g1',
          prompt: 'Complète : 我 ___ 吃了早饭。',
          promptEn: 'Fill in: 我 ___ 吃了早饭。',
          choices: ['已经', '一点儿', '正在', '比较'],
          correctIndex: 0,
          explanation: '已经…了 = déjà fait. « J\'ai déjà pris le petit-déjeuner ».',
          explanationEn: '已经…了 = already done. "I\'ve already had breakfast".'
        },
        {
          id: 'hsk2-g2',
          prompt: 'Complète : 他 ___ 我高。',
          promptEn: 'Fill in: 他 ___ 我高。',
          choices: ['跟', '比', '和', '是'],
          correctIndex: 1,
          explanation: 'A 比 B + adjectif = A est plus ... que B. Structure comparative HSK 2.',
          explanationEn: 'A 比 B + adjective = A is more ... than B. HSK 2 comparative.'
        },
        {
          id: 'hsk2-g3',
          prompt: 'Complète : 妈妈 ___ 做饭呢。',
          promptEn: 'Fill in: 妈妈 ___ 做饭呢。',
          choices: ['正在', '已经', '就', '了'],
          correctIndex: 0,
          explanation: '正在…呢 = être en train de. « Maman est en train de cuisiner ».',
          explanationEn: '正在…呢 = in the middle of. "Mom is cooking".'
        },
        {
          id: 'hsk2-g4',
          prompt: 'Complète : 这件衣服 ___ 贵。',
          promptEn: 'Fill in: 这件衣服 ___ 贵。',
          choices: ['太', '非常多', '以前', '可能'],
          correctIndex: 0,
          explanation: '太 + adjectif (+ 了) = trop. « Ce vêtement est trop cher ».',
          explanationEn: '太 + adjective (+ 了) = too. "This garment is too expensive".'
        },
        {
          id: 'hsk2-g5',
          prompt: "Complète : 我 ___ 去过中国。",
          promptEn: "Fill in: 我 ___ 去过中国。",
          choices: ["没","不","别","还"],
          correctIndex: 0,
          explanation: "没 nie les expériences passées avec 过.",
          explanationEn: "没 negates past experience with 过."
        },
        {
          id: 'hsk2-g6',
          prompt: "Complète : 他比我 ___ 三岁。",
          promptEn: "Fill in: 他比我 ___ 三岁。",
          choices: ["大","多","高","好"],
          correctIndex: 0,
          explanation: "A 比 B 大 N 岁 = A a N ans de plus que B.",
          explanationEn: "A 比 B 大 N 岁 = A is N years older than B."
        },
        {
          id: 'hsk2-g7',
          prompt: "Complète : 你想 ___ 一点儿水吗？",
          promptEn: "Fill in: 你想 ___ 一点儿水吗？",
          choices: ["喝","吃","看","听"],
          correctIndex: 0,
          explanation: "喝水 = boire de l'eau.",
          explanationEn: "喝水 = drink water."
        },
        {
          id: 'hsk2-g8',
          prompt: "Complète : 我 ___ 在家。",
          promptEn: "Fill in: 我 ___ 在家。",
          choices: ["还","就","都","只"],
          correctIndex: 0,
          explanation: "还 = encore ; « Je suis encore à la maison ».",
          explanationEn: "还 = still."
        },
        {
          id: 'hsk2-g9',
          prompt: "Complète : 我给朋友 ___ 电话。",
          promptEn: "Fill in: 我给朋友 ___ 电话。",
          choices: ["打","做","看","听"],
          correctIndex: 0,
          explanation: "打电话 = appeler au téléphone.",
          explanationEn: "打电话 = make a phone call."
        },
        {
          id: 'hsk2-g10',
          prompt: "Complète : 他 ___ 高兴。",
          promptEn: "Fill in: 他 ___ 高兴。",
          choices: ["非常","一共","不会","以前"],
          correctIndex: 0,
          explanation: "非常 + adj = très, extrêmement.",
          explanationEn: "非常 + adj = very."
        }
      ]
    },
    {
      id: 'hsk2-reading',
      kind: 'reading',
      title: 'Compréhension écrite',
      titleEn: 'Reading comprehension',
      questions: [
        {
          id: 'hsk2-r1',
          context: '昨天我和朋友去了商店。我买了一件衣服，他买了一本书。',
          contextEn: '昨天我和朋友去了商店。我买了一件衣服，他买了一本书。',
          prompt: 'Qu\'a acheté l\'ami ?',
          promptEn: 'What did the friend buy?',
          choices: ['Un vêtement', 'Un livre', 'Une pomme', 'Rien'],
          correctIndex: 1,
          explanation: '他买了一本书 = il a acheté un livre.',
          explanationEn: '他买了一本书 = he bought a book.'
        },
        {
          id: 'hsk2-r2',
          context: '我不喜欢喝咖啡，我喜欢喝茶。特别是绿茶。',
          contextEn: '我不喜欢喝咖啡，我喜欢喝茶。特别是绿茶。',
          prompt: 'Que préfère boire la personne ?',
          promptEn: 'What does the person prefer to drink?',
          choices: ['Café', 'Thé vert surtout', 'Jus', 'Eau'],
          correctIndex: 1,
          explanation: '特别是绿茶 = en particulier le thé vert.',
          explanationEn: '特别是绿茶 = especially green tea.'
        },
        {
          id: 'hsk2-r3',
          context: '今天比昨天冷，可是我没穿毛衣。',
          contextEn: '今天比昨天冷，可是我没穿毛衣。',
          prompt: 'Que dit le texte ?',
          promptEn: 'What does the text say?',
          choices: [
            'Il fait plus chaud qu\'hier',
            'Il fait plus froid qu\'hier mais je n\'ai pas mis de pull',
            'Je porte toujours un pull',
            'Hier il pleuvait'
          ],
          correctIndex: 1,
          explanation: '比 = comparatif, 没穿毛衣 = n\'ai pas porté de pull.',
          explanationEn: '比 = comparative, 没穿毛衣 = didn\'t wear a sweater.'
        },
        {
          id: 'hsk2-r4',
          context: '这家饭店的菜好吃，服务员也很好。但是太贵了。',
          contextEn: '这家饭店的菜好吃，服务员也很好。但是太贵了。',
          prompt: 'Quel est l\'inconvénient du restaurant ?',
          promptEn: 'What is the downside of the restaurant?',
          choices: [
            'Les plats sont mauvais',
            'Le service est lent',
            'C\'est trop cher',
            'Il est fermé'
          ],
          correctIndex: 2,
          explanation: '但是太贵了 = mais c\'est trop cher.',
          explanationEn: '但是太贵了 = but it\'s too expensive.'
        },
        {
          id: 'hsk2-r5',
          context: "小王每天都起得很早。他早上六点起床，然后去跑步。",
          contextEn: "小王每天都起得很早。他早上六点起床，然后去跑步。",
          prompt: "Que fait Xiao Wang le matin ?",
          promptEn: "What does Xiao Wang do in the morning?",
          choices: ["Il dort tard","Il se lève tôt et court","Il lit le journal","Il prend son petit-déj au café"],
          correctIndex: 1,
          explanation: "六点起床 + 跑步 = lever à 6h + course.",
          explanationEn: "Gets up at 6 and runs."
        },
        {
          id: 'hsk2-r6',
          context: "我妹妹今年五岁。她喜欢画画儿。",
          contextEn: "我妹妹今年五岁。她喜欢画画儿。",
          prompt: "Quel est le passe-temps de la petite sœur ?",
          promptEn: "Little sister's hobby?",
          choices: ["Lire","Dessiner","Chanter","Courir"],
          correctIndex: 1,
          explanation: "画画儿 = dessiner.",
          explanationEn: "画画儿 = draw."
        },
        {
          id: 'hsk2-r7',
          context: "这家饭店的菜很好吃，也不贵。",
          contextEn: "这家饭店的菜很好吃，也不贵。",
          prompt: "Que dit-on du restaurant ?",
          promptEn: "What about the restaurant?",
          choices: ["Bon et pas cher","Cher et mauvais","Loin","Fermé"],
          correctIndex: 0,
          explanation: "好吃 + 不贵.",
          explanationEn: "Tasty and affordable."
        },
        {
          id: 'hsk2-r8',
          context: "昨天我买了一件新衣服。",
          contextEn: "昨天我买了一件新衣服。",
          prompt: "Qu'a-t-il acheté hier ?",
          promptEn: "What did he buy yesterday?",
          choices: ["Un livre","Un vêtement","Un téléphone","Un sac"],
          correctIndex: 1,
          explanation: "一件新衣服 = un nouveau vêtement.",
          explanationEn: "A new garment."
        },
        {
          id: 'hsk2-r9',
          context: "我家离地铁站很近，走路五分钟。",
          contextEn: "我家离地铁站很近，走路五分钟。",
          prompt: "Que sait-on du domicile ?",
          promptEn: "What about the home?",
          choices: ["Loin du métro","À 5 min de marche du métro","Près d'une gare","Dans un village"],
          correctIndex: 1,
          explanation: "离地铁站很近，走路五分钟.",
          explanationEn: "Near the subway, 5 min walk."
        },
        {
          id: 'hsk2-r10',
          context: "我不喜欢下雨，因为不能出去玩。",
          contextEn: "我不喜欢下雨，因为不能出去玩。",
          prompt: "Pourquoi n'aime-t-il pas la pluie ?",
          promptEn: "Why doesn't he like rain?",
          choices: ["Parce qu'il tombe malade","Parce qu'il ne peut pas sortir jouer","Parce qu'il a peur","Parce qu'il fait froid"],
          correctIndex: 1,
          explanation: "不能出去玩 = ne peut pas sortir jouer.",
          explanationEn: "Can't go out and play."
        }
      ]
    },
    {
      id: 'hsk2-listening',
      kind: 'listening',
      title: 'Compréhension orale',
      titleEn: 'Listening comprehension',
      questions: [
        {
          id: 'hsk2-l1',
          prompt: 'Écoute et choisis le sens.',
          promptEn: 'Listen and pick the meaning.',
          audio: 'audio/hsk2/hsk2_房间.wav',
          choices: ['Chambre', 'Cuisine', 'Jardin', 'Toit'],
          correctIndex: 0,
          explanation: '房间 (fángjiān) = pièce, chambre.',
          explanationEn: '房间 (fángjiān) = room.'
        },
        {
          id: 'hsk2-l2',
          prompt: 'Écoute et choisis le sens.',
          promptEn: 'Listen and pick the meaning.',
          audio: 'audio/hsk2/hsk2_生病.wav',
          choices: ['Voyager', 'Tomber malade', 'Se reposer', 'Travailler'],
          correctIndex: 1,
          explanation: '生病 (shēngbìng) = tomber malade.',
          explanationEn: '生病 (shēngbìng) = get sick.'
        },
        {
          id: 'hsk2-l3',
          prompt: 'Écoute et choisis le sens.',
          promptEn: 'Listen and pick the meaning.',
          audio: 'audio/hsk2/hsk2_旅游.wav',
          choices: ['Voyager', 'Étudier', 'Dormir', 'Cuisiner'],
          correctIndex: 0,
          explanation: '旅游 (lǚyóu) = voyager, faire du tourisme.',
          explanationEn: '旅游 (lǚyóu) = travel, tourism.'
        },
        {
          id: 'hsk2-l4',
          prompt: 'Écoute et choisis le sens.',
          promptEn: 'Listen and pick the meaning.',
          audio: 'audio/hsk2/hsk2_帮助.wav',
          choices: ['Oublier', 'Aider', 'Acheter', 'Vendre'],
          correctIndex: 1,
          explanation: '帮助 (bāngzhù) = aider.',
          explanationEn: '帮助 (bāngzhù) = help.'
        },
        {
          id: 'hsk2-l5',
          prompt: "Écoute et choisis le sens.",
          promptEn: "Listen and pick the meaning.",
          audio: "audio/hsk2/hsk2_便宜.mp3",
          choices: ["Cher","Bon marché","Gratuit","Rapide"],
          correctIndex: 1,
          explanation: "便宜 = bon marché.",
          explanationEn: "便宜 = cheap."
        },
        {
          id: 'hsk2-l6',
          prompt: "Écoute et choisis la bonne traduction.",
          promptEn: "Listen and pick the translation.",
          audio: "audio/hsk2/hsk2_机场.mp3",
          choices: ["Aéroport","Gare","Port","Bus"],
          correctIndex: 0,
          explanation: "机场 = aéroport.",
          explanationEn: "机场 = airport."
        },
        {
          id: 'hsk2-l7',
          prompt: "Écoute et indique le sens.",
          promptEn: "Listen and pick the meaning.",
          audio: "audio/hsk2/hsk2_高兴.mp3",
          choices: ["Content","Triste","En colère","Fatigué"],
          correctIndex: 0,
          explanation: "高兴 = content.",
          explanationEn: "高兴 = happy."
        },
        {
          id: 'hsk2-l8',
          prompt: "Écoute et choisis le sens.",
          promptEn: "Listen and pick the meaning.",
          audio: "audio/hsk2/hsk2_帮助.mp3",
          choices: ["Aider","Refuser","Demander","Vendre"],
          correctIndex: 0,
          explanation: "帮助 = aider.",
          explanationEn: "帮助 = help."
        },
        {
          id: 'hsk2-l9',
          prompt: "Écoute et choisis la bonne réponse.",
          promptEn: "Listen and pick the right answer.",
          audio: "audio/hsk2/hsk2_旅游.mp3",
          choices: ["Voyager","Dormir","Étudier","Manger"],
          correctIndex: 0,
          explanation: "旅游 = voyager.",
          explanationEn: "旅游 = travel."
        },
        {
          id: 'hsk2-l10',
          prompt: "Écoute et indique le sens.",
          promptEn: "Listen and pick the meaning.",
          audio: "audio/hsk2/hsk2_希望.mp3",
          choices: ["Espérer","Détester","Oublier","Comprendre"],
          correctIndex: 0,
          explanation: "希望 = espérer.",
          explanationEn: "希望 = hope."
        }
      ]
    }
  ]
};

// ============================================================================
//  HSK 3 — niveau intermédiaire (600 mots)
// ============================================================================
export const HSK3_MOCK: EvaluationV2Config = {
  id: 'mock-hsk3',
  level: 'hsk3',
  title: 'Mock HSK 3 — Récit et opinion',
  titleEn: 'Mock HSK 3 — Narrative and opinion',
  subtitle: '16 questions, 15 minutes. Zoom sur 把, 被, 虽然...但是, complément de résultat.',
  subtitleEn: '16 questions, 15 minutes. Focus on 把, 被, 虽然...但是, result complements.',
  durationSeconds: 15 * 60,
  passingPercent: 60,
  xpReward: 160,
  sections: [
    {
      id: 'hsk3-vocab',
      kind: 'vocabulary',
      title: 'Vocabulaire intermédiaire',
      titleEn: 'Intermediate vocabulary',
      questions: [
        {
          id: 'hsk3-v1',
          prompt: 'Que signifie 提高 ?',
          promptEn: 'What does 提高 mean?',
          choices: ['Réduire', 'Élever, améliorer', 'Arrêter', 'Oublier'],
          correctIndex: 1,
          explanation: '提高 (tígāo) = élever, améliorer. 提高水平 = élever le niveau.',
          explanationEn: '提高 (tígāo) = raise, improve. 提高水平 = raise the level.'
        },
        {
          id: 'hsk3-v2',
          prompt: 'Le contraire de 简单 est :',
          promptEn: 'The opposite of 简单 is:',
          choices: ['短', '复杂', '方便', '容易'],
          correctIndex: 1,
          explanation: '简单 = simple, 复杂 (fùzá) = compliqué.',
          explanationEn: '简单 = simple, 复杂 (fùzá) = complex.'
        },
        {
          id: 'hsk3-v3',
          prompt: 'Que signifie 一般 ?',
          promptEn: 'What does 一般 mean?',
          choices: ['Exceptionnel', 'Ordinaire, en général', 'Urgent', 'Bruyant'],
          correctIndex: 1,
          explanation: '一般 (yìbān) = ordinaire / en général. 一般来说 = en règle générale.',
          explanationEn: '一般 (yìbān) = ordinary / in general. 一般来说 = generally speaking.'
        },
        {
          id: 'hsk3-v4',
          prompt: 'Quel mot veut dire « expérience » ?',
          promptEn: 'Which word means "experience"?',
          choices: ['机会', '经验', '办法', '态度'],
          correctIndex: 1,
          explanation: '经验 (jīngyàn) = expérience (acquise). 机会 = occasion, 办法 = moyen, 态度 = attitude.',
          explanationEn: '经验 (jīngyàn) = experience (gained). 机会 = chance, 办法 = method, 态度 = attitude.'
        },
        {
          id: 'hsk3-v5',
          prompt: "Que signifie 影响 ?",
          promptEn: "What does 影响 mean?",
          choices: ["Influence","Célébrité","Vacances","Rêve"],
          correctIndex: 0,
          explanation: "影响 (yǐngxiǎng) = influence.",
          explanationEn: "影响 = influence."
        },
        {
          id: 'hsk3-v6',
          prompt: "Lequel signifie « compliqué » ?",
          promptEn: "Which means \"complicated\"?",
          choices: ["简单","复杂","漂亮","舒服"],
          correctIndex: 1,
          explanation: "复杂 (fùzá) = complexe.",
          explanationEn: "复杂 = complex."
        },
        {
          id: 'hsk3-v7',
          prompt: "Que signifie 解决 ?",
          promptEn: "What does 解决 mean?",
          choices: ["Créer","Résoudre","Ignorer","Cacher"],
          correctIndex: 1,
          explanation: "解决 (jiějué) = résoudre.",
          explanationEn: "解决 = solve."
        },
        {
          id: 'hsk3-v8',
          prompt: "Lequel désigne un lieu ?",
          promptEn: "Which is a place?",
          choices: ["银行","高兴","干净","简单"],
          correctIndex: 0,
          explanation: "银行 = banque.",
          explanationEn: "银行 = bank."
        },
        {
          id: 'hsk3-v9',
          prompt: "Que signifie 注意 ?",
          promptEn: "What does 注意 mean?",
          choices: ["Ignorer","Faire attention","Dormir","Rire"],
          correctIndex: 1,
          explanation: "注意 (zhùyì) = faire attention.",
          explanationEn: "注意 = pay attention."
        },
        {
          id: 'hsk3-v10',
          prompt: "Que signifie 机会 ?",
          promptEn: "What does 机会 mean?",
          choices: ["Défaut","Occasion","Voiture","Cadeau"],
          correctIndex: 1,
          explanation: "机会 (jīhuì) = occasion.",
          explanationEn: "机会 = chance."
        }
      ]
    },
    {
      id: 'hsk3-grammar',
      kind: 'grammar',
      title: 'Structures HSK 3',
      titleEn: 'HSK 3 structures',
      questions: [
        {
          id: 'hsk3-g1',
          prompt: 'Complète : 我 ___ 作业写完了。',
          promptEn: 'Fill in: 我 ___ 作业写完了。',
          choices: ['把', '被', '比', '给'],
          correctIndex: 0,
          explanation: '把 déplace l\'objet avant le verbe pour insister sur le résultat. « J\'ai fini mes devoirs ».',
          explanationEn: '把 moves the object before the verb to emphasize the result. "I finished the homework".'
        },
        {
          id: 'hsk3-g2',
          prompt: 'Complète : 虽然很累，___ 我还是去了。',
          promptEn: 'Fill in: 虽然很累，___ 我还是去了。',
          choices: ['但是', '因为', '所以', '虽然'],
          correctIndex: 0,
          explanation: '虽然…但是 = bien que … mais. Couple obligatoire à l\'écrit.',
          explanationEn: '虽然…但是 = although … but. Mandatory pair in writing.'
        },
        {
          id: 'hsk3-g3',
          prompt: 'Complète : 他跑 ___ 很快。',
          promptEn: 'Fill in: 他跑 ___ 很快。',
          choices: ['得', '的', '地', '了'],
          correctIndex: 0,
          explanation: 'V + 得 + adj. = complément de degré. « Il court vite ».',
          explanationEn: 'V + 得 + adj. = degree complement. "He runs fast".'
        },
        {
          id: 'hsk3-g4',
          prompt: 'Complète : 咖啡 ___ 弟弟喝完了。',
          promptEn: 'Fill in: 咖啡 ___ 弟弟喝完了。',
          choices: ['被', '把', '比', '跟'],
          correctIndex: 0,
          explanation: '被 introduit le passif : « Le café a été bu par mon petit frère ».',
          explanationEn: '被 introduces passive voice: "The coffee was drunk by my younger brother".'
        },
        {
          id: 'hsk3-g5',
          prompt: "Complète : 只要你努力， ___ 一定会成功。",
          promptEn: "Fill in: 只要你努力， ___ 一定会成功。",
          choices: ["就","才","还","也"],
          correctIndex: 0,
          explanation: "只要…就 = il suffit que... alors.",
          explanationEn: "只要…就 = as long as... then."
        },
        {
          id: 'hsk3-g6',
          prompt: "Complète : 你 ___ 书放在桌子上。",
          promptEn: "Fill in: 你 ___ 书放在桌子上。",
          choices: ["把","被","让","比"],
          correctIndex: 0,
          explanation: "把 + objet + verbe + complément.",
          explanationEn: "把 + object + verb + complement."
        },
        {
          id: 'hsk3-g7',
          prompt: "Complète : 这个问题 ___ 小王回答对了。",
          promptEn: "Fill in: 这个问题 ___ 小王回答对了。",
          choices: ["被","把","从","让"],
          correctIndex: 0,
          explanation: "被 marque le passif.",
          explanationEn: "被 marks the passive."
        },
        {
          id: 'hsk3-g8',
          prompt: "Complète : 我 ___ 不喜欢吃辣的。",
          promptEn: "Fill in: 我 ___ 不喜欢吃辣的。",
          choices: ["从来","已经","就要","刚才"],
          correctIndex: 0,
          explanation: "从来 + 不 = je n'ai jamais aimé…",
          explanationEn: "从来 + 不 = never."
        },
        {
          id: 'hsk3-g9',
          prompt: "Complète : ___ 你不去，我也不去。",
          promptEn: "Fill in: ___ 你不去，我也不去。",
          choices: ["如果","因为","虽然","不管"],
          correctIndex: 0,
          explanation: "如果…就/也 = si... alors.",
          explanationEn: "如果…也 = if... then."
        },
        {
          id: 'hsk3-g10',
          prompt: "Complète : 他 ___ 同意了。",
          promptEn: "Fill in: 他 ___ 同意了。",
          choices: ["终于","从来","突然","正在"],
          correctIndex: 0,
          explanation: "终于 = enfin (aboutissement).",
          explanationEn: "终于 = finally."
        }
      ]
    },
    {
      id: 'hsk3-reading',
      kind: 'reading',
      title: 'Compréhension écrite',
      titleEn: 'Reading comprehension',
      questions: [
        {
          id: 'hsk3-r1',
          context: '我学中文已经三年了。刚开始很难，但是现在越来越容易。',
          contextEn: '我学中文已经三年了。刚开始很难，但是现在越来越容易。',
          prompt: 'Que dit la personne sur son apprentissage ?',
          promptEn: 'What does the person say about their learning?',
          choices: [
            'Elle commence à peine',
            'C\'est devenu plus facile avec le temps',
            'Elle a arrêté',
            'Elle trouve ça toujours aussi difficile'
          ],
          correctIndex: 1,
          explanation: '越来越容易 = de plus en plus facile.',
          explanationEn: '越来越容易 = easier and easier.'
        },
        {
          id: 'hsk3-r2',
          context: '小王的自行车被偷了。他现在每天坐公共汽车上班。',
          contextEn: '小王的自行车被偷了。他现在每天坐公共汽车上班。',
          prompt: 'Comment Xiao Wang va-t-il au travail ?',
          promptEn: 'How does Xiao Wang commute?',
          choices: [
            'À vélo',
            'En bus',
            'À pied',
            'En métro'
          ],
          correctIndex: 1,
          explanation: '坐公共汽车上班 = aller au travail en bus. Son vélo a été volé.',
          explanationEn: '坐公共汽车上班 = go to work by bus. His bike was stolen.'
        },
        {
          id: 'hsk3-r3',
          context: '这个周末我想去爬山，可是天气预报说要下雨，所以我打算在家看电影。',
          contextEn: '这个周末我想去爬山，可是天气预报说要下雨，所以我打算在家看电影。',
          prompt: 'Que va faire la personne ce week-end ?',
          promptEn: 'What will the person do this weekend?',
          choices: [
            'Faire de la randonnée',
            'Aller à la piscine',
            'Rester chez elle et regarder un film',
            'Voyager'
          ],
          correctIndex: 2,
          explanation: '打算在家看电影 = prévoit de regarder un film à la maison.',
          explanationEn: '打算在家看电影 = plans to watch a movie at home.'
        },
        {
          id: 'hsk3-r4',
          context: '他工作很努力，所以老板给他加了工资。',
          contextEn: '他工作很努力，所以老板给他加了工资。',
          prompt: 'Pourquoi a-t-il été augmenté ?',
          promptEn: 'Why did he get a raise?',
          choices: [
            'Il travaille dur',
            'Il est arrivé en retard',
            'Il a quitté l\'entreprise',
            'Il est ami avec le patron'
          ],
          correctIndex: 0,
          explanation: '工作很努力 = travaille très dur → 加工资 = augmentation.',
          explanationEn: '工作很努力 = works very hard → 加工资 = raise.'
        },
        {
          id: 'hsk3-r5',
          context: "我昨天买了一辆新自行车，现在每天骑车上班。",
          contextEn: "我昨天买了一辆新自行车，现在每天骑车上班。",
          prompt: "Comment va-t-il au travail ?",
          promptEn: "How does he commute?",
          choices: ["En voiture","À vélo","En métro","À pied"],
          correctIndex: 1,
          explanation: "骑车上班 = aller au travail à vélo.",
          explanationEn: "Bikes to work."
        },
        {
          id: 'hsk3-r6',
          context: "我哥哥是一名医生，他经常晚上加班。",
          contextEn: "我哥哥是一名医生，他经常晚上加班。",
          prompt: "Que fait le grand frère ?",
          promptEn: "What does the older brother do?",
          choices: ["Il travaille en journée","Médecin, fait souvent des heures sup le soir","Il est professeur","Il est chauffeur"],
          correctIndex: 1,
          explanation: "医生 + 晚上加班.",
          explanationEn: "Doctor, often works nights."
        },
        {
          id: 'hsk3-r7',
          context: "这本书我已经看了三遍了，真的很有意思。",
          contextEn: "这本书我已经看了三遍了，真的很有意思。",
          prompt: "Que pense-t-il du livre ?",
          promptEn: "His opinion of the book?",
          choices: ["Ennuyeux","Très intéressant","Difficile","Trop court"],
          correctIndex: 1,
          explanation: "看了三遍 + 很有意思.",
          explanationEn: "Read 3 times, very interesting."
        },
        {
          id: 'hsk3-r8',
          context: "我觉得北京的秋天最漂亮。",
          contextEn: "我觉得北京的秋天最漂亮。",
          prompt: "Quelle saison préfère-t-il à Pékin ?",
          promptEn: "Favorite Beijing season?",
          choices: ["Printemps","Été","Automne","Hiver"],
          correctIndex: 2,
          explanation: "秋天 = automne.",
          explanationEn: "Autumn."
        },
        {
          id: 'hsk3-r9',
          context: "我朋友说这个电影不太好看，所以我不想去看。",
          contextEn: "我朋友说这个电影不太好看，所以我不想去看。",
          prompt: "Pourquoi n'ira-t-il pas voir ce film ?",
          promptEn: "Why skip the movie?",
          choices: ["Trop cher","Ami l'a trouvé décevant","Cinéma trop loin","Il dort"],
          correctIndex: 1,
          explanation: "朋友说不太好看 = ami dit pas terrible.",
          explanationEn: "Friend says not good."
        },
        {
          id: 'hsk3-r10',
          context: "今天的作业很多，我得快点儿做完。",
          contextEn: "今天的作业很多，我得快点儿做完。",
          prompt: "Que doit-il faire ?",
          promptEn: "What does he have to do?",
          choices: ["Finir les devoirs rapidement","Regarder la TV","Aller se coucher","Jouer"],
          correctIndex: 0,
          explanation: "快点儿做完 = finir vite.",
          explanationEn: "Finish quickly."
        }
      ]
    },
    {
      id: 'hsk3-listening',
      kind: 'listening',
      title: 'Compréhension orale',
      titleEn: 'Listening comprehension',
      questions: [
        {
          id: 'hsk3-l1',
          prompt: 'Écoute et choisis le sens.',
          promptEn: 'Listen and pick the meaning.',
          audio: 'audio/hsk3/hsk3_打算.wav',
          choices: ['Projeter, avoir l\'intention', 'Oublier', 'Payer', 'Comparer'],
          correctIndex: 0,
          explanation: '打算 (dǎsuàn) = avoir l\'intention de.',
          explanationEn: '打算 (dǎsuàn) = plan to / intend to.'
        },
        {
          id: 'hsk3-l2',
          prompt: 'Écoute et choisis le sens.',
          promptEn: 'Listen and pick the meaning.',
          audio: 'audio/hsk3/hsk3_关心.wav',
          choices: ['Se disputer', 'Se soucier de', 'Ignorer', 'Éteindre'],
          correctIndex: 1,
          explanation: '关心 (guānxīn) = se soucier de, prendre soin.',
          explanationEn: '关心 (guānxīn) = care about, concern oneself with.'
        },
        {
          id: 'hsk3-l3',
          prompt: 'Écoute et choisis le sens.',
          promptEn: 'Listen and pick the meaning.',
          audio: 'audio/hsk3/hsk3_经常.wav',
          choices: ['Souvent, fréquemment', 'Rarement', 'Jamais', 'Immédiatement'],
          correctIndex: 0,
          explanation: '经常 (jīngcháng) = souvent.',
          explanationEn: '经常 (jīngcháng) = often.'
        },
        {
          id: 'hsk3-l4',
          prompt: "Écoute et choisis le sens.",
          promptEn: "Listen and pick the meaning.",
          audio: "audio/hsk3/hsk3_锻炼.mp3",
          choices: ["Courir","Faire de l'exercice / s'entraîner","Se reposer","Cuisiner"],
          correctIndex: 1,
          explanation: "锻炼 = s'entraîner.",
          explanationEn: "锻炼 = exercise."
        },
        {
          id: 'hsk3-l5',
          prompt: "Écoute et indique le sens.",
          promptEn: "Listen and pick the meaning.",
          audio: "audio/hsk3/hsk3_习惯.mp3",
          choices: ["Habitude","Décision","Accident","Objectif"],
          correctIndex: 0,
          explanation: "习惯 = habitude.",
          explanationEn: "习惯 = habit."
        },
        {
          id: 'hsk3-l6',
          prompt: "Écoute et choisis la bonne traduction.",
          promptEn: "Listen and pick the translation.",
          audio: "audio/hsk3/hsk3_着急.mp3",
          choices: ["Calme","Anxieux, pressé","Joyeux","Triste"],
          correctIndex: 1,
          explanation: "着急 = anxieux.",
          explanationEn: "着急 = anxious."
        },
        {
          id: 'hsk3-l7',
          prompt: "Écoute et indique le sens.",
          promptEn: "Listen and pick the meaning.",
          audio: "audio/hsk3/hsk3_结束.mp3",
          choices: ["Commencer","Finir","Continuer","Déménager"],
          correctIndex: 1,
          explanation: "结束 = finir.",
          explanationEn: "结束 = end."
        },
        {
          id: 'hsk3-l8',
          prompt: "Écoute et choisis le sens.",
          promptEn: "Listen and pick the meaning.",
          audio: "audio/hsk3/hsk3_认为.mp3",
          choices: ["Penser, considérer","Savoir","Voir","Oublier"],
          correctIndex: 0,
          explanation: "认为 = considérer, estimer.",
          explanationEn: "认为 = think, consider."
        },
        {
          id: 'hsk3-l9',
          prompt: "Écoute et choisis la bonne réponse.",
          promptEn: "Listen and pick the right answer.",
          audio: "audio/hsk3/hsk3_熊猫.mp3",
          choices: ["Ours","Panda","Tigre","Chat"],
          correctIndex: 1,
          explanation: "熊猫 = panda.",
          explanationEn: "熊猫 = panda."
        },
        {
          id: 'hsk3-l10',
          prompt: "Écoute et indique le sens.",
          promptEn: "Listen and pick the meaning.",
          audio: "audio/hsk3/hsk3_努力.mp3",
          choices: ["Abandonner","S'efforcer","Se reposer","Discuter"],
          correctIndex: 1,
          explanation: "努力 = s'efforcer.",
          explanationEn: "努力 = strive."
        }
      ]
    }
  ]
};

// ============================================================================
//  HSK 4 — avancé-inférieur (1200 mots)
// ============================================================================
export const HSK4_MOCK: EvaluationV2Config = {
  id: 'mock-hsk4',
  level: 'hsk4',
  title: 'Mock HSK 4 — Argumenter et raconter',
  titleEn: 'Mock HSK 4 — Argue and narrate',
  subtitle: '16 questions, 18 minutes. Focus sur 不但…而且, 既然, 否则, 尽管.',
  subtitleEn: '16 questions, 18 minutes. Focus on 不但…而且, 既然, 否则, 尽管.',
  durationSeconds: 18 * 60,
  passingPercent: 60,
  xpReward: 180,
  sections: [
    {
      id: 'hsk4-vocab',
      kind: 'vocabulary',
      title: 'Vocabulaire HSK 4',
      titleEn: 'HSK 4 vocabulary',
      questions: [
        {
          id: 'hsk4-v1',
          prompt: 'Que signifie 坚持 ?',
          promptEn: 'What does 坚持 mean?',
          choices: ['Abandonner', 'Persévérer', 'Hésiter', 'Reculer'],
          correctIndex: 1,
          explanation: '坚持 (jiānchí) = persévérer. 坚持学习 = persévérer dans ses études.',
          explanationEn: '坚持 (jiānchí) = persist. 坚持学习 = stick with studying.'
        },
        {
          id: 'hsk4-v2',
          prompt: 'Le sens de 批评 est :',
          promptEn: 'The meaning of 批评 is:',
          choices: ['Féliciter', 'Critiquer', 'Réparer', 'Remercier'],
          correctIndex: 1,
          explanation: '批评 (pīpíng) = critiquer. Contexte : parent, prof, manager.',
          explanationEn: '批评 (pīpíng) = criticize. Context: parent, teacher, manager.'
        },
        {
          id: 'hsk4-v3',
          prompt: 'Que signifie 效率 ?',
          promptEn: 'What does 效率 mean?',
          choices: ['Efficacité', 'Routine', 'Hasard', 'Obstacle'],
          correctIndex: 0,
          explanation: '效率 (xiàolǜ) = efficacité / rendement.',
          explanationEn: '效率 (xiàolǜ) = efficiency.'
        },
        {
          id: 'hsk4-v4',
          prompt: 'Le sens de 骄傲 :',
          promptEn: 'The meaning of 骄傲:',
          choices: ['Modeste', 'Fier / orgueilleux', 'Timide', 'Fatigué'],
          correctIndex: 1,
          explanation: '骄傲 (jiāoào) = fier (positif) ou orgueilleux (négatif), selon le contexte.',
          explanationEn: '骄傲 (jiāoào) = proud (positive) or arrogant (negative), depending on context.'
        },
        {
          id: 'hsk4-v5',
          prompt: "Que signifie 减少 ?",
          promptEn: "What does 减少 mean?",
          choices: ["Augmenter","Diminuer, réduire","Stabiliser","Multiplier"],
          correctIndex: 1,
          explanation: "减少 (jiǎnshǎo) = diminuer.",
          explanationEn: "减少 = reduce."
        },
        {
          id: 'hsk4-v6',
          prompt: "Que signifie 打扰 ?",
          promptEn: "What does 打扰 mean?",
          choices: ["Aider","Déranger","Remercier","Saluer"],
          correctIndex: 1,
          explanation: "打扰 (dǎrǎo) = déranger.",
          explanationEn: "打扰 = disturb."
        },
        {
          id: 'hsk4-v7',
          prompt: "Que signifie 调查 ?",
          promptEn: "What does 调查 mean?",
          choices: ["Organiser","Enquêter, sonder","Publier","Conseiller"],
          correctIndex: 1,
          explanation: "调查 (diàochá) = enquêter.",
          explanationEn: "调查 = investigate."
        },
        {
          id: 'hsk4-v8',
          prompt: "Que signifie 成功 ?",
          promptEn: "What does 成功 mean?",
          choices: ["Échec","Succès","Effort","Vitesse"],
          correctIndex: 1,
          explanation: "成功 (chénggōng) = succès.",
          explanationEn: "成功 = success."
        },
        {
          id: 'hsk4-v9',
          prompt: "Lequel signifie « riche » ?",
          promptEn: "Which means \"rich\"?",
          choices: ["辛苦","富","失望","厉害"],
          correctIndex: 1,
          explanation: "富 (fù) = riche.",
          explanationEn: "富 = rich."
        },
        {
          id: 'hsk4-v10',
          prompt: "Que signifie 适合 ?",
          promptEn: "What does 适合 mean?",
          choices: ["Convenir, être adapté à","Rejeter","Choisir","Acheter"],
          correctIndex: 0,
          explanation: "适合 (shìhé) = convenir, être adapté.",
          explanationEn: "适合 = suit."
        }
      ]
    },
    {
      id: 'hsk4-grammar',
      kind: 'grammar',
      title: 'Connecteurs argumentatifs',
      titleEn: 'Argumentative connectors',
      questions: [
        {
          id: 'hsk4-g1',
          prompt: 'Complète : 他 ___ 聪明 ___ 努力。',
          promptEn: 'Fill in: 他 ___ 聪明 ___ 努力。',
          choices: ['不但…而且', '因为…所以', '虽然…但是', '如果…就'],
          correctIndex: 0,
          explanation: '不但…而且 = non seulement … mais aussi (progression positive).',
          explanationEn: '不但…而且 = not only … but also (positive progression).'
        },
        {
          id: 'hsk4-g2',
          prompt: 'Complète : ___ 你答应了，就要做到。',
          promptEn: 'Fill in: ___ 你答应了，就要做到。',
          choices: ['既然', '虽然', '即使', '无论'],
          correctIndex: 0,
          explanation: '既然…就 = puisque …, il faut. « Puisque tu as promis, tu dois le faire ».',
          explanationEn: '既然…就 = since …, must. "Since you promised, you must do it".'
        },
        {
          id: 'hsk4-g3',
          prompt: 'Complète : 你得早点来， ___ 我们就走了。',
          promptEn: 'Fill in: 你得早点来， ___ 我们就走了。',
          choices: ['否则', '因为', '虽然', '但是'],
          correctIndex: 0,
          explanation: '否则 = sinon. « Tu dois venir tôt, sinon on part ».',
          explanationEn: '否则 = otherwise. "You have to come early, otherwise we leave".'
        },
        {
          id: 'hsk4-g4',
          prompt: 'Complète : ___ 下雨，比赛还是继续。',
          promptEn: 'Fill in: ___ 下雨，比赛还是继续。',
          choices: ['尽管', '因为', '如果', '只要'],
          correctIndex: 0,
          explanation: '尽管 = bien que (emphatique). « Bien qu\'il pleuve, le match continue ».',
          explanationEn: '尽管 = although (emphatic). "Even though it rains, the match continues".'
        },
        {
          id: 'hsk4-g5',
          prompt: "Complète : ___ 努力，也很难成功。",
          promptEn: "Fill in: ___ 努力，也很难成功。",
          choices: ["即使","既然","除非","宁可"],
          correctIndex: 0,
          explanation: "即使 + phrase + 也 = même si... quand même.",
          explanationEn: "即使 + clause + 也 = even if... still."
        },
        {
          id: 'hsk4-g6',
          prompt: "Complète : 我 ___ 累得不行了。",
          promptEn: "Fill in: 我 ___ 累得不行了。",
          choices: ["实在","以前","比较","主要"],
          correctIndex: 0,
          explanation: "实在 + adj = vraiment, très.",
          explanationEn: "实在 + adj = truly."
        },
        {
          id: 'hsk4-g7',
          prompt: "Complète : 这件衣服 ___ 我穿正合适。",
          promptEn: "Fill in: 这件衣服 ___ 我穿正合适。",
          choices: ["对","被","让","把"],
          correctIndex: 0,
          explanation: "对 + sujet + 来说/穿 = pour...",
          explanationEn: "对 + N = for ..."
        },
        {
          id: 'hsk4-g8',
          prompt: "Complète : ___ 他的帮助，我才能完成。",
          promptEn: "Fill in: ___ 他的帮助，我才能完成。",
          choices: ["由于","虽然","不管","除非"],
          correctIndex: 0,
          explanation: "由于 = en raison de.",
          explanationEn: "由于 = due to."
        },
        {
          id: 'hsk4-g9',
          prompt: "Complète : 他 ___ 会来的。",
          promptEn: "Fill in: 他 ___ 会来的。",
          choices: ["一定","难道","其实","到底"],
          correctIndex: 0,
          explanation: "一定 = assurément.",
          explanationEn: "一定 = certainly."
        },
        {
          id: 'hsk4-g10',
          prompt: "Complète : 这件事 ___ 我来做吧。",
          promptEn: "Fill in: 这件事 ___ 我来做吧。",
          choices: ["由","对","把","向"],
          correctIndex: 0,
          explanation: "由 + agent + 来 + V = laisser X faire.",
          explanationEn: "由 + agent + 来 + V = let X do."
        }
      ]
    },
    {
      id: 'hsk4-reading',
      kind: 'reading',
      title: 'Compréhension écrite',
      titleEn: 'Reading comprehension',
      questions: [
        {
          id: 'hsk4-r1',
          context: '现在很多年轻人选择在大城市工作。虽然压力很大，但是机会也更多。不少人希望几年后能回老家买房。',
          contextEn: '现在很多年轻人选择在大城市工作。虽然压力很大，但是机会也更多。不少人希望几年后能回老家买房。',
          prompt: 'Pourquoi beaucoup de jeunes travaillent-ils en grande ville ?',
          promptEn: 'Why do many young people work in big cities?',
          choices: [
            'Pour se reposer',
            'Pour plus d\'opportunités malgré le stress',
            'Parce que les salaires y sont bas',
            'Parce qu\'ils détestent leur village'
          ],
          correctIndex: 1,
          explanation: '机会更多 = plus d\'opportunités malgré 压力很大 = stress élevé.',
          explanationEn: '机会更多 = more opportunities despite 压力很大 = high pressure.'
        },
        {
          id: 'hsk4-r2',
          context: '小张昨天迟到了，因为地铁坏了。经理虽然很生气，但也理解了他的情况。',
          contextEn: '小张昨天迟到了，因为地铁坏了。经理虽然很生气，但也理解了他的情况。',
          prompt: 'Comment le manager a-t-il réagi ?',
          promptEn: 'How did the manager react?',
          choices: [
            'Il l\'a licencié',
            'Il était en colère mais a compris',
            'Il ne s\'en est pas soucié',
            'Il a félicité Xiao Zhang'
          ],
          correctIndex: 1,
          explanation: '生气 = en colère, 理解 = comprendre — les deux réactions coexistent.',
          explanationEn: '生气 = angry, 理解 = understood — both reactions coexist.'
        },
        {
          id: 'hsk4-r3',
          context: '既然你选择了这份工作，就应该认真做。放弃并不能解决问题。',
          contextEn: '既然你选择了这份工作，就应该认真做。放弃并不能解决问题。',
          prompt: 'Quel est le message principal ?',
          promptEn: 'What is the main message?',
          choices: [
            'Il faut changer de métier souvent',
            'Il faut assumer son choix et travailler sérieusement',
            'Abandonner est la meilleure solution',
            'Le travail n\'a pas d\'importance'
          ],
          correctIndex: 1,
          explanation: '既然…就应该 = puisque c\'est ton choix, il faut assumer. 放弃并不能解决问题 = abandonner ne résout rien.',
          explanationEn: '既然…就应该 = since you chose, you must follow through. 放弃并不能解决问题 = quitting solves nothing.'
        },
        {
          id: 'hsk4-r4',
          context: '健康比什么都重要。不要为了工作忽视锻炼和睡眠。',
          contextEn: '健康比什么都重要。不要为了工作忽视锻炼和睡眠。',
          prompt: 'Quel conseil donne le texte ?',
          promptEn: 'What advice does the text give?',
          choices: [
            'Travailler plus pour gagner plus',
            'Ne pas sacrifier sa santé pour le travail',
            'Dormir moins',
            'Éviter l\'exercice'
          ],
          correctIndex: 1,
          explanation: '不要为了工作忽视锻炼和睡眠 = ne pas négliger sport et sommeil pour le travail.',
          explanationEn: '不要为了工作忽视锻炼和睡眠 = don\'t neglect exercise and sleep for work.'
        },
        {
          id: 'hsk4-r5',
          context: "最近我开始学钢琴，虽然很难，但是我很喜欢。",
          contextEn: "最近我开始学钢琴，虽然很难，但是我很喜欢。",
          prompt: "Que pense-t-il du piano ?",
          promptEn: "What about the piano?",
          choices: ["Dur mais il aime","Facile et amusant","Inintéressant","Trop cher"],
          correctIndex: 0,
          explanation: "虽然很难，但是我很喜欢.",
          explanationEn: "Hard but loves it."
        },
        {
          id: 'hsk4-r6',
          context: "为了身体健康，我决定每天早上跑步。",
          contextEn: "为了身体健康，我决定每天早上跑步。",
          prompt: "Pourquoi court-il le matin ?",
          promptEn: "Why the morning run?",
          choices: ["Pour la santé","Pour perdre du poids","Pour un concours","Par ennui"],
          correctIndex: 0,
          explanation: "为了身体健康 = pour la santé.",
          explanationEn: "For health."
        },
        {
          id: 'hsk4-r7',
          context: "我们公司下个月要招聘十个新员工。",
          contextEn: "我们公司下个月要招聘十个新员工。",
          prompt: "Que fera la société le mois prochain ?",
          promptEn: "What will the company do next month?",
          choices: ["Licencier","Embaucher 10 personnes","Déménager","Fusionner"],
          correctIndex: 1,
          explanation: "招聘十个新员工.",
          explanationEn: "Hire 10 new employees."
        },
        {
          id: 'hsk4-r8',
          context: "他的普通话说得非常流利，几乎没有口音。",
          contextEn: "他的普通话说得非常流利，几乎没有口音。",
          prompt: "Que dit-on de son mandarin ?",
          promptEn: "What about his Mandarin?",
          choices: ["Avec fort accent","Très courant, quasi sans accent","Hésitant","Débutant"],
          correctIndex: 1,
          explanation: "非常流利 + 几乎没有口音.",
          explanationEn: "Very fluent, almost no accent."
        },
        {
          id: 'hsk4-r9',
          context: "这个超市周末经常打折，很受欢迎。",
          contextEn: "这个超市周末经常打折，很受欢迎。",
          prompt: "Pourquoi le supermarché est-il populaire ?",
          promptEn: "Why popular?",
          choices: ["Soldes fréquents le week-end","Il est neuf","Il est près de chez moi","Il est grand"],
          correctIndex: 0,
          explanation: "周末经常打折 = soldes week-end.",
          explanationEn: "Frequent weekend discounts."
        },
        {
          id: 'hsk4-r10',
          context: "她的性格很开朗，所以朋友很多。",
          contextEn: "她的性格很开朗，所以朋友很多。",
          prompt: "Pourquoi a-t-elle beaucoup d'amis ?",
          promptEn: "Why many friends?",
          choices: ["Elle est riche","Elle est enjouée","Elle habite près d'eux","Elle est vieille"],
          correctIndex: 1,
          explanation: "开朗 = ouverte, joyeuse.",
          explanationEn: "开朗 = cheerful."
        }
      ]
    },
    {
      id: 'hsk4-listening',
      kind: 'listening',
      title: 'Compréhension orale',
      titleEn: 'Listening comprehension',
      questions: [
        {
          id: 'hsk4-l1',
          prompt: 'Écoute et choisis le sens.',
          promptEn: 'Listen and pick the meaning.',
          audio: 'audio/hsk4/hsk4_估计.wav',
          choices: ['Estimer, supposer', 'Refuser', 'Commander', 'Dessiner'],
          correctIndex: 0,
          explanation: '估计 (gūjì) = estimer / supposer.',
          explanationEn: '估计 (gūjì) = estimate / reckon.'
        },
        {
          id: 'hsk4-l2',
          prompt: 'Écoute et choisis le sens.',
          promptEn: 'Listen and pick the meaning.',
          audio: 'audio/hsk4/hsk4_习惯.wav',
          choices: ['Habitude', 'Invitation', 'Décision', 'Règle'],
          correctIndex: 0,
          explanation: '习惯 (xíguàn) = habitude.',
          explanationEn: '习惯 (xíguàn) = habit.'
        },
        {
          id: 'hsk4-l3',
          prompt: 'Écoute et choisis le sens.',
          promptEn: 'Listen and pick the meaning.',
          audio: 'audio/hsk4/hsk4_建议.wav',
          choices: ['Suggérer', 'Réparer', 'Construire', 'Ordonner'],
          correctIndex: 0,
          explanation: '建议 (jiànyì) = suggérer, conseiller.',
          explanationEn: '建议 (jiànyì) = suggest, advise.'
        },
        {
          id: 'hsk4-l4',
          prompt: "Écoute et choisis le sens.",
          promptEn: "Listen and pick the meaning.",
          audio: "audio/hsk4/hsk4_坚持.mp3",
          choices: ["Persévérer","Céder","Attendre","Discuter"],
          correctIndex: 0,
          explanation: "坚持 = persévérer.",
          explanationEn: "坚持 = persist."
        },
        {
          id: 'hsk4-l5',
          prompt: "Écoute et indique le sens.",
          promptEn: "Listen and pick the meaning.",
          audio: "audio/hsk4/hsk4_原因.mp3",
          choices: ["Raison, cause","Conséquence","Secret","Choix"],
          correctIndex: 0,
          explanation: "原因 = cause.",
          explanationEn: "原因 = cause."
        },
        {
          id: 'hsk4-l6',
          prompt: "Écoute et choisis la bonne traduction.",
          promptEn: "Listen and pick the translation.",
          audio: "audio/hsk4/hsk4_准备.mp3",
          choices: ["Préparer","Finir","Oublier","Discuter"],
          correctIndex: 0,
          explanation: "准备 = préparer.",
          explanationEn: "准备 = prepare."
        },
        {
          id: 'hsk4-l7',
          prompt: "Écoute et indique le sens.",
          promptEn: "Listen and pick the meaning.",
          audio: "audio/hsk4/hsk4_紧张.mp3",
          choices: ["Détendu","Tendu, stressé","Ennuyeux","Rapide"],
          correctIndex: 1,
          explanation: "紧张 = tendu.",
          explanationEn: "紧张 = nervous."
        },
        {
          id: 'hsk4-l8',
          prompt: "Écoute et choisis le sens.",
          promptEn: "Listen and pick the meaning.",
          audio: "audio/hsk4/hsk4_耐心.mp3",
          choices: ["Patience","Colère","Ennui","Impulsivité"],
          correctIndex: 0,
          explanation: "耐心 = patience.",
          explanationEn: "耐心 = patience."
        },
        {
          id: 'hsk4-l9',
          prompt: "Écoute et indique le sens.",
          promptEn: "Listen and pick the meaning.",
          audio: "audio/hsk4/hsk4_污染.mp3",
          choices: ["Propreté","Pollution","Amélioration","Progrès"],
          correctIndex: 1,
          explanation: "污染 = pollution.",
          explanationEn: "污染 = pollution."
        },
        {
          id: 'hsk4-l10',
          prompt: "Écoute et choisis la bonne réponse.",
          promptEn: "Listen and pick the right answer.",
          audio: "audio/hsk4/hsk4_经验.mp3",
          choices: ["Expérience","Âge","Salaire","Diplôme"],
          correctIndex: 0,
          explanation: "经验 = expérience.",
          explanationEn: "经验 = experience."
        }
      ]
    }
  ]
};

// ============================================================================
//  HSK 5 — avancé-supérieur (2500 mots)
// ============================================================================
export const HSK5_MOCK: EvaluationV2Config = {
  id: 'mock-hsk5',
  level: 'hsk5',
  title: 'Mock HSK 5 — Analyse et société',
  titleEn: 'Mock HSK 5 — Analysis and society',
  subtitle: '16 questions, 20 minutes. Vocabulaire de presse, 即使, 无论, compléments résultatifs.',
  subtitleEn: '16 questions, 20 minutes. Press vocabulary, 即使, 无论, result complements.',
  durationSeconds: 20 * 60,
  passingPercent: 60,
  xpReward: 220,
  sections: [
    {
      id: 'hsk5-vocab',
      kind: 'vocabulary',
      title: 'Vocabulaire de presse',
      titleEn: 'Press vocabulary',
      questions: [
        {
          id: 'hsk5-v1',
          prompt: 'Que signifie 总之 ?',
          promptEn: 'What does 总之 mean?',
          choices: ['En bref', 'Parce que', 'Cependant', 'D\'abord'],
          correctIndex: 0,
          explanation: '总之 (zǒngzhī) = en somme / pour conclure.',
          explanationEn: '总之 (zǒngzhī) = in short / to sum up.'
        },
        {
          id: 'hsk5-v2',
          prompt: 'Le sens de 强调 est :',
          promptEn: 'The meaning of 强调 is:',
          choices: ['Ignorer', 'Mettre l\'accent, insister', 'Oublier', 'Refuser'],
          correctIndex: 1,
          explanation: '强调 (qiángdiào) = souligner, insister sur.',
          explanationEn: '强调 (qiángdiào) = emphasize.'
        },
        {
          id: 'hsk5-v3',
          prompt: 'Que signifie 矛盾 ?',
          promptEn: 'What does 矛盾 mean?',
          choices: ['Accord', 'Contradiction, conflit', 'Chance', 'Récompense'],
          correctIndex: 1,
          explanation: '矛盾 (máodùn) = contradiction, conflit.',
          explanationEn: '矛盾 (máodùn) = contradiction, conflict.'
        },
        {
          id: 'hsk5-v4',
          prompt: 'Le sens de 承担 :',
          promptEn: 'The meaning of 承担:',
          choices: ['Assumer, prendre en charge', 'Rejeter', 'Transférer', 'Promettre'],
          correctIndex: 0,
          explanation: '承担 (chéngdān) = assumer / porter la responsabilité.',
          explanationEn: '承担 (chéngdān) = bear / take on (responsibility).'
        },
        {
          id: 'hsk5-v5',
          prompt: "Que signifie 规定 ?",
          promptEn: "What does 规定 mean?",
          choices: ["Suggestion","Règlement, règle","Accident","Liberté"],
          correctIndex: 1,
          explanation: "规定 (guīdìng) = règle.",
          explanationEn: "规定 = regulation."
        },
        {
          id: 'hsk5-v6',
          prompt: "Que signifie 发挥 ?",
          promptEn: "What does 发挥 mean?",
          choices: ["Cacher","Mettre en œuvre, déployer","Ignorer","Oublier"],
          correctIndex: 1,
          explanation: "发挥 (fāhuī) = déployer.",
          explanationEn: "发挥 = bring into play."
        },
        {
          id: 'hsk5-v7',
          prompt: "Que signifie 实际 ?",
          promptEn: "What does 实际 mean?",
          choices: ["Virtuel","Réel, concret","Imaginaire","Abstrait"],
          correctIndex: 1,
          explanation: "实际 (shíjì) = réel.",
          explanationEn: "实际 = actual."
        },
        {
          id: 'hsk5-v8',
          prompt: "Que signifie 承担 ?",
          promptEn: "What does 承担 mean?",
          choices: ["Assumer","Refuser","Détourner","Diviser"],
          correctIndex: 0,
          explanation: "承担 = assumer.",
          explanationEn: "承担 = take on."
        },
        {
          id: 'hsk5-v9',
          prompt: "Que signifie 缺乏 ?",
          promptEn: "What does 缺乏 mean?",
          choices: ["Abondance","Manque de","Progrès","Retard"],
          correctIndex: 1,
          explanation: "缺乏 = manquer.",
          explanationEn: "缺乏 = lack."
        },
        {
          id: 'hsk5-v10',
          prompt: "Que signifie 合作 ?",
          promptEn: "What does 合作 mean?",
          choices: ["Conflit","Coopération","Compétition","Séparation"],
          correctIndex: 1,
          explanation: "合作 = coopération.",
          explanationEn: "合作 = cooperation."
        }
      ]
    },
    {
      id: 'hsk5-grammar',
      kind: 'grammar',
      title: 'Grammaire avancée',
      titleEn: 'Advanced grammar',
      questions: [
        {
          id: 'hsk5-g1',
          prompt: 'Complète : ___ 下雨，我 ___ 去。',
          promptEn: 'Fill in: ___ 下雨，我 ___ 去。',
          choices: ['即使…也', '因为…所以', '只要…就', '无论…都'],
          correctIndex: 0,
          explanation: '即使…也 = même si … quand même. Hypothèse extrême.',
          explanationEn: '即使…也 = even if … still. Extreme hypothesis.'
        },
        {
          id: 'hsk5-g2',
          prompt: 'Complète : ___ 多贵，我都要买。',
          promptEn: 'Fill in: ___ 多贵，我都要买。',
          choices: ['无论', '既然', '因为', '所以'],
          correctIndex: 0,
          explanation: '无论 + question word + 都 = peu importe. « Peu importe le prix, je l\'achète ».',
          explanationEn: '无论 + question word + 都 = no matter. "Whatever the price, I buy it".'
        },
        {
          id: 'hsk5-g3',
          prompt: 'Complète : 他把作业写 ___ 了。',
          promptEn: 'Fill in: 他把作业写 ___ 了。',
          choices: ['完', '好', '下', '在'],
          correctIndex: 0,
          explanation: '写完 = complément résultatif « finir d\'écrire ». Le 了 marque la réalisation.',
          explanationEn: '写完 = result complement "finish writing". 了 marks completion.'
        },
        {
          id: 'hsk5-g4',
          prompt: 'Complète : 她不仅会说中文， ___ 写得非常漂亮。',
          promptEn: 'Fill in: 她不仅会说中文， ___ 写得非常漂亮。',
          choices: ['而且', '但是', '因为', '如果'],
          correctIndex: 0,
          explanation: '不仅…而且 = non seulement … mais aussi (emphase écrite).',
          explanationEn: '不仅…而且 = not only … but also (written emphasis).'
        },
        {
          id: 'hsk5-g5',
          prompt: "Complète : ___ 不累，我们也要完成这项工作。",
          promptEn: "Fill in: ___ 不累，我们也要完成这项工作。",
          choices: ["即使","既然","只有","除非"],
          correctIndex: 0,
          explanation: "即使…也 = même si... quand même.",
          explanationEn: "即使…也 = even if... still."
        },
        {
          id: 'hsk5-g6',
          prompt: "Complète : 他 ___ 年轻， ___ 经验丰富。",
          promptEn: "Fill in: 他 ___ 年轻， ___ 经验丰富。",
          choices: ["虽然…但是","如果…就","只要…就","因为…所以"],
          correctIndex: 0,
          explanation: "虽然…但是 = bien que... cependant.",
          explanationEn: "虽然…但是 = although... yet."
        },
        {
          id: 'hsk5-g7',
          prompt: "Complète : 无论天气怎么样，他 ___ 去跑步。",
          promptEn: "Fill in: 无论天气怎么样，他 ___ 去跑步。",
          choices: ["都","就","才","还"],
          correctIndex: 0,
          explanation: "无论…都 = quoi qu'il en soit... quand même.",
          explanationEn: "无论…都 = no matter... still."
        },
        {
          id: 'hsk5-g8',
          prompt: "Complète : 他 ___ 老师， ___ 作家。",
          promptEn: "Fill in: 他 ___ 老师， ___ 作家。",
          choices: ["既…又","不是…而是","虽然…但是","一边…一边"],
          correctIndex: 0,
          explanation: "既…又 = à la fois... et.",
          explanationEn: "既…又 = both...and."
        },
        {
          id: 'hsk5-g9',
          prompt: "Complète : ___ 你的建议，我才能完成这个项目。",
          promptEn: "Fill in: ___ 你的建议，我才能完成这个项目。",
          choices: ["多亏","由于","关于","为了"],
          correctIndex: 0,
          explanation: "多亏 = grâce à.",
          explanationEn: "多亏 = thanks to."
        },
        {
          id: 'hsk5-g10',
          prompt: "Complète : 这件事 ___ 我们共同解决。",
          promptEn: "Fill in: 这件事 ___ 我们共同解决。",
          choices: ["由","对","把","向"],
          correctIndex: 0,
          explanation: "由 + nous + 共同 solve = résolu par nous.",
          explanationEn: "由 = by (agent)."
        }
      ]
    },
    {
      id: 'hsk5-reading',
      kind: 'reading',
      title: 'Compréhension écrite',
      titleEn: 'Reading comprehension',
      questions: [
        {
          id: 'hsk5-r1',
          context: '随着科技的发展，人工智能正在改变我们的生活方式。虽然带来了很多便利，但也引起了一些关于就业和隐私的担忧。',
          contextEn: '随着科技的发展，人工智能正在改变我们的生活方式。虽然带来了很多便利，但也引起了一些关于就业和隐私的担忧。',
          prompt: 'Quel est le point principal ?',
          promptEn: 'What is the main point?',
          choices: [
            'L\'IA n\'a aucun effet',
            'L\'IA apporte des bénéfices mais soulève des inquiétudes',
            'L\'IA remplacera tous les emplois demain',
            'La technologie recule'
          ],
          correctIndex: 1,
          explanation: 'Le texte balance 便利 (bénéfices) et 担忧 (inquiétudes) — nuance équilibrée.',
          explanationEn: 'The text balances 便利 (benefits) with 担忧 (concerns) — balanced view.'
        },
        {
          id: 'hsk5-r2',
          context: '无论家庭背景如何，每个孩子都应该有平等的教育机会。这是社会公平的基础。',
          contextEn: '无论家庭背景如何，每个孩子都应该有平等的教育机会。这是社会公平的基础。',
          prompt: 'Quel principe défend le texte ?',
          promptEn: 'What principle does the text defend?',
          choices: [
            'L\'éducation dépend des origines',
            'L\'égalité des chances en éducation',
            'Seuls les riches méritent d\'étudier',
            'L\'éducation est secondaire'
          ],
          correctIndex: 1,
          explanation: '平等的教育机会 = égalité des chances. 无论…都 renforce l\'universalité.',
          explanationEn: '平等的教育机会 = equal opportunities. 无论…都 reinforces universality.'
        },
        {
          id: 'hsk5-r3',
          context: '即使工资不高，这份工作也值得做，因为它能给人成就感。',
          contextEn: '即使工资不高，这份工作也值得做，因为它能给人成就感。',
          prompt: 'Pourquoi ce travail vaut-il la peine ?',
          promptEn: 'Why is this job worthwhile?',
          choices: [
            'Pour le salaire élevé',
            'Pour le sentiment d\'accomplissement',
            'Pour les horaires courts',
            'Pour les vacances'
          ],
          correctIndex: 1,
          explanation: '成就感 = sentiment d\'accomplissement, malgré un salaire modéré.',
          explanationEn: '成就感 = sense of achievement, despite modest pay.'
        },
        {
          id: 'hsk5-r4',
          context: '随着城市化的推进，农村人口大量流向城市，导致了一些问题，如老人孤独、土地闲置。',
          contextEn: '随着城市化的推进，农村人口大量流向城市，导致了一些问题，如老人孤独、土地闲置。',
          prompt: 'Quelle conséquence est mentionnée ?',
          promptEn: 'Which consequence is mentioned?',
          choices: [
            'Les villes deviennent désertes',
            'La solitude des aînés à la campagne',
            'La hausse des naissances',
            'L\'amélioration de l\'agriculture'
          ],
          correctIndex: 1,
          explanation: '老人孤独 = solitude des personnes âgées (restées au village).',
          explanationEn: '老人孤独 = elderly loneliness (in rural villages).'
        },
        {
          id: 'hsk5-r5',
          context: "随着城市化的发展，很多人离开了农村。",
          contextEn: "随着城市化的发展，很多人离开了农村。",
          prompt: "Quelle tendance est décrite ?",
          promptEn: "What trend is described?",
          choices: ["Retour à la campagne","Exode rural","Stagnation","Baisse de population"],
          correctIndex: 1,
          explanation: "离开农村 = quitter la campagne.",
          explanationEn: "Leaving rural areas."
        },
        {
          id: 'hsk5-r6',
          context: "保护环境是每个人的责任。",
          contextEn: "保护环境是每个人的责任。",
          prompt: "Quel est le message ?",
          promptEn: "Main idea?",
          choices: ["L'État seul est responsable","Responsabilité de tous","On ne peut rien faire","Question trop complexe"],
          correctIndex: 1,
          explanation: "每个人的责任 = responsabilité de chacun.",
          explanationEn: "Everyone's duty."
        },
        {
          id: 'hsk5-r7',
          context: "学习一门语言需要不断的练习和耐心。",
          contextEn: "学习一门语言需要不断的练习和耐心。",
          prompt: "Que faut-il pour apprendre une langue ?",
          promptEn: "What does learning a language require?",
          choices: ["Argent","Pratique continue et patience","Voyager à l'étranger","Un prof célèbre"],
          correctIndex: 1,
          explanation: "不断的练习和耐心.",
          explanationEn: "Continuous practice + patience."
        },
        {
          id: 'hsk5-r8',
          context: "现代生活节奏快，人们容易感到疲劳。",
          contextEn: "现代生活节奏快，人们容易感到疲劳。",
          prompt: "Quel problème est soulevé ?",
          promptEn: "Problem raised?",
          choices: ["Ennui","Fatigue due au rythme rapide","Solitude","Pauvreté"],
          correctIndex: 1,
          explanation: "节奏快 + 容易疲劳 = rythme rapide + fatigue.",
          explanationEn: "Fast pace → fatigue."
        },
        {
          id: 'hsk5-r9',
          context: "一个成功的领导者需要具备良好的沟通能力。",
          contextEn: "一个成功的领导者需要具备良好的沟通能力。",
          prompt: "Quelle qualité est clé pour un leader ?",
          promptEn: "Key leadership trait?",
          choices: ["Être sévère","Bonne communication","Être jeune","Parler fort"],
          correctIndex: 1,
          explanation: "良好的沟通能力 = bonne capacité de communication.",
          explanationEn: "Good communication skills."
        },
        {
          id: 'hsk5-r10',
          context: "失败是成功之母，不要轻易放弃。",
          contextEn: "失败是成功之母，不要轻易放弃。",
          prompt: "Quel message est donné ?",
          promptEn: "Main message?",
          choices: ["Accepter la défaite","L'échec précède le succès, ne pas abandonner","Éviter l'échec","Rester prudent"],
          correctIndex: 1,
          explanation: "失败是成功之母 + 不要放弃.",
          explanationEn: "Failure is the mother of success, don't give up."
        }
      ]
    },
    {
      id: 'hsk5-listening',
      kind: 'listening',
      title: 'Compréhension orale',
      titleEn: 'Listening comprehension',
      questions: [
        {
          id: 'hsk5-l1',
          prompt: 'Écoute et choisis le sens.',
          promptEn: 'Listen and pick the meaning.',
          audio: 'audio/hsk5/hsk5_趋势.wav',
          choices: ['Tendance', 'Erreur', 'Cause', 'Détail'],
          correctIndex: 0,
          explanation: '趋势 (qūshì) = tendance, direction.',
          explanationEn: '趋势 (qūshì) = trend.'
        },
        {
          id: 'hsk5-l2',
          prompt: 'Écoute et choisis le sens.',
          promptEn: 'Listen and pick the meaning.',
          audio: 'audio/hsk5/hsk5_反映.wav',
          choices: ['Refléter, faire remonter', 'Ignorer', 'Arrêter', 'Cacher'],
          correctIndex: 0,
          explanation: '反映 (fǎnyìng) = refléter / faire remonter une situation.',
          explanationEn: '反映 (fǎnyìng) = reflect / report a situation.'
        },
        {
          id: 'hsk5-l3',
          prompt: 'Écoute et choisis le sens.',
          promptEn: 'Listen and pick the meaning.',
          audio: 'audio/hsk5/hsk5_承担.wav',
          choices: ['Assumer (responsabilité)', 'Déléguer', 'Fuir', 'Cacher'],
          correctIndex: 0,
          explanation: '承担 (chéngdān) = assumer, porter.',
          explanationEn: '承担 (chéngdān) = take on, bear.'
        },
        {
          id: 'hsk5-l4',
          prompt: "Écoute et choisis le sens.",
          promptEn: "Listen and pick the meaning.",
          audio: "audio/hsk5/hsk5_改善.mp3",
          choices: ["Dégrader","Améliorer","Stabiliser","Réorganiser"],
          correctIndex: 1,
          explanation: "改善 = améliorer.",
          explanationEn: "改善 = improve."
        },
        {
          id: 'hsk5-l5',
          prompt: "Écoute et indique le sens.",
          promptEn: "Listen and pick the meaning.",
          audio: "audio/hsk5/hsk5_传统.mp3",
          choices: ["Tradition","Modernité","Révolution","Loi"],
          correctIndex: 0,
          explanation: "传统 = tradition.",
          explanationEn: "传统 = tradition."
        },
        {
          id: 'hsk5-l6',
          prompt: "Écoute et choisis la bonne traduction.",
          promptEn: "Listen and pick the translation.",
          audio: "audio/hsk5/hsk5_观念.mp3",
          choices: ["Observation","Conception, notion","Apparence","Plainte"],
          correctIndex: 1,
          explanation: "观念 = conception / idée.",
          explanationEn: "观念 = notion."
        },
        {
          id: 'hsk5-l7',
          prompt: "Écoute et indique le sens.",
          promptEn: "Listen and pick the meaning.",
          audio: "audio/hsk5/hsk5_明显.mp3",
          choices: ["Léger","Évident","Caché","Secondaire"],
          correctIndex: 1,
          explanation: "明显 = évident.",
          explanationEn: "明显 = obvious."
        },
        {
          id: 'hsk5-l8',
          prompt: "Écoute et choisis le sens.",
          promptEn: "Listen and pick the meaning.",
          audio: "audio/hsk5/hsk5_争取.mp3",
          choices: ["Gagner, rechercher","Renoncer","Reculer","Calmer"],
          correctIndex: 0,
          explanation: "争取 = s'efforcer d'obtenir.",
          explanationEn: "争取 = strive for."
        },
        {
          id: 'hsk5-l9',
          prompt: "Écoute et indique le sens.",
          promptEn: "Listen and pick the meaning.",
          audio: "audio/hsk5/hsk5_意义.mp3",
          choices: ["Sens, importance","Ennui","Plaisir","Complexité"],
          correctIndex: 0,
          explanation: "意义 = sens, signification.",
          explanationEn: "意义 = meaning."
        },
        {
          id: 'hsk5-l10',
          prompt: "Écoute et choisis la bonne réponse.",
          promptEn: "Listen and pick the right answer.",
          audio: "audio/hsk5/hsk5_思考.mp3",
          choices: ["Réfléchir","Dormir","Rêver","Écrire"],
          correctIndex: 0,
          explanation: "思考 = réfléchir.",
          explanationEn: "思考 = ponder."
        }
      ]
    }
  ]
};

// ============================================================================
//  HSK 6 — très avancé (5000 mots)
// ============================================================================
export const HSK6_MOCK: EvaluationV2Config = {
  id: 'mock-hsk6',
  level: 'hsk6',
  title: 'Mock HSK 6 — Presse et essai',
  titleEn: 'Mock HSK 6 — Press and essays',
  subtitle: '16 questions, 22 minutes. Chengyu, registre écrit, structures subtiles.',
  subtitleEn: '16 questions, 22 minutes. Chengyu, written register, subtle structures.',
  durationSeconds: 22 * 60,
  passingPercent: 60,
  xpReward: 260,
  sections: [
    {
      id: 'hsk6-vocab',
      kind: 'vocabulary',
      title: 'Vocabulaire soutenu',
      titleEn: 'Formal vocabulary',
      questions: [
        {
          id: 'hsk6-v1',
          prompt: 'Que signifie 一举两得 ?',
          promptEn: 'What does 一举两得 mean?',
          choices: ['Faire d\'une pierre deux coups', 'Faire un pas en arrière', 'Hésiter longtemps', 'Perdre tout'],
          correctIndex: 0,
          explanation: '一举两得 (yìjǔliǎngdé) = d\'un geste, deux bénéfices. Chengyu classique.',
          explanationEn: '一举两得 (yìjǔliǎngdé) = kill two birds with one stone. Classic chengyu.'
        },
        {
          id: 'hsk6-v2',
          prompt: 'Le sens de 克服 est :',
          promptEn: 'The meaning of 克服 is:',
          choices: ['Surmonter', 'Admirer', 'Détruire', 'Reproduire'],
          correctIndex: 0,
          explanation: '克服 (kèfú) = surmonter (une difficulté, un obstacle).',
          explanationEn: '克服 (kèfú) = overcome (a difficulty).'
        },
        {
          id: 'hsk6-v3',
          prompt: 'Que signifie 显而易见 ?',
          promptEn: 'What does 显而易见 mean?',
          choices: ['Caché', 'Évident', 'Rare', 'Complexe'],
          correctIndex: 1,
          explanation: '显而易见 (xiǎnéryìjiàn) = évident, manifeste. Chengyu.',
          explanationEn: '显而易见 (xiǎnéryìjiàn) = obvious, self-evident. Chengyu.'
        },
        {
          id: 'hsk6-v4',
          prompt: 'Le sens de 局限 :',
          promptEn: 'The meaning of 局限:',
          choices: ['Liberté', 'Limitation, restriction', 'Progrès', 'Hasard'],
          correctIndex: 1,
          explanation: '局限 (júxiàn) = limite, contrainte. 局限性 = caractère limité.',
          explanationEn: '局限 (júxiàn) = limitation. 局限性 = limiting nature.'
        },
        {
          id: 'hsk6-v5',
          prompt: "Que signifie 繁荣 ?",
          promptEn: "What does 繁荣 mean?",
          choices: ["Déclin","Prospérité","Guerre","Famine"],
          correctIndex: 1,
          explanation: "繁荣 (fánróng) = prospérité.",
          explanationEn: "繁荣 = prosperity."
        },
        {
          id: 'hsk6-v6',
          prompt: "Que signifie 忽视 ?",
          promptEn: "What does 忽视 mean?",
          choices: ["Surveiller","Négliger, ignorer","Respecter","Admirer"],
          correctIndex: 1,
          explanation: "忽视 = ignorer.",
          explanationEn: "忽视 = ignore."
        },
        {
          id: 'hsk6-v7',
          prompt: "Que signifie 弥补 ?",
          promptEn: "What does 弥补 mean?",
          choices: ["Compenser","Détruire","Oublier","Accélérer"],
          correctIndex: 0,
          explanation: "弥补 = compenser.",
          explanationEn: "弥补 = make up for."
        },
        {
          id: 'hsk6-v8',
          prompt: "Que signifie 矛盾 ?",
          promptEn: "What does 矛盾 mean?",
          choices: ["Contradiction","Harmonie","Discussion","Consensus"],
          correctIndex: 0,
          explanation: "矛盾 = contradiction.",
          explanationEn: "矛盾 = contradiction."
        },
        {
          id: 'hsk6-v9',
          prompt: "Que signifie 陶醉 ?",
          promptEn: "What does 陶醉 mean?",
          choices: ["Être enivré, fasciné par","Abandonner","Déplorer","Cacher"],
          correctIndex: 0,
          explanation: "陶醉 (táozuì) = être enivré/fasciné.",
          explanationEn: "陶醉 = revel in."
        },
        {
          id: 'hsk6-v10',
          prompt: "Que signifie 显著 ?",
          promptEn: "What does 显著 mean?",
          choices: ["Insignifiant","Remarquable","Normal","Ordinaire"],
          correctIndex: 1,
          explanation: "显著 = notable.",
          explanationEn: "显著 = remarkable."
        }
      ]
    },
    {
      id: 'hsk6-grammar',
      kind: 'grammar',
      title: 'Structures fines',
      titleEn: 'Fine-grained structures',
      questions: [
        {
          id: 'hsk6-g1',
          prompt: 'Complète : 与其抱怨， ___ 行动。',
          promptEn: 'Fill in: 与其抱怨， ___ 行动。',
          choices: ['不如', '不但', '所以', '因为'],
          correctIndex: 0,
          explanation: '与其…不如 = plutôt que … autant. Arbitrage rhétorique.',
          explanationEn: '与其…不如 = rather than … better. Rhetorical trade-off.'
        },
        {
          id: 'hsk6-g2',
          prompt: 'Complète : ___ 努力，才能成功。',
          promptEn: 'Fill in: ___ 努力，才能成功。',
          choices: ['只有', '只要', '无论', '既然'],
          correctIndex: 0,
          explanation: '只有…才 = condition exclusive. « Seul le travail mène au succès ».',
          explanationEn: '只有…才 = exclusive condition. "Only hard work leads to success".'
        },
        {
          id: 'hsk6-g3',
          prompt: 'Complète : 宁可加班， ___ 拖延工作。',
          promptEn: 'Fill in: 宁可加班， ___ 拖延工作。',
          choices: ['也不', '因为', '虽然', '只要'],
          correctIndex: 0,
          explanation: '宁可 A 也不 B = préfère A plutôt que jamais B. Schéma résolu.',
          explanationEn: '宁可 A 也不 B = rather A than ever B. Resolved pattern.'
        },
        {
          id: 'hsk6-g4',
          prompt: 'Complète : 这个问题 ___ 重要。',
          promptEn: 'Fill in: 这个问题 ___ 重要。',
          choices: ['至关', '完全不', '根本没', '从未'],
          correctIndex: 0,
          explanation: '至关重要 = d\'une importance capitale. Collocation soutenue.',
          explanationEn: '至关重要 = of crucial importance. Formal collocation.'
        },
        {
          id: 'hsk6-g5',
          prompt: "Complète : ___ 天气再冷，他也要去锻炼。",
          promptEn: "Fill in: ___ 天气再冷，他也要去锻炼。",
          choices: ["不管","除非","只有","宁可"],
          correctIndex: 0,
          explanation: "不管 + 再 + adj = peu importe à quel point.",
          explanationEn: "不管 + 再 + adj = no matter how."
        },
        {
          id: 'hsk6-g6',
          prompt: "Complète : 他 ___ 不成功， ___ 不放弃。",
          promptEn: "Fill in: 他 ___ 不成功， ___ 不放弃。",
          choices: ["宁可…也","与其…不如","不但…而且","既然…就"],
          correctIndex: 0,
          explanation: "宁可…也 = plutôt X que Y.",
          explanationEn: "宁可…也 = would rather X than Y."
        },
        {
          id: 'hsk6-g7',
          prompt: "Complète : 这本书 ___ 难懂， ___ 值得一读。",
          promptEn: "Fill in: 这本书 ___ 难懂， ___ 值得一读。",
          choices: ["尽管…但是","只要…就","既然…就","除非…才"],
          correctIndex: 0,
          explanation: "尽管…但是 = bien que... néanmoins.",
          explanationEn: "尽管…但是 = although... still."
        },
        {
          id: 'hsk6-g8',
          prompt: "Complète : 事情 ___ 发生， ___ 努力解决。",
          promptEn: "Fill in: 事情 ___ 发生， ___ 努力解决。",
          choices: ["既然…就","与其…不如","不管…都","只有…才"],
          correctIndex: 0,
          explanation: "既然…就 = puisque... alors.",
          explanationEn: "既然…就 = since... then."
        },
        {
          id: 'hsk6-g9',
          prompt: "Complète : 这个项目 ___ 他来负责最合适。",
          promptEn: "Fill in: 这个项目 ___ 他来负责最合适。",
          choices: ["由","对","把","被"],
          correctIndex: 0,
          explanation: "由 + agent + 来 + V = laisser X s'occuper de.",
          explanationEn: "由 + agent + 来 + V = for X to handle."
        },
        {
          id: 'hsk6-g10',
          prompt: "Complète : ___ 其他方法都没用， ___ 试试这个办法吧。",
          promptEn: "Fill in: ___ 其他方法都没用， ___ 试试这个办法吧。",
          choices: ["既然…就","宁可…也","不管…都","只要…就"],
          correctIndex: 0,
          explanation: "既然…就 = puisque... alors.",
          explanationEn: "既然…就 = since... then."
        }
      ]
    },
    {
      id: 'hsk6-reading',
      kind: 'reading',
      title: 'Compréhension écrite',
      titleEn: 'Reading comprehension',
      questions: [
        {
          id: 'hsk6-r1',
          context: '全球化给发展中国家带来了前所未有的机遇，但同时也加剧了贫富差距。如何在开放中实现共同发展，是当代各国面临的共同课题。',
          contextEn: '全球化给发展中国家带来了前所未有的机遇，但同时也加剧了贫富差距。如何在开放中实现共同发展，是当代各国面临的共同课题。',
          prompt: 'Quelle est la double face de la mondialisation selon le texte ?',
          promptEn: 'What is the two-sided face of globalization?',
          choices: [
            'Opportunités sans inconvénients',
            'Chance historique mais creusement des inégalités',
            'Uniquement des désastres',
            'Une tendance qui disparaît'
          ],
          correctIndex: 1,
          explanation: '前所未有的机遇 = opportunités inédites + 贫富差距 = écart riches/pauvres.',
          explanationEn: '前所未有的机遇 = unprecedented opportunities + 贫富差距 = wealth gap.'
        },
        {
          id: 'hsk6-r2',
          context: '中国古代哲学强调"知行合一"，认为真正的知识必须通过实践来体现。王阳明的心学正是这一思想的集大成者。',
          contextEn: '中国古代哲学强调"知行合一"，认为真正的知识必须通过实践来体现。王阳明的心学正是这一思想的集大成者。',
          prompt: 'Que prône le principe 知行合一 ?',
          promptEn: 'What does the 知行合一 principle advocate?',
          choices: [
            'Séparer la connaissance de l\'action',
            'Unir connaissance et action dans la pratique',
            'Ignorer les enseignements anciens',
            'Étudier uniquement les textes'
          ],
          correctIndex: 1,
          explanation: '知行合一 = unité du savoir et de l\'action, via 实践 (pratique).',
          explanationEn: '知行合一 = unity of knowledge and action, through 实践 (practice).'
        },
        {
          id: 'hsk6-r3',
          context: '尽管人工智能日益发达，人类的创造力和同理心仍是机器难以替代的核心能力。',
          contextEn: '尽管人工智能日益发达，人类的创造力和同理心仍是机器难以替代的核心能力。',
          prompt: 'Qu\'est-ce que les machines ne peuvent pas remplacer ?',
          promptEn: 'What can machines not replace?',
          choices: [
            'Le calcul mathématique',
            'La créativité et l\'empathie humaines',
            'La mémoire factuelle',
            'La traduction'
          ],
          correctIndex: 1,
          explanation: '创造力和同理心 = créativité et empathie, 难以替代 = difficile à remplacer.',
          explanationEn: '创造力和同理心 = creativity & empathy, 难以替代 = hard to replace.'
        },
        {
          id: 'hsk6-r4',
          context: '环境保护并非一朝一夕之功，需要全社会持之以恒的努力。',
          contextEn: '环境保护并非一朝一夕之功，需要全社会持之以恒的努力。',
          prompt: 'Quel est le sens de 一朝一夕 dans ce contexte ?',
          promptEn: 'What does 一朝一夕 mean here?',
          choices: [
            'Du jour au lendemain, en peu de temps',
            'Pour toujours',
            'Une seule journée',
            'Il y a longtemps'
          ],
          correctIndex: 0,
          explanation: '一朝一夕 = « un matin un soir » = en un clin d\'œil. Chengyu très courant.',
          explanationEn: '一朝一夕 = "one morning one evening" = overnight. Very common chengyu.'
        },
        {
          id: 'hsk6-r5',
          context: "文化的传承需要每一代人的努力，不能只依靠政府。",
          contextEn: "文化的传承需要每一代人的努力，不能只依靠政府。",
          prompt: "Quelle idée est défendue ?",
          promptEn: "What idea is argued?",
          choices: ["L'État seul suffit","Chaque génération doit contribuer","La culture se perd","Il faut imiter les autres"],
          correctIndex: 1,
          explanation: "每一代人的努力 = effort de chaque génération.",
          explanationEn: "Each generation must contribute."
        },
        {
          id: 'hsk6-r6',
          context: "真正的友谊经得起时间的考验。",
          contextEn: "真正的友谊经得起时间的考验。",
          prompt: "Quel est le critère d'une vraie amitié ?",
          promptEn: "Criterion of true friendship?",
          choices: ["Argent","Résister à l'épreuve du temps","Vivre près","Faire la fête"],
          correctIndex: 1,
          explanation: "经得起时间的考验.",
          explanationEn: "Endures time."
        },
        {
          id: 'hsk6-r7',
          context: "面对困难，我们应该保持冷静，寻找解决办法。",
          contextEn: "面对困难，我们应该保持冷静，寻找解决办法。",
          prompt: "Quel conseil est donné ?",
          promptEn: "What advice?",
          choices: ["Paniquer","Rester calme et chercher des solutions","Abandonner","Demander de l'aide"],
          correctIndex: 1,
          explanation: "保持冷静 + 寻找办法.",
          explanationEn: "Stay calm + find solutions."
        },
        {
          id: 'hsk6-r8',
          context: "随着科技的进步，人们的生活方式发生了巨大变化。",
          contextEn: "随着科技的进步，人们的生活方式发生了巨大变化。",
          prompt: "Quel est le sujet ?",
          promptEn: "Topic?",
          choices: ["Disparition de la tech","Changement des modes de vie dus à la tech","Progrès médical","Politique"],
          correctIndex: 1,
          explanation: "随着科技进步 + 生活方式变化.",
          explanationEn: "Tech advances → lifestyle change."
        },
        {
          id: 'hsk6-r9',
          context: "教育的目的不仅是传授知识，更是培养独立思考的能力。",
          contextEn: "教育的目的不仅是传授知识，更是培养独立思考的能力。",
          prompt: "Quel est le but ultime de l'éducation ?",
          promptEn: "Ultimate goal of education?",
          choices: ["Apprendre par cœur","Former la pensée autonome","Réussir aux examens","Décrocher un emploi"],
          correctIndex: 1,
          explanation: "独立思考的能力.",
          explanationEn: "Independent thinking."
        },
        {
          id: 'hsk6-r10',
          context: "一个社会的文明程度可以从对弱者的态度看出来。",
          contextEn: "一个社会的文明程度可以从对弱者的态度看出来。",
          prompt: "Quel critère de civilisation est donné ?",
          promptEn: "Civilization marker?",
          choices: ["Richesse","Traitement des plus faibles","Armée","Population"],
          correctIndex: 1,
          explanation: "对弱者的态度.",
          explanationEn: "Treatment of the weak."
        }
      ]
    },
    {
      id: 'hsk6-listening',
      kind: 'listening',
      title: 'Compréhension orale',
      titleEn: 'Listening comprehension',
      questions: [
        {
          id: 'hsk6-l1',
          prompt: 'Écoute et choisis le sens.',
          promptEn: 'Listen and pick the meaning.',
          audio: 'audio/hsk6/hsk6_推动.wav',
          choices: ['Pousser, impulser', 'Retarder', 'Abandonner', 'Éviter'],
          correctIndex: 0,
          explanation: '推动 (tuīdòng) = promouvoir, faire avancer.',
          explanationEn: '推动 (tuīdòng) = promote, drive forward.'
        },
        {
          id: 'hsk6-l2',
          prompt: 'Écoute et choisis le sens.',
          promptEn: 'Listen and pick the meaning.',
          audio: 'audio/hsk6/hsk6_范围.wav',
          choices: ['Portée, étendue', 'Erreur', 'Doute', 'Solution'],
          correctIndex: 0,
          explanation: '范围 (fànwéi) = étendue, périmètre.',
          explanationEn: '范围 (fànwéi) = scope, range.'
        },
        {
          id: 'hsk6-l3',
          prompt: 'Écoute et choisis le sens.',
          promptEn: 'Listen and pick the meaning.',
          audio: 'audio/hsk6/hsk6_体现.wav',
          choices: ['Incarner, refléter', 'Dissimuler', 'Ignorer', 'Contredire'],
          correctIndex: 0,
          explanation: '体现 (tǐxiàn) = incarner, manifester.',
          explanationEn: '体现 (tǐxiàn) = embody, manifest.'
        },
        {
          id: 'hsk6-l4',
          prompt: "Écoute et choisis le sens.",
          promptEn: "Listen and pick the meaning.",
          audio: "audio/hsk6/hsk6_潜力.mp3",
          choices: ["Potentiel","Faiblesse","Faille","Défaut"],
          correctIndex: 0,
          explanation: "潜力 = potentiel.",
          explanationEn: "潜力 = potential."
        },
        {
          id: 'hsk6-l5',
          prompt: "Écoute et indique le sens.",
          promptEn: "Listen and pick the meaning.",
          audio: "audio/hsk6/hsk6_克服.mp3",
          choices: ["Fuir","Surmonter","Négocier","Abandonner"],
          correctIndex: 1,
          explanation: "克服 = surmonter.",
          explanationEn: "克服 = overcome."
        },
        {
          id: 'hsk6-l6',
          prompt: "Écoute et choisis la bonne traduction.",
          promptEn: "Listen and pick the translation.",
          audio: "audio/hsk6/hsk6_珍贵.mp3",
          choices: ["Ordinaire","Précieux, rare","Fragile","Fréquent"],
          correctIndex: 1,
          explanation: "珍贵 = précieux.",
          explanationEn: "珍贵 = precious."
        },
        {
          id: 'hsk6-l7',
          prompt: "Écoute et indique le sens.",
          promptEn: "Listen and pick the meaning.",
          audio: "audio/hsk6/hsk6_遗憾.mp3",
          choices: ["Regret","Joie","Surprise","Indifférence"],
          correctIndex: 0,
          explanation: "遗憾 = regret.",
          explanationEn: "遗憾 = regret."
        },
        {
          id: 'hsk6-l8',
          prompt: "Écoute et choisis le sens.",
          promptEn: "Listen and pick the meaning.",
          audio: "audio/hsk6/hsk6_辉煌.mp3",
          choices: ["Brillant, splendide","Simple","Sombre","Passé"],
          correctIndex: 0,
          explanation: "辉煌 = brillant.",
          explanationEn: "辉煌 = glorious."
        },
        {
          id: 'hsk6-l9',
          prompt: "Écoute et indique le sens.",
          promptEn: "Listen and pick the meaning.",
          audio: "audio/hsk6/hsk6_衡量.mp3",
          choices: ["Mesurer, évaluer","Réparer","Ignorer","Accélérer"],
          correctIndex: 0,
          explanation: "衡量 = évaluer.",
          explanationEn: "衡量 = measure / weigh."
        },
        {
          id: 'hsk6-l10',
          prompt: "Écoute et choisis la bonne réponse.",
          promptEn: "Listen and pick the right answer.",
          audio: "audio/hsk6/hsk6_辩论.mp3",
          choices: ["Débat","Silence","Consensus","Annonce"],
          correctIndex: 0,
          explanation: "辩论 = débat.",
          explanationEn: "辩论 = debate."
        }
      ]
    }
  ]
};

// ============================================================================
//  REGISTRE — tous les mocks enrichis
// ============================================================================

export const HSK_EVALUATIONS: readonly EvaluationV2Config[] = [
  // Série A (débutant) — format compact 4 sections × 3-4 Q
  HSK1_MOCK,
  HSK2_MOCK,
  HSK3_MOCK,
  HSK4_MOCK,
  HSK5_MOCK,
  HSK6_MOCK,
  // Série B (approfondissement) — format étendu 4 sections × 6-7 Q
  HSK1_MOCK_B,
  HSK2_MOCK_B,
  HSK3_MOCK_B,
  HSK4_MOCK_B,
  HSK5_MOCK_B,
  HSK6_MOCK_B
];

/**
 * Récupère le premier mock d'un niveau (rétro-compat). Préférer
 * `getHskEvaluationsForLevel` pour afficher toutes les variantes.
 */
export function getHskEvaluation(
  level: EvaluationV2Config['level']
): EvaluationV2Config | undefined {
  return HSK_EVALUATIONS.find((ev) => ev.level === level);
}

/**
 * Récupère tous les mocks disponibles pour un niveau donné
 * (série A + série B + futures éventuelles).
 */
export function getHskEvaluationsForLevel(
  level: EvaluationV2Config['level']
): EvaluationV2Config[] {
  return HSK_EVALUATIONS.filter((ev) => ev.level === level);
}
