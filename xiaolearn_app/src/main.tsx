import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
// Enregistre le service worker (généré par vite-plugin-pwa) pour le mode
// offline + précache. `autoUpdate` est configuré côté vite.config -> on n'a
// pas besoin de gérer le "nouvelle version dispo" ici, le SW se remplace
// silencieusement à chaque deploy.
import { registerSW } from 'virtual:pwa-register';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Idempotent : appelé une seule fois au chargement. Ne fait rien en dev
// (vite-plugin-pwa désactive le SW en dev via devOptions.enabled=false).
if (typeof window !== 'undefined') {
  registerSW({ immediate: true });
}
