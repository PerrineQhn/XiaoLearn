/**
 * cecr-c1-1-learn-sections.ts — contenu pédagogique manuel C1.1
 * (Conversation soutenue + Nuances de style soutenu).
 *
 * Convention audio : audio/hsk{N}/hsk{N}_{hanzi}.wav
 */

import type { LessonV2LearnSection } from '../types/lesson-learn';

// === CONVERSATION C1.1 =======================================================

export const c11ConvM1LearnSections: LessonV2LearnSection[] = [
  {
    id: 'c11-conf-academique',
    title: 'Intervenir dans un colloque académique',
    titleEn: 'Speak at an academic conference',
    body:
      'Ouvrir : 各位老师，各位同学，下午好. Présenter sa contribution : 我今天想从 X 的角度分析 Y (j\'aimerais analyser Y sous l\'angle X). Citer un travail antérieur : 正如 X 教授在 Y 中提到的 (comme le pr X l\'a souligné dans Y). Énoncer une thèse : 我的核心观点是 X (mon argument central est X). Conclure : 综上所述 (en somme — formule très académique), 我的论点是 X (ma thèse est X). Phrase de modestie attendue en fin : 不足之处，请各位指正 (merci de signaler les imperfections).',
    bodyEn:
      'Open: 各位老师，各位同学，下午好. Frame contribution: 我今天想从 X 的角度分析 Y (today I\'d like to analyze Y from angle X). Cite prior work: 正如 X 教授在 Y 中提到的 (as Pr X noted in Y). State a thesis: 我的核心观点是 X (my central argument is X). Close: 综上所述 (in sum — very academic), 我的论点是 X (my thesis is X). Expected modesty in closing: 不足之处，请各位指正 (please point out shortcomings).',
    items: [
      { hanzi: '观点', pinyin: 'guān diǎn', meaning: 'point de vue', meaningEn: 'viewpoint', audio: 'audio/hsk5/hsk5_观点.wav' },
      { hanzi: '论点', pinyin: 'lùn diǎn', meaning: 'thèse, argument', meaningEn: 'thesis', audio: 'audio/hsk6/hsk6_论点.wav' },
      { hanzi: '综上所述', pinyin: 'zōng shàng suǒ shù', meaning: 'en somme', meaningEn: 'in sum', audio: 'audio/hsk6/hsk6_综上.wav' },
      { hanzi: '指正', pinyin: 'zhǐ zhèng', meaning: 'corriger (poliment)', meaningEn: 'kindly correct', audio: 'audio/hsk6/hsk6_指正.wav' },
      { hanzi: '不足', pinyin: 'bù zú', meaning: 'insuffisance', meaningEn: 'shortcoming', audio: 'audio/hsk5/hsk5_不足.wav' }
    ],
    tip:
      '« 不足之处，请各位指正 » est la formule de modestie OBLIGATOIRE en fin de présentation académique chinoise. Sans elle, l\'intervention paraît arrogante, même si tout est rigoureux.',
    tipEn:
      '«不足之处，请各位指正» is the MANDATORY closing modesty formula in Chinese academic talks. Without it, the talk feels arrogant, even if rigorous.'
  },
  {
    id: 'c11-q-and-a',
    title: 'Q&A : répondre à une question critique',
    titleEn: 'Q&A: respond to a critical question',
    body:
      'Reconnaître la question : 您提的问题非常重要 / 这是一个很好的问题. Gagner du temps : 让我想一下 (laissez-moi réfléchir). Restituer : 您的意思是 X，对吗 ? (vous voulez dire X ?). Réponse en 3 temps : 首先… 其次… 最后…. Si tu ne sais pas : 这一点我还没有深入研究，但我的初步看法是 X (sur ce point je n\'ai pas approfondi, mais mon avis préliminaire est X) — montre l\'humilité intellectuelle, valorisée. Conclure poliment : 谢谢您的提问，希望我的回答能解答您的疑问.',
    bodyEn:
      'Acknowledge: 您提的问题非常重要 / 这是一个很好的问题. Buy time: 让我想一下 (let me think). Restate: 您的意思是 X，对吗？(you mean X?). Answer in 3 parts: 首先… 其次… 最后…. If you don\'t know: 这一点我还没有深入研究，但我的初步看法是 X (I haven\'t deeply researched this, but my preliminary view is X) — shows intellectual humility, valued. Close politely: 谢谢您的提问，希望我的回答能解答您的疑问.',
    items: [
      { hanzi: '提问', pinyin: 'tí wèn', meaning: 'poser une question', meaningEn: 'pose a question', audio: 'audio/hsk5/hsk5_提问.wav' },
      { hanzi: '深入', pinyin: 'shēn rù', meaning: 'approfondir', meaningEn: 'go deep', audio: 'audio/hsk5/hsk5_深入.wav' },
      { hanzi: '初步', pinyin: 'chū bù', meaning: 'préliminaire', meaningEn: 'preliminary', audio: 'audio/hsk6/hsk6_初步.wav' },
      { hanzi: '解答', pinyin: 'jiě dá', meaning: 'répondre, élucider', meaningEn: 'answer (formal)', audio: 'audio/hsk6/hsk6_解答.wav' },
      { hanzi: '疑问', pinyin: 'yí wèn', meaning: 'doute, question', meaningEn: 'query', audio: 'audio/hsk5/hsk5_疑问.wav' }
    ],
    tip:
      'Reconnaître l\'humilité épistémique (« je n\'ai pas approfondi ») est culturellement RESPECTÉ en milieu académique chinois. Bluffer = perte de face si le panel détecte la faiblesse.',
    tipEn:
      'Acknowledging epistemic humility («I haven\'t researched this deeply») is culturally RESPECTED in Chinese academia. Bluffing = loss of face if the panel detects the weakness.'
  }
];

export const c11ConvM2LearnSections: LessonV2LearnSection[] = [
  {
    id: 'c11-interview-formel',
    title: 'Entretien d\'embauche cadre supérieur',
    titleEn: 'Senior executive job interview',
    body:
      'Présentation : 我毕业于 X 大学，主修 X，目前担任 X (j\'ai étudié X à l\'université X, je suis actuellement X). Forces : 我擅长 X (je suis bon en X). Faiblesses (question piège) : 我有时过于追求完美，但我正在学习平衡 (parfois trop perfectionniste, j\'apprends à équilibrer) — formule sécurisée chinoise (faiblesse → travail dessus). Pourquoi cette boîte : 贵公司在 X 领域的领先地位让我非常向往 (votre leadership en X m\'attire). Question salaire : 关于薪资，我希望听听贵公司的标准 (sur le salaire, j\'aimerais entendre votre référentiel) — RENVOIE la question, ne propose pas de chiffre.',
    bodyEn:
      'Self-intro: 我毕业于 X 大学，主修 X，目前担任 X. Strengths: 我擅长 X. Weaknesses (trap question): 我有时过于追求完美，但我正在学习平衡 — Chinese safe formula (flaw → working on it). Why this company: 贵公司在 X 领域的领先地位让我非常向往. Salary question: 关于薪资，我希望听听贵公司的标准 — DEFLECT, don\'t name a figure first.',
    items: [
      { hanzi: '担任', pinyin: 'dān rèn', meaning: 'occuper (poste)', meaningEn: 'hold (position)', audio: 'audio/hsk5/hsk5_担任.wav' },
      { hanzi: '擅长', pinyin: 'shàn cháng', meaning: 'être bon en', meaningEn: 'be good at', audio: 'audio/hsk5/hsk5_擅长.wav' },
      { hanzi: '完美', pinyin: 'wán měi', meaning: 'parfait', meaningEn: 'perfect', audio: 'audio/hsk5/hsk5_完美.wav' },
      { hanzi: '领先', pinyin: 'lǐng xiān', meaning: 'leader, en tête', meaningEn: 'leading', audio: 'audio/hsk5/hsk5_领先.wav' },
      { hanzi: '薪资', pinyin: 'xīn zī', meaning: 'salaire', meaningEn: 'salary', audio: 'audio/hsk6/hsk6_薪资.wav' }
    ],
    tip:
      'Sur la question SALAIRE en entretien chinois, ne donne JAMAIS un chiffre en premier. Le candidat qui retourne la question (« 听听贵公司的标准 ») montre maturité et négocie mieux. Règle d\'or partagée par tous les coachs.',
    tipEn:
      'On the SALARY question in Chinese interviews, NEVER name a figure first. A candidate who deflects («听听贵公司的标准») shows maturity and negotiates better. Golden rule shared by all coaches.'
  },
  {
    id: 'c11-presenter-equipe',
    title: 'Présenter son équipe à la nouvelle direction',
    titleEn: 'Present your team to new management',
    body:
      'Cadre : nouveau directeur arrive, tu présentes ton équipe. Structure : 名字 → 职位 → 主要负责 → 一句亮点 (nom, poste, responsabilité, une force). Ex : 这位是张明，我们的高级工程师，主要负责 X 项目，他在 Y 方面经验非常丰富. Mettre en valeur SANS trop louer : 经验丰富 (expérimenté), 工作认真 (sérieux), 有独到的见解 (a une perspective unique). Conclure : 我们团队希望与您共同努力，把工作做得更好 (notre équipe espère travailler avec vous). Le 共同努力 (effort commun) est la formule de loyauté/cohésion attendue.',
    bodyEn:
      'Frame: new director arrives, you intro your team. Structure: 名字 → 职位 → 主要负责 → 一句亮点 (name, role, responsibility, one strength). Ex: 这位是张明，我们的高级工程师，主要负责 X 项目，他在 Y 方面经验非常丰富. Highlight WITHOUT over-praising: 经验丰富, 工作认真, 有独到的见解. Close: 我们团队希望与您共同努力，把工作做得更好. The 共同努力 (joint effort) is the expected loyalty/cohesion formula.',
    items: [
      { hanzi: '高级', pinyin: 'gāo jí', meaning: 'senior', meaningEn: 'senior', audio: 'audio/hsk5/hsk5_高级.wav' },
      { hanzi: '工程师', pinyin: 'gōng chéng shī', meaning: 'ingénieur', meaningEn: 'engineer', audio: 'audio/hsk5/hsk5_工程师.wav' },
      { hanzi: '丰富', pinyin: 'fēng fù', meaning: 'riche, abondant', meaningEn: 'rich', audio: 'audio/hsk4/hsk4_丰富.wav' },
      { hanzi: '独到', pinyin: 'dú dào', meaning: 'unique', meaningEn: 'unique', audio: 'audio/hsk6/hsk6_独到.wav' },
      { hanzi: '见解', pinyin: 'jiàn jiě', meaning: 'point de vue, vision', meaningEn: 'insight', audio: 'audio/hsk6/hsk6_见解.wav' }
    ],
    tip:
      'Loue ton équipe avec des formules MESURÉES (« 经验丰富 ») plutôt qu\'extrêmes (« 最厉害 »). En Chine, l\'éloge excessif décrédibilise — la mesure montre du jugement.',
    tipEn:
      'Praise your team with MEASURED phrases («经验丰富») rather than extreme («最厉害»). In China, over-praise discredits — measure shows judgment.'
  }
];

export const c11ConvM3LearnSections: LessonV2LearnSection[] = [
  {
    id: 'c11-debat-formel',
    title: 'Débat formel : structurer une intervention',
    titleEn: 'Formal debate: structure an intervention',
    body:
      'Formule d\'ouverture : 我对 X 的看法是 Y, 我有三个主要论据 (j\'ai 3 arguments principaux). Marquer la structure : 第一，X / 第二，Y / 第三，Z. Citer une autorité : 根据 X 的研究 (selon les recherches de X). Anticiper l\'objection : 有人可能会反驳说 X，但 Y (on pourrait objecter X, mais Y). Concession + reprise : 诚然 X，然而 Y (certes X, cependant Y) — formule très soutenue. Conclure : 综上所述, 我坚信 X (en conclusion, je suis convaincu de X). 坚信 (jiānxìn, croire fermement) marque l\'engagement intellectuel.',
    bodyEn:
      'Opening: 我对 X 的看法是 Y, 我有三个主要论据 (I have 3 main arguments). Mark structure: 第一，X / 第二，Y / 第三，Z. Cite authority: 根据 X 的研究 (per X\'s research). Anticipate objection: 有人可能会反驳说 X，但 Y. Concession + recovery: 诚然 X，然而 Y (admittedly X, however Y) — very formal phrase. Close: 综上所述, 我坚信 X (in conclusion, I firmly believe X). 坚信 (jiānxìn, firmly believe) marks intellectual commitment.',
    items: [
      { hanzi: '论据', pinyin: 'lùn jù', meaning: 'argument, preuve', meaningEn: 'argument, evidence', audio: 'audio/hsk6/hsk6_论据.wav' },
      { hanzi: '反驳', pinyin: 'fǎn bó', meaning: 'réfuter', meaningEn: 'rebut', audio: 'audio/hsk6/hsk6_反驳.wav' },
      { hanzi: '诚然', pinyin: 'chéng rán', meaning: 'certes, à vrai dire', meaningEn: 'admittedly', audio: 'audio/hsk6/hsk6_诚然.wav' },
      { hanzi: '然而', pinyin: 'rán ér', meaning: 'cependant', meaningEn: 'however', audio: 'audio/hsk5/hsk5_然而.wav' },
      { hanzi: '坚信', pinyin: 'jiān xìn', meaning: 'croire fermement', meaningEn: 'firmly believe', audio: 'audio/hsk6/hsk6_坚信.wav' }
    ],
    tip:
      'Combo gagnant en débat C1 : « 诚然 X，然而 Y ». La concession (诚然) désamorce l\'opposant ; la reprise (然而) rétablit ta position. Marque la maîtrise rhétorique.',
    tipEn:
      'C1 winning combo in debate: «诚然 X，然而 Y». The concession (诚然) disarms the opponent; the recovery (然而) restores your position. Marks rhetorical mastery.'
  },
  {
    id: 'c11-rebuttal',
    title: 'Réfuter une thèse adverse avec élégance',
    titleEn: 'Refute an opposing thesis elegantly',
    body:
      'Reconnaître la position : 我理解 X 的论点 (je comprends l\'argument de X), 但是… Préfère 但是 doux à 不对 (faux). Distinguer : 我认为 X 的观点忽略了一个重要因素 (votre vision néglige un facteur important — sans dire « tu as tort »). Démolir une donnée : 这个数据值得商榷 (cette donnée mérite discussion — euphémisme pour « contestable »). Démolir la logique : 这个推理存在跳跃 (ce raisonnement contient un saut logique). Conclure : 因此，我倾向于另一种解读 (je penche vers une autre interprétation). 倾向 (qīngxiàng, pencher) adoucit la conclusion.',
    bodyEn:
      'Acknowledge: 我理解 X 的论点 (I understand X\'s argument), 但是… Prefer soft 但是 to 不对 (wrong). Distinguish: 我认为 X 的观点忽略了一个重要因素 (your view overlooks a key factor — without saying «wrong»). Take down a datum: 这个数据值得商榷 (this datum is debatable — euphemism for «questionable»). Take down logic: 这个推理存在跳跃 (this reasoning has a logical leap). Close: 因此，我倾向于另一种解读 (I lean toward another reading). 倾向 (lean) softens the conclusion.',
    items: [
      { hanzi: '忽略', pinyin: 'hū lüè', meaning: 'négliger', meaningEn: 'overlook', audio: 'audio/hsk6/hsk6_忽略.wav' },
      { hanzi: '商榷', pinyin: 'shāng què', meaning: 'discuter, débattre', meaningEn: 'discuss, debate', audio: 'audio/hsk6/hsk6_商榷.wav' },
      { hanzi: '推理', pinyin: 'tuī lǐ', meaning: 'raisonnement', meaningEn: 'reasoning', audio: 'audio/hsk6/hsk6_推理.wav' },
      { hanzi: '解读', pinyin: 'jiě dú', meaning: 'interprétation', meaningEn: 'interpretation', audio: 'audio/hsk6/hsk6_解读.wav' },
      { hanzi: '倾向', pinyin: 'qīng xiàng', meaning: 'pencher vers', meaningEn: 'lean toward', audio: 'audio/hsk5/hsk5_倾向.wav' }
    ],
    tip:
      '« 这个数据值得商榷 » est la formule magique pour CONTESTER une donnée sans agressivité. Bien plus élégante que « 这个数据是错的 ». Utilise systématiquement en débat académique.',
    tipEn:
      '«这个数据值得商榷» is the magic formula to CONTEST data without aggression. Far more elegant than «这个数据是错的». Use systematically in academic debate.'
  }
];

export const c11ConvM4LearnSections: LessonV2LearnSection[] = [
  {
    id: 'c11-discours-presse',
    title: 'Donner une interview à la presse',
    titleEn: 'Give a press interview',
    body:
      'Phrases-clés : 谢谢您的关注 (merci de votre attention) en intro. Réponse complète : 这是一个复杂的问题，我可以从几个角度回答 (question complexe, je vais répondre sous plusieurs angles). Éviter de s\'engager : 现在下结论还为时过早 (il est trop tôt pour conclure). Recadrer : 我想强调的是 X (je tiens à souligner X). Si la question est sensible : 这个问题很敏感，我需要谨慎回答 (cette question est sensible, je dois répondre avec prudence). Pour une question piège : 我不太理解您的问题，能否再具体一点 ? (gagner du temps en demandant des précisions).',
    bodyEn:
      'Key phrases: 谢谢您的关注 (thanks for your attention) at start. Full answer: 这是一个复杂的问题，我可以从几个角度回答 (complex question, I\'ll answer from several angles). Avoid commitment: 现在下结论还为时过早 (too early to conclude). Reframe: 我想强调的是 X (I want to stress X). If sensitive: 这个问题很敏感，我需要谨慎回答 (this question is sensitive, I need to answer carefully). Trap question: 我不太理解您的问题，能否再具体一点？(buy time by asking for specifics).',
    items: [
      { hanzi: '关注', pinyin: 'guān zhù', meaning: 'attention, intérêt', meaningEn: 'attention', audio: 'audio/hsk5/hsk5_关注.wav' },
      { hanzi: '复杂', pinyin: 'fù zá', meaning: 'complexe', meaningEn: 'complex', audio: 'audio/hsk4/hsk4_复杂.wav' },
      { hanzi: '为时过早', pinyin: 'wéi shí guò zǎo', meaning: 'trop tôt', meaningEn: 'too early', audio: 'audio/hsk6/hsk6_为时.wav' },
      { hanzi: '敏感', pinyin: 'mǐn gǎn', meaning: 'sensible', meaningEn: 'sensitive', audio: 'audio/hsk5/hsk5_敏感.wav' },
      { hanzi: '谨慎', pinyin: 'jǐn shèn', meaning: 'prudent', meaningEn: 'prudent', audio: 'audio/hsk6/hsk6_谨慎.wav' }
    ],
    tip:
      '« 现在下结论还为时过早 » = formule presse magique pour ne pas s\'engager sans paraître évasif. Officials chinois l\'utilisent constamment. À mémoriser pour toute prise de parole publique.',
    tipEn:
      '«现在下结论还为时过早» = magic press formula to avoid commitment without sounding evasive. Chinese officials use it constantly. Memorize for any public speaking.'
  },
  {
    id: 'c11-statement-officiel',
    title: 'Faire une déclaration officielle',
    titleEn: 'Make an official statement',
    body:
      'Format : ouverture solennelle 各位记者朋友，下午好 → corps de la déclaration → conclusion. Vocab : 立场 (position officielle), 表态 (prendre position), 强调 (souligner), 重申 (réitérer). Phrases-types : 我们的立场是明确的 (notre position est claire). 我们坚决反对 X (nous nous opposons fermement à X). 我们呼吁各方 X (nous appelons toutes les parties à X). 我们将继续关注 X 的发展 (nous suivrons l\'évolution de X). Conclure : 谢谢大家. JAMAIS de questions improvisées en déclaration officielle — laisse aux questions structurées après.',
    bodyEn:
      'Format: solemn opening 各位记者朋友，下午好 → body → conclusion. Vocab: 立场 (official position), 表态 (take a stand), 强调 (stress), 重申 (reiterate). Set phrases: 我们的立场是明确的 (our position is clear). 我们坚决反对 X (we firmly oppose X). 我们呼吁各方 X (we call on all parties to X). 我们将继续关注 X 的发展 (we will keep monitoring X). Close: 谢谢大家. NEVER take unscripted questions during the statement — save for structured Q&A.',
    items: [
      { hanzi: '立场', pinyin: 'lì chǎng', meaning: 'position, stance', meaningEn: 'stance', audio: 'audio/hsk5/hsk5_立场.wav' },
      { hanzi: '强调', pinyin: 'qiáng diào', meaning: 'souligner', meaningEn: 'emphasize', audio: 'audio/hsk5/hsk5_强调.wav' },
      { hanzi: '重申', pinyin: 'chóng shēn', meaning: 'réitérer', meaningEn: 'reiterate', audio: 'audio/hsk6/hsk6_重申.wav' },
      { hanzi: '坚决', pinyin: 'jiān jué', meaning: 'résolument', meaningEn: 'resolutely', audio: 'audio/hsk5/hsk5_坚决.wav' },
      { hanzi: '呼吁', pinyin: 'hū yù', meaning: 'appeler à', meaningEn: 'call upon', audio: 'audio/hsk6/hsk6_呼吁.wav' }
    ],
    tip:
      '« 我们将继续关注 X 的发展 » = formule officielle pour clore poliment SANS s\'engager. Très utilisée en diplomatie chinoise. À adapter selon le sujet.',
    tipEn:
      '«我们将继续关注 X 的发展» = official formula to close politely WITHOUT committing. Very used in Chinese diplomacy. Adapt to the topic.'
  }
];

