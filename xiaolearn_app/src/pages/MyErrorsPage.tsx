/**
 * MyErrorsPage — Carnet d'erreurs personnel (XiaoLearn)
 * ------------------------------------------------------
 * Inspiré du carnet d'erreurs Seonsaengnim. Affiche :
 *   - 4 cartes de stats : Total / Cette semaine / Pratiquées (7j) / Top catégorie
 *   - Section "À TRAVAILLER" : fautes récurrentes (≥ 2 occurrences) non-verrouillées
 *   - Onglets de source : Tout · Prof. Xiao · Simulator · Sauvegardées
 *   - Pills de filtre par catégorie
 *   - Liste chronologique des erreurs avec ErrorCorrectionCard
 *
 * Hooks : useErrorJournal (entries, stats, byCategory, recurrent).
 */

import { useMemo, useState } from 'react';
import '../styles/my-errors.css';
import { useErrorJournal } from '../hooks/useErrorJournal';
import ErrorCorrectionCard from '../components/ErrorCorrectionCard';
import {
  ERROR_CATEGORIES,
  getCategoryMeta,
  type ErrorCategory,
  type ErrorSource
} from '../types/error-journal';

type Language = 'fr' | 'en';
type SourceTab = 'all' | 'prof-xiao' | 'simulator' | 'saved';

interface Props {
  language?: Language;
}

const COPY = {
  fr: {
    kicker: 'CARNET PERSONNEL',
    title: "Mon carnet d'erreurs",
    subtitle:
      "Chaque correction de Prof. Xiao et du Simulateur atterrit ici. Entraîne-toi 30 s sur les récurrentes pour les verrouiller définitivement.",
    statTotal: 'TOTAL',
    statThisWeek: 'CETTE SEMAINE',
    statPracticed: 'PRATIQUÉES (7 J)',
    statTopCat: 'TOP CATÉGORIE',
    workTitle: '🔥 À TRAVAILLER',
    workSubtitle: '30 derniers jours',
    workIntro: 'Tes erreurs récurrentes',
    workHelp: 'Ces fautes reviennent souvent. 30 secondes d\'exercice = un blocage de moins.',
    practiceBtn: 'M\'entraîner · 30 s',
    sourceAll: 'Tout',
    sourceProfXiao: 'Prof. Xiao',
    sourceSimulator: 'Simulateur',
    sourceSaved: 'Sauvegardées',
    filterAll: 'Toutes',
    resultCount: (n: number) => `${n} résultat${n > 1 ? 's' : ''}`,
    todayHeader: 'AUJOURD\'HUI',
    yesterdayHeader: 'HIER',
    weekHeader: 'CETTE SEMAINE',
    earlierHeader: 'PLUS ANCIEN',
    emptyTitle: 'Aucune erreur encore enregistrée',
    emptyBody:
      'Tes fautes apparaîtront ici dès que tu écriras en chinois à Prof. Xiao ou dans le Simulateur.',
    delete: 'Supprimer',
    clearAll: 'Tout effacer',
    confirmClearAll: 'Effacer tout ton carnet d\'erreurs ? Cette action est irréversible.',
    timesSeen: (n: number) => (n === 1 ? '1 fois' : `${n} fois`),
    practiced: (n: number) => `${n}× pratiqué${n > 1 ? 's' : ''}`,
    occurrences: 'occurrences'
  },
  en: {
    kicker: 'PERSONAL NOTEBOOK',
    title: 'My error notebook',
    subtitle:
      'Every correction from Prof. Xiao and the Simulator lands here. Practice 30 s on recurring ones to lock them in.',
    statTotal: 'TOTAL',
    statThisWeek: 'THIS WEEK',
    statPracticed: 'PRACTICED (7 D)',
    statTopCat: 'TOP CATEGORY',
    workTitle: '🔥 TO WORK ON',
    workSubtitle: 'Last 30 days',
    workIntro: 'Your recurring errors',
    workHelp: 'These come up often. 30 seconds of practice = one less roadblock.',
    practiceBtn: 'Practice · 30 s',
    sourceAll: 'All',
    sourceProfXiao: 'Prof. Xiao',
    sourceSimulator: 'Simulator',
    sourceSaved: 'Saved',
    filterAll: 'All',
    resultCount: (n: number) => `${n} result${n > 1 ? 's' : ''}`,
    todayHeader: 'TODAY',
    yesterdayHeader: 'YESTERDAY',
    weekHeader: 'THIS WEEK',
    earlierHeader: 'EARLIER',
    emptyTitle: 'No errors recorded yet',
    emptyBody:
      'Your mistakes will appear here as soon as you write Chinese to Prof. Xiao or the Simulator.',
    delete: 'Delete',
    clearAll: 'Clear all',
    confirmClearAll: 'Clear your entire error notebook? This cannot be undone.',
    timesSeen: (n: number) => (n === 1 ? '1 time' : `${n} times`),
    practiced: (n: number) => `${n}× practiced`,
    occurrences: 'occurrences'
  }
} as const;

