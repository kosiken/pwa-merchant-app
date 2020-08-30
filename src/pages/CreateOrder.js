import React, { useState, useEffect, useRef } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import api from '../api';
import {
  SwitchBox,
  Input,
  Button,
  IconButton,
  Checkbox,
  Typography,
  ComboBox,
  ComboBox2,
  ComboBox0,
  Toast,
} from '../components';
import { v4 as uuid } from 'uuid';

// import { Link } from "react-router-dom";
import { FiPlus as PlusIcon, FiX as CloseIcon } from 'react-icons/fi';

const CreateOrder = () => {
  let [tab, setTab] = useState('New Customer');

  let [foodItems, setFoodItems] = useState([]);

  const [loading, setLoading] = useState(true);
  let [currentFood, setCurrentFood] = useState('');
  const [submitting, setSubmiting] = useState(false);
  let [currentLocation, setCurrentLocation] = useState(null);
  let [chosenLocation, setChosenLocation] = useState(0);
  let [quantity, setQuantity] = useState('');
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [key, setKey] = useState('');

  let [customer, setCustomer] = useState(null);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  function handleOpen(m) {
    setKey(enqueueSnackbar(m));
  }
  const { token, vendorCustomers, vMeals, vFoods } = useSelector((state) => {
    return {
      token: state.auth.token,
      vendorCustomers: state.customer.customers || [],
      vMeals: state.food.meals || [],
      vFoods: state.food.foods || [],
    };
  });
  let formRef = useRef(null);
  let quantityRef = useRef(null);
  const { register, handleSubmit, errors, getValues } = useForm();
  const handleSubmitCallback = (s) => {
    let body = {
      full_name: getValues('name'),
      phone_number: customer ? customer.phone_number : getValues('phone'),
      food_items: foodItems,
    };

    if (chosenLocation === 0 || tab === 'New Customer') {
      body = { ...body, delivery_address: currentLocation };
    } else {
      body = { ...body, delivery_address_id: s.type_of_address };
    }

    setSubmiting(true);

    api
      .createOrder(body, token)
      .then((result) => {
        setSubmiting(false);
        handleOpen('Order Created');
      })
      .catch((err) => {
        setSubmiting(false);
        handleOpen(err.data.error);
      });
  };

  const changeCurrentFood = (e) => {
    setCurrentFood(e.target.value);
  };

  const changeCurrentAddress = (e) => {
    setCurrentLocation(e.target.value);
  };

  const changeQuantity = (e) => {
    setQuantity(e.target.value);
  };
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
  useEffect(() => {
    setCustomer(null);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab]);
  useEffect(() => {
    console.log('ere');
    (async () => {
      try {
        let meals;
        if (!vFoods.length) {
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
        let customers;
        if (!vendorCustomers.length) {
          customers = await api.getCustomers();
          // customers.forEach((i) => (i.Addresses = Address));
          dispatch({
            type: 'GET_CUSTOMERS',
            customers,
          });
        }
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    })();
    //  foodRef.current.value = '';
    quantityRef.current.value = '';
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addFood = (e) => {
    console.log(foodItems);
    setFoodItems(foodItems.concat([{ ...currentFood, quantity }]));
  };
  const removeFood = (food) => {
    console.log(foodItems.filter((f) => f !== food));
    setFoodItems(foodItems.filter((f) => f.name !== food));
  };

  return (
    <div style={{ minHeight: '100vh' }}>
      <Toast
        color="primary"
        style={{
          marginBottom: '1em',
        }}
      >
        <Link to="/">
          <Button color="clear"> Back</Button>
        </Link>
      </Toast>
      <SwitchBox
        options={['Existing Customer', 'New Customer']}
        value={tab}
        onChange={setTab}
      />
      <form
        autoComplete="off"
        className="f-form"
        style={{
          marginTop: '1.5em',
        }}
        onSubmit={handleSubmit(handleSubmitCallback)}
        ref={formRef}
      >
        <div className="container">
          {tab === 'Existing Customer' && (
            <>
              <ComboBox0
                items={vendorCustomers}
                loading={loading}
                onChange={setCustomer}
              />
              <Input
                select
                options={
                  customer
                    ? [
                        { value: 0, text: 'New Address? fill it in below' },
                      ].concat(
                        customer.Addresses &&
                          customer.Addresses.map((address) => {
                            return {
                              value: address.id,
                              text: address.full_address,
                            };
                          })
                      )
                    : [
                        {
                          value: 0,
                          text: 'No Customer selected',
                        },
                      ]
                }
                ref={register()}
                name="type_of_address"
                label="Select Existing Address"
                onChange={(e) => setChosenLocation(e.target.value)}
              />
            </>
          )}

          {tab === 'New Customer' && (
            <>
              <Input
                type="text"
                name="name"
                label="Customer Name"
                ref={register({
                  required: {
                    value: true,
                    message: 'Customer name is required',
                  },
                })}
                error={errors.name}
              />

              <Input
                type="tel"
                name="phone"
                label="Customer Phone Number"
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
                error={errors.phone}
              />
            </>
          )}
          {((tab === 'Existing Customer' && chosenLocation === 0) ||
            tab === 'New Customer') && (
            <ComboBox2 onChange={changeCurrentAddress} />
          )}
          {tab === 'New Customer' && (
            <div>
              <Checkbox
                label="Save this customer for next time"
                style={{ margin: '0 0 1em' }}
              />
            </div>
          )}

          <div style={{ margin: '1em 0 0' }}>
            <section style={{ width: '60%', display: 'inline-block' }}>
              <ComboBox
                items={vFoods.concat(vMeals)}
                loading={loading}
                onChange={changeCurrentFood}
              />
            </section>
            <section
              style={{
                width: '20%',
                marginLeft: '10%',
                display: 'inline-block',
              }}
            >
              <Input
                type="number"
                name="quantity"
                onChange={changeQuantity}
                label="Qty"
                ref={quantityRef}
              />
            </section>
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'right',
              margin: '0 0 1em',
            }}
          >
            {' '}
            <IconButton
              variant="beveled-edge"
              onClick={addFood}
              disabled={!currentFood || !quantity}
            >
              <PlusIcon /> Add
            </IconButton>
          </div>

          {foodItems.map((food) => (
            <section
              style={{
                justifyContent: 'space-between',
                padding: '0 15px',
              }}
              className="flex"
              key={uuid()}
            >
              <Typography>
                {food.name} {food.quantity}{' '}
              </Typography>
              <IconButton
                style={{ color: 'red' }}
                onClick={() => {
                  removeFood(food.name);
                }}
              >
                <CloseIcon />
              </IconButton>
            </section>
          ))}

          <Button
            full
            loading={submitting}
            style={{
              margin: '0',
            }}
          >
            Create Order
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

export default CreateOrder;
