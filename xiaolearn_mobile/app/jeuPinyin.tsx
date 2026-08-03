/**
 * 🎯 Pinyin Express — tape le pinyin + ton du caractère affiché
 * 10 questions, 8s par question, tons obligatoires (chiffres ou diacritiques)
 */
import { useState, useEffect, useRef, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Keyboard } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useColorScheme } from '@/hooks/useColorScheme';
import Colors from '@/constants/Colors';
import { collectVocabFromCompleted, localizeVocab, pick, saveScore } from '@/data/minijeuxHelpers';
import { useI18n } from '@/contexts/LanguageContext';

const COLOR = '#2196F3';
const TOTAL_Q = 10;
const TIME_PER_Q = 10; // +2s car les tons demandent un peu plus de temps

type Phase = 'intro' | 'playing' | 'result' | 'locked';
const MIN_WORDS = 5;
interface Question { hanzi: string; pinyin: string; meaning: string; }

// ── Gestion des tons ──────────────────────────────────────────────────────────

const TONED_MAP: Record<string, [string, number]> = {
  'ā': ['a', 1], 'á': ['a', 2], 'ǎ': ['a', 3], 'à': ['a', 4],
  'ē': ['e', 1], 'é': ['e', 2], 'ě': ['e', 3], 'è': ['e', 4],
  'ī': ['i', 1], 'í': ['i', 2], 'ǐ': ['i', 3], 'ì': ['i', 4],
  'ō': ['o', 1], 'ó': ['o', 2], 'ǒ': ['o', 3], 'ò': ['o', 4],
  'ū': ['u', 1], 'ú': ['u', 2], 'ǔ': ['u', 3], 'ù': ['u', 4],
  'ǖ': ['v', 1], 'ǘ': ['v', 2], 'ǚ': ['v', 3], 'ǜ': ['v', 4],
};

const TONE_LABELS = ['—', '/', '∨', '\\'] as const;
const TONE_VOWELS = ['ˉ', 'ˊ', 'ˇ', 'ˋ'] as const; // accents seuls (U+02C9, U+02CA, U+02C7, U+02CB)

/** Extrait base + numéro de ton depuis un pinyin (diacritiques ou chiffres). */
function parsePinyin(s: string): { base: string; tone: number } {
  let base = '';
  let tone = 0;
  for (const ch of s.toLowerCase().trim()) {
    if (TONED_MAP[ch]) {
      const [b, t] = TONED_MAP[ch];
      base += b;
      if (tone === 0) tone = t;
    } else if (/[1-5]/.test(ch)) {
      if (tone === 0) tone = parseInt(ch);
    } else {
      base += ch;
    }
  }
  return { base, tone };
}

function pinyinMatch(input: string, correct: string): boolean {
  const i = parsePinyin(input);
  const c = parsePinyin(correct);
  return i.base === c.base && i.tone === c.tone;
}

/** Affiche le pinyin en forme diacritique lisible depuis "hei1" ou "hēi". */
function displayPinyin(s: string): string {
  // Si déjà en diacritiques, retourner tel quel
  if (Object.keys(TONED_MAP).some(k => s.includes(k))) return s;
  // Convertir chiffre final → diacritique (basique, suffisant pour l'affichage)
  const match = s.match(/^([a-zü]+)([1-4])$/i);
  if (!match) return s;
  return s; // on garde le format chiffre pour l'input
}

