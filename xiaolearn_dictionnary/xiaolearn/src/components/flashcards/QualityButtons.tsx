import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, spacing, typography, borderRadius, shadows } from '../../utils/theme';

interface QualityButtonsProps {
  onQuality: (quality: 'again' | 'hard' | 'good' | 'easy') => void;
  intervals?: {
    again: number;
    hard: number;
    good: number;
    easy: number;
  };
  disabled?: boolean;
}

export const QualityButtons: React.FC<QualityButtonsProps> = ({
  onQuality,
  intervals,
  disabled = false,
}) => {
  const formatInterval = (days: number): string => {
    if (days === 0) return 'Maintenant';
    if (days === 1) return '1 jour';
    if (days < 30) return `${days} jours`;
    if (days < 365) return `${Math.round(days / 30)} mois`;
    return `${Math.round(days / 365)} ans`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        {/* Again */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => onQuality('again')}
          disabled={disabled}
          activeOpacity={0.7}
        >
          <LinearGradient
            colors={[colors.again, '#d63031']}
            style={styles.gradient}
          >
            <Text style={styles.buttonTitle}>Encore</Text>
            {intervals && (
              <Text style={styles.interval}>{formatInterval(intervals.again)}</Text>
            )}
          </LinearGradient>
        </TouchableOpacity>

        {/* Hard */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => onQuality('hard')}
          disabled={disabled}
          activeOpacity={0.7}
        >
          <LinearGradient
            colors={[colors.hard, '#e17055']}
            style={styles.gradient}
          >
            <Text style={styles.buttonTitle}>Difficile</Text>
            {intervals && (
              <Text style={styles.interval}>{formatInterval(intervals.hard)}</Text>
            )}
          </LinearGradient>
        </TouchableOpacity>
      </View>

      <View style={styles.row}>
        {/* Good */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => onQuality('good')}
          disabled={disabled}
          activeOpacity={0.7}
        >
          <LinearGradient
            colors={[colors.good, '#00b894']}
            style={styles.gradient}
          >
            <Text style={styles.buttonTitle}>Bien</Text>
            {intervals && (
              <Text style={styles.interval}>{formatInterval(intervals.good)}</Text>
            )}
          </LinearGradient>
        </TouchableOpacity>

        {/* Easy */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => onQuality('easy')}
          disabled={disabled}
          activeOpacity={0.7}
        >
          <LinearGradient
            colors={[colors.easy, '#55efc4']}
            style={styles.gradient}
          >
            <Text style={styles.buttonTitle}>Facile</Text>
            {intervals && (
              <Text style={styles.interval}>{formatInterval(intervals.easy)}</Text>
            )}
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: spacing.md,
  },
  row: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  button: {
    flex: 1,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    ...shadows.md,
  },
  gradient: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.sm,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 70,
  },
  buttonTitle: {
    ...typography.body,
    color: colors.text,
    fontWeight: '700',
    marginBottom: spacing.xs,
  },
  interval: {
    ...typography.small,
    color: colors.text,
    opacity: 0.9,
  },
});
