import { useState } from 'react';
import store from '../store/store';
import MatchMakingList from './MatchMakingList';

export default function MatchMaking() {
  // this is def hacky -- need component to update when store changes
  // easiest way for a component to rerender is by changing the state
  let state: any = store.getState();
  const [componentState, updateState] = useState<number>(0);
  
  store.subscribe(() => {
    updateState(componentState + 1);
  });

  return (
    <section className="matchmaking">
      <MatchMakingList array={state.matchmaking.bestMatches}/>
      <MatchMakingList type="XY" array={state.matchmaking.bestXYMatches} />
      <MatchMakingList type="YZ" array={state.matchmaking.bestYZMatches} />
      <MatchMakingList type="XZ" array={state.matchmaking.bestXZMatches} />
      <MatchMakingList type="X" array={state.matchmaking.bestXMatches} />
      <MatchMakingList type="Y" array={state.matchmaking.bestYMatches} />
      <MatchMakingList type="Z" array={state.matchmaking.bestZMatches} />
    </section>
  );
}