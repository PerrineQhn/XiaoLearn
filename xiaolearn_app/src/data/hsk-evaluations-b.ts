/**
 * hsk-evaluations-b.ts — Série B : mock HSK approfondis
 * -------------------------------------------------------
 * Tâche #42 (enrichissement) : seconde évaluation par niveau, avec 6 à 7
 * questions par section (vs 3-4 dans la série A). Les sections d'écoute
 * utilisent de nouvelles phrases chinoises qui seront synthétisées par
 * Azure Neural TTS via `scripts/generate-all-audio.mjs`.
 *
 *   - Paths audio : `audio/phrases/eval-<level>-b-<n>.mp3`
 *   - Le scanner `collectFromTsSources('audio/phrases')` apparie chaque
 *     `audio:` au champ `hanzi:` voisin (fenêtre de 500 caractères).
 *
 * Chaque test B pèse ~24 questions, soit 50 % de plus que la série A.
 * Durée légèrement rallongée (+2 min) et XP rehaussés (+40).
 */
import type { EvaluationV2Config } from '../pages/EvaluationPageV2';

// ============================================================================
//  HSK 1 — Série B — « Premiers pas confirmés »
// ============================================================================
export const HSK1_MOCK_B: EvaluationV2Config = {
  id: 'mock-hsk1-b',
  level: 'hsk1',
  title: 'Mock HSK 1 · Série B — Ancrage',
  titleEn: 'Mock HSK 1 · Series B — Anchoring',
  subtitle:
    '24 questions, 12 minutes. Variante plus dense pour consolider les bases HSK 1 après un premier essai.',
  subtitleEn:
    '24 questions, 12 minutes. A denser variant to lock down HSK 1 basics after a first run.',
  durationSeconds: 12 * 60,
  passingPercent: 60,
  xpReward: 160,
  sections: [
    {
      id: 'hsk1b-vocab',
      kind: 'vocabulary',
      title: 'Vocabulaire courant — série B',
      titleEn: 'Everyday vocabulary — series B',
      questions: [
        {
          id: 'hsk1b-v1',
          prompt: 'Que signifie 医院 ?',
          promptEn: 'What does 医院 mean?',
          choices: ['École', 'Hôpital', 'Banque', 'Restaurant'],
          correctIndex: 1,
          explanation: '医院 (yī yuàn) = hôpital. 医生 y travaille.',
          explanationEn: '医院 (yī yuàn) = hospital. 医生 (doctor) works there.'
        },
        {
          id: 'hsk1b-v2',
          prompt: 'Quel est le pinyin de 漂亮 ?',
          promptEn: 'What is the pinyin of 漂亮?',
          choices: ['piào liang', 'pǔ tōng', 'píng cháng', 'pàng zi'],
          correctIndex: 0,
          explanation: '漂亮 = piào liang = joli(e), beau.',
          explanationEn: '漂亮 = piào liang = pretty, beautiful.'
        },
        {
          id: 'hsk1b-v3',
          prompt: 'Lequel désigne une couleur ?',
          promptEn: 'Which one is a color?',
          choices: ['红色', '电话', '面包', '朋友'],
          correctIndex: 0,
          explanation: '红色 (hóng sè) = rouge. 色 = couleur.',
          explanationEn: '红色 (hóng sè) = red. 色 = color.'
        },
        {
          id: 'hsk1b-v4',
          prompt: 'Que signifie 工作 ?',
          promptEn: 'What does 工作 mean?',
          choices: ['Étudier', 'Travailler / travail', 'Jouer', 'Courir'],
          correctIndex: 1,
          explanation: '工作 (gōng zuò) = travail / travailler. HSK 1 noyau dur.',
          explanationEn: '工作 (gōng zuò) = work / to work. HSK 1 core.'
        },
        {
          id: 'hsk1b-v5',
          prompt: 'Quel mot signifie « aujourd\'hui » ?',
          promptEn: 'Which word means "today"?',
          choices: ['昨天', '今天', '明天', '前天'],
          correctIndex: 1,
          explanation: '今天 (jīn tiān) = aujourd\'hui. 昨天 = hier, 明天 = demain.',
          explanationEn: '今天 (jīn tiān) = today. 昨天 = yesterday, 明天 = tomorrow.'
        },
        {
          id: 'hsk1b-v6',
          prompt: 'Que signifie 喝 ?',
          promptEn: 'What does 喝 mean?',
          choices: ['Manger', 'Boire', 'Dormir', 'Courir'],
          correctIndex: 1,
          explanation: '喝 (hē) = boire. 喝水 = boire de l\'eau.',
          explanationEn: '喝 (hē) = drink. 喝水 = drink water.'
        },
        {
          id: 'hsk1b-v7',
          prompt: "Que signifie 菜 ?",
          promptEn: "What does 菜 mean?",
          choices: ["Riz","Plat / légume","Fruit","Thé"],
          correctIndex: 1,
          explanation: "菜 = plat / légume.",
          explanationEn: "菜 = dish/veggie."
        },
        {
          id: 'hsk1b-v8',
          prompt: "Lequel signifie « nombre » ?",
          promptEn: "Which means \"number\"?",
          choices: ["几","多少","几/多少 (les deux)","Aucun"],
          correctIndex: 2,
          explanation: "几 et 多少 interrogent la quantité.",
          explanationEn: "几 & 多少 both ask quantity."
        },
        {
          id: 'hsk1b-v9',
          prompt: "Que signifie 听 ?",
          promptEn: "What does 听 mean?",
          choices: ["Voir","Entendre, écouter","Parler","Lire"],
          correctIndex: 1,
          explanation: "听 = écouter.",
          explanationEn: "听 = listen."
        },
        {
          id: 'hsk1b-v10',
          prompt: "Que signifie 看 ?",
          promptEn: "What does 看 mean?",
          choices: ["Regarder / voir","Sentir","Toucher","Goûter"],
          correctIndex: 0,
          explanation: "看 = regarder.",
          explanationEn: "看 = look/watch."
        }
      ]
    },
    {
      id: 'hsk1b-grammar',
      kind: 'grammar',
      title: 'Grammaire essentielle — série B',
      titleEn: 'Essential grammar — series B',
      questions: [
        {
          id: 'hsk1b-g1',
          prompt: 'Complète : 我 ___ 喜欢咖啡。',
          promptEn: 'Fill in: 我 ___ 喜欢咖啡。',
          choices: ['不', '没', '别', '没有'],
          correctIndex: 0,
          explanation: '不 nie les verbes de préférence/état au présent : 不喜欢 = ne pas aimer.',
          explanationEn: '不 negates preference/state verbs in the present: 不喜欢 = don\'t like.'
        },
        {
          id: 'hsk1b-g2',
          prompt: 'Complète : 这 ___ 我的书。',
          promptEn: 'Fill in: 这 ___ 我的书。',
          choices: ['是', '在', '有', '会'],
          correctIndex: 0,
          explanation: '« 这是我的书 » = C\'est mon livre. 是 relie sujet et attribut.',
          explanationEn: '« 这是我的书 » = This is my book. 是 links subject and predicate noun.'
        },
        {
          id: 'hsk1b-g3',
          prompt: 'Complète : 你叫 ___ 名字？',
          promptEn: 'Fill in: 你叫 ___ 名字？',
          choices: ['什么', '哪', '怎么', '多少'],
          correctIndex: 0,
          explanation: '什么 = quoi/quel. « Comment t\'appelles-tu ? » = 你叫什么名字？.',
          explanationEn: '什么 = what. "What is your name?" = 你叫什么名字？.'
        },
        {
          id: 'hsk1b-g4',
          prompt: 'Complète : 明天我 ___ 去北京。',
          promptEn: 'Fill in: 明天我 ___ 去北京。',
          choices: ['要', '了', '过', '吗'],
          correctIndex: 0,
          explanation: '要 + verbe = vouloir / être sur le point de. « Demain je vais / dois aller à Pékin ».',
          explanationEn: '要 + verb = want / be about to. "Tomorrow I\'ll go / have to go to Beijing".'
        },
        {
          id: 'hsk1b-g5',
          prompt: 'Complète : 我家 ___ 三个人。',
          promptEn: 'Fill in: 我家 ___ 三个人。',
          choices: ['是', '有', '在', '都'],
          correctIndex: 1,
          explanation: '有 indique l\'existence : « Il y a trois personnes dans ma famille ».',
          explanationEn: '有 marks existence: "There are three people in my family".'
        },
        {
          id: 'hsk1b-g6',
          prompt: 'Complète : 她 ___ 漂亮！',
          promptEn: 'Fill in: 她 ___ 漂亮！',
          choices: ['很', '是', '在', '了'],
          correctIndex: 0,
          explanation: 'Un adjectif prédicatif prend 很 devant en chinois : 她很漂亮 = elle est jolie.',
          explanationEn: 'Predicative adjectives take 很 in front: 她很漂亮 = she is pretty.'
        },
        {
          id: 'hsk1b-g7',
          prompt: "Complète : 我 ___ 喝茶， ___ 喝咖啡。",
          promptEn: "Fill in: 我 ___ 喝茶， ___ 喝咖啡。",
          choices: ["喜欢…不喜欢","是…不是","有…没有","想…不想"],
          correctIndex: 0,
          explanation: "Opposition directe préférence.",
          explanationEn: "Direct preference contrast."
        },
        {
          id: 'hsk1b-g8',
          prompt: "Complète : 现在 ___ 三点。",
          promptEn: "Fill in: 现在 ___ 三点。",
          choices: ["是","有","在","了"],
          correctIndex: 0,
          explanation: "是 relie l'heure.",
          explanationEn: "是 links time."
        },
        {
          id: 'hsk1b-g9',
          prompt: "Complète : 你 ___ 在哪儿？",
          promptEn: "Fill in: 你 ___ 在哪儿？",
          choices: ["现在","已经","就要","马上"],
          correctIndex: 0,
          explanation: "现在 = maintenant.",
          explanationEn: "现在 = now."
        },
        {
          id: 'hsk1b-g10',
          prompt: "Complète : 我 ___ 朋友一起去看电影。",
          promptEn: "Fill in: 我 ___ 朋友一起去看电影。",
          choices: ["和","是","都","在"],
          correctIndex: 0,
          explanation: "和 = avec.",
          explanationEn: "和 = with."
        }
      ]
    },
    {
      id: 'hsk1b-reading',
      kind: 'reading',
      title: 'Compréhension écrite — série B',
      titleEn: 'Reading comprehension — series B',
      questions: [
        {
          id: 'hsk1b-r1',
          context: '我姐姐是医生。她每天都很忙。',
          contextEn: '我姐姐是医生。她每天都很忙。',
          prompt: 'Que fait la grande sœur ?',
          promptEn: 'What does the older sister do?',
          choices: [
            'Elle est étudiante',
            'Elle est médecin et très occupée',
            'Elle reste à la maison',
            'Elle travaille à l\'école'
          ],
          correctIndex: 1,
          explanation: '医生 = médecin. 每天都很忙 = très occupée chaque jour.',
          explanationEn: '医生 = doctor. 每天都很忙 = very busy every day.'
        },
        {
          id: 'hsk1b-r2',
          context: '今天天气很好。我和朋友去公园。',
          contextEn: '今天天气很好。我和朋友去公园。',
          prompt: 'Où vont-ils ?',
          promptEn: 'Where are they going?',
          choices: ['À l\'école', 'Au parc', 'À l\'hôpital', 'Au restaurant'],
          correctIndex: 1,
          explanation: '公园 = parc. 天气很好 = beau temps.',
          explanationEn: '公园 = park. 天气很好 = nice weather.'
        },
        {
          id: 'hsk1b-r3',
          context: '我喜欢喝茶，不喜欢喝咖啡。',
          contextEn: '我喜欢喝茶，不喜欢喝咖啡。',
          prompt: 'Que préfère la personne ?',
          promptEn: 'What does the person prefer?',
          choices: [
            'Le café, pas le thé',
            'Le thé, pas le café',
            'Les deux',
            'Ni l\'un ni l\'autre'
          ],
          correctIndex: 1,
          explanation: '喜欢喝茶 = aime le thé. 不喜欢喝咖啡 = n\'aime pas le café.',
          explanationEn: '喜欢喝茶 = likes tea. 不喜欢喝咖啡 = doesn\'t like coffee.'
        },
        {
          id: 'hsk1b-r4',
          context: '明天是星期天。我不去工作，我在家休息。',
          contextEn: '明天是星期天。我不去工作，我在家休息。',
          prompt: 'Que fera la personne demain ?',
          promptEn: 'What will the person do tomorrow?',
          choices: [
            'Travailler',
            'Aller à l\'école',
            'Rester à la maison et se reposer',
            'Voyager à Pékin'
          ],
          correctIndex: 2,
          explanation: '在家休息 = rester se reposer à la maison.',
          explanationEn: '在家休息 = stay home and rest.'
        },
        {
          id: 'hsk1b-r5',
          context: '爸爸今年四十五岁。妈妈比爸爸小两岁。',
          contextEn: '爸爸今年四十五岁。妈妈比爸爸小两岁。',
          prompt: 'Quel âge a la mère ?',
          promptEn: 'How old is the mother?',
          choices: ['43 ans', '45 ans', '47 ans', '50 ans'],
          correctIndex: 0,
          explanation: '45 − 2 = 43. 比...小两岁 = plus jeune de deux ans.',
          explanationEn: '45 − 2 = 43. 比...小两岁 = two years younger.'
        },
        {
          id: 'hsk1b-r6',
          context: '这本书不贵，只要二十块钱。',
          contextEn: '这本书不贵，只要二十块钱。',
          prompt: 'Combien coûte le livre ?',
          promptEn: 'How much does the book cost?',
          choices: ['2 yuans', '20 yuans', '200 yuans', 'Gratuit'],
          correctIndex: 1,
          explanation: '二十块钱 = 20 yuans. 只要 = seulement.',
          explanationEn: '二十块钱 = 20 yuan. 只要 = only.'
        },
        {
          id: 'hsk1b-r7',
          context: "我有一个中国朋友，他叫小李。",
          contextEn: "我有一个中国朋友，他叫小李。",
          prompt: "Comment s'appelle son ami ?",
          promptEn: "Friend's name?",
          choices: ["Xiao Wang","Xiao Li","Xiao Ming","Xiao Zhang"],
          correctIndex: 1,
          explanation: "他叫小李.",
          explanationEn: "Called Xiao Li."
        },
        {
          id: 'hsk1b-r8',
          context: "我家有一只小狗，它很可爱。",
          contextEn: "我家有一只小狗，它很可爱。",
          prompt: "Quel est l'animal ?",
          promptEn: "Which animal?",
          choices: ["Chat","Chien","Oiseau","Poisson"],
          correctIndex: 1,
          explanation: "小狗 = petit chien.",
          explanationEn: "小狗 = puppy."
        },
        {
          id: 'hsk1b-r9',
          context: "明天我们去北京。",
          contextEn: "明天我们去北京。",
          prompt: "Où vont-ils demain ?",
          promptEn: "Where tomorrow?",
          choices: ["Shanghai","Pékin","Canton","Hong Kong"],
          correctIndex: 1,
          explanation: "去北京 = aller à Pékin.",
          explanationEn: "Going to Beijing."
        },
        {
          id: 'hsk1b-r10',
          context: "我下午去商店买东西。",
          contextEn: "我下午去商店买东西。",
          prompt: "Quand va-t-il faire des courses ?",
          promptEn: "When shopping?",
          choices: ["Matin","Après-midi","Soir","Nuit"],
          correctIndex: 1,
          explanation: "下午 = après-midi.",
          explanationEn: "下午 = afternoon."
        }
      ]
    },
    {
      id: 'hsk1b-listening',
      kind: 'listening',
      title: 'Compréhension orale — série B',
      titleEn: 'Listening comprehension — series B',
      questions: [
        {
          id: 'hsk1b-l1',
          prompt: 'Écoute la phrase et choisis la bonne interprétation.',
          promptEn: 'Listen and pick the best interpretation.',
          hanzi: '我叫小王，我是学生。',
          audio: 'audio/phrases/eval-hsk1-b-1.mp3',
          choices: [
            'Il s\'appelle Xiao Wang et il est étudiant',
            'Il s\'appelle Xiao Wang et il est professeur',
            'Il s\'appelle Xiao Li et il est étudiant',
            'Il s\'appelle Xiao Wang et il travaille'
          ],
          correctIndex: 0,
          explanation: '« 我叫小王，我是学生 » = Je m\'appelle Xiao Wang, je suis étudiant.',
          explanationEn: '« 我叫小王，我是学生 » = My name is Xiao Wang, I am a student.'
        },
        {
          id: 'hsk1b-l2',
          prompt: 'Écoute et trouve l\'heure mentionnée.',
          promptEn: 'Listen and find the time mentioned.',
          hanzi: '现在是下午三点。',
          audio: 'audio/phrases/eval-hsk1-b-2.mp3',
          choices: ['Matin 3 h', 'Après-midi 3 h', 'Soir 3 h', 'Nuit 3 h'],
          correctIndex: 1,
          explanation: '下午三点 = 15 h (après-midi).',
          explanationEn: '下午三点 = 3 PM.'
        },
        {
          id: 'hsk1b-l3',
          prompt: 'Écoute et choisis ce que fait la personne.',
          promptEn: 'Listen and pick what the person is doing.',
          hanzi: '我在家看电视。',
          audio: 'audio/phrases/eval-hsk1-b-3.mp3',
          choices: [
            'Il regarde la TV à la maison',
            'Il joue dehors',
            'Il est à l\'école',
            'Il mange au restaurant'
          ],
          correctIndex: 0,
          explanation: '在家看电视 = regarder la TV à la maison.',
          explanationEn: '在家看电视 = watch TV at home.'
        },
        {
          id: 'hsk1b-l4',
          prompt: 'Écoute et identifie le jour.',
          promptEn: 'Listen and identify the day.',
          hanzi: '今天是星期五。',
          audio: 'audio/phrases/eval-hsk1-b-4.mp3',
          choices: ['Lundi', 'Mercredi', 'Vendredi', 'Dimanche'],
          correctIndex: 2,
          explanation: '星期五 = vendredi.',
          explanationEn: '星期五 = Friday.'
        },
        {
          id: 'hsk1b-l5',
          prompt: 'Écoute et dis ce que la personne veut.',
          promptEn: 'Listen and pick what the person wants.',
          hanzi: '我想喝茶。',
          audio: 'audio/phrases/eval-hsk1-b-5.mp3',
          choices: [
            'Elle veut dormir',
            'Elle veut boire du thé',
            'Elle veut manger',
            'Elle veut partir'
          ],
          correctIndex: 1,
          explanation: '想 + verbe = vouloir. 喝茶 = boire du thé.',
          explanationEn: '想 + verb = want. 喝茶 = drink tea.'
        },
        {
          id: 'hsk1b-l6',
          prompt: 'Écoute la question et choisis la réponse correspondante.',
          promptEn: 'Listen to the question and pick its likely answer.',
          hanzi: '你多大？',
          audio: 'audio/phrases/eval-hsk1-b-6.mp3',
          choices: [
            'Il/elle demande l\'âge',
            'Il/elle demande le prix',
            'Il/elle demande l\'heure',
            'Il/elle demande le nom'
          ],
          correctIndex: 0,
          explanation: '你多大 ? = Quel âge as-tu ? (formule HSK 1).',
          explanationEn: '你多大 ? = How old are you? (HSK 1 staple).'
        },
        {
          id: 'hsk1b-l7',
          prompt: "Écoute et choisis le sens.",
          promptEn: "Listen and pick the meaning.",
          hanzi: "我的生日是五月十号。",
          audio: "audio/phrases/eval-hsk1-b-7.mp3",
          choices: ["Le 10 mai est son anniv","Le 5 octobre est son anniv","Le 10 mars","Le 5 mai"],
          correctIndex: 0,
          explanation: "五月十号 = 10 mai.",
          explanationEn: "May 10."
        },
        {
          id: 'hsk1b-l8',
          prompt: "Écoute et choisis le sens.",
          promptEn: "Listen and pick the meaning.",
          hanzi: "我妈妈是老师。",
          audio: "audio/phrases/eval-hsk1-b-8.mp3",
          choices: ["Maman est prof","Papa est prof","Maman est médecin","Sœur est prof"],
          correctIndex: 0,
          explanation: "妈妈是老师 = maman est prof.",
          explanationEn: "Mom is a teacher."
        },
        {
          id: 'hsk1b-l9',
          prompt: "Écoute et indique le sens.",
          promptEn: "Listen and pick the meaning.",
          hanzi: "我不想去学校。",
          audio: "audio/phrases/eval-hsk1-b-9.mp3",
          choices: ["Il veut aller à l'école","Il ne veut pas aller à l'école","Il aime l'école","Il est à l'école"],
          correctIndex: 1,
          explanation: "不想去 = ne veut pas y aller.",
          explanationEn: "Doesn't want to go."
        },
        {
          id: 'hsk1b-l10',
          prompt: "Écoute et choisis le sens.",
          promptEn: "Listen and pick the meaning.",
          hanzi: "请坐，喝茶。",
          audio: "audio/phrases/eval-hsk1-b-10.mp3",
          choices: ["Asseyez-vous, buvez du thé","Levez-vous","Partez maintenant","Mangez du riz"],
          correctIndex: 0,
          explanation: "请坐，喝茶 = invitation polie.",
          explanationEn: "Polite invitation."
        }
      ]
    }
  ]
};

