/**
 * ⚡ Speed Quiz — 10 QCM, 5 secondes chacun
 */
import { useState, useEffect, useRef, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useColorScheme } from '@/hooks/useColorScheme';
import Colors from '@/constants/Colors';
import { collectVocabFromCompleted, localizeVocab, pick, generateMCQ, saveScore } from '@/data/minijeuxHelpers';
import { useI18n } from '@/contexts/LanguageContext';

const COLOR = '#F9A825';
const TOTAL_Q = 10;
const TIME_PER_Q = 5;

type Phase = 'intro' | 'playing' | 'result' | 'locked';
const MIN_WORDS = 10;

interface Question { hanzi: string; pinyin: string; choices: string[]; correctIndex: number; }

export default function JeuSpeedQuiz() {
  const scheme = useColorScheme();
  const c = Colors[scheme];
  const router = useRouter();
  const { t, lang } = useI18n();
  const [phase, setPhase] = useState<Phase>('intro');
  const [missing, setMissing] = useState(0);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(TIME_PER_Q);
  const [results, setResults] = useState<boolean[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  async function startGame() {
    const pool = localizeVocab(await collectVocabFromCompleted(3), lang);
    if (pool.length < MIN_WORDS) { setMissing(MIN_WORDS - pool.length); setPhase('locked'); return; }
    const items = pick(pool, TOTAL_Q);
    const qs = items.map(item => {
      const { choices, correctIndex } = generateMCQ(item, pool);
      return { hanzi: item.hanzi, pinyin: item.pinyin, choices, correctIndex };
    });
    setQuestions(qs);
    setCurrent(0);
    setScore(0);
    setSelected(null);
    setResults([]);
    setTimeLeft(TIME_PER_Q);
    setPhase('playing');
  }

  // Start timer when phase changes to playing or question advances
  useEffect(() => {
    if (phase !== 'playing') return;
    clearInterval(timerRef.current!);
    let t = TIME_PER_Q;
    setTimeLeft(t);
    timerRef.current = setInterval(() => {
      t--;
      setTimeLeft(t);
      if (t <= 0) {
        clearInterval(timerRef.current!);
        advance(null); // time's up
      }
    }, 1000);
    return () => clearInterval(timerRef.current!);
  }, [current, phase]);

  const advance = useCallback((choice: number | null) => {
    clearInterval(timerRef.current!);
    const q = questions[current];
    if (!q) return;
    const correct = choice === q.correctIndex;
    const newScore = score + (correct ? 1 : 0);
    const newResults = [...results, correct];
    setSelected(choice);
    setScore(newScore);
    setResults(newResults);

    setTimeout(() => {
      const next = current + 1;
      if (next >= TOTAL_Q) {
        saveScore('speedquiz', newScore);
        setPhase('result');
      } else {
        setCurrent(next);
        setSelected(null);
      }
    }, 700);
  }, [questions, current, score, results]);

  const handleAnswer = useCallback((idx: number) => {
    if (selected !== null) return;
    advance(idx);
  }, [selected, advance]);

  const q = questions[current];

  // ── LOCKED ──
  if (phase === 'locked') return (
    <SafeAreaView style={[s.root, { backgroundColor: c.appBg }]}>
      <View style={[s.header, { borderBottomColor: c.borderLight }]}>
        <TouchableOpacity onPress={() => router.back()} style={s.backBtn}>
          <Ionicons name="arrow-back" size={22} color={c.textPrimary} />
        </TouchableOpacity>
        <Text style={[s.headerTitle, { color: c.textPrimary }]}>{t('game.locked')}</Text>
        <View style={{ width: 38 }} />
      </View>
      <ScrollView contentContainerStyle={s.center}>
        <Text style={s.bigEmoji}>🔒</Text>
        <Text style={[s.title, { color: c.textPrimary }]}>{t('game.locked')}</Text>
        <Text style={[s.desc, { color: c.textSecondary }]}>{t('game.lockedMsg', { n: missing })}</Text>
        <TouchableOpacity style={[s.btn, { backgroundColor: COLOR }]} onPress={() => router.back()}>
          <Text style={s.btnTxt}>{t('game.backToCourses')}</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
  // ── INTRO ──
  if (phase === 'intro') return (
    <SafeAreaView style={[s.root, { backgroundColor: c.appBg }]}>
      <View style={[s.header, { borderBottomColor: c.borderLight }]}>
        <TouchableOpacity onPress={() => router.back()} style={s.backBtn}>
          <Ionicons name="arrow-back" size={22} color={c.textPrimary} />
        </TouchableOpacity>
        <Text style={[s.headerTitle, { color: c.textPrimary }]}>⚡ Speed Quiz</Text>
        <View style={{ width: 38 }} />
      </View>
      <ScrollView contentContainerStyle={s.center}>
        <Text style={s.bigEmoji}>⚡</Text>
        <Text style={[s.title, { color: c.textPrimary }]}>Speed Quiz</Text>
        <Text style={[s.desc, { color: c.textSecondary }]}>{t('game.speedIntro')}</Text>
        <TouchableOpacity style={[s.btn, { backgroundColor: COLOR }]} onPress={startGame}>
          <Ionicons name="flash" size={18} color="#FFF" />
          <Text style={s.btnTxt}>{t('game.startGo')}</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );

  // ── RESULT ──
  if (phase === 'result') return (
    <SafeAreaView style={[s.root, { backgroundColor: c.appBg }]}>
      <View style={[s.header, { borderBottomColor: c.borderLight }]}>
        <TouchableOpacity onPress={() => router.back()} style={s.backBtn}>
          <Ionicons name="arrow-back" size={22} color={c.textPrimary} />
        </TouchableOpacity>
        <Text style={[s.headerTitle, { color: c.textPrimary }]}>{t('game.results')}</Text>
        <View style={{ width: 38 }} />
      </View>
      <ScrollView contentContainerStyle={s.center}>
        <Text style={s.bigEmoji}>{score >= 8 ? '🏆' : score >= 5 ? '👍' : '📚'}</Text>
        <Text style={[s.scoreNum, { color: COLOR }]}>{score}/{TOTAL_Q}</Text>
        <Text style={[s.title, { color: c.textPrimary }]}>
          {score >= 8 ? t('game.resExcellent') : score >= 5 ? t('game.resGood') : t('game.resKeep')}
        </Text>
        {/* Mini résumé */}
        <View style={s.dotsRow}>
          {results.map((ok, i) => (
            <View key={i} style={[s.dot, { backgroundColor: ok ? '#4CAF50' : '#F44336' }]} />
          ))}
        </View>
        <View style={s.actions}>
          <TouchableOpacity style={[s.outBtn, { borderColor: COLOR }]} onPress={startGame}>
            <Ionicons name="refresh" size={16} color={COLOR} />
            <Text style={[s.outTxt, { color: COLOR }]}>{t('game.replay')}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[s.btn, { backgroundColor: COLOR, flex: 1 }]} onPress={() => router.back()}>
            <Text style={s.btnTxt}>{t('game.quit')}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );

  // ── PLAYING ──
  if (!q) return null;
  const answered = selected !== null;

  return (
    <SafeAreaView style={[s.root, { backgroundColor: c.appBg }]}>
      {/* Header */}
      <View style={[s.header, { borderBottomColor: c.borderLight }]}>
        <TouchableOpacity onPress={() => { clearInterval(timerRef.current!); router.back(); }} style={s.backBtn}>
          <Ionicons name="close" size={22} color={c.textPrimary} />
        </TouchableOpacity>
        <Text style={[s.headerTitle, { color: c.textPrimary }]}>{current + 1}/{TOTAL_Q}</Text>
        <View style={[s.timer, {
          backgroundColor: timeLeft <= 2 ? '#F4433620' : COLOR + '20',
          borderColor: timeLeft <= 2 ? '#F44336' : COLOR,
        }]}>
          <Text style={[s.timerTxt, { color: timeLeft <= 2 ? '#F44336' : COLOR }]}>{timeLeft}s</Text>
        </View>
      </View>

      {/* Progress */}
      <View style={[s.progTrack, { backgroundColor: c.borderLight }]}>
        <View style={[s.progBar, { width: `${(timeLeft / TIME_PER_Q) * 100}%` as any, backgroundColor: timeLeft <= 2 ? '#F44336' : COLOR }]} />
      </View>

      <ScrollView contentContainerStyle={s.quizBody}>
        {/* Score */}
        <Text style={[s.scoreLive, { color: COLOR }]}>{t('game.scoreLive', { n: score })}</Text>

        {/* Caractère */}
        <View style={[s.charCard, { backgroundColor: c.cardBg, borderColor: c.borderLight }]}>
          <Text style={[s.charHanzi, { color: c.textPrimary }]}>{q.hanzi}</Text>
          {answered && <Text style={[s.charPinyin, { color: COLOR }]}>{q.pinyin}</Text>}
        </View>

        <Text style={[s.prompt, { color: c.textSecondary }]}>{t('game.whatMeaning')}</Text>

        {q.choices.map((choice, i) => {
          let bg = c.cardBg; let border = c.borderLight; let tc = c.textPrimary;
          if (answered) {
            if (i === q.correctIndex) { bg = '#4CAF5015'; border = '#4CAF50'; tc = '#4CAF50'; }
            else if (i === selected) { bg = '#F4433615'; border = '#F44336'; tc = '#F44336'; }
          }
          return (
            <TouchableOpacity
              key={i}
              style={[s.choice, { backgroundColor: bg, borderColor: border }]}
              onPress={() => handleAnswer(i)}
              activeOpacity={answered ? 1 : 0.75}
            >
              <Text style={[s.choiceTxt, { color: tc }]}>{choice}</Text>
              {answered && i === q.correctIndex && <Ionicons name="checkmark-circle" size={18} color="#4CAF50" />}
              {answered && i === selected && i !== q.correctIndex && <Ionicons name="close-circle" size={18} color="#F44336" />}
            </TouchableOpacity>
          );
        })}
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
  timer: {
    borderRadius: 10, borderWidth: 1.5, paddingHorizontal: 10, paddingVertical: 4,
  },
  timerTxt: { fontSize: 14, fontWeight: '800' },
  progTrack: { height: 3 },
  progBar: { height: 3 },
  center: { padding: 24, alignItems: 'center', gap: 20 },
  bigEmoji: { fontSize: 64 },
  title: { fontSize: 22, fontWeight: '800', textAlign: 'center' },
  desc: { fontSize: 14, lineHeight: 22, textAlign: 'center' },
  scoreNum: { fontSize: 52, fontWeight: '900' },
  dotsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, justifyContent: 'center' },
  dot: { width: 12, height: 12, borderRadius: 6 },
  btn: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    borderRadius: 14, paddingVertical: 14, paddingHorizontal: 24, justifyContent: 'center',
  },
  btnTxt: { color: '#FFF', fontSize: 15, fontWeight: '700' },
  outBtn: {
    flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 6, borderRadius: 14, paddingVertical: 14, borderWidth: 1.5,
  },
  outTxt: { fontSize: 14, fontWeight: '600' },
  actions: { flexDirection: 'row', gap: 12, width: '100%' },
  quizBody: { padding: 16, gap: 12, paddingBottom: 40 },
  scoreLive: { fontSize: 13, fontWeight: '700', textAlign: 'center' },
  charCard: {
    alignItems: 'center', justifyContent: 'center',
    borderRadius: 20, borderWidth: 1.5, padding: 24, gap: 6,
  },
  charHanzi: { fontSize: 48, fontWeight: '400' },
  charPinyin: { fontSize: 17, fontStyle: 'italic' },
  prompt: { fontSize: 14, fontWeight: '600', textAlign: 'center' },
  choice: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    borderRadius: 14, borderWidth: 1.5, padding: 14,
  },
  choiceTxt: { fontSize: 14, flex: 1 },
});
