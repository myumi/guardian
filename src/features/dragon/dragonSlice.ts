import { Dragon } from 'guardian';
import { ColorInterface } from '../../modules/types/types';
import { getSpanBetweenColors } from '../../modules/ColorWheel';
import { INITAL_DRAGON } from '../../types/constants';
interface Action {
  type: string,
  payload?: Dragon,
}
export interface RootState {
  mother: Dragon,
  father: Dragon,
  primarySpan: Array<ColorInterface>;
  secondarySpan: Array<ColorInterface>;
  tertiarySpan: Array<ColorInterface>;
}

const initalState: RootState = {
  mother: {...INITAL_DRAGON} as Dragon,
  father: {...INITAL_DRAGON} as Dragon,
  primarySpan: [] as Array<ColorInterface>,
  secondarySpan: [] as Array<ColorInterface>,
  tertiarySpan: [] as Array<ColorInterface>,
}

// 'dragon/motherColors', [newColors] -> color & span update
// 'dragon/fatherColors', [newColors] -> color & span update
export default function dragonReducer(state: RootState = initalState, action: Action) {
  switch (action.type) {
    case 'dragon/motherColors':
      return {
        ...state,
        mother: {
          ...state.mother,
          ...action.payload
        },
        primarySpan: [...getSpanBetweenColors(action.payload!.primary, state.father.primary)],
        secondarySpan: [...getSpanBetweenColors(action.payload!.secondary, state.father.secondary)],
        tertiarySpan: [...getSpanBetweenColors(action.payload!.tertiary, state.father.tertiary)],
      }


    case 'dragon/fatherColors':
      return {
        ...state,
        father: {
          ...state.father,
          ...action.payload
        },
        primarySpan: [...getSpanBetweenColors(action.payload!.primary, state.mother.primary)],
        secondarySpan: [...getSpanBetweenColors(action.payload!.secondary, state.mother.secondary)],
        tertiarySpan: [...getSpanBetweenColors(action.payload!.tertiary, state.mother.tertiary)],
      };

    case 'dragon/clearMother':
      return {
        ...state,
        mother:  {...INITAL_DRAGON},
      };

      case 'dragon/clearFather':
        return {
          ...state,
          father: {...INITAL_DRAGON},
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