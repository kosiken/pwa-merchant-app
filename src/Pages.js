import React from 'react';
import { useSelector } from 'react-redux';
import { Container, Row, Col, Image } from 'react-bootstrap';
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
import logo from './assets/logo-variant.png';

const Auththenticated = () => {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/">
            <DrawerNav />{' '}
            <main
              id="contents"
              style={{
                flexGrow: 1,
              }}
            >
              {' '}
              <TopBar title="500 Dash" />
              <Dashboard />
            </main>
          </Route>
          <Route exact path="/orders">
            <DrawerNav />{' '}
            <main
              id="contents"
              style={{
                flexGrow: 1,
              }}
            >
              {' '}
              <TopBar title="Orders" />
              <Orders />
            </main>
          </Route>

          <Route exact path="/create-order">
            <DrawerNav />{' '}
            <main
              id="contents"
              style={{
                flexGrow: 1,
              }}
            >
              <TopBar title="Create Order" />
              <CreateOrder />
            </main>
          </Route>
          <Route exact path="/create-meal">
            <DrawerNav />{' '}
            <main
              id="contents"
              style={{
                flexGrow: 1,
              }}
            >
              <TopBar title="Create Meal" /> <CreateMeal />
            </main>
          </Route>

          <Route exact path="/edit-meal/:id">
            <DrawerNav />{' '}
            <main
              id="contents"
              style={{
                flexGrow: 1,
              }}
            >
              <TopBar title="Edit Meal" />
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
            <DrawerNav />{' '}
            <main
              id="contents"
              style={{
                flexGrow: 1,
              }}
            >
              {' '}
              <TopBar title="Meals and Menu" /> <Meals />
            </main>
          </Route>
          <Route exact path="/FoodItems">
            <DrawerNav />{' '}
            <main
              id="contents"
              style={{
                flexGrow: 1,
              }}
            >
              {' '}
              <TopBar title="Meals and Menu" /> <FoodItems />
            </main>
          </Route>
          <Route exact path="/customers">
            <DrawerNav />{' '}
            <main
              id="contents"
              style={{
                flexGrow: 1,
              }}
            >
              {' '}
              <TopBar title="Customers" />
              <Customers />
            </main>
          </Route>
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
              <div className="flex central">
                <Container style={{ textAlign: 'center' }}>
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
                  <Typography
                    style={{
                      fontSize: '2em',
                      lineHeight: '1.2em',
                      fontWeight: '600',
                    }}
                  >
                    404 Page
                  </Typography>
                  <Typography color="primary" title>
                    We can't find that page
                  </Typography>

                  <Link to="/">
                    <Button color="clear">
                      {' '}
                      <HomeIcon /> Login
                    </Button>{' '}
                  </Link>
                </Container>
              </div>
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
