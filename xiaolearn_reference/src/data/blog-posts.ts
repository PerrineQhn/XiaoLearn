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

const POST_MERCI: BlogPost = {
  slug: 'comment-dire-merci-en-chinois',
  category: 'vocabulaire',
  title: 'Comment dire "merci" en chinois — 谢谢, 多谢 et toutes les nuances de la gratitude',
  lead:
    'En Chine, dire merci ne se résume pas à 谢谢. Selon que tu remercies un proche, un serveur ou ton patron, la formule change — et entre intimes, on ne remercie parfois même pas.',
  publishedAt: '2026-05-28',
  readingMinutes: 10,
  author: DEFAULT_AUTHOR,
  heroImage:
    'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=1600&q=80',
  heroCaption: 'Marché de Chengdu — un simple 谢谢 suffit dans 95 % des situations',
  intro:
    'Tu connais 谢谢 (xièxie) et tu penses avoir fait le tour ? Pas tout à fait. Le chinois distingue très finement les types de gratitude : un merci de politesse, un merci pour un service rendu, un merci pour avoir pris la peine. Et il y a un piège culturel : entre proches, remercier trop peut créer de la distance. Voici le mode d\'emploi complet.',
  sections: [
    {
      title: '谢谢 — le merci universel à mémoriser en priorité',
      blocks: [
        { type: 'p', text: '谢谢 (xièxie) est de très loin le merci le plus utilisé. Tu peux le dire dans 95 % des situations sans risque de faux pas : au serveur qui pose ton plat, au passant qui ramasse ton écharpe, au collègue qui te tend un stylo.' },
        { type: 'p', text: 'Note la prononciation : le deuxième 谢 se prononce au ton neutre (xie sans ton), même si la syllabe porte normalement un 4e ton. Beaucoup de débutants l\'accentuent trop, ce qui sonne théâtral.' },
        { type: 'callout', tone: 'info', text: 'Si tu ne retiens qu\'une seule formule de cet article, c\'est celle-là — et avec une prononciation détendue.' },
        { type: 'example', hanzi: '谢谢', pinyin: 'xièxie', translationFr: 'merci (standard)' },
        { type: 'example', hanzi: '谢谢你', pinyin: 'xièxie nǐ', translationFr: 'merci à toi (plus personnel)' },
        { type: 'example', hanzi: '谢谢您', pinyin: 'xièxie nín', translationFr: 'merci à vous (poli, à un aîné ou supérieur)' }
      ]
    },
    {
      title: '多谢 — un merci un peu plus chaleureux',
      blocks: [
        { type: 'p', text: '多谢 (duōxiè), littéralement « beaucoup-merci », est plus marqué que 谢谢 sans être cérémonieux. On l\'utilise surtout quand quelqu\'un a fait quelque chose pour toi : un service un peu plus important qu\'un simple geste.' },
        { type: 'p', text: 'C\'est aussi très fréquent à l\'écrit, dans les messages WeChat, comme équivalent de « merci beaucoup ! » en moins ampoulé que 非常感谢.' },
        { type: 'example', hanzi: '多谢', pinyin: 'duōxiè', translationFr: 'merci beaucoup (chaleureux, courant)' },
        { type: 'example', hanzi: '多谢提醒', pinyin: 'duōxiè tíxǐng', translationFr: 'merci de me l\'avoir rappelé' }
      ]
    },
    {
      title: '非常感谢 — le merci formel et appuyé',
      blocks: [
        { type: 'p', text: '非常感谢 (fēicháng gǎnxiè), « extrêmement reconnaissant », est la version officielle du merci. Tu l\'entendras dans :' },
        { type: 'list', items: [
          'les emails professionnels',
          'les discours, les remerciements publics',
          'les situations où tu veux marquer le coup (cadeau important, aide significative)',
          'les remerciements écrits formels'
        ]},
        { type: 'p', text: 'À l\'oral entre amis, ça sonnerait pompeux. Garde-le pour l\'écrit ou les situations formelles.' },
        { type: 'example', hanzi: '非常感谢', pinyin: 'fēicháng gǎnxiè', translationFr: 'merci infiniment (formel)' },
        { type: 'example', hanzi: '非常感谢您的帮助', pinyin: 'fēicháng gǎnxiè nín de bāngzhù', translationFr: 'merci infiniment pour votre aide' }
      ]
    },
    {
      title: '麻烦你了 — la formule qui n\'existe pas en français',
      blocks: [
        { type: 'p', text: '麻烦你了 (máfan nǐ le) signifie littéralement « je t\'ai causé du trouble ». C\'est un merci qui reconnaît que la personne a pris la peine de faire quelque chose pour toi — quelque chose à laquelle elle n\'était pas obligée.' },
        { type: 'p', text: 'On l\'utilise après qu\'on t\'a aidé à porter ta valise, accompagné quelque part, ou pris du temps pour t\'expliquer une démarche. C\'est l\'un des mercis les plus utiles à retenir, parce qu\'il n\'a aucun équivalent direct en français.' },
        { type: 'callout', tone: 'success', text: 'Astuce : dit au futur — « 麻烦你 » sans 了 — il sert à demander un service poliment. « Je vais t\'embêter mais... »' },
        { type: 'example', hanzi: '麻烦你了', pinyin: 'máfan nǐ le', translationFr: 'désolé de t\'avoir dérangé / merci de t\'être donné cette peine' },
        { type: 'example', hanzi: '麻烦你帮我一下', pinyin: 'máfan nǐ bāng wǒ yīxià', translationFr: 'pourrais-tu m\'aider un instant (poli) ?' }
      ]
    },
    {
      title: '辛苦了 — reconnaître l\'effort de l\'autre',
      blocks: [
        { type: 'p', text: '辛苦了 (xīnkǔ le), « tu as travaillé dur / tu t\'es donné(e) du mal », n\'est pas exactement un merci, mais en remplit la fonction dans beaucoup de contextes. C\'est une reconnaissance de l\'effort fourni.' },
        { type: 'p', text: 'On le dit au livreur qui arrive après avoir grimpé 6 étages, à un collègue qui rentre tard, à son employée de ménage en partant. Au bureau, le patron le dit régulièrement à son équipe en fin de journée.' },
        { type: 'example', hanzi: '辛苦了', pinyin: 'xīnkǔ le', translationFr: 'merci pour ton/votre travail (litt. « tu t\'es donné du mal »)' },
        { type: 'example', hanzi: '大家辛苦了', pinyin: 'dàjiā xīnkǔ le', translationFr: 'merci à tous pour votre travail (à une équipe)' }
      ]
    },
    {
      title: '感谢 vs 谢谢 — quelle différence ?',
      blocks: [
        { type: 'p', text: 'Les deux verbes signifient « remercier », mais ne se construisent pas pareil :' },
        { type: 'list', items: [
          '谢谢 → suivi directement de la personne ou rien : 谢谢你, 谢谢老师',
          '感谢 → plus formel, souvent dans des structures plus complètes : 感谢您的支持',
          '感谢 implique une gratitude plus profonde ; 谢谢 reste de la politesse quotidienne'
        ]},
        { type: 'example', hanzi: '感谢您的支持', pinyin: 'gǎnxiè nín de zhīchí', translationFr: 'merci pour votre soutien (formel)' },
        { type: 'example', hanzi: '我很感谢你', pinyin: 'wǒ hěn gǎnxiè nǐ', translationFr: 'je te suis très reconnaissant(e)' }
      ]
    },
    {
      title: 'Comment répondre quand on te remercie',
      blocks: [
        { type: 'p', text: 'En français, on dit « de rien », « je t\'en prie », « pas de quoi ». Le chinois a aussi tout un éventail :' },
        { type: 'h3', text: '不客气 — de rien, je t\'en prie' },
        { type: 'p', text: 'C\'est la réponse standard. Littéralement « ne sois pas poli ». S\'utilise partout, du resto au bureau.' },
        { type: 'example', hanzi: '不客气', pinyin: 'bú kèqi', translationFr: 'de rien, je t\'en prie' },
        { type: 'h3', text: '不用谢 — pas besoin de remercier' },
        { type: 'p', text: 'Une variante très courante, légèrement plus chaleureuse. À utiliser sans modération.' },
        { type: 'example', hanzi: '不用谢', pinyin: 'bú yòng xiè', translationFr: 'pas de quoi (litt. « inutile de remercier »)' },
        { type: 'h3', text: '没事 — c\'est rien' },
        { type: 'p', text: 'Très oral, très détendu. Entre amis ou pour minimiser un service.' },
        { type: 'example', hanzi: '没事', pinyin: 'méi shì', translationFr: 'c\'est rien (oral, détendu)' },
        { type: 'h3', text: '应该的 — c\'était normal' },
        { type: 'p', text: 'Quand on te remercie pour quelque chose que tu considérais comme ton devoir. Très utilisé par les services publics ou face à un client.' },
        { type: 'example', hanzi: '应该的', pinyin: 'yīnggāi de', translationFr: 'c\'était normal (mon devoir)' }
      ]
    },
    {
      title: 'Le piège culturel : remercier trop peut éloigner',
      blocks: [
        { type: 'p', text: 'Voilà LE point que les manuels passent souvent sous silence : entre proches en Chine, on remercie peu. Dire 谢谢 à un parent, un frère ou son compagnon de longue date pour un service quotidien, c\'est créer une distance.' },
        { type: 'p', text: 'L\'idée est simple : entre nous, ce sont des évidences. Te remercier reviendrait à te traiter en étranger. Beaucoup de Français racontent leurs premières erreurs sociales sur ce point, en remerciant systématiquement leur belle-famille chinoise pour le moindre geste.' },
        { type: 'callout', tone: 'warning', text: 'Entre proches, un sourire, un acquiescement, un « 嗯 » suffit. Garde les 谢谢 pour les vrais services rendus.' },
        { type: 'quote', text: 'Quand j\'ai arrêté de dire merci à ma belle-mère pour chaque assiette, j\'ai senti qu\'elle se détendait. Comme si j\'étais enfin de la famille.', author: 'Camille, Française installée à Hangzhou' }
      ]
    },
    {
      title: 'Mon conseil personnel',
      blocks: [
        { type: 'p', text: 'Commence par maîtriser 谢谢 et 不客气, qui couvrent 90 % de tes besoins. Ajoute 麻烦你了 dès que tu peux : c\'est la formule qui te fera passer pour un francophone qui « comprend vraiment ». Et observe les Chinois autour de toi pour saisir quand ils remercient — et surtout quand ils ne le font pas.' },
        { type: 'p', text: 'La gratitude, en chinois comme partout, est avant tout une affaire de ton, de regard et de timing. Le mot n\'est qu\'un support.' }
      ]
    }
  ]
};

