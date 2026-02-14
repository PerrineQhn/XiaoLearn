import type { APIRoute } from 'astro';
import {
  getBaseUrl,
  renderSitemapXml,
  toAbsoluteUrl,
  todayIsoDate,
} from '../../utils/sitemap';

export const prerender = true;

const STATIC_PATHS = [
  '/',
  '/dictionnaire',
  '/dictionnaire/hsk1',
  '/dictionnaire/hsk2',
  '/dictionnaire/hsk3',
  '/dictionnaire/hsk4',
  '/dictionnaire/hsk5',
  '/dictionnaire/hsk6',
  '/dictionnaire/hsk7',
  '/grammaire',
  '/nuances',
  '/culture',
  '/recherche',
  '/mentions-legales',
  '/ressources',
];

export const GET: APIRoute = async ({ site }) => {
  const base = getBaseUrl(site);
  const lastmod = todayIsoDate();
  const urls = STATIC_PATHS
    .map((path) => ({
      loc: toAbsoluteUrl(base, path),
      lastmod,
      changefreq: 'weekly' as const,
      priority: path === '/' ? 1.0 : 0.8,
    }))
    .sort((a, b) => a.loc.localeCompare(b.loc, 'en'));

  const xml = renderSitemapXml(urls);
  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
};
