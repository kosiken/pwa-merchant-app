import React from 'react';
import classNames from 'classnames';

import { Link } from 'react-router-dom';

import Typography from '../Typography/Typography';

import styles from './Order.module.scss';

const Order = ({ order, loader }) => {
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
