/**
 * Bandeau de rappel : une suppression de compte est programmée.
 *
 * Le délai de sept jours ne protège que si l'utilisateur le voit passer. Un
 * réglage enfoui dans un écran qu'on ne rouvre pas ne prévient personne : le
 * rappel est donc monté à la racine, visible sur tous les écrans, avec le
 * nombre de jours restants et un accès direct à l'annulation.
 *
 * Il disparaît de lui-même dès que la demande est annulée.
 */
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '@/contexts/AuthContext';
import { useI18n } from '@/contexts/LanguageContext';
import { daysLeft } from '@/services/accountDeletion';

export default function DeletionBanner() {
  const { deletion } = useAuth();
  const { t } = useI18n();
  const insets = useSafeAreaInsets();
  const router = useRouter();

  if (!deletion) return null;
  const n = daysLeft(deletion.scheduledFor);

  return (
    <TouchableOpacity
      style={[s.banner, { top: insets.top + 6 }]}
      onPress={() => router.push('/supprimer-compte' as any)}
      activeOpacity={0.85}
    >
      <Ionicons name="alert-circle" size={17} color="#FFF" />
      <Text style={s.txt} numberOfLines={2}>
        {n <= 1 ? t('del.bannerLast') : t('del.banner').replace('{n}', String(n))}
      </Text>
      <Text style={s.cta}>{t('del.bannerCta')}</Text>
    </TouchableOpacity>
  );
}

const s = StyleSheet.create({
  banner: {
    position: 'absolute', left: 12, right: 12, zIndex: 60,
    backgroundColor: '#B91C1C', borderRadius: 12,
    paddingVertical: 9, paddingHorizontal: 12,
    flexDirection: 'row', alignItems: 'center', gap: 8,
    shadowColor: '#000', shadowOpacity: 0.18, shadowRadius: 8, shadowOffset: { width: 0, height: 3 },
    elevation: 5,
  },
  txt: { color: '#FFF', fontSize: 12.5, fontWeight: '600', flex: 1, lineHeight: 17 },
  cta: { color: '#FFF', fontSize: 12.5, fontWeight: '800', textDecorationLine: 'underline' },
});
