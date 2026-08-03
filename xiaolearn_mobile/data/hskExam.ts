/**
 * Simulateur HSK — structure officielle et génération d'épreuve blanche.
 *
 * ## Fidélité au format réel
 *
 * Le découpage, le nombre de questions par partie, les durées, le barème et la
 * note de passage reprennent le format officiel du HSK. C'est ce qui fait la
 * valeur d'une épreuve blanche : s'entraîner sur un format approximatif prépare
 * à un examen qui n'existe pas.
 *
 *   HSK 1 — 40 questions  ·  40 min · 200 pts · admis à 120
 *   HSK 2 — 60 questions  ·  55 min · 200 pts · admis à 120
 *   HSK 3 — 80 questions  ·  90 min · 300 pts · admis à 180
 *   HSK 4 — 100 questions · 105 min · 300 pts · admis à 180
 *   HSK 5 — 100 questions · 125 min · 300 pts · admis à 180
 *   HSK 6 — 101 questions · 140 min · 300 pts · admis à 180
 *
 * ## Quelle version du HSK ?
 *
 * Celle du **HSK 2.0**, en vigueur. Le référentiel HSK 3.0 (trois stades, neuf
 * niveaux, ~11 000 mots) a été publié en novembre 2025 avec une échéance de
 * juillet 2026, mais le CTI a maintenu le calendrier 2026 en HSK 2.0 après un
 * pilote limité en janvier 2026, sans date de bascule ferme. S'entraîner sur un
 * format qui n'est pas encore celui de l'épreuve serait un contresens : on
 * passera à 3.0 quand les sujets officiels le seront, et le changement se
 * fera dans BLUEPRINT sans toucher au reste.
 *
 * Deux règles de l'examen réel sont reproduites parce qu'elles changent la
 * façon de travailler : le **minutage par section**, et l'**impossibilité de
 * revenir** à une section terminée. Un entraînement sans contrainte de temps
 * ne prépare pas à la compréhension orale.
 *
 * ## Ce qui diffère, et qu'il faut savoir
 *
 * L'audio des items est celui de l'app : `playHanzi` cherche d'abord un fichier
 * pré-généré (voix neuronales Azure, servies depuis R2 — 32 500 phrases
 * d'exemple et ~18 000 mots déjà couverts) et ne retombe sur la synthèse
 * embarquée du téléphone que pour une chaîne non couverte.
 *
 * Reste une différence avec l'épreuve réelle : le HSK fait jouer des dialogues
 * à deux voix, enregistrés par des comédiens. Ici chaque item est une phrase
 * lue par une voix unique. C'est la limite qui subsiste — le timbre, lui,
 * n'est pas en cause.
 *
 * Aux niveaux 5 et 6, la lecture repose sur des textes longs : ils viennent des
 * passages de `cecrLectures.ts`, écrits pour l'app, et non d'un assemblage de
 * phrases de dictionnaire.
 *
 * L'expression écrite de ces deux niveaux est une rédaction (80 caractères en
 * HSK 5, résumé de 400 caractères en HSK 6). Elle ne se corrige pas par QCM :
 * la copie est soumise au même moteur que Prof. Xiao, avec la grille officielle
 * (contenu, langue, structure). C'est une note indicative, pas un barème
 * officiel, et l'écran le dit.
 */
import type { TransKey } from '@/i18n/translations';

export type HskLevel = 'hsk1' | 'hsk2' | 'hsk3' | 'hsk4' | 'hsk5' | 'hsk6';
export type SectionId = 'listening' | 'reading' | 'writing';

/** Nature d'une question — conditionne l'affichage et la consigne. */
export type ItemKind =
  | 'listen-truefalse'   // on écoute, on juge une affirmation
  | 'read-truefalse'     // même chose sans audio (lecture)
  | 'listen-mcq'         // on écoute, on choisit le sens
  | 'read-match'         // apparier deux moitiés d'échange
  | 'read-cloze'         // trou à combler par un mot
  | 'read-passage'       // court texte puis question
  | 'write-order'        // 连词成句 : remettre les segments en ordre
  | 'write-char'         // choisir le caractère correspondant au pinyin
  | 'read-long'          // texte long suivi de questions (HSK 5-6)
  | 'write-essay';       // rédaction libre, corrigée par le moteur de langue

