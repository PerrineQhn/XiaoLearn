/**
 * reading-quizzes.ts — Quiz QCM enrichi pour chaque lecture
 * -----------------------------------------------------------
 * Une question = 4 propositions, 1 bonne réponse (answerIndex), explication
 * bilingue. Difficulté progressive selon le niveau CECR :
 *   - A1 / A2  : 3 questions, factuelles (qui, quoi, où, combien)
 *   - B1 / B2  : 4 questions, factuel + déduction / cause
 *   - C1 / C2  : 4-5 questions, inférence, intention, message global
 *
 * Si une lecture n'a pas d'entrée ici, ReadingPlayer retombe sur les
 * `questions` inline du reading (mode « afficher la réponse »).
 */
import type { ReadingComprehensionQuestion } from '../types/lesson-structure';

type Q = ReadingComprehensionQuestion;

// Helper raccourci pour réduire la verbosité.
const q = (
  questionFr: string,
  questionEn: string,
  choices: Array<[string, string]>,
  answerIndex: number,
  explanationFr: string,
  explanationEn: string
): Q => ({
  questionFr,
  questionEn,
  answerFr: choices[answerIndex][0],
  answerEn: choices[answerIndex][1],
  choices: choices.map(([labelFr, labelEn]) => ({ labelFr, labelEn })),
  answerIndex,
  explanationFr,
  explanationEn
});

