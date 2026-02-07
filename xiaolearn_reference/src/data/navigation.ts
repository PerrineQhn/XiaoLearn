export interface NavItem {
  label: string;
  href: string;
  external?: boolean;
}

export interface FooterSection {
  title: string;
  links: NavItem[];
}

export const mainNav: NavItem[] = [
  { label: 'Accueil', href: '/' },
  { label: 'Dictionnaire', href: '/dictionnaire' },
  { label: 'Grammaire', href: '/grammaire' },
  { label: 'Nuances', href: '/nuances' },
  { label: 'Culture', href: '/culture' },
];

export const externalLinks: NavItem[] = [];

export const footerSections: FooterSection[] = [
  {
    title: 'Dictionnaire',
    links: [
      { label: 'HSK 1', href: '/dictionnaire/hsk1' },
      { label: 'HSK 2', href: '/dictionnaire/hsk2' },
      { label: 'HSK 3', href: '/dictionnaire/hsk3' },
      { label: 'HSK 4', href: '/dictionnaire/hsk4' },
      { label: 'HSK 5', href: '/dictionnaire/hsk5' },
    ],
  },
  {
    title: 'Apprendre',
    links: [
      { label: 'Grammaire', href: '/grammaire' },
      { label: 'Nuances', href: '/nuances' },
      { label: 'Culture', href: '/culture' },
      { label: 'Ressources & Produits', href: '/ressources' },
    ],
  },
  {
    title: 'XiaoLearn',
    links: [
      { label: 'Application', href: 'https://xiaolearn.com', external: true },
      { label: 'Boutique', href: 'https://shop.xiaolearn.com', external: true },
    ],
  },
];

export const legalLinks: NavItem[] = [
  { label: 'Mentions legales', href: '/mentions-legales' },
];
