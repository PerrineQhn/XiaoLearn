/**
 * blog-posts.ts — articles du blog XiaoLearn
 * -------------------------------------------
 * Format inspiré de seonsaengnim.com/blog :
 *   - hub avec filtres par catégorie + featured + grid
 *   - page article avec sommaire latéral + prose
 *
 * Contenu : un sous-ensemble pertinent pour le mandarin (au lieu du coréen).
 * Catégories : Vocabulaire / Grammaire / Culture / Conseils / HSK / Hanzi / C-Pop.
 *
 * Pour ajouter un article : suivre le schéma `BlogPost` ci-dessous. Le `slug`
 * sert d'URL (`/blog/{slug}`). Les `sections` rendent un sommaire automatique.
 */

export type BlogCategory =
  | 'vocabulaire'
  | 'grammaire'
  | 'culture'
  | 'conseils'
  | 'hsk'
  | 'hanzi'
  | 'cpop';

export interface BlogAuthor {
  name: string;
  avatar?: string;
}

/** Bloc atomique dans une section. */
export type BlogBlock =
  | { type: 'p'; text: string }
  | { type: 'h3'; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'ordered'; items: string[] }
  | { type: 'quote'; text: string; author?: string }
  | { type: 'callout'; tone?: 'info' | 'warning' | 'success'; text: string }
  | { type: 'example'; hanzi: string; pinyin: string; translationFr: string };

export interface BlogSection {
  title: string;
  blocks: BlogBlock[];
}

export interface BlogPost {
  slug: string;
  category: BlogCategory;
  title: string;
  /** Lead court affiché sur la card et en intro de l'article. */
  lead: string;
  publishedAt: string; // ISO
  readingMinutes: number;
  author: BlogAuthor;
  /** URL de l'image hero (Unsplash ou /blog/<file>). */
  heroImage?: string;
  /** Légende sous l'image hero (optionnel). */
  heroCaption?: string;
  /** Couleur dominante (fallback si pas d'image). */
  accentColor?: string;
  /** Texte d'intro avant la première section (au-dessus du sommaire). */
  intro?: string;
  sections: BlogSection[];
  /** Si true, mis en avant en tête du hub (1 seul recommandé). */
  featured?: boolean;
}

// Emojis choisis pour leur cohérence sémantique avec la catégorie :
//   📚 vocabulaire (livre = mots à apprendre)
//   ✍️  grammaire (écrire = structure de phrase)
//   🏮 culture (lanterne = symbole emblématique chinois)
//   🎵 cpop (note de musique = musique)
//   💡 conseils (ampoule = idée)
//   🎯 hsk (cible = certification, objectif)
//   汉 hanzi (le caractère "han" lui-même = caractères chinois)
export const BLOG_CATEGORIES: Array<{ key: BlogCategory; label: string; icon: string }> = [
  { key: 'vocabulaire', label: 'Vocabulaire', icon: '📚' },
  { key: 'grammaire', label: 'Grammaire', icon: '✍️' },
  { key: 'culture', label: 'Culture', icon: '🏮' },
  { key: 'cpop', label: 'C-Pop', icon: '🎵' },
  { key: 'conseils', label: 'Conseils', icon: '💡' },
  { key: 'hsk', label: 'HSK', icon: '🎯' },
  { key: 'hanzi', label: 'Hanzi', icon: '汉' }
];

export const BLOG_CATEGORY_LABEL: Record<BlogCategory, string> = {
  vocabulaire: 'VOCABULAIRE',
  grammaire: 'GRAMMAIRE',
  culture: 'CULTURE',
  conseils: 'CONSEILS',
  hsk: 'HSK',
  hanzi: 'HANZI',
  cpop: 'C-POP'
};

const DEFAULT_AUTHOR: BlogAuthor = {
  name: 'Perrine',
  avatar: '/profs/perrine.jpg'
};

// ============================================================================
//  ARTICLES
// ============================================================================

const POST_BONNE_NUIT: BlogPost = {
  slug: 'comment-dire-bonne-nuit-en-chinois',
  category: 'vocabulaire',
  title: 'Comment dire "bonne nuit" en chinois — 晚安 et les variantes selon le contexte',
  lead:
    'Découvrez toutes les façons de dire bonne nuit en chinois : 晚安, 做个好梦, 早点休息… Avec le bon niveau de politesse selon la personne à qui vous parlez.',
  publishedAt: '2026-05-12',
  readingMinutes: 9,
  author: DEFAULT_AUTHOR,
  heroImage:
    'https://images.unsplash.com/photo-1474181487882-5abf3f0ba6c2?w=1600&q=80',
  heroCaption: 'Skyline de Shanghai la nuit — le moment idéal pour souhaiter 晚安',
  intro:
    'Bonne nuit en chinois, ce n\'est pas une seule formule mais tout un système : selon que tu parles à un ami, à ton compagnon ou à ton patron, le mot change. Cet article passe en revue chaque variante avec audio natif et précise quand l\'utiliser sans faire de faux pas.',
  featured: true,
  sections: [
    {
      title: '晚安, le « bonne nuit » que tu dois mémoriser en premier',
      blocks: [
        {
          type: 'p',
          text: '晚安 (wǎn\'ān) est de très loin la formule la plus fréquente pour souhaiter bonne nuit en Chine. C\'est ce qu\'on dit avant d\'aller se coucher, à la fin d\'un appel vidéo en soirée, ou quand on quitte une réunion familiale tard le soir.'
        },
        {
          type: 'p',
          text: 'Littéralement, c\'est « soirée-paix ». Mais dans l\'usage moderne, c\'est juste un « bonne nuit » neutre, utilisable presque partout sauf entre intimes très proches qui préfèreront des formules plus chaleureuses.'
        },
        {
          type: 'callout',
          tone: 'info',
          text: 'Si tu n\'apprends qu\'une seule façon de dire bonne nuit en chinois, c\'est celle-là.'
        },
        {
          type: 'example',
          hanzi: '晚安',
          pinyin: 'wǎn\'ān',
          translationFr: 'bonne nuit (formule standard)'
        },
        {
          type: 'example',
          hanzi: '晚安，明天见',
          pinyin: 'wǎn\'ān, míngtiān jiàn',
          translationFr: 'bonne nuit, à demain'
        }
      ]
    },
    {
      title: '做个好梦 — fais de beaux rêves (entre proches)',
      blocks: [
        {
          type: 'p',
          text: '做个好梦 (zuò ge hǎo mèng) est l\'équivalent de « fais de beaux rêves ». Plus chaleureux que 晚安, on l\'utilise avec :'
        },
        {
          type: 'list',
          items: [
            'son compagnon ou sa compagne',
            'ses enfants',
            'des amis très proches dans un contexte intime',
            'sa famille (à la maison)'
          ]
        },
        {
          type: 'p',
          text: 'Avec un collègue, un commerçant ou quelqu\'un que tu connais peu, cette formule serait perçue comme trop familière. Reste sur 晚安.'
        },
        {
          type: 'example',
          hanzi: '做个好梦',
          pinyin: 'zuò ge hǎo mèng',
          translationFr: 'fais de beaux rêves (familier, chaleureux)'
        }
      ]
    },
    {
      title: '早点休息 — repose-toi vite (variante prévenante)',
      blocks: [
        {
          type: 'p',
          text: '早点休息 (zǎo diǎn xiūxi), littéralement « repose-toi tôt », est utilisé quand on s\'inquiète pour quelqu\'un qui travaille tard, qui est fatigué, qui couve quelque chose.'
        },
        {
          type: 'p',
          text: 'Ce n\'est pas tant une formule de politesse qu\'un signe d\'attention. Dans un couple chinois, c\'est très courant, beaucoup plus que 我爱你 d\'ailleurs.'
        },
        {
          type: 'example',
          hanzi: '早点休息',
          pinyin: 'zǎo diǎn xiūxi',
          translationFr: 'repose-toi vite (prévenant)'
        },
        {
          type: 'example',
          hanzi: '别熬夜',
          pinyin: 'bié áoyè',
          translationFr: 'ne fais pas de nuit blanche'
        }
      ]
    },
    {
      title: 'Au téléphone : 挂了 plutôt que 晚安',
      blocks: [
        {
          type: 'p',
          text: 'Au téléphone, juste avant de raccrocher en soirée, les Chinois disent souvent 挂了 (guà le) — littéralement « je raccroche », sans hostilité. C\'est l\'équivalent du « allez bisous » français. On peut enchaîner avec un 晚安.'
        },
        {
          type: 'example',
          hanzi: '好，挂了，晚安',
          pinyin: 'hǎo, guà le, wǎn\'ān',
          translationFr: 'bon, je raccroche, bonne nuit'
        }
      ]
    },
    {
      title: 'En contexte professionnel',
      blocks: [
        {
          type: 'p',
          text: 'Tu travailles tard avec ton boss ou un client important ? La politesse impose une formule plus distante. Voici les options classiques :'
        },
        {
          type: 'example',
          hanzi: '您早点休息',
          pinyin: 'nín zǎo diǎn xiūxi',
          translationFr: 'reposez-vous bien (politesse, à un aîné/supérieur)'
        },
        {
          type: 'example',
          hanzi: '辛苦了，晚安',
          pinyin: 'xīnkǔ le, wǎn\'ān',
          translationFr: 'merci pour ton dur travail, bonne nuit'
        },
        {
          type: 'p',
          text: '辛苦了 reconnait l\'effort fourni — c\'est très apprécié quand c\'est sincère.'
        }
      ]
    },
    {
      title: 'Mon conseil personnel',
      blocks: [
        {
          type: 'p',
          text: 'En tant qu\'apprenante du mandarin depuis plusieurs années, voici ce que je retiendrais si je devais résumer :'
        },
        {
          type: 'ordered',
          items: [
            'Mémorise 晚安 — c\'est ton couteau suisse.',
            'Apprends 做个好梦 pour tes proches.',
            'Garde 早点休息 dans ta poche pour montrer que tu te soucies.',
            'Évite les traductions littérales du français — « passe une bonne nuit » sonne très bizarrement traduit mot à mot.'
          ]
        },
        {
          type: 'quote',
          text: 'Un bon « bonne nuit » en chinois, ce n\'est pas une question de mot — c\'est une question de ton et de relation. Une fois ça compris, le reste suit.',
          author: 'Mei, professeure de mandarin à Shanghai'
        }
      ]
    },
    {
      title: 'Envie d\'aller plus loin en chinois ?',
      blocks: [
        {
          type: 'p',
          text: 'Sur XiaoLearn, tu peux apprendre tout ce vocabulaire en contexte, avec audio natif, exercices d\'écoute et flashcards à révision espacée. Le niveau A1 complet est gratuit — pas de carte bancaire pour commencer.'
        }
      ]
    }
  ]
};

const POST_GUIDE_HONNETE: BlogPost = {
  slug: 'apprendre-le-mandarin-en-2026-guide-honnete',
  category: 'conseils',
  title: 'Apprendre le mandarin en 2026 — Le guide honnête d\'une apprenante française',
  lead:
    'Après plusieurs années à étudier le mandarin et avoir testé toutes les méthodes possibles, voici le bilan objectif de ce qui marche vraiment — et ce qui te fera perdre du temps.',
  publishedAt: '2026-05-11',
  readingMinutes: 12,
  author: DEFAULT_AUTHOR,
  heroImage:
    'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?w=1600&q=80',
  heroCaption: 'Vue d\'un marché nocturne en Chine — l\'immersion bat toutes les méthodes',
  intro:
    'Si tu commences le mandarin en 2026 et que tu cherches LA méthode miracle, je vais te décevoir : il n\'y en a pas. En revanche, il y a des approches beaucoup plus efficaces que d\'autres. Voici mon retour d\'expérience honnête.',
  sections: [
    {
      title: 'Ce qui ne marche pas (et qu\'on continue à te vendre)',
      blocks: [
        {
          type: 'p',
          text: 'Avant de parler de ce qui marche, listons les mythes qui circulent depuis 20 ans et qui font perdre des mois à des apprenants débutants.'
        },
        {
          type: 'h3',
          text: 'Le mythe des « 1 000 caractères pour parler couramment »'
        },
        {
          type: 'p',
          text: 'Tu verras partout l\'argument « il suffit de connaître 1 000 caractères pour 95 % des textes courants ». Statistiquement vrai. Pratiquement faux. Connaître les caractères ne signifie pas savoir les mots qu\'ils forment. 好 + 看 = 好看 (joli) — facile, ok. Mais 风 + 头 = 风头 (vedette, gloire) ? La logique ne suffit pas.'
        },
        {
          type: 'h3',
          text: 'La méthode « apprendre 50 mots par jour avec une appli »'
        },
        {
          type: 'p',
          text: 'Sans contexte, sans audio, sans révision espacée correctement réglée, tu vas oublier 80 % de ce que tu apprends en 3 semaines. C\'est neurologique, pas une question de motivation.'
        },
        {
          type: 'callout',
          tone: 'warning',
          text: 'Une appli qui te fait ajouter 50 cartes par jour sans calibrer la révision te fabrique une dette mémorielle énorme.'
        }
      ]
    },
    {
      title: 'Ce qui marche vraiment',
      blocks: [
        {
          type: 'h3',
          text: '1. Maîtriser le pinyin et les tons AVANT les caractères'
        },
        {
          type: 'p',
          text: 'C\'est le piège classique : sauter sur les caractères pour le côté « cool ». Mauvais plan. Si tu ne maîtrises pas les 4 tons et les sons retroflex (zh, ch, sh) dès la première semaine, tu vas figer une prononciation approximative qui sera très dure à corriger plus tard.'
        },
        {
          type: 'h3',
          text: '2. Travailler l\'écoute massive très tôt'
        },
        {
          type: 'p',
          text: 'L\'oreille chinoise se développe par exposition pure. Cdramas en VO avec sous-titres pinyin, podcasts pour apprenants (Slow Chinese, ChinesePod), chansons C-Pop avec les paroles — tout est bon. 30 min par jour minimum, sans pression de tout comprendre.'
        },
        {
          type: 'h3',
          text: '3. Adopter une vraie SRS pour le vocabulaire'
        },
        {
          type: 'p',
          text: 'La répétition espacée (Spaced Repetition System) est la seule méthode scientifiquement prouvée pour mémoriser durablement. Anki, XiaoLearn, ou un autre — peu importe, mais utilise-le tous les jours.'
        },
        {
          type: 'h3',
          text: '4. Pratiquer activement avec un humain dès le jour 30'
        },
        {
          type: 'p',
          text: 'iTalki, échange linguistique avec un étudiant chinois en France, partenaire sur Hello Talk — peu importe le format. Tu dois sortir de la « passivité d\'app » dès que tu peux dire 你好 + ton prénom.'
        }
      ]
    },
    {
      title: 'Mon planning type pour quelqu\'un qui démarre',
      blocks: [
        {
          type: 'p',
          text: 'Voici la routine que je recommanderais à une débutante française qui vise HSK 2 (~1 272 mots cumulés selon le standard HSK 3.0) sur 9-12 mois avec 1h/jour de travail régulier :'
        },
        {
          type: 'ordered',
          items: [
            'Mois 1 : pinyin + 4 tons + ~100-150 mots de base + écoute passive 30 min/jour',
            'Mois 2 : 200 mots de plus + premiers caractères (~80-100) + écriture pinyin maîtrisée',
            'Mois 3 : grammaire de base (是, 有, 不, 没, 在) + dialogues simples + premier partenaire de conv',
            'Mois 4-6 : objectif HSK 1 complet (~500 mots, 300 caractères) + lecture/écriture caractères',
            'Mois 7-9 : transition HSK 2 + immersion vidéo (cdramas avec sous-titres) + écriture régulière',
            'Mois 10-12 : consolidation HSK 2 + premier exam blanc'
          ]
        },
        {
          type: 'callout',
          tone: 'success',
          text: 'Le rythme compte plus que la quantité. 30 min tous les jours bat 4h le samedi.'
        }
      ]
    },
    {
      title: 'Les ressources que j\'utilise au quotidien',
      blocks: [
        {
          type: 'list',
          items: [
            'XiaoLearn pour la grammaire structurée + flashcards SRS + Prof. Xiao IA',
            'Pleco pour le dictionnaire de poche (gratuit, indispensable)',
            'Du Chinese pour la lecture graduée (par niveau HSK)',
            'iTalki pour des cours hebdomadaires avec une prof native',
            'Bilibili pour les vlogs Chinois (équivalent YouTube)',
            'Hello Chinese pour la grammaire animée (complémentaire)'
          ]
        }
      ]
    },
    {
      title: 'Le mot de la fin',
      blocks: [
        {
          type: 'p',
          text: 'Apprendre le mandarin, c\'est un marathon, pas un sprint. Les premières semaines sont rudes (les tons, l\'écriture), mais à partir du 3e mois, tu commences à voir des progrès tangibles. Le 6e mois, tu peux tenir une conversation simple. Le 12e mois, tu lis des textes adaptés. Au 24e mois, tu regardes des dramas sans sous-titres si tu as bossé sérieusement.'
        },
        {
          type: 'p',
          text: 'Ne te compare pas aux polyglottes YouTube qui montrent leur 3e mois en B2. Soit ils mentent, soit ils trichent, soit ils ont 18 ans et 8h par jour. Pour la plupart d\'entre nous, c\'est plus lent et c\'est OK.'
        },
        {
          type: 'quote',
          text: 'La meilleure méthode pour apprendre le mandarin, c\'est celle que tu peux tenir 365 jours d\'affilée.',
          author: 'Ben Whately, fondateur de Memrise'
        }
      ]
    }
  ]
};

