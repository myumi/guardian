import { Match as MatchType } from 'guardian';
import Match from './Match';
import '../../styles/matchmaking/MatchMakingList.scss';

interface MatchMakingListProps {
  matches: Array<MatchType>;
  type?: string;
}

export default function MatchMakingList({ matches, type }: MatchMakingListProps) {
  const emptyStatement = 'None of the pairs saved provide a match for this category.';

  return (
    <div className="matchmaking__list">
      {
        type
        ? <h3>Best {type} Matches</h3>
        : <h3>Best Matches</h3>
      }
      <ol>
        {
          matches.length 
          ? matches.map((pair: any, index: number) => {
            return <li key={`${type}: ${index}`}><Match match={pair} /></li>
          })
          : <span className="matchmaking__empty-statement">{emptyStatement}</span>
        }
      </ol>
    </div>
  );
}