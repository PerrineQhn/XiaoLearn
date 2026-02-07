import { useEffect, useState } from 'react';
import { doc, getDoc, onSnapshot, setDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useAuth } from '../contexts/AuthContext';

export interface EntitlementStatus {
  active: boolean;
  status?: string | null;
  currentPeriodEnd?: string | null;
  subscriptionId?: string | null;
  priceId?: string | null;
  customerId?: string | null;
  cancelAtPeriodEnd?: boolean;
}

export interface Entitlements {
  app?: EntitlementStatus;
  dictionary?: EntitlementStatus;
}

const claimPendingEntitlements = async (uid: string, email: string) => {
  const pendingRef = doc(db, 'pending_entitlements', email.toLowerCase());
  const pendingSnap = await getDoc(pendingRef);
  if (!pendingSnap.exists()) return;

  const pendingData = pendingSnap.data();
  const payload: Record<string, unknown> = {};

  if (pendingData.entitlements) {
    payload.entitlements = pendingData.entitlements;
  }

  if (pendingData.purchases) {
    payload.purchases = pendingData.purchases;
  }

  if (Object.keys(payload).length === 0) return;

  await setDoc(
    doc(db, 'users', uid),
    {
      ...payload,
      updatedAt: new Date().toISOString()
    },
    { merge: true }
  );

  await setDoc(
    pendingRef,
    {
      claimedBy: uid,
      claimedAt: new Date().toISOString()
    },
    { merge: true }
  );
};

export const useEntitlements = () => {
  const { user } = useAuth();
  const [entitlements, setEntitlements] = useState<Entitlements | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setEntitlements(null);
      setLoading(false);
      return;
    }

    if (user.email) {
      claimPendingEntitlements(user.uid, user.email).catch((error) => {
        console.error('Error claiming pending entitlements:', error);
      });
    }

    const userDocRef = doc(db, 'users', user.uid);
    const unsubscribe = onSnapshot(
      userDocRef,
      (snap) => {
        const data = snap.data();
        setEntitlements((data?.entitlements as Entitlements) ?? null);
        setLoading(false);
      },
      (error) => {
        console.error('Error loading entitlements:', error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [user]);

  return { entitlements, loading };
};
