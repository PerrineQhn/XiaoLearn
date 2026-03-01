/**
 * substack_agent.mjs
 * Récupère les leçons CGG de HSKLevel Substack, les traduit en français
 * et génère des articles Markdown pour xiaolearn_reference (site Astro).
 *
 * Format de sortie : xiaolearn_reference/src/content/grammaire/hskX/<slug>.md
 *
 * Gestion des séries : si un article est "Part 2" (ou N), l'agent récupère
 * automatiquement toutes les parties précédentes et les fusionne en un seul article.
 *
 * ── Backends ────────────────────────────────────────────────────────────────
 *  Ollama (gratuit, local) — défaut
 *    Prérequis : ollama pull qwen2.5:7b
 *    Usage     : node substack_agent.mjs
 *
 *  Claude API (Anthropic)
 *    Usage     : ANTHROPIC_API_KEY=sk-ant-... node substack_agent.mjs --backend claude
 *
 * ── Options ─────────────────────────────────────────────────────────────────
 *  --all            Récupère TOUS les CGG via l'API Substack (archive complète, y compris payant)
 *  --free-only      Avec --all : ignore les articles payants (audience: only_paid)
 *  --count N        Nombre de groupes/articles à traiter (défaut: 1 sans --all, tous avec --all)
 *  --url <url>      URL d'un article spécifique
 *  --backend ollama|claude
 *  --model <name>   Modèle Ollama (défaut : qwen2.5:7b)
 *  --delay N        Délai en ms entre chaque appel LLM (défaut: 500)
 *
 * ── Accès aux articles payants ───────────────────────────────────────────────
 *  Pour accéder aux CGG payants, fournis ton cookie de session Substack :
 *    SUBSTACK_COOKIE="connect.sid=..." node substack_agent.mjs --all
 *  (Ouvre DevTools sur hsklevel.substack.com → Application → Cookies)
 */

import { writeFileSync, existsSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const RSS_URL = 'https://hsklevel.substack.com/feed';

// Cookie de session Substack (optionnel, pour accéder aux articles payants)
const SUBSTACK_COOKIE = process.env.SUBSTACK_COOKIE ?? '';

/** Headers communs (avec cookie si disponible) */
function makeHeaders(accept = 'text/html') {
  const h = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
    Accept: accept,
  };
  if (SUBSTACK_COOKIE) h['Cookie'] = SUBSTACK_COOKIE;
  return h;
}
const GRAMMAIRE_DIR = join(
  __dirname, '..', 'xiaolearn_reference', 'src', 'content', 'grammaire'
);

// Catégories valides du schéma Astro
const VALID_CATEGORIES = [
  'structure-phrase', 'particules', 'classificateurs', 'aspects-verbaux',
  'comparaison', 'questions', 'negation', 'temps', 'complement', 'autres'
];

// ─── BACKENDS LLM ────────────────────────────────────────────────────────────

