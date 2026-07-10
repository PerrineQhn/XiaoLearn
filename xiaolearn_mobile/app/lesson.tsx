/**
 * XiaoLearn Mobile — Écran Leçon
 * Flow : Intro → Sections d'apprentissage → Quiz → Terminé
 */
import { useState, useRef, useEffect } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
  ScrollView, Dimensions, Animated, ActivityIndicator, useWindowDimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useColorScheme } from '@/hooks/useColorScheme';
import Colors from '@/constants/Colors';
import { LESSON_CONTENT } from '@/data/cecrLessonContent';
import { LESSON_DATA } from '@/data/cecrLessons';
import { LEARN_SECTIONS, type LearnSection, type TokenRole } from '@/data/cecrLearnSections';
import { EXERCISES, type Exercise } from '@/data/cecrExercises';
import { getAllCards } from '@/hooks/useSrsData';
import { useAudio } from '@/hooks/useAudio';
import { usePronunciation } from '@/hooks/usePronunciation';
import { useUserStats } from '@/hooks/useUserStats';

const SW = Dimensions.get('window').width;

// ─── Pinyin lookup pour le quiz ───────────────────────────────
let _pinyinMap: Map<string, string> | null = null;
function getPinyinMap(): Map<string, string> {
  if (_pinyinMap) return _pinyinMap;
  _pinyinMap = new Map();
  for (const card of getAllCards()) {
    if (card.hanzi && card.pinyin) _pinyinMap.set(card.hanzi, card.pinyin);
  }
  return _pinyinMap;
}
const HANZI_RE = /[一-鿿㐀-䶿]/;
/** Ponctuation intra-phrase à préserver dans le pinyin (mappée en « , »). */
const INTRA_PUNCT_RE = /[，、]/;
function chineseToPinyin(text: string): string {
  const map = getPinyinMap();
  let result = '';
  let i = 0;
  let sawPunct = false;
  while (i < text.length) {
    const ch = text[i];
    // Pinyin fix V29 — mémorise les virgules chinoises intra-phrase pour
    // les restituer en « , » ASCII (rendu naturel « ..., wǒ yào... »).
    if (INTRA_PUNCT_RE.test(ch)) { sawPunct = true; i++; continue; }
    if (!HANZI_RE.test(ch)) { i++; continue; }
    let matched = false;
    for (let len = 4; len >= 1; len--) {
      const sub = text.slice(i, i + len);
      if (map.has(sub)) {
        if (result) result += sawPunct ? ', ' : ' ';
        sawPunct = false;
        result += map.get(sub)!;
        i += len; matched = true; break;
      }
    }
    if (!matched) i++;
  }
  return result.trim();
}
/** Extrait le bloc chinois entre «» ou «» ; sinon retourne le texte brut */
function extractChinese(prompt: string): string {
  const m = prompt.match(/[«「]([^»」]+)[»」]/);
  return m ? m[1] : prompt;
}

// ─── Constantes pédagogiques ──────────────────────────────────
const ROLE_COLOR: Record<TokenRole, string> = {
  sujet: '#3B82F6', verbe: '#EF4444', objet: '#10B981', temps: '#F59E0B',
  lieu: '#8B5CF6', particule: '#6B7280', complement: '#EC4899',
  modificateur: '#14B8A6', copule: '#F97316', connecteur: '#84CC16',
};
const ROLE_LABEL: Record<TokenRole, string> = {
  sujet: 'Sujet', verbe: 'Verbe', objet: 'Objet', temps: 'Temps',
  lieu: 'Lieu', particule: 'Particule', complement: 'Complément',
  modificateur: 'Modificateur', copule: 'Copule', connecteur: 'Connecteur',
};
const TONE_COLOR = ['', '#06B6D4', '#22C55E', '#F59E0B', '#EF4444', '#9CA3AF'];
const TONE_NAME  = ['', 'Ton 1 — plat', 'Ton 2 — montant', 'Ton 3 — courbe', 'Ton 4 — descendant', 'Ton neutre'];
const DIFFICULTY_LABEL: Record<string, string> = {
  beginner: 'Débutant', intermediate: 'Intermédiaire', advanced: 'Avancé',
};
const CATEGORY_META: Record<string, { label: string; icon: string }> = {
  pronunciation: { label: 'Prononciation', icon: '🎵' },
  vocabulary:    { label: 'Vocabulaire',   icon: '📝' },
  grammar:       { label: 'Grammaire',     icon: '⚙️' },
  conversation:  { label: 'Conversation',  icon: '💬' },
  culture:       { label: 'Culture',       icon: '🏮' },
  nuances:       { label: 'Nuances',       icon: '🔬' },
  reading:       { label: 'Lecture',       icon: '📖' },
  writing:       { label: 'Écriture',      icon: '✍️' },
};

// ─── Utilitaires ──────────────────────────────────────────────
/** Rend une phrase inline avec support **bold** */
function InlineText({ text, color, style }: { text: string; color: string; style?: any }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return (
    <Text style={[util.body, { color }, style]}>
      {parts.map((p, i) =>
        p.startsWith('**') && p.endsWith('**')
          ? <Text key={i} style={util.bold}>{p.slice(2, -2)}</Text>
          : p
      )}
    </Text>
  );
}

/**
 * BodyText structuré :
 * Parseur explicite basé sur les marqueurs dans le contenu :
 *  - \n\n sépare les blocs
 *  - lignes commençant par "- " = items de liste
 *  - autres lignes = paragraphe de texte
 */
function BodyText({ text, color, accent }: { text: string; color: string; accent?: string }) {
  const dot = accent ?? '#888';

  // Découpe en blocs sur double saut de ligne
  type Block = { kind: 'para' | 'list'; items: string[]; label?: string };
  const blocks: Block[] = [];
  for (const rawBlock of text.split(/\n\n+/)) {
    const lines = rawBlock.split('\n').map(l => l.trim()).filter(Boolean);
    if (lines.length === 0) continue;
    const listItems = lines.filter(l => l.startsWith('- '));
    const paraLines = lines.filter(l => !l.startsWith('- '));
    if (listItems.length > 0 && paraLines.length > 0) {
      // Bloc mixte : lignes de texte + items de liste → on les sépare
      if (paraLines.length > 0) {
        blocks.push({ kind: 'para', items: [paraLines.join(' ')] });
      }
      blocks.push({ kind: 'list', items: listItems.map(l => l.slice(2)) });
    } else if (listItems.length > 0) {
      blocks.push({ kind: 'list', items: listItems.map(l => l.slice(2)) });
    } else {
      blocks.push({ kind: 'para', items: [paraLines.join(' ')] });
    }
  }

  return (
    <View style={{ gap: 10 }}>
      {blocks.map((b, bi) =>
        b.kind === 'para' ? (
          <View key={bi}>
            {b.items.map((s, i) => (
              <InlineText key={i} text={s} color={color} />
            ))}
          </View>
        ) : (
          <View key={bi} style={[util.listBlock, { borderLeftColor: dot + '55' }]}>
            {b.items.map((s, i) => (
              <View key={i} style={util.listRow}>
                <View style={[util.dot, { backgroundColor: dot }]} />
                <InlineText text={s} color={color} style={{ flex: 1 }} />
              </View>
            ))}
          </View>
        )
      )}
    </View>
  );
}

