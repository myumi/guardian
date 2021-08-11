import '../styles/Color.css';

interface ColorProps {
  colorName: string;
  colorCode: string;
  isChildColor: boolean;
  changeChildColor(): void;
}

export default function Color({colorName, colorCode, isChildColor, changeChildColor}: ColorProps) {
  return (
    <div 
      className={`color${isChildColor ? ' highlighted' : ''}`} 
      style={{backgroundColor: colorCode}} 
      title={colorName}
      onClick={changeChildColor}
    />
  )
}