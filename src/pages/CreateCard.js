import React, { useState } from 'react';
import { Container, Image } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { PAYSTACK_KEY } from '../constants';
import { useSnackbar } from 'notistack';
import { Button, Toast, Typography } from '../components';
//import api from '../api';
import card from '../assets/card.svg';

const CreateCard = ({ component, handleDone }) => {
  //  const { enqueueSnackbar } = useSnackbar();
  const user = useSelector((state) => state.auth.user);
  const [key, setKey] = React.useState('');
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [open, setOpen] = React.useState(false);
  let [isLoading, setLoading] = useState(false);
  function handleOpen(m) {
    setKey(enqueueSnackbar(m));
    setOpen(true);
  }
  React.useEffect(() => {
    const handleClose = () => {
      setOpen(false);
      closeSnackbar(key);
    };

    let timeout;
    if (open) {
      timeout = setTimeout(handleClose, 2000);
    }
    return () => {
      if (timeout) clearTimeout(timeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);
  function paystackPay(props) {
    return new Promise((res, rej) => {
      const total = 50;
      const config = {
        key: PAYSTACK_KEY, // Replace with your public key

        email: user.public_id+'@500chow.com',

        amount: total * 100,

        currency: 'NGN', //GHS for Ghana Cedis,
        ref: user.public_id,

        //use your reference or leave empty to have a reference generated for you

        // label: "Optional string that replaces customer email"

        onClose: function () {
         rej('Transaction was not completed, please try again');
        
        },

        callback: function (response) {
          handleOpen('Payment complete! Thanks for your patronage');
          res([response.reference, true]);
        },
      };
      const paystackPopup = window.PaystackPop.setup(config);
      paystackPopup.openIframe();
    });
  }

  const handleSubmit = (s) => {
    paystackPay(s)
      .then(() => {
        if (component) {
          handleDone(2);
          setLoading(false);
          return;
        }
      })
      .catch(handleOpen);
  };

  if (component) {
    return (
      <div className="f-form">
        <div style={{ textAlign: 'center' }}>
          <Image
            src={card}
            style={{
              width: '100px',
            }}
          />
          <br /> <br />
        </div>{' '}
        
        <Typography> You will be billed N50.00 which would be refunded to you </Typography>
        <Button full loading={isLoading} onClick={handleSubmit}>
          Add Card
        </Button>
      </div>
    );
  }
  return (
    <Container className="mt-4" style={{ minHeight: '100vh' }}>
      <Toast color="info">
        <Typography title className="h4">
          Add Payment Method
        </Typography>
        <Typography className="m-0">
          Add a card which we would use in billing all deliveries you make using
          500dash
        </Typography>
      </Toast>
      <div className="f-form">
        <div style={{ textAlign: 'center' }}>
          <Image
            src={card}
            style={{
              width: '100px',
            }}
          />
          <br /> <br />
        </div>
        
        <Typography> You will be billed N50.00 which would be refunded to you </Typography>
        
        <Button full loading={isLoading} onClick={handleSubmit}>
          Add Card
        </Button>
      </div>
    </Container>
  );
};

export default CreateCard;
