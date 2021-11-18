import { useDispatch } from 'react-redux';
import { Dragon } from 'guardian';
import Color from '../Color';
import '../../styles/matchmaking/Parent.scss';
interface MatchedParentInterface {
  dragon: Dragon,
  sex: 'mother' | 'father';
};

export default function MatchedParent({ dragon, sex }: MatchedParentInterface) {
  const dispatch = useDispatch();

  const { colors: { primary, secondary, tertiary }, name } = dragon;
  
  const setParent = () => {
      dispatch({ type: `dragon/${sex}Colors`, payload: {colors: { primary, secondary, tertiary }} });
      dispatch({ type: `dragon/${sex}Name`, payload: name });
  };

  return (
    <span className="matchmaking__parent">
      <div className="matchmaking__parent__text">
        <span className="matchmaking__parent__name" onClick={setParent}>
          {name}
          <span className="matchmaking__parent__sex">
            {(sex === "mother")
              ? "♀ "
              : "♂ "}
          </span>
        </span>
      </div>

      <div className="matchmaking__matched-parent__colors">
        <Color color={primary} category="primary" interactable={false} />
        <Color color={secondary} category="secondary" interactable={false} />
        <Color color={tertiary} category="tertiary" interactable={false} />
      </div>
    </span>
  );
};