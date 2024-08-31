import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useRef } from "react";
import { Button } from "../ui/button";

function ImageUpload({ file, setfile, imageurl, setimageurl }) {
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

  return (
    <div className="w-full max-w-md mx-auto  mt-4">
      <Label className="text-lg font-semibold mb-2  block">Image Upload</Label>
      <div
        className="border-2 border-dashed p-4 rounded-lg  "
        onDragOver={handledragover}
        onDrop={handledrop}
      >
        <Input
          id="image"
          type="file"
          className="hidden"
          ref={inputref}
          onChange={handleimagechange}
        />
        {!file ? (
          <Label
            htmlFor="image"
            className="flex flex-col items-center justify-center h-32 cursor-pointer"
          >
            <UploadCloudIcon className="w-10 h-10 text-muted-foreground mb-2" />
            <span>Drag & drop or click to upload image</span>
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
