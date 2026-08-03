/**
 * XiaoLearn Mobile — Lecteur de passage + Quiz de compréhension
 * Deux onglets : Texte (avec traduction toggle) | Quiz (MCQ)
 * Persistance AsyncStorage : cl_lectures_v1
 */
import { useState, useCallback, useRef, useEffect } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView, Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useColorScheme } from '@/hooks/useColorScheme';
import Colors from '@/constants/Colors';
import { getLectureById, type LectureQuestion } from '@/data/cecrLectures';
import { useI18n } from '@/contexts/LanguageContext';
import { useDisplaySettings } from '@/contexts/DisplaySettingsContext';
import { bumpDailyCounter } from '@/data/dailyGoals';

const LECTURE_PROGRESS_KEY = 'cl_lectures_v1';
const PASSING_RATIO = 0.75;

const LEVEL_COLORS: Record<string, string> = {
  a1: '#4CAF50', a2: '#8BC34A',
  'b1.1': '#F9A825', 'b1.2': '#FB8C00',
  'b2.1': '#F44336', 'b2.2': '#E91E63',
  'c1.1': '#9C27B0', 'c1.2': '#673AB7',
  'c2.1': '#3F51B5', 'c2.2': '#2196F3',
};

type Tab = 'text' | 'quiz';
type QuizPhase = 'quiz' | 'result';

