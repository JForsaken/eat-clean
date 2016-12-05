// @flow
import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import monster from './monster';
import player from './player';

const rootReducer = combineReducers({
  routing,
  monster,
  player,
});

export default rootReducer;
