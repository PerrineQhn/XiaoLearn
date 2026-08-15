/**
 * XiaoLearn Mobile — Grammaire
 */
import { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useColorScheme } from '@/hooks/useColorScheme';
import Colors from '@/constants/Colors';
import {
  GRAMMAR_SHEETS, GRAMMAR_FAMILIES, familyOf, type GrammarSheet,
} from '@/data/grammarLessons';
import { useAudio } from '@/hooks/useAudio';
import ToneColoredHanzi from '@/components/ToneColoredHanzi';
import { useDisplaySettings } from '@/contexts/DisplaySettingsContext';
import { useI18n } from '@/contexts/LanguageContext';
import { useLayout } from '@/hooks/useLayout';
import { FilterChipRow } from '@/components/FilterChipRow';
import { focusFor } from '@/utils/grammarFocus';
import { autoPinyin } from '@/utils/autoPinyin';

// ── Données — aligné sur GrammarPageV3 web ─────────────────────
// Les 84 fiches HSK sont présentées sous des étiquettes CECR via le même
// mapping que le web : hsk1→A1, hsk2→A2, hsk3→B1, hsk4→B2, hsk5→C1, hsk6/7→C2.
export const HSK_TO_CECR: Record<string, string> = {
  hsk1: 'A1', hsk2: 'A2', hsk3: 'B1', hsk4: 'B2', hsk5: 'C1', hsk6: 'C2', hsk7: 'C2',
};

const BY_LEVEL: Record<string, GrammarSheet[]> = {};
for (const sheet of GRAMMAR_SHEETS) {
  const slot = HSK_TO_CECR[sheet.level] ?? 'A1';
  (BY_LEVEL[slot] ??= []).push(sheet);
}
const LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'].filter(l => BY_LEVEL[l]?.length);

export const LEVEL_COLORS: Record<string, string> = {
  A1: '#4CAF50', A2: '#F9A825', B1: '#03A9F4', B2: '#9C27B0', C1: '#3F51B5', C2: '#E91E63',
};

// ── Rendu du texte avec **gras** ───────────────────────────────
export function RichText({ text, style, boldColor }: { text: string; style?: object; boldColor: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return (
    <Text style={style}>
      {parts.map((p, i) =>
        p.startsWith('**') && p.endsWith('**')
          ? <Text key={i} style={{ fontWeight: '700', color: boldColor }}>{p.slice(2, -2)}</Text>
          : p
      )}
    </Text>
  );
}

// ── Carte accordéon ────────────────────────────────────────────
// ── Fiche grammaire HSK (accordéon) ────────────────────────────

/**
 * Rendu du corps d'une section de fiche.
 *
 * Les fiches stockent leur contenu en texte brut, avec une mise en forme
 * conventionnelle très régulière : « Structure : … », des puces « • », des
 * en-têtes « ❌ » ou « 💡 », et surtout des exemples de la forme
 * « 天气逐渐变冷 (tiānqì zhújiàn biàn lěng) = Le temps devient peu à peu froid ».
 *
 * Affiché tel quel, tout se vaut : le chinois se perd au milieu du français,
 * et rien ne s'écoute. On reconnaît donc ces formes pour leur donner le
 * rendu qu'elles méritent — l'exemple devient une carte cliquable qui se
 * prononce, la formule un encadré, la puce une vraie puce.
 */
type Bloc =
  | { kind: 'text'; text: string }
  | { kind: 'bullet'; text: string }
  | { kind: 'formula'; text: string }
  | { kind: 'head'; text: string; bad: boolean }
  | { kind: 'step'; num: string; text: string }
  | { kind: 'example'; hanzi: string; pinyin?: string; fr: string; label?: string };

/** Un exemple : du chinois, éventuellement son pinyin, puis « = » et le sens. */
const EXAMPLE_RE = /^([^=]*[\u4e00-\u9fff][^=]*?)\s*(?:[（(]([^)）]*)[)）])?\s*=\s*(.+)$/;

