/**
 * cecr-c1-2-learn-sections.ts — contenu pédagogique manuel C1.2
 * (Conversation business/juridique + Nuances doublets soutenus).
 *
 * Convention audio : audio/hsk{N}/hsk{N}_{hanzi}.wav
 */

import type { LessonV2LearnSection } from '../types/lesson-learn';

// === CONVERSATION C1.2 =======================================================

export const c12ConvM1LearnSections: LessonV2LearnSection[] = [
  {
    id: 'c12-litige-legal',
    title: 'Discuter un litige légal avec un avocat',
    titleEn: 'Discuss a legal dispute with a lawyer',
    body:
      'Consulter un avocat chinois suit une **trame structurée** : présenter le contexte, demander l\'analyse de risque, évaluer les chances en cas de procédure.\n' +
      '\n' +
      'Vocabulaire juridique de base :\n' +
      '- 纠纷 (jiūfēn) — litige, différend\n' +
      '- 起诉 (qǐsù) — poursuivre en justice\n' +
      '- 仲裁 (zhòngcái) — arbitrage\n' +
      '- 调解 (tiáojiě) — médiation\n' +
      '\n' +
      'Phrases-clés de la consultation :\n' +
      '- 我想咨询一下关于 X 的法律问题 — j\'aimerais consulter sur un problème juridique X\n' +
      '- 您能否帮我分析一下风险？— pourriez-vous m\'aider à analyser le risque ?\n' +
      '- 如果走法律程序，胜诉的可能性有多大？— quelles chances de gagner en procédure ?\n' +
      '\n' +
      'RÈGLE D\'OR : en culture chinoise, on **privilégie 调解** (médiation) avant 诉讼 (procès). Dire « 我们先尝试调解吧 » montre maturité — le procès = perte de temps **et** de face.',
    bodyEn:
      'Frame: 我想咨询一下关于 X 的法律问题. Vocab: 纠纷 (jiūfēn, dispute), 起诉 (qǐsù, sue), 仲裁 (zhòngcái, arbitration), 调解 (tiáojiě, mediation). Ask analysis: 您能否帮我分析一下风险？(could you analyze the risk?). Key phrase: 如果走法律程序，胜诉的可能性有多大？(if we litigate, what are the win chances?). In Chinese culture, 调解 (mediation) is PRIVILEGED over 诉讼 (lawsuit) — saying «我们先尝试调解吧» shows maturity. Lawsuits = wasted time + lost face.',
    items: [
      { hanzi: '咨询', pinyin: 'zī xún', meaning: 'consulter', meaningEn: 'consult', audio: 'audio/hsk5/hsk5_咨询.wav' },
      { hanzi: '纠纷', pinyin: 'jiū fēn', meaning: 'litige, différend', meaningEn: 'dispute', audio: 'audio/hsk6/hsk6_纠纷.wav' },
      { hanzi: '起诉', pinyin: 'qǐ sù', meaning: 'poursuivre en justice', meaningEn: 'sue', audio: 'audio/hsk6/hsk6_起诉.wav' },
      { hanzi: '调解', pinyin: 'tiáo jiě', meaning: 'médiation', meaningEn: 'mediation', audio: 'audio/hsk6/hsk6_调解.wav' },
      { hanzi: '胜诉', pinyin: 'shèng sù', meaning: 'gagner un procès', meaningEn: 'win a case', audio: 'audio/hsk6/hsk6_胜诉.wav' }
    ],
    tip:
      'En cas de litige, dis « 我们先尝试调解吧 » avant d\'envisager 起诉. Cette préférence pour la médiation est CULTURELLEMENT attendue. Aller direct au procès te fait passer pour quelqu\'un d\'agressif et peu raisonnable.',
    tipEn:
      'In a dispute, say «我们先尝试调解吧» before considering 起诉. This preference for mediation is CULTURALLY expected. Going straight to court makes you look aggressive and unreasonable.'
  },
  {
    id: 'c12-contrat-vocabulaire',
    title: 'Vocabulaire de contrat et clauses-clés',
    titleEn: 'Contract vocabulary and key clauses',
    body:
      'Un contrat chinois 合同 suit une **structure clausulaire fixe**. Connaître les sections et leur vocabulaire propre = condition pour négocier.\n' +
      '\n' +
      'Structure type :\n' +
      '- 甲方 (jiǎ fāng) / 乙方 (yǐ fāng) — Partie A / Partie B\n' +
      '- 标的 (biāodì) — objet du contrat\n' +
      '- 价款 (jiàkuǎn) — prix\n' +
      '- 期限 (qīxiàn) — durée\n' +
      '- 违约责任 (wéiyuē zérèn) — responsabilité en cas de rupture\n' +
      '- 不可抗力 (bùkěkànglì) — force majeure\n' +
      '- 争议解决 (zhēngyì jiějué) — règlement des différends\n' +
      '\n' +
      'Phrases de négociation :\n' +
      '- 这条款的具体含义是什么？— quel est le sens précis de cette clause ?\n' +
      '- 我希望在第 X 条加上 Y — j\'aimerais ajouter Y à la clause X\n' +
      '- 我建议增加一条不可抗力条款 — ajoutons une clause force majeure\n' +
      '\n' +
      'RÈGLE D\'OR : **ne jamais signer sur place**. Conclure par 这份合同我需要带回去研究 (je dois étudier ce contrat plus en détail).',
    bodyEn:
      'Contract 合同 structure: 甲方 (Party A), 乙方 (Party B), 标的 (subject matter), 价款 (price), 期限 (duration), 违约责任 (breach liability), 不可抗力 (force majeure), 争议解决 (dispute resolution). Clarify: 这条款的具体含义是什么？Ask change: 我希望在第 X 条加上 Y. Safeguard: 我建议增加一条不可抗力条款. Close: 这份合同我需要带回去研究 — NEVER sign on the spot.',
    items: [
      { hanzi: '合同', pinyin: 'hé tong', meaning: 'contrat', meaningEn: 'contract', audio: 'audio/hsk4/hsk4_合同.wav' },
      { hanzi: '甲方', pinyin: 'jiǎ fāng', meaning: 'partie A', meaningEn: 'party A', audio: 'audio/hsk6/hsk6_甲方.wav' },
      { hanzi: '违约', pinyin: 'wéi yuē', meaning: 'rupture de contrat', meaningEn: 'breach', audio: 'audio/hsk6/hsk6_违约.wav' },
      { hanzi: '不可抗力', pinyin: 'bù kě kàng lì', meaning: 'force majeure', meaningEn: 'force majeure', audio: 'audio/hsk6/hsk6_不可抗力.wav' },
      { hanzi: '争议', pinyin: 'zhēng yì', meaning: 'différend', meaningEn: 'dispute', audio: 'audio/hsk6/hsk6_争议.wav' }
    ],
    tip:
      'TOUS les contrats sino-étrangers doivent inclure une clause 争议解决 (résolution des différends) qui précise : juridiction (中国/香港/新加坡), langue de procédure, et préférence pour 仲裁 vs 诉讼. SANS cette clause, en cas de litige tu dépendras de la juridiction par défaut, qui peut être très défavorable.',
    tipEn:
      'ALL Sino-foreign contracts must include a 争议解决 (dispute resolution) clause specifying: jurisdiction (中国/香港/新加坡), procedural language, and preference for 仲裁 vs 诉讼. WITHOUT this clause, you depend on the default jurisdiction, which can be very unfavorable.'
  }
];

export const c12ConvM2LearnSections: LessonV2LearnSection[] = [
  {
    id: 'c12-negociation-cross',
    title: 'Négociation business cross-culturelle',
    titleEn: 'Cross-cultural business negotiation',
    body:
      'En négo business sino-étrangère, la pré-négo (connaître la 关系 et le 面子 de l\'autre) compte autant que la séance formelle. Et **un déjeuner après la négo est obligatoire** pour sceller le 关系.\n' +
      '\n' +
      '« Non » polis à reconnaître absolument :\n' +
      '- 这个我们可以再考虑 — on peut reconsidérer (= non poli)\n' +
      '- 这个有点困难 — c\'est un peu difficile (= non)\n' +
      '- 让我们再研究一下 — étudions ça encore (= souvent un non)\n' +
      '\n' +
      'Pour pousser sans braquer :\n' +
      '- 我们的诚意是希望长期合作 — notre sincérité vise une collaboration long-terme\n' +
      '- Le mot-clé 长期 (chángqī, **long-terme**) est central en business chinois\n' +
      '\n' +
      'RÈGLE D\'OR : **éviter le « non » direct**. En culture chinoise, dire 不 frontalement fait perdre la face aux deux parties. Préfère toujours l\'euphémisme.',
    bodyEn:
      'Pre-nego: know the other\'s 关系 (network) + 面子 (public face). Avoid direct «no»: prefer 这个我们可以再考虑 (we can reconsider) or 这个有点困难 (a bit difficult) which MEAN NO without saying it. Read signals: 让我们再研究一下 (let\'s study it more) = often a polite «no». To push: 我们的诚意是希望长期合作 (our sincerity is to aim for long-term collaboration). 长期 (long-term) is the Chinese business keyword. Don\'t conclude too fast: a meal after formal nego is MANDATORY to seal the 关系.',
    items: [
      { hanzi: '关系', pinyin: 'guān xì', meaning: 'relation, réseau', meaningEn: 'relationship, network', audio: 'audio/hsk3/hsk3_关系.wav' },
      { hanzi: '面子', pinyin: 'miàn zi', meaning: 'face, prestige', meaningEn: 'face, prestige', audio: 'audio/hsk5/hsk5_面子.wav' },
      { hanzi: '考虑', pinyin: 'kǎo lǜ', meaning: 'considérer', meaningEn: 'consider', audio: 'audio/hsk4/hsk4_考虑.wav' },
      { hanzi: '困难', pinyin: 'kùn nan', meaning: 'difficile', meaningEn: 'difficult', audio: 'audio/hsk4/hsk4_困难.wav' },
      { hanzi: '长期', pinyin: 'cháng qī', meaning: 'long terme', meaningEn: 'long-term', audio: 'audio/hsk5/hsk5_长期.wav' }
    ],
    tip:
      '« 让我们再研究一下 » est l\'un des « non » les plus polis en business chinois. Si tu l\'entends 2x, abandonne la proposition initiale et change d\'angle. Insister à la 3e fois = perte de face mutuelle.',
    tipEn:
      '«让我们再研究一下» is one of the politest «no» in Chinese business. If you hear it 2x, drop the initial proposal and change angle. Insisting a 3rd time = mutual face loss.'
  },
  {
    id: 'c12-pitch-strategie',
    title: 'Pitcher une stratégie devant un comité',
    titleEn: 'Pitch a strategy to a committee',
      body:
      'Pitcher un plan stratégique devant un comité chinois suit une structure rituelle : 背景 → 问题 → 战略方案 → 预期效果 → 风险 → 行动计划.\n' +
      '\n' +
      'Phrases-piliers du pitch :\n' +
      '- 各位领导，我今天向大家汇报 X 的战略方案 — ouverture hiérarchique\n' +
      '- 据统计 X — selon les statistiques X (présenter une donnée)\n' +
      '- 之所以选择这个方案，是因为 X — la raison de ce plan, c\'est X\n' +
      '- 有人可能担心 X，但是 Y — anticiper l\'objection\n' +
      '- 我希望各位领导能给予支持 — j\'espère votre soutien (clôture)\n' +
      '\n' +
      'RÈGLE D\'OR : la formule **之所以 X，是因为 Y** est la marque de rigueur causale **soutenue**. Plus solide que 因为 X，所以 Y standard. Et 给予支持 est la **formule attendue** de demande d\'approbation hiérarchique.',
    bodyEn:
      'Structure: 背景 → 问题 → 战略方案 → 预期效果 → 风险 → 行动计划. Opening: 各位领导，我今天向大家汇报 X 的战略方案. Present a datum: 据统计 X (per statistics X). Argue: 之所以选择这个方案，是因为 X (the reason we picked this plan is X). Anticipate objection: 有人可能担心 X，但是 Y. Close: 我希望各位领导能给予支持 (I hope for your support). 给予支持 = expected formula to request hierarchical approval.',
    items: [
      { hanzi: '汇报', pinyin: 'huì bào', meaning: 'rapporter, présenter', meaningEn: 'report (to superior)', audio: 'audio/hsk5/hsk5_汇报.wav' },
      { hanzi: '据统计', pinyin: 'jù tǒng jì', meaning: 'selon les statistiques', meaningEn: 'per statistics', audio: 'audio/hsk5/hsk5_统计.wav' },
      { hanzi: '之所以', pinyin: 'zhī suǒ yǐ', meaning: 'la raison pour laquelle', meaningEn: 'the reason why', audio: 'audio/hsk5/hsk5_之所以.wav' },
      { hanzi: '担心', pinyin: 'dān xīn', meaning: 's\'inquiéter', meaningEn: 'worry', audio: 'audio/hsk3/hsk3_担心.wav' },
      { hanzi: '给予', pinyin: 'jǐ yǔ', meaning: 'donner, accorder', meaningEn: 'give, grant', audio: 'audio/hsk6/hsk6_给予.wav' }
    ],
    tip:
      'Combo argument C1 : « 之所以 X，是因为 Y ». Marque la rigueur du raisonnement causal. Très utilisé en pitch business + débat. Plus soutenu que 因为 X，所以 Y standard.',
    tipEn:
      'C1 argument combo: «之所以 X，是因为 Y». Marks rigor of causal reasoning. Very used in business pitch + debate. More formal than standard 因为 X，所以 Y.'
  }
];

export const c12ConvM3LearnSections: LessonV2LearnSection[] = [
  {
    id: 'c12-discours-politique',
    title: 'Discours politique / engagement social',
    titleEn: 'Political speech / social engagement',
    body:
      'Le discours public chinois sur un sujet de société suit une **architecture solennelle** : ouverture rhétorique, constat partagé, mobilisation des valeurs, appel à l\'action.\n' +
      '\n' +
      'Verbes-clés du registre **soutenu** :\n' +
      '- 倡导 (chàngdǎo) — prôner\n' +
      '- 呼吁 (hūyù) — appeler à\n' +
      '- 推动 (tuīdòng) — faire avancer\n' +
      '- 携手 (xiéshǒu) — joindre les mains (très soutenu)\n' +
      '\n' +
      'Phrases-types du discours :\n' +
      '- 各位朋友，今天我想跟大家分享 X 的看法 — ouverture\n' +
      '- 我们身边正发生着 X 的现象 — constat de phénomène\n' +
      '- 我们追求的是 X — articulation de valeur\n' +
      '- 让我们携手 X / 共同努力 — appel à l\'action\n' +
      '- 把这个梦想变成现实 — conclusion mobilisatrice\n' +
      '\n' +
      'Attention : ton **soutenu** mais pas lyrique à outrance. Le « 让我们携手 + 共同努力 » est la **formule consacrée** des appels à l\'action politiques chinois.',
    bodyEn:
      'Frame: public speaking on a societal topic. Open solemnly: 各位朋友，今天我想跟大家分享 X 的看法. State observation: 我们身边正发生着 X 的现象. Mobilize values: 我们追求的是 X. Key verbs: 倡导 (chàngdǎo, advocate), 呼吁 (hūyù, call upon), 推动 (tuīdòng, push forward). Motivational combo: 让我们携手 X (let\'s join hands for X — 携手 is very formal). Close: 让我们共同努力，把这个梦想变成现实 (turn this dream into reality). Tone: FORMAL but not overly lyrical.',
    items: [
      { hanzi: '现象', pinyin: 'xiàn xiàng', meaning: 'phénomène', meaningEn: 'phenomenon', audio: 'audio/hsk5/hsk5_现象.wav' },
      { hanzi: '追求', pinyin: 'zhuī qiú', meaning: 'aspirer à', meaningEn: 'pursue', audio: 'audio/hsk5/hsk5_追求.wav' },
      { hanzi: '倡导', pinyin: 'chàng dǎo', meaning: 'prôner', meaningEn: 'advocate', audio: 'audio/hsk6/hsk6_倡导.wav' },
      { hanzi: '推动', pinyin: 'tuī dòng', meaning: 'faire avancer', meaningEn: 'push forward', audio: 'audio/hsk5/hsk5_推动.wav' },
      { hanzi: '携手', pinyin: 'xié shǒu', meaning: 'main dans la main', meaningEn: 'hand in hand', audio: 'audio/hsk6/hsk6_携手.wav' }
    ],
    tip:
      '« 让我们携手 X » + « 共同努力 » est la formule d\'appel à l\'action politique chinoise. Très utilisée dans les discours officiels et campagnes sociales. Effet immédiat de mobilisation collective.',
    tipEn:
      '«让我们携手 X» + «共同努力» is the Chinese political call-to-action formula. Very used in official speeches and social campaigns. Immediate collective mobilization effect.'
  },
  {
    id: 'c12-engagement-asso',
    title: 'Présenter une association / cause sociale',
    titleEn: 'Present an association / social cause',
    body:
      'Présenter une association suit une **trame en 4 temps** : 使命 (mission) → 工作 (activités) → 成果 (résultats) → 计划 (futur).\n' +
      '\n' +
      'Vocabulaire du tiers secteur :\n' +
      '- 公益 (gōngyì) — intérêt général\n' +
      '- 慈善 (císhàn) — charité\n' +
      '- 志愿者 (zhìyuànzhě) — bénévole\n' +
      '- 募捐 (mùjuān) — collecte de fonds\n' +
      '\n' +
      'Formules **soutenues** d\'engagement :\n' +
      '- 我们致力于 X — nous nous consacrons à X (致力于 = soutenu)\n' +
      '- 我们诚邀您加入我们的行列 — nous vous invitons sincèrement à nous rejoindre (诚邀 + 行列 = très formel)\n' +
      '- 我们已经帮助了 X 个人 — témoignage d\'impact chiffré\n' +
      '\n' +
      'RÈGLE D\'OR : conclure par **您的支持，意味着 X** (votre soutien signifie X). À la place du banal 请捐款, tu rends l\'acte **signifiant** — ex : 您的支持，意味着一个孩子能上学.',
    bodyEn:
      'Structure: 我们的使命 (mission) → 主要工作 (activities) → 已取得的成果 (results) → 未来的计划 (future). Vocab: 公益 (public interest), 慈善 (charity), 志愿者 (volunteer), 募捐 (fundraising). Phrase: 我们致力于 X (we are dedicated to X — 致力于 is formal). To mobilize: 我们诚邀您加入我们的行列 (we sincerely invite you to join our ranks — 诚邀 + 行列 = very formal). Witness impact: 我们已经帮助了 X 个人. Close: 您的支持，意味着 X (your support means X — punchy formula).',
    items: [
      { hanzi: '使命', pinyin: 'shǐ mìng', meaning: 'mission', meaningEn: 'mission', audio: 'audio/hsk6/hsk6_使命.wav' },
      { hanzi: '公益', pinyin: 'gōng yì', meaning: 'intérêt public', meaningEn: 'public interest', audio: 'audio/hsk6/hsk6_公益.wav' },
      { hanzi: '志愿者', pinyin: 'zhì yuàn zhě', meaning: 'bénévole', meaningEn: 'volunteer', audio: 'audio/hsk5/hsk5_志愿者.wav' },
      { hanzi: '致力于', pinyin: 'zhì lì yú', meaning: 'se consacrer à', meaningEn: 'be dedicated to', audio: 'audio/hsk6/hsk6_致力.wav' },
      { hanzi: '诚邀', pinyin: 'chéng yāo', meaning: 'inviter sincèrement', meaningEn: 'sincerely invite', audio: 'audio/hsk6/hsk6_邀.wav' }
    ],
    tip:
      '« 您的支持，意味着 X » est la formule de don ultime. À la place de « 请捐款 » (donnez), tu rends l\'acte SIGNIFIANT. Ex : « 您的支持，意味着一个孩子能上学 » = ton don signifie qu\'un enfant pourra aller à l\'école.',
    tipEn:
      '«您的支持，意味着 X» is the ultimate donation formula. Instead of «请捐款» (donate), you make the act MEANINGFUL. Ex: «您的支持，意味着一个孩子能上学» = your donation means a child can go to school.'
  }
];

export const c12ConvM4LearnSections: LessonV2LearnSection[] = [
  {
    id: 'c12-procedure-rh',
    title: 'Mener un entretien disciplinaire RH',
    titleEn: 'Conduct an HR disciplinary interview',
    body:
      'L\'entretien disciplinaire RH chinois suit un protocole **formel et humain** : énoncé des faits, explication demandée, sanction, et toujours **porte ouverte** pour la rééducation.\n' +
      '\n' +
      'Verbes-piliers du registre RH :\n' +
      '- 谈话 (tánhuà) — entretien formel\n' +
      '- 警告 (jǐnggào) — avertir\n' +
      '- 处分 (chǔfèn) — sanction\n' +
      '- 吸取教训 (xīqǔ jiàoxùn) — tirer une leçon\n' +
      '\n' +
      'Phrases-types de l\'entretien :\n' +
      '- 我今天找您谈话是关于 X 的事情 — cadre formel\n' +
      '- 根据我们了解到的情况 X — énoncé factuel\n' +
      '- 您能否说明一下情况？— demande d\'explication\n' +
      '- 公司决定 X / 根据公司规定，您需要 X — suite à donner\n' +
      '- 我们希望您能从这件事中吸取教训 — humanisation\n' +
      '- 我们相信您能改进 — porte ouverte\n' +
      '\n' +
      'RÈGLE D\'OR : en culture confucéenne, l\'entretien RH = **chance d\'éduquer**, pas seulement de punir. Sans porte ouverte, l\'employé perd la face et se ferme ou démissionne.',
    bodyEn:
      'Formal frame: 我今天找您谈话是关于 X 的事情. Verbs: 谈话 (formal interview), 警告 (warn), 处分 (sanction). State facts: 根据我们了解到的情况 X. Ask for explanation: 您能否说明一下情况？Set follow-up: 公司决定 X / 根据公司规定，您需要 X. Close humanely: 我们希望您能从这件事中吸取教训 (hope you draw a lesson). In Chinese culture, HR interview = chance to EDUCATE, not just punish. Key phrase: 我们相信您能改进 (we trust your ability to improve).',
    items: [
      { hanzi: '谈话', pinyin: 'tán huà', meaning: 'entretien (formel)', meaningEn: 'formal interview', audio: 'audio/hsk5/hsk5_谈话.wav' },
      { hanzi: '警告', pinyin: 'jǐng gào', meaning: 'avertir', meaningEn: 'warn', audio: 'audio/hsk5/hsk5_警告.wav' },
      { hanzi: '处分', pinyin: 'chǔ fèn', meaning: 'sanction', meaningEn: 'sanction', audio: 'audio/hsk6/hsk6_处分.wav' },
      { hanzi: '吸取', pinyin: 'xī qǔ', meaning: 'tirer (leçon)', meaningEn: 'draw (lesson)', audio: 'audio/hsk6/hsk6_吸取.wav' },
      { hanzi: '教训', pinyin: 'jiào xùn', meaning: 'leçon, enseignement', meaningEn: 'lesson', audio: 'audio/hsk5/hsk5_教训.wav' }
    ],
    tip:
      'Toujours conclure un entretien disciplinaire chinois par une porte ouverte (« 我们相信您能改进 »). Sinon, l\'employé perd la face et démissionne ou se ferme. La culture confucéenne valorise la rééducation > la punition pure.',
    tipEn:
      'Always close a Chinese disciplinary interview with an open door («我们相信您能改进»). Otherwise the employee loses face and resigns or shuts down. Confucian culture values re-education > pure punishment.'
  },
  {
    id: 'c12-licenciement',
    title: 'Annoncer un licenciement avec dignité',
    titleEn: 'Announce a layoff with dignity',
    body:
      'Annoncer un licenciement avec dignité en chinois suit un **protocole en 5 étapes** : préparer le terrain, annoncer, justifier, adoucir, offrir.\n' +
      '\n' +
      'Vocabulaire du licenciement :\n' +
      '- 解除合同 (jiěchú hétong) — résilier le contrat\n' +
      '- 补偿金 (bǔcháng jīn) — indemnité\n' +
      '- 离职手续 (lízhí shǒuxù) — formalités de départ\n' +
      '- 推荐信 (tuījiànxìn) — lettre de recommandation\n' +
      '\n' +
      'Phrases-types par étape :\n' +
      '- 我有一件事要跟您谈，希望您冷静听 — préparer\n' +
      '- 公司决定与您解除劳动合同 — annoncer\n' +
      '- 由于 X 的原因 — justifier (**toujours** invoquer une cause)\n' +
      '- 这不是您个人能力的问题 — adoucir\n' +
      '- 我们可以为您提供推荐信 — offrir\n' +
      '- 我个人非常感谢您过去的贡献 — humaniser la clôture\n' +
      '\n' +
      'RÈGLE D\'OR : le licenciement chinois respectueux **inclut toujours** (1) cause objective, (2) reconnaissance des contributions passées, (3) offre de 推荐信 + 补偿金. Sans ces 3 éléments, le 关系 explose.',
    bodyEn:
      'Prep ground: 我有一件事要跟您谈，希望您冷静听. Announce: 公司决定与您解除劳动合同 (the company decided to terminate your contract). Justify: 由于 X 的原因 (always invoke a cause). Soften: 这不是您个人能力的问题 (this isn\'t about your personal ability). Vocab: 解除合同 (terminate), 补偿金 (compensation), 离职手续 (departure formalities), 推荐信 (recommendation letter). Always offer: 我们可以为您提供推荐信. Close: 我个人非常感谢您过去的贡献 (personally, thank you for your past contributions) — humanizes the moment.',
    items: [
      { hanzi: '解除', pinyin: 'jiě chú', meaning: 'résilier, lever', meaningEn: 'terminate, lift', audio: 'audio/hsk6/hsk6_解除.wav' },
      { hanzi: '劳动合同', pinyin: 'láo dòng hé tong', meaning: 'contrat de travail', meaningEn: 'labor contract', audio: 'audio/hsk5/hsk5_劳动.wav' },
      { hanzi: '补偿金', pinyin: 'bǔ cháng jīn', meaning: 'indemnité', meaningEn: 'compensation', audio: 'audio/hsk6/hsk6_补偿.wav' },
      { hanzi: '推荐信', pinyin: 'tuī jiàn xìn', meaning: 'lettre de reco', meaningEn: 'recommendation letter', audio: 'audio/hsk5/hsk5_推荐.wav' },
      { hanzi: '贡献', pinyin: 'gòng xiàn', meaning: 'contribution', meaningEn: 'contribution', audio: 'audio/hsk5/hsk5_贡献.wav' }
    ],
    tip:
      'Le licenciement chinois respectueux INCLUT toujours : (1) cause objective (économique, restructuration), (2) reconnaissance des contributions passées, (3) offre de 推荐信 + 补偿金. Sans ces 3 éléments, le 关系 explose et la réputation RH de la boîte chute.',
    tipEn:
      'Respectful Chinese layoff ALWAYS includes: (1) objective cause (economic, restructuring), (2) recognition of past contributions, (3) offer of 推荐信 + 补偿金. Without these 3 elements, 关系 explodes and the HR reputation crashes.'
  }
];

