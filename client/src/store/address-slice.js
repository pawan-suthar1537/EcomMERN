import { createSlice } from "@reduxjs/toolkit";

const addressSlice = createSlice({
  name: "address",
  initialState: {
    addresses: [],
  },
  reducers: {
    setAddress: (state, action) => {
      state.addresses = action.payload;
    },
    updateAddress: (state, action) => {
      state.addresses = state.addresses.map((address) =>
        address._id === action.payload._id ? action.payload : address
      );
    },
    deleteAddress: (state, action) => {
      state.addresses = state.addresses.filter(
        (address) => address._id !== action.payload
      );
    },
  },
});

export const { setAddress, updateAddress, deleteAddress } =
  addressSlice.actions;

export default addressSlice.reducer;
