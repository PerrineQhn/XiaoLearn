/**
 * cecr-c2-1-learn-sections.ts — contenu pédagogique manuel C2.1
 * (Conversation lettrée + Nuances philosophiques/littéraires).
 */

import type { LessonV2LearnSection } from '../types/lesson-learn';

// === CONVERSATION C2.1 =======================================================

export const c21ConvM1LearnSections: LessonV2LearnSection[] = [
  {
    id: 'c21-conf-philosophie',
    title: 'Conférence académique de philosophie',
    titleEn: 'Academic philosophy conference',
    body:
      'Ouvrir : 各位学者，今天我想就 X 这一议题展开论述 (chers chercheurs, aujourd\'hui je vais développer le thème X). Règle : vocab philosophique 论述 (lùnshù, exposer), 阐释 (chǎnshì, élucider), 释义 (shìyì, exégèse), 注疏 (zhùshū, commentaire classique). Citation : 朱熹《四书章句集注》中说 X (selon Zhu Xi dans ses Commentaires des Quatre Livres). Remarque : pour cadrer une thèse, 我的论点可概括为以下几点 (mon argument peut se résumer en plusieurs points). RÈGLE D\'OR : conclure par 此乃笔者之拙见，敬请各位斧正 (ceci est l\'humble vue de l\'auteur, merci de vos corrections).',
    bodyEn:
      'Open: 各位学者，今天我想就 X 这一议题展开论述 (esteemed scholars, today I will develop the topic X). Philosophical vocab: 论述 (lùnshù, expound), 阐释 (chǎnshì, elucidate), 释义 (shìyì, exegesis), 注疏 (zhùshū, classical commentary). Citation: 朱熹《四书章句集注》中说 X (per Zhu Xi in his Commentaries on the Four Books). Frame a thesis: 我的论点可概括为以下几点. Close: 此乃笔者之拙见，敬请各位斧正 (this is the author\'s humble view, please give your corrections).',
    items: [
      { hanzi: '论述', pinyin: 'lùn shù', meaning: 'exposer (académique)', meaningEn: 'expound', audio: 'audio/hsk6/hsk6_论述.wav' },
      { hanzi: '阐释', pinyin: 'chǎn shì', meaning: 'élucider', meaningEn: 'elucidate', audio: 'audio/hsk6/hsk6_阐释.wav' },
      { hanzi: '释义', pinyin: 'shì yì', meaning: 'exégèse', meaningEn: 'exegesis', audio: 'audio/hsk6/hsk6_释义.wav' },
      { hanzi: '拙见', pinyin: 'zhuō jiàn', meaning: 'humble vue', meaningEn: 'humble view', audio: 'audio/hsk6/hsk6_拙见.wav' },
      { hanzi: '斧正', pinyin: 'fǔ zhèng', meaning: 'corriger (poliment)', meaningEn: 'kindly correct', audio: 'audio/hsk6/hsk6_斧正.wav' }
    ],
    tip:
      '« 此乃笔者之拙见，敬请各位斧正 » est la formule de clôture la PLUS soutenue en académique chinois. 拙见 (humble vue) + 斧正 (le « ciseau » de correction) = humilité maximale. Effet : crédibilité instantanée auprès d\'un panel de seniors.',
    tipEn:
      '«此乃笔者之拙见，敬请各位斧正» is the MOST formal closing in Chinese academia. 拙见 (humble view) + 斧正 (correction by the «axe») = maximum humility. Effect: instant credibility with a senior panel.'
  },
  {
    id: 'c21-citation-classique',
    title: 'Citer un classique pour étayer un argument',
    titleEn: 'Cite a classic to support an argument',
    body:
      'Citation directe : 《论语》有云：« X » (les Entretiens disent : X). 《道德经》第 X 章曰 : Y (le chap. X du Daode jing dit Y). Règle : verbes de citation 云 (yún, dit — classique), 曰 (yuē, dit — très classique), 据载 (jùzǎi, selon les annales), 古书云 (les anciens textes disent). Remarque : pour interpréter, 此言之意 (le sens de cette parole), 这句话提示我们 X (cette phrase nous suggère X). RÈGLE D\'OR : pour appliquer, 这句古训放在今天依然有现实意义 (cet enseignement antique reste pertinent aujourd\'hui). Astuce : combo soutenu 古训 + 现实意义 = passerelle entre classique et contemporain, valorisée en académique chinois.',
    bodyEn:
      'Direct citation: 《论语》有云：«X» (the Analects say: X). 《道德经》第 X 章曰 : Y (chap. X of the Daode jing says Y). Citation verbs: 云 (yún, says — classical), 曰 (yuē, says — very classical), 据载 (per the annals), 古书云 (ancient texts say). To interpret: 此言之意 (the meaning of this saying), 这句话提示我们 X (this phrase suggests us X). To apply: 这句古训放在今天依然有现实意义 (this ancient teaching remains relevant today). Formal combo: 古训 + 现实意义 = bridge between classical and contemporary, valued in Chinese academia.',
    items: [
      { hanzi: '云', pinyin: 'yún', meaning: 'dit (classique)', meaningEn: 'says (classical)', audio: 'audio/hsk6/hsk6_云.wav' },
      { hanzi: '曰', pinyin: 'yuē', meaning: 'dit (très classique)', meaningEn: 'says (very classical)', audio: 'audio/hsk6/hsk6_曰.wav' },
      { hanzi: '据载', pinyin: 'jù zǎi', meaning: 'selon les annales', meaningEn: 'per the records', audio: 'audio/hsk6/hsk6_据载.wav' },
      { hanzi: '古训', pinyin: 'gǔ xùn', meaning: 'enseignement antique', meaningEn: 'ancient teaching', audio: 'audio/hsk6/hsk6_古训.wav' },
      { hanzi: '现实', pinyin: 'xiàn shí', meaning: 'réalité actuelle', meaningEn: 'current reality', audio: 'audio/hsk5/hsk5_现实.wav' }
    ],
    tip:
      '« 这句古训放在今天依然有现实意义 » est la formule magique pour ANCRER une citation classique dans le présent. Sans cet ancrage, ta citation paraît érudite mais déconnectée. Le pont passé ↔ présent = signal de la maturité intellectuelle chinoise.',
    tipEn:
      '«这句古训放在今天依然有现实意义» is the magic formula to ANCHOR a classical citation in the present. Without it, your citation seems erudite but disconnected. The past ↔ present bridge = sign of Chinese intellectual maturity.'
  }
];

export const c21ConvM2LearnSections: LessonV2LearnSection[] = [
  {
    id: 'c21-debat-litteraire',
    title: 'Débat littéraire avec un critique',
    titleEn: 'Literary debate with a critic',
    body:
      'Cadre : on discute la valeur d\'une œuvre (roman, poésie, film) avec un critique chinois. Vocab : 文学价值 (valeur littéraire), 艺术成就 (accomplissement artistique), 主题深度 (profondeur thématique), 笔触 (bǐchù, touche/style narratif). Règle : pour poser sa position, 我个人认为这部作品的核心价值在于 X (le cœur de cette œuvre est X). Astuce : désaccord élégant 我对您的看法有些不同，我认为 X 反而是 Y (j\'ai un point de vue un peu différent — X est plutôt Y). RÈGLE D\'OR : combo de réfutation soutenue 诚然 X，然而 Y (concession + reprise — formule C1+ qui marque la rhétorique soutenue). Remarque : pour conclure, 文学评论本就见仁见智 (la critique littéraire est par nature subjective — formule consensuelle pour clore poliment).',
    bodyEn:
      'Frame: discussing the value of a work (novel, poetry, film) with a Chinese critic. Vocab: 文学价值 (literary value), 艺术成就 (artistic achievement), 主题深度 (thematic depth), 笔触 (bǐchù, narrative touch/style). Stance: 我个人认为这部作品的核心价值在于 X (the core of this work is X). Elegant disagreement: 我对您的看法有些不同，我认为 X 反而是 Y. Formal refutation combo: 诚然 X，然而 Y (concession + recovery — C1+ formal rhetoric). Close: 文学评论本就见仁见智 (literary criticism is inherently subjective — consensus formula to close politely).',
    items: [
      { hanzi: '文学', pinyin: 'wén xué', meaning: 'littérature', meaningEn: 'literature', audio: 'audio/hsk5/hsk5_文学.wav' },
      { hanzi: '成就', pinyin: 'chéng jiù', meaning: 'accomplissement', meaningEn: 'achievement', audio: 'audio/hsk5/hsk5_成就.wav' },
      { hanzi: '深度', pinyin: 'shēn dù', meaning: 'profondeur', meaningEn: 'depth', audio: 'audio/hsk5/hsk5_深度.wav' },
      { hanzi: '笔触', pinyin: 'bǐ chù', meaning: 'touche, style narratif', meaningEn: 'narrative touch', audio: 'audio/hsk6/hsk6_笔触.wav' },
      { hanzi: '见仁见智', pinyin: 'jiàn rén jiàn zhì', meaning: 'à chacun son avis', meaningEn: 'each to their view', audio: 'audio/hsk6/hsk6_见仁.wav' }
    ],
    tip:
      '« 见仁见智 » est le chengyu CLÔTURE de tout débat critique chinois. Il signale : « ni toi ni moi n\'avons tort, c\'est une question d\'angle ». Permet de TERMINER sans humilier l\'autre. À mémoriser pour clore élégamment toute discussion intellectuelle.',
    tipEn:
      '«见仁见智» is the CLOSING chengyu of any Chinese critical debate. It signals: «neither you nor I are wrong, it\'s a matter of angle». Allows to END without humiliating the other. Memorize to elegantly close any intellectual discussion.'
  },
  {
    id: 'c21-recommander-livre',
    title: 'Recommander une œuvre et la situer',
    titleEn: 'Recommend a work and situate it',
    body:
      'Recommandation : 我向您推荐 X，作者是 Y (je vous recommande X, de l\'auteur Y). Règle : situer dans une école avec 这部作品属于 X 流派 (cette œuvre relève de l\'école X). Remarque : écoles littéraires chinoises clés 朦胧诗派 (méng lóng shī pài, poésie obscure), 寻根派 (xún gēn pài, école de la quête des racines), 先锋派 (xiān fēng pài, avant-garde). Auteurs majeurs C2 : 莫言 (Mo Yan, Nobel 2012), 余华 (Yu Hua, 活着), 阎连科 (Yan Lianke), 王小波 (Wang Xiaobo). Astuce : pour justifier, 这部作品的价值在于 X (la valeur de cette œuvre tient à X) — effet 读后令人深思 (lecture qui pousse à réfléchir). Attention : ajoute toujours une précaution 当然，每个读者的感受可能不同 (bien sûr, chaque lecteur peut ressentir différemment).',
    bodyEn:
      'Recommendation: 我向您推荐 X，作者是 Y (I recommend X by author Y). Situate in a school: 这部作品属于 X 流派 (this work belongs to school X). Chinese literary schools: 朦胧诗派 (obscure poetry), 寻根派 (root-seeking school), 先锋派 (avant-garde). Major C2 authors: 莫言 (Mo Yan, Nobel 2012), 余华 (Yu Hua, 活着), 阎连科 (Yan Lianke), 王小波 (Wang Xiaobo). Justify: 这部作品的价值在于 X (the value of this work lies in X). Effect: 读后令人深思 (reading prompts reflection). Hedge: 当然，每个读者的感受可能不同 (of course, each reader may feel differently).',
    items: [
      { hanzi: '流派', pinyin: 'liú pài', meaning: 'école, courant', meaningEn: 'school, current', audio: 'audio/hsk6/hsk6_流派.wav' },
      { hanzi: '朦胧', pinyin: 'méng lóng', meaning: 'obscur, brumeux', meaningEn: 'obscure, hazy', audio: 'audio/hsk6/hsk6_朦胧.wav' },
      { hanzi: '寻根', pinyin: 'xún gēn', meaning: 'chercher les racines', meaningEn: 'seek roots', audio: 'audio/hsk6/hsk6_寻根.wav' },
      { hanzi: '先锋', pinyin: 'xiān fēng', meaning: 'avant-garde', meaningEn: 'vanguard', audio: 'audio/hsk6/hsk6_先锋.wav' },
      { hanzi: '深思', pinyin: 'shēn sī', meaning: 'réflexion profonde', meaningEn: 'deep thought', audio: 'audio/hsk6/hsk6_深思.wav' }
    ],
    tip:
      'Pour montrer ta culture littéraire C2 : situe l\'œuvre dans son ÉCOLE (流派). Ex : « 余华属于先锋派，但 70 年代后转向了人文写实 ». Cette MISE EN CONTEXTE historique de l\'auteur signale immédiatement le niveau lettré.',
    tipEn:
      'To show C2 literary culture: situate the work in its SCHOOL (流派). Ex: «余华属于先锋派，但 70 年代后转向了人文写实». This historical CONTEXTUALIZATION of the author immediately signals erudite level.'
  }
];

export const c21ConvM3LearnSections: LessonV2LearnSection[] = [
  {
    id: 'c21-traduction-defi',
    title: 'Discuter un défi de traduction zh↔fr',
    titleEn: 'Discuss a translation challenge zh↔fr',
    body:
      'Cadre : on travaille avec un éditeur sur la traduction d\'une œuvre. Vocab : 翻译 (traduction), 译者 (traducteur), 原文 (texte source), 译文 (texte cible), 直译 (zhíyì, traduction littérale) vs 意译 (yìyì, traduction libre). Règle : pour défendre un choix, 我倾向于意译，因为直译会损失 X 的意境 (je penche pour la traduction libre car le littéral perdrait X). Attention : 意境 (yìjìng, atmosphère/ambiance poétique) est UN MOT CLÉ chinois — INTRADUISIBLE strictement. Astuce : pour discuter, 这个词在中文里有 X 层含义，您建议如何处理 ? (ce mot a X couches en chinois, comment le rendre ?). RÈGLE D\'OR : pour conclure, 翻译本就是一种再创作 (la traduction est par nature une RECRÉATION) — formule classique attribuée à Yan Fu (严复).',
    bodyEn:
      'Frame: working with an editor on translating a work. Vocab: 翻译 (translation), 译者 (translator), 原文 (source text), 译文 (target text), 直译 (literal) vs 意译 (free). To defend a choice: 我倾向于意译，因为直译会损失 X 的意境 (I lean toward free translation as the literal would lose X). 意境 (atmosphere/poetic mood) is a KEY Chinese word — strictly UNTRANSLATABLE. To discuss: 这个词在中文里有 X 层含义，您建议如何处理？(this word has X layers in Chinese, how to render?). Close: 翻译本就是一种再创作 (translation is inherently a RE-CREATION) — classic phrase attributed to Yan Fu (严复).',
    items: [
      { hanzi: '译者', pinyin: 'yì zhě', meaning: 'traducteur', meaningEn: 'translator', audio: 'audio/hsk6/hsk6_译者.wav' },
      { hanzi: '直译', pinyin: 'zhí yì', meaning: 'traduction littérale', meaningEn: 'literal translation', audio: 'audio/hsk6/hsk6_直译.wav' },
      { hanzi: '意译', pinyin: 'yì yì', meaning: 'traduction libre', meaningEn: 'free translation', audio: 'audio/hsk6/hsk6_意译.wav' },
      { hanzi: '意境', pinyin: 'yì jìng', meaning: 'ambiance poétique', meaningEn: 'poetic mood', audio: 'audio/hsk6/hsk6_意境.wav' },
      { hanzi: '再创作', pinyin: 'zài chuàng zuò', meaning: 'recréation', meaningEn: 'recreation', audio: 'audio/hsk6/hsk6_再创作.wav' }
    ],
    tip:
      'Yan Fu (严复, 1854-1921) a posé les 3 principes de la traduction : 信达雅 (xìn dá yǎ — fidélité, fluidité, élégance). Toute discussion sérieuse de traduction zh↔fr passe par ces 3 critères. Citer 信达雅 = signal de connaissance théorique IMMÉDIAT.',
    tipEn:
      'Yan Fu (1854-1921) set the 3 translation principles: 信达雅 (xìn dá yǎ — faithfulness, fluency, elegance). Any serious zh↔fr translation discussion runs through these 3 criteria. Citing 信达雅 = INSTANT signal of theoretical knowledge.'
  },
  {
    id: 'c21-poesie-traduire',
    title: 'Traduire un poème classique : méthode',
    titleEn: 'Translate a classical poem: method',
    body:
      'Étapes : (1) lire à voix haute, (2) compter les caractères/vers (5 ou 7), (3) repérer les rimes, (4) identifier les images-clés, (5) restituer. Vocab : 五言 (vers à 5 caractères), 七言 (vers à 7), 平仄 (píng zè, tons plats vs obliques — règle métrique), 对仗 (duìzhàng, parallélisme). Astuce : pour ouvrir la discussion, 这首诗的核心意象是什么 ? (quelle est l\'image centrale ?). Remarque : pour le rendre, 我们可以保留原文的对仗结构，但调整字数 (gardons le parallélisme, ajustons le nombre de mots). RÈGLE D\'OR : 译诗须传神，不必拘泥于字面 (traduire un poème = transmettre l\'esprit, pas s\'attacher à la lettre). Attention : 传神 (chuánshén, transmettre l\'esprit) est un mot-clé.',
    bodyEn:
      'Steps: (1) read aloud, (2) count chars/verses (5 or 7), (3) spot rhymes, (4) identify key images, (5) render. Vocab: 五言 (5-char verse), 七言 (7-char), 平从 (level vs oblique tones — metric rule), 对仗 (parallelism). Discussion: 这首诗的核心意象是什么？(what is the central image?). To render: 我们可以保留原文的对仗结构，但调整字数. Method phrase: 译诗须传神，不必拘泥于字面 (translating a poem = transmitting the spirit, no need to stick to the letter). 传神 (transmit the spirit) is a key word.',
    items: [
      { hanzi: '五言', pinyin: 'wǔ yán', meaning: 'vers à 5 caractères', meaningEn: '5-char verse', audio: 'audio/hsk6/hsk6_五言.wav' },
      { hanzi: '对仗', pinyin: 'duì zhàng', meaning: 'parallélisme', meaningEn: 'parallelism', audio: 'audio/hsk6/hsk6_对仗.wav' },
      { hanzi: '意象', pinyin: 'yì xiàng', meaning: 'image (poétique)', meaningEn: 'poetic image', audio: 'audio/hsk6/hsk6_意象.wav' },
      { hanzi: '传神', pinyin: 'chuán shén', meaning: 'transmettre l\'esprit', meaningEn: 'transmit the spirit', audio: 'audio/hsk6/hsk6_传神.wav' },
      { hanzi: '拘泥', pinyin: 'jū nì', meaning: 's\'attacher (à la lettre)', meaningEn: 'stick rigidly to', audio: 'audio/hsk6/hsk6_拘泥.wav' }
    ],
    tip:
      '« 译诗须传神，不必拘泥于字面 » est l\'adage des traducteurs poétiques chinois. 传神 > 字面 (esprit > lettre). Cite-le pour défendre une traduction CRÉATIVE plutôt que littérale d\'un poème — argument irréfutable.',
    tipEn:
      '«译诗须传神，不必拘泥于字面» is the adage of Chinese poetry translators. 传神 > 字面 (spirit > letter). Cite it to defend a CREATIVE rather than literal poem translation — irrefutable argument.'
  }
];

