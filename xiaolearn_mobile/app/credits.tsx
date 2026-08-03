/**
 * Crédits — attribution des ressources tierces.
 *
 * Les illustrations Humaaans sont en CC0 : rien n'oblige à créditer. On le
 * fait quand même, parce que du travail offert mérite d'être nommé.
 */
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useColorScheme } from '@/hooks/useColorScheme';
import Colors from '@/constants/Colors';
import { useI18n } from '@/contexts/LanguageContext';

const CREDITS = [
  {
    key: 'humaaans',
    author: 'Pablo Stanley',
    licence: 'CC0 1.0',
    url: 'https://www.humaaans.com/',
  },
];

export default function CreditsScreen() {
  const scheme = useColorScheme();
  const colors = Colors[scheme];
  const router = useRouter();
  const { t } = useI18n();
  const { width } = useWindowDimensions();
  const px = width >= 768 ? 24 : 16;

  return (
    <SafeAreaView style={[s.root, { backgroundColor: colors.appBg }]} edges={['top']}>
      <View style={[s.header, { paddingHorizontal: px }]}>
        <TouchableOpacity onPress={() => router.back()} style={s.backBtn}>
          <Ionicons name="arrow-back" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={[s.title, { color: colors.textPrimary }]}>{t('credits.title')}</Text>
      </View>

      <ScrollView contentContainerStyle={{ paddingHorizontal: px, paddingBottom: 40, gap: 18 }}>
        <View style={[s.card, { backgroundColor: colors.cardBg, borderColor: colors.borderLight }]}>
          <Text style={[s.section, { color: colors.textPrimary }]}>{t('credits.avatarsTitle')}</Text>
          <Text style={[s.body, { color: colors.textSecondary }]}>{t('credits.avatarsIntro')}</Text>

          {CREDITS.map(c => (
            <View key={c.key} style={{ marginTop: 12 }}>
              <Text style={[s.label, { color: colors.textTertiary }]}>{t('credits.authors')}</Text>
              <Text style={[s.body, { color: colors.textSecondary }]}>{c.author}</Text>

              <Text style={[s.label, { color: colors.textTertiary }]}>{t('credits.licenses')}</Text>
              <Text style={[s.body, { color: colors.textSecondary }]}>{c.licence}</Text>

              <TouchableOpacity style={s.link} onPress={() => Linking.openURL(c.url)}>
                <Ionicons name="open-outline" size={15} color={colors.primaryRed} />
                <Text style={[s.linkTxt, { color: colors.primaryRed }]}>{c.url.replace('https://', '')}</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  root: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingTop: 8, paddingBottom: 10 },
  backBtn: { width: 38, height: 38, alignItems: 'center', justifyContent: 'center' },
  title: { flex: 1, fontSize: 22, fontWeight: '800' },
  card: { borderRadius: 16, borderWidth: 1, padding: 16 },
  section: { fontSize: 16, fontWeight: '700', marginBottom: 6 },
  label: { fontSize: 11, fontWeight: '800', letterSpacing: 0.6, marginTop: 10 },
  body: { fontSize: 13.5, lineHeight: 20 },
  link: { flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 12 },
  linkTxt: { fontSize: 13.5, fontWeight: '600' },
});
