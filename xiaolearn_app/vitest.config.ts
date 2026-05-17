/*
 * Configuration Vitest dédiée pour les tests unitaires des services /
 * helpers purs. Volontairement séparée de vite.config.ts qui contient des
 * plugins/middlewares (Gemini proxy, YT proxy, PWA) qui ne servent à rien
 * en test et alourdiraient l'init.
 *
 * Pour des tests qui touchent au DOM (composants React), il faudra ajouter
 * `environment: 'jsdom'` + `@testing-library/react`. Pas le cas pour les
 * premières suites — on reste sur du Node pur, beaucoup plus rapide.
 */

import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    globals: false,
    include: ['src/**/__tests__/**/*.test.ts'],
    // Coverage simple : on l'active à la demande via `vitest run --coverage`,
    // donc pas de config par défaut ici.
    reporters: 'default'
  }
});