export const c21ConvM4LearnSections: LessonV2LearnSection[] = [
  {
    id: 'c21-philo-pratique',
    title: 'Appliquer une pensée chinoise à un dilemme',
    titleEn: 'Apply Chinese thought to a dilemma',
    body:
      'Cadre : un Chinois te demande conseil sur un choix éthique. Tu mobilises une pensée classique. Vocab : 道 (dào, voie/principe), 德 (dé, vertu), 仁 (rén, humanité confucéenne), 义 (yì, justice/devoir), 中庸 (zhōngyōng, juste milieu). Règle : phrase de cadrage 在我看来，您面临的是一个 X 的问题 (à mon avis, vous faites face à un problème X). Astuce : citer 孔子曰 X / 老子说 X. Remarque : appliquer avec 这个智慧告诉我们 X (cette sagesse nous dit X), recommander 我建议您从 X 的角度看 (envisagez cela sous l\'angle X). RÈGLE D\'OR : 但最终的选择还是在您自己 (la décision finale vous revient). Attention : le respect de l\'AUTONOMIE est confucéen — le sage CONSEILLE, ne DÉCIDE pas pour autrui.',
    bodyEn:
      'Frame: a Chinese asks for advice on an ethical choice. You mobilize classical thought. Vocab: 道 (way/principle), 德 (virtue), 仁 (Confucian humanity), 义 (justice/duty), 中庸 (golden mean). Phrase: 在我看来，您面临的是一个 X 的问题 (in my view, you face an X problem). Cite: 孔子曰 X / 老子说 X. Apply: 这个智慧告诉我们 X (this wisdom tells us X). Recommendation: 我建议您从 X 的角度看 (consider it from angle X). Important: 但最终的选择还是在您自己 (the final choice is yours). Respect for AUTONOMY is Confucian — the sage ADVISES, does not DECIDE for another.',
    items: [
      { hanzi: '仁', pinyin: 'rén', meaning: 'humanité (Confucius)', meaningEn: 'humaneness', audio: 'audio/hsk6/hsk6_仁.wav' },
      { hanzi: '义', pinyin: 'yì', meaning: 'justice, devoir', meaningEn: 'righteousness', audio: 'audio/hsk6/hsk6_义.wav' },
      { hanzi: '中庸', pinyin: 'zhōng yōng', meaning: 'juste milieu', meaningEn: 'golden mean', audio: 'audio/hsk6/hsk6_中庸.wav' },
      { hanzi: '智慧', pinyin: 'zhì huì', meaning: 'sagesse', meaningEn: 'wisdom', audio: 'audio/hsk5/hsk5_智慧.wav' },
      { hanzi: '面临', pinyin: 'miàn lín', meaning: 'faire face à', meaningEn: 'face', audio: 'audio/hsk5/hsk5_面临.wav' }
    ],
    tip:
      'Le 中庸 (juste milieu) est UN concept central confucéen. À mobiliser quand un Chinois hésite entre 2 extrêmes : « 也许中庸之道才是答案 » (peut-être la voie du juste milieu est la réponse). Phrase culturellement résonante.',
    tipEn:
      '中庸 (golden mean) is a CENTRAL Confucian concept. Mobilize when a Chinese hesitates between 2 extremes: «也许中庸之道才是答案» (perhaps the golden mean is the answer). A culturally resonant phrase.'
  },
  {
    id: 'c21-debat-confucius',
    title: 'Débattre du confucianisme moderne',
    titleEn: 'Debate modern Confucianism',
    body:
      'Cadre : on discute la pertinence du confucianisme aujourd\'hui (dans l\'éducation, le management, la politique chinoise). Règle : position pro 孔子的思想至今仍有现实意义 (la pensée de Confucius garde une pertinence actuelle), notamment 仁 (humanité), 礼 (rites/courtoisie), 学而时习之 (apprendre et pratiquer régulièrement). Exception : position critique 但有些观念已不适合现代社会 (certaines notions ne s\'adaptent plus à la société moderne), comme 三纲五常 (les 3 liens et 5 vertus, hiérarchies anciennes). RÈGLE D\'OR : synthèse 我认为可以批判地继承传统 (je crois qu\'on peut hériter de la tradition de manière critique). Remarque : 批判地继承 (hériter de manière critique) est une formule maoïste devenue passe-partout pour discuter le patrimoine.',
    bodyEn:
      'Frame: discussing Confucianism\'s relevance today (in education, management, Chinese politics). Pro stance: 孔子的思想至今仍有现实意义 (Confucius\'s thought retains current relevance), notably 仁 (humanity), 礼 (rites/courtesy), 学而时习之 (learn and regularly practice). Critical stance: 但有些观念已不适合现代社会 (some notions no longer fit modern society), like 三纲五常 (3 bonds and 5 virtues, old hierarchies). Synthesis: 我认为可以批判地继承传统 (I think we can critically inherit tradition). 批判地继承 (critically inherit) is a Maoist formula that became standard for discussing heritage.',
    items: [
      { hanzi: '孔子', pinyin: 'kǒng zǐ', meaning: 'Confucius', meaningEn: 'Confucius', audio: 'audio/hsk5/hsk5_孔子.wav' },
      { hanzi: '思想', pinyin: 'sī xiǎng', meaning: 'pensée', meaningEn: 'thought', audio: 'audio/hsk5/hsk5_思想.wav' },
      { hanzi: '礼', pinyin: 'lǐ', meaning: 'rites, étiquette', meaningEn: 'rites', audio: 'audio/hsk5/hsk5_礼.wav' },
      { hanzi: '继承', pinyin: 'jì chéng', meaning: 'hériter', meaningEn: 'inherit', audio: 'audio/hsk5/hsk5_继承.wav' },
      { hanzi: '批判', pinyin: 'pī pàn', meaning: 'critique, critiquer', meaningEn: 'critique', audio: 'audio/hsk6/hsk6_批判.wav' }
    ],
    tip:
      '« 批判地继承 » est UNE formule passe-partout du discours intellectuel chinois sur le patrimoine. Elle te permet de NUANCER (« on prend le bon, on rejette le mauvais ») sans être ni totalement pour ni contre. Diplomate et culturellement attendue.',
    tipEn:
      '«批判地继承» is a STANDARD formula in Chinese intellectual discourse on heritage. It lets you NUANCE («take the good, reject the bad») without being totally for or against. Diplomatic and culturally expected.'
  }
];

export const c21ConvM5LearnSections: LessonV2LearnSection[] = [
  {
    id: 'c21-presse-litteraire',
    title: 'Interview pour un journal littéraire',
    titleEn: 'Interview for a literary journal',
    body:
      'Cadre : tu es interviewé en tant qu\'auteur / chercheur. Règle : phrases-clés 这次的写作灵感来自 X (cette écriture est inspirée de X). Remarque : 灵感 (línggǎn, inspiration). Astuce : décrire le processus 我前后修改了 X 次 (j\'ai retravaillé X fois), 我用了 X 年完成这部作品. Pour le sens profond : 我想表达的核心思想是 X (l\'idée centrale que je veux transmettre est X). Quand on te demande des projets : 目前正在构思下一部作品 (je suis en train de concevoir la suivante). Attention : 构思 (gòusī, concevoir, réfléchir au plan) est très soutenu pour parler d\'une œuvre en gestation. RÈGLE D\'OR : conclure modestement par 希望读者能从中获得一些启示 (j\'espère que le lecteur en tirera quelques enseignements).',
    bodyEn:
      'Frame: interviewed as an author/researcher. Key phrases: 这次的写作灵感来自 X (this writing is inspired by X). 灵感 (línggǎn, inspiration). Describe process: 我前后修改了 X 次 (I revised X times). 我用了 X 年完成这部作品. Deep meaning: 我想表达的核心思想是 X (the central idea I want to convey is X). When asked about projects: 目前正在构思下一部作品 (I\'m currently conceiving the next work). 构思 (conceive, plan) is very formal for a work in gestation. Close modestly: 希望读者能从中获得一些启示 (I hope readers will draw some lessons).',
    items: [
      { hanzi: '灵感', pinyin: 'líng gǎn', meaning: 'inspiration', meaningEn: 'inspiration', audio: 'audio/hsk6/hsk6_灵感.wav' },
      { hanzi: '修改', pinyin: 'xiū gǎi', meaning: 'réviser, corriger', meaningEn: 'revise', audio: 'audio/hsk5/hsk5_修改.wav' },
      { hanzi: '表达', pinyin: 'biǎo dá', meaning: 'exprimer', meaningEn: 'express', audio: 'audio/hsk4/hsk4_表达.wav' },
      { hanzi: '构思', pinyin: 'gòu sī', meaning: 'concevoir (œuvre)', meaningEn: 'conceive (work)', audio: 'audio/hsk6/hsk6_构思.wav' },
      { hanzi: '启示', pinyin: 'qǐ shì', meaning: 'enseignement', meaningEn: 'enlightenment', audio: 'audio/hsk6/hsk6_启示.wav' }
    ],
    tip:
      'Modestie obligatoire chinoise pour un auteur : « 希望读者能从中获得一些启示 ». Ne JAMAIS dire « 我相信我的作品很重要 ». L\'auto-promotion explicite est culturellement mal vue ; la modestie effacée renforce paradoxalement le prestige.',
    tipEn:
      'Mandatory Chinese modesty for an author: «希望读者能从中获得一些启示». NEVER say «我相信我的作品很重要». Explicit self-promotion is culturally frowned upon; effaced modesty paradoxically reinforces prestige.'
  },
  {
    id: 'c21-cercle-lecture',
    title: 'Animer un cercle de lecture',
    titleEn: 'Lead a book club',
    body:
      'Ouvrir : 各位书友，大家好 (chers amis lecteurs). Remarque : 书友 (shūyǒu, ami du livre) est très chaleureux. Astuce : lancer la discussion avec 这本书最让您印象深刻的是什么 ? (qu\'est-ce qui vous a le plus marqué ?), inviter chacun 请每位都分享一下 (que chacun partage). Règle : synthétiser 大家提到了几个共同的主题 X (vous avez tous mentionné les thèmes X). Pour relancer : 但也有一个细节我们没有讨论，那就是 X (un détail qu\'on n\'a pas discuté est X). Pour conclure : 谢谢大家的精彩分享，下次我们读 X (merci pour ces partages, la prochaine fois X). Attention : ton convivial mais structuré. RÈGLE D\'OR : le 书友 chinois apprécie qu\'un animateur DESSINE des connexions entre les interventions.',
    bodyEn:
      'Open: 各位书友，大家好 (dear book friends). 书友 (book friend) is very warm. Launch discussion: 这本书最让您印象深刻的是什么？(what struck you most?). Invite all: 请每位都分享一下. Synthesize: 大家提到了几个共同的主题 X. To restart: 但也有一个细节我们没有讨论，那就是 X (a detail we haven\'t discussed is X). Close: 谢谢大家的精彩分享，下次我们读 X. Tone: convivial yet structured. Chinese 书友 appreciate a host who DRAWS connections between interventions.',
    items: [
      { hanzi: '书友', pinyin: 'shū yǒu', meaning: 'ami lecteur', meaningEn: 'book friend', audio: 'audio/hsk5/hsk5_书友.wav' },
      { hanzi: '印象', pinyin: 'yìn xiàng', meaning: 'impression', meaningEn: 'impression', audio: 'audio/hsk4/hsk4_印象.wav' },
      { hanzi: '深刻', pinyin: 'shēn kè', meaning: 'profond (impression)', meaningEn: 'deep (impression)', audio: 'audio/hsk5/hsk5_深刻.wav' },
      { hanzi: '主题', pinyin: 'zhǔ tí', meaning: 'thème', meaningEn: 'theme', audio: 'audio/hsk5/hsk5_主题.wav' },
      { hanzi: '细节', pinyin: 'xì jié', meaning: 'détail', meaningEn: 'detail', audio: 'audio/hsk5/hsk5_细节.wav' }
    ],
    tip:
      'Pour qu\'un cercle de lecture chinois fonctionne, l\'animateur doit DÉSIGNER nommément les participants (« 张老师，您怎么看 ? »). Sans cela, par modestie, plusieurs n\'oseront pas parler. Même règle qu\'en réunion pro chinoise.',
    tipEn:
      'For a Chinese book club to work, the host must CALL participants by name («张老师，您怎么看?»). Without this, out of modesty, several won\'t dare speak. Same rule as in Chinese pro meetings.'
  }
];

export const c21ConvM6LearnSections: LessonV2LearnSection[] = [
  {
    id: 'c21-zaten-rhetorique',
    title: 'Rhétorique : utiliser les figures classiques',
    titleEn: 'Rhetoric: use classical figures',
    body:
      'Figures de style chinoises : 比喻 (bǐyù, métaphore — 像 X 一样), 夸张 (kuāzhāng, hyperbole — 三千丈白发), 对偶 (duì\'ǒu, parallélisme — 风调雨顺), 排比 (páibǐ, anaphore — 我们要 X，要 Y，要 Z), 反问 (fǎnwèn, question rhétorique — 难道不是吗 ?). RÈGLE D\'OR : en oral C2, mobiliser une figure de style soutient l\'argument et marque le LETTRÉ. Astuce : exemple percutant « 教育之于一个民族，犹如水之于鱼 » (l\'éducation pour une nation est comme l\'eau pour le poisson) — 比喻 + 之于…犹如. Remarque : phrase de conclusion oratoire 时不我待 (le temps ne nous attend pas — chengyu). 时不我待，让我们行动起来 = mobilisation puissante.',
    bodyEn:
      'Chinese figures of speech: 比喻 (metaphor — 像 X 一样), 夸张 (hyperbole — 三千丈白发), 对偶 (parallelism — 风调雨顺), 排比 (anaphora — 我们要 X，要 Y，要 Z), 反问 (rhetorical question — 难道不是吗？). In C2 speech, mobilizing a figure supports the argument and marks the LITERATE. Ex: «教育之于一个民族，犹如水之于鱼» (education for a nation is like water for a fish) — 比喻 + 之于…犹如. Oratorical closing: 时不我待 (time waits for no one — chengyu). 时不我待，让我们行动起来 = powerful mobilization.',
    items: [
      { hanzi: '比喻', pinyin: 'bǐ yù', meaning: 'métaphore', meaningEn: 'metaphor', audio: 'audio/hsk6/hsk6_比喻.wav' },
      { hanzi: '夸张', pinyin: 'kuā zhāng', meaning: 'hyperbole', meaningEn: 'hyperbole', audio: 'audio/hsk5/hsk5_夸张.wav' },
      { hanzi: '排比', pinyin: 'pái bǐ', meaning: 'anaphore', meaningEn: 'anaphora', audio: 'audio/hsk6/hsk6_排比.wav' },
      { hanzi: '反问', pinyin: 'fǎn wèn', meaning: 'question rhétorique', meaningEn: 'rhetorical question', audio: 'audio/hsk6/hsk6_反问.wav' },
      { hanzi: '时不我待', pinyin: 'shí bù wǒ dài', meaning: 'le temps n\'attend pas', meaningEn: 'time waits not', audio: 'audio/hsk6/hsk6_时.wav' }
    ],
    tip:
      'Combo C2 percutant : 排比 (anaphore) + 反问 (question rhétorique). Ex : « 我们要勇敢，要坚定，要前行。难道不是吗 ? ». L\'anaphore monte l\'émotion ; la question rhétorique fait participer. Effet immédiat sur l\'auditoire chinois.',
    tipEn:
      'Punchy C2 combo: 排比 (anaphora) + 反问 (rhetorical question). Ex: «我们要勇敢，要坚定，要前行。难道不是吗？». Anaphora raises emotion; rhetorical question engages. Immediate effect on Chinese audience.'
  },
  {
    id: 'c21-eulogie',
    title: 'Discours d\'éloge / éloge funèbre',
    titleEn: 'Eulogy / funeral oration',
    body:
      'Cadre : on rend hommage à un mentor, un parent, un collègue. Vocab : 悼念 (dàoniàn, commémorer/pleurer), 追忆 (zhuīyì, se remémorer), 缅怀 (miǎnhuái, honorer la mémoire — TRÈS soutenu). Règle : ouverture 今天，我们怀着沉痛的心情悼念 X (aujourd\'hui, le cœur lourd, nous commémorons X). Attention : 沉痛 (chéntòng, douleur profonde) est OBLIGATOIRE en éloge funèbre. Astuce : évoquer la vie X 一生致力于 Y (X a consacré sa vie à Y), citer une vertu X 的 Z 精神将激励我们继续前行 (l\'esprit Z de X nous inspirera à continuer). RÈGLE D\'OR : pour conclure, 安息吧，我们永远怀念您 (reposez en paix, nous nous souviendrons toujours de vous). Remarque : 安息 (ānxī, reposer en paix) est l\'expression consacrée.',
    bodyEn:
      'Frame: paying tribute to a mentor, parent, colleague. Vocab: 悼念 (commemorate/mourn), 追忆 (recall), 缅怀 (honor the memory — VERY formal). Opening: 今天，我们怀着沉痛的心情悼念 X (today, with heavy hearts, we commemorate X). 沉痛 (deep pain) is MANDATORY in eulogy. Evoke the life: X 一生致力于 Y (X dedicated their life to Y). Cite a virtue: X 的 Z 精神将激励我们继续前行 (the Z spirit of X will inspire us to continue). Close: 安息吧，我们永远怀念您 (rest in peace, we will always remember you). 安息 (rest in peace) is the sanctioned expression.',
    items: [
      { hanzi: '悼念', pinyin: 'dào niàn', meaning: 'commémorer (deuil)', meaningEn: 'commemorate', audio: 'audio/hsk6/hsk6_悼念.wav' },
      { hanzi: '缅怀', pinyin: 'miǎn huái', meaning: 'honorer la mémoire', meaningEn: 'cherish the memory', audio: 'audio/hsk6/hsk6_缅怀.wav' },
      { hanzi: '沉痛', pinyin: 'chén tòng', meaning: 'douleur profonde', meaningEn: 'deep grief', audio: 'audio/hsk6/hsk6_沉痛.wav' },
      { hanzi: '激励', pinyin: 'jī lì', meaning: 'inspirer', meaningEn: 'inspire', audio: 'audio/hsk6/hsk6_激励.wav' },
      { hanzi: '安息', pinyin: 'ān xī', meaning: 'reposer en paix', meaningEn: 'rest in peace', audio: 'audio/hsk6/hsk6_安息.wav' }
    ],
    tip:
      'Dans un éloge funèbre chinois, la VIE > la MORT. On évoque longuement les contributions du défunt (50% du discours), brièvement le deuil (30%), puis l\'héritage qui inspire (20%). Inverser cette hiérarchie = perçu comme déprimant ou centré sur soi.',
    tipEn:
      'In a Chinese eulogy, LIFE > DEATH. Dwell on the deceased\'s contributions (50% of the speech), briefly on grief (30%), then on the inspiring legacy (20%). Reversing this = perceived as depressing or self-centered.'
  }
];

export const c21ConvM7LearnSections: LessonV2LearnSection[] = [
  {
    id: 'c21-essai-academique',
    title: 'Rédiger un essai académique soutenu',
    titleEn: 'Write a formal academic essay',
    body:
      'Structure : 引言 → 文献综述 → 论点 → 论证 → 反驳潜在异议 → 结论 → 参考文献. Règle : phrases d\'ouverture 自古以来，X 一直是一个重要的话题 (depuis toujours, X est un sujet important), 据笔者所知 (à la connaissance de l\'auteur). Pour la thèse : 本文的核心论点是 X (la thèse centrale est X). Astuce : argumenter 第一，X 表明 Y / 进一步而言，Z. Remarque : anticiper avec 有人或许会反驳说 X，但 Y. Pour conclure : 综上所述，本文得出 X 的结论 / 这一发现对 Y 具有重要意义. RÈGLE D\'OR : ton DENSE, IMPERSONNEL, ARGUMENTATIF. Attention : pas de « 我 » → 笔者 ou « 本研究 ». Exception : évite les chengyu trop fleuris (réservés à la création littéraire) — l\'essai académique privilégie la PRÉCISION.',
    bodyEn:
      'Structure: 引言 → 文献综述 → 论点 → 论证 → 反驳潜在异议 → 结论 → 参考文献. Opening: 自古以来，X 一直是一个重要的话题 (since ancient times, X has been an important topic). 据笔者所知 (to the author\'s knowledge). For the thesis: 本文的核心论点是 X. Argue: 第一，X 表明 Y / 进一步而言，Z. Anticipate: 有人或许会反驳说 X，但 Y. Close: 综上所述，本文得出 X 的结论 / 这一发现对 Y 具有重要意义. Tone: DENSE, IMPERSONAL, ARGUMENTATIVE. No «我» → 笔者 or «本研究». Avoid overly flowery chengyu (reserved for literary creation) — academic essay privileges PRECISION.',
    items: [
      { hanzi: '文献', pinyin: 'wén xiàn', meaning: 'littérature scientif.', meaningEn: 'scholarly literature', audio: 'audio/hsk6/hsk6_文献.wav' },
      { hanzi: '综述', pinyin: 'zōng shù', meaning: 'synthèse, revue', meaningEn: 'review (literature)', audio: 'audio/hsk6/hsk6_综述.wav' },
      { hanzi: '论证', pinyin: 'lùn zhèng', meaning: 'argumentation', meaningEn: 'argumentation', audio: 'audio/hsk6/hsk6_论证.wav' },
      { hanzi: '异议', pinyin: 'yì yì', meaning: 'objection', meaningEn: 'objection', audio: 'audio/hsk6/hsk6_异议.wav' },
      { hanzi: '据笔者所知', pinyin: 'jù bǐ zhě suǒ zhī', meaning: 'à la connaissance de l\'auteur', meaningEn: 'to the author\'s knowledge', audio: 'audio/hsk6/hsk6_笔者.wav' }
    ],
    tip:
      '« 据笔者所知 » est la formule magique d\'HUMILITÉ scientifique chinoise. Elle reconnaît les limites de tes connaissances tout en marquant ton sérieux. Indispensable dans toute thèse / article académique en chinois — son absence te fait passer pour arrogant.',
    tipEn:
      '«据笔者所知» is the magic formula of Chinese scientific HUMILITY. Acknowledges knowledge limits while marking seriousness. Indispensable in any Chinese thesis/article — absence makes you sound arrogant.'
  },
  {
    id: 'c21-revue-pair',
    title: 'Évaluer un article (peer review en chinois)',
    titleEn: 'Peer review an article in Chinese',
    body:
      'Cadre : tu rédiges un avis pour une revue académique chinoise. Vocab : 同行评议 (tóngháng píngyì, peer review), 录用 (lùyòng, accepter), 修改后录用 (accepter sous réserve de révision), 拒稿 (jùgǎo, rejeter). Règle : phrases-types positives 本文选题新颖 (sujet original), 论证严密 (argumentation rigoureuse), 文献丰富 (bibliographie riche). Astuce : critiques constructives 第二部分的论证略显薄弱 (la 2e partie est un peu faible), 建议作者补充 X (l\'auteur devrait compléter X). RÈGLE D\'OR : pour conclure, 总体而言，本文具有较高的学术价值，建议修改后录用 (globalement, valeur académique notable, accepter sous condition). Remarque : ton RIGUEUR + RESPECT pour le travail. Attention : évite SAR-CASME ou jugement personnel.',
    bodyEn:
      'Frame: writing a review for a Chinese academic journal. Vocab: 同行评议 (peer review), 录用 (accept), 修改后录用 (accept with revisions), 拒稿 (reject). Positive set phrases: 本文选题新颖 (original topic), 论证严密 (rigorous argumentation), 文献丰富 (rich bibliography). Constructive criticism: 第二部分的论证略显薄弱 (part 2 is a bit weak), 建议作者补充 X (author should add X). Close: 总体而言，本文具有较高的学术价值，建议修改后录用. Tone: RIGOR + RESPECT for the work. Avoid sarcasm or personal judgment.',
    items: [
      { hanzi: '同行', pinyin: 'tóng háng', meaning: 'pair (métier)', meaningEn: 'peer (profession)', audio: 'audio/hsk6/hsk6_同行.wav' },
      { hanzi: '评议', pinyin: 'píng yì', meaning: 'évaluer (académique)', meaningEn: 'evaluate (academic)', audio: 'audio/hsk6/hsk6_评议.wav' },
      { hanzi: '录用', pinyin: 'lù yòng', meaning: 'accepter', meaningEn: 'accept', audio: 'audio/hsk6/hsk6_录用.wav' },
      { hanzi: '严密', pinyin: 'yán mì', meaning: 'rigoureux', meaningEn: 'rigorous', audio: 'audio/hsk6/hsk6_严密.wav' },
      { hanzi: '薄弱', pinyin: 'bó ruò', meaning: 'faible (argument)', meaningEn: 'weak (argument)', audio: 'audio/hsk6/hsk6_薄弱.wav' }
    ],
    tip:
      'Critique constructive en peer review chinois : utilise toujours « 略显 X » (un peu X) plutôt que « 完全 X » (totalement X). « 略显薄弱 » > « 完全薄弱 ». La modération du verbe permet à l\'auteur de SAUVER LA FACE et de réviser sans hostilité.',
    tipEn:
      'Constructive criticism in Chinese peer review: always use «略显 X» (slightly X) over «完全 X» (totally X). «略显薄弱» > «完全薄弱». Verb moderation lets the author SAVE FACE and revise without hostility.'
  }
];

