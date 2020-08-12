import { createStore, applyMiddleware, combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; //
import thunk from 'redux-thunk';
import Auth from './reducers/user.reducer';
import Food from './reducers/food.reducer';
// import { persistStore, autoRehydrate } from "redux-persist";

const RootReducer = combineReducers({
  auth: Auth,
  food: Food,
});
const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['food'],
};
const createMStore = applyMiddleware(thunk)(createStore);
const persistedReducer = persistReducer(persistConfig, RootReducer);

export default () => {
  let store = createMStore(persistedReducer);
  let persistor = persistStore(store);
  return { store, persistor };
};
