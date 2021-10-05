import dragonReducer from '../features/dragon/dragonSlice'
import matchmakingReducer from '../features/matchmaking/matchmakingSlice';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  dragons: dragonReducer,
  matchmaking: matchmakingReducer,
});

export default rootReducer;