/**
 * XiaoLearn Mobile — Battles PvP
 * Phases : lobby → searching → countdown → playing → results
 * Mode bot si aucun adversaire trouvé en 30 s.
 */
import {
  useState, useEffect, useRef, useCallback,
} from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView,
  Animated, Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useColorScheme } from '@/hooks/useColorScheme';
import Colors from '@/constants/Colors';
import { useAuth } from '@/contexts/AuthContext';
import {
  findOrCreateBattle, listenBattle, submitAnswer,
  finishPlayerBattle, publishBattleResult, cancelBattle,
  computeWinner, generateBattleQuestions,
  type Battle, type BattleQuestion,
} from '@/services/battleService';
import { useI18n } from '@/contexts/LanguageContext';

// ─── Types & constantes ───────────────────────────────────────────────────────
type Phase = 'lobby' | 'searching' | 'countdown' | 'playing' | 'results';

const QUESTION_TIME = 15;   // secondes par question
const SEARCH_TIMEOUT = 30;  // avant de proposer le bot
const BOT_NAMES = ['龙小天', '凤雅丽', '虎云飞', '星明月', '雪晶晶'];
const BOT_DELAY_MS = [1200, 2800, 4500, 6000, 3400, 5100, 2000, 7000, 1500, 4000];
/**
 * Cadence du bot entre deux questions. Volontairement plus courte que
 * QUESTION_TIME : un joueur qui répond en 3 s ne doit pas gagner par forfait.
 */
const BOT_STEP_MS = 4000;

// ─── Composant timer (badge numérique + couleur) ──────────────────────────────
function CircleTimer({ seconds, total, color }: { seconds: number; total: number; color: string }) {
  const urgent = seconds <= 5;
  const c = urgent ? '#F44336' : color;
  return (
    <View style={{ width: 44, height: 44, alignItems: 'center', justifyContent: 'center',
      borderRadius: 12, borderWidth: 2, borderColor: c + '60', backgroundColor: c + '14' }}>
      <Text style={{ fontSize: 16, fontWeight: '800', color: c }}>{seconds}</Text>
    </View>
  );
}

// ─── Score badge ─────────────────────────────────────────────────────────────
function ScoreBar({
  myScore, oppScore, myName, oppName, totalQ, colors,
}: {
  myScore: number; oppScore: number; myName: string; oppName: string;
  totalQ: number; colors: typeof Colors.light;
}) {
  return (
    <View style={[sb.row, { backgroundColor: colors.cardBg, borderColor: colors.borderLight }]}>
      <View style={sb.player}>
        <Text style={[sb.name, { color: colors.textPrimary }]} numberOfLines={1}>{myName}</Text>
        <Text style={[sb.score, { color: '#4CAF50' }]}>{myScore}</Text>
      </View>
      <Text style={[sb.vs, { color: colors.textTertiary }]}>VS</Text>
      <View style={[sb.player, { alignItems: 'flex-end' }]}>
        <Text style={[sb.name, { color: colors.textPrimary }]} numberOfLines={1}>{oppName}</Text>
        <Text style={[sb.score, { color: '#F44336' }]}>{oppScore}</Text>
      </View>
    </View>
  );
}
const sb = StyleSheet.create({
  row: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 20, paddingVertical: 12, borderRadius: 16, borderWidth: 1,
    marginHorizontal: 16, marginTop: 8,
  },
  player: { flex: 1, gap: 2 },
  name: { fontSize: 13, fontWeight: '600' },
  score: { fontSize: 22, fontWeight: '800' },
  vs: { fontSize: 13, fontWeight: '700', paddingHorizontal: 8 },
});

