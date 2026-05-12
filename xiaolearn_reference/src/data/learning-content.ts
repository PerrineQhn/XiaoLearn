/**
 * learning-content.ts — Catalogue des guides + listes Apprendre
 * --------------------------------------------------------------
 * Inspiré de seonsaengnim.com/apprendre : 2 types de contenus pédagogiques :
 *
 *   GUIDE : article focalisé sur une notion (alphabet, salutation, etc.)
 *           Card visuelle avec gros hanzi + transcription pinyin.
 *
 *   LISTE : catalogue de mots/expressions sur un thème (100 verbes, jours,
 *           couleurs, etc.) — card avec gros nombre + label "MOTS".
 *
 * Chaque entrée a un `status` :
 *   - 'published' : pages détaillées disponibles (le `slug` ouvre la page).
 *   - 'soon'      : carte affichée avec badge "En préparation", clic vers
 *                   formulaire d'abonnement.
 *
 * Le contenu détaillé (sections + entrées) est inline pour les pages
 * publiées. Toutes les entrées dictionnaire pointent vers la fiche
 * `/dictionnaire/{hsk_id}` quand disponible.
 */

export type LearningContentType = 'guide' | 'liste';
export type LearningContentStatus = 'published' | 'soon';

export interface LearningEntry {
  /** Hanzi à afficher en gras à gauche. */
  hanzi: string;
  pinyin: string;
  translationFr: string;
  /** Glossage entre parenthèses (étymologie, sens littéral) — optionnel. */
  gloss?: string;
  /** ID dictionnaire si disponible (ex. 'hsk1-1') pour lien fiche. */
  dictId?: string;
}

export interface LearningSection {
  title: string;
  description?: string;
  entries: LearningEntry[];
}

export interface LearningContent {
  slug: string;
  type: LearningContentType;
  status: LearningContentStatus;
  /** Catégorie en majuscules affichée au-dessus du titre (ex. CALENDRIER, ALPHABET). */
  kicker: string;
  title: string;
  /** Court résumé pour la card du hub. */
  shortDescription: string;
  /** Lead complet (long-form) pour la page individuelle. */
  longDescription?: string;
  /** Hanzi vedette affiché en grand sur la card GUIDE. */
  featuredHanzi?: string;
  featuredPinyin?: string;
  /** Pour LISTE, nombre d'éléments affiché en grand sur la card. */
  count?: number;
  /** Date "Mis à jour le ..." */
  updatedAt: string;
  sections?: LearningSection[];
}

// ============================================================================
//  CONTENU PUBLIÉ — guides + listes avec entrées réelles
// ============================================================================

