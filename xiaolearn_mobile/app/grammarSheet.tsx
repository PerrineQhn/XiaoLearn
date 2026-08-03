/**
 * Fiche de grammaire — page dédiée.
 *
 * Remplace l'accordéon de la liste : une fiche complète fait plusieurs écrans,
 * la déplier sur place obligeait à défiler longuement pour retrouver les
 * autres fiches.
 */
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, useWindowDimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useColorScheme } from '@/hooks/useColorScheme';
import Colors from '@/constants/Colors';
import { useI18n } from '@/contexts/LanguageContext';
import { useAudio } from '@/hooks/useAudio';
import { useDisplaySettings } from '@/contexts/DisplaySettingsContext';
import ToneColoredHanzi from '@/components/ToneColoredHanzi';
import { GRAMMAR_SHEETS } from '@/data/grammarLessons';
import { RichText, SheetSection, SheetQuiz, LEVEL_COLORS, gs } from './grammaire';

export default function GrammarSheetScreen() {
  const scheme = useColorScheme();
  const c = Colors[scheme];
  const router = useRouter();
  const { t, pick } = useI18n();
  const { playHanzi } = useAudio();
  const { toneColors, showPinyin } = useDisplaySettings();
  const { width } = useWindowDimensions();
  const px = width >= 768 ? 24 : 16;
  const { id } = useLocalSearchParams<{ id: string }>();

  const sheet = GRAMMAR_SHEETS.find(x => x.id === id);
  const accent = sheet ? (LEVEL_COLORS[sheet.level] ?? c.primaryRed) : c.primaryRed;

  if (!sheet) {
    return (
      <SafeAreaView style={[s.root, { backgroundColor: c.appBg }]} edges={['top']}>
        <View style={s.center}>
          <Text style={{ color: c.textSecondary }}>{t('grammar.notFound')}</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[s.root, { backgroundColor: c.appBg }]} edges={['top']}>
      <View style={[s.header, { paddingHorizontal: px, borderBottomColor: c.borderLight }]}>
        <TouchableOpacity onPress={() => router.back()} style={s.iconBtn}>
          <Ionicons name="arrow-back" size={24} color={c.textPrimary} />
        </TouchableOpacity>
        <View style={{ flex: 1, marginLeft: 4 }}>
          <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 8 }}>
            <ToneColoredHanzi
              hanzi={sheet.hanzi}
              pinyin={sheet.pinyin}
              enabled={toneColors}
              style={[s.titleHanzi, { color: c.textPrimary }]}
            />
            {showPinyin ? (
              <Text style={[s.titlePinyin, { color: c.textTertiary }]}>{sheet.pinyin}</Text>
            ) : null}
          </View>
          <Text style={[s.titleFr, { color: c.textSecondary }]} numberOfLines={2}>
            {pick(sheet.translationFr, sheet.translationEn)}
          </Text>
        </View>
        <TouchableOpacity onPress={() => playHanzi(sheet.hanzi)} style={s.iconBtn}>
          <Ionicons name="volume-medium-outline" size={22} color={accent} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={{ paddingHorizontal: px, paddingVertical: 16, gap: 16 }}>
        {!!sheet.explanation && (
          <RichText
            text={pick(sheet.explanation, sheet.explanationEn)}
            style={[gs.secBody, { color: c.textSecondary }]}
            boldColor={c.textPrimary}
          />
        )}

        <SheetSection icon="📖" label={t('grammar.when')}  text={pick(sheet.whenToUse, sheet.whenToUseEn)} accent={accent} colors={c} />
        <SheetSection icon="🔧" label={t('grammar.how')}   text={pick(sheet.howToUse, sheet.howToUseEn)} accent={accent} colors={c} />
        <SheetSection icon="⚠️" label={t('grammar.traps')} text={pick(sheet.commonMistakes, sheet.commonMistakesEn)} accent="#EF4444" colors={c} />
        <SheetSection icon="💡" label={t('grammar.tips')}  text={pick(sheet.tips, sheet.tipsEn)} accent={accent} colors={c} />

        {sheet.examples.length > 0 && (
          <View style={gs.section}>
            <Text style={[gs.secLabel, { color: accent }]}>✏️ {t('grammar.examples')}</Text>
            {sheet.examples.map((exm, i) => (
              <TouchableOpacity
                key={i}
                style={[gs.example, { backgroundColor: c.cardBg, borderColor: c.borderLight }]}
                onPress={() => playHanzi(exm.hanzi)}
                activeOpacity={0.7}
              >
                <View style={{ flex: 1, gap: 2 }}>
                  <ToneColoredHanzi
                    hanzi={exm.hanzi}
                    pinyin={exm.pinyin}
                    enabled={toneColors}
                    style={[gs.exHanzi, { color: c.textPrimary }]}
                  />
                  {showPinyin ? <Text style={[gs.exPinyin, { color: c.textTertiary }]}>{exm.pinyin}</Text> : null}
                  <Text style={[gs.exFr, { color: c.textSecondary }]}>
                    {pick(exm.translationFr, exm.translationEn)}
                  </Text>
                </View>
                <Ionicons name="volume-medium-outline" size={16} color={c.textTertiary} />
              </TouchableOpacity>
            ))}
          </View>
        )}

        {sheet.quiz ? <SheetQuiz quiz={sheet.quiz} accent={accent} colors={c} /> : null}
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  root: { flex: 1 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  header: { flexDirection: 'row', alignItems: 'center', paddingTop: 8, paddingBottom: 12, borderBottomWidth: 1 },
  iconBtn: { width: 38, height: 38, alignItems: 'center', justifyContent: 'center' },
  titleHanzi: { fontSize: 22, fontWeight: '500' },
  titlePinyin: { fontSize: 13 },
  titleFr: { fontSize: 13, marginTop: 1 },
});
