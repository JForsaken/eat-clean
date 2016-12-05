import {
  ADD_GESTURE,
  UPDATE_LIFE,
  UPDATE_LEVEL,
} from '../actions/player';

function addGestureToState(state, gesture) {
  const gestures = state.gestures;
  gestures.push(gesture);

  return {
    ...state,
    gestures,
  };
}

export default function player(state: player = { life: 3, level: 1, gestures: [] }, action: Object) {
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
    case ADD_GESTURE:
      return addGestureToState(state, action.gesture);
    default:
      return state;
  }
}
