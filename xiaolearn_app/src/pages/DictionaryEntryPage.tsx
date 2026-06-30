/**
 * DictionaryEntryPage — fiche détail d'une entrée du dictionnaire.
 * Reproduit le visuel de xiaolearn_reference/src/pages/dictionnaire/[id].astro :
 *  - large hanzi + bouton audio + badge HSK
 *  - pinyin + traduction principale
 *  - traductions alternatives
 *  - explication
 *  - exemples avec audio
 *  - sidebar Informations / Tags / Navigation prev/next
 *
 * Résolution : on accepte soit un `entryId` direct (préféré), soit un `hanzi`
 * brut (fallback depuis la barre de recherche). On utilise findEntryByHanzi
 * pour résoudre les hanzi à un id.
 */

import { useEffect, useState } from 'react';
import type { DictionaryEntry, DictionaryLevel } from '../types/dictionary';
import {
  LEVEL_BG,
  LEVEL_COLOR,
  LEVEL_LABEL,
  fetchEntryById,
  fetchLevelEntries,
  findEntryByHanzi
} from '../data/dictionary';
import { playHanziAudio, preloadHanziAudio } from '../utils/audio';

interface Props {
  /** Id direct d'entrée (ex: 'hsk1-0001'). Prioritaire sur `hanzi`. */
  entryId?: string | null;
  /** Hanzi brut (fallback depuis la barre de recherche). */
  hanzi?: string | null;
  language: 'fr' | 'en';
  onBack: () => void;
  onSelectEntry: (entryId: string) => void;
  /** Retour au niveau (carte du hub). */
  onOpenLevel: (level: DictionaryLevel) => void;
}

