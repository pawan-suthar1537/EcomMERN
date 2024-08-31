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

module.exports = { handleimageupload };
