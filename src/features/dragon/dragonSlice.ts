import { Dragon } from 'guardian';
import { ColorInterface } from '../../modules/types/types';
import { getSpanBetweenColors } from '../../modules/ColorWheel';
import { INITAL_DRAGON } from '../../types/constants';
interface Action {
  type: string,
  payload?: Dragon | string | number,
}
export interface RootState {
  mother: Dragon,
  father: Dragon,
  child: Dragon,
  primarySpan: Array<ColorInterface>;
  secondarySpan: Array<ColorInterface>;
  tertiarySpan: Array<ColorInterface>;
}

const initalState: RootState = {
  mother: {...INITAL_DRAGON} as Dragon,
  father: {...INITAL_DRAGON} as Dragon,
  child: {...INITAL_DRAGON} as Dragon,
  primarySpan: [] as Array<ColorInterface>,
  secondarySpan: [] as Array<ColorInterface>,
  tertiarySpan: [] as Array<ColorInterface>,
}

// 'dragon/motherColors', [newColors] -> color & span update
// 'dragon/fatherColors', [newColors] -> color & span update
export default function dragonReducer(state: RootState = initalState, action: Action) {
  switch (action.type) {
    // case 'dragon/setMother':
    // case 'dragon/setFather':
    // case 'dragon/setChild':
    case 'dragon/motherColors':
      if (isDragon(action.payload)) {
        return {
          ...state,
          mother: {
            ...state.mother,
            ...action.payload,
          },
          primarySpan: [...getSpanBetweenColors(action.payload.primary || state.mother.primary, state.father.primary)],
          secondarySpan: [...getSpanBetweenColors(action.payload.secondary || state.mother.secondary, state.father.secondary)],
          tertiarySpan: [...getSpanBetweenColors(action.payload.tertiary || state.mother.tertiary, state.father.tertiary)],
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
            ...action.payload,
          },
          primarySpan: [...getSpanBetweenColors(action.payload.primary || state.father.primary, state.mother.primary)],
          secondarySpan: [...getSpanBetweenColors(action.payload.secondary || state.father.secondary, state.mother.secondary)],
          tertiarySpan: [...getSpanBetweenColors(action.payload.tertiary || state.father.tertiary, state.mother.tertiary)],
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
            ...action.payload
          },
        };
      }
      return {
        ...state,
      };
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
    || (item as Dragon).primary !== undefined 
    || (item as Dragon).secondary !== undefined 
    || (item as Dragon).tertiary !== undefined;

  const hasNonDragonProperty = Object.keys(item).some((key) => 
    {
      if (key !== 'name' && key !== 'primary' && key !== 'secondary' && key !== 'tertiary') {
        return true;
      }
      return false;
    });
  
  return (hasDragonProperty && !hasNonDragonProperty);
}