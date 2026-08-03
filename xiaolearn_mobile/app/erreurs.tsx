/**
 * XiaoLearn Mobile — Mes erreurs
 * Révision ciblée des exercices ratés (stockés en AsyncStorage)
 */
import { useState, useCallback } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useFocusEffect } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useColorScheme } from '@/hooks/useColorScheme';
import Colors from '@/constants/Colors';
import { useAudio } from '@/hooks/useAudio';
import { useI18n } from '@/contexts/LanguageContext';
import { ERRORS_KEY, readErrors, clearError, type ErrorEntry, type ErrorSource } from '@/data/errorLog';

// La clé et le type vivent dans data/errorLog.ts, avec le point d'écriture.
// Réexportés ici : d'anciens imports pointaient sur cet écran.
export { ERRORS_KEY, type ErrorEntry } from '@/data/errorLog';

export default function ErreursScreen() {
  const scheme = useColorScheme();
  const c = Colors[scheme];
  const router = useRouter();
  const { width } = useWindowDimensions();
  const px = width >= 768 ? 24 : 16;
  const { playHanzi } = useAudio();
  const { t } = useI18n();
  const [errors, setErrors] = useState<ErrorEntry[]>([]);

  // Les plus récentes en tête : le journal est stocké dans l'ordre d'ajout.
  useFocusEffect(useCallback(() => {
    readErrors().then(list => setErrors(list.slice().reverse()));
  }, []));

  const clearAll = useCallback(async () => {
    await AsyncStorage.removeItem(ERRORS_KEY);
    setErrors([]);
  }, []);

  const removeError = useCallback(async (exerciseId: string) => {
    setErrors(prev => prev.filter(e => e.exerciseId !== exerciseId));
    await clearError(exerciseId);
  }, []);

  return (
    <SafeAreaView style={[s.root, { backgroundColor: c.appBg }]}>
      {/* Header */}
      <View style={[s.header, { paddingHorizontal: px }]}>
        <TouchableOpacity onPress={() => router.canGoBack() ? router.back() : router.replace('/(tabs)')} style={s.backBtn}>
          <Ionicons name="arrow-back" size={22} color={c.textPrimary} />
        </TouchableOpacity>
        <Text style={[s.title, { color: c.textPrimary }]}>{t('err.title')}</Text>
        {errors.length > 0 ? (
          <TouchableOpacity onPress={clearAll} style={s.clearBtn}>
            <Text style={[s.clearTxt, { color: c.primaryRed }]}>{t('err.clear')}</Text>
          </TouchableOpacity>
        ) : <View style={{ width: 60 }} />}
      </View>

      {errors.length === 0 ? (
        <View style={s.empty}>
          <Text style={s.emptyIcon}>🎉</Text>
          <Text style={[s.emptyTitle, { color: c.textPrimary }]}>{t('err.emptyTitle')}</Text>
          <Text style={[s.emptySub, { color: c.textSecondary }]}>
            {t('err.emptySub')}
          </Text>
          <TouchableOpacity
            style={[s.goBtn, { backgroundColor: c.primaryRed }]}
            onPress={() => router.push('/(tabs)/cours')}
          >
            <Text style={s.goBtnTxt}>{t('err.doLesson')}</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: px, paddingBottom: 40, gap: 10 }}>
          <Text style={[s.countLabel, { color: c.textTertiary }]}>
            {t('err.count', { n: errors.length })}
          </Text>
          {errors.map(err => (
            <View key={err.exerciseId} style={[s.card, { backgroundColor: c.cardBg, borderColor: c.borderLight }]}>
              <View style={s.cardTop}>
                <View style={[s.srcBadge, { backgroundColor: SOURCE_TINT[err.source ?? 'lesson'](c) }]}>
                  <Ionicons name={SOURCE_ICON[err.source ?? 'lesson']} size={11} color={c.textSecondary} />
                </View>
                <Text style={[s.lessonLabel, { color: c.textTertiary }]} numberOfLines={1}>
                  {err.lessonTitle}
                </Text>
                <TouchableOpacity onPress={() => removeError(err.exerciseId)}>
                  <Ionicons name="close-circle-outline" size={18} color={c.textTertiary} />
                </TouchableOpacity>
              </View>
              <Text style={[s.prompt, { color: c.textPrimary }]}>{err.prompt}</Text>
              <View style={s.answersRow}>
                <View style={[s.answerBadge, { backgroundColor: '#FFE8E8', borderColor: '#FF4D4D40' }]}>
                  <Ionicons name="close" size={12} color="#FF4D4D" />
                  <Text style={[s.answerTxt, { color: '#CC0000' }]}>{err.userAnswer}</Text>
                </View>
                <Ionicons name="arrow-forward" size={14} color={c.textTertiary} />
                <View style={[s.answerBadge, { backgroundColor: c.jadeGreenLight, borderColor: c.jadeGreen + '40' }]}>
                  <Ionicons name="checkmark" size={12} color={c.jadeGreen} />
                  <Text style={[s.answerTxt, { color: c.jadeGreen }]}>{err.correctAnswer}</Text>
                </View>
              </View>
              {err.explanation && (
                <Text style={[s.explain, { color: c.textSecondary }]}>{err.explanation}</Text>
              )}
              {err.audioHanzi && (
                <TouchableOpacity
                  style={[s.audioBtn, { backgroundColor: c.primaryRedLight }]}
                  onPress={() => playHanzi(err.audioHanzi!)}
                >
                  <Ionicons name="volume-high-outline" size={16} color={c.primaryRed} />
                  <Text style={[s.audioBtnTxt, { color: c.primaryRed }]}>{t('err.listen')} : {err.audioHanzi}</Text>
                </TouchableOpacity>
              )}
            </View>
          ))}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

/** Icône et fond par provenance — l'étiquette dit d'où vient la faute. */
const SOURCE_ICON: Record<ErrorSource, 'school-outline' | 'chatbubble-outline' | 'ear-outline'> = {
  lesson: 'school-outline',
  chat: 'chatbubble-outline',
  dictation: 'ear-outline',
};
const SOURCE_TINT: Record<ErrorSource, (c: typeof Colors.light) => string> = {
  lesson: c => c.primaryRedLight,
  chat: c => c.cardBgAlt,
  dictation: c => c.jadeGreenLight,
};

const s = StyleSheet.create({
  root: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: 8, paddingBottom: 16 },
  backBtn: { width: 38, height: 38, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 18, fontWeight: '700' },
  clearBtn: { paddingHorizontal: 4 },
  clearTxt: { fontSize: 13, fontWeight: '600' },
  countLabel: { fontSize: 12, marginBottom: 4 },
  card: { borderRadius: 14, borderWidth: 1, padding: 14 },
  cardTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 },
  lessonLabel: { fontSize: 11, fontWeight: '600', letterSpacing: 0.3, flex: 1 },
  srcBadge: { width: 20, height: 20, borderRadius: 6, alignItems: 'center', justifyContent: 'center', marginRight: 7 },
  explain: { fontSize: 12.5, lineHeight: 18, marginTop: 10 },
  prompt: { fontSize: 14, fontWeight: '500', marginBottom: 10, lineHeight: 20 },
  answersRow: { flexDirection: 'row', alignItems: 'center', gap: 8, flexWrap: 'wrap' },
  answerBadge: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8, borderWidth: 1 },
  answerTxt: { fontSize: 12, fontWeight: '600' },
  audioBtn: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 10, paddingHorizontal: 12, paddingVertical: 8, borderRadius: 10, alignSelf: 'flex-start' },
  audioBtnTxt: { fontSize: 13, fontWeight: '600' },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 40 },
  emptyIcon: { fontSize: 52, marginBottom: 12 },
  emptyTitle: { fontSize: 20, fontWeight: '700', marginBottom: 8, textAlign: 'center' },
  emptySub: { fontSize: 14, textAlign: 'center', lineHeight: 20, marginBottom: 28 },
  goBtn: { paddingHorizontal: 28, paddingVertical: 13, borderRadius: 14 },
  goBtnTxt: { color: '#FFF', fontSize: 15, fontWeight: '700' },
});
