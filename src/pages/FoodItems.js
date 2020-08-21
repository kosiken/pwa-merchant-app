/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react';
import _ from 'lodash';
import { useForm } from 'react-hook-form';
import {
  Input,
  Button,
  Checkbox,
  Toast,
  Typography,
  FoodListItem,
} from '../components';
import api from '../api';
import Backdrop from '@material-ui/core/Backdrop';
//import { TopBar, SwitchBox, Input, Button, IconButton, Checkbox } from '../components'
import { Link } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import useSearch from '../hooks/useSearch';

const FoodItems = () => {
  // const { foodItems } = useSelector((state) => state.customer);
  // const dispatch = useDispatch();
  const [foodItems, setFoodItems] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const [key, setKey] = useState('');
  const { register, handleSubmit, errors } = useForm();
  let [editing, setEditing] = useState({
    name: '',
    price: '',
  });
  const [openb, setOpenb] = useState(false);
  let [isLoading, setLoading] = useState(false);
  let [isLoading2, setLoading2] = useState(false);
  let ref = useRef(null);
  let items = useSearch(ref, foodItems, function (e, l) {
    return new RegExp(e.toLowerCase()).test(l.full_name.toLowerCase());
  });
  function handleOpen(m) {
    setKey(enqueueSnackbar(m));
  }
  const handleClose = () => {
    setOpenb(false);
  };
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
  const editFood = (food) => {
    //let entries =  ['full_name','phone_number', 'email_address']
    setEditing(food);
    setOpenb(true);
  };
  const handleSubmitCallback = (s) => {
    if (s.price) editing.price = s.price;
    if (s.name) editing.name = s.name;
    editing.is_available = s.is_available;

    api
      .editModel({ ...editing, model: 'FoodItem' })
      .then((result) => {
        let index = foodItems.findIndex(
          (foodItem) => foodItem.id === result.id
        );
        foodItems[index] = result;
        setEditing({
          name: '',
          price: '',
        });
        setFoodItems(foodItems);
        setLoading2(false);
        handleClose();
        handleOpen('Update Complete');
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
        <Typography inline>This is where all foods are shown</Typography>
        <Link to="/create-food">
          <Button color="clear"> Create new</Button>
        </Link>
      </Toast>
      <Input
        name="search"
        type="search"
        style={{ margin: '0 auto' }}
        label="Search Food Items"
        ref={ref}
      />

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
          onSubmit={handleSubmit(handleSubmitCallback)}
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
            label={editing.name}
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
            type="number"
            name="price"
            label={editing.price}
            style={{ margin: '0 auto' }}
            ref={register({})}
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
          <div style={{ margin: '20px' }}>
            <Checkbox name="is_available" label="Available?" ref={register()} />
          </div>
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
      </Backdrop>
      <div className="container">
        {items.map((foodItem, i) => (
          <FoodListItem
            food_item={foodItem}
            key={'food-item' + i}
            onEdit={editFood}
          />
        ))}
      </div>
    </div>
  );
};

export default FoodItems;