const POST_BONJOUR_AVANCE: BlogPost = {
  slug: 'comment-dire-bonjour-en-chinois-au-dela-de-nihao',
  category: 'vocabulaire',
  title: 'Comment dire bonjour en chinois — Et pourquoi 你好 n\'est que le début',
  lead:
    'Les manuels t\'apprennent 你好. Mais après plusieurs années en Chine, je peux te dire que les Chinois ont au moins 8 façons de se saluer selon le moment et la relation.',
  publishedAt: '2026-05-11',
  readingMinutes: 9,
  author: DEFAULT_AUTHOR,
  heroImage:
    'https://images.unsplash.com/photo-1538428494232-9c0d8a3ab403?w=1600&q=80',
  heroCaption: 'Tour Perle d\'Orient à Shanghai — où le mandarin moderne s\'invente chaque jour',
  intro:
    '你好 (nǐ hǎo) est ce qu\'on t\'apprend dans la première leçon de mandarin. Et c\'est correct. Mais c\'est aussi ce que ne dit jamais un Chinois quand il croise un proche ou un voisin. Petit tour des vraies salutations.',
  sections: [
    {
      title: 'Le problème avec 你好',
      blocks: [
        {
          type: 'p',
          text: '你好 est parfaitement correct, mais il est… froid. Entre Chinois proches, dire 你好 sonne aussi distant qu\'un « Bonjour Madame » à ton meilleur ami. C\'est la formule des inconnus, des contextes formels, du premier contact.'
        },
        {
          type: 'p',
          text: 'Dans la rue chinoise réelle, entre voisins, collègues du quotidien, amis, tu n\'entendras presque jamais 你好. À la place, voici ce qu\'on dit vraiment.'
        }
      ]
    },
    {
      title: '吃了吗 — la salutation traditionnelle par excellence',
      blocks: [
        {
          type: 'p',
          text: '吃了吗 (chī le ma), littéralement « tu as mangé ? », est l\'équivalent fonctionnel de « ça va ? » en France. Personne n\'attend une vraie réponse — c\'est juste une marque de politesse et de proximité.'
        },
        {
          type: 'p',
          text: 'L\'origine est historique : pendant les périodes de famine du XXe siècle, demander si quelqu\'un avait mangé était une vraie marque d\'attention. Aujourd\'hui c\'est devenu un rituel, mais le sens chaleureux persiste.'
        },
        {
          type: 'example',
          hanzi: '吃了吗？',
          pinyin: 'chī le ma',
          translationFr: 'tu as mangé ? (= comment ça va ?)'
        },
        {
          type: 'example',
          hanzi: '吃了，你呢？',
          pinyin: 'chī le, nǐ ne',
          translationFr: 'oui (j\'ai mangé), et toi ?'
        }
      ]
    },
    {
      title: 'Selon le moment de la journée',
      blocks: [
        {
          type: 'p',
          text: 'Comme en français, les Chinois ont des salutations spécifiques à chaque moment :'
        },
        {
          type: 'example',
          hanzi: '早',
          pinyin: 'zǎo',
          translationFr: 'salut (le matin, forme courte amicale)'
        },
        {
          type: 'example',
          hanzi: '早上好',
          pinyin: 'zǎoshang hǎo',
          translationFr: 'bonjour (le matin, forme complète)'
        },
        {
          type: 'example',
          hanzi: '下午好',
          pinyin: 'xiàwǔ hǎo',
          translationFr: 'bon après-midi'
        },
        {
          type: 'example',
          hanzi: '晚上好',
          pinyin: 'wǎnshang hǎo',
          translationFr: 'bonsoir (à partir de 18h)'
        },
        {
          type: 'p',
          text: 'Note : 中午好 (zhōngwǔ hǎo, « bonjour de midi ») existe en théorie mais est très peu utilisé à l\'oral.'
        }
      ]
    },
    {
      title: 'Entre amis : 嗨, 嘿, ou juste le prénom',
      blocks: [
        {
          type: 'p',
          text: 'Avec des amis proches, des collègues qu\'on voit tous les jours, ou la jeune génération, on simplifie au maximum :'
        },
        {
          type: 'example',
          hanzi: '嗨',
          pinyin: 'hāi',
          translationFr: 'salut (emprunt à l\'anglais "hi")'
        },
        {
          type: 'example',
          hanzi: '嘿',
          pinyin: 'hēi',
          translationFr: 'hé ! (pour attirer l\'attention)'
        },
        {
          type: 'p',
          text: 'Et très souvent, on saute carrément la salutation pour passer directement au prénom : « 小李, » (xiǎo lǐ, « petit Li ») suffit. C\'est rude en surface mais en fait c\'est un signe de proximité.'
        }
      ]
    },
    {
      title: 'En contexte professionnel : 您好 et les titres',
      blocks: [
        {
          type: 'p',
          text: '您 (nín) est le « vous » de politesse, à utiliser systématiquement avec :'
        },
        {
          type: 'list',
          items: [
            'des aînés (significativement plus âgés)',
            'des supérieurs hiérarchiques',
            'des clients ou prestataires importants',
            'le premier contact d\'un échange professionnel'
          ]
        },
        {
          type: 'example',
          hanzi: '王经理，您好',
          pinyin: 'wáng jīnglǐ, nín hǎo',
          translationFr: 'bonjour, directeur Wang'
        },
        {
          type: 'p',
          text: 'L\'ajout du titre (经理 = directeur, 老师 = professeur, 医生 = médecin, etc.) après le nom de famille est très important en Chine. Sauter le titre pour passer au prénom directement est perçu comme familier voire impoli.'
        }
      ]
    },
    {
      title: 'Mon conseil pratique',
      blocks: [
        {
          type: 'ordered',
          items: [
            'Avec un inconnu adulte : 您好',
            'Dans un contexte neutre (magasin, métro) : 你好',
            'Au matin avec un proche : 早 ou 早上好',
            'Avec un ami : juste son prénom, ou 嗨',
            'Avec quelqu\'un qu\'on croise au quotidien : 吃了吗 (sans attendre de vraie réponse)'
          ]
        },
        {
          type: 'p',
          text: 'Le secret n\'est pas de tout connaître par cœur, c\'est d\'écouter ce que les autres disent et de calquer.'
        }
      ]
    }
  ]
};

const POST_FELICITATIONS: BlogPost = {
  slug: 'comment-dire-felicitations-en-chinois',
  category: 'vocabulaire',
  title: 'Comment dire "félicitations" en chinois — 恭喜, mariages, diplômes et fête du printemps',
  lead:
    'Apprenez toutes les façons de dire félicitations en chinois : 恭喜, 祝贺, 恭喜发财. Découvrez aussi la culture des enveloppes rouges et les expressions pour chaque occasion.',
  publishedAt: '2026-05-10',
  readingMinutes: 9,
  author: DEFAULT_AUTHOR,
  heroImage:
    'https://images.unsplash.com/photo-1612201598945-f66a763965bd?w=1600&q=80',
  heroCaption: 'Toit traditionnel d\'un temple chinois — les célébrations ont une culture riche',
  intro:
    'Féliciter quelqu\'un en chinois, ce n\'est pas qu\'un mot — c\'est tout un système culturel avec ses formules, ses enveloppes rouges, ses codes. Voici le tour d\'horizon.',
  sections: [
    {
      title: 'Féliciter quelqu\'un en chinois : plus qu\'un simple mot',
      blocks: [
        {
          type: 'p',
          text: 'La première fois que j\'ai assisté à un mariage chinois, j\'étais complètement perdue. Pas à cause de la cérémonie — elle dure à peine 30 minutes — mais parce que je ne savais pas quoi dire, combien mettre dans l\'enveloppe rouge, ni comment me comporter. Voici ce que j\'aurais aimé savoir.'
        }
      ]
    },
    {
      title: '恭喜 (gōngxǐ) — Félicitations entre amis',
      blocks: [
        {
          type: 'h3',
          text: 'Quand l\'utiliser ?'
        },
        {
          type: 'list',
          items: [
            'avec vos amis proches',
            'entre collègues du même âge avec qui vous êtes intime',
            'dans les messages décontractés (WeChat, etc.)',
            'sur les réseaux sociaux entre amis'
          ]
        },
        {
          type: 'example',
          hanzi: '恭喜',
          pinyin: 'gōngxǐ',
          translationFr: 'félicitations (familier)'
        },
        {
          type: 'example',
          hanzi: '恭喜你！',
          pinyin: 'gōngxǐ nǐ',
          translationFr: 'félicitations à toi !'
        },
        {
          type: 'p',
          text: 'C\'est la forme la plus décontractée. 恭 signifie « respect » et 喜 « joie ». Littéralement : « je te respecte dans ta joie ».'
        }
      ]
    },
    {
      title: '祝贺 (zhùhè) — La version polie standard',
      blocks: [
        {
          type: 'h3',
          text: 'Quand l\'utiliser ?'
        },
        {
          type: 'list',
          items: [
            'à un collègue plus âgé ou à votre supérieur',
            'dans un email professionnel',
            'lors d\'une cérémonie officielle',
            'à quelqu\'un que vous ne connaissez pas très bien'
          ]
        },
        {
          type: 'example',
          hanzi: '祝贺您',
          pinyin: 'zhùhè nín',
          translationFr: 'mes félicitations (politesse)'
        },
        {
          type: 'example',
          hanzi: '衷心祝贺',
          pinyin: 'zhōngxīn zhùhè',
          translationFr: 'sincères félicitations'
        }
      ]
    },
    {
      title: '恭喜发财 — La formule du Nouvel An chinois',
      blocks: [
        {
          type: 'p',
          text: 'Pendant le 春节 (Fête du Printemps), 恭喜发财 (gōngxǐ fācái) est LA formule standard. Littéralement : « félicitations et prospérité ». Tu l\'entendras partout pendant les 15 jours du nouvel an.'
        },
        {
          type: 'p',
          text: 'La réponse traditionnelle est 红包拿来 (hóngbāo nálái, « donne-moi l\'enveloppe rouge »), une réponse plaisante surtout dite par les enfants aux adultes.'
        },
        {
          type: 'example',
          hanzi: '恭喜发财',
          pinyin: 'gōngxǐ fācái',
          translationFr: 'bonne année (lit. félicitations et richesse)'
        },
        {
          type: 'example',
          hanzi: '新年快乐',
          pinyin: 'xīnnián kuàilè',
          translationFr: 'bonne année (forme plus universelle)'
        }
      ]
    },
    {
      title: 'Les occasions de féliciter en Chine',
      blocks: [
        {
          type: 'h3',
          text: 'Mariage — 结婚'
        },
        {
          type: 'example',
          hanzi: '结婚恭喜',
          pinyin: 'jiéhūn gōngxǐ',
          translationFr: 'félicitations pour le mariage'
        },
        {
          type: 'example',
          hanzi: '百年好合',
          pinyin: 'bǎinián hǎohé',
          translationFr: '100 ans d\'union heureuse (vœu classique)'
        },
        {
          type: 'h3',
          text: 'Diplôme — 毕业'
        },
        {
          type: 'example',
          hanzi: '毕业快乐',
          pinyin: 'bìyè kuàilè',
          translationFr: 'joyeux diplôme'
        },
        {
          type: 'h3',
          text: 'Promotion — 升职'
        },
        {
          type: 'example',
          hanzi: '升职快乐',
          pinyin: 'shēngzhí kuàilè',
          translationFr: 'félicitations pour ta promotion'
        },
        {
          type: 'h3',
          text: 'Anniversaire — 生日'
        },
        {
          type: 'example',
          hanzi: '生日快乐',
          pinyin: 'shēngrì kuàilè',
          translationFr: 'joyeux anniversaire'
        }
      ]
    },
    {
      title: 'L\'étiquette des félicitations en Chine',
      blocks: [
        {
          type: 'h3',
          text: 'Le langage corporel'
        },
        {
          type: 'p',
          text: 'En Chine, le hug à la française est rare. Pour féliciter, on serre la main fermement, on tend les deux mains pour un cadeau, ou on hoche la tête avec un sourire chaleureux. Garder une distance respectueuse, surtout avec les aînés.'
        },
        {
          type: 'h3',
          text: 'L\'humilité chinoise'
        },
        {
          type: 'p',
          text: 'Si on te félicite, la réponse polie n\'est pas « merci » direct mais une forme d\'humilité : 哪里哪里 (nǎli nǎli, « mais non, mais non »), 不敢当 (bù gǎn dāng, « je n\'ose accepter »). Le « merci direct » 谢谢 est devenu acceptable chez les jeunes mais reste perçu comme un peu présomptueux par la génération précédente.'
        },
        {
          type: 'h3',
          text: 'Timing'
        },
        {
          type: 'p',
          text: 'Pour un mariage, féliciter avant la cérémonie, jamais après (porte malchance). Pour un diplôme, le jour-même ou les jours suivants. Pour le Nouvel An, du premier jour jusqu\'au 15e (Fête des Lanternes).'
        }
      ]
    },
    {
      title: 'Mon conseil personnel',
      blocks: [
        {
          type: 'p',
          text: 'Si tu hésites entre plusieurs formules, choisis toujours la plus polie. Personne ne t\'en voudra d\'être « trop poli ». L\'inverse est vrai aussi.'
        },
        {
          type: 'p',
          text: 'Et si tu vas à un mariage : 600 ¥ minimum dans l\'enveloppe rouge si tu connais peu les mariés, 800-1200 ¥ pour des amis proches, et plus si tu en as les moyens. Le chiffre doit être un nombre pair (sauf 4 qui porte malheur car homophone de « mort »). 200, 600, 800, 1000, 1200, 1600 sont des montants safe.'
        },
        {
          type: 'callout',
          tone: 'info',
          text: 'Le 4 est tabou en Chine — évite à tout prix de mettre 400 ¥ ou 4 000 ¥ dans une enveloppe rouge.'
        }
      ]
    }
  ]
};

const POST_HANZI: BlogPost = {
  slug: 'apprendre-les-caracteres-chinois-en-partant-des-radicaux',
  category: 'hanzi',
  title: 'Hanzi (汉字) — Apprendre à lire le chinois en partant des radicaux',
  lead:
    'Les caractères chinois ne sont pas un alphabet, mais ils ne sont pas non plus aléatoires. Comprendre les 214 radicaux te donne la clé pour décoder n\'importe quel hanzi en quelques mois.',
  publishedAt: '2026-05-10',
  readingMinutes: 11,
  author: DEFAULT_AUTHOR,
  heroImage:
    'https://images.unsplash.com/photo-1546638008-efbe0b62c730?w=1600&q=80',
  heroCaption: 'Calligraphie chinoise en cours — chaque trait suit un ordre précis',
  intro:
    'Le mythe des caractères chinois « impossibles à apprendre » mérite d\'être déconstruit. Oui, il faut du temps. Non, ce n\'est pas insurmontable. La méthode des radicaux te fait gagner des années.',
  sections: [
    {
      title: 'Le mythe et la réalité',
      blocks: [
        {
          type: 'p',
          text: 'On t\'a dit qu\'il fallait connaître 5 000 caractères pour lire un journal. C\'est vrai. On t\'a dit que chaque caractère était à mémoriser un par un. C\'est faux.'
        },
        {
          type: 'p',
          text: 'Les caractères chinois sont composés à 80-90 % de combinaisons de blocs réutilisables qu\'on appelle des radicaux (部首). Il y en a 214 au total, et une fois que tu en connais 50-80, tu peux deviner la prononciation OU le sens de la moitié des caractères inconnus que tu croises.'
        }
      ]
    },
    {
      title: 'Comment fonctionnent les caractères composés',
      blocks: [
        {
          type: 'p',
          text: 'La grande majorité des caractères chinois sont des caractères pictophonétiques (形声字). Ils combinent deux composants :'
        },
        {
          type: 'list',
          items: [
            'Un composant sémantique qui donne le sens (le radical)',
            'Un composant phonétique qui donne la prononciation (la "clé")'
          ]
        },
        {
          type: 'h3',
          text: 'Exemple : 妈 (mā, maman)'
        },
        {
          type: 'p',
          text: '妈 = 女 (femme, sens) + 马 (mǎ, son). Donc « la femme qui sonne mǎ ». Tu peux deviner le sens (féminin) et la prononciation (ma) sans jamais avoir vu le caractère.'
        },
        {
          type: 'h3',
          text: 'Exemple : 河 (hé, rivière)'
        },
        {
          type: 'p',
          text: '河 = 氵(eau, sens) + 可 (kě, son). « Eau qui sonne kě »... avec quelques nuances tonales. Mais quand tu vois 氵 dans un caractère, c\'est presque toujours lié à l\'eau (海 mer, 湖 lac, 泉 source).'
        }
      ]
    },
    {
      title: 'Les 30 radicaux les plus utiles',
      blocks: [
        {
          type: 'p',
          text: 'Si tu dois commencer quelque part, commence ici. Ces 30 radicaux apparaissent dans la majorité des caractères courants :'
        },
        {
          type: 'list',
          items: [
            '人 / 亻 — personne (他 il, 你 tu, 们 marque du pluriel)',
            '女 — femme (好 bien, 妈 maman, 姐 grande sœur)',
            '口 — bouche (吃 manger, 喝 boire, 叫 appeler)',
            '心 / 忄 — cœur (想 penser, 怕 craindre, 忙 occupé)',
            '水 / 氵— eau (海 mer, 河 rivière, 湖 lac)',
            '火 / 灬 — feu (热 chaud, 烧 brûler, 灯 lampe)',
            '木 — bois (林 forêt, 树 arbre, 桌 table)',
            '日 — soleil/jour (明 brillant, 时 heure, 春 printemps)',
            '月 — lune/chair (有 avoir, 朋 ami, 期 période)',
            '手 / 扌 — main (打 frapper, 找 chercher, 拿 prendre)'
          ]
        },
        {
          type: 'p',
          text: 'Et 20 autres essentiels : 言/讠 (parole), 食/饣 (manger), 金/钅 (métal), 草 (herbe), 田 (champ), 走 (marcher), 车 (véhicule), 门 (porte), 雨 (pluie), 衣/衤 (vêtement), 目 (œil), 耳 (oreille), 足 (pied), 山 (montagne), 石 (pierre), 玉 (jade), 力 (force), 大 (grand), 小 (petit), 一 (un).'
        }
      ]
    },
    {
      title: 'L\'ordre des traits — pourquoi ça compte',
      blocks: [
        {
          type: 'p',
          text: 'Quand tu écris un caractère, tu suis un ordre précis. Ce n\'est pas une lubie esthétique. L\'ordre canonique :'
        },
        {
          type: 'ordered',
          items: [
            'De haut en bas',
            'De gauche à droite',
            'Trait horizontal avant trait vertical (qui le croise)',
            'L\'extérieur avant l\'intérieur',
            'On ferme la boîte en dernier'
          ]
        },
        {
          type: 'p',
          text: 'Pourquoi c\'est important ? Parce que la reconnaissance manuscrite, les méthodes d\'entrée stylo (sur smartphone), la calligraphie, tout dépend de cet ordre. Et surtout : ça te force à voir le caractère comme une composition logique, pas un dessin aléatoire.'
        },
        {
          type: 'callout',
          tone: 'success',
          text: 'Apprends les 10 règles d\'ordre des traits en 30 minutes. Tu gagneras 6 mois sur ton apprentissage.'
        }
      ]
    },
    {
      title: 'Combien de temps pour combien de caractères ?',
      blocks: [
        {
          type: 'p',
          text: 'Repères basés sur les standards officiels HSK 3.0 (publiés par le Hanban en 2021). Comptez 30 à 60 min/jour avec une méthode SRS sérieuse :'
        },
        {
          type: 'list',
          items: [
            '~300 caractères en 6 mois (HSK 1, niveau survie : se présenter, demander un prix)',
            '~600 caractères en 1 an (HSK 2, lecture de menus, panneaux, conversations basiques)',
            '~900 caractères en 18 mois (HSK 3, lecture de textes adaptés)',
            '~1 200 caractères en 2 ans (HSK 4, articles courts, dialogues quotidiens)',
            '~1 800 caractères en 3-4 ans (HSK 6, lecture journalistique de surface)',
            '~3 000 caractères en 5+ ans (HSK 7-9, lecture courante de littérature)'
          ]
        },
        {
          type: 'p',
          text: 'À titre de comparaison, un Chinois adulte instruit en reconnaît 6 000 à 8 000 caractères passifs, mais en écrit activement environ 4 000. Avec les ~3 000 du HSK 9, tu fonctionnes dans la grande majorité des situations courantes.'
        }
      ]
    },
    {
      title: 'Mes outils favoris pour mémoriser',
      blocks: [
        {
          type: 'list',
          items: [
            'XiaoLearn pour la décomposition radicaux + audio + flashcards SRS',
            'Skritter (payant) pour s\'entraîner à écrire à la main',
            'Pleco (gratuit) pour le dictionnaire de poche avec décomposition',
            'Outlier Linguistics pour les origines historiques des caractères (avancé)'
          ]
        },
        {
          type: 'quote',
          text: 'Un caractère, ce n\'est pas un dessin. C\'est une histoire compressée en 5-15 traits. Apprends-le comme une histoire et il te marquera à vie.',
          author: 'James Heisig, auteur de Remembering the Hanzi'
        }
      ]
    }
  ]
};

