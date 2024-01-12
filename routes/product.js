const express = require("express");
const {
  createProduct,
  fetchProductDetailByIds,
  updateProduct,
  fetchAllProducts
} = require("../controller/product");
const { isAuth } = require("../middleware/authMiddleware");

const router = express.Router();

router
  .post("/", createProduct)
  .get("/:productId/:variantId", fetchProductDetailByIds)
  .patch("/:productId",isAuth(), updateProduct)
  .get("/",fetchAllProducts);

exports.router = router;
