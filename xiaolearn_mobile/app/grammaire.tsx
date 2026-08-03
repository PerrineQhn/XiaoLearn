/**
 * XiaoLearn Mobile — Grammaire
 */
import { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useColorScheme } from '@/hooks/useColorScheme';
import Colors from '@/constants/Colors';
import { GRAMMAR_SHEETS, type GrammarSheet } from '@/data/grammarLessons';
import { useAudio } from '@/hooks/useAudio';
import ToneColoredHanzi from '@/components/ToneColoredHanzi';
import { useDisplaySettings } from '@/contexts/DisplaySettingsContext';
import { useI18n } from '@/contexts/LanguageContext';

// ── Données — aligné sur GrammarPageV3 web ─────────────────────
// Les 84 fiches HSK sont présentées sous des étiquettes CECR via le même
// mapping que le web : hsk1→A1, hsk2→A2, hsk3→B1, hsk4→B2, hsk5→C1, hsk6/7→C2.
const HSK_TO_CECR: Record<string, string> = {
  hsk1: 'A1', hsk2: 'A2', hsk3: 'B1', hsk4: 'B2', hsk5: 'C1', hsk6: 'C2', hsk7: 'C2',
};

const BY_LEVEL: Record<string, GrammarSheet[]> = {};
for (const sheet of GRAMMAR_SHEETS) {
  const slot = HSK_TO_CECR[sheet.level] ?? 'A1';
  (BY_LEVEL[slot] ??= []).push(sheet);
}
const LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'].filter(l => BY_LEVEL[l]?.length);

export const LEVEL_COLORS: Record<string, string> = {
  A1: '#4CAF50', A2: '#F9A825', B1: '#03A9F4', B2: '#9C27B0', C1: '#3F51B5', C2: '#E91E63',
};

