/**
 * XiaoLearn Mobile — Catalogue des Lectures
 * Filtre par niveau CECR, cards par passage, navigation vers lectureReader.
 */
import { useState, useEffect } from 'react';
import {
  View, Text, ScrollView, StyleSheet, TouchableOpacity, FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useColorScheme } from '@/hooks/useColorScheme';
import Colors from '@/constants/Colors';
import { LECTURES, type Lecture } from '@/data/cecrLectures';
import type { CecrLevelSlug } from '@/data/cecrBilans';
import { useI18n } from '@/contexts/LanguageContext';

const LECTURE_PROGRESS_KEY = 'cl_lectures_v1';

const LEVELS: { key: CecrLevelSlug | 'all'; label: string }[] = [
  { key: 'all', label: 'Tous' },
  { key: 'a1', label: 'A1' },
  { key: 'a2', label: 'A2' },
  { key: 'b1.1', label: 'B1.1' },
  { key: 'b1.2', label: 'B1.2' },
  { key: 'b2.1', label: 'B2.1' },
  { key: 'b2.2', label: 'B2.2' },
  { key: 'c1.1', label: 'C1.1' },
  { key: 'c1.2', label: 'C1.2' },
  { key: 'c2.1', label: 'C2.1' },
  { key: 'c2.2', label: 'C2.2' },
];

const LEVEL_COLORS: Record<string, string> = {
  a1: '#4CAF50', a2: '#8BC34A',
  'b1.1': '#F9A825', 'b1.2': '#FB8C00',
  'b2.1': '#F44336', 'b2.2': '#E91E63',
  'c1.1': '#9C27B0', 'c1.2': '#673AB7',
  'c2.1': '#3F51B5', 'c2.2': '#2196F3',
};

interface LectureProgress {
  read: boolean;
  quizScore?: number;
  quizPassed?: boolean;
  completedAt?: string;
}

