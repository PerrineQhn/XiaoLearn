import React from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import { BlurView } from 'expo-blur';
import { colors, borderRadius, shadows } from '../../utils/theme';

interface GlassCardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  intensity?: number;
  tint?: 'light' | 'dark' | 'default';
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  style,
  intensity = 20,
  tint = 'dark',
}) => {
  return (
    <BlurView intensity={intensity} tint={tint} style={[styles.glass, style]}>
      {children}
    </BlurView>
  );
};

const styles = StyleSheet.create({
  glass: {
    backgroundColor: colors.glass,
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    borderColor: colors.glassBorder,
    padding: 20,
    overflow: 'hidden',
    ...shadows.lg,
  },
});
