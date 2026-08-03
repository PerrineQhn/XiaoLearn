/**
 * 🃏 Memory — associe hanzi ↔ traduction
 * 8 paires (16 cartes), timer, compteur de coups.
 */
import { useState, useEffect, useRef, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useColorScheme } from '@/hooks/useColorScheme';
import Colors from '@/constants/Colors';
import { collectVocabFromCompleted, localizeVocab, pick, shuffle, saveScore } from '@/data/minijeuxHelpers';
import { useI18n } from '@/contexts/LanguageContext';

const PAIRS = 8;
const COLOR = '#4CAF50';

interface Card {
  id: string;        // unique per card
  pairId: number;    // same for hanzi + meaning
  text: string;
  isHanzi: boolean;
}

type Phase = 'intro' | 'playing' | 'result' | 'locked';
const MIN_WORDS = 8;

export default function JeuMemory() {
  const scheme = useColorScheme();
  const c = Colors[scheme];
  const router = useRouter();
  const { t, lang } = useI18n();

  const [phase, setPhase] = useState<Phase>('intro');
  const [cards, setCards] = useState<Card[]>([]);
  const [flipped, setFlipped] = useState<Set<string>>(new Set());
  const [matched, setMatched] = useState<Set<string>>(new Set());
  const [moves, setMoves] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const pendingRef = useRef<string[]>([]);
  const lockRef = useRef(false);

  const [missing, setMissing] = useState(0);

  async function startGame() {
    const pool = localizeVocab(await collectVocabFromCompleted(3), lang);
    if (pool.length < MIN_WORDS) { setMissing(MIN_WORDS - pool.length); setPhase('locked'); return; }
    const vocab = pick(pool, PAIRS);
    const newCards: Card[] = [];
    vocab.forEach((item, i) => {
      newCards.push({ id: `h${i}`, pairId: i, text: item.hanzi, isHanzi: true });
      newCards.push({ id: `m${i}`, pairId: i, text: item.meaning, isHanzi: false });
    });
    setCards(shuffle(newCards));
    setFlipped(new Set());
    setMatched(new Set());
    setMoves(0);
    setElapsed(0);
    lockRef.current = false;
    pendingRef.current = [];
    timerRef.current && clearInterval(timerRef.current);
    timerRef.current = setInterval(() => setElapsed(p => p + 1), 1000);
    setPhase('playing');
  }

  useEffect(() => () => { timerRef.current && clearInterval(timerRef.current); }, []);

  const handleFlip = useCallback((card: Card) => {
    if (lockRef.current) return;
    if (matched.has(card.id)) return;
    if (flipped.has(card.id)) return;

    const newFlipped = new Set(flipped);
    newFlipped.add(card.id);
    setFlipped(newFlipped);

    const pending = [...pendingRef.current, card.id];
    pendingRef.current = pending;

    if (pending.length === 2) {
      lockRef.current = true;
      setMoves(m => m + 1);
      const [a, b] = pending.map(id => cards.find(cc => cc.id === id)!);
      if (a.pairId === b.pairId) {
        // Match !
        const newMatched = new Set(matched);
        newMatched.add(a.id); newMatched.add(b.id);
        setMatched(newMatched);
        pendingRef.current = [];
        lockRef.current = false;
        if (newMatched.size === cards.length) {
          clearInterval(timerRef.current!);
          setPhase('result');
          saveScore('memory', moves + 1, { bestTime: elapsed });
        }
      } else {
        // No match — retourne après 900ms
        setTimeout(() => {
          const reverted = new Set(newFlipped);
          reverted.delete(a.id); reverted.delete(b.id);
          setFlipped(reverted);
          pendingRef.current = [];
          lockRef.current = false;
        }, 900);
      }
    }
  }, [flipped, matched, cards, moves, elapsed]);

  const fmt = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

  // ── LOCKED ──
  if (phase === 'locked') return (
    <SafeAreaView style={[st.root, { backgroundColor: c.appBg }]}>
      <Header title="🃏 Memory" color={COLOR} c={c} onBack={() => router.back()} />
      <ScrollView contentContainerStyle={st.center}>
        <Text style={st.bigEmoji}>🔒</Text>
        <Text style={[st.title, { color: c.textPrimary }]}>{t('game.locked')}</Text>
        <Text style={[st.desc, { color: c.textSecondary }]}>{t('game.lockedMsg', { n: missing })}</Text>
        <TouchableOpacity style={[st.btn, { backgroundColor: COLOR }]} onPress={() => router.back()}>
          <Text style={st.btnTxt}>{t('game.backToCourses')}</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
  // ── INTRO ──
  if (phase === 'intro') return (
    <SafeAreaView style={[st.root, { backgroundColor: c.appBg }]}>
      <Header title="🃏 Memory" color={COLOR} c={c} onBack={() => router.back()} />
      <ScrollView contentContainerStyle={st.center}>
        <Text style={st.bigEmoji}>🃏</Text>
        <Text style={[st.title, { color: c.textPrimary }]}>Memory</Text>
        <Text style={[st.desc, { color: c.textSecondary }]}>{t('game.memoryIntro')}</Text>
        <TouchableOpacity style={[st.btn, { backgroundColor: COLOR }]} onPress={startGame}>
          <Ionicons name="play" size={18} color="#FFF" />
          <Text style={st.btnTxt}>{t('game.start')}</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );

  // ── RESULT ──
  if (phase === 'result') return (
    <SafeAreaView style={[st.root, { backgroundColor: c.appBg }]}>
      <Header title="🃏 Memory" color={COLOR} c={c} onBack={() => router.back()} />
      <ScrollView contentContainerStyle={st.center}>
        <Text style={st.bigEmoji}>🎉</Text>
        <Text style={[st.title, { color: c.textPrimary }]}>{t('game.finished')}</Text>
        <View style={[st.scoreCard, { backgroundColor: c.cardBg, borderColor: c.borderLight }]}>
          <Stat label={t('game.time')} value={fmt(elapsed)} color={COLOR} />
          <View style={[st.divider, { backgroundColor: c.borderLight }]} />
          <Stat label={t('game.moves')} value={String(moves)} color={COLOR} />
          <View style={[st.divider, { backgroundColor: c.borderLight }]} />
          <Stat label={t('game.pairs')} value={`${PAIRS}/${PAIRS}`} color={COLOR} />
        </View>
        <View style={st.actions}>
          <TouchableOpacity style={[st.outlineBtn, { borderColor: COLOR }]} onPress={startGame}>
            <Ionicons name="refresh" size={16} color={COLOR} />
            <Text style={[st.outlineTxt, { color: COLOR }]}>{t('game.replay')}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[st.btn, { backgroundColor: COLOR, flex: 1 }]} onPress={() => router.back()}>
            <Text style={st.btnTxt}>{t('game.quit')}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );

  // ── PLAYING ──
  return (
    <SafeAreaView style={[st.root, { backgroundColor: c.appBg }]}>
      <View style={[st.header, { borderBottomColor: c.borderLight }]}>
        <TouchableOpacity onPress={() => { clearInterval(timerRef.current!); router.back(); }} style={st.backBtn}>
          <Ionicons name="close" size={22} color={c.textPrimary} />
        </TouchableOpacity>
        <Text style={[st.headerMeta, { color: COLOR }]}>⏱ {fmt(elapsed)}</Text>
        <Text style={[st.headerMeta, { color: c.textTertiary }]}>{moves} {t('game.movesUnit')}</Text>
        <Text style={[st.headerMeta, { color: c.textPrimary }]}>
          {matched.size / 2}/{PAIRS}
        </Text>
      </View>

      <View style={st.grid}>
        {cards.map(card => {
          const isFlipped = flipped.has(card.id) || matched.has(card.id);
          const isMatched = matched.has(card.id);
          return (
            <Pressable
              key={card.id}
              style={[
                st.card,
                isMatched
                  ? { backgroundColor: '#F0FDF4', borderColor: COLOR }
                  : isFlipped
                  ? { backgroundColor: c.cardBg, borderColor: c.borderLight }
                  : { backgroundColor: c.primaryRed, borderColor: 'transparent' },
              ]}
              onPress={() => handleFlip(card)}
            >
              {isFlipped ? (
                <View style={st.cardFace}>
                  <Text
                    style={[
                      card.isHanzi ? st.cardHanzi : st.cardMeaning,
                      { color: isMatched ? COLOR : card.isHanzi ? c.primaryRed : c.textPrimary },
                    ]}
                    numberOfLines={card.isHanzi ? 1 : 3}
                    adjustsFontSizeToFit
                  >
                    {card.text}
                  </Text>
                </View>
              ) : (
                /* Dos de carte : caractère décoratif watermark */
                <View style={st.cardBack}>
                  <Text style={st.cardBackWm}>学</Text>
                </View>
              )}
            </Pressable>
          );
        })}
      </View>
    </SafeAreaView>
  );
}

