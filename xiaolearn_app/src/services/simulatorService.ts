/**
 * simulatorService.ts — couche IA du Simulateur (XiaoLearn V6)
 * -------------------------------------------------------------
 * Branche un `SimulatorScenario` sur `generateGeminiResponse` en injectant
 * un system prompt spécifique au scénario (persona, étapes, registre).
 *
 * Format attendu de l'IA :
 *   [hanzi]
 *   [pinyin]
 *   *[traduction FR en italique markdown]*
 *
 * Quand le scénario est terminé, l'IA ajoute `[SCENARIO_COMPLETE]` sur une
 * ligne à part — on le détecte côté client pour basculer sur l'écran de succès.
 */
import { generateGeminiResponse } from './geminiService';
import type {
  SimulatorScenario,
  SimulatorTurn
} from '../types/simulator';
import { buildSimulatorSystemPrompt } from '../types/simulator';

export interface ParsedSimulatorResponse {
  hanzi: string;
  pinyin?: string;
  translationFr?: string;
  /** Raw text tel que renvoyé par le LLM (utile debug). */
  raw: string;
  /** True si le marqueur [SCENARIO_COMPLETE] est présent. */
  isComplete: boolean;
}

/**
 * Parse une réponse Gemini au format attendu du simulateur.
 * Tolère des variantes (pinyin sur la même ligne, traduction sans italique, etc.)
 */
export function parseSimulatorResponse(raw: string): ParsedSimulatorResponse {
  const isComplete = /\[SCENARIO_COMPLETE\]/i.test(raw);
  const cleaned = raw.replace(/\[SCENARIO_COMPLETE\]/gi, '').trim();

  // On coupe en lignes non vides
  const lines = cleaned
    .split('\n')
    .map((l) => l.trim())
    .filter((l) => l.length > 0);

  let hanzi = '';
  let pinyin: string | undefined;
  let translationFr: string | undefined;

  // Heuristique : la 1ère ligne contient des hanzi, la 2e du pinyin, la 3e
  // est en français (italique markdown *...*).
  if (lines.length > 0) hanzi = lines[0];
  if (lines.length > 1) {
    const l1 = lines[1];
    // Si c'est entouré d'étoiles, c'est la traduction — pinyin absent
    if (/^\*.*\*$/.test(l1)) {
      translationFr = l1.replace(/^\*/, '').replace(/\*$/, '').trim();
    } else {
      // Sinon on considère que c'est du pinyin (lettres latines + tons ou accents)
      pinyin = l1;
    }
  }
  if (lines.length > 2) {
    const l2 = lines[2];
    if (!translationFr) {
      translationFr = l2.replace(/^\*/, '').replace(/\*$/, '').trim();
    }
  }

  return {
    hanzi: hanzi || cleaned,
    pinyin,
    translationFr,
    raw: cleaned,
    isComplete
  };
}

/**
 * Envoie un message utilisateur à l'IA dans le contexte d'un scénario.
 */
export async function sendSimulatorMessage(
  scenario: SimulatorScenario,
  priorTurns: SimulatorTurn[],
  userMessage: string
): Promise<ParsedSimulatorResponse> {
  // On transforme l'historique au format attendu par geminiService.
  // Le 1er "user" message portera le system prompt complet.
  const systemPrompt = buildSimulatorSystemPrompt(scenario);

  const history = priorTurns
    .filter((t) => t.role === 'user' || t.role === 'assistant')
    .map((t) => ({
      role: t.role as 'user' | 'assistant',
      content:
        t.role === 'assistant'
          ? [t.hanzi, t.pinyin, t.translationFr ? `*${t.translationFr}*` : undefined]
              .filter(Boolean)
              .join('\n')
          : t.hanzi ?? ''
    }));

  // On préfixe l'instruction système au tout premier message utilisateur.
  // geminiService accepte un user+model pair pour injecter un system prompt.
  const conversation = [
    { role: 'user' as const, content: systemPrompt },
    {
      role: 'assistant' as const,
      content:
        scenario.openingLineHanzi && scenario.openingLinePinyin && scenario.openingLineFr
          ? `${scenario.openingLineHanzi}\n${scenario.openingLinePinyin}\n*${scenario.openingLineFr}*`
          : 'Compris. Je commence le scénario.'
    },
    ...history
  ];

  const raw = await generateGeminiResponse(userMessage, conversation);
  return parseSimulatorResponse(raw);
}

/**
 * Détecte l'étape en cours à partir du nombre de tours utilisateur consommés.
 * Version simpliste — se base sur la progression linéaire.
 * (Peut être remplacée plus tard par une détection LLM-driven sur les critères.)
 */
export function guessCurrentStepIndex(
  scenario: SimulatorScenario,
  turns: SimulatorTurn[]
): number {
  const userTurns = turns.filter((t) => t.role === 'user').length;
  return Math.min(userTurns, scenario.steps.length - 1);
}
