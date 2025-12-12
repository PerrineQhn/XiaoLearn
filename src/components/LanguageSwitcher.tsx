import type { Language } from '../i18n';

interface LanguageSwitcherProps {
  value: Language;
  onChange: (language: Language) => void;
}

const LanguageSwitcher = ({ value, onChange }: LanguageSwitcherProps) => (
  <div className="language-switcher">
    {(['fr', 'en'] as Language[]).map((lang) => (
      <button
        key={lang}
        type="button"
        className={lang === value ? 'active' : ''}
        onClick={() => onChange(lang)}
      >
        {lang.toUpperCase()}
      </button>
    ))}
  </div>
);

export default LanguageSwitcher;
