import React from 'react';
import { useSelector } from 'react-redux';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { TopBar, DrawerNav } from './components';
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
              <TopBar title="500 Chow" />
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
              <TopBar title="Create Order" />
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
