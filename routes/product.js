const express = require("express");
const { createProduct } = require("../controller/product");

const router = express.Router();

router
  .post("/", createProduct)
  

exports.router = router;