const POST_BU_MEI: BlogPost = {
  slug: 'bu-ou-mei-negation-en-chinois',
  category: 'grammaire',
  title: '不 ou 没 — Les deux négations du chinois et comment ne plus les confondre',
  lead:
    'En français, « ne... pas » couvre tout. En chinois, deux mots se partagent le travail : 不 pour le présent/futur, 没 pour le passé. Mais ce n\'est qu\'une partie de l\'histoire.',
  publishedAt: '2026-05-28',
  readingMinutes: 11,
  author: DEFAULT_AUTHOR,
  heroImage:
    'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=1600&q=80',
  heroCaption: 'Tableau noir — 不 et 没 sont la première vraie embûche grammaticale des francophones',
  intro:
    'Tu écris 我不去 et ton prof corrige en 我没去. Tu écris 我没喜欢 et il te dit que c\'est faux. Pourquoi ? Parce qu\'en chinois, la négation dépend du TEMPS et du TYPE de verbe — pas seulement du sens. Voici la règle complète, avec les pièges où tombent 90 % des francophones.',
  sections: [
    {
      title: 'La règle de base en une phrase',
      blocks: [
        { type: 'callout', tone: 'info', text: '不 (bù) → présent, futur, habitudes, états, opinions. 没 (méi) → passé, action qui n\'a pas eu lieu, négation du verbe 有.' },
        { type: 'p', text: 'C\'est la règle qui couvre 80 % des cas. Si tu retiens uniquement celle-là, tu feras déjà beaucoup moins d\'erreurs. Mais il y a des subtilités, et notamment des cas où l\'une est impossible.' }
      ]
    },
    {
      title: '不 (bù) — la négation du présent, du futur et des états',
      blocks: [
        { type: 'p', text: '不 nie tout ce qui est :' },
        { type: 'list', items: [
          'une action au présent ou au futur : 我不去 (je n\'y vais pas / je n\'irai pas)',
          'une habitude : 他不吃肉 (il ne mange pas de viande, en général)',
          'une opinion ou une volonté : 我不想 (je ne veux pas)',
          'un état ou un adjectif : 我不累 (je ne suis pas fatigué)',
          'une capacité ou une obligation : 我不会, 我不能, 我不要'
        ]},
        { type: 'example', hanzi: '我不喜欢咖啡', pinyin: 'wǒ bù xǐhuan kāfēi', translationFr: 'je n\'aime pas le café' },
        { type: 'example', hanzi: '明天我不上班', pinyin: 'míngtiān wǒ bú shàngbān', translationFr: 'demain je ne travaille pas' },
        { type: 'example', hanzi: '他不是法国人', pinyin: 'tā bú shì fǎguórén', translationFr: 'il n\'est pas Français' },
        { type: 'h3', text: 'Petit détail de prononciation : 不 change de ton' },
        { type: 'p', text: 'À l\'oral, 不 se prononce normalement bù (4e ton). MAIS quand le mot qui suit est aussi au 4e ton, 不 devient bú (2e ton). Exemple : 不是 = bú shì, pas bù shì. Cette règle de sandhi tonal est obligatoire et tu l\'entendras dans tous les enregistrements natifs.' }
      ]
    },
    {
      title: '没 (méi) — la négation du passé et de 有',
      blocks: [
        { type: 'p', text: '没 nie principalement :' },
        { type: 'list', items: [
          'une action passée qui n\'a PAS eu lieu : 我没去 (je n\'y suis pas allé)',
          'le verbe 有 (avoir / il y a) — TOUJOURS avec 没, jamais avec 不',
          'le résultat ou l\'achèvement d\'une action : 我没吃完 (je n\'ai pas fini de manger)'
        ]},
        { type: 'example', hanzi: '我昨天没去学校', pinyin: 'wǒ zuótiān méi qù xuéxiào', translationFr: 'je ne suis pas allé à l\'école hier' },
        { type: 'example', hanzi: '我没有钱', pinyin: 'wǒ méi yǒu qián', translationFr: 'je n\'ai pas d\'argent' },
        { type: 'example', hanzi: '他还没来', pinyin: 'tā hái méi lái', translationFr: 'il n\'est pas encore arrivé' },
        { type: 'callout', tone: 'warning', text: 'Erreur typique des francophones : ❌ 我不有钱 → ✅ 我没有钱 (ou abrégé : 我没钱).' }
      ]
    },
    {
      title: 'La règle d\'or : 有 ne se nie qu\'avec 没',
      blocks: [
        { type: 'p', text: 'C\'est l\'exception la plus absolue du chinois moderne : le verbe 有 (avoir / il y a) ne se nie JAMAIS avec 不. Toujours 没有, jamais 不有.' },
        { type: 'p', text: 'Pourquoi ? Historiquement, 没 a été créé spécifiquement pour nier 有. La forme abrégée 没 utilisée pour les autres verbes au passé est venue après.' },
        { type: 'example', hanzi: '我有时间', pinyin: 'wǒ yǒu shíjiān', translationFr: 'j\'ai du temps' },
        { type: 'example', hanzi: '我没有时间', pinyin: 'wǒ méi yǒu shíjiān', translationFr: 'je n\'ai pas de temps (correct)' },
        { type: 'callout', tone: 'warning', text: 'À mémoriser comme un réflexe : 有 + négation = 没有. Toujours. Sans exception.' }
      ]
    },
    {
      title: 'Le piège du verbe 是',
      blocks: [
        { type: 'p', text: 'Symétriquement, le verbe 是 (être) se nie TOUJOURS avec 不, même au passé. C\'est l\'exception inverse de celle de 有.' },
        { type: 'example', hanzi: '他不是我的朋友', pinyin: 'tā bú shì wǒ de péngyou', translationFr: 'il n\'est pas mon ami' },
        { type: 'example', hanzi: '昨天他不是一个人去的', pinyin: 'zuótiān tā bú shì yí ge rén qù de', translationFr: 'hier il n\'y est pas allé seul' },
        { type: 'p', text: 'Même quand l\'action est au passé, on garde 不是. La négation porte sur l\'identité, pas sur le déroulement d\'une action.' }
      ]
    },
    {
      title: 'Au passé : 不 et 没 changent le sens',
      blocks: [
        { type: 'p', text: 'Petite finesse essentielle : on PEUT mettre 不 devant une action passée, mais ça change le sens. Compare :' },
        { type: 'list', items: [
          '我昨天没去 — je n\'y suis pas allé hier (= action qui n\'a simplement pas eu lieu)',
          '我昨天不去 — je refusais d\'y aller hier (= volonté de ne pas y aller, à un moment donné dans le passé)'
        ]},
        { type: 'p', text: '不 dans le passé exprime donc une décision, un refus, une intention. 没 exprime juste l\'absence de l\'action. Cette nuance peut transformer toute une histoire.' },
        { type: 'example', hanzi: '他不来', pinyin: 'tā bù lái', translationFr: 'il ne vient pas / refuse de venir' },
        { type: 'example', hanzi: '他没来', pinyin: 'tā méi lái', translationFr: 'il n\'est pas venu' }
      ]
    },
    {
      title: 'Habitude vs événement précis',
      blocks: [
        { type: 'p', text: 'Une même action peut prendre 不 ou 没 selon qu\'on parle d\'une habitude ou d\'un événement ponctuel :' },
        { type: 'list', items: [
          '他不吃肉 — il ne mange pas de viande (habituellement / en général)',
          '他没吃肉 — il n\'a pas mangé de viande (à ce repas-là, action ponctuelle)'
        ]},
        { type: 'p', text: 'C\'est exactement la distinction que le français fait avec « il ne mange pas de viande » (habitude) vs « il n\'a pas mangé de viande » (un repas précis).' },
        { type: 'example', hanzi: '我不抽烟', pinyin: 'wǒ bù chōuyān', translationFr: 'je ne fume pas (jamais, j\'ai arrêté ou jamais commencé)' },
        { type: 'example', hanzi: '我今天没抽烟', pinyin: 'wǒ jīntiān méi chōuyān', translationFr: 'je n\'ai pas fumé aujourd\'hui (mais peut-être hier)' }
      ]
    },
    {
      title: 'Les erreurs typiques des francophones',
      blocks: [
        { type: 'ordered', items: [
          '❌ 我没喜欢 → ✅ 我不喜欢. 喜欢 est un état / une opinion : c\'est toujours 不, même au passé.',
          '❌ 我不有 → ✅ 我没有. Le verbe 有 ne se nie qu\'avec 没.',
          '❌ 他没是法国人 → ✅ 他不是法国人. Le verbe 是 ne se nie qu\'avec 不.',
          '❌ 我没饿 → ✅ 我不饿. Les adjectifs (états) prennent 不, jamais 没.',
          '❌ 我昨天没去了 → ✅ 我昨天没去. Après 没, on ne met PAS 了 (puisque l\'action n\'a pas eu lieu, le marqueur d\'achèvement n\'a pas de sens).'
        ]},
        { type: 'callout', tone: 'warning', text: 'La dernière erreur est très tenace : 没 et 了 sont incompatibles. Si tu as 没, tu n\'as pas 了.' }
      ]
    },
    {
      title: 'Test express : 不 ou 没 ?',
      blocks: [
        { type: 'p', text: 'Petit auto-test. Quelle négation pour chacune de ces phrases ?' },
        { type: 'ordered', items: [
          'Je n\'ai pas faim. → 我 ___ 饿',
          'Je n\'ai pas mangé. → 我 ___ 吃',
          'Je ne mange pas de porc. → 我 ___ 吃猪肉',
          'Il n\'est pas étudiant. → 他 ___ 是学生',
          'Je n\'ai pas de frère. → 我 ___ 有哥哥'
        ]},
        { type: 'callout', tone: 'success', text: 'Réponses : 1. 不 (état) — 2. 没 (action passée) — 3. 不 (habitude) — 4. 不 (verbe 是) — 5. 没 (verbe 有).' }
      ]
    },
    {
      title: 'Récapitulatif mental',
      blocks: [
        { type: 'p', text: 'Pour décider entre 不 et 没, pose-toi deux questions dans cet ordre :' },
        { type: 'ordered', items: [
          'Le verbe est-il 有 ? → Si oui, c\'est 没. Stop.',
          'Le verbe est-il 是 ? → Si oui, c\'est 不. Stop.',
          'L\'action a-t-elle eu lieu (ou aurait dû avoir lieu) dans le passé ? → 没.',
          'Sinon → 不 (présent, futur, habitude, état, opinion, refus).'
        ]},
        { type: 'quote', text: 'Une fois que tu sens 不 et 没 sans réfléchir, tu as franchi le premier vrai cap grammatical du chinois. Bienvenue.', author: 'Perrine' }
      ]
    }
  ]
};