const PINYIN_GUIDE: LearningContent = {
  slug: 'pinyin',
  type: 'guide',
  status: 'published',
  kicker: 'ALPHABET',
  title: "Le pinyin : guide pour lire le mandarin sans détour",
  shortDescription:
    "Le système de transcription phonétique du chinois : 21 initiales, 6 voyelles, 4 tons. La base pour lire et prononcer.",
  longDescription:
    "Le pinyin est le système officiel de romanisation du mandarin standard. Il transcrit la prononciation des hanzi avec l'alphabet latin et 4 marques tonales. Maîtriser le pinyin, c'est la fondation absolue pour apprendre à parler et à lire le chinois.",
  featuredHanzi: '拼音',
  featuredPinyin: 'pīnyīn',
  updatedAt: '2026-05-12',
  sections: [
    {
      title: 'Les 4 tons',
      description:
        'Le mandarin est tonal : la même syllabe change de sens selon la mélodie. Le ton se note par un accent au-dessus de la voyelle principale.',
      entries: [
        { hanzi: 'mā', pinyin: '1er ton — plat haut', translationFr: 'maman (妈)', gloss: 'mélodie aiguë et stable' },
        { hanzi: 'má', pinyin: '2e ton — montant', translationFr: 'chanvre (麻)', gloss: 'comme une question : "quoi ?"' },
        { hanzi: 'mǎ', pinyin: '3e ton — descendant-montant', translationFr: 'cheval (马)', gloss: 'creux puis remontée' },
        { hanzi: 'mà', pinyin: '4e ton — descendant', translationFr: 'gronder (骂)', gloss: 'sec et tombant, comme un ordre' },
        { hanzi: 'ma', pinyin: 'neutre (sans ton)', translationFr: 'particule', gloss: 'rapide et faible, comme un suffixe' }
      ]
    },
    {
      title: 'Les initiales courantes',
      description:
        'Les sons de début de syllabe. Certaines sont proches du français, d\'autres demandent un peu d\'entraînement.',
      entries: [
        { hanzi: 'b / p', pinyin: 'b non aspiré · p aspiré', translationFr: 'bā / pā', gloss: 'p français = b chinois ; p chinois = expulsion d\'air forte' },
        { hanzi: 'd / t', pinyin: 'd non aspiré · t aspiré', translationFr: 'dē / tē', gloss: 'pareil : la différence est le souffle' },
        { hanzi: 'j / q', pinyin: 'j doux · q aspiré', translationFr: 'jī / qī', gloss: 'langue plate contre le palais' },
        { hanzi: 'zh / ch', pinyin: 'zh non aspiré · ch aspiré', translationFr: 'zhī / chī', gloss: 'langue recourbée (rétroflexe)' },
        { hanzi: 'x', pinyin: 'son du fond de la bouche', translationFr: 'xī', gloss: 'entre "si" français et "chi"' },
        { hanzi: 'r', pinyin: 'r français ≠ r chinois', translationFr: 'rì', gloss: 'plutôt comme un "j" anglais (jam)' }
      ]
    },
    {
      title: 'Les finales avec voyelles',
      description:
        'Les voyelles seules ou combinées qui forment la fin de la syllabe.',
      entries: [
        { hanzi: 'a', pinyin: 'comme "ah"', translationFr: 'mā 妈' },
        { hanzi: 'o', pinyin: 'comme "ow" anglais', translationFr: 'wǒ 我' },
        { hanzi: 'e', pinyin: 'comme "eu" français', translationFr: 'hē 喝' },
        { hanzi: 'i', pinyin: 'comme "ee" sauf après zh/ch/sh/r/z/c/s', translationFr: 'nǐ 你' },
        { hanzi: 'u', pinyin: 'comme "ou" français', translationFr: 'bù 不' },
        { hanzi: 'ü', pinyin: 'comme "u" français', translationFr: 'nǚ 女', gloss: 'écrit "u" après j/q/x/y' }
      ]
    }
  ]
};

