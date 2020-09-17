import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import BeatLoader from 'react-spinners/BeatLoader';
import { Button, Typography, Toast } from '../components';
import { Container, Image } from 'react-bootstrap';
import Paper from '@material-ui/core/Paper';
import rider from '../assets/rider.svg';

const LFRPage = () => {
  const { search } = useLocation();
  return (
    <div>
      <Container>
        <Toast color="info">
          <Typography title className="h4">
            Delivery Request created
          </Typography>
          <Typography className="m-0">
            You can view the details by clicking View
          </Typography>
          <Link to={'/order/' + /=(.+)$/.exec(search)[0]}>
            <Button color="clear">View</Button>
          </Link>
        </Toast>
      </Container>

      <Container
        className="flex central"
        style={{
          minHeight: '80vh',
        }}
      >
        <Paper>
          <Typography title>Delivery Request created</Typography>
          <div className="mt-3 mb-3">
            <Image src={rider} />
          </div>
          <BeatLoader color="#f0324b" />
          <Typography>We are trying to find a nearby rider</Typography>
          <Button full>Cancel</Button>
        </Paper>
      </Container>
    </div>
  );
};

export default LFRPage;
