#!/usr/bin/env node
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { basename } from 'node:path';
import yaml from 'js-yaml';
import { getGrammarPoints } from '../src/data/grammarCatalog.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const contentRoot = path.join(projectRoot, 'src', 'content');
const i18nDir = path.join(projectRoot, 'src', 'data', 'i18n');

const DEFAULT_MODEL = process.env.OLLAMA_MODEL || 'qwen2.5:3b';
const OLLAMA_HOST = process.env.OLLAMA_HOST || 'http://127.0.0.1:11434';

function parseArgs(argv) {
  const args = {
    model: DEFAULT_MODEL,
    scopes: new Set(['grammar-points', 'nuances', 'culture']),
    force: false,
    limit: Number.POSITIVE_INFINITY,
    only: '',
  };

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === '--model' && argv[i + 1]) {
      args.model = argv[++i];
    } else if (arg === '--scopes' && argv[i + 1]) {
      args.scopes = new Set(
        argv[++i]
          .split(',')
          .map((item) => item.trim())
          .filter(Boolean),
      );
    } else if (arg === '--force') {
      args.force = true;
    } else if (arg === '--limit' && argv[i + 1]) {
      const parsed = Number.parseInt(argv[++i], 10);
      if (Number.isFinite(parsed) && parsed > 0) args.limit = parsed;
    } else if (arg === '--only' && argv[i + 1]) {
      args.only = argv[++i].trim();
    }
  }

  return args;
}

function compactWhitespace(value) {
  return String(value || '')
    .replace(/\s+/g, ' ')
    .trim();
}

function stripTags(text) {
  return compactWhitespace(
    String(text || '')
      .replace(/<[^>]+>/g, ' ')
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/\[cite_start\]/g, '')
      .replace(/\[cite:\s*[^\]]+\]/g, ''),
  );
}

function extractBodyHtml(content) {
  const bodyMatch = content.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  const body = bodyMatch ? bodyMatch[1].trim() : content.trim();
  return body.replace(/<h1[^>]*>[\s\S]*?<\/h1>/i, '').trim();
}

function extractTitle(content, fileName) {
  const h1Match = content.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  if (h1Match) {
    const title = stripTags(h1Match[1]);
    if (title) return title;
  }

  const titleMatch = content.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  if (titleMatch) {
    const title = stripTags(titleMatch[1]).replace(/^Analyse\s*:\s*/i, '').trim();
    if (title) return title;
  }

  return basename(fileName, '.html').replace(/-/g, ' ');
}

function extractSummary(content, title) {
  const body = extractBodyHtml(content);
  const paragraphMatch = body.match(/<p[^>]*>([\s\S]*?)<\/p>/i);
  const firstParagraph = stripTags(paragraphMatch?.[1] || '');
  const fallback = `Understand the usage nuances around ${title}.`;
  const base = firstParagraph || fallback;
  if (base.length <= 220) return base;
  return `${base.slice(0, 217).trimEnd()}...`;
}

function parseFrontmatterAndHtml(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!match) return null;
  const rawData = yaml.load(match[1]);
  if (!rawData || typeof rawData !== 'object') {
    throw new Error('Invalid frontmatter block.');
  }
  return {
    data: rawData,
    html: match[2].trim(),
  };
}

async function loadJson(filePath) {
  try {
    const raw = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

async function saveJson(filePath, payload) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, JSON.stringify(payload, null, 2), 'utf-8');
}

function extractJsonObject(raw) {
  const trimmed = String(raw || '').trim();
  if (!trimmed) throw new Error('Empty model response.');

  try {
    return JSON.parse(trimmed);
  } catch {
    // Continue with recovery heuristics.
  }

  const codeFence = trimmed.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);
  if (codeFence) {
    const inside = codeFence[1].trim();
    return JSON.parse(inside);
  }

  const firstBrace = trimmed.indexOf('{');
  const lastBrace = trimmed.lastIndexOf('}');
  if (firstBrace >= 0 && lastBrace > firstBrace) {
    const slice = trimmed.slice(firstBrace, lastBrace + 1);
    return JSON.parse(slice);
  }

  throw new Error('Unable to parse JSON from model response.');
}

