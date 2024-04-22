import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import restaurantReducer from "./features/restaurant/restaurantSlice";
import { apiSlice } from "./app/api/apiSlice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    restaurant: restaurantReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
