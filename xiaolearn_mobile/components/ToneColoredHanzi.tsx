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
  bold,
  boldStyle,
}: {
  hanzi: string;
  pinyin?: string;
  enabled?: boolean;
  style?: StyleProp<TextStyle>;
  /**
   * Indices des caractères à mettre en évidence — le point de grammaire
   * illustré par la phrase, par exemple. L'emphase s'ajoute à la couleur de
   * ton au lieu de la remplacer : les deux informations sont utiles en même
   * temps.
   */
  bold?: Set<number>;
  /** Style de l'emphase. Par défaut : gras. */
  boldStyle?: StyleProp<TextStyle>;
}) {
  const segments = useMemo<Array<{ ch: string; tone: Tone | null }> | null>(() => {
    if (!enabled) return null;
    const tones = tonesForWord(hanzi, pinyin);
    return Array.from(hanzi).map((ch, i) => ({
      ch,
      tone: isHanChar(ch) ? tones[i] ?? 5 : null,
    }));
  }, [hanzi, pinyin, enabled]);

  const emph = (i: number) => (bold?.has(i) ? (boldStyle ?? DEFAULT_BOLD) : null);

  // Sans couleurs de tons, l'emphase reste due : c'est une information
  // pédagogique, pas une décoration.
  if (!segments) {
    if (!bold?.size) return <Text style={style}>{hanzi}</Text>;
    return (
      <Text style={style}>
        {Array.from(hanzi).map((ch, i) => (
          <Text key={i} style={emph(i)}>{ch}</Text>
        ))}
      </Text>
    );
  }

  return (
    <Text style={style}>
      {segments.map((s, i) =>
        s.tone == null ? (
          <Text key={i} style={emph(i)}>{s.ch}</Text>
        ) : (
          <Text key={i} style={[{ color: TONE_COLORS[s.tone] }, emph(i)]}>
            {s.ch}
          </Text>
        )
      )}
    </Text>
  );
}

const DEFAULT_BOLD: TextStyle = { fontWeight: '800' };