async function callOllamaJson({ model, prompt }) {
  const response = await fetch(`${OLLAMA_HOST}/api/generate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model,
      prompt,
      format: 'json',
      stream: false,
      options: {
        temperature: 0.15,
        top_p: 0.9,
      },
    }),
  });

  if (!response.ok) {
    const body = await response.text().catch(() => '');
    throw new Error(`Ollama error ${response.status}: ${body}`);
  }

  const payload = await response.json();
  return extractJsonObject(payload.response);
}

function buildBatchPrompt({ schema, items, scopeLabel }) {
  return [
    'You are a professional translator for Mandarin-learning content.',
    'Task: translate French text to natural educational English.',
    'Rules:',
    '- Keep Chinese characters, pinyin, markdown symbols and HTML tags unchanged whenever they already exist.',
    '- Do not add explanations, notes, markdown fences or extra keys.',
    '- Keep list lengths aligned with the input.',
    '- Return strict JSON only that matches the schema.',
    '',
    `Scope: ${scopeLabel}`,
    `Output schema: ${schema}`,
    '',
    'Input JSON:',
    JSON.stringify({ items }, null, 2),
  ].join('\n');
}

function chunk(array, size) {
  const out = [];
  for (let i = 0; i < array.length; i += size) {
    out.push(array.slice(i, i + size));
  }
  return out;
}

function normalizeStringArray(value, fallback) {
  if (!Array.isArray(value)) return fallback;
  const cleaned = value.map((item) => compactWhitespace(item)).filter(Boolean);
  return cleaned.length > 0 ? cleaned : fallback;
}

async function translateGrammarPoints(args) {
  const outPath = path.join(i18nDir, 'grammar-points.en.json');
  const cache = await loadJson(outPath);
  const points = getGrammarPoints();

  const pending = points
    .filter((point) => (args.only ? point.id === args.only : true))
    .filter((point) => args.force || !cache[point.id])
    .slice(0, args.limit)
    .map((point) => ({
      id: point.id,
      title: point.title,
      category: point.category,
      subcategory: point.subcategory,
      detail: point.detail,
      objective: point.objective,
      structure: point.structure,
      usage: point.usage,
      elements: point.elements,
      examples: point.examples.map((item) => item.french),
      notes: point.notes,
      commonMistakes: point.commonMistakes,
    }));

  if (pending.length === 0) {
    console.log('[grammar-points] nothing to translate.');
    return;
  }

  console.log(`[grammar-points] translating ${pending.length} points with model ${args.model}...`);

  const batches = chunk(pending, 6);
  let done = 0;

  for (const batch of batches) {
    const prompt = buildBatchPrompt({
      scopeLabel: 'grammar-points',
      schema:
        '{"items":[{"id":"string","titleEn":"string","categoryEn":"string","subcategoryEn":"string","detailEn":"string","objectiveEn":"string","structureEn":"string","usageEn":["string"],"elementsEn":["string"],"examplesEn":["string"],"notesEn":["string"],"commonMistakesEn":["string"]}]}',
      items: batch,
    });

    let parsed;
    try {
      parsed = await callOllamaJson({ model: args.model, prompt });
    } catch (error) {
      console.warn(`[grammar-points] batch failed, retrying one by one: ${String(error)}`);
      for (const single of batch) {
        const singlePrompt = buildBatchPrompt({
          scopeLabel: 'grammar-points',
          schema:
            '{"items":[{"id":"string","titleEn":"string","categoryEn":"string","subcategoryEn":"string","detailEn":"string","objectiveEn":"string","structureEn":"string","usageEn":["string"],"elementsEn":["string"],"examplesEn":["string"],"notesEn":["string"],"commonMistakesEn":["string"]}]}',
          items: [single],
        });
        try {
          const one = await callOllamaJson({ model: args.model, prompt: singlePrompt });
          parsed = { items: [...(parsed?.items || []), ...(Array.isArray(one.items) ? one.items : [])] };
        } catch (singleError) {
          console.warn(`[grammar-points] skip ${single.id}: ${String(singleError)}`);
        }
      }
    }

    const translatedItems = Array.isArray(parsed?.items) ? parsed.items : [];
    const byId = new Map(translatedItems.map((item) => [item.id, item]));

    for (const source of batch) {
      const translated = byId.get(source.id);
      if (!translated) continue;

      cache[source.id] = {
        titleEn: compactWhitespace(translated.titleEn) || source.title,
        categoryEn: compactWhitespace(translated.categoryEn) || source.category,
        subcategoryEn: compactWhitespace(translated.subcategoryEn) || source.subcategory,
        detailEn: compactWhitespace(translated.detailEn) || source.detail,
        objectiveEn: compactWhitespace(translated.objectiveEn) || source.objective,
        structureEn: compactWhitespace(translated.structureEn) || source.structure,
        usageEn: normalizeStringArray(translated.usageEn, source.usage),
        elementsEn: normalizeStringArray(translated.elementsEn, source.elements),
        examplesEn: normalizeStringArray(translated.examplesEn, source.examples),
        notesEn: normalizeStringArray(translated.notesEn, source.notes),
        commonMistakesEn: normalizeStringArray(translated.commonMistakesEn, source.commonMistakes),
      };
      done += 1;
    }

    await saveJson(outPath, cache);
    console.log(`[grammar-points] progress ${done}/${pending.length}`);
  }
}

async function loadNuanceSources() {
  const nuanceDir = path.join(contentRoot, 'nuances');
  const files = (await fs.readdir(nuanceDir)).filter((name) => name.endsWith('.html')).sort();
  const out = [];

  for (const fileName of files) {
    const filePath = path.join(nuanceDir, fileName);
    const source = await fs.readFile(filePath, 'utf-8');
    const id = basename(fileName, '.html');
    const frontmatter = parseFrontmatterAndHtml(source);

    if (frontmatter) {
      const data = frontmatter.data;
      out.push({
        id,
        title: compactWhitespace(data.title),
        summary: compactWhitespace(data.summary),
        html: frontmatter.html,
      });
      continue;
    }

    const title = extractTitle(source, fileName);
    const summary = extractSummary(source, title);
    const html = extractBodyHtml(source);

    out.push({ id, title, summary, html });
  }

  return out;
}

async function translateNuances(args) {
  const outPath = path.join(i18nDir, 'nuances.en.json');
  const cache = await loadJson(outPath);
  const entries = await loadNuanceSources();

  const pending = entries
    .filter((entry) => (args.only ? entry.id === args.only : true))
    .filter((entry) => args.force || !cache[entry.id])
    .slice(0, args.limit);

  if (pending.length === 0) {
    console.log('[nuances] nothing to translate.');
    return;
  }

  console.log(`[nuances] translating ${pending.length} pages with model ${args.model}...`);

  const batches = chunk(pending, 2);
  let done = 0;

  for (const batch of batches) {
    const prompt = buildBatchPrompt({
      scopeLabel: 'nuances-html',
      schema: '{"items":[{"id":"string","titleEn":"string","summaryEn":"string","htmlEn":"string"}]}',
      items: batch,
    });

    let parsed;
    try {
      parsed = await callOllamaJson({ model: args.model, prompt });
    } catch (error) {
      console.warn(`[nuances] batch failed, retrying one by one: ${String(error)}`);
      for (const single of batch) {
        const singlePrompt = buildBatchPrompt({
          scopeLabel: 'nuances-html',
          schema: '{"items":[{"id":"string","titleEn":"string","summaryEn":"string","htmlEn":"string"}]}',
          items: [single],
        });
        try {
          const one = await callOllamaJson({ model: args.model, prompt: singlePrompt });
          parsed = { items: [...(parsed?.items || []), ...(Array.isArray(one.items) ? one.items : [])] };
        } catch (singleError) {
          console.warn(`[nuances] skip ${single.id}: ${String(singleError)}`);
        }
      }
    }

    const translatedItems = Array.isArray(parsed?.items) ? parsed.items : [];
    const byId = new Map(translatedItems.map((item) => [item.id, item]));

    for (const source of batch) {
      const translated = byId.get(source.id);
      if (!translated) continue;

      cache[source.id] = {
        titleEn: compactWhitespace(translated.titleEn) || source.title,
        summaryEn: compactWhitespace(translated.summaryEn) || source.summary,
        htmlEn: String(translated.htmlEn || '').trim() || source.html,
      };
      done += 1;
    }

    await saveJson(outPath, cache);
    console.log(`[nuances] progress ${done}/${pending.length}`);
  }
}

async function loadCultureSources() {
  const cultureDir = path.join(contentRoot, 'culture');
  const files = (await fs.readdir(cultureDir)).filter((name) => name.endsWith('.html')).sort();
  const out = [];

  for (const fileName of files) {
    const filePath = path.join(cultureDir, fileName);
    const source = await fs.readFile(filePath, 'utf-8');
    const id = basename(fileName, '.html');
    const frontmatter = parseFrontmatterAndHtml(source);
    if (!frontmatter) {
      throw new Error(`Culture file requires frontmatter: ${fileName}`);
    }

    const data = frontmatter.data;
    out.push({
      id,
      title: compactWhitespace(data.title),
      summary: compactWhitespace(data.summary),
      period: compactWhitespace(data.period || ''),
      traditions: Array.isArray(data.traditions) ? data.traditions.map((item) => compactWhitespace(item)) : [],
      keyPoints: Array.isArray(data.keyPoints) ? data.keyPoints.map((item) => compactWhitespace(item)) : [],
      html: frontmatter.html,
    });
  }

  return out;
}

async function translateCulture(args) {
  const outPath = path.join(i18nDir, 'culture.en.json');
  const cache = await loadJson(outPath);
  const entries = await loadCultureSources();

  const pending = entries
    .filter((entry) => (args.only ? entry.id === args.only : true))
    .filter((entry) => args.force || !cache[entry.id])
    .slice(0, args.limit);

  if (pending.length === 0) {
    console.log('[culture] nothing to translate.');
    return;
  }

  console.log(`[culture] translating ${pending.length} pages with model ${args.model}...`);

  const batches = chunk(pending, 2);
  let done = 0;

  for (const batch of batches) {
    const prompt = buildBatchPrompt({
      scopeLabel: 'culture-html',
      schema:
        '{"items":[{"id":"string","titleEn":"string","summaryEn":"string","periodEn":"string","traditionsEn":["string"],"keyPointsEn":["string"],"htmlEn":"string"}]}',
      items: batch,
    });

    let parsed;
    try {
      parsed = await callOllamaJson({ model: args.model, prompt });
    } catch (error) {
      console.warn(`[culture] batch failed, retrying one by one: ${String(error)}`);
      for (const single of batch) {
        const singlePrompt = buildBatchPrompt({
          scopeLabel: 'culture-html',
          schema:
            '{"items":[{"id":"string","titleEn":"string","summaryEn":"string","periodEn":"string","traditionsEn":["string"],"keyPointsEn":["string"],"htmlEn":"string"}]}',
          items: [single],
        });
        try {
          const one = await callOllamaJson({ model: args.model, prompt: singlePrompt });
          parsed = { items: [...(parsed?.items || []), ...(Array.isArray(one.items) ? one.items : [])] };
        } catch (singleError) {
          console.warn(`[culture] skip ${single.id}: ${String(singleError)}`);
        }
      }
    }

    const translatedItems = Array.isArray(parsed?.items) ? parsed.items : [];
    const byId = new Map(translatedItems.map((item) => [item.id, item]));

    for (const source of batch) {
      const translated = byId.get(source.id);
      if (!translated) continue;

      cache[source.id] = {
        titleEn: compactWhitespace(translated.titleEn) || source.title,
        summaryEn: compactWhitespace(translated.summaryEn) || source.summary,
        periodEn: compactWhitespace(translated.periodEn) || source.period,
        traditionsEn: normalizeStringArray(translated.traditionsEn, source.traditions),
        keyPointsEn: normalizeStringArray(translated.keyPointsEn, source.keyPoints),
        htmlEn: String(translated.htmlEn || '').trim() || source.html,
      };
      done += 1;
    }

    await saveJson(outPath, cache);
    console.log(`[culture] progress ${done}/${pending.length}`);
  }
}

async function ensureSeedFiles() {
  await fs.mkdir(i18nDir, { recursive: true });
  const seeds = [
    path.join(i18nDir, 'grammar-points.en.json'),
    path.join(i18nDir, 'nuances.en.json'),
    path.join(i18nDir, 'culture.en.json'),
  ];

  for (const filePath of seeds) {
    try {
      await fs.access(filePath);
    } catch {
      await saveJson(filePath, {});
    }
  }
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  await ensureSeedFiles();

  if (args.scopes.has('grammar-points')) {
    await translateGrammarPoints(args);
  }
  if (args.scopes.has('nuances')) {
    await translateNuances(args);
  }
  if (args.scopes.has('culture')) {
    await translateCulture(args);
  }

  console.log('Translation generation done.');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
