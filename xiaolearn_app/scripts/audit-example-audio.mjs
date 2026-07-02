/**
 * audit-example-audio.mjs
 * -----------------------
 * Scanne TOUS les exemples de leçons (sources TS + dictionnaires JSON HSK) et
 * vérifie que chacun a bien un MP3 sur disque — soit via le champ `audio:`
 * explicite, soit via le fallback `audio/examples/<hash>.mp3` calculé depuis
 * le hanzi (identique à `getExampleAudioUrl` côté app).
 *
 * Pourquoi le script `generate-all-audio.mjs` n'a pas suffi :
 *   Il ne regarde que les blocs `examples: [ { hanzi: … } ]` dans les `.ts`.
 *   Les dictionnaires HSK (`data/hsk*.json`) utilisent `chinese:` au lieu de
 *   `hanzi:` → invisibles pour ce script. Conséquence : ~11k exemples de
 *   flashcards n'étaient pas couverts et leurs MP3 d'exemple potentiellement
 *   manquants, donc le bouton 🔊 de la phase Exemples restait muet.
 *
 * Usage :
 *   node scripts/audit-example-audio.mjs
 *
 * Produit `scripts/audit-example-audio-report.json` avec la liste complète
 * des hanzi sans audio, consommable par un script de génération dédié.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(__dirname, '..');
const SRC_DATA = path.join(PROJECT_ROOT, 'src', 'data');
const DATA_ROOT = path.join(PROJECT_ROOT, 'data');
const EXAMPLES_DIR = path.join(PROJECT_ROOT, 'public', 'audio', 'examples');
const PUBLIC_ROOT = path.join(PROJECT_ROOT, 'public');

// FNV-1a 32-bit → base36 (identique à src/utils/audio.ts + generate-all-audio.mjs)
function hashExampleName(hanzi) {
  let h = 0x811c9dc5;
  for (let i = 0; i < hanzi.length; i++) {
    h ^= hanzi.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return (h >>> 0).toString(36);
}

function walkTs(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walkTs(full));
    else if (entry.name.endsWith('.ts')) out.push(full);
  }
  return out;
}

/** Extrait les exemples d'un .ts via scan regex naïf (comme generate-all-audio.mjs). */
function extractExamplesFromTs(content, file) {
  const results = [];
  const blockRegex = /examples\s*:\s*\[/g;
  let m;
  while ((m = blockRegex.exec(content)) !== null) {
    let depth = 1;
    let i = m.index + m[0].length;
    const start = i;
    while (i < content.length && depth > 0) {
      const c = content[i];
      if (c === '[') depth++;
      else if (c === ']') depth--;
      i++;
    }
    const block = content.slice(start, i - 1);

    let obj = '';
    let oDepth = 0;
    for (const ch of block) {
      if (ch === '{') { oDepth++; obj += ch; }
      else if (ch === '}') {
        oDepth--; obj += ch;
        if (oDepth === 0) {
          const hanziMatch = obj.match(/hanzi\s*:\s*['"]([^'"]+)['"]/);
          const audioMatch = obj.match(/audio\s*:\s*['"]([^'"]+)['"]/);
          if (hanziMatch) {
            results.push({
              file: path.relative(PROJECT_ROOT, file),
              hanzi: hanziMatch[1],
              audio: audioMatch ? audioMatch[1] : null
            });
          }
          obj = '';
        }
      } else if (oDepth > 0) obj += ch;
    }
  }
  return results;
}

/** Parse un JSON HSK et extrait tous les examples[].chinese + optional audio. */
function extractExamplesFromJson(jsonPath) {
  const raw = fs.readFileSync(jsonPath, 'utf8');
  let data;
  try { data = JSON.parse(raw); } catch { return []; }
  if (!Array.isArray(data)) return [];
  const results = [];
  for (const item of data) {
    const examples = item?.examples;
    if (!Array.isArray(examples)) continue;
    for (const ex of examples) {
      const hanzi = ex?.hanzi ?? ex?.chinese;
      if (!hanzi || typeof hanzi !== 'string') continue;
      results.push({
        file: path.relative(PROJECT_ROOT, jsonPath),
        hanzi,
        audio: ex?.audio ?? null
      });
    }
  }
  return results;
}

function main() {
  // ─── 1. Collecte ─────────────────────────────────────────────────────────
  const all = [];
  for (const f of walkTs(SRC_DATA)) {
    const content = fs.readFileSync(f, 'utf8');
    all.push(...extractExamplesFromTs(content, f));
  }
  const jsonFiles = fs
    .readdirSync(DATA_ROOT)
    .filter((n) => /^hsk\d+\.json$/.test(n) || n === 'hors-hsk.json')
    .map((n) => path.join(DATA_ROOT, n));
  for (const jsonPath of jsonFiles) {
    all.push(...extractExamplesFromJson(jsonPath));
  }

  // ─── 2. Dédup par hanzi ─────────────────────────────────────────────────
  const byHanzi = new Map();
  for (const e of all) {
    const clean = e.hanzi.replace(/\d+$/, '').trim();
    if (!clean) continue;
    if (!byHanzi.has(clean)) byHanzi.set(clean, []);
    byHanzi.get(clean).push(e);
  }

  // ─── 3. Classification ──────────────────────────────────────────────────
  let withExplicitAudio = 0;
  let missingExplicitAudio = 0;
  let hashPresent = 0;
  let hashMissing = 0;
  let shortSkipped = 0;
  const missingHashes = [];
  const missingExplicit = [];

  for (const [hanzi, occurrences] of byHanzi.entries()) {
    const hasExplicit = occurrences.some((o) => o.audio);
    if (hasExplicit) {
      withExplicitAudio++;
      const firstAudio = occurrences.find((o) => o.audio);
      const absMp3 = path.join(PUBLIC_ROOT, firstAudio.audio.replace(/\.wav$/, '.mp3'));
      const absWav = path.join(PUBLIC_ROOT, firstAudio.audio);
      if (!fs.existsSync(absMp3) && !fs.existsSync(absWav)) {
        missingExplicitAudio++;
        missingExplicit.push({ hanzi, audio: firstAudio.audio, file: firstAudio.file });
      }
      continue;
    }

    // Sans audio explicite : les courts (≤3 chars) dépendent des conventions
    // HSK (audio/hsk*/hsk*_<hanzi>.mp3) — pas du hash examples. On ne les
    // comptabilise pas ici (un autre audit les couvre).
    if (hanzi.length <= 3) {
      shortSkipped++;
      continue;
    }

    const name = `${hashExampleName(hanzi)}.mp3`;
    const abs = path.join(EXAMPLES_DIR, name);
    if (fs.existsSync(abs)) {
      hashPresent++;
    } else {
      hashMissing++;
      missingHashes.push({
        hanzi,
        name,
        files: [...new Set(occurrences.map((o) => o.file))]
      });
    }
  }

  // ─── 4. Rapport ─────────────────────────────────────────────────────────
  console.log(`📊 Audit audios d'exemples — ${new Date().toISOString().slice(0, 10)}\n`);
  console.log(`  Exemples distincts (par hanzi)     : ${byHanzi.size}`);
  console.log(`  └─ Hanzi courts ≤3 car. (skip)     : ${shortSkipped}`);
  console.log(`  └─ Avec audio explicite            : ${withExplicitAudio}`);
  console.log(`     └─ fichier présent               : ${withExplicitAudio - missingExplicitAudio}`);
  console.log(`     └─ fichier MANQUANT              : ${missingExplicitAudio}`);
  console.log(`  └─ Fallback hash MP3 (>3 car.)     : ${hashPresent + hashMissing}`);
  console.log(`     └─ MP3 hash présent              : ${hashPresent}`);
  console.log(`     └─ MP3 hash MANQUANT             : ${hashMissing}`);
  console.log('');

  if (missingExplicitAudio > 0) {
    console.log(`⚠ ${missingExplicitAudio} exemples avec audio explicite introuvable :`);
    for (const m of missingExplicit.slice(0, 15)) {
      console.log(`  - ${m.hanzi.slice(0, 25).padEnd(25)} → ${m.audio}`);
    }
    if (missingExplicit.length > 15) console.log(`  … et ${missingExplicit.length - 15} autres`);
    console.log('');
  }

  if (hashMissing > 0) {
    console.log(`⚠ ${hashMissing} exemples sans MP3 hash généré :`);
    for (const m of missingHashes.slice(0, 15)) {
      console.log(`  - ${m.hanzi.slice(0, 30).padEnd(30)} → audio/examples/${m.name}`);
    }
    if (missingHashes.length > 15) console.log(`  … et ${missingHashes.length - 15} autres`);
    console.log('');
    const estChars = missingHashes.reduce((s, m) => s + m.hanzi.length, 0);
    console.log(`  Estimation Azure : ${estChars} caractères ≈ ${((estChars / 1_000_000) * 16).toFixed(4)} USD\n`);
  }

  // ─── 5. Rapport JSON ─────────────────────────────────────────────────────
  const report = {
    generatedAt: new Date().toISOString(),
    distinctHanzi: byHanzi.size,
    shortSkipped,
    missingExplicit,
    missingHashes
  };
  const reportPath = path.join(PROJECT_ROOT, 'scripts', 'audit-example-audio-report.json');
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  console.log(`📄 Rapport complet : ${path.relative(PROJECT_ROOT, reportPath)}`);
}

main();
