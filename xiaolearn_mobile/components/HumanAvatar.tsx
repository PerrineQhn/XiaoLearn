/**
 * HumanAvatar — l'avatar de l'utilisateur.
 *
 * Le personnage choisi est illustré au palier atteint : la tenue suit le
 * niveau CECR, du t-shirt nu au niveau 1 à la toge de diplômé au niveau 10.
 * Sans choix (ou avec un identifiant hérité de l'ancien catalogue figé), on
 * retombe sur une pastille neutre plutôt que de deviner un personnage.
 */
import { View, StyleSheet, Image, type ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import { avatarStageSource } from '@/data/avatarEvolution';

export function HumanAvatar({
  avatarId, stage = 1, size = 96, colors, style, round = false,
}: {
  avatarId: string | null | undefined;
  /** Palier 1 → 10. Par défaut le premier, pour les aperçus neutres. */
  stage?: number;
  size?: number;
  colors: typeof Colors.light;
  style?: ViewStyle;
  round?: boolean;
}) {
  const src = avatarStageSource(avatarId, stage);

  const shape: ViewStyle = {
    width: size,
    height: size,
    borderRadius: round ? size / 2 : Math.round(size * 0.18),
    overflow: 'hidden',
  };

  if (!src) {
    return (
      <View style={[shape, s.fallback, { backgroundColor: colors.cardBgAlt }, style]}>
        <Ionicons name="person" size={size * 0.45} color={colors.textTertiary} />
      </View>
    );
  }

  return (
    <View style={[shape, style]}>
      <Image source={src} style={{ width: size, height: size }} resizeMode="cover" />
    </View>
  );
}

const s = StyleSheet.create({
  fallback: { alignItems: 'center', justifyContent: 'center' },
});
