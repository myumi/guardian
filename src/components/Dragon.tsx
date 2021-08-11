import { useEffect, useState } from 'react';
import ColorSelect from './ColorSelect';

interface DragonProps {
  id: string;
  colors: Array<number>;
  updateColors: Function;
}

export default function Dragon({ id, colors, updateColors }: DragonProps) {
  const [primary, updatePrimary] = useState<number>(colors[0]);
  const [secondary, updateSecondary] = useState<number>(colors[1]);
  const [tertiary, updateTertiary] = useState<number>(colors[2]);

  // when colors change, update them in parent
  useEffect(() => {
    updateColors([primary, secondary, tertiary]);
  }, [primary, secondary, tertiary, updateColors])

  return (
    <section className="dragon" id={ id }>
      <input type="text" className="dragon__name" placeholder={`${id}'s name/ID`}/>
      <ColorSelect type={`primary_${id}`} value={colors[0]} updateParent={updatePrimary} />
      <ColorSelect type={`secondary_${id}`} value={colors[1]} updateParent={updateSecondary} />
      <ColorSelect type={`tertiary_${id}`} value={colors[2]} updateParent={updateTertiary} />
    </section>
  )
}