import { GET_FOODS, ADD_FOOD } from '../types';

const initialState = {
  foods: [],
};

export default function (state = initialState, action) {
  let returnValue = state;

  switch (action.type) {
    case GET_FOODS:
      returnValue = {
        foods: action.foods,
      };

      break;

    case ADD_FOOD:
      returnValue = {
        foods: state.foods.concat([action.food]),
      };

      break;
    default:
      console.warn('Unknown action ' + action.type);
      break;
  }

  return returnValue;
}
