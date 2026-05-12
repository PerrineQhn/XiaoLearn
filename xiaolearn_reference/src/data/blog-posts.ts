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
  views: number;
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

export const BLOG_CATEGORIES: Array<{ key: BlogCategory; label: string; icon: string }> = [
  { key: 'vocabulaire', label: 'Vocabulaire', icon: '🍵' },
  { key: 'grammaire', label: 'Grammaire', icon: '📐' },
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
  name: 'Perrine Qhn',
  avatar: '/profs/perrine.png'
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
  views: 318,
  author: DEFAULT_AUTHOR,
  heroImage:
    'https://images.unsplash.com/photo-1525094869226-aa19a3eb27ce?w=1600&q=80',
  heroCaption: 'Une rue de Pékin la nuit — le moment idéal pour souhaiter 晚安',
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
  views: 139,
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
          text: 'Voici la routine que je recommanderais à une débutante française qui veut atteindre HSK 2 en 6 mois (réaliste avec 1h/jour) :'
        },
        {
          type: 'ordered',
          items: [
            'Mois 1 : pinyin + tons + ~150 mots HSK 1 + écoute passive 30 min/jour',
            'Mois 2 : 200 mots de plus + premiers caractères (60-80) + écriture pinyin',
            'Mois 3 : grammaire de base (是, 有, 不, 没) + dialogues simples + premier partenaire de conv',
            'Mois 4-5 : HSK 1 complet + lecture caractères + écriture caractères',
            'Mois 6 : HSK 2 + immersion vidéo intensive'
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
  views: 263,
  author: DEFAULT_AUTHOR,
  heroImage:
    'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=1600&q=80',
  heroCaption: 'Hutong de Pékin — où tu entendras tout sauf 你好 entre voisins',
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
  views: 170,
  author: DEFAULT_AUTHOR,
  heroImage:
    'https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=1600&q=80',
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
  views: 96,
  author: DEFAULT_AUTHOR,
  heroImage:
    'https://images.unsplash.com/photo-1571937484060-3a07e1f59c2b?w=1600&q=80',
  heroCaption: 'Calligraphie chinoise traditionnelle — chaque trait a un sens et un ordre',
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
          text: 'Estimation réaliste pour un francophone qui étudie sérieusement :'
        },
        {
          type: 'list',
          items: [
            '~100 caractères en 1 mois (niveau survie)',
            '~500 caractères en 6 mois (HSK 2, lecture menus de restos)',
            '~1 000 caractères en 1 an (HSK 3, lecture textes adaptés)',
            '~2 500 caractères en 2 ans (HSK 4-5, lecture journalistique de surface)',
            '~3 500 caractères en 3 ans (HSK 6, lecture courante)'
          ]
        },
        {
          type: 'p',
          text: 'À titre de comparaison, un Chinois adulte instruit en connaît 6 000-7 000 actifs et reconnaît 8 000-10 000 passifs. Mais 3 500 te permet de fonctionner dans 99 % des situations du quotidien.'
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

// ============================================================================
//  EXPORT
// ============================================================================

export const BLOG_POSTS: BlogPost[] = [
  POST_BONNE_NUIT,
  POST_GUIDE_HONNETE,
  POST_BONJOUR_AVANCE,
  POST_FELICITATIONS,
  POST_HANZI
];

export const getBlogPost = (slug: string): BlogPost | undefined =>
  BLOG_POSTS.find((p) => p.slug === slug);

export const getFeaturedPost = (): BlogPost | undefined =>
  BLOG_POSTS.find((p) => p.featured);

export const getPostsByCategory = (category: BlogCategory | 'all'): BlogPost[] => {
  if (category === 'all') return BLOG_POSTS;
  return BLOG_POSTS.filter((p) => p.category === category);
};
