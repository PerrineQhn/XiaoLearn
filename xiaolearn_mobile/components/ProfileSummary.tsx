/**
 * ProfileSummary — niveau, progression et semaine d'activité.
 *
 * Répond à « où j'en suis » d'un coup d'œil : le palier CECR atteint, ce qu'il
 * reste avant le suivant, la série en cours, et les jours pratiqués de la
 * semaine — la semaine commence lundi, comme partout en France.
 */
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Colors from '@/constants/Colors';
import { useI18n } from '@/contexts/LanguageContext';
import { dayKey, type UserStats } from '@/hooks/useUserStats';
import { HumanAvatar } from '@/components/HumanAvatar';
import { useAvatar } from '@/hooks/useAvatar';
import { stageForCompleted, STAGES, STAGE_COUNT } from '@/data/avatarEvolution';

/** Paliers XP des niveaux CECR — mêmes seuils que xpToLevel(). */
const TIERS: { level: string; floor: number }[] = [
  { level: 'A1', floor: 0 },
  { level: 'A2', floor: 500 },
  { level: 'B1', floor: 1500 },
  { level: 'B2', floor: 3000 },
  { level: 'C1', floor: 6000 },
];

export function levelProgress(xp: number) {
  let i = 0;
  while (i + 1 < TIERS.length && xp >= TIERS[i + 1].floor) i++;
  const cur = TIERS[i];
  const next = TIERS[i + 1];
  if (!next) return { level: cur.level, floor: cur.floor, ceil: xp, pct: 1, isMax: true };
  const pct = Math.max(0, Math.min(1, (xp - cur.floor) / (next.floor - cur.floor)));
  return { level: cur.level, floor: cur.floor, ceil: next.floor, pct, isMax: false };
}

/** Les 7 jours de la semaine courante, du lundi au dimanche. */
function currentWeek(): { key: string; isToday: boolean; isFuture: boolean }[] {
  const now = new Date();
  const todayKey = dayKey(now);
  // getDay() : 0 = dimanche. On ramène lundi à l'indice 0.
  const offset = (now.getDay() + 6) % 7;
  const monday = new Date(now);
  monday.setDate(now.getDate() - offset);

  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    const key = dayKey(d);
    return { key, isToday: key === todayKey, isFuture: i > offset };
  });
}

export function ProfileSummary({
  colors, stats, px = 14,
}: {
  colors: typeof Colors.light;
  stats: UserStats;
  px?: number;
}) {
  const { t, lang } = useI18n();
  const router = useRouter();
  const { avatarId } = useAvatar();
  const prog = levelProgress(stats.xp);
  // Palier de l'avatar : un niveau CECR bouclé = une tenue de plus.
  const stage = stageForCompleted(stats.completedLessonIds);
  const week = currentWeek();
  const done = new Set(stats.studyDays);

  const labels = lang === 'en'
    ? ['M', 'T', 'W', 'T', 'F', 'S', 'S']
    : ['L', 'M', 'M', 'J', 'V', 'S', 'D'];

  return (
    <View style={{ paddingHorizontal: px }}>
      {/* Grand avatar à gauche sur toute la hauteur du bloc, infos à droite —
          la disposition de la référence : le personnage EST le profil. */}
      <View style={s.top}>
        {/* Pas de tuile de fond : les avatars sont détourés, le personnage
            se pose directement sur le bloc — comme sur la référence. */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => router.push('/avatar' as any)}
          style={s.avatarBox}
        >
          <HumanAvatar avatarId={avatarId} stage={stage} size={132} colors={colors} />
          <Text style={[s.stageTxt, { color: colors.textSecondary }]} numberOfLines={1}>
            {lang === 'en' ? STAGES[stage - 1].rankEn : STAGES[stage - 1].rankFr}
            {`  ${stage}/${STAGE_COUNT}`}
          </Text>
        </TouchableOpacity>

        <View style={{ flex: 1, gap: 7 }}>
          <View style={s.row}>
            <Text style={[s.title, { color: colors.textPrimary }]}>
              {t('home.levelLabel', { level: prog.level })}
            </Text>
            <View style={s.streak}>
              <Ionicons name="flame" size={14} color="#F9A825" />
              <Text style={[s.streakTxt, { color: '#F9A825' }]}>{stats.streakDays}</Text>
            </View>
          </View>

          <View style={[s.track, { backgroundColor: colors.borderLight }]}>
            <View
              style={[s.bar, { width: `${prog.pct * 100}%` as any, backgroundColor: colors.primaryRed }]}
            />
          </View>

          <Text style={[s.xpTxt, { color: colors.textTertiary }]}>
            {prog.isMax
              ? t('home.xpMax', { xp: stats.xp.toLocaleString() })
              : t('home.xpToNext', { xp: stats.xp.toLocaleString(), next: prog.ceil.toLocaleString() })}
          </Text>

          {/* Semaine d'activité, sous la barre — pastilles compactes pour
              tenir dans la colonne */}
          <View style={s.week}>
            {week.map((d, i) => {
              const ok = done.has(d.key);
              return (
                <View
                  key={d.key}
                  style={[
                    s.day,
                    {
                      backgroundColor: ok ? colors.primaryRed : colors.cardBgAlt,
                      borderColor: d.isToday ? colors.primaryRed : 'transparent',
                      opacity: d.isFuture ? 0.4 : 1,
                    },
                  ]}
                >
                  {ok
                    ? <Ionicons name="checkmark" size={12} color="#FFF" />
                    : <Text style={[s.dayTxt, { color: colors.textTertiary }]}>{labels[i]}</Text>}
                </View>
              );
            })}
          </View>
        </View>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  top: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  // Léger débord négatif : l'avatar peut être grand sans gonfler la hauteur
  // du bloc, la colonne d'infos restant la référence de mise en page.
  stageTxt: { fontSize: 10.5, fontWeight: '700', textAlign: 'center', marginTop: -6 },
  avatarBox: { width: 132, alignItems: 'center', marginTop: -8, marginBottom: -2 },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  title: { fontSize: 16, fontWeight: '800' },
  streak: { flexDirection: 'row', alignItems: 'center', gap: 3 },
  streakTxt: { fontSize: 13, fontWeight: '800' },
  track: { height: 7, borderRadius: 4, overflow: 'hidden' },
  bar: { height: 7, borderRadius: 4 },
  xpTxt: { fontSize: 11.5 },
  week: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 2 },
  day: {
    width: 26, height: 26, borderRadius: 13, borderWidth: 1.5,
    alignItems: 'center', justifyContent: 'center',
  },
  dayTxt: { fontSize: 10.5, fontWeight: '700' },
});
