import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FlashCard } from './FlashCard';
import { QualityButtons } from './QualityButtons';
import { SessionStats } from './SessionStats';
import { useFlashcardsStore } from '../../store/flashcardsStore';
import { simpleQualityToSM2, getSuggestedIntervals } from '../../algorithms/sm2';
import { playAudio } from '../../utils/audio';
import { colors, spacing, typography } from '../../utils/theme';

interface ReviewScreenProps {
  onEndSession: () => void;
}

export const ReviewScreen: React.FC<ReviewScreenProps> = ({ onEndSession }) => {
  const {
    currentFlashcard,
    currentWord,
    currentIndex,
    dueFlashcards,
    sessionStats,
    reviewFlashcard,
  } = useFlashcardsStore();

  if (!currentFlashcard || !currentWord) {
    return (
      <View style={styles.emptyContainer}>
        <Ionicons name="checkmark-circle" size={80} color={colors.success} />
        <Text style={styles.emptyTitle}>Session terminée !</Text>
        <Text style={styles.emptyText}>
          Vous avez révisé {sessionStats.totalReviewed} cartes
        </Text>
        <Text style={styles.stats}>
          Correct: {sessionStats.correct} | Incorrect: {sessionStats.incorrect}
        </Text>
        <TouchableOpacity onPress={onEndSession} style={styles.doneButton}>
          <Text style={styles.doneButtonText}>Terminer</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const handleQuality = async (quality: 'again' | 'hard' | 'good' | 'easy') => {
    const sm2Quality = simpleQualityToSM2(quality);
    await reviewFlashcard(sm2Quality);
  };

  const handlePlayAudio = () => {
    if (currentWord.audioPath) {
      playAudio(currentWord.audioPath).catch((error) => {
        console.error('Failed to play audio:', error);
      });
    }
  };

  // Calculer les intervalles suggérés
  const intervals = getSuggestedIntervals(
    currentFlashcard.repetitions,
    currentFlashcard.easinessFactor,
    currentFlashcard.interval
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {/* Header avec stats */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onEndSession} style={styles.closeButton}>
          <Ionicons name="close" size={28} color={colors.text} />
        </TouchableOpacity>
      </View>

      <SessionStats
        totalCards={dueFlashcards.length}
        currentIndex={currentIndex}
        correct={sessionStats.correct}
        incorrect={sessionStats.incorrect}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        {/* Carte flash */}
        <View style={styles.cardContainer}>
          <FlashCard word={currentWord} onPlayAudio={handlePlayAudio} />
        </View>
      </ScrollView>

      {/* Boutons de qualité - Toujours visibles en bas */}
      <View style={styles.buttonsContainer}>
        <QualityButtons onQuality={handleQuality} intervals={intervals} />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: spacing.md,
  },
  closeButton: {
    padding: spacing.sm,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: spacing.md,
  },
  cardContainer: {
    minHeight: 450,
    maxHeight: 600,
    justifyContent: 'center',
  },
  buttonsContainer: {
    paddingTop: spacing.md,
    paddingBottom: spacing.lg,
    backgroundColor: colors.background,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  emptyTitle: {
    ...typography.h1,
    color: colors.text,
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
  },
  emptyText: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  stats: {
    ...typography.body,
    color: colors.primary,
    marginTop: spacing.md,
  },
  doneButton: {
    marginTop: spacing.xl,
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    borderRadius: 12,
  },
  doneButtonText: {
    ...typography.body,
    color: colors.text,
    fontWeight: '700',
  },
});
