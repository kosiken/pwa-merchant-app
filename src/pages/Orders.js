import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';
import { isEmpty } from 'lodash';
import { Table } from 'react-bootstrap';
import {
  Button,
  Typography,
  Toast,
  Order,
  ErrorComponent,
} from '../components';
import { Container } from 'react-bootstrap';
import { FiFileText as PaperIcon } from 'react-icons/fi';

const Orders = () => {
  const statuses = [
    'All',
    'Processing',
    'Submitted',
    'Accepted',
    'Created',
    'Delivered',
    'Cancelled',
  ];
  // eslint-disable-next-line no-unused-vars
  let [isLoading, setLoading] = useState(true);
  let [current, setCurrent] = useState('All');
  let [orders, setOrders] = useState([]);
  let [items, setItems] = useState([]);
  let [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const init = () => {
    setLoading(true);
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
    if (current === 'All') setItems(orders);
    else if (current)
      setItems(orders.filter((order) => order.status === current));
    else console.log('Unknown status');
  }, [current, orders]);

  return (
    <div className="mt-4">
      <Container>
        {' '}
        <Toast
          color="primary"
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <Link to="/home">
            <Button color="clear"> Create Delivery Request</Button>
          </Link>
        </Toast>
      </Container>
      <div className="container">
        <div className="filters">
          {statuses.map((status, i) => (
            <Typography
              style={{
                color: current === status ? '#f0324b' : '#888',
                cursor: 'pointer',
                padding: '0 0 2px',
                borderBottom: current === status ? '2px solid #f0324b' : 'none',
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
        </div>
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
            <Table responsive borderless hover>
              <thead>
                <tr>
                  <th>Customer</th>

                  <th>Total</th>
                  <th>Status</th>
                  <th>View</th>
                </tr>
              </thead>
              <tbody>
                {isLoading &&
                  [1, 2, 3].map((order) => (
                    <Order loader key={'loader' + order} />
                  ))}

                {items.map((order, i) => (
                  <Order key={'order' + i} order={order} />
                ))}
              </tbody>{' '}
            </Table>
            {error && (
              <ErrorComponent message={errorMessage}>
                <Button onClick={init}> Retry </Button>
              </ErrorComponent>
            )}
            {!error && !isLoading && isEmpty(items) && (
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
                  No Delivery Requests Found
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
