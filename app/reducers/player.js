import { clone } from 'ramda';

import {
  ADD_PATTERN,
  UPDATE_LIFE,
  UPDATE_LEVEL,
} from '../actions/player';

const initialState = {
  life: 3,
  level: 1,
  drawnPatterns: [],
};

function addPatternToState(state, pattern) {
  const drawnPatterns = clone(state.drawnPatterns);
  drawnPatterns.push(pattern);

  return {
    ...state,
    drawnPatterns,
  };
}

export default function player(state: player = initialState, action: Object) {
  switch (action.type) {
    case UPDATE_LIFE:
      return {
        ...state,
        life: action.life,
      };
    case UPDATE_LEVEL:
      return {
        ...state,
        level: action.level,
      };
    case ADD_PATTERN:
      return addPatternToState(state, action.pattern);
    default:
      return state;
  }
}
