import React, { useState, useEffect } from 'react';
import { Order, TopBar, Typography } from '../components';
import _ from 'lodash';
import api from '../api';
import { v4 as uuid } from 'uuid';

const OrderPage = () => {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        let __orders = await api.getOrders();
        setOrders(__orders.reverse());
        // dispatch({ type: 'GET_CUSTOMERS', __customers });
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <div style={{ minHeight: '100vh' }}>
      <TopBar title="Orders" />
      <div className="orders">
        <Typography title>Available</Typography>
        {!_.isEmpty(orders) &&
          orders.map(
            (order) =>
              order.status !== 'Delivered' && (
                <Order key={uuid()} order={order} />
              )
          )}

        <Typography title>Delivered</Typography>
        {!_.isEmpty(orders) &&
          orders.map(
            (order) =>
              order.status === 'Delivered' && (
                <Order key={uuid()} order={order} />
              )
          )}

        <Typography title>Canceled</Typography>
        {!_.isEmpty(orders) &&
          orders.map(
            (order) =>
              order.status === 'Canceled' && (
                <Order key={uuid()} order={order} />
              )
          )}
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
    </div>
  );
};

export default OrderPage;
