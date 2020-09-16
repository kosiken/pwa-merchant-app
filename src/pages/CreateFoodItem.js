import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Input, Button, Checkbox, Toast, Typography } from '../components';
import api from '../api';
import { Link } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const CreateFoodItem = ({ component, handleDone }) => {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  // eslint-disable-next-line no-unused-vars
  const [key, setKey] = useState('');
  const { register, handleSubmit, errors } = useForm();
  let [isLoading, setLoading] = useState(false);
  function handleOpen(m) {
    setKey(enqueueSnackbar(m));
  }

  const handleSubmitCallback = (s) => {
    setLoading(true);
    api
      .createFood(s)
      .then((food) => {
        dispatch({ type: 'ADD_FOOD', food });
        if (component) {
          handleDone(1);
          return;
        }
        handleOpen('Food Item Created');
        setLoading(false);
      })
      .catch((err) => {
        handleOpen(err.data.error);
        setLoading(false);
      });
  };

  if (component) {
    return (
      <form
        onSubmit={handleSubmit(handleSubmitCallback)}
        className="f-form"
        style={{
          marginTop: '1.5em',
        }}
      >
        <div className="container">
          <Input
            ref={register({
              required: {
                value: true,
                message: 'Food name is required',
              },
            })}
            error={errors.name}
            type="text"
            name="name"
            label="Name"
            style={{ margin: '0 auto' }}
          />
          <Input
            type="text"
            name="price"
            label="Price"
            style={{ margin: '0 auto' }}
            ref={register({
              required: {
                value: true,
                message: 'Price is required',
              },
              pattern: {
                value: /^[+-]?([0-9]*[.])?[0-9]+$/,
                message: 'Invalid price',
              },
            })}
            error={errors.price}
          />
          <div style={{ margin: '20px' }}>
            <Checkbox name="is_available" label="Available?" ref={register()} />
          </div>

          <Button loading={isLoading} full>
            Add Item
          </Button>
        </div>
      </form>
    );
  }
  return (
    <div style={{ minHeight: '100vh' }}>
      <Toast
        color="primary"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Link to="/FoodItems">
          <Button color="clear"> Back</Button>
        </Link>
      </Toast>

      <form
        onSubmit={handleSubmit(handleSubmitCallback)}
        className="f-form"
        style={{
          marginTop: '1.5em',
        }}
      >
        <div className="container">
          <Input
            ref={register({
              required: {
                value: true,
                message: 'Food name is required',
              },
            })}
            error={errors.name}
            type="text"
            name="name"
            label="Name"
            style={{ margin: '0 auto' }}
          />
          <Input
            type="text"
            name="price"
            label="Price"
            style={{ margin: '0 auto' }}
            ref={register({
              required: {
                value: true,
                message: 'Price is required',
              },
              pattern: {
                value: /^[+-]?([0-9]*[.])?[0-9]+$/,
                message: 'Invalid price',
              },
            })}
            error={errors.price}
          />
          <div style={{ margin: '20px' }}>
            <Checkbox name="is_available" label="Available?" ref={register()} />
          </div>

          <Button loading={isLoading} full>
            Add Item
          </Button>
        </div>
      </form>

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
    </div>
  );
};

export default CreateFoodItem;