const POST_4_TONS: BlogPost = {
  slug: 'maitriser-les-4-tons-du-mandarin',
  category: 'hanzi',
  title: 'Maîtriser les 4 tons du mandarin — Le guide définitif pour ton oreille française',
  lead:
    'Les 4 tons font la différence entre maman (妈) et cheval (马). Voici comment les entendre, les reproduire et arrêter de paniquer.',
  publishedAt: '2026-05-09',
  readingMinutes: 10,
  author: DEFAULT_AUTHOR,
  heroImage:
    'https://images.unsplash.com/photo-1545038522-9bb451739ab9?w=1600&q=80',
  heroCaption: 'Caractères chinois en gros plan — où chaque syllabe change de sens selon le ton',
  intro:
    'Le mandarin est une langue tonale. Cela signifie qu\'une même syllabe (par exemple "ma") peut avoir 5 significations totalement différentes selon la mélodie utilisée pour la prononcer. C\'est ce qui terrifie le plus les apprenants francophones — et à juste titre. Mais avec la bonne méthode, ça devient intuitif en 2-3 mois.',
  sections: [
    {
      title: 'Pourquoi les tons sont essentiels',
      blocks: [
        {
          type: 'p',
          text: 'Avant tout, démontrons pourquoi tu ne peux pas zapper les tons. Voici la syllabe "ma" dans 5 versions :'
        },
        { type: 'example', hanzi: '妈 (mā)', pinyin: '1er ton — plat haut', translationFr: 'maman' },
        { type: 'example', hanzi: '麻 (má)', pinyin: '2e ton — montant', translationFr: 'chanvre / engourdi' },
        { type: 'example', hanzi: '马 (mǎ)', pinyin: '3e ton — descendant-montant', translationFr: 'cheval' },
        { type: 'example', hanzi: '骂 (mà)', pinyin: '4e ton — descendant', translationFr: 'gronder, insulter' },
        { type: 'example', hanzi: '吗 (ma)', pinyin: 'neutre — sans accent', translationFr: 'particule interrogative' },
        {
          type: 'callout',
          tone: 'warning',
          text: 'Si tu dis "Wǒ ài mǎ" au lieu de "Wǒ ài mā" à quelqu\'un, tu déclares ton amour à un cheval au lieu d\'une mère. C\'est aussi simple que ça.'
        }
      ]
    },
    {
      title: 'Le 1er ton (ā) — plat haut',
      blocks: [
        {
          type: 'p',
          text: 'C\'est le ton le plus facile pour les Français : une note tenue, aiguë et stable. Comme si tu chantonnais "lalala" sur une seule note.'
        },
        {
          type: 'h3',
          text: 'Astuce mnémonique'
        },
        {
          type: 'p',
          text: 'Imagine que tu fais "aaaaah" chez le dentiste qui regarde ta gorge. C\'est exactement cette tension stable.'
        },
        { type: 'example', hanzi: '妈', pinyin: 'mā', translationFr: 'maman' },
        { type: 'example', hanzi: '高', pinyin: 'gāo', translationFr: 'haut, grand' },
        { type: 'example', hanzi: '飞', pinyin: 'fēi', translationFr: 'voler' }
      ]
    },
    {
      title: 'Le 2e ton (á) — montant',
      blocks: [
        {
          type: 'p',
          text: 'Le 2e ton monte du milieu vers le haut. C\'est exactement la mélodie d\'une question incrédule en français : "Quoi ?" ou "Vraiment ?". Cette familiarité aide énormément.'
        },
        {
          type: 'h3',
          text: 'Astuce mnémonique'
        },
        {
          type: 'p',
          text: 'Pense à "Hein ?" français. Cette inflexion vers le haut, c\'est ton 2e ton.'
        },
        { type: 'example', hanzi: '麻', pinyin: 'má', translationFr: 'chanvre' },
        { type: 'example', hanzi: '来', pinyin: 'lái', translationFr: 'venir' },
        { type: 'example', hanzi: '学', pinyin: 'xué', translationFr: 'étudier' }
      ]
    },
    {
      title: 'Le 3e ton (ǎ) — le piège',
      blocks: [
        {
          type: 'p',
          text: 'Officiellement, le 3e ton descend puis remonte (en forme de V). En pratique, dans la parole rapide, il descend simplement (3e ton "à demi") sauf quand il termine une phrase.'
        },
        {
          type: 'callout',
          tone: 'info',
          text: 'Conseil pro : à l\'oral, le 3e ton sonne presque comme un grognement bas. Ne force pas la remontée — ce serait artificiel.'
        },
        {
          type: 'h3',
          text: 'Le sandhi du 3e ton'
        },
        {
          type: 'p',
          text: 'Règle importante : quand deux 3e tons se suivent, le PREMIER devient un 2e ton. Donc 你好 (nǐ hǎo) se prononce en réalité "ní hǎo" — même si on l\'écrit toujours avec deux 3e tons. C\'est universel et automatique chez les natifs.'
        },
        { type: 'example', hanzi: '马', pinyin: 'mǎ', translationFr: 'cheval' },
        { type: 'example', hanzi: '你好', pinyin: 'nǐ hǎo → ní hǎo', translationFr: 'bonjour (sandhi)' },
        { type: 'example', hanzi: '很好', pinyin: 'hěn hǎo → hén hǎo', translationFr: 'très bien (sandhi)' }
      ]
    },
    {
      title: 'Le 4e ton (à) — sec et tombant',
      blocks: [
        {
          type: 'p',
          text: 'Le 4e ton tombe brutalement du haut vers le bas. C\'est l\'équivalent d\'un ordre sec en français : "Stop !" ou "Non !".'
        },
        {
          type: 'h3',
          text: 'Astuce mnémonique'
        },
        {
          type: 'p',
          text: 'Pense à un capitaine qui aboie un ordre. Court, sec, autoritaire.'
        },
        { type: 'example', hanzi: '骂', pinyin: 'mà', translationFr: 'gronder' },
        { type: 'example', hanzi: '是', pinyin: 'shì', translationFr: 'être' },
        { type: 'example', hanzi: '不', pinyin: 'bù', translationFr: 'non, ne…pas' }
      ]
    },
    {
      title: 'Le ton neutre (a) — le ton "absent"',
      blocks: [
        {
          type: 'p',
          text: 'Le ton neutre, c\'est la 5e catégorie. Pas d\'accent, prononciation rapide et légère, presque comme un "shwa" du français. Il apparaît surtout sur :'
        },
        {
          type: 'list',
          items: [
            'des particules grammaticales (吗, 呢, 啊, 吧, 了)',
            'la 2e syllabe redoublée d\'un mot familier (妈妈 māma, 弟弟 dìdi)',
            'des suffixes (们, 子)'
          ]
        },
        { type: 'example', hanzi: '吗', pinyin: 'ma', translationFr: 'particule interrogative' },
        { type: 'example', hanzi: '妈妈', pinyin: 'māma', translationFr: 'maman (familier)' }
      ]
    },
    {
      title: 'Ma méthode pour s\'entraîner',
      blocks: [
        {
          type: 'ordered',
          items: [
            'Apprends d\'abord à RECONNAÎTRE les 4 tons à l\'oreille (1 semaine d\'écoute ciblée)',
            'Pratique des paires minimales avec ton prof ou une appli : mā/má, mǎ/mà, dī/dí, etc.',
            'Enregistre-toi et compare à l\'audio natif. La différence te frappera.',
            'Fais des chaînes de 4 mots avec les 4 tons : 妈麻马骂. Répète chaque jour.',
            'Apprends les sandhis avant qu\'ils deviennent un problème (3+3, 不+ton 4, 一+ton)'
          ]
        },
        {
          type: 'callout',
          tone: 'success',
          text: 'En 3 mois de pratique régulière (15 min/jour), ton oreille distingue les 4 tons. En 6 mois, tu les produits correctement de manière automatique.'
        }
      ]
    },
    {
      title: 'Les erreurs typiques des Français',
      blocks: [
        {
          type: 'list',
          items: [
            'Plier le 1er ton vers le bas en fin de mot (habitude française d\'intonation descendante)',
            'Confondre 2e et 3e tons (les deux "remontent" mais différemment)',
            'Forcer le 3e ton complet (V profond) au lieu du 3e ton à demi (descendant simple)',
            'Oublier le sandhi 3+3 → 2+3',
            'Mettre une intonation interrogative française à la fin (qui chamboule tous les tons)'
          ]
        },
        {
          type: 'quote',
          text: 'Les Français ont un avantage : leur langue n\'a pas d\'accent tonique fixe. Contrairement aux Anglais qui doivent désapprendre des habitudes de stress, les Français partent presque vierges.',
          author: 'Yu Hua, professeure de phonétique mandarine à l\'Inalco'
        }
      ]
    }
  ]
};

const POST_HSK: BlogPost = {
  slug: 'hsk-vs-tocfl-quelle-certification-mandarin',
  category: 'hsk',
  title: 'HSK ou TOCFL — Quelle certification de mandarin choisir en 2026 ?',
  lead:
    'Tu hésites entre le HSK chinois (continental) et le TOCFL taïwanais ? Voici les différences concrètes, les niveaux équivalents, et pour qui chaque examen est fait.',
  publishedAt: '2026-05-08',
  readingMinutes: 8,
  author: DEFAULT_AUTHOR,
  heroImage:
    'https://images.unsplash.com/photo-1551295022-de5522c94e08?w=1600&q=80',
  heroCaption: 'Salle d\'examen — passer une certification, c\'est aussi un rite de passage',
  intro:
    'Les certifications officielles de mandarin se résument à deux options principales : HSK (汉语水平考试) côté chinois continental, et TOCFL (華語文能力測驗) côté Taïwan. Chacun a ses avantages, ses pièges, et son public.',
  sections: [
    {
      title: 'Le HSK 3.0 — la référence internationale',
      blocks: [
        {
          type: 'p',
          text: 'Le HSK est créé par Hanban (Bureau du Conseil International de la Langue Chinoise) et reconnu mondialement, notamment par les universités, les employeurs en Chine continentale, et les ambassades pour des visas étudiants ou travail.'
        },
        {
          type: 'p',
          text: 'Depuis la refonte 2021 (HSK 3.0), il compte 9 niveaux : HSK 1-3 (élémentaire), HSK 4-6 (intermédiaire), HSK 7-9 (avancé). Pour comparaison, le HSK 4 correspond environ au CECR B1, le HSK 6 au C1.'
        },
        {
          type: 'h3',
          text: 'Format de l\'examen'
        },
        {
          type: 'list',
          items: [
            'Écrit + écoute, parfois oral selon niveau',
            'Caractères simplifiés (chinois continental)',
            'Pinyin sans tons aux niveaux 1-2, sans pinyin du tout dès HSK 3'
          ]
        }
      ]
    },
    {
      title: 'Le TOCFL — l\'alternative taïwanaise',
      blocks: [
        {
          type: 'p',
          text: 'Le TOCFL est l\'équivalent taïwanais. Reconnu à Taïwan, dans certaines universités occidentales, et utilisé pour les bourses du gouvernement taïwanais.'
        },
        {
          type: 'list',
          items: [
            'Caractères traditionnels (繁體字) par défaut',
            'Disponible aussi en simplifiés pour les apprenants',
            'Bopomofo (注音) comme alternative au pinyin (mais pinyin disponible)',
            '5 niveaux (Novice à Advanced)'
          ]
        }
      ]
    },
    {
      title: 'Le bon choix dépend de ton objectif',
      blocks: [
        {
          type: 'h3',
          text: 'Choisis le HSK si :'
        },
        {
          type: 'list',
          items: [
            'Tu veux étudier ou travailler en Chine continentale',
            'Tu apprends avec des manuels édités à Beijing/Shanghai',
            'Tu vises une carrière dans une multinationale avec lien Chine',
            'Tu veux la certification la plus universellement reconnue'
          ]
        },
        {
          type: 'h3',
          text: 'Choisis le TOCFL si :'
        },
        {
          type: 'list',
          items: [
            'Tu veux étudier à Taïwan (bourses MOFA très généreuses)',
            'Tu apprends les caractères traditionnels',
            'Tu vises Hong Kong (qui utilise aussi le traditionnel)',
            'Tu préfères la culture taïwanaise/cantonaise'
          ]
        }
      ]
    },
    {
      title: 'Tableau d\'équivalences (HSK 3.0 officiel)',
      blocks: [
        {
          type: 'p',
          text: 'Le standard HSK 3.0 (en vigueur depuis 2021) a notablement augmenté le nombre de mots requis par niveau par rapport à l\'ancien HSK 2.0. Voici les chiffres officiels cumulés annoncés par le Hanban :'
        },
        {
          type: 'list',
          items: [
            'HSK 1 ≈ CECR A1 — 500 mots, 300 caractères',
            'HSK 2 ≈ CECR A2 — 1 272 mots, 600 caractères',
            'HSK 3 ≈ CECR A2-B1 — 2 245 mots, 900 caractères',
            'HSK 4 ≈ CECR B1 — 3 245 mots, 1 200 caractères',
            'HSK 5 ≈ CECR B2 — 4 316 mots, 1 500 caractères',
            'HSK 6 ≈ CECR C1 — 5 456 mots, 1 800 caractères',
            'HSK 7-9 ≈ CECR C2 — 11 092 mots, 3 000 caractères'
          ]
        },
        {
          type: 'callout',
          tone: 'info',
          text: 'Si tu vois encore des chiffres bien plus bas (~150 mots pour HSK 1) sur d\'autres sites, ils datent de l\'ancien HSK 2.0. Le HSK 3.0 est plus exigeant.'
        }
      ]
    },
    {
      title: 'Mon conseil',
      blocks: [
        {
          type: 'p',
          text: 'En France, 90 % des apprenants passeront le HSK. C\'est la valeur sûre, et les centres d\'examen sont nombreux (Instituts Confucius, certaines universités). Le TOCFL en France est moins accessible (centres rares).'
        },
        {
          type: 'p',
          text: 'Vise HSK 3 dans ton année 1, HSK 4 dans ton année 2 si tu es rigoureuse. Au-delà du HSK 4 (B1), tu peux déjà voyager confortablement et tenir une conversation pro de base.'
        },
        {
          type: 'callout',
          tone: 'info',
          text: 'Conseil pratique : passe le HSK 3 avant de viser le 4 même si tu te sens "presque B1". Avoir des certifications intermédiaires sur ton CV vaut mieux qu\'un saut raté.'
        }
      ]
    }
  ]
};

