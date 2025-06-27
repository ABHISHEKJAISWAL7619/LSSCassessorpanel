import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slice/auth-slice";
import userSlice from "./slice/user-slice";
import batchSlice from "./slice/batch-slice";
import AssementSlice from "./slice/Assesment-slice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    user: userSlice,
    batch: batchSlice,
    assesment: AssementSlice,
  },
});
