import React from 'react';
import { Link } from 'react-router-dom';

import { Button, Toast } from '../components';
import { Container } from 'react-bootstrap';

const Cards = () => {
  return (
    <div className="mt-4">
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
        </Toast>
      </Container>
    </div>
  );
};

export default Cards;
