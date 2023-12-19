const express = require("express");
const { createProduct, fetchAllProducts } = require("../controller/product");

const router = express.Router();

router
  .post("/", createProduct)
  .get("/",fetchAllProducts)
  

exports.router = router;
