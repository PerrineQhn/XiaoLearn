import type { APIRoute } from 'astro';
import { ALL_HSK_ENTRIES } from '../../data/allHskEntries';
import {
  getBaseUrl,
  renderSitemapXml,
  toAbsoluteUrl,
  todayIsoDate,
} from '../../utils/sitemap';

export const prerender = true;

export const GET: APIRoute = async ({ site }) => {
  const base = getBaseUrl(site);
  const lastmod = todayIsoDate();
  const urls = ALL_HSK_ENTRIES
    .map((entry) => ({
      loc: toAbsoluteUrl(base, `/dictionnaire/${entry.id}`),
      lastmod,
      changefreq: 'monthly' as const,
      priority: 0.7,
    }))
    .sort((a, b) => a.loc.localeCompare(b.loc, 'en'));

  const xml = renderSitemapXml(urls);
  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
};
