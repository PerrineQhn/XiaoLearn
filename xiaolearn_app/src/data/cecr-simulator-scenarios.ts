/**
 * cecr-simulator-scenarios.ts — catalogue des 20 scénarios du Simulateur
 * ----------------------------------------------------------------------
 * XiaoLearn V6 — 4 catégories × 5 scénarios = 20 situations de conversation,
 * couvrant A1 → C2.2. Chaque scénario est un mini-jeu de rôle IA : Prof. Xiao
 * incarne un persona, l'apprenant doit atteindre un objectif en 3 à 5 étapes,
 * et l'IA corrige par recast implicite (pas de flag d'erreur, reformulation
 * naturelle).
 *
 * Les scénarios sont rédigés en pensant à un public francophone apprenant le
 * mandarin (donc culturellement orientés Chine continentale : pinyin, 普通话,
 * contextes Pékin/Shanghai, adresses Beijing, DiDi, Alipay, etc.).
 */

import type { SimulatorScenario } from '../types/simulator';

// ============================================================================
//  🥡 VIE QUOTIDIENNE (5 scénarios)
// ============================================================================

const restaurant: SimulatorScenario = {
  id: 'sim-restaurant',
  titleFr: 'Au restaurant',
  titleEn: 'At the restaurant',
  descriptionFr: 'Tu dînes dans un 饭馆 pékinois. Le serveur t\'accueille et tu dois commander un plat sans piment puis demander l\'addition.',
  descriptionEn: 'You\'re dining in a Beijing restaurant. The waiter greets you and you must order a dish without chili, then ask for the bill.',
  emoji: '🥟',
  category: 'daily',
  difficulty: 'beginner',
  levelFloor: 'a1',
  levelCeiling: 'b1.1',
  register: 'neutral-polite',
  personaFr: 'Un serveur chaleureux dans un restaurant de raviolis à Pékin.',
  personaEn: 'A warm waiter in a dumpling restaurant in Beijing.',
  goalFr: 'Commande un plat sans piment (不要辣) et demande l\'addition (买单).',
  goalEn: 'Order a dish without chili and ask for the bill.',
  vocab: [
    { hanzi: '菜单', pinyin: 'càidān', translationFr: 'menu' },
    { hanzi: '点菜', pinyin: 'diǎncài', translationFr: 'commander un plat' },
    { hanzi: '不要辣', pinyin: 'búyào là', translationFr: 'sans piment' },
    { hanzi: '一份', pinyin: 'yí fèn', translationFr: 'une portion' },
    { hanzi: '买单', pinyin: 'mǎidān', translationFr: 'l\'addition' },
    { hanzi: '谢谢', pinyin: 'xièxie', translationFr: 'merci' }
  ],
  openingLineHanzi: '欢迎光临！几位？',
  openingLinePinyin: 'Huānyíng guānglín! Jǐ wèi?',
  openingLineFr: 'Bienvenue ! Vous êtes combien ?',
  steps: [
    {
      id: 'seating',
      nameFr: 'Accueil',
      nameEn: 'Greeting',
      hintsFr: ['Dis combien vous êtes (ex: 我们两个人)', 'Demande une table près de la fenêtre', 'Dis que tu as réservé'],
      completionCriterionFr: 'L\'utilisateur a indiqué le nombre de convives ou a fait une demande de table.'
    },
    {
      id: 'order',
      nameFr: 'Commande',
      nameEn: 'Ordering',
      hintsFr: ['Commande un plat (我要一份…)', 'Demande la spécialité (招牌菜是什么)', 'Précise « sans piment » (不要辣)'],
      completionCriterionFr: 'L\'utilisateur a commandé au moins un plat et mentionné « sans piment » ou accepté un plat non épicé.'
    },
    {
      id: 'drinks',
      nameFr: 'Boisson',
      nameEn: 'Drinks',
      hintsFr: ['Commande un thé (来一壶茶)', 'Demande de l\'eau chaude', 'Dis « pas de boisson, merci »'],
      completionCriterionFr: 'L\'utilisateur a répondu à la question de boisson (commandé ou refusé).'
    },
    {
      id: 'bill',
      nameFr: 'Addition',
      nameEn: 'Bill',
      hintsFr: ['Demande l\'addition (买单)', 'Demande à payer par 微信/支付宝', 'Remercie le serveur'],
      completionCriterionFr: 'L\'utilisateur a demandé l\'addition.'
    }
  ],
  successMessageFr: 'Bravo ! Tu as commandé et payé ton repas comme un local 🥟.',
  extraSystemInstructionsFr: 'Privilégie des plats pékinois typiques (炸酱面, 饺子, 北京烤鸭 optionnel). Propose le paiement mobile (微信支付) si l\'apprenant hésite.'
};

const cafe: SimulatorScenario = {
  id: 'sim-cafe',
  titleFr: 'Au café',
  titleEn: 'At the café',
  descriptionFr: 'Dans un café 星巴克 de Shanghai : commande une boisson, demande le mot de passe wifi.',
  descriptionEn: 'In a Starbucks in Shanghai: order a drink and ask for the wifi password.',
  emoji: '☕',
  category: 'daily',
  difficulty: 'beginner',
  levelFloor: 'a1',
  levelCeiling: 'a2',
  register: 'neutral-polite',
  personaFr: 'Un barista pressé mais sympa dans un café branché de Shanghai.',
  goalFr: 'Commande un café chaud de taille moyenne et récupère le mot de passe wifi.',
  vocab: [
    { hanzi: '咖啡', pinyin: 'kāfēi', translationFr: 'café' },
    { hanzi: '拿铁', pinyin: 'nátiě', translationFr: 'latte' },
    { hanzi: '中杯', pinyin: 'zhōng bēi', translationFr: 'taille moyenne' },
    { hanzi: '热的', pinyin: 'rè de', translationFr: 'chaud' },
    { hanzi: 'Wi-Fi密码', pinyin: 'Wi-Fi mìmǎ', translationFr: 'mot de passe wifi' },
    { hanzi: '多少钱', pinyin: 'duōshao qián', translationFr: 'combien ça coûte' }
  ],
  openingLineHanzi: '您好，请问需要点什么？',
  openingLinePinyin: 'Nín hǎo, qǐngwèn xūyào diǎn shénme?',
  openingLineFr: 'Bonjour, que souhaitez-vous commander ?',
  steps: [
    {
      id: 'order',
      nameFr: 'Commande',
      hintsFr: ['Dis le type de café (我要一杯拿铁)', 'Précise la taille (中杯)', 'Précise chaud ou glacé (热的 / 冰的)'],
      completionCriterionFr: 'L\'utilisateur a commandé une boisson avec au minimum taille OU température.'
    },
    {
      id: 'pay',
      nameFr: 'Paiement',
      hintsFr: ['Demande le prix (多少钱)', 'Paye par 微信 / 支付宝', 'Demande un reçu'],
      completionCriterionFr: 'L\'utilisateur a proposé un moyen de paiement ou accepté le montant.'
    },
    {
      id: 'wifi',
      nameFr: 'Wifi',
      hintsFr: ['Demande le mot de passe (Wi-Fi密码是什么)', 'Demande où s\'asseoir', 'Remercie'],
      completionCriterionFr: 'L\'utilisateur a demandé explicitement le wifi OU a terminé en remerciant.'
    }
  ],
  successMessageFr: 'Parfait ! Tu peux t\'installer et bosser ☕.'
};

