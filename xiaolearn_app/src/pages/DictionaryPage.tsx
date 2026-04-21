import { FormEvent, useMemo, useState } from 'react';
import type { Language } from '../i18n';
import type { CustomList } from '../hooks/useCustomLists';
import { translateFrZh, type TranslationDirection, type TranslationRegister, type TranslationResult } from '../services/translationService';

interface DictionaryPageProps {
  copy: Record<string, string>;
  language: Language;
  customLists: CustomList[];
  onCreateList: (name: string) => CustomList | null;
  onAddWordToList: (listId: string, lessonId: string) => void;
}

const EXAMPLES_FR_TO_ZH = [
  'Je voudrais réserver une table pour deux personnes.',
  'Pouvez-vous parler un peu moins vite, s il vous plaît ?',
  'Je dois prendre le métro ligne 2.'
];

const EXAMPLES_ZH_TO_FR = [
  '我想换一间安静一点的房间。',
  '请问，这附近有地铁站吗？',
  '这个表达听起来太正式了吗？'
];

function DictionaryPage({ language }: DictionaryPageProps) {
  const [direction, setDirection] = useState<TranslationDirection>('fr-zh');
  const [register, setRegister] = useState<TranslationRegister>('neutral');
  const [sourceText, setSourceText] = useState('');
  const [result, setResult] = useState<TranslationResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const uiCopy = useMemo(
    () =>
      language === 'fr'
        ? {
            title: 'Traduction FR ↔ Chinois',
            subtitle: 'Moteur de traduction de phrases complètes, spécialisé mandarin.',
            sourceLabel: 'Texte à traduire',
            sourcePlaceholderFr: 'Ex: Demain je vais arriver vers 18h, garde-moi une place près de la fenêtre.',
            sourcePlaceholderZh: '例：明天我大概六点到，请帮我留一个靠窗的位置。',
            directionFrZh: 'Français → Chinois',
            directionZhFr: 'Chinois → Français',
            registerLabel: 'Registre',
            regNeutral: 'Neutre',
            regFormal: 'Formel',
            regCasual: 'Familier',
            translate: 'Traduire',
            translating: 'Traduction...',
            swap: 'Inverser',
            examplesLabel: 'Exemples rapides',
            outputTitle: 'Résultat',
            outputPlaceholder: 'Le résultat de traduction apparaîtra ici.',
            pinyin: 'Pinyin',
            alternatives: 'Variantes naturelles',
            notes: 'Notes linguistiques',
            technicalInfo: 'Moteur IA',
            emptyError: 'Ajoute une phrase avant de lancer la traduction.'
          }
        : {
            title: 'FR ↔ Chinese Translation',
            subtitle: 'Sentence-level translation engine specialized for Mandarin.',
            sourceLabel: 'Text to translate',
            sourcePlaceholderFr: 'Ex: I will arrive around 6 PM tomorrow, please keep me a seat by the window.',
            sourcePlaceholderZh: 'Ex: 明天我大概六点到，请帮我留一个靠窗的位置。',
            directionFrZh: 'French → Chinese',
            directionZhFr: 'Chinese → French',
            registerLabel: 'Register',
            regNeutral: 'Neutral',
            regFormal: 'Formal',
            regCasual: 'Casual',
            translate: 'Translate',
            translating: 'Translating...',
            swap: 'Swap',
            examplesLabel: 'Quick examples',
            outputTitle: 'Result',
            outputPlaceholder: 'The translation result will appear here.',
            pinyin: 'Pinyin',
            alternatives: 'Natural alternatives',
            notes: 'Language notes',
            technicalInfo: 'AI engine',
            emptyError: 'Please add a sentence before translating.'
          },
    [language]
  );

  const sourcePlaceholder = direction === 'fr-zh' ? uiCopy.sourcePlaceholderFr : uiCopy.sourcePlaceholderZh;
  const examples = direction === 'fr-zh' ? EXAMPLES_FR_TO_ZH : EXAMPLES_ZH_TO_FR;

  const handleSwapDirection = () => {
    setDirection((prev) => (prev === 'fr-zh' ? 'zh-fr' : 'fr-zh'));
    if (result?.translation) {
      setSourceText(result.translation);
      setResult(null);
    }
    setError('');
  };

  const handleTranslate = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const cleanInput = sourceText.trim();
    if (!cleanInput) {
      setError(uiCopy.emptyError);
      return;
    }

    setError('');
    setIsLoading(true);
    try {
      const translated = await translateFrZh({
        text: cleanInput,
        direction,
        register,
        uiLanguage: language
      });
      setResult(translated);
    } catch (translationError) {
      const message = translationError instanceof Error ? translationError.message : '';
      setError(
        message ||
          (language === 'fr'
            ? 'Impossible de générer la traduction pour le moment.'
            : 'Unable to generate translation right now.')
      );
      setResult(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="dictionary-page">
      <div className="dictionary-header">
        <h2>{uiCopy.title}</h2>
        <p className="dictionary-subtitle">{uiCopy.subtitle}</p>
      </div>

      <form className="translation-engine-panel" onSubmit={handleTranslate}>
        <div className="translation-direction-row">
          <button
            type="button"
            className={`translation-direction-btn ${direction === 'fr-zh' ? 'active' : ''}`}
            onClick={() => setDirection('fr-zh')}
          >
            {uiCopy.directionFrZh}
          </button>
          <button
            type="button"
            className={`translation-direction-btn ${direction === 'zh-fr' ? 'active' : ''}`}
            onClick={() => setDirection('zh-fr')}
          >
            {uiCopy.directionZhFr}
          </button>
          <button type="button" className="translation-swap-btn" onClick={handleSwapDirection}>
            ⇄ {uiCopy.swap}
          </button>
        </div>

        <label className="translation-source-label" htmlFor="translation-source">
          {uiCopy.sourceLabel}
        </label>
        <textarea
          id="translation-source"
          className="translation-source-input"
          value={sourceText}
          onChange={(event) => setSourceText(event.target.value)}
          placeholder={sourcePlaceholder}
          rows={5}
        />

        <div className="translation-register-row">
          <span>{uiCopy.registerLabel}</span>
          <div className="translation-register-buttons">
            <button
              type="button"
              className={`search-type-chip ${register === 'neutral' ? 'active' : ''}`}
              onClick={() => setRegister('neutral')}
            >
              {uiCopy.regNeutral}
            </button>
            <button
              type="button"
              className={`search-type-chip ${register === 'formal' ? 'active' : ''}`}
              onClick={() => setRegister('formal')}
            >
              {uiCopy.regFormal}
            </button>
            <button
              type="button"
              className={`search-type-chip ${register === 'casual' ? 'active' : ''}`}
              onClick={() => setRegister('casual')}
            >
              {uiCopy.regCasual}
            </button>
          </div>
        </div>

        <div className="translation-actions">
          <button type="submit" className="btn-primary" disabled={isLoading}>
            {isLoading ? uiCopy.translating : uiCopy.translate}
          </button>
        </div>

        <div className="translation-examples">
          <p>{uiCopy.examplesLabel}</p>
          <div className="translation-example-list">
            {examples.map((example) => (
              <button
                key={example}
                type="button"
                className="translation-example-btn"
                onClick={() => setSourceText(example)}
              >
                {example}
              </button>
            ))}
          </div>
        </div>
      </form>

      <section className="translation-result-panel">
        <h3>{uiCopy.outputTitle}</h3>
        {error && <p className="support-error-message">{error}</p>}

        {!result && !error && <p className="dictionary-placeholder">{uiCopy.outputPlaceholder}</p>}

        {result && (
          <div className="translation-result-content">
            <p className="translation-main-output">{result.translation}</p>

            {result.pinyin && (
              <div className="detail-section">
                <div className="detail-label">{uiCopy.pinyin}</div>
                <div className="detail-value">{result.pinyin}</div>
              </div>
            )}

            {result.alternatives.length > 0 && (
              <div className="detail-section">
                <div className="detail-label">{uiCopy.alternatives}</div>
                <ul className="translation-result-list">
                  {result.alternatives.map((alt, idx) => (
                    <li key={`${alt}-${idx}`}>{alt}</li>
                  ))}
                </ul>
              </div>
            )}

            {result.notes.length > 0 && (
              <div className="detail-section">
                <div className="detail-label">{uiCopy.notes}</div>
                <ul className="translation-result-list">
                  {result.notes.map((note, idx) => (
                    <li key={`${note}-${idx}`}>{note}</li>
                  ))}
                </ul>
              </div>
            )}

            <p className="translation-engine-meta">
              {uiCopy.technicalInfo}: <strong>{result.modelUsed}</strong>
            </p>
          </div>
        )}
      </section>
    </div>
  );
}

export default DictionaryPage;

