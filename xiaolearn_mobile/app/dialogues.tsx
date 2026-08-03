/**
 * Dialogues — conversations courtes pour écouter le chinois en situation.
 *
 * Reprend l'écran du web : filtres par niveau CECR, cartes groupées par
 * niveau, titre chinois + traduction, nombre de répliques et de mots.
 * Toucher une carte ouvre le lecteur (dialogueReader).
 */
import { useMemo, useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, useWindowDimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useColorScheme } from '@/hooks/useColorScheme';
import Colors from '@/constants/Colors';
import { useI18n } from '@/contexts/LanguageContext';
import {
  dialogues, availableLevels, LEVEL_LABEL, THEME_ICON, DIALOGUE_ZH_TITLES,
  type DialogueLevel,
} from '@/data/dialogues';

export default function DialoguesScreen() {
  const scheme = useColorScheme();
  const c = Colors[scheme];
  const router = useRouter();
  const { t, pick } = useI18n();
  const { width } = useWindowDimensions();
  const px = width >= 768 ? 24 : 16;
  const cols = width >= 768 ? 3 : 1;

  const [filter, setFilter] = useState<DialogueLevel | 'all'>('all');
  const levels = useMemo(() => availableLevels(), []);

  const counts = useMemo(() => {
    const m: Record<string, number> = { all: dialogues.length };
    for (const l of levels) m[l] = dialogues.filter(d => d.cecrLevel === l).length;
    return m;
  }, [levels]);

  const shown = filter === 'all' ? levels : [filter];

  return (
    <SafeAreaView style={[s.root, { backgroundColor: c.appBg }]} edges={['top']}>
      <View style={[s.header, { paddingHorizontal: px }]}>
        <TouchableOpacity onPress={() => router.back()} style={s.iconBtn}>
          <Ionicons name="arrow-back" size={24} color={c.textPrimary} />
        </TouchableOpacity>
        <View style={{ flex: 1, marginLeft: 4 }}>
          <Text style={[s.title, { color: c.textPrimary }]}>{t('dlg.title')}</Text>
          <Text style={[s.subtitle, { color: c.textSecondary }]}>{t('dlg.subtitle')}</Text>
        </View>
      </View>

      {/* Filtres par niveau */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ flexGrow: 0, height: 52 }}
        contentContainerStyle={{ paddingHorizontal: px, gap: 8, paddingVertical: 4, alignItems: 'center' }}
      >
        {(['all', ...levels] as const).map(lv => {
          const on = filter === lv;
          return (
            <TouchableOpacity
              key={lv}
              onPress={() => setFilter(lv as DialogueLevel | 'all')}
              style={[s.chip, {
                backgroundColor: on ? c.primaryRed : c.cardBg,
                borderColor: on ? c.primaryRed : c.borderLight,
              }]}
            >
              <Text style={[s.chipTxt, { color: on ? '#FFF' : c.textSecondary }]}>
                {lv === 'all' ? t('dlg.all') : LEVEL_LABEL[lv as DialogueLevel]}
                <Text style={{ color: on ? '#FFFFFFAA' : c.textTertiary }}>{`  ${counts[lv] ?? 0}`}</Text>
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <ScrollView contentContainerStyle={{ paddingHorizontal: px, paddingBottom: 36, paddingTop: 8 }}>
        {shown.map(level => {
          const items = dialogues.filter(d => d.cecrLevel === level);
          if (items.length === 0) return null;
          return (
            <View key={level} style={{ marginBottom: 22 }}>
              <View style={s.levelHead}>
                <View style={[s.levelBadge, { backgroundColor: c.jadeGreenLight }]}>
                  <Text style={[s.levelBadgeTxt, { color: c.jadeGreen }]}>{LEVEL_LABEL[level]}</Text>
                </View>
                <Text style={[s.levelCount, { color: c.textTertiary }]}>{items.length}</Text>
              </View>

              <View style={[s.grid, cols > 1 && { flexDirection: 'row', flexWrap: 'wrap' }]}>
                {items.map(({ theme, themeEn, dialogue: d }) => {
                  const words = d.vocab?.length ?? 0;
                  return (
                    <TouchableOpacity
                      key={d.id}
                      activeOpacity={0.85}
                      onPress={() => router.push({ pathname: '/dialogueReader', params: { id: d.id } } as any)}
                      style={[s.card, { backgroundColor: c.cardBg, borderColor: c.borderLight },
                        cols > 1 && { width: `${100 / cols - 2}%` }]}
                    >
                      <View style={s.cardTop}>
                        <View style={[s.emojiBox, { backgroundColor: c.cardBgAlt }]}>
                          <Text style={{ fontSize: 22 }}>{THEME_ICON[theme] ?? '💬'}</Text>
                        </View>
                        <View style={[s.lvlPill, { backgroundColor: c.jadeGreenLight }]}>
                          <Text style={[s.lvlPillTxt, { color: c.jadeGreen }]}>{LEVEL_LABEL[level]}</Text>
                        </View>
                      </View>

                      <Text style={[s.theme, { color: c.textTertiary }]}>
                        {pick(theme, themeEn).toUpperCase()}
                      </Text>
                      <Text style={[s.hanzi, { color: c.textPrimary }]} numberOfLines={1}>
                        {DIALOGUE_ZH_TITLES[d.id] ?? d.title}
                      </Text>
                      <Text style={[s.trans, { color: c.textSecondary }]} numberOfLines={1}>
                        {pick(d.title, d.titleEn)}
                      </Text>

                      <View style={[s.meta, { borderTopColor: c.borderLight }]}>
                        <Ionicons name="chatbubbles-outline" size={13} color={c.textTertiary} />
                        <Text style={[s.metaTxt, { color: c.textTertiary }]}>
                          {t('dlg.lines', { n: d.lines.length })}
                        </Text>
                        {words > 0 && (
                          <>
                            <Ionicons name="library-outline" size={13} color={c.textTertiary} style={{ marginLeft: 10 }} />
                            <Text style={[s.metaTxt, { color: c.textTertiary }]}>
                              {t('dlg.words', { n: words })}
                            </Text>
                          </>
                        )}
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  root: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', paddingTop: 8, paddingBottom: 12 },
  iconBtn: { width: 38, height: 38, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 22, fontWeight: '800' },
  subtitle: { fontSize: 12.5, marginTop: 1 },
  chip: { paddingHorizontal: 14, paddingVertical: 9, borderRadius: 20, borderWidth: 1.5 },
  chipTxt: { fontSize: 13, fontWeight: '700', lineHeight: 17 },
  levelHead: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 10, marginTop: 6 },
  levelBadge: { borderRadius: 8, paddingHorizontal: 9, paddingVertical: 3 },
  levelBadgeTxt: { fontSize: 12, fontWeight: '800' },
  levelCount: { fontSize: 13, fontWeight: '600' },
  grid: { gap: 10 },
  card: { borderRadius: 16, borderWidth: 1, padding: 14 },
  cardTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 },
  emojiBox: { width: 42, height: 42, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  lvlPill: { borderRadius: 8, paddingHorizontal: 8, paddingVertical: 3 },
  lvlPillTxt: { fontSize: 11, fontWeight: '800' },
  theme: { fontSize: 10.5, fontWeight: '800', letterSpacing: 0.6, marginBottom: 3 },
  hanzi: { fontSize: 19, fontWeight: '500', letterSpacing: 0.5 },
  trans: { fontSize: 13.5, marginTop: 2 },
  meta: { flexDirection: 'row', alignItems: 'center', gap: 4, borderTopWidth: 1, marginTop: 11, paddingTop: 9 },
  metaTxt: { fontSize: 12 },
});
