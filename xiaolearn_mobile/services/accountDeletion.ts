/**
 * Suppression de compte — côté client.
 *
 * Le client ne supprime rien lui-même : il ne peut ni parcourir les
 * sous-collections, ni toucher aux documents qu'il n'a pas le droit d'écrire
 * (`publicProfiles`, `leaderboard`), ni se retirer d'Auth de façon fiable. Il
 * se contente d'appeler les fonctions serveur et de lire l'échéance.
 *
 * Voir `xiaolearn_app/functions/src/accountDeletion.ts` pour la purge.
 */
import { getFunctions, httpsCallable } from 'firebase/functions';
import { doc, getDoc } from 'firebase/firestore';
import app, { db } from '@/firebase/config';

/** Délai de rétractation — doit rester identique à celui du serveur. */
export const GRACE_DAYS = 7;

export interface DeletionState {
  status: 'pending';
  requestedAt: string;
  scheduledFor: string;
}

const fns = () => getFunctions(app, 'europe-west1');

export async function requestAccountDeletion(): Promise<{ scheduledFor: string }> {
  const call = httpsCallable<void, { scheduledFor: string; graceDays: number }>(
    fns(), 'requestAccountDeletion');
  const { data } = await call();
  return { scheduledFor: data.scheduledFor };
}

export async function cancelAccountDeletion(): Promise<void> {
  await httpsCallable(fns(), 'cancelAccountDeletion')();
}

/** Lit l'échéance depuis le document utilisateur, ou null s'il n'y en a pas. */
export async function readDeletionState(uid: string): Promise<DeletionState | null> {
  try {
    const snap = await getDoc(doc(db, 'users', uid));
    const d = snap.data()?.deletion;
    if (!d || d.status !== 'pending' || !d.scheduledFor) return null;
    return d as DeletionState;
  } catch {
    // Hors ligne : on ne prétend pas qu'il n'y a pas de demande en cours, on
    // ne sait simplement pas. L'écran affichera l'état par défaut.
    return null;
  }
}

/** Date d'échéance en toutes lettres, dans la langue de l'interface. */
export function formatDeletionDate(iso: string, lang: 'fr' | 'en'): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString(lang === 'en' ? 'en-GB' : 'fr-FR', {
    day: 'numeric', month: 'long', year: 'numeric',
  });
}

/** Jours restants, arrondis au supérieur — « 0 jour » n'a pas de sens ici. */
export function daysLeft(iso: string): number {
  const ms = new Date(iso).getTime() - Date.now();
  return Math.max(0, Math.ceil(ms / (24 * 60 * 60 * 1000)));
}
