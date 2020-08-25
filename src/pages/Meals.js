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
  Loader,
} from '../components';
import api from '../api';
import Backdrop from '@material-ui/core/Backdrop';
//import { TopBar, SwitchBox, Input, Button, IconButton, Checkbox } from '../components'
import { Link } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import useSearch from '../hooks/useSearch';

const Meals = () => {
  // const { foodItems } = useSelector((state) => state.customer);
  // const dispatch = useDispatch();
  const [foodItems, setMeals] = useState([]);

  const { register, handleSubmit, errors } = useForm();

  let [isLoading, setLoading] = useState(false);
  let [isLoading2, setLoading2] = useState(false);
  let [loading, setLoad] = useState(true);

  useEffect(() => {
    (async () => {})();
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
      {/* <Input
        name="search"
        type="search"
        style={{ margin: '0 auto' }}
        label="Search Food Items"
        ref={ref}
      />


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
      </div>*/}
    </div>
  );
};

export default Meals;
