const express = require("express");
const {
  createProductVariant,
  fetchAllProductVariants,
  updateProductVariant,
  fetchVariantIdByColor
} = require("../controller/variant");
const { isAuth } = require("../middleware/authMiddleware");

const router = express.Router();

router
  .post("/", createProductVariant)
  .get("/", fetchAllProductVariants)
  .patch("/:variantId",isAuth(), updateProductVariant)
  .get("/:productId/:color",fetchVariantIdByColor);

exports.router = router;
