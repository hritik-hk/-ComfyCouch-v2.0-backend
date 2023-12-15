const mongoose = require("mongoose");
const { Schema } = mongoose;

const colorSchema = new Schema({
  color: { type: String, required: true },
  variant_id: { type: Number, required: true },
  imgURL: { type: String, required: true },
});

const customerReviewSchema = new Schema({
  user_name: { type: String, required: true },
  review: { type: String },
  rating: {
    type: Number,
    min: [1, "rating must be btw 1-5"],
    max: [5, "rating must be btw 1-5"],
    required: true,
  },
});

const productSchema = new Schema({
  product_id: { type: Number, required: true },
  title: { type: String, required: true },
  brand: { type: String, required: true },
  category: { type: String, required: true },
  colors: { type: [colorSchema], required: true },
  productDetails: { type: Object, required: true },
  specifications: { type: Object, required: true },
  customerReviews: { type: [customerReviewSchema], required: true },
});

exports.Product = mongoose.model("Product", productSchema);
