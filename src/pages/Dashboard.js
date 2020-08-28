import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { Loader, Order, Typography, Button, Toast } from '../components';

import api from '../api';
import { FiLayers, FiUsers, FiClipboard } from 'react-icons/fi';

import { Avatar } from '@material-ui/core';

const Dashboard = () => {
  let [isLoading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const [orders, setOrders] = useState([]);
  const { customers, foods } = useSelector((state) => {
    return {
      token: state.auth.token,
      customers: state.customer.customers || [],

      foods: state.food.foods || [],
    };
  });
  useEffect(() => {
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
        console.log(error);
        setLoading(false);
      }
    })(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={{ minHeight: '100vh' }}>
      <Toast color="info">
        <Typography className="mb-2">
          I couldn't think of welcome message. The server program uses event
          driven programming model in its operation. Server events are triggered
          by requests from the microcontroller and the client applications
        </Typography>

        <div
          style={{
            textAlign: 'right',
          }}
        >
          <Link to="/faq">
            <Button color="clear"> More Info</Button>
          </Link>
        </div>
      </Toast>

      <Container>
        <hr />
        <Row
          style={{
            margin: '1em 0 0',
            justifyContent: 'space-between',
          }}
        >
          <Col md={6} lg={3} xs={12} className="p-3 mb-4 shadowf ">
            <div className="flex-row">
              <section>
                <Avatar
                  style={{
                    backgroundColor: 'rgb(255, 220, 74)',
                  }}
                >
                  <FiLayers />
                </Avatar>
              </section>

              <section>
                <Typography title>Orders</Typography>

                <Typography>
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

          <Col md={6} lg={3} xs={12} className="p-3 mb-4 shadowf ">
            <div className="flex-row">
              <section>
                <Avatar
                  style={{
                    backgroundColor: '#f7a171',
                  }}
                >
                  <FiClipboard />
                </Avatar>
              </section>

              <section>
                <Typography title>Food Items</Typography>

                <Typography>
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

          <Col md={6} lg={3} xs={12} className="p-3 mb-4 shadowf ">
            <div className="flex-row">
              <section>
                <Avatar
                  style={{
                    backgroundColor: 'red',
                  }}
                >
                  <FiUsers />
                </Avatar>
              </section>

              <section>
                <Typography title>Saved Customers</Typography>

                <Typography>
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

        <hr />

        <Typography title>Recent Orders</Typography>

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
