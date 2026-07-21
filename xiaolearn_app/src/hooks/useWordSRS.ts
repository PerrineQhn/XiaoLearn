/**
 * useWordSRS.ts — SRS par mot ET par compétence, branchable en onRate(id, quality, skill)
 * ---------------------------------------------------------------------------
 * V2 multi-compétences : chaque mot tracke désormais 3 compétences SRS
 * indépendantes :
 *   - recognition   : voir le hanzi → comprendre (hanzi→fr, listening)
 *   - pronunciation : produire oralement (fr→hanzi, micro, typing)
 *   - writing       : tracer les caractères (mode HanziWriter à venir)
 *
 * Contrairement à useFlashcardSRS (qui est "session-bound" : gère sa propre
 * file d'attente via `session.currentCard`), ce hook expose un `rate()` pur
 * qui prend un itemId + quality (1..4) + skill optionnelle (défaut
 * 'recognition' pour compat avec les call-sites non migrés).
 *
 * États dérivés exposés (compat FlashcardV5 / dashboard / notifs) :
 *   - masteredIds  : recognition.level >= 4 (seuil historique — les stats
 *                    existantes restent cohérentes)
 *   - dueIds       : union des mots dus sur AU MOINS une compétence déjà
 *                    commencée (dueAt > 0 ou level > 0)
 *   - difficultIds : au moins une compétence avec consecutiveAgain >= 1
 *   - *BySkill     : variantes par compétence (dueIdsBySkill, masteredIdsBySkill)
 *
 * Migration : les entrées legacy ({ id, level, dueAt, consecutiveAgain })
 * sont converties LAZY au premier load — l'historique testait surtout la
 * reconnaissance, donc level/dueAt/consecutiveAgain → skills.recognition,
 * les deux autres skills démarrent à zéro (non commencées). Les champs
 * legacy top-level sont conservés en lecture mais ne sont plus écrits.
 */
import { useCallback, useMemo, useState } from 'react';
import { useFirestoreSync } from './useFirestoreSync';

const STORAGE_KEY = 'cl_word_srs_v1';

export type SrsSkill = 'recognition' | 'pronunciation' | 'writing';

export const SRS_SKILLS: readonly SrsSkill[] = ['recognition', 'pronunciation', 'writing'];

export interface SkillState {
  level: number;              // 0..6
  dueAt: number;              // epoch ms (0 = compétence jamais travaillée)
  consecutiveAgain: number;   // nombre d'échecs consécutifs (pour "difficult")
}

export interface WordSrsEntry {
  id: string;
  skills: Record<SrsSkill, SkillState>;
  lastReviewedAt: number;     // epoch ms (toutes compétences confondues)
  reviewCount: number;        // toutes compétences confondues
  // Champs legacy (shape V1 mono-niveau) conservés pour compat lecture
  // (mais plus jamais mis à jour par rate()) :
  level?: number;
  dueAt?: number;
  consecutiveAgain?: number;
}

export type WordSrsMap = Record<string, WordSrsEntry>;

// Intervalles en heures, palier par niveau SRS (aligné usePersonalFlashcards).
const INTERVALS_H = [24, 48, 96, 192, 384, 768, 1440];

const emptySkill = (): SkillState => ({ level: 0, dueAt: 0, consecutiveAgain: 0 });

const toNum = (v: unknown): number => (typeof v === 'number' && Number.isFinite(v) ? v : 0);

const normalizeSkill = (raw: unknown): SkillState => {
  if (!raw || typeof raw !== 'object') return emptySkill();
  const s = raw as Partial<SkillState>;
  return {
    level: toNum(s.level),
    dueAt: toNum(s.dueAt),
    consecutiveAgain: toNum(s.consecutiveAgain)
  };
};

/**
 * Convertit une entrée quelconque (legacy V1 mono-niveau OU V2 multi-skills)
 * vers le shape V2. Migration lazy : une entrée legacy voit son
 * level/dueAt/consecutiveAgain historique attribué à `recognition`
 * (l'historique testait surtout la reconnaissance), les autres skills
 * démarrent à zéro.
 */
