const express = require("express");
const {
  createUser,
  loginUser,
  checkAuth,
  logout,
} = require("../controller/auth");
const { isAuth } = require("../middleware/authMiddleware");

const router = express.Router();

router
  .post("/signup", createUser)
  .post("/login", loginUser)
  .get("/check", isAuth(), checkAuth)
  .get("/logout", logout);

exports.router = router;
