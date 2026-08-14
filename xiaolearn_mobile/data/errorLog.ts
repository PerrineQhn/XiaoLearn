/**
 * Journal des erreurs — « Mes erreurs ».
 *
 * L'écran `app/erreurs.tsx` lisait `@xiaolearn/exercise_errors` depuis le
 * début, mais rien n'écrivait jamais dans cette clé : la page était vide par
 * construction. Ce module est le point d'écriture qui manquait, et il est
 * volontairement libre de tout hook pour pouvoir être appelé depuis n'importe
 * quel écran.
 *
 * Ce qu'on consigne : une réponse fausse à un exercice de leçon, une correction
 * de Prof. Xiao, un mot raté en dictée. Ce qu'on ne consigne pas : les
 * mini-jeux rapides, où l'on rate par manque de temps plus que par
 * incompréhension, et où le volume noierait le reste.
 */
import AsyncStorage from '@react-native-async-storage/async-storage';

export const ERRORS_KEY = '@xiaolearn/exercise_errors';

/** Provenance, pour pouvoir filtrer et afficher la bonne étiquette. */
export type ErrorSource = 'lesson' | 'chat' | 'dictation' | 'hsk';

export interface ErrorEntry {
  /** Identifiant stable : deux fautes identiques ne font qu'une entrée. */
  exerciseId: string;
  source: ErrorSource;
  lessonId: string;
  /** Titre de leçon, ou « Prof. Xiao » / « Dictée » selon la provenance. */
  lessonTitle: string;
  prompt: string;
  correctAnswer: string;
  userAnswer: string;
  /** Hanzi à prononcer si l'entrée mérite un bouton d'écoute. */
  audioHanzi?: string;
  /** Explication de la correction, quand la source en fournit une. */
  explanation?: string;
  timestamp: number;
}

/**
 * Plafond du journal. Au-delà, les plus anciennes sautent : une liste sans fin
 * n'est plus une liste de révision, et le blob est relu à chaque ouverture.
 */
const MAX_ENTRIES = 200;

async function readAll(): Promise<ErrorEntry[]> {
  const raw = await AsyncStorage.getItem(ERRORS_KEY).catch(() => null);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as ErrorEntry[]) : [];
  } catch {
    return [];
  }
}

/**
 * File d'attente d'écriture.
 *
 * Chaque enregistrement fait un lire-modifier-écrire. Deux appels lancés sans
 * s'attendre lisent donc le MÊME état de départ, et la seconde écriture écrase
 * la première : en envoyant dix fautes d'un coup depuis la copie du simulateur
 * HSK, une seule arrivait dans le journal. Toutes les écritures passent
 * désormais par cette chaîne de promesses, qui les sérialise.
 */
let writeQueue: Promise<unknown> = Promise.resolve();
function enqueue<T>(job: () => Promise<T>): Promise<T> {
  const run = writeQueue.then(job, job);
  writeQueue = run.catch(() => {});
  return run;
}

/**
 * Consigne une erreur. Une entrée de même `exerciseId` est remplacée plutôt que
 * dupliquée — refaire deux fois la même faute doit remonter l'entrée en tête,
 * pas allonger la liste.
 */
export async function logError(entry: Omit<ErrorEntry, 'timestamp'>): Promise<void> {
  return logErrors([entry]);
}

/**
 * Consigne PLUSIEURS erreurs en une seule écriture — le cas de la copie d'une
 * épreuve blanche, où l'on verse toutes ses fautes d'un geste.
 */
export async function logErrors(entries: Omit<ErrorEntry, 'timestamp'>[]): Promise<void> {
  if (!entries.length) return;
  return enqueue(async () => {
    const all = await readAll();
    const ids = new Set(entries.map(e => e.exerciseId));
    const now = Date.now();
    const next = [
      ...all.filter(e => !ids.has(e.exerciseId)),
      // Un décalage d'une milliseconde par entrée préserve l'ordre d'ajout
      // quand la liste est triée par date.
      ...entries.map((e, i) => ({ ...e, timestamp: now + i })),
    ].slice(-MAX_ENTRIES);
    await AsyncStorage.setItem(ERRORS_KEY, JSON.stringify(next)).catch(() => {});
  });
}

/** Retire une erreur — utilisé quand on la révise avec succès. */
export async function clearError(exerciseId: string): Promise<void> {
  return enqueue(async () => {
    const all = await readAll();
    await AsyncStorage.setItem(
      ERRORS_KEY,
      JSON.stringify(all.filter(e => e.exerciseId !== exerciseId)),
    ).catch(() => {});
  });
}

export async function readErrors(): Promise<ErrorEntry[]> {
  return readAll();
}