export const READING_QUIZZES: Record<string, Q[]> = {
  // ==========================================================
  //  A1 — questions factuelles directes
  // ==========================================================
  'rd-a1-my-day': [
    q(
      'À quelle heure Wang Lin se lève-t-elle ?',
      'What time does Wang Lin get up?',
      [['À six heures', 'At 6'], ['À sept heures', 'At 7'], ['À huit heures', 'At 8'], ['À neuf heures', 'At 9']],
      1,
      '« 每天早上七点，我起床 » — sept heures du matin, tous les jours.',
      '"每天早上七点，我起床" — 7 a.m., every day.'
    ),
    q(
      'Où étudie Wang Lin ?',
      'Where does Wang Lin study?',
      [
        ['À l\'Université de Shanghai', 'At Shanghai University'],
        ['À l\'Université de Pékin', 'At Peking University'],
        ['Au lycée de Xi\'an', 'At a Xi\'an high school'],
        ['À l\'Université de Nankin', 'At Nanjing University']
      ],
      1,
      '« 我在北京大学学习 » — elle est étudiante à 北京大学 (Peking University).',
      '"我在北京大学学习" — she studies at 北京大学 (Peking University).'
    ),
    q(
      'Que mange-t-elle au petit-déjeuner ?',
      'What does she eat for breakfast?',
      [
        ['Du riz et des œufs', 'Rice and eggs'],
        ['Des nouilles', 'Noodles'],
        ['Du lait et du pain', 'Milk and bread'],
        ['Des fruits', 'Fruits']
      ],
      2,
      '« 我喜欢喝牛奶，吃面包 » — lait et pain le matin.',
      '"我喜欢喝牛奶，吃面包" — milk and bread in the morning.'
    )
  ],

  'rd-a1-my-room': [
    q(
      'Comment Xiao Ming décrit-il sa chambre ?',
      'How does Xiao Ming describe his room?',
      [
        ['Grande et froide', 'Large and cold'],
        ['Petite mais confortable', 'Small but comfortable'],
        ['Très moderne', 'Very modern'],
        ['Toujours en désordre', 'Always messy']
      ],
      1,
      '« 我的房间不大，但是很舒服 » — pas grande, mais confortable.',
      '"我的房间不大，但是很舒服" — not big, but cozy.'
    ),
    q(
      'Que trouve-t-on à côté de la fenêtre ?',
      'What is next to the window?',
      [
        ['Une télévision', 'A TV'],
        ['Des photos', 'Photos'],
        ['Beaucoup de plantes', 'Many plants'],
        ['Un piano', 'A piano']
      ],
      2,
      '« 窗户旁边有很多植物 » — beaucoup de plantes près de la fenêtre.',
      '"窗户旁边有很多植物" — many plants by the window.'
    ),
    q(
      'Que trouve-t-on sur le bureau ?',
      'What is on the desk?',
      [
        ['Son ordinateur et des livres', 'His computer and some books'],
        ['Une lampe seulement', 'Just a lamp'],
        ['Rien du tout', 'Nothing at all'],
        ['Des jouets', 'Toys']
      ],
      0,
      '« 书桌上有我的电脑和一些书 » — ordinateur + livres sur le bureau.',
      '"书桌上有我的电脑和一些书" — computer and books on the desk.'
    )
  ],

  'rd-a1-restaurant': [
    q(
      'Que commande le narrateur ?',
      'What does the narrator order?',
      [
        ['Du riz frit et du thé', 'Fried rice and tea'],
        ['Des nouilles au bœuf et un coca', 'Beef noodles and a coke'],
        ['Une salade', 'A salad'],
        ['Une soupe seulement', 'Just a soup']
      ],
      1,
      '« 我要一碗牛肉面和一杯可乐 » — un bol de 牛肉面 + un coca.',
      '"我要一碗牛肉面和一杯可乐" — a bowl of beef noodles and a coke.'
    ),
    q(
      'Combien coûte le repas ?',
      'How much does the meal cost?',
      [
        ['50 yuans', '50 yuan'],
        ['80 yuans', '80 yuan'],
        ['100 yuans', '100 yuan'],
        ['150 yuans', '150 yuan']
      ],
      2,
      '« 一共一百块，不贵 » — 100 yuans au total.',
      '"一共一百块，不贵" — 100 yuan in total.'
    ),
    q(
      'Que dit le serveur en les accueillant ?',
      'What does the waiter say when greeting them?',
      [
        ['« Asseyez-vous, je vous prie »', '"Please have a seat"'],
        ['« Bonsoir »', '"Good evening"'],
        ['« L\'addition arrive »', '"Your bill is coming"'],
        ['Rien, il les ignore', 'Nothing, he ignores them']
      ],
      0,
      '« 欢迎光临，请坐 » — formule classique d\'accueil.',
      '"欢迎光临，请坐" — the standard welcome.'
    )
  ],

  'rd-a1-subway': [
    q(
      'Où habite Li Ming ?',
      'Where does Li Ming live?',
      [
        ['En banlieue', 'In the suburbs'],
        ['Au centre-ville', 'In the city center'],
        ['Près de l\'aéroport', 'Near the airport'],
        ['Sur le campus', 'On campus']
      ],
      1,
      '« 我住在市中心 » — il habite au centre-ville.',
      '"我住在市中心" — he lives downtown.'
    ),
    q(
      'Quelles lignes prend-il pour aller à l\'université ?',
      'Which lines does he take to go to university?',
      [
        ['La 1 puis la 4', 'Line 1 then line 4'],
        ['La 3 puis la 2', 'Line 3 then line 2'],
        ['La 5 seulement', 'Line 5 only'],
        ['La 2 puis la 6', 'Line 2 then line 6']
      ],
      1,
      '« 我坐三号线，然后换二号线 » — ligne 3 puis correspondance ligne 2.',
      '"我坐三号线，然后换二号线" — line 3 then transfer to line 2.'
    ),
    q(
      'Combien de stations doit-il faire ?',
      'How many stations is the ride?',
      [
        ['4 stations', '4 stations'],
        ['5 stations', '5 stations'],
        ['6 stations', '6 stations'],
        ['8 stations', '8 stations']
      ],
      2,
      '« 一共六站，大约二十分钟 » — six stations, environ 20 minutes.',
      '"一共六站，大约二十分钟" — six stations, about 20 minutes.'
    )
  ],

  // ==========================================================
  //  A2
  // ==========================================================
  'rd-a2-travel': [
    q(
      'Comment le narrateur est-il allé à Xi\'an ?',
      'How did the narrator get to Xi\'an?',
      [
        ['En avion', 'By plane'],
        ['En TGV (高铁)', 'By high-speed train'],
        ['En voiture', 'By car'],
        ['En bus', 'By bus']
      ],
      1,
      '« 我们坐高铁去，大概五个小时 » — en 高铁, environ 5 heures.',
      '"我们坐高铁去，大概五个小时" — by high-speed train, about 5 hours.'
    ),
    q(
      'Pourquoi Xi\'an est-elle célèbre dans le texte ?',
      'Why is Xi\'an famous in the text?',
      [
        ['Pour la Grande Muraille', 'For the Great Wall'],
        ['Pour l\'armée de terre cuite', 'For the Terracotta Warriors'],
        ['Pour ses plages', 'For its beaches'],
        ['Pour la rivière des Perles', 'For the Pearl River']
      ],
      1,
      '« 西安的兵马俑非常有名 » — les 兵马俑 (soldats de terre cuite).',
      '"西安的兵马俑非常有名" — the Terracotta Warriors.'
    ),
    q(
      'Où sont-ils allés manger le soir ?',
      'Where did they go to eat in the evening?',
      [
        ['Dans un grand restaurant', 'In a big restaurant'],
        ['Sur la rue Huimin (回民街)', 'On Huimin Street'],
        ['À l\'hôtel', 'At the hotel'],
        ['Dans un parc', 'In a park']
      ],
      1,
      '« 晚上，我们去回民街吃小吃 » — rue Huimin, pour les 小吃.',
      '"晚上，我们去回民街吃小吃" — Huimin Street, for snacks.'
    )
  ],

  'rd-a2-market': [
    q(
      'Quand Tata Zhang va-t-elle au marché ?',
      'When does Auntie Zhang go to the market?',
      [
        ['Tous les jours', 'Every day'],
        ['Le samedi matin', 'On Saturday mornings'],
        ['Le dimanche soir', 'On Sunday evenings'],
        ['Une fois par mois', 'Once a month']
      ],
      1,
      '« 每个星期六早上 » — chaque samedi matin.',
      '"每个星期六早上" — every Saturday morning.'
    ),
    q(
      'Que n\'a-t-elle PAS acheté aujourd\'hui ?',
      'Which item did she NOT buy today?',
      [
        ['Des tomates', 'Tomatoes'],
        ['Des concombres', 'Cucumbers'],
        ['Des pommes', 'Apples'],
        ['Des bananes', 'Bananas']
      ],
      3,
      'Elle a acheté tomates, concombres, pommes — mais pas de bananes.',
      'She bought tomatoes, cucumbers and apples — no bananas.'
    ),
    q(
      'Combien coûte le poisson ?',
      'How much is the fish?',
      [
        ['10 yuans', '10 yuan'],
        ['15 yuans', '15 yuan'],
        ['20 yuans', '20 yuan'],
        ['25 yuans', '25 yuan']
      ],
      1,
      '« 十五块，很新鲜 » — 15 yuans, et bien frais.',
      '"十五块，很新鲜" — 15 yuan, very fresh.'
    )
  ],

  'rd-a2-doctor-visit': [
    q(
      'Pourquoi Xiao Wang va-t-il à l\'hôpital ?',
      'Why does Xiao Wang go to the hospital?',
      [
        ['Il s\'est cassé la jambe', 'He broke his leg'],
        ['Il a de la fièvre depuis ce matin', 'He has had a fever since morning'],
        ['Il a mal aux dents', 'He has a toothache'],
        ['Il a mal aux yeux', 'His eyes hurt']
      ],
      1,
      '« 今天早上还发烧 » — fièvre ce matin.',
      '"今天早上还发烧" — fever this morning.'
    ),
    q(
      'Quels symptômes décrit-il au médecin ?',
      'Which symptoms does he tell the doctor about?',
      [
        ['Mal au ventre seulement', 'Only stomach pain'],
        ['Mal de tête, gorge irritée, toux', 'Headache, sore throat, cough'],
        ['Vertiges', 'Dizziness'],
        ['Allergies', 'Allergies']
      ],
      1,
      '« 我头疼，喉咙也疼，而且咳嗽 » — tête, gorge, toux.',
      '"我头疼，喉咙也疼，而且咳嗽" — headache, sore throat, cough.'
    ),
    q(
      'Quel est le diagnostic du médecin ?',
      'What does the doctor diagnose?',
      [
        ['Une grippe sévère', 'A severe flu'],
        ['Un rhume', 'A common cold'],
        ['Une pneumonie', 'Pneumonia'],
        ['Une allergie', 'An allergy']
      ],
      1,
      '« 应该是感冒了，多喝水，多休息 » — un simple rhume, boire et se reposer.',
      '"应该是感冒了，多喝水，多休息" — just a cold, drink and rest.'
    )
  ],

  'rd-a2-birthday': [
    q(
      'Quel jour était l\'anniversaire de Xiao Mei ?',
      'When was Xiao Mei\'s birthday?',
      [
        ['Lundi dernier', 'Last Monday'],
        ['Samedi dernier', 'Last Saturday'],
        ['Dimanche dernier', 'Last Sunday'],
        ['Vendredi dernier', 'Last Friday']
      ],
      1,
      '« 上个星期六是我的好朋友小美的生日 » — samedi dernier.',
      '"上个星期六是我的好朋友小美的生日" — last Saturday.'
    ),
    q(
      'Quel cadeau le narrateur a-t-il offert ?',
      'What gift did the narrator give?',
      [
        ['Un livre', 'A book'],
        ['Une jolie écharpe', 'A pretty scarf'],
        ['Des fleurs', 'Flowers'],
        ['Un sac', 'A bag']
      ],
      1,
      '« 我送了她一条漂亮的围巾 » — une jolie écharpe.',
      '"我送了她一条漂亮的围巾" — a pretty scarf.'
    ),
    q(
      'Jusqu\'à quelle heure ont-ils chanté au karaoké ?',
      'Until what time did they sing karaoke?',
      [
        ['9 heures', '9 p.m.'],
        ['10 heures', '10 p.m.'],
        ['11 heures', '11 p.m.'],
        ['Minuit', 'Midnight']
      ],
      2,
      '« 一直唱到十一点 » — jusqu\'à 23 h.',
      '"一直唱到十一点" — until 11 p.m.'
    )
  ],

  // ==========================================================
  //  B1.1 — détail + déduction
  // ==========================================================
  'rd-b11-work': [
    q(
      'Quelle entreprise a accueilli Li Hua en stage ?',
      'What kind of company hosted Li Hua\'s internship?',
      [
        ['Une banque', 'A bank'],
        ['Une entreprise Internet', 'An internet company'],
        ['Un hôpital', 'A hospital'],
        ['Une école', 'A school']
      ],
      1,
      '« 我在一家互联网公司做了三个月的实习 » — entreprise Internet.',
      '"我在一家互联网公司做了三个月的实习" — internet company.'
    ),
    q(
      'Combien d\'heures par jour travaillait-elle ?',
      'How many hours per day did she work?',
      [
        ['Environ 6 heures', 'About 6 hours'],
        ['Environ 8 heures', 'About 8 hours'],
        ['Environ 11 heures', 'About 11 hours'],
        ['Environ 14 heures', 'About 14 hours']
      ],
      2,
      'Arrivée 9 h, départ 20 h → 11 h sur place.',
      'In at 9, out at 8 p.m. → 11 hours on site.'
    ),
    q(
      'Comment décrit-elle ses collègues ?',
      'How does she describe her colleagues?',
      [
        ['Distants', 'Distant'],
        ['Compétitifs', 'Competitive'],
        ['Amicaux et serviables', 'Friendly and helpful'],
        ['Bruyants', 'Loud']
      ],
      2,
      '« 我的同事们都很友好，经常帮我解决问题 » — sympas et serviables.',
      '"我的同事们都很友好，经常帮我解决问题" — friendly and helpful.'
    ),
    q(
      'Quelle leçon retient-elle de ce stage ?',
      'What lesson does she take from this internship?',
      [
        ['Que le diplôme suffit', 'That a diploma is enough'],
        ['Qu\'école et vie active sont très différentes', 'That school and working life are very different'],
        ['Qu\'il vaut mieux rester étudiante', 'That she should stay a student'],
        ['Qu\'il faut changer de domaine', 'That she should change fields']
      ],
      1,
      '« 学校和社会很不一样 » — vrai choc culturel école → entreprise.',
      '"学校和社会很不一样" — school and the working world are very different.'
    )
  ],

  'rd-b11-roommate': [
    q(
      'Depuis quand vivent-ils en colocation ?',
      'How long have they been roommates?',
      [
        ['Une semaine', 'One week'],
        ['Un mois', 'One month'],
        ['Deux mois', 'Two months'],
        ['Six mois', 'Six months']
      ],
      2,
      '« 两个月前 » — il y a deux mois.',
      '"两个月前" — two months ago.'
    ),
    q(
      'Que fait Luc en Chine ?',
      'What is Luc doing in China?',
      [
        ['Il travaille', 'He works'],
        ['Il apprend le chinois', 'He is learning Chinese'],
        ['Il voyage', 'He is travelling'],
        ['Il fait un doctorat', 'He is doing a PhD']
      ],
      1,
      '« 他叫Luc，二十三岁，是学汉语的 » — il étudie le chinois.',
      '"他叫Luc，二十三岁，是学汉语的" — he is learning Chinese.'
    ),
    q(
      'Quelle différence d\'habitudes pose problème ?',
      'What habit difference causes friction?',
      [
        ['La cuisine', 'Cooking'],
        ['Les horaires de sommeil', 'Sleep schedule'],
        ['Le ménage', 'Housekeeping'],
        ['La télé', 'TV time']
      ],
      1,
      'Elle se couche tôt, lui après minuit → conflit doux.',
      'She is an early bird, he stays up past midnight.'
    ),
    q(
      'Quel est le ton général du texte ?',
      'What is the general tone of the text?',
      [
        ['Plainte', 'Complaining'],
        ['Curiosité et adaptation', 'Curiosity and adaptation'],
        ['Colère', 'Anger'],
        ['Indifférence', 'Indifference']
      ],
      1,
      'La narratrice décrit l\'adaptation à des différences culturelles — pas de plainte.',
      'She describes adjusting to cultural differences — not complaining.'
    )
  ],

  'rd-b11-mid-autumn': [
    q(
      'Quand a lieu la fête de la Mi-Automne ?',
      'When is the Mid-Autumn Festival?',
      [
        ['Au 15e jour du 1er mois lunaire', '15th day of the 1st lunar month'],
        ['Au 15e jour du 8e mois lunaire', '15th day of the 8th lunar month'],
        ['Au 1er jour de l\'année lunaire', '1st day of the lunar year'],
        ['Au 7e jour du 7e mois lunaire', '7th day of the 7th lunar month']
      ],
      1,
      '« 农历八月十五 » — 15e jour du 8e mois lunaire.',
      '"农历八月十五" — 15th day of the 8th lunar month.'
    ),
    q(
      'Quelle garniture de gâteau de lune NE figure PAS dans le texte ?',
      'Which mooncake filling is NOT mentioned?',
      [
        ['Pâte de haricot rouge (豆沙)', 'Red bean paste (豆沙)'],
        ['Pâte de lotus (莲蓉)', 'Lotus paste (莲蓉)'],
        ['Crème glacée', 'Ice cream'],
        ['Chocolat', 'Chocolate']
      ],
      3,
      'Le texte cite 豆沙, 莲蓉, 蛋黄 et 冰淇淋 — pas de chocolat.',
      'The text lists red bean, lotus, egg yolk and ice cream — no chocolate.'
    ),
    q(
      'Qu\'est-ce que les enfants tiennent dans la cour ?',
      'What do the children carry in the courtyard?',
      [
        ['Des feux d\'artifice', 'Fireworks'],
        ['Des lanternes en forme de lapin', 'Rabbit-shaped lanterns'],
        ['Des éventails', 'Fans'],
        ['Des cerfs-volants', 'Kites']
      ],
      1,
      '« 小朋友们拿着兔子灯 » — lanternes-lapins.',
      '"小朋友们拿着兔子灯" — rabbit lanterns.'
    ),
    q(
      'Quel sentiment domine la soirée familiale décrite ?',
      'Which feeling dominates the family evening?',
      [
        ['L\'agitation', 'Restlessness'],
        ['La nostalgie et la chaleur familiale', 'Nostalgia and family warmth'],
        ['L\'ennui', 'Boredom'],
        ['La compétition', 'Competition']
      ],
      1,
      'La Mi-Automne célèbre la pleine lune et la réunion : nostalgie + chaleur.',
      'Mid-Autumn celebrates the full moon and family reunion: nostalgia and warmth.'
    )
  ],

  'rd-b11-spring-festival': [
    q(
      'Qu\'est-ce que le « chunyun » (春运) ?',
      'What is "chunyun" (春运)?',
      [
        ['Une marque de train', 'A train brand'],
        ['Le plus grand mouvement de population au monde', 'The world\'s largest human migration'],
        ['Un plat traditionnel', 'A traditional dish'],
        ['Une danse du Nouvel An', 'A New Year dance']
      ],
      1,
      '« 世界上规模最大的人口流动 » — la plus grande migration du monde.',
      '"世界上规模最大的人口流动" — the world\'s largest population movement.'
    ),
    q(
      'Pourquoi le poisson est-il toujours sur la table du réveillon ?',
      'Why is fish always on the New Year\'s Eve table?',
      [
        ['Parce qu\'il est bon marché', 'Because it is cheap'],
        ['Parce que 鱼 sonne comme 余 (surplus)', 'Because 鱼 sounds like 余 ("surplus")'],
        ['Parce qu\'il est facile à cuisiner', 'Because it is easy to cook'],
        ['Pour décorer la table', 'For decoration only']
      ],
      1,
      'Jeu homophonique : 鱼 (poisson) ≈ 余 (surplus) → « 年年有余 ».',
      'Homophone pun: 鱼 (fish) ≈ 余 (surplus) → "abundance every year".'
    ),
    q(
      'Que reçoivent les enfants à minuit ?',
      'What do children receive at midnight?',
      [
        ['Des bonbons', 'Sweets'],
        ['Des hongbao (enveloppes rouges)', 'Hongbao (red envelopes)'],
        ['Des livres', 'Books'],
        ['Des jouets en bois', 'Wooden toys']
      ],
      1,
      '« 孩子收到红包 » — les fameuses enveloppes rouges.',
      '"孩子收到红包" — the famous red envelopes.'
    ),
    q(
      'Quelle est l\'idée centrale du texte ?',
      'What is the main idea of the text?',
      [
        ['La fête est en déclin', 'The festival is fading away'],
        ['Le Nouvel An symbolise le retour aux racines familiales', 'New Year stands for returning to family roots'],
        ['Les jeunes n\'y participent plus', 'Young people skip it'],
        ['La fête est purement commerciale', 'It is purely commercial']
      ],
      1,
      'Le texte met l\'accent sur le retour et les retrouvailles familiales.',
      'The text stresses returning home and family reunion.'
    )
  ],

  // ==========================================================
  //  B1.2
  // ==========================================================
  'rd-b12-gaokao': [
    q(
      'Combien d\'étudiants passent le gaokao chaque année ?',
      'How many students take the gaokao each year?',
      [
        ['Plus d\'un million', 'Over 1 million'],
        ['Plus de 5 millions', 'Over 5 million'],
        ['Plus de 10 millions', 'Over 10 million'],
        ['Plus de 50 millions', 'Over 50 million']
      ],
      2,
      '« 超过一千万学生参加 » — plus de 10 millions.',
      '"超过一千万学生参加" — over 10 million students.'
    ),
    q(
      'Que signifie « 千军万马过独木桥 » dans ce contexte ?',
      'What does "千军万马过独木桥" mean here?',
      [
        ['Une bataille militaire', 'A military battle'],
        ['Une concurrence féroce sur une voie étroite', 'Fierce competition through a narrow path'],
        ['Un pont à péage', 'A toll bridge'],
        ['Une expression de joie', 'An expression of joy']
      ],
      1,
      'L\'image : armée immense qui s\'engage sur un pont d\'une seule planche.',
      'Image: a vast army crossing a single-plank bridge.'
    ),
    q(
      'Combien d\'heures par jour étudient certains lycéens ?',
      'How many hours per day do some students study?',
      [
        ['4 à 5 heures', '4 to 5 hours'],
        ['6 à 8 heures', '6 to 8 hours'],
        ['10 heures et plus', '10+ hours'],
        ['Toute la nuit seulement', 'Only all night']
      ],
      2,
      '« 每天学习十几个小时 » — plus de dix heures par jour.',
      '"每天学习十几个小时" — over ten hours per day.'
    ),
    q(
      'Quel mois a lieu le gaokao ?',
      'In which month does the gaokao take place?',
      [
        ['Mars', 'March'],
        ['Juin', 'June'],
        ['Septembre', 'September'],
        ['Décembre', 'December']
      ],
      1,
      '« 每年六月 » — chaque année en juin.',
      '"每年六月" — every June.'
    )
  ],

  'rd-b12-delivery': [
    q(
      'Combien de temps faut-il pour livrer un repas, dans les meilleurs cas ?',
      'How fast can a meal be delivered at best?',
      [
        ['10 minutes', '10 minutes'],
        ['30 minutes', '30 minutes'],
        ['1 heure', '1 hour'],
        ['2 heures', '2 hours']
      ],
      1,
      '« 三十分钟以内，骑手就把饭送到门口 » — moins de 30 min.',
      '"三十分钟以内，骑手就把饭送到门口" — under 30 minutes.'
    ),
    q(
      'Quel problème pose la pression sur les livreurs ?',
      'What problem does the pressure on riders cause?',
      [
        ['Ils refusent de livrer', 'They refuse to deliver'],
        ['Ils brûlent les feux rouges', 'They run red lights'],
        ['Ils volent les commandes', 'They steal orders'],
        ['Ils ne parlent pas chinois', 'They don\'t speak Chinese']
      ],
      1,
      '« 为了准时送达，会闯红灯 » — ils brûlent les feux pour être à l\'heure.',
      '"为了准时送达，会闯红灯" — they run red lights to be on time.'
    ),
    q(
      'Quelle initiative écologique est mentionnée ?',
      'What ecological initiative is mentioned?',
      [
        ['Livraison à vélo électrique', 'E-bike delivery'],
        ['Option « pas de couverts jetables »', '"No disposable cutlery" option'],
        ['Emballages biodégradables', 'Biodegradable packaging'],
        ['Plantation d\'arbres', 'Tree planting']
      ],
      1,
      '« 不要一次性餐具 » — option à cocher pour réduire le plastique.',
      '"不要一次性餐具" — a checkbox to skip single-use cutlery.'
    ),
    q(
      'Quel jugement global le texte porte-t-il sur ces apps ?',
      'What is the overall judgment of the text on these apps?',
      [
        ['Uniquement positif', 'Purely positive'],
        ['Uniquement négatif', 'Purely negative'],
        ['Nuancé : pratique mais à coût humain et écologique', 'Mixed: convenient but with a human and ecological cost'],
        ['Sans avis', 'No opinion']
      ],
      2,
      'Le texte salue la praticité mais soulève la pression sur les coursiers et le plastique.',
      'The text praises convenience but flags pressure on riders and plastic waste.'
    )
  ],

  'rd-b12-change-moon': [
    q(
      'Combien de soleils brûlaient la terre au début du conte ?',
      'How many suns were scorching the earth at the start of the tale?',
      [
        ['3', '3'], ['7', '7'], ['10', '10'], ['12', '12']
      ],
      2,
      '« 天上有十个太阳 » — dix soleils.',
      '"天上有十个太阳" — ten suns.'
    ),
    q(
      'Qui abat les soleils ?',
      'Who shoots down the suns?',
      [
        ['Chang\'e', 'Chang\'e'],
        ['Hou Yi', 'Hou Yi'],
        ['L\'Empereur de Jade', 'The Jade Emperor'],
        ['Un dragon', 'A dragon']
      ],
      1,
      '« 后羿，用箭射下了九个太阳 » — Hou Yi, neuf soleils sur dix.',
      '"后羿，用箭射下了九个太阳" — Hou Yi shoots down nine suns.'
    ),
    q(
      'Que reçoit Hou Yi de l\'immortel ?',
      'What does Hou Yi receive from the immortal?',
      [
        ['Un arc magique', 'A magical bow'],
        ['Un élixir d\'immortalité', 'An elixir of immortality'],
        ['Un livre sacré', 'A sacred book'],
        ['Une épée', 'A sword']
      ],
      1,
      '« 一包长生不老的仙药 » — un paquet d\'élixir d\'immortalité.',
      '"一包长生不老的仙药" — a packet of immortality elixir.'
    ),
    q(
      'Pourquoi Chang\'e s\'envole-t-elle vers la Lune ?',
      'Why does Chang\'e fly to the Moon?',
      [
        ['Pour fuir un voleur en buvant l\'élixir', 'To escape a thief by drinking the elixir'],
        ['Par jalousie envers Hou Yi', 'Out of jealousy of Hou Yi'],
        ['Pour exaucer un vœu', 'To make a wish'],
        ['Par accident, en tombant', 'By accident, falling']
      ],
      0,
      'Pour empêcher l\'élixir de tomber entre de mauvaises mains, Chang\'e le boit et s\'envole.',
      'To keep the elixir away from a thief, Chang\'e drinks it and rises to the Moon.'
    )
  ],

  // ==========================================================
  //  B2.1 — analyse / cause
  // ==========================================================
  'rd-b21-environment': [
    q(
      'Quels sont les « doubles objectifs carbone » de la Chine ?',
      'What are China\'s "double carbon" goals?',
      [
        ['Pic en 2030, neutralité en 2060', 'Peak in 2030, neutrality in 2060'],
        ['Pic en 2025, neutralité en 2050', 'Peak in 2025, neutrality in 2050'],
        ['Pic en 2040, neutralité en 2080', 'Peak in 2040, neutrality in 2080'],
        ['Pic en 2030, neutralité en 2100', 'Peak in 2030, neutrality in 2100']
      ],
      0,
      '« 2030年碳达峰，2060年碳中和 » — 碳达峰 2030, 碳中和 2060.',
      '"2030年碳达峰，2060年碳中和" — peak 2030, neutrality 2060.'
    ),
    q(
      'Dans quelle énergie la Chine est-elle classée numéro 1 ?',
      'In which energy is China ranked #1?',
      [
        ['Le nucléaire', 'Nuclear'],
        ['Le solaire', 'Solar'],
        ['L\'éolien', 'Wind'],
        ['L\'hydraulique', 'Hydro']
      ],
      1,
      '« 不但在太阳能方面世界第一 » — solaire = n° 1 mondial.',
      '"不但在太阳能方面世界第一" — #1 in solar globally.'
    ),
    q(
      'Quelle énergie reste prédominante malgré la transition ?',
      'Which energy still dominates despite the transition?',
      [
        ['Le gaz naturel', 'Natural gas'],
        ['Le pétrole', 'Oil'],
        ['Le charbon', 'Coal'],
        ['La géothermie', 'Geothermal']
      ],
      2,
      '« 仍然依赖大量煤炭 » — encore très dépendante du charbon.',
      '"仍然依赖大量煤炭" — still relies heavily on coal.'
    ),
    q(
      'Quel est le ton de l\'article ?',
      'What is the article\'s tone?',
      [
        ['Optimiste sans réserve', 'Unreservedly optimistic'],
        ['Pessimiste sans nuance', 'Bluntly pessimistic'],
        ['Nuancé : ambitions réelles, mais contradictions', 'Mixed: real ambitions, but contradictions'],
        ['Polémique', 'Polemical']
      ],
      2,
      'Le texte salue les ambitions ET pointe la dépendance au charbon.',
      'The piece praises ambitions and also flags coal dependence.'
    )
  ],

  'rd-b21-ai-work': [
    q(
      'Quel pourcentage de métiers serait affecté par l\'IA, selon McKinsey ?',
      'What share of jobs will be affected by AI, per McKinsey?',
      [
        ['30 %', '30%'], ['60 %', '60%'], ['80 %', '80%'], ['95 %', '95%']
      ],
      1,
      '« 大约百分之六十的职业会受到人工智能的影响 ».',
      '"大约百分之六十的职业会受到人工智能的影响".'
    ),
    q(
      'Et combien seront entièrement remplacés ?',
      'And how many will be fully replaced?',
      [
        ['Plus de 50 %', 'More than 50%'],
        ['Environ 30 %', 'Around 30%'],
        ['Moins de 10 %', 'Less than 10%'],
        ['Aucun', 'None']
      ],
      2,
      '« 完全被取代的不到百分之十 » — moins de 10 %.',
      '"完全被取代的不到百分之十" — under 10%.'
    ),
    q(
      'Quel nouveau métier l\'article cite-t-il ?',
      'Which new profession is cited?',
      [
        ['Architecte cloud', 'Cloud architect'],
        ['Concepteur de prompts', 'Prompt designer'],
        ['Comptable IA', 'AI accountant'],
        ['Pilote drone', 'Drone pilot']
      ],
      1,
      '« 提示词设计师 » — designer de prompts.',
      '"提示词设计师" — prompt designer.'
    ),
    q(
      'Quelle métaphore l\'article utilise-t-il pour décrire l\'IA ?',
      'What metaphor does the article use for AI?',
      [
        ['Une vague', 'A wave'],
        ['Une épée à double tranchant', 'A double-edged sword'],
        ['Un train sans frein', 'A train without brakes'],
        ['Une montagne à gravir', 'A mountain to climb']
      ],
      1,
      '« 它是一把双刃剑 » — épée à double tranchant.',
      '"它是一把双刃剑" — a double-edged sword.'
    )
  ],

  'rd-b21-post-pandemic-economy': [
    q(
      'Quel a été le taux de croissance du PIB chinois cité ?',
      'What GDP growth rate is mentioned?',
      [
        ['2,1 %', '2.1%'], ['4,6 %', '4.6%'], ['6,5 %', '6.5%'], ['8,2 %', '8.2%']
      ],
      1,
      '« 增长率只有百分之四点六 » — 4,6 %.',
      '"增长率只有百分之四点六" — 4.6%.'
    ),
    q(
      'Quel est le taux de chômage des jeunes mentionné ?',
      'What is the youth unemployment rate mentioned?',
      [
        ['Sous 5 %', 'Under 5%'],
        ['Autour de 10 %', 'Around 10%'],
        ['Au-dessus de 15 %', 'Above 15%'],
        ['Au-dessus de 25 %', 'Above 25%']
      ],
      2,
      '« 青年失业率却保持在百分之十五以上 » — au-dessus de 15 %.',
      '"青年失业率却保持在百分之十五以上" — over 15%.'
    ),
    q(
      'Quel facteur structurel freine la croissance ?',
      'What structural factor is slowing growth?',
      [
        ['La guerre', 'War'],
        ['Le vieillissement', 'Population aging'],
        ['Les sanctions occidentales', 'Western sanctions'],
        ['Le changement climatique', 'Climate change']
      ],
      1,
      '« 老龄化使劳动力减少 » — population vieillissante.',
      '"老龄化使劳动力减少" — aging reduces the workforce.'
    ),
    q(
      'Quel secteur connaît une croissance des exports de +20 % ?',
      'Which sector grows exports by +20%?',
      [
        ['Le textile', 'Textiles'],
        ['Les voitures électriques, batteries, solaire', 'EVs, batteries, solar'],
        ['L\'agriculture', 'Agriculture'],
        ['Le tourisme', 'Tourism']
      ],
      1,
      'Le texte évoque les « nouvelles énergies » : VE, batteries, solaire.',
      'The text refers to the "new energy" trio: EVs, batteries, solar.'
    )
  ],

  'rd-b21-analects-excerpt': [
    q(
      'Que célèbre la maxime « 学而时习之，不亦说乎 » ?',
      'What does "学而时习之，不亦说乎" celebrate?',
      [
        ['La compétition scolaire', 'Academic competition'],
        ['Le plaisir d\'apprendre et de pratiquer', 'The joy of learning and practising'],
        ['Le respect des aînés', 'Respect for elders'],
        ['La discipline militaire', 'Military discipline']
      ],
      1,
      'Apprendre puis pratiquer régulièrement — quelle joie !',
      'To learn and practise it constantly — what a joy.'
    ),
    q(
      'Que conseille la maxime « 温故而知新 » ?',
      'What does "温故而知新" advise?',
      [
        ['Réviser le passé pour comprendre le neuf', 'Revisit the past to grasp the new'],
        ['Oublier le passé', 'Forget the past'],
        ['Voyager loin', 'Travel far'],
        ['Lire vite', 'Read fast']
      ],
      0,
      '温 = revisiter, 故 = ancien — relire l\'ancien pour saisir le neuf.',
      'Revisit the old, learn the new.'
    ),
    q(
      'Que dit « 三人行，必有我师焉 » ?',
      'What does "三人行，必有我师焉" say?',
      [
        ['Trois personnes valent mieux qu\'une', 'Three are better than one'],
        ['Parmi trois personnes, il y aura toujours un maître pour moi', 'Among three people, one will always be my teacher'],
        ['Les enseignants travaillent en trio', 'Teachers work in trios'],
        ['On apprend seul', 'One learns alone']
      ],
      1,
      'Humilité confucéenne : un peut toujours apprendre des autres.',
      'Confucian humility: one can always learn from others.'
    ),
    q(
      'Quel thème unit ces trois maximes ?',
      'What theme ties the three maxims?',
      [
        ['La piété filiale', 'Filial piety'],
        ['L\'apprentissage continu et humble', 'Lifelong, humble learning'],
        ['Le gouvernement idéal', 'Ideal government'],
        ['La discipline militaire', 'Military discipline']
      ],
      1,
      'Apprentissage permanent + humilité : cœur de la pensée confucéenne.',
      'Lifelong learning and humility — the heart of Confucian thought.'
    )
  ],

  'rd-b21-aging-society': [
    q(
      'Combien de personnes ont plus de 60 ans en Chine ?',
      'How many people are over 60 in China?',
      [
        ['Plus de 80 millions', 'Over 80 million'],
        ['Plus de 180 millions', 'Over 180 million'],
        ['Plus de 280 millions', 'Over 280 million'],
        ['Plus de 380 millions', 'Over 380 million']
      ],
      2,
      '« 已经超过了两亿八千万 » — plus de 280 millions.',
      '"已经超过了两亿八千万" — over 280 million.'
    ),
    q(
      'Quelle proportion de la population cela représente-t-il ?',
      'What share of the population is that?',
      [
        ['1 sur 10', '1 in 10'],
        ['1 sur 5', '1 in 5'],
        ['1 sur 3', '1 in 3'],
        ['1 sur 2', '1 in 2']
      ],
      1,
      '« 每五个中国人中，就有一个是老年人 » — 1 sur 5.',
      '"每五个中国人中，就有一个是老年人" — 1 in 5.'
    ),
    q(
      'Quelle politique a été ouverte pour relancer la natalité ?',
      'Which policy was opened to boost births?',
      [
        ['Un seul enfant', 'One-child'],
        ['Deux enfants autorisés', 'Two children allowed'],
        ['Trois enfants autorisés', 'Three children allowed'],
        ['Quotas par province', 'Provincial quotas']
      ],
      2,
      '« 三孩政策 » — politique des trois enfants.',
      '"三孩政策" — three-child policy.'
    ),
    q(
      'Quel constat le texte fait-il sur cette politique ?',
      'What does the text say about its effect?',
      [
        ['Elle a inversé la tendance', 'It reversed the trend'],
        ['Son effet n\'est pas évident', 'Its effect is not obvious'],
        ['Elle a doublé la natalité', 'It doubled the birth rate'],
        ['Elle a été abandonnée', 'It was abandoned']
      ],
      1,
      '« 效果并不明显 » — effet pas franchement visible.',
      '"效果并不明显" — the effect is not clearly visible.'
    )
  ],

  'rd-b21-wukong-heaven': [
    q(
      'Quel objet Sun Wukong prend-il au palais du Roi-Dragon ?',
      'What does Sun Wukong take from the Dragon King\'s palace?',
      [
        ['Une couronne', 'A crown'],
        ['Le bâton magique de 13 500 jin', 'The magic staff of 13,500 jin'],
        ['Une tortue d\'or', 'A golden turtle'],
        ['Une perle céleste', 'A heavenly pearl']
      ],
      1,
      '« 拿走了重一万三千五百斤的金箍棒 » — le 金箍棒.',
      '"拿走了重一万三千五百斤的金箍棒" — the Ruyi Jingu Bang.'
    ),
    q(
      'Quel rôle l\'Empereur de Jade lui donne-t-il d\'abord ?',
      'What role does the Jade Emperor give him first?',
      [
        ['Premier ministre', 'Prime minister'],
        ['Garde des écuries célestes (« 弼马温 »)', 'Keeper of the heavenly stables ("弼马温")'],
        ['Général des armées', 'Army general'],
        ['Maître des cuisines', 'Master of kitchens']
      ],
      1,
      '« 弼马温 » : un titre humiliant, gardien des chevaux.',
      '"弼马温": a humiliating title, horse-keeper.'
    ),
    q(
      'Qui finit par maîtriser Sun Wukong ?',
      'Who eventually subdues Sun Wukong?',
      [
        ['Lao Tseu', 'Laozi'],
        ['Le Bouddha Tathāgata', 'Buddha Tathāgata'],
        ['Guanyin', 'Guanyin'],
        ['Xuanzang', 'Xuanzang']
      ],
      1,
      '« 请如来佛祖出面 » — c\'est le Tathāgata qui l\'enferme.',
      '"请如来佛祖出面" — Tathāgata seals him under the mountain.'
    ),
    q(
      'Où est-il emprisonné à la fin de l\'extrait ?',
      'Where is he imprisoned at the end of the excerpt?',
      [
        ['Au Mont Tai', 'Mount Tai'],
        ['Sous la Montagne aux Cinq Doigts', 'Under Five Fingers Mountain'],
        ['Dans la Mer du Sud', 'In the South Sea'],
        ['Au Palais céleste', 'In the Heavenly Palace']
      ],
      1,
      '« 压在五指山下 » — sous la 五指山.',
      '"压在五指山下" — under the Five Fingers Mountain.'
    )
  ],

  'rd-b21-cowherd-weaver': [
    q(
      'Qui est la Tisserande dans le conte ?',
      'Who is the Weaver Girl in the tale?',
      [
        ['Une princesse mortelle', 'A mortal princess'],
        ['La fille de l\'Empereur de Jade', 'The Jade Emperor\'s daughter'],
        ['Une déesse de la mer', 'A sea goddess'],
        ['Une fée des fleurs', 'A flower fairy']
      ],
      1,
      '« 她是天帝的女儿 » — fille de l\'Empereur de Jade.',
      '"她是天帝的女儿" — the Jade Emperor\'s daughter.'
    ),
    q(
      'Qu\'est-ce que la Reine-Mère trace dans le ciel ?',
      'What does the Queen Mother draw across the sky?',
      [
        ['Une muraille de feu', 'A wall of fire'],
        ['La Voie lactée comme rivière infranchissable', 'The Milky Way as an uncrossable river'],
        ['Un nuage opaque', 'An opaque cloud'],
        ['Une montagne de glace', 'A mountain of ice']
      ],
      1,
      '« 划出一条滔滔银河将两人永远隔开 » — la 银河 (Voie lactée).',
      '"划出一条滔滔银河将两人永远隔开" — the 银河 (Milky Way).'
    ),
    q(
      'Quel jour les amants se retrouvent-ils chaque année ?',
      'On what day do the lovers reunite each year?',
      [
        ['Le 1er du 1er mois lunaire', '1st of the 1st lunar month'],
        ['Le 7e du 7e mois lunaire', '7th of the 7th lunar month'],
        ['Le 15 du 8e mois lunaire', '15th of the 8th lunar month'],
        ['Le 9 du 9e mois lunaire', '9th of the 9th lunar month']
      ],
      1,
      'Le « 七夕 » — 7e jour du 7e mois lunaire.',
      'Qixi — 7th day of the 7th lunar month.'
    ),
    q(
      'Qui forme le pont qui permet leur réunion ?',
      'Who forms the bridge that lets them meet?',
      [
        ['Des dragons d\'eau', 'Water dragons'],
        ['Des pies (喜鹊)', 'Magpies (喜鹊)'],
        ['Des nuages', 'Clouds'],
        ['Des étoiles', 'Stars']
      ],
      1,
      '« 成千上万的喜鹊 » — les pies forment le 鹊桥.',
      '"成千上万的喜鹊" — magpies form the 鹊桥.'
    )
  ],

  // ==========================================================
  //  B2.2
  // ==========================================================
  'rd-b22-intangible-heritage': [
    q(
      'Quelle ville est associée à la porcelaine dans le texte ?',
      'Which city is linked to porcelain in the text?',
      [
        ['Suzhou', 'Suzhou'],
        ['Jingdezhen', 'Jingdezhen'],
        ['Hangzhou', 'Hangzhou'],
        ['Foshan', 'Foshan']
      ],
      1,
      '« 景德镇的陶瓷 » — porcelaine de Jingdezhen.',
      '"景德镇的陶瓷" — porcelain from Jingdezhen.'
    ),
    q(
      'Depuis quelle année la liste nationale du PCI existe-t-elle ?',
      'When was the national intangible heritage list set up?',
      [
        ['1998', '1998'], ['2006', '2006'], ['2012', '2012'], ['2020', '2020']
      ],
      1,
      '« 自2006年起 » — depuis 2006.',
      '"自2006年起" — since 2006.'
    ),
    q(
      'Combien d\'éléments figurent sur la liste à ce jour ?',
      'How many items are on the list to date?',
      [
        ['Environ 500', 'Around 500'],
        ['Plus de 1 500', 'Over 1,500'],
        ['Plus de 5 000', 'Over 5,000'],
        ['Plus de 10 000', 'Over 10,000']
      ],
      1,
      '« 已有一千五百多个项目 » — plus de 1 500.',
      '"已有一千五百多个项目" — over 1,500.'
    ),
    q(
      'Quel défi central l\'article identifie-t-il ?',
      'What core challenge does the article point to?',
      [
        ['Le manque de musées', 'A lack of museums'],
        ['La transmission aux jeunes', 'Transmission to younger generations'],
        ['La concurrence étrangère', 'Foreign competition'],
        ['Le manque de matières premières', 'Lack of raw materials']
      ],
      1,
      'Le texte alerte sur la difficulté à transmettre aux générations suivantes.',
      'The text warns about transmitting these crafts to the next generation.'
    )
  ],

  'rd-b22-smart-city': [
    q(
      'Quelle initiative emblématique est citée pour Hangzhou ?',
      'Which flagship project is cited for Hangzhou?',
      [
        ['« Cerveau urbain » (城市大脑)', '"City Brain" (城市大脑)'],
        ['« Zone verte »', '"Green Zone"'],
        ['« Métro 5G »', '"5G Subway"'],
        ['« Tour solaire »', '"Solar Tower"']
      ],
      0,
      '« 杭州的"城市大脑" » — le City Brain.',
      '"杭州的"城市大脑"" — the City Brain.'
    ),
    q(
      'De combien le temps d\'intervention des ambulances a-t-il diminué ?',
      'By how much has ambulance response time dropped?',
      [
        ['10 %', '10%'], ['20 %', '20%'], ['30 % et plus', '30%+'], ['50 %', '50%']
      ],
      2,
      '« 缩短了三成以上 » — plus de 30 %.',
      '"缩短了三成以上" — by more than 30%.'
    ),
    q(
      'Quel risque le texte associe-t-il aux villes intelligentes ?',
      'Which risk does the text link to smart cities?',
      [
        ['La pollution sonore', 'Noise pollution'],
        ['La vie privée et la surveillance', 'Privacy and surveillance'],
        ['Le chômage massif', 'Mass unemployment'],
        ['La pénurie alimentaire', 'Food shortages']
      ],
      1,
      'Le texte évoque les implications pour la 隐私 (vie privée).',
      'The text discusses 隐私 (privacy) trade-offs.'
    ),
    q(
      'Vers quelles régions ce modèle s\'exporte-t-il ?',
      'Where is the model being exported?',
      [
        ['Asie du Sud-Est et Afrique', 'Southeast Asia and Africa'],
        ['Europe occidentale', 'Western Europe'],
        ['Amérique du Nord', 'North America'],
        ['Pôle Sud', 'Antarctica']
      ],
      0,
      '« 东南亚、非洲等地 » — Asie du Sud-Est et Afrique.',
      '"东南亚、非洲等地" — Southeast Asia and Africa.'
    )
  ],

  'rd-b22-white-snake': [
    q(
      'Où se déroule la rencontre de Bai Suzhen et Xu Xian ?',
      'Where do Bai Suzhen and Xu Xian first meet?',
      [
        ['Sur la Grande Muraille', 'On the Great Wall'],
        ['Au Lac de l\'Ouest (西湖), Pont brisé', 'At West Lake (西湖), Broken Bridge'],
        ['Au Mont Hua', 'On Mount Hua'],
        ['Au temple de Suzhou', 'At a Suzhou temple']
      ],
      1,
      '« 杭州西湖，小雨蒙蒙，…在断桥避雨 » — pont brisé du Lac de l\'Ouest.',
      '"杭州西湖…在断桥避雨" — Broken Bridge of West Lake.'
    ),
    q(
      'Quel objet permet leur rencontre ?',
      'What item triggers their meeting?',
      [
        ['Un poème', 'A poem'],
        ['Un parapluie prêté sous la pluie', 'An umbrella lent in the rain'],
        ['Un éventail', 'A fan'],
        ['Un livre tombé', 'A dropped book']
      ],
      1,
      'Xu Xian prête son parapluie à Bai Suzhen — début de l\'histoire d\'amour.',
      'Xu Xian lends his umbrella to Bai Suzhen — their love story begins.'
    ),
    q(
      'Qui est l\'antagoniste principal du conte ?',
      'Who is the main antagonist?',
      [
        ['Le Roi-Dragon', 'The Dragon King'],
        ['Le moine Fa Hai', 'Monk Fa Hai'],
        ['L\'Empereur de Jade', 'The Jade Emperor'],
        ['Xiao Qing', 'Xiao Qing']
      ],
      1,
      'Fa Hai (法海) traque Bai Suzhen et finira par l\'emprisonner.',
      'Fa Hai (法海) hunts Bai Suzhen and ultimately imprisons her.'
    ),
    q(
      'Sous quelle pagode Bai Suzhen est-elle emprisonnée ?',
      'Under which pagoda is Bai Suzhen sealed?',
      [
        ['Pagode de la Grue jaune', 'Yellow Crane Tower'],
        ['Pagode Leifeng (雷峰塔)', 'Leifeng Pagoda (雷峰塔)'],
        ['Pagode de la Grande Oie sauvage', 'Wild Goose Pagoda'],
        ['Pagode des Six Harmonies', 'Pagoda of Six Harmonies']
      ],
      1,
      '« 杭州西湖的雷峰塔下 » — sous la pagode Leifeng.',
      '"杭州西湖的雷峰塔下" — under Leifeng Pagoda.'
    )
  ],

  // ==========================================================
  //  C1.1 — inférence et thème
  // ==========================================================
  'rd-c11-hanfu-revival': [
    q(
      'D\'où vient le Hanfu, selon le texte ?',
      'Where does Hanfu originate, per the text?',
      [
        ['De la culture mandchoue', 'From Manchu culture'],
        ['De plus de 2000 ans de culture vestimentaire han', 'From over 2,000 years of Han clothing culture'],
        ['De l\'influence européenne', 'From European influence'],
        ['Des minorités du Sud', 'From southern minorities']
      ],
      1,
      '« 它源于汉族两千多年的衣冠文化 » — plus de deux millénaires.',
      '"它源于汉族两千多年的衣冠文化" — over two millennia.'
    ),
    q(
      'Quel canal a propulsé la mode du Hanfu ?',
      'Which channel boosted the Hanfu trend?',
      [
        ['Les magazines papier', 'Print magazines'],
        ['Les plateformes de courts métrages / réseaux sociaux', 'Short-video platforms / social media'],
        ['La télévision d\'État', 'State television'],
        ['Le bouche-à-oreille uniquement', 'Word of mouth only']
      ],
      1,
      '« 短视频平台上相关话题播放量已逾百亿 ».',
      '"短视频平台上相关话题播放量已逾百亿".'
    ),
    q(
      'Où le Hanfu apparaît-il aujourd\'hui ?',
      'Where does Hanfu appear today?',
      [
        ['Uniquement dans les musées', 'Only in museums'],
        ['Métro, parcs, mariages', 'Subway, parks, weddings'],
        ['Strictement dans les opéras', 'Strictly in operas'],
        ['Sur les podiums occidentaux seulement', 'Only on Western runways']
      ],
      1,
      '« 在地铁、公园甚至婚礼现场 ».',
      '"在地铁、公园甚至婚礼现场".'
    ),
    q(
      'Quel mouvement plus large le Hanfu incarne-t-il ?',
      'What broader movement does Hanfu embody?',
      [
        ['Une mode importée', 'An imported trend'],
        ['Une réappropriation identitaire par la jeunesse', 'A youth-led identity reclamation'],
        ['Un mouvement religieux', 'A religious movement'],
        ['Une révolte politique', 'A political revolt']
      ],
      1,
      'Texte = réappropriation culturelle / identitaire chez les jeunes.',
      'The article frames Hanfu as a youth-led cultural reappropriation.'
    )
  ],

  'rd-c11-laozi-wisdom': [
    q(
      'Combien de caractères contient le Dao De Jing ?',
      'How many characters in the Daodejing?',
      [
        ['Environ 1 000', 'About 1,000'],
        ['Environ 5 000', 'About 5,000'],
        ['Environ 10 000', 'About 10,000'],
        ['Environ 50 000', 'About 50,000']
      ],
      1,
      '« 五千多字 » — un peu plus de 5 000.',
      '"五千多字" — just over 5,000.'
    ),
    q(
      'À quoi Laozi compare-t-il la plus grande bonté ?',
      'What does Laozi compare the highest goodness to?',
      [
        ['À la montagne', 'A mountain'],
        ['À l\'eau (上善若水)', 'Water (上善若水)'],
        ['Au feu', 'Fire'],
        ['Au vent', 'Wind']
      ],
      1,
      '« 上善若水 » — la bonté suprême est comme l\'eau.',
      '"上善若水" — the highest good is like water.'
    ),
    q(
      'Qui est vraiment « éclairé » selon Laozi ?',
      'Who is truly "enlightened" per Laozi?',
      [
        ['Celui qui connaît les autres', 'Who knows others'],
        ['Celui qui se connaît lui-même (自知者明)', 'Who knows themselves (自知者明)'],
        ['Celui qui possède des livres', 'Who owns books'],
        ['Celui qui voyage', 'Who travels']
      ],
      1,
      '« 自知者明 » — la connaissance de soi est la vraie lumière.',
      '"自知者明" — self-knowledge is the true light.'
    ),
    q(
      'Quel est le message global du texte ?',
      'What is the overall message?',
      [
        ['La sagesse antique reste pertinente aujourd\'hui', 'Ancient wisdom still applies today'],
        ['Le taoïsme est dépassé', 'Taoism is outdated'],
        ['Il faut tout réformer', 'Everything must be reformed'],
        ['Laozi n\'a jamais existé', 'Laozi never existed']
      ],
      0,
      'Le titre même — « Laozi parle encore » — pose cette thèse.',
      'The very title "Laozi still speaks" sets the thesis.'
    )
  ],

  'rd-c11-butterfly-lovers': [
    q(
      'Sous quelle dynastie se déroule l\'histoire ?',
      'Under which dynasty does the story take place?',
      [
        ['Tang', 'Tang'],
        ['Jin orientaux (东晋)', 'Eastern Jin (东晋)'],
        ['Ming', 'Ming'],
        ['Qing', 'Qing']
      ],
      1,
      '« 东晋年间 » — sous les Jin orientaux.',
      '"东晋年间" — during the Eastern Jin.'
    ),
    q(
      'Pourquoi Zhu Yingtai se déguise-t-elle en homme ?',
      'Why does Zhu Yingtai disguise herself as a man?',
      [
        ['Pour fuir un mariage', 'To flee marriage'],
        ['Pour pouvoir étudier', 'To be allowed to study'],
        ['Pour faire la guerre', 'To go to war'],
        ['Pour voyager seule', 'To travel alone']
      ],
      1,
      '« 因是女子，不得入学 » — les femmes n\'avaient pas accès à l\'école.',
      '"因是女子，不得入学" — women were barred from school.'
    ),
    q(
      'Combien de temps étudient-ils ensemble ?',
      'How long do they study together?',
      [
        ['Un an', 'One year'],
        ['Trois ans', 'Three years'],
        ['Cinq ans', 'Five years'],
        ['Dix ans', 'Ten years']
      ],
      1,
      '« 三年同窗 » — trois années d\'études côte à côte.',
      '"三年同窗" — three years studying side by side.'
    ),
    q(
      'En quoi se transforment-ils à la fin ?',
      'What do they turn into at the end?',
      [
        ['En deux étoiles', 'Two stars'],
        ['En deux papillons', 'Two butterflies'],
        ['En deux fleurs', 'Two flowers'],
        ['En deux dragons', 'Two dragons']
      ],
      1,
      '« 飞出一对彩蝶 » — un couple de papillons multicolores.',
      '"飞出一对彩蝶" — a pair of colourful butterflies.'
    ),
    q(
      'Quel est le thème central du récit ?',
      'What is the central theme?',
      [
        ['La guerre et l\'honneur', 'War and honour'],
        ['L\'amour interdit et la métamorphose libératrice', 'Forbidden love and liberating metamorphosis'],
        ['Le pouvoir politique', 'Political power'],
        ['Le commerce maritime', 'Maritime trade']
      ],
      1,
      'Amour contrarié → métamorphose en papillons = libération symbolique.',
      'Thwarted love → metamorphosis into butterflies = symbolic liberation.'
    )
  ],

  // ==========================================================
  //  C1.2
  // ==========================================================
  'rd-c12-china-france': [
    q(
      'Qui a établi les relations diplomatiques en 1964 ?',
      'Who established diplomatic relations in 1964?',
      [
        ['Mitterrand', 'Mitterrand'],
        ['De Gaulle', 'De Gaulle'],
        ['Chirac', 'Chirac'],
        ['Pompidou', 'Pompidou']
      ],
      1,
      '« 1964年，戴高乐将军 » — le général de Gaulle.',
      '"1964年，戴高乐将军" — General de Gaulle.'
    ),
    q(
      'Quels sont les trois piliers économiques cités ?',
      'Which three economic pillars are cited?',
      [
        ['Pharmacie, défense, agroalimentaire', 'Pharma, defence, food'],
        ['Aéronautique, nucléaire, luxe', 'Aerospace, nuclear, luxury'],
        ['Automobile, mode, IT', 'Automotive, fashion, IT'],
        ['Énergie, banque, télécom', 'Energy, banking, telecom']
      ],
      1,
      '« 空中客车、核电和奢侈品 » — Airbus, nucléaire, luxe.',
      '"空中客车、核电和奢侈品" — Airbus, nuclear, luxury.'
    ),
    q(
      'Quel événement culturel récurrent est mentionné ?',
      'What recurring cultural event is mentioned?',
      [
        ['Festival de Cannes', 'Cannes Festival'],
        ['« Année culturelle sino-française »', '"China–France Cultural Year"'],
        ['Foire du Livre de Pékin', 'Beijing Book Fair'],
        ['Exposition de Shanghai', 'Shanghai Expo']
      ],
      1,
      '« 中法文化年 » — Année culturelle sino-française.',
      '"中法文化年" — China–France Cultural Year.'
    ),
    q(
      'Quel ton l\'article adopte-t-il à propos de ces 60 ans ?',
      'What tone does the article take on these 60 years?',
      [
        ['Polémique', 'Polemical'],
        ['Bilan équilibré : continuité malgré les tensions', 'Balanced: continuity despite tensions'],
        ['Hagiographique', 'Hagiographic'],
        ['Hostile', 'Hostile']
      ],
      1,
      'Le texte met en avant des décennies de coopération avec les nuances actuelles.',
      'The piece foregrounds decades of cooperation, with current nuances.'
    )
  ],

  'rd-c12-education-21c': [
    q(
      'Autour de quoi l\'éducation chinoise s\'est-elle organisée ?',
      'What did Chinese education historically revolve around?',
      [
        ['Le sport', 'Sports'],
        ['L\'examen', 'The exam'],
        ['Les arts', 'The arts'],
        ['Le service militaire', 'Military service']
      ],
      1,
      '« 围绕"考试"二字展开 » — autour du mot 考试.',
      '"围绕"考试"二字展开" — around the word 考试.'
    ),
    q(
      'Que désigne « 内卷 » dans le texte ?',
      'What does "内卷" refer to?',
      [
        ['L\'absence de compétition', 'No competition at all'],
        ['Une compétition épuisante à somme nulle', 'Zero-sum, exhausting competition'],
        ['Une fête traditionnelle', 'A traditional festival'],
        ['Un art martial', 'A martial art']
      ],
      1,
      '« 内卷 » = involution / compétition fermée et épuisante.',
      '"内卷" = involution / closed-loop exhausting competition.'
    ),
    q(
      'Quelles compétences l\'auteur juge essentielles désormais ?',
      'Which skills does the author deem essential now?',
      [
        ['Mémorisation et vitesse', 'Memorisation and speed'],
        ['Jugement et empathie', 'Judgment and empathy'],
        ['Discipline et obéissance', 'Discipline and obedience'],
        ['Calcul mental', 'Mental arithmetic']
      ],
      1,
      '« 判断力与共情能力 » — jugement + empathie.',
      '"判断力与共情能力" — judgment and empathy.'
    ),
    q(
      'Quelle conclusion défend l\'article ?',
      'What conclusion does the article defend?',
      [
        ['Maintenir le modèle actuel', 'Keep the current model'],
        ['Repenser l\'école pour préparer à l\'IA et au sens', 'Rethink school for the AI era and meaning'],
        ['Privatiser entièrement l\'école', 'Fully privatise schools'],
        ['Supprimer les diplômes', 'Abolish diplomas']
      ],
      1,
      'Le titre « L\'école de demain commence aujourd\'hui » résume la thèse.',
      'The title "Tomorrow\'s school starts today" sums up the thesis.'
    )
  ],

  'rd-c12-yingning-fox': [
    q(
      'Qui est l\'auteur du conte original ?',
      'Who is the original author?',
      [
        ['Cao Xueqin', 'Cao Xueqin'],
        ['Pu Songling', 'Pu Songling'],
        ['Wu Cheng\'en', 'Wu Cheng\'en'],
        ['Lu Xun', 'Lu Xun']
      ],
      1,
      '« 蒲松龄笔下 » — sous le pinceau de Pu Songling.',
      '"蒲松龄笔下" — by Pu Songling.'
    ),
    q(
      'Pendant quelle fête Wang Zifu rencontre-t-il Yingning ?',
      'During which festival does Wang Zifu meet Yingning?',
      [
        ['Fête de la Mi-Automne', 'Mid-Autumn Festival'],
        ['Fête des Lanternes (元宵节)', 'Lantern Festival (元宵节)'],
        ['Fête de la Pure Clarté', 'Qingming Festival'],
        ['Nouvel An lunaire', 'Lunar New Year']
      ],
      1,
      '« 元宵节偶遇她 » — Fête des Lanternes.',
      '"元宵节偶遇她" — Lantern Festival.'
    ),
    q(
      'Quelle est la véritable nature de Yingning ?',
      'What is Yingning\'s true nature?',
      [
        ['Une princesse mortelle', 'A mortal princess'],
        ['Un esprit-renard transformé en humaine', 'A fox-spirit reborn human'],
        ['Une déesse de la pluie', 'A rain goddess'],
        ['Une fée du printemps', 'A spring fairy']
      ],
      1,
      '« 山中狐灵，因善而转生人形 » — esprit-renard.',
      '"山中狐灵，因善而转生人形" — a fox-spirit reborn.'
    ),
    q(
      'Quel trait domine la personnalité de Yingning ?',
      'Which trait dominates Yingning\'s personality?',
      [
        ['La sévérité', 'Sternness'],
        ['Le rire et la naïveté', 'Laughter and naivety'],
        ['L\'arrogance', 'Arrogance'],
        ['La mélancolie', 'Melancholy']
      ],
      1,
      'Le titre français « la jeune femme qui rit » dit déjà tout.',
      'The very translation "the laughing girl" says it all.'
    ),
    q(
      'Quel est le thème central de ce conte fantastique ?',
      'What is the central theme of this tale?',
      [
        ['La vengeance', 'Revenge'],
        ['La rencontre entre humanité et surnaturel', 'Encounter between human and supernatural'],
        ['La guerre civile', 'Civil war'],
        ['La piraterie', 'Piracy']
      ],
      1,
      'Pu Songling explore le glissement entre humain et surnaturel.',
      'Pu Songling explores the porous border between human and supernatural.'
    )
  ],

  // ==========================================================
  //  C2 — interprétation littéraire
  // ==========================================================
  'rd-c21-river-and-time': [
    q(
      'À quel moment de la journée la scène se déroule-t-elle ?',
      'What time of day is the scene?',
      [
        ['L\'aube', 'Dawn'],
        ['Midi', 'Noon'],
        ['Le crépuscule', 'Dusk'],
        ['La nuit profonde', 'Late night']
      ],
      2,
      '« 傍晚 » + « 夕阳 » — fin de journée, crépuscule.',
      '"傍晚" + "夕阳" — dusk.'
    ),
    q(
      'Quelle citation de Confucius l\'auteur réutilise-t-il ?',
      'Which Confucius quote does the author reuse?',
      [
        ['« 学而时习之 »', '"学而时习之"'],
        ['« 逝者如斯夫，不舍昼夜 »', '"逝者如斯夫，不舍昼夜"'],
        ['« 仁者爱人 »', '"仁者爱人"'],
        ['« 知者乐水 »', '"知者乐水"']
      ],
      1,
      'Confucius au bord du fleuve : « le temps coule comme cette eau ».',
      'Confucius by the river: "time flows like this water".'
    ),
    q(
      'Quelle image clé l\'auteur utilise pour le fleuve ?',
      'Which key image does the author use for the river?',
      [
        ['Un miroir', 'A mirror'],
        ['Une rivière qui ne se retourne pas, n\'attend personne', 'A river that never turns back, never waits'],
        ['Un torrent de feu', 'A torrent of fire'],
        ['Une nappe immobile', 'A still pool']
      ],
      1,
      '« 江水…不回头，不解释，也不等人 ».',
      '"江水…不回头，不解释，也不等人".'
    ),
    q(
      'Que symbolise le fleuve dans cette méditation ?',
      'What does the river symbolise in this meditation?',
      [
        ['La richesse', 'Wealth'],
        ['Le temps qui passe', 'Passing time'],
        ['L\'amour perdu', 'Lost love'],
        ['Le pouvoir politique', 'Political power']
      ],
      1,
      'Classique chinois : le fleuve = le temps qui coule.',
      'Classic Chinese trope: river = passing time.'
    ),
    q(
      'Quel registre l\'auteur adopte-t-il ?',
      'Which register does the author use?',
      [
        ['Journalistique', 'Journalistic'],
        ['Lyrique-méditatif', 'Lyrical / meditative'],
        ['Sec et technique', 'Dry, technical'],
        ['Comique', 'Comedic']
      ],
      1,
      'Texte courte essai à la première personne, rêveur et poétique.',
      'Short first-person essay, dreamy and poetic.'
    )
  ],

  'rd-c21-mulan': [
    q(
      'Combien de rouleaux d\'enrôlement le khan envoie-t-il ?',
      'How many enrolment scrolls does the khan send?',
      [
        ['3', '3'], ['7', '7'], ['10', '10'], ['12', '12']
      ],
      3,
      '« 军书十二卷 » — douze rouleaux.',
      '"军书十二卷" — twelve scrolls.'
    ),
    q(
      'Pourquoi Mulan s\'enrôle-t-elle ?',
      'Why does Mulan enlist?',
      [
        ['Pour la gloire', 'For glory'],
        ['Pour épargner son vieux père', 'To spare her ageing father'],
        ['Pour fuir un mariage', 'To escape a marriage'],
        ['Pour devenir poète', 'To become a poet']
      ],
      1,
      'Mythe classique : se substituer au père trop vieux pour combattre.',
      'Classic motif: replacing the father, too old to fight.'
    ),
    q(
      'Combien d\'années passe-t-elle au combat ?',
      'How many years does she spend in battle?',
      [
        ['3', '3'], ['7', '7'], ['10', '10'], ['12', '12']
      ],
      3,
      '« 同行十二年 » — douze ans de service.',
      '"同行十二年" — twelve years of service.'
    ),
    q(
      'Que découvrent ses camarades à son retour ?',
      'What do her comrades discover when she returns?',
      [
        ['Qu\'elle est noble', 'That she is noble'],
        ['Qu\'elle est une femme', 'That she is a woman'],
        ['Qu\'elle est étrangère', 'That she is a foreigner'],
        ['Qu\'elle est analphabète', 'That she cannot read']
      ],
      1,
      '« 战友竟不知将军乃是女郎 » — ils ne savaient pas !',
      '"战友竟不知将军乃是女郎" — they had no idea!'
    ),
    q(
      'Quel message le poème délivre-t-il ?',
      'What message does the poem deliver?',
      [
        ['L\'honneur militaire d\'abord', 'Military honour first'],
        ['Une femme peut égaler un guerrier — piété filiale + courage', 'A woman can match a warrior — filial piety + courage'],
        ['La guerre est inévitable', 'War is inevitable'],
        ['Il faut servir le khan sans broncher', 'Serve the khan without question']
      ],
      1,
      'Mulan = piété filiale + bravoure féminine, message égalitaire avant l\'heure.',
      'Mulan stands for filial piety and female bravery — an early egalitarian note.'
    )
  ],

  'rd-c22-hometown': [
    q(
      'Combien d\'années le narrateur a-t-il été absent ?',
      'How many years has the narrator been away?',
      [
        ['10 ans', '10 years'], ['20 ans', '20 years'], ['30 ans', '30 years'], ['50 ans', '50 years']
      ],
      2,
      '« 三十年不回来 » — trente ans d\'absence.',
      '"三十年不回来" — thirty years away.'
    ),
    q(
      'Quel arbre marque l\'entrée du village ?',
      'Which tree marks the village entrance?',
      [
        ['Un saule', 'A willow'],
        ['Un vieux sophora (老槐树)', 'An old pagoda tree (老槐树)'],
        ['Un pin', 'A pine'],
        ['Un cerisier', 'A cherry tree']
      ],
      1,
      '« 村口那棵老槐树 » — vieux 槐 (sophora).',
      '"村口那棵老槐树" — old 槐 tree.'
    ),
    q(
      'Quel détail moderne perturbe la nostalgie du narrateur ?',
      'What modern detail disturbs the nostalgia?',
      [
        ['Les voitures électriques', 'Electric cars'],
        ['Le bruit des drones', 'The buzz of drones'],
        ['Les antennes 5G', '5G antennas'],
        ['Le wifi public', 'Public Wi-Fi']
      ],
      1,
      '« 多了无人机嗡嗡的回声 » — drones (无人机).',
      '"多了无人机嗡嗡的回声" — drones.'
    ),
    q(
      'Comment Oncle Wang accueille-t-il le narrateur ?',
      'How does Uncle Wang welcome the narrator?',
      [
        ['Avec un long discours', 'With a long speech'],
        ['En lui prenant la main, sans pouvoir parler', 'By taking his hand, unable to speak'],
        ['Avec colère', 'With anger'],
        ['Avec indifférence', 'With indifference']
      ],
      1,
      '« 一把抓住我的手，半天说不出一句完整的话 ».',
      '"一把抓住我的手，半天说不出一句完整的话".'
    ),
    q(
      'Quel est le sentiment dominant du texte ?',
      'What feeling dominates the text?',
      [
        ['L\'euphorie', 'Euphoria'],
        ['Une nostalgie douce-amère', 'Bittersweet nostalgia'],
        ['L\'indignation', 'Outrage'],
        ['L\'humour léger', 'Light humour']
      ],
      1,
      'Tradition + modernité, présence + manque → nostalgie douce-amère.',
      'Tradition vs. modernity, presence vs. loss → bittersweet nostalgia.'
    )
  ]
};

export const getReadingQuiz = (id: string): Q[] | null =>
  READING_QUIZZES[id] ?? null;
