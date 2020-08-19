import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import { useForm } from 'react-hook-form';
import { Input, Button, Checkbox, Toast, Typography } from '../components';
import api from '../api';
//import { TopBar, SwitchBox, Input, Button, IconButton, Checkbox } from '../components'
import { Link } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { v4 as uuid } from 'uuid';
import FoodListItem from '../components/FoodListItem/FoodListItem';

const FoodItems = () => {
  // const { foodItems } = useSelector((state) => state.customer);
  // const dispatch = useDispatch();
  const [foodItems, setFoodItems] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const [key, setKey] = useState('');
  const { register, handleSubmit, errors } = useForm();

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
    </div>
  );
};

export default FoodItems;
