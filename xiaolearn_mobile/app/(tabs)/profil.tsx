/**
 * XiaoLearn Mobile — Écran Profil + Réglages
 */
import { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView,
  Switch, Alert, ActivityIndicator, Image,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { updateProfile } from 'firebase/auth';
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '@/firebase/config';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useTheme } from '@/contexts/ThemeContext';
import { useDisplaySettings } from '@/contexts/DisplaySettingsContext';
import { useI18n } from '@/contexts/LanguageContext';
import { BrandGradient, PREMIUM_GRADIENT } from '@/components/BrandGradient';
import Colors from '@/constants/Colors';
import { useAuth } from '@/contexts/AuthContext';
import { useUserStats } from '@/hooks/useUserStats';
import { useEntitlements } from '@/hooks/useEntitlements';
import {
  loadNotifPrefs, enableNotifications, disableNotifications,
} from '@/services/notificationService';
import Constants from 'expo-constants';

type IoniconName = React.ComponentProps<typeof Ionicons>['name'];

function StatCard({ label, value, icon, color }: { label: string; value: string | number; icon: IoniconName; color: string }) {
  const scheme = useColorScheme();
  const c = Colors[scheme];
  return (
    <View style={[styles.statCard, { backgroundColor: c.cardBg, borderColor: c.borderLight }]}>
      <View style={[styles.statIcon, { backgroundColor: color + '18' }]}>
        <Ionicons name={icon} size={20} color={color} />
      </View>
      <Text style={[styles.statValue, { color: c.textPrimary }]}>{value}</Text>
      <Text style={[styles.statLabel, { color: c.textSecondary }]}>{label}</Text>
    </View>
  );
}

function SettingRow({
  icon, label, sublabel, onPress, right, colors,
}: {
  icon: IoniconName;
  label: string;
  sublabel?: string;
  onPress?: () => void;
  right?: React.ReactNode;
  colors: typeof Colors.light;
}) {
  return (
    <TouchableOpacity
      style={[styles.settingRow, { borderBottomColor: colors.borderLight }]}
      onPress={onPress}
      disabled={!onPress && !right}
      activeOpacity={onPress ? 0.6 : 1}
    >
      <View style={[styles.settingIcon, { backgroundColor: colors.cardBgAlt }]}>
        <Ionicons name={icon} size={18} color={colors.textSecondary} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={[styles.settingLabel, { color: colors.textPrimary }]}>{label}</Text>
        {sublabel && <Text style={[styles.settingSubLabel, { color: colors.textTertiary }]}>{sublabel}</Text>}
      </View>
      {right ?? (onPress ? <Ionicons name="chevron-forward" size={16} color={colors.textTertiary} /> : null)}
    </TouchableOpacity>
  );
}

