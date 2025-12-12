import { useState, useMemo, useEffect } from 'react';
import { getAllLessons } from '../data/lessons';
import type { LessonItem } from '../types';
import type { Language } from '../i18n';
import AudioButton from '../components/AudioButton';
import LevelBadge from '../components/LevelBadge';
import type { CustomList } from '../hooks/useCustomLists';

interface DictionaryPageProps {
  copy: Record<string, string>;
  language: Language;
  customLists: CustomList[];
  onCreateList: (name: string) => CustomList | null;
  onAddWordToList: (listId: string, lessonId: string) => void;
}

const levelFilters = ['all', 'hsk1', 'hsk2', 'hsk3', 'hsk4', 'hsk5', 'hsk6', 'hsk7'] as const;
type LevelFilter = (typeof levelFilters)[number];

function DictionaryPage({ copy, language, customLists, onCreateList, onAddWordToList }: DictionaryPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEntry, setSelectedEntry] = useState<LessonItem | null>(null);
  const [levelFilter, setLevelFilter] = useState<LevelFilter>('all');
  const [selectedListId, setSelectedListId] = useState<string>('');
  const [listMessage, setListMessage] = useState('');
  const [newListName, setNewListName] = useState('');
  const [listPickerOpen, setListPickerOpen] = useState(false);
  const allLessons = useMemo(() => getAllLessons(), []);
  const trimmedQuery = searchQuery.trim();
  const hasSearch = trimmedQuery.length > 0;
  const totalWords = allLessons.length;

  // Recherche intelligente : hanzi, pinyin, traduction
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];

    const query = searchQuery.toLowerCase().trim();
    let filtered = allLessons;
    if (levelFilter !== 'all') {
      filtered = filtered.filter((lesson) => lesson.level === levelFilter);
    }

    return filtered
      .filter((lesson) => {
        const matchHanzi = lesson.hanzi.includes(query);
        const matchPinyin = lesson.pinyin.toLowerCase().includes(query);
        const matchTranslation = lesson.translation.toLowerCase().includes(query);
        const matchTranslationFr = lesson.translationFr.toLowerCase().includes(query);

        return matchHanzi || matchPinyin || matchTranslation || matchTranslationFr;
      })
      .slice(0, 50); // Limiter à 50 résultats
  }, [searchQuery, allLessons, levelFilter]);

  useEffect(() => {
    if (!selectedListId && customLists.length > 0) {
      setSelectedListId(customLists[0].id);
    } else if (selectedListId && !customLists.some((list) => list.id === selectedListId)) {
      setSelectedListId(customLists[0]?.id ?? '');
    }
    if (customLists.length === 0) {
      setListPickerOpen(false);
    }
  }, [customLists, selectedListId]);

  useEffect(() => {
    setListMessage('');
  }, [selectedEntry, selectedListId]);

  const handleAddToList = () => {
    if (!selectedEntry || !selectedListId) return;
    onAddWordToList(selectedListId, selectedEntry.id);
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
      setListPickerOpen(true);
      setListMessage(language === 'fr' ? 'Liste créée' : 'List created');
      setTimeout(() => setListMessage(''), 2000);
    }
  };

  return (
    <div className="dictionary-page">
      <div className="dictionary-header">
        <h2>{copy.dictionaryTitle || 'Dictionnaire'}</h2>
        <p className="dictionary-subtitle">
          {copy.dictionarySubtitle || 'Recherchez par caractère, pinyin ou traduction'}
        </p>
      </div>

      <div className="dictionary-search">
        <div className="dictionary-search-box">
          <input
            type="text"
            placeholder={copy.searchPlaceholder || 'Rechercher...'}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="dictionary-search-input"
            autoFocus
          />
          {searchQuery && (
            <button
              type="button"
              className="dictionary-clear-btn"
              onClick={() => {
                setSearchQuery('');
                setSelectedEntry(null);
              }}
            >
              ✕
            </button>
          )}
        </div>
        <div className="dictionary-level-filters">
          {levelFilters.map((level) => (
            <button
              key={level}
              type="button"
              className={`level-chip ${levelFilter === level ? 'active' : ''}`}
              onClick={() => setLevelFilter(level)}
            >
              {level === 'all' ? (language === 'fr' ? 'Tous' : 'All') : level.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {!hasSearch && (
        <div className="dictionary-tip">
          <div className="tip-icon">💡</div>
          <div>
            <p className="tip-title">{copy.dictionaryHint || 'Commencez à taper pour rechercher'}</p>
            <p className="tip-subtitle">
              {totalWords.toLocaleString()} {copy.dictionaryTotal || 'mots disponibles'}
            </p>
          </div>
        </div>
      )}

      <div className="dictionary-content">
        {/* Liste des résultats */}
        <div className="dictionary-results">
          {hasSearch && searchResults.length === 0 && (
            <div className="dictionary-empty">
              <p>🔍 {copy.noResults || 'Aucun résultat trouvé'}</p>
            </div>
          )}

          {!hasSearch && (
            <div className="dictionary-placeholder">
              {copy.dictionaryHint || 'Aucun résultat trouvé. Commencez à taper pour rechercher.'}
            </div>
          )}

          {searchResults.map((lesson) => (
            <button
              key={lesson.id}
              type="button"
              className={`dictionary-result-item ${selectedEntry?.id === lesson.id ? 'active' : ''}`}
              onClick={() => setSelectedEntry(lesson)}
            >
              <div className="result-hanzi">{lesson.hanzi}</div>
              <div className="result-details">
                <div className="result-pinyin">{lesson.pinyin}</div>
                <div className="result-translation">
                  {language === 'fr' ? lesson.translationFr : lesson.translation}
                </div>
              </div>
              <div className="result-level">
                <LevelBadge level={lesson.level} />
              </div>
            </button>
          ))}
        </div>

        {/* Détails de l'entrée sélectionnée */}
        {selectedEntry && (
          <div className="dictionary-detail">
              <div className="detail-header">
              <div className="detail-hanzi-large">{selectedEntry.hanzi}</div>
              <AudioButton src={`/${selectedEntry.audio}`} />
            </div>

            <div className="detail-section">
              <div className="detail-label">{copy.pinyin || 'Pinyin'}</div>
              <div className="detail-value">{selectedEntry.pinyin}</div>
            </div>

            <div className="detail-section">
              <div className="detail-label">{copy.translation || 'Traduction'}</div>
              <div className="detail-value">
                {language === 'fr' ? selectedEntry.translationFr : selectedEntry.translation}
              </div>
            </div>

            <div className="detail-section">
              <div className="detail-label">
                {language === 'fr' ? 'Listes personnalisées' : 'Custom lists'}
              </div>
              <button
                type="button"
                className="btn-secondary"
                onClick={() => {
                  setListPickerOpen((prev) => !prev);
                  if (!listPickerOpen && customLists.length > 0) {
                    setSelectedListId(customLists[0].id);
                  }
                }}
                disabled={!selectedEntry}
              >
                {language === 'fr' ? 'Ajouter à une liste' : 'Add to list'}
              </button>
              {listPickerOpen && (
                <div className="list-picker-panel compact">
                  {customLists.length === 0 ? (
                    <p className="list-empty-hint">
                      {language === 'fr'
                        ? 'Créez une liste puis réessayez.'
                        : 'Create a list then try again.'}
                    </p>
                  ) : (
                    <div className="list-manager">
                      <select value={selectedListId} onChange={(event) => setSelectedListId(event.target.value)}>
                        <option value="">{language === 'fr' ? 'Choisir une liste' : 'Choose a list'}</option>
                        {customLists.map((list) => (
                          <option key={list.id} value={list.id}>
                            {list.name} ({list.itemIds.length})
                          </option>
                        ))}
                      </select>
                      <button type="button" className="btn-primary" onClick={handleAddToList} disabled={!selectedListId}>
                        {language === 'fr' ? 'Ajouter' : 'Add'}
                      </button>
                    </div>
                  )}
                  <div className="list-create">
                    <input
                      type="text"
                      value={newListName}
                      onChange={(event) => setNewListName(event.target.value)}
                      placeholder={language === 'fr' ? 'Nom de la liste' : 'List name'}
                    />
                    <button type="button" className="btn-secondary" onClick={handleCreateList}>
                      {language === 'fr' ? 'Créer' : 'Create'}
                    </button>
                  </div>
                  {listMessage && <p className="list-feedback">{listMessage}</p>}
                </div>
              )}
            </div>

            {selectedEntry.explanation && (
              <div className="detail-section">
                <div className="detail-label">{copy.explanation || 'Explication'}</div>
                <div className="detail-value detail-explanation">{selectedEntry.explanation}</div>
              </div>
            )}

            <div className="detail-section">
              <div className="detail-label">{copy.category || 'Catégorie'}</div>
              <div className="detail-value">{selectedEntry.category}</div>
            </div>

            <div className="detail-section">
              <div className="detail-label">{copy.level || 'Niveau'}</div>
              <div className="detail-value">
                <LevelBadge level={selectedEntry.level} />
              </div>
            </div>

            {selectedEntry.tags && selectedEntry.tags.length > 0 && (
              <div className="detail-section">
                <div className="detail-label">{copy.tags || 'Tags'}</div>
                <div className="detail-tags">
                  {selectedEntry.tags.map((tag) => (
                    <span key={tag} className="detail-tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {selectedEntry.examples && selectedEntry.examples.length > 0 && (
              <div className="detail-section">
                <div className="detail-label">{copy.examples || 'Exemples'}</div>
                <div className="detail-examples">
                  {selectedEntry.examples.map((example, idx) => (
                    <div key={idx} className="detail-example">
                      <div>
                        <div className="example-hanzi">{example.hanzi}</div>
                        <div className="example-pinyin">{example.pinyin}</div>
                        <div className="example-translation">{example.translation}</div>
                      </div>
                      {example.audio && (
                        <AudioButton
                          src={`/${example.audio}`}
                          label={language === 'fr' ? 'Écouter' : 'Listen'}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default DictionaryPage;
