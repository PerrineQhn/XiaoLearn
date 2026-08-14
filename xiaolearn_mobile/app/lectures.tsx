/**
 * Lectures — catalogue des passages de lecture, par niveau CECR.
 *
 * Même mise en page que Dialogues, et pour la même raison : les deux écrans
 * présentent un catalogue que l'on parcourt puis que l'on valide par un quiz.
 * Tout le vocabulaire visuel vient de `components/CatalogUI`.
 *
 * Le cas des Lectures rendait l'ancienne rangée de filtres particulièrement
 * inconfortable — onze niveaux, de A1 à C2.2, dont on ne voyait que les
 * premiers sans faire défiler. `LevelFilter` les regroupe par tranche.
 */
import { useState, useMemo, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useLayout } from '@/hooks/useLayout';
import Colors from '@/constants/Colors';
import { LECTURES } from '@/data/cecrLectures';
import type { CecrLevelSlug } from '@/data/cecrBilans';
import { useI18n } from '@/contexts/LanguageContext';
import {
  CatalogProgress, LevelFilter, CatalogCard, type CatalogState,
} from '@/components/CatalogUI';

const LECTURE_PROGRESS_KEY = 'cl_lectures_v1';

/** Ordre du CECR — sert aussi à trier les tranches du filtre. */
const LEVEL_ORDER: CecrLevelSlug[] = [
  'a1', 'a2', 'b1.1', 'b1.2', 'b2.1', 'b2.2', 'c1.1', 'c1.2', 'c2.1', 'c2.2',
];

interface LectureProgress {
  read: boolean;
  quizScore?: number;
  quizPassed?: boolean;
  completedAt?: string;
}

export default function LecturesScreen() {
  const c = Colors[useColorScheme()];
  const router = useRouter();
  const { t, pick } = useI18n();
  const { gutter, gap, columns, itemWidth } = useLayout();

  const [activeLevel, setActiveLevel] = useState<CecrLevelSlug | 'all'>('all');
  const [progress, setProgress] = useState<Record<string, LectureProgress>>({});

  // Au focus et pas au montage : revenir du lecteur doit mettre la liste à jour.
  useFocusEffect(useCallback(() => {
    AsyncStorage.getItem(LECTURE_PROGRESS_KEY).then(raw => {
      if (raw) setProgress(JSON.parse(raw));
    }).catch(() => {});
  }, []));

  const levels = useMemo(
    () => LEVEL_ORDER.filter(lv => LECTURES.some(l => l.level === lv)),
    [],
  );
  const counts = useMemo(() => {
    const m: Record<string, number> = { all: LECTURES.length };
    for (const lv of levels) m[lv] = LECTURES.filter(l => l.level === lv).length;
    return m;
  }, [levels]);

  const filtered = activeLevel === 'all'
    ? LECTURES
    : LECTURES.filter(l => l.level === activeLevel);

  const totalRead = LECTURES.filter(l => progress[l.id]?.read).length;
  const totalPassed = LECTURES.filter(l => progress[l.id]?.quizPassed).length;

  const cols = columns(340, 2);
  const cardW = cols > 1 ? itemWidth(cols) : undefined;

  return (
    <SafeAreaView style={[s.root, { backgroundColor: c.appBg }]} edges={['top']}>
      <View style={[s.header, { paddingHorizontal: gutter }]}>
        <TouchableOpacity onPress={() => router.back()} style={s.iconBtn}>
          <Ionicons name="arrow-back" size={24} color={c.textPrimary} />
        </TouchableOpacity>
        <View style={{ flex: 1, marginLeft: 4 }}>
          <Text style={[s.title, { color: c.textPrimary }]}>{t('lectures.title')}</Text>
          <Text style={[s.subtitle, { color: c.textSecondary }]}>{t('lectures.subtitle')}</Text>
        </View>
      </View>

      <CatalogProgress
        seen={totalRead}
        done={totalPassed}
        total={LECTURES.length}
        labelSeen={t('lectures.read').toLowerCase()}
        labelDone={t('lectures.quizPassed').toLowerCase()}
        gutter={gutter}
      />

      <LevelFilter
        levels={levels}
        value={activeLevel}
        onChange={setActiveLevel}
        counts={counts}
        gutter={gutter}
        allLabel={t('dict.all')}
      />

      <FlatList
        // `flex: 1` — sans lui la liste déborde et Yoga comprime la rangée de
        // filtres au-dessus, dont les pastilles se retrouvent rognées.
        style={{ flex: 1 }}
        data={filtered}
        key={cols}
        numColumns={cols}
        columnWrapperStyle={cols > 1 ? { gap } : undefined}
        keyExtractor={item => item.id}
        contentContainerStyle={{ paddingHorizontal: gutter, paddingTop: 4, paddingBottom: 36, gap }}
        renderItem={({ item }) => {
          const prog = progress[item.id];
          const state: CatalogState = prog?.quizPassed ? 'done' : prog?.read ? 'seen' : 'new';
          return (
            <CatalogCard
              emoji={item.emoji}
              level={item.level}
              theme={pick(item.theme, item.themeEn ?? item.theme)}
              metas={[{ icon: 'time-outline', text: `${item.estimatedMinutes} min` }]}
              titleZh={item.titleZh}
              titleFr={pick(item.titleFr, item.titleEn ?? item.titleFr)}
              state={state}
              doneLabel={`${prog?.quizScore ?? 0}/${item.questions.length}`}
              style={cardW ? { width: cardW } : undefined}
              onPress={() => router.push({ pathname: '/lectureReader', params: { id: item.id } })}
            />
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
  header: { flexDirection: 'row', alignItems: 'center', paddingTop: 8, paddingBottom: 4 },
  iconBtn: { width: 38, height: 38, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 22, fontWeight: '800' },
  subtitle: { fontSize: 12.5, marginTop: 1 },
  empty: { textAlign: 'center', marginTop: 40, fontSize: 14 },
});
