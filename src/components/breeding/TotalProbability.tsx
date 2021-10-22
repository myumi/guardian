import { useSelector } from 'react-redux';
import { ColorInterface } from '../../modules/types/types';
import { MODERN_BREEDS, MODERN_PRIMARY_GENES, MODERN_SECONDARY_GENES, MODERN_TERTIARY_GENES, RARITY_CHART } from '../../types/constants';

export default function TotalProbability() {
  const mother = useSelector((state: any) => state.dragons.mother);
  const father = useSelector((state: any) => state.dragons.father);
  const child = useSelector((state: any) => state.dragons.child);

  const primarySpan = useSelector((state: any) => state.dragons.primarySpan);
  const secondarySpan = useSelector((state: any) => state.dragons.secondarySpan);
  const tertiarySpan = useSelector((state: any) => state.dragons.tertiarySpan);

  const getTotalPercentage = (): string => {
    let total = 1;

    // primary color
    if (child.colors.primary.value > 0 && primarySpan.length) {
      if (primarySpan.some((item: ColorInterface) => item.value === child.colors.primary.value)) {
        total *= (1 / primarySpan.length);
      } else {
        return '0%';
      }
    }

    // secondary color 
    if (child.colors.secondary.value > 0 && secondarySpan.length) {
      if (secondarySpan.some((item: ColorInterface) => item.value === child.colors.secondary.value)) {
        total *= (1 / secondarySpan.length);
      } else {
        return '0%';
      }
    }

    // tertiary color
    if (child.colors.tertiary.value > 0 && tertiarySpan.length) {
      if (tertiarySpan.some((item: ColorInterface) => item.value === child.colors.tertiary.value)) {
        total *= (1 / tertiarySpan.length);
      } else {
        return '0%';
      }
    }

    // optional properties
    // breed
    if (child.breed && mother.breed && father.breed) {
      if (child.breed === mother.breed) {
        // todo: fix this, make typescript understand
        total *= (RARITY_CHART as any)[(MODERN_BREEDS as any)[mother.breed].toLowerCase()][(MODERN_BREEDS as any)[father.breed].toLowerCase()];
      } else if (child.breed === father.breed) {
        // todo: fix this, make typescript understand
        total *= (RARITY_CHART as any)[(MODERN_BREEDS as any)[father.breed].toLowerCase()][(MODERN_BREEDS as any)[mother.breed].toLowerCase()];
      } else {
        return '0%';
      }
    }

    // primary gene
    if (child.genes.primary && mother.genes.primary && father.genes.primary) {
      if (child.genes.primary === mother.genes.primary) {
        total *= (RARITY_CHART as any)[(MODERN_PRIMARY_GENES as any)[mother.genes.primary].toLowerCase()][(MODERN_PRIMARY_GENES as any)[father.genes.primary].toLowerCase()];
      } else if (child.genes.primary === father.genes.primary) {
        total *= (RARITY_CHART as any)[(MODERN_PRIMARY_GENES as any)[father.genes.primary].toLowerCase()][(MODERN_PRIMARY_GENES as any)[mother.genes.primary].toLowerCase()];
      } else {
        return '0%';
      }
    }

    // secondary gene
    if (child.genes.secondary && mother.genes.secondary && father.genes.secondary) {
      if (child.genes.secondary === mother.genes.secondary) {
        total *= (RARITY_CHART as any)[(MODERN_SECONDARY_GENES as any)[mother.genes.secondary].toLowerCase()][(MODERN_SECONDARY_GENES as any)[father.genes.secondary].toLowerCase()];
      } else if (child.genes.secondary === father.genes.secondary) {
        total *= (RARITY_CHART as any)[(MODERN_SECONDARY_GENES as any)[father.genes.secondary].toLowerCase()][(MODERN_SECONDARY_GENES as any)[mother.genes.secondary].toLowerCase()];
      } else {
        return '0%';
      }
    }

    // tertiary gene
    if (child.genes.tertiary && mother.genes.tertiary && father.genes.tertiary) {
      if (child.genes.tertiary === mother.genes.tertiary) {
        total *= (RARITY_CHART as any)[(MODERN_TERTIARY_GENES as any)[mother.genes.tertiary].toLowerCase()][(MODERN_TERTIARY_GENES as any)[father.genes.tertiary].toLowerCase()];
      } else if (child.genes.tertiary === father.genes.tertiary) {
        total *= (RARITY_CHART as any)[(MODERN_TERTIARY_GENES as any)[father.genes.tertiary].toLowerCase()][(MODERN_TERTIARY_GENES as any)[mother.genes.tertiary].toLowerCase()];
      } else {
        return '0%';
      }
    }

    return `${(total * 100).toFixed(5)}%`;
  }

  return (
    <div className="results__total">
      {
        !!(mother.colors.primary.value > -1 && mother.colors.secondary.value > -1 && mother.colors.tertiary.value > -1)
        && !!(father.colors.primary.value > -1 && father.colors.secondary.value > -1 && father.colors.tertiary.value > -1)
        && !!(child.colors.primary.value > -1 && child.colors.secondary.value > -1 && child.colors.tertiary.value > -1)
        && <>Total Probability for Child Dragon: {getTotalPercentage()}</>
      }
    </div>
  )
}