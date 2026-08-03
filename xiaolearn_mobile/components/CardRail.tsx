/**
 * CardRail — bandeau horizontal des dernières cartes obtenues, pour l'accueil.
 * Montre aussi la prochaine carte à débloquer, pour donner un objectif.
 */
import { useCallback, useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useFocusEffect } from 'expo-router';
import Colors from '@/constants/Colors';
import { useI18n } from '@/contexts/LanguageContext';
import { useCards, triggerProgress } from '@/hooks/useCards';
import { CardArt } from '@/components/CardArt';
import { CARDS } from '@/data/cards';

export function CardRail({ colors, px = 16 }: { colors: typeof Colors.light; px?: number }) {
  const router = useRouter();
  const { t, pick } = useI18n();
  const { unlocked, unlockedCount, total, snapshot, reload } = useCards();

  useFocusEffect(useCallback(() => { void reload(); }, [reload]));

  // Tout le catalogue, dans l'ordre qui raconte quelque chose : les cartes
  // obtenues d'abord (plus récentes en tête), puis celles dont on se rapproche
  // le plus. La rangée devient à la fois un trophée et une liste d'objectifs.
  const ordered = useMemo(() => {
    const owned = CARDS
      .filter(c => unlocked[c.id])
      .sort((a, b) => (unlocked[b.id] ?? '').localeCompare(unlocked[a.id] ?? ''));

    const locked = CARDS
      .filter(c => !unlocked[c.id])
      .map(c => {
        const p = snapshot ? triggerProgress(c.trigger, snapshot) : { current: 0, target: 1 };
        return { card: c, ratio: p.target > 0 ? p.current / p.target : 0 };
      })
      .sort((a, b) => b.ratio - a.ratio)
      .map(x => x.card);

    return [...owned, ...locked];
  }, [unlocked, snapshot]);

  return (
    <View>
      <View style={[s.head, { paddingHorizontal: px }]}>
        <Text style={[s.title, { color: colors.textPrimary }]}>{t('cards2.collection')}</Text>
        <TouchableOpacity style={s.link} onPress={() => router.push('/collection' as any)}>
          <Text style={[s.linkTxt, { color: colors.primaryRed }]}>{unlockedCount}/{total}</Text>
          <Ionicons name="chevron-forward" size={14} color={colors.primaryRed} />
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: px, gap: 10, paddingVertical: 8 }}
      >
        {ordered.map(card => (
          <TouchableOpacity
            key={card.id}
            style={{ width: 74 }}
            activeOpacity={0.85}
            onPress={() => router.push('/collection' as any)}
          >
            <CardArt card={card} unlocked={!!unlocked[card.id]} />
          </TouchableOpacity>
        ))}

        {ordered.length === 0 && (
          <Text style={[s.empty, { color: colors.textTertiary }]}>{t('cards2.seeCollection')}</Text>
        )}
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  head: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  title: { fontSize: 17, fontWeight: '700' },
  link: { flexDirection: 'row', alignItems: 'center', gap: 2 },
  linkTxt: { fontSize: 13, fontWeight: '700' },
  empty: { fontSize: 13, paddingVertical: 20 },
});