/**
 * Beaucoup d'exemples sont annoncés par une étiquette en français :
 * « Une personne qui ressent : 他的话把我气坏了 = Ses paroles m'ont fâchée ».
 * Sans traitement, l'étiquette entrait dans la carte et s'affichait en gros à
 * la place du chinois. On la sépare : elle coiffe la carte, en petit.
 */
function splitLabel(left: string): { label?: string; hanzi: string } {
  // Trois façons d'annoncer un exemple : « Label : 中文 », « Label → 中文 »,
  // « Label — 中文 ». La dernière marque rencontrée fait foi.
  let at = -1, taille = 0;
  for (const sep of [' : ', '\uff1a', ' \u2192 ', ' \u2014 ', ' -> ']) {
    const k = left.lastIndexOf(sep);
    if (k > at) { at = k; taille = sep.length; }
  }
  if (at < 0) return { hanzi: left };
  const label = left.slice(0, at).trim();
  const rest = left.slice(at + taille).trim();
  if (!/[\u4e00-\u9fff]/.test(rest)) return { hanzi: left };
  // On ne coupe que si le chinois est bien APRÈS le séparateur : une phrase
  // chinoise qui contient elle-même un deux-points reste entière.
  const zhAvant = (label.match(/[\u4e00-\u9fff]/g) ?? []).length;
  const zhApres = (rest.match(/[\u4e00-\u9fff]/g) ?? []).length;
  if (zhAvant >= zhApres) return { hanzi: left };
  return { label, hanzi: rest };
}

/**
 * Une carte d'exemple n'a de sens que si sa partie gauche est réellement une
 * phrase chinoise. « Sujet + 不要 + Objet » ou « Ajouter (avec 还/也) » sont
 * des explications qui CITENT du chinois : les afficher en gros dans une
 * carte, avec un bouton de prononciation, n'aurait aucun sens.
 */
function estVraiExemple(hanzi: string): boolean {
  const zh = (hanzi.match(/[\u4e00-\u9fff]/g) ?? []).length;
  if (zh < 2) return false;
  const latin = (hanzi.match(/[A-Za-zÀ-ÿ]/g) ?? []).length;
  return latin <= zh;
}

export function parseSheetBody(text: string): Bloc[] {
  const out: Bloc[] = [];
  for (const raw of text.split('\n')) {
    const line = raw.trim();
    if (!line) continue;

    const bullet = line.startsWith('•');
    // Un « → » ou un tiret en tête n'appartient pas à la phrase : c'est une
    // marque de continuation. Laissé en place, il entrait dans la carte
    // d'exemple et se retrouvait lu comme du chinois.
    const body = (bullet ? line.slice(1) : line)
      .replace(/^[→\u2192\-–—]\s*/, '')
      .trim();

    // En-tête de sous-partie : ❌ (un piège) ou 💡 (une astuce).
    // Alternation et non classe de caractères : 💡 vit hors du plan de base
    // (paire de substitution), et une classe le coupait en deux — l'en-tête
    // s'affichait alors avec un demi-caractère en tête.
    const m0 = body.match(/^(❌|💡|✅|⚠️|🔸|🎯|📌)\s*(.+)$/u);
    if (m0 && !bullet) {
      out.push({ kind: 'head', text: m0[2], bad: m0[1] === '❌' || m0[1] === '⚠️' });
      continue;
    }

    // Une étape numérotée ouvre une sous-partie : ①②③ ou « 1. ». Rendue
    // comme du texte courant, elle se noyait dans les explications qui la
    // suivent — alors qu'elle annonce précisément leur découpage.
    const mS = body.match(/^([①②③④⑤⑥⑦⑧⑨]|[1-9][.)])\s*(.+)$/u);
    if (mS && !bullet) {
      out.push({
        kind: 'step',
        num: '①②③④⑤⑥⑦⑧⑨'.includes(mS[1]) ? String('①②③④⑤⑥⑦⑧⑨'.indexOf(mS[1]) + 1) : mS[1][0],
        text: mS[2].replace(/\*\*/g, ''),
      });
      continue;
    }

    // La formule de construction : c'est l'information la plus dense de la
    // fiche, elle ne doit pas se lire comme une phrase parmi d'autres.
    const m1 = body.match(/^(?:Structure|Structure de la phrase|Formule)\s*[:：]\s*(.+)$/i);
    if (m1) { out.push({ kind: 'formula', text: m1[1].replace(/\*\*/g, '') }); continue; }

    const m2 = body.match(EXAMPLE_RE);
    if (m2 && /[\u4e00-\u9fff]/.test(m2[1])) {
      // Les marqueurs de gras n'ont rien à faire dans la phrase : ils
      // entraient dans la carte et se lisaient comme des caractères.
      const { label, hanzi } = splitLabel(m2[1].replace(/\*\*/g, '').trim());
      // La partie droite doit ressembler à une traduction. Sans cette garde,
      // « 一加一等于二 (1+1=2) » se coupait sur le « = » de l'addition et
      // donnait une carte « 一加一等于二 (1+1 » traduite « 2) ».
      const traduit = (m2[3].match(/[A-Za-zÀ-ÿ]/g) ?? []).length >= 2;
      if (estVraiExemple(hanzi) && traduit) {
        out.push({ kind: 'example', hanzi, pinyin: m2[2]?.trim(), fr: m2[3].trim(), label });
        continue;
      }
    }

    out.push({ kind: bullet ? 'bullet' : 'text', text: body });
  }
  return out;
}

