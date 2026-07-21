/**
 * ToneColoredHanzi — rend un mot chinois avec un <span> coloré par
 * caractère selon son ton (schéma Pleco : 1 rouge, 2 vert, 3 bleu,
 * 4 violet, neutre gris). Voir src/utils/toneColors.ts pour la logique
 * de détection (pinyin curé prioritaire, fallback pinyin-pro).
 *
 * - `enabled === false` → hanzi brut (aucun span par caractère).
 * - Les caractères non-hanzi (ponctuation…) gardent la couleur du parent.
 */

import { useMemo } from 'react';
import { TONE_COLORS, isHanChar, tonesForWord, type Tone } from '../utils/toneColors';

export default function ToneColoredHanzi({
  hanzi,
  pinyin,
  enabled = true,
  className
}: {
  hanzi: string;
  pinyin?: string;
  enabled?: boolean;
  className?: string;
}) {
  const segments = useMemo<Array<{ ch: string; tone: Tone | null }> | null>(() => {
    if (!enabled) return null;
    const tones = tonesForWord(hanzi, pinyin);
    return Array.from(hanzi).map((ch, i) => ({
      ch,
      tone: isHanChar(ch) ? tones[i] ?? 5 : null
    }));
  }, [hanzi, pinyin, enabled]);

  if (!segments) {
    return <span className={className}>{hanzi}</span>;
  }

  return (
    <span className={className}>
      {segments.map((s, i) =>
        s.tone == null ? (
          <span key={i}>{s.ch}</span>
        ) : (
          <span key={i} style={{ color: TONE_COLORS[s.tone] }}>
            {s.ch}
          </span>
        )
      )}
    </span>
  );
}
