/**
 * FloatingTimer
 * -------------
 * Widget flottant (bas droite) visible sur toutes les pages dès qu'un timer
 * d'étude a été démarré depuis le DailyGoalCard. Contrôles : pause / reprise
 * / stop. Disparaît en mode idle.
 *
 * Rendu piloté par `useStudyTimer()` (consommé directement ici, pas via prop,
 * pour éviter de rerenderer toute l'App à chaque tick).
 */
import { useEffect } from 'react';
import { useStudyTimer } from '../hooks/useStudyTimer';

const formatMmSs = (ms: number): string => {
  const total = Math.max(0, Math.ceil(ms / 1000));
  const mm = Math.floor(total / 60);
  const ss = total % 60;
  return `${String(mm).padStart(2, '0')}:${String(ss).padStart(2, '0')}`;
};

interface FloatingTimerProps {
  language?: 'fr' | 'en';
}

const FloatingTimer = ({ language = 'fr' }: FloatingTimerProps) => {
  const timer = useStudyTimer();

  // Auto-dismiss de la notif "Temps écoulé" après 6s
  useEffect(() => {
    if (!timer.justFinished) return;
    const t = window.setTimeout(() => timer.dismissFinished(), 6000);
    return () => window.clearTimeout(t);
  }, [timer.justFinished, timer]);

  const active = timer.isRunning || timer.isPaused;
  if (!active && !timer.justFinished) return null;

  const label = active
    ? formatMmSs(timer.remainingMs)
    : language === 'fr'
    ? '⏰ Temps écoulé'
    : '⏰ Time\u2019s up';

  return (
    <div
      role="status"
      aria-live="polite"
      style={{
        position: 'fixed',
        right: 96,
        bottom: 32,
        zIndex: 9000,
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        padding: '10px 14px',
        borderRadius: 999,
        background: timer.justFinished ? '#b91c1c' : 'rgba(23, 23, 23, 0.92)',
        color: '#fff',
        fontFamily:
          "ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
        fontVariantNumeric: 'tabular-nums',
        boxShadow: '0 6px 20px rgba(0,0,0,0.25)',
        backdropFilter: 'blur(6px)',
        WebkitBackdropFilter: 'blur(6px)',
        cursor: timer.justFinished ? 'pointer' : 'default'
      }}
      onClick={() => timer.justFinished && timer.dismissFinished()}
    >
      {!timer.justFinished && (
        <span aria-hidden="true" style={{ fontSize: 16 }}>
          ⏱️
        </span>
      )}
      <span style={{ fontWeight: 600, fontSize: 16, letterSpacing: 0.3 }}>
        {label}
      </span>
      {active && (
        <div style={{ display: 'flex', gap: 6, marginLeft: 4 }}>
          {timer.isRunning && (
            <button
              type="button"
              aria-label={language === 'fr' ? 'Pause' : 'Pause'}
              onClick={timer.pause}
              style={btnStyle}
            >
              ⏸
            </button>
          )}
          {timer.isPaused && (
            <button
              type="button"
              aria-label={language === 'fr' ? 'Reprendre' : 'Resume'}
              onClick={timer.resume}
              style={btnStyle}
            >
              ▶
            </button>
          )}
          <button
            type="button"
            aria-label={language === 'fr' ? 'Arr\u00eater' : 'Stop'}
            onClick={timer.stop}
            style={btnStyle}
          >
            ⏹
          </button>
        </div>
      )}
    </div>
  );
};

const btnStyle: React.CSSProperties = {
  background: 'rgba(255,255,255,0.12)',
  border: 'none',
  color: '#fff',
  width: 28,
  height: 28,
  borderRadius: '50%',
  cursor: 'pointer',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: 12,
  lineHeight: 1
};

export default FloatingTimer;
