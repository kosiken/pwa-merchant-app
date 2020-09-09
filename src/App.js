import React from 'react';
import { Loader } from './components';
import { Helmet } from 'react-helmet';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { SnackbarProvider } from 'notistack';
import fun from './store';
import Pages from './Pages';
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
  const { store, persistor } = fun();

  return (
    <Provider store={store}>
      <PersistGate loading={<Loader />} persistor={persistor}>
        <SnackbarProvider>
          <Helmet>
            <meta property="og:image" content={'/logo192.png'} />
            <meta
              property="og:description"
              content={`500 Dash is a product from 500chow that allows food vendors and resturants to deliver to their customers 
          using our delivery service`}
            />
            <meta name="image" content={'/logo192.png'} />
          </Helmet>
          <Pages />
        </SnackbarProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
