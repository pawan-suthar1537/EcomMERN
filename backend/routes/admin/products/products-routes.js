const express = require("express");
const {
  handleimageupload,
  addProduct,
  editProduct,
  deleteProduct,
  fetchProducts,
} = require("../../../controllers/admin/products/product-controller");
const { upload } = require("../../../utils/cloudinary");

const Router = express.Router();

Router.post("/upload-image", upload.single("image"), handleimageupload);
Router.post("/add-product", addProduct);
Router.get("/get-products", fetchProducts);
Router.put("/edit-product/:id", editProduct);
Router.delete("/delete-product/:id", deleteProduct);

module.exports = Router;
