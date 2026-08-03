/**
 * Choix du personnage.
 *
 * On ne choisit plus une illustration figée parmi 48 mais un personnage qui
 * évolue : sa tenue suit le niveau CECR atteint, du t-shirt nu au palier 1
 * jusqu'à la toge de diplômé au palier 10. L'écran montre donc les dix
 * tenues, avec celle atteinte mise en avant et les suivantes en aperçu —
 * voir ce qui attend plus loin fait partie de la récompense.
 */
import {
  View, Text, StyleSheet, TouchableOpacity, useWindowDimensions, ScrollView, Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useColorScheme } from '@/hooks/useColorScheme';
import Colors from '@/constants/Colors';
import { useI18n } from '@/contexts/LanguageContext';
import { useAvatar } from '@/hooks/useAvatar';
import { useUserStats } from '@/hooks/useUserStats';
import { HumanAvatar } from '@/components/HumanAvatar';
import {
  AVATAR_CHARACTERS, STAGES, STAGE_COUNT,
  avatarStageSource, avatarStageBlurred, stagesAvailable,
  stageForCompleted, lessonsToNextStage, currentCecrLabel,
} from '@/data/avatarEvolution';

export default function AvatarScreen() {
  const scheme = useColorScheme();
  const colors = Colors[scheme];
  const router = useRouter();
  const { t, lang } = useI18n();
  const { width } = useWindowDimensions();
  const { avatarId, select } = useAvatar();
  const { stats } = useUserStats();

  const px = width >= 768 ? 24 : 16;
  const stage = stageForCompleted(stats.completedLessonIds);
  const remaining = lessonsToNextStage(stats.completedLessonIds);
  const cols = width >= 768 ? 5 : 3;
  const cardW = (width - px * 2 - (cols - 1) * 10) / cols;

  return (
    <SafeAreaView style={[s.root, { backgroundColor: colors.appBg }]} edges={['top']}>
      <View style={[s.header, { paddingHorizontal: px }]}>
        <TouchableOpacity onPress={() => router.back()} style={s.iconBtn}>
          <Ionicons name="arrow-back" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
        <View style={{ flex: 1, marginLeft: 4 }}>
          <Text style={[s.title, { color: colors.textPrimary }]}>{t('avatar.title')}</Text>
          <Text style={[s.subtitle, { color: colors.textSecondary }]}>{t('avatar.pickOne')}</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={{ paddingHorizontal: px, paddingBottom: 40, gap: 22 }}>
        {/* Choix du personnage — chacun montré à la tenue déjà atteinte, pour
            qu'on se projette dans ce qu'on va réellement voir. */}
        <View style={s.charRow}>
          {AVATAR_CHARACTERS.map(c => {
            const on = c.id === avatarId;
            return (
              <TouchableOpacity
                key={c.id}
                onPress={() => select(c.id)}
                activeOpacity={0.85}
                style={[s.charCard, {
                  width: cardW,
                  backgroundColor: colors.cardBg,
                  borderColor: on ? c.accent : colors.borderLight,
                  borderWidth: on ? 2.5 : 1,
                }]}
              >
                <HumanAvatar avatarId={c.id} stage={stage} size={cardW - 22} colors={colors} />
                <Text style={[s.charName, { color: colors.textPrimary }]} numberOfLines={1}>
                  {lang === 'en' ? c.nameEn : c.nameFr}
                </Text>
                {stagesAvailable(c.id) < STAGE_COUNT && (
                  // Personnage dont les tenues ne sont pas toutes dessinées :
                  // on le propose quand même, mais sans le promettre.
                  <Text style={[s.charSoon, { color: colors.textTertiary }]} numberOfLines={1}>
                    {t('avatar.outfitsSoon')}
                  </Text>
                )}
                {on && (
                  <View style={[s.check, { backgroundColor: c.accent }]}>
                    <Ionicons name="checkmark" size={14} color="#FFF" />
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Palier courant */}
        <View style={[s.stageBox, { backgroundColor: colors.cardBgAlt, borderColor: colors.borderLight }]}>
          <Text style={[s.stageLabel, { color: colors.textTertiary }]}>
            {t('avatar.stageOf', { n: stage, total: STAGE_COUNT })}
          </Text>
          <Text style={[s.stageName, { color: colors.textPrimary }]}>
            {lang === 'en' ? STAGES[stage - 1].rankEn : STAGES[stage - 1].rankFr}
          </Text>
          <Text style={[s.stageOutfit, { color: colors.textSecondary }]}>
            {lang === 'en' ? STAGES[stage - 1].outfitEn : STAGES[stage - 1].outfitFr}
            {' — '}
            {lang === 'en' ? STAGES[stage - 1].signEn : STAGES[stage - 1].signFr}
          </Text>
          <Text style={[s.stageHint, { color: colors.textSecondary }]}>
            {stage >= STAGE_COUNT
              ? t('avatar.stageMax')
              : t('avatar.stageNext', { n: remaining, level: currentCecrLabel(stats.completedLessonIds) })}
          </Text>
        </View>

        {/* Les dix tenues. Celles qui restent à décrocher sont floutées et
            leur nom masqué : découvrir sa nouvelle tenue est la récompense,
            la montrer d'avance reviendrait à raconter la fin du film. */}
        <View>
          <Text style={[s.sectionTitle, { color: colors.textPrimary }]}>{t('avatar.allStages')}</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.tray}>
            {Array.from({ length: STAGE_COUNT }, (_, i) => i + 1).map(n => {
              const who = avatarId ?? AVATAR_CHARACTERS[0].id;
              const drawn = n <= stagesAvailable(who);
              const locked = n > stage;
              const src = !drawn
                ? undefined
                : locked ? avatarStageBlurred(who, n) : avatarStageSource(who, n);
              return (
                <View
                  key={n}
                  style={[s.stageCell, {
                    backgroundColor: colors.cardBg,
                    borderColor: n === stage ? colors.primaryRed : colors.borderLight,
                    borderWidth: n === stage ? 2 : 1,
                  }]}
                >
                  {src && (
                    <Image
                      source={src}
                      style={[s.stageImg, locked && { opacity: 0.9 }]}
                      resizeMode="contain"
                    />
                  )}
                  {!drawn && (
                    <View style={s.stageImg} >
                      <Ionicons
                        name="brush-outline"
                        size={20}
                        color={colors.textTertiary}
                        style={{ alignSelf: 'center', marginTop: 22 }}
                      />
                    </View>
                  )}
                  {drawn && locked && (
                    <View style={s.lock}>
                      <Ionicons name="lock-closed" size={13} color={colors.textTertiary} />
                    </View>
                  )}
                  <Text style={[s.stageCellTxt, { color: colors.textTertiary }]} numberOfLines={1}>
                    {locked
                      ? '? ? ?'
                      : (lang === 'en' ? STAGES[n - 1].rankEn : STAGES[n - 1].rankFr)}
                  </Text>
                </View>
              );
            })}
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  root: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', paddingTop: 8, paddingBottom: 14 },
  iconBtn: { width: 38, height: 38, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 22, fontWeight: '800' },
  subtitle: { fontSize: 12.5, marginTop: 1 },

  charRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, justifyContent: 'center' },
  charCard: { borderRadius: 16, alignItems: 'center', paddingVertical: 10, gap: 2 },
  charName: { fontSize: 13.5, fontWeight: '800' },
  charSoon: { fontSize: 9, fontWeight: '700' },
  check: {
    position: 'absolute', top: 6, right: 6,
    width: 20, height: 20, borderRadius: 10,
    alignItems: 'center', justifyContent: 'center',
  },

  stageBox: { borderRadius: 16, borderWidth: 1, padding: 14, gap: 2 },
  stageLabel: { fontSize: 11, fontWeight: '800', textTransform: 'uppercase' },
  stageName: { fontSize: 17, fontWeight: '800' },
  stageOutfit: { fontSize: 12.5, marginTop: 1 },
  stageHint: { fontSize: 13, lineHeight: 18, marginTop: 2 },

  sectionTitle: { fontSize: 15, fontWeight: '800', marginBottom: 10 },
  tray: { gap: 10, paddingRight: 4 },
  stageCell: {
    width: 84, borderRadius: 14, alignItems: 'center',
    paddingTop: 6, paddingBottom: 7,
  },
  stageImg: { width: 68, height: 68 },
  lock: { position: 'absolute', top: 28, alignSelf: 'center' },
  stageCellTxt: { fontSize: 9.5, fontWeight: '700', marginTop: 2, paddingHorizontal: 3, textAlign: 'center' },
});