export const c11ConvM5LearnSections: LessonV2LearnSection[] = [
  {
    id: 'c11-table-banquet',
    title: 'Banquet d\'affaires : codes culturels',
    titleEn: 'Business banquet: cultural codes',
    body:
      'Placement : invité d\'honneur en face de la porte ; hôte le plus important dos à la porte. Plats : ne JAMAIS finir entièrement son assiette (signe : tu n\'as pas eu assez). Toasts : avec un supérieur, ton verre PLUS BAS que le sien (marque de respect). Servir le voisin avant soi-même. Refuser un plat : 谢谢，我吃饱了，您慢慢吃 (merci, j\'ai assez mangé, prenez votre temps). Vocab : 主宾 (invité d\'honneur), 敬酒 (porter un toast), 干杯 (cul sec), 随意 (à votre convenance, petite gorgée). Phrases : 大家随意 (servez-vous), 来，我敬您一杯 (je vous porte un toast).',
    bodyEn:
      'Seating: guest of honor faces the door; main host backs to door. Dishes: NEVER fully finish your plate (signal: you didn\'t get enough). Toasts: with a superior, your glass LOWER than theirs (respect). Serve your neighbor before yourself. Refuse a dish: 谢谢，我吃饱了，您慢慢吃. Vocab: 主宾 (guest of honor), 敬酒 (toast), 干杯 (bottoms up), 随意 (small sip). Phrases: 大家随意 (help yourselves), 来，我敬您一杯 (let me toast you).',
    items: [
      { hanzi: '主宾', pinyin: 'zhǔ bīn', meaning: 'invité d\'honneur', meaningEn: 'guest of honor', audio: 'audio/hsk6/hsk6_主宾.wav' },
      { hanzi: '敬酒', pinyin: 'jìng jiǔ', meaning: 'porter un toast', meaningEn: 'toast', audio: 'audio/hsk5/hsk5_敬酒.wav' },
      { hanzi: '吃饱', pinyin: 'chī bǎo', meaning: 'avoir mangé à sa faim', meaningEn: 'be full', audio: 'audio/hsk2/hsk2_吃饱.wav' },
      { hanzi: '夹', pinyin: 'jiā', meaning: 'pincer (avec baguettes)', meaningEn: 'pick up (chopsticks)', audio: 'audio/hsk5/hsk5_夹.wav' },
      { hanzi: '招待', pinyin: 'zhāo dài', meaning: 'recevoir, accueillir', meaningEn: 'host, entertain', audio: 'audio/hsk5/hsk5_招待.wav' }
    ],
    tip:
      'Règle des baguettes : ne JAMAIS planter les baguettes verticalement dans le riz (rappelle l\'encens funéraire). Pose-les sur le repose-baguettes. Erreur grave si commise devant des hôtes traditionnels.',
    tipEn:
      'Chopstick rule: NEVER stick chopsticks vertically in rice (recalls funeral incense). Rest them on the holder. Serious mistake in front of traditional hosts.'
  },
  {
    id: 'c11-cadeau-dindon',
    title: 'Offrir et recevoir un cadeau d\'affaires',
    titleEn: 'Give and receive a business gift',
    body:
      'Offrir : présenter le cadeau À DEUX MAINS, légèrement incliné. Phrase : 这是一份小礼物，请收下 (un petit cadeau, acceptez). 不成敬意 (qui n\'est pas digne de votre respect) = formule de modestie obligatoire. Le receveur DOIT refuser 1-2 fois avant d\'accepter (rituel). Refus poli initial : 您太客气了，不必这样 (vous êtes trop poli, pas la peine). Cadeaux à ÉVITER : horloges (送钟 sounds like 送终 = funérailles), parapluies (散 sounds like 散 = séparation), chaussures, couteaux. Cadeaux SAFE : thé de qualité, alcool importé, pâtisseries de marque, fruits.',
    bodyEn:
      'Give: present the gift WITH BOTH HANDS, slightly bowed. Phrase: 这是一份小礼物，请收下. 不成敬意 (unworthy of your respect) = mandatory modesty formula. The receiver MUST refuse 1-2 times before accepting (ritual). Polite initial refusal: 您太客气了，不必这样. Gifts to AVOID: clocks (送钟 sounds like 送终 = funeral), umbrellas (sounds like 散 = separation), shoes, knives. SAFE gifts: quality tea, imported alcohol, branded pastries, fruits.',
    items: [
      { hanzi: '礼物', pinyin: 'lǐ wù', meaning: 'cadeau', meaningEn: 'gift', audio: 'audio/hsk3/hsk3_礼物.wav' },
      { hanzi: '收下', pinyin: 'shōu xià', meaning: 'accepter (cadeau)', meaningEn: 'accept (gift)', audio: 'audio/hsk2/hsk2_收下.wav' },
      { hanzi: '客气', pinyin: 'kè qi', meaning: 'poli, formel', meaningEn: 'polite', audio: 'audio/hsk2/hsk2_客气.wav' },
      { hanzi: '不成敬意', pinyin: 'bù chéng jìng yì', meaning: 'modeste cadeau', meaningEn: 'small token', audio: 'audio/hsk6/hsk6_敬意.wav' },
      { hanzi: '送', pinyin: 'sòng', meaning: 'offrir, accompagner', meaningEn: 'give, see off', audio: 'audio/hsk2/hsk2_送.wav' }
    ],
    tip:
      'Le cadeau s\'offre TOUJOURS à deux mains. Le faire d\'une seule main est perçu comme désinvolte/irrespectueux, même si la valeur du cadeau est grande. Détail qui compte beaucoup.',
    tipEn:
      'A gift is ALWAYS offered with both hands. Single-hand giving feels casual/disrespectful, even if the gift is valuable. A detail that matters a lot.'
  }
];

export const c11ConvM6LearnSections: LessonV2LearnSection[] = [
  {
    id: 'c11-mediation-diplomatique',
    title: 'Médiation diplomatique légère',
    titleEn: 'Light diplomatic mediation',
    body:
      'Cadre : litige entre 2 partenaires d\'affaires, 2 amis, 2 départements. Position d\'ouverture : 我作为中间人，希望帮助双方找到共识 (en tant qu\'intermédiaire, j\'aimerais aider à trouver un consensus). Reformuler chaque partie : 我理解 X 方的关切是… / Y 方的诉求是… (les préoccupations de X / les demandes de Y). Identifier le terrain commun : 双方都希望 X (les deux veulent X). Proposer : 是否可以考虑一种折中方案 ? (pourrait-on considérer un compromis ?). Clore : 让我们以诚意推动事情向前 (avançons avec sincérité). 诚意 (chéngyì, sincérité) est le mot-clé de la médiation chinoise.',
    bodyEn:
      'Frame: dispute between 2 business partners, 2 friends, 2 departments. Opening: 我作为中间人，希望帮助双方找到共识 (as intermediary, I\'d like to help find consensus). Reformulate each side: 我理解 X 方的关切是… / Y 方的诉求是… (X\'s concerns / Y\'s requests). Find common ground: 双方都希望 X. Propose: 是否可以考虑一种折中方案？(could we consider a compromise?). Close: 让我们以诚意推动事情向前. 诚意 (sincerity) is the key word of Chinese mediation.',
    items: [
      { hanzi: '中间人', pinyin: 'zhōng jiān rén', meaning: 'intermédiaire', meaningEn: 'intermediary', audio: 'audio/hsk5/hsk5_中间.wav' },
      { hanzi: '关切', pinyin: 'guān qiè', meaning: 'préoccupation', meaningEn: 'concern', audio: 'audio/hsk6/hsk6_关切.wav' },
      { hanzi: '诉求', pinyin: 'sù qiú', meaning: 'demande, doléance', meaningEn: 'demand, request', audio: 'audio/hsk6/hsk6_诉求.wav' },
      { hanzi: '折中', pinyin: 'zhé zhōng', meaning: 'compromis', meaningEn: 'compromise', audio: 'audio/hsk6/hsk6_折中.wav' },
      { hanzi: '诚意', pinyin: 'chéng yì', meaning: 'sincérité', meaningEn: 'sincerity', audio: 'audio/hsk5/hsk5_诚意.wav' }
    ],
    tip:
      '« 以诚意推动 X 向前 » est la formule diplomatique typique. 诚意 (sincérité) est culturellement une vertu maximale en Chine — la mentionner positionne immédiatement comme un médiateur respecté.',
    tipEn:
      '«以诚意推动 X 向前» is the typical diplomatic formula. 诚意 (sincerity) is culturally a maximum virtue in China — mentioning it immediately positions you as a respected mediator.'
  },
  {
    id: 'c11-recommandation',
    title: 'Recommander quelqu\'un avec poids',
    titleEn: 'Recommend someone with weight',
    body:
      'Format : ouverture, présentation, recommandation, ouverture finale. Phrases : 我郑重向您推荐 X (je vous recommande solennellement X) — 郑重 (zhèngzhòng, solennellement) = mot-clé du sérieux. Qualifier : 他是我合作多年的同事 (collègue de longue date), 他在 X 方面有非常出色的表现 (excellent en X). Force : 我相信 X 一定能为贵公司带来价值 (apportera de la valeur). 我可以为他作担保 (je me porte garant) — engage TA réputation, à utiliser seulement si confiance totale. Conclure : 如有需要，请随时联系我.',
    bodyEn:
      'Format: opening, intro, recommendation, final opening. Phrases: 我郑重向您推荐 X (I solemnly recommend X) — 郑重 (solemnly) = seriousness key word. Qualify: 他是我合作多年的同事 (long-time colleague), 他在 X 方面有非常出色的表现 (excellent in X). Strength: 我相信 X 一定能为贵公司带来价值 (will bring value). 我可以为他作担保 (I vouch for him) — stakes YOUR reputation, use only with full trust. Close: 如有需要，请随时联系我.',
    items: [
      { hanzi: '郑重', pinyin: 'zhèng zhòng', meaning: 'solennellement', meaningEn: 'solemnly', audio: 'audio/hsk6/hsk6_郑重.wav' },
      { hanzi: '推荐', pinyin: 'tuī jiàn', meaning: 'recommander', meaningEn: 'recommend', audio: 'audio/hsk5/hsk5_推荐.wav' },
      { hanzi: '出色', pinyin: 'chū sè', meaning: 'excellent, remarquable', meaningEn: 'outstanding', audio: 'audio/hsk5/hsk5_出色.wav' },
      { hanzi: '价值', pinyin: 'jià zhí', meaning: 'valeur', meaningEn: 'value', audio: 'audio/hsk5/hsk5_价值.wav' },
      { hanzi: '担保', pinyin: 'dān bǎo', meaning: 'garantir', meaningEn: 'vouch for', audio: 'audio/hsk6/hsk6_担保.wav' }
    ],
    tip:
      '« 我可以为他作担保 » est l\'engagement MAXIMUM en recommandation chinoise. Ne l\'utilise que si tu connais vraiment la personne. Si elle déçoit, ta réputation chute aussi — c\'est le système de 信用 (xìnyòng, crédit social).',
    tipEn:
      '«我可以为他作担保» is the MAXIMUM commitment in Chinese recommendation. Use only if you truly know the person. If they disappoint, your reputation falls too — that\'s the 信用 (xìnyòng, social credit) system.'
  }
];

export const c11ConvM7LearnSections: LessonV2LearnSection[] = [
  {
    id: 'c11-courriel-soutenu',
    title: 'Email cadre supérieur : ton soutenu',
    titleEn: 'Senior executive email: formal tone',
    body:
      'Sujet : 关于 X 项目的若干思考 (quelques réflexions sur le projet X) — 若干 (plusieurs) sonne soutenu. Ouverture : 尊敬的 X 总 (cher président X) — 总 (zǒng) est l\'abbréviation très utilisée pour 总裁/总经理. Corps : 经过深思熟虑 (après mûre réflexion), 我有以下几点建议 (j\'ai les suggestions suivantes). Demander : 恳请您拨冗审阅 (j\'ose vous demander de bien vouloir examiner — 恳请 + 拨冗 sont très soutenus). Conclure : 此致 / 顺颂商祺 (cordialement / mes meilleurs vœux d\'affaires). Signer : nom + titre + département.',
    bodyEn:
      'Subject: 关于 X 项目的若干思考 (some thoughts on project X) — 若干 (several) sounds formal. Opening: 尊敬的 X 总 (esteemed President X) — 总 (zǒng) is the widely-used abbreviation for 总裁/总经理. Body: 经过深思熟虑 (after careful reflection), 我有以下几点建议 (I have the following suggestions). Ask: 恳请您拨冗审阅 (I respectfully ask you to kindly review — 恳请 + 拨冗 are very formal). Close: 此致 / 顺颂商祺 (sincerely / business prosperity wishes). Sign: name + title + department.',
    items: [
      { hanzi: '若干', pinyin: 'ruò gān', meaning: 'plusieurs (formel)', meaningEn: 'several (formal)', audio: 'audio/hsk5/hsk5_若干.wav' },
      { hanzi: '深思熟虑', pinyin: 'shēn sī shú lǜ', meaning: 'après mûre réflexion', meaningEn: 'careful thought', audio: 'audio/hsk6/hsk6_深思.wav' },
      { hanzi: '恳请', pinyin: 'kěn qǐng', meaning: 'demander instamment', meaningEn: 'earnestly request', audio: 'audio/hsk6/hsk6_恳请.wav' },
      { hanzi: '拨冗', pinyin: 'bō rǒng', meaning: 'prendre du temps (formel)', meaningEn: 'spare time (formal)', audio: 'audio/hsk6/hsk6_拨冗.wav' },
      { hanzi: '审阅', pinyin: 'shěn yuè', meaning: 'examiner', meaningEn: 'review', audio: 'audio/hsk6/hsk6_审阅.wav' }
    ],
    tip:
      '« 恳请您拨冗审阅 » est la formule de demande la plus respectueuse en chinois pro. Utilisée pour s\'adresser à un supérieur très haut placé. Effet immédiat sur le sérieux perçu.',
    tipEn:
      '«恳请您拨冗审阅» is the most respectful request formula in pro Chinese. Used to address a very senior superior. Immediate effect on perceived seriousness.'
  },
  {
    id: 'c11-rapport-strategique',
    title: 'Présenter un rapport stratégique',
    titleEn: 'Present a strategic report',
    body:
      'Structure : 背景 → 现状分析 → 主要发现 → 战略建议 → 风险评估 → 结论. Verbes-clés : 分析 (analyser), 发现 (découvrir), 建议 (recommander), 评估 (évaluer). Phrases d\'entrée : 本报告旨在 X (ce rapport vise à X) — 旨在 (zhǐzài) sonne très soutenu. Pour les recommandations : 我们建议从以下三个方面入手 (nous recommandons d\'agir sur 3 fronts). Pour les risques : 需要注意的是 X (à noter). Conclure : 综上所述, 我们认为 X 是当前最优选择 (en somme, X est l\'option optimale). 最优 (zuìyōu, optimal) marque la conclusion stratégique.',
    bodyEn:
      'Structure: 背景 → 现状分析 → 主要发现 → 战略建议 → 风险评估 → 结论. Key verbs: 分析 (analyze), 发现 (find), 建议 (recommend), 评估 (assess). Opening phrases: 本报告旨在 X (this report aims to X) — 旨在 (zhǐzài) sounds very formal. For recommendations: 我们建议从以下三个方面入手 (we recommend acting on 3 fronts). For risks: 需要注意的是 X. Close: 综上所述, 我们认为 X 是当前最优选择 (in sum, X is the current optimal choice). 最优 (optimal) marks the strategic conclusion.',
    items: [
      { hanzi: '旨在', pinyin: 'zhǐ zài', meaning: 'viser à', meaningEn: 'aim to', audio: 'audio/hsk6/hsk6_旨在.wav' },
      { hanzi: '战略', pinyin: 'zhàn lüè', meaning: 'stratégie', meaningEn: 'strategy', audio: 'audio/hsk5/hsk5_战略.wav' },
      { hanzi: '评估', pinyin: 'píng gū', meaning: 'évaluer', meaningEn: 'assess', audio: 'audio/hsk6/hsk6_评估.wav' },
      { hanzi: '入手', pinyin: 'rù shǒu', meaning: 'commencer par', meaningEn: 'start from', audio: 'audio/hsk6/hsk6_入手.wav' },
      { hanzi: '最优', pinyin: 'zuì yōu', meaning: 'optimal', meaningEn: 'optimal', audio: 'audio/hsk6/hsk6_最优.wav' }
    ],
    tip:
      '« 本报告旨在 X » est l\'ouverture standard de rapport stratégique en chinois. Très soutenue mais pas pédante. À mémoriser pour tout document écrit C1+.',
    tipEn:
      '«本报告旨在 X» is the standard opening of a strategic report in Chinese. Very formal but not pedantic. Memorize for any C1+ written document.'
  }
];

// === NUANCES C1.1 ============================================================

export const c11NuancesM1LearnSections: LessonV2LearnSection[] = [
  {
    id: 'c11-jianjue-jianding',
    title: '坚决 vs 坚定 vs 坚强 — fermeté en 3 saveurs',
    titleEn: '坚决 vs 坚定 vs 坚强 — firmness in 3 flavors',
    body:
      '坚决 (jiānjué) = résolu dans l\'ACTION (souvent répression / opposition). 坚决反对 / 坚决执行 = s\'opposer fermement / exécuter fermement. Connoté pouvoir/autorité. 坚定 (jiāndìng) = ferme dans la CROYANCE / la position. 坚定的信念 / 立场坚定 = conviction ferme / position ferme. Connoté valeurs morales. 坚强 (jiānqiáng) = solide dans la PERSONNE / le caractère. 坚强的人 / 坚强的意志 = personne forte / volonté forte. Connoté résilience individuelle. Erreur classique : confondre 坚决 (action) et 坚定 (croyance). 坚决支持 = soutenir fermement (action) ; 坚定支持 = soutenir avec conviction (foi).',
    bodyEn:
      '坚决 (jiānjué) = resolute in ACTION (often repression / opposition). 坚决反对 / 坚决执行 = firmly oppose / execute. Connotes power/authority. 坚定 (jiāndìng) = firm in BELIEF / position. 坚定的信念 / 立场坚定 = firm conviction / firm stance. Connotes moral values. 坚强 (jiānqiáng) = strong in the PERSON / character. 坚强的人 / 坚强的意志 = strong person / strong will. Connotes individual resilience. Common mistake: confusing 坚决 (action) and 坚定 (belief). 坚决支持 = support firmly (action); 坚定支持 = support with conviction (faith).',
    items: [
      { hanzi: '坚决', pinyin: 'jiān jué', meaning: 'résolument', meaningEn: 'resolutely', audio: 'audio/hsk5/hsk5_坚决.wav' },
      { hanzi: '坚定', pinyin: 'jiān dìng', meaning: 'ferme (croyance)', meaningEn: 'firm (belief)', audio: 'audio/hsk5/hsk5_坚定.wav' },
      { hanzi: '坚强', pinyin: 'jiān qiáng', meaning: 'fort (caractère)', meaningEn: 'strong (character)', audio: 'audio/hsk5/hsk5_坚强.wav' },
      { hanzi: '信念', pinyin: 'xìn niàn', meaning: 'conviction', meaningEn: 'conviction', audio: 'audio/hsk6/hsk6_信念.wav' },
      { hanzi: '意志', pinyin: 'yì zhì', meaning: 'volonté', meaningEn: 'will', audio: 'audio/hsk6/hsk6_意志.wav' }
    ],
    tip:
      'Test rapide : 坚决 + verbe d\'action (反对/执行/打击) ; 坚定 + nom abstrait (信念/立场/信心) ; 坚强 + nom de personne ou trait (人/意志/精神). Mémoriser le collocataire ouvre le bon usage.',
    tipEn:
      'Quick test: 坚决 + action verb (反对/执行/打击); 坚定 + abstract noun (信念/立场/信心); 坚强 + person noun or trait (人/意志/精神). Remember the collocator and the usage opens up.'
  },
  {
    id: 'c11-zhe-zhi-zhe',
    title: '者 vs 之 vs 乎 — particules classiques',
    titleEn: '者 vs 之 vs 乎 — classical particles',
    body:
      '者 (zhě) = celui qui / la chose qui. Substitue un nom abstrait. 学者 (érudit), 作者 (auteur), 强者 (le fort). Aussi : 来者不拒 (n\'éconduire personne — celui qui vient, ne refuser). Très productif en composition. 之 (zhī) = particule de liaison classique (=的 moderne). 国家之大 (grandeur d\'un pays — sonne soutenu). 仁义礼智信 = les 5 vertus. 之 reste vivant dans les expressions soutenues : 之间, 之后, 之前. 乎 (hū) = particule d\'interrogation/exclamation classique (= 吗/呢). 君子乎 ? = est-ce un homme noble ? Surtout dans les chengyu : 不亦乐乎 (n\'est-ce pas un plaisir ?), 似乎 (semble que). Tu rencontreras ces 3 particules en lisant la presse, les éditoriaux, et les œuvres classiques.',
    bodyEn:
      '者 (zhě) = the one who / the thing that. Substitutes an abstract noun. 学者 (scholar), 作者 (author), 强者 (the strong one). Also: 来者不拒 (refuse no one). Very productive in compounds. 之 (zhī) = classical link particle (=modern 的). 国家之大 (the greatness of a country — sounds formal). 之 stays alive in formal expressions: 之间, 之后, 之前. 乎 (hū) = classical interrogative/exclamatory particle (=吗/呢). 君子乎？= is this a noble man? Mostly in chengyu: 不亦乐乎 (isn\'t it a joy?), 似乎 (it seems). You\'ll meet these 3 in press, op-eds, and classical works.',
    items: [
      { hanzi: '者', pinyin: 'zhě', meaning: 'celui qui (suffixe)', meaningEn: 'the one who', audio: 'audio/hsk5/hsk5_者.wav' },
      { hanzi: '之', pinyin: 'zhī', meaning: 'de (classique)', meaningEn: 'of (classical)', audio: 'audio/hsk5/hsk5_之.wav' },
      { hanzi: '乎', pinyin: 'hū', meaning: 'particule classique', meaningEn: 'classical particle', audio: 'audio/hsk6/hsk6_乎.wav' },
      { hanzi: '学者', pinyin: 'xué zhě', meaning: 'érudit', meaningEn: 'scholar', audio: 'audio/hsk5/hsk5_学者.wav' },
      { hanzi: '不亦乐乎', pinyin: 'bú yì lè hū', meaning: 'extrêmement', meaningEn: 'extremely', audio: 'audio/hsk6/hsk6_不亦.wav' }
    ],
    tip:
      'Pas besoin d\'écrire en chinois classique, mais reconnaître ces 3 particules débloque la lecture des éditoriaux Renmin Ribao, des essais soutenus, et de toute citation littéraire moderne.',
    tipEn:
      'No need to write classical Chinese, but recognizing these 3 particles unlocks reading Renmin Ribao op-eds, formal essays, and any modern literary quote.'
  }
];

