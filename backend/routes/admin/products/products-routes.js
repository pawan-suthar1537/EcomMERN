const express = require("express");
const {
  handleimageupload,
} = require("../../../controllers/admin/products/product-controller");
const { upload } = require("../../../utils/cloudinary");

const Router = express.Router();

Router.post("/upload-image", upload.single("image"), handleimageupload);

module.exports = Router;
