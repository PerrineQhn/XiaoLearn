import { useMemo, useState } from 'react';
import type { Language } from '../../i18n';
import type { LessonItem } from '../../types';

interface SentenceBuilderGameProps {
  language: Language;
  items: LessonItem[];
  onComplete: (score: number) => void;
}

interface SentenceChallenge {
  id: string;
  hanzi: string;
  translation: string;
  tokens: string[];
  shuffled: { id: number; text: string }[];
}

const MAX_CHALLENGES = 5;
const POINTS_PER_SENTENCE = 25;

const splitPinyinTokens = (value: string) =>
  value
    .trim()
    .split(/\s+/)
    .filter(Boolean);

const SentenceBuilderGame = ({ language, items = [], onComplete }: SentenceBuilderGameProps) => {
  const challenges = useMemo<SentenceChallenge[]>(() => {
    if (!Array.isArray(items) || items.length === 0) return [];
    const candidates: SentenceChallenge[] = [];
    items.forEach((item) => {
      if (!item.examples) return;
      item.examples.forEach((example, index) => {
        const tokens = splitPinyinTokens(example.pinyin || item.pinyin || '');
        if (tokens.length >= 3) {
          const shuffled = tokens
            .map((text, tokenIndex) => ({ id: tokenIndex, text }))
            .sort(() => Math.random() - 0.5);
          candidates.push({
            id: `${item.id}-${index}`,
            hanzi: example.hanzi,
            translation: example.translation,
            tokens,
            shuffled
          });
        }
      });
    });
    return candidates.sort(() => Math.random() - 0.5).slice(0, MAX_CHALLENGES);
  }, [items]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOrder, setSelectedOrder] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);

  if (challenges.length === 0) {
    return (
      <div className="sentence-builder-empty">
        <p>
          {language === 'fr'
            ? 'Ajoute quelques phrases d\'exemple pour jouer à ce puzzle.'
            : 'Add a few sample sentences to unlock this puzzle.'}
        </p>
      </div>
    );
  }

  const currentChallenge = challenges[currentIndex];

  const handleSelectToken = (tokenId: number) => {
    if (!currentChallenge || selectedOrder.includes(tokenId) || feedback === 'correct') {
      return;
    }
    setSelectedOrder([...selectedOrder, tokenId]);
  };

  const handleRemoveSelected = (position: number) => {
    if (feedback === 'correct') return;
    setSelectedOrder(selectedOrder.filter((_, index) => index !== position));
  };

  const resetSelection = () => {
    setSelectedOrder([]);
    setFeedback(null);
  };

  const validateSentence = () => {
    if (!currentChallenge || selectedOrder.length !== currentChallenge.tokens.length) return;
    const isCorrect = selectedOrder.every((tokenId, index) => tokenId === index);
    setFeedback(isCorrect ? 'correct' : 'wrong');
    if (isCorrect) {
      setScore(score + POINTS_PER_SENTENCE);
    }
  };

  const moveToNext = () => {
    if (currentIndex + 1 >= challenges.length) {
      onComplete(score);
    } else {
      setCurrentIndex(currentIndex + 1);
      setSelectedOrder([]);
      setFeedback(null);
    }
  };

  return (
    <div className="sentence-builder-game">
      <div className="sentence-builder-header">
        <div className="sentence-builder-progress">
          {language === 'fr' ? 'Progression' : 'Progress'} : {currentIndex + 1}/{challenges.length}
        </div>
        <div className="sentence-builder-score">
          {language === 'fr' ? 'Score' : 'Score'} : {score}
        </div>
      </div>

      <p className="game-rules">
        {language === 'fr'
          ? '📝 Replace les syllabes pinyin dans le bon ordre pour reconstituer la phrase. Clique sur les blocs pour les ajouter, puis valide ta réponse !'
          : '📝 Reorder the pinyin syllables to rebuild the sentence. Click blocks to add them, then validate your answer!'}
      </p>

      <div className="sentence-builder-card">
        <p className="sentence-builder-translation">
          {language === 'fr' ? 'Traduction :' : 'Translation:'}
          <span>{language === 'fr' ? currentChallenge.translation : currentChallenge.translation}</span>
        </p>
        <p className="sentence-builder-hanzi">{currentChallenge.hanzi}</p>

        <div className="sentence-builder-selected">
          {selectedOrder.length === 0 && (
            <span className="sentence-builder-placeholder">
              {language === 'fr'
                ? 'Clique sur les blocs pour reconstruire la phrase'
                : 'Tap the blocks to rebuild the sentence'}
            </span>
          )}
          {selectedOrder.map((tokenId, index) => (
            <button
              key={`${tokenId}-${index}`}
              type="button"
              className="sentence-builder-selected-token"
              onClick={() => handleRemoveSelected(index)}
            >
              {currentChallenge.tokens[tokenId]}
            </button>
          ))}
        </div>

        <div className="sentence-builder-options">
          {currentChallenge.shuffled.map((token) => (
            <button
              key={token.id}
              type="button"
              className={`sentence-token ${selectedOrder.includes(token.id) ? 'selected' : ''}`}
              onClick={() => handleSelectToken(token.id)}
              disabled={selectedOrder.includes(token.id) || feedback === 'correct'}
            >
              {token.text}
            </button>
          ))}
        </div>
      </div>

      <div className="sentence-builder-actions">
        <button
          type="button"
          className="btn-secondary"
          onClick={resetSelection}
          disabled={selectedOrder.length === 0}
        >
          {language === 'fr' ? 'Réinitialiser' : 'Reset'}
        </button>
        <button
          type="button"
          className="btn-primary"
          onClick={feedback === 'correct' ? moveToNext : validateSentence}
          disabled={selectedOrder.length !== currentChallenge.tokens.length && feedback !== 'correct'}
        >
          {feedback === 'correct'
            ? currentIndex + 1 === challenges.length
              ? language === 'fr'
                ? 'Voir le score'
                : 'Finish'
              : language === 'fr'
              ? 'Phrase suivante'
              : 'Next sentence'
            : language === 'fr'
            ? 'Valider'
            : 'Validate'}
        </button>
      </div>

      {feedback === 'wrong' && (
        <div className="sentence-builder-feedback error">
          {language === 'fr'
            ? 'Ce n\'est pas encore ça, réessaie !'
            : 'Not quite right, try again!'}
        </div>
      )}
      {feedback === 'correct' && (
        <div className="sentence-builder-feedback success">
          {language === 'fr'
            ? 'Bravo ! Continue sur ta lancée.'
            : 'Great! Keep going.'}
        </div>
      )}
    </div>
  );
};

export default SentenceBuilderGame;