// === NUANCES C2.1 ============================================================

export const c21NuancesM1LearnSections: LessonV2LearnSection[] = [
  {
    id: 'c21-dao-de-li',
    title: '道 vs 德 vs 礼 — concepts confucéens fondamentaux',
    titleEn: '道 vs 德 vs 礼 — fundamental Confucian concepts',
    body:
      'RÈGLE D\'OR : 道 (dào) = la VOIE / le principe métaphysique. Chez les confucéens : la voie morale juste. Chez Lao Zi : le principe ultime de l\'univers, INNOMMABLE (« 道可道，非常道 » — le dao qu\'on peut nommer n\'est pas le vrai dao). Règle : 德 (dé) = la VERTU intériorisée, la qualité morale active dans la personne. 道德 (morale) = combinaison des deux : le principe + la vertu vécue. Remarque : 礼 (lǐ) = les RITES, l\'étiquette sociale qui matérialise la vertu. 礼仪 (lǐyí, rites et étiquette). Astuce : hierarchy fonctionnelle 道 (principe abstrait) → 德 (vertu intériorisée) → 礼 (rite extérieur). Attention : Confucius dit que sans 德, le 礼 est vide ; sans 礼, le 德 est invisible. Triade indissociable de la pensée chinoise.',
    bodyEn:
      '道 (dào) = the WAY / metaphysical principle. For Confucians: the just moral way. For Lao Zi: the ultimate principle of the universe, UNNAMABLE («道可道，非常道» — the dao that can be named is not the true dao). 德 (dé) = the INTERIORIZED VIRTUE, active moral quality in the person. 道德 (morality) = combination of both: principle + lived virtue. 礼 (lǐ) = RITES, social etiquette that materializes virtue. 礼仪 (rites and etiquette). Functional hierarchy: 道 (abstract principle) → 德 (interiorized virtue) → 礼 (external rite). Confucius: without 德, 礼 is empty; without 礼, 德 is invisible. Inseparable triad of Chinese thought.',
    items: [
      { hanzi: '道', pinyin: 'dào', meaning: 'voie, principe', meaningEn: 'way, principle', audio: 'audio/hsk5/hsk5_道.wav' },
      { hanzi: '德', pinyin: 'dé', meaning: 'vertu', meaningEn: 'virtue', audio: 'audio/hsk6/hsk6_德.wav' },
      { hanzi: '礼', pinyin: 'lǐ', meaning: 'rites, étiquette', meaningEn: 'rites', audio: 'audio/hsk5/hsk5_礼.wav' },
      { hanzi: '道德', pinyin: 'dào dé', meaning: 'morale', meaningEn: 'morality', audio: 'audio/hsk5/hsk5_道德.wav' },
      { hanzi: '礼仪', pinyin: 'lǐ yí', meaning: 'rites et étiquette', meaningEn: 'rites and etiquette', audio: 'audio/hsk6/hsk6_礼仪.wav' }
    ],
    tip:
      'Test de discussion C2 : si un Chinois dit « 这个人没有德 » (cette personne n\'a pas de vertu), il dit qu\'elle est moralement creuse. « 没有礼 » signifie qu\'elle est mal élevée. La distinction permet de NUANCER ton jugement social.',
    tipEn:
      'C2 discussion test: if a Chinese says «这个人没有德» (this person lacks virtue), they mean morally hollow. «没有礼» means ill-mannered. The distinction lets you NUANCE social judgment.'
  },
  {
    id: 'c21-ren-yi',
    title: '仁 vs 义 vs 信 — vertus confucéennes',
    titleEn: '仁 vs 义 vs 信 — Confucian virtues',
    body:
      'RÈGLE D\'OR : 仁 (rén, humanité, bienveillance) = vertu CARDINALE de Confucius. « 仁者爱人 » (l\'humain bienveillant aime les autres). Le 仁 est la base de tout. Règle : 义 (yì, justice/devoir) = ce qu\'on DOIT faire selon le bien moral. 见义勇为 (voir le juste et oser agir). Remarque : souvent au-delà du gain personnel. Astuce : 信 (xìn, foi/fiabilité) = tenir parole. 信用 (crédit moral). Forme avec 仁义礼智信 les 五常 (5 vertus cardinales) qui structurent l\'éthique confucéenne. Attention : hierarchy 仁 (sentiment d\'humanité), 义 (devoir moral), 礼 (rites sociaux), 智 (sagesse pratique), 信 (fidélité à la parole). Tout débat éthique chinois mobilise ces 5 mots — les maîtriser ouvre la pensée.',
    bodyEn:
      '仁 (rén, humanity, benevolence) = CARDINAL Confucian virtue. «仁者爱人» (the benevolent love others). 仁 is the basis of all. 义 (yì, justice/duty) = what one MUST do morally. 见义勇为 (see the just and dare to act). Often beyond personal gain. 信 (xìn, faith/reliability) = keep one\'s word. 信用 (moral credit). Forms with 仁义礼智信 the 五常 (5 cardinal virtues) structuring Confucian ethics. Hierarchy: 仁 (humanity sentiment), 义 (moral duty), 礼 (social rites), 智 (practical wisdom), 信 (fidelity). Any Chinese ethical debate mobilizes these 5 words — mastering them opens up thought.',
    items: [
      { hanzi: '仁', pinyin: 'rén', meaning: 'humanité, bienveillance', meaningEn: 'humaneness', audio: 'audio/hsk6/hsk6_仁.wav' },
      { hanzi: '义', pinyin: 'yì', meaning: 'justice, devoir', meaningEn: 'righteousness', audio: 'audio/hsk6/hsk6_义.wav' },
      { hanzi: '信', pinyin: 'xìn', meaning: 'foi, fiabilité', meaningEn: 'trust, reliability', audio: 'audio/hsk3/hsk3_信.wav' },
      { hanzi: '智', pinyin: 'zhì', meaning: 'sagesse', meaningEn: 'wisdom', audio: 'audio/hsk5/hsk5_智.wav' },
      { hanzi: '五常', pinyin: 'wǔ cháng', meaning: '5 vertus cardinales', meaningEn: '5 cardinal virtues', audio: 'audio/hsk6/hsk6_五常.wav' }
    ],
    tip:
      '« 见义勇为 » (voir le juste et oser agir) est UN chengyu honoré socialement. À mobiliser pour louer une action courageuse altruiste : « 这是见义勇为的精神 ». Très puissant émotionnellement, signal de respect maximal.',
    tipEn:
      '«见义勇为» (see the just and dare to act) is a SOCIALLY honored chengyu. Use to praise a brave altruistic action: «这是见义勇为的精神». Very emotionally powerful, signal of maximum respect.'
  }
];

export const c21NuancesM2LearnSections: LessonV2LearnSection[] = [
  {
    id: 'c21-yin-yang',
    title: '阴 vs 阳 vs 五行 — cosmologie chinoise',
    titleEn: '阴 vs 阳 vs 五行 — Chinese cosmology',
    body:
      'Règle : 阴 (yīn) = principe FÉMININ, sombre, froid, intérieur, terre, lune, eau. 阳 (yáng) = principe MASCULIN, lumineux, chaud, extérieur, ciel, soleil, feu. Attention : pas un dualisme statique — un FLUX (太极图 : symbole du Tao avec 1 point de chaque couleur dans l\'autre). RÈGLE D\'OR : 五行 (wǔxíng, 5 phases) : 木 (bois) → 火 (feu) → 土 (terre) → 金 (métal) → 水 (eau). Remarque : cycles 相生 (engendrement : bois→feu→terre→métal→eau→bois) et 相克 (domination : bois→terre→eau→feu→métal→bois). Astuce : cette cosmologie structure médecine traditionnelle, fengshui, calendrier, et nomenclature classique. Connaître ces termes débloque la lecture de TOUT texte traditionnel chinois.',
    bodyEn:
      '阴 (yīn) = FEMININE principle, dark, cold, inner, earth, moon, water. 阳 (yáng) = MASCULINE principle, bright, hot, outer, sky, sun, fire. Not static dualism — a FLOW (太极图: Tao symbol with 1 dot of each color in the other). 五行 (5 phases): 木 (wood) → 火 (fire) → 土 (earth) → 金 (metal) → 水 (water). Cycles: 相生 (generation: wood→fire→earth→metal→water→wood) and 相克 (domination: wood→earth→water→fire→metal→wood). This cosmology structures traditional medicine, fengshui, calendar, and classical nomenclature. Knowing these terms unlocks ANY traditional Chinese text.',
    items: [
      { hanzi: '阴阳', pinyin: 'yīn yáng', meaning: 'yin et yang', meaningEn: 'yin and yang', audio: 'audio/hsk5/hsk5_阴阳.wav' },
      { hanzi: '五行', pinyin: 'wǔ xíng', meaning: '5 phases', meaningEn: '5 phases', audio: 'audio/hsk6/hsk6_五行.wav' },
      { hanzi: '相生', pinyin: 'xiāng shēng', meaning: 's\'engendrer', meaningEn: 'mutually generate', audio: 'audio/hsk6/hsk6_相生.wav' },
      { hanzi: '相克', pinyin: 'xiāng kè', meaning: 'se dominer', meaningEn: 'mutually overcome', audio: 'audio/hsk6/hsk6_相克.wav' },
      { hanzi: '太极', pinyin: 'tài jí', meaning: 'taiji', meaningEn: 'taiji', audio: 'audio/hsk6/hsk6_太极.wav' }
    ],
    tip:
      '« 阴阳平衡 » (équilibre yin-yang) = formule centrale de la médecine traditionnelle chinoise. À mobiliser pour parler d\'équilibre dans n\'importe quel domaine (alimentation, vie pro/perso, santé). Concept profondément culturel, valorisé socialement.',
    tipEn:
      '«阴阳平衡» (yin-yang balance) = central formula of traditional Chinese medicine. Mobilize to speak of balance in any domain (food, work/life, health). Deeply cultural concept, socially valued.'
  },
  {
    id: 'c21-shi-ci-qu',
    title: '诗 vs 词 vs 曲 — formes poétiques chinoises',
    titleEn: '诗 vs 词 vs 曲 — Chinese poetic forms',
    body:
      'RÈGLE D\'OR : 诗 (shī) = POÉSIE classique régulière (Tang surtout). Vers de 5 ou 7 caractères, rimes strictes, parallélisme rigoureux. Ex : 李白, 杜甫. Règle : 词 (cí) = POÉSIE chantée Song, sur des MÉLODIES préexistantes (词牌 — modèles métriques). Vers de longueurs variables. Plus libre que 诗 mais structuré par la musique. Ex : 苏轼, 李清照. Remarque : 曲 (qǔ) = POÉSIE-théâtre Yuan, mélanges chant + récit. Encore plus libre. Ex : 关汉卿. Astuce : hierarchy 诗 (Tang, vers fixes) → 词 (Song, sur mélodie) → 曲 (Yuan, théâtral). Attention : confondre les 3 = erreur grave en discussion littéraire chinoise. Une phrase comme « 李清照写的词 » est juste ; « 李清照的诗 » est techniquement faux.',
    bodyEn:
      '诗 (shī) = classical regular POETRY (especially Tang). 5- or 7-char verses, strict rhymes, rigorous parallelism. Ex: 李白, 杜甫. 词 (cí) = Song sung POETRY, on preexisting MELODIES (词牌 — metric templates). Variable-length verses. Freer than 诗 but structured by music. Ex: 苏轼, 李清照. 曲 (qǔ) = Yuan POETRY-drama, song + narration mix. Even freer. Ex: 关汉卿. Hierarchy: 诗 (Tang, fixed verses) → 词 (Song, on melody) → 曲 (Yuan, theatrical). Confusing the 3 = serious mistake in Chinese literary discussion. «李清照写的词» is right; «李清照的诗» is technically wrong.',
    items: [
      { hanzi: '诗', pinyin: 'shī', meaning: 'poésie (classique)', meaningEn: 'poetry (classical)', audio: 'audio/hsk5/hsk5_诗.wav' },
      { hanzi: '词', pinyin: 'cí', meaning: 'poème chanté Song', meaningEn: 'Song sung poem', audio: 'audio/hsk5/hsk5_词.wav' },
      { hanzi: '曲', pinyin: 'qǔ', meaning: 'poème théâtral Yuan', meaningEn: 'Yuan theatrical poem', audio: 'audio/hsk5/hsk5_曲.wav' },
      { hanzi: '词牌', pinyin: 'cí pái', meaning: 'modèle métrique 词', meaningEn: 'cí metric template', audio: 'audio/hsk6/hsk6_词牌.wav' },
      { hanzi: '李白', pinyin: 'lǐ bái', meaning: 'Li Bai (poète Tang)', meaningEn: 'Li Bai (Tang poet)', audio: 'audio/hsk5/hsk5_李白.wav' }
    ],
    tip:
      'Astuce mnémotechnique : 诗 (Tang) → 词 (Song) → 曲 (Yuan). Ordre chronologique des dynasties. Si tu retiens cet ordre, tu ne te trompes plus de forme. Et tu peux nommer les grands : Tang→李白杜甫, Song→苏轼李清照, Yuan→关汉卿.',
    tipEn:
      'Mnemonic: 诗 (Tang) → 词 (Song) → 曲 (Yuan). Chronological dynasty order. Remember this order and you never confuse the form. And name the greats: Tang→李白杜甫, Song→苏轼李清照, Yuan→关汉卿.'
  }
];

export const c21NuancesM3LearnSections: LessonV2LearnSection[] = [
  {
    id: 'c21-zhongyong-zhongyi',
    title: '中庸 vs 中立 vs 中间 — milieu (concepts)',
    titleEn: '中庸 vs 中立 vs 中间 — middle (concepts)',
    body:
      'RÈGLE D\'OR : 中庸 (zhōngyōng) = LE JUSTE MILIEU CONFUCÉEN. Attention : pas la moyenne fade, mais la vertu d\'éviter les extrêmes par sagesse. Œuvre : 《中庸》, l\'un des Quatre Livres. Règle : 中立 (zhōnglì) = NEUTRALITÉ politique/diplomatique. 保持中立 (rester neutre). Remarque : connote refus de prendre parti. Astuce : 中间 (zhōngjiān) = MILIEU SPATIAL ou TEMPOREL (au centre, entre 2 choses). 中间人 (intermédiaire). Plus concret. Hierarchy conceptuelle : 中庸 (vertu morale) ≠ 中立 (position politique) ≠ 中间 (position physique/temporelle). Attention : confondre 中庸 et 中立 = erreur philosophique. Le 中庸 IMPLIQUE un jugement actif sur le bien ; le 中立 est une ABSTENTION.',
    bodyEn:
      '中庸 (zhōngyōng) = THE CONFUCIAN GOLDEN MEAN. Not bland average, but the virtue of avoiding extremes through wisdom. Work: 《中庸》, one of the Four Books. 中立 (zhōnglì) = political/diplomatic NEUTRALITY. 保持中立 (stay neutral). Connotes refusal to take sides. 中间 (zhōngjiān) = SPATIAL or TEMPORAL MIDDLE (at center, between 2). 中间人 (intermediary). More concrete. Conceptual hierarchy: 中庸 (moral virtue) ≠ 中立 (political position) ≠ 中间 (physical/temporal position). Confusing 中庸 and 中立 = philosophical error. 中庸 IMPLIES active judgment on the good; 中立 is ABSTENTION.',
    items: [
      { hanzi: '中庸', pinyin: 'zhōng yōng', meaning: 'juste milieu confucéen', meaningEn: 'Confucian golden mean', audio: 'audio/hsk6/hsk6_中庸.wav' },
      { hanzi: '中立', pinyin: 'zhōng lì', meaning: 'neutralité', meaningEn: 'neutrality', audio: 'audio/hsk6/hsk6_中立.wav' },
      { hanzi: '中间', pinyin: 'zhōng jiān', meaning: 'milieu (spatial)', meaningEn: 'middle (spatial)', audio: 'audio/hsk2/hsk2_中间.wav' },
      { hanzi: '保持', pinyin: 'bǎo chí', meaning: 'maintenir', meaningEn: 'maintain', audio: 'audio/hsk4/hsk4_保持.wav' },
      { hanzi: '极端', pinyin: 'jí duān', meaning: 'extrême', meaningEn: 'extreme', audio: 'audio/hsk6/hsk6_极端.wav' }
    ],
    tip:
      '« 中庸之道 » (la voie du juste milieu) est un compliment intellectuel chinois. Dire d\'une décision « 这是中庸之道 » signifie : sage, mesurée, évitant les extrêmes. Plus puissant que « 平衡 » (équilibre) — connote la sagesse confucéenne.',
    tipEn:
      '«中庸之道» (the way of the golden mean) is a Chinese intellectual compliment. Saying of a decision «这是中庸之道» means: wise, measured, avoiding extremes. More powerful than «平衡» (balance) — connotes Confucian wisdom.'
  },
  {
    id: 'c21-yili-tianxia',
    title: '天下 vs 国家 vs 民族 — entité politique chinoise',
    titleEn: '天下 vs 国家 vs 民族 — Chinese political entity',
    body:
      'RÈGLE D\'OR : 天下 (tiānxià) = « TOUT-SOUS-LE-CIEL » — concept impérial chinois englobant l\'ensemble du monde civilisé sous l\'autorité morale du Fils du Ciel. Attention : ne se réduit pas à l\'État moderne. Remarque : 天下兴亡，匹夫有责 (chacun a la responsabilité du sort du monde — 顾炎武, célèbre maxime). Règle : 国家 (guójiā) = ÉTAT-NATION moderne, entité politique-juridique. Concept westphalien adopté à la fin du XIXe. Astuce : 民族 (mínzú) = NATION ETHNIQUE/peuple. La Chine moderne se définit comme un 多民族国家 (État multi-ethnique avec 56 ethnies reconnues). La distinction 天下 / 国家 / 民族 structure tout débat sur l\'identité chinoise. 天下 = vision impériale ; 国家 = vision moderne ; 民族 = identité culturelle.',
    bodyEn:
      '天下 (tiānxià) = «ALL-UNDER-HEAVEN» — Chinese imperial concept covering the civilized world under the moral authority of the Son of Heaven. Not reducible to the modern State. 天下兴亡，匹夫有责 (each has responsibility for the world\'s fate — 顾炎武, famous maxim). 国家 (guójiā) = modern NATION-STATE, political-legal entity. Westphalian concept adopted late 19th c. 民族 (mínzú) = ETHNIC NATION/people. Modern China defines itself as a 多民族国家 (multi-ethnic state with 56 recognized ethnicities). The distinction structures all debate on Chinese identity. 天下 = imperial vision; 国家 = modern vision; 民族 = cultural identity.',
    items: [
      { hanzi: '天下', pinyin: 'tiān xià', meaning: 'tout-sous-le-ciel', meaningEn: 'all-under-heaven', audio: 'audio/hsk6/hsk6_天下.wav' },
      { hanzi: '国家', pinyin: 'guó jiā', meaning: 'État-nation', meaningEn: 'nation-state', audio: 'audio/hsk2/hsk2_国家.wav' },
      { hanzi: '民族', pinyin: 'mín zú', meaning: 'nation ethnique', meaningEn: 'ethnic nation', audio: 'audio/hsk5/hsk5_民族.wav' },
      { hanzi: '匹夫', pinyin: 'pǐ fū', meaning: 'le commun (homme)', meaningEn: 'common man', audio: 'audio/hsk6/hsk6_匹夫.wav' },
      { hanzi: '兴亡', pinyin: 'xīng wáng', meaning: 'essor et chute', meaningEn: 'rise and fall', audio: 'audio/hsk6/hsk6_兴亡.wav' }
    ],
    tip:
      'La maxime « 天下兴亡，匹夫有责 » est UNE des phrases les plus citées en discours patriotique chinois. La connaître + la citer correctement = signal IMMÉDIAT de respect culturel et de connaissance lettrée. Auteur : 顾炎武 (Gu Yanwu, dynastie Qing).',
    tipEn:
      'The maxim «天下兴亡，匹夫有责» is one of the most-cited phrases in Chinese patriotic discourse. Knowing + citing it correctly = IMMEDIATE signal of cultural respect and literate knowledge. Author: 顾炎武 (Gu Yanwu, Qing dynasty).'
  }
];

