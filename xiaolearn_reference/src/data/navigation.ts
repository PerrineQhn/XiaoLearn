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
  { label: 'Ressources', href: '/ressources' },
  { label: 'Produits', href: 'https://shop.xiaolearn.com', external: true },
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
    ],
  },
  {
    title: 'Apprendre',
    links: [
      { label: 'Grammaire', href: '/grammaire' },
      { label: 'Nuances', href: '/nuances' },
      { label: 'Culture', href: '/culture' },
      { label: 'Ressources', href: '/ressources' },
    ],
  },
  {
    title: 'XiaoLearn',
    links: [
      { label: 'Produits', href: 'https://shop.xiaolearn.com', external: true },
      { label: 'Application', href: 'https://xiaolearn.com', external: true },
    ],
  },
];

export const legalLinks: NavItem[] = [
  { label: 'Mentions legales', href: '/mentions-legales' },
];
