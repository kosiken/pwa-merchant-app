import { GET_FOODS, ADD_FOOD, GET_MEALS } from '../types';

const initialState = {
  foods: [],
  meals: []
};

export default function (state = initialState, action) {
  let returnValue = state;

  switch (action.type) {
    case GET_FOODS:
      returnValue = {
        foods:  state.foods.concat(action.foods.filter(food => !food.type)),meals: state.meals.concat(action.foods.filter(food => !!food.type)),
      };

      break;
      case GET_MEALS:
        returnValue = {
          meals: action.meals,
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