export const c21NuancesM4LearnSections: LessonV2LearnSection[] = [
  {
    id: 'c21-yan-er-yu',
    title: '言 vs 而 vs 于 — particules grammaticales classiques',
    titleEn: '言 vs 而 vs 于 — classical grammatical particles',
    body:
      'Règle : 言 (yán) = parler / la parole. Verbe et nom en chinois classique. Remarque : reste vivant 言论 (discours), 言行 (paroles et actes), 名言 (citation célèbre). « 言之有理 » (avoir raison dans ses paroles). RÈGLE D\'OR : 而 (ér) = ET / ALORS / MAIS — connecteur classique TRÈS productif. Astuce : « 学而时习之 » (apprendre et le pratiquer régulièrement — première phrase des Entretiens). « 不亦乐乎 » (n\'est-ce pas joyeux ?). Reste dans 而且, 然而, 进而. Attention : 于 (yú) = à / dans / par rapport à — préposition classique. « 出于 X » (provenir de X), « 关于 X » (concernant X), « 至于 X » (quant à X), « 由于 X » (à cause de X). Maîtriser ces 3 particules débloque la lecture des Entretiens, du Mencius, et de tout texte classique.',
    bodyEn:
      '言 (yán) = speak / speech. Verb and noun in classical Chinese. Stays alive: 言论 (discourse), 言行 (words and deeds), 名言 (famous quote). «言之有理» (to have reason in one\'s words). 而 (ér) = AND / THEN / BUT — VERY productive classical connector. «学而时习之» (learn and practice regularly — first sentence of the Analects). «不亦乐乎» (isn\'t it joyful?). Lives in 而且, 然而, 进而. 于 (yú) = at / in / regarding — classical preposition. «出于 X» (originating from X), «关于 X» (concerning X), «至于 X» (as for X), «由于 X» (due to X). Mastering these 3 particles unlocks reading the Analects, Mencius, and any classical text.',
    items: [
      { hanzi: '言', pinyin: 'yán', meaning: 'parler, parole', meaningEn: 'speak, speech', audio: 'audio/hsk5/hsk5_言.wav' },
      { hanzi: '而', pinyin: 'ér', meaning: 'et, alors (classique)', meaningEn: 'and, then (classical)', audio: 'audio/hsk5/hsk5_而.wav' },
      { hanzi: '于', pinyin: 'yú', meaning: 'à, dans (classique)', meaningEn: 'at, in (classical)', audio: 'audio/hsk5/hsk5_于.wav' },
      { hanzi: '言论', pinyin: 'yán lùn', meaning: 'discours, propos', meaningEn: 'discourse', audio: 'audio/hsk6/hsk6_言论.wav' },
      { hanzi: '名言', pinyin: 'míng yán', meaning: 'citation célèbre', meaningEn: 'famous saying', audio: 'audio/hsk5/hsk5_名言.wav' }
    ],
    tip:
      '« 学而时习之，不亦说乎 » (apprendre et pratiquer régulièrement, n\'est-ce pas un plaisir ?) — première phrase des 《论语》. Si tu peux la citer en chinois en discussion, tu signales IMMÉDIATEMENT ton niveau lettré. À mémoriser absolument.',
    tipEn:
      '«学而时习之，不亦说乎» (learning and practicing regularly, isn\'t it a joy?) — first sentence of 《论语》. If you can cite it in Chinese in discussion, you IMMEDIATELY signal literate level. Memorize absolutely.'
  },
  {
    id: 'c21-shi-fei',
    title: '是非 vs 善恶 vs 对错 — bien et mal (3 axes)',
    titleEn: '是非 vs 善恶 vs 对错 — right and wrong (3 axes)',
    body:
      'Règle : 是非 (shìfēi) = LE VRAI ET LE FAUX (axe ÉPISTÉMIQUE — ce qui est VRAI factuellement). 明辨是非 (distinguer clairement le vrai du faux). Remarque : connote la rigueur intellectuelle. RÈGLE D\'OR : 善恶 (shàn\'è) = LE BIEN ET LE MAL (axe MORAL — qualités intérieures). 善有善报，恶有恶报 (le bien attire le bien, le mal attire le mal — karma). Astuce : connote l\'éthique profonde. 对错 (duì cuò) = JUSTE ET ERRONÉ (axe PRAGMATIQUE — ce qui est correct dans une action). 对错很重要 (ce qui est juste compte). Plus quotidien et concret. Hierarchy : 对错 (concret action) < 是非 (épistémique fait) < 善恶 (moral profond). Attention : erreur classique de confondre 是非 (vérité) et 善恶 (moralité) — un fait peut être 是 mais 恶.',
    bodyEn:
      '是非 (shìfēi) = TRUE AND FALSE (EPISTEMIC axis — what is factually TRUE). 明辨是非 (clearly distinguish true from false). Connotes intellectual rigor. 善恶 (shàn\'è) = GOOD AND EVIL (MORAL axis — inner qualities). 善有善报，恶有恶报 (good attracts good, evil attracts evil — karma). Connotes deep ethics. 对错 (duì cuò) = RIGHT AND WRONG (PRAGMATIC axis — what\'s correct in action). 对错很重要 (right vs wrong matters). More everyday and concrete. Hierarchy: 对错 (concrete action) < 是非 (epistemic fact) < 善恶 (deep moral). Classic mistake: confusing 是非 (truth) and 善恶 (morality) — a fact may be 是 but 恶.',
    items: [
      { hanzi: '是非', pinyin: 'shì fēi', meaning: 'le vrai et le faux', meaningEn: 'right and wrong (true)', audio: 'audio/hsk6/hsk6_是非.wav' },
      { hanzi: '善恶', pinyin: 'shàn è', meaning: 'le bien et le mal', meaningEn: 'good and evil', audio: 'audio/hsk6/hsk6_善恶.wav' },
      { hanzi: '对错', pinyin: 'duì cuò', meaning: 'juste et erroné', meaningEn: 'right and wrong (correct)', audio: 'audio/hsk5/hsk5_对错.wav' },
      { hanzi: '明辨', pinyin: 'míng biàn', meaning: 'distinguer clairement', meaningEn: 'clearly distinguish', audio: 'audio/hsk6/hsk6_明辨.wav' },
      { hanzi: '报', pinyin: 'bào', meaning: 'rétribuer, retour', meaningEn: 'recompense, return', audio: 'audio/hsk4/hsk4_报.wav' }
    ],
    tip:
      'Le proverbe « 善有善报，恶有恶报，不是不报，时候未到 » (le bien attire le bien, le mal attire le mal — pas de non-rétribution, juste pas le bon moment) est une croyance karmique chinoise très ancrée. À utiliser pour CONSOLER (« la justice viendra »).',
    tipEn:
      'The proverb «善有善报，恶有恶报，不是不报，时候未到» (good attracts good, evil attracts evil — not no return, just not the right time) is a deeply rooted Chinese karmic belief. Use to CONSOLE («justice will come»).'
  }
];

export const c21NuancesM5LearnSections: LessonV2LearnSection[] = [
  {
    id: 'c21-shen-xin-ling',
    title: '身 vs 心 vs 灵 vs 神 — corps, cœur, âme, esprit',
    titleEn: '身 vs 心 vs 灵 vs 神 — body, heart, soul, spirit',
    body:
      'Règle : 身 (shēn) = CORPS PHYSIQUE. 身体 (corps), 身材 (silhouette). Le matériel. RÈGLE D\'OR : 心 (xīn) = CŒUR/ESPRIT-CŒUR. En chinois, le 心 EST le siège de la pensée ET du sentiment (pas séparés comme en Occident). Remarque : 心情 (humeur), 心思 (pensée), 关心 (se soucier de). Astuce : 灵 (líng) = ÂME, esprit subtil. 灵魂 (âme), 心灵 (esprit-cœur, au sens spirituel). Plus rare et soutenu. 神 (shén) = ESPRIT divin / éclat / aspect divin de l\'humain. 精神 (esprit, vivacité), 神采 (éclat), 神圣 (sacré). Hierarchy : 身 (corps physique) < 心 (cœur-esprit pensant) < 灵 (âme spirituelle) < 神 (divin). Attention : en chinois, l\'absence de séparation cœur/raison est centrale — tout débat avec une personne instruite passe par la compréhension de 心.',
    bodyEn:
      '身 (shēn) = PHYSICAL BODY. 身体 (body), 身材 (figure). The material. 心 (xīn) = HEART/HEART-MIND. In Chinese, 心 IS the seat of thought AND feeling (not separated as in the West). 心情 (mood), 心思 (thought), 关心 (care about). 灵 (líng) = SOUL, subtle spirit. 灵魂 (soul), 心灵 (heart-spirit, in the spiritual sense). Rarer and more formal. 神 (shén) = DIVINE SPIRIT / radiance / divine aspect of human. 精神 (spirit, vivacity), 神采 (radiance), 神圣 (sacred). Hierarchy: 身 (physical body) < 心 (thinking heart-mind) < 灵 (spiritual soul) < 神 (divine). In Chinese, the absence of heart/reason separation is central — any debate with an educated person runs through understanding 心.',
    items: [
      { hanzi: '身', pinyin: 'shēn', meaning: 'corps', meaningEn: 'body', audio: 'audio/hsk2/hsk2_身.wav' },
      { hanzi: '心', pinyin: 'xīn', meaning: 'cœur, esprit-cœur', meaningEn: 'heart-mind', audio: 'audio/hsk1/hsk1_心.wav' },
      { hanzi: '灵', pinyin: 'líng', meaning: 'âme, esprit subtil', meaningEn: 'soul', audio: 'audio/hsk6/hsk6_灵.wav' },
      { hanzi: '神', pinyin: 'shén', meaning: 'esprit divin', meaningEn: 'divine spirit', audio: 'audio/hsk5/hsk5_神.wav' },
      { hanzi: '心灵', pinyin: 'xīn líng', meaning: 'esprit-cœur', meaningEn: 'heart-spirit', audio: 'audio/hsk6/hsk6_心灵.wav' }
    ],
    tip:
      '« 身心灵 » (corps-cœur-âme) est une trilogie devenue à la mode dans le bien-être chinois moderne (yoga, méditation, développement personnel). Cite-le pour parler holistique : « 我们要追求身心灵的平衡 » (chercher l\'équilibre corps-cœur-âme). Très tendance.',
    tipEn:
      '«身心灵» (body-heart-soul) is a trilogy that\'s become trendy in modern Chinese wellness (yoga, meditation, personal development). Cite for holistic talk: «我们要追求身心灵的平衡» (seek body-heart-soul balance). Very on-trend.'
  },
  {
    id: 'c21-tian-di-ren',
    title: '天 vs 地 vs 人 — la trinité cosmique chinoise',
    titleEn: '天 vs 地 vs 人 — the Chinese cosmic trinity',
    body:
      'RÈGLE D\'OR : 天 (tiān) = CIEL — le principe céleste, source du mandat moral (天命). « 天命所归 » (le mandat céleste est attribué à X). Remarque : connote la PROVIDENCE ou le destin. Règle : 地 (dì) = TERRE — le principe matériel, qui nourrit. « 大地 » (la grande terre, la nature). Connote la STABILITÉ, le SUPPORT. Astuce : 人 (rén) = HUMAIN — le principe médian entre Ciel et Terre. La pensée chinoise place l\'humain comme MÉDIATEUR cosmologique. « 三才 » (les 3 puissances : 天地人) est un concept fondamental. Attention : l\'humain idéal HARMONISE le Ciel et la Terre. « 天时地利人和 » (chengyu : le moment du ciel, l\'avantage de la terre, l\'harmonie humaine — 3 conditions du succès). À mobiliser pour analyser une réussite.',
    bodyEn:
      '天 (tiān) = HEAVEN — the celestial principle, source of moral mandate (天命). «天命所归» (the heavenly mandate goes to X). Connotes PROVIDENCE or destiny. 地 (dì) = EARTH — material principle, that nourishes. «大地» (the great earth, nature). Connotes STABILITY, SUPPORT. 人 (rén) = HUMAN — middle principle between Heaven and Earth. Chinese thought places the human as cosmological MEDIATOR. «三才» (the 3 powers: 天地人) is a fundamental concept. The ideal human HARMONIZES Heaven and Earth. «天时地利人和» (chengyu: the moment of heaven, the advantage of earth, human harmony — 3 conditions of success). Mobilize to analyze a success.',
    items: [
      { hanzi: '天', pinyin: 'tiān', meaning: 'ciel', meaningEn: 'heaven, sky', audio: 'audio/hsk1/hsk1_天.wav' },
      { hanzi: '地', pinyin: 'dì', meaning: 'terre', meaningEn: 'earth', audio: 'audio/hsk2/hsk2_地.wav' },
      { hanzi: '人', pinyin: 'rén', meaning: 'humain', meaningEn: 'human', audio: 'audio/hsk1/hsk1_人.wav' },
      { hanzi: '三才', pinyin: 'sān cái', meaning: 'les 3 puissances', meaningEn: 'the 3 powers', audio: 'audio/hsk6/hsk6_三才.wav' },
      { hanzi: '天命', pinyin: 'tiān mìng', meaning: 'mandat céleste', meaningEn: 'heavenly mandate', audio: 'audio/hsk6/hsk6_天命.wav' }
    ],
    tip:
      '« 天时地利人和 » est UN des chengyu les plus utilisés en analyse stratégique chinoise (business, politique, sport). Pour louer un succès : « 这是天时地利人和的结果 » (résultat de la convergence du moment, du lieu et de l\'harmonie humaine).',
    tipEn:
      '«天时地利人和» is one of the most-used chengyu in Chinese strategic analysis (business, politics, sports). To praise a success: «这是天时地利人和的结果» (result of the convergence of moment, place, and human harmony).'
  }
];

export const c21NuancesM6LearnSections: LessonV2LearnSection[] = [
  {
    id: 'c21-yixiang-yijing',
    title: '意境 vs 氛围 vs 风格 — atmosphère / style',
    titleEn: '意境 vs 氛围 vs 风格 — atmosphere / style',
    body:
      'RÈGLE D\'OR : 意境 (yìjìng) = ATMOSPHÈRE POÉTIQUE / ambiance d\'une œuvre artistique chinoise. Attention : INTRADUISIBLE strictement — fusion de l\'image (意) et du décor (境) qui crée une émotion profonde. Concept central de l\'esthétique chinoise. Règle : 氛围 (fēnwéi) = AMBIANCE générale (lieu, événement, conversation). 节日的氛围 (l\'ambiance d\'une fête). Remarque : plus universel et social. Astuce : 风格 (fēnggé) = STYLE (artistique, personnel, vestimentaire). 这位画家的风格 (le style de ce peintre). Plus formel sur l\'identité créative. Hierarchy : 氛围 (ambiance générale) < 风格 (identité artistique) < 意境 (concept esthétique chinois ineffable). Pour louer une œuvre chinoise : 这首诗很有意境 (ce poème a beaucoup d\'意境) = compliment maximal.',
    bodyEn:
      '意境 (yìjìng) = POETIC ATMOSPHERE / mood of a Chinese artistic work. Strictly UNTRANSLATABLE — fusion of image (意) and setting (境) that creates deep emotion. Central concept of Chinese aesthetics. 氛围 (fēnwéi) = general AMBIENCE (place, event, conversation). 节日的氛围 (a festival\'s atmosphere). More universal and social. 风格 (fēnggé) = STYLE (artistic, personal, sartorial). 这位画家的风格 (this painter\'s style). More formal on creative identity. Hierarchy: 氛围 (general ambience) < 风格 (artistic identity) < 意境 (ineffable Chinese aesthetic concept). To praise a Chinese work: 这首诗很有意境 = maximum compliment.',
    items: [
      { hanzi: '意境', pinyin: 'yì jìng', meaning: 'atmosphère poétique', meaningEn: 'poetic atmosphere', audio: 'audio/hsk6/hsk6_意境.wav' },
      { hanzi: '氛围', pinyin: 'fēn wéi', meaning: 'ambiance générale', meaningEn: 'general ambience', audio: 'audio/hsk6/hsk6_氛围.wav' },
      { hanzi: '风格', pinyin: 'fēng gé', meaning: 'style', meaningEn: 'style', audio: 'audio/hsk5/hsk5_风格.wav' },
      { hanzi: '画家', pinyin: 'huà jiā', meaning: 'peintre', meaningEn: 'painter', audio: 'audio/hsk5/hsk5_画家.wav' },
      { hanzi: '节日', pinyin: 'jié rì', meaning: 'fête', meaningEn: 'festival', audio: 'audio/hsk3/hsk3_节日.wav' }
    ],
    tip:
      'Compliment ULTIME pour une œuvre chinoise (poème, calligraphie, paysage, jardin) : « 这很有意境 ». Plus puissant que « 很美 » (beau) ou « 很好 ». Le mot 意境 signale que tu APPRÉCIES la profondeur esthétique chinoise — flatterie maximale d\'un artiste local.',
    tipEn:
      'ULTIMATE compliment for a Chinese work (poem, calligraphy, landscape, garden): «这很有意境». More powerful than «很美» (beautiful) or «很好». The word 意境 signals you APPRECIATE Chinese aesthetic depth — maximum flattery for a local artist.'
  },
  {
    id: 'c21-pinge-renge',
    title: '人格 vs 品格 vs 性格 — caractère humain (3 dimensions)',
    titleEn: '人格 vs 品格 vs 性格 — human character (3 dimensions)',
    body:
      'Règle : 人格 (réngé) = PERSONNALITÉ AU SENS PSYCHO-JURIDIQUE (la personne en tant que sujet moral). 人格尊严 (dignité de la personne), 人格分裂 (dédoublement de personnalité). Remarque : plus formel/scientifique. RÈGLE D\'OR : 品格 (pǐngé) = CARACTÈRE MORAL (qualités vertueuses). 品格高尚 (caractère noble), 培养品格 (former le caractère). Connote la VERTU. Astuce : 性格 (xìnggé) = TEMPÉRAMENT, traits psychologiques (introverti, extraverti, calme). 性格内向 (tempérament introverti). Plus quotidien. Hierarchy : 性格 (tempérament psycho) < 人格 (personnalité juridique/morale) < 品格 (caractère vertueux). Attention : erreur classique 性格高尚 ✗ → 品格高尚 ✓ (le tempérament est neutre, la VERTU est noble).',
    bodyEn:
      '人格 (réngé) = PERSONALITY IN PSYCHO-LEGAL SENSE (person as moral subject). 人格尊严 (personal dignity), 人格分裂 (split personality). More formal/scientific. 品格 (pǐngé) = MORAL CHARACTER (virtuous qualities). 品格高尚 (noble character), 培养品格 (form character). Connotes VIRTUE. 性格 (xìnggé) = TEMPERAMENT, psychological traits (introverted, extroverted, calm). 性格内向 (introverted temperament). More everyday. Hierarchy: 性格 (psycho temperament) < 人格 (legal/moral personality) < 品格 (virtuous character). Classic mistake: 性格高尚 ✗ → 品格高尚 ✓ (temperament is neutral, VIRTUE is noble).',
    items: [
      { hanzi: '人格', pinyin: 'rén gé', meaning: 'personnalité (juridique)', meaningEn: 'personhood', audio: 'audio/hsk6/hsk6_人格.wav' },
      { hanzi: '品格', pinyin: 'pǐn gé', meaning: 'caractère moral', meaningEn: 'moral character', audio: 'audio/hsk6/hsk6_品格.wav' },
      { hanzi: '性格', pinyin: 'xìng gé', meaning: 'tempérament', meaningEn: 'temperament', audio: 'audio/hsk4/hsk4_性格.wav' },
      { hanzi: '高尚', pinyin: 'gāo shàng', meaning: 'noble (moral)', meaningEn: 'noble (moral)', audio: 'audio/hsk6/hsk6_高尚.wav' },
      { hanzi: '尊严', pinyin: 'zūn yán', meaning: 'dignité', meaningEn: 'dignity', audio: 'audio/hsk6/hsk6_尊严.wav' }
    ],
    tip:
      'Pour louer une personne âgée chinoise : « 您的品格让我深受感动 » (votre caractère me touche profondément). 品格 reconnaît la VERTU MORALE accumulée — flatte mieux que 性格 (tempérament neutre). Compliment ultime pour un mentor/aîné.',
    tipEn:
      'To praise a Chinese elder: «您的品格让我深受感动» (your character moves me deeply). 品格 recognizes accumulated MORAL VIRTUE — flatters better than 性格 (neutral temperament). Ultimate compliment for a mentor/elder.'
  }
];

