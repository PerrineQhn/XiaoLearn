/**
 * learning-content.ts — Catalogue des guides + listes Apprendre (FR + EN)
 * ------------------------------------------------------------------------
 * 12 contenus pédagogiques, organisés en 6 guides + 6 listes. Chaque
 * contenu existe en français (champs principaux) et en anglais (champs
 * `*En` optionnels — utilisés par /en/apprendre/[slug]).
 *
 * Type GUIDE : article focalisé sur une notion linguistique (alphabet,
 *              salutation, sentiment), avec prose + petits tableaux.
 * Type LISTE : catalogue thématique (nombres, jours, vocabulaire), avec
 *              sommaire + sections numérotées d'entrées.
 *
 * Tous les contenus pointent vers les fiches du dictionnaire (`dictId`)
 * quand l'entrée a un équivalent HSK.
 */

export type LearningContentType = 'guide' | 'liste';
export type LearningContentStatus = 'published' | 'soon';

export interface LearningEntry {
  hanzi: string;
  pinyin: string;
  translationFr: string;
  translationEn?: string;
  gloss?: string;
  glossEn?: string;
  dictId?: string;
}

export interface LearningSection {
  title: string;
  titleEn?: string;
  description?: string;
  descriptionEn?: string;
  entries: LearningEntry[];
}

export interface LearningContent {
  slug: string;
  type: LearningContentType;
  status: LearningContentStatus;
  kicker: string;
  kickerEn?: string;
  title: string;
  titleEn?: string;
  shortDescription: string;
  shortDescriptionEn?: string;
  longDescription?: string;
  longDescriptionEn?: string;
  featuredHanzi?: string;
  featuredPinyin?: string;
  count?: number;
  updatedAt: string;
  sections?: LearningSection[];
}

// ============================================================================
//  GUIDES
// ============================================================================

const PINYIN_GUIDE: LearningContent = {
  slug: 'pinyin',
  type: 'guide',
  status: 'published',
  kicker: 'ALPHABET',
  kickerEn: 'ALPHABET',
  title: 'Le pinyin : guide pour lire le mandarin sans détour',
  titleEn: 'Pinyin: the guide to reading Mandarin straight away',
  shortDescription:
    "Le système de transcription phonétique du chinois : 21 initiales, 6 voyelles, 4 tons. La base pour lire et prononcer.",
  shortDescriptionEn:
    'The phonetic transcription system for Chinese: 21 initials, 6 vowels, 4 tones. The foundation for reading and pronouncing.',
  longDescription:
    "Le pinyin est le système officiel de romanisation du mandarin standard. Il transcrit la prononciation des hanzi avec l'alphabet latin et 4 marques tonales. Maîtriser le pinyin, c'est la fondation absolue pour apprendre à parler et à lire le chinois.",
  longDescriptionEn:
    'Pinyin is the official romanization system for standard Mandarin. It transcribes the pronunciation of hanzi with the Latin alphabet plus 4 tone marks. Mastering pinyin is the absolute foundation for speaking and reading Chinese.',
  featuredHanzi: '拼音',
  featuredPinyin: 'pīnyīn',
  updatedAt: '2026-05-12',
  sections: [
    {
      title: 'Les 4 tons',
      titleEn: 'The 4 tones',
      description:
        'Le mandarin est tonal : la même syllabe change de sens selon la mélodie. Le ton se note par un accent au-dessus de la voyelle principale.',
      descriptionEn:
        'Mandarin is tonal: the same syllable changes meaning depending on the melody. The tone is marked by an accent above the main vowel.',
      entries: [
        { hanzi: 'mā', pinyin: '1er ton — plat haut', translationFr: 'maman (妈)', translationEn: 'mom (妈)', gloss: 'mélodie aiguë et stable', glossEn: 'high, stable pitch' },
        { hanzi: 'má', pinyin: '2e ton — montant', translationFr: 'chanvre (麻)', translationEn: 'hemp (麻)', gloss: 'comme une question : "quoi ?"', glossEn: 'like asking "what?"' },
        { hanzi: 'mǎ', pinyin: '3e ton — descendant-montant', translationFr: 'cheval (马)', translationEn: 'horse (马)', gloss: 'creux puis remontée', glossEn: 'dip then rise' },
        { hanzi: 'mà', pinyin: '4e ton — descendant', translationFr: 'gronder (骂)', translationEn: 'scold (骂)', gloss: 'sec et tombant, comme un ordre', glossEn: 'sharp and falling, like a command' },
        { hanzi: 'ma', pinyin: 'neutre (sans ton)', translationFr: 'particule', translationEn: 'particle', gloss: 'rapide et faible, comme un suffixe', glossEn: 'quick and light, like a suffix' }
      ]
    },
    {
      title: 'Les initiales courantes',
      titleEn: 'Common initials',
      description: "Les sons de début de syllabe. Certaines sont proches du français, d'autres demandent un peu d'entraînement.",
      descriptionEn: 'Syllable-start sounds. Some are close to English, others need practice.',
      entries: [
        { hanzi: 'b / p', pinyin: 'b non aspiré · p aspiré', translationFr: 'bā / pā', translationEn: 'bā / pā', gloss: 'p anglais = b chinois ; p chinois = expulsion d\'air forte', glossEn: 'English p = Chinese b; Chinese p = strong puff of air' },
        { hanzi: 'd / t', pinyin: 'd non aspiré · t aspiré', translationFr: 'dē / tē', translationEn: 'dē / tē', gloss: 'pareil : la différence est le souffle', glossEn: 'same: the difference is the puff' },
        { hanzi: 'j / q', pinyin: 'j doux · q aspiré', translationFr: 'jī / qī', translationEn: 'jī / qī', gloss: 'langue plate contre le palais', glossEn: 'tongue flat against the palate' },
        { hanzi: 'zh / ch', pinyin: 'zh non aspiré · ch aspiré', translationFr: 'zhī / chī', translationEn: 'zhī / chī', gloss: 'langue recourbée (rétroflexe)', glossEn: 'curled-back tongue (retroflex)' },
        { hanzi: 'x', pinyin: 'son du fond de la bouche', translationFr: 'xī', translationEn: 'xī', gloss: 'entre "si" français et "chi"', glossEn: 'between "see" and "she"' },
        { hanzi: 'r', pinyin: 'r anglais ≠ r chinois', translationFr: 'rì', translationEn: 'rì', gloss: 'plutôt comme un "j" anglais (jam)', glossEn: 'closer to English "j" in "jam"' }
      ]
    },
    {
      title: 'Les finales avec voyelles',
      titleEn: 'Vowel finals',
      description: 'Les voyelles seules ou combinées qui forment la fin de la syllabe.',
      descriptionEn: 'Single or combined vowels that form the syllable ending.',
      entries: [
        { hanzi: 'a', pinyin: 'comme "ah"', translationFr: 'mā 妈', translationEn: 'mā 妈' },
        { hanzi: 'o', pinyin: 'comme "ow" anglais', translationFr: 'wǒ 我', translationEn: 'wǒ 我' },
        { hanzi: 'e', pinyin: 'comme "uh"', translationFr: 'hē 喝', translationEn: 'hē 喝' },
        { hanzi: 'i', pinyin: 'comme "ee" sauf après zh/ch/sh/r/z/c/s', translationFr: 'nǐ 你', translationEn: 'nǐ 你' },
        { hanzi: 'u', pinyin: 'comme "oo"', translationFr: 'bù 不', translationEn: 'bù 不' },
        { hanzi: 'ü', pinyin: 'comme "u" français', translationFr: 'nǚ 女', translationEn: 'nǚ 女', gloss: 'écrit "u" après j/q/x/y', glossEn: 'written "u" after j/q/x/y' }
      ]
    }
  ]
};

