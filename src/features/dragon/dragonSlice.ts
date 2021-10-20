import { Dragon, ModernBreed } from 'guardian';
import { ColorInterface } from '../../modules/types/types';
import { getSpanBetweenColors } from '../../modules/ColorWheel';
import { INITAL_DRAGON } from '../../types/constants';
interface Action {
  type: string,
  payload?: Dragon | string | number | ModernBreed,
}
export interface RootState {
  mother: Dragon,
  father: Dragon,
  child: Dragon,
  primarySpan: Array<ColorInterface>;
  secondarySpan: Array<ColorInterface>;
  tertiarySpan: Array<ColorInterface>;
  outcomeChance: number;
}

const initalState: RootState = {
  mother: {...INITAL_DRAGON} as Dragon,
  father: {...INITAL_DRAGON} as Dragon,
  child: {...INITAL_DRAGON} as Dragon,
  primarySpan: [] as Array<ColorInterface>,
  secondarySpan: [] as Array<ColorInterface>,
  tertiarySpan: [] as Array<ColorInterface>,
  outcomeChance: 0,
}

// 'dragon/motherColors', [newColors] -> color & span update
// 'dragon/fatherColors', [newColors] -> color & span update
export default function dragonReducer(state: RootState = initalState, action: Action) {
  switch (action.type) {
    // change names
    case 'dragon/motherName':
      return {
        ...state,
        mother: {
          ...state.mother,
          name: action.payload,
        },
      };
    case 'dragon/fatherName':
      return {
        ...state,
        father: {
          ...state.father,
          name: action.payload,
        },
      };
    case 'dragon/childName':
      return {
        ...state,
        child: {
          ...state.child,
          name: action.payload,
        },
      };
    // change colors
    case 'dragon/motherColors':
      if (isDragon(action.payload)) {
        return {
          ...state,
          mother: {
            ...state.mother,
            colors: {
              ...state.mother.colors,
              ...action.payload.colors,
            }
          },
          primarySpan: [...getSpanBetweenColors(action.payload.colors.primary || state.mother.colors.primary, state.father.colors.primary)],
          secondarySpan: [...getSpanBetweenColors(action.payload.colors.secondary || state.mother.colors.secondary, state.father.colors.secondary)],
          tertiarySpan: [...getSpanBetweenColors(action.payload.colors.tertiary || state.mother.colors.tertiary, state.father.colors.tertiary)],
        };
      }
      return {
        ...state,
      };
    case 'dragon/fatherColors':
      if (isDragon(action.payload)) {
        return {
          ...state,
          father: {
            ...state.father,
            colors: {
              ...state.father.colors,
              ...action.payload.colors,
            }
          },
          primarySpan: [...getSpanBetweenColors(action.payload.colors.primary || state.father.colors.primary, state.mother.colors.primary)],
          secondarySpan: [...getSpanBetweenColors(action.payload.colors.secondary || state.father.colors.secondary, state.mother.colors.secondary)],
          tertiarySpan: [...getSpanBetweenColors(action.payload.colors.tertiary || state.father.colors.tertiary, state.mother.colors.tertiary)],
        };
      }
      return {
        ...state,
      };
    case 'dragon/childColors':
      if (isDragon(action.payload)) {
        return {
          ...state,
          child: {
            ...state.child,
            colors: {
              ...state.child.colors,
              ...action.payload.colors,
            }
          },
        };
      }
      return {
        ...state,
      };
    // change breed
    case 'dragon/motherBreed':
      return {
        ...state,
        mother: {
          ...state.mother,
          breed: action.payload,
        },
      };
    case 'dragon/fatherBreed':
      return {
        ...state,
        father: {
          ...state.father,
          breed: action.payload,
        },
      };
    case 'dragon/childBreed':
      return {
        ...state,
        child: {
          ...state.child,
          breed: action.payload,
        },
      };
    // change genes (todo: logic for different breeds)
    case 'dragon/motherGenes':
      if (isDragon(action.payload)) {
        return {
          ...state,
          mother: {
            ...state.mother,
            genes: {
              ...state.mother.genes,
              ...action.payload.genes,
            }
          },
        };
      }
      return {
        ...state,
      };
    case 'dragon/fatherGenes':
      if (isDragon(action.payload)) {
        return {
          ...state,
          father: {
            ...state.father,
            genes: {
              ...state.father.genes,
              ...action.payload.genes,
            },
          },
        };
      }
      return {
        ...state,
      };
    case 'dragon/childGenes':
      if (isDragon(action.payload)) {
        console.log('poassed dragon btest')
        return {
          ...state,
          child: {
            ...state.child,
            genes: {
              ...state.child.genes,
              ...action.payload.genes,
            }
          },
        };
      }
      return {
        ...state,
      };
    // reset attributes
    case 'dragon/clearMother':
      return {
        ...state,
        mother:  {...INITAL_DRAGON},
        primarySpan: [...initalState.primarySpan],
        secondarySpan: [...initalState.secondarySpan],
        tertiarySpan: [...initalState.primarySpan],
      };
    case 'dragon/clearFather':
      return {
        ...state,
        father: {...INITAL_DRAGON},
        primarySpan: [...initalState.primarySpan],
        secondarySpan: [...initalState.secondarySpan],
        tertiarySpan: [...initalState.primarySpan],
      };
    case 'dragon/clearChild':
      return {
        ...state,
        child: {...INITAL_DRAGON},
      };
    case 'app/clearColors':
    return {
      ...state,
      mother: {...INITAL_DRAGON},
      father: {...INITAL_DRAGON},
      primarySpan: [...initalState.primarySpan],
      secondarySpan: [...initalState.secondarySpan],
      tertiarySpan: [...initalState.primarySpan],
    };
    default:
      return state;
  }
}

function isDragon(item: any): item is Dragon {
  const hasDragonProperty = (item as Dragon).name !== undefined
    || (
      (item as Dragon).colors !== undefined
      && ((item as Dragon).colors.primary !== undefined 
      || (item as Dragon).colors.secondary !== undefined 
      || (item as Dragon).colors.tertiary !== undefined)
    )
    || (
      (item as Dragon).genes !== undefined
      && ((item as Dragon).genes!.primary !== undefined 
      || (item as Dragon).genes!.secondary !== undefined 
      || (item as Dragon).genes!.tertiary !== undefined)
    );

  const hasNonDragonProperty = Object.keys(item).some((key) => 
    {
      if (key !== 'name' && key !== 'colors' && key !== 'genes') {
        return true;
      } else if (key === 'colors') {
        return Object.keys(item.colors).some((innerKey) => {
          if (innerKey !== 'primary' && innerKey !== 'secondary' && innerKey !== 'tertiary') {
            return true;
          }
          return false;
        });
      } else if (key === 'genes') {
        return Object.keys(item.genes).some((innerKey) => {
          if (innerKey !== 'primary' && innerKey !== 'secondary' && innerKey !== 'tertiary') {
            return true;
          }
          return false;
        });
      }
      return false;
    });
  
  return (hasDragonProperty && !hasNonDragonProperty);
}

function outcomeChance(): number {
  return 0;
}