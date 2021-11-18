import { Match as MatchType } from 'guardian';
import MatchedParent from './MatchedParent';
import '../../styles/matchmaking/Match.scss';

interface MatchInterface {
  match: MatchType
};

export default function Match({ match }: MatchInterface) {
  const { mother, father, chance } = match;

  return (
    <span className="matchmaking__match">
      <MatchedParent dragon={father} sex="father" />
      x
      <MatchedParent dragon={mother} sex="mother" />
      : <span className="matchmaking__match__chance">{+(chance * 100).toFixed(3)}%</span>
    </span>
  );
};