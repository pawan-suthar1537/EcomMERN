import { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
  BabyIcon,
  ChevronLeft,
  ChevronRight,
  HomeIcon,
  Lightbulb,
  User2Icon,
  TagIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import ShoppingHeader from "@/components/shopping-view/header";
import { API_URL } from "@/config";
import { useNavigate } from "react-router-dom";
import UsegetallShopProducts from "@/hooks/Usegetallshopproducts";
import { useSelector } from "react-redux";
import ShoppingProducttile from "@/components/shopping-view/Product-tile";
import { gsap } from "gsap";

const categories = [
  {
    id: "home",
    label: "Home",
    path: "/shop/home",
    icon: <HomeIcon className="w-8 h-8" />,
  },
  {
    id: "men",
    label: "Menu",
    path: "/shop/products",
    icon: <User2Icon className="w-8 h-8" />,
  },
  {
    id: "women",
    label: "Women",
    path: "/shop/products",
    icon: <User2Icon className="w-8 h-8" />,
  },
  {
    id: "electronics",
    label: "Electronics",
    path: "/shop/products",
    icon: <Lightbulb className="w-8 h-8" />,
  },
  {
    id: "clothing",
    label: "Clothing",
    path: "/shop/products",
    icon: <BabyIcon className="w-8 h-8" />,
  },
];

function Home() {
  const [filterParams, setFilterParams] = useState({});
  const [sortParams, setSortParams] = useState("");
  const { refetch } = UsegetallShopProducts({
    filterparams: filterParams,
    sortparams: sortParams,
  });
  const [sliderImages, setSliderImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const navigate = useNavigate();
  const { shopproductlist } = useSelector((state) => state.shop);
  console.log("shopproductlist on home page", shopproductlist);

  const headingsRef = useRef([]);

  function handlenavigatetolistingpage(id, type) {
    sessionStorage.removeItem("filter");
    const currtfilter = {
      [type]: [id],
    };
    sessionStorage.setItem("filter", JSON.stringify(currtfilter));
    navigate(`/shop/products`);
  }

  useEffect(() => {
    const demoImages = [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1280px-Image_created_with_a_mobile_phone.png",
      "https://images.unsplash.com/photo-1725006708990-b32d393ceb99?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://example.com/demo-image4.jpg",
      "https://example.com/demo-image5.jpg",
    ];
    setSliderImages(demoImages);
  }, []);

  useEffect(() => {
    let intervalId;
    if (isAutoScrolling) {
      intervalId = setInterval(() => {
        setCurrentImageIndex((prevIndex) =>
          prevIndex === sliderImages.length - 1 ? 0 : prevIndex + 1
        );
      }, 3500);
    }
    return () => clearInterval(intervalId);
  }, [isAutoScrolling, sliderImages.length]);

  useEffect(() => {
    // GSAP animation for headings
    gsap.from(headingsRef.current, {
      y: -50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: "power3.out",
    });
  }, []);

  const nextImage = () => {
    setIsAutoScrolling(false);
    setCurrentImageIndex((prevIndex) =>
      prevIndex === sliderImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setIsAutoScrolling(false);
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? sliderImages.length - 1 : prevIndex - 1
    );
  };

  // Extract unique brands from shopproductlist
  const brands = [...new Set(shopproductlist.map((product) => product.brand))];
  console.log("brands", brands);

  return (
    <div className="flex flex-col min-h-screen ">
      <main className="flex-grow">
        {/* Image Slider */}
        <div className="relative h-[400px] overflow-hidden ">
          {sliderImages.length > 0 && (
            <div
              className="flex transition-transform duration-300 ease-in-out"
              style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
            >
              {sliderImages.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Slide ${index + 1}`}
                  className="w-full h-full object-cover flex-shrink-0"
                />
              ))}
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="absolute hidden lg:block top-1/2 left-4 transform -translate-y-1/2 bg-transparent hover:bg-transparent "
            onClick={prevImage}
          >
            <ChevronLeft className="h-8 w-8 text-white" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="absolute hidden lg:block  top-1/2 right-4 transform -translate-y-1/2 bg-transparent hover:bg-transparent "
            onClick={nextImage}
          >
            <ChevronRight className="h-8 w-8 text-white" />
          </Button>
        </div>

        {/* Category Listings */}
        <div className="container mx-auto  lg:mt-12 px-4">
          <h2
            ref={(el) => (headingsRef.current[0] = el)}
            className="text-4xl font-bold mb-6 text-gray-800 text-center lg:text-start"
          >
            Shop by Categories
          </h2>
          <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {categories.map((item) => (
              <div
                key={item.id}
                className="flex flex-col items-center justify-center p-6 bg-white rounded-lg duration-300 cursor-pointer"
                onClick={() => handlenavigatetolistingpage(item.id, "category")}
              >
                <div className="text-4xl mb-3 text-black">{item?.icon}</div>
                <span className="text-lg font-semibold text-center text-black">
                  {item?.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Brand Listings */}
        <div className="container mx-auto lg:my-16 px-4">
          <h2
            ref={(el) => (headingsRef.current[1] = el)}
            className="text-4xl font-bold mb-6 text-gray-800 text-center lg:text-start"
          >
            Shop by Brands
          </h2>
          <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {brands.map((brand) => (
              <div
                key={brand}
                className="flex flex-col items-center justify-center p-6 bg-white rounded-lg   transition-shadow duration-300 cursor-pointer"
                onClick={() => handlenavigatetolistingpage(brand, "brand")}
              >
                <TagIcon className="w-10 h-10 mb-3 text-black" />
                <span className="text-lg font-semibold text-center text-black">
                  {brand}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Product Listings */}
        <div className="container mx-auto my-16 px-4">
          <h2
            ref={(el) => (headingsRef.current[2] = el)}
            className="text-4xl font-bold mb-8 text-gray-800 text-center lg:text-start"
          >
            Featured Products
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {shopproductlist && shopproductlist.length > 0 ? (
              shopproductlist.map((p) => (
                <ShoppingProducttile
                  key={p._id}
                  product={p}
                  // handlegetproductdetailsbyid={handlegetproductdetailsbyid}
                  // handleaddtocart={handleaddtocart}
                />
              ))
            ) : (
              <div className="col-span-full text-center text-gray-600 text-lg">
                No products found
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Home;