// ── Rendu du texte avec **gras** ───────────────────────────────
export function RichText({ text, style, boldColor }: { text: string; style?: object; boldColor: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return (
    <Text style={style}>
      {parts.map((p, i) =>
        p.startsWith('**') && p.endsWith('**')
          ? <Text key={i} style={{ fontWeight: '700', color: boldColor }}>{p.slice(2, -2)}</Text>
          : p
      )}
    </Text>
  );
}

// ── Carte accordéon ────────────────────────────────────────────
// ── Fiche grammaire HSK (accordéon) ────────────────────────────

export function SheetSection({ icon, label, text, accent, colors }: {
  icon: string; label: string; text: string; accent: string; colors: typeof Colors.light;
}) {
  if (!text?.trim()) return null;
  return (
    <View style={gs.section}>
      <Text style={[gs.secLabel, { color: accent }]}>{icon} {label}</Text>
      <RichText text={text} style={[gs.secBody, { color: colors.textSecondary }]} boldColor={colors.textPrimary} />
    </View>
  );
}

export function SheetQuiz({ quiz, accent, colors }: {
  quiz: NonNullable<GrammarSheet['quiz']>; accent: string; colors: typeof Colors.light;
}) {
  const [chosen, setChosen] = useState<number | null>(null);
  const { t, pick } = useI18n();
  const answered = chosen !== null;
  return (
    <View style={gs.section}>
      <Text style={[gs.secLabel, { color: accent }]}>🎯 {t('grammar.quiz')}</Text>
      <Text style={[gs.quizPrompt, { color: colors.textPrimary }]}>{pick(quiz.prompt, quiz.promptEn)}</Text>
      <View style={gs.quizChoices}>
        {quiz.choices.map((choice, i) => {
          const isCorrect = i === quiz.correctChoiceIndex;
          const isChosen = i === chosen;
          const bg = !answered ? colors.appBg
            : isCorrect ? '#4CAF5020'
            : isChosen ? '#EF444420'
            : colors.appBg;
          const border = !answered ? colors.borderLight
            : isCorrect ? '#4CAF50'
            : isChosen ? '#EF4444'
            : colors.borderLight;
          return (
            <TouchableOpacity
              key={i}
              style={[gs.quizChoice, { backgroundColor: bg, borderColor: border }]}
              onPress={() => !answered && setChosen(i)}
              activeOpacity={0.7}
              disabled={answered}
            >
              <Text style={[gs.quizChoiceTxt, { color: colors.textPrimary }]}>{choice}</Text>
              {answered && isCorrect ? <Ionicons name="checkmark-circle" size={16} color="#4CAF50" /> : null}
              {answered && isChosen && !isCorrect ? <Ionicons name="close-circle" size={16} color="#EF4444" /> : null}
            </TouchableOpacity>
          );
        })}
      </View>
      {answered && (
        <Text style={[gs.quizVerdict, { color: chosen === quiz.correctChoiceIndex ? '#4CAF50' : '#EF4444' }]}>
          {chosen === quiz.correctChoiceIndex ? t('grammar.quizCorrect') : `${t('grammar.quizAnswer')} ${quiz.choices[quiz.correctChoiceIndex]}`}
        </Text>
      )}
    </View>
  );
}

function GrammarSheetCard({ sheet, accent, colors }: {
  sheet: GrammarSheet; accent: string; colors: typeof Colors.light;
}) {
  const router = useRouter();
  const { toneColors, showPinyin } = useDisplaySettings();
  const { pick } = useI18n();

  // Ouvre une page dédiée : déplier une fiche entière dans la liste obligeait
  // à faire défiler des écrans de contenu pour revenir aux autres fiches.
  return (
    <TouchableOpacity
      style={[pc.card, { backgroundColor: colors.cardBg, borderColor: colors.borderLight }]}
      onPress={() => router.push({ pathname: '/grammarSheet', params: { id: sheet.id } } as any)}
      activeOpacity={0.75}
    >
      <View style={pc.header}>
        <View style={[pc.accentBar, { backgroundColor: accent }]} />
        <View style={{ flex: 1, gap: 1 }}>
          <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 8 }}>
            <ToneColoredHanzi hanzi={sheet.hanzi} pinyin={sheet.pinyin} enabled={toneColors} style={[gs.headHanzi, { color: colors.textPrimary }]} />
            {showPinyin ? <Text style={[gs.headPinyin, { color: colors.textTertiary }]}>{sheet.pinyin}</Text> : null}
          </View>
          <Text style={[gs.headFr, { color: colors.textSecondary }]} numberOfLines={1}>
            {pick(sheet.translationFr, sheet.translationEn)}
          </Text>
        </View>
        <View style={[pc.chevronWrap, { backgroundColor: colors.appBg }]}>
          <Ionicons name="chevron-forward" size={15} color={colors.textTertiary} />
        </View>
      </View>
    </TouchableOpacity>
  );
}

export const gs = StyleSheet.create({
  headHanzi: { fontSize: 20, fontWeight: '500' },
  headPinyin: { fontSize: 12 },
  headFr: { fontSize: 12 },
  bodyWrap: { padding: 14, gap: 14 },
  section: { gap: 6 },
  secLabel: { fontSize: 13, fontWeight: '800' },
  secBody: { fontSize: 13.5, lineHeight: 21 },
  example: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    borderRadius: 10, borderWidth: 1, padding: 10, marginTop: 4,
  },
  exHanzi: { fontSize: 16, fontWeight: '400' },
  exPinyin: { fontSize: 11 },
  exFr: { fontSize: 12, fontStyle: 'italic' },
  quizPrompt: { fontSize: 14, fontWeight: '600' },
  quizChoices: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 4 },
  quizChoice: {
    flexDirection: 'row', alignItems: 'center', gap: 5,
    borderRadius: 10, borderWidth: 1.5, paddingHorizontal: 14, paddingVertical: 9,
  },
  quizChoiceTxt: { fontSize: 15, fontWeight: '600' },
  quizVerdict: { fontSize: 13, fontWeight: '700', marginTop: 2 },
});

