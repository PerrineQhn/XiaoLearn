/**
 * TrialBanner — compte à rebours de la période d'essai.
 *
 * `trialDaysLeft` et `trialEndsAt` étaient calculés dans `utils/access.ts`
 * depuis le début mais lus nulle part : un utilisateur en essai n'avait aucun
 * moyen de savoir combien de temps il lui restait, ni même qu'il était en
 * essai. C'est l'information la moins chère à afficher et la plus utile au
 * moment de décider de s'abonner.
 *
 * Le bandeau ne s'affiche que pendant l'essai — ni en gratuit, ni en premium —
 * et change de ton le dernier jour, seul moment où l'urgence est réelle.
 */
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import type Colors from '@/constants/Colors';
import { useI18n } from '@/contexts/LanguageContext';
import { useEntitlements } from '@/hooks/useEntitlements';

type Palette = typeof Colors.light;

export function TrialBanner({ colors, px }: { colors: Palette; px: number }) {
  const { t } = useI18n();
  const router = useRouter();
  const { access } = useEntitlements();

  if (access.tier !== 'trial' || access.trialDaysLeft <= 0) return null;

  const lastDay = access.trialDaysLeft <= 1;
  const accent = lastDay ? colors.primaryRed : '#F59E0B';

  return (
    <View style={{ paddingHorizontal: px }}>
      <TouchableOpacity
        onPress={() => router.push('/abonnement' as any)}
        activeOpacity={0.85}
        style={[s.row, { backgroundColor: accent + '14', borderColor: accent + '55' }]}
      >
        <Ionicons name={lastDay ? 'alarm' : 'time-outline'} size={17} color={accent} />
        <View style={{ flex: 1 }}>
          <Text style={[s.title, { color: colors.textPrimary }]}>
            {lastDay
              ? t('trial.lastDay')
              : t('trial.daysLeft', { n: access.trialDaysLeft })}
          </Text>
          <Text style={[s.sub, { color: colors.textSecondary }]}>{t('trial.sub')}</Text>
        </View>
        <Text style={[s.cta, { color: accent }]}>{t('trial.cta')}</Text>
      </TouchableOpacity>
    </View>
  );
}

const s = StyleSheet.create({
  row: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    borderRadius: 14, borderWidth: 1, paddingHorizontal: 13, paddingVertical: 11,
  },
  title: { fontSize: 13.5, fontWeight: '800' },
  sub: { fontSize: 12, marginTop: 1 },
  cta: { fontSize: 13, fontWeight: '800' },
});