const isSameDay = (a: Date, b: Date): boolean =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

const formatTime = (iso: string, lang: Language): string => {
  try {
    return new Date(iso).toLocaleTimeString(lang === 'fr' ? 'fr-FR' : 'en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  } catch {
    return '';
  }
};

const formatDay = (iso: string, lang: Language): string => {
  try {
    return new Date(iso).toLocaleDateString(lang === 'fr' ? 'fr-FR' : 'en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  } catch {
    return iso;
  }
};

const MyErrorsPage = ({ language = 'fr' }: Props) => {
  const copy = COPY[language] ?? COPY.fr;
  const journal = useErrorJournal();

  const [sourceTab, setSourceTab] = useState<SourceTab>('all');
  const [categoryFilter, setCategoryFilter] = useState<ErrorCategory | 'all'>('all');

  // Filtrer
  const filtered = useMemo(() => {
    let list = journal.entries;
    if (sourceTab === 'prof-xiao') list = list.filter((e) => e.source === 'prof-xiao');
    else if (sourceTab === 'simulator') list = list.filter((e) => e.source === 'simulator');
    else if (sourceTab === 'saved') list = list.filter((e) => (e.tags ?? []).includes('saved'));
    if (categoryFilter !== 'all') list = list.filter((e) => e.category === categoryFilter);
    return list;
  }, [journal.entries, sourceTab, categoryFilter]);

  // Grouper par période
  const grouped = useMemo(() => {
    const now = new Date();
    const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const groups: Record<string, typeof filtered> = {
      today: [],
      yesterday: [],
      thisWeek: [],
      earlier: []
    };
    for (const e of filtered) {
      const d = new Date(e.lastSeenAt);
      if (isSameDay(d, now)) groups.today.push(e);
      else if (isSameDay(d, yesterday)) groups.yesterday.push(e);
      else if (d > weekAgo) groups.thisWeek.push(e);
      else groups.earlier.push(e);
    }
    return groups;
  }, [filtered]);

  const recurrentList = journal.recurrent();
  const topCatMeta = journal.stats.topCategory ? getCategoryMeta(journal.stats.topCategory) : null;

  // Comptes par catégorie pour les pills (basés sur le filtre source, pas catégorie)
  const sourceFiltered = useMemo(() => {
    if (sourceTab === 'prof-xiao') return journal.entries.filter((e) => e.source === 'prof-xiao');
    if (sourceTab === 'simulator') return journal.entries.filter((e) => e.source === 'simulator');
    if (sourceTab === 'saved') return journal.entries.filter((e) => (e.tags ?? []).includes('saved'));
    return journal.entries;
  }, [journal.entries, sourceTab]);

  const countsByCategory = useMemo(() => {
    const counts: Partial<Record<ErrorCategory, number>> = {};
    for (const e of sourceFiltered) {
      counts[e.category] = (counts[e.category] ?? 0) + 1;
    }
    return counts;
  }, [sourceFiltered]);

  const handleClearAll = () => {
    if (window.confirm(copy.confirmClearAll)) {
      journal.clear();
    }
  };

  const handlePractice = (id: string) => {
    // MVP : marque comme "pratiqué avec succès". Plus tard : ouvre modal QCM.
    journal.markPracticed(id, true);
  };

  const isEmpty = journal.entries.length === 0;

  return (
    <div className="my-errors-page">
      <header className="me-header">
        <p className="me-kicker">📝 {copy.kicker}</p>
        <h1 className="me-title">{copy.title}</h1>
        <p className="me-subtitle">{copy.subtitle}</p>
      </header>

      {/* Statistiques (4 cartes) */}
      <section className="me-stats">
        <div className="me-stat-card">
          <div className="me-stat-label">📕 {copy.statTotal}</div>
          <div className="me-stat-value">{journal.stats.total}</div>
        </div>
        <div className="me-stat-card">
          <div className="me-stat-label">📈 {copy.statThisWeek}</div>
          <div className="me-stat-value me-stat-value--accent">{journal.stats.thisWeek}</div>
        </div>
        <div className="me-stat-card">
          <div className="me-stat-label">✨ {copy.statPracticed}</div>
          <div className="me-stat-value">{journal.stats.practicedLast7Days}</div>
        </div>
        <div className="me-stat-card">
          <div className="me-stat-label">🏆 {copy.statTopCat}</div>
          <div className="me-stat-value-small">
            {topCatMeta ? (
              <>
                <span style={{ marginRight: 4 }}>{topCatMeta.emoji}</span>
                {topCatMeta[language === 'en' ? 'labelEn' : 'label']}
                <span className="me-stat-mult"> ×{journal.stats.topCategoryCount}</span>
              </>
            ) : (
              '—'
            )}
          </div>
        </div>
      </section>

      {/* Section "À travailler" — affichée seulement si récurrentes */}
      {recurrentList.length > 0 && (
        <section className="me-work-section">
          <div className="me-work-header">
            <div>
              <span className="me-work-pill">{copy.workTitle}</span>
              <span className="me-work-sub">· {copy.workSubtitle}</span>
            </div>
            <div className="me-work-count-badge">{recurrentList.length}</div>
          </div>
          <h2 className="me-work-intro">{copy.workIntro}</h2>
          <p className="me-work-help">{copy.workHelp}</p>

          <div className="me-work-list">
            {recurrentList.slice(0, 6).map((entry) => {
              const meta = getCategoryMeta(entry.category);
              return (
                <article key={entry.id} className="me-work-card">
                  <div className="me-work-card-head">
                    <span
                      className="me-cat-pill"
                      style={{ background: meta.bgColor, color: meta.fgColor }}
                    >
                      {meta.emoji} {meta.label.toUpperCase()}
                    </span>
                    <span className="me-work-mult">×{entry.occurrenceCount}</span>
                  </div>
                  <div className="me-work-correct">
                    <span className="me-work-correct-hanzi">{entry.correctText}</span>
                  </div>
                  <p className="me-work-wrong">
                    <span className="me-work-wrong-label">Tu as écrit :</span>{' '}
                    <span className="me-work-wrong-text">{entry.wrongText}</span>
                  </p>
                  <p className="me-work-explanation">"{entry.explanation}"</p>
                  <button
                    type="button"
                    className="me-practice-btn"
                    onClick={() => handlePractice(entry.id)}
                  >
                    ✨ {copy.practiceBtn}
                  </button>
                </article>
              );
            })}
          </div>
        </section>
      )}

      {/* Onglets sources */}
      <div className="me-source-tabs" role="tablist">
        <button
          type="button"
          role="tab"
          aria-selected={sourceTab === 'all'}
          className={`me-source-tab ${sourceTab === 'all' ? 'is-active' : ''}`}
          onClick={() => setSourceTab('all')}
        >
          {copy.sourceAll}
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={sourceTab === 'prof-xiao'}
          className={`me-source-tab ${sourceTab === 'prof-xiao' ? 'is-active' : ''}`}
          onClick={() => setSourceTab('prof-xiao')}
        >
          {copy.sourceProfXiao}
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={sourceTab === 'simulator'}
          className={`me-source-tab ${sourceTab === 'simulator' ? 'is-active' : ''}`}
          onClick={() => setSourceTab('simulator')}
        >
          {copy.sourceSimulator}
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={sourceTab === 'saved'}
          className={`me-source-tab ${sourceTab === 'saved' ? 'is-active' : ''}`}
          onClick={() => setSourceTab('saved')}
        >
          📌 {copy.sourceSaved}
        </button>
        <span className="me-result-count">{copy.resultCount(filtered.length)}</span>
      </div>

      {/* Pills de filtre par catégorie */}
      <div className="me-cat-filters">
        <button
          type="button"
          className={`me-cat-filter ${categoryFilter === 'all' ? 'is-active' : ''}`}
          onClick={() => setCategoryFilter('all')}
        >
          {copy.filterAll}
        </button>
        {ERROR_CATEGORIES.map((cat) => {
          const count = countsByCategory[cat.key] ?? 0;
          if (count === 0) return null;
          return (
            <button
              key={cat.key}
              type="button"
              className={`me-cat-filter ${categoryFilter === cat.key ? 'is-active' : ''}`}
              onClick={() => setCategoryFilter(cat.key)}
              style={categoryFilter === cat.key ? { background: cat.bgColor, color: cat.fgColor, borderColor: cat.fgColor } : undefined}
            >
              <span aria-hidden="true">{cat.emoji}</span>
              {cat[language === 'en' ? 'labelEn' : 'label']}
              <span className="me-cat-filter-count">{count}</span>
            </button>
          );
        })}
      </div>

      {/* Liste des entrées groupées */}
      <section className="me-list">
        {isEmpty ? (
          <div className="me-empty">
            <div className="me-empty-icon">📝</div>
            <h3>{copy.emptyTitle}</h3>
            <p>{copy.emptyBody}</p>
          </div>
        ) : (
          <>
            {grouped.today.length > 0 && (
              <ErrorGroup
                title={copy.todayHeader}
                entries={grouped.today}
                language={language}
                onDelete={journal.removeError}
                deleteLabel={copy.delete}
                showTime
              />
            )}
            {grouped.yesterday.length > 0 && (
              <ErrorGroup
                title={copy.yesterdayHeader}
                entries={grouped.yesterday}
                language={language}
                onDelete={journal.removeError}
                deleteLabel={copy.delete}
                showTime
              />
            )}
            {grouped.thisWeek.length > 0 && (
              <ErrorGroup
                title={copy.weekHeader}
                entries={grouped.thisWeek}
                language={language}
                onDelete={journal.removeError}
                deleteLabel={copy.delete}
              />
            )}
            {grouped.earlier.length > 0 && (
              <ErrorGroup
                title={copy.earlierHeader}
                entries={grouped.earlier}
                language={language}
                onDelete={journal.removeError}
                deleteLabel={copy.delete}
              />
            )}

            {/* Bouton "Tout effacer" en bas */}
            {journal.entries.length > 0 && (
              <div style={{ textAlign: 'center', marginTop: 24 }}>
                <button
                  type="button"
                  className="me-clear-btn"
                  onClick={handleClearAll}
                >
                  🗑️ {copy.clearAll}
                </button>
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
};

// =====================================================================
//  Sous-composant : groupe d'erreurs avec en-tête + cartes
// =====================================================================

interface GroupProps {
  title: string;
  entries: ReturnType<typeof useErrorJournal>['entries'];
  language: Language;
  onDelete: (id: string) => void;
  deleteLabel: string;
  showTime?: boolean;
}

const ErrorGroup = ({ title, entries, language, onDelete, deleteLabel, showTime }: GroupProps) => {
  return (
    <div className="me-group">
      <div className="me-group-header">
        <span className="me-group-title">{title}</span>
        <span className="me-group-count">{entries.length}</span>
      </div>
      <div className="me-group-list">
        {entries.map((e) => (
          <div key={e.id} className="me-group-item">
            <div className="me-group-item-meta">
              <span className="me-group-source">
                {e.source === 'prof-xiao' ? '💬 Prof. Xiao' : e.source === 'simulator' ? '🎭 Simulateur' : '📝'}
              </span>
              <span className="me-group-time">
                {showTime ? formatTime(e.lastSeenAt, language) : formatDay(e.lastSeenAt, language)}
              </span>
              {e.occurrenceCount > 1 && (
                <span className="me-group-mult">×{e.occurrenceCount}</span>
              )}
              <button
                type="button"
                className="me-group-delete"
                aria-label={deleteLabel}
                title={deleteLabel}
                onClick={() => onDelete(e.id)}
              >
                ×
              </button>
            </div>
            <ErrorCorrectionCard entry={e} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyErrorsPage;
