"use client";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

const API_BASE_URL = "https://lssc-api.devloperhemant.com/";

export const createbatchAssessment = createAsyncThunk(
  "create/batchAssessment",
  async (formData, { rejectWithValue }) => {
    const token = Cookies.get("token");
    if (!token) {
      return rejectWithValue({ message: "Unauthorized: No token found" });
    }

    try {
      const { data } = await axios.post(
        `${API_BASE_URL}api/assessor/batchAssessment`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("batchAssessment fetched:", data);
      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue({
        message: error?.response?.data?.message || "Failed to fetch",
      });
    }
  }
);

export const getallbatchAssessment = createAsyncThunk(
  "create/batchAssessment",
  async ({ filter }={}, { rejectWithValue }) => {
    const token = Cookies.get("token");
    if (!token) {
      return rejectWithValue({ message: "Unauthorized: No token found" });
    }

    try {
      const { data } = await axios.get(
        `${API_BASE_URL}api/assessor/batchAssessment`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          params: filter,
        }
      );
      console.log("batchAssessment fetched:", data);
      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue({
        message: error?.response?.data?.message || "Failed to fetch",
      });
    }
  }
);

export const deletebatchAssessment = createAsyncThunk(
  "delete/batchAssessment",
  async (id, { rejectWithValue }) => {
    const token = Cookies.get("token");
    if (!token) {
      return rejectWithValue({ message: "Unauthorized: No token found" });
    }

    try {
      const { data } = await axios.delete(
        `${API_BASE_URL}api/assessor/batchAssessment/${id}`,

        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("batchAssessment deleted:", data);
      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue({
        message: error?.response?.data?.message || "Failed to delete",
      });
    }
  }
);

const initialState = {
  assesment: [],
  loading: false,
  error: null,
};

const AssesmentSlice = createSlice({
  name: "assesment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(getallbatchAssessment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getallbatchAssessment.fulfilled, (state, action) => {
        state.loading = false;
        state.assesment = action.payload?.data || [];
      })
      .addCase(getallbatchAssessment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch categories";
      });
  },
});

export default AssesmentSlice.reducer;
