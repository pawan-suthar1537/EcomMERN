import Address from "@/components/shopping-view/address";
import ShoppingOrders from "@/components/shopping-view/order";
import Orders from "@/components/shopping-view/order";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function ShoppingAccount() {
  return (
    <div className="flex flex-col">
      <div className="relative h-[350px] w-full overflow-hidden">
        <img
          loading="lazy"
          src="https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg"
          alt=""
          className="object-center h-full w-full object-cover"
        />
      </div>
      <div className="container mx-auto grid grid-cols-1 gap-8 py-8">
        <div className="flex flex-col rounded-lg border bg-background p-6 shadow-sm">
          <Tabs defaultValue="orders">
            <TabsList>
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="address">Address</TabsTrigger>
              {/* <TabsTrigger value="payment">Payment</TabsTrigger> */}
            </TabsList>
            <TabsContent value="orders">
              <ShoppingOrders />
            </TabsContent>
            <TabsContent value="address">
              <Address />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default ShoppingAccount;