export default function LecturesScreen() {
  const scheme = useColorScheme();
  const c = Colors[scheme];
  const router = useRouter();
  const { t, pick } = useI18n();
  const [activeLevel, setActiveLevel] = useState<CecrLevelSlug | 'all'>('all');
  const [progress, setProgress] = useState<Record<string, LectureProgress>>({});

  useEffect(() => {
    AsyncStorage.getItem(LECTURE_PROGRESS_KEY).then(raw => {
      if (raw) setProgress(JSON.parse(raw));
    });
  }, []);

  const filtered = activeLevel === 'all'
    ? LECTURES
    : LECTURES.filter(l => l.level === activeLevel);

  const totalRead = LECTURES.filter(l => progress[l.id]?.read).length;
  const totalPassed = LECTURES.filter(l => progress[l.id]?.quizPassed).length;

  return (
    <SafeAreaView style={[s.root, { backgroundColor: c.appBg }]}>
      {/* Header */}
      <View style={[s.header, { borderBottomColor: c.borderLight }]}>
        <TouchableOpacity onPress={() => router.back()} style={s.backBtn}>
          <Ionicons name="arrow-back" size={22} color={c.textPrimary} />
        </TouchableOpacity>
        <Text style={[s.headerTitle, { color: c.textPrimary }]}>{t('lectures.title')}</Text>
        <View style={{ width: 38 }} />
      </View>

      {/* Stats */}
      <View style={[s.statsRow, { backgroundColor: c.cardBg, borderColor: c.borderLight }]}>
        <View style={s.statItem}>
          <Text style={[s.statVal, { color: c.textPrimary }]}>{totalRead}</Text>
          <Text style={[s.statLbl, { color: c.textTertiary }]}>{t('lectures.read')}</Text>
        </View>
        <View style={[s.statDiv, { backgroundColor: c.borderLight }]} />
        <View style={s.statItem}>
          <Text style={[s.statVal, { color: '#4CAF50' }]}>{totalPassed}</Text>
          <Text style={[s.statLbl, { color: c.textTertiary }]}>{t('lectures.quizPassed')}</Text>
        </View>
        <View style={[s.statDiv, { backgroundColor: c.borderLight }]} />
        <View style={s.statItem}>
          <Text style={[s.statVal, { color: c.textPrimary }]}>{LECTURES.length}</Text>
          <Text style={[s.statLbl, { color: c.textTertiary }]}>{t('lectures.total')}</Text>
        </View>
      </View>

      {/* Level filter */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={s.filterScroll}
        contentContainerStyle={s.filterContent}
      >
        {LEVELS.map(lv => {
          const active = activeLevel === lv.key;
          const accent = lv.key === 'all' ? c.primaryRed : (LEVEL_COLORS[lv.key] ?? c.primaryRed);
          return (
            <TouchableOpacity
              key={lv.key}
              style={[
                s.chip,
                { borderColor: active ? accent : c.borderLight, backgroundColor: active ? accent + '18' : c.cardBg },
              ]}
              onPress={() => setActiveLevel(lv.key as CecrLevelSlug | 'all')}
            >
              <Text style={[s.chipTxt, { color: active ? accent : c.textSecondary }]}>{lv.key === 'all' ? t('dict.all') : lv.label}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Lecture list */}
      <FlatList
        data={filtered}
        keyExtractor={item => item.id}
        contentContainerStyle={s.listContent}
        renderItem={({ item }) => {
          const prog = progress[item.id];
          const accent = LEVEL_COLORS[item.level] ?? c.primaryRed;
          return (
            <TouchableOpacity
              style={[s.card, { backgroundColor: c.cardBg, borderColor: c.borderLight }]}
              activeOpacity={0.75}
              onPress={() => router.push({ pathname: '/lectureReader', params: { id: item.id } })}
            >
              <View style={s.cardTop}>
                <Text style={s.cardEmoji}>{item.emoji}</Text>
                <View style={{ flex: 1 }}>
                  <View style={s.cardMeta}>
                    <View style={[s.levelBadge, { backgroundColor: accent + '20', borderColor: accent + '60' }]}>
                      <Text style={[s.levelBadgeTxt, { color: accent }]}>{item.level.toUpperCase()}</Text>
                    </View>
                    <Text style={[s.themeTxt, { color: c.textTertiary }]}>{pick(item.theme, item.themeEn ?? item.theme)}</Text>
                    <View style={s.timeBadge}>
                      <Ionicons name="time-outline" size={11} color={c.textTertiary} />
                      <Text style={[s.timeTxt, { color: c.textTertiary }]}>{item.estimatedMinutes} min</Text>
                    </View>
                  </View>
                  <Text style={[s.cardTitle, { color: c.textPrimary }]}>{pick(item.titleFr, item.titleEn ?? item.titleFr)}</Text>
                  <Text style={[s.cardTitleZh, { color: c.textTertiary }]}>{item.titleZh}</Text>
                </View>
              </View>

              <View style={s.cardBottom}>
                {/* Status badges */}
                <View style={s.statusRow}>
                  {prog?.read && (
                    <View style={[s.statusBadge, { backgroundColor: '#2196F320' }]}>
                      <Ionicons name="eye" size={11} color="#2196F3" />
                      <Text style={[s.statusTxt, { color: '#2196F3' }]}>{t('lectures.statusRead')}</Text>
                    </View>
                  )}
                  {prog?.quizPassed && (
                    <View style={[s.statusBadge, { backgroundColor: '#4CAF5020' }]}>
                      <Ionicons name="checkmark-circle" size={11} color="#4CAF50" />
                      <Text style={[s.statusTxt, { color: '#4CAF50' }]}>
                        Quiz {prog.quizScore}/{item.questions.length}
                      </Text>
                    </View>
                  )}
                  {prog?.read && !prog.quizPassed && (
                    <View style={[s.statusBadge, { backgroundColor: '#F9A82520' }]}>
                      <Ionicons name="help-circle" size={11} color="#F9A825" />
                      <Text style={[s.statusTxt, { color: '#F9A825' }]}>{t('lectures.quizTodo')}</Text>
                    </View>
                  )}
                </View>

                <Ionicons name="chevron-forward" size={16} color={c.textTertiary} />
              </View>
            </TouchableOpacity>
          );
        }}
        ListEmptyComponent={
          <Text style={[s.empty, { color: c.textTertiary }]}>{t('lectures.empty')}</Text>
        }
      />
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

  statsRow: {
    flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center',
    marginHorizontal: 16, marginTop: 12, borderRadius: 14, borderWidth: 1, padding: 12,
  },
  statItem: { alignItems: 'center', gap: 2 },
  statVal: { fontSize: 20, fontWeight: '700' },
  statLbl: { fontSize: 11 },
  statDiv: { width: 1, height: 30 },

  filterScroll: { marginTop: 12, maxHeight: 40 },
  filterContent: { paddingHorizontal: 16, gap: 8, flexDirection: 'row' },
  chip: {
    paddingHorizontal: 14, paddingVertical: 6, borderRadius: 20, borderWidth: 1.5,
  },
  chipTxt: { fontSize: 13, fontWeight: '600' },

  listContent: { padding: 16, gap: 12, paddingBottom: 100 },
  card: {
    borderRadius: 16, borderWidth: 1, padding: 14, gap: 10,
  },
  cardTop: { flexDirection: 'row', gap: 12, alignItems: 'flex-start' },
  cardEmoji: { fontSize: 32, lineHeight: 40 },
  cardMeta: { flexDirection: 'row', alignItems: 'center', gap: 6, flexWrap: 'wrap', marginBottom: 4 },
  levelBadge: { borderRadius: 6, borderWidth: 1, paddingHorizontal: 6, paddingVertical: 2 },
  levelBadgeTxt: { fontSize: 10, fontWeight: '700' },
  themeTxt: { fontSize: 11 },
  timeBadge: { flexDirection: 'row', alignItems: 'center', gap: 2 },
  timeTxt: { fontSize: 11 },
  cardTitle: { fontSize: 15, fontWeight: '700', lineHeight: 20 },
  cardTitleZh: { fontSize: 13, marginTop: 2 },
  cardBottom: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  statusRow: { flexDirection: 'row', gap: 6, flexWrap: 'wrap' },
  statusBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    borderRadius: 8, paddingHorizontal: 8, paddingVertical: 3,
  },
  statusTxt: { fontSize: 11, fontWeight: '600' },
  empty: { textAlign: 'center', marginTop: 40, fontSize: 14 },
});