const NIHAO_GUIDE: LearningContent = {
  slug: 'dire-bonjour',
  type: 'guide',
  status: 'published',
  kicker: 'SALUTATION',
  kickerEn: 'GREETINGS',
  title: 'Comment dire bonjour en chinois : 你好, 您好 et toutes les variantes',
  titleEn: 'How to say hello in Chinese: 你好, 您好 and all the variants',
  shortDescription:
    'Le guide complet pour dire bonjour en mandarin : 你好 (standard), 您好 (formel), 早 (matin) et toutes les variantes selon le moment et le contexte.',
  shortDescriptionEn:
    'The complete guide to saying hello in Mandarin: 你好 (standard), 您好 (formal), 早 (morning) and all variants depending on time and context.',
  longDescription:
    "Dire bonjour en chinois ne se résume pas à 你好 (nǐ hǎo). Selon le moment de la journée, le degré de formalité et la situation, le mandarin offre toute une palette de salutations. Voici les expressions à connaître pour saluer comme un natif.",
  longDescriptionEn:
    'Saying hello in Chinese is not just 你好 (nǐ hǎo). Depending on time of day, formality and situation, Mandarin offers a wide palette of greetings. Here are the expressions to know to greet like a native.',
  featuredHanzi: '你好',
  featuredPinyin: 'nǐ hǎo',
  updatedAt: '2026-05-12',
  sections: [
    {
      title: 'Les salutations universelles',
      titleEn: 'Universal greetings',
      description: "À utiliser partout, à n'importe quel moment de la journée. Le standard absolu.",
      descriptionEn: 'Use them anywhere, anytime. The absolute standard.',
      entries: [
        { hanzi: '你好', pinyin: 'nǐ hǎo', translationFr: 'bonjour (standard)', translationEn: 'hello (standard)', gloss: 'littéralement "tu bien" — la salutation par défaut', glossEn: 'literally "you good" — the default greeting' },
        { hanzi: '您好', pinyin: 'nín hǎo', translationFr: 'bonjour (formel)', translationEn: 'hello (formal)', gloss: '您 est le "vous" de politesse, à utiliser avec des aînés ou en contexte pro', glossEn: '您 is the polite "you", used with elders or in pro contexts' },
        { hanzi: '你们好', pinyin: 'nǐmen hǎo', translationFr: 'bonjour (à plusieurs)', translationEn: 'hello (to several people)', gloss: 'pour saluer un groupe', glossEn: 'for greeting a group' },
        { hanzi: '大家好', pinyin: 'dàjiā hǎo', translationFr: 'bonjour à tous', translationEn: 'hello everyone', gloss: "pour s'adresser à une assemblée", glossEn: 'when addressing an audience' }
      ]
    },
    {
      title: 'Selon le moment de la journée',
      titleEn: 'By time of day',
      description: 'Plus chaleureux et précis que 你好, surtout utilisé dans des contextes amicaux ou matinaux.',
      descriptionEn: 'Warmer and more specific than 你好, especially used in friendly or morning contexts.',
      entries: [
        { hanzi: '早', pinyin: 'zǎo', translationFr: 'bonjour (le matin)', translationEn: 'good morning', gloss: 'forme courte et amicale', glossEn: 'short, friendly form' },
        { hanzi: '早上好', pinyin: 'zǎoshang hǎo', translationFr: 'bonjour (le matin)', translationEn: 'good morning', gloss: 'forme complète, plus formelle', glossEn: 'full form, more formal' },
        { hanzi: '中午好', pinyin: 'zhōngwǔ hǎo', translationFr: 'bonjour (vers midi)', translationEn: 'good noon', gloss: "peu utilisé à l'oral, plus en écrit", glossEn: 'rare in speech, mostly written' },
        { hanzi: '下午好', pinyin: 'xiàwǔ hǎo', translationFr: 'bon après-midi', translationEn: 'good afternoon', gloss: 'plutôt formel', glossEn: 'rather formal' },
        { hanzi: '晚上好', pinyin: 'wǎnshang hǎo', translationFr: 'bonsoir', translationEn: 'good evening', gloss: 'à partir de 18h environ', glossEn: 'from around 6 p.m.' }
      ]
    },
    {
      title: 'Salutations informelles entre amis',
      titleEn: 'Informal greetings between friends',
      entries: [
        { hanzi: '嗨', pinyin: 'hāi', translationFr: 'salut (très informel)', translationEn: 'hi (very informal)', gloss: 'emprunt à l\'anglais "hi"', glossEn: 'borrowed from English "hi"' },
        { hanzi: '嘿', pinyin: 'hēi', translationFr: 'hé !', translationEn: 'hey!', gloss: "plutôt pour attirer l'attention", glossEn: 'mostly to get attention' },
        { hanzi: '吃了吗', pinyin: 'chī le ma', translationFr: 'tu as mangé ?', translationEn: 'have you eaten?', gloss: 'salutation traditionnelle, équivalent à "ça va ?"', glossEn: 'traditional greeting, like "how\'s it going?"' },
        { hanzi: '最近怎么样', pinyin: 'zuìjìn zěnmeyàng', translationFr: 'comment ça va ces derniers temps ?', translationEn: 'how have you been lately?', gloss: 'salutation amicale élaborée', glossEn: 'elaborate friendly greeting' }
      ]
    }
  ]
};

const XIEXIE_GUIDE: LearningContent = {
  slug: 'dire-merci',
  type: 'guide',
  status: 'published',
  kicker: 'POLITESSE',
  kickerEn: 'POLITENESS',
  title: 'Comment dire merci en chinois : 谢谢, 多谢 et toutes les variantes',
  titleEn: 'How to say thank you in Chinese: 谢谢, 多谢 and all the variants',
  shortDescription:
    'Le guide complet pour dire merci en mandarin : 谢谢 (standard), 多谢 (poli), 太感谢了 (très chaleureux) et les formules selon le contexte.',
  shortDescriptionEn:
    'The complete guide to saying thank you in Mandarin: 谢谢 (standard), 多谢 (polite), 太感谢了 (very warm) and the right formula for each context.',
  longDescription:
    "Au-delà du classique 谢谢, le mandarin offre plusieurs façons d'exprimer la gratitude. Du simple 谢 amical au formel 非常感谢 d'un courrier professionnel, voici les formules à connaître.",
  longDescriptionEn:
    'Beyond the classic 谢谢, Mandarin offers several ways to express gratitude. From the casual 谢 to the formal 非常感谢 of a business letter, here are the formulas to know.',
  featuredHanzi: '谢谢',
  featuredPinyin: 'xièxie',
  updatedAt: '2026-05-12',
  sections: [
    {
      title: 'Les formules courantes',
      titleEn: 'Common formulas',
      entries: [
        { hanzi: '谢谢', pinyin: 'xièxie', translationFr: 'merci', translationEn: 'thank you', gloss: 'standard absolu, à utiliser partout', glossEn: 'absolute standard, use anywhere' },
        { hanzi: '谢谢你', pinyin: 'xièxie nǐ', translationFr: 'merci à toi', translationEn: 'thank you (to you)', gloss: 'plus personnalisé', glossEn: 'more personal' },
        { hanzi: '谢谢您', pinyin: 'xièxie nín', translationFr: 'merci (poli)', translationEn: 'thank you (polite)', gloss: 'pour les aînés ou en pro', glossEn: 'for elders or pro contexts' },
        { hanzi: '多谢', pinyin: 'duō xiè', translationFr: 'merci beaucoup', translationEn: 'many thanks', gloss: 'littéralement "beaucoup remercier"', glossEn: 'literally "much thank"' }
      ]
    },
    {
      title: 'Pour exprimer une forte gratitude',
      titleEn: 'For deep gratitude',
      entries: [
        { hanzi: '非常感谢', pinyin: 'fēicháng gǎnxiè', translationFr: 'merci infiniment', translationEn: 'thank you very much', gloss: 'formel, courriers et discours', glossEn: 'formal, letters and speeches' },
        { hanzi: '太感谢了', pinyin: 'tài gǎnxiè le', translationFr: 'merci énormément !', translationEn: 'thanks so much!', gloss: 'chaleureux, oral', glossEn: 'warm, spoken' },
        { hanzi: '麻烦你了', pinyin: 'máfan nǐ le', translationFr: "merci de t'être donné cette peine", translationEn: 'sorry for the trouble (and thanks)', gloss: "reconnait l'effort de l'autre", glossEn: 'acknowledges their effort' },
        { hanzi: '辛苦了', pinyin: 'xīnkǔ le', translationFr: 'merci pour ton dur travail', translationEn: 'thanks for your hard work', gloss: 'collègues, équipiers', glossEn: 'colleagues, teammates' }
      ]
    },
    {
      title: 'Répondre à un merci',
      titleEn: 'Responding to a thank you',
      entries: [
        { hanzi: '不客气', pinyin: 'bú kèqi', translationFr: 'de rien', translationEn: "you're welcome", gloss: 'littéralement "ne sois pas poli"', glossEn: 'literally "don\'t be polite"' },
        { hanzi: '不用谢', pinyin: 'bú yòng xiè', translationFr: 'pas besoin de remercier', translationEn: 'no need to thank me', gloss: 'décontracté', glossEn: 'casual' },
        { hanzi: '没事', pinyin: 'méi shì', translationFr: "ce n'est rien", translationEn: "it's nothing", gloss: 'oral, amical', glossEn: 'spoken, friendly' },
        { hanzi: '应该的', pinyin: 'yīnggāi de', translationFr: "c'était normal", translationEn: 'it was the right thing', gloss: 'modeste, courant', glossEn: 'modest, common' }
      ]
    }
  ]
};