const POST_CPOP: BlogPost = {
  slug: 'apprendre-le-mandarin-avec-la-c-pop-mandopop',
  category: 'cpop',
  title: 'C-Pop / Mandopop — 15 artistes pour apprendre le mandarin en chantant',
  lead:
    'La Mandopop offre des paroles claires, du vocabulaire émotionnel utile et une diction soignée. Des classiques de Teresa Teng à la scène indé R&B (邹沛沛, DP龙猪) et au guofeng moderne (赵方婧), voici 15 artistes pour t\'immerger sans douleur.',
  publishedAt: '2026-05-07',
  readingMinutes: 7,
  author: DEFAULT_AUTHOR,
  heroImage:
    'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1600&q=80',
  heroCaption: 'Concert à Taïpei — la C-Pop est un pont culturel et linguistique',
  intro:
    'Apprendre une langue avec de la musique, ça marche. La Mandopop (chinois mandarin) a l\'avantage d\'avoir des textes très lisibles, prononcés avec une diction soignée et un vocabulaire émotionnel qui revient dans la conversation quotidienne. Voici mes recommandations.',
  sections: [
    {
      title: 'Les classiques intemporels',
      blocks: [
        {
          type: 'h3',
          text: '1. 邓丽君 (Teresa Teng)'
        },
        {
          type: 'p',
          text: 'La voix mythique des années 70-80. Diction parfaite, vocabulaire poétique mais accessible. Commence par "月亮代表我的心" (yuèliang dàibiǎo wǒ de xīn) — "La lune représente mon cœur".'
        },
        {
          type: 'h3',
          text: '2. 周杰倫 (Jay Chou)'
        },
        {
          type: 'p',
          text: 'L\'icône taïwanaise des années 2000. Style hybride hip-hop/R&B. Plus rapide, plus exigeant pour l\'oreille, mais les paroles sont géniales. "稻香" (dàoxiāng) reste accessible pour les débutants.'
        }
      ]
    },
    {
      title: 'Les voix modernes (2010-2020)',
      blocks: [
        {
          type: 'h3',
          text: '3. 林俊傑 (JJ Lin)'
        },
        {
          type: 'p',
          text: 'Singapourien chantant en mandarin. Ballades émotionnelles avec un vocabulaire très "amour/séparation/espoir" — utile pour le quotidien sentimental.'
        },
        {
          type: 'h3',
          text: '4. 田馥甄 (Hebe Tien)'
        },
        {
          type: 'p',
          text: 'Anciennement S.H.E. Voix limpide, articulation impeccable. Idéale pour les débutants qui veulent entendre clairement chaque syllabe.'
        },
        {
          type: 'h3',
          text: '5. 五月天 (Mayday)'
        },
        {
          type: 'p',
          text: 'Groupe de rock taïwanais. Énergie pour booster ton apprentissage, paroles assez claires. "知足" (zhīzú) est un favori des débutants.'
        }
      ]
    },
    {
      title: 'La nouvelle vague (2020+)',
      blocks: [
        {
          type: 'h3',
          text: '6. 鄧紫棋 (G.E.M.)'
        },
        {
          type: 'p',
          text: 'Hong-kongaise, chante en mandarin. Voix puissante, paroles modernes. "光年之外" (guāngnián zhī wài) est un hit international.'
        },
        {
          type: 'h3',
          text: '7. 毛不易 (Mao Buyi)'
        },
        {
          type: 'p',
          text: 'Folk chinois moderne, paroles narratives. Plus posé, plus introspectif. Excellent pour comprendre des histoires racontées en chinois.'
        },
        {
          type: 'h3',
          text: '8. 王菲 (Faye Wong)'
        },
        {
          type: 'p',
          text: 'Légende, voix unique. Plus difficile au début mais sublime. Sa version de "夢中人" en mandarin est culte.'
        }
      ]
    },
    {
      title: 'Pour s\'amuser et apprendre l\'oral',
      blocks: [
        {
          type: 'h3',
          text: '9. 蕭敬騰 (Jam Hsiao)'
        },
        {
          type: 'p',
          text: 'Voix soul, parfait pour les ballades. Articulation soignée mais avec de l\'émotion — bon entre-deux pour intermédiaires.'
        },
        {
          type: 'h3',
          text: '10. 蔡依林 (Jolin Tsai)'
        },
        {
          type: 'p',
          text: 'La Madonna taïwanaise. Pop énergique avec des paroles parfois plus complexes (jeux de mots, références culturelles). Bon pour le niveau intermédiaire+.'
        }
      ]
    },
    {
      title: 'La scène indé / R&B continentale (2020+)',
      blocks: [
        {
          type: 'p',
          text: 'Au-delà des stars mainstream, la scène indé chinoise produit des artistes au phrasé R&B/hip-hop/electro qui valent largement le détour. Diction généralement claire, vocabulaire émotionnel moderne et phrasé jeune.'
        },
        {
          type: 'h3',
          text: '11. 邹沛沛 (Pairy Zou)'
        },
        {
          type: 'p',
          text: 'Artiste continentale signée chez Warner Music. Son hit "沉溺 (Chénnì) — 你让我的心不再结冰", en duo avec Pank, cumule des dizaines de millions d\'écoutes. Voix claire, phrasé R&B contemporain. À écouter aussi : "红线 (Hóngxiàn) — RED LINE", "梦臆 (Mèngyì)".'
        },
        {
          type: 'h3',
          text: '12. Pank'
        },
        {
          type: 'p',
          text: 'Artiste indé R&B chinois, environ 528 000 auditeurs mensuels sur Spotify. Souvent en duo avec 邹沛沛 ("沉溺", "红线"). Sa discographie solo comprend "讨厌下雨天" (2025), "致盲" (2025), "空白" (2025) et l\'album "平行世界的游戏" (2021). Style intimiste, idéal pour les ballades à écoute répétée.'
        },
        {
          type: 'h3',
          text: '13. 赵露思 (Zhao Lusi / Rosy Zhao)'
        },
        {
          type: 'p',
          text: 'Actrice principalement (The Romance of Tiger and Rose, Hidden Love 偷偷藏不住), elle chante aussi les génériques de ses propres dramas. "只想把你偷偷藏好" (générique de Hidden Love) compte 30M+ d\'écoutes sur Spotify. C\'est une bonne porte d\'entrée si tu regardes ses cdramas en parallèle — le contexte aide à mémoriser les paroles.'
        },
        {
          type: 'h3',
          text: '14. DP龙猪 (Dragon Pig)'
        },
        {
          type: 'p',
          text: 'De son vrai nom 李龙飞 (Li Longfei), né en 1988, diplômé de l\'Université de Chengdu. Fondateur du label Loyalty Music (忠诚音乐). Reconnaissable à sa "voix noire" (黑嗓) qui marie R&B, hip-hop et electro. Hits notables : "全部都是你" (All About You, 2017, ~73M plays sur YouTube), "风吹一夏" (Feng Chui Yi Xia, 2021), "翠花". Plus exigeant pour l\'oreille (débit rapide, slang) — niveau intermédiaire+.'
        },
        {
          type: 'h3',
          text: '15. 赵方婧 (Zhao Fangjing / Wimi)'
        },
        {
          type: 'p',
          text: 'Née en 1997 à Nanning (Guangxi), Zhao Fangjing est la voix principale du collectif **音阙诗听** (Yin Que Shi Ting), spécialisé dans la pop "guofeng" (国风) — un style qui marie sonorités traditionnelles chinoises et production moderne. Son tube "芒种" (Mángzhòng, "Grain in Ear") cumule plus de 399 millions d\'écoutes sur YouTube. La série des "24 termes solaires" (二十四节气) avec 立冬, 谷雨, 霜降 est un excellent point d\'entrée pour découvrir le calendrier traditionnel chinois ET le vocabulaire poétique. Diction claire, idéal débutant-intermédiaire.'
        },
        {
          type: 'callout',
          tone: 'info',
          text: 'Ces 5 artistes se trouvent sur Spotify, Apple Music, YouTube et NetEase Music. Les paroles sont disponibles sur QQ Music ou Musixmatch.'
        }
      ]
    },
    {
      title: 'Comment exploiter une chanson pour apprendre',
      blocks: [
        {
          type: 'ordered',
          items: [
            '1ère écoute : juste vibrer, sans regarder les paroles',
            '2e écoute : lire les paroles en pinyin (Lyricstify, NetEase Music)',
            '3e écoute : chercher 5 mots inconnus dans le dictionnaire',
            '4e écoute : chanter avec, même approximativement',
            'Bonus : chercher la signification culturelle (références, métaphores)'
          ]
        },
        {
          type: 'callout',
          tone: 'success',
          text: 'En une semaine sur une chanson, tu peux mémoriser 30-50 mots SANS effort conscient. La musique court-circuite la mémoire de travail.'
        }
      ]
    }
  ]
};

const POST_CHUNJIE: BlogPost = {
  slug: 'la-fete-du-printemps-chunjie-tout-savoir',
  category: 'culture',
  title: 'La Fête du Printemps (春节) — Tout ce qu\'il faut savoir sur le Nouvel An chinois',
  lead:
    'Pétards, enveloppes rouges, raviolis, danse du dragon… Le 春节 est la fête la plus importante de l\'année chinoise. Voici le mode d\'emploi complet.',
  publishedAt: '2026-05-06',
  readingMinutes: 11,
  author: DEFAULT_AUTHOR,
  heroImage:
    'https://images.unsplash.com/photo-1519181245277-cffeb31da2e3?w=1600&q=80',
  heroCaption: 'Lanternes rouges de la Fête du Printemps — symbole universel du Nouvel An chinois',
  intro:
    'Si tu n\'as jamais vécu un 春节 (chūn jié) en Chine, tu n\'as pas vu la Chine. Cette fête est l\'équivalent émotionnel d\'un Noël et d\'un Nouvel An français combinés, étalés sur 15 jours, avec des règles, des superstitions et un vocabulaire spécifique. Tour d\'horizon.',
  sections: [
    {
      title: 'Quand a lieu le 春节 ?',
      blocks: [
        {
          type: 'p',
          text: 'Le Nouvel An chinois suit le calendrier lunaire, donc la date change chaque année. Il tombe généralement entre le 21 janvier et le 20 février du calendrier grégorien. C\'est le premier jour du premier mois lunaire.'
        },
        { type: 'example', hanzi: '春节', pinyin: 'chūn jié', translationFr: 'Fête du Printemps' },
        { type: 'example', hanzi: '农历新年', pinyin: 'nónglì xīnnián', translationFr: 'Nouvel An lunaire' }
      ]
    },
    {
      title: 'Les 12 animaux du zodiaque chinois',
      blocks: [
        {
          type: 'p',
          text: 'Chaque année est associée à un animal selon un cycle de 12 ans. L\'ordre : Rat (鼠), Buffle (牛), Tigre (虎), Lapin (兔), Dragon (龙), Serpent (蛇), Cheval (马), Chèvre (羊), Singe (猴), Coq (鸡), Chien (狗), Cochon (猪).'
        },
        {
          type: 'p',
          text: '2026 est l\'année du Cheval (马). Si tu es né en 1990, 2002, 2014 ou 2026, c\'est ton année zodiacale (本命年, běnmìngnián) — une année à risque selon la tradition, où on porte du rouge pour se protéger.'
        }
      ]
    },
    {
      title: 'Les coutumes essentielles',
      blocks: [
        {
          type: 'h3',
          text: '红包 (hóngbāo) — Les enveloppes rouges'
        },
        {
          type: 'p',
          text: 'Tradition centrale : les adultes mariés donnent de l\'argent en enveloppe rouge aux enfants et aux jeunes célibataires de la famille. Montants évités : ceux contenant 4 (homophone de "mort"). Montants chanceux : avec 6, 8 (richesse) ou 9 (longévité).'
        },
        {
          type: 'h3',
          text: '春联 (chūnlián) — Les couplets de printemps'
        },
        {
          type: 'p',
          text: 'Des bandes de papier rouge calligraphiées avec des vœux. Collées des deux côtés des portes d\'entrée. La phrase classique : un vœu poétique gauche, son pendant droite, et 福 (fú, "bonheur") collé à l\'envers au milieu — car 倒 (dào, à l\'envers) sonne comme 到 (dào, arriver). Donc "le bonheur arrive".'
        },
        {
          type: 'h3',
          text: '年夜饭 (niányèfàn) — Le dîner de la veille'
        },
        {
          type: 'p',
          text: 'Le dîner du 除夕 (chúxī, veille du Nouvel An) est sacré. Toute la famille se réunit, souvent avec :'
        },
        {
          type: 'list',
          items: [
            '饺子 (jiǎozi) — raviolis, symboles d\'unité familiale (et forme de lingot d\'argent ancien)',
            '鱼 (yú) — poisson, car 鱼 sonne comme 余 "surplus, abondance"',
            '年糕 (niángāo) — gâteau de riz gluant, car sonne comme 年高 "année élevée"',
            '汤圆 (tāngyuán) — boules de riz gluant en soupe, symboles de réunion'
          ]
        }
      ]
    },
    {
      title: 'Pétards, dragons et la légende de Nian',
      blocks: [
        {
          type: 'p',
          text: 'Selon la légende, un monstre appelé 年 (Nián, qui signifie aussi "année") venait dévorer les villageois la nuit du Nouvel An. Les villageois ont découvert qu\'il craignait trois choses : la couleur rouge, le bruit fort et le feu. D\'où les pétards (鞭炮 biānpào), les lanternes rouges et les feux de dragons.'
        },
        {
          type: 'p',
          text: 'Aujourd\'hui les pétards sont interdits dans la plupart des grandes villes chinoises (pollution, sécurité), mais les dragons et lions de papier continuent de danser dans les rues. C\'est un spectacle à ne pas manquer si tu es en Chine pendant cette période.'
        }
      ]
    },
    {
      title: 'Les expressions à connaître',
      blocks: [
        { type: 'example', hanzi: '新年快乐', pinyin: 'xīnnián kuàilè', translationFr: 'bonne année' },
        { type: 'example', hanzi: '恭喜发财', pinyin: 'gōngxǐ fācái', translationFr: 'félicitations et prospérité' },
        { type: 'example', hanzi: '万事如意', pinyin: 'wàn shì rúyì', translationFr: 'que tout se passe comme tu le souhaites' },
        { type: 'example', hanzi: '身体健康', pinyin: 'shēntǐ jiànkāng', translationFr: 'bonne santé' },
        { type: 'example', hanzi: '红包拿来', pinyin: 'hóngbāo nálái', translationFr: 'donne-moi l\'enveloppe rouge ! (réponse plaisante)' }
      ]
    },
    {
      title: 'Ce qu\'on ne fait JAMAIS pendant les 7 premiers jours',
      blocks: [
        {
          type: 'list',
          items: [
            'Balayer le sol (= balayer la chance qui vient d\'entrer)',
            'Casser de la vaisselle (= rupture, malheur)',
            'Couper ses cheveux (= raccourcir sa vie)',
            'Pleurer (= toute l\'année sera triste)',
            'Emprunter ou prêter de l\'argent (= dépendance financière toute l\'année)',
            'Porter du noir ou du blanc (= deuil)'
          ]
        },
        {
          type: 'callout',
          tone: 'info',
          text: 'Si tu visites une famille chinoise pendant le 春节, apporte un cadeau emballé en rouge, évite le blanc/noir, et reste pour partager au moins un repas.'
        }
      ]
    }
  ]
};

const POST_LE: BlogPost = {
  slug: 'la-particule-le-en-chinois',
  category: 'grammaire',
  title: 'La particule 了 — Le guide pour enfin comprendre cette bête grammaticale',
  lead:
    '了 (le) est la particule qui terrifie tous les apprenants de mandarin. Voici comment décoder ses 2 usages principaux sans plus jamais paniquer.',
  publishedAt: '2026-05-05',
  readingMinutes: 9,
  author: DEFAULT_AUTHOR,
  heroImage:
    'https://images.unsplash.com/photo-1486303954368-398fea0e72cd?w=1600&q=80',
  heroCaption: 'Pinceau de calligraphie sur papier — la grammaire chinoise est ancrée dans l\'écriture',
  intro:
    'Si tu apprends le mandarin depuis quelques mois, tu as probablement été confrontée à 了 et tu as probablement été perdue. Bonne nouvelle : ses règles ne sont pas si compliquées une fois qu\'on a compris la différence entre 了 verbal et 了 final de phrase.',
  sections: [
    {
      title: 'Le problème de 了',
      blocks: [
        {
          type: 'p',
          text: 'En français, on conjugue. Le verbe "manger" devient "je mange / j\'ai mangé / je mangeais / j\'aurai mangé" selon le temps et l\'aspect. En chinois, le verbe ne change jamais. Pour exprimer ces nuances, on utilise des particules — dont 了 est la plus importante.'
        },
        {
          type: 'p',
          text: 'Mais 了 ne signifie PAS exactement "passé". Il marque un CHANGEMENT D\'ÉTAT ou un ACHÈVEMENT. Et il a 2 positions dans la phrase qui ont des sens différents.'
        }
      ]
    },
    {
      title: '了 verbal (juste après le verbe) — l\'action est complétée',
      blocks: [
        {
          type: 'p',
          text: 'Quand 了 vient juste après le verbe, il indique que l\'action est terminée. C\'est ce qu\'on appelle 了₁ ou "verbal 了".'
        },
        { type: 'example', hanzi: '我吃了一个苹果', pinyin: 'wǒ chī le yī gè píngguǒ', translationFr: 'j\'ai mangé une pomme' },
        { type: 'example', hanzi: '他买了三本书', pinyin: 'tā mǎi le sān běn shū', translationFr: 'il a acheté trois livres' },
        {
          type: 'callout',
          tone: 'warning',
          text: 'Attention : 了 verbal exige un objet quantifié (un nombre + un classificateur). Sans ça, la phrase paraît incomplète.'
        }
      ]
    },
    {
      title: '了 de fin de phrase — quelque chose a changé',
      blocks: [
        {
          type: 'p',
          text: 'Quand 了 vient à la fin de la phrase, il indique un CHANGEMENT par rapport à un état antérieur. C\'est 了₂ ou "modal 了".'
        },
        { type: 'example', hanzi: '我饿了', pinyin: 'wǒ è le', translationFr: 'j\'ai faim (maintenant — je n\'avais pas faim avant)' },
        { type: 'example', hanzi: '下雨了', pinyin: 'xià yǔ le', translationFr: 'il pleut (la pluie a commencé)' },
        { type: 'example', hanzi: '太晚了', pinyin: 'tài wǎn le', translationFr: 'il est trop tard (maintenant)' },
        {
          type: 'p',
          text: 'Ce 了 n\'a rien à voir avec un passé : il dit juste "quelque chose vient de changer dans l\'état actuel".'
        }
      ]
    },
    {
      title: 'Quand les deux 了 sont dans la même phrase',
      blocks: [
        {
          type: 'p',
          text: 'On peut combiner les deux pour exprimer : "j\'ai fait X et maintenant la situation a changé".'
        },
        { type: 'example', hanzi: '我吃了三个苹果了', pinyin: 'wǒ chī le sān gè píngguǒ le', translationFr: 'j\'ai mangé 3 pommes (jusqu\'à maintenant, j\'en suis là)' },
        {
          type: 'p',
          text: 'Le premier 了 marque l\'action achevée, le second indique un changement d\'état (par exemple : "et j\'arrête là").'
        }
      ]
    },
    {
      title: 'Les pièges classiques',
      blocks: [
        {
          type: 'h3',
          text: 'Piège 1 : 了 ≠ passé'
        },
        {
          type: 'p',
          text: 'On peut avoir 了 dans une phrase au futur : "等明天我吃了饭再说" (dài míngtiān wǒ chī le fàn zài shuō, "on en reparlera demain quand j\'aurai mangé"). Le 了 marque l\'achèvement, pas le temps.'
        },
        {
          type: 'h3',
          text: 'Piège 2 : pas de 了 avec les verbes d\'état'
        },
        {
          type: 'p',
          text: 'Les verbes comme 是, 知道, 喜欢, 是 n\'acceptent pas 了 (sauf 了 final de changement). On ne dit pas "我是了学生" mais "我是学生了" (je suis maintenant étudiante).'
        },
        {
          type: 'h3',
          text: 'Piège 3 : 不 + 了 vs 没有'
        },
        {
          type: 'p',
          text: 'Pour la négation du passé, on utilise 没有 (méi yǒu) à la place de 不 (bù), et ON SUPPRIME 了.'
        },
        { type: 'example', hanzi: '我没有吃苹果', pinyin: 'wǒ méi yǒu chī píngguǒ', translationFr: 'je n\'ai pas mangé de pomme (PAS 我不吃了)' }
      ]
    },
    {
      title: 'Une règle simple à retenir',
      blocks: [
        {
          type: 'callout',
          tone: 'success',
          text: 'Si tu hésites : 了 après le verbe = action terminée. 了 à la fin = changement de situation. Si les deux logiques s\'appliquent, mets les deux.'
        },
        {
          type: 'p',
          text: 'Avec la pratique (et beaucoup d\'exposition à du chinois natif), 了 devient automatique. La règle est : quand un Chinois en met un, mets-en un aussi. C\'est le principe de l\'apprentissage par calque.'
        }
      ]
    }
  ]
};

