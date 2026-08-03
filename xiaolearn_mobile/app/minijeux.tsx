/**
 * XiaoLearn Mobile — Hub Mini-jeux
 * 5 jeux : Memory, Speed Quiz, Falling, Sentence Builder, Pinyin Typing
 */
import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useFocusEffect } from 'expo-router';
import { useCallback } from 'react';
import { useColorScheme } from '@/hooks/useColorScheme';
import Colors from '@/constants/Colors';
import { useI18n } from '@/contexts/LanguageContext';
import { type TransKey } from '@/i18n/translations';
import { loadProgress, type MinijeuxProgress, type GameId } from '@/data/minijeuxHelpers';
import { useEntitlements } from '@/hooks/useEntitlements';

interface GameDef {
  id: GameId;
  emoji: string;
  titleKey: TransKey;
  descKey: TransKey;
  color: string;
  route: string;
}

const GAMES: GameDef[] = [
  { id: 'memory',    emoji: '🃏',   titleKey: 'games.memory.title',    descKey: 'games.memory.desc',    color: '#4CAF50', route: '/jeuMemory' },
  { id: 'speedquiz', emoji: '⚡',   titleKey: 'games.speedquiz.title', descKey: 'games.speedquiz.desc', color: '#F9A825', route: '/jeuSpeedQuiz' },
  { id: 'falling',   emoji: '🌧️',  titleKey: 'games.falling.title',   descKey: 'games.falling.desc',   color: '#E91E63', route: '/jeuFalling' },
  { id: 'sentence',  emoji: '🧩',   titleKey: 'games.sentence.title',  descKey: 'games.sentence.desc',  color: '#9C27B0', route: '/jeuSentence' },
  { id: 'pinyin',    emoji: '🎤',   titleKey: 'games.pinyin.title',    descKey: 'games.pinyin.desc',    color: '#2196F3', route: '/jeuPinyin' },
];

export default function MinijeuxScreen() {
  const scheme = useColorScheme();
  const c = Colors[scheme];
  const router = useRouter();
  const { t } = useI18n();
  const { access } = useEntitlements();
  const [progress, setProgress] = useState<MinijeuxProgress | null>(null);

  useFocusEffect(useCallback(() => {
    loadProgress().then(setProgress);
  }, []));

  const totalPlays = progress
    ? Object.values(progress).reduce((acc, g) => acc + g.plays, 0)
    : 0;

  return (
    <SafeAreaView style={[s.root, { backgroundColor: c.appBg }]}>
      <View style={[s.header, { borderBottomColor: c.borderLight }]}>
        <TouchableOpacity onPress={() => router.back()} style={s.backBtn}>
          <Ionicons name="arrow-back" size={22} color={c.textPrimary} />
        </TouchableOpacity>
        <Text style={[s.headerTitle, { color: c.textPrimary }]}>{t('games.hubTitle')}</Text>
        <View style={{ width: 38 }} />
      </View>

      <ScrollView contentContainerStyle={s.body}>
        <Text style={[s.intro, { color: c.textSecondary }]}>
          {t('games.intro')}
        </Text>

        {totalPlays > 0 && (
          <View style={[s.statsBar, { backgroundColor: c.cardBg, borderColor: c.borderLight }]}>
            <Ionicons name="game-controller-outline" size={16} color={c.primaryRed} />
            <Text style={[s.statsText, { color: c.textSecondary }]}>
              {t('games.plays', { n: totalPlays })}
            </Text>
          </View>
        )}

        {GAMES.map((game, gi) => {
          const score = progress?.[game.id];
          const hasPlayed = (score?.plays ?? 0) > 0;
          // Les `maxMiniGames` premiers jeux sont ouverts ; les suivants
          // restent visibles mais verrouillés — on ne cache pas ce qu'on vend.
          const locked = gi >= access.maxMiniGames;
          return (
            <TouchableOpacity
              key={game.id}
              style={[s.card, {
                backgroundColor: c.cardBg,
                borderColor: locked ? c.primaryRed + '35' : c.borderLight,
                opacity: locked ? 0.75 : 1,
              }]}
              activeOpacity={0.75}
              onPress={() => router.push((locked ? '/abonnement' : game.route) as any)}
            >
              <View style={[s.cardLeft, { backgroundColor: game.color + '18' }]}>
                <Text style={s.cardEmoji}>{game.emoji}</Text>
              </View>
              <View style={s.cardBody}>
                <View style={s.cardTitleRow}>
                  <Text style={[s.cardTitle, { color: c.textPrimary }]}>{t(game.titleKey)}</Text>
                  {hasPlayed && (
                    <View style={[s.playedBadge, { backgroundColor: game.color + '20' }]}>
                      <Text style={[s.playedTxt, { color: game.color }]}>
                        {score!.plays}×
                      </Text>
                    </View>
                  )}
                </View>
                <Text style={[s.cardDesc, { color: c.textTertiary }]} numberOfLines={2}>
                  {t(game.descKey)}
                </Text>
                {hasPlayed && score!.bestScore > 0 && (
                  <Text style={[s.cardScore, { color: game.color }]}>
                    {game.id === 'memory' && score!.bestTime
                      ? `⏱ ${score!.bestTime}s`
                      : `🏆 ${score!.bestScore} pts`}
                  </Text>
                )}
              </View>
              <Ionicons
                name={locked ? 'lock-closed' : 'chevron-forward'}
                size={locked ? 16 : 18}
                color={locked ? c.primaryRed : c.textTertiary}
              />
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  root: { flex: 1 },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1,
  },
  backBtn: { width: 38, height: 38, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontSize: 17, fontWeight: '700' },
  body: { padding: 16, gap: 12, paddingBottom: 80 },
  intro: { fontSize: 14, lineHeight: 20 },
  statsBar: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    borderRadius: 12, borderWidth: 1, paddingHorizontal: 14, paddingVertical: 10,
  },
  statsText: { fontSize: 13 },
  card: {
    flexDirection: 'row', alignItems: 'center', gap: 14,
    borderRadius: 16, borderWidth: 1, padding: 14,
  },
  cardLeft: {
    width: 56, height: 56, borderRadius: 14,
    alignItems: 'center', justifyContent: 'center', flexShrink: 0,
  },
  cardEmoji: { fontSize: 26 },
  cardBody: { flex: 1, gap: 3 },
  cardTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  cardTitle: { fontSize: 15, fontWeight: '700' },
  playedBadge: { borderRadius: 6, paddingHorizontal: 6, paddingVertical: 2 },
  playedTxt: { fontSize: 11, fontWeight: '700' },
  cardDesc: { fontSize: 12, lineHeight: 17 },
  cardScore: { fontSize: 12, fontWeight: '700', marginTop: 2 },
});