export const c12ConvM5LearnSections: LessonV2LearnSection[] = [
  {
    id: 'c12-investisseur',
    title: 'Pitcher devant un investisseur (VC chinois)',
    titleEn: 'Pitch to an investor (Chinese VC)',
    body:
      'Le pitch VC chinois (10 min) suit une structure rituelle : 团队 → 痛点 → 解决方案 → 市场 → 商业模式 → 数据 → 融资计划. Le VC chinois aime **voir des chiffres** rapidement.\n' +
      '\n' +
      'Vocabulaire du VC :\n' +
      '- 估值 (gūzhí) — valorisation\n' +
      '- 融资 (róngzī) — levée de fonds\n' +
      '- 商业模式 (shāngyèmóshì) — business model\n' +
      '- 现金流 (xiànjīnliú) — cashflow\n' +
      '- 退出机制 (tuìchū jīzhì) — sortie / exit\n' +
      '- 痛点 (tòng diǎn) — pain point (**mot-clé obsessionnel** des VC chinois)\n' +
      '- 护城河 (hùchénghé) — moat / douve (métaphore venue de Buffett)\n' +
      '\n' +
      'Phrases-piliers du pitch :\n' +
      '- 我们解决的痛点是 X — pitch d\'ouverture\n' +
      '- 我们的护城河是 X — articuler son avantage durable\n' +
      '- 我们希望融资 X 万美元 — annoncer le tour\n' +
      '\n' +
      'RÈGLE D\'OR : si tu ne peux pas **articuler ton 痛点 en 1 phrase claire** dans les 60 premières secondes, le VC zappe. Discipline d\'elevator pitch en chinois = non-négociable.',
    bodyEn:
      '10-min structure: 团队 → 痛点 → 解决方案 → 市场 → 商业模式 → 数据 → 融资计划. Vocab: 估值 (valuation), 融资 (fundraising), 商业模式 (business model), 现金流 (cashflow), 退出机制 (exit mechanism). Opening pitch: 我们解决的痛点是 X (the pain point we solve is X). 痛点 (pain point) is an obsessive Chinese VC KEYWORD. Strengths: 我们的护城河是 X (our moat is X — Buffett metaphor, 护城河 = moat). Close: 我们希望融资 X 万美元 (we want to raise X). Chinese VCs want to SEE NUMBERS fast.',
    items: [
      { hanzi: '估值', pinyin: 'gū zhí', meaning: 'valorisation', meaningEn: 'valuation', audio: 'audio/hsk6/hsk6_估值.wav' },
      { hanzi: '融资', pinyin: 'róng zī', meaning: 'levée de fonds', meaningEn: 'fundraising', audio: 'audio/hsk6/hsk6_融资.wav' },
      { hanzi: '商业模式', pinyin: 'shāng yè mó shì', meaning: 'modèle économique', meaningEn: 'business model', audio: 'audio/hsk6/hsk6_商业.wav' },
      { hanzi: '痛点', pinyin: 'tòng diǎn', meaning: 'pain point', meaningEn: 'pain point', audio: 'audio/hsk6/hsk6_痛点.wav' },
      { hanzi: '护城河', pinyin: 'hù chéng hé', meaning: 'moat (avantage)', meaningEn: 'moat (advantage)', audio: 'audio/hsk6/hsk6_护城河.wav' }
    ],
    tip:
      'Le VC chinois te demandera CASH-FLOW + 痛点 dans les 60 premières secondes. Si tu ne peux pas ARTICULER ton 痛点 en 1 phrase claire, le VC zappe. Cette discipline d\'élévator pitch en chinois est non-négociable en 2026.',
    tipEn:
      'A Chinese VC will ask CASHFLOW + 痛点 in the first 60 seconds. If you can\'t ARTICULATE your 痛点 in 1 clear sentence, the VC zaps. This Chinese elevator-pitch discipline is non-negotiable in 2026.'
  },
  {
    id: 'c12-board-meeting',
    title: 'Conseil d\'administration : exposer un risque',
    titleEn: 'Board meeting: present a risk',
    body:
      'Exposer un risque au conseil d\'administration suit la séquence : 风险描述 → 影响评估 → 当前应对措施 → 建议. Le ton est **sérieux, factuel, jamais alarmiste**.\n' +
      '\n' +
      'Vocabulaire de gouvernance :\n' +
      '- 潜在 (qiánzài) — latent, potentiel (mot-clé)\n' +
      '- 采取措施 (cǎiqǔcuòshī) — prendre des mesures\n' +
      '- 授权 (shòuquán) — autoriser (verbe-clé de gouvernance)\n' +
      '- 汇报进展 (huìbào jìnzhǎn) — rendre compte de l\'avancée\n' +
      '\n' +
      'Phrases-piliers de l\'exposé :\n' +
      '- 我必须向各位董事报告一个潜在风险 — ouverture\n' +
      '- 影响可能在 X 之间 — quantification\n' +
      '- 我们已经采取的措施包括 X — mesures déjà prises\n' +
      '- 我建议董事会授权 X — demande\n' +
      '- 我会随时向董事会汇报进展 — clôture\n' +
      '\n' +
      'RÈGLE D\'OR : présenter un risque **sans mesures déjà prises** = perte de crédibilité immédiate. La séquence « risque → ce qu\'on a déjà fait → recommandation » montre que tu **maîtrises** la situation.',
    bodyEn:
      'Structure: 风险描述 → 影响评估 → 当前应对措施 → 建议. Phrases: 我必须向各位董事报告一个潜在风险 (I must report a potential risk to the board). 潜在 (qiánzài, latent/potential) = governance keyword. Quantify: 影响可能在 X 之间. Measures: 我们已经采取的措施包括 X. Ask: 我建议董事会授权 X (I recommend the board authorize X). 授权 (authorize) is the governance keyword. Close: 我会随时向董事会汇报进展. Tone: SERIOUS, FACTUAL, never alarmist.',
    items: [
      { hanzi: '董事', pinyin: 'dǒng shì', meaning: 'administrateur', meaningEn: 'board director', audio: 'audio/hsk6/hsk6_董事.wav' },
      { hanzi: '潜在', pinyin: 'qián zài', meaning: 'latent, potentiel', meaningEn: 'latent, potential', audio: 'audio/hsk6/hsk6_潜在.wav' },
      { hanzi: '采取', pinyin: 'cǎi qǔ', meaning: 'adopter, prendre', meaningEn: 'adopt, take', audio: 'audio/hsk5/hsk5_采取.wav' },
      { hanzi: '措施', pinyin: 'cuò shī', meaning: 'mesure', meaningEn: 'measure', audio: 'audio/hsk5/hsk5_措施.wav' },
      { hanzi: '授权', pinyin: 'shòu quán', meaning: 'autoriser', meaningEn: 'authorize', audio: 'audio/hsk6/hsk6_授权.wav' }
    ],
    tip:
      'Au CA chinois, présenter un risque SANS mesures déjà prises = perte de crédibilité. La structure « 风险 → 我们déjà fait X → recommandons Y » montre que tu maîtrises la situation et n\'es pas en panique.',
    tipEn:
      'At a Chinese board, presenting a risk WITHOUT already-taken measures = credibility loss. The «risk → we already did X → recommend Y» structure shows you control the situation and aren\'t panicking.'
  }
];

export const c12ConvM6LearnSections: LessonV2LearnSection[] = [
  {
    id: 'c12-arbitrage-conflit',
    title: 'Arbitrer un conflit interne entre départements',
    titleEn: 'Arbitrate an internal inter-department conflict',
    body:
      'Arbitrer un conflit entre départements suit un protocole en 4 temps : prise de hauteur, reformulation neutre, identification du bien commun, décision pesée.\n' +
      '\n' +
      'Vocabulaire-clé de l\'arbitrage :\n' +
      '- 全局 (quánjú) — vue d\'ensemble (mot-clé du dirigeant)\n' +
      '- 折中方案 (zhézhōng fāng\'àn) — solution de compromis\n' +
      '- 权衡 (quánhéng) — peser le pour et le contre\n' +
      '\n' +
      'Phrases-types de l\'arbitre :\n' +
      '- 我作为公司高层，希望从全局角度看这个问题 — prise de hauteur\n' +
      '- 销售部担心的是 X，研发部坚持的是 Y — reformulation\n' +
      '- 双方的目标都是公司的发展 — bien commun\n' +
      '- 我们能否找一个折中方案，既满足 X 又考虑 Y？— proposition\n' +
      '- 经过权衡，我决定 X — décision finale\n' +
      '\n' +
      'RÈGLE D\'OR : **经过权衡，我决定 X** est la formule de décision exécutive chinoise. 权衡 montre que tu n\'as pas décidé impulsivement — sans cette formule, ta décision peut paraître arbitraire.',
    bodyEn:
      'Frame: pro dispute between dept A (e.g. sales) and dept B (e.g. R&D). Stance: 我作为公司高层，希望从全局角度看这个问题 (as exec, I see it from a global angle). 全局 (overall view) is the keyword. Reformulate: 销售部担心的是 X，研发部坚持的是 Y. Identify the COMMON GOOD: 双方的目标都是公司的发展. Propose: 我们能否找一个折中方案，既满足 X 又考虑 Y？Decision: 经过权衡，我决定 X (after weighing, I decide X). 权衡 (weighing pros and cons) shows deliberation.',
    items: [
      { hanzi: '高层', pinyin: 'gāo céng', meaning: 'haute direction', meaningEn: 'top management', audio: 'audio/hsk6/hsk6_高层.wav' },
      { hanzi: '全局', pinyin: 'quán jú', meaning: 'vue d\'ensemble', meaningEn: 'overall view', audio: 'audio/hsk6/hsk6_全局.wav' },
      { hanzi: '坚持', pinyin: 'jiān chí', meaning: 'persister, insister', meaningEn: 'insist', audio: 'audio/hsk4/hsk4_坚持.wav' },
      { hanzi: '满足', pinyin: 'mǎn zú', meaning: 'satisfaire', meaningEn: 'satisfy', audio: 'audio/hsk4/hsk4_满足.wav' },
      { hanzi: '权衡', pinyin: 'quán héng', meaning: 'peser, balancer', meaningEn: 'weigh', audio: 'audio/hsk6/hsk6_权衡.wav' }
    ],
    tip:
      '« 经过权衡，我决定 X » est la formule de décision exécutive chinoise. 权衡 montre que tu n\'as PAS décidé impulsivement. Sans cette formule, ta décision peut paraître arbitraire et fragiliser ton autorité.',
    tipEn:
      '«经过权衡，我决定 X» is the Chinese executive decision formula. 权衡 shows you DIDN\'T decide impulsively. Without this formula, your decision may seem arbitrary and weaken your authority.'
  },
  {
    id: 'c12-keynote-international',
    title: 'Keynote internationale en chinois',
    titleEn: 'International keynote in Chinese',
    body:
      'La keynote internationale en chinois combine **codes rhétoriques classiques** et adaptation à la traduction simultanée. Pour les interprètes, ralentir + pauses entre groupes de 8-10 mots.\n' +
      '\n' +
      'Verbes-piliers du registre **soutenu** :\n' +
      '- 阐述 (chǎnshù) — exposer en détail\n' +
      '- 揭示 (jiēshì) — révéler\n' +
      '- 启示 (qǐshì) — enseignement, révélation (plus soutenu que 教训)\n' +
      '- 聆听 (língtīng) — écouter avec attention\n' +
      '\n' +
      'Phrases-piliers de la keynote :\n' +
      '- 各位来自世界各地的朋友，大家好 — ouverture cosmopolite\n' +
      '- 古人云 X — citation classique (sécurise la crédibilité)\n' +
      '- 今天我想分享 X 给我们的启示 — articulation de thèse\n' +
      '- 让我举一个例子 X — exemple\n' +
      '- 让我们记住 X / 谢谢大家的聆听 — clôture\n' +
      '\n' +
      'RÈGLE D\'OR : citer **古人云 + une maxime classique** au début = signal immédiat de respect culturel. Ex : « 古人云：千里之行，始于足下 » (Lao Zi). Effet : public chinois immédiatement réceptif.',
    bodyEn:
      'Open: 各位来自世界各地的朋友，大家好. Cultural mention: 古人云 X (the ancients said X — classical citation secures credibility). Articulate thesis: 今天我想分享 X 给我们的启示 (today I share the lessons of X). 启示 (revelation) more formal than 教训 (lesson). Examples: 让我举一个例子 X. Strong verbs: 阐述 (expound), 揭示 (reveal). Close: 让我们记住 X (let\'s remember X). 谢谢大家的聆听 + slight bow. For SIMULTANEOUS interpretation: slow + pauses between 8-10-word groups = huge help for interpreters.',
    items: [
      { hanzi: '古人云', pinyin: 'gǔ rén yún', meaning: 'les anciens disaient', meaningEn: 'the ancients said', audio: 'audio/hsk6/hsk6_古人.wav' },
      { hanzi: '启示', pinyin: 'qǐ shì', meaning: 'enseignement, révélation', meaningEn: 'revelation', audio: 'audio/hsk6/hsk6_启示.wav' },
      { hanzi: '阐述', pinyin: 'chǎn shù', meaning: 'exposer en détail', meaningEn: 'expound', audio: 'audio/hsk6/hsk6_阐述.wav' },
      { hanzi: '揭示', pinyin: 'jiē shì', meaning: 'révéler', meaningEn: 'reveal', audio: 'audio/hsk6/hsk6_揭示.wav' },
      { hanzi: '聆听', pinyin: 'líng tīng', meaning: 'écouter avec attention', meaningEn: 'listen attentively', audio: 'audio/hsk6/hsk6_聆听.wav' }
    ],
    tip:
      'Citer 古人云 + une maxime classique au début d\'une keynote chinoise = signal IMMÉDIAT de respect culturel. Ex : « 古人云：千里之行，始于足下 » (un voyage de 1000 li commence par un pas) — Lao Zi. Effet : public chinois immédiatement réceptif.',
    tipEn:
      'Citing 古人云 + a classical maxim at the start of a Chinese keynote = IMMEDIATE signal of cultural respect. Ex: «古人云：千里之行，始于足下» (a 1000-li journey starts with a step) — Lao Zi. Effect: Chinese audience immediately receptive.'
  }
];

export const c12ConvM7LearnSections: LessonV2LearnSection[] = [
  {
    id: 'c12-livre-blanc',
    title: 'Rédiger un livre blanc / position paper',
    titleEn: 'Draft a white paper / position paper',
    body:
      'Le livre blanc chinois suit une **structure académique fixe** : 摘要 → 引言 → 现状 → 分析 → 政策建议 → 结论 → 参考文献. Ton dense, impersonnel, factuel.\n' +
      '\n' +
      'Vocabulaire-clé du registre académique :\n' +
      '- 摘要 (zhāiyào) — résumé / abstract\n' +
      '- 引言 (yǐnyán) — introduction\n' +
      '- 探讨 (tàntǎo) — explorer intellectuellement\n' +
      '- 笔者 (bǐzhě) — l\'auteur (de cet écrit)\n' +
      '- 呼吁 (hūyù) — appeler à (recommandations)\n' +
      '\n' +
      'Phrases-types du livre blanc :\n' +
      '- 本白皮书旨在探讨 X — ouverture (本 + nom = formule consacrée)\n' +
      '- 我们呼吁有关部门采取以下措施 — recommandations\n' +
      '- 我们期待与社会各界共同推动 X 的发展 — clôture\n' +
      '\n' +
      'RÈGLE D\'OR : **jamais « 我 »** dans un livre blanc chinois. Toujours 笔者 ou 本研究 ou 本报告. L\'objectivité passe par **l\'effacement du sujet** — utiliser la 1re personne décrédibilise immédiatement le texte.',
    bodyEn:
      'Structure: 摘要 (abstract) → 引言 (intro) → 现状 (status quo) → 分析 (analysis) → 政策建议 (recommendations) → 结论 (conclusion) → 参考文献 (references). Opening: 本白皮书旨在探讨 X (this white paper aims to explore X). 本 (this / present) + noun = sanctioned formula of admin/academic language. Recommendations: 我们呼吁有关部门采取以下措施. Close: 我们期待与社会各界共同推动 X 的发展 (we hope to advance X with all of society). Tone: DENSE, IMPERSONAL, FACTUAL. No «我» in a white paper → prefer 笔者 (the author) or «本研究».',
    items: [
      { hanzi: '白皮书', pinyin: 'bái pí shū', meaning: 'livre blanc', meaningEn: 'white paper', audio: 'audio/hsk6/hsk6_白皮书.wav' },
      { hanzi: '摘要', pinyin: 'zhāi yào', meaning: 'résumé, abstract', meaningEn: 'abstract', audio: 'audio/hsk6/hsk6_摘要.wav' },
      { hanzi: '引言', pinyin: 'yǐn yán', meaning: 'introduction', meaningEn: 'introduction', audio: 'audio/hsk6/hsk6_引言.wav' },
      { hanzi: '探讨', pinyin: 'tàn tǎo', meaning: 'explorer (intellectuel)', meaningEn: 'explore', audio: 'audio/hsk5/hsk5_探讨.wav' },
      { hanzi: '笔者', pinyin: 'bǐ zhě', meaning: 'l\'auteur (de cet écrit)', meaningEn: 'the author (of this text)', audio: 'audio/hsk6/hsk6_笔者.wav' }
    ],
    tip:
      'Dans un livre blanc chinois, JAMAIS « 我 ». Toujours 笔者 ou « 本研究 » ou « 本报告 ». L\'utilisation de la 1re personne décrédibilise immédiatement le texte académique chinois — l\'objectivité passe par l\'effacement du sujet.',
    tipEn:
      'In a Chinese white paper, NEVER «我». Always 笔者 or «本研究» or «本报告». Using 1st person immediately discredits an academic Chinese text — objectivity goes through erasing the subject.'
  },
  {
    id: 'c12-petition-formelle',
    title: 'Pétition / lettre ouverte de signataires',
    titleEn: 'Petition / open letter from signatories',
    body:
      'La pétition / lettre ouverte chinoise est une adresse **collective et formelle** à une autorité. Forme épistolaire classique : 致 X + cause + demande + clôture + signatures.\n' +
      '\n' +
      'Hiérarchie d\'intensité des demandes (du plus doux au plus ferme) :\n' +
      '- 呼吁 (hūyù) — appel\n' +
      '- 请求 (qǐngqiú) — demande\n' +
      '- 要求 (yāoqiú) — exigence\n' +
      '- 强烈要求 (qiángliè yāoqiú) — exigence forte\n' +
      '\n' +
      'Phrases-piliers de la pétition :\n' +
      '- 致 X — formule épistolaire d\'adresse\n' +
      '- 我们，作为 X，对 Y 表示深切的关注 — cause (深切 marque le sérieux)\n' +
      '- 我们期待您能积极回应我们的诉求 — clôture\n' +
      '- 此致敬礼 + « 100 名 X 联署 » — signatures collectives\n' +
      '\n' +
      'RÈGLE D\'OR : pétition **efficace = escalade progressive**. Commencer par 强烈要求 coupe la marge de discussion — l\'autorité se braque. Garde l\'escalade pour les pétitions de 2e ou 3e tour.',
    bodyEn:
      'Frame: collective address to authority (govt, company, university) on a public-interest topic. Opening: 致 X (to X) — formal epistolary. Cause: 我们，作为 X，对 Y 表示深切的关注. 深切 (deep) marks seriousness. Demands: 我们呼吁 X / 我们要求 X. Hierarchy: 呼吁 (appeal) < 请求 (request) < 要求 (demand) < 强烈要求 (strong demand). Close: 我们期待您能积极回应我们的诉求 (we hope for an active response). Sign: name + title + organization. Multi-signer petition: 此致敬礼 + collective name («100 名 X 联署» — co-signed by 100 X).',
    items: [
      { hanzi: '致', pinyin: 'zhì', meaning: 'à (formel)', meaningEn: 'to (formal)', audio: 'audio/hsk5/hsk5_致.wav' },
      { hanzi: '深切', pinyin: 'shēn qiè', meaning: 'profond, sincère', meaningEn: 'deep, sincere', audio: 'audio/hsk6/hsk6_深切.wav' },
      { hanzi: '关注', pinyin: 'guān zhù', meaning: 'préoccupation, attention', meaningEn: 'concern', audio: 'audio/hsk5/hsk5_关注.wav' },
      { hanzi: '强烈', pinyin: 'qiáng liè', meaning: 'fort, intense', meaningEn: 'strong, intense', audio: 'audio/hsk5/hsk5_强烈.wav' },
      { hanzi: '联署', pinyin: 'lián shǔ', meaning: 'co-signer', meaningEn: 'co-sign', audio: 'audio/hsk6/hsk6_联署.wav' }
    ],
    tip:
      'Une pétition chinoise EFFICACE escalade la demande : 呼吁 → 请求 → 要求 → 强烈要求. Si tu commences par 强烈要求, tu coupes la marge de discussion et l\'autorité se braque. Garde l\'escalade pour les pétitions de 2e ou 3e tour.',
    tipEn:
      'An EFFECTIVE Chinese petition escalates demands: 呼吁 → 请求 → 要求 → 强烈要求. Starting with 强烈要求 cuts discussion room and the authority closes off. Keep escalation for 2nd or 3rd-round petitions.'
  }
];

