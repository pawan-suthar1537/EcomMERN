import { API_URL } from "@/config";

import { setshopproductlist } from "@/store/shop-slice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const UsegetallShopProducts = ({ filterparams, sortparams }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchallshopproducts = async () => {
      try {
        const query = new URLSearchParams({
          ...filterparams,
          sortby: sortparams,
        });
        const res = await axios.get(`${API_URL}/api/shop/get?${query}`, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });

        if (res.data.success) {
          dispatch(setshopproductlist(res.data.data));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchallshopproducts();
  }, [filterparams, sortparams]);
};

export default UsegetallShopProducts;
