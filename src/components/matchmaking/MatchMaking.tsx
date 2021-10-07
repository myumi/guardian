import { Dragon } from 'guardian';
import { useSelector } from 'react-redux';
import MatchMakingList from './MatchMakingList';
import MatchMakingParent from './MatchMakingParent';
import '../../styles/MatchMaking.scss'

export default function MatchMaking() {
  const matches: any = useSelector((state: any) => state.matchmaking);
  const motherParents = useSelector((state: any) => state.matchmaking.mothers);
  const fatherParents = useSelector((state: any) => state.matchmaking.fathers);
  
  return (
    <section className="matchmaking">
      <div className="matchmaking__tier">
        <h1>Saved Parents for Matchmaking</h1>
        <ul className="matchmaking__parents" >
          {(!motherParents.length && !fatherParents.length) ? <span className="matchmaking__empty-statement">No parents have been saved here yet.</span> : ''}
          {motherParents.map((dragon: Dragon, index: number) => <li key={`${dragon}-${index}`}><MatchMakingParent dragon={dragon} sex='mother' /></li>)}
          {fatherParents.map((dragon: Dragon, index: number) => <li key={`${dragon}-${index}`}><MatchMakingParent dragon={dragon} sex='father' /></li>)}
        </ul>
      </div>

      <MatchMakingList matches={matches.bestMatches} />
      <MatchMakingList type="Primary & Secondary" matches={matches.bestXYMatches} />
      <MatchMakingList type="Secondary & Tertiary" matches={matches.bestYZMatches} />
      <MatchMakingList type="Primary & Tertiary" matches={matches.bestXZMatches} />
      <MatchMakingList type="Primary" matches={matches.bestXMatches} />
      <MatchMakingList type="Secondary" matches={matches.bestYMatches} />
      <MatchMakingList type="Tertiary" matches={matches.bestZMatches} />

    </section>
  );
}