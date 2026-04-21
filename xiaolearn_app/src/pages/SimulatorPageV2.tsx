/**
 * SimulatorPageV2.tsx — Simulateur de conversations IA (XiaoLearn V6)
 * -------------------------------------------------------------------
 * Inspiré du simulateur Seonsaengnim, adapté au chinois.
 *
 * 3 sous-écrans pilotés par un state machine interne :
 *   - 'catalog'      : grille des 20 scénarios (filtre catégorie)
 *   - 'briefing'     : fiche du scénario (persona, objectif, vocab, start)
 *   - 'conversation' : chat avec Prof. Xiao, étapes + progress bar
 *
 * Styles : ./../styles/simulator-v2.css (scoped sous .sim-v2)
 */
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { KeyboardEvent } from 'react';
import '../styles/simulator-v2.css';

import {
  simulatorScenarios,
  getScenariosByCategory
} from '../data/cecr-simulator-scenarios';
import {
  SIMULATOR_CATEGORIES,
  type SimulatorCategory,
  type SimulatorCategoryMeta,
  type SimulatorScenario,
  type SimulatorTurn
} from '../types/simulator';
import {
  sendSimulatorMessage,
  guessCurrentStepIndex
} from '../services/simulatorService';
import {
  PolitenessRegisterBadge,
  PolitenessRegisterCheatsheet
} from '../components/PolitenessRegister';

// ============================================================================
//  TYPES / PROPS
// ============================================================================

export type SimulatorPageV2Language = 'fr' | 'en';

export interface SimulatorPageV2Props {
  language?: SimulatorPageV2Language;
  onBack?: () => void;
  /**
   * Hook optionnel : appelé quand le scénario est complété (peut servir à
   * incrémenter XP ou débloquer un badge).
   */
  onScenarioComplete?: (scenarioId: string) => void;
}

// ============================================================================
//  COPIES
// ============================================================================

const COPY = {
  fr: {
    title: 'Simulateur',
    subtitle: 'Mets en situation ce que tu as appris — conversation IA en contexte.',
    scenariosCount: 'scénarios disponibles',
    back: '← Retour',
    filterAll: 'Tous',
    searchPlaceholder: 'Rechercher un scénario…',
    levelRange: 'Niveau',
    beginner: 'Débutant',
    intermediate: 'Intermédiaire',
    advanced: 'Avancé',
    briefingBack: '← Retour au catalogue',
    personaHeading: 'Prof. Xiao incarne',
    goalHeading: 'Ton objectif',
    vocabHeading: 'Vocabulaire utile',
    vocabCount: 'mots',
    startBtn: 'Je suis prêt(e) !',
    stepLabel: 'ÉTAPE',
    typingLabel: 'Prof. Xiao écrit…',
    placeholder: 'Tape ta réponse en chinois…',
    exitBtn: 'Quitter',
    againBtn: 'Refaire ce scénario',
    chooseAnother: 'Choisir un autre scénario',
    congratsHeadline: '🎉 Scénario terminé !',
    errorGeneric: "Oups, l'IA n'a pas répondu. Réessaie dans un instant.",
    emptyFilter: 'Aucun scénario pour ce filtre.'
  },
  en: {
    title: 'Simulator',
    subtitle: 'Practice what you learned — AI conversation in real contexts.',
    scenariosCount: 'scenarios available',
    back: '← Back',
    filterAll: 'All',
    searchPlaceholder: 'Search a scenario…',
    levelRange: 'Level',
    beginner: 'Beginner',
    intermediate: 'Intermediate',
    advanced: 'Advanced',
    briefingBack: '← Back to catalog',
    personaHeading: 'Prof. Xiao plays',
    goalHeading: 'Your goal',
    vocabHeading: 'Useful vocabulary',
    vocabCount: 'words',
    startBtn: "I'm ready!",
    stepLabel: 'STEP',
    typingLabel: 'Prof. Xiao is typing…',
    placeholder: 'Type your response in Chinese…',
    exitBtn: 'Exit',
    againBtn: 'Retry scenario',
    chooseAnother: 'Pick another',
    congratsHeadline: '🎉 Scenario complete!',
    errorGeneric: "Oops, the AI didn't respond. Try again.",
    emptyFilter: 'No scenarios for this filter.'
  }
} as const;

