import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import MAIN_URL from "../url/Urls";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${MAIN_URL}/login`, credentials);
      localStorage.setItem("token", response.data.token);
      window.location.href = "/createUser";
      return response.data.token;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);
export const checkLogin = createAsyncThunk(
  "auth/checkLogin",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }
      return true;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const logOutUser = createAsyncThunk("auth/logOutUser", async () => {
  localStorage.removeItem("token");
  return "Logged out successfully";
});

const initialState = {
  token: localStorage.getItem("token"),
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(checkLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkLogin.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(checkLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;
