/**
 * audit-lesson-examples-duplicates.mts
 *
 * Scanne tous les fichiers src/data/*.ts qui exportent des leçons V2
 * (objets avec `examples: LessonV2Example[]`), exécute le TS en runtime
 * via tsx, et détecte les doublons par `hanzi` dans chaque liste examples.
 *
 * Output : scripts/lesson-duplicates-report.json
 *
 * Usage :
 *   npx tsx scripts/audit-lesson-examples-duplicates.mts
 */

import { readdirSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_DIR = join(__dirname, '..', 'src', 'data');
const REPORT = join(__dirname, 'lesson-duplicates-report.json');

interface MaybeLesson {
  id?: string;
  title?: string;
  examples?: Array<{ hanzi?: string; pinyin?: string; translation?: string }>;
}

const out: Array<{
  file: string;
  exportName: string;
  lessonId?: string;
  lessonTitle?: string;
  duplicates: Array<{ hanzi: string; count: number; indexes: number[] }>;
  totalExamples: number;
}> = [];

const files = readdirSync(DATA_DIR).filter((f) => f.endsWith('.ts') && !f.endsWith('.d.ts'));

for (const file of files) {
  const fullPath = join(DATA_DIR, file);
  let mod: any;
  try {
    mod = await import(fullPath);
  } catch (err: any) {
    console.warn(`[skip] ${file}: ${err.message?.split('\n')[0] ?? err}`);
    continue;
  }

  for (const [name, val] of Object.entries(mod)) {
    visit(val, name, file);
  }
}

function visit(val: any, exportName: string, file: string, depth = 0) {
  if (depth > 4) return;
  if (val == null) return;
  if (Array.isArray(val)) {
    val.forEach((item, i) => visit(item, `${exportName}[${i}]`, file, depth + 1));
    return;
  }
  if (typeof val !== 'object') return;

  const v = val as MaybeLesson;
  if (Array.isArray(v.examples) && v.examples.length > 0 && v.examples[0]?.hanzi !== undefined) {
    const counts = new Map<string, number[]>();
    v.examples.forEach((ex, i) => {
      const key = (ex.hanzi ?? '').trim();
      if (!key) return;
      if (!counts.has(key)) counts.set(key, []);
      counts.get(key)!.push(i);
    });
    const duplicates = Array.from(counts.entries())
      .filter(([, idxs]) => idxs.length > 1)
      .map(([hanzi, indexes]) => ({ hanzi, count: indexes.length, indexes }));
    if (duplicates.length > 0) {
      out.push({
        file,
        exportName,
        lessonId: (v as any).id,
        lessonTitle: (v as any).title,
        duplicates,
        totalExamples: v.examples.length
      });
    }
  }

  for (const k of Object.keys(v)) {
    visit((v as any)[k], `${exportName}.${k}`, file, depth + 1);
  }
}

const report = {
  generatedAt: new Date().toISOString(),
  lessonsWithDuplicates: out.length,
  totalDuplicateHanzi: out.reduce((s, l) => s + l.duplicates.length, 0),
  lessons: out
};

writeFileSync(REPORT, JSON.stringify(report, null, 2), 'utf8');

console.log(`Fichiers scannés : ${files.length}`);
console.log(`Leçons avec doublons : ${out.length}`);
console.log(`Hanzi distincts dupliqués : ${report.totalDuplicateHanzi}`);
console.log(`\nRapport : ${REPORT}\n`);

console.log('=== Top 20 ===');
for (const l of out.slice(0, 20)) {
  console.log(`\n[${l.file}] ${l.exportName}`);
  if (l.lessonTitle) console.log(`  Titre : ${l.lessonTitle}`);
  if (l.lessonId) console.log(`  ID    : ${l.lessonId}`);
  for (const d of l.duplicates) {
    console.log(`  × ${d.count}  "${d.hanzi}"  (indexes: ${d.indexes.join(', ')})`);
  }
}
