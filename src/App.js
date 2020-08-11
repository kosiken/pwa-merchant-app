import React from 'react';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import fun from './store';
import Pages from './Pages';
function App() {
  const { store, persistor } = fun();

  return (
    <Provider store={store}>
      <PersistGate loading={<p>loading</p>} persistor={persistor}>
        <Pages />
      </PersistGate>
    </Provider>
  );
}

export default App;
