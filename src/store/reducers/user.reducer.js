import { SIGNUP_USER, LOGIN_USER, LOGOUT_USER } from '../types';

const initialState = {
  user: {},
  isAuthorized: false,
  debug: false,
  token: null,
};

export default function (state = initialState, action) {
  let returnValue = state;
  let { user } = action;
  if (!user) {
    console.warn('action.user is empty');
  }
  let nUser = {};
  switch (action.type) {
    case SIGNUP_USER:
      returnValue = {
        ...state,
        user: user.Vendor,
        token: user.token,
        isAuthorized: true,
      };
      break;

    case LOGIN_USER:
      if (!state.debug) {
        console.log(user);

        returnValue = {
          ...state,
          user: user.Vendor,
          token: user.token,
          isAuthorized: true,
        };

        break;
      }
      nUser.email = user.email;
      returnValue = {
        ...state,
        user: nUser,
        isAuthorized: true,
      };
      break;

    case LOGOUT_USER:
      localStorage.removeItem('token');
      returnValue = initialState;
      break;

    default:
      console.warn('Unknown action ' + action.type);
      break;
  }

  return returnValue;
}
