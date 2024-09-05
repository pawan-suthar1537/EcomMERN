import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authslice from "./authslice";
import Adminproductaslice from "./admin-product-slice";
import Shopproductslice from "./shop-slice";

import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import cartSlice from "./cart-slice";
import addressSlice from "./address-slice";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};
const rootReducer = combineReducers({
  auth: authslice,
  adminproducts: Adminproductaslice,
  shop: Shopproductslice,
  cart: cartSlice,
  address: addressSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export default store;
