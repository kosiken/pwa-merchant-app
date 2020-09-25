import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import BeatLoader from 'react-spinners/BeatLoader';
import { Button, Typography, Toast } from '../components';
import { Container, Image } from 'react-bootstrap';

import rider from '../assets/rider.svg';

const LFRPage = () => {
  const { search } = useLocation();
  return (
    <div>
      <Toast color="info">
        <Container>
          {' '}
          <Typography title className="h4">
            Delivery Request created
          </Typography>
          <Typography className="m-0">
            You can view the details by clicking View
          </Typography>
          <Link to={'/delivery-request/' + /=(.+)$/.exec(search)[1]}>
            <Button color="clear">View</Button>
          </Link>{' '}
        </Container>
      </Toast>

      <Container
        className="flex central"
        style={{
          minHeight: '60vh',
          alignItems: 'center',
        }}
      >
        <div
          className="p-3"
          style={{
            maxWidth: '550px',
            textAlign: 'center',
            width: '80%',
            minWidth: '290px',
            overflowX: 'hidden',
          }}
        >
          <div className="mt-3 mb-3">
            <Image
              src={rider}
              style={{
                width: '100px',
              }}
            />
          </div>
          <BeatLoader color="#f0324b" />
          <Typography>A rider would be assigned in 15 minutes</Typography>
        </div>
      </Container>
    </div>
  );
};

export default LFRPage;
