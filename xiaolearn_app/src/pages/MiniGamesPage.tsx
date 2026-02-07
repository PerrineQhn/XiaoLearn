import { useState, useMemo } from 'react';
import type { Language } from '../i18n';
import type { LessonItem, LessonExerciseGrammar } from '../types';
import { dataset } from '../data/lessons';
import { lessonExercises } from '../data/lesson-exercises';
import MemoryMatchGame from '../components/games/MemoryMatchGame';
import SpeedQuizGame from '../components/games/SpeedQuizGame';
import FallingCharactersGame from '../components/games/FallingCharactersGame';
import SentenceBuilderGame from '../components/games/SentenceBuilderGame';
import PinyinTypingGame from '../components/games/PinyinTypingGame';

interface MiniGamesPageProps {
  language: Language;
  reviewItems: LessonItem[];
}

type GameType = 'menu' | 'memory' | 'speed-quiz' | 'falling' | 'sentence-builder' | 'pinyin-typing';

interface GameScore {
  game: string;
  score: number;
  timestamp: number;
}

interface GameDefinition {
  id: GameType;
  icon: string;
  name: string;
  description: string;
  minItems: number;
  needExamples?: number;
  needMultiSyllable?: number;
}

const generateSentenceCards = (): LessonItem[] => {
  const cards: LessonItem[] = [];
  try {
    if (!lessonExercises || typeof lessonExercises !== 'object') {
      return cards;
    }
    Object.entries(lessonExercises).forEach(([lessonId, exercises]) => {
      if (!Array.isArray(exercises)) return;
      exercises.forEach((exercise, index) => {
        if (exercise?.type === 'grammar') {
          const grammarExercise = exercise as LessonExerciseGrammar;
          if (grammarExercise?.quiz?.type === 'sentence-reconstruction') {
            const { words, translation, translationEn, pinyin } = grammarExercise.quiz;
            if (!words || !Array.isArray(words) || words.length === 0) return;
            const sentence = words.join('');
            cards.push({
              id: `${lessonId}-sentence-${index}`,
              level: 'hsk1',
              hanzi: sentence,
              pinyin: pinyin || words.join(' '),
              translation: translationEn || translation || '',
              translationFr: translation || translationEn || '',
              category: 'phrase',
              explanation: translation || '',
              examples: [
                {
                  hanzi: sentence,
                  pinyin: pinyin || words.join(' '),
                  translation: translation || ''
                }
              ],
              quiz: {
                prompt: translationEn || translation || '',
                choices: [translationEn || translation || ''],
                correctChoiceIndex: 0
              },
              tags: ['sentence', lessonId],
              theme: 'phrases'
            });
          }
        }
      });
    });
  } catch (error) {
    console.error('Error generating sentence cards:', error);
  }
  return cards;
};

