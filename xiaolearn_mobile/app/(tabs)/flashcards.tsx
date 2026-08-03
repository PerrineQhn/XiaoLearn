/**
 * XiaoLearn Mobile — Écran Flashcards / Révisions (SRS réel)
 */
import { useCallback, useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView,
  ActivityIndicator, Modal, Pressable, Animated, FlatList,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';
import { useColorScheme } from '@/hooks/useColorScheme';
import Colors from '@/constants/Colors';
import { useSrsData, type DeckStats, type SrsCard, type SrsEntry } from '@/hooks/useSrsData';
import { useSrs } from '@/contexts/SrsContext';
import { useI18n } from '@/contexts/LanguageContext';
import { BrandGradient } from '@/components/BrandGradient';
import { useSwipeToDismiss } from '@/hooks/useSwipeToDismiss';
import { useEntitlements } from '@/hooks/useEntitlements';
import type { TransKey } from '@/i18n/translations';

type Direction = 'zh_fr' | 'fr_zh' | 'mixed';
type StudyMode = 'flip' | 'writing';

const CARD_COUNTS = [10, 20, 30, 50];
const DIRECTIONS: { key: Direction; label: string; icon: string }[] = [
  { key: 'zh_fr',  label: 'Chinois → Français', icon: '🇨🇳' },
  { key: 'fr_zh',  label: 'Français → Chinois', icon: '🇫🇷' },
  { key: 'mixed',  label: 'Mixte',              icon: '🔀' },
];

// ─── Badge SRS ────────────────────────────────────────────────────────────────

// Les libellés sont désormais des CLÉS i18n : ils s'affichaient en français
// même avec l'interface en anglais.
const LEVEL_LABELS: Record<number, { key: TransKey; color: string; bg: string }> = {
  1: { key: 'srs.seen',     color: '#3B82F6', bg: '#3B82F618' },  // bleu
  2: { key: 'srs.familiar', color: '#F97316', bg: '#F9731618' },  // orange vif
  3: { key: 'srs.almost',   color: '#2F9D8A', bg: '#2F9D8A18' },  // vert-bleu
};

function getWordBadge(entry: SrsEntry | undefined): { key: TransKey; color: string; bg: string } {
  // V2 multi-compétences : badge basé sur 👁 recognition (cohérent web)
  const level = entry?.skills?.recognition?.level ?? entry?.level ?? 0;
  if (!entry || (level === 0 && !entry.reviewCount)) {
    return { key: 'srs.new',   color: '#9E9E9E', bg: '#9E9E9E18' };
  }
  if (level === 0) {
    return { key: 'srs.hard', color: '#EF4444', bg: '#EF444418' };
  }
  if (level < 4) {
    return LEVEL_LABELS[level] ?? { key: 'srs.inProgress', color: '#FF9800', bg: '#FF980018' };
  }
  return { key: 'srs.mastered',  color: '#4CAF50', bg: '#4CAF5018' };
}

// ─── StatBubble (cliquable) ───────────────────────────────────────────────────

function StatBubble({
  label, value, color, onPress,
}: {
  label: string; value: number; color: string; onPress?: () => void;
}) {
  const { t } = useI18n();
  return (
    <TouchableOpacity
      style={[s.statBubble, { backgroundColor: color + '15' }]}
      onPress={onPress}
      activeOpacity={onPress ? 0.7 : 1}
      disabled={!onPress}
    >
      <Text style={[s.statValue, { color }]}>{value}</Text>
      <Text style={[s.statLabel, { color: color + 'CC' }]}>{label}</Text>
    </TouchableOpacity>
  );
}

// ─── DeckCard ─────────────────────────────────────────────────────────────────

function DeckCard({ deck, colors, onPress }: { deck: DeckStats; colors: typeof Colors.light; onPress: () => void }) {
  const { t } = useI18n();
  const pct = deck.total > 0 ? Math.round((deck.mastered / deck.total) * 100) : 0;
  const dueLabel = deck.dueNow > 0 ? t('cards.toReviewShort', { n: deck.dueNow }) : t('cards.newShort', { n: deck.newCards });
  const dueColor = deck.dueNow > 0 ? colors.primaryRed : colors.textTertiary;

  return (
    <TouchableOpacity
      style={[s.deckCard, { backgroundColor: colors.cardBg, borderColor: colors.borderLight }]}
      onPress={onPress}
      activeOpacity={0.75}
    >
      <View style={s.deckCardTop}>
        <View style={[s.deckColorDot, { backgroundColor: deck.levelColor }]} />
        <View style={{ flex: 1 }}>
          <Text style={[s.deckName, { color: colors.textPrimary }]}>{deck.levelLabel} — {t('cards.vocab')}</Text>
          <Text style={[s.deckSub, { color: dueColor }]}>{dueLabel}</Text>
        </View>
        <Ionicons name="chevron-forward" size={16} color={colors.textTertiary} />
      </View>
      <View style={[s.deckProgressTrack, { backgroundColor: colors.borderLight }]}>
        <View style={[s.deckProgressBar, { width: `${pct}%` as `${number}%`, backgroundColor: deck.levelColor }]} />
      </View>
      <View style={s.deckMeta}>
        <Text style={[s.deckMetaText, { color: colors.textTertiary }]}>{t('cards.masteredShort', { n: deck.mastered, total: deck.total })}</Text>
        <Text style={[s.deckMetaText, { color: deck.levelColor }]}>{pct}%</Text>
      </View>
    </TouchableOpacity>
  );
}

// ─── Session Options Sheet ────────────────────────────────────────────────────

function SessionSheet({
  visible, onClose, onStart, colors,
}: {
  visible: boolean;
  onClose: () => void;
  onStart: (maxCards: number, direction: Direction, study: StudyMode) => void;
  colors: typeof Colors.light;
}) {
  const { t } = useI18n();
  const [maxCards, setMaxCards] = useState(20);
  const [direction, setDirection] = useState<Direction>('zh_fr');
  const [study, setStudy] = useState<StudyMode>('flip');
  const { translateY, overlayOpacity, panResponder, open } = useSwipeToDismiss(onClose);
  const insets = useSafeAreaInsets();

  return (
    <Modal visible={visible} transparent animationType="none" onRequestClose={onClose} onShow={open}>
      <Animated.View style={[StyleSheet.absoluteFillObject, { backgroundColor: 'rgba(0,0,0,0.45)', opacity: overlayOpacity }]} pointerEvents="none" />
      <Pressable style={StyleSheet.absoluteFillObject} onPress={onClose} />
      <Animated.View style={[s.sheet, { backgroundColor: colors.cardBg, transform: [{ translateY }], paddingBottom: insets.bottom + 20 }]}>
        <View {...panResponder.panHandlers} style={s.handleArea}>
          <View style={[s.sheetHandle, { backgroundColor: colors.borderMedium }]} />
        </View>
        <Text style={[s.sheetTitle, { color: colors.textPrimary }]}>{t('cards.sessionOptions')}</Text>
        <Text style={[s.optLabel, { color: colors.textSecondary }]}>{t('cards.cardCount')}</Text>
        <View style={s.optRow}>
          {CARD_COUNTS.map(n => (
            <TouchableOpacity key={n} style={[s.optChip, { borderColor: colors.borderLight, backgroundColor: colors.appBg }, maxCards === n && { borderColor: colors.primaryRed, backgroundColor: colors.primaryRed + '15' }]} onPress={() => setMaxCards(n)}>
              <Text style={[s.optChipTxt, { color: colors.textSecondary }, maxCards === n && { color: colors.primaryRed, fontWeight: '700' }]}>{n}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <Text style={[s.optLabel, { color: colors.textSecondary }]}>{t('cards.studyMode')}</Text>
        <View style={s.optRow}>
          {([
            { key: 'flip' as const,    label: t('cards.studyFlip'),  icon: 'albums-outline' as const },
            { key: 'writing' as const, label: t('cards.studyWrite'), icon: 'brush-outline' as const },
          ]).map(m => (
            <TouchableOpacity
              key={m.key}
              style={[s.studyBtn, { borderColor: colors.borderLight, backgroundColor: colors.appBg }, study === m.key && { borderColor: colors.primaryRed, backgroundColor: colors.primaryRed + '10' }]}
              onPress={() => setStudy(m.key)}
            >
              <Ionicons name={m.icon} size={22} color={study === m.key ? colors.primaryRed : colors.textTertiary} />
              <Text style={[s.studyTxt, { color: colors.textSecondary }, study === m.key && { color: colors.primaryRed, fontWeight: '700' }]}>{m.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {study === 'flip' && (<>
        <Text style={[s.optLabel, { color: colors.textSecondary }]}>{t('cards.direction')}</Text>
        <View style={s.optCol}>
          {DIRECTIONS.map(d => (
            <TouchableOpacity key={d.key} style={[s.dirBtn, { borderColor: colors.borderLight, backgroundColor: colors.appBg }, direction === d.key && { borderColor: colors.primaryRed, backgroundColor: colors.primaryRed + '10' }]} onPress={() => setDirection(d.key)}>
              <Text style={s.dirIcon}>{d.icon}</Text>
              <Text style={[s.dirTxt, { color: colors.textSecondary }, direction === d.key && { color: colors.primaryRed, fontWeight: '700' }]}>{t(d.key === 'zh_fr' ? 'cards.dirZhFr' : d.key === 'fr_zh' ? 'cards.dirFrZh' : 'cards.dirMixed')}</Text>
              {direction === d.key && <Ionicons name="checkmark-circle" size={18} color={colors.primaryRed} />}
            </TouchableOpacity>
          ))}
        </View>
        </>)}
        <TouchableOpacity style={[s.startBtn, { backgroundColor: colors.primaryRed }]} onPress={() => { onClose(); onStart(maxCards, direction, study); }}>
          <Ionicons name="play" size={18} color="#FFF" />
          <Text style={s.startBtnTxt}>{t('cards.start')}</Text>
        </TouchableOpacity>
      </Animated.View>
    </Modal>
  );
}

// ─── Word List Sheet ──────────────────────────────────────────────────────────

function WordListSheet({
  visible, onClose, title, cards, srsState, colors, onStartSession,
}: {
  visible: boolean;
  onClose: () => void;
  title: string;
  cards: SrsCard[];
  srsState: Record<string, SrsEntry>;
  colors: typeof Colors.light;
  onStartSession: () => void;
}) {
  const { t, pick } = useI18n();
  const router = useRouter();
  const { translateY, overlayOpacity, panResponder, open } = useSwipeToDismiss(onClose);
  const insets = useSafeAreaInsets();

  return (
    <Modal visible={visible} transparent animationType="none" onRequestClose={onClose} onShow={open}>
      <Animated.View style={[StyleSheet.absoluteFillObject, { backgroundColor: 'rgba(0,0,0,0.5)', opacity: overlayOpacity }]} pointerEvents="none" />
      <Pressable style={StyleSheet.absoluteFillObject} onPress={onClose} />
      <Animated.View style={[wl.sheet, { backgroundColor: colors.cardBg, transform: [{ translateY }] }]}>
        {/* Handle */}
        <View {...panResponder.panHandlers} style={wl.handleArea}>
          <View style={[wl.handle, { backgroundColor: colors.borderMedium }]} />
        </View>

        {/* Header */}
        <View style={[wl.header, { borderBottomColor: colors.borderLight }]}>
          <View style={{ flex: 1 }}>
            <Text style={[wl.title, { color: colors.textPrimary }]}>{title}</Text>
            <Text style={[wl.sub, { color: colors.textTertiary }]}>{cards.length} mot{cards.length > 1 ? 's' : ''}</Text>
          </View>
          <TouchableOpacity onPress={onClose} style={wl.closeBtn}>
            <Ionicons name="close" size={20} color={colors.textSecondary} />
          </TouchableOpacity>
        </View>

        <Text style={[wl.hint, { color: colors.textTertiary }]}>{t('card.longPressHint')}</Text>

        {/* Liste */}
        <FlatList
          data={cards}
          keyExtractor={(_, i) => String(i)}
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingVertical: 8, paddingHorizontal: 16 }}
          renderItem={({ item }) => {
            const entry = srsState[item.id];
            const badge = getWordBadge(entry);
            return (
              // Appui long plutôt qu'un bouton par ligne : la liste reste lisible,
              // et le geste ne gêne pas le défilement.
              <TouchableOpacity
                style={[wl.row, { borderBottomColor: colors.borderLight }]}
                onLongPress={() => { onClose(); router.push({ pathname: '/carte', params: { id: item.id } } as any); }}
                delayLongPress={350}
                activeOpacity={0.7}
              >
                <View style={{ flex: 1 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 8 }}>
                    <Text style={[wl.hanzi, { color: colors.textPrimary }]}>{item.hanzi}</Text>
                    <Text style={[wl.pinyin, { color: colors.textTertiary }]}>{item.pinyin}</Text>
                  </View>
                  <Text style={[wl.translation, { color: colors.textSecondary }]} numberOfLines={1}>{pick(item.translation, item.translationEn ?? item.translation)}</Text>
                </View>
                <View style={[wl.badge, { backgroundColor: badge.bg }]}>
                  <Text style={[wl.badgeTxt, { color: badge.color }]}>{t(badge.key)}</Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />

        {/* Bouton réviser */}
        <View style={[wl.footer, { borderTopColor: colors.borderLight, paddingBottom: insets.bottom + 12 }]}>
          <TouchableOpacity
            style={[wl.startBtn, { backgroundColor: colors.primaryRed }]}
            onPress={() => { onClose(); setTimeout(onStartSession, 300); }}
          >
            <Ionicons name="play" size={18} color="#FFF" />
            <Text style={wl.startBtnTxt}>{t('flash.reviewThese')}</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </Modal>
  );
}

// ─── Screen ───────────────────────────────────────────────────────────────────

type ListFilter =
  | { kind: 'deck'; levelKey: string; title: string }
  | { kind: 'mastered' }
  | { kind: 'learning' }
  | { kind: 'new' };

export default function FlashcardsScreen() {
  const { t } = useI18n();
  const scheme = useColorScheme();
  const colors = Colors[scheme];
  const router = useRouter();
  const { stats, loaded, reload, allCards, srsState } = useSrs();

  const { access } = useEntitlements();
  const [listFilter, setListFilter] = useState<ListFilter | null>(null);
  const [sessionOpen, setSessionOpen] = useState(false);
  const [pendingMode, setPendingMode] = useState<'due' | 'new' | 'level' | 'mastered'>('due');
  const [pendingLevel, setPendingLevel] = useState<string | undefined>(undefined);

  useFocusEffect(useCallback(() => { reload(); }, [reload]));

  // Cartes filtrées pour le WordListSheet
  const filteredCards: SrsCard[] = (() => {
    if (!listFilter) return [];
    switch (listFilter.kind) {
      case 'deck':
        return allCards.filter(c => c.levelKey === listFilter.levelKey);
      case 'mastered':
        return allCards.filter(c => (srsState[c.id]?.skills?.recognition?.level ?? 0) >= 4);
      case 'learning':
        return allCards.filter(c => {
          const e = srsState[c.id];
          const l = e?.skills?.recognition?.level ?? 0;
          return (l > 0 && l < 4) || (l === 0 && (e?.reviewCount ?? 0) > 0);
        });
      case 'new':
        return allCards.filter(c => {
          const e = srsState[c.id];
          return !e || ((e.skills?.recognition?.level ?? 0) === 0 && !e.reviewCount);
        });
      default: return [];
    }
  })();

  const listTitle = listFilter
    ? listFilter.kind === 'deck' ? listFilter.title
    : listFilter.kind === 'mastered' ? t('cards.masteredWords')
    : listFilter.kind === 'learning' ? t('cards.learningWords')
    : t('cards.newWords')
    : '';

  function openDeck(deck: DeckStats) {
    setPendingMode('level');
    setPendingLevel(deck.levelKey);
    setListFilter({ kind: 'deck', levelKey: deck.levelKey, title: `${deck.levelLabel} — ${t('cards.vocab')}` });
  }

  function openFilter(kind: 'mastered' | 'learning' | 'new') {
    // Chaque liste lance la session qui contient VRAIMENT les mots affichés.
    // « Maîtrisés » lançait `due`, dont le filtre (niveau < 4) est l'exact
    // complément de la liste montrée juste au-dessus.
    setPendingMode(kind === 'mastered' ? 'mastered' : kind === 'learning' ? 'due' : 'new');
    setPendingLevel(undefined);
    setListFilter({ kind });
  }

  function startSession(maxCards: number, direction: Direction, study: StudyMode = 'flip') {
    // Découverte de nouveaux mots : plafonnée en gratuit. Le champ
    // `flashcardDailyNewLimit` d'AppAccess n'était lu nulle part.
    const capped = pendingMode === 'new'
      ? Math.min(maxCards, access.flashcardDailyNewLimit)
      : maxCards;
    router.push({
      pathname: '/review',
      params: {
        mode: pendingMode,
        ...(pendingLevel ? { level: pendingLevel } : {}),
        maxCards: String(capped),
        direction,
        study,
      },
    } as any);
  }

  const hasDue = stats.dueNow > 0;

  return (
    <SafeAreaView style={[s.root, { backgroundColor: colors.appBg }]}>
      <View style={[s.header, { backgroundColor: colors.appBg }]}>
        <Text style={[s.pageTitle, { color: colors.textPrimary }]}>{t('cards.title')}</Text>
        <View style={{ flex: 1 }} />
        {/* Création d'une carte personnalisée. */}
        <TouchableOpacity
          onPress={() => router.push('/carte' as any)}
          hitSlop={10}
          accessibilityLabel={t('card.addNew')}
          style={[s.addBtn, { borderColor: colors.borderLight }]}
          activeOpacity={0.7}
        >
          <Ionicons name="add" size={20} color={colors.primaryRed} />
        </TouchableOpacity>
      </View>

      {!loaded ? (
        <View style={s.center}>
          <ActivityIndicator color={colors.primaryRed} size="large" />
          <Text style={[s.loadingTxt, { color: colors.textTertiary }]}>{t('hard.loadingVocab')}</Text>
        </View>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 40 }}>

          {/* CTA principal */}
          <TouchableOpacity
            onPress={() => { setPendingMode(hasDue ? 'due' : 'new'); setPendingLevel(undefined); setSessionOpen(true); }}
            activeOpacity={0.85}
          >
            <BrandGradient style={s.reviseNow}>
              <View>
                <Text style={s.reviseNowTitle}>{hasDue ? t('cards.reviewNow') : t('cards.learnWords')}</Text>
                <Text style={s.reviseNowSub}>{hasDue ? t('cards.dueToday', { n: stats.dueNow }) : t('cards.newAvailable', { n: stats.newCards })}</Text>
              </View>
              {hasDue
                ? <View style={[s.reviseNowBadge, { backgroundColor: 'rgba(255,255,255,0.25)' }]}><Text style={s.reviseNowBadgeText}>{stats.dueNow}</Text></View>
                : <Ionicons name="sparkles" size={28} color="rgba(255,255,255,0.9)" />
              }
            </BrandGradient>
          </TouchableOpacity>

          {/* Stats cliquables */}
          <View style={s.statsRow}>
            <StatBubble label={t('cards.mastered')} value={stats.mastered} color="#4CAF50" onPress={() => openFilter('mastered')} />
            <StatBubble label={t('cards.learning')} value={stats.learning} color="#FF9800" onPress={() => openFilter('learning')} />
            <StatBubble label={t('cards.new')} value={stats.newCards} color={colors.primaryRed} onPress={() => openFilter('new')} />
          </View>

          {/* Total */}
          <View style={[s.totalRow, { backgroundColor: colors.cardBgAlt, borderColor: colors.borderLight }]}>
            <Ionicons name="library-outline" size={16} color={colors.textTertiary} />
            <Text style={[s.totalTxt, { color: colors.textTertiary }]}>
              {t('cards.inCatalog', { n: stats.totalCards.toLocaleString() })}
            </Text>
          </View>

          {/* Decks par niveau */}
          <Text style={[s.sectionTitle, { color: colors.textPrimary }]}>{t('cards.byPath')}</Text>
          {stats.decks.map(deck => (
            <DeckCard key={deck.levelKey} deck={deck} colors={colors} onPress={() => openDeck(deck)} />
          ))}
        </ScrollView>
      )}

      {/* Word list sheet */}
      <WordListSheet
        visible={!!listFilter}
        onClose={() => setListFilter(null)}
        title={listTitle}
        cards={filteredCards}
        srsState={srsState}
        colors={colors}
        onStartSession={() => setSessionOpen(true)}
      />

      {/* Session options sheet */}
      <SessionSheet
        visible={sessionOpen}
        onClose={() => setSessionOpen(false)}
        onStart={startSession}
        colors={colors}
      />
    </SafeAreaView>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const s = StyleSheet.create({
  root: { flex: 1 },
  addBtn: { width: 34, height: 34, borderRadius: 11, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingTop: 4, paddingBottom: 12 },
  pageTitle: { fontSize: 24, fontWeight: '700' },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12 },
  loadingTxt: { fontSize: 13 },

  reviseNow: {
    borderRadius: 16, padding: 18, flexDirection: 'row', overflow: 'hidden',
    alignItems: 'center', justifyContent: 'space-between', marginBottom: 16,
    shadowColor: '#E05040', shadowOpacity: 0.3, shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 }, elevation: 4,
  },
  reviseNowTitle: { color: '#FFF', fontSize: 17, fontWeight: '700' },
  reviseNowSub:   { color: 'rgba(255,255,255,0.8)', fontSize: 13, marginTop: 2 },
  reviseNowBadge: { width: 48, height: 48, borderRadius: 24, alignItems: 'center', justifyContent: 'center' },
  reviseNowBadgeText: { color: '#FFF', fontSize: 20, fontWeight: '700' },

  statsRow: { flexDirection: 'row', gap: 10, marginBottom: 14 },
  statBubble: { flex: 1, borderRadius: 14, paddingVertical: 14, alignItems: 'center' },
  statValue: { fontSize: 22, fontWeight: '700' },
  statLabel: { fontSize: 11, fontWeight: '500', marginTop: 2 },

  totalRow: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    borderRadius: 10, borderWidth: 1, paddingHorizontal: 12, paddingVertical: 10, marginBottom: 20,
  },
  totalTxt: { fontSize: 12, flex: 1 },
  sectionTitle: { fontSize: 17, fontWeight: '700', marginBottom: 12 },

  deckCard: {
    borderRadius: 14, borderWidth: 1, padding: 14, marginBottom: 10,
    shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 4, elevation: 1,
  },
  deckCardTop: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 10 },
  deckColorDot: { width: 10, height: 10, borderRadius: 5 },
  deckName: { fontSize: 14, fontWeight: '600' },
  deckSub:  { fontSize: 11, marginTop: 1 },
  deckProgressTrack: { height: 5, borderRadius: 3, overflow: 'hidden', marginBottom: 6 },
  deckProgressBar:   { height: 5, borderRadius: 3 },
  deckMeta: { flexDirection: 'row', justifyContent: 'space-between' },
  deckMetaText: { fontSize: 11 },

  // Session sheet
  sheet: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    borderTopLeftRadius: 24, borderTopRightRadius: 24,
    paddingHorizontal: 20, gap: 14,
    shadowColor: '#000', shadowOpacity: 0.2, shadowRadius: 20,
    shadowOffset: { width: 0, height: -4 }, elevation: 20,
  },
  handleArea: { alignItems: 'center', paddingVertical: 14 },
  sheetHandle: { width: 36, height: 4, borderRadius: 2 },
  sheetTitle: { fontSize: 18, fontWeight: '800', textAlign: 'center' },
  optLabel: { fontSize: 12, fontWeight: '600', textTransform: 'uppercase', letterSpacing: 0.5 },
  optRow: { flexDirection: 'row', gap: 8 },
  optChip: { flex: 1, borderRadius: 10, borderWidth: 1.5, paddingVertical: 10, alignItems: 'center' },
  optChipTxt: { fontSize: 15, fontWeight: '600' },
  optCol: { gap: 8 },
  dirBtn: { flexDirection: 'row', alignItems: 'center', gap: 10, borderRadius: 12, borderWidth: 1.5, paddingHorizontal: 14, paddingVertical: 12 },
  dirIcon: { fontSize: 18 },
  dirTxt: { flex: 1, fontSize: 14 },
  studyBtn: { flex: 1, alignItems: 'center', gap: 6, borderRadius: 12, borderWidth: 1.5, paddingVertical: 14 },
  studyTxt: { fontSize: 12.5, fontWeight: '600', textAlign: 'center' },
  startBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, borderRadius: 14, paddingVertical: 14 },
  startBtnTxt: { color: '#FFF', fontSize: 16, fontWeight: '700' },
});

// Word list sheet styles
const wl = StyleSheet.create({
  sheet: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    borderTopLeftRadius: 24, borderTopRightRadius: 24,
    maxHeight: '85%',
    shadowColor: '#000', shadowOpacity: 0.2, shadowRadius: 20,
    shadowOffset: { width: 0, height: -4 }, elevation: 20,
  },
  handleArea: { alignItems: 'center', paddingVertical: 14 },
  handle: { width: 36, height: 4, borderRadius: 2 },
  header: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 16, paddingBottom: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  title: { fontSize: 17, fontWeight: '700' },
  sub: { fontSize: 12, marginTop: 1 },
  closeBtn: { width: 32, height: 32, alignItems: 'center', justifyContent: 'center' },
  row: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    paddingVertical: 12, borderBottomWidth: StyleSheet.hairlineWidth,
  },
  hanzi: { fontSize: 20, fontWeight: '500' },
  pinyin: { fontSize: 12, fontWeight: '400' },
  hint: { fontSize: 11.5, paddingHorizontal: 16, paddingBottom: 6 },
  translation: { fontSize: 13, marginTop: 2 },
  badge: { borderRadius: 8, paddingHorizontal: 8, paddingVertical: 4 },
  badgeTxt: { fontSize: 11, fontWeight: '700' },
  footer: {
    paddingHorizontal: 16, paddingTop: 12,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  startBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, borderRadius: 14, paddingVertical: 14 },
  startBtnTxt: { color: '#FFF', fontSize: 16, fontWeight: '700' },
});
