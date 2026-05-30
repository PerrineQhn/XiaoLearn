/**
 * AtelierPage.tsx — page d'entraînement libre prononciation + écriture.
 * ----------------------------------------------------------------------
 * Permet de s'entraîner sur N'IMPORTE QUELLE liste de hanzi, sans dépendre
 * d'une leçon spécifique. Deux modes (oral / écriture) × deux sources
 * (mes flashcards perso / liste libre saisie).
 *
 * UX :
 *   1. Step "mode"   — choix entre 🎤 prononciation et ✍️ écriture
 *   2. Step "source" — choix entre mes flashcards / liste libre
 *   3. Step "drill"  — lance HandwritingDrill ou PronunciationDrill
 *
 * Persistance : aucune, c'est un atelier libre (la SRS reste celle des
 * flashcards principales, indépendamment de cet atelier).
 */

import { useMemo, useState } from 'react';
import type { Language } from '../i18n';
import type { PersonalFlashcard } from '../types/flashcard-v3';
import PronunciationDrill, {
  type PronunciationDrillItem
} from '../components/PronunciationDrill';
import HandwritingDrill from '../components/HandwritingDrill';
import DialoguePageV2 from './DialoguePageV2';
import ReadingPageV2 from './ReadingPageV2';
import './AtelierPage.css';

/** Item minimal pour l'atelier — hanzi + pinyin. Sourcé soit des
 *  PersonalFlashcard, soit des mots SRS des leçons complétées. */
export interface AtelierPoolItem {
  hanzi: string;
  pinyin: string;
}

/** Bucket = un sous-pool nommé (ex: une leçon, une catégorie HSK).
 *  Permet le sélecteur "une leçon précise". */
export interface AtelierBucket {
  id: string;
  title: string;
  items: AtelierPoolItem[];
}

interface AtelierPageProps {
  language: Language;
  personalFlashcards: PersonalFlashcard[];
  /** Mots SRS issus de toutes les leçons complétées (pool plat, dédupliqué). */
  lessonWordPool?: AtelierPoolItem[];
  /** Mots groupés par leçon — pour le sélecteur "Une leçon précise". */
  lessonBuckets?: AtelierBucket[];
}

// V12 — Atelier englobe maintenant 4 modes : prononciation orale, écriture
// handwriting, dialogues structurés, et lectures (textes). Les deux premiers
// passent par un picker de source (flashcards / liste libre) ; les deux
// derniers rendent directement leur catalogue (DialoguePageV2 / ReadingPageV2).
type Mode = 'pronunciation' | 'writing' | 'dialogue' | 'reading';
type SourceKind = 'flashcards' | 'custom';

