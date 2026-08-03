/**
 * XiaoLearn Mobile — Classement
 * Tableau des scores XP communautaire (Firestore leaderboard)
 */
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  ActivityIndicator, useWindowDimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useColorScheme } from '@/hooks/useColorScheme';
import Colors from '@/constants/Colors';
import { useLeaderboard } from '@/hooks/useLeaderboard';
import { useAuth } from '@/contexts/AuthContext';
import { useI18n } from '@/contexts/LanguageContext';

const RANK_COLORS = ['#FFD700', '#C0C0C0', '#CD7F32'];

export default function ClassementScreen() {
  const scheme = useColorScheme();
  const c = Colors[scheme];
  const router = useRouter();
  const { width } = useWindowDimensions();
  const px = width >= 768 ? 24 : 16;
  const { user } = useAuth();
  const { t } = useI18n();
  const { entries, loading, error } = useLeaderboard(50);

  // Renommer l'entrée "moi" pour afficher "(toi)"
  const sorted = entries.map(e =>
    e.isMe ? { ...e, name: `${e.name} ${t('rank.you')}` } : e
  );

  return (
    <SafeAreaView style={[s.root, { backgroundColor: c.appBg }]}>
      {/* Header */}
      <View style={[s.header, { paddingHorizontal: px }]}>
        <TouchableOpacity onPress={() => router.canGoBack() ? router.back() : router.replace('/(tabs)')} style={s.backBtn}>
          <Ionicons name="arrow-back" size={22} color={c.textPrimary} />
        </TouchableOpacity>
        <Text style={[s.title, { color: c.textPrimary }]}>{t('rank.title')}</Text>
        <View style={{ width: 38 }} />
      </View>

      {/* État chargement / erreur / vide */}
      {loading && (
        <View style={s.center}>
          <ActivityIndicator size="large" color={c.primaryRed} />
          <Text style={[s.hint, { color: c.textTertiary, marginTop: 12 }]}>{t('rank.loading')}</Text>
        </View>
      )}

      {!loading && error && (
        <View style={s.center}>
          <Ionicons name="cloud-offline-outline" size={40} color={c.textTertiary} />
          <Text style={[s.hint, { color: c.textTertiary, marginTop: 12 }]}>{t('rank.errorTitle')}</Text>
          <Text style={[s.hint, { color: c.textTertiary, fontSize: 11 }]}>{t('rank.errorSub')}</Text>
        </View>
      )}

      {!loading && !error && sorted.length === 0 && (
        <View style={s.center}>
          <Ionicons name="trophy-outline" size={40} color={c.textTertiary} />
          <Text style={[s.hint, { color: c.textTertiary, marginTop: 12 }]}>{t('rank.emptyTitle')}</Text>
          <Text style={[s.hint, { color: c.textTertiary, fontSize: 11 }]}>{t('rank.emptySub')}</Text>
        </View>
      )}

      {!loading && !error && sorted.length > 0 && (<>
        {/* Podium top 3 */}
        <View style={[s.podiumCard, { marginHorizontal: px, backgroundColor: c.cardBg, borderColor: c.borderLight }]}>
          <View style={s.podiumRow}>
            {[sorted[1], sorted[0], sorted[2]].map((entry, i) => {
              if (!entry) return null;
              const podiumRank = i === 1 ? 1 : i === 0 ? 2 : 3;
              const isFirst = podiumRank === 1;
              const col = RANK_COLORS[podiumRank - 1];
              return (
                <View key={entry.uid} style={[s.podiumItem, isFirst && { marginBottom: -8 }]}>
                  {isFirst && <Text style={s.crown}>👑</Text>}
                  <View style={[s.podiumAvatar, { backgroundColor: col + '20', borderColor: col, width: isFirst ? 52 : 44, height: isFirst ? 52 : 44, borderRadius: isFirst ? 26 : 22 }]}>
                    <Text style={[s.podiumAvatarTxt, { color: col, fontSize: isFirst ? 20 : 16 }]}>{entry.avatar}</Text>
                  </View>
                  <Text style={[s.podiumName, { color: entry.isMe ? c.primaryRed : c.textPrimary, fontSize: isFirst ? 12 : 11 }]} numberOfLines={1}>{entry.name}</Text>
                  <Text style={[s.podiumXp, { color: col }]}>{entry.xp.toLocaleString()} XP</Text>
                  <View style={[s.podiumRankBadge, { backgroundColor: col, height: isFirst ? 36 : 26 }]}>
                    <Text style={s.podiumRankTxt}>#{podiumRank}</Text>
                  </View>
                </View>
              );
            })}
          </View>
        </View>

        {/* Reste du classement */}
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: px, paddingBottom: 40, marginTop: 16, gap: 8 }}>
          {sorted.slice(3).map(entry => (
            <View
              key={entry.uid}
              style={[s.row, {
                backgroundColor: entry.isMe ? c.primaryRedLight : c.cardBg,
                borderColor: entry.isMe ? c.primaryRed + '40' : c.borderLight,
              }]}
            >
              <Text style={[s.rankNum, { color: entry.isMe ? c.primaryRed : c.textTertiary }]}>#{entry.rank}</Text>
              <View style={[s.avatar, { backgroundColor: entry.isMe ? c.primaryRed : c.cardBgAlt }]}>
                <Text style={[s.avatarTxt, { color: entry.isMe ? '#FFF' : c.textSecondary }]}>{entry.avatar}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={[s.name, { color: entry.isMe ? c.primaryRed : c.textPrimary }]} numberOfLines={1}>{entry.name}</Text>
                <View style={s.metaRow}>
                  <Ionicons name="flame" size={12} color="#FF6B35" />
                  <Text style={[s.meta, { color: c.textTertiary }]}>{entry.streakDays}{t('rank.dayShort')}</Text>
                  <Text style={[s.levelBadge, { backgroundColor: c.cardBgAlt, color: c.textTertiary }]}>{entry.level}</Text>
                </View>
              </View>
              <Text style={[s.xp, { color: entry.isMe ? c.primaryRed : c.textPrimary }]}>{entry.xp.toLocaleString()} XP</Text>
            </View>
          ))}
        </ScrollView>
      </>)}
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  root: { flex: 1 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 4, paddingBottom: 60 },
  hint: { fontSize: 14, textAlign: 'center', paddingHorizontal: 32 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: 8, paddingBottom: 16 },
  backBtn: { width: 38, height: 38, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 18, fontWeight: '700' },
  podiumCard: { borderRadius: 20, borderWidth: 1, padding: 16, marginBottom: 4 },
  podiumRow: { flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'center', gap: 16 },
  podiumItem: { alignItems: 'center', flex: 1 },
  crown: { fontSize: 18, marginBottom: 2 },
  podiumAvatar: { borderWidth: 2, alignItems: 'center', justifyContent: 'center', marginBottom: 6 },
  podiumAvatarTxt: { fontWeight: '800' },
  podiumName: { fontWeight: '600', textAlign: 'center', marginBottom: 2 },
  podiumXp: { fontSize: 11, fontWeight: '700', marginBottom: 4 },
  podiumRankBadge: { width: '100%', borderRadius: 0, alignItems: 'center', justifyContent: 'center', borderBottomLeftRadius: 8, borderBottomRightRadius: 8 },
  podiumRankTxt: { color: '#FFF', fontWeight: '800', fontSize: 12 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12, borderRadius: 14, borderWidth: 1, padding: 12 },
  rankNum: { width: 28, fontSize: 13, fontWeight: '700', textAlign: 'center' },
  avatar: { width: 38, height: 38, borderRadius: 19, alignItems: 'center', justifyContent: 'center' },
  avatarTxt: { fontSize: 15, fontWeight: '700' },
  name: { fontSize: 13, fontWeight: '600', marginBottom: 2 },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  meta: { fontSize: 11 },
  levelBadge: { paddingHorizontal: 6, paddingVertical: 1, borderRadius: 6, fontSize: 10, fontWeight: '700', overflow: 'hidden' },
  xp: { fontSize: 13, fontWeight: '700' },
});
