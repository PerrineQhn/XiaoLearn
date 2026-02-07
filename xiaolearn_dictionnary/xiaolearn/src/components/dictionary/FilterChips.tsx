import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { HSKLevel } from '../../types';
import { colors, spacing, typography, borderRadius } from '../../utils/theme';

interface FilterChipsProps {
  selectedLevels: HSKLevel[];
  onToggleLevel: (level: HSKLevel) => void;
  onClearFilters?: () => void;
}

const HSK_LEVELS: HSKLevel[] = ['hsk1', 'hsk2', 'hsk3', 'hsk4', 'hsk5', 'hsk6', 'hsk7'];

export const FilterChips: React.FC<FilterChipsProps> = ({
  selectedLevels,
  onToggleLevel,
  onClearFilters,
}) => {
  const hasFilters = selectedLevels.length > 0;

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {HSK_LEVELS.map((level) => {
          const isSelected = selectedLevels.includes(level);
          return (
            <TouchableOpacity
              key={level}
              onPress={() => onToggleLevel(level)}
              style={[styles.chip, isSelected && styles.chipSelected]}
              activeOpacity={0.7}
            >
              <Text style={[styles.chipText, isSelected && styles.chipTextSelected]}>
                {level.toUpperCase()}
              </Text>
            </TouchableOpacity>
          );
        })}

        {hasFilters && onClearFilters && (
          <TouchableOpacity
            onPress={onClearFilters}
            style={[styles.chip, styles.clearChip]}
            activeOpacity={0.7}
          >
            <Ionicons name="close-circle" size={16} color={colors.text} />
            <Text style={[styles.chipText, styles.chipTextSelected]}>
              Effacer
            </Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.md,
  },
  scrollContent: {
    paddingHorizontal: spacing.lg,
    gap: spacing.sm,
  },
  chip: {
    backgroundColor: colors.glass,
    borderWidth: 1,
    borderColor: colors.glassBorder,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.round,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  chipSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  chipText: {
    ...typography.caption,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  chipTextSelected: {
    color: colors.text,
  },
  clearChip: {
    backgroundColor: colors.error,
    borderColor: colors.error,
  },
});
