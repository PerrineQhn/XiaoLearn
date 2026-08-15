import { useState, useEffect, useRef } from 'react';
import { Tabs, useRouter, usePathname } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import {
  View, Text, StyleSheet, TouchableOpacity, Platform,
  Modal, ScrollView, Switch, Pressable, Animated, PanResponder, Image,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useLayout } from '@/hooks/useLayout';
import { useSwipeToDismiss } from '@/hooks/useSwipeToDismiss';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useColorScheme } from '@/hooks/useColorScheme';
import Colors from '@/constants/Colors';
import { CatalogIcon } from '@/components/CatalogIcon';
import { readErrors } from '@/data/errorLog';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '@/contexts/AuthContext';
import { screensInGroup, railScreens } from '@/data/screenCatalog';
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
  // feedback. Les entrées sans écran mobile (Annonces, Idées & Roadmap,
  // Exclusif) sont omises ; Dictée et Mini-jeux, propres au mobile, rejoignent
  // Pratique ; « Mes hauts-faits » du web correspond à Collection.
  //
  // Le contenu vient de `data/screenCatalog.ts`, partagé avec l'accès rapide
  // de l'accueil. Les deux listes étaient tenues séparément et avaient fini
  // par diverger de six écrans.
  const shortcuts = screensInGroup('pinned');

  const explorer = [
    { key: 'nav.practice',    items: screensInGroup('practice') },
    { key: 'nav.readingDict', items: screensInGroup('readingDict') },
    { key: 'nav.community',   items: screensInGroup('community') },
    { key: 'nav.news',        items: screensInGroup('news') },
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
              key={item.id}
              style={[sh.navRow, { borderBottomColor: c.borderLight }]}
              onPress={() => nav(item.route)}
              activeOpacity={0.7}
            >
              <CatalogIcon entry={item} size={20} color={c.textPrimary} style={sh.navIcon} />
              <Text style={[sh.navLabel, { color: c.textPrimary }]}>
                {t((item.navLabelKey ?? item.labelKey) as any)}
              </Text>
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
                  key={item.id}
                  style={[sh.explorerItem, { borderBottomColor: c.borderLight }]}
                  onPress={() => nav(item.route)}
                  activeOpacity={0.7}
                >
                  <CatalogIcon entry={item} size={17} color={c.textSecondary} style={sh.subIcon} />
                  <Text style={[sh.navLabel, { color: c.textSecondary }]}>
                    {t((item.navLabelKey ?? item.labelKey) as any)}
                  </Text>
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

// ── Rail latéral (tablette) ───────────────────────────────────────────────────

/** Largeur du rail, en points. Assez pour une icône et son libellé sur une ligne. */
export const RAIL_WIDTH = 104;

/**
 * Navigation verticale sur grand écran.
 *
 * La barre d'onglets flottante s'étire sur toute la largeur d'une tablette :
 * cinq cellules `flex: 1` qui éparpillent leurs icônes dans le vide, et une
 * hauteur perdue en bas d'un écran déjà très haut. Le rail règle les deux, et
 * offre en prime la place d'exposer des entrées aujourd'hui enfouies sous
 * « Plus » — Collection, Lectures, Révisions — qu'on n'atteignait qu'en
 * dépliant une feuille.
 *
 * Il s'appuie sur le chemin courant plutôt que sur l'état du navigateur
 * d'onglets : il vit à côté de `<Tabs>`, pas dedans, et peut donc aussi
 * pointer vers des écrans hors onglets.
 */
function SideRail({ onPlus }: { onPlus: () => void }) {
  const scheme = useColorScheme();
  const c = Colors[scheme];
  const router = useRouter();
  const pathname = usePathname();
  const { t } = useI18n();
  const { stats } = useSrs();
  const { user } = useAuth();
  const insets = useSafeAreaInsets();
  const dueMots = Math.min(stats.dueNow, 999);

  /**
   * Fautes en attente de révision — le compteur du cahier d'erreurs.
   * Relu à chaque changement d'écran : on en ajoute depuis une leçon, une
   * dictée ou la copie du simulateur, et la pastille doit suivre.
   */
  const [nbErreurs, setNbErreurs] = useState(0);
  useEffect(() => {
    let vivant = true;
    readErrors().then(l => { if (vivant) setNbErreurs(l.length); }).catch(() => {});
    return () => { vivant = false; };
  }, [pathname]);

  /**
   * Les entrées viennent du catalogue partagé, groupées par famille : le rail
   * suit la journée de l'apprenant — on apprend, on mémorise ce qu'on a vu,
   * on s'entraîne, on cherche un mot — et non l'arborescence du menu.
   */
  const ENTREES = railScreens().map(s => ({
    ...s,
    label: t((s.railLabelKey ?? s.navLabelKey ?? s.labelKey) as any),
    badge: s.railBadge === 'due' ? dueMots : s.railBadge === 'errors' ? nbErreurs : undefined,
  }));

  const actif = (route: string) =>
    route === '/(tabs)' ? pathname === '/' : pathname.startsWith(route.replace('/(tabs)', ''));

  return (
    <View style={[rail.bloc, {
      backgroundColor: c.tabBarBg, borderRightColor: c.borderLight,
      paddingTop: insets.top + 12, paddingBottom: insets.bottom + 12,
    }]}>
      <Image
        source={scheme === 'dark'
          ? require('@/assets/logo_long_dark.png')
          : require('@/assets/logo_long.png')}
        style={rail.logo}
        resizeMode="contain"
      />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ gap: 2 }}>
        {ENTREES.map((e, i) => {
          const on = actif(e.route);
          // Un filet sépare deux familles : sans lui, onze entrées d'affilée
          // forment un mur qu'on ne parcourt plus qu'en lisant tout.
          const nouvelleBande = i > 0 && ENTREES[i - 1].railBand !== e.railBand;
          return (
            <View key={e.route}>
            {nouvelleBande && (
              <View style={[rail.sep, { backgroundColor: c.borderLight }]} />
            )}
            <TouchableOpacity
              style={[rail.item, on && { backgroundColor: c.primaryRedLight }]}
              onPress={() => router.push(e.route as any)}
              activeOpacity={0.75}
            >
              <View>
                <CatalogIcon entry={e} size={21} color={on ? c.primaryRed : c.textTertiary} />
                {!!e.badge && e.badge > 0 && (
                  <View style={[rail.badge, { backgroundColor: c.primaryRed }]}>
                    <Text style={rail.badgeTxt}>{e.badge > 99 ? '99+' : String(e.badge)}</Text>
                  </View>
                )}
              </View>
              <Text
                style={[rail.label, { color: on ? c.primaryRed : c.textTertiary }]}
                numberOfLines={1}
              >
                {e.label}
              </Text>
            </TouchableOpacity>
            </View>
          );
        })}
      </ScrollView>
      {/* « Plus » donne accès à ce que le rail ne peut pas montrer — Atelier,
          Mini-jeux, Battle, Statistiques, Réglages. Sans lui, ces écrans
          n'étaient atteignables sur tablette que par un lien depuis l'accueil,
          et le rail promettait une navigation qu'il ne tenait pas. */}
      <TouchableOpacity style={rail.item} onPress={onPlus} activeOpacity={0.75}>
        <Ionicons name="menu" size={21} color={c.textTertiary} />
        <Text style={[rail.label, { color: c.textTertiary }]} numberOfLines={1}>
          {t('tab.more')}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={rail.item}
        onPress={() => router.push('/(tabs)/profil' as any)}
        activeOpacity={0.75}
      >
        {/* La photo du compte plutôt qu'une silhouette générique : c'est la
            seule entrée du rail qui désigne une personne et non une rubrique,
            et son visage la rend reconnaissable sans lire l'étiquette. Le
            repli sur l'icône couvre les comptes sans photo — création par
            e-mail, ou fournisseur qui n'en transmet pas. */}
        {user?.photoURL ? (
          <Image source={{ uri: user.photoURL }} style={rail.avatar} />
        ) : (
          <Ionicons name="person-circle-outline" size={21} color={c.textTertiary} />
        )}
        <Text style={[rail.label, { color: c.textTertiary }]} numberOfLines={1}>
          {t('nav.profile')}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const rail = StyleSheet.create({
  sep: { height: StyleSheet.hairlineWidth, marginVertical: 6, marginHorizontal: 14 },
  bloc: { width: RAIL_WIDTH, borderRightWidth: 1, alignItems: 'center', paddingHorizontal: 6 },
  logo: { width: 76, height: 26, marginBottom: 14 },
  // 21 pt, comme les icônes du rail : la photo occupe exactement la place
  // qu'occupait la silhouette, l'alignement des étiquettes ne bouge pas.
  avatar: { width: 21, height: 21, borderRadius: 11 },
  item: { width: 88, paddingVertical: 9, borderRadius: 12, alignItems: 'center', gap: 3 },
  label: { fontSize: 10, fontWeight: '700', textAlign: 'center' },
  badge: {
    position: 'absolute', top: -5, right: -10, minWidth: 16, height: 16, borderRadius: 8,
    alignItems: 'center', justifyContent: 'center', paddingHorizontal: 4,
  },
  badgeTxt: { color: '#FFF', fontSize: 9, fontWeight: '800' },
});

// ── Layout principal ──────────────────────────────────────────────────────────

export default function TabLayout() {
  const { wide } = useLayout();
  const [plusOpen, setPlusOpen] = useState(false);

  const navigateur = (
    <Tabs
      // Au-delà du seuil, le rail remplace la barre : en garder les deux
      // donnerait deux navigations concurrentes pour les mêmes destinations.
      tabBar={props => (wide ? null : <FlatTabBar {...props} />)}
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

  if (!wide) return navigateur;

  return (
    <View style={{ flex: 1, flexDirection: 'row' }}>
      <SideRail onPlus={() => setPlusOpen(true)} />
      <View style={{ flex: 1 }}>{navigateur}</View>
      <PlusSheet visible={plusOpen} onClose={() => setPlusOpen(false)} />
    </View>
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
