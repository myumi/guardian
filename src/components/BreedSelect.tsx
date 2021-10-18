import { useDispatch, useSelector } from 'react-redux';

interface BreedSelectProps {
  id: string;
};

export default function BreedSelect({ id } : BreedSelectProps) {
  const dispatch = useDispatch();
  const breed = useSelector((state: any) => state.dragons[id].breed);

  const modernBreeds = ['Fae', 'Guardian', 'Mirror', 
  'Tundra', 'Pearlcatcher', 'Snapper', 'Ridgeback',
  'Spiral', 'Skydancer', 'Bogsneak', 'Obelisk',
  'Imperial', 'Nocturne', 'Wildclaw', 'Coatl'];

  // type AcientBreed = 'Gaoler' | 'Banescale' | 'Veilspun';

  // when user changes color, update the store
  const handleChange = (event: any) => {
    dispatch({type: `dragon/${id}Breed`, payload: event.target.value});
  };

  return (
    <select 
      className="breed-select" 
      id={`${id}_breed`} 
      value={breed} 
      onChange={handleChange}
    >
      {/* the default value is a label */}
      <option value="-1">(optional: breed)</option>

      {/* all of the colors in the color wheel, in order */}
      {
        modernBreeds.map((breedName, idx) => {
          return (
            <option key={idx} value={breedName}>{breedName.toLowerCase()}</option>
          );
        })
      }
    </select>
  );
};