/** Une ligne d'exemple : le chinois porte, le sens suit, l'audio est à un tap. */
function ExampleLine({ b, accent, colors, focus }: {
  b: Extract<Bloc, { kind: 'example' }>; accent: string; colors: typeof Colors.light;
  /** Titre de la fiche : ce qu'elle enseigne est mis en évidence dans l'exemple. */
  focus?: string;
}) {
  const { playHanzi } = useAudio();
  const { toneColors, showPinyin } = useDisplaySettings();
  const bold = focus ? focusFor(b.hanzi, focus) : undefined;
  // Trois exemples sur quatre n'ont pas de pinyin dans les données. Plutôt que
  // de laisser l'apprenant sans prononciation, on le calcule — pinyin-pro
  // tranche les caractères à lectures multiples d'après le contexte du mot,
  // ce qui est exactement le cas difficile.
  const py = b.pinyin || autoPinyin(b.hanzi);
  return (
    <TouchableOpacity
      style={[gs.exCard, { backgroundColor: colors.appBg, borderLeftColor: accent }]}
      onPress={() => playHanzi(b.hanzi)}
      activeOpacity={0.7}
    >
      <View style={{ flex: 1, gap: 2 }}>
        {!!b.label && (
          <Text style={[gs.exCardLabel, { color: colors.textTertiary }]}>{b.label}</Text>
        )}
        <ToneColoredHanzi
          hanzi={b.hanzi}
          pinyin={py}
          enabled={toneColors}
          bold={bold}
          style={[gs.exCardHanzi, { color: colors.textPrimary }]}
        />
        {showPinyin && !!py && (
          <Text style={[gs.exCardPinyin, { color: colors.textTertiary }]}>{py}</Text>
        )}
        <Text style={[gs.exCardFr, { color: colors.textSecondary }]}>{b.fr}</Text>
      </View>
      <Ionicons name="volume-medium-outline" size={15} color={colors.textTertiary} />
    </TouchableOpacity>
  );
}

