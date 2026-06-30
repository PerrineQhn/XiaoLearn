#!/usr/bin/env node
/**
 * generate-conv-exercise-audio.mjs
 * --------------------------------
 * Génère les audios MP3 pour TOUTES les phrases chinoises présentes dans les
 * exercices Conversation (cecr-conversation-exercises*.ts) qui ne sont PAS
 * couvertes par `generate-all-audio.mjs --category=examples` :
 *
 *   - dialogue[].hanzi (répliques des dialogue-response)
 *   - choices[] (réponses des mcq / translation / dialogue-response / context-react /
 *     order / fill / error-correction quand ce sont des phrases chinoises)
 *   - sentence (pour fill / order)
 *
 * Chaque phrase est convertie en hash FNV-1a → fichier `audio/examples/<hash>.mp3`
 * (même convention que `getExampleAudioUrl` côté app et `hashExampleName` côté
 * scripts existants).
 *
 * Idempotent : skip les fichiers déjà présents. Re-runs gratuits.
 *
 * Usage :
 *   export AZURE_SPEECH_KEY="<ta clé>"
 *   export AZURE_SPEECH_REGION="eastus"  # ou westeurope
 *   node scripts/generate-conv-exercise-audio.mjs           # génère les manquants
 *   node scripts/generate-conv-exercise-audio.mjs --dry-run # liste sans appeler Azure
 *   node scripts/generate-conv-exercise-audio.mjs --limit=50
 *   node scripts/generate-conv-exercise-audio.mjs --voice=zh-CN-XiaoyiNeural
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(__dirname, '..');
const CONV_FILES = [
  'src/data/cecr-conversation-exercises.ts',
  'src/data/cecr-conversation-exercises-extra.ts',
  'src/data/cecr-conversation-exercises-extra-2.ts',
  'src/data/cecr-conversation-exercises-extra-3.ts',
  'src/data/cecr-conversation-exercises-extra-4.ts',
  // V16 — exos Nuances ajoutés
  'src/data/cecr-nuances-exercises-ab.ts',
  'src/data/cecr-nuances-exercises-c.ts'
].map((f) => path.join(PROJECT_ROOT, f));
const EXAMPLES_DIR = path.join(PROJECT_ROOT, 'public', 'audio', 'examples');

// ---------------------------------------------------------------------------
// CLI flags
// ---------------------------------------------------------------------------
const argv = process.argv.slice(2);
const dryRun = argv.includes('--dry-run');
const limitArg = argv.find((a) => a.startsWith('--limit='))?.slice('--limit='.length);
const LIMIT = limitArg ? parseInt(limitArg, 10) : Infinity;
const voiceOverride = argv.find((a) => a.startsWith('--voice='))?.slice('--voice='.length);

// ---------------------------------------------------------------------------
// Azure credentials
// ---------------------------------------------------------------------------
const AZURE_KEY = process.env.AZURE_SPEECH_KEY;
const AZURE_REGION = process.env.AZURE_SPEECH_REGION || 'eastus';
if (!AZURE_KEY && !dryRun) {
  console.error('✗ AZURE_SPEECH_KEY manquant.');
  console.error('  Export :  export AZURE_SPEECH_KEY="<ta clé>"');
  console.error('  Région :  export AZURE_SPEECH_REGION="westeurope"  # ou eastus');
  process.exit(1);
}

const DEFAULT_VOICE = 'zh-CN-XiaoxiaoNeural';
const VOICE = voiceOverride || DEFAULT_VOICE;

// ---------------------------------------------------------------------------
// Hash FNV-1a — identique à hashExampleName côté app et autres scripts
// ---------------------------------------------------------------------------
function hashExampleName(hanzi) {
  let h = 0x811c9dc5;
  for (let i = 0; i < hanzi.length; i++) {
    h ^= hanzi.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return (h >>> 0).toString(36);
}

// ---------------------------------------------------------------------------
// Extraction des phrases chinoises des fichiers Conv
// ---------------------------------------------------------------------------
function extractPhrases(content) {
  const phrases = new Set();
  // dialogue: [{ hanzi: "..." }]
  for (const m of content.matchAll(/hanzi:\s*['"]([一-鿿　-〿＀-￯\s\d%！？，。、…]+?)['"]/g)) {
    const s = m[1].trim();
    if (/[一-鿿]/.test(s) && s.length >= 2) phrases.add(s);
  }
  // sentence: '...' (fill, order) — on retire les ___ placeholders
  for (const m of content.matchAll(/sentence:\s*['"]([^'"\\]+)['"]/g)) {
    const raw = m[1].trim();
    const cleaned = raw.replace(/___+/g, '').trim();
    if (/[一-鿿]/.test(cleaned) && cleaned.length >= 2 && !/^[a-zA-Z]/.test(cleaned)) {
      phrases.add(cleaned);
    }
  }
  // choices: ['...', '...'] — souvent des phrases chinoises (translation, dialogue, context)
  for (const m of content.matchAll(/choices:\s*\[([^\]]+)\]/g)) {
    const inner = m[1];
    for (const c of inner.matchAll(/['"]([一-鿿　-〿＀-￯\s\d%！？，。、…/]+?)['"]/g)) {
      const s = c[1].trim();
      // V16 — Filtre les pseudo-phrases avec ' / ' (segments error-correction
      // affichés en colonne, ex: '我 / 想 / 买 / 二本书'). Ce ne sont pas
      // de vraies phrases à lire.
      if (s.includes(' / ')) continue;
      if (/[一-鿿]/.test(s) && s.length >= 2) phrases.add(s);
    }
  }
  return phrases;
}

const allPhrases = new Set();
for (const f of CONV_FILES) {
  if (!fs.existsSync(f)) {
    console.warn('⚠ Fichier introuvable :', f);
    continue;
  }
  const content = fs.readFileSync(f, 'utf8');
  const p = extractPhrases(content);
  for (const x of p) allPhrases.add(x);
}

console.log('🔍 Phrases extraites :', allPhrases.size);

// Filtrer les manquantes
fs.mkdirSync(EXAMPLES_DIR, { recursive: true });
const missing = [];
for (const phrase of allPhrases) {
  const name = hashExampleName(phrase) + '.mp3';
  const filePath = path.join(EXAMPLES_DIR, name);
  if (!fs.existsSync(filePath)) {
    missing.push({ hanzi: phrase, name, filePath });
  }
}
console.log('✔ Déjà présents :', allPhrases.size - missing.length);
console.log('✖ Manquants     :', missing.length);

if (missing.length === 0) {
  console.log('✨ Rien à générer.');
  process.exit(0);
}

const totalChars = missing.reduce((a, m) => a + m.hanzi.length, 0);
console.log(
  '💰 Estimation Azure :',
  totalChars,
  'caractères ≈',
  (totalChars * 0.000016).toFixed(4),
  'USD'
);

if (dryRun) {
  console.log('\n--dry-run : voici les 10 premières phrases manquantes :');
  missing.slice(0, 10).forEach((m) => console.log('  - ' + m.hanzi + ' → ' + m.name));
  console.log('\n(Lance sans --dry-run pour générer)');
  process.exit(0);
}

// ---------------------------------------------------------------------------
// Azure REST call
// ---------------------------------------------------------------------------
function escapeXml(s) {
  return s.replace(
    /[<>&'"]/g,
    (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' }[c])
  );
}
function buildSsml(text, voice, rate = '-5%') {
  return [
    '<speak version="1.0" xml:lang="zh-CN" xmlns:mstts="https://www.w3.org/2001/mstts">',
    `  <voice name="${voice}">`,
    `    <prosody rate="${rate}">${escapeXml(text)}</prosody>`,
    '  </voice>',
    '</speak>'
  ].join('\n');
}

async function synthesize(text) {
  const ssml = buildSsml(text, VOICE);
  const url = `https://${AZURE_REGION}.tts.speech.microsoft.com/cognitiveservices/v1`;
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Ocp-Apim-Subscription-Key': AZURE_KEY,
      'Content-Type': 'application/ssml+xml',
      'X-Microsoft-OutputFormat': 'audio-48khz-96kbitrate-mono-mp3',
      'User-Agent': 'xiaolearn-conv-audio'
    },
    body: ssml
  });
  if (!res.ok) {
    const body = await res.text().catch(() => '');
    const retryAfter = res.headers.get('retry-after');
    const e = new Error(`Azure ${res.status}: ${body.slice(0, 200)}`);
    e.status = res.status;
    e.retryAfter = retryAfter ? parseInt(retryAfter, 10) : null;
    e.body = body;
    throw e;
  }
  return Buffer.from(await res.arrayBuffer());
}

async function synthesizeWithRetry(text, attempt = 1) {
  const MAX = 6;
  try {
    return await synthesize(text);
  } catch (err) {
    if (attempt >= MAX) throw err;
    const wait = err.retryAfter
      ? err.retryAfter * 1000
      : Math.min(2 ** attempt * 500, 8000);
    if (err.status === 429 && /quota/i.test(err.body || '') && wait > 60000) {
      console.error('✗ Quota Azure F0 épuisé. Stop.');
      process.exit(1);
    }
    console.warn(`  ⚠ tentative ${attempt}/${MAX} échec (${err.status}), retry dans ${wait}ms`);
    await new Promise((r) => setTimeout(r, wait));
    return synthesizeWithRetry(text, attempt + 1);
  }
}

// ---------------------------------------------------------------------------
// Génération séquentielle (Azure F0 = 200 req/min, on reste prudent)
// ---------------------------------------------------------------------------
const toGenerate = missing.slice(0, LIMIT);
console.log(`\n🚀 Génération de ${toGenerate.length} fichiers (voix ${VOICE})...\n`);

let ok = 0,
  ko = 0;
for (let i = 0; i < toGenerate.length; i++) {
  const { hanzi, filePath, name } = toGenerate[i];
  try {
    const buf = await synthesizeWithRetry(hanzi);
    fs.writeFileSync(filePath, buf);
    ok++;
    if (i % 25 === 0 || i === toGenerate.length - 1) {
      console.log(`  [${i + 1}/${toGenerate.length}] ✔ ${name} — ${hanzi.slice(0, 30)}`);
    }
  } catch (err) {
    ko++;
    console.error(`  [${i + 1}/${toGenerate.length}] ✗ ${name} — ${err.message}`);
  }
}

console.log(`\n✨ Terminé : ${ok} générés, ${ko} échoués sur ${toGenerate.length}.`);
if (ko > 0) process.exit(1);
