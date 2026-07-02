/**
 * cecr-b2-vocab.ts
 * ----------------
 * Vocabulaire actif B2.1 rédigé à la main — extension V8 du supplément de
 * flashcards. Ces entrées gonflent le lexique disponible pour les leçons
 * tech, environnement, économie et registre formel.
 *
 * Chaque item respecte le type LessonItem (types/index.ts) et est indexé
 * par hanzi + id dans lessons.ts, exactement comme supplement-flashcards.
 *
 * Convention :
 *   - id : `cecr-b21-vocab-<theme>-<slug>`
 *   - level : hsk5 ou hsk6 (B2.1 ~ transition HSK 5→6)
 *   - tags : ['cecr-v8', 'b2.1', '<theme>']
 *   - theme : label thématique humain
 *   - examples : au moins une phrase contextualisée.
 *
 * Le contenu est pensé pour nourrir à la fois les flashcards V3 (SRS) et
 * les exercices enrichis de cecr-exercises-enriched.ts.
 */

import type { LessonItem } from '../types';

// ============================================================================
//  B2.1 — TECH & INNOVATION
// ============================================================================

const B21_TECH: LessonItem[] = [
  {
    id: 'cecr-b21-vocab-tech-ai',
    level: 'hsk6',
    hanzi: '人工智能',
    pinyin: 'réngōng zhìnéng',
    translation: 'artificial intelligence',
    translationFr: 'intelligence artificielle',
    category: 'vocabulaire',
    examples: [
      {
        hanzi: '人工智能正在改变我们的工作方式。',
        pinyin: 'Réngōng zhìnéng zhèngzài gǎibiàn wǒmen de gōngzuò fāngshì.',
        translation: 'AI is changing the way we work.',
        translationFr: "L'IA est en train de transformer nos méthodes de travail."
      }
    ],
    tags: ['cecr-v8', 'b2.1', 'tech'],
    theme: 'technologie'
  },
  {
    id: 'cecr-b21-vocab-tech-algorithm',
    level: 'hsk6',
    hanzi: '算法',
    pinyin: 'suànfǎ',
    translation: 'algorithm',
    translationFr: 'algorithme',
    category: 'vocabulaire',
    examples: [
      {
        hanzi: '这个算法可以识别图像中的物体。',
        pinyin: 'Zhège suànfǎ kěyǐ shíbié túxiàng zhōng de wùtǐ.',
        translation: 'This algorithm can recognize objects in images.',
        translationFr: 'Cet algorithme peut identifier des objets dans les images.'
      }
    ],
    tags: ['cecr-v8', 'b2.1', 'tech'],
    theme: 'technologie'
  },
  {
    id: 'cecr-b21-vocab-tech-model',
    level: 'hsk6',
    hanzi: '大模型',
    pinyin: 'dà móxíng',
    translation: 'large (AI) model',
    translationFr: 'grand modèle (IA)',
    category: 'vocabulaire',
    examples: [
      {
        hanzi: '许多公司都在开发自己的大模型。',
        pinyin: 'Xǔduō gōngsī dōu zài kāifā zìjǐ de dà móxíng.',
        translation: 'Many companies are developing their own large models.',
        translationFr: 'De nombreuses entreprises développent leurs propres grands modèles.'
      }
    ],
    tags: ['cecr-v8', 'b2.1', 'tech'],
    theme: 'technologie'
  },
  {
    id: 'cecr-b21-vocab-tech-data',
    level: 'hsk5',
    hanzi: '数据',
    pinyin: 'shùjù',
    translation: 'data',
    translationFr: 'données',
    category: 'vocabulaire',
    examples: [
      {
        hanzi: '我们需要更多的数据来训练模型。',
        pinyin: 'Wǒmen xūyào gèng duō de shùjù lái xùnliàn móxíng.',
        translation: 'We need more data to train the model.',
        translationFr: "Il nous faut davantage de données pour entraîner le modèle."
      }
    ],
    tags: ['cecr-v8', 'b2.1', 'tech'],
    theme: 'technologie'
  },
  {
    id: 'cecr-b21-vocab-tech-dataset',
    level: 'hsk6',
    hanzi: '数据集',
    pinyin: 'shùjùjí',
    translation: 'dataset',
    translationFr: 'jeu de données',
    category: 'vocabulaire',
    examples: [
      {
        hanzi: '这个数据集包含一百万张图片。',
        pinyin: 'Zhège shùjùjí bāohán yī bǎi wàn zhāng túpiàn.',
        translation: 'This dataset contains one million images.',
        translationFr: "Ce jeu de données contient un million d'images."
      }
    ],
    tags: ['cecr-v8', 'b2.1', 'tech'],
    theme: 'technologie'
  },
  {
    id: 'cecr-b21-vocab-tech-train',
    level: 'hsk6',
    hanzi: '训练',
    pinyin: 'xùnliàn',
    translation: 'to train (a model)',
    translationFr: 'entraîner (un modèle)',
    category: 'vocabulaire',
    examples: [
      {
        hanzi: '训练一个大模型需要很多算力。',
        pinyin: 'Xùnliàn yīgè dà móxíng xūyào hěn duō suànlì.',
        translation: 'Training a large model requires a lot of compute.',
        translationFr: "Entraîner un grand modèle demande beaucoup de puissance de calcul."
      }
    ],
    tags: ['cecr-v8', 'b2.1', 'tech'],
    theme: 'technologie'
  },
  {
    id: 'cecr-b21-vocab-tech-compute',
    level: 'hsk6',
    hanzi: '算力',
    pinyin: 'suànlì',
    translation: 'computing power',
    translationFr: 'puissance de calcul',
    category: 'vocabulaire',
    examples: [
      {
        hanzi: '全球对算力的需求正在迅速增长。',
        pinyin: 'Quánqiú duì suànlì de xūqiú zhèngzài xùnsù zēngzhǎng.',
        translation: 'Global demand for computing power is rising quickly.',
        translationFr: "La demande mondiale en puissance de calcul augmente rapidement."
      }
    ],
    tags: ['cecr-v8', 'b2.1', 'tech'],
    theme: 'technologie'
  },
  {
    id: 'cecr-b21-vocab-tech-chip',
    level: 'hsk6',
    hanzi: '芯片',
    pinyin: 'xīnpiàn',
    translation: 'chip, semiconductor',
    translationFr: 'puce, semi-conducteur',
    category: 'vocabulaire',
    examples: [
      {
        hanzi: '高端芯片已成为地缘政治的焦点。',
        pinyin: 'Gāoduān xīnpiàn yǐ chéngwéi dìyuán zhèngzhì de jiāodiǎn.',
        translation: 'High-end chips have become a geopolitical focal point.',
        translationFr: "Les puces haut de gamme sont devenues un enjeu géopolitique majeur."
      }
    ],
    tags: ['cecr-v8', 'b2.1', 'tech'],
    theme: 'technologie'
  },
  {
    id: 'cecr-b21-vocab-tech-semiconductor',
    level: 'hsk6',
    hanzi: '半导体',
    pinyin: 'bàndǎotǐ',
    translation: 'semiconductor',
    translationFr: 'semi-conducteur',
    category: 'vocabulaire',
    examples: [
      {
        hanzi: '半导体产业链十分复杂。',
        pinyin: 'Bàndǎotǐ chǎnyèliàn shífēn fùzá.',
        translation: 'The semiconductor supply chain is extremely complex.',
        translationFr: "La chaîne de valeur des semi-conducteurs est extrêmement complexe."
      }
    ],
    tags: ['cecr-v8', 'b2.1', 'tech'],
    theme: 'technologie'
  },
  {
    id: 'cecr-b21-vocab-tech-cloud',
    level: 'hsk6',
    hanzi: '云计算',
    pinyin: 'yún jìsuàn',
    translation: 'cloud computing',
    translationFr: 'informatique en nuage',
    category: 'vocabulaire',
    examples: [
      {
        hanzi: '越来越多的企业把业务迁移到云计算平台上。',
        pinyin: 'Yuè lái yuè duō de qǐyè bǎ yèwù qiānyí dào yún jìsuàn píngtái shàng.',
        translation: 'More and more companies are migrating their business to cloud platforms.',
        translationFr: "De plus en plus d'entreprises migrent leurs activités sur des plateformes cloud."
      }
    ],
    tags: ['cecr-v8', 'b2.1', 'tech'],
    theme: 'technologie'
  },
  {
    id: 'cecr-b21-vocab-tech-server',
    level: 'hsk6',
    hanzi: '服务器',
    pinyin: 'fúwùqì',
    translation: 'server',
    translationFr: 'serveur',
    category: 'vocabulaire',
    examples: [
      {
        hanzi: '服务器故障导致网站瘫痪了几个小时。',
        pinyin: 'Fúwùqì gùzhàng dǎozhì wǎngzhàn tānhuànle jǐ gè xiǎoshí.',
        translation: 'A server failure brought the site down for several hours.',
        translationFr: "Une panne de serveur a rendu le site inaccessible pendant plusieurs heures."
      }
    ],
    tags: ['cecr-v8', 'b2.1', 'tech'],
    theme: 'technologie'
  },
  {
    id: 'cecr-b21-vocab-tech-bandwidth',
    level: 'hsk6',
    hanzi: '带宽',
    pinyin: 'dàikuān',
    translation: 'bandwidth',
    translationFr: 'bande passante',
    category: 'vocabulaire',
    examples: [
      {
        hanzi: '视频会议需要足够的带宽。',
        pinyin: 'Shìpín huìyì xūyào zúgòu de dàikuān.',
        translation: 'Video conferencing requires sufficient bandwidth.',
        translationFr: "La visioconférence exige une bande passante suffisante."
      }
    ],
    tags: ['cecr-v8', 'b2.1', 'tech'],
    theme: 'technologie'
  },
  {
    id: 'cecr-b21-vocab-tech-5g',
    level: 'hsk6',
    hanzi: '第五代移动通信',
    pinyin: 'dì wǔ dài yídòng tōngxìn',
    translation: '5G mobile communication',
    translationFr: 'communication mobile 5G',
    category: 'vocabulaire',
    examples: [
      {
        hanzi: '第五代移动通信让远程手术成为可能。',
        pinyin: 'Dì wǔ dài yídòng tōngxìn ràng yuǎnchéng shǒushù chéngwéi kěnéng.',
        translation: '5G makes remote surgery possible.',
        translationFr: "La 5G rend possible la chirurgie à distance."
      }
    ],
    tags: ['cecr-v8', 'b2.1', 'tech'],
    theme: 'technologie'
  },
  {
    id: 'cecr-b21-vocab-tech-autonomous',
    level: 'hsk6',
    hanzi: '自动驾驶',
    pinyin: 'zìdòng jiàshǐ',
    translation: 'autonomous driving',
    translationFr: 'conduite autonome',
    category: 'vocabulaire',
    examples: [
      {
        hanzi: '自动驾驶技术仍需大量安全测试。',
        pinyin: 'Zìdòng jiàshǐ jìshù réng xū dàliàng ānquán cèshì.',
        translation: 'Autonomous driving still requires extensive safety testing.',
        translationFr: "La conduite autonome requiert encore de nombreux tests de sécurité."
      }
    ],
    tags: ['cecr-v8', 'b2.1', 'tech'],
    theme: 'technologie'
  },
  {
    id: 'cecr-b21-vocab-tech-robot',
    level: 'hsk6',
    hanzi: '机器人',
    pinyin: 'jīqìrén',
    translation: 'robot',
    translationFr: 'robot',
    category: 'vocabulaire',
    examples: [
      {
        hanzi: '工厂里的机器人提高了生产效率。',
        pinyin: 'Gōngchǎng lǐ de jīqìrén tígāole shēngchǎn xiàolǜ.',
        translation: 'Factory robots have boosted productivity.',
        translationFr: "Les robots des usines ont amélioré la productivité."
      }
    ],
    tags: ['cecr-v8', 'b2.1', 'tech'],
    theme: 'technologie'
  },
  {
    id: 'cecr-b21-vocab-tech-virtualreality',
    level: 'hsk6',
    hanzi: '虚拟现实',
    pinyin: 'xūnǐ xiànshí',
    translation: 'virtual reality (VR)',
    translationFr: 'réalité virtuelle',
    category: 'vocabulaire',
    examples: [
      {
        hanzi: '虚拟现实已经应用于医学培训。',
        pinyin: 'Xūnǐ xiànshí yǐjīng yìngyòng yú yīxué péixùn.',
        translation: 'VR is already used in medical training.',
        translationFr: "La réalité virtuelle est déjà utilisée dans la formation médicale."
      }
    ],
    tags: ['cecr-v8', 'b2.1', 'tech'],
    theme: 'technologie'
  },
  {
    id: 'cecr-b21-vocab-tech-ar',
    level: 'hsk6',
    hanzi: '增强现实',
    pinyin: 'zēngqiáng xiànshí',
    translation: 'augmented reality (AR)',
    translationFr: 'réalité augmentée',
    category: 'vocabulaire',
    examples: [
      {
        hanzi: '增强现实可以帮助维修工程师识别零件。',
        pinyin: 'Zēngqiáng xiànshí kěyǐ bāngzhù wéixiū gōngchéngshī shíbié língjiàn.',
        translation: 'AR can help maintenance engineers identify parts.',
        translationFr: "La réalité augmentée aide les techniciens à identifier les pièces."
      }
    ],
    tags: ['cecr-v8', 'b2.1', 'tech'],
    theme: 'technologie'
  },
  {
    id: 'cecr-b21-vocab-tech-blockchain',
    level: 'hsk6',
    hanzi: '区块链',
    pinyin: 'qūkuàiliàn',
    translation: 'blockchain',
    translationFr: 'chaîne de blocs',
    category: 'vocabulaire',
    examples: [
      {
        hanzi: '区块链技术保证了交易的不可篡改。',
        pinyin: 'Qūkuàiliàn jìshù bǎozhèngle jiāoyì de bùkě cuàngǎi.',
        translation: 'Blockchain technology ensures transactions cannot be tampered with.',
        translationFr: "La blockchain garantit l'inviolabilité des transactions."
      }
    ],
    tags: ['cecr-v8', 'b2.1', 'tech'],
    theme: 'technologie'
  },
  {
    id: 'cecr-b21-vocab-tech-encrypt',
    level: 'hsk6',
    hanzi: '加密',
    pinyin: 'jiāmì',
    translation: 'to encrypt, encryption',
    translationFr: 'chiffrer, chiffrement',
    category: 'vocabulaire',
    examples: [
      {
        hanzi: '所有用户数据都经过加密处理。',
        pinyin: 'Suǒyǒu yònghù shùjù dōu jīngguò jiāmì chǔlǐ.',
        translation: 'All user data is encrypted.',
        translationFr: "Toutes les données utilisateur sont chiffrées."
      }
    ],
    tags: ['cecr-v8', 'b2.1', 'tech'],
    theme: 'technologie'
  },
  {
    id: 'cecr-b21-vocab-tech-privacy',
    level: 'hsk6',
    hanzi: '隐私',
    pinyin: 'yǐnsī',
    translation: 'privacy',
    translationFr: 'vie privée',
    category: 'vocabulaire',
    examples: [
      {
        hanzi: '保护用户隐私是公司最重要的责任。',
        pinyin: 'Bǎohù yònghù yǐnsī shì gōngsī zuì zhòngyào de zérèn.',
        translation: 'Protecting user privacy is the company\'s top responsibility.',
        translationFr: "Protéger la vie privée des utilisateurs est la priorité de l'entreprise."
      }
    ],
    tags: ['cecr-v8', 'b2.1', 'tech'],
    theme: 'technologie'
  },
  {
    id: 'cecr-b21-vocab-tech-cybersecurity',
    level: 'hsk6',
    hanzi: '网络安全',
    pinyin: 'wǎngluò ānquán',
    translation: 'cybersecurity',
    translationFr: 'cybersécurité',
    category: 'vocabulaire',
    examples: [
      {
        hanzi: '网络安全已经成为国家战略。',
        pinyin: 'Wǎngluò ānquán yǐjīng chéngwéi guójiā zhànlüè.',
        translation: 'Cybersecurity has become a national strategy.',
        translationFr: "La cybersécurité est devenue une stratégie nationale."
      }
    ],
    tags: ['cecr-v8', 'b2.1', 'tech'],
    theme: 'technologie'
  },
  {
    id: 'cecr-b21-vocab-tech-hacker',
    level: 'hsk6',
    hanzi: '黑客',
    pinyin: 'hēikè',
    translation: 'hacker',
    translationFr: 'hacker, pirate informatique',
    category: 'vocabulaire',
    examples: [
      {
        hanzi: '黑客攻击导致数据泄露。',
        pinyin: 'Hēikè gōngjí dǎozhì shùjù xièlòu.',
        translation: 'A hacker attack led to a data breach.',
        translationFr: "Une attaque de pirates a provoqué une fuite de données."
      }
    ],
    tags: ['cecr-v8', 'b2.1', 'tech'],
    theme: 'technologie'
  },
  {
    id: 'cecr-b21-vocab-tech-leak',
    level: 'hsk6',
    hanzi: '泄露',
    pinyin: 'xièlòu',
    translation: 'to leak (data, info)',
    translationFr: 'divulguer, fuiter',
    category: 'vocabulaire',
    examples: [
      {
        hanzi: '个人信息泄露带来了严重后果。',
        pinyin: 'Gèrén xìnxī xièlòu dàiláile yánzhòng hòuguǒ.',
        translation: 'The leak of personal data has had severe consequences.',
        translationFr: "La fuite de données personnelles a eu de graves conséquences."
      }
    ],
    tags: ['cecr-v8', 'b2.1', 'tech'],
    theme: 'technologie'
  },
  {
    id: 'cecr-b21-vocab-tech-startup',
    level: 'hsk6',
    hanzi: '初创企业',
    pinyin: 'chūchuàng qǐyè',
    translation: 'startup',
    translationFr: 'start-up, jeune pousse',
    category: 'vocabulaire',
    examples: [
      {
        hanzi: '这家初创企业刚获得了一轮融资。',
        pinyin: 'Zhè jiā chūchuàng qǐyè gāng huòdéle yī lún róngzī.',
        translation: 'This startup has just closed a funding round.',
        translationFr: "Cette start-up vient de boucler un tour de financement."
      }
    ],
    tags: ['cecr-v8', 'b2.1', 'tech'],
    theme: 'technologie'
  },
  {
    id: 'cecr-b21-vocab-tech-funding',
    level: 'hsk6',
    hanzi: '融资',
    pinyin: 'róngzī',
    translation: 'fundraising, financing',
    translationFr: 'levée de fonds, financement',
    category: 'vocabulaire',
    examples: [
      {
        hanzi: '公司计划在下半年进行一轮融资。',
        pinyin: 'Gōngsī jìhuà zài xià bànnián jìnxíng yī lún róngzī.',
        translation: 'The company plans a funding round in H2.',
        translationFr: "L'entreprise prévoit une levée de fonds au second semestre."
      }
    ],
    tags: ['cecr-v8', 'b2.1', 'tech'],
    theme: 'technologie'
  },
  {
    id: 'cecr-b21-vocab-tech-innovation',
    level: 'hsk5',
    hanzi: '创新',
    pinyin: 'chuàngxīn',
    translation: 'innovation, to innovate',
    translationFr: 'innovation, innover',
    category: 'vocabulaire',
    examples: [
      {
        hanzi: '创新是企业长期发展的动力。',
        pinyin: 'Chuàngxīn shì qǐyè chángqī fāzhǎn de dònglì.',
        translation: 'Innovation is the engine of long-term corporate growth.',
        translationFr: "L'innovation est le moteur de la croissance à long terme."
      }
    ],
    tags: ['cecr-v8', 'b2.1', 'tech'],
    theme: 'technologie'
  },
  {
    id: 'cecr-b21-vocab-tech-patent',
    level: 'hsk6',
    hanzi: '专利',
    pinyin: 'zhuānlì',
    translation: 'patent',
    translationFr: 'brevet',
    category: 'vocabulaire',
    examples: [
      {
        hanzi: '他们申请了一项关键技术的专利。',
        pinyin: 'Tāmen shēnqǐngle yī xiàng guānjiàn jìshù de zhuānlì.',
        translation: 'They filed a patent on a key technology.',
        translationFr: "Ils ont déposé un brevet sur une technologie clé."
      }
    ],
    tags: ['cecr-v8', 'b2.1', 'tech'],
    theme: 'technologie'
  },
  {
    id: 'cecr-b21-vocab-tech-opensource',
    level: 'hsk6',
    hanzi: '开源',
    pinyin: 'kāiyuán',
    translation: 'open source',
    translationFr: 'open source',
    category: 'vocabulaire',
    examples: [
      {
        hanzi: '这个开源项目吸引了全球的贡献者。',
        pinyin: 'Zhège kāiyuán xiàngmù xīyǐnle quánqiú de gòngxiànzhě.',
        translation: 'This open-source project has attracted contributors worldwide.',
        translationFr: "Ce projet open source attire des contributeurs du monde entier."
      }
    ],
    tags: ['cecr-v8', 'b2.1', 'tech'],
    theme: 'technologie'
  },
  {
    id: 'cecr-b21-vocab-tech-prototype',
    level: 'hsk6',
    hanzi: '原型',
    pinyin: 'yuánxíng',
    translation: 'prototype',
    translationFr: 'prototype',
    category: 'vocabulaire',
    examples: [
      {
        hanzi: '团队只用两周就做出了第一个原型。',
        pinyin: 'Tuánduì zhǐ yòng liǎng zhōu jiù zuòchūle dì yī gè yuánxíng.',
        translation: 'The team built a first prototype in just two weeks.',
        translationFr: "L'équipe a construit un premier prototype en seulement deux semaines."
      }
    ],
    tags: ['cecr-v8', 'b2.1', 'tech'],
    theme: 'technologie'
  },
  {
    id: 'cecr-b21-vocab-tech-deploy',
    level: 'hsk6',
    hanzi: '部署',
    pinyin: 'bùshǔ',
    translation: 'to deploy',
    translationFr: 'déployer',
    category: 'vocabulaire',
    examples: [
      {
        hanzi: '新版本将于下周一部署上线。',
        pinyin: 'Xīn bǎnběn jiāng yú xià zhōuyī bùshǔ shàngxiàn.',
        translation: 'The new version will be deployed next Monday.',
        translationFr: "La nouvelle version sera déployée lundi prochain."
      }
    ],
    tags: ['cecr-v8', 'b2.1', 'tech'],
    theme: 'technologie'
  }
];

