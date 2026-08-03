/**
 * XiaoLearn Mobile — Aide & Support
 * FAQ pliable + contact e-mail + liens légaux.
 */
import { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView, Linking,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useColorScheme } from '@/hooks/useColorScheme';
import Colors from '@/constants/Colors';
import { useI18n } from '@/contexts/LanguageContext';

const SUPPORT_EMAIL = 'contact@xiaolearn.com';
const PRIVACY_URL = 'https://xiaolearn-pay.web.app/privacy.html';

interface FaqEntry { q: string; a: string; qEn: string; aEn: string; }
const FAQ: FaqEntry[] = [
  {
    q: 'Comment fonctionne la révision (SRS) ?',
    a: 'Chaque mot que tu apprends entre dans un système de répétition espacée : plus tu le connais, plus l\'intervalle avant la prochaine révision s\'allonge. Trois compétences sont suivies séparément : reconnaissance 👁, prononciation 🗣 et écriture ✍️.',
    qEn: 'How does review (SRS) work?',
    aEn: 'Every word you learn enters a spaced-repetition system: the better you know it, the longer the interval before the next review. Three skills are tracked separately: recognition 👁, pronunciation 🗣 and writing ✍️.',
  },
  {
    q: 'Quelle est la différence entre gratuit et Premium ?',
    a: 'Le niveau A1 est entièrement gratuit, avec un mini-jeu, 20 cartes par session de révision et 5 nouveaux mots par jour. Premium débloque tous les niveaux (A2 → C2), Prof. Xiao, les cinq mini-jeux, les dictées et les révisions sans limite. Tu peux choisir un abonnement mensuel ou un accès à vie.',
    qEn: 'What\'s the difference between free and Premium?',
    aEn: 'Level A1 is entirely free, with one mini-game, 20 cards per review session and 5 new words a day. Premium unlocks all levels (A2 → C2), Prof. Xiao, all five mini-games, dictations and unlimited reviews. You can choose a monthly subscription or lifetime access.',
  },
  {
    q: 'Ma progression est-elle synchronisée ?',
    a: 'Oui. Tant que tu es connecté(e), ta progression est sauvegardée dans le cloud et synchronisée entre tous tes appareils, ainsi qu\'avec la version web.',
    qEn: 'Is my progress synced?',
    aEn: 'Yes. As long as you\'re signed in, your progress is saved to the cloud and synced across all your devices, and with the web version.',
  },
  {
    q: 'Comment gérer ou résilier mon abonnement ?',
    a: 'Les abonnements sont gérés par l\'App Store. Va dans Réglages iOS → ton nom → Abonnements pour modifier ou résilier. L\'accès à vie est un paiement unique, sans renouvellement.',
    qEn: 'How do I manage or cancel my subscription?',
    aEn: 'Subscriptions are managed by the App Store. Go to iOS Settings → your name → Subscriptions to change or cancel. Lifetime access is a one-time payment, no renewal.',
  },
  {
    q: 'Comment restaurer mes achats ?',
    a: 'Sur l\'écran Abonnement, appuie sur « Restaurer mes achats ». Tes achats liés à ton identifiant Apple seront réactivés.',
    qEn: 'How do I restore my purchases?',
    aEn: 'On the Subscription screen, tap "Restore purchases". Your purchases tied to your Apple ID will be reactivated.',
  },
  {
    q: 'La prononciation ne détecte pas bien mon micro',
    a: 'Vérifie que l\'app a l\'autorisation d\'accéder au micro (Réglages iOS → XiaoLearn → Micro). Parle distinctement, dans un endroit calme, à ~20 cm du téléphone.',
    qEn: 'Pronunciation doesn\'t pick up my mic well',
    aEn: 'Check the app has microphone permission (iOS Settings → XiaoLearn → Microphone). Speak clearly, in a quiet place, ~20 cm from the phone.',
  },
];

function FaqItem({ item, colors }: { item: FaqEntry; colors: typeof Colors.light }) {
  const [open, setOpen] = useState(false);
  const { pick } = useI18n();
  return (
    <View style={[s.faqCard, { backgroundColor: colors.cardBg, borderColor: colors.borderLight }]}>
      <TouchableOpacity style={s.faqHead} onPress={() => setOpen(o => !o)} activeOpacity={0.7}>
        <Text style={[s.faqQ, { color: colors.textPrimary }]}>{pick(item.q, item.qEn)}</Text>
        <Ionicons name={open ? 'chevron-up' : 'chevron-down'} size={16} color={colors.textTertiary} />
      </TouchableOpacity>
      {open && <Text style={[s.faqA, { color: colors.textSecondary }]}>{pick(item.a, item.aEn)}</Text>}
    </View>
  );
}

export default function AideScreen() {
  const scheme = useColorScheme();
  const c = Colors[scheme];
  const router = useRouter();
  const { t } = useI18n();
  const goBack = () => router.canGoBack() ? router.back() : router.replace('/(tabs)' as any);

  const contact = () => {
    Linking.openURL(`mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent('Support XiaoLearn')}`).catch(() => {});
  };

  return (
    <SafeAreaView style={[s.root, { backgroundColor: c.appBg }]}>
      <View style={s.header}>
        <TouchableOpacity onPress={goBack} style={s.backBtn}>
          <Ionicons name="arrow-back" size={22} color={c.textPrimary} />
        </TouchableOpacity>
        <Text style={[s.headerTitle, { color: c.textPrimary }]}>{t('help.title')}</Text>
        <View style={{ width: 38 }} />
      </View>

      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 40, gap: 12 }}>
        {/* Contact */}
        <TouchableOpacity style={[s.contactCard, { backgroundColor: c.primaryRed }]} onPress={contact} activeOpacity={0.9}>
          <View style={[s.contactIcon, { backgroundColor: 'rgba(255,255,255,0.2)' }]}>
            <Ionicons name="mail-outline" size={22} color="#FFF" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={s.contactTitle}>{t('help.contact')}</Text>
            <Text style={s.contactSub}>{SUPPORT_EMAIL}</Text>
          </View>
          <Ionicons name="arrow-forward" size={20} color="#FFF" />
        </TouchableOpacity>

        <Text style={[s.sectionTitle, { color: c.textPrimary }]}>{t('help.faq')}</Text>
        {FAQ.map((item, i) => <FaqItem key={i} item={item} colors={c} />)}

        {/* Liens légaux */}
        <View style={s.legalRow}>
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

  contactCard: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    borderRadius: 16, padding: 16,
  },
  contactIcon: { width: 42, height: 42, borderRadius: 21, alignItems: 'center', justifyContent: 'center' },
  contactTitle: { color: '#FFF', fontSize: 16, fontWeight: '800' },
  contactSub: { color: 'rgba(255,255,255,0.9)', fontSize: 13, marginTop: 2 },

  sectionTitle: { fontSize: 16, fontWeight: '800', marginTop: 8 },
  faqCard: { borderRadius: 14, borderWidth: 1, overflow: 'hidden' },
  faqHead: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 14, gap: 10 },
  faqQ: { fontSize: 14.5, fontWeight: '600', flex: 1 },
  faqA: { fontSize: 13.5, lineHeight: 20, paddingHorizontal: 14, paddingBottom: 14 },

  legalRow: { alignItems: 'center', marginTop: 16 },
  legalLink: { fontSize: 13, fontWeight: '600', textDecorationLine: 'underline' },
});
