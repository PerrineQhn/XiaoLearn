import type { CollectionEntry } from 'astro:content';
import type { GrammarGroup, GrammarPoint } from '../data/grammarCatalog';
import grammarPointsEnRaw from '../data/i18n/grammar-points.en.json';
import nuancesEnRaw from '../data/i18n/nuances.en.json';
import cultureEnRaw from '../data/i18n/culture.en.json';

interface GrammarPointEnPayload {
  titleEn?: string;
  categoryEn?: string;
  subcategoryEn?: string;
  detailEn?: string;
  objectiveEn?: string;
  structureEn?: string;
  usageEn?: string[];
  elementsEn?: string[];
  examplesEn?: string[];
  notesEn?: string[];
  commonMistakesEn?: string[];
}

interface NuanceEnPayload {
  titleEn?: string;
  summaryEn?: string;
  htmlEn?: string;
}

interface CultureEnPayload {
  titleEn?: string;
  summaryEn?: string;
  periodEn?: string;
  traditionsEn?: string[];
  keyPointsEn?: string[];
  htmlEn?: string;
}

const grammarPointsEn = grammarPointsEnRaw as Record<string, GrammarPointEnPayload>;
const nuancesEn = nuancesEnRaw as Record<string, NuanceEnPayload>;
const cultureEn = cultureEnRaw as Record<string, CultureEnPayload>;

const GRAMMAR_GROUP_TRANSLATIONS: Record<string, { title: string; summary: string }> = {
  'directions-gauche-droite': {
    title: 'Left / Right',
    summary: 'Directional markers left and right, with parallel sentence patterns.',
  },
  'directions-haut-bas': {
    title: 'Up / Down',
    summary: 'Directional markers up and down for places, movement and position.',
  },
  'directions-avant-arriere': {
    title: 'Front / Back',
    summary: 'Front and back markers for relative position and orientation.',
  },
  'negation-bu-mei': {
    title: '不 / 没(有)',
    summary: 'Core contrast between general negation and past/non-existence negation.',
  },
  'modaux-hui-neng-keyi': {
    title: '会 / 能 / 可以',
    summary: 'Nuances between learned ability, possibility and permission.',
  },
};

const NUANCE_CATEGORY_LABELS_EN: Record<string, string> = {
  synonymes: 'synonyms',
  homophones: 'homophones',
  'caracteres-similaires': 'similar characters',
  'grammaire-proche': 'nearby grammar',
};

function clean(value: unknown): string {
  return String(value ?? '').trim();
}

function cleanArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.map((item) => clean(item)).filter(Boolean);
}

function fallbackArray(value: unknown, fallback: string[]): string[] {
  const cleaned = cleanArray(value);
  return cleaned.length > 0 ? cleaned : fallback;
}

export function getNuanceCategoryLabelEn(category: string): string {
  return NUANCE_CATEGORY_LABELS_EN[category] || category.replace(/-/g, ' ');
}

export function getGrammarGroupEn(group: GrammarGroup): { title: string; summary: string } {
  const translated = GRAMMAR_GROUP_TRANSLATIONS[group.slug];
  if (translated) return translated;
  return {
    title: group.title,
    summary: group.summary,
  };
}

export function getGrammarPointEn(point: GrammarPoint) {
  const translated = grammarPointsEn[point.id] || {};

  const title = clean(translated.titleEn) || point.title;
  const category = clean(translated.categoryEn) || point.category;
  const subcategory = clean(translated.subcategoryEn) || point.subcategory;
  const detail = clean(translated.detailEn) || point.detail;
  const objective = clean(translated.objectiveEn) || point.objective;
  const structure = clean(translated.structureEn) || point.structure;
  const usage = fallbackArray(translated.usageEn, point.usage);
  const elements = fallbackArray(translated.elementsEn, point.elements);
  const notes = fallbackArray(translated.notesEn, point.notes);
  const commonMistakes = fallbackArray(translated.commonMistakesEn, point.commonMistakes);
  const examplesEn = fallbackArray(
    translated.examplesEn,
    point.examples.map((example) => example.french),
  );

  const examples = point.examples.map((example, index) => ({
    ...example,
    english: examplesEn[index] || example.french,
  }));

  const searchableText = [
    point.searchableText,
    title,
    category,
    subcategory,
    detail,
    objective,
    structure,
    ...usage,
    ...elements,
    ...notes,
    ...commonMistakes,
    ...examplesEn,
  ]
    .join(' ')
    .toLowerCase();

  return {
    ...point,
    title,
    category,
    subcategory,
    detail,
    objective,
    structure,
    usage,
    elements,
    examples,
    notes,
    commonMistakes,
    searchableText,
  };
}

export function getNuanceEntryEn(entry: CollectionEntry<'nuances'>) {
  const translated = nuancesEn[entry.id] || {};
  return {
    title: clean(translated.titleEn) || entry.data.title,
    summary: clean(translated.summaryEn) || entry.data.summary,
    html: clean(translated.htmlEn) || entry.data.html,
  };
}

export function getCultureEntryEn(entry: CollectionEntry<'culture'>) {
  const translated = cultureEn[entry.id] || {};

  return {
    title: clean(translated.titleEn) || entry.data.title,
    summary: clean(translated.summaryEn) || entry.data.summary,
    period: clean(translated.periodEn) || entry.data.period || '',
    traditions: fallbackArray(translated.traditionsEn, entry.data.traditions || []),
    keyPoints: fallbackArray(translated.keyPointsEn, entry.data.keyPoints || []),
    html: clean(translated.htmlEn) || entry.data.html,
  };
}