// === NUANCES C1.2 ============================================================

export const c12NuancesM1LearnSections: LessonV2LearnSection[] = [
  {
    id: 'c12-shixian-wancheng',
    title: '实现 vs 完成 vs 达成 — réaliser, accomplir, atteindre',
    titleEn: '实现 vs 完成 vs 达成 — realize, complete, reach',
    body:
      'Trois verbes pour « accomplir » que les sinophones distinguent selon **la nature de l\'objet** : concret délimité, abstrait noble, collaboratif négocié.\n' +
      '\n' +
      'Distinctions et collocations :\n' +
      '- 完成 (wánchéng) — achever une **tâche concrète délimitée**. 完成任务 / 完成作业\n' +
      '- 实现 (shíxiàn) — **réaliser un rêve / objectif abstrait**, verbe noble. 实现梦想 / 实现目标\n' +
      '- 达成 (dáchéng) — **parvenir à un accord** mutuellement. 达成协议 / 达成共识\n' +
      '\n' +
      'Attention : erreur classique **完成梦想 ✗ → 实现梦想 ✓**. Un rêve se *réalise*, il ne s\'*achève* pas. Trois collocations C1 à mémoriser comme blocs figés : 实现梦想, 完成任务, 达成共识.',
    bodyEn:
      '实现 (shíxiàn) = REALIZE a dream / abstract goal. 实现梦想 / 实现目标. Connotes future PROJECTION becoming present. Noble verb. 完成 (wánchéng) = COMPLETE a concrete bounded task. 完成任务 / 完成作业. Connotes end of activity with deadline. 达成 (dáchéng) = REACH an agreement/consensus, mutually with another. 达成协议 / 达成共识. Connotes collaboration and NEGOTIATED result. Hierarchy: 完成 (concrete bounded) < 实现 (abstract noble) < 达成 (collaborative). Classic mistake: 完成梦想 ✗ → 实现梦想 ✓.',
    items: [
      { hanzi: '实现', pinyin: 'shí xiàn', meaning: 'réaliser', meaningEn: 'realize', audio: 'audio/hsk5/hsk5_实现.wav' },
      { hanzi: '完成', pinyin: 'wán chéng', meaning: 'achever', meaningEn: 'complete', audio: 'audio/hsk3/hsk3_完成.wav' },
      { hanzi: '达成', pinyin: 'dá chéng', meaning: 'parvenir à', meaningEn: 'reach (agreement)', audio: 'audio/hsk5/hsk5_达成.wav' },
      { hanzi: '梦想', pinyin: 'mèng xiǎng', meaning: 'rêve', meaningEn: 'dream', audio: 'audio/hsk5/hsk5_梦想.wav' },
      { hanzi: '协议', pinyin: 'xié yì', meaning: 'accord', meaningEn: 'agreement', audio: 'audio/hsk5/hsk5_协议.wav' }
    ],
    tip:
      'Mémoriser 3 collocations clés C1 : 实现梦想 (réaliser un rêve), 完成任务 (achever une tâche), 达成共识 (parvenir au consensus). Ces blocs figés sont irremplaçables.',
    tipEn:
      'Memorize 3 key C1 collocations: 实现梦想 (realize a dream), 完成任务 (complete a task), 达成共识 (reach consensus). These fixed blocks are irreplaceable.'
  },
  {
    id: 'c12-jianjue-jianyi',
    title: '建议 vs 提议 vs 倡议 — suggestion (registres)',
    titleEn: '建议 vs 提议 vs 倡议 — suggestion (registers)',
    body:
      'Trois verbes de suggestion qui s\'ordonnent **du plus banal au plus solennel** selon le contexte d\'énonciation.\n' +
      '\n' +
      'Hiérarchie de registre :\n' +
      '- 建议 (jiànyì) — suggestion universelle (oral + écrit). 我建议你 X\n' +
      '- 提议 (tíyì) — **proposition formelle** en réunion, parfois mise aux voix. 我提议我们投票\n' +
      '- 倡议 (chàngyì) — **initiative publique** (campagne, mouvement). 倡议节约用水\n' +
      '\n' +
      'RÈGLE D\'OR : dans un livre blanc ou discours politique, **我们倡议 X** est puissant — ça transforme une simple suggestion en mouvement **collectif** à aura symbolique. C\'est pourquoi on dit « 一带一路倡议 » (Belt and Road Initiative) : échelle géopolitique → 倡议, pas 建议.',
    bodyEn:
      '建议 (jiànyì) = SUGGESTION (most universal, oral and written). 我建议你 X. Addressed to individual or group. 提议 (tíyì) = FORMAL PROPOSAL (in meetings, votes). 我提议我们投票 (I move we vote). More structured, sometimes voted on. 倡议 (chàngyì) = PUBLIC INITIATIVE (campaign launch, movement). 倡议节约用水 (launch an initiative to save water). Connotes COLLECTIVE and symbolic SCOPE. Hierarchy: 建议 (universal) < 提议 (formal meeting) < 倡议 (public initiative). «一带一路倡议» (Belt and Road Initiative) — why 倡议 not 建议? Geopolitical scale.',
    items: [
      { hanzi: '建议', pinyin: 'jiàn yì', meaning: 'suggérer, suggestion', meaningEn: 'suggest, suggestion', audio: 'audio/hsk3/hsk3_建议.wav' },
      { hanzi: '提议', pinyin: 'tí yì', meaning: 'proposition (vote)', meaningEn: 'motion, proposal', audio: 'audio/hsk6/hsk6_提议.wav' },
      { hanzi: '倡议', pinyin: 'chàng yì', meaning: 'initiative publique', meaningEn: 'initiative', audio: 'audio/hsk6/hsk6_倡议.wav' },
      { hanzi: '投票', pinyin: 'tóu piào', meaning: 'voter', meaningEn: 'vote', audio: 'audio/hsk5/hsk5_投票.wav' },
      { hanzi: '一带一路', pinyin: 'yí dài yí lù', meaning: 'Belt and Road', meaningEn: 'Belt and Road', audio: 'audio/hsk6/hsk6_一带.wav' }
    ],
    tip:
      'Dans un white paper / discours politique, dire « 我们倡议 X » est PUISSANT. Ça transforme une simple suggestion en MOUVEMENT collectif avec aura symbolique. Le diplomatique chinois utilise 倡议 stratégiquement pour cadrer ses initiatives géopolitiques.',
    tipEn:
      'In a white paper / political speech, saying «我们倡议 X» is POWERFUL. It transforms a simple suggestion into a COLLECTIVE movement with symbolic aura. Chinese diplomats use 倡议 strategically to frame geopolitical initiatives.'
  }
];

export const c12NuancesM2LearnSections: LessonV2LearnSection[] = [
  {
    id: 'c12-baochi-weichi',
    title: '保持 vs 维持 vs 维护 — maintenir, préserver',
    titleEn: '保持 vs 维持 vs 维护 — maintain, preserve',
    body:
      'Trois verbes pour « maintenir » qui s\'ordonnent **selon l\'effort impliqué** : état stable → effort actif anti-chute → défense contre menace.\n' +
      '\n' +
      'Distinctions et collocations canoniques :\n' +
      '- 保持 (bǎochí) — **garder un état** stable. 保持安静, 保持联系, 保持健康\n' +
      '- 维持 (wéichí) — **maintenir malgré difficultés** (effort actif). 维持秩序, 维持生活, 维持纪律\n' +
      '- 维护 (wéihù) — **protéger, défendre** activement. 维护权利, 维护和平, 维护利益\n' +
      '\n' +
      'Attention : erreur classique **保持权利 ✗ → 维护权利 ✓**. Les droits se *défendent*, ils ne se *gardent* pas passivement. La grammaire est dans l\'**objet** — le mauvais collocataire = signal immédiat d\'erreur de registre.',
    bodyEn:
      '保持 (bǎochí) = KEEP a state (quality, level). 保持安静 (stay silent), 保持联系 (stay in touch). Most universal. 维持 (wéichí) = MAINTAIN despite difficulty (active effort). 维持秩序 (maintain order), 维持生活 (sustain livelihood). Connotes EFFORT to prevent collapse. 维护 (wéihù) = PROTECT, actively defend. 维护权利 (defend rights), 维护和平 (defend peace). Connotes DEFENSE against threat. Hierarchy: 保持 (stable state) < 维持 (active anti-collapse effort) < 维护 (defense vs threat). Classic mistake: 保持权利 ✗ → 维护权利 ✓ (rights DEFENDED, not passively kept).',
    items: [
      { hanzi: '保持', pinyin: 'bǎo chí', meaning: 'maintenir, garder', meaningEn: 'keep, maintain', audio: 'audio/hsk4/hsk4_保持.wav' },
      { hanzi: '维持', pinyin: 'wéi chí', meaning: 'maintenir (effort)', meaningEn: 'sustain (effort)', audio: 'audio/hsk5/hsk5_维持.wav' },
      { hanzi: '维护', pinyin: 'wéi hù', meaning: 'défendre, protéger', meaningEn: 'defend', audio: 'audio/hsk5/hsk5_维护.wav' },
      { hanzi: '秩序', pinyin: 'zhì xù', meaning: 'ordre', meaningEn: 'order', audio: 'audio/hsk5/hsk5_秩序.wav' },
      { hanzi: '权利', pinyin: 'quán lì', meaning: 'droit', meaningEn: 'right', audio: 'audio/hsk5/hsk5_权利.wav' }
    ],
    tip:
      'Mémoriser : 保持 + état (安静/联系/健康), 维持 + ordre/vie (秩序/生活/纪律), 维护 + valeur (权利/和平/利益). La grammaire est dans l\'objet. Le mauvais collocataire = signal immédiat d\'erreur.',
    tipEn:
      'Memorize: 保持 + state (安静/联系/健康), 维持 + order/life (秩序/生活/纪律), 维护 + value (权利/和平/利益). The grammar is in the object. Wrong collocator = immediate error signal.'
  },
  {
    id: 'c12-pohuai-cuihui',
    title: '破坏 vs 摧毁 vs 损害 — détruire (intensité)',
    titleEn: '破坏 vs 摧毁 vs 损害 — destroy (intensity)',
    body:
      'Trois verbes de destruction ordonnés **par intensité** : préjudice partiel → destruction normale → anéantissement total.\n' +
      '\n' +
      'Hiérarchie d\'intensité :\n' +
      '- 损害 (sǔnhài) — **nuire à, porter préjudice** (effet sur valeur, intérêt). 损害健康, 损害利益\n' +
      '- 破坏 (pòhuài) — **détruire / endommager** (universel, souvent réversible). 破坏环境, 破坏关系\n' +
      '- 摧毁 (cuīhuǐ) — **détruire totalement** (raser, anéantir, irréversible). 摧毁建筑, 摧毁信心\n' +
      '\n' +
      'RÈGLE D\'OR : en éditorial / juridique, le choix lexical signale ta **précision**. « 这政策损害了消费者利益 » (préjudice) est juste ; « 摧毁消费者 » serait absurde — les consommateurs ne sont pas anéantis physiquement. Le bon registre = crédibilité.',
    bodyEn:
      '破坏 (pòhuài) = DESTROY / damage (most universal). 破坏环境 (destroy the environment), 破坏关系 (break a relationship). Often reversible. 摧毁 (cuīhuǐ) = COMPLETELY DESTROY (erase, raze). 摧毁建筑 (raze a building), 摧毁信心 (annihilate confidence). Irreversible, brutal. 损害 (sǔnhài) = HARM, prejudice (effect on value, interest). 损害健康 (harm health), 损害利益 (harm interests). Connotes PREJUDICE rather than physical destruction. Hierarchy: 损害 (partial prejudice) < 破坏 (normal destruction) < 摧毁 (total destruction).',
    items: [
      { hanzi: '破坏', pinyin: 'pò huài', meaning: 'détruire, endommager', meaningEn: 'destroy, damage', audio: 'audio/hsk5/hsk5_破坏.wav' },
      { hanzi: '摧毁', pinyin: 'cuī huǐ', meaning: 'anéantir', meaningEn: 'annihilate', audio: 'audio/hsk6/hsk6_摧毁.wav' },
      { hanzi: '损害', pinyin: 'sǔn hài', meaning: 'nuire à', meaningEn: 'harm', audio: 'audio/hsk6/hsk6_损害.wav' },
      { hanzi: '建筑', pinyin: 'jiàn zhù', meaning: 'bâtiment', meaningEn: 'building', audio: 'audio/hsk5/hsk5_建筑.wav' },
      { hanzi: '利益', pinyin: 'lì yì', meaning: 'intérêt', meaningEn: 'interest', audio: 'audio/hsk5/hsk5_利益.wav' }
    ],
    tip:
      'En éditorial / juridique, choisir le bon mot signale ta précision. « 这政策损害了消费者利益 » (préjudice) est juste ; « 摧毁消费者 » serait absurde (consommateurs pas anéantis physiquement). Le bon registre = crédibilité.',
    tipEn:
      'In op-eds / legal, the right word signals precision. «这政策损害了消费者利益» (prejudice) is right; «摧毁消费者» would be absurd (consumers aren\'t physically annihilated). Right register = credibility.'
  }
];

export const c12NuancesM3LearnSections: LessonV2LearnSection[] = [
  {
    id: 'c12-tichu-tichang',
    title: '提出 vs 提倡 vs 提升 — soulever, prôner, améliorer',
    titleEn: '提出 vs 提倡 vs 提升 — raise, advocate, elevate',
    body:
      'Trois verbes en **提 + composant** qui changent radicalement de sens : neutre, moral, quantitatif. Confusion fréquente, registre exigeant.\n' +
      '\n' +
      'Distinctions et collocations :\n' +
      '- 提出 (tíchū) — **soulever / proposer** une idée, question (neutre). 提出建议, 提出问题\n' +
      '- 提倡 (tíchàng) — **prôner, encourager** un comportement / une valeur (moral, social). 提倡环保, 提倡阅读\n' +
      '- 提升 (tíshēng) — **élever** un niveau, une position (progression quantifiable). 提升能力, 提升地位\n' +
      '\n' +
      'RÈGLE D\'OR : test rapide — *soulever une idée* → 提出 ; *encourager un comportement* → 提倡 ; *augmenter un niveau* → 提升. Combo CV chinois C1 : **提升团队的执行能力** (verbe-clé du leadership chinois, dans 90% des CV cadres).',
    bodyEn:
      '提出 (tíchū) = RAISE / propose (idea, question). 提出建议 / 提出问题. Neutral act of putting forward. 提倡 (tíchàng) = ADVOCATE, encourage (a behavior / value). 提倡环保 (advocate environmental protection), 提倡阅读. MORAL / SOCIAL connotation. 提升 (tíshēng) = ELEVATE (level, position). 提升能力 / 提升地位. Connotation of QUANTIFIABLE progression. Test: «raise an idea» → 提出; «encourage a behavior» → 提倡; «raise a level» → 提升. Three verbs in 提 + component that radically change meaning.',
    items: [
      { hanzi: '提出', pinyin: 'tí chū', meaning: 'soulever, proposer', meaningEn: 'raise, put forward', audio: 'audio/hsk4/hsk4_提出.wav' },
      { hanzi: '提倡', pinyin: 'tí chàng', meaning: 'prôner', meaningEn: 'advocate', audio: 'audio/hsk5/hsk5_提倡.wav' },
      { hanzi: '提升', pinyin: 'tí shēng', meaning: 'élever', meaningEn: 'elevate', audio: 'audio/hsk5/hsk5_提升.wav' },
      { hanzi: '环保', pinyin: 'huán bǎo', meaning: 'protection de l\'env.', meaningEn: 'env. protection', audio: 'audio/hsk5/hsk5_环保.wav' },
      { hanzi: '能力', pinyin: 'néng lì', meaning: 'capacité', meaningEn: 'ability', audio: 'audio/hsk4/hsk4_能力.wav' }
    ],
    tip:
      'Combo CV chinois C1 : « 提升团队的执行能力 » (élever la capacité d\'exécution de l\'équipe). Verbe-clé du leadership chinois. Apparaît dans 90% des CV cadres.',
    tipEn:
      'C1 Chinese CV combo: «提升团队的执行能力» (elevate the team\'s execution ability). Chinese leadership keyword. Appears in 90% of executive CVs.'
  },
  {
    id: 'c12-zuoyong-gongneng',
    title: '功能 vs 功用 vs 用途 — fonction, utilité, usage',
    titleEn: '功能 vs 功用 vs 用途 — function, utility, purpose',
    body:
      'Trois mots pour « fonction » qu\'on distingue selon **la perspective** : capacité technique, utilité d\'un outil, ou destination d\'emploi.\n' +
      '\n' +
      'Distinctions et collocations :\n' +
      '- 功能 (gōngnéng) — **fonctionnalité** technique (ce qu\'il peut faire). 这部手机有很多功能\n' +
      '- 功用 (gōngyòng) — **utilité** pratique d\'un outil/méthode (à quoi ça sert). 这种药的功用是 X\n' +
      '- 用途 (yòngtú) — **usage / destination** (catégorie d\'emploi). 这房间的用途是 X\n' +
      '\n' +
      'Test rapide :\n' +
      '- « il a 5 X » → **功能**\n' +
      '- « son X est de soigner » → **功用**\n' +
      '- « son X est résidentiel » → **用途**\n' +
      '\n' +
      'En description produit chinoise : **多功能 + 多用途** = combo marketing classique. 多功能 = peut faire X choses, 多用途 = peut être utilisé dans X contextes.',
    bodyEn:
      '功能 (gōngnéng) = FUNCTIONALITY of an object/system (what it CAN DO). 这部手机有很多功能 (this phone has many functions). Concrete, technical. 功用 (gōngyòng) = practical UTILITY of a TOOL or method (what it\'s FOR). 这种药的功用是 X (this drug\'s use is X). More formal. 用途 (yòngtú) = USAGE / DESTINATION (what it\'s used for). 这房间的用途是 X (this room\'s use is X). Connotes USE CATEGORY. Hierarchy: 功能 (multiple capabilities) ≠ 功用 (specific utility) ≠ 用途 (destination/category). Test: «it has 5 X» → 功能; «its X is to heal» → 功用; «its X is residential» → 用途.',
    items: [
      { hanzi: '功能', pinyin: 'gōng néng', meaning: 'fonctionnalité', meaningEn: 'functionality', audio: 'audio/hsk5/hsk5_功能.wav' },
      { hanzi: '功用', pinyin: 'gōng yòng', meaning: 'utilité', meaningEn: 'utility', audio: 'audio/hsk6/hsk6_功用.wav' },
      { hanzi: '用途', pinyin: 'yòng tú', meaning: 'usage, destination', meaningEn: 'use, purpose', audio: 'audio/hsk5/hsk5_用途.wav' },
      { hanzi: '系统', pinyin: 'xì tǒng', meaning: 'système', meaningEn: 'system', audio: 'audio/hsk4/hsk4_系统.wav' },
      { hanzi: '药', pinyin: 'yào', meaning: 'médicament', meaningEn: 'medicine', audio: 'audio/hsk2/hsk2_药.wav' }
    ],
    tip:
      'En description produit chinoise : « 多功能 + 多用途 » (multifonction + multi-usage) = combo marketing classique. À ne pas confondre — 多功能 = peut faire X choses, 多用途 = peut être utilisé dans X contextes.',
    tipEn:
      'In Chinese product descriptions: «多功能 + 多用途» (multi-function + multi-purpose) = classic marketing combo. Don\'t confuse — 多功能 = can do X things, 多用途 = can be used in X contexts.'
  }
];

export const c12NuancesM4LearnSections: LessonV2LearnSection[] = [
  {
    id: 'c12-rongyi-bianjie',
    title: '便利 vs 方便 vs 便捷 — pratique (registre)',
    titleEn: '便利 vs 方便 vs 便捷 — convenient (register)',
    body:
      'Trois mots pour « pratique / commode » qui s\'ordonnent **par registre** : oral universel → service écrit → tech rapide.\n' +
      '\n' +
      'Distinctions et collocations :\n' +
      '- 方便 (fāngbiàn) — **pratique / commode** (universel, oral + écrit). 这里很方便\n' +
      '- 便利 (biànlì) — **commodité** comme service / installation. 便利店, 提供便利\n' +
      '- 便捷 (biànjié) — **pratique ET rapide** (combo commodité + efficacité). 便捷的支付方式\n' +
      '\n' +
      'En 2026, 便捷 est devenu le **mot-clé du marketing digital** chinois (fintech, paiement, e-commerce).\n' +
      '\n' +
      'Attention : 方便 est aussi un **euphémisme** pour aller aux toilettes (我去方便一下). « 您方便一下 » est ambigu — préfère **您方便的时候 + 联系我** pour dire « quand ça vous arrange ».',
    bodyEn:
      '方便 (fāngbiàn) = CONVENIENT / handy (most universal, oral and written). 这里很方便 / 您方便吗？. Broadest. Also: 方便 = euphemism for going to toilet (mafan: 我去方便一下). 便利 (biànlì) = CONVENIENCE (noun: a convenient service / facility). 便利店 (convenience store), 提供便利. More written/marketing. 便捷 (biànjié) = CONVENIENT AND FAST (combines convenience + efficiency). 便捷的支付方式 (convenient and fast payment method). Connotes TECHNOLOGY / digital. Hierarchy: 方便 (universal) < 便利 (convenience service) < 便捷 (fast+convenient tech). In 2026, 便捷 has become the Chinese digital marketing keyword.',
    items: [
      { hanzi: '方便', pinyin: 'fāng biàn', meaning: 'pratique', meaningEn: 'convenient', audio: 'audio/hsk2/hsk2_方便.wav' },
      { hanzi: '便利', pinyin: 'biàn lì', meaning: 'commodité', meaningEn: 'convenience', audio: 'audio/hsk5/hsk5_便利.wav' },
      { hanzi: '便捷', pinyin: 'biàn jié', meaning: 'pratique et rapide', meaningEn: 'convenient & fast', audio: 'audio/hsk6/hsk6_便捷.wav' },
      { hanzi: '便利店', pinyin: 'biàn lì diàn', meaning: 'convenience store', meaningEn: 'convenience store', audio: 'audio/hsk5/hsk5_便利店.wav' },
      { hanzi: '支付', pinyin: 'zhī fù', meaning: 'paiement', meaningEn: 'payment', audio: 'audio/hsk6/hsk6_支付.wav' }
    ],
    tip:
      'PIÈGE social : « 您方便的时候 » (quand ça vous arrange) est utile en pro. MAIS « 您方便一下 » (faites-vous une commodité) est ambigu et peut sonner comme aller aux toilettes. Préfère « 您方便的时候 + 联系我 » pour éviter le malentendu.',
    tipEn:
      'Social TRAP: «您方便的时候» (when it suits you) is useful in pro. BUT «您方便一下» (do yourself a convenience) is ambiguous and can sound like going to the toilet. Prefer «您方便的时候 + 联系我» to avoid misunderstanding.'
  },
  {
    id: 'c12-pingju-yiju',
    title: '依据 vs 凭借 vs 依靠 — sur la base de, grâce à',
    titleEn: '依据 vs 凭借 vs 依靠 — based on, by virtue of, rely on',
    body:
      'Trois expressions causales distinctes par **nature de l\'appui** : référence formelle, atout personnel, soutien externe.\n' +
      '\n' +
      'Distinctions et collocations :\n' +
      '- 依据 (yījù) — **se baser sur** (fait, norme, règle). 依据法律 X — registre **formel / juridique**\n' +
      '- 凭借 (píngjiè) — **grâce à** un atout / compétence (instrument du succès). 凭借自己的能力, 凭借努力\n' +
      '- 依靠 (yīkào) — **compter sur** une personne / soutien (dépendance). 依靠父母, 依靠政府\n' +
      '\n' +
      'RÈGLE D\'OR : en CV ou entretien chinois, **凭借自己的努力** est culturellement très valorisé (vertu de l\'autonomie chinoise). Inverse : 依靠家人 sonne dépendant et faible. Pour un cadre, mets en avant le **凭借** (mérite personnel) plutôt que le **依靠** (soutien externe).',
    bodyEn:
      '依据 (yījù) = BASED ON / refer to (a fact, norm, rule). 依据法律 X (per law X). More formal/legal. Often + reference noun. 凭借 (píngjiè) = BY VIRTUE OF (an asset, skill, quality). 凭借自己的能力 / 凭借努力. Connotes the instrument of success. More written. 依靠 (yīkào) = RELY ON / lean on (a person, support). 依靠父母 / 依靠政府. Connotes DEPENDENCE/support. More oral and emotional. Hierarchy: 依据 (formal reference) ≠ 凭借 (personal asset) ≠ 依靠 (dependent support). «凭借自己的努力获得成功» = thanks to own efforts (Chinese virtue of autonomy).',
    items: [
      { hanzi: '依据', pinyin: 'yī jù', meaning: 'sur la base de', meaningEn: 'based on', audio: 'audio/hsk6/hsk6_依据.wav' },
      { hanzi: '凭借', pinyin: 'píng jiè', meaning: 'grâce à', meaningEn: 'by virtue of', audio: 'audio/hsk6/hsk6_凭借.wav' },
      { hanzi: '依靠', pinyin: 'yī kào', meaning: 'compter sur', meaningEn: 'rely on', audio: 'audio/hsk5/hsk5_依靠.wav' },
      { hanzi: '法律', pinyin: 'fǎ lǜ', meaning: 'loi', meaningEn: 'law', audio: 'audio/hsk4/hsk4_法律.wav' },
      { hanzi: '努力', pinyin: 'nǔ lì', meaning: 'effort', meaningEn: 'effort', audio: 'audio/hsk3/hsk3_努力.wav' }
    ],
    tip:
      '« 凭借自己的努力 » est culturellement TRÈS valorisé en CV/entretien chinois. Inverse : « 依靠家人 » sonne dépendant et faible. Pour un cadre, toujours mettre en avant le 凭借 (mérite personnel) plutôt que le 依靠 (soutien externe).',
    tipEn:
      '«凭借自己的努力» is culturally VERY valued in Chinese CV/interviews. Opposite: «依靠家人» sounds dependent and weak. For an executive, always highlight 凭借 (personal merit) over 依靠 (external support).'
  }
];

