import { GET_CUSTOMERS } from '../types';

export const fetchCustomers = (customers) => (dispatch) => {
  dispatch({
    type: GET_CUSTOMERS,
    customers,
  });
};
