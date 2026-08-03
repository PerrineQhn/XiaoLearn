/**
 * useSrsData — SRS flashcards, format 100% compatible avec la web app
 * ─────────────────────────────────────────────────────────────────────
 * V2 multi-compétences (identique à useWordSRS.ts web) : chaque mot tracke
 * 3 compétences SRS indépendantes :
 *   - recognition   : 👁 voir le hanzi → comprendre (hanzi→fr, listening)
 *   - pronunciation : 🗣 produire oralement (fr→hanzi, micro, typing)
 *   - writing       : ✍️ tracer les caractères (HanziWriter)
 *
 * Shape `SrsEntry` : { id, skills: { recognition|pronunciation|writing:
 *   { level 0-6, dueAt, consecutiveAgain } }, lastReviewedAt, reviewCount }
 * Migration lazy V1→V2 : level/dueAt/consecutiveAgain historiques →
 * skills.recognition (identique au web).
 *
 * Intervalles (mêmes que web) : [24h, 48h, 96h, 192h, 384h, 768h, 1440h]
 *
 * Sync Firestore :
 *   - Au montage : lit AsyncStorage, puis Firestore (last-write-wins
 *     par timestamp `cl_word_srs_v1__updatedAt`), merge par entry PAR
 *     COMPÉTENCE (jamais de perte de progression)
 *   - Écoute temps réel onSnapshot pour sync cross-device
 *   - Sur save : AsyncStorage + Firestore en parallèle
 *
 * Clé Firestore : `users/{uid}.cl_word_srs_v1` (string JSON)
 */
import { useCallback, useEffect, useRef, useState, useMemo } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  readCustomCards, readOverrides, type CustomCard, type CardOverride,
} from '@/data/customCards';
import { CECR_LEVELS } from '@/data/cecrLevelsMeta';
import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';
import { db } from '@/firebase/config';
import { useAuth } from '@/contexts/AuthContext';
import { LEARN_SECTIONS } from '@/data/cecrLearnSections';

// ─── Types (identiques à useWordSRS.ts web V2) ───────────────────────────────

export type SrsSkill = 'recognition' | 'pronunciation' | 'writing';

export const SRS_SKILLS: readonly SrsSkill[] = ['recognition', 'pronunciation', 'writing'];

export interface SkillState {
  level: number;              // 0..6
  dueAt: number;              // epoch ms (0 = compétence jamais travaillée)
  consecutiveAgain: number;   // échecs consécutifs
}

export interface SrsEntry {
  id: string;
  skills: Record<SrsSkill, SkillState>;
  lastReviewedAt: number;    // epoch ms (toutes compétences confondues)
  reviewCount: number;       // toutes compétences confondues
  // Champs legacy V1 (conservés en lecture, plus jamais écrits)
  level?: number;
  dueAt?: number;
  consecutiveAgain?: number;
}

export type SrsState = Record<string, SrsEntry>;

// ─── Normalisation & migration V1→V2 (identique web) ────────────────────────

const emptySkill = (): SkillState => ({ level: 0, dueAt: 0, consecutiveAgain: 0 });

const toNum = (v: unknown): number => (typeof v === 'number' && Number.isFinite(v) ? v : 0);

const normalizeSkill = (raw: unknown): SkillState => {
  if (!raw || typeof raw !== 'object') return emptySkill();
  const s = raw as Partial<SkillState>;
  return {
    level: toNum(s.level),
    dueAt: toNum(s.dueAt),
    consecutiveAgain: toNum(s.consecutiveAgain),
  };
};

/** Convertit une entrée legacy V1 OU V2 vers le shape V2. */
export function normalizeEntry(id: string, raw: unknown): SrsEntry {
  const r = (raw && typeof raw === 'object' ? raw : {}) as Record<string, unknown>;
  const rawSkills = r.skills as Record<string, unknown> | undefined;
  let skills: Record<SrsSkill, SkillState>;
  if (rawSkills && typeof rawSkills === 'object') {
    skills = {
      recognition: normalizeSkill(rawSkills.recognition),
      pronunciation: normalizeSkill(rawSkills.pronunciation),
      writing: normalizeSkill(rawSkills.writing),
    };
  } else {
    // Shape V1 : level au top-level → attribué à recognition.
    skills = {
      recognition: {
        level: toNum(r.level),
        dueAt: toNum(r.dueAt),
        consecutiveAgain: toNum(r.consecutiveAgain),
      },
      pronunciation: emptySkill(),
      writing: emptySkill(),
    };
  }
  const entry: SrsEntry = {
    id,
    skills,
    lastReviewedAt: toNum(r.lastReviewedAt),
    reviewCount: toNum(r.reviewCount),
  };
  if (typeof r.level === 'number') entry.level = r.level;
  if (typeof r.dueAt === 'number') entry.dueAt = r.dueAt;
  if (typeof r.consecutiveAgain === 'number') entry.consecutiveAgain = r.consecutiveAgain;
  return entry;
}

