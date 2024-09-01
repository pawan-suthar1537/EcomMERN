import ImageUpload from "@/components/admin-view/Image-upload";
import AdminProductsTile from "@/components/admin-view/Product-tile";
import CommonForm from "@/components/common/form";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { addnewprodutformcontrols, API_URL } from "@/config";
import Usegetalladminaddedproducts from "@/hooks/Usegetalladminaddedproducts";
import { setproducts } from "@/store/admin-product-slice";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import axios from "axios";
import { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const initialformdata = {
  title: "",
  description: "",
  price: "",
  saleprice: "",
  totalstock: "",
  category: "",
  brand: "",
  image: null,
};

function AdminProducts() {
  // fetch all products
  Usegetalladminaddedproducts();
  const [opencreateproductsheet, setopencreateproductsheet] = useState(false);
  const [formdata, setformdata] = useState(initialformdata);
  const [imagefile, setimagefile] = useState(null);
  const [imageurl, setimageurl] = useState("");
  const [imgloading, setimageloading] = useState(false);
  const [currenteditpostid, setcurrenteditpostid] = useState(null);

  // console.log("imageurl in adminproduct to pass in api ", imageurl);

  const { products } = useSelector((state) => state.adminproducts);
  console.log("all products in admin state", products);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onsubmit = async (event) => {
    event.preventDefault();
    console.log("formdata for add prudct", formdata);

    const res = await axios.post(
      `${API_URL}/api/admin/products/add-product`,
      {
        ...formdata,
        image: imageurl,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    console.log("add new product api call response: ", res.data);
    if (res.data.success) {
      toast.success(res.data.message || "Product added successfully");
      setopencreateproductsheet(false);
      dispatch(setproducts([...products, res.data.data]));
      navigate("/admin/products");

      setimagefile(null);
      setformdata(initialformdata);
    } else {
      toast.error(res.data.message || "Failed to add product");
    }
  };

  return (
    <Fragment>
      <div className="mb-5 w-full flex justify-end ">
        <Button onClick={() => setopencreateproductsheet(true)}>
          Add New Product
          <span>
            <DotLottieReact
              src="https://lottie.host/94dbde9b-caf7-4112-b5d2-fdd816cdfbc1/ysCTK5nqUY.json"
              autoplay
              loop
              className="w-10 h-10 justify-start -mt-[20px]"
            />
          </span>
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        {Array.isArray(products) &&
          products
            .reverse()
            .map((product, index) => (
              <AdminProductsTile
                key={index}
                product={product}
                setformdata={setformdata}
                setcurrenteditpostid={setcurrenteditpostid}
                setopencreateproductsheet={setopencreateproductsheet}
              />
            ))}
      </div>
      <Sheet
        open={opencreateproductsheet}
        onOpenChange={() => {
          setopencreateproductsheet(false);
          setcurrenteditpostid(null);
          setformdata(initialformdata);
        }}
      >
        <SheetContent side="right" className="overflow-auto">
          <SheetHeader>
            <SheetTitle>
              {" "}
              {currenteditpostid !== null ? "Edit Product" : "Add New Product"}
            </SheetTitle>
          </SheetHeader>
          <ImageUpload
            iseditmode={currenteditpostid !== null}
            file={imagefile}
            setfile={setimagefile}
            imageurl={imageurl}
            setimageurl={setimageurl}
            setimageloading={setimageloading}
            imgloading={imgloading}
          />
          {/* img component */}
          <div className="py-6">
            <CommonForm
              formcontrols={addnewprodutformcontrols}
              formdata={formdata}
              setformdata={setformdata}
              buttontext={
                currenteditpostid !== null ? "Edit Product" : "Add Product"
              }
              onsubmit={onsubmit}
            />
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
}

export default AdminProducts;