const ZAIJIAN_GUIDE: LearningContent = {
  slug: 'dire-au-revoir',
  type: 'guide',
  status: 'published',
  kicker: 'SALUTATION',
  kickerEn: 'GREETINGS',
  title: 'Comment dire au revoir en mandarin : 再见 et toutes les variantes',
  titleEn: 'How to say goodbye in Mandarin: 再见 and all the variants',
  shortDescription:
    '再见, 拜拜, 回头见 — toutes les façons de prendre congé selon la formalité et le contexte.',
  shortDescriptionEn:
    '再见, 拜拜, 回头见 — every way to say goodbye depending on formality and context.',
  longDescription:
    '再见 (zàijiàn) signifie littéralement « re-voir ». C\'est le « au revoir » par défaut. Mais selon que tu te quittes pour 5 minutes ou pour 5 ans, et selon le degré de formalité, le mandarin offre plusieurs alternatives utiles.',
  longDescriptionEn:
    "再见 (zàijiàn) literally means 'see again'. It's the default goodbye. But depending on whether you part for 5 minutes or 5 years, and on formality, Mandarin offers several useful alternatives.",
  featuredHanzi: '再见',
  featuredPinyin: 'zàijiàn',
  updatedAt: '2026-05-12',
  sections: [
    {
      title: 'Les au revoir standards',
      titleEn: 'Standard goodbyes',
      entries: [
        { hanzi: '再见', pinyin: 'zàijiàn', translationFr: 'au revoir (standard)', translationEn: 'goodbye (standard)', gloss: 'littéralement "re-voir"', glossEn: 'literally "see again"' },
        { hanzi: '拜拜', pinyin: 'bài bài', translationFr: 'bye-bye', translationEn: 'bye-bye', gloss: 'emprunt à l\'anglais, très courant', glossEn: 'borrowed from English, very common' },
        { hanzi: '拜', pinyin: 'bài', translationFr: 'bye', translationEn: 'bye', gloss: 'forme courte, entre amis', glossEn: 'short form, among friends' }
      ]
    },
    {
      title: 'Selon quand tu reverras la personne',
      titleEn: 'Depending on when you\'ll meet again',
      entries: [
        { hanzi: '回头见', pinyin: 'huítóu jiàn', translationFr: 'à tout à l\'heure', translationEn: 'see you later', gloss: 'tu reverras la personne dans la journée', glossEn: 'when you\'ll see them later today' },
        { hanzi: '一会儿见', pinyin: 'yīhuìr jiàn', translationFr: 'à tout de suite', translationEn: 'see you in a moment', gloss: 'dans quelques minutes', glossEn: 'in a few minutes' },
        { hanzi: '明天见', pinyin: 'míngtiān jiàn', translationFr: 'à demain', translationEn: 'see you tomorrow', gloss: 'rendez-vous demain', glossEn: 'meeting tomorrow' },
        { hanzi: '下次见', pinyin: 'xiàcì jiàn', translationFr: 'à la prochaine', translationEn: 'see you next time', gloss: 'sans date précise', glossEn: 'no specific date' },
        { hanzi: '后会有期', pinyin: 'hòuhuì yǒu qī', translationFr: 'on se reverra un jour', translationEn: 'we\'ll meet again someday', gloss: 'plus littéraire, séparation longue', glossEn: 'more literary, for a long separation' }
      ]
    },
    {
      title: 'Formules formelles ou en partant',
      titleEn: 'Formal or leaving formulas',
      entries: [
        { hanzi: '我先走了', pinyin: 'wǒ xiān zǒu le', translationFr: 'je pars en premier', translationEn: 'I\'m heading off first', gloss: 'quand tu pars d\'une réunion avant les autres', glossEn: 'when leaving a meeting before others' },
        { hanzi: '我先告辞了', pinyin: 'wǒ xiān gàocí le', translationFr: 'je prends congé', translationEn: 'I take my leave', gloss: 'formel, professionnel', glossEn: 'formal, professional' },
        { hanzi: '失陪了', pinyin: 'shīpéi le', translationFr: 'excusez-moi de partir', translationEn: 'excuse me for leaving', gloss: 'très poli, formel', glossEn: 'very polite, formal' },
        { hanzi: '保重', pinyin: 'bǎozhòng', translationFr: 'prends soin de toi', translationEn: 'take care', gloss: 'chaleureux, pour une longue séparation', glossEn: 'warm, for a long separation' }
      ]
    }
  ]
};

const SORRY_GUIDE: LearningContent = {
  slug: 'sexcuser',
  type: 'guide',
  status: 'published',
  kicker: 'POLITESSE',
  kickerEn: 'POLITENESS',
  title: "Comment s'excuser en mandarin : 对不起 et toutes les nuances",
  titleEn: 'How to apologize in Mandarin: 对不起 and all the nuances',
  shortDescription:
    "Du formel 对不起 au léger 不好意思, choisir le bon niveau d'excuse selon la situation.",
  shortDescriptionEn:
    'From formal 对不起 to light 不好意思, picking the right level of apology for the situation.',
  longDescription:
    "对不起 est la formule par défaut pour s'excuser. Mais dire 对不起 pour bousculer quelqu'un dans la rue est trop fort — on utilisera plutôt 不好意思. Voici les nuances à connaître pour ne pas paraître excessif ou au contraire pas assez sérieux.",
  longDescriptionEn:
    'For everyday "excuse me" you\'ll use 不好意思; 对不起 is reserved for actual wrongs. This guide walks through the spectrum from light to deep apology, so you don\'t sound dramatic or too casual.',
  featuredHanzi: '对不起',
  featuredPinyin: 'duìbuqǐ',
  updatedAt: '2026-05-12',
  sections: [
    {
      title: 'Excuses légères (le quotidien)',
      titleEn: 'Light apologies (everyday)',
      description: "Pour bousculer, déranger, attirer l'attention. Pas une vraie excuse, plutôt une politesse.",
      descriptionEn: 'For bumping into someone, interrupting, getting attention. Not a real apology, just politeness.',
      entries: [
        { hanzi: '不好意思', pinyin: 'bù hǎo yìsi', translationFr: 'excuse-moi / pardon', translationEn: 'excuse me / pardon', gloss: 'le "excuse-moi" du quotidien', glossEn: 'everyday "excuse me"' },
        { hanzi: '麻烦了', pinyin: 'máfan le', translationFr: 'désolé de te déranger', translationEn: 'sorry to bother you', gloss: 'quand tu demandes un service', glossEn: 'when asking for a favor' },
        { hanzi: '打扰了', pinyin: 'dǎrǎo le', translationFr: 'désolé pour le dérangement', translationEn: 'sorry for the disturbance', gloss: 'entrer dans un bureau, interrompre', glossEn: 'entering an office, interrupting' }
      ]
    },
    {
      title: 'Excuses standards',
      titleEn: 'Standard apologies',
      description: "Quand tu as réellement fait quelque chose qui mérite excuse.",
      descriptionEn: 'When you actually did something that warrants an apology.',
      entries: [
        { hanzi: '对不起', pinyin: 'duìbuqǐ', translationFr: 'je suis désolé(e)', translationEn: 'I\'m sorry', gloss: 'standard, sincère', glossEn: 'standard, sincere' },
        { hanzi: '抱歉', pinyin: 'bàoqiàn', translationFr: 'mes excuses', translationEn: 'my apologies', gloss: 'légèrement plus formel que 对不起', glossEn: 'slightly more formal than 对不起' },
        { hanzi: '是我的错', pinyin: 'shì wǒ de cuò', translationFr: "c'est de ma faute", translationEn: "it's my fault", gloss: 'reconnaissance explicite', glossEn: 'explicit acknowledgment' }
      ]
    },
    {
      title: 'Excuses fortes ou formelles',
      titleEn: 'Strong or formal apologies',
      entries: [
        { hanzi: '非常抱歉', pinyin: 'fēicháng bàoqiàn', translationFr: 'sincèrement désolé(e)', translationEn: 'sincerely sorry', gloss: 'formel, courriers, communication client', glossEn: 'formal, letters, customer comms' },
        { hanzi: '请原谅', pinyin: 'qǐng yuánliàng', translationFr: 'pardonne-moi', translationEn: 'please forgive me', gloss: 'demande explicite de pardon', glossEn: 'explicit request for forgiveness' },
        { hanzi: '我错了', pinyin: 'wǒ cuò le', translationFr: "j'ai eu tort", translationEn: 'I was wrong', gloss: 'aveu sincère', glossEn: 'sincere admission' }
      ]
    },
    {
      title: 'Répondre à une excuse',
      titleEn: 'Responding to an apology',
      entries: [
        { hanzi: '没关系', pinyin: 'méi guānxi', translationFr: "ce n'est pas grave", translationEn: 'it\'s okay', gloss: 'standard', glossEn: 'standard' },
        { hanzi: '没事', pinyin: 'méi shì', translationFr: "ce n'est rien", translationEn: 'it\'s nothing', gloss: 'oral, décontracté', glossEn: 'casual, spoken' },
        { hanzi: '别担心', pinyin: 'bié dānxīn', translationFr: 'ne t\'inquiète pas', translationEn: 'don\'t worry', gloss: 'rassurant', glossEn: 'reassuring' }
      ]
    }
  ]
};

