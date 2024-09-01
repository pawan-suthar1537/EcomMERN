import { createSlice } from "@reduxjs/toolkit";

const Adminproductaslice = createSlice({
  name: "adminproduct",
  initialState: {
    products: [],
    // product: null,
  },
  reducers: {
    setproducts: (state, action) => {
      // console.log("action.payload", action.payload);
      state.products = action.payload;
    },
  },
});

export const { setproducts } = Adminproductaslice.actions;
export default Adminproductaslice.reducer;