function normalizeMap(raw: unknown): SrsState {
  if (!raw || typeof raw !== 'object') return {};
  const out: SrsState = {};
  for (const [id, entry] of Object.entries(raw as Record<string, unknown>)) {
    if (!entry || typeof entry !== 'object') continue;
    out[id] = normalizeEntry(id, entry);
  }
  return out;
}

export interface SrsCard {
  id: string;
  hanzi: string;
  pinyin: string;
  translation: string;
  translationEn?: string;
  sectionId: string;
  levelKey: string;
  levelLabel: string;
  levelColor: string;
}

export interface DeckStats {
  levelKey: string;
  levelLabel: string;
  levelColor: string;
  total: number;
  mastered: number;   // level >= 4
  learning: number;   // 0 < level < 4
  newCards: number;   // level === 0
  dueNow: number;     // dueAt <= now && level < 4
}

export interface SrsStats {
  totalCards: number;
  mastered: number;
  learning: number;
  newCards: number;
  dueNow: number;
  decks: DeckStats[];
}

// ─── Constantes (identiques à web) ───────────────────────────────────────────

/**
 * Section fictive des cartes personnalisées.
 *
 * Le filtre de visibilité exige `completedIds.has(sectionId)` ; les cartes
 * créées n'appartiennent à aucune leçon. On les ajoute donc APRÈS le filtre
 * plutôt que de leur inventer une leçon complétée — elles sont visibles par
 * construction, c'est l'utilisateur qui les a écrites.
 */
const CUSTOM_SECTION_ID = '__custom__';
const LEVEL_LABEL_OF: Record<string, string> = Object.fromEntries(CECR_LEVELS.map(l => [l.id, l.label]));
const LEVEL_COLOR_OF: Record<string, string> = Object.fromEntries(CECR_LEVELS.map(l => [l.id, l.color]));

const SRS_KEY = 'cl_word_srs_v1';
const SRS_TS_KEY = 'cl_word_srs_v1__ts';
const CLOUD_TS_SUFFIX = '__updatedAt';
const COMPLETED_KEY = 'cl_completed_lessons';

/** Intervalles en heures, identiques au web. */
const INTERVALS_H = [24, 48, 96, 192, 384, 768, 1440];

// ─── Mapping niveau CECR ─────────────────────────────────────────────────────

const PREFIX_TO_LEVEL: Record<string, { key: string; label: string; color: string }> = {
  'cecr-a1':  { key: 'a1',   label: 'A1',   color: '#4CAF50' },
  'cecr-a2':  { key: 'a2',   label: 'A2',   color: '#F9A825' },
  'cecr-b11': { key: 'b1.1', label: 'B1.1', color: '#8BC34A' },
  'cecr-b12': { key: 'b1.2', label: 'B1.2', color: '#2F9D8A' },
  'cecr-b21': { key: 'b2.1', label: 'B2.1', color: '#00BCD4' },
  'cecr-b22': { key: 'b2.2', label: 'B2.2', color: '#009688' },
  'cecr-c11': { key: 'c1.1', label: 'C1.1', color: '#03A9F4' },
  'cecr-c12': { key: 'c1.2', label: 'C1.2', color: '#3F51B5' },
  'cecr-c21': { key: 'c2.1', label: 'C2.1', color: '#9C27B0' },
  'cecr-c22': { key: 'c2.2', label: 'C2.2', color: '#E91E63' },
};

function getLevelMeta(sectionId: string) {
  for (const [prefix, meta] of Object.entries(PREFIX_TO_LEVEL)) {
    if (sectionId.startsWith(prefix)) return meta;
  }
  return { key: 'a1', label: 'A1', color: '#4CAF50' };
}

function isRealHanzi(s: string): boolean {
  return /[一-鿿㐀-䶿豈-﫿]/.test(s);
}

