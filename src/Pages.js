import React from 'react';
import { useSelector } from 'react-redux';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { TopBar } from './components';
import Customers from './pages/Customers';
import CreateOrder from './pages/CreateOrder';
import OrderPage from './pages/OrderPage';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import { makeStyles } from '@material-ui/core/styles';
import FoodItems from './pages/FoodItems';
const useStyles = makeStyles((theme) => ({
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
}));

const Auththenticated = () => {
  const classes = useStyles();
  return (
    <div
      style={{
        display: 'flex',
      }}
    >
      <Router>
        <Switch>
          <Route exact path="/">
            <TopBar title="Create Order" />
            <main
              style={{
                flexGrow: 1,
              }}
            >
              <div className={classes.toolbar} />
              <CreateOrder />
            </main>
          </Route>
          <Route exact path="/FoodItems">
            <FoodItems />
            <BottomNav />
          </Route>
          <Route exact path="/customers">
            <TopBar title="Customers" />
            <main
              style={{
                flexGrow: 1,
              }}
            >
              <div className={classes.toolbar} />
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
              <div className={classes.toolbar} />
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
