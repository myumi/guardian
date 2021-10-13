import ColorSelect from './ColorSelect';
import { Dragon as DragonType } from 'guardian';
import '../styles/Dragon.scss';
import { useDispatch, useSelector } from 'react-redux';
import AddParentButton from './matchmaking/AddParentButton';
import CalculateButton from './matchmaking/CalculateButton';
interface DragonProps {
  id: string;
  dragon: DragonType;
};

export default function Dragon({ id, dragon }: DragonProps) {
  const dispatch = useDispatch();
  const value = useSelector((state: any) => state.dragons[id].name);

  const handleChange = (event: any) => {
    dispatch({
      type: `dragon/${id}Name`, 
      payload: event.target.value,
    });
  };

  return (
    <section className="dragon" id={id}>
      <input 
        type="text"
        className="dragon__name"
        id={`${id}__name`}
        value={value}
        maxLength={16}
        placeholder={`${id}'s name/ID`}
        onChange={handleChange}
      />
      <ColorSelect id={id} type="primary" />
      <ColorSelect id={id} type="secondary" />
      <ColorSelect id={id} type="tertiary" />
    </section>
  );
};