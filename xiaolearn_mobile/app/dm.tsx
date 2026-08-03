/**
 * Messages — discussions 1-1 entre apprenants.
 *
 * Écran distinct de Prof. Xiao : les deux partageaient auparavant une page à
 * sélecteur, si bien qu'ouvrir l'un affichait aussi l'autre.
 */
import { View, Text, StyleSheet, TouchableOpacity, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useColorScheme } from '@/hooks/useColorScheme';
import Colors from '@/constants/Colors';
import { useI18n } from '@/contexts/LanguageContext';
import { MessagesTab } from './(tabs)/messages';

export default function DirectMessagesScreen() {
  const scheme = useColorScheme();
  const colors = Colors[scheme];
  const router = useRouter();
  const { t } = useI18n();
  const { width } = useWindowDimensions();
  const px = width >= 768 ? 24 : 16;

  return (
    <SafeAreaView edges={['top']} style={[s.root, { backgroundColor: colors.appBg }]}>
      <View style={[s.header, { paddingHorizontal: px, borderBottomColor: colors.borderLight }]}>
        <TouchableOpacity onPress={() => router.back()} style={s.iconBtn}>
          <Ionicons name="arrow-back" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={[s.title, { color: colors.textPrimary }]}>{t('msg.tabMessages')}</Text>
      </View>

      <MessagesTab colors={colors} />
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  root: { flex: 1 },
  header: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    paddingTop: 8, paddingBottom: 12, borderBottomWidth: 1,
  },
  iconBtn: { width: 38, height: 38, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 17, fontWeight: '700' },
});
