import { useCallback, useEffect, useMemo, useState } from 'react';
import type { Language } from '../i18n';
import type { LevelId, LessonItem } from '../types';
import { getLessonsByLevel, levelIds, loadHorsHskLessons } from '../data/lessons';
import { useFlashcardSRS } from '../hooks/useFlashcardSRS';
import FlashcardItem from '../components/FlashcardItem';
import { playAudioWithFallback } from '../utils/audio';
import './FlashcardPage.css';

interface FlashcardPageProps {
  language: Language;
  onWordLearned?: (wordId: string) => void;
  limitedMode?: boolean;
  dailyNewCardsLimit?: number;
  syncEnabled?: boolean;
  seenLessonWordIds?: string[];
  lessonWordPool?: LessonItem[];
}

type ViewMode = 'collection' | 'review-session';
type WordFilter = 'all' | 'mastered' | 'learning' | 'new' | 'difficult';
type ContentFilter = 'all' | 'sounds' | 'characters' | 'words';
type LevelBucket = 'all' | 'beginner' | 'intermediate' | 'advanced';

const LEVEL_BUCKET_LABELS: Record<Language, Record<LevelBucket, string>> = {
  fr: { all: 'Tous les niveaux', beginner: 'Débutant', intermediate: 'Intermédiaire', advanced: 'Avancé' },
  en: { all: 'All levels', beginner: 'Beginner', intermediate: 'Intermediate', advanced: 'Advanced' }
};

const WORD_LEVEL_BUCKETS: Record<Exclude<LevelBucket, 'all'>, LevelId[]> = {
  beginner: ['hsk1', 'hsk2'],
  intermediate: ['hsk3', 'hsk4'],
  advanced: ['hsk5', 'hsk6', 'hsk7', 'hors-hsk']
};

const REVIEW_LEVEL_BUCKETS: Record<Exclude<LevelBucket, 'all'>, LevelId[]> = {
  beginner: ['hsk1', 'hsk2', 'hsk3'],
  intermediate: ['hsk4', 'hsk5', 'hsk6'],
  advanced: ['hsk7', 'hors-hsk']
};

const SOUND_HINTS = ['pinyin', 'pronon', 'tone', 'ton', 'initial', 'final', 'syllab', 'minimal'];
const EXPRESSION_HINTS = ['expression', 'idiome', 'idiomatique', 'proverbe', 'politesse'];

const countCjkCharacters = (value: string) => (value.match(/[\u3400-\u9FFF]/g) || []).length;

const detectContentSignals = (word: LessonItem) => {
  const hanzi = word.hanzi ?? '';
  const cjkCount = countCjkCharacters(hanzi);
  const category = (word.category ?? '').toLowerCase();
  const tags = (word.tags ?? []).map((tag) => String(tag).toLowerCase());
  const hasSoundHint = tags.some((tag) => SOUND_HINTS.some((hint) => tag.includes(hint)));
  const hasSoundCategoryHint = SOUND_HINTS.some((hint) => category.includes(hint));
  const hasExpressionHint =
    tags.some((tag) => EXPRESSION_HINTS.some((hint) => tag.includes(hint))) || category.includes('expression');
  const hasPinyin = Boolean((word.pinyin ?? '').trim());
  const isSound = hasSoundHint || hasSoundCategoryHint || (cjkCount === 0 && hasPinyin);
  const isCharacter = !isSound && cjkCount === 1;
  const isShortExpression = hasExpressionHint && cjkCount > 0 && cjkCount <= 8;
  const isWord = !isSound && ((cjkCount >= 1 && cjkCount <= 4) || isShortExpression);
  return { isSound, isCharacter, isWord };
};

const matchesContentType = (word: LessonItem, filter: ContentFilter) => {
  const { isSound, isCharacter, isWord } = detectContentSignals(word);
  if (filter === 'all') return true;
  if (filter === 'sounds') return isSound;
  if (filter === 'characters') return isCharacter;
  return isWord;
};

const resolveBucketLevels = (
  bucket: LevelBucket,
  availableLevels: LevelId[],
  buckets: Record<Exclude<LevelBucket, 'all'>, LevelId[]>
): LevelId[] => {
  if (bucket === 'all') return availableLevels;
  const candidates = buckets[bucket];
  const levels = candidates.filter((level) => availableLevels.includes(level));
  return levels.length > 0 ? levels : availableLevels;
};

