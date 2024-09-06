const express = require("express");

const Router = express.Router();

const {
  createorder,
  capturepayment,
} = require("../../controllers/shop/order-controller");

Router.post("/createorder", createorder);
Router.post("/capturepayment", capturepayment);

module.exports = Router;
