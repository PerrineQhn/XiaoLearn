/**
 * Lecteur de dialogue — répliques alternées, audio, vocabulaire et question
 * de compréhension. Pendant de DialoguePageV2 côté web.
 */
import { useMemo, useState, useEffect } from 'react';
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
import { useDialogueAudio, isFemaleVoice } from '@/hooks/useDialogueAudio';
import { useDisplaySettings } from '@/contexts/DisplaySettingsContext';
import { dialogues, DIALOGUE_ZH_TITLES, LEVEL_LABEL } from '@/data/dialogues';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { bumpDailyCounter, dayKey } from '@/data/dailyGoals';

export default function DialogueReaderScreen() {
  const scheme = useColorScheme();
  const c = Colors[scheme];
  const router = useRouter();
  const { t, pick } = useI18n();
  const { showPinyin } = useDisplaySettings();
  const { playHanzi, playUrl } = useAudio();
  const { width } = useWindowDimensions();
  const px = width >= 768 ? 24 : 16;
  const { id } = useLocalSearchParams<{ id: string }>();

  const entry = useMemo(() => dialogues.find(d => d.dialogue.id === id), [id]);
  // Audio Azure : un MP3 par réplique, une voix distincte par locuteur.
  const { lineUrl, voiceOf, hasAudio } = useDialogueAudio(entry?.dialogue.id);
  const [playingIdx, setPlayingIdx] = useState<number | null>(null);
  // Traductions masquées par défaut : on écoute d'abord, on vérifie ensuite.
  const [showTrans, setShowTrans] = useState(false);
  // Bascule locale du pinyin : part du réglage global mais reste propre à ce
  // dialogue, pour pouvoir se tester sans changer ses préférences.
  const [showPinyinLocal, setShowPinyinLocal] = useState(showPinyin);
  const [answerOpen, setAnswerOpen] = useState(false);

  // Objectif « dialogues » : compté à l'ouverture, une seule fois par dialogue
  // et par jour — revenir sur le même dialogue ne doit pas gonfler le compteur.
  useEffect(() => {
    if (!entry) return;
    const mark = `xl_dialogue_seen_${entry.dialogue.id}`;
    AsyncStorage.getItem(mark).then(v => {
      if (v === dayKey()) return;
      void AsyncStorage.setItem(mark, dayKey());
      void bumpDailyCounter('dialogue');
    }).catch(() => {});
  }, [entry]);

  if (!entry) {
    return (
      <SafeAreaView style={[s.root, { backgroundColor: c.appBg }]} edges={['top']}>
        <View style={s.center}>
          <Text style={{ color: c.textSecondary }}>{t('dlg.notFound')}</Text>
        </View>
      </SafeAreaView>
    );
  }

  const d = entry.dialogue;
  const speakers = [...new Set(d.lines.map(l => l.speaker))];

  return (
    <SafeAreaView style={[s.root, { backgroundColor: c.appBg }]} edges={['top']}>
      <View style={[s.header, { paddingHorizontal: px, borderBottomColor: c.borderLight }]}>
        <TouchableOpacity onPress={() => router.back()} style={s.iconBtn}>
          <Ionicons name="arrow-back" size={24} color={c.textPrimary} />
        </TouchableOpacity>
        <View style={{ flex: 1, marginLeft: 4 }}>
          <Text style={[s.title, { color: c.textPrimary }]} numberOfLines={1}>
            {DIALOGUE_ZH_TITLES[d.id] ?? d.title}
          </Text>
          <Text style={[s.subtitle, { color: c.textSecondary }]} numberOfLines={1}>
            {pick(d.title, d.titleEn)}
          </Text>
        </View>
        <View style={[s.lvlPill, { backgroundColor: c.jadeGreenLight }]}>
          <Text style={[s.lvlPillTxt, { color: c.jadeGreen }]}>{LEVEL_LABEL[entry.cecrLevel]}</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={{ paddingHorizontal: px, paddingBottom: 40, paddingTop: 14 }}>
        {/* Contexte */}
        <View style={[s.ctx, { backgroundColor: c.cardBgAlt }]}>
          <Ionicons name="information-circle-outline" size={16} color={c.textTertiary} />
          <Text style={[s.ctxTxt, { color: c.textSecondary }]}>{pick(d.context, d.contextEn)}</Text>
        </View>

        {/* Bascules traduction + pinyin — écouter sans béquille est l'exercice */}
        <View style={s.toggleRow}>
          <TouchableOpacity
            onPress={() => setShowTrans(v => !v)}
            style={[s.toggle, { borderColor: c.borderLight, backgroundColor: c.cardBg }]}
          >
            <Ionicons
              name={showTrans ? 'eye-off-outline' : 'eye-outline'}
              size={16}
              color={c.primaryRed}
            />
            <Text style={[s.toggleTxt, { color: c.primaryRed }]} numberOfLines={1}>
              {showTrans ? t('dlg.hideTrans') : t('dlg.showTrans')}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setShowPinyinLocal(v => !v)}
            style={[s.toggle, {
              borderColor: showPinyinLocal ? c.borderLight : c.primaryRed,
              backgroundColor: showPinyinLocal ? c.cardBg : c.primaryRed + '18',
            }]}
          >
            <Ionicons
              name={showPinyinLocal ? 'eye-off-outline' : 'text-outline'}
              size={16}
              color={c.primaryRed}
            />
            <Text style={[s.toggleTxt, { color: c.primaryRed }]} numberOfLines={1}>
              {showPinyinLocal ? t('reader.hidePinyin') : t('reader.showPinyin')}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Répliques — alignées à gauche/droite selon le locuteur */}
        {d.lines.map((l, i) => {
          const mine = speakers.indexOf(l.speaker) % 2 === 1;
          return (
            <View key={i} style={[s.row, mine && { alignItems: 'flex-end' }]}>
              <View style={[s.speakerRow, mine && { flexDirection: 'row-reverse' }]}>
                <Text style={[s.speaker, { color: c.textTertiary }]}>{l.speaker}</Text>
                {hasAudio && (
                  <Ionicons
                    name={isFemaleVoice(voiceOf(l.speaker)) ? 'female' : 'male'}
                    size={11}
                    color={c.textTertiary}
                  />
                )}
              </View>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={async () => {
                  const url = lineUrl(i);
                  setPlayingIdx(i);
                  // Le MP3 pré-généré porte la bonne voix ; la synthèse
                  // système ne sert que si l'audio manque encore.
                  const ok = url ? await playUrl(url) : false;
                  if (!ok) await playHanzi(l.hanzi);
                  setPlayingIdx(null);
                }}
                style={[s.bubble, {
                  backgroundColor: mine ? c.primaryRed + '14' : c.cardBg,
                  borderColor: mine ? c.primaryRed + '33' : c.borderLight,
                }]}
              >
                <View style={s.bubbleTop}>
                  <Text style={[s.hanzi, { color: c.textPrimary }]}>{l.hanzi}</Text>
                  <Ionicons
                    name={playingIdx === i ? 'volume-high' : 'volume-medium-outline'}
                    size={16}
                    color={c.primaryRed}
                  />
                </View>
                {showPinyinLocal && <Text style={[s.pinyin, { color: c.textTertiary }]}>{l.pinyin}</Text>}
                {showTrans && (
                  <Text style={[s.trans, { color: c.textSecondary }]}>
                    {pick(l.translationFr, l.translationEn)}
                  </Text>
                )}
                {showTrans && (l.note || l.noteEn) && (
                  <View style={[s.note, { borderLeftColor: c.primaryRed }]}>
                    <Text style={[s.noteTxt, { color: c.textTertiary }]}>
                      {pick(l.note ?? '', l.noteEn ?? '')}
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            </View>
          );
        })}

        {/* Vocabulaire clé */}
        {!!d.vocab?.length && (
          <View style={[s.box, { backgroundColor: c.cardBg, borderColor: c.borderLight }]}>
            <Text style={[s.boxTitle, { color: c.textPrimary }]}>{t('dlg.vocab')}</Text>
            <View style={s.vocabWrap}>
              {d.vocab.map(v => (
                <TouchableOpacity
                  key={v}
                  onPress={() => playHanzi(v)}
                  style={[s.vocabChip, { backgroundColor: c.cardBgAlt, borderColor: c.borderLight }]}
                >
                  <Text style={[s.vocabTxt, { color: c.textPrimary }]}>{v}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* Compréhension */}
        {d.comprehension && (
          <View style={[s.box, { backgroundColor: c.cardBg, borderColor: c.borderLight }]}>
            <Text style={[s.boxTitle, { color: c.textPrimary }]}>{t('dlg.comprehension')}</Text>
            <Text style={[s.question, { color: c.textSecondary }]}>
              {pick(d.comprehension.questionFr, d.comprehension.questionEn)}
            </Text>
            {answerOpen ? (
              <Text style={[s.answer, { color: c.jadeGreen }]}>
                {pick(d.comprehension.answerFr, d.comprehension.answerEn)}
              </Text>
            ) : (
              <TouchableOpacity
                onPress={() => setAnswerOpen(true)}
                style={[s.answerBtn, { borderColor: c.borderMedium }]}
              >
                <Text style={[s.answerBtnTxt, { color: c.primaryRed }]}>{t('dlg.showAnswer')}</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  root: { flex: 1 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  header: { flexDirection: 'row', alignItems: 'center', paddingTop: 8, paddingBottom: 12, borderBottomWidth: 1 },
  iconBtn: { width: 38, height: 38, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 19, fontWeight: '800' },
  subtitle: { fontSize: 12.5, marginTop: 1 },
  lvlPill: { borderRadius: 8, paddingHorizontal: 9, paddingVertical: 4 },
  lvlPillTxt: { fontSize: 12, fontWeight: '800' },
  ctx: { flexDirection: 'row', gap: 8, borderRadius: 14, padding: 12, marginBottom: 12 },
  ctxTxt: { flex: 1, fontSize: 13.5, lineHeight: 19, fontStyle: 'italic' },
  toggleRow: { flexDirection: 'row', gap: 8, flexWrap: 'wrap', marginBottom: 16 },
  toggle: {
    flexGrow: 1, flexBasis: '46%',
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6,
    borderRadius: 12, borderWidth: 1, paddingVertical: 10, paddingHorizontal: 8,
  },
  toggleTxt: { fontSize: 13.5, fontWeight: '700' },
  row: { marginBottom: 14, alignSelf: 'stretch' },
  speakerRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginBottom: 4, marginHorizontal: 4 },
  speaker: { fontSize: 11.5, fontWeight: '700' },
  bubble: {
    maxWidth: '92%', borderRadius: 16, borderWidth: 1, padding: 12, gap: 4 },
  bubbleTop: { flexDirection: 'row', alignItems: 'flex-start', gap: 10 },
  hanzi: { flex: 1, flexShrink: 1, fontSize: 19, fontWeight: '400', lineHeight: 29 },
  pinyin: { fontSize: 13, fontStyle: 'italic' },
  trans: { fontSize: 14, lineHeight: 20, marginTop: 2 },
  note: { borderLeftWidth: 3, paddingLeft: 9, marginTop: 6 },
  noteTxt: { fontSize: 12.5, lineHeight: 18 },
  box: { borderRadius: 16, borderWidth: 1, padding: 14, marginTop: 12, gap: 8 },
  boxTitle: { fontSize: 15, fontWeight: '700' },
  vocabWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  vocabChip: { borderRadius: 10, borderWidth: 1, paddingHorizontal: 12, paddingVertical: 8 },
  vocabTxt: { fontSize: 17, fontWeight: '600' },
  question: { fontSize: 14, lineHeight: 20 },
  answer: { fontSize: 14, lineHeight: 20, fontWeight: '600' },
  answerBtn: { alignSelf: 'flex-start', borderRadius: 10, borderWidth: 1, paddingHorizontal: 14, paddingVertical: 8 },
  answerBtnTxt: { fontSize: 13, fontWeight: '700' },
});