const LOVE_GUIDE: LearningContent = {
  slug: 'je-taime',
  type: 'guide',
  status: 'published',
  kicker: 'SENTIMENTS',
  kickerEn: 'FEELINGS',
  title: "Comment dire je t'aime en mandarin : 我爱你 et les nuances de l'amour",
  titleEn: 'How to say I love you in Mandarin: 我爱你 and the nuances of love',
  shortDescription:
    'La différence entre 我爱你 (déclaration forte), 我喜欢你 (j\'aime bien), 我想你 (tu me manques) et les expressions du quotidien.',
  shortDescriptionEn:
    "The difference between 我爱你 (strong declaration), 我喜欢你 (I like you), 我想你 (I miss you) and everyday expressions.",
  longDescription:
    "En Chine, dire 我爱你 (wǒ ài nǐ) à quelqu'un est beaucoup plus fort qu'en France. C'est une déclaration solennelle, plutôt rare dans les couples établis. Au quotidien, on exprime l'affection autrement. Voici les nuances à connaître pour ne pas paraître trop intense — ou au contraire pas assez engagé.",
  longDescriptionEn:
    "In China, saying 我爱你 (wǒ ài nǐ) is much heavier than in English. It's a solemn declaration, rather rare in established couples. Day-to-day affection uses other expressions. Here are the nuances so you don't sound too intense — or not committed enough.",
  featuredHanzi: '我爱你',
  featuredPinyin: 'wǒ ài nǐ',
  updatedAt: '2026-05-12',
  sections: [
    {
      title: "Les déclarations d'amour",
      titleEn: 'Declarations of love',
      description: "Réservées aux moments solennels : début de relation, anniversaire, demande en mariage.",
      descriptionEn: 'Reserved for solemn moments: start of relationship, anniversary, proposal.',
      entries: [
        { hanzi: '我爱你', pinyin: 'wǒ ài nǐ', translationFr: "je t'aime", translationEn: 'I love you', gloss: 'déclaration forte, à manier avec parcimonie', glossEn: 'strong declaration, use sparingly' },
        { hanzi: '我爱上你了', pinyin: 'wǒ ài shàng nǐ le', translationFr: 'je suis tombé(e) amoureux/amoureuse de toi', translationEn: "I've fallen in love with you", gloss: 'le 上...了 indique le changement d\'état', glossEn: '上...了 marks the change of state' },
        { hanzi: '你是我的一切', pinyin: 'nǐ shì wǒ de yīqiè', translationFr: 'tu es tout pour moi', translationEn: 'you are everything to me', gloss: 'très romantique', glossEn: 'very romantic' }
      ]
    },
    {
      title: '« J\'aime bien » au quotidien',
      titleEn: 'Everyday "I like you"',
      description: 'Plus léger et plus courant que 我爱你 dans les couples chinois.',
      descriptionEn: 'Lighter and more common than 我爱你 in Chinese couples.',
      entries: [
        { hanzi: '我喜欢你', pinyin: 'wǒ xǐhuan nǐ', translationFr: "tu me plais / j'aime bien", translationEn: 'I like you', gloss: 'la déclaration ordinaire en début de relation', glossEn: 'the ordinary declaration at the start of a relationship' },
        { hanzi: '我喜欢上你了', pinyin: 'wǒ xǐhuan shàng nǐ le', translationFr: "je me suis pris(e) d'affection pour toi", translationEn: "I've grown fond of you", gloss: 'a évolué vers de l\'attachement', glossEn: 'evolved into attachment' },
        { hanzi: '我很喜欢你', pinyin: 'wǒ hěn xǐhuan nǐ', translationFr: "je t'aime vraiment beaucoup", translationEn: 'I really like you a lot', gloss: '很 renforce', glossEn: '很 reinforces' }
      ]
    },
    {
      title: 'Le manque',
      titleEn: 'Missing someone',
      description: "Souvent plus utilisé que les déclarations d'amour pures.",
      descriptionEn: 'Often more used than pure declarations of love.',
      entries: [
        { hanzi: '我想你', pinyin: 'wǒ xiǎng nǐ', translationFr: 'tu me manques', translationEn: 'I miss you', gloss: '想 = penser à, manquer', glossEn: '想 = to think of, to miss' },
        { hanzi: '我很想你', pinyin: 'wǒ hěn xiǎng nǐ', translationFr: 'tu me manques beaucoup', translationEn: 'I miss you a lot', gloss: '很 renforce', glossEn: '很 reinforces' },
        { hanzi: '想死你了', pinyin: 'xiǎng sǐ nǐ le', translationFr: 'tu me manques à mourir', translationEn: 'I miss you like crazy', gloss: 'hyperbole affective', glossEn: 'emotional hyperbole' }
      ]
    }
  ]
};

// ============================================================================
//  LISTES
// ============================================================================

