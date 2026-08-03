/**
 * PremiumGate — écran de blocage vers l'abonnement.
 *
 * Les champs d'`AppAccess` existaient depuis le début (`canUseAI`,
 * `maxMiniGames`, `reviewItemLimit`…) mais aucun n'était lu : seul l'accès aux
 * leçons était réellement verrouillé, alors que la page d'abonnement promet
 * l'assistant IA, les mini-jeux et les dictées. Ce composant est le point de
 * blocage commun, pour que la promesse commerciale et le produit disent la
 * même chose.
 *
 * Principe retenu : on ne cache jamais une fonctionnalité, on l'affiche
 * verrouillée. Un utilisateur gratuit doit voir ce qu'il gagnerait — un écran
 * amputé n'informe personne et donne l'impression d'un bug.
 */
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import type Colors from '@/constants/Colors';
import { useI18n } from '@/contexts/LanguageContext';
import type { TransKey } from '@/i18n/translations';

type Palette = typeof Colors.light;

export function PremiumGate({
  colors, titleKey, bodyKey, compact = false,
}: {
  colors: Palette;
  /** Clé de titre ; TransKey plutôt qu'une union figée, à rallonger à chaque
   *  nouveau blocage. */
  titleKey?: TransKey;
  bodyKey?: TransKey;
  /** Version en bandeau, pour s'insérer dans un écran déjà rempli. */
  compact?: boolean;
}) {
  const { t } = useI18n();
  const router = useRouter();

  return (
    <View style={[
      compact ? s.banner : s.full,
      { backgroundColor: colors.cardBg, borderColor: colors.primaryRed + '40' },
    ]}>
      <View style={[s.icon, { backgroundColor: colors.primaryRedLight }]}>
        <Ionicons name="lock-closed" size={compact ? 16 : 24} color={colors.primaryRed} />
      </View>
      <View style={{ flex: 1, gap: 4 }}>
        <Text style={[s.title, { color: colors.textPrimary }]}>
          {t(titleKey ?? 'gate.aiTitle')}
        </Text>
        <Text style={[s.body, { color: colors.textSecondary }]}>
          {t(bodyKey ?? 'gate.aiBody')}
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => router.push('/abonnement' as any)}
        style={[s.cta, { backgroundColor: colors.primaryRed }]}
        activeOpacity={0.85}
      >
        <Text style={s.ctaTxt}>{t('gate.cta')}</Text>
      </TouchableOpacity>
    </View>
  );
}

const s = StyleSheet.create({
  full: {
    margin: 16, padding: 18, borderRadius: 16, borderWidth: 1,
    alignItems: 'center', gap: 12,
  },
  banner: {
    marginHorizontal: 16, marginVertical: 8, padding: 12, borderRadius: 14, borderWidth: 1,
    flexDirection: 'row', alignItems: 'center', gap: 10,
  },
  icon: { width: 40, height: 40, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 14, fontWeight: '800' },
  body: { fontSize: 12.5, lineHeight: 17 },
  cta: { borderRadius: 12, paddingHorizontal: 14, paddingVertical: 9 },
  ctaTxt: { color: '#FFF', fontSize: 13, fontWeight: '800' },
});