const POST_MESUREURS: BlogPost = {
  slug: 'les-mesureurs-chinois-个-只-张',
  category: 'grammaire',
  title: 'Les mesureurs en chinois — Le guide visuel des 50 classificateurs essentiels',
  lead:
    'En chinois, on ne dit pas "deux livres" mais "deux 本 livres". Les mesureurs (量词) sont incontournables. Voici les 50 plus utiles avec leur logique visuelle.',
  publishedAt: '2026-05-04',
  readingMinutes: 10,
  author: DEFAULT_AUTHOR,
  heroImage:
    'https://images.unsplash.com/photo-1707013533606-62919aa3aa29?w=1600&q=80',
  heroCaption: 'Table chinoise garnie — chaque bol, plat, tasse a son mesureur dédié',
  intro:
    'Les classificateurs (量词 liàngcí), ou mesureurs, sont des particules qui s\'intercalent OBLIGATOIREMENT entre un nombre et un nom. C\'est l\'équivalent du "tasse de" dans "deux tasses de café" en français, sauf qu\'en chinois c\'est requis pour TOUS les noms.',
  sections: [
    {
      title: 'La règle universelle : 个 (gè) — le passe-partout',
      blocks: [
        {
          type: 'p',
          text: 'Si tu retiens UN seul mesureur, c\'est celui-là. 个 fonctionne pour les personnes, les objets sans forme spécifique, les concepts abstraits. C\'est techniquement faux dans certains cas, mais les Chinois te comprendront toujours.'
        },
        { type: 'example', hanzi: '一个人', pinyin: 'yī gè rén', translationFr: 'une personne' },
        { type: 'example', hanzi: '一个问题', pinyin: 'yī gè wèntí', translationFr: 'un problème' },
        { type: 'example', hanzi: '一个苹果', pinyin: 'yī gè píngguǒ', translationFr: 'une pomme' },
        {
          type: 'callout',
          tone: 'info',
          text: 'En cas de doute total, utilise 个. Tu auras l\'air débutant mais on te comprendra.'
        }
      ]
    },
    {
      title: 'Les mesureurs par forme d\'objet',
      blocks: [
        {
          type: 'h3',
          text: 'Objets plats (papier, photo, billet)'
        },
        { type: 'example', hanzi: '一张纸', pinyin: 'yī zhāng zhǐ', translationFr: 'une feuille de papier' },
        { type: 'example', hanzi: '一张票', pinyin: 'yī zhāng piào', translationFr: 'un billet' },
        { type: 'example', hanzi: '一张桌子', pinyin: 'yī zhāng zhuōzi', translationFr: 'une table (surface plane)' },
        {
          type: 'h3',
          text: 'Objets longs et fins (route, rivière, poisson)'
        },
        { type: 'example', hanzi: '一条路', pinyin: 'yī tiáo lù', translationFr: 'une route' },
        { type: 'example', hanzi: '一条鱼', pinyin: 'yī tiáo yú', translationFr: 'un poisson' },
        { type: 'example', hanzi: '一条裙子', pinyin: 'yī tiáo qúnzi', translationFr: 'une jupe' },
        {
          type: 'h3',
          text: 'Objets longs et rigides (stylo, baguette)'
        },
        { type: 'example', hanzi: '一支笔', pinyin: 'yī zhī bǐ', translationFr: 'un stylo' },
        { type: 'example', hanzi: '一支烟', pinyin: 'yī zhī yān', translationFr: 'une cigarette' },
        {
          type: 'h3',
          text: 'Objets avec un manche (couteau, parapluie)'
        },
        { type: 'example', hanzi: '一把刀', pinyin: 'yī bǎ dāo', translationFr: 'un couteau' },
        { type: 'example', hanzi: '一把伞', pinyin: 'yī bǎ sǎn', translationFr: 'un parapluie' },
        { type: 'example', hanzi: '一把椅子', pinyin: 'yī bǎ yǐzi', translationFr: 'une chaise' }
      ]
    },
    {
      title: 'Les mesureurs pour les animaux',
      blocks: [
        {
          type: 'p',
          text: 'Les animaux ont leur propre logique selon leur taille et leur statut culturel.'
        },
        { type: 'example', hanzi: '一只狗', pinyin: 'yī zhī gǒu', translationFr: 'un chien (animal petit/moyen)' },
        { type: 'example', hanzi: '一只鸟', pinyin: 'yī zhī niǎo', translationFr: 'un oiseau' },
        { type: 'example', hanzi: '一只猫', pinyin: 'yī zhī māo', translationFr: 'un chat' },
        { type: 'example', hanzi: '一头牛', pinyin: 'yī tóu niú', translationFr: 'un bœuf (animal de bétail)' },
        { type: 'example', hanzi: '一匹马', pinyin: 'yī pǐ mǎ', translationFr: 'un cheval (mesureur dédié)' },
        { type: 'example', hanzi: '一条蛇', pinyin: 'yī tiáo shé', translationFr: 'un serpent (long et fin)' }
      ]
    },
    {
      title: 'Les mesureurs pour les personnes',
      blocks: [
        {
          type: 'p',
          text: 'Pour les personnes, 个 est le défaut. Mais on a aussi :'
        },
        { type: 'example', hanzi: '一位老师', pinyin: 'yī wèi lǎoshī', translationFr: 'un(e) professeur(e) (politesse)' },
        { type: 'example', hanzi: '一名学生', pinyin: 'yī míng xuésheng', translationFr: 'un(e) étudiant(e) (formel, lit. "nom")' },
        { type: 'example', hanzi: '一口人', pinyin: 'yī kǒu rén', translationFr: 'une personne (compte familial — "bouches à nourrir")' }
      ]
    },
    {
      title: 'Les mesureurs pour les contenants',
      blocks: [
        { type: 'example', hanzi: '一杯茶', pinyin: 'yī bēi chá', translationFr: 'une tasse de thé' },
        { type: 'example', hanzi: '一瓶水', pinyin: 'yī píng shuǐ', translationFr: 'une bouteille d\'eau' },
        { type: 'example', hanzi: '一碗饭', pinyin: 'yī wǎn fàn', translationFr: 'un bol de riz' },
        { type: 'example', hanzi: '一盘菜', pinyin: 'yī pán cài', translationFr: 'une assiette de plat' },
        { type: 'example', hanzi: '一袋米', pinyin: 'yī dài mǐ', translationFr: 'un sac de riz' },
        { type: 'example', hanzi: '一盒巧克力', pinyin: 'yī hé qiǎokèlì', translationFr: 'une boîte de chocolats' }
      ]
    },
    {
      title: 'Les mesureurs spéciaux à connaître',
      blocks: [
        { type: 'example', hanzi: '一本书', pinyin: 'yī běn shū', translationFr: 'un livre (volume relié)' },
        { type: 'example', hanzi: '一件衣服', pinyin: 'yī jiàn yīfu', translationFr: 'un vêtement (haut)' },
        { type: 'example', hanzi: '一双鞋', pinyin: 'yī shuāng xié', translationFr: 'une paire de chaussures' },
        { type: 'example', hanzi: '一辆车', pinyin: 'yī liàng chē', translationFr: 'une voiture (véhicule)' },
        { type: 'example', hanzi: '一座山', pinyin: 'yī zuò shān', translationFr: 'une montagne (objet imposant fixe)' },
        { type: 'example', hanzi: '一首歌', pinyin: 'yī shǒu gē', translationFr: 'une chanson' },
        { type: 'example', hanzi: '一部电影', pinyin: 'yī bù diànyǐng', translationFr: 'un film' }
      ]
    },
    {
      title: 'Astuce mnémonique',
      blocks: [
        {
          type: 'p',
          text: 'Pour mémoriser, associe le mesureur à un objet ICONIQUE de sa catégorie :'
        },
        {
          type: 'list',
          items: [
            '张 (zhāng) → une feuille A4',
            '条 (tiáo) → un long ruban qui ondule',
            '只 (zhī) → un petit animal mignon (chien, chat, oiseau)',
            '把 (bǎ) → un objet que tu prends en main par son manche',
            '本 (běn) → un livre relié sur ton bureau',
            '辆 (liàng) → une voiture sur la route',
            '杯 (bēi) → une tasse devant toi'
          ]
        },
        {
          type: 'callout',
          tone: 'success',
          text: 'Avec 15-20 mesureurs, tu couvres 90 % des situations du quotidien. Ne cherche pas à tous les apprendre d\'un coup.'
        }
      ]
    }
  ]
};

const POST_DRAMAS: BlogPost = {
  slug: 'cdramas-pour-apprendre-le-mandarin-top-10',
  category: 'culture',
  title: 'C-Dramas pour apprendre le mandarin — Mon top 10 par niveau',
  lead:
    'Les Cdramas sont un outil sous-estimé d\'apprentissage. Voici 10 séries triées par niveau pour t\'entraîner sans t\'épuiser, du HSK 2 au HSK 6.',
  publishedAt: '2026-05-03',
  readingMinutes: 8,
  author: DEFAULT_AUTHOR,
  heroImage:
    'https://images.unsplash.com/photo-1574267432553-4b4628081c31?w=1600&q=80',
  heroCaption: 'Diffusion d\'un cdrama — l\'immersion sans bouger de chez soi',
  intro:
    'Les séries chinoises (电视剧 diànshìjù, ou simplement "cdramas") ont explosé en qualité ces 5 dernières années. Voici ma sélection pour apprendre le mandarin par l\'immersion, organisée par niveau.',
  sections: [
    {
      title: 'Niveau débutant (HSK 1-2)',
      blocks: [
        {
          type: 'h3',
          text: '1. 小欢喜 (Little Joys)'
        },
        {
          type: 'p',
          text: 'Drama familial sur 3 familles préparant le concours universitaire (高考). Vocabulaire quotidien, diction claire, scénario simple. Parfait pour s\'habituer aux conversations familiales.'
        },
        {
          type: 'h3',
          text: '2. 以家人之名 (Go Ahead)'
        },
        {
          type: 'p',
          text: 'Drama familial moderne sur 3 frères et sœurs adoptifs. Émotions, vocabulaire affectif, sous-titres pinyin disponibles sur certaines plateformes.'
        }
      ]
    },
    {
      title: 'Niveau intermédiaire (HSK 3-4)',
      blocks: [
        {
          type: 'h3',
          text: '3. 致我们单纯的小美好 (A Love So Beautiful)'
        },
        {
          type: 'p',
          text: 'Romance lycéenne, langage adolescent moderne. Sucré mais utile pour apprendre l\'argot jeune et les expressions du quotidien.'
        },
        {
          type: 'h3',
          text: '4. 微微一笑很倾城 (Love O2O)'
        },
        {
          type: 'p',
          text: 'Romance universitaire dans un univers de jeu vidéo. Mélange vocabulaire IT moderne et conversation amoureuse — original.'
        },
        {
          type: 'h3',
          text: '5. 我的前半生 (The First Half of My Life)'
        },
        {
          type: 'p',
          text: 'Drame contemporain sur une femme qui rebondit après un divorce. Excellent pour le vocabulaire professionnel et émotionnel adulte.'
        }
      ]
    },
    {
      title: 'Niveau intermédiaire avancé (HSK 4-5)',
      blocks: [
        {
          type: 'h3',
          text: '6. 觉醒年代 (The Age of Awakening)'
        },
        {
          type: 'p',
          text: 'Drama historique sur la Chine du début du XXe siècle. Vocabulaire plus riche, contexte historique exigeant mais fascinant. Très acclamé.'
        },
        {
          type: 'h3',
          text: '7. 隐秘的角落 (The Bad Kids)'
        },
        {
          type: 'p',
          text: 'Thriller psychologique. Court (12 épisodes), tendu, vocabulaire suspense et drame familial.'
        }
      ]
    },
    {
      title: 'Niveau avancé (HSK 5-6)',
      blocks: [
        {
          type: 'h3',
          text: '8. 琅琊榜 (Nirvana in Fire)'
        },
        {
          type: 'p',
          text: 'Drame historique en costume, niveau littéraire élevé. Intrigues politiques, vocabulaire poétique et formel ancien. Considéré comme un chef-d\'œuvre.'
        },
        {
          type: 'h3',
          text: '9. 三十而已 (Nothing But Thirty)'
        },
        {
          type: 'p',
          text: 'Drama urbain sur 3 femmes de 30 ans à Shanghai. Vocabulaire professionnel sophistiqué, dialogues rapides et nuancés.'
        },
        {
          type: 'h3',
          text: '10. 庆余年 (Joy of Life)'
        },
        {
          type: 'p',
          text: 'Mélange historique/SF avec humour moderne. Diction très rapide, registres mélangés. Excellent test de compréhension avancée.'
        }
      ]
    },
    {
      title: 'Où regarder ?',
      blocks: [
        {
          type: 'list',
          items: [
            'Viki (légal, sous-titres FR et EN, gratuit avec pubs)',
            'YouTube (chaînes officielles comme 优酷 ou Croton Media, avec sous-titres)',
            'iQIYI (plateforme chinoise officielle, certains sous-titres)',
            'WeTV (autre plateforme chinoise officielle)',
            'Netflix (sélection limitée mais qualité solide)'
          ]
        }
      ]
    },
    {
      title: 'Ma méthode pour exploiter un cdrama',
      blocks: [
        {
          type: 'ordered',
          items: [
            '1ère passe : épisode complet en VO sous-titres FR (juste profiter)',
            '2e passe : même épisode en VO sous-titres chinois (lecture rapide)',
            '3e passe : segments de 5 min en VO sans sous-titres (test d\'oreille)',
            'Note 5-10 expressions nouvelles par épisode dans Anki/XiaoLearn',
            'Reviens à la série 1 semaine plus tard pour ancrer'
          ]
        },
        {
          type: 'callout',
          tone: 'success',
          text: 'Un épisode bien exploité = 30-50 expressions nouvelles. Sur 24 épisodes, c\'est 1 000+ items appris en immersion.'
        }
      ]
    }
  ]
};

const POST_RESTAURANT: BlogPost = {
  slug: 'commander-dans-un-restaurant-chinois-vocabulaire',
  category: 'conseils',
  title: 'Commander dans un restaurant chinois — Guide de survie complet',
  lead:
    'Du « 几位 ? » de la serveuse au « 买单 ! » de la fin, voici tout le vocabulaire pour commander en chinois comme un local, sans hésiter ni paniquer.',
  publishedAt: '2026-05-02',
  readingMinutes: 9,
  author: DEFAULT_AUTHOR,
  heroImage:
    'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=1600&q=80',
  heroCaption: 'Restaurant chinois traditionnel — l\'écosystème complet à maîtriser',
  intro:
    'Manger au restaurant en Chine est une expérience essentielle mais peut intimider quand on débute. Voici la séquence complète, du moment où tu pousses la porte jusqu\'à l\'addition.',
  sections: [
    {
      title: 'L\'arrivée',
      blocks: [
        {
          type: 'p',
          text: 'Dès que tu rentres, la serveuse (服务员 fúwùyuán) ou l\'hôte te lance presque toujours :'
        },
        { type: 'example', hanzi: '几位？', pinyin: 'jǐ wèi', translationFr: 'combien de personnes ?' },
        {
          type: 'p',
          text: 'Tu réponds avec le nombre + 位 (wèi, mesureur poli pour personnes) :'
        },
        { type: 'example', hanzi: '两位', pinyin: 'liǎng wèi', translationFr: 'deux (personnes)' },
        { type: 'example', hanzi: '三位，谢谢', pinyin: 'sān wèi, xièxie', translationFr: 'trois, merci' },
        {
          type: 'p',
          text: 'Variante chaleureuse : on peut ajouter 我们 (wǒmen, nous) : "我们三个" (women san ge, "nous trois").'
        }
      ]
    },
    {
      title: 'À table : le menu',
      blocks: [
        {
          type: 'p',
          text: 'Une fois assise, tu vas vouloir le menu (菜单 càidān). Aujourd\'hui dans 90 % des restaurants en Chine, le menu est sur l\'application WeChat via QR code. Mais l\'expression reste utile :'
        },
        { type: 'example', hanzi: '请给我菜单', pinyin: 'qǐng gěi wǒ càidān', translationFr: 's\'il vous plaît, donnez-moi le menu' },
        { type: 'example', hanzi: '可以扫码点餐吗？', pinyin: 'kěyǐ sǎo mǎ diǎncān ma', translationFr: 'puis-je scanner le QR pour commander ?' },
        { type: 'example', hanzi: '有英文菜单吗？', pinyin: 'yǒu yīngwén càidān ma', translationFr: 'y a-t-il un menu en anglais ?' }
      ]
    },
    {
      title: 'Commander',
      blocks: [
        {
          type: 'p',
          text: 'Pour commander un plat, le verbe est 来 (lái, "venir, apporter") ou 要 (yào, "vouloir") :'
        },
        { type: 'example', hanzi: '我要这个', pinyin: 'wǒ yào zhège', translationFr: 'je veux celui-ci (en pointant)' },
        { type: 'example', hanzi: '来一份宫保鸡丁', pinyin: 'lái yī fèn gōngbǎo jīdīng', translationFr: 'une portion de poulet Gongbao' },
        { type: 'example', hanzi: '来两碗米饭', pinyin: 'lái liǎng wǎn mǐfàn', translationFr: 'deux bols de riz' },
        {
          type: 'h3',
          text: 'Si tu hésites'
        },
        { type: 'example', hanzi: '你们有什么推荐？', pinyin: 'nǐmen yǒu shénme tuījiàn', translationFr: 'qu\'est-ce que vous recommandez ?' },
        { type: 'example', hanzi: '这个辣不辣？', pinyin: 'zhège là bù là', translationFr: 'est-ce que c\'est épicé ?' },
        { type: 'example', hanzi: '不要太辣', pinyin: 'bú yào tài là', translationFr: 'pas trop épicé' }
      ]
    },
    {
      title: 'Régimes alimentaires et allergies',
      blocks: [
        { type: 'example', hanzi: '我吃素', pinyin: 'wǒ chī sù', translationFr: 'je suis végétarien(ne)' },
        { type: 'example', hanzi: '我对花生过敏', pinyin: 'wǒ duì huāshēng guòmǐn', translationFr: 'je suis allergique aux cacahuètes' },
        { type: 'example', hanzi: '不要香菜', pinyin: 'bú yào xiāngcài', translationFr: 'pas de coriandre' },
        { type: 'example', hanzi: '不要味精', pinyin: 'bú yào wèijīng', translationFr: 'pas de MSG (glutamate)' },
        {
          type: 'callout',
          tone: 'warning',
          text: 'En Chine, "végétarien" peut inclure du bouillon de viande ou des œufs. Si tu es strict, précise : 我不吃肉，不吃鱼，不吃鸡蛋 (je ne mange ni viande, ni poisson, ni œufs).'
        }
      ]
    },
    {
      title: 'Pendant le repas',
      blocks: [
        { type: 'example', hanzi: '服务员，加一双筷子', pinyin: 'fúwùyuán, jiā yī shuāng kuàizi', translationFr: 'serveur, ajoutez une paire de baguettes' },
        { type: 'example', hanzi: '请加一点水', pinyin: 'qǐng jiā yī diǎn shuǐ', translationFr: 'merci d\'ajouter un peu d\'eau' },
        { type: 'example', hanzi: '可以再来一碗吗？', pinyin: 'kěyǐ zài lái yī wǎn ma', translationFr: 'je peux avoir un autre bol ?' },
        {
          type: 'h3',
          text: 'L\'expression à connaître'
        },
        { type: 'example', hanzi: '好吃', pinyin: 'hǎo chī', translationFr: 'délicieux (lit. "bon à manger")' },
        { type: 'example', hanzi: '太辣了！', pinyin: 'tài là le', translationFr: 'c\'est trop épicé !' }
      ]
    },
    {
      title: 'L\'addition',
      blocks: [
        {
          type: 'p',
          text: 'Pour demander l\'addition, on a deux formules quasi-équivalentes :'
        },
        { type: 'example', hanzi: '买单', pinyin: 'mǎi dān', translationFr: 'l\'addition (litt. "acheter la note")' },
        { type: 'example', hanzi: '结账', pinyin: 'jié zhàng', translationFr: 'régler la note (plus formel)' },
        { type: 'example', hanzi: '可以刷卡吗？', pinyin: 'kěyǐ shuā kǎ ma', translationFr: 'puis-je payer par carte ?' },
        { type: 'example', hanzi: '可以微信支付吗？', pinyin: 'kěyǐ wēixìn zhīfù ma', translationFr: 'puis-je payer par WeChat ?' },
        {
          type: 'callout',
          tone: 'info',
          text: 'En Chine, le paiement par WeChat Pay ou Alipay est devenu universel. Les cartes étrangères sont parfois refusées dans les petits restos. Garde du cash en backup.'
        }
      ]
    },
    {
      title: 'L\'étiquette du repas chinois',
      blocks: [
        {
          type: 'list',
          items: [
            'On commande pour partager — chaque plat est au centre, pas individuel',
            'On sert TOUJOURS l\'aîné ou l\'invité d\'honneur en premier',
            'On ne plante jamais les baguettes verticalement dans le riz (rappel des funérailles)',
            'On ne retourne pas un poisson — superstition de bateau qui chavire',
            'Le tip n\'existe pas en Chine — surtout ne laisse rien',
            'Le bruit en mangeant (slurp des nouilles) est accepté voire apprécié'
          ]
        }
      ]
    }
  ]
};

