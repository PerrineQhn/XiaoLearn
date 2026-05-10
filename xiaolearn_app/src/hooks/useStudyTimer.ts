/**
 * useStudyTimer
 * -------------
 * Timer d'étude global, visible depuis toutes les pages via `<FloatingTimer />`.
 *
 * Design :
 *  - Démarré depuis le bouton ▶ du DailyGoalCard avec une durée (minutes).
 *  - Persiste dans localStorage l'état essentiel (durée totale, date de
 *    démarrage, pausedRemainingMs). À chaque rendu, on RECALCULE le temps
 *    restant à partir de l'horloge système pour éviter les dérives si la
 *    page est backgroundée (setInterval peut être throttlé).
 *  - À l'atteinte de 0 : play un court son (Web Audio) + notif visuelle.
 *
 * État stocké (clé `xl_study_timer_v1`) :
 *   { durationMs, startedAtMs | null, pausedRemainingMs | null }
 *
 * Modes :
 *   - running      : startedAtMs != null
 *   - paused       : startedAtMs == null && pausedRemainingMs != null
 *   - idle         : les deux null
 *   - finished     : running et remainingMs <= 0 → on le détecte dans le tick
 *                    et on bascule en idle + `justFinished`.
 */
import { useCallback, useEffect, useRef, useState } from 'react';

const STORAGE_KEY = 'xl_study_timer_v1';
const TICK_INTERVAL_MS = 500;

interface PersistedTimerState {
  durationMs: number;
  /** Timestamp ms de départ (ou reprise). `null` si en pause ou idle. */
  startedAtMs: number | null;
  /** Si en pause : ms restants quand on a mis pause. */
  pausedRemainingMs: number | null;
}

const DEFAULT_STATE: PersistedTimerState = {
  durationMs: 0,
  startedAtMs: null,
  pausedRemainingMs: null
};

const readInitial = (): PersistedTimerState => {
  if (typeof window === 'undefined') return DEFAULT_STATE;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_STATE;
    const parsed = JSON.parse(raw);
    if (
      parsed &&
      typeof parsed === 'object' &&
      typeof parsed.durationMs === 'number'
    ) {
      return {
        durationMs: parsed.durationMs,
        startedAtMs:
          typeof parsed.startedAtMs === 'number' ? parsed.startedAtMs : null,
        pausedRemainingMs:
          typeof parsed.pausedRemainingMs === 'number'
            ? parsed.pausedRemainingMs
            : null
      };
    }
  } catch {
    /* ignore */
  }
  return DEFAULT_STATE;
};

/**
 * Pub/sub module-level pour synchroniser toutes les instances du hook dans le
 * même onglet (React n'a pas de mécanisme natif pour "partager" un useState
 * entre deux appels du même hook). L'event `storage` du navigateur ne fire
 * PAS pour l'onglet qui a écrit → d'où ce bus manuel.
 */
const listeners = new Set<(state: PersistedTimerState) => void>();
const subscribe = (cb: (state: PersistedTimerState) => void) => {
  listeners.add(cb);
  return () => {
    listeners.delete(cb);
  };
};
const broadcast = (state: PersistedTimerState) => {
  listeners.forEach((cb) => cb(state));
};

const persist = (state: PersistedTimerState) => {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    /* ignore */
  }
  broadcast(state);
};

/** Bip court via Web Audio (pas besoin de fichier embarqué). */
const playEndBeep = () => {
  if (typeof window === 'undefined') return;
  try {
    // @ts-expect-error — webkitAudioContext pour Safari anciens
    const Ctx: typeof AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return;
    const ctx = new Ctx();
    const now = ctx.currentTime;
    // 3 bips de 0.15s, écartés de 0.2s, fréquence 880 → 1100 Hz
    const play = (freq: number, start: number) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0, now + start);
      gain.gain.linearRampToValueAtTime(0.15, now + start + 0.02);
      gain.gain.linearRampToValueAtTime(0, now + start + 0.15);
      osc.connect(gain).connect(ctx.destination);
      osc.start(now + start);
      osc.stop(now + start + 0.2);
    };
    play(880, 0);
    play(880, 0.2);
    play(1100, 0.4);
    // Nettoyage après 1s
    setTimeout(() => ctx.close().catch(() => undefined), 1000);
  } catch {
    /* ignore — l'utilisateur n'a peut-être pas interagi avec la page */
  }
};

export interface StudyTimerApi {
  /** Durée totale configurée pour la session courante (ms). */
  durationMs: number;
  /** Temps restant en ms (≥ 0). */
  remainingMs: number;
  isRunning: boolean;
  isPaused: boolean;
  isIdle: boolean;
  /** True après que le timer vient d'atteindre 0 (se reset à la prochaine action). */
  justFinished: boolean;
  /** Démarre un nouveau timer de `minutes` minutes. Réinitialise l'état. */
  start: (minutes: number) => void;
  /** Met en pause (si running). */
  pause: () => void;
  /** Reprend (si paused). */
  resume: () => void;
  /** Stop + remet à zéro (widget flottant disparaît). */
  stop: () => void;
  /** Acquitte le "justFinished" (appelé au clic sur la notif). */
  dismissFinished: () => void;
}

