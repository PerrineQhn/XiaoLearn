/**
 * SyncBanner — banner non-bloquant « Synchronisation de ta progression… »
 * Affiché quand l'utilisateur est connecté sur une installation vierge
 * (AsyncStorage vide) : au lieu de montrer des leçons à 0 qui font paniquer,
 * on indique que les données arrivent. Disparaît dès que la progression
 * est présente en local (poll 500ms) ou après 5s max. Identique au fix web.
 */
import { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '@/contexts/AuthContext';

/** Clés dont la présence locale indique que la progression est synchronisée. */
const PROGRESS_KEYS = ['cl_word_srs_v1', 'cl_completed_lessons', 'xl_xp_total'];

export default function SyncBanner() {
  const { user } = useAuth();
  const [visible, setVisible] = useState(false);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    if (!user) { setVisible(false); return; }

    let cancelled = false;
    let interval: ReturnType<typeof setInterval> | null = null;
    let maxTimer: ReturnType<typeof setTimeout> | null = null;

    const hasLocalProgress = async (): Promise<boolean> => {
      const vals = await Promise.all(
        PROGRESS_KEYS.map(k => AsyncStorage.getItem(k).catch(() => null))
      );
      return vals.some(v => v !== null);
    };

    (async () => {
      // Installation vierge + connecté → la sync initiale est en cours
      if (await hasLocalProgress()) return;
      if (cancelled) return;
      setVisible(true);

      // Poll : dès que les données arrivent, on masque
      interval = setInterval(async () => {
        if (await hasLocalProgress()) {
          setVisible(false);
          if (interval) clearInterval(interval);
        }
      }, 500);

      // 5s max dans tous les cas
      maxTimer = setTimeout(() => {
        setVisible(false);
        if (interval) clearInterval(interval);
      }, 5000);
    })();

    return () => {
      cancelled = true;
      if (interval) clearInterval(interval);
      if (maxTimer) clearTimeout(maxTimer);
    };
  }, [user]);

  if (!visible) return null;

  return (
    <View style={[s.banner, { top: insets.top + 6 }]} pointerEvents="none">
      <ActivityIndicator size="small" color="#FFF" />
      <Text style={s.txt}>Synchronisation de ta progression…</Text>
    </View>
  );
}

const s = StyleSheet.create({
  banner: {
    position: 'absolute',
    alignSelf: 'center',
    zIndex: 999,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(31, 41, 55, 0.92)',
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 6,
  },
  txt: { color: '#FFF', fontSize: 13, fontWeight: '600' },
});
