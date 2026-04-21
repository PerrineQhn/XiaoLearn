/**
 * cecr-b2-texts.ts
 * ----------------
 * Textes authentiques longs pour B2.1 (extension V8) :
 *   - articles originaux (tech, économie, société),
 *   - dialogues longs multi-tours (30-50 répliques),
 *   - extrait du domaine public (Analectes de Confucius simplifiés).
 *
 * Format strictement identique à `readings.ts` et `dialogues.ts` (même types
 * ReadingEntry / DialogueEntry). Les entrées sont spreadées à la fin de
 * leurs tableaux respectifs pour être visibles par getReadingById /
 * getDialogueById — pas besoin de modifier les pages consommatrices.
 *
 * Les attaches module → id se font via cecr-dialogue-reading-attach.ts
 * (on y ajoutera 3-4 clés B2.1 supplémentaires).
 */

import type { DialogueEntry } from './dialogues';
import type { ReadingEntry } from './readings';

// ============================================================================
//  ARTICLES ORIGINAUX — B2.1
// ============================================================================

const AI_AND_WORK: ReadingEntry = {
  cecrLevel: 'b2.1',
  theme: 'IA et travail',
  themeEn: 'AI and work',
  reading: {
    id: 'rd-b21-ai-work',
    title: "L'IA au bureau : remplace-t-elle vraiment les employés ?",
    titleEn: 'AI at the office: is it really replacing employees?',
    intro: "Article original de niveau B2.1, inspiré de débats actuels sur l'IA générative et l'emploi. Rédigé pour XiaoLearn — vocabulaire technique et connecteurs formels.",
    introEn: 'Original B2.1 article inspired by current debates on generative AI and employment. Written for XiaoLearn — technical vocabulary and formal connectors.',
    segments: [
      {
        hanzi: '过去两年，人工智能的迅速发展在全球范围内引起了广泛的讨论。',
        pinyin: 'Guòqù liǎng nián, réngōng zhìnéng de xùnsù fāzhǎn zài quánqiú fànwéi nèi yǐnqǐle guǎngfàn de tǎolùn.',
        translationFr: "Ces deux dernières années, l'essor rapide de l'intelligence artificielle a suscité de larges discussions au niveau mondial.",
        translationEn: 'Over the past two years, the rapid rise of AI has sparked wide-ranging discussions worldwide.'
      },
      {
        hanzi: '许多人担心，大模型和自动化工具会取代他们的工作，导致失业率上升。',
        pinyin: 'Xǔduō rén dānxīn, dà móxíng hé zìdònghuà gōngjù huì qǔdài tāmen de gōngzuò, dǎozhì shīyèlǜ shàngshēng.',
        translationFr: 'Beaucoup craignent que les grands modèles et les outils d\'automatisation ne remplacent leur travail et ne fassent grimper le chômage.',
        translationEn: 'Many fear that large models and automation tools will replace their jobs and drive unemployment up.'
      },
      {
        hanzi: '然而，最近的研究显示，情况并非如此简单。',
        pinyin: 'Rán\'ér, zuìjìn de yánjiū xiǎnshì, qíngkuàng bìngfēi rúcǐ jiǎndān.',
        translationFr: 'Cependant, des études récentes montrent que la situation n\'est pas aussi simple.',
        translationEn: 'However, recent research shows the situation is not that simple.'
      },
      {
        hanzi: '一方面，人工智能确实取代了一些重复性强的工作，例如基础的客服和数据录入。',
        pinyin: 'Yī fāngmiàn, réngōng zhìnéng quèshí qǔdàile yīxiē chóngfùxìng qiáng de gōngzuò, lìrú jīchǔ de kèfú hé shùjù lùrù.',
        translationFr: "D'un côté, l'IA remplace effectivement des métiers très répétitifs, comme le service client de base et la saisie de données.",
        translationEn: 'On one hand, AI has indeed replaced some highly repetitive roles, such as basic customer service and data entry.'
      },
      {
        hanzi: '另一方面，它也创造了新的职业，比如模型工程师、提示词设计师和数据标注员。',
        pinyin: 'Lìng yī fāngmiàn, tā yě chuàngzàole xīn de zhíyè, bǐrú móxíng gōngchéngshī, tíshìcí shèjìshī hé shùjù biāozhùyuán.',
        translationFr: "D'un autre côté, elle crée de nouveaux métiers comme ingénieur modèle, prompt designer et annotateur de données.",
        translationEn: 'On the other hand, it has created new roles such as model engineer, prompt designer and data labeler.'
      },
      {
        hanzi: '根据麦肯锡今年发布的报告，全球大约百分之六十的职业会受到人工智能的影响，但完全被取代的不到百分之十。',
        pinyin: 'Gēnjù Màikěnxī jīnnián fābù de bàogào, quánqiú dàyuē bǎi fēn zhī liùshí de zhíyè huì shòudào réngōng zhìnéng de yǐngxiǎng, dàn wánquán bèi qǔdài de bùdào bǎi fēn zhī shí.',
        translationFr: "Selon un rapport publié par McKinsey cette année, environ 60 % des emplois dans le monde seront affectés par l'IA, mais moins de 10 % seront entièrement remplacés.",
        translationEn: 'According to a McKinsey report released this year, about 60% of jobs worldwide will be affected by AI, but fewer than 10% will be fully replaced.'
      },
      {
        hanzi: '换句话说，更多的岗位会发生变化，而不是消失。',
        pinyin: 'Huàn jù huàshuō, gèng duō de gǎngwèi huì fāshēng biànhuà, ér bùshì xiāoshī.',
        translationFr: 'Autrement dit, davantage de postes vont évoluer plutôt que disparaître.',
        translationEn: 'In other words, more positions will change rather than disappear.'
      },
      {
        hanzi: '对于企业来说，关键的挑战不是是否要使用人工智能，而是如何让员工与人工智能协作。',
        pinyin: 'Duìyú qǐyè láishuō, guānjiàn de tiǎozhàn bùshì shìfǒu yào shǐyòng réngōng zhìnéng, érshì rúhé ràng yuángōng yǔ réngōng zhìnéng xiézuò.',
        translationFr: "Pour les entreprises, l'enjeu n'est pas de décider si elles doivent utiliser l'IA, mais de faire collaborer leurs employés avec elle.",
        translationEn: "For companies, the key challenge isn't whether to use AI, but how to make employees collaborate with it."
      },
      {
        hanzi: '培训、再教育和内部转岗已成为许多公司的优先策略。',
        pinyin: 'Péixùn, zài jiàoyù hé nèibù zhuǎn gǎng yǐ chéngwéi xǔduō gōngsī de yōuxiān cèlüè.',
        translationFr: 'La formation, la requalification et la mobilité interne sont devenues des stratégies prioritaires dans beaucoup d\'entreprises.',
        translationEn: 'Training, reskilling and internal mobility have become priority strategies in many companies.'
      },
      {
        hanzi: '此外，政府的角色也十分重要。',
        pinyin: 'Cǐwài, zhèngfǔ de juésè yě shífēn zhòngyào.',
        translationFr: 'En outre, le rôle des gouvernements est également crucial.',
        translationEn: 'Moreover, the role of governments is also essential.'
      },
      {
        hanzi: '通过税收、补贴和教育投入，政府可以减少技术变革带来的不平等。',
        pinyin: 'Tōngguò shuìshōu, bǔtiē hé jiàoyù tóurù, zhèngfǔ kěyǐ jiǎnshǎo jìshù biàngé dàilái de bù píngděng.',
        translationFr: 'Grâce à la fiscalité, aux subventions et aux investissements éducatifs, les gouvernements peuvent réduire les inégalités provoquées par la révolution technologique.',
        translationEn: 'Through taxation, subsidies and investment in education, governments can reduce the inequalities caused by technological change.'
      },
      {
        hanzi: '总之，人工智能既不是万能药，也不是世界末日。',
        pinyin: 'Zǒngzhī, réngōng zhìnéng jì bùshì wànnéng yào, yě bùshì shìjiè mòrì.',
        translationFr: "En somme, l'intelligence artificielle n'est ni une panacée, ni la fin du monde.",
        translationEn: 'In short, AI is neither a cure-all nor the end of the world.'
      },
      {
        hanzi: '它是一把双刃剑，关键在于我们如何使用它。',
        pinyin: 'Tā shì yī bǎ shuāngrèn jiàn, guānjiàn zàiyú wǒmen rúhé shǐyòng tā.',
        translationFr: "C'est une arme à double tranchant ; tout dépend de la manière dont nous l'utilisons.",
        translationEn: "It's a double-edged sword — everything depends on how we use it."
      }
    ],
    vocab: [
      '人工智能', '大模型', '自动化', '失业率', '取代', '提示词',
      '数据标注', '岗位', '再教育', '转岗', '补贴', '不平等', '双刃剑'
    ],
    questions: [
      {
        questionFr: "D'après l'article, quel est le pourcentage d'emplois entièrement remplacés par l'IA ?",
        questionEn: 'According to the article, what percentage of jobs are fully replaced by AI?',
        answerFr: 'Moins de 10 %.',
        answerEn: 'Fewer than 10%.'
      },
      {
        questionFr: "Pourquoi l'auteur parle-t-il d'une « arme à double tranchant » ?",
        questionEn: 'Why does the author speak of a "double-edged sword"?',
        answerFr: "Parce que l'IA peut à la fois détruire et créer des emplois — son effet dépend de l'usage qu'on en fait.",
        answerEn: 'Because AI can both destroy and create jobs — its effect depends on how we use it.'
      },
      {
        questionFr: 'Quel rôle peut jouer le gouvernement selon le texte ?',
        questionEn: 'What role can governments play according to the text?',
        answerFr: "Réduire les inégalités via la fiscalité, les subventions et l'investissement dans l'éducation.",
        answerEn: 'Reduce inequalities through taxation, subsidies and investment in education.'
      }
    ]
  }
};

