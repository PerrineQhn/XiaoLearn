import { useState, useEffect } from 'react';
import type { Language } from '../../i18n';
import type { LessonItem } from '../../types';
import { getLessonTranslation } from '../../utils/lesson';

interface MemoryMatchGameProps {
  language: Language;
  items: LessonItem[];
  onComplete: (score: number) => void;
}

interface Card {
  id: string;
  content: string;
  type: 'hanzi' | 'translation';
  itemId: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const MemoryMatchGame = ({ language, items = [], onComplete }: MemoryMatchGameProps) => {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<string[]>([]);
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);
  const [isChecking, setIsChecking] = useState(false);
  const hasEnoughItems = Array.isArray(items) && items.length >= 6;

  useEffect(() => {
    if (!hasEnoughItems) {
      setCards([]);
      return;
    }

    // Deduplicate items by hanzi content to avoid duplicate cards
    const uniqueItemsMap = new Map<string, LessonItem>();
    items.forEach((item) => {
      if (!uniqueItemsMap.has(item.hanzi)) {
        uniqueItemsMap.set(item.hanzi, item);
      }
    });

    // Take 6 random unique items for the game
    const uniqueItems = Array.from(uniqueItemsMap.values());
    const pool = [...uniqueItems].sort(() => Math.random() - 0.5);
    const gameItems = pool.slice(0, 6);

    // Create pairs of cards
    const newCards: Card[] = [];
    gameItems.forEach((item) => {
      newCards.push({
        id: `${item.id}-hanzi`,
        content: item.hanzi,
        type: 'hanzi',
        itemId: item.id,
        isFlipped: false,
        isMatched: false
      });
      newCards.push({
        id: `${item.id}-translation`,
        content: getLessonTranslation(item, language),
        type: 'translation',
        itemId: item.id,
        isFlipped: false,
        isMatched: false
      });
    });

    // Shuffle cards
    setCards(newCards.sort(() => Math.random() - 0.5));
  }, [items, language, hasEnoughItems]);

  const handleCardClick = (cardId: string) => {
    if (!hasEnoughItems) return;
    if (isChecking || flippedCards.length >= 2) return;

    const card = cards.find(c => c.id === cardId);
    if (!card || card.isFlipped || card.isMatched) return;

    const newFlippedCards = [...flippedCards, cardId];
    setFlippedCards(newFlippedCards);

    // Update card flip state
    setCards(cards.map(c =>
      c.id === cardId ? { ...c, isFlipped: true } : c
    ));

    if (newFlippedCards.length === 2) {
      setMoves(moves + 1);
      setIsChecking(true);

      const [firstCardId, secondCardId] = newFlippedCards;
      const firstCard = cards.find(c => c.id === firstCardId);
      const secondCard = cards.find(c => c.id === secondCardId);

      if (firstCard && secondCard && firstCard.itemId === secondCard.itemId) {
        // Match found!
        setTimeout(() => {
          setCards(cards.map(c =>
            c.id === firstCardId || c.id === secondCardId
              ? { ...c, isMatched: true }
              : c
          ));
          setMatches(matches + 1);
          setFlippedCards([]);
          setIsChecking(false);

          // Check if game is complete
          if (matches + 1 === items.slice(0, 6).length) {
            setTimeout(() => {
              onComplete(calculateScore(moves + 1, items.slice(0, 6).length));
            }, 500);
          }
        }, 600);
      } else {
        // No match
        setTimeout(() => {
          setCards(cards.map(c =>
            c.id === firstCardId || c.id === secondCardId
              ? { ...c, isFlipped: false }
              : c
          ));
          setFlippedCards([]);
          setIsChecking(false);
        }, 1000);
      }
    }
  };

  const calculateScore = (totalMoves: number, totalPairs: number) => {
    const perfectMoves = totalPairs;
    const efficiency = Math.max(0, 100 - (totalMoves - perfectMoves) * 5);
    return Math.round(efficiency);
  };

  const resetGame = () => {
    if (!hasEnoughItems) return;
    setFlippedCards([]);
    setMoves(0);
    setMatches(0);
    setIsChecking(false);

    // Deduplicate items by hanzi content to avoid duplicate cards
    const uniqueItemsMap = new Map<string, LessonItem>();
    items.forEach((item) => {
      if (!uniqueItemsMap.has(item.hanzi)) {
        uniqueItemsMap.set(item.hanzi, item);
      }
    });

    // Take 6 random unique items for the game
    const uniqueItems = Array.from(uniqueItemsMap.values());
    const pool = [...uniqueItems].sort(() => Math.random() - 0.5);
    const gameItems = pool.slice(0, 6);

    const newCards: Card[] = [];
    gameItems.forEach((item) => {
      newCards.push({
        id: `${item.id}-hanzi`,
        content: item.hanzi,
        type: 'hanzi',
        itemId: item.id,
        isFlipped: false,
        isMatched: false
      });
      newCards.push({
        id: `${item.id}-translation`,
        content: getLessonTranslation(item, language),
        type: 'translation',
        itemId: item.id,
        isFlipped: false,
        isMatched: false
      });
    });
    setCards(newCards.sort(() => Math.random() - 0.5));
  };

  if (!hasEnoughItems) {
    return (
      <div className="memory-game">
        <div className="memory-game-header">
          <h3 className="memory-game-title">
            {language === 'fr' ? 'Memory' : 'Memory'}
          </h3>
        </div>
        <p className="mini-game-locked">
          {language === 'fr'
            ? 'Ajoutez encore quelques cartes pour jouer au Memory.'
            : 'Add a few more cards to start the Memory game.'}
        </p>
      </div>
    );
  }

  return (
    <div className="memory-game">
      <div className="memory-game-header">
        <h3 className="memory-game-title">
          {language === 'fr' ? 'Memory - Associe les paires' : 'Memory - Match the pairs'}
        </h3>
        <div className="memory-game-stats">
          <span className="memory-stat">
            {language === 'fr' ? 'Coups' : 'Moves'}: <strong>{moves}</strong>
          </span>
          <span className="memory-stat">
            {language === 'fr' ? 'Paires' : 'Pairs'}: <strong>{matches}/6</strong>
          </span>
        </div>
      </div>

      <p className="game-rules">
        {language === 'fr'
          ? '📝 Retourne les cartes pour trouver les paires de caractères chinois et leurs traductions. Trouve toutes les paires en un minimum de coups !'
          : '📝 Flip the cards to find pairs of Chinese characters and their translations. Find all pairs in minimum moves!'}
      </p>

      <div className="memory-cards-grid">
        {cards.map((card) => (
          <button
            key={card.id}
            className={`memory-card ${card.isFlipped || card.isMatched ? 'flipped' : ''} ${
              card.isMatched ? 'matched' : ''
            } ${card.type === 'hanzi' ? 'hanzi-card' : 'translation-card'}`}
            onClick={() => handleCardClick(card.id)}
            disabled={isChecking || card.isMatched}
          >
            <div className="memory-card-inner">
              <div className="memory-card-front">?</div>
              <div className="memory-card-back">{card.content}</div>
            </div>
          </button>
        ))}
      </div>

      <button className="btn-secondary memory-reset-btn" onClick={resetGame}>
        {language === 'fr' ? 'Recommencer' : 'Reset'}
      </button>
    </div>
  );
};

export default MemoryMatchGame;
