import React from "react";

import { BottomNav } from "./components";
import Customers from "./pages/Customers";
import CreateOrder from "./pages/CreateOrder";
import OrderPage from "./pages/OrderPage";
import Login from "./pages/Login";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import fun from "./store";

function App() {
  const { store, persistor } = fun();

  return (
    <Provider store={store}>
      <PersistGate loading={<p>loading</p>} persistor={persistor}>
        <div>
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
        </div>
      </PersistGate>
    </Provider>
  );
}

export default App;
