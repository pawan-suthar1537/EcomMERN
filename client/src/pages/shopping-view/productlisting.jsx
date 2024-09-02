import ProductFilter from "@/components/shopping-view/filter";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { productsortoptions } from "@/config";
import { ArrowDown } from "lucide-react";

function ShoppingListing() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6 p-4 md:p-6">
      <ProductFilter />
      <div className="bg-background rounded-lg shadow-sm w-full">
        <div className="p-4 borderb-b flex  items-center justify-between">
          <h2 className="text-lg font-extrabold ">All Products</h2>
          <div className="flex items-center  gap-3">
            <span className="text-muted-foreground">10 products</span>
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
      </div>
    </div>
  );
}

export default ShoppingListing;