export const c21NuancesM7LearnSections: LessonV2LearnSection[] = [
  {
    id: 'c21-zhi-shi-li',
    title: '智 vs 知 vs 识 — sagesse, connaissance, conscience',
    titleEn: '智 vs 知 vs 识 — wisdom, knowledge, awareness',
    body:
      'RÈGLE D\'OR : 智 (zhì) = SAGESSE PRATIQUE (savoir agir avec discernement). 智慧 (sagesse), 智者 (le sage). L\'une des 五常 confucéennes. Remarque : connote l\'INTELLIGENCE appliquée. Règle : 知 (zhī) = CONNAÎTRE / SAVOIR (acquérir par l\'apprentissage). 知识 (savoir), 知道 (savoir). Plus large, plus passif. Astuce : 识 (shí) = RECONNAÎTRE / IDENTIFIER (distinguer parmi plusieurs). 认识 (connaître par expérience), 见识 (vue / expérience), 识别 (identifier). Connote la CAPACITÉ DE DISCERNEMENT. Hierarchy : 知 (savoir acquis) < 识 (capacité de discernement) < 智 (sagesse pratique appliquée). Attention : compliment « 您是有智慧的人 » > « 您知识丰富 » (sage > savant).',
    bodyEn:
      '智 (zhì) = PRACTICAL WISDOM (knowing how to act with discernment). 智慧 (wisdom), 智者 (the wise). One of the Confucian 五常. Connotes APPLIED intelligence. 知 (zhī) = TO KNOW / KNOW (acquire by learning). 知识 (knowledge), 知道 (know). Broader, more passive. 识 (shí) = RECOGNIZE / IDENTIFY (distinguish among many). 认识 (know by experience), 见识 (sight / experience), 识别 (identify). Connotes DISCERNMENT capacity. Hierarchy: 知 (acquired knowledge) < 识 (discernment capacity) < 智 (applied practical wisdom). Compliment: «您是有智慧的人» > «您知识丰富» (wise > learned).',
    items: [
      { hanzi: '智', pinyin: 'zhì', meaning: 'sagesse', meaningEn: 'wisdom', audio: 'audio/hsk5/hsk5_智.wav' },
      { hanzi: '知', pinyin: 'zhī', meaning: 'connaître, savoir', meaningEn: 'know', audio: 'audio/hsk1/hsk1_知道.wav' },
      { hanzi: '识', pinyin: 'shí', meaning: 'reconnaître, discerner', meaningEn: 'recognize', audio: 'audio/hsk5/hsk5_识.wav' },
      { hanzi: '智慧', pinyin: 'zhì huì', meaning: 'sagesse', meaningEn: 'wisdom', audio: 'audio/hsk5/hsk5_智慧.wav' },
      { hanzi: '见识', pinyin: 'jiàn shí', meaning: 'expérience, ouverture', meaningEn: 'experience, breadth', audio: 'audio/hsk6/hsk6_见识.wav' }
    ],
    tip:
      '« 增长见识 » (élargir son expérience/sa vue) est un objectif culturellement valorisé en Chine. À utiliser pour parler de voyage, lecture, rencontres : « 我希望多出去走走，增长见识 » (j\'aimerais voyager plus pour élargir ma vue). Très bien reçu.',
    tipEn:
      '«增长见识» (broaden one\'s experience/sight) is a culturally valued goal in China. Use for travel, reading, encounters: «我希望多出去走走，增长见识» (I\'d like to travel more to broaden my horizons). Very well received.'
  },
  {
    id: 'c21-feng-yu-jingjie',
    title: '境界 vs 层次 vs 水平 — niveau, hauteur (3 dimensions)',
    titleEn: '境界 vs 层次 vs 水平 — level, height (3 dimensions)',
    body:
      'RÈGLE D\'OR : 境界 (jìngjiè) = NIVEAU SPIRITUEL/PHILOSOPHIQUE atteint (état de l\'être). Remarque : 王国维 (Wang Guowei) a posé les « 三种境界 » de la création : (1) 独上高楼，望尽天涯路 ; (2) 衣带渐宽终不悔 ; (3) 蓦然回首，那人却在灯火阑珊处. Profondément culturel. Règle : 层次 (céngcì) = NIVEAU STRUCTUREL (couches d\'analyse, hiérarchie). 高层次的人 (personne de haut niveau intellectuel/social). Plus structurel. Astuce : 水平 (shuǐpíng) = NIVEAU MESURABLE (compétence, performance). 学习水平 (niveau scolaire). Plus quantitatif. Hierarchy : 水平 (mesurable concret) < 层次 (structurel intellectuel) < 境界 (spirituel philosophique). Attention : pour louer un sage, « 您的境界让我景仰 » (votre niveau spirituel m\'inspire le respect).',
    bodyEn:
      '境界 (jìngjiè) = SPIRITUAL/PHILOSOPHICAL LEVEL attained (state of being). 王国维 (Wang Guowei) posed the «三种境界» of creation: (1) 独上高楼，望尽天涯路; (2) 衣带渐宽终不悔; (3) 蓦然回首，那人却在灯火阑珊处. Deeply cultural. 层次 (céngcì) = STRUCTURAL LEVEL (layers of analysis, hierarchy). 高层次的人 (person of high intellectual/social level). More structural. 水平 (shuǐpíng) = MEASURABLE LEVEL (competence, performance). 学习水平 (academic level). More quantitative. Hierarchy: 水平 (concrete measurable) < 层次 (structural intellectual) < 境界 (spiritual philosophical). To praise a sage: «您的境界让我景仰» (your spiritual level inspires my respect).',
    items: [
      { hanzi: '境界', pinyin: 'jìng jiè', meaning: 'niveau spirituel', meaningEn: 'spiritual level', audio: 'audio/hsk6/hsk6_境界.wav' },
      { hanzi: '层次', pinyin: 'céng cì', meaning: 'niveau structurel', meaningEn: 'structural level', audio: 'audio/hsk6/hsk6_层次.wav' },
      { hanzi: '水平', pinyin: 'shuǐ píng', meaning: 'niveau mesurable', meaningEn: 'measurable level', audio: 'audio/hsk3/hsk3_水平.wav' },
      { hanzi: '景仰', pinyin: 'jǐng yǎng', meaning: 'admirer (respect)', meaningEn: 'revere', audio: 'audio/hsk6/hsk6_景仰.wav' },
      { hanzi: '王国维', pinyin: 'wáng guó wéi', meaning: 'Wang Guowei (lettré)', meaningEn: 'Wang Guowei (scholar)', audio: 'audio/hsk6/hsk6_王国维.wav' }
    ],
    tip:
      'Connaître les « 三种境界 » de Wang Guowei est UN signal de niveau lettré C2. Si tu peux les MENTIONNER en discussion (« 像王国维说的三种境界 »), tu signales immédiatement ton niveau de compréhension culturelle profonde. Très impressionnant en milieu intellectuel chinois.',
    tipEn:
      'Knowing Wang Guowei\'s «三种境界» is a C2 literate-level signal. If you can MENTION them in discussion («像王国维说的三种境界»), you immediately signal deep cultural understanding. Very impressive in Chinese intellectual circles.'
  }
];

// === HISTORICAL C2.1 PARCOURS — wenyan-intro / philo-classique / poetry ===

// --- wenyan-intro -----------------------------------------------------------

export const c21WenyanIntroM1LearnSections: LessonV2LearnSection[] = [
  {
    id: 'c21-wenyan-pourquoi',
    title: 'Pourquoi apprendre le 文言文 ?',
    titleEn: 'Why learn 文言文?',
    body:
      'RÈGLE D\'OR : le 文言文 (chinois classique) n\'est pas une langue MORTE — c\'est le RÉSERVOIR culturel dans lequel tout chinois moderne soutenu puise. Remarque : quand un éditorialiste écrit 不容置疑 (« hors de doute »), 不可逾越 (« infranchissable »), c\'est du 文言 condensé. Quand un homme politique cite 子曰 X (« Confucius dit X »), c\'est du 文言 brut. Attention : sans bases en 文言, tu PLAFONNES à un C1.5 — tu ne décodes pas 30% des éditoriaux soutenus. Avec ces bases, tu débloques : éditoriaux, philosophie, poésie, romans classiques, calligraphie. ROI immense pour quelques dizaines d\'heures d\'étude. Astuce : approche pas la grammaire formelle, mais 50 phrases-clés à mémoriser + reconnaître les particules.',
    bodyEn:
      '文言文 (classical Chinese) isn\'t a DEAD language — it\'s the cultural RESERVOIR all formal modern Chinese draws from. When an editorialist writes 不容置疑 («beyond doubt»), 不可逾越 («uncrossable»), that\'s condensed 文言. When a politician cites 子曰 X («Confucius says X»), that\'s raw 文言. Without 文言 basics, you PLATEAU at C1.5 — you don\'t decode 30% of formal editorials. With these basics, you unlock: editorials, philosophy, poetry, classical novels, calligraphy. Huge ROI for a few dozen hours of study. Approach: not formal grammar, but 50 key phrases to memorize + spot the particles.',
    items: [
      { hanzi: '文言文', pinyin: 'wén yán wén', meaning: 'chinois classique', meaningEn: 'classical Chinese', audio: 'audio/hsk6/hsk6_文言.wav' },
      { hanzi: '白话', pinyin: 'bái huà', meaning: 'chinois parlé moderne', meaningEn: 'modern vernacular', audio: 'audio/hsk6/hsk6_白话.wav' },
      { hanzi: '不容置疑', pinyin: 'bù róng zhì yí', meaning: 'hors de doute', meaningEn: 'beyond doubt', audio: 'audio/hsk6/hsk6_不容.wav' },
      { hanzi: '逾越', pinyin: 'yú yuè', meaning: 'franchir, transgresser', meaningEn: 'cross over', audio: 'audio/hsk6/hsk6_逾越.wav' },
      { hanzi: '储备', pinyin: 'chǔ bèi', meaning: 'réservoir', meaningEn: 'reserve', audio: 'audio/hsk6/hsk6_储备.wav' }
    ],
    tip:
      'Investis 30 min/jour pendant 1 mois sur le 文言. Méthode : lire CHAQUE matin 1 phrase de Confucius en VO + sa traduction. Au bout de 30 jours, tu reconnais 30 phrases — assez pour décoder les citations dans la presse moderne. Routine simple, ROI massif.',
    tipEn:
      'Invest 30 min/day for 1 month on 文言. Method: read EACH morning 1 Confucius sentence in original + translation. After 30 days, you recognize 30 sentences — enough to decode quotes in modern press. Simple routine, massive ROI.'
  },
  {
    id: 'c21-wenyan-1car-1mot',
    title: '1 caractère = 1 mot — la règle d\'or',
    titleEn: '1 character = 1 word — the golden rule',
    body:
      'En chinois MODERNE, on a des bi-syllabes : 朋友 (péngyou, ami), 学习 (xuéxí, étudier), 国家 (guójiā, pays). RÈGLE D\'OR : en 文言, chaque caractère est UN MOT INDÉPENDANT : 朋 = ami, 友 = compagnon, 学 = étudier, 习 = pratiquer répétitivement, 国 = État, 家 = famille/clan. Remarque : un texte 文言 a 2x moins de caractères pour la même densité d\'information. Astuce : exemple 学而时习之 (5 char) = « étudier (学) et (而) en temps voulu (时) pratiquer (习) cela (之) », équivalent moderne en ~15 syllabes. Attention : conséquence pratique LIS LENTEMENT. Chaque caractère mérite son temps. Remarque : les Chinois cultivés mettent 10 minutes pour lire un poème de 28 caractères — et c\'est NORMAL.',
    bodyEn:
      'In MODERN Chinese, we have bi-syllables: 朋友 (friend), 学习 (study), 国家 (country). In 文言, each character is ONE INDEPENDENT WORD: 朋 = friend, 友 = companion, 学 = study, 习 = repeatedly practice, 国 = state, 家 = family/clan. So a 文言 text has 2x fewer characters for the same information density. Example: 学而时习之 (5 chars) = «study (学) and (而) in due time (时) practice (习) it (之)», modern equivalent in ~15 syllables. Practical consequence: READ SLOWLY. Each character deserves its time. Cultured Chinese take 10 minutes to read a 28-character poem — and that\'s NORMAL.',
    items: [
      { hanzi: '朋', pinyin: 'péng', meaning: 'ami (classique)', meaningEn: 'friend (classical)', audio: 'audio/hsk6/hsk6_朋.wav' },
      { hanzi: '友', pinyin: 'yǒu', meaning: 'compagnon (classique)', meaningEn: 'companion', audio: 'audio/hsk6/hsk6_友.wav' },
      { hanzi: '学', pinyin: 'xué', meaning: 'étudier', meaningEn: 'study', audio: 'audio/hsk1/hsk1_学.wav' },
      { hanzi: '习', pinyin: 'xí', meaning: 'pratiquer répét.', meaningEn: 'repeatedly practice', audio: 'audio/hsk1/hsk1_习.wav' },
      { hanzi: '密度', pinyin: 'mì dù', meaning: 'densité', meaningEn: 'density', audio: 'audio/hsk6/hsk6_密度.wav' }
    ],
    tip:
      'Quand tu lis du 文言, isole CHAQUE caractère mentalement et donne-lui son sens. Puis assemble. C\'est lent mais c\'est la SEULE méthode. Sauter rend incompréhensible. Le 文言 récompense la lenteur — comme la calligraphie ou le thé.',
    tipEn:
      'When reading 文言, isolate EACH character mentally and give it meaning. Then assemble. Slow but the ONLY method. Skipping makes it incomprehensible. 文言 rewards slowness — like calligraphy or tea.'
  }
];

export const c21WenyanIntroM2LearnSections: LessonV2LearnSection[] = [
  {
    id: 'c21-particule-zhi',
    title: '之 — les 3 vies d\'une particule',
    titleEn: '之 — 3 lives of a particle',
    body:
      'RÈGLE D\'OR : Vie 1 DÉTERMINATIF (= 的 moderne). 孔子之书 = les livres DE Confucius. 国家之大 = grandeur DU pays. Remarque : c\'est l\'usage le plus FRÉQUENT — apparait dans 60% des occurrences. Règle : Vie 2 PRONOM OBJET (3e personne, lui/elle/cela). 爱之 = aimer [lui/elle/cela]. 学而时习之 = étudier et pratiquer CELA en temps voulu. Exception : Vie 3 VERBE « aller à » (rare mais à connaître). 之于 X = se rendre à X. 子之武城 = le Maître se rendit à Wucheng. Astuce : test contextuel — si après 之 il y a un nom → vie 1 (de). Si après 之 il y a une fin de phrase → vie 2 (cela). Si après 之 il y a un lieu → vie 3 (aller).',
    bodyEn:
      'Life 1: DETERMINER (= modern 的). 孔子之书 = Confucius\'S books. 国家之大 = the country\'S greatness. Most FREQUENT use — appears in 60% of occurrences. Life 2: OBJECT PRONOUN (3rd person, him/her/it). 爱之 = love [him/her/it]. 学而时习之 = study and practice IT in due time. Life 3: VERB «go to» (rare but worth knowing). 之于 X = go to X. 子之武城 = the Master went to Wucheng. Contextual test: if after 之 there\'s a noun → life 1 (of). If after 之 there\'s a sentence end → life 2 (it). If after 之 there\'s a place → life 3 (go).',
    items: [
      { hanzi: '之', pinyin: 'zhī', meaning: 'particule classique', meaningEn: 'classical particle', audio: 'audio/hsk5/hsk5_之.wav' },
      { hanzi: '书', pinyin: 'shū', meaning: 'livre', meaningEn: 'book', audio: 'audio/hsk1/hsk1_书.wav' },
      { hanzi: '武城', pinyin: 'wǔ chéng', meaning: 'Wucheng (cité)', meaningEn: 'Wucheng', audio: 'audio/hsk6/hsk6_武城.wav' },
      { hanzi: '代词', pinyin: 'dài cí', meaning: 'pronom', meaningEn: 'pronoun', audio: 'audio/hsk6/hsk6_代词.wav' },
      { hanzi: '语境', pinyin: 'yǔ jìng', meaning: 'contexte (linguistique)', meaningEn: 'context', audio: 'audio/hsk6/hsk6_语境.wav' }
    ],
    tip:
      'Le test mémo de 之 : « après 之 quoi ? » Nom → de. Verbe accompli → cela. Nom de lieu → aller à. Cette question simple résout 95% des cas. Mémorise-la et applique-la mécaniquement les 50 premières fois.',
    tipEn:
      'The 之 mnemonic test: «what comes after 之?» Noun → of. Completed verb → it. Place name → go to. This simple question solves 95% of cases. Memorize it and apply mechanically for the first 50 occurrences.'
  },
  {
    id: 'c21-particule-zhe-suo',
    title: '者 (nominalisation) + 所 (passif)',
    titleEn: '者 (nominalization) + 所 (passive)',
    body:
      'RÈGLE D\'OR : 者 (zhě) transforme un VERBE ou un ADJECTIF en NOM. 善 (bon) + 者 = 善者 (celui qui est bon, le bien). 学 (étudier) + 者 = 学者 (celui qui étudie, le lettré). Astuce : 古之学者 = les lettrés d\'autrefois. 仁者爱人 = celui qui est bienveillant aime les autres. Remarque : vivant en chinois moderne 学者 (érudit), 作者 (auteur), 读者 (lecteur), 记者 (journaliste). Règle : 所 (suǒ) construit le PASSIF — « ce qui est X » ou « la chose X-ée ». 所爱 = ce qui est aimé / l\'être aimé. 所闻 = ce qu\'on entend. 所见 = ce qu\'on voit. Attention : combo classique 所以 (suǒyǐ, vivant en moderne comme « donc ») = à l\'origine en 文言 « ce par quoi », d\'où le sens causal qui en a découlé.',
    bodyEn:
      '者 (zhě) turns a VERB or ADJECTIVE into a NOUN. 善 (good) + 者 = 善者 (the one who is good, goodness). 学 (study) + 者 = 学者 (one who studies, scholar). 古之学者 = scholars of old. 仁者爱人 = the benevolent love others. Alive in modern Chinese: 学者 (scholar), 作者 (author), 读者 (reader), 记者 (journalist). 所 (suǒ) builds the PASSIVE: «that which is X» or «the X-ed thing». 所爱 = what is loved / the loved one. 所闻 = what is heard. 所见 = what is seen. Classical combo: 所以 (alive in modern as «therefore») = originally in 文言 «that by which», whence the derived causal sense.',
    items: [
      { hanzi: '者', pinyin: 'zhě', meaning: 'celui qui (suffixe)', meaningEn: 'the one who', audio: 'audio/hsk5/hsk5_者.wav' },
      { hanzi: '所', pinyin: 'suǒ', meaning: 'ce qui est (passif)', meaningEn: 'that which is', audio: 'audio/hsk5/hsk5_所.wav' },
      { hanzi: '学者', pinyin: 'xué zhě', meaning: 'érudit', meaningEn: 'scholar', audio: 'audio/hsk5/hsk5_学者.wav' },
      { hanzi: '记者', pinyin: 'jì zhě', meaning: 'journaliste', meaningEn: 'journalist', audio: 'audio/hsk4/hsk4_记者.wav' },
      { hanzi: '所闻', pinyin: 'suǒ wén', meaning: 'ce qu\'on entend', meaningEn: 'what one hears', audio: 'audio/hsk6/hsk6_所闻.wav' }
    ],
    tip:
      'Pour reconnaître un 者 : il vient APRÈS un verbe/adj. Pour reconnaître un 所 : il vient AVANT un verbe. Cette règle simple débloque la lecture. Les 2 sont à mémoriser comme « clipboards grammaticaux » plutôt que comme mots.',
    tipEn:
      'To spot a 者: it comes AFTER a verb/adj. To spot a 所: it comes BEFORE a verb. This simple rule unlocks reading. Both should be memorized as «grammatical clips» rather than words.'
  }
];

export const c21WenyanIntroM3LearnSections: LessonV2LearnSection[] = [
  {
    id: 'c21-finales-yieyiyihu',
    title: '也 / 矣 — affirmation et accomplissement',
    titleEn: '也 / 矣 — affirmation and accomplishment',
    body:
      'RÈGLE D\'OR : 也 (yě) en 文言 = particule de DÉFINITION ou d\'AFFIRMATION SOLENNELLE en fin de phrase. Règle : souvent sujet + 也 = « X est… ». Astuce : exemple célèbre 仁者，爱人也 = « être humain bienveillant, c\'est aimer les autres ». 仁，礼之本也 = « la bienveillance, c\'est le fondement des rites ». Attention : sans 也, l\'affirmation ne sonne pas DÉFINITIONNELLE. Remarque : sens MODERNE de 也 (= « aussi, également ») est SECONDAIRE et historiquement tardif. Exception : 矣 (yǐ) = particule d\'ASPECT ACCOMPLI (= moderne 了) + nuance de jugement. 此之谓大丈夫矣 = « c\'est cela qu\'on appelle un vrai homme ». Souvent en clôture d\'un discours : « voilà, c\'est dit, c\'est jugé, c\'est fini ». Aspect accompli + définitif.',
    bodyEn:
      '也 (yě) in 文言 = particle of DEFINITION or SOLEMN AFFIRMATION at sentence end. Often: subject + 也 = «X is…». Famous example: 仁者，爱人也 = «to be a benevolent human is to love others». 仁，礼之本也 = «benevolence is the foundation of rites». Without 也, the affirmation doesn\'t sound DEFINITIONAL. MODERN sense of 也 (= «also») is SECONDARY and historically late. 矣 (yǐ) = particle of ACCOMPLISHED ASPECT (= modern 了) + judgment nuance. 此之谓大丈夫矣 = «this is what is called a true man». Often closing a speech: «there, it\'s said, judged, finished». Accomplished + definitive aspect.',
    items: [
      { hanzi: '也', pinyin: 'yě', meaning: 'particule définitionnelle', meaningEn: 'definitional particle', audio: 'audio/hsk1/hsk1_也.wav' },
      { hanzi: '矣', pinyin: 'yǐ', meaning: 'aspect accompli (classique)', meaningEn: 'accomplished aspect', audio: 'audio/hsk6/hsk6_矣.wav' },
      { hanzi: '本', pinyin: 'běn', meaning: 'fondement, racine', meaningEn: 'foundation, root', audio: 'audio/hsk2/hsk2_本.wav' },
      { hanzi: '大丈夫', pinyin: 'dà zhàng fu', meaning: 'véritable homme', meaningEn: 'true man', audio: 'audio/hsk6/hsk6_大丈夫.wav' },
      { hanzi: '谓', pinyin: 'wèi', meaning: 'appeler, nommer (formel)', meaningEn: 'call, name (formal)', audio: 'audio/hsk6/hsk6_谓.wav' }
    ],
    tip:
      'Quand tu vois X 也 en fin de phrase 文言, traduis « X est [défini comme] Y ». Quand tu vois X 矣, traduis « X, c\'est fait/jugé ». Ces 2 raccourcis débloquent la lecture des Analectes et de Mencius.',
    tipEn:
      'When you see X 也 at sentence end in 文言, translate «X is [defined as] Y». When you see X 矣, translate «X, it\'s done/judged». These 2 shortcuts unlock reading the Analects and Mencius.'
  },
  {
    id: 'c21-finales-hu-zai',
    title: '乎 (interrogation) + 哉 (exclamation)',
    titleEn: '乎 (interrogation) + 哉 (exclamation)',
    body:
      'RÈGLE D\'OR : 乎 (hū) = particule INTERROGATIVE en fin de phrase (= moderne 吗 ou 呢). Astuce : exemple emblématique 学而时习之，不亦说乎 ? = « Apprendre et pratiquer en temps voulu, n\'est-ce pas une joie ? ». Remarque : 不亦 X 乎 = « n\'est-ce pas X ? » est UNE structure rhétorique CLÉ pour poser une question dont la réponse positive est évidente — outil de persuasion lettré. Règle : 哉 (zāi) = particule EXCLAMATIVE admirative en fin de phrase. 善哉 ! = « comme c\'est bien ! ». 大哉 ! = « comme c\'est grand ! ». Attention : réservé aux MOMENTS de grande émotion intellectuelle. Très théâtral. Exception : reconnaître 哉 dans un texte = comprendre que l\'auteur s\'enthousiasme. Sans 哉, la phrase resterait factuelle.',
    bodyEn:
      '乎 (hū) = INTERROGATIVE particle at sentence end (= modern 吗 or 呢). Iconic example: 学而时习之，不亦说乎? = «Learn and practice in due time, is this not joy?». 不亦 X 乎 = «is it not X?» is a KEY rhetorical structure for asking a question whose positive answer is obvious — literate persuasion tool. 哉 (zāi) = ADMIRATIVE EXCLAMATIVE particle at sentence end. 善哉! = «how good!». 大哉! = «how great!». Reserved for MOMENTS of great intellectual emotion. Very theatrical. Recognizing 哉 in a text = understanding the author\'s enthusiasm. Without 哉, the sentence would stay factual.',
    items: [
      { hanzi: '乎', pinyin: 'hū', meaning: 'particule interrogative', meaningEn: 'interrogative particle', audio: 'audio/hsk6/hsk6_乎.wav' },
      { hanzi: '哉', pinyin: 'zāi', meaning: 'particule exclamative', meaningEn: 'exclamative particle', audio: 'audio/hsk6/hsk6_哉.wav' },
      { hanzi: '不亦', pinyin: 'bú yì', meaning: 'n\'est-ce pas', meaningEn: 'is it not', audio: 'audio/hsk6/hsk6_不亦.wav' },
      { hanzi: '说', pinyin: 'yuè', meaning: '= 悦 joie (classique)', meaningEn: '= 悦 joy (classical)', audio: 'audio/hsk6/hsk6_悦.wav' },
      { hanzi: '善哉', pinyin: 'shàn zāi', meaning: 'comme c\'est bien !', meaningEn: 'how good!', audio: 'audio/hsk6/hsk6_善哉.wav' }
    ],
    tip:
      '« 不亦 X 乎 » est UNE formule à mémoriser. Elle apparait 3 fois dans la 1re phrase des Analectes. À utiliser en discussion intellectuelle pour poser une question rhétorique soutenue : « 这不亦是一种智慧乎 ? » (n\'est-ce pas une forme de sagesse ?).',
    tipEn:
      '«不亦 X 乎» is a formula to memorize. It appears 3 times in the Analects\' first sentence. Use in intellectual discussion to ask a formal rhetorical question: «这不亦是一种智慧乎?» (is this not a form of wisdom?).'
  }
];