export const c11NuancesM2LearnSections: LessonV2LearnSection[] = [
  {
    id: 'c11-shenru-shenke',
    title: '深入 vs 深刻 vs 深远 — profond en 3 dimensions',
    titleEn: '深入 vs 深刻 vs 深远 — deep in 3 dimensions',
    body:
      '深入 (shēnrù) = en profondeur dans le PROCESSUS. 深入研究 (recherche approfondie), 深入了解 (comprendre en profondeur), 深入人心 (s\'enracine dans le cœur du peuple). Verbe ou adv. 深刻 (shēnkè) = profond comme IMPACT ressenti. 深刻的印象 (impression forte), 深刻的教训 (leçon profonde). Adjectif. Connote l\'effet sur la personne. 深远 (shēnyuǎn) = profond et LOIN dans la durée/portée. 深远的影响 (influence durable et étendue). Toujours en collocation avec 影响/意义. Hierarchy : 深入 (processus) ≠ 深刻 (impression) ≠ 深远 (portée). Erreur fréquente : 深刻研究 ✗ → 深入研究 ✓.',
    bodyEn:
      '深入 (shēnrù) = deep in the PROCESS. 深入研究 (in-depth research), 深入了解 (deeply understand), 深入人心 (rooted in people\'s hearts). Verb or adv. 深刻 (shēnkè) = deep as felt IMPACT. 深刻的印象 (strong impression), 深刻的教训 (deep lesson). Adjective. Connotes effect on person. 深远 (shēnyuǎn) = deep and FAR-reaching in duration/scope. 深远的影响 (lasting and wide-reaching influence). Always collocates with 影响/意义. Hierarchy: 深入 (process) ≠ 深刻 (impression) ≠ 深远 (scope). Frequent mistake: 深刻研究 ✗ → 深入研究 ✓.',
    items: [
      { hanzi: '深入', pinyin: 'shēn rù', meaning: 'en profondeur', meaningEn: 'in-depth', audio: 'audio/hsk5/hsk5_深入.wav' },
      { hanzi: '深刻', pinyin: 'shēn kè', meaning: 'profond (impact)', meaningEn: 'profound (impact)', audio: 'audio/hsk5/hsk5_深刻.wav' },
      { hanzi: '深远', pinyin: 'shēn yuǎn', meaning: 'profond (portée)', meaningEn: 'far-reaching', audio: 'audio/hsk6/hsk6_深远.wav' },
      { hanzi: '影响', pinyin: 'yǐng xiǎng', meaning: 'influence', meaningEn: 'influence', audio: 'audio/hsk3/hsk3_影响.wav' },
      { hanzi: '意义', pinyin: 'yì yì', meaning: 'sens, signification', meaningEn: 'meaning', audio: 'audio/hsk5/hsk5_意义.wav' }
    ],
    tip:
      'Mémoriser 3 collocations clés : 深入研究 (recherche approfondie), 深刻印象 (impression forte), 深远影响 (influence durable). Ces blocs sont la signature C1.',
    tipEn:
      'Memorize 3 key collocations: 深入研究 (in-depth research), 深刻印象 (strong impression), 深远影响 (lasting influence). These blocks are the C1 signature.'
  },
  {
    id: 'c11-bujin-quanmian',
    title: '不仅…而且 vs 既…又 vs 一方面…一方面',
    titleEn: '不仅…而且 vs 既…又 vs 一方面…一方面',
    body:
      '不仅 X 而且 Y = non seulement X mais aussi Y. Marque PROGRESSION (Y > X en intensité). 不仅好看，而且好用 = non seulement beau mais en plus pratique. Y enchérit. 既 X 又 Y = à la fois X et Y. Marque COEXISTENCE équilibrée (X = Y, sans hiérarchie). 既好看又好用 = à la fois beau et pratique. Plus oral. 一方面 X 一方面 Y = d\'un côté X, de l\'autre Y. Marque DEUX FACETTES contrastantes ou parallèles. 一方面想去，一方面又害怕 = d\'un côté envie d\'y aller, de l\'autre peur. Souvent contradictoire. Hierarchy : 既…又 (oral, coexistence) < 不仅…而且 (écrit, progression) < 一方面…一方面 (écrit, contraste).',
    bodyEn:
      '不仅 X 而且 Y = not only X but also Y. Marks PROGRESSION (Y > X in intensity). 不仅好看，而且好用 = not only pretty but also practical. Y outdoes. 既 X 又 Y = both X and Y. Marks balanced COEXISTENCE (X = Y, no hierarchy). 既好看又好用 = both pretty and practical. More oral. 一方面 X 一方面 Y = on one hand X, on the other Y. Marks TWO FACETS contrasting or parallel. 一方面想去，一方面又害怕 = on one hand want to go, on the other afraid. Often contradictory. Hierarchy: 既…又 (oral, coexistence) < 不仅…而且 (written, progression) < 一方面…一方面 (written, contrast).',
    items: [
      { hanzi: '不仅', pinyin: 'bù jǐn', meaning: 'non seulement', meaningEn: 'not only', audio: 'audio/hsk5/hsk5_不仅.wav' },
      { hanzi: '而且', pinyin: 'ér qiě', meaning: 'mais aussi', meaningEn: 'but also', audio: 'audio/hsk3/hsk3_而且.wav' },
      { hanzi: '既', pinyin: 'jì', meaning: 'à la fois', meaningEn: 'both', audio: 'audio/hsk5/hsk5_既.wav' },
      { hanzi: '一方面', pinyin: 'yì fāng miàn', meaning: 'd\'un côté', meaningEn: 'on one hand', audio: 'audio/hsk5/hsk5_一方面.wav' },
      { hanzi: '另一方面', pinyin: 'lìng yì fāng miàn', meaning: 'de l\'autre côté', meaningEn: 'on the other hand', audio: 'audio/hsk5/hsk5_另.wav' }
    ],
    tip:
      'Test : « X est mieux que Y mais on a aussi Y » → 不仅 X 而且 Y. « X et Y au même niveau » → 既 X 又 Y. « X et Y opposés » → 一方面 X 一方面 Y. La grammaire est dans le rapport entre X et Y.',
    tipEn:
      'Test: «X better than Y but also Y» → 不仅 X 而且 Y. «X and Y same level» → 既 X 又 Y. «X and Y opposed» → 一方面 X 一方面 Y. The grammar is in the X–Y relationship.'
  }
];

export const c11NuancesM3LearnSections: LessonV2LearnSection[] = [
  {
    id: 'c11-jiyu-genju',
    title: '基于 vs 根据 vs 鉴于 — selon, sur la base de',
    titleEn: '基于 vs 根据 vs 鉴于 — according to, based on',
    body:
      '根据 (gēnjù) = selon (le plus universel, oral et écrit). 根据数据 / 根据法律 = selon les données / selon la loi. Pivote sur une SOURCE. 基于 (jīyú) = sur la base de (formel, écrit). 基于以上原因 (sur la base des raisons ci-dessus), 基于事实 (sur la base des faits). Pivote sur un FONDEMENT logique. Plus académique/juridique. 鉴于 (jiànyú) = vu que / étant donné que (très formel, juridique). 鉴于目前的形势, 我们决定 X = vu la situation actuelle, nous décidons X. Marque une CONSIDÉRATION préalable à une décision. Hierarchy : 根据 (universel) < 基于 (formel raisonnement) < 鉴于 (très formel décision). 鉴于 à l\'oral spontané = pédant.',
    bodyEn:
      '根据 (gēnjù) = according to (most universal, oral and written). 根据数据 / 根据法律 = per the data / per the law. Pivots on a SOURCE. 基于 (jīyú) = based on (formal, written). 基于以上原因 (based on the above), 基于事实 (based on facts). Pivots on a logical FOUNDATION. More academic/legal. 鉴于 (jiànyú) = given that (very formal, legal). 鉴于目前的形势, 我们决定 X = given current circumstances, we decide X. Marks a CONSIDERATION preceding a decision. Hierarchy: 根据 (universal) < 基于 (formal reasoning) < 鉴于 (very formal decision). 鉴于 in spontaneous speech = pedantic.',
    items: [
      { hanzi: '根据', pinyin: 'gēn jù', meaning: 'selon', meaningEn: 'according to', audio: 'audio/hsk3/hsk3_根据.wav' },
      { hanzi: '基于', pinyin: 'jī yú', meaning: 'sur la base de', meaningEn: 'based on', audio: 'audio/hsk6/hsk6_基于.wav' },
      { hanzi: '鉴于', pinyin: 'jiàn yú', meaning: 'vu que (formel)', meaningEn: 'given that', audio: 'audio/hsk6/hsk6_鉴于.wav' },
      { hanzi: '事实', pinyin: 'shì shí', meaning: 'fait', meaningEn: 'fact', audio: 'audio/hsk5/hsk5_事实.wav' },
      { hanzi: '形势', pinyin: 'xíng shì', meaning: 'situation', meaningEn: 'situation', audio: 'audio/hsk5/hsk5_形势.wav' }
    ],
    tip:
      '« 鉴于 X，我们决定 Y » est la formule juridique/admin par excellence. Si tu écris une décision RH, contractuelle, ou stratégique en chinois, cette tournure est OBLIGATOIRE pour le sérieux.',
    tipEn:
      '«鉴于 X，我们决定 Y» is THE legal/admin formula. If you draft an HR, contractual, or strategic decision in Chinese, this structure is MANDATORY for seriousness.'
  },
  {
    id: 'c11-tiqian-shouxian',
    title: '提前 vs 首先 vs 起初 — d\'abord, en premier, au départ',
    titleEn: '提前 vs 首先 vs 起初 — first, originally, at the start',
    body:
      '提前 (tíqián) = en avance (par rapport à un horaire prévu). 提前到 = arriver en avance / 提前完成 = finir en avance. Concept de TIMING. 首先 (shǒuxiān) = en premier (dans une énumération ou une séquence). 首先 X，其次 Y = d\'abord X, ensuite Y. Concept de RANG. 起初 (qǐchū) = au début / au départ (par opposition à plus tard). 起初我以为 X，后来才发现 Y = au départ je pensais X, plus tard j\'ai compris Y. Concept de PHASE TEMPORELLE. Trois mots qu\'un débutant traduit tous par « d\'abord » mais qui sont distincts. Test : « avant l\'horaire » → 提前 ; « 1° dans la liste » → 首先 ; « phase initiale » → 起初.',
    bodyEn:
      '提前 (tíqián) = ahead of time (vs scheduled). 提前到 = arrive early / 提前完成 = finish early. TIMING concept. 首先 (shǒuxiān) = first (in an enumeration or sequence). 首先 X，其次 Y = first X, then Y. RANK concept. 起初 (qǐchū) = at the start / originally (vs later). 起初我以为 X，后来才发现 Y = originally I thought X, later I found Y. TEMPORAL PHASE concept. Three words a beginner all translates as «first» but distinct. Test: «before schedule» → 提前; «1st on the list» → 首先; «initial phase» → 起初.',
    items: [
      { hanzi: '提前', pinyin: 'tí qián', meaning: 'en avance', meaningEn: 'in advance', audio: 'audio/hsk4/hsk4_提前.wav' },
      { hanzi: '首先', pinyin: 'shǒu xiān', meaning: 'en premier', meaningEn: 'firstly', audio: 'audio/hsk3/hsk3_首先.wav' },
      { hanzi: '起初', pinyin: 'qǐ chū', meaning: 'au départ', meaningEn: 'at first', audio: 'audio/hsk6/hsk6_起初.wav' },
      { hanzi: '后来', pinyin: 'hòu lái', meaning: 'ensuite, plus tard', meaningEn: 'later', audio: 'audio/hsk3/hsk3_后来.wav' },
      { hanzi: '发现', pinyin: 'fā xiàn', meaning: 'découvrir', meaningEn: 'discover', audio: 'audio/hsk3/hsk3_发现.wav' }
    ],
    tip:
      'Combo classique pour raconter un changement d\'avis : « 起初我以为 X，后来才发现 Y ». Sonne soutenu et révèle ta capacité de réflexion. À utiliser dans une intro d\'essai ou en interview.',
    tipEn:
      'Classic combo to recount a change of mind: «起初我以为 X，后来才发现 Y». Sounds formal and reveals your reflective capacity. Use in essay intro or interview.'
  }
];

export const c11NuancesM4LearnSections: LessonV2LearnSection[] = [
  {
    id: 'c11-yiwei-ranhou',
    title: '于是 vs 因而 vs 从而 — par conséquent (registres)',
    titleEn: '于是 vs 因而 vs 从而 — therefore (register)',
    body:
      '于是 (yúshì, alors / sur quoi) marque une CONSÉQUENCE narrative dans un récit. 他没听懂，于是又问了一次 = il n\'a pas compris, alors il a redemandé. Très utile en récit. 因而 (yīn\'ér, de ce fait — formel écrit) marque une CONSÉQUENCE LOGIQUE. 政策有效，因而经济增长 = la politique est efficace, de ce fait l\'économie croît. Plus rigoureux. 从而 (cóng\'ér, et par là, et ainsi — formel écrit) marque une CONSÉQUENCE QUI MÈNE À UN RÉSULTAT VOULU. 减税从而刺激消费 = baisser les impôts pour ainsi stimuler la consommation. Connotation FONCTIONNELLE. Hierarchy : 于是 (récit) < 因而 (logique) < 从而 (téléologique). En écrit académique, 从而 montre la maîtrise.',
    bodyEn:
      '于是 (yúshì, then / whereupon) marks a NARRATIVE consequence. 他没听懂，于是又问了一次 = he didn\'t get it, so asked again. Very useful in storytelling. 因而 (yīn\'ér, hence — formal written) marks a LOGICAL consequence. 政策有效，因而经济增长 = the policy works, hence the economy grows. More rigorous. 从而 (cóng\'ér, thereby — formal written) marks a consequence LEADING TO AN INTENDED RESULT. 减税从而刺激消费 = cut taxes to thereby stimulate consumption. FUNCTIONAL connotation. Hierarchy: 于是 (narrative) < 因而 (logical) < 从而 (teleological). In academic writing, 从而 shows mastery.',
    items: [
      { hanzi: '于是', pinyin: 'yú shì', meaning: 'alors, sur quoi', meaningEn: 'then, whereupon', audio: 'audio/hsk5/hsk5_于是.wav' },
      { hanzi: '因而', pinyin: 'yīn ér', meaning: 'de ce fait', meaningEn: 'hence', audio: 'audio/hsk6/hsk6_因而.wav' },
      { hanzi: '从而', pinyin: 'cóng ér', meaning: 'et ainsi', meaningEn: 'thereby', audio: 'audio/hsk5/hsk5_从而.wav' },
      { hanzi: '刺激', pinyin: 'cì jī', meaning: 'stimuler', meaningEn: 'stimulate', audio: 'audio/hsk5/hsk5_刺激.wav' },
      { hanzi: '消费', pinyin: 'xiāo fèi', meaning: 'consommation', meaningEn: 'consumption', audio: 'audio/hsk5/hsk5_消费.wav' }
    ],
    tip:
      '« X 从而 Y » montre que tu comprends la TÉLÉOLOGIE chinoise (action visant un résultat). Très utilisé en éditorial économique. Maîtriser ce connecteur = signal C1 indéniable.',
    tipEn:
      '«X 从而 Y» shows you understand Chinese TELEOLOGY (action aiming at result). Very used in economic op-eds. Mastering this connector = unmistakable C1 signal.'
  },
  {
    id: 'c11-jinli-jinguan',
    title: '尽管 vs 即使 vs 哪怕 — bien que / même si',
    titleEn: '尽管 vs 即使 vs 哪怕 — although / even if',
    body:
      '尽管 (jǐnguǎn) = bien que (FAIT réel, concession à un fait). 尽管下雨，他还是来了 = bien qu\'il pleuve, il est venu. La pluie est RÉELLE. 即使 (jíshǐ) = même si (HYPOTHÉTIQUE, condition imaginée). 即使下雨，他也会来 = même s\'il pleuvait, il viendrait. La pluie est HYPOTHÉTIQUE. 哪怕 (nǎpà) = même si (HYPOTHÉTIQUE EXTRÊME, oral familier). 哪怕只有一点希望，我也要试 = même s\'il n\'y a qu\'un peu d\'espoir, je vais essayer. Plus émotionnel. Hierarchy : 尽管 (réel) ≠ 即使 (hypothétique neutre) < 哪怕 (hypothétique extrême oral). Erreur très fréquente : 尽管下雨他也会来 ✗ → 即使下雨他也会来 ✓.',
    bodyEn:
      '尽管 (jǐnguǎn) = although (REAL fact, concession to a fact). 尽管下雨，他还是来了 = although it\'s raining, he came. The rain is REAL. 即使 (jíshǐ) = even if (HYPOTHETICAL, imagined condition). 即使下雨，他也会来 = even if it rained, he\'d come. The rain is HYPOTHETICAL. 哪怕 (nǎpà) = even if (EXTREME HYPOTHETICAL, casual oral). 哪怕只有一点希望，我也要试 = even if there\'s only a sliver of hope, I\'ll try. More emotional. Hierarchy: 尽管 (real) ≠ 即使 (neutral hypothetical) < 哪怕 (extreme oral hypothetical). Very common mistake: 尽管下雨他也会来 ✗ → 即使下雨他也会来 ✓.',
    items: [
      { hanzi: '尽管', pinyin: 'jǐn guǎn', meaning: 'bien que (réel)', meaningEn: 'although (real)', audio: 'audio/hsk4/hsk4_尽管.wav' },
      { hanzi: '即使', pinyin: 'jí shǐ', meaning: 'même si (hypothèse)', meaningEn: 'even if (hypothetical)', audio: 'audio/hsk4/hsk4_即使.wav' },
      { hanzi: '哪怕', pinyin: 'nǎ pà', meaning: 'même si (extrême)', meaningEn: 'even if (extreme)', audio: 'audio/hsk6/hsk6_哪怕.wav' },
      { hanzi: '希望', pinyin: 'xī wàng', meaning: 'espoir', meaningEn: 'hope', audio: 'audio/hsk2/hsk2_希望.wav' },
      { hanzi: '尝试', pinyin: 'cháng shì', meaning: 'essayer', meaningEn: 'try', audio: 'audio/hsk5/hsk5_尝试.wav' }
    ],
    tip:
      'Test : si la condition EST VRAIE → 尽管 ; si elle est imaginée → 即使 ; si elle est imaginée et extrême avec émotion → 哪怕. La distinction RÉEL/HYPOTHÉTIQUE est centrale.',
    tipEn:
      'Test: if the condition IS TRUE → 尽管; if imagined → 即使; if imagined and extreme with emotion → 哪怕. The REAL/HYPOTHETICAL distinction is central.'
  }
];

export const c11NuancesM5LearnSections: LessonV2LearnSection[] = [
  {
    id: 'c11-fanrong-xingsheng',
    title: '繁荣 vs 兴盛 vs 鼎盛 — prospérité (intensité)',
    titleEn: '繁荣 vs 兴盛 vs 鼎盛 — prosperity (intensity)',
    body:
      '繁荣 (fánróng, prospère) = ÉTAT général de prospérité (économique, urbain, commercial). 经济繁荣 / 城市繁荣. Le plus universel. Adjectif/nom. 兴盛 (xīngshèng, florissant, en plein essor) = MOUVEMENT de croissance, dynamisme. 文化兴盛 / 事业兴盛. Plus dynamique. 鼎盛 (dǐngshèng, à son apogée) = SOMMET, point culminant historique. 唐朝的鼎盛时期 = l\'apogée de la dynastie Tang. Très soutenu, historique. Hierarchy : 繁荣 (état stable) < 兴盛 (élan ascendant) < 鼎盛 (zénith). À l\'oral 繁荣 partout ; 兴盛/鼎盛 dans un contexte historique ou très soutenu.',
    bodyEn:
      '繁荣 (fánróng, prosperous) = general STATE of prosperity (economic, urban, commercial). 经济繁荣 / 城市繁荣. Most universal. Adjective/noun. 兴盛 (xīngshèng, flourishing, booming) = MOVEMENT of growth, dynamism. 文化兴盛 / 事业兴盛. More dynamic. 鼎盛 (dǐngshèng, at its peak) = SUMMIT, historical climax. 唐朝的鼎盛时期 = the peak of the Tang dynasty. Very formal, historical. Hierarchy: 繁荣 (stable state) < 兴盛 (rising momentum) < 鼎盛 (zenith). In speech, 繁荣 everywhere; 兴盛/鼎盛 in historical or very formal contexts.',
    items: [
      { hanzi: '繁荣', pinyin: 'fán róng', meaning: 'prospère', meaningEn: 'prosperous', audio: 'audio/hsk5/hsk5_繁荣.wav' },
      { hanzi: '兴盛', pinyin: 'xīng shèng', meaning: 'florissant', meaningEn: 'flourishing', audio: 'audio/hsk6/hsk6_兴盛.wav' },
      { hanzi: '鼎盛', pinyin: 'dǐng shèng', meaning: 'à l\'apogée', meaningEn: 'at the peak', audio: 'audio/hsk6/hsk6_鼎盛.wav' },
      { hanzi: '时期', pinyin: 'shí qī', meaning: 'période', meaningEn: 'period', audio: 'audio/hsk5/hsk5_时期.wav' },
      { hanzi: '事业', pinyin: 'shì yè', meaning: 'carrière, entreprise', meaningEn: 'career, undertaking', audio: 'audio/hsk5/hsk5_事业.wav' }
    ],
    tip:
      'Pour parler d\'une époque historique en chinois soutenu : « 唐朝的鼎盛时期 » sonne lettré. Pour le présent : « 经济繁荣 » suffit. Mauvais signal : 鼎盛 pour décrire son entreprise (sonne pompeux).',
    tipEn:
      'To speak of a historical era in formal Chinese: «唐朝的鼎盛时期» sounds erudite. For the present: «经济繁荣» suffices. Bad signal: 鼎盛 to describe your company (sounds pompous).'
  },
  {
    id: 'c11-shuailuo-xiaowang',
    title: '衰落 vs 衰退 vs 消亡 — déclin et extinction',
    titleEn: '衰落 vs 衰退 vs 消亡 — decline and extinction',
    body:
      '衰落 (shuāiluò, déclin) = chute progressive d\'une CIVILISATION / institution. 帝国的衰落 (le déclin d\'un empire). Connotation historique. 衰退 (shuāituì, récession / déclin économique) = ralentissement mesurable, surtout ÉCONOMIQUE. 经济衰退 (récession économique). Réversible, technique. 消亡 (xiāowáng, disparition, extinction) = FIN totale. 物种消亡 (extinction d\'une espèce), 文化消亡 (extinction d\'une culture). Irréversible. Hierarchy : 衰退 (réversible technique) < 衰落 (historique progressif) < 消亡 (terminal). Dans une thèse d\'histoire ou éditorial, choisir le bon mot signale ta connaissance des registres.',
    bodyEn:
      '衰落 (shuāiluò, decline) = gradual fall of a CIVILIZATION / institution. 帝国的衰落 (the decline of an empire). Historical connotation. 衰退 (shuāituì, recession / economic decline) = measurable slowdown, especially ECONOMIC. 经济衰退 (economic recession). Reversible, technical. 消亡 (xiāowáng, disappearance, extinction) = total END. 物种消亡 (species extinction), 文化消亡 (cultural extinction). Irreversible. Hierarchy: 衰退 (reversible technical) < 衰落 (historical gradual) < 消亡 (terminal). In a history thesis or op-ed, the right word signals your awareness of register.',
    items: [
      { hanzi: '衰落', pinyin: 'shuāi luò', meaning: 'déclin', meaningEn: 'decline', audio: 'audio/hsk6/hsk6_衰落.wav' },
      { hanzi: '衰退', pinyin: 'shuāi tuì', meaning: 'récession', meaningEn: 'recession', audio: 'audio/hsk6/hsk6_衰退.wav' },
      { hanzi: '消亡', pinyin: 'xiāo wáng', meaning: 'disparition', meaningEn: 'extinction', audio: 'audio/hsk6/hsk6_消亡.wav' },
      { hanzi: '帝国', pinyin: 'dì guó', meaning: 'empire', meaningEn: 'empire', audio: 'audio/hsk6/hsk6_帝国.wav' },
      { hanzi: '物种', pinyin: 'wù zhǒng', meaning: 'espèce', meaningEn: 'species', audio: 'audio/hsk6/hsk6_物种.wav' }
    ],
    tip:
      'Erreur de débutant : utiliser 消亡 pour parler d\'un secteur qui décline temporairement. Réserve 消亡 à ce qui est VRAIMENT terminé. Pour un déclin → 衰落 (long terme) ou 衰退 (économie).',
    tipEn:
      'Beginner mistake: using 消亡 for a temporarily declining sector. Reserve 消亡 for what\'s TRULY ended. For a decline → 衰落 (long-term) or 衰退 (economy).'
  }
];

