import Address from "@/components/shopping-view/address";
import UsercartItemscontent from "@/components/shopping-view/cart-items-content";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";

function ShoppingCheckout() {
  const { cartitems } = useSelector((state) => state.cart);
  console.log("cartitems in checkout page=>>>>>>>>>>>>>", cartitems);
  const tottalprice = cartitems?.items?.reduce(
    (total, item) =>
      total +
      (item.saleprice > 0 ? item.saleprice : item.price) * item.quantity,
    0
  );

  return (
    <div className="flex flex-col  mx-auto ">
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
        <Address />
        <div className="flex flex-col gap-4 mt-10 ">
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
          <Button className="w-full">Place Order</Button>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCheckout;
