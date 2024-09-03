const Cart = require("../../models/cart");
const Product = require("../../models/product-model");

const addtocart = async (req, res) => {
  try {
    const { userid, productid, quantity } = req.body;

    if (!userid || !productid || quantity <= 0) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid data provided" });
    }

    const product = await Product.findById(productid);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    let cart = await Cart.findOne({ userid });

    if (!cart) {
      cart = new Cart({ userid, items: [] });
    }

    const findcurrentitemindex = cart.items.findIndex(
      (item) => item.productid.toString() === productid
    );
    if (findcurrentitemindex !== -1) {
      cart.items[findcurrentitemindex].quantity += quantity;
    } else {
      cart.items.push({ productid, quantity });
    }

    await cart.save();

    res
      .status(200)
      .json({ success: true, message: "Item added to cart", data: cart });
  } catch (err) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const fetchcartitem = async (req, res) => {
  try {
    const { userid } = req.params;

    if (!userid) {
      return res
        .status(400)
        .json({ success: false, message: "userid is required" });
    }
    const cart = await Cart.findOne({ userid }).populate({
      path: "items.productid",
      select: "title price image saleprice brand category",
    });
    if (!cart) {
      return res
        .status(404)
        .json({ success: false, message: "Cart not found of this user" });
    }

    const validitems = cart.items.filter((item) => item.productid);

    if (validitems.length > cart.items.length) {
      cart.items = validitems;
      await cart.save();
    }

    const populatecartitems = validitems.map((item) => {
      return {
        productid: item.productid._id,
        title: item.productid.title,
        price: item.productid.price,
        saleprice: item.productid.saleprice,
        image: item.productid.image,
        quantity: item.quantity,
      };
    });

    res.status(200).json({
      success: true,
      data: {
        ...cart._doc,
        items: populatecartitems,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const updatecartitems = async (req, res) => {
  try {
    const { userid, productid, quantity } = req.body;

    if (!userid || !productid || quantity <= 0) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid data provided" });
    }

    const cart = await Cart.findOne({ userid });
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found of this user to update",
      });
    }

    const findcurrentitemindex = cart.items.findIndex(
      (item) => item.productid.toString() === productid
    );

    if (findcurrentitemindex === -1) {
      return res
        .status(404)
        .json({ success: false, message: "Item not found in cart to update" });
    }

    cart.items[findcurrentitemindex].quantity = quantity;
    await cart.save();

    await cart.populate({
      path: "items.productid",
      select: "title price image saleprice brand category",
    });

    const populatecartitems = cart.items.map((item) => {
      return {
        productid: item.productid ? item.productid._id : null,
        title: item.productid ? item.productid.title : null,
        price: item.productid ? item.productid.price : null,
        saleprice: item.productid ? item.productid.saleprice : null,
        image: item.productid ? item.productid.image : null,
        quantity: item.quantity,
      };
    });

    res.status(200).json({
      success: true,
      message: "Item updated in cart",
      data: {
        ...cart._doc,
        items: populatecartitems,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const deleteitemfromcart = async (req, res) => {
  const { userid, productid } = req.params;

  try {
    if (!userid || !productid) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid data provided" });
    }

    const cart = await Cart.findOne({ userid }).populate({
      path: "items.productid",
      select: "title price image saleprice brand category",
    });
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found of this user to delete",
      });
    }

    cart.items = cart.items.filter(
      (item) => item.productid._id.toString() !== productid
    );

    await cart.save();

    await cart.populate({
      path: "items.productid",
      select: "title price image saleprice brand category",
    });

    const populatecartitems = cart.items.map((item) => {
      return {
        productid: item.productid ? item.productid._id : null,
        title: item.productid ? item.productid.title : null,
        price: item.productid ? item.productid.price : null,
        saleprice: item.productid ? item.productid.saleprice : null,
        image: item.productid ? item.productid.image : null,
        quantity: item.quantity,
      };
    });

    res.status(200).json({
      success: true,
      message: "Item deleted from cart successfully",
      data: {
        ...cart._doc,
        items: populatecartitems,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

module.exports = {
  addtocart,
  fetchcartitem,
  updatecartitems,
  deleteitemfromcart,
};
