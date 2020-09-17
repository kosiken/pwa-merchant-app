import React from 'react';
import { Button, Typography } from '../components';
import { Container, Image } from 'react-bootstrap';
import Paper from '@material-ui/core/Paper';

const LFRPage = () => {
  return (
    <Container
      className="flex central"
      style={{
        height: '100vh',
      }}
    >
      <Paper>
        <Typography title>Delivery Request created</Typography>
      </Paper>
    </Container>
  );
};

export default LFRPage;
