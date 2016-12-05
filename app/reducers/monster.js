import { MONSTER_DEAD } from '../actions/monster';

export default function monster(state: monster = { id: null, attacked: false }, action: Object) {
  switch (action.type) {
    case MONSTER_DEAD:
      return {
        ...state,
        id: action.id,
        attacked: action.attacked,
      };
    default:
      return state;
  }
}
