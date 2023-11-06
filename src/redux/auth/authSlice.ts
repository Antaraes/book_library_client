import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import api from "../../api/book.api";
import Cookies from "universal-cookie";
interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  userInfo: Object | null;
  user: null;
  isError: null;
}
const initialState = {
  isLoading: false,
  userInfo: {},
  user: null,
  isError: null,
  isAuthenticated: false,
} as AuthState;
const cookies = new Cookies();
const userToken = cookies.get("user") ? cookies.get("user") : null;
export const fetchUserLogin = createAsyncThunk(
  "auth/login",
  async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await api.post("/auth/login", { email, password });
      cookies.set("user", response.data.data.session.access_token);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state) => {
      state.isAuthenticated = true;
    },
    finishInitialLoad: (state) => {
      state.isLoading = true;
    },
    logout: (state) => {
      cookies.remove("user");
      state.isLoading = false;
      state.userInfo = null;
      state.user = null;
      state.isError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserLogin.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
        console.log("pending");
      })
      .addCase(fetchUserLogin.fulfilled, (state, actions) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.userInfo = actions.payload;
        state.user = actions.payload.user;
        console.log("Fetch Success");
      })
      .addCase(fetchUserLogin.rejected, (state) => {
        state.isLoading = false;
        console.log("Fetch Failed");
      });
  },
});

export const { setAuth, logout, finishInitialLoad } = authSlice.actions;
export const isAuthenticated = (state: RootState) => state.auth.isAuthenticated;
export default authSlice.reducer;
