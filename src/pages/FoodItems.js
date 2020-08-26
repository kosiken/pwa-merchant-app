/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react';
import _ from 'lodash';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import {
  Input,
  Button,
  Checkbox,
  Toast,
  Typography,
  FoodListItem,
  Loader,
} from '../components';
import api from '../api';

import { Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import useSearch from '../hooks/useSearch';

const FoodItems = () => {
  // const { foodItems } = useSelector((state) => state.customer);
  const [b] = useState('l');
  // const dispatch = useDispatch();
  const { foodItems } = useSelector((state) => {
    return {
      foodItems: state.food.foods || [],
    };
  });
  const { enqueueSnackbar } = useSnackbar();
  const [key, setKey] = useState('');
  const { register, handleSubmit, errors } = useForm();
  let [editing, setEditing] = useState({
    name: '',
    price: '',
  });
  const dispatch = useDispatch();
  const [openb, setOpenb] = useState(false);
  let [isLoading, setLoading] = useState(false);
  let [isLoading2, setLoading2] = useState(false);
  let [loading, setLoad] = useState(true);
  let ref = useRef(null);
  let items = useSearch(ref, foodItems, function (e, l) {
    return new RegExp(e.toLowerCase()).test(l.name.toLowerCase());
  });
  function handleOpen(m) {
    setKey(enqueueSnackbar(m));
  }
  const handleClose = () => {
    setOpenb(false);
  };
  useEffect(() => {
    console.log('ere');
    (async () => {
      try {
        let meals;
        if (!foodItems.length) {
          meals = await api.getMeals();
          if (meals.length)
            meals = meals.map((m) => {
              return {
                ...m,
                type: 'meal',
              };
            });

          let foods = await api.getFoods();
          dispatch({ type: 'GET_FOODS', foods: foods.concat(meals) });
        }
        setLoad(false);
        // dispatch({ type: 'GET_CUSTOMERS', __customers });
      } catch (error) {
        console.log(error);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [b]);
  const editFood = (food) => {
    setEditing(food);
    setOpenb(true);
  };
  const handleSubmitCallback = (s) => {
    setLoading2(true);
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
        dispatch({ type: 'GET_FOODS', foods: foodItems });
        setLoading2(false);
        document.getElementById('theForm').reset();
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
      <br />
      <Input
        name="search"
        type="search"
        style={{ margin: '0 auto' }}
        label="Search Food Items"
        ref={ref}
      />

      <Modal
        show={openb}
        onHide={handleClose}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        {' '}
        <Modal.Body>
          <form
            className="f-form"
            style={{
              marginTop: '1.5em',
            }}
            onSubmit={handleSubmit(handleSubmitCallback)}
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
              name="name"
              label={editing.name}
              ref={register({})}
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

            <div style={{ margin: '20px' }}>
              <Checkbox
                name="is_available"
                label="Available?"
                checked={editing.is_available}
                ref={register()}
              />
            </div>
            <Button loading={isLoading2} full>
              Confirm
            </Button>
          </form>{' '}
        </Modal.Body>
        <Modal.Footer>
          <Button color="clear" onClick={handleClose}>
            Close
          </Button>{' '}
        </Modal.Footer>
      </Modal>
      {loading && <Loader />}
      <div className="container food-items">
        {items.map((foodItem, i) => (
          <FoodListItem
            food_item={foodItem}
            key={'food-item' + i}
            onEdit={editFood}
            index={i}
          />
        ))}
      </div>
    </div>
  );
};

export default FoodItems;
