import { GET_CUSTOMERS, ADD_CUSTOMER, LOGOUT_USER } from '../types';

const initialState = {
  customers: [],
};

export default function (state = initialState, action) {
  let returnValue = state;

  switch (action.type) {
    case GET_CUSTOMERS:
      returnValue = {
        customers: action.customers,
      };
      break;

    case ADD_CUSTOMER:
      returnValue = {
        customers: state.customers.concat([action.customer]),
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
