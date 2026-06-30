import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
// Enregistre le service worker (généré par vite-plugin-pwa) pour le mode
// offline + précache. `autoUpdate` est configuré côté vite.config -> on n'a
// pas besoin de gérer le "nouvelle version dispo" ici, le SW se remplace
// silencieusement à chaque deploy.
import { registerSW } from 'virtual:pwa-register';

// V17 — Build identifier visible dans la console au startup pour diagnostiquer
// les problèmes de cache PWA / CDN qui servent un ancien bundle. Le hash
// change à chaque build Vite (timestamp). Si la prod affiche un BUILD_ID
// ancien dans la console, c'est que le navigateur sert un cache et il faut
// vider le SW (DevTools > Application > Service Workers > Unregister + Clear
// site data).
const BUILD_ID = `xl-${import.meta.env.MODE}-${Date.now()}`;
console.info(
  '%cXiaoLearn build',
  'color:#d8483e;font-weight:bold;font-size:14px',
  BUILD_ID
);
// @ts-expect-error — expose pour debug user
window.__XL_BUILD_ID = BUILD_ID;

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Idempotent : appelé une seule fois au chargement. Ne fait rien en dev
// (vite-plugin-pwa désactive le SW en dev via devOptions.enabled=false).
//
// V17 — On déclenche aussi un updateCheck manuel toutes les 5 minutes pour
// que le SW pull les nouveaux bundles plus agressivement (sinon Workbox
// peut tarder plusieurs heures à détecter une nouvelle version).
if (typeof window !== 'undefined') {
  const updateSW = registerSW({
    immediate: true,
    onNeedRefresh() {
      console.info('[xl-sw] new version available, reloading…');
      // Reload automatique : le nouveau SW prend le contrôle à la fin.
      window.location.reload();
    },
    onOfflineReady() {
      console.info('[xl-sw] ready for offline use');
    }
  });
  // Force un check au mount + toutes les 5 min (utile si l'utilisateur garde
  // l'app ouverte longtemps sans rafraîchir).
  setInterval(() => {
    updateSW(true).catch(() => { /* silent */ });
  }, 5 * 60 * 1000);
}
