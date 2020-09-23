import React, { useState, useEffect, useRef } from 'react';
// import { Modal } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import api from '../api';
import {
  SwitchBox,
  Input,
  Button,
  Checkbox,
  Typography,
  ComboBox2,
  ComboBox0,
  Loader,
  HtmlTooltip,
} from '../components';

// import { Link } from "react-router-dom";
import { getDetails, HelpInfo, getDistance, getFee } from '../constants';

const CreateOrder = () => {
  let [tab, setTab] = useState('New Customer');

  const [show, setShow] = useState(false);
  const [entry, setEntry] = useState(0);
  const handleShow = (id) => {
    setEntry(id);

    setShow(true);
  };
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmiting] = useState(false);
  let [currentLocation, setCurrentLocation] = useState({});

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [key, setKey] = useState('');
  let [message, setMessage] = useState('Submitting');
  let [customer, setCustomer] = useState(null);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  function handleOpen(m) {
    setKey(enqueueSnackbar(m));
  }
  const { token, vendorCustomers, user } = useSelector((state) => {
    return {
      token: state.auth.token,
      vendorCustomers: state.customer.customers || [],
      vMeals: state.food.meals || [],
      vFoods: state.food.foods || [],
      user: state.auth.user,
    };
  });
  let formRef = useRef(null);

  const { register, handleSubmit, errors, getValues } = useForm();
  const handleSubmitCallback = async (s) => {
    setSubmiting(true);
    let distance;

    if (tab === 'Saved Customer') {
      if (customer) {
        try {
          let address = customer.Addresses[0];

          distance = getDistance(address, user.Address);
          // console.log(distance);
        } catch (err) {
          handleOpen('No address found for customer');
          return;
        }
      } else {
        handleOpen('No customer selected');
        setSubmiting(false);
        return;
      }
    } else if (currentLocation.place_id) {
      currentLocation = await getDetails(currentLocation.place_id);
      setMessage('Resolving Delivery Address');
      distance = getDistance(currentLocation, user.Address);
      //  return;
    } else {
      handleOpen('No location selected');
      setSubmiting(false);
      return;
    }

    const fee = getFee(distance);

    if (!fee) {
      handleOpen('Distance above 8km');
      setSubmiting(false);
      return;
    }

    setMessage('Submitting Delivery Request');
    let body = {
      full_name: getValues('name'),
      phone_number: customer ? customer.phone_number : getValues('phone'),

      order_notes: s.order_notes,
      fee,
    };
    if (tab === 'New Customer') {
      body = {
        ...body,
        delivery_address: currentLocation,
      };
    } else {
      body = {
        ...body,
        delivery_address_id: s.type_of_address,
      };
    }
    api
      .createOrder(body, token)
      .then((result) => {
        setSubmiting(false);
        handleShow(result.id);
      })
      .catch((err) => {
        setSubmiting(false);
        handleOpen(err.data.error);
      });
  };

  const changeCurrentAddress = (e) => {
    setCurrentLocation(e.target.value);
  };

  useEffect(() => {
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
  useEffect(() => {
    setCustomer(null);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab]);
  useEffect(() => {
    (async () => {
      try {
        let customers;
        if (!vendorCustomers.length) {
          customers = await api.getCustomers();
          // customers.forEach((i) => (i.Addresses = Address));
          dispatch({
            type: 'GET_CUSTOMERS',
            customers,
          });
        }
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    })();
    //  foodRef.current.value = '';

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={{ minHeight: '100vh' }} className="mt-4">
      <Loader backdrop open={submitting}>
        <Typography style={{ color: 'white' }}> {message}</Typography>
      </Loader>

      <SwitchBox
        options={['Saved Customer', 'New Customer']}
        value={tab}
        onChange={setTab}
      />
      <form
        autoComplete="off"
        className="f-form"
        style={{
          marginTop: '1.5em',
        }}
        onSubmit={handleSubmit(handleSubmitCallback)}
        ref={formRef}
      >
        <div className="container">
          <Typography small variant="primary" style={{ display: 'block' }}>
            Required*
          </Typography>
          <HtmlTooltip
            title={<Typography inline>{HelpInfo.Customer}</Typography>}
            placement="right"
          >
            <div style={{ display: 'inline-block' }}>
              <Typography>Customer Information</Typography>
            </div>
          </HtmlTooltip>
          {tab === 'Saved Customer' && (
            <>
              <ComboBox0
                items={vendorCustomers}
                loading={loading}
                onChange={setCustomer}
              />
            </>
          )}

          {tab === 'New Customer' && (
            <>
              <Input
                type="text"
                name="name"
                label="Customer Name*"
                ref={register({
                  required: {
                    value: true,
                    message: 'Customer name is required',
                  },
                })}
                error={errors.name}
              />

              <Input
                type="tel"
                name="phone"
                label="Customer Phone Number*"
                ref={register({
                  required: {
                    value: true,
                    message: 'Customer Phone Number is required',
                  },

                  min: {
                    value: 10,
                    message: 'Invalid Phone Number',
                  },
                })}
                error={errors.phone}
              />
            </>
          )}
          {tab === 'New Customer' && (
            <ComboBox2
              onChange={changeCurrentAddress}
              label="Customer Address*"
            />
          )}
          {tab === 'New Customer' && (
            <div className="mb-3">
              <Checkbox
                label="Save this Customer for next time"
                style={{ margin: '0 0 1em' }}
              />
            </div>
          )}

          <HtmlTooltip
            title={<Typography inline>{HelpInfo.Customer}</Typography>}
            placement="right"
          >
            <div style={{ display: 'inline-block' }}>
              <Typography>Extra Information</Typography>
            </div>
          </HtmlTooltip>

          <Input
            type="text"
            name="order_notes"
            label="Order Notes"
            ref={register()}
            multiline
          />
          <Button
            full
            loading={submitting}
            style={{
              margin: '0',
            }}
          >
            Create Order
          </Button>
        </div>
      </form>

      {show && <Redirect to={'/interstital?request=' + entry} />}
    </div>
  );
};

export default CreateOrder;
