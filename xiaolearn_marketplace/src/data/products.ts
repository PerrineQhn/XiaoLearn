import { buildCheckoutLink } from './payments';

export interface Product {
  id: string;
  name: string;
  description: string;
  longDescription?: string;
  price: number;
  originalPrice?: number;
  currency: string;
  type: 'subscription' | 'pdf' | 'anki';
  interval?: 'month' | 'year';
  stripePaymentLink: string;
  image?: string;
  badge?: string;
  popular?: boolean;
  features?: string[];
  levels?: string[];
}

const hsk30Levels = [
  'HSK 1',
  'HSK 2',
  'HSK 3',
  'HSK 4',
  'HSK 5',
  'HSK 6',
  'HSK 7-9'
];

const hsk30LevelsWithAll = [...hsk30Levels, 'Tous les niveaux (HSK 1 a 7-9)'];

export const subscriptions: Product[] = [
  {
    id: 'app-lifetime',
    name: 'XiaoLearn App - Accès à vie',
    description: 'Débloquez XiaoLearn une fois pour toutes.',
    price: 259,
    currency: 'EUR',
    type: 'subscription',
    stripePaymentLink: buildCheckoutLink('app-lifetime'),
    image: '',
    badge: 'Meilleur choix',
    popular: true,
    features: [
      'Accès illimité sans expiration',
      'Toutes les nouveautés incluses',
      'Support prioritaire',
      'Accès premium sur tous vos appareils'
    ]
  },
  {
    id: 'app-yearly',
    name: 'XiaoLearn App - Licence 1 an',
    description: 'Accès complet pendant 12 mois.',
    price: 108,
    currency: 'EUR',
    type: 'subscription',
    interval: 'year',
    stripePaymentLink: buildCheckoutLink('app-yearly'),
    image: '',
    features: [
      'Accès complet pendant 12 mois',
      'Toutes les nouveautés incluses',
      'Support standard',
      'Accès premium sur tous vos appareils'
    ]
  }
];

export const pdfs: Product[] = [
  {
    id: 'manuels-v1-v2',
    name: 'Pack Manuels XiaoLearn Vol.1 & Vol.2',
    description: 'Deux manuels complets pour progresser du HSK 1 au HSK 3.',
    longDescription: 'Un pack de deux manuels XiaoLearn couvrant les bases essentielles du mandarin avec exercices guidés et supports imprimables.',
    price: 29.00,
    currency: 'EUR',
    type: 'pdf',
    stripePaymentLink: buildCheckoutLink('manuels-v1-v2'),
    image: '/images/products/packdico.png',
    features: [
      '2 manuels complets',
      'Exercices guidés et corrigés',
      'Ordre des traits détaillé',
      'Format PDF imprimable'
    ]
  },
  {
    id: 'vocabulary-all-hsk',
    name: 'Vocabulaire HSK - Pack complet',
    description: 'Toutes les listes de vocabulaire HSK dans un seul pack.',
    price: 29.00,
    currency: 'EUR',
    type: 'pdf',
    stripePaymentLink: buildCheckoutLink('vocabulary-all-hsk'),
    image: '/images/products/vocabulaire-hsk.png',
    levels: hsk30LevelsWithAll,
    features: [
      'Tous les niveaux HSK',
      'Listes prêtes à imprimer',
      'Exemples de phrases',
      'Accès immédiat'
    ]
  },
  {
    id: 'vocabulary-one-hsk',
    name: 'Vocabulaire HSK - Niveau au choix',
    description: 'Un niveau HSK au choix avec vocabulaire et exercices.',
    price: 4.50,
    currency: 'EUR',
    type: 'pdf',
    stripePaymentLink: buildCheckoutLink('vocabulary-one-hsk'),
    image: '/images/products/vocabulaire-hsk.png',
    levels: hsk30Levels,
    features: [
      'Choisissez un niveau HSK',
      'Listes de vocabulaire ciblées',
      'Exercices pratiques',
      'Format PDF'
    ]
  },
  {
    id: 'writing-all-hsk',
    name: 'Écriture HSK - Pack complet',
    description: 'Cahiers d\'écriture pour tous les niveaux HSK.',
    price: 49.00,
    currency: 'EUR',
    type: 'pdf',
    stripePaymentLink: buildCheckoutLink('writing-all-hsk'),
    image: '/images/products/vocabulaire-ecriture-hsk.png',
    levels: hsk30LevelsWithAll,
    features: [
      'Tous les niveaux HSK',
      'Grilles d\'écriture',
      'Ordre des traits',
      'Format imprimable'
    ]
  },
  {
    id: 'writing-one-hsk',
    name: 'Écriture HSK - Niveau au choix',
    description: 'Cahier d\'écriture pour un niveau HSK.',
    price: 7.50,
    currency: 'EUR',
    type: 'pdf',
    stripePaymentLink: buildCheckoutLink('writing-one-hsk'),
    image: '/images/products/ecriture-hsk.png',
    levels: hsk30Levels,
    features: [
      'Choisissez un niveau HSK',
      'Exercices d\'écriture guidés',
      'Ordre des traits détaillé',
      'Format PDF'
    ]
  }
];

export const ankiDecks: Product[] = [
  {
    id: 'anki',
    name: 'Deck Anki XiaoLearn (complet)',
    description: 'Deck Anki complet avec audio natif et exemples de phrases.',
    longDescription: 'Un deck Anki complet regroupant toutes les cartes du nouveau HSK 3.0 de 2026.',
    price: 59.00,
    currency: 'EUR',
    type: 'anki',
    stripePaymentLink: buildCheckoutLink('anki'),
    image: '',
    badge: 'Populaire',
    features: [
      'Deck complet',
      'Audio inclus',
      'Pratique de l\'écriture',
      'Exemples de phrases',
      'Compatible Anki Desktop & Mobile'
    ]
  }
];

export const allProducts = [...subscriptions, ...pdfs, ...ankiDecks];

export const featuredProducts = [
  subscriptions.find(p => p.popular) || subscriptions[0],
  pdfs[0],
  ankiDecks[0]
].filter(Boolean) as Product[];

export const getProductById = (id: string) => allProducts.find((product) => product.id === id);

export const buildProductPageLink = (productId: string) => `/produits/${productId}`;