// ============================================================================
//  B2.1 — ENVIRONNEMENT & CLIMAT
// ============================================================================

const B21_ENV: LessonItem[] = [
  {
    id: 'cecr-b21-vocab-env-climate-change',
    level: 'hsk6',
    hanzi: '气候变化',
    pinyin: 'qìhòu biànhuà',
    translation: 'climate change',
    translationFr: 'changement climatique',
    category: 'vocabulaire',
    examples: [
      {
        hanzi: '气候变化正在影响全球农业。',
        pinyin: 'Qìhòu biànhuà zhèngzài yǐngxiǎng quánqiú nóngyè.',
        translation: 'Climate change is affecting global agriculture.',
        translationFr: "Le changement climatique affecte l'agriculture mondiale."
      }
    ],
    tags: ['cecr-v8', 'b2.1', 'environnement'],
    theme: 'environnement'
  },
  {
    id: 'cecr-b21-vocab-env-global-warming',
    level: 'hsk6',
    hanzi: '全球变暖',
    pinyin: 'quánqiú biànnuǎn',
    translation: 'global warming',
    translationFr: 'réchauffement climatique',
    category: 'vocabulaire',
    examples: [
      {
        hanzi: '全球变暖导致海平面上升。',
        pinyin: 'Quánqiú biànnuǎn dǎozhì hǎipíngmiàn shàngshēng.',
        translation: 'Global warming is causing sea levels to rise.',
        translationFr: "Le réchauffement climatique provoque la montée du niveau des mers."
      }
    ],
    tags: ['cecr-v8', 'b2.1', 'environnement'],
    theme: 'environnement'
  },
  {
    id: 'cecr-b21-vocab-env-greenhouse',
    level: 'hsk6',
    hanzi: '温室效应',
    pinyin: 'wēnshì xiàoyìng',
    translation: 'greenhouse effect',
    translationFr: 'effet de serre',
    category: 'vocabulaire',
    examples: [
      {
        hanzi: '温室效应是大气变暖的主要原因之一。',
        pinyin: 'Wēnshì xiàoyìng shì dàqì biànnuǎn de zhǔyào yuányīn zhī yī.',
        translation: 'The greenhouse effect is one of the main causes of atmospheric warming.',
        translationFr: "L'effet de serre est l'une des principales causes du réchauffement atmosphérique."
      }
    ],
    tags: ['cecr-v8', 'b2.1', 'environnement'],
    theme: 'environnement'
  },
  {
    id: 'cecr-b21-vocab-env-carbon',
    level: 'hsk6',
    hanzi: '碳排放',
    pinyin: 'tàn páifàng',
    translation: 'carbon emissions',
    translationFr: 'émissions de carbone',
    category: 'vocabulaire',
    examples: [
      {
        hanzi: '各国承诺减少碳排放。',
        pinyin: 'Gè guó chéngnuò jiǎnshǎo tàn páifàng.',
        translation: 'Countries have pledged to cut carbon emissions.',
        translationFr: "Les pays se sont engagés à réduire leurs émissions de carbone."
      }
    ],
    tags: ['cecr-v8', 'b2.1', 'environnement'],
    theme: 'environnement'
  },
  {
    id: 'cecr-b21-vocab-env-neutral',
    level: 'hsk6',
    hanzi: '碳中和',
    pinyin: 'tàn zhōnghé',
    translation: 'carbon neutrality',
    translationFr: 'neutralité carbone',
    category: 'vocabulaire',
    examples: [
      {
        hanzi: '公司承诺在2050年前实现碳中和。',
        pinyin: 'Gōngsī chéngnuò zài 2050 nián qián shíxiàn tàn zhōnghé.',
        translation: 'The company pledges to reach carbon neutrality by 2050.',
        translationFr: "L'entreprise s'engage à atteindre la neutralité carbone d'ici 2050."
      }
    ],
    tags: ['cecr-v8', 'b2.1', 'environnement'],
    theme: 'environnement'
  },
  {
    id: 'cecr-b21-vocab-env-renewable',
    level: 'hsk6',
    hanzi: '可再生能源',
    pinyin: 'kě zàishēng néngyuán',
    translation: 'renewable energy',
    translationFr: 'énergies renouvelables',
    category: 'vocabulaire',
    examples: [
      {
        hanzi: '可再生能源的比例正在稳步提高。',
        pinyin: 'Kě zàishēng néngyuán de bǐlì zhèngzài wěnbù tígāo.',
        translation: 'The share of renewable energy is steadily increasing.',
        translationFr: "La part des énergies renouvelables progresse régulièrement."
      }
    ],
    tags: ['cecr-v8', 'b2.1', 'environnement'],
    theme: 'environnement'
  },
  {
    id: 'cecr-b21-vocab-env-solar',
    level: 'hsk6',
    hanzi: '太阳能',
    pinyin: 'tàiyángnéng',
    translation: 'solar energy',
    translationFr: 'énergie solaire',
    category: 'vocabulaire',
    examples: [
      {
        hanzi: '屋顶上安装了太阳能电池板。',
        pinyin: 'Wūdǐng shàng ānzhuāngle tàiyángnéng diànchíbǎn.',
        translation: 'Solar panels have been installed on the roof.',
        translationFr: "Des panneaux solaires ont été installés sur le toit."
      }
    ],
    tags: ['cecr-v8', 'b2.1', 'environnement'],
    theme: 'environnement'
  },
  {
    id: 'cecr-b21-vocab-env-wind',
    level: 'hsk6',
    hanzi: '风能',
    pinyin: 'fēngnéng',
    translation: 'wind energy',
    translationFr: 'énergie éolienne',
    category: 'vocabulaire',
    examples: [
      {
        hanzi: '沿海地区非常适合发展风能。',
        pinyin: 'Yánhǎi dìqū fēicháng shìhé fāzhǎn fēngnéng.',
        translation: 'Coastal regions are well suited to develop wind energy.',
        translationFr: "Les zones côtières se prêtent bien au développement de l'éolien."
      }
    ],
    tags: ['cecr-v8', 'b2.1', 'environnement'],
    theme: 'environnement'
  },
  {
    id: 'cecr-b21-vocab-env-fossil',
    level: 'hsk6',
    hanzi: '化石燃料',
    pinyin: 'huàshí ránliào',
    translation: 'fossil fuels',
    translationFr: 'combustibles fossiles',
    category: 'vocabulaire',
    examples: [
      {
        hanzi: '我们必须减少对化石燃料的依赖。',
        pinyin: 'Wǒmen bìxū jiǎnshǎo duì huàshí ránliào de yīlài.',
        translation: 'We must reduce our dependency on fossil fuels.',
        translationFr: "Nous devons réduire notre dépendance aux énergies fossiles."
      }
    ],
    tags: ['cecr-v8', 'b2.1', 'environnement'],
    theme: 'environnement'
  },
  {
    id: 'cecr-b21-vocab-env-pollution',
    level: 'hsk5',
    hanzi: '污染',
    pinyin: 'wūrǎn',
    translation: 'pollution, to pollute',
    translationFr: 'pollution, polluer',
    category: 'vocabulaire',
    examples: [
      {
        hanzi: '工厂的排放造成了严重的空气污染。',
        pinyin: 'Gōngchǎng de páifàng zàochéngle yánzhòng de kōngqì wūrǎn.',
        translation: 'Factory emissions have caused severe air pollution.',
        translationFr: "Les émissions des usines ont provoqué une forte pollution de l'air."
      }
    ],
    tags: ['cecr-v8', 'b2.1', 'environnement'],
    theme: 'environnement'
  },
  {
    id: 'cecr-b21-vocab-env-particulate',
    level: 'hsk6',
    hanzi: '颗粒物',
    pinyin: 'kēlìwù',
    translation: 'particulate matter (PM)',
    translationFr: 'particules fines',
    category: 'vocabulaire',
    examples: [
      {
        hanzi: '细颗粒物的浓度超过了世卫组织标准。',
        pinyin: 'Xì kēlìwù de nóngdù chāoguòle shìwèi zǔzhī biāozhǔn.',
        translation: 'Fine particulate concentrations exceeded WHO standards.',
        translationFr: "La concentration en particules fines dépasse les normes de l'OMS."
      }
    ],
    tags: ['cecr-v8', 'b2.1', 'environnement'],
    theme: 'environnement'
  },
  {
    id: 'cecr-b21-vocab-env-biodiversity',
    level: 'hsk6',
    hanzi: '生物多样性',
    pinyin: 'shēngwù duōyàngxìng',
    translation: 'biodiversity',
    translationFr: 'biodiversité',
    category: 'vocabulaire',
    examples: [
      {
        hanzi: '保护生物多样性是一项全球任务。',
        pinyin: 'Bǎohù shēngwù duōyàngxìng shì yī xiàng quánqiú rènwù.',
        translation: 'Protecting biodiversity is a global mission.',
        translationFr: "Protéger la biodiversité est une mission mondiale."
      }
    ],
    tags: ['cecr-v8', 'b2.1', 'environnement'],
    theme: 'environnement'
  },
  {
    id: 'cecr-b21-vocab-env-ecosystem',
    level: 'hsk6',
    hanzi: '生态系统',
    pinyin: 'shēngtài xìtǒng',
    translation: 'ecosystem',
    translationFr: 'écosystème',
    category: 'vocabulaire',
    examples: [
      {
        hanzi: '湿地是重要的生态系统。',
        pinyin: 'Shīdì shì zhòngyào de shēngtài xìtǒng.',
        translation: 'Wetlands are vital ecosystems.',
        translationFr: "Les zones humides sont des écosystèmes essentiels."
      }
    ],
    tags: ['cecr-v8', 'b2.1', 'environnement'],
    theme: 'environnement'
  },
  {
    id: 'cecr-b21-vocab-env-species',
    level: 'hsk6',
    hanzi: '物种',
    pinyin: 'wùzhǒng',
    translation: 'species',
    translationFr: 'espèce',
    category: 'vocabulaire',
    examples: [
      {
        hanzi: '许多物种正在走向灭绝。',
        pinyin: 'Xǔduō wùzhǒng zhèngzài zǒuxiàng mièjué.',
        translation: 'Many species are going extinct.',
        translationFr: "De nombreuses espèces sont menacées d'extinction."
      }
    ],
    tags: ['cecr-v8', 'b2.1', 'environnement'],
    theme: 'environnement'
  },
  {
    id: 'cecr-b21-vocab-env-extinction',
    level: 'hsk6',
    hanzi: '灭绝',
    pinyin: 'mièjué',
    translation: 'extinction, to go extinct',
    translationFr: 'extinction, disparaître',
    category: 'vocabulaire',
    examples: [
      {
        hanzi: '过度捕捞导致某些鱼类的灭绝。',
        pinyin: 'Guòdù bǔlāo dǎozhì mǒu xiē yúlèi de mièjué.',
        translation: 'Overfishing has driven certain fish species to extinction.',
        translationFr: "La surpêche a conduit certaines espèces de poissons à l'extinction."
      }
    ],
    tags: ['cecr-v8', 'b2.1', 'environnement'],
    theme: 'environnement'
  },
  {
    id: 'cecr-b21-vocab-env-deforestation',
    level: 'hsk6',
    hanzi: '森林砍伐',
    pinyin: 'sēnlín kǎnfá',
    translation: 'deforestation',
    translationFr: 'déforestation',
    category: 'vocabulaire',
    examples: [
      {
        hanzi: '亚马逊森林砍伐引发了国际关注。',
        pinyin: 'Yàmǎxùn sēnlín kǎnfá yǐnfāle guójì guānzhù.',
        translation: 'Amazon deforestation has drawn international attention.',
        translationFr: "La déforestation en Amazonie suscite une inquiétude internationale."
      }
    ],
    tags: ['cecr-v8', 'b2.1', 'environnement'],
    theme: 'environnement'
  },
  {
    id: 'cecr-b21-vocab-env-recycle',
    level: 'hsk5',
    hanzi: '回收',
    pinyin: 'huíshōu',
    translation: 'to recycle, recycling',
    translationFr: 'recycler, recyclage',
    category: 'vocabulaire',
    examples: [
      {
        hanzi: '居民应该学会垃圾回收分类。',
        pinyin: 'Jūmín yīnggāi xuéhuì lājī huíshōu fēnlèi.',
        translation: 'Residents should learn to sort recyclable waste.',
        translationFr: "Les habitants devraient apprendre à trier les déchets recyclables."
      }
    ],
    tags: ['cecr-v8', 'b2.1', 'environnement'],
    theme: 'environnement'
  },
  {
    id: 'cecr-b21-vocab-env-waste',
    level: 'hsk5',
    hanzi: '废物',
    pinyin: 'fèiwù',
    translation: 'waste, refuse',
    translationFr: 'déchet',
    category: 'vocabulaire',
    examples: [
      {
        hanzi: '工业废物必须经过处理才能排放。',
        pinyin: 'Gōngyè fèiwù bìxū jīngguò chǔlǐ cáinéng páifàng.',
        translation: 'Industrial waste must be treated before being discharged.',
        translationFr: "Les déchets industriels doivent être traités avant d'être rejetés."
      }
    ],
    tags: ['cecr-v8', 'b2.1', 'environnement'],
    theme: 'environnement'
  },
  {
    id: 'cecr-b21-vocab-env-sustainable',
    level: 'hsk6',
    hanzi: '可持续',
    pinyin: 'kě chíxù',
    translation: 'sustainable',
    translationFr: 'durable',
    category: 'vocabulaire',
    examples: [
      {
        hanzi: '可持续发展是国际社会的共同目标。',
        pinyin: 'Kě chíxù fāzhǎn shì guójì shèhuì de gòngtóng mùbiāo.',
        translation: 'Sustainable development is a shared goal for the international community.',
        translationFr: "Le développement durable est un objectif commun de la communauté internationale."
      }
    ],
    tags: ['cecr-v8', 'b2.1', 'environnement'],
    theme: 'environnement'
  },
  {
    id: 'cecr-b21-vocab-env-footprint',
    level: 'hsk6',
    hanzi: '碳足迹',
    pinyin: 'tàn zújì',
    translation: 'carbon footprint',
    translationFr: 'empreinte carbone',
    category: 'vocabulaire',
    examples: [
      {
        hanzi: '选择本地食品可以减少碳足迹。',
        pinyin: 'Xuǎnzé běndì shípǐn kěyǐ jiǎnshǎo tàn zújì.',
        translation: 'Choosing local food can reduce your carbon footprint.',
        translationFr: "Choisir des produits locaux permet de réduire son empreinte carbone."
      }
    ],
    tags: ['cecr-v8', 'b2.1', 'environnement'],
    theme: 'environnement'
  },
  {
    id: 'cecr-b21-vocab-env-drought',
    level: 'hsk6',
    hanzi: '干旱',
    pinyin: 'gānhàn',
    translation: 'drought',
    translationFr: 'sécheresse',
    category: 'vocabulaire',
    examples: [
      {
        hanzi: '持续的干旱影响了粮食产量。',
        pinyin: 'Chíxù de gānhàn yǐngxiǎngle liángshí chǎnliàng.',
        translation: 'Prolonged drought has affected grain output.',
        translationFr: "La sécheresse prolongée a affecté la production céréalière."
      }
    ],
    tags: ['cecr-v8', 'b2.1', 'environnement'],
    theme: 'environnement'
  },
  {
    id: 'cecr-b21-vocab-env-flood',
    level: 'hsk5',
    hanzi: '洪水',
    pinyin: 'hóngshuǐ',
    translation: 'flood',
    translationFr: 'inondation',
    category: 'vocabulaire',
    examples: [
      {
        hanzi: '今年夏天的洪水造成了巨大损失。',
        pinyin: 'Jīnnián xiàtiān de hóngshuǐ zàochéngle jùdà sǔnshī.',
        translation: 'This summer\'s floods caused huge damage.',
        translationFr: "Les inondations de cet été ont causé d'énormes dégâts."
      }
    ],
    tags: ['cecr-v8', 'b2.1', 'environnement'],
    theme: 'environnement'
  },
  {
    id: 'cecr-b21-vocab-env-ocean',
    level: 'hsk6',
    hanzi: '海洋',
    pinyin: 'hǎiyáng',
    translation: 'ocean',
    translationFr: 'océan',
    category: 'vocabulaire',
    examples: [
      {
        hanzi: '塑料污染威胁着海洋生物。',
        pinyin: 'Sùliào wūrǎn wēixiézhe hǎiyáng shēngwù.',
        translation: 'Plastic pollution threatens marine life.',
        translationFr: "La pollution plastique menace la vie marine."
      }
    ],
    tags: ['cecr-v8', 'b2.1', 'environnement'],
    theme: 'environnement'
  },
  {
    id: 'cecr-b21-vocab-env-glacier',
    level: 'hsk6',
    hanzi: '冰川',
    pinyin: 'bīngchuān',
    translation: 'glacier',
    translationFr: 'glacier',
    category: 'vocabulaire',
    examples: [
      {
        hanzi: '冰川正在以前所未有的速度融化。',
        pinyin: 'Bīngchuān zhèngzài yǐ qián suǒ wèi yǒu de sùdù rónghuà.',
        translation: 'Glaciers are melting at an unprecedented pace.',
        translationFr: "Les glaciers fondent à un rythme sans précédent."
      }
    ],
    tags: ['cecr-v8', 'b2.1', 'environnement'],
    theme: 'environnement'
  },
  {
    id: 'cecr-b21-vocab-env-agreement',
    level: 'hsk6',
    hanzi: '协定',
    pinyin: 'xiédìng',
    translation: 'agreement, accord',
    translationFr: 'accord (formel)',
    category: 'vocabulaire',
    examples: [
      {
        hanzi: '《巴黎气候协定》旨在限制全球升温。',
        pinyin: '«Bālí Qìhòu Xiédìng» zhǐ zài xiànzhì quánqiú shēngwēn.',
        translation: 'The Paris Climate Agreement aims to limit global warming.',
        translationFr: "L'Accord de Paris vise à limiter le réchauffement climatique."
      }
    ],
    tags: ['cecr-v8', 'b2.1', 'environnement'],
    theme: 'environnement'
  }
];

