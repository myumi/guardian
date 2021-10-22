import { useDispatch, useSelector } from 'react-redux';
import { colorWheel, getColor } from '../modules/ColorWheel';
interface ColorSelectProps {
  type: string; // primary, secondary, tertiary
  id: string; // mother, father, child
};

export default function ColorSelect({ type, id } : ColorSelectProps) {
  const dispatch = useDispatch();
  const value = useSelector((state: any) => state.dragons[id].colors[type].value);

  // when user changes color, update the store
  const handleChange = (event: any) => {
    dispatch({ type: `dragon/${id}Colors`, payload: { colors: { [type]: getColor(+event.target.value) } } });
  };

  return (
    <select 
      className="color-select" 
      id={`${id}_${type}`} 
      value={value} 
      onChange={handleChange}
    >
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
  );
};
