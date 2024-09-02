const {
  getfilterproducts,
  getproductdetails,
} = require("../../controllers/shop/Products-controller");

const express = require("express");
const Router = express.Router();

Router.get("/get", getfilterproducts);
Router.get("/get/:id", getproductdetails);

module.exports = Router;
