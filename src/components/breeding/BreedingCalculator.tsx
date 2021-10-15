import { useSelector } from 'react-redux';
import Dragon from '../Dragon';
import ColorProbability from '../ColorProbability';
import '../../styles/BreedingCalculator.scss';
import BreedProbability from '../BreedProbability';

export default function Guardian() {
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
    <section id="breeding-calculator">
        <div id="breeding-calculator__selectors">
          <Dragon id="father" dragon={father} />
          <Dragon id="mother" dragon={mother} />
          <Dragon id="child" dragon={child} />
        </div>

        <div id="breeding-calculator__results">
          <div className="results__col color-probability">
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

            <BreedProbability />
          </div>
          <div className="results__col"></div>
          <div className="results__total"></div>
        </div>
    </section>
  )
}