// ─── Composant principal ──────────────────────────────────────────────────────
export default function BattleScreen() {
  const scheme = useColorScheme();
  const c = Colors[scheme];
  const router = useRouter();
  const { user } = useAuth();
  const { t, lang } = useI18n();

  const myUid = user?.uid ?? 'guest';
  const myName = user?.displayName ?? t('battle.me');

  // Phase
  const [phase, setPhase] = useState<Phase>('lobby');

  // Searching
  const [searchSeconds, setSearchSeconds] = useState(0);
  const [battleId, setBattleId] = useState<string | null>(null);
  const [isCreator, setIsCreator] = useState(false);
  const searchTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Battle state (live)
  const [battle, setBattle] = useState<Battle | null>(null);
  const battleRef = useRef<Battle | null>(null);
  battleRef.current = battle;
  const unsubRef = useRef<(() => void) | null>(null);

  // Bot mode
  const [botMode, setBotMode] = useState(false);
  const botNameRef = useRef(BOT_NAMES[Math.floor(Math.random() * BOT_NAMES.length)]);

  // Local playing state
  const [questions, setQuestions] = useState<BattleQuestion[]>([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [myScore, setMyScore] = useState(0);
  const [oppScore, setOppScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(QUESTION_TIME);
  const qTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Countdown
  const [countdownVal, setCountdownVal] = useState(3);

  // Results
  const [winnerId, setWinnerId] = useState<string | null | undefined>(undefined);

  // ── Cleanup ────────────────────────────────────────────────────────────────
  useEffect(() => {
    return () => {
      unsubRef.current?.();
      clearInterval(searchTimerRef.current ?? undefined);
      clearInterval(qTimerRef.current ?? undefined);
      // Cancel waiting battle if still searching
      if (battleId && !battle?.startedAt) {
        cancelBattle(battleId);
      }
    };
  }, []);

  // ── Watch battle changes from Firestore ────────────────────────────────────
  useEffect(() => {
    if (!battle || botMode) return;

    // Opponent score
    const oppId = battle.playerIds.find(id => id !== myUid);
    if (oppId && battle.players[oppId]) {
      setOppScore(battle.players[oppId].score);
    }

    // Battle became active → start countdown
    if (battle.status === 'active' && phase === 'searching') {
      startCountdown();
    }

    // Battle finished → show results
    if (battle.status === 'finished' && phase === 'playing') {
      setWinnerId(battle.winnerId);
      setPhase('results');
    }
  }, [battle]);

  // ── Start searching ────────────────────────────────────────────────────────
  const startSearch = useCallback(async () => {
    if (!user) return;
    setPhase('searching');
    setSearchSeconds(0);

    // Timer UI
    let elapsed = 0;
    searchTimerRef.current = setInterval(() => {
      elapsed++;
      setSearchSeconds(elapsed);
    }, 1000);

    try {
      const result = await findOrCreateBattle(myUid, myName, user.photoURL ?? null, lang);
      // null = personne dans la file au bout du délai. Ce n'est pas une erreur,
      // et on le distingue d'une panne : le message affiché n'est pas le même.
      if (!result) {
        clearInterval(searchTimerRef.current!);
        startBotMode();
        return;
      }
      setBattleId(result.battleId);
      setIsCreator(result.isCreator);

      if (!result.isCreator) {
        // Joined existing battle → questions already in Firestore, start countdown
        clearInterval(searchTimerRef.current!);
        startListening(result.battleId);
        startCountdown();
      } else {
        // Created → wait for opponent, start listener
        startListening(result.battleId);
      }
    } catch (e) {
      console.error('[Battle] findOrCreateBattle error', e);
      clearInterval(searchTimerRef.current!);
      // Fallback: bot mode
      startBotMode();
    }
  // startBotMode est déclaré plus bas ; l'inclure ici créerait un cycle de
  // déclaration. La fonction ne capture rien de variable, la référence est sûre.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, myUid, myName, lang]);

  // ── Play against bot ───────────────────────────────────────────────────────
  const startBotMode = useCallback(() => {
    clearInterval(searchTimerRef.current!);
    setBotMode(true);
    const qs = generateBattleQuestions(10);
    setQuestions(qs);
    setCurrentQ(0);
    setMyScore(0);
    setOppScore(0);
    startCountdown(true);
  }, []);

  // ── Listen Firestore ───────────────────────────────────────────────────────
  const startListening = useCallback((id: string) => {
    unsubRef.current?.();
    unsubRef.current = listenBattle(id, newBattle => {
      if (!newBattle) return;
      setBattle(newBattle);
      setQuestions(newBattle.questions ?? []);
    });
  }, []);

  // ── Countdown 3-2-1 → go ──────────────────────────────────────────────────
  const startCountdown = useCallback((bot = false) => {
    setPhase('countdown');
    setCountdownVal(3);
    let val = 3;
    const iv = setInterval(() => {
      val--;
      if (val <= 0) {
        clearInterval(iv);
        setPhase('playing');
        if (bot) {
          startQuestionTimer(0);
          scheduleBotAnswers();
        } else {
          startQuestionTimer(0);
        }
      } else {
        setCountdownVal(val);
      }
    }, 900);
  }, []);

  // ── Question timer ─────────────────────────────────────────────────────────
  const startQuestionTimer = useCallback((qIdx: number) => {
    clearInterval(qTimerRef.current!);
    setTimeLeft(QUESTION_TIME);
    setSelected(null);
    let t = QUESTION_TIME;
    qTimerRef.current = setInterval(() => {
      t--;
      setTimeLeft(t);
      if (t <= 0) {
        clearInterval(qTimerRef.current!);
        // Auto-advance (wrong)
        advanceQuestion(qIdx, -1, false);
      }
    }, 1000);
  }, []);

  // ── Bot answers simulator ──────────────────────────────────────────────────
  const botTimeouts = useRef<ReturnType<typeof setTimeout>[]>([]);
  const scheduleBotAnswers = useCallback(() => {
    // Le bot répondait sur une horloge fixe (question i à i × 15 s), mais la
    // partie s'arrête dès que le JOUEUR a fini — en annulant les timeouts
    // restants. Un joueur rapide bouclait en 40 s : le bot n'avait répondu
    // qu'à 2 ou 3 questions, d'où un 9-1 systématique. Le bot suit maintenant
    // le rythme réel du joueur : un délai propre par question, indépendant de
    // l'horloge globale.
    for (let i = 0; i < 10; i++) {
      const delay = (i * BOT_STEP_MS) + (BOT_DELAY_MS[i] ?? 3000);
      const t = setTimeout(() => {
        // Bot answers with ~60% accuracy
        const correct = Math.random() < 0.60;
        if (correct) {
          setOppScore(prev => prev + 1);
        }
      }, delay);
      botTimeouts.current.push(t);
    }
  }, []);

  useEffect(() => {
    return () => { botTimeouts.current.forEach(clearTimeout); };
  }, []);

  // ── Answer handler ─────────────────────────────────────────────────────────
  const handleAnswer = useCallback((idx: number) => {
    if (selected !== null) return;
    clearInterval(qTimerRef.current!);
    setSelected(idx);
    const q = questions[currentQ];
    if (!q) return;
    const correct = idx === q.correctIndex;
    if (correct) setMyScore(prev => prev + 1);

    if (!botMode && battleId) {
      submitAnswer(battleId, myUid, currentQ, idx, correct).catch(() => {});
    }

    setTimeout(() => advanceQuestion(currentQ, idx, correct), 1200);
  }, [selected, questions, currentQ, botMode, battleId, myUid]);

  const advanceQuestion = useCallback((qIdx: number, _choiceIdx: number, _correct: boolean) => {
    const nextIdx = qIdx + 1;
    const total = questions.length || 10;

    if (nextIdx >= total) {
      // Fin du quiz
      endBattle();
    } else {
      setCurrentQ(nextIdx);
      startQuestionTimer(nextIdx);
    }
  }, [questions]);

  // ── End battle ─────────────────────────────────────────────────────────────
  const endBattle = useCallback(() => {
    clearInterval(qTimerRef.current!);
    botTimeouts.current.forEach(clearTimeout);

    const myFinalScore = myScore;
    const oppFinalScore = oppScore;

    if (botMode) {
      // Local result
      const win = myFinalScore > oppFinalScore ? myUid
        : oppFinalScore > myFinalScore ? 'bot'
        : null;
      setWinnerId(win);
      setPhase('results');
      return;
    }

    if (battleId) {
      const b = battleRef.current;
      const ids = b?.playerIds ?? [myUid];
      const scores: Record<string, number> = { [myUid]: myFinalScore };
      ids.filter(id => id !== myUid).forEach(id => {
        scores[id] = b?.players[id]?.score ?? oppFinalScore;
      });

      finishPlayerBattle(battleId, myUid, myFinalScore, ids, scores).catch(() => {});

      // Publish result (both clients will try; idempotent enough)
      const win = computeWinner(ids, scores);
      publishBattleResult(battleId, win).catch(() => {});
      setWinnerId(win);
      setPhase('results');
    }
  }, [myScore, oppScore, botMode, battleId, myUid]);

  // ── Opponent name ──────────────────────────────────────────────────────────
  const oppName = botMode
    ? botNameRef.current
    : battle?.playerIds
        .filter(id => id !== myUid)
        .map(id => battle?.players[id]?.displayName ?? '…')[0] ?? '…';

  // ──────────────────────────────────────────────────────────────────────────
  // RENDER
  // ──────────────────────────────────────────────────────────────────────────

  // Header commun
  const Header = ({ title }: { title: string }) => (
    <View style={[s.header, { borderBottomColor: c.borderLight }]}>
      <TouchableOpacity
        onPress={() => {
          if (battleId && phase === 'searching') cancelBattle(battleId);
          router.back();
        }}
        style={s.backBtn}
      >
        <Ionicons name="arrow-back" size={22} color={c.textPrimary} />
      </TouchableOpacity>
      <Text style={[s.headerTitle, { color: c.textPrimary }]}>{title}</Text>
      <View style={{ width: 38 }} />
    </View>
  );

  // ── LOBBY ──────────────────────────────────────────────────────────────────
  if (phase === 'lobby') {
    return (
      <SafeAreaView style={[s.root, { backgroundColor: c.appBg }]}>
        <Header title="⚔️ Battles" />
        <ScrollView contentContainerStyle={s.lobbyBody}>
          <Text style={s.lobbyEmoji}>⚔️</Text>
          <Text style={[s.lobbyTitle, { color: c.textPrimary }]}>{t('battle.lobbyTitle')}</Text>
          <Text style={[s.lobbyDesc, { color: c.textSecondary }]}>{t('battle.lobbyDesc')}</Text>

          <View style={[s.ruleCard, { backgroundColor: c.cardBg, borderColor: c.borderLight }]}>
            {[
              { icon: '🎯', label: t('battle.rule1') },
              { icon: '⏱️', label: t('battle.rule2') },
              { icon: '🏆', label: t('battle.rule3') },
              { icon: '🤖', label: t('battle.rule4') },
            ].map((r, i) => (
              <View key={i} style={s.ruleRow}>
                <Text style={s.ruleIcon}>{r.icon}</Text>
                <Text style={[s.ruleLabel, { color: c.textPrimary }]}>{r.label}</Text>
              </View>
            ))}
          </View>

          <TouchableOpacity
            style={[s.startBtn, { backgroundColor: c.primaryRed }]}
            onPress={startSearch}
            activeOpacity={0.85}
          >
            <Ionicons name="flash" size={20} color="#FFF" />
            <Text style={s.startBtnTxt}>{t('battle.findOpponent')}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[s.botBtn, { borderColor: c.borderLight }]}
            onPress={() => { setBotMode(true); startBotMode(); }}
            activeOpacity={0.8}
          >
            <Ionicons name="hardware-chip-outline" size={18} color={c.textSecondary} />
            <Text style={[s.botBtnTxt, { color: c.textSecondary }]}>{t('battle.playBot')}</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // ── SEARCHING ──────────────────────────────────────────────────────────────
  if (phase === 'searching') {
    return (
      <SafeAreaView style={[s.root, { backgroundColor: c.appBg }]}>
        <Header title={t('battle.searching')} />
        <View style={s.centerBody}>
          <Text style={s.searchEmoji}>🔍</Text>
          <Text style={[s.searchTitle, { color: c.textPrimary }]}>{t('battle.waiting')}</Text>
          <Text style={[s.searchSub, { color: c.textTertiary }]}>{t('battle.elapsed', { n: searchSeconds })}</Text>

          {/* Animated dots */}
          <View style={s.dotsRow}>
            {[0, 1, 2].map(i => (
              <View key={i} style={[s.dot, { backgroundColor: c.primaryRed }]} />
            ))}
          </View>

          {searchSeconds >= SEARCH_TIMEOUT && (
            <TouchableOpacity
              style={[s.startBtn, { backgroundColor: '#5C6BC0', marginTop: 32 }]}
              onPress={() => {
                cancelBattle(battleId ?? '');
                startBotMode();
              }}
            >
              <Ionicons name="hardware-chip-outline" size={18} color="#FFF" />
              <Text style={s.startBtnTxt}>{t('battle.playBot')}</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={[s.cancelBtn, { borderColor: c.borderLight }]}
            onPress={() => {
              if (battleId) cancelBattle(battleId);
              setPhase('lobby');
            }}
          >
            <Text style={[s.cancelTxt, { color: c.textTertiary }]}>{t('battle.cancel')}</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // ── COUNTDOWN ──────────────────────────────────────────────────────────────
  if (phase === 'countdown') {
    return (
      <SafeAreaView style={[s.root, { backgroundColor: c.appBg }]}>
        <View style={s.centerBody}>
          {!botMode && (
            <Text style={[s.countdownSub, { color: c.textSecondary }]}>{t('battle.opponentFound')}{'\n'}{oppName}</Text>
          )}
          <Text style={[s.countdownNum, { color: c.primaryRed }]}>{countdownVal}</Text>
          <Text style={[s.countdownLabel, { color: c.textTertiary }]}>{t('battle.ready')}</Text>
        </View>
      </SafeAreaView>
    );
  }

  // ── PLAYING ──────────────────────────────────────────────────────────────
  if (phase === 'playing') {
    const q = questions[currentQ];
    if (!q) return null;
    const answered = selected !== null;

    return (
      <SafeAreaView style={[s.root, { backgroundColor: c.appBg }]}>
        {/* Header avec timer */}
        <View style={[s.header, { borderBottomColor: c.borderLight }]}>
          <CircleTimer seconds={timeLeft} total={QUESTION_TIME} color={c.primaryRed} />
          <Text style={[s.headerTitle, { color: c.textPrimary }]}>
            {currentQ + 1} / {questions.length}
          </Text>
          <View style={{ width: 56 }} />
        </View>

        {/* Progress bar */}
        <View style={[s.progTrack, { backgroundColor: c.borderLight }]}>
          <View style={[s.progBar, {
            width: `${(currentQ / questions.length) * 100}%` as any,
            backgroundColor: c.primaryRed,
          }]} />
        </View>

        {/* Score live */}
        <ScoreBar
          myScore={myScore} oppScore={oppScore}
          myName={myName} oppName={oppName}
          totalQ={questions.length} colors={c}
        />

        <ScrollView contentContainerStyle={s.quizBody}>
          {/* Caractère */}
          <View style={[s.charCard, { backgroundColor: c.cardBg, borderColor: c.borderLight }]}>
            <Text style={[s.charHanzi, { color: c.textPrimary }]}>{q.hanzi}</Text>
            {answered && (
              <Text style={[s.charPinyin, { color: c.primaryRed }]}>{q.pinyin}</Text>
            )}
          </View>

          <Text style={[s.prompt, { color: c.textSecondary }]}>{t('game.whatMeaning')}</Text>

          {q.choices.map((choice, i) => {
            let bg = c.cardBg;
            let border = c.borderLight;
            let txtCol = c.textPrimary;
            if (answered) {
              if (i === q.correctIndex) { bg = '#4CAF5015'; border = '#4CAF50'; txtCol = '#4CAF50'; }
              else if (i === selected && selected !== q.correctIndex) {
                bg = '#F4433615'; border = '#F44336'; txtCol = '#F44336';
              }
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
                <View style={[s.choiceLetter, { borderColor: border, backgroundColor: border + '30' }]}>
                  <Text style={[s.choiceLetterTxt, { color: border === c.borderLight ? c.textTertiary : border }]}>
                    {String.fromCharCode(65 + i)}
                  </Text>
                </View>
                <Text style={[s.choiceTxt, { color: txtCol }]}>{choice}</Text>
                {answered && i === q.correctIndex && (
                  <Ionicons name="checkmark-circle" size={18} color="#4CAF50" style={{ marginLeft: 'auto' }} />
                )}
                {answered && i === selected && selected !== q.correctIndex && (
                  <Ionicons name="close-circle" size={18} color="#F44336" style={{ marginLeft: 'auto' }} />
                )}
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </SafeAreaView>
    );
  }

  // ── RESULTS ──────────────────────────────────────────────────────────────
  if (phase === 'results') {
    const iWon = winnerId === myUid;
    const isDraw = winnerId === null;
    const oppFinalScore = battle
      ? (battle.playerIds.filter(id => id !== myUid).map(id => battle.players[id]?.score ?? oppScore)[0] ?? oppScore)
      : oppScore;

    return (
      <SafeAreaView style={[s.root, { backgroundColor: c.appBg }]}>
        <Header title={t('battle.results')} />
        <ScrollView contentContainerStyle={s.resultBody}>
          <Text style={s.resultEmoji}>
            {iWon ? '🏆' : isDraw ? '🤝' : '📚'}
          </Text>
          <Text style={[s.resultTitle, { color: c.textPrimary }]}>
            {iWon ? t('battle.win') : isDraw ? t('battle.draw') : t('battle.loss')}
          </Text>
          <Text style={[s.resultSub, { color: c.textSecondary }]}>
            {iWon ? t('battle.winSub') : isDraw ? t('battle.drawSub') : t('battle.lossSub')}
          </Text>

          {/* Score card */}
          <View style={[s.scoreCard, { backgroundColor: c.cardBg, borderColor: c.borderLight }]}>
            <View style={s.scoreCol}>
              <Text style={[s.scoreName, { color: c.textPrimary }]}>{myName}</Text>
              <Text style={[s.scoreNum, { color: iWon ? '#4CAF50' : c.textPrimary }]}>{myScore}</Text>
              <Text style={[s.scoreLabel, { color: c.textTertiary }]}>/ {questions.length}</Text>
            </View>
            <Text style={[s.scoreVs, { color: c.textTertiary }]}>VS</Text>
            <View style={[s.scoreCol, { alignItems: 'flex-end' }]}>
              <Text style={[s.scoreName, { color: c.textPrimary }]}>{oppName}</Text>
              <Text style={[s.scoreNum, { color: !iWon && !isDraw ? '#F44336' : c.textPrimary }]}>
                {oppFinalScore}
              </Text>
              <Text style={[s.scoreLabel, { color: c.textTertiary }]}>/ {questions.length}</Text>
            </View>
          </View>

          {/* Actions */}
          <View style={s.resultActions}>
            <TouchableOpacity
              style={[s.replayBtn, { borderColor: c.primaryRed }]}
              onPress={() => {
                unsubRef.current?.();
                setBattle(null);
                setBattleId(null);
                setBotMode(false);
                setPhase('lobby');
                setMyScore(0);
                setOppScore(0);
                setCurrentQ(0);
                setSelected(null);
                setQuestions([]);
                setWinnerId(undefined);
              }}
            >
              <Ionicons name="refresh" size={16} color={c.primaryRed} />
              <Text style={[s.replayTxt, { color: c.primaryRed }]}>{t('game.replay')}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[s.doneBtn, { backgroundColor: c.primaryRed }]}
              onPress={() => router.back()}
            >
              <Text style={s.doneBtnTxt}>{t('game.quit')}</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return null;
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const s = StyleSheet.create({
  root: { flex: 1 },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 16, paddingVertical: 10, borderBottomWidth: 1,
  },
  backBtn: { width: 38, height: 38, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontSize: 17, fontWeight: '700' },

  centerBody: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 32, gap: 16 },

  // Lobby
  lobbyBody: { padding: 24, alignItems: 'center', gap: 20 },
  lobbyEmoji: { fontSize: 64 },
  lobbyTitle: { fontSize: 24, fontWeight: '800', textAlign: 'center' },
  lobbyDesc: { fontSize: 14, lineHeight: 22, textAlign: 'center' },
  ruleCard: {
    width: '100%', borderRadius: 16, borderWidth: 1, padding: 16, gap: 12,
  },
  ruleRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  ruleIcon: { fontSize: 20, width: 28, textAlign: 'center' },
  ruleLabel: { fontSize: 14 },
  startBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    borderRadius: 16, paddingVertical: 16, paddingHorizontal: 32,
    width: '100%', justifyContent: 'center',
  },
  startBtnTxt: { color: '#FFF', fontSize: 16, fontWeight: '700' },
  botBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    borderRadius: 14, paddingVertical: 13, paddingHorizontal: 24,
    borderWidth: 1.5, justifyContent: 'center', width: '100%',
  },
  botBtnTxt: { fontSize: 14, fontWeight: '600' },

  // Searching
  searchEmoji: { fontSize: 48 },
  searchTitle: { fontSize: 18, fontWeight: '700', textAlign: 'center' },
  searchSub: { fontSize: 14 },
  dotsRow: { flexDirection: 'row', gap: 8, marginTop: 8 },
  dot: { width: 10, height: 10, borderRadius: 5, opacity: 0.6 },
  cancelBtn: {
    marginTop: 16, borderRadius: 12, borderWidth: 1, paddingVertical: 10, paddingHorizontal: 24,
  },
  cancelTxt: { fontSize: 14 },

  // Countdown
  countdownSub: { fontSize: 16, textAlign: 'center', lineHeight: 24 },
  countdownNum: { fontSize: 96, fontWeight: '900' },
  countdownLabel: { fontSize: 18 },

  // Playing
  progTrack: { height: 3 },
  progBar: { height: 3 },
  quizBody: { padding: 16, gap: 12, paddingBottom: 60 },
  charCard: {
    alignItems: 'center', justifyContent: 'center', padding: 28,
    borderRadius: 20, borderWidth: 1.5, gap: 6,
  },
  charHanzi: { fontSize: 52, fontWeight: '400' },
  charPinyin: { fontSize: 18, fontStyle: 'italic' },
  prompt: { fontSize: 14, fontWeight: '600', textAlign: 'center' },
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

  // Results
  resultBody: { padding: 24, gap: 16, alignItems: 'center', paddingBottom: 60 },
  resultEmoji: { fontSize: 72, marginTop: 8 },
  resultTitle: { fontSize: 28, fontWeight: '800' },
  resultSub: { fontSize: 14, lineHeight: 22, textAlign: 'center' },
  scoreCard: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    width: '100%', borderRadius: 18, borderWidth: 1, padding: 20,
  },
  scoreCol: { gap: 4, alignItems: 'flex-start' },
  scoreName: { fontSize: 14, fontWeight: '600' },
  scoreNum: { fontSize: 42, fontWeight: '900', lineHeight: 50 },
  scoreLabel: { fontSize: 12 },
  scoreVs: { fontSize: 16, fontWeight: '700' },
  resultActions: { flexDirection: 'row', gap: 12, width: '100%', marginTop: 8 },
  replayBtn: {
    flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 6, borderRadius: 14, paddingVertical: 13, borderWidth: 1.5,
  },
  replayTxt: { fontSize: 14, fontWeight: '600' },
  doneBtn: {
    flex: 1, alignItems: 'center', justifyContent: 'center', borderRadius: 14, paddingVertical: 13,
  },
  doneBtnTxt: { color: '#FFF', fontSize: 14, fontWeight: '700' },
});
