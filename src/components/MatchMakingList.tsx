import { Match } from '../types';

interface MatchMakingListProps {
  array: Array<Match>;
  type?: string;
}

// todo: change to dragon, not array
export default function MatchMakingList({array, type}: MatchMakingListProps) {
  const emptyStatement = 'None of the pairs provide a match for this category.';

  return (
    <div className="matchmaking__list">
      {
        type
        ? <h3>Best {type} Matches</h3>
        : <h3>Best Matches</h3>
      }
      <ol>
        {
          array.length 
          ? array.map((item: any, index: number) => {
            return <li key={`${type}: ${index}`}>{item.mother.name} x {item.father.name}: {+item.chance.toFixed(5)}%</li>
          })
          : emptyStatement
        }
      </ol>
    </div>
  );
}