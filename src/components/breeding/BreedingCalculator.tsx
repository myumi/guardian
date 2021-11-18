import { useSelector } from 'react-redux';
import Dragon from '../Dragon';
import ColorProbability from './ColorProbability';
import '../../styles/breeding/BreedingCalculator.scss';
import BreedProbability from './BreedProbability';
import GeneProbability from './GeneProbability';
import TotalProbability from './TotalProbability';

export default function BreedingCalculator() {
  const mother = useSelector((state: any) => state.dragons.mother);
  const father = useSelector((state: any) => state.dragons.father);
  const child = useSelector((state: any) => state.dragons.child);

  const primarySpan = useSelector((state: any) => state.dragons.primarySpan);
  const secondarySpan = useSelector((state: any) => state.dragons.secondarySpan);
  const tertiarySpan = useSelector((state: any) => state.dragons.tertiarySpan);

  return (
    <section id="breeding-calculator">
        <div id="breeding-calculator__selectors">
          <Dragon id="mother" dragon={mother} />
          <Dragon id="father" dragon={father} />
          <Dragon id="child" dragon={child} />
        </div>

        <div id="breeding-calculator__results">
          <div className="results__col color-probability">
            <BreedProbability />

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
          <div className="results__col gene-probability">
            <GeneProbability type={'primary'} />
            <GeneProbability type={'secondary'} />
            <GeneProbability type={'tertiary'} />
          </div>

          <TotalProbability />
        </div>
    </section>
  )
}