import { INITAL_DRAGON } from '../../types/constants';
import { Action } from '../../store/types/types';
import { Dragon } from 'guardian';

const initalState: Dragon = {
  ...INITAL_DRAGON,
};

// 'color/childColors', [newColors] -> color update
export default function childReducer(state: Dragon = initalState, action: Action) {
  switch (action.type) {
    case 'dragon/childColors':
      return {
        ...state,
        ...action.payload,
      };
    case 'color/childColors':
      return {
        ...state,
        ...action.payload,
      };
    case 'app/clearColors':
      return {
        ...state,
        ...initalState,
        name: state.name,
      };
      
    default:
      return state;
  }
}