const supermarche: SimulatorScenario = {
  id: 'sim-supermarket',
  titleFr: 'Au supermarché',
  titleEn: 'At the supermarket',
  descriptionFr: 'Tu cherches des œufs au 超市 et passes en caisse. Demande un prix, vérifie la péremption.',
  emoji: '🛒',
  category: 'daily',
  difficulty: 'beginner',
  levelFloor: 'a1',
  levelCeiling: 'b1.1',
  register: 'neutral-polite',
  personaFr: 'Un employé du rayon frais puis une caissière à la fin.',
  goalFr: 'Trouve les œufs, vérifie la date, demande le prix, paye.',
  vocab: [
    { hanzi: '鸡蛋', pinyin: 'jīdàn', translationFr: 'œufs' },
    { hanzi: '在哪里', pinyin: 'zài nǎlǐ', translationFr: 'où est-ce que' },
    { hanzi: '保质期', pinyin: 'bǎozhìqī', translationFr: 'date de péremption' },
    { hanzi: '多少钱', pinyin: 'duōshao qián', translationFr: 'combien ça coûte' },
    { hanzi: '袋子', pinyin: 'dàizi', translationFr: 'sac' },
    { hanzi: '扫码', pinyin: 'sǎomǎ', translationFr: 'scanner le QR code' }
  ],
  openingLineHanzi: '您好，需要帮忙吗？',
  openingLinePinyin: 'Nín hǎo, xūyào bāngmáng ma?',
  openingLineFr: 'Bonjour, besoin d\'aide ?',
  steps: [
    {
      id: 'find',
      nameFr: 'Trouver le rayon',
      hintsFr: ['Demande où sont les œufs (鸡蛋在哪里)', 'Demande le rayon frais', 'Demande des œufs bio'],
      completionCriterionFr: 'L\'utilisateur a demandé où trouver un produit.'
    },
    {
      id: 'check',
      nameFr: 'Vérifier',
      hintsFr: ['Vérifie la date (保质期到什么时候)', 'Demande le prix au kilo', 'Demande s\'il y a moins cher'],
      completionCriterionFr: 'L\'utilisateur a vérifié la date ou le prix.'
    },
    {
      id: 'checkout',
      nameFr: 'Passer en caisse',
      hintsFr: ['Dis « je paie ça »', 'Demande un sac (我要一个袋子)', 'Paye par QR (支付宝扫码)'],
      completionCriterionFr: 'L\'utilisateur est passé à l\'étape paiement.'
    }
  ],
  successMessageFr: 'Génial ! Tu sais gérer le supermarché chinois 🥚.'
};

const taxi: SimulatorScenario = {
  id: 'sim-taxi',
  titleFr: 'En taxi / DiDi',
  titleEn: 'Taxi / DiDi',
  descriptionFr: 'Tu montes dans un 滴滴 à Pékin. Explique ta destination, gère le trafic, paie.',
  emoji: '🚕',
  category: 'daily',
  difficulty: 'intermediate',
  levelFloor: 'a2',
  levelCeiling: 'b1.2',
  register: 'neutral-polite',
  personaFr: 'Un chauffeur DiDi loquace et un peu bavard, de Pékin.',
  goalFr: 'Donne l\'adresse, précise par où passer, règle la course par 微信.',
  vocab: [
    { hanzi: '师傅', pinyin: 'shīfu', translationFr: 'chauffeur (appellatif poli)' },
    { hanzi: '去…', pinyin: 'qù…', translationFr: 'aller à…' },
    { hanzi: '地址', pinyin: 'dìzhǐ', translationFr: 'adresse' },
    { hanzi: '堵车', pinyin: 'dǔchē', translationFr: 'embouteillage' },
    { hanzi: '走这条路', pinyin: 'zǒu zhè tiáo lù', translationFr: 'prendre cette route' },
    { hanzi: '到了', pinyin: 'dào le', translationFr: 'on est arrivés' },
    { hanzi: '收据', pinyin: 'shōujù', translationFr: 'reçu' }
  ],
  openingLineHanzi: '您好，咱们去哪儿？',
  openingLinePinyin: 'Nín hǎo, zánmen qù nǎr?',
  openingLineFr: 'Bonjour, où on va ?',
  steps: [
    {
      id: 'address',
      nameFr: 'Destination',
      hintsFr: ['Donne l\'adresse (我去…)', 'Dis le nom du lieu (天安门广场)', 'Demande combien de temps'],
      completionCriterionFr: 'L\'utilisateur a donné une destination précise.'
    },
    {
      id: 'route',
      nameFr: 'Itinéraire',
      hintsFr: ['Suggère une route (走二环比较快)', 'Commente le trafic (今天堵车吗)', 'Demande d\'éviter le centre'],
      completionCriterionFr: 'L\'utilisateur a discuté de l\'itinéraire ou du trafic.'
    },
    {
      id: 'arrival',
      nameFr: 'Arrivée',
      hintsFr: ['Dis « arrêtez-vous là » (师傅，停这里)', 'Demande le prix (多少钱)', 'Demande un reçu (我要收据)'],
      completionCriterionFr: 'L\'utilisateur a conclu la course (paiement / reçu / sortie).'
    }
  ],
  successMessageFr: 'Tu viens de naviguer Pékin en taxi comme un pro 🚖.',
  extraSystemInstructionsFr: 'Le chauffeur peut spontanément poser des questions sur la France, le métier de l\'apprenant, etc. (les chauffeurs pékinois sont connus pour ça).'
};

const pharmacie: SimulatorScenario = {
  id: 'sim-pharmacy',
  titleFr: 'À la pharmacie',
  titleEn: 'At the pharmacy',
  descriptionFr: 'Tu as mal à la tête et à la gorge. Décris tes symptômes et achète un médicament.',
  emoji: '💊',
  category: 'daily',
  difficulty: 'intermediate',
  levelFloor: 'a2',
  levelCeiling: 'b1.2',
  register: 'neutral-polite',
  personaFr: 'Un pharmacien calme dans une 药店 de quartier.',
  goalFr: 'Décris au moins 2 symptômes et achète un médicament adapté.',
  vocab: [
    { hanzi: '头疼', pinyin: 'tóuténg', translationFr: 'mal de tête' },
    { hanzi: '嗓子疼', pinyin: 'sǎngzi téng', translationFr: 'mal à la gorge' },
    { hanzi: '发烧', pinyin: 'fāshāo', translationFr: 'fièvre' },
    { hanzi: '药', pinyin: 'yào', translationFr: 'médicament' },
    { hanzi: '一天三次', pinyin: 'yì tiān sān cì', translationFr: 'trois fois par jour' },
    { hanzi: '饭后', pinyin: 'fàn hòu', translationFr: 'après le repas' }
  ],
  openingLineHanzi: '您好，您哪儿不舒服？',
  openingLinePinyin: 'Nín hǎo, nín nǎr bù shūfu?',
  openingLineFr: 'Bonjour, où avez-vous mal ?',
  steps: [
    {
      id: 'symptoms',
      nameFr: 'Symptômes',
      hintsFr: ['Dis où tu as mal (我头疼，嗓子也疼)', 'Dis depuis quand (两天了)', 'Dis si tu as de la fièvre'],
      completionCriterionFr: 'L\'utilisateur a décrit au moins 2 symptômes ou un symptôme + durée.'
    },
    {
      id: 'choose',
      nameFr: 'Choix du médicament',
      hintsFr: ['Demande un conseil (有什么药)', 'Demande si c\'est pour adulte', 'Demande si ça donne sommeil'],
      completionCriterionFr: 'L\'utilisateur a discuté du médicament proposé (accepté / demandé alternative).'
    },
    {
      id: 'dosage',
      nameFr: 'Posologie',
      hintsFr: ['Demande la posologie (怎么吃)', 'Demande avant ou après repas', 'Demande le prix'],
      completionCriterionFr: 'L\'utilisateur a demandé comment prendre le médicament ou a payé.'
    }
  ],
  successMessageFr: 'Tu as géré ta pharmacie chinoise 💊 — bon rétablissement !'
};