export const c11NuancesM6LearnSections: LessonV2LearnSection[] = [
  {
    id: 'c11-jiazhi-yiyi',
    title: '价值 vs 意义 vs 意味 — valeur, sens, signification',
    titleEn: '价值 vs 意义 vs 意味 — value, meaning, significance',
    body:
      '价值 (jiàzhí) = VALEUR (économique, morale, sociale). 这本书很有价值 (ce livre a de la valeur). 价值观 (système de valeurs). Souvent QUANTIFIABLE ou clairement appréciable. 意义 (yìyì) = SENS / signification (importance ressentie). 这件事对我很有意义 (cette chose a beaucoup de sens pour moi). Plus subjectif/symbolique. 意味 (yìwèi, comme verbe : signifier) = IMPLICATION cachée/conséquence. 这意味着 X = ceci signifie X (suggère X comme implication logique). 意味 est aussi un nom : 这话有别的意味 (ces mots ont une autre nuance). Hierarchy : 价值 (apprécier la valeur) ≠ 意义 (ressentir le sens) ≠ 意味 (déduire l\'implication).',
    bodyEn:
      '价值 (jiàzhí) = VALUE (economic, moral, social). 这本书很有价值 (this book is valuable). 价值观 (value system). Often QUANTIFIABLE or clearly appraisable. 意义 (yìyì) = MEANING / significance (felt importance). 这件事对我很有意义 (this matters a lot to me). More subjective/symbolic. 意味 (yìwèi, as verb: to signify) = hidden IMPLICATION/consequence. 这意味着 X = this implies X (X is the logical implication). 意味 is also a noun: 这话有别的意味 (these words carry another nuance). Hierarchy: 价值 (appraise value) ≠ 意义 (feel meaning) ≠ 意味 (deduce implication).',
    items: [
      { hanzi: '价值', pinyin: 'jià zhí', meaning: 'valeur', meaningEn: 'value', audio: 'audio/hsk5/hsk5_价值.wav' },
      { hanzi: '意义', pinyin: 'yì yì', meaning: 'sens, signification', meaningEn: 'meaning', audio: 'audio/hsk5/hsk5_意义.wav' },
      { hanzi: '意味', pinyin: 'yì wèi', meaning: 'signifier, sous-entendre', meaningEn: 'imply', audio: 'audio/hsk6/hsk6_意味.wav' },
      { hanzi: '价值观', pinyin: 'jià zhí guān', meaning: 'système de valeurs', meaningEn: 'value system', audio: 'audio/hsk6/hsk6_价值观.wav' },
      { hanzi: '象征', pinyin: 'xiàng zhēng', meaning: 'symboliser', meaningEn: 'symbolize', audio: 'audio/hsk6/hsk6_象征.wav' }
    ],
    tip:
      '« 这意味着 X » est la formule magique d\'éditorial pour énoncer une CONSÉQUENCE / IMPLICATION. À utiliser après un fait pour montrer ta capacité d\'analyse. Marque C1+ d\'analyse politique/économique.',
    tipEn:
      '«这意味着 X» is the magic op-ed formula to state a CONSEQUENCE / IMPLICATION. Use after a fact to show analytical capacity. C1+ marker in political/economic analysis.'
  },
  {
    id: 'c11-yingxiang-zuoyong',
    title: '影响 vs 作用 vs 效果 — effet, impact, fonction',
    titleEn: '影响 vs 作用 vs 效果 — effect, impact, function',
    body:
      '影响 (yǐngxiǎng) = INFLUENCE (peut être positive ou négative, étendue). 政策的影响 / 父母的影响 = influence d\'une politique / des parents. Très large. 作用 (zuòyòng) = FONCTION / action (rôle joué dans un système). 这种药有镇痛作用 (ce médicament a une fonction analgésique). Connotation FONCTIONNELLE. 效果 (xiàoguǒ) = EFFET MESURABLE, résultat observé. 这个方法效果不好 (cette méthode n\'a pas un bon effet). Connotation RÉSULTAT. Hierarchy : 影响 (large) ≠ 作用 (fonction) ≠ 效果 (résultat). Erreur classique : 这个药有很好的影响 ✗ → 这个药效果很好 ✓ (effet mesurable médical).',
    bodyEn:
      '影响 (yǐngxiǎng) = INFLUENCE (positive or negative, broad). 政策的影响 / 父母的影响 = policy influence / parental influence. Very broad. 作用 (zuòyòng) = FUNCTION / action (role in a system). 这种药有镇痛作用 (this drug has an analgesic function). FUNCTIONAL connotation. 效果 (xiàoguǒ) = MEASURABLE EFFECT, observed result. 这个方法效果不好 (this method\'s effect isn\'t good). RESULT connotation. Hierarchy: 影响 (broad) ≠ 作用 (function) ≠ 效果 (result). Classic mistake: 这个药有很好的影响 ✗ → 这个药效果很好 ✓ (medical measurable effect).',
    items: [
      { hanzi: '影响', pinyin: 'yǐng xiǎng', meaning: 'influence', meaningEn: 'influence', audio: 'audio/hsk3/hsk3_影响.wav' },
      { hanzi: '作用', pinyin: 'zuò yòng', meaning: 'fonction, action', meaningEn: 'function, action', audio: 'audio/hsk5/hsk5_作用.wav' },
      { hanzi: '效果', pinyin: 'xiào guǒ', meaning: 'effet, résultat', meaningEn: 'effect, result', audio: 'audio/hsk4/hsk4_效果.wav' },
      { hanzi: '镇痛', pinyin: 'zhèn tòng', meaning: 'analgésique', meaningEn: 'analgesic', audio: 'audio/hsk6/hsk6_镇痛.wav' },
      { hanzi: '方法', pinyin: 'fāng fǎ', meaning: 'méthode', meaningEn: 'method', audio: 'audio/hsk4/hsk4_方法.wav' }
    ],
    tip:
      '3 collocations à mémoriser : 深远影响 (influence durable), 起作用 (jouer un rôle), 见效果 (voir l\'effet). Le bon mot avec le bon collocataire = signal de maîtrise.',
    tipEn:
      '3 collocations to memorize: 深远影响 (lasting influence), 起作用 (play a role), 见效果 (see the effect). Right word with right collocator = mastery signal.'
  }
];

export const c11NuancesM7LearnSections: LessonV2LearnSection[] = [
  {
    id: 'c11-zhuangyan-suran',
    title: '庄严 vs 肃然 vs 隆重 — solennel (3 nuances)',
    titleEn: '庄严 vs 肃然 vs 隆重 — solemn (3 nuances)',
    body:
      '庄严 (zhuāngyán, solennel et imposant) = qualité d\'un OBJET / lieu sacré. 庄严的国旗 (le drapeau solennel), 庄严的承诺 (un engagement solennel). Connotation MAJESTÉ. 肃然 (sùrán, dans une attitude grave et silencieuse) = ÉTAT SUBJECTIF de respect. 肃然起敬 (chengyu : être saisi de respect). Décrit la personne qui ressent. 隆重 (lóngzhòng, grandiose, imposant — pour cérémonies) = ÉCHELLE et faste de l\'événement. 隆重的婚礼 (mariage grandiose), 隆重举行 (organiser en grande pompe). Hierarchy : 庄严 (objet majestueux) ≠ 肃然 (sentiment de respect) ≠ 隆重 (cérémonie fastueuse). Un mariage est 隆重 ; un drapeau est 庄严 ; on est 肃然 devant un héros tombé.',
    bodyEn:
      '庄严 (zhuāngyán, solemn and imposing) = quality of a sacred OBJECT / place. 庄严的国旗 (the solemn flag), 庄严的承诺 (a solemn pledge). MAJESTY connotation. 肃然 (sùrán, in a grave silent attitude) = SUBJECTIVE STATE of respect. 肃然起敬 (chengyu: be moved to respect). Describes the person feeling it. 隆重 (lóngzhòng, grand, imposing — for ceremonies) = SCALE and pomp of an event. 隆重的婚礼 (grand wedding), 隆重举行 (hold with great ceremony). Hierarchy: 庄严 (majestic object) ≠ 肃然 (felt respect) ≠ 隆重 (ceremonial pomp). A wedding is 隆重; a flag is 庄严; one feels 肃然 facing a fallen hero.',
    items: [
      { hanzi: '庄严', pinyin: 'zhuāng yán', meaning: 'solennel, imposant', meaningEn: 'solemn, dignified', audio: 'audio/hsk6/hsk6_庄严.wav' },
      { hanzi: '肃然起敬', pinyin: 'sù rán qǐ jìng', meaning: 'saisi de respect', meaningEn: 'moved to respect', audio: 'audio/hsk6/hsk6_肃然.wav' },
      { hanzi: '隆重', pinyin: 'lóng zhòng', meaning: 'grandiose', meaningEn: 'grand, ceremonial', audio: 'audio/hsk5/hsk5_隆重.wav' },
      { hanzi: '承诺', pinyin: 'chéng nuò', meaning: 'engagement, promesse', meaningEn: 'commitment', audio: 'audio/hsk5/hsk5_承诺.wav' },
      { hanzi: '举行', pinyin: 'jǔ xíng', meaning: 'tenir, organiser', meaningEn: 'hold (event)', audio: 'audio/hsk3/hsk3_举行.wav' }
    ],
    tip:
      'En annonce de cérémonie chinoise : « 大会将隆重举行 » (l\'assemblée se tiendra en grande pompe) — formule consacrée. 隆重 + 举行 est un binôme indissociable des annonces officielles.',
    tipEn:
      'In Chinese ceremony announcements: «大会将隆重举行» (the assembly will be held with great ceremony) — sanctioned formula. 隆重 + 举行 is an inseparable pair in official announcements.'
  },
  {
    id: 'c11-jianjue-jueding',
    title: '决定 vs 决心 vs 决议 — décider (action / volonté / acte)',
    titleEn: '决定 vs 决心 vs 决议 — decide (action / will / resolution)',
    body:
      '决定 (juédìng) = DÉCIDER (verbe) ou DÉCISION (nom) — mot universel, oral et écrit. 我决定去 / 这是公司的决定. Le plus large. 决心 (juéxīn) = RÉSOLUTION INTÉRIEURE, détermination personnelle. 下决心 (prendre la résolution), 决心戒烟 = se résoudre à arrêter de fumer. Connotation INTIME et engagée. 决议 (juéyì) = RÉSOLUTION OFFICIELLE (assemblée, parti, ONU). 通过一项决议 (adopter une résolution). Connotation INSTITUTIONNELLE. Hierarchy : 决定 (universel) < 决心 (intime engagé) < 决议 (institutionnel). Erreur : 公司决心 ✗ (l\'entreprise n\'a pas un cœur — utilise 决定). 联合国决心 ✗ → 联合国决议.',
    bodyEn:
      '决定 (juédìng) = DECIDE (verb) or DECISION (noun) — universal, oral and written. 我决定去 / 这是公司的决定. Broadest. 决心 (juéxīn) = INNER RESOLVE, personal determination. 下决心 (resolve to), 决心戒烟 = resolve to quit smoking. INTIMATE and engaged connotation. 决议 (juéyì) = OFFICIAL RESOLUTION (assembly, party, UN). 通过一项决议 (pass a resolution). INSTITUTIONAL connotation. Hierarchy: 决定 (universal) < 决心 (intimate engaged) < 决议 (institutional). Mistake: 公司决心 ✗ (a company has no heart — use 决定). 联合国决心 ✗ → 联合国决议.',
    items: [
      { hanzi: '决定', pinyin: 'jué dìng', meaning: 'décider', meaningEn: 'decide', audio: 'audio/hsk3/hsk3_决定.wav' },
      { hanzi: '决心', pinyin: 'jué xīn', meaning: 'résolution intime', meaningEn: 'resolve', audio: 'audio/hsk5/hsk5_决心.wav' },
      { hanzi: '决议', pinyin: 'jué yì', meaning: 'résolution officielle', meaningEn: 'official resolution', audio: 'audio/hsk6/hsk6_决议.wav' },
      { hanzi: '下决心', pinyin: 'xià jué xīn', meaning: 'prendre la résolution', meaningEn: 'resolve to', audio: 'audio/hsk5/hsk5_下决心.wav' },
      { hanzi: '通过', pinyin: 'tōng guò', meaning: 'adopter, par', meaningEn: 'pass, by way of', audio: 'audio/hsk4/hsk4_通过.wav' }
    ],
    tip:
      '« 下决心 + verbe » sonne très authentique en chinois pour une résolution personnelle (« 下决心戒烟 », « 下决心学习 »). Plus émotionnel que 决定 + verbe. À utiliser pour parler d\'un changement de vie.',
    tipEn:
      '«下决心 + verb» sounds very authentic in Chinese for personal resolution («下决心戒烟», «下决心学习»). More emotional than 决定 + verb. Use for life changes.'
  }
];

// === HISTORICAL C1.1 PARCOURS — chengyu-basic / media-discourse / history / style-formal ===

// --- chengyu-basic ----------------------------------------------------------

export const c11ChengyuBasicM1LearnSections: LessonV2LearnSection[] = [
  {
    id: 'c11-chengyu-positifs',
    title: '一举两得 / 马到成功 / 锦上添花 — usages',
    titleEn: '一举两得 / 马到成功 / 锦上添花 — uses',
    body:
      '一举两得 = « une action, deux gains », équivalent fort de « faire d\'une pierre deux coups ». S\'utilise comme attribut : 这真是一举两得 (c\'est vraiment 2 en 1) ou comme adjectif modifiant un nom : 一举两得的好办法 (une bonne méthode 2-en-1). 马到成功 = « dès que le cheval arrive, victoire » → succès IMMÉDIAT. À envoyer en vœux à un proche qui démarre un projet : 祝您马到成功 ! Ne s\'utilise PAS pour décrire un succès passé, seulement pour SOUHAITER. 锦上添花 = « ajouter une fleur sur du brocart » → améliorer ce qui est déjà beau. Connotation : superflu mais bienvenu. À ne JAMAIS dire à quelqu\'un dans la difficulté (mauvais timing).',
    bodyEn:
      '一举两得 = «one action, two gains», strong equivalent of «kill two birds». Used as predicate: 这真是一举两得 (truly 2-in-1) or as adjective: 一举两得的好办法 (a 2-in-1 method). 马到成功 = «as soon as horse arrives, victory» → IMMEDIATE success. Send as a wish for someone starting a project: 祝您马到成功! NOT for describing past success, only for WISHING. 锦上添花 = «add a flower to brocade» → enhance what is already beautiful. Connotation: superfluous but welcome. NEVER say to someone in difficulty (bad timing).',
    items: [
      { hanzi: '成语', pinyin: 'chéng yǔ', meaning: 'expression idiomatique', meaningEn: 'idiom', audio: 'audio/hsk5/hsk5_成语.wav' },
      { hanzi: '一举两得', pinyin: 'yì jǔ liǎng dé', meaning: '2 en 1', meaningEn: '2-in-1', audio: 'audio/hsk6/hsk6_一举.wav' },
      { hanzi: '马到成功', pinyin: 'mǎ dào chéng gōng', meaning: 'succès immédiat', meaningEn: 'instant success', audio: 'audio/hsk6/hsk6_马到.wav' },
      { hanzi: '锦上添花', pinyin: 'jǐn shàng tiān huā', meaning: 'cerise sur le gâteau', meaningEn: 'icing on the cake', audio: 'audio/hsk6/hsk6_锦上.wav' },
      { hanzi: '办法', pinyin: 'bàn fǎ', meaning: 'méthode, moyen', meaningEn: 'method', audio: 'audio/hsk3/hsk3_办法.wav' }
    ],
    tip:
      'Inverse parfait de 锦上添花 = 雪中送炭 (xuě zhōng sòng tàn, « apporter du charbon dans la neige »), aider quelqu\'un en difficulté. Pour un ami dans la galère, choisis 雪中送炭 — beaucoup plus puissant émotionnellement que 锦上添花.',
    tipEn:
      'The exact opposite of 锦上添花 = 雪中送炭 (xuě zhōng sòng tàn, «bring coal in snow»), help someone in trouble. For a friend in difficulty, choose 雪中送炭 — far more emotionally powerful than 锦上添花.'
  },
  {
    id: 'c11-chengyu-pieges',
    title: 'Pièges classiques d\'usage',
    titleEn: 'Classic usage traps',
    body:
      'Erreur n°1 : déformer un chengyu — UN seul caractère manquant ou changé = ridicule. 一举两得 ✓ ; 一举二得 ✗. La forme est figée. Erreur n°2 : empiler les chengyu dans une phrase courte = pédantisme. Maximum 1 chengyu par paragraphe en oral, 2-3 en écrit soutenu. Erreur n°3 : utiliser un chengyu négatif (画蛇添足, 自相矛盾) en s\'adressant directement à quelqu\'un = atteinte à la face. Préfère un commentaire impersonnel : 这种做法有点画蛇添足 (« cette façon de faire est un peu trop »), pas 你画蛇添足. Erreur n°4 : choisir un chengyu trop poétique pour un contexte familier — 锦上添花 dans un message WeChat à un ami sonne pédant.',
    bodyEn:
      'Mistake #1: deforming a chengyu — ONE missing or changed character = ridiculous. 一举两得 ✓; 一举二得 ✗. The form is fixed. Mistake #2: stacking chengyu in a short sentence = pedantic. Max 1 chengyu per paragraph in speech, 2-3 in formal writing. Mistake #3: using a negative chengyu (画蛇添足, 自相矛盾) addressing someone directly = face attack. Prefer impersonal comment: 这种做法有点画蛇添足 («this way of doing is a bit overdone»), not 你画蛇添足. Mistake #4: choosing a too-poetic chengyu for a casual context — 锦上添花 in a WeChat to a friend sounds pedantic.',
    items: [
      { hanzi: '形式', pinyin: 'xíng shì', meaning: 'forme', meaningEn: 'form', audio: 'audio/hsk5/hsk5_形式.wav' },
      { hanzi: '固定', pinyin: 'gù dìng', meaning: 'figé', meaningEn: 'fixed', audio: 'audio/hsk4/hsk4_固定.wav' },
      { hanzi: '直接', pinyin: 'zhí jiē', meaning: 'directement', meaningEn: 'directly', audio: 'audio/hsk3/hsk3_直接.wav' },
      { hanzi: '面子', pinyin: 'miàn zi', meaning: 'face', meaningEn: 'face', audio: 'audio/hsk5/hsk5_面子.wav' },
      { hanzi: '场合', pinyin: 'chǎng hé', meaning: 'occasion, contexte', meaningEn: 'occasion', audio: 'audio/hsk5/hsk5_场合.wav' }
    ],
    tip:
      'Test du chengyu : avant de placer un chengyu, demande-toi (1) la forme est-elle EXACTE ? (2) le contexte est-il assez SOUTENU ? (3) ne suis-je pas en train d\'attaquer quelqu\'un ? Si OUI à ces 3 questions, vas-y. Sinon, préfère une formulation simple.',
    tipEn:
      'Chengyu test: before placing a chengyu, ask yourself (1) is the form EXACT? (2) is the context FORMAL enough? (3) am I attacking someone? If YES to all 3, go for it. Otherwise, prefer plain phrasing.'
  }
];

