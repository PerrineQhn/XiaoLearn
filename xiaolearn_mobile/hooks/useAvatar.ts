/**
 * useAvatar — avatar choisi par l'utilisateur.
 *
 * AsyncStorage fait foi : le choix est immédiat et fonctionne hors ligne.
 * Firestore ne sert qu'à retrouver son avatar sur un autre appareil.
 *
 * L'état est PARTAGÉ entre toutes les instances du hook via un petit store de
 * module : l'accueil et la galerie affichent le même avatar au même moment.
 * Sans cela, chaque écran vivait sur sa propre copie chargée au montage — on
 * choisissait un avatar dans la galerie et l'accueil n'en savait rien.
 */
import { useCallback, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '@/firebase/config';
import { useAuth } from '@/contexts/AuthContext';
import { isValidCharacter } from '@/data/avatarEvolution';

// v5 : on ne stocke plus une illustration figée mais un PERSONNAGE ('f01',
// 'g01'). Sa tenue est déduite du niveau CECR atteint, elle n'a donc rien à
// faire dans la sauvegarde. Les valeurs v4 ('avatar_23'…) ne sont plus
// valides : l'utilisateur repasse une fois par le sélecteur, ce qui vaut mieux
// que de deviner un personnage à sa place.
const KEY = 'xl_avatar_v5';

// ─── Store de module, partagé par toutes les instances ────────────────────────

let current: string | null = null;
let hydrated = false;
const listeners = new Set<(id: string | null) => void>();

function publish(id: string | null) {
  current = id;
  listeners.forEach(l => l(id));
}

export function useAvatar() {
  const { user } = useAuth();
  const [avatarId, setAvatarId] = useState<string | null>(current);
  const [loading, setLoading] = useState(!hydrated);

  // Abonnement : toute sélection faite ailleurs met cet écran à jour
  useEffect(() => {
    const l = (id: string | null) => setAvatarId(id);
    listeners.add(l);
    return () => { listeners.delete(l); };
  }, []);

  const load = useCallback(async (force = false) => {
    if (hydrated && !force) { setLoading(false); return; }

    let found: string | null = null;
    try {
      const raw = await AsyncStorage.getItem(KEY);
      if (isValidCharacter(raw)) found = raw;
    } catch {}

    if (!found && user && db) {
      try {
        const snap = await getDoc(doc(db, 'users', user.uid));
        const remote = snap.exists() ? (snap.data().avatarId as string | undefined) : undefined;
        if (isValidCharacter(remote)) found = remote;
      } catch {}
    }

    hydrated = true;
    publish(found);
    setLoading(false);
  }, [user]);

  useEffect(() => { void load(); }, [load]);

  const select = useCallback(async (id: string) => {
    if (!isValidCharacter(id)) return;
    publish(id);
    await AsyncStorage.setItem(KEY, id).catch(() => {});

    if (user && db) {
      // Silencieux : perdre la synchro ne doit pas empêcher de choisir.
      setDoc(
        doc(db, 'users', user.uid),
        { avatarId: id, avatarUpdatedAt: new Date().toISOString() },
        { merge: true },
      ).catch(() => {});
    }
  }, [user]);

  return { avatarId, loading, select, reload: () => load(true) };
}
