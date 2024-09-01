import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useEffect, useRef } from "react";
import { Button } from "../ui/button";
import axios from "axios";
import { API_URL } from "@/config";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { Skeleton } from "../ui/skeleton";

function ImageUpload({
  file,
  setfile,
  imageurl,
  setimageurl,
  setimageloading,
  imgloading,
  iseditmode,
}) {
  const inputref = useRef(null);

  const handleimagechange = (event) => {
    const file = event.target.files?.[0];
    if (file) setfile(file);
  };

  const handledragover = (event) => {
    event.preventDefault();
  };

  const handledrop = (event) => {
    event.preventDefault();
    const droppedfile = event.dataTransfer.files?.[0];
    if (droppedfile) setfile(droppedfile);
  };

  const handleremoveimage = () => {
    setfile(null);

    if (inputref.current) {
      inputref.current.value = "";
    }
  };

  async function uploadimagetocloudinary() {
    setimageloading(true);
    const data = new FormData();
    data.append("image", file);
    const res = await axios.post(
      `${API_URL}/api/admin/products/upload-image`,
      data
    );
    console.log("cloudinary upload image res", res);
    if (res?.data?.success) {
      setimageurl(res.data.result.secure_url);
      setimageloading(false);
    }
  }

  useEffect(() => {
    if (file !== null) uploadimagetocloudinary();
  }, [file]);

  return (
    <div className="w-full max-w-md mx-auto  mt-4">
      <Label className="text-lg font-semibold mb-2  block">Image Upload</Label>
      <div
        className={`${
          iseditmode ? "opacity-60" : ""
        } border-2 border-dashed p-4 rounded-lg  `}
        onDragOver={handledragover}
        onDrop={handledrop}
      >
        <Input
          id="image"
          type="file"
          className="hidden"
          ref={inputref}
          onChange={handleimagechange}
          disabled={iseditmode}
        />
        {!file ? (
          <Label
            htmlFor="image"
            className={`flex flex-col items-center justify-center h-32 ${
              iseditmode ? "cursor-not-allowed" : ""
            } `}
          >
            {/* <UploadCloudIcon className="w-10 h-10 text-muted-foreground mb-2" /> */}
            <DotLottieReact
              src="https://lottie.host/60a5ed8d-dc7c-464d-b8bf-81793529ffcd/KmI8RoZdmt.json"
              background="#FFFFFF"
              className=" w-full h-full text-muted-foreground mb-10 cursor-pointer"
              loop
              autoplay
            />

            {/* <span>Drag & drop or click to upload image</span> */}
          </Label>
        ) : (
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <FileIcon className="w-8 h-8 text-primary mr-2" />
            </div>
            <p className="text-sm font-medium">{file?.name}</p>
            <Button
              className="text-muted-foreground hover:text-foreground"
              variant="ghost"
              size="icon"
              onClick={handleremoveimage}
            >
              <XIcon className="w-4 h-4" />
              <span className="sr-only">Remove File</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ImageUpload;