const POST_PANDEMIC_ECONOMY: ReadingEntry = {
  cecrLevel: 'b2.1',
  theme: 'Économie post-pandémie',
  themeEn: 'Post-pandemic economy',
  reading: {
    id: 'rd-b21-post-pandemic-economy',
    title: 'La reprise économique chinoise : entre espoirs et obstacles',
    titleEn: "China's economic recovery: between hopes and hurdles",
    intro: "Article d'analyse macro-économique B2.1. Chiffres fictifs (ordre de grandeur réaliste) pour illustrer le vocabulaire des marchés et des politiques publiques.",
    introEn: 'B2.1 macro-economic analysis article. Figures are illustrative (realistic orders of magnitude) to showcase market and public-policy vocabulary.',
    segments: [
      {
        hanzi: '疫情之后，中国的经济复苏比许多人预期的要慢。',
        pinyin: 'Yìqíng zhīhòu, Zhōngguó de jīngjì fùsū bǐ xǔduō rén yùqí de yào màn.',
        translationFr: "Après la pandémie, la reprise économique de la Chine est plus lente que beaucoup ne s'y attendaient.",
        translationEn: "After the pandemic, China's economic recovery is slower than many expected."
      },
      {
        hanzi: '去年的国内生产总值增长率只有百分之四点六，低于过去十年的平均水平。',
        pinyin: 'Qùnián de guónèi shēngchǎn zǒngzhí zēngzhǎnglǜ zhǐyǒu bǎi fēn zhī sì diǎn liù, dī yú guòqù shí nián de píngjūn shuǐpíng.',
        translationFr: "Le taux de croissance du PIB de l'an dernier n'a été que de 4,6 %, en deçà de la moyenne de la dernière décennie.",
        translationEn: "Last year's GDP growth rate was only 4.6%, below the average of the past decade."
      },
      {
        hanzi: '主要原因包括出口下降、房地产市场疲软和消费信心不足。',
        pinyin: 'Zhǔyào yuányīn bāokuò chūkǒu xiàjiàng, fángdìchǎn shìchǎng píruǎn hé xiāofèi xìnxīn bùzú.',
        translationFr: "Les causes principales incluent la baisse des exportations, la faiblesse de l'immobilier et le manque de confiance des consommateurs.",
        translationEn: 'The main causes include falling exports, a weak real-estate market and low consumer confidence.'
      },
      {
        hanzi: '面对这些挑战，中央银行多次降息，试图刺激贷款和投资。',
        pinyin: 'Miànduì zhèxiē tiǎozhàn, zhōngyāng yínháng duō cì jiàngxī, shìtú cìjī dàikuǎn hé tóuzī.',
        translationFr: 'Face à ces défis, la banque centrale a abaissé ses taux à plusieurs reprises pour stimuler crédit et investissement.',
        translationEn: 'Facing these challenges, the central bank has cut interest rates several times to stimulate lending and investment.'
      },
      {
        hanzi: '然而，利率下降并没有立即带来明显的效果。',
        pinyin: 'Rán\'ér, lìlǜ xiàjiàng bìng méiyǒu lìjí dàilái míngxiǎn de xiàoguǒ.',
        translationFr: "Cependant, la baisse des taux n'a pas eu d'effet visible immédiat.",
        translationEn: "However, the rate cuts have not produced visible effects immediately."
      },
      {
        hanzi: '一些经济学家认为，结构性问题比短期的货币政策更难解决。',
        pinyin: 'Yīxiē jīngjìxuéjiā rènwéi, jiégòuxìng wèntí bǐ duǎnqī de huòbì zhèngcè gèng nán jiějué.',
        translationFr: 'Certains économistes estiment que les problèmes structurels sont plus difficiles à résoudre que la politique monétaire de court terme.',
        translationEn: 'Some economists argue that structural problems are harder to solve than short-term monetary policy.'
      },
      {
        hanzi: '例如，老龄化使劳动力减少，青年失业率却保持在百分之十五以上。',
        pinyin: 'Lìrú, lǎolínghuà shǐ láodònglì jiǎnshǎo, qīngnián shīyèlǜ què bǎochí zài bǎi fēn zhī shíwǔ yǐshàng.',
        translationFr: "Par exemple, le vieillissement réduit la main-d'œuvre, alors que le chômage des jeunes reste au-dessus de 15 %.",
        translationEn: 'For instance, aging reduces the labor force, while youth unemployment remains above 15%.'
      },
      {
        hanzi: '与此同时，新能源汽车、绿色技术和高端制造业却表现亮眼。',
        pinyin: 'Yǔcǐtóngshí, xīn néngyuán qìchē, lǜsè jìshù hé gāoduān zhìzàoyè què biǎoxiàn liàngyǎn.',
        translationFr: 'Dans le même temps, les véhicules à énergies nouvelles, les technologies vertes et la fabrication haut de gamme affichent de beaux résultats.',
        translationEn: 'At the same time, new-energy vehicles, green technology and high-end manufacturing are performing strongly.'
      },
      {
        hanzi: '这些领域的出口数据连续三个季度增长超过百分之二十。',
        pinyin: 'Zhèxiē lǐngyù de chūkǒu shùjù liánxù sān gè jìdù zēngzhǎng chāoguò bǎi fēn zhī èrshí.',
        translationFr: "Les exportations de ces secteurs ont progressé de plus de 20 % trois trimestres d'affilée.",
        translationEn: 'Exports in these sectors have grown more than 20% for three consecutive quarters.'
      },
      {
        hanzi: '分析人士指出，中国的经济正在从\u201c高速度\u201d转向\u201c高质量\u201d。',
        pinyin: 'Fēnxī rénshì zhǐchū, Zhōngguó de jīngjì zhèngzài cóng "gāo sùdù" zhuǎnxiàng "gāo zhìliàng".',
        translationFr: "Les analystes soulignent que l'économie chinoise passe de « haute vitesse » à « haute qualité ».",
        translationEn: 'Analysts note that the Chinese economy is shifting from "high speed" to "high quality."'
      },
      {
        hanzi: '这种转型需要时间，也需要国际市场的配合。',
        pinyin: 'Zhè zhǒng zhuǎnxíng xūyào shíjiān, yě xūyào guójì shìchǎng de pèihé.',
        translationFr: 'Une telle transformation demande du temps, mais aussi la coopération des marchés internationaux.',
        translationEn: 'This transformation takes time and also requires cooperation from international markets.'
      },
      {
        hanzi: '简而言之，中国经济面临的不是简单的衰退，而是复杂的结构调整。',
        pinyin: 'Jiǎn\'éryánzhī, Zhōngguó jīngjì miànlín de bùshì jiǎndān de shuāituì, érshì fùzá de jiégòu tiáozhěng.',
        translationFr: "En bref, l'économie chinoise n'est pas confrontée à une simple récession mais à un ajustement structurel complexe.",
        translationEn: 'In short, the Chinese economy is facing not a simple recession but a complex structural adjustment.'
      }
    ],
    vocab: [
      '复苏', '国内生产总值', '房地产', '消费信心', '降息', '结构性问题',
      '老龄化', '青年失业率', '新能源汽车', '转型', '衰退', '结构调整'
    ],
    questions: [
      {
        questionFr: "Quel était le taux de croissance du PIB chinois l'an dernier ?",
        questionEn: "What was China's GDP growth rate last year?",
        answerFr: '4,6 %.',
        answerEn: '4.6%.'
      },
      {
        questionFr: 'Quels secteurs affichent les meilleures performances ?',
        questionEn: 'Which sectors are performing best?',
        answerFr: 'Les véhicules à énergies nouvelles, les technologies vertes et la fabrication haut de gamme.',
        answerEn: 'New-energy vehicles, green technology and high-end manufacturing.'
      }
    ]
  }
};

// ============================================================================
//  EXTRAIT DU DOMAINE PUBLIC — Analectes de Confucius, adaptation B2.1
// ============================================================================

const ANALECTS_EXCERPT: ReadingEntry = {
  cecrLevel: 'b2.1',
  theme: 'Confucius — sagesse classique',
  themeEn: 'Confucius — classical wisdom',
  reading: {
    id: 'rd-b21-analects-excerpt',
    title: 'Trois maximes des Analectes (extraits simplifiés)',
    titleEn: 'Three maxims from the Analects (simplified excerpts)',
    intro: "Passage d'introduction à la prose classique. Chaque maxime est suivie d'une glose moderne pour aider à la comprendre. Texte intégralement dans le domaine public (Analectes, ≈ -500 av. J.-C.) ; les gloses sont originales XiaoLearn.",
    introEn: 'Introduction to classical prose. Each maxim is followed by a modern gloss. The source text is in the public domain (Analects, ≈ 500 BCE); the glosses are original to XiaoLearn.',
    segments: [
      {
        hanzi: '子曰：学而时习之，不亦说乎？',
        pinyin: 'Zǐ yuē: Xué ér shí xí zhī, bù yì yuè hū?',
        translationFr: "Le Maître dit : apprendre et remettre sans cesse en pratique ce qu'on a appris, n'est-ce pas une joie ?",
        translationEn: 'The Master said: to learn and constantly put into practice what one has learned, is this not a joy?'
      },
      {
        hanzi: '（现代释义：真正的学习不只是记忆，还要通过反复的练习把知识变成能力。）',
        pinyin: '(Xiàndài shìyì: Zhēnzhèng de xuéxí bùzhǐ shì jìyì, hái yào tōngguò fǎnfù de liànxí bǎ zhīshì biànchéng nénglì.)',
        translationFr: "(Glose moderne : apprendre ne se réduit pas à mémoriser ; il faut, par la pratique répétée, transformer les connaissances en compétences.)",
        translationEn: '(Modern gloss: true learning is more than memorization; through repeated practice, knowledge must become skill.)'
      },
      {
        hanzi: '子曰：温故而知新，可以为师矣。',
        pinyin: 'Zǐ yuē: Wēn gù ér zhī xīn, kěyǐ wéi shī yǐ.',
        translationFr: "Le Maître dit : revisiter l'ancien pour en tirer du neuf, voilà qui suffit à faire un maître.",
        translationEn: "The Master said: to review the old and glean something new — that is enough to become a teacher."
      },
      {
        hanzi: '（现代释义：只有不断回顾已有的知识，才能在其中发现新的意义，这是教育者和学习者的共同能力。）',
        pinyin: '(Xiàndài shìyì: Zhǐyǒu bùduàn huígù yǐyǒu de zhīshì, cái néng zài qízhōng fāxiàn xīn de yìyì, zhè shì jiàoyùzhě hé xuéxízhě de gòngtóng nénglì.)',
        translationFr: "(Glose moderne : ce n'est qu'en revenant sans cesse aux savoirs acquis qu'on peut y découvrir de nouveaux sens — compétence partagée entre enseignants et apprenants.)",
        translationEn: '(Modern gloss: only by revisiting acquired knowledge can one discover new meanings — a capacity shared by teachers and learners.)'
      },
      {
        hanzi: '子曰：三人行，必有我师焉。',
        pinyin: 'Zǐ yuē: Sān rén xíng, bì yǒu wǒ shī yān.',
        translationFr: 'Le Maître dit : parmi trois personnes qui marchent ensemble, il y a forcément quelqu\'un dont je peux apprendre.',
        translationEn: 'The Master said: when three walk together, there is always someone from whom I can learn.'
      },
      {
        hanzi: '（现代释义：每个人身上都有值得我们学习的地方，无论职位或年龄。）',
        pinyin: '(Xiàndài shìyì: Měi gèrén shēnshang dōu yǒu zhídé wǒmen xuéxí de dìfāng, wúlùn zhíwèi huò niánlíng.)',
        translationFr: "(Glose moderne : chez chacun, il y a quelque chose qui mérite d'être appris, quel que soit son statut ou son âge.)",
        translationEn: '(Modern gloss: in everyone, there is something worth learning, regardless of rank or age.)'
      },
      {
        hanzi: '这三句话共同强调：学习是终身的，也是谦逊的。',
        pinyin: 'Zhè sān jù huà gòngtóng qiángdiào: Xuéxí shì zhōngshēn de, yěshì qiānxùn de.',
        translationFr: 'Ces trois phrases soulignent ensemble : apprendre est à la fois une affaire de toute une vie et un exercice d\'humilité.',
        translationEn: 'Together, these three sayings emphasize: learning is lifelong and requires humility.'
      }
    ],
    vocab: [
      '学而时习之', '温故知新', '三人行必有我师', '谦逊', '终身学习', '释义'
    ],
    questions: [
      {
        questionFr: 'Selon la première maxime, qu\'est-ce qui apporte la joie ?',
        questionEn: 'According to the first maxim, what brings joy?',
        answerFr: 'Apprendre et remettre en pratique ce qu\'on a appris.',
        answerEn: 'Learning and putting into practice what one has learned.'
      },
      {
        questionFr: 'Quelle vertu la troisième maxime met-elle en avant ?',
        questionEn: 'What virtue does the third maxim highlight?',
        answerFr: "L'humilité : tout le monde a quelque chose à nous apprendre.",
        answerEn: 'Humility — everyone has something to teach us.'
      }
    ]
  }
};

