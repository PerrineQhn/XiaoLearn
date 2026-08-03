/**
 * minijeuxHelpers.ts — Données et utilitaires partagés pour les 5 mini-jeux
 */
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LEARN_SECTIONS, LearnSection } from './cecrLearnSections';
import { bumpDailyCounter } from '@/data/dailyGoals';

export const MINIJEUX_KEY = 'cl_minijeux_v1';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface VocabItem {
  hanzi: string;
  pinyin: string;
  meaning: string;
  meaningEn?: string;
}

/** Remplace meaning par la version anglaise si lang==='en' (fallback FR). */
export function localizeVocab(pool: VocabItem[], lang: 'fr' | 'en'): VocabItem[] {
  if (lang !== 'en') return pool;
  return pool.map(v => ({ ...v, meaning: v.meaningEn ?? v.meaning }));
}

export interface GameScore {
  bestScore: number;
  plays: number;
  bestTime?: number;   // secondes (Memory)
}

export interface MinijeuxProgress {
  memory:    GameScore;
  speedquiz: GameScore;
  falling:   GameScore;
  sentence:  GameScore;
  pinyin:    GameScore;
}

export type GameId = keyof MinijeuxProgress;

// ─── Helpers ──────────────────────────────────────────────────────────────────

export function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function pick<T>(arr: T[], n: number): T[] {
  return shuffle(arr).slice(0, n);
}

/** Vérifie qu'une string contient au moins un caractère CJK (vrai hanzi). */
function isRealHanzi(s: string): boolean {
  return /[一-鿿㐀-䶿豈-﫿]/.test(s);
}

/** Collecte tous les items vocab avec meaning d'au moins 3 chars. */
export function collectVocab(minMeaningLen = 3): VocabItem[] {
  const pool: VocabItem[] = [];
  for (const sections of Object.values(LEARN_SECTIONS)) {
    for (const section of sections) {
      if (section.items) {
        for (const item of section.items) {
          if (
            item.hanzi && isRealHanzi(item.hanzi) &&
            item.pinyin && item.meaning && item.meaning.length >= minMeaningLen
          ) {
            pool.push({ hanzi: item.hanzi, pinyin: item.pinyin, meaning: item.meaning, meaningEn: (item as any).meaningEn });
          }
        }
      }
    }
  }
  return pool;
}

/**
 * Collecte le vocab des leçons déjà complétées (cl_completed_lessons).
 * Retourne uniquement les mots des leçons validées — pas de fallback.
 */
export async function collectVocabFromCompleted(minMeaningLen = 3): Promise<VocabItem[]> {
  const raw = await AsyncStorage.getItem('cl_completed_lessons').catch(() => null);
  const completedIds: string[] = raw ? JSON.parse(raw) : [];

  const pool: VocabItem[] = [];
  for (const lessonId of completedIds) {
    const sections = LEARN_SECTIONS[lessonId];
    if (!sections) continue;
    for (const section of sections) {
      if (section.items) {
        for (const item of section.items) {
          if (item.hanzi && item.pinyin && item.meaning && item.meaning.length >= minMeaningLen) {
            pool.push({ hanzi: item.hanzi, pinyin: item.pinyin, meaning: item.meaning, meaningEn: (item as any).meaningEn });
          }
        }
      }
    }
  }

  // Déduplique par hanzi
  const seen = new Set<string>();
  return pool.filter(v => { if (seen.has(v.hanzi)) return false; seen.add(v.hanzi); return true; });
}

type SentenceItem = { zh: { text: string; pinyin: string }[]; fr: string; en: string };

function extractSentences(sectionsMap: Record<string, LearnSection[]>): SentenceItem[] {
  const sents: SentenceItem[] = [];
  for (const sections of Object.values(sectionsMap)) {
    for (const section of sections) {
      if (section.tokenizedSentences) {
        for (const s of section.tokenizedSentences) {
          const zhWords = s.zh.map(t => ({ text: t.text, pinyin: t.pinyin }));
          const fr = s.fr.map(t => t.text).join(' ');
          const en = (s as any).en ? (s as any).en.map((t: any) => t.text).join(' ') : fr;
          if (zhWords.length >= 3 && fr.trim().length > 0) {
            sents.push({ zh: zhWords, fr, en });
          }
        }
      }
    }
  }
  return sents;
}

/** Collecte les phrases tokenisées utilisables pour Sentence Builder. */
export function collectSentences(): SentenceItem[] {
  return extractSentences(LEARN_SECTIONS);
}

/** Version async : phrases des leçons complétées uniquement — pas de fallback. */
export async function collectSentencesFromCompleted(): Promise<SentenceItem[]> {
  const raw = await AsyncStorage.getItem('cl_completed_lessons').catch(() => null);
  const completedIds: string[] = raw ? JSON.parse(raw) : [];

  const filtered: typeof LEARN_SECTIONS = {};
  for (const id of completedIds) {
    if (LEARN_SECTIONS[id]) filtered[id] = LEARN_SECTIONS[id];
  }

  return extractSentences(filtered);
}

/**
 * Génère un QCM à partir d'un item : 1 correct + (n-1) distracteurs.
 * Retourne { item, choices, correctIndex }.
 */
export function generateMCQ(
  item: VocabItem,
  pool: VocabItem[],
  nChoices = 4,
): { item: VocabItem; choices: string[]; correctIndex: number } {
  const distractors = pool
    .filter(x => x.hanzi !== item.hanzi)
    .sort(() => Math.random() - 0.5)
    .slice(0, nChoices - 1)
    .map(x => x.meaning);
  const choices = shuffle([item.meaning, ...distractors]);
  return { item, choices, correctIndex: choices.indexOf(item.meaning) };
}

// ─── AsyncStorage ─────────────────────────────────────────────────────────────

const DEFAULT_SCORE: GameScore = { bestScore: 0, plays: 0 };

export async function loadProgress(): Promise<MinijeuxProgress> {
  const raw = await AsyncStorage.getItem(MINIJEUX_KEY);
  const saved = raw ? JSON.parse(raw) : {};
  return {
    memory:    { ...DEFAULT_SCORE, ...saved.memory },
    speedquiz: { ...DEFAULT_SCORE, ...saved.speedquiz },
    falling:   { ...DEFAULT_SCORE, ...saved.falling },
    sentence:  { ...DEFAULT_SCORE, ...saved.sentence },
    pinyin:    { ...DEFAULT_SCORE, ...saved.pinyin },
  };
}

export async function saveScore(
  gameId: GameId,
  score: number,
  extraFields: Partial<GameScore> = {},
): Promise<void> {
  const raw = await AsyncStorage.getItem(MINIJEUX_KEY);
  const saved: MinijeuxProgress = raw ? JSON.parse(raw) : {};
  const prev: GameScore = saved[gameId] ?? { ...DEFAULT_SCORE };
  const updated: GameScore = {
    ...prev,
    ...extraFields,
    bestScore: Math.max(prev.bestScore, score),
    plays: prev.plays + 1,
  };
  await AsyncStorage.setItem(MINIJEUX_KEY, JSON.stringify({ ...saved, [gameId]: updated }));
  // Objectif quotidien « mini-jeux » : saveScore est le seul point par lequel
  // passe une partie terminée, quel que soit le jeu.
  void bumpDailyCounter('game');
}