const POST_ZODIAQUE: BlogPost = {
  slug: 'les-12-animaux-du-zodiaque-chinois',
  category: 'culture',
  title: 'Les 12 animaux du zodiaque chinois — Mythologie, traits de caractère et compatibilités',
  lead:
    'Rat, bœuf, tigre, lapin, dragon, serpent, cheval, chèvre, singe, coq, chien, cochon : 12 animaux dans l\'ordre fixé par une course mythique. Voici ce qu\'ils racontent vraiment de toi.',
  publishedAt: '2026-05-28',
  readingMinutes: 13,
  author: DEFAULT_AUTHOR,
  heroImage:
    'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?w=1600&q=80',
  heroCaption: 'Lampions du Nouvel An — chaque année a son animal, dans un cycle de 12',
  intro:
    'Le zodiaque chinois (生肖 shēngxiào) n\'est pas un gadget de napperon de restaurant : c\'est un système qui structure encore aujourd\'hui les calendriers, les mariages, les naissances et même certains recrutements en Chine. Découvrir son animal, c\'est entrer dans une logique vieille de plus de 2 000 ans, riche en symboles et en récits. Voici le guide complet.',
  sections: [
    {
      title: 'La légende de la grande course',
      blocks: [
        { type: 'p', text: 'Selon la légende la plus répandue, l\'empereur de Jade (玉皇大帝) aurait organisé une course pour désigner les 12 animaux qui figureraient au calendrier. Premier arrivé, premier servi. L\'ordre des 12 animaux du zodiaque vient de cette course.' },
        { type: 'p', text: 'Le rat, malin, aurait sauté sur le dos du bœuf pour traverser la rivière, puis bondi au dernier moment pour franchir la ligne en premier. Le bœuf, honnête et patient, arrive deuxième. Le tigre, troisième, a lutté contre le courant. Le lapin, quatrième, a sauté de pierre en pierre. Le dragon, cinquième, s\'est arrêté en chemin pour faire pleuvoir sur un village.' },
        { type: 'p', text: 'Le serpent s\'est faufilé sur le sabot du cheval pour le doubler. Le cheval arrive donc septième. La chèvre, le singe et le coq, qui s\'étaient associés sur un radeau, finissent ensemble en huitième, neuvième et dixième. Le chien, distrait par l\'eau fraîche, prend la onzième place. Et le cochon, qui s\'était endormi en route, ferme la marche.' },
        { type: 'callout', tone: 'info', text: 'Le chat n\'est pas dans la liste : selon une variante, le rat ne l\'a pas réveillé exprès, créant l\'inimitié éternelle entre chats et rats.' }
      ]
    },
    {
      title: 'Le cycle de 12 ans (et le cycle de 60)',
      blocks: [
        { type: 'p', text: 'Chaque année est associée à un animal, dans un cycle qui se répète tous les 12 ans. 2024 fut l\'année du Dragon, 2025 celle du Serpent, 2026 celle du Cheval, et ainsi de suite.' },
        { type: 'p', text: 'Mais le zodiaque chinois se combine aussi avec les 5 éléments (bois, feu, terre, métal, eau) pour former un cycle plus long de 60 ans (12 × 5). Tu n\'es donc pas juste « tigre » ou « cheval » : tu es plus précisément « tigre de feu », « cheval d\'eau », etc. Ce système est utilisé en astrologie et en médecine traditionnelle.' },
        { type: 'callout', tone: 'warning', text: 'L\'année zodiacale ne commence PAS le 1er janvier, mais au Nouvel An lunaire (entre fin janvier et mi-février). Si tu es né(e) en janvier ou début février, vérifie ton animal sur un calendrier lunaire.' }
      ]
    },
    {
      title: '鼠 — Le Rat (子 zǐ)',
      blocks: [
        { type: 'p', text: 'Années : 1972, 1984, 1996, 2008, 2020, 2032. Premier de la course, le rat est le signe de l\'intelligence vive, de l\'adaptabilité et du sens de l\'opportunité. Considéré comme rusé plutôt que sournois en Chine, il a très bonne presse.' },
        { type: 'list', items: ['Qualités : vif d\'esprit, économe, charmant', 'Défauts : opportuniste, anxieux, parfois mesquin'] },
        { type: 'example', hanzi: '鼠', pinyin: 'shǔ', translationFr: 'rat' }
      ]
    },
    {
      title: '牛 — Le Bœuf (丑 chǒu)',
      blocks: [
        { type: 'p', text: 'Années : 1973, 1985, 1997, 2009, 2021, 2033. Le bœuf incarne la patience, la fiabilité et le travail acharné. C\'est l\'ami qu\'on veut dans les coups durs, mais il faut accepter qu\'il avance à son rythme.' },
        { type: 'list', items: ['Qualités : honnête, méthodique, endurant', 'Défauts : têtu, lent à pardonner, peu expressif'] },
        { type: 'example', hanzi: '牛', pinyin: 'niú', translationFr: 'bœuf, vache' }
      ]
    },
    {
      title: '虎 — Le Tigre (寅 yín)',
      blocks: [
        { type: 'p', text: 'Années : 1974, 1986, 1998, 2010, 2022, 2034. Le tigre est le signe du courage, du charisme et de l\'autorité naturelle. Souvent leader, parfois imprévisible. Les Chinois disent qu\'on naît rarement « moyen » sous un signe tigre.' },
        { type: 'list', items: ['Qualités : courageux, magnétique, généreux', 'Défauts : impulsif, autoritaire, susceptible'] },
        { type: 'example', hanzi: '虎', pinyin: 'hǔ', translationFr: 'tigre' }
      ]
    },
    {
      title: '兔 — Le Lapin (卯 mǎo)',
      blocks: [
        { type: 'p', text: 'Années : 1975, 1987, 1999, 2011, 2023, 2035. Le lapin est le signe de la douceur, de l\'élégance et de la diplomatie. Sensible et raffiné, il évite les conflits frontaux et cultive l\'harmonie.' },
        { type: 'list', items: ['Qualités : raffiné, empathique, fin diplomate', 'Défauts : conflit-phobe, hypersensible, parfois fuyant'] },
        { type: 'example', hanzi: '兔', pinyin: 'tù', translationFr: 'lapin' }
      ]
    },
    {
      title: '龙 — Le Dragon (辰 chén)',
      blocks: [
        { type: 'p', text: 'Années : 1976, 1988, 2000, 2012, 2024, 2036. Le dragon est LE signe le plus prestigieux du zodiaque chinois. Symbole impérial, il incarne le pouvoir, la chance et la grandeur. Les naissances explosent traditionnellement les années du Dragon.' },
        { type: 'list', items: ['Qualités : charismatique, ambitieux, généreux', 'Défauts : arrogant, exigeant, intolérant à l\'échec'] },
        { type: 'example', hanzi: '龙', pinyin: 'lóng', translationFr: 'dragon' }
      ]
    },
    {
      title: '蛇 — Le Serpent (巳 sì)',
      blocks: [
        { type: 'p', text: 'Années : 1977, 1989, 2001, 2013, 2025, 2037. Loin de l\'image négative occidentale, le serpent est en Chine un signe d\'intelligence, de sagesse et de mystère. On dit qu\'il devine les intentions des autres avant qu\'elles ne soient formulées.' },
        { type: 'list', items: ['Qualités : intuitif, élégant, intellectuel', 'Défauts : secret, jaloux, parfois manipulateur'] },
        { type: 'example', hanzi: '蛇', pinyin: 'shé', translationFr: 'serpent' }
      ]
    },
    {
      title: '马 — Le Cheval (午 wǔ)',
      blocks: [
        { type: 'p', text: 'Années : 1978, 1990, 2002, 2014, 2026, 2038. Énergique, libre, sociable : le cheval est le signe du mouvement et de l\'enthousiasme. Souvent en voyage, en projet, en début de quelque chose.' },
        { type: 'list', items: ['Qualités : énergique, indépendant, sociable', 'Défauts : impatient, dispersé, allergique à la routine'] },
        { type: 'example', hanzi: '马', pinyin: 'mǎ', translationFr: 'cheval' }
      ]
    },
    {
      title: '羊 — La Chèvre (未 wèi)',
      blocks: [
        { type: 'p', text: 'Années : 1979, 1991, 2003, 2015, 2027, 2039. 羊 désigne en réalité aussi bien la chèvre que le mouton ou le bélier. Signe de la douceur, de l\'art et de la sensibilité, la chèvre est souvent artiste ou créative.' },
        { type: 'list', items: ['Qualités : artistique, gentil, persévérant à sa manière', 'Défauts : indécis, pessimiste, dépendant'] },
        { type: 'example', hanzi: '羊', pinyin: 'yáng', translationFr: 'chèvre / mouton' }
      ]
    },
    {
      title: '猴 — Le Singe (申 shēn)',
      blocks: [
        { type: 'p', text: 'Années : 1980, 1992, 2004, 2016, 2028, 2040. Vif, malin, espiègle : le singe est le signe de l\'ingéniosité. Profondément lié au personnage du Roi des Singes (孙悟空), héros de La Pérégrination vers l\'Ouest.' },
        { type: 'list', items: ['Qualités : ingénieux, drôle, polyvalent', 'Défauts : moqueur, instable, peu fiable sur le long terme'] },
        { type: 'example', hanzi: '猴', pinyin: 'hóu', translationFr: 'singe' }
      ]
    },
    {
      title: '鸡 — Le Coq (酉 yǒu)',
      blocks: [
        { type: 'p', text: 'Années : 1981, 1993, 2005, 2017, 2029, 2041. Le coq est le signe de la ponctualité, de la précision et de la loyauté. Il aime que les choses soient bien faites et n\'hésite pas à le dire.' },
        { type: 'list', items: ['Qualités : honnête, organisé, loyal', 'Défauts : critique, perfectionniste, parfois arrogant'] },
        { type: 'example', hanzi: '鸡', pinyin: 'jī', translationFr: 'coq, poulet' }
      ]
    },
    {
      title: '狗 — Le Chien (戌 xū)',
      blocks: [
        { type: 'p', text: 'Années : 1982, 1994, 2006, 2018, 2030, 2042. Le chien incarne la fidélité, la justice et la franchise. Ami sûr et défenseur naturel des plus faibles, il a un fort sens moral.' },
        { type: 'list', items: ['Qualités : loyal, juste, courageux', 'Défauts : anxieux, méfiant, pessimiste'] },
        { type: 'example', hanzi: '狗', pinyin: 'gǒu', translationFr: 'chien' }
      ]
    },
    {
      title: '猪 — Le Cochon (亥 hài)',
      blocks: [
        { type: 'p', text: 'Années : 1983, 1995, 2007, 2019, 2031, 2043. Loin d\'être péjoratif, le cochon symbolise en Chine l\'abondance, la générosité et le bon vivre. Signe de chance pour beaucoup d\'éleveurs traditionnels.' },
        { type: 'list', items: ['Qualités : généreux, sincère, optimiste', 'Défauts : naïf, paresseux par moments, trop confiant'] },
        { type: 'example', hanzi: '猪', pinyin: 'zhū', translationFr: 'cochon' }
      ]
    },
    {
      title: 'Compatibilités : les triplettes et les oppositions',
      blocks: [
        { type: 'p', text: 'L\'astrologie chinoise regroupe les 12 animaux en 4 « triplettes harmonieuses » (三合 sān hé) : les signes d\'une même triplette s\'entendent particulièrement bien.' },
        { type: 'list', items: [
          'Rat – Dragon – Singe : les ambitieux',
          'Bœuf – Serpent – Coq : les méthodiques',
          'Tigre – Cheval – Chien : les indépendants',
          'Lapin – Chèvre – Cochon : les sensibles'
        ]},
        { type: 'p', text: 'À l\'inverse, chaque signe a un OPPOSÉ (六冲 liù chōng) — l\'animal situé en face de lui sur la roue. Les relations entre opposés sont notoirement conflictuelles.' },
        { type: 'list', items: [
          'Rat ↔ Cheval',
          'Bœuf ↔ Chèvre',
          'Tigre ↔ Singe',
          'Lapin ↔ Coq',
          'Dragon ↔ Chien',
          'Serpent ↔ Cochon'
        ]},
        { type: 'callout', tone: 'info', text: 'En Chine, beaucoup de familles vérifient encore ces compatibilités avant un mariage, surtout dans les campagnes.' }
      ]
    },
    {
      title: '本命年 — L\'année de son propre signe',
      blocks: [
        { type: 'p', text: '本命年 (běn mìng nián), littéralement « l\'année de sa destinée », désigne l\'année où ton animal revient. Tous les 12 ans, donc. Et… c\'est une année réputée DIFFICILE.' },
        { type: 'p', text: 'Pour s\'en protéger, la tradition recommande de porter du rouge — sous-vêtements, ceinture, bracelet, peu importe — toute l\'année. C\'est pour ça que tu verras des Chinois en sous-vêtements rouges écarlates les années concernées.' },
        { type: 'example', hanzi: '本命年', pinyin: 'běn mìng nián', translationFr: 'année de son propre signe (à 12, 24, 36 ans…)' },
        { type: 'example', hanzi: '红色辟邪', pinyin: 'hóngsè bìxié', translationFr: 'le rouge éloigne le mauvais sort' }
      ]
    },
    {
      title: 'Le vocabulaire du zodiaque',
      blocks: [
        { type: 'example', hanzi: '生肖', pinyin: 'shēngxiào', translationFr: 'zodiaque chinois (litt. « ressemblance de naissance »)' },
        { type: 'example', hanzi: '属', pinyin: 'shǔ', translationFr: 'appartenir à (un signe)' },
        { type: 'example', hanzi: '我属龙', pinyin: 'wǒ shǔ lóng', translationFr: 'je suis du signe du Dragon' },
        { type: 'example', hanzi: '你属什么？', pinyin: 'nǐ shǔ shénme ?', translationFr: 'quel est ton signe ?' },
        { type: 'example', hanzi: '十二生肖', pinyin: 'shí\'èr shēngxiào', translationFr: 'les 12 signes du zodiaque' },
        { type: 'example', hanzi: '本命年', pinyin: 'běn mìng nián', translationFr: 'année de son signe (tous les 12 ans)' }
      ]
    },
    {
      title: 'Et au-delà du folklore ?',
      blocks: [
        { type: 'p', text: 'Le zodiaque, en Chine, est bien plus qu\'une décoration de Nouvel An. Il influence des décisions concrètes : on évite de se marier les années défavorables, on programme parfois une naissance pour qu\'elle tombe sur un signe « porteur » (le boom des naissances l\'année du Dragon en témoigne), on consulte un maître pour savoir si deux signes peuvent vraiment cohabiter.' },
        { type: 'p', text: 'Mais c\'est aussi un fabuleux outil de conversation. Demander 你属什么？ à quelqu\'un est l\'une des meilleures façons d\'engager une discussion culturelle avec un Chinois — et de découvrir, à ses anecdotes familiales, à quel point ces animaux structurent encore le quotidien.' },
        { type: 'quote', text: 'Mon grand-père ne se serait jamais marié à ma grand-mère sans avoir d\'abord fait calculer leur compatibilité zodiacale par un maître du village. C\'était il y a 70 ans — mais ma mère a fait pareil.', author: 'Lin, étudiante à Pékin' }
      ]
    }
  ]
};

