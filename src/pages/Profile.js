import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Alert } from 'react-bootstrap';
import BeatLoader from 'react-spinners/BeatLoader';
import { Link } from 'react-router-dom';
import { Typography, Button, HtmlTooltip, Toast } from '../components';
import { HelpInfo } from '../constants';

import api from '../api';

const Profile = () => {
  const user = useSelector((state) => state.auth.user);
  let [isLoading, setLoading] = useState(true);
  let [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch();
  const logOut = () => {
    dispatch({
      type: 'LOGOUT_USER',
    });
  };
  const init = () => {
    setError(false);
    (async () => {
      try {
        let user = await api.getMe();
        const defA = {
          full_address: 'No Address',
        };

        user.Address = user.Address ? user.Address : defA;
        dispatch({ user: { Vendor: user }, type: 'SIGNUP_USER' });
        setLoading(false);
      } catch (error) {
        setLoading(false);

        console.log(error);
        if (error.data) setErrorMessage(error.data.error);
        setError(true);
      }
    })();
  };
  useEffect(() => {
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
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
      <Container
        className="mt-4"
        style={{
          maxWidth: '500px',
        }}
      >
        <div
          className="flex central"
          style={{
            minHeight: '85vh',
          }}
        >
          {' '}
          <div
            className="p-2"
            style={{
              textAlign: 'center',
            }}
          >
            <Typography
              title
              className="mb-2"
              style={{
                fontSize: '32px',
                fontWeight: '700',
              }}
            >
              {' '}
              {user.name}
            </Typography>
            <Typography className="mb-1" variant="gray">
              {' '}
              {user.email_address}
            </Typography>
            <Typography small bold>
              {user.phone_number || 'No registered phone number'}
            </Typography>
            <hr />
            <HtmlTooltip
              title={<Typography inline>{HelpInfo.Location}</Typography>}
              placement="right"
            >
              <div style={{ display: 'inline-block' }}>
                <Typography inline bold>
                  Pickup Address
                </Typography>
              </div>
            </HtmlTooltip>
            <Typography variant="gray">
              {user.Address.full_address || 'No registered addresss'}
            </Typography>
            <Typography inline bold>
              Wallet Balance
            </Typography>{' '}
            <Link to="/fund-wallet">
              <Button color="clear"> Fund</Button>
            </Link>
            <Typography variant="gray">
              {'NGN' + user.wallet_balance.toFixed(2)}
            </Typography>
            <Button full onClick={logOut}>
              Logout
            </Button>
            <br />{' '}
          </div>
        </div>
      </Container>{' '}
      {isLoading && (
        <Toast
          className="flex"
          style={{
            position: 'fixed',
            bottom: '0',
            width: '100%',
            textAlign: 'center',
          }}
          color="secondary"
        >
          <Typography inline>
            <BeatLoader />
          </Typography>
          <Typography inline> Updating</Typography>{' '}
        </Toast>
      )}{' '}
    </div>
  );
};

export default Profile;
