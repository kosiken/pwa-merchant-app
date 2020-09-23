import React, { useState, useEffect } from 'react';

import { isEmpty } from 'lodash';
import { useSelector, useDispatch } from 'react-redux';
import { Input, Typography, Button } from '../components';
import { Container, Alert } from 'react-bootstrap';
import api from '../api';
import { FiCreditCard as CreditCardIcon } from 'react-icons/fi';
import { useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack';

const FundWallet = () => {
  let [loading, setLoading] = useState(true);
  const { enqueueSnackbar } = useSnackbar();
  let [loading2, setLoading2] = useState(false);
  let [error, setError] = useState(false);
  const { register, handleSubmit, errors } = useForm();
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch();
  const { cards } = useSelector((state) => {
    return {
      cards: state.card.cards || [],
    };
  });
  function handleOpen(m) {
    enqueueSnackbar(m);
  }

  const init = () => {
    setError(false);
    (async () => {
      try {
        if (isEmpty(cards)) {
          let __cards = await api.getCards();
          dispatch({
            type: 'GET_CARDS',
            cards: __cards,
          });
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
        if (!error.data) {
          console.error(error);
          return;
        }
        setErrorMessage(error.data.error);
        setError(true);
      }
    })();
  };

  const submit = (formData) => {
    if (formData.card_id === '0') {
      handleOpen('No card selected');
      return;
    }

    setLoading2(true);
    api
      .fundWallet(formData)
      .then((resp) => {
        console.log(resp);

        handleOpen('transaction successfull');
        window.location.pathname = '/profile';
      })
      .catch((err) => {
        handleOpen(err.data.error);
        setLoading(false);
      });
  };

  useEffect(() => {
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="mt-3">
      {' '}
      {loading && <Loader />}
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
      <Container
        style={{
          maxWidth: '500px',
        }}
      >
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

        {!isEmpty(cards) && (
          <form className="f-form" onSubmit={handleSubmit(submit)} id="f-main">
            <Input
              select
              name="card_id"
              label="Select Card"
              style={{ margin: '0 auto' }}
              ref={register({
                required: {
                  value: true,
                  message: 'Price is required',
                },
              })}
              error={errors.price}
              options={[
                {
                  value: 0,
                  text: 'No card selected',
                },
                ...cards.map((card) => {
                  return {
                    value: card.id,
                    text: '**** **** **** ' + card.last4,
                  };
                }),
              ]}
            />
            <Input
              type="text"
              name="amount"
              label="Amount"
              style={{ margin: '0 auto' }}
              ref={register({
                required: {
                  value: true,
                  message: 'Amount is required',
                },
                pattern: {
                  value: /^[+-]?([0-9]*[.])?[0-9]+$/,
                  message: 'Invalid Amount',
                },
              })}
              error={errors.amount}
            />

            <Button loading={loading2} full>
              Confirm
            </Button>
          </form>
        )}
      </Container>
    </div>
  );
};

export default FundWallet;
