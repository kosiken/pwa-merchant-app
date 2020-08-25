import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
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

const CreateMeal = () => {
  let [tab, setTab] = useState('New');
  let [foods, setFoods] = useState([]);
  let [foodItems, setFoodItems] = useState([]);
  let [locations, setLocations] = useState([
    {
      name_of_area: 'Ikeja',
      state: 'Lagos',
      latitude: 15,
      longitude: 20,
      full_address: '10 Frank Estate, Ajah, Ikeja Lagos',
      plus_code: '+234',
      google_map_link: 'https://goo.gl/465767899',
      id: 1,
    },
  ]);
  let [currentFood, setCurrentFood] = useState('');
  // eslint-disable-next-line no-unused-vars
  let [currentLocation, setCurrentLocation] = useState(null);
  let [quantity, setQuantity] = useState('');
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [key, setKey] = useState('');

  const [open, setOpen] = useState(false);

  function handleOpen(m) {
    setKey(enqueueSnackbar(m));
  }
  const { token } = useSelector((state) => state.auth);
  let formRef = useRef(null);
  let quantityRef = useRef(null);
  const { register, handleSubmit, errors, getValues } = useForm();
  const handleSubmitCallback = (s) => {
    api
      .createOrder(
        {
          full_name: getValues('name'),
          phone_number: customer ? customer.phone_number : getValues('phone'),
          delivery_address: 'Lion',
          food_items: foods,
        },
        token
      )
      .then((result) => {
        handleOpen('Order Created');
      })
      .catch((err) => {
        handleOpen(err.data.error);
      });
  };

  const changeCurrentFood = (e) => {
    setCurrentFood(e.target.value);
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
    (async () => {
      try {
    
        let food = await api.getFoods();
       
        setFoodItems(food);

       
      } catch (error) {
        console.log(error);
      }
    })();
    //  foodRef.current.value = '';
    quantityRef.current.value = '';
  }, [foods]);

  const addFood = (e) => {
    console.log(foods);
    setFoods(foods.concat([{ ...currentFood, quantity }]));
  };
  const removeFood = (food) => {
    console.log(foods.filter((f) => f !== food));
    setFoods(foods.filter((f) => f.name !== food));
  };
  return (
    <div style={{ minHeight: '100vh' }}>
      <Toast
        color="info"
        style={{
          marginBottom: '1em',
        }}
      >
        <Link to="/">
          <Button color="clear"> Back</Button>
        </Link>
      </Toast>
    
      <form
        autoComplete="off"
        className="f-form"
        style={{
          marginTop: '1.5em',
        }}
        onSubmit={handleSubmit(handleSubmitCallback)}
        ref={formRef}
      >

         
oo
          <div style={{ margin: '1em 0 0' }}>
            <section style={{ width: '60%', display: 'inline-block' }}>
              <ComboBox items={foodItems} onChange={changeCurrentFood} />
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

          {foods.map((food) => (
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

          <Button full>Create Order</Button>
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

export default CreateMeal;
