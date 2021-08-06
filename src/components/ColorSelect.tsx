import { useState } from 'react';
import { colorWheel } from '../modules/ColorWheel';

interface ColorSelectProps {
  type: string;
  value: number;
  updateParent: Function;
}

export default function ColorSelect({ type, value, updateParent }: ColorSelectProps) {
  const [current, updateCurrent] = useState<number>(value);

  const handleChange = (event: any) => {
    updateCurrent(event.target.value);
    updateParent(event.target.value);
  }

  return (
    <select className="color-select" id={type} value={current} onChange={handleChange}>
      {/* the default value is the type (primary, secondary, etc) */}
      <option value="0">({type.split('_')[0]} color)</option>

      {/* all of the colors in the color wheel, in order */}
      {
        colorWheel.map(({ colorName, colorCode, textColor }, idx) => {
          return (
            <option key={idx} value={idx}>{colorName.toLowerCase()}</option>
          );
        })
      }
    </select>
  )
}