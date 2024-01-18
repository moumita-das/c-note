import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getError } from "../../helper/parseError";

const backendUrlBase = "http://127.0.0.1:8000";
const config = {
  headers: {
    "Content-Type": "application/json",
  },
};
export const registerUser = createAsyncThunk(
  "auth/register",
  async ({ email, password, first_name, last_name }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${backendUrlBase}/create_account`,
        { email, password, first_name, last_name },
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(getError(error));
    }
  }
);

export const sendOTP = createAsyncThunk(
  "auth/sendOTP",
  async ({ email }, { rejectWithValue }) => {
    try {
      await axios.post(`${backendUrlBase}/send_otp`, { email }, config);
    } catch (error) {
      return rejectWithValue(getError(error));
    }
  }
);

export const verifyOTP = createAsyncThunk(
  "auth/verifyOTP",
  async ({ email, otp }, { rejectWithValue }) => {
    try {
      await axios.post(`${backendUrlBase}/verify_otp`, { email, otp }, config);
    } catch (error) {
      return rejectWithValue(getError(error));
    }
  }
);
