/**
 * Suppression de compte.
 *
 * ## Pourquoi cet écran existe
 *
 * Apple l'exige depuis juin 2022 (App Store Review Guideline 5.1.1(v)) dès
 * qu'une application permet de créer un compte : la suppression doit se
 * demander **depuis l'application**, pas par courriel au support. Google Play
 * impose en plus un chemin équivalent accessible depuis un navigateur.
 *
 * ## Le différé de sept jours
 *
 * La demande n'efface rien sur le moment : elle fixe une échéance. Se
 * reconnecter avant cette date annule tout. Apple recommande explicitement ce
 * report pour les comptes porteurs d'un abonnement, et il protège du geste
 * regretté — la purge, elle, est définitive.
 *
 * ## Ce que l'écran doit dire sur l'abonnement
 *
 * Un abonnement App Store appartient au compte Apple, pas au compte XiaoLearn.
 * Aucune API ne permet au développeur de l'annuler. Supprimer son compte
 * n'interrompt donc pas les prélèvements. Le taire exposerait l'utilisateur à
 * continuer d'être débité pour un service auquel il n'a plus accès — l'écran
 * l'avertit et ouvre directement la page de gestion des abonnements.
 */
import { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Linking,
  ActivityIndicator, Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from '@/hooks/useColorScheme';
import Colors from '@/constants/Colors';
import { useI18n } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { useEntitlements } from '@/hooks/useEntitlements';
import {
  requestAccountDeletion, cancelAccountDeletion, GRACE_DAYS, formatDeletionDate,
} from '@/services/accountDeletion';

/** Page de gestion des abonnements du magasin, selon la plateforme. */
const STORE_SUBSCRIPTIONS = Platform.select({
  ios: 'https://apps.apple.com/account/subscriptions',
  android: 'https://play.google.com/store/account/subscriptions',
  default: 'https://apps.apple.com/account/subscriptions',
})!;

export default function SupprimerCompteScreen() {
  const scheme = useColorScheme();
  const c = Colors[scheme];
  const router = useRouter();
  const { t, lang } = useI18n();
  const { user, deletion, reloadDeletion } = useAuth();
  const { access } = useEntitlements();
  const [busy, setBusy] = useState(false);

  const pending = deletion?.status === 'pending';
  const hasSubscription = access.tier !== 'free' && !access.isLifetime;

  async function confirm() {
    Alert.alert(
      t('del.confirmTitle'),
      t('del.confirmBody').replace('{n}', String(GRACE_DAYS)),
      [
        { text: t('common.cancel'), style: 'cancel' },
        {
          text: t('del.confirmCta'),
          style: 'destructive',
          onPress: async () => {
            setBusy(true);
            try {
              const { scheduledFor } = await requestAccountDeletion();
              await reloadDeletion();
              Alert.alert(
                t('del.scheduledTitle'),
                t('del.scheduledBody').replace('{date}', formatDeletionDate(scheduledFor, lang)),
              );
            } catch (e: any) {
              Alert.alert(t('common.error'), e?.message ?? t('del.failed'));
            } finally { setBusy(false); }
          },
        },
      ],
    );
  }

  async function undo() {
    setBusy(true);
    try {
      await cancelAccountDeletion();
      await reloadDeletion();
      Alert.alert('✓', t('del.cancelledBody'));
    } catch (e: any) {
      Alert.alert(t('common.error'), e?.message ?? t('del.failed'));
    } finally { setBusy(false); }
  }

  return (
    <SafeAreaView style={[s.root, { backgroundColor: c.appBg }]}>
      <View style={s.header}>
        <TouchableOpacity
          onPress={() => (router.canGoBack() ? router.back() : router.replace('/(tabs)' as any))}
          style={s.back}
        >
          <Ionicons name="arrow-back" size={22} color={c.textPrimary} />
        </TouchableOpacity>
        <Text style={[s.title, { color: c.textPrimary }]}>{t('del.title')}</Text>
      </View>

      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 48 }}>
        {/* État : suppression déjà programmée */}
        {pending && (
          <View style={[s.card, { backgroundColor: '#FEF2F2', borderColor: '#FECACA' }]}>
            <Text style={[s.cardTitle, { color: '#B91C1C' }]}>{t('del.pendingTitle')}</Text>
            <Text style={[s.cardBody, { color: '#7F1D1D' }]}>
              {t('del.pendingBody').replace('{date}', formatDeletionDate(deletion!.scheduledFor, lang))}
            </Text>
            <TouchableOpacity
              style={[s.primary, { backgroundColor: c.primaryRed }]}
              onPress={undo}
              disabled={busy}
            >
              {busy ? <ActivityIndicator color="#FFF" />
                : <Text style={s.primaryTxt}>{t('del.undoCta')}</Text>}
            </TouchableOpacity>
          </View>
        )}

        {!pending && (
          <>
            <Text style={[s.intro, { color: c.textSecondary }]}>
              {t('del.intro').replace('{n}', String(GRACE_DAYS))}
            </Text>

            <View style={[s.card, { backgroundColor: c.cardBg, borderColor: c.borderLight }]}>
              <Text style={[s.cardTitle, { color: c.textPrimary }]}>{t('del.whatTitle')}</Text>
              {['del.what1', 'del.what2', 'del.what3', 'del.what4'].map(k => (
                <View key={k} style={s.row}>
                  <Ionicons name="close-circle-outline" size={16} color="#DC2626" />
                  <Text style={[s.rowTxt, { color: c.textSecondary }]}>{t(k as any)}</Text>
                </View>
              ))}
            </View>

            <View style={[s.card, { backgroundColor: c.cardBg, borderColor: c.borderLight }]}>
              <Text style={[s.cardTitle, { color: c.textPrimary }]}>{t('del.keptTitle')}</Text>
              <View style={s.row}>
                <Ionicons name="document-text-outline" size={16} color={c.textTertiary} />
                <Text style={[s.rowTxt, { color: c.textSecondary }]}>{t('del.kept1')}</Text>
              </View>
            </View>

            {/* Avertissement abonnement — obligatoire, et jamais masqué */}
            {hasSubscription && (
              <View style={[s.card, { backgroundColor: '#FFFBEB', borderColor: '#FDE68A' }]}>
                <Text style={[s.cardTitle, { color: '#92400E' }]}>{t('del.subTitle')}</Text>
                <Text style={[s.cardBody, { color: '#78350F' }]}>{t('del.subBody')}</Text>
                <TouchableOpacity
                  style={[s.secondary, { borderColor: '#92400E' }]}
                  onPress={() => Linking.openURL(STORE_SUBSCRIPTIONS)}
                >
                  <Ionicons name="open-outline" size={16} color="#92400E" />
                  <Text style={[s.secondaryTxt, { color: '#92400E' }]}>{t('del.subCta')}</Text>
                </TouchableOpacity>
              </View>
            )}

            <TouchableOpacity
              style={[s.danger, { borderColor: '#DC2626' }]}
              onPress={confirm}
              disabled={busy || !user}
            >
              {busy ? <ActivityIndicator color="#DC2626" />
                : <Text style={s.dangerTxt}>{t('del.cta')}</Text>}
            </TouchableOpacity>
            <Text style={[s.foot, { color: c.textTertiary }]}>{t('del.foot')}</Text>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  root: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 16, paddingTop: 8, paddingBottom: 4 },
  back: { width: 38, height: 38, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 22, fontWeight: '800' },
  intro: { fontSize: 14, lineHeight: 21, marginBottom: 14 },
  card: { borderRadius: 14, borderWidth: 1, padding: 14, marginBottom: 12, gap: 8 },
  cardTitle: { fontSize: 15, fontWeight: '800' },
  cardBody: { fontSize: 13.5, lineHeight: 20 },
  row: { flexDirection: 'row', alignItems: 'flex-start', gap: 8 },
  rowTxt: { fontSize: 13.5, lineHeight: 20, flex: 1 },
  primary: { height: 46, borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginTop: 4 },
  primaryTxt: { color: '#FFF', fontSize: 15, fontWeight: '800' },
  secondary: {
    height: 42, borderRadius: 12, borderWidth: 1.5, flexDirection: 'row',
    alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: 4,
  },
  secondaryTxt: { fontSize: 14, fontWeight: '700' },
  danger: {
    height: 50, borderRadius: 12, borderWidth: 1.5,
    alignItems: 'center', justifyContent: 'center', marginTop: 8,
  },
  dangerTxt: { color: '#DC2626', fontSize: 15, fontWeight: '800' },
  foot: { fontSize: 11.5, lineHeight: 17, textAlign: 'center', marginTop: 12 },
});
