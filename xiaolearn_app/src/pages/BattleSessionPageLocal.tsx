/**
 * BattleSessionPageLocal — task #56 (option 3)
 * ---------------------------------------------
 * Thin wrapper : branche `useLocalBotSession(initialMatch)` (session 100%
 * locale, sans Firestore) sur la vue partagée `BattleSessionView`.
 *
 * Utilisé pour les matchs contre le bot DEV : permet de jouer même si
 * Firestore est indisponible (quota dépassé, offline, coupure réseau).
 * L'UX est strictement identique à un vrai match Firestore.
 */

import { useLocalBotSession } from '../hooks/useLocalBotSession';
import BattleSessionView from './BattleSessionView';
import type { BattleMatch, CommunityLanguage } from '../types/community';

export interface BattleSessionPageLocalProps {
  /** Match pré-construit (user=p1, bot=p2, words remplis). */
  initialMatch: BattleMatch;
  language?: CommunityLanguage;
  onMatchEnded?: (payload: {
    match: BattleMatch;
    outcome: 'win' | 'loss' | 'draw';
    xp: number;
    perfect: boolean;
    myScore: number;
    oppScore: number;
  }) => void;
  onBack?: () => void;
  onRematch?: () => void;
}

const BattleSessionPageLocal = (props: BattleSessionPageLocalProps) => {
  const { initialMatch, language = 'fr', onMatchEnded, onBack, onRematch } = props;
  const session = useLocalBotSession(initialMatch);

  return (
    <BattleSessionView
      session={session}
      language={language}
      matchKey={initialMatch.id}
      onMatchEnded={onMatchEnded}
      onBack={onBack}
      onRematch={onRematch}
    />
  );
};

export default BattleSessionPageLocal;