// ============================================================================
//  💼 TRAVAIL & SOCIAL (5 scénarios)
// ============================================================================

const premierJour: SimulatorScenario = {
  id: 'sim-first-day',
  titleFr: 'Premier jour au bureau',
  titleEn: 'First day at work',
  descriptionFr: 'Ton manager te présente l\'équipe. Présente-toi en retour et apprends à connaître tes collègues.',
  emoji: '🧑‍💼',
  category: 'work',
  difficulty: 'intermediate',
  levelFloor: 'b1.1',
  levelCeiling: 'b2.1',
  register: 'business',
  personaFr: 'Ton nouveau manager, 李经理, ainsi que 2-3 collègues qu\'il te présente.',
  goalFr: 'Présente-toi (nom, nationalité, poste, parcours), pose une question à un collègue.',
  vocab: [
    { hanzi: '经理', pinyin: 'jīnglǐ', translationFr: 'manager' },
    { hanzi: '同事', pinyin: 'tóngshì', translationFr: 'collègue' },
    { hanzi: '介绍一下', pinyin: 'jièshào yīxià', translationFr: 'se présenter (brièvement)' },
    { hanzi: '负责', pinyin: 'fùzé', translationFr: 'être responsable de' },
    { hanzi: '项目', pinyin: 'xiàngmù', translationFr: 'projet' },
    { hanzi: '请多关照', pinyin: 'qǐng duō guānzhào', translationFr: 'merci de m\'accompagner (formule d\'intégration)' }
  ],
  openingLineHanzi: '欢迎加入我们团队！先给大家介绍一下自己吧。',
  openingLinePinyin: 'Huānyíng jiārù wǒmen tuánduì! Xiān gěi dàjiā jièshào yīxià zìjǐ ba.',
  openingLineFr: 'Bienvenue dans notre équipe ! Présente-toi d\'abord à tout le monde.',
  steps: [
    {
      id: 'self',
      nameFr: 'Présentation',
      hintsFr: ['Dis ton nom (我叫…)', 'Dis ton pays (我来自法国)', 'Dis ton poste (我是…)'],
      completionCriterionFr: 'L\'utilisateur s\'est présenté avec au moins nom + un autre élément.'
    },
    {
      id: 'background',
      nameFr: 'Parcours',
      hintsFr: ['Parle de ton expérience (我以前在…工作)', 'Parle de tes études', 'Mentionne depuis quand tu apprends le chinois'],
      completionCriterionFr: 'L\'utilisateur a donné un élément de parcours professionnel.'
    },
    {
      id: 'colleagues',
      nameFr: 'Rencontrer les collègues',
      hintsFr: ['Demande à un collègue ce qu\'il fait (你负责什么)', 'Conclue par 请多关照', 'Propose un café après'],
      completionCriterionFr: 'L\'utilisateur a posé au moins une question à un collègue ou prononcé une formule de cloture polie.'
    }
  ],
  successMessageFr: 'Impeccable ! Tu as survécu au 自我介绍 de premier jour 👔.',
  extraSystemInstructionsFr: 'Utilise un registre pro courtois. Le manager parle ; après la présentation, fais parler brièvement 1-2 collègues (ex: 王工 ingénieur, 小陈 designer).'
};

const reunion: SimulatorScenario = {
  id: 'sim-meeting',
  titleFr: 'Réunion d\'équipe',
  titleEn: 'Team meeting',
  descriptionFr: 'Réunion hebdo. Donne ton avis sur la roadmap, pose une question sur les délais.',
  emoji: '💬',
  category: 'work',
  difficulty: 'intermediate',
  levelFloor: 'b1.2',
  levelCeiling: 'b2.2',
  register: 'business',
  personaFr: 'Le chef d\'équipe qui anime la réunion et invite chacun à s\'exprimer.',
  goalFr: 'Donne ton avis sur un point précis, puis pose une question sur les délais.',
  vocab: [
    { hanzi: '会议', pinyin: 'huìyì', translationFr: 'réunion' },
    { hanzi: '我觉得', pinyin: 'wǒ juéde', translationFr: 'je pense que' },
    { hanzi: '同意', pinyin: 'tóngyì', translationFr: 'être d\'accord' },
    { hanzi: '补充一下', pinyin: 'bǔchōng yīxià', translationFr: 'compléter/ajouter' },
    { hanzi: '进度', pinyin: 'jìndù', translationFr: 'avancement' },
    { hanzi: '截止日期', pinyin: 'jiézhǐ rìqī', translationFr: 'date limite' }
  ],
  openingLineHanzi: '大家好。我们先回顾一下上周的进度，然后讨论下一步。',
  openingLinePinyin: 'Dàjiā hǎo. Wǒmen xiān huígù yīxià shàng zhōu de jìndù, ránhòu tǎolùn xià yí bù.',
  openingLineFr: 'Bonjour à tous. Passons en revue l\'avancement de la semaine dernière, puis discutons de la suite.',
  steps: [
    {
      id: 'opinion',
      nameFr: 'Donner son avis',
      hintsFr: ['我觉得这个方向不错', 'Je suis d\'accord avec 小王', 'Propose une alternative'],
      completionCriterionFr: 'L\'utilisateur a exprimé un avis structuré (accord / désaccord / proposition).'
    },
    {
      id: 'question',
      nameFr: 'Poser une question',
      hintsFr: ['Demande la date limite (截止日期是什么时候)', 'Demande qui est responsable', 'Demande s\'il faut plus de ressources'],
      completionCriterionFr: 'L\'utilisateur a posé une question concrète sur planning/responsabilité/ressources.'
    },
    {
      id: 'wrap',
      nameFr: 'Conclusion',
      hintsFr: ['Résume ce qui est décidé', 'Propose le prochain point', 'Remercie'],
      completionCriterionFr: 'L\'utilisateur a clos son tour de parole proprement.'
    }
  ],
  successMessageFr: 'Bien joué ! Tu peux tenir une réunion pro en chinois 📊.'
};

