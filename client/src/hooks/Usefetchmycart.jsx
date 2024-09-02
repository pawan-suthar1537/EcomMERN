import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setcartitem } from "@/store/cart-slice";
import { API_URL } from "@/config";

function Usefetchmycart(userId) {
  const dispatch = useDispatch();

  useEffect(() => {
    if (userId) {
      const fetchCart = async () => {
        try {
          const res = await axios.get(
            `${API_URL}/api/shop/cart/fetchcartitem/${userId}`,
            {
              headers: {
                "Content-Type": "application/json",
              },
              withCredentials: true,
            }
          );
          if (res.data.success) {
            dispatch(setcartitem(res.data.data));
          }
        } catch (error) {
          console.log(error);
        }
      };

      fetchCart();
    }
  }, [userId, dispatch]);
}

export default Usefetchmycart;
