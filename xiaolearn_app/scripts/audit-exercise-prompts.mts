/**
 * audit-exercise-prompts.mts
 *
 * Scanne tous les exercices de cecr-exercises*.ts et identifie les cas
 * où le `prompt` contient des hanzi qui sont AUSSI dans la bonne réponse
 * (choice[correctIndex]). Ce sont les exercices "trivialisés" : la
 * consigne révèle la solution.
 *
 * Output: scripts/exercise-prompts-audit.json
 *
 * Usage: npx tsx scripts/audit-exercise-prompts.mts
 */

import { writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPORT_PATH = join(__dirname, 'exercise-prompts-audit.json');

const FILES_TO_AUDIT = [
  '../src/data/cecr-exercises.ts',
  '../src/data/cecr-exercises-enriched-a1.ts',
  '../src/data/cecr-exercises-enriched-a2.ts'
];

/** Range Unicode des hanzi CJK. */
const HANZI_RE = /[一-鿿]+/g;

interface ExerciseSnapshot {
  id?: string;
  type?: string;
  prompt?: string;
  promptEn?: string;
  sentence?: string;
  choices?: string[];
  correctIndex?: number;
}

interface Issue {
  file: string;
  id: string;
  type: string;
  promptFr: string;
  correctAnswer: string;
  hanziInPromptThatLeakAnswer: string[];
  severity: 'high' | 'medium';
}

const issues: Issue[] = [];

for (const relativePath of FILES_TO_AUDIT) {
  const fullPath = join(__dirname, relativePath);
  let mod: any;
  try {
    mod = await import(fullPath);
  } catch (err: any) {
    console.warn(`[skip] ${relativePath}: ${err.message?.split('\n')[0] ?? err}`);
    continue;
  }

  const walkExercises = (val: any, file: string) => {
    if (val == null) return;
    if (Array.isArray(val)) {
      val.forEach((v) => walkExercises(v, file));
      return;
    }
    if (typeof val !== 'object') return;

    const ex = val as ExerciseSnapshot;
    if (
      typeof ex.id === 'string' &&
      typeof ex.type === 'string' &&
      typeof ex.prompt === 'string' &&
      Array.isArray(ex.choices) &&
      typeof ex.correctIndex === 'number'
    ) {
      // Exclut les exercices "Trouve l'erreur" : par design, la phrase
      // fautive contient les hanzi à corriger. Pas un bug pédagogique.
      const isErrorCorrection =
        /^Trouve l[''’]erreur|^Find the error/i.test(ex.prompt) ||
        ex.id.includes('-err-');
      if (isErrorCorrection) return;
      const correctAnswer = ex.choices[ex.correctIndex] ?? '';
      const answerHanzi = (correctAnswer.match(HANZI_RE) ?? []).join('');
      if (answerHanzi.length === 0) {
        // Pas de hanzi dans la réponse — on regarde si la réponse est en
        // pinyin/français et apparaît telle quelle dans le prompt.
        if (
          correctAnswer.length >= 2 &&
          ex.prompt.toLowerCase().includes(correctAnswer.toLowerCase())
        ) {
          issues.push({
            file,
            id: ex.id,
            type: ex.type,
            promptFr: ex.prompt,
            correctAnswer,
            hanziInPromptThatLeakAnswer: [correctAnswer],
            severity: 'high'
          });
        }
      } else {
        // Check si UN des hanzi de la réponse apparaît dans le prompt.
        const leaks: string[] = [];
        for (const ch of Array.from(answerHanzi)) {
          if (ex.prompt.includes(ch)) leaks.push(ch);
        }
        if (leaks.length > 0) {
          // Sévérité : 'high' si TOUS les hanzi de la réponse sont dans le
          // prompt (révèle complètement) ; 'medium' si seulement certains.
          const severity = leaks.length === Array.from(answerHanzi).length ? 'high' : 'medium';
          issues.push({
            file,
            id: ex.id,
            type: ex.type,
            promptFr: ex.prompt,
            correctAnswer,
            hanziInPromptThatLeakAnswer: leaks,
            severity
          });
        }
      }
      return;
    }

    for (const k of Object.keys(val)) {
      walkExercises((val as any)[k], file);
    }
  };

  for (const [name, val] of Object.entries(mod)) {
    walkExercises(val, relativePath.replace('../', ''));
  }
}

const high = issues.filter((i) => i.severity === 'high');
const medium = issues.filter((i) => i.severity === 'medium');

const report = {
  generatedAt: new Date().toISOString(),
  totalIssues: issues.length,
  highSeverity: high.length,
  mediumSeverity: medium.length,
  issues
};

writeFileSync(REPORT_PATH, JSON.stringify(report, null, 2), 'utf8');

console.log(`Total exercices avec fuite de réponse : ${issues.length}`);
console.log(`  HAUT (la réponse complète est dans le prompt) : ${high.length}`);
console.log(`  MOYEN (réponse partielle dans le prompt)      : ${medium.length}`);
console.log('');
console.log('=== Top 15 HAUT ===');
for (const issue of high.slice(0, 15)) {
  console.log(`\n[${issue.file}] ${issue.id}`);
  console.log(`  prompt : ${issue.promptFr}`);
  console.log(`  réponse: ${issue.correctAnswer}`);
  console.log(`  fuite  : ${issue.hanziInPromptThatLeakAnswer.join(' ')}`);
}
console.log(`\nRapport complet : ${REPORT_PATH}`);
