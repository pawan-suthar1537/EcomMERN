import { createSlice } from "@reduxjs/toolkit";

const Adminproductaslice = createSlice({
  name: "adminproduct",
  initialState: {
    products: [],
    // product: null,
  },
  reducers: {
    setproducts: (state, action) => {
    
      state.products = action.payload;
    },
  },
});

export const { setproducts } = Adminproductaslice.actions;
export default Adminproductaslice.reducer;
