const express = require("express");
const { createUser, loginUser, checkAuth } = require("../controller/auth");
const { isAuth } = require("../middleware/authMiddleware");

const router = express.Router();

router
  .post("/signup", createUser)
  .post("/login", loginUser)
  .get("/check", isAuth(), checkAuth);

exports.router = router;
