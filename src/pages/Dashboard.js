import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';
import { Table, Container } from 'react-bootstrap';
import { Order, Typography, Button, ErrorComponent } from '../components';
import moment from 'moment';
import { Calender } from '../components';
import api from '../api';
import { isEmpty } from 'lodash';
import { FiFileText as PaperIcon } from 'react-icons/fi';

const Dashboard = () => {
  let [isLoading, setLoading] = useState(true);
  let [currentDate, setCurrentDate] = useState({ month: 0, date: 0 });
  let [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [orders, setOrders] = useState([]);
  let [items, setItems] = useState([]);
  const init = () => {
    setError(false);
    (async () => {
      try {
        let __orders = await api.getOrders();
        setOrders(__orders.reverse());
        setItems(
          __orders.filter((v) => {
            let m = moment(v.createdAt);
            return (
              m.date() === currentDate.date && m.month() === currentDate.month
            );
          })
        );

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
  useEffect(() => {
    setItems(
      orders.filter((v) => {
        let m = moment(v.createdAt);
        return m.date() === currentDate.date && m.month() === currentDate.month;
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentDate]);
  return (
    <div style={{ minHeight: '100vh' }}>
      <Container>
        <div className="flex center mt-4 mb-4">
          <Typography
            title
            style={{
              flexGrow: 1,
            }}
          >
            Recent Delivery Requests
          </Typography>

          <Link to="/create-delivery-request">
            <Button color="clear"> Create Delivery Request</Button>
          </Link>
        </div>{' '}
        <Calender onChange={setCurrentDate} />
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
              [1, 2, 3].map((order) => <Order loader key={'loader' + order} />)}

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
              {'No Orders Found for this date'}
            </Typography>
          </>
        )}
      </Container>
    </div>
  );
};

export default Dashboard;
