const {
  getfilterproducts,
} = require("../../controllers/shop/Products-controller");

const express = require("express");
const Router = express.Router();

Router.get("/get", getfilterproducts);

module.exports = Router;
