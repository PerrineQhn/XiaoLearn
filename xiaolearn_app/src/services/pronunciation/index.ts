/**
 * services/pronunciation/index.ts — Phase 4 IA, façade publique.
 *
 * Le reste de l'app n'importe que `assessPronunciation` depuis ici, sans
 * connaître le provider concret. Pour basculer vers Azure / self-hosted,
 * il suffira d'appeler `setPronunciationProvider(new AzureProvider())` au
 * démarrage de l'app — aucun changement ailleurs.
 *
 * Provider actif par défaut : Gemini multimodal audio (cf. geminiProvider).
 */
import { GeminiPronunciationProvider } from './geminiProvider';
import type {
  PronunciationProvider,
  PronunciationInput,
  PronunciationResult
} from './types';

let activeProvider: PronunciationProvider = new GeminiPronunciationProvider();

/** Remplace le provider actif (pour tests / migration). */
export function setPronunciationProvider(provider: PronunciationProvider): void {
  activeProvider = provider;
}

/** Renvoie le nom du provider actif (debug/UI). */
export function getActiveProviderName(): string {
  return activeProvider.name;
}

/** Vrai si le provider actif est utilisable (clé API présente, etc.). */
export function isPronunciationAvailable(): boolean {
  return activeProvider.isAvailable();
}

/** Lance l'analyse de prononciation via le provider actif. */
export function assessPronunciation(
  input: PronunciationInput
): Promise<PronunciationResult> {
  return activeProvider.assess(input);
}

// Re-export des types pour les consommateurs
export type {
  PronunciationProvider,
  PronunciationInput,
  PronunciationResult,
  SyllableScore
} from './types';
