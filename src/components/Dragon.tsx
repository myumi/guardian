import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import store from '../store/store';
import ColorSelect from './ColorSelect';
import '../styles/Dragon.scss';

interface DragonProps {
  id: string;
  colors: Array<number>;
}

export default function Dragon({ id, colors }: DragonProps) {
  const dispatch = useDispatch();
  const [primary, updatePrimary] = useState<number>(colors[0]);
  const [secondary, updateSecondary] = useState<number>(colors[1]);
  const [tertiary, updateTertiary] = useState<number>(colors[2]);

  // this seems hacky; when Color is clicked, the select elements need to update
  // without this they don't change
  store.subscribe(() => {
    const state: any = store.getState();
    const type = id === 'child' ? 'child' : 'dragons';
    updatePrimary(state[type][`${id}Colors`][0]);
    updateSecondary(state[type][`${id}Colors`][1]);
    updateTertiary(state[type][`${id}Colors`][2]);
  });

  // when colors change from select elements, update them in store
  useEffect(() => {
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