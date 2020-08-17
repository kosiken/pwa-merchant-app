import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';

import {
  SwitchBox,
  Input,
  Button,
  IconButton,
  Checkbox,
  Typography,
  Toast,
} from '../components';
import { FiFileText as PaperIcon } from 'react-icons/fi';

const Orders = () => {
  const statuses = [
    'Processing',
    'Submitted',
    'Accepted',
    'Created',
    'Delivered',
    'Cancelled',
  ];

  let [current, setCurrent] = useState('');
  return (
    <div>
      <Toast
        color="info"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography inline>This is where all orders are shown</Typography>
        <Link to="/create-order">
          <Button color="clear"> Create Order</Button>
        </Link>
      </Toast>
      {/*<Button           style={{
             position: 'absolute',
             right: '0'
            }}>Create Order</Button> */}
      <div className="container">
        <div className="filters">
          {statuses.map((status, i) => (
            <Typography
              style={{
                color: current === status ? '#f0324b' : '#888',
                cursor: 'pointer',
              }}
              inline
              key={'filter' + i}
              onClick={() => {
                setCurrent(status);
              }}
            >
              {status}
            </Typography>
          ))}
        </div>

        <div className="orders-list">
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
            No Orders Found
          </Typography>
        </div>
      </div>{' '}
    </div>
  );
};

export default Orders;