// ============================================================================
//  B2.1 — ÉCONOMIE & ENTREPRISE
// ============================================================================

const B21_ECON: LessonItem[] = [
  {
    id: 'cecr-b21-vocab-econ-economy',
    level: 'hsk5',
    hanzi: '经济',
    pinyin: 'jīngjì',
    translation: 'economy',
    translationFr: 'économie',
    category: 'vocabulaire',
    examples: [
      {
        hanzi: '全球经济正在缓慢复苏。',
        pinyin: 'Quánqiú jīngjì zhèngzài huǎnmàn fùsū.',
        translation: 'The global economy is slowly recovering.',
        translationFr: "L'économie mondiale est en lente reprise."
      }
    ],
    tags: ['cecr-v8', 'b2.1', 'economie'],
    theme: 'économie'
  },
  {
    id: 'cecr-b21-vocab-econ-gdp',
    level: 'hsk6',
    hanzi: '国内生产总值',
    pinyin: 'guónèi shēngchǎn zǒngzhí',
    translation: 'GDP (Gross Domestic Product)',
    translationFr: 'produit intérieur brut (PIB)',
    category: 'vocabulaire',
    examples: [
      {
        hanzi: '该国去年的国内生产总值增长了百分之三。',
        pinyin: 'Gāi guó qùnián de guónèi shēngchǎn zǒngzhí zēngzhǎngle bǎi fēn zhī sān.',
        translation: 'The country\'s GDP grew by 3% last year.',
        translationFr: "Le PIB du pays a progressé de 3 % l'an dernier."
      }
    ],
    tags: ['cecr-v8', 'b2.1', 'economie'],
    theme: 'économie'
  },
  {
    id: 'cecr-b21-vocab-econ-inflation',
    level: 'hsk6',
    hanzi: '通货膨胀',
    pinyin: 'tōnghuò péngzhàng',
    translation: 'inflation',
    translationFr: 'inflation',
    category: 'vocabulaire',
    examples: [
      {
        hanzi: '通货膨胀给家庭预算带来压力。',
        pinyin: 'Tōnghuò péngzhàng gěi jiātíng yùsuàn dàilái yālì.',
        translation: 'Inflation is putting pressure on household budgets.',
        translationFr: "L'inflation pèse sur le budget des ménages."
      }
    ],
    tags: ['cecr-v8', 'b2.1', 'economie'],
    theme: 'économie'
  },
  {
    id: 'cecr-b21-vocab-econ-deflation',
    level: 'hsk6',
    hanzi: '通货紧缩',
    pinyin: 'tōnghuò jǐnsuō',
    translation: 'deflation',
    translationFr: 'déflation',
    category: 'vocabulaire',
    examples: [
      {
        hanzi: '持续的通货紧缩可能引发衰退。',
        pinyin: 'Chíxù de tōnghuò jǐnsuō kěnéng yǐnfā shuāituì.',
        translation: 'Prolonged deflation may trigger a recession.',
        translationFr: "Une déflation prolongée peut déclencher une récession."
      }
    ],
    tags: ['cecr-v8', 'b2.1', 'economie'],
    theme: 'économie'
  },
  {
    id: 'cecr-b21-vocab-econ-recession',
    level: 'hsk6',
    hanzi: '经济衰退',
    pinyin: 'jīngjì shuāituì',
    translation: 'economic recession',
    translationFr: 'récession économique',
    category: 'vocabulaire',
    examples: [
      {
        hanzi: '分析师担心明年可能进入经济衰退。',
        pinyin: 'Fēnxīshī dānxīn míngnián kěnéng jìnrù jīngjì shuāituì.',
        translation: 'Analysts worry the economy may enter recession next year.',
        translationFr: "Les analystes craignent une récession dès l'an prochain."
      }
    ],
    tags: ['cecr-v8', 'b2.1', 'economie'],
    theme: 'économie'
  },
  {
    id: 'cecr-b21-vocab-econ-growth',
    level: 'hsk6',
    hanzi: '增长率',
    pinyin: 'zēngzhǎnglǜ',
    translation: 'growth rate',
    translationFr: 'taux de croissance',
    category: 'vocabulaire',
    examples: [
      {
        hanzi: '今年的增长率低于预期。',
        pinyin: 'Jīnnián de zēngzhǎnglǜ dī yú yùqí.',
        translation: 'This year\'s growth rate is below expectations.',
        translationFr: "Le taux de croissance de cette année est inférieur aux prévisions."
      }
    ],
    tags: ['cecr-v8', 'b2.1', 'economie'],
    theme: 'économie'
  },
  {
    id: 'cecr-b21-vocab-econ-unemployment',
    level: 'hsk6',
    hanzi: '失业率',
    pinyin: 'shīyèlǜ',
    translation: 'unemployment rate',
    translationFr: 'taux de chômage',
    category: 'vocabulaire',
    examples: [
      {
        hanzi: '青年失业率仍然较高。',
        pinyin: 'Qīngnián shīyèlǜ réngrán jiào gāo.',
        translation: 'Youth unemployment remains high.',
        translationFr: "Le chômage des jeunes reste élevé."
      }
    ],
    tags: ['cecr-v8', 'b2.1', 'economie'],
    theme: 'économie'
  },
  {
    id: 'cecr-b21-vocab-econ-supply-chain',
    level: 'hsk6',
    hanzi: '供应链',
    pinyin: 'gōngyìngliàn',
    translation: 'supply chain',
    translationFr: 'chaîne d\'approvisionnement',
    category: 'vocabulaire',
    examples: [
      {
        hanzi: '疫情暴露了全球供应链的脆弱性。',
        pinyin: 'Yìqíng bàolùle quánqiú gōngyìngliàn de cuìruòxìng.',
        translation: 'The pandemic exposed the fragility of global supply chains.',
        translationFr: "La pandémie a révélé la fragilité des chaînes d'approvisionnement mondiales."
      }
    ],
    tags: ['cecr-v8', 'b2.1', 'economie'],
    theme: 'économie'
  },
  {
    id: 'cecr-b21-vocab-econ-export',
    level: 'hsk5',
    hanzi: '出口',
    pinyin: 'chūkǒu',
    translation: 'to export, export',
    translationFr: 'exporter, exportation',
    category: 'vocabulaire',
    examples: [
      {
        hanzi: '汽车出口占该国外贸的很大份额。',
        pinyin: 'Qìchē chūkǒu zhàn gāi guó wàimào de hěn dà fèn\'é.',
        translation: 'Car exports account for a large share of the country\'s foreign trade.',
        translationFr: "Les exportations automobiles représentent une large part du commerce extérieur."
      }
    ],
    tags: ['cecr-v8', 'b2.1', 'economie'],
    theme: 'économie'
  },
  {
    id: 'cecr-b21-vocab-econ-import',
    level: 'hsk5',
    hanzi: '进口',
    pinyin: 'jìnkǒu',
    translation: 'to import, import',
    translationFr: 'importer, importation',
    category: 'vocabulaire',
    examples: [
      {
        hanzi: '该国依赖石油进口。',
        pinyin: 'Gāi guó yīlài shíyóu jìnkǒu.',
        translation: 'The country depends on oil imports.',
        translationFr: "Le pays dépend des importations de pétrole."
      }
    ],
    tags: ['cecr-v8', 'b2.1', 'economie'],
    theme: 'économie'
  },
  {
    id: 'cecr-b21-vocab-econ-tariff',
    level: 'hsk6',
    hanzi: '关税',
    pinyin: 'guānshuì',
    translation: 'tariff, customs duty',
    translationFr: 'droits de douane',
    category: 'vocabulaire',
    examples: [
      {
        hanzi: '提高关税可能导致贸易战。',
        pinyin: 'Tígāo guānshuì kěnéng dǎozhì màoyì zhàn.',
        translation: 'Raising tariffs can lead to a trade war.',
        translationFr: "Augmenter les droits de douane peut déclencher une guerre commerciale."
      }
    ],
    tags: ['cecr-v8', 'b2.1', 'economie'],
    theme: 'économie'
  },
  {
    id: 'cecr-b21-vocab-econ-market',
    level: 'hsk5',
    hanzi: '市场',
    pinyin: 'shìchǎng',
    translation: 'market',
    translationFr: 'marché',
    category: 'vocabulaire',
    examples: [
      {
        hanzi: '新能源汽车市场竞争越来越激烈。',
        pinyin: 'Xīn néngyuán qìchē shìchǎng jìngzhēng yuè lái yuè jīliè.',
        translation: 'The new-energy vehicle market is getting more competitive.',
        translationFr: "Le marché des véhicules à énergies nouvelles est de plus en plus compétitif."
      }
    ],
    tags: ['cecr-v8', 'b2.1', 'economie'],
    theme: 'économie'
  },
  {
    id: 'cecr-b21-vocab-econ-shareholder',
    level: 'hsk6',
    hanzi: '股东',
    pinyin: 'gǔdōng',
    translation: 'shareholder',
    translationFr: 'actionnaire',
    category: 'vocabulaire',
    examples: [
      {
        hanzi: '股东大会将于下周召开。',
        pinyin: 'Gǔdōng dàhuì jiāng yú xià zhōu zhàokāi.',
        translation: 'The shareholders\' meeting will be held next week.',
        translationFr: "L'assemblée générale des actionnaires aura lieu la semaine prochaine."
      }
    ],
    tags: ['cecr-v8', 'b2.1', 'economie'],
    theme: 'économie'
  },
  {
    id: 'cecr-b21-vocab-econ-stock',
    level: 'hsk6',
    hanzi: '股票',
    pinyin: 'gǔpiào',
    translation: 'stock, shares',
    translationFr: 'action (bourse)',
    category: 'vocabulaire',
    examples: [
      {
        hanzi: '科技股的股价大幅波动。',
        pinyin: 'Kējì gǔ de gǔjià dàfú bōdòng.',
        translation: 'Tech stock prices have fluctuated sharply.',
        translationFr: "Le cours des valeurs technologiques a fortement fluctué."
      }
    ],
    tags: ['cecr-v8', 'b2.1', 'economie'],
    theme: 'économie'
  },
  {
    id: 'cecr-b21-vocab-econ-invest',
    level: 'hsk5',
    hanzi: '投资',
    pinyin: 'tóuzī',
    translation: 'to invest, investment',
    translationFr: 'investir, investissement',
    category: 'vocabulaire',
    examples: [
      {
        hanzi: '外商对新兴市场的投资持续增长。',
        pinyin: 'Wàishāng duì xīnxīng shìchǎng de tóuzī chíxù zēngzhǎng.',
        translation: 'Foreign investment in emerging markets keeps growing.',
        translationFr: "Les investissements étrangers dans les marchés émergents continuent de croître."
      }
    ],
    tags: ['cecr-v8', 'b2.1', 'economie'],
    theme: 'économie'
  },
  {
    id: 'cecr-b21-vocab-econ-yield',
    level: 'hsk6',
    hanzi: '收益率',
    pinyin: 'shōuyìlǜ',
    translation: 'yield, rate of return',
    translationFr: 'rendement',
    category: 'vocabulaire',
    examples: [
      {
        hanzi: '债券收益率最近明显上升。',
        pinyin: 'Zhàiquàn shōuyìlǜ zuìjìn míngxiǎn shàngshēng.',
        translation: 'Bond yields have risen significantly recently.',
        translationFr: "Les rendements obligataires ont nettement progressé récemment."
      }
    ],
    tags: ['cecr-v8', 'b2.1', 'economie'],
    theme: 'économie'
  },
  {
    id: 'cecr-b21-vocab-econ-central-bank',
    level: 'hsk6',
    hanzi: '中央银行',
    pinyin: 'zhōngyāng yínháng',
    translation: 'central bank',
    translationFr: 'banque centrale',
    category: 'vocabulaire',
    examples: [
      {
        hanzi: '中央银行宣布降息以刺激经济。',
        pinyin: 'Zhōngyāng yínháng xuānbù jiàngxī yǐ cìjī jīngjì.',
        translation: 'The central bank has cut interest rates to stimulate the economy.',
        translationFr: "La banque centrale a abaissé ses taux pour relancer l'économie."
      }
    ],
    tags: ['cecr-v8', 'b2.1', 'economie'],
    theme: 'économie'
  },
  {
    id: 'cecr-b21-vocab-econ-interest-rate',
    level: 'hsk6',
    hanzi: '利率',
    pinyin: 'lìlǜ',
    translation: 'interest rate',
    translationFr: 'taux d\'intérêt',
    category: 'vocabulaire',
    examples: [
      {
        hanzi: '提高利率可以抑制通货膨胀。',
        pinyin: 'Tígāo lìlǜ kěyǐ yìzhì tōnghuò péngzhàng.',
        translation: 'Raising interest rates can curb inflation.',
        translationFr: "Relever les taux d'intérêt permet de contenir l'inflation."
      }
    ],
    tags: ['cecr-v8', 'b2.1', 'economie'],
    theme: 'économie'
  },
  {
    id: 'cecr-b21-vocab-econ-currency',
    level: 'hsk6',
    hanzi: '货币',
    pinyin: 'huòbì',
    translation: 'currency',
    translationFr: 'monnaie, devise',
    category: 'vocabulaire',
    examples: [
      {
        hanzi: '人民币的国际化进程正在加速。',
        pinyin: 'Rénmínbì de guójìhuà jìnchéng zhèngzài jiāsù.',
        translation: 'The internationalization of the yuan is accelerating.',
        translationFr: "L'internationalisation du yuan s'accélère."
      }
    ],
    tags: ['cecr-v8', 'b2.1', 'economie'],
    theme: 'économie'
  },
  {
    id: 'cecr-b21-vocab-econ-exchange-rate',
    level: 'hsk6',
    hanzi: '汇率',
    pinyin: 'huìlǜ',
    translation: 'exchange rate',
    translationFr: 'taux de change',
    category: 'vocabulaire',
    examples: [
      {
        hanzi: '汇率波动对出口企业影响很大。',
        pinyin: 'Huìlǜ bōdòng duì chūkǒu qǐyè yǐngxiǎng hěn dà.',
        translation: 'Exchange-rate volatility strongly affects exporters.',
        translationFr: "Les fluctuations du taux de change affectent fortement les exportateurs."
      }
    ],
    tags: ['cecr-v8', 'b2.1', 'economie'],
    theme: 'économie'
  },
  {
    id: 'cecr-b21-vocab-econ-budget',
    level: 'hsk5',
    hanzi: '预算',
    pinyin: 'yùsuàn',
    translation: 'budget',
    translationFr: 'budget',
    category: 'vocabulaire',
    examples: [
      {
        hanzi: '政府将削减明年的教育预算。',
        pinyin: 'Zhèngfǔ jiāng xuējiǎn míngnián de jiàoyù yùsuàn.',
        translation: 'The government will cut next year\'s education budget.',
        translationFr: "Le gouvernement va réduire le budget de l'éducation l'an prochain."
      }
    ],
    tags: ['cecr-v8', 'b2.1', 'economie'],
    theme: 'économie'
  },
  {
    id: 'cecr-b21-vocab-econ-deficit',
    level: 'hsk6',
    hanzi: '赤字',
    pinyin: 'chìzì',
    translation: 'deficit',
    translationFr: 'déficit',
    category: 'vocabulaire',
    examples: [
      {
        hanzi: '财政赤字继续扩大。',
        pinyin: 'Cáizhèng chìzì jìxù kuòdà.',
        translation: 'The fiscal deficit keeps widening.',
        translationFr: "Le déficit budgétaire continue de se creuser."
      }
    ],
    tags: ['cecr-v8', 'b2.1', 'economie'],
    theme: 'économie'
  },
  {
    id: 'cecr-b21-vocab-econ-debt',
    level: 'hsk5',
    hanzi: '债务',
    pinyin: 'zhàiwù',
    translation: 'debt',
    translationFr: 'dette',
    category: 'vocabulaire',
    examples: [
      {
        hanzi: '该国的公共债务已超过GDP的百分之百。',
        pinyin: 'Gāi guó de gōnggòng zhàiwù yǐ chāoguò GDP de bǎi fēn zhī bǎi.',
        translation: 'The country\'s public debt has exceeded 100% of GDP.',
        translationFr: "La dette publique du pays dépasse 100 % du PIB."
      }
    ],
    tags: ['cecr-v8', 'b2.1', 'economie'],
    theme: 'économie'
  },
  {
    id: 'cecr-b21-vocab-econ-merger',
    level: 'hsk6',
    hanzi: '并购',
    pinyin: 'bìnggòu',
    translation: 'merger and acquisition (M&A)',
    translationFr: 'fusion-acquisition',
    category: 'vocabulaire',
    examples: [
      {
        hanzi: '两家公司宣布了一项大型并购交易。',
        pinyin: 'Liǎng jiā gōngsī xuānbùle yī xiàng dàxíng bìnggòu jiāoyì.',
        translation: 'The two firms announced a major M&A deal.',
        translationFr: "Les deux sociétés ont annoncé une importante opération de fusion-acquisition."
      }
    ],
    tags: ['cecr-v8', 'b2.1', 'economie'],
    theme: 'économie'
  },
  {
    id: 'cecr-b21-vocab-econ-bankruptcy',
    level: 'hsk6',
    hanzi: '破产',
    pinyin: 'pòchǎn',
    translation: 'bankruptcy, to go bankrupt',
    translationFr: 'faillite, faire faillite',
    category: 'vocabulaire',
    examples: [
      {
        hanzi: '公司因负债过高被迫申请破产。',
        pinyin: 'Gōngsī yīn fùzhài guò gāo bèi pò shēnqǐng pòchǎn.',
        translation: 'The company was forced to file for bankruptcy due to excess debt.',
        translationFr: "L'entreprise a dû déposer le bilan en raison d'un endettement excessif."
      }
    ],
    tags: ['cecr-v8', 'b2.1', 'economie'],
    theme: 'économie'
  }
];

