/**
 * CatalogUI — le vocabulaire visuel commun à Lectures et Dialogues.
 *
 * Les deux écrans racontent la même chose : un catalogue de contenus classés
 * par niveau, que l'on parcourt une fois (lire / écouter) puis que l'on valide
 * (quiz). Ils avaient pourtant deux mises en page distinctes, et deux défauts
 * partagés :
 *
 *   - onze pastilles de niveau alignées, dont on ne voit que les premières ;
 *   - un état de progression écrit en badges qui n'apparaissent qu'une fois
 *     le contenu ouvert, si bien qu'une liste neuve est un mur de cartes
 *     identiques, avec une rangée vide sous chacune.
 *
 * Trois pièces ici, utilisées par les deux écrans :
 *
 *   `CatalogProgress` — l'avancement global en une barre à deux segments
 *     (parcouru, validé), plutôt qu'en trois nombres qu'il faut rapprocher.
 *   `LevelFilter` — les niveaux en deux temps : d'abord la tranche (A, B, C),
 *     puis ses paliers. Sept pastilles au maximum au lieu de onze, et la
 *     tranche courante reste visible.
 *   `CatalogCard` — une carte dont l'état se lit d'un coup d'œil : pastille
 *     de droite et liseré coloré en pied de carte. Rien ne s'affiche « en
 *     creux » quand le contenu n'a pas encore été ouvert.
 */
