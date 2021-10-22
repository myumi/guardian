import Color from './Color';
import { ColorInterface } from '../modules/types/types';
import '../styles/ColorProbability.scss'

interface ColorProbabilityProps {
  id: 'primary' | 'secondary' | 'tertiary';
  span: Array<ColorInterface>;
};

export default function ColorProbability({ id, span }: ColorProbabilityProps) {
  const makePercentage = (spanLength: number): string => {
    if (!spanLength) return '0%';

    return `${((1 / spanLength) * 100).toFixed(2)}%`;
  };

  return (
    <section className="color-probability">
      <h2>
        {`${id[0].toUpperCase()}${id.substring(1)}`} Color Outcomes
        {
          span.length > 0 &&
          `: ${makePercentage(span.length)} per color`
        }
      </h2>
      <div className="colors">
        {
          span.length <= 0 
          ? <span className="colors__empty-message">Please select {id} colors for both parents to see the range.</span> 
          : span.map((color) => 
            <Color 
              color={color}
              category={id}
              key={`${id}-${color.colorName}`}
            />)
        }
      </div>
    </section>
  );
}