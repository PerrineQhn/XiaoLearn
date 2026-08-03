/**
 * rebalance-answers.mjs
 * ---------------------
 * Rééquilibre la position de la bonne réponse dans les QCM.
 *
 * ## Le défaut
 *
 * Sur les 3 024 exercices rédigés à la main, la bonne réponse était en A dans
 * **61,8 %** des cas (B 19,8 · C 10,4 · D 7,9). Un apprenant qui coche
 * systématiquement A obtient donc 62 % sans lire une seule question, et la
 * leçon valide sa progression. Ce n'est pas un détail cosmétique : le score
 * cesse de mesurer ce qu'il prétend mesurer, et l'habitude s'installe.
 *
 * Le biais est un réflexe d'écriture — on tape la bonne réponse d'abord, puis
 * on cherche des distracteurs — et il n'apparaît que sur un décompte global.
 *
 * ## Ce que le script ne touche pas
 *
 * Permuter des options n'est anodin que si leur ordre ne porte pas de sens.
 * Trois familles sont donc exclues :
 *
 *   - `order` : les options SONT la phrase à reconstituer ;
 *   - les listes ordonnées — « Ton 1 », « Ton 2 »… ou toute suite de chiffres
 *     croissants. Les mélanger rendrait la question plus dure sans rien
 *     apprendre ;
 *   - les énoncés qui désignent une option par sa lettre (« l'option B… »).
 *
 * ## La méthode
 *
 * Un simple échange entre la position actuelle et la position visée, pas un
 * mélange complet : l'ordre voulu des distracteurs est préservé, et le diff
 * reste lisible. Les positions visées sont distribuées à tour de rôle, par
 * taille de QCM, sur les exercices classés par identifiant — donc de façon
 * reproductible.
 *
 * Usage : node scripts/rebalance-answers.mjs [--dry]
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DRY = process.argv.includes('--dry');

function literal(file, name) {
  const src = fs.readFileSync(path.join(ROOT, file), 'utf8');
  const start = src.indexOf('{', src.indexOf('= {', src.indexOf(name)));
  let depth = 0, i = start, quote = null, esc = false;
  for (; i < src.length; i++) {
    const ch = src[i];
    if (esc) { esc = false; continue; }
    if (ch === '\\') { esc = true; continue; }
    if (quote) { if (ch === quote) quote = null; continue; }
    if (ch === '"' || ch === "'" || ch === '`') { quote = ch; continue; }
    if (ch === '{' || ch === '[') depth++;
    else if (ch === '}' || ch === ']') { depth--; if (!depth) { i++; break; } }
  }
  return src.slice(start, i);
}
const EXERCISES = (await import('data:text/javascript;base64,' + Buffer.from(
  `export default ${literal('data/cecrExercises.ts', 'EXERCISES')};`).toString('base64'))).default;

/** L'énoncé ou la correction désigne-t-elle une option par sa lettre ? */
const LETTER_REF = new RegExp([
  '\\b(?:option|réponse|answer|choix)\\s+[A-D]\\b',
  '\\b[A-D]\\)',
  // Renvois par rang plutôt que par lettre : « la deuxième proposition »,
  // « les deux premières », « the last option ». Rares mais réels, et une
  // permutation les rendrait faux sans que rien ne le signale.
  '(?:premi[eè]re?s?|deuxi[eè]me|troisi[eè]me|quatri[eè]me|derni[eè]re?s?)\\s+(?:option|réponse|proposition|choix)',
  'les\\s+(?:deux|trois)\\s+(?:premi[eè]res|derni[eè]res)',
  '(?:first|second|third|last)\\s+(?:option|answer|choice)',
].join('|'), 'i');

/** Les options forment-elles une suite ordonnée qu'il ne faut pas casser ? */
function ordered(choices) {
  const nums = choices.map(c => {
    const m = String(c).match(/\d+/);
    return m ? Number(m[0]) : null;
  });
  if (nums.some(n => n === null)) return false;
  for (let i = 1; i < nums.length; i++) if (nums[i] <= nums[i - 1]) return false;
  return true;
}

const eligible = [];
const skipped = { order: 0, ordered: 0, letters: 0, short: 0 };

for (const [lessonId, list] of Object.entries(EXERCISES)) {
  for (const e of list) {
    if (e.type === 'order') { skipped.order++; continue; }
    if (!Array.isArray(e.choices) || e.choices.length < 2) { skipped.short++; continue; }
    if (LETTER_REF.test([e.prompt, e.promptEn, e.explanation, e.explanationEn].join(' '))) {
      skipped.letters++; continue;
    }
    if (ordered(e.choices)) { skipped.ordered++; continue; }
    eligible.push({ lessonId, e });
  }
}

// Distribution des cibles, par taille de QCM et par ordre d'identifiant.
eligible.sort((a, b) => a.e.id.localeCompare(b.e.id));
const cursor = {};
let moved = 0;
for (const { e } of eligible) {
  const n = e.choices.length;
  cursor[n] = (cursor[n] ?? 0) + 1;
  const want = cursor[n] % n;
  const at = e.correctIndex;
  if (want === at) continue;

  [e.choices[at], e.choices[want]] = [e.choices[want], e.choices[at]];
  if (Array.isArray(e.choicesEn) && e.choicesEn.length === n)
    [e.choicesEn[at], e.choicesEn[want]] = [e.choicesEn[want], e.choicesEn[at]];
  e.correctIndex = want;
  moved++;
}

// ─── Contrôle ────────────────────────────────────────────────────────────────
const pos = [0, 0, 0, 0, 0, 0];
let counted = 0;
for (const list of Object.values(EXERCISES))
  for (const e of list) {
    if (e.type === 'order') continue;
    pos[e.correctIndex]++; counted++;
  }
console.log('exercices déplacés :', moved, '/', eligible.length, 'éligibles');
console.log('exclus :', JSON.stringify(skipped));
console.log('position de la bonne réponse :', pos.slice(0, 4)
  .map((v, i) => `${'ABCD'[i]} ${(v / counted * 100).toFixed(1)} %`).join(' · '));

if (DRY) { console.log('(--dry : fichier non modifié)'); process.exit(0); }

// ─── Réécriture ──────────────────────────────────────────────────────────────
const FIELDS = ['id', 'type', 'prompt', 'promptEn', 'choices', 'choicesEn', 'correctIndex',
  'sentence', 'sentenceFr', 'sentenceEn', 'explanation', 'explanationEn',
  'context', 'contextEn', 'audioHanzi', 'dialogue', 'steps'];
const s = v => JSON.stringify(v);
const ser = (e, pad) => {
  const keys = [...FIELDS.filter(k => e[k] !== undefined), ...Object.keys(e).filter(k => !FIELDS.includes(k))];
  return `${pad}{\n${keys.map(k => `${pad}  ${k}: ${s(e[k])},`).join('\n')}\n${pad}}`;
};
const body = Object.entries(EXERCISES)
  .map(([id, list]) => `  ${s(id)}: [\n${list.map(e => ser(e, '    ')).join(',\n')}\n  ]`)
  .join(',\n');
const file = path.join(ROOT, 'data/cecrExercises.ts');
const src = fs.readFileSync(file, 'utf8');
fs.writeFileSync(file, `${src.slice(0, src.indexOf('export const EXERCISES'))}export const EXERCISES: Record<string, Exercise[]> = {\n${body},\n};\n`);
console.log('réécrit : data/cecrExercises.ts');
