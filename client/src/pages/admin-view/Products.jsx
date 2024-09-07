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
import { array } from "prop-types";
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

  const { products } = useSelector((state) => state.adminproducts);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function isFormvalid() {
    return Object.keys(formdata)
      .map((key) => formdata[key] !== "")
      .every((item) => item);
  }

  async function handledeleteproduct(productid) {
    try {
      const res = await axios.delete(
        `${API_URL}/api/admin/products/delete-product/${productid}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (res.data.success === true) {
        toast.success("Product deleted successfully");
        dispatch(
          setproducts(products.filter((product) => product._id !== productid))
        );
        navigate("/admin/products");
      } else {
        toast.error(res.data.message || "Something went wrong");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  }

  const onsubmit = async (event) => {
    event.preventDefault();

    try {
      let res;

      if (currenteditpostid === null) {
        // Add new product
        res = await axios.post(
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
      } else {
        // Edit existing product
        res = await axios.put(
          `${API_URL}/api/admin/products/edit-product/${currenteditpostid}`,
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
      }

      if (res.data.success) {
        toast.success(res.data.message || "Product saved successfully");
        setopencreateproductsheet(false);

        if (currenteditpostid === null) {
          // If a new product was added
          dispatch(setproducts([...products, res.data.data]));
        } else {
          // If an existing product was edited
          const updatedProducts = products.map((product) =>
            product._id === currenteditpostid ? res.data.data : product
          );
          dispatch(setproducts(updatedProducts));
        }

        setcurrenteditpostid(null);
        setimagefile(null);
        setformdata(initialformdata);
        navigate("/admin/products");
      } else {
        toast.error(res.data.message || "Failed to save product");
      }
    } catch (error) {
      console.error("Error saving product:", error);
      toast.error("An error occurred while saving the product");
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

      {Array.isArray(products) && products.length === 0 ? (
        <DotLottieReact
          src="https://lottie.host/c2759bfd-f77e-46c2-93ea-db7ccb7ae98c/mL9ZC7kdIS.json"
          loop
          autoplay
          background="transparent"
          className="w-[100%] h-[70%] justify-center items-center"
        />
      ) : (
        <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
          {Array.isArray(products) &&
            products.map((product, index) => (
              <AdminProductsTile
                key={index}
                product={product}
                handledeleteproduct={handledeleteproduct}
                setformdata={setformdata}
                setcurrenteditpostid={setcurrenteditpostid}
                setopencreateproductsheet={setopencreateproductsheet}
              />
            ))}
        </div>
      )}

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
              isbtndisbaled={!isFormvalid()}
            />
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
}

export default AdminProducts;
