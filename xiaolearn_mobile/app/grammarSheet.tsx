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
import { GRAMMAR_SHEETS, familyOf } from '@/data/grammarLessons';
import { RichText, SheetSection, SheetQuiz, LEVEL_COLORS, HSK_TO_CECR, gs } from './grammaire';
import { readableContent } from '@/components/TabletFrame';
import { focusFor } from '@/utils/grammarFocus';

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
  // LEVEL_COLORS est indexé par étiquette CECR (A1…), pas par niveau HSK :
  // sans conversion, l'accent de la fiche retombait toujours sur le rouge.
  const niveau = sheet ? (HSK_TO_CECR[sheet.level] ?? 'A1') : 'A1';
  const accent = sheet ? (LEVEL_COLORS[niveau] ?? c.primaryRed) : c.primaryRed;

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
      {/* Barre de retour seule : le titre vit dans la carte d'en-tête, où
          le hanzi a la place d'être vu plutôt que résumé en 22 pt. */}
      <View style={[s.topBar, { paddingHorizontal: px }]}>
        <TouchableOpacity onPress={() => router.back()} style={s.iconBtn}>
          <Ionicons name="arrow-back" size={24} color={c.textPrimary} />
        </TouchableOpacity>
        <Text style={[s.topCrumb, { color: c.textTertiary }]} numberOfLines={1}>
          {t('grammar.title')} · {niveau}
        </Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          { paddingHorizontal: px, paddingBottom: 60, gap: 14 },
          // Une ligne de texte de 2 000 pt de large ne se lit pas : l'œil
          // perd son retour à la ligne. La colonne reste lisible et centrée.
          readableContent,
        ]}
      >
        {/* Carte d'en-tête : le point de grammaire lui-même. */}
        <View style={[s.hero, { backgroundColor: c.cardBg, borderColor: accent + '55' }]}>
          <View style={s.heroBadges}>
            <View style={[s.badge, { backgroundColor: accent + '1A' }]}>
              <Text style={[s.badgeTxt, { color: accent }]}>{niveau}</Text>
            </View>
            <View style={[s.badge, { backgroundColor: c.appBg }]}>
              <Text style={[s.badgeTxt, { color: c.textSecondary }]}>
                {t(`grammar.fam.${familyOf(sheet)}` as any)}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => playHanzi(sheet.hanzi)}
              style={[s.heroPlay, { backgroundColor: accent }]}
              activeOpacity={0.85}
            >
              <Ionicons name="volume-medium" size={17} color="#FFF" />
            </TouchableOpacity>
          </View>
          <ToneColoredHanzi
            hanzi={sheet.hanzi}
            pinyin={sheet.pinyin}
            enabled={toneColors}
            style={[s.heroHanzi, { color: c.textPrimary }]}
          />
          {showPinyin && !!sheet.pinyin && (
            <Text style={[s.heroPinyin, { color: c.textTertiary }]}>{sheet.pinyin}</Text>
          )}
          <Text style={[s.heroFr, { color: c.textSecondary }]}>
            {pick(sheet.translationFr, sheet.translationEn)}
          </Text>
          {!!sheet.explanation && (
            <View style={[s.heroSep, { backgroundColor: c.borderLight }]} />
          )}
          {!!sheet.explanation && (
            <RichText
              text={pick(sheet.explanation, sheet.explanationEn)}
              style={[s.heroExplain, { color: c.textSecondary }]}
              boldColor={c.textPrimary}
            />
          )}
        </View>

        <SheetSection icon="📖" label={t('grammar.when')}  text={pick(sheet.whenToUse, sheet.whenToUseEn)} accent={accent} colors={c} focus={sheet.hanzi} />
        <SheetSection icon="🔧" label={t('grammar.how')}   text={pick(sheet.howToUse, sheet.howToUseEn)} accent={accent} colors={c} focus={sheet.hanzi} />
        <SheetSection icon="⚠️" label={t('grammar.traps')} text={pick(sheet.commonMistakes, sheet.commonMistakesEn)} accent="#EF4444" colors={c} focus={sheet.hanzi} />
        <SheetSection icon="💡" label={t('grammar.tips')}  text={pick(sheet.tips, sheet.tipsEn)} accent={accent} colors={c} focus={sheet.hanzi} />

        {sheet.examples.length > 0 && (
          <View style={[gs.card, { backgroundColor: c.cardBg, borderColor: c.borderLight }]}>
            <View style={gs.cardHead}>
              <View style={[gs.cardIcon, { backgroundColor: accent + '18' }]}>
                <Text style={gs.cardIconTxt}>✏️</Text>
              </View>
              <Text style={[gs.cardLabel, { color: c.textPrimary }]}>{t('grammar.examples')}</Text>
            </View>
            {sheet.examples.map((exm, i) => (
              <TouchableOpacity
                key={i}
                style={[gs.exCard, { backgroundColor: c.appBg, borderLeftColor: accent }]}
                onPress={() => playHanzi(exm.hanzi)}
                activeOpacity={0.7}
              >
                <View style={{ flex: 1, gap: 2 }}>
                  <ToneColoredHanzi
                    hanzi={exm.hanzi}
                    pinyin={exm.pinyin}
                    enabled={toneColors}
                    bold={focusFor(exm.hanzi, sheet.hanzi)}
                    style={[gs.exCardHanzi, { color: c.textPrimary }]}
                  />
                  {showPinyin && !!exm.pinyin ? <Text style={[gs.exCardPinyin, { color: c.textTertiary }]}>{exm.pinyin}</Text> : null}
                  <Text style={[gs.exCardFr, { color: c.textSecondary }]}>
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
  topBar: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingTop: 6, paddingBottom: 8 },
  topCrumb: { fontSize: 12.5, fontWeight: '600' },
  iconBtn: { width: 38, height: 38, alignItems: 'center', justifyContent: 'center' },

  hero: { borderRadius: 18, borderWidth: 1, padding: 18, gap: 4 },
  heroBadges: { flexDirection: 'row', alignItems: 'center', gap: 7, marginBottom: 8 },
  badge: { paddingHorizontal: 9, paddingVertical: 4, borderRadius: 7 },
  badgeTxt: { fontSize: 11, fontWeight: '800', letterSpacing: 0.3 },
  heroPlay: { width: 30, height: 30, borderRadius: 15, alignItems: 'center', justifyContent: 'center', marginLeft: 'auto' },
  heroHanzi: { fontSize: 34, fontWeight: '500', lineHeight: 44 },
  heroPinyin: { fontSize: 14 },
  heroFr: { fontSize: 15, fontWeight: '600', marginTop: 3 },
  heroSep: { height: StyleSheet.hairlineWidth, marginVertical: 12 },
  heroExplain: { fontSize: 13.5, lineHeight: 21 },
});
