/**
 * Catalogue des objectifs quotidiens, et compteurs du jour.
 *
 * L'utilisateur en choisit trois parmi ce catalogue : quelqu'un qui travaille
 * sa compréhension orale ne se reconnaît pas dans « leçons terminées », et
 * l'objectif du jour ne sert à rien s'il ne parle pas de ce qu'on est venu
 * faire.
 *
 * Les compteurs vivent dans un blob daté (`xl_daily_counts_v1`) : il porte son
 * jour, donc il repart à zéro au premier accès d'une nouvelle journée. Pas de
 * tâche de minuit à programmer, et le compte reste juste même si l'app est
 * restée fermée. `xp` fait exception : il se lit dans `xl_activity_v2`, le
 * journal daté déjà tenu par le web.
 *
 * `bumpDailyCounter` est une fonction libre, pas un hook : elle doit pouvoir
 * être appelée depuis `data/minijeuxHelpers.ts`, qui n'est pas un composant.
 * L'écriture n'est donc pas poussée vers Firestore dans l'instant — elle le
 * sera à la prochaine synchronisation, la clé étant déjà dans SYNC_KEYS. C'est
 * sans conséquence : un compteur du jour n'a pas vocation à survivre au jour.
 */
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Ionicons } from '@expo/vector-icons';
import type { TransKey } from '@/i18n/translations';

export type GoalId =
  | 'xp' | 'cards' | 'writing' | 'lessons' | 'dictation' | 'dialogue' | 'reading' | 'game';

export interface GoalMeta {
  id: GoalId;
  icon: keyof typeof Ionicons.glyphMap;
  /** « XP gagnés », pour la liste de sélection. */
  nameKey: TransKey;
  /** « {n}/{total} XP gagnés », pour la carte. */
  labelKey: TransKey;
  /** Valeurs proposées au réglage. La première est le défaut. */
  presets: number[];
  /** Écran ouvert par le bouton de la tâche. */
  route: string;
  /** Libellé du bouton. */
  actionKey: TransKey;
}

export const GOAL_CATALOG: GoalMeta[] = [
  { id: 'xp',        icon: 'flash-outline',    nameKey: 'goal.n.xp',        labelKey: 'goal.l.xp',        presets: [50, 25, 100, 200], route: '/(tabs)/cours',       actionKey: 'goal.continue' },
  { id: 'cards',     icon: 'layers-outline',   nameKey: 'goal.n.cards',     labelKey: 'goal.l.cards',     presets: [20, 10, 30, 50],   route: '/review',             actionKey: 'goal.review' },
  { id: 'writing',   icon: 'brush-outline',    nameKey: 'goal.n.writing',   labelKey: 'goal.l.writing',   presets: [10, 5, 20, 30],    route: '/review?study=writing', actionKey: 'goal.review' },
  { id: 'lessons',   icon: 'book-outline',     nameKey: 'goal.n.lessons',   labelKey: 'goal.l.lessons',   presets: [1, 2, 3, 5],       route: '/(tabs)/cours',       actionKey: 'goal.continue' },
  { id: 'dictation', icon: 'ear-outline',      nameKey: 'goal.n.dictation', labelKey: 'goal.l.dictation', presets: [10, 5, 20, 30],    route: '/dictee',             actionKey: 'goal.open' },
  { id: 'dialogue',  icon: 'chatbubbles-outline', nameKey: 'goal.n.dialogue', labelKey: 'goal.l.dialogue', presets: [1, 2, 3, 5],      route: '/dialogues',          actionKey: 'goal.open' },
  { id: 'reading',   icon: 'newspaper-outline', nameKey: 'goal.n.reading',  labelKey: 'goal.l.reading',   presets: [1, 2, 3, 5],       route: '/lectures',           actionKey: 'goal.open' },
  { id: 'game',      icon: 'game-controller-outline', nameKey: 'goal.n.game', labelKey: 'goal.l.game',    presets: [1, 2, 3, 5],       route: '/minijeux',           actionKey: 'goal.open' },
];

export const GOAL_BY_ID: Record<GoalId, GoalMeta> =
  Object.fromEntries(GOAL_CATALOG.map(g => [g.id, g])) as Record<GoalId, GoalMeta>;

/** Nombre d'objectifs suivis simultanément. Trois tiennent dans une carte. */
export const GOAL_SLOTS = 3;
export const DEFAULT_SELECTED: GoalId[] = ['cards', 'xp', 'lessons'];

export const DAILY_COUNTS_KEY = 'xl_daily_counts_v1';

export type DailyCounts = Partial<Record<GoalId, number>>;

/** Clé locale d'un jour — surtout pas toISOString(), qui bascule en UTC. */
export function dayKey(d: Date = new Date()): string {
  const m = `${d.getMonth() + 1}`.padStart(2, '0');
  const j = `${d.getDate()}`.padStart(2, '0');
  return `${d.getFullYear()}-${m}-${j}`;
}

/** Compteurs du jour. Un blob daté d'hier est traité comme vide. */
export function parseDailyCounts(raw: string | null): DailyCounts {
  if (!raw) return {};
  try {
    const p = JSON.parse(raw) as { day?: string } & DailyCounts;
    if (p.day !== dayKey()) return {};
    const { day, ...counts } = p;
    return counts;
  } catch {
    return {};
  }
}

export async function readDailyCounts(): Promise<DailyCounts> {
  const raw = await AsyncStorage.getItem(DAILY_COUNTS_KEY).catch(() => null);
  return parseDailyCounts(raw);
}

/**
 * Compteur alimenté par une carte révisée, selon le mode de la session.
 *
 * Tracer un caractère et reconnaître un mot ne sont pas le même travail : qui
 * s'entraîne à l'écriture veut compter ses tracés, pas ses cartes retournées.
 */
export function cardGoalForStudy(study: 'writing' | 'flip'): GoalId {
  return study === 'writing' ? 'writing' : 'cards';
}

/**
 * Incrémente un compteur du jour. Sans effet pour `xp`, qui est déduit du
 * journal d'activité — l'incrémenter ici le compterait deux fois.
 */
export async function bumpDailyCounter(id: GoalId, n = 1): Promise<void> {
  if (id === 'xp') return;
  const raw = await AsyncStorage.getItem(DAILY_COUNTS_KEY).catch(() => null);
  const cur = parseDailyCounts(raw);
  const next = { day: dayKey(), ...cur, [id]: (cur[id] ?? 0) + n };
  await AsyncStorage.setItem(DAILY_COUNTS_KEY, JSON.stringify(next)).catch(() => {});
}
