/**
 * AudioSpeedToggle — switch deux états (Normal / Lent) pour le shadowing.
 * ----------------------------------------------------------------------
 * Permet à l'utilisateur de basculer entre l'audio TTS normal (rate -10%)
 * et la version shadowing (rate -35% + pauses de respiration sur la
 * ponctuation chinoise).
 *
 * État géré par le parent (chaque player tient son propre useState pour
 * que les pages restent indépendantes — cf. dialogue-audio.ts).
 *
 * Quand `slowAvailable === false`, le toggle est grisé avec une infobulle
 * expliquant que le mode lent n'est pas encore généré pour ce contenu.
 */
import type { CSSProperties } from 'react';

export type AudioSpeed = 'normal' | 'slow';

interface Props {
  mode: AudioSpeed;
  onChange: (next: AudioSpeed) => void;
  /** Si false : toggle grisé. Quand le manifest slow n'a pas été détecté. */
  slowAvailable?: boolean;
  /** Style optionnel pour s'adapter à l'agencement du player (ex: marge). */
  style?: CSSProperties;
  /** Classe CSS optionnelle pour s'adapter au thème de la page. */
  className?: string;
  /** Compact (icônes seulement) vs étendu (icônes + libellés). Défaut : étendu. */
  size?: 'compact' | 'default';
}

export default function AudioSpeedToggle({
  mode,
  onChange,
  slowAvailable = true,
  style,
  className,
  size = 'default',
}: Props) {
  const isSlow = mode === 'slow';
  const isCompact = size === 'compact';

  const handleClick = () => {
    if (!slowAvailable && !isSlow) return; // ne pas activer slow s'il n'est pas dispo
    onChange(isSlow ? 'normal' : 'slow');
  };

  const title = !slowAvailable
    ? 'Mode lent (shadowing) non encore disponible pour ce contenu'
    : isSlow
      ? 'Mode lent activé · cliquer pour repasser à la vitesse normale'
      : 'Activer le mode lent (idéal pour le shadowing)';

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isSlow}
      aria-label="Vitesse audio"
      title={title}
      onClick={handleClick}
      disabled={!slowAvailable && !isSlow}
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        padding: isCompact ? '4px 8px' : '6px 12px',
        borderRadius: 999,
        border: '1.5px solid',
        borderColor: isSlow ? '#D8483E' : 'rgba(0,0,0,0.12)',
        background: isSlow ? '#FFE3E0' : 'transparent',
        color: isSlow ? '#D8483E' : 'rgba(0,0,0,0.62)',
        fontSize: isCompact ? 12 : 13,
        fontWeight: 600,
        cursor: !slowAvailable && !isSlow ? 'not-allowed' : 'pointer',
        opacity: !slowAvailable && !isSlow ? 0.45 : 1,
        transition: 'all 180ms ease',
        whiteSpace: 'nowrap',
        userSelect: 'none',
        ...style,
      }}
    >
      <span aria-hidden="true" style={{ fontSize: isCompact ? 14 : 15 }}>
        {isSlow ? '🐢' : '🐇'}
      </span>
      {!isCompact && <span>{isSlow ? 'Lent' : 'Normal'}</span>}
    </button>
  );
}
