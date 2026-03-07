import type { APIRoute } from 'astro';
import {
  getBaseUrl,
  renderSitemapXml,
  toAbsoluteUrl,
} from '../../utils/sitemap';
import {
  getDictionarySitemapChunk,
  getDictionarySitemapChunkCount,
} from '../../utils/dictionaryCatalog';

export const prerender = true;

export function getStaticPaths() {
  const chunkCount = getDictionarySitemapChunkCount();
  return Array.from({ length: chunkCount }, (_, index) => ({
    params: { chunk: String(index + 1) },
  }));
}

export const GET: APIRoute = async ({ params, site }) => {
  const chunk = Number(params.chunk || 1);
  const entries = getDictionarySitemapChunk(chunk);
  if (entries.length === 0) {
    return new Response('Not found', { status: 404 });
  }

  const base = getBaseUrl(site);
  const urls = entries.flatMap((entry) => ([
    {
      loc: toAbsoluteUrl(base, `/dictionnaire/${entry.id}`),
      changefreq: 'monthly' as const,
      priority: 0.7,
    },
    {
      loc: toAbsoluteUrl(base, `/en/dictionnaire/${entry.id}`),
      changefreq: 'monthly' as const,
      priority: 0.6,
    },
  ]));

  const xml = renderSitemapXml(
    urls,
  );

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
};
