import { DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";

function ShoppingOrderDetails() {
  return (
    <DialogContent className="sm:max-w-[600px]">
      <DialogHeader>
        <DialogTitle>Order Details</DialogTitle>
      </DialogHeader>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <div className="flex mt-6 items-center justify-between">
            <p className="font-medium">Order ID</p>
            <Label>3456789</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Order Date</p>
            <Label>3456789</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Order Status</p>
            <Label>pending</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Order Price</p>
            <Label>151656</Label>
          </div>
        </div>
        <Separator />
        {/* product details */}
        <div className="grid gap-4">
          <div className="grid gap-3">
            <div className="font-medium">Order Details</div>
            <ul className="grid gap-4 ">
              <li className="flex items-center justify-between">
                <span>productone</span>
                <span>151656</span>
              </li>
            </ul>
          </div>
        </div>
        {/* shipping info */}
        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="font-medium">Shipping Info</div>
            <div className="grid gap-1 text-muted-foreground">
              <span>pawanusername</span>
              <span>address</span>
              <span>city</span>
              <span>state</span>
              <span>pincode</span>
              <span>country</span>
              <span>phone</span>
              <span>additinal info</span>
            </div>
          </div>
        </div>
      </div>
    </DialogContent>
  );
}

export default ShoppingOrderDetails;