const NUMBERS_LIST: LearningContent = {
  slug: 'compter-1-a-100',
  type: 'liste',
  status: 'published',
  kicker: 'NOMBRES',
  kickerEn: 'NUMBERS',
  title: 'Compter en mandarin de 1 à 100 (avec audio)',
  titleEn: 'Counting in Mandarin from 1 to 100 (with audio)',
  shortDescription:
    "Tous les nombres mandarin de 1 à 100. Construction décimale ultra-régulière : une fois 1-10 et les dizaines, tu peux tout dire.",
  shortDescriptionEn:
    'All Mandarin numbers from 1 to 100. Ultra-regular decimal construction: once you know 1-10 and the tens, you can say everything.',
  longDescription:
    "Le système numérique chinois est l'un des plus simples au monde. Une fois maîtrisés les 1-10 et les dizaines, n'importe quel nombre se construit par juxtaposition. 21 = 二十一 (deux-dix-un). Aucune exception comme « quatre-vingt-dix » en français.",
  longDescriptionEn:
    "The Chinese number system is one of the simplest in the world. Once you've mastered 1-10 and the tens, any number is built by juxtaposition. 21 = 二十一 (two-ten-one). No exceptions like 'eighty' or 'ninety' in English.",
  count: 100,
  updatedAt: '2026-05-12',
  sections: [
    {
      title: 'De 0 à 10',
      titleEn: 'From 0 to 10',
      description: "La base indispensable. À apprendre par cœur — tout le reste s'en déduit.",
      descriptionEn: 'The essential foundation. Memorize it — everything else follows.',
      entries: [
        { hanzi: '零', pinyin: 'líng', translationFr: 'zéro', translationEn: 'zero' },
        { hanzi: '一', pinyin: 'yī', translationFr: 'un', translationEn: 'one' },
        { hanzi: '二', pinyin: 'èr', translationFr: 'deux', translationEn: 'two' },
        { hanzi: '三', pinyin: 'sān', translationFr: 'trois', translationEn: 'three' },
        { hanzi: '四', pinyin: 'sì', translationFr: 'quatre', translationEn: 'four' },
        { hanzi: '五', pinyin: 'wǔ', translationFr: 'cinq', translationEn: 'five' },
        { hanzi: '六', pinyin: 'liù', translationFr: 'six', translationEn: 'six' },
        { hanzi: '七', pinyin: 'qī', translationFr: 'sept', translationEn: 'seven' },
        { hanzi: '八', pinyin: 'bā', translationFr: 'huit', translationEn: 'eight' },
        { hanzi: '九', pinyin: 'jiǔ', translationFr: 'neuf', translationEn: 'nine' },
        { hanzi: '十', pinyin: 'shí', translationFr: 'dix', translationEn: 'ten' }
      ]
    },
    {
      title: 'Les dizaines',
      titleEn: 'The tens',
      description: 'Structure : nombre + 十. Vingt = "deux-dix", trente = "trois-dix", etc.',
      descriptionEn: 'Structure: number + 十. Twenty = "two-ten", thirty = "three-ten", etc.',
      entries: [
        { hanzi: '十', pinyin: 'shí', translationFr: '10', translationEn: '10' },
        { hanzi: '二十', pinyin: 'èr shí', translationFr: '20', translationEn: '20', gloss: 'deux × dix', glossEn: 'two × ten' },
        { hanzi: '三十', pinyin: 'sān shí', translationFr: '30', translationEn: '30' },
        { hanzi: '四十', pinyin: 'sì shí', translationFr: '40', translationEn: '40' },
        { hanzi: '五十', pinyin: 'wǔ shí', translationFr: '50', translationEn: '50' },
        { hanzi: '六十', pinyin: 'liù shí', translationFr: '60', translationEn: '60' },
        { hanzi: '七十', pinyin: 'qī shí', translationFr: '70', translationEn: '70' },
        { hanzi: '八十', pinyin: 'bā shí', translationFr: '80', translationEn: '80' },
        { hanzi: '九十', pinyin: 'jiǔ shí', translationFr: '90', translationEn: '90' },
        { hanzi: '一百', pinyin: 'yī bǎi', translationFr: '100', translationEn: '100', gloss: '百 = cent', glossEn: '百 = hundred' }
      ]
    },
    {
      title: 'Construire les nombres composés',
      titleEn: 'Building compound numbers',
      description: "Pour 11-99 : dizaine + unité. Quarante-deux = 四十二 (quatre-dix-deux). Aucune exception.",
      descriptionEn: 'For 11-99: tens + units. Forty-two = 四十二 (four-ten-two). No exceptions.',
      entries: [
        { hanzi: '十一', pinyin: 'shí yī', translationFr: '11', translationEn: '11', gloss: 'dix-un', glossEn: 'ten-one' },
        { hanzi: '十五', pinyin: 'shí wǔ', translationFr: '15', translationEn: '15' },
        { hanzi: '二十一', pinyin: 'èr shí yī', translationFr: '21', translationEn: '21', gloss: 'deux-dix-un', glossEn: 'two-ten-one' },
        { hanzi: '三十三', pinyin: 'sān shí sān', translationFr: '33', translationEn: '33' },
        { hanzi: '四十二', pinyin: 'sì shí èr', translationFr: '42', translationEn: '42' },
        { hanzi: '五十五', pinyin: 'wǔ shí wǔ', translationFr: '55', translationEn: '55' },
        { hanzi: '六十八', pinyin: 'liù shí bā', translationFr: '68', translationEn: '68' },
        { hanzi: '七十七', pinyin: 'qī shí qī', translationFr: '77', translationEn: '77' },
        { hanzi: '八十九', pinyin: 'bā shí jiǔ', translationFr: '89', translationEn: '89' },
        { hanzi: '九十九', pinyin: 'jiǔ shí jiǔ', translationFr: '99', translationEn: '99' }
      ]
    }
  ]
};

const DAYS_LIST: LearningContent = {
  slug: 'jours-mois-dates',
  type: 'liste',
  status: 'published',
  kicker: 'CALENDRIER',
  kickerEn: 'CALENDAR',
  title: 'Les jours, mois et dates en mandarin (avec audio)',
  titleEn: 'Days, months and dates in Mandarin (with audio)',
  shortDescription:
    'Tout le calendrier en chinois : 7 jours de la semaine, 12 mois, repères temporels (hier, demain, semaine prochaine), avec audio natif.',
  shortDescriptionEn:
    'The full Chinese calendar: 7 weekdays, 12 months, time markers (yesterday, tomorrow, next week), with native audio.',
  longDescription:
    "Le calendrier mandarin est ultra-logique : les mois utilisent les nombres (一月 = janvier, 五月 = mai) et les jours de la semaine se forment avec 星期 + nombre. Voici les repères temporels du quotidien à maîtriser.",
  longDescriptionEn:
    "The Mandarin calendar is ultra-logical: months use numbers (一月 = January, 五月 = May) and weekdays are formed with 星期 + number. Here are the everyday time markers to master.",
  count: 30,
  updatedAt: '2026-05-12',
  sections: [
    {
      title: 'Les jours de la semaine',
      titleEn: 'Days of the week',
      description: "Structure : 星期 (xīngqī, semaine) + numéro. Le dimanche est l'exception avec 天/日 au lieu de 7.",
      descriptionEn: 'Structure: 星期 (xīngqī, week) + number. Sunday is the exception with 天/日 instead of 7.',
      entries: [
        { hanzi: '星期一', pinyin: 'xīngqī yī', translationFr: 'lundi', translationEn: 'Monday', gloss: 'semaine-un', glossEn: 'week-one' },
        { hanzi: '星期二', pinyin: 'xīngqī èr', translationFr: 'mardi', translationEn: 'Tuesday' },
        { hanzi: '星期三', pinyin: 'xīngqī sān', translationFr: 'mercredi', translationEn: 'Wednesday' },
        { hanzi: '星期四', pinyin: 'xīngqī sì', translationFr: 'jeudi', translationEn: 'Thursday' },
        { hanzi: '星期五', pinyin: 'xīngqī wǔ', translationFr: 'vendredi', translationEn: 'Friday' },
        { hanzi: '星期六', pinyin: 'xīngqī liù', translationFr: 'samedi', translationEn: 'Saturday' },
        { hanzi: '星期天', pinyin: 'xīngqī tiān', translationFr: 'dimanche', translationEn: 'Sunday', gloss: 'semaine-ciel', glossEn: 'week-sky' },
        { hanzi: '周末', pinyin: 'zhōumò', translationFr: 'week-end', translationEn: 'weekend' }
      ]
    },
    {
      title: 'Les douze mois',
      titleEn: 'The twelve months',
      description: "Structure : numéro + 月 (yuè, lune/mois). Pas d'exception.",
      descriptionEn: 'Structure: number + 月 (yuè, moon/month). No exceptions.',
      entries: [
        { hanzi: '一月', pinyin: 'yī yuè', translationFr: 'janvier', translationEn: 'January' },
        { hanzi: '二月', pinyin: 'èr yuè', translationFr: 'février', translationEn: 'February' },
        { hanzi: '三月', pinyin: 'sān yuè', translationFr: 'mars', translationEn: 'March' },
        { hanzi: '四月', pinyin: 'sì yuè', translationFr: 'avril', translationEn: 'April' },
        { hanzi: '五月', pinyin: 'wǔ yuè', translationFr: 'mai', translationEn: 'May' },
        { hanzi: '六月', pinyin: 'liù yuè', translationFr: 'juin', translationEn: 'June' },
        { hanzi: '七月', pinyin: 'qī yuè', translationFr: 'juillet', translationEn: 'July' },
        { hanzi: '八月', pinyin: 'bā yuè', translationFr: 'août', translationEn: 'August' },
        { hanzi: '九月', pinyin: 'jiǔ yuè', translationFr: 'septembre', translationEn: 'September' },
        { hanzi: '十月', pinyin: 'shí yuè', translationFr: 'octobre', translationEn: 'October' },
        { hanzi: '十一月', pinyin: 'shí yī yuè', translationFr: 'novembre', translationEn: 'November' },
        { hanzi: '十二月', pinyin: 'shí èr yuè', translationFr: 'décembre', translationEn: 'December' }
      ]
    },
    {
      title: "Hier, aujourd'hui, demain",
      titleEn: 'Yesterday, today, tomorrow',
      entries: [
        { hanzi: '今天', pinyin: 'jīntiān', translationFr: "aujourd'hui", translationEn: 'today' },
        { hanzi: '昨天', pinyin: 'zuótiān', translationFr: 'hier', translationEn: 'yesterday' },
        { hanzi: '明天', pinyin: 'míngtiān', translationFr: 'demain', translationEn: 'tomorrow' },
        { hanzi: '前天', pinyin: 'qiántiān', translationFr: 'avant-hier', translationEn: 'the day before yesterday' },
        { hanzi: '后天', pinyin: 'hòutiān', translationFr: 'après-demain', translationEn: 'the day after tomorrow' },
        { hanzi: '这个星期', pinyin: 'zhège xīngqī', translationFr: 'cette semaine', translationEn: 'this week' },
        { hanzi: '上个星期', pinyin: 'shàng ge xīngqī', translationFr: 'la semaine dernière', translationEn: 'last week' },
        { hanzi: '下个星期', pinyin: 'xià ge xīngqī', translationFr: 'la semaine prochaine', translationEn: 'next week' },
        { hanzi: '这个月', pinyin: 'zhège yuè', translationFr: 'ce mois-ci', translationEn: 'this month' },
        { hanzi: '今年', pinyin: 'jīnnián', translationFr: 'cette année', translationEn: 'this year' }
      ]
    }
  ]
};

