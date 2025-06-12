"use client";
import {
  createAsyncThunk,
  createSlice,
  rejectWithValue,
} from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import toast from "react-hot-toast";

const NEXT_PUBLIC_API_URL = "https://lssc-api.devloperhemant.com/";
console.log(NEXT_PUBLIC_API_URL);

// OTP Send Thunk
export const Otpsend = createAsyncThunk(
  "auth/otpsend",
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${NEXT_PUBLIC_API_URL}api/auth/otp`,
        formData
      );
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(
        error.response?.data?.message || "Otp sent failed"
      );
    }
  }
);

// Login Thunk
export const loginuser = createAsyncThunk(
  "auth/loginuser",
  async (obj, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${NEXT_PUBLIC_API_URL}api/auth/login`,
        obj
      );
      console.log(data);

      const role = data?.data?.role;
      const token = data.token;
      console.log(token);

      Cookies.set("token", token, { expires: 6 });
      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(
        error.response?.data?.message || "Otp sent failed"
      );
    }
  }
);

const token = Cookies.get("token");

const initialState = {
  user: {},
  token: token || null,
  loading: false,
  error: null,
  isAuthenticated: false,
};

export const authSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    logout: (state) => {
      Cookies.remove("token");
      toast.success("user logout successfully");
      state.user = {};
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(Otpsend.pending, (state) => {
        state.loading = true;
      })
      .addCase(Otpsend.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(Otpsend.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || null;
      })
      .addCase(loginuser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginuser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.error = null;
        state.isAuthenticated = true;
      })
      .addCase(loginuser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || null;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
