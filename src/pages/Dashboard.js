import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';
import { Table } from 'react-bootstrap';
import { Container, Card, Row } from 'react-bootstrap';
import {
  Loader,
  Order,
  Typography,
  Button,
  ErrorComponent,
} from '../components';

import api from '../api';

const Entries = [
  {
    name: 'Customers',
    summary: `You can save customers on 500 dash and easily select them
    whenever you want to create an order`,
    create: '/customers',
    all: '/customers',
  },
  {
    name: 'Food Items',
    summary: `You add food items to 500 dash and make them available to 
    be selected when creating orders`,
    create: '/create-food',
    all: '/FoodItems',
  },
    {
    name: 'Meals',
    summary: `You add food items to 500 dash and make them available to 
    be selected when creating orders`,
    create: '/create-food',
    all: '/FoodItems',
  },
];

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
        <Row   style={{
        gridColumnGap: '1em',
        gridRowGap: '1em',
        marginLeft: '0',
        marginRight: '0',
        marginBottom: '2em'
        }}>
          {Entries.map((entry, index) => {
            return (
              <Card key={'entry' + index} style={{ width: '20rem', margin: '0 auto' }}>
                <Card.Body>
                  <Card.Title>
                    <Typography inline>{entry.name}</Typography>
                  </Card.Title>

                  <Typography>{entry.summary}</Typography>
            
                </Card.Body>
                      <div style={{display: 'flex', justifyContent: 'flex-end', padding: '15px' }}>
                  <Link to={entry.all}>
                    <Button color="clear"> See all</Button>
                  </Link>
                  <Link to={entry.create}>
                    <Button  > Create new</Button>
                  </Link>
                  </div>
              </Card>
            );
          })}
        </Row>
        <div>
                <Link to="/create-order">
          <Button
            color="clear"
            style={{
              float: 'right',
            }}
          >
            Create Order
          </Button>
        </Link>
 
        </div>
         <Typography
          title
   
        >
        Recent Orders
        </Typography>
        <Table borderless hover>
          <thead>
            <tr>
              <th>Customer</th>

              <th>Total</th>
              <th>Status</th>
              <th>View</th>
            </tr>
          </thead>
          <tbody>
      
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
        {isLoading && <Loader />}

      </Container>
    </div>
  );
};

export default Dashboard;