// ============================================================================
//  HSK 2 — Série B — « Quotidien enrichi »
// ============================================================================
export const HSK2_MOCK_B: EvaluationV2Config = {
  id: 'mock-hsk2-b',
  level: 'hsk2',
  title: 'Mock HSK 2 · Série B — Quotidien+',
  titleEn: 'Mock HSK 2 · Series B — Daily+',
  subtitle:
    '24 questions, 14 minutes. Entraînement soutenu sur verbes modaux, 离…远/近, 因为…所以.',
  subtitleEn:
    '24 questions, 14 minutes. Intensive drill on modals, 离…远/近, 因为…所以.',
  durationSeconds: 14 * 60,
  passingPercent: 60,
  xpReward: 180,
  sections: [
    {
      id: 'hsk2b-vocab',
      kind: 'vocabulary',
      title: 'Vocabulaire HSK 2 — série B',
      titleEn: 'HSK 2 vocabulary — series B',
      questions: [
        {
          id: 'hsk2b-v1',
          prompt: 'Que signifie 机场 ?',
          promptEn: 'What does 机场 mean?',
          choices: ['Gare', 'Aéroport', 'Port', 'Parking'],
          correctIndex: 1,
          explanation: '机场 (jī chǎng) = aéroport. 飞机 = avion.',
          explanationEn: '机场 (jī chǎng) = airport. 飞机 = plane.'
        },
        {
          id: 'hsk2b-v2',
          prompt: 'Quel verbe signifie « aider » ?',
          promptEn: 'Which verb means "to help"?',
          choices: ['帮助', '准备', '介绍', '认识'],
          correctIndex: 0,
          explanation: '帮助 (bāng zhù) = aider. 帮 tout court est plus informel.',
          explanationEn: '帮助 (bāng zhù) = help. 帮 alone is more informal.'
        },
        {
          id: 'hsk2b-v3',
          prompt: 'Que signifie 旁边 ?',
          promptEn: 'What does 旁边 mean?',
          choices: ['Devant', 'Derrière', 'À côté de', 'Entre'],
          correctIndex: 2,
          explanation: '旁边 (páng biān) = à côté.',
          explanationEn: '旁边 (páng biān) = next to.'
        },
        {
          id: 'hsk2b-v4',
          prompt: 'Lequel désigne une partie du corps ?',
          promptEn: 'Which one is a body part?',
          choices: ['手', '笔', '门', '船'],
          correctIndex: 0,
          explanation: '手 (shǒu) = main.',
          explanationEn: '手 (shǒu) = hand.'
        },
        {
          id: 'hsk2b-v5',
          prompt: 'Que signifie 希望 ?',
          promptEn: 'What does 希望 mean?',
          choices: ['Craindre', 'Espérer, souhaiter', 'Détester', 'Oublier'],
          correctIndex: 1,
          explanation: '希望 (xī wàng) = espérer. 我希望 + phrase.',
          explanationEn: '希望 (xī wàng) = hope. 我希望 + clause.'
        },
        {
          id: 'hsk2b-v6',
          prompt: 'Lequel exprime une émotion positive ?',
          promptEn: 'Which one expresses a positive feeling?',
          choices: ['生气', '难过', '高兴', '害怕'],
          correctIndex: 2,
          explanation: '高兴 (gāo xìng) = content. 生气 = en colère, 难过 = triste.',
          explanationEn: '高兴 (gāo xìng) = happy. 生气 = angry, 难过 = sad.'
        },
        {
          id: 'hsk2b-v7',
          prompt: "Que signifie 认识 ?",
          promptEn: "What does 认识 mean?",
          choices: ["Savoir (fait)","Connaître (personne/lieu)","Oublier","Apprendre"],
          correctIndex: 1,
          explanation: "认识 = connaître qqn/qqch.",
          explanationEn: "认识 = know/recognize."
        },
        {
          id: 'hsk2b-v8',
          prompt: "Que signifie 参加 ?",
          promptEn: "What does 参加 mean?",
          choices: ["Participer à","Quitter","Écouter","Apprendre"],
          correctIndex: 0,
          explanation: "参加 = participer.",
          explanationEn: "参加 = participate."
        },
        {
          id: 'hsk2b-v9',
          prompt: "Que signifie 完成 ?",
          promptEn: "What does 完成 mean?",
          choices: ["Commencer","Terminer, achever","Répéter","Corriger"],
          correctIndex: 1,
          explanation: "完成 = achever.",
          explanationEn: "完成 = complete."
        },
        {
          id: 'hsk2b-v10',
          prompt: "Que signifie 准备 ?",
          promptEn: "What does 准备 mean?",
          choices: ["Préparer","Refuser","Oublier","Rejeter"],
          correctIndex: 0,
          explanation: "准备 = préparer.",
          explanationEn: "准备 = prepare."
        }
      ]
    },
    {
      id: 'hsk2b-grammar',
      kind: 'grammar',
      title: 'Structures HSK 2 — série B',
      titleEn: 'HSK 2 structures — series B',
      questions: [
        {
          id: 'hsk2b-g1',
          prompt: 'Complète : 他 ___ 你帮忙。',
          promptEn: 'Fill in: 他 ___ 你帮忙。',
          choices: ['会', '让', '给', '从'],
          correctIndex: 1,
          explanation: '让 + personne + verbe = faire en sorte que qqn ... « Il te laisse / demande de l\'aider ».',
          explanationEn: '让 + person + verb = have someone do sth. "He lets / asks you to help".'
        },
        {
          id: 'hsk2b-g2',
          prompt: 'Complète : 我家 ___ 学校很近。',
          promptEn: 'Fill in: 我家 ___ 学校很近。',
          choices: ['从', '比', '离', '和'],
          correctIndex: 2,
          explanation: 'A 离 B 近/远 = A est proche/loin de B (distance statique).',
          explanationEn: 'A 离 B 近/远 = A is near/far from B (static distance).'
        },
        {
          id: 'hsk2b-g3',
          prompt: 'Complète : ___ 下雨了，___ 我没去。',
          promptEn: 'Fill in: ___ 下雨了，___ 我没去。',
          choices: ['因为…所以', '虽然…但是', '如果…就', '不但…而且'],
          correctIndex: 0,
          explanation: '因为…所以 = parce que... donc. « Il a plu donc je n\'y suis pas allé ».',
          explanationEn: '因为…所以 = because... so. "It rained so I didn\'t go".'
        },
        {
          id: 'hsk2b-g4',
          prompt: 'Complète : 我 ___ 过长城。',
          promptEn: 'Fill in: 我 ___ 过长城。',
          choices: ['去', '着', '了', '在'],
          correctIndex: 0,
          explanation: '过 marque une expérience vécue ; le verbe reste avant. « Je suis déjà allé à la Grande Muraille ».',
          explanationEn: '过 marks lived experience; the verb precedes it. "I\'ve been to the Great Wall".'
        },
        {
          id: 'hsk2b-g5',
          prompt: 'Complète : 这是 ___ 漂亮的花！',
          promptEn: 'Fill in: 这是 ___ 漂亮的花！',
          choices: ['多么', '怎么', '什么', '哪里'],
          correctIndex: 0,
          explanation: '多么 + adj + 啊 = exclamation « comme c\'est... ».',
          explanationEn: '多么 + adj + 啊 = exclamation "how ...!"'
        },
        {
          id: 'hsk2b-g6',
          prompt: 'Complète : 请 ___ 我打电话。',
          promptEn: 'Fill in: 请 ___ 我打电话。',
          choices: ['给', '到', '和', '以'],
          correctIndex: 0,
          explanation: '给 + destinataire + verbe. « S\'il te plaît, appelle-moi ».',
          explanationEn: '给 + recipient + verb. "Please, call me".'
        },
        {
          id: 'hsk2b-g7',
          prompt: "Complète : 我 ___ 着急呢！",
          promptEn: "Fill in: 我 ___ 着急呢！",
          choices: ["正在","已经","一点","刚才"],
          correctIndex: 0,
          explanation: "正在…呢 = en train de.",
          explanationEn: "正在…呢 = in the middle of."
        },
        {
          id: 'hsk2b-g8',
          prompt: "Complète : 他 ___ 我， ___ 我的朋友。",
          promptEn: "Fill in: 他 ___ 我， ___ 我的朋友。",
          choices: ["认识…是","知道…是","看…是","听…是"],
          correctIndex: 0,
          explanation: "认识 = connaître (personne).",
          explanationEn: "认识 = know (person)."
        },
        {
          id: 'hsk2b-g9',
          prompt: "Complète : 我 ___ 你一本书。",
          promptEn: "Fill in: 我 ___ 你一本书。",
          choices: ["送给","给","送","寄"],
          correctIndex: 0,
          explanation: "送给 = offrir à.",
          explanationEn: "送给 = give (as gift)."
        },
        {
          id: 'hsk2b-g10',
          prompt: "Complète : 你 ___ 来， ___ 打电话。",
          promptEn: "Fill in: 你 ___ 来， ___ 打电话。",
          choices: ["不…就","要…就","别…就","没…就"],
          correctIndex: 0,
          explanation: "不...就 = si pas... alors.",
          explanationEn: "不…就 = if not... then."
        }
      ]
    },
    {
      id: 'hsk2b-reading',
      kind: 'reading',
      title: 'Compréhension écrite — série B',
      titleEn: 'Reading comprehension — series B',
      questions: [
        {
          id: 'hsk2b-r1',
          context: '小李去年开始学汉语。现在他可以和中国朋友说话了。',
          contextEn: '小李去年开始学汉语。现在他可以和中国朋友说话了。',
          prompt: 'Que peut faire Xiao Li maintenant ?',
          promptEn: 'What can Xiao Li do now?',
          choices: [
            'Écrire des articles en chinois',
            'Parler avec des amis chinois',
            'Enseigner le chinois',
            'Traduire des films'
          ],
          correctIndex: 1,
          explanation: '可以和中国朋友说话 = il peut discuter avec des amis chinois.',
          explanationEn: '可以和中国朋友说话 = he can chat with Chinese friends.'
        },
        {
          id: 'hsk2b-r2',
          context: '昨天天气不好，下雨了。所以我们没去公园。',
          contextEn: '昨天天气不好，下雨了。所以我们没去公园。',
          prompt: 'Pourquoi ne sont-ils pas allés au parc ?',
          promptEn: 'Why didn\'t they go to the park?',
          choices: [
            'Il faisait trop chaud',
            'Il pleuvait',
            'Ils étaient malades',
            'Ils n\'avaient pas le temps'
          ],
          correctIndex: 1,
          explanation: '下雨了 = il a plu. 所以 = donc.',
          explanationEn: '下雨了 = it rained. 所以 = so.'
        },
        {
          id: 'hsk2b-r3',
          context: '我的新手机很贵，但是非常好用。',
          contextEn: '我的新手机很贵，但是非常好用。',
          prompt: 'Que pense la personne de son téléphone ?',
          promptEn: 'What does the person think of her phone?',
          choices: [
            'Cher mais inefficace',
            'Cher mais très pratique',
            'Bon marché et pratique',
            'Bon marché mais inutile'
          ],
          correctIndex: 1,
          explanation: '贵 = cher, 但是 = mais, 好用 = pratique.',
          explanationEn: '贵 = expensive, 但是 = but, 好用 = handy.'
        },
        {
          id: 'hsk2b-r4',
          context: '如果你明天有时间，我们一起去看电影。',
          contextEn: '如果你明天有时间，我们一起去看电影。',
          prompt: 'Que propose la personne ?',
          promptEn: 'What does the person suggest?',
          choices: [
            'Aller au cinéma demain si libre',
            'Travailler ensemble',
            'Rester à la maison',
            'Manger au restaurant'
          ],
          correctIndex: 0,
          explanation: '如果…就 = si... alors. 看电影 = voir un film.',
          explanationEn: '如果…就 = if... then. 看电影 = watch a movie.'
        },
        {
          id: 'hsk2b-r5',
          context: '小王每天早上六点起床，然后去跑步。',
          contextEn: '小王每天早上六点起床，然后去跑步。',
          prompt: 'Quelle est la routine matinale de Xiao Wang ?',
          promptEn: 'What is Xiao Wang\'s morning routine?',
          choices: [
            'Il lit le journal',
            'Il se lève à 6h puis court',
            'Il prépare le petit-déjeuner',
            'Il regarde la TV'
          ],
          correctIndex: 1,
          explanation: '六点起床 = lever à 6 h, 跑步 = courir.',
          explanationEn: '六点起床 = get up at 6, 跑步 = run.'
        },
        {
          id: 'hsk2b-r6',
          context: '这家饭店的菜不但好吃，而且不贵。',
          contextEn: '这家饭店的菜不但好吃，而且不贵。',
          prompt: 'Que pense-t-on du restaurant ?',
          promptEn: 'What do we think of the restaurant?',
          choices: [
            'Bon mais cher',
            'Cher et mauvais',
            'Bon et pas cher',
            'Bon marché mais mauvais'
          ],
          correctIndex: 2,
          explanation: '不但…而且 = non seulement... mais aussi. 好吃 et 不贵.',
          explanationEn: '不但…而且 = not only... but also. Tasty AND cheap.'
        },
        {
          id: 'hsk2b-r7',
          context: "我今天坐飞机去上海开会。",
          contextEn: "我今天坐飞机去上海开会。",
          prompt: "Pourquoi va-t-il à Shanghai ?",
          promptEn: "Why Shanghai?",
          choices: ["Vacances","Réunion","Études","Famille"],
          correctIndex: 1,
          explanation: "开会 = tenir une réunion.",
          explanationEn: "开会 = meeting."
        },
        {
          id: 'hsk2b-r8',
          context: "今天我很累，想早点儿回家。",
          contextEn: "今天我很累，想早点儿回家。",
          prompt: "Que veut-il faire ?",
          promptEn: "What does he want?",
          choices: ["Travailler plus","Rentrer tôt","Sortir avec amis","Dîner dehors"],
          correctIndex: 1,
          explanation: "早点儿回家.",
          explanationEn: "Go home early."
        },
        {
          id: 'hsk2b-r9',
          context: "我妹妹正在准备明天的考试。",
          contextEn: "我妹妹正在准备明天的考试。",
          prompt: "Que fait la petite sœur ?",
          promptEn: "Little sister's activity?",
          choices: ["Elle dort","Elle révise","Elle chante","Elle cuisine"],
          correctIndex: 1,
          explanation: "准备考试 = réviser pour un examen.",
          explanationEn: "Studying for exam."
        },
        {
          id: 'hsk2b-r10',
          context: "这个地方的风景很美。",
          contextEn: "这个地方的风景很美。",
          prompt: "Que dit-on du lieu ?",
          promptEn: "What about the place?",
          choices: ["Beau paysage","Ennuyeux","Cher","Bruyant"],
          correctIndex: 0,
          explanation: "风景很美 = beau paysage.",
          explanationEn: "Beautiful scenery."
        }
      ]
    },
    {
      id: 'hsk2b-listening',
      kind: 'listening',
      title: 'Compréhension orale — série B',
      titleEn: 'Listening comprehension — series B',
      questions: [
        {
          id: 'hsk2b-l1',
          prompt: 'Écoute et identifie le moyen de transport.',
          promptEn: 'Listen and identify the transport.',
          hanzi: '我每天坐地铁上班。',
          audio: 'audio/phrases/eval-hsk2-b-1.mp3',
          choices: ['Bus', 'Métro', 'Vélo', 'Voiture'],
          correctIndex: 1,
          explanation: '坐地铁 = prendre le métro. 上班 = aller travailler.',
          explanationEn: '坐地铁 = take the subway. 上班 = go to work.'
        },
        {
          id: 'hsk2b-l2',
          prompt: 'Écoute et dis ce qu\'elle achète.',
          promptEn: 'Listen and pick what she is buying.',
          hanzi: '我想买一件红色的衣服。',
          audio: 'audio/phrases/eval-hsk2-b-2.mp3',
          choices: [
            'Un pantalon noir',
            'Un vêtement rouge',
            'Des chaussures blanches',
            'Un sac'
          ],
          correctIndex: 1,
          explanation: '一件红色的衣服 = un vêtement rouge.',
          explanationEn: '一件红色的衣服 = a red piece of clothing.'
        },
        {
          id: 'hsk2b-l3',
          prompt: 'Écoute et choisis l\'heure.',
          promptEn: 'Listen and pick the time.',
          hanzi: '现在是晚上八点半。',
          audio: 'audio/phrases/eval-hsk2-b-3.mp3',
          choices: ['8 h 30 du matin', '8 h 30 du soir', '18 h 30', '20 h 15'],
          correctIndex: 1,
          explanation: '晚上八点半 = 20 h 30 (huit heures et demie du soir).',
          explanationEn: '晚上八点半 = 8:30 PM.'
        },
        {
          id: 'hsk2b-l4',
          prompt: 'Écoute et indique la météo.',
          promptEn: 'Listen and identify the weather.',
          hanzi: '今天下雨了，你带伞吗？',
          audio: 'audio/phrases/eval-hsk2-b-4.mp3',
          choices: [
            'Beau temps, pas de parapluie',
            'Il pleut, on demande si parapluie',
            'Vent fort',
            'Neige'
          ],
          correctIndex: 1,
          explanation: '下雨了 = il pleut. 带伞吗 ? = as-tu pris un parapluie ?',
          explanationEn: '下雨了 = it\'s raining. 带伞吗 ? = did you bring an umbrella?'
        },
        {
          id: 'hsk2b-l5',
          prompt: 'Écoute et devine le sentiment.',
          promptEn: 'Listen and guess the feeling.',
          hanzi: '考试通过了，我很高兴！',
          audio: 'audio/phrases/eval-hsk2-b-5.mp3',
          choices: ['Triste', 'Fatigué', 'Content', 'En colère'],
          correctIndex: 2,
          explanation: '考试通过 = examen réussi. 高兴 = content.',
          explanationEn: 'Exam passed. 高兴 = happy.'
        },
        {
          id: 'hsk2b-l6',
          prompt: 'Écoute et choisis la bonne réponse.',
          promptEn: 'Listen and pick the right answer.',
          hanzi: '请问，这附近有银行吗？',
          audio: 'audio/phrases/eval-hsk2-b-6.mp3',
          choices: [
            'Demande s\'il y a une banque à côté',
            'Demande où est l\'école',
            'Demande l\'heure',
            'Demande un numéro'
          ],
          correctIndex: 0,
          explanation: '请问 = excusez-moi. 附近 = à proximité. 银行 = banque.',
          explanationEn: '请问 = excuse me. 附近 = nearby. 银行 = bank.'
        },
        {
          id: 'hsk2b-l7',
          prompt: "Écoute et choisis.",
          promptEn: "Listen and pick.",
          hanzi: "我姐姐在医院工作。",
          audio: "audio/phrases/eval-hsk2-b-7.mp3",
          choices: ["Grande sœur travaille à l'hôpital","Elle étudie à l'hôpital","Elle est malade","Elle rend visite à un ami"],
          correctIndex: 0,
          explanation: "在医院工作 = travaille à l'hôpital.",
          explanationEn: "Works at a hospital."
        },
        {
          id: 'hsk2b-l8',
          prompt: "Écoute et trouve la décision.",
          promptEn: "Listen and find the decision.",
          hanzi: "我打算下个月去旅游。",
          audio: "audio/phrases/eval-hsk2-b-8.mp3",
          choices: ["Voyage prévu le mois prochain","Cesser les voyages","Voyager cette semaine","Rester chez soi"],
          correctIndex: 0,
          explanation: "打算 + 下个月 + 旅游.",
          explanationEn: "Plans to travel next month."
        },
        {
          id: 'hsk2b-l9',
          prompt: "Écoute et choisis le sens.",
          promptEn: "Listen and pick the meaning.",
          hanzi: "这个房间太小了。",
          audio: "audio/phrases/eval-hsk2-b-9.mp3",
          choices: ["La chambre est trop petite","La chambre est grande","La chambre est propre","La chambre est sombre"],
          correctIndex: 0,
          explanation: "太小了 = trop petit.",
          explanationEn: "Too small."
        },
        {
          id: 'hsk2b-l10',
          prompt: "Écoute et identifie l'action.",
          promptEn: "Listen and identify the action.",
          hanzi: "你可以帮我一下吗？",
          audio: "audio/phrases/eval-hsk2-b-10.mp3",
          choices: ["Il demande de l'aide","Il refuse de l'aide","Il salue","Il remercie"],
          correctIndex: 0,
          explanation: "帮我一下 = m'aider un peu.",
          explanationEn: "Asking for help."
        }
      ]
    }
  ]
};

