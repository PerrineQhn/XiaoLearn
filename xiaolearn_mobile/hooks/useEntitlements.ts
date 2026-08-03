/**
 * useEntitlements — droits premium de l'utilisateur.
 * --------------------------------------------------
 * Deux sources combinées, la plus favorable gagne :
 *   1. Firestore `users/{uid}.entitlements.app` — source PARTAGÉE avec le
 *      web (posée par le webhook Stripe côté web, RevenueCat côté mobile).
 *      C'est ce qui garantit qu'un premium acheté sur le web fonctionne ici.
 *   2. RevenueCat `customerInfo` (temps réel après un achat mobile) — évite
 *      d'attendre l'aller-retour webhook → Firestore pour débloquer.
 *
 * Renvoie l'`AppAccess` calculé (buildAppAccess) prêt à gater l'UI.
 */
import { useCallback, useEffect, useState } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '@/firebase/config';
import { useAuth } from '@/contexts/AuthContext';
import { buildAppAccess, type AppAccess, type EntitlementStatus } from '@/utils/access';
import {
  getCustomerInfo, isPremiumActive, isRevenueCatAvailable,
  PRODUCT_LIFETIME,
} from '@/services/revenueCat';

function fromFirestore(data: any): EntitlementStatus | null {
  const app = data?.entitlements?.app;
  if (!app || typeof app !== 'object') return null;
  return {
    active: Boolean(app.active),
    status: app.status ?? null,
    isLifetime: Boolean(app.isLifetime),
    currentPeriodEnd: app.currentPeriodEnd ?? null,
    productId: app.productId ?? app.priceId ?? null,
  };
}

function fromCustomerInfo(info: any): EntitlementStatus | null {
  if (!info || !isPremiumActive(info)) return null;
  const ent = info.entitlements.active.premium;
  return {
    active: true,
    status: 'active',
    // Lifetime = produit non-consommable → pas de date d'expiration
    isLifetime: ent?.productIdentifier === PRODUCT_LIFETIME || ent?.expirationDate == null,
    currentPeriodEnd: ent?.expirationDate ?? null,
    productId: ent?.productIdentifier ?? null,
  };
}

/** Fusionne : premium actif si l'une des deux sources l'affirme. */
function merge(a: EntitlementStatus | null, b: EntitlementStatus | null): EntitlementStatus | null {
  if (!a) return b;
  if (!b) return a;
  return {
    active: a.active || b.active,
    status: a.active ? a.status : b.status,
    isLifetime: Boolean(a.isLifetime || b.isLifetime),
    currentPeriodEnd: a.currentPeriodEnd ?? b.currentPeriodEnd ?? null,
    productId: a.productId ?? b.productId ?? null,
  };
}

export function useEntitlements() {
  const { user } = useAuth();
  const [fsEnt, setFsEnt] = useState<EntitlementStatus | null>(null);
  const [rcEnt, setRcEnt] = useState<EntitlementStatus | null>(null);
  const [loading, setLoading] = useState(true);

  // 1. Firestore temps réel (source partagée web)
  useEffect(() => {
    if (!user || !db) { setFsEnt(null); setLoading(false); return; }
    const unsub = onSnapshot(
      doc(db, 'users', user.uid),
      snap => { setFsEnt(snap.exists() ? fromFirestore(snap.data()) : null); setLoading(false); },
      () => setLoading(false)
    );
    return () => unsub();
  }, [user]);

  // 2. RevenueCat (si build natif)
  const refreshRC = useCallback(async () => {
    if (!isRevenueCatAvailable()) return;
    const info = await getCustomerInfo();
    setRcEnt(fromCustomerInfo(info));
  }, []);

  useEffect(() => { refreshRC(); }, [refreshRC, user]);

  const entitlement = merge(fsEnt, rcEnt);
  const access: AppAccess = buildAppAccess(user, entitlement);

  return { access, entitlement, loading, isPremium: access.tier === 'premium', refreshRC };
}