export interface ExamItem {
  id: string;
  kind: ItemKind;
  /** Texte chinois lu (oral) ou affiché (écrit). */
  prompt: string;
  pinyin?: string;
  /** Affirmation à juger, question posée, ou phrase à trou. */
  question: string;
  choices: string[];
  correctIndex: number;
  /** Correction affichée sur la copie. */
  explanation: string;
}

export interface ExamPart {
  /** Numérotation officielle : 第一部分, 第二部分… */
  partNo: number;
  kind: ItemKind;
  instructionKey: TransKey;
  items: ExamItem[];
}

export interface ExamSection {
  id: SectionId;
  /** Minutes allouées — décomptées section par section, comme à l'examen. */
  minutes: number;
  points: number;
  parts: ExamPart[];
}

export interface Exam {
  level: HskLevel;
  sections: ExamSection[];
  totalPoints: number;
  passMark: number;
}

/** Plan officiel : parties, volumes, durées, barème. */
interface PartPlan { kind: ItemKind; count: number; instructionKey: TransKey }
interface SectionPlan { id: SectionId; minutes: number; points: number; parts: PartPlan[] }

export const BLUEPRINT: Record<HskLevel, { minutes: number; passMark: number; sections: SectionPlan[] }> = {
  hsk1: {
    minutes: 40, passMark: 120,
    sections: [
      { id: 'listening', minutes: 15, points: 100, parts: [
        { kind: 'listen-truefalse', count: 5,  instructionKey: 'hsk.i.tf' },
        { kind: 'listen-mcq',       count: 5,  instructionKey: 'hsk.i.lmcq' },
        { kind: 'listen-mcq',       count: 5,  instructionKey: 'hsk.i.lmcq' },
        { kind: 'listen-mcq',       count: 5,  instructionKey: 'hsk.i.lmcq' },
      ]},
      { id: 'reading', minutes: 17, points: 100, parts: [
        { kind: 'read-match',   count: 5,  instructionKey: 'hsk.i.match' },
        { kind: 'read-match',   count: 5,  instructionKey: 'hsk.i.match' },
        { kind: 'read-passage', count: 5,  instructionKey: 'hsk.i.passage' },
        { kind: 'read-cloze',   count: 5,  instructionKey: 'hsk.i.cloze' },
      ]},
    ],
  },
  hsk2: {
    minutes: 55, passMark: 120,
    sections: [
      { id: 'listening', minutes: 25, points: 100, parts: [
        { kind: 'listen-truefalse', count: 10, instructionKey: 'hsk.i.tf' },
        { kind: 'listen-mcq',       count: 10, instructionKey: 'hsk.i.lmcq' },
        { kind: 'listen-mcq',       count: 10, instructionKey: 'hsk.i.lmcq' },
        { kind: 'listen-mcq',       count: 5,  instructionKey: 'hsk.i.lmcq' },
      ]},
      { id: 'reading', minutes: 22, points: 100, parts: [
        { kind: 'read-match',   count: 5,  instructionKey: 'hsk.i.match' },
        { kind: 'read-truefalse', count: 5, instructionKey: 'hsk.i.tf' },
        { kind: 'read-cloze',   count: 5,  instructionKey: 'hsk.i.cloze' },
        { kind: 'read-passage', count: 10, instructionKey: 'hsk.i.passage' },
      ]},
    ],
  },
  hsk3: {
    minutes: 90, passMark: 180,
    sections: [
      { id: 'listening', minutes: 35, points: 100, parts: [
        { kind: 'listen-mcq',       count: 10, instructionKey: 'hsk.i.lmcq' },
        { kind: 'listen-truefalse', count: 10, instructionKey: 'hsk.i.tf' },
        { kind: 'listen-mcq',       count: 10, instructionKey: 'hsk.i.lmcq' },
        { kind: 'listen-mcq',       count: 10, instructionKey: 'hsk.i.lmcq' },
      ]},
      { id: 'reading', minutes: 30, points: 100, parts: [
        { kind: 'read-match',   count: 10, instructionKey: 'hsk.i.match' },
        { kind: 'read-cloze',   count: 10, instructionKey: 'hsk.i.cloze' },
        { kind: 'read-passage', count: 10, instructionKey: 'hsk.i.passage' },
      ]},
      { id: 'writing', minutes: 15, points: 100, parts: [
        { kind: 'write-order', count: 5, instructionKey: 'hsk.i.order' },
        { kind: 'write-char',  count: 5, instructionKey: 'hsk.i.char' },
      ]},
    ],
  },
  hsk4: {
    minutes: 105, passMark: 180,
    sections: [
      { id: 'listening', minutes: 30, points: 100, parts: [
        { kind: 'listen-truefalse', count: 10, instructionKey: 'hsk.i.tf' },
        { kind: 'listen-mcq',       count: 15, instructionKey: 'hsk.i.lmcq' },
        { kind: 'listen-mcq',       count: 20, instructionKey: 'hsk.i.lmcq' },
      ]},
      { id: 'reading', minutes: 40, points: 100, parts: [
        { kind: 'read-cloze',   count: 10, instructionKey: 'hsk.i.cloze' },
        { kind: 'read-match',   count: 10, instructionKey: 'hsk.i.match' },
        { kind: 'read-passage', count: 20, instructionKey: 'hsk.i.passage' },
      ]},
      { id: 'writing', minutes: 25, points: 100, parts: [
        { kind: 'write-order', count: 10, instructionKey: 'hsk.i.order' },
        { kind: 'write-char',  count: 5,  instructionKey: 'hsk.i.char' },
      ]},
    ],
  },
  hsk5: {
    // 100 questions · 125 min · 300 pts · admis à 180
    minutes: 125, passMark: 180,
    sections: [
      { id: 'listening', minutes: 30, points: 100, parts: [
        { kind: 'listen-mcq', count: 20, instructionKey: 'hsk.i.lmcq' },
        { kind: 'listen-mcq', count: 25, instructionKey: 'hsk.i.lmcq' },
      ]},
      { id: 'reading', minutes: 45, points: 100, parts: [
        { kind: 'read-cloze', count: 15, instructionKey: 'hsk.i.cloze' },
        { kind: 'read-match', count: 10, instructionKey: 'hsk.i.match' },
        { kind: 'read-long',  count: 20, instructionKey: 'hsk.i.long' },
      ]},
      { id: 'writing', minutes: 40, points: 100, parts: [
        { kind: 'write-order', count: 8, instructionKey: 'hsk.i.order' },
        { kind: 'write-essay', count: 2, instructionKey: 'hsk.i.essay80' },
      ]},
    ],
  },
  hsk6: {
    // 101 questions · 140 min · 300 pts · admis à 180.
    // Le compte impair vient de la rédaction : une seule tâche, le résumé.
    minutes: 140, passMark: 180,
    sections: [
      { id: 'listening', minutes: 35, points: 100, parts: [
        { kind: 'listen-mcq', count: 15, instructionKey: 'hsk.i.lmcq' },
        { kind: 'listen-mcq', count: 15, instructionKey: 'hsk.i.lmcq' },
        { kind: 'listen-mcq', count: 20, instructionKey: 'hsk.i.lmcq' },
      ]},
      { id: 'reading', minutes: 50, points: 100, parts: [
        { kind: 'read-match', count: 10, instructionKey: 'hsk.i.match' },
        { kind: 'read-cloze', count: 10, instructionKey: 'hsk.i.cloze' },
        { kind: 'read-cloze', count: 10, instructionKey: 'hsk.i.cloze' },
        { kind: 'read-long',  count: 20, instructionKey: 'hsk.i.long' },
      ]},
      { id: 'writing', minutes: 45, points: 100, parts: [
        { kind: 'write-essay', count: 1, instructionKey: 'hsk.i.essay400' },
      ]},
    ],
  },
};

