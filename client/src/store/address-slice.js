import { API_URL } from "@/config";
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "sonner";

export const fetchAddresses = (userId) => async (dispatch) => {
  try {
    const getRes = await axios.get(
      `${API_URL}/api/shop/address/get/${userId}`,
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );
    
    dispatch(setAddress(getRes.data.data));
  } catch (error) {
    console.error(error);
  }
};

export const addNewAddress = (formData, userId) => async (dispatch) => {
  try {
    const addRes = await axios.post(
      `${API_URL}/api/shop/address/add`,
      {
        ...formData,
        userid: userId,
      },
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );

    if (addRes.data.success) {
      toast.success(addRes.data.message);
      dispatch(fetchAddresses(userId));
    }
  } catch (error) {
    console.error(error);
    toast.error("Error adding address");
  }
};

export const updateExistingAddress =
  (formData, userId, addressId) => async (dispatch) => {
    try {
      const editRes = await axios.put(
        `${API_URL}/api/shop/address/edit/${userId}/${addressId}`,
        {
          ...formData,
          userid: userId,
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (editRes.data.success) {
        toast.success(editRes.data.message);
        dispatch(updateAddressInState(editRes.data.data));
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };

export const deleteExistingAddress =
  (userId, addressId) => async (dispatch) => {
    try {
      const deleteRes = await axios.delete(
        `${API_URL}/api/shop/address/delete/${userId}/${addressId}`,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (deleteRes.data.success) {
        toast.success(deleteRes.data.message);
        dispatch(deleteAddressInState(addressId));
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };

const addressSlice = createSlice({
  name: "address",
  initialState: {
    addresses: [],
  },

  reducers: {
    setAddress: (state, action) => {
      state.addresses = action.payload;
    },
    updateAddressInState: (state, action) => {
      state.addresses = state.addresses.map((address) =>
        address._id === action.payload._id ? action.payload : address
      );
    },
    deleteAddressInState: (state, action) => {
      state.addresses = state.addresses.filter(
        (address) => address._id !== action.payload
      );
    },
  },
});

export const { setAddress, updateAddressInState, deleteAddressInState } =
  addressSlice.actions;

export default addressSlice.reducer;
