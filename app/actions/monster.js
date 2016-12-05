// @flow
export const MONSTER_DEAD = 'MONSTER_DEAD';

export function killMonster(id, attacked) {
  return {
    type: MONSTER_DEAD,
    id,
    attacked,
  };
}
