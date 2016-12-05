// @flow
export const ADD_GESTURE = 'ADD_GESTURE';
export const UPDATE_LIFE = 'UPDATE_LIFE';
export const UPDATE_LEVEL = 'UPDATE_LEVEL';

export function addGesture(gesture) {
  return {
    type: ADD_GESTURE,
    gesture,
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
