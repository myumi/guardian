import { useDispatch, useSelector } from 'react-redux';
import { ModernBreed, Rarity } from 'guardian';
import { RARITY_CHART } from '../types/constants';
import '../styles/BreedProbability.scss';

export default function BreedProbability() {
  const dispatch = useDispatch();
  const femaleBreedImages = importAll(require.context('../assets/dragons/breeds/female/', false, /\.(png|jpe?g|svg)$/));
  const maleBreedImages = importAll(require.context('../assets/dragons/breeds/male/', false, /\.(png|jpe?g|svg)$/));

  const motherBreed = useSelector((state: any) => state.dragons.mother.breed);
  const fatherBreed = useSelector((state: any) => state.dragons.father.breed);
  const childBreed = useSelector((state: any) => state.dragons.child.breed);

  const fatherBreedChance = calculateBreedChance(fatherBreed, motherBreed);
  const motherBreedChance = calculateBreedChance(motherBreed, fatherBreed);

  const fatherBreedImage = fatherBreed ? getDragonImage(fatherBreed, maleBreedImages) : '';
  const motherBreedImage = motherBreed? getDragonImage(motherBreed, femaleBreedImages) : '';

  function findBreedRarity(breed: ModernBreed): Rarity | 'None' {
    const plentifulBreeds = ['Fae', 'Guardian', 'Mirror', 'Tundra'];
    const commonBreeds = ['Pearlcatcher', 'Ridgeback', 'Snapper', 'Spiral'];
    const uncommonBreeds = ['Bogsneak', 'Skydancer'];
    const limitedBreeds = ['Imperial', 'Nocturne'];
    const rareBreeds = ['Coatl', 'Wildclaw'];

    if (plentifulBreeds.includes(breed)) {
      return 'Plentiful';
    } else if (commonBreeds.includes(breed)) {
      return 'Common';
    } else if (uncommonBreeds.includes(breed)) {
      return 'Uncommon';
    } else if (limitedBreeds.includes(breed)) {
      return 'Limited';
    } else if (rareBreeds.includes(breed)) {
      return 'Rare';
    }
    return 'None';
  }

  function calculateBreedChance(breed1: ModernBreed, breed2: ModernBreed): number {
    if (breed1 && breed2) {
      const breed1Rarity = findBreedRarity(breed1).toLowerCase();
      const breed2Rarity  = findBreedRarity(breed2).toLowerCase();
  
      // todo: fix this, make typescript understand
      return (RARITY_CHART as any)[breed1Rarity][breed2Rarity];
    }
    return 0;
  }

  // returns index that image is at
  function getDragonImage(breed: ModernBreed, images: Array<any>): string {
    let image = 0;
    images.some((item, index) => {
      if (item.default.includes(breed.toLowerCase())) {
        image = index;
        return true;
      }
      return false;
    });

    return images[image].default;
  }

  function makePercentage(number: number): string {
    return `${number * 100}%`;
  }

  // used to get all images from a directory
  function importAll(resource: any) {
    return resource.keys().map(resource);
  }

  function handleChildSelection(breed: ModernBreed) {
    dispatch({type: 'dragon/childBreed', payload: breed});
  };

  // todo: if mother and father breed are the same
  // display both images but a single "100%"
  return (
    <section className="breed-probability">
      {
        !!((fatherBreedChance && motherBreedChance) && !(motherBreed === fatherBreed))
        &&       
        <>
        <div className={`breed-probability__parent ${fatherBreed === childBreed ? 'selected' : ''}`} onClick={() => handleChildSelection(fatherBreed)}>
            <img src={fatherBreedImage} alt={`Male ${fatherBreed}`} />
            {makePercentage(fatherBreedChance)}
          </div>

          <div className={`breed-probability__parent ${motherBreed === childBreed ? 'selected' : ''}`} onClick={() => handleChildSelection(motherBreed)}>
            <img src={motherBreedImage} alt={`Female ${motherBreed}`} />
            {makePercentage(motherBreedChance)}
          </div>
        </>
      }
      {
        !!((fatherBreedChance && motherBreedChance) && (motherBreed === fatherBreed))
        &&       
        <>
          <div className={`breed-probability__images ${motherBreed === childBreed ? 'selected' : ''}`} onClick={() => handleChildSelection(motherBreed)}>
            <img src={fatherBreedImage} alt={`Male ${fatherBreed}`} />
            <img src={motherBreedImage} alt={`Female ${motherBreed}`} />
          </div>
          <span>100%</span>
        </>
      }
    </section>
  );
}
