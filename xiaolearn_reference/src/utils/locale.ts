export type Locale = 'fr' | 'en';

export const DEFAULT_LOCALE: Locale = 'fr';
export const LOCALES: Locale[] = ['fr', 'en'];

const EN_EXACT_PATHS = new Set(['/', '/dictionnaire']);
const EN_DICTIONARY_ENTRY_PATTERN = /^\/dictionnaire\/hsk[1-7]-\d+$/i;
const EN_SECTION_PREFIXES = ['/grammaire', '/nuances', '/culture'];

export function getLocaleFromPathname(pathname: string): Locale {
  return pathname === '/en' || pathname.startsWith('/en/') ? 'en' : 'fr';
}

export function stripLocalePrefix(pathname: string): string {
  if (pathname === '/en') return '/';
  if (pathname.startsWith('/en/')) return pathname.slice(3) || '/';
  return pathname || '/';
}

export function localizePath(path: string, locale: Locale): string {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  if (locale === 'fr') return normalized;
  return normalized === '/' ? '/en' : `/en${normalized}`;
}

export function isLocalePathAvailable(path: string, locale: Locale): boolean {
  if (locale === 'fr') return true;
  if (EN_EXACT_PATHS.has(path)) return true;
  if (EN_SECTION_PREFIXES.some((prefix) => path === prefix || path.startsWith(`${prefix}/`))) return true;
  return EN_DICTIONARY_ENTRY_PATTERN.test(path);
}

export function getLocaleSwitchPath(pathname: string, targetLocale: Locale): string {
  const basePath = stripLocalePrefix(pathname);
  if (!isLocalePathAvailable(basePath, targetLocale)) {
    return targetLocale === 'en' ? '/en' : '/';
  }
  return localizePath(basePath, targetLocale);
}

export function getOgLocale(locale: Locale): string {
  return locale === 'en' ? 'en_US' : 'fr_FR';
}

export function getSiteName(locale: Locale): string {
  return locale === 'en' ? 'XiaoLearn Reference' : 'XiaoLearn Référence';
}