// ─── Génération ───────────────────────────────────────────────────────────────

export interface VocabEntry {
  id: string; hanzi: string; pinyin: string; translation: string;
  level: string;
  examples?: { hanzi: string; pinyin: string; translation: string; translationEn?: string }[];
}

function shuffle<T>(a: T[]): T[] {
  const x = [...a];
  for (let i = x.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [x[i], x[j]] = [x[j], x[i]];
  }
  return x;
}

/** Niveaux autorisés pour un examen : le sien et tous les précédents. */
function levelsUpTo(level: HskLevel): string[] {
  const order = ['hsk1', 'hsk2', 'hsk3', 'hsk4', 'hsk5', 'hsk6'];
  return order.slice(0, order.indexOf(level) + 1);
}

/**
 * Construit une épreuve complète.
 *
 * Les items sont tirés du dictionnaire de l'app : mots du niveau visé et des
 * niveaux inférieurs, avec leurs phrases d'exemple. Chaque partie a son
 * générateur, parce que les distracteurs plausibles ne se fabriquent pas de la
 * même façon selon qu'on teste le sens d'un mot ou l'ordre des mots.
 */
/** Passage long réutilisé pour la lecture des niveaux 5 et 6. */
export interface LongText {
  id: string;
  level: string;
  titleZh: string;
  /** Texte chinois, pinyin entre parenthèses — nettoyé à la génération. */
  text: string;
  questions: { promptFr: string; choices: string[]; correctIndex: number; explanationFr: string }[];
}