// ============================================================================
//  B2.1 — REGISTRE FORMEL / DISCOURS ARGUMENTATIF
// ============================================================================

const B21_REGISTRE: LessonItem[] = [
  {
    id: 'cecr-b21-vocab-reg-argue',
    level: 'hsk6',
    hanzi: '论证',
    pinyin: 'lùnzhèng',
    translation: 'to argue, argumentation',
    translationFr: 'argumenter, argumentation',
    category: 'vocabulaire',
    examples: [
      {
        hanzi: '作者用大量数据论证了这个观点。',
        pinyin: 'Zuòzhě yòng dàliàng shùjù lùnzhèngle zhège guāndiǎn.',
        translation: 'The author argues this point with extensive data.',
        translationFr: "L'auteur appuie ce point de vue par de nombreuses données."
      }
    ],
    tags: ['cecr-v8', 'b2.1', 'registre-formel'],
    theme: 'registre formel'
  },
  {
    id: 'cecr-b21-vocab-reg-viewpoint',
    level: 'hsk5',
    hanzi: '观点',
    pinyin: 'guāndiǎn',
    translation: 'viewpoint, opinion',
    translationFr: 'point de vue',
    category: 'vocabulaire',
    examples: [
      {
        hanzi: '我完全理解你的观点。',
        pinyin: 'Wǒ wánquán lǐjiě nǐ de guāndiǎn.',
        translation: 'I fully understand your viewpoint.',
        translationFr: "Je comprends tout à fait votre point de vue."
      }
    ],
    tags: ['cecr-v8', 'b2.1', 'registre-formel'],
    theme: 'registre formel'
  },
  {
    id: 'cecr-b21-vocab-reg-presupposition',
    level: 'hsk6',
    hanzi: '前提',
    pinyin: 'qiántí',
    translation: 'premise, precondition',
    translationFr: 'prémisse, condition préalable',
    category: 'vocabulaire',
    examples: [
      {
        hanzi: '合作的前提是互信。',
        pinyin: 'Hézuò de qiántí shì hùxìn.',
        translation: 'The premise of cooperation is mutual trust.',
        translationFr: "La condition préalable à la coopération est la confiance mutuelle."
      }
    ],
    tags: ['cecr-v8', 'b2.1', 'registre-formel'],
    theme: 'registre formel'
  },
  {
    id: 'cecr-b21-vocab-reg-conclusion',
    level: 'hsk6',
    hanzi: '结论',
    pinyin: 'jiélùn',
    translation: 'conclusion',
    translationFr: 'conclusion',
    category: 'vocabulaire',
    examples: [
      {
        hanzi: '我们需要更多证据才能得出结论。',
        pinyin: 'Wǒmen xūyào gèng duō zhèngjù cáinéng déchū jiélùn.',
        translation: 'We need more evidence before we can draw a conclusion.',
        translationFr: "Il nous faut davantage de preuves pour pouvoir conclure."
      }
    ],
    tags: ['cecr-v8', 'b2.1', 'registre-formel'],
    theme: 'registre formel'
  },
  {
    id: 'cecr-b21-vocab-reg-evidence',
    level: 'hsk6',
    hanzi: '证据',
    pinyin: 'zhèngjù',
    translation: 'evidence',
    translationFr: 'preuve',
    category: 'vocabulaire',
    examples: [
      {
        hanzi: '法庭需要确凿的证据。',
        pinyin: 'Fǎtíng xūyào quèzáo de zhèngjù.',
        translation: 'The court requires solid evidence.',
        translationFr: "Le tribunal exige des preuves solides."
      }
    ],
    tags: ['cecr-v8', 'b2.1', 'registre-formel'],
    theme: 'registre formel'
  },
  {
    id: 'cecr-b21-vocab-reg-although',
    level: 'hsk5',
    hanzi: '尽管',
    pinyin: 'jǐnguǎn',
    translation: 'although, despite',
    translationFr: 'bien que, malgré',
    category: 'phrase',
    examples: [
      {
        hanzi: '尽管困难重重,团队仍按时完成了项目。',
        pinyin: 'Jǐnguǎn kùnnán chóngchóng, tuánduì réng ànshí wánchéngle xiàngmù.',
        translation: 'Despite many difficulties, the team finished the project on time.',
        translationFr: "Malgré de nombreuses difficultés, l'équipe a terminé le projet à temps."
      }
    ],
    tags: ['cecr-v8', 'b2.1', 'registre-formel'],
    theme: 'registre formel'
  },
  {
    id: 'cecr-b21-vocab-reg-moreover',
    level: 'hsk6',
    hanzi: '此外',
    pinyin: 'cǐwài',
    translation: 'moreover, in addition',
    translationFr: 'en outre, par ailleurs',
    category: 'phrase',
    examples: [
      {
        hanzi: '此外,我们还需要考虑成本问题。',
        pinyin: 'Cǐwài, wǒmen hái xūyào kǎolǜ chéngběn wèntí.',
        translation: 'Moreover, we also need to consider the cost issue.',
        translationFr: "En outre, nous devons également tenir compte du coût."
      }
    ],
    tags: ['cecr-v8', 'b2.1', 'registre-formel'],
    theme: 'registre formel'
  },
  {
    id: 'cecr-b21-vocab-reg-however',
    level: 'hsk5',
    hanzi: '然而',
    pinyin: 'rán\'ér',
    translation: 'however, nevertheless',
    translationFr: 'cependant, toutefois',
    category: 'phrase',
    examples: [
      {
        hanzi: '然而,这种方法并不适用于所有情况。',
        pinyin: 'Rán\'ér, zhè zhǒng fāngfǎ bìng bù shìyòng yú suǒyǒu qíngkuàng.',
        translation: 'However, this approach does not apply to all situations.',
        translationFr: "Cependant, cette méthode ne s'applique pas à toutes les situations."
      }
    ],
    tags: ['cecr-v8', 'b2.1', 'registre-formel'],
    theme: 'registre formel'
  },
  {
    id: 'cecr-b21-vocab-reg-furthermore',
    level: 'hsk6',
    hanzi: '更何况',
    pinyin: 'gèng hékuàng',
    translation: 'let alone, not to mention',
    translationFr: 'à plus forte raison, a fortiori',
    category: 'phrase',
    examples: [
      {
        hanzi: '连专家都不清楚,更何况普通人。',
        pinyin: 'Lián zhuānjiā dōu bù qīngchǔ, gèng hékuàng pǔtōng rén.',
        translation: 'Even experts aren\'t sure, let alone ordinary people.',
        translationFr: "Même les experts ne sont pas sûrs, à plus forte raison le grand public."
      }
    ],
    tags: ['cecr-v8', 'b2.1', 'registre-formel'],
    theme: 'registre formel'
  },
  {
    id: 'cecr-b21-vocab-reg-based-on',
    level: 'hsk6',
    hanzi: '基于',
    pinyin: 'jīyú',
    translation: 'based on, on the basis of',
    translationFr: 'sur la base de, à partir de',
    category: 'phrase',
    examples: [
      {
        hanzi: '基于以上分析,我们提出三点建议。',
        pinyin: 'Jīyú yǐshàng fēnxī, wǒmen tíchū sān diǎn jiànyì.',
        translation: 'Based on the above analysis, we propose three recommendations.',
        translationFr: "Sur la base de l'analyse ci-dessus, nous formulons trois recommandations."
      }
    ],
    tags: ['cecr-v8', 'b2.1', 'registre-formel'],
    theme: 'registre formel'
  },
  {
    id: 'cecr-b21-vocab-reg-significant',
    level: 'hsk6',
    hanzi: '显著',
    pinyin: 'xiǎnzhù',
    translation: 'significant, notable',
    translationFr: 'significatif, notable',
    category: 'adjectif',
    examples: [
      {
        hanzi: '新政策产生了显著的效果。',
        pinyin: 'Xīn zhèngcè chǎnshēngle xiǎnzhù de xiàoguǒ.',
        translation: 'The new policy has produced significant results.',
        translationFr: "La nouvelle politique a produit des résultats significatifs."
      }
    ],
    tags: ['cecr-v8', 'b2.1', 'registre-formel'],
    theme: 'registre formel'
  },
  {
    id: 'cecr-b21-vocab-reg-generally',
    level: 'hsk6',
    hanzi: '总体而言',
    pinyin: 'zǒngtǐ éryán',
    translation: 'on the whole, overall',
    translationFr: 'globalement, dans l\'ensemble',
    category: 'phrase',
    examples: [
      {
        hanzi: '总体而言,这次改革是成功的。',
        pinyin: 'Zǒngtǐ éryán, zhè cì gǎigé shì chénggōng de.',
        translation: 'Overall, this reform has been a success.',
        translationFr: "Globalement, cette réforme est un succès."
      }
    ],
    tags: ['cecr-v8', 'b2.1', 'registre-formel'],
    theme: 'registre formel'
  },
  {
    id: 'cecr-b21-vocab-reg-specifically',
    level: 'hsk6',
    hanzi: '具体而言',
    pinyin: 'jùtǐ éryán',
    translation: 'specifically, to be specific',
    translationFr: 'concrètement, plus précisément',
    category: 'phrase',
    examples: [
      {
        hanzi: '具体而言,我们需要三项措施。',
        pinyin: 'Jùtǐ éryán, wǒmen xūyào sān xiàng cuòshī.',
        translation: 'Specifically, we need three measures.',
        translationFr: "Concrètement, il nous faut trois mesures."
      }
    ],
    tags: ['cecr-v8', 'b2.1', 'registre-formel'],
    theme: 'registre formel'
  },
  {
    id: 'cecr-b21-vocab-reg-impact',
    level: 'hsk5',
    hanzi: '影响',
    pinyin: 'yǐngxiǎng',
    translation: 'influence, impact',
    translationFr: 'influence, impact',
    category: 'vocabulaire',
    examples: [
      {
        hanzi: '这项决定将深远地影响行业。',
        pinyin: 'Zhè xiàng juédìng jiāng shēnyuǎn de yǐngxiǎng hángyè.',
        translation: 'This decision will have a profound impact on the industry.',
        translationFr: "Cette décision aura un impact durable sur le secteur."
      }
    ],
    tags: ['cecr-v8', 'b2.1', 'registre-formel'],
    theme: 'registre formel'
  },
  {
    id: 'cecr-b21-vocab-reg-cause',
    level: 'hsk5',
    hanzi: '导致',
    pinyin: 'dǎozhì',
    translation: 'to lead to, to cause',
    translationFr: 'entraîner, causer',
    category: 'vocabulaire',
    examples: [
      {
        hanzi: '长期熬夜会导致健康问题。',
        pinyin: 'Chángqī áoyè huì dǎozhì jiànkāng wèntí.',
        translation: 'Staying up late long-term can cause health problems.',
        translationFr: "Se coucher tard régulièrement peut entraîner des problèmes de santé."
      }
    ],
    tags: ['cecr-v8', 'b2.1', 'registre-formel'],
    theme: 'registre formel'
  },
  {
    id: 'cecr-b21-vocab-reg-consequence',
    level: 'hsk6',
    hanzi: '后果',
    pinyin: 'hòuguǒ',
    translation: 'consequence, aftermath',
    translationFr: 'conséquence',
    category: 'vocabulaire',
    examples: [
      {
        hanzi: '他没有考虑到决定的后果。',
        pinyin: 'Tā méiyǒu kǎolǜ dào juédìng de hòuguǒ.',
        translation: 'He didn\'t consider the consequences of his decision.',
        translationFr: "Il n'a pas mesuré les conséquences de sa décision."
      }
    ],
    tags: ['cecr-v8', 'b2.1', 'registre-formel'],
    theme: 'registre formel'
  },
  {
    id: 'cecr-b21-vocab-reg-refute',
    level: 'hsk6',
    hanzi: '反驳',
    pinyin: 'fǎnbó',
    translation: 'to refute, to rebut',
    translationFr: 'réfuter',
    category: 'vocabulaire',
    examples: [
      {
        hanzi: '他用事实反驳了对方的观点。',
        pinyin: 'Tā yòng shìshí fǎnbóle duìfāng de guāndiǎn.',
        translation: 'He refuted the other side\'s view with facts.',
        translationFr: "Il a réfuté le point de vue adverse avec des faits."
      }
    ],
    tags: ['cecr-v8', 'b2.1', 'registre-formel'],
    theme: 'registre formel'
  },
  {
    id: 'cecr-b21-vocab-reg-acknowledge',
    level: 'hsk6',
    hanzi: '承认',
    pinyin: 'chéngrèn',
    translation: 'to acknowledge, to admit',
    translationFr: 'reconnaître, admettre',
    category: 'vocabulaire',
    examples: [
      {
        hanzi: '他承认自己的判断有失误。',
        pinyin: 'Tā chéngrèn zìjǐ de pànduàn yǒu shīwù.',
        translation: 'He acknowledges his judgment was mistaken.',
        translationFr: "Il reconnaît que son jugement a été erroné."
      }
    ],
    tags: ['cecr-v8', 'b2.1', 'registre-formel'],
    theme: 'registre formel'
  },
  {
    id: 'cecr-b21-vocab-reg-emphasize',
    level: 'hsk6',
    hanzi: '强调',
    pinyin: 'qiángdiào',
    translation: 'to emphasize',
    translationFr: 'souligner, insister sur',
    category: 'vocabulaire',
    examples: [
      {
        hanzi: '报告强调了可持续发展的重要性。',
        pinyin: 'Bàogào qiángdiàole kě chíxù fāzhǎn de zhòngyàoxìng.',
        translation: 'The report emphasizes the importance of sustainable development.',
        translationFr: "Le rapport souligne l'importance du développement durable."
      }
    ],
    tags: ['cecr-v8', 'b2.1', 'registre-formel'],
    theme: 'registre formel'
  },
  {
    id: 'cecr-b21-vocab-reg-propose',
    level: 'hsk6',
    hanzi: '提议',
    pinyin: 'tíyì',
    translation: 'to propose, proposal',
    translationFr: 'proposer, proposition',
    category: 'vocabulaire',
    examples: [
      {
        hanzi: '委员会提议召开一次专题会议。',
        pinyin: 'Wěiyuánhuì tíyì zhàokāi yī cì zhuāntí huìyì.',
        translation: 'The committee proposes to hold a special meeting.',
        translationFr: "Le comité propose la tenue d'une réunion thématique."
      }
    ],
    tags: ['cecr-v8', 'b2.1', 'registre-formel'],
    theme: 'registre formel'
  }
];

