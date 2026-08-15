/**
 * simulatorService — couche IA du Simulateur de Situations.
 *
 * Un scénario est un jeu de rôle : Prof. Xiao incarne un serveur, un médecin,
 * un agent de banque, et l'utilisateur doit atteindre un objectif en quelques
 * répliques. Le persona et les étapes sont décrits par
 * `buildSimulatorSystemPrompt`, dans `types/simulator.ts`.
 *
 * ## Une différence assumée avec le web
 *
 * La version web fait passer son prompt de scénario déguisé en premier message
 * UTILISATEUR, suivi d'une fausse réponse de l'assistant — un contournement
 * rendu nécessaire par la signature de son `generateGeminiResponse`, qui
 * n'expose pas le prompt système.
 *
 * Le proxy accepte pourtant un `systemPrompt` en propre, et le mobile s'en
 * sert. Ce n'est pas de la coquetterie : une consigne placée dans un tour
 * utilisateur reste un tour que le modèle peut relativiser, contredire, ou
 * simplement laisser filer au bout de quelques échanges. Placée à sa vraie
 * place, elle tient sur toute la conversation — ce qui compte ici, puisque le
 * modèle doit garder son personnage jusqu'à la dernière réplique.
 *
 * Effet de bord : le persona du scénario REMPLACE celui de Prof. Xiao au lieu
 * de s'y superposer. C'est le comportement voulu — le serveur du restaurant ne
 * doit pas se mettre à expliquer la grammaire comme un professeur.
 *
 * ## Format de réponse attendu
 *
 *   [hanzi]
 *   [pinyin]
 *   *[traduction en italique]*
 *
 * Et, quand l'objectif est atteint, `[SCENARIO_COMPLETE]` sur une ligne à part.
 */
import { callLlmProxy, type LlmProxyMessage } from '@/services/llmProxyClient';
import { parseCorrections, type AiCorrection } from '@/services/geminiService';
import {
  buildSimulatorSystemPrompt,
  type SimulatorScenario,
  type SimulatorTurn,
  type SimulatorCorrection,
} from '@/types/simulator';

export interface ParsedSimulatorResponse {
  hanzi: string;
  pinyin?: string;
  translationFr?: string;
  /** Texte brut du modèle, utile au diagnostic quand le format dérape. */
  raw: string;
  /** `[SCENARIO_COMPLETE]` détecté : l'objectif est atteint. */
  isComplete: boolean;
  corrections: SimulatorCorrection[];
}

/**
 * Découpe une réponse au format attendu.
 *
 * Volontairement tolérant : un modèle omet parfois le pinyin, ou oublie les
 * astérisques autour de la traduction. Plutôt que de rejeter la réponse — ce
 * qui coincerait la conversation — on reconnaît ce qu'on peut et on laisse le
 * reste dans `hanzi`, qui est toujours affiché.
 */
export function parseSimulatorResponse(raw: string): ParsedSimulatorResponse {
  const isComplete = /\[SCENARIO_COMPLETE\]/i.test(raw);
  const cleaned = raw.replace(/\[SCENARIO_COMPLETE\]/gi, '').trim();

  const lignes = cleaned.split('\n').map(l => l.trim()).filter(Boolean);

  let hanzi = '';
  let pinyin: string | undefined;
  let translationFr: string | undefined;

  if (lignes.length > 0) hanzi = lignes[0];
  if (lignes.length > 1) {
    const l1 = lignes[1];
    // Entourée d'astérisques : c'est la traduction, le pinyin a sauté.
    if (/^\*.*\*$/.test(l1)) translationFr = l1.replace(/^\*|\*$/g, '').trim();
    else pinyin = l1;
  }
  if (lignes.length > 2 && !translationFr) {
    translationFr = lignes[2].replace(/^\*|\*$/g, '').trim();
  }

  return { hanzi: hanzi || cleaned, pinyin, translationFr, raw: cleaned, isComplete, corrections: [] };
}

const versSimulatorCorrection = (c: AiCorrection): SimulatorCorrection => ({
  category: c.category,
  severity: c.severity,
  wrong: c.wrong,
  correct: c.correct,
  pinyin: c.pinyin,
  translation: c.translation,
  explanation: c.explanation,
});

/**
 * Envoie une réplique de l'utilisateur et renvoie celle du personnage.
 *
 * L'historique est reconstitué au format du modèle : les tours de l'assistant
 * sont ré-assemblés dans le format à trois lignes qu'il a lui-même produit,
 * pour qu'il continue de s'y tenir.
 */
export async function sendSimulatorMessage(
  scenario: SimulatorScenario,
  priorTurns: SimulatorTurn[],
  userMessage: string,
  lang: 'fr' | 'en' = 'fr',
): Promise<ParsedSimulatorResponse> {
  const history: LlmProxyMessage[] = priorTurns
    .filter(t => t.role === 'user' || t.role === 'assistant')
    .map(t => ({
      role: t.role as 'user' | 'assistant',
      content: t.role === 'assistant'
        ? [t.hanzi, t.pinyin, t.translationFr ? `*${t.translationFr}*` : undefined]
            .filter(Boolean).join('\n')
        : t.hanzi ?? '',
    }));

  const directiveLangue = lang === 'en'
    ? '\n\nLANGUAGE: write the italic translation line and any correction explanations in ENGLISH. Chinese and pinyin are unchanged.'
    : '';

  const { text } = await callLlmProxy({
    systemPrompt: buildSimulatorSystemPrompt(scenario) + directiveLangue,
    history,
    userMessage,
    // Température un peu plus basse que le chat libre : le personnage doit
    // rester dans son rôle et dans le format, pas faire preuve d'invention.
    generationConfig: { temperature: 0.6, maxOutputTokens: 1024, topK: 40, topP: 0.95 },
  });

  const { text: visible, corrections } = parseCorrections(text);
  const parsed = parseSimulatorResponse(visible);
  parsed.corrections = corrections.map(versSimulatorCorrection);
  return parsed;
}

/** Étape en cours, déduite du nombre de répliques déjà données. */
export function guessCurrentStepIndex(
  scenario: SimulatorScenario,
  turns: SimulatorTurn[],
): number {
  const nb = turns.filter(t => t.role === 'user').length;
  return Math.min(nb, scenario.steps.length - 1);
}