const NIHAO_GUIDE: LearningContent = {
  slug: 'dire-bonjour',
  type: 'guide',
  status: 'published',
  kicker: 'SALUTATION',
  title: "Comment dire bonjour en chinois : 你好, 您好 et toutes les variantes",
  shortDescription:
    "Le guide complet pour dire bonjour en mandarin : 你好 (standard), 您好 (formel), 早 (matin) et toutes les variantes selon le moment et le contexte.",
  longDescription:
    "Dire bonjour en chinois ne se résume pas à 你好 (nǐ hǎo). Selon le moment de la journée, le degré de formalité et la situation, le mandarin offre toute une palette de salutations. Voici les expressions à connaître pour saluer comme un natif.",
  featuredHanzi: '你好',
  featuredPinyin: 'nǐ hǎo',
  updatedAt: '2026-05-12',
  sections: [
    {
      title: 'Les salutations universelles',
      description:
        'À utiliser partout, à n\'importe quel moment de la journée. Le standard absolu.',
      entries: [
        { hanzi: '你好', pinyin: 'nǐ hǎo', translationFr: 'bonjour (standard)', gloss: 'littéralement "tu bien" — la salutation par défaut' },
        { hanzi: '您好', pinyin: 'nín hǎo', translationFr: 'bonjour (formel)', gloss: '您 est le "vous" de politesse, à utiliser avec des aînés ou en contexte pro' },
        { hanzi: '你们好', pinyin: 'nǐmen hǎo', translationFr: 'bonjour (à plusieurs)', gloss: 'pour saluer un groupe' },
        { hanzi: '大家好', pinyin: 'dàjiā hǎo', translationFr: 'bonjour à tous', gloss: 'pour s\'adresser à une assemblée' }
      ]
    },
    {
      title: 'Selon le moment de la journée',
      description:
        'Plus chaleureux et précis que 你好, surtout utilisé dans des contextes amicaux ou matinaux.',
      entries: [
        { hanzi: '早', pinyin: 'zǎo', translationFr: 'bonjour (le matin)', gloss: 'forme courte et amicale' },
        { hanzi: '早上好', pinyin: 'zǎoshang hǎo', translationFr: 'bonjour (le matin)', gloss: 'forme complète, plus formelle' },
        { hanzi: '中午好', pinyin: 'zhōngwǔ hǎo', translationFr: 'bonjour (vers midi)', gloss: 'peu utilisé à l\'oral, plus en écrit' },
        { hanzi: '下午好', pinyin: 'xiàwǔ hǎo', translationFr: 'bon après-midi', gloss: 'plutôt formel' },
        { hanzi: '晚上好', pinyin: 'wǎnshang hǎo', translationFr: 'bonsoir', gloss: 'à partir de 18h environ' }
      ]
    },
    {
      title: 'Salutations informelles entre amis',
      entries: [
        { hanzi: '嗨', pinyin: 'hāi', translationFr: 'salut (très informel)', gloss: 'emprunt à l\'anglais "hi"' },
        { hanzi: '嘿', pinyin: 'hēi', translationFr: 'hé !', gloss: 'plutôt pour attirer l\'attention' },
        { hanzi: '吃了吗', pinyin: 'chī le ma', translationFr: 'tu as mangé ?', gloss: 'salutation traditionnelle, équivalent à "ça va ?"' },
        { hanzi: '最近怎么样', pinyin: 'zuìjìn zěnmeyàng', translationFr: 'comment ça va ces derniers temps ?', gloss: 'salutation amicale élaborée' }
      ]
    }
  ]
};

const XIEXIE_GUIDE: LearningContent = {
  slug: 'dire-merci',
  type: 'guide',
  status: 'published',
  kicker: 'POLITESSE',
  title: "Comment dire merci en chinois : 谢谢, 多谢 et toutes les variantes",
  shortDescription:
    "Le guide complet pour dire merci en mandarin : 谢谢 (standard), 多谢 (poli), 太感谢了 (très chaleureux) et les formules selon le contexte.",
  longDescription:
    "Au-delà du classique 谢谢, le mandarin offre plusieurs façons d'exprimer la gratitude. Du simple 谢 amical au formel 非常感谢 d'un courrier professionnel, voici les formules à connaître.",
  featuredHanzi: '谢谢',
  featuredPinyin: 'xièxie',
  updatedAt: '2026-05-12',
  sections: [
    {
      title: 'Les formules courantes',
      entries: [
        { hanzi: '谢谢', pinyin: 'xièxie', translationFr: 'merci', gloss: 'standard absolu, à utiliser partout' },
        { hanzi: '谢谢你', pinyin: 'xièxie nǐ', translationFr: 'merci à toi', gloss: 'plus personnalisé' },
        { hanzi: '谢谢您', pinyin: 'xièxie nín', translationFr: 'merci (poli)', gloss: 'pour les aînés ou en pro' },
        { hanzi: '多谢', pinyin: 'duō xiè', translationFr: 'merci beaucoup', gloss: 'littéralement "beaucoup remercier"' }
      ]
    },
    {
      title: 'Pour exprimer une forte gratitude',
      entries: [
        { hanzi: '非常感谢', pinyin: 'fēicháng gǎnxiè', translationFr: 'merci infiniment', gloss: 'formel, courriers et discours' },
        { hanzi: '太感谢了', pinyin: 'tài gǎnxiè le', translationFr: 'merci énormément !', gloss: 'chaleureux, oral' },
        { hanzi: '麻烦你了', pinyin: 'máfan nǐ le', translationFr: 'merci de t\'être donné cette peine', gloss: 'reconnait l\'effort de l\'autre' },
        { hanzi: '辛苦了', pinyin: 'xīnkǔ le', translationFr: 'merci pour ton dur travail', gloss: 'collègues, équipiers' }
      ]
    },
    {
      title: 'Répondre à un merci',
      entries: [
        { hanzi: '不客气', pinyin: 'bú kèqi', translationFr: 'de rien', gloss: 'littéralement "ne sois pas poli"' },
        { hanzi: '不用谢', pinyin: 'bú yòng xiè', translationFr: 'pas besoin de remercier', gloss: 'décontracté' },
        { hanzi: '没事', pinyin: 'méi shì', translationFr: 'ce n\'est rien', gloss: 'oral, amical' },
        { hanzi: '应该的', pinyin: 'yīnggāi de', translationFr: 'c\'était normal', gloss: 'modeste, courant' }
      ]
    }
  ]
};

