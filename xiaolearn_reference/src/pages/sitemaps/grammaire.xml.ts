import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { getGrammarGroups, getGrammarPoints } from '../../data/grammarCatalog';
import {
  getBaseUrl,
  renderSitemapXml,
  toAbsoluteUrl,
} from '../../utils/sitemap';

export const prerender = true;

export const GET: APIRoute = async ({ site }) => {
  const base = getBaseUrl(site);
  const urls = new Set<string>();

  urls.add(toAbsoluteUrl(base, '/grammaire'));
  urls.add(toAbsoluteUrl(base, '/en/grammaire'));
  getGrammarPoints().forEach((point) => {
    urls.add(toAbsoluteUrl(base, `/grammaire/points/${point.id}`));
    urls.add(toAbsoluteUrl(base, `/en/grammaire/points/${point.id}`));
  });
  getGrammarGroups().forEach((group) => {
    urls.add(toAbsoluteUrl(base, `/grammaire/groupes/${group.slug}`));
    urls.add(toAbsoluteUrl(base, `/en/grammaire/groupes/${group.slug}`));
  });

  const grammarEditorial = await getCollection('grammaire');
  grammarEditorial.forEach((entry) => {
    urls.add(toAbsoluteUrl(base, `/grammaire/${entry.id}`));
    urls.add(toAbsoluteUrl(base, `/en/grammaire/${entry.id}`));
  });

  const xml = renderSitemapXml(
    Array.from(urls)
      .sort((a, b) => a.localeCompare(b, 'en'))
      .map((loc) => ({
        loc,
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
