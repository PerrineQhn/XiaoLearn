/*
 * Stub minimal pour le module virtuel `virtual:pwa-register` exposé par
 * vite-plugin-pwa. Une fois `npm install` joué, le plugin écrase ce stub
 * via ses types officiels (ajoutés au plugin via le triple-slash directive
 * dans les fichiers générés).
 */

declare module 'virtual:pwa-register' {
  export interface RegisterSWOptions {
    /** Enregistre immédiatement sans attendre `load`. */
    immediate?: boolean;
    onNeedRefresh?: () => void;
    onOfflineReady?: () => void;
    onRegistered?: (registration: ServiceWorkerRegistration | undefined) => void;
    onRegisterError?: (error: unknown) => void;
  }
  export function registerSW(
    options?: RegisterSWOptions
  ): (reloadPage?: boolean) => Promise<void>;
}
