import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { combineReducers } from 'redux';
import userReducer from './reducers/userReducer';
import orderManagementReducer from './reducers/orderManagementReducer';
import accountManagementReducer from './reducers/accountManagementReducer';
import bookingReducer from './reducers/bookingReducer';
import stationPackageManagementReducer from './reducers/stationPackageManagementReducer';
import storePackageManagementReducer from './reducers/storePackageManagementReducer';

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  user: userReducer,
  orderMng: orderManagementReducer,
  accountMng: accountManagementReducer,
  booking: bookingReducer,
  stationPackageMng: stationPackageManagementReducer,
  storePackageMng: storePackageManagementReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});

const persistor = persistStore(store);

export { store, persistor };