const COPY = {
  fr: {
    title: 'Atelier libre',
    subtitle:
      "Entraîne-toi sur la liste de mots de ton choix, sans pression et hors leçon. La progression n'affecte pas tes flashcards principales.",
    pickMode: '1 · Choisis un mode',
    pickSource: '2 · Choisis ta source',
    modePronunciation: 'Prononciation',
    modePronunciationDesc: 'Parle dans le micro, reconnaissance vocale chinoise.',
    modeWriting: 'Écriture',
    modeWritingDesc: 'Trace les caractères au doigt, au stylet ou à la souris.',
    modeDialogue: 'Dialogues',
    modeDialogueDesc: 'Écoute et explore des dialogues annotés (CECR A1→B2).',
    modeReading: 'Lecture',
    modeReadingDesc: 'Lis des textes avec audio, mots cliquables et quiz.',
    sourceFlashcards: 'Mes flashcards',
    sourceFlashcardsDesc: (perso: number, lecons: number) => {
      const total = perso + lecons;
      if (total === 0) return 'Aucune flashcard personnelle pour le moment.';
      return `${total} mot${total > 1 ? 's' : ''} disponible${total > 1 ? 's' : ''} (${perso} perso · ${lecons} via leçons).`;
    },
    refineTitle: 'Affine ta sélection',
    refineSourcePicker: 'Source des mots',
    refineSourceAll: 'Tout (perso + leçons)',
    refineSourcePerso: 'Cartes perso seulement',
    refineSourceLesson: 'Une leçon précise',
    refinePickLesson: 'Choisis la leçon',
    refineCount: 'Combien de mots ?',
    refineCountAll: 'Tous',
    refineShuffle: 'Mélanger l\'ordre',
    refineTotalShown: (n: number) => `${n} mot${n > 1 ? 's' : ''} sélectionné${n > 1 ? 's' : ''} pour l\'entraînement.`,
    sourceCustom: 'Liste libre',
    sourceCustomDesc: 'Colle ou tape une liste de hanzi.',
    customPlaceholder:
      'Tape les hanzi séparés par des espaces, virgules ou retours à la ligne.\n\nEx :\n你 好 我\n中国, 学习, 朋友',
    customStart: 'Démarrer',
    back: '← Retour',
    backToMenu: '← Revenir au menu',
    noFlashcards: 'Tu n\'as pas encore de flashcards. Crée-en depuis les leçons ou utilise une liste libre.',
    invalidCustom: 'Aucun hanzi détecté dans ta saisie. Vérifie qu\'il y a bien des caractères chinois.'
  },
  en: {
    title: 'Free practice',
    subtitle:
      "Practice on any list of characters, no pressure, outside any lesson. Progress here doesn't affect your main flashcards.",
    pickMode: '1 · Pick a mode',
    pickSource: '2 · Pick a source',
    modePronunciation: 'Pronunciation',
    modePronunciationDesc: 'Speak into the mic, Chinese speech recognition.',
    modeWriting: 'Writing',
    modeWritingDesc: 'Trace characters with finger, stylus, or mouse.',
    modeDialogue: 'Dialogues',
    modeDialogueDesc: 'Listen and explore annotated dialogues (CEFR A1→B2).',
    modeReading: 'Readings',
    modeReadingDesc: 'Read texts with audio, clickable words, and quizzes.',
    sourceFlashcards: 'My flashcards',
    sourceFlashcardsDesc: (perso: number, lecons: number) => {
      const total = perso + lecons;
      if (total === 0) return 'No personal flashcards yet.';
      return `${total} word${total > 1 ? 's' : ''} available (${perso} personal · ${lecons} from lessons).`;
    },
    refineTitle: 'Refine your selection',
    refineSourcePicker: 'Word source',
    refineSourceAll: 'All (personal + lessons)',
    refineSourcePerso: 'Personal cards only',
    refineSourceLesson: 'A specific lesson',
    refinePickLesson: 'Pick the lesson',
    refineCount: 'How many words?',
    refineCountAll: 'All',
    refineShuffle: 'Shuffle order',
    refineTotalShown: (n: number) => `${n} word${n > 1 ? 's' : ''} selected for practice.`,
    sourceCustom: 'Custom list',
    sourceCustomDesc: 'Paste or type a list of hanzi.',
    customPlaceholder:
      'Type hanzi separated by spaces, commas, or new lines.\n\nE.g.:\n你 好 我\n中国, 学习, 朋友',
    customStart: 'Start',
    back: '← Back',
    backToMenu: '← Back to menu',
    noFlashcards: "You don't have any flashcards yet. Create some from lessons or use a custom list.",
    invalidCustom: 'No hanzi detected in your input. Make sure you have Chinese characters.'
  }
};

/**
 * Extrait les hanzi d'une saisie libre. Garde uniquement les caractères
 * dans la range Unicode CJK Unified Ideographs. Préserve l'ordre.
 */
const parseCustomHanzi = (input: string): string[] => {
  // On split sur tout ce qui n'est PAS un hanzi (espaces, virgules, ponct.)
  // et on garde les "mots" (groupes de hanzi contigus).
  const groups = input.split(/[^一-鿿]+/).filter(Boolean);
  return groups;
};

type RefineSource = 'all' | 'perso' | 'lesson';
const COUNT_OPTIONS = [5, 10, 20, 50, Number.POSITIVE_INFINITY] as const;