const POST_PARTICULES_FINALES: BlogPost = {
  slug: 'particules-finales-chinois-吗-呢-吧-啊',
  category: 'grammaire',
  title: 'Les particules finales (吗, 呢, 吧, 啊) — Le ton émotionnel de la phrase chinoise',
  lead:
    'Le chinois n\'a pas d\'intonation flexible comme le français. À la place, des particules à la fin de la phrase signalent : question, doute, suggestion, exclamation. Décryptage des 4 essentielles.',
  publishedAt: '2026-05-01',
  readingMinutes: 7,
  author: DEFAULT_AUTHOR,
  heroImage:
    'https://images.unsplash.com/photo-1542695807939-063af86fa22f?w=1600&q=80',
  heroCaption: 'Le chinois sur papier — chaque particule colore le ton de la phrase',
  intro:
    'En français, on monte la voix pour poser une question, on adoucit le ton pour suggérer, on appuie pour exclamer. En chinois, ces fonctions sont remplies par des PARTICULES écrites en fin de phrase. C\'est codé, c\'est clair, c\'est apprenable.',
  sections: [
    {
      title: '吗 (ma) — La question fermée par excellence',
      blocks: [
        {
          type: 'p',
          text: '吗 transforme n\'importe quelle phrase affirmative en question fermée (oui/non). C\'est l\'outil le plus simple.'
        },
        { type: 'example', hanzi: '你是学生', pinyin: 'nǐ shì xuésheng', translationFr: 'tu es étudiant (affirmation)' },
        { type: 'example', hanzi: '你是学生吗？', pinyin: 'nǐ shì xuésheng ma', translationFr: 'es-tu étudiant ?' },
        {
          type: 'callout',
          tone: 'info',
          text: 'On ne combine PAS 吗 avec un mot interrogatif (谁, 什么, 哪里). "你是谁吗" est incorrect — il faut juste "你是谁？".'
        }
      ]
    },
    {
      title: '呢 (ne) — La question en retour ou l\'interrogation curieuse',
      blocks: [
        {
          type: 'p',
          text: '呢 a plusieurs usages. Le plus courant : "et toi ?". Mais aussi pour exprimer un état en cours ou poser une question incomplète.'
        },
        { type: 'example', hanzi: '我很好。你呢？', pinyin: 'wǒ hěn hǎo. nǐ ne', translationFr: 'je vais bien. et toi ?' },
        { type: 'example', hanzi: '钥匙呢？', pinyin: 'yàoshi ne', translationFr: 'et les clés ? (où sont-elles ?)' },
        { type: 'example', hanzi: '他在工作呢', pinyin: 'tā zài gōngzuò ne', translationFr: 'il est en train de travailler (action en cours)' }
      ]
    },
    {
      title: '吧 (ba) — La suggestion, la supposition, l\'adoucissement',
      blocks: [
        {
          type: 'p',
          text: '吧 est la particule "soft". Elle adoucit un ordre, propose une option, ou exprime une supposition.'
        },
        { type: 'example', hanzi: '我们走吧', pinyin: 'wǒmen zǒu ba', translationFr: 'allons-y (suggestion amicale)' },
        { type: 'example', hanzi: '吃饭吧', pinyin: 'chī fàn ba', translationFr: 'mangeons (sans pression)' },
        { type: 'example', hanzi: '你是法国人吧？', pinyin: 'nǐ shì fǎguó rén ba', translationFr: 'tu es français, non ? (supposition)' },
        {
          type: 'p',
          text: 'Comparaison : 我们走 = "on y va" (ordre), 我们走吗 = "on y va ?" (question), 我们走吧 = "allez, on y va" (proposition amicale). Trois niveaux de pression.'
        }
      ]
    },
    {
      title: '啊 (a) — L\'exclamation, la surprise, l\'emphase',
      blocks: [
        {
          type: 'p',
          text: '啊 ajoute de l\'expressivité émotionnelle. Surprise, enthousiasme, agacement — le contexte précise.'
        },
        { type: 'example', hanzi: '太好了啊！', pinyin: 'tài hǎo le a', translationFr: 'c\'est génial !' },
        { type: 'example', hanzi: '你怎么不来啊？', pinyin: 'nǐ zěnme bù lái a', translationFr: 'mais pourquoi tu ne viens pas ?' },
        { type: 'example', hanzi: '是啊', pinyin: 'shì a', translationFr: 'oui, exactement (confirmation enthousiaste)' }
      ]
    },
    {
      title: 'Comparaison en context',
      blocks: [
        {
          type: 'p',
          text: 'Voici la même phrase de base avec les 4 particules pour bien sentir la différence :'
        },
        { type: 'example', hanzi: '你来', pinyin: 'nǐ lái', translationFr: 'viens (ordre brut, peut être perçu sec)' },
        { type: 'example', hanzi: '你来吗？', pinyin: 'nǐ lái ma', translationFr: 'tu viens ? (question neutre)' },
        { type: 'example', hanzi: '你来呢？', pinyin: 'nǐ lái ne', translationFr: 'et toi, tu viens ? (en réponse à une autre question)' },
        { type: 'example', hanzi: '你来吧', pinyin: 'nǐ lái ba', translationFr: 'viens, allez (invitation chaleureuse)' },
        { type: 'example', hanzi: '你来啊！', pinyin: 'nǐ lái a', translationFr: 'mais viens donc ! (insistance émotive)' }
      ]
    },
    {
      title: 'Mon conseil',
      blocks: [
        {
          type: 'p',
          text: 'N\'apprends pas ces particules par cœur. Imprègne-toi des dialogues, des dramas, des podcasts. Le bon usage vient par exposition, pas par règles.'
        },
        {
          type: 'p',
          text: 'En cas de doute : reste neutre (sans particule ou avec 吗 pour les questions). Les natifs te comprendront. L\'ajout des autres particules viendra naturellement avec l\'oreille.'
        },
        {
          type: 'quote',
          text: 'Le chinois sans particules finales, c\'est une langue robotique. Avec elles, c\'est une langue chaleureuse.',
          author: 'Wei Xiaoming, professeur de mandarin à l\'Université de Genève'
        }
      ]
    }
  ]
};

const POST_THE_CHINOIS: BlogPost = {
  slug: 'le-the-chinois-5000-ans-histoire',
  category: 'culture',
  title: 'Le thé chinois — 5 000 ans d\'histoire, 6 grandes familles',
  lead:
    'Du thé vert Longjing au pu-erh fermenté, le thé chinois n\'est pas une boisson : c\'est une civilisation. Voici le tour d\'horizon pour ne plus jamais commander "un thé chaud" comme un touriste.',
  publishedAt: '2026-05-13',
  readingMinutes: 10,
  author: DEFAULT_AUTHOR,
  heroImage:
    'https://images.unsplash.com/photo-1721434676608-23d5f3b9aefd?w=1600&q=80',
  heroCaption: 'Théière et tasse de thé vert — l\'art de la dégustation chinoise',
  intro:
    'En Chine, dire « je veux du thé » sans préciser lequel, c\'est comme dire « je veux du vin » à un sommelier français. Il y a 6 familles principales, des centaines de variétés, et des codes culturels pour chacune. Voici l\'essentiel à connaître.',
  sections: [
    {
      title: 'Une histoire qui commence avec Shennong',
      blocks: [
        {
          type: 'p',
          text: 'Selon la légende, le thé aurait été découvert en 2737 av. J.-C. par l\'empereur 神农 (Shénnóng, « Divin Cultivateur »), qui aurait vu des feuilles tomber dans sa marmite d\'eau chaude. Au-delà du mythe, les archéologues ont confirmé une consommation de thé dans le Sichuan dès le Ier millénaire av. J.-C.'
        },
        {
          type: 'p',
          text: 'Sous la dynastie Tang (618-907), le moine bouddhiste 陆羽 (Lù Yǔ) rédige le 茶经 (Chájīng, « Classique du Thé »), premier traité au monde sur la culture, la préparation et la dégustation du thé. C\'est le point de bascule où le thé passe de boisson médicinale à art de vivre.'
        },
        {
          type: 'callout',
          tone: 'info',
          text: 'Le thé est arrivé en Europe au XVIIe siècle via les marchands portugais et hollandais. La cérémonie japonaise du thé (chanoyu) est elle-même un héritage de la culture chinoise Song.'
        }
      ]
    },
    {
      title: 'Les 6 grandes familles de thé',
      blocks: [
        {
          type: 'p',
          text: 'La classification chinoise se fait selon le degré de fermentation/oxydation des feuilles — pas selon la couleur de l\'infusion comme on le croit souvent.'
        },
        {
          type: 'h3',
          text: '1. Thé vert (绿茶 lǜchá) — non fermenté'
        },
        {
          type: 'p',
          text: 'Le plus consommé en Chine continentale (60-70 % du marché). Feuilles chauffées rapidement après cueillette pour stopper l\'oxydation. Goût végétal, parfois iodé.'
        },
        { type: 'example', hanzi: '龙井', pinyin: 'lóngjǐng', translationFr: 'Longjing (Puits du Dragon) — Hangzhou' },
        { type: 'example', hanzi: '碧螺春', pinyin: 'bìluóchūn', translationFr: 'Biluochun (Spirale de Jade) — Suzhou' },
        {
          type: 'h3',
          text: '2. Thé blanc (白茶 báichá) — très peu fermenté'
        },
        {
          type: 'p',
          text: 'Le moins transformé : juste séché au soleil. Feuilles couvertes d\'un duvet blanc. Saveur délicate, légèrement sucrée. Production concentrée dans le Fujian.'
        },
        { type: 'example', hanzi: '白毫银针', pinyin: 'báiháo yínzhēn', translationFr: 'Aiguilles d\'argent au duvet blanc' },
        {
          type: 'h3',
          text: '3. Thé jaune (黄茶 huángchá) — légèrement fermenté'
        },
        {
          type: 'p',
          text: 'Famille la plus rare et la plus chère. Production artisanale, en voie de disparition. Goût doux, miellé. Le plus connu : 君山银针 (Junshan Yinzhen).'
        },
        {
          type: 'h3',
          text: '4. Thé Oolong (乌龙茶 wūlóngchá) — semi-fermenté'
        },
        {
          type: 'p',
          text: 'Entre vert et noir. Oxydation partielle (10 à 70 %). Famille immense, surtout produite à Taïwan et au Fujian. Goût floral, fruité ou torréfié selon les variétés.'
        },
        { type: 'example', hanzi: '铁观音', pinyin: 'tiěguānyīn', translationFr: 'Tieguanyin (Déesse de fer Guanyin)' },
        { type: 'example', hanzi: '大红袍', pinyin: 'dàhóngpáo', translationFr: 'Da Hong Pao (Grande robe rouge) — Wuyi' },
        {
          type: 'h3',
          text: '5. Thé rouge (红茶 hóngchá) — entièrement fermenté'
        },
        {
          type: 'p',
          text: 'C\'est ce qu\'on appelle "thé noir" en Occident. Oxydation complète. Le 正山小种 (Zhengshan Xiaozhong, ou Lapsang Souchong en Occident) est considéré comme le premier thé noir au monde, créé au Fujian au XVIIe siècle.'
        },
        {
          type: 'h3',
          text: '6. Thé sombre / post-fermenté (黑茶 hēichá) — le pu-erh'
        },
        {
          type: 'p',
          text: 'Fermenté ET vieilli, parfois pendant des décennies. Le 普洱 (pǔ\'ěr) du Yunnan est le plus célèbre. Goût terreux, profond. Un pu-erh ancien peut valoir des fortunes — comme un grand cru de Bordeaux.'
        }
      ]
    },
    {
      title: 'Le vocabulaire essentiel du thé',
      blocks: [
        { type: 'example', hanzi: '茶', pinyin: 'chá', translationFr: 'thé' },
        { type: 'example', hanzi: '泡茶', pinyin: 'pào chá', translationFr: 'infuser le thé' },
        { type: 'example', hanzi: '茶叶', pinyin: 'cháyè', translationFr: 'feuilles de thé' },
        { type: 'example', hanzi: '茶馆', pinyin: 'cháguǎn', translationFr: 'maison de thé' },
        { type: 'example', hanzi: '茶壶', pinyin: 'cháhú', translationFr: 'théière' },
        { type: 'example', hanzi: '茶杯', pinyin: 'chábēi', translationFr: 'tasse à thé' },
        { type: 'example', hanzi: '功夫茶', pinyin: 'gōngfūchá', translationFr: 'cérémonie du thé Gongfu (Chaozhou/Fujian)' }
      ]
    },
    {
      title: 'Comment commander un thé en Chine sans passer pour un touriste',
      blocks: [
        {
          type: 'ordered',
          items: [
            'Précise le type : 绿茶 (vert), 红茶 (noir), 乌龙 (oolong), etc. Sinon on te servira souvent du jasmin (花茶, huāchá) par défaut, qui est rarement bu par les Chinois eux-mêmes.',
            'Demande la région si tu as une préférence : "我要西湖龙井" (wǒ yào Xīhú lóngjǐng, "je veux du Longjing du Lac de l\'Ouest").',
            'Indique la concentration : 浓 (nóng, fort) ou 淡 (dàn, léger).',
            'Évite de demander du sucre ou du lait. C\'est une hérésie en Chine. Le thé bubble tea, c\'est une autre catégorie totalement différente.'
          ]
        }
      ]
    },
    {
      title: 'Mon conseil de dégustation',
      blocks: [
        {
          type: 'p',
          text: 'Commence par un Longjing (vert) ou un Tieguanyin (oolong) léger — ils sont approachables et représentatifs. Évite les pu-erh très âgés au début : ils sont puissants et l\'éducation gustative se fait par étapes.'
        },
        {
          type: 'quote',
          text: 'Une seule feuille tombée dans la marmite a changé le destin d\'une civilisation. Boire du thé en Chine, c\'est goûter cette histoire.',
          author: 'Lu Yu, Classique du Thé (760 apr. J.-C.)'
        }
      ]
    }
  ]
};

