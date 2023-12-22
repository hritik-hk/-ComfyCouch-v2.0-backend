const express = require("express");
const {
  createProductVariant,
  fetchAllProductVariants,
  updateProductVariant,
  fetchVariantIdByColor
} = require("../controller/variant");

const router = express.Router();

router
  .post("/", createProductVariant)
  .get("/", fetchAllProductVariants)
  .patch("/:variantId", updateProductVariant)
  .get("/:productId/:color",fetchVariantIdByColor);

exports.router = router;