const util = StyleSheet.create({
  body: { fontSize: 14, lineHeight: 22 },
  bold: { fontWeight: '700' },
  listBlock: {
    borderLeftWidth: 2,
    paddingLeft: 12,
    gap: 6,
  },
  listRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  dot: {
    width: 5, height: 5, borderRadius: 3,
    marginTop: 8, flexShrink: 0,
  },
});

// ─── Barre de progression ─────────────────────────────────────
function ProgressBar({ current, total, color }: { current: number; total: number; color: string }) {
  const pct = total > 0 ? (current / total) * 100 : 0;
  return (
    <View style={prog.track}>
      <View style={[prog.fill, { width: `${pct}%` as any, backgroundColor: color }]} />
    </View>
  );
}
const prog = StyleSheet.create({
  track: { height: 3, backgroundColor: 'rgba(128,128,128,0.14)' },
  fill: { height: 3, borderRadius: 2 },
});

// ─── Contour tonal ────────────────────────────────────────────
function ToneContour({ tone }: { tone: number }) {
  const color = TONE_COLOR[tone] ?? '#9CA3AF';
  const shapes = ['', '▬▬', '↗', '↘↗', '↘', '·'];
  return (
    <View style={[tc.box, { backgroundColor: color + '14', borderColor: color + '40' }]}>
      <Text style={[tc.shape, { color }]}>{shapes[tone]}</Text>
      <Text style={[tc.name, { color }]}>{TONE_NAME[tone]}</Text>
    </View>
  );
}
const tc = StyleSheet.create({
  box: { flexDirection: 'row', alignItems: 'center', gap: 12, borderRadius: 12, borderWidth: 1, padding: 12 },
  shape: { fontSize: 22, fontWeight: '800', letterSpacing: 3, width: 48, textAlign: 'center' },
  name: { fontSize: 13, fontWeight: '600' },
});

// ─── Bouton audio générique ───────────────────────────────────
function AudioBtn({ hanzi, color, onPlay }: { hanzi: string; color: string; onPlay: (h: string) => void }) {
  return (
    <TouchableOpacity onPress={() => onPlay(hanzi)} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }} style={ab.btn}>
      <Ionicons name="volume-medium-outline" size={18} color={color} />
    </TouchableOpacity>
  );
}
const ab = StyleSheet.create({ btn: { padding: 6 } });

// ─── Bouton micro inline par carte ───────────────────────────
function InlinePronBtn({ hanzi, accent, c }: { hanzi: string; accent: string; c: typeof Colors.light }) {
  const { startRecording, stopAndScore, reset, status, result } = usePronunciation();
  const isRec  = status === 'recording';
  const isLoad = status === 'loading';
  const isDone = status === 'done';

  const scoreColor = result
    ? result.pronunciationScore >= 80 ? '#16A34A' : result.pronunciationScore >= 55 ? '#D97706' : '#DC2626'
    : accent;

  return (
    <View style={{ alignItems: 'flex-end', gap: 4 }}>
      <TouchableOpacity
        style={[il.micBtn, {
          backgroundColor: isRec ? '#EF4444' : isDone ? scoreColor : accent + '22',
          borderColor: isRec ? '#EF4444' : isDone ? scoreColor : accent + '55',
        }]}
        onPress={() => {
          if (isDone) { reset(); return; }
          if (isRec) stopAndScore(hanzi);
          else startRecording();
        }}
        disabled={isLoad}
        activeOpacity={0.7}
      >
        {isLoad
          ? <ActivityIndicator size="small" color={accent} style={{ width: 16, height: 16 }} />
          : <Ionicons
              name={isRec ? 'stop-circle' : isDone ? 'refresh' : 'mic-outline'}
              size={14}
              color={isRec || isDone ? '#FFF' : accent}
            />
        }
      </TouchableOpacity>
      {isDone && result && (
        <Text style={[il.micScore, { color: scoreColor }]}>
          {result.pronunciationScore}/100
        </Text>
      )}
    </View>
  );
}

