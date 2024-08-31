const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const dotenv = require("dotenv");
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = multer.memoryStorage();

async function uploadImage(file) {
  const result = await cloudinary.uploader.upload(file, {
    folder: "EcomMERN/products",
    resource_type: "auto",
  });
  return result;
}

const upload = multer({ storage });

module.exports = { uploadImage, upload };
