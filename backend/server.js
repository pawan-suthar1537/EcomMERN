const express = require("express");
const app = express();
const cors = require("cors");
const { default: mongoose } = require("mongoose");
const connect = require("./db/Conn");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const PORT = process.env.PORT || 3000;

//! importing routes
const authRoutes = require("./routes/auth/auth-routes");
const adminproductsRoutes = require("./routes/admin/products/products-routes");
const shopRoutes = require("./routes/shop/shop-router");
const cartRoutes = require("./routes/shop/cart-routes");
const addressRoutes = require("./routes/shop/address-routes");
//! middlewares
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//! routes
// app.get("/", (req, res) => {
//   res.status(200).json({ message: "hello from server" });
// });

app.use("/api/auth", authRoutes);
app.use("/api/admin/products", adminproductsRoutes);
app.use("/api/shop", shopRoutes);
app.use("/api/shop/cart", cartRoutes);
app.use("/api/shop/address", addressRoutes);
connect()
  .then(() => {
    app.listen(PORT, () => {
      console.log("http://localhost:" + PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });
