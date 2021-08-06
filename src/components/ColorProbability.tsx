import Color from './Color';
import { ColorInterface } from '../modules/ColorWheel';

interface ColorProbabilityProps {
  id: string;
  span: Array<ColorInterface>;
}

export default function ColorProbability({ id, span }: ColorProbabilityProps) {
  const makePercentage = (spanLength: number): string => {
    if (!spanLength) return '0%';

    return `${((1 / spanLength) * 100).toFixed(2)}%`;
  }

  return (
    <section>
      <h2>
        {id} Color Outcomes
        {
          span.length > 0 &&
          `: ${makePercentage(span.length)} per color`
        }
      </h2>
      {
        span.length <= 0 ?
        <span>Please select {id.toLowerCase()} colors for both parents to see the range.</span> :
        span.map(({colorName, colorCode}) => <Color colorName={colorName} colorCode={colorCode} key={`${id.toLowerCase()}-${colorName}`}/>)
      }
    </section>
  )
}