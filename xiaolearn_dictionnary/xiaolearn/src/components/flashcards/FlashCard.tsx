import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { GlassCard } from '../shared/GlassCard';
import { Word } from '../../types';
import { colors, spacing, typography, borderRadius } from '../../utils/theme';

interface FlashCardProps {
  word: Word;
  onPlayAudio?: () => void;
}

export const FlashCard: React.FC<FlashCardProps> = ({ word, onPlayAudio }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const fadeAnim = React.useRef(new Animated.Value(1)).current;

  const handleFlip = () => {
    // Animation de fade simple
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();

    setIsFlipped(!isFlipped);
  };

  const cardContent = (
    <GlassCard style={styles.glassCard}>
      <Animated.View style={{ flex: 1, opacity: fadeAnim }}>
        {!isFlipped ? (
          // Face avant - Hanzi
          <View style={styles.content}>
            <Text style={styles.label}>Caractère</Text>
            <Text style={styles.hanzi}>{word.hanzi}</Text>
            <Text style={styles.pinyin}>{word.pinyin}</Text>

            {onPlayAudio && word.audioPath && (
              <TouchableOpacity
                onPress={(e) => {
                  e.stopPropagation();
                  onPlayAudio();
                }}
                style={styles.audioButton}
              >
                <Ionicons name="volume-high" size={32} color={colors.primary} />
              </TouchableOpacity>
            )}

            <View style={styles.hint}>
              <Ionicons name="eye" size={20} color={colors.textSecondary} />
              <Text style={styles.hintText}>Toucher pour voir la réponse</Text>
            </View>
          </View>
        ) : (
          // Face arrière - Traduction avec détails
          <View style={styles.backContainer}>
            <ScrollView
              style={styles.scrollView}
              contentContainerStyle={styles.scrollContent}
              showsVerticalScrollIndicator={false}
            >
              <Text style={styles.label}>Traduction</Text>
              <Text style={styles.translation}>{word.translationFr}</Text>

              {/* Traductions alternatives */}
              {word.translationFrAlt && word.translationFrAlt.length > 0 && (
                <View style={styles.altSection}>
                  {word.translationFrAlt.slice(0, 3).map((alt, index) => (
                    <Text key={index} style={styles.altText}>
                      • {alt}
                    </Text>
                  ))}
                </View>
              )}

              {/* Explication en français */}
              {(word.explanationFr || word.explanation) && (
                <View style={styles.explanationSection}>
                  <Text style={styles.sectionTitle}>Explication</Text>
                  <Text style={styles.explanationText}>
                    {word.explanationFr || word.explanation}
                  </Text>
                </View>
              )}

              {/* Exemples */}
              {word.examples && word.examples.length > 0 && (
                <View style={styles.examplesSection}>
                  <Text style={styles.sectionTitle}>Exemples</Text>
                  {word.examples.slice(0, 2).map((example, index) => (
                    <View key={index} style={styles.example}>
                      <Text style={styles.exampleChinese}>{example.chinese}</Text>
                      <Text style={styles.exampleTranslation}>{example.translation}</Text>
                    </View>
                  ))}
                </View>
              )}

              {/* Métadonnées */}
              {word.category && (
                <View style={styles.metadata}>
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>{word.level.toUpperCase()}</Text>
                  </View>
                  <View style={[styles.badge, styles.categoryBadge]}>
                    <Text style={styles.badgeText}>{word.category}</Text>
                  </View>
                </View>
              )}
            </ScrollView>

            <TouchableOpacity onPress={handleFlip} style={styles.hint}>
              <Ionicons name="eye-off" size={20} color={colors.textSecondary} />
              <Text style={styles.hintText}>Toucher pour cacher</Text>
            </TouchableOpacity>
          </View>
        )}
      </Animated.View>
    </GlassCard>
  );

  return (
    <View style={styles.container}>
      {isFlipped ? (
        <View style={styles.cardContainer}>{cardContent}</View>
      ) : (
        <TouchableOpacity
          onPress={handleFlip}
          activeOpacity={0.9}
          style={styles.cardContainer}
        >
          {cardContent}
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    alignSelf: 'center',
  },
  cardContainer: {
    width: '100%',
    height: '100%',
  },
  glassCard: {
    width: '100%',
    height: '100%',
    padding: spacing.lg,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backContainer: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    alignItems: 'center',
    paddingVertical: spacing.md,
    paddingBottom: spacing.xxl * 2,
  },
  label: {
    ...typography.caption,
    color: colors.textSecondary,
    marginBottom: spacing.md,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  hanzi: {
    fontSize: 80,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.md,
  },
  pinyin: {
    ...typography.h2,
    color: colors.primary,
    marginBottom: spacing.lg,
  },
  translation: {
    ...typography.h2,
    color: colors.text,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  altSection: {
    marginBottom: spacing.md,
    alignItems: 'flex-start',
    alignSelf: 'stretch',
    paddingHorizontal: spacing.md,
  },
  altText: {
    ...typography.body,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  explanationSection: {
    marginBottom: spacing.md,
    alignSelf: 'stretch',
    paddingHorizontal: spacing.md,
  },
  sectionTitle: {
    ...typography.caption,
    color: colors.primary,
    marginBottom: spacing.xs,
    textTransform: 'uppercase',
    fontWeight: '700',
  },
  explanationText: {
    ...typography.body,
    color: colors.textSecondary,
    lineHeight: 22,
  },
  examplesSection: {
    marginBottom: spacing.md,
    alignSelf: 'stretch',
    paddingHorizontal: spacing.md,
  },
  example: {
    backgroundColor: colors.surfaceLight,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    marginBottom: spacing.sm,
  },
  exampleChinese: {
    ...typography.body,
    color: colors.text,
    marginBottom: spacing.xs,
    fontWeight: '600',
  },
  exampleTranslation: {
    ...typography.caption,
    color: colors.textSecondary,
    lineHeight: 18,
  },
  audioButton: {
    marginTop: spacing.md,
    padding: spacing.sm,
  },
  metadata: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.md,
  },
  badge: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.sm,
  },
  categoryBadge: {
    backgroundColor: colors.secondary,
  },
  badgeText: {
    ...typography.small,
    color: colors.text,
    fontWeight: '600',
  },
  hint: {
    position: 'absolute',
    bottom: spacing.md,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  hintText: {
    ...typography.caption,
    color: colors.textSecondary,
  },
});
