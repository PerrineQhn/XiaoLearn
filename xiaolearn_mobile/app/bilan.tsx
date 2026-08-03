/**
 * XiaoLearn Mobile — Écran Bilan de fin de niveau
 * Quiz de synthèse 10 questions, seuil 80%
 */
import { useState, useCallback } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView, Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useColorScheme } from '@/hooks/useColorScheme';
import Colors from '@/constants/Colors';
import { cecrBilans, sampleBilanQuestions, type CecrLevelSlug, type BilanQuestion } from '@/data/cecrBilans';
import { useI18n } from '@/contexts/LanguageContext';
import { useCardUnlocks } from '@/contexts/CardsContext';
import { useUserStats } from '@/hooks/useUserStats';

const BILAN_KEY = 'cl_bilans_v7';
const PASSING_SCORE = 8; // 8/10 = 80%
const SESSION_SIZE = 10;

type Phase = 'intro' | 'quiz' | 'result';

export default function BilanScreen() {
  const scheme = useColorScheme();
  const c = Colors[scheme];
  const router = useRouter();
  const { t, pick } = useI18n();
  const { checkCards } = useCardUnlocks();
  const { addXp } = useUserStats();
  const { level } = useLocalSearchParams<{ level: CecrLevelSlug }>();

  const bilan = level ? cecrBilans[level] : undefined;

  const [phase, setPhase] = useState<Phase>('intro');
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [score, setScore] = useState(0);
  // Questions de la session en cours (tirage aléatoire depuis le pool)
  const [sessionQuestions, setSessionQuestions] = useState<BilanQuestion[]>([]);

  const question: BilanQuestion | undefined = sessionQuestions[current];
  const totalQ = SESSION_SIZE;

  const handleAnswer = useCallback((idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
  }, [selected]);

  const handleNext = useCallback(() => {
    if (selected === null || !bilan) return;
    const correct = selected === question!.correctIndex;
    const newAnswers = [...answers, selected];
    const newScore = score + (correct ? 1 : 0);

    setAnswers(newAnswers);
    setScore(newScore);

    if (current + 1 >= totalQ) {
      // Fin — persister le résultat
      AsyncStorage.getItem(BILAN_KEY).then(raw => {
        const existing = raw ? JSON.parse(raw) : {};
        const prev = existing[level!] ?? { bestScore: 0, passed: false, attempts: 0 };
        const passed = newScore >= PASSING_SCORE || prev.passed;
        const updated = {
          ...existing,
          [level!]: {
            level,
            bestScore: Math.max(prev.bestScore, newScore),
            passed,
            attempts: prev.attempts + 1,
            lastAttemptAt: new Date().toISOString(),
            firstPassedAt: (!prev.passed && passed) ? new Date().toISOString() : prev.firstPassedAt,
          },
        };
        AsyncStorage.setItem(BILAN_KEY, JSON.stringify(updated)).then(() => { void checkCards(); });

        // Le XP promis à l'entrée (« +{xpReward} XP ») et annoncé à la sortie
        // n'était jamais crédité : ce fichier n'appelait pas addXp du tout.
        //
        // On ne verse qu'à la PREMIÈRE réussite — `!prev.passed && passed` —
        // sinon refaire un bilan déjà validé deviendrait une source d'XP
        // illimitée.
        if (!prev.passed && passed) {
          void addXp(bilan.xpReward);
        }
      });
      setPhase('result');
    } else {
      setCurrent(c => c + 1);
      setSelected(null);
    }
  }, [selected, bilan, question, answers, score, current, totalQ, level, addXp, checkCards]);

  const startQuiz = useCallback(() => {
    if (!bilan) return;
    setSessionQuestions(sampleBilanQuestions(bilan, SESSION_SIZE));
    setCurrent(0);
    setSelected(null);
    setAnswers([]);
    setScore(0);
    setPhase('quiz');
  }, [bilan]);

  const restart = startQuiz;

  if (!bilan) {
    return (
      <SafeAreaView style={[s.root, { backgroundColor: c.appBg }]}>
        <Text style={{ color: c.textPrimary, padding: 20 }}>{t('bilan.notFound')}</Text>
      </SafeAreaView>
    );
  }

  // ── INTRO ──
  if (phase === 'intro') {
    return (
      <SafeAreaView style={[s.root, { backgroundColor: c.appBg }]}>
        <View style={[s.header, { borderBottomColor: c.borderLight }]}>
          <TouchableOpacity onPress={() => router.back()} style={s.backBtn}>
            <Ionicons name="arrow-back" size={22} color={c.textPrimary} />
          </TouchableOpacity>
          <Text style={[s.headerTitle, { color: c.textPrimary }]}>{t('bilan.title')}</Text>
          <View style={{ width: 38 }} />
        </View>

        <ScrollView contentContainerStyle={s.introBody}>
          <Text style={s.introEmoji}>{bilan.emoji}</Text>
          <Text style={[s.introTitle, { color: c.textPrimary }]}>{pick(bilan.titleFr, bilan.titleEn ?? bilan.titleFr)}</Text>
          <Text style={[s.introDesc, { color: c.textSecondary }]}>{pick(bilan.descriptionFr, bilan.descriptionEn ?? bilan.descriptionFr)}</Text>

          <View style={[s.infoRow, { backgroundColor: c.cardBg, borderColor: c.borderLight }]}>
            <View style={s.infoItem}>
              <Text style={[s.infoVal, { color: c.textPrimary }]}>10</Text>
              <Text style={[s.infoLbl, { color: c.textTertiary }]}>{t('bilan.questions')}</Text>
            </View>
            <View style={[s.infoDivider, { backgroundColor: c.borderLight }]} />
            <View style={s.infoItem}>
              <Text style={[s.infoVal, { color: c.textPrimary }]}>80%</Text>
              <Text style={[s.infoLbl, { color: c.textTertiary }]}>{t('bilan.threshold')}</Text>
            </View>
            <View style={[s.infoDivider, { backgroundColor: c.borderLight }]} />
            <View style={s.infoItem}>
              <Text style={[s.infoVal, { color: '#F9A825' }]}>+{bilan.xpReward} XP</Text>
              <Text style={[s.infoLbl, { color: c.textTertiary }]}>{t('bilan.reward')}</Text>
            </View>
          </View>

          <TouchableOpacity
            style={[s.startBtn, { backgroundColor: c.primaryRed }]}
            onPress={startQuiz}
          >
            <Ionicons name="play" size={18} color="#FFF" />
            <Text style={s.startBtnTxt}>{t('bilan.start')}</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // ── QUIZ ──
  if (phase === 'quiz' && question) {
    const answered = selected !== null;
    const isCorrect = selected === question.correctIndex;

    return (
      <SafeAreaView style={[s.root, { backgroundColor: c.appBg }]}>
        <View style={[s.header, { borderBottomColor: c.borderLight }]}>
          <TouchableOpacity onPress={() => router.back()} style={s.backBtn}>
            <Ionicons name="close" size={22} color={c.textPrimary} />
          </TouchableOpacity>
          <Text style={[s.headerTitle, { color: c.textPrimary }]}>
            {current + 1} / {totalQ}
          </Text>
          <View style={{ width: 38 }} />
        </View>

        {/* Barre de progression */}
        <View style={[s.progTrack, { backgroundColor: c.borderLight }]}>
          <View style={[s.progBar, { width: `${((current) / totalQ) * 100}%` as any, backgroundColor: c.primaryRed }]} />
        </View>

        <ScrollView contentContainerStyle={s.quizBody}>
          {question.topic && (
            <View style={[s.topicBadge, { backgroundColor: c.primaryRedLight }]}>
              <Text style={[s.topicTxt, { color: c.primaryRed }]}>{question.topic}</Text>
            </View>
          )}

          {question.contextFr && (
            <View style={[s.contextBox, { backgroundColor: c.cardBg, borderColor: c.borderLight }]}>
              <Text style={[s.contextTxt, { color: c.textPrimary }]}>{pick(question.contextFr!, question.contextEn ?? question.contextFr!)}</Text>
            </View>
          )}

          <Text style={[s.prompt, { color: c.textPrimary }]}>{pick(question.promptFr, question.promptEn ?? question.promptFr)}</Text>

          {question.choices.map((choice, i) => {
            let bg = c.cardBg;
            let border = c.borderLight;
            let textCol = c.textPrimary;
            if (answered) {
              if (i === question.correctIndex) { bg = '#4CAF5015'; border = '#4CAF50'; textCol = '#4CAF50'; }
              else if (i === selected && !isCorrect) { bg = '#F4433615'; border = '#F44336'; textCol = '#F44336'; }
            } else if (selected === i) {
              bg = c.primaryRedLight; border = c.primaryRed;
            }
            return (
              <TouchableOpacity
                key={i}
                style={[s.choice, { backgroundColor: bg, borderColor: border }]}
                onPress={() => handleAnswer(i)}
                activeOpacity={answered ? 1 : 0.75}
              >
                <View style={[s.choiceLetter, { backgroundColor: border + '30', borderColor: border }]}>
                  <Text style={[s.choiceLetterTxt, { color: border === c.borderLight ? c.textTertiary : border }]}>
                    {String.fromCharCode(65 + i)}
                  </Text>
                </View>
                <Text style={[s.choiceTxt, { color: textCol }]}>{pick(choice, question.choicesEn?.[i] ?? choice)}</Text>
                {answered && i === question.correctIndex && (
                  <Ionicons name="checkmark-circle" size={18} color="#4CAF50" style={{ marginLeft: 'auto' }} />
                )}
                {answered && i === selected && !isCorrect && (
                  <Ionicons name="close-circle" size={18} color="#F44336" style={{ marginLeft: 'auto' }} />
                )}
              </TouchableOpacity>
            );
          })}

          {answered && (
            <View style={[s.explanation, { backgroundColor: isCorrect ? '#4CAF5012' : '#F4433612', borderColor: isCorrect ? '#4CAF5040' : '#F4433640' }]}>
              <Text style={[s.explanationTxt, { color: c.textSecondary }]}>{pick(question.explanationFr, question.explanationEn ?? question.explanationFr)}</Text>
            </View>
          )}
        </ScrollView>

        {answered && (
          <View style={[s.nextBar, { backgroundColor: c.appBg, borderTopColor: c.borderLight }]}>
            <TouchableOpacity
              style={[s.nextBtn, { backgroundColor: c.primaryRed }]}
              onPress={handleNext}
            >
              <Text style={s.nextBtnTxt}>
                {current + 1 < totalQ ? t('bilan.nextQ') : t('bilan.seeResults')}
              </Text>
              <Ionicons name="arrow-forward" size={18} color="#FFF" />
            </TouchableOpacity>
          </View>
        )}
      </SafeAreaView>
    );
  }

  // ── RÉSULTAT ──
  const passed = score >= PASSING_SCORE;
  const pct = Math.round((score / totalQ) * 100);

  return (
    <SafeAreaView style={[s.root, { backgroundColor: c.appBg }]}>
      <View style={[s.header, { borderBottomColor: c.borderLight }]}>
        <TouchableOpacity onPress={() => router.back()} style={s.backBtn}>
          <Ionicons name="arrow-back" size={22} color={c.textPrimary} />
        </TouchableOpacity>
        <Text style={[s.headerTitle, { color: c.textPrimary }]}>{t('bilan.results')}</Text>
        <View style={{ width: 38 }} />
      </View>

      <ScrollView contentContainerStyle={s.resultBody}>
        <Text style={s.resultEmoji}>{passed ? '🎉' : '📖'}</Text>
        <Text style={[s.resultScore, { color: passed ? '#4CAF50' : c.primaryRed }]}>
          {score}/{totalQ}
        </Text>
        <Text style={[s.resultPct, { color: c.textSecondary }]}>{pct}%</Text>
        <Text style={[s.resultTitle, { color: c.textPrimary }]}>
          {passed ? t('bilan.passed') : t('bilan.notPassed')}
        </Text>
        <Text style={[s.resultSub, { color: c.textSecondary }]}>
          {passed
            ? t('bilan.passedSub', { score, xp: bilan.xpReward })
            : t('bilan.failSub', { score })}
        </Text>

        {/* Revue des réponses */}
        <Text style={[s.reviewTitle, { color: c.textPrimary }]}>{t('bilan.reviewTitle')}</Text>
        {sessionQuestions.map((q, i) => {
          const userAns = answers[i] ?? null;
          const correct = userAns === q.correctIndex;
          return (
            <View key={q.id} style={[s.reviewRow, { backgroundColor: c.cardBg, borderColor: c.borderLight }]}>
              <View style={[s.reviewNum, { backgroundColor: correct ? '#4CAF5020' : '#F4433620' }]}>
                <Ionicons name={correct ? 'checkmark' : 'close'} size={14} color={correct ? '#4CAF50' : '#F44336'} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={[s.reviewPrompt, { color: c.textPrimary }]}>{pick(q.promptFr, q.promptEn ?? q.promptFr)}</Text>
                <Text style={[s.reviewAnswer, { color: '#4CAF50' }]}>✓ {pick(q.choices[q.correctIndex], q.choicesEn?.[q.correctIndex] ?? q.choices[q.correctIndex])}</Text>
                {!correct && userAns !== null && (
                  <Text style={[s.reviewAnswer, { color: '#F44336' }]}>✗ {pick(q.choices[userAns], q.choicesEn?.[userAns] ?? q.choices[userAns])}</Text>
                )}
              </View>
            </View>
          );
        })}

        <View style={s.resultActions}>
          <TouchableOpacity
            style={[s.retryBtn, { borderColor: c.primaryRed, borderWidth: 1.5 }]}
            onPress={restart}
          >
            <Ionicons name="refresh" size={16} color={c.primaryRed} />
            <Text style={[s.retryBtnTxt, { color: c.primaryRed }]}>{t('bilan.retry')}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[s.doneBtn, { backgroundColor: c.primaryRed }]}
            onPress={() => router.back()}
          >
            <Text style={s.doneBtnTxt}>{t('game.backToCourses')}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
  headerTitle: { fontSize: 17, fontWeight: '700' },

  // Intro
  introBody: { padding: 24, alignItems: 'center', gap: 16 },
  introEmoji: { fontSize: 64 },
  introTitle: { fontSize: 22, fontWeight: '700', textAlign: 'center' },
  introDesc: { fontSize: 14, lineHeight: 22, textAlign: 'center' },
  infoRow: {
    flexDirection: 'row', width: '100%', borderRadius: 16, borderWidth: 1,
    padding: 16, justifyContent: 'space-around', alignItems: 'center',
  },
  infoItem: { alignItems: 'center', gap: 4 },
  infoVal: { fontSize: 20, fontWeight: '700' },
  infoLbl: { fontSize: 11, textAlign: 'center' },
  infoDivider: { width: 1, height: 36 },
  startBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    borderRadius: 16, paddingVertical: 16, paddingHorizontal: 32, marginTop: 8,
  },
  startBtnTxt: { color: '#FFF', fontSize: 16, fontWeight: '700' },

  // Quiz
  progTrack: { height: 3 },
  progBar: { height: 3 },
  quizBody: { padding: 20, gap: 12, paddingBottom: 40 },
  topicBadge: { alignSelf: 'flex-start', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  topicTxt: { fontSize: 11, fontWeight: '600', textTransform: 'uppercase' },
  contextBox: { borderRadius: 12, borderWidth: 1, padding: 14 },
  contextTxt: { fontSize: 18, fontWeight: '600', textAlign: 'center' },
  prompt: { fontSize: 17, fontWeight: '600', lineHeight: 26 },
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
  explanation: { borderRadius: 12, borderWidth: 1, padding: 14 },
  explanationTxt: { fontSize: 13, lineHeight: 20 },
  nextBar: {
    padding: 16, borderTopWidth: 1,
    paddingBottom: Platform.OS === 'ios' ? 24 : 16,
  },
  nextBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 8, borderRadius: 14, paddingVertical: 14,
  },
  nextBtnTxt: { color: '#FFF', fontSize: 16, fontWeight: '700' },

  // Résultat
  resultBody: { padding: 20, gap: 14, alignItems: 'center' },
  resultEmoji: { fontSize: 64, marginTop: 8 },
  resultScore: { fontSize: 52, fontWeight: '800' },
  resultPct: { fontSize: 18, fontWeight: '600', marginTop: -8 },
  resultTitle: { fontSize: 22, fontWeight: '700' },
  resultSub: { fontSize: 14, lineHeight: 22, textAlign: 'center' },
  reviewTitle: { fontSize: 16, fontWeight: '700', alignSelf: 'flex-start', marginTop: 8 },
  reviewRow: {
    flexDirection: 'row', gap: 12, borderRadius: 12, borderWidth: 1,
    padding: 12, width: '100%',
  },
  reviewNum: { width: 28, height: 28, borderRadius: 8, alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  reviewPrompt: { fontSize: 13, fontWeight: '600', marginBottom: 4 },
  reviewAnswer: { fontSize: 12 },
  resultActions: { flexDirection: 'row', gap: 12, width: '100%', marginTop: 8, marginBottom: 20 },
  retryBtn: {
    flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 6, borderRadius: 14, paddingVertical: 13,
  },
  retryBtnTxt: { fontSize: 14, fontWeight: '600' },
  doneBtn: { flex: 1, alignItems: 'center', justifyContent: 'center', borderRadius: 14, paddingVertical: 13 },
  doneBtnTxt: { color: '#FFF', fontSize: 14, fontWeight: '700' },
});