export const c12NuancesM5LearnSections: LessonV2LearnSection[] = [
  {
    id: 'c12-jiansu-jianqing',
    title: '减少 vs 减轻 vs 削减 — réduire (intensité)',
    titleEn: '减少 vs 减轻 vs 削减 — reduce (intensity)',
    body:
      'Trois verbes de réduction ordonnés **par intensité émotionnelle** : alléger compatissant → réduire neutre → sabrer brutal.\n' +
      '\n' +
      'Distinctions et collocations :\n' +
      '- 减轻 (jiǎnqīng) — **alléger** (poids, douleur, fardeau). 减轻负担, 减轻痛苦 — connote le **soulagement**\n' +
      '- 减少 (jiǎnshǎo) — **réduire** en quantité (neutre). 减少污染, 减少开支\n' +
      '- 削减 (xuējiǎn) — **sabrer, couper drastiquement** (budgets, postes). 削减预算, 削减人员 — brutal, souvent **négatif**\n' +
      '\n' +
      'RÈGLE D\'OR : en éditorial économique, le choix lexical révèle l\'**intention politique**. Quand un dirigeant dit « 我们将削减预算 » au lieu de « 我们将减少预算 », il signale **fermeté** et choix difficile assumé. À écouter avec attention dans les conférences de presse.',
    bodyEn:
      '减少 (jiǎnshǎo) = REDUCE in quantity (most universal). 减少污染 / 减少开支. 减轻 (jiǎnqīng) = LIGHTEN (a weight, pain, burden). 减轻负担 (lighten the burden), 减轻痛苦 (relieve pain). Connotes RELIEF. 削减 (xuējiǎn) = SLASH, cut drastically (budgets, positions). 削减预算 (slash the budget), 削减人员 (cut staff). Brutal verb, often negative. Hierarchy: 减轻 (gentle alleviate) < 减少 (neutral reduce) < 削减 (brutal slash). In econ op-eds, 削减 marks austerity; 减轻 marks compassion; 减少 stays neutral/technical.',
    items: [
      { hanzi: '减少', pinyin: 'jiǎn shǎo', meaning: 'réduire', meaningEn: 'reduce', audio: 'audio/hsk4/hsk4_减少.wav' },
      { hanzi: '减轻', pinyin: 'jiǎn qīng', meaning: 'alléger', meaningEn: 'lighten', audio: 'audio/hsk5/hsk5_减轻.wav' },
      { hanzi: '削减', pinyin: 'xuē jiǎn', meaning: 'sabrer, couper', meaningEn: 'slash', audio: 'audio/hsk6/hsk6_削减.wav' },
      { hanzi: '负担', pinyin: 'fù dān', meaning: 'fardeau', meaningEn: 'burden', audio: 'audio/hsk5/hsk5_负担.wav' },
      { hanzi: '预算', pinyin: 'yù suàn', meaning: 'budget', meaningEn: 'budget', audio: 'audio/hsk5/hsk5_预算.wav' }
    ],
    tip:
      'Quand un dirigeant chinois dit « 我们将削减预算 » plutôt que « 我们将减少预算 », il signale FERMETÉ et choix difficile assumé. Le choix lexical révèle l\'intention politique. À écouter avec attention dans les conférences de presse.',
    tipEn:
      'When a Chinese leader says «我们将削减预算» rather than «我们将减少预算», he signals FIRMNESS and accepted hard choice. Lexical choice reveals political intent. Listen carefully in press conferences.'
  },
  {
    id: 'c12-zengjia-tigao',
    title: '增加 vs 提高 vs 增长 — augmenter (qui/quoi/comment)',
    titleEn: '增加 vs 提高 vs 增长 — increase (who/what/how)',
    body:
      'Trois verbes pour « augmenter » distincts par **la nature de la variation** : quantité ponctuelle, niveau qualitatif, croissance continue.\n' +
      '\n' +
      'Distinctions et collocations canoniques :\n' +
      '- 增加 (zēngjiā) — augmenter une **quantité** (nombre, somme). 增加人手, 增加预算\n' +
      '- 提高 (tígāo) — élever un **niveau** (qualité, capacité, prix). 提高效率, 提高价格, 提高生活质量\n' +
      '- 增长 (zēngzhǎng) — **croître** continûment dans le temps (économique, démographique). 经济增长, 人口增长\n' +
      '\n' +
      'Attention : erreur **提高人口 ✗ → 增长人口 ✓** (ou 增加人口 ✓). La population a une *croissance*, pas une qualité élevée.\n' +
      '\n' +
      'RÈGLE D\'OR : 3 collocations C1 à mémoriser comme **trio inséparable** — 增加预算 (quantité), 提高效率 (niveau), 经济增长 (continue). Une erreur sur l\'un = erreur grave de registre.',
    bodyEn:
      '增加 (zēngjiā) = INCREASE a QUANTITY (number, sum). 增加人手 / 增加预算. Most universal quantitative. 提高 (tígāo) = RAISE A LEVEL (quality, capacity, price). 提高效率 / 提高价格 / 提高生活质量. On the qualitative scale. 增长 (zēngzhǎng) = GROW continuously over time (economic, demographic). 经济增长 / 人口增长. Connotes SUSTAINED progression. Hierarchy: 增加 (one-off quantity) ≠ 提高 (qualitative level) ≠ 增长 (continuous growth). Mistake: 提高人口 ✗ → 增长人口 ✓ or 增加人口 ✓. Population has GROWTH, not raised quality.',
    items: [
      { hanzi: '增加', pinyin: 'zēng jiā', meaning: 'augmenter (quantité)', meaningEn: 'increase (quantity)', audio: 'audio/hsk4/hsk4_增加.wav' },
      { hanzi: '提高', pinyin: 'tí gāo', meaning: 'élever (niveau)', meaningEn: 'raise (level)', audio: 'audio/hsk3/hsk3_提高.wav' },
      { hanzi: '增长', pinyin: 'zēng zhǎng', meaning: 'croître (continu)', meaningEn: 'grow (continuous)', audio: 'audio/hsk5/hsk5_增长.wav' },
      { hanzi: '效率', pinyin: 'xiào lǜ', meaning: 'efficacité', meaningEn: 'efficiency', audio: 'audio/hsk5/hsk5_效率.wav' },
      { hanzi: '人口', pinyin: 'rén kǒu', meaning: 'population', meaningEn: 'population', audio: 'audio/hsk4/hsk4_人口.wav' }
    ],
    tip:
      '3 collocations C1 à mémoriser comme un trio inséparable : 增加预算 (augmenter le budget — quantité), 提高效率 (améliorer l\'efficacité — niveau), 经济增长 (croissance économique — continue). Erreur de l\'un = erreur grave de niveau.',
    tipEn:
      '3 C1 collocations to memorize as inseparable trio: 增加预算 (increase budget — quantity), 提高效率 (raise efficiency — level), 经济增长 (economic growth — continuous). Mistake on any = serious level error.'
  }
];

export const c12NuancesM6LearnSections: LessonV2LearnSection[] = [
  {
    id: 'c12-laiwang-wanglai',
    title: '来往 vs 往来 vs 交往 — fréquentation, échanges',
    titleEn: '来往 vs 往来 vs 交往 — interaction, exchanges',
    body:
      'Trois mots construits sur les mêmes caractères 来 + 往 / 交, mais distincts par **registre et nature** de l\'interaction.\n' +
      '\n' +
      'Distinctions et collocations :\n' +
      '- 来往 (láiwǎng) — **aller et venir** (mouvement physique ou contact). 街上来往的人很多, 我和他没有来往\n' +
      '- 交往 (jiāowǎng) — **fréquentation sociale suivie** (durée). 他们交往多年\n' +
      '- 往来 (wǎnglái) — **échanges formels** (commercial / diplomatique). 商业往来, 国家间的往来\n' +
      '\n' +
      'Attention : **ambiguïté romantique**. « 我们在交往 » = on sort ensemble (officiellement en couple). Pour dire « on se voit / on est en contact », préfère **我们有联系** ou **我们经常见面**. 交往 + une personne = couple ; + un groupe = fréquentation neutre.',
    bodyEn:
      '来往 (láiwǎng) = COME AND GO (physical movement OR social contact). 街上来往的人很多 (many people coming and going on the street). 我和他没有来往 = I have no contact with him. 往来 (wǎnglái) = EXCHANGES (formal, especially commercial / diplomatic). 商业往来 (commercial relations), 国家间的往来 (inter-state exchanges). More formal. 交往 (jiāowǎng) = social INTERACTION, sustained RELATIONSHIP (with idea of DURATION). 他们交往多年 (they\'ve interacted for years). Also: 交往 = dating someone (couple). Hierarchy: 来往 (movement / occasional contact) < 交往 (sustained relationship) < 往来 (formal commercial/diplomatic).',
    items: [
      { hanzi: '来往', pinyin: 'lái wǎng', meaning: 'aller et venir', meaningEn: 'come and go', audio: 'audio/hsk4/hsk4_来往.wav' },
      { hanzi: '往来', pinyin: 'wǎng lái', meaning: 'échanges (formel)', meaningEn: 'exchanges (formal)', audio: 'audio/hsk6/hsk6_往来.wav' },
      { hanzi: '交往', pinyin: 'jiāo wǎng', meaning: 'fréquenter', meaningEn: 'interact, date', audio: 'audio/hsk5/hsk5_交往.wav' },
      { hanzi: '商业', pinyin: 'shāng yè', meaning: 'commercial', meaningEn: 'commercial', audio: 'audio/hsk5/hsk5_商业.wav' },
      { hanzi: '国家', pinyin: 'guó jiā', meaning: 'pays', meaningEn: 'country', audio: 'audio/hsk2/hsk2_国家.wav' }
    ],
    tip:
      'AMBIGUÏTÉ ROMANTIQUE : « 我们在交往 » = on sort ensemble (officiellement en couple). Si tu veux dire « on se voit / on est en contact », préfère « 我们有联系 » ou « 我们经常见面 ». 交往 vis-à-vis d\'une personne = couple, vis-à-vis d\'un groupe = fréquentation neutre.',
    tipEn:
      'ROMANTIC AMBIGUITY: «我们在交往» = we\'re dating (officially a couple). To say «we\'re in touch / we see each other», prefer «我们有联系» or «我们经常见面». 交往 toward one person = couple, toward a group = neutral interaction.'
  },
  {
    id: 'c12-jingji-jingli',
    title: '经历 vs 经验 vs 阅历 — expérience (3 dimensions)',
    titleEn: '经历 vs 经验 vs 阅历 — experience (3 dimensions)',
    body:
      'Trois mots pour « expérience » distincts par **dimension** : événement vécu, savoir-faire pro, sagesse de vie.\n' +
      '\n' +
      'Distinctions et collocations :\n' +
      '- 经历 (jīnglì) — **expérience vécue** (événements traversés). 这是一段难忘的经历\n' +
      '- 经验 (jīngyàn) — **expérience accumulée** (savoir-faire pro). 我有 5 年的经验\n' +
      '- 阅历 (yuèlì) — **expérience de la vie** (sagesse, recul). 他阅历丰富\n' +
      '\n' +
      'Le 阅历 est **plus écrit, plus noble** — il connote la sagesse accumulée par le vécu large, pas seulement professionnel.\n' +
      '\n' +
      'RÈGLE D\'OR : compliment **soutenu** pour un senior chinois — **您阅历丰富，希望能给我一些指点**. 阅历 reconnaît la *sagesse* et pas seulement la pro — flatte un senior beaucoup mieux que 经验.',
    bodyEn:
      '经历 (jīnglì) = LIVED EXPERIENCE (events traversed). 这是一段难忘的经历 (this was an unforgettable experience). Concrete, EVENTUAL. Verb: have lived through. 经验 (jīngyàn) = ACCUMULATED EXPERIENCE (know-how). 我有 5 年的经验 (I have 5 years of experience). Professional competence. 阅历 (yuèlì) = LIFE EXPERIENCE (wisdom, perspective, worldly knowledge). 他阅历丰富 (he has lived much, has perspective). More written, nobler. Connotes WISDOM accumulated through life, not just pro. Hierarchy: 经历 (lived event) < 经验 (pro know-how) < 阅历 (broad life wisdom).',
    items: [
      { hanzi: '经历', pinyin: 'jīng lì', meaning: 'vivre (expérience)', meaningEn: 'undergo, experience', audio: 'audio/hsk4/hsk4_经历.wav' },
      { hanzi: '经验', pinyin: 'jīng yàn', meaning: 'expérience pro', meaningEn: 'experience (pro)', audio: 'audio/hsk3/hsk3_经验.wav' },
      { hanzi: '阅历', pinyin: 'yuè lì', meaning: 'expérience de la vie', meaningEn: 'life experience', audio: 'audio/hsk6/hsk6_阅历.wav' },
      { hanzi: '难忘', pinyin: 'nán wàng', meaning: 'inoubliable', meaningEn: 'unforgettable', audio: 'audio/hsk5/hsk5_难忘.wav' },
      { hanzi: '丰富', pinyin: 'fēng fù', meaning: 'riche, abondant', meaningEn: 'rich, abundant', audio: 'audio/hsk4/hsk4_丰富.wav' }
    ],
    tip:
      'Compliment soutenu pour un senior chinois : « 您阅历丰富，希望能给我一些指点 » (votre expérience de vie est riche, j\'espère vos conseils). 阅历 reconnaît la SAGESSE et pas seulement la pro — flatte un senior beaucoup mieux que 经验.',
    tipEn:
      'Formal compliment for a Chinese senior: «您阅历丰富，希望能给我一些指点» (your life experience is rich, I hope for your guidance). 阅历 recognizes WISDOM not just pro — flatters a senior far better than 经验.'
  }
];

export const c12NuancesM7LearnSections: LessonV2LearnSection[] = [
  {
    id: 'c12-pingzhi-zhiliang',
    title: '品质 vs 质量 vs 素质 — qualité (objet/produit/personne)',
    titleEn: '品质 vs 质量 vs 素质 — quality (object/product/person)',
    body:
      'Trois mots pour « qualité » distincts par **objet visé** : matériel d\'un produit, noble d\'un objet ou caractère, civique d\'une personne.\n' +
      '\n' +
      'Distinctions et collocations :\n' +
      '- 质量 (zhìliàng) — qualité **matérielle** (produit, ouvrage). 这件衣服质量很好\n' +
      '- 品质 (pǐnzhì) — qualité **intrinsèque / morale** (objet noble ou caractère). 高品质的产品, 优秀的品质\n' +
      '- 素质 (sùzhì) — qualité **humaine / civique** (éducation, comportement). 国民素质, 提高素质\n' +
      '\n' +
      'Attention : erreur **这个人质量好 ✗ → 这个人素质高 ✓**. La qualité humaine est **素质**, jamais 质量.\n' +
      '\n' +
      '« 国民素质 » est un concept **très débattu** en Chine — il englobe éducation, politesse, comportement public. Dans une discussion sociale, dire « 我们需要提高素质 » est socialement noble et engageant.',
    bodyEn:
      '质量 (zhìliàng) = MATERIAL QUALITY (product, work). 这件衣服质量很好 (this shirt is good quality). Most universal for an object/product. 品质 (pǐnzhì) = INTRINSIC / moral QUALITY (noble object OR human character). 高品质的产品 (premium product), 优秀的品质 (excellent moral qualities). More marketing/moral. 素质 (sùzhì) = HUMAN QUALITY (education, civic behavior). 国民素质 (citizens\' civic quality), 提高素质. Connotes SOCIAL/CIVIC LEVEL. Hierarchy: 质量 (material) < 品质 (noble object/morality) < 素质 (human civic). Mistake: 这个人质量好 ✗ → 这个人素质高 ✓ (human quality is 素质).',
    items: [
      { hanzi: '质量', pinyin: 'zhì liàng', meaning: 'qualité (matériel)', meaningEn: 'quality (material)', audio: 'audio/hsk3/hsk3_质量.wav' },
      { hanzi: '品质', pinyin: 'pǐn zhì', meaning: 'qualité (noble)', meaningEn: 'quality (noble)', audio: 'audio/hsk6/hsk6_品质.wav' },
      { hanzi: '素质', pinyin: 'sù zhì', meaning: 'qualité (humaine)', meaningEn: 'human quality', audio: 'audio/hsk5/hsk5_素质.wav' },
      { hanzi: '产品', pinyin: 'chǎn pǐn', meaning: 'produit', meaningEn: 'product', audio: 'audio/hsk4/hsk4_产品.wav' },
      { hanzi: '国民', pinyin: 'guó mín', meaning: 'citoyen', meaningEn: 'citizen', audio: 'audio/hsk6/hsk6_国民.wav' }
    ],
    tip:
      '« 国民素质 » est un concept TRÈS débattu en Chine — il englobe éducation, politesse, comportement public. Dans une discussion sociale, dire « 我们需要提高素质 » est socialement NOBLE et engageant. Apprends ce mot — il revient partout dans le débat civique.',
    tipEn:
      '«国民素质» is a HEAVILY-debated concept in China — it covers education, politeness, public behavior. In a social discussion, saying «我们需要提高素质» is socially NOBLE and engaging. Learn this word — it comes up everywhere in civic debate.'
  },
  {
    id: 'c12-shangwei-shaowei',
    title: '丝毫 vs 毫无 vs 一点 — un peu / pas du tout (nuances)',
    titleEn: '丝毫 vs 毫无 vs 一点 — slightly / not at all (nuances)',
    body:
      'Trois quantifieurs « un peu / pas du tout » ordonnés **par intensité et registre** : neutre oral → insistant écrit → absolu abstrait.\n' +
      '\n' +
      'Distinctions et usages :\n' +
      '- 一点 (yìdiǎn) — **un peu** neutre (oral + écrit). 我有一点累 ; en négatif : 一点也不累\n' +
      '- 丝毫 (sīháo) — **le moindre** (presque toujours négatif, écrit). 我没有丝毫的怀疑\n' +
      '- 毫无 (háowú) — **n\'avoir pas du tout** (négation absolue, écrit). 毫无道理, 毫无希望\n' +
      '\n' +
      'Construction : **毫无 + nom abstrait** (道理, 希望, 根据, 说服力).\n' +
      '\n' +
      'RÈGLE D\'OR : en écrit C1+, **毫无** et **丝毫** marquent la maîtrise lexicale du **soutenu**. Pour réfuter en débat : « 您的论点毫无说服力 » (votre argument n\'a aucune force de conviction) — combo percutant pour démolir sans insulter.',
    bodyEn:
      '一点 (yìdiǎn) = a little (NEUTRAL, oral and written). 我有一点累. Also negative: 一点也不累 = not at all tired. Universal. 丝毫 (sīháo) = THE SLIGHTEST (almost always NEGATIVE, written). 我没有丝毫的怀疑 = I have not the SLIGHTEST doubt. More emphatic than 一点. 毫无 (háowú) = HAVE NONE AT ALL (absolute negation, written). 毫无道理 (makes no sense), 毫无希望 (without any hope). 毫无 + abstract noun. Hierarchy: 一点 (neutral oral) < 丝毫 (emphatic written, mostly negative) < 毫无 (absolute, abstract). In C1+ writing, 毫无 and 丝毫 mark formal-register lexical mastery.',
    items: [
      { hanzi: '一点', pinyin: 'yì diǎn', meaning: 'un peu', meaningEn: 'a little', audio: 'audio/hsk1/hsk1_一点.wav' },
      { hanzi: '丝毫', pinyin: 'sī háo', meaning: 'le moindre', meaningEn: 'the slightest', audio: 'audio/hsk6/hsk6_丝毫.wav' },
      { hanzi: '毫无', pinyin: 'háo wú', meaning: 'aucun(e) (absolu)', meaningEn: 'none at all', audio: 'audio/hsk6/hsk6_毫无.wav' },
      { hanzi: '怀疑', pinyin: 'huái yí', meaning: 'douter', meaningEn: 'doubt', audio: 'audio/hsk4/hsk4_怀疑.wav' },
      { hanzi: '道理', pinyin: 'dào lǐ', meaning: 'raison, sens', meaningEn: 'reason, sense', audio: 'audio/hsk4/hsk4_道理.wav' }
    ],
    tip:
      'Pour réfuter en débat C1+ : « 您的论点毫无说服力 » (votre argument n\'a AUCUNE force de conviction). 毫无 + 说服力/根据/道理 = combo percutant pour démolir un opposant SANS l\'insulter directement.',
    tipEn:
      'To refute in C1+ debate: «您的论点毫无说服力» (your argument has NO persuasive force). 毫无 + 说服力/根据/道理 = punchy combo to demolish an opponent WITHOUT direct insult.'
  }
];

// === HISTORICAL C1.2 PARCOURS — chengyu-advanced / business / education / law ===

// --- chengyu-advanced -------------------------------------------------------

