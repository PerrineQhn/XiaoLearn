import { useEffect, useState } from 'react';
import AudioButton from '../components/AudioButton';
import { getLessonsByTheme, getThemeSummaries } from '../data/lessons';
import type { ThemeSummary } from '../types';
import type { Language } from '../i18n';
import { themeLabels, getCopy } from '../i18n';
import { getLessonTranslation } from '../utils/lesson';
import type { CustomList } from '../hooks/useCustomLists';

interface ThemePageProps {
  selectedTheme: string | null;
  onSelectTheme: (theme: string) => void;
  copy: ReturnType<typeof getCopy>;
  language: Language;
  customLists: CustomList[];
  onAddWordToList: (listId: string, lessonId: string) => void;
  onCreateList: (name: string) => CustomList | null;
}

const themeSummaries: ThemeSummary[] = getThemeSummaries();

const ThemePage = ({
  selectedTheme,
  onSelectTheme,
  copy,
  language,
  customLists,
  onAddWordToList,
  onCreateList
}: ThemePageProps) => {
  const activeTheme = selectedTheme ?? themeSummaries[0]?.theme ?? '';
  const [visibleCount, setVisibleCount] = useState(25);
  const [selectedListId, setSelectedListId] = useState<string>('');
  const [listMessage, setListMessage] = useState('');
  const [newListName, setNewListName] = useState('');
  const [activeCardId, setActiveCardId] = useState<string | null>(null);
  const lessons = activeTheme ? getLessonsByTheme(activeTheme) : [];
  const visibleLessons = lessons.slice(0, visibleCount);
  const totalWordsAcrossThemes = themeSummaries.reduce((sum, entry) => sum + entry.count, 0);
  const activeThemeLabel = themeLabels[language][activeTheme] ?? activeTheme;

  useEffect(() => {
    setVisibleCount(25);
    setActiveCardId(null);
  }, [activeTheme]);

  useEffect(() => {
    if (!selectedListId && customLists.length > 0) {
      setSelectedListId(customLists[0].id);
    } else if (selectedListId && !customLists.some((list) => list.id === selectedListId)) {
      setSelectedListId(customLists[0]?.id ?? '');
    }
    if (customLists.length === 0) {
      setActiveCardId(null);
    }
  }, [customLists, selectedListId]);

  useEffect(() => {
    setListMessage('');
  }, [selectedListId, activeTheme]);

  const handleAddWord = (lessonId: string) => {
    if (!selectedListId) return;
    onAddWordToList(selectedListId, lessonId);
    const listName = customLists.find((list) => list.id === selectedListId)?.name ?? '';
    setListMessage(
      language === 'fr' ? `Ajouté à ${listName || 'la liste'}` : `Added to ${listName || 'list'}`
    );
    setTimeout(() => setListMessage(''), 2000);
  };

  const handleCreateList = () => {
    if (!newListName.trim()) return;
    const created = onCreateList(newListName.trim());
    if (created) {
      setSelectedListId(created.id);
      setNewListName('');
      setListMessage(language === 'fr' ? 'Liste créée' : 'List created');
      setTimeout(() => setListMessage(''), 2000);
    }
  };

  return (
    <div className="theme-page-modern">
      <header className="theme-hero-panel">
        <div className="hero-panel-text">
          <span className="hero-kicker">{language === 'fr' ? 'Apprentissage thématique' : 'Thematic journeys'}</span>
          <h1>{copy.themePageTitle}</h1>
          <p>{copy.themePageSubtitle}</p>
          <div className="hero-actions">
            <div className="hero-stat">
              <span className="hero-stat-label">{language === 'fr' ? 'Thèmes' : 'Themes'}</span>
              <span className="hero-stat-value">{themeSummaries.length}</span>
            </div>
            <div className="hero-stat">
              <span className="hero-stat-label">{language === 'fr' ? 'Cartes' : 'Cards'}</span>
              <span className="hero-stat-value">{totalWordsAcrossThemes}</span>
            </div>
            <div className="hero-stat">
              <span className="hero-stat-label">{language === 'fr' ? 'Listes' : 'Lists'}</span>
              <span className="hero-stat-value">{customLists.length}</span>
            </div>
          </div>
        </div>
        <div className="hero-panel-visual" aria-hidden="true">
          <div className="hero-orb orb-one" />
          <div className="hero-orb orb-two" />
        </div>
      </header>

      <div className="theme-body">
        <aside className="theme-filter-panel">
          <div className="filter-header">
            <p className="filter-label">{language === 'fr' ? 'Choisis un thème' : 'Choose a theme'}</p>
            <p className="filter-subtitle">
              {language === 'fr'
                ? 'Explore des listes inspirées des grands parcours Rosetta Stone.'
                : 'Explore curated journeys inspired by Rosetta Stone.'}
            </p>
          </div>
          <div className="theme-filter-list">
            {themeSummaries.map((entry) => (
              <button
                key={entry.theme}
                type="button"
                className={`theme-filter-card ${entry.theme === activeTheme ? 'active' : ''}`}
                onClick={() => onSelectTheme(entry.theme)}
              >
                <div className="theme-filter-name">{themeLabels[language][entry.theme] ?? entry.theme}</div>
                <div className="theme-filter-count">{entry.count} {language === 'fr' ? 'mots' : 'words'}</div>
              </button>
            ))}
          </div>
        </aside>

        <section className="theme-word-panel">
          {activeTheme ? (
            <>
              <header className="theme-word-header">
                <div>
                  <p className="section-label">{language === 'fr' ? 'Focus actuel' : 'Current focus'}</p>
                  <h2>{activeThemeLabel}</h2>
                  <p className="section-subtitle">
                    {visibleLessons.length} / {lessons.length}{' '}
                    {language === 'fr' ? 'mots visibles' : 'words visible'}
                  </p>
                </div>
                <div className="word-header-controls">
                  <div className="list-selector">
                    <label htmlFor="theme-list-select">
                      {language === 'fr' ? 'Liste cible' : 'Target list'}
                    </label>
                    <select
                      id="theme-list-select"
                      value={selectedListId}
                      onChange={(event) => setSelectedListId(event.target.value)}
                    >
                      <option value="">{language === 'fr' ? 'Aucune' : 'None'}</option>
                      {customLists.map((list) => (
                        <option key={list.id} value={list.id}>
                          {list.name} ({list.itemIds.length})
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="list-quick-create">
                    <label htmlFor="new-list-name">
                      {language === 'fr' ? 'Nouvelle liste' : 'New list'}
                    </label>
                    <div className="list-quick-row">
                      <input
                        id="new-list-name"
                        type="text"
                        value={newListName}
                        onChange={(event) => setNewListName(event.target.value)}
                        placeholder={language === 'fr' ? 'Nom de la liste' : 'List name'}
                      />
                      <button type="button" onClick={handleCreateList}>
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </header>

              <div className="theme-word-grid">
                {visibleLessons.map((lesson) => (
                  <article key={lesson.id} className="theme-word-card">
                    <div className="word-card-head">
                      <div className="word-card-hanzi">{lesson.hanzi}</div>
                      {lesson.level && <div className="word-card-level">{lesson.level.toUpperCase()}</div>}
                    </div>
                    <div className="word-card-meta">
                      <span className="word-card-pinyin">{lesson.pinyin}</span>
                      <AudioButton src={`/${lesson.audio}`} label={copy.audio} />
                    </div>
                    <p className="word-card-translation">
                      {getLessonTranslation(lesson, language)}
                    </p>
                    <div className="word-card-actions">
                      <button
                        type="button"
                        className="word-card-add"
                        onClick={() => {
                          setActiveCardId((prev) => (prev === lesson.id ? null : lesson.id));
                          if (!selectedListId && customLists.length > 0) {
                            setSelectedListId(customLists[0].id);
                          }
                          setListMessage('');
                        }}
                      >
                        {language === 'fr' ? 'Ajouter à la liste' : 'Add to list'}
                      </button>
                    </div>
                    {activeCardId === lesson.id && (
                      <div className="word-card-drawer">
                        {customLists.length === 0 ? (
                          <p className="list-empty-hint">
                            {language === 'fr'
                              ? 'Aucune liste disponible. Créez-en une ci-dessus.'
                              : 'No list available. Create one above.'}
                          </p>
                        ) : (
                          <div className="drawer-actions">
                            <select value={selectedListId} onChange={(event) => setSelectedListId(event.target.value)}>
                              <option value="">{language === 'fr' ? 'Choisir...' : 'Select...'}</option>
                              {customLists.map((list) => (
                                <option key={list.id} value={list.id}>
                                  {list.name} ({list.itemIds.length})
                                </option>
                              ))}
                            </select>
                            <button
                              type="button"
                              className="btn-primary"
                              onClick={() => handleAddWord(lesson.id)}
                              disabled={!selectedListId}
                            >
                              {language === 'fr' ? 'Ajouter' : 'Add'}
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </article>
                ))}
              </div>

              {lessons.length > 25 && (
                <div className="theme-actions">
                  <button
                    type="button"
                    className="btn-secondary"
                    onClick={() => {
                      if (visibleCount >= lessons.length) {
                        setVisibleCount(25);
                      } else {
                        setVisibleCount((count) => Math.min(lessons.length, count + 25));
                      }
                    }}
                  >
                    {visibleCount >= lessons.length
                      ? language === 'fr'
                        ? 'Réduire la liste'
                        : 'Show less'
                      : language === 'fr'
                      ? 'Afficher plus'
                      : 'Show more'}
                  </button>
                </div>
              )}

              {listMessage && <p className="list-feedback">{listMessage}</p>}
            </>
          ) : (
            <p>{language === 'fr' ? 'Pas de thème disponible.' : 'No theme available.'}</p>
          )}
        </section>
      </div>
    </div>
  );
};

export default ThemePage;
