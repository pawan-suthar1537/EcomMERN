import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import UsercartItemscontent from "./cart-items-content";
import { Link } from "react-router-dom";

function UsercartWrapper({ cartitems, setopencartsheet }) {
  console.log("cartitems in UsercartWrapper ", cartitems);
  const tottalprice = cartitems?.items?.reduce(
    (total, item) =>
      total +
      (item.saleprice > 0 ? item.saleprice : item.price) * item.quantity,
    0
  );
  return (
    <SheetContent className="sm:max-w-md">
      <SheetHeader>
        <SheetTitle className="text-3xl">Your Cart</SheetTitle>
      </SheetHeader>
      <div className="mt-8 space-y-4">
        {cartitems && cartitems?.items?.length > 0 ? (
          cartitems?.items?.map((item) => (
            <UsercartItemscontent
              key={item._id}
              item={item}
              userid={cartitems.userid}
            />
          ))
        ) : (
          <p>Your cart is empty</p>
        )}
      </div>
      {cartitems && cartitems?.items?.length > 0 ? (
        <div className="mt-8">
          <div className="mt-8 space-y-4">
            <div className="flex justify-between">
              <span className="font-bold">Total</span>
              <span className="font-bold">{tottalprice}</span>
            </div>
          </div>
          <Button className="w-full mt-8">Checkout</Button>
        </div>
      ) : (
        <>
          <div className="flex flex-col items-center justify-center">
            <DotLottieReact
              src="https://lottie.host/ea974d96-82f5-4039-99e7-3057681def8c/VdaLhEfXnc.json"
              loop
              autoplay
              className=""
            />
          </div>
          <Link to="/shop/home">
            <div className="" onClick={() => setopencartsheet(false)}>
              <Button className="w-full">Continue Shopping</Button>
            </div>
          </Link>
        </>
      )}
    </SheetContent>
  );
}

export default UsercartWrapper;