// ============================================================================
//  HSK 3 — Série B — « Nuancer ses idées »
// ============================================================================
export const HSK3_MOCK_B: EvaluationV2Config = {
  id: 'mock-hsk3-b',
  level: 'hsk3',
  title: 'Mock HSK 3 · Série B — Nuances',
  titleEn: 'Mock HSK 3 · Series B — Nuances',
  subtitle:
    '24 questions, 16 minutes. Focus : 把, complément de résultat, 一边…一边, 虽然…但是.',
  subtitleEn:
    '24 questions, 16 minutes. Focus: 把, result complement, 一边…一边, 虽然…但是.',
  durationSeconds: 16 * 60,
  passingPercent: 60,
  xpReward: 200,
  sections: [
    {
      id: 'hsk3b-vocab',
      kind: 'vocabulary',
      title: 'Vocabulaire HSK 3 — série B',
      titleEn: 'HSK 3 vocabulary — series B',
      questions: [
        {
          id: 'hsk3b-v1',
          prompt: 'Que signifie 锻炼 ?',
          promptEn: 'What does 锻炼 mean?',
          choices: ['Se reposer', 'S\'entraîner / faire de l\'exercice', 'Cuisiner', 'Voyager'],
          correctIndex: 1,
          explanation: '锻炼 (duàn liàn) = faire de l\'exercice, s\'entraîner.',
          explanationEn: '锻炼 (duàn liàn) = exercise, train.'
        },
        {
          id: 'hsk3b-v2',
          prompt: 'Quel mot signifie « habitude » ?',
          promptEn: 'Which word means "habit"?',
          choices: ['习惯', '关心', '愿意', '办法'],
          correctIndex: 0,
          explanation: '习惯 (xí guàn) = habitude ; 我习惯了 = j\'y suis habitué.',
          explanationEn: '习惯 (xí guàn) = habit; 我习惯了 = I\'m used to it.'
        },
        {
          id: 'hsk3b-v3',
          prompt: 'Que signifie 认为 ?',
          promptEn: 'What does 认为 mean?',
          choices: ['Oublier', 'Penser / considérer que', 'Regretter', 'Imaginer'],
          correctIndex: 1,
          explanation: '认为 (rèn wéi) = considérer, estimer. 我认为 + phrase.',
          explanationEn: '认为 (rèn wéi) = consider, hold the view. 我认为 + clause.'
        },
        {
          id: 'hsk3b-v4',
          prompt: 'Lequel désigne un sentiment négatif ?',
          promptEn: 'Which expresses a negative feeling?',
          choices: ['满意', '舒服', '着急', '高兴'],
          correctIndex: 2,
          explanation: '着急 (zháo jí) = anxieux, pressé.',
          explanationEn: '着急 (zháo jí) = anxious, in a hurry.'
        },
        {
          id: 'hsk3b-v5',
          prompt: 'Que signifie 结束 ?',
          promptEn: 'What does 结束 mean?',
          choices: ['Commencer', 'Se terminer / finir', 'Recommencer', 'Prolonger'],
          correctIndex: 1,
          explanation: '结束 (jié shù) = finir, clore.',
          explanationEn: '结束 (jié shù) = end, conclude.'
        },
        {
          id: 'hsk3b-v6',
          prompt: 'Lequel désigne un animal ?',
          promptEn: 'Which one is an animal?',
          choices: ['熊猫', '铅笔', '校长', '椅子'],
          correctIndex: 0,
          explanation: '熊猫 (xióng māo) = panda.',
          explanationEn: '熊猫 (xióng māo) = panda.'
        },
        {
          id: 'hsk3b-v7',
          prompt: "Que signifie 接受 ?",
          promptEn: "What does 接受 mean?",
          choices: ["Rejeter","Accepter, recevoir","Envoyer","Refuser"],
          correctIndex: 1,
          explanation: "接受 = accepter.",
          explanationEn: "接受 = accept."
        },
        {
          id: 'hsk3b-v8',
          prompt: "Que signifie 提醒 ?",
          promptEn: "What does 提醒 mean?",
          choices: ["Rappeler à qqn","Cacher","Oublier","Réveiller"],
          correctIndex: 0,
          explanation: "提醒 = rappeler à qqn.",
          explanationEn: "提醒 = remind."
        },
        {
          id: 'hsk3b-v9',
          prompt: "Que signifie 拒绝 ?",
          promptEn: "What does 拒绝 mean?",
          choices: ["Refuser","Accepter","Hésiter","Réfléchir"],
          correctIndex: 0,
          explanation: "拒绝 = refuser.",
          explanationEn: "拒绝 = refuse."
        },
        {
          id: 'hsk3b-v10',
          prompt: "Que signifie 表演 ?",
          promptEn: "What does 表演 mean?",
          choices: ["Performance, spectacle","Étude","Recherche","Écriture"],
          correctIndex: 0,
          explanation: "表演 = spectacle, performance.",
          explanationEn: "表演 = performance."
        }
      ]
    },
    {
      id: 'hsk3b-grammar',
      kind: 'grammar',
      title: 'Structures HSK 3 — série B',
      titleEn: 'HSK 3 structures — series B',
      questions: [
        {
          id: 'hsk3b-g1',
          prompt: 'Complète : 我 ___ 作业做完了。',
          promptEn: 'Fill in: 我 ___ 作业做完了。',
          choices: ['把', '被', '比', '让'],
          correctIndex: 0,
          explanation: '把 + objet + verbe + résultat : « J\'ai fini mes devoirs » en insistant sur l\'objet.',
          explanationEn: '把 + object + verb + result: emphasizes the object being fully acted upon.'
        },
        {
          id: 'hsk3b-g2',
          prompt: 'Complète : 他一边走路 ___ 听音乐。',
          promptEn: 'Fill in: 他一边走路 ___ 听音乐。',
          choices: ['一边', '一点', '一起', '一直'],
          correctIndex: 0,
          explanation: '一边…一边 = faire A en même temps que B.',
          explanationEn: '一边…一边 = do A while doing B.'
        },
        {
          id: 'hsk3b-g3',
          prompt: 'Complète : 虽然很累， ___ 我很开心。',
          promptEn: 'Fill in: 虽然很累， ___ 我很开心。',
          choices: ['可是', '所以', '就', '才'],
          correctIndex: 0,
          explanation: '虽然…可是/但是 = bien que... néanmoins.',
          explanationEn: '虽然…可是/但是 = although... yet.'
        },
        {
          id: 'hsk3b-g4',
          prompt: 'Complète : 你 ___ 这个词翻译成法语。',
          promptEn: 'Fill in: 你 ___ 这个词翻译成法语。',
          choices: ['把', '从', '给', '像'],
          correctIndex: 0,
          explanation: '把 + X + 翻译成 Y = traduire X en Y.',
          explanationEn: '把 + X + 翻译成 Y = translate X into Y.'
        },
        {
          id: 'hsk3b-g5',
          prompt: 'Complète : 孩子们都 ___ 了，去睡觉吧。',
          promptEn: 'Fill in: 孩子们都 ___ 了，去睡觉吧。',
          choices: ['累', '累死', '累得', '累过'],
          correctIndex: 0,
          explanation: 'Ici accent sur l\'état actuel : 累了 = fatigués (changement d\'état).',
          explanationEn: 'Here focus on current state: 累了 = (have become) tired.'
        },
        {
          id: 'hsk3b-g6',
          prompt: 'Complète : 这个问题我 ___ 清楚。',
          promptEn: 'Fill in: 这个问题我 ___ 清楚。',
          choices: ['听得', '听不', '不听', '没有'],
          correctIndex: 1,
          explanation: '听不清楚 = ne peut pas entendre clairement (complément potentiel négatif).',
          explanationEn: '听不清楚 = can\'t hear clearly (negative potential complement).'
        },
        {
          id: 'hsk3b-g7',
          prompt: "Complète : 他 ___ 比我 ___ 得多。",
          promptEn: "Fill in: 他 ___ 比我 ___ 得多。",
          choices: ["跑…快","走…慢","吃…多","看…少"],
          correctIndex: 0,
          explanation: "A 比 B + V + 得多 = bien plus...",
          explanationEn: "A 比 B + V + 得多 = far more."
        },
        {
          id: 'hsk3b-g8',
          prompt: "Complète : 我 ___ 同学们一起复习。",
          promptEn: "Fill in: 我 ___ 同学们一起复习。",
          choices: ["和","是","都","只"],
          correctIndex: 0,
          explanation: "和...一起 = avec.",
          explanationEn: "和...一起 = together with."
        },
        {
          id: 'hsk3b-g9',
          prompt: "Complète : 别担心， ___ 我来处理。",
          promptEn: "Fill in: 别担心， ___ 我来处理。",
          choices: ["让","把","被","叫"],
          correctIndex: 0,
          explanation: "让 + me 来 + V = laisse-moi faire.",
          explanationEn: "让 + me 来 + V = let me handle."
        },
        {
          id: 'hsk3b-g10',
          prompt: "Complète : 我 ___ 你的帮助， ___ 很感谢。",
          promptEn: "Fill in: 我 ___ 你的帮助， ___ 很感谢。",
          choices: ["对…感到","把…感到","让…感到","被…感到"],
          correctIndex: 0,
          explanation: "对...感到 = se sentir... à propos de.",
          explanationEn: "对...感到 = feel ... about."
        }
      ]
    },
    {
      id: 'hsk3b-reading',
      kind: 'reading',
      title: 'Compréhension écrite — série B',
      titleEn: 'Reading comprehension — series B',
      questions: [
        {
          id: 'hsk3b-r1',
          context:
            '上个月我搬家了。新家离地铁站很近，走五分钟就到。周围还有很多饭店。',
          contextEn:
            '上个月我搬家了。新家离地铁站很近，走五分钟就到。周围还有很多饭店。',
          prompt: 'Qu\'apprend-on sur le nouveau logement ?',
          promptEn: 'What do we learn about the new place?',
          choices: [
            'Loin du métro, peu de restos',
            'Près du métro, beaucoup de restos',
            'Grand mais bruyant',
            'Très cher et mal situé'
          ],
          correctIndex: 1,
          explanation: '离地铁站很近 + 很多饭店 = proche du métro et entouré de restaurants.',
          explanationEn: 'Close to the subway + lots of restaurants around.'
        },
        {
          id: 'hsk3b-r2',
          context:
            '我姐姐喜欢做饭，做得又快又好吃。周末家里经常请朋友来吃饭。',
          contextEn:
            '我姐姐喜欢做饭，做得又快又好吃。周末家里经常请朋友来吃饭。',
          prompt: 'Que fait souvent la famille le week-end ?',
          promptEn: 'What does the family often do on weekends?',
          choices: [
            'Ils voyagent',
            'Ils invitent des amis à dîner',
            'Ils font les courses',
            'Ils vont au cinéma'
          ],
          correctIndex: 1,
          explanation: '请朋友来吃饭 = inviter des amis à manger.',
          explanationEn: '请朋友来吃饭 = invite friends for a meal.'
        },
        {
          id: 'hsk3b-r3',
          context:
            '小张今年打算去中国留学。他已经开始学习汉语三年了，但是口语还不太好。',
          contextEn:
            '小张今年打算去中国留学。他已经开始学习汉语三年了，但是口语还不太好。',
          prompt: 'Quel est le point faible de Xiao Zhang ?',
          promptEn: 'What is Xiao Zhang\'s weak point?',
          choices: [
            'La lecture',
            'L\'écriture',
            'L\'oral',
            'La grammaire'
          ],
          correctIndex: 2,
          explanation: '口语还不太好 = son expression orale n\'est pas encore très bonne.',
          explanationEn: '口语还不太好 = his spoken skill isn\'t great yet.'
        },
        {
          id: 'hsk3b-r4',
          context:
            '这家咖啡店的咖啡不错，价格也不贵，就是人太多了，经常没有座位。',
          contextEn:
            '这家咖啡店的咖啡不错，价格也不贵，就是人太多了，经常没有座位。',
          prompt: 'Quel est l\'inconvénient du café ?',
          promptEn: 'What is the downside of the café?',
          choices: [
            'Mauvaise qualité',
            'Trop cher',
            'Trop de monde, souvent plein',
            'Trop loin'
          ],
          correctIndex: 2,
          explanation: '人太多了，经常没有座位 = trop de monde, souvent pas de place.',
          explanationEn: 'Too many people, often no seats.'
        },
        {
          id: 'hsk3b-r5',
          context:
            '明天我要参加一个重要的会议。今天晚上我得把材料准备好，早点儿睡觉。',
          contextEn:
            '明天我要参加一个重要的会议。今天晚上我得把材料准备好，早点儿睡觉。',
          prompt: 'Que prévoit de faire la personne ce soir ?',
          promptEn: 'What does the person plan for tonight?',
          choices: [
            'Sortir avec des amis',
            'Préparer ses documents et se coucher tôt',
            'Regarder un film',
            'Aller au bureau'
          ],
          correctIndex: 1,
          explanation: '把材料准备好 + 早点儿睡觉 = préparer les docs puis dormir tôt.',
          explanationEn: 'Prepare documents + sleep early.'
        },
        {
          id: 'hsk3b-r6',
          context:
            '我以前不喜欢运动，现在我每个星期都去三次健身房，感觉身体越来越好。',
          contextEn:
            '我以前不喜欢运动，现在我每个星期都去三次健身房，感觉身体越来越好。',
          prompt: 'Qu\'est-ce qui a changé ?',
          promptEn: 'What has changed?',
          choices: [
            'Elle mange plus sainement',
            'Elle fait du sport régulièrement et va mieux',
            'Elle dort plus',
            'Elle a arrêté le sport'
          ],
          correctIndex: 1,
          explanation: '三次健身房 = 3 fois/semaine salle. 越来越好 = de mieux en mieux.',
          explanationEn: '3 gym sessions a week + feeling better and better.'
        },
        {
          id: 'hsk3b-r7',
          context: "我最喜欢的季节是春天，因为天气不冷不热。",
          contextEn: "我最喜欢的季节是春天，因为天气不冷不热。",
          prompt: "Pourquoi aime-t-il le printemps ?",
          promptEn: "Why spring?",
          choices: ["Il fait chaud","Ni froid ni chaud","Les fleurs","Les vacances"],
          correctIndex: 1,
          explanation: "不冷不热 = ni froid ni chaud.",
          explanationEn: "Neither cold nor hot."
        },
        {
          id: 'hsk3b-r8',
          context: "这家店的衣服质量不错，价格也不贵。",
          contextEn: "这家店的衣服质量不错，价格也不贵。",
          prompt: "Que dit-on du magasin ?",
          promptEn: "What about the shop?",
          choices: ["Qualité + prix OK","Cher","Mauvaise qualité","Fermé"],
          correctIndex: 0,
          explanation: "质量不错 + 价格不贵.",
          explanationEn: "Good quality + cheap."
        },
        {
          id: 'hsk3b-r9',
          context: "儿童应该多运动，少看手机。",
          contextEn: "儿童应该多运动，少看手机。",
          prompt: "Quel conseil pour les enfants ?",
          promptEn: "Advice for kids?",
          choices: ["Plus d'écrans","Plus de sport, moins d'écrans","Dormir plus","Étudier plus"],
          correctIndex: 1,
          explanation: "多运动，少看手机.",
          explanationEn: "More sport, less phone."
        },
        {
          id: 'hsk3b-r10',
          context: "如果你有问题，可以随时给我打电话。",
          contextEn: "如果你有问题，可以随时给我打电话。",
          prompt: "Que propose la personne ?",
          promptEn: "What is offered?",
          choices: ["Appeler à tout moment","Envoyer un mail","Venir en personne","Oublier le problème"],
          correctIndex: 0,
          explanation: "随时打电话 = appeler à tout moment.",
          explanationEn: "Call anytime."
        }
      ]
    },
    {
      id: 'hsk3b-listening',
      kind: 'listening',
      title: 'Compréhension orale — série B',
      titleEn: 'Listening comprehension — series B',
      questions: [
        {
          id: 'hsk3b-l1',
          prompt: 'Écoute et choisis l\'activité mentionnée.',
          promptEn: 'Listen and pick the activity mentioned.',
          hanzi: '周末我打算去爬山。',
          audio: 'audio/phrases/eval-hsk3-b-1.mp3',
          choices: [
            'Aller à la piscine',
            'Faire de la randonnée / monter la montagne',
            'Rester à la maison',
            'Aller au cinéma'
          ],
          correctIndex: 1,
          explanation: '爬山 = monter la montagne, randonnée.',
          explanationEn: '爬山 = hike / climb a mountain.'
        },
        {
          id: 'hsk3b-l2',
          prompt: 'Écoute et trouve la cause.',
          promptEn: 'Listen and find the reason.',
          hanzi: '因为下雨，所以我们不去公园了。',
          audio: 'audio/phrases/eval-hsk3-b-2.mp3',
          choices: [
            'Ils ne vont pas au parc à cause de la pluie',
            'Ils vont au parc malgré la pluie',
            'Ils vont au cinéma',
            'Ils restent en classe'
          ],
          correctIndex: 0,
          explanation: '因为…所以 = parce que... alors.',
          explanationEn: '因为…所以 = because... so.'
        },
        {
          id: 'hsk3b-l3',
          prompt: 'Écoute et choisis ce qu\'il a fait.',
          promptEn: 'Listen and pick what he did.',
          hanzi: '我把房间打扫干净了。',
          audio: 'audio/phrases/eval-hsk3-b-3.mp3',
          choices: [
            'Il a rangé son sac',
            'Il a nettoyé sa chambre à fond',
            'Il a fait la cuisine',
            'Il a fait la vaisselle'
          ],
          correctIndex: 1,
          explanation: '把房间打扫干净 = nettoyer la chambre (complément de résultat 干净).',
          explanationEn: '把房间打扫干净 = cleaned the room spotless.'
        },
        {
          id: 'hsk3b-l4',
          prompt: 'Écoute et détermine l\'opinion.',
          promptEn: 'Listen and pick the opinion.',
          hanzi: '这部电影虽然有点长，但是很有意思。',
          audio: 'audio/phrases/eval-hsk3-b-4.mp3',
          choices: [
            'Court et ennuyeux',
            'Long et ennuyeux',
            'Un peu long mais intéressant',
            'Court et intéressant'
          ],
          correctIndex: 2,
          explanation: '虽然有点长，但是很有意思 = un peu long mais intéressant.',
          explanationEn: 'A bit long but interesting.'
        },
        {
          id: 'hsk3b-l5',
          prompt: 'Écoute et trouve ce qu\'elle prépare.',
          promptEn: 'Listen and pick what she\'s preparing.',
          hanzi: '妈妈正在厨房里做饺子。',
          audio: 'audio/phrases/eval-hsk3-b-5.mp3',
          choices: [
            'Des nouilles',
            'Des raviolis (jiaozi)',
            'Du riz',
            'De la soupe'
          ],
          correctIndex: 1,
          explanation: '做饺子 = préparer des jiǎozi. 正在 = en train de.',
          explanationEn: '做饺子 = making dumplings. 正在 = in the middle of.'
        },
        {
          id: 'hsk3b-l6',
          prompt: 'Écoute et identifie le conseil.',
          promptEn: 'Listen and identify the suggestion.',
          hanzi: '你应该早一点儿休息。',
          audio: 'audio/phrases/eval-hsk3-b-6.mp3',
          choices: [
            'Tu devrais te reposer un peu plus tôt',
            'Tu devrais te lever plus tôt',
            'Tu devrais manger plus tard',
            'Tu devrais courir plus'
          ],
          correctIndex: 0,
          explanation: '应该 = devoir. 早一点儿休息 = se reposer un peu plus tôt.',
          explanationEn: '应该 = should. Rest a bit earlier.'
        },
        {
          id: 'hsk3b-l7',
          prompt: "Écoute et choisis le sens.",
          promptEn: "Listen and pick the meaning.",
          hanzi: "请你帮我把窗户关上。",
          audio: "audio/phrases/eval-hsk3-b-7.mp3",
          choices: ["Ferme la fenêtre SVP","Ouvre la fenêtre SVP","Lave la fenêtre","Répare la fenêtre"],
          correctIndex: 0,
          explanation: "把窗户关上 = fermer la fenêtre.",
          explanationEn: "Close the window."
        },
        {
          id: 'hsk3b-l8',
          prompt: "Écoute et identifie l'information.",
          promptEn: "Listen and identify the info.",
          hanzi: "我今年二十五岁了。",
          audio: "audio/phrases/eval-hsk3-b-8.mp3",
          choices: ["25 ans","20 ans","15 ans","30 ans"],
          correctIndex: 0,
          explanation: "二十五岁 = 25 ans.",
          explanationEn: "25 years old."
        },
        {
          id: 'hsk3b-l9',
          prompt: "Écoute et choisis le but.",
          promptEn: "Listen and pick the purpose.",
          hanzi: "为了考试，我每天都复习。",
          audio: "audio/phrases/eval-hsk3-b-9.mp3",
          choices: ["Pour l'examen, révise chaque jour","Il travaille","Il voyage","Il se repose"],
          correctIndex: 0,
          explanation: "为了 = pour, en vue de.",
          explanationEn: "In order to (exam)."
        },
        {
          id: 'hsk3b-l10',
          prompt: "Écoute et choisis le sens.",
          promptEn: "Listen and pick the meaning.",
          hanzi: "我打算下周去看望爷爷。",
          audio: "audio/phrases/eval-hsk3-b-10.mp3",
          choices: ["Visite grand-père la semaine prochaine","Hier il a visité","Aujourd'hui à l'hôpital","Demain un ami"],
          correctIndex: 0,
          explanation: "下周去看望 = la sem. prochaine aller voir.",
          explanationEn: "Visit grandpa next week."
        }
      ]
    }
  ]
};

