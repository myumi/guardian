import { useDispatch, useSelector } from 'react-redux';
import { MODERN_PRIMARY_GENES, MODERN_SECONDARY_GENES, MODERN_TERTIARY_GENES, RARITY_CHART } from '../types/constants';
import '../styles/GeneProbability.scss';
interface GeneProbabilityProps {
  type: string; // primary, secondary, teriary
}

export default function GeneProbability({ type }: GeneProbabilityProps) {
  const dispatch = useDispatch();
  const geneImages = importAll(require.context('../assets/dragons/genes/', true, /\.(png|jpe?g|svg)$/));

  const motherGene = useSelector((state: any) => state.dragons.mother.genes[type]);
  const fatherGene = useSelector((state: any) => state.dragons.father.genes[type]);
  const childGene = useSelector((state: any) => state.dragons.child.genes[type]);

  const fatherGeneChance = calculateGeneChance(fatherGene, motherGene);
  const motherGeneChance = calculateGeneChance(motherGene, fatherGene);

  const fatherGeneImage = fatherGene ? getGeneImage(fatherGene, geneImages) : '';
  const motherGeneImage = motherGene? getGeneImage(motherGene, geneImages) : '';

  function calculateGeneChance(gene1: string | number, gene2: string | number): number {
    if (gene1 && gene2) {
      let gene1Rarity, gene2Rarity;

      // todo: fix this, make typescript understand without as any
      if (type === 'primary') {
        gene1Rarity = (MODERN_PRIMARY_GENES as any)[gene1].toLowerCase();
        gene2Rarity  = (MODERN_PRIMARY_GENES as any)[gene2].toLowerCase();
      } else if (type === 'secondary') {
        gene1Rarity = (MODERN_SECONDARY_GENES as any)[gene1].toLowerCase();
        gene2Rarity  = (MODERN_SECONDARY_GENES as any)[gene2].toLowerCase();
      } else if (type === 'tertiary') {
        gene1Rarity = (MODERN_TERTIARY_GENES as any)[gene1].toLowerCase();
        gene2Rarity  = (MODERN_TERTIARY_GENES as any)[gene2].toLowerCase();
      }

      return (RARITY_CHART as any)[gene1Rarity][gene2Rarity];
    }
    return 0;
  }

  // returns index of the image
  function getGeneImage(gene: string, images: Array<any>): string {
    let image = 0;
    images.some((item, index) => {
      if (item.default.includes(gene.toLowerCase())) {
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

  function handleChildSelection(gene: string) {
    dispatch({
      type: 'dragon/childGenes', 
      payload: {
        genes: {
          [type]: gene
        }
      }
    });
  };

  return (
    <section id={`${type}-gene-probability`}>
      <h2>
        {`${type[0].toUpperCase()}${type.substring(1)}`} Gene Outcomes
      </h2>

      {/* no genes selected */}
      {
        !!(!fatherGene || !motherGene)
        &&
        <span className="gene-probability__empty-message">
          Please select {type} genes for both parents to see the probabilities.
        </span>
      }

      {/* different genes */}
      {
        !!((fatherGeneChance && motherGeneChance) && !(motherGene === fatherGene))
        && 
        <div className="gene-probability__different-genes">
          <div className={`different-genes__gene ${motherGene === childGene ? 'selected' : ''}`} onClick={() => handleChildSelection(motherGene)}>
            <img 
              alt={`${type} gene`}
              className="different-genes__gene-image"
              src={motherGeneImage}
            />
            <span className="different-genes__percentage">
              {makePercentage(motherGeneChance)}
            </span>
          </div>
          <div className={`different-genes__gene ${fatherGene === childGene ? 'selected' : ''}`}  onClick={() => handleChildSelection(fatherGene)}>
            <img 
              alt={`${type} gene`}
              className="different-genes__gene-image"
              src={fatherGeneImage}
            />
            <span className="different-genes__percentage">
              {makePercentage(fatherGeneChance)}
            </span>
          </div>
        </div>
      }

      {/* same genes */}
      {
        !!((fatherGeneChance && motherGeneChance) && (motherGene === fatherGene))
        && 
          <div className={`gene-probability__same-genes ${motherGene === childGene ? 'selected' : ''}`}  onClick={() => handleChildSelection(motherGene)}>
            <img 
              alt={`${type} gene`}
              className="same-genes__image"
              src={motherGeneImage} 
            />
            <span className="same-genes__percentage">100%</span>
          </div>
      }
    </section>
  );
}
