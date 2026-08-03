/**
 * BrandGradient — dégradé corail de marque XiaoLearn.
 * Basé sur primaryRed (#E05040) : corail clair → corail profond, en diagonale.
 * À utiliser pour les blocs/boutons rouges principaux (priorité, CTA, premium).
 */
import { LinearGradient } from 'expo-linear-gradient';
import type { ViewStyle, StyleProp } from 'react-native';
import type { ReactNode } from 'react';

/** Dégradé corail principal (haut-gauche → bas-droite). */
export const BRAND_GRADIENT = ['#EC6B54', '#E05040', '#CB3B2C'] as const;
/** Variante « or » pour le Premium (accent doré chaleureux). */
export const PREMIUM_GRADIENT = ['#F6A94B', '#F1852F', '#E9631E'] as const;

export function BrandGradient({
  style, children, colors = BRAND_GRADIENT, start = { x: 0, y: 0 }, end = { x: 1, y: 1 },
}: {
  style?: StyleProp<ViewStyle>;
  children?: ReactNode;
  colors?: readonly string[];
  start?: { x: number; y: number };
  end?: { x: number; y: number };
}) {
  return (
    <LinearGradient colors={colors as unknown as [string, string, ...string[]]} start={start} end={end} style={style}>
      {children}
    </LinearGradient>
  );
}
