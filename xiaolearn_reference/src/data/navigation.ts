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

// URLs absolues vers l'app React (autre domaine que le site marketing).
// On utilise des URLs absolues plutôt que /app pour deux raisons :
//   1. Le site Astro n'a pas de route /app (et probablement n'en aura jamais —
//      l'app vit sur son propre domaine Cloudflare Pages).
//   2. Naviguer vers app.xiaolearn.com déclenche l'auth Firebase sur l'app,
//      qui gère elle-même la redirection login/signup selon l'état session.
const APP_BASE_URL_FR = 'https://app.xiaolearn.com';
const APP_LOGIN_URL_FR = 'https://app.xiaolearn.com/login';
const APP_BASE_URL_EN = 'https://app.xiaolearn.com?lang=en';
const APP_LOGIN_URL_EN = 'https://app.xiaolearn.com/login?lang=en';

// Nav principale — concise. Culture est intégrée comme catégorie du Blog.
// Blog retiré tant que la route /blog n'existe pas côté Astro (créerait un
// lien mort vers la home par fallback SSR).
const FR_MAIN_NAV: NavItem[] = [
  { label: 'Dictionnaire', href: '/dictionnaire' },
  { label: 'Grammaire', href: '/grammaire' },
  { label: 'Nuances', href: '/nuances' },
  { label: 'Tarifs', href: '/#pricing' },
];

const EN_MAIN_NAV: NavItem[] = [
  { label: 'Dictionary', href: '/en/dictionnaire' },
  { label: 'Grammar', href: '/en/grammaire' },
  { label: 'Nuances', href: '/en/nuances' },
  { label: 'Pricing', href: '/en#pricing' },
];

// CTA links shown next to the main nav (login + signup).
// `external: false` (par défaut) → navigation dans la même fenêtre, comme
// attendu pour une connexion qui amène à l'app.
export interface CtaLink extends NavItem {
  variant: 'ghost' | 'primary';
}

const FR_CTA_LINKS: CtaLink[] = [
  { label: 'Se connecter', href: APP_LOGIN_URL_FR, variant: 'ghost' },
  { label: 'Commencer gratuitement', href: APP_BASE_URL_FR, variant: 'primary' },
];

const EN_CTA_LINKS: CtaLink[] = [
  { label: 'Sign in', href: APP_LOGIN_URL_EN, variant: 'ghost' },
  { label: 'Start free', href: APP_BASE_URL_EN, variant: 'primary' },
];

export function getCtaLinks(locale: Locale): CtaLink[] {
  return locale === 'en' ? EN_CTA_LINKS : FR_CTA_LINKS;
}

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
          { label: 'Resources (FR)', href: '/ressources' },
        ],
      },
      {
        title: 'XiaoLearn',
        links: [
          { label: 'Web app', href: APP_BASE_URL_EN },
          { label: 'Sign in', href: APP_LOGIN_URL_EN },
          { label: 'Pricing', href: '/en#pricing' },
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
        { label: 'Ressources & Produits', href: '/ressources' },
      ],
    },
    {
      title: 'XiaoLearn',
      links: [
        { label: 'Application web', href: APP_BASE_URL_FR },
        { label: 'Se connecter', href: APP_LOGIN_URL_FR },
        { label: 'Tarifs', href: '/#pricing' },
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