const POST_JE_T_AIME: BlogPost = {
  slug: 'comment-dire-je-t-aime-en-chinois',
  category: 'vocabulaire',
  title: 'Comment dire "je t\'aime" en chinois — 我爱你 et la culture chinoise de l\'amour',
  lead:
    'Dire "je t\'aime" en chinois, ce n\'est pas si simple. Les Chinois disent rarement 我爱你 directement — ils préfèrent 我喜欢你 ou 我想你. Voici comment exprimer ses sentiments sans faire de faux pas.',
  publishedAt: '2026-06-11',
  readingMinutes: 10,
  author: DEFAULT_AUTHOR,
  heroImage: 'https://images.unsplash.com/photo-1518621736915-f3b1c41bfd00?w=1600&q=80',
  heroCaption: 'Lanternes rouges — l\'amour en Chine est souvent silencieux, jamais bruyant',
  intro:
    'En France, dire "je t\'aime" est presque une habitude — entre amoureux, à ses enfants, à ses amis. En Chine, c\'est beaucoup plus rare et marqué. Quand un Chinois dit 我爱你 (wǒ ài nǐ), il pèse chaque mot. Cet article t\'explique les différentes formules, leurs niveaux d\'intensité, et comment dire son amour en chinois sans paraître niais ou faux.',
  sections: [
    {
      title: '我爱你 — la formule directe (mais rare)',
      blocks: [
        { type: 'p', text: '我爱你 (wǒ ài nǐ) signifie littéralement "je t\'aime". C\'est la traduction directe de la formule française, et tous les apprenants l\'apprennent en premier. Mais dans la vraie vie, les Chinois l\'utilisent BEAUCOUP moins qu\'en France.' },
        { type: 'p', text: 'Pourquoi ? Parce que la culture chinoise traditionnelle voit la verbalisation des sentiments comme superficielle. L\'amour se prouve par des actes — soigner sa famille, soutenir son partenaire, partager les épreuves — pas par des mots qu\'on jette au quotidien.' },
        { type: 'callout', tone: 'info', text: 'Si tu dis 我爱你 à un Chinois pour la première fois, il sentira que c\'est sérieux. Ne le galvaude pas.' },
        { type: 'example', hanzi: '我爱你', pinyin: 'wǒ ài nǐ', translationFr: 'je t\'aime (formel et marqué)' },
        { type: 'example', hanzi: '我永远爱你', pinyin: 'wǒ yǒngyuǎn ài nǐ', translationFr: 'je t\'aimerai pour toujours' }
      ]
    },
    {
      title: '我喜欢你 — je t\'aime bien (BEAUCOUP plus courant)',
      blocks: [
        { type: 'p', text: '我喜欢你 (wǒ xǐhuan nǐ), littéralement "je t\'apprécie", est en réalité la formule de référence pour avouer ses sentiments naissants en Chine. Entre lycéens, étudiants, jeunes couples, c\'est ÇA qu\'on dit, pas 我爱你.' },
        { type: 'p', text: 'En français on dirait "je t\'aime bien" mais c\'est beaucoup plus fort qu\'on ne le pense en Chine. C\'est le mot d\'une déclaration romantique.' },
        { type: 'example', hanzi: '我喜欢你', pinyin: 'wǒ xǐhuan nǐ', translationFr: 'je t\'apprécie / je t\'aime (déclaration romantique)' },
        { type: 'example', hanzi: '我超喜欢你', pinyin: 'wǒ chāo xǐhuan nǐ', translationFr: 'je t\'apprécie beaucoup beaucoup (jeune, oral)' },
        { type: 'callout', tone: 'success', text: 'Premier rendez-vous en Chine ? Dis 我喜欢你, pas 我爱你. C\'est l\'attente culturelle.' }
      ]
    },
    {
      title: '我想你 — tu me manques (le préféré des couples)',
      blocks: [
        { type: 'p', text: '我想你 (wǒ xiǎng nǐ), "tu me manques", est probablement la formule romantique la plus utilisée en Chine au quotidien. C\'est une manière indirecte mais émotionnellement chargée d\'exprimer son amour : si tu manques à quelqu\'un, c\'est qu\'il tient à toi.' },
        { type: 'p', text: 'Beaucoup de couples se le disent au téléphone, en SMS, à la fin d\'une journée — bien plus souvent qu\'ils ne diraient 我爱你.' },
        { type: 'example', hanzi: '我想你', pinyin: 'wǒ xiǎng nǐ', translationFr: 'tu me manques' },
        { type: 'example', hanzi: '我想死你了', pinyin: 'wǒ xiǎng sǐ nǐ le', translationFr: 'tu me manques à en mourir (hyperbolique, affectueux)' },
        { type: 'example', hanzi: '我每天都想你', pinyin: 'wǒ měitiān dōu xiǎng nǐ', translationFr: 'tu me manques chaque jour' }
      ]
    },
    {
      title: '520 — le code amoureux des Chinois',
      blocks: [
        { type: 'p', text: 'Si tu reçois un message d\'un Chinois qui dit juste "520", ce n\'est pas un montant. C\'est une déclaration d\'amour codée. En chinois, 520 (wǔ èr líng) sonne très proche de 我爱你 (wǒ ài nǐ).' },
        { type: 'p', text: 'Tellement que le 20 mai (le 5/20) est devenu en Chine une fête de la Saint-Valentin officieuse. Couples qui s\'offrent des cadeaux, restaurants pleins, hôtels complets. Et beaucoup de mariages célébrés ce jour-là.' },
        { type: 'list', items: [
          '520 → 我爱你 (je t\'aime)',
          '521 → "je veux que tu m\'aimes"',
          '5201314 → 我爱你一生一世 (je t\'aimerai toute ma vie)',
          '1314 → utilisé seul = "toute la vie" (yīshēng yīshì)'
        ]},
        { type: 'callout', tone: 'info', text: 'Si tu offres un cadeau à ton/ta partenaire chinois·e, préfère 520 ¥ à 100 ¥ — c\'est plus que symbolique.' }
      ]
    },
    {
      title: 'Le vocabulaire de l\'amour',
      blocks: [
        { type: 'example', hanzi: '爱', pinyin: 'ài', translationFr: 'amour (le verbe et le nom)' },
        { type: 'example', hanzi: '喜欢', pinyin: 'xǐhuan', translationFr: 'apprécier, aimer (sentiments naissants)' },
        { type: 'example', hanzi: '男朋友', pinyin: 'nán péngyou', translationFr: 'petit ami' },
        { type: 'example', hanzi: '女朋友', pinyin: 'nǚ péngyou', translationFr: 'petite amie' },
        { type: 'example', hanzi: '老公', pinyin: 'lǎogōng', translationFr: 'mari (oral, affectueux)' },
        { type: 'example', hanzi: '老婆', pinyin: 'lǎopo', translationFr: 'femme, épouse (oral, affectueux)' },
        { type: 'example', hanzi: '亲爱的', pinyin: 'qīn\'ài de', translationFr: 'mon/ma chéri·e' },
        { type: 'example', hanzi: '宝贝', pinyin: 'bǎobèi', translationFr: 'bébé, trésor (mots doux courants)' },
        { type: 'example', hanzi: '在一起', pinyin: 'zài yīqǐ', translationFr: 'être ensemble (en couple)' },
        { type: 'example', hanzi: '分手', pinyin: 'fēnshǒu', translationFr: 'rompre' },
        { type: 'example', hanzi: '结婚', pinyin: 'jiéhūn', translationFr: 'se marier' }
      ]
    },
    {
      title: 'Les pièges culturels pour les Français',
      blocks: [
        { type: 'ordered', items: [
          'Ne dis pas 我爱你 trop tôt dans une relation — c\'est l\'équivalent d\'un "veux-tu m\'épouser ?"',
          'À sa belle-famille chinoise, n\'utilise jamais 爱 — beaucoup trop direct. Reste sur des gestes et de la prévenance.',
          '"Je t\'aime" entre amis (très français) n\'a pas d\'équivalent direct en chinois. Utilise plutôt 你是我最好的朋友 ("tu es mon meilleur ami").',
          'Aux parents, on dit traditionnellement plutôt 谢谢妈妈 ("merci maman") que 我爱你妈妈. Les sentiments familiaux se montrent.',
          'Si un Chinois te dit 我爱你 dans un moment fort, ne le prends pas à la légère. Réponds avec sérieux.'
        ]},
        { type: 'callout', tone: 'warning', text: 'Le mot 爱 (ài) est PUISSANT en chinois. Réserve-le aux moments qui le méritent.' }
      ]
    },
    {
      title: 'Mon conseil personnel',
      blocks: [
        { type: 'p', text: 'Beaucoup de Français installés en Chine font l\'erreur de dire 我爱你 à leur partenaire chinois·e comme ils le diraient en France — et reçoivent en retour un sourire gêné ou un "moi aussi" murmuré. C\'est qu\'ils n\'ont pas perçu le poids du mot.' },
        { type: 'p', text: 'Apprends d\'abord 我喜欢你, 我想你, et toute la palette des gestes affectueux non verbaux que les Chinois utilisent : cuisiner pour l\'autre, prendre soin quand il/elle est malade, offrir des cadeaux symboliques. C\'est ÇA, dire son amour à la chinoise.' },
        { type: 'p', text: 'Et garde 我爱你 pour le moment où ton cœur ne supporte plus de ne pas le dire. À ce moment-là, le mot aura tout son sens.' },
        { type: 'quote', text: 'Mon mari ne me dit 我爱你 que deux fois par an, mais il fait du congee tous les matins. C\'est ça, son je t\'aime.', author: 'Claire, Française mariée à Shanghai' }
      ]
    }
  ]
};

