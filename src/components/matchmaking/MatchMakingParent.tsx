import { useDispatch } from 'react-redux';
import { Dragon } from 'guardian';
import { colorWheel } from '../../modules/ColorWheel';
import Color from '../Color';
import '../../styles/MatchMakingParent.scss';

interface MatchMakingParentInterface {
  dragon: Dragon,
  sex: 'mother' | 'father';
};

export default function MatchMakingParent({ dragon, sex }: MatchMakingParentInterface) {
  const dispatch = useDispatch();
  const { primary, secondary, tertiary, name } = dragon;
  const { colorName: pName, colorCode: pCode, value: pValue } = colorWheel[primary];
  const { colorName: sName, colorCode: sCode, value: sValue } = colorWheel[secondary];
  const { colorName: tName, colorCode: tCode, value: tValue } = colorWheel[tertiary];
  
  const setParent = () => {
      dispatch({ type: `dragon/${sex}Colors`, payload: { primary, secondary, tertiary } });
      dispatch({ type: `dragon/${sex}Name`, payload: name });
  };
  return (
    <span className="matchmaking__parent">
      <span onClick={setParent}>
        {name}
        {
          (sex === "mother")
          // ? <img alt="Female symbol" src="https://www1.flightrising.com/static/layout/lair/icons/female.png" />
          // : <img alt="Male symbol" src="https://www1.flightrising.com/static/layout/lair/icons/male.png" />
          ? " ♀"
          : " ♂"
        }
      </span>
      <Color colorName={pName} colorCode={pCode} value={pValue} category="primary" />
      <Color colorName={sName} colorCode={sCode} value={sValue} category="secondary" />
      <Color colorName={tName} colorCode={tCode} value={tValue} category="tertiary" />
    </span>
  );
};