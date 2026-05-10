/**
 * PronunciationCoachPage.tsx — Phase 4 IA.
 *
 * Page « Coach prononciation ». 2 modes :
 *  1. Sélecteur de cible (cards groupées par niveau)
 *  2. Vue pratique : audio modèle + bouton micro + scorecard
 *
 * L'utilisateur peut écouter le modèle, s'enregistrer, voir le score,
 * et réessayer autant de fois qu'il veut.
 */
import { useCallback, useState } from 'react';
import type { Language } from '../i18n';
import {
  PRONUNCIATION_TARGETS,
  groupTargetsByLevel,
  type PronunciationTarget
} from '../data/pronunciation-targets';
import {
  assessPronunciation,
  type PronunciationResult
} from '../services/pronunciation';
import RecordButton from '../components/RecordButton';
import PronunciationScorecard from '../components/PronunciationScorecard';
import './PronunciationCoachPage.css';

interface PronunciationCoachPageProps {
  language: Language;
  /** Niveau CECR par défaut. */
  defaultLevel?: string;
}

const COPY = {
  fr: {
    title: 'Coach de prononciation IA',
    subtitle:
      'Choisis une phrase, écoute le modèle, enregistre-toi, et reçois un score détaillé avec un conseil pratique.',
    levelLabel: 'Niveau',
    focusLabel: 'Travaille',
    backToList: 'Changer de phrase',
    instruction:
      'Clique sur le micro pour t\'enregistrer (max 8s). Tu peux réessayer autant que tu veux.',
    listenModel: 'Écouter le modèle',
    analyzing: 'Analyse en cours…',
    analyzingHint: 'L\'IA écoute ton enregistrement et calcule les scores.',
    errorAudio: 'Aucun audio capturé.',
    errorApi: 'Une erreur est survenue. Réessaie.',
    tryAgain: 'Nouvel essai'
  },
  en: {
    title: 'AI Pronunciation Coach',
    subtitle:
      'Pick a sentence, listen to the model, record yourself, and get a detailed score with practical advice.',
    levelLabel: 'Level',
    focusLabel: 'Focus',
    backToList: 'Change sentence',
    instruction:
      'Click the mic to record (max 8s). You can retry as many times as you want.',
    listenModel: 'Listen to model',
    analyzing: 'Analyzing…',
    analyzingHint: 'The AI is listening to your recording and computing scores.',
    errorAudio: 'No audio captured.',
    errorApi: 'Something went wrong. Try again.',
    tryAgain: 'Try again'
  }
} as const;

export default function PronunciationCoachPage({
  language,
  defaultLevel = 'A1'
}: PronunciationCoachPageProps) {
  const t = COPY[language];
  const [activeId, setActiveId] = useState<string | null>(null);

  const activeTarget = activeId
    ? PRONUNCIATION_TARGETS.find((x) => x.id === activeId)
    : null;
  const grouped = groupTargetsByLevel();

  if (!activeTarget) {
    return (
      <div className="pron-coach-page">
        <header className="pc-page-header">
          <h1>{t.title}</h1>
          <p className="pc-subtitle">{t.subtitle}</p>
        </header>
        <div className="pc-target-list">
          {grouped.map((group) => (
            <section key={group.level} className="pc-level-block">
              <header className="pc-level-header">
                <span className={`pc-level-badge pc-level-badge--${group.level.toLowerCase()}`}>
                  {group.level}
                </span>
              </header>
              <div className="pc-target-grid">
                {group.targets.map((target) => (
                  <button
                    key={target.id}
                    type="button"
                    className="pc-target-card"
                    onClick={() => setActiveId(target.id)}
                  >
                    <span className="pc-target-hanzi" lang="zh-CN">
                      {target.hanzi}
                    </span>
                    <span className="pc-target-pinyin">{target.pinyin}</span>
                    <span className="pc-target-translation">
                      {target.translation}
                    </span>
                    <span className="pc-target-focus">
                      {t.focusLabel} : {target.focus}
                    </span>
                  </button>
                ))}
              </div>
            </section>
          ))}
        </div>
        {/* defaultLevel passé pour usage futur (pré-scroll vers le niveau de l'apprenant) */}
        <span style={{ display: 'none' }}>default: {defaultLevel}</span>
      </div>
    );
  }

  return (
    <PracticeView
      target={activeTarget}
      copy={t}
      language={language}
      onBack={() => setActiveId(null)}
    />
  );
}

// =====================================================================
// Vue pratique : audio modèle + record + scorecard
// =====================================================================
function PracticeView({
  target,
  copy,
  language,
  onBack
}: {
  target: PronunciationTarget;
  copy: (typeof COPY)[Language];
  language: Language;
  onBack: () => void;
}) {
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<PronunciationResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAudio = useCallback(
    async (blob: Blob) => {
      setError(null);
      setResult(null);
      setAnalyzing(true);
      try {
        const r = await assessPronunciation({
          audioBlob: blob,
          expectedHanzi: target.hanzi,
          expectedPinyin: target.pinyin,
          level: target.level
        });
        setResult(r);
      } catch (e) {
        console.error(e);
        setError(copy.errorApi);
      } finally {
        setAnalyzing(false);
      }
    },
    [target, copy.errorApi]
  );

  const handleListenModel = useCallback(() => {
    // Utilise SpeechSynthesis du navigateur si dispo (qualité variable mais
    // gratuite et offline). Pour V1, c'est suffisant — une vraie TTS Azure
    // serait préférable mais c'est un autre chantier.
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(target.hanzi);
      utterance.lang = 'zh-CN';
      utterance.rate = 0.85;
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utterance);
    }
  }, [target.hanzi]);

  return (
    <div className="pron-coach-page pron-coach-page--practice">
      <header className="pc-practice-header">
        <button type="button" className="pc-back-btn" onClick={onBack}>
          ← {copy.backToList}
        </button>
        <span className={`pc-level-badge pc-level-badge--${target.level.toLowerCase()}`}>
          {target.level}
        </span>
      </header>

      <section className="pc-target-display">
        <div className="pc-target-display-hanzi" lang="zh-CN">
          {target.hanzi}
        </div>
        <div className="pc-target-display-pinyin">{target.pinyin}</div>
        <div className="pc-target-display-translation">{target.translation}</div>
        <button
          type="button"
          className="pc-listen-btn"
          onClick={handleListenModel}
        >
          🔊 {copy.listenModel}
        </button>
      </section>

      <section className="pc-record-section">
        <p className="pc-instruction">{copy.instruction}</p>
        <div className="pc-record-wrap">
          <RecordButton
            onAudio={handleAudio}
            disabled={analyzing}
            language={language}
            maxSeconds={8}
            size={72}
          />
        </div>
        {analyzing && (
          <div className="pc-analyzing">
            <div className="pc-analyzing-text">{copy.analyzing}</div>
            <div className="pc-analyzing-hint">{copy.analyzingHint}</div>
          </div>
        )}
        {error && <div className="pc-error">{error}</div>}
      </section>

      {result && !analyzing && (
        <section className="pc-result-section">
          <PronunciationScorecard result={result} language={language} />
          <div className="pc-result-actions">
            <button
              type="button"
              className="pc-btn pc-btn--ghost"
              onClick={() => setResult(null)}
            >
              {copy.tryAgain}
            </button>
          </div>
        </section>
      )}
    </div>
  );
}