const NUMBERS_LIST: LearningContent = {
  slug: 'compter-1-a-100',
  type: 'liste',
  status: 'published',
  kicker: 'NOMBRES',
  title: "Compter en mandarin de 1 à 100 (avec audio)",
  shortDescription:
    "Tous les nombres mandarin de 1 à 100. Construction décimale ultra-régulière : une fois 1-10 et les dizaines, tu peux tout dire.",
  longDescription:
    "Le système numérique chinois est l'un des plus simples au monde. Une fois maîtrisés les 1-10 et les dizaines, n'importe quel nombre se construit par juxtaposition. 21 = 二十一 (deux-dix-un). Aucune exception comme \"quatre-vingt-dix\" en français.",
  count: 100,
  updatedAt: '2026-05-12',
  sections: [
    {
      title: 'De 0 à 10',
      description:
        'La base indispensable. À apprendre par cœur — tout le reste s\'en déduit.',
      entries: [
        { hanzi: '零', pinyin: 'líng', translationFr: 'zéro' },
        { hanzi: '一', pinyin: 'yī', translationFr: 'un' },
        { hanzi: '二', pinyin: 'èr', translationFr: 'deux' },
        { hanzi: '三', pinyin: 'sān', translationFr: 'trois' },
        { hanzi: '四', pinyin: 'sì', translationFr: 'quatre' },
        { hanzi: '五', pinyin: 'wǔ', translationFr: 'cinq' },
        { hanzi: '六', pinyin: 'liù', translationFr: 'six' },
        { hanzi: '七', pinyin: 'qī', translationFr: 'sept' },
        { hanzi: '八', pinyin: 'bā', translationFr: 'huit' },
        { hanzi: '九', pinyin: 'jiǔ', translationFr: 'neuf' },
        { hanzi: '十', pinyin: 'shí', translationFr: 'dix' }
      ]
    },
    {
      title: 'Les dizaines',
      description:
        'Structure : nombre + 十. Vingt = "deux-dix", trente = "trois-dix", etc.',
      entries: [
        { hanzi: '十', pinyin: 'shí', translationFr: '10' },
        { hanzi: '二十', pinyin: 'èr shí', translationFr: '20', gloss: 'deux × dix' },
        { hanzi: '三十', pinyin: 'sān shí', translationFr: '30' },
        { hanzi: '四十', pinyin: 'sì shí', translationFr: '40' },
        { hanzi: '五十', pinyin: 'wǔ shí', translationFr: '50' },
        { hanzi: '六十', pinyin: 'liù shí', translationFr: '60' },
        { hanzi: '七十', pinyin: 'qī shí', translationFr: '70' },
        { hanzi: '八十', pinyin: 'bā shí', translationFr: '80' },
        { hanzi: '九十', pinyin: 'jiǔ shí', translationFr: '90' },
        { hanzi: '一百', pinyin: 'yī bǎi', translationFr: '100', gloss: '百 = cent' }
      ]
    },
    {
      title: 'Construire les nombres composés',
      description:
        'Pour 11-99 : dizaine + unité. Quarante-deux = 四十二 (quatre-dix-deux). Aucune exception.',
      entries: [
        { hanzi: '十一', pinyin: 'shí yī', translationFr: '11', gloss: 'dix-un' },
        { hanzi: '十五', pinyin: 'shí wǔ', translationFr: '15' },
        { hanzi: '二十一', pinyin: 'èr shí yī', translationFr: '21', gloss: 'deux-dix-un' },
        { hanzi: '三十三', pinyin: 'sān shí sān', translationFr: '33' },
        { hanzi: '四十二', pinyin: 'sì shí èr', translationFr: '42' },
        { hanzi: '五十五', pinyin: 'wǔ shí wǔ', translationFr: '55' },
        { hanzi: '六十八', pinyin: 'liù shí bā', translationFr: '68' },
        { hanzi: '七十七', pinyin: 'qī shí qī', translationFr: '77' },
        { hanzi: '八十九', pinyin: 'bā shí jiǔ', translationFr: '89' },
        { hanzi: '九十九', pinyin: 'jiǔ shí jiǔ', translationFr: '99' }
      ]
    }
  ]
};

