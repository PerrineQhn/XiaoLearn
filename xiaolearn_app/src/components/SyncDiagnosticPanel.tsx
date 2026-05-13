/**
 * SyncDiagnosticPanel.tsx — diagnostic et outils de sync manuelle
 * ---------------------------------------------------------------
 * Sert quand l'utilisateur a des données désynchronisées entre appareils.
 * Affiche :
 *   - UID Firebase + email du compte connecté (pour s'assurer qu'on est
 *     bien sur le même compte partout)
 *   - Liste des clés localStorage critiques avec leur taille
 *   - Bouton "Forcer la sync vers le cloud" : pousse tout le localStorage
 *     dans Firestore avec timestamps frais
 *   - Bouton "Recharger depuis le cloud" : remplace tout localStorage par
 *     ce que contient Firestore
 *
 * Sécurité : on ne touche QUE les clés xl_* / cl_* (préfixes XiaoLearn).
 */

import { useState, useCallback, useEffect } from 'react';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useAuth } from '../contexts/AuthContext';
import { useEntitlements } from '../hooks/useEntitlements';

interface Props {
  language?: 'fr' | 'en';
}

// Préfixes des clés XiaoLearn dans localStorage
const KEY_PREFIXES = ['xl_', 'cl_', 'CL_', 'XL_'];

const isXlKey = (k: string): boolean =>
  KEY_PREFIXES.some((p) => k.startsWith(p)) && !k.endsWith('__ts');

const listLocalKeys = (): string[] => {
  if (typeof window === 'undefined') return [];
  const keys: string[] = [];
  for (let i = 0; i < window.localStorage.length; i++) {
    const k = window.localStorage.key(i);
    if (k && isXlKey(k)) keys.push(k);
  }
  return keys.sort();
};

