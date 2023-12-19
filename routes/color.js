const express = require("express");
const { fetchColors, createColor } = require("../controller/color");

const router = express.Router();

router.get("/", fetchColors).post("/", createColor);

exports.router = router;
