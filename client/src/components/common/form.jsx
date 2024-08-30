import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";

function CommonForm({
  formcontrols,
  formdata,
  setformdata,
  onsubmit,
  buttontext,
}) {
  function renderinputsbycomponenttype(getitem) {
    console.log(getitem);
    let element = null;
    const value = formdata[getitem.name] || "";
    switch (getitem.componenttype) {
      case "input":
        element = (
          <Input
            name={getitem.name}
            id={getitem.name}
            label={getitem.label}
            type={getitem.type}
            placeholder={getitem.placeholder}
            required={getitem.required}
            value={value}
            onChange={(event) =>
              setformdata({
                ...formdata,
                [getitem.name]: event.target.value,
              })
            }
          />
        );
        break;
      case "select":
        element = (
          <Select
            value={value}
            onValueChange={(value) =>
              setformdata({ ...formdata, [getitem.name]: value })
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={getitem.placeholder} />
            </SelectTrigger>
            <SelectContent>
              {getitem.options && getitem?.options?.length > 0
                ? getitem.options.map((optionitem) => (
                    <SelectItem key={optionitem.id} value={optionitem.id}>
                      {optionitem.label}
                    </SelectItem>
                  ))
                : null}
            </SelectContent>
          </Select>
        );
        break;
      case "textarea":
        element = (
          <Textarea
            value={value}
            placeholder={getitem.placeholder}
            id={getitem.id}
            name={getitem.name}
            onChange={(event) =>
              setformdata({
                ...formdata,
                [getitem.name]: event.target.value,
              })
            }
          />
        );
        break;
      default:
        element = (
          <Input
            name={getitem.name}
            id={getitem.name}
            label={getitem.label}
            type={getitem.type}
            placeholder={getitem.placeholder}
            required={getitem.required}
            onChange={(event) =>
              setformdata({
                ...formdata,
                [getitem.name]: event.target.value,
              })
            }
          />
        );
        break;
    }
    return element;
  }

  return (
    <form onSubmit={onsubmit}>
      <div className="flex flex-col gap-3">
        {formcontrols.map((item, index) => (
          <div key={index} className="grid w-full gap-1.5">
            <label htmlFor={item.name} className="mb-1 font-medium">
              {item.label}
            </label>
            {renderinputsbycomponenttype(item)}
          </div>
        ))}
      </div>
      <Button type="submit" className="mt-2 w-full">
        {buttontext || "Submit"}
      </Button>
    </form>
  );
}

export default CommonForm;
