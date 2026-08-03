/**
 * useDailyGoals — les trois objectifs suivis, et leurs cibles.
 *
 * Deux clés, pour une raison précise :
 *
 *   - `xl_daily_goals_v2` (mobile) porte la configuration complète : quels
 *     objectifs sont suivis, et la cible de chacun.
 *   - `cl_daily_goals_v1` (partagée avec le web) reçoit en miroir les trois
 *     champs que le web sait lire — xpTarget, cardsTarget, lessonsTarget.
 *
 * Tout stocker dans la clé web aurait été plus simple mais destructeur : son
 * `sanitize()` ne conserve que ses quatre champs, donc le premier
 * enregistrement fait depuis le navigateur aurait effacé les objectifs propres
 * au mobile. Le miroir va donc dans un seul sens, et un objectif non suivi ici
 * s'écrit 0 là-bas, ce que le web interprète déjà comme « pas de cible ».
 */
import { useCallback, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFirestoreSync } from './useFirestoreSync';
import {
  GOAL_BY_ID, GOAL_SLOTS, DEFAULT_SELECTED, type GoalId,
} from '@/data/dailyGoals';

const KEY = 'xl_daily_goals_v2';
const WEB_KEY = 'cl_daily_goals_v1';
const SYNC_KEYS = [KEY, WEB_KEY];

export interface DailyGoalsConfig {
  /** Exactement GOAL_SLOTS identifiants, dans l'ordre d'affichage. */
  selected: GoalId[];
  targets: Partial<Record<GoalId, number>>;
}

export const DEFAULT_CONFIG: DailyGoalsConfig = {
  selected: DEFAULT_SELECTED,
  targets: Object.fromEntries(DEFAULT_SELECTED.map(id => [id, GOAL_BY_ID[id].presets[0]])),
};

function sanitize(c: Partial<DailyGoalsConfig>): DailyGoalsConfig {
  const selected: GoalId[] = [];
  for (const id of c.selected ?? []) {
    if (selected.length >= GOAL_SLOTS) break;
    if (GOAL_BY_ID[id as GoalId] && !selected.includes(id as GoalId)) selected.push(id as GoalId);
  }
  // Une liste vide (première ouverture, valeur corrompue) repart des défauts.
  // En revanche on n'complète PAS une liste de 1 ou 2 : l'utilisateur a le
  // droit de suivre moins de trois objectifs.
  if (selected.length === 0) selected.push(...DEFAULT_SELECTED);
  const targets: Partial<Record<GoalId, number>> = {};
  for (const id of selected) {
    const meta = GOAL_BY_ID[id];
    const v = Number(c.targets?.[id]);
    targets[id] = Number.isFinite(v) && v > 0 ? Math.min(999, Math.round(v)) : meta.presets[0];
  }
  return { selected, targets };
}

export function useDailyGoals() {
  const [config, setConfig] = useState<DailyGoalsConfig>(DEFAULT_CONFIG);

  const reload = useCallback(async () => {
    const raw = await AsyncStorage.getItem(KEY).catch(() => null);
    if (!raw) return;
    try { setConfig(sanitize(JSON.parse(raw))); } catch { /* corrompu : on garde les défauts */ }
  }, []);

  const { save } = useFirestoreSync(SYNC_KEYS, reload);

  useEffect(() => { void reload(); }, [reload]);

  const persist = useCallback(async (next: DailyGoalsConfig) => {
    await save(KEY, JSON.stringify(next));
    // Miroir web — voir l'en-tête sur le sens unique.
    await save(WEB_KEY, JSON.stringify({
      xpTarget: next.targets.xp ?? 50,
      minutesTarget: 10,
      cardsTarget: next.selected.includes('cards') ? (next.targets.cards ?? 0) : 0,
      lessonsTarget: next.selected.includes('lessons') ? (next.targets.lessons ?? 0) : 0,
    }));
  }, [save]);

  /**
   * Sélectionne ou désélectionne un objectif.
   *
   * L'écran montrait trois emplacements à déplier pour découvrir le catalogue :
   * personne ne devinait qu'il y avait huit objectifs. On expose désormais la
   * liste entière et on coche, ce qui demande ce verbe-ci plutôt qu'un
   * `setSlot` indexé.
   *
   * Sélectionner au-delà de GOAL_SLOTS ne fait rien : l'écran grise les lignes
   * restantes plutôt que de retirer en douce un objectif que l'utilisateur
   * venait de choisir.
   */
  const toggle = useCallback((id: GoalId) => {
    setConfig(prev => {
      const on = prev.selected.includes(id);
      if (!on && prev.selected.length >= GOAL_SLOTS) return prev;
      // On garde toujours au moins un objectif : une carte vide n'a pas de sens.
      if (on && prev.selected.length <= 1) return prev;
      const selected = on ? prev.selected.filter(x => x !== id) : [...prev.selected, id];
      const next = sanitize({ selected, targets: prev.targets });
      void persist(next);
      return next;
    });
  }, [persist]);

  const setTarget = useCallback((id: GoalId, value: number) => {
    setConfig(prev => {
      const next = sanitize({ selected: prev.selected, targets: { ...prev.targets, [id]: value } });
      void persist(next);
      return next;
    });
  }, [persist]);

  const resetToDefaults = useCallback(() => {
    setConfig(DEFAULT_CONFIG);
    void persist(DEFAULT_CONFIG);
  }, [persist]);

  return { config, toggle, setTarget, resetToDefaults, reload };
}
