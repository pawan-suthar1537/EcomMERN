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

  const onsubmit = (event) => {
    event.preventDefault();
    console.log(formdata);
  };

  return (
    <Fragment>
      <div className="mb-5 w-full flex justify-end">
        <Button onClick={() => setopencreateproductsheet(true)}>
          Add New Product
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
