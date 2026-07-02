/**
 * grammar-lessons-extra.ts — 10 leçons de grammaire supplémentaires
 * ------------------------------------------------------------------
 * Comble les gaps du catalogue existant :
 *   - HSK1 (A1) : 也 (aussi), 都 (tous)
 *   - HSK2 (A2) : 一边...一边... (action en parallèle), 给 (donner / pour)
 *   - HSK3 (B1) : 是...的 (structure de focus)
 *   - HSK4 (B2) : 不仅...而且 (non seulement), 即使...也 (même si)
 *   - HSK5 (C1) : 只要...就 (du moment que), 哪怕 (même si — emphatique)
 *   - HSK6 (C2) : 由于...因此 (étant donné que ... par conséquent)
 *
 * Chaque entrée respecte le shape `LessonItem` avec `grammarExplanation`
 * complet (when / how / mistakes / tips) + `examples` + `grammarQuiz`
 * QCM (particle-choice / fill-blank).
 */
import type { LessonItem } from '../types';

export const grammarLessonsExtra: LessonItem[] = [
  // ============================================
  // HSK1 — 也 (aussi)
  // ============================================
  {
    id: 'grammar-ye-also',
    level: 'hsk1',
    hanzi: '也',
    pinyin: 'yě',
    translation: 'also, too',
    translationFr: 'aussi',
    category: 'grammaire',
    explanation: 'L\'adverbe 也 (yě) « aussi » se place TOUJOURS avant le verbe ou l\'adjectif, jamais en fin de phrase comme en français.',
    grammarExplanation: {
      whenToUse: '也 indique que ce qui suit s\'applique aussi au sujet :\n• Pour ajouter une personne à une action déjà mentionnée\n• Pour ajouter une qualité/état\n• Pour exprimer une similarité',
      whenToUseEn: '也 expresses that what follows also applies to the subject:\n• To add a person to an already-mentioned action\n• To add a quality/state\n• To express similarity',
      howToUse: 'Structure : Sujet + 也 + Verbe / Adjectif\n\nExemples :\n• 我也喜欢咖啡 (wǒyě xǐhuan kāfēi) = J\'aime aussi le café\n• 他也是学生 (tā yě shì xuésheng) = Il est aussi étudiant\n• 今天也很热 (jīntiān yě hěn rè) = Aujourd\'hui aussi il fait chaud',
      howToUseEn: 'Structure: Subject + 也 + Verb / Adjective\n\nExamples:\n• 我也喜欢咖啡 (wǒyě xǐhuan kāfēi) = I also like coffee\n• 他也是学生 (tā yě shì xuésheng) = He is also a student\n• 今天也很热 (jīntiān yě hěn rè) = Today is also hot',
      commonMistakes: '❌ Ne placez PAS 也 en fin de phrase comme en français !\n• Incorrect : 我喜欢咖啡也\n• Correct : 我也喜欢咖啡\n\n❌ Ne placez PAS 也 avant le sujet\n• Incorrect : 也我去\n• Correct : 我也去',
      commonMistakesEn: '❌ DON\'T place 也 at the end like in English!\n• Incorrect: 我喜欢咖啡也\n• Correct: 我也喜欢咖啡\n\n❌ DON\'T place 也 before the subject\n• Incorrect: 也我去\n• Correct: 我也去',
      tips: '💡 Mnémonique : « 也 = aussi, juste avant le verbe »\n💡 Avec 不 ou 没 : l\'ordre est 也 + 不/没 + verbe\n  → 我也不去 (yě bù qù) = Moi non plus je n\'y vais pas',
      tipsEn: '💡 Mnemonic: "也 = also, right before the verb"\n💡 With 不 or 没: 也 + 不/没 + verb\n  → 我也不去 = I\'m also not going',
      relatedGrammar: ['grammar-dou-all']
    },
    examples: [
      { hanzi: '我也是中国人', pinyin: 'wǒ yě shì Zhōngguórén', translation: 'I\'m also Chinese', translationFr: 'Je suis aussi chinois·e' },
      { hanzi: '她也想去', pinyin: 'tā yě xiǎng qù', translation: 'She also wants to go', translationFr: 'Elle aussi veut y aller' },
      { hanzi: '我也不喜欢', pinyin: 'wǒ yě bù xǐhuan', translation: 'I don\'t like it either', translationFr: 'Moi non plus je n\'aime pas' }
    ],
    grammarQuiz: {
      type: 'particle-choice',
      sentenceBefore: '我',
      sentenceAfter: '喜欢茶',
      translation: 'J\'aime aussi le thé',
      translationEn: 'I also like tea',
      choices: ['也', '都', '不', '是'],
      correctChoice: '也',
      explanation: '也 « aussi » se place toujours avant le verbe.'
    },
    tags: ['grammaire', 'adverbe', 'aussi'],
    theme: 'grammar'
  },

  // ============================================
  // HSK1 — 都 (tous)
  // ============================================
  {
    id: 'grammar-dou-all',
    level: 'hsk1',
    hanzi: '都',
    pinyin: 'dōu',
    translation: 'all, both',
    translationFr: 'tous, tous les deux',
    category: 'grammaire',
    explanation: 'L\'adverbe 都 (dōu) « tous » se place avant le verbe et fait référence à plusieurs sujets/objets mentionnés AVANT lui.',
    grammarExplanation: {
      whenToUse: '都 s\'utilise pour :\n• Indiquer que tous les sujets pluriels font l\'action\n• Renforcer 每 (chaque) ou les pronoms pluriels\n• Souligner « tous, sans exception »',
      whenToUseEn: '都 is used to:\n• Indicate that all plural subjects do the action\n• Reinforce 每 (every) or plural pronouns\n• Emphasize "all, without exception"',
      howToUse: 'Structure : Sujet pluriel + 都 + Verbe / Adjectif\n\nExemples :\n• 我们都是学生 (wǒmen dōu shì xuésheng) = Nous sommes tous étudiants\n• 他们都喜欢中国菜 = Ils aiment tous la cuisine chinoise\n• 每天都很忙 (měitiāndōu hěn máng) = Chaque jour est très chargé',
      howToUseEn: 'Structure: Plural subject + 都 + Verb / Adjective\n\nExamples:\n• 我们都是学生 = We are all students\n• 他们都喜欢中国菜 = They all like Chinese food\n• 每天都很忙 = Every day is very busy',
      commonMistakes: '❌ Ne placez PAS 都 après le verbe\n• Incorrect : 我们是都学生\n• Correct : 我们都是学生\n\n❌ Ne placez PAS 都 avant un sujet singulier seul\n• Incorrect : 我都喜欢 (sauf si on parle de plusieurs choses)\n• Correct : 我都喜欢茶和咖啡 (= J\'aime [les deux] thé et café)',
      commonMistakesEn: '❌ DON\'T place 都 after the verb\n• Incorrect: 我们是都学生\n• Correct: 我们都是学生\n\n❌ DON\'T use 都 alone with a singular subject\n• Incorrect: 我都喜欢 (alone)\n• Correct: 我都喜欢茶和咖啡 (= I like both tea and coffee)',
      tips: '💡 Mnémonique : 都 « pointe en arrière » — il englobe tout ce qui le précède.\n💡 Avec 不/没 : 都不 = « aucun », 不都 = « pas tous »\n  → 我们都不去 = Personne d\'entre nous n\'y va\n  → 我们不都去 = Nous n\'y allons pas tous',
      tipsEn: '💡 Mnemonic: 都 "points back" — it sums up what comes before.\n💡 With 不/没: 都不 = "none", 不都 = "not all"\n  → 我们都不去 = None of us is going\n  → 我们不都去 = Not all of us are going',
      relatedGrammar: ['grammar-ye-also']
    },
    examples: [
      { hanzi: '他们都很高兴', pinyin: 'tāmen dōu hěn gāoxìng', translation: 'They are all very happy', translationFr: 'Ils sont tous très contents' },
      { hanzi: '我们都不抽烟', pinyin: 'wǒmen dōu bù chōuyān', translation: 'None of us smokes', translationFr: 'Aucun de nous ne fume' },
      { hanzi: '每个人都有梦想', pinyin: 'měi ge rén dōu yǒu mèngxiǎng', translation: 'Everyone has a dream', translationFr: 'Chacun a un rêve' }
    ],
    grammarQuiz: {
      type: 'particle-choice',
      sentenceBefore: '我们',
      sentenceAfter: '是法国人',
      translation: 'Nous sommes tous français',
      translationEn: 'We are all French',
      choices: ['都', '也', '在', '不'],
      correctChoice: '都',
      explanation: '都 « tous » se met juste avant le verbe pour rassembler un sujet pluriel.'
    },
    tags: ['grammaire', 'adverbe', 'quantité'],
    theme: 'grammar'
  },

  // ============================================
  // HSK2 — 一边...一边... (en parallèle)
  // ============================================
  {
    id: 'grammar-yibian-yibian',
    level: 'hsk2',
    hanzi: '一边...一边...',
    pinyin: 'yìbiān... yìbiān...',
    translation: 'doing X while doing Y',
    translationFr: 'faire X tout en faisant Y',
    category: 'grammaire',
    explanation: 'La structure 一边...一边... décrit deux actions effectuées simultanément par le même sujet.',
    grammarExplanation: {
      whenToUse: '一边...一边... permet d\'exprimer deux actions menées en parallèle :\n• Toujours par le MÊME sujet\n• Verbes d\'action concrets en général (pas pour les états)',
      whenToUseEn: '一边...一边... expresses two actions running in parallel:\n• Always by the SAME subject\n• Usually concrete action verbs (not states)',
      howToUse: 'Structure : Sujet + 一边 + V1 + 一边 + V2\n\nExemples :\n• 他一边吃饭一边看电视 = Il mange en regardant la télé\n• 我一边走路一边听音乐 = Je marche en écoutant de la musique\n• 学生一边听课一边记笔记 = Les élèves écoutent et prennent des notes en même temps',
      howToUseEn: 'Structure: Subject + 一边 + V1 + 一边 + V2\n\nExamples:\n• 他一边吃饭一边看电视 = He eats while watching TV\n• 我一边走路一边听音乐 = I walk while listening to music\n• 学生一边听课一边记笔记 = Students listen and take notes at the same time',
      commonMistakes: '❌ Ne mettez PAS deux sujets différents\n• Incorrect : 他一边吃饭，她一边看电视\n• Correct (deux sujets) : 他吃饭，她看电视\n\n❌ Ne placez PAS 一边 avant le sujet\n• Incorrect : 一边他吃饭，一边看电视\n• Correct : 他一边吃饭，一边看电视',
      commonMistakesEn: '❌ DON\'T use two different subjects\n• Incorrect: 他一边吃饭，她一边看电视\n• Correct (two subjects): 他吃饭，她看电视\n\n❌ DON\'T place 一边 before the subject\n• Incorrect: 一边他吃饭...\n• Correct: 他一边吃饭...',
      tips: '💡 Visuel : 一边 (yībiān) = « d\'un côté » → « d\'un côté X, d\'un côté Y »\n💡 Forme orale courte : 边...边... (sans 一)\n  → 他边走边说 = Il parle en marchant',
      tipsEn: '💡 Visual: 一边 (yībiān) = "on one side" → "on one side X, on the other Y"\n💡 Spoken short form: 边...边... (without 一)\n  → 他边走边说 = He talks while walking',
      relatedGrammar: ['grammar-progressive']
    },
    examples: [
      { hanzi: '我一边喝咖啡一边看报纸', pinyin: 'wǒ yìbiān hē kāfēi yìbiān kàn bàozhǐ', translation: 'I drink coffee while reading the paper', translationFr: 'Je bois du café en lisant le journal' },
      { hanzi: '他一边开车一边打电话', pinyin: 'tā yìbiān kāichē yìbiān dǎ diànhuà', translation: 'He drives while on the phone', translationFr: 'Il conduit tout en téléphonant' },
      { hanzi: '她一边唱歌一边跳舞', pinyin: 'tā yìbiān chànggē yìbiān tiàowǔ', translation: 'She sings while dancing', translationFr: 'Elle chante en dansant' }
    ],
    grammarQuiz: {
      type: 'fill-blank',
      sentence: '他＿＿吃饭＿＿看电视',
      translation: 'Il mange en regardant la télé',
      translationEn: 'He eats while watching TV',
      choices: ['一边...一边', '又...又', '一会儿...一会儿', '不但...而且'],
      correctChoice: '一边...一边',
      explanation: '一边...一边... est la structure dédiée aux deux actions simultanées du même sujet.'
    },
    tags: ['grammaire', 'simultanéité', 'connecteur'],
    theme: 'grammar'
  },

  // ============================================
  // HSK2 — 给 (donner / pour)
  // ============================================
  {
    id: 'grammar-gei-give-for',
    level: 'hsk2',
    hanzi: '给',
    pinyin: 'gěi',
    translation: 'give / to / for',
    translationFr: 'donner / à / pour',
    category: 'grammaire',
    explanation: '给 a deux usages clés : verbe « donner » et préposition « à / pour » qui introduit le bénéficiaire d\'une action.',
    grammarExplanation: {
      whenToUse: '给 s\'utilise pour :\n• Verbe principal : « donner » (sujet + 给 + objet indirect + objet direct)\n• Préposition « à / pour » : avant un autre verbe (Sujet + 给 + bénéficiaire + V)\n• Marquer le destinataire d\'un appel, message, cadeau…',
      whenToUseEn: '给 is used:\n• As main verb "give" (subject + 给 + indirect obj + direct obj)\n• As preposition "to / for" before another verb (S + 给 + beneficiary + V)\n• To mark the recipient of a call, message, gift…',
      howToUse: 'Structure 1 (verbe) : Sujet + 给 + Personne + Objet\n• 我给你一本书 (wǒ gěi nǐ yì běn shū) = Je te donne un livre\n\nStructure 2 (préposition) : Sujet + 给 + Personne + Verbe\n• 我给妈妈打电话 = Je téléphone à maman\n• 他给我做饭 = Il me prépare à manger',
      howToUseEn: 'Pattern 1 (verb): Subject + 给 + Person + Object\n• 我给你一本书 = I give you a book\n\nPattern 2 (preposition): Subject + 给 + Person + Verb\n• 我给妈妈打电话 = I call mom\n• 他给我做饭 = He cooks for me',
      commonMistakes: '❌ Ne traduisez PAS 给 par « pour » dans tous les cas\n• 我为你做饭 (« pour toi ») ≠ 我给你做饭 (« je te prépare à manger »)\n\n❌ N\'oubliez pas de placer 给 + personne AVANT le verbe d\'action\n• Incorrect : 我打电话给妈妈 (calque du français)\n• Correct : 我给妈妈打电话',
      commonMistakesEn: '❌ DON\'T literally translate 给 as "for" in every case\n• 我为你做饭 (formal "for you") ≠ 我给你做饭 (cook for you)\n\n❌ DON\'T forget that 给 + person goes BEFORE the action verb\n• Incorrect: 我打电话给妈妈 (English-style)\n• Correct: 我给妈妈打电话',
      tips: '💡 Pense à 给 comme la flèche d\'un cadeau → vers le destinataire\n💡 Verbes fréquents avec 给 : 打电话给 (appeler), 写信给 (écrire à), 送 (offrir)...\n💡 给 peut aussi servir au passif familier : 我的手机给偷了 = On m\'a volé mon téléphone (familier)',
      tipsEn: '💡 Think of 给 as the arrow of a gift → toward the recipient\n💡 Common verbs with 给: 打电话给 (call), 写信给 (write to), 送 (give as gift)…\n💡 给 can also mark casual passive: 我的手机给偷了 = My phone got stolen (colloquial)',
      relatedGrammar: ['grammar-bei-passive']
    },
    examples: [
      { hanzi: '老师给我们布置作业', pinyin: 'lǎoshī gěi wǒmen bùzhì zuòyè', translation: 'The teacher assigns us homework', translationFr: 'Le prof nous donne des devoirs' },
      { hanzi: '我给爸爸买了礼物', pinyin: 'wǒ gěi bàba mǎi le lǐwù', translation: 'I bought a gift for dad', translationFr: 'J\'ai acheté un cadeau pour papa' },
      { hanzi: '他给我讲了一个故事', pinyin: 'tā gěi wǒ jiǎng le yí ge gùshi', translation: 'He told me a story', translationFr: 'Il m\'a raconté une histoire' }
    ],
    grammarQuiz: {
      type: 'particle-choice',
      sentenceBefore: '我',
      sentenceAfter: '妈妈打电话',
      translation: 'Je téléphone à maman',
      translationEn: 'I call mom',
      choices: ['给', '为', '对', '从'],
      correctChoice: '给',
      explanation: '给 introduit le destinataire d\'une action : « téléphoner à quelqu\'un ».'
    },
    tags: ['grammaire', 'préposition', 'destinataire'],
    theme: 'grammar'
  },

  // ============================================
  // HSK3 — 是...的 (focus)
  // ============================================
  {
    id: 'grammar-shi-de-focus',
    level: 'hsk3',
    hanzi: '是...的',
    pinyin: 'shì... de',
    translation: 'it was X who/where/when…',
    translationFr: 'c\'est… qui / où / quand…',
    category: 'grammaire',
    explanation: 'La structure 是...的 met en relief une circonstance d\'une action passée (lieu, moment, manière, agent), pas l\'action elle-même.',
    grammarExplanation: {
      whenToUse: 'À utiliser quand l\'action est ACQUISE comme passée, mais on veut focaliser sur :\n• Le moment : « C\'est en 2020 que… »\n• Le lieu : « C\'est à Pékin que… »\n• La manière : « C\'est en train que… »\n• L\'agent : « C\'est elle qui… »',
      whenToUseEn: 'Use when the action is established as past, to focus on:\n• Time: "It was in 2020 that…"\n• Place: "It was in Beijing that…"\n• Manner: "It was by train that…"\n• Agent: "It was she who…"',
      howToUse: 'Structure : Sujet + 是 + [circonstance focalisée] + Verbe + 的\n\nExemples :\n• 我是去年来的 (wǒ shì qùnián lái de) = C\'est l\'an dernier que je suis venu\n• 他是在上海工作的 = C\'est à Shanghai qu\'il travaille (ou « travaillait »)\n• 我们是坐高铁去的 = Nous y sommes allés en TGV\n• 是她告诉我的 = C\'est elle qui me l\'a dit',
      howToUseEn: 'Pattern: Subject + 是 + [focused element] + Verb + 的\n\nExamples:\n• 我是去年来的 = It was last year that I came\n• 他是在上海工作的 = It is in Shanghai that he works\n• 我们是坐高铁去的 = We went by high-speed train\n• 是她告诉我的 = It was she who told me',
      commonMistakes: '❌ Ne PAS utiliser 是...的 pour parler d\'une action future ou habituelle\n• Incorrect : 我是明天去的\n• Correct : 我明天去\n\n❌ Ne PAS oublier le 的 final\n• Incorrect : 我是去年来\n• Correct : 我是去年来的\n\n❌ Avec 不 : la négation se met DEVANT 是, pas devant 的\n• Incorrect : 我是不去年来的\n• Correct : 我不是去年来的',
      commonMistakesEn: '❌ DON\'T use 是...的 for future or habitual actions\n• Incorrect: 我是明天去的\n• Correct: 我明天去\n\n❌ DON\'T drop the final 的\n• Incorrect: 我是去年来\n• Correct: 我是去年来的\n\n❌ With 不: negation goes BEFORE 是\n• Incorrect: 我是不去年来的\n• Correct: 我不是去年来的',
      tips: '💡 Test rapide : pose-toi la question « C\'est X qui/où/quand… ? » — si la réponse est oui → 是...的\n💡 La structure suppose un contexte connu : l\'auditeur sait DÉJÀ que l\'action a eu lieu, on précise juste UN détail',
      tipsEn: '💡 Quick test: ask "It is X who/where/when…?" — if yes → 是...的\n💡 The structure assumes a known context: the listener ALREADY knows the action happened, you just pin down ONE detail',
      relatedGrammar: ['grammar-aspect-le']
    },
    examples: [
      { hanzi: '我是2020年大学毕业的', pinyin: 'wǒ shì èr líng èr líng nián dàxué bìyè de', translation: 'I graduated from university in 2020', translationFr: 'C\'est en 2020 que j\'ai obtenu mon diplôme' },
      { hanzi: '他是从法国来的', pinyin: 'tā shì cóng Fǎguó lái de', translation: 'He came from France', translationFr: 'C\'est de France qu\'il est venu' },
      { hanzi: '我们是在咖啡馆认识的', pinyin: 'wǒmen shì zài kāfēiguǎn rènshi de', translation: 'We met in a café', translationFr: 'C\'est dans un café que nous nous sommes rencontrés' },
      { hanzi: '不是我说的', pinyin: 'bú shì wǒ shuō de', translation: 'I didn\'t say it / It wasn\'t me who said it', translationFr: 'Ce n\'est pas moi qui l\'ai dit' }
    ],
    grammarQuiz: {
      type: 'fill-blank',
      sentence: '我＿＿坐火车去＿＿',
      translation: 'C\'est en train que j\'y suis allé',
      translationEn: 'It was by train that I went',
      choices: ['是...的', '在...以前', '把...了', '从...到'],
      correctChoice: '是...的',
      explanation: '是...的 isole le moyen de transport comme information saillante d\'une action passée.'
    },
    tags: ['grammaire', 'focus', 'passé'],
    theme: 'grammar'
  },

  // ============================================
  // HSK4 — 不仅...而且... (non seulement)
  // ============================================
  {
    id: 'grammar-bujin-erqie',
    level: 'hsk4',
    hanzi: '不仅...而且...',
    pinyin: 'bùjǐn... érqiě...',
    translation: 'not only… but also…',
    translationFr: 'non seulement… mais aussi…',
    category: 'grammaire',
    explanation: '不仅...而且... ajoute une information à valeur ascendante : le second élément renforce le premier.',
    grammarExplanation: {
      whenToUse: 'Quand on veut empiler deux qualités/actions, la seconde renchérissant sur la première :\n• Sujet unique ou deux sujets\n• Registre soutenu ; à l\'oral on dit aussi 不但...而且...',
      whenToUseEn: 'To stack two qualities/actions, the second outweighing the first:\n• Single subject or two subjects\n• Formal register; spoken often uses 不但...而且...',
      howToUse: 'Sujet unique : Sujet + 不仅 + V1 + 而且 + 也/还 + V2\n• 他不仅会说中文，而且还会写汉字\n  = Il sait non seulement parler chinois, mais aussi écrire les caractères\n\nDeux sujets : 不仅 + Sujet1 + V, 而且 + Sujet2 + V\n• 不仅老师同意了，而且学生也同意了\n  = Non seulement le prof a accepté, mais les élèves aussi',
      howToUseEn: 'Single subject: Subject + 不仅 + V1 + 而且 + 也/还 + V2\n• 他不仅会说中文，而且还会写汉字\n  = He not only speaks Chinese, he also writes characters\n\nTwo subjects: 不仅 + S1 + V, 而且 + S2 + V\n• 不仅老师同意了，而且学生也同意了\n  = Not only did the teacher agree, the students did too',
      commonMistakes: '❌ Ne placez PAS 不仅 après le sujet quand vous avez DEUX sujets\n• Incorrect : 老师不仅同意了，而且学生也同意了\n• Correct : 不仅老师同意了，而且学生也同意了\n\n❌ Ne supprimez PAS le 也 / 还 dans la seconde proposition\n• Incorrect : 他不仅会说中文，而且会写汉字\n• Correct : 他不仅会说中文，而且还会写汉字',
      commonMistakesEn: '❌ DON\'T put 不仅 after the subject when there are TWO subjects\n• Incorrect: 老师不仅同意了，而且学生也同意了\n• Correct: 不仅老师同意了...\n\n❌ DON\'T drop 也 / 还 in the second clause\n• Incorrect: 他不仅会说中文，而且会写汉字\n• Correct: 他不仅会说中文，而且还会写汉字',
      tips: '💡 不仅 = « pas seulement » (registre formel), 不但 = équivalent oral\n💡 Le 还 (hái) « en plus » ou 也 (yě) « aussi » dans la 2e partie est presque obligatoire pour la fluidité',
      tipsEn: '💡 不仅 = "not only" (formal), 不但 = spoken equivalent\n💡 The 还 (hái) "moreover" or 也 (yě) "also" in clause 2 is almost mandatory for flow',
      relatedGrammar: ['grammar-budan-erqie']
    },
    examples: [
      { hanzi: '上海不仅是经济中心，而且也是文化中心', pinyin: 'Shànghǎi bùjǐn shì jīngjì zhōngxīn, érqiě yě shì wénhuà zhōngxīn', translation: 'Shanghai is not only the economic center but also a cultural one', translationFr: 'Shanghai est non seulement un centre économique, mais aussi culturel' },
      { hanzi: '这本书不仅有趣，而且很有用', pinyin: 'zhè běn shū bùjǐn yǒuqù, érqiě hěn yǒuyòng', translation: 'This book is not only interesting but also useful', translationFr: 'Ce livre est non seulement intéressant mais aussi très utile' },
      { hanzi: '他不仅自己学，还教别人', pinyin: 'tā bùjǐn zìjǐ xué, hái jiāo biérén', translation: 'He doesn\'t only study himself, he teaches others', translationFr: 'Non seulement il étudie lui-même, mais il enseigne aux autres' }
    ],
    grammarQuiz: {
      type: 'fill-blank',
      sentence: '他＿＿会说中文，＿＿还会写汉字',
      translation: 'Il sait non seulement parler chinois, mais aussi écrire',
      translationEn: 'He not only speaks Chinese, he also writes characters',
      choices: ['不仅...而且', '虽然...但是', '因为...所以', '如果...就'],
      correctChoice: '不仅...而且',
      explanation: '不仅...而且... empile deux faits, le second renchérissant — exactement ce qu\'il faut ici.'
    },
    tags: ['grammaire', 'connecteur', 'ajout'],
    theme: 'grammar'
  },

  // ============================================
  // HSK4 — 即使...也 (même si)
  // ============================================
  {
    id: 'grammar-jishi-ye',
    level: 'hsk4',
    hanzi: '即使...也...',
    pinyin: 'jíshǐ... yě...',
    translation: 'even if…',
    translationFr: 'même si…',
    category: 'grammaire',
    explanation: '即使...也... pose une hypothèse extrême ou contraire aux faits ; la seconde proposition affirme un résultat invariant.',
    grammarExplanation: {
      whenToUse: 'À utiliser pour :\n• Une hypothèse extrême ou peu probable\n• Une concession forte : « même dans ce cas-là, le résultat ne change pas »',
      whenToUseEn: 'Use for:\n• An extreme or unlikely hypothesis\n• A strong concession: "even in that case, the outcome stays the same"',
      howToUse: 'Structure : 即使 + Hypothèse, [Sujet] + 也 + Conséquence\n\n• 即使下雨，我也去 (jíshǐ xiàyǔ, wǒ yě qù) = Même s\'il pleut, j\'irai\n• 即使你不同意，我也会做 = Même si tu n\'es pas d\'accord, je le ferai\n• 即使再难，我们也不放弃 = Même si c\'est encore plus dur, nous n\'abandonnons pas',
      howToUseEn: 'Pattern: 即使 + Hypothesis, [Subject] + 也 + Consequence\n\n• 即使下雨，我也去 = Even if it rains, I\'ll go\n• 即使你不同意，我也会做 = Even if you don\'t agree, I\'ll do it\n• 即使再难，我们也不放弃 = Even if it gets harder, we won\'t give up',
      commonMistakes: '❌ Ne PAS oublier 也 dans la 2e proposition\n• Incorrect : 即使下雨，我去\n• Correct : 即使下雨，我也去\n\n❌ Ne PAS confondre avec 虽然 (« bien que »)\n• 虽然 = fait avéré : « Bien qu\'il pleuve, je vais y aller »\n• 即使 = hypothèse : « Même s\'il pleut, j\'irai »',
      commonMistakesEn: '❌ DON\'T drop 也 in clause 2\n• Incorrect: 即使下雨，我去\n• Correct: 即使下雨，我也去\n\n❌ DON\'T confuse with 虽然 ("although")\n• 虽然 = established fact: "Although it\'s raining, I\'m going"\n• 即使 = hypothesis: "Even if it rains, I\'ll go"',
      tips: '💡 Variante oral / écrit : 就算...也... (jiùsuàn) signifie la même chose\n💡 Renforcement : 即使...也(都)不... = « même dans ce cas, [verbe nié] »',
      tipsEn: '💡 Casual variant: 就算...也... (jiùsuàn) means the same\n💡 Strong: 即使...也(都)不... = "even then, [negated verb]"',
      relatedGrammar: ['grammar-jinguan-although', 'grammar-yaoshi-jiu']
    },
    examples: [
      { hanzi: '即使很累，我也要完成', pinyin: 'jíshǐ hěn lèi, wǒ yě yào wánchéng', translation: 'Even if tired, I want to finish', translationFr: 'Même fatigué, je veux finir' },
      { hanzi: '即使没有钱，他也很快乐', pinyin: 'jíshǐ méiyǒu qián, tā yě hěn kuàilè', translation: 'Even without money, he\'s happy', translationFr: 'Même sans argent, il est heureux' },
      { hanzi: '即使你道歉，我也不原谅你', pinyin: 'jíshǐ nǐ dàoqiàn, wǒ yě bù yuánliàng nǐ', translation: 'Even if you apologize, I won\'t forgive you', translationFr: 'Même si tu t\'excuses, je ne te pardonnerai pas' }
    ],
    grammarQuiz: {
      type: 'fill-blank',
      sentence: '＿＿下雨，我＿＿要去',
      translation: 'Même s\'il pleut, je veux y aller',
      translationEn: 'Even if it rains, I want to go',
      choices: ['即使...也', '因为...所以', '虽然...但是', '只要...就'],
      correctChoice: '即使...也',
      explanation: '即使...也 pose une hypothèse extrême sans changer le résultat de la 2e proposition.'
    },
    tags: ['grammaire', 'connecteur', 'concession'],
    theme: 'grammar'
  },

  // ============================================
  // HSK5 — 只要...就... (du moment que)
  // ============================================
  {
    id: 'grammar-zhiyao-jiu',
    level: 'hsk5',
    hanzi: '只要...就...',
    pinyin: 'zhǐyào... jiù...',
    translation: 'as long as… then…',
    translationFr: 'du moment que / il suffit que…',
    category: 'grammaire',
    explanation: '只要...就... pose une condition minimale suffisante pour déclencher une conséquence.',
    grammarExplanation: {
      whenToUse: 'À utiliser pour :\n• Une condition jugée nécessaire ET suffisante\n• Quand on veut souligner « le minimum requis »',
      whenToUseEn: 'Use for:\n• A condition deemed both necessary AND sufficient\n• When stressing "the minimum needed"',
      howToUse: 'Structure : 只要 + Condition, [Sujet] + 就 + Conséquence\n\n• 只要你努力，就一定能成功 (zhǐyào nǐ nǔlì, jiù yídìng néng chénggōng)\n  = Du moment que tu fais des efforts, tu réussiras\n• 只要有时间，我就去 = Du moment que j\'ai du temps, j\'y vais\n• 只要不下雨，我们就出发 = Du moment qu\'il ne pleut pas, on part',
      howToUseEn: 'Pattern: 只要 + Condition, [Subject] + 就 + Consequence\n\n• 只要你努力，就一定能成功 = As long as you work hard, you\'ll succeed\n• 只要有时间，我就去 = As long as I have time, I\'ll go\n• 只要不下雨，我们就出发 = As long as it doesn\'t rain, we\'ll leave',
      commonMistakes: '❌ Ne confondez PAS 只要 et 只有\n• 只要...就 = condition SUFFISANTE (minimum acceptable)\n• 只有...才 = condition NÉCESSAIRE (sans elle, rien)\n\nEx :\n• 只要努力就成功 = il suffit de faire des efforts\n• 只有努力才能成功 = il FAUT faire des efforts (et c\'est la seule voie)',
      commonMistakesEn: '❌ DON\'T confuse 只要 with 只有\n• 只要...就 = SUFFICIENT condition (minimum acceptable)\n• 只有...才 = NECESSARY condition (without it, nothing)\n\nEx:\n• 只要努力就成功 = effort is enough\n• 只有努力才能成功 = effort is REQUIRED (the only way)',
      tips: '💡 Mnémonique : « 只要 » = « il suffit que… ». Pense « low bar »\n💡 Souvent suivi de 一定 (yídìng) ou 都 dans la 2e proposition pour insister sur l\'inéluctabilité',
      tipsEn: '💡 Mnemonic: "只要" = "as long as / it\'s enough that…". Think "low bar"\n💡 Often followed by 一定 (yídìng) or 都 in clause 2 to stress inevitability',
      relatedGrammar: ['grammar-jishi-ye']
    },
    examples: [
      { hanzi: '只要你愿意，就可以加入我们', pinyin: 'zhǐyào nǐ yuànyì, jiù kěyǐ jiārù wǒmen', translation: 'As long as you\'re willing, you can join us', translationFr: 'Du moment que tu le veux, tu peux nous rejoindre' },
      { hanzi: '只要努力，就会有回报', pinyin: 'zhǐyào nǔlì, jiù huì yǒu huíbào', translation: 'As long as you work hard, there will be a reward', translationFr: 'Du moment qu\'on s\'efforce, il y aura une récompense' },
      { hanzi: '只要他在，我就放心', pinyin: 'zhǐyào tā zài, wǒ jiù fàngxīn', translation: 'As long as he\'s there, I feel safe', translationFr: 'Du moment qu\'il est là, je suis tranquille' }
    ],
    grammarQuiz: {
      type: 'fill-blank',
      sentence: '＿＿你努力，＿＿一定能成功',
      translation: 'Du moment que tu fais des efforts, tu réussiras à coup sûr',
      translationEn: 'As long as you work hard, you\'ll surely succeed',
      choices: ['只要...就', '只有...才', '即使...也', '虽然...但是'],
      correctChoice: '只要...就',
      explanation: '只要...就 marque une condition suffisante. 只有...才 serait plus restrictif (« il FAUT »).'
    },
    tags: ['grammaire', 'condition', 'connecteur'],
    theme: 'grammar'
  },

  // ============================================
  // HSK5 — 哪怕 (même si — emphatique)
  // ============================================
  {
    id: 'grammar-napa-even-if',
    level: 'hsk5',
    hanzi: '哪怕',
    pinyin: 'nǎpà',
    translation: 'even if (emphatic)',
    translationFr: 'même si (emphatique)',
    category: 'grammaire',
    explanation: '哪怕 est une variante plus emphatique et plus orale de 即使. Souvent suivie de 也 ou 都.',
    grammarExplanation: {
      whenToUse: 'À utiliser pour :\n• Une concession forte, presque dramatisée\n• Souligner le caractère extrême ou improbable de l\'hypothèse\n• Plus oral / familier que 即使',
      whenToUseEn: 'Use for:\n• A strong, almost dramatic concession\n• To highlight extremeness or unlikeliness\n• More colloquial than 即使',
      howToUse: 'Structure : 哪怕 + Hypothèse extrême, [Sujet] + 也/都 + Conséquence\n\n• 哪怕只有一线希望，我也要试试 (nǎpà zhǐyǒu yí xiàn xīwàng...)\n  = Même s\'il n\'y a qu\'un mince espoir, je veux essayer\n• 哪怕再苦再累，我也不放弃\n  = Même si c\'est encore plus dur et fatigant, je n\'abandonne pas\n• 哪怕一分钱都没有，他也很开心\n  = Même sans un sou, il est heureux',
      howToUseEn: 'Pattern: 哪怕 + Extreme hypothesis, [Subject] + 也/都 + Consequence\n\n• 哪怕只有一线希望，我也要试试 = Even with the slimmest hope, I want to try\n• 哪怕再苦再累，我也不放弃 = Even if it gets harder, I won\'t give up\n• 哪怕一分钱都没有，他也很开心 = Even without a single cent, he\'s happy',
      commonMistakes: '❌ Ne PAS confondre 哪 (interrogatif, nǎ) et 哪怕 (concession, nǎpà)\n\n❌ N\'oubliez PAS 也 / 都 dans la 2e proposition\n• Incorrect : 哪怕再难，我做\n• Correct : 哪怕再难，我也做\n\n❌ Plus emphatique que 即使 — éviter en registre très formel administratif',
      commonMistakesEn: '❌ DON\'T confuse 哪 (interrogative, nǎ) with 哪怕 (concession, nǎpà)\n\n❌ DON\'T drop 也 / 都 in clause 2\n• Incorrect: 哪怕再难，我做\n• Correct: 哪怕再难，我也做\n\n❌ More emphatic than 即使 — avoid in very formal admin register',
      tips: '💡 哪怕 + nombre minimal + 都/也 = « pas même un / une… »\n  → 哪怕一分钱都不给 = pas même un sou\n💡 Idéal pour les serments, promesses, défis personnels',
      tipsEn: '💡 哪怕 + minimal number + 都/也 = "not even a single…"\n  → 哪怕一分钱都不给 = not even a penny\n💡 Great for vows, promises, personal challenges',
      relatedGrammar: ['grammar-jishi-ye']
    },
    examples: [
      { hanzi: '哪怕只有一天，我也要去', pinyin: 'nǎpà zhǐ yǒu yì tiān, wǒ yě yào qù', translation: 'Even if it\'s only one day, I want to go', translationFr: 'Même si ce n\'est qu\'une journée, je veux y aller' },
      { hanzi: '哪怕全世界都反对，我也支持你', pinyin: 'nǎpà quán shìjiè dōu fǎnduì, wǒ yě zhīchí nǐ', translation: 'Even if the whole world opposes you, I\'ll back you', translationFr: 'Même si le monde entier s\'oppose à toi, je te soutiendrai' },
      { hanzi: '哪怕赢一次也好', pinyin: 'nǎpà yíng yí cì yě hǎo', translation: 'Even winning just once would be good', translationFr: 'Même gagner une seule fois serait bien' }
    ],
    grammarQuiz: {
      type: 'fill-blank',
      sentence: '＿＿再累，我＿＿要完成',
      translation: 'Même très fatigué, je veux finir',
      translationEn: 'Even if very tired, I want to finish',
      choices: ['哪怕...也', '虽然...但是', '只要...就', '因为...所以'],
      correctChoice: '哪怕...也',
      explanation: '哪怕...也 marque une concession emphatique : « peu importe la fatigue, je termine ».'
    },
    tags: ['grammaire', 'concession', 'emphatique'],
    theme: 'grammar'
  },

  // ============================================
  // HSK6 — 由于...因此... (du fait que ... par conséquent)
  // ============================================
  {
    id: 'grammar-youyu-yinci',
    level: 'hsk6',
    hanzi: '由于...因此...',
    pinyin: 'yóuyú... yīncǐ...',
    translation: 'due to… consequently…',
    translationFr: 'étant donné que… par conséquent…',
    category: 'grammaire',
    explanation: '由于...因此... est l\'équivalent formel et écrit de 因为...所以 : registre journalistique, administratif, scientifique.',
    grammarExplanation: {
      whenToUse: 'À privilégier dans :\n• Articles de presse, essais, mémoires\n• Documents officiels / administratifs\n• Présentations académiques\n• Toute situation qui demande un registre soutenu',
      whenToUseEn: 'Use in:\n• Press articles, essays, theses\n• Official / administrative documents\n• Academic presentations\n• Any setting requiring a formal register',
      howToUse: 'Structure : 由于 + Cause, [Sujet] + 因此 + Conséquence\n\n• 由于天气恶劣，航班因此被取消 (yóuyú tiānqì èliè, hángbān yīncǐ bèi qǔxiāo)\n  = En raison du mauvais temps, le vol a été annulé\n• 由于人口老龄化，劳动力因此减少\n  = Du fait du vieillissement, la main-d\'œuvre diminue\n• 由于成本上升，公司因此提高了价格\n  = En raison de la hausse des coûts, l\'entreprise a augmenté ses prix',
      howToUseEn: 'Pattern: 由于 + Cause, [Subject] + 因此 + Consequence\n\n• 由于天气恶劣，航班因此被取消 = Due to bad weather, the flight was canceled\n• 由于人口老龄化，劳动力因此减少 = Due to population aging, the workforce shrinks\n• 由于成本上升，公司因此提高了价格 = Due to rising costs, the company raised prices',
      commonMistakes: '❌ Pas oral : éviter 由于...因此 dans une conversation amicale\n• Préférer 因为...所以 ou 所以 seul\n\n❌ 因此 se place AVANT le verbe principal, pas en tête\n• Incorrect : 因此公司提高了价格\n• Correct : 公司因此提高了价格\n\n❌ Vous pouvez utiliser 由于 seul OU 因此 seul (sans corrélation obligatoire), comme 因为 et 所以',
      commonMistakesEn: '❌ Not for spoken: avoid 由于...因此 in casual chat\n• Use 因为...所以 or just 所以 instead\n\n❌ 因此 goes BEFORE the main verb, not at the very start\n• Incorrect: 因此公司提高了价格\n• Correct: 公司因此提高了价格\n\n❌ You can use 由于 alone OR 因此 alone (no mandatory pairing)',
      tips: '💡 由于 ≈ « 鉴于 » (jiànyú, « considérant que ») dans les contextes très officiels\n💡 Synonymes formels de 因此 : 故 (gù, encore plus littéraire), 从而 (cóng\'ér, « d\'où » / « ce qui »), 因而 (yīn\'ér)',
      tipsEn: '💡 由于 ≈ "鉴于" (jiànyú, "considering that") in very official contexts\n💡 Formal synonyms of 因此: 故 (gù, even more literary), 从而 (cóng\'ér, "thereby"), 因而 (yīn\'ér)',
      relatedGrammar: ['grammar-conjunction-yinwei-suoyi']
    },
    examples: [
      { hanzi: '由于疫情，今年的活动因此取消', pinyin: 'yóuyú yìqíng, jīnnián de huódòng yīncǐ qǔxiāo', translation: 'Due to the pandemic, this year\'s events are cancelled', translationFr: 'Du fait de la pandémie, les événements de cette année sont annulés' },
      { hanzi: '由于政策调整，价格因此波动', pinyin: 'yóuyú zhèngcè tiáozhěng, jiàgé yīncǐ bōdòng', translation: 'Due to policy changes, prices fluctuate', translationFr: 'En raison de la révision des politiques, les prix fluctuent' },
      { hanzi: '由于技术革新，产能因此大幅提升', pinyin: 'yóuyú jìshù géxīn, chǎnnéng yīncǐ dàfú tíshēng', translation: 'Due to technological innovation, capacity rose sharply', translationFr: 'Du fait de l\'innovation technologique, la capacité a fortement augmenté' }
    ],
    grammarQuiz: {
      type: 'fill-blank',
      sentence: '＿＿天气恶劣，航班＿＿取消',
      translation: 'En raison du mauvais temps, le vol est annulé',
      translationEn: 'Due to bad weather, the flight is cancelled',
      choices: ['由于...因此', '因为...所以', '只要...就', '虽然...但是'],
      correctChoice: '由于...因此',
      explanation: '由于...因此 est le registre formel/écrit pour exprimer la causalité — adapté à un communiqué de vol.'
    },
    tags: ['grammaire', 'causalité', 'formel'],
    theme: 'grammar'
  }
];
