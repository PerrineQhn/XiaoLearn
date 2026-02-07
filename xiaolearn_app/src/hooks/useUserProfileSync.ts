import { useEffect } from 'react';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useAuth } from '../contexts/AuthContext';

export const useUserProfileSync = () => {
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    const syncProfile = async () => {
      try {
        await setDoc(
          doc(db, 'users', user.uid),
          {
            email: user.email || null,
            displayName: user.displayName || null,
            photoURL: user.photoURL || null,
            lastLoginAt: new Date().toISOString()
          },
          { merge: true }
        );
      } catch (error) {
        console.error('Error syncing user profile:', error);
      }
    };

    syncProfile();
  }, [user]);
};
