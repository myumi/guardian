import Color from './Color';
import { ColorInterface } from '../modules/types/types';
import '../styles/ColorProbability.scss'

interface ColorProbabilityProps {
  id: 'Primary' | 'Secondary' | 'Tertiary';
  span: Array<ColorInterface>;
  childColor: number;
}

export default function ColorProbability({ id, span, childColor }: ColorProbabilityProps) {
  const makePercentage = (spanLength: number): string => {
    if (!spanLength) return '0%';

    return `${((1 / spanLength) * 100).toFixed(2)}%`;
  }

  return (
    <section className="color-probability">
      <h2>
        {id} Color Outcomes
        {
          span.length > 0 &&
          `: ${makePercentage(span.length)} per color`
        }
      </h2>
      <div className="colors">
        {
          span.length <= 0 
          ? <span>Please select {id.toLowerCase()} colors for both parents to see the range.</span> 
          : span.map(({colorName, colorCode, value}) => 
            <Color 
              colorName={colorName} 
              colorCode={colorCode}
              value={value}
              category={id}
              isChildColor={childColor > -1 ? value === childColor : false}
              key={`${id.toLowerCase()}-${colorName}`}
            />)
        }
      </div>
    </section>
  )
}