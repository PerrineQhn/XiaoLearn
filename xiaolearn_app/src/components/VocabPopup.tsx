/**
 * VocabPopup.tsx — popover de vocabulaire au clic sur un mot chinois
 * -------------------------------------------------------------------
 * S'affiche au clic d'un token chinois (dans Prof. Xiao ou ailleurs)
 * en position absolue près du curseur.
 *
 * Affiche :
 *   - hanzi (gros)
 *   - pinyin (italique gris)
 *   - traduction FR/EN
 *   - bouton "Ajouter à mes flashcards" → "✓ Dans tes flashcards" si déjà là
 *   - bouton audio (cliquable pour entendre le mot)
 *
 * Le composant gère sa propre fermeture au clic en-dehors (overlay invisible).
 */
import { useEffect, useState } from 'react';
import type { UsePersonalFlashcardsReturn } from '../hooks/usePersonalFlashcards';
import { playHanziAudio } from '../utils/audio';

export interface VocabPopupWord {
  hanzi: string;
  pinyin?: string;
  translation?: string;
}

export interface VocabPopupExample {
  hanzi: string;
  pinyin?: string;
  translation?: string;
}

export interface VocabPopupProps {
  word: VocabPopupWord;
  /** Optionnel : phrase d'exemple contenant le mot (extraite de la conversation). */
  example?: VocabPopupExample | null;
  /** Position absolue (px) du popup — typiquement celle du clic. */
  anchor: { x: number; y: number };
  /** Hook flashcards perso. Optionnel : si absent, le bouton est désactivé. */
  personalFlashcards?: UsePersonalFlashcardsReturn;
  /** Si false, l'ajout de flashcards perso est verrouillé (gating Lifetime). */
  canAddFlashcards?: boolean;
  language?: 'fr' | 'en';
  onClose: () => void;
}

const VocabPopup = ({
  word,
  example,
  anchor,
  personalFlashcards,
  canAddFlashcards = true,
  language = 'fr',
  onClose
}: VocabPopupProps) => {
  const [feedback, setFeedback] = useState<'idle' | 'added'>('idle');

  // ESC = ferme
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  // Le popup ne sort pas du viewport. On clamp X et Y. La hauteur est plus
  // grande quand il y a un exemple, donc on adapte la zone réservée.
  const popupWidth = 280;
  const popupHeight = example ? 250 : 170;
  const margin = 12;
  const maxX = (typeof window !== 'undefined' ? window.innerWidth : 1200) - popupWidth - margin;
  const maxY = (typeof window !== 'undefined' ? window.innerHeight : 800) - popupHeight - margin;
  const left = Math.max(margin, Math.min(anchor.x, maxX));
  const top = Math.max(margin, Math.min(anchor.y, maxY));

  const alreadyInDeck = personalFlashcards?.cards.some(
    (c) => c.hanzi.trim() === word.hanzi.trim()
  );
  const atCapacity = personalFlashcards?.atCapacity ?? false;

  const handleAudio = () => {
    playHanziAudio(word.hanzi).catch(() => {
      /* silent : si pas d'audio dispo, on ne casse pas l'UI */
    });
  };

  const handleAddToFlashcards = () => {
    if (!personalFlashcards || alreadyInDeck || atCapacity) return;
    const trimmedHanzi = word.hanzi.trim();
    if (!trimmedHanzi) return;
    const created = personalFlashcards.addCard({
      hanzi: trimmedHanzi,
      pinyin: word.pinyin,
      translationFr: word.translation ?? '',
      translationEn: word.translation,
      note:
        language === 'fr'
          ? 'Ajouté depuis Prof. Xiao'
          : 'Added from Prof. Xiao'
    });
    if (created) {
      setFeedback('added');
    }
  };

  const isLocked = !canAddFlashcards;
  const showAddedFeedback = feedback === 'added' || alreadyInDeck;

  const renderActionButton = () => {
    if (isLocked) {
      return (
        <button
          type="button"
          className="at2-vocab-popup-action at2-vocab-popup-action--locked"
          disabled
        >
          {language === 'fr'
            ? 'Flashcards perso (Premium)'
            : 'Personal flashcards (Premium)'}
        </button>
      );
    }
    if (showAddedFeedback) {
      return (
        <button
          type="button"
          className="at2-vocab-popup-action at2-vocab-popup-action--already"
          disabled
        >
          ✓ {language === 'fr' ? 'Dans tes flashcards' : 'In your flashcards'}
        </button>
      );
    }
    if (atCapacity) {
      return (
        <button
          type="button"
          className="at2-vocab-popup-action at2-vocab-popup-action--full"
          disabled
        >
          {language === 'fr' ? 'Capacité atteinte' : 'Deck full'}
        </button>
      );
    }
    return (
      <button
        type="button"
        className="at2-vocab-popup-action at2-vocab-popup-action--add"
        onClick={handleAddToFlashcards}
      >
        + {language === 'fr' ? 'Ajouter à mes flashcards' : 'Add to flashcards'}
      </button>
    );
  };

  return (
    <>
      <div
        className="at2-vocab-popup-backdrop"
        onClick={onClose}
        role="presentation"
      />
      <div
        className="at2-vocab-popup"
        style={{ left, top }}
        role="dialog"
        aria-label={`Vocabulaire ${word.hanzi}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="at2-vocab-popup-header">
          <button
            type="button"
            className="at2-vocab-popup-audio"
            onClick={handleAudio}
            aria-label={language === 'fr' ? 'Écouter' : 'Listen'}
            title={language === 'fr' ? 'Écouter' : 'Listen'}
          >
            🔊
          </button>
          <div style={{ minWidth: 0 }}>
            <p className="at2-vocab-popup-hanzi">{word.hanzi}</p>
            {word.pinyin && (
              <p className="at2-vocab-popup-pinyin">{word.pinyin}</p>
            )}
          </div>
        </div>
        {word.translation ? (
          <p className="at2-vocab-popup-translation">{word.translation}</p>
        ) : (
          <p className="at2-vocab-popup-empty">
            {language === 'fr'
              ? 'Traduction non trouvée dans le dictionnaire.'
              : 'Translation not found in dictionary.'}
          </p>
        )}
        {example && (
          <div className="at2-vocab-popup-example">
            <div className="at2-vocab-popup-example-label">
              {language === 'fr' ? 'Exemple' : 'Example'}
            </div>
            <p className="at2-vocab-popup-example-hanzi">{example.hanzi}</p>
            {example.pinyin && (
              <p className="at2-vocab-popup-example-pinyin">{example.pinyin}</p>
            )}
            {example.translation && (
              <p className="at2-vocab-popup-example-translation">
                {example.translation}
              </p>
            )}
          </div>
        )}
        {renderActionButton()}
      </div>
    </>
  );
};

export default VocabPopup;