export default function ProfilScreen() {
  const scheme = useColorScheme();
  const c = Colors[scheme];
  const { colorScheme, toggleTheme } = useTheme();
  const { toneColors, showPinyin, setToneColors, setShowPinyin } = useDisplaySettings();
  const isDark = colorScheme === 'dark';
  const { user, signOut, refreshUser } = useAuth();
  const router = useRouter();
  const { stats } = useUserStats();
  const { t, lang, setLang } = useI18n();

  const { isPremium, access } = useEntitlements();
  const [notifEnabled, setNotifEnabled] = useState(false);
  const [notifHour, setNotifHour] = useState(20);
  const [signingOut, setSigningOut] = useState(false);
  // Photo de profil : perso (Firebase Storage) ou Google par défaut
  const [photoURL, setPhotoURL] = useState<string | null>(user?.photoURL ?? null);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  useEffect(() => { setPhotoURL(user?.photoURL ?? null); }, [user?.photoURL]);

  /** Choisir une image dans la galerie → upload Storage → photo de profil. */
  const changeAvatar = async () => {
    if (!user || uploadingPhoto) return;
    try {
      const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!perm.granted) {
        Alert.alert(t('dlg.permDenied'), t('dlg.photoPerm'));
        return;
      }
      const picked = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.6,
      });
      if (picked.canceled || !picked.assets?.[0]?.uri) return;

      setUploadingPhoto(true);
      const resp = await fetch(picked.assets[0].uri);
      const blob = await resp.blob();
      // Même chemin que le web (SettingsPage) → mêmes règles Storage
      const ref = storageRef(storage, `profile-photos/${user.uid}/${Date.now()}.jpg`);
      await uploadBytes(ref, blob, { contentType: 'image/jpeg' });
      const url = await getDownloadURL(ref);
      await updateProfile(user, { photoURL: url });
      setPhotoURL(url);
      // Propager immédiatement au header, menu Plus, etc.
      await refreshUser();
    } catch (e: any) {
      Alert.alert(t('dlg.error'), e?.message ?? t('dlg.photoFailed'));
    } finally {
      setUploadingPhoto(false);
    }
  };

  // Charger les préférences de notif au montage
  useEffect(() => {
    loadNotifPrefs().then(({ enabled, hour }) => {
      setNotifEnabled(enabled);
      setNotifHour(hour);
    });
  }, []);

  async function handleToggleNotif(value: boolean) {
    if (value) {
      const ok = await enableNotifications(notifHour);
      if (!ok) {
        Alert.alert(
          t('dlg.permDenied'),
          t('dlg.notifPerm'),
        );
        return;
      }
    } else {
      await disableNotifications();
    }
    setNotifEnabled(value);
  }

  function handleChangeHour() {
    const hours = [7, 8, 9, 12, 18, 19, 20, 21, 22];
    Alert.alert(
      t('dlg.reminderHour'),
      t('dlg.reminderChoose'),
      hours.map(h => ({
        text: `${h}h00`,
        onPress: async () => {
          setNotifHour(h);
          if (notifEnabled) await enableNotifications(h);
        },
      })),
    );
  }

  const displayName = user?.displayName ?? user?.email?.split('@')[0] ?? t('hard.userFallback');
  const initials = displayName.slice(0, 2).toUpperCase();

  async function handleSignOut() {
    Alert.alert(t('dlg.signOut'), t('dlg.signOutSure'), [
      { text: t('common.cancel'), style: 'cancel' },
      {
        text: t('dlg.signOut'), style: 'destructive', onPress: async () => {
          setSigningOut(true);
          await signOut();
          router.replace('/login');
        }
      },
    ]);
  }

  if (!user) {
    return (
      <SafeAreaView style={[styles.root, { backgroundColor: c.appBg }]}>
        <View style={styles.notLoggedIn}>
          <Text style={[styles.notLoggedInEmoji]}>👤</Text>
          <Text style={[styles.notLoggedInTitle, { color: c.textPrimary }]}>
            {t('profil.notLogged')}
          </Text>
          <TouchableOpacity
            style={[styles.loginBtn, { backgroundColor: c.primaryRed }]}
            onPress={() => router.push('/login')}
          >
            <Text style={styles.loginBtnText}>{t('profil.login')}</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.root, { backgroundColor: c.appBg }]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 32 }}>
        {/* Header */}
        <View style={[styles.profileHeader, { backgroundColor: c.appBg }]}>
          <Text style={[styles.pageTitle, { color: c.textPrimary }]}>{t('profil.title')}</Text>
        </View>

        {/* Avatar + nom */}
        <View style={styles.avatarSection}>
          <TouchableOpacity onPress={changeAvatar} activeOpacity={0.8} disabled={uploadingPhoto}>
            {photoURL ? (
              <Image source={{ uri: photoURL }} style={styles.avatarImg} />
            ) : (
              <View style={[styles.avatarCircle, { backgroundColor: c.primaryRedLight }]}>
                <Text style={[styles.avatarInitials, { color: c.primaryRed }]}>{initials}</Text>
              </View>
            )}
            {/* Badge crayon */}
            <View style={[styles.avatarEditBadge, { backgroundColor: c.primaryRed, borderColor: c.appBg }]}>
              {uploadingPhoto
                ? <ActivityIndicator size="small" color="#FFF" />
                : <Ionicons name="camera" size={13} color="#FFF" />}
            </View>
          </TouchableOpacity>
          <Text style={[styles.userName, { color: c.textPrimary }]}>{displayName}</Text>
          <Text style={[styles.userEmail, { color: c.textSecondary }]}>{user.email}</Text>
          <View style={[styles.levelBadge, { backgroundColor: isPremium ? '#F59E0B' : c.primaryRed }]}>
            <Text style={styles.levelBadgeText}>
              {isPremium ? (access.isLifetime ? t('profil.premiumLife') : t('profil.premium')) : t('profil.free')}
            </Text>
          </View>
        </View>

        {/* Bannière Premium (masquée si déjà premium) */}
        {!isPremium && (
          <TouchableOpacity
            onPress={() => router.push('/abonnement' as any)}
            activeOpacity={0.9}
          >
            <BrandGradient colors={PREMIUM_GRADIENT} style={styles.premiumBanner}>
              <View style={{ flex: 1 }}>
                <Text style={styles.premiumBannerTitle}>{t('profil.goPremium')}</Text>
                <Text style={styles.premiumBannerSub}>{t('profil.goPremiumSub')}</Text>
              </View>
              <Ionicons name="arrow-forward" size={20} color="#FFF" />
            </BrandGradient>
          </TouchableOpacity>
        )}

        {/* Stats */}
        <View style={styles.statsGrid}>
          <StatCard label={t('profil.statXp')} value={stats.xp.toLocaleString()} icon="trophy-outline" color="#FF9800" />
          <StatCard label={t('profil.statStreak')} value={`${stats.streakDays}j`} icon="flame" color="#FF5722" />
          <StatCard label={t('profil.statLessons')} value={stats.completedLessonsCount} icon="book-outline" color="#2196F3" />
          <StatCard label={t('profil.statCards')} value={stats.masteredCards} icon="layers-outline" color={c.jadeGreen} />
        </View>

        {/* Réglages */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: c.textPrimary, marginHorizontal: 16 }]}>{t('profil.settings')}</Text>
          <View style={[styles.settingsCard, { backgroundColor: c.cardBg, borderColor: c.borderLight }]}>
            <SettingRow
              icon="notifications-outline"
              label={t('profil.notifs')}
              sublabel={notifEnabled ? t('profil.notifAt', { h: notifHour }) : t('profil.disabled')}
              colors={c}
              right={
                <Switch
                  value={notifEnabled}
                  onValueChange={handleToggleNotif}
                  trackColor={{ false: '#9AA3AF', true: c.primaryRedLight }}
                  ios_backgroundColor="#9AA3AF"
                  thumbColor={notifEnabled ? c.primaryRed : '#FFF'}
                />
              }
            />
            {notifEnabled && (
              <SettingRow
                icon="time-outline"
                label={t('profil.notifHour')}
                sublabel={t('profil.currently', { h: notifHour })}
                colors={c}
                onPress={handleChangeHour}
              />
            )}
            <SettingRow
              icon="language-outline"
              label={t('profil.language')}
              sublabel={lang === 'fr' ? 'Français' : 'English'}
              colors={c}
              onPress={() => setLang(lang === 'fr' ? 'en' : 'fr')}
              right={
                <View style={{ flexDirection: 'row', gap: 6 }}>
                  {(['fr', 'en'] as const).map(l => (
                    <View key={l} style={{
                      paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8,
                      backgroundColor: lang === l ? c.primaryRed : c.cardBgAlt,
                    }}>
                      <Text style={{ color: lang === l ? '#FFF' : c.textTertiary, fontSize: 12, fontWeight: '700' }}>
                        {l.toUpperCase()}
                      </Text>
                    </View>
                  ))}
                </View>
              }
            />
            <SettingRow
              icon={isDark ? 'sunny-outline' : 'moon-outline'}
              label={t('profil.theme')}
              sublabel={isDark ? t('profil.dark') : t('profil.light')}
              colors={c}
              onPress={toggleTheme}
              right={
                <Switch
                  value={isDark}
                  onValueChange={toggleTheme}
                  trackColor={{ false: '#9AA3AF', true: c.primaryRedLight }}
                  ios_backgroundColor="#9AA3AF"
                  thumbColor={isDark ? c.primaryRed : '#FFF'}
                />
              }
            />
            <SettingRow
              icon="flag-outline"
              label={t('goal.title')}
              sublabel={t('goal.customize')}
              colors={c}
              onPress={() => router.push('/objectifs' as any)}
            />
            <SettingRow
              icon="color-palette-outline"
              label={t('profil.toneColors')}
              sublabel={t('profil.toneColorsSub')}
              colors={c}
              right={
                <Switch
                  value={toneColors}
                  onValueChange={setToneColors}
                  trackColor={{ false: '#9AA3AF', true: c.primaryRedLight }}
                  ios_backgroundColor="#9AA3AF"
                  thumbColor={toneColors ? c.primaryRed : '#FFF'}
                />
              }
            />
            <SettingRow
              icon="star-outline"
              label={t('profil.review')}
              sublabel={t('profil.reviewSub')}
              colors={c}
              onPress={() => router.push('/avis' as any)}
            />
            <SettingRow
              icon="text-outline"
              label={t('profil.showPinyin')}
              sublabel={t('profil.showPinyinSub')}
              colors={c}
              right={
                <Switch
                  value={showPinyin}
                  onValueChange={setShowPinyin}
                  trackColor={{ false: '#9AA3AF', true: c.primaryRedLight }}
                  ios_backgroundColor="#9AA3AF"
                  thumbColor={showPinyin ? c.primaryRed : '#FFF'}
                />
              }
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: c.textPrimary, marginHorizontal: 16 }]}>{t('profil.account')}</Text>
          <View style={[styles.settingsCard, { backgroundColor: c.cardBg, borderColor: c.borderLight }]}>
            <SettingRow
              icon="shield-checkmark-outline"
              label={t('profil.subscription')}
              sublabel={isPremium ? (access.isLifetime ? t('profil.subLife') : t('profil.subActive')) : t('profil.subFree')}
              colors={c}
              onPress={() => router.push('/abonnement' as any)}
            />
            <SettingRow
              icon="help-circle-outline"
              label={t('profil.help')}
              colors={c}
              onPress={() => router.push('/aide' as any)}
            />
            <SettingRow
              icon="body-outline"
              label={t('avatar.edit')}
              colors={c}
              onPress={() => router.push('/avatar' as any)}
            />
            {/* Attribution des sprites — exigée par leur licence */}
            <SettingRow
              icon="information-circle-outline"
              label={t('credits.title')}
              colors={c}
              onPress={() => router.push('/credits' as any)}
            />
            <SettingRow
              icon="log-out-outline"
              label={t('common.signOut')}
              colors={c}
              onPress={handleSignOut}
              right={
                signingOut
                  ? <ActivityIndicator size="small" color={c.primaryRed} />
                  : <Ionicons name="chevron-forward" size={16} color={c.primaryRed} />
              }
            />
            {/* Exigé par App Store 5.1.1(v) : la suppression doit se demander
                depuis l'application, et se trouver sans chercher. */}
            {user && (
              <SettingRow
                icon="trash-outline"
                label={t('del.title')}
                colors={c}
                onPress={() => router.push('/supprimer-compte' as any)}
              />
            )}
          </View>
        </View>

        <Text style={[styles.version, { color: c.textTertiary }]}>
          XiaoLearn Mobile v{Constants.expoConfig?.version ?? '1.0.0'}
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  profileHeader: {
    paddingHorizontal: 16, paddingTop: 4, paddingBottom: 4,
  },
  pageTitle: { fontSize: 24, fontWeight: '700' },

  notLoggedIn: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 32, gap: 16 },
  notLoggedInEmoji: { fontSize: 64 },
  notLoggedInTitle: { fontSize: 18, fontWeight: '600', textAlign: 'center' },
  loginBtn: { paddingHorizontal: 28, paddingVertical: 14, borderRadius: 14 },
  loginBtnText: { color: '#FFF', fontSize: 16, fontWeight: '700' },

  avatarSection: { alignItems: 'center', paddingVertical: 20 },
  avatarCircle: {
    width: 80, height: 80, borderRadius: 40,
    alignItems: 'center', justifyContent: 'center', marginBottom: 12,
  },
  avatarImg: { width: 80, height: 80, borderRadius: 40, marginBottom: 12 },
  avatarEditBadge: {
    position: 'absolute', bottom: 8, right: -2,
    width: 26, height: 26, borderRadius: 13, borderWidth: 2,
    alignItems: 'center', justifyContent: 'center',
  },
  avatarInitials: { fontSize: 32, fontWeight: '700' },
  userName: { fontSize: 22, fontWeight: '700' },
  userEmail: { fontSize: 13, marginTop: 2, marginBottom: 10 },
  levelBadge: { paddingHorizontal: 14, paddingVertical: 5, borderRadius: 20 },
  levelBadgeText: { color: '#FFF', fontSize: 12, fontWeight: '600' },
  premiumBanner: {
    flexDirection: 'row', alignItems: 'center', gap: 12, overflow: 'hidden',
    marginHorizontal: 16, marginTop: 4, marginBottom: 4,
    borderRadius: 16, padding: 16,
  },
  premiumBannerTitle: { color: '#FFF', fontSize: 16, fontWeight: '800' },
  premiumBannerSub: { color: 'rgba(255,255,255,0.9)', fontSize: 12.5, marginTop: 2 },

  statsGrid: {
    flexDirection: 'row', flexWrap: 'wrap', gap: 10,
    paddingHorizontal: 16, marginBottom: 20,
  },
  statCard: {
    width: '47%', borderRadius: 14, borderWidth: 1,
    padding: 14, alignItems: 'center', gap: 4,
  },
  statIcon: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center', marginBottom: 4 },
  statValue: { fontSize: 22, fontWeight: '700' },
  statLabel: { fontSize: 11 },

  section: { marginBottom: 20 },
  sectionTitle: { fontSize: 17, fontWeight: '700', marginBottom: 10 },

  goalCard: { marginHorizontal: 16, borderRadius: 14, borderWidth: 1, padding: 16 },
  goalRow: { flexDirection: 'row', alignItems: 'baseline', gap: 4, marginBottom: 10 },
  goalXp: { fontSize: 28, fontWeight: '700' },
  goalSep: { fontSize: 18 },
  goalTarget: { fontSize: 16 },
  goalTrack: { height: 8, borderRadius: 4, overflow: 'hidden' },
  goalBar: { height: 8, borderRadius: 4 },
  goalDivider: { height: StyleSheet.hairlineWidth, marginTop: 16, marginBottom: 4 },
  goalHint: { fontSize: 11, lineHeight: 15, marginTop: 6 },
  pickerRow: { marginTop: 12, gap: 7 },
  pickerLabel: { fontSize: 12.5, fontWeight: '600' },
  pickerOpts: { flexDirection: 'row', gap: 7 },
  pickerOpt: {
    flex: 1, height: 32, borderRadius: 9, borderWidth: 1.5,
    alignItems: 'center', justifyContent: 'center',
  },
  pickerOptTxt: { fontSize: 12.5, fontWeight: '700' },

  settingsCard: { marginHorizontal: 16, borderRadius: 14, borderWidth: 1, overflow: 'hidden' },
  settingRow: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    paddingHorizontal: 14, paddingVertical: 13, borderBottomWidth: 1,
  },
  settingIcon: { width: 34, height: 34, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  settingLabel: { fontSize: 14, fontWeight: '500' },
  settingSubLabel: { fontSize: 12, marginTop: 1 },

  version: { textAlign: 'center', fontSize: 11, marginTop: 8 },
});
