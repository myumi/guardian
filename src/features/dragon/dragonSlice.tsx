import { ColorInterface, getSpanBetweenColors } from '../../modules/ColorWheel';

export interface Action {
  type: string;
  payload?: any;
}

export interface RootState {
  motherColors: Array<number>;
  fatherColors: Array<number>;
  primarySpan: Array<ColorInterface>;
  secondarySpan: Array<ColorInterface>;
  tertiarySpan: Array<ColorInterface>;
}

const initalState: RootState = {
  motherColors: [-1, -1, -1] as Array<number>,
  fatherColors: [-1, -1, -1] as Array<number>,
  primarySpan: [] as Array<ColorInterface>,
  secondarySpan: [] as Array<ColorInterface>,
  tertiarySpan: [] as Array<ColorInterface>,
}

// 'dragon/motherColors', [newColors] -> color & span update
// 'dragon/fatherColors', [newColors] -> color & span update
// 'dragon/childColors', [newColors] -> color update
export default function dragonReducer(state: RootState = initalState, action: Action) {
  switch (action.type) {
    case 'dragon/motherColors':
      return {
        ...state,
        motherColors: [...action.payload.newColors],
        primarySpan: [...getSpanBetweenColors(action.payload.newColors[0], state.fatherColors[0])],
        secondarySpan: [...getSpanBetweenColors(action.payload.newColors[1], state.fatherColors[1])],
        tertiarySpans: [...getSpanBetweenColors(action.payload.newColors[2], state.fatherColors[2])],
      };

    case 'dragon/fatherColors':
      return {
        ...state,
        fatherColors: [...action.payload.newColors],
        primarySpan: [...getSpanBetweenColors(state.motherColors[0], action.payload.newColors[0])],
        secondarySpan: [...getSpanBetweenColors(state.motherColors[1], action.payload.newColors[1])],
        tertiarySpans: [...getSpanBetweenColors(state.motherColors[2], action.payload.newColors[2])],
      };

    case 'dragon/childColors' || 'color/childColors':
      return {
        ...state,
        childColors: [...action.payload.newColors],
      };

    case 'app/clearColors':
    return {
      ...state,
      motherColors: [...initalState.motherColors],
      fatherColors: [...initalState.fatherColors],
      primarySpan: [...initalState.primarySpan],
      secondarySpan: [...initalState.secondarySpan],
      tertiarySpan: [...initalState.primarySpan],
    };

    default:
      return state;
  }
}