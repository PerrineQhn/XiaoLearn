/**
 * Statistiques avancées.
 *
 * `showAdvancedStats` existait dans `AppAccess` et la page d'abonnement les
 * promettait, mais l'écran n'avait jamais été écrit. Ce fichier le comble.
 *
 * Trois questions, et rien d'autre — un tableau de bord qui affiche tout
 * n'apprend rien :
 *
 *   1. Où j'en suis dans chaque compétence ? Le SRS suit reconnaissance,
 *      prononciation et écriture séparément, mais l'app ne montrait que la
 *      reconnaissance. C'est là que se cache l'écart le plus utile : on croit
 *      « savoir » un mot qu'on ne sait pas écrire.
 *   2. Quel niveau CECR est en retard ?
 *   3. Est-ce que je travaille régulièrement ? Douze semaines de présence,
 *      plus parlant qu'un total cumulé.
 *
 * Tout se calcule à partir de données déjà stockées — état SRS, leçons
 * terminées, journal des jours pratiqués. Aucune collecte nouvelle.
 */
import { useMemo } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, useWindowDimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from '@/hooks/useColorScheme';
import Colors from '@/constants/Colors';
import { useI18n } from '@/contexts/LanguageContext';
import { useEntitlements } from '@/hooks/useEntitlements';
import { useSrs } from '@/contexts/SrsContext';
import { useUserStats } from '@/hooks/useUserStats';
import { skillLevel, type SrsSkill } from '@/hooks/useSrsData';
import { CECR_LEVELS } from '@/data/cecrLevelsMeta';
import { LESSON_DATA } from '@/data/cecrLessons';
import { PremiumGate } from '@/components/PremiumGate';
import { dayKey } from '@/data/dailyGoals';

const SKILLS: { id: SrsSkill; icon: string; key: 'stats.recognition' | 'stats.pronunciation' | 'stats.writing' }[] = [
  { id: 'recognition',   icon: '👁',  key: 'stats.recognition' },
  { id: 'pronunciation', icon: '🗣',  key: 'stats.pronunciation' },
  { id: 'writing',       icon: '✍️', key: 'stats.writing' },
];

/** Barre de progression à trois segments : maîtrisé · en cours · non vu. */
function TriBar({ mastered, learning, total, colors }: {
  mastered: number; learning: number; total: number; colors: typeof Colors.light;
}) {
  const pct = (n: number) => (total > 0 ? `${(n / total) * 100}%` : '0%');
  return (
    <View style={[s.track, { backgroundColor: colors.borderLight }]}>
      <View style={{ width: pct(mastered) as any, backgroundColor: colors.jadeGreen }} />
      <View style={{ width: pct(learning) as any, backgroundColor: '#F59E0B' }} />
    </View>
  );
}

