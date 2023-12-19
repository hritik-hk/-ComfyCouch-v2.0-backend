const express = require("express");
const { updateUser, fetchUserById } = require("../controller/user");

const router = express.Router();

router.get("/:id", fetchUserById).post("/", updateUser);

exports.router = router;