export const c12ChengyuAdvancedM1LearnSections: LessonV2LearnSection[] = [
  {
    id: 'c12-three-kingdoms-recits',
    title: '三顾茅庐 + 桃园结义 — récits fondateurs',
    titleEn: '三顾茅庐 + 桃园结义 — founding tales',
    body:
      'Deux chéngyǔ issus des **Trois Royaumes**, devenus des piliers du registre soutenu : l\'un sur le recrutement, l\'autre sur l\'amitié indéfectible.\n' +
      '\n' +
      'Les deux récits fondateurs :\n' +
      '- **三顾茅庐** (sāngùmáolú, « 3 visites à la chaumière ») — Liu Bei vient 3 fois recruter le sage reclus Zhuge Liang ; à la 3e, il attend des heures dans la neige. Sens moderne : **recruter avec persévérance et humilité**\n' +
      '- **桃园结义** (táoyuánjiéyì, « serment du verger de pêchers ») — Liu Bei, Guan Yu et Zhang Fei jurent fraternité de sang dans un verger en fleurs. Sens : **modèle de l\'amitié indéfectible**\n' +
      '\n' +
      'Usages **idiomatiques** modernes :\n' +
      '- 我们要有三顾茅庐的精神 — il nous faut cet esprit d\'insistance respectueuse (recrutement)\n' +
      '- 我们桃园结义 — compliment fort sur un lien d\'amitié\n' +
      '\n' +
      'RÈGLE D\'OR : pour recruter un talent rare, dire **我会三顾茅庐** signale immédiatement que tu connais la culture chinoise du recrutement basée sur l\'**insistance respectueuse**.',
    bodyEn:
      '三顾茅庐 («3 visits to the cottage»): Liu Bei, hearing of the reclusive genius 诸葛亮, comes 3 times to his hut. The first 2 times the sage is absent. The 3rd, Liu Bei waits hours in the snow. Moved, Zhuge Liang agrees to become his strategist. Modern sense: RECRUIT with perseverance and humility. Phrase: 我们要有三顾茅庐的精神 («we need the 3-visits spirit»). 桃园结义 («peach garden oath»): Liu Bei, Guan Yu and Zhang Fei swear blood brotherhood in a flowering orchard. Model of UNBREAKABLE FRIENDSHIP. If 2 Chinese friends say «我们桃园结义», it\'s a strong compliment on their bond.',
    items: [
      { hanzi: '三顾茅庐', pinyin: 'sān gù máo lú', meaning: '3 visites pour recruter', meaningEn: '3 humble visits', audio: 'audio/hsk6/hsk6_三顾.wav' },
      { hanzi: '桃园结义', pinyin: 'táo yuán jié yì', meaning: 'fraternité jurée', meaningEn: 'sworn brotherhood', audio: 'audio/hsk6/hsk6_桃园.wav' },
      { hanzi: '诸葛亮', pinyin: 'zhū gě liàng', meaning: 'Zhuge Liang (stratège)', meaningEn: 'Zhuge Liang', audio: 'audio/hsk6/hsk6_诸葛.wav' },
      { hanzi: '刘备', pinyin: 'liú bèi', meaning: 'Liu Bei (empereur Shu)', meaningEn: 'Liu Bei', audio: 'audio/hsk6/hsk6_刘备.wav' },
      { hanzi: '精神', pinyin: 'jīng shén', meaning: 'esprit, état d\'esprit', meaningEn: 'spirit', audio: 'audio/hsk4/hsk4_精神.wav' }
    ],
    tip:
      'Pour recruter un talent rare, dis : « 我会三顾茅庐 ». Tu signales que tu prends la chasse au sérieux. Le candidat sait que tu connais la culture chinoise du recrutement basée sur l\'INSISTANCE respectueuse. Effet immédiat sur l\'engagement de ton interlocuteur.',
    tipEn:
      'To recruit a rare talent, say: «我会三顾茅庐». You signal you take the hunt seriously. The candidate knows you understand the Chinese recruitment culture based on RESPECTFUL insistence. Immediate effect on your interlocutor\'s engagement.'
  },
  {
    id: 'c12-three-kingdoms-strategie',
    title: '望梅止渴 + 草船借箭 — ruses légendaires',
    titleEn: '望梅止渴 + 草船借箭 — legendary tricks',
    body:
      'Deux chéngyǔ de stratégie issus des **Trois Royaumes**, l\'un sur l\'illusion qui maintient en marche, l\'autre sur la ruse qui retourne l\'adversaire.\n' +
      '\n' +
      'Les deux récits stratégiques :\n' +
      '- **望梅止渴** (wàngméizhǐkě, « voir les prunes pour apaiser la soif ») — Cao Cao promet à ses troupes assoiffées un verger derrière la colline ; la salivation les fait tenir. Sens : **consolation illusoire**\n' +
      '- **草船借箭** (cǎochuánjièjiàn, « emprunter des flèches avec des bateaux de paille ») — Zhuge Liang envoie de nuit des bateaux couverts de paille vers le camp ennemi qui tire des milliers de flèches dans la paille. Sens : **ruse géniale qui retourne les ressources de l\'adversaire**\n' +
      '\n' +
      'Usages modernes :\n' +
      '- 这只是望梅止渴 — c\'est juste se mentir à soi-même\n' +
      '- 这是现代版的草船借箭 — c\'est un草船借箭 moderne (pour décrire un pivot entrepreneurial intelligent)\n' +
      '\n' +
      'RÈGLE D\'OR : 草船借箭 est **adoré des entrepreneurs chinois**. L\'utiliser pour décrire un pivot (Airbnb transformant les apparts en hôtels) sonne **lettré et pertinent** — combo gagnant en pitch business.',
    bodyEn:
      '望梅止渴 («see plums to quench thirst»): Cao Cao, marching with thirsty troops, tells them there\'s a plum orchard over the hill. Salivation keeps them going to the next spring. Meaning: CONSOLE oneself with illusory hope. Modern use: 这只是望梅止渴 = it\'s just self-deception. 草船借箭 («borrow arrows with straw boats»): Zhuge Liang, ordered to produce 100,000 arrows in 3 days, sends straw-covered boats toward the enemy camp at night. Thinking it\'s an attack, the enemy fires thousands of arrows that stick in the straw. Modern sense: GENIUS RUSE that turns the adversary\'s resources. Loved by Chinese entrepreneurs.',
    items: [
      { hanzi: '望梅止渴', pinyin: 'wàng méi zhǐ kě', meaning: 'consolation illusoire', meaningEn: 'wishful thinking', audio: 'audio/hsk6/hsk6_望梅.wav' },
      { hanzi: '草船借箭', pinyin: 'cǎo chuán jiè jiàn', meaning: 'ruse géniale', meaningEn: 'genius ruse', audio: 'audio/hsk6/hsk6_草船.wav' },
      { hanzi: '曹操', pinyin: 'cáo cāo', meaning: 'Cao Cao', meaningEn: 'Cao Cao', audio: 'audio/hsk6/hsk6_曹操.wav' },
      { hanzi: '战略', pinyin: 'zhàn lüè', meaning: 'stratégie', meaningEn: 'strategy', audio: 'audio/hsk5/hsk5_战略.wav' },
      { hanzi: '资源', pinyin: 'zī yuán', meaning: 'ressources', meaningEn: 'resources', audio: 'audio/hsk5/hsk5_资源.wav' }
    ],
    tip:
      'Pour décrire un PIVOT entrepreneurial intelligent (Airbnb qui transforme appartements en hôtels, Uber chauffeurs particuliers), tu peux dire : « 这是现代版的草船借箭 » (c\'est un草船借箭 moderne). Sonne lettré ET pertinent — combo gagnant en pitch business chinois.',
    tipEn:
      'To describe a smart entrepreneurial PIVOT (Airbnb turning apartments into hotels, Uber private drivers), you can say: «这是现代版的草船借箭» (it\'s a modern 草船借箭). Sounds erudite AND relevant — winning combo in Chinese business pitch.'
  }
];

export const c12ChengyuAdvancedM2LearnSections: LessonV2LearnSection[] = [
  {
    id: 'c12-etudier-comme-anciens',
    title: '悬梁刺股 + 凿壁偷光 — anecdotes d\'étudiants',
    titleEn: '悬梁刺股 + 凿壁偷光 — student anecdotes',
    body:
      'Deux chéngyǔ d\'**étudiants modèles**, omniprésents sur les murs des écoles chinoises. Anecdotes Han / Royaumes Combattants devenues axiomes éducatifs.\n' +
      '\n' +
      'Les deux récits canoniques :\n' +
      '- **悬梁刺股** (xuánliángcìgǔ, « suspendre la tresse, piquer la cuisse ») — fusion de 2 anecdotes : Sun Jing attachait sa tresse à une poutre, Su Qin se piquait la cuisse à l\'alêne, pour ne pas s\'endormir en lisant. Sens : **étudier au prix de soi-même**\n' +
      '- **凿壁偷光** (záobìtōuguāng, « percer le mur, voler la lumière ») — Kuang Heng, trop pauvre pour les bougies, perçait le mur du voisin pour lire à sa lumière. Sens : **étudier malgré la pauvreté**\n' +
      '\n' +
      'Phrase d\'usage : 我们要发扬悬梁刺股的精神 — perpétuer l\'esprit du sacrifice par l\'étude.\n' +
      '\n' +
      'RÈGLE D\'OR : pour féliciter un étudiant qui a réussi son 高考 ou soutenu sa thèse — **你真有悬梁刺股的精神**. Compliment ultime, montre que tu reconnais le **sacrifice**. Effet émotionnel garanti.',
    bodyEn:
      '悬梁刺股 («hang braid, prick thigh») merges 2 anecdotes: 孙敬 (Sun Jing, Han) tied his braid to a ceiling beam to avoid falling asleep reading; 苏秦 (Su Qin, Warring States) pricked his thigh with an awl when sleepy. Both became high officials. Meaning: study at the COST OF ONESELF. 凿壁偷光 («drill wall, steal light»): 匡衡 (Kuang Heng, Han), too poor for candles, drilled his neighbor\'s wall to use THEIR light. Became Prime Minister. Meaning: STUDY DESPITE POVERTY. These 2 chengyu are on all Chinese school walls. Common phrase: 我们要发扬悬梁刺股的精神 («we must perpetuate the spirit of sacrifice through study»).',
    items: [
      { hanzi: '悬梁刺股', pinyin: 'xuán liáng cì gǔ', meaning: 'étudier au prix de soi', meaningEn: 'study at all costs', audio: 'audio/hsk6/hsk6_悬梁.wav' },
      { hanzi: '凿壁偷光', pinyin: 'záo bì tōu guāng', meaning: 'étudier dans pauvreté', meaningEn: 'study in poverty', audio: 'audio/hsk6/hsk6_凿壁.wav' },
      { hanzi: '苏秦', pinyin: 'sū qín', meaning: 'Su Qin (stratège)', meaningEn: 'Su Qin', audio: 'audio/hsk6/hsk6_苏秦.wav' },
      { hanzi: '发扬', pinyin: 'fā yáng', meaning: 'perpétuer (esprit)', meaningEn: 'carry forward', audio: 'audio/hsk6/hsk6_发扬.wav' },
      { hanzi: '勤奋', pinyin: 'qín fèn', meaning: 'assidu', meaningEn: 'diligent', audio: 'audio/hsk6/hsk6_勤奋.wav' }
    ],
    tip:
      'Pour féliciter un étudiant chinois qui réussit après gros effort : « 你真有悬梁刺股的精神 » — compliment ULTIME, montre que tu reconnais le sacrifice. À utiliser pour un étudiant chinois qui a réussi son 高考, soutenu sa thèse, etc. Effet émotionnel garanti.',
    tipEn:
      'To congratulate a Chinese student who succeeded after huge effort: «你真有悬梁刺股的精神» — ULTIMATE compliment, shows you recognize the sacrifice. Use for a Chinese student who passed 高考, defended thesis, etc. Guaranteed emotional effect.'
  },
  {
    id: 'c12-confucius-savoir',
    title: '韦编三绝 + 学而不厌 — Confucius et l\'étude',
    titleEn: '韦编三绝 + 学而不厌 — Confucius and study',
    body:
      'Deux chéngyǔ canoniques sur **Confucius et l\'étude**, l\'un sur la lecture obsessionnelle, l\'autre sur la devise du maître idéal.\n' +
      '\n' +
      'Les deux références **classiques** :\n' +
      '- **韦编三绝** (wéibiānsānjué, « lanières rompues 3 fois ») — Confucius aurait tant lu son 易经 que les sangles de cuir des lattes de bambou se sont brisées 3 fois. Sens : **lecture assidue et profonde**\n' +
      '- **学而不厌** (xuéérbúyàn, « étudier sans se lasser ») — issu des 论语 : 学而不厌，诲人不倦 (étudier sans se lasser, enseigner sans se fatiguer). Devise du **professeur idéal**\n' +
      '\n' +
      'Usages dans la conversation lettrée :\n' +
      '- 这本书我已经韦编三绝 — j\'ai relu ce livre des dizaines de fois\n' +
      '- 老师真是学而不厌 — louange d\'un mentor\n' +
      '\n' +
      'RÈGLE D\'OR : pour louer un mentor académique chinois, citer directement les 论语 — **您是学而不厌，诲人不倦**. Compliment **suprême** : tu signales connaissance des classiques **et** reconnaissance de sa qualité.',
    bodyEn:
      '韦编三绝 («[book] straps broken 3 times»): Confucius, passionate reader of 易经 (Yìjīng, Book of Changes), reportedly read his copy so often that the leather straps binding the bamboo slats broke 3 times. Meaning: ASSIDUOUS and deep reading. For a monumental intellectual work: 这本书我已经韦编三绝 (I\'ve reread this book dozens of times). 学而不厌 («study without weariness») comes from 论语 (Analects): 学而不厌，诲人不倦 (study without tiring, teach without flagging). Motto of the ideal teacher. To praise a mentor: «老师真是学而不厌». Intellectual combo: citing these 2 chengyu in an education discussion = IMMEDIATE C1.2 signal.',
    items: [
      { hanzi: '韦编三绝', pinyin: 'wéi biān sān jué', meaning: 'lecture obsessionnelle', meaningEn: 'obsessive reading', audio: 'audio/hsk6/hsk6_韦编.wav' },
      { hanzi: '学而不厌', pinyin: 'xué ér bù yàn', meaning: 'étudier sans se lasser', meaningEn: 'study tirelessly', audio: 'audio/hsk6/hsk6_学而.wav' },
      { hanzi: '论语', pinyin: 'lún yǔ', meaning: 'Analectes (Confucius)', meaningEn: 'Analects', audio: 'audio/hsk6/hsk6_论语.wav' },
      { hanzi: '诲人不倦', pinyin: 'huì rén bú juàn', meaning: 'enseigner sans se fatiguer', meaningEn: 'teach untiringly', audio: 'audio/hsk6/hsk6_诲人.wav' },
      { hanzi: '易经', pinyin: 'yì jīng', meaning: 'Livre des Mutations', meaningEn: 'I Ching', audio: 'audio/hsk6/hsk6_易经.wav' }
    ],
    tip:
      'Pour féliciter un mentor chinois qui t\'a transmis beaucoup : « 您是学而不厌，诲人不倦 ». Citation directe des 论语. Compliment SUPRÊME en milieu académique chinois — tu signales que tu connais les classiques + reconnais sa qualité. Combo gagnant.',
    tipEn:
      'To praise a Chinese mentor who taught you much: «您是学而不厌，诲人不倦». Direct quote from 论语. SUPREME compliment in Chinese academia — you signal classical knowledge + recognize their quality. Winning combo.'
  }
];

export const c12ChengyuAdvancedM3LearnSections: LessonV2LearnSection[] = [
  {
    id: 'c12-xiehouyu-mecanisme',
    title: 'Le mécanisme du 歇后语',
    titleEn: 'The 歇后语 mechanism',
    body:
      'Le **歇后语** (xiēhòuyǔ) est une expression à chute en 2 temps : (1) une scène énigmatique, (2) une chute qui dévoile le sens, souvent par jeu phonétique.\n' +
      '\n' +
      'Exemple emblématique — **外甥打灯笼 — 照舅(旧)** :\n' +
      '- Image : « le neveu tient la lanterne — éclaire son oncle »\n' +
      '- Sens : « comme avant »\n' +
      '- Mécanique : 照舅 (zhàojiù, éclairer l\'oncle) sonne comme **照旧** (zhàojiù, comme d\'habitude)\n' +
      '\n' +
      'À l\'oral, on ne dit souvent que la **1re partie** — « 这事啊，外甥打灯笼…» et l\'interlocuteur rit en complétant intérieurement.\n' +
      '\n' +
      'RÈGLE D\'OR : le 歇后语 est un **test de complicité culturelle**. Si l\'autre **rit** en complétant la chute, vous êtes au même niveau d\'initiation. S\'il demande « 然后呢 ? » — c\'est un débutant, adapte ton registre. Apprends 5-10 歇后语 standards pour les déployer.',
    bodyEn:
      'A 歇后语 works in 2 steps: (1) an enigmatic scene, (2) a punchline revealing the meaning. Often the punchline rests on a PHONETIC PUN. Iconic example: 外甥打灯笼 — 照舅(旧). «The nephew holds the lantern: lights up his uncle (= as before)». 照舅 (zhào jiù, light the uncle) sounds like 照旧 (zhào jiù, as usual). Orally, you often say ONLY the 1st part: «这事啊，外甥打灯笼…» and the other laughs, completing internally. If you can place the 1st part + your listeners understand, it\'s a deep CULTURAL COMPLICITY moment. Learn 5-10 standard 歇后语 to deploy.',
    items: [
      { hanzi: '歇后语', pinyin: 'xiē hòu yǔ', meaning: 'expression à chute', meaningEn: 'two-part allegorical', audio: 'audio/hsk6/hsk6_歇后.wav' },
      { hanzi: '外甥', pinyin: 'wài shēng', meaning: 'neveu (côté maternel)', meaningEn: 'nephew (maternal)', audio: 'audio/hsk6/hsk6_外甥.wav' },
      { hanzi: '灯笼', pinyin: 'dēng long', meaning: 'lanterne', meaningEn: 'lantern', audio: 'audio/hsk5/hsk5_灯笼.wav' },
      { hanzi: '照旧', pinyin: 'zhào jiù', meaning: 'comme d\'habitude', meaningEn: 'as usual', audio: 'audio/hsk6/hsk6_照旧.wav' },
      { hanzi: '谐音', pinyin: 'xié yīn', meaning: 'jeu phonétique', meaningEn: 'homophonic pun', audio: 'audio/hsk6/hsk6_谐音.wav' }
    ],
    tip:
      'Le 歇后语 est UN test de complicité culturelle : si l\'autre RIT en complétant la chute, vous êtes au même niveau d\'initiation à la culture chinoise. Si l\'autre demande « 然后呢 ? » (et puis ?), tu as un débutant en face. Adapte ton registre.',
    tipEn:
      '歇后语 is a CULTURAL COMPLICITY test: if the other LAUGHS completing the punchline, you\'re at the same level of Chinese cultural initiation. If they ask «然后呢?» (and then?), you have a beginner before you. Adapt your register.'
  },
  {
    id: 'c12-xiehouyu-classiques',
    title: '黄鼠狼给鸡拜年 + 八仙过海 — classiques',
    titleEn: '黄鼠狼给鸡拜年 + 八仙过海 — classics',
    body:
      'Deux 歇后语 classiques à connaître absolument : l\'un sur la méfiance, l\'autre sur la mobilisation coopérative.\n' +
      '\n' +
      'Les deux expressions à chute :\n' +
      '- **黄鼠狼给鸡拜年 — 没安好心** (« la belette souhaite bonne année au poulet — pas avec de bonnes intentions ») : la belette mange les poulets ; si elle vient leur souhaiter le Nouvel An, elle prépare un coup. Sens : **se méfier d\'une amabilité suspecte**\n' +
      '- **八仙过海 — 各显神通** (« les 8 Immortels traversent la mer — chacun déploie ses talents ») : les 8 Immortels taoïstes traversent la mer chacun par son pouvoir. Sens : **chacun donne le meilleur de soi**, mode coopératif\n' +
      '\n' +
      'RÈGLE D\'OR : pour lancer un **kickoff de projet créatif**, dis — **这次项目，我们八仙过海，各显神通 !** L\'équipe entend : « chacun a un don unique, qu\'il l\'apporte ». Effet motivant immédiat, bien plus **idiomatique** que « let\'s do our best ».',
    bodyEn:
      '黄鼠狼给鸡拜年 — 没安好心 («the weasel wishes the chicken Happy New Year — not with good intentions»). The weasel eats chickens: if she comes to wish them a happy new year, she\'s plotting. Meaning: BEWARE of suspicious friendliness. 八仙过海 — 各显神通 («the 8 Immortals cross the sea — each displays their power»). The 8 Taoist Immortals, having to cross the sea without boats, each use their magical power. Meaning: EVERYONE gives their best in a hard situation, cooperatively. To launch a collective project: «这次项目，我们八仙过海，各显神通!» Very motivating + culturally rich.',
    items: [
      { hanzi: '黄鼠狼', pinyin: 'huáng shǔ láng', meaning: 'belette', meaningEn: 'weasel', audio: 'audio/hsk6/hsk6_黄鼠狼.wav' },
      { hanzi: '拜年', pinyin: 'bài nián', meaning: 'souhaiter le Nouvel An', meaningEn: 'New Year visit', audio: 'audio/hsk5/hsk5_拜年.wav' },
      { hanzi: '八仙', pinyin: 'bā xiān', meaning: '8 Immortels (taoïstes)', meaningEn: '8 Immortals', audio: 'audio/hsk6/hsk6_八仙.wav' },
      { hanzi: '神通', pinyin: 'shén tōng', meaning: 'pouvoir magique', meaningEn: 'magical power', audio: 'audio/hsk6/hsk6_神通.wav' },
      { hanzi: '各显', pinyin: 'gè xiǎn', meaning: 'chacun déploie', meaningEn: 'each shows', audio: 'audio/hsk6/hsk6_各.wav' }
    ],
    tip:
      'Pour lancer un kickoff de projet créatif chinois, dis : « 这次项目，我们八仙过海，各显神通 ! » L\'équipe entend : « chacun a un don unique, qu\'il l\'apporte ». Effet motivant immédiat. Bien plus chic que « let\'s do our best ». Adopte-le.',
    tipEn:
      'To launch a Chinese creative project kickoff, say: «这次项目，我们八仙过海，各显神通!» The team hears: «everyone has a unique gift, bring it». Immediate motivating effect. Far chicer than «let\'s do our best». Adopt it.'
  }
];

// --- business ---------------------------------------------------------------