const fanju: SimulatorScenario = {
  id: 'sim-team-dinner',
  titleFr: 'Dîner d\'équipe (饭局)',
  titleEn: 'Team dinner (banquet)',
  descriptionFr: 'Grand classique culturel : le 饭局 d\'équipe. Toasts, étiquette, politesses.',
  emoji: '🍶',
  category: 'work',
  difficulty: 'advanced',
  levelFloor: 'b1.2',
  levelCeiling: 'b2.2',
  register: 'business',
  personaFr: 'Ton manager à la table d\'un 饭局 d\'équipe, qui lance les toasts.',
  goalFr: 'Porte un toast (敬酒) à ton manager avec la formule appropriée, puis un deuxième à l\'équipe.',
  vocab: [
    { hanzi: '干杯', pinyin: 'gānbēi', translationFr: 'trinquer / cul-sec' },
    { hanzi: '敬酒', pinyin: 'jìngjiǔ', translationFr: 'porter un toast' },
    { hanzi: '祝', pinyin: 'zhù', translationFr: 'souhaiter' },
    { hanzi: '合作愉快', pinyin: 'hézuò yúkuài', translationFr: 'collaboration heureuse (formule)' },
    { hanzi: '随意', pinyin: 'suíyì', translationFr: 'à votre convenance (boire un peu)' },
    { hanzi: '辛苦了', pinyin: 'xīnkǔle', translationFr: 'merci pour le dur travail' }
  ],
  openingLineHanzi: '来，大家先端起杯子，我先敬大家一杯！',
  openingLinePinyin: 'Lái, dàjiā xiān duān qǐ bēizi, wǒ xiān jìng dàjiā yì bēi!',
  openingLineFr: 'Allez, tout le monde lève son verre, je vais d\'abord vous porter un toast !',
  steps: [
    {
      id: 'respond',
      nameFr: 'Répondre au toast du chef',
      hintsFr: ['谢谢经理！', 'Dis « 合作愉快 »', '随意 si tu ne veux pas cul-sec'],
      completionCriterionFr: 'L\'utilisateur a répondu au toast du manager de façon socialement appropriée.'
    },
    {
      id: 'toast-manager',
      nameFr: 'Toast au manager',
      hintsFr: ['我敬您一杯', 'Exprime un souhait (祝您身体健康)', 'Termine par 干杯 ou 随意'],
      completionCriterionFr: 'L\'utilisateur a initié un toast au manager avec structure : verbe敬 + pronom + 一杯 + souhait.'
    },
    {
      id: 'toast-team',
      nameFr: 'Toast à l\'équipe',
      hintsFr: ['我敬大家一杯', 'Dis « 合作愉快 »', 'Remercie tout le monde'],
      completionCriterionFr: 'L\'utilisateur a porté un toast à l\'équipe entière.'
    }
  ],
  successMessageFr: 'Félicitations, tu maîtrises l\'art du 敬酒 🥂.',
  extraSystemInstructionsFr: 'Glisse un piège culturel : si l\'apprenant oublie de tenir son verre plus bas que celui du manager, fais-le réagir gentiment par un recast du type 「在中国，敬酒的时候，杯子要端得低一点，表示尊敬。」'
};

const appelTel: SimulatorScenario = {
  id: 'sim-work-call',
  titleFr: 'Appel téléphonique pro',
  titleEn: 'Business phone call',
  descriptionFr: 'Tu appelles un fournisseur pour prendre rendez-vous et confirmer une commande.',
  emoji: '📞',
  category: 'work',
  difficulty: 'advanced',
  levelFloor: 'b1.2',
  levelCeiling: 'b2.2',
  register: 'business',
  personaFr: 'L\'assistant(e) commercial(e) du fournisseur qui répond au téléphone.',
  goalFr: 'Te présenter, demander à parler au responsable achats, prendre un rendez-vous jeudi matin.',
  vocab: [
    { hanzi: '您好', pinyin: 'nín hǎo', translationFr: 'bonjour (poli)' },
    { hanzi: '找…', pinyin: 'zhǎo…', translationFr: 'chercher à parler à…' },
    { hanzi: '不在', pinyin: 'bú zài', translationFr: 'pas là' },
    { hanzi: '留言', pinyin: 'liúyán', translationFr: 'message' },
    { hanzi: '约时间', pinyin: 'yuē shíjiān', translationFr: 'prendre rendez-vous' },
    { hanzi: '周四上午', pinyin: 'zhōusì shàngwǔ', translationFr: 'jeudi matin' }
  ],
  openingLineHanzi: '您好，这里是华星科技，请问您找哪位？',
  openingLinePinyin: 'Nín hǎo, zhèlǐ shì Huáxīng Kējì, qǐngwèn nín zhǎo nǎ wèi?',
  openingLineFr: 'Bonjour, ici Huaxing Tech, qui demandez-vous ?',
  steps: [
    {
      id: 'identify',
      nameFr: 'Identification',
      hintsFr: ['Dis ton nom et ta société (我是…公司的…)', 'Demande le responsable achats (采购经理)', 'Explique en 1 phrase ton objet'],
      completionCriterionFr: 'L\'utilisateur s\'est identifié professionnellement et a demandé un interlocuteur précis.'
    },
    {
      id: 'schedule',
      nameFr: 'Rendez-vous',
      hintsFr: ['Propose jeudi matin (周四上午)', 'Demande si c\'est possible (方便吗)', 'Propose un autre créneau en backup'],
      completionCriterionFr: 'L\'utilisateur a proposé et/ou confirmé un créneau précis.'
    },
    {
      id: 'confirm',
      nameFr: 'Confirmation',
      hintsFr: ['Demande de confirmer par e-mail', 'Remercie formellement', 'Dis 再见'],
      completionCriterionFr: 'L\'utilisateur a confirmé l\'accord et clôturé l\'appel.'
    }
  ],
  successMessageFr: 'Tu viens de caler un RDV en chinois pro, bravo 📞.'
};

const entretien: SimulatorScenario = {
  id: 'sim-interview',
  titleFr: 'Entretien d\'embauche',
  titleEn: 'Job interview',
  descriptionFr: 'Entretien pour un poste de chef de produit à Shanghai. Parle de ton expérience et motivation.',
  emoji: '🎯',
  category: 'work',
  difficulty: 'advanced',
  levelFloor: 'b2.1',
  levelCeiling: 'c1.1',
  register: 'business',
  personaFr: 'La directrice RH qui te fait passer l\'entretien.',
  goalFr: 'Parle de ton parcours, de tes forces, de ta motivation pour Shanghai, pose une question à la fin.',
  vocab: [
    { hanzi: '简历', pinyin: 'jiǎnlì', translationFr: 'CV' },
    { hanzi: '经验', pinyin: 'jīngyàn', translationFr: 'expérience' },
    { hanzi: '优势', pinyin: 'yōushì', translationFr: 'points forts' },
    { hanzi: '动机', pinyin: 'dòngjī', translationFr: 'motivation' },
    { hanzi: '挑战', pinyin: 'tiǎozhàn', translationFr: 'défi' },
    { hanzi: '入职', pinyin: 'rùzhí', translationFr: 'prise de poste' },
    { hanzi: '期待', pinyin: 'qídài', translationFr: 'attendre avec envie' }
  ],
  openingLineHanzi: '请先简单介绍一下自己，主要讲讲你的工作经验和为什么想来上海。',
  openingLinePinyin: 'Qǐng xiān jiǎndān jièshào yīxià zìjǐ, zhǔyào jiǎng jiǎng nǐ de gōngzuò jīngyàn hé wèishénme xiǎng lái Shànghǎi.',
  openingLineFr: 'Présente-toi brièvement, en particulier ton expérience et pourquoi tu veux venir à Shanghai.',
  steps: [
    {
      id: 'intro',
      nameFr: 'Parcours',
      hintsFr: ['Résume 2-3 postes clés', 'Mentionne ta spécialité', 'Cite un résultat chiffré'],
      completionCriterionFr: 'L\'utilisateur a donné un résumé de parcours avec au moins 2 éléments concrets.'
    },
    {
      id: 'strengths',
      nameFr: 'Points forts',
      hintsFr: ['我的优势是…', 'Donne un exemple précis', 'Relie à un besoin du poste'],
      completionCriterionFr: 'L\'utilisateur a identifié au moins un point fort et l\'a illustré.'
    },
    {
      id: 'motivation',
      nameFr: 'Motivation Shanghai',
      hintsFr: ['为什么想来上海', 'Parle du marché chinois', 'Parle de ton intérêt pour la culture'],
      completionCriterionFr: 'L\'utilisateur a exprimé une raison personnelle et une raison professionnelle.'
    },
    {
      id: 'ask',
      nameFr: 'Poser une question',
      hintsFr: ['Demande sur l\'équipe', 'Demande sur la trajectoire de carrière', 'Demande sur le prochain step du process'],
      completionCriterionFr: 'L\'utilisateur a posé une question pertinente à la fin.'
    }
  ],
  successMessageFr: 'Tu viens de survivre à un entretien en mandarin 🎯 — top !'
};