import { View, Text, StyleSheet, TouchableOpacity, type ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { FilterChipRow } from '@/components/FilterChipRow';

/** Un niveau = une couleur, où qu'on le croise dans l'app. */
export const LEVEL_COLORS: Record<string, string> = {
  a1: '#4CAF50', a2: '#8BC34A',
  'b1.1': '#F9A825', 'b1.2': '#FB8C00',
  'b2.1': '#F44336', 'b2.2': '#E91E63',
  'c1.1': '#9C27B0', 'c1.2': '#673AB7',
  'c2.1': '#3F51B5', 'c2.2': '#2196F3',
};

/** Couleur de la tranche, pour l'onglet qui la représente. */
export const BAND_COLORS: Record<Band, string> = {
  a: '#4CAF50', b: '#FB8C00', c: '#673AB7',
};

export type Band = 'a' | 'b' | 'c';
export const bandOf = (level: string): Band =>
  (level[0] === 'a' ? 'a' : level[0] === 'b' ? 'b' : 'c');

/** État d'un contenu du catalogue — l'ordre est celui de la progression. */
export type CatalogState = 'new' | 'seen' | 'done';

const DONE = '#4CAF50';
const SEEN = '#2196F3';

// ---------------------------------------------------------------------------
// Avancement global
// ---------------------------------------------------------------------------

/**
 * Une phrase et une barre : « 12 sur 40 parcourus, 5 validés ».
 *
 * Les trois compteurs séparés obligeaient à faire le rapprochement soi-même
 * (« 2 lus sur 20, c'est peu ou beaucoup ? »). La barre le montre.
 */
export function CatalogProgress({
  seen, done, total, labelSeen, labelDone, gutter,
}: {
  seen: number;
  done: number;
  total: number;
  /** « parcourus » / « écoutés » selon l'écran. */
  labelSeen: string;
  labelDone: string;
  gutter: number;
}) {
  const c = Colors[useColorScheme()];
  const pctSeen = total ? Math.round((seen / total) * 100) : 0;
  const pctDone = total ? Math.round((done / total) * 100) : 0;

  return (
    <View style={[s.progWrap, { marginHorizontal: gutter }]}>
      <View style={s.progHead}>
        <Text style={[s.progMain, { color: c.textPrimary }]}>
          {seen}
          <Text style={[s.progTotal, { color: c.textTertiary }]}>{` / ${total}`}</Text>
          <Text style={[s.progLabel, { color: c.textSecondary }]}>{`  ${labelSeen}`}</Text>
        </Text>
        <View style={s.progDone}>
          <Ionicons name="checkmark-circle" size={14} color={DONE} />
          <Text style={[s.progDoneTxt, { color: DONE }]}>{`${done} ${labelDone}`}</Text>
        </View>
      </View>

      {/* Deux segments empilés : le validé se lit dans le parcouru, il n'est
          pas une catégorie à côté. */}
      <View style={[s.track, { backgroundColor: c.cardBgAlt }]}>
        <View style={[s.fill, { width: `${pctSeen}%`, backgroundColor: SEEN + '99' }]} />
        <View style={[s.fill, s.fillTop, { width: `${pctDone}%`, backgroundColor: DONE }]} />
      </View>
    </View>
  );
}

// ---------------------------------------------------------------------------
// Filtres de niveau, en deux temps
// ---------------------------------------------------------------------------

/**
 * Tranche puis palier. Les paliers de la tranche choisie n'apparaissent que
 * si elle en compte plusieurs — inutile d'afficher « B1.1 B1.2 B2.1 B2.2 »
 * quand on vient de demander « tout le B ».
 */
export function LevelFilter<L extends string>({
  levels, value, onChange, counts, gutter, allLabel,
}: {
  /** Niveaux réellement présents, dans l'ordre du CECR. */
  levels: L[];
  value: L | 'all';
  onChange: (v: L | 'all') => void;
  counts: Record<string, number>;
  gutter: number;
  allLabel: string;
}) {
  const c = Colors[useColorScheme()];

  const bands = ['a', 'b', 'c'].filter(b =>
    levels.some(l => bandOf(l) === b)) as Band[];
  const bandCount = (b: Band) =>
    levels.filter(l => bandOf(l) === b).reduce((n, l) => n + (counts[l] ?? 0), 0);

  // La tranche affichée découle du niveau choisi : sélectionner B1.2 laisse la
  // rangée du B ouverte, revenir sur « Tous » la referme.
  const openBand: Band | null = value === 'all' ? null : bandOf(value);
  const sub = openBand ? levels.filter(l => bandOf(l) === openBand) : [];

  const chip = (
    key: string, label: string, n: number, on: boolean, accent: string, onPress: () => void,
  ) => (
    <TouchableOpacity
      key={key}
      onPress={onPress}
      activeOpacity={0.7}
      style={[s.chip, {
        backgroundColor: on ? accent + '1E' : c.cardBg,
        borderColor: on ? accent : c.borderLight,
      }]}
    >
      <Text style={[s.chipTxt, { color: on ? accent : c.textSecondary }]}>
        {label}
        <Text style={{ color: on ? accent + 'AA' : c.textTertiary }}>{`  ${n}`}</Text>
      </Text>
    </TouchableOpacity>
  );

  return (
    <>
      <FilterChipRow gutter={gutter} height={50} marginTop={14}>
        {chip('all', allLabel, counts.all ?? 0, value === 'all', c.primaryRed, () => onChange('all'))}
        {bands.map(b => {
          // Cliquer sur une tranche ouvre son premier palier : le filtre reste
          // toujours sur un niveau précis, la tranche n'est qu'un raccourci.
          const first = levels.find(l => bandOf(l) === b)!;
          return chip(
            b, b.toUpperCase(), bandCount(b), openBand === b, BAND_COLORS[b],
            () => onChange(openBand === b ? 'all' : first),
          );
        })}
      </FilterChipRow>

      {sub.length > 1 && (
        <FilterChipRow gutter={gutter} height={44} marginTop={6} marginBottom={6}>
          {sub.map(l => chip(
            l, l.toUpperCase(), counts[l] ?? 0, value === l,
            LEVEL_COLORS[l] ?? c.primaryRed, () => onChange(l),
          ))}
        </FilterChipRow>
      )}
    </>
  );
}

// ---------------------------------------------------------------------------
// Carte de catalogue
// ---------------------------------------------------------------------------

/**
 * Une carte = un contenu. Trois informations, dans cet ordre de lecture :
 * de quoi ça parle (émoji + titre), à quel niveau (badge coloré), et où on
 * en est (pastille de droite + liseré en pied).
 */
export function CatalogCard({
  emoji, level, theme, metas, titleZh, titleFr, state, doneLabel, onPress, style,
}: {
  emoji: string;
  level: string;
  theme: string;
  /** Compléments courts : durée, nombre de répliques… avec leur icône. */
  metas: { icon: React.ComponentProps<typeof Ionicons>['name']; text: string }[];
  titleZh: string;
  titleFr: string;
  state: CatalogState;
  /** Score à afficher sur la pastille verte, ex. « 4/5 ». */
  doneLabel?: string;
  onPress: () => void;
  style?: ViewStyle;
}) {
  const c = Colors[useColorScheme()];
  const accent = LEVEL_COLORS[level] ?? c.primaryRed;

  return (
    <TouchableOpacity
      style={[s.card, { backgroundColor: c.cardBg, borderColor: c.borderLight }, style]}
      activeOpacity={0.75}
      onPress={onPress}
    >
      <View style={s.cardBody}>
        <View style={[s.tile, { backgroundColor: accent + '1A', borderColor: accent + '33' }]}>
          <Text style={s.tileTxt}>{emoji}</Text>
        </View>

        <View style={s.cardMain}>
          <View style={s.metaRow}>
            <View style={[s.lvlBadge, { backgroundColor: accent + '20', borderColor: accent + '55' }]}>
              <Text style={[s.lvlTxt, { color: accent }]}>{level.toUpperCase()}</Text>
            </View>
            <Text style={[s.theme, { color: c.textTertiary }]} numberOfLines={1}>{theme}</Text>
            {metas.map(m => (
              <View key={m.text} style={s.meta}>
                <Ionicons name={m.icon} size={11} color={c.textTertiary} />
                <Text style={[s.metaTxt, { color: c.textTertiary }]}>{m.text}</Text>
              </View>
            ))}
          </View>

          <Text style={[s.titleZh, { color: c.textPrimary }]} numberOfLines={1}>{titleZh}</Text>
          <Text style={[s.titleFr, { color: c.textSecondary }]} numberOfLines={1}>{titleFr}</Text>
        </View>

        <StatePill state={state} label={doneLabel} />
      </View>

      {/* Liseré d'état : discret, mais il donne le rythme de la liste quand on
          la fait défiler — on voit d'un trait où l'on s'est arrêté. */}
      {state !== 'new' && (
        <View style={[s.rule, { backgroundColor: state === 'done' ? DONE : SEEN }]} />
      )}
    </TouchableOpacity>
  );
}

/** Pastille de droite : chevron, casque bleu, ou coche verte avec le score. */
function StatePill({ state, label }: { state: CatalogState; label?: string }) {
  const c = Colors[useColorScheme()];

  if (state === 'new') {
    return <Ionicons name="chevron-forward" size={18} color={c.textTertiary} style={s.pillIcon} />;
  }
  if (state === 'seen') {
    return (
      <View style={[s.pill, { backgroundColor: SEEN + '1F' }]}>
        <Ionicons name="ellipse-outline" size={13} color={SEEN} />
      </View>
    );
  }
  return (
    <View style={[s.pill, s.pillDone, { backgroundColor: DONE + '1F' }]}>
      <Ionicons name="checkmark" size={13} color={DONE} />
      {!!label && <Text style={[s.pillTxt, { color: DONE }]}>{label}</Text>}
    </View>
  );
}

const s = StyleSheet.create({
  // Avancement
  progWrap: { marginTop: 10, gap: 8 },
  progHead: { flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between' },
  progMain: { fontSize: 22, fontWeight: '800' },
  progTotal: { fontSize: 15, fontWeight: '700' },
  progLabel: { fontSize: 13, fontWeight: '600' },
  progDone: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingBottom: 2 },
  progDoneTxt: { fontSize: 12.5, fontWeight: '700' },
  track: { height: 6, borderRadius: 3, overflow: 'hidden' },
  fill: { height: '100%', borderRadius: 3 },
  fillTop: { position: 'absolute', left: 0, top: 0 },

  // Filtres
  chip: { paddingHorizontal: 14, paddingVertical: 9, borderRadius: 20, borderWidth: 1.5 },
  chipTxt: { fontSize: 13, fontWeight: '700', lineHeight: 17 },

  // Carte
  card: { borderRadius: 16, borderWidth: 1, overflow: 'hidden' },
  cardBody: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 13 },
  tile: {
    width: 46, height: 46, borderRadius: 13, borderWidth: 1,
    alignItems: 'center', justifyContent: 'center',
  },
  tileTxt: { fontSize: 23, lineHeight: 28 },
  cardMain: { flex: 1, gap: 1 },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: 7, marginBottom: 3 },
  lvlBadge: { borderRadius: 6, borderWidth: 1, paddingHorizontal: 6, paddingVertical: 1 },
  lvlTxt: { fontSize: 10, fontWeight: '800', letterSpacing: 0.2 },
  theme: {
    fontSize: 10.5, fontWeight: '700', textTransform: 'uppercase',
    letterSpacing: 0.5, flexShrink: 1,
  },
  meta: { flexDirection: 'row', alignItems: 'center', gap: 3 },
  metaTxt: { fontSize: 11 },
  titleZh: { fontSize: 17.5, fontWeight: '600', letterSpacing: 0.5 },
  titleFr: { fontSize: 12.5, fontWeight: '500' },

  pillIcon: { marginRight: 2 },
  pill: {
    minWidth: 28, height: 26, borderRadius: 13,
    alignItems: 'center', justifyContent: 'center', paddingHorizontal: 7,
  },
  pillDone: { flexDirection: 'row', gap: 3 },
  pillTxt: { fontSize: 11.5, fontWeight: '800' },

  rule: { height: 3, width: '100%' },
});
