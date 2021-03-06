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
  let [detailedLocation, setDetailedLocation] = useState({});
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [key, setKey] = useState('');
  const [fee, setFee] = useState(0);
  const [distance, setDistance] = useState('');
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

    if (fee > Number(user.wallet_balance)) {
      handleOpen('Please fund your wallet to place this delivery request');
      setSubmiting(false);
      return;
    }

    if (!user.Address.latitude) {
      setMessage('Resolving Pickup Address');

      let _user = await api.getMe();

      if (_user.Address) {
        user.Address = _user.Address;
      } else {
        handleOpen(
          'No pickup address found, You have to add an address from the profile page'
        );
        setSubmiting(false);
        return;
      }
    }
    if (tab === 'Saved Customer') {
      if (!customer) {
        handleOpen('No customer selected');
        setSubmiting(false);
        return;
      }
    } else if (!detailedLocation.is_set) {
      handleOpen('No location selected');
      setSubmiting(false);
      return;
    }

    if (!fee) {
      handleOpen('Distance above 12km');
      setSubmiting(false);
      return;
    }

    if (Number(user.wallet_balance) < fee) {
      handleOpen('Please fund your wallet to place this delivery request');
      setSubmiting(false);
      return;
    }
    setMessage('Submitting Delivery Request');
    let body = {
      full_name: getValues('name'),
      phone_number: customer ? customer.phone_number : getValues('phone'),

      order_notes: s.order_notes,
      fee,
      order_fee: fee,
    };
    if (tab === 'New Customer') {
      body = {
        ...body,
        delivery_address: { ...detailedLocation, is_set: undefined },
      };
    } else {
      body = {
        ...body,
        delivery_address_id: customer.Addresses[0].id,
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
  const bed = async () => {
    let d, address;
    console.log(distance);
    if (tab === 'Saved Customer') {
      if (customer) {
        try {
          let address = customer.Addresses[0];

          d = getDistance(address, user.Address);
          setDistance(d);
          setFee(getFee(d));

          // console.log(distance);
        } catch (err) {
          handleOpen('No address found for customer');
          setSubmiting(false);
          return;
        }
      }
    } else {
      if (!window.FivePlacesService) return;

      if (!currentLocation.place_id) return;
      setSubmiting(true);
      setMessage('Resolving Delivery Address');
      address = await getDetails(currentLocation.place_id);
      setSubmiting(false);
      address.is_set = true;
      setDetailedLocation(address);

      d = getDistance(address, user.Address);

      setDistance(d);
      setFee(getFee(d));
    }
  };
  useEffect(
    () => {
      bed();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [customer, currentLocation]
  );

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
      <Typography
        title
        className="mb-4 ml-4"
        style={{
          fontSize: '2em',
          fontWeight: '700',
        }}
      >
        Create Delivery Request
      </Typography>
      <Loader backdrop open={submitting}>
        <Typography style={{ color: 'white' }}> {message}</Typography>
      </Loader>

      <SwitchBox
        options={['Saved Customer', 'New Customer']}
        value={tab}
        onChange={setTab}
      />
      <form
        className="f-form"
        style={{
          marginTop: '1.5em',
        }}
        onSubmit={handleSubmit(handleSubmitCallback)}
        ref={formRef}
      >
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>
              <Typography small variant="primary" style={{ display: 'block' }}>
                Required*
              </Typography>
              <Typography
                small={fee === false}
                variant={fee === false ? 'primary' : ''}
                style={{ display: 'block' }}
              >
                {fee === false ? 'Distance over 12km' : 'Fee: NGN ' + fee}
              </Typography>
            </div>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end',
              }}
            >
              <Typography small>Wallet Balance</Typography>
              <Typography style={{ display: 'block' }}>
                NGN {user.wallet_balance}
              </Typography>
            </div>
          </div>

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
            Create Delivery Request
          </Button>
        </div>
      </form>

      {show && <Redirect to={'/interstital?request=' + entry} />}
    </div>
  );
};

export default CreateOrder;
