import dragonReducer from '../features/dragon/dragonSlice'
import childReducer from '../features/child/childSlice'
import matchmakingReducer from '../features/matchmaking/matchmakingSlice';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  dragons: dragonReducer,
  child: childReducer,
  matchmaking: matchmakingReducer,
});

export default rootReducer;