type CopyKey = keyof (typeof COPY)['fr'];
const t = (lang: SimulatorPageV2Language, k: CopyKey) => COPY[lang][k] ?? COPY.fr[k];

// ============================================================================
//  UTILS
// ============================================================================

function difficultyLabel(
  d: SimulatorScenario['difficulty'],
  lang: SimulatorPageV2Language
): string {
  if (d === 'beginner') return t(lang, 'beginner');
  if (d === 'intermediate') return t(lang, 'intermediate');
  return t(lang, 'advanced');
}

function formatLevelRange(scenario: SimulatorScenario): string {
  const a = scenario.levelFloor.toUpperCase();
  const b = scenario.levelCeiling.toUpperCase();
  return a === b ? a : `${a} → ${b}`;
}

// ============================================================================
//  SCREEN : CATALOG
// ============================================================================

const categoryMetaFor = (key: SimulatorCategory): SimulatorCategoryMeta =>
  SIMULATOR_CATEGORIES.find((c) => c.key === key) ?? SIMULATOR_CATEGORIES[0];

// Carte individuelle — extraite pour rester lisible (utilisée en mode groupé
// comme en mode filtré). Inspirée Seonsaengnim : grande tuile emoji top-left,
// pill difficulté top-right, titre, description, Niv. X-Y en bas.
const ScenarioCard = ({
  scenario,
  language,
  onPick
}: {
  scenario: SimulatorScenario;
  language: SimulatorPageV2Language;
  onPick: (s: SimulatorScenario) => void;
}) => (
  <button
    type="button"
    className={`sim-v2-card sim-v2-card--${scenario.category}`}
    onClick={() => onPick(scenario)}
  >
    <div className="sim-v2-card-top">
      <span className="sim-v2-card-emoji-tile" aria-hidden>
        {scenario.emoji}
      </span>
      <span className={`sim-v2-card-tier sim-v2-card-tier--${scenario.difficulty}`}>
        {difficultyLabel(scenario.difficulty, language)}
      </span>
    </div>
    <h3 className="sim-v2-card-title">
      {language === 'en' && scenario.titleEn ? scenario.titleEn : scenario.titleFr}
    </h3>
    <p className="sim-v2-card-desc">
      {language === 'en' && scenario.descriptionEn ? scenario.descriptionEn : scenario.descriptionFr}
    </p>
    <div className="sim-v2-card-foot">
      <span className="sim-v2-card-niv">
        {t(language, 'levelRange')} {formatLevelRange(scenario)}
      </span>
    </div>
  </button>
);