export const c21WenyanIntroM4LearnSections: LessonV2LearnSection[] = [
  {
    id: 'c21-lunyu-decoupage',
    title: 'Décortiquer la 1re phrase des 论语',
    titleEn: 'Dissect the Analects\' first sentence',
    body:
      '子曰：「学而时习之，不亦说乎? 有朋自远方来，不亦乐乎? 人不知而不愠，不亦君子乎?」 Astuce : décortiquons — 子 (le Maître = Confucius) 曰 (dit) — formule rituelle de citation. Remarque : 学 (étudier) 而 (et) 时 (en temps voulu) 习 (pratiquer) 之 (cela), 不亦 (n\'est-ce pas) 说 (= 悦 joie) 乎 (?) — apprendre + revoir = joie. Règle : 有 (avoir) 朋 (ami) 自 (depuis) 远方 (lointaine région) 来 (venir), 不亦乐乎 = un ami vient de loin, n\'est-ce pas un bonheur. 人 (les hommes) 不知 (ne pas connaître/reconnaître) 而 (mais) 不愠 (ne pas être affecté), 不亦君子乎 = ne pas être reconnu sans s\'en émouvoir, n\'est-ce pas le propre du noble. RÈGLE D\'OR : CHAQUE écolier chinois la sait. Si tu la cites, tu signales TON niveau cultivé.',
    bodyEn:
      '子曰：「学而时习之，不亦说乎? 有朋自远方来，不亦乐乎? 人不知而不愠，不亦君子乎?」 Let\'s parse: 子 (the Master = Confucius) 曰 (says) — ritual citation formula. 学 (study) 而 (and) 时 (in due time) 习 (practice) 之 (it), 不亦 (is it not) 说 (= 悦 joy) 乎 (?) — learn + review = joy. 有 (have) 朋 (friend) 自 (from) 远方 (faraway region) 来 (come), 不亦乐乎 = a friend comes from afar, is this not happiness. 人 (others) 不知 (not know/recognize) 而 (yet) 不愠 (not be affected), 不亦君子乎 = not to be recognized without resenting it, is this not the noble man\'s mark. EVERY Chinese schoolchild knows it. Citing it signals YOUR cultured level.',
    items: [
      { hanzi: '子曰', pinyin: 'zǐ yuē', meaning: 'le Maître dit', meaningEn: 'the Master said', audio: 'audio/hsk6/hsk6_子曰.wav' },
      { hanzi: '远方', pinyin: 'yuǎn fāng', meaning: 'lointain', meaningEn: 'faraway place', audio: 'audio/hsk5/hsk5_远方.wav' },
      { hanzi: '愠', pinyin: 'yùn', meaning: 'se froisser intérieurement', meaningEn: 'inwardly resent', audio: 'audio/hsk6/hsk6_愠.wav' },
      { hanzi: '君子', pinyin: 'jūn zǐ', meaning: 'noble homme', meaningEn: 'gentleman', audio: 'audio/hsk6/hsk6_君子.wav' },
      { hanzi: '论语', pinyin: 'lún yǔ', meaning: 'Analectes', meaningEn: 'Analects', audio: 'audio/hsk6/hsk6_论语.wav' }
    ],
    tip:
      'Mémorise la 1re ligne : 子曰：学而时习之，不亦说乎 ? 12 caractères. Si tu peux les RÉCITER en chinois en discussion, tu signales un niveau lettré C2 immédiatement. Investissement : 5 min de mémorisation. Bénéfice : durable et impressionnant.',
    tipEn:
      'Memorize the 1st line: 子曰：学而时习之，不亦说乎? 12 characters. If you can RECITE them in Chinese in discussion, you immediately signal C2 literate level. Investment: 5 min memorization. Benefit: lasting and impressive.'
  },
  {
    id: 'c21-lunyu-citations-cles',
    title: '5 citations passe-partout des 论语',
    titleEn: '5 catch-all Analects quotes',
    body:
      'Astuce : (1) 学而不思则罔，思而不学则殆 = « étudier sans réfléchir mène à la confusion, réfléchir sans étudier est dangereux ». À utiliser en débat sur l\'éducation. Remarque : (2) 三人行，必有我师焉 = « parmi 3 personnes qui marchent ensemble, il y a forcément un maître pour moi » — humilité. À utiliser pour louer un junior. RÈGLE D\'OR : (3) 己所不欲，勿施于人 = « ne fais pas à autrui ce que tu ne voudrais pas qu\'on te fasse » — règle d\'or version Confucius. Règle : (4) 知之为知之，不知为不知，是知也 = « savoir ce qu\'on sait et savoir ce qu\'on ignore, c\'est cela savoir » — humilité épistémique. Attention : (5) 君子和而不同，小人同而不和 = « le noble s\'accorde sans uniformité, l\'homme commun s\'uniformise sans s\'accorder » — éthique du dialogue. Ces 5 citations couvrent 80% des références classiques en discussion contemporaine.',
    bodyEn:
      '(1) 学而不思则罔，思而不学则殆 = «studying without thinking is confusing, thinking without studying is dangerous». Use in education debate. (2) 三人行，必有我师焉 = «among 3 people walking, there\'s sure to be a master for me» — humility. Use to praise a junior. (3) 己所不欲，勿施于人 = «don\'t do to others what you don\'t want done to you» — Confucian Golden Rule. (4) 知之为知之，不知为不知，是知也 = «to know what you know and know what you don\'t know, that is knowledge» — epistemic humility. (5) 君子和而不同，小人同而不和 = «the noble harmonizes without uniformity, the petty uniformizes without harmonizing» — dialogue ethic. These 5 quotes cover 80% of classical references in contemporary discussion.',
    items: [
      { hanzi: '罔', pinyin: 'wǎng', meaning: 'confus, perdu', meaningEn: 'confused, lost', audio: 'audio/hsk6/hsk6_罔.wav' },
      { hanzi: '殆', pinyin: 'dài', meaning: 'dangereux', meaningEn: 'dangerous', audio: 'audio/hsk6/hsk6_殆.wav' },
      { hanzi: '焉', pinyin: 'yān', meaning: 'particule (= 之于)', meaningEn: 'particle (= 之于)', audio: 'audio/hsk6/hsk6_焉.wav' },
      { hanzi: '勿', pinyin: 'wù', meaning: 'ne pas (impératif négatif)', meaningEn: 'do not (negative imp.)', audio: 'audio/hsk6/hsk6_勿.wav' },
      { hanzi: '施', pinyin: 'shī', meaning: 'appliquer, infliger', meaningEn: 'apply, impose', audio: 'audio/hsk5/hsk5_施.wav' }
    ],
    tip:
      'Stratégie : choisis 1 citation des Analectes par thème (éducation, éthique, dialogue), apprends-la PAR CŒUR avec sa traduction. Quand le sujet apparait, dégaine. Effet immédiat sur la perception lettrée. 5 citations bien placées = mois d\'efforts en apparence.',
    tipEn:
      'Strategy: pick 1 Analects quote per theme (education, ethics, dialogue), learn it BY HEART with its translation. When the topic comes up, deploy. Immediate effect on literate perception. 5 well-placed quotes = months of apparent effort.'
  }
];

// --- philo-classique --------------------------------------------------------

export const c21PhiloClassiqueM1LearnSections: LessonV2LearnSection[] = [
  {
    id: 'c21-confucius-vie',
    title: 'Confucius : la vie d\'un maître itinérant',
    titleEn: 'Confucius: life of an itinerant master',
    body:
      '孔子 (Kong Zi, -551 → -479) naît dans le royaume de Lu (actuel Shandong). Remarque : orphelin de père tôt, élevé pauvre par sa mère. Devient fonctionnaire mineur, puis enseigne. RÈGLE D\'OR : accepte des élèves indépendamment de leur origine sociale (révolutionnaire à l\'époque) — d\'où sa qualification de « 1er enseignant universel » de l\'histoire chinoise. Astuce : voyage 13 ans à travers les royaumes pour proposer ses idées politiques aux souverains — TOUS les rejettent. Rentre chez lui, enseigne jusqu\'à sa mort. Attention : il meurt en pensant avoir échoué. Exception : 200 ans après, sa pensée devient pilier d\'État sous la dynastie Han. Remarque : aujourd\'hui sa tombe à Qufu (Shandong) est un site UNESCO, le 孔府 (palais Kong) où ses descendants ont vécu pendant 2000 ans est encore visitable.',
    bodyEn:
      '孔子 (Confucius, 551-479 BCE) born in the kingdom of Lu (modern Shandong). Orphaned of father early, raised poor by his mother. Becomes minor official, then teaches. Accepts students regardless of social origin (revolutionary at the time) — hence his title as «first universal teacher» in Chinese history. Travels 13 years across kingdoms to offer his political ideas to rulers — ALL reject them. Returns home, teaches until death. He dies thinking he failed. 200 years later, his thought becomes state pillar under the Han dynasty. Today: his tomb at Qufu (Shandong) is a UNESCO site, the 孔府 (Kong Palace) where his descendants lived for 2000 years is still visitable.',
    items: [
      { hanzi: '孔子', pinyin: 'kǒng zǐ', meaning: 'Confucius', meaningEn: 'Confucius', audio: 'audio/hsk5/hsk5_孔子.wav' },
      { hanzi: '鲁国', pinyin: 'lǔ guó', meaning: 'royaume de Lu', meaningEn: 'kingdom of Lu', audio: 'audio/hsk6/hsk6_鲁国.wav' },
      { hanzi: '曲阜', pinyin: 'qū fù', meaning: 'Qufu (ville natale)', meaningEn: 'Qufu (hometown)', audio: 'audio/hsk6/hsk6_曲阜.wav' },
      { hanzi: '弟子', pinyin: 'dì zǐ', meaning: 'disciple', meaningEn: 'disciple', audio: 'audio/hsk6/hsk6_弟子.wav' },
      { hanzi: '思想', pinyin: 'sī xiǎng', meaning: 'pensée', meaningEn: 'thought', audio: 'audio/hsk5/hsk5_思想.wav' }
    ],
    tip:
      'Si tu visites le Shandong, va à Qufu : tombe + 孔庙 (temple) + 孔府 (palais). Site UNESCO, foule modérée hors Nouvel An. Pour un Européen amateur de Confucius, c\'est UN pèlerinage qui change le rapport au texte.',
    tipEn:
      'If you visit Shandong, go to Qufu: tomb + 孔庙 (temple) + 孔府 (palace). UNESCO site, moderate crowds outside New Year. For a European Confucius lover, it\'s a PILGRIMAGE that transforms the text relationship.'
  },
  {
    id: 'c21-vertus-cinq-relations',
    title: '五常 + 五伦 — vertus et relations',
    titleEn: '五常 + 五伦 — virtues and relations',
    body:
      'RÈGLE D\'OR : 五常 (5 vertus constantes) — 仁 (humanité bienveillante — concept central), 义 (justice/devoir moral), 礼 (rites/bienséance sociale), 智 (sagesse pratique), 信 (fidélité à la parole). Astuce : ces 5 sont à mémoriser comme une CHAÎNE — chaque vertu en alimente une autre. Règle : 五伦 (5 relations sociales fondamentales) — 君臣 (souverain-sujet), 父子 (père-fils, devenu modèle de la 孝 piété filiale), 夫妇 (mari-femme), 兄弟 (frères, modèle de l\'amitié), 朋友 (amis). Remarque : chaque relation a des DEVOIRS RÉCIPROQUES. Attention : la 孝 (xiào, piété filiale) reste dans la Chine moderne — prendre soin des parents âgés est un DEVOIR LÉGAL en Chine (loi 2013 obligeant à visiter ses parents âgés régulièrement). Confucius reste opérationnel.',
    bodyEn:
      '五常 (5 constant virtues): 仁 (benevolent humanity — central concept), 义 (righteousness/moral duty), 礼 (rites/social propriety), 智 (practical wisdom), 信 (trustworthiness). Memorize these 5 as a CHAIN — each virtue feeds another. 五伦 (5 fundamental social relations): 君臣 (ruler-subject), 父子 (father-son, became the model of 孝 filial piety), 夫妇 (husband-wife), 兄弟 (brothers, friendship model), 朋友 (friends). Each relation has RECIPROCAL DUTIES. 孝 (filial piety) survives in modern China: caring for elderly parents is a LEGAL DUTY in China (2013 law requiring regular visits to elderly parents). Confucius remains operational.',
    items: [
      { hanzi: '五常', pinyin: 'wǔ cháng', meaning: '5 vertus cardinales', meaningEn: '5 cardinal virtues', audio: 'audio/hsk6/hsk6_五常.wav' },
      { hanzi: '五伦', pinyin: 'wǔ lún', meaning: '5 relations sociales', meaningEn: '5 social relations', audio: 'audio/hsk6/hsk6_五伦.wav' },
      { hanzi: '孝', pinyin: 'xiào', meaning: 'piété filiale', meaningEn: 'filial piety', audio: 'audio/hsk5/hsk5_孝.wav' },
      { hanzi: '夫妇', pinyin: 'fū fù', meaning: 'mari et femme', meaningEn: 'husband and wife', audio: 'audio/hsk6/hsk6_夫妇.wav' },
      { hanzi: '臣', pinyin: 'chén', meaning: 'sujet, ministre', meaningEn: 'subject, minister', audio: 'audio/hsk6/hsk6_臣.wav' }
    ],
    tip:
      'Pour louer la qualité morale d\'un ami chinois, dis : « 您真有仁义礼智信的精神 » (vous avez vraiment l\'esprit des 5 vertus). Compliment SUPRÊME — montre que tu connais la matrice morale chinoise et que tu reconnais ses qualités sur cette matrice. Effet émotionnel énorme.',
    tipEn:
      'To praise a Chinese friend\'s moral quality, say: «您真有仁义礼智信的精神» (you truly have the spirit of the 5 virtues). SUPREME compliment — shows you know the Chinese moral matrix and recognize their qualities on it. Huge emotional effect.'
  }
];

export const c21PhiloClassiqueM2LearnSections: LessonV2LearnSection[] = [
  {
    id: 'c21-laozi-incipit',
    title: '道可道，非常道 — l\'incipit du 道德经',
    titleEn: '道可道，非常道 — the Daodejing\'s opening',
    body:
      '《道德经》(Dào Dé Jīng) attribué à 老子 (Lao Zi, VIe siècle av. JC) — figure semi-légendaire, archiviste de Zhou. RÈGLE D\'OR : le texte ouvre par 道可道，非常道。名可名，非常名 = « la Voie qu\'on peut dire/définir n\'est pas la Voie éternelle. Le nom qu\'on peut nommer n\'est pas le nom éternel ». Remarque : premier paradoxe — DIRE LE TAO le diminue. Attention : le tao est INDICIBLE, ce que les mots peuvent atteindre n\'est qu\'une approximation. Cette ouverture est l\'une des phrases les plus citées de toute la littérature chinoise. Astuce : pour la mémoriser, 道可道 (3 fois 道, le 1er = nom, le 2e = verbe « dire ») 非常道 (n\'est pas le tao éternel). Très joli rythme. Remarque : si tu cites cette phrase à un Chinois cultivé, il/elle comprendra ton niveau immédiatement.',
    bodyEn:
      '《道德经》(Dào Dé Jīng) attributed to 老子 (Lao Zi, 6th c. BCE) — semi-legendary figure, Zhou archivist. The text opens with: 道可道，非常道。名可名，非常名 = «the Way that can be said/defined is not the eternal Way. The name that can be named is not the eternal name». First paradox: SAYING THE DAO diminishes it. The Dao is UNSAYABLE, what words can reach is only an approximation. This opening is one of the most-cited phrases in all Chinese literature. To memorize: 道可道 (3x 道, the 1st = noun, 2nd = verb «say») 非常道 (is not the eternal Dao). Very pretty rhythm. If you cite this to a cultured Chinese, they\'ll grasp your level immediately.',
    items: [
      { hanzi: '道德经', pinyin: 'dào dé jīng', meaning: 'Tao Te King', meaningEn: 'Dao De Jing', audio: 'audio/hsk6/hsk6_道德经.wav' },
      { hanzi: '老子', pinyin: 'lǎo zǐ', meaning: 'Lao Zi', meaningEn: 'Lao Zi', audio: 'audio/hsk6/hsk6_老子.wav' },
      { hanzi: '可', pinyin: 'kě', meaning: 'pouvoir, qui peut', meaningEn: 'can be', audio: 'audio/hsk2/hsk2_可.wav' },
      { hanzi: '非', pinyin: 'fēi', meaning: 'n\'est pas (formel)', meaningEn: 'is not (formal)', audio: 'audio/hsk5/hsk5_非.wav' },
      { hanzi: '名', pinyin: 'míng', meaning: 'nom, nommer', meaningEn: 'name, to name', audio: 'audio/hsk2/hsk2_名.wav' }
    ],
    tip:
      'La phrase « 道可道，非常道 » est UN équivalent oriental de « le Tao qu\'on peut dire n\'est pas le Tao » — citée par les penseurs occidentaux (Heidegger, etc.). En la connaissant, tu peux PONTER les cultures dans une discussion philosophique. Très utile en milieu universitaire.',
    tipEn:
      'The phrase «道可道，非常道» is an Eastern equivalent of «the Tao that can be told is not the Tao» — cited by Western thinkers (Heidegger, etc.). Knowing it lets you BRIDGE cultures in philosophical discussion. Very useful in academic settings.'
  },
  {
    id: 'c21-zhuangzi-papillon',
    title: '庄子 + 庄周梦蝶 — la parabole du papillon',
    titleEn: '庄子 + 庄周梦蝶 — the butterfly parable',
    body:
      '庄子 (Zhuang Zi, ~369-286 av. JC) développe le taoïsme par PARABOLES poétiques (vs Lao Zi en aphorismes). RÈGLE D\'OR : la plus célèbre 庄周梦蝶 (Zhuāng Zhōu mèng dié, « Zhuang Zhou rêve [qu\'il est] un papillon »). Astuce : « Un jour, Zhuang Zhou rêva qu\'il était un papillon, voletant librement. Il ignorait être Zhuang Zhou. Soudain il s\'éveilla, et était de nouveau Zhuang Zhou. Mais il ne savait plus : Zhuang Zhou avait-il rêvé d\'être papillon, ou un papillon rêvait-il maintenant d\'être Zhuang Zhou ? ». Remarque : qu\'est-ce qui distingue le rêve de la veille, l\'humain de la nature, le sujet de l\'objet ? Le 物化 (wùhuà, transformation des choses) abolit les frontières. Attention : cette parabole inspire écrivains (Borges en « Les ruines circulaires »), films, et reste une des phrases les plus connues en Chine.',
    bodyEn:
      '庄子 (Zhuang Zi, ~369-286 BCE) develops Daoism through poetic PARABLES (vs Lao Zi\'s aphorisms). The most famous: 庄周梦蝶 («Zhuang Zhou dreams [he is] a butterfly»). «One day, Zhuang Zhou dreamed he was a butterfly, fluttering freely. He didn\'t know he was Zhuang Zhou. Suddenly he woke, and was Zhuang Zhou again. But he no longer knew: had Zhuang Zhou dreamed of being a butterfly, or was a butterfly now dreaming of being Zhuang Zhou?». Question: what distinguishes dream from waking, human from nature, subject from object? 物化 (transformation of things) abolishes borders. This parable inspires writers (Borges in «The Circular Ruins»), films, and remains one of the most-known phrases in China.',
    items: [
      { hanzi: '庄子', pinyin: 'zhuāng zǐ', meaning: 'Zhuang Zi', meaningEn: 'Zhuang Zi', audio: 'audio/hsk6/hsk6_庄子.wav' },
      { hanzi: '庄周梦蝶', pinyin: 'zhuāng zhōu mèng dié', meaning: 'rêve du papillon', meaningEn: 'butterfly dream', audio: 'audio/hsk6/hsk6_庄周.wav' },
      { hanzi: '蝴蝶', pinyin: 'hú dié', meaning: 'papillon', meaningEn: 'butterfly', audio: 'audio/hsk5/hsk5_蝴蝶.wav' },
      { hanzi: '梦', pinyin: 'mèng', meaning: 'rêve', meaningEn: 'dream', audio: 'audio/hsk4/hsk4_梦.wav' },
      { hanzi: '物化', pinyin: 'wù huà', meaning: 'transformation des choses', meaningEn: 'transformation of things', audio: 'audio/hsk6/hsk6_物化.wav' }
    ],
    tip:
      '« 庄周梦蝶 » est UNE référence philosophique passe-partout. Pour évoquer la fluidité de l\'identité, le rapport rêve/réalité, ou simplement signaler ton niveau lettré : « 这让我想起庄周梦蝶 » (cela me fait penser à Zhuang Zhou et au papillon). Effet immédiat sur l\'auditoire chinois cultivé.',
    tipEn:
      '«庄周梦蝶» is a CATCH-ALL philosophical reference. To evoke identity fluidity, dream/reality relation, or simply signal your literate level: «这让我想起庄周梦蝶» (this reminds me of Zhuang Zhou and the butterfly). Immediate effect on cultured Chinese audience.'
  }
];

