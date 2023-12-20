const express = require("express");
const {
  createProduct,
  fetchProductDetailByIds,
  updateProduct
} = require("../controller/product");

const router = express.Router();

router
  .post("/", createProduct)
  .get("/:productId/:variantId", fetchProductDetailByIds)
  .patch("/:productId", updateProduct)

exports.router = router;
