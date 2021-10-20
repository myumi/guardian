import { Dragon as DragonType } from 'guardian';
import { useSelector } from 'react-redux';
import MatchMakingList from './MatchMakingList';
import MatchMakingParent from './MatchMakingParent';
import AddParentButton from './AddParentButton';
import CalculateButton from './CalculateButton';
import '../../styles/MatchMaking.scss'
import Dragon from '../Dragon';

export default function MatchMaking() {
  const mother = useSelector((state: any) => state.dragons.mother);
  const father = useSelector((state: any) => state.dragons.father);
  const child = useSelector((state: any) => state.dragons.child);

  const matches: any = useSelector((state: any) => state.matchmaking);
  const motherParents = useSelector((state: any) => state.matchmaking.mothers);
  const fatherParents = useSelector((state: any) => state.matchmaking.fathers);
  
  return (
    <section className="matchmaking">
      <div className="matchmaking__dragons">
        <div>
          <Dragon id="mother" dragon={mother} />
          <AddParentButton id='mother' />
        </div>
        <div>        
          <Dragon id="father" dragon={father} />
          <AddParentButton id='father' />
        </div>
        <div>
          <Dragon id="child" dragon={child} />
          <CalculateButton />
        </div>
      </div>
      
      <div className="matchmaking__tier">
        <h1>Saved Parents for Matchmaking</h1>
        <ul className="matchmaking__parents" >
          {(!motherParents.length && !fatherParents.length) ? <span className="matchmaking__empty-statement">No parents have been saved here yet.</span> : ''}
          {motherParents.map((dragon: DragonType, index: number) => <li key={`${dragon}-${index}`}><MatchMakingParent dragon={dragon} sex='mother' /></li>)}
          {fatherParents.map((dragon: DragonType, index: number) => <li key={`${dragon}-${index}`}><MatchMakingParent dragon={dragon} sex='father' /></li>)}
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