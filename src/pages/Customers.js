import React, { useState, useEffect, useRef } from 'react';
import _ from 'lodash';
import { useForm } from 'react-hook-form';
import {
  CustomerListItem,
  Typography,
  Calender,
  Input,
  Button,
  IconButton,
  Checkbox,
} from '../components';
import api from '../api';
import { FiPlus as PlusIcon, FiX as CloseIcon } from 'react-icons/fi';

import { v4 as uuid } from 'uuid';

const Customers = () => {
  // const { customers } = useSelector((state) => state.customer);
  // const dispatch = useDispatch();
  const { register, handleSubmit, errors, getValues } = useForm();
  let formRef = useRef(null);
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
  const handleSubmitCallback = (s) => {};

  return (
    <div style={{ minHeight: '100vh' }} className="customerPage">
      <div>
        <form
          className="f-form"
          style={{
            marginTop: '1.5em',
          }}
          onSubmit={handleSubmit(handleSubmitCallback)}
        >
          <Typography
            inline
            style={{
              margin: '0 0 1em 1em',
              display: 'block',
            }}
          >
            Add Customers
          </Typography>
          <Input
            type="text"
            name="name"
            label="Customer Name"
            ref={register({
              required: {
                value: true,
                message: 'Customer name is required',
              },
            })}
            error={errors.name}
            style={{ margin: '0 auto' }}
          />

          <Input
            type="tel"
            name="phone"
            label="Customer Phone Number"
            ref={register({
              required: {
                value: true,
                message: 'Customer Phone Number is required',
              },

              min: {
                value: 10,
                message: 'Invalid Phone Number',
              },
            })}
            error={errors.phone}
            style={{ margin: '0 auto' }}
          />

          <Input
            type="text"
            name="address"
            label="Customer Address"
            ref={register({
              required: {
                value: true,
                message: 'Customer Address is required',
              },
            })}
            multiline
            error={errors.address}
            style={{ margin: '0 auto' }}
          />

          <Button color="clear">
            <PlusIcon /> Add address from map{' '}
          </Button>

          <Button full>Add Item</Button>
        </form>
      </div>
      <div className="customers">
        <Typography
          small
          style={{
            marginLeft: '10px',
          }}
        >
          Your Customers
        </Typography>
        {!_.isEmpty(customers) &&
          customers.map((customer) => (
            <CustomerListItem key={uuid()} customer={customer} />
          ))}
      </div>
  
    </div>
  );
};

export default Customers;