const POST_SHI_DE: BlogPost = {
  slug: 'la-structure-shi-de-en-chinois',
  category: 'grammaire',
  title: '是…的 — La structure pour insister sur quand, où, comment',
  lead:
    'Tu veux dire "c\'est HIER que j\'ai mangé ça", "c\'est À PÉKIN qu\'il vit", "c\'est EN VOITURE qu\'on y va" ? La structure 是…的 est exactement faite pour ça. Voici comment la maîtriser sans douleur.',
  publishedAt: '2026-06-11',
  readingMinutes: 11,
  author: DEFAULT_AUTHOR,
  heroImage: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=1600&q=80',
  heroCaption: 'Calligraphie chinoise — la structure 是…的 est une élégance grammaticale typique du mandarin',
  intro:
    'Si tu apprends le chinois depuis 6 mois, tu connais 我吃了 ("j\'ai mangé"). Mais comment dire "c\'est HIER que j\'ai mangé là-bas, EN VOITURE, avec mes parents" ? La grammaire la plus simple ne suffit plus. Il te faut 是…的, l\'une des structures les plus élégantes du chinois, et celle qui te fera passer pour un apprenant un peu avancé dès que tu la maîtrises.',
  sections: [
    {
      title: 'À quoi sert 是…的',
      blocks: [
        { type: 'p', text: '是…的 (shì…de) est une structure utilisée pour INSISTER sur une circonstance d\'une action déjà passée : le QUAND, le OÙ, le COMMENT, l\'AVEC QUI. L\'action elle-même est connue de tout le monde, ce qu\'on met en valeur, c\'est l\'information autour.' },
        { type: 'callout', tone: 'info', text: 'Structure : Sujet + 是 + circonstance + Verbe + 的. L\'élément qu\'on veut souligner se place ENTRE 是 et 的.' },
        { type: 'p', text: 'Comparons :' },
        { type: 'list', items: [
          '我去年来中国 = "je suis venu en Chine l\'an dernier" (info neutre)',
          '我是去年来中国的 = "c\'est l\'an dernier que je suis venu en Chine" (insiste sur QUAND)'
        ]},
        { type: 'example', hanzi: '我是昨天到的', pinyin: 'wǒ shì zuótiān dào de', translationFr: 'c\'est hier que je suis arrivé' },
        { type: 'example', hanzi: '他是在巴黎学的中文', pinyin: 'tā shì zài bālí xué de zhōngwén', translationFr: 'c\'est à Paris qu\'il a appris le chinois' }
      ]
    },
    {
      title: '是…的 vs 了 — la différence cruciale',
      blocks: [
        { type: 'p', text: 'Beaucoup de manuels survolent ce point. La différence est pourtant essentielle :' },
        { type: 'list', items: [
          '了 indique qu\'une action a eu lieu (changement d\'état, achèvement)',
          '是…的 indique qu\'on parle d\'une action passée qu\'on suppose CONNUE, et qu\'on insiste sur une circonstance'
        ]},
        { type: 'p', text: 'Exemple concret :' },
        { type: 'list', items: [
          '我吃了 = "j\'ai mangé" → tu informes que tu as mangé',
          '我是和朋友吃的 = "c\'est avec des amis que j\'ai mangé" → on sait déjà que tu as mangé, tu précises avec qui'
        ]},
        { type: 'p', text: 'Si l\'action elle-même n\'est pas évidente du contexte, 了 ; si elle l\'est et qu\'on précise une circonstance, 是…的.' }
      ]
    },
    {
      title: 'Insister sur le QUAND',
      blocks: [
        { type: 'p', text: 'C\'est l\'usage le plus fréquent.' },
        { type: 'example', hanzi: '我是2019年来法国的', pinyin: 'wǒ shì èr líng yī jiǔ nián lái fǎguó de', translationFr: 'c\'est en 2019 que je suis venu en France' },
        { type: 'example', hanzi: '她是上个月结婚的', pinyin: 'tā shì shàng ge yuè jiéhūn de', translationFr: 'c\'est le mois dernier qu\'elle s\'est mariée' },
        { type: 'example', hanzi: '我是早上吃的早饭', pinyin: 'wǒ shì zǎoshang chī de zǎofàn', translationFr: 'c\'est ce matin que j\'ai pris le petit-déj' }
      ]
    },
    {
      title: 'Insister sur le OÙ',
      blocks: [
        { type: 'example', hanzi: '他是在北京出生的', pinyin: 'tā shì zài běijīng chūshēng de', translationFr: 'c\'est à Pékin qu\'il est né' },
        { type: 'example', hanzi: '我是在网上买的', pinyin: 'wǒ shì zài wǎngshang mǎi de', translationFr: 'c\'est en ligne que je l\'ai acheté' },
        { type: 'example', hanzi: '她是从法国来的', pinyin: 'tā shì cóng fǎguó lái de', translationFr: 'c\'est de France qu\'elle vient' }
      ]
    },
    {
      title: 'Insister sur le COMMENT',
      blocks: [
        { type: 'example', hanzi: '我是坐高铁来的', pinyin: 'wǒ shì zuò gāotiě lái de', translationFr: 'c\'est en TGV que je suis venu' },
        { type: 'example', hanzi: '他是用筷子吃的', pinyin: 'tā shì yòng kuàizi chī de', translationFr: 'c\'est avec des baguettes qu\'il a mangé' },
        { type: 'example', hanzi: '我是跟朋友一起去的', pinyin: 'wǒ shì gēn péngyou yīqǐ qù de', translationFr: 'c\'est avec des amis que j\'y suis allé' }
      ]
    },
    {
      title: 'Pour poser des questions précises',
      blocks: [
        { type: 'p', text: '是…的 est aussi LA structure pour demander une circonstance précise d\'un événement passé. Compare :' },
        { type: 'list', items: [
          '你什么时候来的？ = "quand es-tu venu ?" (sous-entendu : on sait que tu es venu, tu précises quand)',
          '你为什么来中国？ = "pourquoi viens-tu en Chine ?" (présent général)'
        ]},
        { type: 'example', hanzi: '你是什么时候来的？', pinyin: 'nǐ shì shénme shíhou lái de ?', translationFr: 'quand es-tu venu (exactement) ?' },
        { type: 'example', hanzi: '你是怎么来的？', pinyin: 'nǐ shì zěnme lái de ?', translationFr: 'comment es-tu venu ?' },
        { type: 'example', hanzi: '你是和谁去的？', pinyin: 'nǐ shì hé shéi qù de ?', translationFr: 'avec qui y es-tu allé ?' },
        { type: 'callout', tone: 'success', text: 'Dans la vraie vie, ces questions sont parmi les plus fréquentes en chinois. Apprends-les par cœur.' }
      ]
    },
    {
      title: 'Les erreurs typiques des francophones',
      blocks: [
        { type: 'ordered', items: [
          '❌ 我去年来中国了 → ✅ 我是去年来中国的 (si tu insistes sur "l\'an dernier")',
          '❌ 我是吃了 → ✅ 我吃了 (是…的 ne sert pas à dire juste "j\'ai mangé")',
          '❌ 你什么时候到中国了？ → ✅ 你是什么时候到中国的？ (question sur le quand passé)',
          '❌ 我是来的中国 → ✅ 我是来中国的 (le 的 vient à la FIN)'
        ]},
        { type: 'callout', tone: 'warning', text: 'Le 的 final est facile à oublier. Sans lui, la structure ne fonctionne pas. Vérifie deux fois.' }
      ]
    },
    {
      title: 'Récapitulatif mental',
      blocks: [
        { type: 'p', text: 'Pour savoir si tu dois utiliser 是…的, pose-toi deux questions :' },
        { type: 'ordered', items: [
          'L\'action est-elle passée ? (sinon, oublie 是…的)',
          'Mon interlocuteur sait-il déjà que cette action a eu lieu ? Est-ce que j\'insiste sur QUAND, OÙ, COMMENT, AVEC QUI plus que sur l\'action elle-même ?'
        ]},
        { type: 'p', text: 'Si oui aux deux : c\'est 是…的. Sinon : c\'est probablement 了 ou une structure plus simple.' },
        { type: 'quote', text: 'Maîtriser 是…的, c\'est passer du niveau "je parle chinois" au niveau "je parle bien chinois". C\'est l\'élégance, pas la complexité.', author: 'Perrine' }
      ]
    }
  ]
};

