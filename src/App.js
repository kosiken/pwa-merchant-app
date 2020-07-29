import React from 'react';
import Customers from "./pages/Customers";
import CreateOrder from "./pages/CreateOrder";
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
      </Switch>
    </Router>
  );
}

export default App;
