import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack';

import { useForm } from 'react-hook-form';
import api from '../api';
import {
  TopBar,
  SwitchBox,
  Input,
  Button,
  IconButton,
  Checkbox,
  Typography,
  ComboBox,
} from '../components';
import { v4 as uuid } from 'uuid';

// import { Link } from "react-router-dom";
import { FiPlus as PlusIcon, FiX as CloseIcon } from 'react-icons/fi';

const CreateOrder = () => {
  let [tab, setTab] = useState('New');
  let [foods, setFoods] = useState([]);
  let [items, setItems] = useState([]);
  let [currentFood, setCurrentFood] = useState('');
  let [quantity, setQuantity] = useState('');
  // let foodRef = useRef(null);
  let quantityRef = useRef(null);
  const { register, handleSubmit, errors } = useForm();
  const handleSubmitCallback = (s) => {};

  const changeCurrentFood = (e) => {
    setCurrentFood(e.target.value);
  };

  const changeQuantity = (e) => {
    setQuantity(e.target.value);
  };

  useEffect(() => {
    api.getFoods().then(setItems).catch(console.log);
  }, []);
  useEffect(() => {
    //  foodRef.current.value = '';
    quantityRef.current.value = '';
  }, [foods]);

  const addFood = (e) => {
    console.log(foods);
    setFoods(foods.concat([{ name: currentFood, quantity }]));
  };
  const removeFood = (food) => {
    console.log(foods.filter((f) => f !== food));
    setFoods(foods.filter((f) => f.name !== food));
  };
  return (
    <div style={{ minHeight: '100vh' }}>
      <TopBar title="Create Order" />

      <SwitchBox options={['Existing', 'New']} value={tab} onChange={setTab} />
      <form
        className="f-form"
        style={{
          marginTop: '1.5em',
        }}
        onSubmit={handleSubmit(handleSubmitCallback)}
      >
        <div className="container">
          <Input
            type="text"
            name="name"
            label="Name"
            ref={register({
              required: {
                value: true,
                message: 'Customer name is required',
              },
            })}
            error={errors.name}
            style={{ margin: '0 auto' }}
          />
          {tab === 'New' && (
            <Input
              type="tel"
              name="phone"
              label="Phone Number"
              ref={register({
                required: {
                  value: true,
                  message: 'Phone Number is required',
                },

                min: {
                  value: 10,
                  message: 'Invalid Phone Number',
                },
              })}
              error={errors.phone}
              style={{ margin: '0 auto' }}
            />
          )}
          {tab === 'New' && (
            <Input
              type="text"
              name="address"
              label="Address"
              style={{ margin: '0 auto' }}
              ref={register({
                required: {
                  value: true,
                  message: 'Customer address is required',
                },
              })}
              error={errors.address}
            />
          )}
          {tab === 'New' && (
            <Checkbox
              label="Save this customer for next time"
              style={{ margin: '0 0 1em' }}
            />
          )}

          <div style={{ margin: '1em 0 0' }}>
            <section style={{ width: '60%', display: 'inline-block' }}>
              <ComboBox items={items} onChange={changeCurrentFood} />
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
                style={{ margin: '0 auto' }}
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

export default CreateOrder;
