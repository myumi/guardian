import dragonReducer from './features/dragon/dragonSlice'
import childReducer from './features/child/childSlice'
import { combineReducers } from 'redux';

export interface Action {
  type: string;
  payload?: any;
}

const rootReducer = combineReducers({
  dragons: dragonReducer,
  child: childReducer,
});

export default rootReducer;