const POST_COULEURS: BlogPost = {
  slug: 'les-couleurs-en-chine-symbolique',
  category: 'culture',
  title: 'Les couleurs en Chine — Rouge porte-bonheur, vert maudit, blanc de deuil',
  lead:
    'Pourquoi les mariées chinoises s\'habillent en rouge ? Pourquoi offrir un chapeau vert à un homme est une catastrophe ? Petit guide des couleurs et de leur symbolique en Chine.',
  publishedAt: '2026-06-11',
  readingMinutes: 12,
  author: DEFAULT_AUTHOR,
  heroImage: 'https://images.unsplash.com/photo-1545569310-3a2bbfa829fc?w=1600&q=80',
  heroCaption: 'Mariage chinois traditionnel — le rouge éclatant est la couleur du bonheur',
  intro:
    'En France, on s\'habille en noir pour un mariage chic et en blanc le jour de ses noces. En Chine, c\'est exactement l\'inverse. Le code des couleurs est très différent — et les confusions peuvent vexer. Voici comment chaque couleur est perçue, avec les pièges à éviter pour ne pas faire de faux pas auprès d\'amis, de belle-famille ou de collègues chinois.',
  sections: [
    {
      title: '红色 — Rouge : LA couleur de la chance',
      blocks: [
        { type: 'p', text: 'Le rouge (红色 hóngsè) est de loin la couleur la plus importante en Chine. C\'est la couleur du bonheur, de la prospérité, de la chance, du mariage, du Nouvel An.' },
        { type: 'list', items: [
          'Robes de mariée traditionnelles : rouges',
          'Enveloppes de cadeaux d\'argent (红包 hóngbāo) : rouges',
          'Lanternes du Nouvel An : rouges',
          'Décorations pour la chance (couplets, papiers découpés) : rouges',
          'Drapeau national : rouge'
        ]},
        { type: 'p', text: 'Tu ne peux pas vraiment te tromper avec le rouge en Chine. C\'est positif partout.' },
        { type: 'example', hanzi: '红色', pinyin: 'hóngsè', translationFr: 'rouge' },
        { type: 'example', hanzi: '红包', pinyin: 'hóngbāo', translationFr: 'enveloppe rouge avec de l\'argent' },
        { type: 'example', hanzi: '开门红', pinyin: 'kāimén hóng', translationFr: 'commencer en beauté (litt. "ouvrir la porte au rouge")' }
      ]
    },
    {
      title: '金色 — Or : empereur et prospérité',
      blocks: [
        { type: 'p', text: 'L\'or (金色 jīnsè) symbolise la richesse, la noblesse et l\'éternité. Historiquement, c\'était la couleur réservée à l\'empereur — les toits de la Cité Interdite sont jaunes-or pour cette raison.' },
        { type: 'p', text: 'En décoration moderne, l\'or se marie souvent avec le rouge pour les fêtes — mariages, banquets, Nouvel An. Penser "Disney villa de mariage chinoise" : tout est rouge ET doré.' },
        { type: 'example', hanzi: '金色', pinyin: 'jīnsè', translationFr: 'or, doré' },
        { type: 'example', hanzi: '黄金', pinyin: 'huángjīn', translationFr: 'or (le métal)' }
      ]
    },
    {
      title: '黄色 — Jaune : impérial mais piégé',
      blocks: [
        { type: 'p', text: 'Le jaune (黄色 huángsè) partageait historiquement avec l\'or le statut impérial — il était la couleur de la dynastie. Aujourd\'hui, dans la décoration, il reste positif.' },
        { type: 'p', text: 'MAIS attention : dans le langage moderne, "黄色" désigne aussi le pornographique. 黄色电影 (huángsè diànyǐng) = "film jaune" = film X. Un Français qui dirait "j\'aime le cinéma jaune" déclencherait l\'hilarité d\'un Chinois.' },
        { type: 'callout', tone: 'warning', text: 'Le mot "jaune" en chinois moderne a une connotation pornographique. Préfère "doré" (金色) si tu décris quelque chose de positif.' },
        { type: 'example', hanzi: '黄色', pinyin: 'huángsè', translationFr: 'jaune ; pornographique (selon contexte)' },
        { type: 'example', hanzi: '黄色笑话', pinyin: 'huángsè xiàohuà', translationFr: 'blague salace' }
      ]
    },
    {
      title: '白色 — Blanc : LA couleur du deuil',
      blocks: [
        { type: 'p', text: 'C\'est le piège n°1 pour les Français : en Chine traditionnelle, le blanc (白色 báisè) est la couleur du DEUIL et des funérailles. On porte du blanc aux enterrements, pas aux mariages.' },
        { type: 'p', text: 'Évite donc les emballages de cadeaux entièrement blancs, les fleurs blanches (lys, chrysanthèmes blancs surtout — réservées aux funérailles), et les vêtements blancs lors d\'occasions joyeuses comme un anniversaire ou une fête de fin d\'année.' },
        { type: 'callout', tone: 'warning', text: 'N\'offre JAMAIS de fleurs blanches à un mariage ou un anniversaire chinois. Privilégie rouge, rose ou orange.' },
        { type: 'p', text: 'Cela dit, l\'influence occidentale a changé certaines pratiques : beaucoup de mariées chinoises modernes portent une robe blanche OCCIDENTALE pour la cérémonie photo, puis se changent en robe rouge traditionnelle (旗袍 qípáo) pour le banquet. Mix des deux cultures.' },
        { type: 'example', hanzi: '白色', pinyin: 'báisè', translationFr: 'blanc' },
        { type: 'example', hanzi: '白事', pinyin: 'bái shì', translationFr: 'funérailles (litt. "affaires blanches")' }
      ]
    },
    {
      title: '黑色 — Noir : sérieux, pas funéraire',
      blocks: [
        { type: 'p', text: 'Le noir (黑色 hēisè) est associé à la sériosité, à la formalité, à l\'autorité. Mais contrairement au monde occidental, ce n\'est PAS la couleur du deuil en Chine traditionnelle.' },
        { type: 'p', text: 'Un costume noir pour un mariage chinois est OK (occidental moderne), un costume noir pour un enterrement est correct aussi. Le noir reste sobre et acceptable dans presque tous les contextes formels.' },
        { type: 'example', hanzi: '黑色', pinyin: 'hēisè', translationFr: 'noir' },
        { type: 'example', hanzi: '黑社会', pinyin: 'hēi shèhuì', translationFr: 'mafia (litt. "société noire")' }
      ]
    },
    {
      title: '绿色 — Vert : nature ET cocufiage',
      blocks: [
        { type: 'p', text: 'Le vert (绿色 lǜsè) symbolise la nature, la jeunesse, la santé. Globalement positif.' },
        { type: 'p', text: 'SAUF un détail capital : 戴绿帽子 (dài lǜmàozi), "porter un chapeau vert", signifie "être cocu". L\'origine remonte à la dynastie Yuan, où les hommes des familles dont les femmes étaient prostituées devaient porter un chapeau vert. Le symbole est resté.' },
        { type: 'callout', tone: 'warning', text: 'N\'offre JAMAIS un chapeau vert à un homme chinois. Même en cadeau humoristique. Surtout pas à un mari.' },
        { type: 'example', hanzi: '绿色', pinyin: 'lǜsè', translationFr: 'vert' },
        { type: 'example', hanzi: '戴绿帽子', pinyin: 'dài lǜmàozi', translationFr: 'être cocu (litt. "porter un chapeau vert")' }
      ]
    },
    {
      title: '蓝色 et 紫色 — Bleu et violet : positifs',
      blocks: [
        { type: 'p', text: 'Le bleu (蓝色 lánsè) symbolise le calme, la stabilité, le ciel. Il est très utilisé en porcelaine traditionnelle (la fameuse porcelaine bleu et blanc 青花瓷 qīnghuācí).' },
        { type: 'p', text: 'Le violet (紫色 zǐsè) évoque la noblesse, le mystère, le spirituel. Il était également porté par les hauts fonctionnaires impériaux dans certaines dynasties.' },
        { type: 'p', text: 'Aucun piège majeur sur ces deux couleurs. Tu peux les offrir, les porter, les utiliser sans crainte.' },
        { type: 'example', hanzi: '蓝色', pinyin: 'lánsè', translationFr: 'bleu' },
        { type: 'example', hanzi: '紫色', pinyin: 'zǐsè', translationFr: 'violet' },
        { type: 'example', hanzi: '青花瓷', pinyin: 'qīnghuācí', translationFr: 'porcelaine bleu et blanc (très emblématique)' }
      ]
    },
    {
      title: 'Le vocabulaire des couleurs',
      blocks: [
        { type: 'p', text: 'Une particularité du chinois : tu peux dire la couleur seule (红, rouge) ou la couleur avec le mot 色 (sè, "couleur") qui la rend plus formelle. Les deux sont corrects.' },
        { type: 'list', items: [
          '红 / 红色 — rouge',
          '黄 / 黄色 — jaune',
          '蓝 / 蓝色 — bleu',
          '绿 / 绿色 — vert',
          '白 / 白色 — blanc',
          '黑 / 黑色 — noir',
          '紫 / 紫色 — violet',
          '粉色 — rose (toujours avec 色)',
          '橙色 / 橘色 — orange',
          '灰色 — gris',
          '棕色 / 咖啡色 — marron'
        ]}
      ]
    },
    {
      title: 'Récap des pièges pour un Français',
      blocks: [
        { type: 'ordered', items: [
          'Ne porte pas de blanc à un mariage chinois (sauf si tu es prévenu que c\'est OK).',
          'N\'offre pas de chapeau vert à un homme.',
          'Évite le mot 黄色 (jaune) si tu veux décrire quelque chose de positif — préfère 金色 (doré).',
          'Ne mets pas de fleurs blanches dans un bouquet pour un anniversaire ou un mariage.',
          'Pour un cadeau ou une décoration positive : rouge + doré, c\'est imbattable.'
        ]},
        { type: 'quote', text: 'Si tu offres un cadeau emballé en rouge à un Chinois, tu pars avec 50 % d\'avantage. C\'est la couleur de la chance, et il le ressent.', author: 'Yan, ami d\'enfance d\'un Français à Shanghai' }
      ]
    }
  ]
};

