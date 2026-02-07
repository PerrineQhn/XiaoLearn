import { useEffect } from 'react';
import { doc, setDoc, getDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useAuth } from '../contexts/AuthContext';

/**
 * Hook pour synchroniser les données entre localStorage et Firestore
 *
 * @param key - Clé localStorage à synchroniser
 * @param onUpdate - Callback appelé quand les données sont mises à jour depuis Firestore
 */
export function useFirestoreSync(
  key: string,
  onUpdate?: (data: any) => void,
  options?: { enabled?: boolean }
) {
  const { user } = useAuth();
  const enabled = options?.enabled ?? true;

  // Synchroniser les données locales vers Firestore quand l'utilisateur se connecte
  useEffect(() => {
    if (!user || !enabled) return;

    const syncLocalToFirestore = async () => {
      const localData = localStorage.getItem(key);
      if (!localData) return;

      try {
        const userDocRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(userDocRef);

        // Si pas de données cloud, uploader les données locales
        if (!docSnap.exists() || !docSnap.data()?.[key]) {
          await setDoc(
            userDocRef,
            {
              [key]: localData,
              lastUpdated: new Date().toISOString()
            },
            { merge: true }
          );
        }
      } catch (error) {
        console.error('Error syncing local data to Firestore:', error);
      }
    };

    syncLocalToFirestore();
  }, [user, key, enabled]);

  // Écouter les changements Firestore et mettre à jour localStorage
  useEffect(() => {
    if (!user || !enabled) return;

    const userDocRef = doc(db, 'users', user.uid);

    const unsubscribe = onSnapshot(userDocRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        if (data?.[key]) {
          // Mettre à jour localStorage
          localStorage.setItem(key, data[key]);

          // Appeler le callback si fourni
          if (onUpdate) {
            try {
              const parsedData = JSON.parse(data[key]);
              onUpdate(parsedData);
            } catch (error) {
              console.error('Error parsing Firestore data:', error);
            }
          }
        }
      }
    });

    return () => unsubscribe();
  }, [user, key, onUpdate, enabled]);

  // Fonction pour sauvegarder dans Firestore
  const saveToFirestore = async (data: any) => {
    if (!user || !enabled) {
      // Pas connecté, sauvegarder seulement en local
      const stringData = typeof data === 'string' ? data : JSON.stringify(data);
      localStorage.setItem(key, stringData);
      return;
    }

    try {
      const stringData = typeof data === 'string' ? data : JSON.stringify(data);

      // Sauvegarder en local
      localStorage.setItem(key, stringData);

      // Sauvegarder dans Firestore
      const userDocRef = doc(db, 'users', user.uid);
      await setDoc(
        userDocRef,
        {
          [key]: stringData,
          lastUpdated: new Date().toISOString()
        },
        { merge: true }
      );
    } catch (error) {
      console.error('Error saving to Firestore:', error);
    }
  };

  return { saveToFirestore };
}
