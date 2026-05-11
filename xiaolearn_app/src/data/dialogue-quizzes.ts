/**
 * dialogue-quizzes.ts — Quiz QCM enrichi pour chaque dialogue
 * ------------------------------------------------------------
 * Une question = 4 propositions, 1 bonne réponse (answerIndex), explication
 * bilingue. Difficulté progressive selon le niveau CECR :
 *   - A1 / A2  : 3 questions, factuelles
 *   - B1.1     : 4 questions, factuel + déduction
 *   - B1.2     : 4 questions, détail + intention
 *   - B2.x     : 4-5 questions, analyse et inférence
 *
 * Le type est calqué sur ReadingComprehensionQuestion (de
 * src/types/lesson-structure.ts) — on le ré-importe pour rester strictement
 * compatible avec le composant QuizCard de ReadingPageV2.
 */
import type { ReadingComprehensionQuestion } from '../types/lesson-structure';

type Q = ReadingComprehensionQuestion;

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

export const DIALOGUE_QUIZZES: Record<string, Q[]> = {
  // ============================================================
  //  A1 — factuel direct
  // ============================================================
  'dlg-a1-hello': [
    q(
      'Comment s\'appelle l\'étudiante ?',
      'What is the female student\'s name?',
      [['Xiao Ming', 'Xiao Ming'], ['Wang Li', 'Wang Li'], ['Xiao Hong', 'Xiao Hong'], ['Li Hua', 'Li Hua']],
      1,
      '« 我叫王丽 » — elle s\'appelle Wang Li.',
      '"我叫王丽" — her name is Wang Li.'
    ),
    q(
      'Que disent-ils à la fin de l\'échange ?',
      'What do they say at the end?',
      [
        ['« Au revoir »', '"Goodbye"'],
        ['« Enchanté de te rencontrer »', '"Nice to meet you"'],
        ['« Bonne chance »', '"Good luck"'],
        ['« Bonne nuit »', '"Good night"']
      ],
      1,
      '« 很高兴认识你 » — formule classique pour conclure une présentation.',
      '"很高兴认识你" — the standard way to wrap up an introduction.'
    ),
    q(
      'Quelle formule utilise-t-on pour demander le prénom ?',
      'Which phrase asks someone\'s name?',
      [
        ['你好吗？', '你好吗？'],
        ['你叫什么名字？', '你叫什么名字？'],
        ['你几岁？', '你几岁？'],
        ['你忙吗？', '你忙吗？']
      ],
      1,
      '« 你叫什么名字？» = « comment t\'appelles-tu ? ».',
      '"你叫什么名字？" = "what is your name?".'
    )
  ],

  'dlg-a1-family': [
    q(
      'Combien de personnes y a-t-il dans la famille ?',
      'How many people are in the family?',
      [['Trois', 'Three'], ['Quatre', 'Four'], ['Cinq', 'Five'], ['Six', 'Six']],
      1,
      '« 我家有四个人 » — quatre personnes.',
      '"我家有四个人" — four people.'
    ),
    q(
      'Qui sont les membres de la famille ?',
      'Who is in the family?',
      [
        ['Père, mère, frère et moi', 'Dad, mom, brother and me'],
        ['Père, mère, grande sœur et moi', 'Dad, mom, big sister and me'],
        ['Grand-père, grand-mère, père et moi', 'Grandpa, grandma, dad and me'],
        ['Mère, sœur, oncle et moi', 'Mom, sister, uncle and me']
      ],
      1,
      '« 爸爸、妈妈、姐姐和我 » — papa, maman, grande sœur, moi.',
      '"爸爸、妈妈、姐姐和我" — dad, mom, big sister, me.'
    ),
    q(
      'Que fait la grande sœur dans la vie ?',
      'What does the big sister do?',
      [
        ['Elle est médecin', 'She is a doctor'],
        ['Elle est étudiante', 'She is a student'],
        ['Elle est professeure', 'She is a teacher'],
        ['Elle est ingénieure', 'She is an engineer']
      ],
      2,
      '« 她是老师 » — elle est professeure.',
      '"她是老师" — she is a teacher.'
    )
  ],

  // ============================================================
  //  A2
  // ============================================================
  'dlg-a2-restaurant': [
    q(
      'Quel plat est commandé ?',
      'Which dish is ordered?',
      [
        ['Du riz frit', 'Fried rice'],
        ['Du poulet Kung Pao avec du riz', 'Kung Pao chicken with rice'],
        ['Des nouilles au bœuf', 'Beef noodles'],
        ['Des raviolis', 'Dumplings']
      ],
      1,
      '« 宫保鸡丁和米饭 » — Kung Pao chicken + riz.',
      '"宫保鸡丁和米饭" — Kung Pao chicken + rice.'
    ),
    q(
      'Quelle boisson est demandée ?',
      'Which drink is requested?',
      [
        ['De la bière', 'A beer'],
        ['Un thé', 'A tea'],
        ['Un coca', 'A coke'],
        ['De l\'eau', 'Water']
      ],
      1,
      '« 请给我一杯茶 » — un verre de thé.',
      '"请给我一杯茶" — a cup of tea.'
    ),
    q(
      'Quel ton le client adopte-t-il ?',
      'How does the customer address the waiter?',
      [
        ['Très familier', 'Very casual'],
        ['Poli (请, 您, 谢谢)', 'Polite (请, 您, 谢谢)'],
        ['Pressé et sec', 'Hurried and curt'],
        ['Indifférent', 'Indifferent']
      ],
      1,
      'Le 您 et les « 请 / 谢谢 » donnent un ton respectueux.',
      'The 您 form and the "请 / 谢谢" markers signal a polite tone.'
    )
  ],

  'dlg-a2-metro': [
    q(
      'Quelle est la destination du touriste ?',
      'Where is the tourist heading?',
      [
        ['L\'aéroport', 'The airport'],
        ['Tian\'anmen', 'Tian\'anmen'],
        ['La Grande Muraille', 'The Great Wall'],
        ['Le Palais d\'Été', 'The Summer Palace']
      ],
      1,
      '« 到天安门怎么走？» — destination = Tian\'anmen.',
      '"到天安门怎么走？" — destination is Tian\'anmen.'
    ),
    q(
      'Quelle ligne doit-il prendre ?',
      'Which line should he take?',
      [
        ['La ligne 1', 'Line 1'],
        ['La ligne 2', 'Line 2'],
        ['La ligne 5', 'Line 5'],
        ['La ligne 10', 'Line 10']
      ],
      0,
      '« 坐一号线 » — ligne 1.',
      '"坐一号线" — line 1.'
    ),
    q(
      'Combien de temps faut-il environ ?',
      'How long does it roughly take?',
      [
        ['10 minutes', '10 minutes'],
        ['20 minutes', '20 minutes'],
        ['30 minutes', '30 minutes'],
        ['1 heure', '1 hour']
      ],
      1,
      '« 大概二十分钟 » — environ 20 min.',
      '"大概二十分钟" — about 20 minutes.'
    )
  ],

  'dlg-a2-hotel': [
    q(
      'Combien de nuits Monsieur Li reste-t-il ?',
      'How many nights is Mr Li staying?',
      [['1 nuit', '1 night'], ['2 nuits', '2 nights'], ['3 nuits', '3 nights'], ['1 semaine', '1 week']],
      2,
      '« 三个晚上 » — trois nuits.',
      '"三个晚上" — three nights.'
    ),
    q(
      'Quel type de chambre a-t-il réservé ?',
      'Which kind of room did he book?',
      [
        ['Double', 'Double'],
        ['Single (一人间)', 'Single (一人间)'],
        ['Suite', 'Suite'],
        ['Familiale', 'Family room']
      ],
      1,
      '« 单人间 » — chambre simple.',
      '"单人间" — single room.'
    ),
    q(
      'À quel étage se trouve sa chambre ?',
      'On which floor is his room?',
      [
        ['2e étage', '2nd floor'],
        ['6e étage', '6th floor'],
        ['8e étage', '8th floor'],
        ['10e étage', '10th floor']
      ],
      2,
      '« 八零六房间，在八楼 » — chambre 806, 8e étage.',
      '"八零六房间，在八楼" — room 806, 8th floor.'
    ),
    q(
      'À quelle heure est servi le petit-déjeuner ?',
      'When is breakfast served?',
      [
        ['De 6 h à 9 h', 'From 6 to 9 a.m.'],
        ['De 7 h à 10 h', 'From 7 to 10 a.m.'],
        ['De 8 h à 11 h', 'From 8 to 11 a.m.'],
        ['Toute la matinée', 'All morning']
      ],
      1,
      '« 七点到十点 » — 7 h–10 h.',
      '"七点到十点" — 7 a.m. to 10 a.m.'
    )
  ],

  // ============================================================
  //  B1.1
  // ============================================================
  'dlg-b11-interview': [
    q(
      'Quel âge a Li Hua ?',
      'How old is Li Hua?',
      [['22 ans', '22'], ['23 ans', '23'], ['24 ans', '24'], ['26 ans', '26']],
      2,
      '« 今年二十四岁 » — 24 ans.',
      '"今年二十四岁" — 24 years old.'
    ),
    q(
      'D\'où est-il diplômé ?',
      'Where did he graduate?',
      [
        ['Université Tsinghua', 'Tsinghua University'],
        ['Université de Pékin (北京大学)', 'Peking University (北京大学)'],
        ['Université Fudan', 'Fudan University'],
        ['Université de Wuhan', 'Wuhan University']
      ],
      1,
      '« 北京大学毕业 » — diplômé de l\'Université de Pékin.',
      '"北京大学毕业" — graduated from Peking University.'
    ),
    q(
      'Pourquoi postule-t-il dans cette entreprise ?',
      'Why is he applying to this company?',
      [
        ['Pour le salaire', 'For the salary'],
        ['Parce qu\'il s\'intéresse aux produits + spécialité adaptée', 'Interested in the products + matching major'],
        ['Pour la localisation', 'For the location'],
        ['Parce qu\'un ami l\'a recommandé', 'Because a friend referred him']
      ],
      1,
      '« 对贵公司的产品很感兴趣，而且我的专业很对口 ».',
      '"对贵公司的产品很感兴趣，而且我的专业很对口".'
    ),
    q(
      'Quelles qualités met-il en avant ?',
      'Which qualities does he highlight?',
      [
        ['Créativité et humour', 'Creativity and humour'],
        ['Sérieux et capacité d\'apprentissage', 'Diligence and quick learning'],
        ['Charisme et leadership', 'Charisma and leadership'],
        ['Discrétion et patience', 'Discretion and patience']
      ],
      1,
      '« 工作认真，学习能力也很强 ».',
      '"工作认真，学习能力也很强".'
    )
  ],

  // ============================================================
  //  B1.2
  // ============================================================
  'dlg-b12-generations': [
    q(
      'Quelle plateforme les 00后 préfèrent-ils, selon le dialogue ?',
      'Which platform do "00s" kids prefer in the dialogue?',
      [
        ['Weibo', 'Weibo'],
        ['Les vidéos courtes (短视频)', 'Short-videos (短视频)'],
        ['WeChat Moments', 'WeChat Moments'],
        ['Email', 'Email']
      ],
      1,
      '« 00后更喜欢刷短视频 » — TikTok-like short videos.',
      '"00后更喜欢刷短视频" — TikTok-like short videos.'
    ),
    q(
      'Et les 90后 ?',
      'And the "90s" kids?',
      [
        ['Les podcasts', 'Podcasts'],
        ['Weibo (微博)', 'Weibo (微博)'],
        ['LinkedIn', 'LinkedIn'],
        ['Les forums', 'Forums']
      ],
      1,
      '« 90后更习惯看微博 » — Weibo.',
      '"90后更习惯看微博" — Weibo.'
    ),
    q(
      'Quel comportement est associé aux 00后 ?',
      'Which behaviour is linked to "00s" kids?',
      [
        ['« 内卷 » (compétition acharnée)', '"内卷" (rat-race)'],
        ['« 躺平 » (s\'allonger / lâcher prise)', '"躺平" (lying flat)'],
        ['« 加班 » (faire des heures sup)', '"加班" (overtime)'],
        ['« 出国 » (partir à l\'étranger)', '"出国" (going abroad)']
      ],
      1,
      '« 00后更愿意"躺平" » — la culture du « tang ping ».',
      '"00后更愿意"躺平"" — the "tang ping" attitude.'
    ),
    q(
      'Que reconnaît la conversation à la fin ?',
      'What does the conversation acknowledge in the end?',
      [
        ['Une génération est paresseuse', 'One generation is lazy'],
        ['Chaque génération a sa propre pression', 'Every generation has its own pressure'],
        ['Internet est nocif', 'The internet is harmful'],
        ['Il faut tout changer', 'Everything must change']
      ],
      1,
      '« 每一代人都有自己的压力 » — chacun sa pression, ton équilibré.',
      '"每一代人都有自己的压力" — every generation has its own pressure.'
    )
  ],

  'dlg-b12-doctor': [
    q(
      'Quelle est la température du patient ?',
      'What is the patient\'s temperature?',
      [
        ['37,5 °C', '37.5 °C'],
        ['38,2 °C', '38.2 °C'],
        ['39,5 °C', '39.5 °C'],
        ['40 °C', '40 °C']
      ],
      1,
      '« 三十八度二 » — 38,2 °C.',
      '"三十八度二" — 38.2 °C.'
    ),
    q(
      'Quel examen le médecin prescrit-il ?',
      'Which test does the doctor order?',
      [
        ['Une IRM', 'An MRI'],
        ['Une numération sanguine (血常规)', 'A blood count (血常规)'],
        ['Une radio pulmonaire', 'A chest X-ray'],
        ['Aucun examen', 'No test']
      ],
      1,
      '« 我先给您开一个血常规 » — bilan sanguin standard.',
      '"我先给您开一个血常规" — a standard blood count.'
    ),
    q(
      'Combien de fois par jour faut-il prendre le médicament ?',
      'How often per day must the medicine be taken?',
      [
        ['1 fois', 'Once'],
        ['2 fois', 'Twice'],
        ['3 fois après les repas', 'Three times after meals'],
        ['4 fois', 'Four times']
      ],
      2,
      '« 一天三次，饭后吃，连续吃五天 ».',
      '"一天三次，饭后吃，连续吃五天".'
    ),
    q(
      'Quel conseil de vie le médecin donne-t-il ?',
      'What lifestyle advice does the doctor give?',
      [
        ['Faire beaucoup de sport', 'Exercise a lot'],
        ['Boire et se reposer, éviter les foules', 'Drink, rest and avoid crowds'],
        ['Manger pimenté', 'Eat spicy food'],
        ['Sortir au grand air', 'Get fresh air outdoors']
      ],
      1,
      '« 多喝水，少去人多的地方，暂时不要运动 ».',
      '"多喝水，少去人多的地方，暂时不要运动".'
    )
  ],

  // ============================================================
  //  B2.1 — analyse
  // ============================================================
  'dlg-b21-environment': [
    q(
      'Quel modèle Li recommande-t-il principalement ?',
      'Which model does Li mainly recommend?',
      [
        ['Tesla', 'Tesla'],
        ['BYD (比亚迪)', 'BYD (比亚迪)'],
        ['NIO', 'NIO'],
        ['Xpeng', 'Xpeng']
      ],
      1,
      '« 比亚迪的性价比最高 » — meilleur rapport qualité-prix.',
      '"比亚迪的性价比最高" — best value for money.'
    ),
    q(
      'Pourquoi acheter électrique à Shanghai est-il pertinent ?',
      'Why does electric make sense in Shanghai?',
      [
        ['Pas besoin d\'assurance', 'No insurance needed'],
        ['Plaque immatriculation thermique difficile + bornes en hausse', 'Combustion plate hard to get + charging stations spreading'],
        ['Voitures gratuites', 'Free cars'],
        ['Pas de circulation', 'No traffic']
      ],
      1,
      'Texte : 油车牌照难拿+ 充电站越来越方便.',
      'Text: combustion plates are hard to get + chargers becoming widespread.'
    ),
    q(
      'Quel inconvénient principal des VE est mentionné ?',
      'Which main downside of EVs is raised?',
      [
        ['Prix d\'achat', 'Purchase price'],
        ['Temps de charge plus long que de faire le plein', 'Charging takes longer than refuelling'],
        ['Sécurité', 'Safety'],
        ['Bruit', 'Noise']
      ],
      1,
      '« 充电时间还是比加油慢得多 ».',
      '"充电时间还是比加油慢得多".'
    ),
    q(
      'Quel conseil donnent-ils pour les longs trajets ?',
      'What do they advise for long trips?',
      [
        ['Louer une voiture thermique', 'Rent a combustion car'],
        ['Planifier les arrêts de recharge à l\'avance', 'Plan charging stops ahead'],
        ['Voyager de nuit', 'Travel at night'],
        ['Toujours rester en ville', 'Stay in the city']
      ],
      1,
      '« 长途旅行前要提前规划好 ».',
      '"长途旅行前要提前规划好".'
    )
  ],

  'dlg-b21-startup-pitch': [
    q(
      'Quel est le score de précision du modèle ?',
      'What is the model\'s accuracy score?',
      [
        ['85,3 %', '85.3%'],
        ['89,1 %', '89.1%'],
        ['93,7 %', '93.7%'],
        ['97,2 %', '97.2%']
      ],
      2,
      '« 我们达到了百分之九十三点七 ».',
      '"我们达到了百分之九十三点七".'
    ),
    q(
      'Quel montant est demandé en levée de fonds ?',
      'How much is the company raising?',
      [
        ['50 millions RMB', '50 million RMB'],
        ['100 millions RMB', '100 million RMB'],
        ['150 millions RMB', '150 million RMB'],
        ['1 milliard RMB', '1 billion RMB']
      ],
      2,
      '« 一亿五千万人民币 » — 150 millions.',
      '"一亿五千万人民币" — 150 million.'
    ),
    q(
      'Combien d\'hôpitaux sont déjà sous contrat ?',
      'How many hospitals are already under contract?',
      [
        ['16', '16'], ['29', '29'], ['46', '46'], ['100', '100']
      ],
      2,
      '« 我们已经和四十六家医院签了合同 ».',
      '"我们已经和四十六家医院签了合同".'
    ),
    q(
      'Quel pourcentage de la levée ira à la R&D ?',
      'What share of the round goes to R&D?',
      [
        ['20 %', '20%'], ['40 %', '40%'], ['60 %', '60%'], ['80 %', '80%']
      ],
      1,
      '« 大约百分之四十用于研发 ».',
      '"大约百分之四十用于研发".'
    ),
    q(
      'Quel est le ton de Zhang Jun face au pitch ?',
      'What is Zhang Jun\'s tone in the meeting?',
      [
        ['Hostile', 'Hostile'],
        ['Curieux, méthodique et critique', 'Curious, methodical, critical'],
        ['Sans intérêt', 'Disinterested'],
        ['Prêt à signer immédiatement', 'Ready to sign right away']
      ],
      1,
      'L\'investisseur sonde : score, médecins, marché, équipe — investigation méthodique.',
      'The VC probes carefully: score, MDs, market, team — methodical due diligence.'
    )
  ],

  // ============================================================
  //  B2.2 — inférence
  // ============================================================
  'dlg-b22-mental-health-debate': [
    q(
      'Que cite la psychologue Zhou comme étude ?',
      'Which study does psychologist Zhou cite?',
      [
        ['Harvard', 'Harvard'],
        ['Stanford', 'Stanford'],
        ['Oxford', 'Oxford'],
        ['MIT', 'MIT']
      ],
      1,
      '« 斯坦福的研究发现 » — étude de Stanford.',
      '"斯坦福的研究发现" — Stanford study.'
    ),
    q(
      'Au-delà de combien d\'heures la productivité s\'effondre-t-elle ?',
      'Above how many weekly hours does productivity collapse?',
      [
        ['40 h', '40h'], ['45 h', '45h'], ['50 h, voire 55 h', '50h, even 55h'], ['80 h', '80h']
      ],
      2,
      '« 五十小时之后…超过五十五小时几乎等于没有产出 ».',
      '"五十小时之后…超过五十五小时几乎等于没有产出".'
    ),
    q(
      'Quel résultat l\'entreprise présente-t-elle après ses réformes ?',
      'Which result does the company report after reforms?',
      [
        ['+30 % de profit', '+30% profit'],
        ['Turnover en baisse d\'environ 15 % + moins d\'anxiété', 'Turnover down ~15% + less anxiety'],
        ['Doublement du chiffre d\'affaires', 'Revenue doubled'],
        ['Aucun changement', 'No change']
      ],
      1,
      '« 员工流失率下降了大约百分之十五 ».',
      '"员工流失率下降了大约百分之十五".'
    ),
    q(
      'Quelles mesures internes le DRH mentionne-t-il ?',
      'What internal measures does the HR director mention?',
      [
        ['Primes de productivité', 'Productivity bonuses'],
        ['Journée sans réunion, soutien psy, congé obligatoire', 'No-meeting day, psychology support, mandatory leave'],
        ['Plus de télétravail', 'More remote work'],
        ['Salle de sport gratuite', 'Free gym']
      ],
      1,
      '« 无会议日、提供心理咨询、推行强制休假 ».',
      '"无会议日、提供心理咨询、推行强制休假".'
    ),
    q(
      'Quel jugement juridique est évoqué ?',
      'Which legal ruling is mentioned?',
      [
        ['Une amende européenne', 'A European fine'],
        ['Le jugement de la Cour suprême chinoise déclarant le 996 illégal', 'A Chinese Supreme Court ruling on 996 as illegal'],
        ['Une grève', 'A strike'],
        ['Une loi américaine', 'A US law']
      ],
      1,
      '« 最高人民法院去年关于"996"违法的判决 ».',
      '"最高人民法院去年关于"996"违法的判决".'
    )
  ],

  'dlg-b22-tea-culture': [
    q(
      'Quel concurrent fait du tort au thé traditionnel ?',
      'Which competitor hurts traditional tea?',
      [
        ['Le café', 'Coffee'],
        ['Le bubble tea (奶茶)', 'Bubble tea (奶茶)'],
        ['Les jus de fruits', 'Fruit juices'],
        ['L\'eau pétillante', 'Sparkling water']
      ],
      1,
      '« 一窝蜂地去喝奶茶 » — la mode du 奶茶.',
      '"一窝蜂地去喝奶茶" — the bubble tea craze.'
    ),
    q(
      'Selon le maître, qu\'est-ce qui disparaît vraiment ?',
      'According to the master, what is really fading?',
      [
        ['Le thé lui-même', 'Tea itself'],
        ['La patience de s\'asseoir et de savourer', 'The patience to sit and savour'],
        ['Les théières', 'Teapots'],
        ['Les variétés de thé', 'Tea varieties']
      ],
      1,
      '« 消失的也许不是茶，而是一种节奏 » — un rythme, une patience.',
      '"消失的也许不是茶，而是一种节奏" — a rhythm, a patience.'
    ),
    q(
      'Quelles trois choses propose-t-il pour transmettre ?',
      'Which three things does he propose to pass on?',
      [
        ['Industrialiser, distribuer, exporter', 'Industrialise, distribute, export'],
        ['Garder le savoir-faire, raconter l\'histoire, rendre l\'expérience joyeuse', 'Preserve craft, tell the story, make it fun'],
        ['Faire de la pub télé, ouvrir des chaînes, baisser les prix', 'TV ads, chains, lower prices'],
        ['Inviter des stars, faire la promo, lancer une app', 'Invite stars, run promos, launch an app']
      ],
      1,
      '« 守住工艺，把故事讲清楚，让喝茶这件事本身有乐趣 ».',
      '"守住工艺，把故事讲清楚，让喝茶这件事本身有乐趣".'
    ),
    q(
      'Quel canal moderne l\'apprenti suggère-t-il ?',
      'Which modern channel does the apprentice suggest?',
      [
        ['La radio', 'Radio'],
        ['Douyin (TikTok chinois)', 'Douyin (Chinese TikTok)'],
        ['Les magazines', 'Magazines'],
        ['La presse écrite', 'Print press']
      ],
      1,
      '« 抖音上有不少年轻博主在做茶的内容 ».',
      '"抖音上有不少年轻博主在做茶的内容".'
    )
  ]
};

export const getDialogueQuiz = (id: string): Q[] | null =>
  DIALOGUE_QUIZZES[id] ?? null;
