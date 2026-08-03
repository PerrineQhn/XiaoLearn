/**
 * XiaoLearn Mobile — Atelier
 * Pratique de l'écriture des caractères (ordre des traits) et prononciation
 */
import { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, TextInput, TouchableOpacity,
  ScrollView, useWindowDimensions, KeyboardAvoidingView, Platform,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useColorScheme } from '@/hooks/useColorScheme';
import Colors from '@/constants/Colors';
import { HanziWriter } from '@/components/HanziWriter';
import { useAudio } from '@/hooks/useAudio';
import { usePronunciation } from '@/hooks/usePronunciation';
import { getAllCards } from '@/hooks/useSrsData';
import { useI18n } from '@/contexts/LanguageContext';
import { useCardUnlocks } from '@/contexts/CardsContext';

const SUGGESTED = ['你', '好', '我', '是', '的', '不', '有', '在', '人', '大', '中', '国', '学', '习', '中文'];

// Table de fallback pinyin pour les caractères courants non présents dans les leçons
const PINYIN_FALLBACK: Record<string, string> = {
  '你': 'nǐ', '好': 'hǎo', '我': 'wǒ', '是': 'shì', '的': 'de',
  '不': 'bù', '有': 'yǒu', '在': 'zài', '人': 'rén', '大': 'dà',
  '中': 'zhōng', '国': 'guó', '学': 'xué', '习': 'xí', '中文': 'zhōngwén',
};

/** Construit un index hanzi → pinyin depuis les cartes SRS */
function buildPinyinIndex(): Record<string, string> {
  const idx: Record<string, string> = { ...PINYIN_FALLBACK };
  for (const card of getAllCards()) {
    if (card.hanzi && card.pinyin) idx[card.hanzi] = card.pinyin;
  }
  return idx;
}
const PINYIN_INDEX = buildPinyinIndex();

