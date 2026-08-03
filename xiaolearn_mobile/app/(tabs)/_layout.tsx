import { useState, useEffect, useRef } from 'react';
import { Tabs, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import {
  View, Text, StyleSheet, TouchableOpacity, Platform,
  Modal, ScrollView, Switch, Pressable, Animated, PanResponder, Image,
} from 'react-native';
import { useSwipeToDismiss } from '@/hooks/useSwipeToDismiss';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useColorScheme } from '@/hooks/useColorScheme';
import Colors from '@/constants/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { useI18n } from '@/contexts/LanguageContext';
import { useSrs } from '@/contexts/SrsContext';

type IoniconName = React.ComponentProps<typeof Ionicons>['name'];

// ── Bottom sheet "Plus" ────────────────────────────────────────────────────────

function PlusSheet({ visible, onClose }: { visible: boolean; onClose: () => void }) {
  const scheme = useColorScheme();
  const c = Colors[scheme];
  const { colorScheme, toggleTheme } = useTheme();
  const isDark = colorScheme === 'dark';
  const { user } = useAuth();
  const router = useRouter();
  const { t } = useI18n();
  const { translateY, overlayOpacity, panResponder, open } = useSwipeToDismiss(onClose);

  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const initial = user?.displayName?.[0] ?? user?.email?.[0] ?? 'X';

  const nav = (route: string) => {
    onClose();
    setTimeout(() => router.push(route as any), 50);
  };

  const toggle = (key: string) =>
    setExpanded(prev => ({ ...prev, [key]: !prev[key] }));

  // Organisation alignée sur la sidebar du web (référence Seonsaengnim) :
  // Épinglé / Pratique / Lecture & dictionnaire / Communauté / Actualités &
  // feedback. Les entrées sans écran mobile (Mes notes, Annonces, Idées &
  // Roadmap, Exclusif) sont omises ; Dictée et Mini-jeux, propres au mobile,
  // rejoignent Pratique ; « Mes hauts-faits » du web correspond à Collection.
  // Libellés par CLÉ i18n : en dur, le menu restait français en interface anglaise.
  const shortcuts = [
    { key: 'nav.home',       icon: 'home-outline'                as IoniconName, route: '/(tabs)' },
    { key: 'nav.path',       icon: 'book-outline'                as IoniconName, route: '/(tabs)/cours' },
    { key: 'nav.flashcards', icon: 'layers-outline'              as IoniconName, route: '/(tabs)/flashcards' },
    { key: 'sc.prof',        icon: 'chatbubble-ellipses-outline' as IoniconName, route: '/(tabs)/messages' },
  ];

  const explorer = [
    {
      key: 'nav.practice',
      items: [
        { key: 'sc.revisions', icon: 'fitness-outline'         as IoniconName, route: '/review' },
        { key: 'sc.stats', icon: 'stats-chart-outline'  as IoniconName, route: '/statistiques' },
        { key: 'sc.hsk',   icon: 'ribbon-outline'        as IoniconName, route: '/simulateur' },
        { key: 'sc.studio',    icon: 'mic-outline'             as IoniconName, route: '/atelier' },
        { key: 'nav.dialogues',icon: 'chatbubbles-outline'     as IoniconName, route: '/dialogues' },
        { key: 'nav.battles',  icon: 'flash-outline'           as IoniconName, route: '/battle' },
        { key: 'sc.errors',    icon: 'warning-outline'         as IoniconName, route: '/erreurs' },
        { key: 'nav.notes',    icon: 'document-text-outline'   as IoniconName, route: '/notes' },
        { key: 'sc.eval',      icon: 'trophy-outline'          as IoniconName, route: '/evaluation' },
        { key: 'sc.dictation', icon: 'pencil-outline'          as IoniconName, route: '/dictee' },
        { key: 'sc.minigames', icon: 'game-controller-outline' as IoniconName, route: '/minijeux' },
      ],
    },
    {
      key: 'nav.readingDict',
      items: [
        { key: 'nav.reading', icon: 'reader-outline' as IoniconName, route: '/lectures' },
        { key: 'sc.dico',     icon: 'search-outline' as IoniconName, route: '/dictionnaire' },
        { key: 'sc.grammar',  icon: 'school-outline' as IoniconName, route: '/grammaire' },
      ],
    },
    {
      key: 'nav.community',
      items: [
        { key: 'nav.messages',   icon: 'mail-outline'   as IoniconName, route: '/dm' },
        { key: 'sc.ranking',     icon: 'podium-outline' as IoniconName, route: '/classement' },
        { key: 'nav.collection', icon: 'ribbon-outline' as IoniconName, route: '/collection' },
      ],
    },
    {
      key: 'nav.news',
      items: [
        { key: 'nav.reviews', icon: 'star-outline' as IoniconName, route: '/avis' },
      ],
    },
  ];

  return (
    <Modal visible={visible} transparent animationType="none" onRequestClose={onClose}
      onShow={open}>
      {/* Overlay plein écran — opacité liée à la translation */}
      <Animated.View style={[StyleSheet.absoluteFillObject, { backgroundColor: 'rgba(0,0,0,0.5)', opacity: overlayOpacity }]} pointerEvents="none" />
      <Pressable style={StyleSheet.absoluteFillObject} onPress={onClose} />
      <Animated.View style={[sh.sheet, sh.sheetAbs, { backgroundColor: isDark ? c.cardBg : '#FFFFFF', transform: [{ translateY }] }]}>
        {/* Handle — zone de glissement */}
        <View {...panResponder.panHandlers} style={sh.handleArea}>
          <View style={[sh.handle, { backgroundColor: c.borderMedium }]} />
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Profil */}
          <TouchableOpacity
            style={[sh.profileRow, { borderBottomColor: c.borderLight }]}
            onPress={() => nav('/(tabs)/profil')}
            activeOpacity={0.7}
          >
            {user?.photoURL ? (
              <Image source={{ uri: user.photoURL }} style={sh.avatar} />
            ) : (
              <View style={[sh.avatar, { backgroundColor: c.primaryRed }]}>
                <Text style={sh.avatarTxt}>{initial.toUpperCase()}</Text>
              </View>
            )}
            <View style={{ flex: 1 }}>
              <Text style={[sh.profileName, { color: c.textPrimary }]}>{t('nav.profile')}</Text>
              <Text style={[sh.profileSub, { color: c.textSecondary }]}>{t('nav.profileSub')}</Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color={c.textTertiary} />
          </TouchableOpacity>

          {/* Mode sombre */}
          <View style={[sh.row, { borderBottomColor: c.borderLight }]}>
            <View style={{ flex: 1 }}>
              <Text style={[sh.rowLabel, { color: c.textPrimary }]}>{t('nav.darkMode')}</Text>
              <Text style={[sh.rowSub, { color: c.textSecondary }]}>{isDark ? t('nav.on') : t('nav.off')}</Text>
            </View>
            <Switch
              value={isDark}
              onValueChange={toggleTheme}
              // Piste éteinte assez sombre pour se détacher de la feuille
              // blanche — le gris clair d'origine disparaissait en thème clair.
              // ios_backgroundColor : c'est LUI qui colore la piste éteinte
              // sur iOS, trackColor.false n'y suffit pas.
              trackColor={{ false: '#9AA3AF', true: c.primaryRed }}
              ios_backgroundColor="#9AA3AF"
              thumbColor="#FFFFFF"
            />
          </View>

          {/* Raccourcis */}
          <Text style={[sh.sectionLabel, { color: c.textTertiary }]}>{t('common.pinned')}</Text>
          {shortcuts.map(item => (
            <TouchableOpacity
              key={item.key}
              style={[sh.navRow, { borderBottomColor: c.borderLight }]}
              onPress={() => nav(item.route)}
              activeOpacity={0.7}
            >
              <Ionicons name={item.icon} size={20} color={c.textPrimary} style={sh.navIcon} />
              <Text style={[sh.navLabel, { color: c.textPrimary }]}>{t(item.key as any)}</Text>
            </TouchableOpacity>
          ))}

          {/* Explorer */}
          <Text style={[sh.sectionLabel, { color: c.textTertiary }]}>{t('common.explore')}</Text>
          {explorer.map(section => (
            <View key={section.key}>
              <TouchableOpacity
                style={[sh.explorerHeader, { borderBottomColor: c.borderLight }]}
                onPress={() => toggle(section.key)}
                activeOpacity={0.7}
              >
                <Text style={[sh.explorerTitle, { color: c.textPrimary }]}>{t(section.key as any)}</Text>
                <Ionicons
                  name={expanded[section.key] ? 'chevron-up' : 'chevron-down'}
                  size={16}
                  color={c.textTertiary}
                />
              </TouchableOpacity>
              {expanded[section.key] && section.items.map(item => (
                <TouchableOpacity
                  key={item.key}
                  style={[sh.explorerItem, { borderBottomColor: c.borderLight }]}
                  onPress={() => nav(item.route)}
                  activeOpacity={0.7}
                >
                  <Ionicons name={item.icon} size={17} color={c.textSecondary} style={sh.subIcon} />
                  <Text style={[sh.navLabel, { color: c.textSecondary }]}>{t(item.key as any)}</Text>
                </TouchableOpacity>
              ))}
            </View>
          ))}

          <View style={{ height: 40 }} />
        </ScrollView>
      </Animated.View>
    </Modal>
  );
}

