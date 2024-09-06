const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userid: {
    type: String,
    required: true,
  },
  cartitems: [
    {
      productid: {
        type: String,
        required: true,
      },

      title: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      
      quantity: {
        type: Number,
        required: true,
      },
      image: {
        type: String,
        required: true,
      },
    },
  ],
  addressinfo: {
    addressid: String,
    address: String,
    city: String,
    state: String,
    pincode: String,
    country: String,
    phone: String,
    additionalinfo: String,
  },
  status: {
    type: String,
  },
  paymentmethod: String,
  paymentstatus: String,
  totalamount: Number,
  orderdate: Date,
  orderupdatedate: Date,
  paymentid: String,
  payerid: String,
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
