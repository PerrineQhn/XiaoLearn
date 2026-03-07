import type { Locale } from '../utils/locale';
import { localizePath } from '../utils/locale';

export interface NavItem {
  label: string;
  href: string;
  external?: boolean;
}

export interface FooterSection {
  title: string;
  links: NavItem[];
}

const FR_MAIN_NAV: NavItem[] = [
  { label: 'Accueil', href: '/' },
  { label: 'Dictionnaire', href: '/dictionnaire' },
  { label: 'Grammaire', href: '/grammaire' },
  { label: 'Nuances', href: '/nuances' },
  { label: 'Culture', href: '/culture' },
];

const EN_MAIN_NAV: NavItem[] = [
  { label: 'Home', href: '/en' },
  { label: 'Dictionary', href: '/en/dictionnaire' },
  { label: 'Grammar', href: '/en/grammaire' },
  { label: 'Nuances', href: '/en/nuances' },
  { label: 'Culture', href: '/en/culture' },
];

export const externalLinks: NavItem[] = [];

export function getMainNav(locale: Locale): NavItem[] {
  return locale === 'en' ? EN_MAIN_NAV : FR_MAIN_NAV;
}

export function getFooterSections(locale: Locale): FooterSection[] {
  if (locale === 'en') {
    return [
      {
        title: 'Dictionary',
        links: [
          { label: 'HSK 1', href: '/en/dictionnaire?level=hsk1' },
          { label: 'HSK 2', href: '/en/dictionnaire?level=hsk2' },
          { label: 'HSK 3', href: '/en/dictionnaire?level=hsk3' },
          { label: 'HSK 4', href: '/en/dictionnaire?level=hsk4' },
          { label: 'HSK 5', href: '/en/dictionnaire?level=hsk5' },
          { label: 'HSK 6', href: '/en/dictionnaire?level=hsk6' },
          { label: 'HSK 7-9', href: '/en/dictionnaire?level=hsk7' },
        ],
      },
      {
        title: 'Learn',
        links: [
          { label: 'Grammar', href: '/en/grammaire' },
          { label: 'Nuances', href: '/en/nuances' },
          { label: 'Culture', href: '/en/culture' },
          { label: 'Resources (FR)', href: '/ressources' },
        ],
      },
      {
        title: 'XiaoLearn',
        links: [
          { label: 'App', href: 'https://xiaolearn.com', external: true },
          { label: 'Shop', href: 'https://shop.xiaolearn.com', external: true },
        ],
      },
    ];
  }

  return [
    {
      title: 'Dictionnaire',
      links: [
        { label: 'HSK 1', href: '/dictionnaire/hsk1' },
        { label: 'HSK 2', href: '/dictionnaire/hsk2' },
        { label: 'HSK 3', href: '/dictionnaire/hsk3' },
        { label: 'HSK 4', href: '/dictionnaire/hsk4' },
        { label: 'HSK 5', href: '/dictionnaire/hsk5' },
        { label: 'HSK 6', href: '/dictionnaire/hsk6' },
        { label: 'HSK 7-9', href: '/dictionnaire/hsk7' },
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
}

export function getLegalLinks(locale: Locale): NavItem[] {
  if (locale === 'en') {
    return [
      { label: 'Legal notice', href: '/mentions-legales' },
      { label: 'Version francaise', href: localizePath('/', 'fr') },
    ];
  }
  return [{ label: 'Mentions legales', href: '/mentions-legales' }];
}
