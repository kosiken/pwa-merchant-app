import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import api from '../api';
import {
  Input,
  Button,
  IconButton,
  Checkbox,
  Typography,
  ComboBox,
  Toast,
} from '../components';
import { v4 as uuid } from 'uuid';

// import { Link } from "react-router-dom";
import { FiPlus as PlusIcon, FiX as CloseIcon } from 'react-icons/fi';

const CreateMeal = () => {
  const { token, _foods } = useSelector((state) => {
    return {
      token: state.auth.token,
      _foods: state.food.foods || [],
    };
  });
  const dispatch = useDispatch();
  let [foods, setFoods] = useState([]);

  let [currentFood, setCurrentFood] = useState('');
  // eslint-disable-next-line no-unused-vars
  let [loading, setLoad] = useState(true);
  let [quantity, setQuantity] = useState('');
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [key, setKey] = useState('');
  let [isLoading, setLoading] = useState(false);

  const [open, setOpen] = useState(false);
  function handleOpen(m) {
    setKey(enqueueSnackbar(m));
  }

  let formRef = useRef(null);
  let quantityRef = useRef(null);
  const { register, handleSubmit, errors } = useForm();
  const handleSubmitCallback = (s) => {
    setLoading(true);

    api
      .createMeal(
        {
          ...s,

          food_items: foods,
        },
        token
      )
      .then((result) => {
        setLoading(false);
        handleOpen('Meal Created');
      })
      .catch((err) => {
        setLoading(false);
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
        if (!_foods.length) {
          let food = await api.getFoods();
          let meals = await api.getMeals();
          if (meals.length)
            meals = meals.map((m) => {
              return {
                ...m,
                type: 'meal',
              };
            });
          dispatch({ type: 'GET_FOODS', foods: food.concat(meals) });
        }
        setLoad(false);
      } catch (error) {
        console.log(error);
        setLoad(false);
      }
    })();
    //  foodRef.current.value = '';
    quantityRef.current.value = '';
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        color="primary"
        style={{
          marginBottom: '1em',
        }}
      >
        <Link to="/meals">
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
        <Input
          ref={register({
            required: {
              value: true,
              message: 'Meal name is required',
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
        <Input
          type="text"
          name="est_preparation_time"
          label="Estimated Preparation Time"
          style={{ margin: '0 auto' }}
          ref={register({
            required: {
              value: true,
              message: 'Price is required',
            },
          })}
          error={errors.price}
        />
        <Input
          select
          options={[
            {
              value: 'single',
              text: 'Single',
            },
            {
              value: 'complete',
              text: 'Complete',
            },
          ]}
          ref={register()}
          name="type_of_meal"
          style={{ margin: '0 auto' }}
          label="Type of Meal"
        />
        <Input
          type="number"
          name="quantity"
          onChange={changeQuantity}
          label="Quantity"
          style={{ margin: '0 auto' }}
          ref={register({
            required: {
              value: true,
              message: 'Quantity is required',
            },
            pattern: {
              value: /^[+-]?([0-9]*[.])?[0-9]+$/,
              message: 'Invalid Quantity',
            },
          })}
        />
        <div style={{ margin: '20px' }}>
          <Checkbox name="is_available" label="Available?" ref={register()} />
        </div>

        <div style={{ margin: '1em 0 0' }}>
          <section style={{ width: '60%', display: 'inline-block' }}>
            <ComboBox
              items={_foods}
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

        <Button full loading={isLoading}>
          Create Meal
        </Button>
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