export default function JeuPinyin() {
  const scheme = useColorScheme();
  const c = Colors[scheme];
  const router = useRouter();
  const { t, lang } = useI18n();

  const [phase, setPhase] = useState<Phase>('intro');
  const [missing, setMissing] = useState(0);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [results, setResults] = useState<boolean[]>([]);
  const [input, setInput] = useState('');
  const [activeTone, setActiveTone] = useState<number>(0); // 0 = pas encore choisi
  const [timeLeft, setTimeLeft] = useState(TIME_PER_Q);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const inputRef = useRef<TextInput>(null);
  const lockRef = useRef(false);
  const scoreRef = useRef(0);

  async function startGame() {
    const pool = localizeVocab(await collectVocabFromCompleted(3), lang);
    if (pool.length < MIN_WORDS) { setMissing(MIN_WORDS - pool.length); setPhase('locked'); return; }
    const items = pick(pool, TOTAL_Q);
    const qs: Question[] = items.map(i => ({ hanzi: i.hanzi, pinyin: i.pinyin, meaning: i.meaning }));
    setQuestions(qs);
    setCurrent(0);
    setScore(0);
    scoreRef.current = 0;
    setResults([]);
    setPhase('playing');
    startTimer(qs, 0, [], 0);
  }

  function startTimer(qs: Question[], idx: number, prevResults: boolean[], prevScore: number) {
    clearInterval(timerRef.current!);
    lockRef.current = false;
    setInput('');
    setActiveTone(0);
    setShowFeedback(false);
    setTimeLeft(TIME_PER_Q);
    setTimeout(() => inputRef.current?.focus(), 100);

    let t = TIME_PER_Q;
    timerRef.current = setInterval(() => {
      t--;
      setTimeLeft(t);
      if (t <= 0) {
        clearInterval(timerRef.current!);
        advance(qs, idx, prevResults, prevScore, null);
      }
    }, 1000);
  }

  function advance(qs: Question[], idx: number, prevResults: boolean[], prevScore: number, userInput: string | null) {
    if (lockRef.current) return;
    lockRef.current = true;
    clearInterval(timerRef.current!);
    Keyboard.dismiss();

    const q = qs[idx];
    const ok = userInput !== null && pinyinMatch(userInput, q.pinyin);
    const newScore = prevScore + (ok ? 1 : 0);
    const newResults = [...prevResults, ok];

    setIsCorrect(ok);
    setShowFeedback(true);
    scoreRef.current = newScore;
    setScore(newScore);
    setResults(newResults);

    setTimeout(() => {
      const next = idx + 1;
      if (next >= TOTAL_Q) {
        saveScore('pinyin', newScore);
        setPhase('result');
      } else {
        setCurrent(next);
        startTimer(qs, next, newResults, newScore);
      }
    }, 1200);
  }

  useEffect(() => () => clearInterval(timerRef.current!), []);

  /** Applique un ton : remplace le chiffre de ton final si déjà présent, sinon appende. */
  function applyTone(toneNum: number) {
    if (showFeedback || lockRef.current) return;
    setActiveTone(toneNum);
    const base = input.replace(/[1-5]$/, '');
    const newInput = base + toneNum;
    setInput(newInput);
  }

  const handleSubmit = useCallback(() => {
    if (showFeedback || lockRef.current) return;
    clearInterval(timerRef.current!);
    advance(questions, current, results, score, input);
  }, [questions, current, results, score, input, showFeedback]);

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
        <Text style={[s.headerTitle, { color: c.textPrimary }]}>🎯 Pinyin Express</Text>
        <View style={{ width: 38 }} />
      </View>
      <ScrollView contentContainerStyle={s.center}>
        <Text style={s.bigEmoji}>🎯</Text>
        <Text style={[s.titleTxt, { color: c.textPrimary }]}>Pinyin Express</Text>
        <Text style={[s.desc, { color: c.textSecondary }]}>{t('game.pinyinIntro')}</Text>
        <TouchableOpacity style={[s.btn, { backgroundColor: COLOR }]} onPress={startGame}>
          <Ionicons name="pencil" size={18} color="#FFF" />
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
        <Text style={s.bigEmoji}>{score >= 8 ? '🏆' : score >= 5 ? '🎯' : '📚'}</Text>
        <Text style={[s.scoreNum, { color: COLOR }]}>{score}/{TOTAL_Q}</Text>
        <Text style={[s.titleTxt, { color: c.textPrimary }]}>
          {score >= 8 ? t('game.resExcellent') : score >= 5 ? t('game.resGood2') : t('game.resPractice')}
        </Text>
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

  const pct = (timeLeft / TIME_PER_Q) * 100;
  const urgent = timeLeft <= 3;
  const timerColor = urgent ? '#F44336' : COLOR;

  return (
    <SafeAreaView style={[s.root, { backgroundColor: c.appBg }]}>
      {/* Header */}
      <View style={[s.header, { borderBottomColor: c.borderLight }]}>
        <TouchableOpacity onPress={() => { clearInterval(timerRef.current!); router.back(); }} style={s.backBtn}>
          <Ionicons name="close" size={22} color={c.textPrimary} />
        </TouchableOpacity>
        <Text style={[s.headerTitle, { color: c.textPrimary }]}>{current + 1}/{TOTAL_Q}</Text>
        <View style={[s.timerBadge, { backgroundColor: timerColor + '20', borderColor: timerColor }]}>
          <Text style={[s.timerTxt, { color: timerColor }]}>{timeLeft}s</Text>
        </View>
      </View>

      {/* Barre de progression (temps) */}
      <View style={[s.progTrack, { backgroundColor: c.borderLight }]}>
        <View style={[s.progBar, { width: `${pct}%` as any, backgroundColor: timerColor }]} />
      </View>

      <ScrollView contentContainerStyle={s.body} keyboardShouldPersistTaps="always">
        {/* Score */}
        <Text style={[s.scoreLive, { color: COLOR }]}>{t('game.scoreLive', { n: score })}</Text>

        {/* Caractère */}
        <View style={[s.charCard, {
          backgroundColor: showFeedback ? (isCorrect ? '#4CAF5014' : '#F4433614') : c.cardBg,
          borderColor: showFeedback ? (isCorrect ? '#4CAF50' : '#F44336') : c.borderLight,
        }]}>
          <Text style={[s.charHanzi, { color: c.textPrimary }]}>{q.hanzi}</Text>
          {showFeedback && (
            <>
              <Text style={[s.charPinyin, { color: isCorrect ? '#4CAF50' : '#F44336' }]}>
                {q.pinyin}
              </Text>
              <Text style={[s.charMeaning, { color: c.textTertiary }]}>{q.meaning}</Text>
            </>
          )}
        </View>

        {/* Feedback */}
        {showFeedback && (
          <View style={s.feedbackRow}>
            <Ionicons name={isCorrect ? 'checkmark-circle' : 'close-circle'} size={20}
              color={isCorrect ? '#4CAF50' : '#F44336'} />
            <Text style={[s.feedbackTxt, { color: isCorrect ? '#4CAF50' : '#F44336' }]}>
              {isCorrect ? t('game.correctEx') : input.trim() ? t('game.youWrote', { input }) : t('game.timeUp')}
            </Text>
          </View>
        )}

        {/* Champ texte */}
        <View style={[s.inputWrapper, {
          borderColor: showFeedback
            ? (isCorrect ? '#4CAF50' : '#F44336')
            : (input.length > 0 ? COLOR : c.borderLight),
          backgroundColor: c.cardBg,
        }]}>
          <TextInput
            ref={inputRef}
            style={[s.input, { color: c.textPrimary }]}
            value={input}
            onChangeText={v => {
              // Si l'utilisateur tape un chiffre 1-4, l'utiliser comme ton
              const toneMatch = v.match(/[1-4]$/);
              if (toneMatch) setActiveTone(parseInt(toneMatch[0]));
              else if (!/[1-4]/.test(v)) setActiveTone(0);
              setInput(v);
            }}
            placeholder={t('game.pinyinPlaceholder')}
            placeholderTextColor={c.textTertiary}
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="done"
            onSubmitEditing={handleSubmit}
            editable={!showFeedback}
          />
          {input.length > 0 && !showFeedback && (
            <TouchableOpacity onPress={() => { setInput(''); setActiveTone(0); }} style={s.clearBtn}>
              <Ionicons name="close-circle" size={18} color={c.textTertiary} />
            </TouchableOpacity>
          )}
        </View>

        {/* Barre de tons */}
        {!showFeedback && (
          <View style={s.toneBar}>
            {([1, 2, 3, 4] as const).map(tone => (
              <TouchableOpacity
                key={tone}
                style={[
                  s.toneBtn,
                  {
                    backgroundColor: activeTone === tone ? COLOR : c.cardBg,
                    borderColor: activeTone === tone ? COLOR : c.borderMedium,
                  },
                ]}
                onPress={() => applyTone(tone)}
                activeOpacity={0.7}
              >
                <Text style={[s.toneVowel, { color: activeTone === tone ? '#FFF' : COLOR }]}>
                  {TONE_VOWELS[tone - 1]}
                </Text>
                <Text style={[s.toneNum, { color: activeTone === tone ? 'rgba(255,255,255,0.7)' : c.textTertiary }]}>
                  {t('game.toneN', { n: tone })}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Bouton valider */}
        {!showFeedback && (
          <TouchableOpacity
            style={[s.validateBtn, {
              backgroundColor: input.replace(/[1-4]$/, '').trim().length > 0 && activeTone > 0
                ? COLOR : c.borderLight,
            }]}
            onPress={handleSubmit}
            disabled={input.replace(/[1-4]$/, '').trim().length === 0}
          >
            <Text style={[s.validateTxt, {
              color: input.replace(/[1-4]$/, '').trim().length > 0 && activeTone > 0
                ? '#FFF' : c.textTertiary,
            }]}>
              {activeTone === 0 ? t('game.chooseTone') : t('game.validate')}
            </Text>
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
  timerBadge: { borderRadius: 10, borderWidth: 1.5, paddingHorizontal: 10, paddingVertical: 4 },
  timerTxt: { fontSize: 14, fontWeight: '800' },
  progTrack: { height: 3 },
  progBar: { height: 3 },

  body: { padding: 16, gap: 14, paddingBottom: 40 },
  scoreLive: { fontSize: 13, fontWeight: '700', textAlign: 'center' },

  charCard: {
    alignItems: 'center', justifyContent: 'center',
    borderRadius: 20, borderWidth: 2, padding: 28, gap: 8,
  },
  charHanzi: { fontSize: 64, fontWeight: '400' },
  charPinyin: { fontSize: 22, fontStyle: 'italic', fontWeight: '600' },
  charMeaning: { fontSize: 14 },

  feedbackRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  feedbackTxt: { fontSize: 14, fontWeight: '600' },

  inputWrapper: {
    flexDirection: 'row', alignItems: 'center',
    borderRadius: 14, borderWidth: 2, paddingHorizontal: 14,
    height: 52,
  },
  input: { flex: 1, fontSize: 18, fontWeight: '600' },
  clearBtn: { padding: 4 },

  // Barre de tons
  toneBar: { flexDirection: 'row', gap: 8 },
  toneBtn: {
    flex: 1, alignItems: 'center', justifyContent: 'center',
    borderRadius: 14, borderWidth: 1.5, paddingVertical: 10, gap: 2,
  },
  toneArrow: { fontSize: 13, fontWeight: '700' },
  toneVowel: { fontSize: 26, fontWeight: '700' },
  toneNum: { fontSize: 10, fontWeight: '600' },

  validateBtn: { borderRadius: 14, paddingVertical: 14, alignItems: 'center' },
  validateTxt: { fontSize: 15, fontWeight: '700' },

  center: { padding: 24, alignItems: 'center', gap: 20 },
  bigEmoji: { fontSize: 64 },
  titleTxt: { fontSize: 22, fontWeight: '800', textAlign: 'center' },
  desc: { fontSize: 14, lineHeight: 22, textAlign: 'center' },
  scoreNum: { fontSize: 52, fontWeight: '900' },
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
  headerMeta: { fontSize: 13, fontWeight: '700' },
});
