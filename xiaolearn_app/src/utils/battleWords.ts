/**
 * battleWords.ts — génération du pool de mots pour une bataille (task #44)
 * -------------------------------------------------------------------------
 * À partir des items appris par l'utilisateur (typiquement
 * `lessonProgress.allLearnedItems`), construit un ensemble de `BattleWord`
 * prêts à être envoyés dans un match Firestore.
 *
 * Règles :
 *   - Déduplication par hanzi.
 *   - Chaque mot propose 4 choix :
 *       • la bonne traduction
 *       • 3 distractrices tirées d'autres items du même pool
 *   - Distractrices préférentiellement de la même catégorie / du même thème
 *     pour que le choix soit discriminant (pas "一" vs "merci").
 *   - Mélange des choix (Fisher-Yates sur 4 éléments).
 *   - Pool final mélangé et coupé à `maxWords` (défaut 30).
 *
 * Pure (aucune dep React / Firestore). Testable.
 */

import type { BattleWord, CommunityLanguage } from '../types/community';

export interface BattleWordSourceItem {
  id: string;
  hanzi: string;
  pinyin: string;
  /** Traduction FR. */
  translation: string;
  /** Traduction EN (facultative — sinon on fallback sur la FR). */
  translationEn?: string;
  /** Pour distracteurs "du même thème" (optionnel). */
  theme?: string;
  category?: string;
}

interface Options {
  language: CommunityLanguage;
  maxWords?: number;
  /** Seed optionnel pour rendre le shuffle reproductible (tests). */
  seed?: number;
}

// Mini-PRNG déterministe (mulberry32) — utilisé si un seed est fourni. Évite
// que deux devices génèrent exactement le même ordre quand on veut
// reproduction, mais reste fast.
const mulberry32 = (seed: number) => {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};