export default function StatistiquesScreen() {
  const scheme = useColorScheme();
  const c = Colors[scheme];
  const router = useRouter();
  const { t } = useI18n();
  const { width } = useWindowDimensions();
  const px = width >= 768 ? 24 : 16;
  const { access } = useEntitlements();
  const { allCards, srsState } = useSrs();
  const { stats } = useUserStats();

  /** Répartition par compétence — le cœur de l'écran. */
  const bySkill = useMemo(() => SKILLS.map(sk => {
    let mastered = 0, learning = 0;
    for (const card of allCards) {
      const lvl = skillLevel(srsState[card.id], sk.id);
      if (lvl >= 4) mastered++;
      else if (lvl > 0) learning++;
    }
    return { ...sk, mastered, learning, total: allCards.length };
  }), [allCards, srsState]);

  /** Avancement des leçons, niveau CECR par niveau CECR. */
  const byLevel = useMemo(() => {
    const done = new Set(stats.completedLessonIds);
    return CECR_LEVELS.map(level => {
      const ids = level.modules.flatMap(m => (LESSON_DATA[m.id] ?? []).map(l => l.id));
      return {
        id: level.id,
        label: level.label,
        color: level.color,
        done: ids.filter(i => done.has(i)).length,
        total: ids.length,
      };
    }).filter(l => l.total > 0);
  }, [stats.completedLessonIds]);

  /** Douze semaines de présence : une case par jour, vide ou pleine. */
  const weeks = useMemo(() => {
    const set = new Set(stats.studyDays);
    const out: { day: string; active: boolean }[] = [];
    for (let i = 83; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const k = dayKey(d);
      out.push({ day: k, active: set.has(k) });
    }
    return out;
  }, [stats.studyDays]);

  const activeDays = weeks.filter(w => w.active).length;

  return (
    <SafeAreaView style={[s.root, { backgroundColor: c.appBg }]}>
      <View style={[s.header, { paddingHorizontal: px }]}>
        <TouchableOpacity
          onPress={() => (router.canGoBack() ? router.back() : router.replace('/(tabs)' as any))}
          style={s.back}
        >
          <Ionicons name="arrow-back" size={22} color={c.textPrimary} />
        </TouchableOpacity>
        <Text style={[s.title, { color: c.textPrimary }]}>{t('stats.title')}</Text>
      </View>

      {!access.showAdvancedStats ? (
        <PremiumGate colors={c} titleKey="gate.statsTitle" bodyKey="gate.statsBody" />
      ) : (
        <ScrollView contentContainerStyle={{ paddingHorizontal: px, paddingBottom: 40, gap: 22 }}>

          {/* 1 — Par compétence */}
          <View style={s.block}>
            <Text style={[s.h2, { color: c.textPrimary }]}>{t('stats.bySkill')}</Text>
            <Text style={[s.hint, { color: c.textTertiary }]}>{t('stats.bySkillHint')}</Text>
            {bySkill.map(sk => (
              <View key={sk.id} style={[s.card, { backgroundColor: c.cardBg, borderColor: c.borderLight }]}>
                <View style={s.cardTop}>
                  <Text style={s.emoji}>{sk.icon}</Text>
                  <Text style={[s.cardTitle, { color: c.textPrimary }]}>{t(sk.key)}</Text>
                  <View style={{ flex: 1 }} />
                  <Text style={[s.big, { color: c.jadeGreen }]}>{sk.mastered}</Text>
                  <Text style={[s.small, { color: c.textTertiary }]}> / {sk.total}</Text>
                </View>
                <TriBar mastered={sk.mastered} learning={sk.learning} total={sk.total} colors={c} />
                <Text style={[s.legend, { color: c.textTertiary }]}>
                  {t('stats.legend', { mastered: sk.mastered, learning: sk.learning })}
                </Text>
              </View>
            ))}
          </View>

          {/* 2 — Par niveau */}
          <View style={s.block}>
            <Text style={[s.h2, { color: c.textPrimary }]}>{t('stats.byLevel')}</Text>
            <View style={[s.card, { backgroundColor: c.cardBg, borderColor: c.borderLight, gap: 11 }]}>
              {byLevel.map(l => (
                <View key={l.id} style={s.levelRow}>
                  <View style={[s.levelChip, { backgroundColor: l.color + '20' }]}>
                    <Text style={[s.levelTxt, { color: l.color }]}>{l.label}</Text>
                  </View>
                  <View style={[s.track, { backgroundColor: c.borderLight, flex: 1 }]}>
                    <View style={{ width: `${(l.done / l.total) * 100}%` as any, backgroundColor: l.color }} />
                  </View>
                  <Text style={[s.small, { color: c.textSecondary, width: 58, textAlign: 'right' }]}>
                    {l.done}/{l.total}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          {/* 3 — Régularité */}
          <View style={s.block}>
            <Text style={[s.h2, { color: c.textPrimary }]}>{t('stats.consistency')}</Text>
            <View style={[s.card, { backgroundColor: c.cardBg, borderColor: c.borderLight }]}>
              <Text style={[s.hint, { color: c.textTertiary, marginBottom: 10 }]}>
                {t('stats.activeDays', { n: activeDays, total: weeks.length })}
              </Text>
              <View style={s.grid}>
                {weeks.map(w => (
                  <View
                    key={w.day}
                    style={[s.cell, {
                      backgroundColor: w.active ? c.primaryRed : c.borderLight,
                      opacity: w.active ? 1 : 0.5,
                    }]}
                  />
                ))}
              </View>
            </View>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  root: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingTop: 8, paddingBottom: 12 },
  back: { width: 38, height: 38, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 22, fontWeight: '800' },

  block: { gap: 9 },
  h2: { fontSize: 16, fontWeight: '800' },
  hint: { fontSize: 12.5, lineHeight: 18 },

  card: { borderRadius: 14, borderWidth: 1, padding: 14, gap: 9 },
  cardTop: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  emoji: { fontSize: 16 },
  cardTitle: { fontSize: 14, fontWeight: '700' },
  big: { fontSize: 19, fontWeight: '800' },
  small: { fontSize: 12.5, fontWeight: '600' },
  legend: { fontSize: 11.5 },

  track: { height: 8, borderRadius: 4, overflow: 'hidden', flexDirection: 'row' },

  levelRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  levelChip: { width: 46, borderRadius: 8, paddingVertical: 3, alignItems: 'center' },
  levelTxt: { fontSize: 11.5, fontWeight: '800' },

  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 3 },
  cell: { width: 11, height: 11, borderRadius: 3 },
});
