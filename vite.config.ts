import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Charger les variables d'environnement depuis .env.local ou .env.production
  const env = loadEnv(mode, process.cwd(), '');

  // Priorité : process.env (GitHub Actions) > fichiers .env (local)
  const useCustomDomain = process.env.VITE_USE_CUSTOM_DOMAIN || env.VITE_USE_CUSTOM_DOMAIN;

  return {
    // Utiliser '/' pour domaine personnalisé, '/XiaoLearn/' pour GitHub Pages sans domaine
    base: useCustomDomain === 'true' ? '/' : '/XiaoLearn/',
    plugins: [react()],
    server: {
      port: 5173
    },
    build: {
      chunkSizeWarningLimit: 6000
    }
  };
});
