import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Typography, Toast, Loader, Order } from '../components';

import api from '../api';

const OrderPage = () => {
  const { id } = useParams();
  const [order, setOrder] = useState({});
  let [isLoading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      let resp = await api.getOrder(id);
      setOrder(resp[0]);
      setLoading(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) return <Loader />;
  if (!order) {
    return (
      <Toast
        color="info"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography inline>No Such Order exists</Typography>
        <Link to="/orders">
          <Button color="clear"> Create</Button>
        </Link>
      </Toast>
    );
  }
  return <Order order={order} page />;
};

export default OrderPage;
