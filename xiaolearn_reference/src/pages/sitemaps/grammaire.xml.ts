import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { getGrammarGroups, getGrammarPoints } from '../../data/grammarCatalog';
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
  const urls = new Set<string>();

  urls.add(toAbsoluteUrl(base, '/grammaire'));
  getGrammarPoints().forEach((point) => {
    urls.add(toAbsoluteUrl(base, `/grammaire/points/${point.id}`));
  });
  getGrammarGroups().forEach((group) => {
    urls.add(toAbsoluteUrl(base, `/grammaire/groupes/${group.slug}`));
  });

  const grammarEditorial = await getCollection('grammaire');
  grammarEditorial.forEach((entry) => {
    urls.add(toAbsoluteUrl(base, `/grammaire/${entry.id}`));
  });

  const xml = renderSitemapXml(
    Array.from(urls)
      .sort((a, b) => a.localeCompare(b, 'en'))
      .map((loc) => ({
        loc,
        lastmod,
        changefreq: 'weekly' as const,
        priority: loc.includes('/grammaire/points/') ? 0.7 : 0.8,
      })),
  );

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
};
