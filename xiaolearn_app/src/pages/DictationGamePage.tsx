import { useState, useMemo, useEffect } from 'react';
import type { Language } from '../i18n';
import type { LevelId } from '../types';
import { getPhrasesByLevel } from '../data/dictation-phrases';
import LevelBadge from '../components/LevelBadge';
import { resolveAudioSrc } from '../utils/audio';

interface DictationGamePageProps {
  language: Language;
  level?: LevelId;
  onBack?: () => void;
}

const DICTATION_LEVELS = ['hsk1', 'hsk2', 'hsk3'] as const;
type DictationLevel = (typeof DICTATION_LEVELS)[number];

const isDictationLevel = (value: LevelId): value is DictationLevel => {
  return DICTATION_LEVELS.includes(value as DictationLevel);
};

export default function DictationGamePage({ language, level = 'hsk1', onBack }: DictationGamePageProps) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [isRevealed, setIsRevealed] = useState(false);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [result, setResult] = useState<'correct' | 'incorrect' | null>(null);
  const normalizedLevel = useMemo<DictationLevel>(() => {
    return isDictationLevel(level) ? level : 'hsk1';
  }, [level]);

  // Sélectionner 10 phrases aléatoires du niveau
  const phrases = useMemo(() => {
    const allPhrases = getPhrasesByLevel(normalizedLevel);
    const shuffled = [...allPhrases].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 10);
  }, [normalizedLevel]);

  const currentPhrase = phrases[currentWordIndex];

  const playAudio = () => {
    if (!currentPhrase || audioPlaying) return;

    const audio = new Audio(resolveAudioSrc(currentPhrase.audio));
    setAudioPlaying(true);

    audio.play().catch(err => {
      console.error('Error playing audio:', err);
      setAudioPlaying(false);
    });

    audio.onended = () => {
      setAudioPlaying(false);
    };
  };

  useEffect(() => {
    if (gameStarted && currentPhrase) {
      // Jouer automatiquement l'audio quand une nouvelle phrase apparaît
      setTimeout(() => {
        playAudio();
      }, 500);
    }
  }, [currentWordIndex, gameStarted]);

  const startSession = () => {
    setCurrentWordIndex(0);
    setUserInput('');
    setIsRevealed(false);
    setScore(0);
    setAttempts(0);
    setResult(null);
    setGameCompleted(false);
    setGameStarted(true);
  };

  const advanceToNext = () => {
    if (currentWordIndex < phrases.length - 1) {
      setCurrentWordIndex((prev) => prev + 1);
      setUserInput('');
      setIsRevealed(false);
      setResult(null);
    } else {
      setGameCompleted(true);
    }
  };

  const handleSubmit = () => {
    if (!userInput.trim() || !currentPhrase) return;

    setAttempts(prev => prev + 1);

    // Vérifier si la réponse est correcte (comparer pinyin ou hanzi)
    const normalizedInput = userInput.trim().toLowerCase();
    const isCorrect =
      normalizedInput === currentPhrase.hanzi ||
      normalizedInput === currentPhrase.pinyin.toLowerCase();

    if (isCorrect) {
      setScore(prev => prev + 1);
      setResult('correct');
    } else {
      setResult('incorrect');
    }
    setIsRevealed(true);
  };

  const handleSkip = () => {
    setAttempts(prev => prev + 1);
    setResult(null);
    setIsRevealed(true);
  };

  const handleRestart = () => {
    startSession();
  };

  const handleReturnToMenu = () => {
    setGameStarted(false);
    setGameCompleted(false);
    setIsRevealed(false);
    setResult(null);
    setUserInput('');
    setCurrentWordIndex(0);
    setScore(0);
    setAttempts(0);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isRevealed) {
      handleSubmit();
    }
  };

  const percentage = attempts > 0 ? Math.round((score / attempts) * 100) : 0;
  const isLastPhrase = currentWordIndex === phrases.length - 1;

  if (!gameStarted) {
    return (
      <div className="dictation-game">
        <div className="game-intro enhanced">
          <div className="game-intro-header">
            <div>
              <h1 className="game-title">
                {language === 'fr' ? '🎧 Atelier dictée' : '🎧 Dictation Studio'}
              </h1>
              <p className="game-subtitle">
                {language === 'fr'
                  ? `Entraînez votre oreille et votre écriture`
                  : `Train listening & writing`}
              </p>
              <LevelBadge level={normalizedLevel} />
            </div>
            {onBack && (
              <button type="button" className="btn-secondary" onClick={onBack}>
                ← {language === 'fr' ? 'Retour' : 'Back'}
              </button>
            )}
          </div>

          <div className="dictation-overview">
            <div>
              <h3>{language === 'fr' ? 'Objectif du jour' : 'Today’s target'}</h3>
              <p>
                {language === 'fr'
                  ? '10 phrases authentiques à écouter et retranscrire'
                  : '10 authentic sentences to listen and transcribe'}
              </p>
            </div>
            <div className="pill">{phrases.length} {language === 'fr' ? 'phrases' : 'sentences'}</div>
          </div>

          <div className="game-rules enhanced">
            <h3>{language === 'fr' ? 'Comment jouer' : 'How it works'}</h3>
            <ul>
              <li>{language === 'fr' ? '1. Cliquez sur ▶️ pour écouter la phrase enregistrée' : '1. Tap ▶️ to listen to the recorded sentence'}</li>
              <li>{language === 'fr' ? '2. Écrivez en caractères chinois ou en pinyin' : '2. Type in hanzi or pinyin'}</li>
              <li>{language === 'fr' ? '3. Vérifiez puis passez à la phrase suivante' : '3. Check the answer and move on'}</li>
              <li>{language === 'fr' ? '4. Score final affiché après 10 questions' : '4. Final score after 10 prompts'}</li>
            </ul>
          </div>

          <button className="start-game-btn" onClick={startSession}>
            {language === 'fr' ? 'Commencer' : 'Start'} →
          </button>
        </div>
      </div>
    );
  }

  if (gameCompleted) {
    return (
      <div className="dictation-game">
        <div className="game-results">
          <h1 className="results-title">
            {language === 'fr' ? '🎊 Partie terminée !' : '🎊 Game Over!'}
          </h1>

          <div className="results-score">
            <div className="score-circle">
              <div className="score-percentage">{percentage}%</div>
            </div>
            <p className="score-text">
              {score} / {attempts} {language === 'fr' ? 'bonnes réponses' : 'correct answers'}
            </p>
          </div>

          <div className="results-message">
            {percentage >= 80 ? (
              <p className="message-excellent">
                {language === 'fr' ? '🌟 Excellent ! Vous maîtrisez très bien !' : '🌟 Excellent! You master it very well!'}
              </p>
            ) : percentage >= 60 ? (
              <p className="message-good">
                {language === 'fr' ? '👍 Bon travail ! Continuez à vous entraîner.' : '👍 Good job! Keep practicing.'}
              </p>
            ) : (
              <p className="message-practice">
                {language === 'fr' ? '💪 Continuez à pratiquer, vous allez progresser !' : '💪 Keep practicing, you will improve!'}
              </p>
            )}
          </div>

          <div className="results-actions">
            <button className="btn-secondary" onClick={handleReturnToMenu}>
              {language === 'fr' ? 'Menu' : 'Menu'}
            </button>
            <button className="btn-primary" onClick={handleRestart}>
              {language === 'fr' ? 'Rejouer' : 'Play Again'} →
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="dictation-game">
      <div className="game-header">
        <div className="game-progress">
          <span className="progress-text">
            {currentWordIndex + 1} / {phrases.length}
          </span>
          <div className="progress-bar-bg">
            <div
              className="progress-bar-fg"
              style={{ width: `${((currentWordIndex + 1) / phrases.length) * 100}%` }}
            />
          </div>
        </div>
        <div className="game-score">
          <span>
            {language === 'fr' ? 'Score' : 'Score'}: {score}/{attempts}
          </span>
          {currentPhrase && <LevelBadge level={currentPhrase.level} />}
        </div>
      </div>

      <div className="game-content">
        <button
          className="audio-play-btn"
          onClick={playAudio}
          disabled={audioPlaying}
        >
          <svg width="64" height="64" viewBox="0 0 24 24" fill="currentColor">
            {audioPlaying ? (
              <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
            ) : (
              <path d="M8 5v14l11-7z"/>
            )}
          </svg>
          <span className="play-hint">
            {audioPlaying
              ? (language === 'fr' ? 'Lecture...' : 'Playing...')
              : (language === 'fr' ? 'Cliquez pour écouter' : 'Click to listen')}
          </span>
        </button>

        {!isRevealed ? (
          <div className="input-section">
            <input
              type="text"
              className="dictation-input"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={language === 'fr' ? 'Écrivez ce que vous entendez...' : 'Write what you hear...'}
              autoFocus
            />
            <div className="input-actions">
              <button className="btn-secondary" onClick={handleSkip}>
                {language === 'fr' ? 'Passer' : 'Skip'}
              </button>
              <button
                className="btn-primary"
                onClick={handleSubmit}
                disabled={!userInput.trim()}
              >
                {language === 'fr' ? 'Valider' : 'Submit'}
              </button>
            </div>
          </div>
        ) : (
          <div className="answer-reveal">
            <div
              className={`reveal-card ${
                result === 'correct'
                  ? 'correct'
                  : result === 'incorrect'
                  ? 'incorrect'
                  : ''
              }`}
            >
              <div className="reveal-header">
                <div className="reveal-hanzi">{currentPhrase.hanzi}</div>
                <LevelBadge level={currentPhrase.level} />
              </div>
              <div className="reveal-pinyin">{currentPhrase.pinyin}</div>
              <div className="reveal-translation">
                {language === 'fr' ? currentPhrase.translationFr : currentPhrase.translation}
              </div>
              {userInput.trim() && (
                <div className="your-answer">
                  {language === 'fr' ? 'Votre réponse' : 'Your answer'}: <strong>{userInput}</strong>
                </div>
              )}
            </div>
            <div className="reveal-actions">
              {result === 'incorrect' && (
                <button
                  className="btn-secondary"
                  onClick={() => {
                    setIsRevealed(false);
                    setResult(null);
                  }}
                >
                  {language === 'fr' ? 'Réessayer' : 'Try again'}
                </button>
              )}
              <button
                className="btn-primary"
                onClick={() => {
                  if (isLastPhrase) {
                    setGameCompleted(true);
                  } else {
                    advanceToNext();
                  }
                }}
              >
                {isLastPhrase
                  ? language === 'fr'
                    ? 'Terminer'
                    : 'Finish'
                  : language === 'fr'
                  ? 'Phrase suivante'
                  : 'Next phrase'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
