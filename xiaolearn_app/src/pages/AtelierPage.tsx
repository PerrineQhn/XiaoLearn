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

interface AtelierPageProps {
  language: Language;
  personalFlashcards: PersonalFlashcard[];
}

// V12 — Atelier englobe maintenant 4 modes : prononciation orale, écriture
// handwriting, dialogues structurés, et lectures (textes). Les deux premiers
// passent par un picker de source (flashcards / liste libre) ; les deux
// derniers rendent directement leur catalogue (DialoguePageV2 / ReadingPageV2).
type Mode = 'pronunciation' | 'writing' | 'dialogue' | 'reading';
type SourceKind = 'flashcards' | 'custom';

const COPY = {
  fr: {
    title: '🎓 Atelier libre',
    subtitle:
      "Entraîne-toi sur la liste de mots de ton choix, sans pression et hors leçon. La progression n'affecte pas tes flashcards principales.",
    pickMode: '1 · Choisis un mode',
    pickSource: '2 · Choisis ta source',
    modePronunciation: '🎤 Prononciation',
    modePronunciationDesc: 'Parle dans le micro, reconnaissance vocale chinoise.',
    modeWriting: '✍️ Écriture',
    modeWritingDesc: 'Trace les caractères au doigt, au stylet ou à la souris.',
    modeDialogue: '💬 Dialogues',
    modeDialogueDesc: 'Écoute et explore des dialogues annotés (CECR A1→B2).',
    modeReading: '📖 Textes',
    modeReadingDesc: 'Lis des textes avec audio, mots cliquables et quiz.',
    sourceFlashcards: 'Mes flashcards',
    sourceFlashcardsDesc: (n: number) =>
      n > 0
        ? `${n} mot${n > 1 ? 's' : ''} disponible${n > 1 ? 's' : ''} dans ta collection.`
        : 'Aucune flashcard personnelle pour le moment.',
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
    title: '🎓 Free practice',
    subtitle:
      "Practice on any list of characters, no pressure, outside any lesson. Progress here doesn't affect your main flashcards.",
    pickMode: '1 · Pick a mode',
    pickSource: '2 · Pick a source',
    modePronunciation: '🎤 Pronunciation',
    modePronunciationDesc: 'Speak into the mic, Chinese speech recognition.',
    modeWriting: '✍️ Writing',
    modeWritingDesc: 'Trace characters with finger, stylus, or mouse.',
    modeDialogue: '💬 Dialogues',
    modeDialogueDesc: 'Listen and explore annotated dialogues (CEFR A1→B2).',
    modeReading: '📖 Readings',
    modeReadingDesc: 'Read texts with audio, clickable words, and quizzes.',
    sourceFlashcards: 'My flashcards',
    sourceFlashcardsDesc: (n: number) =>
      n > 0
        ? `${n} word${n > 1 ? 's' : ''} available in your collection.`
        : 'No personal flashcards yet.',
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

const AtelierPage = ({ language, personalFlashcards }: AtelierPageProps) => {
  const copy = COPY[language === 'en' ? 'en' : 'fr'];
  const drillLang: 'fr' | 'en' = language === 'en' ? 'en' : 'fr';

  const [mode, setMode] = useState<Mode | null>(null);
  const [sourceKind, setSourceKind] = useState<SourceKind | null>(null);
  const [customInput, setCustomInput] = useState('');
  const [drillData, setDrillData] = useState<{
    hanzis: string[];
    items: PronunciationDrillItem[];
  } | null>(null);

  const flashcardCount = personalFlashcards.length;

  // Items dérivés des flashcards (pour le mode prononciation : on a aussi pinyin)
  const flashcardItems = useMemo<PronunciationDrillItem[]>(
    () =>
      personalFlashcards.map((c) => ({
        hanzi: c.hanzi,
        pinyin: c.pinyin
      })),
    [personalFlashcards]
  );

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
    return (
      <div className="atelier-page">
        <header className="atelier-header">
          <button
            type="button"
            className="atelier-back-btn"
            onClick={reset}
          >
            {copy.back}
          </button>
          <h1>{copy.title}</h1>
          <p>{copy.subtitle}</p>
        </header>

        <section className="atelier-section">
          <h2>{copy.pickSource}</h2>
          <div className="atelier-cards">
            <button
              type="button"
              className={`atelier-card ${sourceKind === 'flashcards' ? 'is-selected' : ''}`}
              onClick={() => setSourceKind('flashcards')}
              disabled={flashcardCount === 0}
            >
              <span className="atelier-card-icon">📇</span>
              <span className="atelier-card-title">{copy.sourceFlashcards}</span>
              <span className="atelier-card-desc">
                {copy.sourceFlashcardsDesc(flashcardCount)}
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
            {flashcardCount === 0 ? (
              <p className="atelier-empty">{copy.noFlashcards}</p>
            ) : (
              <button
                type="button"
                className="atelier-start-btn"
                onClick={startFromFlashcards}
              >
                {copy.customStart} → ({flashcardCount}
                {' '}
                {language === 'fr' ? 'mots' : 'words'})
              </button>
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
      <header className="atelier-header">
        <h1>{copy.title}</h1>
        <p>{copy.subtitle}</p>
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