export const c21PhiloClassiqueM3LearnSections: LessonV2LearnSection[] = [
  {
    id: 'c21-fajia-pessimisme',
    title: '法家 — pessimisme anthropologique et droit',
    titleEn: '法家 — anthropological pessimism and law',
    body:
      'RÈGLE D\'OR : 法家 (l\'École des légistes) repose sur UN postulat — l\'homme est NATURELLEMENT MAUVAIS, intéressé, calculateur. Donc gouverner par la VERTU (option confucéenne) est utopique. Règle : il faut LA LOI 法 (fǎ), claire et appliquée à TOUS sans exception, soutenue par la RÉCOMPENSE et la PUNITION. Remarque : théoriciens 商鞅 (Shang Yang, IVe s. av. JC) appliqua le légisme au royaume de Qin, qui devint surpuissant et unifia la Chine en -221. 韩非 (Han Fei, IIIe s. av. JC) synthétisa la doctrine dans 《韩非子》. Astuce : triade légiste — 法 (la loi), 术 (les techniques de pouvoir/contrôle bureaucratique), 势 (la position de pouvoir, l\'autorité du trône). Pour Han Fei, un souverain doit MANIPULER les 3 leviers en parallèle. Attention : la gouvernance chinoise reste largement légiste sous une façade confucéenne.',
    bodyEn:
      '法家 (Legalist School) rests on ONE postulate: humans are NATURALLY BAD, self-interested, calculating. So governing by VIRTUE (Confucian option) is utopian. We need LAW 法, clear and applied to ALL without exception, backed by REWARD and PUNISHMENT. Theorists: 商鞅 (Shang Yang, 4th c. BCE) applied Legalism to the Qin kingdom, which became all-powerful and unified China in 221 BCE. 韩非 (Han Fei, 3rd c. BCE) synthesized the doctrine in 《韩非子》. Legalist triad: 法 (law), 术 (techniques of power/bureaucratic control), 势 (position of power, throne\'s authority). For Han Fei, a ruler must MANIPULATE the 3 levers in parallel. Modernity: Chinese governance remains largely Legalist under a Confucian facade.',
    items: [
      { hanzi: '法家', pinyin: 'fǎ jiā', meaning: 'École des légistes', meaningEn: 'Legalist School', audio: 'audio/hsk6/hsk6_法家.wav' },
      { hanzi: '商鞅', pinyin: 'shāng yāng', meaning: 'Shang Yang', meaningEn: 'Shang Yang', audio: 'audio/hsk6/hsk6_商鞅.wav' },
      { hanzi: '韩非', pinyin: 'hán fēi', meaning: 'Han Fei', meaningEn: 'Han Fei', audio: 'audio/hsk6/hsk6_韩非.wav' },
      { hanzi: '术', pinyin: 'shù', meaning: 'techniques (politiques)', meaningEn: 'techniques', audio: 'audio/hsk6/hsk6_术.wav' },
      { hanzi: '势', pinyin: 'shì', meaning: 'position de pouvoir', meaningEn: 'positional power', audio: 'audio/hsk6/hsk6_势.wav' }
    ],
    tip:
      'Pour analyser une décision politique chinoise, demande-toi laquelle des 3 logiques opère : 法 (cadre juridique nouveau), 术 (manœuvre interne au Parti), 势 (consolidation du pouvoir au sommet). Cette grille de lecture LÉGISTE éclaire la politique contemporaine mieux que les grilles occidentales habituelles.',
    tipEn:
      'To analyze a Chinese political decision, ask which of the 3 logics operates: 法 (new legal framework), 术 (intra-Party maneuver), 势 (consolidating power at the top). This LEGALIST reading grid illuminates contemporary politics better than usual Western grids.'
  },
  {
    id: 'c21-rubiaofali',
    title: '儒表法里 — la formule clé',
    titleEn: '儒表法里 — the key formula',
    body:
      'RÈGLE D\'OR : 儒表法里 (rú biǎo fǎ lǐ, « confucéen en façade, légiste à l\'intérieur ») = formule INVENTÉE PAR LES HISTORIENS pour caractériser la gouvernance chinoise depuis 2000 ans. Règle : les empereurs Han réhabilitent Confucius officiellement (l\'État se présente comme bienveillant), mais en pratique appliquent les méthodes légistes (lois strictes, bureaucratie centralisée, contrôle, punitions). Remarque : cette dualité explique pourquoi des observateurs occidentaux croient parfois la Chine « confucéenne et harmonieuse » alors que les leviers de pouvoir restent légistes. Astuce : la Chine de Xi Jinping s\'inscrit dans cette tradition — discours moral confucéen (中国梦, 共同富裕) + appareil de contrôle légiste (Big Data, score social, fermeté juridique). Attention : maîtriser 儒表法里 = clé de compréhension géopolitique.',
    bodyEn:
      '儒表法里 («Confucian on the surface, Legalist inside») = formula CREATED BY HISTORIANS to characterize Chinese governance for 2000 years. Han emperors officially rehabilitate Confucius (the State presents as benevolent), but in practice apply Legalist methods (strict laws, centralized bureaucracy, control, punishments). This duality explains why some Western observers think China «Confucian and harmonious» while power levers remain Legalist. Modernity: Xi Jinping\'s China continues this tradition — Confucian moral discourse (中国梦, 共同富裕) + Legalist control apparatus (Big Data, social score, legal firmness). Mastering 儒表法里 = geopolitical understanding key.',
    items: [
      { hanzi: '儒表法里', pinyin: 'rú biǎo fǎ lǐ', meaning: 'confucéen façade, légiste fond', meaningEn: 'Confucian outside, Legalist inside', audio: 'audio/hsk6/hsk6_儒表.wav' },
      { hanzi: '表面', pinyin: 'biǎo miàn', meaning: 'surface, façade', meaningEn: 'surface', audio: 'audio/hsk5/hsk5_表面.wav' },
      { hanzi: '里面', pinyin: 'lǐ miàn', meaning: 'intérieur', meaningEn: 'inside', audio: 'audio/hsk2/hsk2_里面.wav' },
      { hanzi: '治理', pinyin: 'zhì lǐ', meaning: 'gouvernance', meaningEn: 'governance', audio: 'audio/hsk6/hsk6_治理.wav' },
      { hanzi: '传统', pinyin: 'chuán tǒng', meaning: 'tradition', meaningEn: 'tradition', audio: 'audio/hsk5/hsk5_传统.wav' }
    ],
    tip:
      'En analyse politique avec un Chinois cultivé : « 中国治理一直是儒表法里 » (la gouvernance chinoise est toujours 儒表法里). Phrase qui SIGNE ta connaissance de la longue durée historique. Bien plus profonde que de simples observations sur l\'actualité. Effet immédiat sur la qualité du débat.',
    tipEn:
      'In political analysis with a cultured Chinese: «中国治理一直是儒表法里» (Chinese governance is always 儒表法里). Phrase that SIGNALS your knowledge of long historical duration. Far deeper than simple current-events observations. Immediate effect on debate quality.'
  }
];

export const c21PhiloClassiqueM4LearnSections: LessonV2LearnSection[] = [
  {
    id: 'c21-bouddhisme-arrivee',
    title: 'L\'arrivée du bouddhisme et sa sinisation',
    titleEn: 'Buddhism\'s arrival and sinicization',
    body:
      'Le 佛教 (bouddhisme) entre en Chine au Ier siècle de notre ère via la Route de la Soie (caravanes indo-chinoises). Remarque : premier temple 白马寺 (Baima Si, Temple du Cheval Blanc) à Luoyang, fondé en 68 sous l\'empereur Ming des Han. RÈGLE D\'OR : sous les Tang (618-907), explosion — traduction massive des sutras, création du 禅宗 (Chan, école méditative qui donnera le Zen au Japon), construction de monastères majeurs (莫高窟 Mogao, 龙门 Longmen). Règle : sinisation — le bouddhisme indien, abstrait, fusionne avec le 道 (Tao) chinois pour devenir plus PRATIQUE et IMAGÉ. Exception : le 观音 (Guanyin, bodhisattva de la compassion) se féminise en Chine (alors qu\'Avalokiteśvara est masculin en Inde). Astuce : aujourd\'hui ~250M de bouddhistes en Chine — plus grande population bouddhiste au monde.',
    bodyEn:
      '佛教 (Buddhism) enters China in the 1st century CE via the Silk Road (Indo-Chinese caravans). First temple: 白马寺 (White Horse Temple) in Luoyang, founded 68 CE under Emperor Ming of Han. Under the Tang (618-907), explosion: massive sutra translation, creation of 禅宗 (Chan, meditative school that becomes Zen in Japan), construction of major monasteries (莫高窟 Mogao, 龙门 Longmen). Sinicization: Indian Buddhism, abstract, fuses with Chinese 道 (Tao) to become more PRACTICAL and IMAGISTIC. 观音 (Guanyin, bodhisattva of compassion) feminizes in China (while Avalokiteśvara is masculine in India). Today: ~250M Buddhists in China — largest Buddhist population in the world.',
    items: [
      { hanzi: '佛教', pinyin: 'fó jiào', meaning: 'bouddhisme', meaningEn: 'Buddhism', audio: 'audio/hsk6/hsk6_佛教.wav' },
      { hanzi: '白马寺', pinyin: 'bái mǎ sì', meaning: 'Temple du Cheval Blanc', meaningEn: 'White Horse Temple', audio: 'audio/hsk6/hsk6_白马.wav' },
      { hanzi: '禅宗', pinyin: 'chán zōng', meaning: 'école Chan', meaningEn: 'Chan school', audio: 'audio/hsk6/hsk6_禅宗.wav' },
      { hanzi: '观音', pinyin: 'guān yīn', meaning: 'Guanyin (bodhisattva)', meaningEn: 'Guanyin', audio: 'audio/hsk6/hsk6_观音.wav' },
      { hanzi: '寺庙', pinyin: 'sì miào', meaning: 'temple bouddhiste', meaningEn: 'Buddhist temple', audio: 'audio/hsk5/hsk5_寺庙.wav' }
    ],
    tip:
      'Si tu visites Luoyang (Henan), va au 白马寺 et aux 龙门 (grottes). Ensemble UNESCO. Le 白马寺 est le PREMIER temple bouddhiste de Chine — racine d\'une tradition de 2000 ans. Pour un curieux de spiritualité chinoise, c\'est le pèlerinage initial.',
    tipEn:
      'If you visit Luoyang (Henan), go to 白马寺 and 龙门 (grottoes). UNESCO ensemble. 白马寺 is the FIRST Buddhist temple in China — root of a 2000-year tradition. For a Chinese spirituality enthusiast, it\'s the initial pilgrimage.'
  },
  {
    id: 'c21-chan-meditation',
    title: '禅 — méditer en silence',
    titleEn: '禅 — meditate in silence',
    body:
      'Règle : 禅 (chán) du sanskrit dhyāna (« méditation »), via le 禅宗 (école Chan) qui devient le 禅 japonais (Zen) après son passage par la Corée. RÈGLE D\'OR : originalité du Chan — refus des SUTRAS lourds, focus sur l\'ÉVEIL DIRECT par méditation 坐禅 (zuò chán, « assis à méditer », jap. zazen) et 公案 (gōng\'àn, koan, énigmes paradoxales). Remarque : maître Bodhidharma 达摩 aurait médité 9 ans face à un mur à Shaolin — modèle de la dévotion. Astuce : phrase Chan célèbre 不立文字，直指人心 = « ne s\'appuyer sur aucun mot, viser directement le cœur de l\'homme ». Attention : l\'éveil est INSTANTANÉ et HORS du langage. Remarque : pratique du 禅 reprend en Chine urbaine (retraites, applications de méditation), souvent sous forme laïque proche du mindfulness occidental.',
    bodyEn:
      '禅 (chán) from Sanskrit dhyāna («meditation»), via 禅宗 (Chan school) which becomes Japanese 禅 (Zen) after passing through Korea. Chan\'s originality: rejecting heavy SUTRAS, focus on DIRECT AWAKENING through meditation 坐禅 (sitting meditation, Jap. zazen) and 公案 (gong\'àn, koan, paradoxical riddles). Master Bodhidharma 达摩 reportedly meditated 9 years facing a wall at Shaolin — model of devotion. Famous Chan phrase: 不立文字，直指人心 = «not relying on any word, aiming directly at the human heart». Awakening is INSTANT and OUTSIDE language. Today: 禅 practice revives in urban China (retreats, meditation apps), often in lay form close to Western mindfulness.',
    items: [
      { hanzi: '禅', pinyin: 'chán', meaning: 'méditation Chan', meaningEn: 'Chan meditation', audio: 'audio/hsk6/hsk6_禅.wav' },
      { hanzi: '坐禅', pinyin: 'zuò chán', meaning: 'méditer assis', meaningEn: 'sitting meditation', audio: 'audio/hsk6/hsk6_坐禅.wav' },
      { hanzi: '公案', pinyin: 'gōng àn', meaning: 'koan', meaningEn: 'koan', audio: 'audio/hsk6/hsk6_公案.wav' },
      { hanzi: '达摩', pinyin: 'dá mó', meaning: 'Bodhidharma', meaningEn: 'Bodhidharma', audio: 'audio/hsk6/hsk6_达摩.wav' },
      { hanzi: '少林', pinyin: 'shào lín', meaning: 'Shaolin', meaningEn: 'Shaolin', audio: 'audio/hsk6/hsk6_少林.wav' }
    ],
    tip:
      'Si tu pratiques mindfulness ou méditation en Occident, c\'est une descendance directe du 禅 chinois. Mentionner cette filiation à un Chinois pratiquant : « 我的冥想习惯其实源于中国禅宗 » (ma pratique vient en fait du Chan chinois). Crée un PONT culturel immédiat.',
    tipEn:
      'If you practice mindfulness or meditation in the West, it\'s a direct descendant of Chinese 禅. Mentioning this lineage to a practicing Chinese: «我的冥想习惯其实源于中国禅宗» (my practice actually comes from Chinese Chan). Creates an immediate cultural BRIDGE.'
  }
];

// --- poetry -----------------------------------------------------------------

export const c21PoetryM1LearnSections: LessonV2LearnSection[] = [
  {
    id: 'c21-formes-juju',
    title: '绝句 — quatrains de 4 vers',
    titleEn: '绝句 — 4-line quatrains',
    body:
      'RÈGLE D\'OR : 绝句 (juéjù, « quatrain coupé ») = 4 vers, chacun de 5 caractères (五绝 wǔjué) ou 7 caractères (七绝 qījué). Remarque : forme la plus courte et la plus populaire de la poésie classique. Règle : contraintes — (1) RIME entre vers 2 et 4 (parfois aussi vers 1), (2) ALTERNANCE de tons plats (平 píng, ton 1 ou 2 en mandarin moderne) et obliques (仄 zè, tons 3 et 4), (3) PARALLÉLISME possible entre vers (ex : « ciel haut » ↔ « eau profonde »). Astuce : exemple emblématique 《静夜思》de Li Bai (5 char × 4 vers = 20 caractères seulement). Attention : le 绝句 condense en 20-28 caractères ce qu\'un poème français mettrait 4 strophes à exprimer. Économie radicale = leçon de style.',
    bodyEn:
      '绝句 (juéjù, «cut quatrain») = 4 lines, each 5 characters (五绝) or 7 characters (七绝). Shortest and most popular form of classical poetry. Constraints: (1) RHYME between lines 2 and 4 (sometimes also line 1), (2) ALTERNATION of level tones (平 píng, tone 1 or 2 in modern Mandarin) and oblique (仄 zè, tones 3 and 4), (3) Possible PARALLELISM between lines (ex: «high sky» ↔ «deep water»). Iconic example: Li Bai\'s 《静夜思》 (5 char × 4 lines = only 20 chars). The 绝句 condenses in 20-28 characters what a French poem would take 4 stanzas to express. Radical economy = style lesson.',
    items: [
      { hanzi: '绝句', pinyin: 'jué jù', meaning: 'quatrain', meaningEn: 'quatrain', audio: 'audio/hsk6/hsk6_绝句.wav' },
      { hanzi: '五绝', pinyin: 'wǔ jué', meaning: 'quatrain à 5 char.', meaningEn: '5-char quatrain', audio: 'audio/hsk6/hsk6_五绝.wav' },
      { hanzi: '七绝', pinyin: 'qī jué', meaning: 'quatrain à 7 char.', meaningEn: '7-char quatrain', audio: 'audio/hsk6/hsk6_七绝.wav' },
      { hanzi: '韵', pinyin: 'yùn', meaning: 'rime', meaningEn: 'rhyme', audio: 'audio/hsk6/hsk6_韵.wav' },
      { hanzi: '平仄', pinyin: 'píng zè', meaning: 'tons plats / obliques', meaningEn: 'level/oblique tones', audio: 'audio/hsk6/hsk6_平仄.wav' }
    ],
    tip:
      'Pour APPRÉCIER un 绝句, lis-le À VOIX HAUTE en chinois — la musicalité tonale est la moitié du sens. Une traduction plate perd 50% du poème. Investis 10 min dans la prononciation correcte d\'un seul 绝句, c\'est plus formateur que 100 traductions lues.',
    tipEn:
      'To APPRECIATE a 绝句, read ALOUD in Chinese — tonal musicality is half the meaning. A flat translation loses 50% of the poem. Invest 10 min in the correct pronunciation of a single 绝句 — more formative than 100 read translations.'
  },
  {
    id: 'c21-formes-lushi',
    title: '律诗 — poème régulé en 8 vers',
    titleEn: '律诗 — regulated poem in 8 lines',
    body:
      'RÈGLE D\'OR : 律诗 (lǜshī, « poème régulé ») = 8 vers, en 五律 ou 七律. Attention : beaucoup plus contraignant que le 绝句. Règle : règles formelles — (1) RIME aux vers 2, 4, 6, 8, (2) ALTERNANCE STRICTE de tons selon un schéma codifié, (3) ANTITHÈSE OBLIGATOIRE entre les vers 3-4 (paire centrale 1) et 5-6 (paire centrale 2). Astuce : l\'antithèse impose des correspondances syntaxiques + sémantiques entre les vers — nom ↔ nom, verbe ↔ verbe, adjectif ↔ adjectif, et catégories sémantiques cohérentes (couleur ↔ couleur, paysage ↔ paysage). Remarque : forme préférée de Du Fu (杜甫), surnommé « 诗圣 » (Sage de la poésie). Le 律诗 = sommet de la poésie chinoise classique en termes d\'EXIGENCE technique. Exception : forme TRÈS difficile à composer ; encore plus à traduire.',
    bodyEn:
      '律诗 (lǜshī, «regulated poem») = 8 lines, in 五律 or 七律. Much more demanding than the 绝句. Rules: (1) RHYME on lines 2, 4, 6, 8, (2) STRICT TONE ALTERNATION per a codified schema, (3) MANDATORY ANTITHESIS between lines 3-4 (central pair 1) and 5-6 (central pair 2). Antithesis imposes syntactic + semantic correspondences between lines: noun ↔ noun, verb ↔ verb, adjective ↔ adjective, and coherent semantic categories (color ↔ color, landscape ↔ landscape). Preferred form of Du Fu (杜甫), nicknamed «诗圣» (Sage of Poetry). 律诗 = summit of classical Chinese poetry in terms of TECHNICAL demand. VERY hard form to compose; even harder to translate.',
    items: [
      { hanzi: '律诗', pinyin: 'lǜ shī', meaning: 'poème régulé', meaningEn: 'regulated poem', audio: 'audio/hsk6/hsk6_律诗.wav' },
      { hanzi: '对仗', pinyin: 'duì zhàng', meaning: 'antithèse, parallélisme', meaningEn: 'parallelism', audio: 'audio/hsk6/hsk6_对仗.wav' },
      { hanzi: '诗圣', pinyin: 'shī shèng', meaning: 'Sage de la poésie', meaningEn: 'Sage of Poetry', audio: 'audio/hsk6/hsk6_诗圣.wav' },
      { hanzi: '严格', pinyin: 'yán gé', meaning: 'strict, rigoureux', meaningEn: 'strict', audio: 'audio/hsk5/hsk5_严格.wav' },
      { hanzi: '规则', pinyin: 'guī zé', meaning: 'règle', meaningEn: 'rule', audio: 'audio/hsk5/hsk5_规则.wav' }
    ],
    tip:
      'Si tu lis Du Fu (cf. leçon m3), prends UN 律诗 et passe 30 min à analyser : compte les 8 vers, repère les rimes en pinyin, identifie l\'antithèse 3-4 et 5-6. Cette analyse une fois faite déverrouille tous les autres 律诗. Investissement : 30 min. Bénéfice : compréhension de tout l\'art Du Fu.',
    tipEn:
      'If you read Du Fu (cf. m3), take ONE 律诗 and spend 30 min analyzing: count the 8 lines, spot the rhymes in pinyin, identify antitheses 3-4 and 5-6. Once done, unlocks all other 律诗. Investment: 30 min. Benefit: understanding all Du Fu\'s art.'
  }
];

