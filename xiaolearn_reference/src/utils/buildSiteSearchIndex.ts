import { getCollection } from 'astro:content';
import { ALL_HSK_ENTRIES } from '../data/allHskEntries';
import {
  formatHSKLevelLabel,
  getGrammarGroups,
  getGrammarPoints,
  toPlainGrammarText,
} from '../data/grammarCatalog';
import type { SiteSearchItem } from '../types/search';

function stripHtml(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/\s+/g, ' ')
    .trim();
}

function compact(text: string, maxLength = 170): string {
  const normalized = text.replace(/\s+/g, ' ').trim();
  if (!normalized) return '';
  if (normalized.length <= maxLength) return normalized;
  return `${normalized.slice(0, maxLength - 3).trimEnd()}...`;
}

function dedupeKeywords(values: string[]): string[] {
  const seen = new Set<string>();
  const output: string[] = [];

  for (const value of values) {
    const token = value.trim();
    if (!token || seen.has(token)) continue;
    seen.add(token);
    output.push(token);
  }

  return output;
}

function dedupeByHref(items: SiteSearchItem[]): SiteSearchItem[] {
  const seen = new Set<string>();
  const deduped: SiteSearchItem[] = [];

  for (const item of items) {
    if (seen.has(item.href)) continue;
    seen.add(item.href);
    deduped.push(item);
  }

  return deduped;
}

const STATIC_PAGES: SiteSearchItem[] = [
  {
    id: 'page-home',
    title: 'Accueil XiaoLearn Référence',
    href: '/',
    section: 'Pages',
    summary: 'Accès rapide au dictionnaire, à la grammaire, aux nuances et à la culture chinoise.',
    keywords: ['accueil', 'home', 'xiaolearn'],
    weight: 55,
  },
  {
    id: 'page-dictionnaire',
    title: 'Dictionnaire chinois-français',
    href: '/dictionnaire',
    section: 'Pages',
    summary: 'Recherche de mots chinois par hanzi, pinyin ou traduction française.',
    keywords: ['dictionnaire', 'vocabulaire', 'hanzi', 'pinyin', 'traduction'],
    weight: 50,
  },
  {
    id: 'page-grammaire',
    title: 'Grammaire chinoise',
    href: '/grammaire',
    section: 'Pages',
    summary: 'Catalogue des structures HSK avec filtres et fiches détaillées.',
    keywords: ['grammaire', 'structures', 'hsk', 'regles'],
    weight: 50,
  },
  {
    id: 'page-nuances',
    title: 'Nuances et synonymes',
    href: '/nuances',
    section: 'Pages',
    summary: 'Comparaisons de mots proches pour éviter les confusions en mandarin.',
    keywords: ['nuances', 'synonymes', 'comparaisons'],
    weight: 50,
  },
  {
    id: 'page-culture',
    title: 'Culture chinoise',
    href: '/culture',
    section: 'Pages',
    summary: 'Repères culturels, fêtes traditionnelles et pratiques du quotidien.',
    keywords: ['culture', 'fetes', 'chine'],
    weight: 50,
  },
  {
    id: 'page-ressources',
    title: 'Ressources et produits',
    href: '/ressources',
    section: 'Pages',
    summary: 'Méthodes d’étude, conseils pratiques et liens utiles pour progresser.',
    keywords: ['ressources', 'conseils', 'methodes'],
    weight: 38,
  },
  {
    id: 'page-mentions-legales',
    title: 'Mentions légales',
    href: '/mentions-legales',
    section: 'Pages',
    summary: 'Informations légales de XiaoLearn Référence.',
    keywords: ['mentions legales', 'legal'],
    weight: 20,
  },
];

export async function buildSiteSearchIndex(): Promise<SiteSearchItem[]> {
  const items: SiteSearchItem[] = [...STATIC_PAGES];

  for (const entry of ALL_HSK_ENTRIES) {
    items.push({
      id: `dict-${entry.id}`,
      title: `${entry.hanzi} · ${entry.pinyin}`,
      href: `/dictionnaire/${entry.id}`,
      section: 'Dictionnaire',
      summary: compact(entry.translationFr || entry.translation || ''),
      keywords: dedupeKeywords([
        entry.hanzi,
        entry.pinyin,
        entry.translationFr,
        entry.translation,
        ...(entry.translationFrAlt || []).slice(0, 2),
        ...(entry.tags || []).slice(0, 4),
        entry.level.toUpperCase(),
      ]),
      weight: 12,
    });
  }

  const grammarPoints = getGrammarPoints();
  for (const point of grammarPoints) {
    items.push({
      id: `grammar-point-${point.id}`,
      title: point.title,
      href: `/grammaire/points/${point.id}`,
      section: 'Grammaire',
      summary: compact(toPlainGrammarText(point.objective || point.structure || point.detail)),
      keywords: dedupeKeywords([
        point.id,
        point.category,
        point.subcategory,
        formatHSKLevelLabel(point.levelLabel),
        ...point.termVariations.slice(0, 8),
        ...point.elements.slice(0, 8),
      ]),
      weight: 30,
    });
  }

  const grammarGroups = getGrammarGroups();
  for (const group of grammarGroups) {
    items.push({
      id: `grammar-group-${group.slug}`,
      title: group.title,
      href: `/grammaire/groupes/${group.slug}`,
      section: 'Grammaire',
      summary: compact(group.summary),
      keywords: dedupeKeywords([
        ...group.levelSet.map((level) => `HSK ${level}`),
        ...group.pointIds,
      ]),
      weight: 26,
    });
  }

  const editorialGrammar = await getCollection('grammaire');
  for (const entry of editorialGrammar) {
    items.push({
      id: `grammar-article-${entry.id}`,
      title: entry.data.title,
      href: `/grammaire/${entry.slug}`,
      section: 'Grammaire',
      summary: compact(entry.data.summary),
      keywords: dedupeKeywords([
        formatHSKLevelLabel(`HSK ${entry.data.level}`),
        entry.data.category,
        entry.data.difficulty,
        ...(entry.data.keyPoints || []).slice(0, 5),
      ]),
      weight: 22,
    });
  }

  const nuanceEntries = await getCollection('nuances');
  for (const entry of nuanceEntries) {
    items.push({
      id: `nuance-${entry.id}`,
      title: entry.data.title || entry.data.words.join(' vs '),
      href: `/nuances/${entry.id}`,
      section: 'Nuances',
      summary: compact(entry.data.summary || stripHtml(entry.data.html)),
      keywords: dedupeKeywords([
        ...entry.data.words,
        ...entry.data.pinyin,
        entry.data.category,
        `HSK ${entry.data.level}`,
      ]),
      weight: 28,
    });
  }

  const cultureEntries = await getCollection('culture');
  for (const entry of cultureEntries) {
    const isFestival = entry.data.category === 'fete';
    items.push({
      id: `culture-${entry.id}`,
      title: entry.data.title,
      href: isFestival ? `/culture/fetes/${entry.id}` : `/culture/reperes/${entry.id}`,
      section: 'Culture',
      summary: compact(entry.data.summary || stripHtml(entry.data.html)),
      keywords: dedupeKeywords([
        entry.data.hanzi || '',
        entry.data.pinyin || '',
        entry.data.category,
        entry.data.period || '',
        ...(entry.data.tags || []).slice(0, 6),
        ...(entry.data.keyPoints || []).slice(0, 6),
        ...(entry.data.traditions || []).slice(0, 6),
      ]),
      weight: 24,
    });
  }

  return dedupeByHref(items);
}