// ============================================================================
//  ❤️ RELATIONS (5 scénarios)
// ============================================================================

const belleFamille: SimulatorScenario = {
  id: 'sim-in-laws',
  titleFr: 'Rencontre avec la belle-famille',
  titleEn: 'Meeting the in-laws',
  descriptionFr: 'Première rencontre avec les parents de ton/ta partenaire chinois(e). Registre très poli requis.',
  emoji: '🫖',
  category: 'relations',
  difficulty: 'advanced',
  levelFloor: 'b2.1',
  levelCeiling: 'c1.1',
  register: 'formal',
  personaFr: 'La mère (阿姨) et le père (叔叔) de ton/ta partenaire, polis mais qui t\'évaluent.',
  goalFr: 'Te présente poliment, offre le cadeau que tu apportes, parle de ta famille, montre du respect.',
  vocab: [
    { hanzi: '阿姨', pinyin: 'āyí', translationFr: 'tata (femme plus âgée, respectueux)' },
    { hanzi: '叔叔', pinyin: 'shūshu', translationFr: 'tonton (homme plus âgé, respectueux)' },
    { hanzi: '一点小礼物', pinyin: 'yìdiǎn xiǎo lǐwù', translationFr: 'un petit cadeau (formule modeste)' },
    { hanzi: '请收下', pinyin: 'qǐng shōu xià', translationFr: 'veuillez accepter' },
    { hanzi: '不好意思', pinyin: 'bù hǎoyìsi', translationFr: 'désolé (de vous déranger)' },
    { hanzi: '身体健康', pinyin: 'shēntǐ jiànkāng', translationFr: 'bonne santé (souhait)' }
  ],
  openingLineHanzi: '快进来，快进来！路上辛苦了吧？',
  openingLinePinyin: 'Kuài jìn lái, kuài jìn lái! Lùshàng xīnkǔle ba?',
  openingLineFr: 'Entrez vite, entrez vite ! Le trajet a été fatigant ?',
  steps: [
    {
      id: 'greet',
      nameFr: 'Salutations',
      hintsFr: ['Dis 阿姨好、叔叔好', 'Réponds à la question sur le trajet', 'Montre de la gratitude pour l\'accueil'],
      completionCriterionFr: 'L\'utilisateur a salué les deux parents avec les appellatifs polis.'
    },
    {
      id: 'gift',
      nameFr: 'Cadeau',
      hintsFr: ['这是一点小礼物', '请收下', 'Explique brièvement ce que c\'est (ex: du vin français)'],
      completionCriterionFr: 'L\'utilisateur a offert le cadeau avec la formule de modestie.'
    },
    {
      id: 'family',
      nameFr: 'Parler de ta famille',
      hintsFr: ['Dis combien de frères/sœurs tu as', 'Parle du métier de tes parents', 'Mentionne que tes parents te passent le bonjour'],
      completionCriterionFr: 'L\'utilisateur a parlé de sa famille avec au moins 2 éléments.'
    },
    {
      id: 'compliment',
      nameFr: 'Compliment',
      hintsFr: ['Complimente la décoration / le repas', 'Souhaite 身体健康', 'Dis que tu es content(e) d\'être là'],
      completionCriterionFr: 'L\'utilisateur a fait un compliment ou un souhait.'
    }
  ],
  successMessageFr: 'Les parents t\'aiment déjà 🫖. Tu maîtrises le registre formel.',
  extraSystemInstructionsFr: 'Les parents peuvent poser des questions traditionnelles : âge, si l\'apprenant sait cuisiner, ses projets d\'avenir. Reste bienveillant même si la réponse est maladroite.'
};

const rdvGalant: SimulatorScenario = {
  id: 'sim-date',
  titleFr: 'Rendez-vous galant (约会)',
  titleEn: 'Romantic date',
  descriptionFr: 'Premier rendez-vous à Shanghai. Papote, propose un plan pour la suite de la soirée.',
  emoji: '🌸',
  category: 'relations',
  difficulty: 'intermediate',
  levelFloor: 'b1.2',
  levelCeiling: 'b2.2',
  register: 'casual',
  personaFr: 'Ton/ta date : fin(e) et curieux(se), aime bien rire.',
  goalFr: 'Apprends 3 choses sur la personne, partage 2 choses sur toi, propose un plan pour après.',
  vocab: [
    { hanzi: '约会', pinyin: 'yuēhuì', translationFr: 'rendez-vous' },
    { hanzi: '兴趣', pinyin: 'xìngqù', translationFr: 'centre d\'intérêt' },
    { hanzi: '周末', pinyin: 'zhōumò', translationFr: 'week-end' },
    { hanzi: '一起', pinyin: 'yìqǐ', translationFr: 'ensemble' },
    { hanzi: '好玩', pinyin: 'hǎowán', translationFr: 'sympa, fun' },
    { hanzi: '下次', pinyin: 'xià cì', translationFr: 'la prochaine fois' }
  ],
  openingLineHanzi: '你好！今天好紧张啊，哈哈。你平时周末喜欢干嘛？',
  openingLinePinyin: 'Nǐ hǎo! Jīntiān hǎo jǐnzhāng a, hāhā. Nǐ píngshí zhōumò xǐhuān gàn má?',
  openingLineFr: 'Salut ! Je suis un peu stressé(e) aujourd\'hui, haha. Tu fais quoi en général le week-end ?',
  steps: [
    {
      id: 'share',
      nameFr: 'Partager',
      hintsFr: ['Parle d\'un hobby', 'Parle de tes projets', 'Pose lui la même question en retour'],
      completionCriterionFr: 'L\'utilisateur a partagé au moins un élément personnel et/ou répondu à la question.'
    },
    {
      id: 'discover',
      nameFr: 'Découvrir',
      hintsFr: ['Demande son métier', 'Demande d\'où il/elle vient', 'Demande ce qu\'il/elle aime dans Shanghai'],
      completionCriterionFr: 'L\'utilisateur a posé au moins 2 questions.'
    },
    {
      id: 'plan',
      nameFr: 'Plan pour la suite',
      hintsFr: ['Propose un 2e verre (再来一杯)', 'Propose une balade 外滩', 'Propose un prochain rendez-vous'],
      completionCriterionFr: 'L\'utilisateur a proposé un plan immédiat OU un prochain rendez-vous.'
    }
  ],
  successMessageFr: 'Connexion réussie 🌸. La prochaine fois : tu choisis le resto.'
};