// ============================================================================
//  B2.1 — LOT 2 : compléments transversaux (science, société, médias)
// ============================================================================

const B21_SCIENCE: LessonItem[] = [
  {
    id: 'cecr-b21-vocab-sci-research',
    level: 'hsk5',
    hanzi: '研究',
    pinyin: 'yánjiū',
    translation: 'research, to study',
    translationFr: 'recherche, étudier',
    category: 'vocabulaire',
    examples: [
      {
        hanzi: '这项研究改变了我们对睡眠的理解。',
        pinyin: 'Zhè xiàng yánjiū gǎibiànle wǒmen duì shuìmián de lǐjiě.',
        translation: 'This research has changed our understanding of sleep.',
        translationFr: "Cette recherche a changé notre compréhension du sommeil."
      }
    ],
    tags: ['cecr-v8', 'b2.1', 'science'],
    theme: 'science'
  },
  {
    id: 'cecr-b21-vocab-sci-hypothesis',
    level: 'hsk6',
    hanzi: '假设',
    pinyin: 'jiǎshè',
    translation: 'hypothesis, to assume',
    translationFr: 'hypothèse, supposer',
    category: 'vocabulaire',
    examples: [
      {
        hanzi: '这个假设还没有被实验证实。',
        pinyin: 'Zhège jiǎshè hái méiyǒu bèi shíyàn zhèngshí.',
        translation: 'This hypothesis has not yet been verified by experiment.',
        translationFr: "Cette hypothèse n'a pas encore été confirmée expérimentalement."
      }
    ],
    tags: ['cecr-v8', 'b2.1', 'science'],
    theme: 'science'
  },
  {
    id: 'cecr-b21-vocab-sci-experiment',
    level: 'hsk5',
    hanzi: '实验',
    pinyin: 'shíyàn',
    translation: 'experiment, to experiment',
    translationFr: 'expérience (scientifique)',
    category: 'vocabulaire',
    examples: [
      {
        hanzi: '科学家设计了一系列对照实验。',
        pinyin: 'Kēxuéjiā shèjìle yī xìliè duìzhào shíyàn.',
        translation: 'The scientists designed a series of controlled experiments.',
        translationFr: "Les scientifiques ont conçu une série d'expériences contrôlées."
      }
    ],
    tags: ['cecr-v8', 'b2.1', 'science'],
    theme: 'science'
  },
  {
    id: 'cecr-b21-vocab-sci-theory',
    level: 'hsk5',
    hanzi: '理论',
    pinyin: 'lǐlùn',
    translation: 'theory',
    translationFr: 'théorie',
    category: 'vocabulaire',
    examples: [
      {
        hanzi: '爱因斯坦的相对论改变了物理学。',
        pinyin: 'Àiyīnsītǎn de xiāngduìlùn gǎibiànle wùlǐxué.',
        translation: 'Einstein\'s theory of relativity transformed physics.',
        translationFr: "La théorie de la relativité d'Einstein a transformé la physique."
      }
    ],
    tags: ['cecr-v8', 'b2.1', 'science'],
    theme: 'science'
  },
  {
    id: 'cecr-b21-vocab-sci-discovery',
    level: 'hsk6',
    hanzi: '发现',
    pinyin: 'fāxiàn',
    translation: 'discovery, to discover',
    translationFr: 'découverte, découvrir',
    category: 'vocabulaire',
    examples: [
      {
        hanzi: '这一发现为癌症治疗打开了新的大门。',
        pinyin: 'Zhè yī fāxiàn wèi áizhèng zhìliáo dǎkāile xīn de dàmén.',
        translation: 'This discovery has opened a new door for cancer treatment.',
        translationFr: "Cette découverte ouvre de nouvelles perspectives pour traiter le cancer."
      }
    ],
    tags: ['cecr-v8', 'b2.1', 'science'],
    theme: 'science'
  },
  {
    id: 'cecr-b21-vocab-sci-gene',
    level: 'hsk6',
    hanzi: '基因',
    pinyin: 'jīyīn',
    translation: 'gene',
    translationFr: 'gène',
    category: 'vocabulaire',
    examples: [
      {
        hanzi: '基因编辑技术引发了伦理争议。',
        pinyin: 'Jīyīn biānjí jìshù yǐnfāle lúnlǐ zhēngyì.',
        translation: 'Gene-editing technology has sparked ethical controversy.',
        translationFr: "Les techniques d'édition du génome ont suscité un débat éthique."
      }
    ],
    tags: ['cecr-v8', 'b2.1', 'science'],
    theme: 'science'
  },
  {
    id: 'cecr-b21-vocab-sci-vaccine',
    level: 'hsk6',
    hanzi: '疫苗',
    pinyin: 'yìmiáo',
    translation: 'vaccine',
    translationFr: 'vaccin',
    category: 'vocabulaire',
    examples: [
      {
        hanzi: '新疫苗在临床试验中表现出色。',
        pinyin: 'Xīn yìmiáo zài línchuáng shìyàn zhōng biǎoxiàn chūsè.',
        translation: 'The new vaccine has performed excellently in clinical trials.',
        translationFr: "Le nouveau vaccin a donné d'excellents résultats lors des essais cliniques."
      }
    ],
    tags: ['cecr-v8', 'b2.1', 'science'],
    theme: 'science'
  },
  {
    id: 'cecr-b21-vocab-sci-quantum',
    level: 'hsk6',
    hanzi: '量子',
    pinyin: 'liàngzǐ',
    translation: 'quantum',
    translationFr: 'quantique',
    category: 'vocabulaire',
    examples: [
      {
        hanzi: '量子计算有望解决传统计算机无法处理的问题。',
        pinyin: 'Liàngzǐ jìsuàn yǒu wàng jiějué chuántǒng jìsuànjī wúfǎ chǔlǐ de wèntí.',
        translation: 'Quantum computing promises to solve problems classical computers cannot.',
        translationFr: "L'informatique quantique promet de résoudre des problèmes inaccessibles aux ordinateurs classiques."
      }
    ],
    tags: ['cecr-v8', 'b2.1', 'science'],
    theme: 'science'
  },
  {
    id: 'cecr-b21-vocab-sci-space',
    level: 'hsk5',
    hanzi: '太空',
    pinyin: 'tàikōng',
    translation: 'outer space',
    translationFr: 'espace (cosmique)',
    category: 'vocabulaire',
    examples: [
      {
        hanzi: '中国正在推进自己的太空探索计划。',
        pinyin: 'Zhōngguó zhèngzài tuījìn zìjǐ de tàikōng tànsuǒ jìhuà.',
        translation: 'China is advancing its own space exploration program.',
        translationFr: "La Chine poursuit son programme d'exploration spatiale."
      }
    ],
    tags: ['cecr-v8', 'b2.1', 'science'],
    theme: 'science'
  },
  {
    id: 'cecr-b21-vocab-sci-astronaut',
    level: 'hsk6',
    hanzi: '宇航员',
    pinyin: 'yǔhángyuán',
    translation: 'astronaut',
    translationFr: 'astronaute',
    category: 'vocabulaire',
    examples: [
      {
        hanzi: '三名宇航员将在空间站工作六个月。',
        pinyin: 'Sān míng yǔhángyuán jiàng zài kōngjiānzhàn gōngzuò liù gè yuè.',
        translation: 'Three astronauts will work on the space station for six months.',
        translationFr: "Trois astronautes travailleront six mois dans la station spatiale."
      }
    ],
    tags: ['cecr-v8', 'b2.1', 'science'],
    theme: 'science'
  }
];

