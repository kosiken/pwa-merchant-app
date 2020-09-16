import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  Button,
  Typography,
  Toast,
  Loader,
  Order,
  ErrorComponent,
} from '../components';

import api from '../api';

const OrderPage = () => {
  const { id } = useParams();
  const [order, setOrder] = useState({});
  let [error, setError] = useState(false);
  let [isLoading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const init = async () => {
    setLoading(true);
    setError(false);
    try {
      let resp = await api.getOrder(id);
      setOrder(resp[0]);
      setLoading(false);
    } catch (error) {
      setError(true);
      setLoading(false);
      setErrorMessage(error.data.error);
    }
  };
  useEffect(() => {
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) return <Loader />;
  if (error) {
    return (
      <ErrorComponent message={errorMessage}>
        <Button onClick={init}> Retry </Button>
      </ErrorComponent>
    );
  }
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
        <Typography inline>No Such Delivery Request exists</Typography>
        <Link to="/create-delivery-request">
          <Button color="clear"> Create</Button>
        </Link>
      </Toast>
    );
  }
  return <Order order={order} page />;
};

export default OrderPage;
