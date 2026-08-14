/**
 * apply-choice-translations.mjs
 * -----------------------------
 * Renseigne `choicesEn` sur les exercices dont les propositions restaient en
 * français en interface anglaise.
 *
 * ## Origine
 *
 * `pick(ex.choices, ex.choicesEn)` retombe sur le français quand `choicesEn`
 * est vide. C'est le bon comportement pour les propositions en chinois, qui ne
 * se traduisent pas ; c'en est un mauvais pour 795 exercices dont les réponses
 * sont des phrases françaises — l'anglophone lisait une question en anglais
 * suivie de quatre réponses en français.
 *
 * ## Provenance des traductions
 *
 *   - `scripts/untranslated-choices.json` → `known` : 1 398 couples déjà
 *     présents ailleurs dans le corpus. Réutilisés tels quels, pour ne pas
 *     introduire une variante synonyme d'une formulation déjà retenue.
 *   - `scripts/batches/lot-N.out.json` : les 2 143 chaînes restantes.
 *
 * ## Alignement
 *
 * `choicesEn` doit avoir exactement la même longueur que `choices`, sans quoi
 * l'interface anglaise décale la bonne réponse. Les propositions qui n'ont pas
 * à être traduites — hanzi seul, pinyin, couples `汉字 — pinyin` — sont donc
 * recopiées à l'identique plutôt que laissées vides.
 *
 * ## Contrôles avant écriture
 *
 * Un exercice n'est modifié que si les quatre conditions sont réunies : chaque
 * proposition a une contrepartie, les longueurs concordent, les caractères han
 * de départ se retrouvent à l'arrivée, et le balisage `**gras**` est conservé.
 * Un seul manquement et l'exercice est laissé tel quel, signalé en fin de
 * rapport.
 *
 * Usage : node scripts/apply-choice-translations.mjs [--dry]
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DRY = process.argv.includes('--dry');

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

const extract = JSON.parse(fs.readFileSync(path.join(ROOT, 'scripts/untranslated-choices.json'), 'utf8'));

// ── Dictionnaire complet ────────────────────────────────────────────────────
const dict = new Map(Object.entries(extract.known));
let fromBatches = 0;
for (const f of fs.readdirSync(path.join(ROOT, 'scripts/batches')).filter(n => n.endsWith('.out.json'))) {
  const part = JSON.parse(fs.readFileSync(path.join(ROOT, 'scripts/batches', f), 'utf8'));
  for (const [fr, en] of Object.entries(part)) {
    if (typeof en !== 'string' || !en.trim()) continue;
    dict.set(fr, en.trim());
    fromBatches++;
  }
}
console.log(`dictionnaire : ${dict.size} entrées (${extract.known ? Object.keys(extract.known).length : 0} déjà en place + ${fromBatches} traduites)`);

// Les règles de classement doivent être les mêmes qu'à l'extraction.
const FRENCH_ONLY = /[âçêëîïôûœæ]/i;
const PINYIN_ONLY = /[āēīōūǎěǐǒǔǖǘǚǜńňǹ]/;
const FRENCH_MARKERS = /\b(le|la|les|un|une|des|du|de|au|aux|et|ou|est|sont|ce|cette|ces|qui|que|quoi|pour|avec|sans|dans|sur|plus|moins|très|tout|tous|toute|pas|ne|on|il|elle|nous|vous|ils|elles|son|sa|ses|leur|mon|ma|mes|ton|ta|tes|par|en|se|si|mais|donc|car|quand|comme|aussi|même|entre|vers|chez|après|avant|depuis|jusqu|faire|dire|aller|voir|avoir|être|peut|doit|faut|oral|écrit|formel|familier|sens|verbe|nom|action|état)\b/i;
const HANZI_PINYIN = /^[一-鿿…\s]+[—–-]\s*[a-zāáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜüńňǹ\s'·]+$/i;

function needsTranslation(choice) {
  const s = String(choice ?? '').trim();
  if (!s) return false;
  if (HANZI_PINYIN.test(s)) return false;
  const latin = s.replace(/[一-鿿]/g, ' ').trim();
  if (!latin || !/[a-zA-ZÀ-ÿ]{3,}/.test(latin)) return false;
  if (FRENCH_ONLY.test(latin) || FRENCH_MARKERS.test(latin)) return true;
  if (PINYIN_ONLY.test(latin)) return false;
  return /[a-zA-ZÀ-ÿ]{4,}/.test(latin);
}

const han = s => (String(s).match(/[一-鿿]/g) ?? []).join('');
const bold = s => (String(s).match(/\*\*/g) ?? []).length;

// ── Application ─────────────────────────────────────────────────────────────
let done = 0, skipped = 0;
const missing = new Set();
const rejected = [];

for (const list of Object.values(EXERCISES)) {
  for (const e of list) {
    if (e.choicesEn?.length) continue;
    if (!e.choices.some(needsTranslation)) continue;

    const out = [];
    const problems = [];
    for (const raw of e.choices) {
      const fr = String(raw).trim();
      if (!needsTranslation(fr)) { out.push(raw); continue; }
      const en = dict.get(fr);
      if (!en) { missing.add(fr); problems.push(`sans traduction : « ${fr} »`); out.push(raw); continue; }
      // Le chinois doit traverser la traduction intact : un caractère perdu,
      // et la proposition ne veut plus rien dire.
      if (han(fr) !== han(en)) problems.push(`hanzi altéré : « ${fr} » → « ${en} »`);
      if (bold(fr) !== bold(en)) problems.push(`balisage gras altéré : « ${fr} »`);
      out.push(en);
    }

    if (problems.length) { rejected.push({ id: e.id, problems }); skipped++; continue; }
    if (out.length !== e.choices.length) { skipped++; continue; }
    e.choicesEn = out;
    done++;
  }
}

console.log(`exercices complétés : ${done} · laissés en l'état : ${skipped}`);
if (missing.size) {
  console.log(`\n${missing.size} chaîne(s) sans traduction :`);
  for (const m of [...missing].slice(0, 15)) console.log(`  ${m}`);
}
if (rejected.length) {
  console.log(`\n${rejected.length} exercice(s) écartés :`);
  for (const r of rejected.slice(0, 10)) console.log(`  ${r.id} — ${r.problems[0]}`);
}
if (DRY) { console.log('\n(--dry : fichier non modifié)'); process.exit(rejected.length ? 1 : 0); }

// ── Réécriture ──────────────────────────────────────────────────────────────
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
console.log('\nréécrit : data/cecrExercises.ts');
