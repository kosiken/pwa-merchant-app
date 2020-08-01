import React from 'react';

import { BottomNav } from './components'
import Customers from "./pages/Customers";
import CreateOrder from "./pages/CreateOrder";
import OrderPage from "./pages/OrderPage"
import Login from "./pages/Login";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <CreateOrder />
        </Route>
        <Route exact path="/customers">
          <Customers />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        
        <Route exact path="/notifications">
          <OrderPage />
        </Route>
      </Switch>

      <BottomNav />
    </Router>
  );
}

export default App;