const excuses: SimulatorScenario = {
  id: 'sim-apology',
  titleFr: 'S\'excuser auprès d\'un ami',
  titleEn: 'Apologizing to a friend',
  descriptionFr: 'Tu as annulé un plan au dernier moment. Présente tes excuses à ton ami et propose de te rattraper.',
  emoji: '🙏',
  category: 'relations',
  difficulty: 'intermediate',
  levelFloor: 'b1.2',
  levelCeiling: 'b2.2',
  register: 'casual',
  personaFr: 'Ton ami chinois qui est un peu vexé mais pas fâché.',
  goalFr: 'Présente des excuses sincères, explique (sans te justifier trop), propose une compensation concrète.',
  vocab: [
    { hanzi: '对不起', pinyin: 'duìbuqǐ', translationFr: 'désolé' },
    { hanzi: '真的', pinyin: 'zhēnde', translationFr: 'vraiment' },
    { hanzi: '原谅', pinyin: 'yuánliàng', translationFr: 'pardonner' },
    { hanzi: '补偿', pinyin: 'bǔcháng', translationFr: 'compenser' },
    { hanzi: '下次', pinyin: 'xià cì', translationFr: 'la prochaine fois' },
    { hanzi: '请你吃饭', pinyin: 'qǐng nǐ chīfàn', translationFr: 'je t\'invite à manger' }
  ],
  openingLineHanzi: '哼，你昨天怎么放我鸽子啊？',
  openingLinePinyin: 'Hng, nǐ zuótiān zěnme fàng wǒ gēzi a?',
  openingLineFr: 'Pff, pourquoi tu m\'as posé un lapin hier ?',
  steps: [
    {
      id: 'apologize',
      nameFr: 'Excuses',
      hintsFr: ['对不起，真的对不起', 'Explique brièvement (我临时…)', 'Exprime que tu te sens mal'],
      completionCriterionFr: 'L\'utilisateur a présenté des excuses sincères.'
    },
    {
      id: 'explain',
      nameFr: 'Explication',
      hintsFr: ['Donne une raison brève', 'Évite de te sur-justifier', 'Reconnais ton tort'],
      completionCriterionFr: 'L\'utilisateur a donné un contexte bref et reconnu sa part.'
    },
    {
      id: 'compensate',
      nameFr: 'Réparation',
      hintsFr: ['下次我请你吃饭', 'Propose un jour précis', 'Propose le restaurant préféré de l\'ami'],
      completionCriterionFr: 'L\'utilisateur a proposé une compensation concrète.'
    }
  ],
  successMessageFr: 'Ton ami te pardonne 🙏 — et tu as gagné un niveau en diplomatie chinoise.'
};

const etranger: SimulatorScenario = {
  id: 'sim-help-tourist',
  titleFr: 'Aider un touriste perdu',
  titleEn: 'Helping a lost tourist',
  descriptionFr: 'Un Chinois te demande son chemin pour aller à 南京路步行街. Donne des directions claires.',
  emoji: '🗺️',
  category: 'relations',
  difficulty: 'intermediate',
  levelFloor: 'a2',
  levelCeiling: 'b1.2',
  register: 'neutral-polite',
  personaFr: 'Un visiteur d\'une autre ville chinoise, poli et un peu perdu.',
  goalFr: 'Écoute sa demande, donne des directions, recommande une ligne de métro.',
  vocab: [
    { hanzi: '请问', pinyin: 'qǐngwèn', translationFr: 'excusez-moi de vous demander' },
    { hanzi: '怎么走', pinyin: 'zěnme zǒu', translationFr: 'comment y aller' },
    { hanzi: '地铁', pinyin: 'dìtiě', translationFr: 'métro' },
    { hanzi: '往前走', pinyin: 'wǎng qián zǒu', translationFr: 'tout droit' },
    { hanzi: '左拐 / 右拐', pinyin: 'zuǒ guǎi / yòu guǎi', translationFr: 'à gauche / à droite' },
    { hanzi: '到…就到了', pinyin: 'dào…jiù dào le', translationFr: 'arrivé à…, c\'est là' }
  ],
  openingLineHanzi: '不好意思，请问南京路步行街怎么走？',
  openingLinePinyin: 'Bù hǎoyìsi, qǐngwèn Nánjīng Lù bùxíngjiē zěnme zǒu?',
  openingLineFr: 'Excusez-moi, pouvez-vous me dire comment aller à la rue piétonne de Nanjing ?',
  steps: [
    {
      id: 'confirm',
      nameFr: 'Confirmer',
      hintsFr: ['Répète la destination', 'Demande s\'il préfère métro ou taxi', 'Dis que tu connais'],
      completionCriterionFr: 'L\'utilisateur a confirmé la destination ou posé une question de clarification.'
    },
    {
      id: 'direct',
      nameFr: 'Donner les directions',
      hintsFr: ['Dis « 2号线 » si métro', 'Oriente 往前走 / 左拐', 'Donne un repère (地铁站)'],
      completionCriterionFr: 'L\'utilisateur a donné des directions avec au moins 2 instructions.'
    },
    {
      id: 'tip',
      nameFr: 'Conseil bonus',
      hintsFr: ['Recommande un lieu à voir', 'Dis combien de temps ça prend', 'Propose 扫二维码地图'],
      completionCriterionFr: 'L\'utilisateur a ajouté une info utile (durée, bonus, app).'
    }
  ],
  successMessageFr: 'Tu viens de dépanner comme un local 🗺️.'
};

const coiffeur: SimulatorScenario = {
  id: 'sim-hairdresser',
  titleFr: 'Chez le coiffeur',
  titleEn: 'At the hairdresser',
  descriptionFr: 'Tu veux juste une coupe courte. Décris précisément ce que tu veux (et ce que tu NE veux pas).',
  emoji: '💇',
  category: 'relations',
  difficulty: 'intermediate',
  levelFloor: 'a2',
  levelCeiling: 'b1.2',
  register: 'neutral-polite',
  personaFr: 'Un coiffeur/coiffeuse enthousiaste et un peu force-de-proposition.',
  goalFr: 'Décris la coupe souhaitée, refuse les extras (shampooing spécial, teinture), paie.',
  vocab: [
    { hanzi: '剪头发', pinyin: 'jiǎn tóufa', translationFr: 'couper les cheveux' },
    { hanzi: '短一点', pinyin: 'duǎn yīdiǎn', translationFr: 'un peu plus court' },
    { hanzi: '不要烫', pinyin: 'búyào tàng', translationFr: 'pas de permanente' },
    { hanzi: '不要染', pinyin: 'búyào rǎn', translationFr: 'pas de teinture' },
    { hanzi: '前面 / 后面', pinyin: 'qiánmiàn / hòumiàn', translationFr: 'devant / derrière' },
    { hanzi: '这样可以', pinyin: 'zhèyàng kěyǐ', translationFr: 'comme ça c\'est bon' }
  ],
  openingLineHanzi: '您好，今天想做什么发型？要不要染个色？',
  openingLinePinyin: 'Nín hǎo, jīntiān xiǎng zuò shénme fàxíng? Yào bú yào rǎn gè sè?',
  openingLineFr: 'Bonjour, quelle coupe voulez-vous aujourd\'hui ? Et une teinture ?',
  steps: [
    {
      id: 'describe',
      nameFr: 'Décrire la coupe',
      hintsFr: ['剪短一点', 'Décris « devant » et « derrière »', 'Montre une référence (像…那样)'],
      completionCriterionFr: 'L\'utilisateur a décrit ce qu\'il veut sur au moins 2 dimensions (longueur, zone).'
    },
    {
      id: 'refuse',
      nameFr: 'Refuser les extras',
      hintsFr: ['不要染色', 'Dis 不需要 gentiment', 'Explique pourquoi (这次就剪短)'],
      completionCriterionFr: 'L\'utilisateur a refusé poliment au moins un extra.'
    },
    {
      id: 'check',
      nameFr: 'Vérification et paiement',
      hintsFr: ['Dis « 这样可以 »', 'Demande le prix', 'Paye'],
      completionCriterionFr: 'L\'utilisateur a validé le résultat et réglé.'
    }
  ],
  successMessageFr: 'Tu as survécu au salon de coiffure chinois ✂️ — sans permanente surprise.'
};

