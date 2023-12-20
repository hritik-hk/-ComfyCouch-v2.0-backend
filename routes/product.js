const express = require("express");
const {
  createProduct,
  fetchProductDetailByIds,
  updateProduct,
  fetchAllProducts
} = require("../controller/product");

const router = express.Router();

router
  .post("/", createProduct)
  .get("/:productId/:variantId", fetchProductDetailByIds)
  .patch("/:productId", updateProduct)
  .get("/",fetchAllProducts);

exports.router = router;
