import { configureStore } from "@reduxjs/toolkit";
import { productAPI } from "./api/productAPI";
import { userAPI } from "./api/userAPI";
import { userReducer } from "./reducer/userReducer";
import { cartRuducer } from "./reducer/cartReducer";
import { orderApi } from "./api/orderAPI";
import { dashboardApi } from "./api/dashboardApi";

export const server = import.meta.env.VITE_SERVER;

export const store = configureStore({
  reducer: {
    [userAPI.reducerPath]: userAPI.reducer,
    [productAPI.reducerPath]: productAPI.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    [dashboardApi.reducerPath]: dashboardApi.reducer,
    [userReducer.name]: userReducer.reducer,
    [cartRuducer.name]: cartRuducer.reducer,
  },
  // middleware: (mid) =>[...mid(), userAPI.middleware, productAPI.middleware],
  middleware: (mid) =>
    mid().concat(
      userAPI.middleware,
      productAPI.middleware,
      orderApi.middleware,
      dashboardApi.middleware,
    ),
});

export type RootState = ReturnType<typeof store.getState>;
