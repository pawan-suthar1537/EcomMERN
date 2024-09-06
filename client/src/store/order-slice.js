import { API_URL } from "@/config";
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "sonner";

export const createorder = (orderData) => async (dispatch) => {
  try {
    const response = await axios.post(
      `${API_URL}/api/shop/order/createorder`,
      orderData,
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );
    console.log(response.data);
    if (response.data.success === true) {
      toast.success(response.data.message);
      dispatch(setOrderDetails(response.data));
    }
  } catch (error) {
    console.error(error);
    toast.error("Error creating order");
  }
};

const initialState = {
  orders: [],

  orderid: null,
  approvedurl: null,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOrderDetails: (state, action) => {
      state.orderid = action.payload.orderid;
      state.approvedurl = action.payload.approvedurl;
      state.orders = action.payload.orders;
    },
  },
});

export const { setOrderDetails } = orderSlice.actions;
export default orderSlice.reducer;
