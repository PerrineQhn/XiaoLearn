/**
 * XiaoLearn Mobile — Avis ⭐
 * Port de ReviewsPage (web) : moyenne + saisie 5 étoiles + commentaire,
 * liste des avis de la communauté (le sien épinglé en haut).
 */
import { useEffect, useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView,
  Image, Alert, ActivityIndicator, KeyboardAvoidingView, Platform, RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useColorScheme } from '@/hooks/useColorScheme';
import Colors from '@/constants/Colors';
import { useAuth } from '@/contexts/AuthContext';
import { useReviews, REVIEW_TEXT_MAX, type Review } from '@/hooks/useReviews';
import { useI18n } from '@/contexts/LanguageContext';

const GOLD = '#F59E0B';

type TFn = (key: any, vars?: Record<string, string | number>) => string;
function timeAgo(iso: string, t: TFn): string {
  const ms = Date.parse(iso);
  if (!Number.isFinite(ms)) return '';
  const diffMin = Math.floor((Date.now() - ms) / 60_000);
  if (diffMin < 1) return t('avis.now');
  if (diffMin < 60) return t('avis.minAgo', { n: diffMin });
  const h = Math.floor(diffMin / 60);
  if (h < 24) return t('avis.hAgo', { n: h });
  const d = Math.floor(h / 24);
  if (d < 30) return d === 1 ? t('avis.dayAgo') : t('avis.daysAgo', { n: d });
  const m = Math.floor(d / 30);
  if (m < 12) return t('avis.monthsAgo', { n: m });
  const y = Math.floor(m / 12);
  return y === 1 ? t('avis.yearAgo') : t('avis.yearsAgo', { n: y });
}

