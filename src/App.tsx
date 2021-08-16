import { useSelector } from 'react-redux';
import store from './store/store';
import Header from './components/Header';
import Dragon from './components/Dragon';
import ColorProbability from './components/ColorProbability';
import './App.css';

function App() {
  // redux setup
  console.log('Initial state: ', store.getState());

  const motherColors = useSelector((state: any) => state.dragons.motherColors);
  const fatherColors = useSelector((state: any) => state.dragons.fatherColors);
  const childColors = useSelector((state: any) => state.child.childColors);

  const primarySpan = useSelector((state: any) => state.dragons.primarySpan);
  const secondarySpan = useSelector((state: any) => state.dragons.secondarySpan);
  const tertiarySpan = useSelector((state: any) => state.dragons.tertiarySpan);

  const getTotalPercentage = (primarySpanLength: number, secondarySpanLength: number, TertiarySpanLength: number): string => {
    const total = (1 / primarySpanLength) * (1 / secondarySpanLength) * (1 / TertiarySpanLength);

    return `${(total * 100).toFixed(2)}%`;
  }

  return (
    <div className="App">
      <Header />
      <main>
        <Dragon id="mother" colors={motherColors} />
        <Dragon id="father" colors={fatherColors} />
        <Dragon id="child" colors={childColors} />

        <ColorProbability
          id="Primary"
          span={primarySpan}
          child={childColors[0]}
        />
        <ColorProbability
          id="Secondary"
          span={secondarySpan}
          child={childColors[1]}
        />
        <ColorProbability
          id="Tertiary"
          span={tertiarySpan}
          child={childColors[2]}
        />

        {
          primarySpan.length > 0 && 
          secondarySpan.length > 0 && 
          tertiarySpan.length > 0 &&
          <h3>Total Chance for Specific Child: {getTotalPercentage(primarySpan.length, secondarySpan.length, tertiarySpan.length)}</h3> 
        }
      </main>
    </div>
  )
}

export default App;