/**
 * grammar-lessons-hsk3-4-essentials.ts — 4 fiches grammaire essentielles HSK3-4
 * ---------------------------------------------------------------------------
 * Comble des gaps critiques du catalogue :
 *   - HSK3 (B1) : 虽然...但是 (concession), 的/得/地 (les 3 « de »)
 *   - HSK4 (B2) : 越来越 (de plus en plus), directionnels figuratifs (起来/下去/下来/出来)
 *
 * Chaque entrée respecte le shape `LessonItem` avec `grammarExplanation`
 * complet (when / how / mistakes / tips) + `examples` + `grammarQuiz`
 * (fill-blank / particle-choice).
 */
import type { LessonItem } from '../types';

export const grammarLessonsHsk34Essentials: LessonItem[] = [
  // ============================================
  // HSK3 — 虽然...但是 (bien que...mais)
  // ============================================
  {
    id: 'grammar-suiran-danshi',
    level: 'hsk3',
    hanzi: '虽然...但是',
    pinyin: 'suīrán...dànshì',
    translation: 'although... but...',
    translationFr: '« bien que...mais » (concession)',
    category: 'grammaire',
    explanation: 'Structure de CONCESSION la plus courante en chinois. On reconnaît d\'abord un fait, puis on pose un contraste.',
    grammarExplanation: {
      whenToUse: 'Pour reconnaître un fait négatif/limitant, puis affirmer un point positif malgré tout :\n• Concession explicite (« bien que X, cependant Y »)\n• Nuancer un discours à l\'oral comme à l\'écrit\n• Rééquilibrer un argument',
      whenToUseEn: 'To acknowledge a limiting/negative fact, then assert a positive point regardless:\n• Explicit concession ("although X, however Y")\n• Nuance in speech and writing\n• Balance an argument',
      howToUse: 'Structure : 虽然 + Fait admis, (Sujet) + 但是/可是/不过 + Conséquence contrastée\n\nExemples :\n• 虽然下雨，但是我要出去 = Bien qu\'il pleuve, je veux sortir\n• 虽然中文很难，但是很有意思 = Le chinois est difficile MAIS intéressant\n• 我要出去，虽然下雨 = Je veux sortir, même s\'il pleut (ordre inversé possible)\n\n但是 / 可是 / 不过 sont interchangeables (但是 le plus fréquent).',
      howToUseEn: 'Pattern: 虽然 + Fact acknowledged, (Subject) + 但是/可是/不过 + Contrasting result\n\nExamples:\n• 虽然下雨，但是我要出去 = Although it\'s raining, I want to go out\n• 虽然中文很难，但是很有意思 = Chinese is hard BUT interesting\n• 我要出去，虽然下雨 = I want to go out, even though it\'s raining (reversed order allowed)\n\n但是 / 可是 / 不过 are interchangeable (但是 most common).',
      commonMistakes: '❌ Ne pas confondre avec 因为...所以 (cause-effet, PAS contraste)\n• 因为下雨，所以我不出去 = Parce qu\'il pleut, je ne sors pas\n• 虽然下雨，但是我要出去 = Bien qu\'il pleuve, je sors\n\n❌ Oublier 但是 quand la conséquence n\'est pas évidente\n• Incorrect : 虽然他很累，他坚持工作\n• Correct : 虽然他很累，但是他坚持工作\n\n❌ Utiliser SEUL 但是 sans 虽然 sonne moins équilibré à l\'écrit soutenu',
      commonMistakesEn: '❌ DON\'T confuse with 因为...所以 (cause-effect, NOT contrast)\n• 因为下雨，所以我不出去 = Because it rains, I stay in\n• 虽然下雨，但是我要出去 = Although it rains, I go out\n\n❌ DON\'T drop 但是 when the contrast isn\'t obvious\n• Incorrect: 虽然他很累，他坚持工作\n• Correct: 虽然他很累，但是他坚持工作\n\n❌ 但是 ALONE (without 虽然) sounds less balanced in formal writing',
      tips: '💡 Mnémonique : « bien que...mais » — le duo est LIÉ, garde les deux\n💡 À la différence de 尽管 (formel), 虽然 est neutre et FRÉQUENT à l\'oral comme à l\'écrit\n💡 Combo super utile pour nuancer un discours et sonner naturel',
      tipsEn: '💡 Mnemonic: "although...but" — keep the PAIR, don\'t drop half\n💡 Unlike 尽管 (formal), 虽然 is neutral and COMMON in both speech and writing\n💡 Super handy combo for nuancing your discourse and sounding natural',
      relatedGrammar: ['grammar-jinguan-although', 'grammar-conjunction-yinwei-suoyi']
    },
    audio: 'audio/grammar/suiran-danshi.wav',
    examples: [
      { hanzi: '虽然我很累，但是我要坚持', pinyin: 'suīrán wǒ hěn lèi, dànshì wǒ yào jiānchí', translation: 'Although I\'m tired, I will keep going', translationFr: 'Bien que je sois fatigué, je vais tenir bon' },
      { hanzi: '虽然他很年轻，但是很有经验', pinyin: 'suīrán tā hěn niánqīng, dànshì hěn yǒu jīngyàn', translation: 'Although he\'s young, he\'s very experienced', translationFr: 'Bien qu\'il soit jeune, il a beaucoup d\'expérience' },
      { hanzi: '中文虽然难，但是很有意思', pinyin: 'Zhōngwén suīrán nán, dànshì hěn yǒu yìsi', translation: 'Chinese is hard but really interesting', translationFr: 'Le chinois est difficile mais très intéressant' }
    ],
    quiz: {
      prompt: 'Structure pour « bien que...mais » :',
      choices: ['虽然...但是', '因为...所以', '如果...就', '只有...才'],
      correctChoiceIndex: 0
    },
    grammarQuiz: {
      type: 'fill-blank',
      sentence: '___天气不好，___我们还是要去',
      translation: 'Bien que le temps soit mauvais, nous y allons quand même',
      translationEn: 'Although the weather is bad, we\'re still going',
      choices: ['虽然 ... 但是', '因为 ... 所以', '如果 ... 就', '只要 ... 就'],
      correctChoice: '虽然 ... 但是',
      explanation: '虽然...但是 est le couple de concession standard : on admet un fait négatif puis on pose un contraste positif.'
    },
    tags: ['grammaire', 'concession', 'connecteur'],
    theme: 'grammar'
  },

  // ============================================
  // HSK3 — 的 vs 得 vs 地 (les 3 « de »)
  // ============================================
  {
    id: 'grammar-de-de-de-trilogy',
    level: 'hsk3',
    hanzi: '的 / 得 / 地',
    pinyin: 'de / de / de',
    translation: 'the three "de" particles: possession, degree, manner',
    translationFr: 'Les 3 particules « de » : possession, degré, manière',
    category: 'grammaire',
    explanation: 'Trois caractères prononcés « de » avec des rôles STRICTEMENT DIFFÉRENTS. Piège N°1 à l\'écrit chinois.',
    grammarExplanation: {
      whenToUse: 'Chaque « de » a un rôle grammatical distinct :\n• 的 = LIER un nom à un autre (possession, description)\n• 得 = COMPLÉMENT DE DEGRÉ après un verbe pour dire COMMENT\n• 地 = ADVERBE de MANIÈRE avant un verbe',
      whenToUseEn: 'Each "de" has a distinct grammatical role:\n• 的 = LINK a noun to another (possession, description)\n• 得 = DEGREE COMPLEMENT after a verb to say HOW\n• 地 = MANNER ADVERB before a verb',
      howToUse: '的 : Nom/pronom + 的 + Nom\n• 我的书 = mon livre\n• 红色的车 = la voiture rouge\n• 一件很漂亮的衣服 = un très joli vêtement\n\n得 : Verbe + 得 + Adjectif/Adverbe\n• 他跑得很快 = il court très vite\n• 说得很好 = (il/elle) parle très bien\n\n地 : Adjectif/Adverbe + 地 + Verbe\n• 慢慢地说 = parler lentement\n• 认真地学习 = étudier sérieusement\n\nAttention : à l\'oral, ces distinctions s\'entendent peu (même son « de »), mais à l\'écrit c\'est CRUCIAL.',
      howToUseEn: '的: Noun/pronoun + 的 + Noun\n• 我的书 = my book\n• 红色的车 = the red car\n• 一件很漂亮的衣服 = a very pretty piece of clothing\n\n得: Verb + 得 + Adjective/Adverb\n• 他跑得很快 = he runs very fast\n• 说得很好 = speaks very well\n\n地: Adjective/Adverb + 地 + Verb\n• 慢慢地说 = speak slowly\n• 认真地学习 = study seriously\n\nWarning: in speech the three sound identical, but in writing the distinction is CRUCIAL.',
      commonMistakes: '❌ 他跑的很快 (fréquent — c\'est FAUX)\n✅ 他跑得很快 (verbe + 得 + adj)\n\n❌ 认真的学习 (utilisé mais critiqué)\n✅ 认真地学习 (adv + 地 + verbe)\n\n💡 Astuce ordre :\n• 的 → nom + DE + nom\n• 得 → verbe + DE + adj (APRÈS le verbe)\n• 地 → adj + DE + verbe (AVANT le verbe)\n\nAlternative : à l\'oral moderne, 的 est parfois toléré pour 得/地, mais évite absolument à l\'écrit.',
      commonMistakesEn: '❌ 他跑的很快 (very common — this is WRONG)\n✅ 他跑得很快 (verb + 得 + adj)\n\n❌ 认真的学习 (used but criticized)\n✅ 认真地学习 (adv + 地 + verb)\n\n💡 Order trick:\n• 的 → noun + DE + noun\n• 得 → verb + DE + adj (AFTER the verb)\n• 地 → adj + DE + verb (BEFORE the verb)\n\nAlternative: modern speech sometimes tolerates 的 for 得/地, but absolutely avoid it in writing.',
      tips: '💡 Mnémo par radical :\n• 白 + 勺 = 的 (possession — le plus fréquent)\n• 彳 + 得 = 得 (après un verbe, résultat)\n• 土 + 也 = 地 (avant un verbe, manière)\n\n💡 Structure ORDRE : les DEUX autres (得/地) ENCADRENT un verbe (得 après, 地 avant)',
      tipsEn: '💡 Radical mnemonic:\n• 白 + 勺 = 的 (possession — most common)\n• 彳 + 得 = 得 (after a verb, result)\n• 土 + 也 = 地 (before a verb, manner)\n\n💡 Position trick: the OTHER two (得/地) FRAME a verb (得 after, 地 before)',
      relatedGrammar: ['grammar-possession-de', 'grammar-complement-degree-de']
    },
    audio: 'audio/grammar/de-de-de-trilogy.wav',
    examples: [
      { hanzi: '我妈妈的手机', pinyin: 'wǒ māma de shǒujī', translation: 'my mom\'s phone (的 — possession)', translationFr: 'le téléphone de ma mère (的 — possession)' },
      { hanzi: '他跑得非常快', pinyin: 'tā pǎo de fēicháng kuài', translation: 'he runs extremely fast (得 — degree)', translationFr: 'il court extrêmement vite (得 — degré)' },
      { hanzi: '她认真地看书', pinyin: 'tā rènzhēn de kàn shū', translation: 'she reads attentively (地 — manner)', translationFr: 'elle lit avec sérieux (地 — manière)' }
    ],
    quiz: {
      prompt: '« Il court très vite » utilise quelle particule ?',
      choices: ['的', '得', '地', '了'],
      correctChoiceIndex: 1
    },
    grammarQuiz: {
      type: 'fill-blank',
      sentence: '他慢慢___走过来',
      translation: 'Il s\'approche lentement',
      translationEn: 'He walks over slowly',
      choices: ['的', '得', '地', '了'],
      correctChoice: '地',
      explanation: '地 introduit un ADVERBE de MANIÈRE avant un verbe : 慢慢地走 = « marcher lentement ».'
    },
    tags: ['grammaire', 'particule', 'de'],
    theme: 'grammar'
  },

  // ============================================
  // HSK4 — 越来越 (de plus en plus)
  // ============================================
  {
    id: 'grammar-yuelaiyue',
    level: 'hsk4',
    hanzi: '越来越',
    pinyin: 'yuè lái yuè',
    translation: 'more and more',
    translationFr: '« de plus en plus » (évolution progressive)',
    category: 'grammaire',
    explanation: 'Structure d\'ÉVOLUTION CROISSANTE dans le temps. Différent de 越...越... (deux variables corrélées).',
    grammarExplanation: {
      whenToUse: 'Pour dire qu\'un état/qualité PROGRESSE avec le temps :\n• Météo (chaud, froid, humide…)\n• Prix, difficulté, qualité qui évoluent\n• Sentiments qui s\'intensifient\n• Souvent avec un adjectif ou un verbe d\'état',
      whenToUseEn: 'To say that a state/quality PROGRESSES over time:\n• Weather (hot, cold, humid…)\n• Prices, difficulty, quality evolving\n• Feelings intensifying\n• Usually with an adjective or state verb',
      howToUse: 'Structure : Sujet + 越来越 + Adjectif/Verbe\n\nExemples :\n• 天气越来越冷 = Il fait de plus en plus froid\n• 中文越来越有意思 = Le chinois devient de plus en plus intéressant\n• 我越来越喜欢他 = Je l\'aime de plus en plus\n\nAvec adjectif dissyllabique :\n• 越来越漂亮 = de plus en plus jolie\n• 越来越复杂 = de plus en plus complexe',
      howToUseEn: 'Pattern: Subject + 越来越 + Adjective/Verb\n\nExamples:\n• 天气越来越冷 = It\'s getting colder and colder\n• 中文越来越有意思 = Chinese is getting more and more interesting\n• 我越来越喜欢他 = I like him more and more\n\nWith disyllabic adjective:\n• 越来越漂亮 = prettier and prettier\n• 越来越复杂 = more and more complex',
      commonMistakes: 'Distinction 越来越 vs 越...越... :\n• 越来越 = ÉVOLUTION dans le TEMPS (un seul sujet)\n• 越...越... = corrélation entre 2 variables (« plus X, plus Y »)\n\nExemples :\n• 越来越热 = de plus en plus chaud (temps qui passe)\n• 越吃越好吃 = plus je mange, plus c\'est bon (2 actions liées)\n\n❌ 越来越很冷 (pas de 很 avec 越来越)\n✅ 越来越冷\n\n❌ 越来越非常复杂 (pas d\'adverbe d\'intensité)\n✅ 越来越复杂',
      commonMistakesEn: 'Distinction 越来越 vs 越...越...:\n• 越来越 = EVOLUTION over TIME (single subject)\n• 越...越... = correlation between 2 variables ("the more X, the more Y")\n\nExamples:\n• 越来越热 = getting hotter and hotter (time passing)\n• 越吃越好吃 = the more I eat, the better it tastes (2 linked actions)\n\n❌ 越来越很冷 (no 很 with 越来越)\n✅ 越来越冷\n\n❌ 越来越非常复杂 (no intensity adverb)\n✅ 越来越复杂',
      tips: '💡 Astuce : « toujours plus + adj »\n💡 Sans autre marque temporelle, 越来越 sous-entend « avec le temps qui passe »\n💡 Peut se renforcer avec 一天比一天 (« jour après jour ») pour insister sur la durée\n  → 一天比一天冷 = de jour en jour plus froid',
      tipsEn: '💡 Trick: "increasingly + adj"\n💡 Without other time markers, 越来越 implies "as time passes"\n💡 Can be reinforced with 一天比一天 ("day by day") to stress duration\n  → 一天比一天冷 = colder day by day',
      relatedGrammar: ['grammar-yue-yue']
    },
    audio: 'audio/grammar/yuelaiyue.wav',
    examples: [
      { hanzi: '天气越来越热', pinyin: 'tiānqì yuè lái yuè rè', translation: 'The weather is getting hotter and hotter', translationFr: 'Il fait de plus en plus chaud' },
      { hanzi: '我的中文越来越好', pinyin: 'wǒ de Zhōngwén yuè lái yuè hǎo', translation: 'My Chinese is getting better and better', translationFr: 'Mon chinois s\'améliore de plus en plus' },
      { hanzi: '他越来越忙', pinyin: 'tā yuè lái yuè máng', translation: 'He\'s busier and busier', translationFr: 'Il est de plus en plus occupé' }
    ],
    quiz: {
      prompt: '« Il devient de plus en plus fatigué » =',
      choices: ['他越累', '他越来越累', '他很累', '他越...越累'],
      correctChoiceIndex: 1
    },
    grammarQuiz: {
      type: 'fill-blank',
      sentence: '我___喜欢中国菜',
      translation: 'J\'aime de plus en plus la cuisine chinoise',
      translationEn: 'I like Chinese food more and more',
      choices: ['越来越', '越...越', '很', '非常'],
      correctChoice: '越来越',
      explanation: '越来越 exprime une évolution CROISSANTE dans le temps pour un même sujet. À ne pas confondre avec 越...越... (corrélation entre deux variables).'
    },
    tags: ['grammaire', 'évolution', 'progression'],
    theme: 'grammar'
  },

  // ============================================
  // HSK4 — Directionnels figuratifs (起来 / 下去 / 下来 / 出来)
  // ============================================
  {
    id: 'grammar-directional-figurative',
    level: 'hsk4',
    hanzi: '起来 / 下去 / 下来 / 出来',
    pinyin: 'qǐlái / xiàqù / xiàlái / chūlái',
    translation: 'figurative directional complements (abstract senses)',
    translationFr: 'Compléments directionnels figuratifs (sens abstraits)',
    category: 'grammaire',
    explanation: 'Ces compléments perdent leur sens physique et prennent des sens ABSTRAITS très fréquents. Piège classique des niveaux B1-B2.',
    grammarExplanation: {
      whenToUse: 'Chaque directionnel a un sens figuré typique :\n• 起来 = COMMENCER / APPARAÎTRE un état (démarrer une action, se mettre à)\n• 下去 = CONTINUER (aller de l\'avant, persister)\n• 下来 = STOCKER / FIXER (garder en trace, se calmer)\n• 出来 = SORTIR figuratif (deviner, distinguer, produire une idée)',
      whenToUseEn: 'Each directional has a typical figurative sense:\n• 起来 = START / APPEAR of a state (begin an action, take up)\n• 下去 = CONTINUE (keep going, persist)\n• 下来 = CAPTURE / FIX (keep on record, calm down)\n• 出来 = FIGURE OUT (guess, distinguish, produce an idea)',
      howToUse: '起来 : Verbe + 起来\n• 他突然笑起来 = il éclata de rire soudain\n• 天气暖和起来了 = le temps se réchauffe\n• Jugement : 看起来 = « on dirait / à voir ça », 听起来 = « ça sonne »\n\n下去 : Verbe + 下去\n• 请继续说下去 = continue de parler\n• 坚持下去 = tiens bon\n\n下来 : Verbe + 下来\n• 请把地址写下来 = écris l\'adresse (pour garder trace)\n• 安静下来 = se calmer\n\n出来 : Verbe + 出来\n• 我看出来了 = j\'ai deviné / vu ce que c\'est\n• 想出来一个办法 = trouver une solution\n• 听出来 = reconnaître à l\'oreille',
      howToUseEn: '起来: Verb + 起来\n• 他突然笑起来 = he burst out laughing\n• 天气暖和起来了 = the weather is warming up\n• Judgment: 看起来 = "looks like", 听起来 = "sounds like"\n\n下去: Verb + 下去\n• 请继续说下去 = please keep talking\n• 坚持下去 = hang in there\n\n下来: Verb + 下来\n• 请把地址写下来 = write down the address\n• 安静下来 = calm down\n\n出来: Verb + 出来\n• 我看出来了 = I figured it out / I can tell\n• 想出来一个办法 = come up with a solution\n• 听出来 = recognize by ear',
      commonMistakes: '❌ Confondre le sens physique et le sens figuré\n• 站起来 = « se lever » (physique) MAIS 起来 après un verbe d\'état = « commencer à »\n• 走下去 = « descendre en marchant » MAIS 说下去 = « continuer à parler »\n\n❌ Ordre STRICT : verbe + directionnel + (来/去)\n• Incorrect : 起来他笑\n• Correct : 他笑起来\n\n❌ Négation : ne peut PAS être utilisée directement avec 不\n• Incorrect : 我不看出来\n• Passer par 没能 ou reformuler : 我看不出来 (potentiel négatif) / 我没看出来 (passé)',
      commonMistakesEn: '❌ Confusing physical vs figurative sense\n• 站起来 = "stand up" (physical) BUT 起来 after a state verb = "start to"\n• 走下去 = "walk downward" BUT 说下去 = "keep talking"\n\n❌ STRICT order: verb + directional + (来/去)\n• Wrong: 起来他笑\n• Right: 他笑起来\n\n❌ Negation: can\'t use 不 directly\n• Wrong: 我不看出来\n• Use 没能 or the potential negative: 我看不出来 / 我没看出来',
      tips: '💡 Mnémo des sens figurés :\n• 起来 = « START / APPEAR »\n• 下去 = « CONTINUE »\n• 下来 = « CAPTURE / CALM »\n• 出来 = « FIGURE OUT / PRODUCE »\n\n💡 Reconnaître ces figurés est CLÉ pour comprendre le chinois natif — ils saturent le langage quotidien',
      tipsEn: '💡 Figurative-sense mnemonic:\n• 起来 = "START / APPEAR"\n• 下去 = "CONTINUE"\n• 下来 = "CAPTURE / CALM"\n• 出来 = "FIGURE OUT / PRODUCE"\n\n💡 Recognizing these figurative uses is KEY for understanding natives — they saturate daily language',
      relatedGrammar: ['grammar-directional-simple', 'grammar-directional-compound']
    },
    audio: 'audio/grammar/directional-figurative.wav',
    examples: [
      { hanzi: '他突然哭起来', pinyin: 'tā tūrán kū qǐlái', translation: 'He suddenly burst into tears (起来 = start)', translationFr: 'Il se mit soudain à pleurer (起来 = début d\'état)' },
      { hanzi: '请把我的话记下来', pinyin: 'qǐng bǎ wǒ de huà jì xiàlái', translation: 'Please write down what I say (下来 = capture)', translationFr: 'Note ce que je dis (下来 = garder trace)' },
      { hanzi: '我猜出来了', pinyin: 'wǒ cāi chūlái le', translation: 'I figured it out (出来 = figure out)', translationFr: 'J\'ai deviné (出来 = déduire)' },
      { hanzi: '请坚持下去', pinyin: 'qǐng jiānchí xiàqù', translation: 'Please keep going (下去 = continue)', translationFr: 'Continue de tenir bon (下去 = persister)' }
    ],
    quiz: {
      prompt: '« Il éclate de rire » (soudain) =',
      choices: ['他笑起来', '他笑下去', '他笑下来', '他笑出来'],
      correctChoiceIndex: 0
    },
    grammarQuiz: {
      type: 'fill-blank',
      sentence: '请把这些字记___',
      translation: 'Notez ces caractères (pour garder trace)',
      translationEn: 'Please write down these characters (to keep them)',
      choices: ['起来', '下去', '下来', '出来'],
      correctChoice: '下来',
      explanation: '下来 marque l\'idée de FIXER / GARDER EN TRACE. 记下来 = « noter pour retenir », 写下来 = « mettre par écrit ».'
    },
    tags: ['grammaire', 'directionnels', 'figuratif'],
    theme: 'grammar'
  }
];
