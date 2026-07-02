#!/usr/bin/env node
/**
 * sanity_check_lessons.js
 * -----------------------
 * Vérifie :
 *   A) Unicité globale des ids (dans chaque fichier + croisée)
 *   B) correctChoiceIndex dans les bornes de choices
 *   C) Flashcards référencées qui existent
 *   D) Champs obligatoires non vides (hanzi, pinyin, translation, ...)
 *
 * Usage : node sanity_check_lessons.js
 */

const fs = require('fs');
const path = require('path');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;

const DATA_DIR = '/sessions/stoic-bold-tesla/mnt/xiaolearn_app/src/data';
const JSON_DIR = '/sessions/stoic-bold-tesla/mnt/xiaolearn_app/data';

const FILES = [
  'simple-lessons.ts',
  'grammar-lessons.ts',
  'grammar-lessons-extended.ts',
  'grammar-lessons-substack.ts',
  'lesson-paths.ts',
  'lesson-exercises.ts',
  'level1-course.ts',
  'level2-course.ts',
  'dictation-phrases.ts',
  'culture-topics.ts',
  'supplement-flashcards.ts', // R6 — couvre les 314 refs manquantes
  'cecr-course.ts'            // Refonte CECR A1→C2
];

// Les vrais ids/hanzi du vocabulaire sont dans les JSON HSK (chargés par src/data/lessons.ts).
// On les indexe pour résoudre les flashcards listées par hanzi dans lesson-paths.ts.
const HSK_JSON_FILES = ['hsk1.json', 'hsk2.json', 'hsk3.json', 'hsk4.json', 'hsk5.json', 'hsk6.json', 'hsk7.json'];
const hskIds = new Set();
const hskHanzi = new Set();
for (const f of HSK_JSON_FILES) {
  const p = path.join(JSON_DIR, f);
  if (!fs.existsSync(p)) continue;
  try {
    const arr = JSON.parse(fs.readFileSync(p, 'utf8'));
    for (const item of arr) {
      if (item.id) hskIds.add(item.id);
      if (item.hanzi) hskHanzi.add(item.hanzi);
    }
  } catch (err) {
    console.error(`⚠️  ${f}: ${err.message}`);
  }
}

const issues = { errors: [], warnings: [] };
const add = (level, file, msg) => issues[level].push({ file, msg });

// ---------------------------------------------------------------------------
// AST-based ID scan : on récolte tous les id: '...' et on capte leur contexte
// ---------------------------------------------------------------------------

/**
 * Parse un fichier et retourne :
 *   - idsByFile: array des ids rencontrés (avec loc)
 *   - choicesWithIndex: array des { correctChoiceIndex, choicesLen, loc }
 *   - examplesIssues: array des examples mal typés (hanzi/pinyin/translation manquant)
 */
function scanFile(relPath) {
  const abs = path.join(DATA_DIR, relPath);
  const src = fs.readFileSync(abs, 'utf8');
  const ast = parser.parse(src, { sourceType: 'module', plugins: ['typescript', 'jsx'] });

  const ids = [];
  const hanziList = []; // hanzi définis dans ce fichier (résolvables via getLessonByHanzi)
  const choices = [];
  const examples = [];
  const flashcardRefs = []; // ids listés dans flashcards: [...]

  traverse(ast, {
    ObjectExpression(path) {
      // collect id + choices length + correctChoiceIndex (si présents dans le même objet)
      let idVal = null;
      let idLoc = null;
      let choicesLen = null;
      let correctIdx = null;
      let hanzi = null;
      let pinyin = null;
      let translation = null;

      for (const prop of path.node.properties) {
        if (!prop.key) continue;
        const keyName = prop.key.name || prop.key.value;

        if (keyName === 'id' && prop.value.type === 'StringLiteral') {
          idVal = prop.value.value;
          idLoc = prop.loc?.start;
        }
        if (keyName === 'choices' && prop.value.type === 'ArrayExpression') {
          choicesLen = prop.value.elements.length;
        }
        if (keyName === 'correctChoiceIndex' && prop.value.type === 'NumericLiteral') {
          correctIdx = prop.value.value;
        }
        if (keyName === 'hanzi' && prop.value.type === 'StringLiteral') hanzi = prop.value.value;
        if (keyName === 'pinyin' && prop.value.type === 'StringLiteral') pinyin = prop.value.value;
        if (keyName === 'translation' && prop.value.type === 'StringLiteral') translation = prop.value.value;

        // flashcards: [ 'id1', 'id2', ... ]
        if (keyName === 'flashcards' && prop.value.type === 'ArrayExpression') {
          for (const el of prop.value.elements) {
            if (el && el.type === 'StringLiteral') flashcardRefs.push({ ref: el.value, loc: el.loc?.start });
          }
        }
      }

      if (idVal !== null) ids.push({ id: idVal, loc: idLoc });

      // Un objet qui a un id + un hanzi est un LessonItem-compatible : son
      // hanzi est résolvable via getLessonByHanzi (si le fichier est indexé).
      if (idVal !== null && hanzi !== null) {
        hanziList.push({ hanzi, id: idVal, loc: path.node.loc?.start });
      }

      if (correctIdx !== null && choicesLen !== null) {
        choices.push({ correctIdx, choicesLen, id: idVal, loc: path.node.loc?.start });
      }

      // Example-looking objects : hanzi + pinyin + translation all present
      if (hanzi !== null && pinyin !== null && translation !== null) {
        examples.push({ hanzi, pinyin, translation, loc: path.node.loc?.start });
      }
    }
  });

  return { ids, hanziList, choices, examples, flashcardRefs };
}

