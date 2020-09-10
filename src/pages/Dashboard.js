import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';
import { Table, Container } from 'react-bootstrap';
import { Order, Typography, Button, ErrorComponent } from '../components';
// Calender
import { Calender } from '../components';
import api from '../api';

const Dashboard = () => {
  let [isLoading, setLoading] = useState(true);

  let [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [orders, setOrders] = useState([]);

  const init = () => {
    setError(false);
    (async () => {
      try {
        let __orders = await api.getOrders();
        setOrders(__orders.reverse());

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
        <Calender />
        <div style={{ width: '100%', padding: '0 1.5em' }}>
          <div className="flex center">
            <Typography
              title
              style={{
                flexGrow: 1,
              }}
            >
              Recent Orders
            </Typography>

            <Link to="/create-order">
              <Button color="clear"> Create Order</Button>
            </Link>
          </div>
          <Table borderless hover responsive>
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

              {orders
                .filter((v) => v.status === 'Created')
                .map((order, i) => (
                  <Order key={'order' + i} order={order} />
                ))}
            </tbody>{' '}
          </Table>
          {error && (
            <ErrorComponent message={errorMessage}>
              <Button onClick={init}> Retry </Button>
            </ErrorComponent>
          )}
        </div>
      </Container>
    </div>
  );
};

export default Dashboard;