/** Retire les gloses de pinyin : à l'examen, le texte est en caractères seuls. */
function stripPinyin(text: string): string {
  return text.replace(/\([^)]*\)/g, '').replace(/\n+/g, '\n').trim();
}

export function generateExam(level: HskLevel, vocab: VocabEntry[], longTexts: LongText[] = []): Exam {
  const plan = BLUEPRINT[level];
  const allowed = new Set(levelsUpTo(level));
  const pool = shuffle(vocab.filter(v => allowed.has(v.level)));
  const withEx = pool.filter(v => (v.examples?.length ?? 0) > 0);

  let seq = 0;
  const nextId = () => `q${++seq}`;

  // Les passages sont consommés dans l'ordre, question après question, pour
  // qu'un même texte porte bien ses 4-5 questions comme à l'examen.
  const longPool = shuffle(longTexts);
  let longCursor = 0, longQ = 0;

  const distractors = (correct: string, n = 3) =>
    shuffle(pool.filter(v => v.translation !== correct)).slice(0, n).map(v => v.translation);

  const build = (kind: ItemKind | 'read-truefalse', count: number): ExamItem[] => {
    const out: ExamItem[] = [];
    for (let i = 0; i < count; i++) {
      const v = pool[(seq + i * 7) % pool.length];
      const e = withEx[(seq + i * 11) % Math.max(1, withEx.length)];
      const ex = e?.examples?.[0];

      if (kind === 'listen-truefalse' || kind === 'read-truefalse') {
        // Une affirmation sur deux est fausse : on remplace la traduction.
        const truthful = i % 2 === 0;
        const claim = truthful ? v.translation : distractors(v.translation, 1)[0] ?? v.translation;
        out.push({
          id: nextId(), kind: kind as ItemKind,
          prompt: v.hanzi, pinyin: v.pinyin,
          question: claim,
          choices: ['✓', '✗'],
          correctIndex: truthful ? 0 : 1,
          explanation: `${v.hanzi} (${v.pinyin}) = ${v.translation}`,
        });
      } else if (kind === 'listen-mcq' || kind === 'read-cloze') {
        const choices = shuffle([v.translation, ...distractors(v.translation)]);
        out.push({
          id: nextId(), kind,
          prompt: kind === 'read-cloze' && ex ? ex.hanzi.replace(v.hanzi, '＿＿') : v.hanzi,
          pinyin: v.pinyin,
          question: v.hanzi,
          choices,
          correctIndex: choices.indexOf(v.translation),
          explanation: `${v.hanzi} (${v.pinyin}) = ${v.translation}`,
        });
      } else if (kind === 'read-match' || kind === 'read-passage') {
        const src = ex ?? { hanzi: v.hanzi, pinyin: v.pinyin, translation: v.translation };
        const choices = shuffle([src.translation, ...distractors(src.translation)]);
        out.push({
          id: nextId(), kind,
          prompt: src.hanzi, pinyin: src.pinyin,
          question: src.hanzi,
          choices,
          correctIndex: choices.indexOf(src.translation),
          explanation: `${src.hanzi} — ${src.translation}`,
        });
      } else if (kind === 'write-order') {
        const src = ex ?? { hanzi: v.hanzi, pinyin: v.pinyin, translation: v.translation };
        // Découpage en blocs de deux caractères : suffisant pour obtenir des
        // segments manipulables sans analyseur syntaxique, et proche du
        // 连词成句 officiel, où l'on réordonne des groupes et non des lettres.
        const clean = src.hanzi.replace(/[。！？，、]/g, '');
        const segs: string[] = [];
        for (let k = 0; k < clean.length; k += 2) segs.push(clean.slice(k, k + 2));

        // Trois ordres erronés distincts, plus le bon.
        const wrong = new Set<string>();
        for (let a = 0; a < 12 && wrong.size < 3; a++) {
          const cand = shuffle(segs).join('');
          if (cand !== clean) wrong.add(cand);
        }
        const choices = shuffle([clean, ...wrong]);
        out.push({
          id: nextId(), kind,
          prompt: shuffle(segs).join(' / '), pinyin: src.pinyin,
          question: src.translation,
          choices,
          correctIndex: choices.indexOf(clean),
          explanation: `${clean} — ${src.translation}`,
        });
      } else if (kind === 'read-long') {
        // Les questions viennent du passage lui-même : elles ont été écrites
        // pour ce texte, pas fabriquées par permutation de distracteurs.
        const lt = longPool[longCursor % Math.max(1, longPool.length)];
        const q = lt?.questions[longQ % Math.max(1, lt.questions.length)];
        longQ++;
        if (longQ >= (lt?.questions.length ?? 1)) { longQ = 0; longCursor++; }
        if (!lt || !q) continue;
        out.push({
          id: nextId(), kind,
          prompt: stripPinyin(lt.text),
          question: q.promptFr,
          choices: q.choices,
          correctIndex: q.correctIndex,
          explanation: q.explanationFr,
        });
      } else if (kind === 'write-essay') {
        // Pas de choix : la copie est saisie librement puis corrigée par le
        // moteur de langue. `correctIndex` reste à -1, jamais comparé.
        const theme = longPool[(seq + i) % Math.max(1, longPool.length)];
        out.push({
          id: nextId(), kind,
          prompt: theme?.titleZh ?? v.hanzi,
          question: level === 'hsk6' ? stripPinyin(theme?.text ?? '') : (theme?.titleZh ?? v.hanzi),
          choices: [],
          correctIndex: -1,
          explanation: '',
        });
      } else {
        // write-char : le pinyin est donné, on choisit le bon caractère.
        const choices = shuffle([v.hanzi, ...shuffle(pool.filter(x => x.hanzi !== v.hanzi)).slice(0, 3).map(x => x.hanzi)]);
        out.push({
          id: nextId(), kind: 'write-char',
          prompt: v.pinyin, pinyin: v.pinyin,
          question: v.translation,
          choices,
          correctIndex: choices.indexOf(v.hanzi),
          explanation: `${v.pinyin} → ${v.hanzi} (${v.translation})`,
        });
      }
    }
    return out;
  };

  const sections: ExamSection[] = plan.sections.map(sp => ({
    id: sp.id,
    minutes: sp.minutes,
    points: sp.points,
    parts: sp.parts.map((pp, idx) => ({
      partNo: idx + 1,
      kind: pp.kind,
      instructionKey: pp.instructionKey,
      items: build(pp.kind as ItemKind, pp.count),
    })),
  }));

  return {
    level,
    sections,
    totalPoints: sections.reduce((n, s) => n + s.points, 0),
    passMark: plan.passMark,
  };
}

/** Nombre total de questions d'une épreuve — pour l'écran d'accueil. */
export function countQuestions(level: HskLevel): number {
  return BLUEPRINT[level].sections.reduce(
    (n, s) => n + s.parts.reduce((m, p) => m + p.count, 0), 0);
}
