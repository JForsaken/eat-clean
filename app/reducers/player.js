import { UPDATE_LIFE, UPDATE_LEVEL } from '../actions/player';

export default function player(state: player = { life: 3, level: 1 }, action: Object) {
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
    default:
      return state;
  }
}
