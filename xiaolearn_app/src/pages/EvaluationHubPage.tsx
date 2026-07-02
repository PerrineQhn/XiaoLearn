/**
 * EvaluationHubPage.tsx — Sélecteur de mock HSK + lanceur d'évaluation
 * ----------------------------------------------------------------------
 * Écran d'accueil pour la section « Évaluation » :
 *   1. Hub — grille de cartes niveau (HSK 1 → HSK 6) — chaque carte
 *      regroupe toutes les variantes disponibles pour ce niveau (Série A,
 *      Série B…) avec un picker inline.
 *   2. Run — monte `EvaluationPageV2` avec le config choisi,
 *      fournit `onPlayAudio` via `playAudioWithFallback`, gère le retour.
 *
 * Le design reste scoped sous `.evaluation-v2` pour réutiliser le
 * même thème (rouge Xiaolearn, or doux, carte blanche).
 *
 * Task #42 — Enrichir la partie Évaluation avec nouveaux exercices style HSK.
 * Task #42 (enrichissement) — Plusieurs évaluations par niveau + 6-7 Q/section.
 */
import { useMemo, useState } from 'react';
import EvaluationPageV2, {
  type EvaluationV2Config,
  type EvaluationV2Language,
  type EvaluationV2Result,
  type EvaluationV2SectionKind
} from './EvaluationPageV2';
import { HSK_EVALUATIONS } from '../data/hsk-evaluations';
import { playAudioWithFallback } from '../utils/audio';

export interface EvaluationHubPageProps {
  language?: EvaluationV2Language;
  userDisplayName?: string;
  onOpenRemediation?: (sectionKind: EvaluationV2SectionKind) => void;
  onResultSubmitted?: (result: EvaluationV2Result) => void;
}

type Phase = 'hub' | 'run';

const HUB_COPY = {
  fr: {
    title: 'Évaluation XiaoLearn',
    subtitle:
      'Choisis ton niveau cible. Chaque niveau propose plusieurs tests : commence par la Série A (découverte, 16 questions) puis enchaîne sur la Série B (consolidation, 24 questions) quand tu te sens prêt.',
    cta: 'Commencer',
    minutes: 'min',
    questions: 'questions',
    vocab: 'Vocabulaire',
    grammar: 'Grammaire',
    reading: 'Lecture',
    listening: 'Oral',
    passing: 'Réussite',
    xp: 'XP',
    tip:
      'Astuce : passe d\'abord la Série A au niveau juste au-dessus du tien, puis la Série B pour valider.',
    sections: 'Sections',
    variants: 'Tests disponibles'
  },
  en: {
    title: 'XiaoLearn Evaluation',
    subtitle:
      'Pick your target level. Each level offers multiple mock tests: start with Series A (introductory, 16 questions), then tackle Series B (consolidation, 24 questions) when you feel ready.',
    cta: 'Start',
    minutes: 'min',
    questions: 'questions',
    vocab: 'Vocabulary',
    grammar: 'Grammar',
    reading: 'Reading',
    listening: 'Listening',
    passing: 'Pass',
    xp: 'XP',
    tip:
      'Tip: run Series A first at the level above yours, then Series B to confirm mastery.',
    sections: 'Sections',
    variants: 'Available tests'
  }
} as const;

// Couleurs accent par niveau — reprend la palette CECR de la sidebar.
const LEVEL_ACCENT: Record<EvaluationV2Config['level'], string> = {
  hsk1: '#16a34a',
  hsk2: '#0ea5e9',
  hsk3: '#8b5cf6',
  hsk4: '#f59e0b',
  hsk5: '#c6302c',
  hsk6: '#4b5563',
  hsk7: '#1f2937'
};

const LEVEL_EMOJI: Record<EvaluationV2Config['level'], string> = {
  hsk1: '🌱',
  hsk2: '🌿',
  hsk3: '🌳',
  hsk4: '🪴',
  hsk5: '🏯',
  hsk6: '🐉',
  hsk7: '✨'
};

/**
 * Compte les questions par section kind pour l'aperçu des cartes.
 */
function countByKind(ev: EvaluationV2Config): Record<EvaluationV2SectionKind, number> {
  const acc: Record<EvaluationV2SectionKind, number> = {
    vocabulary: 0,
    grammar: 0,
    reading: 0,
    listening: 0
  };
  for (const section of ev.sections) {
    acc[section.kind] += section.questions.length;
  }
  return acc;
}

function totalQuestions(ev: EvaluationV2Config): number {
  return ev.sections.reduce((acc, s) => acc + s.questions.length, 0);
}

/**
 * Récupère un label court pour chaque variante d'un même niveau
 * (basé sur l'ID — `mock-hsk1` → "Série A", `mock-hsk1-b` → "Série B", etc.).
 */
function variantLabel(ev: EvaluationV2Config, language: EvaluationV2Language): string {
  const m = ev.id.match(/-([a-z])$/);
  const letter = m ? m[1].toUpperCase() : 'A';
  return language === 'en' ? `Series ${letter}` : `Série ${letter}`;
}

