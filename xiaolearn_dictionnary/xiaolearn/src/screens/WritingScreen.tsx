import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  useWindowDimensions,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Container, GlassCard } from '../components/shared';
import { WritingCanvas, WritingCanvasHandle } from '../components/writing';
import { useFlashcardsStore } from '../store/flashcardsStore';
import { addWritingPractice, getAllFlashcards, getFlashcardsForList, getWordById } from '../database/queries';
import { Flashcard, Word } from '../types';
import { playAudio } from '../utils/audio';
import { colors, spacing, typography, borderRadius, shadows } from '../utils/theme';

export const WritingScreen: React.FC = () => {
  const { lists, loadLists } = useFlashcardsStore();
  const [selectedListId, setSelectedListId] = useState<number | null>(null);
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [currentWord, setCurrentWord] = useState<Word | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [repetitionTarget, setRepetitionTarget] = useState(0);
  const [repetitionCount, setRepetitionCount] = useState(0);
  const [hasStrokes, setHasStrokes] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const canvasRef = useRef<WritingCanvasHandle>(null);
  const { height } = useWindowDimensions();

  const repetitionTargets = useMemo(
    () => ({
      hard: 10,
      good: 5,
      easy: 1,
    }),
    []
  );

  const canvasHeight = useMemo(() => {
    const base = height * 0.3;
    return Math.min(320, Math.max(200, base));
  }, [height]);

  useEffect(() => {
    loadLists();
  }, []);

  useEffect(() => {
    let isActive = true;

    const loadSession = async () => {
      setIsLoading(true);
      try {
        const cards = selectedListId
          ? await getFlashcardsForList(selectedListId)
          : await getAllFlashcards();

        if (!isActive) return;
        setFlashcards(cards);
        setCurrentIndex(0);
        setAttempts(0);
        setRepetitionTarget(0);
        setRepetitionCount(0);
        canvasRef.current?.clear();
        setHasStrokes(false);

        if (cards.length === 0) {
          setCurrentWord(null);
        } else {
          const word = await getWordById(cards[0].wordId);
          if (isActive) {
            setCurrentWord(word);
          }
        }
      } catch (error) {
        console.error('Error loading writing session:', error);
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    };

    loadSession();

    return () => {
      isActive = false;
    };
  }, [selectedListId]);

  const loadWordAtIndex = async (index: number) => {
    const flashcard = flashcards[index];
    if (!flashcard) {
      setCurrentWord(null);
      return;
    }
    const word = await getWordById(flashcard.wordId);
    setCurrentWord(word);
  };

  const handleNextWord = async () => {
    const nextIndex = currentIndex + 1;
    if (nextIndex >= flashcards.length) {
      setCurrentWord(null);
      return;
    }

    setCurrentIndex(nextIndex);
    setAttempts(0);
    setRepetitionTarget(0);
    setRepetitionCount(0);
    canvasRef.current?.clear();
    setHasStrokes(false);
    await loadWordAtIndex(nextIndex);
  };

  const logPractice = async (success: boolean, nextAttempts: number) => {
    if (!currentWord) return;
    try {
      await addWritingPractice(currentWord.id, success, nextAttempts);
    } catch (error) {
      console.error('Error saving writing practice:', error);
    }
  };

  const handleFailure = async () => {
    if (!currentWord) return;
    if (!hasStrokes) {
      alert('Tracez le caractère avant de valider.');
      return;
    }

    const nextAttempts = attempts + 1;
    setAttempts(nextAttempts);
    await logPractice(false, nextAttempts);
    canvasRef.current?.clear();
    setHasStrokes(false);
  };

  const handleSuccess = async (difficulty: 'hard' | 'good' | 'easy') => {
    if (!currentWord) return;
    if (!hasStrokes) {
      alert('Tracez le caractère avant de valider.');
      return;
    }

    const nextAttempts = attempts + 1;
    const target = repetitionTarget || repetitionTargets[difficulty];
    const nextCount = repetitionCount + 1;

    setAttempts(nextAttempts);
    setRepetitionTarget(target);
    setRepetitionCount(nextCount);

    await logPractice(true, nextAttempts);
    canvasRef.current?.clear();
    setHasStrokes(false);

    if (nextCount >= target) {
      setAttempts(0);
      setRepetitionTarget(0);
      setRepetitionCount(0);
      await handleNextWord();
    }
  };

  const handlePlayAudio = () => {
    if (currentWord?.audioPath) {
      playAudio(currentWord.audioPath).catch((error) => {
        console.error('Failed to play audio:', error);
      });
    }
  };

  const totalCards = flashcards.length;
  const progressText = totalCards > 0 ? `${currentIndex + 1}/${totalCards}` : '';
  const repetitionLabel = repetitionTarget
    ? `${repetitionCount}/${repetitionTarget}`
    : '—';

  return (
    <Container>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        scrollEnabled={!isDrawing}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Écriture</Text>
          <Text style={styles.subtitle}>Tracez les caractères et validez votre essai</Text>
        </View>

        <View style={styles.listsHeader}>
          <Text style={styles.listsTitle}>Listes</Text>
        </View>
        <View style={styles.listsRow}>
          <TouchableOpacity
            style={[styles.listChip, !selectedListId && styles.listChipActive]}
            onPress={() => setSelectedListId(null)}
          >
            <Text
              style={[
                styles.listChipText,
                !selectedListId && styles.listChipTextActive,
              ]}
            >
              Toutes
            </Text>
          </TouchableOpacity>
          {lists.map((list) => {
            const isActive = selectedListId === list.id;
            return (
              <TouchableOpacity
                key={list.id}
                style={[styles.listChip, isActive && styles.listChipActive]}
                onPress={() => setSelectedListId(list.id)}
              >
                <Text style={[styles.listChipText, isActive && styles.listChipTextActive]}>
                  {list.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={colors.primary} />
            <Text style={styles.loadingText}>Chargement...</Text>
          </View>
        ) : !currentWord ? (
          <View style={styles.emptyContainer}>
            <Ionicons name="create-outline" size={72} color={colors.textMuted} />
            <Text style={styles.emptyTitle}>Aucune carte disponible</Text>
            <Text style={styles.emptyText}>
              Ajoutez des mots à vos flashcards ou changez de liste.
            </Text>
          </View>
        ) : (
          <GlassCard style={styles.practiceCard}>
            <View style={styles.practiceHeader}>
              <View>
                <Text style={styles.practiceLabel}>Tracez</Text>
                <Text style={styles.practiceCharacter}>{currentWord.hanzi}</Text>
              </View>
              <TouchableOpacity
                onPress={handlePlayAudio}
                style={styles.audioButton}
                disabled={!currentWord.audioPath}
              >
                <Ionicons name="volume-high" size={26} color={colors.primary} />
              </TouchableOpacity>
            </View>

            <Text style={styles.pinyin}>{currentWord.pinyin}</Text>
            <Text style={styles.translation}>{currentWord.translationFr}</Text>

            <WritingCanvas
              ref={canvasRef}
              character={currentWord.hanzi}
              height={canvasHeight}
              onHasStrokesChange={setHasStrokes}
              onDrawingChange={setIsDrawing}
            />

            <View style={styles.actionsRow}>
              <TouchableOpacity
                style={[styles.actionButton, styles.actionButtonGhost]}
                onPress={() => {
                  canvasRef.current?.clear();
                  setHasStrokes(false);
                }}
              >
                <Ionicons name="refresh" size={18} color={colors.textSecondary} />
                <Text style={styles.actionButtonGhostText}>Effacer</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.actionButton,
                  styles.actionButtonFail,
                  !hasStrokes && styles.actionButtonDisabled,
                ]}
                onPress={handleFailure}
                disabled={!hasStrokes}
              >
                <Text style={styles.actionButtonText}>Pas encore</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.difficultyRow}>
              <TouchableOpacity
                style={[
                  styles.difficultyButton,
                  styles.difficultyHard,
                  !hasStrokes && styles.actionButtonDisabled,
                ]}
                onPress={() => handleSuccess('hard')}
                disabled={!hasStrokes}
              >
                <Text style={styles.difficultyText}>Difficile</Text>
                <Text style={styles.difficultySubtext}>10x</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.difficultyButton,
                  styles.difficultyGood,
                  !hasStrokes && styles.actionButtonDisabled,
                ]}
                onPress={() => handleSuccess('good')}
                disabled={!hasStrokes}
              >
                <Text style={styles.difficultyText}>Bien</Text>
                <Text style={styles.difficultySubtext}>5x</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.difficultyButton,
                  styles.difficultyEasy,
                  !hasStrokes && styles.actionButtonDisabled,
                ]}
                onPress={() => handleSuccess('easy')}
                disabled={!hasStrokes}
              >
                <Text style={styles.difficultyText}>Facile</Text>
                <Text style={styles.difficultySubtext}>1x</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.footerRow}>
              <Text style={styles.progressText}>{progressText}</Text>
              <Text style={styles.attemptsText}>Essais: {attempts}</Text>
              <Text style={styles.attemptsText}>Répétitions: {repetitionLabel}</Text>
            </View>
          </GlassCard>
        )}
      </ScrollView>
    </Container>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    padding: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  header: {
    marginBottom: spacing.lg,
  },
  title: {
    ...typography.h1,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  subtitle: {
    ...typography.body,
    color: colors.textSecondary,
  },
  listsHeader: {
    marginBottom: spacing.sm,
  },
  listsTitle: {
    ...typography.h3,
    color: colors.text,
  },
  listsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  listChip: {
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.round,
    backgroundColor: colors.glass,
    borderWidth: 1,
    borderColor: colors.glassBorder,
  },
  listChipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  listChipText: {
    ...typography.caption,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  listChipTextActive: {
    color: colors.text,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    ...typography.body,
    color: colors.textSecondary,
    marginTop: spacing.md,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
  },
  emptyTitle: {
    ...typography.h2,
    color: colors.text,
    marginTop: spacing.md,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  emptyText: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  practiceCard: {
    padding: spacing.md,
    gap: spacing.md,
  },
  practiceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  practiceLabel: {
    ...typography.caption,
    color: colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  practiceCharacter: {
    fontSize: 36,
    fontWeight: '700',
    color: colors.text,
  },
  audioButton: {
    padding: spacing.sm,
    borderRadius: borderRadius.round,
    backgroundColor: colors.surfaceLight,
    borderWidth: 1,
    borderColor: colors.glassBorder,
  },
  pinyin: {
    ...typography.bodyLarge,
    color: colors.primary,
  },
  translation: {
    ...typography.body,
    color: colors.textSecondary,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  actionButton: {
    flex: 1,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.sm,
  },
  actionButtonGhost: {
    flexDirection: 'row',
    gap: spacing.xs,
    backgroundColor: colors.glass,
    borderWidth: 1,
    borderColor: colors.glassBorder,
  },
  actionButtonFail: {
    backgroundColor: colors.error,
  },
  actionButtonSuccess: {
    backgroundColor: colors.success,
  },
  actionButtonDisabled: {
    opacity: 0.6,
  },
  difficultyRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  difficultyButton: {
    flex: 1,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.sm,
  },
  difficultyHard: {
    backgroundColor: colors.hard,
  },
  difficultyGood: {
    backgroundColor: colors.good,
  },
  difficultyEasy: {
    backgroundColor: colors.easy,
  },
  difficultyText: {
    ...typography.body,
    color: colors.text,
    fontWeight: '700',
  },
  difficultySubtext: {
    ...typography.small,
    color: colors.text,
    opacity: 0.9,
    marginTop: 2,
  },
  actionButtonText: {
    ...typography.body,
    color: colors.text,
    fontWeight: '700',
  },
  actionButtonGhostText: {
    ...typography.body,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  footerRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    justifyContent: 'space-between',
  },
  progressText: {
    ...typography.caption,
    color: colors.textMuted,
  },
  attemptsText: {
    ...typography.caption,
    color: colors.textMuted,
  },
});
