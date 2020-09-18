import React, { useState, useEffect, useRef } from 'react';
// import { Modal } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
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
  Loader,
} from '../components';
import { withStyles } from '@material-ui/core/styles';
import { v4 as uuid } from 'uuid';
import Tooltip from '@material-ui/core/Tooltip';

// import { Link } from "react-router-dom";
import {
  FiPlus as PlusIcon,
  FiHelpCircle as InfoIcon,
  FiX as CloseIcon,
} from 'react-icons/fi';

import { getDetails, HelpInfo } from '../constants';

const HtmlTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: 'rgba(255, 220, 74, 0.21)',
    color: '#e38000',
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #e38000',
  },
}))(Tooltip);

const CreateOrder = () => {
  let [tab, setTab] = useState('New Recepient');

  let [foodItems, setFoodItems] = useState([]);
  const [show, setShow] = useState(false);
  const [entry, setEntry] = useState(0);
  const handleShow = (id) => {
    setEntry(id);

    setShow(true);
  };
  const [loading, setLoading] = useState(true);
  let [currentFood, setCurrentFood] = useState('');
  const [submitting, setSubmiting] = useState(false);
  let [pickupAddress, setPickupAddress] = useState({});
  let [currentLocation, setCurrentLocation] = useState({});
  let [chosenLocation, setChosenLocation] = useState(0);
  let [quantity, setQuantity] = useState('');
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [key, setKey] = useState('');
  let [message, setMessage] = useState('Submitting');
  let [customer, setRecepient] = useState(null);
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
  const handleSubmitCallback = async (s) => {
    if (!foodItems.length) {
      handleOpen("You haven't added any delivery items");
      return;
    }
    setSubmiting(true);

    if (currentLocation.place_id) {
      currentLocation = await getDetails(currentLocation.place_id);
      setMessage('Resolving Delivery Address');
    }

    if (pickupAddress.place_id) {
      pickupAddress = await getDetails(pickupAddress.place_id);
      setMessage('Resolving Pickup Address');
    }
    let food_items = foodItems;
    if (foodItems.some((food) => food.is_new === true)) {
      setMessage('Creating New Items');
      let newItems = foodItems.filter((food) => food.is_new === true);
      let oldItems = foodItems.filter((food) => !food.is_new);

      api
        .createFoods(newItems)
        .then((resp) => {
          console.log(resp);
          newItems = resp.map((newItem, index) => {
            return {
              ...newItem,
              quantity: newItems[index].quantity,
            };
          });
          dispatch({ type: 'ADD_FOODS', foods: resp });
          setMessage('Submitting Delivery Request');
          let body = {
            full_name: customer ? customer.full_name : getValues('name'),
            phone_number: customer ? customer.phone_number : getValues('phone'),
            food_items: oldItems.concat(newItems),
            pickup_phone: s.pickup_phone,
            notes: s.order_notes,
          };
          if (chosenLocation === 0 || tab === 'New Recepient') {
            body = {
              ...body,
              delivery_address: currentLocation,
              pickup_address: pickupAddress,
            };
          } else {
            body = {
              ...body,
              delivery_address_id: s.type_of_address,
              pickup_address: pickupAddress,
            };
          }
          api
            .createOrder(body, token)
            .then((result) => {
              setSubmiting(false);
              handleShow(result.id);
            })
            .catch((err) => {
              setSubmiting(false);
              handleOpen(err.data.error);
            });
        })
        .catch((err) => {
          setSubmiting(false);
          handleOpen(err.message || err.data.error);
        });
      return;
    }
    setMessage('Submitting Delivery Request');
    let body = {
      full_name: getValues('name'),
      phone_number: customer ? customer.phone_number : getValues('phone'),
      food_items,
      pickup_phone: s.pickup_phone,
      order_notes: s.order_notes,
    };
    if (chosenLocation === 0 || tab === 'New Recepient') {
      body = {
        ...body,
        delivery_address: currentLocation,
        pickup_address: pickupAddress,
      };
    } else {
      body = {
        ...body,
        delivery_address_id: s.type_of_address,
        pickup_address: pickupAddress,
      };
    }
    api
      .createOrder(body, token)
      .then((result) => {
        setSubmiting(false);
        handleShow(result.id);
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
  const changePickupAddress = (e) => {
    setPickupAddress(e.target.value);
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
    setRecepient(null);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab]);
  useEffect(() => {
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
    if (!currentFood) {
      return;
    }
    setFoodItems(foodItems.concat([{ ...currentFood, quantity }]));
    setCurrentFood(null);
  };
  const removeFood = (food) => {
    console.log(foodItems.filter((f) => f !== food));
    setFoodItems(foodItems.filter((f) => f.name !== food));
  };

  return (
    <div style={{ minHeight: '100vh' }} className="mt-4">
      <Loader backdrop open={submitting}>
        <Typography style={{ color: 'white' }}> {message}r</Typography>
      </Loader>

      <SwitchBox
        options={['Existing Recepient', 'New Recepient']}
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
          <Typography small variant="primary" style={{ display: 'block' }}>
            Required*
          </Typography>
          <HtmlTooltip
            title={<Typography inline>{HelpInfo.recepient}</Typography>}
            placement="right"
          >
            <div style={{ display: 'inline-block' }}>
              <Typography>
                Recepient Information <InfoIcon />{' '}
              </Typography>
            </div>
          </HtmlTooltip>
          {tab === 'Existing Recepient' && (
            <>
              <ComboBox0
                items={vendorCustomers}
                loading={loading}
                onChange={setRecepient}
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
                          text: 'No Recepient selected',
                        },
                      ]
                }
                ref={register()}
                name="type_of_address"
                label="Select from previous addresses"
                onChange={(e) => setChosenLocation(e.target.value)}
              />
            </>
          )}

          {tab === 'New Recepient' && (
            <>
              <Input
                type="text"
                name="name"
                label="Recepient Name*"
                ref={register({
                  required: {
                    value: true,
                    message: 'Recepient name is required',
                  },
                })}
                error={errors.name}
              />

              <Input
                type="tel"
                name="phone"
                label="Recepient Phone Number*"
                ref={register({
                  required: {
                    value: true,
                    message: 'Recepient Phone Number is required',
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
          {((tab === 'Existing Recepient' && chosenLocation === 0) ||
            tab === 'New Recepient') && (
            <ComboBox2
              onChange={changeCurrentAddress}
              label="Recepient Address*"
            />
          )}
          {tab === 'New Recepient' && (
            <div className="mb-3">
              <Checkbox
                label="Save this recepient for next time"
                style={{ margin: '0 0 1em' }}
              />
            </div>
          )}
          <HtmlTooltip
            title={<Typography inline>{HelpInfo.recepient}</Typography>}
            placement="right"
          >
            <div style={{ display: 'inline-block' }}>
              <Typography>
                Pickup Information <InfoIcon />{' '}
              </Typography>
            </div>
          </HtmlTooltip>
          <Input
            type="tel"
            name="pickup_phone"
            label="Pickup Phone Number"
            ref={register({
              min: {
                value: 10,
                message: 'Invalid Phone Number',
              },
            })}
            error={errors.pickup_phone}
          />
          <ComboBox2 onChange={changePickupAddress} label="Pickup Address" />
          <div style={{ margin: '1em 0 0' }}>
            <HtmlTooltip
              title={<Typography inline>{HelpInfo.recepient}</Typography>}
              placement="right"
            >
              <div style={{ display: 'inline-block' }}>
                <Typography>
                  Add food items <InfoIcon />{' '}
                </Typography>
              </div>
            </HtmlTooltip>{' '}
            <br />
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
                label="Qty*"
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
          <HtmlTooltip
            title={<Typography inline>{HelpInfo.recepient}</Typography>}
            placement="right"
          >
            <div style={{ display: 'inline-block' }}>
              <Typography>
                Extra Information <InfoIcon />{' '}
              </Typography>
            </div>
          </HtmlTooltip>

          <Input
            type="text"
            name="order_notes"
            label="Order Notes"
            ref={register()}
            multiline
          />
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

      {show && <Redirect to={'/interstital?request=' + entry} />}
    </div>
  );
};

export default CreateOrder;
