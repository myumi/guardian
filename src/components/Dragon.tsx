import { useEffect, useState } from 'react';
import ColorSelect from './ColorSelect';

interface DragonProps {
  id: string;
  updateColors: Function;
}

export default function Dragon({ id, updateColors }: DragonProps) {
  const [primary, updatePrimary] = useState<number>(-1);
  const [secondary, updateSecondary] = useState<number>(-1);
  const [tertiary, updateTertiary] = useState<number>(-1);

  // when colors change, update them in parent
  useEffect(() => {
    updateColors([primary, secondary, tertiary]);
  }, [primary, secondary, tertiary, updateColors])

  return (
    <section className="dragon" id={ id }>
      <input type="text" className="dragon__name" placeholder={`${id}'s name/ID`}/>
      <ColorSelect type={`primary_${id}`} value={primary} updateParent={updatePrimary} />
      <ColorSelect type={`secondary_${id}`} value={secondary} updateParent={updateSecondary} />
      <ColorSelect type={`tertiary_${id}`} value={tertiary} updateParent={updateTertiary} />
    </section>
  )
}