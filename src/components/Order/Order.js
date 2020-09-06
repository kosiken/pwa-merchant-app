import React from 'react';
import classNames from 'classnames';
import { Table, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import moment from 'moment';
import Typography from '../Typography/Typography';

import styles from './Order.module.scss';

const Order = ({ order, loader, page }) => {
  if (loader) {
    return (
      <tr style={{ borderTop: '1px solid #e5e5e5' }}>
        <td>
          {' '}
          <div
            className="placeload-background"
            style={{ minWidth: '90px', width: '80%', marginBottom: '1rem' }}
          ></div>
        </td>
        <td>
          {' '}
          <div
            className="placeload-background"
            style={{ minWidth: '50px', width: '40%', marginBottom: '1rem' }}
          ></div>
        </td>
        <td>
          {' '}
          <div
            className="placeload-background"
            style={{ minWidth: '60px', width: '40%', marginBottom: '1rem' }}
          ></div>
        </td>
        <td>
          {' '}
          <div
            className="placeload-background"
            style={{ minWidth: '30px', width: '30%', marginBottom: '1rem' }}
          ></div>
        </td>
      </tr>
    );
  }

  const status = order.status || 'Processing';
  const classes = classNames(styles.status, styles[status.toLocaleLowerCase()]);
  if (page)
    return (
      <Container
        className="mt-2"
        style={{
          maxWidth: '600px',
        }}
      >
        <Typography className="m-0" bold>
          Customer Name
        </Typography>
        <Typography variant="gray">{order.VendorCustomer.full_name}</Typography>
        <Typography className="m-0" bold>
          Accepted at
        </Typography>
        <Typography variant="gray">
          {moment(order.accepted_at).format('MMMM Do YYYY, h:mm a')}
        </Typography>
        <Typography className="m-0" bold>
          Delivery Address
        </Typography>
        <Typography variant="gray">{order.Address.full_address}</Typography>
        <Typography className="m-0" bold>
          Total
        </Typography>{' '}
        <Typography variant="gray">{order.total_order_price || 0.0}</Typography>
        <Typography bold className="m-0">
          {' '}
          Status{' '}
        </Typography>
        <span
          className={classes + ' mb-2'}
          style={{
            display: 'block',
          }}
        >
          {status}
        </span>
        <Typography title>Food Items</Typography>
        <Table striped responsive>
          <thead>
            <tr>
              <th>Quantity</th>
              <th>Order Name</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {order.FoodItems.map((food) => {
              if (!food) return false;
              return (
                <tr key={'food' + food.id}>
                  <td>{food.OrderFoods.quantity}</td>
                  <td
                    style={{
                      minWidth: '160px',
                    }}
                  >
                    {food.name}
                  </td>
                  <td>{food.price}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Container>
    );
  return (
    <tr style={{ borderTop: '1px solid #e5e5e5' }}>
      <td>
        <Typography>{order.VendorCustomer.full_name}</Typography>
      </td>
      {/*<td>
          <Typography variant="gray">
            {moment(order.accepted_at).format('MMMM Do YYYY, h:mm a')}
          </Typography>
        </td> 
        */}
      <td>
        <Typography variant="gray" inline>
          {order.total_order_price || 0.0}
        </Typography>
      </td>
      <td>
        <span className={classes}>{status}</span>
      </td>
      <td>
        <Link to={'/order/' + order.id}>
          <Typography
            style={{
              color: '#5d97c6',
            }}
          >
            More
          </Typography>
        </Link>
      </td>
    </tr>
  );
};

export default Order;