export function SheetBody({ text, accent, colors, focus }: {
  text: string; accent: string; colors: typeof Colors.light; focus?: string;
}) {
  const blocs = parseSheetBody(text);
  return (
    <View style={{ gap: 7 }}>
      {blocs.map((b, i) => {
        switch (b.kind) {
          case 'example':
            return <ExampleLine key={i} b={b} accent={accent} colors={colors} focus={focus} />;
          case 'formula':
            return (
              <View key={i} style={[gs.formula, { backgroundColor: accent + '12', borderColor: accent + '40' }]}>
                <Text style={[gs.formulaTxt, { color: colors.textPrimary }]}>{b.text}</Text>
              </View>
            );
          case 'step':
            return (
              <View key={i} style={[gs.stepRow, { marginTop: i === 0 ? 0 : 10 }]}>
                <View style={[gs.stepNum, { backgroundColor: accent }]}>
                  <Text style={gs.stepNumTxt}>{b.num}</Text>
                </View>
                <Text style={[gs.stepTxt, { color: colors.textPrimary }]}>{b.text}</Text>
              </View>
            );
          case 'head':
            return (
              <View key={i} style={[gs.headRow, { marginTop: i === 0 ? 0 : 8 }]}>
                <Ionicons
                  name={b.bad ? 'close-circle' : 'bulb'}
                  size={15}
                  color={b.bad ? '#EF4444' : '#F59E0B'}
                />
                <Text style={[gs.headTxt, { color: colors.textPrimary }]}>{b.text}</Text>
              </View>
            );
          case 'bullet':
            return (
              <View key={i} style={gs.bulletRow}>
                <View style={[gs.bulletDot, { backgroundColor: colors.textTertiary }]} />
                <RichText
                  text={b.text}
                  style={[gs.secBody, { color: colors.textSecondary, flex: 1 }]}
                  boldColor={colors.textPrimary}
                />
              </View>
            );
          default:
            return (
              <RichText
                key={i}
                text={b.text}
                style={[gs.secBody, { color: colors.textSecondary }]}
                boldColor={colors.textPrimary}
              />
            );
        }
      })}
    </View>
  );
}

/** Une section = une carte. L'icône vit dans une pastille, pas dans le titre. */
export function SheetSection({ icon, label, text, accent, colors, focus }: {
  icon: string; label: string; text: string; accent: string; colors: typeof Colors.light;
  focus?: string;
}) {
  if (!text?.trim()) return null;
  return (
    <View style={[gs.card, { backgroundColor: colors.cardBg, borderColor: colors.borderLight }]}>
      <View style={gs.cardHead}>
        <View style={[gs.cardIcon, { backgroundColor: accent + '18' }]}>
          <Text style={gs.cardIconTxt}>{icon}</Text>
        </View>
        <Text style={[gs.cardLabel, { color: colors.textPrimary }]}>{label}</Text>
      </View>
      <SheetBody text={text} accent={accent} colors={colors} focus={focus} />
    </View>
  );
}

export function SheetQuiz({ quiz, accent, colors }: {
  quiz: NonNullable<GrammarSheet['quiz']>; accent: string; colors: typeof Colors.light;
}) {
  const [chosen, setChosen] = useState<number | null>(null);
  const { t, pick } = useI18n();
  const answered = chosen !== null;
  return (
    <View style={gs.section}>
      <Text style={[gs.secLabel, { color: accent }]}>🎯 {t('grammar.quiz')}</Text>
      <Text style={[gs.quizPrompt, { color: colors.textPrimary }]}>{pick(quiz.prompt, quiz.promptEn)}</Text>
      <View style={gs.quizChoices}>
        {quiz.choices.map((choice, i) => {
          const isCorrect = i === quiz.correctChoiceIndex;
          const isChosen = i === chosen;
          const bg = !answered ? colors.appBg
            : isCorrect ? '#4CAF5020'
            : isChosen ? '#EF444420'
            : colors.appBg;
          const border = !answered ? colors.borderLight
            : isCorrect ? '#4CAF50'
            : isChosen ? '#EF4444'
            : colors.borderLight;
          return (
            <TouchableOpacity
              key={i}
              style={[gs.quizChoice, { backgroundColor: bg, borderColor: border }]}
              onPress={() => !answered && setChosen(i)}
              activeOpacity={0.7}
              disabled={answered}
            >
              <Text style={[gs.quizChoiceTxt, { color: colors.textPrimary }]}>{choice}</Text>
              {answered && isCorrect ? <Ionicons name="checkmark-circle" size={16} color="#4CAF50" /> : null}
              {answered && isChosen && !isCorrect ? <Ionicons name="close-circle" size={16} color="#EF4444" /> : null}
            </TouchableOpacity>
          );
        })}
      </View>
      {answered && (
        <Text style={[gs.quizVerdict, { color: chosen === quiz.correctChoiceIndex ? '#4CAF50' : '#EF4444' }]}>
          {chosen === quiz.correctChoiceIndex ? t('grammar.quizCorrect') : `${t('grammar.quizAnswer')} ${quiz.choices[quiz.correctChoiceIndex]}`}
        </Text>
      )}
    </View>
  );
}

