import { X } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Separator } from "../ui/separator";
import axios from "axios";
import { API_URL } from "@/config";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setcartitem } from "@/store/cart-slice";
import { useEffect } from "react";
import { setshopproductdetails } from "@/store/shop-slice";

function ProductDetailsbyidDialog({
  open,
  setopenchange,
  productdetails,
  productId,
}) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (open && productId) {
      // Fetch product details using productId if not already available
      if (!productdetails || productdetails._id !== productId) {
        fetchProductDetails(productId);
      }
    }
  }, [open, productId]);

  const fetchProductDetails = async (id) => {
    try {
      const res = await axios.get(`${API_URL}/api/shop/get/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setshopproductdetails(res.data.data));
      }
    } catch (error) {
      console.log(error);
    }
  };

  async function handletocart(id) {
    try {
      const res = await axios.post(`${API_URL}/api/shop/cart/addtocart`, {
        userid: user._id,
        productid: id,
        quantity: 1,
      });

      if (res.data.success) {
        toast.success("added to cart");
        // Yahan par hum seedha cart update kar rahe hain
        const updatedCartRes = await axios.get(
          `${API_URL}/api/shop/cart/fetchcartitem/${user._id}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        if (updatedCartRes.data.success) {
          dispatch(setcartitem(updatedCartRes.data.data));
        }
      } else {
        toast.error("failed add to cart");
      }
    } catch (error) {
      console.log(error);
      toast.error("failed add to cart");
    }
  }

  return (
    <Dialog open={open} setOpenChange={setopenchange}>
      <DialogContent className="grid grid-cols-2 gap-8 sm:p-12 max-w-[90vw] sm:max-w-[80vw] lg:max-w-[70vw]">
        <div className="relative overflow-hidden rounded-lg">
          <img
            src={productdetails?.image}
            alt={productdetails?.title}
            width={600}
            height={600}
            className="aspect-square object-cover w-full"
          />
        </div>
        <div className=" ">
          <div>
            <h1 className="text-3xl font-extrabold">{productdetails?.title}</h1>
            <Button
              size="icon"
              onClick={() => setopenchange(false)}
              className=" z-50 cursor-pointer font-bold text-black text-lg  hover:bg-white bg-white absolute top-[2px] right-[5px]"
            >
              X
            </Button>
            <p className="text-muted-foreground text-2xl mb-5 mt-4">
              {productdetails?.description}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <p
              className={`${
                productdetails?.saleprice > 0 ? "line-through" : ""
              } text-3xl font-bold text-primary`}
            >
              {productdetails?.price}
            </p>
            {productdetails?.saleprice > 0 ? (
              <p className="text-2xl font-bold text-muted-foreground">
                {productdetails?.saleprice}
              </p>
            ) : null}
          </div>
          <div className="mt-5 mb-5">
            <Button
              className="w-full"
              onClick={() => {
                setopenchange(false);
                handletocart(productdetails?._id);
              }}
            >
              Add to Cart
            </Button>
          </div>
          <Separator />
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ProductDetailsbyidDialog;
