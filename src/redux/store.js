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
  whitelist: ['user'], // danh sách các state của userReducer muốn lưu trữ
};

const orderMngPersistConfig = {
  key: 'orderMngState',
  storage,
  whitelist: ['orderMng'], // danh sách các state của orderManagementReducer muốn lưu trữ
};

const accountMngPersistConfig = {
  key: 'accountMngState',
  storage,
  whitelist: ['accountMng'], // danh sách các state của accountManagementReducer muốn lưu trữ
};

const bookingPersistConfig = {
  key: 'bookingState',
  storage,
  whitelist: ['booking'], // danh sách các state của bookingReducer muốn lưu trữ
};

const stationPackageMngPersistConfig = {
  key: 'stationPackageMngState',
  storage,
  whitelist: ['stationPackageMng'], // danh sách các state của stationPackageManagementReducer muốn lưu trữ
};

const storePackageMngPersistConfig = {
  key: 'storePackageMngState',
  storage,
  whitelist: ['storePackageMng'], // danh sách các state của storePackageManagementReducer muốn lưu trữ
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