const COLORS_LIST: LearningContent = {
  slug: 'les-couleurs',
  type: 'liste',
  status: 'published',
  kicker: 'VOCABULAIRE',
  kickerEn: 'VOCABULARY',
  title: 'Les couleurs en mandarin (noms, adjectifs et nuances)',
  titleEn: 'Colors in Mandarin (nouns, adjectives and nuances)',
  shortDescription:
    'Toutes les couleurs courantes en mandarin avec leur nom (色) et leur emploi comme adjectif. Plus les nuances de la culture chinoise (rouge porte-bonheur, jaune impérial).',
  shortDescriptionEn:
    'All common Mandarin colors with their noun form (色) and adjective use. Plus the cultural nuances (red = good luck, yellow = imperial).',
  count: 18,
  updatedAt: '2026-05-12',
  sections: [
    {
      title: 'Les couleurs primaires',
      titleEn: 'Primary colors',
      description: "Structure : nom + 色 (sè, couleur). Pour l'adjectif, on retire souvent 色.",
      descriptionEn: 'Structure: name + 色 (sè, color). For the adjective form, 色 is often dropped.',
      entries: [
        { hanzi: '红色', pinyin: 'hóngsè', translationFr: 'rouge', translationEn: 'red', gloss: 'couleur du bonheur et de la chance', glossEn: 'color of happiness and luck' },
        { hanzi: '蓝色', pinyin: 'lánsè', translationFr: 'bleu', translationEn: 'blue' },
        { hanzi: '黄色', pinyin: 'huángsè', translationFr: 'jaune', translationEn: 'yellow', gloss: 'couleur impériale historique', glossEn: 'historic imperial color' },
        { hanzi: '绿色', pinyin: 'lǜsè', translationFr: 'vert', translationEn: 'green' },
        { hanzi: '白色', pinyin: 'báisè', translationFr: 'blanc', translationEn: 'white', gloss: 'couleur du deuil dans la culture traditionnelle', glossEn: 'mourning color in traditional culture' },
        { hanzi: '黑色', pinyin: 'hēisè', translationFr: 'noir', translationEn: 'black' }
      ]
    },
    {
      title: 'Couleurs secondaires',
      titleEn: 'Secondary colors',
      entries: [
        { hanzi: '橙色', pinyin: 'chéngsè', translationFr: 'orange', translationEn: 'orange' },
        { hanzi: '紫色', pinyin: 'zǐsè', translationFr: 'violet', translationEn: 'purple' },
        { hanzi: '粉色', pinyin: 'fěnsè', translationFr: 'rose', translationEn: 'pink' },
        { hanzi: '灰色', pinyin: 'huīsè', translationFr: 'gris', translationEn: 'gray' },
        { hanzi: '棕色', pinyin: 'zōngsè', translationFr: 'marron', translationEn: 'brown' },
        { hanzi: '金色', pinyin: 'jīnsè', translationFr: 'doré', translationEn: 'gold' },
        { hanzi: '银色', pinyin: 'yínsè', translationFr: 'argenté', translationEn: 'silver' }
      ]
    },
    {
      title: 'Expressions courantes',
      titleEn: 'Common expressions',
      entries: [
        { hanzi: '什么颜色', pinyin: 'shénme yánsè', translationFr: 'de quelle couleur ?', translationEn: 'what color?' },
        { hanzi: '颜色', pinyin: 'yánsè', translationFr: 'couleur (le mot général)', translationEn: 'color (general term)' },
        { hanzi: '浅色', pinyin: 'qiǎnsè', translationFr: 'couleur claire', translationEn: 'light color' },
        { hanzi: '深色', pinyin: 'shēnsè', translationFr: 'couleur foncée', translationEn: 'dark color' },
        { hanzi: '彩色', pinyin: 'cǎisè', translationFr: 'multicolore, en couleur', translationEn: 'multicolored, in color' }
      ]
    }
  ]
};

