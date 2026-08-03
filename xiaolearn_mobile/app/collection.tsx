/**
 * XiaoLearn Mobile — Collection de cartes mythologiques
 * Grille filtrable par catégorie + fiche détaillée.
 */
import { useMemo, useRef, useState, useCallback } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView, FlatList,
  Modal, Pressable, useWindowDimensions, ActivityIndicator,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';
import { useColorScheme } from '@/hooks/useColorScheme';
import Colors from '@/constants/Colors';
import { useI18n } from '@/contexts/LanguageContext';
import { useCards, triggerProgress } from '@/hooks/useCards';
import { CardArt } from '@/components/CardArt';
import { Card3D } from '@/components/Card3D';
import {
  CARDS, CARD_CATEGORIES, CATEGORY_META, RARITY_META,
  type CollectibleCard, type CardCategory,
} from '@/data/cards';

export default function CartesScreen() {
  const scheme = useColorScheme();
  const c = Colors[scheme];
  const router = useRouter();
  const { t, pick, lang } = useI18n();
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  const { unlocked, unlockedCount, total, snapshot, loading, reload } = useCards();
  const [filter, setFilter] = useState<CardCategory | 'all'>('all');
  const listRef = useRef<FlatList<CollectibleCard>>(null);

  /**
   * Changer de catégorie remet la grille en haut.
   *
   * « Toutes » fait 8 rangées, une catégorie 2. Si on a fait défiler dans
   * « Toutes » puis qu'on filtre, la liste garde son décalage, se retrouve
   * au-delà de sa nouvelle hauteur et rebondit vers le haut : les cartes
   * semblent glisser vers le bas toutes seules.
   */
  const pickFilter = useCallback((cat: CardCategory | 'all') => {
    setFilter(cat);
    listRef.current?.scrollToOffset({ offset: 0, animated: false });
  }, []);
  const [selected, setSelected] = useState<CollectibleCard | null>(null);

  useFocusEffect(useCallback(() => { void reload(); }, [reload]));

  const cols = width >= 768 ? 4 : 3;
  const gap = 10;
  const px = 16;
  const cardW = (width - px * 2 - gap * (cols - 1)) / cols;

  const data = useMemo(
    () => (filter === 'all' ? CARDS : CARDS.filter(x => x.category === filter)),
    [filter]
  );

  return (
    <SafeAreaView style={[s.root, { backgroundColor: c.appBg }]}>
      {/* Header */}
      <View style={[s.header, { paddingHorizontal: px }]}>
        <TouchableOpacity
          onPress={() => (router.canGoBack() ? router.back() : router.replace('/(tabs)' as any))}
          style={s.backBtn}
        >
          <Ionicons name="arrow-back" size={22} color={c.textPrimary} />
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <Text style={[s.title, { color: c.textPrimary }]}>{t('cards2.title')}</Text>
          <Text style={[s.subtitle, { color: c.textTertiary }]}>
            {t('cards2.subtitle', { n: unlockedCount, total })}
          </Text>
        </View>
        <View style={[s.counter, { backgroundColor: c.primaryRedLight }]}>
          <Text style={[s.counterTxt, { color: c.primaryRed }]}>{unlockedCount}/{total}</Text>
        </View>
      </View>

      {/* Barre de progression globale */}
      <View style={[s.track, { backgroundColor: c.borderLight, marginHorizontal: px }]}>
        <View style={[s.bar, { width: `${(unlockedCount / total) * 100}%` as any, backgroundColor: c.primaryRed }]} />
      </View>

      {/* Filtres par catégorie */}
      <ScrollView
        horizontal showsHorizontalScrollIndicator={false}
        // flexShrink: 0 est le point clé.
        //
        // La FlatList voisine n'avait pas de flex : elle se dimensionnait sur
        // son contenu, donc sur « Toutes » (8 rangées) la colonne débordait et
        // Yoga compressait ses frères. Cette rangée, seul frère compressible,
        // encaissait tout : 52 pt déclarés ramenés à 44 sur « Toutes », 52
        // conservés sur une catégorie. D'où les 8 pt d'écart, mesurés entre les
        // deux captures. Avec flexShrink: 0 ici et flex: 1 sur la liste, la
        // rangée garde sa hauteur quoi qu'il arrive en dessous.
        //
        // La hauteur explicite reste nécessaire : sans elle la ScrollView
        // horizontale se réduit à la hauteur de police et rogne les jambages.
        style={{ flexGrow: 0, flexShrink: 0, height: 44, marginTop: 12 }}
        contentContainerStyle={{ paddingHorizontal: px, gap: 8, paddingVertical: 3, alignItems: 'center' }}
      >
        {(['all', ...CARD_CATEGORIES] as const).map(cat => {
          const active = filter === cat;
          const label = cat === 'all'
            ? t('cards2.all')
            : pick(CATEGORY_META[cat].labelFr, CATEGORY_META[cat].labelEn);
          return (
            <TouchableOpacity
              key={cat}
              onPress={() => pickFilter(cat as CardCategory | 'all')}
              style={[
                s.chip,
                { borderColor: active ? c.primaryRed : c.borderLight, backgroundColor: active ? c.primaryRed + '15' : c.cardBg },
              ]}
            >
              {cat !== 'all' && (
                <Ionicons
                  name={CATEGORY_META[cat].icon as any}
                  size={13}
                  color={active ? c.primaryRed : c.textTertiary}
                />
              )}
              <Text style={[s.chipTxt, { color: active ? c.primaryRed : c.textSecondary }]}>{label}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {loading ? (
        <View style={s.center}><ActivityIndicator color={c.primaryRed} size="large" /></View>
      ) : (
        <FlatList
          ref={listRef}
          // flex: 1 — sinon la liste prend la hauteur de son contenu, déborde
          // de la colonne et écrase la rangée d'onglets au-dessus.
          style={{ flex: 1 }}
          data={data}
          key={cols}
          numColumns={cols}
          keyExtractor={x => x.id}
          contentContainerStyle={{ paddingHorizontal: px, paddingTop: 14, paddingBottom: insets.bottom + 30, gap }}
          columnWrapperStyle={{ gap }}
          ListEmptyComponent={
            <Text style={[s.empty, { color: c.textTertiary }]}>{t('cards2.emptyCategory')}</Text>
          }
          renderItem={({ item }) => (
            <TouchableOpacity
              style={{ width: cardW }}
              activeOpacity={0.85}
              onPress={() => setSelected(item)}
            >
              <CardArt card={item} unlocked={!!unlocked[item.id]} />
              <Text
                style={[s.gridName, { color: unlocked[item.id] ? c.textPrimary : c.textTertiary }]}
                numberOfLines={1}
              >
                {pick(item.nameFr, item.nameEn)}
              </Text>
            </TouchableOpacity>
          )}
        />
      )}

      {/* Fiche détaillée */}
      <CardDetail
        card={selected}
        unlockedAt={selected ? unlocked[selected.id] : undefined}
        snapshot={snapshot}
        onClose={() => setSelected(null)}
        colors={c}
      />
    </SafeAreaView>
  );
}

// ─── Fiche détaillée ──────────────────────────────────────────────────────────

function CardDetail({
  card, unlockedAt, snapshot, onClose, colors,
}: {
  card: CollectibleCard | null;
  unlockedAt?: string;
  snapshot: ReturnType<typeof useCards>['snapshot'];
  onClose: () => void;
  colors: typeof Colors.light;
}) {
  const { t, pick, lang } = useI18n();
  const { height: winH, width: winW } = useWindowDimensions();
  // Vrai pendant qu'on incline la carte : on gèle alors le défilement de la
  // fiche, sinon les deux gestes se disputent le doigt.
  const [tilting, setTilting] = useState(false);
  // Loupe : l'illustration mérite mieux que 200 pt. Parité avec le web.
  const [zoom, setZoom] = useState(false);
  if (!card) return null;

  const isUnlocked = !!unlockedAt;
  const meta = RARITY_META[card.rarity];
  const prog = snapshot ? triggerProgress(card.trigger, snapshot) : { current: 0, target: 1 };
  const pct = Math.min(1, prog.target > 0 ? prog.current / prog.target : 0);

  const dateStr = unlockedAt
    ? new Date(unlockedAt).toLocaleDateString(lang === 'en' ? 'en-US' : 'fr-FR', {
        day: 'numeric', month: 'long', year: 'numeric',
      })
    : '';

  return (
    <Modal visible transparent animationType="fade" onRequestClose={onClose}>
      <View style={d.backdrop}>
        {/* La zone de fermeture est une couche à part, PAS un parent de la
            fiche : un Pressable qui enveloppe une ScrollView capte le toucher
            dès le début et la liste native ne défile plus. C'était la vraie
            cause du blocage, pas la hauteur. */}
        <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />
        {/* Hauteur max en pixels : un maxHeight en pourcentage ne se résout pas
            de façon fiable ici, et la fiche débordait sous l'écran. */}
        <View style={[d.sheet, { backgroundColor: colors.cardBg, maxHeight: winH * 0.86 }]}>
          {/* flexShrink est ce qui manquait : sans lui, la ScrollView prend la
              hauteur de son contenu, se croit entièrement visible et ne défile
              pas — la fiche était simplement rognée par le maxHeight du parent. */}
          <ScrollView
            style={{ flexShrink: 1 }}
            contentContainerStyle={{ paddingBottom: 16 }}
            showsVerticalScrollIndicator
            scrollEnabled={!tilting}
          >
            {/* Bandeau teinté par la rareté : on la ressent avant de la lire */}
            <View style={[d.hero, { backgroundColor: meta.glow + (isUnlocked ? '26' : '14') }]}>
              <View>
                <Card3D
                  style={{ width: 200 }}
                  intensity={card.rarity === 'legendary' ? 2 : card.rarity === 'epic' ? 1.5 : 1}
                  onActive={setTilting}
                >
                  <CardArt card={card} unlocked={isUnlocked} size="detail" />
                </Card3D>
                <TouchableOpacity
                  style={[d.zoomBtn, { backgroundColor: colors.cardBg, borderColor: colors.borderLight }]}
                  onPress={() => setZoom(true)}
                  accessibilityLabel={t('cards2.zoom')}
                  hitSlop={8}
                >
                  <Ionicons name="search" size={16} color={colors.textPrimary} />
                </TouchableOpacity>
              </View>
            </View>

            <View style={d.body}>
              {/* Rareté + catégorie */}
              <View style={d.badges}>
                <View style={[d.badge, { backgroundColor: meta.color + '22', borderColor: meta.color + '55' }]}>
                  <Text style={[d.badgeTxt, { color: meta.color }]}>
                    {pick(meta.labelFr, meta.labelEn)}
                  </Text>
                </View>
                <View style={[d.badge, { backgroundColor: colors.cardBgAlt, borderColor: colors.borderLight }]}>
                  <Ionicons name={CATEGORY_META[card.category].icon as any} size={12} color={colors.textSecondary} />
                  <Text style={[d.badgeTxt, { color: colors.textSecondary }]}>
                    {pick(CATEGORY_META[card.category].labelFr, CATEGORY_META[card.category].labelEn)}
                  </Text>
                </View>
              </View>

              {/* Le nom n'est plus masqué : la silhouette affiche déjà son bandeau,
                  et le principe de la collection est qu'on sache ce qu'on vise. */}
              <Text style={[d.name, { color: colors.textPrimary }]}>
                {pick(card.nameFr, card.nameEn)}
              </Text>
              <Text style={[d.hanzi, { color: colors.textSecondary }]}>
                {card.hanzi} · {card.pinyin}
              </Text>

              {/* Le récit est ce qui donne envie de la décrocher : on le montre
                  aussi quand la carte est encore verrouillée. */}
              <Text style={[d.lore, { color: colors.textSecondary }]}>
                {pick(card.loreFr, card.loreEn)}
              </Text>

              {isUnlocked ? (
                <View style={[d.earned, { backgroundColor: colors.cardBgAlt, borderColor: colors.borderLight }]}>
                  <Ionicons name="checkmark-circle" size={16} color={meta.color} />
                  <Text style={[d.earnedTxt, { color: colors.textSecondary }]}>
                    {t('cards2.unlockedOn', { date: dateStr })}
                  </Text>
                </View>
              ) : (
                <View style={[d.howBox, { backgroundColor: colors.cardBgAlt, borderColor: colors.borderLight }]}>
                  <View style={d.howHead}>
                    <Ionicons name="flag-outline" size={14} color={colors.textTertiary} />
                    <Text style={[d.howTo, { color: colors.textTertiary }]}>{t('cards2.howTo')}</Text>
                  </View>
                  <Text style={[d.req, { color: colors.textPrimary }]}>
                    {pick(card.requirementFr, card.requirementEn)}
                  </Text>
                  <View style={[d.track, { backgroundColor: colors.borderLight }]}>
                    <View style={[d.bar, { width: `${pct * 100}%` as any, backgroundColor: meta.color }]} />
                  </View>
                  <Text style={[d.progTxt, { color: colors.textTertiary }]}>
                    {t('cards2.progress', { current: Math.min(prog.current, prog.target), target: prog.target })}
                  </Text>
                </View>
              )}

              {/* Récompense — toujours affichée : c'est l'enjeu de la carte */}
              <View style={d.xpBox}>
                <Text style={d.xpLabel}>{t('cards2.rewardLabel').toUpperCase()}</Text>
                <Text style={d.xpValue}>{t('cards2.reward', { n: card.xpReward })}</Text>
              </View>
            </View>
          </ScrollView>

          {/* Hors du défilement : le bouton reste atteignable quel que soit
              le contenu, sur les cartes au récit long comme sur les autres. */}
          <View style={[d.footer, { borderTopColor: colors.borderLight }]}>
            <TouchableOpacity style={[d.closeBtn, { backgroundColor: colors.primaryRed }]} onPress={onClose}>
              <Text style={d.closeTxt}>{t('cards2.close')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Vue plein écran de l'illustration — un tap n'importe où referme.
          Calque dans le même Modal plutôt qu'un Modal imbriqué : sur iOS,
          empiler deux Modal donne des animations qui se marchent dessus. */}
      {zoom && (
        <Pressable
          style={[StyleSheet.absoluteFill, d.zoomBackdrop]}
          onPress={() => setZoom(false)}
        >
          <View style={{ width: Math.min(winW - 32, (winH - 140) / 1.5, 420) }}>
            <CardArt card={card} unlocked={isUnlocked} size="detail" />
          </View>
        </Pressable>
      )}
    </Modal>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const s = StyleSheet.create({
  root: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingTop: 8, paddingBottom: 10 },
  backBtn: { width: 38, height: 38, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 22, fontWeight: '800' },
  subtitle: { fontSize: 12, marginTop: 1 },
  counter: { borderRadius: 12, paddingHorizontal: 10, paddingVertical: 5 },
  counterTxt: { fontSize: 13, fontWeight: '800' },
  track: { height: 6, borderRadius: 3, overflow: 'hidden' },
  bar: { height: 6, borderRadius: 3 },
  chip: {
    // Hauteur fixe plutôt que padding vertical : la puce mesure 38 qu'elle
    // contienne une icône ou non (« Toutes » est la seule sans), donc la
    // rangée ne change pas de taille selon l'onglet actif.
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 5,
    height: 38, paddingHorizontal: 14, borderRadius: 20, borderWidth: 1.5,
  },
  chipTxt: { fontSize: 13, fontWeight: '600', lineHeight: 17 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  gridName: { fontSize: 11.5, fontWeight: '600', textAlign: 'center', marginTop: 5 },
  empty: { textAlign: 'center', marginTop: 40, fontSize: 14 },
});

const d = StyleSheet.create({
  backdrop: {
    flex: 1, backgroundColor: 'rgba(0,0,0,0.6)',
    alignItems: 'center', justifyContent: 'center', padding: 24,
  },
  sheet: { width: '100%', maxWidth: 420, borderRadius: 24, overflow: 'hidden', flexShrink: 1 },
  hero: { alignItems: 'center', paddingTop: 22, paddingBottom: 20 },
  zoomBtn: {
    position: 'absolute', right: -10, bottom: -10,
    width: 34, height: 34, borderRadius: 17, borderWidth: 1,
    alignItems: 'center', justifyContent: 'center',
  },
  zoomBackdrop: {
    backgroundColor: 'rgba(0,0,0,0.92)',
    alignItems: 'center', justifyContent: 'center', padding: 16,
  },
  body: { paddingHorizontal: 20, paddingTop: 16, alignItems: 'center', gap: 10 },
  badges: { flexDirection: 'row', gap: 8 },
  badge: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20, borderWidth: 1,
  },
  badgeTxt: { fontSize: 11, fontWeight: '700' },
  name: { fontSize: 22, fontWeight: '800', textAlign: 'center' },
  hanzi: { fontSize: 16, textAlign: 'center', marginTop: -6 },
  lore: { fontSize: 14, lineHeight: 21, textAlign: 'center', fontStyle: 'italic' },
  earned: {
    flexDirection: 'row', alignItems: 'center', gap: 7, alignSelf: 'stretch',
    borderRadius: 14, borderWidth: 1, paddingHorizontal: 14, paddingVertical: 11,
  },
  earnedTxt: { fontSize: 13, fontWeight: '600' },
  howBox: {
    alignSelf: 'stretch', borderRadius: 14, borderWidth: 1,
    paddingHorizontal: 14, paddingVertical: 12, gap: 7,
  },
  howHead: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  howTo: { fontSize: 11, fontWeight: '800', letterSpacing: 0.6 },
  req: { fontSize: 14, lineHeight: 20, fontWeight: '600' },
  track: { height: 8, borderRadius: 4, overflow: 'hidden', marginTop: 3 },
  bar: { height: 8, borderRadius: 4 },
  progTxt: { fontSize: 12, textAlign: 'right' },
  xpBox: {
    alignSelf: 'stretch', borderRadius: 14, borderWidth: 1,
    borderColor: '#F9A82555', backgroundColor: '#F9A82514',
    paddingHorizontal: 14, paddingVertical: 11,
  },
  xpLabel: { fontSize: 10.5, fontWeight: '800', letterSpacing: 0.8, color: '#C98A12' },
  xpValue: { fontSize: 20, fontWeight: '800', color: '#F9A825', marginTop: 1 },
  footer: { paddingHorizontal: 20, paddingTop: 12, paddingBottom: 16, borderTopWidth: 1 },
  closeBtn: { alignSelf: 'stretch', borderRadius: 14, paddingVertical: 13, alignItems: 'center' },
  closeTxt: { color: '#FFF', fontSize: 15, fontWeight: '700' },
});
