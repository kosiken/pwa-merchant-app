import React from 'react';
import classNames from 'classnames';
import { v4 as uuid } from 'uuid';
import _ from 'lodash';
import Typography from '../Typography/Typography';
import Avatar from '@material-ui/core/Avatar';
import { FiUser as UserIcon } from 'react-icons/fi';
import styles from './Order.module.scss';
const Order = ({ order }) => {
  const statuses = [
    'Processing',
    'Submitted',
    'Accepted',
    'Created',
    'Delivered',
    'Cancelled',
  ];
  const status = order.status || 'Processing';
  const classes = classNames(styles.status, styles[status.toLocaleLowerCase()]);

  return (
    <div className={[styles['order-item']]}>
      <div className={styles['header']}>
        <Avatar >
          <UserIcon />
        </Avatar>
        <section className={styles['customer-info']}>
          <Typography
            style={{
              fontWeight: '600',
              marginLeft: '1em',
            }}
          >
            {order.VendorCustomer.full_name}
          </Typography>
        </section>
      </div>

      <ul
        style={{
          margin: '0',
        }}
      >
        {!_.isEmpty(order.FoodItems) &&
          order.FoodItems.map((item) => (
            <li key={uuid()}>{`${item.quantity || 1} x ${item.name}`}</li>
          ))}
        {!_.isEmpty(order.Meals) &&
          order.Meals.map((item) => (
            <li key={uuid()}>{`${item.quantity || 1} x ${item.name}`}</li>
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
        <Typography inline>
          Total - NGN{order.total_order_price || 0.0}
        </Typography>
      </section>
    </div>
  );
};

export default Order;
