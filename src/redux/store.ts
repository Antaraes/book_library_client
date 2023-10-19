import { configureStore } from "@reduxjs/toolkit";
import bookSlice from "./book/bookSlice";
import authReducer from "./auth/authSlice";

export const store = configureStore({
  reducer: { book: bookSlice, auth: authReducer },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