// ============================================================================
//  DIALOGUE LONG — B2.1 : pitch d'une startup tech à un investisseur
// ============================================================================

const STARTUP_PITCH_DIALOGUE: DialogueEntry = {
  cecrLevel: 'b2.1',
  theme: 'Lever des fonds (tech)',
  themeEn: 'Fundraising (tech)',
  dialogue: {
    id: 'dlg-b21-startup-pitch',
    title: 'Premier tour de table',
    titleEn: 'First funding round',
    context: "Wang Meng, fondatrice d'une start-up d'IA médicale, rencontre Zhang Jun, associé d'un fonds de capital-risque, pour discuter d'un éventuel investissement.",
    contextEn: 'Wang Meng, founder of a medical-AI startup, meets Zhang Jun, a partner at a venture-capital firm, to discuss a potential investment.',
    lines: [
      { speaker: '张军', hanzi: '王总，您好。请坐。今天主要想了解一下你们公司的具体情况。', pinyin: 'Wáng zǒng, nín hǎo. Qǐng zuò. Jīntiān zhǔyào xiǎng liǎojiě yīxià nǐmen gōngsī de jùtǐ qíngkuàng.', translationFr: 'Madame Wang, bonjour. Je vous en prie, asseyez-vous. Aujourd\'hui, je souhaite surtout comprendre la situation concrète de votre société.', translationEn: 'Ms. Wang, hello. Please have a seat. Today I mainly want to understand your company\'s concrete situation.' },
      { speaker: '王蒙', hanzi: '张先生，您好。非常感谢您抽时间和我们见面。', pinyin: 'Zhāng xiānsheng, nín hǎo. Fēicháng gǎnxiè nín chōu shíjiān hé wǒmen jiànmiàn.', translationFr: 'Bonjour Monsieur Zhang. Merci infiniment de nous consacrer du temps.', translationEn: 'Hello Mr. Zhang. Thank you very much for taking the time to meet us.' },
      { speaker: '张军', hanzi: '不客气。先请您用三四句话介绍一下你们的核心产品。', pinyin: 'Bù kèqì. Xiān qǐng nín yòng sān sì jù huà jièshào yīxià nǐmen de héxīn chǎnpǐn.', translationFr: 'Je vous en prie. Pour commencer, présentez-moi votre produit phare en trois ou quatre phrases.', translationEn: 'You\'re welcome. First, please introduce your core product in three or four sentences.' },
      { speaker: '王蒙', hanzi: '好的。我们开发了一套基于人工智能的辅助诊断系统，主要面向基层医院。通过分析胸部CT影像，我们的算法可以在几秒内识别出早期肺癌。', pinyin: 'Hǎo de. Wǒmen kāifāle yī tào jīyú réngōng zhìnéng de fǔzhù zhěnduàn xìtǒng, zhǔyào miànxiàng jīcéng yīyuàn. Tōngguò fēnxī xiōngbù CT yǐngxiàng, wǒmen de suànfǎ kěyǐ zài jǐ miǎo nèi shíbié chū zǎoqī fèi\'ái.', translationFr: 'Très bien. Nous avons développé un système d\'aide au diagnostic basé sur l\'IA, destiné principalement aux hôpitaux de premier niveau. En analysant des scanners thoraciques, notre algorithme identifie un cancer du poumon précoce en quelques secondes.', translationEn: 'Sure. We have developed an AI-based diagnostic-assistance system aimed at grassroots hospitals. By analyzing chest CT images, our algorithm can identify early-stage lung cancer within seconds.' },
      { speaker: '张军', hanzi: '准确率大概是多少？和资深放射科医生相比呢？', pinyin: 'Zhǔnquèlǜ dàgài shì duōshǎo? Hé zīshēn fàngshèkē yīshēng xiāng bǐ ne?', translationFr: 'Quel est environ le taux de précision ? Et comment se compare-t-il à celui d\'un radiologue expérimenté ?', translationEn: 'What\'s the approximate accuracy? And how does it compare to an experienced radiologist?' },
      { speaker: '王蒙', hanzi: '在三家三甲医院的测试中，我们达到了百分之九十三点七，略高于放射科医生的平均水平。', pinyin: 'Zài sān jiā sān jiǎ yīyuàn de cèshì zhōng, wǒmen dádàole bǎi fēn zhī jiǔshísān diǎn qī, lüè gāoyú fàngshèkē yīshēng de píngjūn shuǐpíng.', translationFr: 'Lors de tests menés dans trois hôpitaux de niveau 3A, nous avons atteint 93,7 %, légèrement au-dessus de la moyenne des radiologues.', translationEn: 'In tests at three Class-3A hospitals, we reached 93.7%, slightly above the average for radiologists.' },
      { speaker: '张军', hanzi: '很有意思。那你们目前的商业模式是怎样的？', pinyin: 'Hěn yǒuyìsi. Nà nǐmen mùqián de shāngyè móshì shì zěnyàng de?', translationFr: 'Très intéressant. Quel est actuellement votre modèle économique ?', translationEn: 'Interesting. What is your current business model?' },
      { speaker: '王蒙', hanzi: '我们主要通过软件许可费收费：每家医院每年支付约二十万元的订阅费。', pinyin: 'Wǒmen zhǔyào tōngguò ruǎnjiàn xǔkě fèi shōufèi: Měi jiā yīyuàn měi nián zhīfù yuē èrshí wàn yuán de dìngyuè fèi.', translationFr: 'Nous facturons principalement via des licences logicielles : chaque hôpital paie environ 200 000 yuans par an d\'abonnement.', translationEn: 'We mainly monetize through software licensing: each hospital pays roughly 200,000 yuan per year as a subscription.' },
      { speaker: '张军', hanzi: '目前已经签约多少家客户？', pinyin: 'Mùqián yǐjīng qiānyuē duōshǎo jiā kèhù?', translationFr: 'Combien de clients avez-vous déjà signés ?', translationEn: 'How many customers have you already signed?' },
      { speaker: '王蒙', hanzi: '到今年三月为止，我们已经和四十六家医院签了合同，其中二十九家已经部署上线。', pinyin: 'Dào jīnnián sān yuè wéizhǐ, wǒmen yǐjīng hé sìshíliù jiā yīyuàn qiānle hétóng, qízhōng èrshíjiǔ jiā yǐjīng bùshǔ shàngxiàn.', translationFr: 'À fin mars, nous avons signé avec quarante-six hôpitaux, dont vingt-neuf sont déjà déployés et en production.', translationEn: 'By March this year, we had signed contracts with 46 hospitals, 29 of which are already deployed and live.' },
      { speaker: '张军', hanzi: '不错。那你们的团队情况呢？', pinyin: 'Bùcuò. Nà nǐmen de tuánduì qíngkuàng ne?', translationFr: 'Pas mal. Et qu\'en est-il de votre équipe ?', translationEn: 'Not bad. What about your team?' },
      { speaker: '王蒙', hanzi: '核心团队一共二十三人，其中博士十二位，分别来自清华、北大和斯坦福。我本人之前在美国一家大型药企担任机器学习负责人，做了八年。', pinyin: 'Héxīn tuánduì yīgòng èrshísān rén, qízhōng bóshì shí\'èr wèi, fēnbié láizì Qīnghuá, Běidà hé Sītǎnfú. Wǒ běnrén zhīqián zài Měiguó yī jiā dàxíng yàoqǐ dānrèn jīqì xuéxí fùzérén, zuòle bā nián.', translationFr: 'L\'équipe centrale compte vingt-trois personnes, dont douze docteurs issus de Tsinghua, Beida et Stanford. Moi-même, j\'ai été responsable machine learning pendant huit ans dans un grand laboratoire pharmaceutique américain.', translationEn: 'The core team has 23 people, including twelve PhDs from Tsinghua, Peking University and Stanford. I personally spent eight years as head of machine learning at a major US pharmaceutical company.' },
      { speaker: '张军', hanzi: '这个背景很有说服力。那你们本轮希望融多少？估值是多少？', pinyin: 'Zhège bèijǐng hěn yǒu shuōfúlì. Nà nǐmen běn lún xīwàng róng duōshǎo? Gūzhí shì duōshǎo?', translationFr: 'Votre parcours est convaincant. Combien souhaitez-vous lever ce tour-ci ? Et quelle est la valorisation ?', translationEn: 'A persuasive background. How much do you want to raise this round? And what is the valuation?' },
      { speaker: '王蒙', hanzi: '我们打算融一亿五千万人民币，对应投前估值大约十亿人民币。', pinyin: 'Wǒmen dǎsuàn róng yī yì wǔ qiān wàn rénmínbì, duìyìng tóu qián gūzhí dàyuē shí yì rénmínbì.', translationFr: 'Nous envisageons de lever 150 millions de yuans, pour une valorisation pré-money d\'environ un milliard de yuans.', translationEn: 'We plan to raise 150 million yuan, against a pre-money valuation of about one billion yuan.' },
      { speaker: '张军', hanzi: '估值对应二十倍的收入，是基于什么逻辑？', pinyin: 'Gūzhí duìyìng èrshí bèi de shōurù, shì jīyú shénme luójí?', translationFr: 'Une valorisation à vingt fois les revenus — sur quelle logique vous appuyez-vous ?', translationEn: 'Twenty times revenue — what\'s the logic behind that valuation?' },
      { speaker: '王蒙', hanzi: '主要有两个原因：一是我们的年收入增长率超过百分之一百五十；二是医疗AI领域的可比公司近期融资估值普遍在十五到二十五倍之间。', pinyin: 'Zhǔyào yǒu liǎng gè yuányīn: yī shì wǒmen de nián shōurù zēngzhǎnglǜ chāoguò bǎi fēn zhī yībǎi wǔshí; èr shì yīliáo AI lǐngyù de kěbǐ gōngsī jìnqí róngzī gūzhí pǔbiàn zài shíwǔ dào èrshíwǔ bèi zhī jiān.', translationFr: 'Il y a principalement deux raisons : d\'une part, notre croissance annuelle dépasse 150 % ; d\'autre part, les comparables dans l\'IA médicale lèvent récemment à des multiples compris entre 15 et 25 fois.', translationEn: 'Two main reasons: first, our year-over-year revenue growth exceeds 150%; second, recent funding rounds in medical AI have valued comparable companies between 15x and 25x revenue.' },
      { speaker: '张军', hanzi: '理解。数据监管和合规方面呢？医疗数据非常敏感。', pinyin: 'Lǐjiě. Shùjù jiānguǎn hé héguī fāngmiàn ne? Yīliáo shùjù fēicháng mǐngǎn.', translationFr: 'Je comprends. Et côté régulation et conformité ? Les données médicales sont très sensibles.', translationEn: 'Understood. What about data regulation and compliance? Medical data is very sensitive.' },
      { speaker: '王蒙', hanzi: '我们所有的影像数据都经过加密处理，并存储在国家认证的医疗云上；另外，我们也已经取得了国家药监局颁发的二类医疗器械认证。', pinyin: 'Wǒmen suǒyǒu de yǐngxiàng shùjù dōu jīngguò jiāmì chǔlǐ, bìng cúnchú zài guójiā rènzhèng de yīliáo yún shàng; lìngwài, wǒmen yě yǐjīng qǔdéle guójiā yàojiānjú bānfā de èr lèi yīliáo qìxiè rènzhèng.', translationFr: 'Toutes nos images sont chiffrées et stockées sur un cloud médical agréé par l\'État ; de plus, nous avons déjà obtenu la certification NMPA de dispositif médical de classe II.', translationEn: 'All our images are encrypted and stored on a state-certified medical cloud; we\'ve also obtained Class-II medical-device certification from the NMPA.' },
      { speaker: '张军', hanzi: '很好。那竞争对手呢？国内外各有哪些？', pinyin: 'Hěn hǎo. Nà jìngzhēng duìshǒu ne? Guónèi wài gè yǒu nǎxiē?', translationFr: 'Très bien. Et les concurrents ? Qui avez-vous en Chine et à l\'étranger ?', translationEn: 'Very good. What about competitors? Who are they in China and abroad?' },
      { speaker: '王蒙', hanzi: '国内主要是A公司和B公司，但他们聚焦的是三甲医院的高端市场，而我们的差异化在于：价格只有他们的三分之一，而且专门适配基层医院。', pinyin: 'Guónèi zhǔyào shì A gōngsī hé B gōngsī, dàn tāmen jùjiāo de shì sān jiǎ yīyuàn de gāoduān shìchǎng, ér wǒmen de chāyìhuà zàiyú: jiàgé zhǐyǒu tāmen de sān fēn zhī yī, érqiě zhuānmén shìpèi jīcéng yīyuàn.', translationFr: 'En Chine, nos concurrents principaux sont A et B, mais ils se concentrent sur le haut de marché des hôpitaux 3A ; notre différenciation tient à un prix trois fois inférieur et à un produit calibré pour les hôpitaux de premier niveau.', translationEn: 'In China, our main competitors are A and B, but they focus on the premium Class-3A segment. Our differentiation: a price three times lower and a product purpose-built for grassroots hospitals.' },
      { speaker: '张军', hanzi: '这个定位很清晰。国际上呢？', pinyin: 'Zhège dìngwèi hěn qīngxī. Guójì shàng ne?', translationFr: 'Le positionnement est clair. Et à l\'international ?', translationEn: 'That positioning is clear. And internationally?' },
      { speaker: '王蒙', hanzi: '国外主要是两家美国公司，但他们的解决方案不适合中国的医保体系。', pinyin: 'Guówài zhǔyào shì liǎng jiā Měiguó gōngsī, dàn tāmen de jiějué fāng\'àn bù shìhé Zhōngguó de yībǎo tǐxì.', translationFr: 'À l\'international, deux sociétés américaines dominent, mais leurs solutions ne s\'intègrent pas au système d\'assurance maladie chinois.', translationEn: 'Abroad, two US companies dominate, but their solutions don\'t fit China\'s health-insurance system.' },
      { speaker: '张军', hanzi: '使用这笔融资你们打算做什么？', pinyin: 'Shǐyòng zhè bǐ róngzī nǐmen dǎsuàn zuò shénme?', translationFr: 'Qu\'avez-vous l\'intention de faire avec ce financement ?', translationEn: 'What do you plan to do with this funding?' },
      { speaker: '王蒙', hanzi: '大约百分之四十用于研发，百分之三十用于市场扩张，剩下的用于团队建设和合规。', pinyin: 'Dàyuē bǎi fēn zhī sìshí yòngyú yánfā, bǎi fēn zhī sānshí yòngyú shìchǎng kuòzhāng, shèngxià de yòngyú tuánduì jiànshè hé héguī.', translationFr: 'Environ 40 % en R&D, 30 % en expansion commerciale, et le reste en recrutement et conformité.', translationEn: 'About 40% to R&D, 30% to market expansion, and the rest to team building and compliance.' },
      { speaker: '张军', hanzi: '研发这边打算增加哪些方向？', pinyin: 'Yánfā zhèbiān dǎsuàn zēngjiā nǎxiē fāngxiàng?', translationFr: 'Sur la R&D, quels axes voulez-vous renforcer ?', translationEn: 'On the R&D side, which directions do you want to expand?' },
      { speaker: '王蒙', hanzi: '主要是心脏影像和消化系统两个方向，希望在两年内推出第二代产品。', pinyin: 'Zhǔyào shì xīnzàng yǐngxiàng hé xiāohuà xìtǒng liǎng gè fāngxiàng, xīwàng zài liǎng nián nèi tuīchū dì èr dài chǎnpǐn.', translationFr: 'Principalement l\'imagerie cardiaque et le système digestif, avec pour objectif une deuxième génération de produit d\'ici deux ans.', translationEn: 'Mainly cardiac imaging and the digestive system, aiming to ship a second-generation product within two years.' },
      { speaker: '张军', hanzi: '听起来很稳健。那你们期望的下一个里程碑是什么？', pinyin: 'Tīng qǐlái hěn wěnjiàn. Nà nǐmen qīwàng de xià yīgè lǐchéngbēi shì shénme?', translationFr: 'Cela semble solide. Quel est le prochain jalon que vous visez ?', translationEn: 'Sounds solid. What\'s the next milestone you\'re targeting?' },
      { speaker: '王蒙', hanzi: '十二个月内达到两百家签约医院，并且启动海外市场的可行性研究。', pinyin: 'Shí\'èr gè yuè nèi dádào liǎng bǎi jiā qiānyuē yīyuàn, bìngqiě qǐdòng hǎiwài shìchǎng de kěxíngxìng yánjiū.', translationFr: 'Atteindre 200 hôpitaux signés en douze mois et lancer une étude de faisabilité pour l\'international.', translationEn: 'Reach 200 signed hospitals within twelve months and launch a feasibility study for overseas markets.' },
      { speaker: '张军', hanzi: '好。那我们这边先做尽调，预计两周内给出初步反馈。', pinyin: 'Hǎo. Nà wǒmen zhèbiān xiān zuò jìndiào, yùjì liǎng zhōu nèi gěi chū chūbù fǎnkuì.', translationFr: 'Bien. De notre côté, nous lançons la due diligence et prévoyons un premier retour d\'ici deux semaines.', translationEn: 'Good. On our side, we\'ll start due diligence and expect to give preliminary feedback within two weeks.' },
      { speaker: '王蒙', hanzi: '太好了，感谢张先生的时间。我们会第一时间提供所需材料。', pinyin: 'Tài hǎole, gǎnxiè Zhāng xiānsheng de shíjiān. Wǒmen huì dì yī shíjiān tígōng suǒ xū cáiliào.', translationFr: 'Parfait, merci Monsieur Zhang. Nous vous fournirons sans délai tous les documents nécessaires.', translationEn: 'Wonderful, thank you Mr. Zhang. We will provide all required materials without delay.' },
      { speaker: '张军', hanzi: '期待下次见面。', pinyin: 'Qídài xià cì jiànmiàn.', translationFr: 'Au plaisir de notre prochain rendez-vous.', translationEn: 'Looking forward to our next meeting.' }
    ],
    vocab: [
      '辅助诊断', '算法', '准确率', '三甲医院', '商业模式', '软件许可费',
      '估值', '融资', '合规', '医疗数据', '加密', '二类医疗器械',
      '差异化', '定位', '里程碑', '尽调'
    ],
    comprehension: {
      questionFr: 'Combien Wang Meng souhaite-t-elle lever et à quelle valorisation pré-money ?',
      questionEn: 'How much does Wang Meng want to raise, and at what pre-money valuation?',
      answerFr: '150 millions de yuans pour une valorisation pré-money d\'environ un milliard de yuans.',
      answerEn: '150 million yuan for a pre-money valuation of about one billion yuan.'
    }
  }
};

