import { useEffect, useState } from 'react';
import Header from './components/Header';
import Dragon from './components/Dragon';
import ColorProbability from './components/ColorProbability';
import { ColorInterface, getSpanBetweenColors } from './modules/ColorWheel';
import './App.css';

function App() {
  const [motherColors, updateMotherColors] = useState<Array<number>>([-1, -1, -1]);
  const [fatherColors, updateFatherColors]= useState<Array<number>>([-1, -1, -1]);

  const [primarySpan, updatePrimarySpan] = useState<Array<ColorInterface>>([]);
  const [secondarySpan, updateSecondarySpan] = useState<Array<ColorInterface>>([]);
  const [tertiarySpan, updateTertiarySpan] = useState<Array<ColorInterface>>([]);

  // updates the color span when colors are updated
  useEffect(() => {
    // make map aligning indexes with span update function
    const spanUpdateFunctions:  Map<number, Function> = new Map ([
      [0, (span: Array<ColorInterface>) => updatePrimarySpan(span)],
      [1, (span: Array<ColorInterface>) => updateSecondarySpan(span)],
      [2, (span: Array<ColorInterface>) => updateTertiarySpan(span)],
    ])

    // iterate through each of the colors and update the spans
    for (let i = 0; i < motherColors.length; i++) {
        const update = spanUpdateFunctions.get(i);
        if (update) update(getSpanBetweenColors(motherColors[i], fatherColors[i]));
      }
  }, [motherColors, fatherColors]);

  const getTotalPercentage = (primarySpanLength: number, secondarySpanLength: number, TertiarySpanLength: number): string => {
    const total = (1 / primarySpanLength) * (1 / secondarySpanLength) * (1 / TertiarySpanLength);

    return `${(total * 100).toFixed(2)}%`;
  }

  return (
    <div className="App">
      <Header />
      <main>
        <Dragon id="mother" updateColors={updateMotherColors} />
        <Dragon id="father" updateColors={updateFatherColors} />

        <ColorProbability id="Primary" span={primarySpan} />
        <ColorProbability id="Secondary" span={secondarySpan} />
        <ColorProbability id="Tertiary" span={tertiarySpan} />

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