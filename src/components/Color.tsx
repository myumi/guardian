import '../styles/Color.css';

interface ColorProps {
  colorName: string,
  colorCode: string,
}

export default function Color({colorName, colorCode}: ColorProps) {
  return (
    <div className="color" style={{backgroundColor: colorCode}} title={colorName}/>
  )
}