// ---------------------------------------------------------------------------
// MAIN
// ---------------------------------------------------------------------------

const allIds = new Map(); // id -> [{file, line}]
const allHanzi = new Set(); // hanzi défini dans un fichier scanné (résolvable via supplement/HSK)
const allFlashcardRefs = []; // {ref, file, line}

for (const file of FILES) {
  let scan;
  try {
    scan = scanFile(file);
  } catch (err) {
    add('errors', file, `Parse error : ${err.message}`);
    continue;
  }

  // A) Unicité intra-fichier
  const intra = new Map();
  for (const { id, loc } of scan.ids) {
    if (intra.has(id)) {
      add('errors', file, `Id dupliqué dans le fichier : '${id}' (ligne ${loc?.line} et ligne ${intra.get(id)})`);
    } else {
      intra.set(id, loc?.line);
    }
    if (!allIds.has(id)) allIds.set(id, []);
    allIds.get(id).push({ file, line: loc?.line });
  }

  // B) correctChoiceIndex dans les bornes
  for (const c of scan.choices) {
    if (c.correctIdx < 0 || c.correctIdx >= c.choicesLen) {
      add('errors', file,
        `correctChoiceIndex=${c.correctIdx} hors bornes (choices.length=${c.choicesLen}) pour id='${c.id || '?'}' ligne ${c.loc?.line}`);
    }
  }

  // D) Champs vides dans les examples
  for (const ex of scan.examples) {
    if (!ex.hanzi.trim()) add('warnings', file, `Example hanzi vide ligne ${ex.loc?.line}`);
    if (!ex.pinyin.trim()) add('warnings', file, `Example pinyin vide ligne ${ex.loc?.line}`);
    if (!ex.translation.trim()) add('warnings', file, `Example translation vide ligne ${ex.loc?.line}`);
  }

  // Collecter les hanzi définis dans ce fichier (résolvables via supplement-flashcards)
  for (const { hanzi } of scan.hanziList) {
    allHanzi.add(hanzi);
  }

  // C) Collect flashcard refs
  for (const { ref, loc } of scan.flashcardRefs) {
    allFlashcardRefs.push({ ref, file, line: loc?.line });
  }
}

// A) bis) Unicité croisée : reporter les ids présents dans >1 fichier
for (const [id, refs] of allIds) {
  if (refs.length > 1) {
    const files = [...new Set(refs.map(r => r.file))];
    if (files.length > 1) {
      add('warnings', files.join(','),
        `Id '${id}' présent dans ${files.length} fichiers : ${refs.map(r => `${r.file}:${r.line}`).join(', ')}`);
    }
  }
}

// C) Flashcards référencées mais non définies
// Résolution : via getLessonById (ids) OU getLessonByHanzi (hanzi). lessons.ts construit
// lessonByHanziIndex depuis les JSON HSK, on doit donc tolérer les refs en hanzi.
// On tolère aussi les helpers dynamiques (createPinyinWord -> 'py-initial-b').
const definedIds = new Set(allIds.keys());
const dynamicPrefixes = /^(py-|hanzi-|char-|tone-|num-|color-)/;
for (const { ref, file, line } of allFlashcardRefs) {
  if (definedIds.has(ref)) continue;          // id direct trouvé
  if (hskIds.has(ref)) continue;               // id trouvé dans un JSON HSK
  if (hskHanzi.has(ref)) continue;             // hanzi trouvé dans un JSON HSK
  if (allHanzi.has(ref)) continue;             // hanzi défini dans un .ts (supplement-flashcards ou level1-course)
  if (dynamicPrefixes.test(ref)) {
    add('warnings', file, `Flashcard ref '${ref}' non trouvée (probablement helper dynamique) — ${file}:${line}`);
  } else {
    add('errors', file, `Flashcard ref '${ref}' non définie (ni id ni hanzi) — ${file}:${line}`);
  }
}

// ---------------------------------------------------------------------------
// RAPPORT
// ---------------------------------------------------------------------------

const bucket = (arr) => {
  const byFile = new Map();
  for (const { file, msg } of arr) {
    if (!byFile.has(file)) byFile.set(file, []);
    byFile.get(file).push(msg);
  }
  return byFile;
};

const errBuckets = bucket(issues.errors);
const warnBuckets = bucket(issues.warnings);

console.log('='.repeat(70));
console.log(`SANITY CHECK — XiaoLearn lesson content`);
console.log('='.repeat(70));
console.log();

if (issues.errors.length === 0) {
  console.log('✅ Aucune erreur critique.');
} else {
  console.log(`❌ ${issues.errors.length} erreur(s) critique(s)\n`);
  for (const [file, msgs] of errBuckets) {
    console.log(`  [${file}]`);
    for (const m of msgs) console.log(`    - ${m}`);
    console.log();
  }
}

if (issues.warnings.length === 0) {
  console.log('✅ Aucun avertissement.');
} else {
  console.log(`\n⚠️  ${issues.warnings.length} avertissement(s) (non bloquant, info)\n`);
  const top = 20;
  let shown = 0;
  for (const [file, msgs] of warnBuckets) {
    console.log(`  [${file}] (${msgs.length})`);
    for (const m of msgs.slice(0, 3)) console.log(`    - ${m}`);
    if (msgs.length > 3) console.log(`    ... et ${msgs.length - 3} autres`);
    console.log();
    shown++;
    if (shown >= top) break;
  }
}

console.log('='.repeat(70));
console.log(`Total : ${allIds.size} ids distincts, ${allFlashcardRefs.length} flashcard refs scannées`);
console.log('='.repeat(70));

process.exit(issues.errors.length > 0 ? 1 : 0);
