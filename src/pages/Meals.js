import React, { useState, useEffect, useRef } from 'react';

import {
  Button,
  Toast,
  Typography,
  Meal,
  Input,
  Loader,
  ErrorComponent,
} from '../components';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import api from '../api';
import useSearch from '../hooks/useSearch';

const Meals = () => {
  let [loading, setLoad] = useState(true);
  const dispatch = useDispatch();
  let [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { meals } = useSelector((state) => {
    return {
      meals: state.food.meals || [],
    };
  });
  let ref = useRef(null);
  let items = useSearch(ref, meals, function (e, l) {
    return new RegExp(e.toLowerCase()).test(l.name.toLowerCase());
  });

  const init = () => {
    setError(false);
    (async () => {
      try {
        if (!meals.length) {
          let _meals = await api.getMeals();
          console.log(_meals);
          if (_meals.length)
            _meals = _meals.map((m) => {
              return {
                ...m,
                type: 'meal',
              };
            });

          dispatch({ type: 'GET_FOODS', foods: _meals });
        }
        setLoad(false);
      } catch (error) {
        setLoad(false);
        setErrorMessage(error.data.error);
        setError(true);
      }
    })();
  };

  useEffect(() => {
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        <Link to="/create-meal">
          <Button color="clear"> Create new</Button>
        </Link>
      </Toast>
      <br />
      <Input
        name="search"
        type="search"
        style={{ margin: '0 auto' }}
        label="Search Meals"
        ref={ref}
      />
      {error && (
        <ErrorComponent message={errorMessage}>
          <Button onClick={init}> Retry </Button>
        </ErrorComponent>
      )}
      {loading && <Loader />}
      <div className="container">
        {items.map((meal, i) => (
          <Meal meal={meal} key={'food-item' + i} index={i} />
        ))}
      </div>
    </div>
  );
};

export default Meals;
