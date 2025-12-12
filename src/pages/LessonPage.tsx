import type { LessonItem } from '../types';
import type { Language } from '../i18n';
import { getCopy } from '../i18n';
import AudioButton from '../components/AudioButton';
import { getLessonTranslation } from '../utils/lesson';

interface LessonPageProps {
  lesson: LessonItem;
  progress: number;
  onNext: () => void;
  onPrevious: () => void;
  language: Language;
  copy: ReturnType<typeof getCopy>;
}

const LessonPage = ({ lesson, progress, onNext, onPrevious, language, copy }: LessonPageProps) => (
  <div className="card lesson-page">
    <p className="muted">
      {copy.lessonsTitle} · {progress}%
    </p>
    <h2 className="lesson-hanzi-main">{lesson.hanzi}</h2>
    <p className="lesson-pinyin">{lesson.pinyin}</p>
    <p className="lesson-translation-main">{getLessonTranslation(lesson, language)}</p>
    {lesson.explanation && <p style={{ color: '#475569' }}>{lesson.explanation}</p>}
    <div style={{ marginTop: '0.5rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
      {lesson.audioLetter && (
        <AudioButton src={`/${lesson.audioLetter}`} label={lesson.hanzi} />
      )}
      {lesson.audio && lesson.audio !== lesson.audioLetter && (
        <AudioButton src={`/${lesson.audio}`} label={copy.audio} />
      )}
    </div>
    <div className="lesson-nav">
      <button type="button" onClick={onPrevious}>
        ⬅️ {copy.previous}
      </button>
      <button type="button" onClick={onNext}>
        {copy.next} ➡️
      </button>
    </div>
    {lesson.examples.length > 0 && (
      <div className="lesson-examples">
        <h3>{copy.example}</h3>
        {lesson.examples.map((example) => (
          <div key={example.hanzi} className="example-card">
            <div className="example-text">
              <strong>{example.hanzi}</strong>
              <p>{example.pinyin}</p>
              <p>{example.translation}</p>
            </div>
            {example.audio && (
              <AudioButton src={`/${example.audio}`} label={copy.audio} />
            )}
          </div>
        ))}
      </div>
    )}
  </div>
);

export default LessonPage;