export const c12BusinessM1LearnSections: LessonV2LearnSection[] = [
  {
    id: 'c12-guanxi-construire',
    title: '关系 — comment se construit le réseau',
    titleEn: '关系 — how the network is built',
    body:
      'Le **关系** (guānxi) ne se déclare pas, il se construit par investissement long-terme — et la réciprocité est sa règle d\'or.\n' +
      '\n' +
      'Ressources de base du 关系 :\n' +
      '- 同学 (tóngxué) — camarades de promo universitaire (lien **extrêmement fort** en Chine)\n' +
      '- 同乡 (tóngxiāng) — gens de la même province\n' +
      '- 战友 (zhànyǒu) — camarades militaires\n' +
      '- 老朋友 (lǎo péngyǒu) — vieux amis\n' +
      '\n' +
      'Mécanique de la construction :\n' +
      '- 吃饭 — s\'inviter à manger\n' +
      '- 送礼 — s\'offrir des cadeaux (jamais excessifs sinon malaise)\n' +
      '- s\'inviter aux mariages et funérailles\n' +
      '- s\'aider concrètement (CV, intro à un médecin, problème admin)\n' +
      '\n' +
      'RÈGLE D\'OR : **construis d\'abord, sollicite ensuite**. La pire faute = demander un service à quelqu\'un avec qui tu n\'as jamais cultivé 关系 — perçu comme grossier. Recevoir sans donner = fermeture relationnelle immédiate.',
    bodyEn:
      '关系 (guānxi) isn\'t declared, it\'s BUILT through long-term investment. Base resources: 同学 (university classmates — extremely strong relation in China), 同乡 (people from the same province), 战友 (military comrades), 老朋友 (old friends). Mechanics: invite each other to eat 吃饭, give gifts 送礼 (never excessive lest discomfort), invite to weddings and funerals, help concretely (CV, intro to a doctor, admin issue). RECIPROCITY is the golden rule — receiving without giving = closing yourself off. The worst: asking a favor of someone WITHOUT prior 关系 — perceived as rude. Build first, ask later.',
    items: [
      { hanzi: '关系', pinyin: 'guān xi', meaning: 'réseau, lien', meaningEn: 'connections', audio: 'audio/hsk3/hsk3_关系.wav' },
      { hanzi: '同学', pinyin: 'tóng xué', meaning: 'camarade de classe', meaningEn: 'classmate', audio: 'audio/hsk1/hsk1_同学.wav' },
      { hanzi: '老乡', pinyin: 'lǎo xiāng', meaning: 'compatriote provincial', meaningEn: 'fellow provincial', audio: 'audio/hsk5/hsk5_老乡.wav' },
      { hanzi: '送礼', pinyin: 'sòng lǐ', meaning: 'offrir un cadeau', meaningEn: 'give a gift', audio: 'audio/hsk5/hsk5_送礼.wav' },
      { hanzi: '互相', pinyin: 'hù xiāng', meaning: 'mutuellement', meaningEn: 'mutually', audio: 'audio/hsk4/hsk4_互相.wav' }
    ],
    tip:
      'Pour activer 关系 efficacement : passe par un INTERMÉDIAIRE qui connaît les 2 parties. « 我朋友老李推荐我找您 » (mon ami Lao Li m\'a recommandé de vous contacter) ouvre 10x plus de portes que de contacter directement un inconnu. Le 介绍人 (intermédiaire) est un rouage clé.',
    tipEn:
      'To activate 关系 effectively: go through an INTERMEDIARY who knows both parties. «我朋友老李推荐我找您» (my friend Lao Li recommended I contact you) opens 10x more doors than contacting a stranger directly. The 介绍人 (intermediary) is a key cog.'
  },
  {
    id: 'c12-mianzi-trois-verbes',
    title: '面子 — 3 verbes : 给/丢/留',
    titleEn: '面子 — 3 verbs: 给/丢/留',
    body:
      'Le **面子** (miànzi, face sociale) structure 80% des comportements pro chinois. L\'ignorer = sabotage involontaire de toutes tes relations. Trois verbes-clés s\'y attachent.\n' +
      '\n' +
      'Les 3 verbes de la face :\n' +
      '- **给面子** (gěi miànzi) — donner / honorer publiquement. Accepter une invitation, complimenter en réunion, demander conseil publiquement\n' +
      '- **丢面子** (diū miànzi) — perdre / être humilié publiquement. Critique frontale, contradiction publique, désaccord visible\n' +
      '- **留面子** (liú miànzi) — préserver la face de l\'autre. Si un collègue se trompe en réunion, ne le corrige pas publiquement — adresse-toi à lui plus tard en privé\n' +
      '\n' +
      'RÈGLE D\'OR : **critique en privé, complimente en public** — l\'inverse de la règle américaine. Si tu dois reprendre un collègue chinois, fais-le 1-on-1, jamais en réunion. Même si tu as **raison** sur le fond, tu perdras la collaboration.',
    bodyEn:
      '给面子 (give face) = publicly honor someone. Accept an invitation, compliment in meetings, ask advice PUBLICLY (shows you value the other). 丢面子 (lose face) = be publicly humiliated. Frontal criticism, public contradiction, visible disagreement. In Western oral culture we say «it\'s ok to disagree» — in Chinese, public disagreement = relational catastrophe. 留面子 (preserve the other\'s face) = magic formula. If you see a colleague err in a meeting, DON\'T CORRECT them publicly — address them later in private. That\'s 留面子. This concept structures 80% of Chinese pro behavior — ignoring it = involuntary sabotage of all your relationships.',
    items: [
      { hanzi: '面子', pinyin: 'miàn zi', meaning: 'face sociale', meaningEn: 'social face', audio: 'audio/hsk5/hsk5_面子.wav' },
      { hanzi: '给面子', pinyin: 'gěi miàn zi', meaning: 'donner la face', meaningEn: 'give face', audio: 'audio/hsk5/hsk5_给面子.wav' },
      { hanzi: '丢面子', pinyin: 'diū miàn zi', meaning: 'perdre la face', meaningEn: 'lose face', audio: 'audio/hsk5/hsk5_丢.wav' },
      { hanzi: '留面子', pinyin: 'liú miàn zi', meaning: 'préserver la face', meaningEn: 'save the other\'s face', audio: 'audio/hsk5/hsk5_留.wav' },
      { hanzi: '公开', pinyin: 'gōng kāi', meaning: 'public, ouvertement', meaningEn: 'publicly', audio: 'audio/hsk5/hsk5_公开.wav' }
    ],
    tip:
      'Règle d\'or pro Chine : critique en privé, complimente en public. L\'inverse de la règle américaine. Si tu dois reprendre un collègue chinois, fais-le 1-on-1, jamais en réunion. Sinon, même si tu as RAISON sur le fond, tu PERDRAS la collaboration.',
    tipEn:
      'Pro China golden rule: criticize in private, compliment in public. Opposite of American rule. If you must correct a Chinese colleague, do it 1-on-1, never in a meeting. Otherwise, even if you\'re RIGHT, you\'ll LOSE the collaboration.'
  }
];

export const c12BusinessM2LearnSections: LessonV2LearnSection[] = [
  {
    id: 'c12-banquet-business-pourquoi',
    title: 'Pourquoi le 酒桌 est central',
    titleEn: 'Why the 酒桌 is central',
    body:
      'En culture chinoise, manifeste de confiance = manger et boire ensemble. Les deals importants se concluent souvent au 2e ou 3e banquet, pas au 1er rendez-vous. Au bureau on est dans la **profession** ; à table, dans l\'**humain**.\n' +
      '\n' +
      'Vocabulaire du 酒桌 :\n' +
      '- 白酒 (báijiǔ) — alcool de sorgho à 50-55° ABV\n' +
      '- 拉近距离 (lā jìnjùlí) — rapprocher les distances\n' +
      '- 意思意思 (yìsiyìsi) — petite gorgée symbolique\n' +
      '\n' +
      'Stratégie de survie au 酒桌 :\n' +
      '- Mange **avant** de boire — jamais sur estomac vide\n' +
      '- Bois 1 verre quand l\'hôte trinque, **意思意思** (gorgée symbolique) le reste du temps\n' +
      '- Demande de l\'eau ou du thé entre les toasts\n' +
      '- Plus on a bu ensemble, plus le 关系 est ancré\n' +
      '\n' +
      'RÈGLE D\'OR : si tu ne peux/veux **pas boire**, signale-le **avant** le banquet à l\'organisateur. Phrase : 我对酒精过敏，今晚以茶代酒. Ce signalement préalable préserve le 面子 de tous — improviser au moment du toast = panique générale.',
    bodyEn:
      'In Chinese culture, expression of trust = eating and drinking together. At the office, you\'re in PROFESSION; at the table, in HUMAN dimension. Important deals are often closed at the 2nd or 3rd banquet, not the 1st meeting. 白酒 (sorghum liquor at 50-55° ABV) plays a key role: it «拉近距离» (closes the distance). The more you\'ve drunk together, the more the 关系 is anchored. For Western drinkers: caution, 白酒 is MUCH stronger than wine. Strategy: drink 1 glass when the host toasts, but 意思意思 (small symbolic sip) the rest of the time. Request water or tea between toasts. Eat before drinking — NEVER on an empty stomach.',
    items: [
      { hanzi: '酒桌', pinyin: 'jiǔ zhuō', meaning: 'table de banquet', meaningEn: 'banquet table', audio: 'audio/hsk6/hsk6_酒桌.wav' },
      { hanzi: '白酒', pinyin: 'bái jiǔ', meaning: 'alcool de sorgho', meaningEn: 'sorghum liquor', audio: 'audio/hsk5/hsk5_白酒.wav' },
      { hanzi: '拉近', pinyin: 'lā jìn', meaning: 'rapprocher', meaningEn: 'bring closer', audio: 'audio/hsk6/hsk6_拉.wav' },
      { hanzi: '距离', pinyin: 'jù lí', meaning: 'distance', meaningEn: 'distance', audio: 'audio/hsk5/hsk5_距离.wav' },
      { hanzi: '意思意思', pinyin: 'yì si yì si', meaning: 'petit geste', meaningEn: 'token gesture', audio: 'audio/hsk5/hsk5_意思.wav' }
    ],
    tip:
      'Si tu ne peux/veux PAS boire, signale-le AVANT le banquet (à l\'organisateur ou au plus haut placé). Phrase : « 我对酒精过敏，今晚以茶代酒 » (allergique à l\'alcool, ce soir thé). Ce signalement préalable préserve le 面子 de tous. Improviser au moment du toast = panique générale.',
    tipEn:
      'If you can/will NOT drink, signal it BEFORE the banquet (to the organizer or highest-ranking). Phrase: «我对酒精过敏，今晚以茶代酒» (allergic to alcohol, tea tonight). Pre-warning preserves everyone\'s 面子. Improvising at toast time = general panic.'
  },
  {
    id: 'c12-banquet-modern-cha',
    title: 'Alternative moderne : 商务茶',
    titleEn: 'Modern alternative: 商务茶',
    body:
      'Le **商务茶** (shāngwùchá, thé d\'affaires) est l\'alternative moderne au 酒桌 — adoptée par les jeunes générations et le secteur tech. Lieu : une 茶馆 ou un salon privé d\'hôtel.\n' +
      '\n' +
      'Les 3 thés-stars du business chinois :\n' +
      '- 普洱 (pǔ\'ěr) — thé fermenté du Yunnan\n' +
      '- 龙井 (lóngjǐng) — thé vert de Hangzhou\n' +
      '- 铁观音 (tiě guānyīn) — oolong du Fujian\n' +
      '\n' +
      'Avantages / inconvénients :\n' +
      '- (+) Pas d\'ivresse, pas de gueule de bois, tête claire pour décider\n' +
      '- (+) Conversation plus calme, plus stratégique\n' +
      '- (−) Moins de 拉近距离 émotionnel\n' +
      '- (−) Certains seniors préfèrent encore le 酒桌 pour « tester » un partenaire\n' +
      '\n' +
      'RÈGLE D\'OR : **compromis pragmatique** — démarre la relation au 商务茶, scelle les gros deals au 酒桌. Pour louer le thé en connaisseur : 这茶喝起来有回甘 (回甘 = douceur qui revient en fin de bouche).',
    bodyEn:
      'Younger generations + tech sector prefer 商务茶 (business tea) to 白酒. Meet in a 茶馆 (tea house) or private hotel salon. Codes: host chooses the tea (普洱 pǔ\'ěr, 龙井 lóngjǐng, 铁观音 tiěguānyīn — 3 star teas). Prepared by a 茶艺师 (ceremonial). Conversation calmer, more strategic. Advantages: no drunkenness, no hangover, clear head to decide. Drawbacks: less emotional 拉近距离 — some seniors still prefer traditional 酒桌 to «test» a partner. Compromise: start the relationship at 商务茶, seal big deals at 酒桌.',
    items: [
      { hanzi: '商务茶', pinyin: 'shāng wù chá', meaning: 'thé d\'affaires', meaningEn: 'business tea', audio: 'audio/hsk6/hsk6_商务.wav' },
      { hanzi: '茶馆', pinyin: 'chá guǎn', meaning: 'maison de thé', meaningEn: 'tea house', audio: 'audio/hsk5/hsk5_茶馆.wav' },
      { hanzi: '普洱', pinyin: 'pǔ ěr', meaning: 'thé puer', meaningEn: 'pu\'er tea', audio: 'audio/hsk6/hsk6_普洱.wav' },
      { hanzi: '龙井', pinyin: 'lóng jǐng', meaning: 'thé Longjing', meaningEn: 'Longjing tea', audio: 'audio/hsk6/hsk6_龙井.wav' },
      { hanzi: '茶艺', pinyin: 'chá yì', meaning: 'art du thé', meaningEn: 'tea ceremony', audio: 'audio/hsk6/hsk6_茶艺.wav' }
    ],
    tip:
      'Pour louer un thé chinois, dis : « 这茶喝起来有回甘 » (回甘 = douceur qui revient en fin de bouche). Cette expression de connaisseur signale ta familiarité avec la culture du thé. Si l\'hôte est amateur, il/elle te respectera immédiatement.',
    tipEn:
      'To praise Chinese tea, say: «这茶喝起来有回甘» (回甘 = lingering sweet aftertaste). This connoisseur expression signals familiarity with tea culture. If the host is a tea lover, they\'ll respect you immediately.'
  }
];

export const c12BusinessM3LearnSections: LessonV2LearnSection[] = [
  {
    id: 'c12-piege-bazhe',
    title: 'Le piège classique du 打八折',
    titleEn: 'The classic 打八折 trap',
    body:
      'En chinois, **打 X 折 = on paie X/10 du prix initial**. Donc 打八折 = 80% du prix = remise de 20%. Erreur fréquente du francophone : croire 八折 = 80% de remise. Catastrophe en négociation.\n' +
      '\n' +
      'Mnémonique : **le nombre indique ce que tu paies**, pas ce que tu économises.\n' +
      '\n' +
      'Conversions clés :\n' +
      '- 打九折 — 90% (remise 10%, faible)\n' +
      '- 打八折 — 80% (remise 20%)\n' +
      '- 打七折 — 70% (remise 30%, correct)\n' +
      '- 打半价 — moitié prix\n' +
      '- 打三折 — 30% du prix (remise 70%, énorme)\n' +
      '\n' +
      'Phrases de négociation :\n' +
      '- 能不能打个折？— peut-on avoir une remise ? (formule ouverte)\n' +
      '- 能打八折吗？— 80% du prix ? (remise précise)\n' +
      '- 我希望您能打到八折 — je veux 20% de remise\n' +
      '\n' +
      'Attention : le vendeur peut counter-proposer **打八五折** (85% — moins bonne pour toi). Compétence-clé : calculer mentalement la conversion **sans se planter**.',
    bodyEn:
      'In Chinese, 打 X 折 = you PAY X/10 of the initial price. So 打八折 = 80% of price = 20% off. Common French speaker mistake: thinking 八折 = 80% off. CATASTROPHE in negotiation if you forget. Mnemonic: THE NUMBER INDICATES WHAT YOU PAY. 打九折 = 90% (10% off), 打七折 = 70% (30% off), 打半价 = half price. To ask for a discount: 能不能打个折？(can we have a discount?) — open formula. For a specific discount: 能打八折吗？(80% of price?). The seller may counter 打八五折 (85% — worse for you). Key skill: mentally compute the conversion without slipping.',
    items: [
      { hanzi: '打折', pinyin: 'dǎ zhé', meaning: 'remise', meaningEn: 'discount', audio: 'audio/hsk5/hsk5_打折.wav' },
      { hanzi: '八折', pinyin: 'bā zhé', meaning: '80% (=20% off)', meaningEn: '80% (=20% off)', audio: 'audio/hsk5/hsk5_八.wav' },
      { hanzi: '半价', pinyin: 'bàn jià', meaning: 'moitié prix', meaningEn: 'half price', audio: 'audio/hsk5/hsk5_半价.wav' },
      { hanzi: '原价', pinyin: 'yuán jià', meaning: 'prix initial', meaningEn: 'original price', audio: 'audio/hsk5/hsk5_原价.wav' },
      { hanzi: '便宜', pinyin: 'pián yi', meaning: 'pas cher', meaningEn: 'cheap', audio: 'audio/hsk2/hsk2_便宜.wav' }
    ],
    tip:
      'En soldes, vois 打三折 (= 70% de réduction) c\'est ÉNORME. 打七折 (30% de réduction) c\'est correct. 打九折 (10% de réduction) c\'est faiblard. Connaitre le code te permet de NÉGOCIER : « 我希望您能打到八折 » (je veux 20% de remise). Soyons précis sur le chiffre demandé.',
    tipEn:
      'In sales, seeing 打三折 (= 70% off) is HUGE. 打七折 (30% off) is decent. 打九折 (10% off) is weak. Knowing the code lets you NEGOTIATE: «我希望您能打到八折» (I want 20% off). Be precise about the requested figure.'
  },
  {
    id: 'c12-clauses-paiement',
    title: 'Clauses de paiement et 盖章',
    titleEn: 'Payment clauses and 盖章',
    body:
      'Les clauses de paiement d\'un contrat chinois ont un vocabulaire précis. Et **le sceau prime sur la signature** — particularité juridique chinoise majeure.\n' +
      '\n' +
      'Vocabulaire du paiement :\n' +
      '- 付款方式 (fùkuǎn fāngshì) — mode de paiement (现金 cash, 转账 virement, 支票 chèque)\n' +
      '- 定金 (dìngjīn) — acompte (~30%)\n' +
      '- 尾款 (wěi kuǎn) — solde, à la livraison\n' +
      '- 分期 (fēnqī) — paiement échelonné\n' +
      '- 押金 (yājīn) — caution remboursable\n' +
      '- 违约金 (wéiyuē jīn) — pénalité de rupture\n' +
      '\n' +
      'Délais :\n' +
      '- 交货期 (jiāohuòqī) — date de livraison\n' +
      '- 工期 (gōngqī) — durée de chantier\n' +
      '\n' +
      'RÈGLE D\'OR : pour qu\'un document soit légalement contraignant en Chine, il faut **signature ET sceau**. Le 公章 (gōngzhāng, sceau rouge rond officiel) prime sur la signature individuelle. Sans 公章, refuse poliment : « 麻烦请加盖公章 ».',
    bodyEn:
      'Vocab: 付款方式 (payment mode: 现金/转账/支票 cash/wire/check), 定金 (deposit, usually 30%), 尾款 (balance, on delivery), 分期 (installments), 押金 (refundable deposit). Timing: 交货期 (delivery date), 工期 (project duration). Penalty: 违约金 (breach penalty, fixed by contract). 盖章 (affix seal): IN CHINA, the company\'s OFFICIAL SEAL (公章, red round seal) prevails over individual signature. Without seal, a contract remains WEAK even if signed. For a doc to be legally binding: signature AND seal. Seals are strictly controlled by 财务 (finance dept) — their use is a solemn act.',
    items: [
      { hanzi: '定金', pinyin: 'dìng jīn', meaning: 'acompte', meaningEn: 'deposit', audio: 'audio/hsk6/hsk6_定金.wav' },
      { hanzi: '尾款', pinyin: 'wěi kuǎn', meaning: 'solde', meaningEn: 'balance', audio: 'audio/hsk6/hsk6_尾款.wav' },
      { hanzi: '违约金', pinyin: 'wéi yuē jīn', meaning: 'pénalité de rupture', meaningEn: 'breach penalty', audio: 'audio/hsk6/hsk6_违约.wav' },
      { hanzi: '盖章', pinyin: 'gài zhāng', meaning: 'apposer le sceau', meaningEn: 'affix seal', audio: 'audio/hsk6/hsk6_盖章.wav' },
      { hanzi: '公章', pinyin: 'gōng zhāng', meaning: 'sceau officiel', meaningEn: 'official seal', audio: 'audio/hsk6/hsk6_公章.wav' }
    ],
    tip:
      'Si on te présente un contrat chinois SANS le 公章 rouge, REFUSE poliment et demande qu\'il soit apposé. Sans ce sceau, en cas de litige, ta position est faible. Phrase : « 麻烦请加盖公章 » (apposez le sceau officiel s\'il vous plaît). Geste pro standard.',
    tipEn:
      'If shown a Chinese contract WITHOUT the red 公章, politely REFUSE and ask for it to be affixed. Without this seal, in case of dispute, your position is weak. Phrase: «麻烦请加盖公章» (please affix the official seal). Standard pro gesture.'
  }
];

export const c12BusinessM4LearnSections: LessonV2LearnSection[] = [
  {
    id: 'c12-pitch-ouverture',
    title: 'Ouverture d\'un pitch d\'entreprise',
    titleEn: 'Opening a company pitch',
    body:
      'L\'ouverture d\'un pitch d\'entreprise chinois suit un **format rituel en 5 temps** : saluer hiérarchiquement, se présenter, annoncer, énoncer la durée, démarrer.\n' +
      '\n' +
      'Les 5 étapes obligatoires :\n' +
      '- 各位领导，各位来宾，大家好 ! — saluer hiérarchiquement\n' +
      '- 我是 X 公司的 Y，担任 Z 职位 — se présenter\n' +
      '- 今天我向各位介绍 X — annoncer le sujet\n' +
      '- 我的发言大约 X 分钟 — énoncer la durée\n' +
      '- Démarrer le premier paragraphe\n' +
      '\n' +
      'Premier paragraphe — présentation entreprise :\n' +
      '- 成立于 X 年 — fondée en X\n' +
      '- 总部在 X — siège à X\n' +
      '- 主营业务 X — activité principale X\n' +
      '- 我们在 X 行业拥有 X 年的经验 — 拥有 sonne plus pro que 有\n' +
      '\n' +
      'RÈGLE D\'OR : **ne jamais commencer par « 大家好 » seul** — trop familier en B2B. Toujours hiérarchiser l\'adresse en mentionnant 领导 / 来宾 en premier.',
    bodyEn:
      'Mandatory format: (1) Greet hierarchically (各位领导，各位来宾，大家好!). (2) Introduce yourself (我是 X 公司的 Y, 担任 Z 职位). (3) Announce the topic (今天我向各位介绍 X). (4) State duration (我的发言大约 X 分钟). (5) Start. First paragraph: company presentation (成立于 X 年, 总部在 X, 主营业务 X). To show legitimacy: 我们在 X 行业拥有 X 年的经验 (we have X years of experience in the X sector). 拥有 (own) sounds more pro than 有. NEVER start with «大家好» alone — too casual in B2B. Always hierarchize the address.',
    items: [
      { hanzi: '各位', pinyin: 'gè wèi', meaning: 'chacun de vous', meaningEn: 'each of you', audio: 'audio/hsk5/hsk5_各位.wav' },
      { hanzi: '担任', pinyin: 'dān rèn', meaning: 'occuper (un poste)', meaningEn: 'hold (a position)', audio: 'audio/hsk5/hsk5_担任.wav' },
      { hanzi: '总部', pinyin: 'zǒng bù', meaning: 'siège social', meaningEn: 'headquarters', audio: 'audio/hsk6/hsk6_总部.wav' },
      { hanzi: '主营业务', pinyin: 'zhǔ yíng yè wù', meaning: 'activité principale', meaningEn: 'core business', audio: 'audio/hsk6/hsk6_主营.wav' },
      { hanzi: '拥有', pinyin: 'yōng yǒu', meaning: 'posséder', meaningEn: 'possess', audio: 'audio/hsk5/hsk5_拥有.wav' }
    ],
    tip:
      'Si tu présentes à des dirigeants chinois ET étrangers ensemble, tu peux ouvrir : « 各位领导，dear guests，大家好 ». L\'alternance bilingue mesurée signale ta capacité de pont culturel. Effet immédiat sur les RH transnationales.',
    tipEn:
      'Presenting to Chinese AND foreign executives together, you can open: «各位领导，dear guests，大家好». Measured bilingual alternation signals your cultural-bridge capacity. Immediate effect on transnational HR.'
  },
  {
    id: 'c12-pitch-cloture',
    title: 'Clôture : 合作共赢 + chengyu',
    titleEn: 'Closing: 合作共赢 + chengyu',
    body:
      'Le pitch chinois se termine **toujours** sur une note d\'ouverture et de respect — vocabulaire **soutenu** obligatoire.\n' +
      '\n' +
      'Vocabulaire de la clôture :\n' +
      '- 合作共赢 (hézuò gòngyíng) — coopération gagnant-gagnant\n' +
      '- 互利互惠 (hùlì hùhuì) — mutuellement bénéfique\n' +
      '- 携手共进 (xiéshǒu gòng jìn) — avancer main dans la main\n' +
      '- 共创 (gòng chuàng) — cocréer\n' +
      '- 美好未来 (měihǎo wèilái) — bel avenir\n' +
      '\n' +
      'Chéngyǔ de fin (au choix) :\n' +
      '- 互利共赢 — gagnant-gagnant\n' +
      '- 共创未来 — cocréer l\'avenir\n' +
      '- 蒸蒸日上 (zhēngzhēngrìshàng) — en plein essor\n' +
      '\n' +
      'RÈGLE D\'OR : la **phrase magique** à mémoriser mot pour mot — **期待与贵公司携手合作，共创美好未来**. Le **贵** (guì, votre honorable) précédant 公司/校/国 est obligatoire pour parler de l\'entité du partenaire. Sans 贵, ton pitch sonne banal.',
    bodyEn:
      'Chinese pitch ALWAYS ends on a note of OPENING and RESPECT. Vocab: 合作共赢 (win-win cooperation), 互利互惠 (mutually beneficial), 携手共进 (advance hand in hand). Phrase: 期待与贵公司携手合作，共创美好未来 (I look forward to hand-in-hand cooperation to create a bright future). 共创 (co-create) + 美好未来 (bright future) = very Chinese combo. Closing chengyu: 互利共赢 or 共创未来 or 蒸蒸日上 (booming). The 贵 (your honorable) preceding 公司/校/国 = MANDATORY respect marker for the partner\'s entity. Without 贵, your pitch sounds BANAL.',
    items: [
      { hanzi: '合作共赢', pinyin: 'hé zuò gòng yíng', meaning: 'coopération gagnant-gagnant', meaningEn: 'win-win cooperation', audio: 'audio/hsk6/hsk6_合作.wav' },
      { hanzi: '互利', pinyin: 'hù lì', meaning: 'mutuellement bénéfique', meaningEn: 'mutually beneficial', audio: 'audio/hsk6/hsk6_互利.wav' },
      { hanzi: '携手', pinyin: 'xié shǒu', meaning: 'main dans la main', meaningEn: 'hand in hand', audio: 'audio/hsk6/hsk6_携手.wav' },
      { hanzi: '共创', pinyin: 'gòng chuàng', meaning: 'cocréer', meaningEn: 'co-create', audio: 'audio/hsk6/hsk6_共创.wav' },
      { hanzi: '贵', pinyin: 'guì', meaning: 'votre honorable', meaningEn: 'your honorable', audio: 'audio/hsk5/hsk5_贵.wav' }
    ],
    tip:
      'Phrase magique de clôture : « 期待与贵公司携手合作，共创美好未来 ». Mémorise-la mot pour mot. Effet immédiat sur l\'auditoire chinois : tu signales ta connaissance des codes pro + ton intention de coopération long-terme. Indispensable en C1.2 business.',
    tipEn:
      'Magic closing phrase: «期待与贵公司携手合作，共创美好未来». Memorize word for word. Immediate effect on Chinese audience: you signal pro code knowledge + long-term cooperation intent. Indispensable in C1.2 business.'
  }
];

