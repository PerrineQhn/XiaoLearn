/**
 * GrammarDrillsPageV2.tsx — drills grammaticaux ciblés
 * -----------------------------------------------------
 * Seonsaengnim a une page /conjugations où chaque verbe est répété sous
 * plusieurs formes (Informel / Formel × Présent / Passé / Futur...).
 * XiaoLearn a d'autres chantiers spécifiques au chinois :
 *
 *   - Mesures (量词) — 一个人, 两本书, 三张桌子…
 *   - Aspects verbaux — 了 / 过 / 着
 *   - Particules structurales — 的 / 地 / 得
 *   - 把 vs 被 (voix passive / dispositive)
 *   - 是…的 (focus)
 *
 * Pattern : on affiche une grille "drill" (pattern × item), chaque cellule
 * est cliquable → QCM court. L'objectif est la micro-pratique haute
 * fréquence, comme pour les conjugaisons coréennes. Autonome : données
 * fournies via props.
 *
 * Styles : ./../styles/grammar-drills-v2.css
 */

import { useMemo, useState } from 'react';
import '../styles/grammar-drills-v2.css';

// ============================================================================
//  TYPES
// ============================================================================

export type GrammarDrillsV2Language = 'fr' | 'en';

export type GrammarDrillTopicKey =
  | 'measure-words'
  | 'aspects'
  | 'de-particles'
  | 'ba-bei'
  | 'shi-de'
  | 'custom';

export interface GrammarDrillTopic {
  key: GrammarDrillTopicKey;
  title: string;
  titleEn?: string;
  /** Explication courte, affichée en header de la page. */
  hint: string;
  hintEn?: string;
  /** Headers de colonnes du tableau (ex : formes, classificateurs). */
  columns: string[];
  columnsEn?: string[];
  /** Lignes (ex : noms, verbes). */
  rows: GrammarDrillRow[];
}

export interface GrammarDrillRow {
  id: string;
  /** Label de la ligne (nom, verbe…). */
  label: string;
  labelEn?: string;
  /** Pour chaque colonne, une cellule. Même longueur que `columns`. */
  cells: GrammarDrillCell[];
}

export interface GrammarDrillCell {
  /** Valeur correcte à remplir (ex : 个, 本, 张 pour les mesures). */
  answer: string;
  pinyin?: string;
  /** Distracteurs pour le QCM. */
  choices: string[];
  /** Explication courte, affichée après la réponse. */
  explanation?: string;
  explanationEn?: string;
}

export interface GrammarDrillsPageV2Props {
  topics: GrammarDrillTopic[];
  language?: GrammarDrillsV2Language;
  onBack?: () => void;
  /** Hook de persistance (ex: incrémenter XP, marquer drill maîtrisé). */
  onCellAnswered?: (payload: {
    topicKey: GrammarDrillTopicKey;
    rowId: string;
    columnIndex: number;
    correct: boolean;
  }) => void;
}

// ============================================================================
//  COPIES
// ============================================================================

const COPY = {
  fr: {
    title: 'Grammaire chinoise — drills',
    subtitle: 'Quelques minutes par jour pour ancrer les structures les plus utilisées.',
    back: '← Retour',
    progress: 'Progression',
    mastered: 'maîtrisés',
    cells: 'cellules',
    correct: '✓ Bonne réponse',
    wrong: '✗ Mauvaise réponse',
    check: 'Valider',
    close: 'Fermer',
    explanation: 'Pourquoi ?',
    selectTopic: 'Choisis un thème ci-dessus pour commencer.',
    emptyGrid: 'Aucun drill disponible pour ce thème.'
  },
  en: {
    title: 'Chinese grammar drills',
    subtitle: 'A few minutes a day to lock in the most-used structures.',
    back: '← Back',
    progress: 'Progress',
    mastered: 'mastered',
    cells: 'cells',
    correct: '✓ Correct',
    wrong: '✗ Incorrect',
    check: 'Check',
    close: 'Close',
    explanation: 'Why?',
    selectTopic: 'Pick a topic above to start.',
    emptyGrid: 'No drill available for this topic.'
  }
} as const;

type CopyKey = keyof (typeof COPY)['fr'];
const t = (lang: GrammarDrillsV2Language, k: CopyKey) => COPY[lang][k] ?? COPY.fr[k];

// ============================================================================
//  SOUS-COMPOSANTS
// ============================================================================

