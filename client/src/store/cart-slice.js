import { createSlice } from "@reduxjs/toolkit";

const cartslice = createSlice({
  name: "cart",
  initialState: {
    cartitems: [],
  },
  reducers: {
    setcartitem: (state, action) => {
      state.cartitems = action.payload;
    },
  },
});

export const { setcartitem } = cartslice.actions;
export default cartslice.reducer;
