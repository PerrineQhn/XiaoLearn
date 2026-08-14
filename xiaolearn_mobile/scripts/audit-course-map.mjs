/**
 * audit-course-map.mjs
 * --------------------
 * Vérifie que le plan de cours affiché couvre bien tout le contenu écrit.
 *
 * L'écran Cours construit son arborescence depuis `CECR_LEVELS[].modules`
 * (`cecrLevelsMeta.ts`), et non depuis `LESSON_DATA`. Un module absent du plan
 * rend donc ses leçons inatteignables — sans erreur, sans page blanche, sans
 * rien qui le signale. 11 modules et 47 leçons étaient dans ce cas, et le
 * compteur de progression, qui divise par le total écrit, plafonnait à 88 %.
 *
 * Usage : node scripts/audit-course-map.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

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
const LESSONS = (await import('data:text/javascript;base64,' + Buffer.from(
  `export default ${literal('data/cecrLessons.ts', 'LESSON_DATA')};`).toString('base64'))).default;

// On lit les modules du plan par leur position : le fichier déclare aussi les
// niveaux avec la même forme `id:'…'`, mais eux seuls portent un `label:`.
const meta = fs.readFileSync(path.join(ROOT, 'data/cecrLevelsMeta.ts'), 'utf8');
const planned = [...meta.matchAll(/\{\s*id:\s*'([^']+)',\s*name:/g)].map(m => m[1]);

const written = Object.keys(LESSONS);
const plannedSet = new Set(planned);
const orphans = written.filter(m => !plannedSet.has(m));
const empties = planned.filter(m => !LESSONS[m]);

const totalLessons = written.reduce((n, m) => n + LESSONS[m].length, 0);
const reachable = written.filter(m => plannedSet.has(m)).reduce((n, m) => n + LESSONS[m].length, 0);

console.log(`modules écrits : ${written.length} · modules au plan : ${planned.length}`);
console.log(`leçons : ${reachable}/${totalLessons} atteignables (${(reachable / totalLessons * 100).toFixed(1)} %)`);

let bad = false;
if (orphans.length) {
  bad = true;
  console.log(`\n❌ ${orphans.length} module(s) écrit(s) mais absent(s) du plan :`);
  for (const m of orphans) console.log(`  ${m} — ${LESSONS[m].length} leçons perdues`);
}
if (empties.length) {
  bad = true;
  console.log(`\n❌ ${empties.length} module(s) au plan sans aucune leçon (rendus « 0 leçon ») :`);
  for (const m of empties) console.log(`  ${m}`);
}
if (bad) process.exit(1);
console.log('\n✅ plan et contenu concordent, tout le cours est atteignable');
