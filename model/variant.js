const mongoose = require("mongoose");
const { Schema } = mongoose;

const variantSchema = new Schema({
  variant_id: { type: Number, required: true },
  product_id: { type: Number, required: true },
  title: { type: String, required: true },
  thumbnail: { type: String, required: true },
  images: { type: [string], required: true },
  color: { type: String, required: true },
  price: {
    type: Number,
    min: [1, "price should be greater than 0"],
    required: true,
  },
  rating: { type: Schema.Types.Decimal128, required: true },
  stock: { type: Number, required: true },
  brand: { type: String, required: true },
  category: { type: String, required: true },
});

exports.Variant = mongoose.model("Variant", variantSchema);
