import { useMemo, useState, type FormEvent } from 'react';
import type { Language } from '../../i18n';
import type { LessonItem } from '../../types';
import { getLessonTranslation } from '../../utils/lesson';

interface PinyinTypingGameProps {
  language: Language;
  items: LessonItem[];
  onComplete: (score: number) => void;
}

const MAX_ROUNDS = 8;
const POINTS_PER_CORRECT = 12;

const normalizePinyin = (value: string) =>
  value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/ü/g, 'u')
    .replace(/[^a-z0-9]/g, '');

const PinyinTypingGame = ({ language, items = [], onComplete }: PinyinTypingGameProps) => {
  const challenges = useMemo(
    () => {
      if (!Array.isArray(items) || items.length === 0) return [];
      return items.slice().sort(() => Math.random() - 0.5).slice(0, Math.min(MAX_ROUNDS, items.length));
    },
    [items]
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);

  const currentItem = challenges[currentIndex];

  if (challenges.length === 0) {
    return (
      <div className="pinyin-typing-empty">
        <p>
          {language === 'fr'
            ? 'Ajoute quelques mots à réviser pour lancer cette course au pinyin.'
            : 'Add a few review words to start this pinyin sprint.'}
        </p>
      </div>
    );
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!currentItem || !answer.trim()) return;

    const expected = normalizePinyin(currentItem.pinyin);
    const given = normalizePinyin(answer);
    const isCorrect = expected === given;

    setFeedback(isCorrect ? 'correct' : 'wrong');
    if (isCorrect) {
      setScore(score + POINTS_PER_CORRECT);
    }
  };

  const goNext = () => {
    if (currentIndex + 1 >= challenges.length) {
      onComplete(score);
    } else {
      setCurrentIndex(currentIndex + 1);
      setAnswer('');
      setFeedback(null);
    }
  };

  return (
    <div className="pinyin-typing-game">
      <div className="pinyin-typing-header">
        <div>
          {language === 'fr' ? 'Mot' : 'Word'} {currentIndex + 1}/{challenges.length}
        </div>
        <div>
          {language === 'fr' ? 'Score' : 'Score'} : {score}
        </div>
      </div>

      <p className="game-rules">
        {language === 'fr'
          ? '📝 Tape le pinyin exact pour chaque caractère chinois. Les tons sont facultatifs - tu peux écrire "ni3hao3" ou simplement "nihao". Chaque bonne réponse te donne 12 points !'
          : '📝 Type the exact pinyin for each Chinese character. Tones are optional - you can write "ni3hao3" or just "nihao". Each correct answer gives you 12 points!'}
      </p>

      <div className="pinyin-typing-card">
        <div className="pinyin-typing-character">{currentItem.hanzi}</div>
        <div className="pinyin-typing-translation">
          {language === 'fr' ? 'Traduction :' : 'Translation:'}
          <span>{getLessonTranslation(currentItem, language)}</span>
        </div>

        <form className="pinyin-typing-form" onSubmit={handleSubmit}>
          <input
            type="text"
            className="pinyin-typing-input"
            placeholder={language === 'fr' ? 'Tape le pinyin (ton facultatif)' : 'Type the pinyin'}
            value={answer}
            onChange={(event) => setAnswer(event.target.value)}
            disabled={feedback === 'correct'}
          />
          <button type="submit" className="btn-primary" disabled={!answer.trim() || feedback === 'correct'}>
            {language === 'fr' ? 'Valider' : 'Check'}
          </button>
        </form>

        {feedback === 'wrong' && (
          <p className="pinyin-typing-feedback error">
            {language === 'fr'
              ? `Réponse attendue : ${currentItem.pinyin}`
              : `Expected: ${currentItem.pinyin}`}
          </p>
        )}
        {feedback === 'correct' && (
          <p className="pinyin-typing-feedback success">
            {language === 'fr' ? 'Super !' : 'Nice!'}
          </p>
        )}
      </div>

      <div className="pinyin-typing-actions">
        <button type="button" className="btn-secondary" onClick={() => {
          setAnswer('');
          setFeedback(null);
        }}>
          {language === 'fr' ? 'Effacer' : 'Clear'}
        </button>
        <button
          type="button"
          className="btn-primary"
          onClick={goNext}
          disabled={feedback === null}
        >
          {currentIndex + 1 >= challenges.length
            ? language === 'fr'
              ? 'Terminer'
              : 'Finish'
            : language === 'fr'
            ? 'Mot suivant'
            : 'Next word'}
        </button>
      </div>
    </div>
  );
};

export default PinyinTypingGame;
