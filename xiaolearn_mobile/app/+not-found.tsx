import { Link, Stack } from 'expo-router';
import { useI18n } from '@/contexts/LanguageContext';
import { StyleSheet, Text, View } from 'react-native';

export default function NotFoundScreen() {
  const { t } = useI18n();
  return (
    <>
      <Stack.Screen options={{ title: t('common.notFound') }} />
      <View style={styles.container}>
        <Text style={styles.title}>{t('common.notFound')}</Text>
        <Link href="/" style={styles.link}>
          <Text style={styles.linkText}>{t('common.backHome')}</Text>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 },
  title: { fontSize: 20, fontWeight: 'bold' },
  link: { marginTop: 15, paddingVertical: 15 },
  linkText: { color: '#E05040', fontSize: 14 },
});
