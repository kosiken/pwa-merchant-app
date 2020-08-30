import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import {
  Loader,
  Order,
  Typography,
  Button,
  ErrorComponent,
} from '../components';

import api from '../api';
import { FiLayers, FiUsers, FiClipboard } from 'react-icons/fi';

import { Avatar } from '@material-ui/core';

const Dashboard = () => {
  let [isLoading, setLoading] = useState(true);
  const dispatch = useDispatch();
  let [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [orders, setOrders] = useState([]);
  const { customers, foods } = useSelector((state) => {
    return {
      token: state.auth.token,
      customers: state.customer.customers || [],

      foods: state.food.foods.concat(state.food.meals) || [],
    };
  });

  const init = () => {
    setError(false);
    (async () => {
      try {
        let __orders = await api.getOrders();
        setOrders(__orders.reverse());
        let _customers;
        let meals;
        if (!foods.length) {
          meals = await api.getMeals();
          if (meals.length)
            meals = meals.map((m) => {
              return {
                ...m,
                type: 'meal',
              };
            });

          let _foods = await api.getFoods();
          dispatch({ type: 'GET_FOODS', foods: _foods.concat(meals) });
        }
        if (!customers.length) {
          _customers = await api.getCustomers();
          dispatch({
            type: 'GET_CUSTOMERS',
            customers: _customers,
          });
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
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
      <Container>
        <Row
          style={{
            margin: '1em 0 0',
          }}
        >
          <Col md={4} xs={12} className="p-3 mb-3 shadowf bg-light ">
            <div className="flex-row">
              <section>
                <Avatar
                  className="mb-3"
                  style={{
                    backgroundColor: 'rgb(255, 220, 74)',
                  }}
                >
                  <FiLayers />
                </Avatar>
              </section>

              <section>
                <Typography title>Orders</Typography>

                <Typography small>
                  You have
                  {' ' +
                    orders.length.toString() +
                    ' ' +
                    (orders.length > 0 ? 'orders' : 'order')}
                </Typography>
              </section>
            </div>
            <Link to="/orders">
              <Button color="clear">View Orders</Button>
            </Link>
          </Col>

          <Col md={4} xs={12} className="p-3 mb-3 shadowf bg-light ">
            <div className="flex-row">
              <section>
                <Avatar
                  className="mb-3"
                  style={{
                    backgroundColor: '#f7a171',
                  }}
                >
                  <FiClipboard />
                </Avatar>
              </section>

              <section>
                <Typography title>Food Items</Typography>

                <Typography small>
                  You have
                  {' ' +
                    foods.length.toString() +
                    ' ' +
                    (foods.length >= 0 ? 'food items' : 'food item')}
                </Typography>
              </section>
            </div>
            <Link to="/FoodItems">
              <Button color="clear">View Food Items</Button>
            </Link>
          </Col>

          <Col md={4} xs={12} className="p-3 mb-3 shadowf bg-light">
            <div className="flex-row">
              <section>
                <Avatar
                  className="mb-3"
                  style={{
                    backgroundColor: 'red',
                  }}
                >
                  <FiUsers />
                </Avatar>
              </section>

              <section>
                <Typography title>Saved Customers</Typography>

                <Typography small>
                  You have
                  {' ' +
                    customers.length.toString() +
                    ' ' +
                    (customers.length >= 0
                      ? 'saved customers'
                      : 'saved customer')}
                </Typography>
              </section>
            </div>{' '}
            <Link to="/customers">
              <Button color="clear">View Saved Customers</Button>
            </Link>
          </Col>
        </Row>

        <Typography title>Recent Orders</Typography>
        {error && (
          <ErrorComponent message={errorMessage}>
            <Button onClick={init}> Retry </Button>
          </ErrorComponent>
        )}
        {isLoading && <Loader />}

        {orders

          .filter((v) => v.status === 'Created')
          .map((order, i) => (
            <Order key={'order' + i} order={order} />
          ))}
        <Link to="/create-order">
          <Button
            color="clear"
            style={{
              float: 'left',
            }}
          >
            Create Order
          </Button>
        </Link>
        <Link to="/orders">
          <Button
            color="clear"
            style={{
              float: 'right',
            }}
          >
            view more
          </Button>
        </Link>
      </Container>
    </div>
  );
};

export default Dashboard;
