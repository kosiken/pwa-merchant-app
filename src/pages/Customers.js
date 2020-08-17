import React, { useState, useEffect } from 'react';
import _ from 'lodash';

import { CustomerListItem, Typography, Calender } from '../components';
import api from '../api';

import { v4 as uuid } from 'uuid';

const Customers = () => {
  // const { customers } = useSelector((state) => state.customer);
  // const dispatch = useDispatch();

  const [customers, setCustomers] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        let __customers = await api.getCustomers();
        setCustomers(__customers);
        // dispatch({ type: 'GET_CUSTOMERS', __customers });
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <div style={{ minHeight: '100vh' }}>
      <Calender />

      <div className="customers">
        {!_.isEmpty(customers) &&
          customers.map((customer) => (
            <CustomerListItem key={uuid()} customer={customer} />
          ))}
      </div>
      <Typography style={{ textAlign: 'center' }}>
        Made with{' '}
        <span role="img" aria-label="love">
          ❤️
        </span>
        <span
          style={{
            color: '#f0324b',
          }}
        >
          500Chow
        </span>
      </Typography>
    </div>
  );
};

export default Customers;