export default function LectureReaderScreen() {
  const scheme = useColorScheme();
  const c = Colors[scheme];
  const router = useRouter();
  const { t, pick } = useI18n();
  const { id } = useLocalSearchParams<{ id: string }>();

  const lecture = id ? getLectureById(id) : undefined;
  const accent = lecture ? (LEVEL_COLORS[lecture.level] ?? c.primaryRed) : c.primaryRed;

  // Tabs
  const [activeTab, setActiveTab] = useState<Tab>('text');

  // Text tab
  const [showTranslation, setShowTranslation] = useState(false);
  // Bascule locale du pinyin : part du réglage global mais reste propre à
  // cette lecture, pour pouvoir se tester sans changer ses préférences.
  const { showPinyin } = useDisplaySettings();
  const [showPinyinLocal, setShowPinyinLocal] = useState(showPinyin);
  const markedRead = useRef(false);

  // Quiz tab
  const [quizPhase, setQuizPhase] = useState<QuizPhase>('quiz');
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [score, setScore] = useState(0);

  // Mark as read when user visits text tab
  useEffect(() => {
    if (activeTab === 'text' && !markedRead.current && lecture) {
      markedRead.current = true;
      AsyncStorage.getItem(LECTURE_PROGRESS_KEY).then(raw => {
        const existing = raw ? JSON.parse(raw) : {};
        const prev = existing[lecture.id] ?? {};
        AsyncStorage.setItem(LECTURE_PROGRESS_KEY, JSON.stringify({
          ...existing,
          [lecture.id]: { ...prev, read: true },
        }));
        // Objectif « lectures » : on ne compte qu'à la première ouverture,
        // pour qu'un aller-retour dans l'onglet ne gonfle pas le compteur.
        if (!prev.read) void bumpDailyCounter('reading');
      });
    }
  }, [activeTab, lecture]);

  const handleAnswer = useCallback((idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
  }, [selected]);

  const handleNext = useCallback(() => {
    if (selected === null || !lecture) return;
    const q = lecture.questions[current];
    const correct = selected === q.correctIndex;
    const newAnswers = [...answers, selected];
    const newScore = score + (correct ? 1 : 0);
    setAnswers(newAnswers);
    setScore(newScore);

    if (current + 1 >= lecture.questions.length) {
      const passed = newScore / lecture.questions.length >= PASSING_RATIO;
      AsyncStorage.getItem(LECTURE_PROGRESS_KEY).then(raw => {
        const existing = raw ? JSON.parse(raw) : {};
        const prev = existing[lecture.id] ?? {};
        AsyncStorage.setItem(LECTURE_PROGRESS_KEY, JSON.stringify({
          ...existing,
          [lecture.id]: {
            ...prev,
            read: true,
            quizScore: newScore,
            quizPassed: passed || prev.quizPassed,
            completedAt: new Date().toISOString(),
          },
        }));
      });
      setQuizPhase('result');
    } else {
      setCurrent(p => p + 1);
      setSelected(null);
    }
  }, [selected, lecture, current, answers, score]);

  const resetQuiz = () => {
    setCurrent(0);
    setSelected(null);
    setAnswers([]);
    setScore(0);
    setQuizPhase('quiz');
  };

  if (!lecture) {
    return (
      <SafeAreaView style={[s.root, { backgroundColor: c.appBg }]}>
        <Text style={{ color: c.textPrimary, padding: 20 }}>{t('reader.notFound')}</Text>
      </SafeAreaView>
    );
  }

  const question: LectureQuestion | undefined = lecture.questions[current];
  const totalQ = lecture.questions.length;
  const passingScore = Math.ceil(totalQ * PASSING_RATIO);

  return (
    <SafeAreaView style={[s.root, { backgroundColor: c.appBg }]}>
      {/* Header */}
      <View style={[s.header, { borderBottomColor: c.borderLight }]}>
        <TouchableOpacity onPress={() => router.back()} style={s.backBtn}>
          <Ionicons name="arrow-back" size={22} color={c.textPrimary} />
        </TouchableOpacity>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <View style={[s.levelBadge, { backgroundColor: accent + '20' }]}>
            <Text style={[s.levelBadgeTxt, { color: accent }]}>{lecture.level.toUpperCase()}</Text>
          </View>
        </View>
        <View style={{ width: 38 }} />
      </View>

      {/* Title */}
      <View style={[s.titleBlock, { borderBottomColor: c.borderLight }]}>
        <Text style={s.titleEmoji}>{lecture.emoji}</Text>
        <View>
          <Text style={[s.titleFr, { color: c.textPrimary }]}>{pick(lecture.titleFr, lecture.titleEn ?? lecture.titleFr)}</Text>
          <Text style={[s.titleZh, { color: c.textTertiary }]}>{lecture.titleZh}</Text>
        </View>
      </View>

      {/* Tab bar */}
      <View style={[s.tabBar, { borderBottomColor: c.borderLight }]}>
        {(['text', 'quiz'] as Tab[]).map(tab => {
          const active = activeTab === tab;
          const label = tab === 'text' ? `📖 ${t('reader.tabText')}` : `❓ ${t('reader.tabQuiz')}`;
          return (
            <TouchableOpacity
              key={tab}
              style={[s.tabItem, active && [s.tabItemActive, { borderBottomColor: accent }]]}
              onPress={() => setActiveTab(tab)}
            >
              <Text style={[s.tabLabel, { color: active ? accent : c.textTertiary }]}>{label}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* ── TEXT TAB ── */}
      {activeTab === 'text' && (
        <ScrollView contentContainerStyle={s.textBody}>
          {/* Bascules traduction + pinyin — lire sans béquille est l'exercice */}
          <View style={s.toggleRow}>
            <TouchableOpacity
              style={[s.toggleBtn, { borderColor: c.borderLight, backgroundColor: c.cardBg }]}
              onPress={() => setShowTranslation(p => !p)}
            >
              <Ionicons name={showTranslation ? 'eye-off-outline' : 'language-outline'} size={16} color={accent} />
              <Text style={[s.toggleTxt, { color: accent }]}>
                {showTranslation ? t('reader.hideTranslation') : t('reader.showTranslation')}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[s.toggleBtn, {
                borderColor: showPinyinLocal ? c.borderLight : accent,
                backgroundColor: showPinyinLocal ? c.cardBg : accent + '18',
              }]}
              onPress={() => setShowPinyinLocal(p => !p)}
            >
              <Ionicons name={showPinyinLocal ? 'eye-off-outline' : 'text-outline'} size={16} color={accent} />
              <Text style={[s.toggleTxt, { color: accent }]}>
                {showPinyinLocal ? t('reader.hidePinyin') : t('reader.showPinyin')}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Lignes du texte */}
          {lecture.text.split('\n').map((line, i) => {
            const translFr = lecture.translationFr.split('\n')[i] ?? '';
            const translEn = (lecture.translationEn ?? lecture.translationFr).split('\n')[i] ?? '';
            const transl = pick(translFr, translEn);
            // Séparer le texte chinois du pinyin entre parenthèses
            const match = line.match(/^(.*?)\s*\(([^)]+)\)\s*$/);
            const zhPart = match ? match[1] : line;
            const pinyinPart = match ? match[2] : '';
            return (
              <View key={i} style={[s.lineBlock, { borderLeftColor: accent + '40' }]}>
                <Text style={[s.lineZh, { color: c.textPrimary }]}>{zhPart}</Text>
                {showPinyinLocal && pinyinPart !== '' && (
                  <Text style={[s.linePinyin, { color: accent }]}>{pinyinPart}</Text>
                )}
                {showTranslation && transl !== '' && (
                  <Text style={[s.lineFr, { color: c.textSecondary }]}>{transl}</Text>
                )}
              </View>
            );
          })}

          {/* CTA Quiz */}
          <TouchableOpacity
            style={[s.quizCta, { backgroundColor: accent }]}
            onPress={() => { setActiveTab('quiz'); resetQuiz(); }}
          >
            <Ionicons name="help-circle-outline" size={18} color="#FFF" />
            <Text style={s.quizCtaTxt}>{t('reader.testComprehension')}</Text>
          </TouchableOpacity>
        </ScrollView>
      )}

      {/* ── QUIZ TAB ── */}
      {activeTab === 'quiz' && quizPhase === 'quiz' && question && (
        <>
          {/* Progress bar */}
          <View style={[s.progTrack, { backgroundColor: c.borderLight }]}>
            <View style={[s.progBar, { width: `${(current / totalQ) * 100}%` as any, backgroundColor: accent }]} />
          </View>

          <ScrollView contentContainerStyle={s.quizBody}>
            <Text style={[s.questionNum, { color: c.textTertiary }]}>{t('reader.questionOf', { n: current + 1, total: totalQ })}</Text>
            <Text style={[s.questionTxt, { color: c.textPrimary }]}>{pick(question.promptFr, question.promptEn ?? question.promptFr)}</Text>

            {question.choices.map((choice, i) => {
              const answered = selected !== null;
              let bg = c.cardBg;
              let border = c.borderLight;
              let textCol = c.textPrimary;
              if (answered) {
                if (i === question.correctIndex) { bg = '#4CAF5015'; border = '#4CAF50'; textCol = '#4CAF50'; }
                else if (i === selected && selected !== question.correctIndex) { bg = '#F4433615'; border = '#F44336'; textCol = '#F44336'; }
              } else if (selected === i) {
                bg = accent + '18'; border = accent;
              }
              return (
                <TouchableOpacity
                  key={i}
                  style={[s.choice, { backgroundColor: bg, borderColor: border }]}
                  onPress={() => handleAnswer(i)}
                  activeOpacity={answered ? 1 : 0.75}
                >
                  <View style={[s.choiceLetter, { borderColor: border, backgroundColor: border + '30' }]}>
                    <Text style={[s.choiceLetterTxt, { color: border === c.borderLight ? c.textTertiary : border }]}>
                      {String.fromCharCode(65 + i)}
                    </Text>
                  </View>
                  <Text style={[s.choiceTxt, { color: textCol }]}>{pick(choice, question.choicesEn?.[i] ?? choice)}</Text>
                  {answered && i === question.correctIndex && (
                    <Ionicons name="checkmark-circle" size={18} color="#4CAF50" style={{ marginLeft: 'auto' }} />
                  )}
                  {answered && i === selected && selected !== question.correctIndex && (
                    <Ionicons name="close-circle" size={18} color="#F44336" style={{ marginLeft: 'auto' }} />
                  )}
                </TouchableOpacity>
              );
            })}

            {selected !== null && (
              <View style={[s.expl, {
                backgroundColor: selected === question.correctIndex ? '#4CAF5012' : '#F4433612',
                borderColor: selected === question.correctIndex ? '#4CAF5040' : '#F4433640',
              }]}>
                <Text style={[s.explTxt, { color: c.textSecondary }]}>{pick(question.explanationFr, question.explanationEn ?? question.explanationFr)}</Text>
              </View>
            )}
          </ScrollView>

          {selected !== null && (
            <View style={[s.nextBar, { backgroundColor: c.appBg, borderTopColor: c.borderLight }]}>
              <TouchableOpacity style={[s.nextBtn, { backgroundColor: accent }]} onPress={handleNext}>
                <Text style={s.nextBtnTxt}>
                  {current + 1 < totalQ ? t('bilan.nextQ') : t('bilan.seeResults')}
                </Text>
                <Ionicons name="arrow-forward" size={18} color="#FFF" />
              </TouchableOpacity>
            </View>
          )}
        </>
      )}

      {/* ── QUIZ RESULT ── */}
      {activeTab === 'quiz' && quizPhase === 'result' && (
        <ScrollView contentContainerStyle={s.resultBody}>
          {(() => {
            const passed = score >= passingScore;
            const pct = Math.round((score / totalQ) * 100);
            return (
              <>
                <Text style={s.resultEmoji}>{passed ? '🎉' : '📖'}</Text>
                <Text style={[s.resultScore, { color: passed ? '#4CAF50' : c.primaryRed }]}>
                  {score}/{totalQ}
                </Text>
                <Text style={[s.resultPct, { color: c.textSecondary }]}>{pct}%</Text>
                <Text style={[s.resultTitle, { color: c.textPrimary }]}>
                  {passed ? t('reader.quizPassed') : t('reader.notYet')}
                </Text>
                <Text style={[s.resultSub, { color: c.textSecondary }]}>
                  {passed
                    ? t('reader.passedSub', { score, total: totalQ })
                    : t('reader.failSub', { pass: passingScore, total: totalQ })}
                </Text>

                {/* Revue */}
                <Text style={[s.reviewTitle, { color: c.textPrimary }]}>{t('bilan.reviewTitle')}</Text>
                {lecture.questions.map((q, i) => {
                  const userAns = answers[i] ?? null;
                  const ok = userAns === q.correctIndex;
                  return (
                    <View key={q.id} style={[s.reviewRow, { backgroundColor: c.cardBg, borderColor: c.borderLight }]}>
                      <View style={[s.reviewNum, { backgroundColor: ok ? '#4CAF5020' : '#F4433620' }]}>
                        <Ionicons name={ok ? 'checkmark' : 'close'} size={14} color={ok ? '#4CAF50' : '#F44336'} />
                      </View>
                      <View style={{ flex: 1 }}>
                        <Text style={[s.reviewQ, { color: c.textPrimary }]}>{pick(q.promptFr, q.promptEn ?? q.promptFr)}</Text>
                        <Text style={[s.reviewA, { color: '#4CAF50' }]}>✓ {pick(q.choices[q.correctIndex], q.choicesEn?.[q.correctIndex] ?? q.choices[q.correctIndex])}</Text>
                        {!ok && userAns !== null && (
                          <Text style={[s.reviewA, { color: '#F44336' }]}>✗ {pick(q.choices[userAns], q.choicesEn?.[userAns] ?? q.choices[userAns])}</Text>
                        )}
                      </View>
                    </View>
                  );
                })}

                <View style={s.resultActions}>
                  <TouchableOpacity
                    style={[s.retryBtn, { borderColor: accent }]}
                    onPress={resetQuiz}
                  >
                    <Ionicons name="refresh" size={16} color={accent} />
                    <Text style={[s.retryTxt, { color: accent }]}>{t('bilan.retry')}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[s.textBtn, { backgroundColor: accent }]}
                    onPress={() => setActiveTab('text')}
                  >
                    <Text style={s.textBtnTxt}>{t('reader.reread')}</Text>
                  </TouchableOpacity>
                </View>
              </>
            );
          })()}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  root: { flex: 1 },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1,
  },
  backBtn: { width: 38, height: 38, alignItems: 'center', justifyContent: 'center' },
  levelBadge: { borderRadius: 8, paddingHorizontal: 10, paddingVertical: 3 },
  levelBadgeTxt: { fontSize: 11, fontWeight: '800' },

  titleBlock: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1,
  },
  titleEmoji: { fontSize: 28 },
  titleFr: { fontSize: 16, fontWeight: '700' },
  titleZh: { fontSize: 13, marginTop: 2 },

  tabBar: {
    flexDirection: 'row', borderBottomWidth: 1,
  },
  tabItem: {
    flex: 1, alignItems: 'center', paddingVertical: 12, borderBottomWidth: 2, borderBottomColor: 'transparent',
  },
  tabItemActive: { borderBottomWidth: 2 },
  tabLabel: { fontSize: 14, fontWeight: '600' },

  // Text
  textBody: { padding: 16, gap: 14, paddingBottom: 100 },
  toggleBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    borderRadius: 10, borderWidth: 1, padding: 10, alignSelf: 'flex-start',
  },
  toggleTxt: { fontSize: 13, fontWeight: '600' },
  lineBlock: {
    borderLeftWidth: 3, paddingLeft: 12, gap: 4, paddingVertical: 4,
  },
  lineZh: { fontSize: 18, fontWeight: '400', lineHeight: 30 },
  toggleRow: { flexDirection: 'row', gap: 8, flexWrap: 'wrap' },
  linePinyin: { fontSize: 13, fontStyle: 'italic' },
  lineFr: { fontSize: 13, lineHeight: 20 },
  quizCta: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
    borderRadius: 14, paddingVertical: 14, marginTop: 8,
  },
  quizCtaTxt: { color: '#FFF', fontSize: 15, fontWeight: '700' },

  // Quiz
  progTrack: { height: 3 },
  progBar: { height: 3 },
  quizBody: { padding: 20, gap: 12, paddingBottom: 40 },
  questionNum: { fontSize: 12, fontWeight: '600' },
  questionTxt: { fontSize: 16, fontWeight: '600', lineHeight: 24 },
  choice: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    borderRadius: 14, borderWidth: 1.5, padding: 14,
  },
  choiceLetter: {
    width: 30, height: 30, borderRadius: 8, borderWidth: 1.5,
    alignItems: 'center', justifyContent: 'center', flexShrink: 0,
  },
  choiceLetterTxt: { fontSize: 13, fontWeight: '700' },
  choiceTxt: { fontSize: 14, flex: 1, lineHeight: 20 },
  expl: { borderRadius: 12, borderWidth: 1, padding: 14 },
  explTxt: { fontSize: 13, lineHeight: 20 },
  nextBar: {
    padding: 16, borderTopWidth: 1,
    paddingBottom: Platform.OS === 'ios' ? 24 : 16,
  },
  nextBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 8, borderRadius: 14, paddingVertical: 14,
  },
  nextBtnTxt: { color: '#FFF', fontSize: 16, fontWeight: '700' },

  // Result
  resultBody: { padding: 20, gap: 14, alignItems: 'center', paddingBottom: 60 },
  resultEmoji: { fontSize: 60, marginTop: 8 },
  resultScore: { fontSize: 48, fontWeight: '800' },
  resultPct: { fontSize: 17, fontWeight: '600', marginTop: -8 },
  resultTitle: { fontSize: 20, fontWeight: '700' },
  resultSub: { fontSize: 13, lineHeight: 20, textAlign: 'center' },
  reviewTitle: { fontSize: 15, fontWeight: '700', alignSelf: 'flex-start', marginTop: 8 },
  reviewRow: {
    flexDirection: 'row', gap: 10, borderRadius: 12, borderWidth: 1, padding: 12, width: '100%',
  },
  reviewNum: { width: 26, height: 26, borderRadius: 8, alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  reviewQ: { fontSize: 12, fontWeight: '600', marginBottom: 3 },
  reviewA: { fontSize: 11 },
  resultActions: { flexDirection: 'row', gap: 12, width: '100%', marginTop: 8 },
  retryBtn: {
    flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 6, borderRadius: 14, paddingVertical: 13, borderWidth: 1.5,
  },
  retryTxt: { fontSize: 14, fontWeight: '600' },
  textBtn: {
    flex: 1, alignItems: 'center', justifyContent: 'center', borderRadius: 14, paddingVertical: 13,
  },
  textBtnTxt: { color: '#FFF', fontSize: 14, fontWeight: '700' },
});
