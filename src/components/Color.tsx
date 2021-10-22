import { useDispatch, useSelector } from 'react-redux';
import { getColor } from '../modules/ColorWheel';
import { ColorInterface } from '../modules/types/types';
import '../styles/Color.scss';

interface ColorProps {
  color: ColorInterface;
  category: 'primary' | 'secondary' | 'tertiary';
};

export default function Color({ color, category }: ColorProps) {
  const dispatch = useDispatch();
  const childColor = useSelector((state: any) => state.dragons.child.colors[category].value);
  const { colorName, colorCode, value } = color;
  const isChildColor = value === childColor;

  const changeChildColor = () => {
    dispatch({
      type: 'dragon/childColors', 
      payload: {
        colors: {
          [category]: getColor(value),
        },
      }
    });
  };

  return (
    <div 
      className={`color${isChildColor ? ' highlighted' : ''}`} 
      style={{backgroundColor: colorCode}} 
      title={colorName}
      onClick={changeChildColor}
    />
  );
}