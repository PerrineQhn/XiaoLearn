/**
 * Dialogues — conversations courtes pour écouter le chinois en situation.
 *
 * L'écran partage sa mise en page avec Lectures : les deux catalogues se
 * parcourent de la même façon, il serait arbitraire de les présenter
 * différemment. Tout le vocabulaire visuel vient de `components/CatalogUI` —
 * avancement en tête, filtres de niveau en deux temps, cartes à état.
 *
 * La progression est écrite par le lecteur (`dialogueReader`) sous
 * `xl_dialogues_v1` et relue ici à chaque retour, pour que le badge apparaisse
 * dès qu'on revient de l'écoute.
 */
import { useMemo, useState, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useLayout } from '@/hooks/useLayout';
import Colors from '@/constants/Colors';
import { useI18n } from '@/contexts/LanguageContext';
import {
  dialogues, availableLevels, DIALOGUE_ZH_TITLES, dialogueIcon,
  type DialogueLevel, type DialogueEntry,
} from '@/data/dialogues';
import {
  CatalogProgress, LevelFilter, CatalogCard, type CatalogState,
} from '@/components/CatalogUI';
import { DIALOGUE_PROGRESS_KEY, type DialogueProgress } from '@/app/dialogueReader';

export default function DialoguesScreen() {
  const c = Colors[useColorScheme()];
  const router = useRouter();
  const { t, pick } = useI18n();
  const { gutter, gap, columns, itemWidth } = useLayout();

  const [filter, setFilter] = useState<DialogueLevel | 'all'>('all');
  const [progress, setProgress] = useState<Record<string, DialogueProgress>>({});
  const levels = useMemo(() => availableLevels(), []);

  // Rechargée au focus, pas seulement au montage : on revient du lecteur avec
  // un badge de plus à afficher, la liste doit le montrer immédiatement.
  useFocusEffect(useCallback(() => {
    AsyncStorage.getItem(DIALOGUE_PROGRESS_KEY).then(raw => {
      if (raw) setProgress(JSON.parse(raw));
    }).catch(() => {});
  }, []));

  const counts = useMemo(() => {
    const m: Record<string, number> = { all: dialogues.length };
    for (const l of levels) m[l] = dialogues.filter(d => d.cecrLevel === l).length;
    return m;
  }, [levels]);

  const filtered = filter === 'all'
    ? dialogues
    : dialogues.filter(d => d.cecrLevel === filter);

  const listened = dialogues.filter(d => progress[d.dialogue.id]?.read).length;
  const passed = dialogues.filter(d => progress[d.dialogue.id]?.quizPassed).length;

  // Deux colonnes dès qu'une carte de 340 pt tient deux fois : l'iPad en
  // paysage affichait huit dialogues sur toute la largeur, un par ligne.
  const cols = columns(340, 2);
  const cardW = cols > 1 ? itemWidth(cols) : undefined;

  const renderItem = ({ item }: { item: DialogueEntry }) => {
    const d = item.dialogue;
    const prog = progress[d.id];
    const state: CatalogState = prog?.quizPassed ? 'done' : prog?.read ? 'seen' : 'new';
    const total = prog?.quizTotal ?? d.quiz?.length ?? 0;

    return (
      <CatalogCard
        emoji={dialogueIcon(item)}
        level={item.cecrLevel}
        theme={pick(item.theme, item.themeEn)}
        metas={[
          { icon: 'chatbubbles-outline', text: String(d.lines.length) },
          ...(d.vocab?.length ? [{ icon: 'library-outline' as const, text: String(d.vocab.length) }] : []),
        ]}
        titleZh={DIALOGUE_ZH_TITLES[d.id] ?? d.title}
        titleFr={pick(d.title, d.titleEn)}
        state={state}
        doneLabel={total ? `${prog?.quizScore ?? 0}/${total}` : undefined}
        style={cardW ? { width: cardW } : undefined}
        onPress={() => router.push({ pathname: '/dialogueReader', params: { id: d.id } } as any)}
      />
    );
  };

  return (
    <SafeAreaView style={[s.root, { backgroundColor: c.appBg }]} edges={['top']}>
      <View style={[s.header, { paddingHorizontal: gutter }]}>
        <TouchableOpacity onPress={() => router.back()} style={s.iconBtn}>
          <Ionicons name="arrow-back" size={24} color={c.textPrimary} />
        </TouchableOpacity>
        <View style={{ flex: 1, marginLeft: 4 }}>
          <Text style={[s.title, { color: c.textPrimary }]}>{t('dlg.title')}</Text>
          <Text style={[s.subtitle, { color: c.textSecondary }]}>{t('dlg.subtitle')}</Text>
        </View>
      </View>

      <CatalogProgress
        seen={listened}
        done={passed}
        total={dialogues.length}
        labelSeen={t('dlg.statListened').toLowerCase()}
        labelDone={t('lectures.quizPassed').toLowerCase()}
        gutter={gutter}
      />

      <LevelFilter
        levels={levels}
        value={filter}
        onChange={setFilter}
        counts={counts}
        gutter={gutter}
        allLabel={t('dlg.all')}
      />

      <FlatList
        // `flex: 1` — sans lui la liste se dimensionne sur son contenu et
        // comprime la rangée de filtres au-dessus. Voir `FilterChipRow`.
        style={{ flex: 1 }}
        data={filtered}
        key={cols}
        numColumns={cols}
        columnWrapperStyle={cols > 1 ? { gap } : undefined}
        keyExtractor={item => item.dialogue.id}
        contentContainerStyle={{ paddingHorizontal: gutter, paddingTop: 4, paddingBottom: 36, gap }}
        renderItem={renderItem}
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
});