const POST_HSK2_GUIDE: BlogPost = {
  slug: 'preparer-le-hsk-2-le-guide-complet',
  category: 'hsk',
  title: 'Préparer le HSK 2 — Le guide complet après ton HSK 1',
  lead:
    'Le HSK 2 (HSK 3.0) demande 1 200 mots cumulés et 600 caractères. Si tu as ton HSK 1, c\'est le palier naturel qui te donne enfin de vrais moyens conversationnels. Voici le plan.',
  publishedAt: '2026-06-11',
  readingMinutes: 9,
  author: DEFAULT_AUTHOR,
  heroImage: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1600&q=80',
  heroCaption: 'Salle d\'examen — le HSK 2 est ton premier vrai test de conversation',
  intro:
    'Après le HSK 1, le HSK 2 multiplie ton vocabulaire par 2,4 et te donne enfin de quoi tenir une conversation simple en chinois. C\'est aussi le palier où les grammaires deviennent intéressantes : 了, mesureurs, particules finales. Voici comment t\'y préparer en 3 à 5 mois.',
  sections: [
    {
      title: 'Ce que le HSK 2 demande (chiffres officiels)',
      blocks: [
        { type: 'p', text: 'Selon le standard HSK 3.0 publié par le Hanban en 2021 :' },
        { type: 'list', items: [
          'Vocabulaire CUMULÉ : 1 200 mots (vs 500 au HSK 1)',
          'Caractères CUMULÉS : 600 (vs 300 au HSK 1)',
          'Grammaires : 81 points',
          'Niveau CECRL équivalent : A2'
        ]},
        { type: 'callout', tone: 'info', text: 'À ce niveau, tu peux tenir une conversation simple sur des sujets familiers (famille, achats, transport, météo) avec un débit modéré.' }
      ]
    },
    {
      title: 'Différences clés avec le HSK 1',
      blocks: [
        { type: 'p', text: 'Le HSK 2 introduit plusieurs nouveautés qui changent vraiment ton expérience du chinois :' },
        { type: 'list', items: [
          'Vrai temps passé : tu manies enfin 了 sans trembler',
          'Mesureurs au-delà de 个 (只, 张, 本…)',
          'Le futur avec 要',
          'Les comparaisons avec 比',
          'Particules finales (吗, 吧, 呢)',
          'Phrases avec deux verbes (我去买东西)'
        ]},
        { type: 'p', text: 'À l\'oral, tu passes de "questions simples / réponses simples" à "courte conversation". C\'est la grosse marche.' }
      ]
    },
    {
      title: 'Format de l\'examen',
      blocks: [
        { type: 'p', text: 'Le HSK 2 (papier ou ordinateur) dure environ 55 minutes :' },
        { type: 'list', items: [
          'Compréhension orale (听力) : 35 questions, 25 min',
          'Compréhension écrite (阅读) : 25 questions, 22 min',
          'Pas d\'expression écrite ou orale au HSK 2 (ça vient au HSK 3)',
          'Score : 60/100 pour réussir'
        ]},
        { type: 'callout', tone: 'success', text: 'À ce niveau, tout est en pinyin sous les hanzi. Tu n\'as pas encore besoin de lire 100 % en caractères.' }
      ]
    },
    {
      title: 'Le plan d\'attaque en 4 mois',
      blocks: [
        { type: 'h3', text: 'Mois 1 — Le vocabulaire HSK 2 (500 nouveaux mots)' },
        { type: 'list', items: [
          'Anki avec un deck HSK 2 (15 nouveaux mots/jour pendant 30 jours)',
          'Drills d\'écoute sur ChinesePod, FluentU, ou XiaoLearn',
          'Lecture des phrases d\'exemples à voix haute'
        ]},
        { type: 'h3', text: 'Mois 2 — La grammaire (les 81 points)' },
        { type: 'list', items: [
          'Particule 了 : sous tous ses angles (action passée, changement d\'état)',
          'Les mesureurs courants',
          'La comparaison avec 比',
          'Les particules finales et leur nuance'
        ]},
        { type: 'h3', text: 'Mois 3 — Les annales blanches' },
        { type: 'list', items: [
          'Au moins 5 examens blancs complets en conditions réelles',
          'Analyse des erreurs (en particulier les pièges d\'écoute)',
          'Renforcement des points faibles'
        ]},
        { type: 'h3', text: 'Mois 4 — La consolidation' },
        { type: 'list', items: [
          'Lecture de textes simples (mini-histoires HSK 2)',
          'Pratique conversationnelle (HelloTalk, Tandem, profs de Preply)',
          'Encore 3 examens blancs pour valider ton timing'
        ]}
      ]
    },
    {
      title: 'Les pièges du HSK 2',
      blocks: [
        { type: 'ordered', items: [
          'Vocabulaire des chiffres et dates : les questions d\'écoute s\'amusent à en mettre plein. Sois rapide.',
          'Les mesureurs : si tu hésites entre 个 et 只, tu perds 1 point. Apprends-les par cœur.',
          'Les particules finales : 吗, 吧, 呢 ne sont pas interchangeables. Distingue-les bien.',
          'Le pinyin avec tons : à ce niveau, ne pas savoir un ton coûte des points en écoute.',
          'Le temps de lecture : tu n\'as que ~50 secondes par question. Pas le temps de tout traduire.'
        ]}
      ]
    },
    {
      title: 'Ressources utiles',
      blocks: [
        { type: 'list', items: [
          'XiaoLearn dictionnaire pour les 1 200 mots HSK 2 (pinyin + audios)',
          'Du Chinese ou Pleco pour Anki et lecture',
          'ChinesePod niveau Elementary',
          'iTalki pour 30 min de conversation/semaine',
          'Le manuel officiel HSK 2 du Hanban (chinois + français pour la grammaire)'
        ]},
        { type: 'callout', tone: 'info', text: 'Si tu prépares aussi le HSK 3 derrière, garde un planning de 8-10 mois total. Le HSK 3 est un palier majeur.' }
      ]
    },
    {
      title: 'Mon conseil personnel',
      blocks: [
        { type: 'p', text: 'Le HSK 2 est le palier le plus gratifiant de toute ta progression. Tu passes de "je dis bonjour" à "je tiens une vraie conversation simple". Profite-en pour pratiquer beaucoup à l\'oral : c\'est à ce niveau que la barrière psychologique se brise.' },
        { type: 'p', text: 'Et si tu doutes, rappelle-toi : le HSK 2 n\'est pas un examen difficile pour quelqu\'un qui a fait son HSK 1 sérieusement. C\'est juste une question de volume. Tiens 3-4 mois et c\'est dans la poche.' },
        { type: 'quote', text: 'Le HSK 2, c\'est la première fois où tu parles vraiment chinois. Pas un examen de plus — un cap émotionnel.', author: 'Perrine' }
      ]
    }
  ]
};