function GrammarSheetCard({ sheet, accent, colors }: {
  sheet: GrammarSheet; accent: string; colors: typeof Colors.light;
}) {
  const router = useRouter();
  const { toneColors, showPinyin } = useDisplaySettings();
  const { pick } = useI18n();

  // Ouvre une page dédiée : déplier une fiche entière dans la liste obligeait
  // à faire défiler des écrans de contenu pour revenir aux autres fiches.
  return (
    <TouchableOpacity
      style={[pc.card, { backgroundColor: colors.cardBg, borderColor: colors.borderLight }]}
      onPress={() => router.push({ pathname: '/grammarSheet', params: { id: sheet.id } } as any)}
      activeOpacity={0.75}
    >
      <View style={pc.header}>
        <View style={[pc.accentBar, { backgroundColor: accent }]} />
        <View style={{ flex: 1, gap: 1 }}>
          <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 8 }}>
            <ToneColoredHanzi hanzi={sheet.hanzi} pinyin={sheet.pinyin} enabled={toneColors} style={[gs.headHanzi, { color: colors.textPrimary }]} />
            {showPinyin ? <Text style={[gs.headPinyin, { color: colors.textTertiary }]}>{sheet.pinyin}</Text> : null}
          </View>
          <Text style={[gs.headFr, { color: colors.textSecondary }]} numberOfLines={1}>
            {pick(sheet.translationFr, sheet.translationEn)}
          </Text>
        </View>
        <View style={[pc.chevronWrap, { backgroundColor: colors.appBg }]}>
          <Ionicons name="chevron-forward" size={15} color={colors.textTertiary} />
        </View>
      </View>
    </TouchableOpacity>
  );
}