const normalizeEntry = (id: string, raw: unknown): WordSrsEntry => {
  const r = (raw && typeof raw === 'object' ? raw : {}) as Record<string, unknown>;
  const rawSkills = r.skills as Record<string, unknown> | undefined;
  let skills: Record<SrsSkill, SkillState>;
  if (rawSkills && typeof rawSkills === 'object') {
    skills = {
      recognition: normalizeSkill(rawSkills.recognition),
      pronunciation: normalizeSkill(rawSkills.pronunciation),
      writing: normalizeSkill(rawSkills.writing)
    };
  } else {
    // Shape V1 : level au top-level, pas de `skills`.
    skills = {
      recognition: {
        level: toNum(r.level),
        dueAt: toNum(r.dueAt),
        consecutiveAgain: toNum(r.consecutiveAgain)
      },
      pronunciation: emptySkill(),
      writing: emptySkill()
    };
  }
  const entry: WordSrsEntry = {
    id,
    skills,
    lastReviewedAt: toNum(r.lastReviewedAt),
    reviewCount: toNum(r.reviewCount)
  };
  // Compat lecture : on conserve les champs legacy s'ils existaient.
  if (typeof r.level === 'number') entry.level = r.level;
  if (typeof r.dueAt === 'number') entry.dueAt = r.dueAt;
  if (typeof r.consecutiveAgain === 'number') entry.consecutiveAgain = r.consecutiveAgain;
  return entry;
};

const skillsEqual = (a: SkillState, b: SkillState): boolean =>
  a.level === b.level && a.dueAt === b.dueAt && a.consecutiveAgain === b.consecutiveAgain;

const entriesEqual = (a: WordSrsEntry, b: WordSrsEntry): boolean =>
  a.lastReviewedAt === b.lastReviewedAt &&
  a.reviewCount === b.reviewCount &&
  SRS_SKILLS.every((s) => skillsEqual(a.skills[s], b.skills[s]));

/**
 * Merge cloud ↔ local sans JAMAIS perdre de donnée, par compétence :
 *   - level            : max (on garde la meilleure progression)
 *   - dueAt            : la plus PROCHE (min des deux si les deux > 0,
 *                        sinon celle qui est non-nulle)
 *   - consecutiveAgain : max (on n'efface pas un échec récent)
 */
const mergeEntries = (local: WordSrsEntry, cloud: WordSrsEntry): WordSrsEntry => {
  const skills = {} as Record<SrsSkill, SkillState>;
  for (const skill of SRS_SKILLS) {
    const l = local.skills[skill];
    const c = cloud.skills[skill];
    skills[skill] = {
      level: Math.max(l.level, c.level),
      dueAt: l.dueAt > 0 && c.dueAt > 0 ? Math.min(l.dueAt, c.dueAt) : Math.max(l.dueAt, c.dueAt),
      consecutiveAgain: Math.max(l.consecutiveAgain, c.consecutiveAgain)
    };
  }
  const merged: WordSrsEntry = {
    id: local.id,
    skills,
    lastReviewedAt: Math.max(local.lastReviewedAt, cloud.lastReviewedAt),
    reviewCount: Math.max(local.reviewCount, cloud.reviewCount)
  };
  const legacy = local.level !== undefined ? local : cloud;
  if (legacy.level !== undefined) merged.level = legacy.level;
  if (legacy.dueAt !== undefined) merged.dueAt = legacy.dueAt;
  if (legacy.consecutiveAgain !== undefined) merged.consecutiveAgain = legacy.consecutiveAgain;
  return merged;
};

const normalizeMap = (raw: unknown): WordSrsMap => {
  if (!raw || typeof raw !== 'object') return {};
  const out: WordSrsMap = {};
  for (const [id, entry] of Object.entries(raw as Record<string, unknown>)) {
    if (!entry || typeof entry !== 'object') continue;
    out[id] = normalizeEntry(id, entry);
  }
  return out;
};

const readInitial = (): WordSrsMap => {
  if (typeof window === 'undefined') return {};
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return {};
  try {
    return normalizeMap(JSON.parse(raw));
  } catch {
    /* ignore */
  }
  return {};
};

/** Une compétence est "commencée" dès qu'elle a été notée au moins une fois. */
const skillStarted = (s: SkillState): boolean => s.dueAt > 0 || s.level > 0;

const skillDue = (s: SkillState, now: number): boolean =>
  skillStarted(s) && s.level < 4 && s.dueAt <= now;

export interface UseWordSrsOptions {
  syncEnabled?: boolean;
}

