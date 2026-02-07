import type { Language } from '../../i18n';
import type { HskLevel, LessonCategory, LessonDifficulty } from '../../types/lesson-structure';

interface LessonBadgesProps {
  language: Language;
  hskLevel: HskLevel;
  category: LessonCategory;
  difficulty: LessonDifficulty;
  compact?: boolean;
}

const DIFFICULTY_LABELS: Record<LessonDifficulty, { fr: string; en: string; color: string }> = {
  beginner: { fr: 'Débutant', en: 'Beginner', color: '#10b981' },
  elementary: { fr: 'Élémentaire', en: 'Elementary', color: '#3b82f6' },
  intermediate: { fr: 'Intermédiaire', en: 'Intermediate', color: '#f59e0b' },
  advanced: { fr: 'Avancé', en: 'Advanced', color: '#ef4444' },
  superior: { fr: 'Supérieur', en: 'Superior', color: '#8b5cf6' }
};

const CATEGORY_ICONS: Record<LessonCategory, string> = {
  pronunciation: '🎵',
  grammar: '📚',
  conversation: '💬',
  vocabulary: '📝',
  culture: '🎎',
  writing: '✍️',
  reading: '📖'
};

const CATEGORY_LABELS: Record<LessonCategory, { fr: string; en: string }> = {
  pronunciation: { fr: 'Prononciation', en: 'Pronunciation' },
  grammar: { fr: 'Grammaire', en: 'Grammar' },
  conversation: { fr: 'Conversation', en: 'Conversation' },
  vocabulary: { fr: 'Vocabulaire', en: 'Vocabulary' },
  culture: { fr: 'Culture', en: 'Culture' },
  writing: { fr: 'Écriture', en: 'Writing' },
  reading: { fr: 'Lecture', en: 'Reading' }
};

const HSK_COLORS: Record<HskLevel, string> = {
  1: '#10b981',
  2: '#3b82f6',
  3: '#f59e0b',
  4: '#ef4444',
  5: '#ec4899',
  6: '#8b5cf6',
  7: '#6366f1'
};

export default function LessonBadges({ language, hskLevel, category, difficulty, compact = false }: LessonBadgesProps) {
  if (compact) {
    return (
      <div className="lesson-badges-compact">
        <span className="badge-hsk" style={{ backgroundColor: HSK_COLORS[hskLevel] }}>
          HSK{hskLevel}
        </span>
        <span className="badge-category">
          {CATEGORY_ICONS[category]}
        </span>
      </div>
    );
  }

  return (
    <div className="lesson-badges">
      <span className="badge-hsk" style={{ backgroundColor: HSK_COLORS[hskLevel] }}>
        HSK {hskLevel}
      </span>
      <span className="badge-category">
        {CATEGORY_ICONS[category]} {language === 'fr' ? CATEGORY_LABELS[category].fr : CATEGORY_LABELS[category].en}
      </span>
      <span className="badge-difficulty" style={{ color: DIFFICULTY_LABELS[difficulty].color }}>
        {language === 'fr' ? DIFFICULTY_LABELS[difficulty].fr : DIFFICULTY_LABELS[difficulty].en}
      </span>
    </div>
  );
}
