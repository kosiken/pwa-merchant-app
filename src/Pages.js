import React from 'react';
import { useSelector } from 'react-redux';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { BottomNav } from './components';
import Customers from './pages/Customers';
import CreateOrder from './pages/CreateOrder';
import OrderPage from './pages/OrderPage';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
const Auththenticated = () => {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/">
            <CreateOrder />
            <BottomNav />
          </Route>
          <Route exact path="/customers">
            <Customers />
            <BottomNav />
          </Route>

          <Route exact path="/notifications">
            <OrderPage />
            <BottomNav />
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
