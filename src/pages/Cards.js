import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { isEmpty } from 'lodash';
import { useSelector, useDispatch } from 'react-redux';
import { Typography, Button, Toast, Card } from '../components';
import { Container, Alert } from 'react-bootstrap';
import api from '../api';
import { FiCreditCard as CreditCardIcon } from 'react-icons/fi';
import Paper from '@material-ui/core/Paper';
import { useSnackbar } from 'notistack';

const Cards = () => {
  let [loading, setLoading] = useState(true);
  let [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch();
  const textAreaRef = useRef(null);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [open, setOpen] = useState(false);
  const [key, setKey] = useState('');

  const { cards, user } = useSelector((state) => {
    return {
      cards: state.card.cards || [],
      user: state.auth.user,
    };
  });

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

  function handleOpen(m) {
    setKey(enqueueSnackbar(m));
  }

  const copyAccountNumber = () => {
    textAreaRef.current.select();
    textAreaRef.current.setSelectionRange(0, 99999);
    document.execCommand('copy');

    handleOpen(`${user.account_number} copied`);
  };

  useEffect(() => {
    const handleClose = () => {
      setOpen(false);
      closeSnackbar(key);
    };

    let timeout;
    if (open) {
      timeout = setTimeout(handleClose, 1000);
    }
    return () => {
      if (timeout) clearTimeout(timeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => {
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div
      className="mt-3 pb-2"
      style={{
        position: 'relative',
      }}
    >
      <Typography
        title
        className="mb-1 ml-4"
        style={{
          fontSize: '2em',
          fontWeight: '700',
        }}
      >
        Wallet
      </Typography>
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
      </Alert>
      <Toast
        color="primary"
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
        }}
      ></Toast>
      <div
        className="p-2 mb-3"
        style={{
          textAlign: 'center',
        }}
      >
        <Typography inline> Wallet Balance</Typography>
        <Typography
          title
          style={{
            fontSize: '2em',
            fontWeight: '700',
          }}
        >
          {'NGN' + user.wallet_balance.toFixed(2)}
        </Typography>
      </div>
      <div
        style={{
          textAlign: 'center',
        }}
      >
        {user.account_number && (
          <>
            <Button onClick={copyAccountNumber} color="clear">
              Fund via Bank Transfer [copy]
            </Button>
            <br />
            {user.bank_name}
            <input
              style={{
                borderWidth: 0,
                width: 120,
                backgroundColor: 'white',
                color: 'black',
                textAlign: 'center',
              }}
              contentEditable="false"
              ref={textAreaRef}
              value={`${user.account_number}`}
            />
          </>
        )}
      </div>
      <Container
        style={{
          maxWidth: '500px',
          position: 'relative',
        }}
      >
        <Paper className="p-3" elevation={0}>
          <div
            className="flex"
            style={{ justifyContent: 'space-between', alignItems: 'center' }}
          >
            <Typography inline bold>
              Cards
            </Typography>{' '}
            <Link to="/fund-wallet">
              <Button color="clear"> Fund With Card</Button>
            </Link>
          </div>
          <hr />{' '}
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
          {loading &&
            [1, 2, 3, 4, 5].map((index) => (
              <Card key={'card' + index} loader />
            ))}
          {cards.map((card, i) => (
            <Card card={card} key={'card' + i} />
          ))}
          <div
            style={{
              textAlign: 'center',
            }}
          >
            <Link to="/add-card" className="ml-3">
              <Button color="clear"> Add Card</Button>
            </Link>
          </div>
        </Paper>
      </Container>
    </div>
  );
};

export default Cards;
