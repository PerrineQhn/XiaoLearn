/**
 * ErrorCorrectionCard — affichage visuel d'une correction
 * --------------------------------------------------------
 * Carte qui montre :
 *   - Catégorie + sévérité (en haut, pills colorées)
 *   - Le wrongText barré en pill rouge
 *   - La version correcte en pill verte
 *   - Pinyin + traduction si disponibles
 *   - Explication courte
 *   - Boutons : 🔊 Écouter (TTS hanzi) + 🔁 Réessayer (callback)
 */

import { getCategoryMeta, type ErrorEntry, type ErrorSeverity } from '../types/error-journal';
import { playHanziAudio } from '../utils/audio';

interface Props {
  entry: ErrorEntry;
  /** Callback pour le bouton "Réessayer" (Simulateur). Si absent, bouton caché. */
  onRetry?: (corrected: string) => void;
  /** Mode compact pour la sidebar conversations / cartes en grid. */
  compact?: boolean;
}

const SEVERITY_LABEL: Record<ErrorSeverity, string> = {
  mineure: 'Mineure',
  importante: 'Importante',
  critique: 'Critique'
};

const SEVERITY_COLOR: Record<ErrorSeverity, { bg: string; fg: string }> = {
  mineure: { bg: '#e0f0e6', fg: '#2a7a4e' },
  importante: { bg: '#fdecd4', fg: '#c97a1f' },
  critique: { bg: '#fde7e5', fg: '#b8264b' }
};

const ErrorCorrectionCard = ({ entry, onRetry, compact = false }: Props) => {
  const meta = getCategoryMeta(entry.category);
  const sev = SEVERITY_COLOR[entry.severity];

  const handleListen = () => {
    // 1) Extrait UNIQUEMENT les runs de hanzi de correctText (skip pinyin,
    //    ponctuation et descriptions FR/EN qui peuvent y avoir leaké). Sans
    //    ce nettoyage, le hash de lookup audio/examples/<hash>.mp3 ne matchait
    //    rien (texte avec espaces/parenthèses).
    const hanziRuns = (entry.correctText || '').match(/[㐀-鿿]+/g);
    if (!hanziRuns || hanziRuns.length === 0) {
      console.warn('[ErrorCorrectionCard] Aucun hanzi à lire dans', entry.correctText);
      return;
    }
    const phrase = hanziRuns.join('');
    // 2) playHanziAudio renvoie une Promise → on doit chaîner .catch() pour
    //    attraper les rejets (audio file 404). try/catch sync n'attrapait rien.
    playHanziAudio(phrase).catch((err) => {
      console.warn('[ErrorCorrectionCard] Audio non trouvé pour', phrase, err);
    });
  };

  return (
    <div
      className={`xl-ecc ${compact ? 'is-compact' : ''}`}
      style={{
        background: '#ffffff',
        border: '1px solid #ece4d5',
        borderRadius: 12,
        padding: compact ? '10px 12px' : '14px 16px',
        marginTop: compact ? 8 : 12,
        display: 'flex',
        flexDirection: 'column',
        gap: 8
      }}
    >
      {/* Ligne du haut : catégorie + sévérité */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 4,
            padding: '2px 8px',
            background: meta.bgColor,
            color: meta.fgColor,
            borderRadius: 999,
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: '0.02em'
          }}
        >
          <span aria-hidden="true">{meta.emoji}</span>
          {meta.label.toUpperCase()}
        </span>
        <span
          style={{
            padding: '2px 8px',
            background: sev.bg,
            color: sev.fg,
            borderRadius: 999,
            fontSize: 11,
            fontWeight: 700
          }}
        >
          • {SEVERITY_LABEL[entry.severity]}
        </span>
      </div>

      {/* Pills wrong / correct */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
          <span style={{ color: '#b8264b', fontSize: 13 }} aria-hidden="true">✗</span>
          <span
            style={{
              padding: '4px 10px',
              background: '#fde7e5',
              color: '#8b1f1c',
              borderRadius: 6,
              textDecoration: 'line-through',
              fontFamily: 'var(--font-serif, inherit)',
              fontSize: compact ? 14 : 15,
              fontWeight: 600
            }}
          >
            {entry.wrongText}
          </span>
        </div>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
          <span style={{ color: '#2a7a4e', fontSize: 13 }} aria-hidden="true">✓</span>
          <span
            style={{
              padding: '4px 10px',
              background: '#e0f0e6',
              color: '#1b5e3e',
              borderRadius: 6,
              fontFamily: 'var(--font-serif, inherit)',
              fontSize: compact ? 14 : 15,
              fontWeight: 600
            }}
          >
            {entry.correctText}
          </span>
          {entry.correctPinyin && (
            <span style={{ fontStyle: 'italic', color: '#5e6075', fontSize: 12.5 }}>
              {entry.correctPinyin}
            </span>
          )}
        </div>
      </div>

      {/* Traduction si dispo */}
      {entry.correctTranslationFr && !compact && (
        <p style={{ margin: 0, fontSize: 12.5, color: '#5e6075' }}>
          <em>{entry.correctTranslationFr}</em>
        </p>
      )}

      {/* Explication */}
      <p
        style={{
          margin: 0,
          fontSize: compact ? 12 : 13,
          lineHeight: 1.5,
          color: '#1f2937',
          display: 'flex',
          alignItems: 'flex-start',
          gap: 6
        }}
      >
        <span aria-hidden="true" style={{ flexShrink: 0 }}>💬</span>
        <span>{entry.explanation}</span>
      </p>

      {/* Boutons d'action */}
      <div style={{ display: 'inline-flex', gap: 12, marginTop: 4, fontSize: 12.5 }}>
        {onRetry && (
          <button
            type="button"
            onClick={() => onRetry(entry.correctText)}
            style={{
              border: 'none',
              background: 'transparent',
              color: '#c6302c',
              fontFamily: 'inherit',
              fontWeight: 600,
              cursor: 'pointer',
              padding: 0,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 4
            }}
          >
            <span aria-hidden="true">↻</span> Réessayer
          </button>
        )}
        <button
          type="button"
          onClick={handleListen}
          style={{
            border: 'none',
            background: 'transparent',
            color: '#5e6075',
            fontFamily: 'inherit',
            fontWeight: 500,
            cursor: 'pointer',
            padding: 0,
            display: 'inline-flex',
            alignItems: 'center',
            gap: 4
          }}
        >
          <span aria-hidden="true">🔊</span> Écouter
        </button>
      </div>
    </div>
  );
};

export default ErrorCorrectionCard;