export default function DictionaryEntryPage({
  entryId,
  hanzi,
  language,
  onBack,
  onSelectEntry,
  onOpenLevel
}: Props) {
  const [entry, setEntry] = useState<DictionaryEntry | null>(null);
  const [neighbors, setNeighbors] = useState<{
    prev: DictionaryEntry | null;
    next: DictionaryEntry | null;
  }>({ prev: null, next: null });
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  // Résolution de l'entrée
  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setNotFound(false);
    setEntry(null);
    setNeighbors({ prev: null, next: null });

    const resolve = async () => {
      let resolved: DictionaryEntry | null = null;
      if (entryId) {
        resolved = await fetchEntryById(entryId);
      }
      if (!resolved && hanzi) {
        resolved = await findEntryByHanzi(hanzi);
      }
      if (cancelled) return;
      if (!resolved) {
        setNotFound(true);
        setLoading(false);
        return;
      }
      setEntry(resolved);
      setLoading(false);

      // Précharge l'audio du hanzi principal en arrière-plan
      preloadHanziAudio(resolved.hanzi).catch(() => {});

      // Charge les voisins (prev/next) dans le même niveau
      try {
        const all = await fetchLevelEntries(resolved.level);
        if (cancelled) return;
        const idx = all.findIndex((e) => e.id === resolved!.id);
        if (idx >= 0) {
          setNeighbors({
            prev: idx > 0 ? all[idx - 1] : null,
            next: idx < all.length - 1 ? all[idx + 1] : null
          });
        }
      } catch {
        /* ignore voisinage */
      }
    };

    resolve();
    return () => {
      cancelled = true;
    };
  }, [entryId, hanzi]);

  if (loading) {
    return (
      <div className="dict-entry-page">
        <div className="dict-entry-loading">
          {language === 'fr' ? 'Chargement…' : 'Loading…'}
        </div>
        <style>{commonStyles}</style>
      </div>
    );
  }

  if (notFound || !entry) {
    return (
      <div className="dict-entry-page">
        <button type="button" className="dict-breadcrumb-back" onClick={onBack}>
          <span aria-hidden>←</span>
          {language === 'fr' ? 'Retour' : 'Back'}
        </button>
        <div className="dict-entry-loading">
          {language === 'fr'
            ? 'Entrée introuvable.'
            : 'Entry not found.'}
        </div>
        <style>{commonStyles}</style>
      </div>
    );
  }

  const trMain =
    language === 'en'
      ? entry.translationEn || entry.translationFr
      : entry.translationFr || entry.translationEn;
  const usefulTags = (entry.tags ?? []).filter(
    (t) => !t.startsWith('level:') && !t.startsWith('id:')
  );

  return (
    <div className="dict-entry-page">
      <div
        className="dict-entry-header"
        style={{
          background: `linear-gradient(135deg, ${LEVEL_BG[entry.level]}, var(--bg-secondary))`
        }}
      >
        <button type="button" className="dict-breadcrumb-back" onClick={onBack}>
          <span aria-hidden>←</span>
          {language === 'fr' ? 'Retour' : 'Back'}
        </button>
        <button
          type="button"
          className="dict-breadcrumb-level"
          onClick={() => onOpenLevel(entry.level)}
          style={{
            background: LEVEL_COLOR[entry.level],
            color: '#fff'
          }}
        >
          {LEVEL_LABEL[entry.level]}
        </button>
      </div>

      <div className="dict-entry-layout">
        <article className="dict-entry-main">
          <header className="dict-entry-title">
            <div className="dict-entry-title-row">
              <h1 className="dict-entry-hanzi">{entry.hanzi}</h1>
              <button
                type="button"
                className="dict-entry-audio"
                onClick={() => {
                  playHanziAudio(entry.hanzi).catch(() => {});
                }}
                onMouseEnter={() => preloadHanziAudio(entry.hanzi).catch(() => {})}
                aria-label={language === 'fr' ? 'Écouter' : 'Listen'}
              >
                🔊
              </button>
              <span
                className="dict-entry-level-badge"
                style={{
                  background: LEVEL_COLOR[entry.level],
                  color: '#fff'
                }}
              >
                {LEVEL_LABEL[entry.level]}
              </span>
            </div>
            <p className="dict-entry-pinyin">{entry.pinyin}</p>
            <p className="dict-entry-translation">{trMain}</p>
          </header>

          {entry.translationFrAlt && entry.translationFrAlt.length > 0 && (
            <section className="dict-entry-section">
              <h3>{language === 'fr' ? 'Autres traductions' : 'Alternate translations'}</h3>
              <ul className="dict-entry-alt-list">
                {entry.translationFrAlt.map((alt) => (
                  <li key={alt}>{alt}</li>
                ))}
              </ul>
            </section>
          )}

          {(entry.explanationFr || entry.explanation) && (
            <section className="dict-entry-section">
              <h3>{language === 'fr' ? 'Explication' : 'Explanation'}</h3>
              <p className="dict-entry-explanation">
                {language === 'en'
                  ? entry.explanation || entry.explanationFr
                  : entry.explanationFr || entry.explanation}
              </p>
            </section>
          )}

          {entry.examples && entry.examples.length > 0 && (
            <section className="dict-entry-section">
              <h3>{language === 'fr' ? 'Exemples' : 'Examples'}</h3>
              <div className="dict-entry-examples">
                {entry.examples.map((ex, idx) => (
                  <div className="dict-entry-example" key={`${entry.id}-ex-${idx}`}>
                    <div className="dict-entry-example-line">
                      <p className="dict-entry-example-chinese">{ex.chinese}</p>
                      <button
                        type="button"
                        className="dict-entry-example-audio"
                        onClick={() => {
                          playHanziAudio(ex.chinese).catch(() => {});
                        }}
                        onMouseEnter={() =>
                          preloadHanziAudio(ex.chinese).catch(() => {})
                        }
                        aria-label={language === 'fr' ? 'Écouter' : 'Listen'}
                      >
                        🔊
                      </button>
                    </div>
                    <p className="dict-entry-example-pinyin">{ex.pinyin}</p>
                    <p className="dict-entry-example-translation">
                      {language === 'en'
                        ? ex.translationEn || ex.translationFr
                        : ex.translationFr || ex.translationEn}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </article>

        <aside className="dict-entry-sidebar">
          <div className="dict-entry-card">
            <h4>{language === 'fr' ? 'Informations' : 'Info'}</h4>
            <dl>
              <dt>{language === 'fr' ? 'Niveau' : 'Level'}</dt>
              <dd>
                <span
                  className="dict-entry-level-pill"
                  style={{
                    background: LEVEL_BG[entry.level],
                    color: LEVEL_COLOR[entry.level]
                  }}
                >
                  {LEVEL_LABEL[entry.level]}
                </span>
              </dd>

              {entry.category && (
                <>
                  <dt>{language === 'fr' ? 'Catégorie' : 'Category'}</dt>
                  <dd className="dict-entry-capitalize">{entry.category}</dd>
                </>
              )}

              {entry.theme && (
                <>
                  <dt>{language === 'fr' ? 'Thème' : 'Theme'}</dt>
                  <dd className="dict-entry-capitalize">{entry.theme}</dd>
                </>
              )}
            </dl>
          </div>

          {usefulTags.length > 0 && (
            <div className="dict-entry-card">
              <h4>{language === 'fr' ? 'Tags' : 'Tags'}</h4>
              <div className="dict-entry-tags">
                {usefulTags.map((tag) => (
                  <span className="dict-entry-tag" key={tag}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {(neighbors.prev || neighbors.next) && (
            <div className="dict-entry-card">
              <h4>{language === 'fr' ? 'Navigation' : 'Navigation'}</h4>
              <div className="dict-entry-nav-links">
                {neighbors.prev && (
                  <button
                    type="button"
                    className="dict-entry-nav-link"
                    onClick={() => onSelectEntry(neighbors.prev!.id)}
                  >
                    <span className="dict-entry-nav-label">
                      {language === 'fr' ? 'Précédent' : 'Previous'}
                    </span>
                    <span className="dict-entry-nav-value">
                      {neighbors.prev.hanzi} · {neighbors.prev.pinyin}
                    </span>
                  </button>
                )}
                {neighbors.next && (
                  <button
                    type="button"
                    className="dict-entry-nav-link"
                    onClick={() => onSelectEntry(neighbors.next!.id)}
                  >
                    <span className="dict-entry-nav-label">
                      {language === 'fr' ? 'Suivant' : 'Next'}
                    </span>
                    <span className="dict-entry-nav-value">
                      {neighbors.next.hanzi} · {neighbors.next.pinyin}
                    </span>
                  </button>
                )}
              </div>
            </div>
          )}

          <button
            type="button"
            className="dict-entry-back-btn"
            onClick={() => onOpenLevel(entry.level)}
          >
            ← {language === 'fr' ? `Retour à ${LEVEL_LABEL[entry.level]}` : `Back to ${LEVEL_LABEL[entry.level]}`}
          </button>
        </aside>
      </div>

      <style>{commonStyles}</style>
    </div>
  );
}

const commonStyles = `
  .dict-entry-page {
    max-width: 1100px;
    margin: 0 auto;
    padding: 0 var(--spacing-lg) var(--spacing-xl);
    color: var(--text-primary);
  }
  .dict-entry-loading {
    padding: var(--spacing-2xl);
    text-align: center;
    color: var(--text-tertiary);
  }
  /* V18 — Bouton Retour proper (pas juste du texte). Le label « Dictionnaire »
     est remplacé par « Retour » pour matcher le pattern des autres pages. */
  .dict-breadcrumb-back {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: var(--bg-primary);
    border: 1px solid var(--border-light);
    color: var(--text-primary);
    cursor: pointer;
    padding: 8px 14px;
    border-radius: var(--radius-full);
    font-size: 0.9rem;
    font-family: inherit;
    font-weight: 500;
    transition: all var(--transition-base);
  }
  .dict-breadcrumb-back:hover {
    background: var(--bg-secondary);
    border-color: var(--text-tertiary);
    color: var(--primary-red);
    transform: translateX(-2px);
  }
  .dict-breadcrumb-back span {
    font-size: 1rem;
    line-height: 1;
  }
  /* V18 — Le badge HSK dans le breadcrumb : pastille colorée pas un lien
     simple. Couleur de fond = couleur de niveau, écarté du bouton Retour
     par le gap du parent (passé à --spacing-lg). */
  .dict-breadcrumb-level {
    background: var(--jade-green);
    border: none;
    color: #fff;
    cursor: pointer;
    padding: 6px 14px;
    border-radius: var(--radius-full);
    font-size: 0.8rem;
    font-weight: 700;
    font-family: inherit;
    transition: all var(--transition-base);
    margin-left: auto;
  }
  .dict-breadcrumb-level:hover {
    transform: scale(1.05);
    filter: brightness(1.08);
  }
  .dict-entry-header {
    padding: var(--spacing-lg) var(--spacing-xl);
    border-radius: var(--radius-xl);
    border: 1px solid var(--border-light);
    margin: var(--spacing-lg) 0;
    display: flex;
    align-items: center;
    gap: var(--spacing-lg);
  }
  .dict-entry-layout {
    display: grid;
    grid-template-columns: 1fr 300px;
    gap: var(--spacing-xl);
    align-items: start;
  }
  .dict-entry-main {
    background: var(--bg-primary);
    border-radius: var(--radius-xl);
    padding: var(--spacing-xl);
    border: 1px solid var(--border-light);
  }
  .dict-entry-title {
    margin-bottom: var(--spacing-xl);
    padding-bottom: var(--spacing-lg);
    border-bottom: 1px solid var(--border-light);
  }
  .dict-entry-title-row {
    display: flex;
    align-items: center;
    gap: var(--spacing-md);
    flex-wrap: wrap;
    margin-bottom: var(--spacing-md);
  }
  .dict-entry-hanzi {
    font-family: var(--font-serif);
    font-size: 4rem;
    line-height: 1;
    margin: 0;
    color: var(--text-primary);
  }
  /* V18 — Bouton audio principal harmonisé avec ceux des exemples : fond
     clair + bordure + icône colorée (était rouge vif → trop tape-à-l'œil
     vs reste de la fiche). Plus grand que dans les exemples (44px vs 32px)
     pour rester visible à côté du hanzi 4rem. */
  .dict-entry-audio {
    background: var(--bg-primary);
    color: var(--primary-red);
    border: 1px solid var(--border-light);
    border-radius: var(--radius-full);
    width: 44px;
    height: 44px;
    font-size: 1.2rem;
    cursor: pointer;
    transition: all var(--transition-base);
    margin-top: 0.4rem;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }
  .dict-entry-audio:hover {
    background: var(--primary-red);
    color: white;
    border-color: var(--primary-red);
    transform: scale(1.05);
  }
  .dict-entry-level-badge {
    font-size: 0.8rem;
    font-weight: 700;
    padding: 6px 14px;
    border-radius: var(--radius-full);
  }
  .dict-entry-pinyin {
    font-size: 1.4rem;
    font-style: italic;
    color: var(--jade-green);
    margin: 0 0 var(--spacing-sm);
  }
  .dict-entry-translation {
    font-size: 1.2rem;
    color: var(--text-primary);
    font-weight: 500;
    margin: 0;
  }
  .dict-entry-section { margin-bottom: var(--spacing-xl); }
  .dict-entry-section h3 {
    font-size: 1.05rem;
    margin: 0 0 var(--spacing-md);
    color: var(--text-primary);
  }
  .dict-entry-alt-list {
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-xs);
    padding: 0;
    margin: 0;
  }
  .dict-entry-alt-list li {
    padding: 4px 12px;
    background: var(--bg-accent);
    border-radius: var(--radius-md);
    font-size: 0.9rem;
    color: var(--text-secondary);
  }
  .dict-entry-explanation {
    line-height: 1.7;
    margin: 0;
    color: var(--text-secondary);
  }
  .dict-entry-examples {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-sm);
  }
  .dict-entry-example {
    background: var(--bg-secondary);
    border-radius: var(--radius-lg);
    padding: var(--spacing-md);
    border-left: 4px solid var(--jade-green);
  }
  .dict-entry-example-line {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
    flex-wrap: wrap;
  }
  .dict-entry-example-chinese {
    font-family: var(--font-serif);
    font-size: 1.2rem;
    color: var(--text-primary);
    margin: 0;
  }
  .dict-entry-example-audio {
    background: var(--bg-primary);
    color: var(--primary-red);
    border: 1px solid var(--border-light);
    border-radius: var(--radius-full);
    width: 32px;
    height: 32px;
    cursor: pointer;
    transition: all var(--transition-base);
  }
  .dict-entry-example-audio:hover {
    background: var(--primary-red);
    color: white;
    border-color: var(--primary-red);
  }
  .dict-entry-example-pinyin {
    font-style: italic;
    color: var(--jade-green);
    margin: 4px 0;
    font-size: 0.9rem;
  }
  .dict-entry-example-translation {
    color: var(--text-secondary);
    margin: 0;
    font-size: 0.9rem;
  }
  .dict-entry-sidebar {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-md);
  }
  .dict-entry-card {
    background: var(--bg-primary);
    border-radius: var(--radius-lg);
    padding: var(--spacing-md);
    border: 1px solid var(--border-light);
  }
  .dict-entry-card h4 {
    font-size: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--text-tertiary);
    margin: 0 0 var(--spacing-md);
  }
  .dict-entry-card dl {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 8px 12px;
    align-items: center;
    margin: 0;
  }
  .dict-entry-card dt {
    font-size: 0.8rem;
    color: var(--text-tertiary);
    margin: 0;
  }
  .dict-entry-card dd {
    font-size: 0.9rem;
    color: var(--text-primary);
    margin: 0;
  }
  .dict-entry-level-pill {
    display: inline-block;
    padding: 2px 8px;
    border-radius: var(--radius-sm);
    font-size: 0.75rem;
    font-weight: 700;
  }
  .dict-entry-capitalize { text-transform: capitalize; }
  .dict-entry-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
  }
  .dict-entry-tag {
    padding: 2px 8px;
    background: var(--bg-accent);
    border-radius: var(--radius-sm);
    font-size: 0.75rem;
    color: var(--text-secondary);
  }
  .dict-entry-nav-links {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-sm);
  }
  .dict-entry-nav-link {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 2px;
    padding: 8px 10px;
    border-radius: var(--radius-md);
    border: 1px solid var(--border-light);
    background: var(--bg-secondary);
    cursor: pointer;
    transition: all var(--transition-base);
    font-family: inherit;
    text-align: left;
  }
  .dict-entry-nav-link:hover { border-color: var(--primary-red-light); }
  .dict-entry-nav-label {
    font-size: 0.7rem;
    color: var(--text-tertiary);
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }
  .dict-entry-nav-value {
    font-size: 0.9rem;
    color: var(--text-primary);
  }
  .dict-entry-back-btn {
    padding: 0.6rem 1rem;
    background: var(--bg-primary);
    border: 1.5px solid var(--border-light);
    border-radius: var(--radius-md);
    color: var(--text-secondary);
    cursor: pointer;
    font-family: inherit;
    transition: all var(--transition-base);
  }
  .dict-entry-back-btn:hover {
    border-color: var(--primary-red);
    color: var(--primary-red);
  }
  @media (max-width: 900px) {
    .dict-entry-layout { grid-template-columns: 1fr; }
    .dict-entry-sidebar { order: -1; }
    .dict-entry-hanzi { font-size: 3rem; }
  }
  @media (max-width: 540px) {
    .dict-entry-page { padding: 0 var(--spacing-md) var(--spacing-lg); }
    .dict-entry-main { padding: var(--spacing-md); }
    .dict-entry-hanzi { font-size: 2.4rem; }
    .dict-entry-pinyin { font-size: 1.15rem; }
    .dict-entry-translation { font-size: 1.05rem; }
  }
`;
