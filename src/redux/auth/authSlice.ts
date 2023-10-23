import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
}
const initialState = {
  isAuthenticated: false as boolean,
  isLoading: true,
} as AuthState;

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state) => {
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.isAuthenticated = false;
    },
    finishInitialLoad: (state) => {
      state.isLoading = true;
    },
  },
});

export const { setAuth, logout, finishInitialLoad } = authSlice.actions;
export const isAuthenticated = (state: RootState) => state.auth.isAuthenticated;
export default authSlice.reducer;
