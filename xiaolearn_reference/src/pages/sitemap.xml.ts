import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { getGrammarGroups, getGrammarPoints } from '../data/grammarCatalog';
import type { HSKEntry } from '../types/hsk';
import hsk1Data from '../data/hsk1.json';
import hsk2Data from '../data/hsk2.json';
import hsk3Data from '../data/hsk3.json';
import hsk4Data from '../data/hsk4.json';
import hsk5Data from '../data/hsk5.json';

export const prerender = true;

const DEFAULT_SITE = 'https://xiaolearn.com';

const STATIC_PATHS = [
  '/',
  '/dictionnaire',
  '/dictionnaire/hsk1',
  '/dictionnaire/hsk2',
  '/dictionnaire/hsk3',
  '/dictionnaire/hsk4',
  '/dictionnaire/hsk5',
  '/grammaire',
  '/nuances',
  '/culture',
  '/mentions-legales',
  '/ressources',
];

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function toAbsoluteUrl(base: string, path: string): string {
  return new URL(path, base).toString();
}

export const GET: APIRoute = async ({ site }) => {
  const base = site?.toString() || DEFAULT_SITE;
  const urls = new Set<string>();

  STATIC_PATHS.forEach((path) => urls.add(toAbsoluteUrl(base, path)));

  const dictionaryEntries: HSKEntry[] = [
    ...(hsk1Data as HSKEntry[]),
    ...(hsk2Data as HSKEntry[]),
    ...(hsk3Data as HSKEntry[]),
    ...(hsk4Data as HSKEntry[]),
    ...(hsk5Data as HSKEntry[]),
  ];
  dictionaryEntries.forEach((entry) => {
    urls.add(toAbsoluteUrl(base, `/dictionnaire/${entry.id}`));
  });

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

  const nuanceEntries = await getCollection('nuances');
  nuanceEntries.forEach((entry) => {
    urls.add(toAbsoluteUrl(base, `/nuances/${entry.id}`));
  });

  const cultureEntries = await getCollection('culture');
  cultureEntries.forEach((entry) => {
    const prefix = entry.data.category === 'fete' ? 'fetes' : 'reperes';
    urls.add(toAbsoluteUrl(base, `/culture/${prefix}/${entry.id}`));
  });

  const sortedUrls = Array.from(urls).sort((a, b) => a.localeCompare(b, 'en'));
  const xmlUrls = sortedUrls
    .map((url) => `  <url><loc>${escapeXml(url)}</loc></url>`)
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${xmlUrls}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
};
