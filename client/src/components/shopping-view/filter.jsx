import { filteroptions } from "@/config";
import { Fragment } from "react";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { Separator } from "../ui/separator";

function ProductFilter({ filter, handlefilter }) {
  return (
    <div className="bg-background rounded-lg shadow-sm">
      <div className="p-4 border-b">
        <h3 className="text-lg font-semibold">Filters</h3>
      </div>
      <div className="p-4 space-y-4">
        {Object.keys(filteroptions).map((keyitem) => (
          <Fragment key={keyitem}>
            <div>
              <h3 className="text-base font-bold">{keyitem}</h3>
              <div className="grid gap-2 mt-2">
                {filteroptions[keyitem].map((option, index) => (
                  <Label
                    key={index}
                    className="flex items-center gap-2 font-medium"
                  >
                    <Checkbox
                      checked={
                        filter &&
                        Object.keys(filter).length > 0 &&
                        filter[keyitem] &&
                        filter[keyitem].indexOf(option.id) > -1
                      }
                      onCheckedChange={() => handlefilter(keyitem, option.id)}
                    />
                    {option.label}
                  </Label>
                ))} 
              </div>
            </div>
            <Separator />
          </Fragment>
        ))}
      </div>
    </div>
  );
}

export default ProductFilter;
