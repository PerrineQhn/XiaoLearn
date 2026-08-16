/**
 * profileName — changer son nom d'affichage.
 *
 * Le nom vit à deux endroits, et les oublier l'un ou l'autre laisse un compte
 * incohérent :
 *
 *   - `auth.currentUser.displayName`, qui alimente l'en-tête, le menu et les
 *     initiales de l'avatar ;
 *   - `publicProfiles/{uid}.displayName`, que lisent la recherche
 *     d'utilisateurs et le classement.
 *
 * Ne mettre à jour que le premier laisserait l'ancien nom dans la recherche :
 * on continuerait d'être trouvé sous un nom qu'on vient précisément de quitter.
 * Le profil public n'est donc pas un effet de bord facultatif, il fait partie
 * du renommage.
 *
 * L'ordre compte : Auth d'abord, car c'est lui qui peut refuser (jeton expiré,
 * compte supprimé). Si le profil public échoue ensuite, le nom reste correct
 * là où l'utilisateur le voit, et la prochaine synchronisation le rattrapera.
 */
import { updateProfile, type User } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/firebase/config';

/** Bornes du nom affiché — les mêmes que sur le web. */
export const NOM_MIN = 2;
export const NOM_MAX = 30;

export type ErreurNom = 'vide' | 'trop-court' | 'trop-long' | 'inchange';

/**
 * Valide un nom saisi. Renvoie le nom nettoyé, ou la raison du refus.
 *
 * Les espaces de bord sont retirés et les espaces internes réduits : un nom
 * qui ne diffère de l'ancien que par sa mise en espaces n'est pas un
 * changement, et provoquerait une écriture inutile.
 */
export function validerNom(saisi: string, actuel?: string | null):
  { ok: true; nom: string } | { ok: false; raison: ErreurNom } {
  const nom = saisi.replace(/\s+/g, ' ').trim();
  if (!nom) return { ok: false, raison: 'vide' };
  if (nom.length < NOM_MIN) return { ok: false, raison: 'trop-court' };
  if (nom.length > NOM_MAX) return { ok: false, raison: 'trop-long' };
  if (nom === (actuel ?? '').replace(/\s+/g, ' ').trim()) return { ok: false, raison: 'inchange' };
  return { ok: true, nom };
}

/**
 * Applique le nouveau nom. Suppose `validerNom` déjà passé.
 * Lève si Auth refuse ; avale l'échec du profil public, qui n'est pas bloquant.
 */
export async function changerNom(user: User, nom: string): Promise<void> {
  await updateProfile(user, { displayName: nom });
  if (!db) return;
  await setDoc(
    doc(db, 'publicProfiles', user.uid),
    // `uid` fait partie de la charge : la règle Firestore exige
    // `request.resource.data.uid == uid`, et sur un profil qui n'existe pas
    // encore le merge n'a rien d'où le reprendre — l'écriture serait refusée.
    { uid: user.uid, displayName: nom, updatedAt: new Date().toISOString() },
    { merge: true },
  ).catch(err => {
    console.warn('[profileName] profil public non mis à jour :', err?.message);
  });
}
