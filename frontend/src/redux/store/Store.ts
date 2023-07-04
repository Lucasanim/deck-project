import { configureStore } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
import {combineReducers} from "redux"; 
import { persistReducer, persistStore } from 'redux-persist'
import AuthReducer from '../reducers/AuthReducer'
import SessionReducer from '../reducers/SessionReducer';

const reducers = combineReducers({
  auth: AuthReducer,
  session: SessionReducer       
 });
 

const persistConfig = {
  key: 'root',
  storage
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer
})

export let persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
