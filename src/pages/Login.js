import React, { useState, useEffect } from 'react';
import { Input, Button, Typography } from '../components';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack';

import { useForm } from 'react-hook-form';
import api from '../api';
import logo from '../assets/logo-variant.png';
const Login = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
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
  const { register, handleSubmit, errors, getValues } = useForm();
  const dispatch = useDispatch();
  const submit = (formData) => {
    api
      .login(formData)
      .then((user) => {
        dispatch({ user, type: 'SIGNUP_USER' });
      })
      .catch((err) => {
        handleOpen(err.data.error);
      });
  };
  return (
    <div className="flex central">
      <form className="f-form" onSubmit={handleSubmit(submit)}>
        <div className="container">
          <div className="brand-div" style={{ textAlign: 'center' }}>
            {' '}
            <img alt="" src={logo} width="60" height="60" />
          </div>
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
            <Typography variant="primary"> Forgot Password? </Typography>
          </Link>

          <Link to="/signup">
            <Typography
              style={{
                color: '#5d97c6',
              }}
            >
              Sign Up
            </Typography>
          </Link>
          <Button full>Login</Button>
        </div>
      </form>
      <div>
        <Typography style={{ textAlign: 'center' }}>
          Made with{' '}
          <span role="img" aria-label="love">
            ❤️{' '}
          </span>
          <span
            style={{
              color: '#f0324b',
            }}
          >
            500Chow
          </span>
        </Typography>
      </div>{' '}
    </div>
  );
};

export default Login;
