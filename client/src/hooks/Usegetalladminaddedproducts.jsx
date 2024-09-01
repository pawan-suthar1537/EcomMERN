import { API_URL } from "@/config";
import { setproducts } from "@/store/admin-product-slice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const Usegetalladminaddedproducts = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchallproducts = async () => {
      try {
        const res = await axios.get(
          `${API_URL}/api/admin/products/get-products`,
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );

        if (res.data.success) {
          dispatch(setproducts(res.data.data));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchallproducts();
  }, [dispatch]);
};

export default Usegetalladminaddedproducts;