// ============================================================================
//  🏙️ SITUATIONS PRATIQUES (5 scénarios)
// ============================================================================

const hopital: SimulatorScenario = {
  id: 'sim-hospital',
  titleFr: 'À l\'hôpital',
  titleEn: 'At the hospital',
  descriptionFr: 'Consultation chez le médecin : décris tes symptômes précisément, comprends la prescription.',
  emoji: '🏥',
  category: 'practical',
  difficulty: 'advanced',
  levelFloor: 'b1.2',
  levelCeiling: 'b2.2',
  register: 'neutral-polite',
  personaFr: 'Un médecin efficace dans un hôpital chinois. Les consultations sont courtes.',
  goalFr: 'Décris symptômes + durée, pose 1 question sur les causes, comprends et reformule la prescription.',
  vocab: [
    { hanzi: '挂号', pinyin: 'guàhào', translationFr: 's\'inscrire (service consultation)' },
    { hanzi: '症状', pinyin: 'zhèngzhuàng', translationFr: 'symptôme' },
    { hanzi: '咳嗽', pinyin: 'késou', translationFr: 'tousser' },
    { hanzi: '过敏', pinyin: 'guòmǐn', translationFr: 'allergie' },
    { hanzi: '开药', pinyin: 'kāi yào', translationFr: 'prescrire un médicament' },
    { hanzi: '化验', pinyin: 'huàyàn', translationFr: 'analyse de labo' }
  ],
  openingLineHanzi: '请坐，您哪儿不舒服？什么时候开始的？',
  openingLinePinyin: 'Qǐng zuò, nín nǎr bù shūfu? Shénme shíhou kāishǐ de?',
  openingLineFr: 'Asseyez-vous. Où avez-vous mal ? Depuis quand ?',
  steps: [
    {
      id: 'describe',
      nameFr: 'Symptômes',
      hintsFr: ['Décris la douleur (在哪里)', 'Dis depuis quand', 'Mentionne fréquence et intensité'],
      completionCriterionFr: 'L\'utilisateur a décrit symptômes + durée.'
    },
    {
      id: 'context',
      nameFr: 'Contexte',
      hintsFr: ['Mentionne des allergies (我对…过敏)', 'Mentionne traitements en cours', 'Demande s\'il faut une 化验'],
      completionCriterionFr: 'L\'utilisateur a donné un contexte médical (allergies OU traitements OU questions labo).'
    },
    {
      id: 'prescription',
      nameFr: 'Prescription',
      hintsFr: ['Reformule la posologie', 'Demande les effets secondaires', 'Demande si contrôle de suivi'],
      completionCriterionFr: 'L\'utilisateur a compris la prescription (reformulation ou question ciblée).'
    }
  ],
  successMessageFr: 'Consultation réussie 🏥. Tu sais naviguer le système médical chinois.'
};

const banque: SimulatorScenario = {
  id: 'sim-bank',
  titleFr: 'À la banque',
  titleEn: 'At the bank',
  descriptionFr: 'Tu viens ouvrir un compte à la 中国银行 et faire un virement international.',
  emoji: '🏦',
  category: 'practical',
  difficulty: 'advanced',
  levelFloor: 'b1.2',
  levelCeiling: 'b2.2',
  register: 'formal',
  personaFr: 'Un(e) conseiller(ère) bancaire efficace, un peu formel(le).',
  goalFr: 'Ouvre un compte courant, demande à activer la carte, fais un virement international.',
  vocab: [
    { hanzi: '开户', pinyin: 'kāihù', translationFr: 'ouvrir un compte' },
    { hanzi: '身份证', pinyin: 'shēnfènzhèng', translationFr: 'pièce d\'identité' },
    { hanzi: '护照', pinyin: 'hùzhào', translationFr: 'passeport' },
    { hanzi: '银行卡', pinyin: 'yínhángkǎ', translationFr: 'carte bancaire' },
    { hanzi: '密码', pinyin: 'mìmǎ', translationFr: 'code PIN' },
    { hanzi: '汇款', pinyin: 'huìkuǎn', translationFr: 'virement' },
    { hanzi: '手续费', pinyin: 'shǒuxùfèi', translationFr: 'frais' }
  ],
  openingLineHanzi: '请问您办什么业务？请出示身份证或护照。',
  openingLinePinyin: 'Qǐngwèn nín bàn shénme yèwù? Qǐng chūshì shēnfènzhèng huò hùzhào.',
  openingLineFr: 'Quelle opération souhaitez-vous ? Votre carte d\'identité ou passeport.',
  steps: [
    {
      id: 'open',
      nameFr: 'Ouverture de compte',
      hintsFr: ['Dis « 我想开户 »', 'Précise le type (储蓄卡)', 'Montre le passeport'],
      completionCriterionFr: 'L\'utilisateur a demandé l\'ouverture avec précision du type.'
    },
    {
      id: 'pin',
      nameFr: 'Activation',
      hintsFr: ['Demande comment choisir le code', 'Demande s\'il faut un minimum', 'Confirme ton adresse de domicile'],
      completionCriterionFr: 'L\'utilisateur a traité une question d\'activation.'
    },
    {
      id: 'transfer',
      nameFr: 'Virement international',
      hintsFr: ['Demande un virement vers la France', 'Demande les frais (手续费)', 'Demande le délai'],
      completionCriterionFr: 'L\'utilisateur a demandé un virement avec question frais ou délai.'
    }
  ],
  successMessageFr: 'Compte ouvert, virement lancé 🏦. Tu es officiel(le) dans le système bancaire chinois.'
};

const immigration: SimulatorScenario = {
  id: 'sim-immigration',
  titleFr: 'Bureau d\'immigration',
  titleEn: 'Immigration office',
  descriptionFr: 'Tu renouvelles ton visa travail au 出入境管理局. Échange précis et formel.',
  emoji: '🛂',
  category: 'practical',
  difficulty: 'advanced',
  levelFloor: 'b2.2',
  levelCeiling: 'c1.2',
  register: 'formal',
  personaFr: 'Un agent d\'immigration rigoureux, ton strictement formel.',
  goalFr: 'Explique l\'objet, soumets les bons documents, demande le délai et les étapes de suivi.',
  vocab: [
    { hanzi: '签证', pinyin: 'qiānzhèng', translationFr: 'visa' },
    { hanzi: '续签', pinyin: 'xùqiān', translationFr: 'renouvellement' },
    { hanzi: '工作许可', pinyin: 'gōngzuò xǔkě', translationFr: 'permis de travail' },
    { hanzi: '居留证', pinyin: 'jūliúzhèng', translationFr: 'permis de résidence' },
    { hanzi: '材料', pinyin: 'cáiliào', translationFr: 'dossier / pièces' },
    { hanzi: '办理', pinyin: 'bànlǐ', translationFr: 'traiter (une démarche)' },
    { hanzi: '工作日', pinyin: 'gōngzuò rì', translationFr: 'jour ouvré' }
  ],
  openingLineHanzi: '您好，请问您办理什么业务？',
  openingLinePinyin: 'Nín hǎo, qǐngwèn nín bànlǐ shénme yèwù?',
  openingLineFr: 'Bonjour, quelle démarche souhaitez-vous effectuer ?',
  steps: [
    {
      id: 'purpose',
      nameFr: 'Objet',
      hintsFr: ['我来办理…', 'Précise : travail / étudiant / famille', 'Donne la date d\'expiration actuelle'],
      completionCriterionFr: 'L\'utilisateur a nommé précisément la démarche.'
    },
    {
      id: 'documents',
      nameFr: 'Documents',
      hintsFr: ['Énumère ce que tu apportes', 'Demande s\'il manque quelque chose', 'Demande le formulaire'],
      completionCriterionFr: 'L\'utilisateur a listé des documents OU a demandé la liste officielle.'
    },
    {
      id: 'timeline',
      nameFr: 'Délais',
      hintsFr: ['Demande le délai (几个工作日)', 'Demande comment récupérer', 'Demande si on peut voyager pendant'],
      completionCriterionFr: 'L\'utilisateur a demandé des précisions sur délais ou suite de la procédure.'
    }
  ],
  successMessageFr: 'Dossier en route ✅. Tu as géré l\'admin chinoise.'
};

