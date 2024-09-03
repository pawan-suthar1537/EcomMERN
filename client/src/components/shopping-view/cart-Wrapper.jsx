import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import UsercartItemscontent from "./cart-items-content";

function UsercartWrapper({ cartitems }) {
  console.log("cartitems in UsercartWrapper ", cartitems);
  return (
    <SheetContent className="sm:max-w-md">
      <SheetHeader>
        <SheetTitle className="text-3xl">Your Cart</SheetTitle>
      </SheetHeader>
      <div className="mt-8 space-y-4">
        {cartitems && cartitems.length > 0 ? (
          cartitems.map((item) => (
            <UsercartItemscontent key={item.id || item.title} cartitems={item} />
          ))
        ) : (
          <p>Your cart is empty</p>
        )}
      </div>
      <div className="mt-8 space-y-4">
        <div className="flex justify-between">
          <span className="font-bold">Total</span>
          <span className="font-bold">10000</span>
        </div>
      </div>
      <Button className="w-full mt-6">Checkout</Button>
    </SheetContent>
  );
}

export default UsercartWrapper;
