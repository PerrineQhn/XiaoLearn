import React, { useCallback, useMemo, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import Svg, { Rect, Text as SvgText } from 'react-native-svg';
import { Container, GlassCard } from '../components/shared';
import { colors, spacing, typography, borderRadius } from '../utils/theme';
import {
  getFlashcardCounts,
  getReviewDates,
  getReviewStats,
  getWritingPracticeDates,
  getWritingStats,
} from '../database/queries';

export const ProgressScreen: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [flashcardsTotal, setFlashcardsTotal] = useState(0);
  const [flashcardsDue, setFlashcardsDue] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);
  const [accuracy, setAccuracy] = useState(0);
  const [lastReviewDate, setLastReviewDate] = useState<string | null>(null);
  const [reviewDates, setReviewDates] = useState<string[]>([]);
  const [writingDates, setWritingDates] = useState<string[]>([]);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);
  const [writingTotal, setWritingTotal] = useState(0);
  const [writingSuccessRate, setWritingSuccessRate] = useState(0);
  const [writingLastDate, setWritingLastDate] = useState<string | null>(null);
  const [writingWords, setWritingWords] = useState(0);

  const computeStreaks = (dates: string[]) => {
    if (dates.length === 0) {
      return { current: 0, longest: 0 };
    }

    const dayKey = (date: Date) => {
      const month = `${date.getMonth() + 1}`.padStart(2, '0');
      const day = `${date.getDate()}`.padStart(2, '0');
      return `${date.getFullYear()}-${month}-${day}`;
    };

    const uniqueDays = Array.from(
      new Set(dates.map((date) => dayKey(new Date(date))))
    ).sort();

    let longest = 0;
    let streak = 0;
    let previousDate: Date | null = null;

    uniqueDays.forEach((day) => {
      const currentDate = new Date(day);
      if (!previousDate) {
        streak = 1;
      } else {
        const diff =
          (currentDate.getTime() - previousDate.getTime()) / (1000 * 60 * 60 * 24);
        streak = diff === 1 ? streak + 1 : 1;
      }
      if (streak > longest) longest = streak;
      previousDate = currentDate;
    });

    let current = 0;
    const today = new Date();
    let cursor = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const daySet = new Set(uniqueDays);
    while (daySet.has(dayKey(cursor))) {
      current += 1;
      cursor.setDate(cursor.getDate() - 1);
    }

    return { current, longest };
  };

  const buildWeeklyActivity = (dates: string[]) => {
    const today = new Date();
    const start = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 6);
    const toKey = (date: Date) => {
      const month = `${date.getMonth() + 1}`.padStart(2, '0');
      const day = `${date.getDate()}`.padStart(2, '0');
      return `${date.getFullYear()}-${month}-${day}`;
    };

    const counts = new Map<string, number>();
    dates.forEach((date) => {
      const key = toKey(new Date(date));
      counts.set(key, (counts.get(key) || 0) + 1);
    });

    const result: { label: string; count: number }[] = [];
    for (let i = 0; i < 7; i += 1) {
      const current = new Date(start);
      current.setDate(start.getDate() + i);
      const key = toKey(current);
      result.push({
        label: current.toLocaleDateString('fr-FR', { weekday: 'short' }),
        count: counts.get(key) || 0,
      });
    }

    return result;
  };

  const renderActivityChart = (
    weeklyActivity: { label: string; count: number }[],
    barColor: string
  ) => {
    const maxActivity = Math.max(1, ...weeklyActivity.map((item) => item.count));
    const viewBoxWidth = weeklyActivity.length * 44 + 12;
    const viewBoxHeight = 140;
    const barWidth = 24;
    const barGap = 20;
    const baseline = viewBoxHeight - 24;

    return (
      <Svg width="100%" height={viewBoxHeight} viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}>
        {weeklyActivity.map((item, index) => {
          const barHeight = Math.max(
            6,
            (item.count / maxActivity) * (viewBoxHeight - 52)
          );
          const x = 12 + index * (barWidth + barGap);
          const y = baseline - barHeight;
          const valueY = Math.max(10, y - 6);
          return (
            <React.Fragment key={`${item.label}-${index}`}>
              <SvgText
                x={x + barWidth / 2}
                y={valueY}
                fill={colors.text}
                fontSize="10"
                textAnchor="middle"
              >
                {item.count}
              </SvgText>
              <Rect
                x={x}
                y={y}
                width={barWidth}
                height={barHeight}
                rx={8}
                ry={8}
                fill={item.count === 0 ? colors.surfaceLight : barColor}
                opacity={item.count === 0 ? 0.5 : 1}
              />
              <SvgText
                x={x + barWidth / 2}
                y={baseline + 14}
                fill={colors.textSecondary}
                fontSize="10"
                textAnchor="middle"
              >
                {item.label}
              </SvgText>
            </React.Fragment>
          );
        })}
      </Svg>
    );
  };

  const loadProgress = useCallback(async () => {
    setIsLoading(true);
    try {
      const [counts, reviews, reviewDateList, writing, writingDateList] =
        await Promise.all([
          getFlashcardCounts(),
          getReviewStats(),
          getReviewDates(),
          getWritingStats(),
          getWritingPracticeDates(),
        ]);

      const accuracyValue =
        reviews.total > 0 ? Math.round((reviews.correct / reviews.total) * 100) : 0;
      const streaks = computeStreaks(reviewDateList);

      setFlashcardsTotal(counts.total);
      setFlashcardsDue(counts.due);
      setTotalReviews(reviews.total);
      setAccuracy(accuracyValue);
      setLastReviewDate(reviews.lastReviewDate);
      setReviewDates(reviewDateList);
      setWritingDates(writingDateList);
      setCurrentStreak(streaks.current);
      setLongestStreak(streaks.longest);
      setWritingTotal(writing.total);
      setWritingSuccessRate(
        writing.total > 0 ? Math.round((writing.success / writing.total) * 100) : 0
      );
      setWritingLastDate(writing.lastPracticeDate);
      setWritingWords(writing.uniqueWords);
    } catch (error) {
      console.error('Error loading progress:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadProgress();
    }, [loadProgress])
  );

  const formattedLastReview = useMemo(() => {
    if (!lastReviewDate) return '—';
    return new Date(lastReviewDate).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  }, [lastReviewDate]);

  const formattedLastWriting = useMemo(() => {
    if (!writingLastDate) return '—';
    return new Date(writingLastDate).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  }, [writingLastDate]);

  const weeklyActivity = useMemo(() => buildWeeklyActivity(reviewDates), [reviewDates]);
  const weeklyWritingActivity = useMemo(
    () => buildWeeklyActivity(writingDates),
    [writingDates]
  );

  return (
    <Container>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Progression</Text>
          <Text style={styles.subtitle}>Suivez vos statistiques d'apprentissage</Text>
        </View>

        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={colors.primary} />
            <Text style={styles.loadingText}>Chargement...</Text>
          </View>
        ) : (
          <>
            <GlassCard style={styles.sectionCard}>
              <View style={styles.sectionHeader}>
                <Ionicons name="stats-chart" size={20} color={colors.primary} />
                <Text style={styles.sectionTitle}>Résumé</Text>
              </View>
              <View style={styles.statsGrid}>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>{flashcardsTotal}</Text>
                  <Text style={styles.statLabel}>Flashcards</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>{flashcardsDue}</Text>
                  <Text style={styles.statLabel}>À réviser</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>{totalReviews}</Text>
                  <Text style={styles.statLabel}>Révisions</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>{accuracy}%</Text>
                  <Text style={styles.statLabel}>Précision</Text>
                </View>
              </View>
            </GlassCard>

            <GlassCard style={styles.sectionCard}>
              <View style={styles.sectionHeader}>
                <Ionicons name="flame" size={20} color={colors.warning} />
                <Text style={styles.sectionTitle}>Série</Text>
              </View>
              <View style={styles.streakRow}>
                <View style={styles.streakItem}>
                  <Text style={styles.streakValue}>{currentStreak}</Text>
                  <Text style={styles.statLabel}>En cours</Text>
                </View>
                <View style={styles.streakDivider} />
                <View style={styles.streakItem}>
                  <Text style={styles.streakValue}>{longestStreak}</Text>
                  <Text style={styles.statLabel}>Record</Text>
                </View>
                <View style={styles.streakDivider} />
                <View style={styles.streakItem}>
                  <Text style={styles.streakValue}>{formattedLastReview}</Text>
                  <Text style={styles.statLabel}>Dernière révision</Text>
                </View>
              </View>
            </GlassCard>

            <GlassCard style={styles.sectionCard}>
              <View style={styles.sectionHeader}>
                <Ionicons name="analytics" size={20} color={colors.info} />
                <Text style={styles.sectionTitle}>Activité 7 jours</Text>
              </View>
              <View style={styles.chartContainer}>
                {renderActivityChart(weeklyActivity, colors.primary)}
              </View>
            </GlassCard>

            <GlassCard style={styles.sectionCard}>
              <View style={styles.sectionHeader}>
                <Ionicons name="create" size={20} color={colors.success} />
                <Text style={styles.sectionTitle}>Écriture 7 jours</Text>
              </View>
              <View style={styles.chartContainer}>
                {renderActivityChart(weeklyWritingActivity, colors.success)}
              </View>
            </GlassCard>

            <GlassCard style={styles.sectionCard}>
              <View style={styles.sectionHeader}>
                <Ionicons name="create" size={20} color={colors.info} />
                <Text style={styles.sectionTitle}>Écriture</Text>
              </View>
              <View style={styles.statsGrid}>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>{writingTotal}</Text>
                  <Text style={styles.statLabel}>Essais</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>{writingSuccessRate}%</Text>
                  <Text style={styles.statLabel}>Succès</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>{writingWords}</Text>
                  <Text style={styles.statLabel}>Mots</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>{formattedLastWriting}</Text>
                  <Text style={styles.statLabel}>Dernière session</Text>
                </View>
              </View>
            </GlassCard>
          </>
        )}
      </ScrollView>
    </Container>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  container: {
    padding: spacing.lg,
    paddingBottom: spacing.xxl,
    flexGrow: 1,
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
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.xxl,
  },
  loadingText: {
    ...typography.body,
    color: colors.textSecondary,
    marginTop: spacing.md,
  },
  sectionCard: {
    padding: spacing.lg,
    marginBottom: spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  sectionTitle: {
    ...typography.h3,
    color: colors.text,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  statItem: {
    flexGrow: 1,
    flexBasis: '45%',
    backgroundColor: colors.surfaceLight,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.glassBorder,
  },
  statValue: {
    ...typography.h2,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  statLabel: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  streakRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: spacing.md,
  },
  streakItem: {
    flexGrow: 1,
    flexBasis: '28%',
  },
  streakValue: {
    ...typography.h2,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  streakDivider: {
    width: 1,
    height: 40,
    backgroundColor: colors.glassBorder,
    borderRadius: borderRadius.round,
  },
  chartContainer: {
    backgroundColor: colors.surfaceLight,
    borderRadius: borderRadius.md,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.sm,
    borderWidth: 1,
    borderColor: colors.glassBorder,
  },
});