async function callOllama(prompt, model) {
  const res = await fetch('http://localhost:11434/api/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model,
      prompt,
      stream: false,
      options: { temperature: 0.3, num_predict: 8000 },
    }),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Ollama ${res.status}: ${err}\n(→ ollama pull ${model})`);
  }
  return (await res.json()).response;
}

async function callClaude(prompt) {
  let Anthropic;
  try {
    ({ default: Anthropic } = await import('@anthropic-ai/sdk'));
  } catch {
    throw new Error('SDK Anthropic non installé. Lance : npm install dans scripts/');
  }
  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  const msg = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 8000,
    messages: [{ role: 'user', content: prompt }],
  });
  return msg.content[0].text;
}

// ─── RSS (récents seulement) ──────────────────────────────────────────────────

async function fetchRSS() {
  console.log('📡 Flux RSS (articles récents)...');
  const res = await fetch(RSS_URL, { headers: makeHeaders('application/rss+xml') });
  if (!res.ok) throw new Error(`RSS ${res.status}`);
  return res.text();
}

function parseCGGArticles(xml) {
  const items = [];
  const itemRx = /<item>([\s\S]*?)<\/item>/g;
  let m;
  while ((m = itemRx.exec(xml)) !== null) {
    const b = m[1];
    const title = (b.match(/<title>(?:<!\[CDATA\[)?(.*?)(?:\]\]>)?<\/title>/s)?.[1] ?? '').trim();
    if (!title.toUpperCase().includes('CGG')) continue;
    const url = (
      b.match(/<link>([^<]+)<\/link>/)?.[1] ??
      b.match(/<guid[^>]*>([^<]+)<\/guid>/)?.[1] ?? ''
    ).trim();
    if (!url.startsWith('http')) continue;
    items.push({ title, url });
  }
  console.log(`✅ ${items.length} article(s) CGG trouvé(s) dans le RSS`);
  return items;
}

// ─── API SUBSTACK (archive complète) ─────────────────────────────────────────

/**
 * Récupère TOUS les articles CGG via l'API Substack paginée.
 * - freeOnly=true : ignore les articles payants (audience: only_paid)
 * - freeOnly=false (défaut) : inclut tout, tente le scraping pour les payants
 */
async function fetchAllCGGFromAPI(freeOnly = false) {
  const modeLabel = freeOnly ? 'articles publics uniquement' : 'tous les articles (payants inclus)';
  console.log(`🗂️  Récupération de l'archive complète — ${modeLabel}...`);
  if (SUBSTACK_COOKIE) console.log('🔑 Cookie Substack détecté → accès authentifié');

  const allPosts = [];
  let offset = 0;
  const limit = 50;
  let page = 1;

  while (true) {
    const url = `https://hsklevel.substack.com/api/v1/posts?limit=${limit}&offset=${offset}`;
    process.stdout.write(`  Page ${page} (offset=${offset})... `);

    const res = await fetch(url, { headers: makeHeaders('application/json') });

    if (!res.ok) {
      console.log(`❌ ${res.status}`);
      break;
    }

    const posts = await res.json();
    if (!Array.isArray(posts) || posts.length === 0) {
      console.log('fin.');
      break;
    }

    const cgg = posts.filter(p =>
      p.title?.toUpperCase().includes('CGG') &&
      p.type === 'newsletter' &&
      (!freeOnly || p.audience === 'everyone')
    );

    const paid = cgg.filter(p => p.audience !== 'everyone').length;
    const free = cgg.length - paid;
    const detail = paid > 0 ? ` (${free} publics + ${paid} payants)` : ` (${free} publics)`;
    console.log(`${posts.length} posts → ${cgg.length} CGG${detail}`);

    for (const p of cgg) {
      allPosts.push({
        title: p.title ?? '',
        url: p.canonical_url ?? '',
        bodyHtml: p.body_html ?? '',   // présent si public ou si cookie valide
        isPaid: p.audience !== 'everyone',
      });
    }

    if (posts.length < limit) break;
    offset += limit;
    page++;
    await new Promise(r => setTimeout(r, 300)); // politesse
  }

  // Trier du plus ancien au plus récent (CGG #1 en premier)
  allPosts.sort((a, b) => {
    const na = getCGGNumber(a.title) ?? 9999;
    const nb = getCGGNumber(b.title) ?? 9999;
    return na - nb;
  });

  const paidCount = allPosts.filter(a => a.isPaid).length;
  const freeCount = allPosts.length - paidCount;
  const authNote = SUBSTACK_COOKIE ? '' : paidCount > 0 ? ' (cookie requis pour le contenu payant)' : '';
  console.log(`✅ ${allPosts.length} article(s) CGG trouvés — ${freeCount} publics, ${paidCount} payants${authNote}`);
  return allPosts;
}

/**
 * Regroupe tous les articles par série (Part 1 + Part 2 + … ensemble).
 * Chaque groupe est trié par numéro de partie.
 */
function groupAllBySeries(articles) {
  const map = new Map();

  for (const article of articles) {
    const key = normalizeTitleForGrouping(article.title);
    if (!map.has(key)) map.set(key, []);
    map.get(key).push({ ...article, _partNum: detectPartNum(article.title) });
  }

  const groups = [];
  for (const group of map.values()) {
    group.sort((a, b) => a._partNum - b._partNum);
    groups.push(group);
  }

  // Trier les groupes par numéro CGG (le plus bas = Part 1 du groupe)
  groups.sort((a, b) => {
    const na = getCGGNumber(a[0].title) ?? 9999;
    const nb = getCGGNumber(b[0].title) ?? 9999;
    return na - nb;
  });

  const multiPart = groups.filter(g => g.length > 1).length;
  console.log(`📦 ${groups.length} groupe(s) de leçons (dont ${multiPart} séries multi-parties)`);
  return groups;
}

