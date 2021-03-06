import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { isEmpty } from 'lodash';
import { useSnackbar } from 'notistack';
import { Modal, Container } from 'react-bootstrap';
import {
  CustomerListItem,
  Typography,
  Input,
  Button,
  IconButton,
  ComboBox2,
  ErrorComponent,
  //Toast,
} from '../components';
import { getDetails } from '../constants';
import api from '../api';

import {
  FiSearch as SearchIcon,
  FiX as CloseIcon,
  FiUsers as UsersIcon,
  //FiInfo as InfoIcon,
} from 'react-icons/fi';
import { v4 as uuid } from 'uuid';
import useSearch from '../hooks/useSearch';

const Customers = ({ component, handleDone }) => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  let [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  let [currentLocation, setCurrentLocation] = useState(null);
  const { register, handleSubmit, errors } = useForm();
  const [isLoading, setLoading] = useState(false);
  const [isLoading2, setLoading2] = useState(false);
  const [key, setKey] = useState('');
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(true);
  const [open, setOpen] = useState(false);
  const [openb, setOpenb] = useState(false);
  const [search, setSearch] = useState(false);
  const { customers } = useSelector((state) => {
    return {
      customers: state.customer.customers || [],
    };
  });
  let ref = useRef(null);
  useEffect(() => {
    if (!search && !!ref.current) ref.current.value = '';
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, ref]);
  let items = useSearch(
    ref,
    customers,
    function (e, l) {
      let regexp = new RegExp(e.toLowerCase());
      return (
        regexp.test(l.full_name.toLowerCase()) || regexp.test(l.phone_number)
      );
    },
    true,
    search
  );
  let [editing, setEditing] = useState({
    full_name: '',
    phone_number: '',
    email_address: '',
  });
  const editCustomer = (customer) => {
    //let entries =  ['full_name','phone_number', 'email_address']
    setEditing(customer);
    setOpenb(true);
  };

  const handleClose = () => {
    setOpenb(false);
  };
  // eslint-disable-next-line no-unused-vars
  const handleToggle = () => {
    setOpenb(!openb);
  };
  const changeCurrentAddress = (e) => {
    setCurrentLocation(e.target.value);
  };
  function handleOpen(m) {
    setKey(enqueueSnackbar(m));
  }

  const init = () => {
    setError(false);
    (async () => {
      try {
        let _customers;
        if (!customers.length) {
          _customers = await api.getCustomers();
          dispatch({
            type: 'GET_CUSTOMERS',
            customers: _customers,
          });
        }
        setLoaded(false);
      } catch (error) {
        setLoaded(false);
        setErrorMessage(error.data.error);
        setError(true);
      }
    })();
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
    init();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmitCallback = async (s) => {
    setLoading(true);
    if (currentLocation.place_id) {
      currentLocation = await getDetails(currentLocation.place_id);
    }
    api
      .createCustomer({
        ...s,
        address: currentLocation,
      })
      .then((user) => {
        dispatch({
          type: 'ADD_CUSTOMER',
          customer: { ...user, Addresses: [currentLocation] },
        });
        if (component) {
          handleDone(1);
          return;
        }
        document.getElementById('five-form').reset();
      })
      .catch((err) => {
        console.log(err);
        handleOpen(err.data.error);
      });
    setLoading(false);
  };

  const handleSubmitCallback2 = (s) => {
    s.preventDefault();
    setLoading2(true);

    editing.full_name =
      document.getElementById('full_name2').value || editing.full_name;
    editing.email_address =
      document.getElementById('email_address2').value || editing.full_name;
    editing.phone_number =
      document.getElementById('phone_number2').value || editing.phone_number;
    api
      .editModel({ ...editing, model: 'VendorCustomer' })
      .then((user) => {
        let index = customers.findIndex((customer) => customer.id === user.id);
        customers[index] = user;
        setEditing({
          full_name: '',
          phone_number: '',
          email_address: '',
        });
        dispatch({
          type: 'GET_CUSTOMERS',
          customers: customers,
        });
        setLoading2(false);
        document.getElementById('theForm').reset();
        handleClose();
        //  document.getElementById('five-form').reset();
      })

      .catch((err) => {
        console.log(err.data);
        handleOpen('Unexpected err');
        setLoading2(false);
      });
  };
  function renderForm() {
    return (
      <form
        className="f-form "
        style={{
          marginTop: '1.5em',
          marginBottom: '1em',
        }}
        onSubmit={handleSubmit(handleSubmitCallback)}
        id="five-form"
      >
        <Container>
          <Input
            type="text"
            name="full_name"
            label="Customer Name"
            ref={register({
              required: {
                value: true,
                message: 'Customer name is required',
              },
            })}
            error={errors.full_name}
          />

          <Input
            type="tel"
            name="phone_number"
            label="Customer Phone Number"
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
            error={errors.phone_number}
          />
          <ComboBox2 onChange={changeCurrentAddress} label="Customer Address" />

          <Button
            loading={isLoading}
            full
            onClick={handleSubmit(handleSubmitCallback)}
            style={{
              margin: '0',
            }}
          >
            Add Customer
          </Button>
        </Container>
      </form>
    );
  }
  if (component) return renderForm();
  return (
    <>
      {/*  <Toast className="mb-3 flex" color="secondary">    <Typography bold inline>
          <InfoIcon/>
        
        </Typography>
        <Typography className="m-0 pl-2">
        
Saved Reciepients are customers who you often make deliveries to. You can save them to quickly select them when you want to make a delivery
        </Typography>
 </Toast>*/}
      <div className="customerPage">
        <div>
          <Typography
            title
            variant="secondary"
            className="mt-3 mb-1 ml-4"
            style={{
              fontSize: '2em',
              fontWeight: '700',
            }}
          >
            Customers
          </Typography>
          {renderForm()}
        </div>
        <Modal
          show={openb}
          onHide={handleClose}
          size="md"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Body>
            <form
              className="f-form"
              style={{
                marginTop: '1.5em',
              }}
              onSubmit={handleSubmitCallback2}
              id="theForm"
            >
              <Typography
                inline
                style={{
                  margin: '0 0 1em 1em',
                  display: 'block',
                }}
              >
                Edit Customer Information
              </Typography>
              <Input
                type="text"
                name="full_name2"
                label={editing.full_name}
                style={{ margin: '0 auto' }}
              />

              <Input
                type="tel"
                name="phone_number2"
                label={editing.phone_number}
                style={{ margin: '0 auto' }}
              />

              <Button loading={isLoading2} full>
                Confirm
              </Button>
            </form>{' '}
          </Modal.Body>
          <Modal.Footer>
            <Button color="clear" onClick={handleClose}>
              Close
            </Button>{' '}
          </Modal.Footer>
        </Modal>

        <div className="customers">
          <section
            style={{
              display: 'flex',
              padding: '10px',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography
              small
              style={{
                marginLeft: '10px',
              }}
            >
              Customers
            </Typography>

            <IconButton
              style={{
                color: '#f0324b',
              }}
              onClick={() => {
                setSearch(!search);
              }}
            >
              {!search && <SearchIcon />}
              {search && <CloseIcon />}
            </IconButton>
          </section>
          <Input
            name="search"
            type="search"
            style={{ margin: '0 auto', display: search ? 'block' : 'none' }}
            label="Search"
            ref={ref}
          />
          {loaded &&
            [1, 2, 3, 4, 5].map((customer) => (
              <CustomerListItem key={'customer' + customer} loader />
            ))}
          {items.map((customer) => (
            <CustomerListItem
              key={uuid()}
              customer={customer}
              onEdit={editCustomer}
            />
          ))}
          {error && (
            <ErrorComponent message={errorMessage}>
              <Button onClick={init}> Retry </Button>
            </ErrorComponent>
          )}{' '}
          {!error && !loaded && isEmpty(items) && (
            <>
              <Typography
                title
                style={{
                  textAlign: 'center',
                  fontSize: '4em',
                  color: 'rgb(136, 136, 136)',
                  marginTop: '20vh',
                }}
              >
                <UsersIcon />
              </Typography>
              <Typography
                style={{
                  textAlign: 'center',
                }}
              >
                No Customers Found
              </Typography>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Customers;