const VERBS_LIST: LearningContent = {
  slug: '100-verbes-essentiels',
  type: 'liste',
  status: 'published',
  kicker: 'VOCABULAIRE',
  kickerEn: 'VOCABULARY',
  title: 'Les verbes mandarin essentiels (avec audio)',
  titleEn: 'Essential Mandarin verbs (with audio)',
  shortDescription:
    'Liste curée des verbes mandarin à connaître absolument : actions du quotidien, déplacement, communication, perception, sentiments.',
  shortDescriptionEn:
    'Curated list of must-know Mandarin verbs: everyday actions, movement, communication, perception, feelings.',
  longDescription:
    "Le mandarin ne conjugue pas — un verbe garde la même forme quel que soit le sujet, le temps ou la personne. Voici les verbes les plus utiles pour t'exprimer dans la vie de tous les jours, classés par thème.",
  longDescriptionEn:
    "Mandarin doesn't conjugate — a verb keeps the same form regardless of subject, tense or person. Here are the most useful verbs for everyday self-expression, grouped by theme.",
  count: 40,
  updatedAt: '2026-05-12',
  sections: [
    {
      title: 'Actions du quotidien',
      titleEn: 'Everyday actions',
      entries: [
        { hanzi: '是', pinyin: 'shì', translationFr: 'être', translationEn: 'to be' },
        { hanzi: '有', pinyin: 'yǒu', translationFr: 'avoir', translationEn: 'to have' },
        { hanzi: '做', pinyin: 'zuò', translationFr: 'faire', translationEn: 'to do' },
        { hanzi: '吃', pinyin: 'chī', translationFr: 'manger', translationEn: 'to eat' },
        { hanzi: '喝', pinyin: 'hē', translationFr: 'boire', translationEn: 'to drink' },
        { hanzi: '睡觉', pinyin: 'shuìjiào', translationFr: 'dormir', translationEn: 'to sleep' },
        { hanzi: '工作', pinyin: 'gōngzuò', translationFr: 'travailler', translationEn: 'to work' },
        { hanzi: '学习', pinyin: 'xuéxí', translationFr: 'étudier', translationEn: 'to study' },
        { hanzi: '买', pinyin: 'mǎi', translationFr: 'acheter', translationEn: 'to buy' },
        { hanzi: '卖', pinyin: 'mài', translationFr: 'vendre', translationEn: 'to sell' }
      ]
    },
    {
      title: 'Déplacement',
      titleEn: 'Movement',
      entries: [
        { hanzi: '去', pinyin: 'qù', translationFr: 'aller', translationEn: 'to go' },
        { hanzi: '来', pinyin: 'lái', translationFr: 'venir', translationEn: 'to come' },
        { hanzi: '走', pinyin: 'zǒu', translationFr: 'marcher / partir', translationEn: 'to walk / to leave' },
        { hanzi: '跑', pinyin: 'pǎo', translationFr: 'courir', translationEn: 'to run' },
        { hanzi: '坐', pinyin: 'zuò', translationFr: "s'asseoir / prendre (transport)", translationEn: 'to sit / to take (transport)' },
        { hanzi: '站', pinyin: 'zhàn', translationFr: 'se tenir debout', translationEn: 'to stand' },
        { hanzi: '回', pinyin: 'huí', translationFr: 'retourner', translationEn: 'to return' },
        { hanzi: '到', pinyin: 'dào', translationFr: 'arriver', translationEn: 'to arrive' },
        { hanzi: '开车', pinyin: 'kāichē', translationFr: 'conduire', translationEn: 'to drive' },
        { hanzi: '飞', pinyin: 'fēi', translationFr: 'voler', translationEn: 'to fly' }
      ]
    },
    {
      title: 'Communication et perception',
      titleEn: 'Communication and perception',
      entries: [
        { hanzi: '说', pinyin: 'shuō', translationFr: 'dire / parler', translationEn: 'to say / to speak' },
        { hanzi: '听', pinyin: 'tīng', translationFr: 'écouter', translationEn: 'to listen' },
        { hanzi: '看', pinyin: 'kàn', translationFr: 'regarder / lire', translationEn: 'to look / to read' },
        { hanzi: '读', pinyin: 'dú', translationFr: 'lire', translationEn: 'to read' },
        { hanzi: '写', pinyin: 'xiě', translationFr: 'écrire', translationEn: 'to write' },
        { hanzi: '叫', pinyin: 'jiào', translationFr: "s'appeler / appeler", translationEn: 'to be called / to call' },
        { hanzi: '问', pinyin: 'wèn', translationFr: 'demander', translationEn: 'to ask' },
        { hanzi: '回答', pinyin: 'huídá', translationFr: 'répondre', translationEn: 'to answer' },
        { hanzi: '知道', pinyin: 'zhīdào', translationFr: 'savoir', translationEn: 'to know' },
        { hanzi: '认识', pinyin: 'rènshi', translationFr: 'connaître', translationEn: 'to be acquainted with' }
      ]
    },
    {
      title: 'Sentiments et préférences',
      titleEn: 'Feelings and preferences',
      entries: [
        { hanzi: '喜欢', pinyin: 'xǐhuan', translationFr: 'aimer', translationEn: 'to like' },
        { hanzi: '爱', pinyin: 'ài', translationFr: 'aimer (fort)', translationEn: 'to love (strong)' },
        { hanzi: '想', pinyin: 'xiǎng', translationFr: 'penser / vouloir', translationEn: 'to think / to want' },
        { hanzi: '要', pinyin: 'yào', translationFr: 'vouloir / falloir', translationEn: 'to want / must' },
        { hanzi: '怕', pinyin: 'pà', translationFr: 'avoir peur', translationEn: 'to be afraid' },
        { hanzi: '希望', pinyin: 'xīwàng', translationFr: 'espérer', translationEn: 'to hope' },
        { hanzi: '相信', pinyin: 'xiāngxìn', translationFr: 'croire', translationEn: 'to believe' },
        { hanzi: '觉得', pinyin: 'juéde', translationFr: 'trouver / penser', translationEn: 'to find / to think' },
        { hanzi: '高兴', pinyin: 'gāoxìng', translationFr: 'être content', translationEn: 'to be happy' },
        { hanzi: '累', pinyin: 'lèi', translationFr: 'être fatigué', translationEn: 'to be tired' }
      ]
    }
  ]
};

const WORDS_LIST: LearningContent = {
  slug: '100-mots-utiles',
  type: 'liste',
  status: 'published',
  kicker: 'VOCABULAIRE',
  kickerEn: 'VOCABULARY',
  title: 'Les mots mandarin les plus utiles (avec audio)',
  titleEn: 'The most useful Mandarin words (with audio)',
  shortDescription:
    'Vocabulaire essentiel pour démarrer : pronoms, lieux, temps, nourriture, sentiments. Le minimum pour tenir une conversation basique.',
  shortDescriptionEn:
    'Essential starter vocabulary: pronouns, places, time, food, feelings. The minimum to hold a basic conversation.',
  count: 40,
  updatedAt: '2026-05-12',
  sections: [
    {
      title: 'Pronoms et personnes',
      titleEn: 'Pronouns and people',
      entries: [
        { hanzi: '我', pinyin: 'wǒ', translationFr: 'je / moi', translationEn: 'I / me' },
        { hanzi: '你', pinyin: 'nǐ', translationFr: 'tu / toi', translationEn: 'you' },
        { hanzi: '他', pinyin: 'tā', translationFr: 'il', translationEn: 'he' },
        { hanzi: '她', pinyin: 'tā', translationFr: 'elle', translationEn: 'she' },
        { hanzi: '我们', pinyin: 'wǒmen', translationFr: 'nous', translationEn: 'we' },
        { hanzi: '你们', pinyin: 'nǐmen', translationFr: 'vous (pluriel)', translationEn: 'you (plural)' },
        { hanzi: '他们', pinyin: 'tāmen', translationFr: 'ils / elles', translationEn: 'they' },
        { hanzi: '朋友', pinyin: 'péngyou', translationFr: 'ami', translationEn: 'friend' },
        { hanzi: '人', pinyin: 'rén', translationFr: 'personne', translationEn: 'person' },
        { hanzi: '老师', pinyin: 'lǎoshī', translationFr: 'professeur', translationEn: 'teacher' }
      ]
    },
    {
      title: 'Lieux',
      titleEn: 'Places',
      entries: [
        { hanzi: '家', pinyin: 'jiā', translationFr: 'maison', translationEn: 'home' },
        { hanzi: '学校', pinyin: 'xuéxiào', translationFr: 'école', translationEn: 'school' },
        { hanzi: '公司', pinyin: 'gōngsī', translationFr: 'entreprise', translationEn: 'company' },
        { hanzi: '商店', pinyin: 'shāngdiàn', translationFr: 'magasin', translationEn: 'shop' },
        { hanzi: '餐厅', pinyin: 'cāntīng', translationFr: 'restaurant', translationEn: 'restaurant' },
        { hanzi: '医院', pinyin: 'yīyuàn', translationFr: 'hôpital', translationEn: 'hospital' },
        { hanzi: '火车站', pinyin: 'huǒchēzhàn', translationFr: 'gare', translationEn: 'train station' },
        { hanzi: '机场', pinyin: 'jīchǎng', translationFr: 'aéroport', translationEn: 'airport' },
        { hanzi: '中国', pinyin: 'Zhōngguó', translationFr: 'Chine', translationEn: 'China' },
        { hanzi: '城市', pinyin: 'chéngshì', translationFr: 'ville', translationEn: 'city' }
      ]
    },
    {
      title: 'Nourriture et boisson',
      titleEn: 'Food and drink',
      entries: [
        { hanzi: '水', pinyin: 'shuǐ', translationFr: 'eau', translationEn: 'water' },
        { hanzi: '茶', pinyin: 'chá', translationFr: 'thé', translationEn: 'tea' },
        { hanzi: '咖啡', pinyin: 'kāfēi', translationFr: 'café', translationEn: 'coffee' },
        { hanzi: '米饭', pinyin: 'mǐfàn', translationFr: 'riz cuit', translationEn: 'cooked rice' },
        { hanzi: '面条', pinyin: 'miàntiáo', translationFr: 'nouilles', translationEn: 'noodles' },
        { hanzi: '面包', pinyin: 'miànbāo', translationFr: 'pain', translationEn: 'bread' },
        { hanzi: '肉', pinyin: 'ròu', translationFr: 'viande', translationEn: 'meat' },
        { hanzi: '鱼', pinyin: 'yú', translationFr: 'poisson', translationEn: 'fish' },
        { hanzi: '蔬菜', pinyin: 'shūcài', translationFr: 'légumes', translationEn: 'vegetables' },
        { hanzi: '水果', pinyin: 'shuǐguǒ', translationFr: 'fruits', translationEn: 'fruit' }
      ]
    },
    {
      title: 'Adjectifs essentiels',
      titleEn: 'Essential adjectives',
      entries: [
        { hanzi: '好', pinyin: 'hǎo', translationFr: 'bon / bien', translationEn: 'good / well' },
        { hanzi: '大', pinyin: 'dà', translationFr: 'grand', translationEn: 'big' },
        { hanzi: '小', pinyin: 'xiǎo', translationFr: 'petit', translationEn: 'small' },
        { hanzi: '多', pinyin: 'duō', translationFr: 'beaucoup', translationEn: 'many' },
        { hanzi: '少', pinyin: 'shǎo', translationFr: 'peu', translationEn: 'few' },
        { hanzi: '新', pinyin: 'xīn', translationFr: 'nouveau', translationEn: 'new' },
        { hanzi: '老', pinyin: 'lǎo', translationFr: 'vieux', translationEn: 'old' },
        { hanzi: '快', pinyin: 'kuài', translationFr: 'rapide', translationEn: 'fast' },
        { hanzi: '慢', pinyin: 'màn', translationFr: 'lent', translationEn: 'slow' },
        { hanzi: '漂亮', pinyin: 'piàoliang', translationFr: 'joli', translationEn: 'pretty' }
      ]
    }
  ]
};

