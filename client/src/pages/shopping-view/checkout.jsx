import Address from "@/components/shopping-view/address";
import UsercartItemscontent from "@/components/shopping-view/cart-items-content";
import { Button } from "@/components/ui/button";
import { createorder } from "@/store/order-slice";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

function ShoppingCheckout() {
  const { cartitems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const { approvedurl } = useSelector((state) => state.order);
  const [currentselectedaddress, setcurrentselectedaddress] = useState(null);
  const [ispaymentstart, setispaymentstart] = useState(false);
  console.log(
    "currentselectedaddress in checkout page=>>>>>>>>>>>>>",
    currentselectedaddress
  );
  const dispatch = useDispatch();

  console.log("cartitems in checkout page=>>>>>>>>>>>>>", cartitems);
  const tottalprice = cartitems?.items?.reduce(
    (total, item) =>
      total +
      (item.saleprice > 0 ? item.saleprice : item.price) * item.quantity,
    0
  );

  const handleinitialpayment = () => {
    const orderdata = {
      userid: user?._id,
      cartitems: cartitems?.items?.map((item) => ({
        productid: item.productid,

        title: item.title,
        price: item.saleprice > 0 ? item.saleprice : item.price,
        quantity: item.quantity,
        image: item.image,
      })),
      addressinfo: {
        addressid: currentselectedaddress?._id,
        address: currentselectedaddress?.address,
        city: currentselectedaddress?.city,
        state: currentselectedaddress?.state,
        pincode: currentselectedaddress?.pincode,
        phone: currentselectedaddress?.phone,
        additionalinfo: currentselectedaddress?.additionalinfo,
      },
      status: "pending",
      paymentmethod: "paypal",
      paymentstatus: "pending",
      totalamount: tottalprice,
      orderdate: new Date(),
      orderupdatedate: new Date(),
      paymentid: "",
      payerid: "",
    };
    console.log("orderdata in checkout page=>>>>>>>>>>>>>", orderdata);
    console.log(
      "addressinfo in checkout page=>>>>>>>>>>>>>",
      orderdata.addressinfo
    );
    dispatch(createorder(orderdata)).then((res) => {
      console.log("res in checkout page=>>>>>>>>>>>>>", res);
      if (res.payload.success === true) {
        setispaymentstart(true);
        toast.success("Order placed successfully!");
      } else {
        setispaymentstart(false);
        toast.error("Failed to place the order.");
      }
    });
  };

  if (approvedurl) {
    window.location.href = approvedurl;
  }

  return (
    <div className="flex flex-col   ">
      <div className="relative h-[350px] w-full overflow-hidden rounded-lg mb-8">
        <img
          src="https://images.pexels.com/photos/1005644/pexels-photo-1005644.jpeg"
          alt="Checkout"
          className="object-cover object-center h-full w-full"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <h1 className="text-4xl font-bold text-white">Checkout</h1>
        </div>
      </div>
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-6">Select Address</h2>
        <Address setcurrentselectedaddress={setcurrentselectedaddress} />
        <div className="flex flex-col gap-4 mt-10 ">
          <h1 className="text-3xl font-bold mb-10">Your Cart Items</h1>
          {cartitems && cartitems.items.length > 0 ? (
            cartitems.items.map((cartitem) => (
              <UsercartItemscontent
                key={cartitem._id}
                item={cartitem}
                userid={cartitems.userid}
              />
            ))
          ) : (
            <div>
              <h1>No items in the cart</h1>
            </div>
          )}
        </div>
        <div className="mt-8 space-y-4">
          <div className="flex justify-between">
            <span className="font-bold">Total</span>
            <span className="font-bold">{tottalprice}</span>
          </div>
        </div>
        <div className="mt-10 w-full">
          <Button onClick={handleinitialpayment} className="w-full">
            Place Order
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCheckout;
