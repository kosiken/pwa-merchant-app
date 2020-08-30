import React from 'react';
import Typography from '../Typography/Typography';

import { Container } from 'react-bootstrap';

import { FiWifiOff as ErrIcon } from 'react-icons/fi';
import './Error.scss';

const ErrorComponent = ({ children, message }) => {
  return (
    <div className="error">
      <Typography
        title
        style={{
          textAlign: 'center',
          fontSize: '4em',
          color: '#f0324b',
          marginTop: '20vh',
        }}
      >
        <ErrIcon />
      </Typography>
      <Typography
        title
        style={{
          textAlign: 'center',
          color: '#f0324b',
        }}
      >
        An Error Occured
      </Typography>
      <Container
        style={{
          textAlign: 'center',
        }}
      >
        <Typography
          style={{
            textAlign: 'center',
            margin: '1em 0',
          }}
        >
          An error occurred while trying to connect to the internet: {message}
        </Typography>{' '}
        {children}
      </Container>
    </div>
  );
};

export default ErrorComponent;
