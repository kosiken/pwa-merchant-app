import React, { useState, useEffect } from 'react';
import { Input, Button, Typography } from '../components';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack';

import { useForm } from 'react-hook-form';
import api from '../api';

const SignUp = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [key, setKey] = useState('');
  let [isLoading, setLoading] = useState(false);
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
  const { register, handleSubmit, errors, getValues } = useForm();
  const dispatch = useDispatch();
  const submit = (formData) => {
    if (formData.password !== formData.password2) return;
    setLoading(true);
    api
      .register(formData)
      .then((user) => {
        dispatch({ user, type: 'SIGNUP_USER' });

        setTimeout(() => {
          window.location.pathname = '/';
        }, 500);
      })

      .catch((err) => {
        setLoading(false);
        handleOpen(err.data.error);
      });
  };
  return (
    <div className="flex central">
      <form
        className="f-form"
        onSubmit={handleSubmit(submit)}
        autoComplete={'false'}
      >
        <Typography
          title
          variant="secondary"
          className="mb-4"
          style={{
            fontSize: '2em',
            fontWeight: '700',
          }}
        >
          Sign Up
        </Typography>

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
          name="email"
          label="Email Address"
          style={{ margin: '0 auto' }}
          ref={register({
            required: {
              value: true,
              message: 'You need to enter this value',
            },
            pattern: {
              value: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
              message: 'Invalid Email Address',
            },
          })}
          error={errors.email}
        />

        <Input
          label="Phone Number"
          name={'phone'}
          variant="outlined"
          style={{ margin: '0 auto' }}
          type="tel"
          ref={register({
            required: {
              value: true,
              message: 'Phone Number is required',
            },

            min: {
              value: 10,
              message: 'Invalid Phone Number',
            },
          })}
          error={errors.phone}
        />
        <Input
          type="password"
          name="password"
          label="Password"
          style={{ margin: '0 auto' }}
          ref={register({
            required: {
              value: true,
              message: 'Password is required',
            },
          })}
        />
        <Input
          label="Confirm Password"
          type="password"
          name="password2"
          ref={register()}
          style={{ margin: '0 auto' }}
          error={
            getValues('password') !== getValues('password2')
              ? { message: "Passwords don't match" }
              : {}
          }
        />
        <Link to="/">
          <Typography
            style={{
              color: '#5d97c6',
              width: '93%',
              margin: '0 auto 1em',
            }}
          >
            {' '}
            Login{' '}
          </Typography>
        </Link>
        <Button full loading={isLoading}>
          Sign Up
        </Button>
      </form>
      <div></div>{' '}
    </div>
  );
};

export default SignUp;