const DAYS_LIST: LearningContent = {
  slug: 'jours-mois-dates',
  type: 'liste',
  status: 'published',
  kicker: 'CALENDRIER',
  title: "Les jours, mois et dates en mandarin (avec audio)",
  shortDescription:
    "Tout le calendrier en chinois : 7 jours de la semaine, 12 mois, repères temporels (hier, demain, semaine prochaine), avec audio natif.",
  longDescription:
    "Le calendrier mandarin est ultra-logique : les mois utilisent les nombres (一月 = janvier, 五月 = mai) et les jours de la semaine se forment avec 星期 + nombre. Voici les repères temporels du quotidien à maîtriser.",
  count: 30,
  updatedAt: '2026-05-12',
  sections: [
    {
      title: 'Les jours de la semaine',
      description:
        'Structure : 星期 (xīngqī, semaine) + numéro. Le dimanche est l\'exception avec 天/日 au lieu de 7.',
      entries: [
        { hanzi: '星期一', pinyin: 'xīngqī yī', translationFr: 'lundi', gloss: 'semaine-un' },
        { hanzi: '星期二', pinyin: 'xīngqī èr', translationFr: 'mardi' },
        { hanzi: '星期三', pinyin: 'xīngqī sān', translationFr: 'mercredi' },
        { hanzi: '星期四', pinyin: 'xīngqī sì', translationFr: 'jeudi' },
        { hanzi: '星期五', pinyin: 'xīngqī wǔ', translationFr: 'vendredi' },
        { hanzi: '星期六', pinyin: 'xīngqī liù', translationFr: 'samedi' },
        { hanzi: '星期天', pinyin: 'xīngqī tiān', translationFr: 'dimanche', gloss: 'semaine-ciel' },
        { hanzi: '周末', pinyin: 'zhōumò', translationFr: 'week-end' }
      ]
    },
    {
      title: 'Les douze mois',
      description: 'Structure : numéro + 月 (yuè, lune/mois). Pas d\'exception.',
      entries: [
        { hanzi: '一月', pinyin: 'yī yuè', translationFr: 'janvier' },
        { hanzi: '二月', pinyin: 'èr yuè', translationFr: 'février' },
        { hanzi: '三月', pinyin: 'sān yuè', translationFr: 'mars' },
        { hanzi: '四月', pinyin: 'sì yuè', translationFr: 'avril' },
        { hanzi: '五月', pinyin: 'wǔ yuè', translationFr: 'mai' },
        { hanzi: '六月', pinyin: 'liù yuè', translationFr: 'juin' },
        { hanzi: '七月', pinyin: 'qī yuè', translationFr: 'juillet' },
        { hanzi: '八月', pinyin: 'bā yuè', translationFr: 'août' },
        { hanzi: '九月', pinyin: 'jiǔ yuè', translationFr: 'septembre' },
        { hanzi: '十月', pinyin: 'shí yuè', translationFr: 'octobre' },
        { hanzi: '十一月', pinyin: 'shí yī yuè', translationFr: 'novembre' },
        { hanzi: '十二月', pinyin: 'shí èr yuè', translationFr: 'décembre' }
      ]
    },
    {
      title: 'Hier, aujourd\'hui, demain',
      entries: [
        { hanzi: '今天', pinyin: 'jīntiān', translationFr: "aujourd'hui" },
        { hanzi: '昨天', pinyin: 'zuótiān', translationFr: 'hier' },
        { hanzi: '明天', pinyin: 'míngtiān', translationFr: 'demain' },
        { hanzi: '前天', pinyin: 'qiántiān', translationFr: 'avant-hier' },
        { hanzi: '后天', pinyin: 'hòutiān', translationFr: 'après-demain' },
        { hanzi: '这个星期', pinyin: 'zhège xīngqī', translationFr: 'cette semaine' },
        { hanzi: '上个星期', pinyin: 'shàng ge xīngqī', translationFr: 'la semaine dernière' },
        { hanzi: '下个星期', pinyin: 'xià ge xīngqī', translationFr: 'la semaine prochaine' },
        { hanzi: '这个月', pinyin: 'zhège yuè', translationFr: 'ce mois-ci' },
        { hanzi: '今年', pinyin: 'jīnnián', translationFr: 'cette année' }
      ]
    }
  ]
};

