import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Alert } from 'react-bootstrap';
import BeatLoader from 'react-spinners/BeatLoader';
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

        dispatch({ user: { Vendor: user }, type: 'SIGNUP_USER' });
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
        <Typography title className="mb-2">
          Identification Details
        </Typography>

        <Typography inline bold>
          Name
        </Typography>
        <Typography> {user.name}</Typography>
        <Typography inline bold>
          Email address
        </Typography>
        <Typography> {user.email_address}</Typography>
        <Typography inline bold>
          Phone number
        </Typography>
        <Typography>
          {' '}
          {user.phone_number || 'No registered phone number'}
        </Typography>
        <hr />

        <Typography title className="mb-2">
          Location Details{' '}
        </Typography>

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

        <Typography>{user.addresss || 'No registered addresss'}</Typography>
        <hr />

        <Typography title className="mb-2">
          Payment Details{' '}
        </Typography>
        <Typography inline bold>
          Wallet Balance
        </Typography>

        <Typography>{'NGN' + user.wallet_balance.toFixed(2)}</Typography>

        <Button full onClick={logOut}>
          Logout
        </Button>
        <br />
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
