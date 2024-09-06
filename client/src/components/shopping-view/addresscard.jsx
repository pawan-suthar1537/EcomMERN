import { Edit3, Trash } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Label } from "../ui/label";

function AddressCard({ addressinfo, handleeditaddress, handledeleteaddress }) {
  console.log(addressinfo);
  return (
    <Card className="container">
      <CardContent className="grid p-4 gap-2">
        <Label className="text-sm font-semibold">
          Address: <span className="font-normal">{addressinfo?.address}</span>
        </Label>
        <Label className="text-sm font-semibold">
          City: <span className="font-normal">{addressinfo?.city}</span>
        </Label>
        <Label className="text-sm font-semibold">
          State: <span className="font-normal">{addressinfo?.state}</span>
        </Label>
        <Label className="text-sm font-semibold">
          Pincode: <span className="font-normal">{addressinfo?.pincode}</span>
        </Label>
        <Label className="text-sm font-semibold">
          Phone: <span className="font-normal">{addressinfo?.phone}</span>
        </Label>
        <Label className="text-sm font-semibold">
          Additional Info:{" "}
          <span className="font-normal">{addressinfo?.additionalinfo}</span>
        </Label>
      </CardContent>
      <CardFooter className="flex justify-between gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleeditaddress(addressinfo)}
        >
          <Edit3 className="w-4 h-4 mr-2" /> Edit
        </Button>
        <Button
          variant="destructive"
          size="sm"
          onClick={() => handledeleteaddress(addressinfo)}
        >
          <Trash className="w-4 h-4 mr-2" /> Delete
        </Button>
      </CardFooter>
    </Card>
  );
}

export default AddressCard;