const MiniGamesPage = ({ language, reviewItems = [] }: MiniGamesPageProps) => {
  console.log('🎮 MiniGamesPage render - reviewItems:', reviewItems?.length || 0);

  const [currentGame, setCurrentGame] = useState<GameType>('menu');
  const [scores, setScores] = useState<GameScore[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [lastScore, setLastScore] = useState<number>(0);

  console.log('🎮 Current game state:', currentGame);

  const sentenceCardPool = useMemo(() => {
    try {
      return generateSentenceCards();
    } catch (error) {
      console.error('Error in sentenceCardPool:', error);
      return [];
    }
  }, []);

  const baseItems = useMemo<LessonItem[]>(() => {
    try {
      const minimumPool = dataset.lessons.slice(0, 48);
      const learnedPool = reviewItems.length >= 12 ? reviewItems : minimumPool;
      const merged = [...learnedPool, ...sentenceCardPool, ...minimumPool];
      const uniqueMap = new Map<string, LessonItem>();
      merged.forEach((item) => {
        if (!uniqueMap.has(item.id)) {
          uniqueMap.set(item.id, item);
        }
      });
      const result = Array.from(uniqueMap.values());
      // S'assurer qu'on a toujours au moins 50 items pour les jeux
      return result.length > 0 ? result : dataset.lessons.slice(0, 60);
    } catch (error) {
      console.error('Error in baseItems:', error);
      return dataset.lessons.slice(0, 60);
    }
  }, [reviewItems, sentenceCardPool]);

  const {
    expandedItems,
    exampleSentenceCount,
    multiSyllableCount
  } = useMemo(() => {
    try {
      const clones: LessonItem[] = [];
      let exampleCount = 0;
      let multiCount = 0;

      baseItems.forEach((item) => {
        if (!item) return;
        clones.push(item);
        if (item.pinyin && item.pinyin.trim().includes(' ')) {
          multiCount += 1;
        }

        (item.examples ?? []).forEach((example, index) => {
          if (!example) return;
          exampleCount += 1;
          const examplePinyin = (example as { pinyin?: string }).pinyin ?? item.pinyin;
          if (examplePinyin && examplePinyin.trim().includes(' ')) {
            multiCount += 1;
          }
          clones.push({
            ...item,
            id: `${item.id}-example-${index}`,
            hanzi: example.hanzi,
            pinyin: examplePinyin,
            translation: example.translation,
            translationFr: example.translation,
            examples: [],
            quiz: item.quiz
          });
        });
      });

      return {
        expandedItems: clones,
        exampleSentenceCount: exampleCount,
        multiSyllableCount: multiCount
      };
    } catch (error) {
      console.error('Error in expandedItems:', error);
      return {
        expandedItems: baseItems,
        exampleSentenceCount: 0,
        multiSyllableCount: 0
      };
    }
  }, [baseItems]);

  const playableItems = useMemo(() => {
    const result = expandedItems.length > 0 ? expandedItems : dataset.lessons.slice(0, 60);
    console.log('🎮 MiniGames playableItems:', result.length, 'items');
    console.log('🎮 baseItems:', baseItems.length);
    console.log('🎮 expandedItems:', expandedItems.length);
    return result;
  }, [expandedItems, baseItems]);

  const games: GameDefinition[] = useMemo(() => [
    {
      id: 'memory' as GameType,
      icon: '🧠',
      name: language === 'fr' ? 'Memory' : 'Memory Match',
      description: language === 'fr'
        ? 'Trouve les paires de caractères et traductions'
        : 'Match character pairs with their translations',
      minItems: 6
    },
    {
      id: 'speed-quiz' as GameType,
      icon: '⚡',
      name: language === 'fr' ? 'Quiz Rapide' : 'Speed Quiz',
      description: language === 'fr'
        ? 'Réponds vite aux questions avant la fin du temps'
        : 'Answer questions quickly before time runs out',
      minItems: 4
    },
    {
      id: 'falling' as GameType,
      icon: '🎯',
      name: language === 'fr' ? 'Attrape-Caractères' : 'Character Catcher',
      description: language === 'fr'
        ? 'Attrape les bons caractères qui tombent'
        : 'Catch the correct falling characters',
      minItems: 5
    },
    {
      id: 'sentence-builder' as GameType,
      icon: '🧩',
      name: language === 'fr' ? 'Puzzle Pinyin' : 'Pinyin Puzzle',
      description: language === 'fr'
        ? 'Replace les syllabes pour former la phrase correcte'
        : 'Reorder the syllables to rebuild the sentence',
      minItems: 4,
      needExamples: 3
    },
    {
      id: 'pinyin-typing' as GameType,
      icon: '⌨️',
      name: language === 'fr' ? 'Sprint Pinyin' : 'Pinyin Sprint',
      description: language === 'fr'
        ? 'Tape le pinyin exact à partir des caractères'
        : 'Type the exact pinyin for each character',
      minItems: 4,
      needMultiSyllable: 2
    }
  ], [language]);

  const handleGameComplete = (game: string, score: number) => {
    const newScore: GameScore = {
      game,
      score,
      timestamp: Date.now()
    };
    setScores([...scores, newScore]);
    setLastScore(score);
    setShowResults(true);
  };

  const handleBackToMenu = () => {
    setCurrentGame('menu');
    setShowResults(false);
  };

  // Calculate best scores - MUST be before any conditional returns
  const bestScores = useMemo(() => {
    const result: Record<string, number> = {};
    scores.forEach(({ game, score }) => {
      if (!result[game] || score > result[game]) {
        result[game] = score;
      }
    });
    return result;
  }, [scores]);

  const renderGame = () => {
    console.log('🎮 renderGame called, currentGame:', currentGame, 'showResults:', showResults);
    console.log('🎮 playableItems.length:', playableItems.length);
    console.log('🎮 baseItems.length:', baseItems.length);
    console.log('🎮 playableItems sample:', playableItems.slice(0, 2));

    if (showResults) {
      const currentGameInfo = games.find(g => g.id === currentGame);
      return (
        <div className="game-results">
          <div className="game-results-card">
            <h2 className="game-results-title">
              {language === 'fr' ? '🎉 Partie terminée !' : '🎉 Game Over!'}
            </h2>
            <div className="game-results-score">
              <span className="game-results-label">
                {language === 'fr' ? 'Score' : 'Score'}
              </span>
              <span className="game-results-value">{lastScore}</span>
            </div>
            <div className="game-results-game">
              {currentGameInfo?.icon} {currentGameInfo?.name}
            </div>
            <div className="game-results-actions">
              <button className="btn-primary" onClick={() => setShowResults(false)}>
                {language === 'fr' ? 'Rejouer' : 'Play Again'}
              </button>
              <button className="btn-secondary" onClick={handleBackToMenu}>
                {language === 'fr' ? 'Menu' : 'Menu'}
              </button>
            </div>
          </div>
        </div>
      );
    }

    switch (currentGame) {
      case 'memory':
        console.log('🎮 Rendering MemoryMatchGame with', playableItems.length, 'items');
        return (
          <div className="game-container">
            <button className="game-back-btn" onClick={handleBackToMenu}>
              ← {language === 'fr' ? 'Retour' : 'Back'}
            </button>
            <MemoryMatchGame
              language={language}
              items={playableItems}
              onComplete={(score) => handleGameComplete('memory', score)}
            />
          </div>
        );
      case 'speed-quiz':
        return (
          <div className="game-container">
            <button className="game-back-btn" onClick={handleBackToMenu}>
              ← {language === 'fr' ? 'Retour' : 'Back'}
            </button>
            <SpeedQuizGame
              language={language}
              items={playableItems}
              onComplete={(score) => handleGameComplete('speed-quiz', score)}
            />
          </div>
        );
      case 'falling':
        return (
          <div className="game-container">
            <button className="game-back-btn" onClick={handleBackToMenu}>
              ← {language === 'fr' ? 'Retour' : 'Back'}
            </button>
            <FallingCharactersGame
              language={language}
              items={playableItems}
              onComplete={(score) => handleGameComplete('falling', score)}
            />
          </div>
        );
      case 'sentence-builder':
        return (
          <div className="game-container">
            <button className="game-back-btn" onClick={handleBackToMenu}>
              ← {language === 'fr' ? 'Retour' : 'Back'}
            </button>
            <SentenceBuilderGame
              language={language}
              items={baseItems}
              onComplete={(score) => handleGameComplete('sentence-builder', score)}
            />
          </div>
        );
      case 'pinyin-typing':
        return (
          <div className="game-container">
            <button className="game-back-btn" onClick={handleBackToMenu}>
              ← {language === 'fr' ? 'Retour' : 'Back'}
            </button>
            <PinyinTypingGame
              language={language}
              items={playableItems}
              onComplete={(score) => handleGameComplete('pinyin-typing', score)}
            />
          </div>
        );
      default:
        return null;
    }
  };

  if (currentGame !== 'menu') {
    return <div className="mini-games-page">{renderGame()}</div>;
  }

  console.log('🎮 About to render menu with', games.length, 'games');
  console.log('🎮 playableItems for menu:', playableItems.length);

  return (
    <div className="mini-games-page">
      <header className="mini-games-header">
        <h1 className="page-title">
          {language === 'fr' ? '🎮 Mini-Jeux' : '🎮 Mini-Games'}
        </h1>
        <p className="page-subtitle">
          {language === 'fr'
            ? 'Apprends en t\'amusant avec tes mots à réviser'
            : 'Learn while having fun with your review words'}
        </p>
      </header>

      {false ? (
        <div className="mini-games-empty">
          <p className="empty-message">
            {language === 'fr'
              ? 'Commence à apprendre des mots pour débloquer les mini-jeux !'
              : 'Start learning words to unlock mini-games!'}
          </p>
        </div>
      ) : (
        <>
          <section className="mini-games-stats">
            <h2 className="section-title">
              {language === 'fr' ? 'Tes meilleurs scores' : 'Your best scores'}
            </h2>
            <div className="mini-games-stats-grid">
              {games.map((game) => (
                <div key={game.id} className="mini-game-stat-card">
                  <span className="mini-game-stat-icon">{game.icon}</span>
                  <span className="mini-game-stat-name">{game.name}</span>
                  <span className="mini-game-stat-score">
                    {bestScores[game.id] || '-'}
                  </span>
                </div>
              ))}
            </div>
          </section>

          <section className="mini-games-selection">
            <h2 className="section-title">
              {language === 'fr' ? 'Choisis un jeu' : 'Choose a game'}
            </h2>
            <div className="mini-games-grid">
              {games.map((game) => {
                const requirements: string[] = [];
                // Déblocage à 100% pour tests - décommentez les lignes ci-dessous pour rétablir les restrictions
                /*
                if (playableItems.length < game.minItems) {
                  requirements.push(
                    language === 'fr'
                      ? `${game.minItems} mots minimum requis`
                      : `${game.minItems} words required`
                  );
                }
                if (game.needExamples && exampleSentenceCount < game.needExamples) {
                  requirements.push(
                    language === 'fr'
                      ? `${game.needExamples} phrases d'exemple nécessaires`
                      : `${game.needExamples} sample sentences needed`
                  );
                }
                if (game.needMultiSyllable && multiSyllableCount < game.needMultiSyllable) {
                  requirements.push(
                    language === 'fr'
                      ? `${game.needMultiSyllable} mots multi-syllabes requis`
                      : `${game.needMultiSyllable} multi-syllable words needed`
                  );
                }
                */
                const canPlay = true; // Forcé à true pour tests
                return (
                  <button
                    key={game.id}
                    className={`mini-game-card ${!canPlay ? 'disabled' : ''}`}
                    onClick={() => canPlay && setCurrentGame(game.id)}
                    disabled={!canPlay}
                  >
                    <div className="mini-game-icon">{game.icon}</div>
                    <h3 className="mini-game-name">{game.name}</h3>
                    <p className="mini-game-description">{game.description}</p>
                    {!canPlay && (
                      <p className="mini-game-locked">
                        {requirements.join(' • ')}
                      </p>
                    )}
                  </button>
                );
              })}
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default MiniGamesPage;
