import {LOGIN_USER, LOGOUT_USER, SIGNUP_USER} from '../types';

export const loginUser = (user, token = "Erjvui59025969") => dispatch => {
    dispatch({
      type: LOGIN_USER,
      user, token
    });
  };


  export const logoutUser = () => dispatch => {
    dispatch({
      type: LOGOUT_USER
    });
  };

  export const signupUser = (user, token = "Erjvui59025969") => dispatch => {
    dispatch({
      type: SIGNUP_USER,
      user, token
    });
  };