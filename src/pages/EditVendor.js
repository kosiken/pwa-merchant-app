import React, { useState, useEffect } from 'react';
import { Input, Button, Typography } from '../components';
import { Link, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { useSnackbar } from 'notistack';

import { useForm } from 'react-hook-form';
import api from '../api';

const EditVendor = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [key, setKey] = useState('');
  let [isLoading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const [done, setDone] = useState(false);
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
  const { register, handleSubmit, errors } = useForm();
  const dispatch = useDispatch();

  const submit = async (formData) => {
    if (formData.password !== formData.password2) return;
    setLoading(true);
    if (formData.email_address) user.email_address = formData.email_address;
    if (formData.name) user.name = formData.name;
    if (formData.phone_number) user.phone_number = formData.phone_number;
    user.Address = null;
    api
      .editModel({ ...user, model: 'Vendor' })
      .then((user) => {
        const defA = {
          full_address: 'No Address',
        };

        user.Address = user.Address ? user.Address : defA;
        dispatch({ user: { Vendor: user }, type: 'SIGNUP_USER' });
        setDone(true);
      })

      .catch((err) => {
        setLoading(false);
        console.log(err);
        if (err.data) handleOpen(err.data.error);
      });
  };
  return (
    <div className="mt-4">
      {' '}
      <Typography
        title
        variant="secondary"
        className="mb-1"
        style={{
          fontSize: '2em',
          fontWeight: '700',
        }}
      >
        Edit Profile
      </Typography>{' '}
      <Link to="/profile">
        <Button color="clear"> Back</Button>
      </Link>
      {done && <Redirect to="/profile" />}
      <form
        className="f-form"
        onSubmit={handleSubmit(submit)}
        autoComplete={'false'}
      >
        <Input
          type="text"
          name="name"
          label="Name"
          style={{ margin: '0 auto' }}
          ref={register({
            required: {
              value: true,
              message: 'You need to enter this value',
            },
          })}
          error={errors.name}
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
          label="Phone Number"
          name={'phone_number'}
          variant="outlined"
          style={{ margin: '0 auto' }}
          type="tel"
          ref={register({
            min: {
              value: 10,
              message: 'Invalid Phone Number',
            },
          })}
          error={errors.phone_number}
        />{' '}
        <Button full loading={isLoading}>
        Confirm
        </Button>
      </form>
      <div></div>{' '}
    </div>
  );
};

export default EditVendor;
