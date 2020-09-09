import React from 'react';
import classNames from 'classnames';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import moment from 'moment';
import Typography from '../Typography/Typography';
import Button from '../Button/Button';
import styles from './Order.module.scss';
// const Statuses = [
//   'Created',
//   'Processing',
//   'Accepted',
//   'Submitted',

//   'Shipped',
//   'Delivered',
//   'Cancelled',
// ];
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
        {' '}
        <div>
          <div>
            <Typography title>Food Items</Typography>
            <ul className={styles['order-list']}>
              {order.FoodItems.map((food) => {
                if (!food) return false;
                return (
                  <li
                    key={'food' + food.id}
                    className={styles['order-list-item']}
                  >
                    <div className={styles['order-list-item-quantity']}>
                      <Typography inline>
                        {food.OrderFoods.quantity + 'x'}
                      </Typography>
                    </div>
                    <div
                      className={styles['order-list-item-name']}
                      style={{
                        minWidth: '160px',
                      }}
                    >
                      <Typography inline> {food.name}</Typography>
                    </div>
                    <div className={styles['order-list-item-price']}>
                      <Typography inline variant="info">
                        {' '}
                        {food.price}
                      </Typography>
                    </div>
                  </li>
                );
              })}
            </ul>
            <div className={'flex  mt-4'}>
              <Typography className="m-0" bold>
                Total
              </Typography>{' '}
              <section className={styles['order-section']}>
                <Typography variant="secondary" title bold>
                  {order.total_order_price || 0.0}
                </Typography>
              </section>
            </div>{' '}
            <hr />
            <Typography title className="mb-2">
              Order Details
            </Typography>
            <Typography variant="success" bold>
              Customer Name
            </Typography>
            <Typography>{order.VendorCustomer.full_name}</Typography>
          </div>
          <div>
            <Typography variant="success" bold>
              Accepted at
            </Typography>

            <Typography>
              {moment(order.accepted_at).format('MMMM Do YYYY, h:mm a')}
            </Typography>
          </div>
          <div>
            <Typography variant="success" bold>
              Delivery Address
            </Typography>

            <Typography>{order.Address.full_address}</Typography>
          </div>
          <Typography variant="success" bold>
            {' '}
            Status{' '}
          </Typography>
          <span
            className={classes + ' mb-4'}
            style={{
              display: 'block',
            }}
          >
            {status}
          </span>
          <hr />
          <Button
            color="clear"
            style={{
              float: 'right',
            }}
          >
            Edit
          </Button>
          <br /> <br />
          <Button full>Delete</Button> <br />
        </div>
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
