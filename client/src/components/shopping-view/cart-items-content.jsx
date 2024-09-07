import { Minus, Plus, Trash } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { API_URL } from "@/config";
import { useDispatch } from "react-redux";
import { setcartitem } from "@/store/cart-slice";

function UsercartItemscontent({ item, userid }) {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleQuantityChange = async (newQuantity) => {
    if (loading) return;
    setLoading(true);

    try {
      const response = await axios.put(
        `${API_URL}/api/shop/cart/updatecartitems`,
        {
          userid: userid,
          productid: item?.productid,
          quantity: newQuantity,
        }
      );

      if (response.data.success) {
        toast.success("Cart updated successfully");
        dispatch(setcartitem(response.data.data));
      }
    } catch (error) {
      console.error("Error updating cart:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleremovefromcart = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const response = await axios.delete(
        `${API_URL}/api/shop/cart/deleteitemfromcart/${userid}/${item?.productid}`
      );

      if (response.data.success) {
        toast.success(response.data.message);
        dispatch(setcartitem(response.data.data));
      } else {
        toast.error(response.data.message || "Failed to remove item from cart");
      }
    } catch (error) {
      console.error("Error removing item from cart:", error);
      toast.error("Error removing item from cart");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center space-x-4">
      <img
        src={item?.image}
        alt={item?.title}
        className="w-[70px] h-[70px] object-cover"
      />
      <div className="flex-1">
        <h3 className="font-extrabold">{item?.title}</h3>
        <div className="flex items-center mt-1 gap-2">
          <Button
            variant="outline"
            size="icon"
            className="mr-2 h-8 w-8 rounded-full"
            onClick={() => handleQuantityChange(item.quantity - 1)}
            disabled={loading || item.quantity <= 1}
          >
            <Minus className="w-4 h-4" />
            <span className="sr-only">Decrease</span>
          </Button>
          <span className="font-semibold">{item?.quantity}</span>
          <Button
            variant="outline"
            size="icon"
            className="mr-2 h-8 w-8 rounded-full"
            onClick={() => handleQuantityChange(item.quantity + 1)}
            disabled={loading}
          >
            <Plus className="w-4 h-4" />
            <span className="sr-only">Increase</span>
          </Button>
        </div>
      </div>
      <div className="flex items-end flex-col">
        <p className="font-semibold">
          Rs.
          {(
            (item?.saleprice > 0 ? item?.saleprice : item?.price) *
            item.quantity
          ).toFixed(2)}
        </p>
        <Trash
          className="w-4 h-4 cursor-pointer text-red-500 mt-3"
          onClick={handleremovefromcart}
        />
      </div>
    </div>
  );
}

export default UsercartItemscontent;
