/**
 * audit-audio-refs.mjs
 * --------------------
 * Vérifie que chaque `audioHanzi` des exercices correspond à un fichier réel.
 *
 * `playHanzi` retombe sur la synthèse vocale du téléphone quand rien n'est
 * trouvé : un audio manquant ne casse donc pas l'écran, mais on perd la voix
 * neuronale au profit d'une prononciation approximative — et surtout, on ne
 * s'en aperçoit jamais depuis le code. D'où ce contrôle.
 *
 * La résolution reproduit `hooks/useAudio.ts` : hash FNV-1a des phrases,
 * chemins hsk1-7, hors-hsk, grammaire.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const PUBLIC = path.resolve(ROOT, '../xiaolearn_app/public');

function literal(file, name) {
  const src = fs.readFileSync(path.join(ROOT, file), 'utf8');
  const start = src.indexOf('{', src.indexOf('= {', src.indexOf(name)));
  let d = 0, i = start, q = null, esc = false;
  for (; i < src.length; i++) {
    const c = src[i];
    if (esc) { esc = false; continue; }
    if (c === '\\') { esc = true; continue; }
    if (q) { if (c === q) q = null; continue; }
    if (c === '"' || c === "'" || c === '`') { q = c; continue; }
    if (c === '{' || c === '[') d++;
    else if (c === '}' || c === ']') { d--; if (!d) { i++; break; } }
  }
  return src.slice(start, i);
}
const EXERCISES = (await import('data:text/javascript;base64,' + Buffer.from(
  `export default ${literal('data/cecrExercises.ts', 'EXERCISES')};`).toString('base64'))).default;

const hash = s => {
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 0x01000193); }
  return (h >>> 0).toString(36);
};
const exists = rel => ['', ''].some(() => false) ||
  fs.existsSync(path.join(PUBLIC, rel));

function resolves(hanzi) {
  const clean = hanzi.replace(/\d+$/, '').trim();
  const tries = [];
  if (clean.length >= 2) tries.push(`audio/examples/${hash(clean)}.mp3`, `audio/examples/${hash(clean)}.wav`);
  tries.push(`audio/grammar/${clean}.mp3`);
  for (let n = 1; n <= 7; n++) tries.push(`audio/hsk${n}/hsk${n}_${clean}.wav`, `audio/hsk${n}/hsk${n}_${clean}.mp3`);
  tries.push(`audio/hors-hsk/hors-hsk_${clean}.mp3`, `audio/hors-hsk/hors-hsk_${clean}.wav`);
  return tries.some(exists);
}

if (!fs.existsSync(PUBLIC)) {
  console.log('dossier public/ du web introuvable — contrôle ignoré');
  process.exit(0);
}

const refs = new Map();
for (const [lessonId, list] of Object.entries(EXERCISES))
  for (const e of list) if (e.audioHanzi) {
    if (!refs.has(e.audioHanzi)) refs.set(e.audioHanzi, []);
    refs.get(e.audioHanzi).push(`${lessonId}/${e.id}`);
  }

const missing = [...refs.keys()].filter(h => !resolves(h));
console.log(`références audio distinctes : ${refs.size}`);
console.log(`sans fichier : ${missing.length}`);
if (missing.length) {
  console.log(missing.slice(0, 30).map(h => `  ${h} → ${refs.get(h)[0]}`).join('\n'));
  process.exitCode = 1;
} else {
  console.log('✅ toutes les références audio se résolvent sur un fichier existant');
}