const POST_CUISINES: BlogPost = {
  slug: 'les-8-grandes-cuisines-regionales-chinoises',
  category: 'culture',
  title: 'Les 8 grandes cuisines régionales chinoises (八大菜系) — Le guide pour les distinguer',
  lead:
    '« Cuisine chinoise » n\'existe pas vraiment : il y a 8 grandes traditions régionales aussi différentes entre elles que la cuisine française l\'est de l\'italienne. Voici comment les reconnaître.',
  publishedAt: '2026-05-13',
  readingMinutes: 11,
  author: DEFAULT_AUTHOR,
  heroImage:
    'https://images.unsplash.com/photo-1707013533606-62919aa3aa29?w=1600&q=80',
  heroCaption: 'Table chinoise traditionnelle — chaque région a ses techniques et ses saveurs propres',
  intro:
    'Si tu commandes "chinois" en France, tu as 90 % de chances de manger Cantonais ou Sichuanais. Mais la Chine compte 8 traditions culinaires officiellement reconnues — les 八大菜系 (bā dà càixì). Voici la carte gourmande.',
  sections: [
    {
      title: 'Pourquoi 8 traditions et pas une seule "cuisine chinoise"',
      blocks: [
        {
          type: 'p',
          text: 'La Chine couvre 9,6 millions de km² avec des climats, des produits et des cultures radicalement différents. Le riz au sud, le blé au nord. Les piments dans les régions humides (Sichuan, Hunan), le fade au bord de mer (Cantonais). Le résultat : chaque grande région a forgé son propre style, transmis depuis des siècles.'
        },
        {
          type: 'p',
          text: 'La codification en "8 grandes cuisines" date de la dynastie Qing (XIXe siècle). Avant, on parlait de 4 cuisines. Aujourd\'hui certaines listes en ajoutent 2 ou 4 supplémentaires, mais les 8 restent le standard officiel.'
        }
      ]
    },
    {
      title: '川菜 (Chuāncài) — Cuisine du Sichuan',
      blocks: [
        {
          type: 'p',
          text: 'La plus connue à l\'international. Province enclavée, humide et chaude, qui a inventé le piment + le poivre du Sichuan (花椒, huājiāo) pour ses effets digestifs. Goût emblématique : 麻辣 (málà) — « engourdissant et piquant ».'
        },
        { type: 'example', hanzi: '麻婆豆腐', pinyin: 'mápó dòufu', translationFr: 'Tofu de la mémé grêlée' },
        { type: 'example', hanzi: '宫保鸡丁', pinyin: 'gōngbǎo jīdīng', translationFr: 'Poulet Kung Pao' },
        { type: 'example', hanzi: '回锅肉', pinyin: 'huíguōròu', translationFr: 'Porc deux fois cuit' },
        { type: 'example', hanzi: '火锅', pinyin: 'huǒguō', translationFr: 'Hot pot (fondue chinoise)' }
      ]
    },
    {
      title: '粤菜 (Yuècài) — Cuisine cantonaise',
      blocks: [
        {
          type: 'p',
          text: 'Originaire du Guangdong (Canton). La plus diffusée mondialement via la diaspora. Philosophie : respecter le goût naturel des ingrédients. Cuisson rapide à la vapeur, sautés légers, peu d\'épices. Royaume du dim sum.'
        },
        { type: 'example', hanzi: '点心', pinyin: 'diǎnxīn', translationFr: 'Dim sum (petites bouchées)' },
        { type: 'example', hanzi: '叉烧', pinyin: 'chāshāo', translationFr: 'Porc laqué (Char Siu)' },
        { type: 'example', hanzi: '虾饺', pinyin: 'xiājiǎo', translationFr: 'Raviolis aux crevettes' },
        { type: 'example', hanzi: '白切鸡', pinyin: 'báiqiē jī', translationFr: 'Poulet poché à la cantonaise' }
      ]
    },
    {
      title: '鲁菜 (Lǔcài) — Cuisine du Shandong',
      blocks: [
        {
          type: 'p',
          text: 'La plus ancienne des 8. Cuisine du Nord-Est, base de la cuisine impériale de Pékin. Privilégie le braisé, les soupes claires, les fruits de mer. Technique-clé : 爆 (bào, sauter à très haute température).'
        },
        { type: 'example', hanzi: '糖醋鱼', pinyin: 'tángcùyú', translationFr: 'Poisson aigre-doux' },
        { type: 'example', hanzi: '九转大肠', pinyin: 'jiǔzhuǎn dàcháng', translationFr: 'Intestin de porc en 9 cuissons (plat signature)' }
      ]
    },
    {
      title: '苏菜 (Sūcài) — Cuisine du Jiangsu',
      blocks: [
        {
          type: 'p',
          text: 'Région du Lac Tai et de Suzhou. Cuisine raffinée, présentation soignée, saveurs sucrées légères. Précision technique (découpe, cuisson lente). Privilégie poissons et crevettes d\'eau douce.'
        },
        { type: 'example', hanzi: '松鼠桂鱼', pinyin: 'sōngshǔ guìyú', translationFr: 'Poisson écureuil (escalopé en forme d\'écureuil)' },
        { type: 'example', hanzi: '清炖蟹粉狮子头', pinyin: 'qīngdùn xièfěn shīzitóu', translationFr: 'Boulettes tête de lion au crabe' }
      ]
    },
    {
      title: '浙菜 (Zhècài) — Cuisine du Zhejiang',
      blocks: [
        {
          type: 'p',
          text: 'Hangzhou + côte est. Légère, peu grasse, saveurs subtiles. Influence du thé Longjing. Goût plus sucré qu\'au nord, mais jamais lourd.'
        },
        { type: 'example', hanzi: '西湖醋鱼', pinyin: 'xīhú cùyú', translationFr: 'Poisson vinaigré du Lac de l\'Ouest' },
        { type: 'example', hanzi: '东坡肉', pinyin: 'dōngpōròu', translationFr: 'Porc Dongpo (poitrine braisée au vin de riz)' }
      ]
    },
    {
      title: '闽菜 (Mǐncài) — Cuisine du Fujian',
      blocks: [
        {
          type: 'p',
          text: 'Province côtière face à Taïwan. Reine des soupes et des bouillons. Saveurs umami (champignons, fruits de mer). Beaucoup d\'attention aux sauces.'
        },
        { type: 'example', hanzi: '佛跳墙', pinyin: 'fótiàoqiáng', translationFr: 'Bouddha saute le mur (soupe légendaire à 30+ ingrédients)' }
      ]
    },
    {
      title: '湘菜 (Xiāngcài) — Cuisine du Hunan',
      blocks: [
        {
          type: 'p',
          text: 'Cousine du Sichuan mais sans le poivre engourdissant. Piquant pur, fumé, aigre. Mao Zedong était du Hunan — il faisait servir cette cuisine à ses dîners politiques.'
        },
        { type: 'example', hanzi: '剁椒鱼头', pinyin: 'duòjiāo yútóu', translationFr: 'Tête de poisson au piment haché' },
        { type: 'example', hanzi: '毛氏红烧肉', pinyin: 'máoshì hóngshāoròu', translationFr: 'Porc braisé sauce soja "façon Mao"' }
      ]
    },
    {
      title: '徽菜 (Huīcài) — Cuisine de l\'Anhui',
      blocks: [
        {
          type: 'p',
          text: 'La moins connue à l\'international. Région montagneuse, sauvage. Spécialités à base de gibier, herbes des montagnes, légumes sauvages. Goûts forts, fermentés.'
        },
        { type: 'example', hanzi: '臭鳜鱼', pinyin: 'chòu guìyú', translationFr: 'Poisson mandarin "puant" (légèrement fermenté)' }
      ]
    },
    {
      title: 'Comment les distinguer en pratique',
      blocks: [
        {
          type: 'list',
          items: [
            'Plat très épicé avec engourdissement de la langue → Sichuan (麻辣)',
            'Plat épicé sans engourdissement, plus pur → Hunan',
            'Dim sum + vapeur + légèreté → Cantonais',
            'Plat sucré-salé raffiné → Jiangsu ou Zhejiang',
            'Grosse soupe avec beaucoup d\'ingrédients → Fujian',
            'Plat très lourd, braisé longuement → Shandong',
            'Goût fumé, fermenté, sauvage → Anhui'
          ]
        },
        {
          type: 'callout',
          tone: 'info',
          text: 'En dehors des 8, il y a aussi la cuisine xinjiang (musulmane Hui), tibétaine, mongole, taïwanaise. Toutes valent le détour, surtout en région.'
        }
      ]
    }
  ]
};

const POST_BA_BEI: BlogPost = {
  slug: 'ba-vs-bei-voix-active-passive-chinois',
  category: 'grammaire',
  title: '把 vs 被 — Les voix active et passive en mandarin sans s\'arracher les cheveux',
  lead:
    'Deux particules qui terrorisent les apprenants : 把 (manipuler activement un objet) et 被 (subir l\'action). Avec quelques règles claires, ça devient logique.',
  publishedAt: '2026-05-13',
  readingMinutes: 8,
  author: DEFAULT_AUTHOR,
  heroImage:
    'https://images.unsplash.com/photo-1486303954368-398fea0e72cd?w=1600&q=80',
  heroCaption: 'Pinceau de calligraphie — 把 et 被 sont parmi les particules les plus utilisées en mandarin',
  intro:
    'Tu peux dire "je mange une pomme" simplement : 我吃苹果 (wǒ chī píngguǒ). Mais dès que tu veux dire "je l\'ai mangée, la pomme", "elle a été mangée par moi", ou "je l\'ai mangée jusqu\'au bout", il faut sortir l\'artillerie 把 et 被. Voici le mode d\'emploi.',
  sections: [
    {
      title: 'La construction 把 (bǎ) — manipuler l\'objet',
      blocks: [
        {
          type: 'p',
          text: '把 est utilisée pour mettre l\'OBJET avant le verbe, et insister sur ce qu\'on FAIT à cet objet. La structure :'
        },
        {
          type: 'callout',
          tone: 'info',
          text: 'Sujet + 把 + Objet + Verbe + Complément (résultat / direction / quantité)'
        },
        { type: 'example', hanzi: '我把苹果吃了', pinyin: 'wǒ bǎ píngguǒ chī le', translationFr: 'j\'ai mangé la pomme (entièrement)' },
        { type: 'example', hanzi: '他把门关上了', pinyin: 'tā bǎ mén guānshàng le', translationFr: 'il a fermé la porte' },
        { type: 'example', hanzi: '请把书放在桌子上', pinyin: 'qǐng bǎ shū fàng zài zhuōzi shàng', translationFr: 'mets le livre sur la table, s\'il te plaît' },
        {
          type: 'h3',
          text: 'Pourquoi pas juste 我吃了苹果 ?'
        },
        {
          type: 'p',
          text: '我吃了苹果 = "j\'ai mangé une/des pommes" — peu importe lesquelles. Vague.'
        },
        {
          type: 'p',
          text: '我把苹果吃了 = "j\'ai mangé LA pomme (que tu connais, ou qui était sur la table)" — précis. L\'objet est défini et l\'action est complétée sur lui.'
        }
      ]
    },
    {
      title: 'Quand utiliser 把 (les 4 cas typiques)',
      blocks: [
        {
          type: 'ordered',
          items: [
            'Action de DÉPLACER un objet (mettre, ranger, sortir) → 把 quasi-obligatoire',
            'Action qui CHANGE l\'état de l\'objet (manger, casser, finir) → 把 fortement recommandé',
            'Objet DÉFINI (un objet précis, pas générique) → 把 préféré',
            'Verbe nécessitant un COMPLÉMENT (de résultat, direction, durée)'
          ]
        },
        { type: 'example', hanzi: '我把车开走了', pinyin: 'wǒ bǎ chē kāizǒu le', translationFr: 'je suis parti(e) avec la voiture (l\'ai conduite et partie)' },
        { type: 'example', hanzi: '她把蛋糕切成八块', pinyin: 'tā bǎ dàngāo qiēchéng bā kuài', translationFr: 'elle a coupé le gâteau en 8 parts' }
      ]
    },
    {
      title: 'Les pièges classiques de 把',
      blocks: [
        {
          type: 'list',
          items: [
            'Le verbe ne peut PAS être nu — il doit avoir un complément (了, 在 + lieu, un complément de résultat comme 完, 好, 到…)',
            'Les verbes d\'état (是, 有, 喜欢, 知道) sont INCOMPATIBLES avec 把',
            'Les verbes de perception (看, 听) le sont aussi sauf cas particuliers',
            'L\'objet doit être DÉFINI (avec 这, 那, ou contexte clair) — pas générique'
          ]
        },
        {
          type: 'callout',
          tone: 'warning',
          text: 'Phrase incorrecte : ❌ 我把苹果喜欢. Il faut dire 我喜欢苹果.'
        }
      ]
    },
    {
      title: 'La construction 被 (bèi) — subir l\'action',
      blocks: [
        {
          type: 'p',
          text: '被 marque la voix passive : « être X par Y ». Structure :'
        },
        {
          type: 'callout',
          tone: 'info',
          text: 'Sujet (qui subit) + 被 + (Agent) + Verbe + Complément'
        },
        { type: 'example', hanzi: '苹果被我吃了', pinyin: 'píngguǒ bèi wǒ chī le', translationFr: 'la pomme a été mangée par moi' },
        { type: 'example', hanzi: '他被老师批评了', pinyin: 'tā bèi lǎoshī pīpíng le', translationFr: 'il s\'est fait gronder par le professeur' },
        { type: 'example', hanzi: '我的钱包被偷了', pinyin: 'wǒ de qiánbāo bèi tōu le', translationFr: 'mon portefeuille s\'est fait voler (agent omis)' },
        {
          type: 'p',
          text: 'L\'agent peut être omis si inconnu/peu important (cas du dernier exemple).'
        }
      ]
    },
    {
      title: 'Nuance culturelle : la voix passive en chinois',
      blocks: [
        {
          type: 'p',
          text: 'Historiquement, 被 portait une connotation NÉGATIVE. On l\'utilisait surtout pour des choses subies de manière désavantageuse : être grondé, volé, battu, déçu.'
        },
        {
          type: 'p',
          text: 'Aujourd\'hui, sous l\'influence des traductions de l\'anglais, 被 est de plus en plus utilisé en contexte neutre (un livre est publié, une décision est prise). Mais à l\'oral courant, beaucoup de Chinois préfèrent encore une tournure active ou impersonnelle.'
        },
        { type: 'example', hanzi: '这本书写得很好', pinyin: 'zhè běn shū xiě de hěn hǎo', translationFr: 'ce livre est bien écrit (tournure préférée à "被写得好")' }
      ]
    },
    {
      title: 'Astuce mnémotechnique',
      blocks: [
        {
          type: 'list',
          items: [
            '把 = "TAKE control" — tu manipules l\'objet activement',
            '被 = "BE done to" — tu subis l\'action'
          ]
        },
        {
          type: 'p',
          text: 'En pratique : si tu peux dire l\'action en français avec « prendre ... et le ... », c\'est 把. Si tu peux dire « être ...é par ... », c\'est 被.'
        },
        {
          type: 'quote',
          text: 'Une langue se maîtrise quand on cesse de chercher la règle et qu\'on commence à entendre la mélodie.',
          author: 'Anonyme'
        }
      ]
    }
  ]
};

const POST_HSK1_GUIDE: BlogPost = {
  slug: 'preparer-le-hsk-1-le-guide-complet',
  category: 'hsk',
  title: 'Préparer le HSK 1 — Le guide complet pour décrocher ton premier diplôme officiel',
  lead:
    'Le HSK 1 (HSK 3.0) demande 500 mots et 300 caractères. C\'est faisable en 3-6 mois avec une bonne méthode. Voici le plan concret.',
  publishedAt: '2026-05-13',
  readingMinutes: 9,
  author: DEFAULT_AUTHOR,
  heroImage:
    'https://images.unsplash.com/photo-1551295022-de5522c94e08?w=1600&q=80',
  heroCaption: 'Préparer un examen — le HSK 1 est ton premier vrai cap en mandarin',
  intro:
    'Passer le HSK 1, ce n\'est pas juste cocher des cases : c\'est un check-point qui te force à structurer tes 3-6 premiers mois d\'apprentissage. Voici ce qu\'on te demandera vraiment le jour J — et comment t\'y préparer sans paniquer.',
  sections: [
    {
      title: 'Ce que le HSK 1 demande (chiffres officiels)',
      blocks: [
        {
          type: 'p',
          text: 'Selon le standard HSK 3.0 publié par le Hanban en 2021 :'
        },
        {
          type: 'list',
          items: [
            '500 mots de vocabulaire (cumulé)',
            '300 caractères à reconnaître',
            'Grammaire de base : structure SVO, négation 不/没, particule 了, mesureur 个',
            'Compréhension de phrases simples au présent + passé',
            'Pas d\'écriture manuscrite requise au HSK 1-2'
          ]
        },
        {
          type: 'callout',
          tone: 'info',
          text: 'Le HSK 1 ne demande pas encore d\'épreuve orale. Tu seras testé(e) seulement sur la compréhension écrite et orale.'
        }
      ]
    },
    {
      title: 'Format de l\'examen',
      blocks: [
        {
          type: 'p',
          text: 'L\'examen dure environ 40 minutes et est divisé en 2 parties :'
        },
        {
          type: 'h3',
          text: 'Partie 1 — Compréhension orale (听力, 20 min)'
        },
        {
          type: 'list',
          items: [
            'Section 1 : 5 questions image-audio (cocher si l\'image correspond)',
            'Section 2 : 5 questions à choix entre 3 images',
            'Section 3 : 5 dialogues courts à compléter',
            'Section 4 : 5 phrases pour cocher la phrase correspondante'
          ]
        },
        {
          type: 'h3',
          text: 'Partie 2 — Compréhension écrite (阅读, 17 min)'
        },
        {
          type: 'list',
          items: [
            'Section 1 : 5 questions image-mot',
            'Section 2 : 5 phrases à compléter avec le bon mot',
            'Section 3 : 5 questions de mise en correspondance',
            'Section 4 : 5 phrases courtes à comprendre'
          ]
        }
      ]
    },
    {
      title: 'Le plan d\'attaque sur 4 mois (~1h/jour)',
      blocks: [
        {
          type: 'h3',
          text: 'Mois 1 — Bases phonétiques + premiers caractères'
        },
        {
          type: 'list',
          items: [
            'Semaine 1-2 : pinyin complet + 4 tons (drill quotidien)',
            'Semaine 3-4 : ~80-100 caractères de base (你, 我, 他, 是, 有, 不, 没, 一-十, etc.)',
            'Objectif fin de mois : tu peux lire le pinyin sans hésiter, écrire les 50 caractères les plus fréquents'
          ]
        },
        {
          type: 'h3',
          text: 'Mois 2 — Vocabulaire + grammaire de base'
        },
        {
          type: 'list',
          items: [
            'Ajout de 200 mots HSK 1 via SRS (Anki, XiaoLearn)',
            'Grammaire : structure SVO, 不/没, 吗, 也, 都, 很',
            'Première écoute compréhensible : podcasts pour débutants type Slow Chinese, ChinesePod niveau 1',
            'Objectif fin de mois : tu peux te présenter, dire ton âge, parler de ta famille en phrases simples'
          ]
        },
        {
          type: 'h3',
          text: 'Mois 3 — Complétion du vocabulaire + entraînement HSK'
        },
        {
          type: 'list',
          items: [
            'Compléter les 500 mots HSK 1',
            'Grammaire : 了, 的 (possessif), 在 + lieu, mesureur 个, vouloir/savoir/aimer',
            'Premiers exercices type HSK : achat de manuel officiel (HSK Standard Course Niveau 1)',
            'Objectif fin de mois : tu peux faire un test blanc sans paniquer (même si tu rates des questions)'
          ]
        },
        {
          type: 'h3',
          text: 'Mois 4 — Examens blancs intensifs'
        },
        {
          type: 'list',
          items: [
            'Au moins 4 examens blancs en conditions réelles',
            'Identifier tes points faibles et y revenir',
            'Écoute intensive : films courts adaptés débutants, dramas avec sous-titres',
            'Objectif : score > 180/200 en blanc → tu passes l\'examen sereine'
          ]
        }
      ]
    },
    {
      title: 'Les meilleurs supports gratuits ou peu chers',
      blocks: [
        {
          type: 'list',
          items: [
            'Manuel officiel HSK Standard Course Niveau 1 (~15 €, indispensable)',
            'XiaoLearn — niveau A1 complet gratuit, couvre largement le HSK 1',
            'Pleco (gratuit) — dictionnaire avec décomposition caractères et flashcards intégrées',
            'Hello Chinese (freemium) — grammaire animée, super pour débuter',
            'YouTube : chaînes Mandarin Corner, ChinesePod (vidéos débutant gratuites)',
            'Tests blancs gratuits sur chinesetest.cn (site officiel)'
          ]
        }
      ]
    },
    {
      title: 'Conseils pratiques pour le jour J',
      blocks: [
        {
          type: 'ordered',
          items: [
            'Arrive 30 min en avance — moins de stress, temps d\'acclimatation',
            'Apporte ta convocation imprimée + passeport (les centres exigent les deux)',
            'L\'écoute passe en premier — concentre-toi à 100 % ; tu ne peux pas y revenir',
            'Sur la lecture, ne perds pas de temps sur une question : passe et reviens',
            'Surveille la montre — 17 min pour 20 questions de lecture, c\'est ~50 sec/question'
          ]
        },
        {
          type: 'callout',
          tone: 'success',
          text: 'Le HSK 1 est éliminatoire à 120/200. La moyenne nationale réelle des Français est autour de 175/200. Avec un mois de préparation sérieuse en plus du parcours, c\'est largement faisable.'
        }
      ]
    },
    {
      title: 'Centres d\'examen en France',
      blocks: [
        {
          type: 'p',
          text: 'Le HSK se passe dans les Instituts Confucius et certaines universités. Les principaux centres :'
        },
        {
          type: 'list',
          items: [
            'Paris : Institut Confucius Paris VII, Inalco, Universités diverses',
            'Lyon : Institut Confucius de Lyon',
            'Toulouse, Strasbourg, Aix-Marseille, Bordeaux, Lille, Rennes : Instituts Confucius locaux',
            'Sessions : 4 à 6 fois par an selon le centre. Inscription environ 1-2 mois à l\'avance'
          ]
        },
        {
          type: 'callout',
          tone: 'info',
          text: 'Tarif HSK 1 en France : généralement 30-40 €. Beaucoup moins cher que les certifications anglais (TOEFL ~250 €, IELTS ~250 €).'
        }
      ]
    }
  ]
};

