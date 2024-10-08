import ProductFilter from "@/components/shopping-view/filter";
import ProductDetailsbyidDialog from "@/components/shopping-view/product-detailsbyid";
import ShoppingProducttile from "@/components/shopping-view/Product-tile";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { API_URL, productsortoptions } from "@/config";

import UsegetallShopProducts from "@/hooks/Usegetallshopproducts";
import { setcartitem } from "@/store/cart-slice";
import { setshopproductdetails } from "@/store/shop-slice";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import axios from "axios";
import { ArrowDown } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";

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
  const { user } = useSelector((state) => state.auth);
  const { shopproductlist, shopproductdetails } = useSelector(
    (state) => state.shop
  );
  // fetch cart items of user

  const { cartitems } = useSelector((state) => state.cart);

  const [filter, setfilter] = useState({});
  const [sort, setsort] = useState(null);
  const [searchParams, setsearchParams] = useSearchParams();
  const [opendetailsdialog, setopendetailsdialog] = useState(false);
  const dispatch = useDispatch();
  UsegetallShopProducts({ filterparams: filter, sortparams: sort });



  const [selectedProductId, setSelectedProductId] = useState(null);

  async function handleaddtocart(id) {
    try {
      const res = await axios.post(`${API_URL}/api/shop/cart/addtocart`, {
        userid: user._id,
        productid: id,
        quantity: 1,
      });
      

      if (res.data.success) {
        toast.success("added to cart");
        // Yahan par hum seedha cart update kar rahe hain
        const updatedCartRes = await axios.get(
          `${API_URL}/api/shop/cart/fetchcartitem/${user._id}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        if (updatedCartRes.data.success) {
          dispatch(setcartitem(updatedCartRes.data.data));
        }
      } else {
        toast.error("failed add to cart");
      }
    } catch (error) {
      console.log(error);
      toast.error("failed add to cart");
    }
  }

  useEffect(() => {
    if (filter && Object.keys(filter).length > 0) {
      const createQstring = createserchparamhelper(filter);
      setsearchParams(new URLSearchParams(createQstring));
    }
  }, [filter, sort]);

  useEffect(() => {
    if (shopproductdetails !== null && opendetailsdialog) {
      setopendetailsdialog(true);
    }
  }, [shopproductdetails]);

  useEffect(() => {
    setsort("price-low-high");
    setfilter(JSON.parse(sessionStorage.getItem("filter")) || {});
  }, []);

  function handlesort(val) {
    setsort(val);
  }

  // useEffect(() => {
  //   const fetchCart = async () => {
  //     if (!user?._id) return;

  //     try {
  //       const res = await axios.get(
  //         `${API_URL}/api/shop/cart/fetchcartitem/${user._id}`,
  //         {
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //           withCredentials: true,
  //         }
  //       );

  //       if (res.data.success) {
  //         dispatch(setcartitem(res.data.data.items));
  //       }
  //     } catch (error) {
  //       console.error("Error fetching cart:", error);
  //     }
  //   };

  //   fetchCart();
  // }, [user?._id, dispatch]);

  function handlefilter(getsecid, curroption) {
   
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
   
    setfilter(copyfilter);
    sessionStorage.setItem("filter", JSON.stringify(copyfilter));
  }

  async function handlegetproductdetailsbyid(getpid) {
    
    try {
      const res = await axios.get(`${API_URL}/api/shop/get/${getpid}`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setshopproductdetails(res.data.data));
        setSelectedProductId(getpid);
        setopendetailsdialog(true);
      }
    } catch (error) {
      console.log(error);
    }
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
              <ShoppingProducttile
                handlegetproductdetailsbyid={handlegetproductdetailsbyid}
                key={item}
                product={item}
                handleaddtocart={handleaddtocart}
              />
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
      <ProductDetailsbyidDialog
        open={opendetailsdialog}
        setopenchange={setopendetailsdialog}
        productdetails={shopproductdetails}
        productId={selectedProductId}
      />
    </div>
  );
}

export default ShoppingListing;
