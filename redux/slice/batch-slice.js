"use client";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

const API_BASE_URL = "https://lssc-api.devloperhemant.com/";

export const getallbatch = createAsyncThunk(
  "batch/getall",
  async (_, { rejectWithValue }) => {
    const token = Cookies.get("token");
    if (!token) {
      return rejectWithValue({ message: "Unauthorized: No token found" });
    }

    try {
      const { data } = await axios.get(`${API_BASE_URL}api/assessor/batch`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      console.log("batch fetched:", data);
      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue({
        message: error?.response?.data?.message || "Failed to fetch",
      });
    }
  }
);

const initialState = {
  batches: [],
  loading: false,
  error: null,
};

const batchSlice = createSlice({
  name: "batch",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getallbatch.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getallbatch.fulfilled, (state, action) => {
        state.loading = false;
        state.batches = action.payload?.data || [];
      })
      .addCase(getallbatch.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch categories";
      });
  },
});

export default batchSlice.reducer;
