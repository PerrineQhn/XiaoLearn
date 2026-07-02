import type { APIRoute } from 'astro';
import {
  getBaseUrl,
  renderSitemapIndexXml,
  toAbsoluteUrl,
} from '../../utils/sitemap';
import { getDictionarySitemapChunkPaths } from '../../utils/dictionaryCatalog';

export const prerender = true;

export const GET: APIRoute = async ({ site }) => {
  const base = getBaseUrl(site);
  const chunkPaths = getDictionarySitemapChunkPaths();

  const xml = renderSitemapIndexXml(
    chunkPaths.map((path) => ({
      loc: toAbsoluteUrl(base, path),
    })),
  );

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
};
