/**
 * SrsContext — instance PARTAGÉE de l'état SRS.
 * ---------------------------------------------
 * Avant, chaque écran (accueil, cartes, barre d'onglets) appelait
 * useSrsData() séparément → 3 états chargés indépendamment qui pouvaient
 * afficher des nombres différents (0 / 28 / 12).
 *
 * Ici, useSrsData() est appelé UNE fois dans le provider et partagé.
 * Tous les consommateurs voient donc exactement le même `stats.dueNow`.
 */
import { createContext, useContext, type ReactNode } from 'react';
import { useSrsData } from '@/hooks/useSrsData';

type SrsValue = ReturnType<typeof useSrsData>;

const Ctx = createContext<SrsValue | null>(null);

export function SrsProvider({ children }: { children: ReactNode }) {
  const srs = useSrsData();
  return <Ctx.Provider value={srs}>{children}</Ctx.Provider>;
}

export function useSrs(): SrsValue {
  const c = useContext(Ctx);
  if (!c) throw new Error('useSrs doit être utilisé dans <SrsProvider>');
  return c;
}
