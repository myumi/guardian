import { useDispatch } from 'react-redux';
import { Dragon } from 'guardian';
import Color from '../Color';
import { ReactComponent as TrashSVG } from '../../assets/matchmaking/trash.svg';
import '../../styles/matchmaking/Parent.scss';
interface ParentInterface {
  dragon: Dragon,
  sex: 'mother' | 'father';
};

export default function Parent({ dragon, sex }: ParentInterface) {
  const dispatch = useDispatch();

  const { colors: { primary, secondary, tertiary }, name } = dragon;
  
  const setParent = () => {
      dispatch({ type: `dragon/${sex}Colors`, payload: {colors: { primary, secondary, tertiary }} });
      dispatch({ type: `dragon/${sex}Name`, payload: name });
  };

  const removeParent = () => {
    dispatch({ type: `matchmaking/remove${sex[0].toUpperCase() + sex.substring(1)}`, payload: dragon});
  };

  return (
    <>
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

      <div className="matchmaking__parent__colors">
        <Color color={primary} category="primary" />
        <Color color={secondary} category="secondary" />
        <Color color={tertiary} category="tertiary" />
      </div>

      <TrashSVG fill="#5F3E0E" className="matchmaking__parent__remove" onClick={removeParent} />
    </span>
    </>
  );
};