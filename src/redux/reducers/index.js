import { combineReducers } from 'redux';
import commonReducer from './commomReducer';
import DataReducer from './DataReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['colorrdata','currentItem'],
};

const persistConfigdata = {
  key: 'data',
  storage: AsyncStorage,
  whitelist: ['userdata','cachedData'],
  blacklist:['error','listingData','drivers']
};

const rootReducers = combineReducers({
  commonReducer: persistReducer(persistConfig, commonReducer),
  DataReducer: persistReducer(persistConfigdata, DataReducer),
});

export default rootReducers;