// --- education-system -------------------------------------------------------

export const c12EducationSystemM1LearnSections: LessonV2LearnSection[] = [
  {
    id: 'c12-edu-parcours',
    title: 'Le parcours scolaire 6+3+3+4',
    titleEn: 'The 6+3+3+4 school path',
    body:
      'Le parcours scolaire chinois suit le **schéma 6+3+3+4** : primaire, collège, lycée, licence. 9 ans d\'**义务教育** (obligatoire et gratuit) couvrent primaire + collège.\n' +
      '\n' +
      'Tableau type d\'un Chinois né en 2010 :\n' +
      '- 2013-16 — 幼儿园 (maternelle, 3 ans)\n' +
      '- 2016-22 — 小学 (primaire, 6 ans, examens internes)\n' +
      '- 2022-25 — 初中 (collège, 3 ans, fin par 中考)\n' +
      '- 2025-28 — 高中 (lycée, 3 ans, fin par 高考)\n' +
      '- 2028-32 — 本科 (licence, 4 ans)\n' +
      '- Puis éventuellement 硕士 (master) et 博士 (doctorat)\n' +
      '\n' +
      'Rythme moyen : 8h-17h école + 19h-22h devoirs/cours particuliers. Lycée et fac payants (modeste pour le public, cher pour le privé).\n' +
      '\n' +
      'Attention : le phénomène **鸡娃** (jīwá, « enfant-poule ») — parents qui sur-poussent académiquement — est un **sujet de société majeur** : burnout, suicide d\'adolescents, pression psychologique. À discuter avec **empathie**, jamais frontalement.',
    bodyEn:
      'Standard timeline of a Chinese born in 2010: 2013-16 kindergarten (3 yrs), 2016-22 primary (6 yrs, internal exams), 2022-25 middle school (3 yrs, ends with 中考), 2025-28 high school (3 yrs, ends with 高考), 2028-32 bachelor (4 yrs), maybe 2032-35 master, 2035-40 PhD. 义务教育 (compulsory schooling) covers 9 years (primary + middle), free. High school and university paid (modest in public, expensive in private). Class hours: average Chinese child = 8am-5pm school + 7pm-10pm homework/private tutoring. 鸡娃 (jīwá, «chicken kid») phenomenon: parents who over-push children academically. Major SOCIETAL topic — burnout, teen suicide, psychological pressure.',
    items: [
      { hanzi: '幼儿园', pinyin: 'yòu ér yuán', meaning: 'maternelle', meaningEn: 'kindergarten', audio: 'audio/hsk5/hsk5_幼儿园.wav' },
      { hanzi: '义务教育', pinyin: 'yì wù jiào yù', meaning: 'scolarité obligatoire', meaningEn: 'compulsory education', audio: 'audio/hsk6/hsk6_义务.wav' },
      { hanzi: '中考', pinyin: 'zhōng kǎo', meaning: 'examen entrée lycée', meaningEn: 'high school entry exam', audio: 'audio/hsk6/hsk6_中考.wav' },
      { hanzi: '鸡娃', pinyin: 'jī wá', meaning: 'enfant sur-poussé', meaningEn: 'over-pushed child', audio: 'audio/hsk6/hsk6_鸡娃.wav' },
      { hanzi: '压力', pinyin: 'yā lì', meaning: 'pression', meaningEn: 'pressure', audio: 'audio/hsk4/hsk4_压力.wav' }
    ],
    tip:
      'Pour discuter le 鸡娃 avec un parent chinois : ne JAMAIS critiquer frontalement. Cela touche aux choix EXISTENTIELS de la famille. Préfère : « 我能想象这种压力 » (j\'imagine cette pression) + « 您觉得有平衡的方法吗 ? » (voyez-vous un moyen d\'équilibrer ?). Empathie + question ouverte = ouverture de dialogue.',
    tipEn:
      'To discuss 鸡娃 with a Chinese parent: NEVER frontally criticize. It touches the family\'s EXISTENTIAL choices. Prefer: «我能想象这种压力» (I imagine this pressure) + «您觉得有平衡的方法吗?» (do you see a way to balance?). Empathy + open question = dialogue opening.'
  },
  {
    id: 'c12-edu-shadow-system',
    title: 'L\'industrie parallèle des cours particuliers',
    titleEn: 'The parallel tutoring industry',
    body:
      'Le **课外辅导** (kèwài fǔdǎo, cours particuliers extra-scolaires) était une industrie de 100+ milliards $ en 2020 — leaders 新东方 et 学而思. La politique 双减 de 2021 a bouleversé tout l\'écosystème.\n' +
      '\n' +
      'Vocabulaire du shadow education :\n' +
      '- 补习班 (bǔxíbān) — cours de rattrapage\n' +
      '- 一对一 (yīduìyī) — cours particulier 1-on-1\n' +
      '- 在线教育 (zàixiàn jiàoyù) — cours en ligne\n' +
      '- 学区房 (xuéqū fáng) — appartement en secteur d\'élite scolaire\n' +
      '\n' +
      'La politique **双减** de 2021 (« double réduction ») :\n' +
      '- Réduction des devoirs scolaires\n' +
      '- Interdiction des cours particuliers à but lucratif pour le curriculum (math, anglais)\n' +
      '- Effets : faillite massive, chômage de profs, basculement clandestin (1-on-1 à domicile)\n' +
      '\n' +
      'Attention : sujet **politiquement explosif** — il révèle l\'**inégalité d\'accès** à l\'éducation. Le 学区房 (apparts à 5M ¥ pour 50m² près d\'une école d\'élite) reste révélateur de la pression éducative chinoise.',
    bodyEn:
      '课外辅导 (extra-school tutoring) was a $100B+ industry in 2020 (新东方, 学而思 leaders). In 2021, «双减» policy («double reduction»): reduction of homework + ban on for-profit tutoring for curriculum subjects (math, English). Effects: massive bankruptcies, teacher unemployment, but classes often moved underground (1-on-1 at home). Vocab: 补习班 (catch-up class), 一对一 (1-on-1 lesson), 在线教育 (online lessons), 学区房 (apartment in a good school district — price spike). The topic is politically explosive: it reveals education access inequality.',
    items: [
      { hanzi: '辅导', pinyin: 'fǔ dǎo', meaning: 'tutorat, soutien', meaningEn: 'tutoring', audio: 'audio/hsk5/hsk5_辅导.wav' },
      { hanzi: '双减', pinyin: 'shuāng jiǎn', meaning: 'double réduction', meaningEn: 'double reduction', audio: 'audio/hsk6/hsk6_双减.wav' },
      { hanzi: '补习', pinyin: 'bǔ xí', meaning: 'cours de rattrapage', meaningEn: 'catch-up class', audio: 'audio/hsk6/hsk6_补习.wav' },
      { hanzi: '一对一', pinyin: 'yī duì yī', meaning: 'un à un', meaningEn: 'one-on-one', audio: 'audio/hsk5/hsk5_一对一.wav' },
      { hanzi: '学区房', pinyin: 'xué qū fáng', meaning: 'logement de quartier scolaire', meaningEn: 'school district housing', audio: 'audio/hsk6/hsk6_学区.wav' }
    ],
    tip:
      'Le 学区房 a longtemps été UN obsession des classes moyennes urbaines. Acheter un appart de 50m² à 5M ¥ pour son entrée dans une école d\'élite était courant. La régulation 2021 a calmé le jeu mais le phénomène reste révélateur de la pression éducative chinoise.',
    tipEn:
      '学区房 was long an OBSESSION of urban middle classes. Buying a 50m² apartment for ¥5M for entry into an elite school was common. 2021 regulation calmed it but the phenomenon remains revealing of Chinese educational pressure.'
  }
];

export const c12EducationSystemM2LearnSections: LessonV2LearnSection[] = [
  {
    id: 'c12-gaokao-jour-j',
    title: 'Le 高考, jour J : organisation et symbolique',
    titleEn: '高考 D-day: organization and symbolism',
    body:
      'Le **高考** (gāokǎo) se tient chaque année les 7-9 juin avec plus de 10 millions de candidats simultanés. C\'est un **événement national qui suspend le pays**.\n' +
      '\n' +
      'Mobilisation du jour J :\n' +
      '- Circulation interdite autour des centres d\'examen\n' +
      '- Parents en attente toute la journée\n' +
      '- Chauffeurs de taxi gratuits pour les candidats\n' +
      '- Police présente partout\n' +
      '\n' +
      'Traditions superstitieuses :\n' +
      '- La mère porte un 旗袍 (qípáo) — 旗 sonne comme « ouverture / succès »\n' +
      '- La famille mange un bol de 鱼 (yú) la veille — homophone de 余 « surplus »\n' +
      '- Le candidat tient un porte-bonheur (jade, médaille de Confucius)\n' +
      '\n' +
      'Vocabulaire de l\'examen :\n' +
      '- 考场 (kǎochǎng) — centre d\'examen\n' +
      '- 监考 (jiān kǎo) — surveillant\n' +
      '- 答题卡 (dá tí kǎ) — feuille de réponses\n' +
      '- 准考证 (zhǔnkǎozhèng) — carte d\'admission\n' +
      '\n' +
      'RÈGLE D\'OR : pour souhaiter bonne chance à une famille — **祝您家孩子高考顺利，金榜题名 !** 金榜题名 = chéngyǔ impérial (réussir l\'examen mandarinal, son nom sur la liste rouge). Touche émotionnelle garantie.',
    bodyEn:
      '高考 takes place every year June 7-9. Over 10 million candidates simultaneously. NATIONAL mobilization: traffic banned around exam centers, parents waiting all day, taxi drivers free for candidates, police present. Tradition: the mother wears a 旗袍 (qípáo, traditional dress) — 旗 sounds like «opening/success». The family eats a bowl of 鱼 (fish — homophone of 余 «surplus») the night before. The candidate holds a lucky charm (jade, Confucius medal). It\'s a NATIONAL event that suspends the country. Vocab: 考场 (exam center), 监考 (supervisor), 答题卡 (answer sheet), 准考证 (admission card). If you\'re in China in early June, watch a news broadcast — 高考 coverage is intense.',
    items: [
      { hanzi: '考场', pinyin: 'kǎo chǎng', meaning: 'centre d\'examen', meaningEn: 'exam center', audio: 'audio/hsk6/hsk6_考场.wav' },
      { hanzi: '监考', pinyin: 'jiān kǎo', meaning: 'surveiller un examen', meaningEn: 'invigilate', audio: 'audio/hsk6/hsk6_监考.wav' },
      { hanzi: '答题卡', pinyin: 'dá tí kǎ', meaning: 'feuille de réponses', meaningEn: 'answer sheet', audio: 'audio/hsk6/hsk6_答题.wav' },
      { hanzi: '准考证', pinyin: 'zhǔn kǎo zhèng', meaning: 'carte d\'admission', meaningEn: 'admission ticket', audio: 'audio/hsk6/hsk6_准考.wav' },
      { hanzi: '旗袍', pinyin: 'qí páo', meaning: 'robe qipao traditionnelle', meaningEn: 'qipao dress', audio: 'audio/hsk6/hsk6_旗袍.wav' }
    ],
    tip:
      'Si tu connais une famille chinoise dont l\'enfant passe le 高考, envoie un message le 7 juin matin : « 祝您家孩子高考顺利，金榜题名 ! » (succès au 高考, votre nom sur la liste d\'or !). 金榜题名 = chengyu impérial (réussir l\'examen mandarinal, son nom sur la liste rouge). Touche émotionnelle GARANTIE.',
    tipEn:
      'If you know a Chinese family whose child takes 高考, send a message June 7 morning: «祝您家孩子高考顺利，金榜题名!» (smooth 高考, your name on the gold list!). 金榜题名 = imperial chengyu (passing the imperial exam, name on the red list). GUARANTEED emotional touch.'
  },
  {
    id: 'c12-985-211-tier',
    title: 'Hiérarchie 985 / 211 / régulier',
    titleEn: '985 / 211 / regular hierarchy',
    body:
      'La hiérarchie universitaire chinoise organise l\'employabilité en **2 cercles d\'élite** : 985 (39 universités top), 211 (top 100), puis régulier.\n' +
      '\n' +
      'Les deux cercles d\'élite :\n' +
      '- **985 工程** (lancé en 1998, d\'où 9-8) — 39 universités d\'élite, financement massif. 清华 (Tsinghua), 北大 (Pékin), 复旦, 上海交大, 浙大, 中科大 (USTC)\n' +
      '- **211 工程** (lancé pour le 21e siècle) — top 100 universités. Inclut les 985 + universités provinciales fortes\n' +
      '\n' +
      'Hors 985/211 :\n' +
      '- 普通本科 (pǔtōng běnkē) — université régulière\n' +
      '- 专科 (zhuānkē) — cycle court 2-3 ans, équivalent BTS\n' +
      '\n' +
      'Récemment, le programme **双一流** (Double First-Class) remplace officiellement 985/211, mais les anciens labels restent dans le langage courant.\n' +
      '\n' +
      'Attention : la **discrimination implicite à l\'embauche** existe — certains employeurs ne lisent même pas un CV non-985/211. Question d\'entrée standard : « 您是哪个学校毕业的？» (pas indiscrète).',
    bodyEn:
      '985 工程 (launched 1998 — hence 9-8): 39 elite universities, massive funding. 清华 (Tsinghua), 北大 (Peking), 复旦, 上海交大, 浙大, 中科大 (USTC). Graduates highly sought after in companies. 211 工程 (launched for the 21st century — top 100 universities): broader group including 985s + strong provincial universities. Coming from a 985 or 211 = HUGE career advantage. Implicit hiring discrimination exists: some employers don\'t even read a non-985/211 CV. Recently, «双一流» (Double First-Class) program officially replaces 985/211 but old labels remain in usage. Outside 985/211: 普通本科 (regular university), 专科 (short cycle 2-3 years, equivalent to vocational diploma).',
    items: [
      { hanzi: '985', pinyin: 'jiǔ bā wǔ', meaning: '985 (universités élite)', meaningEn: '985 (elite unis)', audio: 'audio/hsk6/hsk6_985.wav' },
      { hanzi: '211', pinyin: 'èr yāo yāo', meaning: '211 (top 100)', meaningEn: '211 (top 100)', audio: 'audio/hsk6/hsk6_211.wav' },
      { hanzi: '清华', pinyin: 'qīng huá', meaning: 'Tsinghua', meaningEn: 'Tsinghua', audio: 'audio/hsk6/hsk6_清华.wav' },
      { hanzi: '本科', pinyin: 'běn kē', meaning: 'licence (4 ans)', meaningEn: 'bachelor (4 yrs)', audio: 'audio/hsk6/hsk6_本科.wav' },
      { hanzi: '专科', pinyin: 'zhuān kē', meaning: 'cycle court (2-3 ans)', meaningEn: 'short cycle (2-3 yrs)', audio: 'audio/hsk6/hsk6_专科.wav' }
    ],
    tip:
      'Pour démarrer une conversation universitaire en Chine : « 您是哪个学校毕业的 ? » (de quelle université êtes-vous diplômé ?). Question STANDARD, pas indiscrète. Réponse 985 ou 211 = signal de fierté ; réponse école régulière = humble. Adapte ton ton.',
    tipEn:
      'To start a university conversation in China: «您是哪个学校毕业的?» (which university did you graduate from?). STANDARD question, not intrusive. Answer 985 or 211 = pride signal; regular school = humble. Adapt your tone.'
  }
];

export const c12EducationSystemM3LearnSections: LessonV2LearnSection[] = [
  {
    id: 'c12-haigui-evolution',
    title: '海归 — du prestige à l\'ambivalence',
    titleEn: '海归 — from prestige to ambivalence',
      body:
      'Le **海归** (hǎiguī, « tortue de mer ») désigne un Chinois qui a étudié à l\'étranger et est rentré — jeu phonétique avec 海归 « revenu d\'outre-mer ». Son statut a **basculé** entre 2010 et 2020.\n' +
      '\n' +
      'Évolution du statut :\n' +
      '- **2000-2010** — statut prestigieux, salaires majorés, postes de cadre direct\n' +
      '- **2020s** — ambivalence : Chine forme excellemment ses élites, universités locales rivalisent avec l\'Ivy League\n' +
      '- Pandémie + tensions géopolitiques + xénophobie post-2020 ont déprécié certains diplômes étrangers\n' +
      '\n' +
      'Nouveau terme **ironique** :\n' +
      '- 海带 (hǎidài, « algue marine ») — homophone de 海待 (« 海归 en attente ») = 海归 au chômage\n' +
      '\n' +
      'RÈGLE D\'OR : la valeur d\'un 海归 dépend désormais de l\'**université + du domaine**. 海归 d\'Oxford en physique = très valorisé ; 海归 d\'une école obscure en marketing = doute. Adapte ton CV : technique d\'abord, expérience culturelle ensuite.',
    bodyEn:
      '海归 (hǎiguī, «sea turtle») = pun on 海归 («returned from overseas»). Designates a Chinese who studied abroad and returned. In 2000-2010: PRESTIGIOUS status, premium salaries, direct executive positions. Today (2020s): ambivalence. China educates its elites excellently, local universities rival Ivy League. Plus pandemic + geopolitical tensions + post-2020 xenophobia DEPRECIATED some foreign degrees. New term: 海带 (hǎidài, «seaweed» homophone of 海待 «海归 waiting») = unemployed 海归, ironic narrative. A 海归\'s value now depends on university + field. Oxford 海归 in physics = highly valued; obscure-school 海归 in marketing = doubt.',
    items: [
      { hanzi: '海归', pinyin: 'hǎi guī', meaning: 'diplômé d\'outre-mer rentré', meaningEn: 'returnee', audio: 'audio/hsk6/hsk6_海归.wav' },
      { hanzi: '留学', pinyin: 'liú xué', meaning: 'étudier à l\'étranger', meaningEn: 'study abroad', audio: 'audio/hsk5/hsk5_留学.wav' },
      { hanzi: '海带', pinyin: 'hǎi dài', meaning: '海归 au chômage (humour)', meaningEn: 'jobless returnee (slang)', audio: 'audio/hsk6/hsk6_海带.wav' },
      { hanzi: '勉强', pinyin: 'miǎn qiǎng', meaning: 'à peine', meaningEn: 'barely', audio: 'audio/hsk5/hsk5_勉强.wav' },
      { hanzi: '失业', pinyin: 'shī yè', meaning: 'chômage', meaningEn: 'unemployment', audio: 'audio/hsk5/hsk5_失业.wav' }
    ],
    tip:
      'Si tu es un 海归 français en quête d\'emploi en Chine : MENTIONNE l\'aspect technique de ta formation (sciences, ingénierie, finance) AVANT le côté culturel. Le marché chinois 2026 valorise l\'expertise concrète plus que le « j\'ai vécu à Paris ». Adapte ton CV à ce nouveau pragmatisme.',
    tipEn:
      'If you\'re a French 海归 seeking work in China: MENTION the technical aspect of your training (science, engineering, finance) BEFORE the cultural side. The 2026 Chinese market values concrete expertise more than «I lived in Paris». Adapt your CV to this new pragmatism.'
  },
  {
    id: 'c12-bourses-systeme',
    title: 'Bourses chinoises et programmes d\'échange',
    titleEn: 'Chinese scholarships and exchange programs',
    body:
      'Le système chinois de bourses fonctionne dans **les deux sens** : entrants étrangers via le CSC, sortants chinois via le 公派. Deadline annuelle décembre-mars pour septembre suivant.\n' +
      '\n' +
      'Pour les **entrants étrangers** — 中国政府奖学金 (CSC) :\n' +
      '- Équivalent du programme Erasmus+ pour étudier en Chine\n' +
      '- Couvre frais de scolarité + logement + assurance\n' +
      '- Allocation mensuelle (~3000-3500 ¥)\n' +
      '- Postuler via l\'ambassade de Chine ou l\'université d\'accueil\n' +
      '\n' +
      'Pour les **sortants chinois** — 国家公派留学 :\n' +
      '- Financement État pour étudier à l\'étranger\n' +
      '- Souvent doctorat avec engagement de retour\n' +
      '\n' +
      'Autres dispositifs :\n' +
      '- 交换生 (jiāohuàn shēng) — semestre/an dans une université partenaire\n' +
      '- 双学位 (shuāngxuéwèi) — double diplôme\n' +
      '\n' +
      'RÈGLE D\'OR : pour étudier dans une 985 (Tsinghua, Pékin) **gratuitement**, le CSC est ta meilleure porte. Pour la lettre 申请理由, mets en avant un **projet de recherche précis** lié à un prof chinois cible — mentionner un prof par son nom = signal de sérieux.',
    bodyEn:
      'For incoming foreigners: 中国政府奖学金 (CSC, China Scholarship Council, equivalent of Erasmus+ to study in China) covers tuition + housing + insurance + monthly allowance (~3000-3500 ¥). Apply via Chinese embassy or host university. For outgoing Chinese: 国家公派留学 (state funding to study abroad), often PhD with return commitment. Exchanges: 交换生 (semester/year at partner university), 双学位 (double degree). To study at a 985 (Tsinghua, Peking) for free, CSC is your BEST entry point. Competitive but accessible with a strong file. Typical deadline: December-March for following September entry.',
    items: [
      { hanzi: '奖学金', pinyin: 'jiǎng xué jīn', meaning: 'bourse', meaningEn: 'scholarship', audio: 'audio/hsk5/hsk5_奖学金.wav' },
      { hanzi: '公派', pinyin: 'gōng pài', meaning: 'envoyé par l\'État', meaningEn: 'state-funded', audio: 'audio/hsk6/hsk6_公派.wav' },
      { hanzi: '交换生', pinyin: 'jiāo huàn shēng', meaning: 'étudiant en échange', meaningEn: 'exchange student', audio: 'audio/hsk6/hsk6_交换.wav' },
      { hanzi: '双学位', pinyin: 'shuāng xué wèi', meaning: 'double diplôme', meaningEn: 'double degree', audio: 'audio/hsk6/hsk6_双.wav' },
      { hanzi: '津贴', pinyin: 'jīn tiē', meaning: 'allocation', meaningEn: 'allowance', audio: 'audio/hsk6/hsk6_津贴.wav' }
    ],
    tip:
      'Pour CSC, la lettre de motivation chinoise (申请理由 shēnqǐng lǐyóu) compte ÉNORMÉMENT. Évite « 我喜欢中国文化 » trop vague. Mets en avant un projet de recherche PRÉCIS lié à un prof chinois cible. Mentionner un prof par son nom + lire 1 de ses articles = signal de sérieux.',
    tipEn:
      'For CSC, the Chinese motivation letter (申请理由) matters HUGELY. Avoid vague «我喜欢中国文化». Highlight a PRECISE research project linked to a target Chinese professor. Mentioning a prof by name + reading 1 of their articles = seriousness signal.'
  }
];

