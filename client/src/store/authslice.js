import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isauth: false,
    token: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isauth = true;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.isauth = false;
      state.token = null;
    },
  },
});

export const { setUser, logout, setToken } = authSlice.actions;
export default authSlice.reducer;