const B21_SOCIETE: LessonItem[] = [
  {
    id: 'cecr-b21-vocab-soc-aging',
    level: 'hsk6',
    hanzi: '老龄化',
    pinyin: 'lǎolínghuà',
    translation: 'aging (of population)',
    translationFr: 'vieillissement (démographique)',
    category: 'vocabulaire',
    examples: [
      {
        hanzi: '人口老龄化给养老体系带来压力。',
        pinyin: 'Rénkǒu lǎolínghuà gěi yǎnglǎo tǐxì dàilái yālì.',
        translation: 'Population aging is pressuring the pension system.',
        translationFr: "Le vieillissement démographique met sous tension le système des retraites."
      }
    ],
    tags: ['cecr-v8', 'b2.1', 'societe'],
    theme: 'société'
  },
  {
    id: 'cecr-b21-vocab-soc-urbanization',
    level: 'hsk6',
    hanzi: '城市化',
    pinyin: 'chéngshìhuà',
    translation: 'urbanization',
    translationFr: 'urbanisation',
    category: 'vocabulaire',
    examples: [
      {
        hanzi: '快速城市化改变了社会结构。',
        pinyin: 'Kuàisù chéngshìhuà gǎibiànle shèhuì jiégòu.',
        translation: 'Rapid urbanization has transformed the social fabric.',
        translationFr: "L'urbanisation rapide a transformé la structure sociale."
      }
    ],
    tags: ['cecr-v8', 'b2.1', 'societe'],
    theme: 'société'
  },
  {
    id: 'cecr-b21-vocab-soc-inequality',
    level: 'hsk6',
    hanzi: '不平等',
    pinyin: 'bù píngděng',
    translation: 'inequality',
    translationFr: 'inégalité',
    category: 'vocabulaire',
    examples: [
      {
        hanzi: '收入不平等是一个长期问题。',
        pinyin: 'Shōurù bù píngděng shì yīgè chángqī wèntí.',
        translation: 'Income inequality is a long-standing issue.',
        translationFr: "L'inégalité des revenus est un problème de longue date."
      }
    ],
    tags: ['cecr-v8', 'b2.1', 'societe'],
    theme: 'société'
  },
  {
    id: 'cecr-b21-vocab-soc-mobility',
    level: 'hsk6',
    hanzi: '流动性',
    pinyin: 'liúdòngxìng',
    translation: 'mobility (social, labor)',
    translationFr: 'mobilité (sociale, professionnelle)',
    category: 'vocabulaire',
    examples: [
      {
        hanzi: '社会流动性的下降令人担忧。',
        pinyin: 'Shèhuì liúdòngxìng de xiàjiàng lìng rén dānyōu.',
        translation: 'The decline in social mobility is worrying.',
        translationFr: "Le recul de la mobilité sociale est préoccupant."
      }
    ],
    tags: ['cecr-v8', 'b2.1', 'societe'],
    theme: 'société'
  },
  {
    id: 'cecr-b21-vocab-soc-migrate',
    level: 'hsk5',
    hanzi: '移民',
    pinyin: 'yímín',
    translation: 'to immigrate, immigrant',
    translationFr: 'émigrer, immigrant',
    category: 'vocabulaire',
    examples: [
      {
        hanzi: '政府调整了移民政策。',
        pinyin: 'Zhèngfǔ tiáozhěngle yímín zhèngcè.',
        translation: 'The government has adjusted its immigration policy.',
        translationFr: "Le gouvernement a ajusté sa politique migratoire."
      }
    ],
    tags: ['cecr-v8', 'b2.1', 'societe'],
    theme: 'société'
  },
  {
    id: 'cecr-b21-vocab-soc-gender',
    level: 'hsk6',
    hanzi: '性别',
    pinyin: 'xìngbié',
    translation: 'gender',
    translationFr: 'genre (sexe)',
    category: 'vocabulaire',
    examples: [
      {
        hanzi: '性别平等仍然是一个重要议题。',
        pinyin: 'Xìngbié píngděng réngrán shì yīgè zhòngyào yìtí.',
        translation: 'Gender equality remains an important issue.',
        translationFr: "L'égalité des genres reste un enjeu majeur."
      }
    ],
    tags: ['cecr-v8', 'b2.1', 'societe'],
    theme: 'société'
  },
  {
    id: 'cecr-b21-vocab-soc-welfare',
    level: 'hsk6',
    hanzi: '福利',
    pinyin: 'fúlì',
    translation: 'welfare, benefits',
    translationFr: 'protection sociale, prestations',
    category: 'vocabulaire',
    examples: [
      {
        hanzi: '政府计划扩大儿童福利。',
        pinyin: 'Zhèngfǔ jìhuà kuòdà értóng fúlì.',
        translation: 'The government plans to expand child welfare.',
        translationFr: "Le gouvernement prévoit d'élargir les prestations pour l'enfance."
      }
    ],
    tags: ['cecr-v8', 'b2.1', 'societe'],
    theme: 'société'
  },
  {
    id: 'cecr-b21-vocab-soc-pension',
    level: 'hsk6',
    hanzi: '养老金',
    pinyin: 'yǎnglǎojīn',
    translation: 'pension',
    translationFr: 'retraite, pension',
    category: 'vocabulaire',
    examples: [
      {
        hanzi: '养老金改革是一个敏感话题。',
        pinyin: 'Yǎnglǎojīn gǎigé shì yīgè mǐngǎn huàtí.',
        translation: 'Pension reform is a sensitive topic.',
        translationFr: "La réforme des retraites est un sujet sensible."
      }
    ],
    tags: ['cecr-v8', 'b2.1', 'societe'],
    theme: 'société'
  }
];

const B21_MEDIA: LessonItem[] = [
  {
    id: 'cecr-b21-vocab-med-social',
    level: 'hsk5',
    hanzi: '社交媒体',
    pinyin: 'shèjiāo méitǐ',
    translation: 'social media',
    translationFr: 'réseaux sociaux',
    category: 'vocabulaire',
    examples: [
      {
        hanzi: '社交媒体改变了我们获取新闻的方式。',
        pinyin: 'Shèjiāo méitǐ gǎibiànle wǒmen huòqǔ xīnwén de fāngshì.',
        translation: 'Social media has changed how we consume news.',
        translationFr: "Les réseaux sociaux ont transformé notre façon de consommer l'information."
      }
    ],
    tags: ['cecr-v8', 'b2.1', 'media'],
    theme: 'médias'
  },
  {
    id: 'cecr-b21-vocab-med-disinformation',
    level: 'hsk6',
    hanzi: '虚假信息',
    pinyin: 'xūjiǎ xìnxī',
    translation: 'disinformation, fake news',
    translationFr: 'désinformation, fausses informations',
    category: 'vocabulaire',
    examples: [
      {
        hanzi: '打击虚假信息需要媒体和平台的合作。',
        pinyin: 'Dǎjí xūjiǎ xìnxī xūyào méitǐ hé píngtái de hézuò.',
        translation: 'Fighting disinformation requires cooperation between media and platforms.',
        translationFr: "Lutter contre la désinformation exige la coopération des médias et des plateformes."
      }
    ],
    tags: ['cecr-v8', 'b2.1', 'media'],
    theme: 'médias'
  },
  {
    id: 'cecr-b21-vocab-med-influencer',
    level: 'hsk6',
    hanzi: '网红',
    pinyin: 'wǎnghóng',
    translation: 'online celebrity, influencer',
    translationFr: 'influenceur, star du web',
    category: 'vocabulaire',
    examples: [
      {
        hanzi: '这位网红在短视频平台上拥有上千万粉丝。',
        pinyin: 'Zhè wèi wǎnghóng zài duǎn shìpín píngtái shàng yǒngyǒu shàng qiān wàn fěnsī.',
        translation: 'This influencer has tens of millions of followers on short-video platforms.',
        translationFr: "Cet influenceur cumule des dizaines de millions d'abonnés sur les plateformes de vidéos courtes."
      }
    ],
    tags: ['cecr-v8', 'b2.1', 'media'],
    theme: 'médias'
  },
  {
    id: 'cecr-b21-vocab-med-broadcast',
    level: 'hsk6',
    hanzi: '直播',
    pinyin: 'zhíbō',
    translation: 'live streaming, livestream',
    translationFr: 'diffusion en direct',
    category: 'vocabulaire',
    examples: [
      {
        hanzi: '他每晚八点直播讲解新闻。',
        pinyin: 'Tā měi wǎn bā diǎn zhíbō jiǎngjiě xīnwén.',
        translation: 'He live-streams news commentary every night at 8pm.',
        translationFr: "Il commente l'actualité en direct chaque soir à vingt heures."
      }
    ],
    tags: ['cecr-v8', 'b2.1', 'media'],
    theme: 'médias'
  },
  {
    id: 'cecr-b21-vocab-med-public-opinion',
    level: 'hsk6',
    hanzi: '舆论',
    pinyin: 'yúlùn',
    translation: 'public opinion',
    translationFr: "opinion publique",
    category: 'vocabulaire',
    examples: [
      {
        hanzi: '这则报道在舆论界引起了强烈反响。',
        pinyin: 'Zhè zé bàodào zài yúlùnjiè yǐnqǐle qiángliè fǎnxiǎng.',
        translation: 'The report triggered strong reactions in public opinion.',
        translationFr: "Ce reportage a suscité de vives réactions dans l'opinion publique."
      }
    ],
    tags: ['cecr-v8', 'b2.1', 'media'],
    theme: 'médias'
  }
];

