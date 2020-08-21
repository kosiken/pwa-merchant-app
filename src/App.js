import React from 'react';

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
      <PersistGate loading={<p>loading</p>} persistor={persistor}>
        <SnackbarProvider>
          <Pages />
        </SnackbarProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