export const gs = StyleSheet.create({
  // ── Fiche : une section = une carte ────────────────────────────────────
  card: { borderRadius: 16, borderWidth: 1, padding: 16, gap: 12 },
  cardHead: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  cardIcon: { width: 30, height: 30, borderRadius: 9, alignItems: 'center', justifyContent: 'center' },
  cardIconTxt: { fontSize: 15 },
  cardLabel: { fontSize: 15, fontWeight: '800' },

  // La formule de construction : l'information la plus dense de la fiche.
  formula: { borderRadius: 11, borderWidth: 1, paddingHorizontal: 13, paddingVertical: 11 },
  formulaTxt: { fontSize: 15, fontWeight: '700', lineHeight: 23 },

  // Une étape numérotée annonce une sous-partie : elle doit se voir comme un
  // titre, pas se lire comme une phrase.
  stepRow: { flexDirection: 'row', alignItems: 'center', gap: 9 },
  stepNum: { width: 22, height: 22, borderRadius: 11, alignItems: 'center', justifyContent: 'center' },
  stepNumTxt: { color: '#FFF', fontSize: 12, fontWeight: '800' },
  stepTxt: { fontSize: 14.5, fontWeight: '800', flex: 1, lineHeight: 20 },

  headRow: { flexDirection: 'row', alignItems: 'center', gap: 7 },
  headTxt: { fontSize: 13.5, fontWeight: '700', flex: 1 },

  bulletRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 9, paddingLeft: 2 },
  bulletDot: { width: 4, height: 4, borderRadius: 2, marginTop: 8.5 },

  // Un exemple noyé dans le texte ne s'écoute pas et ne se repère pas.
  exCard: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    borderRadius: 10, borderLeftWidth: 3, paddingHorizontal: 12, paddingVertical: 10,
  },
  exCardHanzi: { fontSize: 17, fontWeight: '500' },
  exCardLabel: { fontSize: 11, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.3, marginBottom: 2 },
  exCardPinyin: { fontSize: 11.5 },
  exCardFr: { fontSize: 12.5, fontStyle: 'italic' },

  headHanzi: { fontSize: 20, fontWeight: '500' },
  headPinyin: { fontSize: 12 },
  headFr: { fontSize: 12 },
  bodyWrap: { padding: 14, gap: 14 },
  section: { gap: 6 },
  secLabel: { fontSize: 13, fontWeight: '800' },
  secBody: { fontSize: 13.5, lineHeight: 21 },
  example: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    borderRadius: 10, borderWidth: 1, padding: 10, marginTop: 4,
  },
  exHanzi: { fontSize: 16, fontWeight: '400' },
  exPinyin: { fontSize: 11 },
  exFr: { fontSize: 12, fontStyle: 'italic' },
  quizPrompt: { fontSize: 14, fontWeight: '600' },
  quizChoices: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 4 },
  quizChoice: {
    flexDirection: 'row', alignItems: 'center', gap: 5,
    borderRadius: 10, borderWidth: 1.5, paddingHorizontal: 14, paddingVertical: 9,
  },
  quizChoiceTxt: { fontSize: 15, fontWeight: '600' },
  quizVerdict: { fontSize: 13, fontWeight: '700', marginTop: 2 },
});

// ── Carte de la grille ─────────────────────────────────────────
// Plus dense que l'ancienne rangée : le hanzi porte la carte, un exemple
// réel montre à quoi ressemble le point de grammaire, et une pastille
// signale la fiche qui se termine par un quiz.

