/**
 * 🧩 Constructeur de phrases — remets les mots dans le bon ordre
 * Affiche phrase FR → tap les chips ZH pour former la traduction
 */
import { useState, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useColorScheme } from '@/hooks/useColorScheme';
import Colors from '@/constants/Colors';
import { collectSentencesFromCompleted, shuffle, pick, saveScore } from '@/data/minijeuxHelpers';
import { useI18n } from '@/contexts/LanguageContext';

const COLOR = '#9C27B0';
const TOTAL_Q = 10;

type Phase = 'intro' | 'playing' | 'result' | 'locked';
const MIN_SENTENCES = 3;

interface Token { text: string; pinyin: string; }
interface Question { fr: string; en: string; zh: Token[]; scrambled: Token[]; }
// On garde la réponse donnée, pas seulement le verdict : sans elle le bilan
// ne peut pas montrer à l'apprenant ce qu'il a construit.
interface Result { ok: boolean; given: string; }

export default function JeuSentence() {
  const scheme = useColorScheme();
  const c = Colors[scheme];
  const router = useRouter();
  const { t, pick: pickLang, lang } = useI18n();

  const [phase, setPhase] = useState<Phase>('intro');
  const [missing, setMissing] = useState(0);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [results, setResults] = useState<Result[]>([]);

  // Chips available (pool): indices into scrambled[]
  const [available, setAvailable] = useState<number[]>([]);
  // Chips chosen (answer): indices into scrambled[]
  const [chosen, setChosen] = useState<number[]>([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  async function startGame() {
    const pool = await collectSentencesFromCompleted();
    if (pool.length < MIN_SENTENCES) { setMissing(MIN_SENTENCES - pool.length); setPhase('locked'); return; }
    const picked = pick(pool, TOTAL_Q);
    const qs: Question[] = picked.map(s => ({
      fr: s.fr,
      en: s.en,
      zh: s.zh,
      scrambled: shuffle([...s.zh]),
    }));
    setQuestions(qs);
    setCurrent(0);
    setScore(0);
    setResults([]);
    setPhase('playing');
    resetChips(qs[0]);
  }

  function resetChips(q: Question) {
    setAvailable(q.scrambled.map((_, i) => i));
    setChosen([]);
    setShowFeedback(false);
    setIsCorrect(false);
  }

  const pickChip = useCallback((scrIdx: number) => {
    if (showFeedback) return;
    setAvailable(prev => prev.filter(i => i !== scrIdx));
    setChosen(prev => [...prev, scrIdx]);
  }, [showFeedback]);

  const unpickChip = useCallback((pos: number) => {
    if (showFeedback) return;
    const scrIdx = chosen[pos];
    setChosen(prev => prev.filter((_, i) => i !== pos));
    setAvailable(prev => [...prev, scrIdx]);
  }, [chosen, showFeedback]);

  function check() {
    const q = questions[current];
    const chosenTexts = chosen.map(i => q.scrambled[i].text);
    const correctTexts = q.zh.map(t => t.text);
    const given = chosenTexts.join('');
    const ok = given === correctTexts.join('');
    setIsCorrect(ok);
    setShowFeedback(true);
    const newScore = score + (ok ? 1 : 0);
    const newResults: Result[] = [...results, { ok, given }];
    setTimeout(() => {
      const next = current + 1;
      if (next >= TOTAL_Q) {
        saveScore('sentence', newScore);
        setScore(newScore);
        setResults(newResults);
        setPhase('result');
      } else {
        setScore(newScore);
        setResults(newResults);
        setCurrent(next);
        resetChips(questions[next]);
      }
    }, 900);
  }

  const q = questions[current];
  const allPlaced = q && chosen.length === q.zh.length;

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
        <Text style={[s.desc, { color: c.textSecondary }]}>{t('game.lockedMsgSentences', { n: missing })}</Text>
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
        <Text style={[s.headerTitle, { color: c.textPrimary }]}>{`🧩 ${t('game.builderShort')}`}</Text>
        <View style={{ width: 38 }} />
      </View>
      <ScrollView contentContainerStyle={s.center}>
        <Text style={s.bigEmoji}>🧩</Text>
        <Text style={[s.titleTxt, { color: c.textPrimary }]}>{t('game.builderTitle')}</Text>
        <Text style={[s.desc, { color: c.textSecondary }]}>{t('game.builderIntro')}</Text>
        <TouchableOpacity style={[s.btn, { backgroundColor: COLOR }]} onPress={startGame}>
          <Ionicons name="play" size={18} color="#FFF" />
          <Text style={s.btnTxt}>{t('game.start')}</Text>
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
        <Text style={s.bigEmoji}>{score >= 8 ? '🏆' : score >= 5 ? '🎯' : '📚'}</Text>
        <Text style={[s.scoreNum, { color: COLOR }]}>{score}/{TOTAL_Q}</Text>
        <Text style={[s.titleTxt, { color: c.textPrimary }]}>
          {score >= 8 ? t('game.resExcellent') : score >= 5 ? t('game.resGood2') : t('game.resKeep')}
        </Text>
        <View style={s.dotsRow}>
          {results.map((r, i) => (
            <View key={i} style={[s.dot, { backgroundColor: r.ok ? '#4CAF50' : '#F44336' }]} />
          ))}
        </View>

        {/* Bilan des erreurs — c'est là que le jeu devient utile : sans le
            détail, on sait qu'on a raté sans savoir quoi. */}
        <View style={s.reviewBox}>
          <Text style={[s.reviewTitle, { color: c.textPrimary }]}>{t('game.toReview')}</Text>
          {results.every(r => r.ok) ? (
            <Text style={[s.reviewEmpty, { color: c.textSecondary }]}>{t('game.allRight')}</Text>
          ) : (
            results.map((r, i) => {
              if (r.ok) return null;
              const qi = questions[i];
              if (!qi) return null;
              return (
                <View
                  key={i}
                  style={[s.reviewCard, { backgroundColor: c.cardBg, borderColor: c.borderLight }]}
                >
                  <Text style={[s.reviewFr, { color: c.textSecondary }]}>
                    {pickLang(qi.fr, qi.en)}
                  </Text>

                  <Text style={[s.reviewLabel, { color: '#F44336' }]}>{t('game.yourAnswer')}</Text>
                  <Text style={[s.reviewGiven, { color: c.textTertiary }]}>
                    {r.given || t('game.noAnswer')}
                  </Text>

                  <Text style={[s.reviewLabel, { color: '#4CAF50' }]}>{t('game.rightAnswer')}</Text>
                  <Text style={[s.reviewZh, { color: c.textPrimary }]}>
                    {qi.zh.map(tok => tok.text).join('')}
                  </Text>
                  <Text style={[s.reviewPinyin, { color: c.textTertiary }]}>
                    {qi.zh.map(tok => tok.pinyin).join(' ')}
                  </Text>
                </View>
              );
            })
          )}
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

  const feedbackBg = showFeedback ? (isCorrect ? '#4CAF5014' : '#F4433614') : c.cardBg;
  const feedbackBorder = showFeedback ? (isCorrect ? '#4CAF50' : '#F44336') : c.borderLight;

  return (
    <SafeAreaView style={[s.root, { backgroundColor: c.appBg }]}>
      {/* Header */}
      <View style={[s.header, { borderBottomColor: c.borderLight }]}>
        <TouchableOpacity onPress={() => router.back()} style={s.backBtn}>
          <Ionicons name="close" size={22} color={c.textPrimary} />
        </TouchableOpacity>
        <Text style={[s.headerTitle, { color: c.textPrimary }]}>{current + 1}/{TOTAL_Q}</Text>
        <View style={[s.scoreBadge, { backgroundColor: COLOR + '20' }]}>
          <Text style={[s.scoreBadgeTxt, { color: COLOR }]}>{t('game.ptsLive', { n: score })}</Text>
        </View>
      </View>

      {/* Progress bar */}
      <View style={[s.progTrack, { backgroundColor: c.borderLight }]}>
        <View style={[s.progBar, { width: `${(current / TOTAL_Q) * 100}%` as any, backgroundColor: COLOR }]} />
      </View>

      <ScrollView contentContainerStyle={s.body}>
        {/* French sentence */}
        <View style={[s.frCard, { backgroundColor: c.cardBg, borderColor: c.borderLight }]}>
          <Text style={[s.frLabel, { color: c.textTertiary }]}>{`${lang === 'en' ? '🇬🇧' : '🇫🇷'} ${t('game.translateToZh')}`}</Text>
          <Text style={[s.frText, { color: c.textPrimary }]}>{pickLang(q.fr, q.en)}</Text>
        </View>

        {/* Answer zone */}
        <View style={[s.answerZone, { backgroundColor: feedbackBg, borderColor: feedbackBorder }]}>
          {chosen.length === 0 ? (
            <Text style={[s.placeholder, { color: c.textTertiary }]}>{t('game.tapWordsOrder')}</Text>
          ) : (
            <View style={s.chipsRow}>
              {chosen.map((scrIdx, pos) => (
                <TouchableOpacity
                  key={`c-${pos}`}
                  style={[s.chip, { backgroundColor: COLOR + '22', borderColor: COLOR }]}
                  onPress={() => unpickChip(pos)}
                  activeOpacity={showFeedback ? 1 : 0.7}
                >
                  <Text style={[s.chipHanzi, { color: COLOR }]}>{q.scrambled[scrIdx].text}</Text>
                  <Text style={[s.chipPinyin, { color: COLOR + 'AA' }]}>{q.scrambled[scrIdx].pinyin}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
          {showFeedback && (
            <View style={s.feedbackRow}>
              <Ionicons name={isCorrect ? 'checkmark-circle' : 'close-circle'} size={18}
                color={isCorrect ? '#4CAF50' : '#F44336'} />
              <Text style={[s.feedbackTxt, { color: isCorrect ? '#4CAF50' : '#F44336' }]}>
                {isCorrect ? t('game.correctEx') : q.zh.map(tok => tok.text).join('')}
              </Text>
            </View>
          )}
        </View>

        {/* Available chips */}
        <View style={s.chipsPool}>
          {available.map(scrIdx => (
            <TouchableOpacity
              key={`a-${scrIdx}`}
              style={[s.chip, { backgroundColor: c.cardBg, borderColor: c.borderLight }]}
              onPress={() => pickChip(scrIdx)}
              activeOpacity={0.7}
            >
              <Text style={[s.chipHanzi, { color: c.textPrimary }]}>{q.scrambled[scrIdx].text}</Text>
              <Text style={[s.chipPinyin, { color: c.textTertiary }]}>{q.scrambled[scrIdx].pinyin}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Validate */}
        {!showFeedback && (
          <TouchableOpacity
            style={[s.validateBtn, {
              backgroundColor: allPlaced ? COLOR : c.borderLight,
              opacity: allPlaced ? 1 : 0.5,
            }]}
            onPress={check}
            disabled={!allPlaced}
          >
            <Text style={[s.validateTxt, { color: allPlaced ? '#FFF' : c.textTertiary }]}>{t('game.check')}</Text>
          </TouchableOpacity>
        )}
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
  scoreBadge: { borderRadius: 10, paddingHorizontal: 10, paddingVertical: 4 },
  scoreBadgeTxt: { fontSize: 13, fontWeight: '800' },
  progTrack: { height: 3 },
  progBar: { height: 3 },

  body: { padding: 16, gap: 14, paddingBottom: 40 },
  frCard: {
    borderRadius: 16, borderWidth: 1.5, padding: 16, gap: 6,
  },
  frLabel: { fontSize: 11, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.5 },
  frText: { fontSize: 18, fontWeight: '600', lineHeight: 26 },

  answerZone: {
    borderRadius: 14, borderWidth: 1.5, padding: 12, minHeight: 70,
    justifyContent: 'center',
  },
  placeholder: { fontSize: 13, fontStyle: 'italic', textAlign: 'center', paddingVertical: 8 },
  chipsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  feedbackRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 8 },
  feedbackTxt: { fontSize: 14, fontWeight: '700' },

  chipsPool: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: {
    borderRadius: 10, borderWidth: 1.5, paddingHorizontal: 12, paddingVertical: 7,
    alignItems: 'center',
  },
  chipHanzi: { fontSize: 18, fontWeight: '400' },
  chipPinyin: { fontSize: 10 },

  validateBtn: {
    borderRadius: 14, paddingVertical: 14, alignItems: 'center', marginTop: 4,
  },
  validateTxt: { fontSize: 15, fontWeight: '700' },

  center: { padding: 24, alignItems: 'center', gap: 20 },
  bigEmoji: { fontSize: 64 },
  titleTxt: { fontSize: 22, fontWeight: '800', textAlign: 'center' },
  desc: { fontSize: 14, lineHeight: 22, textAlign: 'center' },
  scoreNum: { fontSize: 52, fontWeight: '900' },
  reviewBox: { alignSelf: 'stretch', marginTop: 22, gap: 10 },
  reviewTitle: { fontSize: 15, fontWeight: '800' },
  reviewEmpty: { fontSize: 13.5 },
  reviewCard: { borderRadius: 14, borderWidth: 1, padding: 13, gap: 3 },
  reviewFr: { fontSize: 13.5, fontStyle: 'italic', marginBottom: 5 },
  reviewLabel: { fontSize: 11, fontWeight: '800', textTransform: 'uppercase', marginTop: 5 },
  reviewGiven: { fontSize: 16, textDecorationLine: 'line-through' },
  reviewZh: { fontSize: 18, lineHeight: 26 },
  reviewPinyin: { fontSize: 12.5, fontStyle: 'italic' },
  dotsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, justifyContent: 'center' },
  dot: { width: 12, height: 12, borderRadius: 6 },
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
