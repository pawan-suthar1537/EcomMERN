import ProductFilter from "@/components/shopping-view/filter";
import ShoppingProducttile from "@/components/shopping-view/Product-tile";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { productsortoptions } from "@/config";

import UsegetallShopProducts from "@/hooks/Usegetallshopproducts";
import { ArrowDown } from "lucide-react";
import { useSelector } from "react-redux";

function ShoppingListing() {
  // fetch all products added by admin for sell
  UsegetallShopProducts();
  const { shopproductlist } = useSelector((state) => state.shop);

  return (
    <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6 p-4 md:p-6">
      <ProductFilter />
      <div className="bg-background rounded-lg shadow-sm w-full">
        <div className="p-4 borderb-b flex  items-center justify-between">
          <h2 className="text-lg font-extrabold ">All Products</h2>
          <div className="flex items-center  gap-3">
            <span className="text-muted-foreground">
              {shopproductlist?.length} products
            </span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  className="flex items-center gap-1"
                  variant="outline"
                  size="sm"
                >
                  <ArrowDown className="h-4 w-4" />
                  <span>Sort by</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuRadioGroup>
                  {productsortoptions.map((sortitem) => (
                    <DropdownMenuRadioItem
                      key={sortitem.id}
                      value={sortitem.id}
                    >
                      {sortitem.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4  md:grid-cols-3 gap-4">
          {shopproductlist && shopproductlist.length > 0
            ? shopproductlist.map((item) => (
                <ShoppingProducttile key={item} product={item} />
              ))
            : null}
        </div>
      </div>
    </div>
  );
}

export default ShoppingListing;
