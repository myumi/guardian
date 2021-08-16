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
export default function dragonReducer(state: RootState = initalState, action: Action) {
  switch (action.type) {
    case 'dragon/motherColors':
      return {
        ...state,
        motherColors: [...action.payload],
        primarySpan: [...getSpanBetweenColors(action.payload[0], state.fatherColors[0])],
        secondarySpan: [...getSpanBetweenColors(action.payload[1], state.fatherColors[1])],
        tertiarySpan: [...getSpanBetweenColors(action.payload[2], state.fatherColors[2])],
      };

    case 'dragon/fatherColors':
      return {
        ...state,
        fatherColors: [...action.payload],
        primarySpan: [...getSpanBetweenColors(state.motherColors[0], action.payload[0])],
        secondarySpan: [...getSpanBetweenColors(state.motherColors[1], action.payload[1])],
        tertiarySpan: [...getSpanBetweenColors(state.motherColors[2], action.payload[2])],
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