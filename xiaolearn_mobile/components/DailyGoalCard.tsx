/**
 * DailyGoalCard — l'objectif du jour, en trois tâches choisies.
 *
 * Les trois lignes ne sont plus imposées : l'utilisateur les prend dans
 * `GOAL_CATALOG` (cartes, XP, leçons, dictée, dialogues, lectures, mini-jeux,
 * écriture). Quelqu'un qui travaille sa compréhension orale ne se reconnaît pas
 * dans « leçons terminées », et un objectif qui ne parle pas de ce qu'on est
 * venu faire ne sert à rien.
 *
 * Une seule tâche porte un bouton, celle de la première qui reste : trois
 * boutons côte à côte ne diraient plus par où commencer.
 */
import { useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import type Colors from '@/constants/Colors';
import { useI18n } from '@/contexts/LanguageContext';
import { useDailyGoals } from '@/hooks/useDailyGoals';
import type { UserStats } from '@/hooks/useUserStats';
import { GOAL_BY_ID, type GoalId } from '@/data/dailyGoals';

type Palette = typeof Colors.light;

export function DailyGoalCard({
  colors, px, stats,
}: {
  colors: Palette;
  px: number;
  stats: UserStats;
}) {
  const { t } = useI18n();
  const router = useRouter();
  const { config } = useDailyGoals();

  /** Avancement d'un objectif. `xp` vient du journal d'activité, pas du blob. */
  const valueOf = (id: GoalId) => (id === 'xp' ? stats.xpToday : stats.daily[id] ?? 0);

  const tasks = useMemo(() => config.selected.map(id => {
    const meta = GOAL_BY_ID[id];
    const target = config.targets[id] ?? meta.presets[0];
    const value = valueOf(id);
    return {
      id, meta, target, value,
      done: value >= target,
      label: t(meta.labelKey, { n: Math.min(value, target), total: target }),
    };
  }), [config, stats, t]);

  const done = tasks.filter(x => x.done).length;
  const allDone = done === tasks.length;
  const actionable = tasks.find(x => !x.done);

  return (
    <View style={{ paddingHorizontal: px }}>
      <View style={[s.card, {
        backgroundColor: colors.cardBg,
        borderColor: allDone ? colors.primaryRed + '55' : colors.borderLight,
      }]}>
        <View style={s.head}>
          <Ionicons
            name={allDone ? 'trophy' : 'flag-outline'}
            size={16}
            color={allDone ? colors.primaryRed : colors.textSecondary}
          />
          <Text style={[s.title, { color: colors.textPrimary }]}>{t('goal.title')}</Text>
          <View style={{ flex: 1 }} />
          <Text style={[s.count, { color: allDone ? colors.primaryRed : colors.textTertiary }]}>
            {t('goal.progress', { n: done, total: tasks.length })}
          </Text>
          {/* Réglage des objectifs. Icône seule : le titre dit déjà de quoi il
              s'agit, et un libellé prendrait la moitié de l'en-tête pour une
              action qu'on fait une fois. */}
          <TouchableOpacity
            onPress={() => router.push('/objectifs' as any)}
            hitSlop={10}
            accessibilityLabel={t('goal.customize')}
            style={[s.gear, { borderColor: colors.borderLight }]}
            activeOpacity={0.7}
          >
            <Ionicons name="options-outline" size={14} color={colors.textSecondary} />
          </TouchableOpacity>
        </View>

        {tasks.map(task => (
          <View key={task.id} style={s.row}>
            <View style={[s.tick, task.done
              ? { backgroundColor: colors.primaryRed, borderColor: colors.primaryRed }
              : { borderColor: colors.borderMedium }]}
            >
              {task.done && <Ionicons name="checkmark" size={11} color="#FFF" />}
            </View>
            <Ionicons
              name={task.meta.icon}
              size={14}
              color={task.done ? colors.textTertiary : colors.textSecondary}
            />
            <Text
              style={[s.label, {
                color: task.done ? colors.textTertiary : colors.textPrimary,
                textDecorationLine: task.done ? 'line-through' : 'none',
              }]}
              numberOfLines={1}
            >
              {task.label}
            </Text>
            {actionable?.id === task.id && (
              <TouchableOpacity
                onPress={() => router.push(task.meta.route as any)}
                style={[s.btn, { backgroundColor: colors.primaryRed }]}
                activeOpacity={0.85}
              >
                <Text style={s.btnTxt}>{t(task.meta.actionKey)}</Text>
              </TouchableOpacity>
            )}
          </View>
        ))}
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  card: { borderRadius: 16, borderWidth: 1, paddingHorizontal: 14, paddingVertical: 12, gap: 10 },
  head: { flexDirection: 'row', alignItems: 'center', gap: 7 },
  title: { fontSize: 14, fontWeight: '800' },
  count: { fontSize: 12, fontWeight: '700' },
  gear: {
    width: 26, height: 26, borderRadius: 8, borderWidth: 1,
    alignItems: 'center', justifyContent: 'center',
  },
  row: { flexDirection: 'row', alignItems: 'center', gap: 9 },
  tick: {
    width: 18, height: 18, borderRadius: 9, borderWidth: 1.5,
    alignItems: 'center', justifyContent: 'center',
  },
  label: { flex: 1, fontSize: 13, fontWeight: '600' },
  btn: { borderRadius: 12, paddingHorizontal: 12, paddingVertical: 6 },
  btnTxt: { color: '#FFF', fontSize: 12, fontWeight: '800' },
});