export default function FlashcardPage({
  language,
  onWordLearned,
  limitedMode = false,
  dailyNewCardsLimit = 10,
  syncEnabled = true,
  seenLessonWordIds = [],
  lessonWordPool
}: FlashcardPageProps) {
  const hasScopedLessonPool = lessonWordPool !== undefined;
  const scopedLessonPool = lessonWordPool ?? [];
  const availableLevels = useMemo<LevelId[]>(() => {
    if (hasScopedLessonPool) {
      const levels = Array.from(
        new Set(scopedLessonPool.map((word) => word.level).filter((level): level is LevelId => levelIds.includes(level)))
      );
      return levels.length > 0 ? levels : ['hsk1'];
    }
    return limitedMode ? ['hsk1'] : levelIds;
  }, [hasScopedLessonPool, scopedLessonPool, limitedMode]);

  const [horsHskReadyToken, setHorsHskReadyToken] = useState(0);
  const [viewMode, setViewMode] = useState<ViewMode>('collection');
  const [wordFilter, setWordFilter] = useState<WordFilter>('all');
  const [contentFilter, setContentFilter] = useState<ContentFilter>('all');
  const [levelBucket, setLevelBucket] = useState<LevelBucket>(limitedMode ? 'beginner' : 'all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sessionLaunchToken, setSessionLaunchToken] = useState(0);
  const [expandedWordId, setExpandedWordId] = useState<string | null>(null);

  useEffect(() => {
    if (hasScopedLessonPool) return;
    if (!availableLevels.includes('hors-hsk')) return;
    let active = true;
    loadHorsHskLessons()
      .then(() => { if (active) setHorsHskReadyToken((prev) => prev + 1); })
      .catch((error) => console.warn('Impossible de charger hors-hsk', error));
    return () => { active = false; };
  }, [availableLevels, hasScopedLessonPool]);

  const getWordsForLevels = useCallback(
    (levels: LevelId[]) => {
      if (hasScopedLessonPool) return scopedLessonPool.filter((word) => levels.includes(word.level));
      return levels.flatMap((level) => getLessonsByLevel(level));
    },
    [hasScopedLessonPool, scopedLessonPool]
  );

  const seenLessonWordSet = useMemo(() => new Set(seenLessonWordIds), [seenLessonWordIds]);

  const wordLevels = useMemo(
    () => resolveBucketLevels(levelBucket, availableLevels, WORD_LEVEL_BUCKETS),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [levelBucket, availableLevels, horsHskReadyToken]
  );

  const reviewLevels = useMemo(
    () => resolveBucketLevels(levelBucket, availableLevels, REVIEW_LEVEL_BUCKETS),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [levelBucket, availableLevels, horsHskReadyToken]
  );

  const allWordPool = useMemo(
    () => getWordsForLevels(wordLevels).filter((word) => matchesContentType(word, contentFilter)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [wordLevels, contentFilter, getWordsForLevels, horsHskReadyToken]
  );

  const reviewWordPool = useMemo(
    () => getWordsForLevels(reviewLevels).filter((word) => matchesContentType(word, contentFilter)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [reviewLevels, contentFilter, getWordsForLevels, horsHskReadyToken]
  );

  const reviewWords = useMemo(() => {
    const seenInLessons = reviewWordPool.filter((word) => seenLessonWordSet.has(word.id));
    return seenInLessons.length > 0 ? seenInLessons : reviewWordPool;
  }, [reviewWordPool, seenLessonWordSet]);

  const srsLevel: LevelId = reviewLevels[0] ?? 'hsk1';
  const { session, startSession, answerCard, getLevelStats, progressMap } = useFlashcardSRS(
    srsLevel, reviewWords, onWordLearned,
    { dailyNewCards: dailyNewCardsLimit, maxUnlockedLevel: limitedMode ? 'hsk1' : undefined, syncEnabled }
  );

  const reviewStats = getLevelStats();
  const reviewReadyCount = reviewStats.dueToday + Math.min(reviewStats.new, dailyNewCardsLimit);

  // Word pool with lesson-seen priority
  const wordDeck = useMemo(() => {
    const lessonSeen = allWordPool.filter((w) => seenLessonWordSet.has(w.id));
    if (hasScopedLessonPool) return lessonSeen.length > 0 ? lessonSeen : allWordPool;
    const learned = allWordPool.filter((w) => progressMap.has(w.id));
    return lessonSeen.length > 0 ? lessonSeen : learned.length > 0 ? learned : allWordPool;
  }, [allWordPool, seenLessonWordSet, progressMap, hasScopedLessonPool]);

  // Stats
  const totalCount = wordDeck.length;
  const masteredCount = useMemo(
    () => wordDeck.filter((w) => { const p = progressMap.get(w.id); return p && p.level >= 5; }).length,
    [wordDeck, progressMap]
  );
  const successRate = totalCount > 0 ? Math.round((masteredCount / totalCount) * 100) : 0;

  // Filtered words for display
  const displayWords = useMemo(() => {
    let words = wordDeck;
    if (wordFilter === 'mastered') words = words.filter((w) => { const p = progressMap.get(w.id); return p && p.level >= 5; });
    else if (wordFilter === 'learning') words = words.filter((w) => { const p = progressMap.get(w.id); return p && p.level > 0 && p.level < 5; });
    else if (wordFilter === 'new') words = words.filter((w) => !progressMap.has(w.id));
    else if (wordFilter === 'difficult') words = words.filter((w) => { const p = progressMap.get(w.id); return p && p.level <= 1 && p.level > 0; });

    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      words = words.filter((w) =>
        w.hanzi.toLowerCase().includes(q) ||
        w.pinyin.toLowerCase().includes(q) ||
        (w.translationFr || '').toLowerCase().includes(q) ||
        (w.translation || '').toLowerCase().includes(q)
      );
    }
    return words;
  }, [wordDeck, wordFilter, progressMap, searchQuery]);

  const getWordStatus = (word: LessonItem): 'mastered' | 'learning' | 'new' | 'difficult' => {
    const p = progressMap.get(word.id);
    if (!p) return 'new';
    if (p.level >= 5) return 'mastered';
    if (p.level <= 1 && p.level > 0) return 'difficult';
    return 'learning';
  };

  const statusColors: Record<string, string> = {
    mastered: 'var(--jade-green)',
    learning: 'var(--gold-accent)',
    new: 'var(--text-tertiary, #ccc)',
    difficult: 'var(--primary-red)'
  };

  const launchReview = useCallback(() => {
    setViewMode('review-session');
    setSessionLaunchToken((t) => t + 1);
  }, []);

  useEffect(() => {
    if (viewMode !== 'review-session' || sessionLaunchToken === 0) return;
    startSession();
  }, [viewMode, sessionLaunchToken, startSession]);

  const handleListenWord = useCallback((word: LessonItem) => {
    const audio = word.audio || word.examples.find((e) => Boolean(e.audio))?.audio;
    if (!audio) return;
    playAudioWithFallback(audio).catch((err) => console.error('Audio play failed:', err));
  }, []);

  // Review session view
  if (viewMode === 'review-session') {
    if (session.sessionComplete) {
      return (
        <div className="fc-page">
          <div className="fc-session-done">
            <span className="fc-session-done-icon">🎉</span>
            <h2>{language === 'fr' ? 'Session terminée !' : 'Session complete!'}</h2>
            <p>{language === 'fr' ? `${session.currentIndex} carte(s) révisée(s).` : `${session.currentIndex} card(s) reviewed.`}</p>
            <button type="button" className="fc-btn-primary" onClick={() => setViewMode('collection')}>
              {language === 'fr' ? 'Retour aux flashcards' : 'Back to flashcards'}
            </button>
          </div>
        </div>
      );
    }

    if (!session.currentCard) {
      return (
        <div className="fc-page">
          <div className="fc-session-done">
            <h2>{language === 'fr' ? 'Aucune carte disponible' : 'No cards available'}</h2>
            <p>{language === 'fr' ? 'Revenez plus tard ou changez les filtres.' : 'Come back later or change filters.'}</p>
            <button type="button" className="fc-btn-primary" onClick={() => setViewMode('collection')}>
              {language === 'fr' ? 'Retour' : 'Back'}
            </button>
          </div>
        </div>
      );
    }

    const isNewCard = session.newCards.some((c) => c.id === session.currentCard?.id);

    return (
      <div className="fc-page">
        <header className="fc-session-header">
          <button type="button" className="fc-back-btn" onClick={() => setViewMode('collection')}>
            ← {language === 'fr' ? 'Flashcards' : 'Flashcards'}
          </button>
          <span className="fc-session-count">{session.currentIndex + 1} / {session.totalCards}</span>
        </header>
        <FlashcardItem card={session.currentCard} onAnswer={answerCard} language={language} isNewCard={isNewCard} />
      </div>
    );
  }

  // Collection view
  const filterPills: { key: WordFilter; label: string; icon: string }[] = [
    { key: 'all', label: language === 'fr' ? 'Tous' : 'All', icon: '' },
    { key: 'mastered', label: language === 'fr' ? 'Maîtrisés' : 'Mastered', icon: '✅' },
    { key: 'learning', label: language === 'fr' ? 'En cours' : 'Learning', icon: '🔄' },
    { key: 'new', label: language === 'fr' ? 'Nouveaux' : 'New', icon: '⭐' },
    { key: 'difficult', label: language === 'fr' ? 'Difficiles' : 'Difficult', icon: '🔴' },
  ];

  return (
    <div className="fc-page">
      {/* Header */}
      <header className="fc-header">
        <div>
          <h1 className="fc-title">Flashcards 🃏</h1>
          <p className="fc-subtitle">
            {totalCount} {language === 'fr' ? 'mots dans ta collection' : 'words in your collection'}
          </p>
        </div>
        <button
          type="button"
          className="fc-btn-primary"
          onClick={launchReview}
          disabled={reviewReadyCount === 0}
        >
          {language === 'fr' ? 'Étudier maintenant' : 'Study now'} →
        </button>
      </header>

      {/* Stats row */}
      <div className="fc-stats-row">
        <div className="fc-stat">
          <span className="fc-stat-num">{totalCount}</span>
          <span className="fc-stat-label">TOTAL 🗃</span>
        </div>
        <div className="fc-stat">
          <span className="fc-stat-num fc-stat-green">{masteredCount}</span>
          <span className="fc-stat-label">{language === 'fr' ? 'MAÎTRISÉS' : 'MASTERED'} ✅</span>
        </div>
        <div className="fc-stat fc-stat-highlight">
          <span className="fc-stat-num fc-stat-red">{reviewReadyCount}</span>
          <span className="fc-stat-label">{language === 'fr' ? 'À REVOIR' : 'TO REVIEW'} 🔄</span>
        </div>
        <div className="fc-stat">
          <span className="fc-stat-num">{successRate}%</span>
          <span className="fc-stat-label">{language === 'fr' ? 'TAUX' : 'RATE'} 📊</span>
        </div>
      </div>

      {/* Search */}
      <div className="fc-search-wrap">
        <span className="fc-search-icon">🔍</span>
        <input
          type="text"
          className="fc-search"
          placeholder={language === 'fr' ? 'Rechercher un mot en français, chinois ou pinyin...' : 'Search in French, Chinese or pinyin...'}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Filter pills + level */}
      <div className="fc-filters">
        {filterPills.map((pill) => (
          <button
            key={pill.key}
            type="button"
            className={`fc-pill${wordFilter === pill.key ? ' active' : ''}`}
            onClick={() => setWordFilter(pill.key)}
          >
            {pill.icon && <span>{pill.icon}</span>} {pill.label}
          </button>
        ))}
        <select
          className="fc-level-select"
          value={levelBucket}
          onChange={(e) => setLevelBucket(e.target.value as LevelBucket)}
        >
          {Object.entries(LEVEL_BUCKET_LABELS[language]).map(([k, v]) => (
            <option key={k} value={k}>{v}</option>
          ))}
        </select>
      </div>

      {/* SRS review banner */}
      {reviewReadyCount > 0 && (
        <div className="fc-srs-banner">
          <div className="fc-srs-left">
            <strong>🧠 {language === 'fr' ? 'RÉPÉTITION ESPACÉE' : 'SPACED REPETITION'}</strong>
            <span className="fc-srs-count">
              {reviewReadyCount} {language === 'fr' ? 'mots à revoir aujourd\'hui' : 'words to review today'}
            </span>
            <span className="fc-srs-hint">
              {language === 'fr'
                ? 'Ces mots risquent d\'être oubliés. Il est temps de rafraîchir ta mémoire !'
                : 'These words might be forgotten. Time to refresh your memory!'}
            </span>
          </div>
          <button type="button" className="fc-srs-btn" onClick={launchReview}>
            {language === 'fr' ? 'Réviser maintenant' : 'Review now'} →
          </button>
        </div>
      )}

      {/* Word table */}
      {displayWords.length > 0 ? (
        <div className="fc-word-section">
          <div className="fc-word-section-header">
            <span>
              {wordFilter === 'all' ? (language === 'fr' ? 'Tous les mots' : 'All words')
                : wordFilter === 'mastered' ? (language === 'fr' ? 'Mots maîtrisés' : 'Mastered words')
                : wordFilter === 'learning' ? (language === 'fr' ? 'Mots en cours' : 'Learning words')
                : wordFilter === 'new' ? (language === 'fr' ? 'Nouveaux mots' : 'New words')
                : (language === 'fr' ? 'Mots difficiles' : 'Difficult words')}
              {' '}({displayWords.length})
            </span>
          </div>

          <table className="fc-word-table">
            <thead>
              <tr>
                <th className="fc-th-status">{language === 'fr' ? 'STATUT' : 'STATUS'}</th>
                <th className="fc-th-word">{language === 'fr' ? 'MOT' : 'WORD'}</th>
                <th className="fc-th-translation">{language === 'fr' ? 'TRADUCTION' : 'TRANSLATION'}</th>
                <th className="fc-th-level">NIVEAU</th>
              </tr>
            </thead>
            <tbody>
              {displayWords.slice(0, 100).map((word) => {
                const status = getWordStatus(word);
                const isExpanded = expandedWordId === word.id;
                return (
                  <tr
                    key={word.id}
                    className={`fc-word-row${isExpanded ? ' expanded' : ''}`}
                    onClick={() => setExpandedWordId(isExpanded ? null : word.id)}
                  >
                    <td className="fc-td-status">
                      <span className="fc-status-dot" style={{ background: statusColors[status] }} />
                    </td>
                    <td className="fc-td-word">
                      <div className="fc-word-inner">
                        <span>
                          <span className="fc-word-hanzi">{word.hanzi}</span>
                          <span className="fc-word-pinyin">({word.pinyin})</span>
                        </span>
                        {isExpanded && word.examples.length > 0 && (
                          <div className="fc-word-example">
                            💬 {word.examples[0].hanzi}
                            <br />
                            <em>— {language === 'fr' ? (word.examples[0].translationFr || word.examples[0].translation) : word.examples[0].translation}</em>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="fc-td-translation">
                      {language === 'fr' ? (word.translationFr || word.translation) : word.translation}
                    </td>
                    <td className="fc-td-level">
                      <div className="fc-level-inner">
                        <span className="fc-level-badge">{word.level.replace('hsk', 'HSK ')}</span>
                        <button
                          type="button"
                          className="fc-listen-btn"
                          onClick={(e) => { e.stopPropagation(); handleListenWord(word); }}
                          aria-label="Listen"
                        >
                          🔊
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {displayWords.length > 100 && (
            <p className="fc-truncated">
              {language === 'fr'
                ? `Affichage des 100 premiers mots sur ${displayWords.length}. Utilisez la recherche pour filtrer.`
                : `Showing first 100 of ${displayWords.length} words. Use search to filter.`}
            </p>
          )}
        </div>
      ) : (
        <div className="fc-empty">
          <h3>{language === 'fr' ? 'Aucun mot trouvé' : 'No words found'}</h3>
          <p>{language === 'fr' ? 'Terminez des leçons pour débloquer du vocabulaire.' : 'Complete lessons to unlock vocabulary.'}</p>
        </div>
      )}
    </div>
  );
}
