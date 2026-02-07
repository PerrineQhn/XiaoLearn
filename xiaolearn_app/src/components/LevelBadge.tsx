import type { LevelId } from '../types';

interface LevelBadgeProps {
  level?: LevelId | string | null;
  className?: string;
}

const normalizeLevel = (value: string) => {
  const trimmed = value.trim().toUpperCase();
  if (/^HSK\s*\d+$/.test(trimmed)) {
    return trimmed.replace(/\s+/g, '');
  }
  return trimmed;
};

const LevelBadge = ({ level, className = '' }: LevelBadgeProps) => {
  if (!level) return null;
  const label = normalizeLevel(String(level));
  const classes = ['level-badge', className].filter(Boolean).join(' ').trim();

  return <span className={classes}>{label}</span>;
};

export default LevelBadge;
