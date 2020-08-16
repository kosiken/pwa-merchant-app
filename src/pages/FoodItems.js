import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import {
  Input,
  Button,
  Checkbox,
  TopBar,
  CustomerListItem,
  Typography,
} from '../components';
import api from '../api';
//import { TopBar, SwitchBox, Input, Button, IconButton, Checkbox } from '../components'
// import { Link } from "react-router-dom";
import { useSnackbar } from 'notistack';
import { v4 as uuid } from 'uuid';
import FoodListItem from '../components/FoodListItem/FoodListItem';

const FoodItems = () => {
  // const { foodItems } = useSelector((state) => state.customer);
  // const dispatch = useDispatch();
  const [foodItems, setFoodItems] = useState([]);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [key, setKey] = useState('');
  const { register, handleSubmit, errors, getValues } = useForm();
  const [open, setOpen] = useState(false);
  const [is_available, setIsAvailable] = useState(true);
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);

  function handleOpen(m) {
    setKey(enqueueSnackbar(m));
  }

  useEffect(() => {
    (async () => {
      try {
        let __foodItems = await api.getFoods();
        setFoodItems(__foodItems);
        // dispatch({ type: 'GET_CUSTOMERS', __customers });
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

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
      <form
        onSubmit={handleSubmit(handleSubmitCallback)}
        className="f-form"
        style={{
          marginTop: '1.5em',
        }}
      >
        <Typography
          style={{
            fontWeight: '600',
          }}
        >
          Add to your Menu
        </Typography>
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
            onChange={(e) => setName(e.target.value)}
            style={{ margin: '0 auto' }}
          />
          <Input
            type="text"
            name="price"
            onChange={(e) => setPrice(e.target.value)}
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
          {/* <Input
            required
            type="number"
            name="quantity"
            label="Quantity"
            style={{ margin: '0 auto' }}
          /> */}
          <Button full>Add Item</Button>
        </div>
      </form>

      <div className="customers">
        {!_.isEmpty(foodItems) &&
          foodItems.map((foodItem) => (
            <FoodListItem key={uuid()} food_item={foodItem} />
          ))}
      </div>
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

export default FoodItems;