// ─── Catalogue de cartes (module-level cache) ─────────────────────────────────

let _allCards: SrsCard[] | null = null;

/** Supprime les annotations phonétiques entre parenthèses : "boire (h+e+ton1)" → "boire" */
function cleanMeaning(raw: string): string {
  return raw.replace(/\s*\([^)]*\)\s*$/, '').trim();
}

function buildAllCards(): SrsCard[] {
  const cards: SrsCard[] = [];
  for (const [sectionId, sections] of Object.entries(LEARN_SECTIONS)) {
    const level = getLevelMeta(sectionId);
    sections.forEach((section, sIdx) => {
      if (!section.items) return;
      section.items.forEach((item, idx) => {
        if (!item.hanzi || !isRealHanzi(item.hanzi)) return;
        cards.push({
          id: `${sectionId}:${sIdx}:${idx}`,
          hanzi: item.hanzi,
          pinyin: item.pinyin,
          translation: cleanMeaning(item.meaning),
          translationEn: (item as any).meaningEn ? cleanMeaning((item as any).meaningEn) : undefined,
          sectionId,
          levelKey: level.key,
          levelLabel: level.label,
          levelColor: level.color,
        });
      });
    });
  }
  return cards;
}

export function getAllCards(): SrsCard[] {
  if (!_allCards) _allCards = buildAllCards();
  return _allCards;
}

// ─── Logique SRS (compatible web V2) ─────────────────────────────────────────

/** Niveau d'une compétence (0 si jamais travaillée). */
export function skillLevel(entry: SrsEntry | undefined, skill: SrsSkill = 'recognition'): number {
  return entry?.skills?.[skill]?.level ?? 0;
}

export function isDue(entry: SrsEntry | undefined, skill: SrsSkill = 'recognition'): boolean {
  if (!entry) return true;
  const s = entry.skills?.[skill];
  if (!s || s.level === 0) return true;
  return s.dueAt <= Date.now();
}

/**
 * Calcule la prochaine entrée SRS après une réponse sur UNE compétence.
 * quality : 1=raté 2=difficile 3=bien 4=facile (identique web)
 * skill : défaut 'recognition' (compat call-sites non migrés)
 */
export function computeNextSrs(
  existing: SrsEntry | undefined,
  id: string,
  quality: 1 | 2 | 3 | 4,
  skill: SrsSkill = 'recognition',
): SrsEntry {
  const base = existing ? normalizeEntry(id, existing) : undefined;
  const skillState = base?.skills[skill] ?? emptySkill();
  const lvl = skillState.level;
  let newLvl = lvl;
  let consecutiveAgain = skillState.consecutiveAgain;

  if (quality === 1) {
    newLvl = 0;
    consecutiveAgain += 1;
  } else if (quality === 2) {
    newLvl = Math.max(0, lvl - 1);
    consecutiveAgain = 0;
  } else if (quality === 3) {
    newLvl = Math.min(INTERVALS_H.length - 1, lvl + 1);
    consecutiveAgain = 0;
  } else {
    newLvl = Math.min(INTERVALS_H.length - 1, lvl + 2);
    consecutiveAgain = 0;
  }

  const dueInH = quality === 1 ? 10 / 60 : INTERVALS_H[newLvl];
  const nowMs = Date.now();

  return {
    id,
    skills: {
      recognition: base?.skills.recognition ?? emptySkill(),
      pronunciation: base?.skills.pronunciation ?? emptySkill(),
      writing: base?.skills.writing ?? emptySkill(),
      [skill]: { level: newLvl, dueAt: nowMs + dueInH * 3_600_000, consecutiveAgain },
    },
    lastReviewedAt: nowMs,
    reviewCount: (base?.reviewCount ?? 0) + 1,
  };
}

const skillsEqual = (a: SkillState, b: SkillState): boolean =>
  a.level === b.level && a.dueAt === b.dueAt && a.consecutiveAgain === b.consecutiveAgain;

/**
 * Merge deux entrées PAR COMPÉTENCE (identique web) — jamais de perte :
 *   level max, dueAt le plus proche, consecutiveAgain max.
 */
