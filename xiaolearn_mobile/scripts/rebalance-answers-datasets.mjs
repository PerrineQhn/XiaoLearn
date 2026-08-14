/**
 * rebalance-answers-datasets.mjs
 * ------------------------------
 * Rééquilibre la position de la bonne réponse dans les trois jeux de données
 * que `rebalance-answers.mjs` ne couvrait pas : lectures, bilans, grammaire.
 *
 * ## Le défaut mesuré
 *
 *   lectures   81 q.  A  0,0 %  ·  B 60,5 %  ·  C 37,0 %  ·  D 2,5 %
 *   bilans    154 q.  A 45,5 %  ·  B 42,2 %  ·  C 11,0 %  ·  D 1,3 %
 *   grammaire  74 q.  A 36,5 %  ·  B 47,3 %  ·  C 13,5 %  ·  D 2,7 %
 *
 * Sur les lectures, la bonne réponse n'est **jamais** en première position :
 * cocher systématiquement la deuxième donne 60 % sans lire le texte. Sur les
 * bilans — ceux qui valident un niveau — A ou B couvre 88 % des cas.
 *
 * ## Pourquoi une chirurgie de texte plutôt qu'une réécriture
 *
 * `cecrExercises.ts` est un littéral pur : on pouvait le reconstruire en
 * entier. Ces trois fichiers ne s'y prêtent pas — `cecrLectures.ts` passe par
 * un constructeur `lq(...)`, `grammarLessons.ts` mêle quiz et prose, et
 * `cecrBilans.ts` embarque des fonctions. Les réécrire perdrait ce code.
 *
 * On échange donc, sur place, deux éléments du tableau de choix et la valeur
 * de l'index. Un échange plutôt qu'un mélange complet : l'ordre voulu des
 * distracteurs est préservé et le diff reste lisible.
 *
 * ## Le garde-fou qui rend l'opération sûre
 *
 * Après écriture, le script relit chaque fichier et vérifie, question par
 * question, que **l'ensemble des choix est inchangé** et que **le texte de la
 * bonne réponse est le même qu'avant**. Seules les positions ont bougé. Si un
 * seul écart apparaît, le fichier est restauré et le script sort en erreur.
 *
 * Aucune des trois sources ne désigne une option par sa lettre — vérifié : les
 * trois occurrences de « A » / « B » dans `grammarLessons.ts` parlent de
 * causalité (« A déclenche toujours B »), pas de propositions.
 *
 * Usage : node scripts/rebalance-answers-datasets.mjs [--dry]
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DRY = process.argv.includes('--dry');

/**
 * Descripteurs des trois formats.
 *
 * `open` repère le début du tableau de choix ; `index` la clé qui porte la
 * bonne réponse, cherchée juste après la fermeture du tableau.
 */
