import { LOGIN_USER, LOGOUT_USER, SIGNUP_USER } from '../types';

export const fetchFoods = (foods) => (dispatch) => {
  dispatch({
    type: GET_FOODS,
    foods,
  });
};
