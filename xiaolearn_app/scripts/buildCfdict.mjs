/**
 * Extracts a compact JSON dictionary from CFDICT XML.
 * Output: { "simplified": "first French translation", ... }
 * Used by CPlayer for word-level translations.
 */
import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const CFDICT_PATH = resolve(__dirname, '../../xiaolearn_dictionnary/data/cfdict.xml');
const OUTPUT_PATH = resolve(__dirname, '../src/data/cfdict-compact.json');

const xml = readFileSync(CFDICT_PATH, 'utf-8');

const dict = {};
// Match each <word> block
const wordRegex = /<word>([\s\S]*?)<\/word>/g;
let match;
let count = 0;

while ((match = wordRegex.exec(xml)) !== null) {
  const block = match[1];

  const simpMatch = block.match(/<simp>(.*?)<\/simp>/);
  const frMatches = [...block.matchAll(/<fr><!\[CDATA\[(.*?)\]\]><\/fr>/g)];

  if (!simpMatch || !frMatches.length) continue;

  const simp = simpMatch[1].trim();
  // Take the first (most common) French translation
  const fr = frMatches[0][1].trim();

  if (!simp || !fr) continue;

  // Only keep the first translation for each simplified entry (keeps file small)
  if (!dict[simp]) {
    dict[simp] = fr;
    count++;
  }
}

writeFileSync(OUTPUT_PATH, JSON.stringify(dict, null, 0), 'utf-8');

const sizeKB = (Buffer.byteLength(JSON.stringify(dict)) / 1024).toFixed(0);
console.log(`✅ Extracted ${count} entries → ${OUTPUT_PATH} (${sizeKB} KB)`);
