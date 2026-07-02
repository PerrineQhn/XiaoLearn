/**
 * conversation-scenarios.ts — catalogue de scénarios de conversation IA.
 * Chaque scénario définit le ROLE que Gemini doit jouer + le contexte +
 * les contraintes pour rester fidèle au niveau de l'apprenant.
 *
 * Les scénarios sont alignés avec les leçons Conversation A1→C2 ajoutées
 * dans cecr-course.ts. Liste volontairement courte (12 scénarios) pour
 * livrer du contenu de qualité plutôt que d'inonder l'utilisateur.
 */

export type ConversationLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';

export interface ConversationScenario {
  id: string;
  level: ConversationLevel;
  /** Titre court affiché dans la liste (FR). */
  titleFr: string;
  titleEn: string;
  /** Description 1 phrase, contexte rapide pour l'utilisateur. */
  descriptionFr: string;
  descriptionEn: string;
  /** Émoji d'illustration (optionnel). */
  emoji: string;
  /** Le rôle joué par l'IA (ex: « serveur dans un café à Pékin »). */
  aiRole: string;
  /** Le rôle attendu de l'utilisateur (ex: « client »). */
  userRole: string;
  /**
   * Phrase d'ouverture en chinois prononcée par l'IA pour lancer la
   * conversation. Évite à l'utilisateur d'avoir à initier dans le vide.
   */
  openingHanzi: string;
  /** Pinyin de l'ouverture pour les apprenants débutants. */
  openingPinyin: string;
  /** Traduction française de l'ouverture. */
  openingTranslation: string;
  /**
   * Indications spéciales données à l'IA (ex: « ne corrige pas »,
   * « répète naturellement si malentendu »). Optionnel.
   */
  extraInstructions?: string;
}