// ── Écran ──────────────────────────────────────────────────────
export default function GrammaireScreen() {
  const scheme = useColorScheme();
  const c = Colors[scheme];
  const router = useRouter();
  const { t } = useI18n();
  const { width } = useWindowDimensions();
  const px = width >= 768 ? 24 : 16;
  const [activeLevel, setActiveLevel] = useState(LEVELS[0] ?? 'A1');

  const accent = LEVEL_COLORS[activeLevel] ?? c.primaryRed;
  const sheets = BY_LEVEL[activeLevel] ?? [];

  return (
    <SafeAreaView style={[s.root, { backgroundColor: c.appBg }]}>
      {/* Header */}
      <View style={[s.header, { paddingHorizontal: px }]}>
        <TouchableOpacity
          onPress={() => router.canGoBack() ? router.back() : router.replace('/(tabs)')}
          style={s.backBtn}
        >
          <Ionicons name="arrow-back" size={22} color={c.textPrimary} />
        </TouchableOpacity>
        <Text style={[s.title, { color: c.textPrimary }]}>{t('grammar.title')}</Text>
        <View style={{ width: 38 }} />
      </View>

      {/* Sélecteur de niveau — barre fixe (mêmes étiquettes CECR que le web) */}
      <View style={[s.levelBar, { paddingHorizontal: px, borderBottomColor: c.borderLight }]}>
        {LEVELS.map(lvl => {
          const active = lvl === activeLevel;
          const col = LEVEL_COLORS[lvl] ?? c.primaryRed;
          return (
            <TouchableOpacity
              key={lvl}
              style={[
                s.levelBtn,
                active && [s.levelBtnActive, { backgroundColor: col + '18', borderColor: col }],
                !active && { borderColor: 'transparent' },
              ]}
              onPress={() => setActiveLevel(lvl)}
              activeOpacity={0.7}
            >
              <Text style={[s.levelBtnTxt, { color: active ? col : c.textTertiary }]}>{lvl}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Sous-titre du niveau */}
      <View style={[s.levelMeta, { paddingHorizontal: px }]}>
        <View style={[s.levelDot, { backgroundColor: accent }]} />
        <Text style={[s.levelMetaTxt, { color: c.textSecondary }]}>
          {t('grammar.sheets', { n: sheets.length, s: sheets.length !== 1 ? 's' : '', lvl: activeLevel })}
        </Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: px, paddingBottom: 100, gap: 10 }}
      >
        {sheets.length === 0 && (
          <Text style={[s.empty, { color: c.textTertiary }]}>{t('grammar.empty')}</Text>
        )}
        {sheets.map(sheet => (
          <GrammarSheetCard key={sheet.id} sheet={sheet} accent={accent} colors={c} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

// ── Styles ─────────────────────────────────────────────────────
const s = StyleSheet.create({
  root: { flex: 1 },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingTop: 8, paddingBottom: 12,
  },
  backBtn: { width: 38, height: 38, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 18, fontWeight: '700' },

  levelBar: {
    flexDirection: 'row', gap: 8,
    paddingBottom: 12, borderBottomWidth: 1, marginBottom: 4,
  },
  levelBtn: {
    flex: 1, paddingVertical: 9, borderRadius: 12,
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 1.5,
  },
  levelBtnActive: {},
  levelBtnTxt: { fontSize: 14, fontWeight: '800', letterSpacing: 0.5 },

  levelMeta: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    paddingTop: 10, paddingBottom: 12,
  },
  levelDot: { width: 8, height: 8, borderRadius: 4 },
  levelMetaTxt: { fontSize: 12 },
  empty: { textAlign: 'center', marginTop: 40, fontSize: 14 },
});

const pc = StyleSheet.create({
  card: { borderRadius: 16, borderWidth: 1, overflow: 'hidden' },
  header: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    paddingVertical: 16, paddingHorizontal: 16,
  },
  accentBar: { width: 4, height: 28, borderRadius: 2, flexShrink: 0 },
  chevronWrap: { width: 28, height: 28, borderRadius: 8, alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
});
