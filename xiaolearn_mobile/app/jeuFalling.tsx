/**
 * 🌧️ Caractères qui tombent — 3 vies, speed croissante
 * Un caractère apparaît, le timer diminue, l'utilisateur clique la bonne traduction.
 */
import { useState, useEffect, useRef, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useColorScheme } from '@/hooks/useColorScheme';
import Colors from '@/constants/Colors';
import { collectVocabFromCompleted, localizeVocab, generateMCQ, saveScore } from '@/data/minijeuxHelpers';
import { useI18n } from '@/contexts/LanguageContext';

const COLOR = '#E91E63';
const INITIAL_TIME = 4000; // ms pour la première question
const MIN_TIME = 1500;
const DECAY = 100; // réduction par question

type Phase = 'intro' | 'playing' | 'result' | 'locked';
const MIN_WORDS = 5;

interface Question { hanzi: string; pinyin: string; choices: string[]; correctIndex: number; }

export default function JeuFalling() {
  const scheme = useColorScheme();
  const c = Colors[scheme];
  const router = useRouter();
  const { t, lang } = useI18n();

  const [phase, setPhase] = useState<Phase>('intro');
  const [missing, setMissing] = useState(0);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [question, setQuestion] = useState<Question | null>(null);
  const [selected, setSelected] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackOk, setFeedbackOk] = useState(false);
  const [questionCount, setQuestionCount] = useState(0);

  const fallAnim = useRef(new Animated.Value(0)).current;
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const poolRef = useRef<ReturnType<typeof Array.prototype.slice>>([]);
  const questionIdxRef = useRef(0);
  const livesRef = useRef(3);
  const scoreRef = useRef(0);
  const lockRef = useRef(false);

  function getTimeForQ(idx: number) {
    return Math.max(MIN_TIME, INITIAL_TIME - idx * DECAY);
  }

  function nextQuestion(idx: number, currentLives: number) {
    if (currentLives <= 0) { endGame(); return; }
    lockRef.current = false;
    setSelected(null);
    setShowFeedback(false);

    const pool = poolRef.current;
    const item = pool[Math.floor(Math.random() * pool.length)];
    const { choices, correctIndex } = generateMCQ(item, pool, 3);
    const q: Question = { hanzi: item.hanzi, pinyin: item.pinyin, choices, correctIndex };
    setQuestion(q);
    setQuestionCount(idx);

    // Animation de chute
    fallAnim.setValue(0);
    const duration = getTimeForQ(idx);
    Animated.timing(fallAnim, { toValue: 1, duration, useNativeDriver: false }).start(({ finished }) => {
      if (finished && !lockRef.current) {
        // Temps écoulé — perte de vie
        handleTimeout(currentLives);
      }
    });
  }

  function handleTimeout(currentLives: number) {
    lockRef.current = true;
    const newLives = currentLives - 1;
    livesRef.current = newLives;
    setLives(newLives);
    setShowFeedback(true);
    setFeedbackOk(false);
    setTimeout(() => {
      questionIdxRef.current++;
      nextQuestion(questionIdxRef.current, newLives);
    }, 700);
  }

  const handleAnswer = useCallback((idx: number) => {
    if (lockRef.current) return;
    lockRef.current = true;
    fallAnim.stopAnimation();
    setSelected(idx);

    if (!question) return;
    const correct = idx === question.correctIndex;
    setFeedbackOk(correct);
    setShowFeedback(true);

    if (correct) {
      const newScore = scoreRef.current + 1;
      scoreRef.current = newScore;
      setScore(newScore);
    } else {
      const newLives = livesRef.current - 1;
      livesRef.current = newLives;
      setLives(newLives);
    }

    setTimeout(() => {
      questionIdxRef.current++;
      nextQuestion(questionIdxRef.current, livesRef.current);
    }, 600);
  }, [question, fallAnim]);

  async function startGame() {
    const pool = localizeVocab(await collectVocabFromCompleted(3), lang);
    poolRef.current = pool;
    if (pool.length < MIN_WORDS) { setMissing(MIN_WORDS - pool.length); setPhase('locked'); return; }
    scoreRef.current = 0;
    livesRef.current = 3;
    questionIdxRef.current = 0;
    setScore(0);
    setLives(3);
    setPhase('playing');
    nextQuestion(0, 3);
  }

  function endGame() {
    saveScore('falling', scoreRef.current);
    setPhase('result');
  }

  // Auto-end when lives hit 0
  useEffect(() => {
    if (phase === 'playing' && lives <= 0) {
      setTimeout(endGame, 400);
    }
  }, [lives, phase]);

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
        <Text style={[s.titleTxt, { color: c.textPrimary }]}>{t('game.locked')}</Text>
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
        <Text style={[s.headerTitle, { color: c.textPrimary }]}>{`🌧️ ${t('game.fallingTitle')}`}</Text>
        <View style={{ width: 38 }} />
      </View>
      <ScrollView contentContainerStyle={s.center}>
        <Text style={s.bigEmoji}>🌧️</Text>
        <Text style={[s.titleTxt, { color: c.textPrimary }]}>{t('game.fallingTitle')}</Text>
        <Text style={[s.desc, { color: c.textSecondary }]}>{t('game.fallingIntro')}</Text>
        <TouchableOpacity style={[s.btn, { backgroundColor: COLOR }]} onPress={startGame}>
          <Ionicons name="play" size={18} color="#FFF" />
          <Text style={s.btnTxt}>{t('game.play')}</Text>
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
        <Text style={[s.headerTitle, { color: c.textPrimary }]}>{t('game.finished')}</Text>
        <View style={{ width: 38 }} />
      </View>
      <ScrollView contentContainerStyle={s.center}>
        <Text style={s.bigEmoji}>{score >= 20 ? '🏆' : score >= 10 ? '🔥' : '📚'}</Text>
        <Text style={[s.scoreNum, { color: COLOR }]}>{score}</Text>
        <Text style={[s.titleTxt, { color: c.textPrimary }]}>{t('game.charsFound')}</Text>
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
  if (!question) return null;

  const fallY = fallAnim.interpolate({ inputRange: [0, 1], outputRange: [0, 260] });

  return (
    <SafeAreaView style={[s.root, { backgroundColor: c.appBg }]}>
      {/* HUD */}
      <View style={[s.hud, { borderBottomColor: c.borderLight }]}>
        <TouchableOpacity onPress={() => { fallAnim.stopAnimation(); router.back(); }} style={s.backBtn}>
          <Ionicons name="close" size={22} color={c.textPrimary} />
        </TouchableOpacity>
        <View style={s.livesRow}>
          {[0, 1, 2].map(i => (
            <Text key={i} style={{ fontSize: 20, opacity: i < lives ? 1 : 0.2 }}>❤️</Text>
          ))}
        </View>
        <View style={[s.scoreBadge, { backgroundColor: COLOR + '20' }]}>
          <Text style={[s.scoreBadgeTxt, { color: COLOR }]}>{score}</Text>
        </View>
      </View>

      {/* Zone de chute */}
      <View style={s.fallZone}>
        <Animated.View style={[s.fallingCard, { transform: [{ translateY: fallY }],
          backgroundColor: showFeedback ? (feedbackOk ? '#4CAF5020' : '#F4433620') : c.cardBg,
          borderColor: showFeedback ? (feedbackOk ? '#4CAF50' : '#F44336') : c.borderLight,
        }]}>
          <Text style={[s.fallingHanzi, { color: c.textPrimary }]}>{question.hanzi}</Text>
          {(showFeedback || selected !== null) && (
            <Text style={[s.fallingPinyin, { color: COLOR }]}>{question.pinyin}</Text>
          )}
        </Animated.View>
      </View>

      {/* Réponses */}
      <View style={[s.answersZone, { borderTopColor: c.borderLight }]}>
        {question.choices.map((choice, i) => {
          let bg = c.cardBg; let border = c.borderLight; let tc = c.textPrimary;
          if (showFeedback) {
            if (i === question.correctIndex) { bg = '#4CAF5015'; border = '#4CAF50'; tc = '#4CAF50'; }
            else if (i === selected && i !== question.correctIndex) { bg = '#F4433615'; border = '#F44336'; tc = '#F44336'; }
          }
          return (
            <TouchableOpacity
              key={i}
              style={[s.answerBtn, { backgroundColor: bg, borderColor: border }]}
              onPress={() => handleAnswer(i)}
              activeOpacity={showFeedback ? 1 : 0.75}
            >
              <Text style={[s.answerTxt, { color: tc }]} numberOfLines={2}>{choice}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  root: { flex: 1 },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1,
  },
  hud: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 16, paddingVertical: 10, borderBottomWidth: 1,
  },
  backBtn: { width: 38, height: 38, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontSize: 17, fontWeight: '700' },
  livesRow: { flexDirection: 'row', gap: 4 },
  scoreBadge: { borderRadius: 10, paddingHorizontal: 12, paddingVertical: 4 },
  scoreBadgeTxt: { fontSize: 16, fontWeight: '800' },

  fallZone: { flex: 1, alignItems: 'center', paddingTop: 20, overflow: 'hidden' },
  fallingCard: {
    width: 140, alignItems: 'center', justifyContent: 'center', padding: 20,
    borderRadius: 18, borderWidth: 2, gap: 6,
  },
  fallingHanzi: { fontSize: 44, fontWeight: '400' },
  fallingPinyin: { fontSize: 16, fontStyle: 'italic' },

  answersZone: {
    padding: 12, borderTopWidth: 1, gap: 10,
    paddingBottom: 24,
  },
  answerBtn: {
    borderRadius: 14, borderWidth: 1.5, padding: 14,
    alignItems: 'center',
  },
  answerTxt: { fontSize: 14, fontWeight: '600', textAlign: 'center' },

  center: { padding: 24, alignItems: 'center', gap: 20 },
  bigEmoji: { fontSize: 64 },
  titleTxt: { fontSize: 22, fontWeight: '800', textAlign: 'center' },
  desc: { fontSize: 14, lineHeight: 22, textAlign: 'center' },
  scoreNum: { fontSize: 56, fontWeight: '900' },
  btn: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    borderRadius: 14, paddingVertical: 14, paddingHorizontal: 24, justifyContent: 'center',
  },
  btnTxt: { color: '#FFF', fontSize: 15, fontWeight: '700' },
  actions: { flexDirection: 'row', gap: 12, width: '100%' },
  outBtn: {
    flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 6, borderRadius: 14, paddingVertical: 14, borderWidth: 1.5,
  },
  outTxt: { fontSize: 14, fontWeight: '600' },
});
