import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
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

const EditMeal = () => {
  const { _foods, _meals } = useSelector((state) => {
    return {
      token: state.auth.token,

      _meals: state.food.meals || [],
    };
  });
  const dispatch = useDispatch();
  let [foods, setFoods] = useState([]);
  const { id } = useParams();
  let [currentFood, setCurrentFood] = useState('');
  // eslint-disable-next-line no-unused-vars
  let [loading, setLoad] = useState(true);
  let [quantity, setQuantity] = useState('');
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [key, setKey] = useState('');
  // eslint-disable-next-line no-unused-vars
  let [isLoading, setLoading] = useState(false);

  const [open, setOpen] = useState(false);
  function handleOpen(m) {
    setKey(enqueueSnackbar(m));
  }

  const [meal, setMeal] = useState({
    name: 'Loading...',
    price: '0.00',
    quantity: '0',
    is_available: true,
    est_preparation_time: 'Loading...',
    type_of_meal: 'single',
  });

  let formRef = useRef(null);
  let quantityRef = useRef(null);
  const { register, handleSubmit, errors } = useForm();
  const handleSubmitCallback = (s) => {
    handleOpen('Unresolved error for meal update');
    return;
    /* api
      .editModel(
       {
          ...s,

          food_items: foods,
          model: 'Meal'
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
  */
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
        if (_meals.length) {
          let m = _meals.find((m) => m.id === parseInt(id));
          if (m) {
            setMeal(m);
            for (let entry of [
              'name',
              'price',
              'quantity',
              'est_preparation_time',
            ]) {
              let node = document.getElementById(entry);
              if (node) node.value = m[entry];
            }
            setFoods(
              m.FoodItems.map((foodItem) => {
                return {
                  ...foodItem,
                  quantity: foodItem.FoodMeals.quantity || 1,
                };
              })
            );
          }
        } else if (!_foods.length) {
          let food = await api.getFoods();
          let meals = await api.getMeals();
          if (meals.length)
            meals = meals.map((m) => {
              return {
                ...m,
                type: 'meal',
              };
            });
          let m = meals.find((m) => m.id === parseInt(id));
          if (m) {
            setMeal(m);
            for (let entry of [
              'name',
              'price',
              'quantity',
              'est_preparation_time',
            ]) {
              let node = document.getElementById(entry);
              if (node) node.value = m[entry];
            }
            setFoods(
              m.FoodItems.map((foodItem) => {
                return {
                  ...foodItem,
                  quantity: foodItem.FoodMeals.quantity || 1,
                };
              })
            );
          } else {
            window.location.pathname = '/error';
          }
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
        color="info"
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
          ref={register()}
          error={errors.name}
          type="text"
          label="Name"
          name="name"
          style={{ margin: '0 auto' }}
        />
        <Input
          type="text"
          name="price"
          label="Price"
          style={{ margin: '0 auto' }}
          ref={register({
            pattern: {
              value: /^[+-]?([0-9]*[.])?[0-9]+$/,
              message: 'Invalid price',
            },
          })}
          error={errors.price}
        />
        <Input
          type="text"
          label="Estimated Preparation Time"
          name="est_preparation_time"
          style={{ margin: '0 auto' }}
          ref={register({})}
        />
        <Input
          select
          defaultValue={meal.type_of_meal}
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
          label="Quantity"
          onChange={changeQuantity}
          style={{ margin: '0 auto' }}
          ref={register({
            pattern: {
              value: /^[+-]?([0-9]*[.])?[0-9]+$/,
              message: 'Invalid Quantity',
            },
          })}
        />
        <div style={{ margin: '20px' }}>
          <Checkbox
            name="is_available"
            label="Available?"
            checked={meal.is_available}
            ref={register()}
          />
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
          Confirm
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

export default EditMeal;
