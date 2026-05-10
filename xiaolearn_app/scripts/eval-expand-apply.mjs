/**
 * eval-expand-apply.mjs
 * ---------------------
 * Injecte les questions supplémentaires définies dans `eval-expand-additions.mjs`
 * directement dans les fichiers sources `hsk-evaluations.ts` et `hsk-evaluations-b.ts`.
 *
 * Pour chaque section id, on :
 *   1. cherche la ligne `id: '<sectionId>',`,
 *   2. localise le `]` fermant du tableau `questions: [...]` qui suit,
 *   3. remplace ce bloc pour :
 *        - ajouter une virgule à la dernière question existante,
 *        - insérer les nouveaux blocs (séparés par `,`),
 *        - refermer par `      ]`.
 *
 * L'injection est idempotente tant que les nouveaux IDs (ex: `hsk1-v5`) ne sont
 * pas déjà présents dans le fichier — on skip avec un warning si c'est le cas.
 *
 * Usage: node scripts/eval-expand-apply.mjs
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { ADDITIONS } from './eval-expand-additions.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT = resolve(__dirname, '..');

const FILE_A = resolve(ROOT, 'src/data/hsk-evaluations.ts');
const FILE_B = resolve(ROOT, 'src/data/hsk-evaluations-b.ts');

/**
 * Injecte les nouveaux blocs dans une section identifiée par `sectionId`.
 * Retourne le nouveau contenu ou `null` si rien à faire.
 */
function injectIntoSection(source, sectionId, newBlocks) {
  // Marqueur unique pour retrouver la section.
  const sectionMarker = `id: '${sectionId}',`;
  const sectionStart = source.indexOf(sectionMarker);
  if (sectionStart === -1) {
    throw new Error(`Section id "${sectionId}" introuvable`);
  }

  // Vérif idempotence — si le premier nouvel ID est déjà présent après la
  // section, on skip.
  const firstNewIdMatch = newBlocks[0].match(/id:\s*'([^']+)'/);
  if (firstNewIdMatch) {
    const firstNewId = firstNewIdMatch[1];
    const firstNewIdMarker = `id: '${firstNewId}'`;
    if (source.indexOf(firstNewIdMarker) !== -1) {
      console.log(`  ⤳ ${sectionId}: déjà injecté (trouvé ${firstNewId}) — skip`);
      return null;
    }
  }

  // Cherche le `]` fermant du tableau questions (6 espaces en début de ligne).
  // On commence la recherche APRÈS le marqueur `id: '...'`.
  const closingPattern = /\n      \]\n/;
  const afterMarker = source.slice(sectionStart);
  const closingMatch = closingPattern.exec(afterMarker);
  if (!closingMatch) {
    throw new Error(`Fermeture "      ]" introuvable pour ${sectionId}`);
  }
  const closingIndexAbs = sectionStart + closingMatch.index;
  // Position du `\n      ]` — on va insérer avant cette ligne.

  // La ligne juste avant le `]` est `        }` (dernière question sans virgule).
  // On doit y ajouter une virgule.
  // Structure du remplacement :
  //   OLD :  "\n        }\n      ]\n"
  //   NEW :  "\n        },\n<blocks joined by ',\n'>\n      ]\n"
  const before = source.slice(0, closingIndexAbs);
  const after = source.slice(closingIndexAbs);
  // `before` se termine par `...}` (l'accolade fermante de la dernière question,
  // sans retour à la ligne final). `after` commence par `\n      ]\n...`.

  const lastBraceRegex = /\n {8}\}$/;
  if (!lastBraceRegex.test(before)) {
    throw new Error(
      `Impossible de trouver la dernière accolade de la section ${sectionId}`
    );
  }
  const beforeWithComma = before.replace(lastBraceRegex, '\n        },');

  const injection = '\n' + newBlocks.join(',\n');
  return beforeWithComma + injection + after;
}

function applyToFile(filePath, predicate) {
  let content = readFileSync(filePath, 'utf8');
  let changedCount = 0;

  for (const [sectionId, blocks] of Object.entries(ADDITIONS)) {
    if (!predicate(sectionId)) continue;
    if (!blocks || blocks.length === 0) continue;

    const next = injectIntoSection(content, sectionId, blocks);
    if (next !== null) {
      content = next;
      changedCount += 1;
      console.log(`  ✓ ${sectionId}: +${blocks.length} questions`);
    }
  }

  writeFileSync(filePath, content, 'utf8');
  return changedCount;
}

console.log('→ Injection dans hsk-evaluations.ts (Série A)');
const countA = applyToFile(FILE_A, (sectionId) => !sectionId.match(/^hsk\db-/));
console.log(`  → ${countA} sections modifiées\n`);

console.log('→ Injection dans hsk-evaluations-b.ts (Série B)');
const countB = applyToFile(FILE_B, (sectionId) => /^hsk\db-/.test(sectionId));
console.log(`  → ${countB} sections modifiées\n`);

console.log(`Total : ${countA + countB} sections enrichies.`);
