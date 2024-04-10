import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

import counterReducer from './counterSlice';
import wishListReducer from './wishList';

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
};

const persistedCounterReducer = persistReducer(
  persistConfig,
  counterReducer
);

const persistedWishListReducer = persistReducer(
  persistConfig,
  wishListReducer
);

export const store = configureStore({
  reducer: {
    counter: persistedCounterReducer,
    wishList: persistedWishListReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