// ─── DÉTECTION DES SÉRIES ────────────────────────────────────────────────────

function getCGGNumber(title) {
  const m = title.match(/CGG\s*#(\d+)/i);
  return m ? parseInt(m[1]) : null;
}

function detectPartNum(title) {
  for (const pat of [/\(Part\s+(\d+)\)/i, /\bPart\s+(\d+)\b/i, /\((\d+)\/\d+\)/, /\b(\d+)\s+of\s+\d+\b/i]) {
    const m = title.match(pat);
    if (m) return parseInt(m[1]);
  }
  return 1;
}

function normalizeTitleForGrouping(title) {
  return title
    .replace(/CGG\s*#\d+\s*:?\s*/i, '')
    .replace(/\(Part\s*\d+\)/gi, '')
    .replace(/Part\s*\d+/gi, '')
    .replace(/\(\d+\/\d+\)/g, '')
    .replace(/\d+\s+of\s+\d+/gi, '')
    .replace(/[^a-z0-9\s\u4e00-\u9fff]/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
}

function resolveArticleGroup(article, allArticles) {
  const partNum = detectPartNum(article.title);
  if (partNum <= 1) return [{ ...article, _partNum: 1 }];

  const normalizedTarget = normalizeTitleForGrouping(article.title);
  const group = [{ ...article, _partNum: partNum }];

  for (const other of allArticles) {
    if (other.url === article.url) continue;
    if (normalizeTitleForGrouping(other.title) !== normalizedTarget) continue;
    const otherPart = detectPartNum(other.title);
    if (otherPart >= partNum) continue;
    group.push({ ...other, _partNum: otherPart });
  }

  group.sort((a, b) => a._partNum - b._partNum);
  if (group.length > 1) {
    console.log(`🔗 Série : ${group.map(a => `Part ${a._partNum}`).join(' + ')} → fusion`);
  }
  return group;
}

// ─── FETCH ARTICLE ───────────────────────────────────────────────────────────

async function fetchArticleText(url) {
  const res = await fetch(url, { headers: makeHeaders('text/html') });
  if (!res.ok) throw new Error(`Article ${res.status}: ${url}`);
  const html = await res.text();
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<\/?(h[1-6]|p|li|br|hr|div|blockquote)[^>]*>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, ' ').replace(/&#39;/g, "'").replace(/&quot;/g, '"')
    .replace(/[ \t]+/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
    .substring(0, 5500);
}

// ─── SLUG ────────────────────────────────────────────────────────────────────

function slugify(text) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')   // retirer les accents
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .substring(0, 60);
}

// ─── PROMPT ──────────────────────────────────────────────────────────────────

function buildPrompt(title, content, isMerged, existingCount) {
  const categories = VALID_CATEGORIES.join(' | ');
  const today = new Date().toISOString().split('T')[0];
  const mergedNote = isMerged
    ? `Note : ce contenu provient de plusieurs parties fusionnées. Traite-le comme un article unique et complet.`
    : '';

  return `Tu es un expert en mandarin et un rédacteur pédagogique. Tu écris pour XiaoLearn, un site de référence en grammaire chinoise pour francophones.

ARTICLE SOURCE (anglais) : "${title}"
${mergedNote}
CONTENU :
${content}

MISSION : Génère un article de grammaire complet en FRANÇAIS au format Markdown avec frontmatter YAML.

Le fichier doit respecter EXACTEMENT ce format :

---
title: "Titre de l'article en français"
level: 2
category: "questions"
order: ${existingCount + 1}
summary: "Résumé en 1-2 phrases en français."
keyPoints:
  - "Point clé 1"
  - "Point clé 2"
  - "Point clé 3"
  - "Point clé 4"
relatedGrammar: []
difficulty: "intermédiaire"
lastUpdated: ${today}
---

## Introduction

[Paragraphe d'introduction en français]

## Structure

\`\`\`
Schéma syntaxique
\`\`\`

### Exemples

**汉字例句。**
*pīnyīn lì jù.*
Traduction française.

[autres exemples...]

## Nuances d'usage

[Sous-sections pour chaque nuance/usage particulier, avec exemples]

## Erreurs courantes

| Incorrect | Correct | Raison |
|-----------|---------|--------|
| ... | ... | ... |

## Points clés à retenir

1. ...
2. ...

## Exercices

[2-4 exercices avec réponses dans <details>]

CONTRAINTES :
- "level" = nombre entier entre 1 et 4 (HSK1=1, HSK2=2, HSK3=3, HSK4+=4)
- "category" = une valeur parmi : ${categories}
- "difficulty" = "débutant" ou "intermédiaire"
- Tout le texte non-chinois → FRANÇAIS
- Pinyin avec tons diacritiques (ǐ, ā, é…), jamais de chiffres de ton
- Exemples : **hanzi** en gras, *pinyin* en italique, puis traduction
- Profite du contenu fusionné pour couvrir TOUTES les nuances
- Retourne UNIQUEMENT le fichier Markdown complet, sans texte avant ou après`;
}

// ─── LLM ─────────────────────────────────────────────────────────────────────

async function convertWithLLM(title, content, isMerged, existingCount, backend, model) {
  console.log(`🤖 Génération LLM (${backend})...`);
  const prompt = buildPrompt(title, content, isMerged, existingCount);
  return backend === 'claude'
    ? await callClaude(prompt)
    : await callOllama(prompt, model);
}

// ─── PARSER LE FRONTMATTER ───────────────────────────────────────────────────

function parseFrontmatter(markdown) {
  const m = markdown.match(/^---\n([\s\S]*?)\n---/);
  if (!m) return {};
  const yaml = m[1];
  const level = parseInt((yaml.match(/^level:\s*(\d+)/m) || [])[1] || '2');
  const titleM = yaml.match(/^title:\s*"?(.+?)"?\s*$/m);
  const title = titleM ? titleM[1].replace(/^"|"$/g, '') : 'article';
  const catM = yaml.match(/^category:\s*"?([^"\n]+)"?\s*$/m);
  const category = VALID_CATEGORIES.includes(catM?.[1] ?? '') ? catM[1] : 'autres';
  return { level: Math.min(4, Math.max(1, level)), title, category };
}

// ─── DÉDUPLICATION ───────────────────────────────────────────────────────────

/** Trouve les fichiers existants dont le slug contient un numéro CGG. */
function findExistingByCGG(cggNumbers) {
  const found = [];
  for (let lvl = 1; lvl <= 4; lvl++) {
    const dir = join(GRAMMAIRE_DIR, `hsk${lvl}`);
    if (!existsSync(dir)) continue;
    for (const file of readdirSync(dir)) {
      if (!file.endsWith('.md')) continue;
      const slug = file.replace('.md', '');
      for (const num of cggNumbers) {
        if (slug.includes(`cgg-${num}`) || slug.includes(`cgg${num}`)) {
          found.push(join(dir, file));
        }
      }
    }
  }
  return found;
}

/** Compte le nombre d'articles existants dans un dossier hskX. */
function countArticlesInLevel(level) {
  const dir = join(GRAMMAIRE_DIR, `hsk${level}`);
  if (!existsSync(dir)) return 0;
  return readdirSync(dir).filter(f => f.endsWith('.md')).length;
}

// ─── SKIP : article déjà généré ? ───────────────────────────────────────────

/** Retourne true si tous les numéros CGG du groupe sont déjà couverts par un fichier .md. */
function isAlreadyGenerated(articleGroup) {
  const cggNums = articleGroup.map(a => getCGGNumber(a.title)).filter(Boolean);
  if (cggNums.length === 0) return false;
  return cggNums.every(num =>
    findExistingByCGG([num]).length > 0
  );
}

// ─── PIPELINE ────────────────────────────────────────────────────────────────

async function processGroup(articleGroup, backend, model) {
  const isMerged = articleGroup.length > 1;

  if (isMerged) {
    console.log(`📖 Série : ${articleGroup.map(a => `Part ${a._partNum}`).join(' + ')} — ${normalizeTitleForGrouping(articleGroup[0].title)}`);
  } else {
    console.log(`📖 ${articleGroup[0].title}`);
  }

  // Récupérer le contenu de chaque partie
  // Si l'article vient de l'API (bodyHtml présent), on l'utilise directement
  const parts = [];
  for (const article of articleGroup) {
    const label = isMerged ? `Part ${article._partNum}` : 'Article';
    process.stdout.write(`  ⬇️  ${label}... `);
    try {
      let text;
      if (article.isPaid && !article.bodyHtml?.length && !SUBSTACK_COOKIE) {
        console.log('🔒 Payant — fournis SUBSTACK_COOKIE pour accéder au contenu');
        continue;
      }
      if (article.bodyHtml && article.bodyHtml.length > 200) {
        // Contenu fourni par l'API — extraction directe
        text = article.bodyHtml
          .replace(/<script[\s\S]*?<\/script>/gi, '')
          .replace(/<style[\s\S]*?<\/style>/gi, '')
          .replace(/<\/?(h[1-6]|p|li|br|hr|div|blockquote)[^>]*>/gi, '\n')
          .replace(/<[^>]+>/g, '')
          .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
          .replace(/&nbsp;/g, ' ').replace(/&#39;/g, "'").replace(/&quot;/g, '"')
          .replace(/[ \t]+/g, ' ')
          .replace(/\n{3,}/g, '\n\n')
          .trim()
          .substring(0, 5500);
        console.log(`✓ API (${text.length} car.)`);
      } else {
        // Fallback : fetch de la page web
        text = await fetchArticleText(article.url);
        console.log(`✓ Web (${text.length} car.)`);
      }
      if (text.length < 200) { console.log('⚠️  trop court (paywall ?)'); continue; }
      parts.push({ ...article, content: text });
    } catch (err) {
      console.log(`❌ ${err.message}`);
    }
  }

  if (parts.length === 0) return null;

  const baseTitle = articleGroup[0].title
    .replace(/\(Part\s*\d+\)/gi, '').replace(/Part\s*\d+/gi, '').trim();
  const combinedTitle = isMerged ? `${baseTitle} (Complet)` : articleGroup[0].title;
  const combinedContent = parts.length === 1
    ? parts[0].content
    : parts.map(p => `=== PARTIE ${p._partNum} ===\n${p.content}`).join('\n\n');

  const existingCount = countArticlesInLevel(2); // estimé, corrigé après

  const markdown = await convertWithLLM(
    combinedTitle, combinedContent, isMerged, existingCount, backend, model
  );

  const meta = parseFrontmatter(markdown);
  const level = meta.level ?? 2;
  const cggNumbers = articleGroup.map(a => getCGGNumber(a.title)).filter(Boolean);
  const slug = slugify(
    (() => {
      const cggTag = cggNumbers.length ? `cgg-${cggNumbers[0]}` : '';
      const shortTitle = normalizeTitleForGrouping(baseTitle).replace(/\s+/g, '-').substring(0, 40);
      return cggTag ? `${cggTag}-${shortTitle}` : shortTitle;
    })()
  );

  console.log(`✅ hsk${level}/${slug}.md`);
  return { markdown, level, slug, cggNumbers };
}

// ─── ÉCRITURE ────────────────────────────────────────────────────────────────

function writeArticle(mkdirSync, unlinkSync, level, slug, markdown, cggNumbers) {
  // Supprimer les éventuels articles partiels supersédés (Part 1 standalone devenu inutile)
  const superseded = findExistingByCGG(cggNumbers);
  for (const file of superseded) {
    if (!file.includes(slug)) {
      unlinkSync(file);
      console.log(`🗑️  Remplacé : ${file.split('/').slice(-2).join('/')}`);
    }
  }

  const dir = join(GRAMMAIRE_DIR, `hsk${level}`);
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });

  const filepath = join(dir, `${slug}.md`);
  writeFileSync(filepath, markdown, 'utf8');
  return filepath;
}

// ─── MAIN ────────────────────────────────────────────────────────────────────

async function main() {
  const { mkdirSync, unlinkSync } = await import('fs');
  const args = process.argv.slice(2);
  const get = (flag, def) => { const i = args.indexOf(flag); return i >= 0 ? args[i + 1] : def; };

  const backend   = get('--backend', 'ollama');
  const model     = get('--model', 'qwen2.5:7b');
  const singleUrl = get('--url', null);
  const useAll    = args.includes('--all');
  const freeOnly  = args.includes('--free-only');
  const delayMs   = parseInt(get('--delay', '500'));
  // --count N : limite le nombre de groupes traités (utile pour tester avant --all)
  const maxGroups = args.includes('--count') ? parseInt(get('--count', '5')) : (useAll ? Infinity : 1);

  if (backend === 'claude' && !process.env.ANTHROPIC_API_KEY) {
    console.error('❌ ANTHROPIC_API_KEY manquant.');
    process.exit(1);
  }

  console.log(`\n🎯 Backend : ${backend} (${backend === 'ollama' ? model : 'claude-sonnet-4-6'})`);
  console.log(`📂 Sortie  : xiaolearn_reference/src/content/grammaire/hskX/<slug>.md`);

  // Créer les dossiers hsk2–hsk4 si manquants
  for (const lvl of [2, 3, 4]) {
    const dir = join(GRAMMAIRE_DIR, `hsk${lvl}`);
    if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  }

  // ── Construire la liste de groupes à traiter ──────────────────────────────

  let groups = [];

  if (singleUrl) {
    // Mode URL directe : chercher dans l'API d'abord pour avoir le bodyHtml
    const apiPosts = await fetchAllCGGFromAPI(freeOnly);
    const found = apiPosts.find(a => a.url === singleUrl) ?? {
      title: singleUrl.match(/\/p\/([^?#]+)/)?.[1]?.replace(/-/g, ' ') ?? 'CGG Article',
      url: singleUrl,
    };
    groups = [resolveArticleGroup(found, apiPosts)];

  } else if (useAll) {
    // Mode archive complète via API
    const allPosts = await fetchAllCGGFromAPI(freeOnly);
    groups = groupAllBySeries(allPosts);

  } else {
    // Mode RSS (récents seulement)
    const xml = await fetchRSS();
    const recent = parseCGGArticles(xml);
    // Pour chaque article du RSS, résoudre sa série dans le même ensemble
    const seen = new Set();
    for (const article of recent) {
      const key = normalizeTitleForGrouping(article.title);
      if (seen.has(key)) continue;
      seen.add(key);
      groups.push(resolveArticleGroup(article, recent));
    }
  }

  // Limiter si --count fourni
  groups = groups.slice(0, maxGroups);

  // ── Traiter chaque groupe ─────────────────────────────────────────────────

  let generated = 0;
  let skipped   = 0;
  let errors    = 0;
  const total   = groups.length;

  for (let i = 0; i < groups.length; i++) {
    const group = groups[i];
    const cggLabel = group.map(a => getCGGNumber(a.title)).filter(Boolean).join('+') || '?';
    console.log(`\n──────────────────────────────────────`);
    console.log(`[${i + 1}/${total}] CGG #${cggLabel}`);

    // Skip si déjà généré
    if (isAlreadyGenerated(group)) {
      console.log(`⏭️  Déjà généré — ignoré`);
      skipped++;
      continue;
    }

    try {
      const result = await processGroup(group, backend, model);
      if (!result) { errors++; continue; }

      writeArticle(mkdirSync, unlinkSync, result.level, result.slug, result.markdown, result.cggNumbers);
      generated++;
    } catch (err) {
      console.error(`❌ ${err.message}`);
      errors++;
    }

    // Délai entre appels LLM pour ne pas surcharger Ollama
    if (i < groups.length - 1 && delayMs > 0) {
      await new Promise(r => setTimeout(r, delayMs));
    }
  }

  // ── Résumé ────────────────────────────────────────────────────────────────

  console.log(`\n══════════════════════════════════════`);
  console.log(`✨ ${generated} généré(s)  ⏭️  ${skipped} ignoré(s)  ❌ ${errors} erreur(s)  (sur ${total} groupes)`);
  if (generated > 0) {
    console.log(`\n💡 Pour visualiser : cd xiaolearn_reference && npm run dev`);
    console.log(`   → http://localhost:4321/grammaire`);
  }
  if (useAll && generated + skipped < total) {
    console.log(`\n⚠️  Relance avec --all pour continuer (les articles déjà générés seront ignorés automatiquement).`);
  }
}

main().catch(err => {
  console.error('💥', err.message);
  process.exit(1);
});
