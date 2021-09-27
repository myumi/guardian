import ColorSelect from './ColorSelect';
import { Dragon as DragonType } from 'guardian';
import '../styles/Dragon.scss';
import { useSelector } from 'react-redux';
interface DragonProps {
  id: string;
  dragon: DragonType;
};

export default function Dragon({ id, dragon }: DragonProps) {
  const value = useSelector((state: any) => state.dragons.child.name);

  const handleChange = (event: any) => {
    dispatch({
      type: `dragon/${id}Name`, 
      payload: event.target.value,
    });
  };

  return (
    <section className="dragon" id={ id }>
      <input 
        type="text" 
        className={`${id}__name`}
        value={value}
        placeholder={`${id}'s name/ID`}
        onChange={handleChange}
      />
      <ColorSelect id={id} type="primary" />
      <ColorSelect id={id} type="secondary" />
      <ColorSelect id={id} type="tertiary" />
    </section>
  );
};

function dispatch(arg0: { type: string; payload: { event: any; "": any; }; }) {
  throw new Error('Function not implemented.');
}
