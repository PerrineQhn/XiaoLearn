/**
 * fix-exercise-prompts.mts
 *
 * Applique des réécritures ciblées sur les prompts d'exercices qui
 * révèlent la réponse. Stratégie en 2 passes :
 *
 *   1. Patches "automatiques sûrs" : patterns reconnus où on peut
 *      déterminer la transformation sans ambiguïté
 *        - "Annoncer ... avec [hanzi]." → "Annoncer ..."
 *        - "Annoncer ... en utilisant [hanzi]." → "Annoncer ..."
 *        - "Dis ... avec [hanzi]" → "Dis ..."
 *        - "Utilise [hanzi] pour ..." → "Forme la phrase pour ..."
 *
 *   2. Cas qui restent dans le rapport non-fixés et qui demanderont
 *      une réécriture manuelle (ex: "Complète avec 是 ou 很" — les
 *      deux options nommées sont des hanzi du choix, plus subtil).
 *
 * Usage :
 *   npx tsx scripts/fix-exercise-prompts.mts           # dry-run
 *   npx tsx scripts/fix-exercise-prompts.mts --write   # applique
 */

import { readFileSync, writeFileSync, copyFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPORT_PATH = join(__dirname, 'fix-exercise-prompts-report.json');
const WRITE = process.argv.includes('--write');

const FILES = [
  '../src/data/cecr-exercises.ts',
  '../src/data/cecr-exercises-enriched-a1.ts',
  '../src/data/cecr-exercises-enriched-a2.ts'
];

const HANZI_BLOCK = '[一-鿿]+';
// Patterns "avec X" / "en utilisant X" / "utilise X" / "with X"
// Match aussi les variations avec/sans point final.
const PATTERNS_FR: Array<{ re: RegExp; replace: string }> = [
  // "Annoncer ton origine avec 来自." → "Annoncer ton origine."
  { re: new RegExp(` avec ${HANZI_BLOCH()}\\.?$`, 'u'), replace: '' },
  // "Annoncer ton origine en utilisant 来自" → "Annoncer ton origine"
  { re: new RegExp(` en utilisant ${HANZI_BLOCH()}\\.?$`, 'u'), replace: '' },
  // "Utilise 来自 pour annoncer" → "Annoncer" (drop "Utilise X pour")
  { re: new RegExp(`^Utilise ${HANZI_BLOCH()} pour `, 'u'), replace: '' },
  // "Forme une phrase avec 来自" → "Forme une phrase"
  { re: new RegExp(` avec ${HANZI_BLOCH()}$`, 'u'), replace: '' }
];
const PATTERNS_EN: Array<{ re: RegExp; replace: string }> = [
  { re: new RegExp(` with ${HANZI_BLOCH()}\\.?$`, 'u'), replace: '' },
  { re: new RegExp(` using ${HANZI_BLOCH()}\\.?$`, 'u'), replace: '' },
  { re: new RegExp(`^Use ${HANZI_BLOCH()} to `, 'u'), replace: '' }
];

function HANZI_BLOCH() {
  return HANZI_BLOCK;
}

interface Patch {
  file: string;
  exerciseId: string;
  field: 'prompt' | 'promptEn';
  before: string;
  after: string;
  ruleMatched: number;
}

const patches: Patch[] = [];

function applyPatterns(
  text: string,
  patterns: Array<{ re: RegExp; replace: string }>
): { after: string; ruleIdx: number | null } {
  for (let i = 0; i < patterns.length; i++) {
    const { re, replace } = patterns[i];
    if (re.test(text)) {
      const after = text.replace(re, replace).trim();
      // Nettoie un point qui dépasse en fin
      const cleaned = after.replace(/\s+\./g, '.').replace(/\.$/, '.');
      return { after: cleaned.endsWith('.') ? cleaned : cleaned + '.', ruleIdx: i };
    }
  }
  return { after: text, ruleIdx: null };
}

for (const relativePath of FILES) {
  const fullPath = join(__dirname, relativePath);
  let source = readFileSync(fullPath, 'utf8');
  let modified = false;

  // On parcourt le source AST-naïvement : on cherche les blocs
  // `{ id: '...', ..., prompt: '...', ... }` via regex sur les littéraux.
  // Pour chaque bloc, on tente d'appliquer les patches.

  // Match les blocs d'objet { ... }, on prend leur contenu pour parser.
  const blockRe = /\{[^{}]*?\bid:\s*['"]([^'"]+)['"][^{}]*?\}/gs;
  let m: RegExpExecArray | null;
  const replacements: Array<{ start: number; end: number; replacement: string }> = [];

  while ((m = blockRe.exec(source)) !== null) {
    const blockText = m[0];
    const id = m[1];

    // Extrait prompt: '...' et promptEn: '...'
    const promptMatch = blockText.match(/\bprompt:\s*(['"])([^'"]*?)\1/);
    const promptEnMatch = blockText.match(/\bpromptEn:\s*(['"])([^'"]*?)\1/);

    let newBlock = blockText;
    let changed = false;

    if (promptMatch) {
      const original = promptMatch[2];
      const { after, ruleIdx } = applyPatterns(original, PATTERNS_FR);
      if (ruleIdx !== null && after !== original) {
        const newPromptLine = `prompt: ${promptMatch[1]}${after}${promptMatch[1]}`;
        newBlock = newBlock.replace(promptMatch[0], newPromptLine);
        patches.push({
          file: relativePath.replace('../', ''),
          exerciseId: id,
          field: 'prompt',
          before: original,
          after,
          ruleMatched: ruleIdx
        });
        changed = true;
      }
    }
    if (promptEnMatch) {
      const original = promptEnMatch[2];
      const { after, ruleIdx } = applyPatterns(original, PATTERNS_EN);
      if (ruleIdx !== null && after !== original) {
        const newPromptEnLine = `promptEn: ${promptEnMatch[1]}${after}${promptEnMatch[1]}`;
        newBlock = newBlock.replace(promptEnMatch[0], newPromptEnLine);
        patches.push({
          file: relativePath.replace('../', ''),
          exerciseId: id,
          field: 'promptEn',
          before: original,
          after,
          ruleMatched: ruleIdx
        });
        changed = true;
      }
    }

    if (changed) {
      replacements.push({ start: m.index, end: m.index + blockText.length, replacement: newBlock });
      modified = true;
    }
  }

  if (modified) {
    // Applique les remplacements de la fin vers le début pour ne pas
    // décaler les indexes.
    replacements.sort((a, b) => b.start - a.start);
    for (const r of replacements) {
      source = source.slice(0, r.start) + r.replacement + source.slice(r.end);
    }
    if (WRITE) {
      const ts = new Date().toISOString().replace(/[:.]/g, '-');
      copyFileSync(fullPath, `${fullPath}.bak.prompts.${ts}`);
      writeFileSync(fullPath, source, 'utf8');
    }
  }
}

const report = {
  generatedAt: new Date().toISOString(),
  mode: WRITE ? 'write' : 'dry-run',
  totalPatches: patches.length,
  patches
};
writeFileSync(REPORT_PATH, JSON.stringify(report, null, 2), 'utf8');

console.log(`Mode: ${WRITE ? 'WRITE' : 'DRY-RUN'}`);
console.log(`Total patches: ${patches.length}`);
console.log('');
console.log('=== Échantillon ===');
for (const p of patches.slice(0, 10)) {
  console.log(`\n[${p.file}] ${p.exerciseId} (${p.field}, rule ${p.ruleMatched})`);
  console.log(`  - ${p.before}`);
  console.log(`  + ${p.after}`);
}
console.log(`\nRapport: ${REPORT_PATH}`);
if (!WRITE) {
  console.log('\nPour appliquer: npx tsx scripts/fix-exercise-prompts.mts --write');
}
