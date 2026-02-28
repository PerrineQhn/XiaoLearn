import type { APIRoute } from 'astro';
import {
  getBaseUrl,
  renderSitemapIndexXml,
  toAbsoluteUrl,
} from '../utils/sitemap';

export const prerender = true;

export const GET: APIRoute = async ({ site }) => {
  const base = getBaseUrl(site);
  const sitemapPaths = [
    '/sitemaps/core.xml',
    '/sitemaps/dictionnaire.xml',
    '/sitemaps/grammaire.xml',
    '/sitemaps/contenu.xml',
  ];
  const xml = renderSitemapIndexXml(
    sitemapPaths.map((path) => ({
      loc: toAbsoluteUrl(base, path),
    })),
  );

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
};
