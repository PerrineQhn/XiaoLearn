import { useEffect, useMemo, useState, type ReactNode } from 'react';
import type { LessonItem, LevelId } from '../types';
import type { Language } from '../i18n';
import { themeLabels, getCopy } from '../i18n';
import { getLessonTranslation } from '../utils/lesson';
import ReviewSrsSession, { type ReviewRating } from '../components/review/ReviewSrsSession';
import QuizPage from './QuizPage';
import DictationGamePage from './DictationGamePage';
import HandwritingPractice from '../components/HandwritingPractice';
import type { useQuizEngine } from '../hooks/useQuizEngine';
import LevelBadge from '../components/LevelBadge';
import type { CustomList } from '../hooks/useCustomLists';

type ReviewMode = 'overview' | 'srs' | 'quiz' | 'dictation' | 'handwriting';

interface ReviewPageProps {
  reviewItems: LessonItem[];
  totals: Record<LevelId, number>;
  copy: ReturnType<typeof getCopy>;
  language: Language;
  quiz: ReturnType<typeof useQuizEngine>;
  customLists: { id: string; name: string; items: LessonItem[] }[];
  listActions: {
    createList: (name: string) => CustomList | null;
    deleteList: (id: string) => void;
  };
}

interface SrsRecord {
  interval: number; // minutes
  due: number; // timestamp
  rating: ReviewRating;
  streak: number;
}

type SrsState = Record<string, SrsRecord>;
const STORAGE_KEY = 'cl_srs_state';

const loadStoredState = (items: LessonItem[]): SrsState => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as SrsState;
    const allowed = new Set(items.map((item) => item.id));
    return Object.fromEntries(Object.entries(parsed).filter(([key]) => allowed.has(key)));
  } catch {
    return {};
  }
};

const baseIntervals: Record<ReviewRating, number> = {
  again: 1, // 1 minute
  hard: 10,
  good: 12 * 60,
  easy: 3 * 24 * 60
};

const computeNextInterval = (current: number, rating: ReviewRating, streak: number) => {
  if (rating === 'again') return 1;
  if (rating === 'hard') {
    return Math.max(10, Math.round(current * 0.6) || baseIntervals.hard);
  }
  const multiplier = rating === 'good' ? 1.7 : 2.5 + streak * 0.1;
  const base = rating === 'good' ? baseIntervals.good : baseIntervals.easy;
  const value = current > 0 ? current : base;
  return Math.max(base, Math.round(value * multiplier));
};

