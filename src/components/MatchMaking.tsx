import { useSelector } from 'react-redux';
import MatchMakingList from './MatchMakingList';

export default function MatchMaking() {
  const matches: any = useSelector((state: any) => state.matchmaking);

  return (
    <section className="matchmaking">
      <MatchMakingList array={matches.bestMatches}/>
      <MatchMakingList type="XY" array={matches.bestXYMatches} />
      <MatchMakingList type="YZ" array={matches.bestYZMatches} />
      <MatchMakingList type="XZ" array={matches.bestXZMatches} />
      <MatchMakingList type="X" array={matches.bestXMatches} />
      <MatchMakingList type="Y" array={matches.bestYMatches} />
      <MatchMakingList type="Z" array={matches.bestZMatches} />
    </section>
  );
}