import React from 'react';
import classNames from 'classnames';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import Button from '../Button/Button';
import Typography from '../Typography/Typography';

import { Table } from 'react-bootstrap';
import Dialog from '@material-ui/core/Dialog';
import styles from './Order.module.scss';
import moment from 'moment';
const Order = ({ order }) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(!open);
  };

  const handleClose = () => {
    setOpen(!open);
    console.log(open);
  };
  const status = order.status || 'Processing';
  const classes = classNames(styles.status, styles[status.toLocaleLowerCase()]);

  return (
    <Link to="#" onClick={handleClickOpen}>
      <div className={[styles['order-item']]}>
        <section className={styles['customer-info']}>
          <Typography
            style={{
              fontWeight: '600',
              margin: '5px 0',
            }}
          >
            {order.VendorCustomer.full_name}
          </Typography>
          <Typography variant="gray">
            {moment(order.accepted_at).format('MMMM Do YYYY, h:mm a')}
          </Typography>
        </section>
        <div>
          <span className={classes}>{status}</span>
        </div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <Table striped responsive>
            <thead>
              <tr>
                <th>
                  <Typography inline>Quantity</Typography>
                </th>
                <th>
                  <Typography inline>Food</Typography>
                </th>
                <th>
                  <Typography inline>Price</Typography>
                </th>
              </tr>
            </thead>
            <tbody>
              {!_.isEmpty(order.FoodItems) &&
                order.FoodItems.map((item, i) => (
                  <tr key={'food' + i}>
                    <td>
                      {' '}
                      <Typography inline>{item.OrderFoods.quantity}</Typography>
                    </td>
                    <td>
                      <Typography inline>{item.name}</Typography>
                    </td>

                    <td>
                      <Typography inline>{item.price}</Typography>
                    </td>
                  </tr>
                ))}
              {!_.isEmpty(order.Meals) &&
                order.Meals.map((item, i) => (
                  <tr key={'food' + i}>
                    <td>
                      {' '}
                      <Typography inline>{item.quantity}</Typography>
                    </td>
                    <td>
                      <Typography inline>{item.name}</Typography>
                    </td>

                    <td>
                      <Typography inline>{item.price}</Typography>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
          <section className={styles['order-section']}>
            <Typography small bold>
              Customer
            </Typography>

            <Typography
              variant="gray"
              inline
              style={{ display: 'block', margin: '5px 0 5px 1em' }}
            >
              {order.VendorCustomer.full_name}
            </Typography>

            <Typography bold small>
              Total
            </Typography>

            <Typography
              variant="gray"
              inline
              style={{ display: 'block', margin: '5px 0 5px 1em' }}
            >
              NGN {order.total_order_price || 0.0}
            </Typography>

            <Typography bold small>
              Delivery Address
            </Typography>
            <Typography
              variant="gray"
              inline
              style={{ display: 'block', margin: '5px 0 5px 1em' }}
            >
              {order.Address.full_address || ` No Address`}
            </Typography>

            <Typography bold small>
              Status
            </Typography>
            <span
              style={{ display: 'block', margin: '5px 0 0' }}
              className={classes}
            >
              {status}
            </span>
          </section>

          <Button
            color="clear"
            full
            style={{
              textAlign: 'left',
              padding: '10px',
            }}
          >
            Close
          </Button>
        </Dialog>
      </div>
    </Link>
  );
};

export default Order;