export const useStudyTimer = (): StudyTimerApi => {
  const [state, setState] = useState<PersistedTimerState>(readInitial);
  const [nowMs, setNowMs] = useState<number>(() => Date.now());
  const [justFinished, setJustFinished] = useState(false);

  // Synchro inter-instance (même onglet) : chaque persist() d'une autre
  // instance du hook broadcast le nouveau state → on met à jour notre propre
  // useState pour que FloatingTimer réagisse quand HomePageV2 (ré)active le
  // timer et inversement.
  // On NE touche pas `justFinished` ici : ce flag est local par design (il
  // pilote la notif "Temps écoulé" qui s'auto-dismiss après 6s dans
  // FloatingTimer) et chaque instance pose son propre justFinished=true quand
  // elle détecte la fin de son tick.
  useEffect(() => {
    const unsubscribe = subscribe((next) => {
      setState(next);
      setNowMs(Date.now());
      // Démarrage d'un nouveau timer (state non-idle avec startedAtMs défini)
      // → on clear le "Temps écoulé" potentiellement hérité d'une session
      // précédente.
      if (next.startedAtMs !== null && next.durationMs > 0) {
        setJustFinished(false);
      }
    });
    return unsubscribe;
  }, []);

  // Synchro cross-onglet via l'event `storage`. Ne fire pas pour l'onglet
  // courant (couvert par le bus `listeners` ci-dessus).
  useEffect(() => {
    const handler = (e: StorageEvent) => {
      if (e.key !== STORAGE_KEY) return;
      setState(readInitial());
      setNowMs(Date.now());
    };
    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  }, []);

  // Tick global : on recalcule `nowMs` toutes les 500ms. Le remainingMs est
  // dérivé du state persistant + de cette horloge.
  useEffect(() => {
    if (state.startedAtMs === null) return; // pas running, inutile de tick
    const id = window.setInterval(() => {
      setNowMs(Date.now());
    }, TICK_INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [state.startedAtMs]);

  // Calcul dérivé du remainingMs
  let remainingMs: number;
  if (state.startedAtMs !== null) {
    remainingMs = Math.max(0, state.durationMs - (nowMs - state.startedAtMs));
  } else if (state.pausedRemainingMs !== null) {
    remainingMs = state.pausedRemainingMs;
  } else {
    remainingMs = 0;
  }

  const isRunning = state.startedAtMs !== null && remainingMs > 0;
  const isPaused = state.startedAtMs === null && state.pausedRemainingMs !== null;
  const isIdle = state.startedAtMs === null && state.pausedRemainingMs === null;

  // Déclenche `justFinished` quand remainingMs passe à 0 en mode running
  const finishedFiredRef = useRef(false);
  useEffect(() => {
    if (state.startedAtMs !== null && remainingMs <= 0 && !finishedFiredRef.current) {
      finishedFiredRef.current = true;
      setJustFinished(true);
      playEndBeep();
      // Bascule en idle (on arrête le tick)
      const next: PersistedTimerState = {
        durationMs: state.durationMs,
        startedAtMs: null,
        pausedRemainingMs: null
      };
      setState(next);
      persist(next);
    }
    if (state.startedAtMs !== null && remainingMs > 0) {
      finishedFiredRef.current = false;
    }
  }, [remainingMs, state.startedAtMs, state.durationMs]);

  const start = useCallback((minutes: number) => {
    const durationMs = Math.max(1, Math.round(minutes * 60_000));
    const next: PersistedTimerState = {
      durationMs,
      startedAtMs: Date.now(),
      pausedRemainingMs: null
    };
    finishedFiredRef.current = false;
    setJustFinished(false);
    setState(next);
    persist(next);
    setNowMs(Date.now());
  }, []);

  const pause = useCallback(() => {
    setState((prev) => {
      if (prev.startedAtMs === null) return prev;
      const leftMs = Math.max(0, prev.durationMs - (Date.now() - prev.startedAtMs));
      const next: PersistedTimerState = {
        durationMs: prev.durationMs,
        startedAtMs: null,
        pausedRemainingMs: leftMs
      };
      persist(next);
      return next;
    });
  }, []);

  const resume = useCallback(() => {
    setState((prev) => {
      if (prev.pausedRemainingMs === null) return prev;
      // Repartir avec le remaining comme nouvelle durée pour simplifier le
      // calcul.
      const next: PersistedTimerState = {
        durationMs: prev.pausedRemainingMs,
        startedAtMs: Date.now(),
        pausedRemainingMs: null
      };
      persist(next);
      return next;
    });
    setNowMs(Date.now());
  }, []);

  const stop = useCallback(() => {
    const next: PersistedTimerState = DEFAULT_STATE;
    setState(next);
    persist(next);
    setJustFinished(false);
    finishedFiredRef.current = false;
  }, []);

  const dismissFinished = useCallback(() => {
    setJustFinished(false);
  }, []);

  return {
    durationMs: state.durationMs,
    remainingMs,
    isRunning,
    isPaused,
    isIdle,
    justFinished,
    start,
    pause,
    resume,
    stop,
    dismissFinished
  };
};
