// @flow
export const UPDATE_LIFE = 'UPDATE_LIFE';
export const UPDATE_LEVEL = 'UPDATE_LEVEL';

export function updateLife(life) {
  return {
    type: UPDATE_LIFE,
    life,
  };
}

export function updateLevel(level) {
  return {
    type: UPDATE_LEVEL,
    level,
  };
}
