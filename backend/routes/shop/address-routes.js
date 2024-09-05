const express = require("express");
const Router = express.Router();
const {
  createAddress,
  fetchaddressofuser,
  editaddress,
  deleteaddress,
} = require("../../controllers/shop/address-controller");

Router.post("/add", createAddress);
Router.get("/get/:userid", fetchaddressofuser);
Router.put("/edit/:userid/:addressid", editaddress);
Router.delete("/delete/:userid/:addressid", deleteaddress);

module.exports = Router;
