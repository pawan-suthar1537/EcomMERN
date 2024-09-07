import { HouseIcon, LogOut, Menu, ShoppingCart, User2Icon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { API_URL, menuitems } from "@/config";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger, // Ensure this is imported from the same module as DropdownMenu
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import axios from "axios";
import { logout } from "@/store/authslice";
import { toast } from "sonner";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import UsercartWrapper from "./cart-Wrapper";
import { useState, useEffect } from "react";
import { setcartitem } from "@/store/cart-slice";

function Menuitems() {
  return (
    <nav className="flex flex-col mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row">
      {menuitems.map((item) => (
        <Link key={item.id} to={item.path} className="text-sm font-medium">
          {item.label}
        </Link>
      ))}
    </nav>
  );
}

function Headerrightcontent() {
  const { user } = useSelector((state) => state.auth);
  const [opencartsheet, setopencartsheet] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartitems } = useSelector((state) => state.cart);

  useEffect(() => {
    // Fetch cart items from API or local storage
    const fetchCartItems = async () => {
      try {
        // Replace this with your actual API call
        const response = await axios.get(`${API_URL}/api/cart`, {
          withCredentials: true,
        });

        dispatch(setcartitem(response.data.items));
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    fetchCartItems();
  }, [dispatch]);

  const handlelogout = async () => {
    try {
      const res = await axios.post(
        `${API_URL}/api/auth/logout`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res.status === 200) {
        toast.success("Logout successful");
        dispatch(logout());
        navigate("/auth/login");
      } else {
        throw new Error("Logout failed");
      }
    } catch (error) {
      console.error(error);
      toast.error("Logout failed");
    }
  };

  return (
    <div className="flex lg:items-center lg:flex-row flex-col gap-4">
      <Sheet open={opencartsheet} onOpenChange={() => setopencartsheet(false)}>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setopencartsheet(true)}
        >
          <ShoppingCart className="w-6 h-6" />
          <span className="sr-only">User cart</span>
        </Button>
        <UsercartWrapper
          setopencartsheet={setopencartsheet}
          cartitems={cartitems}
        />
      </Sheet>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="bg-black cursor-pointer">
            <AvatarFallback className="bg-black text-white font-extrabold">
              {user?.username?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="right" className="w-56">
          <DropdownMenuLabel className="flex">
            Logged as {user?.username}{" "}
            <DotLottieReact
              src="https://lottie.host/bb028bc5-4f9b-41f1-92eb-de4e41840eed/lLxcEGFwUC.json"
              hover
              autoplay
              className="w-6 h-6"
            />
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => navigate("/shop/account")}
            className="cursor-pointer"
          >
            <User2Icon className="mr-2 h-4 w-4 " />
            Account
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handlelogout} className="cursor-pointer">
            <LogOut className="mr-2 h-4 w-4 " />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

function ShoppingHeader() {
  const { isauth } = useSelector((state) => state.auth);

  return (
    <header className="sticky top-0 w-full flex items-center justify-between px-4 py-3 bg-background border-b">
      <div className="flex items-center justify-between w-full">
        {/* Left Section - Ecommerce Logo */}
        <div className="flex items-center gap-2">
          <Link to="/shop/home" className="flex items-center gap-2">
            <HouseIcon className="w-6 h-6" />
            <span className="font-bold">Ecommerce</span>
          </Link>
        </div>

        {/* Center Section - Menu Items */}
        <div className="hidden lg:flex justify-center flex-grow">
          <Menuitems />
        </div>

        {/* Right Section - User/Cart Content */}
        <div className="flex items-center ">
          <div className="hidden lg:block">
            {isauth ? <Headerrightcontent className="" /> : null}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden ml-4">
            <Sheet>
              <SheetTrigger asChild>
                <Button className="lg:hidden" variant="outline" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-full max-w-xs">
                <Menuitems />
                <Headerrightcontent />
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}

export default ShoppingHeader;
