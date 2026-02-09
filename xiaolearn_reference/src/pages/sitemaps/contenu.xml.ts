import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
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

  urls.add(toAbsoluteUrl(base, '/culture'));
  urls.add(toAbsoluteUrl(base, '/nuances'));
  urls.add(toAbsoluteUrl(base, '/ressources'));

  const nuanceEntries = await getCollection('nuances');
  nuanceEntries.forEach((entry) => {
    urls.add(toAbsoluteUrl(base, `/nuances/${entry.id}`));
  });

  const cultureEntries = await getCollection('culture');
  cultureEntries.forEach((entry) => {
    const prefix = entry.data.category === 'fete' ? 'fetes' : 'reperes';
    urls.add(toAbsoluteUrl(base, `/culture/${prefix}/${entry.id}`));
  });

  const xml = renderSitemapXml(
    Array.from(urls)
      .sort((a, b) => a.localeCompare(b, 'en'))
      .map((loc) => ({
        loc,
        lastmod,
        changefreq: 'weekly' as const,
        priority: 0.7,
      })),
  );

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
};