function mergeEntries(local: SrsEntry, cloud: SrsEntry): SrsEntry {
  const skills = {} as Record<SrsSkill, SkillState>;
  for (const skill of SRS_SKILLS) {
    const l = local.skills[skill];
    const c = cloud.skills[skill];
    skills[skill] = {
      level: Math.max(l.level, c.level),
      dueAt: l.dueAt > 0 && c.dueAt > 0 ? Math.min(l.dueAt, c.dueAt) : Math.max(l.dueAt, c.dueAt),
      consecutiveAgain: Math.max(l.consecutiveAgain, c.consecutiveAgain),
    };
  }
  const merged: SrsEntry = {
    id: local.id,
    skills,
    lastReviewedAt: Math.max(local.lastReviewedAt, cloud.lastReviewedAt),
    reviewCount: Math.max(local.reviewCount, cloud.reviewCount),
  };
  const legacy = local.level !== undefined ? local : cloud;
  if (legacy.level !== undefined) merged.level = legacy.level;
  if (legacy.dueAt !== undefined) merged.dueAt = legacy.dueAt;
  if (legacy.consecutiveAgain !== undefined) merged.consecutiveAgain = legacy.consecutiveAgain;
  return merged;
}

/** Merge deux SrsState par entrée, par compétence. */
function mergeStates(local: SrsState, cloud: SrsState): SrsState {
  const result: SrsState = { ...local };
  for (const [id, cloudRaw] of Object.entries(cloud)) {
    const cloudEntry = normalizeEntry(id, cloudRaw);
    const localEntry = result[id];
    result[id] = localEntry ? mergeEntries(normalizeEntry(id, localEntry), cloudEntry) : cloudEntry;
  }
  return result;
}

// ─── Helpers AsyncStorage timestamps ─────────────────────────────────────────

async function readLocalTs(): Promise<number> {
  const raw = await AsyncStorage.getItem(SRS_TS_KEY).catch(() => null);
  if (!raw) return 0;
  const t = Date.parse(raw);
  return Number.isFinite(t) ? t : 0;
}

async function writeLocalTs(iso: string) {
  await AsyncStorage.setItem(SRS_TS_KEY, iso).catch(() => {});
}

// ─── Hook principal ───────────────────────────────────────────────────────────