// ── Tab bar plat avec labels ───────────────────────────────────────────────────

function FlatTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const scheme = useColorScheme();
  const c = Colors[scheme];
  const isDark = scheme === 'dark';
  const router = useRouter();
  const { t } = useI18n();
  const [plusOpen, setPlusOpen] = useState(false);

  // Source de vérité partagée : même nombre que l'accueil et l'onglet Cartes.
  const { stats } = useSrs();
  const dueMots = Math.min(stats.dueNow, 999);

  const TABS = [
    { name: 'index',      label: t('tab.home'),    icon: 'home-outline'       as IoniconName, activeIcon: 'home'        as IoniconName },
    { name: 'cours',      label: t('tab.lessons'), icon: 'book-outline'       as IoniconName, activeIcon: 'book'        as IoniconName },
    { name: 'flashcards', label: t('tab.words'),   icon: 'layers-outline'     as IoniconName, activeIcon: 'layers'      as IoniconName },
    { name: 'messages',   label: t('tab.prof'),    icon: 'chatbubble-outline' as IoniconName, activeIcon: 'chatbubble'  as IoniconName },
  ];

  const bg   = isDark ? c.cardBg : '#FFFFFF';
  const border = isDark ? c.borderMedium : '#E5E7EB';

  const activeRouteName = state.routes[state.index]?.name;
  const onProfPage = activeRouteName === 'messages';

  // ── Tab bar cachée sur la page Prof Xiao ───────────────────────
  if (onProfPage) {
    return (
      <>
        <PlusSheet visible={plusOpen} onClose={() => setPlusOpen(false)} />
      </>
    );
  }

  return (
    <>
      <PlusSheet visible={plusOpen} onClose={() => setPlusOpen(false)} />
      <View style={[tb.bar, { backgroundColor: bg, borderTopColor: border }]}>
        {/* Tabs réels */}
        {TABS.map(tab => {
          const route = state.routes.find(r => r.name === tab.name);
          if (!route) return null;
          const idx = state.routes.indexOf(route);
          const isFocused = state.index === idx;
          const color = isFocused ? c.primaryRed : c.textTertiary;

          return (
            <TouchableOpacity
              key={tab.name}
              style={tb.tab}
              onPress={() => {
                const ev = navigation.emit({ type: 'tabPress', target: route.key, canPreventDefault: true });
                if (!isFocused && !ev.defaultPrevented) navigation.navigate(tab.name);
              }}
              onLongPress={() => navigation.emit({ type: 'tabLongPress', target: route.key })}
              activeOpacity={0.7}
            >
              <View style={tb.iconWrap}>
                <Ionicons name={isFocused ? tab.activeIcon : tab.icon} size={24} color={color} />
                {/* Badge Mots */}
                {tab.name === 'flashcards' && dueMots > 0 && (
                  <View style={[tb.badge, { backgroundColor: c.primaryRed }]}>
                    <Text style={tb.badgeTxt}>{dueMots > 99 ? '99+' : String(dueMots)}</Text>
                  </View>
                )}
                {/* Dot Prof */}
                {tab.name === 'messages' && (
                  <View style={[tb.dot, { backgroundColor: '#22C55E', borderColor: bg }]} />
                )}
              </View>
              <Text style={[tb.label, { color }]}>{tab.label}</Text>
            </TouchableOpacity>
          );
        })}

        {/* Plus — ouvre la bottom sheet */}
        <TouchableOpacity
          style={tb.tab}
          onPress={() => setPlusOpen(true)}
          activeOpacity={0.7}
        >
          <View style={tb.iconWrap}>
            <Ionicons name="menu" size={24} color={c.textTertiary} />
          </View>
          <Text style={[tb.label, { color: c.textTertiary }]}>{t('tab.more')}</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

// ── Layout principal ──────────────────────────────────────────────────────────

export default function TabLayout() {
  return (
    <Tabs
      tabBar={props => <FlatTabBar {...props} />}
      screenOptions={{
        headerShown: false,
        // La tab bar est absolue, on retire l'inset automatique
        tabBarStyle: { display: 'none' },
      }}
    >
      <Tabs.Screen name="index" />
      <Tabs.Screen name="cours" />
      <Tabs.Screen name="flashcards" />
      <Tabs.Screen name="messages" />
      <Tabs.Screen name="profil" options={{ href: null }} />
    </Tabs>
  );
}

// ── Styles Bottom sheet ───────────────────────────────────────────────────────

const sh = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  // Sheet positionné en absolu en bas — l'overlay couvre tout l'écran
  sheetAbs: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  sheet: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 0,
    maxHeight: '85%',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: -4 },
    elevation: 20,
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 8,
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    gap: 12,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarTxt: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '700',
  },
  profileName: {
    fontSize: 16,
    fontWeight: '600',
  },
  profileSub: {
    fontSize: 13,
    marginTop: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderBottomWidth: 1,
  },
  rowLabel: {
    fontSize: 15,
    fontWeight: '500',
  },
  rowSub: {
    fontSize: 13,
    marginTop: 1,
  },
  sectionLabel: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.8,
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 6,
  },
  navRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 13,
    borderBottomWidth: 1,
  },
  navIcon: {
    marginRight: 14,
  },
  navLabel: {
    fontSize: 15,
    fontWeight: '500',
  },
  explorerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderBottomWidth: 1,
  },
  explorerTitle: {
    fontSize: 15,
    fontWeight: '600',
  },
  explorerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 11,
    borderBottomWidth: StyleSheet.hairlineWidth,
    backgroundColor: 'transparent',
  },
  subIcon: {
    marginRight: 14,
    marginLeft: 8,
  },
  // Zone de glissement — pleine largeur, hauteur généreuse
  handleArea: {
    alignItems: 'center',
    paddingTop: 14,
    paddingBottom: 14,
    // Pas de paddingHorizontal pour que toute la largeur soit touchable
  },
});

// ── Styles Tab bar flottante ──────────────────────────────────────────────────

const tb = StyleSheet.create({
  bar: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 28 : 16,
    left: 16,
    right: 16,
    flexDirection: 'row',
    borderRadius: 22,
    paddingVertical: 8,
    paddingHorizontal: 4,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 4 },
    elevation: 12,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
  },
  iconWrap: {
    position: 'relative',
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 2,
  },
  badge: {
    position: 'absolute',
    top: -6,
    right: -10,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  badgeTxt: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: '700',
  },
  dot: {
    position: 'absolute',
    top: -2,
    right: -4,
    width: 9,
    height: 9,
    borderRadius: 5,
    borderWidth: 1.5,
  },
  label: {
    fontSize: 10,
    fontWeight: '500',
  },
  // Mini pill — page Prof
  miniBar: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 32 : 20,
    left: 72,
    right: 72,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 28,
    paddingVertical: 6,
    paddingHorizontal: 4,
    borderWidth: StyleSheet.hairlineWidth,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 3 },
    elevation: 10,
  },
  miniTab: {
    flex: 1,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
  },
  miniDivider: {
    width: StyleSheet.hairlineWidth,
    height: 18,
  },
});