export const c11ChengyuBasicM2LearnSections: LessonV2LearnSection[] = [
  {
    id: 'c11-chengyu-descriptifs-foule',
    title: '人山人海 + 五花八门 + 千变万化 — peindre une scène',
    titleEn: '人山人海 + 五花八门 + 千变万化 — paint a scene',
    body:
      '人山人海 (« montagne de gens, mer de gens ») évoque une foule MASSIVE. Contexte typique : 春运 (chunyun, migration du Nouvel An), 节假日 (fêtes), grands centres commerciaux. 故宫节假日真是人山人海 = la Cité interdite est noire de monde les jours fériés. 五花八门 (« 5 fleurs, 8 portes ») = TOUTES SORTES, varié. Souvent suivi d\'un nom : 五花八门的产品 (toutes sortes de produits). Connotation neutre à légèrement positive (richesse de l\'offre). 千变万化 (« 1000 changements, 10 000 transformations ») décrit ce qui CHANGE constamment. Usage typique : marché, mode, technologie, climat. 市场千变万化 (le marché change tout le temps).',
    bodyEn:
      '人山人海 («mountain of people, sea of people») evokes a MASSIVE crowd. Typical contexts: 春运 (chunyun, Lunar New Year migration), 节假日 (holidays), big shopping centers. 故宫节假日真是人山人海 = the Forbidden City is packed on holidays. 五花八门 («5 flowers, 8 doors») = ALL KINDS, varied. Often followed by a noun: 五花八门的产品 (all kinds of products). Neutral to slightly positive connotation (richness of offer). 千变万化 («1000 changes, 10000 transformations») describes what CHANGES constantly. Typical use: market, fashion, tech, climate. 市场千变万化 (the market changes constantly).',
    items: [
      { hanzi: '人山人海', pinyin: 'rén shān rén hǎi', meaning: 'foule massive', meaningEn: 'huge crowd', audio: 'audio/hsk6/hsk6_人山.wav' },
      { hanzi: '五花八门', pinyin: 'wǔ huā bā mén', meaning: 'toutes sortes', meaningEn: 'all kinds', audio: 'audio/hsk6/hsk6_五花.wav' },
      { hanzi: '千变万化', pinyin: 'qiān biàn wàn huà', meaning: 'en perpétuelle évolution', meaningEn: 'constantly changing', audio: 'audio/hsk6/hsk6_千变.wav' },
      { hanzi: '春运', pinyin: 'chūn yùn', meaning: 'migration du Nouvel An', meaningEn: 'Spring Festival rush', audio: 'audio/hsk6/hsk6_春运.wav' },
      { hanzi: '故宫', pinyin: 'gù gōng', meaning: 'Cité interdite', meaningEn: 'Forbidden City', audio: 'audio/hsk5/hsk5_故宫.wav' }
    ],
    tip:
      'Astuce mnémotechnique : ces 3 chengyu utilisent des nombres (人/人, 五/八, 千/万) pour AMPLIFIER. La structure 2+2 chinoise crée la musicalité : 人山|人海, 五花|八门, 千变|万化. Lis-les avec ce rythme à voix haute pour les ancrer.',
    tipEn:
      'Mnemonic: these 3 chengyu use numbers (人/人, 五/八, 千/万) to AMPLIFY. The Chinese 2+2 structure creates musicality: 人山|人海, 五花|八门, 千变|万化. Read with this rhythm aloud to anchor them.',
  },
  {
    id: 'c11-chengyu-comparer',
    title: 'Comparer avec 天壤之别 et 不相上下',
    titleEn: 'Compare with 天壤之别 and 不相上下',
    body:
      'Pour AMPLIFIER une différence : 天壤之别 (tiān rǎng zhī bié, « différence ciel-terre ») = différence colossale. 这两者有天壤之别 = il y a un fossé entre les deux. Très puissant, à utiliser avec parcimonie. Pour signaler EQUIVALENCE : 不相上下 (bù xiāng shàng xià, « ne pas se monter ni se descendre l\'un par rapport à l\'autre ») = à égalité, comparable. 两个候选人不相上下 = les 2 candidats sont à égalité. Plus chic que 差不多. Pour PROGRESSION : 日新月异 (rì xīn yuè yì, « jour nouveau, mois différent ») = évolution rapide et constante. 中国的城市日新月异. Les 3 sont des chengyu DESCRIPTIFS très utilisés en éditorial et en analyse.',
    bodyEn:
      'To AMPLIFY a difference: 天壤之别 («heaven-earth difference») = colossal gap. 这两者有天壤之别 = there\'s an abyss between them. Very powerful, use sparingly. To signal EQUIVALENCE: 不相上下 («neither above nor below the other») = even, comparable. 两个候选人不相上下 = the 2 candidates are even. More elegant than 差不多. For PROGRESSION: 日新月异 («new each day, different each month») = rapid constant change. 中国的城市日新月异. The 3 are DESCRIPTIVE chengyu widely used in editorials and analysis.',
    items: [
      { hanzi: '天壤之别', pinyin: 'tiān rǎng zhī bié', meaning: 'différence énorme', meaningEn: 'world of difference', audio: 'audio/hsk6/hsk6_天壤.wav' },
      { hanzi: '不相上下', pinyin: 'bù xiāng shàng xià', meaning: 'à égalité', meaningEn: 'on a par', audio: 'audio/hsk6/hsk6_不相.wav' },
      { hanzi: '日新月异', pinyin: 'rì xīn yuè yì', meaning: 'évolution rapide', meaningEn: 'rapidly evolving', audio: 'audio/hsk6/hsk6_日新.wav' },
      { hanzi: '候选人', pinyin: 'hòu xuǎn rén', meaning: 'candidat', meaningEn: 'candidate', audio: 'audio/hsk5/hsk5_候选人.wav' },
      { hanzi: '城市', pinyin: 'chéng shì', meaning: 'ville', meaningEn: 'city', audio: 'audio/hsk2/hsk2_城市.wav' }
    ],
    tip:
      '« 中国的发展日新月异 » est UNE phrase passe-partout d\'éditorial chinois sur le développement national. Si tu peux la placer naturellement en discussion (sur l\'économie, l\'urbanisme, la tech), tu signales ta familiarité avec le discours médiatique chinois.',
    tipEn:
      '«中国的发展日新月异» is a CATCH-ALL phrase in Chinese editorials on national development. Naturally placing it in conversation (on economy, urbanism, tech) signals your familiarity with Chinese media discourse.'
  }
];

export const c11ChengyuBasicM3LearnSections: LessonV2LearnSection[] = [
  {
    id: 'c11-chengyu-critique-voilee',
    title: '自相矛盾 + 画蛇添足 — critiquer en lettré',
    titleEn: '自相矛盾 + 画蛇添足 — critique like a literate',
    body:
      '自相矛盾 vient d\'un récit du Han Feizi : un vendeur prétendait que sa LANCE (矛 máo) perçait tout, ET que son BOUCLIER (盾 dùn) était impercable. Un client demande : « ta lance contre ton bouclier ? » — silence. Pour signaler une CONTRADICTION dans un argument : 您的论点似乎自相矛盾 (votre argument semble se contredire). 似乎 (semble) adoucit. 画蛇添足 vient d\'un autre récit : un homme qui finit son dessin de serpent en premier ajoute des pattes — résultat : il perd le concours car « les serpents n\'ont pas de pattes ». Pour critiquer un EXCÈS DE ZÈLE : 这个修改有点画蛇添足 (cette modification est un peu trop). Perte de face minimisée car la critique passe par la métaphore.',
    bodyEn:
      '自相矛盾 comes from a Han Feizi story: a seller claimed his SPEAR (矛) pierced everything AND his SHIELD (盾) was impenetrable. A customer asks: «your spear against your shield?» — silence. To flag CONTRADICTION in an argument: 您的论点似乎自相矛盾 (your argument seems to contradict itself). 似乎 (seems) softens. 画蛇添足 from another story: the first to finish drawing a snake adds legs — he loses the contest as «snakes don\'t have legs». To criticize OVERZEALOUSNESS: 这个修改有点画蛇添足 (this edit is a bit too much). Face loss minimized as criticism goes through metaphor.',
    items: [
      { hanzi: '自相矛盾', pinyin: 'zì xiāng máo dùn', meaning: 'se contredire', meaningEn: 'self-contradict', audio: 'audio/hsk6/hsk6_自相.wav' },
      { hanzi: '画蛇添足', pinyin: 'huà shé tiān zú', meaning: 'gâcher par excès', meaningEn: 'overdo it', audio: 'audio/hsk6/hsk6_画蛇.wav' },
      { hanzi: '论点', pinyin: 'lùn diǎn', meaning: 'argument', meaningEn: 'argument', audio: 'audio/hsk6/hsk6_论点.wav' },
      { hanzi: '似乎', pinyin: 'sì hū', meaning: 'sembler', meaningEn: 'seem', audio: 'audio/hsk5/hsk5_似乎.wav' },
      { hanzi: '修改', pinyin: 'xiū gǎi', meaning: 'modification', meaningEn: 'edit', audio: 'audio/hsk5/hsk5_修改.wav' }
    ],
    tip:
      'En débat C1+, « 您的论点似乎自相矛盾 » est la formule magique pour pointer une faille SANS attaquer. La critique passe par le chengyu, donc elle est INTELLECTUELLE et non personnelle. L\'opposant peut reculer sans perdre la face.',
    tipEn:
      'In C1+ debate, «您的论点似乎自相矛盾» is the magic formula to point out a flaw WITHOUT attacking. Criticism goes through the chengyu, so it\'s INTELLECTUAL not personal. The opponent can back off without losing face.'
  },
  {
    id: 'c11-chengyu-paranoia',
    title: '杯弓蛇影 + 草木皆兵 — peur déraisonnable',
    titleEn: '杯弓蛇影 + 草木皆兵 — unreasonable fear',
    body:
      '杯弓蛇影 : un homme tombe malade après avoir cru voir un serpent dans sa coupe de vin — c\'était le reflet d\'un arc accroché au mur. Il guérit dès qu\'il découvre la vérité. Sens : se faire peur tout seul, soupçons IMAGINAIRES. 不要杯弓蛇影 (n\'aies pas peur d\'ombres). 草木皆兵 (cǎo mù jiē bīng, « herbes et arbres = soldats ») vient de la bataille de la rivière Fei (383) : un général en déroute voit des soldats partout. Sens : panique paranoïaque générale, peur extrême. Différence : 杯弓蛇影 = peur INDIVIDUELLE imaginaire ; 草木皆兵 = panique COLLECTIVE et exagérée. À mobiliser pour analyser une réaction excessive (politique, marché, opinion publique).',
    bodyEn:
      '杯弓蛇影: a man falls ill after thinking he saw a snake in his wine cup — it was the reflection of a bow on the wall. He recovers when he finds the truth. Meaning: scaring oneself, IMAGINED suspicions. 不要杯弓蛇影 (don\'t fear shadows). 草木皆兵 (cǎo mù jiē bīng, «grass and trees = soldiers») from the battle of Fei River (383): a defeated general sees soldiers everywhere. Meaning: paranoid general panic, extreme fear. Difference: 杯弓蛇影 = INDIVIDUAL imagined fear; 草木皆兵 = COLLECTIVE exaggerated panic. To analyze excessive reaction (politics, market, public opinion).',
    items: [
      { hanzi: '杯弓蛇影', pinyin: 'bēi gōng shé yǐng', meaning: 'soupçons imaginaires', meaningEn: 'imagined fear', audio: 'audio/hsk6/hsk6_杯弓.wav' },
      { hanzi: '草木皆兵', pinyin: 'cǎo mù jiē bīng', meaning: 'panique générale', meaningEn: 'see enemies everywhere', audio: 'audio/hsk6/hsk6_草木.wav' },
      { hanzi: '影子', pinyin: 'yǐng zi', meaning: 'ombre', meaningEn: 'shadow', audio: 'audio/hsk4/hsk4_影子.wav' },
      { hanzi: '怀疑', pinyin: 'huái yí', meaning: 'douter, soupçonner', meaningEn: 'suspect', audio: 'audio/hsk4/hsk4_怀疑.wav' },
      { hanzi: '反应', pinyin: 'fǎn yìng', meaning: 'réaction', meaningEn: 'reaction', audio: 'audio/hsk5/hsk5_反应.wav' }
    ],
    tip:
      'Pour calmer un proche paranoïaque (qui voit des trahisons partout), dis avec sourire : « 别杯弓蛇影了 » (n\'imagine pas le pire). Phrase intime avec un chengyu — montre l\'affection + invite à la rationalité sans condescendance.',
    tipEn:
      'To calm a paranoid friend (seeing betrayals everywhere), say with a smile: «别杯弓蛇影了» (don\'t imagine the worst). Intimate phrase with a chengyu — shows affection + invites rationality without condescension.'
  }
];

export const c11ChengyuBasicM4LearnSections: LessonV2LearnSection[] = [
  {
    id: 'c11-volonte-perseverance',
    title: '坚持不懈 + 勇往直前 — encourager',
    titleEn: '坚持不懈 + 勇往直前 — encourage',
    body:
      '坚持不懈 (« persévérer sans relâche ») = encourager à NE PAS LÂCHER. Apparait dans presque tous les discours motivants chinois (école, sport, business). 我们要坚持不懈地努力 (il faut persévérer sans relâche). 勇往直前 (« avancer courageusement droit devant ») = encourager à aller de l\'avant SANS PEUR. Plus offensif. Souvent en injonction : 勇往直前，永不言败 ! (avance courageusement, ne dis jamais que tu es vaincu !). Combo classique : 坚持不懈 (endurance) + 勇往直前 (courage) = formule complète pour motiver. Pour un coach / mentor : combine les 2 dans le même paragraphe pour un effet maximal.',
    bodyEn:
      '坚持不懈 («persevere without slacking») = encourage NOT TO LET GO. Appears in nearly all Chinese motivational speeches (school, sport, business). 我们要坚持不懈地努力 (we must persevere without slacking). 勇往直前 («advance courageously straight ahead») = encourage to go forward WITHOUT FEAR. More offensive. Often as injunction: 勇往直前，永不言败! (advance courageously, never say defeat!). Classic combo: 坚持不懈 (endurance) + 勇往直前 (courage) = complete motivational formula. For a coach / mentor: combine the 2 in the same paragraph for max effect.',
    items: [
      { hanzi: '坚持不懈', pinyin: 'jiān chí bú xiè', meaning: 'persévérer sans relâche', meaningEn: 'persevere unyieldingly', audio: 'audio/hsk6/hsk6_坚持不懈.wav' },
      { hanzi: '勇往直前', pinyin: 'yǒng wǎng zhí qián', meaning: 'avancer courageusement', meaningEn: 'press forward', audio: 'audio/hsk6/hsk6_勇往.wav' },
      { hanzi: '言败', pinyin: 'yán bài', meaning: 'reconnaître la défaite', meaningEn: 'admit defeat', audio: 'audio/hsk6/hsk6_言.wav' },
      { hanzi: '努力', pinyin: 'nǔ lì', meaning: 'effort', meaningEn: 'effort', audio: 'audio/hsk3/hsk3_努力.wav' },
      { hanzi: '激励', pinyin: 'jī lì', meaning: 'inspirer, motiver', meaningEn: 'motivate', audio: 'audio/hsk6/hsk6_激励.wav' }
    ],
    tip:
      'Pour conclure un discours motivant en chinois : « 让我们坚持不懈，勇往直前 ! » Combo très classique mais qui marche. Plus subtil : ajoute 一定能成功 à la fin pour une fermeture optimiste sans pédanterie excessive.',
    tipEn:
      'To close a motivational speech in Chinese: «让我们坚持不懈，勇往直前!» Very classic combo that works. Subtler: add 一定能成功 at the end for an optimistic close without excessive pedantry.'
  },
  {
    id: 'c11-volonte-concentration',
    title: '一心一意 + 全神贯注 + 废寝忘食',
    titleEn: '一心一意 + 全神贯注 + 废寝忘食',
    body:
      '一心一意 (« un cœur, une intention ») = se DÉVOUER TOTALEMENT à une chose, sans distraction. Souvent utilisé pour louer un parent, un professeur : 她一心一意地照顾孩子 (elle se dévoue entièrement à ses enfants). 全神贯注 (« toute l\'âme et la concentration ») = totale CONCENTRATION sur une tâche en cours. 学生全神贯注地听讲 (les élèves écoutent attentivement le cours). Plus situationnel. 废寝忘食 (« oublier le sommeil et la nourriture ») = travail INTENSE jusqu\'à se nourrir mal. Connote l\'engagement EXTRÊME. Hierarchy : 一心一意 (loyauté constante) < 全神贯注 (concentration ponctuelle) < 废寝忘食 (engagement extrême). Le dernier flatte beaucoup en CV/lettre.',
    bodyEn:
      '一心一意 («one heart, one intention») = DEVOTE ONESELF FULLY without distraction. Used to praise a parent, teacher: 她一心一意地照顾孩子 (she devotes herself entirely to her children). 全神贯注 («full spirit and focus») = total CONCENTRATION on a task at hand. 学生全神贯注地听讲 (students listen attentively to the lecture). More situational. 废寝忘食 («forget sleep and food») = INTENSE work to the point of poor self-care. Connotes EXTREME engagement. Hierarchy: 一心一意 (constant loyalty) < 全神贯注 (focused attention) < 废寝忘食 (extreme commitment). The last flatters a lot in CV/letter.',
    items: [
      { hanzi: '一心一意', pinyin: 'yì xīn yí yì', meaning: 'totalement dévoué', meaningEn: 'wholeheartedly', audio: 'audio/hsk6/hsk6_一心.wav' },
      { hanzi: '全神贯注', pinyin: 'quán shén guàn zhù', meaning: 'totale concentration', meaningEn: 'fully focused', audio: 'audio/hsk6/hsk6_全神.wav' },
      { hanzi: '废寝忘食', pinyin: 'fèi qǐn wàng shí', meaning: 'engagement extrême', meaningEn: 'forget sleep & food', audio: 'audio/hsk6/hsk6_废寝.wav' },
      { hanzi: '照顾', pinyin: 'zhào gù', meaning: 'prendre soin', meaningEn: 'take care', audio: 'audio/hsk3/hsk3_照顾.wav' },
      { hanzi: '听讲', pinyin: 'tīng jiǎng', meaning: 'écouter (cours)', meaningEn: 'listen (lecture)', audio: 'audio/hsk5/hsk5_听讲.wav' }
    ],
    tip:
      'En CV chinois, dans la rubrique 自我评价 (auto-évaluation), placer « 我对工作一心一意，常常废寝忘食 » signale ENGAGEMENT et SACRIFICE — valeurs très valorisées. Mais à modérer : si trop appuyé, sonne faux. Mesure le ton.',
    tipEn:
      'In a Chinese CV, in the 自我评价 (self-eval) section, placing «我对工作一心一意，常常废寝忘食» signals COMMITMENT and SACRIFICE — highly valued. But moderate: if too heavy, sounds fake. Watch the tone.'
  }
];

// --- media-discourse --------------------------------------------------------

export const c11MediaDiscourseM1LearnSections: LessonV2LearnSection[] = [
  {
    id: 'c11-presse-anatomie',
    title: 'Anatomie d\'une dépêche : 标题 → 导语 → 主体 → 结尾',
    titleEn: 'Anatomy of a dispatch: 标题 → 导语 → 主体 → 结尾',
    body:
      '标题 (titre) chinois : court, factuel, souvent de 8-15 caractères, parfois en 2 lignes (titre principal + sous-titre 副标题). 导语 (chapeau) : 1-2 phrases qui répondent aux 5W+H (qui, quoi, où, quand, pourquoi, comment). À lire EN PRIORITÉ — donne 80% de l\'info. 主体 (corps) : développement chronologique ou thématique, citations entre guillemets 「」 ou 《》. 结尾 (clôture) : peut être une projection (« 预计未来… ») ou une citation. Pour LIRE VITE la presse chinoise : titre → chapeau → 1ers mots de chaque paragraphe. Si tu lis en intégral chaque article, tu vas crouler. Discipline pro.',
    bodyEn:
      'Chinese 标题 (headline): short, factual, often 8-15 characters, sometimes in 2 lines (main + subhead 副标题). 导语 (lede): 1-2 sentences answering 5W+H (who, what, where, when, why, how). Read FIRST — gives 80% of the info. 主体 (body): chronological or thematic development, quotes in 「」 or 《》. 结尾 (close): can be a projection («预计未来…») or a quote. To read Chinese press FAST: headline → lede → first words of each paragraph. Reading every article in full will overwhelm you. Pro discipline.',
    items: [
      { hanzi: '标题', pinyin: 'biāo tí', meaning: 'titre', meaningEn: 'headline', audio: 'audio/hsk5/hsk5_标题.wav' },
      { hanzi: '导语', pinyin: 'dǎo yǔ', meaning: 'chapeau (presse)', meaningEn: 'lede', audio: 'audio/hsk6/hsk6_导语.wav' },
      { hanzi: '主体', pinyin: 'zhǔ tǐ', meaning: 'corps (presse)', meaningEn: 'body (press)', audio: 'audio/hsk6/hsk6_主体.wav' },
      { hanzi: '副标题', pinyin: 'fù biāo tí', meaning: 'sous-titre', meaningEn: 'subhead', audio: 'audio/hsk6/hsk6_副.wav' },
      { hanzi: '预计', pinyin: 'yù jì', meaning: 'prévoir', meaningEn: 'forecast', audio: 'audio/hsk5/hsk5_预计.wav' }
    ],
    tip:
      'Lire la presse chinoise : OUVRE 5 articles en parallèle, lis SEULEMENT les chapeaux 导语. En 5 min, tu as une vue d\'ensemble de l\'actualité. Habitude de journaliste/analyste pro pour gérer le volume sans s\'épuiser.',
    tipEn:
      'Reading Chinese press: OPEN 5 articles in parallel, read ONLY the 导语 ledes. In 5 min, you have an overview of the news. Pro journalist/analyst habit to manage volume without burnout.'
  },
  {
    id: 'c11-presse-sources',
    title: 'Hiérarchie des sources : Renmin → Caixin',
    titleEn: 'Source hierarchy: Renmin → Caixin',
    body:
      '人民日报 (Quotidien du Peuple) : voix officielle du Parti, 1er journal en termes d\'autorité. Lire la 1re page = lire la ligne politique du jour. 新华社 (Xinhua) : agence de presse d\'État, source de la quasi-totalité des dépêches reprises ailleurs. 央视 (CCTV) + 新闻联播 (le JT de 19h, 30 min, regardé/critiqué par 100M+ chaque soir) : ordre fixe — leaders → diplomatie → économie → société. 南方周末 (Southern Weekly, base à Canton) : presse plus libre dans les limites, investigations sociales. 财新 (Caixin) : référence économique, plus indépendant. Pour TRIANGULER une info chinoise : Xinhua + Caixin + presse étrangère (Reuters/Bloomberg en chinois si tu as accès).',
    bodyEn:
      '人民日报 (People\'s Daily): official Party voice, top in authority. Reading p.1 = reading the day\'s political line. 新华社 (Xinhua): state news agency, source of nearly all dispatches republished elsewhere. 央视 (CCTV) + 新闻联播 (the 7pm news, 30 min, watched/criticized by 100M+ nightly): fixed order — leaders → diplomacy → economy → society. 南方周末 (Southern Weekly, Canton-based): freer press within limits, social investigations. 财新 (Caixin): economic reference, more independent. To TRIANGULATE Chinese info: Xinhua + Caixin + foreign press (Reuters/Bloomberg in Chinese if you have access).',
    items: [
      { hanzi: '人民日报', pinyin: 'rén mín rì bào', meaning: 'Quotidien du Peuple', meaningEn: 'People\'s Daily', audio: 'audio/hsk6/hsk6_人民.wav' },
      { hanzi: '新华社', pinyin: 'xīn huá shè', meaning: 'Xinhua', meaningEn: 'Xinhua', audio: 'audio/hsk6/hsk6_新华社.wav' },
      { hanzi: '央视', pinyin: 'yāng shì', meaning: 'CCTV (abrégé)', meaningEn: 'CCTV', audio: 'audio/hsk6/hsk6_央视.wav' },
      { hanzi: '新闻联播', pinyin: 'xīn wén lián bō', meaning: 'JT du soir CCTV', meaningEn: 'evening news', audio: 'audio/hsk6/hsk6_新闻联播.wav' },
      { hanzi: '财新', pinyin: 'cái xīn', meaning: 'Caixin', meaningEn: 'Caixin', audio: 'audio/hsk6/hsk6_财新.wav' }
    ],
    tip:
      'Le 新闻联播 a un ordre RITUEL : leaders → diplomatie → réalisations économiques → société → météo. Le TEMPS accordé à chaque dirigeant lors d\'une visite à l\'étranger est un INDICATEUR politique surveillé par les analystes. Apprends à le lire.',
    tipEn:
      'The 新闻联播 has a RITUAL order: leaders → diplomacy → economic achievements → society → weather. The TIME given to each leader during a foreign visit is a POLITICAL indicator watched by analysts. Learn to read it.'
  }
];

