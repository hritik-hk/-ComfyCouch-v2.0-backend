const express = require("express");
const {
  createProductVariant,
  fetchAllProductVariants,
  updateProductVariant,
} = require("../controller/variant");

const router = express.Router();

router
  .post("/", createProductVariant)
  .get("/", fetchAllProductVariants)
  .patch("/:variantId", updateProductVariant);

exports.router = router;
