import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';
import { isEmpty } from 'lodash';
import {
  Button,
  Typography,
  Toast,
  Order,
  Loader,
  ErrorComponent,
} from '../components';
import { FiFileText as PaperIcon } from 'react-icons/fi';

const Orders = () => {
  const statuses = [
    'Processing',
    'Submitted',
    'Accepted',
    'Created',
    'Delivered',
    'Cancelled',
  ];
  // eslint-disable-next-line no-unused-vars
  let [isLoading, setLoading] = useState(true);
  let [current, setCurrent] = useState('');
  let [orders, setOrders] = useState([]);
  let [items, setItems] = useState([]);
  let [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const init = () => {
    setError(false);
    (async () => {
      try {
        let result = await api.getOrders();

        setOrders(result);
        setItems(result);
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
  }, []);

  useEffect(() => {
    console.log(orders.map((order) => order.status));
    if (current) setItems(orders.filter((order) => order.status === current));
  }, [current, orders]);

  return (
    <div>
      <Toast
        color="info"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography inline>This is where all orders are shown</Typography>
        <Link to="/create-order">
          <Button color="clear"> Create Order</Button>
        </Link>
      </Toast>
      <div className="container">
        <div className="filters">
          {statuses.map((status, i) => (
            <Typography
              style={{
                color: current === status ? '#f0324b' : '#888',
                cursor: 'pointer',
              }}
              inline
              key={'filter' + i}
              onClick={() => {
                setCurrent(status);
              }}
            >
              {status}
            </Typography>
          ))}
        </div>{' '}
      </div>
      <div
        className="container"
        style={{
          padding: '5px 0',
          minHeight: '80vh',
        }}
      >
        {' '}
        <div className="container">
          <div className="orders-list">
            {isLoading && <Loader />}
            {items.map((order, i) => (
              <Order key={'order' + i} order={order} />
            ))}
            {error && (
              <ErrorComponent message={errorMessage}>
                <Button onClick={init}> Retry </Button>
              </ErrorComponent>
            )}
            {!isLoading && isEmpty(items) && (
              <>
                <Typography
                  title
                  style={{
                    textAlign: 'center',
                    fontSize: '4em',
                    color: 'rgb(136, 136, 136)',
                    marginTop: '20vh',
                  }}
                >
                  <PaperIcon />
                </Typography>
                <Typography
                  style={{
                    textAlign: 'center',
                  }}
                >
                  No Orders Found
                </Typography>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