export const c11MediaDiscourseM2LearnSections: LessonV2LearnSection[] = [
  {
    id: 'c11-politique-triptyque',
    title: '改革开放 — comprendre le triptyque fondateur',
    titleEn: '改革开放 — understanding the founding triptych',
    body:
      '改革 (réforme) — modernisation des structures économiques. 开放 (ouverture) — au monde extérieur, aux investissements étrangers. 发展 (développement) — but ultime. Les 3 mots forment un système : tu réformes POUR ouvrir, tu ouvres POUR développer. 改革开放 (combiné) = nom historique de la politique de Deng Xiaoping (déc. 1978). Avant : économie planifiée fermée. Après : zones économiques spéciales (Shenzhen, Zhuhai, Xiamen, Shantou en 1980), entrée OMC en 2001. Tout discours officiel chinois de 1978 à aujourd\'hui se positionne PAR RAPPORT à 改革开放. Comprendre ce mot = clé d\'entrée du discours politique.',
    bodyEn:
      '改革 (reform) — modernizing economic structures. 开放 (opening) — to the outside world, foreign investment. 发展 (development) — ultimate goal. The 3 words form a system: you reform TO open, you open TO develop. 改革开放 (combined) = historical name of Deng Xiaoping\'s policy (Dec. 1978). Before: closed planned economy. After: Special Economic Zones (Shenzhen, Zhuhai, Xiamen, Shantou in 1980), WTO entry in 2001. All Chinese official discourse from 1978 to today positions itself RELATIVE TO 改革开放. Understanding this word = entry key to political discourse.',
    items: [
      { hanzi: '改革', pinyin: 'gǎi gé', meaning: 'réforme', meaningEn: 'reform', audio: 'audio/hsk5/hsk5_改革.wav' },
      { hanzi: '开放', pinyin: 'kāi fàng', meaning: 'ouverture', meaningEn: 'opening', audio: 'audio/hsk5/hsk5_开放.wav' },
      { hanzi: '发展', pinyin: 'fā zhǎn', meaning: 'développement', meaningEn: 'development', audio: 'audio/hsk4/hsk4_发展.wav' },
      { hanzi: '邓小平', pinyin: 'dèng xiǎo píng', meaning: 'Deng Xiaoping', meaningEn: 'Deng Xiaoping', audio: 'audio/hsk6/hsk6_邓小平.wav' },
      { hanzi: '深圳', pinyin: 'shēn zhèn', meaning: 'Shenzhen', meaningEn: 'Shenzhen', audio: 'audio/hsk5/hsk5_深圳.wav' }
    ],
    tip:
      'En 2018, on a fêté en grande pompe les 40 ans de 改革开放. C\'est UN mythe fondateur. Critiquer 改革开放 frontalement avec un Chinois = inconfortable, car c\'est l\'une des sources du progrès dont chacun a profité. Discute, mais nuance.',
    tipEn:
      'In 2018, the 40th anniversary of 改革开放 was celebrated with great fanfare. It\'s a FOUNDING myth. Frontally criticizing 改革开放 with a Chinese = uncomfortable, as it\'s one of the sources of the progress everyone has enjoyed. Discuss but nuance.'
  },
  {
    id: 'c11-politique-slogans',
    title: '中国梦 + 一带一路 + 共同富裕 — slogans actuels',
    titleEn: '中国梦 + 一带一路 + 共同富裕 — current slogans',
    body:
      '中国梦 (Rêve chinois) — slogan de Xi Jinping (2012) : 中华民族伟大复兴 (« le grand renouveau de la nation chinoise »). Notion mobilisatrice mêlant prospérité personnelle et puissance nationale. 一带一路 (Belt and Road, 2013) : projet géoéconomique d\'infrastructures (routes, ports, voies ferrées) reliant la Chine à l\'Europe via Asie centrale + Afrique. 共同富裕 (Prospérité commune) : slogan repris en 2021 après une période de creusement des inégalités, signal d\'une régulation des géants tech (Alibaba, Tencent, etc.). Comprendre ces 3 slogans = comprendre les 3 priorités stratégiques actuelles : identité, projection internationale, équité interne.',
    bodyEn:
      '中国梦 (Chinese Dream) — Xi Jinping slogan (2012): 中华民族伟大复兴 («the great revival of the Chinese nation»). Mobilizing notion blending personal prosperity and national power. 一带一路 (Belt and Road, 2013): geoeconomic project of infrastructure (roads, ports, railways) connecting China to Europe via Central Asia + Africa. 共同富裕 (Common Prosperity): slogan revived in 2021 after a period of widening inequality, signaling regulation of tech giants (Alibaba, Tencent). Understanding these 3 slogans = understanding the 3 current strategic priorities: identity, international projection, internal equity.',
    items: [
      { hanzi: '中国梦', pinyin: 'zhōng guó mèng', meaning: 'Rêve chinois', meaningEn: 'Chinese Dream', audio: 'audio/hsk6/hsk6_中国梦.wav' },
      { hanzi: '一带一路', pinyin: 'yí dài yí lù', meaning: 'Belt and Road', meaningEn: 'Belt and Road', audio: 'audio/hsk6/hsk6_一带.wav' },
      { hanzi: '共同富裕', pinyin: 'gòng tóng fù yù', meaning: 'prospérité commune', meaningEn: 'common prosperity', audio: 'audio/hsk6/hsk6_共同.wav' },
      { hanzi: '复兴', pinyin: 'fù xīng', meaning: 'renouveau', meaningEn: 'revival', audio: 'audio/hsk6/hsk6_复兴.wav' },
      { hanzi: '战略', pinyin: 'zhàn lüè', meaning: 'stratégie', meaningEn: 'strategy', audio: 'audio/hsk5/hsk5_战略.wav' }
    ],
    tip:
      'Astuce d\'observateur : suivre l\'évolution des slogans = suivre l\'évolution des priorités. Quand 共同富裕 a réémergé en 2021, c\'était LE signal annonçant la régulation des plateformes tech, longtemps avant les sanctions concrètes. Lis les slogans comme des annonces d\'orientation.',
    tipEn:
      'Observer trick: tracking slogan evolution = tracking priority evolution. When 共同富裕 re-emerged in 2021, it was THE signal announcing tech platform regulation, long before concrete sanctions. Read slogans as direction announcements.'
  }
];

export const c11MediaDiscourseM3LearnSections: LessonV2LearnSection[] = [
  {
    id: 'c11-diplomatique-formules',
    title: 'Formules diplomatiques officielles',
    titleEn: 'Official diplomatic formulas',
    body:
      '中方 (« partie chinoise ») et 美方 / 欧方 / 俄方 (parties US/UE/russe) : formules de communiqués diplomatiques, JAMAIS « les Chinois » / « les Américains » qui sont jugés trop personnels. 双边关系 (bilatéral), 多边主义 (multilatéralisme — soutenu par la Chine officiellement), 战略伙伴关系 (partenariat stratégique). Hiérarchie de chaleur diplomatique : 全面战略伙伴关系 (« partenariat stratégique global ») > 战略伙伴关系 > 友好伙伴关系 > 合作伙伴关系 > simple 友好关系. Chaque mot indique un niveau précis. Quand tu lis « la Chine et X élèvent leur relation à un partenariat stratégique global », c\'est un événement géopolitique majeur.',
    bodyEn:
      '中方 («Chinese side») and 美方 / 欧方 / 俄方 (US/EU/Russian sides): formulas of diplomatic communiqués, NEVER «the Chinese» / «the Americans» which are deemed too personal. 双边关系 (bilateral), 多边主义 (multilateralism — supported by China officially), 战略伙伴关系 (strategic partnership). Diplomatic warmth hierarchy: 全面战略伙伴关系 («comprehensive strategic partnership») > 战略伙伴关系 > 友好伙伴关系 > 合作伙伴关系 > plain 友好关系. Each word indicates a precise level. When you read «China and X elevate their relationship to a comprehensive strategic partnership», that\'s a major geopolitical event.',
    items: [
      { hanzi: '中方', pinyin: 'zhōng fāng', meaning: 'partie chinoise', meaningEn: 'Chinese side', audio: 'audio/hsk6/hsk6_中方.wav' },
      { hanzi: '双边', pinyin: 'shuāng biān', meaning: 'bilatéral', meaningEn: 'bilateral', audio: 'audio/hsk6/hsk6_双边.wav' },
      { hanzi: '多边', pinyin: 'duō biān', meaning: 'multilatéral', meaningEn: 'multilateral', audio: 'audio/hsk6/hsk6_多边.wav' },
      { hanzi: '伙伴', pinyin: 'huǒ bàn', meaning: 'partenaire', meaningEn: 'partner', audio: 'audio/hsk5/hsk5_伙伴.wav' },
      { hanzi: '战略', pinyin: 'zhàn lüè', meaning: 'stratégique', meaningEn: 'strategic', audio: 'audio/hsk5/hsk5_战略.wav' }
    ],
    tip:
      'En analyse géopolitique chinoise, prête attention aux ADJECTIFS qui qualifient une relation. « 全面 » (global) > « 深入 » (approfondi) > simple absence d\'adjectif. Une visite d\'État qui passe de 战略 à 全面战略 = saut diplomatique majeur. À surveiller dans la presse.',
    tipEn:
      'In Chinese geopolitical analysis, pay attention to ADJECTIVES qualifying a relationship. «全面» (comprehensive) > «深入» (in-depth) > plain absence of adjective. A state visit moving from 战略 to 全面战略 = major diplomatic jump. Monitor in the press.'
  },
  {
    id: 'c11-diplomatique-sujets-sensibles',
    title: 'Sujets sensibles : 台湾, 香港, 南海',
    titleEn: 'Sensitive topics: 台湾, 香港, 南海',
    body:
      '台湾问题 (« la question de Taïwan ») : formulation OFFICIELLE — n\'utilise jamais 国 (pays) pour Taïwan dans un contexte chinois officiel. Position de Pékin : 一个中国原则 (principe d\'une seule Chine), 台湾自古以来是中国领土不可分割的一部分. Avec un Chinois, ÉVITE les positions tranchées sur ce sujet — c\'est ÉMOTIONNEL. 香港 : « 一国两制 » (un pays, deux systèmes), 50 ans de droits spéciaux promis en 1997, mais resserrement après 2020 (loi sur la sécurité nationale). 南海 (Mer de Chine méridionale) : revendications chinoises (« 九段线 », ligne en 9 traits) contestées par Vietnam, Philippines, etc. Discuter ces sujets demande prudence et CONNAISSANCE des positions officielles.',
    bodyEn:
      '台湾问题 («the Taiwan question»): OFFICIAL formulation — never use 国 (country) for Taiwan in an official Chinese context. Beijing\'s position: 一个中国原则 (One China principle), 台湾自古以来是中国领土不可分割的一部分. With a Chinese, AVOID sharp positions on this — it\'s EMOTIONAL. 香港: «一国两制» (one country, two systems), 50 years of special rights promised in 1997, but tightening after 2020 (national security law). 南海 (South China Sea): Chinese claims («九段线», nine-dash line) contested by Vietnam, Philippines, etc. Discussing these requires caution and KNOWLEDGE of official positions.',
    items: [
      { hanzi: '台湾', pinyin: 'tái wān', meaning: 'Taïwan', meaningEn: 'Taiwan', audio: 'audio/hsk5/hsk5_台湾.wav' },
      { hanzi: '香港', pinyin: 'xiāng gǎng', meaning: 'Hong Kong', meaningEn: 'Hong Kong', audio: 'audio/hsk4/hsk4_香港.wav' },
      { hanzi: '南海', pinyin: 'nán hǎi', meaning: 'Mer de Chine méridionale', meaningEn: 'South China Sea', audio: 'audio/hsk6/hsk6_南海.wav' },
      { hanzi: '原则', pinyin: 'yuán zé', meaning: 'principe', meaningEn: 'principle', audio: 'audio/hsk5/hsk5_原则.wav' },
      { hanzi: '领土', pinyin: 'lǐng tǔ', meaning: 'territoire', meaningEn: 'territory', audio: 'audio/hsk6/hsk6_领土.wav' }
    ],
    tip:
      'Si un Chinois aborde ces sujets : ÉCOUTE plus que parle. Pose des questions ouvertes (« 您怎么看 ? »). Évite les positions tranchées. Si tu n\'es pas d\'accord, formule en QUESTION : « 但有一种观点是…，您怎么看 ? ». Préserve la discussion sans capituler.',
    tipEn:
      'If a Chinese broaches these topics: LISTEN more than speak. Ask open questions («您怎么看?»). Avoid sharp stances. If you disagree, frame as a QUESTION: «但有一种观点是…，您怎么看?». Preserve discussion without capitulating.'
  }
];

export const c11MediaDiscourseM4LearnSections: LessonV2LearnSection[] = [
  {
    id: 'c11-shumianyu-particules',
    title: '之 / 于 / 为 / 而 / 则 — particules d\'éditorial',
    titleEn: '之 / 于 / 为 / 而 / 则 — editorial particles',
    body:
      '之 (= 的, plus court) : 中国之未来 (l\'avenir de la Chine). Économie de syllabes très utile en titre. 于 (= 在 ou 对) : 致力于 X (se consacrer à X), 优于 Y (supérieur à Y). 为 (= 是, ou « pour ») : 此 X 之要 (« ceci est l\'essentiel de X »), 为人民服务 (servir le peuple). 而 : connecteur logique (et / mais / alors). 知而行之 (savoir et le mettre en pratique). 则 (= 就) : conditionnel ou conséquence. 有志者，事竟成；无志者，事则不成 (qui veut, peut ; qui ne veut pas, échoue). Reconnaître ces 5 particules = pouvoir LIRE 95% des éditoriaux du Renmin Ribao sans s\'épuiser.',
    bodyEn:
      '之 (= 的, shorter): 中国之未来 (China\'s future). Syllable economy very useful in titles. 于 (= 在 or 对): 致力于 X (devote to X), 优于 Y (superior to Y). 为 (= 是, or «for»): 此 X 之要 («this is X\'s essence»), 为人民服务 (serve the people). 而: logical connector (and/but/then). 知而行之 (know and put into practice). 则 (= 就): conditional or consequence. 有志者，事竟成；无志者，事则不成 (he who wills, succeeds; who doesn\'t, fails). Recognizing these 5 particles = ability to READ 95% of Renmin Ribao editorials without exhaustion.',
    items: [
      { hanzi: '之', pinyin: 'zhī', meaning: 'de (classique)', meaningEn: 'of (classical)', audio: 'audio/hsk5/hsk5_之.wav' },
      { hanzi: '于', pinyin: 'yú', meaning: 'à, dans (formel)', meaningEn: 'at, in (formal)', audio: 'audio/hsk5/hsk5_于.wav' },
      { hanzi: '为', pinyin: 'wéi', meaning: 'être / pour', meaningEn: 'be / for', audio: 'audio/hsk2/hsk2_为.wav' },
      { hanzi: '而', pinyin: 'ér', meaning: 'et, mais (formel)', meaningEn: 'and, but (formal)', audio: 'audio/hsk5/hsk5_而.wav' },
      { hanzi: '则', pinyin: 'zé', meaning: 'alors, donc (formel)', meaningEn: 'then, so (formal)', audio: 'audio/hsk5/hsk5_则.wav' }
    ],
    tip:
      'Astuce de lecture éclair : ces particules sont des CHARNIÈRES logiques. Saute les contenus, repère les charnières. Tu reconstitues le squelette argumentatif sans lire chaque mot. Compétence n°1 du lecteur de presse soutenue chinoise.',
    tipEn:
      'Speed-reading trick: these particles are logical HINGES. Skip the content, spot the hinges. You reconstruct the argumentative skeleton without reading every word. Top skill of the formal Chinese press reader.'
  },
  {
    id: 'c11-shumianyu-conjonctions',
    title: '因此 / 然而 / 纵使 / 倘若 — conjonctions soutenues',
    titleEn: '因此 / 然而 / 纵使 / 倘若 — formal conjunctions',
    body:
      '因此 = donc, par conséquent (C1 standard). Plus structurant que 所以. 然而 = toutefois, cependant. Marque une OPPOSITION soutenue, plus que 但是. 纵使 = même si (concession FORTE), équivalent soutenu de 即使. 纵使千难万险，我也要去 (même au prix de mille difficultés, j\'irai). 倘若 = si jamais (hypothétique formel), équivalent de 如果. 倘若发生 X，我们将 Y (si jamais X arrive, nous Y). Ces 4 conjonctions transforment ton chinois écrit de B2 à C1 instantanément. À ALTERNER avec leurs versions courantes pour ne pas tomber dans le pédantisme excessif. Règle : 1-2 conjonctions soutenues par paragraphe maximum.',
    bodyEn:
      '因此 = therefore (C1 standard). More structuring than 所以. 然而 = however, yet. Marks formal OPPOSITION, stronger than 但是. 纵使 = even if (STRONG concession), formal equivalent of 即使. 纵使千难万险，我也要去 (even at the cost of a thousand hardships, I\'ll go). 倘若 = should (formal hypothetical), equivalent of 如果. 倘若发生 X，我们将 Y (should X happen, we\'ll Y). These 4 conjunctions transform your written Chinese from B2 to C1 instantly. ALTERNATE with their plain versions to avoid excessive pedantry. Rule: 1-2 formal conjunctions per paragraph max.',
    items: [
      { hanzi: '因此', pinyin: 'yīn cǐ', meaning: 'par conséquent', meaningEn: 'therefore', audio: 'audio/hsk4/hsk4_因此.wav' },
      { hanzi: '然而', pinyin: 'rán ér', meaning: 'toutefois', meaningEn: 'however', audio: 'audio/hsk5/hsk5_然而.wav' },
      { hanzi: '纵使', pinyin: 'zòng shǐ', meaning: 'même si (formel)', meaningEn: 'even if (formal)', audio: 'audio/hsk6/hsk6_纵使.wav' },
      { hanzi: '倘若', pinyin: 'tǎng ruò', meaning: 'si jamais', meaningEn: 'should (if)', audio: 'audio/hsk6/hsk6_倘若.wav' },
      { hanzi: '将', pinyin: 'jiāng', meaning: 'va, futur (formel)', meaningEn: 'will (formal)', audio: 'audio/hsk5/hsk5_将.wav' }
    ],
    tip:
      'Règle d\'alternance pour un essai C1 : 1er paragraphe en formules courantes (但是, 所以) pour poser le ton, puis monter en registre (然而, 因此) à mesure que tu structures la démonstration. Le contraste de registre marque l\'élégance.',
    tipEn:
      'Alternation rule for a C1 essay: 1st paragraph in plain formulas (但是, 所以) to set the tone, then rise in register (然而, 因此) as you structure the demonstration. Register contrast marks elegance.'
  }
];

// --- history ----------------------------------------------------------------

