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
import { HSK_EMOJI } from './hskEmoji';
import type { BingjuItem } from './hskBingju';

export type HskLevel = 'hsk1' | 'hsk2' | 'hsk3' | 'hsk4' | 'hsk5' | 'hsk6';
export type SectionId = 'listening' | 'reading' | 'writing';

/** Nature d'une question — conditionne l'affichage et la consigne. */
export type ItemKind =
  | 'listen-truefalse'   // on écoute, on juge une affirmation
  | 'read-truefalse'     // même chose sans audio (lecture)
  | 'listen-mcq'         // on écoute, on choisit le sens
  | 'listen-dialogue'    // on écoute un dialogue à deux, puis ses questions (HSK 3+)
  | 'listen-pic-tf'      // on écoute un mot, l'image correspond ou non (HSK 1-2)
  | 'listen-pic-mcq'     // on écoute, on choisit l'image (HSK 1)
  | 'read-pic-tf'        // mot affiché + image : correspondent-ils ? (HSK 1)
  | 'read-pic-match'     // image : choisir le mot chinois (HSK 2)
  | 'read-match'         // apparier phrase et traduction
  | 'read-cloze'         // trou à combler par un mot
  | 'read-passage'       // court texte puis question
  | 'read-sort'          // 排序 : remettre trois phrases en ordre (HSK 4)
  | 'read-bingju'        // 病句 : trouver la phrase fautive (HSK 6)
  | 'write-order'        // 连词成句 : construire la phrase segment par segment
  | 'write-char'         // choisir le caractère correspondant au pinyin
  | 'write-pic'          // 看图用词造句 : une photo + un mot, écrire une phrase
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
  /** Pictogramme des items à image (HSK 1-2) — secours si pas de photo. */
  image?: string;
  /** Hanzi du mot représenté par l'image — clé de la photo réelle. */
  imageKey?: string;
  /** Pour le choix d'image : hanzi représenté par chaque choix, aligné. */
  choiceImageKeys?: string[];
  /** Segments à assembler du 连词成句 — déjà mélangés. */
  segments?: string[];
  /** Répliques d'un dialogue à jouer l'une après l'autre. */
  audioLines?: string[];
  /**
   * Identifiant du groupe d'items partageant le même audio : à l'examen,
   * un dialogue est joué une fois puis suivi de plusieurs questions. Seul
   * le premier item du groupe lance l'audio automatiquement.
   */
  group?: string;
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
        { kind: 'listen-pic-tf',  count: 5,  instructionKey: 'hsk.i.picTf' },
        { kind: 'listen-pic-mcq', count: 5,  instructionKey: 'hsk.i.picMcq' },
        { kind: 'listen-mcq',     count: 5,  instructionKey: 'hsk.i.lmcq' },
        { kind: 'listen-mcq',     count: 5,  instructionKey: 'hsk.i.lmcq' },
      ]},
      { id: 'reading', minutes: 17, points: 100, parts: [
        { kind: 'read-pic-tf',  count: 5,  instructionKey: 'hsk.i.readPicTf' },
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
        { kind: 'listen-pic-tf',    count: 10, instructionKey: 'hsk.i.picTf' },
        { kind: 'listen-mcq',       count: 10, instructionKey: 'hsk.i.lmcq' },
        { kind: 'listen-mcq',       count: 10, instructionKey: 'hsk.i.lmcq' },
        { kind: 'listen-mcq',       count: 5,  instructionKey: 'hsk.i.lmcq' },
      ]},
      { id: 'reading', minutes: 22, points: 100, parts: [
        { kind: 'read-pic-match', count: 5,  instructionKey: 'hsk.i.picMatch' },
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
        { kind: 'listen-dialogue',  count: 10, instructionKey: 'hsk.i.ldlg' },
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
        { kind: 'listen-dialogue',  count: 20, instructionKey: 'hsk.i.ldlg' },
      ]},
      { id: 'reading', minutes: 40, points: 100, parts: [
        // Le vrai HSK 4 met le 排序 en deuxième partie de lecture.
        { kind: 'read-cloze',   count: 10, instructionKey: 'hsk.i.cloze' },
        { kind: 'read-sort',    count: 10, instructionKey: 'hsk.i.sort' },
        { kind: 'read-passage', count: 20, instructionKey: 'hsk.i.passage' },
      ]},
      { id: 'writing', minutes: 25, points: 100, parts: [
        // Le vrai HSK 4 : 连词成句 puis 看图用词造句.
        { kind: 'write-order', count: 10, instructionKey: 'hsk.i.order' },
        { kind: 'write-pic',   count: 5,  instructionKey: 'hsk.i.pic' },
      ]},
    ],
  },
  hsk5: {
    // 100 questions · 125 min · 300 pts · admis à 180
    minutes: 125, passMark: 180,
    sections: [
      { id: 'listening', minutes: 30, points: 100, parts: [
        { kind: 'listen-mcq',      count: 20, instructionKey: 'hsk.i.lmcq' },
        { kind: 'listen-dialogue', count: 25, instructionKey: 'hsk.i.ldlg' },
      ]},
      { id: 'reading', minutes: 45, points: 100, parts: [
        { kind: 'read-cloze', count: 15, instructionKey: 'hsk.i.cloze' },
        { kind: 'read-match', count: 10, instructionKey: 'hsk.i.match' },
        { kind: 'read-long',  count: 20, instructionKey: 'hsk.i.long' },
      ]},
      { id: 'writing', minutes: 40, points: 100, parts: [
        // Le vrai HSK 5 : item 99 rédigé sur thème, item 100 sur image.
        { kind: 'write-order', count: 8, instructionKey: 'hsk.i.order' },
        { kind: 'write-essay', count: 1, instructionKey: 'hsk.i.essay80' },
        { kind: 'write-pic',   count: 1, instructionKey: 'hsk.i.pic' },
      ]},
    ],
  },
  hsk6: {
    // 101 questions · 140 min · 300 pts · admis à 180.
    // Le compte impair vient de la rédaction : une seule tâche, le résumé.
    minutes: 140, passMark: 180,
    sections: [
      { id: 'listening', minutes: 35, points: 100, parts: [
        { kind: 'listen-mcq',      count: 15, instructionKey: 'hsk.i.lmcq' },
        { kind: 'listen-mcq',      count: 15, instructionKey: 'hsk.i.lmcq' },
        { kind: 'listen-dialogue', count: 20, instructionKey: 'hsk.i.ldlg' },
      ]},
      { id: 'reading', minutes: 50, points: 100, parts: [
        // Le 病句 est l'exercice signature de la lecture HSK 6, en 1re partie.
        { kind: 'read-bingju', count: 10, instructionKey: 'hsk.i.bingju' },
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

/**
 * Phrase d'exemple aplatie, avec le mot dont elle provient.
 *
 * Ce sont les PHRASES qui portent l'épreuve, pas les mots isolés : au HSK on
 * n'écoute jamais un mot nu, on écoute un énoncé. La première version tirait
 * un mot pour l'audio et une phrase d'exemple d'un AUTRE mot pour l'habillage,
 * d'où des copies incohérentes (« 妹妹来了。 » glosé « shūdiàn »).
 */
interface ExampleSrc {
  hanzi: string; pinyin: string; translation: string;
  level: string;
  ownerHanzi: string; ownerPinyin: string; ownerTranslation: string;
}

/** Niveaux de lecture assez avancés pour les textes longs du HSK 5-6. */
const ADV_LEVELS = new Set(['b2.1', 'b2.2', 'c1.1', 'c1.2', 'c2.1', 'c2.2']);
/** Niveaux dont les textes fournissent les triplets du 排序 (HSK 4). */
const SORT_LEVELS = new Set(['a2', 'b1.1', 'b1.2', 'b2.1']);

/** Découpe un texte en phrases, sans regex à lookbehind (Hermes). */
function splitSentences(text: string): string[] {
  const out: string[] = [];
  let buf = '';
  for (const ch of text.replace(/\n+/g, '')) {
    buf += ch;
    if (ch === '。' || ch === '！' || ch === '？') { out.push(buf.trim()); buf = ''; }
  }
  if (buf.trim()) out.push(buf.trim());
  return out;
}

/**
 * Quand la matière spécialisée manque (pas assez de mots illustrés, pas de
 * textes pour le 排序…), la partie retombe sur l'exercice équivalent sans
 * matériel : mieux vaut une vraie question d'un autre type qu'un trou.
 */
const KIND_FALLBACK: Partial<Record<ItemKind, ItemKind>> = {
  'listen-pic-tf': 'listen-truefalse',
  'listen-pic-mcq': 'listen-mcq',
  'read-pic-tf': 'read-truefalse',
  'read-pic-match': 'read-match',
  'read-sort': 'read-passage',
  'read-bingju': 'read-cloze',
};

/** Dialogue de l'app, aplati pour l'épreuve d'écoute. */
export interface ExamDialogue {
  id: string;
  level: string;
  /** Répliques en hanzi, dans l'ordre — jouées l'une après l'autre. */
  lines: string[];
  questions: { questionFr: string; choicesFr: string[]; correct: number }[];
}

export function generateExam(
  level: HskLevel,
  vocab: VocabEntry[],
  longTexts: LongText[] = [],
  bingju: BingjuItem[] = [],
  examDialogues: ExamDialogue[] = [],
): Exam {
  const plan = BLUEPRINT[level];
  const allowed = new Set(levelsUpTo(level));
  const pool = shuffle(vocab.filter(v => allowed.has(v.level)));

  // À partir du HSK 3, les réponses de lecture sont en CHINOIS, comme à
  // l'examen : lire quatre phrases en caractères est l'épreuve elle-même.
  // Aux niveaux 1-2, on garde les traductions (et le pinyin est affiché,
  // comme sur les vrais sujets HSK 1).
  const zhChoices = level !== 'hsk1' && level !== 'hsk2';

  // Mots illustrables (HSK 1-2) : ceux qui ont un pictogramme.
  const picPool = shuffle(pool.filter(v => HSK_EMOJI[v.hanzi]));
  let pCur = 0;
  const nextPic = () => picPool[pCur++ % Math.max(1, picPool.length)];
  /** Un mot-leurre visuellement discernable : aucun caractère commun. */
  const picFoil = (v: VocabEntry): VocabEntry | undefined => {
    for (let k = 0; k < picPool.length; k++) {
      const cand = picPool[(pCur + k) % picPool.length];
      if (cand.hanzi !== v.hanzi && ![...cand.hanzi].some(ch => v.hanzi.includes(ch))) return cand;
    }
    return undefined;
  };

  // Triplets de phrases consécutives pour le 排序 : l'ordre original d'un
  // texte écrit est la seule « bonne réponse » qui ne se discute pas.
  const triples: string[][] = [];
  for (const lt of shuffle(longTexts.filter(t => SORT_LEVELS.has(t.level)))) {
    const sents = splitSentences(stripPinyin(lt.text)).filter(x => x.length >= 6 && x.length <= 42);
    for (let k = 0; k + 3 <= sents.length; k += 3) triples.push(sents.slice(k, k + 3));
  }
  let triCur = 0;

  const bingjuPool = shuffle(bingju);
  let bCur = 0;

  // Dialogues consommés question après question, groupés par dialogue :
  // à l'examen, un dialogue est joué puis ses questions s'enchaînent.
  const dlgPool = shuffle(examDialogues.filter(d => d.questions.length > 0));
  let dlgCur = 0, dlgQ = 0;

  // Dictionnaire de segmentation du 连词成句 : découpage au mot réel par
  // plus-longue-correspondance, au lieu d'aveugles blocs de deux caractères.
  const dict = new Set(pool.map(v => v.hanzi).filter(h => h.length >= 2 && h.length <= 4));
  const segmentWords = (clean: string): string[] => {
    const segs: string[] = [];
    let i = 0;
    while (i < clean.length) {
      let m = '';
      for (const L of [4, 3, 2]) {
        const sub = clean.slice(i, i + L);
        if (sub.length === L && dict.has(sub)) { m = sub; break; }
      }
      if (!m) m = clean[i];
      segs.push(m);
      i += m.length;
    }
    // Trop de segments rend l'assemblage fastidieux : on fusionne les
    // monosyllabes adjacents jusqu'à revenir à six blocs au plus.
    while (segs.length > 6) {
      let best = 0;
      for (let k = 1; k + 1 < segs.length; k++) {
        if (segs[k].length + segs[k + 1].length < segs[best].length + segs[best + 1].length) best = k;
      }
      segs.splice(best, 2, segs[best] + segs[best + 1]);
    }
    return segs;
  };

  const sentences: ExampleSrc[] = shuffle(pool.flatMap(v =>
    (v.examples ?? []).slice(0, 1).map(ex => ({
      hanzi: ex.hanzi, pinyin: ex.pinyin, translation: ex.translation,
      level: v.level,
      ownerHanzi: v.hanzi, ownerPinyin: v.pinyin, ownerTranslation: v.translation,
    }))).filter(e =>
      // De vraies phrases seulement : les « exemples » de moins de quatre
      // caractères sont des fragments (穿鞋, 在右边), une traduction à
      // barre oblique est une glose de dictionnaire, et une « traduction »
      // contenant des caractères chinois est une entrée cassée ou une note
      // sur un caractère (乙, 氵) — dans tous les cas, pas un énoncé.
      e.hanzi && e.hanzi.length >= 4 &&
      e.translation && !e.translation.includes('/') &&
      !/[一-鿿]/.test(e.translation)));

  // Phrases à trou : le mot doit apparaître tel quel dans SA phrase, et la
  // phrase doit être assez longue pour que le trou laisse du contexte.
  const clozeables = sentences.filter(e =>
    e.hanzi.includes(e.ownerHanzi) && e.hanzi.length >= e.ownerHanzi.length + 3);

  let seq = 0;
  const nextId = () => `q${++seq}`;

  // Curseurs sur les viviers mélangés : chaque item consomme une entrée
  // NEUVE au lieu de retomber sur les mêmes par arithmétique d'indices.
  let wCur = 0, sCur = 0, cCur = 0;
  const nextWord = () => pool[wCur++ % Math.max(1, pool.length)];
  const nextSentence = () => sentences[sCur++ % Math.max(1, sentences.length)];
  const nextCloze = () => clozeables[cCur++ % Math.max(1, clozeables.length)];

  // Les passages sont consommés dans l'ordre, question après question, pour
  // qu'un même texte porte bien ses 4-5 questions comme à l'examen. Seuls
  // les textes avancés ont la densité attendue en HSK 5-6.
  const longPool = shuffle(longTexts.filter(t => ADV_LEVELS.has(t.level)));
  let longCursor = 0, longQ = 0;

  /**
   * n candidats choisis pour RESSEMBLER à la bonne réponse.
   *
   * Un distracteur tiré au hasard dans tout le dictionnaire se reconnaît sans
   * comprendre la question : entre « librairie », « petit frère » et « aller
   * au travail », le bon choix saute aux yeux par sa seule forme. On score
   * donc la proximité (même niveau, même gabarit) avec un peu de bruit pour
   * que deux épreuves ne se ressemblent pas, et on garde les mieux notés.
   */
  const pickClosest = <T,>(
    cands: T[], score: (x: T) => number, key: (x: T) => string,
    exclude: string, n: number,
  ): T[] => {
    const seen = new Set([exclude]);
    return cands
      .filter(x => { const k = key(x); if (seen.has(k)) return false; seen.add(k); return true; })
      .map(x => ({ x, s: score(x) + Math.random() * 0.8 }))
      .sort((a, b) => b.s - a.s)
      .slice(0, n)
      .map(o => o.x);
  };

  /**
   * Traits SAILLANTS d'une traduction : ceux qu'on repère d'un coup d'œil,
   * sans lire. Si la bonne réponse est la seule question du lot, ou la seule
   * à contenir un nombre, on répond juste sans avoir rien compris — c'est
   * exactement ce qui rendait l'épreuve trop facile.
   */
  const traits = (s: string) => ({
    question: /\?/.test(s),
    exclam: /!/.test(s),
    negation: /\b(ne |n'|pas|jamais|rien|personne|aucun)/i.test(s),
    number: /\d|\b(un|une|deux|trois|quatre|cinq|six|sept|huit|neuf|dix|onze|douze|vingt|trente|cent|mille|demi|premier|première|deuxième)\b/i.test(s),
    firstPerson: /\b(je|j'|nous|mon|ma|mes|notre|nos)\b/i.test(s),
    past: /\b(ai |as |a |avons |avez |ont |étais|était|étions|étaient|hier|dernier|dernière)\b/i.test(s),
    future: /\b(vais|vas|va|allons|allez|vont|demain|prochain|prochaine)\b/i.test(s),
  });
  type Traits = ReturnType<typeof traits>;
  const TRAIT_KEYS = ['question', 'exclam', 'negation', 'number', 'firstPerson', 'past', 'future'] as const;

  /** Nombre de traits saillants partagés — le nerf de la difficulté. */
  const traitMatch = (a: Traits, b: Traits) =>
    TRAIT_KEYS.reduce((n, k) => n + (a[k] === b[k] ? 1 : 0), 0);

  /**
   * Traductions de phrases voisines. Le score privilégie, dans l'ordre :
   * les mêmes traits saillants (une question appelle des questions, une
   * phrase chiffrée appelle des phrases chiffrées), puis le niveau, puis
   * une longueur comparable. Il faut lire pour départager — comme à l'examen.
   */
  const sentenceDistractors = (ex: ExampleSrc, n = 3): string[] => {
    const t = traits(ex.translation);
    const picked = pickClosest(sentences, o =>
        traitMatch(traits(o.translation), t) * 2.2 +
        (o.level === ex.level ? 2 : 0) +
        Math.max(0, 3 - Math.abs(o.translation.length - ex.translation.length) / 6),
      o => o.translation, ex.translation, n).map(o => o.translation);
    return ensureNoGiveaway(ex.translation, picked, traits,
      TRAIT_KEYS as readonly string[], sentences.map(s => s.translation));
  };

  /**
   * Filet de sécurité : aucun trait ne doit désigner la bonne réponse à lui
   * seul. Si la cible est la SEULE question du lot (ou la seule à contenir un
   * nombre, une négation…), on remplace le distracteur le plus faible par un
   * candidat qui porte ce trait. Sans quoi il suffit de repérer le point
   * d'interrogation pour répondre juste sans rien comprendre.
   */
  function ensureNoGiveaway<T extends Record<string, boolean>>(
    correct: string,
    picked: string[],
    traitsOf: (s: string) => T,
    keys: readonly string[],
    pool: string[],
  ): string[] {
    const out = [...picked];
    const ct = traitsOf(correct) as Record<string, boolean>;
    for (const k of keys) {
      if (!ct[k]) continue;                                  // trait absent : rien à masquer
      if (out.some(o => (traitsOf(o) as Record<string, boolean>)[k])) continue; // déjà partagé
      const taken = new Set([correct, ...out]);
      const cand = pool.find(p =>
        !taken.has(p) && (traitsOf(p) as Record<string, boolean>)[k] &&
        Math.abs(p.length - correct.length) < 30);
      if (cand) out[out.length - 1] = cand;                  // le dernier est le moins bien noté
    }
    return out;
  }

  /** Mots chinois voisins (même longueur d'abord, même niveau ensuite). */
  const hanziDistractors = (w: { hanzi: string; pinyin: string; level: string }, n = 3): string[] =>
    pickClosest(pool, o =>
        (o.hanzi.length === w.hanzi.length ? 3 : 0) +
        (o.level === w.level ? 1 : 0) +
        (o.pinyin?.[0] === w.pinyin?.[0] ? 1 : 0),
      o => o.hanzi, w.hanzi, n).map(o => o.hanzi);

  /**
   * Phrases chinoises voisines — pour les choix en caractères du HSK 3+.
   * Mêmes traits saillants côté chinois : une question (吗/呢/什么…) appelle
   * des questions, une phrase chiffrée appelle des phrases chiffrées, et un
   * caractère commun avec la cible rend le choix vraiment disputé.
   */
  const zhTraits = (s: string) => ({
    question: /[？?]|吗|呢|什么|哪|谁|几|怎么|为什么/.test(s),
    negation: /[不没别]/.test(s),
    number: /[0-9一二三四五六七八九十百千万两半]/.test(s),
    past: /[了过]/.test(s),
    future: /会|要|将|明天|下[个周月年]/.test(s),
  });
  const ZH_KEYS = ['question', 'negation', 'number', 'past', 'future'] as const;

  const hanziSentenceDistractors = (ex: ExampleSrc, n = 3): string[] => {
    const t = zhTraits(ex.hanzi);
    const chars = new Set([...ex.hanzi]);
    const picked = pickClosest(sentences, o => {
        const ot = zhTraits(o.hanzi);
        const shared = [...o.hanzi].filter(ch => chars.has(ch)).length;
        return ZH_KEYS.reduce((n2, k) => n2 + (ot[k] === t[k] ? 2.2 : 0), 0) +
          Math.min(3, shared * 0.8) +
          (o.level === ex.level ? 2 : 0) +
          Math.max(0, 3 - Math.abs(o.hanzi.length - ex.hanzi.length) / 3);
      }, o => o.hanzi, ex.hanzi, n).map(o => o.hanzi);
    return ensureNoGiveaway(ex.hanzi, picked, zhTraits,
      ZH_KEYS as readonly string[], sentences.map(s => s.hanzi));
  };

  const build = (rawKind: ItemKind | 'read-truefalse', count: number): ExamItem[] => {
    const out: ExamItem[] = [];
    // Repli si la matière spécialisée manque dans le vivier.
    let kind = rawKind as ItemKind;
    if ((kind === 'listen-pic-tf' || kind === 'listen-pic-mcq' ||
         kind === 'read-pic-tf' || kind === 'read-pic-match') && picPool.length < 8) {
      kind = KIND_FALLBACK[kind]!;
    }
    if (kind === 'read-sort' && triples.length < 3) kind = KIND_FALLBACK['read-sort']!;
    if (kind === 'read-bingju' && bingjuPool.length === 0) kind = KIND_FALLBACK['read-bingju']!;
    if (kind === 'listen-dialogue' && dlgPool.length === 0) kind = 'listen-mcq';

    // Moitié vrai, moitié faux — mais dans un ordre imprévisible : une
    // alternance stricte se remarque en trois questions.
    const truth = shuffle(Array.from({ length: count }, (_, k) => k % 2 === 0));
    for (let i = 0; i < count; i++) {
      if (kind === 'listen-pic-tf' || kind === 'read-pic-tf') {
        // Un mot, un pictogramme : correspondent-ils ? Le leurre ne partage
        // aucun caractère avec le mot — pas de 汽车 illustré par un taxi.
        const v = nextPic();
        const foil = picFoil(v);
        const truthful = truth[i] || !foil;
        const pictured = truthful ? v : foil!;
        out.push({
          id: nextId(), kind,
          prompt: v.hanzi, pinyin: v.pinyin,
          question: '',
          image: HSK_EMOJI[pictured.hanzi],
          imageKey: pictured.hanzi,
          choices: ['✓', '✗'],
          correctIndex: truthful ? 0 : 1,
          explanation: `${v.hanzi} (${v.pinyin}) = ${v.translation} ${HSK_EMOJI[v.hanzi]}`,
        });
      } else if (kind === 'listen-pic-mcq') {
        // On écoute un mot, on choisit son image parmi quatre.
        const v = nextPic();
        const foilWords: VocabEntry[] = [];
        for (let k = 0; k < picPool.length && foilWords.length < 3; k++) {
          const cand = picPool[(pCur + k) % picPool.length];
          if (cand.hanzi !== v.hanzi &&
              ![...cand.hanzi].some(ch => v.hanzi.includes(ch)) &&
              !foilWords.some(f => f.hanzi === cand.hanzi)) {
            foilWords.push(cand);
          }
        }
        // Emoji et hanzi voyagent appariés : chaque choix sait quel mot il
        // représente, pour afficher la photo réelle quand elle existe.
        const pairs = shuffle([v, ...foilWords]);
        out.push({
          id: nextId(), kind,
          prompt: v.hanzi, pinyin: v.pinyin,
          question: '',
          choices: pairs.map(p => HSK_EMOJI[p.hanzi]),
          choiceImageKeys: pairs.map(p => p.hanzi),
          correctIndex: pairs.findIndex(p => p.hanzi === v.hanzi),
          explanation: `${v.hanzi} (${v.pinyin}) = ${v.translation} ${HSK_EMOJI[v.hanzi]}`,
        });
      } else if (kind === 'read-pic-match') {
        // Une image, quatre mots chinois.
        const v = nextPic();
        const choices = shuffle([v.hanzi, ...hanziDistractors(v)]);
        out.push({
          id: nextId(), kind,
          prompt: '',
          question: '',
          image: HSK_EMOJI[v.hanzi],
          imageKey: v.hanzi,
          choices,
          correctIndex: choices.indexOf(v.hanzi),
          explanation: `${HSK_EMOJI[v.hanzi]} = ${v.hanzi} (${v.pinyin}) — ${v.translation}`,
        });
      } else if (kind === 'read-sort') {
        // 排序 : trois phrases consécutives d'un même texte, étiquetées dans
        // le désordre ; on choisit la séquence qui restitue l'original.
        const tri = triples[triCur++ % triples.length];
        const labels = ['A', 'B', 'C'];
        const order = shuffle([0, 1, 2]);           // position affichée → phrase d'origine
        const prompt = order.map((oi, k) => `${labels[k]}. ${tri[oi]}`).join('\n');
        const correctSeq = [0, 1, 2].map(j => labels[order.indexOf(j)]).join(' → ');
        const allPerms = ['ABC', 'ACB', 'BAC', 'BCA', 'CAB', 'CBA']
          .map(p => p.split('').join(' → '));
        const wrong = shuffle(allPerms.filter(p => p !== correctSeq)).slice(0, 3);
        const choices = shuffle([correctSeq, ...wrong]);
        out.push({
          id: nextId(), kind,
          prompt,
          question: '',
          choices,
          correctIndex: choices.indexOf(correctSeq),
          explanation: tri.join(''),
        });
      } else if (kind === 'read-bingju') {
        // 病句 : items écrits à la main — la fautive est sentences[0].
        const bg = bingjuPool[bCur++ % bingjuPool.length];
        const choices = shuffle([...bg.sentences]);
        out.push({
          id: nextId(), kind,
          prompt: '',
          question: '',
          choices,
          correctIndex: choices.indexOf(bg.sentences[0]),
          explanation: bg.explanationFr,
        });
      } else if (kind === 'listen-truefalse' || kind === 'read-truefalse') {
        // On entend (ou lit) une phrase complète ; l'affirmation est une
        // traduction de phrase — la vraie, ou celle d'une phrase voisine.
        const ex = nextSentence();
        if (!ex) continue;
        const truthful = truth[i];
        const claim = truthful ? ex.translation : (sentenceDistractors(ex, 1)[0] ?? ex.translation);
        out.push({
          id: nextId(), kind: kind as ItemKind,
          prompt: ex.hanzi, pinyin: ex.pinyin,
          question: claim,
          choices: ['✓', '✗'],
          correctIndex: truthful ? 0 : 1,
          explanation: `${ex.hanzi} — ${ex.translation}`,
        });
      } else if (kind === 'listen-mcq') {
        const ex = nextSentence();
        if (!ex) continue;
        const choices = shuffle([ex.translation, ...sentenceDistractors(ex)]);
        out.push({
          id: nextId(), kind,
          prompt: ex.hanzi, pinyin: ex.pinyin,
          question: '',
          choices,
          correctIndex: choices.indexOf(ex.translation),
          explanation: `${ex.hanzi} — ${ex.translation}`,
        });
      } else if (kind === 'listen-dialogue') {
        const d = dlgPool[dlgCur % dlgPool.length];
        const q = d.questions[dlgQ % d.questions.length];
        dlgQ++;
        if (dlgQ >= d.questions.length) { dlgQ = 0; dlgCur++; }
        out.push({
          id: nextId(), kind,
          prompt: d.lines.join('\n'),
          question: q.questionFr,
          choices: q.choicesFr,
          correctIndex: q.correct,
          explanation: q.choicesFr[q.correct],
          audioLines: d.lines,
          group: `dlg-${d.id}`,
        });
      } else if (kind === 'write-pic') {
        // 看图用词造句 : une photo, un mot imposé, une phrase à écrire.
        const v = nextPic();
        if (!v) continue;
        out.push({
          id: nextId(), kind,
          prompt: v.hanzi, pinyin: v.pinyin,
          question: '',
          image: HSK_EMOJI[v.hanzi],
          imageKey: v.hanzi,
          choices: [],
          correctIndex: -1,
          explanation: `${v.hanzi} (${v.pinyin}) — ${v.translation}`,
        });
      } else if (kind === 'read-cloze') {
        // Phrase à trou : le trou est VISIBLE, la réponse est en CHINOIS, et
        // le pinyin est tu — il désignerait la bonne case directement.
        const ex = nextCloze();
        if (!ex) continue;
        const choices = shuffle([ex.ownerHanzi,
          ...hanziDistractors({ hanzi: ex.ownerHanzi, pinyin: ex.ownerPinyin, level: ex.level })]);
        out.push({
          id: nextId(), kind,
          prompt: ex.hanzi.replace(ex.ownerHanzi, '＿＿＿'),
          question: ex.translation,
          choices,
          correctIndex: choices.indexOf(ex.ownerHanzi),
          explanation: `${ex.hanzi} — ${ex.translation} (${ex.ownerHanzi} ${ex.ownerPinyin} = ${ex.ownerTranslation})`,
        });
      } else if (kind === 'read-match' || kind === 'read-passage') {
        const ex = nextSentence();
        if (!ex) continue;
        if (zhChoices) {
          // HSK 3+ : comme à l'examen, on LIT du chinois pour répondre — la
          // consigne est en français, les quatre propositions en caractères,
          // sans pinyin.
          const choices = shuffle([ex.hanzi, ...hanziSentenceDistractors(ex)]);
          out.push({
            id: nextId(), kind,
            prompt: ex.translation,
            question: '',
            choices,
            correctIndex: choices.indexOf(ex.hanzi),
            explanation: `${ex.hanzi} (${ex.pinyin}) — ${ex.translation}`,
          });
        } else {
          // HSK 1-2 : phrase chinoise avec pinyin, traductions en face —
          // toutes des phrases, un seul choix « long » trahirait la réponse.
          const choices = shuffle([ex.translation, ...sentenceDistractors(ex)]);
          out.push({
            id: nextId(), kind,
            prompt: ex.hanzi, pinyin: ex.pinyin,
            question: ex.hanzi,
            choices,
            correctIndex: choices.indexOf(ex.translation),
            explanation: `${ex.hanzi} — ${ex.translation}`,
          });
        }
      } else if (kind === 'write-order') {
        // 连词成句 en construction LIBRE : on touche les segments dans
        // l'ordre, comme on écrirait la phrase — plus de QCM d'ordres.
        // Le découpage suit le dictionnaire (plus-longue-correspondance),
        // pas des blocs aveugles de deux caractères.
        const ex = nextSentence();
        const w = nextWord();
        const src = ex ?? { hanzi: w.hanzi, pinyin: w.pinyin, translation: w.translation };
        const clean = src.hanzi.replace(/[。！？，、]/g, '');
        const segs = segmentWords(clean);
        let shuffled = shuffle(segs);
        // Un mélange qui retombe sur l'ordre original n'exerce rien.
        for (let a = 0; a < 8 && shuffled.join('') === clean && segs.length > 1; a++) {
          shuffled = shuffle(segs);
        }
        out.push({
          id: nextId(), kind,
          prompt: '', pinyin: src.pinyin,
          question: src.translation,
          segments: shuffled,
          choices: [clean],
          correctIndex: 0,
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
        const w = nextWord();
        out.push({
          id: nextId(), kind,
          prompt: theme?.titleZh ?? w.hanzi,
          question: level === 'hsk6' ? stripPinyin(theme?.text ?? '') : (theme?.titleZh ?? w.hanzi),
          choices: [],
          correctIndex: -1,
          explanation: '',
        });
      } else {
        // write-char : le pinyin est donné, on choisit le bon caractère parmi
        // des voisins du même gabarit (même nombre de caractères, même
        // initiale si possible) — pas parmi trois mots sans rapport.
        const w = nextWord();
        const choices = shuffle([w.hanzi, ...hanziDistractors(w)]);
        out.push({
          id: nextId(), kind: 'write-char',
          prompt: w.pinyin, pinyin: w.pinyin,
          question: w.translation,
          choices,
          correctIndex: choices.indexOf(w.hanzi),
          explanation: `${w.pinyin} → ${w.hanzi} (${w.translation})`,
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
