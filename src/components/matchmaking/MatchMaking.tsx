import { Dragon as DragonType } from 'guardian';
import { useSelector } from 'react-redux';
import MatchMakingList from './MatchMakingList';
import Parent from './Parent';
import AddParentButton from './AddParentButton';
import CalculateButton from './CalculateButton';
import Dragon from '../Dragon';
import '../../styles/matchmaking/MatchMaking.scss'

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
          <Dragon id="mother" dragon={mother} matchmaking={true} />
          <AddParentButton id='mother' />
        </div>
        <div>        
          <Dragon id="father" dragon={father} matchmaking={true} />
          <AddParentButton id='father' />
        </div>
        <div>
          <Dragon id="child" dragon={child} matchmaking={true} />
          <CalculateButton />
        </div>
      </div>
      
      <div className="matchmaking__tier">
        <h1>Saved Parents for Matchmaking</h1>
        {(!motherParents.length && !fatherParents.length) ? <span className="matchmaking__empty-statement">No parents have been saved yet.</span> : ''}
        <ul className="matchmaking__parents" >
          {motherParents.map((dragon: DragonType, index: number) => <li key={`${dragon.name}-${index}`}><Parent dragon={dragon} sex='mother' /></li>)}
          {fatherParents.map((dragon: DragonType, index: number) => <li key={`${dragon.name}-${index}`}><Parent dragon={dragon} sex='father' /></li>)}
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