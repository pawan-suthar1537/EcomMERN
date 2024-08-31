import ImageUpload from "@/components/admin-view/Image-upload";
import CommonForm from "@/components/common/form";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { addnewprodutformcontrols } from "@/config";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { Fragment, useState } from "react";

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
  const [opencreateproductsheet, setopencreateproductsheet] = useState(false);
  const [formdata, setformdata] = useState(initialformdata);
  const [imagefile, setimagefile] = useState(null);
  const [imageurl, setimageurl] = useState("");
  const [imgloading, setimageloading] = useState(false);

  const onsubmit = (event) => {
    event.preventDefault();
    console.log(formdata);
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
        <Sheet
          open={opencreateproductsheet}
          onOpenChange={() => {
            setopencreateproductsheet(false);
          }}
        >
          <SheetContent side="right" className="overflow-auto">
            <SheetHeader>
              <SheetTitle>Add New Product</SheetTitle>
            </SheetHeader>
            <ImageUpload
              file={imagefile}
              setfile={setimagefile}
              imageurl={imageurl}
              setimageurl={setimageurl}
              setimageloading={setimageloading}
            />
            {/* img component */}
            <div className="py-6">
              <CommonForm
                formcontrols={addnewprodutformcontrols}
                formdata={formdata}
                setformdata={setformdata}
                buttontext="Add"
                onsubmit={onsubmit}
              />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </Fragment>
  );
}

export default AdminProducts;
