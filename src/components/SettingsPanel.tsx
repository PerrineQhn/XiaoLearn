import type { Language } from '../i18n';
import { getCopy } from '../i18n';
import LanguageSwitcher from './LanguageSwitcher';

interface SettingsPanelProps {
  language: Language;
  onLanguageChange: (language: Language) => void;
  lessonGoal: number;
  reviewGoal: number;
  onLessonGoalChange: (value: number) => void;
  onReviewGoalChange: (value: number) => void;
  copy: ReturnType<typeof getCopy>;
}

const SettingsPanel = ({
  language,
  onLanguageChange,
  lessonGoal,
  reviewGoal,
  onLessonGoalChange,
  onReviewGoalChange,
  copy
}: SettingsPanelProps) => (
  <section className="settings-card">
    <div>
      <p style={{ margin: 0, fontWeight: 600 }}>{copy.settingsTitle}</p>
      <small>{copy.languageLabel}</small>
      <LanguageSwitcher value={language} onChange={onLanguageChange} />
    </div>
    <div className="goal-group">
      <label htmlFor="lessonGoal">{copy.dailyGoal}</label>
      <input
        id="lessonGoal"
        type="range"
        min={1}
        max={10}
        value={lessonGoal}
        onChange={(event) => onLessonGoalChange(Number(event.target.value))}
      />
      <span>{lessonGoal}</span>
    </div>
    <div className="goal-group">
      <label htmlFor="reviewGoal">{copy.reviewGoal}</label>
      <input
        id="reviewGoal"
        type="range"
        min={3}
        max={20}
        value={reviewGoal}
        onChange={(event) => onReviewGoalChange(Number(event.target.value))}
      />
      <span>{reviewGoal}</span>
    </div>
  </section>
);

export default SettingsPanel;
