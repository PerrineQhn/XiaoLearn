/**
 * ToneColoredHanzi — rend un mot chinois avec chaque caractère coloré selon
 * son ton (schéma Pleco : 1 rouge, 2 vert, 3 bleu, 4 violet, neutre gris).
 * Version React Native (Text imbriqués). Voir utils/toneColors.ts.
 *
 * - `enabled === false` → hanzi brut, hérite du style parent.
 * - Les caractères non-hanzi (ponctuation…) gardent la couleur du parent.
 */
import { useMemo } from 'react';
import { Text, type StyleProp, type TextStyle } from 'react-native';
import { TONE_COLORS, isHanChar, tonesForWord, type Tone } from '@/utils/toneColors';

export default function ToneColoredHanzi({
  hanzi,
  pinyin,
  enabled = true,
  style,
}: {
  hanzi: string;
  pinyin?: string;
  enabled?: boolean;
  style?: StyleProp<TextStyle>;
}) {
  const segments = useMemo<Array<{ ch: string; tone: Tone | null }> | null>(() => {
    if (!enabled) return null;
    const tones = tonesForWord(hanzi, pinyin);
    return Array.from(hanzi).map((ch, i) => ({
      ch,
      tone: isHanChar(ch) ? tones[i] ?? 5 : null,
    }));
  }, [hanzi, pinyin, enabled]);

  if (!segments) {
    return <Text style={style}>{hanzi}</Text>;
  }

  return (
    <Text style={style}>
      {segments.map((s, i) =>
        s.tone == null ? (
          <Text key={i}>{s.ch}</Text>
        ) : (
          <Text key={i} style={{ color: TONE_COLORS[s.tone] }}>
            {s.ch}
          </Text>
        )
      )}
    </Text>
  );
}
