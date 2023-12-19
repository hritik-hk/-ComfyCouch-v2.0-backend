const express = require("express");
const { createUser } = require("../controller/auth");

const router = express.Router();

router.post("/signup", createUser);

exports.router = router;
