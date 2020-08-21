import React, { useState } from 'react';

import { useForm } from 'react-hook-form';
import { Input, Button, Checkbox, Toast, Typography } from '../components';
import api from '../api';
//import { TopBar, SwitchBox, Input, Button, IconButton, Checkbox } from '../components'
import { Link } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const CreateFoodItem = () => {
  // const { foodItems } = useSelector((state) => state.customer);
  // const dispatch = useDispatch();

  const { enqueueSnackbar } = useSnackbar();
  // eslint-disable-next-line no-unused-vars
  const [key, setKey] = useState('');
  const { register, handleSubmit, errors } = useForm();

  function handleOpen(m) {
    setKey(enqueueSnackbar(m));
  }

  const handleSubmitCallback = (s) => {
    api
      .createFood(s)
      .then((result) => {
        handleOpen('Order Created');
      })
      .catch((err) => {
        handleOpen(err.data.error);
      });
  };

  return (
    <div style={{ minHeight: '100vh' }}>
      <Toast
        color="info"
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

          <Button full>Add Item</Button>
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
