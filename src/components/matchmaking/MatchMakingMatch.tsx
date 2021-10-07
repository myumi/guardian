import { Match } from 'guardian';
import MatchMakingParent from './MatchMakingParent';
import '../../styles/MatchMakingMatch.scss';

interface MatchMakingMatchInterface {
  match: Match
};

export default function MatchMakingMatch({ match }: MatchMakingMatchInterface) {
  const { mother, father, chance } = match;

  return (
    <span className="matchmaking__match">
      <MatchMakingParent dragon={father} sex="father" />
      x
      <MatchMakingParent dragon={mother} sex="mother" />
      : <span className="matchmaking__match__chance">{+(chance * 100).toFixed(3)}%</span>
    </span>
  );
};