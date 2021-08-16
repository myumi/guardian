import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import ColorSelect from './ColorSelect';

interface DragonProps {
  id: string;
  colors: Array<number>;
}

export default function Dragon({ id, colors }: DragonProps) {
  const dispatch = useDispatch();
  const [primary, updatePrimary] = useState<number>(colors[0]);
  const [secondary, updateSecondary] = useState<number>(colors[1]);
  const [tertiary, updateTertiary] = useState<number>(colors[2]);

  // when colors change, update them in parent
  useEffect(() => {
    console.log(id)
    dispatch({type: `dragon/${id}Colors`, payload: [primary, secondary, tertiary]});
  }, [primary, secondary, tertiary, dispatch, id]);

  return (
    <section className="dragon" id={ id }>
      <input type="text" className="dragon__name" placeholder={`${id}'s name/ID`}/>
      <ColorSelect type={`primary_${id}`} value={primary} updateColor={updatePrimary} />
      <ColorSelect type={`secondary_${id}`} value={secondary} updateColor={updateSecondary} />
      <ColorSelect type={`tertiary_${id}`} value={tertiary} updateColor={updateTertiary}/>
    </section>
  )
}