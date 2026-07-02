/**
 * useSrsPreferences — préférences SRS de l'utilisateur (XiaoLearn V6)
 * ---------------------------------------------------------------------
 * Expose la cadence SRS choisie par l'apprenant (nombre de nouvelles cartes
 * par jour) et la persiste dans `localStorage`. Les pages qui appellent
 * `useFlashcardSRS` peuvent brancher cette valeur en tant que
 * `options.dailyNewCards` pour synchroniser l'UI avec la préférence.
 *
 * 4 presets :
 *   - relaxed    : 10 cartes / jour (rythme doux, idéal débutant motivé modéré)
 *   - standard   : 20 cartes / jour (défaut V6 — cadence Anki « normale »)
 *   - intensive  : 30 cartes / jour (apprenant régulier qui veut progresser vite)
 *   - marathon   : 50 cartes / jour (sprint d'avant examen, pas tenable longtemps)
 *
 * Un mode `custom` permet de fixer une valeur arbitraire (ex: 15, 40) pour
 * les utilisateurs qui veulent régler finement.
 */
import { useCallback, useEffect, useState } from 'react';

export type SrsPreset = 'relaxed' | 'standard' | 'intensive' | 'marathon' | 'custom';

export interface SrsPreferences {
  preset: SrsPreset;
  /** Nombre de nouvelles cartes par jour (dérivé du preset sauf si `custom`). */
  dailyNewCards: number;
}

const STORAGE_KEY = 'cl_srs_preferences_v1';

export const SRS_PRESETS: { key: Exclude<SrsPreset, 'custom'>; dailyNewCards: number; labelFr: string; labelEn: string; descFr: string; descEn: string }[] = [
  {
    key: 'relaxed',
    dailyNewCards: 10,
    labelFr: 'Tranquille',
    labelEn: 'Relaxed',
    descFr: '10 cartes / jour — tenable tous les jours sans prise de tête.',
    descEn: '10 cards / day — easy to maintain as a daily habit.'
  },
  {
    key: 'standard',
    dailyNewCards: 20,
    labelFr: 'Standard',
    labelEn: 'Standard',
    descFr: '20 cartes / jour — cadence Anki recommandée (~30 min/jour).',
    descEn: '20 cards / day — recommended Anki pace (~30 min/day).'
  },
  {
    key: 'intensive',
    dailyNewCards: 30,
    labelFr: 'Intensif',
    labelEn: 'Intensive',
    descFr: '30 cartes / jour — progression rapide, prévoir ~45 min quotidiennes.',
    descEn: '30 cards / day — faster progress, plan ~45 min daily.'
  },
  {
    key: 'marathon',
    dailyNewCards: 50,
    labelFr: 'Marathon',
    labelEn: 'Marathon',
    descFr: '50 cartes / jour — sprint pré-examen, pas tenable sur le long terme.',
    descEn: '50 cards / day — pre-exam sprint, not sustainable long-term.'
  }
];

const DEFAULT_PREFS: SrsPreferences = {
  preset: 'standard',
  dailyNewCards: 20
};

function loadPreferences(): SrsPreferences {
  if (typeof window === 'undefined') return DEFAULT_PREFS;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_PREFS;
    const parsed = JSON.parse(raw) as Partial<SrsPreferences>;
    // Garde-fous : valider `preset` et s'assurer que `dailyNewCards` est positif.
    const preset =
      parsed.preset === 'relaxed' ||
      parsed.preset === 'standard' ||
      parsed.preset === 'intensive' ||
      parsed.preset === 'marathon' ||
      parsed.preset === 'custom'
        ? parsed.preset
        : DEFAULT_PREFS.preset;
    const dailyNewCards =
      typeof parsed.dailyNewCards === 'number' && parsed.dailyNewCards > 0
        ? Math.min(200, Math.floor(parsed.dailyNewCards))
        : DEFAULT_PREFS.dailyNewCards;
    return { preset, dailyNewCards };
  } catch {
    return DEFAULT_PREFS;
  }
}

function writePreferences(prefs: SrsPreferences) {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
  } catch {
    // Silent — quota / private mode.
  }
}

/**
 * Hook React exposant la préférence courante + helpers pour la modifier.
 */
export function useSrsPreferences() {
  const [prefs, setPrefs] = useState<SrsPreferences>(() => loadPreferences());

  // Synchronise la préférence entre onglets ouverts simultanément.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handler = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) setPrefs(loadPreferences());
    };
    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  }, []);

  const setPreset = useCallback((preset: Exclude<SrsPreset, 'custom'>) => {
    const def = SRS_PRESETS.find((p) => p.key === preset);
    if (!def) return;
    const next: SrsPreferences = { preset, dailyNewCards: def.dailyNewCards };
    setPrefs(next);
    writePreferences(next);
  }, []);

  const setCustomDailyNewCards = useCallback((value: number) => {
    const bounded = Math.min(200, Math.max(1, Math.floor(value)));
    const next: SrsPreferences = { preset: 'custom', dailyNewCards: bounded };
    setPrefs(next);
    writePreferences(next);
  }, []);

  const resetPreferences = useCallback(() => {
    setPrefs(DEFAULT_PREFS);
    writePreferences(DEFAULT_PREFS);
  }, []);

  return {
    preferences: prefs,
    setPreset,
    setCustomDailyNewCards,
    resetPreferences
  };
}
