import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { GlassCard } from '../shared/GlassCard';
import { Button } from '../shared/Button';
import { Word } from '../../types';
import { colors, spacing, typography, borderRadius, gradients } from '../../utils/theme';

interface WordDetailModalProps {
  visible: boolean;
  word: Word | null;
  onClose: () => void;
  onAddToFlashcards?: () => void;
  onPlayAudio?: () => void;
}

export const WordDetailModal: React.FC<WordDetailModalProps> = ({
  visible,
  word,
  onClose,
  onAddToFlashcards,
  onPlayAudio,
}) => {
  if (!word) return null;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <LinearGradient colors={gradients.background} style={styles.backdrop}>
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={onClose}
            activeOpacity={0.7}
          >
            <Ionicons name="close" size={28} color={colors.text} />
          </TouchableOpacity>

          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.content}
            showsVerticalScrollIndicator={false}
          >
            <GlassCard style={styles.card}>
              {/* En-tête avec hanzi et pinyin */}
              <View style={styles.header}>
                <View style={styles.mainInfo}>
                  <Text style={styles.hanzi}>{word.hanzi}</Text>
                  <Text style={styles.pinyin}>{word.pinyin}</Text>
                </View>
                {word.audioPath && onPlayAudio && (
                  <TouchableOpacity
                    onPress={onPlayAudio}
                    style={styles.audioButton}
                  >
                    <Ionicons name="volume-high" size={32} color={colors.primary} />
                  </TouchableOpacity>
                )}
              </View>

              {/* Traduction principale */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Traduction</Text>
                <Text style={styles.translation}>{word.translationFr}</Text>
                {word.translation && (
                  <Text style={styles.translationEn}>{word.translation}</Text>
                )}
              </View>

              {/* Traductions alternatives */}
              {word.translationFrAlt && word.translationFrAlt.length > 0 && (
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Autres traductions</Text>
                  <View style={styles.altTranslations}>
                    {word.translationFrAlt.map((alt, index) => (
                      <View key={index} style={styles.altBadge}>
                        <Text style={styles.altText}>{alt}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              )}

              {/* Explication */}
              {(word.explanationFr || word.explanation) && (
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Explication</Text>
                  <Text style={styles.explanation}>
                    {word.explanationFr || word.explanation}
                  </Text>
                </View>
              )}

              {/* Exemples */}
              {word.examples && word.examples.length > 0 && (
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Exemples</Text>
                  {word.examples.map((example, index) => (
                    <View key={index} style={styles.example}>
                      <Text style={styles.exampleChinese}>{example.chinese}</Text>
                      <Text style={styles.examplePinyin}>{example.pinyin}</Text>
                      <Text style={styles.exampleTranslation}>
                        {example.translation}
                      </Text>
                    </View>
                  ))}
                </View>
              )}

              {/* Métadonnées */}
              <View style={styles.metadata}>
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{word.level.toUpperCase()}</Text>
                </View>
                {word.category && (
                  <View style={[styles.badge, styles.categoryBadge]}>
                    <Text style={styles.badgeText}>{word.category}</Text>
                  </View>
                )}
                {word.theme && (
                  <View style={[styles.badge, styles.themeBadge]}>
                    <Text style={styles.badgeText}>{word.theme}</Text>
                  </View>
                )}
              </View>
            </GlassCard>

            {/* Bouton ajouter aux flashcards */}
            {onAddToFlashcards && (
              <Button
                title="Ajouter aux flashcards"
                onPress={onAddToFlashcards}
                variant="primary"
                style={styles.addButton}
              />
            )}
          </ScrollView>
        </View>
      </LinearGradient>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalContainer: {
    flex: 1,
    marginTop: 100,
    borderTopLeftRadius: borderRadius.xxl,
    borderTopRightRadius: borderRadius.xxl,
    overflow: 'hidden',
  },
  closeButton: {
    position: 'absolute',
    top: spacing.md,
    right: spacing.md,
    zIndex: 10,
    backgroundColor: colors.glass,
    borderRadius: borderRadius.round,
    padding: spacing.sm,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: spacing.lg,
    paddingTop: spacing.xxl,
  },
  card: {
    padding: spacing.lg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.lg,
  },
  mainInfo: {
    flex: 1,
  },
  hanzi: {
    fontSize: 48,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.sm,
  },
  pinyin: {
    ...typography.h3,
    color: colors.textSecondary,
  },
  audioButton: {
    padding: spacing.sm,
  },
  section: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    ...typography.h3,
    color: colors.primary,
    marginBottom: spacing.sm,
  },
  translation: {
    ...typography.bodyLarge,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  translationEn: {
    ...typography.body,
    color: colors.textSecondary,
    fontStyle: 'italic',
  },
  altTranslations: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  altBadge: {
    backgroundColor: colors.surfaceLight,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.md,
  },
  altText: {
    ...typography.caption,
    color: colors.text,
  },
  explanation: {
    ...typography.body,
    color: colors.textSecondary,
    lineHeight: 24,
  },
  example: {
    backgroundColor: colors.surfaceLight,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    marginBottom: spacing.sm,
  },
  exampleChinese: {
    ...typography.bodyLarge,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  examplePinyin: {
    ...typography.caption,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  exampleTranslation: {
    ...typography.body,
    color: colors.text,
  },
  metadata: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
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
  themeBadge: {
    backgroundColor: colors.accent,
  },
  badgeText: {
    ...typography.small,
    color: colors.text,
    fontWeight: '600',
  },
  addButton: {
    marginTop: spacing.lg,
    marginBottom: spacing.xl,
  },
});