// --- law-society ------------------------------------------------------------

export const c12LawSocietyM1LearnSections: LessonV2LearnSection[] = [
  {
    id: 'c12-droit-hierarchie',
    title: 'Hiérarchie des normes en Chine',
    titleEn: 'Hierarchy of norms in China',
    body:
      'La hiérarchie des normes chinoise est **pyramidale et codifiée** (droit civiliste, pas common law). Les arrêts judiciaires n\'ont **pas valeur de précédent**.\n' +
      '\n' +
      'Hiérarchie des sources de droit (du haut vers le bas) :\n' +
      '- **宪法** (xiànfǎ) — Constitution (1982, amendée 5 fois, dernière en 2018 pour le 3e mandat de Xi Jinping)\n' +
      '- **法律** (fǎlǜ) — lois adoptées par l\'ANP (全国人民代表大会) ou son Comité permanent\n' +
      '- **行政法规** (xíngzhèng fǎguī) — règlements du Conseil d\'État\n' +
      '- **部门规章** (bùmén guīzhāng) — arrêtés ministériels\n' +
      '- **地方性法规** (dìfāngxìng fǎguī) — règlements locaux\n' +
      '\n' +
      'Le code civil unifié **《民法典》** a été promulgué en 2020 — le 1er code civil de l\'histoire de la Chine populaire.\n' +
      '\n' +
      'RÈGLE D\'OR : pour un litige international, exige dans tes contrats sino-étrangers une clause **仲裁** (CIETAC à Pékin, ou HKIAC à HK) plutôt que 诉讼 devant tribunal local chinois. L\'arbitrage est neutre, plus rapide, et reconnu internationalement (Convention de New York).',
    bodyEn:
      'Top: 宪法 (Constitution, adopted 1982, amended 5 times — most recently 2018 to allow Xi Jinping\'s 3rd term). Below: 法律 (laws passed by 全国人民代表大会, NPC — National People\'s Congress, or its Standing Committee). Then: 行政法规 (State Council regulations), 部门规章 (ministerial orders), 地方性法规 (local regulations). Specificity: Chinese LAW is CIVIL (codified, not common law). Judicial rulings DON\'T have precedent value. Unified Civil Code promulgated in 2020 (《民法典》, the 1st civil code in PRC history). For international litigation, REQUIRE in your contracts: jurisdiction + language + applicable law specified.',
    items: [
      { hanzi: '宪法', pinyin: 'xiàn fǎ', meaning: 'Constitution', meaningEn: 'Constitution', audio: 'audio/hsk6/hsk6_宪法.wav' },
      { hanzi: '人大', pinyin: 'rén dà', meaning: 'ANP (Assemblée populaire)', meaningEn: 'NPC', audio: 'audio/hsk6/hsk6_人大.wav' },
      { hanzi: '法规', pinyin: 'fǎ guī', meaning: 'règlement', meaningEn: 'regulation', audio: 'audio/hsk6/hsk6_法规.wav' },
      { hanzi: '民法典', pinyin: 'mín fǎ diǎn', meaning: 'Code civil', meaningEn: 'Civil Code', audio: 'audio/hsk6/hsk6_民法.wav' },
      { hanzi: '管辖', pinyin: 'guǎn xiá', meaning: 'juridiction', meaningEn: 'jurisdiction', audio: 'audio/hsk6/hsk6_管辖.wav' }
    ],
    tip:
      'Pour un contrat sino-étranger : exige une clause d\'arbitrage 仲裁 (CIETAC à Pékin, ou HKIAC à HK) plutôt que 诉讼 devant tribunal local chinois. L\'arbitrage est neutre, plus rapide, et reconnu internationalement (Convention de New York). Différence de capital pour ta protection.',
    tipEn:
      'For a Sino-foreign contract: require a 仲裁 arbitration clause (CIETAC in Beijing, or HKIAC in HK) rather than 诉讼 before local Chinese court. Arbitration is neutral, faster, internationally recognized (New York Convention). Capital difference for your protection.'
  },
  {
    id: 'c12-procedure-acteurs',
    title: 'Procédure et acteurs du procès',
    titleEn: 'Trial procedure and actors',
    body:
      'Le procès chinois fonctionne **sans jury populaire** — uniquement des juges professionnels. Audience publique sauf cas sensibles (mineurs, sécurité d\'État, vie privée).\n' +
      '\n' +
      'Acteurs du procès :\n' +
      '- 原告 (yuángào) — plaignant, dépose 起诉\n' +
      '- 被告 (bèigào) — accusé/défendeur, reçoit 传票\n' +
      '- 律师 (lǜshī) — avocat (chacun a le sien)\n' +
      '- 法官 (fǎguān) — juge instructeur\n' +
      '\n' +
      'Procédure en 2 niveaux :\n' +
      '- **一审** — 1re instance (tribunal de base ou intermédiaire)\n' +
      '- **上诉** → **二审** — appel et 2e instance si insatisfait\n' +
      '\n' +
      'Issues possibles :\n' +
      '- 判决 (pànjué) — jugement\n' +
      '- 调解 (tiáojiě) — médiation (encouragée par le système)\n' +
      '\n' +
      'Peines pénales : 罚款 (amende), 有期徒刑 (prison à durée déterminée), 无期 (perpétuité), 死刑 (peine de mort, encore appliquée).\n' +
      '\n' +
      'RÈGLE D\'OR : si tu es impliqué dans un litige en Chine, prends un **avocat 律师 local spécialisé**. Les avocats étrangers ne peuvent pas plaider en Chine — passage obligé par un cabinet chinois. Coût senior à Pékin/Shanghai : 1000-5000 ¥/h.',
    bodyEn:
      'Plaintiff side: 原告 files 起诉 (suit). Defendant side: 被告 receives 传票 (summons). Representation: each has 律师 (lawyer). 法官 (judge) instructs. Procedure goes through 一审 (1st instance, basic or intermediate court), if dissatisfied: 上诉 (appeal) → 二审 (2nd instance). In China, NO popular jury — only professional judges. Public hearing except sensitive cases (minors, state security, privacy). Outcome: 判决 (judgment) or 调解 (mediation, ENCOURAGED by the system). Criminal penalties: 罚款 (fine), 有期徒刑 (fixed-term prison), 无期 (life), 死刑 (death penalty, still applied). Chinese trials on average FASTER than Western ones.',
    items: [
      { hanzi: '原告', pinyin: 'yuán gào', meaning: 'plaignant', meaningEn: 'plaintiff', audio: 'audio/hsk6/hsk6_原告.wav' },
      { hanzi: '被告', pinyin: 'bèi gào', meaning: 'accusé', meaningEn: 'defendant', audio: 'audio/hsk6/hsk6_被告.wav' },
      { hanzi: '法官', pinyin: 'fǎ guān', meaning: 'juge', meaningEn: 'judge', audio: 'audio/hsk5/hsk5_法官.wav' },
      { hanzi: '律师', pinyin: 'lǜ shī', meaning: 'avocat', meaningEn: 'lawyer', audio: 'audio/hsk4/hsk4_律师.wav' },
      { hanzi: '判决', pinyin: 'pàn jué', meaning: 'jugement', meaningEn: 'judgment', audio: 'audio/hsk6/hsk6_判决.wav' }
    ],
    tip:
      'Si tu es impliqué dans un litige en Chine, 1ère règle : prends un avocat 律师 LOCAL spécialisé dans ton domaine. Les avocats étrangers ne peuvent pas plaider en Chine — ils doivent passer par un cabinet chinois. Préfère un cabinet ayant des associés bilingues. Coût : 1000-5000 ¥/h pour un avocat senior à Pékin/Shanghai.',
    tipEn:
      'If involved in a dispute in China, 1st rule: get a LOCAL 律师 specialized in your field. Foreign lawyers can\'t plead in China — they must go through a Chinese firm. Prefer a firm with bilingual partners. Cost: ¥1000-5000/h for a senior lawyer in Beijing/Shanghai.'
  }
];

export const c12LawSocietyM2LearnSections: LessonV2LearnSection[] = [
  {
    id: 'c12-genre-debat',
    title: 'Débat de genre : féminisme contre 剩女',
    titleEn: 'Gender debate: feminism vs 剩女',
    body:
      'En Chine, le **女权主义** (féminisme) reste un mouvement contesté, parfois censuré sur les réseaux sociaux (Weibo a fermé plusieurs comptes féministes en 2021-22). Sujet politiquement sensible.\n' +
      '\n' +
      'Vocabulaire-clé du débat :\n' +
      '- 女权 (nǚquán) — droits des femmes\n' +
      '- 剩女 (shèng nǚ) — « femmes restantes » (femmes 27+ non mariées)\n' +
      '- 催婚 (cuī hūn) — pression à se marier\n' +
      '- 全职妈妈 (quánzhí māma) — mère au foyer\n' +
      '\n' +
      'Jalons et tensions :\n' +
      '- Le terme **剩女** a été propagé par la All-China Women\'s Federation pour pousser au mariage — vu critiquement comme outil de contrôle social\n' +
      '- Mouvement #MeToo chinois (2018) — explosion brève puis répression\n' +
      '- Cas Peng Shuai (2021) — joueuse de tennis, accusations contre un ex-vice-PM, disparition publique\n' +
      '- Phénomène 全职妈妈 ré-émerge avec la politique « 3 enfants » + difficultés des crèches\n' +
      '\n' +
      'RÈGLE D\'OR : pour discuter féminisme avec une amie chinoise, **écoute plus que tu ne parles**. Le contexte est complexe — pression familiale 催婚, censure étatique, débats internes. Pose **你怎么看？** — évite de plaquer un cadre occidental.',
    bodyEn:
      'In China, 女权主义 (feminism) remains a contested movement, sometimes censored on social media (Weibo shut down several feminist accounts in 2021-22). The term 剩女 («leftover women») was propagated by the State (All-China Women\'s Federation campaign) to push 27+ women to marry quickly. Seen critically as a social control tool. Chinese #MeToo movement (2018): brief explosion, then crackdown. Iconic case: Peng Shuai (tennis player, 2021, accusations against an ex-vice-PM — public disappearance). Discourse for women: simultaneous pressure to marry, have children, AND succeed in career. 全职妈妈 (stay-at-home mother) phenomenon re-emerging under the 3-child policy + daycare difficulties.',
    items: [
      { hanzi: '女权', pinyin: 'nǚ quán', meaning: 'droits des femmes', meaningEn: 'women\'s rights', audio: 'audio/hsk6/hsk6_女权.wav' },
      { hanzi: '剩女', pinyin: 'shèng nǚ', meaning: 'femme «restante»', meaningEn: 'leftover woman', audio: 'audio/hsk6/hsk6_剩女.wav' },
      { hanzi: '歧视', pinyin: 'qí shì', meaning: 'discrimination', meaningEn: 'discrimination', audio: 'audio/hsk6/hsk6_歧视.wav' },
      { hanzi: '全职', pinyin: 'quán zhí', meaning: 'temps plein', meaningEn: 'full-time', audio: 'audio/hsk5/hsk5_全职.wav' },
      { hanzi: '催婚', pinyin: 'cuī hūn', meaning: 'pousser à se marier', meaningEn: 'push to marry', audio: 'audio/hsk6/hsk6_催婚.wav' }
    ],
    tip:
      'Si tu discutes féminisme avec une amie chinoise, ÉCOUTE plus que tu ne parles. Le contexte chinois est complexe — pression familiale 催婚, censure étatique, débats internes au mouvement. Pose : « 你怎么看 ? ». Évite de plaquer un cadre occidental — ça frustre.',
    tipEn:
      'Discussing feminism with a Chinese friend, LISTEN more than you speak. The Chinese context is complex — family pressure 催婚, state censorship, internal movement debates. Ask: «你怎么看?». Avoid imposing a Western frame — it frustrates.'
  },
  {
    id: 'c12-natalite-politiques',
    title: 'Natalité : 一孩 → 二孩 → 三孩',
    titleEn: 'Birthrate: 一孩 → 二孩 → 三孩',
    body:
      'La politique **计划生育** (planification familiale) a transformé la démographie chinoise en 40 ans — avec des effets longs et un retournement majeur en 2022 (population qui diminue pour la 1re fois depuis 1961).\n' +
      '\n' +
      'Évolution de la politique :\n' +
      '- **1978 — 一孩** : 1 enfant imposé sous Deng Xiaoping pour freiner la croissance\n' +
      '- **2016 — 二孩** : 2 enfants autorisés\n' +
      '- **2021 — 三孩** : 3 enfants, en réaction à l\'effondrement de la natalité (effet minime)\n' +
      '\n' +
      'Conséquences de la politique 一孩 :\n' +
      '- 30M+ avortements forcés / stérilisations\n' +
      '- Déséquilibre filles/garçons (manque de 30M de femmes)\n' +
      '- Génération 独生子女 (enfants uniques) avec poids familial concentré\n' +
      '\n' +
      'Pourquoi 三孩 ne décolle pas :\n' +
      '- Société urbaine a intégré la culture de l\'enfant unique\n' +
      '- Coût élevé du logement, éducation, garderie = peu d\'envie\n' +
      '- L\'Inde dépasse la Chine en population en **2023**\n' +
      '\n' +
      'RÈGLE D\'OR : en 2026, la natalité chinoise est un **sujet stratégique**. Phrase passe-partout en analyse économique — **人口老龄化是中国未来 30 年最大的挑战之一** (le vieillissement est l\'un des plus grands défis de la Chine pour les 30 prochaines années).',
    bodyEn:
      'Family planning policy 计划生育: 一孩 (1 child) imposed in 1978 under Deng Xiaoping to curb growth. Consequences: 30M+ forced abortions/sterilizations, gender imbalance (30M-woman shortage), 独生子女 (only-child) generation. 2016: 二孩 (2 children allowed). 2021: 三孩 (3 children, reacting to birthrate collapse). Effect: MINIMAL. Urban society has INTERNALIZED only-child culture + high housing/education/daycare costs = little desire. 2022: for the 1st time since 1961, Chinese POPULATION DECLINED. India overtakes China in population in 2023. Accelerated aging: major 21st-century challenge for China.',
    items: [
      { hanzi: '计划生育', pinyin: 'jì huà shēng yù', meaning: 'planification familiale', meaningEn: 'family planning', audio: 'audio/hsk6/hsk6_计划.wav' },
      { hanzi: '独生子女', pinyin: 'dú shēng zǐ nǚ', meaning: 'enfant unique', meaningEn: 'only child', audio: 'audio/hsk6/hsk6_独生.wav' },
      { hanzi: '出生率', pinyin: 'chū shēng lǜ', meaning: 'taux de natalité', meaningEn: 'birthrate', audio: 'audio/hsk6/hsk6_出生.wav' },
      { hanzi: '老龄化', pinyin: 'lǎo líng huà', meaning: 'vieillissement', meaningEn: 'aging', audio: 'audio/hsk6/hsk6_老龄.wav' },
      { hanzi: '人口', pinyin: 'rén kǒu', meaning: 'population', meaningEn: 'population', audio: 'audio/hsk4/hsk4_人口.wav' }
    ],
    tip:
      'En 2026, la natalité chinoise est UN sujet stratégique. Si tu discutes économie chinoise, mentionne le défi démographique : « 人口老龄化是中国未来 30 年最大的挑战之一 » (le vieillissement est l\'un des plus grands défis de la Chine pour les 30 prochaines années). Phrase passe-partout d\'analyse économique.',
    tipEn:
      'In 2026, Chinese birthrate is a STRATEGIC topic. Discussing Chinese economy, mention the demographic challenge: «人口老龄化是中国未来 30 年最大的挑战之一» (aging is one of China\'s biggest challenges for the next 30 years). Catch-all phrase of economic analysis.'
  }
];

export const c12LawSocietyM3LearnSections: LessonV2LearnSection[] = [
  {
    id: 'c12-cyber-firewall',
    title: '防火长城 — la grande muraille numérique',
    titleEn: '防火长城 — the great digital wall',
    body:
      'Le **防火长城** (fánghuǒchángchéng, « grande muraille de feu »), surnom officieux du Great Firewall (nom officiel : 网络长城), bloque l\'accès aux principaux services occidentaux en Chine.\n' +
      '\n' +
      'Services bloqués vs équivalents chinois :\n' +
      '- Google → 百度 (bǎidù)\n' +
      '- WhatsApp → 微信 (Wēixìn / WeChat)\n' +
      '- Twitter/X → 微博 (wēi bó)\n' +
      '- TikTok → 抖音 (dǒu yīn)\n' +
      '- YouTube → 哔哩哔哩 (Bìlībìlī / Bilibili)\n' +
      '- Aussi bloqués : FB, Instagram, Wikipedia partiel, NYT, BBC Chinese\n' +
      '\n' +
      'Contournement — **翻墙** (fānqiáng, « sauter le mur ») :\n' +
      '- Utilisation d\'un VPN\n' +
      '- Zone grise légale — toléré pour étrangers + chercheurs, plus risqué pour citoyens chinois\n' +
      '- En 2026, le GFW est **plus efficace** qu\'en 2015 — beaucoup de VPN gratuits bloqués\n' +
      '\n' +
      'RÈGLE D\'OR : si tu pars en Chine, **installe ton VPN avant de quitter ton pays** (les sites de VPN sont bloqués depuis la Chine). Choisis un VPN d\'entreprise (Astrill, ExpressVPN, NordVPN) — sans VPN fonctionnel, tu seras coupé de WhatsApp/Gmail/Instagram dès l\'atterrissage.',
    bodyEn:
      '防火长城 («Great Wall of Fire») = unofficial nickname for the Great Firewall (GFW). Official: 网络长城. Blocks Western services (Google, FB, Twitter/X, YouTube, Instagram, WhatsApp, partial Wikipedia, NYT, BBC Chinese, etc.). Chinese substitutes: 百度 (Baidu) for Google, 微信 (WeChat) for WhatsApp, 微博 (Weibo) for Twitter, 抖音 (Douyin) for TikTok, 哔哩哔哩 (Bilibili) for YouTube. Bypass: 翻墙 («jump the wall» = use a VPN). Legally gray area — tolerated for foreigners + researchers, riskier for Chinese citizens. In 2026, the GFW is more EFFECTIVE than in 2015 — many VPNs blocked. If you live in China, prepare a RELIABLE corporate VPN before arrival.',
    items: [
      { hanzi: '防火长城', pinyin: 'fáng huǒ cháng chéng', meaning: 'Great Firewall', meaningEn: 'Great Firewall', audio: 'audio/hsk6/hsk6_防火.wav' },
      { hanzi: '翻墙', pinyin: 'fān qiáng', meaning: 'sauter le mur (VPN)', meaningEn: 'jump the wall (VPN)', audio: 'audio/hsk6/hsk6_翻墙.wav' },
      { hanzi: '微信', pinyin: 'wēi xìn', meaning: 'WeChat', meaningEn: 'WeChat', audio: 'audio/hsk5/hsk5_微信.wav' },
      { hanzi: '微博', pinyin: 'wēi bó', meaning: 'Weibo', meaningEn: 'Weibo', audio: 'audio/hsk6/hsk6_微博.wav' },
      { hanzi: '哔哩哔哩', pinyin: 'bì lī bì lī', meaning: 'Bilibili', meaningEn: 'Bilibili', audio: 'audio/hsk6/hsk6_哔哩.wav' }
    ],
    tip:
      'Si tu pars en Chine en 2026, INSTALLE ton VPN AVANT de quitter ton pays (les sites de VPN sont bloqués depuis la Chine). Choisis un VPN d\'entreprise (Astrill, ExpressVPN, NordVPN) plutôt qu\'un gratuit. Sans VPN fonctionnel, tu seras coupé de WhatsApp/Gmail/Instagram dès l\'atterrissage.',
    tipEn:
      'If you go to China in 2026, INSTALL your VPN BEFORE leaving your country (VPN sites are blocked from China). Choose a corporate VPN (Astrill, ExpressVPN, NordVPN) over a free one. Without a working VPN, you\'ll be cut off from WhatsApp/Gmail/Instagram at landing.'
  },
  {
    id: 'c12-cyber-loi',
    title: '网络安全法 + 数据安全 + 敏感词',
    titleEn: '网络安全法 + 数据安全 + 敏感词',
    body:
      'L\'arsenal légal chinois sur la cybersécurité et les données s\'est densifié entre 2017 et 2021. Côté contenu, les **敏感词** (mots-clés sensibles) filtrent silencieusement les messages sur WeChat / Weibo.\n' +
      '\n' +
      'Les 3 lois-piliers :\n' +
      '- **网络安全法** (2017) — hébergement local des données personnelles + coopération avec autorités + certification des équipements critiques\n' +
      '- **数据安全法** (2021) — sécurité des données\n' +
      '- **个人信息保护法 / PIPL** (2021) — équivalent du RGPD, **plus strict côté étatique**\n' +
      '\n' +
      'Conséquence pour une entreprise étrangère : **haut coût de conformité** (audit, hébergement, transferts encadrés).\n' +
      '\n' +
      'Exemples de **敏感词** filtrés :\n' +
      '- **64** (= 4 juin 1989, Tiananmen)\n' +
      '- Noms de dissidents : 刘晓波, 艾未未\n' +
      '- Références au Tibet / Xinjiang / Falun Gong\n' +
      '\n' +
      'RÈGLE D\'OR : en Chine, sépare tes discussions sensibles. Pour les sujets délicats — **en personne sans téléphone** ou via **Signal hors GFW** (avec VPN). Évite WeChat pour tout sujet sensible — tout est lisible par les autorités. Cette discipline protège tes interlocuteurs chinois autant que toi.',
    bodyEn:
      '网络安全法 (Cybersecurity Law, 2017) imposes: (1) local hosting of Chinese personal data, (2) cooperation with authorities, (3) certification of critical equipment. 2021 laws: 数据安全法 (Data Security Law) + 个人信息保护法 (PIPL — equivalent of European GDPR, but stricter on state side). For a foreign company operating in China: high compliance cost (audit, hosting, regulated transfers). Content censorship via 敏感词 (auto-filtered keywords): 64 (= June 4, 1989, Tiananmen), dissident names (刘晓波, 艾未未), references to Tibet/Xinjiang/Falun Gong. On WeChat, Weibo, etc., a message containing a 敏感词 can be silently DELETED. Avoid these topics online in China — basic prudence rule.',
    items: [
      { hanzi: '网络安全', pinyin: 'wǎng luò ān quán', meaning: 'cybersécurité', meaningEn: 'cybersecurity', audio: 'audio/hsk6/hsk6_网络.wav' },
      { hanzi: '数据安全', pinyin: 'shù jù ān quán', meaning: 'sécurité des données', meaningEn: 'data security', audio: 'audio/hsk6/hsk6_数据.wav' },
      { hanzi: '个人信息', pinyin: 'gè rén xìn xī', meaning: 'données personnelles', meaningEn: 'personal data', audio: 'audio/hsk5/hsk5_个人.wav' },
      { hanzi: '敏感词', pinyin: 'mǐn gǎn cí', meaning: 'mot sensible', meaningEn: 'sensitive word', audio: 'audio/hsk6/hsk6_敏感.wav' },
      { hanzi: '过滤', pinyin: 'guò lǜ', meaning: 'filtrer', meaningEn: 'filter', audio: 'audio/hsk6/hsk6_过滤.wav' }
    ],
    tip:
      'En Chine, sépare TES discussions sensibles : (1) en personne sans téléphone à proximité, (2) via Signal hors GFW (avec VPN). Évite WeChat pour TOUT sujet sensible — tout est lisible par les autorités. Cette discipline protège tes interlocuteurs chinois autant que toi.',
    tipEn:
      'In China, separate YOUR sensitive discussions: (1) in person with no phone nearby, (2) via Signal outside the GFW (with VPN). Avoid WeChat for ANY sensitive topic — everything is readable by authorities. This discipline protects your Chinese interlocutors as much as you.'
  }
];
