import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchRegister = createAsyncThunk(
  "auth/fetchRegister",
  async (params) => {
    const { data } = await axios.post("/auth/registration", params);
    return data;
  }
);

export const fetchAuth = createAsyncThunk("auth/fetchAuth", async (params) => {
  const { data } = await axios.post("/auth/login", params);
  return data;
});

export const fetchAuthMe = createAsyncThunk("auth/fetchAuthMe", async () => {
  const { data } = await axios.get("/auth/getMe");
  return data;
});

export const fetchAllUsers = createAsyncThunk(
  "auth/fetchAllUsers",
  async () => {
    const { data } = await axios.get("/auth/users");
    return data;
  }
);

const initialState = {
  data: null,
  user: null,
  allUsers: [],
  status: "loading",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null;
      state.user = null;
    },
  },
  extraReducers: {
    [fetchRegister.pending]: (state) => {
      state.data = null;
      state.user = null;
      state.status = "loading";
    },
    [fetchRegister.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.user = action.payload.user;
      state.status = "loaded";
    },
    [fetchRegister.rejected]: (state) => {
      state.data = null;
      state.user = null;
      state.status = "error";
    },
    [fetchAuth.pending]: (state) => {
      state.data = null;
      state.user = null;
      state.status = "loading";
    },
    [fetchAuth.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.user = action.payload.user;
      state.status = "loaded";
    },
    [fetchAuth.rejected]: (state) => {
      state.data = null;
      state.user = null;
      state.status = "error";
    },
    [fetchAuthMe.fulfilled]: (state, action) => {
      state.user = action.payload;
      state.status = "loaded";
    },
    [fetchAuthMe.rejected]: (state) => {
      state.user = null;
      state.status = "error";
    },
    [fetchAllUsers.pending]: (state) => {
      state.allUsers = [];
      state.status = "loading";
    },
    [fetchAllUsers.fulfilled]: (state, action) => {
      state.allUsers = action.payload;
      state.status = "loaded";
    },
    [fetchAllUsers.rejected]: (state) => {
      state.allUsers = [];
      state.status = "error";
    },
  },
});

export const selectIsAuth = (state) => Boolean(state.auth.user);

export const authReducer = authSlice.reducer;

export const { logout } = authSlice.actions;
