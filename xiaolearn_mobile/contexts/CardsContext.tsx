/**
 * CardsContext — vérification des déblocages + célébration globale.
 *
 * Utilisation depuis n'importe quel écran :
 *   const { checkCards } = useCardUnlocks();
 *   await checkCards();            // évalue et affiche la modale si besoin
 *
 * La modale est montée une seule fois, à la racine, donc elle s'affiche
 * par-dessus l'écran courant quel qu'il soit.
 */
import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import { checkUnlocks, bumpCounters, type CardCounters } from '@/hooks/useCards';
import { CardUnlockModal } from '@/components/CardUnlockModal';
import { useAuth } from '@/contexts/AuthContext';
import type { CollectibleCard } from '@/data/cards';

interface CardsCtx {
  /** Évalue les déclencheurs ; affiche la célébration si de nouvelles cartes tombent. */
  checkCards: () => Promise<CollectibleCard[]>;
  /** Incrémente les compteurs propres aux cartes puis vérifie. */
  trackAndCheck: (patch: Partial<CardCounters>) => Promise<CollectibleCard[]>;
}

const Ctx = createContext<CardsCtx>({
  checkCards: async () => [],
  trackAndCheck: async () => [],
});

export function useCardUnlocks() {
  return useContext(Ctx);
}

export function CardsProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [queue, setQueue] = useState<CollectibleCard[]>([]);

  const checkCards = useCallback(async () => {
    try {
      const newly = await checkUnlocks(user?.uid ?? null);
      if (newly.length > 0) setQueue(q => [...q, ...newly]);
      return newly;
    } catch (e) {
      console.warn('[cards] check échoué', e);
      return [];
    }
  }, [user?.uid]);

  const trackAndCheck = useCallback(async (patch: Partial<CardCounters>) => {
    try { await bumpCounters(patch); } catch {}
    return checkCards();
  }, [checkCards]);

  return (
    <Ctx.Provider value={{ checkCards, trackAndCheck }}>
      {children}
      {queue.length > 0 && (
        <CardUnlockModal cards={queue} onDone={() => setQueue([])} />
      )}
    </Ctx.Provider>
  );
}
