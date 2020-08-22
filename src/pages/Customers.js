import React, { useState, useEffect, useRef } from 'react';
//
import { useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack';

import {
  CustomerListItem,
  Typography,
  Input,
  Button,
  Loader,
  IconButton,
} from '../components';
import Backdrop from '@material-ui/core/Backdrop';
import api from '../api';
import { FiPlus as PlusIcon } from 'react-icons/fi';
import { FiSearch as SearchIcon, FiX as CloseIcon } from 'react-icons/fi';
import { v4 as uuid } from 'uuid';
import useSearch from '../hooks/useSearch';

const Customers = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [customers, setCustomers] = useState([]);
  const { register, handleSubmit, errors } = useForm();
  let [isLoading, setLoading] = useState(false);
  let [isLoading2, setLoading2] = useState(false);
  const [key, setKey] = useState('');
  const [loaded, setLoaded] = useState(true);
  const [open, setOpen] = useState(false);
  const [openb, setOpenb] = useState(false);
  const [search, setSearch] = useState(false);

  let ref = useRef(null);
  let items = useSearch(ref, customers, function (e, l) {
    return new RegExp(e.toLowerCase()).test(l.full_name.toLowerCase());
  });
  let [editing, setEditing] = useState({
    full_name: '',
    phone_number: '',
    email_address: '',
  });
  const editCustomer = (customer) => {
    //let entries =  ['full_name','phone_number', 'email_address']
    setEditing(customer);
    setOpenb(true);
  };

  const handleClose = () => {
    setOpenb(false);
  };
  // eslint-disable-next-line no-unused-vars
  const handleToggle = () => {
    setOpenb(!openb);
  };

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

  useEffect(() => {
    (async () => {
      try {
        let __customers = await api.getCustomers();
        setCustomers(__customers);
        setLoaded(false);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  const handleSubmitCallback = (s) => {
    setLoading(true);

    api
      .createCustomer(s)
      .then((user) => {
        setCustomers(customers.concat([user]));
        setLoading(false);
        document.getElementById('five-form').reset();
      })

      .catch((err) => {
        console.log(err);
        handleOpen(err.data.error);
      });
  };

  const handleSubmitCallback2 = (s) => {
    setLoading2(true);

    editing.full_name = s.full_name;
    editing.email_address = s.email_address;
    editing.phone_number = s.phone_number;
    api
      .editModel({ ...editing, model: 'VendorCustomer' })
      .then((user) => {
        let index = customers.findIndex((customer) => customer.id === user.id);
        customers[index] = user;
        setEditing({
          full_name: '',
          phone_number: '',
          email_address: '',
        });
        setCustomers(customers);
        setLoading2(false);
        document.getElementById('theForm').reset();
        handleClose();
        //  document.getElementById('five-form').reset();
      })

      .catch((err) => {
        console.log(err.data);
        handleOpen('Unexpected err');
        setLoading2(false);
      });
  };

  return (
    <div style={{ minHeight: '100vh' }} className="customerPage">
      <div>
        <form
          className="f-form "
          style={{
            marginTop: '1.5em',
            marginBottom: '1em',
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

          <Button loading={isLoading} full onClick={handleSubmit(handleSubmitCallback)}>
            Add Item
          </Button>
        </form>
                                                    {/*
        <Backdrop
          open={openb}
          style={{
            zIndex: '999',
          }}
        >
          <form
            className="f-form"
            style={{
              marginTop: '1.5em',
            }}
            onSubmit={handleSubmit(handleSubmitCallback2)}
            id="theForm"
          >
            <Typography
              inline
              style={{
                margin: '0 0 1em 1em',
                display: 'block',
              }}
            >
              Edit Customer
            </Typography>
            <Input
              type="text"
              name="full_name"
              label={editing.full_name}
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
              label={editing.email_address}
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
              label={editing.phone_number}
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

            <Button loading={isLoading2} full>
              Confirm
            </Button>
          </form>

          <Button
            color="clear"
            onClick={handleClose}
            style={{
              position: 'fixed',
              bottom: '0',
              color: 'white',
              fontSize: '1.2em',
            }}
          >
            Close
          </Button>
        </Backdrop> */}
      </div>

      <div className="customers">
        <section
          style={{
            display: 'flex',
            padding: '10px',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography
            small
            style={{
              marginLeft: '10px',
            }}
          >
            Your Customers
          </Typography>

          <IconButton
            style={{
              color: '#f0324b',
            }}
            onClick={() => {
              setSearch(!search);
            }}
          >
            {!search && <SearchIcon />}
            {search && <CloseIcon />}
          </IconButton>
        </section>

        <Input
          name="search"
          type="search"
          style={{ margin: '0 auto', display: search ? 'block' : 'none' }}
          label="Search Customers"
          ref={ref}
        />

        {items.map((customer) => (
          <CustomerListItem
            key={uuid()}
            customer={customer}
            onEdit={editCustomer}
          />
        ))}
        {loaded && <Loader />}
      </div>
    </div>
  );
};

export default Customers;
