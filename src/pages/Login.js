import React, { useState, useEffect } from 'react';
import { Input, Button, Typography } from '../components';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack';

import { useForm } from 'react-hook-form';
import api from '../api';

const Login = () => {
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
  const { register, handleSubmit, errors } = useForm();
  const dispatch = useDispatch();
  const submit = (formData) => {
    const defA = {
      full_address: 'No Address',
    };
    setLoading(true);
    api
      .login(formData)
      .then((user) => {
        user.Vendor.Address = user.Vendor.Address ? user.Vendor.Address : defA;
        dispatch({ user, type: 'SIGNUP_USER' });
      })
      .catch((err) => {
        handleOpen(err.data.error);
        setLoading(false);
      });
  };
  return (
    <div className="flex central">
      <form className="f-form" onSubmit={handleSubmit(submit)} id="f-main">
        <Typography
          title
          variant="secondary"
          className="mb-4"
          style={{
            fontSize: '2em',
            fontWeight: '700',
          }}
        >
          Login
        </Typography>

        <Input
          type="text"
          name="username"
          label="Email or Phone"
          style={{ margin: '0 auto' }}
          ref={register({
            required: {
              value: true,
              message: 'You need to enter this value',
            },
          })}
          error={errors.username}
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

        <Link to="/recovery">
          <Typography
            variant="primary"
            style={{
              width: '93%',
              margin: '0 auto 1em',
            }}
          >
            {' '}
            Forgot Password?{' '}
          </Typography>
        </Link>

        <Link to="/signup">
          <Typography
            style={{
              color: '#5d97c6',
              width: '93%',
              margin: '0 auto 1em',
            }}
          >
            Sign Up
          </Typography>
        </Link>
        <Button full loading={isLoading}>
          Login
        </Button>
      </form>
      <div></div>{' '}
    </div>
  );
};

export default Login;