const POST_CHENGYU: BlogPost = {
  slug: 'les-chengyu-expressions-de-4-caracteres-chinois',
  category: 'hanzi',
  title: 'Les chengyu (成语) — Ces expressions de 4 caractères qui font tout en chinois',
  lead:
    'Les chengyu sont des expressions figées de 4 caractères qui condensent toute la sagesse chinoise en quelques syllabes. Apprends-en 10, et tu auras déjà l\'air bien plus avancé qu\'un HSK 5.',
  publishedAt: '2026-06-11',
  readingMinutes: 11,
  author: DEFAULT_AUTHOR,
  heroImage: 'https://images.unsplash.com/photo-1535905557558-afc4877a26fc?w=1600&q=80',
  heroCaption: 'Un manuel de chengyu — il en existe plus de 5 000, dont environ 1 000 vraiment courants',
  intro:
    'Si tu lis un journal chinois, regardes un drama ou écoutes une chanson de C-pop, tu entendras forcément des chengyu : ces blocs figés de 4 caractères qui condensent une idée, une morale ou une situation entière. Ce sont l\'âme littéraire du chinois moderne, et même un apprenant intermédiaire peut s\'en servir. Voici comment commencer.',
  sections: [
    {
      title: 'Qu\'est-ce qu\'un chengyu',
      blocks: [
        { type: 'p', text: '成语 (chéngyǔ), littéralement "expression toute faite", désigne une catégorie d\'idiomes figés du chinois. Caractéristiques :' },
        { type: 'list', items: [
          'Composé presque toujours de 4 caractères (rarement 3 ou 5)',
          'Tirent leur sens d\'une histoire ancienne, d\'un classique littéraire, d\'une morale confucéenne',
          'Souvent intraduisibles littéralement — il faut connaître l\'origine pour comprendre',
          'Très utilisés dans la presse, les discours, la littérature, et aussi l\'oral éduqué'
        ]},
        { type: 'p', text: 'Il existe environ 5 000 chengyu recensés, dont 1 000 vraiment courants et 100-200 indispensables. La connaissance des chengyu est un MARQUEUR de l\'éducation en Chine. Maîtriser quelques chengyu, c\'est gagner du respect.' },
        { type: 'callout', tone: 'info', text: 'Un Chinois éduqué glisse en moyenne 2-3 chengyu par minute en conversation soutenue.' }
      ]
    },
    {
      title: '10 chengyu à connaître absolument',
      blocks: [
        { type: 'h3', text: '1. 马马虎虎 (mǎmǎhūhū) — "bof, comme ci comme ça"' },
        { type: 'p', text: 'Le plus utile au quotidien. Littéralement "cheval-cheval-tigre-tigre", il signifie "moyen, sans plus". À utiliser quand on te demande comment était un film, un repas, un cours.' },
        { type: 'example', hanzi: '今天怎么样？— 马马虎虎', pinyin: 'jīntiān zěnme yàng ? — mǎmǎhūhū', translationFr: 'comment ça s\'est passé aujourd\'hui ? — bof, comme ci comme ça' },
        { type: 'h3', text: '2. 入乡随俗 (rùxiāng suísú) — "à Rome, fais comme les Romains"' },
        { type: 'p', text: 'Littéralement "entrer dans le village, suivre les coutumes". À sortir quand tu acceptes une coutume locale qui te surprend.' },
        { type: 'example', hanzi: '入乡随俗', pinyin: 'rù xiāng suí sú', translationFr: 'à Rome, fais comme les Romains' },
        { type: 'h3', text: '3. 一举两得 (yī jǔ liǎng dé) — "faire d\'une pierre deux coups"' },
        { type: 'p', text: 'Littéralement "un mouvement, deux gains". Quand une action résout deux problèmes à la fois.' },
        { type: 'example', hanzi: '一举两得', pinyin: 'yī jǔ liǎng dé', translationFr: 'faire d\'une pierre deux coups' },
        { type: 'h3', text: '4. 一帆风顺 (yī fān fēng shùn) — "que tout aille comme sur des roulettes"' },
        { type: 'p', text: 'Littéralement "voile droite, vent favorable". Souhait classique de bonne route, de bon départ, qu\'on offre à quelqu\'un qui démarre un projet, un voyage, une nouvelle vie.' },
        { type: 'example', hanzi: '祝你一帆风顺', pinyin: 'zhù nǐ yī fān fēng shùn', translationFr: 'que tout aille pour toi comme sur des roulettes' },
        { type: 'h3', text: '5. 画蛇添足 (huà shé tiān zú) — "en rajouter inutilement"' },
        { type: 'p', text: 'Littéralement "dessiner un serpent et lui ajouter des pattes". Pour décrire une action qui gâche un résultat déjà bon en en faisant trop.' },
        { type: 'example', hanzi: '画蛇添足', pinyin: 'huà shé tiān zú', translationFr: 'gâter un travail en en faisant trop' },
        { type: 'h3', text: '6. 一石二鸟 (yī shí èr niǎo) — "une pierre, deux oiseaux"' },
        { type: 'p', text: 'Variante encore plus imagée de 一举两得.' },
        { type: 'example', hanzi: '一石二鸟', pinyin: 'yī shí èr niǎo', translationFr: 'd\'une pierre deux coups' },
        { type: 'h3', text: '7. 自相矛盾 (zì xiāng máo dùn) — "se contredire"' },
        { type: 'p', text: 'Littéralement "lance contre bouclier" (référence à un marchand qui vantait à la fois une lance qui transperce tout et un bouclier que rien ne perce). Synonyme parfait de "se contredire".' },
        { type: 'example', hanzi: '你的话自相矛盾', pinyin: 'nǐ de huà zì xiāng máo dùn', translationFr: 'tes propos se contredisent' },
        { type: 'h3', text: '8. 名副其实 (míng fù qí shí) — "à la hauteur de sa réputation"' },
        { type: 'p', text: 'Littéralement "le nom correspond à la réalité". Pour valider que quelque chose ou quelqu\'un mérite vraiment son titre.' },
        { type: 'example', hanzi: '这家餐厅名副其实', pinyin: 'zhè jiā cāntīng míng fù qí shí', translationFr: 'ce restaurant est vraiment à la hauteur de sa réputation' },
        { type: 'h3', text: '9. 半途而废 (bàn tú ér fèi) — "abandonner à mi-chemin"' },
        { type: 'p', text: 'Littéralement "à mi-route, abandonner". À éviter dans la vie, à utiliser dans la conversation pour critiquer ou encourager.' },
        { type: 'example', hanzi: '不要半途而废', pinyin: 'bù yào bàn tú ér fèi', translationFr: 'n\'abandonne pas à mi-chemin' },
        { type: 'h3', text: '10. 守株待兔 (shǒu zhū dài tù) — "attendre que le poisson vienne"' },
        { type: 'p', text: 'Littéralement "garder une souche en attendant un lapin" (un paysan, ayant vu un lapin se tuer contre une souche, s\'assit à côté pour attendre les prochains). Pour critiquer une attitude passive ou opportuniste.' },
        { type: 'example', hanzi: '守株待兔', pinyin: 'shǒu zhū dài tù', translationFr: 'attendre passivement quelque chose qui n\'arrivera pas' }
      ]
    },
    {
      title: 'Comment apprendre les chengyu efficacement',
      blocks: [
        { type: 'ordered', items: [
          'Apprends-les par THÈME (chance, travail, relations, sagesse) plutôt que dans le désordre.',
          'Note systématiquement l\'origine (l\'histoire courte derrière). C\'est ce qui ancre le sens.',
          'Repère-les en consommant des médias chinois : à chaque chengyu entendu dans un drama, note-le.',
          'Utilise-les EN CONTEXTE, pas comme exercice isolé. Place-en un par jour dans tes conversations.',
          'Démarre par 10-15 chengyu vraiment courants avant d\'élargir. Mieux 10 maîtrisés que 50 vagues.'
        ]}
      ]
    },
    {
      title: 'Les pièges d\'usage',
      blocks: [
        { type: 'p', text: 'Un chengyu mal placé peut faire bizarre. Quelques règles :' },
        { type: 'list', items: [
          'Registre soutenu : un chengyu rend immédiatement un propos plus formel/littéraire. À éviter dans un chat WeChat ultra-casual entre potes.',
          'Cohérence d\'âge : si tu as 22 ans et que tu sors un chengyu très classique en boîte, ça peut sonner forcé.',
          'Connais le SENS exact avant de t\'en servir. Beaucoup de chengyu ont une nuance négative ou positive qu\'il faut respecter.',
          'Ne mets pas DEUX chengyu dans la même phrase, sauf si tu fais de la littérature. C\'est l\'overdose.'
        ]}
      ]
    },
    {
      title: 'Les chengyu dans la culture populaire',
      blocks: [
        { type: 'p', text: 'Les chengyu sont partout dans la culture chinoise moderne :' },
        { type: 'list', items: [
          'Titres de chansons C-pop (un classique : 一见钟情, "coup de foudre")',
          'Titres de dramas et films (《一帆风顺》, 《半生缘》)',
          'Slogans publicitaires (一目了然, "tout devient clair en un coup d\'œil")',
          'Discours politiques (très très fréquents — chaque ministre y va du sien)',
          'Articles de presse, éditoriaux'
        ]},
        { type: 'p', text: 'Repère-les, note-les. C\'est en les rencontrant en contexte que tu les retiens vraiment.' }
      ]
    },
    {
      title: 'Mon conseil personnel',
      blocks: [
        { type: 'p', text: 'Commence par les 10 chengyu de cet article et utilise-les dès cette semaine — même de manière maladroite. Mieux vaut un chengyu placé approximativement qu\'un mot juste à 100 %. Ton interlocuteur chinois remarquera l\'effort et te respectera pour ça.' },
        { type: 'p', text: 'Sur le long terme, un objectif raisonnable est 5 chengyu par mois. En 2 ans, tu en auras 120 vraiment maîtrisés — c\'est-à-dire plus qu\'un Chinois moyen utilise au quotidien.' },
        { type: 'quote', text: 'Le jour où tu places ton premier 马马虎虎 dans une vraie conversation et que ton interlocuteur sourit, tu as franchi une marche que personne ne peut t\'enlever.', author: 'Perrine' }
      ]
    }
  ]
};

// ============================================================================
//  EXPORT
// ============================================================================

export const BLOG_POSTS: BlogPost[] = [
  POST_JE_T_AIME,
  POST_SHI_DE,
  POST_COULEURS,
  POST_HSK2_GUIDE,
  POST_CHENGYU,
  POST_MERCI,
  POST_BU_MEI,
  POST_ZODIAQUE,
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