export const c21PoetryM2LearnSections: LessonV2LearnSection[] = [
  {
    id: 'c21-libai-vie-style',
    title: '李白 — vie et style',
    titleEn: '李白 — life and style',
    body:
      '李白 (Li Bai, 701-762) né dans le Sichuan ou en Asie centrale (origine débattue). Remarque : talent précoce, poèmes recommandés à l\'empereur Tang Xuanzong, qui l\'invite à la cour. Exception : Li Bai préfère le vin et la liberté — se fâche avec les ministres, est éloigné. Vie de voyageur. Attention : mort tragique selon la légende — se serait noyé en essayant d\'embrasser le reflet de la lune dans un fleuve, ivre. RÈGLE D\'OR : style LIBRE, IMAGÉ, COSMIQUE. Astuce : thèmes obsessionnels — la lune 月, le vin 酒, la nature majestueuse, le voyage, la nostalgie 思乡. Règle : surnommé 诗仙 (« Immortel de la poésie ») par opposition à Du Fu, le « Sage ». Remarque : œuvres ~1000 poèmes conservés. Le quatrain le plus célèbre 《静夜思》(20 caractères seulement, étudié dans la prochaine leçon).',
    bodyEn:
      '李白 (Li Bai, 701-762) born in Sichuan or Central Asia (debated origin). Early talent: poems recommended to Tang emperor Xuanzong, who invites him to court. But Li Bai prefers wine and freedom: quarrels with ministers, is sent away. Life of a traveler. Tragic death per legend: drowned trying to embrace the moon\'s reflection in a river, drunk. Style: FREE, IMAGISTIC, COSMIC. Obsessive themes: the moon 月, wine 酒, majestic nature, travel, nostalgia 思乡. Nicknamed 诗仙 («Immortal of Poetry») in contrast to Du Fu, the «Sage». Works: ~1000 surviving poems. Most famous quatrain: 《静夜思》(only 20 characters, studied next lesson).',
    items: [
      { hanzi: '李白', pinyin: 'lǐ bái', meaning: 'Li Bai', meaningEn: 'Li Bai', audio: 'audio/hsk5/hsk5_李白.wav' },
      { hanzi: '诗仙', pinyin: 'shī xiān', meaning: 'Immortel de la poésie', meaningEn: 'Immortal of Poetry', audio: 'audio/hsk6/hsk6_诗仙.wav' },
      { hanzi: '月', pinyin: 'yuè', meaning: 'lune', meaningEn: 'moon', audio: 'audio/hsk1/hsk1_月.wav' },
      { hanzi: '酒', pinyin: 'jiǔ', meaning: 'alcool, vin', meaningEn: 'wine, alcohol', audio: 'audio/hsk3/hsk3_酒.wav' },
      { hanzi: '思乡', pinyin: 'sī xiāng', meaning: 'nostalgie du pays', meaningEn: 'homesickness', audio: 'audio/hsk6/hsk6_思乡.wav' }
    ],
    tip:
      'Li Bai est UN poète à choisir comme « ton préféré » dans une discussion littéraire chinoise. Universellement aimé, accessible, romantique. Phrase utile : « 我最喜欢的中国诗人是李白 » (mon poète chinois préféré est Li Bai). Réponse 100% sécure qui ouvre une vraie discussion.',
    tipEn:
      'Li Bai is the poet to pick as «your favorite» in a Chinese literary discussion. Universally loved, accessible, romantic. Useful phrase: «我最喜欢的中国诗人是李白» (my favorite Chinese poet is Li Bai). 100% safe answer that opens a real discussion.'
  },
  {
    id: 'c21-jingye-si',
    title: '《静夜思》— le poème le plus connu',
    titleEn: '《静夜思》— the most famous poem',
    body:
      '《静夜思》(Jìngyè sī, « Pensée d\'une nuit paisible ») de Li Bai. RÈGLE D\'OR : 20 caractères 床前明月光，疑是地上霜。举头望明月，低头思故乡。 Astuce : décortiquons — 床前 (devant le lit) 明月光 (la clarté de la lune brillante), 疑 (je doute) 是 (que ce soit) 地上霜 (givre sur le sol). 举头 (je lève la tête) 望 (et regarde) 明月 (la lune brillante), 低头 (je baisse la tête) 思 (et pense à) 故乡 (mon pays natal). Remarque : mécanisme poétique — la confusion lune/givre crée le frisson, le mouvement haut/bas crée le balancement émotionnel, la lune devient le PONT entre l\'exilé et la maison. Attention : CHAQUE Chinois (école primaire) connaît ce poème PAR CŒUR. Règle : si tu peux le réciter, tu peux nouer une discussion poétique avec n\'importe quel Chinois.',
    bodyEn:
      '《静夜思》(«Thoughts on a Quiet Night») by Li Bai. 20 characters: 床前明月光，疑是地上霜。举头望明月，低头思故乡。 Let\'s parse: 床前 (before the bed) 明月光 (the bright moonlight), 疑 (I doubt) 是 (it is) 地上霜 (frost on the ground). 举头 (I lift my head) 望 (and look at) 明月 (the bright moon), 低头 (I lower my head) 思 (and think of) 故乡 (my home village). Poetic mechanism: the moon/frost confusion creates a chill, up/down movement creates emotional swing, the moon becomes the BRIDGE between the exile and home. EVERY Chinese (primary school) knows this poem BY HEART. If you can recite it, you can strike up a poetic discussion with any Chinese.',
    items: [
      { hanzi: '静夜思', pinyin: 'jìng yè sī', meaning: 'Pensée nocturne', meaningEn: 'Quiet Night Thought', audio: 'audio/hsk6/hsk6_静夜思.wav' },
      { hanzi: '床前', pinyin: 'chuáng qián', meaning: 'devant le lit', meaningEn: 'before the bed', audio: 'audio/hsk5/hsk5_床.wav' },
      { hanzi: '霜', pinyin: 'shuāng', meaning: 'givre', meaningEn: 'frost', audio: 'audio/hsk6/hsk6_霜.wav' },
      { hanzi: '低头', pinyin: 'dī tóu', meaning: 'baisser la tête', meaningEn: 'lower head', audio: 'audio/hsk5/hsk5_低头.wav' },
      { hanzi: '故乡', pinyin: 'gù xiāng', meaning: 'pays natal', meaningEn: 'native village', audio: 'audio/hsk5/hsk5_故乡.wav' }
    ],
    tip:
      'Apprends ces 20 caractères PAR CŒUR. C\'est l\'investissement n°1 de niveau C2.1. Si tu peux les RÉCITER en chinois en discussion, tu signales un niveau qui suspendra la conversation : « vous connaissez Jingye Si en chinois ? ». Effet émotionnel garanti.',
    tipEn:
      'Learn these 20 characters BY HEART. It\'s C2.1 level investment #1. If you can RECITE them in Chinese in conversation, you signal a level that will suspend the conversation: «you know Jingye Si in Chinese?». Guaranteed emotional effect.'
  }
];

export const c21PoetryM3LearnSections: LessonV2LearnSection[] = [
  {
    id: 'c21-dufu-vie',
    title: '杜甫 — la conscience de son époque',
    titleEn: '杜甫 — the conscience of his era',
    body:
      '杜甫 (Du Fu, 712-770) né à Henan. Remarque : ami et contemporain de Li Bai (ils se rencontrent en 744), mais vie radicalement différente — fonctionnaire malheureux, témoin de la révolte d\'An Lushan (755-763) qui ravage l\'empire Tang. RÈGLE D\'OR : sa poésie devient le MIROIR DE LA SOUFFRANCE collective — guerre, exil, faim, famille séparée, désastres naturels. Règle : surnommé 诗圣 (« Sage de la poésie ») et 诗史 (« Histoire en poèmes ») car ses œuvres documentent l\'époque. Astuce : style RIGOUREUX (maître du 律诗), GRAVE, MORAL. Œuvres marquantes 《春望》(le printemps regardé pendant la guerre), 《茅屋为秋风所破歌》(sa hutte de chaume détruite par le vent d\'automne — il pense aux pauvres avant à lui-même). Attention : mort en 770, malade, sur un bateau. Remarque : la maison de Du Fu à Chengdu (杜甫草堂) est un musée majeur.',
    bodyEn:
      '杜甫 (Du Fu, 712-770) born in Henan. Friend and contemporary of Li Bai (they meet in 744), but radically different life: unhappy official, witness of the An Lushan rebellion (755-763) that ravages the Tang empire. His poetry becomes the MIRROR OF COLLECTIVE SUFFERING: war, exile, hunger, family separation, natural disasters. Nicknamed 诗圣 («Sage of Poetry») and 诗史 («History in Poems») as his works document the era. Style: RIGOROUS (master of 律诗), GRAVE, MORAL. Major works: 《春望》(spring viewed during war), 《茅屋为秋风所破歌》(his thatched hut destroyed by autumn wind — he thinks of the poor before himself). Dies in 770, sick, on a boat. Today: Du Fu\'s home in Chengdu (杜甫草堂) is a major museum.',
    items: [
      { hanzi: '杜甫', pinyin: 'dù fǔ', meaning: 'Du Fu', meaningEn: 'Du Fu', audio: 'audio/hsk6/hsk6_杜甫.wav' },
      { hanzi: '诗圣', pinyin: 'shī shèng', meaning: 'Sage de la poésie', meaningEn: 'Sage of Poetry', audio: 'audio/hsk6/hsk6_诗圣.wav' },
      { hanzi: '安史之乱', pinyin: 'ān shǐ zhī luàn', meaning: 'révolte d\'An Lushan', meaningEn: 'An Lushan rebellion', audio: 'audio/hsk6/hsk6_安史.wav' },
      { hanzi: '草堂', pinyin: 'cǎo táng', meaning: 'hutte de chaume', meaningEn: 'thatched cottage', audio: 'audio/hsk6/hsk6_草堂.wav' },
      { hanzi: '苦难', pinyin: 'kǔ nàn', meaning: 'souffrance', meaningEn: 'suffering', audio: 'audio/hsk6/hsk6_苦难.wav' }
    ],
    tip:
      'Si tu visites Chengdu (Sichuan), va au 杜甫草堂 — reconstitution du jardin où Du Fu vécut, paisible, instructif, gratuit. Pour qui aime la poésie, c\'est un lieu de RECUEILLEMENT. Plus discret que les sites de Li Bai et plus émouvant pour beaucoup de Chinois.',
    tipEn:
      'If you visit Chengdu (Sichuan), go to 杜甫草堂 — reconstruction of the garden where Du Fu lived, peaceful, instructive, free. For poetry lovers, a place of RECOLLECTION. Quieter than Li Bai sites and more moving for many Chinese.',
  },
  {
    id: 'c21-libai-vs-dufu',
    title: '李白 vs 杜甫 — deux pôles de l\'âme chinoise',
    titleEn: '李白 vs 杜甫 — two poles of the Chinese soul',
    body:
      'RÈGLE D\'OR : Li Bai et Du Fu sont l\'OPPOSITION fondamentale de la poésie chinoise. Règle : Li Bai = JOIE, IVRESSE, COSMOS, LIBERTÉ INDIVIDUELLE. Du Fu = SOUFFRANCE, RIGUEUR, MORALE, ENGAGEMENT COLLECTIF. Remarque : surnommés 诗仙 (Immortel) vs 诗圣 (Sage). Astuce : cette opposition est l\'équivalent chinois de Dionysos vs Apollon, de Rimbaud vs Hugo, de l\'individuel vs le collectif, du romantisme vs le classicisme. Attention : poser la question à un Chinois cultivé « 您更喜欢李白还是杜甫 ? » (vous préférez Li Bai ou Du Fu ?) ouvre une discussion révélatrice. Beaucoup avouent « jeune, j\'aimais Li Bai ; en vieillissant, je préfère Du Fu ». Exception : l\'évolution Li Bai → Du Fu suit la maturité psychologique. Question MAGIQUE pour démarrer un débat littéraire profond.',
    bodyEn:
      'Li Bai and Du Fu are the fundamental OPPOSITION in Chinese poetry. Li Bai = JOY, INTOXICATION, COSMOS, INDIVIDUAL FREEDOM. Du Fu = SUFFERING, RIGOR, MORALITY, COLLECTIVE ENGAGEMENT. Nicknamed 诗仙 (Immortal) vs 诗圣 (Sage). This opposition is the Chinese equivalent of Dionysus vs Apollo, Rimbaud vs Hugo, individual vs collective, Romanticism vs Classicism. Asking a cultured Chinese: «您更喜欢李白还是杜甫?» (do you prefer Li Bai or Du Fu?) opens a revealing discussion. Many confess: «young, I loved Li Bai; aging, I prefer Du Fu». The Li Bai → Du Fu evolution follows psychological maturity. MAGIC question to launch a deep literary debate.',
    items: [
      { hanzi: '对比', pinyin: 'duì bǐ', meaning: 'contraste', meaningEn: 'contrast', audio: 'audio/hsk5/hsk5_对比.wav' },
      { hanzi: '浪漫', pinyin: 'làng màn', meaning: 'romantique', meaningEn: 'romantic', audio: 'audio/hsk5/hsk5_浪漫.wav' },
      { hanzi: '严肃', pinyin: 'yán sù', meaning: 'sérieux, grave', meaningEn: 'grave, serious', audio: 'audio/hsk5/hsk5_严肃.wav' },
      { hanzi: '成熟', pinyin: 'chéng shú', meaning: 'mûr, mature', meaningEn: 'mature', audio: 'audio/hsk5/hsk5_成熟.wav' },
      { hanzi: '偏爱', pinyin: 'piān ài', meaning: 'préférence', meaningEn: 'preference', audio: 'audio/hsk6/hsk6_偏爱.wav' }
    ],
    tip:
      'Pour conclure une discussion poétique, dis : « 我年轻时喜欢李白，现在更欣赏杜甫的深度 » (jeune j\'aimais Li Bai, maintenant j\'apprécie davantage la profondeur de Du Fu). Phrase qui SIGNALE ta maturité intellectuelle ET ta connaissance des 2 poètes. Effet immédiat sur la perception de ton interlocuteur.',
    tipEn:
      'To conclude a poetic discussion, say: «我年轻时喜欢李白，现在更欣赏杜甫的深度» (young I loved Li Bai, now I appreciate Du Fu\'s depth more). Phrase that SIGNALS your intellectual maturity AND knowledge of both poets. Immediate effect on your interlocutor\'s perception.'
  }
];

export const c21PoetryM4LearnSections: LessonV2LearnSection[] = [
  {
    id: 'c21-liqingzhao-vie',
    title: '李清照 — la voix féminine majeure',
    titleEn: '李清照 — the major feminine voice',
    body:
      '李清照 (Li Qingzhao, 1084-1155) née sous les Song du Nord dans une famille lettrée : père haut fonctionnaire, mère cultivée. Remarque : mariée à 18 ans à 赵明诚 (Zhao Mingcheng), érudit collectionneur d\'antiques. Couple intellectuel HARMONIEUX qui collabore sur 《金石录》(catalogue d\'inscriptions). Règle : poésie de 1re moitié de vie — JOIE conjugale, vie raffinée. Attention : CATASTROPHE en 1127 — invasion Jürchen, exil au sud, perte de leurs collections, mort de son mari en 1129. Exception : poésie de 2e moitié — DEUIL et SOLITUDE. Astuce : spécialiste du 词 (poésie chantée Song). Œuvre la plus citée 《声声慢》qui s\'ouvre par 7 redoublements consécutifs — 寻寻觅觅，冷冷清清，凄凄惨惨戚戚 — climat de désolation incomparable. RÈGLE D\'OR : surnommée 千古第一才女 (« 1re femme de génie à travers les siècles »). Remarque : prouve que la littérature classique chinoise a fait place à des voix féminines d\'exception.',
    bodyEn:
      '李清照 (Li Qingzhao, 1084-1155) born under Northern Song in a literate family: father high official, cultured mother. Married at 18 to 赵明诚 (Zhao Mingcheng), erudite antique collector. HARMONIOUS intellectual couple who collaborate on 《金石录》(catalog of inscriptions). 1st-half-of-life poetry: marital JOY, refined life. DISASTER in 1127: Jurchen invasion, exile south, loss of collections, husband\'s death in 1129. 2nd-half poetry: GRIEF and SOLITUDE. Specialist of 词 (Song sung poetry). Most-cited work: 《声声慢》opening with 7 consecutive reduplications: 寻寻觅觅，冷冷清清，凄凄惨惨戚戚 — incomparable climate of desolation. Nicknamed 千古第一才女 («1st genius woman through the ages»). Proves classical Chinese literature made room for exceptional female voices.',
    items: [
      { hanzi: '李清照', pinyin: 'lǐ qīng zhào', meaning: 'Li Qingzhao', meaningEn: 'Li Qingzhao', audio: 'audio/hsk6/hsk6_李清照.wav' },
      { hanzi: '词', pinyin: 'cí', meaning: 'poème chanté Song', meaningEn: 'Song sung poem', audio: 'audio/hsk5/hsk5_词.wav' },
      { hanzi: '才女', pinyin: 'cái nǚ', meaning: 'femme de génie', meaningEn: 'woman of genius', audio: 'audio/hsk6/hsk6_才女.wav' },
      { hanzi: '千古', pinyin: 'qiān gǔ', meaning: 'millénaire, à travers les siècles', meaningEn: 'through the ages', audio: 'audio/hsk6/hsk6_千古.wav' },
      { hanzi: '寻觅', pinyin: 'xún mì', meaning: 'chercher (poétique)', meaningEn: 'seek (poetic)', audio: 'audio/hsk6/hsk6_寻觅.wav' }
    ],
    tip:
      'Mentionner 李清照 dans une discussion de poésie chinoise est UN signal de connaissance fine. La plupart des étrangers connaissent Li Bai et Du Fu mais s\'arrêtent là. Citer une POÉTESSE = montrer que tu vas au-delà du canon scolaire. Effet : « ce francophone connaît la littérature chinoise PROFONDÉMENT ».',
    tipEn:
      'Mentioning 李清照 in a Chinese poetry discussion is a SIGNAL of fine knowledge. Most foreigners know Li Bai and Du Fu but stop there. Citing a POETESS = showing you go beyond the school canon. Effect: «this Francophone knows Chinese literature DEEPLY».'
  },
  {
    id: 'c21-shengshengman-redoublements',
    title: '《声声慢》— l\'art des redoublements',
    titleEn: '《声声慢》— the art of reduplications',
    body:
      'RÈGLE D\'OR : 《声声慢》(Shēng shēng màn, « Lentement, son après son ») s\'ouvre par 14 caractères en 7 paires de redoublements — 寻寻 (xún xún, chercher chercher) 觅觅 (mì mì, chercher chercher) 冷冷 (lěng lěng, froid froid) 清清 (qīng qīng, désolé désolé) 凄凄 (qī qī, mélancolique mélancolique) 惨惨 (cǎn cǎn, désespéré désespéré) 戚戚 (qī qī, navrant navrant). Exception : aucune autre ouverture en littérature mondiale n\'utilise 7 redoublements consécutifs. Remarque : l\'effet est un climat physiquement RESSENTI de DÉSOLATION. Astuce : la traduction française la plus connue rend « Je cherche, je cherche, froid désolé, triste triste navrant ». Règle : ce poème est étudié dans TOUS les manuels chinois et reste l\'un des sommets absolus du 词 Song. Attention : le mémoriser est un défi à la portée d\'un C2.1 motivé.',
    bodyEn:
      '《声声慢》(«Slowly, sound after sound») opens with 14 characters in 7 reduplication pairs: 寻寻 (seek seek) 觅觅 (search search) 冷冷 (cold cold) 清清 (desolate desolate) 凄凄 (melancholy melancholy) 惨惨 (despairing despairing) 戚戚 (heartbreaking heartbreaking). No other opening in world literature uses 7 consecutive reduplications. The effect: a physically FELT climate of DESOLATION. The most known English translation renders: «I seek, I seek, cold and desolate, sad sad and heart-rending». This poem is studied in ALL Chinese textbooks and remains one of the absolute summits of Song 词. Memorizing it is a challenge within reach of a motivated C2.1.',
    items: [
      { hanzi: '声声慢', pinyin: 'shēng shēng màn', meaning: 'Slowly, sound after sound', meaningEn: 'Slowly, sound after sound', audio: 'audio/hsk6/hsk6_声声慢.wav' },
      { hanzi: '寻觅', pinyin: 'xún mì', meaning: 'rechercher', meaningEn: 'search', audio: 'audio/hsk6/hsk6_寻觅.wav' },
      { hanzi: '凄凉', pinyin: 'qī liáng', meaning: 'désolé, glaçant', meaningEn: 'desolate', audio: 'audio/hsk6/hsk6_凄凉.wav' },
      { hanzi: '惨', pinyin: 'cǎn', meaning: 'désespéré, sombre', meaningEn: 'despairing', audio: 'audio/hsk6/hsk6_惨.wav' },
      { hanzi: '戚', pinyin: 'qī', meaning: 'navrant, accablant', meaningEn: 'heart-rending', audio: 'audio/hsk6/hsk6_戚.wav' }
    ],
    tip:
      'Si tu mémorises les 14 premiers caractères de 《声声慢》et que tu peux les RÉCITER en chinois, c\'est UNE prouesse C2.2 qui suspendra n\'importe quelle conversation littéraire. Investis 1 heure de mémorisation — bénéfice durable. Phrase pour conclure : « 这种感觉，李清照写得最深刻 » (ce sentiment, c\'est Li Qingzhao qui l\'a écrit le plus profondément).',
    tipEn:
      'If you memorize the first 14 characters of 《声声慢》and can RECITE them in Chinese, it\'s a C2.2 feat that will suspend any literary conversation. Invest 1 hour of memorization — lasting benefit. Phrase to close: «这种感觉，李清照写得最深刻» (this feeling, Li Qingzhao wrote it most deeply).'
  }
];
