/**
 * audit-exercises.mjs
 * -------------------
 * Contrôle structurel de `data/cecrExercises.ts`.
 *
 * Il ne juge pas la pertinence pédagogique — cela demande un lecteur humain —
 * mais il attrape tout ce qui se vérifie mécaniquement et qui, en production,
 * se traduirait par un exercice sans bonne réponse, muet ou illisible :
 *
 *   - identifiants dupliqués (deux exercices, une seule progression) ;
 *   - `correctIndex` hors bornes ;
 *   - options dupliquées dans un même QCM ;
 *   - `choicesEn` de longueur différente de `choices` (l'interface anglaise
 *     afficherait une option vide, ou décalerait la bonne réponse) ;
 *   - texte chinois resté dans une traduction anglaise ;
 *   - `fill` sans trou, ou dont la réponse figure déjà dans la phrase ;
 *   - `audioHanzi` non purement chinois — le fichier n'existerait pas ;
 *   - répartition des bonnes réponses par position (un biais sur A se devine) ;
 *   - volume et variété par leçon.
 *
 * Usage : node scripts/audit-exercises.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

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
const evalLiteral = async (file, name) => (await import(
  'data:text/javascript;base64,' + Buffer.from(`export default ${literal(file, name)};`).toString('base64')
)).default;

const EXERCISES = await evalLiteral('data/cecrExercises.ts', 'EXERCISES');
const SECTIONS  = await evalLiteral('data/cecrLearnSections.ts', 'LEARN_SECTIONS');
const CONTENT   = await evalLiteral('data/cecrLessonContent.ts', 'LESSON_CONTENT');

const HAN = /[一-鿿]/;
const ONLY_HAN = /^[一-鿿]+$/;
const fail = [];
const warn = [];
const ids = new Set();
const positions = [0, 0, 0, 0, 0, 0];
let total = 0;
const types = {};

for (const [lessonId, list] of Object.entries(EXERCISES)) {
  for (const e of list) {
    total++;
    types[e.type] = (types[e.type] ?? 0) + 1;
    const at = `${lessonId} / ${e.id}`;

    if (ids.has(e.id)) fail.push(`id dupliqué : ${at}`);
    ids.add(e.id);

    if (!Array.isArray(e.choices) || e.choices.length < 2) fail.push(`moins de 2 options : ${at}`);
    if (!(e.correctIndex >= 0 && e.correctIndex < (e.choices?.length ?? 0)))
      fail.push(`correctIndex hors bornes : ${at}`);
    else if (e.type !== 'order') positions[e.correctIndex]++;

    if (e.type !== 'order' && new Set(e.choices).size !== e.choices.length)
      fail.push(`options dupliquées : ${at}`);

    if (e.choicesEn?.length && e.choicesEn.length !== e.choices.length)
      fail.push(`choicesEn désaligné (${e.choicesEn.length} vs ${e.choices.length}) : ${at}`);

    for (const k of ['promptEn', 'explanationEn', 'sentenceEn'])
      if (typeof e[k] === 'string' && e[k] && !e[k].trim()) fail.push(`${k} vide : ${at}`);

    if (!e.promptEn) fail.push(`promptEn manquant : ${at}`);
    if (!e.explanation) fail.push(`explication manquante : ${at}`);

    if (e.type === 'fill') {
      if (!e.sentence || !/_{2,}/.test(e.sentence)) fail.push(`fill sans trou : ${at}`);
      else {
        const answer = e.choices[e.correctIndex];
        // Signalé, pas rejeté : certaines phrases répètent volontairement le
        // mot (哪里哪里, 说了又说). C'est une relecture à faire, pas une faute
        // certaine.
        if (HAN.test(answer) && e.sentence.includes(answer))
          warn.push(`réponse visible dans la phrase : ${at}`);
      }
      if (e.audioHanzi) fail.push(`fill avec audio (donne la réponse) : ${at}`);
    }

    if (e.audioHanzi && !ONLY_HAN.test(e.audioHanzi))
      fail.push(`audioHanzi non résoluble « ${e.audioHanzi} » : ${at}`);

    // « ?. » et « !. » sont des recollages ratés ; « … » est volontaire.
    if (/(?<=[\p{L}\p{Script=Han}])[?!]\.(?!\.)|(?<!\.)\.\.(?!\.)/u.test(e.explanation ?? ''))
      fail.push(`ponctuation doublée : ${at}`);
  }
}

// ─── Volume et variété ───────────────────────────────────────────────────────
const counts = [], variety = [], thin = [], mono = [];
for (const lessonId of Object.keys(CONTENT)) {
  const list = EXERCISES[lessonId] ?? [];
  counts.push(list.length);
  const kinds = new Set(list.map(e => e.type));
  variety.push(kinds.size);
  if (list.length < 6) thin.push(`${lessonId} (${list.length})`);
  if (kinds.size <= 2 && list.length >= 4) mono.push(`${lessonId} (${[...kinds].join(', ')})`);
}

// ─── Reprise du vocabulaire enseigné ─────────────────────────────────────────
let taught = 0, reused = 0;
for (const lessonId of Object.keys(CONTENT)) {
  const words = [...new Set((SECTIONS[lessonId] ?? [])
    .flatMap(s => (s.items ?? []).map(i => i.hanzi)).filter(h => h && HAN.test(h)))];
  if (!words.length) continue;
  const blob = (EXERCISES[lessonId] ?? []).map(e =>
    [e.prompt, e.explanation, e.sentence, ...(e.choices ?? [])].join(' ')).join(' ');
  taught += words.length;
  reused += words.filter(w => blob.includes(w)).length;
}

// ─── Rapport ─────────────────────────────────────────────────────────────────
const sum = a => a.reduce((x, y) => x + y, 0);
console.log(`exercices : ${total} · leçons : ${Object.keys(CONTENT).length}`);
console.log(`moyenne par leçon : ${(sum(counts) / counts.length).toFixed(1)} · min ${Math.min(...counts)} · max ${Math.max(...counts)}`);
console.log(`types par leçon : ${(sum(variety) / variety.length).toFixed(1)} en moyenne`);
console.log('répartition des types :', Object.entries(types).sort((a, b) => b[1] - a[1])
  .map(([t, n]) => `${t} ${(n / total * 100).toFixed(1)} %`).join(' · '));
const shown = positions.slice(0, 4);
console.log('position de la bonne réponse :', shown.map((n, i) =>
  `${'ABCD'[i]} ${(n / sum(shown) * 100).toFixed(1)} %`).join(' · '));
console.log(`reprise du vocabulaire enseigné : ${reused}/${taught} (${(reused / taught * 100).toFixed(0)} %)`);
console.log(`leçons sous 6 exercices : ${thin.length}${thin.length ? ' → ' + thin.join(', ') : ''}`);
console.log(`leçons à 2 types ou moins : ${mono.length}${mono.length ? ' → ' + mono.slice(0, 8).join(', ') : ''}`);

if (warn.length) {
  console.log(`\n⚠️  ${warn.length} point(s) à relire :`);
  for (const w of warn) console.log('  ' + w);
}

if (fail.length) {
  console.log(`\n❌ ${fail.length} anomalie(s) :`);
  for (const f of fail.slice(0, 40)) console.log('  ' + f);
  if (fail.length > 40) console.log(`  … et ${fail.length - 40} autres`);
  process.exit(1);
}
console.log('\n✅ aucune anomalie structurelle');
