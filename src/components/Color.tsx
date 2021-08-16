import { useDispatch, useSelector } from 'react-redux';
import '../styles/Color.css';

interface ColorProps {
  colorName: string;
  colorCode: string;
  value?: number;
  category: string;
  isChildColor: boolean;
}

export default function Color({colorName, colorCode, value, category, isChildColor}: ColorProps) {
  const dispatch = useDispatch()
  const childColors = useSelector((state: any) => state.child.childColors);

  const categoryMap = [
    'Primary',
    'Secondary',
    'Tertiary',
  ];

  const changeChildColor = () => {
    const copy = [...childColors]
    const index = categoryMap.indexOf(category)
    copy[index] = value
    dispatch({type: 'color/childColors', payload: copy})
  }

  return (
    <div 
      className={`color${isChildColor ? ' highlighted' : ''}`} 
      style={{backgroundColor: colorCode}} 
      title={colorName}
      onClick={changeChildColor}
    />
  )
}