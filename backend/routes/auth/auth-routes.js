const express = require("express");
const {
  register,
  login,
  logout,
} = require("../../controllers/auth/auth-controller");
const { isAuth } = require("../../utils/token");
const Router = express.Router();

Router.post("/register", register);
Router.post("/login", login);
Router.post("/logout", logout);
Router.get("/check-auth", isAuth, (req, res) => {
  res.status(200).json({
    success: true,
    message: "Authenticated",
    user: req.user,
  });
});

module.exports = Router;