const AtelierPage = ({
  language,
  personalFlashcards,
  lessonWordPool = [],
  lessonBuckets = []
}: AtelierPageProps) => {
  const copy = COPY[language === 'en' ? 'en' : 'fr'];
  const drillLang: 'fr' | 'en' = language === 'en' ? 'en' : 'fr';

  const [mode, setMode] = useState<Mode | null>(null);
  const [sourceKind, setSourceKind] = useState<SourceKind | null>(null);
  const [customInput, setCustomInput] = useState('');
  const [drillData, setDrillData] = useState<{
    hanzis: string[];
    items: PronunciationDrillItem[];
  } | null>(null);

  // === Sélecteur granulaire ===
  // Source de mots : 'all' (perso + leçons), 'perso' (uniquement cartes
  // manuellement créées), 'lesson' (une leçon précise via lessonBuckets).
  const [refineSource, setRefineSource] = useState<RefineSource>('all');
  const [refineLessonId, setRefineLessonId] = useState<string | null>(null);
  const [refineCount, setRefineCount] = useState<number>(Number.POSITIVE_INFINITY);
  const [refineShuffle, setRefineShuffle] = useState<boolean>(true);

  // === Pool unifié ===
  // 1. Perso = cartes manuellement créées (hanzi+pinyin)
  // 2. Pool leçons = mots SRS issus des leçons complétées (passé en prop
  //    par App.tsx via completedLessonWordPool)
  // On garde séparé perso/leçons pour pouvoir afficher la décomposition
  // dans l'UI ("X perso · Y via leçons") et appliquer le filtre source.
  const persoItems = useMemo<PronunciationDrillItem[]>(
    () => personalFlashcards.map((c) => ({ hanzi: c.hanzi, pinyin: c.pinyin })),
    [personalFlashcards]
  );

  // Items des leçons mais SANS doublons avec perso (perso = priorité)
  const lessonOnlyItems = useMemo<PronunciationDrillItem[]>(() => {
    const persoKeys = new Set(persoItems.map((c) => c.hanzi.trim()));
    const seen = new Set<string>();
    const out: PronunciationDrillItem[] = [];
    for (const w of lessonWordPool) {
      const key = w.hanzi.trim();
      if (key && !persoKeys.has(key) && !seen.has(key)) {
        seen.add(key);
        out.push({ hanzi: w.hanzi, pinyin: w.pinyin });
      }
    }
    return out;
  }, [persoItems, lessonWordPool]);

  // Pool source (avant count/shuffle) selon refineSource
  const sourcePool = useMemo<PronunciationDrillItem[]>(() => {
    if (refineSource === 'perso') return persoItems;
    if (refineSource === 'lesson' && refineLessonId) {
      const bucket = lessonBuckets.find((b) => b.id === refineLessonId);
      if (!bucket) return [];
      const seen = new Set<string>();
      return bucket.items.filter((it) => {
        const key = it.hanzi.trim();
        if (!key || seen.has(key)) return false;
        seen.add(key);
        return true;
      });
    }
    // 'all' = perso + leçons dédoublonnés
    return [...persoItems, ...lessonOnlyItems];
  }, [refineSource, refineLessonId, persoItems, lessonOnlyItems, lessonBuckets]);

  // Applique le count + shuffle pour obtenir la liste finale d'entraînement
  const flashcardItems = useMemo<PronunciationDrillItem[]>(() => {
    let arr = sourcePool;
    if (refineShuffle) {
      // Fisher–Yates léger, copie pour ne pas muter la source
      arr = arr.slice();
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
    }
    if (Number.isFinite(refineCount) && refineCount < arr.length) {
      arr = arr.slice(0, refineCount);
    }
    return arr;
  }, [sourcePool, refineCount, refineShuffle]);

  const flashcardCount = sourcePool.length;
  const persoCount = persoItems.length;
  const lessonOnlyCount = lessonOnlyItems.length;

  const reset = () => {
    setMode(null);
    setSourceKind(null);
    setCustomInput('');
    setDrillData(null);
  };

  const backToSource = () => {
    setSourceKind(null);
    setDrillData(null);
  };

  const startFromFlashcards = () => {
    setDrillData({
      hanzis: personalFlashcards.map((c) => c.hanzi),
      items: flashcardItems
    });
  };

  const startFromCustom = () => {
    const hanzis = parseCustomHanzi(customInput);
    if (hanzis.length === 0) return;
    setDrillData({
      hanzis,
      items: hanzis.map((h) => ({ hanzi: h }))
    });
  };

  // ----- Render -----
  // Mode "dialogue" / "reading" : rendu direct du catalogue, pas de picker
  // de source — ces modes ont leur propre catalogue interne (CECR levels).
  // onBack revient au menu Atelier (reset complet).
  if (mode === 'dialogue') {
    return <DialoguePageV2 language={drillLang} onBack={reset} />;
  }
  if (mode === 'reading') {
    return <ReadingPageV2 language={drillLang} onBack={reset} />;
  }

  // Étape 3 : drill actif (prononciation ou écriture)
  if (drillData && mode) {
    return (
      <div className="atelier-page">
        <header className="atelier-header">
          <button
            type="button"
            className="atelier-back-btn"
            onClick={() => setDrillData(null)}
          >
            {copy.backToMenu}
          </button>
        </header>
        {mode === 'pronunciation' ? (
          <PronunciationDrill items={drillData.items} language={drillLang} />
        ) : (
          <HandwritingDrill hanzis={drillData.hanzis} language={drillLang} />
        )}
      </div>
    );
  }

  // Étape 2 : choix de source (uniquement pronunciation / writing)
  if (mode === 'pronunciation' || mode === 'writing') {
    // Header dynamique : reprend le titre du mode choisi (Prononciation / Écriture)
    // avec son emoji dans la box, pattern Lectures.
    const modeEmoji = mode === 'pronunciation' ? '🎤' : '✍️';
    const modeTitle = mode === 'pronunciation' ? copy.modePronunciation : copy.modeWriting;
    const modeSubtitle =
      mode === 'pronunciation' ? copy.modePronunciationDesc : copy.modeWritingDesc;
    return (
      <div className="atelier-page">
        <button
          type="button"
          className="atelier-back-btn"
          onClick={reset}
        >
          {copy.back}
        </button>
        <header className="atelier-header atelier-header--catalog">
          <div className="atelier-catalog-icon" aria-hidden>{modeEmoji}</div>
          <div className="atelier-catalog-head-text">
            <h1>{modeTitle}</h1>
            <p>{modeSubtitle}</p>
          </div>
        </header>

        <section className="atelier-section">
          <h2>{copy.pickSource}</h2>
          <div className="atelier-cards">
            <button
              type="button"
              className={`atelier-card ${sourceKind === 'flashcards' ? 'is-selected' : ''}`}
              onClick={() => setSourceKind('flashcards')}
              disabled={persoCount + lessonOnlyCount === 0}
            >
              <span className="atelier-card-icon">📇</span>
              <span className="atelier-card-title">{copy.sourceFlashcards}</span>
              <span className="atelier-card-desc">
                {copy.sourceFlashcardsDesc(persoCount, lessonOnlyCount)}
              </span>
            </button>
            <button
              type="button"
              className={`atelier-card ${sourceKind === 'custom' ? 'is-selected' : ''}`}
              onClick={() => setSourceKind('custom')}
            >
              <span className="atelier-card-icon">📝</span>
              <span className="atelier-card-title">{copy.sourceCustom}</span>
              <span className="atelier-card-desc">{copy.sourceCustomDesc}</span>
            </button>
          </div>
        </section>

        {sourceKind === 'flashcards' && (
          <section className="atelier-section">
            {persoCount + lessonOnlyCount === 0 ? (
              <p className="atelier-empty">{copy.noFlashcards}</p>
            ) : (
              <>
                {/* === Panneau "Affine ta sélection" === */}
                <div className="atelier-refine">
                  <h3 className="atelier-refine-title">{copy.refineTitle}</h3>

                  {/* Source des mots */}
                  <div className="atelier-refine-row">
                    <label className="atelier-refine-label">
                      {copy.refineSourcePicker}
                    </label>
                    <div className="atelier-refine-chips">
                      <button
                        type="button"
                        className={`atelier-refine-chip ${refineSource === 'all' ? 'is-on' : ''}`}
                        onClick={() => setRefineSource('all')}
                      >
                        {copy.refineSourceAll} ({persoCount + lessonOnlyCount})
                      </button>
                      <button
                        type="button"
                        className={`atelier-refine-chip ${refineSource === 'perso' ? 'is-on' : ''}`}
                        onClick={() => setRefineSource('perso')}
                        disabled={persoCount === 0}
                      >
                        {copy.refineSourcePerso} ({persoCount})
                      </button>
                      {lessonBuckets.length > 0 && (
                        <button
                          type="button"
                          className={`atelier-refine-chip ${refineSource === 'lesson' ? 'is-on' : ''}`}
                          onClick={() => {
                            setRefineSource('lesson');
                            if (!refineLessonId) {
                              setRefineLessonId(lessonBuckets[0]?.id ?? null);
                            }
                          }}
                        >
                          {copy.refineSourceLesson} ({lessonBuckets.length})
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Sélecteur de leçon (visible si source = 'lesson') */}
                  {refineSource === 'lesson' && lessonBuckets.length > 0 && (
                    <div className="atelier-refine-row">
                      <label className="atelier-refine-label">
                        {copy.refinePickLesson}
                      </label>
                      <select
                        className="atelier-refine-select"
                        value={refineLessonId ?? lessonBuckets[0]?.id ?? ''}
                        onChange={(e) => setRefineLessonId(e.target.value)}
                      >
                        {lessonBuckets.map((b) => (
                          <option key={b.id} value={b.id}>
                            {b.title} ({b.items.length})
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  {/* Combien de mots */}
                  <div className="atelier-refine-row">
                    <label className="atelier-refine-label">
                      {copy.refineCount}
                    </label>
                    <div className="atelier-refine-chips">
                      {COUNT_OPTIONS.map((n) => {
                        const isAll = !Number.isFinite(n);
                        const label = isAll ? copy.refineCountAll : String(n);
                        const isOn =
                          refineCount === n ||
                          (isAll && !Number.isFinite(refineCount));
                        return (
                          <button
                            key={String(n)}
                            type="button"
                            className={`atelier-refine-chip ${isOn ? 'is-on' : ''}`}
                            onClick={() => setRefineCount(n)}
                            disabled={!isAll && n > sourcePool.length}
                          >
                            {label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Shuffle */}
                  <div className="atelier-refine-row">
                    <label className="atelier-refine-toggle">
                      <input
                        type="checkbox"
                        checked={refineShuffle}
                        onChange={(e) => setRefineShuffle(e.target.checked)}
                      />
                      <span>{copy.refineShuffle}</span>
                    </label>
                  </div>

                  <p className="atelier-refine-total">
                    {copy.refineTotalShown(flashcardItems.length)}
                  </p>
                </div>

                <button
                  type="button"
                  className="atelier-start-btn"
                  onClick={startFromFlashcards}
                  disabled={flashcardItems.length === 0}
                >
                  {copy.customStart} → ({flashcardItems.length}
                  {' '}
                  {language === 'fr' ? 'mots' : 'words'})
                </button>
              </>
            )}
          </section>
        )}

        {sourceKind === 'custom' && (
          <section className="atelier-section">
            <textarea
              className="atelier-custom-input"
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              placeholder={copy.customPlaceholder}
              rows={6}
            />
            <button
              type="button"
              className="atelier-start-btn"
              onClick={startFromCustom}
              disabled={parseCustomHanzi(customInput).length === 0}
            >
              {copy.customStart} → ({parseCustomHanzi(customInput).length}
              {' '}
              {language === 'fr' ? 'éléments' : 'items'})
            </button>
            {customInput.length > 0 && parseCustomHanzi(customInput).length === 0 && (
              <p className="atelier-empty">{copy.invalidCustom}</p>
            )}
          </section>
        )}
      </div>
    );
  }

  // Étape 1 : choix du mode (entrée)
  return (
    <div className="atelier-page">
      <header className="atelier-header atelier-header--catalog">
        <div className="atelier-catalog-icon" aria-hidden>🎓</div>
        <div className="atelier-catalog-head-text">
          <h1>{copy.title}</h1>
          <p>{copy.subtitle}</p>
        </div>
      </header>

      <section className="atelier-section">
        <h2>{copy.pickMode}</h2>
        <div className="atelier-cards">
          <button
            type="button"
            className="atelier-card atelier-card--mode"
            onClick={() => setMode('pronunciation')}
          >
            <span className="atelier-card-icon">🎤</span>
            <span className="atelier-card-title">{copy.modePronunciation}</span>
            <span className="atelier-card-desc">{copy.modePronunciationDesc}</span>
          </button>
          <button
            type="button"
            className="atelier-card atelier-card--mode"
            onClick={() => setMode('writing')}
          >
            <span className="atelier-card-icon">✍️</span>
            <span className="atelier-card-title">{copy.modeWriting}</span>
            <span className="atelier-card-desc">{copy.modeWritingDesc}</span>
          </button>
          <button
            type="button"
            className="atelier-card atelier-card--mode"
            onClick={() => setMode('dialogue')}
          >
            <span className="atelier-card-icon">💬</span>
            <span className="atelier-card-title">{copy.modeDialogue}</span>
            <span className="atelier-card-desc">{copy.modeDialogueDesc}</span>
          </button>
          <button
            type="button"
            className="atelier-card atelier-card--mode"
            onClick={() => setMode('reading')}
          >
            <span className="atelier-card-icon">📖</span>
            <span className="atelier-card-title">{copy.modeReading}</span>
            <span className="atelier-card-desc">{copy.modeReadingDesc}</span>
          </button>
        </div>
      </section>
    </div>
  );
};

export default AtelierPage;