const CatalogScreen = ({
  language,
  onPick,
  onBack
}: {
  language: SimulatorPageV2Language;
  onPick: (s: SimulatorScenario) => void;
  onBack?: () => void;
}) => {
  const [filter, setFilter] = useState<SimulatorCategory | 'all'>('all');

  const totalCount = simulatorScenarios.length;

  // Groupes pré-calculés pour le mode "Tous" (sections par catégorie façon
  // Seonsaengnim). Pour un filtre spécifique, on affiche une grille à plat.
  const groupsForAll = useMemo(
    () =>
      SIMULATOR_CATEGORIES.map((cat) => ({
        meta: cat,
        items: getScenariosByCategory(cat.key)
      })).filter((g) => g.items.length > 0),
    []
  );
  const filteredScenarios = useMemo(
    () => (filter === 'all' ? [] : getScenariosByCategory(filter)),
    [filter]
  );

  return (
    <div className="sim-v2-catalog">
      {onBack && (
        <button className="sim-v2-btn sim-v2-btn--link sim-v2-catalog-back" onClick={onBack}>
          {t(language, 'back')}
        </button>
      )}

      {/* Header façon Seonsaengnim : tuile icône + titre + sous-titre */}
      <header className="sim-v2-catalog-header">
        <div className="sim-v2-catalog-icon" aria-hidden>✨</div>
        <div className="sim-v2-catalog-head-text">
          <h1>
            {language === 'fr' ? 'Simulateur de Situations' : 'Situation Simulator'}
          </h1>
          <p>
            {language === 'fr'
              ? 'Entraîne-toi avec Prof. Xiao dans des situations réelles en Chine'
              : 'Practice with Prof. Xiao in real-life situations in China'}
          </p>
        </div>
      </header>

      {/* Barre de tabs : Tous (20), 🥡 Vie quotidienne (5), etc. */}
      <div className="sim-v2-tabs" role="tablist">
        <button
          type="button"
          role="tab"
          className={`sim-v2-tab ${filter === 'all' ? 'is-active' : ''}`}
          onClick={() => setFilter('all')}
          aria-selected={filter === 'all'}
        >
          <span>{t(language, 'filterAll')}</span>
          <span className="sim-v2-tab-count">({totalCount})</span>
        </button>
        {SIMULATOR_CATEGORIES.map((c) => {
          const count = getScenariosByCategory(c.key).length;
          const isActive = filter === c.key;
          return (
            <button
              key={c.key}
              type="button"
              role="tab"
              className={`sim-v2-tab sim-v2-tab--${c.key} ${isActive ? 'is-active' : ''}`}
              onClick={() => setFilter(c.key)}
              aria-selected={isActive}
            >
              <span className="sim-v2-tab-emoji" aria-hidden>{c.emoji}</span>
              <span>{language === 'en' ? c.labelEn : c.labelFr}</span>
              <span className="sim-v2-tab-count">({count})</span>
            </button>
          );
        })}
      </div>

      {filter === 'all' ? (
        // Mode "Tous" : sections par catégorie, chacune avec son heading
        <div className="sim-v2-sections">
          {groupsForAll.map((group) => (
            <section key={group.meta.key} className="sim-v2-section">
              <h2 className="sim-v2-section-title">
                <span aria-hidden>{group.meta.emoji}</span>
                {language === 'en' ? group.meta.labelEn : group.meta.labelFr}
              </h2>
              <div className="sim-v2-grid">
                {group.items.map((s) => (
                  <ScenarioCard
                    key={s.id}
                    scenario={s}
                    language={language}
                    onPick={onPick}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      ) : (
        // Mode filtré : grille à plat
        <>
          {filteredScenarios.length === 0 ? (
            <div className="sim-v2-empty">{t(language, 'emptyFilter')}</div>
          ) : (
            <div className="sim-v2-grid">
              {filteredScenarios.map((s) => (
                <ScenarioCard
                  key={s.id}
                  scenario={s}
                  language={language}
                  onPick={onPick}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

// ============================================================================
//  SCREEN : BRIEFING
// ============================================================================

const BriefingScreen = ({
  language,
  scenario,
  onStart,
  onBack
}: {
  language: SimulatorPageV2Language;
  scenario: SimulatorScenario;
  onStart: () => void;
  onBack: () => void;
}) => {
  const [vocabOpen, setVocabOpen] = useState(true);
  const cat = categoryMetaFor(scenario.category);
  const catLabel = language === 'en' ? cat.labelEn : cat.labelFr;

  return (
    <div className="sim-v2-briefing">
      <button className="sim-v2-btn sim-v2-btn--link sim-v2-briefing-back" onClick={onBack}>
        {t(language, 'briefingBack')}
      </button>

      <div className={`sim-v2-briefing-hero sim-v2-briefing-hero--${scenario.category}`}>
        <div className="sim-v2-briefing-emoji-wrap" aria-hidden>
          <div className="sim-v2-briefing-emoji">{scenario.emoji}</div>
        </div>
        <div className="sim-v2-briefing-hero-body">
          <span className={`sim-v2-card-cat sim-v2-card-cat--${scenario.category}`}>
            <span aria-hidden>{cat.emoji}</span>
            {catLabel}
          </span>
          <h1>{language === 'en' && scenario.titleEn ? scenario.titleEn : scenario.titleFr}</h1>
          <p className="sim-v2-briefing-desc">
            {language === 'en' && scenario.descriptionEn
              ? scenario.descriptionEn
              : scenario.descriptionFr}
          </p>
          <div className="sim-v2-briefing-badges">
            <span className={`sim-v2-card-tier sim-v2-card-tier--${scenario.difficulty}`}>
              {difficultyLabel(scenario.difficulty, language)}
            </span>
            <span className="sim-v2-card-level">
              <span aria-hidden>📊</span>
              {formatLevelRange(scenario)}
            </span>
            <PolitenessRegisterBadge register={scenario.register} language={language} />
          </div>
        </div>
      </div>

      <section className="sim-v2-briefing-section">
        <h2>{t(language, 'personaHeading')}</h2>
        <p className="sim-v2-briefing-persona">
          <span className="sim-v2-briefing-persona-dot" aria-hidden>
            P
            <span className="sim-v2-briefing-persona-online" aria-hidden />
          </span>
          <span className="sim-v2-briefing-persona-text">
            <span className="sim-v2-briefing-persona-name">Prof. Xiao</span>
            <span className="sim-v2-briefing-persona-role">
              {language === 'en' && scenario.personaEn ? scenario.personaEn : scenario.personaFr}
            </span>
          </span>
        </p>
      </section>

      <section className="sim-v2-briefing-section">
        <h2>{t(language, 'goalHeading')}</h2>
        <p className="sim-v2-briefing-goal">
          <span className="sim-v2-briefing-goal-icon" aria-hidden>🎯</span>
          <span>
            {language === 'en' && scenario.goalEn ? scenario.goalEn : scenario.goalFr}
          </span>
        </p>
      </section>

      <section className="sim-v2-briefing-section">
        <button
          type="button"
          className={`sim-v2-vocab-toggle ${vocabOpen ? 'is-open' : ''}`}
          onClick={() => setVocabOpen((v) => !v)}
          aria-expanded={vocabOpen}
        >
          <span className="sim-v2-vocab-toggle-left">
            <span aria-hidden>📖</span>
            {t(language, 'vocabHeading')}
            <span className="sim-v2-vocab-count">
              {scenario.vocab.length} {t(language, 'vocabCount')}
            </span>
          </span>
          <span className="sim-v2-vocab-toggle-arrow" aria-hidden>
            {vocabOpen ? '▾' : '▸'}
          </span>
        </button>
        {vocabOpen && (
          <ul className="sim-v2-vocab-list">
            {scenario.vocab.map((v) => (
              <li key={v.hanzi} className="sim-v2-vocab-item">
                <span className="sim-v2-vocab-hanzi">{v.hanzi}</span>
                <span className="sim-v2-vocab-pinyin">{v.pinyin}</span>
                <span className="sim-v2-vocab-fr">
                  {language === 'en' && v.translationEn ? v.translationEn : v.translationFr}
                </span>
                {v.register && (
                  <PolitenessRegisterBadge
                    register={v.register}
                    language={language}
                    compact
                    className="sim-v2-vocab-register"
                  />
                )}
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="sim-v2-briefing-section">
        <PolitenessRegisterCheatsheet
          language={language}
          highlight={scenario.register}
        />
      </section>

      <button className="sim-v2-btn sim-v2-btn--primary sim-v2-start-btn" onClick={onStart}>
        {t(language, 'startBtn')}
      </button>
    </div>
  );
};

// ============================================================================
//  SCREEN : CONVERSATION
// ============================================================================

const ConversationScreen = ({
  language,
  scenario,
  onExit,
  onScenarioComplete
}: {
  language: SimulatorPageV2Language;
  scenario: SimulatorScenario;
  onExit: () => void;
  onScenarioComplete?: (id: string) => void;
}) => {
  const [turns, setTurns] = useState<SimulatorTurn[]>(() => {
    // Opening assistant turn si scénario en fournit un
    if (scenario.openingLineHanzi) {
      return [
        {
          id: 'assistant-0',
          role: 'assistant',
          hanzi: scenario.openingLineHanzi,
          pinyin: scenario.openingLinePinyin,
          translationFr: scenario.openingLineFr,
          createdAt: Date.now()
        }
      ];
    }
    return [];
  });
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [completed, setCompleted] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  const currentStepIndex = guessCurrentStepIndex(scenario, turns);
  const currentStep = scenario.steps[currentStepIndex] ?? scenario.steps[scenario.steps.length - 1];

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [turns.length, isTyping]);

  const handleSend = useCallback(async () => {
    const content = input.trim();
    if (!content || isTyping || completed) return;
    const userTurn: SimulatorTurn = {
      id: `user-${Date.now()}`,
      role: 'user',
      hanzi: content,
      createdAt: Date.now()
    };
    setTurns((prev) => [...prev, userTurn]);
    setInput('');
    setIsTyping(true);
    setErrorMsg(null);

    try {
      const parsed = await sendSimulatorMessage(scenario, turns, content);
      setTurns((prev) => [
        ...prev,
        {
          id: `assistant-${Date.now()}`,
          role: 'assistant',
          hanzi: parsed.hanzi,
          pinyin: parsed.pinyin,
          translationFr: parsed.translationFr,
          createdAt: Date.now()
        }
      ]);
      if (parsed.isComplete) {
        setCompleted(true);
        onScenarioComplete?.(scenario.id);
      }
    } catch (err) {
      console.error('[Simulator] error', err);
      setErrorMsg(t(language, 'errorGeneric'));
    } finally {
      setIsTyping(false);
    }
  }, [input, isTyping, completed, scenario, turns, language, onScenarioComplete]);

  const handleKey = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleRetry = () => {
    setTurns(
      scenario.openingLineHanzi
        ? [
            {
              id: `assistant-${Date.now()}`,
              role: 'assistant',
              hanzi: scenario.openingLineHanzi,
              pinyin: scenario.openingLinePinyin,
              translationFr: scenario.openingLineFr,
              createdAt: Date.now()
            }
          ]
        : []
    );
    setCompleted(false);
    setInput('');
    setErrorMsg(null);
  };

  const totalSteps = scenario.steps.length;
  const progress =
    (Math.min(currentStepIndex + 1, totalSteps) / totalSteps) * 100;

  return (
    <div className="sim-v2-conversation">
      {/* Header */}
      <header className="sim-v2-conv-header">
        <button
          className="sim-v2-btn sim-v2-btn--link sim-v2-conv-back"
          onClick={onExit}
          aria-label={t(language, 'exitBtn')}
        >
          ←
        </button>
        <div className="sim-v2-conv-title">
          <div className="sim-v2-conv-title-avatar" aria-hidden>
            P
          </div>
          <div className="sim-v2-conv-title-text">
            <h2>
              Prof. Xiao
              <span className="sim-v2-conv-title-dot" aria-hidden>
                •
              </span>
              <span className="sim-v2-conv-title-scenario">
                {language === 'en' && scenario.titleEn ? scenario.titleEn : scenario.titleFr}
              </span>
            </h2>
            <span className="sim-v2-conv-title-persona">
              {language === 'en' && scenario.personaEn ? scenario.personaEn : scenario.personaFr}
            </span>
          </div>
        </div>
        <div className="sim-v2-conv-scenario-emoji" aria-hidden>
          {scenario.emoji}
        </div>
      </header>

      {/* Progress bar */}
      <div className="sim-v2-progress">
        <div className="sim-v2-progress-track">
          {scenario.steps.map((_, i) => (
            <span
              key={i}
              className={`sim-v2-progress-seg ${
                i <= currentStepIndex ? 'is-done' : ''
              }`}
            />
          ))}
        </div>
        <span className="sim-v2-progress-label">
          <span className="sim-v2-progress-num">
            {Math.min(currentStepIndex + 1, totalSteps)}
          </span>
          <span className="sim-v2-progress-sep">/</span>
          <span className="sim-v2-progress-total">{totalSteps}</span>
        </span>
      </div>

      {/* Messages */}
      <div className="sim-v2-messages">
        {turns.map((turn) => (
          <div
            key={turn.id}
            className={`sim-v2-bubble sim-v2-bubble--${turn.role}`}
          >
            <div className="sim-v2-bubble-hanzi">{turn.hanzi}</div>
            {turn.role === 'assistant' && turn.pinyin && (
              <div className="sim-v2-bubble-pinyin">{turn.pinyin}</div>
            )}
            {turn.role === 'assistant' && turn.translationFr && (
              <div className="sim-v2-bubble-translation">
                <em>{turn.translationFr}</em>
              </div>
            )}
          </div>
        ))}
        {isTyping && (
          <div className="sim-v2-bubble sim-v2-bubble--assistant sim-v2-bubble--typing">
            <span className="sim-v2-typing-dot" />
            <span className="sim-v2-typing-dot" />
            <span className="sim-v2-typing-dot" />
            <span className="sim-v2-typing-label">{t(language, 'typingLabel')}</span>
          </div>
        )}
        {errorMsg && <div className="sim-v2-error">{errorMsg}</div>}
        <div ref={endRef} />
      </div>

      {/* Step hints (avant l'input) */}
      {!completed && currentStep && (
        <div className="sim-v2-step-hints">
          <div className="sim-v2-step-label">
            ✨ {t(language, 'stepLabel')} {currentStepIndex + 1} —{' '}
            {language === 'en' && currentStep.nameEn ? currentStep.nameEn : currentStep.nameFr}
          </div>
          <div className="sim-v2-step-chips">
            {(language === 'en' && currentStep.hintsEn
              ? currentStep.hintsEn
              : currentStep.hintsFr
            ).map((hint, i) => (
              <span key={i} className="sim-v2-step-chip">
                💬 {hint}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Completed state */}
      {completed && (
        <div className="sim-v2-complete">
          <h3>{t(language, 'congratsHeadline')}</h3>
          {scenario.successMessageFr && (
            <p>
              {language === 'en' && scenario.successMessageEn
                ? scenario.successMessageEn
                : scenario.successMessageFr}
            </p>
          )}
          <div className="sim-v2-complete-actions">
            <button className="sim-v2-btn sim-v2-btn--ghost" onClick={handleRetry}>
              {t(language, 'againBtn')}
            </button>
            <button className="sim-v2-btn sim-v2-btn--primary" onClick={onExit}>
              {t(language, 'chooseAnother')}
            </button>
          </div>
        </div>
      )}

      {/* Composer */}
      {!completed && (
        <div className="sim-v2-composer">
          <textarea
            className="sim-v2-composer-input"
            placeholder={t(language, 'placeholder')}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKey}
            rows={2}
            disabled={isTyping}
          />
          <button
            className="sim-v2-btn sim-v2-btn--primary sim-v2-composer-send"
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            type="button"
          >
            ➤
          </button>
        </div>
      )}
    </div>
  );
};

// ============================================================================
//  COMPOSANT PRINCIPAL (state machine catalog / briefing / conversation)
// ============================================================================

type SimView =
  | { screen: 'catalog' }
  | { screen: 'briefing'; scenario: SimulatorScenario }
  | { screen: 'conversation'; scenario: SimulatorScenario };

const SimulatorPageV2 = (props: SimulatorPageV2Props) => {
  const { language = 'fr', onBack, onScenarioComplete } = props;
  const [view, setView] = useState<SimView>({ screen: 'catalog' });

  if (view.screen === 'catalog') {
    return (
      <div className="sim-v2">
        <CatalogScreen
          language={language}
          onBack={onBack}
          onPick={(s) => setView({ screen: 'briefing', scenario: s })}
        />
      </div>
    );
  }

  if (view.screen === 'briefing') {
    return (
      <div className="sim-v2">
        <BriefingScreen
          language={language}
          scenario={view.scenario}
          onStart={() => setView({ screen: 'conversation', scenario: view.scenario })}
          onBack={() => setView({ screen: 'catalog' })}
        />
      </div>
    );
  }

  // conversation
  return (
    <div className="sim-v2">
      <ConversationScreen
        language={language}
        scenario={view.scenario}
        onExit={() => setView({ screen: 'catalog' })}
        onScenarioComplete={onScenarioComplete}
      />
    </div>
  );
};

export default SimulatorPageV2;