// ============================================================================
//  HSK 4 — Série B — « Argumenter et raconter »
// ============================================================================
export const HSK4_MOCK_B: EvaluationV2Config = {
  id: 'mock-hsk4-b',
  level: 'hsk4',
  title: 'Mock HSK 4 · Série B — Raconter',
  titleEn: 'Mock HSK 4 · Series B — Narrative',
  subtitle:
    '24 questions, 18 minutes. Focus : 结果补语, 不管…都, 对…来说, récit structuré.',
  subtitleEn:
    '24 questions, 18 minutes. Focus: result complements, 不管…都, 对…来说, structured narrative.',
  durationSeconds: 18 * 60,
  passingPercent: 60,
  xpReward: 220,
  sections: [
    {
      id: 'hsk4b-vocab',
      kind: 'vocabulary',
      title: 'Vocabulaire HSK 4 — série B',
      titleEn: 'HSK 4 vocabulary — series B',
      questions: [
        {
          id: 'hsk4b-v1',
          prompt: 'Que signifie 否则 ?',
          promptEn: 'What does 否则 mean?',
          choices: ['Également', 'Sinon, autrement', 'Surtout', 'En revanche'],
          correctIndex: 1,
          explanation: '否则 (fǒu zé) = sinon. Synonyme courant : 不然.',
          explanationEn: '否则 (fǒu zé) = otherwise. Common synonym: 不然.'
        },
        {
          id: 'hsk4b-v2',
          prompt: 'Lequel signifie « gaspiller » ?',
          promptEn: 'Which one means "to waste"?',
          choices: ['节约', '浪费', '保护', '安排'],
          correctIndex: 1,
          explanation: '浪费 (làng fèi) = gaspiller. Opposé de 节约 = économiser.',
          explanationEn: '浪费 (làng fèi) = waste. Opposite of 节约.'
        },
        {
          id: 'hsk4b-v3',
          prompt: 'Que signifie 坚持 ?',
          promptEn: 'What does 坚持 mean?',
          choices: ['Céder', 'Persévérer, s\'en tenir à', 'Abandonner', 'Oublier'],
          correctIndex: 1,
          explanation: '坚持 (jiān chí) = tenir bon, persévérer.',
          explanationEn: '坚持 (jiān chí) = persist, stick to.'
        },
        {
          id: 'hsk4b-v4',
          prompt: 'Que signifie 机会 ?',
          promptEn: 'What does 机会 mean?',
          choices: ['Machine', 'Occasion, opportunité', 'Piège', 'Difficulté'],
          correctIndex: 1,
          explanation: '机会 (jī huì) = occasion.',
          explanationEn: '机会 (jī huì) = chance, opportunity.'
        },
        {
          id: 'hsk4b-v5',
          prompt: 'Quel adjectif signifie « sérieux / sincère » ?',
          promptEn: 'Which adjective means "serious / earnest"?',
          choices: ['认真', '正常', '普通', '轻松'],
          correctIndex: 0,
          explanation: '认真 (rèn zhēn) = sérieux, attentif.',
          explanationEn: '认真 (rèn zhēn) = serious, earnest.'
        },
        {
          id: 'hsk4b-v6',
          prompt: 'Que signifie 污染 ?',
          promptEn: 'What does 污染 mean?',
          choices: ['Technologie', 'Pollution', 'Tradition', 'Croissance'],
          correctIndex: 1,
          explanation: '污染 (wū rǎn) = pollution (souvent 环境污染).',
          explanationEn: '污染 (wū rǎn) = pollution.'
        },
        {
          id: 'hsk4b-v7',
          prompt: 'Quel mot désigne un trait de caractère ?',
          promptEn: 'Which word describes a personality trait?',
          choices: ['耐心', '教室', '眼镜', '厨房'],
          correctIndex: 0,
          explanation: '耐心 (nài xīn) = patience.',
          explanationEn: '耐心 (nài xīn) = patience.'
        },
        {
          id: 'hsk4b-v8',
          prompt: "Que signifie 尊重 ?",
          promptEn: "What does 尊重 mean?",
          choices: ["Respecter","Ignorer","Critiquer","Imiter"],
          correctIndex: 0,
          explanation: "尊重 = respecter.",
          explanationEn: "尊重 = respect."
        },
        {
          id: 'hsk4b-v9',
          prompt: "Que signifie 危险 ?",
          promptEn: "What does 危险 mean?",
          choices: ["Sûr","Dangereux","Difficile","Amusant"],
          correctIndex: 1,
          explanation: "危险 = dangereux.",
          explanationEn: "危险 = dangerous."
        },
        {
          id: 'hsk4b-v10',
          prompt: "Que signifie 安排 ?",
          promptEn: "What does 安排 mean?",
          choices: ["Organiser, arranger","Annuler","Refuser","Oublier"],
          correctIndex: 0,
          explanation: "安排 = arranger.",
          explanationEn: "安排 = arrange."
        }
      ]
    },
    {
      id: 'hsk4b-grammar',
      kind: 'grammar',
      title: 'Structures HSK 4 — série B',
      titleEn: 'HSK 4 structures — series B',
      questions: [
        {
          id: 'hsk4b-g1',
          prompt: 'Complète : ___ 多累，我也要完成这个项目。',
          promptEn: 'Fill in: ___ 多累，我也要完成这个项目。',
          choices: ['不管', '因为', '虽然', '如果'],
          correctIndex: 0,
          explanation: '不管 + 多 + adj = peu importe à quel point... « Peu importe la fatigue ».',
          explanationEn: '不管 + 多 + adj = no matter how ... . "No matter how tired I am".'
        },
        {
          id: 'hsk4b-g2',
          prompt: 'Complète : ___ 他来说，健康最重要。',
          promptEn: 'Fill in: ___ 他来说，健康最重要。',
          choices: ['对', '让', '把', '被'],
          correctIndex: 0,
          explanation: '对…来说 = pour (qqn/ce qui le concerne). « Pour lui, la santé d\'abord ».',
          explanationEn: '对…来说 = for someone / from their perspective.'
        },
        {
          id: 'hsk4b-g3',
          prompt: 'Complète : 他 ___ 会议迟到了。',
          promptEn: 'Fill in: 他 ___ 会议迟到了。',
          choices: ['对', '把', '开', '开会'],
          correctIndex: 3,
          explanation: '开会 = tenir une réunion ; « Il est arrivé en retard à la réunion » = 他开会迟到了.',
          explanationEn: '开会 = hold a meeting. "He was late to the meeting".'
        },
        {
          id: 'hsk4b-g4',
          prompt: 'Complète : 这本书我已经看 ___ 三次了。',
          promptEn: 'Fill in: 这本书我已经看 ___ 三次了。',
          choices: ['过', '了', '着', '到'],
          correctIndex: 0,
          explanation: '过 marque l\'expérience accumulée : l\'ai lu trois fois.',
          explanationEn: '过 marks accumulated experience.'
        },
        {
          id: 'hsk4b-g5',
          prompt: 'Complète : 我 ___ 回到家， ___ 开始做饭。',
          promptEn: 'Fill in: 我 ___ 回到家， ___ 开始做饭。',
          choices: ['一…就', '不…就', '要…才', '刚…就'],
          correctIndex: 0,
          explanation: '一…就 = dès que... . « Dès que je rentre, je cuisine ».',
          explanationEn: '一…就 = as soon as… .'
        },
        {
          id: 'hsk4b-g6',
          prompt: 'Complète : 他的汉语水平 ___ 以前提高了很多。',
          promptEn: 'Fill in: 他的汉语水平 ___ 以前提高了很多。',
          choices: ['比', '跟', '和', '对'],
          correctIndex: 0,
          explanation: 'A 比 B + verbe + complément : comparatif. « Son niveau s\'est amélioré par rapport à avant ».',
          explanationEn: 'A 比 B + verb + complement = comparative.'
        },
        {
          id: 'hsk4b-g7',
          prompt: "Complète : 我 ___ 来 ___ 早。",
          promptEn: "Fill in: 我 ___ 来 ___ 早。",
          choices: ["越…越","越来越","一边…一边","又…又"],
          correctIndex: 1,
          explanation: "越来越 + adj = de plus en plus.",
          explanationEn: "越来越 + adj = more and more."
        },
        {
          id: 'hsk4b-g8',
          prompt: "Complète : 不但…而且 : 这本书 ___ 好看 ___ 便宜。",
          promptEn: "Fill in: 不但…而且 : 这本书 ___ 好看 ___ 便宜。",
          choices: ["不但…而且","虽然…但是","因为…所以","既然…就"],
          correctIndex: 0,
          explanation: "不但…而且 = non seulement... mais aussi.",
          explanationEn: "不但…而且 = not only... but also."
        },
        {
          id: 'hsk4b-g9',
          prompt: "Complète : 只要努力， ___ 一定能成功。",
          promptEn: "Fill in: 只要努力， ___ 一定能成功。",
          choices: ["就","才","还","也"],
          correctIndex: 0,
          explanation: "只要…就 = il suffit que...",
          explanationEn: "只要…就 = as long as... then."
        },
        {
          id: 'hsk4b-g10',
          prompt: "Complète : 通过 ___ 努力，他终于成功了。",
          promptEn: "Fill in: 通过 ___ 努力，他终于成功了。",
          choices: ["的","地","得","了"],
          correctIndex: 0,
          explanation: "通过 + N + 的努力.",
          explanationEn: "通过 + N's efforts."
        }
      ]
    },
    {
      id: 'hsk4b-reading',
      kind: 'reading',
      title: 'Compréhension écrite — série B',
      titleEn: 'Reading comprehension — series B',
      questions: [
        {
          id: 'hsk4b-r1',
          context:
            '很多年轻人希望毕业以后留在大城市工作，因为机会多，工资也高。但是大城市的生活压力也比较大。',
          contextEn:
            '很多年轻人希望毕业以后留在大城市工作，因为机会多，工资也高。但是大城市的生活压力也比较大。',
          prompt: 'Quel est l\'inconvénient cité ?',
          promptEn: 'What downside is mentioned?',
          choices: [
            'Le salaire bas',
            'Le manque de transports',
            'La pression élevée',
            'L\'ennui'
          ],
          correctIndex: 2,
          explanation: '生活压力也比较大 = la pression de la vie est assez forte.',
          explanationEn: 'Life pressure is quite high.'
        },
        {
          id: 'hsk4b-r2',
          context:
            '小李最近决定每天坚持跑步半小时。她说锻炼不但让身体更健康，而且能帮助她减少压力。',
          contextEn:
            '小李最近决定每天坚持跑步半小时。她说锻炼不但让身体更健康，而且能帮助她减少压力。',
          prompt: 'Pour quelle raison Xiao Li court-elle ?',
          promptEn: 'Why does Xiao Li run?',
          choices: [
            'Pour participer à un marathon',
            'Pour la santé et réduire le stress',
            'Pour perdre du poids uniquement',
            'Pour accompagner ses amis'
          ],
          correctIndex: 1,
          explanation: '更健康 + 减少压力 = santé + moins de stress.',
          explanationEn: 'Healthier + less stress.'
        },
        {
          id: 'hsk4b-r3',
          context:
            '虽然网上购物很方便，但是有时候收到的东西和图片不太一样。所以买贵的东西的时候还是要小心。',
          contextEn:
            '虽然网上购物很方便，但是有时候收到的东西和图片不太一样。所以买贵的东西的时候还是要小心。',
          prompt: 'Quelle est la mise en garde ?',
          promptEn: 'What is the warning?',
          choices: [
            'Ne jamais acheter en ligne',
            'Faire attention pour les articles chers',
            'Toujours payer en espèces',
            'Acheter uniquement en magasin'
          ],
          correctIndex: 1,
          explanation: '买贵的东西的时候要小心 = prudence pour les objets chers.',
          explanationEn: 'Be careful with expensive items.'
        },
        {
          id: 'hsk4b-r4',
          context:
            '现代人越来越忙，所以很多家庭选择周末一起出去吃饭，让大家放松一下。',
          contextEn:
            '现代人越来越忙，所以很多家庭选择周末一起出去吃饭，让大家放松一下。',
          prompt: 'Pourquoi les familles sortent-elles manger ?',
          promptEn: 'Why do families eat out?',
          choices: [
            'C\'est moins cher',
            'Pour se détendre ensemble',
            'Parce qu\'il n\'y a plus de cuisine',
            'Pour économiser du temps'
          ],
          correctIndex: 1,
          explanation: '让大家放松一下 = pour que chacun se détende.',
          explanationEn: 'So everyone can relax.'
        },
        {
          id: 'hsk4b-r5',
          context:
            '这次考试比上次难多了。很多同学都没考好，但是老师说下次再努力就行。',
          contextEn:
            '这次考试比上次难多了。很多同学都没考好，但是老师说下次再努力就行。',
          prompt: 'Quelle est l\'attitude du professeur ?',
          promptEn: 'What is the teacher\'s attitude?',
          choices: [
            'Strict et déçu',
            'Encourageant pour la prochaine fois',
            'Il renvoie les élèves',
            'Il annule la note'
          ],
          correctIndex: 1,
          explanation: '下次再努力就行 = il suffit de s\'efforcer la prochaine fois.',
          explanationEn: 'Just try harder next time.'
        },
        {
          id: 'hsk4b-r6',
          context:
            '我朋友不喜欢热闹的地方，所以每年春节他都留在北京，不回老家。',
          contextEn:
            '我朋友不喜欢热闹的地方，所以每年春节他都留在北京，不回老家。',
          prompt: 'Que fait son ami au Nouvel An ?',
          promptEn: 'What does his friend do at New Year?',
          choices: [
            'Il retourne chez ses parents',
            'Il reste à Pékin',
            'Il voyage à l\'étranger',
            'Il va chez des amis'
          ],
          correctIndex: 1,
          explanation: '留在北京，不回老家 = reste à Pékin, ne rentre pas.',
          explanationEn: 'Stays in Beijing, doesn\'t go home.'
        },
        {
          id: 'hsk4b-r7',
          context: "很多人都说读书可以让人变得更有智慧。",
          contextEn: "很多人都说读书可以让人变得更有智慧。",
          prompt: "Quel effet de la lecture ?",
          promptEn: "Effect of reading?",
          choices: ["Plus intelligent / sage","Plus fatigué","Moins attentif","Sans effet"],
          correctIndex: 0,
          explanation: "更有智慧 = plus sage.",
          explanationEn: "Wiser."
        },
        {
          id: 'hsk4b-r8',
          context: "学外语不能只靠课本，还要多看电影听音乐。",
          contextEn: "学外语不能只靠课本，还要多看电影听音乐。",
          prompt: "Quelle est la méthode suggérée ?",
          promptEn: "Method suggested?",
          choices: ["Juste les livres","Combiner livres + films/musique","Voyager","Prendre des cours privés"],
          correctIndex: 1,
          explanation: "多看电影听音乐 = beaucoup films et musique.",
          explanationEn: "Watch movies + listen to music."
        },
        {
          id: 'hsk4b-r9',
          context: "保护眼睛很重要，使用电脑不要超过两个小时。",
          contextEn: "保护眼睛很重要，使用电脑不要超过两个小时。",
          prompt: "Quel conseil pour les yeux ?",
          promptEn: "Advice for eyes?",
          choices: ["Limite écrans à 2h","Utiliser PC 8h","Porter lunettes","Rien de spécial"],
          correctIndex: 0,
          explanation: "不要超过两个小时.",
          explanationEn: "Cap at 2h."
        },
        {
          id: 'hsk4b-r10',
          context: "这次活动很成功，参加的人比预计的多。",
          contextEn: "这次活动很成功，参加的人比预计的多。",
          prompt: "Que dit-on de l'événement ?",
          promptEn: "About the event?",
          choices: ["Plus de monde qu'attendu","Annulé","Peu fréquenté","Sans succès"],
          correctIndex: 0,
          explanation: "参加的人比预计的多.",
          explanationEn: "More attendees than expected."
        }
      ]
    },
    {
      id: 'hsk4b-listening',
      kind: 'listening',
      title: 'Compréhension orale — série B',
      titleEn: 'Listening comprehension — series B',
      questions: [
        {
          id: 'hsk4b-l1',
          prompt: 'Écoute et choisis le sujet.',
          promptEn: 'Listen and pick the topic.',
          hanzi: '我最近工作很忙，常常加班到晚上九点。',
          audio: 'audio/phrases/eval-hsk4-b-1.mp3',
          choices: [
            'Ses loisirs du week-end',
            'Son emploi du temps chargé, heures sup tard',
            'Ses vacances passées',
            'Sa famille'
          ],
          correctIndex: 1,
          explanation: '加班到晚上九点 = heures sup jusqu\'à 21 h.',
          explanationEn: '加班到晚上九点 = overtime until 9 PM.'
        },
        {
          id: 'hsk4b-l2',
          prompt: 'Écoute et identifie l\'opinion.',
          promptEn: 'Listen and identify the opinion.',
          hanzi: '对我来说，身体健康比什么都重要。',
          audio: 'audio/phrases/eval-hsk4-b-2.mp3',
          choices: [
            'La santé > tout le reste',
            'Le travail passe avant',
            'La famille d\'abord',
            'L\'argent d\'abord'
          ],
          correctIndex: 0,
          explanation: '对我来说，身体健康比什么都重要 = pour moi la santé prime sur tout.',
          explanationEn: 'For me, health matters more than anything.'
        },
        {
          id: 'hsk4b-l3',
          prompt: 'Écoute et choisis la cause.',
          promptEn: 'Listen and pick the cause.',
          hanzi: '由于交通堵塞，我迟到了半个小时。',
          audio: 'audio/phrases/eval-hsk4-b-3.mp3',
          choices: [
            'Embouteillage → retard de 30 min',
            'Panne du métro',
            'Il s\'est levé tard',
            'Il a oublié son sac'
          ],
          correctIndex: 0,
          explanation: '由于交通堵塞 = à cause des bouchons.',
          explanationEn: '由于交通堵塞 = due to traffic jams.'
        },
        {
          id: 'hsk4b-l4',
          prompt: 'Écoute et devine ce qu\'il conseille.',
          promptEn: 'Listen and pick what he suggests.',
          hanzi: '如果你感冒了，应该多喝水，早点儿休息。',
          audio: 'audio/phrases/eval-hsk4-b-4.mp3',
          choices: [
            'Bien manger et sortir',
            'Boire beaucoup, se reposer tôt (rhume)',
            'Prendre des médicaments sans attendre',
            'Faire du sport intense'
          ],
          correctIndex: 1,
          explanation: '多喝水 + 早点儿休息 = boire bcp + dormir tôt.',
          explanationEn: 'Drink lots + rest early.'
        },
        {
          id: 'hsk4b-l5',
          prompt: 'Écoute et sélectionne l\'information principale.',
          promptEn: 'Listen and select the main info.',
          hanzi: '这次旅行给我留下了很深的印象。',
          audio: 'audio/phrases/eval-hsk4-b-5.mp3',
          choices: [
            'Ce voyage l\'a peu marqué',
            'Ce voyage lui a laissé une forte impression',
            'Il n\'est pas parti en voyage',
            'Le voyage était trop court'
          ],
          correctIndex: 1,
          explanation: '留下了很深的印象 = une impression profonde.',
          explanationEn: 'Left a deep impression.'
        },
        {
          id: 'hsk4b-l6',
          prompt: 'Écoute et identifie la décision.',
          promptEn: 'Listen and identify the decision.',
          hanzi: '我决定明年去中国留学。',
          audio: 'audio/phrases/eval-hsk4-b-6.mp3',
          choices: [
            'Partir étudier en Chine l\'an prochain',
            'Arrêter l\'école',
            'Changer de travail',
            'Rester chez lui'
          ],
          correctIndex: 0,
          explanation: '决定明年去中国留学 = décider d\'étudier en Chine l\'an prochain.',
          explanationEn: 'Decided to study in China next year.'
        },
        {
          id: 'hsk4b-l7',
          prompt: "Écoute et identifie l'avis.",
          promptEn: "Listen and pick the view.",
          hanzi: "我觉得学好汉语需要大量的练习。",
          audio: "audio/phrases/eval-hsk4-b-7.mp3",
          choices: ["Maîtriser le chinois demande beaucoup de pratique","Le chinois est facile","Il n'aime pas le chinois","Il enseigne le chinois"],
          correctIndex: 0,
          explanation: "学好汉语需要大量的练习.",
          explanationEn: "Mastering Chinese needs lots of practice."
        },
        {
          id: 'hsk4b-l8',
          prompt: "Écoute et choisis l'action.",
          promptEn: "Listen and pick the action.",
          hanzi: "我们应该尊重别人的意见。",
          audio: "audio/phrases/eval-hsk4-b-8.mp3",
          choices: ["Respecter l'avis d'autrui","Critiquer les autres","Ignorer les avis","Changer d'avis"],
          correctIndex: 0,
          explanation: "尊重别人的意见.",
          explanationEn: "Respect others' views."
        },
        {
          id: 'hsk4b-l9',
          prompt: "Écoute et identifie l'information.",
          promptEn: "Listen and identify the info.",
          hanzi: "明天的会议推迟到下周一。",
          audio: "audio/phrases/eval-hsk4-b-9.mp3",
          choices: ["Réunion reportée à lundi prochain","Annulée","Avancée","Maintenue"],
          correctIndex: 0,
          explanation: "推迟到下周一.",
          explanationEn: "Postponed to next Monday."
        },
        {
          id: 'hsk4b-l10',
          prompt: "Écoute et choisis l'intention.",
          promptEn: "Listen and pick the intention.",
          hanzi: "她希望将来成为一名医生。",
          audio: "audio/phrases/eval-hsk4-b-10.mp3",
          choices: ["Elle espère devenir médecin","Elle est déjà médecin","Elle n'aime pas la médecine","Elle étudie le droit"],
          correctIndex: 0,
          explanation: "希望将来成为医生.",
          explanationEn: "Hopes to become a doctor."
        }
      ]
    }
  ]
};

