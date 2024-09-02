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
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { ArrowDown } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

function createserchparamhelper(filterparams) {
  const Qparams = [];

  for (const [key, value] of Object.entries(filterparams)) {
    if (Array.isArray(value) && value.length > 0) {
      const paramval = value.join(",");
      Qparams.push(`${key}=${encodeURIComponent(paramval)}`);
    }
  }
  return Qparams.join("&");
}

function ShoppingListing() {
  // fetch all products added by admin for sell
  const { shopproductlist } = useSelector((state) => state.shop);
  const [filter, setfilter] = useState({});
  const [sort, setsort] = useState(null);
  const [searchParams, setsearchParams] = useSearchParams();
  UsegetallShopProducts({ filterparams: filter, sortparams: sort });

  useEffect(() => {
    if (filter && Object.keys(filter).length > 0) {
      const createQstring = createserchparamhelper(filter);
      setsearchParams(new URLSearchParams(createQstring));
    }
  }, [filter, sort]);

  useEffect(() => {
    setsort("price-low-high");
    setfilter(JSON.parse(sessionStorage.getItem("filter")) || {});
  }, []);

  function handlesort(val) {
    setsort(val);
  }

  function handlefilter(getsecid, curroption) {
    console.log(getsecid, curroption);
    let copyfilter = { ...filter };
    const indexofcurrsec = Object.keys(copyfilter).findIndex(
      (key) => key === getsecid
    );
    if (indexofcurrsec === -1) {
      copyfilter = {
        ...copyfilter,
        [getsecid]: [curroption],
      };
    } else {
      const indexofcurroption = copyfilter[getsecid].findIndex(
        (option) => option === curroption
      );
      if (indexofcurroption === -1) {
        copyfilter[getsecid].push(curroption);
      } else {
        copyfilter[getsecid].splice(indexofcurroption, 1);
      }
    }
    console.log(copyfilter);
    setfilter(copyfilter);
    sessionStorage.setItem("filter", JSON.stringify(copyfilter));
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6 p-4 md:p-6">
      <ProductFilter filter={filter} handlefilter={handlefilter} />
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
                <DropdownMenuRadioGroup value={sort} onValueChange={handlesort}>
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
          {shopproductlist && shopproductlist.length > 0 ? (
            shopproductlist.map((item) => (
              <ShoppingProducttile key={item} product={item} />
            ))
          ) : (
            <div>
              <DotLottieReact
                src="https://lottie.host/3c1e78d2-2de5-42ae-8cee-c521f985e185/VDQgTUr4IW.json"
                loop
                autoplay
                className="w-[900px] h-full"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ShoppingListing;