export default function AtelierScreen() {
  const scheme = useColorScheme();
  const c = Colors[scheme];
  const router = useRouter();
  const { width } = useWindowDimensions();
  const px = width >= 768 ? 24 : 16;
  const { t } = useI18n();
  const params = useLocalSearchParams<{ hanzi?: string }>();
  const [input, setInput] = useState('');
  const [current, setCurrent] = useState(() => params.hanzi ?? '你');
  const [charIdx, setCharIdx] = useState(0);
  const { playHanzi } = useAudio();
  const { trackAndCheck } = useCardUnlocks();
  const { startRecording, stopAndScore, reset: resetPron, status: pronStatus, result: pronResult, error: pronError } = usePronunciation();
  const isRecording = pronStatus === 'recording';
  const isLoading  = pronStatus === 'loading';
  const score = pronResult?.accuracyScore ?? null;

  /**
   * Le score de prononciation n'était enregistré nulle part depuis l'Atelier —
   * seul le mode prononciation des révisions alimentait le compteur. La carte
   * « Le Duc du Tonnerre » (score ≥ 90) restait donc verrouillée à 0 quel que
   * soit le résultat obtenu ici.
   */
  useEffect(() => {
    if (typeof score === 'number') void trackAndCheck({ bestPronunciation: score });
  }, [score, trackAndCheck]);

  const handleSubmit = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    setCurrent(trimmed);
    setCharIdx(0);
    setInput('');
  };

  const chars = Array.from(current).filter(c => /[一-鿿]/.test(c));
  const displayChar = chars[charIdx] ?? current[0] ?? '你';
  const displayPinyin = PINYIN_INDEX[current] ?? PINYIN_INDEX[displayChar] ?? '';

  const scoreColor = score === null ? c.textTertiary
    : score >= 80 ? c.jadeGreen
    : score >= 60 ? '#F9A825'
    : '#E05040';

  return (
    <SafeAreaView style={[s.root, { backgroundColor: c.appBg }]}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        {/* Header */}
        <View style={[s.header, { paddingHorizontal: px }]}>
          <TouchableOpacity onPress={() => router.canGoBack() ? router.back() : router.replace('/(tabs)')} style={s.backBtn}>
            <Ionicons name="arrow-back" size={22} color={c.textPrimary} />
          </TouchableOpacity>
          <View style={{ alignItems: 'center' }}>
            <Text style={[s.title, { color: c.textPrimary }]}>{t('atelier.title')}</Text>
            <Text style={[s.subtitle, { color: c.textTertiary }]}>{t('atelier.subtitle')}</Text>
          </View>
          <View style={{ width: 38 }} />
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: px, paddingBottom: 40 }}>
          {/* Mot cible si venu du mot du jour */}
          {params.hanzi && (
            <View style={[s.targetBanner, { backgroundColor: c.cardBg, borderColor: c.borderLight }]}>
              <Text style={[s.targetLabel, { color: c.textTertiary }]}>{t('atelier.target')}</Text>
              <Text style={[s.targetWord, { color: c.textPrimary }]}>{params.hanzi}</Text>
            </View>
          )}

          {/* Saisie + suggestions — cachées si on vient du mot du jour */}
          {!params.hanzi && (
            <>
              <View style={[s.inputCard, { backgroundColor: c.cardBg, borderColor: c.borderLight }]}>
                <Text style={[s.inputLabel, { color: c.textTertiary }]}>{t('atelier.inputLabel')}</Text>
                <View style={s.inputRow}>
                  <TextInput
                    style={[s.input, { color: c.textPrimary, borderColor: c.borderMedium }]}
                    value={input}
                    onChangeText={setInput}
                    placeholder={t('atelier.inputPlaceholder')}
                    placeholderTextColor={c.textTertiary}
                    onSubmitEditing={handleSubmit}
                    returnKeyType="go"
                  />
                  <TouchableOpacity
                    style={[s.goBtn, { backgroundColor: c.primaryRed }]}
                    onPress={handleSubmit}
                  >
                    <Text style={s.goBtnTxt}>OK</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <ScrollView horizontal showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ gap: 8, paddingVertical: 12 }}>
                {SUGGESTED.map(ch => (
                  <TouchableOpacity
                    key={ch}
                    style={[s.suggChip, {
                      backgroundColor: current === ch ? c.primaryRedLight : c.cardBg,
                      borderColor: current === ch ? c.primaryRed : c.borderLight,
                    }]}
                    onPress={() => { setCurrent(ch); setCharIdx(0); }}
                  >
                    <Text style={[s.suggTxt, { color: current === ch ? c.primaryRed : c.textPrimary }]}>{ch}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </>
          )}

          {/* HanziWriter */}
          <View style={[s.writerCard, { backgroundColor: c.cardBg, borderColor: c.borderLight }]}>
            <Text style={[s.writerLabel, { color: c.textTertiary }]}>{t('atelier.strokeOrder')}</Text>

            {/* Multi-char selector */}
            {chars.length > 1 && (
              <View style={s.charSelector}>
                {chars.map((ch, i) => (
                  <TouchableOpacity
                    key={i}
                    style={[s.charChip, {
                      backgroundColor: i === charIdx ? c.primaryRed : c.cardBgAlt,
                    }]}
                    onPress={() => setCharIdx(i)}
                  >
                    <Text style={[s.charChipTxt, { color: i === charIdx ? '#FFF' : c.textPrimary }]}>{ch}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            <View style={{ alignItems: 'center', marginTop: 8 }}>
              <HanziWriter hanzi={displayChar} size={220} strokeColor={c.primaryRed} animate />
            </View>
            <Text style={[s.charLabel, { color: c.textPrimary }]}>{displayChar}</Text>
            {!!displayPinyin && (
              <Text style={[s.charPinyin, { color: c.textTertiary }]}>{displayPinyin}</Text>
            )}
          </View>

          {/* Prononciation */}
          <View style={[s.pronCard, { backgroundColor: c.cardBg, borderColor: c.borderLight }]}>
            <Text style={[s.pronTitle, { color: c.textPrimary }]}>{t('atelier.pronTitle')}</Text>
            <Text style={[s.pronSub, { color: c.textSecondary }]}>{t('atelier.pronSub')}</Text>

            <View style={s.pronBtns}>
              <TouchableOpacity
                style={[s.pronBtn, { backgroundColor: c.primaryRedLight }]}
                onPress={() => playHanzi(displayChar)}
              >
                <Ionicons name="volume-high-outline" size={22} color={c.primaryRed} />
                <Text style={[s.pronBtnTxt, { color: c.primaryRed }]}>{t('atelier.listen')}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[s.pronBtn, {
                  backgroundColor: isRecording ? '#FF4D4D15' : isLoading ? c.borderLight : c.cardBgAlt,
                  borderWidth: isRecording ? 1.5 : 0,
                  borderColor: isRecording ? '#FF4D4D' : 'transparent',
                  opacity: isLoading ? 0.6 : 1,
                }]}
                onPress={isRecording ? () => stopAndScore(displayChar) : isLoading ? undefined : startRecording}
                disabled={isLoading}
              >
                {isLoading
                  ? <ActivityIndicator size="small" color={c.textSecondary} />
                  : <Ionicons name={isRecording ? 'stop-circle' : 'mic-outline'} size={22}
                      color={isRecording ? '#FF4D4D' : c.textSecondary} />
                }
                <Text style={[s.pronBtnTxt, { color: isRecording ? '#FF4D4D' : c.textSecondary }]}>
                  {isLoading ? t('atelier.analyzing') : isRecording ? t('atelier.stop') : t('atelier.speak')}
                </Text>
              </TouchableOpacity>
            </View>

            {/* Score */}
            {score !== null && (
              <View style={[s.scoreRow, { backgroundColor: scoreColor + '15' }]}>
                <Text style={[s.scoreTxt, { color: scoreColor }]}>
                  {score >= 80 ? t('atelier.scoreExcellent') : score >= 60 ? t('atelier.scoreGood') : t('atelier.scoreRetry')}
                </Text>
                <Text style={[s.scoreNum, { color: scoreColor }]}>{score}/100</Text>
              </View>
            )}

            {/* Erreur */}
            {pronStatus === 'error' && (
              <View style={s.errorRow}>
                <Ionicons name="warning" size={18} color="#FFF" style={{ marginTop: 1 }} />
                <Text style={s.errorTxt} numberOfLines={4}>
                  {pronError ?? t('atelier.errorUnknown')}
                </Text>
                <TouchableOpacity onPress={resetPron} style={s.errorRetry}>
                  <Ionicons name="refresh" size={15} color="#EF4444" />
                  <Text style={s.errorRetryTxt}>{t('atelier.retry')}</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  root: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: 8, paddingBottom: 12 },
  backBtn: { width: 38, height: 38, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 18, fontWeight: '700' },
  subtitle: { fontSize: 12, marginTop: 1 },
  targetBanner: { borderRadius: 14, borderWidth: 1, paddingHorizontal: 16, paddingVertical: 12, marginBottom: 12 },
  targetLabel: { fontSize: 10, fontWeight: '700', letterSpacing: 1.2, marginBottom: 4 },
  targetWord: { fontSize: 28, fontWeight: '500' },

  inputCard: { borderRadius: 16, borderWidth: 1, padding: 16, marginBottom: 4 },
  inputLabel: { fontSize: 12, fontWeight: '600', marginBottom: 10 },
  inputRow: { flexDirection: 'row', gap: 10 },
  input: { flex: 1, fontSize: 22, borderWidth: 1, borderRadius: 12, paddingHorizontal: 14, paddingVertical: 8, textAlign: 'center' },
  goBtn: { paddingHorizontal: 20, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  goBtnTxt: { color: '#FFF', fontWeight: '700', fontSize: 15 },

  suggChip: { paddingHorizontal: 16, paddingVertical: 10, borderRadius: 12, borderWidth: 1 },
  suggTxt: { fontSize: 18, fontWeight: '600' },

  writerCard: { borderRadius: 16, borderWidth: 1, padding: 16, marginBottom: 12, alignItems: 'center' },
  writerLabel: { fontSize: 11, fontWeight: '600', marginBottom: 8, alignSelf: 'flex-start' },
  charSelector: { flexDirection: 'row', gap: 8, marginBottom: 8 },
  charChip: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 10 },
  charChipTxt: { fontSize: 20, fontWeight: '400' },
  charLabel: { fontSize: 24, fontWeight: '400', marginTop: 8 },
  charPinyin: { fontSize: 16, marginTop: 4 },

  pronCard: { borderRadius: 16, borderWidth: 1, padding: 16 },
  pronTitle: { fontSize: 15, fontWeight: '700', marginBottom: 4 },
  pronSub: { fontSize: 12, marginBottom: 14 },
  pronBtns: { flexDirection: 'row', gap: 12 },
  pronBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, paddingVertical: 14, borderRadius: 12 },
  pronBtnTxt: { fontSize: 13, fontWeight: '600' },
  scoreRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 12, borderRadius: 10, paddingHorizontal: 14, paddingVertical: 10 },
  scoreTxt: { fontSize: 14, fontWeight: '600' },
  scoreNum: { fontSize: 18, fontWeight: '800' },
  errorRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 8, marginTop: 12, borderRadius: 10, backgroundColor: '#EF4444', paddingHorizontal: 14, paddingVertical: 12 },
  errorTxt: { flex: 1, color: '#FFF', fontSize: 12, fontWeight: '500', lineHeight: 18 },
  errorRetry: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: '#FFF', borderRadius: 8, paddingHorizontal: 10, paddingVertical: 6, marginTop: 2 },
  errorRetryTxt: { color: '#EF4444', fontSize: 12, fontWeight: '700' },
});
