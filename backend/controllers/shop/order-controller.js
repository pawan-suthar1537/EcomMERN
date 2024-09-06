const Order = require("../../models/order");
const paypal = require("../../utils/paypal");

const createorder = async (req, res) => {
  try {
    const {
      userid,
      cartitems,
      addressinfo,
      status,
      paymentmethod,
      paymentstatus,
      totalamount,
      orderdate,
      orderupdatedate,
      paymentid,
      payerid,
    } = req.body;

    console.log(req.body);

    const createpaymentjson = {
      intent: "sale",
      payer: {
        payment_method: "paypal",
      },
      redirect_urls: {
        return_url: "http://localhost:5173/shop/paypalreturn",
        cancel_url: "http://localhost:5173/shop/paypalcancel",
      },
      transactions: [
        {
          item_list: {
            items: cartitems.map((item) => ({
              name: item.title,
              sku: item.productid,
              price: item.price,
              currency: "USD",
              quantity: item.quantity,
            })),
          },
          amount: {
            currency: "USD",
            total: totalamount.toFixed(2),
          },
          description: "Order Description",
        },
      ],
    };

    paypal.payment.create(createpaymentjson, async (error, payment) => {
      if (error) {
        console.log(error);
        res.status(500).json({
          message: "Error creating order",

          success: false,
        });
      } else {
        const order = new Order({
          userid,
          cartitems,
          addressinfo,
          status,
          paymentmethod,
          paymentstatus,
          totalamount,
          orderdate,
          orderupdatedate,
          paymentid,
          payerid,
        });
        await order.save();

        const approvedurl = payment.links.find(
          (link) => link.rel === "approval_url"
        ).href;

        res.status(200).json({
          message: "Order created successfully",
          orderid: order._id,
          order: order,
          approvedurl: approvedurl,
          success: true,
        });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error creating order",
      error: error,
      success: false,
    });
  }
};

const capturepayment = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error capturing payment",

      success: false,
    });
  }
};

module.exports = {
  createorder,
  capturepayment,
};
