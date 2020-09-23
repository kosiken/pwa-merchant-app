import {  LOGOUT_USER } from '../types';

const initialState = {
  cards: [],
};

export default function (state = initialState, action) {
  let returnValue = state;

  switch (action.type) {
    case 'GET_CARDS':
      returnValue = {
        cards: action.cards,
      };

      break;
    case LOGOUT_USER:
      returnValue = initialState;
      break;
    default:
      break;
  }

  return returnValue;
}