const EvaluationHubPage = ({
  language = 'fr',
  userDisplayName,
  onOpenRemediation,
  onResultSubmitted
}: EvaluationHubPageProps) => {
  const copy = HUB_COPY[language];
  const [phase, setPhase] = useState<Phase>('hub');
  const [activeEval, setActiveEval] = useState<EvaluationV2Config | null>(null);

  /**
   * Regroupe toutes les évaluations par niveau HSK. L'ordre d'apparition
   * dans `HSK_EVALUATIONS` est préservé (Série A vient avant Série B).
   */
  const groupedByLevel = useMemo(() => {
    const map = new Map<EvaluationV2Config['level'], EvaluationV2Config[]>();
    for (const ev of HSK_EVALUATIONS) {
      const list = map.get(ev.level) ?? [];
      list.push(ev);
      map.set(ev.level, list);
    }
    // Conserver l'ordre HSK1 → HSK6.
    return Array.from(map.entries()).sort((a, b) =>
      a[0].localeCompare(b[0])
    );
  }, []);

  // Variante sélectionnée par niveau (default : Série A).
  const [selectedVariantId, setSelectedVariantId] = useState<
    Record<EvaluationV2Config['level'], string>
  >(() => {
    const out: Record<string, string> = {};
    for (const [level, evs] of groupedByLevel) {
      if (evs[0]) out[level] = evs[0].id;
    }
    return out as Record<EvaluationV2Config['level'], string>;
  });

  const handlePlayAudio = (url: string) => {
    // playAudioWithFallback gère .mp3/.wav + CDN local transparent.
    playAudioWithFallback(url).catch((err) => {
      // eslint-disable-next-line no-console
      console.warn('[Evaluation] audio non disponible pour :', url, err);
    });
  };

  if (phase === 'run' && activeEval) {
    return (
      <EvaluationPageV2
        evaluation={activeEval}
        language={language}
        userDisplayName={userDisplayName}
        onBack={() => {
          setPhase('hub');
          setActiveEval(null);
        }}
        onOpenRemediation={onOpenRemediation}
        onPlayAudio={handlePlayAudio}
        onSubmit={(r) => onResultSubmitted?.(r)}
      />
    );
  }

  return (
    <div className="evaluation-v2">
      <div className="ev-hub">
        <header className="ev-hub-head">
          <div className="xl-hero-row">
            <div className="xl-hero-icon" aria-hidden="true">🎯</div>
            <div className="xl-hero-head-text">
              <h1>{copy.title}</h1>
              <p>{copy.subtitle}</p>
            </div>
          </div>
        </header>

        <div className="ev-hub-grid">
          {groupedByLevel.map(([level, evaluations]) => {
            const activeId = selectedVariantId[level] ?? evaluations[0].id;
            const ev =
              evaluations.find((candidate) => candidate.id === activeId) ??
              evaluations[0];
            const total = totalQuestions(ev);
            const counts = countByKind(ev);
            const accent = LEVEL_ACCENT[level];
            const emoji = LEVEL_EMOJI[level];
            const title = language === 'en' && ev.titleEn ? ev.titleEn : ev.title;
            const subtitle =
              language === 'en' && ev.subtitleEn ? ev.subtitleEn : ev.subtitle;
            const hasMultiple = evaluations.length > 1;

            return (
              <article
                key={level}
                className="ev-hub-card"
                style={{ '--ev-hub-accent': accent } as React.CSSProperties}
              >
                <div className="ev-hub-card-top">
                  <span className="ev-hub-card-level">{level.toUpperCase()}</span>
                  <span className="ev-hub-card-emoji" aria-hidden>
                    {emoji}
                  </span>
                </div>
                <h2 className="ev-hub-card-title">{title}</h2>
                <p className="ev-hub-card-sub">{subtitle}</p>

                {hasMultiple && (
                  <div
                    className="ev-hub-card-variants"
                    role="tablist"
                    aria-label={copy.variants}
                  >
                    {evaluations.map((variant) => {
                      const isActive = variant.id === ev.id;
                      return (
                        <button
                          key={variant.id}
                          type="button"
                          role="tab"
                          aria-selected={isActive}
                          className={
                            'ev-hub-card-variant' +
                            (isActive ? ' is-active' : '')
                          }
                          onClick={() =>
                            setSelectedVariantId((prev) => ({
                              ...prev,
                              [level]: variant.id
                            }))
                          }
                        >
                          {variantLabel(variant, language)}
                        </button>
                      );
                    })}
                  </div>
                )}

                <ul className="ev-hub-card-stats">
                  <li>
                    <strong>{Math.round(ev.durationSeconds / 60)}</strong>
                    <span>{copy.minutes}</span>
                  </li>
                  <li>
                    <strong>{total}</strong>
                    <span>{copy.questions}</span>
                  </li>
                  <li>
                    <strong>{ev.passingPercent ?? 60}%</strong>
                    <span>{copy.passing}</span>
                  </li>
                  <li>
                    <strong>+{ev.xpReward ?? 100}</strong>
                    <span>{copy.xp}</span>
                  </li>
                </ul>

                <div className="ev-hub-card-kinds">
                  <span title={copy.vocab}>📖 {counts.vocabulary}</span>
                  <span title={copy.grammar}>🧩 {counts.grammar}</span>
                  <span title={copy.reading}>📜 {counts.reading}</span>
                  <span title={copy.listening}>🎧 {counts.listening}</span>
                </div>

                <button
                  type="button"
                  className="ev-hub-card-cta"
                  onClick={() => {
                    setActiveEval(ev);
                    setPhase('run');
                  }}
                >
                  {copy.cta} →
                </button>
              </article>
            );
          })}
        </div>

        <footer className="ev-hub-tip">💡 {copy.tip}</footer>
      </div>
    </div>
  );
};

export default EvaluationHubPage;