// ============================================================================
//  HSK 5 — Série B — « Analyser et commenter »
// ============================================================================
export const HSK5_MOCK_B: EvaluationV2Config = {
  id: 'mock-hsk5-b',
  level: 'hsk5',
  title: 'Mock HSK 5 · Série B — Analyse',
  titleEn: 'Mock HSK 5 · Series B — Analysis',
  subtitle:
    '24 questions, 20 minutes. Focus : connecteurs abstraits, expressions littéraires, compréhension détaillée.',
  subtitleEn:
    '24 questions, 20 minutes. Focus: abstract connectors, literary expressions, fine reading.',
  durationSeconds: 20 * 60,
  passingPercent: 60,
  xpReward: 240,
  sections: [
    {
      id: 'hsk5b-vocab',
      kind: 'vocabulary',
      title: 'Vocabulaire HSK 5 — série B',
      titleEn: 'HSK 5 vocabulary — series B',
      questions: [
        {
          id: 'hsk5b-v1',
          prompt: 'Que signifie 传统 ?',
          promptEn: 'What does 传统 mean?',
          choices: ['Moderne', 'Tradition', 'Accident', 'Expérience'],
          correctIndex: 1,
          explanation: '传统 (chuán tǒng) = tradition, traditionnel.',
          explanationEn: '传统 = tradition(al).'
        },
        {
          id: 'hsk5b-v2',
          prompt: 'Que signifie 承担 ?',
          promptEn: 'What does 承担 mean?',
          choices: ['Refuser', 'Assumer, prendre en charge', 'Ignorer', 'Déléguer'],
          correctIndex: 1,
          explanation: '承担 (chéng dān) = assumer (une responsabilité).',
          explanationEn: '承担 = take on, bear.'
        },
        {
          id: 'hsk5b-v3',
          prompt: 'Lequel signifie « évident » ?',
          promptEn: 'Which one means "obvious"?',
          choices: ['明显', '秘密', '深刻', '孤独'],
          correctIndex: 0,
          explanation: '明显 (míng xiǎn) = évident.',
          explanationEn: '明显 = obvious.'
        },
        {
          id: 'hsk5b-v4',
          prompt: 'Que signifie 合作 ?',
          promptEn: 'What does 合作 mean?',
          choices: ['Compétition', 'Coopération', 'Contradiction', 'Contrat'],
          correctIndex: 1,
          explanation: '合作 (hé zuò) = coopération.',
          explanationEn: '合作 = cooperation.'
        },
        {
          id: 'hsk5b-v5',
          prompt: 'Que signifie 必然 ?',
          promptEn: 'What does 必然 mean?',
          choices: ['Possible', 'Inévitable, nécessairement', 'Hasard', 'Temporaire'],
          correctIndex: 1,
          explanation: '必然 (bì rán) = forcément, inévitable.',
          explanationEn: '必然 = inevitable(ly).'
        },
        {
          id: 'hsk5b-v6',
          prompt: 'Que signifie 缺乏 ?',
          promptEn: 'What does 缺乏 mean?',
          choices: ['Abondance', 'Manquer de, absence de', 'Croissance', 'Développement'],
          correctIndex: 1,
          explanation: '缺乏 (quē fá) = manquer de (souvent abstrait).',
          explanationEn: '缺乏 = lack.'
        },
        {
          id: 'hsk5b-v7',
          prompt: 'Lequel exprime un état psychologique ?',
          promptEn: 'Which expresses a mental state?',
          choices: ['焦虑', '门口', '工具', '表面'],
          correctIndex: 0,
          explanation: '焦虑 (jiāo lǜ) = anxiété.',
          explanationEn: '焦虑 = anxiety.'
        },
        {
          id: 'hsk5b-v8',
          prompt: "Que signifie 批评 ?",
          promptEn: "What does 批评 mean?",
          choices: ["Critiquer","Louer","Ignorer","Féliciter"],
          correctIndex: 0,
          explanation: "批评 = critiquer.",
          explanationEn: "批评 = criticize."
        },
        {
          id: 'hsk5b-v9',
          prompt: "Que signifie 尽管 ?",
          promptEn: "What does 尽管 mean?",
          choices: ["Bien que","Parce que","Si","Donc"],
          correctIndex: 0,
          explanation: "尽管 = bien que.",
          explanationEn: "尽管 = although."
        },
        {
          id: 'hsk5b-v10',
          prompt: "Que signifie 主张 ?",
          promptEn: "What does 主张 mean?",
          choices: ["Préconiser","Refuser","Éviter","Attendre"],
          correctIndex: 0,
          explanation: "主张 = préconiser.",
          explanationEn: "主张 = advocate."
        }
      ]
    },
    {
      id: 'hsk5b-grammar',
      kind: 'grammar',
      title: 'Structures HSK 5 — série B',
      titleEn: 'HSK 5 structures — series B',
      questions: [
        {
          id: 'hsk5b-g1',
          prompt: 'Complète : ___ 天气多么冷，他都坚持每天晨跑。',
          promptEn: 'Fill in: ___ 天气多么冷，他都坚持每天晨跑。',
          choices: ['无论', '只有', '既然', '不过'],
          correctIndex: 0,
          explanation: '无论 + question forme ou 多 + adj + 都 = peu importe... quand même.',
          explanationEn: '无论 ... 都 = no matter... still.'
        },
        {
          id: 'hsk5b-g2',
          prompt: 'Complète : 他 ___ 不努力，___ 怎么会进步呢？',
          promptEn: 'Fill in: 他 ___ 不努力，___ 怎么会进步呢？',
          choices: ['既然…又', '如果…那么', '只要…就', '虽然…不过'],
          correctIndex: 1,
          explanation: '如果…那么 = si... alors. Rhétorique pour critiquer.',
          explanationEn: '如果…那么 = if... then (rhetorical here).'
        },
        {
          id: 'hsk5b-g3',
          prompt: 'Complète : 这个问题 ___ 值得我们好好讨论。',
          promptEn: 'Fill in: 这个问题 ___ 值得我们好好讨论。',
          choices: ['非常', '是否', '能否', '确实'],
          correctIndex: 3,
          explanation: '确实 = vraiment (insiste sur la réalité). Structure + 值得 = mérite vraiment.',
          explanationEn: '确实 + 值得 = truly worth...'
        },
        {
          id: 'hsk5b-g4',
          prompt: 'Complète : 他 ___ 经验丰富， ___ 很谦虚。',
          promptEn: 'Fill in: 他 ___ 经验丰富， ___ 很谦虚。',
          choices: ['既…又', '不是…而是', '如果…就', '除非…才'],
          correctIndex: 0,
          explanation: '既…又 = à la fois... à la fois.',
          explanationEn: '既…又 = both… and…'
        },
        {
          id: 'hsk5b-g5',
          prompt: 'Complète : ___ 他的帮助，我才能按时完成任务。',
          promptEn: 'Fill in: ___ 他的帮助，我才能按时完成任务。',
          choices: ['由于', '通过', '关于', '对于'],
          correctIndex: 0,
          explanation: '由于 + cause / grâce à. Le 才 suit pour insister sur la condition nécessaire.',
          explanationEn: '由于 = owing to. With 才 it stresses the necessary condition.'
        },
        {
          id: 'hsk5b-g6',
          prompt: 'Complète : 这件事 ___ 他本人来解决最合适。',
          promptEn: 'Fill in: 这件事 ___ 他本人来解决最合适。',
          choices: ['由', '对', '把', '被'],
          correctIndex: 0,
          explanation: '由 + agent + 来 + verbe = c\'est à X de faire. « C\'est à lui-même de régler cela ».',
          explanationEn: '由 + agent + 来 + verb = for X to handle.'
        },
        {
          id: 'hsk5b-g7',
          prompt: "Complète : 他的观点 ___ 新颖， ___ 有深度。",
          promptEn: "Fill in: 他的观点 ___ 新颖， ___ 有深度。",
          choices: ["不但…而且","虽然…但是","除了…以外","要么…要么"],
          correctIndex: 0,
          explanation: "不但…而且 = non seulement... mais aussi.",
          explanationEn: "不但…而且 = not only... but also."
        },
        {
          id: 'hsk5b-g8',
          prompt: "Complète : ___ 他的经验， ___ 他的智慧，都值得学习。",
          promptEn: "Fill in: ___ 他的经验， ___ 他的智慧，都值得学习。",
          choices: ["无论…还是","只要…就","除非…才","与其…不如"],
          correctIndex: 0,
          explanation: "无论…还是 = que ce soit... ou.",
          explanationEn: "无论…还是 = whether... or."
        },
        {
          id: 'hsk5b-g9',
          prompt: "Complète : ___ 你再忙， ___ 要陪家人。",
          promptEn: "Fill in: ___ 你再忙， ___ 要陪家人。",
          choices: ["不管…都","如果…就","因为…所以","只要…就"],
          correctIndex: 0,
          explanation: "不管…都 = peu importe... quand même.",
          explanationEn: "不管…都 = no matter... still."
        },
        {
          id: 'hsk5b-g10',
          prompt: "Complète : ___ 你不同意， ___ 不能强迫别人。",
          promptEn: "Fill in: ___ 你不同意， ___ 不能强迫别人。",
          choices: ["即使…也","既然…就","虽然…但是","不仅…还"],
          correctIndex: 0,
          explanation: "即使…也 = même si... quand même.",
          explanationEn: "即使…也 = even if... still."
        }
      ]
    },
    {
      id: 'hsk5b-reading',
      kind: 'reading',
      title: 'Compréhension écrite — série B',
      titleEn: 'Reading comprehension — series B',
      questions: [
        {
          id: 'hsk5b-r1',
          context:
            '随着科技的发展，越来越多的工作可以在家完成。这不仅改变了人们的生活方式，也对传统的办公环境提出了新的挑战。',
          contextEn:
            '随着科技的发展，越来越多的工作可以在家完成。这不仅改变了人们的生活方式，也对传统的办公环境提出了新的挑战。',
          prompt: 'Quelle est l\'idée principale ?',
          promptEn: 'What is the main idea?',
          choices: [
            'La tech disparaît',
            'Le télétravail bouleverse les bureaux traditionnels',
            'Les gens ne veulent plus travailler',
            'Les bureaux sont plus beaux'
          ],
          correctIndex: 1,
          explanation: '对传统办公环境提出新的挑战 = défie le bureau traditionnel.',
          explanationEn: 'Challenges the traditional office.'
        },
        {
          id: 'hsk5b-r2',
          context:
            '很多家长认为，孩子的教育不应该只看成绩，还要培养他们独立思考的能力。',
          contextEn:
            '很多家长认为，孩子的教育不应该只看成绩，还要培养他们独立思考的能力。',
          prompt: 'Que valorisent les parents cités ?',
          promptEn: 'What do the cited parents value?',
          choices: [
            'Les notes seulement',
            'La pensée autonome en plus des notes',
            'Les activités sportives',
            'Le silence à la maison'
          ],
          correctIndex: 1,
          explanation: '培养独立思考的能力 = cultiver la pensée indépendante.',
          explanationEn: 'Foster independent thinking.'
        },
        {
          id: 'hsk5b-r3',
          context:
            '保护环境不仅是政府的责任，每个人都应该从自己的日常生活做起，比如节约用水和减少使用塑料。',
          contextEn:
            '保护环境不仅是政府的责任，每个人都应该从自己的日常生活做起，比如节约用水和减少使用塑料。',
          prompt: 'Quel est le message ?',
          promptEn: 'What is the message?',
          choices: [
            'Seul l\'État peut protéger l\'environnement',
            'Chacun doit agir au quotidien (eau, plastique)',
            'Les efforts sont inutiles',
            'Il faut attendre les nouvelles lois'
          ],
          correctIndex: 1,
          explanation: '每个人从日常生活做起 = chacun commence par sa vie quotidienne.',
          explanationEn: 'Everyone should start in their daily life.'
        },
        {
          id: 'hsk5b-r4',
          context:
            '成功并不等于拥有很多钱。真正的成功是做自己喜欢的事，并且让生活变得更有意义。',
          contextEn:
            '成功并不等于拥有很多钱。真正的成功是做自己喜欢的事，并且让生活变得更有意义。',
          prompt: 'Quelle définition du succès est proposée ?',
          promptEn: 'What definition of success is given?',
          choices: [
            'La richesse uniquement',
            'Faire ce qu\'on aime et donner du sens à sa vie',
            'Devenir célèbre',
            'Avoir une grande maison'
          ],
          correctIndex: 1,
          explanation: '做自己喜欢的事 + 让生活变得更有意义 = faire ce qu\'on aime + sens.',
          explanationEn: 'Do what you love + make life meaningful.'
        },
        {
          id: 'hsk5b-r5',
          context:
            '现代社会节奏越来越快，很多人感到压力巨大。适当地放慢脚步、休息，其实能让我们走得更远。',
          contextEn:
            '现代社会节奏越来越快，很多人感到压力巨大。适当地放慢脚步、休息，其实能让我们走得更远。',
          prompt: 'Que conseille le texte ?',
          promptEn: 'What does the text recommend?',
          choices: [
            'Travailler encore plus',
            'Ralentir pour aller plus loin',
            'Quitter son travail',
            'Déménager en campagne'
          ],
          correctIndex: 1,
          explanation: '放慢脚步 让我们走得更远 = ralentir permet d\'aller plus loin.',
          explanationEn: 'Slow down to go farther.'
        },
        {
          id: 'hsk5b-r6',
          context:
            '学外语最重要的不是记多少单词，而是能不能大胆开口说。害怕犯错，反而会让进步变慢。',
          contextEn:
            '学外语最重要的不是记多少单词，而是能不能大胆开口说。害怕犯错，反而会让进步变慢。',
          prompt: 'Quelle est la clé selon le texte ?',
          promptEn: 'What is the key, per the text?',
          choices: [
            'Mémoriser un max de mots',
            'Oser parler, sans peur de l\'erreur',
            'Lire beaucoup de livres',
            'Écouter de la musique étrangère'
          ],
          correctIndex: 1,
          explanation: '大胆开口说 > 害怕犯错.',
          explanationEn: 'Speak boldly > fear mistakes.'
        },
        {
          id: 'hsk5b-r7',
          context: "互联网的普及使人与人之间的距离越来越近。",
          contextEn: "互联网的普及使人与人之间的距离越来越近。",
          prompt: "Quelle est la conséquence d'Internet ?",
          promptEn: "Consequence of the internet?",
          choices: ["Gens plus proches","Plus isolés","Plus de conflits","Moins de communication"],
          correctIndex: 0,
          explanation: "距离越来越近 = de plus en plus proches.",
          explanationEn: "People feel closer."
        },
        {
          id: 'hsk5b-r8',
          context: "健康的饮食应该搭配合理，不能只吃一种食物。",
          contextEn: "健康的饮食应该搭配合理，不能只吃一种食物。",
          prompt: "Quel est le conseil ?",
          promptEn: "Advice?",
          choices: ["Varier l'alimentation","Manger un seul aliment","Ne rien manger","Manger beaucoup"],
          correctIndex: 0,
          explanation: "搭配合理 = équilibrer.",
          explanationEn: "Balance variety."
        },
        {
          id: 'hsk5b-r9',
          context: "尽管工作很辛苦，他依然保持乐观的态度。",
          contextEn: "尽管工作很辛苦，他依然保持乐观的态度。",
          prompt: "Quelle est son attitude ?",
          promptEn: "His attitude?",
          choices: ["Pessimiste","Optimiste malgré la dureté","Indifférent","Triste"],
          correctIndex: 1,
          explanation: "依然保持乐观.",
          explanationEn: "Remains optimistic."
        },
        {
          id: 'hsk5b-r10',
          context: "学习一门艺术需要长时间的积累。",
          contextEn: "学习一门艺术需要长时间的积累。",
          prompt: "Qu'apprend-on de l'art ?",
          promptEn: "Art lesson?",
          choices: ["Nécessite une longue accumulation","Rapide à maîtriser","Fait pour peu de gens","Trop cher"],
          correctIndex: 0,
          explanation: "长时间的积累 = longue accumulation.",
          explanationEn: "Long accumulation."
        }
      ]
    },
    {
      id: 'hsk5b-listening',
      kind: 'listening',
      title: 'Compréhension orale — série B',
      titleEn: 'Listening comprehension — series B',
      questions: [
        {
          id: 'hsk5b-l1',
          prompt: 'Écoute et pick l\'idée principale.',
          promptEn: 'Listen and pick the main idea.',
          hanzi: '我认为学习一门外语需要坚持和耐心。',
          audio: 'audio/phrases/eval-hsk5-b-1.mp3',
          choices: [
            'Apprendre une langue = don naturel',
            'Apprendre une langue = persévérance et patience',
            'Les langues sont faciles',
            'Apprendre ne sert à rien'
          ],
          correctIndex: 1,
          explanation: '需要坚持和耐心 = persévérance + patience.',
          explanationEn: 'Requires perseverance and patience.'
        },
        {
          id: 'hsk5b-l2',
          prompt: 'Écoute et choisis la position.',
          promptEn: 'Listen and pick the stance.',
          hanzi: '虽然网络购物很方便，但是也带来了很多问题。',
          audio: 'audio/phrases/eval-hsk5-b-2.mp3',
          choices: [
            'Les achats en ligne sont parfaits',
            'Pratiques mais soulèvent aussi des problèmes',
            'Ils devraient être interdits',
            'Ils sont trop chers'
          ],
          correctIndex: 1,
          explanation: '虽然…但是 = bien que... cependant.',
          explanationEn: '虽然…但是 = although… yet.'
        },
        {
          id: 'hsk5b-l3',
          prompt: 'Écoute et identifie la cause.',
          promptEn: 'Listen and identify the cause.',
          hanzi: '由于经济压力，很多年轻人选择晚一点结婚。',
          audio: 'audio/phrases/eval-hsk5-b-3.mp3',
          choices: [
            'Pression économique → mariage repoussé',
            'Ils n\'aiment plus le mariage',
            'La loi les empêche',
            'La famille s\'y oppose'
          ],
          correctIndex: 0,
          explanation: '由于经济压力 = en raison de la pression économique.',
          explanationEn: 'Due to economic pressure.'
        },
        {
          id: 'hsk5b-l4',
          prompt: 'Écoute et choisis le conseil donné.',
          promptEn: 'Listen and pick the advice.',
          hanzi: '无论你遇到什么困难，都要相信自己。',
          audio: 'audio/phrases/eval-hsk5-b-4.mp3',
          choices: [
            'Toujours demander de l\'aide',
            'Peu importe les difficultés, croire en soi',
            'Abandonner quand c\'est dur',
            'Se comparer aux autres'
          ],
          correctIndex: 1,
          explanation: '无论…都 = peu importe... quand même. 相信自己 = croire en soi.',
          explanationEn: 'No matter... believe in yourself.'
        },
        {
          id: 'hsk5b-l5',
          prompt: 'Écoute et détermine l\'action prévue.',
          promptEn: 'Listen and detect the planned action.',
          hanzi: '公司打算下个月在上海开一家新的分公司。',
          audio: 'audio/phrases/eval-hsk5-b-5.mp3',
          choices: [
            'Fermer une succursale',
            'Ouvrir une succursale à Shanghai le mois prochain',
            'Déménager le siège social',
            'Recruter massivement à Pékin'
          ],
          correctIndex: 1,
          explanation: '开一家新的分公司 = ouvrir une succursale.',
          explanationEn: 'Open a new branch.'
        },
        {
          id: 'hsk5b-l6',
          prompt: 'Écoute et choisis l\'opinion exprimée.',
          promptEn: 'Listen and pick the opinion.',
          hanzi: '其实，每个人都有自己的优点和缺点。',
          audio: 'audio/phrases/eval-hsk5-b-6.mp3',
          choices: [
            'Personne n\'a de défauts',
            'Tout le monde a forces et faiblesses',
            'Les qualités comptent seulement',
            'Les défauts dominent'
          ],
          correctIndex: 1,
          explanation: '每个人都有自己的优点和缺点 = chacun a ses forces/faiblesses.',
          explanationEn: 'Everyone has strengths and flaws.'
        },
        {
          id: 'hsk5b-l7',
          prompt: "Écoute et choisis la position.",
          promptEn: "Listen and pick the stance.",
          hanzi: "尽管他失败过，但他从不放弃。",
          audio: "audio/phrases/eval-hsk5-b-7.mp3",
          choices: ["Il abandonne souvent","Malgré ses échecs, il ne renonce pas","Il a toujours réussi","Il évite les défis"],
          correctIndex: 1,
          explanation: "尽管 + 从不放弃.",
          explanationEn: "Despite failure, never gives up."
        },
        {
          id: 'hsk5b-l8',
          prompt: "Écoute et trouve l'opinion.",
          promptEn: "Listen and find the opinion.",
          hanzi: "我觉得诚实比聪明更重要。",
          audio: "audio/phrases/eval-hsk5-b-8.mp3",
          choices: ["Honnêteté > intelligence","Intelligence seulement","Ni l'un ni l'autre","Les deux égaux"],
          correctIndex: 0,
          explanation: "诚实比聪明更重要.",
          explanationEn: "Honesty > smarts."
        },
        {
          id: 'hsk5b-l9',
          prompt: "Écoute et identifie la décision.",
          promptEn: "Listen and identify the decision.",
          hanzi: "为了提高效率，我们需要改变工作方式。",
          audio: "audio/phrases/eval-hsk5-b-9.mp3",
          choices: ["Changer la méthode pour plus d'efficacité","Rien ne change","Diminuer le travail","Augmenter les salaires"],
          correctIndex: 0,
          explanation: "提高效率 + 改变工作方式.",
          explanationEn: "Change method to raise efficiency."
        },
        {
          id: 'hsk5b-l10',
          prompt: "Écoute et trouve le conseil.",
          promptEn: "Listen and find the advice.",
          hanzi: "无论做什么，都要有计划。",
          audio: "audio/phrases/eval-hsk5-b-10.mp3",
          choices: ["Toujours planifier","Agir vite sans plan","Copier les autres","Attendre les ordres"],
          correctIndex: 0,
          explanation: "无论…都要有计划.",
          explanationEn: "Always plan."
        }
      ]
    }
  ]
};

