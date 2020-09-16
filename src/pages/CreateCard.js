import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Input, Button, Toast, Typography } from '../components';
//import api from '../api';
import { Link } from 'react-router-dom';
//import { useSnackbar } from 'notistack';

const CreateCard = ({ component, handleDone }) => {
  //  const { enqueueSnackbar } = useSnackbar();

  // eslint-disable-next-line no-unused-vars
  const [key, setKey] = useState('');
  const { register, handleSubmit, errors } = useForm();
  let [isLoading, setLoading] = useState(false);
  // function handleOpen(m) {
  // setKey(enqueueSnackbar(m));
  // }

  function changeExpiry(e) {
    console.log(e.target.value);
    if (e.target.value.length === 2) {
      e.target.value += '/';
    }
  }
  const handleSubmitCallback = (s) => {
    if (component) {
      handleDone(1);
      return;
    }

    setLoading(false);
  };

  if (component) {
    return (
      <form
        onSubmit={handleSubmit(handleSubmitCallback)}
        className="f-form"
        style={{
          marginTop: '1.5em',
        }}
      >
        <div className="container">
          <Input
            ref={register({
              required: {
                value: true,
                message: 'Card number is required',
              },
            })}
            error={errors.card_number}
            type="number"
            name="card_number"
            label="Card number"
          />
          <div style={{ margin: '1em 0 0' }}>
            <section style={{ width: '50%', display: 'inline-block' }}>
              <Input
                type="text"
                name="expiry"
                onChange={changeExpiry}
                label="MM/YY"
                ref={register({
                  required: {
                    value: true,
                    message: 'You need to enter this value',
                  },
                  pattern: {
                    value: /^\d{2}\/\d{2}$/,
                    message: 'Invalid Expiry',
                  },
                })}
                error={errors.expiry}
              />
            </section>
            <section
              style={{
                width: '30%',
                marginLeft: '10%',

                display: 'inline-block',
              }}
            >
              <Input
                type="number"
                name="cyc"
                label="CYC"
                ref={register({
                  required: {
                    value: true,
                    message: 'Card CYC is required',
                  },
                })}
              />
            </section>
          </div>

          <Button loading={isLoading} className="m-0" full>
            Add Item
          </Button>
        </div>
      </form>
    );
  }
  return (
    <div style={{ minHeight: '100vh' }}>
      <Toast
        color="primary"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Link to="/FoodItems">
          <Button color="clear"> Back</Button>
        </Link>
      </Toast>

      <form
        onSubmit={handleSubmit(handleSubmitCallback)}
        className="f-form"
        style={{
          marginTop: '1.5em',
        }}
      >
        <div className="container">
          <Input
            ref={register({
              required: {
                value: true,
                message: 'Card number is required',
              },
            })}
            error={errors.card_number}
            type="number"
            name="card_number"
            label="Card number"
          />
          <div style={{ margin: '1em 0 0' }}>
            <section style={{ width: '50%', display: 'inline-block' }}>
              <Input
                type="text"
                name="expiry"
                onChange={changeExpiry}
                label="MM/YY"
                ref={register({
                  required: {
                    value: true,
                    message: 'You need to enter this value',
                  },
                  pattern: {
                    value: /^\d{2}\/\d{2}$/,
                    message: 'Invalid Expiry',
                  },
                })}
                error={errors.expiry}
              />
            </section>
            <section
              style={{
                width: '30%',
                marginLeft: '10%',

                display: 'inline-block',
              }}
            >
              <Input
                type="number"
                name="cyc"
                label="CYC"
                ref={register({
                  required: {
                    value: true,
                    message: 'Card CYC is required',
                  },
                })}
              />
            </section>
          </div>

          <Button loading={isLoading} className="m-0" full>
            Add Item
          </Button>
        </div>
      </form>

      <Typography style={{ textAlign: 'center' }}>
        Made with{' '}
        <span role="img" aria-label="love">
          ❤️{' '}
        </span>
        <span
          style={{
            color: '#f0324b',
          }}
        >
          500Chow
        </span>
      </Typography>
    </div>
  );
};

export default CreateCard;