/** Rangée d'étoiles — interactive si onRate fourni. */
function Stars({ rating, size = 18, onRate }: {
  rating: number; size?: number; onRate?: (n: number) => void;
}) {
  return (
    <View style={{ flexDirection: 'row', gap: onRate ? 8 : 2 }}>
      {[1, 2, 3, 4, 5].map(n => (
        <TouchableOpacity key={n} disabled={!onRate} onPress={() => onRate?.(n)} hitSlop={6}>
          <Ionicons
            name={n <= rating ? 'star' : 'star-outline'}
            size={size}
            color={n <= rating ? GOLD : '#9CA3AF'}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
}

function ReviewCard({ review, isMine, colors }: {
  review: Review; isMine: boolean; colors: typeof Colors.light;
}) {
  const { t } = useI18n();
  const name = review.displayName || t('avis.learner');
  return (
    <View style={[s.reviewCard, {
      backgroundColor: colors.cardBg,
      borderColor: isMine ? colors.primaryRed + '60' : colors.borderLight,
    }]}>
      <View style={s.reviewHead}>
        {review.photoURL ? (
          <Image source={{ uri: review.photoURL }} style={s.reviewAvatar} />
        ) : (
          <View style={[s.reviewAvatar, { backgroundColor: colors.primaryRedLight, alignItems: 'center', justifyContent: 'center' }]}>
            <Text style={{ color: colors.primaryRed, fontWeight: '700' }}>{name[0]?.toUpperCase() ?? '?'}</Text>
          </View>
        )}
        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
            <Text style={[s.reviewName, { color: colors.textPrimary }]} numberOfLines={1}>{name}</Text>
            {isMine && (
              <View style={[s.mineBadge, { backgroundColor: colors.primaryRedLight }]}>
                <Text style={[s.mineBadgeTxt, { color: colors.primaryRed }]}>{t('avis.yourReviewBadge')}</Text>
              </View>
            )}
          </View>
          <Text style={[s.reviewDate, { color: colors.textTertiary }]}>{timeAgo(review.updatedAt, t)}</Text>
        </View>
        <Stars rating={review.rating} size={14} />
      </View>
      {review.text ? (
        <Text style={[s.reviewText, { color: colors.textSecondary }]}>{review.text}</Text>
      ) : null}
    </View>
  );
}

export default function AvisScreen() {
  const scheme = useColorScheme();
  const c = Colors[scheme];
  const router = useRouter();
  const { user } = useAuth();
  const { t } = useI18n();
  const {
    reviews, myReview, loading, saving, error,
    averageRating, count, refresh, submitReview, deleteReview,
  } = useReviews();

  const [rating, setRating] = useState(0);
  const [text, setText] = useState('');
  const [saved, setSaved] = useState(false);

  // Pré-remplir avec son avis existant
  useEffect(() => {
    if (myReview) { setRating(myReview.rating); setText(myReview.text); }
  }, [myReview]);

  const goBack = () => router.canGoBack() ? router.back() : router.replace('/(tabs)' as any);

  const handleSubmit = async () => {
    if (rating < 1) { Alert.alert(t('avis.chooseRating'), t('avis.chooseRatingMsg')); return; }
    const ok = await submitReview(rating, text);
    if (ok) { setSaved(true); setTimeout(() => setSaved(false), 2500); }
  };

  const handleDelete = () => {
    Alert.alert(t('avis.deleteConfirm'), '', [
      { text: t('avis.cancel'), style: 'cancel' },
      {
        text: t('avis.delete'), style: 'destructive',
        onPress: async () => {
          const ok = await deleteReview();
          if (ok) { setRating(0); setText(''); }
        },
      },
    ]);
  };

  // Le sien épinglé en haut, puis les autres (déjà triés par updatedAt desc)
  const others = reviews.filter(r => r.uid !== user?.uid);

  return (
    <SafeAreaView style={[s.root, { backgroundColor: c.appBg }]}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        {/* Header */}
        <View style={s.header}>
          <TouchableOpacity onPress={goBack} style={s.backBtn}>
            <Ionicons name="arrow-back" size={22} color={c.textPrimary} />
          </TouchableOpacity>
          <Text style={[s.headerTitle, { color: c.textPrimary }]}>{t('avis.title')}</Text>
          <View style={{ width: 38 }} />
        </View>

        <ScrollView
          contentContainerStyle={{ padding: 16, paddingBottom: 60, gap: 16 }}
          keyboardShouldPersistTaps="handled"
          refreshControl={<RefreshControl refreshing={loading} onRefresh={refresh} tintColor={c.primaryRed} />}
        >
          {/* Résumé */}
          <View style={[s.summary, { backgroundColor: c.cardBg, borderColor: c.borderLight }]}>
            <Text style={[s.summarySub, { color: c.textSecondary }]}>{t('avis.communityThinks')}</Text>
            {count > 0 ? (
              <View style={s.summaryRow}>
                <Text style={[s.summaryAvg, { color: c.textPrimary }]}>{averageRating.toFixed(1)}</Text>
                <View>
                  <Stars rating={Math.round(averageRating)} size={16} />
                  <Text style={[s.summaryCount, { color: c.textTertiary }]}>{t('avis.reviewsCount', { n: count })}</Text>
                </View>
              </View>
            ) : (
              <Text style={[s.summaryCount, { color: c.textTertiary }]}>{t('avis.noRating')}</Text>
            )}
          </View>

          {/* Ton avis */}
          <View style={[s.mySection, { backgroundColor: c.cardBg, borderColor: c.borderLight }]}>
            <Text style={[s.mySectionTitle, { color: c.textPrimary }]}>{t('avis.yourReview')}</Text>
            {!user ? (
              <TouchableOpacity onPress={() => router.push('/login')}>
                <Text style={{ color: c.primaryRed, fontWeight: '600' }}>{t('avis.signInToReview')}</Text>
              </TouchableOpacity>
            ) : (
              <>
                <Stars rating={rating} size={30} onRate={setRating} />
                <TextInput
                  style={[s.input, { backgroundColor: c.appBg, borderColor: c.borderMedium, color: c.textPrimary }]}
                  placeholder={t('avis.placeholder')}
                  placeholderTextColor={c.textTertiary}
                  value={text}
                  onChangeText={v => setText(v.slice(0, REVIEW_TEXT_MAX))}
                  multiline
                  maxLength={REVIEW_TEXT_MAX}
                />
                <Text style={[s.charCount, { color: c.textTertiary }]}>{text.length}/{REVIEW_TEXT_MAX}</Text>
                <View style={s.actionRow}>
                  {myReview && (
                    <TouchableOpacity
                      style={[s.deleteBtn, { borderColor: c.borderMedium }]}
                      onPress={handleDelete}
                      disabled={saving}
                    >
                      <Ionicons name="trash-outline" size={16} color={c.textSecondary} />
                    </TouchableOpacity>
                  )}
                  <TouchableOpacity
                    style={[s.submitBtn, { backgroundColor: rating > 0 ? c.primaryRed : c.borderMedium }]}
                    onPress={handleSubmit}
                    disabled={saving || rating < 1}
                  >
                    {saving
                      ? <ActivityIndicator size="small" color="#FFF" />
                      : <Text style={s.submitTxt}>{myReview ? t('avis.update') : t('avis.publish')}</Text>}
                  </TouchableOpacity>
                </View>
                {saved && <Text style={{ color: '#4CAF50', fontWeight: '700', fontSize: 13 }}>{t('avis.thanks')}</Text>}
                {error && error !== 'not-signed-in' && (
                  <Text style={{ color: '#EF4444', fontSize: 12 }}>{error}</Text>
                )}
              </>
            )}
          </View>

          {/* Liste des avis */}
          {loading && reviews.length === 0 ? (
            <ActivityIndicator color={c.primaryRed} style={{ marginTop: 20 }} />
          ) : reviews.length === 0 ? (
            <Text style={[s.empty, { color: c.textTertiary }]}>{t('avis.empty')}</Text>
          ) : (
            <View style={{ gap: 10 }}>
              {myReview && <ReviewCard review={myReview} isMine colors={c} />}
              {others.map(r => <ReviewCard key={r.uid} review={r} isMine={false} colors={c} />)}
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  root: { flex: 1 },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 16, paddingTop: 8, paddingBottom: 12,
  },
  backBtn: { width: 38, height: 38, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontSize: 18, fontWeight: '700' },

  summary: { borderRadius: 16, borderWidth: 1, padding: 16, gap: 8 },
  summarySub: { fontSize: 13 },
  summaryRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  summaryAvg: { fontSize: 36, fontWeight: '900' },
  summaryCount: { fontSize: 12, marginTop: 2 },

  mySection: { borderRadius: 16, borderWidth: 1, padding: 16, gap: 12 },
  mySectionTitle: { fontSize: 15, fontWeight: '800' },
  input: {
    borderRadius: 12, borderWidth: 1, padding: 12, fontSize: 14,
    minHeight: 90, textAlignVertical: 'top',
  },
  charCount: { fontSize: 11, textAlign: 'right', marginTop: -6 },
  actionRow: { flexDirection: 'row', gap: 10, alignItems: 'center' },
  deleteBtn: {
    width: 44, height: 44, borderRadius: 12, borderWidth: 1.2,
    alignItems: 'center', justifyContent: 'center',
  },
  submitBtn: {
    flex: 1, height: 44, borderRadius: 12,
    alignItems: 'center', justifyContent: 'center',
  },
  submitTxt: { color: '#FFF', fontSize: 15, fontWeight: '700' },

  reviewCard: { borderRadius: 14, borderWidth: 1, padding: 14, gap: 10 },
  reviewHead: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  reviewAvatar: { width: 36, height: 36, borderRadius: 18 },
  reviewName: { fontSize: 14, fontWeight: '700', flexShrink: 1 },
  reviewDate: { fontSize: 11, marginTop: 1 },
  mineBadge: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 10 },
  mineBadgeTxt: { fontSize: 10, fontWeight: '800' },
  reviewText: { fontSize: 13.5, lineHeight: 20 },

  empty: { textAlign: 'center', marginTop: 24, fontSize: 14 },
});
