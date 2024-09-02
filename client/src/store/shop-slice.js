import { createSlice } from "@reduxjs/toolkit";

const Shopproductslice = createSlice({
  name: "shop",
  initialState: {
    shopproductlist: [],
    shopproductdetails: null,
  },
  reducers: {
    setshopproductlist: (state, action) => {
      state.shopproductlist = action.payload;
    },
    setshopproductdetails: (state, action) => {
      state.shopproductdetails = action.payload;
    },
  },
});

export const { setshopproductlist, setshopproductdetails } =
  Shopproductslice.actions;
export default Shopproductslice.reducer;
