import { useEffect, useState } from "react";
import CommonForm from "../common/form";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { addressformcontrols } from "@/config";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchAddresses,
  addNewAddress,
  updateExistingAddress,
  deleteExistingAddress,
} from "@/store/address-slice";
import AddressCard from "./addresscard";
import { toast } from "sonner";

const initialformdata = {
  address: "",
  city: "",
  state: "",
  pincode: "",
  phone: "",
  additionalinfo: "",
};

function Address() {
  const [formData, setFormData] = useState(initialformdata);
  const [currentEditAddressId, setCurrentEditAddressId] = useState(null);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { addresses } = useSelector((state) => state.address);

  console.log(addresses);

  useEffect(() => {
    if (user?._id) {
      dispatch(fetchAddresses(user._id));
    }
  }, [dispatch, user._id]);

  const isFormValid = () => {
    return Object.keys(formData)
      .map((key) => formData[key].trim() !== "")
      .every((item) => item);
  };

  const handleAddAddress = (event) => {
    event.preventDefault();
    // If the user already has 3 addresses, do not allow adding a new one
    if (addresses.length >= 3) {
      setFormData(initialformdata);
      toast.error("You can only have 3 addresses.");
      return;
    }

    dispatch(addNewAddress(formData, user._id));
    setFormData(initialformdata);
  };

  const handleEditAddress = (addressInfo) => {
    // Allow editing of existing addresses without any limit
    setCurrentEditAddressId(addressInfo._id);
    setFormData({
      address: addressInfo.address,
      city: addressInfo.city,
      state: addressInfo.state,
      pincode: addressInfo.pincode,
      phone: addressInfo.phone,
      additionalinfo: addressInfo.additionalinfo,
    });
  };

  const handleUpdateAddress = (event) => {
    event.preventDefault();
    if (currentEditAddressId) {
      dispatch(updateExistingAddress(formData, user._id, currentEditAddressId));
      setFormData(initialformdata);
      setCurrentEditAddressId(null);
    }
  };

  const handleDeleteAddress = (addressInfo) => {
    dispatch(deleteExistingAddress(user._id, addressInfo._id));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between">
          {currentEditAddressId
            ? "Edit Address"
            : `Your Addresses (${addresses.length}/3)`}
          {addresses.length >= 3 && (
            <span className="text-red-500">You can only have 3 addresses.</span>
          )}
        </CardTitle>
      </CardHeader>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-5 p-5">
        {addresses && addresses.length > 0 ? (
          addresses.map((singleAddItem) => (
            <AddressCard
              key={singleAddItem._id}
              addressinfo={singleAddItem}
              handleeditaddress={handleEditAddress}
              handledeleteaddress={handleDeleteAddress}
            />
          ))
        ) : (
          <div className="text-center text-gray-500">No addresses found</div>
        )}
      </div>

      {addresses && addresses.length < 3 && (
        <>
          <CardHeader>
            <CardTitle>
              {currentEditAddressId ? "Edit Address" : "Add New Address"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CommonForm
              formcontrols={addressformcontrols}
              formdata={formData}
              setformdata={setFormData}
              onsubmit={
                currentEditAddressId ? handleUpdateAddress : handleAddAddress
              }
            />
          </CardContent>
        </>
      )}
    </Card>
  );
}

export default Address;