// ============================================================================
//  ARTICLES ORIGINAUX — B2.2
// ============================================================================

const INTANGIBLE_HERITAGE: ReadingEntry = {
  cecrLevel: 'b2.2',
  theme: 'Patrimoine immatériel',
  themeEn: 'Intangible heritage',
  reading: {
    id: 'rd-b22-intangible-heritage',
    title: "Sauvegarder les savoir-faire traditionnels à l'ère moderne",
    titleEn: 'Preserving traditional crafts in the modern era',
    intro: "Article original B2.2 sur le patrimoine culturel immatériel en Chine. Vocabulaire culturel, connecteurs argumentatifs, structures complexes.",
    introEn: 'Original B2.2 article on intangible cultural heritage in China. Cultural vocabulary, argumentative connectors, complex structures.',
    segments: [
      {
        hanzi: '在快速工业化和全球化的背景下，许多中国的传统技艺正面临消失的危险。',
        pinyin: 'Zài kuàisù gōngyèhuà hé quánqiúhuà de bèijǐng xià, xǔduō Zhōngguó de chuántǒng jìyì zhèng miànlín xiāoshī de wēixiǎn.',
        translationFr: "Dans un contexte d'industrialisation rapide et de mondialisation, de nombreux savoir-faire traditionnels chinois risquent de disparaître.",
        translationEn: 'Against a backdrop of rapid industrialization and globalization, many traditional Chinese crafts face the risk of disappearing.'
      },
      {
        hanzi: '从景德镇的陶瓷到苏州的刺绣，这些技艺都凝聚了几代人的心血。',
        pinyin: 'Cóng Jǐngdézhèn de táocí dào Sūzhōu de cìxiù, zhèxiē jìyì dōu níngjùle jǐ dài rén de xīnxuè.',
        translationFr: "Des céramiques de Jingdezhen aux broderies de Suzhou, ces savoir-faire concentrent le labeur de plusieurs générations.",
        translationEn: 'From the ceramics of Jingdezhen to the embroidery of Suzhou, these skills embody the hard work of many generations.'
      },
      {
        hanzi: '然而，随着老工匠的逐渐退休，年轻人愿意接手的却越来越少。',
        pinyin: 'Rán\'ér, suízhe lǎo gōngjiàng de zhújiàn tuìxiū, niánqīngrén yuànyì jiēshǒu de què yuèláiyuè shǎo.',
        translationFr: "Cependant, à mesure que les anciens artisans prennent leur retraite, de moins en moins de jeunes veulent prendre le relais.",
        translationEn: 'However, as senior craftsmen gradually retire, fewer and fewer young people are willing to take over.'
      },
      {
        hanzi: '原因是多方面的：学习周期长、回报慢、而且社会地位不高。',
        pinyin: 'Yuányīn shì duō fāngmiàn de: xuéxí zhōuqī cháng, huíbào màn, érqiě shèhuì dìwèi bù gāo.',
        translationFr: "Les raisons sont multiples : l'apprentissage est long, la rémunération lente à venir, et le statut social peu élevé.",
        translationEn: 'The reasons are multiple: long apprenticeship, slow returns, and low social status.'
      },
      {
        hanzi: '为了应对这一挑战，政府自2006年起建立了国家级非物质文化遗产名录。',
        pinyin: 'Wèile yìngduì zhè yī tiǎozhàn, zhèngfǔ zì 2006 nián qǐ jiànlìle guójiā jí fēiwùzhì wénhuà yíchǎn mínglù.',
        translationFr: "Pour relever ce défi, le gouvernement a créé en 2006 un registre national du patrimoine culturel immatériel.",
        translationEn: 'To address this challenge, the government created a national intangible cultural heritage registry in 2006.'
      },
      {
        hanzi: '截至目前，已有一千五百多个项目被列入其中，涵盖戏曲、工艺、饮食和节庆。',
        pinyin: 'Jiézhì mùqián, yǐ yǒu yī qiān wǔ bǎi duō gè xiàngmù bèi lièrù qízhōng, hángài xìqǔ, gōngyì, yǐnshí hé jiéqìng.',
        translationFr: "À ce jour, plus de 1 500 éléments y figurent, couvrant opéra, artisanat, gastronomie et fêtes.",
        translationEn: 'To date, more than 1,500 items have been listed, covering opera, crafts, cuisine and festivals.'
      },
      {
        hanzi: '与此同时，许多大学开设了相关专业，培养新一代传承人。',
        pinyin: 'Yǔcǐ tóngshí, xǔduō dàxué kāishèle xiāngguān zhuānyè, péiyǎng xīn yī dài chuánchéngrén.',
        translationFr: "Dans le même temps, de nombreuses universités ont ouvert des cursus dédiés pour former une nouvelle génération de transmetteurs.",
        translationEn: 'At the same time, many universities have opened related programs to train a new generation of inheritors.'
      },
      {
        hanzi: '社交媒体也发挥了意想不到的作用：某些老手艺人通过短视频吸引了数百万粉丝。',
        pinyin: 'Shèjiāo méitǐ yě fāhuīle yìxiǎngbùdào de zuòyòng: mǒuxiē lǎo shǒuyì rén tōngguò duǎn shìpín xīyǐnle shù bǎi wàn fěnsī.',
        translationFr: "Les réseaux sociaux ont aussi joué un rôle inattendu : certains vieux artisans ont attiré des millions d'abonnés grâce aux vidéos courtes.",
        translationEn: 'Social media has played an unexpected role too: some older craftsmen have attracted millions of followers through short videos.'
      },
      {
        hanzi: '这些平台让传统技艺重新被看见，也为工匠带来了新的收入来源。',
        pinyin: 'Zhèxiē píngtái ràng chuántǒng jìyì chóngxīn bèi kànjiàn, yě wèi gōngjiàng dàiláile xīn de shōurù láiyuán.',
        translationFr: "Ces plateformes rendent visible les savoir-faire traditionnels et offrent aux artisans de nouvelles sources de revenus.",
        translationEn: 'These platforms give visibility to traditional skills and open new income streams for craftsmen.'
      },
      {
        hanzi: '不过，批评者指出，过度商业化可能导致技艺变味，只剩下表面的奇观。',
        pinyin: 'Bùguò, pīpíngzhě zhǐchū, guòdù shāngyèhuà kěnéng dǎozhì jìyì biànwèi, zhǐ shèng xià biǎomiàn de qíguān.',
        translationFr: "Toutefois, les critiques soulignent qu'une commercialisation excessive risque de dénaturer les savoir-faire pour n'en laisser que la façade spectaculaire.",
        translationEn: 'Critics nonetheless warn that over-commercialization can strip skills of their substance, leaving only a superficial spectacle.'
      },
      {
        hanzi: '如何在传承和创新之间找到平衡，成为了文化部门最关注的问题之一。',
        pinyin: 'Rúhé zài chuánchéng hé chuàngxīn zhī jiān zhǎodào pínghéng, chéngwéile wénhuà bùmén zuì guānzhù de wèntí zhī yī.',
        translationFr: "Trouver l'équilibre entre transmission et innovation est devenu l'une des préoccupations majeures du ministère de la Culture.",
        translationEn: 'Finding the balance between transmission and innovation has become one of the cultural authorities\' main concerns.'
      },
      {
        hanzi: '只有当年轻人真正从内心认同这些文化价值，传承才能持续下去。',
        pinyin: 'Zhǐyǒu dāng niánqīngrén zhēnzhèng cóng nèixīn rèntóng zhèxiē wénhuà jiàzhí, chuánchéng cáinéng chíxù xiàqù.',
        translationFr: "Ce n'est que lorsque les jeunes adhèrent sincèrement à ces valeurs culturelles que la transmission peut se perpétuer.",
        translationEn: 'Only when young people truly identify with these cultural values can transmission endure.'
      }
    ],
    vocab: [
      '工业化', '全球化', '传统技艺', '陶瓷', '刺绣', '心血',
      '非物质文化遗产', '传承人', '社交媒体', '商业化', '创新', '认同'
    ],
    questions: [
      {
        questionFr: "Selon l'article, comment les réseaux sociaux contribuent-ils à la sauvegarde des savoir-faire traditionnels ?",
        questionEn: 'According to the article, how do social media contribute to preserving traditional crafts?',
        answerFr: "Ils rendent les savoir-faire visibles à grande échelle et apportent aux artisans de nouvelles sources de revenus, bien qu'une commercialisation excessive reste un risque.",
        answerEn: 'They give large-scale visibility to traditional skills and provide craftsmen with new income streams, though over-commercialization remains a risk.'
      }
    ]
  }
};

