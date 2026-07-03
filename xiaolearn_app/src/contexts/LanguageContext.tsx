/**
 * LanguageContext — accès global à la langue UI courante
 * -------------------------------------------------------
 * Évite de prop-drill la langue jusqu'aux composants profonds (AudioButton,
 * ErrorCorrectionCard, AudioSpeedToggle…). Le provider est monté au sommet
 * d'App.tsx avec la valeur du hook `useLanguagePref`.
 *
 * Les composants qui consomment cette langue peuvent :
 *   - accepter une prop `language` (compat / override explicite)
 *   - ou lire le contexte via `useLanguage()`
 *
 * Si aucun provider n'englobe l'arbre (tests unitaires, storybook…), on
 * retombe sur 'fr' — pas de crash, juste la langue par défaut historique.
 */

import { createContext, useContext, type ReactNode } from 'react';
import type { Language } from '../i18n';

const LanguageContext = createContext<Language>('fr');

export interface LanguageProviderProps {
  value: Language;
  children: ReactNode;
}

export const LanguageProvider = ({ value, children }: LanguageProviderProps) => (
  <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
);

export const useLanguage = (): Language => useContext(LanguageContext);