const louerAppart: SimulatorScenario = {
  id: 'sim-rent-apartment',
  titleFr: 'Louer un appartement',
  titleEn: 'Renting an apartment',
  descriptionFr: 'Visite d\'un 2 pièces à Shanghai avec un agent 中介. Négocie le loyer, vérifie les charges.',
  emoji: '🏠',
  category: 'practical',
  difficulty: 'advanced',
  levelFloor: 'b2.2',
  levelCeiling: 'c1.2',
  register: 'neutral-polite',
  personaFr: 'Un agent immobilier 中介 motivé, qui pousse un peu.',
  goalFr: 'Visite, questions sur charges et bail, négocie le loyer, demande un état des lieux.',
  vocab: [
    { hanzi: '中介', pinyin: 'zhōngjiè', translationFr: 'agent immobilier' },
    { hanzi: '租金', pinyin: 'zūjīn', translationFr: 'loyer' },
    { hanzi: '押金', pinyin: 'yājīn', translationFr: 'caution' },
    { hanzi: '物业费', pinyin: 'wùyè fèi', translationFr: 'charges de copropriété' },
    { hanzi: '水电费', pinyin: 'shuǐdiàn fèi', translationFr: 'eau et électricité' },
    { hanzi: '合同', pinyin: 'hétóng', translationFr: 'contrat' },
    { hanzi: '能不能便宜一点', pinyin: 'néng bù néng piányi yīdiǎn', translationFr: 'pouvez-vous baisser un peu' }
  ],
  openingLineHanzi: '这套房子朝南，采光特别好，家电齐全，您看怎么样？',
  openingLinePinyin: 'Zhè tào fángzi cháo nán, cǎiguāng tèbié hǎo, jiādiàn qíquán, nín kàn zěnmeyàng?',
  openingLineFr: 'Cet appartement est exposé plein sud, très lumineux, équipé, qu\'en pensez-vous ?',
  steps: [
    {
      id: 'inspect',
      nameFr: 'Visite',
      hintsFr: ['Demande la surface', 'Demande l\'étage', 'Demande s\'il y a des nuisances'],
      completionCriterionFr: 'L\'utilisateur a posé au moins 2 questions sur l\'appartement.'
    },
    {
      id: 'costs',
      nameFr: 'Coûts',
      hintsFr: ['Demande loyer + charges (物业费)', 'Demande la caution', 'Demande qui paie 水电费'],
      completionCriterionFr: 'L\'utilisateur a clarifié au moins 2 postes de coûts.'
    },
    {
      id: 'negotiate',
      nameFr: 'Négociation',
      hintsFr: ['能不能便宜一点', 'Propose un montant précis', 'Propose de signer 2 ans en échange'],
      completionCriterionFr: 'L\'utilisateur a tenté une négociation concrète (montant, durée, ou contrepartie).'
    },
    {
      id: 'contract',
      nameFr: 'Contrat',
      hintsFr: ['Demande à lire le 合同', 'Demande un état des lieux', 'Propose de signer la semaine prochaine'],
      completionCriterionFr: 'L\'utilisateur a abordé les conditions contractuelles.'
    }
  ],
  successMessageFr: 'Tu as décroché ton appart à Shanghai 🏠 — et négocié comme un pro.'
};

const commissariat: SimulatorScenario = {
  id: 'sim-police',
  titleFr: 'Au commissariat',
  titleEn: 'At the police station',
  descriptionFr: 'On t\'a volé ton portefeuille dans le métro. Signale le vol au 派出所.',
  emoji: '👮',
  category: 'practical',
  difficulty: 'intermediate',
  levelFloor: 'b1.2',
  levelCeiling: 'b2.2',
  register: 'formal',
  personaFr: 'Un agent de police courtois qui prend ta déposition.',
  goalFr: 'Explique ce qu\'on t\'a volé, où, quand, et demande un récépissé (报警证明).',
  vocab: [
    { hanzi: '报警', pinyin: 'bàojǐng', translationFr: 'faire une déclaration à la police' },
    { hanzi: '小偷', pinyin: 'xiǎotōu', translationFr: 'voleur' },
    { hanzi: '钱包', pinyin: 'qiánbāo', translationFr: 'portefeuille' },
    { hanzi: '丢了', pinyin: 'diūle', translationFr: 'perdu' },
    { hanzi: '大概', pinyin: 'dàgài', translationFr: 'environ' },
    { hanzi: '监控', pinyin: 'jiānkòng', translationFr: 'vidéosurveillance' },
    { hanzi: '报警证明', pinyin: 'bàojǐng zhèngmíng', translationFr: 'récépissé de plainte' }
  ],
  openingLineHanzi: '您好，请坐，慢慢说，发生什么事了？',
  openingLinePinyin: 'Nín hǎo, qǐng zuò, mànmàn shuō, fāshēng shénme shì le?',
  openingLineFr: 'Bonjour, asseyez-vous, racontez calmement. Que s\'est-il passé ?',
  steps: [
    {
      id: 'what',
      nameFr: 'Quoi',
      hintsFr: ['我的钱包丢了', 'Décris le contenu (银行卡、身份证)', 'Estime la valeur (大概…)'],
      completionCriterionFr: 'L\'utilisateur a décrit ce qui a été volé/perdu.'
    },
    {
      id: 'where',
      nameFr: 'Où et quand',
      hintsFr: ['Précise le lieu (2号线)', 'Précise l\'heure', 'Dis si tu as vu le voleur'],
      completionCriterionFr: 'L\'utilisateur a précisé lieu et temps.'
    },
    {
      id: 'followup',
      nameFr: 'Suite',
      hintsFr: ['Demande la vidéosurveillance (监控)', 'Demande un 报警证明', 'Demande qui contacter'],
      completionCriterionFr: 'L\'utilisateur a demandé le récépissé OU des infos de suivi.'
    }
  ],
  successMessageFr: 'Déposition enregistrée 👮. Courage pour la suite.'
};

// ============================================================================
//  EXPORT DU CATALOGUE
// ============================================================================

export const simulatorScenarios: SimulatorScenario[] = [
  // Vie quotidienne
  restaurant, cafe, supermarche, taxi, pharmacie,
  // Travail & social
  premierJour, reunion, fanju, appelTel, entretien,
  // Relations
  belleFamille, rdvGalant, excuses, etranger, coiffeur,
  // Situations pratiques
  hopital, banque, immigration, louerAppart, commissariat
];

export function getSimulatorScenarioById(id: string): SimulatorScenario | undefined {
  return simulatorScenarios.find((s) => s.id === id);
}

export function getScenariosByCategory(category: SimulatorScenario['category']): SimulatorScenario[] {
  return simulatorScenarios.filter((s) => s.category === category);
}