const POST_VOYAGER_CHINE: BlogPost = {
  slug: 'voyager-en-chine-sans-parler-chinois',
  category: 'conseils',
  title: 'Voyager en Chine sans (presque) parler chinois — Le guide de survie 2026',
  lead:
    'Tu pars en Chine en septembre et tu ne parles pas un mot ? Pas de panique. Voici les apps, les phrases et les hacks pour t\'en sortir partout, même en région.',
  publishedAt: '2026-05-13',
  readingMinutes: 12,
  author: DEFAULT_AUTHOR,
  heroImage:
    'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=1600&q=80',
  heroCaption: 'Grande Muraille de Chine — l\'aventure commence souvent par un voyage',
  intro:
    'La Chine est un pays où Google ne fonctionne pas, où peu de gens parlent anglais hors hôtels internationaux, et où ta CB peut être refusée. Voici comment t\'y préparer pour profiter du voyage au lieu de stresser.',
  sections: [
    {
      title: 'Avant de partir — Préparation administrative',
      blocks: [
        {
          type: 'h3',
          text: 'Le visa'
        },
        {
          type: 'p',
          text: 'Bonne nouvelle pour les Français : depuis fin 2023, exemption de visa pour les séjours touristiques de moins de 30 jours en Chine continentale (renouvelé jusqu\'à fin 2026). Au-delà, il faut un visa L (tourisme) à demander au consulat.'
        },
        {
          type: 'callout',
          tone: 'warning',
          text: 'Cette exemption peut changer — vérifie toujours le site officiel du consulat de Chine avant ton voyage.'
        },
        {
          type: 'h3',
          text: 'Apps à installer AVANT le départ'
        },
        {
          type: 'list',
          items: [
            'WeChat (微信) — indispensable, messagerie + paiement + tout',
            'Alipay (支付宝) — paiement, alternative à WeChat Pay',
            'Pleco — dictionnaire mandarin OCR (photographie un texte, traduit)',
            'Baidu Maps / Amap (高德) — Google Maps ne marche pas en Chine',
            'Didi (滴滴) — équivalent Uber, très utile',
            'Trip.com ou Ctrip — réservations train et hôtels',
            'VPN (avant d\'arriver !) — ExpressVPN, NordVPN ou similaire si tu veux Google, Instagram, WhatsApp'
          ]
        }
      ]
    },
    {
      title: 'Le paiement — Le piège n°1 des voyageurs',
      blocks: [
        {
          type: 'p',
          text: 'En 2026, la Chine est l\'un des pays les plus cashless au monde. Carte bancaire étrangère ? Souvent refusée. Cash ? Beaucoup de petits commerces n\'en veulent plus.'
        },
        {
          type: 'h3',
          text: 'La solution : Alipay/WeChat Pay pour étrangers'
        },
        {
          type: 'p',
          text: 'Depuis 2024, Alipay et WeChat Pay permettent aux étrangers de payer en liant une carte Visa/Mastercard internationale. C\'est devenu fluide. Configure-le AVANT d\'arriver — la vérification d\'identité peut prendre 24-48h.'
        },
        {
          type: 'callout',
          tone: 'info',
          text: 'Garde quand même 500-1000 ¥ en cash pour les taxis en région rurale et les petits stands sans QR code.'
        }
      ]
    },
    {
      title: 'Les 30 phrases vraiment indispensables',
      blocks: [
        {
          type: 'h3',
          text: 'Politesse de base'
        },
        { type: 'example', hanzi: '你好', pinyin: 'nǐ hǎo', translationFr: 'bonjour' },
        { type: 'example', hanzi: '谢谢', pinyin: 'xièxie', translationFr: 'merci' },
        { type: 'example', hanzi: '不客气', pinyin: 'bú kèqi', translationFr: 'de rien' },
        { type: 'example', hanzi: '对不起', pinyin: 'duìbuqǐ', translationFr: 'pardon / désolé(e)' },
        { type: 'example', hanzi: '再见', pinyin: 'zàijiàn', translationFr: 'au revoir' },
        {
          type: 'h3',
          text: 'Survie alimentaire'
        },
        { type: 'example', hanzi: '我不吃辣', pinyin: 'wǒ bù chī là', translationFr: 'je ne mange pas épicé' },
        { type: 'example', hanzi: '我吃素', pinyin: 'wǒ chī sù', translationFr: 'je suis végétarien(ne)' },
        { type: 'example', hanzi: '不要香菜', pinyin: 'bú yào xiāngcài', translationFr: 'pas de coriandre' },
        { type: 'example', hanzi: '一瓶水', pinyin: 'yī píng shuǐ', translationFr: 'une bouteille d\'eau' },
        { type: 'example', hanzi: '买单', pinyin: 'mǎi dān', translationFr: 'l\'addition' },
        {
          type: 'h3',
          text: 'Se déplacer'
        },
        { type: 'example', hanzi: '在哪里？', pinyin: 'zài nǎli', translationFr: 'où est-ce ?' },
        { type: 'example', hanzi: '怎么去...？', pinyin: 'zěnme qù...', translationFr: 'comment aller à... ?' },
        { type: 'example', hanzi: '这是哪里？', pinyin: 'zhè shì nǎli', translationFr: 'c\'est où ici ?' },
        { type: 'example', hanzi: '我迷路了', pinyin: 'wǒ mílù le', translationFr: 'je suis perdu(e)' },
        { type: 'example', hanzi: '请送我去这个地方', pinyin: 'qǐng sòng wǒ qù zhège dìfang', translationFr: '(au taxi) emmenez-moi à cet endroit' },
        {
          type: 'h3',
          text: 'Urgence et confusion'
        },
        { type: 'example', hanzi: '我不懂', pinyin: 'wǒ bù dǒng', translationFr: 'je ne comprends pas' },
        { type: 'example', hanzi: '请慢一点', pinyin: 'qǐng màn yī diǎn', translationFr: 's\'il vous plaît, plus lentement' },
        { type: 'example', hanzi: '你会说英语吗？', pinyin: 'nǐ huì shuō yīngyǔ ma', translationFr: 'parlez-vous anglais ?' },
        { type: 'example', hanzi: '帮我！', pinyin: 'bāng wǒ', translationFr: 'aidez-moi !' },
        { type: 'example', hanzi: '多少钱？', pinyin: 'duōshao qián', translationFr: 'combien ça coûte ?' },
        { type: 'example', hanzi: '太贵了', pinyin: 'tài guì le', translationFr: 'trop cher' },
        { type: 'example', hanzi: '便宜一点', pinyin: 'piányi yī diǎn', translationFr: 'moins cher' }
      ]
    },
    {
      title: 'Les hacks technologiques',
      blocks: [
        {
          type: 'h3',
          text: 'Traduction par photo'
        },
        {
          type: 'p',
          text: 'Pleco et Google Translate permettent de prendre en photo un menu / panneau / contrat et d\'avoir une traduction instantanée. Vital pour les menus de restos sans anglais.'
        },
        {
          type: 'h3',
          text: 'Traduction conversationnelle'
        },
        {
          type: 'p',
          text: 'WeChat a une fonction de traduction intégrée : tu écris en français, le destinataire reçoit en chinois et vice-versa. Pas parfait mais largement suffisant pour comprendre un chauffeur de taxi ou un hôtelier.'
        },
        {
          type: 'h3',
          text: 'Capture d\'écran d\'adresse'
        },
        {
          type: 'p',
          text: 'Tu pars en taxi ? Sors une capture d\'écran de ton hôtel sur Baidu Maps. Tu montres au chauffeur, c\'est résolu. Beaucoup plus fiable que de prononcer une adresse au pifomètre.'
        }
      ]
    },
    {
      title: 'Pièges fréquents pour les Français',
      blocks: [
        {
          type: 'list',
          items: [
            'Bouilloire et eau du robinet : NE BOIS JAMAIS l\'eau du robinet, même bouillie. Achète des bouteilles ou utilise les bouilloires de l\'hôtel (l\'eau est filtrée).',
            'Toilettes publiques : prévoir mouchoirs et savon en poche, rarement fournis. Les toilettes à la turque sont normales.',
            'Marchandage : en marché OUI, en magasins/supermarchés NON. Si tu marchandes dans un mall, on te regardera bizarrement.',
            'Boire de l\'alcool fort en banquet pro : les "baijiu cheers" sont culturels. Décline avec "我不能喝酒" (wǒ bù néng hē jiǔ, je ne peux pas boire d\'alcool) si tu ne veux pas.',
            'Photos : demande avant de photographier des personnes. Et pas de photo dans les zones militaires (pas toujours signalées).',
            'Hôtels : pas tous autorisés à accueillir des étrangers en région. Vérifie sur Booking/Ctrip que ton hôtel accepte les "foreigners".'
          ]
        }
      ]
    },
    {
      title: 'Bonus : ce que tu vas apprendre malgré toi',
      blocks: [
        {
          type: 'p',
          text: 'Même en 2 semaines, tu rentreras avec quelques dizaines de mots ancrés à vie : 你好, 谢谢, 多少钱, 这个, 不要, 米饭, 茶, 啤酒... C\'est mieux que rien et c\'est une base sympa pour démarrer un apprentissage sérieux en rentrant.'
        },
        {
          type: 'quote',
          text: 'Le mandarin ne s\'apprend pas avant de partir en Chine — il commence à s\'apprendre quand tu en reviens.',
          author: 'Marie, voyageuse française'
        }
      ]
    }
  ]
};

const POST_GUANXI: BlogPost = {
  slug: 'le-guanxi-relations-en-chine',
  category: 'culture',
  title: 'Le Guanxi (关系) — Comprendre le système de relations en Chine pour ne pas s\'y casser les dents',
  lead:
    'Pourquoi un Chinois t\'offre des cadeaux à votre 2e rencontre ? Pourquoi tout passe par les "connaissances" ? Voici le concept-clé du Guanxi expliqué simplement.',
  publishedAt: '2026-05-13',
  readingMinutes: 8,
  author: DEFAULT_AUTHOR,
  heroImage:
    'https://images.unsplash.com/photo-1538428494232-9c0d8a3ab403?w=1600&q=80',
  heroCaption: 'Shanghai moderne — où les business deals se font autant à table que dans les bureaux',
  intro:
    'Si tu fais du business en Chine, si tu y vis ou simplement si tu t\'y fais un(e) ami(e) chinois(e), tu te heurteras au concept de 关系 (guānxi). C\'est l\'huile qui fait tourner toute la société chinoise — et c\'est très différent du "réseau" français.',
  sections: [
    {
      title: 'Qu\'est-ce que le Guanxi ?',
      blocks: [
        {
          type: 'p',
          text: '关系 (guānxi) signifie littéralement "connexion" ou "relation". Mais au-delà du sens neutre, c\'est tout un système social : un réseau de relations basé sur la confiance mutuelle, les faveurs rendues, et l\'obligation morale de réciprocité.'
        },
        {
          type: 'p',
          text: 'Avoir du "bon guanxi" avec quelqu\'un, c\'est avoir une relation où on peut compter sur l\'autre pour un service, et où on est attendu(e) à rendre la pareille un jour. Ce n\'est pas une amitié au sens occidental : c\'est plus codifié, plus pragmatique, mais aussi plus durable.'
        },
        {
          type: 'callout',
          tone: 'info',
          text: 'Le Guanxi ne se limite pas au business. Il structure aussi la famille, l\'école, le voisinage, la politique.'
        }
      ]
    },
    {
      title: 'Les origines confucéennes',
      blocks: [
        {
          type: 'p',
          text: 'Le concept découle directement de la pensée confucéenne (儒家 rújiā), qui structure la société selon 5 relations fondamentales (五伦, wǔlún) :'
        },
        {
          type: 'list',
          items: [
            '君臣 (souverain-sujet) — devoir de loyauté',
            '父子 (père-fils) — devoir filial',
            '夫妻 (mari-femme) — devoir d\'harmonie',
            '兄弟 (aîné-cadet) — devoir de respect mutuel',
            '朋友 (amis) — devoir de confiance'
          ]
        },
        {
          type: 'p',
          text: 'Chaque relation impose des obligations réciproques. Le Guanxi moderne est l\'extension contemporaine de ce système : on construit, entretient et utilise un réseau de relations dans toutes les sphères de la vie.'
        }
      ]
    },
    {
      title: 'Comment le Guanxi se construit',
      blocks: [
        {
          type: 'h3',
          text: '1. Les repas partagés (吃饭)'
        },
        {
          type: 'p',
          text: 'Aucun business sérieux ne se conclut sans avoir partagé au moins un repas. La table chinoise est l\'espace de construction du Guanxi par excellence : on boit du baijiu, on goûte des plats, on échange sur la famille avant les affaires.'
        },
        {
          type: 'h3',
          text: '2. Les cadeaux (送礼 sòng lǐ)'
        },
        {
          type: 'p',
          text: 'Offrir un cadeau bien choisi est un acte fondateur de relation. Mais attention aux pièges : pas d\'horloge (送钟 = 送终, "envoyer aux funérailles"), pas de parapluie (伞 sǎn = 散 sàn, "séparation"), pas de couteaux (couper la relation).'
        },
        {
          type: 'h3',
          text: '3. Le face (面子 miànzi)'
        },
        {
          type: 'p',
          text: 'Donner du "face" à quelqu\'un — le mettre en valeur, lui montrer du respect — renforce le Guanxi. Lui faire perdre la face en public le détruit. C\'est LA règle d\'or à maîtriser.'
        },
        {
          type: 'h3',
          text: '4. Les faveurs (人情 rénqíng)'
        },
        {
          type: 'p',
          text: 'Tu rends un service, tu "dépose" du rénqíng dans la relation. L\'autre est moralement obligé de te le rendre un jour. Ne demande pas un service que tu ne pourras pas rendre — sinon tu déstabilises l\'équilibre.'
        }
      ]
    },
    {
      title: 'Guanxi vs Réseau à la française : 4 différences',
      blocks: [
        {
          type: 'ordered',
          items: [
            'TEMPS : un réseau pro français se construit en quelques rencontres. Un guanxi se construit sur des années, parfois des décennies.',
            'PROFONDEUR : le guanxi mélange perso et pro. Tes collègues chinois rencontreront ta famille, viendront à ton mariage. Le mur "perso/pro" est culturel français.',
            'OBLIGATIONS : le guanxi crée des dettes morales. Un service rendu doit être rendu — mais pas tout de suite (ce serait insultant). Souvent dans plusieurs mois ou années.',
            'GROUPE : le guanxi se transmet. Si A introduit B à C, B doit honorer la confiance de A. C\'est un système triangulaire, pas binaire.'
          ]
        }
      ]
    },
    {
      title: 'Le vocabulaire du Guanxi',
      blocks: [
        { type: 'example', hanzi: '关系', pinyin: 'guānxi', translationFr: 'relation, connexion' },
        { type: 'example', hanzi: '面子', pinyin: 'miànzi', translationFr: 'face, prestige social' },
        { type: 'example', hanzi: '给面子', pinyin: 'gěi miànzi', translationFr: 'donner du face (faire honneur)' },
        { type: 'example', hanzi: '丢面子', pinyin: 'diū miànzi', translationFr: 'perdre la face' },
        { type: 'example', hanzi: '人情', pinyin: 'rénqíng', translationFr: 'faveur morale, dette de gratitude' },
        { type: 'example', hanzi: '送礼', pinyin: 'sòng lǐ', translationFr: 'offrir un cadeau (codifié)' },
        { type: 'example', hanzi: '走后门', pinyin: 'zǒu hòumén', translationFr: 'passer par la porte de derrière (= via connaissances)' },
        { type: 'example', hanzi: '介绍', pinyin: 'jièshào', translationFr: 'présenter, introduire (deux personnes)' }
      ]
    },
    {
      title: 'Pour un Français : 5 erreurs à éviter',
      blocks: [
        {
          type: 'ordered',
          items: [
            'Demander directement un service à un nouveau contact — sans dépôt préalable de Guanxi, c\'est mal vu.',
            'Décliner systématiquement les invitations à dîner pro — c\'est refuser de construire la relation.',
            'Critiquer ouvertement quelqu\'un en réunion — perte de face publique impardonnable.',
            'Refuser un cadeau offert — c\'est refuser la relation.',
            'Oublier de rendre une faveur — la relation s\'effrite silencieusement.'
          ]
        },
        {
          type: 'quote',
          text: 'En Chine, ton CV ne vaut rien si personne ne peut te recommander. Le Guanxi, c\'est le vrai capital social — et il se construit avec patience.',
          author: 'Sophie, consultante en commerce international'
        }
      ]
    }
  ]
};

// ============================================================================
//  EXPORT
// ============================================================================

export const BLOG_POSTS: BlogPost[] = [
  POST_BONNE_NUIT,
  POST_GUIDE_HONNETE,
  POST_BONJOUR_AVANCE,
  POST_FELICITATIONS,
  POST_HANZI,
  POST_4_TONS,
  POST_HSK,
  POST_CPOP,
  POST_CHUNJIE,
  POST_LE,
  POST_MESUREURS,
  POST_DRAMAS,
  POST_RESTAURANT,
  POST_PARTICULES_FINALES,
  POST_THE_CHINOIS,
  POST_CUISINES,
  POST_BA_BEI,
  POST_HSK1_GUIDE,
  POST_VOYAGER_CHINE,
  POST_GUANXI
];

export const getBlogPost = (slug: string): BlogPost | undefined =>
  BLOG_POSTS.find((p) => p.slug === slug);

export const getFeaturedPost = (): BlogPost | undefined =>
  BLOG_POSTS.find((p) => p.featured);

export const getPostsByCategory = (category: BlogCategory | 'all'): BlogPost[] => {
  if (category === 'all') return BLOG_POSTS;
  return BLOG_POSTS.filter((p) => p.category === category);
};
