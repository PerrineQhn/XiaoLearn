/**
 * Données des sujets culturels
 * Contient les informations sur les festivals, superstitions, étiquette et traditions chinoises
 */

import type { CultureItem, CultureCategory } from '../types/culture';

export const cultureTopics: CultureItem[] = [
  // FESTIVALS
  {
    id: 'festival-spring',
    category: 'festivals',
    title: 'Nouvel An Chinois / Fête du Printemps',
    titleEn: 'Chinese New Year / Spring Festival',
    slug: 'spring-festival',
    icon: '🧧',
    difficulty: 'beginner',
    estimatedReadTime: 15,

    introduction: `Le Nouvel An Chinois, également appelé Fête du Printemps (春节 chūnjié), est la fête la plus importante du calendrier chinois. Elle marque le début de la nouvelle année lunaire et est célébrée par plus d'un milliard de personnes à travers le monde.`,

    introductionEn: `Chinese New Year, also called Spring Festival (春节 chūnjié), is the most important festival in the Chinese calendar. It marks the beginning of the lunar new year and is celebrated by over a billion people worldwide.`,

    sections: [
      {
        id: 'dates',
        title: 'Dates et Calendrier',
        titleEn: 'Dates and Calendar',
        content: `Contrairement au Nouvel An grégorien fixé au 1er janvier, le Nouvel An Chinois est mobile. Il tombe entre le 21 janvier et le 20 février, lors de la deuxième nouvelle lune après le solstice d'hiver. Les célébrations durent 15 jours, jusqu'à la Fête des Lanternes.`,
        contentEn: `Unlike the Gregorian New Year fixed on January 1st, Chinese New Year is movable. It falls between January 21 and February 20, during the second new moon after the winter solstice. Celebrations last 15 days, until the Lantern Festival.`,
        examples: [
          {
            hanzi: '春节快乐',
            pinyin: 'chūnjié kuàilè',
            translation: 'Happy Chinese New Year!',
            translationFr: 'Joyeux Nouvel An chinois !'
          },
          {
            hanzi: '新年快乐',
            pinyin: 'xīnnián kuàilè',
            translation: 'Happy New Year!',
            translationFr: 'Bonne année !'
          }
        ]
      },
      {
        id: 'traditions',
        title: 'Traditions Principales',
        titleEn: 'Main Traditions',
        content: `Les préparatifs commencent des semaines à l'avance avec le grand nettoyage de printemps (大扫除), symbolisant l'élimination de la malchance. On décore les maisons avec des couplets de printemps (春联) et le caractère 福 (bonheur) souvent placé à l'envers car "renversé" (倒 dào) sonne comme "arriver" (到 dào).`,
        contentEn: `Preparations begin weeks in advance with the spring cleaning (大扫除), symbolizing the removal of bad luck. Houses are decorated with spring couplets (春联) and the character 福 (happiness) often placed upside down because "upside down" (倒 dào) sounds like "arrive" (到 dào).`,
        examples: [
          {
            hanzi: '大扫除',
            pinyin: 'dàsǎochú',
            translation: 'spring cleaning',
            translationFr: 'grand nettoyage de printemps'
          },
          {
            hanzi: '贴春联',
            pinyin: 'tiē chūnlián',
            translation: 'paste spring couplets',
            translationFr: 'coller les couplets de printemps'
          }
        ]
      },
      {
        id: 'reunion-dinner',
        title: 'Le Repas du Réveillon',
        titleEn: 'Reunion Dinner',
        content: `Le repas de la veille du Nouvel An (年夜饭 niányèfàn) est le moment le plus important. Les familles se réunissent pour partager des plats symboliques : les raviolis (饺子) représentent la richesse, les nouilles longévité, et le poisson (鱼 yú) l'abondance car il se prononce comme "surplus" (余 yú).`,
        contentEn: `The New Year's Eve dinner (年夜饭 niányèfàn) is the most important moment. Families gather to share symbolic dishes: dumplings (饺子) represent wealth, noodles longevity, and fish (鱼 yú) abundance as it sounds like "surplus" (余 yú).`,
        examples: [
          {
            hanzi: '年夜饭',
            pinyin: 'niányèfàn',
            translation: "New Year's Eve dinner",
            translationFr: 'repas du réveillon'
          },
          {
            hanzi: '团圆',
            pinyin: 'tuányuán',
            translation: 'reunion',
            translationFr: 'réunion familiale'
          }
        ]
      },
      {
        id: 'red-envelopes',
        title: 'Les Enveloppes Rouges',
        titleEn: 'Red Envelopes',
        content: `Les hongbao (红包) sont des enveloppes rouges contenant de l'argent, données par les aînés aux enfants et aux jeunes non mariés. Les montants sont toujours des nombres pairs (sauf 4), généralement 8 ou multiples de 8 car ils portent chance.`,
        contentEn: `Hongbao (红包) are red envelopes containing money, given by elders to children and unmarried young people. Amounts are always even numbers (except 4), usually 8 or multiples of 8 as they bring good luck.`,
        examples: [
          {
            hanzi: '红包',
            pinyin: 'hóngbāo',
            translation: 'red envelope',
            translationFr: 'enveloppe rouge'
          },
          {
            hanzi: '压岁钱',
            pinyin: 'yāsuìqián',
            translation: 'New Year money',
            translationFr: 'argent du Nouvel An'
          }
        ]
      }
    ],

    culturalNotes: [
      {
        type: 'tip',
        content: `Le rouge est LA couleur du Nouvel An chinois. Il symbolise la chance et éloigne les mauvais esprits selon la légende du monstre Nian (年兽), qui craignait le bruit et la couleur rouge.`,
        contentEn: `Red is THE color of Chinese New Year. It symbolizes luck and wards off evil spirits according to the legend of the Nian monster (年兽), who feared noise and the color red.`
      },
      {
        type: 'warning',
        content: `Évitez d'offrir des montants se terminant par 4 (comme 40€) dans les hongbao car le chiffre 4 (四 sì) sonne comme "mort" (死 sǐ) en chinois.`,
        contentEn: `Avoid giving amounts ending in 4 (like 40€) in hongbao as the number 4 (四 sì) sounds like "death" (死 sǐ) in Chinese.`
      },
      {
        type: 'fun-fact',
        content: `Les pétards et feux d'artifice ne sont pas que pour le spectacle : selon la tradition, leur bruit assourdissant chasse les esprits maléfiques et apporte la prospérité pour l'année à venir.`,
        contentEn: `Firecrackers and fireworks aren't just for show: according to tradition, their deafening noise drives away evil spirits and brings prosperity for the coming year.`
      }
    ],

    vocabulary: ['春节', '红包', '饺子', '年夜饭', '鞭炮', '舞龙', '舞狮', '春联', '福', '团圆'],

    tags: ['festival', 'tradition', 'famille', 'nourriture', 'nouvel-an'],

    quiz: {
      questions: [
        {
          question: "Quelle est la couleur principale du Nouvel An chinois ?",
          questionEn: "What is the main color of Chinese New Year?",
          choices: ["Blanc", "Rouge", "Jaune", "Vert"],
          choicesEn: ["White", "Red", "Yellow", "Green"],
          correctIndex: 1,
          explanation: "Le rouge symbolise la chance et chasse les mauvais esprits.",
          explanationEn: "Red symbolizes luck and drives away evil spirits."
        },
        {
          question: "Que contiennent traditionnellement les hongbao ?",
          questionEn: "What do hongbao traditionally contain?",
          choices: ["Des bonbons", "De l'argent", "Des messages", "Des photos"],
          choicesEn: ["Candies", "Money", "Messages", "Photos"],
          correctIndex: 1,
          explanation: "Les hongbao (enveloppes rouges) contiennent de l'argent pour porter chance.",
          explanationEn: "Hongbao (red envelopes) contain money to bring good luck."
        },
        {
          question: "Quel est le nom chinois du Nouvel An chinois ?",
          questionEn: "What is the Chinese name for Chinese New Year?",
          choices: ["新年", "春节", "元旦", "中秋"],
          choicesEn: ["新年", "春节", "元旦", "中秋"],
          correctIndex: 1,
          explanation: "春节 (chūnjié) signifie 'Fête du Printemps', le nom officiel du Nouvel An chinois.",
          explanationEn: "春节 (chūnjié) means 'Spring Festival', the official name for Chinese New Year."
        },
        {
          question: "Combien de jours durent les célébrations du Nouvel An chinois ?",
          questionEn: "How many days do Chinese New Year celebrations last?",
          choices: ["3 jours", "7 jours", "15 jours", "30 jours"],
          choicesEn: ["3 days", "7 days", "15 days", "30 days"],
          correctIndex: 2,
          explanation: "Les célébrations durent 15 jours, jusqu'à la Fête des Lanternes.",
          explanationEn: "Celebrations last 15 days, until the Lantern Festival."
        },
        {
          question: "Que symbolisent les raviolis (饺子) pendant le Nouvel An ?",
          questionEn: "What do dumplings (饺子) symbolize during New Year?",
          choices: ["La santé", "La richesse", "L'amour", "La sagesse"],
          choicesEn: ["Health", "Wealth", "Love", "Wisdom"],
          correctIndex: 1,
          explanation: "Les raviolis symbolisent la richesse car leur forme ressemble aux anciens lingots d'or chinois.",
          explanationEn: "Dumplings symbolize wealth as their shape resembles ancient Chinese gold ingots."
        },
        {
          question: "Que fait-on avant le Nouvel An pour éliminer la malchance ?",
          questionEn: "What is done before New Year to eliminate bad luck?",
          choices: ["Un grand nettoyage", "Brûler de l'encens", "Porter du blanc", "Rester silencieux"],
          choicesEn: ["A big cleaning", "Burn incense", "Wear white", "Stay silent"],
          correctIndex: 0,
          explanation: "Le grand nettoyage de printemps (大扫除) symbolise l'élimination de la malchance de l'année précédente.",
          explanationEn: "The spring cleaning (大扫除) symbolizes eliminating bad luck from the previous year."
        },
        {
          question: "Pourquoi le caractère 福 (bonheur) est-il souvent placé à l'envers ?",
          questionEn: "Why is the character 福 (happiness) often placed upside down?",
          choices: ["C'est une erreur courante", "Pour porter malheur aux ennemis", "Car 'renversé' sonne comme 'arriver'", "Pour le rendre plus visible"],
          choicesEn: ["It's a common mistake", "To bring bad luck to enemies", "Because 'upside down' sounds like 'arrive'", "To make it more visible"],
          correctIndex: 2,
          explanation: "'Renversé' (倒 dào) sonne comme 'arriver' (到 dào), donc 福倒 signifie 'le bonheur arrive'.",
          explanationEn: "'Upside down' (倒 dào) sounds like 'arrive' (到 dào), so 福倒 means 'happiness arrives'."
        }
      ]
    }
  },

  {
    id: 'festival-mid-autumn',
    category: 'festivals',
    title: 'Fête de la Mi-Automne',
    titleEn: 'Mid-Autumn Festival',
    slug: 'mid-autumn-festival',
    icon: '🥮',
    difficulty: 'beginner',
    estimatedReadTime: 12,

    introduction: `La Fête de la Mi-Automne (中秋节 zhōngqiūjié) est la deuxième fête la plus importante en Chine, célébrée le 15e jour du 8e mois lunaire, lorsque la lune est la plus ronde et lumineuse de l'année.`,

    introductionEn: `The Mid-Autumn Festival (中秋节 zhōngqiūjié) is the second most important festival in China, celebrated on the 15th day of the 8th lunar month, when the moon is at its roundest and brightest of the year.`,

    sections: [
      {
        id: 'mooncakes',
        title: 'Les Gâteaux de Lune',
        titleEn: 'Mooncakes',
        content: `Les gâteaux de lune (月饼 yuèbǐng) sont LE symbole de cette fête. Ces pâtisseries rondes, représentant la pleine lune, sont fourrées de pâte de graines de lotus, de haricots rouges, ou de jaunes d'œufs salés. Offrir des gâteaux de lune est un geste d'affection et de respect.`,
        contentEn: `Mooncakes (月饼 yuèbǐng) are THE symbol of this festival. These round pastries, representing the full moon, are filled with lotus seed paste, red bean paste, or salted egg yolks. Giving mooncakes is a gesture of affection and respect.`,
        examples: [
          {
            hanzi: '月饼',
            pinyin: 'yuèbǐng',
            translation: 'mooncake',
            translationFr: 'gâteau de lune'
          },
          {
            hanzi: '赏月',
            pinyin: 'shǎngyuè',
            translation: 'admire the moon',
            translationFr: 'admirer la lune'
          }
        ]
      },
      {
        id: 'legends',
        title: 'La Légende de Chang\'e',
        titleEn: 'The Legend of Chang\'e',
        content: `Selon la légende, Chang'e (嫦娥), la déesse de la lune, vit sur la lune avec un lapin de jade. Elle aurait bu un élixir d'immortalité et s'est envolée vers la lune, où elle réside depuis, séparée de son mari Hou Yi.`,
        contentEn: `According to legend, Chang'e (嫦娥), the moon goddess, lives on the moon with a jade rabbit. She drank an elixir of immortality and flew to the moon, where she has resided ever since, separated from her husband Hou Yi.`,
        examples: [
          {
            hanzi: '嫦娥',
            pinyin: 'Cháng\'é',
            translation: 'Chang\'e (moon goddess)',
            translationFr: 'Chang\'e (déesse de la lune)'
          }
        ]
      }
    ],

    culturalNotes: [
      {
        type: 'tip',
        content: `Les gâteaux de lune sont très riches et caloriques. Il est d'usage de les couper en petites parts et de les partager en famille, plutôt que de manger un gâteau entier seul.`,
        contentEn: `Mooncakes are very rich and high in calories. It is customary to cut them into small pieces and share them with family, rather than eating a whole cake alone.`
      },
      {
        type: 'fun-fact',
        content: `Durant la dynastie Yuan, les gâteaux de lune ont servi à cacher des messages secrets pour organiser une révolte contre les Mongols. Les messages étaient cachés à l'intérieur des gâteaux.`,
        contentEn: `During the Yuan Dynasty, mooncakes were used to hide secret messages to organize a revolt against the Mongols. The messages were hidden inside the cakes.`
      }
    ],

    vocabulary: ['中秋节', '月饼', '赏月', '团圆', '嫦娥', '玉兔'],

    tags: ['festival', 'tradition', 'nourriture', 'légende'],

    quiz: {
      questions: [
        {
          question: "Que mange-t-on traditionnellement pendant la Fête de la Mi-Automne ?",
          questionEn: "What is traditionally eaten during the Mid-Autumn Festival?",
          choices: ["Des raviolis", "Des gâteaux de lune", "Des nouilles", "Du riz gluant"],
          choicesEn: ["Dumplings", "Mooncakes", "Noodles", "Sticky rice"],
          correctIndex: 1,
          explanation: "Les gâteaux de lune (月饼) sont le symbole de cette fête.",
          explanationEn: "Mooncakes (月饼) are the symbol of this festival."
        },
        {
          question: "Quel jour du calendrier lunaire se célèbre la Fête de la Mi-Automne ?",
          questionEn: "On which day of the lunar calendar is the Mid-Autumn Festival celebrated?",
          choices: ["1er jour du 8e mois", "15e jour du 8e mois", "1er jour du 9e mois", "30e jour du 7e mois"],
          choicesEn: ["1st day of 8th month", "15th day of 8th month", "1st day of 9th month", "30th day of 7th month"],
          correctIndex: 1,
          explanation: "La fête se célèbre le 15e jour du 8e mois lunaire, quand la lune est la plus ronde.",
          explanationEn: "The festival is celebrated on the 15th day of the 8th lunar month, when the moon is at its roundest."
        },
        {
          question: "Quelle activité principale fait-on pendant la Fête de la Mi-Automne ?",
          questionEn: "What is the main activity during the Mid-Autumn Festival?",
          choices: ["Danser le dragon", "Admirer la lune", "Faire des feux d'artifice", "Courir des marathons"],
          choicesEn: ["Dragon dance", "Admire the moon", "Fireworks", "Run marathons"],
          correctIndex: 1,
          explanation: "Admirer la lune (赏月 shǎngyuè) est l'activité centrale de cette fête.",
          explanationEn: "Admiring the moon (赏月 shǎngyuè) is the central activity of this festival."
        },
        {
          question: "Qui est la déesse de la lune dans la légende chinoise ?",
          questionEn: "Who is the moon goddess in Chinese legend?",
          choices: ["Mulan", "Chang'e", "Mazu", "Guanyin"],
          choicesEn: ["Mulan", "Chang'e", "Mazu", "Guanyin"],
          correctIndex: 1,
          explanation: "Chang'e (嫦娥) est la déesse de la lune qui vit sur la lune avec un lapin de jade.",
          explanationEn: "Chang'e (嫦娥) is the moon goddess who lives on the moon with a jade rabbit."
        },
        {
          question: "Quelle est la garniture traditionnelle des gâteaux de lune ?",
          questionEn: "What is the traditional filling of mooncakes?",
          choices: ["Chocolat", "Pâte de graines de lotus", "Fraise", "Crème pâtissière"],
          choicesEn: ["Chocolate", "Lotus seed paste", "Strawberry", "Pastry cream"],
          correctIndex: 1,
          explanation: "La pâte de graines de lotus est la garniture la plus traditionnelle, souvent avec des jaunes d'œufs salés.",
          explanationEn: "Lotus seed paste is the most traditional filling, often with salted egg yolks."
        },
        {
          question: "Pourquoi les gâteaux de lune ont-ils servi pendant la dynastie Yuan ?",
          questionEn: "Why were mooncakes used during the Yuan Dynasty?",
          choices: ["Pour célébrer", "Pour cacher des messages secrets", "Pour payer les taxes", "Pour nourrir l'armée"],
          choicesEn: ["To celebrate", "To hide secret messages", "To pay taxes", "To feed the army"],
          correctIndex: 1,
          explanation: "Les gâteaux de lune ont servi à cacher des messages secrets pour organiser une révolte contre les Mongols.",
          explanationEn: "Mooncakes were used to hide secret messages to organize a revolt against the Mongols."
        }
      ]
    }
  },

  // SUPERSTITIONS
  {
    id: 'superstition-numbers',
    category: 'superstitions',
    title: 'La Symbolique des Chiffres',
    titleEn: 'Number Symbolism',
    slug: 'lucky-numbers',
    icon: '🔢',
    difficulty: 'beginner',
    estimatedReadTime: 10,

    introduction: `En Chine, les chiffres ont une signification bien au-delà de leur valeur mathématique. Certains sont considérés comme très chanceux, d'autres comme extrêmement malchanceux, principalement en raison de leur prononciation.`,

    introductionEn: `In China, numbers have meaning far beyond their mathematical value. Some are considered very lucky, others extremely unlucky, primarily due to their pronunciation.`,

    sections: [
      {
        id: 'unlucky-four',
        title: 'Le Chiffre 4 : Malchanceux',
        titleEn: 'Number 4: Unlucky',
        content: `Le chiffre 4 (四 sì) est considéré comme le plus malchanceux car sa prononciation ressemble au mot "mort" (死 sǐ). De nombreux immeubles n'ont pas de 4e étage, et les numéros de téléphone ou plaques d'immatriculation contenant le 4 sont moins chers.`,
        contentEn: `The number 4 (四 sì) is considered the most unlucky as its pronunciation resembles the word "death" (死 sǐ). Many buildings don't have a 4th floor, and phone numbers or license plates containing 4 are cheaper.`,
        examples: [
          {
            hanzi: '四',
            pinyin: 'sì',
            translation: 'four',
            translationFr: 'quatre'
          },
          {
            hanzi: '死',
            pinyin: 'sǐ',
            translation: 'death',
            translationFr: 'mort'
          }
        ]
      },
      {
        id: 'lucky-eight',
        title: 'Le Chiffre 8 : Porte-bonheur',
        titleEn: 'Number 8: Lucky',
        content: `Le chiffre 8 (八 bā) est le plus chanceux car il sonne comme "prospérité" (发 fā, comme dans 发财 fācái "devenir riche"). Les Jeux Olympiques de Beijing ont commencé le 08/08/2008 à 8h08 du soir ! Les numéros contenant plusieurs 8 sont très recherchés et coûtent plus cher.`,
        contentEn: `The number 8 (八 bā) is the luckiest as it sounds like "prosperity" (发 fā, as in 发财 fācái "to get rich"). The Beijing Olympics started on 08/08/2008 at 8:08 PM! Numbers containing multiple 8s are highly sought after and cost more.`,
        examples: [
          {
            hanzi: '八',
            pinyin: 'bā',
            translation: 'eight',
            translationFr: 'huit'
          },
          {
            hanzi: '发财',
            pinyin: 'fācái',
            translation: 'get rich',
            translationFr: 'devenir riche'
          }
        ]
      },
      {
        id: 'other-numbers',
        title: 'Autres Chiffres',
        titleEn: 'Other Numbers',
        content: `Le 6 (六 liù) est chanceux car il sonne comme "couler/fluide" (流 liú), symbolisant que tout se passe bien. Le 9 (九 jiǔ) ressemble à "durable/éternel" (久 jiǔ), parfait pour les mariages. Le 2 est bon car "les bonnes choses viennent par paires". Le 7 peut être chanceux (七夕, la Saint-Valentin chinoise) ou malchanceux selon le contexte.`,
        contentEn: `The 6 (六 liù) is lucky as it sounds like "flow/smooth" (流 liú), symbolizing everything going well. The 9 (九 jiǔ) resembles "long-lasting/eternal" (久 jiǔ), perfect for weddings. The 2 is good because "good things come in pairs." The 7 can be lucky (七夕, Chinese Valentine's Day) or unlucky depending on context.`,
        examples: [
          {
            hanzi: '六六大顺',
            pinyin: 'liùliù dàshùn',
            translation: 'everything goes smoothly',
            translationFr: 'que tout se passe bien'
          }
        ]
      }
    ],

    culturalNotes: [
      {
        type: 'warning',
        content: `N'offrez jamais 4 de quelque chose (4 fleurs, 4 cadeaux, etc.). Préférez les nombres pairs sauf 4, ou les nombres contenant 6 ou 8.`,
        contentEn: `Never give 4 of something (4 flowers, 4 gifts, etc.). Prefer even numbers except 4, or numbers containing 6 or 8.`
      },
      {
        type: 'fun-fact',
        content: `En 2014, un homme d'affaires chinois a payé 8,5 millions d'euros pour le numéro de téléphone 8888 8888 !`,
        contentEn: `In 2014, a Chinese businessman paid 8.5 million euros for the phone number 8888 8888!`
      },
      {
        type: 'tip',
        content: `Pour les hongbao (enveloppes rouges), privilégiez les montants avec 6 ou 8 : 88€, 168€, 188€, 288€, 666€, 888€ sont des choix populaires.`,
        contentEn: `For hongbao (red envelopes), prefer amounts with 6 or 8: 88€, 168€, 188€, 288€, 666€, 888€ are popular choices.`
      }
    ],

    vocabulary: ['四', '八', '六', '九', '发财', '吉利', '倒霉'],

    tags: ['superstition', 'culture', 'chiffres', 'chance'],

    quiz: {
      questions: [
        {
          question: "Pourquoi le chiffre 4 est-il considéré comme malchanceux en Chine ?",
          questionEn: "Why is the number 4 considered unlucky in China?",
          choices: [
            "Il ressemble au mot 'mort'",
            "Il ressemble au mot 'pauvre'",
            "Il ressemble au mot 'maladie'",
            "Il ressemble au mot 'échec'"
          ],
          choicesEn: [
            "It sounds like the word 'death'",
            "It sounds like the word 'poor'",
            "It sounds like the word 'illness'",
            "It sounds like the word 'failure'"
          ],
          correctIndex: 0,
          explanation: "Le chiffre 4 (四 sì) se prononce comme 'mort' (死 sǐ).",
          explanationEn: "The number 4 (四 sì) sounds like 'death' (死 sǐ)."
        },
        {
          question: "Quel chiffre est considéré comme le plus chanceux ?",
          questionEn: "Which number is considered the luckiest?",
          choices: ["6", "7", "8", "9"],
          choicesEn: ["6", "7", "8", "9"],
          correctIndex: 2,
          explanation: "Le 8 (八 bā) sonne comme 'prospérité' (发 fā).",
          explanationEn: "The 8 (八 bā) sounds like 'prosperity' (发 fā)."
        },
        {
          question: "À quelle date ont commencé les Jeux Olympiques de Beijing en 2008 ?",
          questionEn: "What date did the Beijing Olympics start in 2008?",
          choices: ["07/07/2008", "08/08/2008 à 8h08", "09/09/2008", "10/10/2008"],
          choicesEn: ["07/07/2008", "08/08/2008 at 8:08 PM", "09/09/2008", "10/10/2008"],
          correctIndex: 1,
          explanation: "Les JO ont commencé le 08/08/2008 à 8h08 pour maximiser la chance avec le chiffre 8.",
          explanationEn: "The Olympics started on 08/08/2008 at 8:08 PM to maximize luck with the number 8."
        },
        {
          question: "Que symbolise le chiffre 6 (六 liù) ?",
          questionEn: "What does the number 6 (六 liù) symbolize?",
          choices: ["La mort", "Que tout se passe bien", "La pauvreté", "La maladie"],
          choicesEn: ["Death", "Everything goes smoothly", "Poverty", "Illness"],
          correctIndex: 1,
          explanation: "Le 6 ressemble à 'fluide/couler' (流 liú), symbolisant que tout se passe bien (六六大顺).",
          explanationEn: "The 6 resembles 'flow/smooth' (流 liú), symbolizing everything going well (六六大顺)."
        },
        {
          question: "Pourquoi le chiffre 9 est-il favorable pour les mariages ?",
          questionEn: "Why is the number 9 favorable for weddings?",
          choices: ["Il ressemble à 'nouveau'", "Il ressemble à 'durable/éternel'", "Il ressemble à 'bonheur'", "Il ressemble à 'amour'"],
          choicesEn: ["It sounds like 'new'", "It sounds like 'long-lasting/eternal'", "It sounds like 'happiness'", "It sounds like 'love'"],
          correctIndex: 1,
          explanation: "Le 9 (九 jiǔ) ressemble à 'durable/éternel' (久 jiǔ), parfait pour un mariage qui dure.",
          explanationEn: "The 9 (九 jiǔ) resembles 'long-lasting/eternal' (久 jiǔ), perfect for a lasting marriage."
        },
        {
          question: "Combien a coûté le numéro de téléphone 8888 8888 ?",
          questionEn: "How much did the phone number 8888 8888 cost?",
          choices: ["85 000 euros", "850 000 euros", "8,5 millions d'euros", "85 millions d'euros"],
          choicesEn: ["85,000 euros", "850,000 euros", "8.5 million euros", "85 million euros"],
          correctIndex: 2,
          explanation: "En 2014, un homme d'affaires a payé 8,5 millions d'euros pour ce numéro porte-bonheur.",
          explanationEn: "In 2014, a businessman paid 8.5 million euros for this lucky number."
        },
        {
          question: "Quel montant NE devriez-vous PAS mettre dans un hongbao ?",
          questionEn: "Which amount should you NOT put in a hongbao?",
          choices: ["88€", "168€", "40€", "666€"],
          choicesEn: ["88€", "168€", "40€", "666€"],
          correctIndex: 2,
          explanation: "40€ se termine par 4, le chiffre malchanceux. Privilégiez les montants avec 6 ou 8.",
          explanationEn: "40€ ends in 4, the unlucky number. Prefer amounts with 6 or 8."
        }
      ]
    }
  },

  // ÉTIQUETTE
  {
    id: 'etiquette-dining',
    category: 'etiquette',
    title: 'L\'Étiquette à Table',
    titleEn: 'Dining Etiquette',
    slug: 'dining-etiquette',
    icon: '🥢',
    difficulty: 'intermediate',
    estimatedReadTime: 15,

    introduction: `Les repas en Chine sont des moments sociaux importants avec des règles d'étiquette spécifiques. Maîtriser ces codes culturels montre du respect et facilite les interactions.`,

    introductionEn: `Meals in China are important social moments with specific etiquette rules. Mastering these cultural codes shows respect and facilitates interactions.`,

    sections: [
      {
        id: 'chopsticks',
        title: 'L\'Usage des Baguettes',
        titleEn: 'Chopsticks Usage',
        content: `Les baguettes (筷子 kuàizi) ont de nombreuses règles : ne jamais les planter verticalement dans le riz (ressemble aux bâtons d'encens pour les morts), ne pas pointer quelqu'un avec, ne pas tambouriner sur le bol. Posez-les horizontalement sur le repose-baguettes ou sur le bord du bol.`,
        contentEn: `Chopsticks (筷子 kuàizi) have many rules: never stick them vertically in rice (resembles incense sticks for the dead), don't point at someone with them, don't drum on the bowl. Place them horizontally on the chopstick rest or on the edge of the bowl.`,
        examples: [
          {
            hanzi: '筷子',
            pinyin: 'kuàizi',
            translation: 'chopsticks',
            translationFr: 'baguettes'
          }
        ]
      },
      {
        id: 'serving',
        title: 'Servir et Être Servi',
        titleEn: 'Serving and Being Served',
        content: `À table, servez toujours les autres avant vous, en commençant par les aînés ou personnes de statut supérieur. Les plats sont partagés au centre de la table (repas familial, pas de portions individuelles). Utilisez les baguettes de service, pas vos baguettes personnelles, pour prendre la nourriture commune.`,
        contentEn: `At the table, always serve others before yourself, starting with elders or people of higher status. Dishes are shared in the center of the table (family-style, not individual portions). Use serving chopsticks, not your personal chopsticks, to take shared food.`,
        examples: [
          {
            hanzi: '请慢用',
            pinyin: 'qǐng màn yòng',
            translation: 'enjoy your meal',
            translationFr: 'bon appétit'
          }
        ]
      },
      {
        id: 'toasting',
        title: 'Porter un Toast',
        titleEn: 'Making a Toast',
        content: `Lors d'un toast (干杯 gānbēi, littéralement "verre sec"), votre verre doit être plus bas que celui de vos aînés ou supérieurs en signe de respect. "Ganbei" signifie vider son verre d'un coup, mais vous pouvez simplement boire une gorgée si c'est trop. Refuser complètement peut être considéré comme impoli.`,
        contentEn: `When making a toast (干杯 gānbēi, literally "dry glass"), your glass should be lower than that of your elders or superiors as a sign of respect. "Ganbei" means emptying your glass in one go, but you can just take a sip if it's too much. Completely refusing can be considered rude.`,
        examples: [
          {
            hanzi: '干杯',
            pinyin: 'gānbēi',
            translation: 'cheers/bottoms up',
            translationFr: 'santé/cul sec'
          },
          {
            hanzi: '随意',
            pinyin: 'suíyì',
            translation: 'as you like (drinking)',
            translationFr: 'à votre guise (pour boire)'
          }
        ]
      },
      {
        id: 'finishing',
        title: 'Finir son Assiette',
        titleEn: 'Finishing Your Plate',
        content: `Contrairement à la culture occidentale, finir complètement son assiette peut suggérer que l'hôte n'a pas fourni assez de nourriture ! Laissez un peu de nourriture dans votre assiette pour montrer que vous êtes satisfait et qu'il y avait abondance.`,
        contentEn: `Unlike Western culture, completely finishing your plate may suggest that the host didn't provide enough food! Leave a little food on your plate to show that you're satisfied and there was abundance.`,
        examples: [
          {
            hanzi: '吃饱了',
            pinyin: 'chībǎo le',
            translation: 'I\'m full',
            translationFr: 'je suis rassasié(e)'
          }
        ]
      }
    ],

    culturalNotes: [
      {
        type: 'warning',
        content: `Ne plantez JAMAIS vos baguettes verticalement dans le riz. C'est un geste funéraire qui rappelle les bâtons d'encens plantés dans les offrandes aux morts.`,
        contentEn: `NEVER stick your chopsticks vertically in rice. This is a funeral gesture that recalls incense sticks stuck in offerings to the dead.`
      },
      {
        type: 'tip',
        content: `Si l'hôte continue à remplir votre assiette (signe de générosité), vous pouvez poliment refuser en disant "够了，谢谢" (gòu le, xièxie - c'est assez, merci).`,
        contentEn: `If the host keeps filling your plate (sign of generosity), you can politely refuse by saying "够了，谢谢" (gòu le, xièxie - that's enough, thank you).`
      },
      {
        type: 'fun-fact',
        content: `Le bruit en mangeant (slurper les nouilles par exemple) n'est pas impoli en Chine, c'est même parfois vu comme un signe d'appréciation du plat !`,
        contentEn: `Making noise while eating (slurping noodles for example) is not rude in China, it's even sometimes seen as a sign of appreciation for the dish!`
      }
    ],

    vocabulary: ['筷子', '干杯', '请慢用', '吃饱了', '好吃', '茶'],

    tags: ['étiquette', 'repas', 'baguettes', 'culture'],

    quiz: {
      questions: [
        {
          question: "Que ne faut-il JAMAIS faire avec des baguettes ?",
          questionEn: "What should you NEVER do with chopsticks?",
          choices: [
            "Les poser sur le bol",
            "Les planter verticalement dans le riz",
            "Les utiliser pour manger des nouilles",
            "Les tenir dans la main droite"
          ],
          choicesEn: [
            "Place them on the bowl",
            "Stick them vertically in rice",
            "Use them to eat noodles",
            "Hold them in the right hand"
          ],
          correctIndex: 1,
          explanation: "Planter les baguettes dans le riz rappelle un geste funéraire avec les bâtons d'encens.",
          explanationEn: "Sticking chopsticks in rice recalls a funeral gesture with incense sticks."
        },
        {
          question: "Lors d'un toast (干杯), comment doit être votre verre par rapport à celui de vos aînés ?",
          questionEn: "During a toast (干杯), how should your glass be positioned relative to your elders'?",
          choices: ["Plus haut", "Au même niveau", "Plus bas", "Peu importe"],
          choicesEn: ["Higher", "Same level", "Lower", "Doesn't matter"],
          correctIndex: 2,
          explanation: "Votre verre doit être plus bas que celui de vos aînés ou supérieurs en signe de respect.",
          explanationEn: "Your glass should be lower than that of your elders or superiors as a sign of respect."
        },
        {
          question: "Que signifie 'Ganbei' (干杯) littéralement ?",
          questionEn: "What does 'Ganbei' (干杯) literally mean?",
          choices: ["Verre haut", "Verre sec", "Bonne santé", "Verre plein"],
          choicesEn: ["High glass", "Dry glass", "Good health", "Full glass"],
          correctIndex: 1,
          explanation: "'Ganbei' signifie littéralement 'verre sec', suggérant de vider son verre d'un coup.",
          explanationEn: "'Ganbei' literally means 'dry glass', suggesting emptying your glass in one go."
        },
        {
          question: "Pourquoi ne devriez-vous pas finir complètement votre assiette en Chine ?",
          questionEn: "Why shouldn't you completely finish your plate in China?",
          choices: [
            "C'est impoli de tout manger",
            "Cela suggère que l'hôte n'a pas fourni assez",
            "Il faut toujours garder pour les ancêtres",
            "C'est mauvais pour la digestion"
          ],
          choicesEn: [
            "It's rude to eat everything",
            "It suggests the host didn't provide enough",
            "You must save for ancestors",
            "It's bad for digestion"
          ],
          correctIndex: 1,
          explanation: "Laisser un peu de nourriture montre que vous êtes satisfait et qu'il y avait abondance.",
          explanationEn: "Leaving some food shows you're satisfied and there was abundance."
        },
        {
          question: "Qui devez-vous servir en premier à table ?",
          questionEn: "Who should you serve first at the table?",
          choices: ["Vous-même", "Les aînés ou personnes de statut supérieur", "Les enfants", "L'hôte"],
          choicesEn: ["Yourself", "Elders or people of higher status", "Children", "The host"],
          correctIndex: 1,
          explanation: "Servez toujours les autres avant vous, en commençant par les aînés ou personnes de statut supérieur.",
          explanationEn: "Always serve others before yourself, starting with elders or people of higher status."
        },
        {
          question: "Comment prendre la nourriture partagée au centre de la table ?",
          questionEn: "How should you take shared food from the center of the table?",
          choices: [
            "Avec vos baguettes personnelles",
            "Avec les baguettes de service",
            "Avec vos mains",
            "Avec une cuillère"
          ],
          choicesEn: [
            "With your personal chopsticks",
            "With serving chopsticks",
            "With your hands",
            "With a spoon"
          ],
          correctIndex: 1,
          explanation: "Utilisez les baguettes de service, pas vos baguettes personnelles, pour prendre la nourriture commune.",
          explanationEn: "Use serving chopsticks, not your personal chopsticks, to take shared food."
        },
        {
          question: "Est-il acceptable de faire du bruit en mangeant des nouilles en Chine ?",
          questionEn: "Is it acceptable to make noise when eating noodles in China?",
          choices: [
            "Non, c'est toujours impoli",
            "Oui, c'est même un signe d'appréciation",
            "Seulement si vous êtes seul",
            "Seulement dans les restaurants bon marché"
          ],
          choicesEn: [
            "No, it's always rude",
            "Yes, it's even a sign of appreciation",
            "Only if you're alone",
            "Only in cheap restaurants"
          ],
          correctIndex: 1,
          explanation: "Slurper les nouilles n'est pas impoli en Chine, c'est même parfois vu comme un signe d'appréciation du plat.",
          explanationEn: "Slurping noodles is not rude in China, it's even sometimes seen as a sign of appreciation for the dish."
        }
      ]
    }
  },

  // SUPERSTITIONS - Couleurs
  {
    id: 'superstition-colors',
    category: 'superstitions',
    title: 'La Symbolique des Couleurs',
    titleEn: 'Color Symbolism',
    slug: 'color-symbolism',
    icon: '🎨',
    difficulty: 'beginner',
    estimatedReadTime: 10,

    introduction: `En Chine, les couleurs ont une signification profonde et sont choisies avec soin selon les occasions. Comprendre cette symbolique est essentiel pour éviter les faux pas culturels.`,

    introductionEn: `In China, colors have deep meaning and are chosen carefully according to occasions. Understanding this symbolism is essential to avoid cultural blunders.`,

    sections: [
      {
        id: 'red-color',
        title: 'Le Rouge : La Couleur de la Chance',
        titleEn: 'Red: The Color of Luck',
        content: `Le rouge (红色 hóngsè) est LA couleur la plus auspicieuse en Chine. Elle symbolise la chance, le bonheur, la prospérité et éloigne les mauvais esprits. On la porte aux mariages, on l'utilise pour les décorations du Nouvel An, et les enveloppes contenant de l'argent sont toujours rouges.`,
        contentEn: `Red (红色 hóngsè) is THE most auspicious color in China. It symbolizes luck, happiness, prosperity and wards off evil spirits. It's worn at weddings, used for New Year decorations, and envelopes containing money are always red.`,
        examples: [
          {
            hanzi: '红色',
            pinyin: 'hóngsè',
            translation: 'red color',
            translationFr: 'couleur rouge'
          },
          {
            hanzi: '大红大紫',
            pinyin: 'dàhóng dàzǐ',
            translation: 'great success',
            translationFr: 'grand succès'
          }
        ]
      },
      {
        id: 'white-black',
        title: 'Le Blanc et le Noir : Couleurs du Deuil',
        titleEn: 'White and Black: Colors of Mourning',
        content: `Contrairement à l'Occident, le blanc (白色 báisè) est la couleur du deuil en Chine. Le noir est également associé à la mort. Il faut éviter de porter du blanc à un mariage ou d'offrir des cadeaux emballés en blanc ou noir.`,
        contentEn: `Unlike the West, white (白色 báisè) is the color of mourning in China. Black is also associated with death. Avoid wearing white to a wedding or giving gifts wrapped in white or black.`,
        examples: [
          {
            hanzi: '白色',
            pinyin: 'báisè',
            translation: 'white color',
            translationFr: 'couleur blanche'
          }
        ]
      },
      {
        id: 'gold-yellow',
        title: 'L\'Or et le Jaune : Couleurs Impériales',
        titleEn: 'Gold and Yellow: Imperial Colors',
        content: `Le jaune (黄色 huángsè), surtout le jaune doré, était historiquement réservé à l'empereur. L'or symbolise la richesse, la prospérité et le pouvoir. Ces couleurs sont considérées comme très auspicieuses.`,
        contentEn: `Yellow (黄色 huángsè), especially golden yellow, was historically reserved for the emperor. Gold symbolizes wealth, prosperity and power. These colors are considered very auspicious.`,
        examples: [
          {
            hanzi: '黄金',
            pinyin: 'huángjīn',
            translation: 'gold',
            translationFr: 'or'
          }
        ]
      }
    ],

    culturalNotes: [
      {
        type: 'warning',
        content: `N'offrez JAMAIS de cadeaux emballés en blanc ou noir, car ces couleurs sont associées aux funérailles. Préférez le rouge, le rose, l'or ou le jaune.`,
        contentEn: `NEVER give gifts wrapped in white or black, as these colors are associated with funerals. Prefer red, pink, gold or yellow.`
      },
      {
        type: 'tip',
        content: `Pour un mariage chinois, portez du rouge ou des couleurs vives. Évitez absolument le blanc, le noir et même le vert (qui peut symboliser l'infidélité).`,
        contentEn: `For a Chinese wedding, wear red or bright colors. Absolutely avoid white, black and even green (which can symbolize infidelity).`
      },
      {
        type: 'fun-fact',
        content: `La Cité Interdite à Beijing est pleine de rouge et d'or, les couleurs impériales symbolisant le pouvoir et la prospérité.`,
        contentEn: `The Forbidden City in Beijing is full of red and gold, the imperial colors symbolizing power and prosperity.`
      }
    ],

    vocabulary: ['红色', '白色', '黑色', '黄色', '金色', '颜色'],

    tags: ['superstition', 'couleurs', 'mariage', 'culture'],

    quiz: {
      questions: [
        {
          question: "Quelle est la couleur la plus auspicieuse en Chine ?",
          questionEn: "What is the most auspicious color in China?",
          choices: ["Le blanc", "Le rouge", "Le vert", "Le bleu"],
          choicesEn: ["White", "Red", "Green", "Blue"],
          correctIndex: 1,
          explanation: "Le rouge symbolise la chance, le bonheur et la prospérité en Chine.",
          explanationEn: "Red symbolizes luck, happiness and prosperity in China."
        },
        {
          question: "Quelle couleur éviter absolument à un mariage chinois ?",
          questionEn: "Which color should you absolutely avoid at a Chinese wedding?",
          choices: ["Rouge", "Rose", "Blanc", "Jaune"],
          choicesEn: ["Red", "Pink", "White", "Yellow"],
          correctIndex: 2,
          explanation: "Le blanc est la couleur du deuil en Chine, donc totalement inapproprié pour un mariage.",
          explanationEn: "White is the color of mourning in China, so totally inappropriate for a wedding."
        },
        {
          question: "Quelle couleur était historiquement réservée à l'empereur ?",
          questionEn: "Which color was historically reserved for the emperor?",
          choices: ["Rouge", "Jaune doré", "Bleu", "Violet"],
          choicesEn: ["Red", "Golden yellow", "Blue", "Purple"],
          correctIndex: 1,
          explanation: "Le jaune doré était la couleur impériale, symbolisant le pouvoir et la prospérité.",
          explanationEn: "Golden yellow was the imperial color, symbolizing power and prosperity."
        },
        {
          question: "De quelle couleur sont traditionnellement les enveloppes d'argent (hongbao) ?",
          questionEn: "What color are money envelopes (hongbao) traditionally?",
          choices: ["Blanches", "Rouges", "Dorées", "Roses"],
          choicesEn: ["White", "Red", "Golden", "Pink"],
          correctIndex: 1,
          explanation: "Les hongbao sont toujours rouges car le rouge porte chance et prospérité.",
          explanationEn: "Hongbao are always red because red brings luck and prosperity."
        },
        {
          question: "Quelle couleur peut symboliser l'infidélité en Chine ?",
          questionEn: "Which color can symbolize infidelity in China?",
          choices: ["Le rouge", "Le vert", "Le rose", "Le bleu"],
          choicesEn: ["Red", "Green", "Pink", "Blue"],
          correctIndex: 1,
          explanation: "Le vert peut symboliser l'infidélité, il est donc à éviter lors de certaines occasions.",
          explanationEn: "Green can symbolize infidelity, so it should be avoided on certain occasions."
        }
      ]
    }
  },

  // ÉTIQUETTE - Cadeaux
  {
    id: 'etiquette-gifts',
    category: 'etiquette',
    title: 'L\'Art d\'Offrir des Cadeaux',
    titleEn: 'The Art of Gift Giving',
    slug: 'gift-giving',
    icon: '🎁',
    difficulty: 'intermediate',
    estimatedReadTime: 12,

    introduction: `Offrir des cadeaux en Chine est un art délicat avec des règles précises. Un cadeau approprié peut renforcer une relation, tandis qu'un cadeau inapproprié peut causer de l'embarras.`,

    introductionEn: `Giving gifts in China is a delicate art with specific rules. An appropriate gift can strengthen a relationship, while an inappropriate gift can cause embarrassment.`,

    sections: [
      {
        id: 'what-to-give',
        title: 'Cadeaux Appropriés',
        titleEn: 'Appropriate Gifts',
        content: `Les bons cadeaux incluent : fruits de qualité, thé premium, alcool (baijiu, vin), produits de votre pays d'origine, chocolats ou pâtisseries de marque. Pour les affaires, privilégiez les cadeaux qui reflètent votre entreprise ou culture.`,
        contentEn: `Good gifts include: quality fruits, premium tea, alcohol (baijiu, wine), products from your home country, branded chocolates or pastries. For business, favor gifts that reflect your company or culture.`,
        examples: [
          {
            hanzi: '送礼',
            pinyin: 'sònglǐ',
            translation: 'give a gift',
            translationFr: 'offrir un cadeau'
          },
          {
            hanzi: '礼物',
            pinyin: 'lǐwù',
            translation: 'gift',
            translationFr: 'cadeau'
          }
        ]
      },
      {
        id: 'taboos',
        title: 'Cadeaux Tabous',
        titleEn: 'Taboo Gifts',
        content: `Ne JAMAIS offrir : horloges (钟 zhōng sonne comme "funérailles"), parapluies (伞 sǎn sonne comme "séparation"), poires (梨 lí sonne comme "se séparer"), couteaux ou objets tranchants (coupent la relation), mouchoirs (larmes), objets en groupes de 4. Les fleurs blanches sont pour les funérailles.`,
        contentEn: `NEVER give: clocks (钟 zhōng sounds like "funeral"), umbrellas (伞 sǎn sounds like "separation"), pears (梨 lí sounds like "separate"), knives or sharp objects (cut the relationship), handkerchiefs (tears), objects in groups of 4. White flowers are for funerals.`,
        examples: [
          {
            hanzi: '送钟',
            pinyin: 'sòngzhōng',
            translation: 'give a clock (taboo)',
            translationFr: 'offrir une horloge (tabou)'
          }
        ]
      },
      {
        id: 'etiquette',
        title: 'L\'Étiquette du Cadeau',
        titleEn: 'Gift Etiquette',
        content: `Emballez toujours vos cadeaux (rouge, or, rose). Utilisez les deux mains pour offrir et recevoir. Le destinataire refusera poliment 2-3 fois avant d'accepter (insistez gentiment). Ne déballez pas le cadeau devant le donneur. Offrez et recevez avec modestie, en minimisant la valeur du cadeau.`,
        contentEn: `Always wrap your gifts (red, gold, pink). Use both hands to give and receive. The recipient will politely refuse 2-3 times before accepting (insist gently). Don't unwrap the gift in front of the giver. Give and receive with modesty, minimizing the gift's value.`,
        examples: [
          {
            hanzi: '不好意思',
            pinyin: 'bù hǎoyìsi',
            translation: 'I\'m embarrassed (polite refusal)',
            translationFr: 'je suis gêné(e) (refus poli)'
          }
        ]
      }
    ],

    culturalNotes: [
      {
        type: 'warning',
        content: `Ne dites JAMAIS "Je vous ai acheté cette horloge/montre très chère". Les horloges sont associées aux funérailles (送钟 = 送终 "accompagner jusqu'à la fin").`,
        contentEn: `NEVER say "I bought you this expensive clock/watch". Clocks are associated with funerals (送钟 = 送终 "accompany to the end").`
      },
      {
        type: 'tip',
        content: `Si vous offrez de l'argent, utilisez toujours une enveloppe rouge (hongbao) avec un montant pair (sauf 4) contenant 6 ou 8 : 88, 188, 288, 666, 888.`,
        contentEn: `If giving money, always use a red envelope (hongbao) with an even amount (except 4) containing 6 or 8: 88, 188, 288, 666, 888.`
      },
      {
        type: 'fun-fact',
        content: `Dans les relations d'affaires chinoises, l'échange de cadeaux (guanxi) est crucial et peut influencer le succès d'un partenariat.`,
        contentEn: `In Chinese business relationships, gift exchange (guanxi) is crucial and can influence the success of a partnership.`
      }
    ],

    vocabulary: ['礼物', '送礼', '红包', '包装', '收礼'],

    tags: ['étiquette', 'cadeaux', 'culture', 'tabous'],

    quiz: {
      questions: [
        {
          question: "Pourquoi ne faut-il jamais offrir une horloge en Chine ?",
          questionEn: "Why should you never give a clock in China?",
          choices: [
            "C'est trop cher",
            "钟 (horloge) sonne comme 'funérailles'",
            "C'est démodé",
            "C'est impratique"
          ],
          choicesEn: [
            "It's too expensive",
            "钟 (clock) sounds like 'funeral'",
            "It's outdated",
            "It's impractical"
          ],
          correctIndex: 1,
          explanation: "送钟 (sòngzhōng, offrir une horloge) sonne comme 送终 (sòngzhōng, accompagner aux funérailles).",
          explanationEn: "送钟 (sòngzhōng, give a clock) sounds like 送终 (sòngzhōng, attend a funeral)."
        },
        {
          question: "Combien de fois un Chinois peut-il refuser poliment un cadeau avant de l'accepter ?",
          questionEn: "How many times might a Chinese person politely refuse a gift before accepting?",
          choices: ["Jamais", "1 fois", "2-3 fois", "5 fois ou plus"],
          choicesEn: ["Never", "Once", "2-3 times", "5 or more times"],
          correctIndex: 2,
          explanation: "C'est une marque de politesse de refuser 2-3 fois avant d'accepter. Il faut insister gentiment.",
          explanationEn: "It's polite to refuse 2-3 times before accepting. You should insist gently."
        },
        {
          question: "De quelle couleur doit être l'emballage d'un cadeau ?",
          questionEn: "What color should gift wrapping be?",
          choices: ["Blanc", "Noir", "Rouge, or ou rose", "Vert"],
          choicesEn: ["White", "Black", "Red, gold or pink", "Green"],
          correctIndex: 2,
          explanation: "Rouge, or et rose sont des couleurs auspicieuses. Évitez le blanc et le noir (deuil).",
          explanationEn: "Red, gold and pink are auspicious colors. Avoid white and black (mourning)."
        },
        {
          question: "Quel fruit ne faut-il PAS offrir ?",
          questionEn: "Which fruit should you NOT give?",
          choices: ["Pommes", "Poires", "Oranges", "Raisins"],
          choicesEn: ["Apples", "Pears", "Oranges", "Grapes"],
          correctIndex: 1,
          explanation: "梨 (lí, poire) sonne comme 离 (lí, se séparer), donc symbole de séparation.",
          explanationEn: "梨 (lí, pear) sounds like 离 (lí, separate), thus symbol of separation."
        },
        {
          question: "Comment doit-on offrir et recevoir un cadeau ?",
          questionEn: "How should you give and receive a gift?",
          choices: [
            "Avec une seule main",
            "Avec les deux mains",
            "En le posant sur la table",
            "Peu importe"
          ],
          choicesEn: [
            "With one hand",
            "With both hands",
            "By placing it on the table",
            "Doesn't matter"
          ],
          correctIndex: 1,
          explanation: "Utilisez toujours les deux mains pour montrer du respect et de la considération.",
          explanationEn: "Always use both hands to show respect and consideration."
        },
        {
          question: "Doit-on déballer un cadeau devant la personne qui l'offre ?",
          questionEn: "Should you unwrap a gift in front of the person who gives it?",
          choices: [
            "Oui, immédiatement",
            "Non, c'est impoli",
            "Seulement si on vous le demande",
            "Seulement pour les petits cadeaux"
          ],
          choicesEn: [
            "Yes, immediately",
            "No, it's rude",
            "Only if asked",
            "Only for small gifts"
          ],
          correctIndex: 1,
          explanation: "Il est considéré impoli de déballer un cadeau devant le donneur. Attendez d'être seul.",
          explanationEn: "It's considered rude to unwrap a gift in front of the giver. Wait until you're alone."
        }
      ]
    }
  },

  // FESTIVALS - Fête des Bateaux-Dragons
  {
    id: 'festival-dragon-boat',
    category: 'festivals',
    title: 'Fête des Bateaux-Dragons',
    titleEn: 'Dragon Boat Festival',
    slug: 'dragon-boat-festival',
    icon: '🐉',
    difficulty: 'beginner',
    estimatedReadTime: 12,

    introduction: `La Fête des Bateaux-Dragons (端午节 Duānwǔjié) est l'une des trois grandes fêtes traditionnelles chinoises. Célébrée le 5e jour du 5e mois lunaire, elle commémore le poète Qu Yuan et est marquée par des courses de bateaux-dragons et la dégustation de zongzi.`,

    introductionEn: `The Dragon Boat Festival (端午节 Duānwǔjié) is one of the three major traditional Chinese festivals. Celebrated on the 5th day of the 5th lunar month, it commemorates the poet Qu Yuan and is marked by dragon boat races and eating zongzi.`,

    sections: [
      {
        id: 'origin',
        title: 'La Légende de Qu Yuan',
        titleEn: 'The Legend of Qu Yuan',
        content: `La fête commémore Qu Yuan (屈原), un poète et ministre de l'État de Chu (IIIe siècle av. J.-C.). Désespéré par la corruption et l'invasion de son pays, il se serait jeté dans la rivière Miluo. Les villageois ont lancé du riz dans l'eau et battu des tambours sur des bateaux pour éloigner les poissons de son corps.`,
        contentEn: `The festival commemorates Qu Yuan (屈原), a poet and minister of the State of Chu (3rd century BC). Desperate over corruption and the invasion of his country, he threw himself into the Miluo River. Villagers threw rice into the water and beat drums on boats to keep fish away from his body.`,
        examples: [
          {
            hanzi: '端午节',
            pinyin: 'Duānwǔjié',
            translation: 'Dragon Boat Festival',
            translationFr: 'Fête des Bateaux-Dragons'
          },
          {
            hanzi: '屈原',
            pinyin: 'Qū Yuán',
            translation: 'Qu Yuan (poet)',
            translationFr: 'Qu Yuan (poète)'
          }
        ]
      },
      {
        id: 'zongzi',
        title: 'Les Zongzi',
        titleEn: 'Zongzi',
        content: `Les zongzi (粽子) sont des boulettes de riz gluant enveloppées dans des feuilles de bambou. Elles peuvent être sucrées (avec des dattes, pâte de haricots rouges) ou salées (avec du porc, des œufs, des champignons). Chaque région a sa propre recette traditionnelle.`,
        contentEn: `Zongzi (粽子) are glutinous rice dumplings wrapped in bamboo leaves. They can be sweet (with dates, red bean paste) or savory (with pork, eggs, mushrooms). Each region has its own traditional recipe.`,
        examples: [
          {
            hanzi: '粽子',
            pinyin: 'zòngzi',
            translation: 'zongzi (rice dumpling)',
            translationFr: 'zongzi (boulette de riz)'
          }
        ]
      },
      {
        id: 'dragon-boats',
        title: 'Les Courses de Bateaux-Dragons',
        titleEn: 'Dragon Boat Races',
        content: `Les courses de bateaux-dragons (赛龙舟) sont la principale activité. Ces longs bateaux décorés de têtes de dragon nécessitent 20-50 rameurs synchronisés au rythme des tambours. C'est un sport spectaculaire qui attire des foules immenses.`,
        contentEn: `Dragon boat races (赛龙舟) are the main activity. These long boats decorated with dragon heads require 20-50 rowers synchronized to drum beats. It's a spectacular sport that attracts huge crowds.`,
        examples: [
          {
            hanzi: '赛龙舟',
            pinyin: 'sàilóngzhōu',
            translation: 'dragon boat race',
            translationFr: 'course de bateaux-dragons'
          },
          {
            hanzi: '龙舟',
            pinyin: 'lóngzhōu',
            translation: 'dragon boat',
            translationFr: 'bateau-dragon'
          }
        ]
      }
    ],

    culturalNotes: [
      {
        type: 'tip',
        content: `Si vous visitez la Chine pendant le Duanwu, goûtez les zongzi des différentes régions ! Ceux du Nord sont généralement sucrés, ceux du Sud sont salés.`,
        contentEn: `If you visit China during Duanwu, taste zongzi from different regions! Those from the North are generally sweet, those from the South are savory.`
      },
      {
        type: 'fun-fact',
        content: `Les courses de bateaux-dragons sont maintenant un sport international avec des compétitions mondiales. Hong Kong organise l'une des plus grandes courses au monde.`,
        contentEn: `Dragon boat races are now an international sport with world competitions. Hong Kong hosts one of the world's largest races.`
      },
      {
        type: 'history',
        content: `La Fête des Bateaux-Dragons a plus de 2000 ans d'histoire et fait partie du patrimoine culturel immatériel de l'UNESCO depuis 2009.`,
        contentEn: `The Dragon Boat Festival has over 2000 years of history and has been part of UNESCO's Intangible Cultural Heritage since 2009.`
      }
    ],

    vocabulary: ['端午节', '粽子', '龙舟', '屈原', '赛龙舟', '糯米'],

    tags: ['festival', 'tradition', 'nourriture', 'sport', 'histoire'],

    quiz: {
      questions: [
        {
          question: "Qui la Fête des Bateaux-Dragons commémore-t-elle ?",
          questionEn: "Who does the Dragon Boat Festival commemorate?",
          choices: ["Un empereur", "Un poète nommé Qu Yuan", "Un général", "Un moine"],
          choicesEn: ["An emperor", "A poet named Qu Yuan", "A general", "A monk"],
          correctIndex: 1,
          explanation: "La fête commémore Qu Yuan, un poète et ministre qui s'est jeté dans une rivière.",
          explanationEn: "The festival commemorates Qu Yuan, a poet and minister who threw himself into a river."
        },
        {
          question: "Que mange-t-on traditionnellement pendant cette fête ?",
          questionEn: "What is traditionally eaten during this festival?",
          choices: ["Des gâteaux de lune", "Des zongzi", "Des raviolis", "Des nouilles"],
          choicesEn: ["Mooncakes", "Zongzi", "Dumplings", "Noodles"],
          correctIndex: 1,
          explanation: "Les zongzi sont des boulettes de riz gluant enveloppées dans des feuilles de bambou.",
          explanationEn: "Zongzi are glutinous rice dumplings wrapped in bamboo leaves."
        },
        {
          question: "Quelle est l'activité principale de la fête ?",
          questionEn: "What is the main activity of the festival?",
          choices: [
            "Admirer la lune",
            "Courses de bateaux-dragons",
            "Feux d'artifice",
            "Danse du lion"
          ],
          choicesEn: [
            "Admire the moon",
            "Dragon boat races",
            "Fireworks",
            "Lion dance"
          ],
          correctIndex: 1,
          explanation: "Les courses de bateaux-dragons (赛龙舟) sont l'activité emblématique de cette fête.",
          explanationEn: "Dragon boat races (赛龙舟) are the emblematic activity of this festival."
        },
        {
          question: "Quand se célèbre la Fête des Bateaux-Dragons ?",
          questionEn: "When is the Dragon Boat Festival celebrated?",
          choices: [
            "5e jour du 5e mois lunaire",
            "15e jour du 8e mois lunaire",
            "1er jour du 1er mois lunaire",
            "15e jour du 1er mois lunaire"
          ],
          choicesEn: [
            "5th day of 5th lunar month",
            "15th day of 8th lunar month",
            "1st day of 1st lunar month",
            "15th day of 1st lunar month"
          ],
          correctIndex: 0,
          explanation: "La fête se célèbre le 5e jour du 5e mois lunaire (d'où le nom 端午 Duānwǔ).",
          explanationEn: "The festival is celebrated on the 5th day of the 5th lunar month (hence the name 端午 Duānwǔ)."
        },
        {
          question: "Dans quoi sont enveloppés les zongzi ?",
          questionEn: "What are zongzi wrapped in?",
          choices: [
            "Feuilles de lotus",
            "Feuilles de bambou",
            "Papier de riz",
            "Feuilles de bananier"
          ],
          choicesEn: [
            "Lotus leaves",
            "Bamboo leaves",
            "Rice paper",
            "Banana leaves"
          ],
          correctIndex: 1,
          explanation: "Les zongzi sont traditionnellement enveloppés dans des feuilles de bambou.",
          explanationEn: "Zongzi are traditionally wrapped in bamboo leaves."
        }
      ]
    }
  }
];

// Fonctions helper
export const getCultureTopicsByCategory = (category: CultureCategory | 'all'): CultureItem[] => {
  if (category === 'all') {
    return cultureTopics;
  }
  return cultureTopics.filter(topic => topic.category === category);
};

export const getCultureTopicById = (id: string): CultureItem | undefined => {
  return cultureTopics.find(topic => topic.id === id);
};

export const getCultureTopicBySlug = (slug: string): CultureItem | undefined => {
  return cultureTopics.find(topic => topic.slug === slug);
};

export const getAllCategories = (): CultureCategory[] => {
  const categories = new Set(cultureTopics.map(t => t.category));
  return Array.from(categories);
};

export const getCategoryCounts = (): Record<CultureCategory | 'all', number> => {
  const counts: Record<string, number> = { all: cultureTopics.length };

  cultureTopics.forEach(topic => {
    counts[topic.category] = (counts[topic.category] || 0) + 1;
  });

  return counts as Record<CultureCategory | 'all', number>;
};