// ============================================================================
//  DIALOGUE LONG — B2.2 (débat santé mentale / work-life balance)
// ============================================================================

const MENTAL_HEALTH_DEBATE: DialogueEntry = {
  cecrLevel: 'b2.2',
  theme: 'Débat santé mentale au travail',
  themeEn: 'Workplace mental health debate',
  dialogue: {
    id: 'dlg-b22-mental-health-debate',
    title: "Débat : « 996 » et santé mentale au travail",
    titleEn: 'Debate: "996" culture and workplace mental health',
    context: "Plateau télé. La journaliste Li Na anime un débat avec un DRH (M. Chen) et une psychologue du travail (Dr Zhou) sur l'impact du régime « 996 » sur la santé mentale.",
    contextEn: "TV studio. Journalist Li Na hosts a debate between an HR director (Mr. Chen) and a workplace psychologist (Dr. Zhou) about the impact of the '996' schedule on mental health.",
    lines: [
      { speaker: '李娜', hanzi: '各位观众下午好，欢迎收看本期《职场观察》。今天我们讨论的话题是："996"工作制是否真的损害员工的心理健康？首先请陈先生简要介绍一下他所在公司的情况。', pinyin: 'Gèwèi guānzhòng xiàwǔ hǎo, huānyíng shōukàn běn qī 《Zhíchǎng Guānchá》. Jīntiān wǒmen tǎolùn de huàtí shì: "996" gōngzuòzhì shìfǒu zhēn de sǔnhài yuángōng de xīnlǐ jiànkāng? Shǒuxiān qǐng Chén xiānsheng jiǎnyào jièshào yīxià tā suǒzài gōngsī de qíngkuàng.', translationFr: 'Bonjour à tous, bienvenue dans ce numéro de « Regards sur le monde du travail ». Notre sujet du jour : le régime « 996 » nuit-il vraiment à la santé mentale des employés ? Commençons par M. Chen : pourriez-vous présenter brièvement la situation dans votre entreprise ?', translationEn: 'Good afternoon, everyone, welcome to this episode of "Workplace Observations". Today\'s topic: does the "996" schedule really harm employees\' mental health? Let\'s start with Mr. Chen: could you briefly describe the situation at your company?' },
      { speaker: '陈先生', hanzi: '谢谢主持人。我们是一家互联网公司，员工大约两千人。过去几年，公司一直实行弹性工作制，但高强度项目期间加班确实比较普遍。', pinyin: 'Xièxiè zhǔchírén. Wǒmen shì yī jiā hùliánwǎng gōngsī, yuángōng dàyuē liǎng qiān rén. Guòqù jǐ nián, gōngsī yīzhí shíxíng tánxìng gōngzuòzhì, dàn gāo qiángdù xiàngmù qíjiān jiābān quèshí bǐjiào pǔbiàn.', translationFr: 'Merci. Nous sommes une entreprise Internet d\'environ deux mille employés. Ces dernières années, nous appliquons un horaire flexible, mais les heures supplémentaires restent fréquentes pendant les périodes à forte charge.', translationEn: 'Thank you. We\'re an Internet company with about two thousand employees. In recent years we\'ve had flexible hours, but overtime is common during high-load project periods.' },
      { speaker: '李娜', hanzi: '周医生，从临床角度看，长时间加班会带来什么样的心理影响？', pinyin: 'Zhōu yīshēng, cóng línchuáng jiǎodù kàn, cháng shíjiān jiābān huì dàilái shénme yàng de xīnlǐ yǐngxiǎng?', translationFr: 'Docteure Zhou, cliniquement parlant, quels sont les effets psychologiques des heures supplémentaires prolongées ?', translationEn: 'Dr. Zhou, clinically speaking, what psychological effects does prolonged overtime produce?' },
      { speaker: '周医生', hanzi: '研究显示，连续几个月每周工作超过六十小时，焦虑和抑郁的发病率会显著上升。此外，失眠、免疫力下降、家庭关系紧张都是常见的连锁反应。', pinyin: 'Yánjiū xiǎnshì, liánxù jǐ gè yuè měi zhōu gōngzuò chāoguò liùshí xiǎoshí, jiāolǜ hé yìyù de fābìnglǜ huì xiǎnzhù shàngshēng. Cǐwài, shīmián, miǎnyìlì xiàjiàng, jiātíng guānxì jǐnzhāng dōu shì chángjiàn de liánsuǒ fǎnyìng.', translationFr: 'Les études montrent qu\'après plusieurs mois à plus de soixante heures hebdomadaires, l\'anxiété et la dépression augmentent significativement. On observe aussi en réaction en chaîne : insomnies, baisse d\'immunité et tensions familiales.', translationEn: 'Studies show that after several months of over sixty working hours per week, anxiety and depression rise significantly. Common chain effects include insomnia, reduced immunity, and family tensions.' },
      { speaker: '陈先生', hanzi: '我理解周医生的观点，但加班有时也是项目成败的关键，特别是在创业和初创阶段，完全按标准工时来几乎是不可能的。', pinyin: 'Wǒ lǐjiě Zhōu yīshēng de guāndiǎn, dàn jiābān yǒushí yě shì xiàngmù chéngbài de guānjiàn, tèbié shì zài chuàngyè hé chūchuàng jiēduàn, wánquán àn biāozhǔn gōngshí lái jīhū shì bù kěnéng de.', translationFr: 'Je comprends le point de vue du Dr Zhou, mais les heures supplémentaires sont parfois déterminantes pour la réussite d\'un projet — surtout en phase de création et de démarrage, où respecter strictement les horaires standard est presque impossible.', translationEn: 'I understand Dr. Zhou\'s point, but overtime can be decisive for a project\'s success — especially at the startup and early stage, where strictly sticking to standard hours is almost impossible.' },
      { speaker: '周医生', hanzi: '陈先生说得有道理，不过短期冲刺和长期的"996"是两回事。如果"加班文化"成了常态，员工的创造力反而会明显下降。', pinyin: 'Chén xiānsheng shuō de yǒu dàolǐ, bùguò duǎnqī chōngcì hé chángqī de "996" shì liǎng huí shì. Rúguǒ "jiābān wénhuà" chéngle chángtài, yuángōng de chuàngzàolì fǎn\'ér huì míngxiǎn xiàjiàng.', translationFr: 'M. Chen a raison, mais un sprint ponctuel et un « 996 » qui s\'éternise sont deux choses différentes. Si la « culture des heures sup » devient la norme, la créativité des employés baisse au contraire nettement.', translationEn: 'Mr. Chen has a point, but a short-term sprint and a long-term "996" are two different things. Once "overtime culture" becomes the norm, employee creativity actually drops markedly.' },
      { speaker: '李娜', hanzi: '有数据支持这个观点吗？', pinyin: 'Yǒu shùjù zhīchí zhège guāndiǎn ma?', translationFr: 'Avez-vous des données à l\'appui ?', translationEn: 'Is there data to back this up?' },
      { speaker: '周医生', hanzi: '有。斯坦福的研究发现，每周工作超过五十小时之后，每小时的产出就开始下降；一旦超过五十五小时，多出来的工作时间几乎等于没有产出。', pinyin: 'Yǒu. Sītǎnfú de yánjiū fāxiàn, měi zhōu gōngzuò chāoguò wǔshí xiǎoshí zhīhòu, měi xiǎoshí de chǎnchū jiù kāishǐ xiàjiàng; yīdàn chāoguò wǔshíwǔ xiǎoshí, duō chūlái de gōngzuò shíjiān jīhū děngyú méiyǒu chǎnchū.', translationFr: 'Oui. Stanford a montré qu\'au-delà de cinquante heures hebdomadaires, la productivité horaire commence à diminuer, et qu\'au-delà de cinquante-cinq heures, les heures supplémentaires n\'apportent quasiment plus aucun rendement.', translationEn: 'Yes. A Stanford study found that beyond fifty hours a week, hourly output starts to decline — and past fifty-five hours, the extra time yields almost no output at all.' },
      { speaker: '陈先生', hanzi: '这个数据很有启发。不过从管理层角度看，完全取消加班也不现实，所以我们尝试的办法是：设立"无会议日"、提供心理咨询、推行强制休假。', pinyin: 'Zhège shùjù hěn yǒu qǐfā. Bùguò cóng guǎnlǐ céng jiǎodù kàn, wánquán qǔxiāo jiābān yě bù xiànshí, suǒyǐ wǒmen chángshì de bànfǎ shì: shèlì "wú huìyì rì", tígōng xīnlǐ zīxún, tuīxíng qiángzhì xiūjià.', translationFr: 'Ces chiffres sont éclairants. Cela dit, supprimer complètement les heures supplémentaires n\'est pas réaliste côté management — ce que nous expérimentons, ce sont des « journées sans réunion », des consultations psychologiques et des congés imposés.', translationEn: 'These figures are illuminating. That said, completely eliminating overtime isn\'t realistic from a management standpoint — so what we\'ve tried instead are "no-meeting days", psychological counseling, and mandatory leave.' },
      { speaker: '李娜', hanzi: '这些措施的效果怎么样？', pinyin: 'Zhèxiē cuòshī de xiàoguǒ zěnmeyàng?', translationFr: 'Et quel est l\'impact de ces mesures ?', translationEn: 'How effective have these measures been?' },
      { speaker: '陈先生', hanzi: '过去一年，员工流失率下降了大约百分之十五，员工满意度调查也显示焦虑指标有所改善。', pinyin: 'Guòqù yī nián, yuángōng liúshīlǜ xiàjiàngle dàyuē bǎi fēn zhī shíwǔ, yuángōng mǎnyìdù diàochá yě xiǎnshì jiāolǜ zhǐbiāo yǒu suǒ gǎishàn.', translationFr: 'Sur l\'année écoulée, notre taux de départ a baissé d\'environ 15 %, et les enquêtes de satisfaction montrent une amélioration des indicateurs d\'anxiété.', translationEn: 'Over the past year, turnover has dropped about 15%, and employee satisfaction surveys show improved anxiety metrics.' },
      { speaker: '周医生', hanzi: '这些都是积极的信号，但仅靠公司内部的努力还不够，立法层面也应该更明确地界定"加班"和"自愿工作"的界限。', pinyin: 'Zhèxiē dōu shì jījí de xìnhào, dàn jǐn kào gōngsī nèibù de nǔlì hái bùgòu, lìfǎ céngmiàn yě yīnggāi gèng míngquè de jièdìng "jiābān" hé "zìyuàn gōngzuò" de jièxiàn.', translationFr: 'Ce sont des signaux positifs, mais les seuls efforts internes à l\'entreprise ne suffisent pas : sur le plan législatif, la frontière entre « heures sup » et « travail volontaire » doit être tracée plus clairement.', translationEn: 'These are positive signs, but company-internal efforts alone aren\'t enough — at the legislative level, the boundary between "overtime" and "voluntary work" needs to be defined more clearly.' },
      { speaker: '李娜', hanzi: '您是指最高人民法院去年关于"996"违法的判决吗？', pinyin: 'Nín shì zhǐ zuìgāo rénmín fǎyuàn qùnián guānyú "996" wéifǎ de pànjué ma?', translationFr: 'Vous faites référence à la décision de la Cour suprême l\'an dernier déclarant le « 996 » illégal ?', translationEn: 'Are you referring to the Supreme Court\'s ruling last year declaring "996" illegal?' },
      { speaker: '周医生', hanzi: '是的。那次判决非常重要，但在执行层面还存在很大的灰色地带。', pinyin: 'Shì de. Nà cì pànjué fēicháng zhòngyào, dàn zài zhíxíng céngmiàn hái cúnzài hěn dà de huīsè dìdài.', translationFr: 'Exactement. Une décision majeure, mais sa mise en œuvre laisse encore de vastes zones grises.', translationEn: 'Exactly. A landmark ruling, but large gray areas remain in enforcement.' },
      { speaker: '陈先生', hanzi: '其实作为企业方，我们欢迎更清晰的规则，因为这样可以公平竞争——如果所有公司都必须守同样的底线，就不会有人靠压榨员工来赢得市场。', pinyin: 'Qíshí zuòwéi qǐyè fāng, wǒmen huānyíng gèng qīngxī de guīzé, yīnwèi zhèyàng kěyǐ gōngpíng jìngzhēng——rúguǒ suǒyǒu gōngsī dōu bìxū shǒu tóngyàng de dǐxiàn, jiù bù huì yǒurén kào yāzhà yuángōng lái yíngdé shìchǎng.', translationFr: 'Côté entreprise, nous accueillons en réalité favorablement des règles plus claires, car cela permet une concurrence équitable — si toutes les entreprises respectent la même ligne rouge, personne ne gagnera de parts de marché en exploitant ses employés.', translationEn: 'From the corporate side, we actually welcome clearer rules because they enable fair competition — if every company has to respect the same floor, no one wins market share by squeezing their staff.' },
      { speaker: '李娜', hanzi: '这个观点很有意思。周医生，您觉得年轻人自己应该如何应对？', pinyin: 'Zhège guāndiǎn hěn yǒuyìsi. Zhōu yīshēng, nín juéde niánqīngrén zìjǐ yīnggāi rúhé yìngduì?', translationFr: 'Intéressant. Docteure Zhou, de votre côté, que peuvent faire les jeunes eux-mêmes ?', translationEn: 'Interesting. Dr. Zhou, what can young people do themselves?' },
      { speaker: '周医生', hanzi: '我的建议主要有三点：首先，学会识别压力的早期信号，比如持续性疲劳、情绪波动、注意力下降；其次，建立健康的边界，尽量不要把工作带回家里；最后，一旦出现明显症状，要尽早寻求专业帮助，而不是硬撑。', pinyin: 'Wǒ de jiànyì zhǔyào yǒu sān diǎn: shǒuxiān, xuéhuì shíbié yālì de zǎoqī xìnhào, bǐrú chíxùxìng píláo, qíngxù bōdòng, zhùyìlì xiàjiàng; qícì, jiànlì jiànkāng de biānjiè, jǐnliàng bùyào bǎ gōngzuò dài huí jiā lǐ; zuìhòu, yídàn chūxiàn míngxiǎn zhèngzhuàng, yào jǐnzǎo xúnqiú zhuānyè bāngzhù, ér bùshì yìng chēng.', translationFr: 'Mes conseils tiennent en trois points : d\'abord, apprendre à repérer les signes précoces du stress — fatigue persistante, sautes d\'humeur, baisse d\'attention ; ensuite, poser des limites saines et éviter de ramener le travail à la maison ; enfin, en cas de symptômes clairs, consulter un professionnel sans tarder plutôt que de tenir coûte que coûte.', translationEn: 'My advice comes in three points: first, learn to spot the early signs of stress — persistent fatigue, mood swings, reduced focus; second, set healthy boundaries and try not to bring work home; finally, when clear symptoms appear, seek professional help early instead of toughing it out.' },
      { speaker: '李娜', hanzi: '陈先生，您对下一代管理者有什么建议？', pinyin: 'Chén xiānsheng, nín duì xià yī dài guǎnlǐ zhě yǒu shénme jiànyì?', translationFr: 'M. Chen, quels conseils donneriez-vous à la prochaine génération de managers ?', translationEn: 'Mr. Chen, what advice do you have for the next generation of managers?' },
      { speaker: '陈先生', hanzi: '我想说一句：评估一个团队的健康程度，不能只看交付速度，还要看员工的长期状态。一位优秀的领导，应该营造一个让员工愿意长期投入的环境。', pinyin: 'Wǒ xiǎng shuō yī jù: pínggū yīgè tuánduì de jiànkāng chéngdù, bùnéng zhǐ kàn jiāofù sùdù, hái yào kàn yuángōng de chángqī zhuàngtài. Yī wèi yōuxiù de lǐngdǎo, yīnggāi yíngzào yīgè ràng yuángōng yuànyì chángqī tóurù de huánjìng.', translationFr: 'J\'aimerais dire ceci : évaluer la santé d\'une équipe ne peut se résumer à la vitesse de livraison — il faut aussi regarder l\'état de l\'équipe sur la durée. Un bon dirigeant crée un environnement dans lequel les employés souhaitent s\'investir sur le long terme.', translationEn: 'I\'d say this: evaluating a team\'s health can\'t stop at delivery speed — you also have to look at your people\'s long-term condition. A strong leader creates an environment where employees want to commit for the long term.' },
      { speaker: '李娜', hanzi: '非常感谢两位嘉宾的精彩分享，今天我们就讨论到这里。', pinyin: 'Fēicháng gǎnxiè liǎng wèi jiābīn de jīngcǎi fēnxiǎng, jīntiān wǒmen jiù tǎolùn dào zhèlǐ.', translationFr: 'Merci beaucoup à nos deux invités pour leurs contributions. Nous en resterons là pour aujourd\'hui.', translationEn: 'Many thanks to our two guests for their excellent contributions. We\'ll stop there for today.' },
      { speaker: '陈先生', hanzi: '谢谢邀请。', pinyin: 'Xièxiè yāoqǐng.', translationFr: 'Merci pour l\'invitation.', translationEn: 'Thank you for having me.' },
      { speaker: '周医生', hanzi: '谢谢，希望对观众朋友们有所帮助。', pinyin: 'Xièxiè, xīwàng duì guānzhòng péngyǒumen yǒu suǒ bāngzhù.', translationFr: 'Merci, en espérant que cela aidera nos auditeurs.', translationEn: 'Thank you, I hope this is helpful to our viewers.' }
    ],
    vocab: [
      '工作制', '心理健康', '弹性工作', '加班', '焦虑', '抑郁',
      '失眠', '免疫力', '创造力', '产出', '立法', '判决',
      '灰色地带', '压榨', '底线', '边界'
    ],
    comprehension: {
      questionFr: 'Quels sont les trois leviers que les jeunes peuvent actionner, selon le Dr Zhou ?',
      questionEn: 'What are the three levers Dr. Zhou suggests young people can activate?',
      answerFr: "Identifier les signes précoces du stress, poser des limites saines entre travail et vie privée, et consulter tôt un professionnel en cas de symptômes clairs.",
      answerEn: 'Recognize early signs of stress, set healthy work-life boundaries, and consult a professional early when clear symptoms appear.'
    }
  }
};