const TopicTab = ({
  topic,
  active,
  onClick,
  language
}: {
  topic: GrammarDrillTopic;
  active: boolean;
  onClick: () => void;
  language: GrammarDrillsV2Language;
}) => (
  <button
    type="button"
    role="tab"
    aria-selected={active}
    className={`gd2-tab ${active ? 'gd2-tab--active' : ''}`}
    onClick={onClick}
  >
    {language === 'en' && topic.titleEn ? topic.titleEn : topic.title}
  </button>
);

interface DrillModalState {
  topicKey: GrammarDrillTopicKey;
  rowId: string;
  columnIndex: number;
  cell: GrammarDrillCell;
  rowLabel: string;
  columnLabel: string;
}

const DrillModal = ({
  state,
  language,
  onClose,
  onAnswered
}: {
  state: DrillModalState;
  language: GrammarDrillsV2Language;
  onClose: (correct: boolean | null) => void;
  onAnswered: (correct: boolean) => void;
}) => {
  const [picked, setPicked] = useState<string | null>(null);
  const [validated, setValidated] = useState(false);
  const isCorrect = validated && picked === state.cell.answer;

  return (
    <div className="gd2-modal-backdrop" onClick={() => onClose(null)}>
      <div className="gd2-modal" onClick={(e) => e.stopPropagation()}>
        <div className="gd2-modal-context">
          <strong>{state.rowLabel}</strong> · {state.columnLabel}
        </div>
        <div className="gd2-modal-choices">
          {state.cell.choices.map((choice) => {
            let cls = '';
            if (validated) {
              if (choice === state.cell.answer) cls = 'gd2-choice--correct';
              else if (choice === picked) cls = 'gd2-choice--wrong';
              else cls = 'gd2-choice--dimmed';
            } else if (choice === picked) {
              cls = 'gd2-choice--selected';
            }
            return (
              <button
                key={choice}
                className={`gd2-choice ${cls}`}
                disabled={validated}
                onClick={() => setPicked(choice)}
              >
                {choice}
              </button>
            );
          })}
        </div>

        {!validated ? (
          <button
            className="gd2-btn gd2-btn--primary"
            disabled={picked === null}
            onClick={() => {
              if (picked !== null) {
                const correct = picked === state.cell.answer;
                setValidated(true);
                onAnswered(correct);
              }
            }}
          >
            {t(language, 'check')}
          </button>
        ) : (
          <>
            <div className={`gd2-feedback ${isCorrect ? 'is-correct' : 'is-wrong'}`}>
              <strong>{isCorrect ? t(language, 'correct') : t(language, 'wrong')}</strong>
              {state.cell.pinyin && <div className="gd2-pinyin">{state.cell.pinyin}</div>}
              {(language === 'en' ? state.cell.explanationEn : state.cell.explanation) && (
                <div className="gd2-explanation">
                  <strong>{t(language, 'explanation')} </strong>
                  {language === 'en'
                    ? state.cell.explanationEn ?? state.cell.explanation
                    : state.cell.explanation}
                </div>
              )}
            </div>
            <button className="gd2-btn gd2-btn--ghost" onClick={() => onClose(isCorrect)}>
              {t(language, 'close')}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

// ============================================================================
//  COMPOSANT PRINCIPAL
// ============================================================================

const GrammarDrillsPageV2 = (props: GrammarDrillsPageV2Props) => {
  const { topics, language = 'fr', onBack, onCellAnswered } = props;

  const [topicIdx, setTopicIdx] = useState(0);
  const [modal, setModal] = useState<DrillModalState | null>(null);
  /** Map des cellules maîtrisées : `${topicKey}:${rowId}:${colIndex}` -> true. */
  const [mastered, setMastered] = useState<Record<string, boolean>>({});

  const topic = topics[topicIdx];

  const totalCells = useMemo(() => {
    if (!topic) return 0;
    return topic.rows.reduce((acc, r) => acc + r.cells.length, 0);
  }, [topic]);

  const masteredCount = useMemo(() => {
    if (!topic) return 0;
    const prefix = `${topic.key}:`;
    return Object.keys(mastered).filter((k) => k.startsWith(prefix) && mastered[k]).length;
  }, [mastered, topic]);

  const pct = totalCells === 0 ? 0 : Math.round((masteredCount / totalCells) * 100);

  if (!topics.length) {
    return (
      <div className="grammar-drills-v2">
        <div className="gd2-empty">{t(language, 'emptyGrid')}</div>
      </div>
    );
  }

  const columns = language === 'en' && topic.columnsEn ? topic.columnsEn : topic.columns;

  return (
    <div className="grammar-drills-v2">
      <div className="gd2-header">
        {onBack && (
          <button type="button" className="gd2-btn gd2-btn--link" onClick={onBack}>
            {t(language, 'back')}
          </button>
        )}
        <h1>{t(language, 'title')}</h1>
        <p>{t(language, 'subtitle')}</p>
      </div>

      {/* Tabs topics */}
      <div className="gd2-tabs" role="tablist">
        {topics.map((tp, i) => (
          <TopicTab
            key={tp.key}
            topic={tp}
            active={i === topicIdx}
            onClick={() => setTopicIdx(i)}
            language={language}
          />
        ))}
      </div>

      {/* Progression */}
      <div className="gd2-progress">
        <div className="gd2-progress-head">
          <span>
            {t(language, 'progress')} · {masteredCount} / {totalCells} {t(language, 'cells')}{' '}
            {t(language, 'mastered')}
          </span>
          <span className="gd2-progress-pct">{pct}%</span>
        </div>
        <div className="gd2-progress-track">
          <div className="gd2-progress-fill" style={{ width: `${pct}%` }} />
        </div>
      </div>

      {/* Hint */}
      <div className="gd2-hint">{language === 'en' && topic.hintEn ? topic.hintEn : topic.hint}</div>

      {/* Grille */}
      <div className="gd2-grid-wrapper">
        <table className="gd2-grid">
          <thead>
            <tr>
              <th className="gd2-row-header"> </th>
              {columns.map((c) => (
                <th key={c}>{c}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {topic.rows.map((row) => (
              <tr key={row.id}>
                <th className="gd2-row-header">
                  {language === 'en' && row.labelEn ? row.labelEn : row.label}
                </th>
                {row.cells.map((cell, cIdx) => {
                  const key = `${topic.key}:${row.id}:${cIdx}`;
                  const isMastered = mastered[key];
                  return (
                    <td key={cIdx}>
                      <button
                        type="button"
                        className={`gd2-cell ${isMastered ? 'is-mastered' : ''}`}
                        onClick={() =>
                          setModal({
                            topicKey: topic.key,
                            rowId: row.id,
                            columnIndex: cIdx,
                            cell,
                            rowLabel:
                              language === 'en' && row.labelEn ? row.labelEn : row.label,
                            columnLabel: columns[cIdx] ?? ''
                          })
                        }
                      >
                        {isMastered ? (
                          <span className="gd2-cell-answer">{cell.answer}</span>
                        ) : (
                          <span className="gd2-cell-placeholder">?</span>
                        )}
                      </button>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modal && (
        <DrillModal
          state={modal}
          language={language}
          onClose={(_correct) => setModal(null)}
          onAnswered={(correct) => {
            const key = `${modal.topicKey}:${modal.rowId}:${modal.columnIndex}`;
            if (correct) {
              setMastered((prev) => ({ ...prev, [key]: true }));
            }
            onCellAnswered?.({
              topicKey: modal.topicKey,
              rowId: modal.rowId,
              columnIndex: modal.columnIndex,
              correct
            });
          }}
        />
      )}
    </div>
  );
};

export default GrammarDrillsPageV2;

// ============================================================================
//  PRESETS — exemples de drills prêts à l'emploi (optionnel)
// ============================================================================

/**
 * Exemples : importe `DEFAULT_GRAMMAR_TOPICS` pour un démarrage rapide,
 * ou passe tes propres `topics`. Les sets ci-dessous sont volontairement
 * courts — on peut les enrichir depuis `data/grammar-lessons*.ts`.
 */
export const DEFAULT_GRAMMAR_TOPICS: GrammarDrillTopic[] = [
  {
    key: 'measure-words',
    title: 'Mesures (量词)',
    titleEn: 'Measure words',
    hint: 'Chaque nom chinois a un classificateur dédié. 个 est le plus fréquent, mais il est souvent incorrect dans un registre soigné.',
    hintEn:
      'Chinese nouns require a classifier. 个 is the default, but it is often wrong in careful usage.',
    columns: ['一', '两', '三'],
    rows: [
      {
        id: 'person',
        label: '人 (personne)',
        labelEn: 'person',
        cells: [
          {
            answer: '个',
            pinyin: 'yí gè rén',
            choices: ['个', '本', '张', '只'],
            explanation: '个 est le classificateur général pour les personnes.'
          },
          {
            answer: '个',
            pinyin: 'liǎng gè rén',
            choices: ['个', '本', '张', '只']
          },
          {
            answer: '个',
            pinyin: 'sān gè rén',
            choices: ['个', '本', '张', '只']
          }
        ]
      },
      {
        id: 'book',
        label: '书 (livre)',
        labelEn: 'book',
        cells: [
          {
            answer: '本',
            pinyin: 'yì běn shū',
            choices: ['本', '个', '张', '件'],
            explanation: '本 s\'utilise pour les livres, cahiers, magazines reliés.'
          },
          { answer: '本', pinyin: 'liǎng běn shū', choices: ['本', '个', '张', '件'] },
          { answer: '本', pinyin: 'sān běn shū', choices: ['本', '个', '张', '件'] }
        ]
      },
      {
        id: 'paper',
        label: '纸 (feuille)',
        labelEn: 'sheet of paper',
        cells: [
          {
            answer: '张',
            pinyin: 'yì zhāng zhǐ',
            choices: ['张', '个', '本', '条'],
            explanation: '张 classe les objets plats (feuille, table, lit, ticket).'
          },
          { answer: '张', pinyin: 'liǎng zhāng zhǐ', choices: ['张', '个', '本', '条'] },
          { answer: '张', pinyin: 'sān zhāng zhǐ', choices: ['张', '个', '本', '条'] }
        ]
      }
    ]
  },
  {
    key: 'aspects',
    title: 'Aspects (了 / 过 / 着)',
    titleEn: 'Aspects (了 / 过 / 着)',
    hint: '了 = action achevée ou changement d\'état ; 过 = expérience vécue au moins une fois ; 着 = état/action en cours (statique).',
    hintEn:
      '了 = completion or change of state ; 过 = past experience at least once ; 着 = ongoing static state.',
    columns: ['Action achevée', 'Expérience vécue', 'État en cours'],
    columnsEn: ['Completed', 'Experienced', 'Ongoing state'],
    rows: [
      {
        id: 'eat',
        label: '吃 (manger)',
        labelEn: 'to eat',
        cells: [
          {
            answer: '了',
            pinyin: 'chī le',
            choices: ['了', '过', '着', '过了'],
            explanation: '了 marque ici l\'achèvement : 我吃了 = J\'ai mangé.'
          },
          {
            answer: '过',
            pinyin: 'chī guo',
            choices: ['了', '过', '着', '过了'],
            explanation: '过 = expérience : 我吃过北京烤鸭 = J\'ai déjà goûté le canard laqué.'
          },
          {
            answer: '着',
            pinyin: 'chī zhe',
            choices: ['了', '过', '着', '过了'],
            explanation: '着 = état : 吃着饭 = en train de manger (continu/statique).'
          }
        ]
      },
      {
        id: 'go',
        label: '去 (aller)',
        labelEn: 'to go',
        cells: [
          {
            answer: '了',
            pinyin: 'qù le',
            choices: ['了', '过', '着'],
            explanation: '他去了 = il y est allé.'
          },
          {
            answer: '过',
            pinyin: 'qù guo',
            choices: ['了', '过', '着'],
            explanation: '我去过中国 = Je suis déjà allé en Chine.'
          },
          {
            answer: '着',
            pinyin: '—',
            choices: ['了', '过', '着', 'N/A'],
            explanation: '去 est un verbe directionnel, 着 est rare dessus — 着 s\'emploie surtout avec 站/坐/开…'
          }
        ]
      }
    ]
  },
  {
    key: 'de-particles',
    title: 'Particules 的 / 地 / 得',
    titleEn: '的 / 地 / 得 particles',
    hint: '的 = lien nom+nom/adjectif+nom ; 地 = adverbe+verbe ; 得 = verbe+complément de degré.',
    hintEn:
      '的 = links noun modifier to noun ; 地 = adverb to verb ; 得 = verb to degree complement.',
    columns: ['Déterminant + Nom', 'Adverbe + Verbe', 'Verbe + Complément'],
    columnsEn: ['Modifier + Noun', 'Adverb + Verb', 'Verb + Complement'],
    rows: [
      {
        id: 'base',
        label: 'Base',
        labelEn: 'Base',
        cells: [
          {
            answer: '的',
            pinyin: '红 __ 苹果',
            choices: ['的', '地', '得'],
            explanation: '红的苹果 = pomme rouge. 的 lie l\'adjectif au nom.'
          },
          {
            answer: '地',
            pinyin: '慢慢 __ 走',
            choices: ['的', '地', '得'],
            explanation: '慢慢地走 = marcher lentement. 地 transforme l\'adjectif en adverbe.'
          },
          {
            answer: '得',
            pinyin: '跑 __ 快',
            choices: ['的', '地', '得'],
            explanation: '跑得快 = courir vite. 得 introduit un complément de degré.'
          }
        ]
      }
    ]
  }
];
