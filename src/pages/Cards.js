import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { isEmpty } from 'lodash';
import { Typography, Button, Toast, Loader } from '../components';
import { Container, Alert } from 'react-bootstrap';
import api from '../api';
import { FiCreditCard as CreditCardIcon } from 'react-icons/fi';

const Cards = () => {
  let [loading, setLoading] = useState(true);
  let [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [cards, setCards] = useState([]);
  const init = () => {
    setError(false);
    (async () => {
      try {
        let __cards = await api.getCards();
        setCards(__cards);

        setLoading(false);
      } catch (error) {
        setLoading(false);
        setErrorMessage(error.data.error);
        setError(true);
      }
    })();
  };
  useEffect(() => {
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="mt-4">
      <Alert
        variant="danger"
        show={error}
        className="m-0"
        onClose={() => setError(false)}
        dismissible
      >
        <Alert.Heading>
          <Typography inline>Oh snap! You got an error! </Typography>
        </Alert.Heading>
        <Typography>{errorMessage}</Typography>
      </Alert>{' '}
      <Container>
        <Toast
          color="primary"
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <Link to="/add-card">
            <Button color="clear"> Add Card</Button>
          </Link>
        </Toast>{' '}
        {loading && <Loader />}{' '}
        {!error && !loading && isEmpty(cards) && (
          <>
            <Typography
              title
              style={{
                textAlign: 'center',
                fontSize: '4em',
                color: 'rgb(136, 136, 136)',
                marginTop: '20vh',
              }}
            >
              <CreditCardIcon />
            </Typography>
            <Typography
              style={{
                textAlign: 'center',
              }}
            >
              No Cards Found
            </Typography>
          </>
        )}
      </Container>
    </div>
  );
};

export default Cards;
