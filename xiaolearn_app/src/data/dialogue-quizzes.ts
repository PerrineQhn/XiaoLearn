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
    "Que se disent-ils juste après s'être présentés ?",
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
      "« 宫保鸡丁和米饭 » — du poulet Kung Pao et du riz.",
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
        ["Parce que les produits de l'entreprise l'intéressent et que sa spécialité correspond au poste", 'Interested in the products + matching major'],
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
    "Quelle marque Li recommande-t-il principalement ?",
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
        ["Parce que la plaque d'immatriculation est difficile à obtenir pour une thermique et que les bornes se multiplient", 'Combustion plate hard to get + charging stations spreading'],
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
        ["Rotation du personnel en baisse d'environ 15 % et moins d'anxiété", 'Turnover down ~15% + less anxiety'],
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
        ["Le thé au lait (奶茶)", 'Bubble tea (奶茶)'],
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
  ],

  // ===== Nouveaux dialogues =====
  "dlg-a1-phone": [
    q(
      "Que propose Xiao Ming à Wang Li ?",
      "What does Xiao Ming suggest to Wang Li?",
      [
        ["De lui envoyer un SMS tout de suite", "Texting her right away"],
        ["D'échanger leurs adresses e-mail", "Swapping email addresses"],
        ["De s'ajouter sur WeChat", "Adding each other on WeChat"],
        ["De s'appeler ce soir", "Calling each other tonight"]
      ],
      2,
      "Xiao Ming dit 我们加个微信吧 : « on s'ajoute sur WeChat ». C'est Wang Li, elle, qui parle d'envoyer un SMS, et seulement à la fin.",
      "Xiao Ming says 我们加个微信吧, “let's add each other on WeChat”. It's Wang Li who mentions texting, and only at the very end."
    ),
    q(
      "Quel est le numéro de portable de Xiao Ming ?",
      "What is Xiao Ming's mobile number?",
      [
        ["139 2846 5170", "139 2846 5170"],
        ["139 2864 5170", "139 2864 5170"],
        ["138 2846 5170", "138 2846 5170"],
        ["139 2846 5710", "139 2846 5710"]
      ],
      0,
      "Il annonce yāo sān jiǔ, èr bā sì liù, wǔ yāo qī líng, soit 139 2846 5170.",
      "He reads out yāo sān jiǔ, èr bā sì liù, wǔ yāo qī líng, that is 139 2846 5170."
    ),
    q(
      "Comment Xiao Ming prononce-t-il le chiffre « 1 » de son numéro ?",
      "How does Xiao Ming pronounce the digit “1” in his number?",
      [
        ["yī", "yī"],
        ["qī", "qī"],
        ["líng", "líng"],
        ["yāo", "yāo"]
      ],
      3,
      "Dans les numéros de téléphone, 1 se lit toujours yāo, pour ne pas le confondre avec qī (7).",
      "In phone numbers 1 is always read yāo, so it isn't mistaken for qī (7)."
    ),
    q(
      "Que fait Wang Li à la fin du dialogue ?",
      "What does Wang Li do at the end of the dialogue?",
      [
        ["Elle note le numéro dans son cahier", "She writes the number in her notebook"],
        ["Elle envoie un SMS à Xiao Ming", "She sends Xiao Ming a text message"],
        ["Elle appelle Xiao Ming", "She calls Xiao Ming"],
        ["Elle donne son propre numéro", "She gives him her own number"]
      ],
      1,
      "Elle dit 我现在给你发个短信 : « je t'envoie un SMS tout de suite ». Elle ne donne jamais son propre numéro.",
      "She says 我现在给你发个短信, “I'll text you right now”. She never gives her own number."
    )
  ],
  "dlg-a1-classroom": [
    q(
      "Que demande l'élève en premier ?",
      "What does the student ask first?",
      [
        ["Comment s'écrit le caractère", "How the character is written"],
        ["Comment se prononce le caractère", "How the character is pronounced"],
        ["Ce que veut dire le caractère", "What the character means"],
        ["Combien de traits a le caractère", "How many strokes the character has"]
      ],
      1,
      "Sa première question est 这个字怎么读？, « comment ça se lit ». Le nombre de traits ne vient qu'après.",
      "His first question is 这个字怎么读？, “how is it read”. The stroke count comes later."
    ),
    q(
      "Comment la professeure précise-t-elle de quel shū il s'agit ?",
      "How does the teacher make clear which shū she means?",
      [
        ["Le shū de 写字", "The shū in 写字"],
        ["Le shū de 老师", "The shū in 老师"],
        ["Le shū de 看书", "The shū in 看书"],
        ["Le shū de 黑板", "The shū in 黑板"]
      ],
      2,
      "Elle dit 就是看书的“书” : elle cite le mot 看书 pour lever l'ambiguïté, comme on le fait couramment en chinois.",
      "She says 就是看书的“书”, quoting the word 看书 to remove any ambiguity, a very common habit in Chinese."
    ),
    q(
      "Combien de traits a ce caractère ?",
      "How many strokes does the character have?",
      [
        ["Quatre", "Four"],
        ["Trois", "Three"],
        ["Cinq", "Five"],
        ["Huit", "Eight"]
      ],
      0,
      "La professeure répond 有四画 : quatre traits.",
      "The teacher answers 有四画: four strokes."
    ),
    q(
      "Que demande la professeure à l'élève de faire ?",
      "What does the teacher ask the student to do?",
      [
        ["De lire le caractère à voix haute", "Read the character out loud"],
        ["De l'écrire au tableau", "Write it on the board"],
        ["De compter les traits lui-même", "Count the strokes himself"],
        ["De l'écrire dans son cahier", "Write it in his notebook"]
      ],
      3,
      "Elle dit 你在本子上写一下 : « écris-le dans ton cahier ». Le tableau, c'est là où elle a écrit le caractère, pas où l'élève doit écrire.",
      "She says 你在本子上写一下, “write it in your notebook”. The board is where she wrote the character, not where the student writes."
    )
  ],
  "dlg-a1-fruit": [
    q(
      "Combien coûte un jin de pommes ?",
      "How much does one jin of apples cost?",
      [
        ["Deux yuans", "Two yuan"],
        ["Dix yuans", "Ten yuan"],
        ["Vingt yuans", "Twenty yuan"],
        ["Cinq yuans", "Five yuan"]
      ],
      3,
      "La vendeuse annonce 五块钱一斤 : cinq yuans le jin. Dix yuans, c'est le total pour deux jin.",
      "The seller says 五块钱一斤: five yuan per jin. Ten yuan is the total for two jin."
    ),
    q(
      "Quelle quantité de pommes le client achète-t-il ?",
      "How many apples does the customer buy?",
      [
        ["Deux jin", "Two jin"],
        ["Cinq jin", "Five jin"],
        ["Un jin", "One jin"],
        ["Trois jin", "Three jin"]
      ],
      0,
      "Il dit 我买两斤吧. Le chiffre cinq apparaît dans le dialogue, mais c'est le prix au jin, pas la quantité.",
      "He says 我买两斤吧. The number five does appear, but as the price per jin, not the quantity."
    ),
    q(
      "Que pense le client du prix ?",
      "What does the customer think of the price?",
      [
        ["Qu'il est vraiment bon marché", "That it's really cheap"],
        ["Que c'est le prix normal", "That it's the normal price"],
        ["Qu'il est un peu cher", "That it's a bit expensive"],
        ["Qu'il est bien trop cher pour lui", "That it's far too expensive for him"]
      ],
      2,
      "有点儿贵 marque une réserve légère : « un peu cher ». Il achète quand même, donc ce n'est pas hors de prix pour lui.",
      "有点儿贵 signals a mild objection: “a bit expensive”. He buys anyway, so it isn't out of his reach."
    ),
    q(
      "Combien la vendeuse rend-elle au client ?",
      "How much change does the seller give back?",
      [
        ["Cinq yuans", "Five yuan"],
        ["Dix yuans", "Ten yuan"],
        ["Vingt yuans", "Twenty yuan"],
        ["Rien, le compte est juste", "Nothing, he paid the exact amount"]
      ],
      1,
      "Le client donne vingt yuans pour un achat de dix : 找您十块, on lui rend dix yuans.",
      "The customer hands over twenty yuan for a ten-yuan purchase: 找您十块, ten yuan comes back."
    )
  ],
  "dlg-a1-weather": [
    q(
      "Quel temps fait-il aujourd'hui ?",
      "What's the weather like today?",
      [
        ["Il fait froid et il y a du vent", "Cold and windy"],
        ["Il fait froid et il pleut", "Cold and rainy"],
        ["Il fait doux mais il pleut", "Mild but rainy"],
        ["Il fait froid mais il y a du soleil", "Cold but sunny"]
      ],
      1,
      "Li Hua dit 外面很冷，还下雨 : froid, et en plus de la pluie. Le soleil, c'est pour demain.",
      "Li Hua says 外面很冷，还下雨: cold, plus rain. The sunshine is for tomorrow."
    ),
    q(
      "Que conseille Li Hua à Xiao Mei de mettre ?",
      "What does Li Hua tell Xiao Mei to wear?",
      [
        ["Son manteau noir", "Her black coat"],
        ["Son pull rouge", "Her red sweater"],
        ["Son manteau bleu", "Her blue coat"],
        ["Son manteau rouge", "Her red coat"]
      ],
      3,
      "Il dit 那件红色的大衣 : le manteau (大衣) rouge, et non un pull ni un manteau d'une autre couleur.",
      "He says 那件红色的大衣: the red coat (大衣), not a sweater and not another colour."
    ),
    q(
      "Quel temps fera-t-il demain ?",
      "What will the weather be like tomorrow?",
      [
        ["Il pleuvra encore", "It will rain again"],
        ["Il fera froid et il neigera", "It will be cold and snowy"],
        ["Il y aura du soleil", "It will be sunny"],
        ["Li Hua ne sait pas", "Li Hua doesn't know"]
      ],
      2,
      "明天不下雨，有太阳 : pas de pluie demain, mais du soleil. Li Hua répond très clairement.",
      "明天不下雨，有太阳: no rain tomorrow, but sunshine. Li Hua gives a very clear answer."
    ),
    q(
      "Pourquoi Xiao Mei demande-t-elle conseil à Li Hua ?",
      "Why does Xiao Mei ask Li Hua for advice?",
      [
        ["Elle ne sait pas quoi mettre", "She doesn't know what to wear"],
        ["Elle hésite à sortir", "She's not sure whether to go out"],
        ["Elle ne trouve pas son parapluie", "She can't find her umbrella"],
        ["Elle veut savoir s'il fera froid demain", "She wants to know if tomorrow will be cold"]
      ],
      0,
      "Elle demande 那我穿什么好呢？, « alors je mets quoi ? ». Elle s'informe bien du temps de demain, mais ce n'est pas la raison de sa question.",
      "She asks 那我穿什么好呢？, “so what should I wear?”. She does ask about tomorrow, but that isn't why she seeks advice."
    )
  ],
  "dlg-a1-cafe": [
    q(
      "Quelle boisson la cliente commande-t-elle en premier ?",
      "Which drink does the customer order first?",
      [
        ["Un thé au lait chaud", "A hot milk tea"],
        ["Un café chaud", "A hot coffee"],
        ["Un thé au lait sucré", "A sweet milk tea"],
        ["Un thé chaud", "A hot tea"]
      ],
      0,
      "Elle dit 我要一杯热奶茶 : un thé au lait chaud. Le café vient seulement à la fin.",
      "She says 我要一杯热奶茶: a hot milk tea. The coffee only comes at the end."
    ),
    q(
      "Le thé au lait est-il sucré ?",
      "Is the milk tea sweet?",
      [
        ["Oui, très sucré", "Yes, very sweet"],
        ["Oui, un peu sucré", "Yes, a little sweet"],
        ["Non, sans sucre", "No, no sugar"],
        ["Elle ne répond pas", "She doesn't answer"]
      ],
      2,
      "À la question 要甜的吗？elle répond 不要甜的 : elle le veut sans sucre.",
      "To the question 要甜的吗？she answers 不要甜的: she wants it without sugar."
    ),
    q(
      "Pour qui est le café ?",
      "Who is the coffee for?",
      [
        ["Pour le serveur", "For the waiter"],
        ["Pour son ami", "For her friend"],
        ["Pour elle-même", "For herself"],
        ["Pour son professeur", "For her teacher"]
      ],
      1,
      "Elle précise 我朋友喝 : c'est son ami qui le boira.",
      "She says 我朋友喝: her friend is the one who will drink it."
    ),
    q(
      "Que veut dire 还要别的吗？",
      "What does 还要别的吗？mean?",
      [["« C'est pour emporter ? »", "\"Is that all?\""], ["« Vous payez maintenant ? »", "\"Are you paying now?\""], ["« Vous voulez la même chose ? »", "\"Do you want the same thing?\""], ["« Vous voulez autre chose ? »", "\"Would you like anything else?\""]],
      3,
      "别的 signifie « autre chose » ; 还要别的吗 demande si le client souhaite ajouter quelque chose.",
      "别的 means \"something else\"; 还要别的吗 asks whether the customer wants to add anything."
    )
  ],
  "dlg-a1-time": [
    q(
      "À quelle heure se retrouvent-ils finalement ?",
      "What time do they finally meet?",
      [
        ["À trois heures", "At three"],
        ["À quatre heures", "At four"],
        ["À trois heures et demie", "At half past three"],
        ["À cinq heures", "At five"]
      ],
      1,
      "小明 propose 三点, mais 王丽 trouve cela trop tôt et propose 四点 : c'est l'heure retenue.",
      "小明 suggests 三点, but 王丽 finds it too early and suggests 四点: that's the agreed time."
    ),
    q(
      "Pourquoi 王丽 refuse-t-elle la première proposition ?",
      "Why does 王丽 turn down the first suggestion?",
      [
        ["Elle n'est pas libre demain", "She isn't free tomorrow"],
        ["Elle trouve que c'est trop tard", "She thinks it's too late"],
        ["Elle préfère se voir ailleurs", "She'd rather meet elsewhere"],
        ["Elle trouve que c'est un peu tôt", "She thinks it's a bit early"]
      ],
      3,
      "Elle dit 三点有点儿早 : trois heures, c'est un peu tôt pour elle.",
      "She says 三点有点儿早: three o'clock is a bit early for her."
    ),
    q(
      "Où se donnent-ils rendez-vous ?",
      "Where do they arrange to meet?",
      [
        ["Devant la bibliothèque", "At the library entrance"],
        ["Dans la bibliothèque", "Inside the library"],
        ["Devant l'école", "At the school gate"],
        ["Chez 小明", "At 小明's place"]
      ],
      0,
      "小明 dit 在图书馆门口见 : 门口 désigne l'entrée, donc devant la bibliothèque, pas à l'intérieur.",
      "小明 says 在图书馆门口见: 门口 is the entrance, so outside the library, not inside."
    ),
    q(
      "Que veut dire 有空 ?",
      "What does 有空 mean?",
      [
        ["Être occupé", "To be busy"],
        ["Être en retard", "To be late"],
        ["Avoir du temps libre", "To be free / have time"],
        ["Être à la maison", "To be at home"]
      ],
      2,
      "有空 signifie « avoir du temps libre » ; son contraire est 没空 ou 很忙.",
      "有空 means \"to have free time\"; its opposite is 没空 or 很忙."
    )
  ],
  "dlg-a2-post": [
    q(
      "Combien pèse le colis ?",
      "How much does the parcel weigh?",
      [
        ["Trois kilos", "Three kilos"],
        ["Trois kilos et demi", "Three and a half kilos"],
        ["Deux kilos et demi", "Two and a half kilos"],
        ["Quatre kilos", "Four kilos"]
      ],
      1,
      "L'employé annonce 三公斤半 : trois kilos et demi.",
      "The clerk says 三公斤半: three and a half kilos."
    ),
    q(
      "Qu'y a-t-il dans le colis ?",
      "What is inside the parcel?",
      [
        ["Des livres et des vêtements", "Books and clothes"],
        ["Du thé et des gâteaux", "Tea and cakes"],
        ["Des livres et du thé", "Books and tea"],
        ["Seulement des livres", "Books only"]
      ],
      2,
      "Le client dit 里面都是书和茶叶 : uniquement des livres et du thé.",
      "The customer says 里面都是书和茶叶: only books and tea."
    ),
    q(
      "Combien de temps met un colis envoyé par bateau ?",
      "How long does a parcel sent by sea take?",
      [
        ["Deux mois", "Two months"],
        ["Une semaine", "One week"],
        ["Deux semaines", "Two weeks"],
        ["Un mois", "One month"]
      ],
      0,
      "海运要两个月 : par bateau, il faut deux mois ; c'est l'avion qui prend une semaine environ.",
      "海运要两个月: by sea it takes two months; it's air mail that takes about a week."
    ),
    q(
      "Que demande l'employé à la fin ?",
      "What does the clerk ask for at the end?",
      [
        ["De payer en liquide", "To pay in cash"],
        ["De revenir demain", "To come back tomorrow"],
        ["De peser le colis lui-même", "To weigh the parcel himself"],
        ["De remplir un formulaire", "To fill in a form"]
      ],
      3,
      "Il dit 请填一下这张单子 : il demande de remplir le formulaire d'envoi.",
      "He says 请填一下这张单子: he asks the customer to fill in the shipping form."
    )
  ],
  "dlg-a2-pharmacy": [
    q(
      "Quels symptômes le patient décrit-il ?",
      "Which symptoms does the patient describe?",
      [
        ["Mal à la tête et mal au ventre", "Headache and stomach ache"],
        ["Mal à la tête et toux", "Headache and cough"],
        ["Toux et mal à la gorge", "Cough and sore throat"],
        ["Forte fièvre et toux", "High fever and cough"]
      ],
      1,
      "Il dit 头疼，还咳嗽 : mal à la tête et toux. Sa fièvre reste légère.",
      "He says 头疼，还咳嗽: headache and cough. His fever stays mild."
    ),
    q(
      "Quelle température a-t-il ?",
      "What is his temperature?",
      [
        ["38,5 °C", "38.5 °C"],
        ["37 °C", "37 °C"],
        ["37,5 °C", "37.5 °C"],
        ["Il ne l'a pas prise", "He hasn't taken it"]
      ],
      2,
      "Il répond 三十七度五 : 37,5 °C, ce qu'il juge lui-même 不太高.",
      "He answers 三十七度五: 37.5 °C, which he himself calls 不太高."
    ),
    q(
      "Combien de fois par jour doit-il prendre le médicament ?",
      "How many times a day must he take the medicine?",
      [
        ["Trois fois", "Three times"],
        ["Deux fois", "Twice"],
        ["Une fois", "Once"],
        ["Quatre fois", "Four times"]
      ],
      0,
      "Le médecin précise 一天三次 : trois fois par jour, après les repas.",
      "The doctor says 一天三次: three times a day, after meals."
    ),
    q(
      "Que conseille le médecin en plus du médicament ?",
      "What does the doctor advise besides the medicine?",
      [
        ["De revenir dans trois jours", "To come back in three days"],
        ["De se reposer une semaine", "To rest for a week"],
        ["De boire beaucoup d'eau chaude", "To drink plenty of hot water"],
        ["De prendre le médicament avant les repas", "To take the medicine before meals"]
      ],
      2,
      "Il ajoute 多喝热水 ; le médicament, lui, se prend 饭后, après les repas.",
      "He adds 多喝热水; the medicine itself is taken 饭后, after meals."
    )
  ],
  "dlg-a2-clothes": [
    q(
      "Pourquoi le client demande-t-il une autre taille ?",
      "Why does the customer ask for another size?",
      [
        ["Le pull est trop grand pour lui.", "The sweater is too big for him."],
        ["Les manches sont trop longues.", "The sleeves are too long."],
        ["Le pull est un peu petit et les manches un peu courtes.", "The sweater is a bit small and the sleeves a bit short."],
        ["Il veut le même modèle dans une taille plus petite.", "He wants the same style in a smaller size."]
      ],
      2,
      "Il dit : 有点儿小，袖子也短了一点儿 — un peu petit, manches un peu courtes.",
      "He says 有点儿小，袖子也短了一点儿 — a bit small, sleeves a bit short."
    ),
    q(
      "Quelle couleur le vendeur dit-il vendre le mieux ?",
      "Which colour does the shop assistant say sells best?",
      [
        ["Le bleu.", "Blue."],
        ["Le gris.", "Grey."],
        ["La couleur du pull essayé.", "The colour of the sweater he tried on."],
        ["Le bleu et le gris se vendent autant.", "Blue and grey sell equally well."]
      ],
      0,
      "蓝色卖得最好 : c'est le bleu qui se vend le mieux ; le gris n'est que cité.",
      "蓝色卖得最好: blue sells the best; grey is only mentioned."
    ),
    q(
      "Combien coûte le pull après la remise ?",
      "How much does the sweater cost after the discount?",
      [
        ["300 yuans.", "300 yuan."],
        ["350 yuans.", "350 yuan."],
        ["480 yuans.", "480 yuan."],
        ["380 yuans.", "380 yuan."]
      ],
      3,
      "打折以后三百八 = 380 yuans après réduction.",
      "打折以后三百八 = 380 yuan after the discount."
    ),
    q(
      "Où se trouve la cabine d'essayage ?",
      "Where is the fitting room?",
      [
        ["À gauche de l'entrée.", "To the left of the entrance."],
        ["À droite.", "On the right."],
        ["Au fond du magasin.", "At the back of the shop."],
        ["À côté de la caisse.", "Next to the till."]
      ],
      1,
      "试衣间就在右边 : elle est juste à droite.",
      "试衣间就在右边: it's just on the right."
    )
  ],
  "dlg-a2-taxi": [
    q(
      "À quelle heure part l'avion du passager ?",
      "What time is the passenger's flight?",
      [
        ["À 7 h du matin.", "At 7 a.m."],
        ["À 19 h 30.", "At 7:30 p.m."],
        ["À 19 h.", "At 7 p.m."],
        ["À 20 h 30.", "At 8:30 p.m."]
      ],
      1,
      "晚上七点半 = 19 h 30 (晚上 indique le soir).",
      "晚上七点半 = 7:30 p.m. (晚上 marks the evening)."
    ),
    q(
      "Pourquoi la circulation est-elle difficile ?",
      "Why is the traffic bad?",
      [
        ["Il y a eu un accident sur l'autoroute.", "There's been an accident on the expressway."],
        ["Un feu est en panne au carrefour.", "A traffic light is broken at the crossroads."],
        ["Il pleut très fort ce soir.", "It's raining hard tonight."],
        ["C'est l'heure de la sortie du travail.", "It's the end-of-work rush hour."]
      ],
      3,
      "现在是下班时间，路上有点儿堵车 : c'est l'heure de pointe.",
      "现在是下班时间，路上有点儿堵车: it's rush hour."
    ),
    q(
      "Que fait le chauffeur pour gagner du temps ?",
      "What does the driver do to save time?",
      [
        ["Il change d'itinéraire un peu plus loin.", "He switches to another route up ahead."],
        ["Il reste sur l'autoroute et accélère.", "He stays on the expressway and speeds up."],
        ["Il attend que l'embouteillage se termine.", "He waits for the jam to clear."],
        ["Il fait demi-tour avant le feu.", "He turns back before the traffic light."]
      ],
      0,
      "前面我换一条路走 : il prend une autre route.",
      "前面我换一条路走: he takes another route."
    ),
    q(
      "Que demande le passager pour la fin de la course ?",
      "What does the passenger ask for at the end of the ride?",
      [
        ["Un reçu écrit à la main.", "A handwritten receipt."],
        ["De payer par téléphone.", "To pay by phone."],
        ["Une facture imprimée.", "A printed receipt."],
        ["De l'aide pour ses bagages.", "Help with his luggage."]
      ],
      2,
      "Il demande 一张发票, et le chauffeur répond qu'il va l'imprimer (打印出来).",
      "He asks for 一张发票, and the driver says he'll print it (打印出来)."
    )
  ],
  "dlg-a2-bank": [
    q(
      "Que demande l'employé au client ?",
      "What does the clerk ask the customer for?",
      [
        ["Son passeport et sa carte d'étudiant.", "His passport and student card."],
        ["Son passeport et son adresse en Chine.", "His passport and his address in China."],
        ["Sa carte d'identité et son numéro chinois.", "His ID card and his Chinese number."],
        ["Son passeport et son numéro de téléphone chinois.", "His passport and his Chinese mobile number."]
      ],
      3,
      "请给我看一下您的护照，还有您在中国的手机号码.",
      "请给我看一下您的护照，还有您在中国的手机号码."
    ),
    q(
      "Quand le client a-t-il obtenu son numéro de téléphone ?",
      "When did the customer get his phone number?",
      [
        ["La semaine dernière.", "Last week."],
        ["Le mois dernier.", "Last month."],
        ["Le matin même.", "That very morning."],
        ["Il y a six mois.", "Six months ago."]
      ],
      1,
      "上个月刚办的 : il l'a pris le mois dernier.",
      "上个月刚办的: he got it last month."
    ),
    q(
      "Combien de chiffres compte le code ?",
      "How many digits does the PIN have?",
      [
        ["Quatre.", "Four."],
        ["Cinq.", "Five."],
        ["Six.", "Six."],
        ["Huit.", "Eight."]
      ],
      2,
      "六位 = six chiffres.",
      "六位 = six digits."
    ),
    q(
      "Que doit faire le client avec son code ?",
      "What must the customer do with his PIN?",
      [
        ["Le saisir lui-même et ne le dire à personne.", "Enter it himself and tell nobody."],
        ["Le dicter à l'employé qui le saisira.", "Read it out to the clerk, who will enter it."],
        ["L'écrire au bas du formulaire.", "Write it at the bottom of the form."],
        ["Le choisir plus tard, à un distributeur.", "Choose it later at an ATM."]
      ],
      0,
      "请您自己输入，别告诉别人 : il le saisit lui-même, sans le dire à personne.",
      "请您自己输入，别告诉别人: he enters it himself and tells no one."
    )
  ],
  "dlg-b11-apartment": [
    q(
      "Quelle formule 王丽 préfère-t-elle ?",
      "Which option does 王丽 prefer?",
      [
        ["Louer tout l'appartement, si le prix convient.", "Renting the whole flat, if the price is right."],
        ["La colocation, pour payer moins cher.", "Sharing, to pay less."],
        ["La colocation, parce que l'appartement est petit.", "Sharing, because the flat is small."],
        ["Elle hésite encore entre les deux formules.", "She's still hesitating between the two."]
      ],
      0,
      "如果价格合适，我更想整租 : elle préfère la location entière si le prix convient.",
      "如果价格合适，我更想整租: she'd rather rent the whole flat if the price suits her."
    ),
    q(
      "Qui paie les charges de copropriété (物业费) ?",
      "Who pays the building management fees (物业费)?",
      [
        ["王丽, avec l'eau et l'électricité.", "王丽, along with water and electricity."],
        ["L'agence immobilière.", "The estate agency."],
        ["Le propriétaire.", "The landlord."],
        ["Le propriétaire et 王丽 à parts égales.", "The landlord and 王丽 half each."]
      ],
      2,
      "物业费由房东付 ; en revanche l'eau, l'électricité et internet sont pour la locataire.",
      "物业费由房东付; water, electricity and internet, however, are the tenant's."
    ),
    q(
      "Que dit 王丽 de la pièce qu'elle visite ?",
      "What does 王丽 say about the room she views?",
      [
        ["Elle est grande et bien meublée.", "It's big and well furnished."],
        ["Elle est petite et un peu sombre.", "It's small and a bit dark."],
        ["Elle est grande mais mal éclairée.", "It's big but poorly lit."],
        ["Elle n'est pas très grande, mais très lumineuse.", "It's not very big, but very bright."]
      ],
      3,
      "虽然不太大，但是采光特别好 : petite mais très lumineuse.",
      "虽然不太大，但是采光特别好: not big, but very bright."
    ),
    q(
      "Que veut négocier 王丽 avec le propriétaire ?",
      "What does 王丽 want to negotiate with the landlord?",
      [
        ["Ne payer qu'un mois de loyer d'avance.", "Paying only one month's rent in advance."],
        ["Une baisse de loyer de 200 yuans.", "A 200-yuan cut in the rent."],
        ["Une baisse de loyer de 300 yuans.", "A 300-yuan cut in the rent."],
        ["Un mois de loyer offert à la signature.", "One free month of rent when signing."]
      ],
      1,
      "租金再便宜两百 : elle demande 200 yuans de moins par mois.",
      "租金再便宜两百: she asks for 200 yuan less per month."
    ),
    q(
      "Pourquoi l'agente lui conseille-t-elle de se décider vite ?",
      "Why does the agent advise her to decide quickly?",
      [
        ["Le propriétaire part à l'étranger la semaine prochaine.", "The landlord is going abroad next week."],
        ["Le loyer va augmenter le mois prochain.", "The rent will go up next month."],
        ["Une autre personne a déjà visité le matin même.", "Someone else already viewed it that morning."],
        ["Dans cette résidence, les logements se louent très vite.", "Flats in this compound get rented very quickly."]
      ],
      3,
      "这个小区的房子一般很快就被人租走了 : les logements partent vite.",
      "这个小区的房子一般很快就被人租走了: flats there go fast."
    )
  ],
  "dlg-b11-phoneplan": [
    q(
      "Pourquoi le client choisit-il le forfait 50 Go ?",
      "Why does the customer choose the 50 GB plan?",
      [
        ["Parce que le forfait de 30 Go est plus cher que l'autre.", "Because the 30 GB plan is more expensive than the other one."],
        ["Parce qu'il passe beaucoup d'appels vers l'étranger.", "Because he makes a lot of international calls."],
        ["Parce qu'il regarde souvent des vidéos et que 30 Go ne suffiraient pas.", "Because he watches videos often and 30 GB wouldn't be enough."],
        ["Parce que l'employé lui dit qu'il ne reste que ce forfait-là.", "Because the clerk tells him only that plan is left."]
      ],
      2,
      "Il dit : «我常常看视频，三十G恐怕不够用» — il craint que 30 Go ne suffisent pas.",
      "He says 我常常看视频，三十G恐怕不够用 — he is afraid 30 GB won't be enough."
    ),
    q(
      "Combien coûte le forfait retenu, et que comprend-il ?",
      "How much does the chosen plan cost, and what does it include?",
      [["99 yuans par mois, avec 100 minutes d'appels inclus.", "99 yuan a month, with 100 minutes of calls included."], ["119 yuans par mois, avec 100 minutes d'appels inclus.", "119 yuan a month, with 100 minutes of calls included."], ["99 yuans par mois, mais les appels sont facturés en plus.", "99 yuan a month, but calls are billed separately."], ["89 yuans par mois, avec 50 minutes d'appels inclus.", "79 yuan a month, once the 20-yuan discount is applied."]],
      0,
      "L'employé annonce «每个月九十九块，还包括一百分钟通话».",
      "The clerk says 每个月九十九块，还包括一百分钟通话."
    ),
    q(
      "Que dit l'employé au sujet de l'engagement ?",
      "What does the clerk say about the commitment?",
      [
        ["Ce forfait n'impose aucune durée d'engagement.", "This plan comes with no commitment period at all."],
        ["L'engagement dure deux ans mais peut être résilié.", "The commitment lasts two years but can be cancelled."],
        ["L'engagement dure un an et coûte 20 yuans de plus.", "The commitment lasts one year and costs 20 yuan more."],
        ["L'engagement dure un an, mais fait gagner 20 yuans par mois.", "The commitment lasts one year, but saves 20 yuan a month."]
      ],
      3,
      "«要签一年…虽然有期限，但是每个月能便宜二十块» : un an d'engagement, 20 yuans de moins par mois.",
      "要签一年…虽然有期限，但是每个月能便宜二十块: one year, and 20 yuan cheaper each month."
    ),
    q(
      "Quels documents le client doit-il fournir ?",
      "What documents does the customer have to provide?",
      [
        ["Sa carte d'identité et un justificatif de domicile.", "His ID card and proof of address."],
        ["Sa carte d'identité, et rien d'autre.", "His ID card, and nothing else."],
        ["Sa carte d'identité et son contrat de travail.", "His ID card and his work contract."],
        ["Sa carte d'identité et son ancienne carte SIM.", "His ID card and his old SIM card."]
      ],
      1,
      "À la question sur d'autres papiers, l'employé répond «不用，把身份证给我就行».",
      "Asked about other documents, the clerk answers 不用，把身份证给我就行."
    ),
    q(
      "Que sous-entend le client dans sa dernière réplique ?",
      "What is the customer implying in his last line?",
      [
        ["Il compte utiliser ce nouveau forfait dès aujourd'hui.", "He intends to start using the new plan this very day."],
        ["Il veut garder son ancien forfait encore quelques jours.", "He wants to keep his old plan for a few more days."],
        ["Il préfère réfléchir avant de transférer son numéro.", "He would rather think it over before porting his number."],
        ["Il souhaite ouvrir une deuxième ligne pour le travail.", "He wants a second line just for work."]
      ],
      0,
      "«那我今天就把号码换过来» : le 就 marque l'immédiateté, il bascule son numéro tout de suite.",
      "那我今天就把号码换过来: the 就 signals immediacy — he is porting his number right away."
    )
  ],
  "dlg-b11-gym": [
    q(
      "Combien coûte l'abonnement trimestriel ?",
      "How much does the quarterly membership cost?",
      [
        ["300 yuans", "300 yuan"],
        ["800 yuans", "800 yuan"],
        ["2 800 yuans", "2,800 yuan"],
        ["200 yuans", "200 yuan"]
      ],
      1,
      "«季卡八百» : 800 yuans pour trois mois ; 300 est le tarif mensuel et 2 800 l'annuel.",
      "季卡八百: 800 yuan for three months; 300 is the monthly rate and 2,800 the yearly one."
    ),
    q(
      "Pourquoi le client hésite-t-il devant la carte à l'année ?",
      "Why does the customer hesitate about the yearly card?",
      [
        ["Parce qu'elle revient plus cher que les autres formules.", "Because it works out pricier than the other options."],
        ["Parce qu'il doit déménager dans quelques mois.", "Because he is moving away in a few months."],
        ["Parce qu'il préfère s'entraîner chez lui le soir.", "Because he'd rather train at home in the evening."],
        ["Parce qu'il a peur de ne pas tenir sur la durée.", "Because he's afraid he won't keep it up."]
      ],
      3,
      "«年卡虽然便宜，但是我怕自己坚持不下来» : il reconnaît que c'est avantageux, mais doute de sa persévérance.",
      "年卡虽然便宜，但是我怕自己坚持不下来: he admits it's cheaper but doubts he can stick with it."
    ),
    q(
      "Combien coûte une séance avec un coach personnel ?",
      "How much does one session with a personal trainer cost?",
      [
        ["200 yuans la séance.", "200 yuan per session."],
        ["300 yuans la séance.", "300 yuan per session."],
        ["200 yuans par mois.", "200 yuan per month."],
        ["800 yuans pour dix séances.", "800 yuan for ten sessions."]
      ],
      0,
      "«一节课两百块» : 200 yuans pour une séance, pas pour un mois.",
      "一节课两百块: 200 yuan for one session, not per month."
    ),
    q(
      "Quels sont les horaires de fermeture de la salle ?",
      "When does the gym close?",
      [
        ["À 22 heures tous les jours.", "At 10 p.m. every day."],
        ["À 23 heures, tous les jours sans exception.", "At 11 p.m., every single day."],
        ["À 23 heures, sauf le dimanche.", "At 11 p.m., except on Sundays."],
        ["À minuit, sauf le dimanche.", "At midnight, except on Sundays."]
      ],
      2,
      "«除了周日以外，我们每天都开到晚上十一点» : 23 heures, le dimanche étant exclu.",
      "除了周日以外，我们每天都开到晚上十一点: 11 p.m., with Sunday excluded."
    ),
    q(
      "Que révèle la réaction du coach face à l'hésitation du client ?",
      "What does the trainer's reaction to the customer's hesitation reveal?",
      [
        ["Il est convaincu que le client ne reviendra jamais.", "He is convinced the customer will never come back."],
        ["Il insiste malgré tout pour vendre la carte annuelle.", "He keeps pushing the yearly card anyway."],
        ["Il trouve que le client manque vraiment de motivation.", "He thinks the customer really lacks motivation."],
        ["Il connaît bien cette hésitation et propose une solution intermédiaire.", "He knows this hesitation well and offers a middle option."]
      ],
      3,
      "«很多人都这么说» montre qu'il entend souvent cette objection ; il oriente aussitôt vers la carte trimestrielle.",
      "很多人都这么说 shows he hears this objection often, and he immediately steers the customer to the quarterly card."
    )
  ],
  "dlg-b11-luggage": [
    q(
      "Quel est le vol du passager ?",
      "What is the passenger's flight?",
      [
        ["CA1863, en provenance de Shanghai.", "CA1863, arriving from Shanghai."],
        ["CA1836, en provenance de Shanghai.", "CA1836, arriving from Shanghai."],
        ["CA1863, en provenance de Pékin.", "CA1863, arriving from Beijing."],
        ["CA1683, en provenance de Canton.", "CA1683, arriving from Guangzhou."]
      ],
      0,
      "«CA1863，是从上海飞过来的» : le numéro et la ville de départ sont donnés ensemble.",
      "CA1863，是从上海飞过来的: he gives the number and the departure city together."
    ),
    q(
      "Comment le passager décrit-il sa valise ?",
      "How does the passenger describe his suitcase?",
      [
        ["Une grande valise rouge portant une étiquette à son nom.", "A large red suitcase with a name tag on it."],
        ["Une petite valise rouge avec un autocollant de chat.", "A small red suitcase with a cat sticker."],
        ["Une valise rouge de taille moyenne avec un autocollant panda.", "A medium-sized red suitcase with a panda sticker."],
        ["Une valise rouge de taille moyenne sans aucun signe particulier.", "A medium-sized red suitcase with no distinguishing marks."]
      ],
      2,
      "«中等大小的红色行李箱，上面贴着一张熊猫贴纸» : taille moyenne et autocollant panda.",
      "中等大小的红色行李箱，上面贴着一张熊猫贴纸: medium size and a panda sticker."
    ),
    q(
      "Que fera la compagnie une fois la valise localisée ?",
      "What will the company do once the suitcase is located?",
      [
        ["Elle enverra un message au passager.", "It will send the passenger a text message."],
        ["Elle téléphonera aussitôt au passager.", "It will phone the passenger right away."],
        ["Elle demandera au passager de revenir au guichet.", "It will ask the passenger to come back to the desk."],
        ["Elle livrera la valise sans prévenir le passager.", "It will deliver the suitcase without notifying him."]
      ],
      1,
      "«查到以后，我们会马上给您打电话» : un appel téléphonique, pas un message.",
      "查到以后，我们会马上给您打电话: a phone call, not a message."
    ),
    q(
      "Que dit l'employé au sujet de l'indemnisation ?",
      "What does the staff member say about compensation?",
      [
        ["La compagnie indemnise systématiquement après deux jours d'attente.", "The company always pays out after a two-day wait."],
        ["Aucune indemnisation n'est prévue pour les bagages en soute.", "No compensation is available for checked baggage."],
        ["Le passager doit remplir un formulaire pour être indemnisé.", "The passenger must fill in a form to be compensated."],
        ["En cas de perte avérée, la compagnie indemnise selon le règlement.", "If it really is lost, the company pays according to the rules."]
      ],
      3,
      "«如果真的丢了，公司会按规定赔偿» : l'indemnisation n'intervient qu'en cas de perte confirmée.",
      "如果真的丢了，公司会按规定赔偿: compensation only applies if the bag is genuinely lost."
    ),
    q(
      "Pourquoi le passager laisse-t-il l'adresse de son hôtel ?",
      "Why does the passenger leave his hotel address?",
      [
        ["Parce qu'il craint de rater sa correspondance.", "Because he's afraid of missing his connection."],
        ["Parce que l'employé le lui a expressément demandé.", "Because the staff member specifically asked him to."],
        ["Parce qu'il ne compte pas revenir à l'aéroport chercher sa valise.", "Because he doesn't plan to come back to the airport for the bag."],
        ["Parce qu'il va changer d'hôtel dès le lendemain matin.", "Because he's switching hotels the next morning."]
      ],
      2,
      "Il prend l'initiative («那我把酒店地址也留给您») et demande une livraison directe : il ne reviendra pas.",
      "He offers it himself (那我把酒店地址也留给您) and asks for direct delivery: he won't be coming back."
    )
  ],
  "dlg-b11-complaint": [
    q(
      "Quels sont les deux problèmes signalés par le client ?",
      "What two problems does the customer report?",
      [
        ["La soupe est froide et le service est beaucoup trop lent.", "The soup is cold and the service is far too slow."],
        ["Le plat est froid et l'addition comporte une erreur.", "The dish is cold and there's a mistake on the bill."],
        ["La soupe est trop salée et on lui a servi du poulet.", "The soup is too salty and he was served chicken."],
        ["La soupe est froide et on lui a servi du poulet au lieu du bœuf.", "The soup is cold and he was served chicken instead of beef."]
      ],
      3,
      "«这个汤已经凉了，而且我点的是牛肉，不是鸡肉» : soupe froide et erreur de viande.",
      "这个汤已经凉了，而且我点的是牛肉，不是鸡肉: cold soup plus the wrong meat."
    ),
    q(
      "Depuis combien de temps les clients attendent-ils ?",
      "How long have the customers been waiting?",
      [
        ["Trente minutes.", "Thirty minutes."],
        ["Quarante minutes.", "Forty minutes."],
        ["Quinze minutes.", "Fifteen minutes."],
        ["Cinq minutes.", "Five minutes."]
      ],
      1,
      "«我们已经等了四十分钟了» ; les cinq minutes annoncées ensuite concernent le plat refait.",
      "我们已经等了四十分钟了; the five minutes mentioned later refer to the remade dish."
    ),
    q(
      "Quel geste commercial le restaurant propose-t-il finalement ?",
      "What gesture does the restaurant finally offer?",
      [
        ["Une réduction de moitié sur l'addition.", "Half off the whole bill."],
        ["Le plat refait et une boisson offerte.", "The dish remade plus a free drink."],
        ["Le plat offert et un dessert en plus.", "The dish for free plus a dessert."],
        ["Un bon de réduction pour la prochaine visite.", "A discount voucher for the next visit."]
      ],
      2,
      "«这道菜我们给您免单» puis «再送您一份甜点» : plat offert et dessert.",
      "这道菜我们给您免单 then 再送您一份甜点: the dish is comped and a dessert added."
    ),
    q(
      "En combien de temps le plat sera-t-il refait ?",
      "How quickly will the dish be remade?",
      [
        ["En cinq minutes.", "In five minutes."],
        ["En dix minutes.", "In ten minutes."],
        ["En quarante minutes.", "In forty minutes."],
        ["En un quart d'heure.", "In fifteen minutes."]
      ],
      0,
      "«五分钟就能给您端上来» : cinq minutes, le 就 soulignant la rapidité.",
      "五分钟就能给您端上来: five minutes, with 就 stressing how fast it will be."
    ),
    q(
      "Quelle attitude le client adopte-t-il face au problème ?",
      "What attitude does the customer take toward the problem?",
      [
        ["Il est furieux et menace de partir sans payer.", "He is furious and threatens to leave without paying."],
        ["Il reste courtois et cherche surtout à prévenir le restaurant.", "He stays polite and mainly wants to flag it to the restaurant."],
        ["Il exige une compensation dès le début de la conversation.", "He demands compensation from the very start."],
        ["Il feint d'être gêné pour obtenir un dessert gratuit.", "He pretends to be embarrassed in order to get a free dessert."]
      ],
      1,
      "Il dit «没关系» puis «其实我只是想提醒你们一下» : il signale sans réclamer quoi que ce soit.",
      "He says 没关系 and then 其实我只是想提醒你们一下: he points it out without asking for anything."
    )
  ],
  "dlg-b12-salary": [
    q(
      "Quel salaire mensuel figure sur l'offre de départ ?",
      "What monthly salary is stated in the original offer?",
      [
        ["Dix mille yuans.", "Ten thousand yuan."],
        ["Douze mille yuans.", "Twelve thousand yuan."],
        ["Treize mille yuans.", "Thirteen thousand yuan."],
        ["Quinze mille yuans.", "Fifteen thousand yuan."]
      ],
      1,
      "Le candidat lit « 月薪是一万二 ». Treize mille est le plafond du budget, pas le montant écrit.",
      "The candidate reads out 月薪是一万二. Thirteen thousand is the budget ceiling, not the figure on the offer."
    ),
    q(
      "En disant « 其实我更看重的是发展空间 », que cherche à faire le candidat ?",
      "By saying 其实我更看重的是发展空间, what is the candidate trying to do?",
      [
        ["Refuser poliment le poste qu'on lui propose.", "Politely turn the job down."],
        ["Faire comprendre que le salaire lui est totalement indifférent.", "Show that the salary is of no interest to him at all."],
        ["Demander à être promu chef d'équipe dès son arrivée.", "Ask to be promoted to team leader as soon as he starts."],
        ["Se montrer souple sur le chiffre pour obtenir des garanties sur la prime.", "Sound flexible about the figure in order to get guarantees on the bonus."]
      ],
      3,
      "Il relativise le salaire juste avant de poser sa condition (只要…奖金能说清楚), donc il prépare le terrain pour la prime.",
      "He plays down the salary right before stating his condition (只要…奖金能说清楚), so he is setting up the bonus question."
    ),
    q(
      "Comment la prime de fin d'année est-elle décrite ?",
      "How is the year-end bonus described?",
      [
        ["Environ deux mois de salaire, selon les résultats de l'année.", "About two months' salary, depending on the year's results."],
        ["Deux mois de salaire, versés automatiquement à tous.", "Two months' salary, paid automatically to everyone."],
        ["Un mois de salaire, selon les résultats de l'année.", "One month's salary, depending on the year's results."],
        ["Un montant fixé au moment de la signature du contrat.", "An amount fixed when the contract is signed."]
      ],
      0,
      "« 奖金一般是两个月的工资，不过要看全年的业绩 » : le montant existe mais reste conditionné aux résultats.",
      "奖金一般是两个月的工资，不过要看全年的业绩: the amount is stated but still depends on performance."
    ),
    q(
      "Que prévoit le règlement de l'entreprise pour les congés ?",
      "What do the company rules say about leave?",
      [
        ["Douze jours à l'embauche, quinze après trois ans.", "Twelve days at hiring, fifteen after three years."],
        ["Dix jours à l'embauche, douze après trois ans.", "Ten days at hiring, twelve after three years."],
        ["Dix jours à l'embauche, quinze après trois ans.", "Ten days at hiring, fifteen after three years."],
        ["Quinze jours dès l'embauche, sans évolution ensuite.", "Fifteen days from the start, with no later increase."]
      ],
      2,
      "« 按规定是十天，满三年以后加到十五天 ». Les douze jours sont la demande du candidat, pas le règlement.",
      "按规定是十天，满三年以后加到十五天. The twelve days are the candidate's request, not the rule."
    ),
    q(
      "Pourquoi le candidat dit-il « 与其等三年，不如现在就谈好 » ?",
      "Why does the candidate say 与其等三年，不如现在就谈好?",
      [
        ["Pour prévenir qu'il ne restera pas trois ans dans l'entreprise.", "To warn that he won't stay three years at the company."],
        ["Pour demander que ses congés augmentent chaque année.", "To ask for his leave to increase every year."],
        ["Pour proposer de rediscuter du salaire dans trois ans.", "To suggest revisiting the salary in three years."],
        ["Pour obtenir davantage de congés tout de suite plutôt que d'attendre l'ancienneté.", "To get more leave right away instead of waiting for seniority."]
      ],
      3,
      "Il enchaîne immédiatement avec sa demande de douze jours : la remarque sert à justifier une hausse immédiate.",
      "He immediately follows with his request for twelve days: the remark justifies an increase now."
    )
  ],
  "dlg-b12-return": [
    q(
      "Pourquoi la cliente veut-elle renvoyer le manteau ?",
      "Why does the customer want to return the coat?",
      [
        ["Les manches sont trop longues.", "The sleeves are too long."],
        ["Le manteau est trop long pour elle.", "The coat itself is too long for her."],
        ["La taille livrée n'est pas celle commandée.", "The size delivered isn't the one she ordered."],
        ["La couleur ne ressemble pas à la photo.", "The colour doesn't match the photo."]
      ],
      0,
      "Elle dit « 袖子太长了 » : ce sont les manches, pas le vêtement entier ni une erreur de livraison.",
      "She says 袖子太长了: it's the sleeves, not the whole garment or a delivery mistake."
    ),
    q(
      "Qui paie les frais de retour dans ce cas précis ?",
      "Who pays the return shipping in this particular case?",
      [
        ["L'acheteuse, comme pour tout retour sans motif.", "The buyer, as with any no-reason return."],
        ["Les frais sont partagés entre le vendeur et l'acheteuse.", "The cost is split between seller and buyer."],
        ["Le vendeur, parce que la description des tailles était fausse.", "The seller, because the size description was wrong."],
        ["Le transporteur, qui offre l'enlèvement à domicile.", "The courier, which offers free home pickup."]
      ],
      2,
      "La règle générale (买家承担) est mentionnée, mais l'erreur de description la fait basculer en faveur de la cliente.",
      "The general rule (买家承担) is mentioned, but the faulty description shifts the cost to the seller."
    ),
    q(
      "Pourquoi le service client recommande-t-il l'enlèvement à domicile ?",
      "Why does the agent recommend home pickup?",
      [
        ["Parce que le colis arrivera plus vite à l'entrepôt.", "Because the parcel reaches the warehouse faster."],
        ["Pour éviter à la cliente d'avancer les frais d'envoi.", "So the customer doesn't have to pay postage up front."],
        ["Parce que le bureau de poste refuse ce genre de colis.", "Because the post office won't take this kind of parcel."],
        ["Pour pouvoir vérifier l'état du manteau avant l'expédition.", "So they can check the coat's condition before shipping."]
      ],
      1,
      "« 这样您不用自己先垫运费 » : l'argument est financier, pas logistique.",
      "这样您不用自己先垫运费: the reason is financial, not logistical."
    ),
    q(
      "À quel moment le remboursement est-il lancé ?",
      "When is the refund started?",
      [
        ["Dès que la cliente remet le colis au livreur.", "As soon as the customer hands the parcel to the courier."],
        ["Trois à cinq jours après la demande de retour.", "Three to five days after the return request."],
        ["Un mois après le renvoi de l'article.", "One month after the item is sent back."],
        ["Dès que l'entrepôt reçoit le colis.", "As soon as the warehouse receives the parcel."]
      ],
      3,
      "« 仓库一收到货，我们就发起退款 ». Les trois à cinq jours ouvrés concernent ensuite le virement.",
      "仓库一收到货，我们就发起退款. The three to five working days apply to the transfer afterwards."
    ),
    q(
      "Que veut vraiment savoir la cliente en demandant « 退款是按原价算吗 » ?",
      "What does the customer really want to know when she asks 退款是按原价算吗?",
      [
        ["Si on lui rend la somme payée ou le prix affiché avant réduction.", "Whether she gets back what she paid or the pre-discount price."],
        ["Si son bon de réduction pourra servir pour un autre achat.", "Whether her coupon can be used on another purchase."],
        ["Si le remboursement arrivera bien sur sa carte bancaire.", "Whether the refund will really reach her bank card."],
        ["Si le bon de réduction lui sera rendu en argent.", "Whether the coupon will be given back as cash."]
      ],
      0,
      "Elle craint de perdre au change à cause du bon ; la réponse (按实付金额退) porte exactement sur ce point.",
      "She fears losing out because of the coupon; the reply (按实付金额退) answers exactly that."
    )
  ],
  "dlg-b12-exchange": [
    q(
      "De quoi le dossier se compose-t-il d'après le professeur ?",
      "What does the application file consist of, according to the professor?",
      [
        ["Un relevé de notes, un CV et un projet d'études.", "A transcript, a CV and a study plan."],
        ["Un relevé de notes, une lettre de recommandation et un certificat de langue.", "A transcript, a recommendation letter and a language certificate."],
        ["Un relevé de notes, une lettre de recommandation et un projet d'études.", "A transcript, a recommendation letter and a study plan."],
        ["Une lettre de recommandation, un projet d'études et une lettre de motivation.", "A recommendation letter, a study plan and a cover letter."]
      ],
      2,
      "« 成绩单、推荐信和一份学习计划 ». Le certificat de langue est un conseil supplémentaire, pas une pièce du dossier de base.",
      "成绩单、推荐信和一份学习计划. The language certificate is extra advice, not part of the basic file."
    ),
    q(
      "En disant « 你其实已经达到了 », que veut faire comprendre le professeur ?",
      "By saying 你其实已经达到了, what is the professor getting at?",
      [
        ["Que le niveau de l'étudiante suffit déjà, contrairement à ce qu'elle croit.", "That her level is already enough, contrary to what she thinks."],
        ["Que l'étudiante doit impérativement atteindre le niveau avancé.", "That she absolutely must reach an advanced level."],
        ["Que le programme n'impose aucune exigence de langue.", "That the programme has no language requirement at all."],
        ["Que seul un certificat officiel est pris en compte.", "That only an official certificate counts."]
      ],
      0,
      "其实 corrige son inquiétude : elle remplit déjà le critère « 中级以上 ».",
      "其实 corrects her worry: she already meets the 中级以上 requirement."
    ),
    q(
      "Pourquoi le score d'anglais peut-il être utile ?",
      "Why can the English score be useful?",
      [
        ["Parce que le dossier exige obligatoirement deux langues étrangères.", "Because the file requires two foreign languages."],
        ["Parce qu'il remplace le certificat de français.", "Because it replaces the French certificate."],
        ["Parce qu'il compense un niveau de français moyen.", "Because it makes up for average French."],
        ["Parce que certains cours là-bas sont donnés en anglais.", "Because some courses there are taught in English."]
      ],
      3,
      "« 那边有些课是英语授课 » : c'est l'usage réel sur place qui rend le score utile.",
      "那边有些课是英语授课: it's the actual teaching there that makes the score useful."
    ),
    q(
    "Combien de places l'université accorde-t-elle chaque année pour cet échange ?",
      "How many scholarships does the university award each year?",
      [
        ["Trois.", "Three."],
        ["Cinq.", "Five."],
        ["Dix.", "Ten."],
        ["Une par département.", "One per department."]
      ],
      1,
      "« 学校每年有五个名额 ». Le dix cité ensuite est la date limite, pas un nombre de places.",
      "学校每年有五个名额. The ten mentioned later is the deadline date, not a number of places."
    ),
    q(
      "Pourquoi le professeur termine-t-il par « 光猜没用…别拖 » ?",
      "Why does the professor end with 光猜没用…别拖?",
      [
        ["Parce que les bourses sont attribuées aux premiers dossiers reçus.", "Because scholarships go to whoever applies first."],
        ["Parce que l'étudiante perd son temps à se demander si elle a ses chances.", "Because she is wasting time wondering whether she stands a chance."],
        ["Parce que le relevé de notes met longtemps à être délivré.", "Because the transcript takes a long time to be issued."],
        ["Parce que la date limite est déjà passée le mois dernier.", "Because the deadline already passed last month."]
      ],
      1,
      "Il répond à sa question « 希望大吗 » : au lieu de spéculer, il faut déposer le dossier.",
      "He is answering her 希望大吗 question: instead of speculating, she should just submit."
    )
  ],
  "dlg-b12-neighbour": [
    q(
      "D'où vient le bruit, d'après le voisin du dessus ?",
      "Where does the noise come from, according to the upstairs neighbour?",
      [
        ["De travaux dans la salle de bains.", "From work being done in the bathroom."],
        ["D'une machine à laver qui tourne tard le soir.", "From a washing machine running late at night."],
        ["De la télévision du salon mise trop fort.", "From the living-room TV turned up too loud."],
        ["Des chaises que son enfant déplace en jouant.", "From chairs his child shoves around while playing."]
      ],
      3,
      "« 我孩子在客厅搭积木，椅子拖来拖去 » : c'est bien le bruit des chaises traînées.",
      "我孩子在客厅搭积木，椅子拖来拖去: it is indeed the sound of dragged chairs."
    ),
    q(
      "Pourquoi le résident précise-t-il « 白天再吵我都没意见 » ?",
      "Why does the resident add 白天再吵我都没意见?",
      [
        ["Pour signaler qu'il n'est jamais chez lui en journée.", "To point out that he's never home during the day."],
        ["Pour montrer qu'il ne se plaint que du bruit du soir.", "To show he is only complaining about the evening noise."],
        ["Pour demander que l'enfant ne joue que le week-end.", "To ask that the child play only at weekends."],
        ["Pour reprocher au voisin le bruit de toute la journée.", "To blame the neighbour for noise all day long."]
      ],
      1,
      "Il délimite sa demande pour ne pas passer pour quelqu'un qui se plaint de tout ; le voisin résume aussitôt : « 就是晚上… ».",
      "He narrows his request so as not to seem to complain about everything; the neighbour immediately sums up: 就是晚上…"
    ),
    q(
      "Que propose le voisin du dessus ?",
      "What does the upstairs neighbour offer to do?",
      [
        ["Poser un tapis dans tout le salon.", "Put a carpet down across the living room."],
        ["Coucher son enfant avant vingt-trois heures.", "Put his child to bed before eleven."],
        ["Ne plus laisser l'enfant jouer au salon après vingt-deux heures.", "Stop letting the child play in the living room after ten."],
        ["Coller des patins sous les pieds des chaises.", "Stick pads under the chair legs."]
      ],
      2,
      "C'est sa proposition (« 十点以后…不让孩子在客厅玩了 ») ; les patins sont l'idée du résident.",
      "That is his offer (十点以后…不让孩子在客厅玩了); the pads are the resident's idea."
    ),
    q(
      "Pourquoi le résident dit-il « 我还怕您觉得我小题大做 » ?",
      "Why does the resident say 我还怕您觉得我小题大做?",
      [
        ["Pour laisser entendre qu'il a longtemps hésité avant de monter se plaindre.", "To hint that he hesitated a long time before coming up to complain."],
        ["Pour reprocher au voisin de ne pas l'avoir écouté plus tôt.", "To blame the neighbour for not listening sooner."],
        ["Pour prévenir qu'il ira voir le syndic si cela recommence.", "To warn that he'll go to the building manager if it happens again."],
        ["Pour souligner que le bruit était devenu insupportable.", "To stress that the noise had become unbearable."]
      ],
      0,
      "Il remercie le voisin d'être « 好说话 » : la phrase avoue sa gêne à venir se plaindre, elle ne menace pas.",
      "He thanks the neighbour for being 好说话: the sentence admits his awkwardness about complaining, it is not a threat."
    ),
    q(
      "À quelle heure la femme du résident doit-elle se lever ?",
      "What time does the resident's wife have to get up?",
      [
        ["À cinq heures.", "At five."],
        ["À sept heures.", "At seven."],
        ["À six heures.", "At six."],
        ["À quatre heures.", "At four."]
      ],
      2,
      "« 早上六点就得起床 » ; c'est ce lever matinal qui rend le bruit de vingt-trois heures problématique.",
      "早上六点就得起床; it is that early start that makes the eleven o'clock noise a problem."
    )
  ],
  "dlg-b21-remote": [
    q(
      "Quel argument 王蒙 avance-t-il en tout premier en faveur du télétravail ?",
      "What is the very first argument 王蒙 puts forward in favour of remote work?",
      [
        ["Que l'étage de bureaux coûte environ un million par an à l'entreprise", "That the office floor costs the company around a million a year"],
        ["Que les meilleures idées naissent des conversations de couloir", "That the best ideas come out of corridor conversations"],
        ["Qu'il se concentre mieux chez lui parce que personne ne l'interrompt", "That he concentrates better at home because nobody interrupts him"],
        ["Que deux heures de trajet quotidien épuisent les salariés", "That a two-hour daily commute drains employees"]
      ],
      2,
      "Il ouvre sur l'efficacité personnelle : quatre à cinq heures de code sans interruption. Le loyer et le trajet viennent bien plus tard, et l'argument des couloirs est celui de 张军.",
      "He opens with personal efficiency: four to five uninterrupted hours of coding. Rent and commuting come much later, and the corridor argument belongs to 张军."
    ),
    q(
      "Quelle concession 张军 fait-il au sujet des réunions en ligne ?",
      "What concession does 张军 make about online meetings?",
      [
        ["Il reconnaît que, si les documents sont préparés à l'avance, elles sont mieux structurées", "He accepts that, if documents are prepared in advance, they are better structured"],
        ["Il admet que les réunions hybrides marchent bien avec la moitié de l'équipe à distance", "He admits hybrid meetings work well with half the team remote"],
        ["Il concède que la documentation suffit à former les nouveaux arrivants", "He concedes that documentation is enough to train newcomers"],
        ["Il accepte l'idée que le bail signé ne représente plus un coût réel", "He accepts that the signed lease no longer represents a real cost"]
      ],
      0,
      "Il répond « 这一点我承认 » à l'argument du document préparé en amont, avant de rebondir sur le cas des nouveaux. Les trois autres propositions inversent ses positions.",
      "He answers \"这一点我承认\" to the point about preparing material in advance, before pivoting to newcomers. The other three options reverse his positions."
    ),
    q(
      "Sur quoi les deux collègues tombent-ils finalement d'accord ?",
      "What do the two colleagues finally agree on?",
      [
        ["Sur la fermeture complète de l'étage pour réduire les coûts", "On closing the whole floor to cut costs"],
        ["Sur le fait que le tout-distanciel convient parfaitement aux nouveaux arrivants", "On fully remote work being ideal for newcomers"],
        ["Sur l'idée que la confiance se construit aussi bien à distance qu'en présentiel", "On trust building just as well remotely as in person"],
        ["Sur deux jours de présence hebdomadaire, testés six mois avant décision", "On two on-site days a week, trialled for six months before deciding"]
      ],
      3,
      "王蒙 propose la règle des deux jours et 张军 la soutient, à condition d'un essai de six mois évalué sur des données. Rendre une partie de l'étage n'était qu'une hypothèse de 王蒙.",
      "王蒙 proposes the two-day rule and 张军 backs it, on condition of a six-month trial judged on data. Giving back part of the floor was only 王蒙's suggestion."
    ),
    q(
      "Que propose 王蒙 pour les nouveaux arrivants ?",
      "What does 王蒙 propose for newcomers?",
      [
        ["De les laisser en télétravail dès le premier jour avec un tuteur attitré", "Letting them work remotely from day one with an assigned mentor"],
        ["De les faire venir sur site trois mois, puis de passer progressivement au distanciel", "Having them on site for three months, then moving gradually to remote"],
        ["De les faire venir six mois, le temps qu'ils maîtrisent les dossiers", "Having them on site for six months, until they master the files"],
        ["De les former exclusivement au moyen de la documentation interne", "Training them exclusively through internal documentation"]
      ],
      1,
      "Il parle de « 前三个月尽量到岗 » puis d'une transition progressive. Les six mois sont la durée que 张军 juge insuffisante pour être opérationnel, pas une durée de présence.",
      "He says \"前三个月尽量到岗\" followed by a gradual transition. The six months is the period 张军 considers too short to get up to speed, not a length of on-site presence."
    ),
    q(
      "Comment 张军 réplique-t-il à l'argument financier de 王蒙 ?",
      "How does 张军 answer 王蒙's financial argument?",
      [
        ["Il conteste le chiffre du million et propose de recalculer le loyer", "He disputes the million figure and suggests recalculating the rent"],
        ["Il rappelle qu'un bail de cinq ans peut être rompu sans frais", "He points out a five-year lease can be broken at no cost"],
        ["Il objecte que les économies se voient, mais que les pertes humaines se quantifient mal", "He objects that savings are visible while human losses are hard to quantify"],
        ["Il affirme que le loyer est de loin le premier poste de dépenses de l'entreprise", "He claims rent is by far the company's largest expense"]
      ],
      2,
      "Il oppose le chiffrable à l'inquantifiable : confiance et entraide se construisent en se voyant. C'est lui, et non 王蒙, qui avait rappelé l'existence du bail de cinq ans.",
      "He contrasts the measurable with the unquantifiable: trust and mutual help are built face to face. It was he, not 王蒙, who had raised the five-year lease."
    )
  ],
  "dlg-b21-housing": [
    q(
      "Pourquoi 李婷 hésite-t-elle à acheter malgré la pression de ses parents ?",
      "Why does 李婷 hesitate to buy despite her parents' pressure?",
      [
        ["Parce que les prix ont cessé de monter et que l'achat n'est plus rentable", "Because prices have stopped rising and buying no longer pays"],
        ["Parce qu'au prix actuel il lui faudrait environ dix ans pour réunir l'apport", "Because at today's prices she'd need about ten years to save the deposit"],
        ["Parce qu'elle envisage de partir travailler dans une autre ville", "Because she is considering moving to another city for work"],
        ["Parce que son bail actuel court encore sur cinq années", "Because her current lease still runs for five years"]
      ],
      1,
      "Elle invoque d'emblée les dix ans d'épargne nécessaires. Le ralentissement des prix et la mobilité sont des arguments de 陈波, et les baux de cinq ans sont un exemple étranger.",
      "She immediately cites the ten years of saving needed. Slowing prices and mobility are 陈波's arguments, and five-year leases are a foreign example."
    ),
    q(
      "Quelle concession 陈波 fait-il à 李婷 ?",
      "What concession does 陈波 make to 李婷?",
      [
        ["Il admet que la propriété demeure le meilleur placement de long terme", "He admits ownership remains the best long-term investment"],
        ["Il reconnaît qu'un loyer augmente moins vite qu'une mensualité de crédit", "He accepts that rent rises more slowly than a loan repayment"],
        ["Il concède que la souplesse compte peu avant trente-cinq ans", "He concedes flexibility matters little before thirty-five"],
        ["Il reconnaît que les contraintes institutionnelles existent et que le cadre est perfectible", "He acknowledges the institutional constraints are real and the framework improvable"]
      ],
      3,
      "Il reconnaît deux fois la faiblesse de sa position : « 制度性因素确实存在 » puis « 制度上还有很大的改进空间 ». Il soutient l'inverse des trois autres propositions.",
      "He twice concedes weakness in his own case: \"制度性因素确实存在\" and \"制度上还有很大的改进空间\". He argues the opposite of the other three options."
    ),
    q(
      "Quels ordres de grandeur 李婷 cite-t-elle pour un petit deux-pièces en centre-ville ?",
      "What ballpark figures does 李婷 give for a small two-bedroom downtown?",
      [
        ["Quatre à cinq millions, 30 % d'apport, environ vingt mille de mensualité", "Four to five million, 30 % deposit, about twenty thousand a month"],
        ["Quatre à cinq millions, 30 % d'apport, environ huit à neuf mille de mensualité", "Four to five million, 30 % deposit, about eight or nine thousand a month"],
        ["Deux millions, 50 % d'apport, environ vingt mille de mensualité", "Two million, 50 % deposit, about twenty thousand a month"],
        ["Quatre à cinq millions, un loyer de vingt mille et 30 % de charges", "Four to five million, twenty thousand rent and 30 % in charges"]
      ],
      0,
      "Elle donne quatre à cinq millions, trois dixièmes d'apport et une mensualité proche de vingt mille. Les huit à neuf mille correspondent au loyer du même bien, cité plus loin.",
      "She gives four to five million, three tenths as deposit and a repayment near twenty thousand. The eight to nine thousand is the rent for the same flat, mentioned later."
    ),
    q(
      "Selon 陈波, où réside la vraie différence entre louer et acheter ?",
      "According to 陈波, where does the real difference between renting and buying lie?",
      [
        ["Dans le montant total dépensé sur vingt ans", "In the total amount spent over twenty years"],
        ["Dans l'accès des enfants à l'école du quartier", "In children's access to the local school"],
        ["Dans la souplesse : un loyer peut être réduit, pas une mensualité", "In flexibility: rent can be reduced, a loan repayment cannot"],
        ["Dans la durée des baux, plus longue à l'étranger que chez eux", "In lease length, longer abroad than at home"]
      ],
      2,
      "Il pose « 差别在于灵活性 » : on peut déménager plus petit ou plus loin, alors que le crédit ne suit pas la baisse des revenus. La durée des baux est l'objection de 李婷.",
      "He states \"差别在于灵活性\": you can move somewhere smaller or further out, whereas a loan doesn't follow falling income. Lease length is 李婷's objection."
    ),
    q(
      "Sur quoi les deux amis se retrouvent-ils en fin de conversation ?",
      "What do the two friends end up agreeing on?",
      [
        ["Le désaccord porte sur le moment d'acheter, non sur le principe", "The disagreement is about when to buy, not whether"],
        ["Mieux vaut renoncer à acheter tant que les baux durent un an", "Better to give up buying while leases last only a year"],
        ["Il faut acheter dès que l'emploi est stable, où que ce soit", "One should buy as soon as the job is stable, wherever that is"],
        ["L'avis de la famille doit rester le critère décisif", "Family opinion should remain the deciding factor"]
      ],
      0,
      "李婷 déplace le débat vers le calendrier et 陈波 y souscrit, en ajoutant que le critère est le lieu où l'on veut être dans cinq ans, pas le regard des autres.",
      "李婷 shifts the debate to timing and 陈波 signs up to it, adding that the criterion is where you want to be in five years, not what others think."
    )
  ],
  "dlg-b21-ai-education": [
    q(
      "Que 周老师 oppose-t-elle au premier bilan enthousiaste de 高教授 ?",
      "What does 周老师 set against 高教授's enthusiastic first report?",
      [
        ["Que les élèves les plus faibles n'ont enregistré aucun progrès mesurable", "That the weakest students showed no measurable progress"],
        ["Que le système revient plus cher qu'un cours particulier", "That the system costs more than a private tutor"],
        ["Que les élèves interrogent la machine trop souvent pendant le cours", "That students question the machine too often during class"],
        ["Qu'un tiers des rédactions reçues semblaient écrites par la même main", "That a third of the essays she received seemed written by the same hand"]
      ],
      3,
      "Elle avance un indice concret : une rigueur logique suspecte dans un tiers des copies. Elle admet plus loin que le coût a baissé, et la dépendance quotidienne ne vient qu'ensuite.",
      "She offers concrete evidence: suspiciously neat logic in a third of the papers. She later concedes the cost has fallen, and daily dependence comes up only afterwards."
    ),
    q(
      "Quelle objection pratique 周老师 fait-elle à l'idée d'évaluer le processus ?",
      "What practical objection does 周老师 raise to assessing the process?",
      [
        ["Que les élèves refuseraient de montrer leurs brouillons successifs", "That students would refuse to show their successive drafts"],
        ["Qu'avec cinquante élèves par classe, les heures de cours d'une semaine n'y suffisent pas", "That with fifty students per class, a week's teaching hours don't suffice"],
        ["Que les premiers jets manuscrits sont souvent illisibles", "That handwritten first drafts are often illegible"],
        ["Que l'administration impose de noter le devoir final", "That the administration requires marking the final assignment"]
      ],
      1,
      "Elle chiffre l'obstacle : cinquante élèves, chaque processus à examiner et chaque entretien à mener. Le manuscrit et la notation du produit fini relèvent d'autres passages.",
      "She quantifies the obstacle: fifty students, each revision process to review and each interview to hold. Handwriting and marking the finished product belong to other passages."
    ),
    q(
      "Sur quel point 周老师 donne-t-elle raison à 高教授 au sujet du coût ?",
      "On what cost-related point does 周老师 agree with 高教授?",
      [
        ["Elle admet que le logiciel remplace avantageusement un professeur particulier", "She admits the software beats a private tutor outright"],
        ["Elle reconnaît que ce sont les familles aisées qui en tirent le plus grand bénéfice", "She accepts that well-off families benefit most from it"],
        ["Elle reconnaît que la barrière financière a baissé : quelques dizaines de yuans par mois contre deux à trois cents de l'heure", "She accepts the financial barrier has fallen: a few dozen yuan a month against two or three hundred an hour"],
        ["Elle concède que le tarif horaire des cours particuliers a fortement chuté", "She concedes the hourly rate of private tutoring has dropped sharply"]
      ],
      2,
      "Elle compare deux à trois cents yuans de l'heure et quelques dizaines par mois pour conclure que le seuil a baissé. Ce sont les élèves sans soutien familial qui y gagnent, et non les familles aisées.",
      "She compares two or three hundred yuan an hour with a few dozen a month to conclude the threshold has fallen. It is students without family support who gain, not well-off families."
    ),
    q(
      "Comment 高教授 relativise-t-il le risque de dépendance, et que lui répond 周老师 ?",
      "How does 高教授 play down the risk of dependence, and how does 周老师 reply?",
      [
        ["Il invoque le précédent de la calculatrice ; elle répond que celle-ci ne fait qu'une chose, tandis que ces systèmes pensent à votre place", "He cites the calculator precedent; she replies it does only one thing, whereas these systems think for you"],
        ["Il invoque le précédent de la calculatrice ; elle répond que les élèves d'alors étaient plus autonomes", "He cites the calculator precedent; she replies students back then were more independent"],
        ["Il soutient que la dépendance vient surtout des parents ; elle répond que l'école en décide", "He argues dependence comes mainly from parents; she replies the school decides"],
        ["Il nie l'existence même de la dépendance ; elle répond en citant ses rédactions", "He denies dependence exists at all; she replies by citing her essays"]
      ],
      0,
      "Il rappelle que le programme s'était recentré sur la compréhension ; elle réplique avec 与其说…不如说 que ces outils tiennent moins de l'instrument que du partenaire. Il admet pourtant que la dépendance est un vrai problème.",
      "He notes the syllabus shifted towards understanding; she counters with 与其说…不如说 that these tools are less an instrument than a partner. He does grant that dependence is a real problem."
    ),
    q(
      "Quel protocole 高教授 applique-t-il dans sa classe ?",
      "What protocol does 高教授 apply in his class?",
      [
        ["Une interdiction totale de la machine pour tout devoir noté", "A blanket ban on the machine for any graded work"],
        ["Un usage entièrement libre, avec une note portant uniquement sur l'oral", "Completely free use, with marks based on oral work only"],
        ["Un premier jet produit par la machine, puis corrigé à la main par l'élève", "A first draft produced by the machine, then corrected by hand"],
        ["Un premier jet manuscrit, la machine réservée à la révision, avec déclaration des phrases suggérées", "A handwritten first draft, the machine limited to revision, with suggested sentences declared"]
      ],
      3,
      "Les trois éléments sont énoncés ensemble. L'option 2 inverse l'ordre du protocole, et 周老师 ajoute la condition que la déclaration honnête ne soit pas sanctionnée.",
      "The three elements are stated together. Option 2 reverses the order of the protocol, and 周老师 adds the condition that honest declarations must not be penalised."
    )
  ],
  "dlg-b21-delivery": [
    q(
      "Comment 王站长 nuance-t-il le délai de trente minutes ?",
      "How does 王站长 qualify the thirty-minute deadline?",
      [
        ["Il explique que c'est une moyenne et que le système rallonge de dix à quinze minutes par fortes pluies", "He explains it is an average and the system adds ten to fifteen minutes in heavy rain"],
        ["Il explique que trente minutes est un plancher jamais appliqué en centre-ville", "He explains thirty minutes is a floor never applied downtown"],
        ["Il affirme que le délai varie selon l'ancienneté du livreur", "He claims the deadline varies with the rider's seniority"],
        ["Il reconnaît que le délai ne tient jamais compte de la météo", "He admits the deadline never takes weather into account"]
      ],
      0,
      "Il présente les trente minutes comme une valeur moyenne, ajustée au trafic et à la météo. L'option 3 dit exactement l'inverse de sa réponse.",
      "He presents the thirty minutes as an average adjusted for traffic and weather. Option 3 states the exact opposite of his answer."
    ),
    q(
      "Quel argument le journaliste oppose-t-il à cet ajustement météo ?",
      "What does the journalist set against that weather adjustment?",
      [
        ["Que les livreurs préfèrent la pluie, mieux rémunérée à la course", "That riders prefer rain because deliveries pay better"],
        ["Que le système bloque les commandes lorsqu'il pleut trop fort", "That the system blocks orders when the rain is too heavy"],
        ["Que le volume de commandes double souvent sous la pluie, ce qui annule l'ajustement", "That order volume often doubles in the rain, cancelling out the adjustment"],
        ["Que la rallonge de dix à quinze minutes n'est jamais accordée en pratique", "That the ten-to-fifteen-minute extension is never granted in practice"]
      ],
      2,
      "Il combine le doublement des commandes et la dégradation de la circulation pour conclure que l'ajustement « équivaut presque à rien ». Il ne conteste pas son existence.",
      "He combines doubled orders with worse traffic to conclude the adjustment \"amounts to almost nothing\". He does not dispute that it exists."
    ),
    q(
      "Quelle concession 王站长 fait-il au sujet des recours ?",
      "What concession does 王站长 make about appeals?",
      [
        ["Il admet que les règles de notation restent confidentielles", "He admits the scoring rules remain confidential"],
        ["Il admet que la procédure de réclamation manque de fluidité et évoque une réponse en deux ou trois jours", "He admits the complaints procedure lacks fluidity and mentions a two-to-three-day reply"],
        ["Il admet que les livreurs n'ont pas le droit de refuser une commande", "He admits riders have no right to decline an order"],
        ["Il admet que les notes sont attribuées par les responsables de station", "He admits scores are set by station managers"]
      ],
      1,
      "Il concède « 申诉渠道确实还不够顺畅 » tout en mettant en avant un référent dédié et une réponse sous deux ou trois jours. Il soutient au contraire que les règles de notation sont publiques et que les notes sont attribuées par le système, non par les responsables de station.",
      "He concedes \"申诉渠道确实还不够顺畅\" while pointing to a dedicated case handler. He argues the opposite about rules being public and scores being set by the system."
    ),
    q(
      "Selon le journaliste, où se situe la différence essentielle entre un salarié ordinaire et un livreur ?",
      "According to the journalist, where does the key difference between an ordinary employee and a rider lie?",
      [
        ["Dans le niveau du revenu mensuel", "In the level of monthly income"],
        ["Dans le nombre de jours de repos accordés", "In the number of rest days granted"],
        ["Dans la qualification exigée à l'embauche", "In the qualifications required on hiring"],
        ["Dans la possibilité de discuter avec un supérieur, impossible face à une interface", "In being able to argue with a manager, impossible facing an interface"]
      ],
      3,
      "Il pose la publicité des règles et leur justesse comme deux choses distinctes, puis introduit ce contraste par 相比之下. Les jours de repos et le revenu apparaissent ailleurs.",
      "He separates rules being public from rules being fair, then introduces the contrast with 相比之下. Rest days and income come up elsewhere."
    ),
    q(
      "Sur quoi les deux interlocuteurs s'accordent-ils, et sur quoi divergent-ils encore ?",
      "What do the two speakers agree on, and where do they still differ?",
      [
        ["Ils s'accordent sur la suppression du système de notes, mais divergent sur les délais de livraison", "They agree on scrapping the rating system but differ on delivery deadlines"],
        ["Ils s'accordent sur une protection sociale de base rendue obligatoire, mais divergent sur le rythme de la réforme", "They agree on making basic social protection compulsory but differ on the pace of reform"],
        ["Ils s'accordent sur le fait que la plateforme est le seul employeur, mais divergent sur les frais de livraison", "They agree the platform is the sole employer but differ on delivery fees"],
        ["Ils s'accordent sur une hausse immédiate des frais de livraison, mais divergent sur les recours", "They agree on an immediate rise in delivery fees but differ on appeals"]
      ],
      1,
      "Le responsable approuve la formule finale du journaliste tout en réclamant une transition lente. La question de l'employeur reste précisément non tranchée entre plateforme et sous-traitant.",
      "The manager endorses the journalist's closing formulation while asking for a slow transition. The employer question is precisely what remains unsettled between platform and contractor."
    )
  ],
  "dlg-b22-climate": [
    q(
      "Comment la professeure répond-elle à la crainte que la facture retombe sur les ouvriers ?",
      "How does the professor respond to the fear that the bill will fall on workers?",
      [
        ["Elle nie que la transition entraîne le moindre coût pour les ouvriers.", "She denies that the transition imposes any cost on workers."],
        ["Elle admet le coût mais juge la méfiance des syndicats sans fondement.", "She concedes the cost but finds union distrust baseless."],
        ["Elle juge la crainte légitime, puis lui oppose le coût plus élevé de l'immobilisme.", "She calls the fear legitimate, then counters with the higher cost of inaction."],
        ["Elle impute entièrement les pertes d'emplois à l'automatisation et au prix de l'énergie.", "She blames job losses entirely on automation and energy prices."]
      ],
      2,
      "Elle valide d'abord la crainte (« parfaitement légitime », « je ne l'esquiverai pas ») avant de la retourner par 与其说…不如说. Elle ne conteste que plus tard, et partiellement, l'imputation des pertes d'emplois ; elle qualifie au contraire la confiance de « ressource la plus rare ».",
      "She first validates the concern ('entirely legitimate', 'I will not dodge it') before turning it round with 与其说…不如说. Only later, and only partly, does she challenge the attribution of job losses; and she calls trust 'the scarcest resource'."
    ),
    q(
      "Sur quoi l'animateur fonde-t-il la responsabilité de l'État ?",
      "On what does the host base the state's responsibility?",
      [
        ["Sur le fait que la politique peut choisir le rythme, ce que le marché ne peut pas.", "On the fact that policy can choose the pace, which the market cannot."],
        ["Sur le fait que l'État connaît mieux que les industriels les cycles techniques de l'acier.", "On the fact that the state understands steel's technical cycles better than industry does."],
        ["Sur le fait que seul l'État peut empêcher la délocalisation des capacités de production.", "On the fact that only the state can prevent production capacity from moving abroad."],
        ["Sur le fait que le montant des compensations a toujours été fixé unilatéralement par l'État.", "On the fact that compensation amounts have always been set unilaterally by the state."]
      ],
      0,
      "« 恰恰因为节奏是可以选择的，责任才落在政府身上 » : c'est la possibilité même de choisir le rythme, et elle seule, qui fonde la responsabilité publique. Les cycles techniques sont invoqués par la professeure, non par lui.",
      "'恰恰因为节奏是可以选择的，责任才落在政府身上': it is the very possibility of choosing the pace that grounds public responsibility. Technical cycles are the professor's argument, not his."
    ),
    q(
      "Comment les positions se répartissent-elles sur la question de la fuite de carbone ?",
      "How are the positions distributed on carbon leakage?",
      [
        ["La professeure nie la fuite de carbone, l'animateur la croit généralisée à toute l'industrie.", "The professor denies carbon leakage; the host thinks it affects all of industry."],
        ["Tous deux y voient un simple argument de lobbying avancé par les entreprises.", "Both treat it as a mere lobbying argument put forward by firms."],
        ["L'animateur défend l'ajustement aux frontières, la professeure redoute une barrière commerciale.", "The host defends border adjustment; the professor fears a trade barrier."],
        ["La professeure admet le risque mais le circonscrit à quelques secteurs, l'animateur en souligne l'effet concret sur l'emploi.", "The professor admits the risk but confines it to a few sectors; the host stresses its concrete effect on jobs."]
      ],
      3,
      "La proposition 2 intervertit les rôles : c'est la professeure qui juge l'ajustement nécessaire pour l'acier, le ciment et la chimie, et l'animateur qui redoute qu'on y voie une barrière commerciale.",
      "Option 2 swaps the speakers: it is the professor who considers border adjustment necessary for steel, cement and chemicals, and the host who fears it will be seen as a trade barrier."
    ),
    q(
      "Que répond la professeure à l'objection « vous avez émis pendant deux cents ans » ?",
      "How does the professor answer the objection 'you emitted for two hundred years'?",
      [
        ["Que l'objection confond émissions historiques et émissions actuelles.", "That the objection confuses historical and current emissions."],
        ["Qu'elle est fondée, et qu'il faut affecter les recettes du mécanisme au transfert de technologies.", "That it is sound, and that the mechanism's revenue should fund technology transfer."],
        ["Que l'ajustement aux frontières est de toute façon un protectionnisme nécessaire.", "That border adjustment is in any case a necessary form of protectionism."],
        ["Qu'il faut différer le mécanisme jusqu'à l'industrialisation de ces pays.", "That the mechanism should be postponed until those countries have industrialised."]
      ],
      1,
      "Elle tient l'objection pour « 成立 » et propose d'y répondre de front ; sans transfert de technologies, l'ajustement ne serait qu'« un protectionnisme repeint en vert », ce qu'elle refuse d'assumer.",
      "She calls the objection '成立' (valid) and proposes to meet it head-on; without technology transfer the mechanism would be 'protectionism in a green coat', which she explicitly rejects."
    ),
    q(
      "Sur quel point les deux interlocuteurs se rejoignent-ils explicitement à la fin ?",
      "What do the two speakers explicitly converge on at the end?",
      [
        ["Présenter la neutralité carbone comme « indolore » détruit la confiance du public.", "Calling carbon neutrality 'painless' destroys public trust."],
        ["L'échéance de 2035 est manifestement trop ambitieuse.", "The 2035 deadline is clearly too ambitious."],
        ["La politique industrielle doit purement et simplement remplacer l'objectif climatique.", "Industrial policy should simply replace the climate target."],
        ["La rapidité de versement des compensations s'est nettement améliorée.", "The speed at which compensation is paid out has markedly improved."]
      ],
      0,
      "L'animateur formule l'accord (« au moins nous accordons-nous sur un point ») et la professeure répond « 完全同意 ». La politique industrielle est présentée comme une condition de la politique climatique, non comme son remplacement.",
      "The host states the agreement ('at least we agree on one thing') and the professor replies '完全同意'. Industrial policy is framed as a condition for climate policy, not a replacement for it."
    )
  ],
  "dlg-b22-heritage": [
    q(
      "Quelle réserve la commissaire d'exposition formule-t-elle d'emblée ?",
      "What reservation does the curator raise at the outset?",
      [
        ["Le monde des musées s'oppose par principe à toute restitution.", "The museum world opposes all restitution on principle."],
        ["Parler de restitution en général masque l'histoire très différente de chaque pièce.", "Talking about restitution in general masks each object's very different history."],
        ["Seul le détenteur actuel est qualifié pour fixer les critères de restitution.", "Only the current holder is qualified to set restitution criteria."],
        ["Les pays d'origine n'ont généralement pas les moyens techniques de conserver les objets.", "Source countries generally lack the technical means to conserve the objects."]
      ],
      1,
      "Elle écarte explicitement le refus de principe. La proposition 3 est justement l'argument qu'elle refusera plus tard d'ériger en prétexte, et la proposition 2 est ce que la chercheuse lui reproche, non ce qu'elle défend.",
      "She explicitly rules out blanket refusal. Option 3 is precisely the argument she later refuses to turn into a pretext, and option 2 is what the researcher criticises, not what she claims."
    ),
    q(
      "Comment la chercheuse répond-elle au flou de la notion de « pays d'origine » ?",
      "How does the researcher answer the vagueness of 'country of origin'?",
      [
        ["En proposant de retenir le lieu de découverte comme critère unique.", "By proposing the place of excavation as the sole criterion."],
        ["En estimant que le tracé des frontières actuelles est suffisamment précis.", "By holding that current borders are drawn precisely enough."],
        ["En proposant de confier tous les litiges à une juridiction internationale unique.", "By proposing that all disputes go to a single international court."],
        ["En rappelant que la continuité humaine tient à la langue, aux rites et à la mémoire, non aux tracés.", "By recalling that human continuity rests on language, ritual and memory, not on borders."]
      ],
      3,
      "Elle ne conteste pas que les frontières bougent ; elle déplace le critère de la carte vers la continuité culturelle vécue, et laisse à la communauté locale le soin de dire si l'objet est « le sien ».",
      "She does not deny that borders shift; she moves the criterion from the map to lived cultural continuity, leaving it to the local community to say whether the object is 'theirs'."
    ),
    q(
      "Quelle idée les deux interlocuteurs jugent-elles la plus constructive ?",
      "Which idea do both speakers consider the most constructive?",
      [
        ["Dissocier la reconnaissance de la propriété du déplacement physique de l'objet.", "Separating acknowledgement of ownership from physical movement of the object."],
        ["Commencer par un prêt de longue durée et n'aborder la propriété qu'ensuite.", "Starting with a long-term loan and only later addressing ownership."],
        ["Laisser la propriété au détenteur et lui faire verser une redevance au pays d'origine.", "Leaving ownership with the holder, who pays a fee to the source country."],
        ["Suspendre toute restitution jusqu'à l'achèvement des nouveaux musées.", "Suspending all restitution until the new museums are completed."]
      ],
      0,
      "La proposition 1 inverse l'ordre proposé : la chercheuse suggère de reconnaître d'abord la propriété, puis seulement de négocier la garde, dont le prêt de longue durée n'est qu'une modalité possible.",
      "Option 1 reverses the proposed order: the researcher suggests acknowledging ownership first and only then negotiating custody, of which a long-term loan is merely one possible form."
    ),
    q(
      "Sur quoi porte la réfutation du « musée universel » par la chercheuse ?",
      "What is the researcher's objection to the 'universal museum'?",
      [
        ["La comparaison entre civilisations ne produit aucun savoir véritable.", "Comparing civilisations produces no genuine knowledge."],
        ["L'agencement des salles de ces musées nuit à la compréhension du public.", "The gallery layout of such museums hampers public understanding."],
        ["Le rassemblement a toujours été à sens unique : si la comparaison vaut, ses lieux doivent être pluriels.", "The gathering has always been one-directional: if comparison is worthwhile, its venues should be plural."],
        ["Cette idée a été abandonnée par la grande majorité des chercheurs.", "The idea has been abandoned by the vast majority of scholars."]
      ],
      2,
      "Elle concède la valeur de la comparaison (« j'ai moi-même grandi dans ces salles ») et retourne le principe : c'est la concentration à sens unique, non la comparaison, qui est contestée.",
      "She concedes the value of comparison ('I grew up in those galleries') and turns the principle around: what she challenges is the one-way concentration, not comparison itself."
    ),
    q(
      "Quelle condition la chercheuse ajoute-t-elle à la transparence du processus ?",
      "What condition does the researcher add to procedural transparency?",
      [
        ["Que les experts évaluateurs soient désignés par le seul pays d'origine.", "That assessing experts be appointed by the source country alone."],
        ["Que le prix d'acquisition de chaque pièce soit rendu public.", "That the acquisition price of every object be made public."],
        ["Que le détenteur continue de financer la recherche après la restitution.", "That the holder keep funding research after restitution."],
        ["Que chaque demande reçoive une réponse dans un délai explicite.", "That every request receive an answer within an explicit deadline."]
      ],
      3,
      "Sans échéance, dit-elle, la transparence devient « un ajournement présentable ». La proposition 2 est un point avancé par la commissaire, non par elle.",
      "Without deadlines, she says, transparency becomes 'respectable procrastination'. Option 2 is a point made by the curator, not by her."
    )
  ],
  "dlg-b22-media": [
    q(
      "Quelle est l'appréciation initiale de l'expert sur la notion de bulle de filtre ?",
      "What is the expert's initial assessment of the filter-bubble notion?",
      [
        ["L'image est parlante, mais les études montrent que les gros utilisateurs voient des opinions plus variées.", "The image is vivid, but studies show heavy users see more varied opinions."],
        ["L'image est exacte : plusieurs études confirment un isolement complet des utilisateurs.", "The image is accurate: several studies confirm users are entirely isolated."],
        ["L'image est secondaire, car l'ordre chronologique isole tout autant.", "The image is beside the point, since chronological ordering isolates just as much."],
        ["L'image est dépassée, car les systèmes n'optimisent plus le temps passé.", "The image is outdated, since systems no longer optimise for time spent."]
      ],
      0,
      "Il juge la formule « 有待商榷 » et déplace le problème : ce n'est pas le manque d'exposition qui pose problème, mais l'hostilité qui suit l'exposition. Il maintient au contraire que le système optimise le temps passé.",
      "He calls the phrase '有待商榷' and relocates the problem: it is not lack of exposure but the hostility that follows exposure. He in fact insists the system optimises time spent."
    ),
    q(
      "Comment le journaliste corrige-t-il la formule « on ne voit plus l'autre camp » ?",
      "How does the journalist revise the claim 'we no longer see the other side'?",
      [
        ["Les utilisateurs bloquent en réalité eux-mêmes toute opinion adverse.", "Users in fact block every opposing view themselves."],
        ["Les opinions adverses n'apparaissent qu'en période électorale.", "Opposing views only surface during election periods."],
        ["On voit bien l'autre camp, mais seulement dans sa version la plus détestable.", "We do see the other side, but only in its most odious version."],
        ["L'algorithme a déjà filtré la totalité des contenus extrêmes.", "The algorithm has already filtered out all extreme content."]
      ],
      2,
      "Il reformule par 与其说…不如说 : le problème n'est pas l'invisibilité de l'adversaire mais la version la plus irritante qui en est diffusée. L'algorithme met en avant l'extrême, il ne le filtre pas.",
      "He recasts it with 与其说…不如说: the problem is not the opponent's invisibility but the most infuriating version being circulated. The algorithm foregrounds extremes rather than filtering them out."
    ),
    q(
      "Où se situe exactement le désaccord sur l'auto-sélection ?",
      "Where exactly does the disagreement about self-selection lie?",
      [
        ["Le journaliste nie l'auto-sélection, l'expert en fait la cause unique.", "The journalist denies self-selection; the expert makes it the sole cause."],
        ["Le journaliste l'admet, mais oppose choix visibles, révisables, et tris invisibles, qui ne le sont pas.", "The journalist grants it, but contrasts visible, revisable choices with invisible rankings."],
        ["L'expert croit la liste d'abonnements générée par l'algorithme, le journaliste par l'utilisateur.", "The expert thinks the follow list is algorithm-generated; the journalist thinks it is user-generated."],
        ["Tous deux pensent qu'éteindre la recommandation suffirait à supprimer l'homogénéisation.", "Both believe switching off recommendation would remove homogenisation."]
      ],
      1,
      "L'expert dit qu'une part « appréciable », non la totalité, vient de l'utilisateur ; le journaliste concède ce rôle et déplace la discussion sur la visibilité des décisions, donc sur leur révisabilité.",
      "The expert says a 'sizeable share', not all, comes from users; the journalist grants that role and shifts the argument to the visibility of decisions, hence their revisability."
    ),
    q(
      "Pourquoi l'expert préfère-t-il agir sur les réglages par défaut ?",
      "Why does the expert prefer to act on default settings?",
      [
        ["Parce que l'immense majorité des utilisateurs ouvre la page des paramètres.", "Because the vast majority of users open the settings page."],
        ["Parce que le contrôle contenu par contenu coûte nettement moins cher.", "Because item-by-item review is markedly cheaper."],
        ["Parce que la définition de l'« hétérogène » fait déjà l'objet d'une norme internationale.", "Because 'heterogeneous' is already defined by an international standard."],
        ["Parce que cela préserve la diversité tout en évitant un contrôle contenu par contenu.", "Because it preserves diversity while avoiding item-by-item review."]
      ],
      3,
      "C'est le journaliste qui rappelle que presque personne n'ouvre les paramètres ; l'expert en tire l'idée d'une contrainte sur les valeurs par défaut, alternative explicite à la censure au cas par cas.",
      "It is the journalist who notes that almost nobody opens the settings; the expert draws from this the idea of constraining defaults as an explicit alternative to case-by-case censorship."
    ),
    q(
      "Quelle formulation résume l'accord final des deux interlocuteurs ?",
      "Which statement sums up their final agreement?",
      [
        ["Le mot « bulle » est exact et la responsabilité incombe entièrement aux plateformes.", "The word 'bubble' is accurate and responsibility lies wholly with platforms."],
        ["Le mot « bulle » ne veut rien dire et la responsabilité incombe entièrement aux utilisateurs.", "The word 'bubble' is meaningless and responsibility lies wholly with users."],
        ["Le mot « bulle » simplifie, mais l'inquiétude est réelle et la responsabilité doit être répartie par la régulation.", "The word 'bubble' oversimplifies, but the worry is real and responsibility must be apportioned by regulation."],
        ["L'amélioration des algorithmes suffit à compenser le coût du travail rédactionnel.", "Improving algorithms is enough to offset the cost of editorial work."]
      ],
      2,
      "L'expert refuse les deux imputations exclusives et confie à la « conception institutionnelle » la recherche d'un équilibre applicable ; l'algorithme, dit-il lui-même, ne rend pas ses revenus au journalisme.",
      "The expert rejects both exclusive attributions and hands the search for a workable balance to 'institutional design'; he himself notes that the algorithm does not return revenue to journalism."
    )
  ],
  "dlg-b22-aging": [
    q(
      "Quelle est la première réaction du journaliste à l'« arithmétique démographique » ?",
      "What is the journalist's first reaction to the 'demographic arithmetic'?",
      [
        ["Il conteste l'évolution du rapport entre cotisants et pensionnés.", "He disputes the changing ratio of contributors to pensioners."],
        ["Il juge très exagérées les données sur l'allongement de l'espérance de vie.", "He considers the life-expectancy data heavily exaggerated."],
        ["Il propose la hausse des cotisations comme unique solution de rechange.", "He proposes higher contributions as the sole alternative."],
        ["Il admet l'arithmétique, mais souligne qu'elle n'impose aucune solution unique.", "He grants the arithmetic but stresses that it dictates no single solution."]
      ],
      3,
      "Il commence par « 我不否认 » puis énumère plusieurs variables ajustables — taux, assiette, fiscalité — sans en privilégier aucune ; il n'en fait donc pas une solution de rechange unique.",
      "He opens with '我不否认' and then lists several adjustable variables — rate, base, tax structure — without singling one out, so he offers no single alternative."
    ),
    q(
      "Pourquoi la professeure refuse-t-elle de corriger les écarts professionnels par l'âge de départ ?",
      "Why does the professor refuse to correct occupational gaps through the retirement age?",
      [
        ["Parce que l'état de santé d'un maçon et d'un employé de bureau est en fait comparable.", "Because a builder's and an office worker's health are in fact comparable."],
        ["Parce qu'un âge uniforme est un instrument grossier : mieux vaut un droit au départ anticipé pour les métiers pénibles.", "Because a uniform age is a blunt instrument: better to grant early retirement rights for arduous work."],
        ["Parce que les listes de métiers pénibles fonctionnent déjà très bien dans tous les pays.", "Because lists of arduous occupations already work very well everywhere."],
        ["Parce que la compensation des écarts relève des entreprises et non du système de retraite.", "Because compensating the gaps is a matter for firms, not for the pension system."]
      ],
      1,
      "Elle reconnaît explicitement l'injustice signalée par le journaliste ; c'est l'outil, non le constat, qu'elle juge « 笨拙 ». C'est le journaliste, ensuite, qui montrera que ces listes fonctionnent mal.",
      "She explicitly accepts the unfairness the journalist raises; what she calls '笨拙' is the instrument, not the diagnosis. It is the journalist who later shows such lists work badly."
    ),
    q(
      "En quoi consiste le passage « du métier à l'exposition » ?",
      "What does the shift 'from occupation to exposure' consist of?",
      [
        ["Dresser une liste unique de métiers pénibles branche par branche.", "Drawing up a single sector-by-sector list of arduous occupations."],
        ["Laisser les syndicats déclarer eux-mêmes l'état de santé de leurs adhérents.", "Letting unions themselves report their members' state of health."],
        ["Calculer à partir d'indicateurs vérifiables : heures de nuit, port de charges, substances nocives.", "Calculating from auditable indicators: night hours, load-bearing, harmful substances."],
        ["S'en remettre à un examen médical effectué au moment du départ.", "Relying on a medical examination carried out at the time of retirement."]
      ],
      2,
      "Dresser une liste de métiers pénibles branche par branche est précisément ce que l'« exposition » doit remplacer, puisque l'intitulé de branche se prête au lobbying. L'avantage revendiqué est que le critère devient « 可核查 », vérifiable : heures de nuit, port de charges, substances nocives.",
      "Option 0 is exactly what 'exposure' is meant to replace, since sector labels invite lobbying. The claimed advantage is that the criterion becomes '可核查' (auditable)."
    ),
    q(
      "Que répond la professeure à la critique sur la fragilité des chiffres du déficit ?",
      "How does the professor answer the criticism that the deficit figures are fragile?",
      [
        ["Elle accepte la critique, mais rappelle que l'incertitude joue aussi dans le sens le plus défavorable.", "She accepts the criticism but notes that uncertainty also runs in the worse direction."],
        ["Elle maintient ses chiffres, issus d'organismes officiels et donc non révisables.", "She stands by her figures, which come from official bodies and cannot be revised."],
        ["Elle en conclut qu'il faut différer toute décision tant que l'incertitude demeure.", "She concludes that any decision should be postponed while uncertainty remains."],
        ["Elle estime que l'hypothèse migratoire est la seule variable réellement fiable.", "She holds that the migration assumption is the only truly reliable variable."]
      ],
      0,
      "Elle qualifie la critique de « 公道 » et concède que ses chiffres ne sont que des ordres de grandeur, mais retourne l'argument : « 以不确定为由推迟决定，并不比现在决定更稳妥 ».",
      "She calls the criticism '公道' (fair) and concedes her figures are only orders of magnitude, but turns the argument round: '以不确定为由推迟决定，并不比现在决定更稳妥'."
    ),
    q(
      "À quoi le désaccord se réduit-il en fin de dialogue ?",
      "What does the disagreement come down to by the end?",
      [
        ["À la reconnaissance ou non des métiers pénibles.", "Whether arduous occupations should be recognised at all."],
        ["Non à l'idée de travailler plus longtemps, mais au fait de l'imposer comme mesure isolée.", "Not the idea of working longer, but imposing it as an isolated measure."],
        ["Au niveau souhaitable du taux d'emploi des seniors.", "The desirable level of the senior employment rate."],
        ["À l'intégration du travail bénévole dans la comptabilité nationale.", "Whether unpaid work should enter the national accounts."]
      ],
      1,
      "La professeure a elle-même posé trois conditions cumulatives, et le journaliste conclut « 我反对的从来不是…而是把它当作一项孤立的措施推出 » : les deux positions convergent sur le principe et divergent sur le conditionnement.",
      "The professor has already set three cumulative conditions, and the journalist concludes '我反对的从来不是…而是把它当作一项孤立的措施推出': both converge on the principle and differ on the accompanying conditions."
    )
  ]
};

export const getDialogueQuiz = (id: string): Q[] | null =>
  DIALOGUE_QUIZZES[id] ?? null;
