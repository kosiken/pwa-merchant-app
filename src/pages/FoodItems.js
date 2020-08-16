import React, { useState, useEffect } from 'react';
import _ from 'lodash';
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

  const handleCreateFoodItem = async () => {
    try {
      let result = await api.createFood({
        name,
        price,
        is_available,
      });

      handleOpen('Food Added');
    } catch (err) {
      handleOpen(err.data.error);
    }
  };

  return (
    <div style={{ minHeight: '100vh' }}>
      <TopBar title="Meals and Menu" />
      <form
        onSubmit={handleCreateFoodItem}
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
            required
            type="text"
            name="name"
            label="Name"
            onChange={(e) => setName(e.target.value)}
            style={{ margin: '0 auto' }}
          />
          <Input
            required
            type="number"
            name="price"
            onChange={(e) => setPrice(e.target.value)}
            label="Price"
            style={{ margin: '0 auto' }}
          />
          <div style={{ margin: '20px' }}></div>
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
