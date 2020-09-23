import { createStore, applyMiddleware, combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; //
import thunk from 'redux-thunk';
import Auth from './reducers/user.reducer';
import Food from './reducers/food.reducer';
import Customer from './reducers/customer.reducer';
import Card from './reducers/card.reducer';

const RootReducer = combineReducers({
  auth: Auth,
  food: Food,
  customer: Customer,
  card: Card,
});
const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['food', 'customer', 'card'],
};
const createMStore = applyMiddleware(thunk)(createStore);
const persistedReducer = persistReducer(persistConfig, RootReducer);

export default () => {
  let store = createMStore(persistedReducer);
  let persistor = persistStore(store);
  return { store, persistor };
};