function Stat({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <View style={{ alignItems: 'center', flex: 1 }}>
      <Text style={{ fontSize: 22, fontWeight: '800', color }}>{value}</Text>
      <Text style={{ fontSize: 11, color: '#888', marginTop: 2 }}>{label}</Text>
    </View>
  );
}

function Header({ title, color, c, onBack }: any) {
  return (
    <View style={[st.header, { borderBottomColor: c.borderLight }]}>
      <TouchableOpacity onPress={onBack} style={st.backBtn}>
        <Ionicons name="arrow-back" size={22} color={c.textPrimary} />
      </TouchableOpacity>
      <Text style={[st.headerTitle, { color: c.textPrimary }]}>{title}</Text>
      <View style={{ width: 38 }} />
    </View>
  );
}

const st = StyleSheet.create({
  root: { flex: 1 },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1,
  },
  backBtn: { width: 38, height: 38, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontSize: 17, fontWeight: '700' },
  headerMeta: { fontSize: 13, fontWeight: '700' },
  center: { padding: 24, alignItems: 'center', gap: 18 },
  bigEmoji: { fontSize: 64 },
  title: { fontSize: 24, fontWeight: '800' },
  desc: { fontSize: 14, lineHeight: 22, textAlign: 'center' },
  btn: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    borderRadius: 14, paddingVertical: 14, paddingHorizontal: 28, justifyContent: 'center',
  },
  btnTxt: { color: '#FFF', fontSize: 15, fontWeight: '700' },
  scoreCard: {
    flexDirection: 'row', width: '100%', borderRadius: 16, borderWidth: 1,
    padding: 20, alignItems: 'center',
  },
  divider: { width: 1, height: 36, marginHorizontal: 8 },
  actions: { flexDirection: 'row', gap: 12, width: '100%' },
  outlineBtn: {
    flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 6, borderRadius: 14, paddingVertical: 14, borderWidth: 1.5,
  },
  outlineTxt: { fontSize: 14, fontWeight: '600' },
  // Grid
  grid: {
    flex: 1, flexDirection: 'row', flexWrap: 'wrap',
    paddingHorizontal: 14, paddingVertical: 16, gap: 10, alignContent: 'flex-start',
  },
  card: {
    width: '22%', aspectRatio: 0.82,
    borderRadius: 14, borderWidth: 1.5,
    overflow: 'hidden',
    shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 4, shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  cardFace: {
    flex: 1, alignItems: 'center', justifyContent: 'center', padding: 6,
  },
  cardHanzi: {
    fontSize: 26, fontWeight: '800', textAlign: 'center',
  },
  cardMeaning: {
    fontSize: 11, fontWeight: '600', textAlign: 'center', lineHeight: 16,
  },
  cardBack: {
    flex: 1, alignItems: 'center', justifyContent: 'center',
  },
  cardBackWm: {
    fontSize: 32, fontWeight: '900', color: 'rgba(255,255,255,0.18)',
  },
});
