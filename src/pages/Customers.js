import React, { useState, useEffect, useRef } from 'react';
import _ from 'lodash';
import { useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack';
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

const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  // const { customers } = useSelector((state) => state.customer);
  // const dispatch = useDispatch();
  const { register, handleSubmit, errors, getValues } = useForm();
  let formRef = useRef(null);
  
    const [key, setKey] = useState('');

  const [open, setOpen] = useState(false);

  function handleOpen(m) {
    setKey(enqueueSnackbar(m));
  }
  useEffect(() => {
    const handleClose = () => {
      setOpen(false);
      closeSnackbar(key);
    };

    let timeout;
    if (open) {
      timeout = setTimeout(handleClose, 2000);
    }
    return () => {
      if (timeout) clearTimeout(timeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);
  
  
  let [isLoading, setLoading] = useState(false);
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
  const handleSubmitCallback = (s) => {   
   setLoading(true);
   
   api.createCustomer(s)
      .then((user) => {
  
   setCustomers(customers.concat([user]));setLoading(false);
   document.getElementById("five-form").reset()
      })

      .catch((err) => {
       console.log(err);
       handleOpen(err.data.error);
      });};

  return (
    <div style={{ minHeight: '100vh' }} className="customerPage">
    
      <div>
        <form
          className="f-form"
          style={{
            marginTop: '1.5em',
          }}
          onSubmit={handleSubmit(handleSubmitCallback)}
          id="five-form"
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
            name="full_name"
            label="Customer Name"
            ref={register({
              required: {
                value: true,
                message: 'Customer name is required',
              },
            })}
            error={errors.full_name}
            style={{ margin: '0 auto' }}
          />
          <Input
            type="email"
            name="email_address"
            label="Email Address"
            style={{ margin: '0 auto' }}
            ref={register({
       
              pattern: {
                value: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
                message: 'Invalid Email Address',
              },
            })}
            error={errors.email_address}
          />
          <Input
            type="tel"
            name="phone_number"
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
            error={errors.phone_number}
            style={{ margin: '0 auto' }}
          />



          <Button color="clear">
            <PlusIcon /> Add address from map{' '}
          </Button>

          <Button loading={isLoading} full>Add Item</Button>
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
