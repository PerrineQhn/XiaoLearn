import type { Language } from '../i18n';
import type { GrammarExplanation } from '../types';
import './GrammarExplanationCard.css';

interface GrammarExplanationCardProps {
  explanation: GrammarExplanation;
  language: Language;
}

export default function GrammarExplanationCard({ explanation, language }: GrammarExplanationCardProps) {
  return (
    <div className="grammar-explanation-card">
      <div className="explanation-section when-to-use">
        <div className="section-header">
          <span className="section-icon">📌</span>
          <h3>{language === 'fr' ? 'Quand l\'utiliser' : 'When to use'}</h3>
        </div>
        <div className="section-content">
          {(language === 'fr' ? explanation.whenToUse : explanation.whenToUseEn)
            .split('\n')
            .map((line, index) => (
              <p key={index}>{line}</p>
            ))}
        </div>
      </div>

      <div className="explanation-section how-to-use">
        <div className="section-header">
          <span className="section-icon">✏️</span>
          <h3>{language === 'fr' ? 'Comment l\'utiliser' : 'How to use'}</h3>
        </div>
        <div className="section-content">
          {(language === 'fr' ? explanation.howToUse : explanation.howToUseEn)
            .split('\n')
            .map((line, index) => (
              <p key={index}>{line}</p>
            ))}
        </div>
      </div>

      {explanation.commonMistakes && (
        <div className="explanation-section common-mistakes">
          <div className="section-header">
            <span className="section-icon">⚠️</span>
            <h3>{language === 'fr' ? 'Erreurs courantes' : 'Common mistakes'}</h3>
          </div>
          <div className="section-content mistakes-content">
            {(language === 'fr' ? explanation.commonMistakes : explanation.commonMistakesEn || explanation.commonMistakes)
              .split('\n')
              .map((line, index) => (
                <p key={index}>{line}</p>
              ))}
          </div>
        </div>
      )}

      {explanation.tips && (
        <div className="explanation-section tips">
          <div className="section-header">
            <span className="section-icon">💡</span>
            <h3>{language === 'fr' ? 'Astuces' : 'Tips'}</h3>
          </div>
          <div className="section-content tips-content">
            {(language === 'fr' ? explanation.tips : explanation.tipsEn || explanation.tips)
              .split('\n')
              .map((line, index) => (
                <p key={index}>{line}</p>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
