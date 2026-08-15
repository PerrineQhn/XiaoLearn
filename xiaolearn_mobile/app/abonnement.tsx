/**
 * XiaoLearn Mobile — Paywall / Abonnement 💎
 * Plans : Accès à vie (achat unique) + Abonnement mensuel.
 * Achat via RevenueCat (build natif). En Expo Go, les boutons expliquent que
 * l'achat nécessite l'app installée depuis les stores.
 */
import { useEffect, useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView,
  ActivityIndicator, Alert, Platform, Linking,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useColorScheme } from '@/hooks/useColorScheme';
import Colors from '@/constants/Colors';
import { useAuth } from '@/contexts/AuthContext';
import { useEntitlements } from '@/hooks/useEntitlements';
import { useI18n } from '@/contexts/LanguageContext';
import {
  isRevenueCatAvailable, getOfferings, purchasePackage, restorePurchases,
  PRODUCT_LIFETIME, PRODUCT_MONTHLY,
} from '@/services/revenueCat';

// EULA Apple standard (accepté par la review si tu n'as pas ta propre EULA).
const EULA_URL = 'https://www.apple.com/legal/internet-services/itunes/dev/stdeula/';
// Politique de confidentialité hébergée sur Firebase Hosting (site xiaolearn-pay).
const PRIVACY_URL = 'https://xiaolearn-pay.web.app/privacy.html';

const BENEFIT_KEYS = ['sub.benefit1', 'sub.benefit2', 'sub.benefit3', 'sub.benefit4', 'sub.benefit5'] as const;

/**
 * Plans affichés : mensuel et accès à vie.
 *
 * Aucun prix n'est écrit ici. La version précédente portait « 99 € » et
 * « 14 € / mois » en repli, ce qui produisait deux défauts : un prix français
 * s'affichait au milieu d'une interface anglaise, et surtout un montant en
 * euros était montré à un utilisateur dont le magasin facture en dollars ou en
 * yens. Apple fixe les prix par territoire — le seul montant juste est celui
 * que renvoie le magasin.
 *
 * Quand le magasin ne répond pas, on n'invente pas : on le dit et on empêche
 * l'achat.
 */
const PLANS = [
  {
    id: PRODUCT_LIFETIME,
    labelKey: 'sub.lifetime', descKey: 'sub.lifetimeDesc',
    priceNoteKey: 'sub.oneTime',
    badgeKey: 'sub.best', highlight: true,
    featureKeys: ['sub.lifeFeat1', 'sub.lifeFeat2', 'sub.lifeFeat3'],
  },
  {
    id: PRODUCT_MONTHLY,
    labelKey: 'sub.monthly', descKey: 'sub.monthlyDesc',
    priceNoteKey: 'sub.noCommit',
    badgeKey: null, highlight: false,
    featureKeys: ['sub.monFeat1', 'sub.monFeat2', 'sub.monFeat3'],
  },
] as const;

