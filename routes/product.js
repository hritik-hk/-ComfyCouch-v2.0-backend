const express = require("express");
const {
  createProduct,
  fetchAllProducts,
  fetchProductByIds,
  updateProduct,
  updateVariant
} = require("../controller/product");

const router = express.Router();

router
  .post("/", createProduct)
  .get("/", fetchAllProducts)
  .get("/:productId/:variantId", fetchProductByIds)
  .patch("/:productId", updateProduct)
  .patch("/:productId/:variantId",updateVariant);

exports.router = router;
