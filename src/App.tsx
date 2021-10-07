import { useSelector } from 'react-redux';
import Header from './components/Header';
import Dragon from './components/Dragon';
import ColorProbability from './components/ColorProbability';
import MatchMaking from './components/matchmaking/MatchMaking';
import './styles/Guardian.scss';

function App() {
  const mother = useSelector((state: any) => state.dragons.mother);
  const father = useSelector((state: any) => state.dragons.father);
  const child = useSelector((state: any) => state.dragons.child);

  const primarySpan = useSelector((state: any) => state.dragons.primarySpan);
  const secondarySpan = useSelector((state: any) => state.dragons.secondarySpan);
  const tertiarySpan = useSelector((state: any) => state.dragons.tertiarySpan);

  const getTotalPercentage = (primarySpanLength: number, secondarySpanLength: number, TertiarySpanLength: number): string => {
    const total = (1 / primarySpanLength) * (1 / secondarySpanLength) * (1 / TertiarySpanLength);

    return `${(total * 100).toFixed(5)}%`;
  }

  return (
    <div id="guardian">
      <Header />
      <main>
        <div id="dragon__selectors">
          <Dragon id="father" dragon={father} />
          <Dragon id="mother" dragon={mother} />
          <Dragon id="child" dragon={child} />
        </div>

        <div id="color-probabilities">
          <ColorProbability
            id="primary"
            span={primarySpan}
          />
          <ColorProbability
            id="secondary"
            span={secondarySpan}
          />
          <ColorProbability
            id="tertiary"
            span={tertiarySpan}
          />
        </div>

        {
          primarySpan.length > 0 && 
          secondarySpan.length > 0 && 
          tertiarySpan.length > 0 &&
          <h3>Total Chance for Specific Child: {getTotalPercentage(primarySpan.length, secondarySpan.length, tertiarySpan.length)}</h3> 
        }
        
        <MatchMaking />
      </main>
    </div>
  )
}

export default App;