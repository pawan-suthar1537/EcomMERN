const Product = require("../../models/product-model");

const getfilterproducts = async (req, res) => {
  try {
    const pro = await Product.find({});
    if (pro) {
      res.status(200).json({
        success: true,
        message: "Products fetched successfully",
        data: pro,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Products not found",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  getfilterproducts,
};
