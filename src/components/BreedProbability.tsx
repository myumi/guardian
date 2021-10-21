import { useDispatch, useSelector } from 'react-redux';
import { ModernBreed, Rarity } from 'guardian';
import { MODERN_BREEDS, RARITY_CHART } from '../types/constants';
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

  function calculateBreedChance(breed1: ModernBreed, breed2: ModernBreed): number {
    if (breed1 && breed2) {
      const breed1Rarity = MODERN_BREEDS[breed1].toLowerCase();
      const breed2Rarity  = MODERN_BREEDS[breed2].toLowerCase();
  
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
    dispatch({
      type: 'dragon/childBreed', 
      payload: breed
    });
  };

  // todo: if mother and father breed are the same
  // display both images but a single "100%"
  return (
    <section id="breed-probability">
      <h2>Breed Outcomes</h2>

      {/* no breeds selected */}
      {
        !!(!fatherBreedChance || !motherBreedChance)
        && 
        <span className="breed-probability__empty-message">
          Please select breeds for both parents to see the probabilities.
        </span>
      }

      {/* different breeds selected */}
      {
        !!((fatherBreedChance && motherBreedChance) && !(motherBreed === fatherBreed))
        &&       
        <div className="breed-probability__different-parents">
          <div className={`different-parents__parent ${motherBreed === childBreed ? 'selected' : ''}`} onClick={() => handleChildSelection(motherBreed)}>
            <img 
              src={motherBreedImage} 
              alt={`Female ${motherBreed}`} 
              className="different-parents__parent-image" 
            />
            <span className="different-parents__percentage">
              {makePercentage(motherBreedChance)}
            </span>
          </div>
          
          <div className={`different-parents__parent ${fatherBreed === childBreed ? 'selected' : ''}`} onClick={() => handleChildSelection(fatherBreed)}>
              <img 
                src={fatherBreedImage} 
                alt={`Male ${fatherBreed}`} 
                className="different-parents__parent-image" 
              />
              <span className="different-parents__percentage">
                {makePercentage(fatherBreedChance)}
              </span>
          </div>
        </div>
      }

      {/* same breed selected */}
      {
        !!((fatherBreedChance && motherBreedChance) && (motherBreed === fatherBreed))
        &&       
        <div className="breed-probability__same-parents">
          <div className={`same-parents__images ${motherBreed === childBreed ? 'selected' : ''}`} onClick={() => handleChildSelection(motherBreed)}>
            <img src={fatherBreedImage} alt={`Male ${fatherBreed}`} />
            <img src={motherBreedImage} alt={`Female ${motherBreed}`} />
          </div>
          <span className={`same-parents__percentage ${motherBreed === childBreed ? 'selected' : ''}`}>100%</span>
        </div>
      }
    </section>
  );
}