export const c11HistoryM1LearnSections: LessonV2LearnSection[] = [
  {
    id: 'c11-dynasties-mnemo',
    title: 'Mnémotechnique des dynasties + figures',
    titleEn: 'Dynasty mnemonics + figures',
    body:
      'Les écoliers chinois récitent : 秦汉唐宋元明清 (Qín Hàn Táng Sòng Yuán Míng Qīng) — 7 syllabes pour 2000 ans. Astuce mnémo : « Qin a Han Tang son Yuan Ming Qing » (forme orale qui aide). 秦 (-221) : courte (15 ans) mais matrice de l\'empire — unification monnaie, écriture, mesures. 汉 (4 siècles) : ouvre la Route de la Soie, donne son nom à 汉族 (95% des Chinois). 唐 (300 ans) : âge d\'or — poésie, bouddhisme, Chang\'an = plus grande ville du monde. 宋 (300 ans) : technologie (poudre, boussole, imprimerie) mais militairement faible. 元 : domination mongole. 明 : restauration han, Cité interdite. 清 : mandchoue, finit dans la révolution.',
    bodyEn:
      'Chinese schoolchildren recite: 秦汉唐宋元明清 (Qín Hàn Táng Sòng Yuán Míng Qīng) — 7 syllables for 2000 years. Mnemonic: «Qin a Han Tang son Yuan Ming Qing» (oral form that helps). 秦 (-221): short (15 years) but matrix of the empire — unification of currency, writing, measures. 汉 (4 centuries): opens the Silk Road, gives its name to 汉族 (95% of Chinese). 唐 (300 years): golden age — poetry, Buddhism, Chang\'an = largest city in the world. 宋 (300 years): tech (powder, compass, printing) but militarily weak. 元: Mongol rule. 明: Han restoration, Forbidden City. 清: Manchu, ends in revolution.',
    items: [
      { hanzi: '秦', pinyin: 'qín', meaning: 'dyn. Qin', meaningEn: 'Qin dyn.', audio: 'audio/hsk6/hsk6_秦.wav' },
      { hanzi: '汉', pinyin: 'hàn', meaning: 'dyn. Han', meaningEn: 'Han dyn.', audio: 'audio/hsk2/hsk2_汉.wav' },
      { hanzi: '唐', pinyin: 'táng', meaning: 'dyn. Tang', meaningEn: 'Tang dyn.', audio: 'audio/hsk5/hsk5_唐.wav' },
      { hanzi: '宋', pinyin: 'sòng', meaning: 'dyn. Song', meaningEn: 'Song dyn.', audio: 'audio/hsk6/hsk6_宋.wav' },
      { hanzi: '清', pinyin: 'qīng', meaning: 'dyn. Qing', meaningEn: 'Qing dyn.', audio: 'audio/hsk5/hsk5_清.wav' }
    ],
    tip:
      'Pour situer un événement, demande : « 这是哪个朝代 ? » (de quelle dynastie ?). Cette question SONNE érudite. Les Chinois eux-mêmes l\'utilisent constamment pour se repérer dans leur histoire. Adopte-la.',
    tipEn:
      'To place an event, ask: «这是哪个朝代?» (which dynasty?). This question SOUNDS erudite. Chinese themselves use it constantly to orient in their history. Adopt it.'
  },
  {
    id: 'c11-dynasties-figures',
    title: 'Figures emblématiques par dynastie',
    titleEn: 'Emblematic figures by dynasty',
    body:
      'Qin : 秦始皇 (Premier Empereur) — unifie, brûle les livres confucéens, ordonne la Grande Muraille initiale, son armée de terre cuite à Xi\'an. Han : 张骞 (explorateur, ouvre la Route de la Soie). Tang : 李白 et 杜甫 (les 2 plus grands poètes), 武则天 (seule impératrice à régner en son nom). Song : 苏轼 (poète polymathe). Yuan : 忽必烈 (Kublai Khan). Ming : 郑和 (amiral, 7 voyages jusqu\'à l\'Afrique avant les Européens). Qing : 康熙 et 乾隆 (deux grands empereurs ayant régné chacun 60+ ans). Connaître au moins 1 figure par dynastie permet de PARTICIPER à n\'importe quelle discussion historique. Investissement minimal, rendement énorme.',
    bodyEn:
      'Qin: 秦始皇 (First Emperor) — unifies, burns Confucian books, orders the initial Great Wall, his Terracotta Army at Xi\'an. Han: 张骞 (explorer, opens Silk Road). Tang: 李白 and 杜甫 (the 2 greatest poets), 武则天 (only empress to reign in her own name). Song: 苏轼 (polymath poet). Yuan: 忽必烈 (Kublai Khan). Ming: 郑和 (admiral, 7 voyages to Africa before the Europeans). Qing: 康熙 and 乾隆 (two great emperors who each reigned 60+ years). Knowing at least 1 figure per dynasty allows PARTICIPATING in any history discussion. Minimal investment, huge return.',
    items: [
      { hanzi: '秦始皇', pinyin: 'qín shǐ huáng', meaning: 'Premier Empereur', meaningEn: 'First Emperor', audio: 'audio/hsk6/hsk6_秦始皇.wav' },
      { hanzi: '张骞', pinyin: 'zhāng qiān', meaning: 'Zhang Qian', meaningEn: 'Zhang Qian', audio: 'audio/hsk6/hsk6_张骞.wav' },
      { hanzi: '李白', pinyin: 'lǐ bái', meaning: 'Li Bai', meaningEn: 'Li Bai', audio: 'audio/hsk5/hsk5_李白.wav' },
      { hanzi: '武则天', pinyin: 'wǔ zé tiān', meaning: 'Wu Zetian', meaningEn: 'Wu Zetian', audio: 'audio/hsk6/hsk6_武则天.wav' },
      { hanzi: '郑和', pinyin: 'zhèng hé', meaning: 'Zheng He', meaningEn: 'Zheng He', audio: 'audio/hsk6/hsk6_郑和.wav' }
    ],
    tip:
      '« 我最佩服的中国历史人物是 X » (la figure que j\'admire le plus est X) est une phrase bonus qui peut LANCER des discussions passionnées. Choisis 1 figure et prépare 3 phrases sur elle — tu pourras la dégainer dans tout dîner culturel chinois.',
    tipEn:
      '«我最佩服的中国历史人物是 X» (the figure I admire most is X) is a bonus phrase that can SPARK passionate discussions. Pick 1 figure and prep 3 sentences about them — you can deploy this at any Chinese cultural dinner.'
  }
];

export const c11HistoryM2LearnSections: LessonV2LearnSection[] = [
  {
    id: 'c11-xx-dates-cles',
    title: '1911 / 1949 / 1978 — trois dates pivot',
    titleEn: '1911 / 1949 / 1978 — three pivotal dates',
    body:
      '1911 (辛亥革命, Xinhai) — fin du système impérial vieux de 2000 ans, abdication de l\'empereur enfant Puyi. Sun Yat-sen (孙中山) fonde la République (1912). 1949 — après guerre civile contre les nationalistes du Kuomintang (1945-49), Mao Zedong proclame la République populaire le 1er octobre depuis Tian\'anmen. Chiang Kai-shek se replie à Taïwan, où subsiste la République de Chine. 1978 — Deng Xiaoping lance les réformes 改革开放 lors du 3e plenum du 11e Comité central. C\'est la date qui sépare la Chine pauvre, fermée, idéologique de la Chine pragmatique, ouverte, productiviste. Mémoriser ces 3 dates = posséder la clé de lecture de la Chine moderne.',
    bodyEn:
      '1911 (辛亥革命, Xinhai) — end of the 2000-year-old imperial system, abdication of child emperor Puyi. Sun Yat-sen (孙中山) founds the Republic (1912). 1949 — after civil war against the Kuomintang Nationalists (1945-49), Mao Zedong proclaims the People\'s Republic on October 1 from Tian\'anmen. Chiang Kai-shek retreats to Taiwan, where the Republic of China survives. 1978 — Deng Xiaoping launches the 改革开放 reforms at the 3rd plenum of the 11th Central Committee. This is the date that separates poor, closed, ideological China from pragmatic, open, productivist China. Memorizing these 3 dates = owning the key to reading modern China.',
    items: [
      { hanzi: '辛亥革命', pinyin: 'xīn hài gé mìng', meaning: 'Révolution Xinhai', meaningEn: 'Xinhai Revolution', audio: 'audio/hsk6/hsk6_辛亥.wav' },
      { hanzi: '孙中山', pinyin: 'sūn zhōng shān', meaning: 'Sun Yat-sen', meaningEn: 'Sun Yat-sen', audio: 'audio/hsk6/hsk6_孙中山.wav' },
      { hanzi: '中华人民共和国', pinyin: 'zhōng huá rén mín gòng hé guó', meaning: 'République populaire', meaningEn: 'PRC', audio: 'audio/hsk6/hsk6_中华.wav' },
      { hanzi: '邓小平', pinyin: 'dèng xiǎo píng', meaning: 'Deng Xiaoping', meaningEn: 'Deng Xiaoping', audio: 'audio/hsk6/hsk6_邓小平.wav' },
      { hanzi: '改革开放', pinyin: 'gǎi gé kāi fàng', meaning: 'Réforme et Ouverture', meaningEn: 'Reform & Opening', audio: 'audio/hsk6/hsk6_改革开放.wav' }
    ],
    tip:
      'Si tu veux lancer une discussion historique en Chine : « 您觉得 1978 改变了什么 ? » (selon vous, qu\'est-ce que 1978 a changé ?) — TOUS les Chinois ont une opinion, c\'est l\'année qui a redéfini leur vie. Garantie d\'ouvrir une vraie conversation.',
    tipEn:
      'To start a historical discussion in China: «您觉得 1978 改变了什么?» (in your view, what did 1978 change?) — ALL Chinese have an opinion, it\'s the year that redefined their lives. Guarantee of opening a real conversation.'
  },
  {
    id: 'c11-xx-traumas',
    title: 'Évoquer les traumas : 大跃进, 文革',
    titleEn: 'Discussing traumas: 大跃进, 文革',
    body:
      '大跃进 (Grand Bond en avant, 1958-1961) — campagne de Mao pour rattraper l\'Occident en 15 ans : sidérurgie domestique, communes populaires. Résultat : famine massive (15-45M de morts selon les estimations). Sujet douloureux. 文化大革命 / 文革 (Révolution culturelle, 1966-1976) — Mao mobilise les jeunes 红卫兵 (Gardes rouges) contre les « 4 vieilleries » (vieilles idées, vieilles cultures, vieilles habitudes, vieilles coutumes). Persécutions, suicides, intellectuels envoyés à la campagne. UN traumatisme générationnel. Avec un Chinois, utilise les EUPHÉMISMES « 那段特殊的时期 » (cette période particulière) plutôt que les noms directs. Beaucoup de familles ont des cicatrices.',
    bodyEn:
      '大跃进 (Great Leap Forward, 1958-1961) — Mao\'s campaign to catch up with the West in 15 years: backyard steel, people\'s communes. Result: massive famine (15-45M deaths per estimates). Painful topic. 文化大革命 / 文革 (Cultural Revolution, 1966-1976) — Mao mobilizes the youth 红卫兵 (Red Guards) against the «4 olds» (old ideas, old cultures, old habits, old customs). Persecutions, suicides, intellectuals sent to the countryside. A generational trauma. With a Chinese, use EUPHEMISMS «那段特殊的时期» (that particular period) rather than direct names. Many families have scars.',
    items: [
      { hanzi: '大跃进', pinyin: 'dà yuè jìn', meaning: 'Grand Bond en avant', meaningEn: 'Great Leap Forward', audio: 'audio/hsk6/hsk6_大跃进.wav' },
      { hanzi: '文革', pinyin: 'wén gé', meaning: 'Révolution culturelle (abrégé)', meaningEn: 'Cultural Revolution', audio: 'audio/hsk6/hsk6_文革.wav' },
      { hanzi: '红卫兵', pinyin: 'hóng wèi bīng', meaning: 'Gardes rouges', meaningEn: 'Red Guards', audio: 'audio/hsk6/hsk6_红卫兵.wav' },
      { hanzi: '特殊', pinyin: 'tè shū', meaning: 'particulier, spécial', meaningEn: 'special', audio: 'audio/hsk5/hsk5_特殊.wav' },
      { hanzi: '时期', pinyin: 'shí qī', meaning: 'période', meaningEn: 'period', audio: 'audio/hsk5/hsk5_时期.wav' }
    ],
    tip:
      'Si un Chinois aborde 文革 spontanément, écoute SANS interrompre. Pose des questions douces : « 您家里有人经历了吗 ? » (quelqu\'un de votre famille l\'a vécue ?). Le partage est rare et précieux ; brusquer est inacceptable.',
    tipEn:
      'If a Chinese broaches 文革 spontaneously, listen WITHOUT interrupting. Ask gentle questions: «您家里有人经历了吗?» (did anyone in your family live through it?). Sharing is rare and precious; rushing is unacceptable.'
  }
];

export const c11HistoryM3LearnSections: LessonV2LearnSection[] = [
  {
    id: 'c11-mingzhu-quatre',
    title: 'Les 4 grands romans : titres et personnages-clés',
    titleEn: 'The 4 great novels: titles and key characters',
    body:
      '《三国演义》(Sānguó Yǎnyì) — 14e siècle, Luo Guanzhong. Période 220-280, royaumes Wei/Shu/Wu. Figures : 关羽 (Guān Yǔ, dieu de la guerre, divinisé), 诸葛亮 (Zhūgě Liàng, le stratège génial, modèle du conseiller fidèle), 刘备 (Liu Bei, l\'empereur juste). 《水浒传》(Shuǐhǔ Zhuàn) — 108 héros bandits aux marais Liangshan, anti-corruption. Modèle de la résistance populaire. 《西游记》(Xīyóujì) — 16e siècle. Le moine 唐僧 (Tang Seng) accompagné de 孙悟空 (le roi singe), 猪八戒 (cochon), 沙僧 va chercher les sutras en Inde. Le plus joyeux et fantastique des 4. 《红楼梦》(Hónglóumèng) — 18e siècle, Cao Xueqin. Sommet absolu : amours impossibles dans une grande famille Qing en déclin. Étudié dans une discipline à part entière (红学, « rougeologie »).',
    bodyEn:
      '《三国演义》(Romance of the Three Kingdoms) — 14th c., Luo Guanzhong. Period 220-280, Wei/Shu/Wu kingdoms. Figures: 关羽 (war god, deified), 诸葛亮 (genius strategist, model of the faithful counselor), 刘备 (the just emperor). 《水浒传》(Water Margin) — 108 bandit heroes at Liangshan marshes, anti-corruption. Model of popular resistance. 《西游记》(Journey to the West) — 16th c. The monk 唐僧 (Tang Seng) with 孙悟空 (Monkey King), 猪八戒 (Pig), 沙僧 seeks sutras in India. The most joyful and fantastic of the 4. 《红楼梦》(Dream of the Red Chamber) — 18th c., Cao Xueqin. Absolute peak: impossible loves in a declining great Qing family. Studied as its own discipline (红学, «redology»).',
    items: [
      { hanzi: '三国演义', pinyin: 'sān guó yǎn yì', meaning: 'Trois Royaumes', meaningEn: 'Three Kingdoms', audio: 'audio/hsk6/hsk6_三国.wav' },
      { hanzi: '水浒传', pinyin: 'shuǐ hǔ zhuàn', meaning: 'Au bord de l\'eau', meaningEn: 'Water Margin', audio: 'audio/hsk6/hsk6_水浒.wav' },
      { hanzi: '西游记', pinyin: 'xī yóu jì', meaning: 'Pérégrination vers l\'Ouest', meaningEn: 'Journey to West', audio: 'audio/hsk6/hsk6_西游记.wav' },
      { hanzi: '红楼梦', pinyin: 'hóng lóu mèng', meaning: 'Rêve dans le pavillon rouge', meaningEn: 'Dream of Red Chamber', audio: 'audio/hsk6/hsk6_红楼梦.wav' },
      { hanzi: '孙悟空', pinyin: 'sūn wù kōng', meaning: 'Roi Singe', meaningEn: 'Monkey King', audio: 'audio/hsk5/hsk5_孙悟空.wav' }
    ],
    tip:
      '《红楼梦》 a sa propre discipline universitaire : 红学 (« études du Rouge »). Si tu veux faire forte impression : « 我最近开始读红楼梦 » (j\'ai commencé Hongloumeng) ouvre la porte d\'une discussion intellectuelle SÉRIEUSE. À tester avec un universitaire chinois.',
    tipEn:
      '《红楼梦》 has its own academic discipline: 红学 («Red Studies»). To make a strong impression: «我最近开始读红楼梦» (I\'ve started Hongloumeng) opens the door to a SERIOUS intellectual discussion. Test with a Chinese academic.'
  },
  {
    id: 'c11-mingzhu-citations',
    title: 'Citations cultes des 4 名著',
    titleEn: 'Iconic quotes from the 4 名著',
    body:
      '« 桃园三结义 » (Trois Royaumes) — la fraternité de sang entre 刘备, 关羽, 张飞 dans un verger de pêchers. Symbole de l\'AMITIÉ FIDÈLE en Chine. Quand 2 amis chinois sont très proches, on les compare à eux. « 大闹天宫 » (Voyage à l\'Ouest) — le Roi Singe sème le chaos au palais céleste. Symbole du REBELLE INDOMPTABLE. Cité pour décrire un perturbateur génial. « 林黛玉葬花 » (Rêve dans le pavillon rouge) — l\'héroïne enterre des fleurs tombées. Symbole de la BEAUTÉ FRAGILE et MÉLANCOLIQUE. Connaître ces 3 scènes = pouvoir comprendre 80% des allusions culturelles dans les conversations chinoises éduquées, films, séries, chansons.',
    bodyEn:
      '«桃园三结义» (Three Kingdoms) — the blood brotherhood among 刘备, 关羽, 张飞 in a peach orchard. Symbol of FAITHFUL FRIENDSHIP in China. When 2 Chinese friends are very close, they\'re compared to them. «大闹天宫» (Journey to the West) — the Monkey King wreaks havoc in the celestial palace. Symbol of the UNTAMABLE REBEL. Cited to describe a brilliant troublemaker. «林黛玉葬花» (Dream of Red Chamber) — the heroine buries fallen flowers. Symbol of FRAGILE and MELANCHOLY beauty. Knowing these 3 scenes = ability to understand 80% of cultural allusions in educated Chinese conversations, films, series, songs.',
    items: [
      { hanzi: '桃园', pinyin: 'táo yuán', meaning: 'verger de pêchers', meaningEn: 'peach orchard', audio: 'audio/hsk6/hsk6_桃园.wav' },
      { hanzi: '结义', pinyin: 'jié yì', meaning: 'fraternité jurée', meaningEn: 'sworn brotherhood', audio: 'audio/hsk6/hsk6_结义.wav' },
      { hanzi: '大闹', pinyin: 'dà nào', meaning: 'semer le chaos', meaningEn: 'wreak havoc', audio: 'audio/hsk6/hsk6_大闹.wav' },
      { hanzi: '天宫', pinyin: 'tiān gōng', meaning: 'palais céleste', meaningEn: 'celestial palace', audio: 'audio/hsk6/hsk6_天宫.wav' },
      { hanzi: '葬花', pinyin: 'zàng huā', meaning: 'enterrer des fleurs', meaningEn: 'bury flowers', audio: 'audio/hsk6/hsk6_葬花.wav' }
    ],
    tip:
      '« 我们桃园三结义 ! » (entre amis très proches, en blague) = on est jurés ! Effet humoristique garanti si tu sais le placer. Mais ne dis pas ça à des collègues que tu connais à peine — ça sonnerait étrange. Réservé aux amitiés profondes.',
    tipEn:
      '«我们桃园三结义!» (between very close friends, jokingly) = we\'re sworn brothers! Guaranteed humor if you can place it. But don\'t say to barely-known colleagues — it would sound strange. Reserved for deep friendships.'
  }
];

