import React from 'react';
import { useSelector } from 'react-redux';
import $script from 'scriptjs';
import { Container, Row, Col, Image, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { TopBar, DrawerNav, Typography, Button } from './components';
import { FiHome as HomeIcon } from 'react-icons/fi';
import Customers from './pages/Customers';
import CreateOrder from './pages/CreateOrder';
import Dashboard from './pages/Dashboard';
import Meals from './pages/Meals';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import CreateMeal from './pages/CreateMeal';
import EditMeal from './pages/EditMeal';
import FoodItems from './pages/FoodItems';
import CreateFoodItem from './pages/CreateFoodItem';
import Orders from './pages/Orders';
import OrderPage from './pages/OrderPage';
import logo from './assets/logo-variant.png';

const Auththenticated = () => {
const [show, setShow] = React.useState(false);
const [message, setMessage] = React.useState('Geolocation is not supported by this browser.')
  React.useEffect(() => {
  $script('https://maps.googleapis.com/maps/api/js?key=AIzaSyCDRINRTtuQGCi8P7V8lYPcJkuYW5HIKJA&libraries=places','google-maps');
  $script.ready(['google-maps'],()=>{
 console.log('depsNotFound')
 
 if(!window.google){
setMessage('failed to load dependencies');
 setShow(true)
 return;
 }
      if (navigator.geolocation) {
      window.FiveService = new window.google.maps.places.PlacesService(
        document.getElementById('map')
      );
    } else {
       setShow(true)
    }
  }, function(depsNotFound) {
    // foo.js & bar.js may have downloaded
    // but ['thunk'] dependency was never found
    // so lazy load it now
    console.log(depsNotFound)
  })
  }, []);
  return (
    <div>
             <Alert variant="danger"  show={show} className="m-0" style={{
        zIndex: '999'
             }} onClose={() => setShow(false)} dismissible>
        <Alert.Heading><Typography inline>Oh snap! You got an error! </Typography></Alert.Heading>
        <Typography>
       {message}
        </Typography>
      </Alert>
      <Router>
        <Switch>
          <Route exact path="/">
            <TopBar title="500 Dash" />
            <DrawerNav />{' '}
            <main
              id="contents"
              style={{
                flexGrow: 1,
              }}
            >
              <Dashboard />
            </main>
          </Route>
          <Route exact path="/orders">
            <TopBar title="Orders" /> <DrawerNav />
            <main
              id="contents"
              style={{
                flexGrow: 1,
              }}
            >
              <Orders />
            </main>
          </Route>
          <Route exact path="/create-order">
            <TopBar title="Create Order" /> <DrawerNav />{' '}
            <main
              id="contents"
              style={{
                flexGrow: 1,
              }}
            >
              <CreateOrder />
            </main>
          </Route>
          <Route exact path="/create-meal">
            <TopBar title="Create Meal" /> <CreateMeal /> <DrawerNav />{' '}
            <main
              id="contents"
              style={{
                flexGrow: 1,
              }}
            ></main>
          </Route>
          <Route exact path="/edit-meal/:id">
            <TopBar title="Edit Meal" /> <DrawerNav />{' '}
            <main
              id="contents"
              style={{
                flexGrow: 1,
              }}
            >
              <EditMeal />
            </main>
          </Route>
          <Route exact path="/create-food">
            <DrawerNav />{' '}
            <main
              id="contents"
              style={{
                flexGrow: 1,
              }}
            >
              {' '}
              <TopBar title="Create Food Item" /> <CreateFoodItem />
            </main>
          </Route>
          <Route exact path="/meals">
            <TopBar title="Meals and Menu" /> <DrawerNav />{' '}
            <main
              id="contents"
              style={{
                flexGrow: 1,
              }}
            >
              {' '}
              <Meals />
            </main>
          </Route>
          <Route exact path="/FoodItems">
            <TopBar title="Meals and Menu" /> <DrawerNav />{' '}
            <main
              id="contents"
              style={{
                flexGrow: 1,
              }}
            >
              {' '}
              <FoodItems />
            </main>
          </Route>
          <Route exact path="/customers">
            <TopBar title="Customers" /> <DrawerNav />{' '}
            <main
              id="contents"
              style={{
                flexGrow: 1,
              }}
            >
              {' '}
              <Customers />
            </main>
          </Route>
          <Route exact path="/order/:id">
            <TopBar title="Order Summary" /> <DrawerNav />{' '}
            <main
              id="contents"
              style={{
                flexGrow: 1,
              }}
            >
              {' '}
              <OrderPage />
            </main>
          </Route>
          <Route path="*" exact={true}>
            <Container className="flex central" style={{ textAlign: 'center' }}>
              <div>
                <Image
                  src={logo}
                  style={{
                    width: '80px',
                  }}
                />
                <Typography
                  title
                  className="mt-4 mb-4"
                  style={{
                    color: '#ffdc4a',
                    fontSize: '2em',
                  }}
                >
                  500 dash
                </Typography>
              </div>

              <Typography color="primary" title>
                We can't find that page
              </Typography>

              <Link to="/">
                <Button color="clear">
                  {' '}
                  <HomeIcon /> Home
                </Button>{' '}
              </Link>
            </Container>
          </Route>{' '}
        </Switch>
      </Router>
   
    </div>
  );
};

const UnAuththenticated = () => {
  return (
    <Row className="m-0">
      <Col
        xs={12}
        md={6}
        lg={5}
        className="pt-3 pb-4 flex central"
        style={{
          backgroundColor: '#011627',
          color: '#fff',
        }}
      >
        <Container>
          <div>
            <Image
              src={logo}
              style={{
                width: '80px',
              }}
            />
            <Typography
              title
              className="mt-4 mb-4"
              style={{
                color: '#ffdc4a',
              }}
            >
              500 dash
            </Typography>
          </div>
          <div>
            <Typography
              style={{
                fontSize: '2em',
                lineHeight: '1.2em',
                fontWeight: '600',
              }}
            >
              Get your meals to your customers using{' '}
              <Typography
                style={{
                  color: '#ffdc4a',
                }}
                inline
              >
                {' 500 Dash'}
              </Typography>
            </Typography>

            <Typography>
              500 Dash is a product from{' '}
              <a href="https://500chow.com">
                <Typography
                  style={{
                    color: '#5d97c6',
                  }}
                  inline
                >
                  {'500 chow '}
                </Typography>
              </a>
              that allows food vendors and resturants to deliver to their
              customers using our delivery service
            </Typography>
          </div>
          <a href="#f-main">
            <Button className="hide-md">Continue</Button>
          </a>
        </Container>

        <Typography
          style={{
            textAlign: 'center',
            position: 'absolute',
            display: 'block',
            bottom: '0',
            left: '0',
            width: '100%',
          }}
        >
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
      </Col>
      <Col xs={12} md={6} lg={7} className="p-0">
        <Router>
          <Switch>
            <Route exact path="/">
              <Login />
            </Route>
            <Route exact path="/signup">
              <SignUp />
            </Route>{' '}
            <Route path="*" exact={true}>
              <Login />
            </Route>
          </Switch>
        </Router>
      </Col>
    </Row>
  );
};

const Pages = () => {
  const user = useSelector((state) => state.auth.isAuthorized);
  console.log(user);

  if (user) return <Auththenticated />;
  return <UnAuththenticated />;
};
export default Pages;