const ReviewPage = ({ reviewItems, totals, copy, language, quiz, customLists, listActions }: ReviewPageProps) => {
  const [mode, setMode] = useState<ReviewMode>('overview');
  const [ratingTab, setRatingTab] = useState<ReviewRating>('again');
  const [activeListId, setActiveListId] = useState<'default' | string>('default');
  const [srsState, setSrsState] = useState<SrsState>(() => loadStoredState(reviewItems));
  const [newListName, setNewListName] = useState('');
  const [listsMessage, setListsMessage] = useState('');

  const activeList = useMemo(
    () => (activeListId === 'default' ? null : customLists.find((list) => list.id === activeListId) ?? null),
    [activeListId, customLists]
  );

  const itemsToReview = activeList ? activeList.items : reviewItems;

  const handleCreateList = () => {
    if (!newListName.trim()) return;
    const created = listActions.createList(newListName.trim());
    if (created) {
      setNewListName('');
      setListsMessage(language === 'fr' ? 'Liste créée' : 'List created');
    }
  };

  const handleDeleteList = (id: string) => {
    listActions.deleteList(id);
    if (activeListId === id) {
      setActiveListId('default');
    }
    setListsMessage(language === 'fr' ? 'Liste supprimée' : 'List deleted');
  };

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(srsState));
  }, [srsState]);

  useEffect(() => {
    if (activeListId !== 'default' && !customLists.some((list) => list.id === activeListId)) {
      setActiveListId('default');
    }
    setListsMessage('');
  }, [activeListId, customLists]);

  useEffect(() => {
    setSrsState((prev) => {
      const allowed = new Set(itemsToReview.map((item) => item.id));
      return Object.fromEntries(Object.entries(prev).filter(([key]) => allowed.has(key)));
    });
  }, [itemsToReview]);

  const totalLearned = useMemo(() => Object.values(totals).reduce((acc, value) => acc + value, 0), [totals]);
  const mastered = Math.round(totalLearned * 0.6);
  const now = Date.now();

  const sortedCards = useMemo(() => {
    let changed = false;
    const stateCopy = { ...srsState };
    const enriched = itemsToReview.map((item) => {
      const record = stateCopy[item.id];
      if (record) {
        return { item, due: record.due ?? now, rating: record.rating ?? 'again' };
      }
      const fallback = { interval: 0, due: now, rating: 'again' as ReviewRating, streak: 0 };
      stateCopy[item.id] = fallback;
      changed = true;
      return { item, due: now, rating: 'again' as ReviewRating };
    });
    if (changed) {
      setSrsState(stateCopy);
    }
    return enriched.sort((a, b) => a.due - b.due);
  }, [itemsToReview, srsState, now]);

  const dueItems = sortedCards.filter(({ due }) => due <= now).map(({ item }) => item);
  const upcomingCount = Math.max(sortedCards.length - dueItems.length, 0);
  const currentItem = dueItems[0];

  const handleAnswer = (rating: ReviewRating) => {
    if (!currentItem) return;
    setSrsState((prev) => {
      const record = prev[currentItem.id];
      const currentInterval = record?.interval ?? 0;
      const currentStreak = record?.streak ?? 0;
      const nextInterval = computeNextInterval(currentInterval, rating, currentStreak);
      const nextStreak =
        rating === 'again' ? 0 : rating === 'hard' ? Math.max(0, currentStreak - 1) : currentStreak + 1;
      return {
        ...prev,
        [currentItem.id]: {
          interval: nextInterval,
          due: Date.now() + nextInterval * 60 * 1000,
          rating,
          streak: nextStreak
        }
      };
    });
  };

  const ratingStats = useMemo(() => {
    const counts = { again: 0, hard: 0, good: 0, easy: 0 } as Record<ReviewRating, number>;
    for (const entry of Object.values(srsState)) {
      counts[entry.rating ?? 'again'] += 1;
    }
    return counts;
  }, [srsState]);

  const itemsByRating = useMemo(() => {
    const groups: Record<ReviewRating, LessonItem[]> = { again: [], hard: [], good: [], easy: [] };
    for (const lesson of itemsToReview) {
      const rating = srsState[lesson.id]?.rating ?? 'again';
      groups[rating].push(lesson);
    }
    return groups;
  }, [itemsToReview, srsState]);

  const renderModeContent = (): ReactNode => {
    if (mode === 'quiz') {
      return (
        <div className="review-mode-wrapper">
          <div className="review-mode-toolbar">
            <button type="button" className="btn-secondary" onClick={() => setMode('srs')}>
              ← {language === 'fr' ? 'Retour aux révisions' : 'Back to Review'}
            </button>
          </div>
          <QuizPage quiz={quiz} copy={copy} language={language} />
        </div>
      );
    }

    if (mode === 'dictation') {
      return (
        <div className="review-mode-wrapper">
          <div className="review-mode-toolbar">
            <button type="button" className="btn-secondary" onClick={() => setMode('srs')}>
              ← {language === 'fr' ? 'Retour aux révisions' : 'Back to Review'}
            </button>
          </div>
          <DictationGamePage language={language} />
        </div>
      );
    }

    if (mode === 'handwriting') {
      const handwritingCharacters = itemsToReview.map((item) => ({
        id: item.id,
        chinese: item.hanzi,
        pinyin: item.pinyin,
        french: getLessonTranslation(item, 'fr'),
        english: getLessonTranslation(item, 'en')
      }));

      return (
        <div className="review-mode-wrapper">
          <div className="review-mode-toolbar">
            <button type="button" className="btn-secondary" onClick={() => setMode('overview')}>
              ← {language === 'fr' ? 'Retour aux révisions' : 'Back to Review'}
            </button>
          </div>
          <HandwritingPractice
            language={language}
            characters={handwritingCharacters}
            onComplete={() => setMode('overview')}
          />
        </div>
      );
    }

    if (mode === 'srs') {
      return (
        <div className="review-mode-wrapper">
          <div className="review-mode-toolbar">
            <button type="button" className="btn-secondary" onClick={() => setMode('overview')}>
              ← {language === 'fr' ? 'Retour aux révisions' : 'Back to review'}
            </button>
          </div>
          <ReviewSrsSession
            currentItem={currentItem}
            pendingCount={dueItems.length}
            upcomingCount={upcomingCount}
            language={language}
            onAnswer={handleAnswer}
          />
        </div>
      );
    }

    const ratingLabels: Record<ReviewRating, string> = {
      again: language === 'fr' ? 'Encore' : 'Again',
      hard: language === 'fr' ? 'Difficile' : 'Hard',
      good: language === 'fr' ? 'Bien' : 'Good',
      easy: language === 'fr' ? 'Facile' : 'Easy'
    };
    const currentRatingItems = itemsByRating[ratingTab];

    return (
      <>
        <section className="review-status-section">
          <div className="rating-nav">
            {(Object.keys(ratingLabels) as ReviewRating[]).map((key) => (
              <button
                key={key}
                type="button"
                className={`rating-chip ${ratingTab === key ? 'active' : ''}`}
                onClick={() => setRatingTab(key)}
              >
                <span>{ratingLabels[key]}</span>
                <strong>{ratingStats[key]}</strong>
              </button>
            ))}
          </div>
          <div className="rating-list">
            {currentRatingItems.length === 0 ? (
              <p className="rating-empty">
                {language === 'fr' ? 'Aucun élément dans cette catégorie.' : 'No entries for this bucket.'}
              </p>
            ) : (
              currentRatingItems.slice(0, 12).map((item) => (
                <div key={item.id} className="rating-item">
                  <div className="rating-item-top">
                    <div className="rating-hanzi">{item.hanzi}</div>
                    <LevelBadge level={item.level} />
                  </div>
                  <div className="rating-details">
                    <span>{item.pinyin}</span>
                    <span>{getLessonTranslation(item, language)}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        <section className="review-items-section">
          <div className="review-items-header">
            <div>
              <h2 className="section-title">
                {language === 'fr' ? 'Mots à réviser' : 'Words to review'}
              </h2>
              <p className="review-items-subtitle">
                {language === 'fr' ? 'Liste des cartes planifiées dans vos revues' : 'Cards in your review queue'}
              </p>
            </div>
            <span className="review-pill">
              {itemsToReview.length} {language === 'fr' ? 'cartes' : 'cards'}
            </span>
          </div>

          <div className="review-items-list">
            {itemsToReview.map((item) => (
              <div key={item.id} className="review-item-card">
                <div className="review-item-hanzi-row">
                  <div className="review-item-hanzi">{item.hanzi}</div>
                  <LevelBadge level={item.level} />
                </div>
                <div className="review-item-details">
                  <div className="review-item-translation">
                    {getLessonTranslation(item, language)}
                  </div>
                  <div className="review-item-meta">
                    <span className="review-item-pinyin">{item.pinyin}</span>
                    <span className="review-item-separator">·</span>
                    <span className="review-item-theme">
                      {themeLabels[language][item.theme] ?? item.theme}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </>
    );
  };

  return (
    <div className="review-page">
      <header className="review-header">
        <div>
          <h1 className="page-title">{copy.reviewTitle}</h1>
          <p className="page-subtitle">
            {language === 'fr' ? "Révision espacée inspirée d'Anki" : 'Spaced repetition inspired by Anki'}
          </p>
        </div>
        <div className="review-list-picker">
          <label htmlFor="list-filter">
            {language === 'fr' ? 'Liste à réviser' : 'Review list'}
          </label>
          <select
            id="list-filter"
            value={activeListId}
            onChange={(event) => setActiveListId(event.target.value as typeof activeListId)}
          >
            <option value="default">
              {language === 'fr' ? 'Toutes les cartes' : 'All cards'}
            </option>
            {customLists.map((list) => (
              <option key={list.id} value={list.id}>
                {list.name} ({list.items.length})
              </option>
            ))}
          </select>
        </div>
      </header>

      <section className="review-lists-section">
        <div className="lists-panel">
          <div className="lists-panel-header">
            <div>
              <h2 className="section-title">
                {language === 'fr' ? 'Listes de révision' : 'Review lists'}
              </h2>
              <p className="lists-panel-subtitle">
                {language === 'fr'
                  ? 'Créez vos listes ici puis ajoutez des mots depuis le dictionnaire ou les thèmes.'
                  : 'Create your lists here, then add words from the dictionary or themes.'}
              </p>
            </div>
            <span className="lists-counter">{customLists.length}</span>
          </div>
          <div className="lists-panel-body stacked">
            <input
              type="text"
              value={newListName}
              onChange={(event) => setNewListName(event.target.value)}
              placeholder={language === 'fr' ? 'Nom de la liste' : 'List name'}
            />
            <button type="button" className="btn-primary" onClick={handleCreateList}>
              {language === 'fr' ? 'Créer' : 'Create'}
            </button>
          </div>
          {listsMessage && <p className="list-feedback">{listsMessage}</p>}
          {customLists.length === 0 ? (
            <p className="list-empty-hint">
              {language === 'fr'
                ? 'Aucune liste pour le moment. Créez-en une pour organiser vos révisions.'
                : 'No list yet. Create one to organize your reviews.'}
            </p>
          ) : (
            <div className="custom-lists-grid">
              {customLists.map((list) => (
                <div key={list.id} className="custom-list-card">
                  <div>
                    <div className="list-name">{list.name}</div>
                    <div className="list-count">
                      {list.items.length}{' '}
                      {language === 'fr'
                        ? `mot${list.items.length > 1 ? 's' : ''}`
                        : `word${list.items.length > 1 ? 's' : ''}`}
                    </div>
                  </div>
                  <button
                    type="button"
                    className="list-delete-btn"
                    onClick={() => handleDeleteList(list.id)}
                  >
                    {language === 'fr' ? 'Supprimer' : 'Delete'}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <nav className="review-mode-nav">
        <button
          className={`review-mode-btn ${mode === 'overview' ? 'active' : ''}`}
          onClick={() => setMode('overview')}
        >
          <span className="mode-icon">📋</span>
          <span className="mode-label">{language === 'fr' ? 'Vue générale' : 'Overview'}</span>
        </button>
        <button
          className={`review-mode-btn ${mode === 'srs' ? 'active' : ''}`}
          onClick={() => setMode('srs')}
        >
          <span className="mode-icon">🔄</span>
          <span className="mode-label">{language === 'fr' ? 'Révision espacée' : 'Spaced Repetition'}</span>
        </button>
        <button
          className={`review-mode-btn ${mode === 'quiz' ? 'active' : ''}`}
          onClick={() => setMode('quiz')}
        >
          <span className="mode-icon">🎯</span>
          <span className="mode-label">Quiz</span>
        </button>
        <button
          className={`review-mode-btn ${mode === 'dictation' ? 'active' : ''}`}
          onClick={() => setMode('dictation')}
        >
          <span className="mode-icon">🎧</span>
          <span className="mode-label">{language === 'fr' ? 'Dictée' : 'Dictation'}</span>
        </button>
        <button
          className={`review-mode-btn ${mode === 'handwriting' ? 'active' : ''}`}
          onClick={() => setMode('handwriting')}
        >
          <span className="mode-icon">✍️</span>
          <span className="mode-label">{language === 'fr' ? 'Écriture' : 'Handwriting'}</span>
        </button>
      </nav>

      <section className="review-stats-section">
        <h2 className="section-title">{copy.statsTitle}</h2>
        <div className="review-stats-grid">
          <div className="review-stat-card stat-green">
            <div className="stat-label">{copy.totalLearned}</div>
            <div className="stat-big-value">{totalLearned}</div>
          </div>
          <div className="review-stat-card stat-blue">
            <div className="stat-label">{copy.mastered}</div>
            <div className="stat-big-value">{mastered}</div>
          </div>
          <div className="review-stat-card stat-pink">
            <div className="stat-label">{copy.nextReviews}</div>
            <div className="stat-big-value">{itemsToReview.length}</div>
          </div>
        </div>
      </section>

      {renderModeContent()}
    </div>
  );
};

export default ReviewPage;