export const c11HistoryM4LearnSections: LessonV2LearnSection[] = [
  {
    id: 'c11-silkroad-anciennes',
    title: 'Anciennes routes : terrestre et maritime',
    titleEn: 'Ancient routes: land and maritime',
    body:
      'Route terrestre : ouverte par 张骞 sous les Han (-138). De 长安 (Chang\'an, terminus est, aujourd\'hui Xi\'an) vers Asie centrale via 敦煌 (oasis aux 莫高窟, grottes bouddhistes ornées de fresques pendant 1000 ans), 喀什 (Kashgar), puis Bactriane et Méditerranée. Marchandises : soie, thé, porcelaine vers l\'ouest ; chevaux, verre, fruits secs vers l\'est. Religions : bouddhisme entre en Chine via cette route. Route maritime : moins connue mais aussi importante. Au 15e siècle, l\'amiral 郑和 (Zheng He) effectue 7 expéditions navales (1405-1433) jusqu\'aux côtes africaines (Mogadiscio, Mombasa) avec une flotte gigantesque de 300 navires — un siècle avant les Européens. Programme abandonné par les Ming, qui se replient.',
    bodyEn:
      'Land route: opened by 张骞 under the Han (138 BCE). From 长安 (Chang\'an, eastern terminus, today Xi\'an) to Central Asia via 敦煌 (oasis with 莫高窟, Buddhist grottoes decorated with frescoes for 1000 years), 喀什 (Kashgar), then Bactria and Mediterranean. Goods: silk, tea, porcelain westward; horses, glass, dried fruits eastward. Religions: Buddhism enters China via this route. Maritime route: less known but equally important. In the 15th c., admiral 郑和 (Zheng He) conducts 7 naval expeditions (1405-1433) to African shores (Mogadishu, Mombasa) with a giant fleet of 300 ships — a century before the Europeans. Program abandoned by the Ming, who pull back.',
    items: [
      { hanzi: '丝绸之路', pinyin: 'sī chóu zhī lù', meaning: 'Route de la Soie', meaningEn: 'Silk Road', audio: 'audio/hsk6/hsk6_丝绸.wav' },
      { hanzi: '长安', pinyin: 'cháng ān', meaning: 'Chang\'an', meaningEn: 'Chang\'an', audio: 'audio/hsk5/hsk5_长安.wav' },
      { hanzi: '敦煌', pinyin: 'dūn huáng', meaning: 'Dunhuang', meaningEn: 'Dunhuang', audio: 'audio/hsk6/hsk6_敦煌.wav' },
      { hanzi: '莫高窟', pinyin: 'mò gāo kū', meaning: 'grottes de Mogao', meaningEn: 'Mogao Caves', audio: 'audio/hsk6/hsk6_莫高.wav' },
      { hanzi: '喀什', pinyin: 'kā shí', meaning: 'Kashgar', meaningEn: 'Kashgar', audio: 'audio/hsk6/hsk6_喀什.wav' }
    ],
    tip:
      'Si tu visites Dunhuang, prépare-toi à PLEURER devant les 莫高窟 — 1000 ans de peintures bouddhistes en superposition. C\'est UN sommet absolu de l\'art mondial, peu connu en Occident. Mentionner cette visite à un Chinois cultivé = lien instantané.',
    tipEn:
      'If you visit Dunhuang, prepare to be MOVED at the 莫高窟 — 1000 years of layered Buddhist paintings. It\'s an ABSOLUTE peak of world art, little known in the West. Mentioning this visit to a cultured Chinese = instant connection.'
  },
  {
    id: 'c11-silkroad-moderne',
    title: '一带一路 — la lecture moderne',
    titleEn: '一带一路 — modern reading',
    body:
      '一带一路 lancé en 2013 à Astana (Xi Jinping). « 一带 » (one belt) = corridor terrestre via Asie centrale + Russie. « 一路 » (one road) = route maritime via océan Indien + Méditerranée. 70+ pays partenaires, financements via Banque Asiatique d\'Investissement (AIIB) et Silk Road Fund. Projets emblématiques : port de 瓜达尔 (Gwadar, Pakistan), corridor Chine-Pakistan (CPEC), train marchandises Yiwu-Madrid. Lecture occidentale : projet de puissance influenceuse + endettement. Lecture chinoise : développement gagnant-gagnant + désenclavement. Comprendre les DEUX lectures et les NUANCER en discussion = signal de maturité géopolitique.',
    bodyEn:
      '一带一路 launched in 2013 in Astana (Xi Jinping). «一带» (one belt) = land corridor via Central Asia + Russia. «一路» (one road) = maritime route via Indian Ocean + Mediterranean. 70+ partner countries, financed via Asian Infrastructure Investment Bank (AIIB) and Silk Road Fund. Flagship projects: 瓜达尔 (Gwadar, Pakistan) port, China-Pakistan Corridor (CPEC), Yiwu-Madrid freight train. Western reading: influence-power project + indebtedness. Chinese reading: win-win development + opening up landlocked regions. Understanding BOTH readings and NUANCING in discussion = signal of geopolitical maturity.',
    items: [
      { hanzi: '一带一路', pinyin: 'yí dài yí lù', meaning: 'Belt and Road', meaningEn: 'Belt and Road', audio: 'audio/hsk6/hsk6_一带.wav' },
      { hanzi: '基础设施', pinyin: 'jī chǔ shè shī', meaning: 'infrastructure', meaningEn: 'infrastructure', audio: 'audio/hsk6/hsk6_基础.wav' },
      { hanzi: '投资', pinyin: 'tóu zī', meaning: 'investissement', meaningEn: 'investment', audio: 'audio/hsk5/hsk5_投资.wav' },
      { hanzi: '合作', pinyin: 'hé zuò', meaning: 'coopération', meaningEn: 'cooperation', audio: 'audio/hsk4/hsk4_合作.wav' },
      { hanzi: '共赢', pinyin: 'gòng yíng', meaning: 'gagnant-gagnant', meaningEn: 'win-win', audio: 'audio/hsk6/hsk6_共赢.wav' }
    ],
    tip:
      '« 共赢 » (win-win) est UN mot-clé du discours BRI chinois. À utiliser quand tu présentes positivement le projet à un Chinois. À l\'inverse, dans une discussion analytique, demande : « 您觉得 BRI 真的是 win-win 吗 ? » — invite la nuance sans attaquer.',
    tipEn:
      '«共赢» (win-win) is a KEY word in Chinese BRI discourse. Use when presenting the project positively to a Chinese. Conversely, in an analytical discussion, ask: «您觉得 BRI 真的是 win-win 吗?» — invite nuance without attacking.'
  }
];

// --- style-formal -----------------------------------------------------------

export const c11StyleFormalM1LearnSections: LessonV2LearnSection[] = [
  {
    id: 'c11-email-ouverture',
    title: 'Ouverture d\'email pro : codes obligatoires',
    titleEn: 'Pro email opening: mandatory codes',
    body:
      'Hierarchy : 你好 (familier) < 您好 (poli) < 尊敬的 X 先生/女士 (formel pro). Pour un supérieur ou un client important, COMMENCE par 尊敬的. Si tu ne connais pas le sexe : 尊敬的 X 总 (avec le titre 总 = directeur). 您好! avec le ! pour la chaleur, sur la 2e ligne. Phrase d\'accroche : 我是 X 公司的 Y (présentation rapide) ou 借此机会向您 X (« je profite de cette occasion pour X » — TRÈS soutenu). Pour reprendre contact : 好久未联系，希望您一切安好 (ne pas se voir longtemps, j\'espère que tout va bien). Évite ABSOLUMENT 你好 dans un 1er email pro vers un inconnu — sonne irrespectueux.',
    bodyEn:
      'Hierarchy: 你好 (casual) < 您好 (polite) < 尊敬的 X 先生/女士 (formal pro). For a superior or important client, START with 尊敬的. If you don\'t know the gender: 尊敬的 X 总 (with title 总 = director). 您好! with ! for warmth, on the 2nd line. Hook phrase: 我是 X 公司的 Y (quick intro) or 借此机会向您 X («I take this opportunity to X» — VERY formal). To re-engage: 好久未联系，希望您一切安好 (haven\'t been in touch long, hope all is well). ABSOLUTELY avoid 你好 in a 1st pro email to a stranger — sounds disrespectful.',
    items: [
      { hanzi: '尊敬', pinyin: 'zūn jìng', meaning: 'respecté', meaningEn: 'esteemed', audio: 'audio/hsk5/hsk5_尊敬.wav' },
      { hanzi: '您', pinyin: 'nín', meaning: 'vous (poli)', meaningEn: 'you (polite)', audio: 'audio/hsk2/hsk2_您.wav' },
      { hanzi: '总', pinyin: 'zǒng', meaning: 'directeur (abrégé)', meaningEn: 'director (abbr.)', audio: 'audio/hsk6/hsk6_总.wav' },
      { hanzi: '安好', pinyin: 'ān hǎo', meaning: 'bien portant', meaningEn: 'well', audio: 'audio/hsk6/hsk6_安好.wav' },
      { hanzi: '联系', pinyin: 'lián xì', meaning: 'contacter', meaningEn: 'contact', audio: 'audio/hsk4/hsk4_联系.wav' }
    ],
    tip:
      '« 借此机会 X » est UNE formule magique d\'ouverture en email pro chinois. Tu peux l\'utiliser même quand l\'occasion n\'est pas vraiment une « occasion » spéciale — c\'est juste un MARQUEUR de respect. Effet : ton mail sonne immédiatement professionnel.',
    tipEn:
      '«借此机会 X» is a magic opening formula in Chinese pro emails. You can use it even when the occasion isn\'t really «special» — it\'s just a RESPECT marker. Effect: your email sounds immediately professional.'
  },
  {
    id: 'c11-email-cloture',
    title: 'Clôture rituelle : 此致 / 敬礼 / 敬上',
    titleEn: 'Ritual closing: 此致 / 敬礼 / 敬上',
    body:
      'Format CLASSIQUE chinois : sur l\'avant-dernière ligne 此致 (cǐzhì = « par la présente »), seule. Sur la dernière ligne 敬礼 (jìnglǐ = « salutation respectueuse »), seule. Cette mise en page (chaque mot sur sa ligne) date des lettres manuscrites — gardée par tradition même en email. Variantes : 顺颂商祺 (« je joins mes vœux d\'affaires prospères », SUPER formel B2B), 即颂时绥 (vœux de paix selon la saison). Signature : 您的 + nom + 敬上 (« respectueusement présenté »). Pour les emails internes moins formels : 谢谢 + nom suffit. Mais pour clients/supérieurs : 此致 + 敬礼 reste de mise. Sans cette clôture, ton mail paraît incomplet/abrupt.',
    bodyEn:
      'CLASSIC Chinese format: on the second-to-last line 此致 (cǐzhì = «hereby»), alone. On the last line 敬礼 (jìnglǐ = «respectful salutation»), alone. This layout (each word on its line) dates from handwritten letters — kept by tradition even in email. Variants: 顺颂商祺 («I join my wishes for prosperous business», SUPER formal B2B), 即颂时绥 (peace wishes per the season). Signature: 您的 + name + 敬上 («respectfully submitted»). For less formal internal emails: 谢谢 + name suffices. But for clients/superiors: 此致 + 敬礼 remains required. Without this closing, your email feels incomplete/abrupt.',
    items: [
      { hanzi: '此致', pinyin: 'cǐ zhì', meaning: 'par la présente', meaningEn: 'hereby', audio: 'audio/hsk6/hsk6_此致.wav' },
      { hanzi: '敬礼', pinyin: 'jìng lǐ', meaning: 'salutation respectueuse', meaningEn: 'respectful salute', audio: 'audio/hsk6/hsk6_敬礼.wav' },
      { hanzi: '敬上', pinyin: 'jìng shàng', meaning: 'respectueusement', meaningEn: 'respectfully yours', audio: 'audio/hsk6/hsk6_敬上.wav' },
      { hanzi: '顺颂商祺', pinyin: 'shùn sòng shāng qí', meaning: 'vœux d\'affaires', meaningEn: 'business prosperity wish', audio: 'audio/hsk6/hsk6_顺颂.wav' },
      { hanzi: '谨', pinyin: 'jǐn', meaning: 'respectueusement', meaningEn: 'respectfully', audio: 'audio/hsk6/hsk6_谨.wav' }
    ],
    tip:
      '« 顺颂商祺 » est la formule de clôture CHIC en B2B chinois. Utilise-la avec un partenaire commercial important — il/elle reconnaîtra ton niveau de pro. Pour un mail interne, en revanche, c\'est trop. Adapte au contexte.',
    tipEn:
      '«顺颂商祺» is the CHIC closing formula in Chinese B2B. Use with an important business partner — they\'ll recognize your pro level. For internal mail, however, it\'s too much. Adapt to context.'
  }
];

export const c11StyleFormalM2LearnSections: LessonV2LearnSection[] = [
  {
    id: 'c11-cv-structure',
    title: 'CV chinois : 6 sections incontournables',
    titleEn: 'Chinese CV: 6 essential sections',
    body:
      'Format A4, 1-2 pages max. (1) 个人信息 : nom, sexe, âge, lieu de naissance, photo (oui, photo OBLIGATOIRE en CV chinois — sérieuse, fond blanc), email, WeChat. (2) 教育背景 : universités en ordre INVERSE (récent en haut), mention 985/211 si applicable (les TOP universités chinoises). (3) 工作经验 : entreprises avec dates, poste, 3-5 puces de réalisations CHIFFRÉES. (4) 技能 : techniques (langues programmation, outils) ET soft skills. (5) 语言能力 : niveau précis (HSK X, IELTS X, etc.). (6) 自我评价 : 3-5 lignes, ton ENGAGÉ et collectif (« 我善于团队合作 »). Distinct du CV occidental où l\'auto-éval est rare.',
    bodyEn:
      'A4 format, 1-2 pages max. (1) 个人信息: name, gender, age, birthplace, photo (yes, photo MANDATORY on Chinese CV — serious, white background), email, WeChat. (2) 教育背景: universities in REVERSE order (recent on top), mention 985/211 if applicable (TOP Chinese universities). (3) 工作经验: companies with dates, position, 3-5 bullets of QUANTIFIED achievements. (4) 技能: technical (programming languages, tools) AND soft skills. (5) 语言能力: precise level (HSK X, IELTS X, etc.). (6) 自我评价: 3-5 lines, ENGAGED and collective tone («我善于团队合作»). Distinct from Western CV where self-eval is rare.',
    items: [
      { hanzi: '简历', pinyin: 'jiǎn lì', meaning: 'CV', meaningEn: 'CV', audio: 'audio/hsk6/hsk6_简历.wav' },
      { hanzi: '个人信息', pinyin: 'gè rén xìn xī', meaning: 'infos personnelles', meaningEn: 'personal info', audio: 'audio/hsk5/hsk5_个人.wav' },
      { hanzi: '教育背景', pinyin: 'jiào yù bèi jǐng', meaning: 'formation', meaningEn: 'education', audio: 'audio/hsk5/hsk5_教育.wav' },
      { hanzi: '工作经验', pinyin: 'gōng zuò jīng yàn', meaning: 'expérience', meaningEn: 'experience', audio: 'audio/hsk4/hsk4_经验.wav' },
      { hanzi: '自我评价', pinyin: 'zì wǒ píng jià', meaning: 'auto-évaluation', meaningEn: 'self-eval', audio: 'audio/hsk6/hsk6_评价.wav' }
    ],
    tip:
      'Le 自我评价 est UN piège : sois CONCRET (« 我在 X 项目中 Y ») plutôt que CLICHÉ (« 我有责任心，团结合作 »). Les recruteurs chinois en lisent des milliers — la spécificité fait la différence. Évite les phrases passe-partout.',
    tipEn:
      '自我评价 is a trap: be CONCRETE («我在 X 项目中 Y») rather than CLICHÉ («我有责任心，团结合作»). Chinese recruiters read thousands — specificity makes the difference. Avoid generic phrases.'
  },
  {
    id: 'c11-cv-coverletter',
    title: 'Lettre de motivation : 求职信 efficace',
    titleEn: 'Cover letter: effective 求职信',
    body:
      'Structure type : (1) Source de l\'annonce (« 我从 X 网站看到贵公司招聘 Y »). (2) Pourquoi tu postules (1 phrase précise sur l\'entreprise — montre que tu as fait tes devoirs). (3) Tes 3 atouts CONCRETS pour le poste, avec exemples chiffrés. (4) Ta disponibilité (« 我可以从 X 月开始入职 »). (5) Clôture : 期待您的回复 + 此致敬礼. La 求职信 chinoise valorise le RESPECT et la HUMILITÉ — évite « je suis le meilleur candidat » direct. Préfère « 我相信我能为贵公司带来 X 的价值 » (je crois pouvoir apporter X à votre entreprise). Plus chic, plus chinois.',
    bodyEn:
      'Standard structure: (1) Source of the ad («我从 X 网站看到贵公司招聘 Y»). (2) Why you apply (1 specific sentence about the company — shows you did your homework). (3) Your 3 CONCRETE strengths for the role, with quantified examples. (4) Your availability («我可以从 X 月开始入职»). (5) Closing: 期待您的回复 + 此致敬礼. The Chinese 求职信 values RESPECT and HUMILITY — avoid direct «I\'m the best candidate». Prefer «我相信我能为贵公司带来 X 的价值» (I believe I can bring X value to your company). Chicer, more Chinese.',
    items: [
      { hanzi: '求职信', pinyin: 'qiú zhí xìn', meaning: 'lettre de motivation', meaningEn: 'cover letter', audio: 'audio/hsk6/hsk6_求职.wav' },
      { hanzi: '招聘', pinyin: 'zhāo pìn', meaning: 'recruter', meaningEn: 'recruit', audio: 'audio/hsk5/hsk5_招聘.wav' },
      { hanzi: '入职', pinyin: 'rù zhí', meaning: 'prendre ses fonctions', meaningEn: 'start work', audio: 'audio/hsk6/hsk6_入职.wav' },
      { hanzi: '期待', pinyin: 'qī dài', meaning: 'attendre avec impatience', meaningEn: 'look forward to', audio: 'audio/hsk5/hsk5_期待.wav' },
      { hanzi: '回复', pinyin: 'huí fù', meaning: 'réponse', meaningEn: 'reply', audio: 'audio/hsk5/hsk5_回复.wav' }
    ],
    tip:
      'Avant d\'envoyer une 求职信, FAIS lire à un Chinois natif. Les nuances de modestie / engagement sont subtiles ; un Français qui traduit littéralement sonne arrogant SANS le savoir. Coût : 0. Bénéfice : énorme.',
    tipEn:
      'Before sending a 求职信, HAVE a native Chinese read it. The modesty/commitment nuances are subtle; a French speaker translating literally sounds arrogant WITHOUT knowing it. Cost: 0. Benefit: huge.'
  }
];

export const c11StyleFormalM3LearnSections: LessonV2LearnSection[] = [
  {
    id: 'c11-discours-banquet',
    title: 'Construire un discours de banquet',
    titleEn: 'Build a banquet speech',
    body:
      'Format type (5-8 min, debout, verre en main) : (1) Saluer hiérarchiquement : 各位领导，各位同仁，各位朋友. (2) Remercier l\'hôte : 感谢 X 先生/女士的盛情款待. 盛情款待 (chaleureuse hospitalité) = expression-clé. (3) Évoquer le moment : 今天我们相聚一堂 (aujourd\'hui nous sommes réunis). (4) Thème central (1-2 min) : succès commun, partenariat, anniversaire, etc. (5) Lever le verre : 让我提议，为 X 干杯 ! (proposons un toast à X). (6) Conclure avec une formule : 祝大家身体健康，事业蒸蒸日上 ! (santé et carrière prospère). 蒸蒸日上 (chengyu, « monter de plus en plus »).',
    bodyEn:
      'Standard format (5-8 min, standing, glass in hand): (1) Greet hierarchically: 各位领导，各位同仁，各位朋友. (2) Thank the host: 感谢 X 先生/女士的盛情款待. 盛情款待 (warm hospitality) = key expression. (3) Evoke the moment: 今天我们相聚一堂 (today we are gathered). (4) Central theme (1-2 min): shared success, partnership, anniversary, etc. (5) Raise the glass: 让我提议，为 X 干杯! (let me propose a toast to X). (6) Close with a formula: 祝大家身体健康，事业蒸蒸日上! (health and a thriving career). 蒸蒸日上 (chengyu, «rising more and more»).',
    items: [
      { hanzi: '盛情', pinyin: 'shèng qíng', meaning: 'chaleureuse intention', meaningEn: 'warm hospitality', audio: 'audio/hsk6/hsk6_盛情.wav' },
      { hanzi: '款待', pinyin: 'kuǎn dài', meaning: 'recevoir, accueillir', meaningEn: 'host, entertain', audio: 'audio/hsk6/hsk6_款待.wav' },
      { hanzi: '相聚', pinyin: 'xiāng jù', meaning: 'se réunir', meaningEn: 'gather', audio: 'audio/hsk6/hsk6_相聚.wav' },
      { hanzi: '提议', pinyin: 'tí yì', meaning: 'proposer', meaningEn: 'propose', audio: 'audio/hsk6/hsk6_提议.wav' },
      { hanzi: '蒸蒸日上', pinyin: 'zhēng zhēng rì shàng', meaning: 'en plein essor', meaningEn: 'thriving', audio: 'audio/hsk6/hsk6_蒸蒸.wav' }
    ],
    tip:
      'Si tu es l\'invité d\'honneur, tu DOIS dire un mot. Pas plus de 8 min, pas moins de 3 min. Préparer 2-3 phrases personnelles (jamais sur ton smartphone à table — apprends-les) montre que tu prends le banquet au sérieux. Effet immédiat sur la considération.',
    tipEn:
      'If you\'re the guest of honor, you MUST say a word. No more than 8 min, no less than 3 min. Preparing 2-3 personal sentences (never reading from your phone at the table — learn them) shows you take the banquet seriously. Immediate effect on consideration.'
  },
  {
    id: 'c11-discours-toast-codes',
    title: 'Les codes du toast : 干杯 vs 随意',
    titleEn: 'Toast codes: 干杯 vs 随意',
    body:
      '干杯 (gānbēi, « assécher la coupe ») = CUL SEC. Engagement total. Si quelqu\'un te dit 干杯 et lève son verre, tu DOIS finir le tien. Sinon = manque de respect (tu peux refuser POLIMENT en disant 我以茶代酒 « je remplace l\'alcool par du thé »). 随意 (suíyì, « à votre guise ») = boire UNE GORGÉE seulement. Plus moderne et plus poli pour les non-buveurs. Note culturelle : quand tu trinques avec un SUPÉRIEUR ou un AÎNÉ, tiens ton verre PLUS BAS que le sien (signe de respect). Approche-toi physiquement pour vraiment toucher les verres — c\'est important, le tintement scelle l\'engagement. Évite de boire ton verre AVANT que la personne saluée n\'ait fini d\'accepter le toast.',
    bodyEn:
      '干杯 (gānbēi, «empty the cup») = BOTTOMS UP. Total commitment. If someone says 干杯 and raises their glass, you MUST finish yours. Otherwise = lack of respect (you can refuse POLITELY saying 我以茶代酒 «I substitute tea for alcohol»). 随意 (suíyì, «at your discretion») = ONE SIP only. More modern and polite for non-drinkers. Cultural note: when toasting a SUPERIOR or ELDER, hold your glass LOWER than theirs (sign of respect). Get physically close to actually touch the glasses — important, the chime seals the commitment. Avoid drinking your glass BEFORE the toasted person has finished accepting.',
    items: [
      { hanzi: '干杯', pinyin: 'gān bēi', meaning: 'cul sec', meaningEn: 'bottoms up', audio: 'audio/hsk2/hsk2_干杯.wav' },
      { hanzi: '随意', pinyin: 'suí yì', meaning: 'à sa guise', meaningEn: 'as you please', audio: 'audio/hsk6/hsk6_随意.wav' },
      { hanzi: '一帆风顺', pinyin: 'yì fān fēng shùn', meaning: 'bon vent', meaningEn: 'smooth sailing', audio: 'audio/hsk6/hsk6_一帆.wav' },
      { hanzi: '万事如意', pinyin: 'wàn shì rú yì', meaning: 'que tout vous soit favorable', meaningEn: 'all wishes come true', audio: 'audio/hsk6/hsk6_万事.wav' },
      { hanzi: '健康', pinyin: 'jiàn kāng', meaning: 'santé', meaningEn: 'health', audio: 'audio/hsk3/hsk3_健康.wav' }
    ],
    tip:
      'Si tu ne bois pas d\'alcool, prépare ta phrase à l\'avance : « 不好意思，我对酒精过敏 (allergique) / 我开车 (je conduis) / 医生建议我不要喝 (mon médecin me l\'a déconseillé). 我以茶代酒，您随意 ». Phrase complète qui SAUVE LA FACE de tout le monde.',
    tipEn:
      'If you don\'t drink alcohol, prepare your phrase in advance: «不好意思，我对酒精过敏 (allergic) / 我开车 (I\'m driving) / 医生建议我不要喝 (doctor advised against). 我以茶代酒，您随意». Complete phrase that SAVES EVERYONE\'S FACE.'
  }
];
