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


const userPersistConfig = {
  key: 'userState',
  storage,
};

const orderMngPersistConfig = {
  key: 'orderMngState',
  storage,
};

const accountMngPersistConfig = {
  key: 'accountMngState',
  storage,
};

const bookingPersistConfig = {
  key: 'bookingState',
  storage,
};

const stationPackageMngPersistConfig = {
  key: 'stationPackageMngState',
  storage,
};

const storePackageMngPersistConfig = {
  key: 'storePackageMngState',
  storage,
};

const userPersistedReducer = persistReducer(userPersistConfig, userReducer);
const orderMngPersistedReducer = persistReducer(orderMngPersistConfig, orderManagementReducer);
const accountMngPersistedReducer = persistReducer(accountMngPersistConfig, accountManagementReducer);
const bookingPersistedReducer = persistReducer(bookingPersistConfig, bookingReducer);
const stationPackageMngPersistedReducer = persistReducer(stationPackageMngPersistConfig, stationPackageManagementReducer);
const storePackageMngPersistedReducer = persistReducer(storePackageMngPersistConfig, storePackageManagementReducer);

const rootReducer = combineReducers({
  user: userPersistedReducer,
  orderMng: orderMngPersistedReducer,
  accountMng: accountMngPersistedReducer,
  booking: bookingPersistedReducer,
  stationPackageMng: stationPackageMngPersistedReducer,
  storePackageMng: storePackageMngPersistedReducer,
});



const store = configureStore({
  reducer: rootReducer,
});

const persistor = persistStore(store);

export { store, persistor };