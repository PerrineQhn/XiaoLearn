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
import { useLayout } from '@/hooks/useLayout';
import { useI18n } from '@/contexts/LanguageContext';
import { dayKey, type UserStats } from '@/hooks/useUserStats';
import { HumanAvatar } from '@/components/HumanAvatar';
import { useAvatar } from '@/hooks/useAvatar';
import { stageForCompleted, STAGES, STAGE_COUNT } from '@/data/avatarEvolution';
import { CECR_LEVELS } from '@/data/cecrLevelsMeta';
import { LESSON_DATA } from '@/data/cecrLessons';

/**
 * Paliers d'XP.
 *
 * ## Ce qu'ils mesurent — et ce qu'ils ne mesurent pas
 *
 * Ces seuils portaient des étiquettes CECR : 3 000 XP affichait « Niveau B2 ».
 * C'est un contresens. L'XP mesure le VOLUME d'activité — on en gagne en
 * révisant des cartes, en jouant, en faisant des dictées — alors que le CECR
 * mesure une COMPÉTENCE, validée leçon après leçon et par un bilan de fin de
 * niveau.
 *
 * L'écart n'était pas théorique : l'accueil annonçait « Niveau B2 » à un
 * compte qui, sur l'écran Cours, en est à A2 avec B1.1 encore verrouillé.
 * Deux affirmations contradictoires sur le même écran, et c'est la fausse qui
 * s'affichait en gros.
 *
 * Les paliers sont donc devenus ce qu'ils ont toujours été : des rangs de
 * progression, numérotés. Le niveau CECR, lui, se lit là où il se gagne —
 * dans les leçons terminées.
 */
const TIERS: { rank: number; floor: number }[] = [
  { rank: 1, floor: 0 },
  { rank: 2, floor: 500 },
  { rank: 3, floor: 1500 },
  { rank: 4, floor: 3000 },
  { rank: 5, floor: 6000 },
];

export function levelProgress(xp: number) {
  let i = 0;
  while (i + 1 < TIERS.length && xp >= TIERS[i + 1].floor) i++;
  const cur = TIERS[i];
  const next = TIERS[i + 1];
  if (!next) return { rank: cur.rank, floor: cur.floor, ceil: xp, pct: 1, isMax: true };
  const pct = Math.max(0, Math.min(1, (xp - cur.floor) / (next.floor - cur.floor)));
  return { rank: cur.rank, floor: cur.floor, ceil: next.floor, pct, isMax: false };
}

/**
 * Palier CECR réellement atteint : le dernier niveau dont toutes les leçons
 * sont terminées, ou le premier niveau entamé.
 *
 * C'est la même définition que l'écran Cours — celle qui décide aussi des
 * verrous. Les deux écrans ne peuvent donc plus se contredire.
 */
export function cecrProgress(completedIds: string[]) {
  const done = new Set(completedIds);
  let courant = CECR_LEVELS[0];
  let faites = 0;
  let total = 0;

  for (const niveau of CECR_LEVELS) {
    const lecons = niveau.modules.flatMap(m => LESSON_DATA[m.id] ?? []);
    if (!lecons.length) continue;
    const n = lecons.filter(l => done.has(l.id)).length;
    if (n > 0) { courant = niveau; faites = n; total = lecons.length; }
    if (n < lecons.length) break;
  }
  return { label: courant.label, faites, total,
    pct: total ? faites / total : 0 };
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
  const { tablet } = useLayout();
  const router = useRouter();
  const { avatarId } = useAvatar();
  const prog = levelProgress(stats.xp);
  // Le CECR se lit dans les leçons terminées, pas dans l'XP.
  const cecr = cecrProgress(stats.completedLessonIds);
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
              {t('home.levelLabel', { level: cecr.label })}
            </Text>
            <View style={s.streak}>
              <Ionicons name="flame" size={14} color="#F9A825" />
              <Text style={[s.streakTxt, { color: '#F9A825' }]}>{stats.streakDays}</Text>
            </View>
          </View>

          {/* Le rang se place JUSTE au-dessus de sa barre. Placé à côté du
              niveau CECR, il laissait croire que la barre mesurait la
              progression dans le niveau — alors qu'elle compte l'XP. Deux
              indicateurs voisins, deux échelles différentes : il faut que
              chacun touche ce qu'il décrit. */}
          <Text style={[s.rank, { color: colors.textSecondary }]}>
            {t('home.rank', { n: String(prog.rank) })}
          </Text>

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
              tenir dans la colonne.
              Le `space-between` réparti sur toute la largeur disponible fait
              dériver le lundi et le dimanche aux deux bouts d'un écran large :
              sept pastilles séparées par du vide ne se lisent plus comme une
              semaine. On borne donc la rangée à la largeur où elle reste un
              groupe, et on la laisse commencer au bord gauche. */}
          <View style={[s.week, tablet && s.weekBounded]}>
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
  rank: { fontSize: 12.5, fontWeight: '700', marginTop: 2 },
  streak: { flexDirection: 'row', alignItems: 'center', gap: 3 },
  streakTxt: { fontSize: 13, fontWeight: '800' },
  track: { height: 7, borderRadius: 4, overflow: 'hidden' },
  bar: { height: 7, borderRadius: 4 },
  xpTxt: { fontSize: 11.5 },
  week: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 2 },
  // `alignSelf: 'flex-start'` alignerait la rangée à gauche mais la ferait aussi
  // se réduire à son contenu, ce qui annulerait le `space-between`. L'étirement
  // par défaut plafonné à 320 pt donne les deux : bornée et calée à gauche.
  weekBounded: { maxWidth: 320 },
  day: {
    width: 26, height: 26, borderRadius: 13, borderWidth: 1.5,
    alignItems: 'center', justifyContent: 'center',
  },
  dayTxt: { fontSize: 10.5, fontWeight: '700' },
});
