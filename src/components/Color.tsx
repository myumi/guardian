import { useDispatch, useSelector } from 'react-redux';
import '../styles/Color.scss';

interface ColorProps {
  colorName: string;
  colorCode: string;
  value?: number;
  category: 'primary' | 'secondary' | 'tertiary';
};

export default function Color({colorName, colorCode, value, category}: ColorProps) {
  const dispatch = useDispatch();
  const childColor = useSelector((state: any) => state.dragons.child.colors[category]);
  const isChildColor = value === childColor;

  const changeChildColor = () => {
    dispatch({
      type: 'dragon/childColors', 
      payload: {
        colors: {
          [category]: value,
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