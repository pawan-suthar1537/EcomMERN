import { createSlice } from "@reduxjs/toolkit";

const Shopproductslice = createSlice({
  name: "shop",
  initialState: {
    shopproductlist: [],
  },
  reducers: {
    setshopproductlist: (state, action) => {
      state.shopproductlist = action.payload;
    },
  },
});

export const { setshopproductlist } = Shopproductslice.actions;
export default Shopproductslice.reducer;