// ============================================================================
//  HSK 6 — Série B — « Textes longs & abstraits »
// ============================================================================
export const HSK6_MOCK_B: EvaluationV2Config = {
  id: 'mock-hsk6-b',
  level: 'hsk6',
  title: 'Mock HSK 6 · Série B — Abstraction',
  titleEn: 'Mock HSK 6 · Series B — Abstraction',
  subtitle:
    '24 questions, 24 minutes. Vocabulaire spécialisé, idiomes, textes denses, déductions.',
  subtitleEn:
    '24 questions, 24 minutes. Specialised vocabulary, idioms, dense passages, inference.',
  durationSeconds: 24 * 60,
  passingPercent: 60,
  xpReward: 280,
  sections: [
    {
      id: 'hsk6b-vocab',
      kind: 'vocabulary',
      title: 'Vocabulaire HSK 6 — série B',
      titleEn: 'HSK 6 vocabulary — series B',
      questions: [
        {
          id: 'hsk6b-v1',
          prompt: 'Que signifie 潜力 ?',
          promptEn: 'What does 潜力 mean?',
          choices: ['Faiblesse', 'Potentiel', 'Colère', 'Vitesse'],
          correctIndex: 1,
          explanation: '潜力 (qián lì) = potentiel.',
          explanationEn: '潜力 = potential.'
        },
        {
          id: 'hsk6b-v2',
          prompt: 'Que signifie 忽略 ?',
          promptEn: 'What does 忽略 mean?',
          choices: ['Souligner', 'Négliger, ignorer', 'Renforcer', 'Comparer'],
          correctIndex: 1,
          explanation: '忽略 (hū lüè) = négliger.',
          explanationEn: '忽略 = overlook, neglect.'
        },
        {
          id: 'hsk6b-v3',
          prompt: 'Lequel signifie « précieux / rare » ?',
          promptEn: 'Which means "precious / rare"?',
          choices: ['珍贵', '平凡', '频繁', '泛滥'],
          correctIndex: 0,
          explanation: '珍贵 (zhēn guì) = précieux.',
          explanationEn: '珍贵 = precious.'
        },
        {
          id: 'hsk6b-v4',
          prompt: 'Que signifie 弥补 ?',
          promptEn: 'What does 弥补 mean?',
          choices: ['Compenser, combler', 'Accuser', 'Abandonner', 'Contredire'],
          correctIndex: 0,
          explanation: '弥补 (mí bǔ) = compenser.',
          explanationEn: '弥补 = make up for.'
        },
        {
          id: 'hsk6b-v5',
          prompt: 'Que signifie l\'expression 一举两得 ?',
          promptEn: 'What does the idiom 一举两得 mean?',
          choices: [
            'Échouer deux fois',
            'Faire d\'une pierre deux coups',
            'Marcher sur place',
            'Se contredire'
          ],
          correctIndex: 1,
          explanation: '一举两得 = d\'une action, deux gains. « Faire d\'une pierre deux coups ».',
          explanationEn: '一举两得 = kill two birds with one stone.'
        },
        {
          id: 'hsk6b-v6',
          prompt: 'Que signifie 显著 ?',
          promptEn: 'What does 显著 mean?',
          choices: ['Léger', 'Marqué, notable', 'Caché', 'Temporaire'],
          correctIndex: 1,
          explanation: '显著 (xiǎn zhù) = notable, remarquable.',
          explanationEn: '显著 = remarkable.'
        },
        {
          id: 'hsk6b-v7',
          prompt: 'Que signifie 矛盾 ?',
          promptEn: 'What does 矛盾 mean?',
          choices: ['Contradiction, conflit', 'Harmonie', 'Gloire', 'Consensus'],
          correctIndex: 0,
          explanation: '矛盾 (máo dùn) = contradiction.',
          explanationEn: '矛盾 = contradiction.'
        },
        {
          id: 'hsk6b-v8',
          prompt: "Que signifie 渗透 ?",
          promptEn: "What does 渗透 mean?",
          choices: ["Imprégner, pénétrer","Évaporer","Emballer","Délimiter"],
          correctIndex: 0,
          explanation: "渗透 = imprégner.",
          explanationEn: "渗透 = permeate."
        },
        {
          id: 'hsk6b-v9',
          prompt: "Que signifie 盲目 ?",
          promptEn: "What does 盲目 mean?",
          choices: ["Aveugle, sans réflexion","Lucide","Méthodique","Ouvert"],
          correctIndex: 0,
          explanation: "盲目 = aveugle (au sens figuré).",
          explanationEn: "盲目 = blind (figurative)."
        },
        {
          id: 'hsk6b-v10',
          prompt: "Que signifie 制约 ?",
          promptEn: "What does 制约 mean?",
          choices: ["Contraindre, limiter","Libérer","Stabiliser","Accroître"],
          correctIndex: 0,
          explanation: "制约 = contraindre.",
          explanationEn: "制约 = restrict."
        }
      ]
    },
    {
      id: 'hsk6b-grammar',
      kind: 'grammar',
      title: 'Structures HSK 6 — série B',
      titleEn: 'HSK 6 structures — series B',
      questions: [
        {
          id: 'hsk6b-g1',
          prompt: 'Complète : ___ 他再怎么努力， ___ 很难在短时间内超过对手。',
          promptEn: 'Fill in: ___ 他再怎么努力， ___ 很难在短时间内超过对手。',
          choices: ['即使…也', '只要…就', '除了…以外', '宁可…也'],
          correctIndex: 0,
          explanation: '即使…也 = même si... quand même.',
          explanationEn: '即使…也 = even if... still.'
        },
        {
          id: 'hsk6b-g2',
          prompt: 'Complète : 这件事 ___ 他来处理，我们可以完全放心。',
          promptEn: 'Fill in: 这件事 ___ 他来处理，我们可以完全放心。',
          choices: ['凭', '就', '任', '照'],
          correctIndex: 2,
          explanation: '任 + agent + 来 + verbe = laisser X s\'en occuper.',
          explanationEn: '任 + agent + 来 + verb = let X handle.'
        },
        {
          id: 'hsk6b-g3',
          prompt: 'Complète : 他的成功， ___ 运气， ___ 努力。',
          promptEn: 'Fill in: 他的成功， ___ 运气， ___ 努力。',
          choices: ['不是…就是', '与其…不如', '不是…而是', '尚未…已经'],
          correctIndex: 2,
          explanation: '不是…而是 = ce n\'est pas A, mais B.',
          explanationEn: '不是…而是 = not A, but B.'
        },
        {
          id: 'hsk6b-g4',
          prompt: 'Complète : 会议 ___ 已开始， ___ 他还迟迟未到。',
          promptEn: 'Fill in: 会议 ___ 已开始， ___ 他还迟迟未到。',
          choices: ['尚未…已经', '既然…就', '虽…但', '不仅…还'],
          correctIndex: 2,
          explanation: '虽…但 = bien que... cependant. Registre soutenu.',
          explanationEn: '虽…但 = although... yet (formal).'
        },
        {
          id: 'hsk6b-g5',
          prompt: 'Complète : ___ 他的坚持和专注，这个项目才能顺利完成。',
          promptEn: 'Fill in: ___ 他的坚持和专注，这个项目才能顺利完成。',
          choices: ['多亏', '以免', '宁可', '何况'],
          correctIndex: 0,
          explanation: '多亏 = grâce à (gratitude).',
          explanationEn: '多亏 = thanks to.'
        },
        {
          id: 'hsk6b-g6',
          prompt: 'Complète : 这本小说 ___ 让人爱不释手。',
          promptEn: 'Fill in: 这本小说 ___ 让人爱不释手。',
          choices: ['恰恰', '尤其', '实在', '偏偏'],
          correctIndex: 2,
          explanation: '实在 + adj = vraiment. « Le roman est vraiment irrésistible ».',
          explanationEn: '实在 + adj = really.'
        },
        {
          id: 'hsk6b-g7',
          prompt: "Complète : ___ 时间紧迫， ___ 他仍保持冷静。",
          promptEn: "Fill in: ___ 时间紧迫， ___ 他仍保持冷静。",
          choices: ["尽管…但是","因为…所以","只要…就","一旦…就"],
          correctIndex: 0,
          explanation: "尽管…但是 = bien que... cependant.",
          explanationEn: "尽管…但是 = although... yet."
        },
        {
          id: 'hsk6b-g8',
          prompt: "Complète : ___ 你同意 ___ 反对，都可以投票。",
          promptEn: "Fill in: ___ 你同意 ___ 反对，都可以投票。",
          choices: ["无论…还是","只要…就","除非…才","不仅…还"],
          correctIndex: 0,
          explanation: "无论…还是 = que... ou.",
          explanationEn: "无论…还是 = whether... or."
        },
        {
          id: 'hsk6b-g9',
          prompt: "Complète : 他的话 ___ 真诚， ___ 让人信服。",
          promptEn: "Fill in: 他的话 ___ 真诚， ___ 让人信服。",
          choices: ["既…又","不但…而且","一边…一边","无论…都"],
          correctIndex: 1,
          explanation: "不但…而且 = non seulement... mais aussi.",
          explanationEn: "不但…而且 = not only... but also."
        },
        {
          id: 'hsk6b-g10',
          prompt: "Complète : 一旦下决心， ___ 不能轻易改变。",
          promptEn: "Fill in: 一旦下决心， ___ 不能轻易改变。",
          choices: ["就","才","还","也"],
          correctIndex: 0,
          explanation: "一旦…就 = une fois que... alors.",
          explanationEn: "一旦…就 = once... then."
        }
      ]
    },
    {
      id: 'hsk6b-reading',
      kind: 'reading',
      title: 'Compréhension écrite — série B',
      titleEn: 'Reading comprehension — series B',
      questions: [
        {
          id: 'hsk6b-r1',
          context:
            '人工智能的快速发展正深刻地改变着各行各业。它不仅能提高工作效率，还可能取代一些重复性较高的岗位。面对这一趋势，人们不得不重新思考未来的职业规划。',
          contextEn:
            '人工智能的快速发展正深刻地改变着各行各业。它不仅能提高工作效率，还可能取代一些重复性较高的岗位。面对这一趋势，人们不得不重新思考未来的职业规划。',
          prompt: 'Quelle implication est évoquée ?',
          promptEn: 'What implication is raised?',
          choices: [
            'Tous les emplois disparaissent',
            'Les gens doivent repenser leur carrière',
            'L\'IA est inutile',
            'Les usines ferment'
          ],
          correctIndex: 1,
          explanation: '不得不重新思考未来的职业规划.',
          explanationEn: 'Must rethink career planning.'
        },
        {
          id: 'hsk6b-r2',
          context:
            '在传统文化里，节俭被视为一种美德。然而，在消费主义日益盛行的今天，过度节俭反而被某些人认为是落伍的表现。',
          contextEn:
            '在传统文化里，节俭被视为一种美德。然而，在消费主义日益盛行的今天，过度节俭反而被某些人认为是落伍的表现。',
          prompt: 'Quel contraste est décrit ?',
          promptEn: 'What contrast is described?',
          choices: [
            'La frugalité est toujours louée',
            'Vue comme vertu vs taxée de démodée',
            'Seule la consommation compte',
            'Les riches sont solidaires'
          ],
          correctIndex: 1,
          explanation: '传统：美德 vs 今天：落伍.',
          explanationEn: 'Tradition: virtue vs today: outdated.'
        },
        {
          id: 'hsk6b-r3',
          context:
            '阅读不仅能开阔视野，还能帮助我们在面对复杂问题时保持冷静。书籍像一位安静的老师，让人慢慢成长。',
          contextEn:
            '阅读不仅能开阔视野，还能帮助我们在面对复杂问题时保持冷静。书籍像一位安静的老师，让人慢慢成长。',
          prompt: 'À quoi est comparée la lecture ?',
          promptEn: 'What is reading compared to?',
          choices: [
            'Un concurrent',
            'Un professeur silencieux qui aide à mûrir',
            'Un divertissement passager',
            'Un obstacle'
          ],
          correctIndex: 1,
          explanation: '书籍像一位安静的老师 = livres ≈ prof silencieux.',
          explanationEn: 'Books are like a quiet teacher.'
        },
        {
          id: 'hsk6b-r4',
          context:
            '一个城市的魅力，不仅仅在于高楼大厦，更在于它的历史、文化和生活节奏。只有走进街巷，才能真正感受到它的灵魂。',
          contextEn:
            '一个城市的魅力，不仅仅在于高楼大厦，更在于它的历史、文化和生活节奏。只有走进街巷，才能真正感受到它的灵魂。',
          prompt: 'Où réside « l\'âme » d\'une ville ?',
          promptEn: 'Where lies a city\'s soul?',
          choices: [
            'Dans ses gratte-ciels',
            'Dans ses ruelles, son histoire, sa culture',
            'Dans ses embouteillages',
            'Dans ses centres commerciaux'
          ],
          correctIndex: 1,
          explanation: '走进街巷，感受灵魂 = on la sent dans les ruelles.',
          explanationEn: 'You feel the soul in the alleys.'
        },
        {
          id: 'hsk6b-r5',
          context:
            '尽管科技让我们之间的联系更加便捷，但真正深入的交流却变得越来越罕见。人与人之间似乎隔着一层看不见的屏幕。',
          contextEn:
            '尽管科技让我们之间的联系更加便捷，但真正深入的交流却变得越来越罕见。人与人之间似乎隔着一层看不见的屏幕。',
          prompt: 'Quel paradoxe est souligné ?',
          promptEn: 'What paradox is highlighted?',
          choices: [
            'Plus connectés mais moins profonds',
            'Plus connectés et plus proches',
            'Moins connectés et plus isolés',
            'Moins de technologie, plus d\'échanges'
          ],
          correctIndex: 0,
          explanation: '联系便捷 vs 深入交流罕见.',
          explanationEn: 'Convenient contact vs rare deep exchange.'
        },
        {
          id: 'hsk6b-r6',
          context:
            '教育的目的不只是灌输知识，更重要的是激发学生的好奇心，让他们学会独立思考。',
          contextEn:
            '教育的目的不只是灌输知识，更重要的是激发学生的好奇心，让他们学会独立思考。',
          prompt: 'Quel est le but premier de l\'éducation selon le texte ?',
          promptEn: 'What is the primary goal of education per the text?',
          choices: [
            'Transmettre uniquement des connaissances',
            'Susciter la curiosité et la pensée autonome',
            'Préparer aux concours',
            'Apprendre une langue étrangère'
          ],
          correctIndex: 1,
          explanation: '激发好奇心 + 独立思考 = curiosité + autonomie.',
          explanationEn: 'Spark curiosity + independent thinking.'
        },
        {
          id: 'hsk6b-r7',
          context: "社会的进步离不开每一个普通人的努力。",
          contextEn: "社会的进步离不开每一个普通人的努力。",
          prompt: "Que soutient le texte ?",
          promptEn: "Main claim?",
          choices: ["Progrès grâce aux gens ordinaires","Progrès = seuls les élites","Pas de progrès possible","Le passé est mieux"],
          correctIndex: 0,
          explanation: "离不开每一个普通人的努力.",
          explanationEn: "Depends on every ordinary person."
        },
        {
          id: 'hsk6b-r8',
          context: "语言不仅是交流的工具，也是文化的载体。",
          contextEn: "语言不仅是交流的工具，也是文化的载体。",
          prompt: "Quelle double fonction du langage ?",
          promptEn: "Dual role of language?",
          choices: ["Communication + vecteur culturel","Uniquement outil","Uniquement culturel","Juste esthétique"],
          correctIndex: 0,
          explanation: "交流的工具 + 文化的载体.",
          explanationEn: "Tool + cultural carrier."
        },
        {
          id: 'hsk6b-r9',
          context: "盲目追求名利往往让人迷失自我。",
          contextEn: "盲目追求名利往往让人迷失自我。",
          prompt: "Quel risque est pointé ?",
          promptEn: "Risk pointed out?",
          choices: ["Perdre son identité","Gagner trop","Devenir trop discret","Être mal vu"],
          correctIndex: 0,
          explanation: "迷失自我 = se perdre.",
          explanationEn: "Lose oneself."
        },
        {
          id: 'hsk6b-r10',
          context: "只有经历过挫折，才能真正懂得珍惜。",
          contextEn: "只有经历过挫折，才能真正懂得珍惜。",
          prompt: "Quelle leçon est tirée ?",
          promptEn: "Lesson?",
          choices: ["L'adversité apprend la valeur des choses","Il faut éviter les difficultés","Le succès facile est mieux","Chacun fait comme il veut"],
          correctIndex: 0,
          explanation: "经历挫折 + 懂得珍惜.",
          explanationEn: "Hardship teaches appreciation."
        }
      ]
    },
    {
      id: 'hsk6b-listening',
      kind: 'listening',
      title: 'Compréhension orale — série B',
      titleEn: 'Listening comprehension — series B',
      questions: [
        {
          id: 'hsk6b-l1',
          prompt: 'Écoute et choisis la thèse.',
          promptEn: 'Listen and pick the thesis.',
          hanzi: '成功的关键在于能否坚持到最后。',
          audio: 'audio/phrases/eval-hsk6-b-1.mp3',
          choices: [
            'Tenir jusqu\'au bout = clé du succès',
            'La chance prime sur tout',
            'Le talent suffit',
            'Rien ne compte'
          ],
          correctIndex: 0,
          explanation: '坚持到最后 = persévérer jusqu\'au bout.',
          explanationEn: 'Persist to the end.'
        },
        {
          id: 'hsk6b-l2',
          prompt: 'Écoute et identifie la nuance.',
          promptEn: 'Listen and identify the nuance.',
          hanzi: '即使我们遇到挫折，也不能轻易放弃。',
          audio: 'audio/phrases/eval-hsk6-b-2.mp3',
          choices: [
            'Rendre les armes devant les revers',
            'Même face aux revers, ne pas abandonner',
            'Les revers sont impossibles',
            'Abandonner est parfois mieux'
          ],
          correctIndex: 1,
          explanation: '即使…也不 = même si... pas quand même.',
          explanationEn: '即使…也不 = even if... still don\'t.'
        },
        {
          id: 'hsk6b-l3',
          prompt: 'Écoute et trouve le reproche.',
          promptEn: 'Listen and find the critique.',
          hanzi: '他总是忽略别人的感受，这让很多人感到失望。',
          audio: 'audio/phrases/eval-hsk6-b-3.mp3',
          choices: [
            'Il néglige les sentiments d\'autrui, cela déçoit',
            'Il est très attentif aux autres',
            'Il est absent',
            'Il parle trop'
          ],
          correctIndex: 0,
          explanation: '忽略别人的感受 = négliger le ressenti d\'autrui.',
          explanationEn: 'Ignore others\' feelings.'
        },
        {
          id: 'hsk6b-l4',
          prompt: 'Écoute et choisis la conclusion logique.',
          promptEn: 'Listen and pick the logical conclusion.',
          hanzi: '多亏了大家的帮助，这个项目才得以顺利完成。',
          audio: 'audio/phrases/eval-hsk6-b-4.mp3',
          choices: [
            'Le projet a échoué',
            'Le projet a réussi grâce à l\'aide de tous',
            'Personne n\'a aidé',
            'Le projet a été abandonné'
          ],
          correctIndex: 1,
          explanation: '多亏 + 才 = grâce à ... enfin. Succès collectif.',
          explanationEn: 'Thanks to ... finally. Collective success.'
        },
        {
          id: 'hsk6b-l5',
          prompt: 'Écoute et déduis l\'opinion.',
          promptEn: 'Listen and infer the opinion.',
          hanzi: '与其抱怨环境，不如改变自己的心态。',
          audio: 'audio/phrases/eval-hsk6-b-5.mp3',
          choices: [
            'Plutôt que se plaindre, changer son état d\'esprit',
            'Se plaindre est la meilleure option',
            'Changer d\'environnement est la clé',
            'Ignorer les problèmes'
          ],
          correctIndex: 0,
          explanation: '与其…不如 = plutôt que... mieux vaut.',
          explanationEn: '与其…不如 = rather than... better to.'
        },
        {
          id: 'hsk6b-l6',
          prompt: 'Écoute et identifie l\'idée forte.',
          promptEn: 'Listen and identify the key idea.',
          hanzi: '真正的朋友，在你最困难的时候依然陪在你身边。',
          audio: 'audio/phrases/eval-hsk6-b-6.mp3',
          choices: [
            'Un vrai ami reste présent dans les pires moments',
            'Les amis disparaissent dans l\'adversité',
            'Il vaut mieux être seul',
            'L\'amitié est superficielle'
          ],
          correctIndex: 0,
          explanation: '最困难的时候依然陪 = reste à vos côtés dans l\'épreuve.',
          explanationEn: 'Stays by your side in the hardest times.'
        },
        {
          id: 'hsk6b-l7',
          prompt: "Écoute et choisis la thèse.",
          promptEn: "Listen and pick the thesis.",
          hanzi: "知识改变命运，但态度决定成败。",
          audio: "audio/phrases/eval-hsk6-b-7.mp3",
          choices: ["Savoir change le destin, attitude décide du succès","Seul le savoir compte","Le destin est fixé","Rien ne change"],
          correctIndex: 0,
          explanation: "知识改变命运 + 态度决定成败.",
          explanationEn: "Knowledge changes fate, attitude decides outcome."
        },
        {
          id: 'hsk6b-l8',
          prompt: "Écoute et trouve la nuance.",
          promptEn: "Listen and find the nuance.",
          hanzi: "真正的智慧来源于不断的反思。",
          audio: "audio/phrases/eval-hsk6-b-8.mp3",
          choices: ["Vraie sagesse = réflexion constante","Sagesse innée","Sagesse = argent","Aucune sagesse"],
          correctIndex: 0,
          explanation: "智慧 + 反思.",
          explanationEn: "Wisdom = ongoing reflection."
        },
        {
          id: 'hsk6b-l9',
          prompt: "Écoute et identifie l'argument.",
          promptEn: "Listen and identify the argument.",
          hanzi: "盲目跟从他人的选择，往往会后悔。",
          audio: "audio/phrases/eval-hsk6-b-9.mp3",
          choices: ["Suivre aveuglément mène au regret","Toujours bien de suivre","L'indépendance nuit","Rien à voir"],
          correctIndex: 0,
          explanation: "盲目跟从 + 后悔.",
          explanationEn: "Blind following → regret."
        },
        {
          id: 'hsk6b-l10',
          prompt: "Écoute et choisis l'idée.",
          promptEn: "Listen and pick the idea.",
          hanzi: "世上无难事，只怕有心人。",
          audio: "audio/phrases/eval-hsk6-b-10.mp3",
          choices: ["Rien n'est impossible pour qui veut vraiment","Tout est impossible","Seul le talent compte","Le destin décide"],
          correctIndex: 0,
          explanation: "Proverbe classique.",
          explanationEn: "Classical proverb."
        }
      ]
    }
  ]
};

// ============================================================================
//  REGISTRE SÉRIE B — export groupé
// ============================================================================
export const HSK_EVALUATIONS_B: readonly EvaluationV2Config[] = [
  HSK1_MOCK_B,
  HSK2_MOCK_B,
  HSK3_MOCK_B,
  HSK4_MOCK_B,
  HSK5_MOCK_B,
  HSK6_MOCK_B
];
