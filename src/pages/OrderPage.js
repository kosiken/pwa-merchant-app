import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import LinearProgress from '@material-ui/core/LinearProgress';

import Paper from '@material-ui/core/Paper';

import { useSelector } from 'react-redux';
import { Row, Col, Container, Image } from 'react-bootstrap';
import io from 'socket.io-client';

import {
  Button,
  Typography,
  Toast,
  Loader,
  Order,
  ErrorComponent,
} from '../components';

import api from '../api';
import rider from '../assets/rider.svg';

const OrderPage = () => {
  const { id } = useParams();
  const token = useSelector((state) => state.auth.token);
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
      return resp[0];
    } catch (error) {
      setError(true);
      setLoading(false);
      setErrorMessage(error.data.error);
    }
  };
  useEffect(() => {
    init().then((resp) => {
      const socket = io.connect('https://api.500chow.com', {
        query: { token },
      });
      socket.on('connect', function () {
        console.log(resp);
      });
    });
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
        <Link to="/home">
          <Button color="clear"> Create</Button>
        </Link>
      </Toast>
    );
  }
  return (
    <div>
      <Row>
        <Col md={6} sm={12}>
          <Toast
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography
              inline
            >{`Delivery Request from ${order.VendorCustomer.full_name}`}</Typography>
            <Link to="/home">
              <Button color="clear"> Home</Button>
            </Link>
          </Toast>
          <Order order={order} page />
        </Col>

        <Col
          md={6}
          sm={12}
          style={{
            backgroundColor: '#f7f7f7',
            height: '90vh',
          }}
        >
          <Container id="track">
            {!order.Driver && (
              <div>
                {' '}
                <div
                  className="mb-3 t-center"
                  style={{
                    marginTop: '20vh',
                  }}
                >
                  <Image
                    src={rider}
                    style={{
                      width: '100px',
                    }}
                  />
                </div>
                <Typography title className="t-center">
                  No Rider Found{' '}
                </Typography>
                <Typography className="t-center">
                  No rider was found that was attached to this request{' '}
                </Typography>
              </div>
            )}
            {order.Driver && (
              <div className="mt-3 mb-3 t-center">
                <Paper className="pb-3">
                  <LinearProgress />
                  <br /> <br />
                  <Typography className="t-center">
                    Finding location{' '}
                  </Typography>
                  <Button>Cancel</Button>
                </Paper>
              </div>
            )}
          </Container>
        </Col>
      </Row>
    </div>
  );
};

export default OrderPage;
