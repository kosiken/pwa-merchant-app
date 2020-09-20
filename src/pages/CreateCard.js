import React, { useState } from 'react';
import { Container, Image } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { PAYSTACK_KEY } from '../constants';
import { useSnackbar } from 'notistack';
import { Button, Toast, Input } from '../components';
//import api from '../api';
import { Link } from 'react-router-dom';
import card from '../assets/card.svg';

const CreateCard = ({ component, handleDone }) => {
  //  const { enqueueSnackbar } = useSnackbar();
  const user = useSelector((state) => state.auth.user);
  const [key, setKey] = React.useState('');
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { register, handleSubmit, errors } = useForm();
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

        email: props.email,

        amount: total * 100,

        currency: 'NGN', //GHS for Ghana Cedis

        //use your reference or leave empty to have a reference generated for you

        // label: "Optional string that replaces customer email"

        onClose: function () {
          //   handleOpen('Transaction was not completed, please try again');
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

  const handleSubmitCallback = (s) => {
    paystackPay(s)
      .then(() => {
        if (component) {
          handleDone(1);
          setLoading(false);
          return;
        }
      })
      .catch(handleOpen);
  };

  if (component) {
    return (
      <div className="sidebar-body">
        <form
          className="f-form"
          onSubmit={handleSubmit(handleSubmitCallback)}
          autoComplete={'false'}
        >
          {' '}
          <div style={{ textAlign: 'center' }}>
            <Image
              src={card}
              style={{
                width: '100px',
              }}
            />
            <br /> <br />
          </div>
          <Input
            type="email"
            name="email"
            label="Email Address"
            defaultValue={user.email_address}
            style={{ margin: '0 auto' }}
            ref={register({
              required: {
                value: true,
                message: 'You need to enter this value',
              },
              pattern: {
                value: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
                message: 'Invalid Email Address',
              },
            })}
            error={errors.email}
          />
          <Input
            label="Phone Number"
            name={'phone'}
            defaultValue={user.phone_number}
            variant="outlined"
            style={{ margin: '0 auto' }}
            type="tel"
            ref={register({
              required: {
                value: true,
                message: 'Phone Number is required',
              },

              min: {
                value: 10,
                message: 'Invalid Phone Number',
              },
            })}
            error={errors.phone}
          />{' '}
          <Button full loading={isLoading}>
            Add Card
          </Button>
        </form>
      </div>
    );
  }
  return (
    <Container className="mt-4" style={{ minHeight: '100vh' }}>
      <Toast
        color="primary"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Link to="/cards">
          <Button color="clear"> Back</Button>
        </Link>
      </Toast>
      <form
        className="f-form"
        onSubmit={handleSubmit(handleSubmitCallback)}
        autoComplete={'false'}
      >
        {' '}
        <div style={{ textAlign: 'center' }}>
          <Image
            src={card}
            style={{
              width: '100px',
            }}
          />
          <br /> <br />
        </div>
        <Input
          type="email"
          name="email"
          label="Email Address"
          defaultValue={user.email_address}
          style={{ margin: '0 auto' }}
          ref={register({
            required: {
              value: true,
              message: 'You need to enter this value',
            },
            pattern: {
              value: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
              message: 'Invalid Email Address',
            },
          })}
          error={errors.email}
        />
        <Input
          label="Phone Number"
          name={'phone'}
          defaultValue={user.phone_number}
          variant="outlined"
          style={{ margin: '0 auto' }}
          type="tel"
          ref={register({
            required: {
              value: true,
              message: 'Phone Number is required',
            },

            min: {
              value: 10,
              message: 'Invalid Phone Number',
            },
          })}
          error={errors.phone}
        />{' '}
        <Button full loading={isLoading}>
          Add Card
        </Button>
      </form>
    </Container>
  );
};

export default CreateCard;
