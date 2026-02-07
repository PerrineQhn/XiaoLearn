import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { GlassCard } from '../shared/GlassCard';
import { Word } from '../../types';
import { colors, spacing, typography, borderRadius } from '../../utils/theme';

interface WordCardProps {
  word: Word;
  onPress?: () => void;
  onAddToFlashcards?: () => void;
  onPlayAudio?: () => void;
}

export const WordCard: React.FC<WordCardProps> = ({
  word,
  onPress,
  onAddToFlashcards,
  onPlayAudio,
}) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <GlassCard style={styles.card}>
        <View style={styles.header}>
          <View style={styles.mainInfo}>
            <Text style={styles.hanzi}>{word.hanzi}</Text>
            <Text style={styles.pinyin}>{word.pinyin}</Text>
          </View>

          <View style={styles.actions}>
            {word.audioPath && onPlayAudio && (
              <TouchableOpacity
                onPress={onPlayAudio}
                style={styles.iconButton}
              >
                <Ionicons name="volume-medium" size={24} color={colors.primary} />
              </TouchableOpacity>
            )}
            {onAddToFlashcards && (
              <TouchableOpacity
                onPress={onAddToFlashcards}
                style={styles.iconButton}
              >
                <Ionicons name="add-circle" size={24} color={colors.accent} />
              </TouchableOpacity>
            )}
          </View>
        </View>

        <Text style={styles.translation}>{word.translationFr}</Text>

        {word.category && (
          <View style={styles.footer}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{word.level.toUpperCase()}</Text>
            </View>
            <View style={[styles.badge, styles.categoryBadge]}>
              <Text style={styles.badgeText}>{word.category}</Text>
            </View>
            {word.theme && (
              <View style={[styles.badge, styles.themeBadge]}>
                <Text style={styles.badgeText}>{word.theme}</Text>
              </View>
            )}
          </View>
        )}
      </GlassCard>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.sm,
  },
  mainInfo: {
    flex: 1,
  },
  hanzi: {
    ...typography.h2,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  pinyin: {
    ...typography.body,
    color: colors.textSecondary,
  },
  actions: {
    flexDirection: 'row',
    gap: spacing.xs,
  },
  iconButton: {
    padding: spacing.xs,
  },
  translation: {
    ...typography.body,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  footer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
  },
  badge: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: borderRadius.sm,
  },
  categoryBadge: {
    backgroundColor: colors.secondary,
  },
  themeBadge: {
    backgroundColor: colors.accent,
  },
  badgeText: {
    ...typography.small,
    color: colors.text,
    fontWeight: '600',
  },
});
