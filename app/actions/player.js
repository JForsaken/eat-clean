// @flow
export const ADD_PATTERN = 'ADD_PATTERN';
export const UPDATE_LIFE = 'UPDATE_LIFE';
export const UPDATE_LEVEL = 'UPDATE_LEVEL';

export function addPattern(pattern) {
  return {
    type: ADD_PATTERN,
    pattern,
  };
}

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
