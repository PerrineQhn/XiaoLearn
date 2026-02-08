import type { Language } from '../i18n';
import type { GrammarExplanation } from '../types';
import './GrammarExplanationCard.css';

interface GrammarExplanationCardProps {
  explanation: GrammarExplanation;
  language: Language;
}

function renderSectionContent(text: string) {
  const blocks: JSX.Element[] = [];
  let listItems: string[] = [];
  let keyCounter = 0;

  const flushList = () => {
    if (listItems.length === 0) return;

    blocks.push(
      <ul key={`list-${keyCounter++}`} className="section-list">
        {listItems.map((item, index) => (
          <li key={`item-${index}`}>{item}</li>
        ))}
      </ul>,
    );
    listItems = [];
  };

  for (const rawLine of text.split('\n')) {
    const line = rawLine.trim();

    if (!line) {
      flushList();
      continue;
    }

    if (line.startsWith('• ') || line.startsWith('- ')) {
      listItems.push(line.slice(2).trim());
      continue;
    }

    flushList();
    blocks.push(<p key={`p-${keyCounter++}`}>{line}</p>);
  }

  flushList();
  return blocks;
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
          {renderSectionContent(language === 'fr' ? explanation.whenToUse : explanation.whenToUseEn)}
        </div>
      </div>

      <div className="explanation-section how-to-use">
        <div className="section-header">
          <span className="section-icon">✏️</span>
          <h3>{language === 'fr' ? 'Comment l\'utiliser' : 'How to use'}</h3>
        </div>
        <div className="section-content">
          {renderSectionContent(language === 'fr' ? explanation.howToUse : explanation.howToUseEn)}
        </div>
      </div>

      {explanation.commonMistakes && (
        <div className="explanation-section common-mistakes">
          <div className="section-header">
            <span className="section-icon">⚠️</span>
            <h3>{language === 'fr' ? 'Erreurs courantes' : 'Common mistakes'}</h3>
          </div>
          <div className="section-content mistakes-content">
            {renderSectionContent(language === 'fr' ? explanation.commonMistakes : explanation.commonMistakesEn || explanation.commonMistakes)}
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
            {renderSectionContent(language === 'fr' ? explanation.tips : explanation.tipsEn || explanation.tips)}
          </div>
        </div>
      )}
    </div>
  );
}
