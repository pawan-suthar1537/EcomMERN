const express = require("express");
const {
  addtocart,
  fetchcartitem,
  updatecartitems,
  deleteitemfromcart,
} = require("../../controllers/shop/cart-controller");
const Router = express.Router();

Router.post("/addtocart", addtocart);
Router.get("/fetchcartitem/:userid", fetchcartitem);
Router.put("/updatecartitems", updatecartitems);
Router.delete("/deleteitemfromcart/:userid/:productid", deleteitemfromcart);

module.exports = Router;
