const Address = require("../../models/address");

const createAddress = async (req, res) => {
  try {
    const { userid, address, city, state, pincode, phone, additionalinfo } =
      req.body;

    if (!userid || !address || !city || !state || !pincode || !phone) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const newaddress = new Address({
      userid,
      address,
      city,
      state,
      pincode,
      phone,
      additionalinfo,
    });

    await newaddress.save();

    res.status(200).json({
      success: true,
      message: "Address created successfully",
      data: newaddress,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error creating address",
      error: error,
    });
  }
};

const fetchaddressofuser = async (req, res) => {
  try {
    const { userid } = req.params;
    if (!userid) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }
    const address = await Address.find({ userid });
    if (!address || address.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Address not found for this user",
      });
    }
    res.status(200).json({
      success: true,
      message: "Address fetched successfully",
      data: address,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error fetching address of user",
    });
  }
};

const editaddress = async (req, res) => {
  try {
    const { userid, addressid } = req.params;
    const formData = req.body;
    if (!userid || !addressid) {
      return res.status(400).json({
        success: false,
        message: "User ID and Address ID are required",
      });
    }

    const address = await Address.findByIdAndUpdate(
      {
        _id: addressid,
        userid,
      },
      formData,
      {
        new: true,
      }
    );

    if (!address || address.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Address not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Address updated successfully",
      data: address,
    });
  } catch (error) {
    console.log(error);
  }
};

const deleteaddress = async (req, res) => {
  try {
    const { userid, addressid } = req.params;
    if (!userid || !addressid) {
      return res.status(400).json({
        success: false,
        message: "User ID and Address ID are required",
      });
    }
    const address = await Address.findOneAndDelete({
      _id: addressid,
      userid,
    });
    if (!address) {
      return res.status(404).json({
        success: false,
        message: "Address not found to delete",
      });
    }
    res.status(200).json({
      success: true,
      message: "Address deleted successfully",
      data: address,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createAddress,
  fetchaddressofuser,
  editaddress,
  deleteaddress,
};
