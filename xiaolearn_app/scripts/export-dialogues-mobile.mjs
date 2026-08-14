/**
 * export-dialogues-mobile.mjs — régénère xiaolearn_mobile/data/dialogues.ts.
 *
 * Le catalogue de dialogues a une seule source de vérité : les données web
 * (`src/data/dialogues.ts` + `dialogue-quizzes.ts` + `dialogue-zh-titles.ts`),
 * parce que c'est ce que lit `generate-dialogue-audio.mjs` pour doubler les
 * répliques. Le mobile en consommait une copie recopiée à la main, qui avait
 * fini par diverger : trois dialogues B2 avaient leur audio sur le CDN mais
 * n'apparaissaient nulle part dans l'app.
 *
 * Ce script aplatit les trois fichiers web en un module autonome pour le
 * mobile — le quiz, au format web (`choices[{labelFr,labelEn}]` + answerIndex),
 * y est converti en `choicesFr/choicesEn/correct`.
 *
 * Usage : node scripts/export-dialogues-mobile.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import ts from 'typescript';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const mobileFile = path.resolve(root, '../xiaolearn_mobile/data/dialogues.ts');

const opts = { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2020 };
const tmp = fs.mkdtempSync(path.join(root, '.tmp-export-'));
const compile = (rel, rewrites = []) => {
  let js = ts.transpileModule(fs.readFileSync(path.join(root, rel), 'utf8'), { compilerOptions: opts }).outputText;
  for (const [from, to] of rewrites) js = js.replaceAll(from, to);
  const out = path.join(tmp, path.basename(rel).replace(/\.tsx?$/, '.mjs'));
  fs.writeFileSync(out, js);
  return out;
};

let dialogues, quizzes, zhTitles, icons;
try {
  compile('src/data/cecr-b2-texts.ts');
  const dlg = compile('src/data/dialogues.ts', [["'./cecr-b2-texts'", "'./cecr-b2-texts.mjs'"]]);
  // dialogue-quizzes n'importe qu'un type : l'import disparaît à la compilation.
  const qz = compile('src/data/dialogue-quizzes.ts');
  const zh = compile('src/data/dialogue-zh-titles.ts');
  ({ dialogues } = await import(pathToFileURL(dlg).href));
  ({ DIALOGUE_QUIZZES: quizzes } = await import(pathToFileURL(qz).href));
  ({ DIALOGUE_ZH_TITLES: zhTitles } = await import(pathToFileURL(zh).href));
  // Emoji par identifiant : lus dans la page web, seule table qui les porte.
  const page = fs.readFileSync(path.join(root, 'src/pages/DialoguePageV2.tsx'), 'utf8');
  const bloc = page.slice(page.indexOf('const ID_EMOJI'), page.indexOf('};', page.indexOf('const ID_EMOJI')));
  // Les entrées sont écrites tantôt en quotes simples, tantôt doubles.
  icons = Object.fromEntries(
    [...bloc.matchAll(/['"]([\w-]+)['"]:\s*['"]([^'"]+)['"]/g)].map(m => [m[1], m[2]]));
} finally {
  fs.rmSync(tmp, { recursive: true, force: true });
}

const j = v => JSON.stringify(v);
const lineOf = l => '        { ' + ['speaker', 'hanzi', 'pinyin', 'translationFr', 'translationEn', 'note', 'noteEn']
  .filter(k => l[k] !== undefined).map(k => `${k}: ${j(l[k])}`).join(', ') + ' }';

const entryOf = e => {
  const d = e.dialogue;
  const cm = d.comprehension;
  const qs = (quizzes[d.id] ?? []).map(q => `        {
          questionFr: ${j(q.questionFr)},
          questionEn: ${j(q.questionEn)},
          choicesFr: ${j(q.choices.map(c => c.labelFr))},
          choicesEn: ${j(q.choices.map(c => c.labelEn))},
          correct: ${q.answerIndex},
          explanationFr: ${j(q.explanationFr ?? '')},
          explanationEn: ${j(q.explanationEn ?? '')},
        }`).join(',\n');
  return `  {
    cecrLevel: ${j(e.cecrLevel)},
    theme: ${j(e.theme)},
    themeEn: ${j(e.themeEn)},
    dialogue: {
      id: ${j(d.id)},
      title: ${j(d.title)},
      titleEn: ${j(d.titleEn)},
      context: ${j(d.context)},
      contextEn: ${j(d.contextEn)},
      lines: [
${d.lines.map(lineOf).join(',\n')}
      ],
      vocab: ${j(d.vocab ?? [])},${cm ? `
      comprehension: {
        questionFr: ${j(cm.questionFr)},
        questionEn: ${j(cm.questionEn)},
        answerFr: ${j(cm.answerFr)},
        answerEn: ${j(cm.answerEn)},
      },` : ''}${qs ? `
      quiz: [
${qs}
      ],` : ''}
    },
  }`;
};

const ordre = ['a1', 'a2', 'b1.1', 'b1.2', 'b2.1', 'b2.2', 'c1.1', 'c1.2', 'c2.1', 'c2.2'];
const tri = [...dialogues].sort((a, b) => ordre.indexOf(a.cecrLevel) - ordre.indexOf(b.cecrLevel));

const header = fs.readFileSync(mobileFile, 'utf8');
const typesFin = header.indexOf('export const dialogues');
const types = header.slice(0, typesFin);

const out = `${types}export const dialogues: DialogueEntry[] = [
${tri.map(entryOf).join(',\n')},
];

/** Titre chinois d'affichage — plus parlant que la traduction française. */
export const DIALOGUE_ZH_TITLES: Record<string, string> = {
${tri.filter(e => zhTitles[e.dialogue.id]).map(e => `  ${j(e.dialogue.id)}: ${j(zhTitles[e.dialogue.id])},`).join('\n')}
};

/** Émoji propre à chaque dialogue ; \`THEME_ICON\` sert de repli. */
export const DIALOGUE_ICONS: Record<string, string> = {
${tri.filter(e => icons[e.dialogue.id]).map(e => `  ${j(e.dialogue.id)}: ${j(icons[e.dialogue.id])},`).join('\n')}
};

export const getDialogueById = (id: string): Dialogue | undefined =>
  dialogues.find(d => d.dialogue.id === id)?.dialogue;

export const getDialoguesByLevel = (level: DialogueLevel): DialogueEntry[] =>
  dialogues.filter(d => d.cecrLevel === level);

/** Niveaux réellement représentés, dans l'ordre du CECR. */
export const availableLevels = (): DialogueLevel[] =>
  DIALOGUE_LEVELS.filter(lv => dialogues.some(d => d.cecrLevel === lv));

export const getDialogueZhTitle = (id: string): string | undefined =>
  DIALOGUE_ZH_TITLES[id];

export const dialogueIcon = (e: DialogueEntry): string =>
  DIALOGUE_ICONS[e.dialogue.id] ?? THEME_ICON[e.theme] ?? '💬';
`;

fs.writeFileSync(mobileFile, out);
console.log(`✅ ${tri.length} dialogues exportés → ${path.relative(process.cwd(), mobileFile)}`);
const parNiveau = {};
for (const e of tri) parNiveau[e.cecrLevel] = (parNiveau[e.cecrLevel] ?? 0) + 1;
console.log('   ', Object.entries(parNiveau).map(([k, v]) => `${k}:${v}`).join('  '));
console.log(`    ${tri.reduce((n, e) => n + e.dialogue.lines.length, 0)} répliques, ` +
  `${tri.reduce((n, e) => n + (quizzes[e.dialogue.id]?.length ?? 0), 0)} questions`);
