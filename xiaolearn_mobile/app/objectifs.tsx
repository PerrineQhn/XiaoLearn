/**
 * Réglage des objectifs quotidiens.
 *
 * ## Pourquoi cette refonte
 *
 * La version précédente montrait trois emplacements, chacun à déplier pour
 * découvrir qu'il existait huit objectifs possibles. Personne ne déplie un
 * chevron sans raison de le faire : le catalogue restait invisible, et l'écran
 * donnait l'impression qu'il n'y avait que trois objectifs en tout.
 *
 * On affiche donc **la liste complète**, et on coche. Le nombre de cases
 * cochables est la seule contrainte, elle est annoncée en haut et rappelée
 * quand on l'atteint. La cible de chaque objectif choisi apparaît sous sa
 * ligne — là où on la cherche, au moment où elle devient pertinente.
 */
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from '@/hooks/useColorScheme';
import Colors from '@/constants/Colors';
import { useI18n } from '@/contexts/LanguageContext';
import { useDailyGoals } from '@/hooks/useDailyGoals';
import { GOAL_CATALOG, GOAL_SLOTS } from '@/data/dailyGoals';

export default function ObjectifsScreen() {
  const scheme = useColorScheme();
  const c = Colors[scheme];
  const router = useRouter();
  const { t } = useI18n();
  const { config, toggle, setTarget, resetToDefaults } = useDailyGoals();

  const full = config.selected.length >= GOAL_SLOTS;

  return (
    <SafeAreaView style={[s.root, { backgroundColor: c.appBg }]}>
      <View style={s.header}>
        <TouchableOpacity
          onPress={() => (router.canGoBack() ? router.back() : router.replace('/(tabs)' as any))}
          style={s.back}
        >
          <Ionicons name="arrow-back" size={22} color={c.textPrimary} />
        </TouchableOpacity>
        <Text style={[s.title, { color: c.textPrimary }]}>{t('goal.title')}</Text>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        <View style={s.introRow}>
          <Text style={[s.intro, { color: c.textSecondary }]}>{t('goal.pick')}</Text>
          <Text style={[s.counter, { color: full ? c.primaryRed : c.textTertiary }]}>
            {config.selected.length}/{GOAL_SLOTS}
          </Text>
        </View>
        {full && (
          <Text style={[s.fullHint, { color: c.textTertiary }]}>{t('goal.fullHint')}</Text>
        )}

        <View style={s.list}>
          {GOAL_CATALOG.map(g => {
            const on = config.selected.includes(g.id);
            // Une ligne non cochée alors que les trois places sont prises reste
            // visible mais inerte : masquer le reste du catalogue reproduirait
            // exactement le défaut qu'on corrige.
            const blocked = !on && full;
            const target = config.targets[g.id] ?? g.presets[0];

            return (
              <View
                key={g.id}
                style={[s.card, {
                  backgroundColor: c.cardBg,
                  borderColor: on ? c.primaryRed + '55' : c.borderLight,
                  opacity: blocked ? 0.45 : 1,
                }]}
              >
                <TouchableOpacity
                  style={s.row}
                  onPress={() => toggle(g.id)}
                  disabled={blocked}
                  activeOpacity={0.75}
                >
                  <View style={[s.check, on
                    ? { backgroundColor: c.primaryRed, borderColor: c.primaryRed }
                    : { borderColor: c.borderMedium }]}
                  >
                    {on && <Ionicons name="checkmark" size={14} color="#FFF" />}
                  </View>
                  <View style={[s.iconBox, { backgroundColor: on ? c.primaryRedLight : c.cardBgAlt }]}>
                    <Ionicons name={g.icon} size={17} color={on ? c.primaryRed : c.textTertiary} />
                  </View>
                  <Text style={[s.name, { color: c.textPrimary }]}>{t(g.nameKey)}</Text>
                  <View style={{ flex: 1 }} />
                  {on && (
                    <Text style={[s.targetPreview, { color: c.textTertiary }]}>{target}</Text>
                  )}
                </TouchableOpacity>

                {/* La cible n'apparaît qu'une fois l'objectif choisi : avant, la
                    question ne se pose pas. */}
                {on && (
                  <View style={s.opts}>
                    {g.presets.map(v => {
                      const sel = v === target;
                      return (
                        <TouchableOpacity
                          key={v}
                          onPress={() => setTarget(g.id, v)}
                          activeOpacity={0.8}
                          style={[s.opt, {
                            backgroundColor: sel ? c.primaryRed : 'transparent',
                            borderColor: sel ? c.primaryRed : c.borderMedium,
                          }]}
                        >
                          <Text style={[s.optTxt, { color: sel ? '#FFF' : c.textSecondary }]}>{v}</Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                )}
              </View>
            );
          })}
        </View>

        <TouchableOpacity onPress={resetToDefaults} style={s.reset} activeOpacity={0.7}>
          <Ionicons name="refresh-outline" size={14} color={c.textTertiary} />
          <Text style={[s.resetTxt, { color: c.textTertiary }]}>{t('goal.reset')}</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  root: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 16, paddingTop: 8, paddingBottom: 12 },
  back: { width: 38, height: 38, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 22, fontWeight: '800' },

  introRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, marginBottom: 4 },
  intro: { fontSize: 13.5, flex: 1 },
  counter: { fontSize: 13, fontWeight: '800' },
  fullHint: { fontSize: 11.5, paddingHorizontal: 16, marginBottom: 8 },

  list: { paddingHorizontal: 16, gap: 9, marginTop: 8 },
  card: { borderRadius: 14, borderWidth: 1, paddingHorizontal: 12, paddingVertical: 11, gap: 11 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  check: {
    width: 22, height: 22, borderRadius: 7, borderWidth: 1.5,
    alignItems: 'center', justifyContent: 'center',
  },
  iconBox: { width: 30, height: 30, borderRadius: 9, alignItems: 'center', justifyContent: 'center' },
  name: { fontSize: 14.5, fontWeight: '700' },
  targetPreview: { fontSize: 13, fontWeight: '700' },

  opts: { flexDirection: 'row', gap: 7 },
  opt: {
    flex: 1, height: 33, borderRadius: 9, borderWidth: 1.5,
    alignItems: 'center', justifyContent: 'center',
  },
  optTxt: { fontSize: 12.5, fontWeight: '700' },

  reset: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, marginTop: 14, padding: 12 },
  resetTxt: { fontSize: 12.5, fontWeight: '600' },
});