// ─── Liste vocab ──────────────────────────────────────────────
function ItemsList({ items, accent, c, onPlay }: {
  items: NonNullable<LearnSection['items']>; accent: string;
  c: typeof Colors.light; onPlay: (h: string) => void;
}) {
  return (
    <View style={il.wrap}>
      {items.map((item, i) => (
        <View key={i} style={[il.row, { backgroundColor: c.cardBg, borderColor: c.borderLight }]}>
          <TouchableOpacity style={[il.box, { backgroundColor: accent + '12' }]} onPress={() => onPlay(item.hanzi)} activeOpacity={0.7}>
            <Text style={[il.hanzi, { color: accent }]}>{item.hanzi}</Text>
            <Ionicons name="volume-medium-outline" size={11} color={accent + '90'} style={{ marginTop: 2 }} />
          </TouchableOpacity>
          <View style={il.mid}>
            <Text style={[il.pinyin, { color: c.textTertiary }]}>{item.pinyin}</Text>
            <Text style={[il.meaning, { color: c.textPrimary }]}>{item.meaning}</Text>
          </View>
          <View style={{ paddingRight: 10 }}>
            <InlinePronBtn hanzi={item.hanzi} accent={accent} c={c} />
          </View>
        </View>
      ))}
    </View>
  );
}
const il = StyleSheet.create({
  wrap: { gap: 6 },
  row: { flexDirection: 'row', alignItems: 'center', borderRadius: 12, borderWidth: 1, overflow: 'hidden' },
  box: { width: 64, alignItems: 'center', justifyContent: 'center', paddingVertical: 12, gap: 2 },
  hanzi: { fontSize: 22, fontWeight: '700' },
  mid: { flex: 1, paddingHorizontal: 14, paddingVertical: 10 },
  pinyin: { fontSize: 11, marginBottom: 2 },
  meaning: { fontSize: 14, fontWeight: '500' },
  micBtn: { width: 30, height: 30, borderRadius: 15, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
  micScore: { fontSize: 10, fontWeight: '700' },
});

// ─── Paires minimales ─────────────────────────────────────────
function MinimalPairs({ pairs, c, onPlay }: {
  pairs: NonNullable<LearnSection['minimalPairs']>; c: typeof Colors.light;
  onPlay: (h: string) => void;
}) {
  const { width } = useWindowDimensions();
  // 4 paires → grille 2×2, sinon 3 colonnes
  const cols = pairs.length === 4 ? 2 : 3;
  const cardWidth = (width - 40 - 8 * (cols - 1)) / cols;
  return (
    <View style={mp.wrap}>
      <Text style={[mp.label, { color: c.textTertiary }]}>🔊 Paires minimales — touche pour écouter</Text>
      <View style={mp.grid}>
        {pairs.map((p, i) => {
          const col = p.tone ? TONE_COLOR[p.tone] : c.textSecondary;
          return (
            <TouchableOpacity key={i} onPress={() => onPlay(p.hanzi)} activeOpacity={0.7}
              style={[mp.card, { width: cardWidth, backgroundColor: c.cardBg, borderColor: c.borderLight }]}>
              {p.tone ? <Text style={[mp.toneTag, { color: col }]}>T{p.tone}</Text> : null}
              <Text style={[mp.hanzi, { color: c.textPrimary }]}>{p.hanzi}</Text>
              <Text style={[mp.pinyin, { color: c.textSecondary }]}>{p.pinyin}</Text>
              <Text style={[mp.meaning, { color: c.textTertiary }]} numberOfLines={2}>{p.meaning}</Text>
              <Ionicons name="volume-medium-outline" size={12} color={c.textTertiary} style={{ marginTop: 2 }} />
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}
const mp = StyleSheet.create({
  wrap: { gap: 8 },
  label: { fontSize: 12, fontWeight: '600' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  card: { borderRadius: 12, borderWidth: 1, padding: 10, alignItems: 'center', gap: 3 },
  toneTag: { fontSize: 10, fontWeight: '700' },
  hanzi: { fontSize: 20, fontWeight: '700' },
  pinyin: { fontSize: 11 },
  meaning: { fontSize: 10, textAlign: 'center' },
});

// ─── Phrases tokenisées ───────────────────────────────────────
function TokenSentences({ sentences, c }: { sentences: NonNullable<LearnSection['tokenizedSentences']>; c: typeof Colors.light }) {
  const roles = new Set<TokenRole>(sentences.flatMap(s => s.zh.map(t => t.role as TokenRole)));
  return (
    <View style={ts.wrap}>
      <View style={ts.legend}>
        {[...roles].map(r => (
          <View key={r} style={[ts.chip, { backgroundColor: ROLE_COLOR[r] + '20' }]}>
            <View style={[ts.dot, { backgroundColor: ROLE_COLOR[r] }]} />
            <Text style={[ts.chipTxt, { color: ROLE_COLOR[r] }]}>{ROLE_LABEL[r]}</Text>
          </View>
        ))}
      </View>
      {sentences.map((sent, si) => (
        <View key={si} style={[ts.card, { backgroundColor: c.cardBg, borderColor: c.borderLight }]}>
          <View style={ts.tokRow}>
            {sent.zh.map((t, ti) => (
              <View key={ti} style={ts.cell}>
                <Text style={ts.tokPinyin}>{t.pinyin}</Text>
                <View style={[ts.tokChip, { backgroundColor: ROLE_COLOR[t.role as TokenRole] + '16', borderColor: ROLE_COLOR[t.role as TokenRole] + '50' }]}>
                  <Text style={[ts.tokHanzi, { color: ROLE_COLOR[t.role as TokenRole] }]}>{t.text}</Text>
                </View>
              </View>
            ))}
          </View>
          {sent.fr.length > 0 && (
            <View style={ts.frRow}>
              {sent.fr.map((t, ti) => (
                <Text key={ti} style={[ts.frTok, { color: ROLE_COLOR[t.role as TokenRole] }]}>{t.text}{' '}</Text>
              ))}
            </View>
          )}
          {sent.note ? <Text style={[ts.note, { color: c.textTertiary }]}>{sent.note}</Text> : null}
        </View>
      ))}
    </View>
  );
}
const ts = StyleSheet.create({
  wrap: { gap: 10 },
  legend: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  chip: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 8, paddingVertical: 3, borderRadius: 20 },
  dot: { width: 5, height: 5, borderRadius: 3 },
  chipTxt: { fontSize: 11, fontWeight: '600' },
  card: { borderRadius: 14, borderWidth: 1, padding: 14, gap: 10 },
  tokRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  cell: { alignItems: 'center', gap: 3 },
  tokPinyin: { fontSize: 10, color: '#9CA3AF' },
  tokChip: { borderWidth: 1, borderRadius: 8, paddingHorizontal: 8, paddingVertical: 5 },
  tokHanzi: { fontSize: 18, fontWeight: '700' },
  frRow: { flexDirection: 'row', flexWrap: 'wrap' },
  frTok: { fontSize: 14, fontWeight: '600' },
  note: { fontSize: 12, fontStyle: 'italic' },
});

// ─── Bouton prononciation ─────────────────────────────────────
function PronunciationBtn({ referenceText, accent, c }: {
  referenceText: string; accent: string; c: typeof Colors.light;
}) {
  const { startRecording, stopAndScore, reset, status, result } = usePronunciation();
  const isRecording = status === 'recording';
  const isLoading   = status === 'loading';
  const isDone      = status === 'done';

  const scoreColor = result
    ? result.pronunciationScore >= 80 ? '#16A34A' : result.pronunciationScore >= 55 ? '#D97706' : '#DC2626'
    : accent;

  return (
    <View style={pron.wrap}>
      <TouchableOpacity
        style={[pron.btn, {
          backgroundColor: isRecording ? '#EF4444' : isDone ? scoreColor : accent,
          opacity: isLoading ? 0.7 : 1,
        }]}
        onPress={() => {
          if (isDone) { reset(); return; }
          if (isRecording) stopAndScore(referenceText);
          else startRecording();
        }}
        activeOpacity={0.8}
      >
        {isLoading
          ? <ActivityIndicator size="small" color="#FFF" />
          : <Ionicons name={isRecording ? 'stop-circle' : isDone ? 'refresh' : 'mic'} size={16} color="#FFF" />
        }
        <Text style={pron.btnTxt}>
          {isRecording ? 'Arrêter' : isLoading ? 'Analyse…' : isDone ? 'Réessayer' : 'Prononcer'}
        </Text>
      </TouchableOpacity>

      {isDone && result && (
        <View style={[pron.result, { borderColor: scoreColor + '50', backgroundColor: scoreColor + '10' }]}>
          <Text style={[pron.score, { color: scoreColor }]}>{result.pronunciationScore}/100</Text>
          <Text style={[pron.verdict, { color: scoreColor }]}>
            {result.verdict === 'match' ? '✅ Excellent !' : result.verdict === 'close' ? '🟡 Proche' : '❌ À retravailler'}
          </Text>
          {result.recognized ? <Text style={[pron.recognized, { color: c.textTertiary }]}>Reconnu : {result.recognized}</Text> : null}
        </View>
      )}
    </View>
  );
}
const pron = StyleSheet.create({
  wrap: { gap: 8 },
  btn: { flexDirection: 'row', alignItems: 'center', gap: 6, alignSelf: 'flex-start', borderRadius: 20, paddingHorizontal: 14, paddingVertical: 8 },
  btnTxt: { color: '#FFF', fontSize: 13, fontWeight: '600' },
  result: { borderRadius: 12, borderWidth: 1, padding: 12, flexDirection: 'row', alignItems: 'center', gap: 10 },
  score: { fontSize: 22, fontWeight: '800' },
  verdict: { fontSize: 13, fontWeight: '600', flex: 1 },
  recognized: { fontSize: 11 },
});

// ─── Section d'apprentissage ──────────────────────────────────
function SectionView({ sec, accent, c, onPlay }: {
  sec: LearnSection; accent: string; c: typeof Colors.light;
  onPlay: (h: string) => void;
}) {
  // Texte de référence pour la prononciation = premier item ou titre
  const refText = sec.items?.[0]?.hanzi ?? sec.title;

  return (
    <View style={sv.wrap}>
      <Text style={[sv.title, { color: c.textPrimary }]}>{sec.title}</Text>
      {sec.tone ? <ToneContour tone={sec.tone} /> : null}
      {sec.body ? <BodyText text={sec.body} color={c.textSecondary} accent={accent} /> : null}
      {sec.items?.length ? <ItemsList items={sec.items} accent={accent} c={c} onPlay={onPlay} /> : null}
      {sec.minimalPairs?.length ? <MinimalPairs pairs={sec.minimalPairs} c={c} onPlay={onPlay} /> : null}
      {sec.tokenizedSentences?.length ? <TokenSentences sentences={sec.tokenizedSentences} c={c} /> : null}
      {sec.tip ? (
        <View style={[sv.tip, { backgroundColor: accent + '10', borderLeftColor: accent, borderColor: accent + '25' }]}>
          <Text style={sv.tipIcon}>💡</Text>
          <View style={{ flex: 1 }}>
            <BodyText text={sec.tip} color={c.textSecondary} accent={accent} />
          </View>
        </View>
      ) : null}
      {/* Prononciation intégrée dans chaque carte vocab (InlinePronBtn) */}
    </View>
  );
}
const sv = StyleSheet.create({
  wrap: { gap: 16 },
  title: { fontSize: 19, fontWeight: '800', lineHeight: 26 },
  tip: { flexDirection: 'row', gap: 10, borderRadius: 12, borderWidth: 1, borderLeftWidth: 3, padding: 14 },
  tipIcon: { fontSize: 15, marginTop: 1 },
  pronWrap: { borderRadius: 14, borderWidth: 1, padding: 14, gap: 10 },
  pronLabel: { fontSize: 13, fontWeight: '600' },
});

// ─── Exercice : Fill (phrase à trous) ────────────────────────
// placeholder peut être __ (2) ou ___ (3+) selon les données
function FillSentence({ sentence, chosen, c }: { sentence: string; chosen: string | null; c: typeof Colors.light }) {
  const parts = sentence.split(/_{2,}/);  // split sur 2+ underscores
  const before = parts[0] ?? '';
  const after  = parts[1] ?? '';
  return (
    <View style={fill.sentRow}>
      <Text style={[fill.txt, { color: c.textPrimary }]}>
        {before}
        <Text style={[fill.blank, { color: chosen ? accent_placeholder : c.textTertiary, fontWeight: chosen ? '700' : '400' }]}>
          {chosen ?? '_____'}
        </Text>
        {after}
      </Text>
    </View>
  );
}
// couleur accent par défaut pour le placeholder rempli (définie globalement)
const accent_placeholder = '#E05040';
const fill = StyleSheet.create({
  sentRow: { backgroundColor: 'rgba(0,0,0,0.03)', borderRadius: 12, padding: 14 },
  txt: { fontSize: 18, lineHeight: 30 },
  blank: { fontSize: 18, textDecorationLine: 'underline' },
});

// ─── Exercice : Order (remise en ordre) ──────────────────────
function OrderExercise({
  choices, built, onAdd, onRemove, answered, correct, c, accent,
}: {
  choices: string[]; built: string[]; onAdd: (w: string, i: number) => void;
  onRemove: (i: number) => void; answered: boolean; correct: boolean;
  c: typeof Colors.light; accent: string;
}) {
  const available = choices.map((w, i) => ({ w, i, used: built.includes(w) && built.indexOf(w) >= 0 }));
  // Simple: track usage by count
  const usedCount: Record<string, number> = {};
  for (const w of built) usedCount[w] = (usedCount[w] ?? 0) + 1;
  const availWords = choices.filter((w, i) => {
    const cnt = choices.slice(0, i).filter(x => x === w).length;
    return (usedCount[w] ?? 0) <= cnt;
  });

  return (
    <View style={ord.wrap}>
      {/* Zone de construction */}
      <View style={[ord.buildZone, { borderColor: answered ? (correct ? '#22C55E' : '#EF4444') : c.borderMedium, backgroundColor: c.cardBg }]}>
        {built.length === 0
          ? <Text style={[ord.placeholder, { color: c.textTertiary }]}>Touche les mots ci-dessous pour construire la phrase</Text>
          : <View style={ord.builtRow}>
              {built.map((w, i) => (
                <TouchableOpacity key={i} onPress={() => !answered && onRemove(i)} style={[ord.builtChip, { backgroundColor: accent + '20', borderColor: accent + '60' }]}>
                  <Text style={[ord.chipTxt, { color: accent }]}>{w}</Text>
                </TouchableOpacity>
              ))}
            </View>
        }
      </View>
      {/* Pool de mots */}
      <View style={ord.pool}>
        {choices.map((w, i) => {
          const cnt = choices.slice(0, i).filter(x => x === w).length;
          const isUsed = (usedCount[w] ?? 0) > cnt;
          return (
            <TouchableOpacity
              key={i}
              disabled={isUsed || answered}
              onPress={() => onAdd(w, i)}
              style={[ord.poolChip, { backgroundColor: isUsed ? 'transparent' : c.cardBg, borderColor: isUsed ? c.borderLight : c.borderMedium, opacity: isUsed ? 0.3 : 1 }]}
            >
              <Text style={[ord.chipTxt, { color: c.textPrimary }]}>{w}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}
const ord = StyleSheet.create({
  wrap: { gap: 14 },
  buildZone: { minHeight: 54, borderRadius: 12, borderWidth: 1.5, borderStyle: 'dashed', padding: 12, justifyContent: 'center' },
  placeholder: { fontSize: 13, textAlign: 'center' },
  builtRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  builtChip: { borderRadius: 8, borderWidth: 1, paddingHorizontal: 10, paddingVertical: 6 },
  pool: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  poolChip: { borderRadius: 8, borderWidth: 1, paddingHorizontal: 10, paddingVertical: 7 },
  chipTxt: { fontSize: 16, fontWeight: '600' },
});

// ─── Exercice : Dialogue ──────────────────────────────────────
function DialogueBubbles({ turns, c }: { turns: NonNullable<Exercise['dialogue']>; c: typeof Colors.light }) {
  return (
    <View style={dlg.wrap}>
      {turns.map((t, i) => {
        if (t.isUser) return (
          <View key={i} style={dlg.userRow}>
            {t.hanzi ? (
              // Tour utilisateur déjà joué — afficher son contenu
              <View style={[dlg.userBubble, { backgroundColor: '#E5E7EB' }]}>
                <Text style={dlg.hanzi}>{t.hanzi}</Text>
                {t.pinyin ? <Text style={[dlg.pinyin, { color: '#6B7280' }]}>{t.pinyin}</Text> : null}
                {t.translationFr ? <Text style={[dlg.translation, { color: '#6B7280' }]}>{t.translationFr}</Text> : null}
              </View>
            ) : (
              // Tour vide — c'est celui à compléter
              <View style={[dlg.userBubble, { backgroundColor: '#D1D5DB' }]}>
                <Text style={dlg.ghostTxt}>À toi…</Text>
              </View>
            )}
            <View style={[dlg.avatar, { backgroundColor: '#9CA3AF' }]}>
              <Text style={dlg.avatarTxt}>?</Text>
            </View>
          </View>
        );
        return (
          <View key={i} style={dlg.speakerRow}>
            <View style={[dlg.avatar, { backgroundColor: '#F87171' }]}>
              <Text style={dlg.avatarTxt}>{(t.speaker ?? '?')[0]}</Text>
            </View>
            <View style={[dlg.bubble, { backgroundColor: c.cardBg, borderColor: c.borderLight }]}>
              <Text style={[dlg.hanzi, { color: c.textPrimary }]}>{t.hanzi}</Text>
              {t.pinyin ? <Text style={[dlg.pinyin, { color: c.textTertiary }]}>{t.pinyin}</Text> : null}
              {t.translationFr ? <Text style={[dlg.translation, { color: c.textSecondary }]}>{t.translationFr}</Text> : null}
            </View>
          </View>
        );
      })}
    </View>
  );
}
const dlg = StyleSheet.create({
  wrap: { gap: 10 },
  speakerRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 8 },
  userRow: { flexDirection: 'row', alignItems: 'flex-end', gap: 8, justifyContent: 'flex-end' },
  avatar: { width: 32, height: 32, borderRadius: 16, alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  avatarTxt: { color: '#FFF', fontSize: 13, fontWeight: '700' },
  bubble: { flex: 1, borderRadius: 14, borderWidth: 1, padding: 12, gap: 3 },
  userBubble: { borderRadius: 14, paddingHorizontal: 16, paddingVertical: 12 },
  hanzi: { fontSize: 16, fontWeight: '600' },
  pinyin: { fontSize: 11 },
  translation: { fontSize: 12, fontStyle: 'italic' },
  ghostTxt: { fontSize: 14, color: '#9CA3AF', fontStyle: 'italic' },
});

// ─── Écran Exercice ───────────────────────────────────────────
function QuizCard({
  ex, idx, total, accent, c, onAnswer, onPlayHanzi,
}: {
  ex: Exercise; idx: number; total: number;
  accent: string; c: typeof Colors.light;
  onAnswer: (correct: boolean) => void;
  onPlayHanzi: (h: string) => void;
}) {
  const [chosen, setChosen] = useState<number | null>(null);
  const [built, setBuilt] = useState<string[]>([]);
  const [answered, setAnswered] = useState(false);
  const [correct, setCorrect] = useState(false);
  const shake = useRef(new Animated.Value(0)).current;

  // ── Multi-step dialogue support ───────────────────────────────
  // Pour les dialogue-response avec N tours vides → N sous-étapes séquentielles.
  const isDlg = ex.type === 'dialogue-response';
  const emptyTurnIndices: number[] = isDlg && ex.dialogue
    ? ex.dialogue.reduce<number[]>((acc, t, i) => (t.isUser && !t.hanzi ? [...acc, i] : acc), [])
    : [];
  const isMultiStep = emptyTurnIndices.length > 1;
  const [subStep, setSubStep] = useState(0);
  // Textes choisis pour les sous-étapes précédentes (pour les afficher dans le dialogue)
  const [prevChoices, setPrevChoices] = useState<string[]>([]);

  // Choices/correctIndex pour la sous-étape courante
  const currentStepDef = ex.steps?.[subStep];
  const currentChoices = currentStepDef?.choices ?? ex.choices;
  const currentCorrect = currentStepDef?.correctIndex ?? ex.correctIndex;
  const currentExplanation = currentStepDef?.explanation ?? ex.explanation;
  const isLastSubStep = subStep >= emptyTurnIndices.length - 1;

  // Dialogue avec les réponses précédentes injectées et visibilité limitée
  // à l'étape courante (on cache les tours après le tour cible actuel)
  const currentTargetTurnIdx = emptyTurnIndices[subStep] ?? -1;
  const dialogueForRender = isDlg && ex.dialogue
    ? ex.dialogue
        .slice(0, currentTargetTurnIdx + 1)
        .map((t, i) => {
          const stepIdx = emptyTurnIndices.indexOf(i);
          if (stepIdx >= 0 && stepIdx < subStep && prevChoices[stepIdx]) {
            // Tour vide déjà répondu : afficher la réponse choisie
            return { ...t, hanzi: prevChoices[stepIdx], pinyin: '', translationFr: '' };
          }
          return t;
        })
    : ex.dialogue;

  // Auto-play audio when exercise has audioHanzi
  useEffect(() => {
    if (ex.audioHanzi) {
      onPlayHanzi(ex.audioHanzi);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ex.id]);

  function doShake() {
    Animated.sequence([
      Animated.timing(shake, { toValue: 8, duration: 60, useNativeDriver: true }),
      Animated.timing(shake, { toValue: -8, duration: 60, useNativeDriver: true }),
      Animated.timing(shake, { toValue: 6, duration: 60, useNativeDriver: true }),
      Animated.timing(shake, { toValue: 0, duration: 60, useNativeDriver: true }),
    ]).start();
  }

  function validate(chosenIdx: number) {
    if (answered) return;
    const ok = chosenIdx === currentCorrect;
    setChosen(chosenIdx);
    setAnswered(true);
    setCorrect(ok);
    if (!ok) doShake();
  }

  function validateOrder() {
    if (answered) return;
    const answer = built.join('');
    const expected = ex.choices.join('');
    const ok = answer === expected;
    setAnswered(true);
    setCorrect(ok);
    if (!ok) doShake();
    setChosen(ok ? ex.correctIndex : -1);
  }

  function handleNext() {
    if (isMultiStep && !isLastSubStep) {
      // Avancer à la sous-étape suivante
      const chosenText = chosen !== null ? currentChoices[chosen] : '';
      setPrevChoices(p => [...p, chosenText]);
      setSubStep(s => s + 1);
      setChosen(null);
      setAnswered(false);
      setCorrect(false);
    } else {
      onAnswer(correct);
    }
  }

  const isOrder = ex.type === 'order';
  const isFill  = ex.type === 'fill';
  const isCtx   = ex.type === 'context-react';

  // Chip couleur selon réponse
  function chipStyle(i: number) {
    if (!answered) return [qz.choice, { backgroundColor: c.cardBg, borderColor: c.borderMedium }];
    if (i === currentCorrect) return [qz.choice, qz.correct];
    if (i === chosen) return [qz.choice, qz.wrong];
    return [qz.choice, { backgroundColor: c.cardBg, borderColor: c.borderMedium, opacity: 0.5 }];
  }
  function chipTextColor(i: number) {
    if (!answered) return c.textPrimary;
    if (i === currentCorrect) return '#15803D';
    if (i === chosen) return '#B91C1C';
    return c.textTertiary;
  }

  return (
    <Animated.View style={{ transform: [{ translateX: shake }], flex: 1 }}>
      <ScrollView contentContainerStyle={qz.scroll} showsVerticalScrollIndicator={false}>
        {/* Compteur — avec indicateur de sous-étape si multi-step */}
        <Text style={[qz.counter, { color: c.textTertiary }]}>
          {idx + 1} / {total}
          {isMultiStep ? `  ·  Réplique ${subStep + 1}/${emptyTurnIndices.length}` : ''}
        </Text>

        {/* Context / dialogue */}
        {isCtx && ex.context ? (
          <View style={[qz.contextCard, { backgroundColor: accent + '10', borderColor: accent + '30' }]}>
            <Text style={qz.contextIcon}>🎬</Text>
            <Text style={[qz.contextTxt, { color: c.textPrimary }]}>{ex.context}</Text>
          </View>
        ) : null}
        {isDlg && dialogueForRender ? <DialogueBubbles turns={dialogueForRender} c={c} /> : null}

        {/* Bouton rejouer audio (exercices d'écoute) */}
        {ex.audioHanzi ? (
          <TouchableOpacity
            style={[qz.audioBtn, { backgroundColor: accent + '15', borderColor: accent + '40' }]}
            onPress={() => onPlayHanzi(ex.audioHanzi!)}
            activeOpacity={0.75}
          >
            <Ionicons name="volume-high" size={22} color={accent} />
            <Text style={[qz.audioBtnTxt, { color: accent }]}>Réécouter</Text>
          </TouchableOpacity>
        ) : null}

        {/* Prompt */}
        <Text style={[qz.prompt, { color: c.textPrimary }]}>{ex.prompt}</Text>
        {/* Pinyin sous le prompt quand il contient du chinois */}
        {HANZI_RE.test(ex.prompt) && (() => {
          const py = chineseToPinyin(extractChinese(ex.prompt));
          return py ? <Text style={[qz.promptPinyin, { color: c.textTertiary }]}>{py}</Text> : null;
        })()}

        {/* Phrase à trous */}
        {isFill && ex.sentence ? (
          <FillSentence sentence={ex.sentence} chosen={chosen !== null ? ex.choices[chosen] : null} c={c} />
        ) : null}
        {isFill && ex.sentenceFr ? (
          <Text style={[qz.sentenceFr, { color: c.textTertiary }]}>{ex.sentenceFr}</Text>
        ) : null}

        {/* Remise en ordre */}
        {isOrder ? (
          <OrderExercise
            choices={ex.choices} built={built}
            onAdd={w => setBuilt(b => [...b, w])}
            onRemove={i => setBuilt(b => b.filter((_, j) => j !== i))}
            answered={answered} correct={correct} c={c} accent={accent}
          />
        ) : (
          /* Choix classiques (currentChoices = choices de la sous-étape en cours) */
          <View style={qz.choices}>
            {currentChoices.map((ch, i) => (
              <TouchableOpacity key={i} style={chipStyle(i)} onPress={() => validate(i)} disabled={answered} activeOpacity={0.8}>
                <View style={[qz.choiceIndex, { backgroundColor: answered && i === currentCorrect ? '#15803D' : answered && i === chosen ? '#B91C1C' : c.borderMedium }]}>
                  <Text style={[qz.choiceIndexTxt, { color: answered && (i === currentCorrect || i === chosen) ? '#FFF' : c.textSecondary }]}>
                    {String.fromCharCode(65 + i)}
                  </Text>
                </View>
                <Text style={[qz.choiceTxt, { color: chipTextColor(i), flex: 1 }]}>{ch}</Text>
                {answered && i === currentCorrect ? <Ionicons name="checkmark-circle" size={18} color="#16A34A" /> : null}
                {answered && i === chosen && i !== currentCorrect ? <Ionicons name="close-circle" size={18} color="#DC2626" /> : null}
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Validation order */}
        {isOrder && !answered ? (
          <TouchableOpacity
            style={[qz.validateBtn, { backgroundColor: built.length === ex.choices.length ? accent : c.borderMedium }]}
            disabled={built.length < ex.choices.length}
            onPress={validateOrder}
          >
            <Text style={qz.validateTxt}>Valider</Text>
          </TouchableOpacity>
        ) : null}

        {/* Feedback */}
        {answered ? (
          <View style={[qz.feedback, { backgroundColor: correct ? '#F0FDF4' : '#FEF2F2', borderColor: correct ? '#86EFAC' : '#FECACA' }]}>
            <Text style={[qz.feedbackTitle, { color: correct ? '#15803D' : '#B91C1C' }]}>
              {correct ? '✅ Correct !' : '❌ Pas tout à fait'}
            </Text>
            {!correct ? (
              <Text style={[qz.feedbackCorrect, { color: '#15803D' }]}>
                Réponse : <Text style={{ fontWeight: '700' }}>{currentChoices[currentCorrect]}</Text>
              </Text>
            ) : null}
            {currentExplanation ? <Text style={qz.feedbackExpl}>{currentExplanation}</Text> : null}
          </View>
        ) : null}
      </ScrollView>

      {/* CTA */}
      {answered ? (
        <View style={[qz.footer, { borderTopColor: c.borderLight, backgroundColor: c.appBg }]}>
          <TouchableOpacity style={[qz.ctaBtn, { backgroundColor: accent }]} onPress={handleNext}>
            <Text style={qz.ctaTxt}>
              {isMultiStep && !isLastSubStep ? 'Réplique suivante' : 'Question suivante'}
            </Text>
            <Ionicons name="arrow-forward" size={18} color="#FFF" />
          </TouchableOpacity>
        </View>
      ) : null}
    </Animated.View>
  );
}
const qz = StyleSheet.create({
  scroll: { padding: 20, gap: 14, paddingBottom: 24 },
  counter: { fontSize: 12, fontWeight: '600', textAlign: 'right' },
  contextCard: { flexDirection: 'row', alignItems: 'flex-start', gap: 10, borderRadius: 14, borderWidth: 1, padding: 14 },
  contextIcon: { fontSize: 20 },
  contextTxt: { flex: 1, fontSize: 14, lineHeight: 21 },
  audioBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, borderRadius: 14, borderWidth: 1.5, paddingVertical: 12, paddingHorizontal: 20, alignSelf: 'center' },
  audioBtnTxt: { fontSize: 15, fontWeight: '700' },
  prompt: { fontSize: 16, fontWeight: '700', lineHeight: 24 },
  promptPinyin: { fontSize: 13, marginTop: 4 },
  sentenceFr: { fontSize: 13, fontStyle: 'italic' },
  choices: { gap: 8 },
  choice: { flexDirection: 'row', alignItems: 'center', gap: 10, borderRadius: 12, borderWidth: 1.5, padding: 12 },
  correct: { backgroundColor: '#F0FDF4', borderColor: '#86EFAC' },
  wrong:   { backgroundColor: '#FEF2F2', borderColor: '#FECACA' },
  choiceIndex: { width: 24, height: 24, borderRadius: 12, alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  choiceIndexTxt: { fontSize: 12, fontWeight: '700' },
  choiceTxt: { fontSize: 15, lineHeight: 22 },
  validateBtn: { borderRadius: 12, paddingVertical: 13, alignItems: 'center', marginTop: 4 },
  validateTxt: { color: '#FFF', fontSize: 15, fontWeight: '700' },
  feedback: { borderRadius: 14, borderWidth: 1, padding: 14, gap: 6 },
  feedbackTitle: { fontSize: 15, fontWeight: '800' },
  feedbackCorrect: { fontSize: 13 },
  feedbackExpl: { fontSize: 13, color: '#374151', lineHeight: 20 },
  footer: { paddingHorizontal: 20, paddingVertical: 14, borderTopWidth: 1 },
  ctaBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, borderRadius: 16, paddingVertical: 15 },
  ctaTxt: { color: '#FFF', fontSize: 16, fontWeight: '700' },
});

// ─── Screen principal ─────────────────────────────────────────
export default function LessonScreen() {
  const router = useRouter();
  const { id: lessonId = '', moduleId = '', accent = '#E05040' } =
    useLocalSearchParams<{ id: string; moduleId: string; accent: string }>();

  const scheme = useColorScheme();
  const c = Colors[scheme];
  const { playHanzi, playing: audioPlaying } = useAudio();
  const { addXp, markLessonComplete } = useUserStats();
  const content  = LESSON_CONTENT[lessonId];
  const sections = LEARN_SECTIONS[lessonId] ?? [];
  const exercises = EXERCISES[lessonId] ?? [];
  const siblings = LESSON_DATA[moduleId] ?? [];
  const sibIdx   = siblings.findIndex(l => l.id === lessonId);
  const nextLesson = sibIdx < siblings.length - 1 ? siblings[sibIdx + 1] : null;

  // Steps: 0=intro, 1..n=sections, n+1..n+m=exercises, last=done
  const nSections  = sections.length;
  const nExercises = exercises.length;
  const totalSteps = 1 + nSections + nExercises + 1;

  const [stepIdx, setStepIdx] = useState(0);
  const [score, setScore] = useState({ correct: 0, total: 0 });

  const isIntro    = stepIdx === 0;
  const isDone     = stepIdx === totalSteps - 1;
  const secIdx     = stepIdx - 1;                       // 0-based in sections
  const exIdx      = stepIdx - 1 - nSections;           // 0-based in exercises
  const isSection  = !isIntro && !isDone && secIdx < nSections;
  const isExercise = !isIntro && !isDone && !isSection;

  function goNext() { setStepIdx(s => Math.min(s + 1, totalSteps - 1)); }
  function goBack() {
    if (stepIdx === 0) router.back();
    else setStepIdx(s => s - 1);
  }

  async function finish(extraCorrect = 0) {
    // XP : 50 pts de base + 10 pts par bonne réponse aux exercices
    const xpEarned = 50 + (score.correct + extraCorrect) * 10;
    await Promise.all([
      markLessonComplete(lessonId),
      addXp(xpEarned),
    ]);
    setStepIdx(totalSteps - 1);
  }

  function handleAnswer(correct: boolean) {
    const addCorrect = correct ? 1 : 0;
    setScore(s => ({ correct: s.correct + addCorrect, total: s.total + 1 }));
    // Si c'est le dernier exercice, déclencher finish() avec le score à jour
    if (exIdx === nExercises - 1) {
      finish(addCorrect);
    } else {
      goNext();
    }
  }

  if (!content) {
    return (
      <SafeAreaView style={[root.s, { backgroundColor: c.appBg }]}>
        <TouchableOpacity style={{ padding: 20 }} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={c.textPrimary} />
        </TouchableOpacity>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ color: c.textSecondary }}>Leçon introuvable</Text>
        </View>
      </SafeAreaView>
    );
  }

  const cat = CATEGORY_META[content.category] ?? { label: content.category, icon: '📚' };

  // Libellé de phase pour le header
  function phaseLabel() {
    if (isIntro)    return `${cat.icon} ${cat.label}`;
    if (isSection)  return `Section ${secIdx + 1} / ${nSections}`;
    if (isExercise) return `Quiz · ${exIdx + 1} / ${nExercises}`;
    return 'Terminé';
  }

  // ── TERMINÉ ──────────────────────────────────────────────────
  if (isDone) {
    const pct = score.total > 0 ? Math.round((score.correct / score.total) * 100) : null;
    const scoreColor = pct === null ? accent : pct >= 80 ? '#16A34A' : pct >= 50 ? '#D97706' : '#DC2626';
    return (
      <SafeAreaView style={[root.s, { backgroundColor: c.appBg }]}>
        <ProgressBar current={totalSteps} total={totalSteps} color={accent} />
        <ScrollView contentContainerStyle={done.scroll}>
          <View style={done.circle}>
            <Text style={done.emoji}>🎉</Text>
          </View>
          <Text style={[done.title, { color: c.textPrimary }]}>Leçon terminée !</Text>
          <Text style={[done.sub, { color: c.textSecondary }]}>{content.title}</Text>

          {pct !== null && (
            <View style={[done.scoreCard, { backgroundColor: scoreColor + '12', borderColor: scoreColor + '40' }]}>
              <Text style={[done.scoreNum, { color: scoreColor }]}>{pct}%</Text>
              <Text style={[done.scoreLbl, { color: scoreColor }]}>
                {pct === 100 ? 'Parfait !' : pct >= 80 ? 'Excellent !' : pct >= 50 ? 'Bien !' : 'Continue !'}
              </Text>
              <Text style={[done.scoreSub, { color: c.textTertiary }]}>{score.correct}/{score.total} bonnes réponses</Text>
            </View>
          )}

          {content.objectives.length > 0 && (
            <View style={[done.card, { backgroundColor: c.cardBg, borderColor: c.borderLight }]}>
              <Text style={[done.cardTitle, { color: c.textPrimary }]}>✅ Tu as appris</Text>
              {content.objectives.slice(0, 3).map((o, i) => (
                <View key={i} style={done.objRow}>
                  <Ionicons name="checkmark-circle" size={15} color={accent} style={{ marginTop: 2 }} />
                  <Text style={[done.objTxt, { color: c.textSecondary }]}>{o}</Text>
                </View>
              ))}
            </View>
          )}

          {nextLesson ? (
            <TouchableOpacity
              style={[done.cta, { backgroundColor: accent }]}
              onPress={() => router.replace({ pathname: '/lesson', params: { id: nextLesson.id, moduleId, accent } })}
            >
              <Text style={done.ctaTxt}>Leçon suivante</Text>
              <Ionicons name="arrow-forward" size={18} color="#FFF" />
            </TouchableOpacity>
          ) : null}
          <TouchableOpacity style={[done.outline, { borderColor: accent }]} onPress={() => router.canGoBack() ? router.back() : router.replace('/cours')}>
            <Text style={[done.outlineTxt, { color: accent }]}>Retour aux cours</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // ── EXERCICE ─────────────────────────────────────────────────
  if (isExercise) {
    const ex = exercises[exIdx];
    return (
      <SafeAreaView style={[root.s, { backgroundColor: c.appBg }]}>
        <ProgressBar current={stepIdx} total={totalSteps} color={accent} />
        {/* Header */}
        <View style={[hdr.row, { borderBottomColor: c.borderLight }]}>
          <TouchableOpacity onPress={goBack} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
            <Ionicons name="arrow-back" size={22} color={c.textPrimary} />
          </TouchableOpacity>
          <View style={[hdr.quizBadge, { backgroundColor: accent + '18' }]}>
            <Ionicons name="bulb-outline" size={13} color={accent} />
            <Text style={[hdr.quizTxt, { color: accent }]}>Quiz</Text>
          </View>
          <View style={{ flex: 1 }} />
          <Text style={[hdr.step, { color: c.textTertiary }]}>{exIdx + 1}/{nExercises}</Text>
        </View>
        <QuizCard
          key={ex.id}
          ex={ex} idx={exIdx} total={nExercises}
          accent={accent} c={c} onAnswer={handleAnswer}
          onPlayHanzi={playHanzi}
        />
      </SafeAreaView>
    );
  }

  // ── INTRO / SECTIONS ─────────────────────────────────────────
  return (
    <SafeAreaView style={[root.s, { backgroundColor: c.appBg }]}>
      <ProgressBar current={stepIdx} total={totalSteps} color={accent} />

      {/* Header */}
      <View style={[hdr.row, { borderBottomColor: c.borderLight }]}>
        <TouchableOpacity onPress={goBack} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
          <Ionicons name="arrow-back" size={22} color={c.textPrimary} />
        </TouchableOpacity>
        <Text style={[hdr.phase, { color: isIntro ? accent : c.textSecondary }]} numberOfLines={1}>
          {phaseLabel()}
        </Text>
        {isIntro ? (
          <View style={[hdr.timeBadge, { backgroundColor: accent + '18' }]}>
            <Ionicons name="time-outline" size={12} color={accent} />
            <Text style={[hdr.timeTxt, { color: accent }]}>{content.duration} min</Text>
          </View>
        ) : (
          <Text style={[hdr.step, { color: c.textTertiary }]}>{stepIdx + 1}/{totalSteps}</Text>
        )}
      </View>

      <ScrollView contentContainerStyle={sc.content} showsVerticalScrollIndicator={false}>
        {isIntro ? (
          <View style={{ gap: 14 }}>
            {/* Hero */}
            <View style={[intro.hero, { backgroundColor: accent + '10', borderColor: accent + '28' }]}>
              <Text style={[intro.title, { color: c.textPrimary }]}>{content.title}</Text>
              <View style={intro.chips}>
                <View style={[intro.chip, { backgroundColor: accent + '22' }]}>
                  <Text style={[intro.chipTxt, { color: accent }]}>{DIFFICULTY_LABEL[content.difficulty] ?? content.difficulty}</Text>
                </View>
                {nSections > 0 && (
                  <View style={[intro.chip, { backgroundColor: c.cardBg, borderWidth: 1, borderColor: c.borderMedium }]}>
                    <Text style={[intro.chipTxt, { color: c.textSecondary }]}>📚 {nSections} sections</Text>
                  </View>
                )}
                {nExercises > 0 && (
                  <View style={[intro.chip, { backgroundColor: c.cardBg, borderWidth: 1, borderColor: c.borderMedium }]}>
                    <Text style={[intro.chipTxt, { color: c.textSecondary }]}>✏️ {nExercises} exercices</Text>
                  </View>
                )}
              </View>
            </View>

            {/* Intro */}
            {(content.introTitle || content.introContent) && (
              <View style={[card.box, { backgroundColor: c.cardBg, borderColor: c.borderLight, borderLeftWidth: 4, borderLeftColor: accent }]}>
                {content.introTitle ? (
                  <Text style={[card.title, { color: c.textPrimary }]}>💡 {content.introTitle}</Text>
                ) : null}
                {content.introContent ? (
                  <BodyText text={content.introContent} color={c.textSecondary} accent={accent} />
                ) : null}
              </View>
            )}

            {/* Objectifs */}
            {content.objectives.length > 0 && (
              <View style={[card.box, { backgroundColor: c.cardBg, borderColor: c.borderLight }]}>
                <Text style={[card.title, { color: c.textPrimary }]}>🎯 Objectifs</Text>
                {content.objectives.map((o, i) => (
                  <View key={i} style={obj.row}>
                    <View style={[obj.num, { backgroundColor: accent }]}>
                      <Text style={obj.numTxt}>{i + 1}</Text>
                    </View>
                    <Text style={[obj.txt, { color: c.textPrimary }]}>{o}</Text>
                  </View>
                ))}
              </View>
            )}

            {/* Au programme */}
            {(nSections > 0 || nExercises > 0) && (
              <View style={[card.box, { backgroundColor: c.cardBg, borderColor: c.borderLight }]}>
                <Text style={[card.title, { color: c.textPrimary }]}>📋 Au programme</Text>
                {sections.map((sec, i) => (
                  <View key={`s${i}`} style={prog2.row}>
                    <View style={[prog2.dot, { backgroundColor: accent }]} />
                    <Text style={[prog2.txt, { color: c.textSecondary }]}>{sec.title}</Text>
                  </View>
                ))}
                {nExercises > 0 && (
                  <View style={prog2.row}>
                    <View style={[prog2.dot, { backgroundColor: '#8B5CF6' }]} />
                    <Text style={[prog2.txt, { color: c.textSecondary }]}>{nExercises} exercices interactifs</Text>
                  </View>
                )}
              </View>
            )}
          </View>
        ) : isSection ? (
          <SectionView sec={sections[secIdx]} accent={accent} c={c} onPlay={playHanzi} />
        ) : null}
      </ScrollView>

      {/* Footer */}
      <View style={[footer.wrap, { borderTopColor: c.borderLight, backgroundColor: c.appBg }]}>
        {stepIdx < totalSteps - 2 ? (
          <TouchableOpacity style={[footer.cta, { backgroundColor: accent }]} onPress={goNext}>
            <Text style={footer.ctaTxt}>
              {isIntro
                ? nSections > 0 ? 'Commencer' : nExercises > 0 ? 'Passer au quiz' : 'Terminer'
                : secIdx + 1 < nSections ? 'Section suivante'
                : nExercises > 0 ? 'Passer au quiz' : 'Terminer'}
            </Text>
            <Ionicons name="arrow-forward" size={18} color="#FFF" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={[footer.cta, { backgroundColor: accent }]} onPress={finish}>
            <Text style={footer.ctaTxt}>Terminer la leçon</Text>
            <Ionicons name="checkmark" size={18} color="#FFF" />
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}

// ─── Styles globaux ───────────────────────────────────────────
const root   = StyleSheet.create({ s: { flex: 1 } });
const sc     = StyleSheet.create({ content: { padding: 20, paddingBottom: 36, gap: 0 } });

const hdr = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1, gap: 10 },
  phase: { flex: 1, fontSize: 13, fontWeight: '600' },
  step: { fontSize: 13 },
  timeBadge: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 9, paddingVertical: 4, borderRadius: 20 },
  timeTxt: { fontSize: 12, fontWeight: '600' },
  quizBadge: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 9, paddingVertical: 4, borderRadius: 20 },
  quizTxt: { fontSize: 12, fontWeight: '600' },
});

const card = StyleSheet.create({
  box: { borderRadius: 16, borderWidth: 1, padding: 16, gap: 10, marginBottom: 14 },
  title: { fontSize: 15, fontWeight: '700' },
});

const intro = StyleSheet.create({
  hero: { borderRadius: 20, borderWidth: 1.5, padding: 20, gap: 12, marginBottom: 0 },
  title: { fontSize: 22, fontWeight: '800', lineHeight: 30 },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: { paddingHorizontal: 10, paddingVertical: 5, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  chipTxt: { fontSize: 12, fontWeight: '600', lineHeight: 16, includeFontPadding: false },
});

const obj = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'flex-start', gap: 10 },
  num: { width: 24, height: 24, borderRadius: 12, alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 },
  numTxt: { color: '#FFF', fontSize: 12, fontWeight: '700' },
  txt: { flex: 1, fontSize: 14, lineHeight: 22 },
});

const prog2 = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'flex-start', gap: 10 },
  dot: { width: 7, height: 7, borderRadius: 4, marginTop: 7, flexShrink: 0 },
  txt: { flex: 1, fontSize: 13, lineHeight: 20 },
});

const footer = StyleSheet.create({
  wrap: { paddingHorizontal: 20, paddingVertical: 14, borderTopWidth: 1 },
  cta: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
    borderRadius: 16, paddingVertical: 16,
    shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 8, shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  ctaTxt: { color: '#FFF', fontSize: 16, fontWeight: '700' },
});

const done = StyleSheet.create({
  scroll: { alignItems: 'center', padding: 28, gap: 14, paddingBottom: 48 },
  circle: { width: 96, height: 96, borderRadius: 48, backgroundColor: 'rgba(0,0,0,0.05)', alignItems: 'center', justifyContent: 'center' },
  emoji: { fontSize: 44 },
  title: { fontSize: 26, fontWeight: '800' },
  sub: { fontSize: 14, textAlign: 'center' },
  scoreCard: { borderRadius: 20, borderWidth: 1.5, padding: 20, alignItems: 'center', gap: 4, width: '100%' },
  scoreNum: { fontSize: 48, fontWeight: '900' },
  scoreLbl: { fontSize: 16, fontWeight: '700' },
  scoreSub: { fontSize: 13 },
  card: { width: '100%', borderRadius: 16, borderWidth: 1, padding: 16, gap: 8 },
  cardTitle: { fontSize: 14, fontWeight: '700' },
  objRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 8 },
  objTxt: { flex: 1, fontSize: 13, lineHeight: 20 },
  cta: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
    width: '100%', borderRadius: 16, paddingVertical: 16, marginTop: 4,
  },
  ctaTxt: { color: '#FFF', fontSize: 16, fontWeight: '700' },
  outline: { borderWidth: 1.5, borderRadius: 16, paddingVertical: 14, alignItems: 'center', width: '100%' },
  outlineTxt: { fontSize: 15, fontWeight: '600' },
});
