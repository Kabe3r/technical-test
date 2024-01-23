import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { api } from '../services/api/api';
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";
import authReducer from '../features/auth/authSlice';
import heroReducer from '../features/toggle/NavHeroSlice';


const persistConfig = {
      key: 'root',
      storage,
      whitelist: ['auth', 'hero']
};

const persistedReducer = persistReducer(persistConfig, combineReducers({
      [api.reducerPath]: api.reducer,
      auth: authReducer,
      hero: heroReducer
}));

export const store = configureStore({
      reducer: persistedReducer,
      middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(api.middleware)
});

export const persistor = persistStore(store);