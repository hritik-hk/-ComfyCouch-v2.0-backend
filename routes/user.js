const express = require("express");
const { updateUser, fetchUserById } = require("../controller/user");

const router = express.Router();

router.get("/", fetchUserById).post("/", updateUser);

exports.router = router;
