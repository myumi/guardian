import { useDispatch } from 'react-redux';
import { Dragon } from 'guardian';
import Color from '../Color';
import '../../styles/MatchMakingParent.scss';

interface MatchMakingParentInterface {
  dragon: Dragon,
  sex: 'mother' | 'father';
};

export default function MatchMakingParent({ dragon, sex }: MatchMakingParentInterface) {
  const dispatch = useDispatch();

  const { colors: { primary, secondary, tertiary }, name } = dragon;
  
  const setParent = () => {
      dispatch({ type: `dragon/${sex}Colors`, payload: {colors: { primary, secondary, tertiary }} });
      dispatch({ type: `dragon/${sex}Name`, payload: name });
  };
  return (
    <span className="matchmaking__parent">
      <span onClick={setParent}>
        <span className="matchmaking__parent__name">{name}</span>
        {
          (sex === "mother")
            ? " ♀"
            : " ♂"
        }
      </span>
      <Color color={primary} category="primary" />
      <Color color={secondary} category="secondary" />
      <Color color={tertiary} category="tertiary" />
    </span>
  );
};