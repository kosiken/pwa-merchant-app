import React from 'react';
import { useSelector } from 'react-redux';
import $script from 'scriptjs';
import { Container, Image, Alert } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import {
  TopBar,
  DrawerNav,
  Typography,
  Button,
  NavBar,
  Loader,
} from './components';
// import Cards from './pages/Cards';
import Customers from './pages/Customers';
import CreateOrder from './pages/CreateOrder';
import Dashboard from './pages/Dashboard';
import Meals from './pages/Meals';
import Login from './pages/Login';
import Profile from './pages/Profile';
import SignUp from './pages/SignUp';
import CreateMeal from './pages/CreateMeal';
import EditVendor from './pages/EditVendor';
import FoodItems from './pages/FoodItems';
import CreateFoodItem from './pages/CreateFoodItem';
import CreateCard from './pages/CreateCard';
import Cards from './pages/Cards';
import OrderPage from './pages/OrderPage';
import Orders from './pages/Orders';
import Onboard from './pages/Onboard';
import LFRPage from './pages/LFRPage';

import FundWallet from './pages/FundWallet';

import not_found from './assets/not_found.svg';
import { GOOGLE_MAPS_API_KEY } from './constants';
import LandingPage from './pages/Landing';

const Auththenticated = () => {
  const [show, setShow] = React.useState(false);
  const [message, setMessage] = React.useState(
    'Geolocation is not supported by this browser.'
  );
  const [loaded, setLoaded] = React.useState(false);

  React.useEffect(() => {
    $script(`https://js.paystack.co/v2/inline.js`, 'paystack');
    $script(
      `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`,
      'google-maps'
    );
    $script.ready(['google-maps', 'paystack'], () => {
      let deps = '';
      if (!window.PaystackPop) deps += ' paystack ';

      if (!window.google) {
        deps += 'google-maps';
        setMessage('failed to load dependencies' + deps);
        setShow(true); setLoaded(true);
        return;
      }

      setLoaded(true);
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
        window.FivePlacesService = new window.google.maps.places.PlacesService(
          document.getElementById('map')
        );
        window.FiveService = new window.google.maps.places.AutocompleteService();

        function showPosition(position) {
          window.FiveBounds = new window.google.maps.LatLngBounds(
            new window.google.maps.LatLng(
              position.coords.latitude,
              position.coords.longitude
            )
          );
        }
      } else {
        setShow(true);
      }
    });
  }, []);

  if (!loaded) return <Loader />;
  return (
    <div>
      <Alert
        variant="danger"
        show={show}
        className="m-0"
        style={{
          zIndex: '999',
        }}
        onClose={() => setShow(false)}
        dismissible
      >
        <Alert.Heading>
          <Typography inline>Oh snap! You got an error! </Typography>
        </Alert.Heading>
        <Typography>{message}</Typography>
      </Alert>
      <Router>
        <Switch>
          <Route exact path="/interstital">
            <TopBar title="Interstital" /> <span id="drawer" /> <LFRPage />
          </Route>
          <Route exact path="/signup">
            <Redirect to="/welcome" />
          </Route>
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>{' '}
          <Route exact path="/login">
            <Redirect to="/home" />
          </Route>
          <Route exact path="/welcome">
            <TopBar title="Welcome" />
            <span id="drawer" />
            <main>
              <Onboard />
            </main>
          </Route>
          <Route exact path="/home">
            <TopBar title="Home" />
            <DrawerNav />
            <main
              id="contents"
              style={{
                flexGrow: 1,
              }}
            >
              <CreateOrder />
            </main>
          </Route>
          <Route exact path="/delivery-requests">
            <TopBar title="Delivery Requests" /> <DrawerNav />
            <main
              id="contents"
              style={{
                flexGrow: 1,
              }}
            >
              <Dashboard />
            </main>
          </Route>{' '}
          <Route exact path="/requests">
            <TopBar title="All Delivery Requests" /> <DrawerNav />
            <main
              id="contents"
              style={{
                flexGrow: 1,
              }}
            >
              <Orders />
            </main>
          </Route>
          <Route exact path="/add-card">
            <TopBar title="Add Card" /> <DrawerNav />{' '}
            <main
              id="contents"
              style={{
                flexGrow: 1,
              }}
            >
              <CreateCard />
            </main>
          </Route>{' '}
          <Route exact path="/wallet">
            <TopBar title="Wallet" /> <DrawerNav />{' '}
            <main
              id="contents"
              style={{
                flexGrow: 1,
              }}
            >
              <Cards />
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
          <Route exact path="/edit">
            <TopBar title="Edit Profile" /> <DrawerNav />{' '}
            <main
              id="contents"
              style={{
                flexGrow: 1,
              }}
            >
              <EditVendor />
            </main>
          </Route>
          <Route exact path="/fund-wallet">
            <TopBar title="Fund Wallet" /> <DrawerNav />{' '}
            <main
              id="contents"
              style={{
                flexGrow: 1,
              }}
            >
              <FundWallet />
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
          <Route exact path="/profile">
            {' '}
            <TopBar title="Profile" />
            <DrawerNav />{' '}
            <main
              id="contents"
              style={{
                flexGrow: 1,
              }}
            >
              {' '}
              <Profile />
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
          <Route exact path="/delivery-request/:id">
            <TopBar title="Delivery Request Summary" /> <DrawerNav />{' '}
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
            <TopBar title="404" />
            <DrawerNav />{' '}
            <main
              id="contents"
              style={{
                flexGrow: 1,
              }}
            >
              <Container
                className="flex central"
                style={{ textAlign: 'center' }}
              >
                <div className="mb-4">
                  <Image
                    src={not_found}
                    style={{
                      width: '80px',
                    }}
                  />
                </div>

                <Typography title className="h4">
                  We can't find that page
                </Typography>

                <Link to={'/'}>
                  <Button color="clear">Home</Button>
                </Link>
              </Container>{' '}
            </main>
          </Route>{' '}
        </Switch>
      </Router>
    </div>
  );
};

const UnAuththenticated = () => {
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/signup">
          <SignUp />
        </Route>
        <Route exact path="*">
          <LandingPage />
        </Route>{' '}
      </Switch>
    </Router>
  );
};

const Pages = () => {
  const user = useSelector((state) => state.auth.isAuthorized);
  console.log(user);

  if (user) return <Auththenticated />;
  return <UnAuththenticated />;
};
export default Pages;
