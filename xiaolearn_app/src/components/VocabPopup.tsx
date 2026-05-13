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
import {
  enrichVocabWithLLM,
  getCachedEnrichment,
  type VocabEnrichment
} from '../services/vocabLlmService';

export interface VocabPopupWord {
  hanzi: string;
  pinyin?: string;
  /** Traduction du mot composé (si trouvée). Optionnel. */
  translation?: string;
  /** Décomposition caractère-par-caractère, présente si mot composé. */
  breakdown?: Array<{ char: string; pinyin: string; sense: string }>;
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
  /**
   * Indice contextuel passé au LLM pour qu'il choisisse le sens des
   * caractères selon le contexte (la phrase d'origine où l'utilisateur a
   * cliqué). Inutile pour les mots déjà en CFDICT / leçons.
   */
  contextHint?: string;
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
  contextHint,
  anchor,
  personalFlashcards,
  canAddFlashcards = true,
  language = 'fr',
  onClose
}: VocabPopupProps) => {
  const [feedback, setFeedback] = useState<'idle' | 'added'>('idle');

  // Enrichissement LLM async. On appelle Gemini si :
  //   - mot composé (≥2 hanzi) ET (pas de traduction OU breakdown partielle)
  //   - OU mot d'1 hanzi mais on a un contexte (le LLM affine le sens
  //     contextuel des particules isolées : 了 selon le contexte = "particule
  //     d'achèvement" plutôt que "finir")
  //   - OU on a une phrase d'exemple sans traduction (le LLM traduit la phrase)
  const initialCached = getCachedEnrichment(
    word.hanzi,
    contextHint,
    example?.hanzi
  );
  const [enrichment, setEnrichment] = useState<VocabEnrichment | null>(
    initialCached
  );
  const [enriching, setEnriching] = useState<boolean>(false);

  const wordLen = Array.from(word.hanzi).length;
  const needsEnrichment =
    !initialCached &&
    (
      // Mot ≥2 chars : si trad manquante ou breakdown incomplète
      (wordLen >= 2 &&
        (!word.translation ||
          (word.breakdown ?? []).length < wordLen)) ||
      // Mot d'1 char mais on a un contexte riche
      (wordLen === 1 && Boolean(contextHint && contextHint.length > 1)) ||
      // Exemple sans traduction : on demande au LLM de traduire la phrase
      Boolean(example && !example.translation)
    );

  useEffect(() => {
    if (!needsEnrichment) return;
    let cancelled = false;
    setEnriching(true);
    enrichVocabWithLLM(word.hanzi, {
      contextHint,
      exampleSentence: example?.hanzi
    })
      .then((data) => {
        if (cancelled) return;
        if (data) setEnrichment(data);
      })
      .finally(() => {
        if (!cancelled) setEnriching(false);
      });
    return () => {
      cancelled = true;
    };
  }, [word.hanzi, contextHint, example?.hanzi, needsEnrichment]);

  // Données affichées : on préfère l'enrichment LLM (contextualisé) sur les
  // données CFDICT/lessons quand il existe.
  const displayTranslation = enrichment?.translation || word.translation || '';
  const displayBreakdown =
    (enrichment?.breakdown && enrichment.breakdown.length > 0
      ? enrichment.breakdown
      : word.breakdown) ?? [];
  const displayExampleTranslation =
    enrichment?.exampleTranslation || example?.translation || '';

  // Pinyin du mot principal — priorité :
  //   1. enrichment.pinyin (champ dédié contextuel du LLM)
  //   2. Reconstitution depuis enrichment.breakdown (si alignée char-à-char)
  //   3. word.pinyin (pinyin-pro, par défaut)
  // Important pour les polyphones : 了 en particule = "le", pas "liǎo".
  const displayPinyin = (() => {
    if (enrichment?.pinyin && enrichment.pinyin.trim()) {
      return enrichment.pinyin.trim();
    }
    const llm = enrichment?.breakdown;
    if (llm && llm.length > 0) {
      const wordChars = Array.from(word.hanzi);
      if (
        llm.length === wordChars.length &&
        llm.every((b, i) => b.char === wordChars[i])
      ) {
        return llm.map((b) => b.pinyin).join(' ').trim();
      }
    }
    return word.pinyin ?? '';
  })();

  // ESC = ferme
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  // Le popup ne sort pas du viewport. On clamp X et Y. La hauteur dépend
  // du contenu : on grossit la zone réservée si on a une breakdown ou un
  // exemple, pour que le popup ne soit pas tronqué en bord d'écran.
  const popupWidth = 300;
  const hasBreakdown = displayBreakdown.length > 0;
  const popupHeight =
    170 + (hasBreakdown ? displayBreakdown.length * 22 + 16 : 0) + (example ? 110 : 0);
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
            {displayPinyin && (
              <p className="at2-vocab-popup-pinyin">{displayPinyin}</p>
            )}
          </div>
        </div>
        {/* Traduction du mot composé. Préfère l'enrichment LLM s'il existe
            (sens contextuel). Sinon, traduction lessons/CFDICT. Sinon, rien
            (la breakdown suffit). */}
        {displayTranslation ? (
          <p className="at2-vocab-popup-translation">{displayTranslation}</p>
        ) : displayBreakdown.length === 0 ? (
          <p className="at2-vocab-popup-empty">
            {enriching
              ? language === 'fr' ? 'Recherche du sens…' : 'Looking up meaning…'
              : language === 'fr'
              ? 'Traduction non trouvée dans le dictionnaire.'
              : 'Translation not found in dictionary.'}
          </p>
        ) : null}

        {/* Décomposition caractère-par-caractère : char + pinyin + sens. */}
        {displayBreakdown.length > 0 && (
          <ul className="at2-vocab-popup-breakdown" role="list">
            {displayBreakdown.map((b, idx) => (
              <li key={`${b.char}-${idx}`} className="at2-vocab-popup-breakdown-row">
                <span className="at2-vocab-popup-breakdown-char">{b.char}</span>
                <span className="at2-vocab-popup-breakdown-pinyin">
                  {b.pinyin}
                </span>
                <span className="at2-vocab-popup-breakdown-sense">{b.sense}</span>
              </li>
            ))}
          </ul>
        )}

        {/* Spinner discret quand le LLM affine en arrière-plan une breakdown
            partielle déjà visible. */}
        {enriching && displayBreakdown.length > 0 && !enrichment && (
          <div className="at2-vocab-popup-enriching">
            {language === 'fr' ? 'Affinage du sens…' : 'Refining…'}
          </div>
        )}

        {/* Phrase d'exemple extraite de la conversation, si trouvée.
            La traduction française est soit extraite du contexte (regex),
            soit générée par le LLM (`enrichment.exampleTranslation`). */}
        {example && (
          <div className="at2-vocab-popup-example">
            <div className="at2-vocab-popup-example-label">
              {language === 'fr' ? 'Exemple' : 'Example'}
            </div>
            <p className="at2-vocab-popup-example-hanzi">{example.hanzi}</p>
            {example.pinyin && (
              <p className="at2-vocab-popup-example-pinyin">{example.pinyin}</p>
            )}
            {displayExampleTranslation && (
              <p className="at2-vocab-popup-example-translation">
                {displayExampleTranslation}
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