export default function AbonnementScreen() {
  const scheme = useColorScheme();
  const c = Colors[scheme];
  const router = useRouter();
  const { user } = useAuth();
  const { isPremium, access, refreshRC } = useEntitlements();
  const { t } = useI18n();

  const [offering, setOffering] = useState<any | null>(null);
  const [busy, setBusy] = useState<string | null>(null);

  useEffect(() => {
    getOfferings().then(setOffering).catch(() => {});
  }, []);

  const goBack = () => router.canGoBack() ? router.back() : router.replace('/(tabs)' as any);

  /** Retrouve le package RevenueCat correspondant à un identifiant produit. */
  const packageFor = (productId: string) =>
    offering?.availablePackages?.find(
      (p: any) => p.product?.identifier === productId
    ) ?? null;

  /** Prix localisé du magasin, ou null s'il n'a pas répondu. */
  const livePrice = (productId: string): string | null =>
    packageFor(productId)?.product?.priceString ?? null;

  const buy = async (productId: string) => {
    if (!user) { router.push('/login'); return; }
    if (!isRevenueCatAvailable()) {
      Alert.alert(
        t('sub.unavailableHere'),
        t('sub.buyUnavailable')
      );
      return;
    }
    const pkg = packageFor(productId);
    if (!pkg) { Alert.alert(t('common.error'), t('sub.offerUnavailable')); return; }
    setBusy(productId);
    const outcome = await purchasePackage(pkg);
    setBusy(null);

    // Trois issues distinctes. L'ancienne version n'en traitait qu'une : un
    // paiement refusé laissait l'écran identique, sans le moindre message.
    if (outcome.status === 'ok') {
      await refreshRC();
      Alert.alert('🎉', t('sub.thanks'));
      goBack();
      return;
    }
    // Renoncer est un choix, pas une erreur : on ne dit rien.
    if (outcome.status === 'cancelled') return;
    Alert.alert(t('sub.purchaseFailedTitle'),
      outcome.message ? `${t('sub.purchaseFailedBody')}\n\n${outcome.message}` : t('sub.purchaseFailedBody'));
  };

  const restore = async () => {
    if (!isRevenueCatAvailable()) return;
    setBusy('restore');
    const outcome = await restorePurchases();
    await refreshRC();
    setBusy(null);

    if (outcome.status !== 'ok') {
      Alert.alert(t('sub.restoreFailedTitle'), t('sub.restoreFailedBody'));
      return;
    }
    // L'appel peut réussir sans rien trouver — cas d'un compte sans achat, ou
    // d'un identifiant de magasin différent de celui utilisé à l'époque.
    if (outcome.restored) Alert.alert('✓', t('sub.restored'));
    else Alert.alert(t('sub.nothingToRestoreTitle'), t('sub.nothingToRestoreBody'));
  };

  // Déjà premium → écran de confirmation
  if (isPremium) {
    return (
      <SafeAreaView style={[s.root, { backgroundColor: c.appBg }]}>
        <View style={s.header}>
          <TouchableOpacity onPress={goBack} style={s.backBtn}>
            <Ionicons name="arrow-back" size={22} color={c.textPrimary} />
          </TouchableOpacity>
          <Text style={[s.headerTitle, { color: c.textPrimary }]}>{t('profil.subscription')}</Text>
          <View style={{ width: 38 }} />
        </View>
        <View style={s.center}>
          <Text style={{ fontSize: 56 }}>💎</Text>
          <Text style={[s.premTitle, { color: c.textPrimary }]}>{t('sub.premiumTitle')}</Text>
          <Text style={[s.premSub, { color: c.textSecondary }]}>
            {access.isLifetime ? t('sub.premiumLife') : t('sub.premiumSub')}
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[s.root, { backgroundColor: c.appBg }]}>
      <View style={s.header}>
        <TouchableOpacity onPress={goBack} style={s.backBtn}>
          <Ionicons name="arrow-back" size={22} color={c.textPrimary} />
        </TouchableOpacity>
        <Text style={[s.headerTitle, { color: c.textPrimary }]}>{t('sub.header')}</Text>
        <View style={{ width: 38 }} />
      </View>

      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 40, gap: 16 }}>
        <View>
          <Text style={[s.title, { color: c.textPrimary }]}>{t('sub.title')}</Text>
          <Text style={[s.subtitle, { color: c.textSecondary }]}>
            {t('sub.subtitle')}
          </Text>
        </View>

        {/* Bénéfices */}
        <View style={[s.benefits, { backgroundColor: c.cardBg, borderColor: c.borderLight }]}>
          {BENEFIT_KEYS.map((k, i) => (
            <View key={i} style={s.benefitRow}>
              <Ionicons name="checkmark-circle" size={18} color={c.jadeGreen} />
              <Text style={[s.benefitTxt, { color: c.textSecondary }]}>{t(k)}</Text>
            </View>
          ))}
        </View>

        {/* Plans */}
        {PLANS.map(plan => {
          const loading = busy === plan.id;
          const prix = livePrice(plan.id);
          // Sans prix, pas d'achat : proposer un bouton qui échouera, ou pire
          // afficher un montant inventé, serait trompeur.
          const achetable = !!prix;
          return (
            <View
              key={plan.id}
              style={[s.plan, {
                backgroundColor: c.cardBg,
                borderColor: plan.highlight ? c.primaryRed : c.borderLight,
                borderWidth: plan.highlight ? 2 : 1,
              }]}
            >
              {plan.badgeKey && (
                <View style={[s.planBadge, { backgroundColor: c.primaryRed }]}>
                  <Text style={s.planBadgeTxt}>{t(plan.badgeKey)}</Text>
                </View>
              )}
              <Text style={[s.planLabel, { color: c.textPrimary }]}>{t(plan.labelKey)}</Text>
              <Text style={[s.planDesc, { color: c.textTertiary }]}>{t(plan.descKey)}</Text>
              <View style={s.priceRow}>
                <Text style={[s.price, { color: prix ? c.textPrimary : c.textTertiary }]}>
                  {prix ?? '—'}
                </Text>
                <Text style={[s.priceNote, { color: c.textTertiary }]}>
                  {prix ? t(plan.priceNoteKey) : t('sub.priceUnavailable')}
                </Text>
              </View>
              {/* Guideline 3.1.2 : la durée, le prix par période et le
                  renouvellement automatique doivent figurer sur l'écran
                  d'achat lui-même, pas seulement dans la FAQ ou les CGU. */}
              {plan.id === PRODUCT_MONTHLY && prix && (
                <Text style={[s.renewNote, { color: c.textTertiary }]}>
                  {t('sub.renewNotice').replace('{price}', prix)}
                </Text>
              )}
              {plan.featureKeys.map((k, i) => (
                <View key={i} style={s.featureRow}>
                  <Ionicons name="checkmark" size={15} color={c.jadeGreen} />
                  <Text style={[s.featureTxt, { color: c.textSecondary }]}>{t(k as any)}</Text>
                </View>
              ))}
              <TouchableOpacity
                style={[s.buyBtn, { backgroundColor: plan.highlight ? c.primaryRed : c.cardBgAlt, borderColor: c.borderMedium, borderWidth: plan.highlight ? 0 : 1 }]}
                onPress={() => buy(plan.id)}
                disabled={loading || (!achetable && !!user)}
                activeOpacity={0.85}
              >
                {loading
                  ? <ActivityIndicator size="small" color={plan.highlight ? '#FFF' : c.textPrimary} />
                  : <Text style={[s.buyTxt, { color: plan.highlight ? '#FFF' : c.textPrimary }]}>
                      {!user ? t('sub.loginToBuy') : achetable ? t('sub.choose') : t('sub.storeUnreachable')}
                    </Text>}
              </TouchableOpacity>
            </View>
          );
        })}

        {/* Restaurer + mentions */}
        <TouchableOpacity onPress={restore} disabled={busy === 'restore'}>
          <Text style={[s.restore, { color: c.primaryRed }]}>{t('sub.restore')}</Text>
        </TouchableOpacity>
        <Text style={[s.legal, { color: c.textTertiary }]}>
          {t('sub.legal')}
        </Text>

        {/* Liens légaux — requis par Apple (règle 3.1.2) */}
        <View style={s.legalLinks}>
          <TouchableOpacity onPress={() => Linking.openURL(EULA_URL)}>
            <Text style={[s.legalLink, { color: c.primaryRed }]}>{t('sub.terms')}</Text>
          </TouchableOpacity>
          <Text style={{ color: c.textTertiary }}>·</Text>
          <TouchableOpacity onPress={() => Linking.openURL(PRIVACY_URL)}>
            <Text style={[s.legalLink, { color: c.primaryRed }]}>{t('sub.privacy')}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  root: { flex: 1 },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 16, paddingTop: 8, paddingBottom: 12,
  },
  backBtn: { width: 38, height: 38, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontSize: 18, fontWeight: '700' },

  title: { fontSize: 24, fontWeight: '800' },
  subtitle: { fontSize: 14.5, marginTop: 4 },

  benefits: { borderRadius: 16, borderWidth: 1, padding: 16, gap: 10 },
  benefitRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 10 },
  benefitTxt: { fontSize: 13.5, flex: 1, lineHeight: 19 },

  plan: { borderRadius: 18, padding: 18, gap: 6, position: 'relative' },
  planBadge: {
    position: 'absolute', top: -10, right: 16,
    paddingHorizontal: 12, paddingVertical: 4, borderRadius: 12,
  },
  planBadgeTxt: { color: '#FFF', fontSize: 11, fontWeight: '800' },
  planLabel: { fontSize: 18, fontWeight: '800' },
  planDesc: { fontSize: 13 },
  priceRow: { flexDirection: 'row', alignItems: 'baseline', gap: 8, marginVertical: 6 },
  price: { fontSize: 26, fontWeight: '900' },
  priceNote: { fontSize: 13 },
  featureRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 2 },
  featureTxt: { fontSize: 13 },
  buyBtn: { borderRadius: 14, paddingVertical: 14, alignItems: 'center', marginTop: 12 },
  buyTxt: { fontSize: 15.5, fontWeight: '700' },

  renewNote: { fontSize: 11.5, lineHeight: 17, marginTop: 2, marginBottom: 6 },
  restore: { textAlign: 'center', fontSize: 14, fontWeight: '600', marginTop: 4 },
  legal: { fontSize: 11, lineHeight: 16, textAlign: 'center' },
  legalLinks: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 8, marginTop: 4 },
  legalLink: { fontSize: 12, fontWeight: '600', textDecorationLine: 'underline' },

  center: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 8, padding: 24 },
  premTitle: { fontSize: 22, fontWeight: '800' },
  premSub: { fontSize: 14.5, textAlign: 'center' },
});
