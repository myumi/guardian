import { useState } from 'react';
import { colorWheel } from '../modules/ColorWheel';

interface ColorSelectProps {
  type: string;
  value: number;
  updateParent: Function;
}

export default function ColorSelect({ type, value, updateParent }: ColorSelectProps) {

  const handleChange = (event: any) => {
    updateParent(+event.target.value);
  }

  return (
    <select className="color-select" id={type} value={value} onChange={handleChange}>
      {/* the default value is the type (primary, secondary, etc) */}
      <option value="-1">({type.split('_')[0]} color)</option>

      {/* all of the colors in the color wheel, in order */}
      {
        colorWheel.map(({ colorName }, idx) => {
          return (
            <option key={idx} value={idx}>{colorName.toLowerCase()}</option>
          );
        })
      }
    </select>
  )
}