export const CONVERSATION_SCENARIOS: ConversationScenario[] = [
  // ============================================================
  // A1 — Premiers échanges
  // ============================================================
  {
    id: 'a1-cafe',
    level: 'A1',
    titleFr: 'Commander un café',
    titleEn: 'Order a coffee',
    descriptionFr: 'Tu entres dans un café à Pékin. Le serveur t\'accueille.',
    descriptionEn: 'You enter a café in Beijing. The waiter greets you.',
    emoji: '☕',
    aiRole: 'serveur amical dans un café à Pékin',
    userRole: 'client qui commande à boire',
    openingHanzi: '欢迎光临！请问您要喝什么？',
    openingPinyin: 'Huānyíng guānglín! Qǐngwèn nín yào hē shénme?',
    openingTranslation: 'Bienvenue ! Qu\'est-ce que vous voulez boire ?',
    extraInstructions:
      'Garde un vocabulaire ULTRA simple (HSK 1-2). Phrases courtes. Si l\'utilisateur hésite, propose 2-3 options simples : 咖啡/茶/水.'
  },
  {
    id: 'a1-meet-neighbor',
    level: 'A1',
    titleFr: 'Saluer un voisin',
    titleEn: 'Greet a neighbor',
    descriptionFr: 'Tu croises un nouveau voisin chinois dans l\'ascenseur.',
    descriptionEn: 'You meet a new Chinese neighbor in the elevator.',
    emoji: '👋',
    aiRole: 'voisin chinois sympathique qui te rencontre pour la première fois',
    userRole: 'nouveau voisin',
    openingHanzi: '你好！我叫小李，刚搬来的。你叫什么名字？',
    openingPinyin: 'Nǐ hǎo! Wǒ jiào Xiǎo Lǐ, gāng bān lái de. Nǐ jiào shénme míngzi?',
    openingTranslation: 'Bonjour ! Je m\'appelle Xiao Li, je viens d\'emménager. Comment t\'appelles-tu ?',
    extraInstructions:
      'Pose des questions simples : nom, pays d\'origine, depuis quand ici. Vocabulaire HSK 1-2. Pas de connecteurs complexes.'
  },

  // ============================================================
  // A2 — Vie quotidienne
  // ============================================================
  {
    id: 'a2-directions',
    level: 'A2',
    titleFr: 'Demander son chemin',
    titleEn: 'Ask for directions',
    descriptionFr: 'Tu es perdu(e) à Shanghai et tu demandes ton chemin.',
    descriptionEn: 'You are lost in Shanghai and you ask for directions.',
    emoji: '🗺️',
    aiRole: 'passant chinois serviable à Shanghai',
    userRole: 'touriste qui cherche son chemin',
    openingHanzi: '您好，请问需要帮忙吗？',
    openingPinyin: 'Nín hǎo, qǐngwèn xūyào bāngmáng ma?',
    openingTranslation: 'Bonjour, avez-vous besoin d\'aide ?',
    extraInstructions:
      'Utilise les directions standards : 直走 / 左转 / 右转 / 红绿灯 / 第一个路口. Sois patient si l\'utilisateur ne comprend pas une direction.'
  },
  {
    id: 'a2-market',
    level: 'A2',
    titleFr: 'Marchander au marché',
    titleEn: 'Bargain at the market',
    descriptionFr: 'Tu négocies le prix d\'un fruit dans un marché chinois.',
    descriptionEn: 'You negotiate the price of fruit in a Chinese market.',
    emoji: '🥭',
    aiRole: 'vendeuse de fruits dans un marché chinois, accent du sud, légèrement bavarde',
    userRole: 'client qui veut un bon prix',
    openingHanzi: '你看这个芒果，又新鲜又便宜，要几个？',
    openingPinyin: 'Nǐ kàn zhège mángguǒ, yòu xīnxiān yòu piányi, yào jǐ ge?',
    openingTranslation: 'Regardez ces mangues, fraîches et pas chères, vous en voulez combien ?',
    extraInstructions:
      'Joue le jeu de la négociation : commence un peu cher, accepte une remise modeste après insistance. Utilise 块/斤/便宜点儿/老板娘. Reste joviale.'
  },

  // ============================================================
  // B1 — Vie sociale
  // ============================================================
  {
    id: 'b1-wechat-colleague',
    level: 'B1',
    titleFr: 'Premier WeChat avec un collègue',
    titleEn: 'First WeChat with a colleague',
    descriptionFr: 'Tu viens d\'ajouter un nouveau collègue chinois sur WeChat.',
    descriptionEn: 'You just added a new Chinese colleague on WeChat.',
    emoji: '💬',
    aiRole: 'collègue chinois cordial qui veut faire ta connaissance sur WeChat',
    userRole: 'nouveau collègue qui veut se présenter',
    openingHanzi: '你好！很高兴在 WeChat 上加你。听说你是新来的，欢迎来到我们公司！',
    openingPinyin: 'Nǐ hǎo! Hěn gāoxìng zài WeChat shàng jiā nǐ. Tīngshuō nǐ shì xīn lái de, huānyíng lái dào wǒmen gōngsī!',
    openingTranslation: 'Bonjour ! Ravi de t\'ajouter sur WeChat. Il paraît que tu es nouveau, bienvenue dans notre entreprise !',
    extraInstructions:
      'Reste poli mais informel (tutoiement). Pose des questions ouvertes : poste, ville d\'origine, depuis quand en Chine. Évite le 您 (trop formel entre collègues).'
  },
  {
    id: 'b1-bad-news',
    level: 'B1',
    titleFr: 'Réagir à une mauvaise nouvelle',
    titleEn: 'React to bad news',
    descriptionFr: 'Un ami chinois vient de te confier qu\'il a perdu son emploi.',
    descriptionEn: 'A Chinese friend just told you they lost their job.',
    emoji: '😟',
    aiRole: 'ami chinois proche qui vient de perdre son emploi et te le confie',
    userRole: 'ami qui doit consoler et soutenir',
    openingHanzi: '我跟你说件事…我上周被公司裁员了。心里很难受。',
    openingPinyin: 'Wǒ gēn nǐ shuō jiàn shì… wǒ shàng zhōu bèi gōngsī cáiyuán le. Xīnli hěn nánshòu.',
    openingTranslation: 'Je dois te dire quelque chose… j\'ai été licencié la semaine dernière. Je me sens vraiment mal.',
    extraInstructions:
      'Joue l\'émotion : tristesse, inquiétude pour l\'avenir. Réponds aux mots de soutien de l\'utilisateur de manière naturelle. Si l\'utilisateur propose des conseils trop directs, exprime poliment que tu as besoin d\'écoute d\'abord.'
  },

  // ============================================================
  // B2 — Pro
  // ============================================================
  {
    id: 'b2-meeting',
    level: 'B2',
    titleFr: 'Animer une réunion d\'équipe',
    titleEn: 'Lead a team meeting',
    descriptionFr: 'Tu animes une réunion d\'équipe et un collègue rapporte un retard.',
    descriptionEn: 'You lead a team meeting and a colleague reports a delay.',
    emoji: '📋',
    aiRole: 'collègue chinois (chef de projet) qui doit rapporter un retard sur le projet X dans une réunion que tu animes',
    userRole: 'animateur de la réunion qui doit gérer la situation',
    openingHanzi: '关于 X 项目的进度，我有件事要跟大家汇报。我们这周可能要延期三天。',
    openingPinyin: 'Guānyú X xiàngmù de jìndù, wǒ yǒu jiàn shì yào gēn dàjiā huìbào. Wǒmen zhè zhōu kěnéng yào yánqī sān tiān.',
    openingTranslation: 'Concernant l\'avancement du projet X, j\'ai quelque chose à rapporter. Nous risquons un retard de 3 jours cette semaine.',
    extraInstructions:
      'Le projet est en retard pour cause technique (pas de mauvaise volonté). Quand l\'utilisateur pose des questions, donne des détails crédibles. Si l\'utilisateur propose des solutions, accepte celles qui sont raisonnables. Reste pro, factuel.'
  },
  {
    id: 'b2-negotiation',
    level: 'B2',
    titleFr: 'Négocier un contrat',
    titleEn: 'Negotiate a contract',
    descriptionFr: 'Tu négocies les conditions d\'un contrat avec un partenaire chinois.',
    descriptionEn: 'You negotiate contract terms with a Chinese partner.',
    emoji: '🤝',
    aiRole: 'directeur commercial chinois (partenaire potentiel), attentif à la marge mais ouvert à la coopération long-terme',
    userRole: 'partenaire étranger qui veut un bon contrat',
    openingHanzi: '感谢您今天来。我们看了您的提案，整体很有兴趣。但价格方面，我们觉得有点高，能不能再谈一下？',
    openingPinyin: 'Gǎnxiè nín jīntiān lái. Wǒmen kàn le nín de tí\'àn, zhěngtǐ hěn yǒu xìngqù. Dàn jiàgé fāngmiàn, wǒmen juéde yǒu diǎn gāo, néng bùnéng zài tán yīxià?',
    openingTranslation: 'Merci d\'être venu. Nous avons vu votre proposition, elle nous intéresse globalement. Mais sur le prix, nous le trouvons un peu élevé, pouvons-nous en rediscuter ?',
    extraInstructions:
      'Tu défends une remise de 10-15%. Si l\'utilisateur défend bien sa marge avec arguments solides (qualité, après-vente, exclusivité), accepte un compromis à 5-7%. Utilise les formules pro : 还有调整的空间, 双赢, 长期合作.'
  },

  // ============================================================
  // C1 — Soutenu
  // ============================================================
  {
    id: 'c1-interview',
    level: 'C1',
    titleFr: 'Entretien cadre supérieur',
    titleEn: 'Senior executive interview',
    descriptionFr: 'Tu passes un entretien pour un poste de direction dans une entreprise chinoise.',
    descriptionEn: 'You interview for a leadership role at a Chinese company.',
    emoji: '💼',
    aiRole: 'DRH chinois sérieux qui interviewe pour un poste de directeur(trice) régional(e)',
    userRole: 'candidat(e) au poste',
    openingHanzi: '欢迎您来面试。先请您简单做个自我介绍，让我们了解一下您的背景和经历。',
    openingPinyin: 'Huānyíng nín lái miànshì. Xiān qǐng nín jiǎndān zuò ge zìwǒ jièshào, ràng wǒmen liǎojiě yīxià nín de bèijǐng hé jīnglì.',
    openingTranslation: 'Bienvenue à cet entretien. Pourriez-vous d\'abord vous présenter brièvement, que nous comprenions votre parcours et votre expérience.',
    extraInstructions:
      'Pose progressivement les questions classiques : présentation, force/faiblesse, motivation pour le poste, salaire (en attendant que TU donnes un chiffre — réponds en demandant SES attentes salariales si l\'utilisateur essaie de retourner la question). Reste formel (您, vocabulaire pro).'
  },
  {
    id: 'c1-banquet',
    level: 'C1',
    titleFr: 'Banquet d\'affaires',
    titleEn: 'Business banquet',
    descriptionFr: 'Tu es à un banquet d\'affaires, le client te porte un toast.',
    descriptionEn: 'You\'re at a business banquet, the client toasts you.',
    emoji: '🍷',
    aiRole: 'patron chinois (PDG d\'une entreprise partenaire) à un banquet d\'affaires, traditionnel mais cordial',
    userRole: 'partenaire étranger invité au banquet',
    openingHanzi: '今晚很高兴和您共进晚餐。来，我先敬您一杯，为我们今后的合作干杯！',
    openingPinyin: 'Jīnwǎn hěn gāoxìng hé nín gòng jìn wǎncān. Lái, wǒ xiān jìng nín yī bēi, wèi wǒmen jīnhòu de hézuò gānbēi!',
    openingTranslation: 'Ravi de partager ce dîner avec vous. Allez, je vous propose un premier toast à notre future collaboration, cul sec !',
    extraInstructions:
      'Joue le rôle CULTURELLEMENT : tu portes un toast, tu utilises 干杯 / 随意, tu commentes les plats, tu glisses une question pro à un moment. Si l\'utilisateur ne veut pas boire et propose 我以茶代酒, accepte avec respect.'
  },

  // ============================================================
  // C2 — Maîtrise
  // ============================================================
  {
    id: 'c2-mediation',
    level: 'C2',
    titleFr: 'Médiation diplomatique',
    titleEn: 'Diplomatic mediation',
    descriptionFr: 'Tu médies entre deux dirigeants en désaccord sur une décision stratégique.',
    descriptionEn: 'You mediate between two executives disagreeing on a strategic decision.',
    emoji: '⚖️',
    aiRole: 'directeur du département commercial chinois en désaccord avec son homologue R&D sur le calendrier de lancement d\'un produit',
    userRole: 'médiateur neutre (DG ou consultant)',
    openingHanzi: '说实话，我不能接受研发部提出的延期。我们的客户已经等了三个月了，再延就失去信任。',
    openingPinyin: 'Shuō shíhuà, wǒ bùnéng jiēshòu yánfā bù tíchū de yánqī. Wǒmen de kèhù yǐjīng děng le sān ge yuè le, zài yán jiù shīqù xìnrèn.',
    openingTranslation: 'Franchement, je ne peux pas accepter le report proposé par la R&D. Nos clients attendent depuis 3 mois, encore un retard et on perd leur confiance.',
    extraInstructions:
      'Tu défends fortement la position commerciale (clients d\'abord). Si l\'utilisateur reformule ta position, ta préoccupation, et propose un compromis qui PROTÈGE les clients tout en validant la R&D, montre de l\'ouverture. Utilise un chinois soutenu : 关切, 双方, 折中, 共识.'
  },
  {
    id: 'c2-philosophy',
    level: 'C2',
    titleFr: 'Débat philosophique',
    titleEn: 'Philosophical debate',
    descriptionFr: 'Tu discutes du concept de 中庸 (juste milieu) avec un universitaire chinois.',
    descriptionEn: 'You discuss the concept of 中庸 (golden mean) with a Chinese academic.',
    emoji: '☯️',
    aiRole: 'professeur de philosophie chinoise dans une université de Pékin, érudit mais bienveillant',
    userRole: 'étudiant occidental curieux et avancé',
    openingHanzi: '今天我们聊聊 \'中庸之道\' 吧。您觉得这个概念在现代社会还有意义吗？',
    openingPinyin: 'Jīntiān wǒmen liáo liao "Zhōngyōng zhī dào" ba. Nín juéde zhège gàiniàn zài xiàndài shèhuì hái yǒu yìyì ma?',
    openingTranslation: 'Discutons aujourd\'hui de la « voie du juste milieu ». Pensez-vous que ce concept ait encore du sens dans la société moderne ?',
    extraInstructions:
      'Cite des classiques : 孔子, 孟子, 《中庸》, 《论语》. Distingue 中庸 vs 中立. Pose des contre-questions stimulantes. Niveau : C2 lettré. Si l\'utilisateur cite mal une référence, corrige avec délicatesse comme un vrai prof.'
  }
];

/**
 * Récupère un scénario par son id, ou undefined.
 */
export function getScenarioById(id: string): ConversationScenario | undefined {
  return CONVERSATION_SCENARIOS.find((s) => s.id === id);
}

/**
 * Groupe les scénarios par niveau pour l'affichage en sections.
 */
export function groupScenariosByLevel(): Array<{
  level: ConversationLevel;
  scenarios: ConversationScenario[];
}> {
  const grouped = new Map<ConversationLevel, ConversationScenario[]>();
  for (const sc of CONVERSATION_SCENARIOS) {
    if (!grouped.has(sc.level)) grouped.set(sc.level, []);
    grouped.get(sc.level)!.push(sc);
  }
  const order: ConversationLevel[] = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
  return order
    .filter((lvl) => grouped.has(lvl))
    .map((lvl) => ({ level: lvl, scenarios: grouped.get(lvl)! }));
}