export function useSrsData() {
  const { user } = useAuth();
  const [srsState, setSrsState] = useState<SrsState>({});
  const [loaded, setLoaded] = useState(false);
  const [completedIds, setCompletedIds] = useState<Set<string>>(new Set());

  // Ref pour éviter les échos onSnapshot de nos propres writes
  const lastWrittenRef = useRef<string | null>(null);
  // True dès qu'un getDoc initial a réussi — coupe le retry automatique
  const cloudReadOkRef = useRef(false);

  // ── Persist localement + Firestore ───────────────────────────────────────

  const persistState = useCallback(async (next: SrsState) => {
    const json = JSON.stringify(next);
    const nowIso = new Date().toISOString();

    // 1. AsyncStorage (toujours, même hors connexion)
    await AsyncStorage.setItem(SRS_KEY, json).catch(() => {});
    await writeLocalTs(nowIso);

    // 2. Firestore si connecté
    if (!user || !db) return;
    lastWrittenRef.current = json;
    try {
      await setDoc(
        doc(db, 'users', user.uid),
        {
          [SRS_KEY]: json,
          [SRS_KEY + CLOUD_TS_SUFFIX]: nowIso,
          lastUpdated: nowIso,
        },
        { merge: true }
      );
    } catch (err) {
      console.warn('[useSrsData] Firestore write failed', err);
    }
  }, [user]);

  // ── Charger l'état initial + réconcilier avec Firestore ──────────────────

  const reload = useCallback(async () => {
    // Lire AsyncStorage
    const [rawSrs, rawCompleted] = await Promise.all([
      AsyncStorage.getItem(SRS_KEY).catch(() => null),
      AsyncStorage.getItem(COMPLETED_KEY).catch(() => null),
    ]);

    let localState: SrsState = {};
    if (rawSrs) {
      try { localState = normalizeMap(JSON.parse(rawSrs)); } catch { /* ignore */ }
    }
    if (rawCompleted) {
      try {
        const ids: string[] = JSON.parse(rawCompleted);
        setCompletedIds(new Set(ids));
      } catch { /* ignore */ }
    }

    // Réconcilier avec Firestore si connecté
    // (échec réseau → retry automatique 3s puis 6s, cf. retrySrsCloudRead)
    if (user && db) {
      try {
        const snap = await getDoc(doc(db, 'users', user.uid));
        cloudReadOkRef.current = true;
        if (snap.exists()) {
          const data = snap.data();
          const cloudJson: string | undefined = data?.[SRS_KEY];
          const cloudTsIso: string | undefined = data?.[SRS_KEY + CLOUD_TS_SUFFIX] ?? data?.lastUpdated;
          const cloudTs = cloudTsIso ? Date.parse(cloudTsIso) : 0;
          const localTs = await readLocalTs();

          if (cloudJson && cloudTs > localTs) {
            // Cloud plus récent → merge
            try {
              const cloudState: SrsState = normalizeMap(JSON.parse(cloudJson));
              const merged = mergeStates(localState, cloudState);
              localState = merged;
              // Sauvegarder le merge en local
              await AsyncStorage.setItem(SRS_KEY, JSON.stringify(merged)).catch(() => {});
              if (cloudTsIso) await writeLocalTs(cloudTsIso);
            } catch { /* ignore parse error */ }
          } else if (Object.keys(localState).length > 0 && !cloudJson) {
            // Local a des données, cloud est vide → push vers cloud
            await persistState(localState);
          }
        }
      } catch (err) {
        console.warn('[useSrsData] Firestore read failed', err);
      }
    }

    setSrsState(localState);
    setLoaded(true);
  }, [user, persistState]);

  useEffect(() => { reload(); }, [reload]);

  // ── Retry automatique du getDoc initial (3s puis 6s) ─────────────────────
  // Si le premier read Firestore échoue (réseau lent, connexion froide),
  // l'état resterait sur les valeurs locales jusqu'à un redémarrage. On
  // retente automatiquement — identique au fix web (commit 22038467d).

  useEffect(() => {
    if (!user || !db) return;
    cloudReadOkRef.current = false;
    const timers: ReturnType<typeof setTimeout>[] = [];
    for (const delay of [3000, 9000]) {
      timers.push(setTimeout(() => {
        if (!cloudReadOkRef.current) reload();
      }, delay));
    }
    return () => timers.forEach(clearTimeout);
  }, [user, reload]);

  // ── Écoute temps réel Firestore ──────────────────────────────────────────

  useEffect(() => {
    if (!user || !db) return;
    const unsub = onSnapshot(
      doc(db, 'users', user.uid),
      async (snap) => {
        if (!snap.exists()) return;
        const data = snap.data();
        const cloudJson: string | undefined = data?.[SRS_KEY];
        if (!cloudJson) return;
        // Ignorer l'écho de notre propre write
        if (lastWrittenRef.current === cloudJson) return;
        // Filtrer si cloud n'est pas plus récent
        const cloudTsIso: string | undefined = data?.[SRS_KEY + CLOUD_TS_SUFFIX] ?? data?.lastUpdated;
        const localTs = await readLocalTs();
        const cloudTs = cloudTsIso ? Date.parse(cloudTsIso) : 0;
        if (cloudTs && cloudTs <= localTs) return;

        try {
          const cloudState: SrsState = normalizeMap(JSON.parse(cloudJson));
          setSrsState(prev => mergeStates(prev, cloudState));
          await AsyncStorage.setItem(SRS_KEY, cloudJson).catch(() => {});
          if (cloudTsIso) await writeLocalTs(cloudTsIso);
          lastWrittenRef.current = cloudJson;
        } catch { /* ignore */ }
      },
      err => console.warn('[useSrsData] onSnapshot error', err)
    );
    return () => unsub();
  }, [user]);

  // ── Cartes personnalisées et surcharges ───────────────────────────────────

  const [customCards, setCustomCards] = useState<CustomCard[]>([]);
  const [overrides, setOverrides] = useState<Record<string, CardOverride>>({});

  const reloadCustom = useCallback(async () => {
    const [cards, ov] = await Promise.all([readCustomCards(), readOverrides()]);
    setCustomCards(cards);
    setOverrides(ov);
  }, []);

  useEffect(() => { void reloadCustom(); }, [reloadCustom]);

  // ── Cartes visibles ───────────────────────────────────────────────────────
  // Règle : carte visible si (leçon complétée) OU (ajoutée manuellement au SRS)

  // Cartes débloquées = mots des leçons complétées OU ajoutés manuellement au SRS.
  // (Plus de repli "tout le catalogue" : il faisait exploser le compteur
  //  "à réviser" à des milliers de mots avant le chargement des leçons.)
  const allCards = useMemo(() => {
    const cards = getAllCards()
      .filter(c => completedIds.has(c.sectionId) || c.id in srsState)
      // Surcharges : on ne remplace que les champs redéfinis, la carte d'origine
      // reste la référence pour tout le reste.
      .map(c => {
        const o = overrides[c.id];
        return o ? { ...c, pinyin: o.pinyin ?? c.pinyin, translation: o.translation ?? c.translation } : c;
      });

    // Les cartes créées par l'utilisateur entrent dans le même tableau : elles
    // traversent ainsi la sélection de session, les statistiques et les
    // compteurs sans qu'aucun de ces codes ait à les connaître.
    const mine: SrsCard[] = customCards.map(c => ({
      id: c.id,
      hanzi: c.hanzi,
      pinyin: c.pinyin,
      translation: c.translation,
      translationEn: c.translation,
      sectionId: CUSTOM_SECTION_ID,
      levelKey: c.levelKey,
      levelLabel: LEVEL_LABEL_OF[c.levelKey] ?? c.levelKey.toUpperCase(),
      levelColor: LEVEL_COLOR_OF[c.levelKey] ?? '#8E5BC8',
    }));

    return [...cards, ...mine];
  }, [completedIds, srsState, overrides, customCards]);

  // ── Sauvegarder une carte après notation ─────────────────────────────────

  const saveEntry = useCallback(async (cardId: string, entry: SrsEntry) => {
    setSrsState(prev => {
      const next = { ...prev, [cardId]: entry };
      // Fire-and-forget persist
      persistState(next).catch(() => {});
      return next;
    });
  }, [persistState]);

  // ── Stats globales ────────────────────────────────────────────────────────

  const stats: SrsStats = (() => {
    const deckMap = new Map<string, DeckStats>();
    let totalDue = 0, totalMastered = 0, totalLearning = 0, totalNew = 0;

    for (const card of allCards) {
      const entry = srsState[card.id];
      const due   = isDue(entry);
      // Compteurs basés sur recognition (seuil historique — cohérent web)
      const level = skillLevel(entry);

      if (!deckMap.has(card.levelKey)) {
        deckMap.set(card.levelKey, {
          levelKey: card.levelKey, levelLabel: card.levelLabel, levelColor: card.levelColor,
          total: 0, mastered: 0, learning: 0, newCards: 0, dueNow: 0,
        });
      }
      const deck = deckMap.get(card.levelKey)!;
      deck.total++;
      if (level >= 4)     { deck.mastered++; totalMastered++; }
      else if (level > 0) { deck.learning++; totalLearning++; }
      else                { deck.newCards++; totalNew++; }
      if (due && level < 4) { deck.dueNow++; totalDue++; }
    }

    return {
      totalCards: allCards.length,
      mastered: totalMastered,
      learning: totalLearning,
      newCards: totalNew,
      dueNow: totalDue,
      decks: [...deckMap.values()],
    };
  })();

  // ── Sélection de cartes pour une session ─────────────────────────────────

  function getSessionCards(
    /**
     * `mastered` a été ajouté pour le bouton « Réviser ces mots » de la liste
     * des mots maîtrisés : il lançait `due`, qui filtre sur niveau < 4 —
     * exactement le complément de « maîtrisé ». La session ne contenait donc
     * jamais les mots qu'on venait d'afficher.
     */
    mode: 'due' | 'new' | 'level' | 'mastered',
    levelFilter?: string,
    maxCards = 20,
    skill: SrsSkill = 'recognition',
  ): SrsCard[] {
    let pool = levelFilter ? allCards.filter(c => c.levelKey === levelFilter) : allCards;

    if (mode === 'due') {
      pool = pool.filter(c => isDue(srsState[c.id], skill) && skillLevel(srsState[c.id], skill) < 4);
    } else if (mode === 'new') {
      pool = pool.filter(c => skillLevel(srsState[c.id], skill) === 0);
    } else if (mode === 'mastered') {
      pool = pool.filter(c => skillLevel(srsState[c.id], skill) >= 4);
    }
    return pool.sort(() => Math.random() - 0.5).slice(0, maxCards);
  }

  return { allCards, srsState, stats, loaded, reload, saveEntry, getSessionCards, customCards, overrides, reloadCustom };
}
