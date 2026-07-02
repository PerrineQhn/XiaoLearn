/**
 * BattleSessionPage — task #44
 * -----------------------------
 * Thin wrapper : branche `useBattleSession(matchId)` (session Firestore) sur
 * la vue partagée `BattleSessionView`. Toute la logique de rendu vit dans la
 * vue ; cette page se contente d'instancier le hook métier et de passer les
 * props.
 *
 * Pour les matchs 100% locaux (bot DEV), voir `BattleSessionPageLocal`.
 */

import { useBattleSession } from '../hooks/useBattleSession';
import BattleSessionView from './BattleSessionView';
import type { BattleMatch, CommunityLanguage } from '../types/community';

export interface BattleSessionPageProps {
  matchId: string;
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

const BattleSessionPage = (props: BattleSessionPageProps) => {
  const { matchId, language = 'fr', onMatchEnded, onBack, onRematch } = props;
  const session = useBattleSession(matchId);

  return (
    <BattleSessionView
      session={session}
      language={language}
      matchKey={matchId}
      onMatchEnded={onMatchEnded}
      onBack={onBack}
      onRematch={onRematch}
    />
  );
};

export default BattleSessionPage;
