"use client";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

const API_BASE_URL = "https://lssc-api.devloperhemant.com/";

// Get trainer stats
export const getallstats = createAsyncThunk(
  "stats/getall",
  async (_, { rejectWithValue }) => {
    const token = Cookies.get("token");
    if (!token) {
      return rejectWithValue({ message: "Unauthorized: No token found" });
    }

    try {
      const { data } = await axios.get(
        `${API_BASE_URL}api/assessor/reports/assessor-stats`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Stats fetched:", data);
      return data;
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  }
);

// Initial state
const initialState = {
  stats: null,
  loading: false,
  error: null,
};

// Slice
const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getallstats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getallstats.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload;
      })
      .addCase(getallstats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch stats";
      });
  },
});

export default dashboardSlice.reducer;