export const cecrB21TechVocab = B21_TECH;
export const cecrB21EnvVocab = B21_ENV;
export const cecrB21EconVocab = B21_ECON;
export const cecrB21RegistreVocab = B21_REGISTRE;
export const cecrB21ScienceVocab = B21_SCIENCE;
export const cecrB21SocieteVocab = B21_SOCIETE;
export const cecrB21MediaVocab = B21_MEDIA;

// ============================================================================
//  B2.2 — ARTS & CULTURE TRADITIONNELLE
// ============================================================================

const B22_ARTS: LessonItem[] = [
  {
    id: 'cecr-b22-vocab-arts-ink-painting',
    level: 'hsk6',
    hanzi: '水墨画',
    pinyin: 'shuǐmòhuà',
    translation: 'ink wash painting',
    translationFr: 'peinture à l\'encre de Chine',
    category: 'vocabulaire',
    examples: [
      {
        hanzi: '水墨画讲究意境和留白。',
        pinyin: 'Shuǐmòhuà jiǎngjiū yìjìng hé liúbái.',
        translation: 'Ink wash painting values atmosphere and empty space.',
        translationFr: "La peinture à l'encre privilégie l'atmosphère et le blanc."
      }
    ],
    tags: ['cecr-v8', 'b2.2', 'arts'],
    theme: 'arts'
  },
  {
    id: 'cecr-b22-vocab-arts-calligraphy',
    level: 'hsk5',
    hanzi: '书法',
    pinyin: 'shūfǎ',
    translation: 'calligraphy',
    translationFr: 'calligraphie',
    category: 'vocabulaire',
    examples: [
      {
        hanzi: '他从小练习书法,功底深厚。',
        pinyin: 'Tā cóngxiǎo liànxí shūfǎ, gōngdǐ shēnhòu.',
        translation: 'He has practiced calligraphy since childhood and has solid skills.',
        translationFr: 'Il pratique la calligraphie depuis l\'enfance et a une base solide.'
      }
    ],
    tags: ['cecr-v8', 'b2.2', 'arts'],
    theme: 'arts'
  },
  {
    id: 'cecr-b22-vocab-arts-opera',
    level: 'hsk6',
    hanzi: '京剧',
    pinyin: 'jīngjù',
    translation: 'Peking opera',
    translationFr: 'opéra de Pékin',
    category: 'vocabulaire',
    examples: [
      {
        hanzi: '京剧是中国传统戏曲的代表。',
        pinyin: 'Jīngjù shì Zhōngguó chuántǒng xìqǔ de dàibiǎo.',
        translation: 'Peking opera represents traditional Chinese theater.',
        translationFr: "L'opéra de Pékin représente le théâtre traditionnel chinois."
      }
    ],
    tags: ['cecr-v8', 'b2.2', 'arts'],
    theme: 'arts'
  },
  {
    id: 'cecr-b22-vocab-arts-heritage',
    level: 'hsk6',
    hanzi: '非物质文化遗产',
    pinyin: 'fēiwùzhì wénhuà yíchǎn',
    translation: 'intangible cultural heritage',
    translationFr: 'patrimoine culturel immatériel',
    category: 'vocabulaire',
    examples: [
      {
        hanzi: '这门手艺被列入了非物质文化遗产名录。',
        pinyin: 'Zhè mén shǒuyì bèi lièrùle fēiwùzhì wénhuà yíchǎn mínglù.',
        translation: 'This craft has been listed as intangible cultural heritage.',
        translationFr: 'Cet artisanat a été inscrit au patrimoine culturel immatériel.'
      }
    ],
    tags: ['cecr-v8', 'b2.2', 'arts'],
    theme: 'arts'
  },
  {
    id: 'cecr-b22-vocab-arts-dying-out',
    level: 'hsk6',
    hanzi: '濒临失传',
    pinyin: 'bīnlín shīchuán',
    translation: 'on the verge of being lost',
    translationFr: 'en voie de disparition (savoir-faire)',
    category: 'vocabulaire',
    examples: [
      {
        hanzi: '许多古老的技艺正濒临失传。',
        pinyin: 'Xǔduō gǔlǎo de jìyì zhèng bīnlín shīchuán.',
        translation: 'Many ancient skills are on the verge of being lost.',
        translationFr: "De nombreux savoir-faire anciens sont en voie de disparition."
      }
    ],
    tags: ['cecr-v8', 'b2.2', 'arts'],
    theme: 'arts'
  },
  {
    id: 'cecr-b22-vocab-arts-inherit',
    level: 'hsk5',
    hanzi: '传承',
    pinyin: 'chuánchéng',
    translation: 'to pass on / inherit (tradition)',
    translationFr: 'transmettre (tradition)',
    category: 'vocabulaire',
    examples: [
      {
        hanzi: '我们有责任传承这些传统文化。',
        pinyin: 'Wǒmen yǒu zérèn chuánchéng zhèxiē chuántǒng wénhuà.',
        translation: 'We are responsible for passing on these traditional cultures.',
        translationFr: 'Nous sommes responsables de transmettre ces cultures traditionnelles.'
      }
    ],
    tags: ['cecr-v8', 'b2.2', 'arts'],
    theme: 'arts'
  },
  {
    id: 'cecr-b22-vocab-arts-craftsman',
    level: 'hsk6',
    hanzi: '工匠精神',
    pinyin: 'gōngjiàng jīngshén',
    translation: 'craftsmanship spirit',
    translationFr: "esprit d'artisan / souci du bien-fait",
    category: 'vocabulaire',
    examples: [
      {
        hanzi: '工匠精神体现了对细节的极致追求。',
        pinyin: 'Gōngjiàng jīngshén tǐxiànle duì xìjié de jízhì zhuīqiú.',
        translation: 'The craftsman spirit reflects the ultimate pursuit of detail.',
        translationFr: "L'esprit d'artisan reflète la quête ultime du détail."
      }
    ],
    tags: ['cecr-v8', 'b2.2', 'arts'],
    theme: 'arts'
  },
  {
    id: 'cecr-b22-vocab-arts-exquisite',
    level: 'hsk6',
    hanzi: '精湛',
    pinyin: 'jīngzhàn',
    translation: 'consummate / exquisite (skill)',
    translationFr: 'consommé / raffiné (savoir-faire)',
    category: 'vocabulaire',
    examples: [
      {
        hanzi: '他的技艺十分精湛。',
        pinyin: 'Tā de jìyì shífēn jīngzhàn.',
        translation: 'His skill is truly exquisite.',
        translationFr: 'Son savoir-faire est vraiment consommé.'
      }
    ],
    tags: ['cecr-v8', 'b2.2', 'arts'],
    theme: 'arts'
  },
  {
    id: 'cecr-b22-vocab-arts-aesthetic',
    level: 'hsk6',
    hanzi: '审美',
    pinyin: 'shěnměi',
    translation: 'aesthetics / aesthetic taste',
    translationFr: 'esthétique / goût',
    category: 'vocabulaire',
    examples: [
      {
        hanzi: '不同时代的审美观念差别很大。',
        pinyin: 'Bùtóng shídài de shěnměi guānniàn chābié hěn dà.',
        translation: 'Aesthetic standards vary greatly across eras.',
        translationFr: 'Les normes esthétiques diffèrent beaucoup selon les époques.'
      }
    ],
    tags: ['cecr-v8', 'b2.2', 'arts'],
    theme: 'arts'
  },
  {
    id: 'cecr-b22-vocab-arts-connotation',
    level: 'hsk6',
    hanzi: '内涵',
    pinyin: 'nèihán',
    translation: 'inner meaning / depth',
    translationFr: 'sens profond / substance',
    category: 'vocabulaire',
    examples: [
      {
        hanzi: '这部作品文化内涵十分丰富。',
        pinyin: 'Zhè bù zuòpǐn wénhuà nèihán shífēn fēngfù.',
        translation: 'This work has very rich cultural depth.',
        translationFr: 'Cette œuvre a une grande richesse culturelle.'
      }
    ],
    tags: ['cecr-v8', 'b2.2', 'arts'],
    theme: 'arts'
  },
  {
    id: 'cecr-b22-vocab-arts-masterpiece',
    level: 'hsk5',
    hanzi: '杰作',
    pinyin: 'jiézuò',
    translation: 'masterpiece',
    translationFr: 'chef-d\'œuvre',
    category: 'vocabulaire',
    examples: [
      {
        hanzi: '《红楼梦》被认为是中国文学的杰作。',
        pinyin: '《Hónglóumèng》 bèi rènwéi shì Zhōngguó wénxué de jiézuò.',
        translation: '"Dream of the Red Chamber" is considered a masterpiece of Chinese literature.',
        translationFr: '« Le Rêve dans le pavillon rouge » est considéré comme un chef-d\'œuvre.'
      }
    ],
    tags: ['cecr-v8', 'b2.2', 'arts'],
    theme: 'arts'
  },
  {
    id: 'cecr-b22-vocab-arts-revival',
    level: 'hsk6',
    hanzi: '复兴',
    pinyin: 'fùxīng',
    translation: 'revival / renaissance',
    translationFr: 'renaissance / renouveau',
    category: 'vocabulaire',
    examples: [
      {
        hanzi: '传统文化正在经历一场复兴。',
        pinyin: 'Chuántǒng wénhuà zhèngzài jīnglì yì chǎng fùxīng.',
        translation: 'Traditional culture is undergoing a revival.',
        translationFr: 'La culture traditionnelle connaît une renaissance.'
      }
    ],
    tags: ['cecr-v8', 'b2.2', 'arts'],
    theme: 'arts'
  },
  {
    id: 'cecr-b22-vocab-arts-appreciate',
    level: 'hsk5',
    hanzi: '欣赏',
    pinyin: 'xīnshǎng',
    translation: 'to appreciate / admire',
    translationFr: 'apprécier / admirer',
    category: 'vocabulaire',
    examples: [
      {
        hanzi: '我非常欣赏这位艺术家的作品。',
        pinyin: 'Wǒ fēicháng xīnshǎng zhè wèi yìshùjiā de zuòpǐn.',
        translation: 'I deeply appreciate this artist\'s works.',
        translationFr: "J'apprécie beaucoup les œuvres de cet artiste."
      }
    ],
    tags: ['cecr-v8', 'b2.2', 'arts'],
    theme: 'arts'
  },
  {
    id: 'cecr-b22-vocab-arts-exhibit',
    level: 'hsk5',
    hanzi: '展览',
    pinyin: 'zhǎnlǎn',
    translation: 'exhibition',
    translationFr: 'exposition',
    category: 'vocabulaire',
    examples: [
      {
        hanzi: '这次展览汇集了三十多位画家的作品。',
        pinyin: 'Zhè cì zhǎnlǎn huìjíle sānshí duō wèi huàjiā de zuòpǐn.',
        translation: 'This exhibition gathers works from over thirty painters.',
        translationFr: 'Cette exposition rassemble des œuvres de plus de trente peintres.'
      }
    ],
    tags: ['cecr-v8', 'b2.2', 'arts'],
    theme: 'arts'
  },
  {
    id: 'cecr-b22-vocab-arts-artistic',
    level: 'hsk6',
    hanzi: '艺术性',
    pinyin: 'yìshùxìng',
    translation: 'artistic quality',
    translationFr: 'qualité artistique',
    category: 'vocabulaire',
    examples: [
      {
        hanzi: '这部电影的艺术性很高。',
        pinyin: 'Zhè bù diànyǐng de yìshùxìng hěn gāo.',
        translation: 'This film has high artistic quality.',
        translationFr: 'Ce film possède une grande qualité artistique.'
      }
    ],
    tags: ['cecr-v8', 'b2.2', 'arts'],
    theme: 'arts'
  }
];

// ============================================================================
//  B2.2 — SANTÉ & PSYCHOLOGIE
// ============================================================================

