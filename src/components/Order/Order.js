import React from 'react';
import classNames from 'classnames';
import { v4 as uuid } from 'uuid';
import Typography from '../Typography/Typography';

import { FiUser as UserIcon } from 'react-icons/fi';
import styles from './Order.module.scss';
const Order = ({ order }) => {
  const statuses = [
    'Processing',
    'Submitted',
    'Accepted',
    'Shipped',
    'Delivered',
    'Cancelled',
  ];
  const status = statuses[order.status];
  const classes = classNames(styles.status, styles[status.toLocaleLowerCase()]);
  return (
    <div className={[styles['order-item']]}>
      <div className={styles['header']}>
        <span style={{ fontSize: '2em' }}>
          <UserIcon />
        </span>
        <section className={styles['customer-info']}>
          <Typography
            style={{
              fontWeight: '600',
              marginLeft: '1em',
            }}
          >
            {order.customer.name}
          </Typography>
        </section>
      </div>

      <ul>
        {order.items.map((item) => (
          <li key={uuid()}>{`${item.count} x ${item.food}`}</li>
        ))}
      </ul>
      <section
        className="flex"
        style={{
          margin: '10px',
          justifyContent: 'space-between',
        }}
      >
        <span className={classes}>{status}</span>
        <Typography inline>Total - {order.total_order_price}</Typography>
      </section>
    </div>
  );
};

export default Order;
