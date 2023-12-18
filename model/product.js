const mongoose = require("mongoose");
const { Schema } = mongoose;

const variantSchema = new Schema(
  {
    title: { type: String, required: true },
    thumbnail: { type: String, required: true },
    images: { type: [String], required: true },
    color: { type: String, required: true },
    price: {
      type: Number,
      min: [1, "price should be greater than 0"],
      required: true,
    },
    rating: { type: Schema.Types.Decimal128, get: getRating, required: true },
    stock: { type: Number, required: true },
  },
  { id: false }
);

const customerReviewSchema = new Schema(
  {
    user_name: { type: String, required: true },
    review: { type: String },
    rating: {
      type: Number,
      min: [1, "rating must be btw 1-5"],
      max: [5, "rating must be btw 1-5"],
      required: true,
    },
  },
  { _id: false }
);

const productSchema = new Schema(
  {
    title: { type: String, required: true },
    brand: { type: String, required: true },
    category: { type: String, required: true },
    variants: { type: [variantSchema], required: true },
    productDetails: { type: Object, required: true },
    specifications: { type: Object, required: true },
    customerReviews: { type: [customerReviewSchema], required: true },
  },
  { id: false }
);

function getRating(value) {
  if (typeof value !== "undefined") {
    return parseFloat(value.toString());
  }
  return value;
}

productSchema.virtual("product_id").get(function () {
  return this._id;
});

variantSchema.virtual("variant_id").get(function () {
  return this._id;
});

productSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

variantSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  getters: true,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

exports.Product = mongoose.model("Product", productSchema);
