import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { GlassCard } from '../shared/GlassCard';
import { colors, spacing, typography } from '../../utils/theme';

interface SessionStatsProps {
  totalCards: number;
  currentIndex: number;
  correct: number;
  incorrect: number;
}

export const SessionStats: React.FC<SessionStatsProps> = ({
  totalCards,
  currentIndex,
  correct,
  incorrect,
}) => {
  const remaining = totalCards - currentIndex;
  const accuracy =
    correct + incorrect > 0
      ? Math.round((correct / (correct + incorrect)) * 100)
      : 0;

  return (
    <GlassCard style={styles.card}>
      <View style={styles.row}>
        <View style={styles.stat}>
          <Text style={styles.statValue}>{currentIndex + 1}/{totalCards}</Text>
          <Text style={styles.statLabel}>Progression</Text>
        </View>

        <View style={styles.stat}>
          <Text style={styles.statValue}>{remaining}</Text>
          <Text style={styles.statLabel}>Restantes</Text>
        </View>

        <View style={styles.stat}>
          <Text style={[styles.statValue, styles.successText]}>{correct}</Text>
          <Text style={styles.statLabel}>Correctes</Text>
        </View>

        <View style={styles.stat}>
          <Text style={[styles.statValue, styles.errorText]}>{incorrect}</Text>
          <Text style={styles.statLabel}>Incorrectes</Text>
        </View>

        {correct + incorrect > 0 && (
          <View style={styles.stat}>
            <Text style={styles.statValue}>{accuracy}%</Text>
            <Text style={styles.statLabel}>Précision</Text>
          </View>
        )}
      </View>
    </GlassCard>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: spacing.md,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: spacing.sm,
  },
  stat: {
    alignItems: 'center',
  },
  statValue: {
    ...typography.h3,
    color: colors.text,
    fontWeight: '700',
    marginBottom: spacing.xs,
  },
  statLabel: {
    ...typography.small,
    color: colors.textSecondary,
  },
  successText: {
    color: colors.success,
  },
  errorText: {
    color: colors.error,
  },
});
