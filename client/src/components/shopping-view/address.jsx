import { useEffect, useState } from "react";
import CommonForm from "../common/form";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { addressformcontrols, API_URL } from "@/config";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import {
  deleteAddress,
  setAddress,
  updateAddress,
} from "@/store/address-slice";
import AddressCard from "./addresscard";
// import { addressformcontrols } from "@/config";

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
  const [currenteditaddressid, setCurrenteditaddressid] = useState(null);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { addresses } = useSelector((state) => state.address);
  console.log("addresses in state", addresses);

  useEffect(() => {
    fetchAddresses();
  }, [user._id]);

  const fetchAddresses = async () => {
    try {
      const getRes = await axios.get(
        `${API_URL}/api/shop/address/get/${user._id}`,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      dispatch(setAddress(getRes.data.data));
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch addresses");
    }
  };
  const isFormvalid = () => {
    return Object.keys(formData)
      .map((key) => formData[key].trim() !== "")
      .every((item) => item);
  };

  const addnewaddress = async (event) => {
    event.preventDefault();
    try {
      const addRes = await axios.post(
        `${API_URL}/api/shop/address/add`,
        {
          ...formData,
          userid: user._id,
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (addRes.data.success) {
        toast.success(addRes.data.message);
        dispatch(setAddress(addRes.data.data));
        fetchAddresses();
        setFormData(initialformdata);
      }
    } catch (error) {
      console.error(error);
      toast.error("Error adding address");
    }
  };

  const handleeditaddress = (addressinfo) => {
    setCurrenteditaddressid(addressinfo._id);
    setFormData({
      address: addressinfo.address,
      city: addressinfo.city,
      state: addressinfo.state,
      pincode: addressinfo.pincode,
      phone: addressinfo.phone,
      additionalinfo: addressinfo.additionalinfo,
    });
  };

  const updateAddress = async (event) => {
    event.preventDefault();
    try {
      const editRes = await axios.put(
        `${API_URL}/api/shop/address/edit/${user._id}/${currenteditaddressid}`,
        {
          ...formData,
          userid: user._id,
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (editRes.data.success) {
        toast.success(editRes.data.message);
        fetchAddresses();
        setFormData(initialformdata);
        setCurrenteditaddressid(null);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };

  const handledeleteaddress = async (addressinfo) => {
    try {
      const deleteRes = await axios.delete(
        `${API_URL}/api/shop/address/delete/${user._id}/${addressinfo._id}`,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (deleteRes.data.success) {
        toast.success(deleteRes.data.message);
        fetchAddresses();
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {currenteditaddressid ? "Edit Address" : "Your Addresses"}
        </CardTitle>
      </CardHeader>
      <div className="mb-5 p-3 flex flex-row gap-3">
        {addresses && addresses.length > 0 ? (
          addresses.map((singleadditem) => (
            <AddressCard
              key={singleadditem._id}
              addressinfo={singleadditem}
              handleeditaddress={handleeditaddress}
              handledeleteaddress={handledeleteaddress}
            />
          ))
        ) : (
          <div className="text-center text-gray-500">No addresses found</div>
        )}
      </div>
      <CardHeader>
        <CardTitle>Add New Address</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <CommonForm
          formcontrols={addressformcontrols}
          formdata={formData}
          setformdata={setFormData}
          onsubmit={currenteditaddressid ? updateAddress : addnewaddress}
          buttontext={currenteditaddressid ? "Update Address" : "Add Address"}
          isbtndisbaled={!isFormvalid()}
        />
      </CardContent>
    </Card>
  );
}

export default Address;