// Note: `comprehension` (objet singulier) est la forme supportée par le type Dialogue.

// ============================================================================
//  DIALOGUE LONG — B2.2 (culture du thé, transmission intergénérationnelle)
// ============================================================================

const TEA_CULTURE_DIALOGUE: DialogueEntry = {
  cecrLevel: 'b2.2',
  theme: 'Culture du thé et transmission',
  themeEn: 'Tea culture and transmission',
  dialogue: {
    id: 'dlg-b22-tea-culture',
    title: "À l'atelier de thé : transmission et modernité",
    titleEn: 'At the tea atelier: transmission and modernity',
    context: "Dans un petit atelier de thé à Hangzhou, un jeune apprenti (小陈) interroge son maître (师父) sur l'avenir de la culture du thé face à la montée des chaînes de bubble tea.",
    contextEn: 'In a small tea atelier in Hangzhou, a young apprentice (Xiao Chen) questions his master (Shifu) about the future of tea culture in the face of booming bubble-tea chains.',
    lines: [
      { speaker: '师父', hanzi: '来，坐下。今天想聊点什么？', pinyin: 'Lái, zuò xià. Jīntiān xiǎng liáo diǎn shénme?', translationFr: 'Viens, assieds-toi. De quoi veux-tu parler aujourd\'hui ?', translationEn: 'Come, sit down. What do you want to talk about today?' },
      { speaker: '小陈', hanzi: '师父，我最近一直在想一个问题：现在年轻人一窝蜂地去喝奶茶，还有多少人真正懂得品茶？', pinyin: 'Shīfu, wǒ zuìjìn yīzhí zài xiǎng yīgè wèntí: xiànzài niánqīngrén yīwōfēng de qù hē nǎichá, hái yǒu duōshǎo rén zhēnzhèng dǒngdé pǐnchá?', translationFr: 'Maître, une question me trotte dans la tête : les jeunes se ruent tous sur le bubble tea — combien savent encore vraiment déguster un vrai thé ?', translationEn: 'Shifu, I\'ve been turning a question over in my head: young people all rush to bubble tea these days — how many still really know how to appreciate real tea?' },
      { speaker: '师父', hanzi: '这个话题每一代人都会重新讨论一次。你自己是怎么看的？', pinyin: 'Zhège huàtí měi yīdài rén dōu huì chóngxīn tǎolùn yī cì. Nǐ zìjǐ shì zěnme kàn de?', translationFr: 'C\'est une question que chaque génération rouvre. Et toi, qu\'en penses-tu ?', translationEn: 'Every generation reopens this question. What\'s your own take on it?' },
      { speaker: '小陈', hanzi: '我觉得传统茶文化正在慢慢退场，奶茶店一条街一条街地开，真正的茶馆却越来越少。', pinyin: 'Wǒ juéde chuántǒng chá wénhuà zhèngzài mànmàn tuìchǎng, nǎichá diàn yītiáo jiē yītiáo jiē de kāi, zhēnzhèng de cháguǎn què yuèláiyuè shǎo.', translationFr: 'J\'ai l\'impression que la culture du thé traditionnel s\'efface peu à peu : les enseignes de bubble tea fleurissent rue après rue, tandis que les vraies maisons de thé disparaissent.', translationEn: 'I feel traditional tea culture is quietly retreating — bubble-tea shops open up one street after another, while actual tea houses are becoming rare.' },
      { speaker: '师父', hanzi: '表面看是这样。但消失的也许不是茶，而是一种节奏——愿意坐下来慢慢品的耐心。', pinyin: 'Biǎomiàn kàn shì zhèyàng. Dàn xiāoshī de yěxǔ bùshì chá, érshì yīzhǒng jiézòu——yuànyì zuò xiàlái mànmàn pǐn de nàixīn.', translationFr: 'En surface, oui. Mais ce qui disparaît, ce n\'est peut-être pas le thé — c\'est un rythme, la patience de s\'asseoir et de déguster lentement.', translationEn: 'On the surface, yes. But what\'s vanishing may not be tea itself — it\'s a rhythm, the patience to sit and savor slowly.' },
      { speaker: '小陈', hanzi: '您的意思是：问题不在饮品本身，而在整个生活方式？', pinyin: 'Nín de yìsi shì: wèntí bù zài yǐnpǐn běnshēn, ér zài zhěnggè shēnghuó fāngshì?', translationFr: 'Vous voulez dire que le problème n\'est pas la boisson, mais tout un mode de vie ?', translationEn: 'You mean the problem isn\'t the drink itself, but an entire way of living?' },
      { speaker: '师父', hanzi: '可以这么说。年轻人工作压力大，他们要的是方便、快速、甜一点的安慰。这本身没有错。', pinyin: 'Kěyǐ zhème shuō. Niánqīngrén gōngzuò yālì dà, tāmen yào de shì fāngbiàn, kuàisù, tián yīdiǎn de ānwèi. Zhè běnshēn méiyǒu cuò.', translationFr: 'On peut le dire ainsi. Les jeunes sont sous pression — ils cherchent un réconfort pratique, rapide et un peu sucré. Il n\'y a rien de mal à cela.', translationEn: 'You could put it that way. Young people are under heavy work pressure — they want comfort that\'s convenient, fast, and a bit sweet. There\'s nothing wrong with that in itself.' },
      { speaker: '小陈', hanzi: '那传统茶文化就只能等着被淘汰吗？', pinyin: 'Nà chuántǒng chá wénhuà jiù zhǐ néng děngzhe bèi táotài ma?', translationFr: 'Alors la culture du thé traditionnelle n\'a plus qu\'à attendre d\'être balayée ?', translationEn: 'So traditional tea culture just has to sit and wait to be swept aside?' },
      { speaker: '师父', hanzi: '不会。真正的文化不怕被冷落一时，它总会以新的方式回来。这几年你也看到，国风、汉服、传统节日都在回潮。', pinyin: 'Bù huì. Zhēnzhèng de wénhuà bùpà bèi lěngluò yīshí, tā zǒng huì yǐ xīn de fāngshì huílái. Zhè jǐ nián nǐ yě kàndào, guófēng, hànfú, chuántǒng jiérì dōu zài huícháo.', translationFr: 'Non. Une vraie culture ne craint pas d\'être un temps délaissée ; elle revient toujours, sous une forme nouvelle. Ces dernières années, tu l\'as vu : le « style chinois », le hanfu, les fêtes traditionnelles reviennent en force.', translationEn: 'No. A real culture isn\'t afraid of being overlooked for a while — it always returns in a new form. In recent years you\'ve seen it: guofeng style, hanfu clothing, traditional festivals are all surging back.' },
      { speaker: '小陈', hanzi: '是的，抖音上有不少年轻博主在做茶的内容，动辄几十万粉丝。', pinyin: 'Shì de, Dǒuyīn shàng yǒu bùshǎo niánqīng bózhǔ zài zuò chá de nèiróng, dòngzhé jǐshí wàn fěnsī.', translationFr: 'C\'est vrai, sur Douyin, beaucoup de jeunes créateurs publient sur le thé — et certains ont plusieurs centaines de milliers d\'abonnés.', translationEn: 'True — on Douyin there are plenty of young creators making tea content, many with hundreds of thousands of followers.' },
      { speaker: '师父', hanzi: '这就是变化。十年前我们担心年轻人不喝茶，现在他们通过短视频重新认识茶，只是入口换了。', pinyin: 'Zhè jiùshì biànhuà. Shí nián qián wǒmen dānxīn niánqīngrén bù hē chá, xiànzài tāmen tōngguò duǎn shìpín chóngxīn rènshí chá, zhǐshì rùkǒu huànle.', translationFr: 'Voilà le changement. Il y a dix ans, on craignait que les jeunes ne boivent plus de thé ; aujourd\'hui, ils le redécouvrent par les vidéos courtes — la porte d\'entrée a juste changé.', translationEn: 'That\'s the shift. Ten years ago we feared young people would stop drinking tea; today they\'re rediscovering it through short videos — only the entry point has changed.' },
      { speaker: '小陈', hanzi: '不过有些博主把茶当作表演，讲的东西其实很浅，有时候甚至是错的。', pinyin: 'Bùguò yǒuxiē bózhǔ bǎ chá dàngzuò biǎoyǎn, jiǎng de dōngxī qíshí hěn qiǎn, yǒu shíhòu shènzhì shì cuò de.', translationFr: 'Mais certains créateurs traitent le thé comme un spectacle — ce qu\'ils disent est souvent superficiel, parfois même faux.', translationEn: 'Still, some creators treat tea as performance — what they say is often shallow, and sometimes plain wrong.' },
      { speaker: '师父', hanzi: '这是新媒介必然要付的代价。关键是，总会有人从浅层的兴趣出发，慢慢走到深处。', pinyin: 'Zhè shì xīn méijiè bìrán yào fù de dàijià. Guānjiàn shì, zǒng huì yǒurén cóng qiǎncéng de xìngqù chūfā, mànmàn zǒu dào shēnchù.', translationFr: 'C\'est le prix à payer pour tout nouveau média. L\'essentiel, c\'est que certains partent d\'un intérêt superficiel et finissent par aller en profondeur.', translationEn: 'That\'s the price any new medium has to pay. What matters is that some people start with a shallow interest and eventually find their way deeper.' },
      { speaker: '小陈', hanzi: '师父，您觉得我们这一代的茶人，该扮演什么角色？', pinyin: 'Shīfu, nín juéde wǒmen zhè yīdài de chárén, gāi bànyǎn shénme juésè?', translationFr: 'Maître, selon vous, quel rôle devrait jouer notre génération de gens du thé ?', translationEn: 'Shifu, what role do you think our generation of tea people should play?' },
      { speaker: '师父', hanzi: '三件事：守住工艺，把故事讲清楚，让喝茶这件事本身有乐趣。别端着架子去教人。', pinyin: 'Sān jiàn shì: shǒu zhù gōngyì, bǎ gùshi jiǎng qīngchu, ràng hē chá zhè jiàn shì běnshēn yǒu lèqù. Bié duānzhe jiàzi qù jiào rén.', translationFr: 'Trois choses : préserver le savoir-faire, raconter l\'histoire clairement, et faire que boire du thé reste un plaisir. Ne jamais prendre de grands airs pour enseigner.', translationEn: 'Three things: preserve the craft, tell the story clearly, and make drinking tea itself a pleasure. Never put on airs when teaching others.', note: '端着架子 = "prendre de grands airs", être condescendant — expression très courante.', noteEn: '端着架子 = "to put on airs" / act superior — a very common idiom.' },
      { speaker: '小陈', hanzi: '"别端着架子"——这一点我特别赞同。传统文化一旦变成说教，就没人愿意听了。', pinyin: '"Bié duānzhe jiàzi"——zhè yīdiǎn wǒ tèbié zàntóng. Chuántǒng wénhuà yīdàn biànchéng shuōjiào, jiù méi rén yuànyì tīng le.', translationFr: '« Ne pas prendre de grands airs » — je suis entièrement d\'accord. Dès que la culture traditionnelle vire au prêche, plus personne n\'écoute.', translationEn: '"Don\'t put on airs" — I fully agree. The moment traditional culture turns into preaching, no one wants to listen anymore.' },
      { speaker: '师父', hanzi: '正是如此。茶是生活的一部分，不是博物馆里的展品。让它自然地融入日常，才是真正的传承。', pinyin: 'Zhèng shì rúcǐ. Chá shì shēnghuó de yībùfèn, bùshì bówùguǎn lǐ de zhǎnpǐn. Ràng tā zìrán de róngrù rìcháng, cái shì zhēnzhèng de chuánchéng.', translationFr: 'Exactement. Le thé fait partie de la vie ; ce n\'est pas une pièce de musée. Qu\'il se fonde naturellement dans le quotidien — voilà ce qu\'est une vraie transmission.', translationEn: 'Exactly. Tea is part of life, not a museum exhibit. Letting it blend naturally into daily life — that\'s real transmission.' },
      { speaker: '小陈', hanzi: '谢谢师父。今天这杯茶，我要慢慢喝。', pinyin: 'Xièxiè shīfu. Jīntiān zhè bēi chá, wǒ yào mànmàn hē.', translationFr: 'Merci maître. Cette tasse-là, je vais la boire lentement.', translationEn: 'Thank you, shifu. This cup — I\'ll drink it slowly.' },
      { speaker: '师父', hanzi: '慢慢喝才对。这就是今天的课。', pinyin: 'Mànmàn hē cái duì. Zhè jiùshì jīntiān de kè.', translationFr: 'La boire lentement, c\'est justement ça. Voilà la leçon d\'aujourd\'hui.', translationEn: 'Drinking it slowly is exactly it. That\'s today\'s lesson.' }
    ],
    vocab: [
      '品茶', '奶茶', '茶馆', '节奏', '耐心', '淘汰',
      '回潮', '国风', '汉服', '博主', '粉丝', '短视频',
      '浅', '代价', '工艺', '传承', '端着架子', '说教'
    ],
    comprehension: {
      questionFr: "Selon le maître, quel est le vrai problème soulevé par l'essor du bubble tea ?",
      questionEn: 'According to the master, what is the real issue raised by the rise of bubble tea?',
      answerFr: "Ce n'est pas la boisson elle-même, mais la perte d'une certaine patience et d'un rythme lent dans la vie quotidienne.",
      answerEn: 'Not the drink itself, but the loss of a certain patience and of a slow rhythm in daily life.'
    }
  }
};

// ============================================================================
//  EXPORTS
// ============================================================================

export const cecrB2ExtraReadings: ReadingEntry[] = [
  AI_AND_WORK,
  POST_PANDEMIC_ECONOMY,
  ANALECTS_EXCERPT,
  INTANGIBLE_HERITAGE
];

export const cecrB2ExtraDialogues: DialogueEntry[] = [
  STARTUP_PITCH_DIALOGUE,
  MENTAL_HEALTH_DEBATE,
  TEA_CULTURE_DIALOGUE
];
