import { createSlice } from "@reduxjs/toolkit";

const authslice = createSlice({
  name: "auth",
  initialState: {
    isAuth: false,
    user: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setUser } = authslice.actions;
export default authslice.reducer;
