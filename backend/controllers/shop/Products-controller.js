const Product = require("../../models/product-model");

const getfilterproducts = async (req, res) => {
  try {
    const { category = [], brand = [], sortby = "price-low-high" } = req.query;

    let filter = {};
    if (category.length > 0) {
      filter.category = { $in: category.split(",") };
    }
    if (brand.length > 0) {
      filter.brand = { $in: brand.split(",") };
    }

    let sort = {};

    switch (sortby) {
      case "price-low-high":
        sort.price = 1;
        break;
      case "price-high-low":
        sort.price = -1;
        break;
      case "name-a-z":
        sort.title = 1;
        break;
      case "name-z-a":
        sort.title = -1;
        break;
      default:
        sort.price = 1;
        break;
    }

    const pro = await Product.find(filter).sort(sort);
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