const COLORS_LIST: LearningContent = {
  slug: 'les-couleurs',
  type: 'liste',
  status: 'published',
  kicker: 'VOCABULAIRE',
  title: "Les couleurs en mandarin (noms, adjectifs et nuances)",
  shortDescription:
    "Toutes les couleurs courantes en mandarin avec leur nom (色) et leur emploi comme adjectif. Plus les nuances de la culture chinoise (rouge porte-bonheur, jaune impérial).",
  count: 18,
  updatedAt: '2026-05-12',
  sections: [
    {
      title: 'Les couleurs primaires',
      description: 'Structure : nom + 色 (sè, couleur). Pour l\'adjectif, on retire souvent 色.',
      entries: [
        { hanzi: '红色', pinyin: 'hóngsè', translationFr: 'rouge', gloss: 'couleur du bonheur et de la chance' },
        { hanzi: '蓝色', pinyin: 'lánsè', translationFr: 'bleu' },
        { hanzi: '黄色', pinyin: 'huángsè', translationFr: 'jaune', gloss: 'couleur impériale historique' },
        { hanzi: '绿色', pinyin: 'lǜsè', translationFr: 'vert' },
        { hanzi: '白色', pinyin: 'báisè', translationFr: 'blanc', gloss: 'couleur du deuil dans la culture traditionnelle' },
        { hanzi: '黑色', pinyin: 'hēisè', translationFr: 'noir' }
      ]
    },
    {
      title: 'Couleurs secondaires',
      entries: [
        { hanzi: '橙色', pinyin: 'chéngsè', translationFr: 'orange' },
        { hanzi: '紫色', pinyin: 'zǐsè', translationFr: 'violet' },
        { hanzi: '粉色', pinyin: 'fěnsè', translationFr: 'rose' },
        { hanzi: '灰色', pinyin: 'huīsè', translationFr: 'gris' },
        { hanzi: '棕色', pinyin: 'zōngsè', translationFr: 'marron' },
        { hanzi: '金色', pinyin: 'jīnsè', translationFr: 'doré' },
        { hanzi: '银色', pinyin: 'yínsè', translationFr: 'argenté' }
      ]
    },
    {
      title: 'Expressions courantes',
      entries: [
        { hanzi: '什么颜色', pinyin: 'shénme yánsè', translationFr: 'de quelle couleur ?' },
        { hanzi: '颜色', pinyin: 'yánsè', translationFr: 'couleur (le mot général)' },
        { hanzi: '浅色', pinyin: 'qiǎnsè', translationFr: 'couleur claire' },
        { hanzi: '深色', pinyin: 'shēnsè', translationFr: 'couleur foncée' },
        { hanzi: '彩色', pinyin: 'cǎisè', translationFr: 'multicolore, en couleur' }
      ]
    }
  ]
};