function GrammarTile({ sheet, accent, colors, width }: {
  sheet: GrammarSheet; accent: string; colors: typeof Colors.light; width?: number;
}) {
  const router = useRouter();
  const { toneColors, showPinyin } = useDisplaySettings();
  const { pick } = useI18n();
  const ex = sheet.examples?.[0];

  return (
    <TouchableOpacity
      style={[tile.card, {
        backgroundColor: colors.cardBg, borderColor: colors.borderLight,
        borderLeftColor: accent, width,
      }]}
      onPress={() => router.push({ pathname: '/grammarSheet', params: { id: sheet.id } } as any)}
      activeOpacity={0.75}
    >
      <View style={tile.top}>
        <ToneColoredHanzi
          hanzi={sheet.hanzi}
          pinyin={sheet.pinyin}
          enabled={toneColors}
          style={[tile.hanzi, { color: colors.textPrimary }]}
        />
        {!!sheet.quiz && (
          <View style={[tile.quizDot, { backgroundColor: accent + '1F' }]}>
            <Ionicons name="help" size={11} color={accent} />
          </View>
        )}
      </View>
      {showPinyin && !!sheet.pinyin && (
        <Text style={[tile.pinyin, { color: colors.textTertiary }]} numberOfLines={1}>{sheet.pinyin}</Text>
      )}
      <Text style={[tile.fr, { color: colors.textSecondary }]} numberOfLines={2}>
        {pick(sheet.translationFr, sheet.translationEn)}
      </Text>
      {!!ex && (
        <View style={[tile.exBox, { borderTopColor: colors.borderLight }]}>
          <Text style={[tile.exHanzi, { color: colors.textPrimary }]} numberOfLines={1}>{ex.hanzi}</Text>
          <Text style={[tile.exFr, { color: colors.textTertiary }]} numberOfLines={1}>
            {pick(ex.translationFr, ex.translationEn)}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const tile = StyleSheet.create({
  card: { borderRadius: 14, borderWidth: 1, borderLeftWidth: 3, padding: 13, gap: 3 },
  top: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  hanzi: { fontSize: 21, fontWeight: '500', flexShrink: 1 },
  quizDot: { width: 20, height: 20, borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginLeft: 'auto' },
  pinyin: { fontSize: 11.5 },
  fr: { fontSize: 13, lineHeight: 18, marginTop: 2 },
  exBox: { borderTopWidth: StyleSheet.hairlineWidth, marginTop: 8, paddingTop: 8, gap: 2 },
  exHanzi: { fontSize: 14.5 },
  exFr: { fontSize: 11.5, fontStyle: 'italic' },
});

// ── Écran ──────────────────────────────────────────────────────
export default function GrammaireScreen() {
  const scheme = useColorScheme();
  const c = Colors[scheme];
  const router = useRouter();
  const { t, pick } = useI18n();
  const { gutter, gap, columns, itemWidth, tablet } = useLayout();
  const [activeLevel, setActiveLevel] = useState(LEVELS[0] ?? 'A1');
  const [query, setQuery] = useState('');

  const accent = LEVEL_COLORS[activeLevel] ?? c.primaryRed;

  /**
   * La recherche porte sur TOUS les niveaux : on cherche « 了 » sans savoir
   * s'il est classé B1 ou A2 — le demander à l'utilisateur reviendrait à lui
   * faire deviner la réponse qu'il cherche.
   */
  const searching = query.trim().length > 0;
  const q = query.trim().toLowerCase();
  const résultats = searching
    ? GRAMMAR_SHEETS.filter(sh =>
        sh.hanzi.toLowerCase().includes(q) ||
        (sh.pinyin ?? '').toLowerCase().includes(q) ||
        pick(sh.translationFr, sh.translationEn).toLowerCase().includes(q))
    : (BY_LEVEL[activeLevel] ?? []);

  // Groupées par famille, dans l'ordre pédagogique. Hors recherche seulement :
  // un résultat de recherche se lit comme une liste, pas comme un plan.
  const groupes = GRAMMAR_FAMILIES
    .map(f => ({ family: f, sheets: résultats.filter(sh => familyOf(sh) === f) }))
    .filter(g => g.sheets.length > 0);

  const cols = columns(230, 4);
  const largeur = cols > 1 ? itemWidth(cols) : undefined;

  return (
    <SafeAreaView style={[s.root, { backgroundColor: c.appBg }]}>
      <View style={[s.header, { paddingHorizontal: gutter }]}>
        <TouchableOpacity
          onPress={() => router.canGoBack() ? router.back() : router.replace('/(tabs)')}
          style={s.backBtn}
        >
          <Ionicons name="arrow-back" size={22} color={c.textPrimary} />
        </TouchableOpacity>
        <Text style={[s.title, { color: c.textPrimary }]}>{t('grammar.title')}</Text>
        <View style={{ width: 38 }} />
      </View>

      {/* Recherche — 84 fiches ne se parcourent pas à l'œil. */}
      <View style={[s.searchWrap, { paddingHorizontal: gutter }]}>
        <View style={[s.searchBox, { backgroundColor: c.cardBg, borderColor: c.borderLight }]}>
          <Ionicons name="search" size={16} color={c.textTertiary} />
          <TextInput
            style={[s.searchInput, { color: c.textPrimary }]}
            value={query}
            onChangeText={setQuery}
            placeholder={t('grammar.search')}
            placeholderTextColor={c.textTertiary}
            autoCorrect={false}
            returnKeyType="search"
          />
          {searching && (
            <TouchableOpacity onPress={() => setQuery('')} hitSlop={8}>
              <Ionicons name="close-circle" size={17} color={c.textTertiary} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Niveaux — masqués pendant une recherche, qui les traverse tous. */}
      {!searching && (
        <FilterChipRow gutter={gutter} height={44} marginTop={10} marginBottom={4}>
          {LEVELS.map(lvl => {
            const active = lvl === activeLevel;
            const col = LEVEL_COLORS[lvl] ?? c.primaryRed;
            return (
              <TouchableOpacity
                key={lvl}
                style={[s.levelBtn, {
                  backgroundColor: active ? col + '18' : c.cardBg,
                  borderColor: active ? col : c.borderLight,
                }]}
                onPress={() => setActiveLevel(lvl)}
                activeOpacity={0.7}
              >
                <Text style={[s.levelBtnTxt, { color: active ? col : c.textSecondary }]}>{lvl}</Text>
                <Text style={[s.levelCount, { color: active ? col : c.textTertiary }]}>
                  {BY_LEVEL[lvl]?.length ?? 0}
                </Text>
              </TouchableOpacity>
            );
          })}
        </FilterChipRow>
      )}

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: gutter, paddingTop: 12, paddingBottom: 100 }}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={[s.countLine, { color: c.textTertiary }]}>
          {searching
            ? t('grammar.results', { n: résultats.length })
            : t('grammar.sheets', { n: résultats.length, s: résultats.length !== 1 ? 's' : '', lvl: activeLevel })}
        </Text>

        {résultats.length === 0 && (
          <Text style={[s.empty, { color: c.textTertiary }]}>
            {searching ? t('grammar.noResult') : t('grammar.empty')}
          </Text>
        )}

        {groupes.map(g => (
          <View key={g.family} style={{ marginBottom: 22 }}>
            <View style={s.famRow}>
              <View style={[s.famBar, { backgroundColor: accent }]} />
              <Text style={[s.famLabel, { color: c.textPrimary }]}>
                {t(`grammar.fam.${g.family}` as any)}
              </Text>
              <Text style={[s.famCount, { color: c.textTertiary }]}>{g.sheets.length}</Text>
            </View>
            <View style={[s.grid, { gap }]}>
              {g.sheets.map(sheet => (
                <GrammarTile
                  key={sheet.id}
                  sheet={sheet}
                  accent={LEVEL_COLORS[HSK_TO_CECR[sheet.level] ?? 'A1'] ?? accent}
                  colors={c}
                  width={largeur}
                />
              ))}
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

// ── Styles ─────────────────────────────────────────────────────
const s = StyleSheet.create({
  root: { flex: 1 },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingTop: 8, paddingBottom: 12,
  },
  backBtn: { width: 38, height: 38, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 18, fontWeight: '700' },

  searchWrap: { paddingTop: 2 },
  searchBox: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    borderWidth: 1, borderRadius: 12, paddingHorizontal: 12, height: 42,
  },
  searchInput: { flex: 1, fontSize: 15, paddingVertical: 0 },

  // Les onglets de niveau s'étiraient en `flex: 1` : sur un iPad en paysage,
  // six pastilles réparties sur 2 000 pt de large — un menu de restaurant.
  // Largeur naturelle, et le compte de fiches dans la pastille.
  levelBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 7,
    paddingHorizontal: 15, paddingVertical: 9, borderRadius: 11, borderWidth: 1.5,
  },
  levelBtnTxt: { fontSize: 14, fontWeight: '800', letterSpacing: 0.5 },
  levelCount: { fontSize: 11.5, fontWeight: '700' },

  countLine: { fontSize: 12, marginBottom: 14 },
  famRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 10 },
  famBar: { width: 3, height: 15, borderRadius: 2 },
  famLabel: { fontSize: 14.5, fontWeight: '800' },
  famCount: { fontSize: 12, fontWeight: '600' },
  grid: { flexDirection: 'row', flexWrap: 'wrap' },
  empty: { textAlign: 'center', marginTop: 40, fontSize: 14 },
});

const pc = StyleSheet.create({
  card: { borderRadius: 16, borderWidth: 1, overflow: 'hidden' },
  header: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    paddingVertical: 16, paddingHorizontal: 16,
  },
  accentBar: { width: 4, height: 28, borderRadius: 2, flexShrink: 0 },
  chevronWrap: { width: 28, height: 28, borderRadius: 8, alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
});