export const useWordSRS = (options: UseWordSrsOptions = {}) => {
  const [map, setMap] = useState<WordSrsMap>(readInitial);

  const { saveToFirestore } = useFirestoreSync(
    STORAGE_KEY,
    (data) => {
      if (!data || typeof data !== 'object') return;
      // Merge par ID puis par compétence : ne JAMAIS perdre un rating local
      // non encore propagé vers Firestore, ni une progression cloud faite
      // sur un autre device. Gère les 2 shapes (cloud legacy V1 + local V2
      // et vice-versa) via normalizeMap/normalizeEntry.
      const cloudMap = normalizeMap(data);
      setMap((prev) => {
        const merged: WordSrsMap = { ...prev };
        let changed = false;
        for (const [id, cloudEntry] of Object.entries(cloudMap)) {
          const local = merged[id];
          if (!local) {
            merged[id] = cloudEntry;
            changed = true;
          } else {
            const combined = mergeEntries(local, cloudEntry);
            if (!entriesEqual(combined, local)) {
              merged[id] = combined;
              changed = true;
            }
          }
        }
        return changed ? merged : prev;
      });
    },
    { enabled: options.syncEnabled ?? true }
  );

  const persist = useCallback(
    (next: WordSrsMap) => {
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      }
      saveToFirestore(next);
    },
    [saveToFirestore]
  );

  /**
   * Enregistre une réponse pour la carte `id` sur la compétence `skill`.
   * quality : 1 (again) · 2 (hard) · 3 (good) · 4 (easy)
   * skill   : défaut 'recognition' (compat call-sites non migrés)
   */
  const rate = useCallback(
    (id: string, quality: 1 | 2 | 3 | 4, skill: SrsSkill = 'recognition') => {
      setMap((prev) => {
        const existing = prev[id] ? normalizeEntry(id, prev[id]) : undefined;
        const skillState = existing?.skills[skill] ?? emptySkill();
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
        const entry: WordSrsEntry = {
          ...existing,
          id,
          skills: {
            ...(existing?.skills ?? {
              recognition: emptySkill(),
              pronunciation: emptySkill(),
              writing: emptySkill()
            }),
            [skill]: {
              level: newLvl,
              dueAt: nowMs + dueInH * 60 * 60 * 1000,
              consecutiveAgain
            }
          },
          lastReviewedAt: nowMs,
          reviewCount: (existing?.reviewCount ?? 0) + 1
        };
        const next = { ...prev, [id]: entry };
        persist(next);
        return next;
      });
    },
    [persist]
  );

  const getEntry = useCallback((id: string): WordSrsEntry | undefined => map[id], [map]);

  const getSkillState = useCallback(
    (id: string, skill: SrsSkill): SkillState => map[id]?.skills[skill] ?? emptySkill(),
    [map]
  );

  const masteredIdsBySkill = useMemo(() => {
    const out: Record<SrsSkill, Set<string>> = {
      recognition: new Set(),
      pronunciation: new Set(),
      writing: new Set()
    };
    for (const e of Object.values(map)) {
      for (const skill of SRS_SKILLS) {
        if (e.skills[skill].level >= 4) out[skill].add(e.id);
      }
    }
    return out;
  }, [map]);

  // Seuil historique : un mot est "maîtrisé" quand sa RECONNAISSANCE est
  // solide (level >= 4). Les stats existantes (dashboard, profil, notifs)
  // restent donc cohérentes avec l'historique mono-niveau.
  const masteredIds = masteredIdsBySkill.recognition;

  const dueIdsBySkill = useMemo(() => {
    const out: Record<SrsSkill, Set<string>> = {
      recognition: new Set(),
      pronunciation: new Set(),
      writing: new Set()
    };
    const now = Date.now();
    for (const e of Object.values(map)) {
      for (const skill of SRS_SKILLS) {
        if (skillDue(e.skills[skill], now)) out[skill].add(e.id);
      }
    }
    return out;
  }, [map]);

  // Union des mots dus sur au moins une compétence COMMENCÉE (une skill
  // jamais travaillée — dueAt=0 et level=0 — n'est pas "due", sinon la
  // migration inonderait la file avec 2×N cartes pronunciation/writing).
  const dueIds = useMemo(() => {
    const set = new Set<string>();
    for (const skill of SRS_SKILLS) {
      for (const id of dueIdsBySkill[skill]) set.add(id);
    }
    return set;
  }, [dueIdsBySkill]);

  const difficultIds = useMemo(() => {
    const set = new Set<string>();
    for (const e of Object.values(map)) {
      if (SRS_SKILLS.some((skill) => e.skills[skill].consecutiveAgain >= 1)) set.add(e.id);
    }
    return set;
  }, [map]);

  // Tous les IDs qui ont été révisés au moins une fois (toute entrée SRS
  // existante). Sert à distinguer "Nouveau" (jamais touché) de "Renforcé"
  // (révisé ≥ 1 fois, pas encore maîtrisé) dans la table plate V5.
  const reviewedIds = useMemo(() => {
    const set = new Set<string>();
    for (const e of Object.values(map)) {
      if ((e.reviewCount ?? 0) > 0 || e.lastReviewedAt > 0) set.add(e.id);
    }
    return set;
  }, [map]);

  const resetAll = useCallback(() => {
    setMap({});
    persist({});
  }, [persist]);

  return {
    map,
    rate,
    getEntry,
    getSkillState,
    masteredIds,
    masteredIdsBySkill,
    dueIds,
    dueIdsBySkill,
    difficultIds,
    reviewedIds,
    resetAll
  };
};

export type UseWordSrsReturn = ReturnType<typeof useWordSRS>;