// ============================================================================
//  CONTENU À VENIR — cartes avec badge "En préparation"
// ============================================================================

const SOON_CONTENT: LearningContent[] = [
  {
    slug: 'dire-au-revoir',
    type: 'guide',
    status: 'soon',
    kicker: 'SALUTATION',
    title: "Comment dire au revoir en mandarin : 再见 et toutes les variantes",
    shortDescription:
      "再见, 拜拜, 回头见 — toutes les façons de prendre congé selon la formalité et le contexte.",
    featuredHanzi: '再见',
    featuredPinyin: 'zàijiàn',
    updatedAt: '2026-05-12'
  },
  {
    slug: 'sexcuser',
    type: 'guide',
    status: 'soon',
    kicker: 'POLITESSE',
    title: "Comment s'excuser en mandarin : 对不起 et toutes les nuances",
    shortDescription:
      "Du formel 对不起 au léger 不好意思, choisir le bon niveau d'excuse selon la situation.",
    featuredHanzi: '对不起',
    featuredPinyin: 'duìbuqǐ',
    updatedAt: '2026-05-12'
  },
  {
    slug: 'je-taime',
    type: 'guide',
    status: 'soon',
    kicker: 'SENTIMENTS',
    title: "Comment dire je t'aime en mandarin : 我爱你 et les nuances de l'amour",
    shortDescription:
      "La différence entre 我爱你 (déclaration forte), 我喜欢你 (j'aime bien), 我想你 (tu me manques) et les expressions du quotidien.",
    featuredHanzi: '我爱你',
    featuredPinyin: 'wǒ ài nǐ',
    updatedAt: '2026-05-12'
  },
  {
    slug: '100-verbes-essentiels',
    type: 'liste',
    status: 'soon',
    kicker: 'VOCABULAIRE',
    title: "Les 100 verbes mandarin essentiels (avec audio et conjugaison)",
    shortDescription:
      "Liste curée des 100 verbes mandarin à connaître absolument : déplacement, quotidien, communication, perception.",
    count: 100,
    updatedAt: '2026-05-12'
  },
  {
    slug: '100-mots-utiles',
    type: 'liste',
    status: 'soon',
    kicker: 'VOCABULAIRE',
    title: "Les 100 mots mandarin les plus utiles (avec audio)",
    shortDescription:
      "Liste curée des 100 mots mandarin les plus utiles pour démarrer : famille, temps, lieux, nourriture, sentiments.",
    count: 100,
    updatedAt: '2026-05-12'
  },
  {
    slug: 'la-famille',
    type: 'liste',
    status: 'soon',
    kicker: 'VOCABULAIRE',
    title: "La famille en mandarin (vocabulaire complet avec audio)",
    shortDescription:
      "Tout le vocabulaire de la famille : parents, frères, sœurs, grands-parents, oncles, tantes — incluant les distinctions paternel/maternel.",
    count: 35,
    updatedAt: '2026-05-12'
  }
];

// ============================================================================
//  EXPORT — tous les contenus rangés guides d'abord, listes ensuite
// ============================================================================

export const LEARNING_CONTENT: LearningContent[] = [
  PINYIN_GUIDE,
  NIHAO_GUIDE,
  XIEXIE_GUIDE,
  ...SOON_CONTENT.filter((c) => c.type === 'guide'),
  NUMBERS_LIST,
  DAYS_LIST,
  COLORS_LIST,
  ...SOON_CONTENT.filter((c) => c.type === 'liste')
];

export const getLearningContent = (slug: string): LearningContent | undefined =>
  LEARNING_CONTENT.find((c) => c.slug === slug);