const FAMILY_LIST: LearningContent = {
  slug: 'la-famille',
  type: 'liste',
  status: 'published',
  kicker: 'VOCABULAIRE',
  kickerEn: 'VOCABULARY',
  title: 'La famille en mandarin (vocabulaire complet avec audio)',
  titleEn: 'Family in Mandarin (complete vocabulary with audio)',
  shortDescription:
    "Tout le vocabulaire de la famille : parents, frères, sœurs, grands-parents, oncles, tantes — incluant les distinctions paternel/maternel propres au chinois.",
  shortDescriptionEn:
    'All family vocabulary: parents, siblings, grandparents, uncles, aunts — including the paternal/maternal distinctions specific to Chinese.',
  longDescription:
    "Le mandarin distingue précisément les liens familiaux du côté paternel et maternel — bien plus que les langues occidentales. Un oncle paternel n'a pas le même mot qu'un oncle maternel. Voici le vocabulaire complet, des proches aux beaux-parents.",
  longDescriptionEn:
    "Mandarin precisely distinguishes paternal and maternal family ties — much more than Western languages. A paternal uncle isn't the same word as a maternal uncle. Here's the complete vocabulary, from close relatives to in-laws.",
  count: 24,
  updatedAt: '2026-05-12',
  sections: [
    {
      title: 'La famille proche',
      titleEn: 'Close family',
      entries: [
        { hanzi: '爸爸', pinyin: 'bàba', translationFr: 'papa', translationEn: 'dad' },
        { hanzi: '妈妈', pinyin: 'māma', translationFr: 'maman', translationEn: 'mom' },
        { hanzi: '父亲', pinyin: 'fùqīn', translationFr: 'père (formel)', translationEn: 'father (formal)' },
        { hanzi: '母亲', pinyin: 'mǔqīn', translationFr: 'mère (formel)', translationEn: 'mother (formal)' },
        { hanzi: '哥哥', pinyin: 'gēge', translationFr: 'grand frère', translationEn: 'older brother' },
        { hanzi: '弟弟', pinyin: 'dìdi', translationFr: 'petit frère', translationEn: 'younger brother' },
        { hanzi: '姐姐', pinyin: 'jiějie', translationFr: 'grande sœur', translationEn: 'older sister' },
        { hanzi: '妹妹', pinyin: 'mèimei', translationFr: 'petite sœur', translationEn: 'younger sister' }
      ]
    },
    {
      title: 'Grands-parents',
      titleEn: 'Grandparents',
      description: 'Le mandarin distingue côté paternel et côté maternel — pas d\'équivalent unique en français.',
      descriptionEn: 'Mandarin distinguishes paternal and maternal sides — no single English equivalent.',
      entries: [
        { hanzi: '爷爷', pinyin: 'yéye', translationFr: 'grand-père paternel', translationEn: 'paternal grandfather' },
        { hanzi: '奶奶', pinyin: 'nǎinai', translationFr: 'grand-mère paternelle', translationEn: 'paternal grandmother' },
        { hanzi: '外公', pinyin: 'wàigōng', translationFr: 'grand-père maternel', translationEn: 'maternal grandfather', gloss: '外 = "extérieur" (côté maternel)', glossEn: '外 = "outside" (maternal side)' },
        { hanzi: '外婆', pinyin: 'wàipó', translationFr: 'grand-mère maternelle', translationEn: 'maternal grandmother' }
      ]
    },
    {
      title: 'Oncles et tantes',
      titleEn: 'Uncles and aunts',
      entries: [
        { hanzi: '叔叔', pinyin: 'shūshu', translationFr: 'oncle paternel (frère cadet du père)', translationEn: 'paternal uncle (father\'s younger brother)' },
        { hanzi: '伯伯', pinyin: 'bóbo', translationFr: 'oncle paternel (frère aîné du père)', translationEn: 'paternal uncle (father\'s older brother)' },
        { hanzi: '舅舅', pinyin: 'jiùjiu', translationFr: 'oncle maternel', translationEn: 'maternal uncle' },
        { hanzi: '姑姑', pinyin: 'gūgu', translationFr: 'tante paternelle', translationEn: 'paternal aunt' },
        { hanzi: '阿姨', pinyin: 'āyí', translationFr: 'tante maternelle', translationEn: 'maternal aunt' }
      ]
    },
    {
      title: 'Couple et enfants',
      titleEn: 'Couple and children',
      entries: [
        { hanzi: '丈夫', pinyin: 'zhàngfu', translationFr: 'mari', translationEn: 'husband' },
        { hanzi: '妻子', pinyin: 'qīzi', translationFr: 'femme (épouse)', translationEn: 'wife' },
        { hanzi: '老公', pinyin: 'lǎogōng', translationFr: 'mari (familier)', translationEn: 'hubby (casual)' },
        { hanzi: '老婆', pinyin: 'lǎopó', translationFr: 'femme (familier)', translationEn: 'wifey (casual)' },
        { hanzi: '孩子', pinyin: 'háizi', translationFr: 'enfant', translationEn: 'child' },
        { hanzi: '儿子', pinyin: 'érzi', translationFr: 'fils', translationEn: 'son' },
        { hanzi: '女儿', pinyin: 'nǚ\'ér', translationFr: 'fille', translationEn: 'daughter' }
      ]
    }
  ]
};

// ============================================================================
//  EXPORT — guides en premier (alternés avec listes dans l'UI)
// ============================================================================

export const LEARNING_CONTENT: LearningContent[] = [
  PINYIN_GUIDE,
  NIHAO_GUIDE,
  XIEXIE_GUIDE,
  ZAIJIAN_GUIDE,
  SORRY_GUIDE,
  LOVE_GUIDE,
  NUMBERS_LIST,
  DAYS_LIST,
  COLORS_LIST,
  VERBS_LIST,
  WORDS_LIST,
  FAMILY_LIST
];

export const getLearningContent = (slug: string): LearningContent | undefined =>
  LEARNING_CONTENT.find((c) => c.slug === slug);
