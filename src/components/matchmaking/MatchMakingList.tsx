import { Match } from 'guardian';
import MatchMakingMatch from './MatchMakingMatch';
import '../../styles/MatchMakingList.scss';

interface MatchMakingListProps {
  matches: Array<Match>;
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
          ? matches.map((item: any, index: number) => {
            return <li key={`${type}: ${index}`}><MatchMakingMatch match={item} /></li>
          })
          : <span className="matchmaking__empty-statement">{emptyStatement}</span>
        }
      </ol>
    </div>
  );
}