const shuffle = <T,>(arr: T[], rng: () => number): T[] => {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const pickTranslation = (
  item: BattleWordSourceItem,
  lang: CommunityLanguage
): string => {
  if (lang === 'en' && item.translationEn) return item.translationEn.trim();
  return item.translation.trim();
};

/**
 * Construit une liste de `BattleWord` à partir d'items de vocabulaire appris.
 * Retourne `[]` si < 4 items (on ne peut pas faire un QCM sinon).
 */
export const buildBattleWordPool = (
  items: BattleWordSourceItem[],
  opts: Options
): BattleWord[] => {
  const maxWords = Math.max(1, opts.maxWords ?? 30);
  const rng = opts.seed != null ? mulberry32(opts.seed) : Math.random;

  // Dédup par hanzi + filtre items incomplets.
  const unique = new Map<string, BattleWordSourceItem>();
  for (const it of items) {
    if (!it || !it.hanzi || !pickTranslation(it, opts.language)) continue;
    if (unique.has(it.hanzi)) continue;
    unique.set(it.hanzi, it);
  }
  const pool = Array.from(unique.values());
  if (pool.length < 4) return [];

  const translations = pool.map((p) => pickTranslation(p, opts.language));
  const translationSet = new Set(translations);

  const buildDistractors = (target: BattleWordSourceItem): string[] => {
    const targetTr = pickTranslation(target, opts.language);
    // Priorité : même theme/category, sinon global.
    const sameTheme = pool.filter(
      (p) => p.hanzi !== target.hanzi && p.theme && p.theme === target.theme
    );
    const sameCat = pool.filter(
      (p) =>
        p.hanzi !== target.hanzi && p.category && p.category === target.category
    );
    const rest = pool.filter((p) => p.hanzi !== target.hanzi);

    const picked = new Set<string>();
    const tryAdd = (candidates: BattleWordSourceItem[]) => {
      const shuffled = shuffle(candidates, rng);
      for (const c of shuffled) {
        if (picked.size >= 3) break;
        const tr = pickTranslation(c, opts.language);
        if (!tr || tr === targetTr || picked.has(tr)) continue;
        picked.add(tr);
      }
    };
    tryAdd(sameTheme);
    if (picked.size < 3) tryAdd(sameCat);
    if (picked.size < 3) tryAdd(rest);

    // Fallback ultime : remplir avec des items du set global si pas assez de
    // traductions uniques dans le pool (cas très petit vocab).
    if (picked.size < 3) {
      for (const t of shuffle(Array.from(translationSet), rng)) {
        if (picked.size >= 3) break;
        if (t === targetTr || picked.has(t)) continue;
        picked.add(t);
      }
    }

    return Array.from(picked);
  };

  const shuffledPool = shuffle(pool, rng).slice(0, maxWords);

  const words: BattleWord[] = [];
  for (const target of shuffledPool) {
    const correct = pickTranslation(target, opts.language);
    const distractors = buildDistractors(target);
    if (distractors.length < 3) continue; // pas assez de diversité, on skip
    const choicesRaw = [correct, ...distractors];
    const choices = shuffle(choicesRaw, rng);
    const correctIndex = choices.indexOf(correct);
    if (correctIndex < 0) continue;
    words.push({
      chinese: target.hanzi,
      pinyin: target.pinyin ?? '',
      correctIndex,
      choices
    });
  }

  return words;
};

/**
 * Pool minimaliste en fallback — utilisé si l'utilisateur n'a complété
 * aucune leçon mais souhaite voir à quoi ressemble la bataille (DEV/debug
 * ou première connexion). Vocabulaire HSK1 ultra basique.
 */
export const FALLBACK_BATTLE_POOL: BattleWordSourceItem[] = [
  { id: 'fb-nihao', hanzi: '你好', pinyin: 'nǐ hǎo', translation: 'bonjour', translationEn: 'hello' },
  { id: 'fb-xiexie', hanzi: '谢谢', pinyin: 'xièxie', translation: 'merci', translationEn: 'thank you' },
  { id: 'fb-zaijian', hanzi: '再见', pinyin: 'zàijiàn', translation: 'au revoir', translationEn: 'goodbye' },
  { id: 'fb-wo', hanzi: '我', pinyin: 'wǒ', translation: 'je / moi', translationEn: 'I / me' },
  { id: 'fb-ni', hanzi: '你', pinyin: 'nǐ', translation: 'tu / toi', translationEn: 'you' },
  { id: 'fb-ta', hanzi: '他', pinyin: 'tā', translation: 'il / lui', translationEn: 'he / him' },
  { id: 'fb-shui', hanzi: '水', pinyin: 'shuǐ', translation: 'eau', translationEn: 'water' },
  { id: 'fb-chifan', hanzi: '吃饭', pinyin: 'chī fàn', translation: 'manger', translationEn: 'to eat' },
  { id: 'fb-hen-hao', hanzi: '很好', pinyin: 'hěn hǎo', translation: 'très bien', translationEn: 'very good' },
  { id: 'fb-duibuqi', hanzi: '对不起', pinyin: 'duìbùqǐ', translation: 'pardon, désolé', translationEn: 'sorry' },
  { id: 'fb-yi', hanzi: '一', pinyin: 'yī', translation: 'un (1)', translationEn: 'one (1)' },
  { id: 'fb-er', hanzi: '二', pinyin: 'èr', translation: 'deux (2)', translationEn: 'two (2)' },
  { id: 'fb-san', hanzi: '三', pinyin: 'sān', translation: 'trois (3)', translationEn: 'three (3)' },
  { id: 'fb-jia', hanzi: '家', pinyin: 'jiā', translation: 'maison, famille', translationEn: 'home, family' },
  { id: 'fb-xuexi', hanzi: '学习', pinyin: 'xuéxí', translation: 'étudier', translationEn: 'to study' },
  { id: 'fb-zhongguo', hanzi: '中国', pinyin: 'Zhōngguó', translation: 'Chine', translationEn: 'China' }
];
