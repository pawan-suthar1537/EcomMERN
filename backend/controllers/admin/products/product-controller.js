const Product = require("../../../models/product-model");
const { uploadImage } = require("../../../utils/cloudinary");

const handleimageupload = async (req, res) => {
  try {
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const url = `data:${req.file.mimetype};base64,${b64}`;
    const result = await uploadImage(url);
    res.json({
      success: true,
      result,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to upload image" });
  }
};

// add a new product

const addProduct = async (req, res) => {
  try {
    const {
      title,
      price,
      saleprice,
      description,
      image,
      category,
      brand,
      totalstock,
    } = req.body;

    const isproductexist = await Product.findOne({ title });
    if (isproductexist) {
      return res.status(400).json({
        success: false,
        message: "Product already exists with this title",
      });
    }
    const product = new Product({
      title,
      price,
      saleprice,
      description,
      image,
      category,
      brand,
      totalstock,
    });

    const data = await product.save();
    res.status(201).json({
      success: true,
      message: "Product added successfully",
      data,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to add product" });
  }
};

// fetch all products

const fetchProducts = async (req, res) => {
  try {
    const data = await Product.find();
    if (!data && data.length == 0) {
      return res.status(404).json({
        success: false,
        message: "No products found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Products fetched successfully",
      data,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch products" });
  }
};

//edit a product

const editProduct = async (req, res) => {
  try {
    const {
      title,
      price,
      saleprice,
      description,
      image,
      category,
      brand,
      totalstock,
    } = req.body;
    const product = await Product.findOne({ _id: req.params.id });
    console.log(product);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product does not exist for edit",
      });
    }
    if (title) product.title = title;
    if (price) product.price = price;
    if (saleprice) product.saleprice = saleprice;
    if (description) product.description = description;
    if (image) product.image = image;
    if (category) product.category = category;
    if (brand) product.brand = brand;
    if (totalstock) product.totalstock = totalstock;
    const data = await product.save();
    res.status(200).json({
      success: true,
      message: "Product edited successfully",
      data,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to edit product" });
  }
};

// delete a product

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete({ _id: req.params.id });
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product does not exist for delete",
      });
    }
    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
      data: product,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Failed to delete product" });
  }
};

module.exports = {
  handleimageupload,
  addProduct,
  fetchProducts,
  editProduct,
  deleteProduct,
};
