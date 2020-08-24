import React from 'react';
import { useSelector } from 'react-redux';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { TopBar } from './components';
import Customers from './pages/Customers';
import CreateOrder from './pages/CreateOrder';
import OrderPage from './pages/OrderPage';

import Login from './pages/Login';
import SignUp from './pages/SignUp';

import FoodItems from './pages/FoodItems';
import CreateFoodItem from './pages/CreateFoodItem';
import Orders from './pages/Orders';

const Auththenticated = () => {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/">
            <TopBar title="Create Order" />
            <main
              style={{
                flexGrow: 1,
              }}
            >
              <Orders />
            </main>
          </Route>

          <Route exact path="/create-order">
            <TopBar title="Create Order" />
            <main
              style={{
                flexGrow: 1,
              }}
            >
              <CreateOrder />
            </main>
          </Route>

          <Route exact path="/create-food">
            <TopBar title="Create Food Item" />{' '}
            <main
              style={{
                flexGrow: 1,
              }}
            >
              <CreateFoodItem />
            </main>
          </Route>

          <Route exact path="/FoodItems">
            <TopBar title="Meals and Menu" />{' '}
            <main
              style={{
                flexGrow: 1,
              }}
            >
              <FoodItems />
            </main>
          </Route>
          <Route exact path="/customers">
            <TopBar title="Customers" />
            <main
              style={{
                flexGrow: 1,
              }}
            >
              <Customers />
            </main>
          </Route>
          <Route exact path="/notifications">
            <TopBar title="Orders" />
            <main
              style={{
                flexGrow: 1,
              }}
            >
              <OrderPage />
            </main>
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

const UnAuththenticated = () => {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>

          <Route exact path="/signup">
            <SignUp />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

const Pages = () => {
  const user = useSelector((state) => state.auth.isAuthorized);
  console.log(user);

  if (user) return <Auththenticated />;
  return <UnAuththenticated />;
};
export default Pages;
