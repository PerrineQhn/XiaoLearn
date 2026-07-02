import { useState, useEffect, useRef, useCallback } from 'react';
import type { Language } from '../../i18n';
import type { LessonItem } from '../../types';
import { getLessonTranslation } from '../../utils/lesson';

interface FallingCharactersGameProps {
  language: Language;
  items: LessonItem[];
  onComplete: (score: number) => void;
}

interface FallingChar {
  id: string;
  item: LessonItem;
  x: number;
  y: number;
  speed: number;
}

const GAME_DURATION = 45; // seconds
const SPAWN_INTERVAL = 2000; // milliseconds
const POINTS_PER_CATCH = 15;

const FallingCharactersGame = ({ language, items = [], onComplete }: FallingCharactersGameProps) => {
  const [fallingChars, setFallingChars] = useState<FallingChar[]>([]);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [isGameActive, setIsGameActive] = useState(false);
  const [currentTarget, setCurrentTarget] = useState<LessonItem | null>(null);
  const gameAreaRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number>();
  const lastSpawnRef = useRef<number>(0);
  const hasTargets = Array.isArray(items) && items.length >= 4;

  const generateTarget = useCallback(() => {
    if (!hasTargets) return;
    const randomItem = items[Math.floor(Math.random() * items.length)];
    setCurrentTarget(randomItem);
  }, [items, hasTargets]);

  const spawnCharacter = useCallback(() => {
    if (!gameAreaRef.current || !hasTargets) return;

    const width = gameAreaRef.current.offsetWidth;
    const randomItem = items[Math.floor(Math.random() * items.length)];

    const newChar: FallingChar = {
      id: `${Date.now()}-${Math.random()}`,
      item: randomItem,
      x: Math.random() * (width - 80),
      y: -60,
      speed: 1 + Math.random() * 1.5
    };

    setFallingChars(prev => [...prev, newChar]);
  }, [items]);

  const updateGame = useCallback(() => {
    if (!isGameActive) return;

    const now = Date.now();
    if (now - lastSpawnRef.current > SPAWN_INTERVAL) {
      spawnCharacter();
      lastSpawnRef.current = now;
    }

    setFallingChars(prev => {
      const updated = prev
        .map(char => ({
          ...char,
          y: char.y + char.speed
        }))
        .filter(char => {
          if (char.y > (gameAreaRef.current?.offsetHeight || 600)) {
            // Character fell off screen - lose a life if it was the target
            if (currentTarget && char.item.id === currentTarget.id) {
              setLives(l => Math.max(0, l - 1));
            }
            return false;
          }
          return true;
        });

      return updated;
    });

    animationFrameRef.current = requestAnimationFrame(updateGame);
  }, [isGameActive, spawnCharacter, currentTarget]);

  useEffect(() => {
    if (isGameActive) {
      animationFrameRef.current = requestAnimationFrame(updateGame);
      return () => {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
      };
    }
  }, [isGameActive, updateGame]);

  useEffect(() => {
    if (isGameActive && timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if ((timeLeft === 0 || lives === 0) && isGameActive) {
      setIsGameActive(false);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      onComplete(score);
    }
  }, [timeLeft, lives, isGameActive, score, onComplete]);

  const startGame = () => {
    if (!hasTargets) return;
    setScore(0);
    setLives(3);
    setTimeLeft(GAME_DURATION);
    setFallingChars([]);
    setIsGameActive(true);
    lastSpawnRef.current = Date.now();
    generateTarget();
  };

  const handleCharClick = (charId: string) => {
    if (!hasTargets) return;
    const char = fallingChars.find(c => c.id === charId);
    if (!char || !currentTarget) return;

    if (char.item.id === currentTarget.id) {
      // Correct catch!
      setScore(score + POINTS_PER_CATCH);
      setFallingChars(prev => prev.filter(c => c.id !== charId));
      generateTarget();
    } else {
      // Wrong character
      setLives(Math.max(0, lives - 1));
      setFallingChars(prev => prev.filter(c => c.id !== charId));
    }
  };

  if (!hasTargets) {
    return (
      <div className="falling-game-start">
        <div className="falling-game-intro">
          <h3 className="falling-game-title">
            {language === 'fr' ? '🎯 Attrape les Caractères' : '🎯 Catch the Characters'}
          </h3>
          <p className="falling-game-description">
            {language === 'fr'
              ? 'Ajoutez au moins quelques cartes pour lancer cette activité.'
              : 'Add a few more cards to start this activity.'}
          </p>
        </div>
      </div>
    );
  }

  if (!isGameActive && score === 0 && lives === 3) {
    return (
      <div className="falling-game-start">
        <div className="falling-game-intro">
          <h3 className="falling-game-title">
            {language === 'fr' ? '🎯 Attrape les Caractères' : '🎯 Catch the Characters'}
          </h3>
          <p className="falling-game-description">
            {language === 'fr'
              ? 'Clique sur les caractères corrects avant qu\'ils ne tombent !'
              : 'Click on the correct characters before they fall!'}
          </p>
          <div className="game-rules">
            {language === 'fr'
              ? '📝 Règles : Regarde la traduction en haut de l\'écran et clique rapidement sur le caractère chinois correspondant qui tombe. Attention, si tu cliques sur le mauvais caractère ou si le bon tombe, tu perds une vie ! Tu as 3 vies et 45 secondes.'
              : '📝 Rules: Look at the translation at the top of the screen and quickly click on the corresponding falling Chinese character. Watch out, if you click the wrong character or the correct one falls, you lose a life! You have 3 lives and 45 seconds.'}
          </div>
          <button className="btn-primary falling-game-start-btn" onClick={startGame}>
            {language === 'fr' ? 'Commencer' : 'Start'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="falling-game">
      <div className="falling-game-header">
        <div className="falling-game-target">
          <span className="falling-target-label">
            {language === 'fr' ? 'Cherche :' : 'Find:'}
          </span>
          <span className="falling-target-text">
            {currentTarget ? getLessonTranslation(currentTarget, language) : ''}
          </span>
        </div>
        <div className="falling-game-stats">
          <span className="falling-stat">⏱️ {timeLeft}s</span>
          <span className="falling-stat">❤️ {lives}</span>
          <span className="falling-stat">⭐ {score}</span>
        </div>
      </div>

      <div className="falling-game-area" ref={gameAreaRef}>
        {fallingChars.map(char => (
          <button
            key={char.id}
            className="falling-character"
            style={{
              left: `${char.x}px`,
              top: `${char.y}px`
            }}
            onClick={() => handleCharClick(char.id)}
          >
            {char.item.hanzi}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FallingCharactersGame;