const B22_HEALTH: LessonItem[] = [
  {
    id: 'cecr-b22-vocab-health-mental',
    level: 'hsk6',
    hanzi: '心理健康',
    pinyin: 'xīnlǐ jiànkāng',
    translation: 'mental health',
    translationFr: 'santé mentale',
    category: 'vocabulaire',
    examples: [
      {
        hanzi: '越来越多的年轻人开始关注心理健康。',
        pinyin: 'Yuèláiyuè duō de niánqīngrén kāishǐ guānzhù xīnlǐ jiànkāng.',
        translation: 'More and more young people are starting to care about mental health.',
        translationFr: 'De plus en plus de jeunes s\'intéressent à la santé mentale.'
      }
    ],
    tags: ['cecr-v8', 'b2.2', 'health'],
    theme: 'santé'
  },
  {
    id: 'cecr-b22-vocab-health-anxiety',
    level: 'hsk6',
    hanzi: '焦虑',
    pinyin: 'jiāolǜ',
    translation: 'anxiety / anxious',
    translationFr: 'anxiété / anxieux',
    category: 'vocabulaire',
    examples: [
      {
        hanzi: '考试前他感到非常焦虑。',
        pinyin: 'Kǎoshì qián tā gǎndào fēicháng jiāolǜ.',
        translation: 'He feels very anxious before exams.',
        translationFr: 'Il se sent très anxieux avant les examens.'
      }
    ],
    tags: ['cecr-v8', 'b2.2', 'health'],
    theme: 'santé'
  },
  {
    id: 'cecr-b22-vocab-health-depression',
    level: 'hsk6',
    hanzi: '抑郁',
    pinyin: 'yìyù',
    translation: 'depression / depressed',
    translationFr: 'dépression / déprimé',
    category: 'vocabulaire',
    examples: [
      {
        hanzi: '长期压力可能导致抑郁。',
        pinyin: 'Chángqī yālì kěnéng dǎozhì yìyù.',
        translation: 'Prolonged stress can lead to depression.',
        translationFr: 'Un stress prolongé peut conduire à la dépression.'
      }
    ],
    tags: ['cecr-v8', 'b2.2', 'health'],
    theme: 'santé'
  },
  {
    id: 'cecr-b22-vocab-health-burnout',
    level: 'hsk6',
    hanzi: '过劳',
    pinyin: 'guòláo',
    translation: 'overwork / burnout',
    translationFr: 'surmenage / burn-out',
    category: 'vocabulaire',
    examples: [
      {
        hanzi: '过劳已经成为职场一大隐患。',
        pinyin: 'Guòláo yǐjīng chéngwéi zhíchǎng yí dà yǐnhuàn.',
        translation: 'Burnout has become a major workplace hazard.',
        translationFr: "Le surmenage est devenu un fléau majeur en milieu professionnel."
      }
    ],
    tags: ['cecr-v8', 'b2.2', 'health'],
    theme: 'santé'
  },
  {
    id: 'cecr-b22-vocab-health-insomnia',
    level: 'hsk6',
    hanzi: '失眠',
    pinyin: 'shīmián',
    translation: 'insomnia',
    translationFr: 'insomnie',
    category: 'vocabulaire',
    examples: [
      {
        hanzi: '最近工作太累,我经常失眠。',
        pinyin: 'Zuìjìn gōngzuò tài lèi, wǒ jīngcháng shīmián.',
        translation: 'Work has been exhausting lately, I often have insomnia.',
        translationFr: "Le travail est très fatigant ces derniers temps, je fais souvent de l'insomnie."
      }
    ],
    tags: ['cecr-v8', 'b2.2', 'health'],
    theme: 'santé'
  },
  {
    id: 'cecr-b22-vocab-health-therapy',
    level: 'hsk6',
    hanzi: '心理咨询',
    pinyin: 'xīnlǐ zīxún',
    translation: 'psychological counseling',
    translationFr: 'consultation psychologique',
    category: 'vocabulaire',
    examples: [
      {
        hanzi: '他开始定期接受心理咨询。',
        pinyin: 'Tā kāishǐ dìngqī jiēshòu xīnlǐ zīxún.',
        translation: 'He started regular psychological counseling.',
        translationFr: 'Il a commencé des consultations psychologiques régulières.'
      }
    ],
    tags: ['cecr-v8', 'b2.2', 'health'],
    theme: 'santé'
  },
  {
    id: 'cecr-b22-vocab-health-stress',
    level: 'hsk5',
    hanzi: '压力',
    pinyin: 'yālì',
    translation: 'pressure / stress',
    translationFr: 'pression / stress',
    category: 'vocabulaire',
    examples: [
      {
        hanzi: '他最近承受着巨大的工作压力。',
        pinyin: 'Tā zuìjìn chéngshòu zhe jùdà de gōngzuò yālì.',
        translation: 'He\'s under huge work pressure lately.',
        translationFr: 'Il subit une énorme pression au travail ces derniers temps.'
      }
    ],
    tags: ['cecr-v8', 'b2.2', 'health'],
    theme: 'santé'
  },
  {
    id: 'cecr-b22-vocab-health-relieve',
    level: 'hsk6',
    hanzi: '缓解',
    pinyin: 'huǎnjiě',
    translation: 'to alleviate / relieve',
    translationFr: 'soulager / atténuer',
    category: 'vocabulaire',
    examples: [
      {
        hanzi: '运动可以有效缓解压力。',
        pinyin: 'Yùndòng kěyǐ yǒuxiào huǎnjiě yālì.',
        translation: 'Exercise can effectively relieve stress.',
        translationFr: "L'exercice peut efficacement atténuer le stress."
      }
    ],
    tags: ['cecr-v8', 'b2.2', 'health'],
    theme: 'santé'
  },
  {
    id: 'cecr-b22-vocab-health-wellbeing',
    level: 'hsk6',
    hanzi: '幸福感',
    pinyin: 'xìngfúgǎn',
    translation: 'sense of well-being',
    translationFr: 'sentiment de bien-être',
    category: 'vocabulaire',
    examples: [
      {
        hanzi: '良好的人际关系能提升幸福感。',
        pinyin: 'Liánghǎo de rénjì guānxì néng tíshēng xìngfúgǎn.',
        translation: 'Good relationships can boost well-being.',
        translationFr: 'De bonnes relations augmentent le bien-être.'
      }
    ],
    tags: ['cecr-v8', 'b2.2', 'health'],
    theme: 'santé'
  },
  {
    id: 'cecr-b22-vocab-health-immune',
    level: 'hsk6',
    hanzi: '免疫力',
    pinyin: 'miǎnyìlì',
    translation: 'immunity',
    translationFr: 'immunité',
    category: 'vocabulaire',
    examples: [
      {
        hanzi: '合理的饮食有助于提高免疫力。',
        pinyin: 'Hélǐ de yǐnshí yǒuzhù yú tígāo miǎnyìlì.',
        translation: 'A balanced diet helps strengthen immunity.',
        translationFr: "Une alimentation équilibrée aide à renforcer l'immunité."
      }
    ],
    tags: ['cecr-v8', 'b2.2', 'health'],
    theme: 'santé'
  },
  {
    id: 'cecr-b22-vocab-health-chronic',
    level: 'hsk6',
    hanzi: '慢性病',
    pinyin: 'mànxìngbìng',
    translation: 'chronic disease',
    translationFr: 'maladie chronique',
    category: 'vocabulaire',
    examples: [
      {
        hanzi: '糖尿病属于慢性病,需要长期管理。',
        pinyin: 'Tángniàobìng shǔyú mànxìngbìng, xūyào chángqī guǎnlǐ.',
        translation: 'Diabetes is a chronic disease requiring long-term management.',
        translationFr: 'Le diabète est une maladie chronique nécessitant un suivi à long terme.'
      }
    ],
    tags: ['cecr-v8', 'b2.2', 'health'],
    theme: 'santé'
  },
  {
    id: 'cecr-b22-vocab-health-prevent',
    level: 'hsk5',
    hanzi: '预防',
    pinyin: 'yùfáng',
    translation: 'prevent / prevention',
    translationFr: 'prévenir / prévention',
    category: 'vocabulaire',
    examples: [
      {
        hanzi: '预防胜于治疗。',
        pinyin: 'Yùfáng shèngyú zhìliáo.',
        translation: 'Prevention is better than cure.',
        translationFr: "Mieux vaut prévenir que guérir."
      }
    ],
    tags: ['cecr-v8', 'b2.2', 'health'],
    theme: 'santé'
  }
];

// ============================================================================
//  B2.2 — DÉBAT & ARGUMENTATION
// ============================================================================

const B22_DEBATE: LessonItem[] = [
  {
    id: 'cecr-b22-vocab-debate-stance',
    level: 'hsk6',
    hanzi: '立场',
    pinyin: 'lìchǎng',
    translation: 'stance / position',
    translationFr: 'position / prise de position',
    category: 'vocabulaire',
    examples: [
      {
        hanzi: '他在这个问题上立场非常明确。',
        pinyin: 'Tā zài zhège wèntí shàng lìchǎng fēicháng míngquè.',
        translation: 'His position on this issue is very clear.',
        translationFr: 'Sa position sur cette question est très claire.'
      }
    ],
    tags: ['cecr-v8', 'b2.2', 'debate'],
    theme: 'débat'
  },
  {
    id: 'cecr-b22-vocab-debate-refute',
    level: 'hsk6',
    hanzi: '反驳',
    pinyin: 'fǎnbó',
    translation: 'to refute / rebut',
    translationFr: 'réfuter',
    category: 'vocabulaire',
    examples: [
      {
        hanzi: '她用数据有力地反驳了对方的观点。',
        pinyin: 'Tā yòng shùjù yǒulì de fǎnbóle duìfāng de guāndiǎn.',
        translation: 'She forcefully refuted the opponent\'s view with data.',
        translationFr: "Elle a réfuté avec force le point de vue adverse à l'aide de données."
      }
    ],
    tags: ['cecr-v8', 'b2.2', 'debate'],
    theme: 'débat'
  },
  {
    id: 'cecr-b22-vocab-debate-argument',
    level: 'hsk6',
    hanzi: '论据',
    pinyin: 'lùnjù',
    translation: 'argument / evidence (in debate)',
    translationFr: 'argument (appui / preuve)',
    category: 'vocabulaire',
    examples: [
      {
        hanzi: '他的论据不够充分。',
        pinyin: 'Tā de lùnjù bùgòu chōngfèn.',
        translation: 'His arguments are not sufficient.',
        translationFr: 'Ses arguments ne sont pas suffisants.'
      }
    ],
    tags: ['cecr-v8', 'b2.2', 'debate'],
    theme: 'débat'
  },
  {
    id: 'cecr-b22-vocab-debate-untenable',
    level: 'hsk6',
    hanzi: '站不住脚',
    pinyin: 'zhàn bu zhù jiǎo',
    translation: 'untenable / doesn\'t hold up',
    translationFr: 'ne tient pas (argument)',
    category: 'vocabulaire',
    examples: [
      {
        hanzi: '这个观点在事实面前站不住脚。',
        pinyin: 'Zhège guāndiǎn zài shìshí miànqián zhàn bu zhù jiǎo.',
        translation: 'This view doesn\'t hold up in the face of facts.',
        translationFr: 'Ce point de vue ne tient pas face aux faits.'
      }
    ],
    tags: ['cecr-v8', 'b2.2', 'debate'],
    theme: 'débat'
  },
  {
    id: 'cecr-b22-vocab-debate-prejudice',
    level: 'hsk6',
    hanzi: '偏见',
    pinyin: 'piānjiàn',
    translation: 'prejudice / bias',
    translationFr: 'préjugé / parti pris',
    category: 'vocabulaire',
    examples: [
      {
        hanzi: '我们应该克服自己的偏见。',
        pinyin: 'Wǒmen yīnggāi kèfú zìjǐ de piānjiàn.',
        translation: 'We should overcome our prejudices.',
        translationFr: 'Nous devons surmonter nos préjugés.'
      }
    ],
    tags: ['cecr-v8', 'b2.2', 'debate'],
    theme: 'débat'
  },
  {
    id: 'cecr-b22-vocab-debate-objective',
    level: 'hsk5',
    hanzi: '客观',
    pinyin: 'kèguān',
    translation: 'objective',
    translationFr: 'objectif',
    category: 'vocabulaire',
    examples: [
      {
        hanzi: '我们需要从客观角度分析问题。',
        pinyin: 'Wǒmen xūyào cóng kèguān jiǎodù fēnxī wèntí.',
        translation: 'We need to analyze the issue objectively.',
        translationFr: "Nous devons analyser le problème de façon objective."
      }
    ],
    tags: ['cecr-v8', 'b2.2', 'debate'],
    theme: 'débat'
  },
  {
    id: 'cecr-b22-vocab-debate-subjective',
    level: 'hsk5',
    hanzi: '主观',
    pinyin: 'zhǔguān',
    translation: 'subjective',
    translationFr: 'subjectif',
    category: 'vocabulaire',
    examples: [
      {
        hanzi: '这只是他主观的看法。',
        pinyin: 'Zhè zhǐshì tā zhǔguān de kànfǎ.',
        translation: 'This is just his subjective view.',
        translationFr: "Ce n'est que son point de vue subjectif."
      }
    ],
    tags: ['cecr-v8', 'b2.2', 'debate'],
    theme: 'débat'
  },
  {
    id: 'cecr-b22-vocab-debate-polarize',
    level: 'hsk6',
    hanzi: '两极分化',
    pinyin: 'liǎngjí fēnhuà',
    translation: 'polarization',
    translationFr: 'polarisation',
    category: 'vocabulaire',
    examples: [
      {
        hanzi: '网络上的舆论常常出现两极分化。',
        pinyin: 'Wǎngluò shàng de yúlùn chángcháng chūxiàn liǎngjí fēnhuà.',
        translation: 'Online opinions often show polarization.',
        translationFr: "L'opinion en ligne se polarise souvent."
      }
    ],
    tags: ['cecr-v8', 'b2.2', 'debate'],
    theme: 'débat'
  },
  {
    id: 'cecr-b22-vocab-debate-compromise',
    level: 'hsk6',
    hanzi: '妥协',
    pinyin: 'tuǒxié',
    translation: 'compromise',
    translationFr: 'compromis',
    category: 'vocabulaire',
    examples: [
      {
        hanzi: '双方最终达成了妥协。',
        pinyin: 'Shuāngfāng zuìzhōng dáchéngle tuǒxié.',
        translation: 'Both sides finally reached a compromise.',
        translationFr: 'Les deux parties ont finalement trouvé un compromis.'
      }
    ],
    tags: ['cecr-v8', 'b2.2', 'debate'],
    theme: 'débat'
  },
  {
    id: 'cecr-b22-vocab-debate-consensus',
    level: 'hsk6',
    hanzi: '共识',
    pinyin: 'gòngshí',
    translation: 'consensus',
    translationFr: 'consensus',
    category: 'vocabulaire',
    examples: [
      {
        hanzi: '这个议题很难达成共识。',
        pinyin: 'Zhège yìtí hěn nán dáchéng gòngshí.',
        translation: 'Consensus is hard to reach on this topic.',
        translationFr: 'Il est difficile de parvenir à un consensus sur ce sujet.'
      }
    ],
    tags: ['cecr-v8', 'b2.2', 'debate'],
    theme: 'débat'
  },
  {
    id: 'cecr-b22-vocab-debate-persuasive',
    level: 'hsk6',
    hanzi: '有说服力',
    pinyin: 'yǒu shuōfúlì',
    translation: 'persuasive',
    translationFr: 'convaincant',
    category: 'vocabulaire',
    examples: [
      {
        hanzi: '她的论证很有说服力。',
        pinyin: 'Tā de lùnzhèng hěn yǒu shuōfúlì.',
        translation: 'Her argumentation is very persuasive.',
        translationFr: 'Son argumentation est très convaincante.'
      }
    ],
    tags: ['cecr-v8', 'b2.2', 'debate'],
    theme: 'débat'
  },
  {
    id: 'cecr-b22-vocab-debate-fallacy',
    level: 'hsk6',
    hanzi: '谬误',
    pinyin: 'miùwù',
    translation: 'fallacy / error in reasoning',
    translationFr: 'sophisme / erreur de raisonnement',
    category: 'vocabulaire',
    examples: [
      {
        hanzi: '他的推理中有明显的逻辑谬误。',
        pinyin: 'Tā de tuīlǐ zhōng yǒu míngxiǎn de luójí miùwù.',
        translation: 'There are clear logical fallacies in his reasoning.',
        translationFr: 'Il y a des sophismes logiques évidents dans son raisonnement.'
      }
    ],
    tags: ['cecr-v8', 'b2.2', 'debate'],
    theme: 'débat'
  }
];

export const cecrB22ArtsVocab = B22_ARTS;
export const cecrB22HealthVocab = B22_HEALTH;
export const cecrB22DebateVocab = B22_DEBATE;

/**
 * Tous les items B2.1 rédigés à la main, concaténés.
 * Consommé par lessons.ts pour enrichir l'index global.
 */
export const cecrB2VocabAll: LessonItem[] = [
  ...B21_TECH,
  ...B21_ENV,
  ...B21_ECON,
  ...B21_REGISTRE,
  ...B21_SCIENCE,
  ...B21_SOCIETE,
  ...B21_MEDIA,
  ...B22_ARTS,
  ...B22_HEALTH,
  ...B22_DEBATE
];