const formatBytes = (n: number): string => {
  if (n < 1024) return `${n} o`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} Ko`;
  return `${(n / 1024 / 1024).toFixed(2)} Mo`;
};

const SyncDiagnosticPanel = ({ language = 'fr' }: Props) => {
  const { user } = useAuth();
  const { entitlements, loading: entitlementsLoading } = useEntitlements();
  const [localKeys, setLocalKeys] = useState<string[]>([]);
  const [status, setStatus] = useState<string>('');
  const [busy, setBusy] = useState<'push' | 'pull' | 'test' | null>(null);
  // État détaillé du dernier diagnostic (entitlements cloud, taille doc, etc.)
  const [cloudDiag, setCloudDiag] = useState<{
    docExists?: boolean;
    keysInCloud?: number;
    hasLearnedWords?: boolean;
    learnedWordsCount?: number;
    entitlementApp?: string;
    rawLifetime?: boolean | null;
  } | null>(null);

  // Refresh la liste à chaque changement (et au mount)
  const refresh = useCallback(() => {
    setLocalKeys(listLocalKeys());
  }, []);
  useEffect(() => {
    refresh();
  }, [refresh, status]);

  // ---- FORCE PUSH local → cloud ----
  const pushAll = useCallback(async () => {
    if (!user) {
      setStatus(language === 'fr' ? 'Non connecté — impossible de pousser.' : 'Not signed in — cannot push.');
      return;
    }
    setBusy('push');
    setStatus(language === 'fr' ? 'Envoi en cours…' : 'Pushing…');
    try {
      const keys = listLocalKeys();
      const payload: Record<string, unknown> = {};
      const nowIso = new Date().toISOString();
      for (const k of keys) {
        const v = window.localStorage.getItem(k);
        if (v == null) continue;
        payload[k] = v;
        payload[`${k}__updatedAt`] = nowIso;
        // Met aussi à jour le timestamp local pour cohérence avec useFirestoreSync
        try { window.localStorage.setItem(`${k}__ts`, nowIso); } catch { /* ignore */ }
      }
      payload.lastUpdated = nowIso;
      await setDoc(doc(db, 'users', user.uid), payload, { merge: true });
      setStatus(
        language === 'fr'
          ? `✓ ${keys.length} clés poussées vers le cloud.`
          : `✓ ${keys.length} keys pushed to cloud.`
      );
    } catch (err) {
      console.error('[SyncDiagnosticPanel] push error', err);
      setStatus(
        language === 'fr'
          ? `✗ Erreur : ${(err as Error).message}`
          : `✗ Error: ${(err as Error).message}`
      );
    } finally {
      setBusy(null);
    }
  }, [user, language]);

  // ---- TEST de connexion Firestore : lit le doc users/{uid} et affiche l'état ----
  const testCloudRead = useCallback(async () => {
    if (!user) return;
    setBusy('test');
    setStatus(language === 'fr' ? 'Lecture du cloud…' : 'Reading cloud…');
    try {
      const snap = await getDoc(doc(db, 'users', user.uid));
      if (!snap.exists()) {
        setCloudDiag({ docExists: false });
        setStatus(language === 'fr' ? '⚠️ Aucun document users/{uid} dans Firestore.' : '⚠️ No users/{uid} doc in Firestore.');
        return;
      }
      const data = snap.data();
      const keys = Object.keys(data).filter((k) => isXlKey(k));
      const learnedRaw = typeof data.cl_learned_words === 'string' ? data.cl_learned_words : null;
      let learnedCount = 0;
      if (learnedRaw) {
        try {
          const arr = JSON.parse(learnedRaw);
          if (Array.isArray(arr)) learnedCount = arr.length;
        } catch { /* ignore */ }
      }
      // Lecture brute des entitlements (peu importe le hook useEntitlements)
      const ent = data.entitlements as { app?: { isLifetime?: boolean; active?: boolean } } | undefined;
      const entApp = ent?.app
        ? ent.app.isLifetime ? 'Lifetime' : ent.app.active ? 'Subscription' : 'Inactif'
        : 'Aucun';
      setCloudDiag({
        docExists: true,
        keysInCloud: keys.length,
        hasLearnedWords: !!learnedRaw,
        learnedWordsCount: learnedCount,
        entitlementApp: entApp,
        rawLifetime: ent?.app?.isLifetime ?? null
      });
      setStatus(language === 'fr' ? '✓ Diagnostic cloud terminé.' : '✓ Cloud diagnostic done.');
    } catch (err) {
      console.error('[SyncDiagnosticPanel] test error', err);
      setStatus(`✗ ${(err as Error).message}`);
    } finally {
      setBusy(null);
    }
  }, [user, language]);

  // ---- FORCE PULL cloud → local ----
  const pullAll = useCallback(async () => {
    if (!user) {
      setStatus(language === 'fr' ? 'Non connecté — impossible de récupérer.' : 'Not signed in — cannot pull.');
      return;
    }
    setBusy('pull');
    setStatus(language === 'fr' ? 'Récupération en cours…' : 'Pulling…');
    try {
      const snap = await getDoc(doc(db, 'users', user.uid));
      if (!snap.exists()) {
        setStatus(language === 'fr' ? 'Aucune donnée dans le cloud.' : 'No data in cloud.');
        return;
      }
      const data = snap.data();
      let count = 0;
      for (const [key, value] of Object.entries(data)) {
        if (!isXlKey(key)) continue;
        if (typeof value !== 'string') continue;
        try {
          window.localStorage.setItem(key, value);
          const tsIso = (data[`${key}__updatedAt`] as string) ?? data.lastUpdated;
          if (typeof tsIso === 'string') {
            window.localStorage.setItem(`${key}__ts`, tsIso);
          }
          count++;
        } catch { /* quota */ }
      }
      setStatus(
        language === 'fr'
          ? `✓ ${count} clés récupérées depuis le cloud. Rafraîchis la page (Cmd+R) pour les appliquer.`
          : `✓ ${count} keys pulled from cloud. Refresh (Cmd+R) to apply.`
      );
    } catch (err) {
      console.error('[SyncDiagnosticPanel] pull error', err);
      setStatus(
        language === 'fr'
          ? `✗ Erreur : ${(err as Error).message}`
          : `✗ Error: ${(err as Error).message}`
      );
    } finally {
      setBusy(null);
    }
  }, [user, language]);

  return (
    <div
      style={{
        background: 'rgba(254, 247, 237, 0.85)',
        border: '1px solid rgba(216, 72, 62, 0.18)',
        borderRadius: 14,
        padding: '16px 18px',
        marginTop: 20
      }}
    >
      <h3 style={{ margin: '0 0 6px', fontSize: 15, fontWeight: 700 }}>
        {language === 'fr' ? '🔄 Synchronisation entre appareils' : '🔄 Cross-device sync'}
      </h3>
      <p style={{ margin: '0 0 14px', fontSize: 13, color: '#5e6075', lineHeight: 1.5 }}>
        {language === 'fr'
          ? 'Si tes données ne sont pas synchronisées entre ton iPad, ton ordinateur ou ton téléphone, vérifie d\'abord que tu es connecté(e) avec le MÊME compte partout, puis utilise les outils ci-dessous.'
          : 'If your data is not in sync between iPad, computer or phone, first check you are signed in with the SAME account everywhere, then use the tools below.'}
      </p>

      {/* Identité du compte connecté */}
      <div
        style={{
          background: '#fff',
          border: '1px solid #ece4d5',
          borderRadius: 10,
          padding: '10px 12px',
          marginBottom: 14,
          fontSize: 12.5,
          lineHeight: 1.5
        }}
      >
        <div>
          <strong>{language === 'fr' ? 'Compte connecté :' : 'Signed in as:'}</strong>{' '}
          {user?.email ? (
            <span style={{ color: '#1f2937' }}>{user.email}</span>
          ) : (
            <span style={{ color: '#c6302c', fontWeight: 600 }}>
              {language === 'fr' ? 'Non connecté' : 'Not signed in'}
            </span>
          )}
        </div>
        {user?.uid && (
          <div style={{ color: '#8a8c9f', fontSize: 11.5, marginTop: 4, fontFamily: 'monospace' }}>
            UID: {user.uid}
          </div>
        )}
        <div style={{ marginTop: 8, color: '#5e6075' }}>
          <strong>{language === 'fr' ? 'Statut vu par cet appareil :' : 'Status seen by this device:'}</strong>{' '}
          {entitlementsLoading ? '…' : entitlements?.isLifetime ? (
            <span style={{ color: '#c6302c', fontWeight: 700 }}>Lifetime ✓</span>
          ) : entitlements?.active ? (
            <span style={{ color: '#2f9d8a', fontWeight: 600 }}>Subscription</span>
          ) : (
            <span style={{ color: '#5e6075' }}>Gratuit</span>
          )}
        </div>
        <div style={{ marginTop: 4, color: '#5e6075' }}>
          <strong>{language === 'fr' ? 'Clés locales :' : 'Local keys:'}</strong> {localKeys.length}
        </div>
      </div>

      {/* Diagnostic cloud — affiché après clic "Tester la connexion" */}
      {cloudDiag && (
        <div
          style={{
            background: '#fff',
            border: '1px solid #ece4d5',
            borderRadius: 10,
            padding: '10px 12px',
            marginBottom: 14,
            fontSize: 12.5,
            lineHeight: 1.6
          }}
        >
          <strong>{language === 'fr' ? '🔍 État Firestore (cloud)' : '🔍 Firestore state (cloud)'}</strong>
          <div style={{ marginTop: 6, color: '#5e6075' }}>
            {language === 'fr' ? 'Document users/{uid} : ' : 'users/{uid} doc: '}
            {cloudDiag.docExists ? '✓ existe' : '✗ absent'}
          </div>
          {cloudDiag.docExists && (
            <>
              <div style={{ color: '#5e6075' }}>
                {language === 'fr' ? 'Clés xl_/cl_ en cloud : ' : 'xl_/cl_ keys in cloud: '}
                <strong>{cloudDiag.keysInCloud ?? 0}</strong>
              </div>
              <div style={{ color: '#5e6075' }}>
                {language === 'fr' ? 'Leçons apprises (cl_learned_words) : ' : 'Learned lessons: '}
                <strong>{cloudDiag.learnedWordsCount ?? 0}</strong>
                {' '}
                {cloudDiag.hasLearnedWords ? '' : language === 'fr' ? '(clé absente)' : '(key missing)'}
              </div>
              <div style={{ color: '#5e6075' }}>
                {language === 'fr' ? 'Entitlement app : ' : 'App entitlement: '}
                <strong>{cloudDiag.entitlementApp ?? '—'}</strong>
              </div>
            </>
          )}
        </div>
      )}

      {/* Boutons d'action */}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 12 }}>
        <button
          type="button"
          onClick={testCloudRead}
          disabled={!user || busy !== null}
          style={{
            padding: '10px 16px',
            background: '#1f2937',
            color: '#fff',
            border: 'none',
            borderRadius: 10,
            fontWeight: 600,
            fontSize: 13,
            cursor: busy === null && user ? 'pointer' : 'not-allowed',
            opacity: busy === null && user ? 1 : 0.5
          }}
        >
          {busy === 'test'
            ? language === 'fr' ? 'Test…' : 'Testing…'
            : language === 'fr' ? '🔍 Tester la connexion cloud' : '🔍 Test cloud connection'}
        </button>
        <button
          type="button"
          onClick={pushAll}
          disabled={!user || busy !== null}
          style={{
            padding: '10px 16px',
            background: '#c6302c',
            color: '#fff',
            border: 'none',
            borderRadius: 10,
            fontWeight: 600,
            fontSize: 13,
            cursor: busy === null && user ? 'pointer' : 'not-allowed',
            opacity: busy === null && user ? 1 : 0.5
          }}
        >
          {busy === 'push'
            ? language === 'fr' ? 'Envoi…' : 'Pushing…'
            : language === 'fr' ? '⬆️ Forcer la sync vers le cloud' : '⬆️ Force push to cloud'}
        </button>
        <button
          type="button"
          onClick={pullAll}
          disabled={!user || busy !== null}
          style={{
            padding: '10px 16px',
            background: '#fff',
            color: '#c6302c',
            border: '1.5px solid #c6302c',
            borderRadius: 10,
            fontWeight: 600,
            fontSize: 13,
            cursor: busy === null && user ? 'pointer' : 'not-allowed',
            opacity: busy === null && user ? 1 : 0.5
          }}
        >
          {busy === 'pull'
            ? language === 'fr' ? 'Récupération…' : 'Pulling…'
            : language === 'fr' ? '⬇️ Recharger depuis le cloud' : '⬇️ Pull from cloud'}
        </button>
      </div>

      {/* Statut */}
      {status && (
        <p
          style={{
            margin: 0,
            padding: '8px 12px',
            background: status.startsWith('✓') ? '#e0f0e6' : status.startsWith('✗') ? '#fde7e5' : '#fdecd4',
            color: status.startsWith('✓') ? '#1b5e3e' : status.startsWith('✗') ? '#8b1f1c' : '#5e4500',
            borderRadius: 8,
            fontSize: 12.5
          }}
        >
          {status}
        </p>
      )}

      {/* Aide / mode d'emploi */}
      <details style={{ marginTop: 14 }}>
        <summary style={{ cursor: 'pointer', fontSize: 12, color: '#5e6075', fontWeight: 600 }}>
          {language === 'fr' ? 'Quand utiliser quoi ?' : 'When to use what?'}
        </summary>
        <div style={{ marginTop: 8, fontSize: 12, color: '#5e6075', lineHeight: 1.6 }}>
          <p style={{ margin: '6px 0' }}>
            <strong>⬆️ Forcer la sync vers le cloud :</strong>{' '}
            {language === 'fr'
              ? 'sur l\'appareil qui a la BONNE progression (le plus à jour). Pousse tout le localStorage vers Firestore.'
              : 'on the device with the CORRECT progress (most up-to-date). Pushes all localStorage to Firestore.'}
          </p>
          <p style={{ margin: '6px 0' }}>
            <strong>⬇️ Recharger depuis le cloud :</strong>{' '}
            {language === 'fr'
              ? 'sur l\'appareil qui a une PROGRESSION OBSOLÈTE. Récupère les données fraîches du cloud, écrase le local. Refresh la page après.'
              : 'on the device with OUTDATED progress. Pulls fresh data from cloud, overwrites local. Refresh the page afterwards.'}
          </p>
          <p style={{ margin: '6px 0' }}>
            <strong>⚠️ {language === 'fr' ? 'Important' : 'Important'} :</strong>{' '}
            {language === 'fr'
              ? 'vérifie d\'abord que l\'email affiché ci-dessus est le MÊME sur tous tes appareils.'
              : 'first check the email shown above is the SAME on all your devices.'}
          </p>
        </div>
      </details>
    </div>
  );
};

export default SyncDiagnosticPanel;
