import type { APIRoute } from 'astro';
import { buildSiteSearchIndex } from '../utils/buildSiteSearchIndex';

export const prerender = true;

export const GET: APIRoute = async () => {
  const items = await buildSiteSearchIndex();
  const payload = {
    generatedAt: new Date().toISOString(),
    count: items.length,
    items,
  };

  return new Response(JSON.stringify(payload), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
      'X-Robots-Tag': 'noindex, nofollow',
    },
  });
};
