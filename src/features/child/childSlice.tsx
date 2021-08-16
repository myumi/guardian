export interface Action {
  type: string;
  payload?: any;
}

export interface RootState {
  childColors: Array<number>;
}

const initalState: RootState = {
  childColors: [-1, -1, -1] as Array<number>,
}

// 'color/childColors', [newColors] -> color update
export default function childReducer(state: RootState = initalState, action: Action) {
  switch (action.type) {
    case 'dragon/childColors':
      return {
        ...state,
        childColors: [...action.payload],
      };
    case 'color/childColors':
      return {
        ...state,
        childColors: [...action.payload],
      };
    
    case 'app/clearColors':
      return {
        ...state,
        childColors: [...initalState.childColors],
      };
      
    default:
      return state;
  }
}