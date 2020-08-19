import React from 'react';
import classNames from 'classnames';
import { v4 as uuid } from 'uuid';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import Button from '../Button/Button';
import Typography from '../Typography/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import { FiUser as UserIcon } from 'react-icons/fi';
import Dialog from '@material-ui/core/Dialog';
import styles from './Order.module.scss';
import moment from 'moment';
const Order = ({ order }) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(!open);
  };

  const handleClose = React.useCallback(() => {
    setOpen(!open);
    console.log(open);
  });
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
          <Typography  variant="gray">
            {moment(order.accepted_at).format('MMMM Do YYYY, h:mm:ss a')}
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
          <Table
            style={{
              backgroundColor: '#fff',
            }}
          >
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography inline>Quantity</Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography inline>Food</Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography inline>Price</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!_.isEmpty(order.FoodItems) &&
                order.FoodItems.map((item, i) => (
                  <TableRow key={'food' + i}>
                    <TableCell>
                      {' '}
                      <Typography inline>{item.quantity}</Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography inline>{item.name}</Typography>
                    </TableCell>

                    <TableCell align="right">
                      <Typography inline>{item.price}</Typography>
                    </TableCell>
                  </TableRow>
                ))}
              {!_.isEmpty(order.Meals) &&
                order.Meals.map((item, i) => (
                  <TableRow key={'food' + i}>
                    <TableCell>
                      {' '}
                      <Typography inline>{item.quantity}</Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography inline>{item.name}</Typography>
                    </TableCell>

                    <TableCell align="right">
                      <Typography inline>{item.price}</Typography>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
          <section
            style={{
              margin: '10px',
              justifyContent: 'space-between',
              display: 'grid',
              gridTemplateColumns: '15% auto',
              gridRowGap: '10px',
            }}
          >
            <Typography small bold>
              Customer
            </Typography>

            <Typography
              variant="gray"
              inline
              style={{
                marginLeft: '1em',
              }}
            >
              {order.VendorCustomer.full_name}
            </Typography>

            <Typography bold small>
              Total
            </Typography>

            <Typography
              variant="gray"
              inline
              style={{
                marginLeft: '1em',
              }}
            >
              NGN {order.total_order_price || 0.0}
            </Typography>

            <Typography bold small>
              Delivery Address
            </Typography>
            <Typography
              variant="gray"
              inline
              style={{
                marginLeft: '1em',
              }}
            >
              Most alerts don't need titles. They summarize a decision in a
              sentence or two by eithe
            </Typography>

            <Typography bold small>
              Status
            </Typography>
            <span className={classes}>{status}</span>
          </section>

          <Button
            color="clear"
            full
            style={{
              textAlign: 'right',
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
