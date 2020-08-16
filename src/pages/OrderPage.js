import React from 'react';
import { Order, TopBar, Typography } from '../components';
import { v4 as uuid } from 'uuid';

const OrderPage = () => {
  const orders = [
    {
      customer: {
        name: 'Kyle Kuzma',
        phone: '0807890978654',
      },
      items: [
        {
          count: 2,
          food: 'Jollof Rice',
        },
        {
          count: 1,
          food: 'Spaghetti',
        },
      ],
      total_order_price: 1750,
      status: 2,
    },

    {
      customer: {
        name: 'Tobi',
        phone: '0902900988',
      },
      items: [
        {
          count: 2,
          food: 'Jollof Rice',
        },
        {
          count: 1,
          food: 'Spaghetti',
        },
      ],
      total_order_price: 1750,
      status: 5,
    },
  ];

  return (
    <div style={{ minHeight: '100vh' }}>
      <div className="orders">
        {orders.map((order) => (
          <Order key={uuid()} order={order} />
        ))}
        <Typography style={{ textAlign: 'center' }}>
          Made with{' '}
          <span role="img" aria-label="love">
            ❤️{' '}
          </span>
          <span
            style={{
              color: '#f0324b',
            }}
          >
            500Chow
          </span>
        </Typography>
      </div>
    </div>
  );
};

export default OrderPage;
