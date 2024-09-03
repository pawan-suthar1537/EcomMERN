import { Minus, Plus, Trash } from "lucide-react";
import { Button } from "../ui/button";

function UsercartItemscontent({ cartitems }) {
  console.log("cartitems in UsercartItemscontent ", cartitems);
  return (
    <div className="flex items-center space-x-4">
      <img
        src={cartitems?.image}
        alt={cartitems?.title}
        className="w-20 h-20 object-cover"
      />
      <div className="flex-1">
        <h3 className="font-extrabold">{cartitems?.title}</h3>
        <div className="flex items-center mt-1 gap-2">
          <Button
            variant="outline"
            size="icon"
            className="mr-2 h-8 w-8 rounded-full"
          >
            <Minus className="w-4 h-4" />
            <span className="sr-only">Descrese</span>
          </Button>
          <span className="font-semibold">{cartitems?.quantity}</span>
          <Button
            variant="outline"
            size="icon"
            className="mr-2 h-8 w-8 rounded-full"
          >
            <Plus className="w-4 h-4" />
            <span className="sr-only">Increment</span>
          </Button>
        </div>
      </div>
      <div className="flex items-end flex-col">
        <p className="font-semibold">
          {(
            (cartitems?.saleprice > 0
              ? cartitems?.saleprice
              : cartitems?.price) * cartitems.quantity
          ).toFixed(2)}
        </p>
        <Trash className="w-6 h-6 cursor-pointer text-red-500" />
      </div>
    </div>
  );
}

export default UsercartItemscontent;
