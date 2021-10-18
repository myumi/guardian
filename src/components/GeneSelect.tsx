import { useDispatch, useSelector } from 'react-redux';
import { MODERN_PRIMARY_GENES } from '../types/constants';
interface GeneSelectProps {
  type: string; // primary, secondary, tertiary
  id: string; // mother, father, child
};

export default function GeneSelect({ type, id } : GeneSelectProps) {
  const dispatch = useDispatch();
  const gene = useSelector((state: any) => state.dragons[id].genes[type]);
  let geneList;

  if (type === 'primary') {
    geneList = {...MODERN_PRIMARY_GENES};
  }

  // when user changes gene, update the store
  const handleChange = (event: any) => {
    dispatch({type: `dragon/${id}Genes`, payload: { [type]: event.target.value }});
  };

  return (
    <select 
      className="gene-select" 
      id={`${id}_${type}_gene`} 
      value={gene} 
      onChange={handleChange}
    >
      {/* the default value is a label */}
      <option value="-1">(optional: {type} gene)</option>
      {/* all of the genes */}
      {
        Object.keys(geneList as object).map((geneName, idx) => {
          return (
            <option key={idx} value={geneName}>{geneName.toLowerCase()}</option>
          );
        })
      }
    </select>
  );
};