const TARGETS = [
  {
    file: 'data/cecrLectures.ts',
    label: 'lectures',
    // lq('id', 'énoncé', [ … ], 2, 'explication')
    open: /lq\(\s*'(?:[^'\\]|\\.)*'\s*,\s*(?:'(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*")\s*,\s*\[/g,
    index: /^\s*,\s*(\d+)/,
  },
  {
    file: 'data/cecrBilans.ts',
    label: 'bilans',
    open: /"choices"\s*:\s*\[/g,
    index: /^\s*,?\s*"correctIndex"\s*:\s*(\d+)/,
  },
  {
    file: 'data/grammarLessons.ts',
    label: 'grammaire',
    open: /\bchoices\s*:\s*\[/g,
    index: /^\s*,\s*correctChoiceIndex\s*:\s*(\d+)/,
  },
];

/** Fin du tableau ouvert en `from` (index du `]`), en ignorant les chaînes. */
function closeBracket(src, from) {
  let depth = 0, q = null, esc = false;
  for (let i = from; i < src.length; i++) {
    const c = src[i];
    if (esc) { esc = false; continue; }
    if (c === '\\') { esc = true; continue; }
    if (q) { if (c === q) q = null; continue; }
    if (c === '"' || c === "'" || c === '`') { q = c; continue; }
    if (c === '[') depth++;
    else if (c === ']') { depth--; if (!depth) return i; }
  }
  return -1;
}

/** Découpe le contenu d'un tableau en éléments, virgules de premier niveau. */
function splitItems(inner) {
  const items = [];
  let depth = 0, q = null, esc = false, start = 0;
  for (let i = 0; i < inner.length; i++) {
    const c = inner[i];
    if (esc) { esc = false; continue; }
    if (c === '\\') { esc = true; continue; }
    if (q) { if (c === q) q = null; continue; }
    if (c === '"' || c === "'" || c === '`') { q = c; continue; }
    if (c === '[' || c === '{' || c === '(') depth++;
    else if (c === ']' || c === '}' || c === ')') depth--;
    else if (c === ',' && depth === 0) { items.push(inner.slice(start, i)); start = i + 1; }
  }
  items.push(inner.slice(start));
  return items;
}

/** Valeur d'un élément, pour comparer avant/après sans le formatage. */
const value = s => s.trim().replace(/,$/, '');

let failed = false;

for (const t of TARGETS) {
  const file = path.join(ROOT, t.file);
  const original = fs.readFileSync(file, 'utf8');
  let src = original;

  // ── Repérage ──────────────────────────────────────────────────────────────
  const sites = [];
  t.open.lastIndex = 0;
  let m;
  while ((m = t.open.exec(src)) !== null) {
    const openAt = src.indexOf('[', m.index + m[0].length - 1);
    const closeAt = closeBracket(src, openAt);
    if (closeAt < 0) continue;
    const after = src.slice(closeAt + 1, closeAt + 80);
    const im = after.match(t.index);
    if (!im) continue;
    const items = splitItems(src.slice(openAt + 1, closeAt));
    if (items.length < 2) continue;
    sites.push({
      openAt, closeAt, items,
      correct: Number(im[1]),
      idxStart: closeAt + 1 + after.indexOf(im[1], im[0].length - im[1].length - 1),
      idxLen: im[1].length,
    });
  }

  const before = [0, 0, 0, 0, 0, 0];
  for (const s of sites) before[s.correct]++;

  // ── Cibles : chaque position à tour de rôle, par taille de QCM ────────────
  const cursor = {};
  let moved = 0;
  const edits = [];
  for (const s of sites) {
    const n = s.items.length;
    if (s.correct < 0 || s.correct >= n) continue;
    cursor[n] = (cursor[n] ?? 0) + 1;
    const want = cursor[n] % n;
    if (want === s.correct) continue;

    const items = [...s.items];
    // On échange le texte des deux éléments, en gardant l'indentation de
    // chacun : sans cela, une liste multi-ligne perdrait son alignement.
    const a = items[s.correct], b = items[want];
    const keep = x => x.match(/^\s*/)[0];
    items[s.correct] = keep(a) + value(b);
    items[want] = keep(b) + value(a);

    edits.push({ start: s.openAt + 1, end: s.closeAt, text: items.join(',') });
    edits.push({ start: s.idxStart, end: s.idxStart + s.idxLen, text: String(want) });
    moved++;
  }

  // Application de la fin vers le début : les décalages ne se propagent pas.
  edits.sort((x, y) => y.start - x.start);
  for (const e of edits) src = src.slice(0, e.start) + e.text + src.slice(e.end);

  // ── Contrôle ──────────────────────────────────────────────────────────────
  const check = [];
  t.open.lastIndex = 0;
  let m2;
  while ((m2 = t.open.exec(src)) !== null) {
    const openAt = src.indexOf('[', m2.index + m2[0].length - 1);
    const closeAt = closeBracket(src, openAt);
    if (closeAt < 0) continue;
    const after = src.slice(closeAt + 1, closeAt + 80);
    const im = after.match(t.index);
    if (!im) continue;
    const items = splitItems(src.slice(openAt + 1, closeAt));
    if (items.length < 2) continue;
    check.push({ items, correct: Number(im[1]) });
  }

  const problems = [];
  if (check.length !== sites.length) {
    problems.push(`nombre de questions relues : ${check.length} au lieu de ${sites.length}`);
  } else {
    for (let i = 0; i < sites.length; i++) {
      const a = sites[i], b = check[i];
      const setA = a.items.map(value).sort().join('|');
      const setB = b.items.map(value).sort().join('|');
      if (setA !== setB) { problems.push(`question ${i + 1} : l'ensemble des choix a changé`); continue; }
      if (value(a.items[a.correct]) !== value(b.items[b.correct]))
        problems.push(`question ${i + 1} : la bonne réponse n'est plus la même`);
    }
  }

  const after = [0, 0, 0, 0, 0, 0];
  for (const s of check) after[s.correct]++;
  const pct = arr => arr.slice(0, 4)
    .map((v, i) => `${'ABCD'[i]} ${(v / check.length * 100).toFixed(1)} %`).join(' · ');

  console.log(`\n── ${t.label} (${sites.length} questions, ${moved} déplacées)`);
  console.log(`   avant : ${pct(before)}`);
  console.log(`   après : ${pct(after)}`);

  if (problems.length) {
    failed = true;
    console.error(`   ❌ ${problems.length} anomalie(s) — fichier NON modifié :`);
    for (const p of problems.slice(0, 5)) console.error(`      ${p}`);
    continue;
  }
  if (DRY) { console.log('   (--dry : fichier non modifié)'); continue; }
  fs.writeFileSync(file, src);
  console.log(`   ✅ ${t.file} réécrit`);
}

if (failed) process.exit(1);
