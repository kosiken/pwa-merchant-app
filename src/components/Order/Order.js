import React from 'react';
import classNames from 'classnames';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import Button from '../Button/Button';
import Typography from '../Typography/Typography';
import { FiEye } from 'react-icons/fi';
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

      <tr style={{borderTop: '1px solid #e5e5e5'}}>
     
        <td>
          <Typography
   
          >
            {order.VendorCustomer.full_name}
          </Typography>
          </td>
          {/*<td>
          <Typography variant="gray">
            {moment(order.accepted_at).format('MMMM Do YYYY, h:mm a')}
          </Typography>
        </td> 
        */}
        <td>
              <Typography
              variant="gray"
              inline
              
            >
             {order.total_order_price || 0.0}
            </Typography>
        </td>
        <td>
          <span className={classes}>{status}</span>
        </td>
          <td >

 <Link to={'/order/'+ order.id}>
<Typography        style={{
              color: '#5d97c6',
          
            }}>
More
</Typography>
 
        </Link>
         </td>
      </tr>

  );
};

export default Order;
