const mongooose = require("mongoose");

const productSchema = new mongooose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
    },
    saleprice: {
      type: Number,
    },
    description: {
      type: String,
    },
    image: {
      type: String,
      required: true,
    },
    category: {
      type: String,
    },
    brand: {
      type: String,
    },
    totalstock: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongooose.model("Product", productSchema);
module.exports = Product;
